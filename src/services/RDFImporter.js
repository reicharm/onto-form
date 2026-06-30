import { Parser } from 'n3'
import { fieldValidators } from '../config/fieldValidators.js'
import { expandIRI } from './rdfUtils.js'
import { applyEncode } from '../config/fieldTransforms.js'
import { isURI } from './rdfTypeUtils.js'

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
  dcatapatdmp: 'http://dcat-ap.at/dev/dmp/',
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
    const parsed = JSON.parse(text)
    const fields = config?.fields || {}

    // Unwrap @graph: find the root-class node and build a lookup table for sub-nodes
    let doc = parsed
    let graphIndex = {}
    if (Array.isArray(parsed['@graph'])) {
      for (const node of parsed['@graph']) {
        if (node['@id']) graphIndex[node['@id']] = node
      }
      const rootClass = config?.rootClass || 'dcat:Dataset'
      const ROOT_TYPES = [rootClass, expandIRI(rootClass)]
      const isRoot = (node) => {
        const t = node['@type']
        const types = Array.isArray(t) ? t : t ? [t] : []
        return types.some(x => ROOT_TYPES.includes(x))
      }
      doc = parsed['@graph'].find(isRoot)
        ?? parsed['@graph'].find(n => {
          const t = n['@type']
          const types = Array.isArray(t) ? t : t ? [t] : []
          return !types.some(x => x === 'rdfs:Resource' || x.endsWith('#Resource') || x.endsWith('/Resource'))
        })
        ?? parsed['@graph'][0]
        ?? parsed
    }

    // Normalise a key that may be a full URI to its prefixed form
    const toKey = (k) => {
      if (!k.startsWith('http')) return k
      for (const [prefix, ns] of Object.entries(PREFIXES)) {
        if (k.startsWith(ns)) return `${prefix}:${k.slice(ns.length)}`
      }
      return k
    }

    // Inline @id references to their full objects from the graph index.
    // External URIs not in the graph ({"@id": "https://..."}) become plain strings.
    const inlineRefs = (val) => {
      if (Array.isArray(val)) return val.map(inlineRefs)
      if (val && typeof val === 'object') {
        const keys = Object.keys(val)
        if (keys.length === 1 && val['@id']) {
          // Known blank/named node → inline recursively
          if (graphIndex[val['@id']]) return inlineRefs(graphIndex[val['@id']])
          // External URI reference → plain string (URIField expects String)
          return val['@id']
        }
        const out = {}
        for (const [k, v] of Object.entries(val)) out[k] = inlineRefs(v)
        return out
      }
      return val
    }

    // Build a normalised flat document with prefixed keys
    const normalised = {}
    for (const [k, v] of Object.entries(doc)) {
      normalised[toKey(k)] = inlineRefs(v)
    }

    const formData = {}
    for (const [fieldId, field] of Object.entries(fields)) {
      const raw = normalised[fieldId]
      if (raw == null) continue
      const val = this._deserializeJSONLD(raw, field)
      const coerced = this._encodeIfTransformed(this._coerceToFieldType(val, field), field)
      if (coerced != null && !this._isInvalid(coerced, field)) {
        formData[fieldId] = coerced
      }
    }

    // Fallback: use @id as dct:identifier if field is missing
    if (!formData['dct:identifier'] && doc['@id'] && isURI(doc['@id'])) {
      const field = fields['dct:identifier']
      if (!field || !this._isInvalid(doc['@id'], field)) {
        formData['dct:identifier'] = field?.multiple ? [doc['@id']] : doc['@id']
      }
    }

    return formData
  }

  fromRDFXML(text, config) {
    const parser = new DOMParser()
    const xmlDoc = parser.parseFromString(text, 'application/xml')

    const parseError = xmlDoc.querySelector('parsererror')
    if (parseError) throw new Error(parseError.textContent)

    const DCAT_NS = 'http://www.w3.org/ns/dcat#'
    const RDF_NS  = 'http://www.w3.org/1999/02/22-rdf-syntax-ns#'
    const XML_NS  = 'http://www.w3.org/XML/1998/namespace'

    const datasetEl = xmlDoc.getElementsByTagNameNS(DCAT_NS, 'Dataset')[0]
    if (!datasetEl) throw new Error('Kein dcat:Dataset gefunden')

    const byPred = {}
    const bySubject = new Map()
    let bnodeCounter = 0

    const addObject = (pred, obj) => {
      if (!byPred[pred]) byPred[pred] = []
      byPred[pred].push(obj)
    }

    const about = datasetEl.getAttributeNS(RDF_NS, 'about')
    if (about) {
      addObject('dct:identifier', { termType: 'NamedNode', value: about })
    }

    for (const child of datasetEl.children) {
      const fullURI = child.namespaceURI + child.localName
      const pred = this._toPrefixed(fullURI)

      const resource = child.getAttributeNS(RDF_NS, 'resource')
      if (resource) {
        addObject(pred, { termType: 'NamedNode', value: resource })
        continue
      }

      // Blank node sub-object: child has element children
      const innerEl = child.getElementsByTagNameNS(RDF_NS, 'Description')[0]
        || (child.children.length > 0 ? child.children[0] : null)

      if (innerEl) {
        const bnodeId = `_:bn${bnodeCounter++}`
        const subQuads = []
        // If the inner element is not rdf:Description, its tag name encodes rdf:type
        const isDescription = innerEl.namespaceURI === RDF_NS && innerEl.localName === 'Description'
        if (!isDescription) {
          const typeURI = innerEl.namespaceURI + innerEl.localName
          subQuads.push({ subject: { value: bnodeId }, predicate: { value: RDF_NS + 'type' }, object: { termType: 'NamedNode', value: typeURI } })
        }
        for (const sub of innerEl.children) {
          const subFullURI = sub.namespaceURI + sub.localName
          const subResource = sub.getAttributeNS(RDF_NS, 'resource')
          if (subResource) {
            subQuads.push({ subject: { value: bnodeId }, predicate: { value: subFullURI }, object: { termType: 'NamedNode', value: subResource } })
          } else {
            const subLang = sub.getAttributeNS(XML_NS, 'lang') || sub.getAttribute('xml:lang') || ''
            subQuads.push({ subject: { value: bnodeId }, predicate: { value: subFullURI }, object: { termType: 'Literal', value: sub.textContent, language: subLang } })
          }
        }
        bySubject.set(bnodeId, subQuads)
        addObject(pred, { termType: 'BlankNode', value: bnodeId })
        continue
      }

      const lang = child.getAttributeNS(XML_NS, 'lang') || child.getAttribute('xml:lang') || ''
      const datatype = child.getAttributeNS(RDF_NS, 'datatype') || ''
      addObject(pred, { termType: 'Literal', value: child.textContent, language: lang, datatype })
    }

    const fields = config?.fields || {}
    const formData = {}

    for (const [fieldId, field] of Object.entries(fields)) {
      const objects = byPred[fieldId]
      if (!objects?.length) continue
      const val = this._deserializeTurtleObjects(objects, field, bySubject)
      const coerced = this._encodeIfTransformed(this._coerceToFieldType(val, field), field)
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
      // Non-multiple: JSON-LD may provide an array of {@language,@value} objects
      if (Array.isArray(raw)) {
        const result = {}
        for (const item of raw) {
          if (item && typeof item === 'object' && '@value' in item) {
            result[item['@language'] || 'de'] = item['@value']
          }
        }
        return Object.keys(result).length ? result : { de: '' }
      }
      if (typeof raw === 'object' && !('@value' in raw)) return raw
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
      if (typeof raw !== 'object' || Array.isArray(raw)) return {}
      // Unwrap JSON-LD value wrappers (@id, @value) in each sub-field
      const out = {}
      for (const [k, v] of Object.entries(raw)) {
        if (k === '@type') {
          // Preserve rdf:type for round-trip export
          const typeVal = Array.isArray(v) ? v[0] : v
          if (typeVal) out['rdf:type'] = this._toPrefixed(String(typeVal))
          continue
        }
        if (k.startsWith('@')) continue
        let scalar
        if (typeof v === 'string') scalar = v
        else if (v && typeof v === 'object' && '@id' in v) scalar = v['@id']
        else if (v && typeof v === 'object' && '@value' in v) scalar = v['@value']
        else continue
        const clean = SUBFIELD_CLEAN[k]
        out[k] = clean ? clean(scalar) : scalar
      }
      return out
    }

    // text, textarea, uri, date, select — possibly multiple
    const _extractScalar = (v) => {
      if (typeof v === 'string') return this._scalarValue(v, field)
      if (v && typeof v === 'object' && '@value' in v) return this._scalarValue(v['@value'], field)
      if (v && typeof v === 'object' && '@id' in v) return this._scalarValue(v['@id'], field)
      return this._scalarValue(String(v), field)
    }
    const scalar = Array.isArray(raw) ? (raw[0] != null ? _extractScalar(raw[0]) : '') : _extractScalar(raw)

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

    // Find the main subject whose rdf:type matches the configured root class
    const ROOT_TYPE = expandIRI(config?.rootClass || 'dcat:Dataset')
    const RDF_TYPE  = 'http://www.w3.org/1999/02/22-rdf-syntax-ns#type'
    let mainSubject = null
    for (const [subj, qs] of bySubject) {
      if (qs.some(q => q.predicate.value === RDF_TYPE && q.object.value === ROOT_TYPE)) {
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
      const coerced = this._encodeIfTransformed(this._coerceToFieldType(val, field), field)
      if (coerced != null && !this._isInvalid(coerced, field)) {
        formData[fieldId] = coerced
      }
    }

    // Fallback: if dct:identifier was discarded (non-URI literal) but the dataset
    // subject itself is a URI, use that as the identifier
    if (!formData['dct:identifier'] && mainSubject && isURI(mainSubject)) {
      const field = fields['dct:identifier']
      if (!field || !this._isInvalid(mainSubject, field)) {
        formData['dct:identifier'] = mainSubject
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
      const validSubIds = new Set((field.subFields || []).map(sf => sf.id))
      const RDF_TYPE = 'http://www.w3.org/1999/02/22-rdf-syntax-ns#type'
      const result = {}
      for (const q of subQuads) {
        const subId = this._toPrefixed(q.predicate.value)
        if (q.predicate.value === RDF_TYPE) {
          result['rdf:type'] = this._toPrefixed(q.object.value)
          continue
        }
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
    const result = { 'rdf:type': 'dcat:Distribution' }
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

  // Apply encode transform so the stored form is validated, not the raw display form.
  // uriSuffix.encode is idempotent when the value is already a full URI.
  _encodeIfTransformed(coerced, field) {
    if (!field.transform || coerced == null) return coerced
    if (field.multiple && Array.isArray(coerced)) {
      return coerced.map(v => applyEncode(field.transform, v, field.transformOptions, v))
    }
    return applyEncode(field.transform, coerced, field.transformOptions, coerced)
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
