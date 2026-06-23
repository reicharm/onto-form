const _config = {
  assetsBaseUrl: '/'
}

/**
 * Configure global OntoForm settings.
 * Call once before mounting — typically in main.js or the host app's setup.
 *
 * @param {Object} options
 * @param {string} [options.assetsBaseUrl]
 *   Base URL for all static assets fetched by OntoForm (SHACL shapes, UI config
 *   JSON, vocabularies). Defaults to '/'.
 * @param {Object} [options.extend]
 *   Custom functions to register in the OntoForm extension points.
 *   Each key is a map of { name: function } entries.
 * @param {Record<string, Function>}                              [options.extend.validators]
 *   Field validator functions — (value, lang) => string[]
 * @param {Record<string, Function>}                              [options.extend.computes]
 *   Field compute functions — (formData, lang, fieldId) => newValue | undefined
 * @param {Record<string, {display: Function, encode: Function}>} [options.extend.transforms]
 *   Field transform pairs — { display(stored, opts), encode(display, opts, stored) }
 * @param {Record<string, Function>}                              [options.extend.visibility]
 *   visibleIf / requiredIf functions — (formData) => boolean
 */
export function configure(options = {}) {
  if (options.assetsBaseUrl !== undefined) {
    _config.assetsBaseUrl = String(options.assetsBaseUrl).replace(/\/?$/, '/')
  }

  if (options.extend) {
    // Lazy imports avoid circular dependencies at module init time
    const { extend } = options
    if (extend.validators) {
      import('./fieldValidators.js').then(m => m.registerValidator(extend.validators))
    }
    if (extend.computes) {
      import('./fieldComputes.js').then(m => m.registerCompute(extend.computes))
    }
    if (extend.transforms) {
      import('./fieldTransforms.js').then(m => m.registerTransform(extend.transforms))
    }
    if (extend.visibility) {
      import('./fieldVisibility.js').then(m => m.registerVisibility(extend.visibility))
    }
  }
}

/**
 * Resolve a relative asset path against the configured base URL.
 * Leading slashes on `path` are stripped so the base URL is always respected.
 *
 * @param {string} path - e.g. 'shacl/dcat-ap.ttl'
 * @returns {string}
 */
export function assetUrl(path) {
  return _config.assetsBaseUrl + String(path).replace(/^\//, '')
}
