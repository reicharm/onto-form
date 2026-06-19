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
 * Response parsing:
 *   "text" — response body is used as-is (the download URL)
 *   "json" — response body is parsed as JSON; the URL is read from the
 *             field named by `responseUrlField` (dot-path notation, default "url")
 *
 * Config object shape:
 * {
 *   uploadUrl:        string   — required; API endpoint (may contain {filename})
 *   method:          string   — "POST" (default) or "PUT"
 *   formField:       string   — form-data field name for POST (default "file")
 *   responseType:    string   — "text" (default) or "json"
 *   responseUrlField:string   — JSON field path for the URL (default "url")
 *   headers:         object   — additional request headers (optional)
 * }
 */
export class FileUploader {
  /**
   * @param {File} file
   * @param {object} config
   * @returns {Promise<string>} download URL returned by the API
   */
  async upload(file, config) {
    if (!config?.uploadUrl) throw new Error('fileUpload.uploadUrl is not configured')

    const url = config.uploadUrl.replace('{filename}', encodeURIComponent(file.name))
    const method = (config.method || 'POST').toUpperCase()
    const headers = { ...(config.headers || {}) }

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
