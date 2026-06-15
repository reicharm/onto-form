/**
 * Compute functions for auto-filling fields based on other field values.
 *
 * Each entry maps a field ID to a function:
 *   (formData, lang) => newValue | undefined
 *
 * Return undefined to leave the field unchanged.
 * Return any other value to overwrite the field.
 *
 * These run after every form change. Keep them pure and fast.
 *
 * Example — auto-set dct:modified to today whenever dct:title changes:
 *
 *   'dct:modified': (data) => data['dct:title']?.de ? today() : undefined,
 */

export const fieldComputes = {
  // Example: auto-fill dct:modified with today's date when title is entered
  // 'dct:modified': (data) => {
  //   const title = data['dct:title']
  //   const hasTitle = title?.de || title?.en || (typeof title === 'string' && title)
  //   return hasTitle ? new Date().toISOString().slice(0, 10) : undefined
  // },

  // Example: auto-fill dct:language based on UI language
  // 'dct:language': (data, lang) => {
  //   const map = { de: 'http://publications.europa.eu/resource/authority/language/DEU',
  //                 en: 'http://publications.europa.eu/resource/authority/language/ENG' }
  //   return data['dct:language'] ? undefined : map[lang]
  // },
}

/**
 * Run all registered compute functions against current form data.
 * Returns a new formData object with computed values applied.
 * Only fields whose compute function returns a non-undefined value are updated.
 */
export function applyComputes(formData, lang) {
  let updated = false
  const next = { ...formData }

  for (const [fieldId, fn] of Object.entries(fieldComputes)) {
    const result = fn(next, lang)
    if (result !== undefined) {
      next[fieldId] = result
      updated = true
    }
  }

  return updated ? next : formData
}
