/**
 * Session-scoped credential store for file upload authentication.
 *
 * Credentials are kept only in memory — they are never written to
 * localStorage, sessionStorage, or any config file, and are lost
 * when the tab is closed.
 *
 * Each upload configuration is identified by its `uploadUrl`; that
 * string is used as the store key so different API endpoints can
 * hold independent credentials.
 *
 * Supported auth types (declared in fileUpload.auth.type):
 *
 *   "apikey"   — single value added as a configurable HTTP header
 *                credentials: { value: string }
 *
 *   "bearer"   — value sent as "Authorization: Bearer <token>"
 *                credentials: { token: string }
 *
 *   "basic"    — RFC 7617 HTTP Basic, Base64-encoded user:password
 *                credentials: { username: string, password: string }
 *
 *   "oauth2cc" — OAuth 2.0 Client Credentials flow; token is fetched
 *                automatically and refreshed on expiry
 *                credentials: { clientId: string, clientSecret: string }
 *                config also needs: auth.tokenUrl, auth.scope (optional)
 */

import { reactive } from 'vue'

// credentials[uploadUrl] = { ...fields } | null
const credentials = reactive({})

// oauth token cache: tokenCache[uploadUrl] = { accessToken, expiresAt }
const tokenCache = {}

export const uploadAuthStore = {
  /**
   * Returns the stored credentials for the given upload URL, or null.
   */
  get(uploadUrl) {
    return credentials[uploadUrl] ?? null
  },

  /**
   * Stores credentials for an upload URL.
   * Pass null to clear.
   */
  set(uploadUrl, creds) {
    credentials[uploadUrl] = creds
    // Invalidate any cached OAuth token when credentials change
    delete tokenCache[uploadUrl]
  },

  /**
   * True when credentials have been provided for this upload URL.
   */
  has(uploadUrl) {
    const c = credentials[uploadUrl]
    if (!c) return false
    return Object.values(c).some(v => v)
  },

  /**
   * Builds the Authorization / API-Key headers for a request.
   * For oauth2cc: fetches (or reuses) an access token automatically.
   *
   * @param {object} config  — the full fileUpload config object
   * @returns {Promise<object>} headers to merge into the request
   */
  async headersFor(config) {
    const auth = config?.auth
    if (!auth?.type || auth.type === 'none') return {}

    const key = config.uploadUrl
    const creds = credentials[key]
    if (!creds) return {}

    switch (auth.type) {
      case 'apikey': {
        const headerName = auth.headerName || 'X-API-Key'
        return creds.value ? { [headerName]: creds.value } : {}
      }

      case 'bearer': {
        return creds.token ? { Authorization: `Bearer ${creds.token}` } : {}
      }

      case 'basic': {
        if (!creds.username || !creds.password) return {}
        const encoded = btoa(`${creds.username}:${creds.password}`)
        return { Authorization: `Basic ${encoded}` }
      }

      case 'oauth2cc': {
        const token = await getOAuth2Token(key, auth, creds)
        return token ? { Authorization: `Bearer ${token}` } : {}
      }

      default:
        console.warn(`[UploadAuthStore] Unknown auth type: "${auth.type}"`)
        return {}
    }
  },

  /** True if the auth type requires credentials input from the user. */
  requiresCredentials(authType) {
    return ['apikey', 'bearer', 'basic', 'oauth2cc'].includes(authType)
  }
}

async function getOAuth2Token(uploadUrl, authConfig, creds) {
  const cached = tokenCache[uploadUrl]
  if (cached && Date.now() < cached.expiresAt - 30_000) {
    return cached.accessToken
  }

  if (!creds.clientId || !creds.clientSecret || !authConfig.tokenUrl) return null

  const body = new URLSearchParams({
    grant_type: 'client_credentials',
    client_id: creds.clientId,
    client_secret: creds.clientSecret,
    ...(authConfig.scope ? { scope: authConfig.scope } : {})
  })

  const res = await fetch(authConfig.tokenUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body
  })

  if (!res.ok) {
    const text = await res.text().catch(() => '')
    throw new Error(`OAuth2 token request failed: HTTP ${res.status}${text ? ' – ' + text.slice(0, 200) : ''}`)
  }

  const data = await res.json()
  const accessToken = data.access_token
  const expiresIn = data.expires_in ?? 3600
  tokenCache[uploadUrl] = { accessToken, expiresAt: Date.now() + expiresIn * 1000 }
  return accessToken
}
