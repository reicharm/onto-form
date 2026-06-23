/**
 * Named field transforms, referenced via "transform": "<name>" in UI config fields.
 *
 * A transform is a pair of functions:
 *   display(storedValue, opts)                  → string shown in the input
 *   encode(displayValue, opts, storedValue)      → value written to formData
 *
 * The stored value is always the "real" value (what gets exported/validated).
 * The display value is only what the user types into the form field.
 *
 * Add new transforms here and reference them by name in any UI config field.
 * Use "transformOptions": { ... } in the field config to pass extra options.
 */

/**
 * Host apps can add transforms via registerTransform() or
 * configure({ extend: { transforms: { … } } }).
 */

export const fieldTransforms = {

  /**
   * Shows only the last path segment of a URI.
   * Encodes back by prepending the original prefix (or a configured one).
   *
   * Config example:
   *   "transform": "uriSuffix"
   *   "transformOptions": { "prefix": "https://data.gv.at/dataset/" }
   */
  uriSuffix: {
    display(storedValue) {
      if (!storedValue) return storedValue
      try {
        const url = new URL(storedValue)
        const parts = url.pathname.split('/').filter(Boolean)
        return parts[parts.length - 1] || storedValue
      } catch {
        return storedValue
      }
    },

    encode(displayValue, opts, storedValue) {
      if (!displayValue) return displayValue
      // If the user typed a full URI, store it as-is
      try { new URL(displayValue); return displayValue } catch { /* not a full URI */ }
      // Reconstruct prefix from the previously stored value
      if (storedValue) {
        try {
          new URL(storedValue)
          const prefix = storedValue.slice(0, storedValue.lastIndexOf('/') + 1)
          if (prefix) return prefix + displayValue
        } catch { /* storedValue was not a URI */ }
      }
      // Fall back to configured prefix
      if (opts?.prefix) return opts.prefix + displayValue
      return displayValue
    }
  },

  /**
   * Strips a known prefix from the stored value for display, re-adds it on encode.
   * Requires "transformOptions": { "prefix": "https://..." }.
   *
   * Config example:
   *   "transform": "stripPrefix"
   *   "transformOptions": { "prefix": "https://data.gv.at/catalog/" }
   */
  stripPrefix: {
    display(storedValue, opts) {
      if (!storedValue || !opts?.prefix) return storedValue
      return storedValue.startsWith(opts.prefix)
        ? storedValue.slice(opts.prefix.length)
        : storedValue
    },

    encode(displayValue, opts, storedValue) {
      if (!displayValue) return displayValue
      // Already a full URI → store as-is
      try { new URL(displayValue); return displayValue } catch { /* not a full URI */ }
      if (opts?.prefix) return opts.prefix + displayValue
      return displayValue
    }
  },

}

/**
 * Apply the display function of a named transform to a stored value.
 * Returns the raw stored value if the transform is unknown or absent.
 */
/**
 * Register one or more custom transforms ({ display, encode }).
 *
 * @param {string|Record<string, {display: Function, encode: Function}>} nameOrMap
 * @param {{display: Function, encode: Function}} [transform]
 */
export function registerTransform(nameOrMap, transform) {
  const entries = typeof nameOrMap === 'string'
    ? { [nameOrMap]: transform }
    : nameOrMap
  for (const [name, t] of Object.entries(entries)) {
    if (fieldTransforms[name]) {
      console.warn(`[fieldTransforms] "${name}" already exists — skipping. Use a unique name.`)
      continue
    }
    fieldTransforms[name] = t
  }
}

export function applyDisplay(transformName, storedValue, opts) {
  const t = fieldTransforms[transformName]
  if (!t) {
    console.warn(`[fieldTransforms] Unknown transform: "${transformName}"`)
    return storedValue
  }
  return t.display(storedValue, opts)
}

/**
 * Apply the encode function of a named transform.
 * Returns the raw display value if the transform is unknown or absent.
 */
export function applyEncode(transformName, displayValue, opts, storedValue) {
  const t = fieldTransforms[transformName]
  if (!t) {
    console.warn(`[fieldTransforms] Unknown transform: "${transformName}"`)
    return displayValue
  }
  return t.encode(displayValue, opts, storedValue)
}
