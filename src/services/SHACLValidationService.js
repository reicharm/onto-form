/**
 * SHACL Validation Service
 *
 * Fetches the SHACL shapes file for the active standard, extracts all
 * property shapes for the dcat:Dataset NodeShape, and validates the current
 * form data against those constraints.
 *
 * Checked constraints
 * ───────────────────
 *   sh:minCount   — required fields
 *   sh:maxCount   — max cardinality
 *   sh:nodeKind   sh:IRI     → value must look like a URI
 *                 sh:Literal → value must NOT look like a URI
 *   sh:datatype   xsd:anyURI → valid URI
 *                 xsd:date   → valid date string
 *   sh:pattern    — JavaScript RegExp test
 *   sh:minLength  — minimum string length
 *   sh:maxLength  — maximum string length
 *
 * Returns
 * ───────
 *   { valid: boolean, violations: Violation[] }
 *
 * Violation shape:
 *   { fieldId, fieldLabel, groupId, severity, constraint, message, shapeRef }
 */

import { Parser } from 'n3'

const SH   = 'http://www.w3.org/ns/shacl#'
const RDF  = 'http://www.w3.org/1999/02/22-rdf-syntax-ns#'
const XSD  = 'http://www.w3.org/2001/XMLSchema#'
const DCAT = 'http://www.w3.org/ns/dcat#'

const SEV_VIOLATION = `${SH}Violation`
const SEV_WARNING   = `${SH}Warning`
const SEV_INFO      = `${SH}Info`

