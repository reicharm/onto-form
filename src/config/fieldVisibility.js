export const fieldVisibilityFns = {
  ifHVDLegislation: (formData) => {
    const val = formData?.['dcatap:applicableLegislation']
    return val === 'http://data.europa.eu/eli/reg_impl/2023/138/oj'
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
