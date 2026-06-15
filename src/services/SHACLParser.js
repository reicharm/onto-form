import { Parser, DataFactory } from 'n3'

const { namedNode } = DataFactory

const SH = 'http://www.w3.org/ns/shacl#'
const RDF = 'http://www.w3.org/1999/02/22-rdf-syntax-ns#'
const XSD = 'http://www.w3.org/2001/XMLSchema#'
const RDFS = 'http://www.w3.org/2000/01/rdf-schema#'

const DATATYPE_MAP = {
  [`${XSD}string`]: 'text',
  [`${XSD}date`]: 'date',
  [`${XSD}dateTime`]: 'date',
  [`${XSD}anyURI`]: 'uri',
  [`${RDF}langString`]: 'langstring',
  [`${XSD}integer`]: 'text',
  [`${XSD}decimal`]: 'text',
  [`${XSD}nonNegativeInteger`]: 'text'
}

export class SHACLParser {
  async parse(ttlContent) {
    const parser = new Parser()
    const quads = await new Promise((resolve, reject) => {
      const result = []
      parser.parse(ttlContent, (err, quad) => {
        if (err) return reject(err)
        if (quad) result.push(quad)
        else resolve(result)
      })
    })

    const store = new Map()
    for (const quad of quads) {
      const s = quad.subject.value
      const p = quad.predicate.value
      const o = quad.object
      if (!store.has(s)) store.set(s, [])
      store.get(s).push({ p, o })
    }

    const shapes = {}

    for (const [subject, triples] of store.entries()) {
      const types = triples.filter(t => t.p === `${RDF}type`).map(t => t.o.value)
      if (!types.includes(`${SH}NodeShape`)) continue

      const targetClass = triples.find(t => t.p === `${SH}targetClass`)?.o.value
      const propertyNodes = triples.filter(t => t.p === `${SH}property`).map(t => t.o.value)

      const fields = {}
      for (const pNode of propertyNodes) {
        const pTriples = store.get(pNode) || []
        const field = parsePropertyShape(pTriples, store)
        if (field) fields[field.id] = field
      }

      const shapeKey = targetClass || subject
      shapes[shapeKey] = { targetClass, fields }
    }

    return shapes
  }
}

function getLiteral(triples, predicate, lang) {
  const matches = triples.filter(t => t.p === predicate)
  if (lang) {
    const match = matches.find(t => t.o.language === lang)
    if (match) return match.o.value
  }
  const any = matches[0]
  return any ? any.o.value : null
}

function parsePropertyShape(triples, store) {
  const pathTriple = triples.find(t => t.p === `${SH}path`)
  if (!pathTriple) return null

  const pathValue = pathTriple.o.value
  const id = compactIRI(pathValue)

  const nameDe = getLiteral(triples, `${SH}name`, 'de')
  const nameEn = getLiteral(triples, `${SH}name`, 'en')
  const nameAny = getLiteral(triples, `${SH}name`, null)

  const descDe = getLiteral(triples, `${SH}description`, 'de')
  const descEn = getLiteral(triples, `${SH}description`, 'en')

  const datatype = triples.find(t => t.p === `${SH}datatype`)?.o.value
  const nodeKind = triples.find(t => t.p === `${SH}nodeKind`)?.o.value
  const minCount = parseInt(triples.find(t => t.p === `${SH}minCount`)?.o.value || '0')
  const maxCount = triples.find(t => t.p === `${SH}maxCount`)?.o.value
  const order = parseFloat(triples.find(t => t.p === `${SH}order`)?.o.value || '999')

  const inValues = triples.filter(t => t.p === `${SH}in`)
  const options = extractListOptions(inValues, store)

  let type = 'text'
  if (options.length > 0) {
    type = 'select'
  } else if (datatype) {
    type = DATATYPE_MAP[datatype] || 'text'
  } else if (nodeKind === `${SH}IRI`) {
    type = 'uri'
  }

  return {
    id,
    path: pathValue,
    label: {
      de: nameDe || nameAny || id,
      en: nameEn || nameAny || id
    },
    hint: {
      de: descDe || '',
      en: descEn || ''
    },
    type,
    required: minCount > 0,
    multiple: !maxCount || parseInt(maxCount) > 1,
    order,
    options,
    visible: true
  }
}

function extractListOptions(inTriples, store) {
  const options = []
  for (const t of inTriples) {
    const listNode = t.o.value
    collectList(listNode, store, options)
  }
  return options
}

function collectList(node, store, result) {
  if (!node || node === 'http://www.w3.org/1999/02/22-rdf-syntax-ns#nil') return
  const triples = store.get(node) || []
  const first = triples.find(t => t.p === 'http://www.w3.org/1999/02/22-rdf-syntax-ns#first')
  const rest = triples.find(t => t.p === 'http://www.w3.org/1999/02/22-rdf-syntax-ns#rest')
  if (first) {
    const val = first.o.value
    result.push({ value: val, label: { de: compactIRI(val), en: compactIRI(val) } })
  }
  if (rest) collectList(rest.o.value, store, result)
}

function compactIRI(iri) {
  const prefixes = {
    'http://purl.org/dc/terms/': 'dct:',
    'http://www.w3.org/ns/dcat#': 'dcat:',
    'http://xmlns.com/foaf/0.1/': 'foaf:',
    'http://www.w3.org/2004/02/skos/core#': 'skos:',
    'http://www.w3.org/2006/vcard/ns#': 'vcard:',
    'http://www.w3.org/ns/locn#': 'locn:',
    'http://www.w3.org/2006/time#': 'time:',
    'http://www.opengis.net/ont/geosparql#': 'geo:',
    'http://www.w3.org/ns/adms#': 'adms:'
  }
  for (const [ns, prefix] of Object.entries(prefixes)) {
    if (iri.startsWith(ns)) return prefix + iri.slice(ns.length)
  }
  const parts = iri.split(/[#\/]/)
  return parts[parts.length - 1] || iri
}
