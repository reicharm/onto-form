/**
 * Named compute functions, referenced via "compute": "<name>" in UI config fields.
 *
 * Signature: (formData, lang) => newValue | undefined
 * Return undefined to leave the field unchanged.
 * Return any other value to overwrite the field.
 *
 * Add new functions here and reference them by name in any UI config field.
 * Different standards can assign different compute functions to the same field.
 */

export const fieldComputeFns = {

  // Sets the field to today's date whenever a title (de or en) is present.
  setTodayIfTitle: (data) => {
    const title = data['dct:title']
    const hasTitle = title?.de || title?.en || (typeof title === 'string' && title)
    return hasTitle ? new Date().toISOString().slice(0, 10) : undefined
  },

  // Always sets the field to today's date.
  setToday: () => new Date().toISOString().slice(0, 10),

  // Sets dct:language from the current UI language if the field is empty.
  setLanguageFromUI: (data, lang) => {
    if (data['dct:language']) return undefined
    const map = {
      de: 'http://publications.europa.eu/resource/authority/language/DEU',
      en: 'http://publications.europa.eu/resource/authority/language/ENG',
      fr: 'http://publications.europa.eu/resource/authority/language/FRA'
    }
    return map[lang]
  },

}

function equal(a, b) {
  if (a === b) return true
  if (typeof a !== typeof b || a === null || b === null) return false
  return JSON.stringify(a) === JSON.stringify(b)
}

/**
 * Run compute functions declared in the config against current form data.
 * Each field with a "compute" key referencing a fieldComputeFns entry is evaluated.
 * Only updates a field when the result actually differs — prevents recursive watchers.
 */
export function applyComputes(config, formData, lang) {
  if (!config?.fields) return formData

  let updated = false
  const next = { ...formData }

  for (const [fieldId, field] of Object.entries(config.fields)) {
    if (!field.compute) continue
    const fn = fieldComputeFns[field.compute]
    if (!fn) {
      console.warn(`[fieldComputes] Unknown compute function: "${field.compute}"`)
      continue
    }
    const result = fn(next, lang)
    if (result !== undefined && !equal(result, next[fieldId])) {
      next[fieldId] = result
      updated = true
    }
  }

  return updated ? next : formData
}
