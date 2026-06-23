import { Parser } from 'n3'

/**
 * Parse a Turtle string into a subject→triples Map.
 * @param {string} ttlContent
 * @returns {Promise<Map<string, Array<{p:string, o:import('n3').Term}>>>}
 */
export async function parseTTLToStore(ttlContent) {
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
    if (!store.has(s)) store.set(s, [])
    store.get(s).push({ p: quad.predicate.value, o: quad.object })
  }
  return store
}

const PREFIXES = {
  'http://purl.org/dc/terms/':             'dct:',
  'http://www.w3.org/ns/dcat#':            'dcat:',
  'http://xmlns.com/foaf/0.1/':            'foaf:',
  'http://www.w3.org/2004/02/skos/core#':  'skos:',
  'http://www.w3.org/2006/vcard/ns#':      'vcard:',
  'http://www.w3.org/ns/locn#':            'locn:',
  'http://www.w3.org/2006/time#':          'time:',
  'http://www.opengis.net/ont/geosparql#': 'geo:',
  'http://www.w3.org/ns/adms#':            'adms:',
  'http://www.w3.org/ns/prov#':            'prov:',
  'http://purl.org/dc/elements/1.1/':      'dc:',
}

/**
 * Shorten a full IRI to a prefixed form, or return the local name as fallback.
 * @param {string} iri
 * @returns {string}
 */
export function compactIRI(iri) {
  for (const [ns, prefix] of Object.entries(PREFIXES)) {
    if (iri.startsWith(ns)) return prefix + iri.slice(ns.length)
  }
  return iri.split(/[#/]/).at(-1) || iri
}

/**
 * Returns true for absolute URIs (http, https, urn, mailto).
 * @param {unknown} v
 * @returns {boolean}
 */
export function isAbsoluteURI(v) {
  return typeof v === 'string' && /^https?:\/\/|^urn:|^mailto:/.test(v)
}

/**
 * Returns true for ISO date strings (YYYY-MM-DD…).
 * @param {unknown} v
 * @returns {boolean}
 */
export function isISODate(v) {
  return typeof v === 'string' && /^\d{4}-\d{2}-\d{2}/.test(v)
}
