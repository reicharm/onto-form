const _config = {
  assetsBaseUrl: '/'
}

/**
 * Configure global OntoForm settings.
 * Call once before mounting — typically in main.js or the host app's setup.
 *
 * @param {Object} options
 * @param {string} [options.assetsBaseUrl] - Base URL for all static assets fetched by
 *   OntoForm (SHACL shapes, UI config JSON, vocabularies).  Defaults to '/'.
 *   Set to e.g. '/ontoform/' or 'https://cdn.example.com/ontoform/' when the
 *   assets are not served from the web-root.
 */
export function configure(options = {}) {
  if (options.assetsBaseUrl !== undefined) {
    _config.assetsBaseUrl = String(options.assetsBaseUrl).replace(/\/?$/, '/')
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
