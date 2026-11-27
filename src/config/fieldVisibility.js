/**
 * Host apps can add visibility/requiredIf functions via registerVisibility() or
 * configure({ extend: { visibility: { … } } }).
 */

export const fieldVisibilityFns = {
  ifHVDLegislation: (formData) => {
    const val = formData?.['dcatap:applicableLegislation']
    return val === 'http://data.europa.eu/eli/reg_impl/2023/138/oj'
  },
  // DZG profile: a dataset is a "dataproduct" when dct:type is
  // restype:Dataproduct. Most dataset-level fields are mandatory unless the
  // record is a dataproduct; dct:valid is mandatory only for dataproducts.
  // dct:type has no sh:maxCount in the DZG shape (unbounded -> multiple:
  // true), so its stored value is an array, not a single string.
  ifDzgDataproduct: (formData) => {
    const val = formData?.['dct:type']
    const DATAPRODUCT = 'http://dcat-ap.at/concept/resourcetype/Dataproduct'
    return Array.isArray(val) ? val.includes(DATAPRODUCT) : val === DATAPRODUCT
  },
  ifNotDzgDataproduct: (formData) => {
    return !fieldVisibilityFns.ifDzgDataproduct(formData)
  },
  // DZG profile: a dataproduct's survey method (prov:wasGeneratedBy) only
  // allows a free-text description when the method itself is erh:andere
  // ("other"). Evaluated against the wasGeneratedBy sub-object itself.
  ifDzgSurveyMethodAndere: (formData) => {
    return formData?.['dct:type'] === 'http://dcat-ap.at/concept/erhebungsform/andere'
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
