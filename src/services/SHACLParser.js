import { parseTTLToStore, compactIRI } from './rdfUtils.js'

const SH   = 'http://www.w3.org/ns/shacl#'
const RDF  = 'http://www.w3.org/1999/02/22-rdf-syntax-ns#'
const XSD  = 'http://www.w3.org/2001/XMLSchema#'
const RDFS = 'http://www.w3.org/2000/01/rdf-schema#'

const DATATYPE_MAP = {
  [`${XSD}string`]:              'text',
  [`${XSD}date`]:                'date',
  [`${XSD}dateTime`]:            'date',
  [`${XSD}anyURI`]:              'uri',
  [`${RDF}langString`]:          'langstring',
  [`${XSD}integer`]:             'text',
  [`${XSD}decimal`]:             'text',
  [`${XSD}nonNegativeInteger`]:  'text'
}

export class SHACLParser {
  async parse(ttlContent) {
    const store = await parseTTLToStore(ttlContent)
    const shapes = {}

    for (const [subject, triples] of store.entries()) {
      const types = triples.filter(t => t.p === `${RDF}type`).map(t => t.o.value)
      if (!types.includes(`${SH}NodeShape`)) continue

      const targetClass   = triples.find(t => t.p === `${SH}targetClass`)?.o.value
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
  const id        = compactIRI(pathValue)

  const nameDe  = getLiteral(triples, `${SH}name`, 'de')
  const nameEn  = getLiteral(triples, `${SH}name`, 'en')
  const nameAny = getLiteral(triples, `${SH}name`, null)
  const descDe  = getLiteral(triples, `${SH}description`, 'de')
  const descEn  = getLiteral(triples, `${SH}description`, 'en')

  const datatype = triples.find(t => t.p === `${SH}datatype`)?.o.value
  const nodeKind = triples.find(t => t.p === `${SH}nodeKind`)?.o.value
  const minCount = parseInt(triples.find(t => t.p === `${SH}minCount`)?.o.value || '0')
  const maxCount = triples.find(t => t.p === `${SH}maxCount`)?.o.value
  const order    = parseFloat(triples.find(t => t.p === `${SH}order`)?.o.value || '999')

  const inValues = triples.filter(t => t.p === `${SH}in`)
  const options  = extractListOptions(inValues, store)

  let type = 'text'
  if (options.length > 0)          type = 'select'
  else if (datatype)                type = DATATYPE_MAP[datatype] || 'text'
  else if (nodeKind === `${SH}IRI`) type = 'uri'

  return {
    id,
    path: pathValue,
    label: { de: nameDe || nameAny || id, en: nameEn || nameAny || id },
    hint:  { de: descDe || '',            en: descEn || '' },
    type,
    required: minCount > 0,
    // absence of sh:maxCount means unbounded → multiple: true
    multiple: maxCount === undefined || parseInt(maxCount) !== 1,
    order,
    options,
    visible: true
  }
}

function extractListOptions(inTriples, store) {
  const options = []
  for (const t of inTriples) collectList(t.o.value, store, options)
  return options
}

function collectList(node, store, result) {
  if (!node || node === `${RDF}nil`) return
  const triples = store.get(node) || []
  const first = triples.find(t => t.p === `${RDF}first`)
  const rest  = triples.find(t => t.p === `${RDF}rest`)
  if (first) {
    const val = first.o.value
    result.push({ value: val, label: { de: compactIRI(val), en: compactIRI(val) } })
  }
  if (rest) collectList(rest.o.value, store, result)
}
