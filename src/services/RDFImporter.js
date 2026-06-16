import { Parser } from 'n3'

const PREFIXES = {
  dct:   'http://purl.org/dc/terms/',
  dcat:  'http://www.w3.org/ns/dcat#',
  foaf:  'http://xmlns.com/foaf/0.1/',
  vcard: 'http://www.w3.org/2006/vcard/ns#',
  skos:  'http://www.w3.org/2004/02/skos/core#',
  xsd:   'http://www.w3.org/2001/XMLSchema#',
  rdfs:  'http://www.w3.org/2000/01/rdf-schema#',
  geo:   'http://www.opengis.net/ont/geosparql#',
  locn:  'http://www.w3.org/ns/locn#',
  odrl:  'http://www.w3.org/ns/odrl/2/',
}

export class RDFImporter {
  fromJSONLD(text, config) {
    const doc = JSON.parse(text)
    const fields = config?.fields || {}
    const formData = {}

    for (const [fieldId, field] of Object.entries(fields)) {
      const raw = doc[fieldId]
      if (raw == null) continue
      const val = this._deserializeJSONLD(raw, field)
      if (val != null) formData[fieldId] = val
    }

    return formData
  }

  async fromTurtle(text, config) {
    const quads = await this._parseTurtle(text)
    return this._quadsToFormData(quads, config)
  }

  // ── JSON-LD ────────────────────────────────────────────────────────────────

  _deserializeJSONLD(raw, field) {
    const { type, multiple } = field

    if (type === 'langstring') {
      if (multiple) {
        const arr = Array.isArray(raw) ? raw : [raw]
        return arr.map(item => {
          if (item && typeof item === 'object' && '@value' in item)
            return { value: item['@value'], lang: item['@language'] || 'de' }
          return { value: String(item), lang: 'de' }
        }).filter(i => i.value)
      }
      // Language map { de: "...", en: "..." } or single tagged literal
      if (typeof raw === 'object' && !Array.isArray(raw) && !('@value' in raw))
        return raw
      if (typeof raw === 'object' && '@value' in raw)
        return { [raw['@language'] || 'de']: raw['@value'] }
      return { de: String(raw) }
    }

    if (type === 'multiselect') {
      const arr = Array.isArray(raw) ? raw : [raw]
      return arr.map(item => (typeof item === 'string' ? item : item?.['@id'] || String(item)))
    }

    if (type === 'object') {
      if (typeof raw === 'object' && !Array.isArray(raw)) return raw
      return {}
    }

    // text, textarea, uri, date, select
    if (Array.isArray(raw)) return raw[0] ? String(raw[0]) : ''
    if (typeof raw === 'object' && '@value' in raw) return raw['@value']
    return String(raw)
  }

  // ── Turtle ─────────────────────────────────────────────────────────────────

  async _parseTurtle(text) {
    return new Promise((resolve, reject) => {
      const parser = new Parser()
      const quads = []
      parser.parse(text, (err, quad) => {
        if (err) return reject(err)
        if (quad) quads.push(quad)
        else resolve(quads)
      })
    })
  }

  _quadsToFormData(quads, config) {
    // Group quads by subject
    const bySubject = new Map()
    for (const q of quads) {
      const s = q.subject.value
      if (!bySubject.has(s)) bySubject.set(s, [])
      bySubject.get(s).push(q)
    }

    // Find the main dcat:Dataset subject
    const DCAT_DATASET = 'http://www.w3.org/ns/dcat#Dataset'
    const RDF_TYPE     = 'http://www.w3.org/1999/02/22-rdf-syntax-ns#type'
    let mainSubject = null
    for (const [subj, qs] of bySubject) {
      if (qs.some(q => q.predicate.value === RDF_TYPE && q.object.value === DCAT_DATASET)) {
        mainSubject = subj
        break
      }
    }
    if (!mainSubject) mainSubject = [...bySubject.keys()][0]

    const mainQuads = bySubject.get(mainSubject) || []

    // Group main quads by prefixed predicate
    const byPred = {}
    for (const q of mainQuads) {
      const pred = this._toPrefixed(q.predicate.value)
      if (!byPred[pred]) byPred[pred] = []
      byPred[pred].push(q.object)
    }

    const fields = config?.fields || {}
    const formData = {}

    for (const [fieldId, field] of Object.entries(fields)) {
      const objects = byPred[fieldId]
      if (!objects?.length) continue
      formData[fieldId] = this._deserializeTurtleObjects(objects, field, bySubject)
    }

    return formData
  }

  _deserializeTurtleObjects(objects, field, bySubject) {
    const { type, multiple } = field

    if (type === 'langstring') {
      if (multiple) {
        return objects
          .filter(o => o.termType === 'Literal' && o.value)
          .map(o => ({ value: o.value, lang: o.language || 'de' }))
      }
      const result = {}
      for (const o of objects) {
        if (o.termType !== 'Literal') continue
        result[o.language || 'de'] = o.value
      }
      return result
    }

    if (type === 'multiselect') {
      return objects.map(o => o.value)
    }

    if (type === 'object') {
      const blank = objects.find(o => o.termType === 'BlankNode')
      if (!blank) return {}
      const subQuads = bySubject.get(blank.value) || []
      const result = {}
      for (const q of subQuads) {
        result[this._toPrefixed(q.predicate.value)] = q.object.value
      }
      return result
    }

    // text, textarea, uri, date, select
    return objects[0]?.value ?? ''
  }

  _toPrefixed(uri) {
    for (const [prefix, ns] of Object.entries(PREFIXES)) {
      if (uri.startsWith(ns)) return `${prefix}:${uri.slice(ns.length)}`
    }
    return uri
  }
}