export class SHACLValidationService {
  /**
   * @param {string}  ttlContent   Raw Turtle content of the SHACL shapes file
   * @param {object}  formData     Current form data keyed by compact field IRI
   * @param {object}  config       Resolved form config (groups, fields)
   * @returns {{ valid: boolean, violations: object[] }}
   */
  async validate(ttlContent, formData, config) {
    const store = await parseTTL(ttlContent)
    const shapes = extractNodeShapes(store)

    const datasetShape = Object.values(shapes).find(
      s => s.targetClass === `${DCAT}Dataset`
    )
    if (!datasetShape) return { valid: true, violations: [] }

    const violations = []

    for (const prop of datasetShape.properties) {
      const fieldId = compactIRI(prop.path)
      const value   = formData?.[fieldId]
      const label   = config?.fields?.[fieldId]?.label || { en: fieldId, de: fieldId }
      const groupId = findGroupId(fieldId, config)

      const ctx = { fieldId, fieldLabel: label, groupId, shapeRef: prop.shapeRef }

      // ── sh:minCount ────────────────────────────────────────────────────────
      if (prop.minCount > 0 && countValues(value) < prop.minCount) {
        violations.push(violation(ctx, prop.severity, 'minCount',
          `Pflichtfeld (sh:minCount ${prop.minCount}) — kein Wert angegeben.`,
          `Required field (sh:minCount ${prop.minCount}) — no value provided.`
        ))
        continue // further checks on this field make no sense without a value
      }

      if (countValues(value) === 0) continue // optional, empty — nothing to check

      // ── sh:maxCount ────────────────────────────────────────────────────────
      if (prop.maxCount !== null && countValues(value) > prop.maxCount) {
        violations.push(violation(ctx, prop.severity, 'maxCount',
          `Zu viele Werte (sh:maxCount ${prop.maxCount}, vorhanden: ${countValues(value)}).`,
          `Too many values (sh:maxCount ${prop.maxCount}, found: ${countValues(value)}).`
        ))
      }

      // ── sh:nodeKind ────────────────────────────────────────────────────────
      if (prop.nodeKind === `${SH}IRI`) {
        const bad = stringValues(value).filter(v => !isURI(v))
        if (bad.length) {
          violations.push(violation(ctx, prop.severity, 'nodeKind',
            `Wert muss eine URI sein (sh:nodeKind sh:IRI). Ungültig: ${bad.slice(0, 2).join(', ')}`,
            `Value must be a URI (sh:nodeKind sh:IRI). Invalid: ${bad.slice(0, 2).join(', ')}`
          ))
        }
      } else if (prop.nodeKind === `${SH}Literal`) {
        const bad = stringValues(value).filter(v => isURI(v))
        if (bad.length) {
          violations.push(violation(ctx, prop.severity, 'nodeKind',
            `Wert darf keine URI sein (sh:nodeKind sh:Literal).`,
            `Value must not be a URI (sh:nodeKind sh:Literal).`
          ))
        }
      }

      // ── sh:datatype ────────────────────────────────────────────────────────
      if (prop.datatype === `${XSD}anyURI`) {
        const bad = stringValues(value).filter(v => !isURI(v))
        if (bad.length) {
          violations.push(violation(ctx, prop.severity, 'datatype',
            `Wert muss eine gültige URI sein (xsd:anyURI).`,
            `Value must be a valid URI (xsd:anyURI).`
          ))
        }
      } else if (prop.datatype === `${XSD}date` || prop.datatype === `${XSD}dateTime`) {
        const bad = stringValues(value).filter(v => !isDate(v))
        if (bad.length) {
          violations.push(violation(ctx, prop.severity, 'datatype',
            `Wert muss ein gültiges Datum sein (xsd:date). Ungültig: ${bad[0]}`,
            `Value must be a valid date (xsd:date). Invalid: ${bad[0]}`
          ))
        }
      }

      // ── sh:pattern ─────────────────────────────────────────────────────────
      if (prop.pattern) {
        let re
        try { re = new RegExp(prop.pattern) } catch { /* invalid regex in shape */ }
        if (re) {
          const bad = stringValues(value).filter(v => !re.test(v))
          if (bad.length) {
            violations.push(violation(ctx, prop.severity, 'pattern',
              `Wert entspricht nicht dem Muster (sh:pattern ${prop.pattern}).`,
              `Value does not match pattern (sh:pattern ${prop.pattern}).`
            ))
          }
        }
      }

      // ── sh:minLength / sh:maxLength ────────────────────────────────────────
      if (prop.minLength !== null) {
        const bad = stringValues(value).filter(v => v.length < prop.minLength)
        if (bad.length) {
          violations.push(violation(ctx, prop.severity, 'minLength',
            `Wert zu kurz — Minimum ${prop.minLength} Zeichen (sh:minLength).`,
            `Value too short — minimum ${prop.minLength} characters (sh:minLength).`
          ))
        }
      }
      if (prop.maxLength !== null) {
        const bad = stringValues(value).filter(v => v.length > prop.maxLength)
        if (bad.length) {
          violations.push(violation(ctx, prop.severity, 'maxLength',
            `Wert zu lang — Maximum ${prop.maxLength} Zeichen (sh:maxLength).`,
            `Value too long — maximum ${prop.maxLength} characters (sh:maxLength).`
          ))
        }
      }
    }

    const SEV_ORDER = { violation: 0, warning: 1, info: 2 }
    violations.sort((a, b) => SEV_ORDER[a.severity] - SEV_ORDER[b.severity])

    return {
      valid: violations.every(v => v.severity !== 'violation'),
      violations
    }
  }
}

// ── Helpers ────────────────────────────────────────────────────────────────

function violation(ctx, rawSeverity, constraint, messageDe, messageEn) {
  return {
    fieldId:    ctx.fieldId,
    fieldLabel: ctx.fieldLabel,
    groupId:    ctx.groupId,
    shapeRef:   ctx.shapeRef,
    severity:   normalizeSeverity(rawSeverity),
    constraint,
    messageDe,
    messageEn,
  }
}

function normalizeSeverity(raw) {
  if (raw === SEV_WARNING) return 'warning'
  if (raw === SEV_INFO)    return 'info'
  return 'violation'
}

/** Count non-empty values for cardinality checks. */
function countValues(value) {
  if (value == null || value === '') return 0
  if (Array.isArray(value)) {
    return value.filter(v => {
      if (!v) return false
      if (typeof v === 'object' && 'value' in v) return !!v.value
      if (typeof v === 'object') return Object.values(v).some(x => x)
      return String(v).trim() !== ''
    }).length
  }
  if (typeof value === 'object') {
    return Object.values(value).some(v => v && String(v).trim()) ? 1 : 0
  }
  return String(value).trim() ? 1 : 0
}

