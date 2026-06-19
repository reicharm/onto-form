import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { uploadAuthStore } from '../../src/services/UploadAuthStore.js'

const URL = 'https://api.example.com/upload'

beforeEach(() => {
  uploadAuthStore.set(URL, null)
})

afterEach(() => {
  vi.restoreAllMocks()
})

describe('UploadAuthStore', () => {
  describe('get / set / has', () => {
    it('returns null when no credentials stored', () => {
      expect(uploadAuthStore.get(URL)).toBeNull()
    })

    it('stores and retrieves credentials', () => {
      uploadAuthStore.set(URL, { token: 'abc' })
      expect(uploadAuthStore.get(URL)).toEqual({ token: 'abc' })
    })

    it('has() returns false when nothing stored', () => {
      expect(uploadAuthStore.has(URL)).toBe(false)
    })

    it('has() returns true when credential value is non-empty', () => {
      uploadAuthStore.set(URL, { token: 'abc' })
      expect(uploadAuthStore.has(URL)).toBe(true)
    })

    it('has() returns false when all values are empty strings', () => {
      uploadAuthStore.set(URL, { token: '' })
      expect(uploadAuthStore.has(URL)).toBe(false)
    })
  })

  describe('requiresCredentials', () => {
    it('returns true for apikey, bearer, basic, oauth2cc', () => {
      for (const t of ['apikey', 'bearer', 'basic', 'oauth2cc']) {
        expect(uploadAuthStore.requiresCredentials(t)).toBe(true)
      }
    })

    it('returns false for none and unknown types', () => {
      expect(uploadAuthStore.requiresCredentials('none')).toBe(false)
      expect(uploadAuthStore.requiresCredentials(undefined)).toBe(false)
    })
  })

  describe('headersFor', () => {
    it('returns {} when auth.type is none', async () => {
      const headers = await uploadAuthStore.headersFor({ uploadUrl: URL, auth: { type: 'none' } })
      expect(headers).toEqual({})
    })

    it('returns {} when no config', async () => {
      const headers = await uploadAuthStore.headersFor(null)
      expect(headers).toEqual({})
    })

    it('returns {} when no credentials stored', async () => {
      const headers = await uploadAuthStore.headersFor({ uploadUrl: URL, auth: { type: 'bearer' } })
      expect(headers).toEqual({})
    })

    it('apikey: returns X-API-Key header', async () => {
      uploadAuthStore.set(URL, { value: 'mykey' })
      const headers = await uploadAuthStore.headersFor({ uploadUrl: URL, auth: { type: 'apikey' } })
      expect(headers).toEqual({ 'X-API-Key': 'mykey' })
    })

    it('apikey: uses custom headerName', async () => {
      uploadAuthStore.set(URL, { value: 'mykey' })
      const headers = await uploadAuthStore.headersFor({ uploadUrl: URL, auth: { type: 'apikey', headerName: 'X-Custom-Key' } })
      expect(headers).toEqual({ 'X-Custom-Key': 'mykey' })
    })

    it('apikey: returns {} when value is empty', async () => {
      uploadAuthStore.set(URL, { value: '' })
      const headers = await uploadAuthStore.headersFor({ uploadUrl: URL, auth: { type: 'apikey' } })
      expect(headers).toEqual({})
    })

    it('bearer: returns Authorization: Bearer header', async () => {
      uploadAuthStore.set(URL, { token: 'mytoken' })
      const headers = await uploadAuthStore.headersFor({ uploadUrl: URL, auth: { type: 'bearer' } })
      expect(headers).toEqual({ Authorization: 'Bearer mytoken' })
    })

    it('bearer: returns {} when token is empty', async () => {
      uploadAuthStore.set(URL, { token: '' })
      const headers = await uploadAuthStore.headersFor({ uploadUrl: URL, auth: { type: 'bearer' } })
      expect(headers).toEqual({})
    })

    it('basic: returns base64-encoded Authorization header', async () => {
      uploadAuthStore.set(URL, { username: 'user', password: 'pass' })
      const headers = await uploadAuthStore.headersFor({ uploadUrl: URL, auth: { type: 'basic' } })
      expect(headers).toEqual({ Authorization: `Basic ${btoa('user:pass')}` })
    })

    it('basic: returns {} when username or password is missing', async () => {
      uploadAuthStore.set(URL, { username: 'user', password: '' })
      const h1 = await uploadAuthStore.headersFor({ uploadUrl: URL, auth: { type: 'basic' } })
      expect(h1).toEqual({})

      uploadAuthStore.set(URL, { username: '', password: 'pass' })
      const h2 = await uploadAuthStore.headersFor({ uploadUrl: URL, auth: { type: 'basic' } })
      expect(h2).toEqual({})
    })

    describe('oauth2cc', () => {
      const TOKEN_URL = 'https://auth.example.com/token'

      function mockTokenFetch(token = 'access123', expiresIn = 3600) {
        global.fetch = vi.fn().mockResolvedValue({
          ok: true,
          status: 200,
          json: async () => ({ access_token: token, expires_in: expiresIn }),
          text: async () => ''
        })
      }

      beforeEach(() => {
        uploadAuthStore.set(URL, null) // clear creds + token cache
      })

      it('fetches token and returns Bearer header', async () => {
        mockTokenFetch('tok1')
        uploadAuthStore.set(URL, { clientId: 'id1', clientSecret: 'sec1' })
        const headers = await uploadAuthStore.headersFor({
          uploadUrl: URL,
          auth: { type: 'oauth2cc', tokenUrl: TOKEN_URL }
        })
        expect(headers).toEqual({ Authorization: 'Bearer tok1' })
        expect(global.fetch).toHaveBeenCalledWith(TOKEN_URL, expect.objectContaining({ method: 'POST' }))
      })

      it('includes scope in token request when configured', async () => {
        mockTokenFetch('tok2')
        uploadAuthStore.set(URL, { clientId: 'id1', clientSecret: 'sec1' })
        await uploadAuthStore.headersFor({
          uploadUrl: URL,
          auth: { type: 'oauth2cc', tokenUrl: TOKEN_URL, scope: 'read write' }
        })
        const body = global.fetch.mock.calls[0][1].body
        expect(body.toString()).toContain('scope=read+write')
      })

      it('reuses cached token on second call', async () => {
        mockTokenFetch('cached-tok')
        uploadAuthStore.set(URL, { clientId: 'id1', clientSecret: 'sec1' })
        const config = { uploadUrl: URL, auth: { type: 'oauth2cc', tokenUrl: TOKEN_URL } }
        await uploadAuthStore.headersFor(config)
        await uploadAuthStore.headersFor(config)
        expect(global.fetch).toHaveBeenCalledTimes(1)
      })

      it('returns {} when tokenUrl is missing', async () => {
        uploadAuthStore.set(URL, { clientId: 'id1', clientSecret: 'sec1' })
        const headers = await uploadAuthStore.headersFor({
          uploadUrl: URL,
          auth: { type: 'oauth2cc' }
        })
        expect(headers).toEqual({})
      })

      it('returns {} when clientId or clientSecret is missing', async () => {
        uploadAuthStore.set(URL, { clientId: '', clientSecret: 'sec1' })
        const headers = await uploadAuthStore.headersFor({
          uploadUrl: URL,
          auth: { type: 'oauth2cc', tokenUrl: TOKEN_URL }
        })
        expect(headers).toEqual({})
      })

      it('throws when token endpoint returns non-ok', async () => {
        global.fetch = vi.fn().mockResolvedValue({
          ok: false, status: 401,
          text: async () => 'Unauthorized'
        })
        uploadAuthStore.set(URL, { clientId: 'id1', clientSecret: 'sec1' })
        await expect(uploadAuthStore.headersFor({
          uploadUrl: URL,
          auth: { type: 'oauth2cc', tokenUrl: TOKEN_URL }
        })).rejects.toThrow('HTTP 401')
      })

      it('invalidates token cache when credentials are changed via set()', async () => {
        mockTokenFetch('first-tok')
        uploadAuthStore.set(URL, { clientId: 'id1', clientSecret: 'sec1' })
        const config = { uploadUrl: URL, auth: { type: 'oauth2cc', tokenUrl: TOKEN_URL } }
        const h1 = await uploadAuthStore.headersFor(config)
        expect(h1).toEqual({ Authorization: 'Bearer first-tok' })

        // Change credentials — should invalidate cache and fetch a new token
        mockTokenFetch('second-tok')
        uploadAuthStore.set(URL, { clientId: 'id2', clientSecret: 'sec2' })
        const h2 = await uploadAuthStore.headersFor(config)
        expect(h2).toEqual({ Authorization: 'Bearer second-tok' })
        expect(global.fetch).toHaveBeenCalledTimes(1) // new mock, called once for the second token
      })
    })

    it('warns and returns {} for unknown auth type', async () => {
      const warn = vi.spyOn(console, 'warn').mockImplementation(() => {})
      uploadAuthStore.set(URL, { value: 'x' })
      const headers = await uploadAuthStore.headersFor({ uploadUrl: URL, auth: { type: 'custom' } })
      expect(headers).toEqual({})
      expect(warn).toHaveBeenCalled()
    })
  })
})
