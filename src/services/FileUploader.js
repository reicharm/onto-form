/**
 * Generic file upload service for distribution files.
 *
 * Supports two upload strategies:
 *   POST  — multipart/form-data, file in a named form field
 *   PUT   — file body sent directly with the file's Content-Type
 *
 * The upload URL may contain a `{filename}` placeholder that is replaced
 * with the URL-encoded original file name before the request is made.
 *
 * ## Authentication (auth provider hook)
 *
 * OntoForm does not manage credentials. Instead, the embedding application
 * registers an async function that returns additional HTTP headers for each
 * upload. This keeps auth logic entirely outside OntoForm.
 *
 * Register a provider once at application startup:
 *
 *   import { FileUploader } from 'onto-form/src/services/FileUploader.js'
 *
 *   // Bearer token (e.g. from your own auth store)
 *   FileUploader.setAuthProvider(async (config) => ({
 *     Authorization: `Bearer ${myAuthStore.getToken()}`
 *   }))
 *
 *   // API key
 *   FileUploader.setAuthProvider(async (config) => ({
 *     'X-API-Key': myConfig.apiKey
 *   }))
 *
 *   // Per-endpoint logic (config.uploadUrl identifies the target)
 *   FileUploader.setAuthProvider(async (config) => {
 *     if (config.uploadUrl.includes('internal-api')) {
 *       return { Authorization: `Bearer ${internalStore.token}` }
 *     }
 *     return { 'X-API-Key': publicApiKey }
 *   })
 *
 *   // OAuth2 / async token fetch
 *   FileUploader.setAuthProvider(async (config) => {
 *     const token = await oauthClient.getValidToken()   // handles refresh internally
 *     return { Authorization: `Bearer ${token}` }
 *   })
 *
 *   // Remove the provider (back to unauthenticated uploads)
 *   FileUploader.setAuthProvider(null)
 *
 * The provider receives the full fileUpload config object so it can make
 * per-endpoint decisions. Returned headers are merged into every request;
 * auth headers take precedence over static `config.headers`.
 *
 * Config object shape (fileUpload field in UI config):
 * {
 *   uploadUrl:        string   — required; API endpoint (may contain {filename})
 *   method:          string   — "POST" (default) or "PUT"
 *   formField:       string   — form-data field name for POST (default "file")
 *   responseType:    string   — "text" (default) or "json"
 *   responseUrlField:string   — JSON field path for the URL (default "url")
 *   headers:         object   — static additional request headers (optional)
 *   auth: {
 *     type:          string   — informational: "bearer"|"apikey"|"basic"|"oauth2cc"
 *                              OntoForm does not act on this; it is a hint for the
 *                              embedding application about what the API expects.
 *   }
 * }
 */

/** @type {((config: object) => Promise<Record<string,string>>) | null} */
let _authProvider = null

export class FileUploader {
  /**
   * Registers a global async function that returns auth headers for every upload.
   * Pass null to remove the provider (uploads will be unauthenticated).
   *
   * @param {((config: object) => Promise<Record<string,string>>) | null} providerFn
   */
  static setAuthProvider(providerFn) {
    _authProvider = providerFn ?? null
  }

  /**
   * @param {File} file
   * @param {object} config — fileUpload config block from the field definition
   * @returns {Promise<string>} download URL returned by the API
   */
  async upload(file, config) {
    if (!config?.uploadUrl) throw new Error('fileUpload.uploadUrl is not configured')

    const url = config.uploadUrl.replace('{filename}', encodeURIComponent(file.name))
    const method = (config.method || 'POST').toUpperCase()

    // Static config headers < auth provider headers (provider may override)
    const authHeaders = _authProvider ? await _authProvider(config) : {}
    const headers = { ...(config.headers || {}), ...authHeaders }

    let body
    if (method === 'PUT') {
      headers['Content-Type'] = file.type || 'application/octet-stream'
      body = file
    } else {
      const fd = new FormData()
      fd.append(config.formField || 'file', file, file.name)
      body = fd
    }

    const res = await fetch(url, { method, headers, body })

    if (!res.ok) {
      const text = await res.text().catch(() => '')
      throw new Error(`Upload failed: HTTP ${res.status}${text ? ' – ' + text.slice(0, 200) : ''}`)
    }

    const responseType = config.responseType || 'text'

    if (responseType === 'json') {
      const data = await res.json()
      const fieldPath = config.responseUrlField || 'url'
      const downloadUrl = getNestedField(data, fieldPath)
      if (!downloadUrl) throw new Error(`Response JSON has no field "${fieldPath}"`)
      return String(downloadUrl)
    }

    return (await res.text()).trim()
  }
}

function getNestedField(obj, path) {
  return path.split('.').reduce((o, k) => (o != null ? o[k] : undefined), obj)
}