/** Extract all string values from a field value for constraint checks. */
function stringValues(value) {
  if (value == null || value === '') return []
  if (Array.isArray(value)) {
    return value.flatMap(v => {
      if (!v) return []
      if (typeof v === 'object' && 'value' in v) return v.value ? [v.value] : []
      if (typeof v === 'object') return Object.values(v).filter(x => typeof x === 'string' && x)
      return [String(v)]
    })
  }
  if (typeof value === 'object') {
    return Object.values(value).filter(v => typeof v === 'string' && v)
  }
  return [String(value)]
}

function isURI(v) {
  return typeof v === 'string' && /^https?:\/\/|^urn:|^mailto:/.test(v)
}

function isDate(v) {
  return typeof v === 'string' && /^\d{4}-\d{2}-\d{2}/.test(v)
}

/** Find the group ID that contains fieldId in the config. */
function findGroupId(fieldId, config) {
  if (!config?.groups) return null
  for (const group of config.groups) {
    if (group.fields?.includes(fieldId)) return group.id
  }
  return null
}

// ── SHACL TTL Parser ───────────────────────────────────────────────────────

async function parseTTL(ttlContent) {
  const parser = new Parser()
  const quads  = await new Promise((resolve, reject) => {
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

function extractNodeShapes(store) {
  const shapes = {}

  for (const [subject, triples] of store.entries()) {
    const types = triples.filter(t => t.p === `${RDF}type`).map(t => t.o.value)
    if (!types.includes(`${SH}NodeShape`)) continue

    const targetClass  = triples.find(t => t.p === `${SH}targetClass`)?.o.value
    const propNodes    = triples.filter(t => t.p === `${SH}property`).map(t => t.o.value)

    const properties = propNodes
      .map(node => extractPropertyShape(node, store))
      .filter(Boolean)

    shapes[subject] = { subject, targetClass, properties }
  }

  return shapes
}

function extractPropertyShape(node, store) {
  const triples = store.get(node) || []

  const pathTriple = triples.find(t => t.p === `${SH}path`)
  if (!pathTriple) return null

  const lit = (pred) => triples.find(t => t.p === pred)?.o.value ?? null
  const num = (pred) => { const v = lit(pred); return v !== null ? parseInt(v) : null }

  return {
    path:      pathTriple.o.value,
    shapeRef:  node,
    minCount:  num(`${SH}minCount`) ?? 0,
    maxCount:  num(`${SH}maxCount`),
    nodeKind:  lit(`${SH}nodeKind`),
    datatype:  lit(`${SH}datatype`),
    severity:  lit(`${SH}severity`) ?? SEV_VIOLATION,
    pattern:   lit(`${SH}pattern`),
    minLength: num(`${SH}minLength`),
    maxLength: num(`${SH}maxLength`),
  }
}

function compactIRI(iri) {
  const prefixes = {
    'http://purl.org/dc/terms/':             'dct:',
    'http://www.w3.org/ns/dcat#':            'dcat:',
    'http://xmlns.com/foaf/0.1/':            'foaf:',
    'http://www.w3.org/2004/02/skos/core#':  'skos:',
    'http://www.w3.org/2006/vcard/ns#':      'vcard:',
    'http://www.w3.org/ns/locn#':            'locn:',
    'http://www.opengis.net/ont/geosparql#': 'geo:',
    'http://www.w3.org/ns/adms#':            'adms:',
    'http://www.w3.org/ns/prov#':            'prov:',
    'http://purl.org/dc/elements/1.1/':      'dc:',
  }
  for (const [ns, prefix] of Object.entries(prefixes)) {
    if (iri.startsWith(ns)) return prefix + iri.slice(ns.length)
  }
  return iri.split(/[#/]/).at(-1) || iri
}
