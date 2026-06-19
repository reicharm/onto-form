/**
 * Suggestion store for "remember previously entered values" on form fields.
 *
 * Suggestions are shown as a selectable list next to the field — the user
 * actively picks one rather than having values auto-filled. When a suggestion
 * is selected, the entire field value (including all sub-fields of object
 * fields) is copied into the form.
 *
 * ## Two sources of suggestions (merged, context-provided first)
 *
 *   1. User context — injected by the embedding application at startup.
 *      These appear at the top of the suggestion list and are never persisted
 *      to localStorage by OntoForm (the embedding app owns them).
 *
 *   2. localStorage — values that OntoForm has saved from previous sessions.
 *      Stored under "ontoform:suggestions:<fieldId>", capped at MAX_STORED
 *      entries per field.
 *
 * ## Enabling suggestions on a field
 *
 * Add `"remember": true` to the field definition in the UI config:
 *
 *   "dct:publisher": {
 *     "type": "object",
 *     "remember": true,
 *     ...
 *   }
 *
 * ## Embedding-application hook
 *
 * Call once at application startup to inject user-specific suggestions:
 *
 *   import { suggestionsStore } from 'onto-form/src/services/SuggestionsStore.js'
 *
 *   suggestionsStore.setUserContext({
 *     'dct:publisher': [
 *       { 'foaf:name': 'Stadt Wien', 'foaf:homepage': 'https://wien.gv.at' }
 *     ],
 *     'dcat:contactPoint': [
 *       { 'vcard:fn': 'Open Data Team', 'vcard:hasEmail': 'opendata@wien.gv.at' }
 *     ]
 *   })
 *
 * The same contact data can be supplied for both publisher and contactPoint
 * — the user picks which suggestion fits. Field structures differ (foaf vs
 * vcard), so supply separate objects per field.
 *
 * ## Saving values
 *
 * OntoForm calls `suggestionsStore.save(fieldId, value)` automatically when
 * the form is exported or saved. Call it explicitly if you handle saves yourself:
 *
 *   suggestionsStore.save('dct:publisher', formData['dct:publisher'])
 *
 * ## Generating a display label for a suggestion
 *
 * `suggestionsStore.label(value)` returns a short human-readable string for
 * any suggestion value (object or primitive):
 *
 *   suggestionsStore.label({ 'foaf:name': 'Stadt Wien', 'foaf:mbox': 'x@y.at' })
 *   // → "Stadt Wien · x@y.at"
 */

const MAX_STORED = 5
const LS_PREFIX = 'ontoform:suggestions:'

// User-context values injected by the embedding application.
// Shape: { [fieldId]: value[] }
let _userContext = {}

export const suggestionsStore = {
  /**
   * Inject user-specific suggestions from the embedding application.
   * Values appear at the top of the suggestion list and are not persisted.
   *
   * @param {{ [fieldId: string]: any[] }} contextMap
   */
  setUserContext(contextMap) {
    _userContext = contextMap ?? {}
  },

  /**
   * Returns all suggestions for a field: context values first, then stored.
   * Duplicates (by JSON equality) are removed.
   *
   * @param {string} fieldId
   * @returns {any[]}
   */
  get(fieldId) {
    const context = _userContext[fieldId] ?? []
    const stored = loadStored(fieldId)

    // Merge: context first, then stored — skip stored entries that duplicate context
    const contextSerialized = new Set(context.map(serialize))
    const unique = [...context]
    for (const item of stored) {
      if (!contextSerialized.has(serialize(item))) unique.push(item)
    }
    return unique
  },

  /**
   * Saves a value for a field into localStorage.
   * Prepends the new value, deduplicates, and caps at MAX_STORED.
   * Null / undefined / empty objects are silently ignored.
   *
   * @param {string} fieldId
   * @param {any} value
   */
  save(fieldId, value) {
    if (!hasContent(value)) return
    const stored = loadStored(fieldId)
    const serialized = serialize(value)
    const filtered = stored.filter(v => serialize(v) !== serialized)
    const next = [value, ...filtered].slice(0, MAX_STORED)
    try {
      localStorage.setItem(LS_PREFIX + fieldId, JSON.stringify(next))
    } catch {
      // localStorage may be unavailable (private mode, storage full)
    }
  },

  /**
   * Removes all stored suggestions for a field from localStorage.
   * User-context values are not affected.
   *
   * @param {string} fieldId
   */
  clear(fieldId) {
    try { localStorage.removeItem(LS_PREFIX + fieldId) } catch { /* ignore */ }
  },

  /**
   * Returns a short human-readable label for a suggestion value.
   * Works for primitives and objects (picks the most meaningful fields).
   *
   * @param {any} value
   * @returns {string}
   */
  label(value) {
    if (value === null || value === undefined) return ''
    if (typeof value !== 'object') return String(value)

    // Candidate label fields in priority order
    const nameCandidates = [
      'foaf:name', 'vcard:fn', 'schema:name', 'dct:title', 'rdfs:label',
      'skos:prefLabel', 'name', 'title'
    ]
    const contactCandidates = [
      'foaf:mbox', 'vcard:hasEmail', 'foaf:homepage', 'vcard:hasURL',
      'vcard:hasTelephone', 'schema:email'
    ]

    const name = firstValue(value, nameCandidates)
    const contact = firstValue(value, contactCandidates)

    if (name && contact) return `${name} · ${contact}`
    if (name) return name
    if (contact) return contact

    // Fallback: join all non-empty string values
    const parts = Object.values(value).filter(v => v && typeof v === 'string')
    return parts.slice(0, 3).join(' · ') || JSON.stringify(value)
  }
}

// ── Helpers ────────────────────────────────────────────────────────────────

function loadStored(fieldId) {
  try {
    const raw = localStorage.getItem(LS_PREFIX + fieldId)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

function serialize(value) {
  return JSON.stringify(value)
}

function hasContent(value) {
  if (value === null || value === undefined) return false
  if (typeof value === 'object') {
    return Object.values(value).some(v => v !== null && v !== undefined && v !== '')
  }
  return String(value).trim() !== ''
}

function firstValue(obj, keys) {
  for (const key of keys) {
    if (obj[key] && typeof obj[key] === 'string') return obj[key]
  }
  return null
}
