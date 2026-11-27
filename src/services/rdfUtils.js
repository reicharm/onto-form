import { Parser } from 'n3'

/**
 * Parse a Turtle string into a subject→triples Map, plus the @prefix
 * declarations actually used in that document (prefix name → namespace IRI,
 * no trailing colon on the key, as returned by n3's parse callback).
 * @param {string} ttlContent
 * @returns {Promise<{store: Map<string, Array<{p:string, o:import('n3').Term}>>, prefixes: Record<string,string>}>}
 */
export async function parseTTLToStore(ttlContent) {
  const parser = new Parser()
  const { quads, prefixes } = await new Promise((resolve, reject) => {
    const result = []
    parser.parse(ttlContent, (err, quad, parsedPrefixes) => {
      if (err) return reject(err)
      if (quad) result.push(quad)
      else resolve({ quads: result, prefixes: parsedPrefixes || {} })
    })
  })

  const store = new Map()
  for (const quad of quads) {
    const s = quad.subject.value
    if (!store.has(s)) store.set(s, [])
    store.get(s).push({ p: quad.predicate.value, o: quad.object })
  }
  return { store, prefixes }
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
  'http://dcat-ap.at/dev/dmp/':            'dcatapatdmp:',
}

/**
 * Shorten a full IRI to a prefixed form, or return the local name as fallback.
 *
 * `docPrefixes`, when given, is the prefix map parsed from the actual SHACL
 * document (@prefix declarations, as returned by parseTTLToStore) and takes
 * priority over the hardcoded PREFIXES table — any namespace a shape file
 * declares (e.g. a profile-specific `dcatap:`, `spdx:`, `stat:`, or an
 * entirely custom `dzg:` prefix) compacts correctly even though it isn't
 * baked into this module. Without it, IRIs in a namespace not in PREFIXES
 * lose their prefix entirely (e.g. "dcatap:hvdCategory" → "hvdCategory"),
 * which silently produces a different field id than the one used in
 * ui-config.*.json for the same property.
 * @param {string} iri
 * @param {Record<string,string>} [docPrefixes]
 * @returns {string}
 */
export function compactIRI(iri, docPrefixes) {
  if (docPrefixes) {
    let best = null
    for (const [prefix, ns] of Object.entries(docPrefixes)) {
      if (ns && iri.startsWith(ns) && (!best || ns.length > best.ns.length)) best = { prefix, ns }
    }
    if (best) return `${best.prefix}:${iri.slice(best.ns.length)}`
  }
  for (const [ns, prefix] of Object.entries(PREFIXES)) {
    if (iri.startsWith(ns)) return prefix + iri.slice(ns.length)
  }
  return iri.split(/[#/]/).at(-1) || iri
}

/**
 * Expand a prefixed IRI (e.g. "dcat:Catalog") to its full form, using the
 * inverse of the compactIRI() prefix table. `docPrefixes` (see compactIRI)
 * takes priority over the hardcoded table. Returns the input unchanged if
 * no known prefix matches.
 * @param {string} compact
 * @param {Record<string,string>} [docPrefixes]
 * @returns {string}
 */
export function expandIRI(compact, docPrefixes) {
  const i = compact.indexOf(':')
  if (i === -1) return compact
  const prefix = compact.slice(0, i)
  if (docPrefixes && docPrefixes[prefix]) return docPrefixes[prefix] + compact.slice(i + 1)
  const prefixWithColon = compact.slice(0, i + 1)
  for (const [ns, p] of Object.entries(PREFIXES)) {
    if (p === prefixWithColon) return ns + compact.slice(i + 1)
  }
  return compact
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
