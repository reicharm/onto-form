import { Parser } from 'n3'
import { fieldValidators } from '../config/fieldValidators.js'

const PREFIXES = {
  rdf:    'http://www.w3.org/1999/02/22-rdf-syntax-ns#',
  dct:    'http://purl.org/dc/terms/',
  dcat:   'http://www.w3.org/ns/dcat#',
  dcatap: 'http://data.europa.eu/r5r/',
  foaf:   'http://xmlns.com/foaf/0.1/',
  vcard:  'http://www.w3.org/2006/vcard/ns#',
  skos:   'http://www.w3.org/2004/02/skos/core#',
  xsd:    'http://www.w3.org/2001/XMLSchema#',
  rdfs:   'http://www.w3.org/2000/01/rdf-schema#',
  geo:    'http://www.opengis.net/ont/geosparql#',
  locn:   'http://www.w3.org/ns/locn#',
  odrl:   'http://www.w3.org/ns/odrl/2/',
}

const DISTRIBUTION_FIELDS = [
  'dcat:accessURL', 'dcat:downloadURL',
  'dct:title', 'dct:description',
  'dct:format', 'dcat:mediaType',
  'dct:license', 'dcatap:availability',
  'dct:issued', 'dct:modified',
]

// Normalize sub-field values that use special URI schemes
const SUBFIELD_CLEAN = {
  'vcard:hasEmail': v => v.startsWith('mailto:') ? v.slice(7) : v,
  'foaf:mbox':      v => v.startsWith('mailto:') ? v.slice(7) : v,
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
      const coerced = this._coerceToFieldType(val, field)
      if (coerced != null && !this._isInvalid(coerced, field)) {
        formData[fieldId] = coerced
      }
    }

    return formData
  }

  async fromTurtle(text, config) {
    const normalized = this._normalizePrefixes(text)
    const quads = await this._parseTurtle(normalized)
    return this._quadsToFormData(quads, config)
  }

  // ── Preprocessing ──────────────────────────────────────────────────────────

  _normalizePrefixes(text) {
    return text.replace(/^PREFIX\s+(\S+)\s+(<[^>]+>)\s*$/gim, '@prefix $1 $2 .')
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

    if (type === 'distribution-editor') {
      const arr = Array.isArray(raw) ? raw : [raw]
      return arr.map(item => this._importDistributionJSONLD(item)).filter(d => d['dcat:accessURL'])
    }

    if (type === 'object') {
      if (typeof raw === 'object' && !Array.isArray(raw)) return raw
      return {}
    }

    // text, textarea, uri, date, select — possibly multiple
    const scalar = Array.isArray(raw)
      ? (raw[0] ? this._scalarValue(raw[0], field) : '')
      : (typeof raw === 'object' && '@value' in raw ? this._scalarValue(raw['@value'], field) : this._scalarValue(String(raw), field))

    if (multiple) return scalar ? [scalar] : ['']
    return scalar
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
      const val = this._deserializeTurtleObjects(objects, field, bySubject)
      const coerced = this._coerceToFieldType(val, field)
      if (coerced != null && !this._isInvalid(coerced, field)) {
        formData[fieldId] = coerced
      }
    }

    return formData
  }

  _deserializeTurtleObjects(objects, field, bySubject) {
    const { type, multiple } = field

    if (type === 'langstring') {
      const literals = objects.filter(o => o.termType === 'Literal' && o.value)
      if (multiple) {
        return literals.map(o => ({ value: o.value, lang: o.language || 'de' }))
      }
      const result = {}
      for (const o of literals) result[o.language || 'de'] = o.value
      return result
    }

    if (type === 'multiselect') {
      return objects.map(o => o.value)
    }

    if (type === 'distribution-editor') {
      return objects
        .filter(o => o.termType === 'BlankNode' || o.termType === 'NamedNode')
        .map(o => this._importDistributionTurtle(bySubject.get(o.value) || []))
        .filter(d => d['dcat:accessURL'])
    }

    if (type === 'object') {
      const node = objects.find(o => o.termType === 'BlankNode' || o.termType === 'NamedNode')
      if (!node) return {}
      const subQuads = bySubject.get(node.value) || []
      // Only include sub-fields that are defined in the field config
      const validSubIds = new Set((field.subFields || []).map(sf => sf.id))
      const result = {}
      for (const q of subQuads) {
        const subId = this._toPrefixed(q.predicate.value)
        if (validSubIds.size > 0 && !validSubIds.has(subId)) continue
        const clean = SUBFIELD_CLEAN[subId]
        result[subId] = clean ? clean(q.object.value) : q.object.value
      }
      return result
    }

    // text, textarea, uri, date, select — skip blank nodes
    const scalars = objects.filter(o => o.termType === 'Literal' || o.termType === 'NamedNode')
    if (!scalars.length) return multiple ? [''] : ''

    const values = scalars.map(o => this._scalarValue(o.value, field)).filter(Boolean)

    if (multiple) return values.length ? values : ['']
    return values[0] ?? ''
  }

  // ── Helpers ────────────────────────────────────────────────────────────────

  _toPrefixed(uri) {
    for (const [prefix, ns] of Object.entries(PREFIXES)) {
      if (uri.startsWith(ns)) return `${prefix}:${uri.slice(ns.length)}`
    }
    return uri
  }

  _scalarValue(val, field) {
    if (field.type === 'date' && val.length > 10 && val[10] === 'T') {
      return val.slice(0, 10)
    }
    return val
  }

  // Ensure the value matches what the form expects for this field type
  _coerceToFieldType(val, field) {
    const { type, multiple } = field

    if (type === 'langstring') {
      if (multiple) {
        if (!Array.isArray(val)) return [{ value: String(val || ''), lang: 'de' }]
        return val
      }
      if (typeof val !== 'object' || Array.isArray(val)) return { de: String(val || '') }
      return val
    }

    if (type === 'multiselect') {
      if (!Array.isArray(val)) return val ? [String(val)] : []
      return val
    }

    if (type === 'distribution-editor') {
      return Array.isArray(val) ? val : []
    }

    if (type === 'object') {
      if (typeof val !== 'object' || Array.isArray(val)) return {}
      return val
    }

    // Scalar types with possible multiple
    if (multiple) {
      if (!Array.isArray(val)) return val ? [String(val)] : ['']
      return val
    }

    return val != null ? String(val) : ''
  }

  _importDistributionJSONLD(item) {
    if (!item || typeof item !== 'object') return {}
    const result = {}
    for (const key of DISTRIBUTION_FIELDS) {
      const raw = item[key]
      if (raw == null) continue
      if (typeof raw === 'string') { result[key] = raw; continue }
      if (typeof raw === 'object' && '@id' in raw) { result[key] = raw['@id']; continue }
      if (typeof raw === 'object' && '@value' in raw) { result[key] = raw['@value']; continue }
      const first = Array.isArray(raw) ? raw[0] : null
      if (first == null) continue
      result[key] = typeof first === 'string' ? first : (first['@id'] || first['@value'] || '')
    }
    return result
  }

  _importDistributionTurtle(subQuads) {
    const result = {}
    for (const q of subQuads) {
      const pred = this._toPrefixed(q.predicate.value)
      if (!DISTRIBUTION_FIELDS.includes(pred)) continue
      let val = q.object.value
      if ((pred === 'dct:issued' || pred === 'dct:modified') && val.length > 10) val = val.slice(0, 10)
      result[pred] = val
    }
    return result
  }

  // Returns true if the value should be discarded (fails validation)
  _isInvalid(val, field) {
    if (!field.validate) return false
    const validator = fieldValidators[field.validate]
    if (!validator) return false

    // For multiple fields, check at least one entry is valid (don't discard the whole array)
    if (field.multiple && Array.isArray(val)) return false

    // Run validator — if it returns errors, discard the value
    try {
      const errors = validator(val, 'de')
      return errors && errors.length > 0
    } catch {
      return false
    }
  }
}
