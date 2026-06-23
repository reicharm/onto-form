/**
 * Host apps can add visibility/requiredIf functions via registerVisibility() or
 * configure({ extend: { visibility: { … } } }).
 */

export const fieldVisibilityFns = {
  ifHVDLegislation: (formData) => {
    const val = formData?.['dcatap:applicableLegislation']
    return val === 'http://data.europa.eu/eli/reg_impl/2023/138/oj'
  }
}

/**
 * Register one or more custom visibility/requiredIf functions.
 *
 * @param {string|Record<string, Function>} nameOrMap
 * @param {Function} [fn]
 */
export function registerVisibility(nameOrMap, fn) {
  const entries = typeof nameOrMap === 'string'
    ? { [nameOrMap]: fn }
    : nameOrMap
  for (const [name, func] of Object.entries(entries)) {
    if (fieldVisibilityFns[name]) {
      console.warn(`[fieldVisibility] "${name}" already exists — skipping. Use a unique name.`)
      continue
    }
    fieldVisibilityFns[name] = func
  }
}

export function evaluateVisibleIf(fnName, formData) {
  if (!fnName) return true
  const fn = fieldVisibilityFns[fnName]
  if (!fn) {
    console.warn(`[fieldVisibility] unknown function: "${fnName}"`)
    return true
  }
  return fn(formData)
}

export function evaluateRequiredIf(fnName, formData) {
  if (!fnName) return false
  const fn = fieldVisibilityFns[fnName]
  if (!fn) {
    console.warn(`[fieldVisibility] unknown requiredIf function: "${fnName}"`)
    return false
  }
  return fn(formData)
}
