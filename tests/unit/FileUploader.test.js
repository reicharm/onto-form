import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { FileUploader } from '../../src/services/FileUploader.js'

// Always reset the auth provider between tests
afterEach(() => {
  FileUploader.setAuthProvider(null)
})

function makeFile(name = 'test.csv', type = 'text/csv', content = 'a,b') {
  return new File([content], name, { type })
}

function mockFetch(status, body, headers = {}) {
  return vi.fn().mockResolvedValue({
    ok: status >= 200 && status < 300,
    status,
    text: async () => (typeof body === 'string' ? body : JSON.stringify(body)),
    json: async () => (typeof body === 'string' ? JSON.parse(body) : body),
    headers: new Headers(headers)
  })
}

describe('FileUploader', () => {
  let uploader

  beforeEach(() => {
    uploader = new FileUploader()
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  describe('POST multipart (default)', () => {
    it('returns plain text response as download URL', async () => {
      global.fetch = mockFetch(200, 'https://store.example.com/files/test.csv')
      const url = await uploader.upload(makeFile(), { uploadUrl: 'https://api.example.com/upload', responseType: 'text' })
      expect(url).toBe('https://store.example.com/files/test.csv')
    })

    it('reads URL from JSON response field', async () => {
      global.fetch = mockFetch(200, { url: 'https://store.example.com/files/data.csv' })
      const url = await uploader.upload(makeFile('data.csv'), {
        uploadUrl: 'https://api.example.com/upload',
        responseType: 'json',
        responseUrlField: 'url'
      })
      expect(url).toBe('https://store.example.com/files/data.csv')
    })

    it('reads URL from nested JSON field path', async () => {
      global.fetch = mockFetch(200, { result: { downloadUrl: 'https://cdn.example.com/f.csv' } })
      const url = await uploader.upload(makeFile(), {
        uploadUrl: 'https://api.example.com/upload',
        responseType: 'json',
        responseUrlField: 'result.downloadUrl'
      })
      expect(url).toBe('https://cdn.example.com/f.csv')
    })

    it('sends POST by default', async () => {
      global.fetch = mockFetch(200, 'https://example.com/f.csv')
      await uploader.upload(makeFile(), { uploadUrl: 'https://api.example.com/upload', responseType: 'text' })
      expect(global.fetch).toHaveBeenCalledWith(
        'https://api.example.com/upload',
        expect.objectContaining({ method: 'POST' })
      )
    })

    it('includes file in FormData under configured field name', async () => {
      global.fetch = mockFetch(200, 'https://example.com/f.csv')
      await uploader.upload(makeFile('report.csv'), {
        uploadUrl: 'https://api.example.com/upload',
        formField: 'attachment',
        responseType: 'text'
      })
      const [, opts] = global.fetch.mock.calls[0]
      expect(opts.body).toBeInstanceOf(FormData)
      expect(opts.body.get('attachment')).toBeTruthy()
    })
  })

  describe('PUT (direct body)', () => {
    it('sends PUT with file body and Content-Type header', async () => {
      global.fetch = mockFetch(200, 'https://store.example.com/upload/test.csv')
      await uploader.upload(makeFile('test.csv', 'text/csv'), {
        uploadUrl: 'https://api.example.com/upload/test.csv',
        method: 'PUT',
        responseType: 'text'
      })
      const [, opts] = global.fetch.mock.calls[0]
      expect(opts.method).toBe('PUT')
      expect(opts.headers['Content-Type']).toBe('text/csv')
      expect(opts.body).toBeInstanceOf(File)
    })
  })

  describe('{filename} URL template', () => {
    it('replaces {filename} in uploadUrl with encoded filename', async () => {
      global.fetch = mockFetch(200, 'https://store.example.com/my file.csv')
      await uploader.upload(makeFile('my file.csv'), {
        uploadUrl: 'https://api.example.com/store/{filename}',
        responseType: 'text'
      })
      const [url] = global.fetch.mock.calls[0]
      expect(url).toBe('https://api.example.com/store/my%20file.csv')
    })
  })

  describe('auth provider hook', () => {
    it('merges headers returned by the provider', async () => {
      global.fetch = mockFetch(200, 'https://example.com/f.csv')
      FileUploader.setAuthProvider(async () => ({ Authorization: 'Bearer tok123' }))
      await uploader.upload(makeFile(), { uploadUrl: 'https://api.example.com/upload', responseType: 'text' })
      const [, opts] = global.fetch.mock.calls[0]
      expect(opts.headers['Authorization']).toBe('Bearer tok123')
    })

    it('provider headers override static config headers', async () => {
      global.fetch = mockFetch(200, 'https://example.com/f.csv')
      FileUploader.setAuthProvider(async () => ({ Authorization: 'Bearer new', 'X-Extra': 'added' }))
      await uploader.upload(makeFile(), {
        uploadUrl: 'https://api.example.com/upload',
        responseType: 'text',
        headers: { Authorization: 'Bearer old', 'X-Static': 'kept' }
      })
      const [, opts] = global.fetch.mock.calls[0]
      expect(opts.headers['Authorization']).toBe('Bearer new')
      expect(opts.headers['X-Static']).toBe('kept')
      expect(opts.headers['X-Extra']).toBe('added')
    })

    it('provider receives the full config object', async () => {
      global.fetch = mockFetch(200, 'https://example.com/f.csv')
      const provider = vi.fn().mockResolvedValue({})
      FileUploader.setAuthProvider(provider)
      const config = { uploadUrl: 'https://api.example.com/upload', responseType: 'text', auth: { type: 'bearer' } }
      await uploader.upload(makeFile(), config)
      expect(provider).toHaveBeenCalledWith(config)
    })

    it('sends no auth headers when no provider is set', async () => {
      global.fetch = mockFetch(200, 'https://example.com/f.csv')
      await uploader.upload(makeFile(), { uploadUrl: 'https://api.example.com/upload', responseType: 'text' })
      const [, opts] = global.fetch.mock.calls[0]
      expect(opts.headers['Authorization']).toBeUndefined()
    })

    it('removing provider with null restores unauthenticated uploads', async () => {
      FileUploader.setAuthProvider(async () => ({ Authorization: 'Bearer tok' }))
      FileUploader.setAuthProvider(null)
      global.fetch = mockFetch(200, 'https://example.com/f.csv')
      await uploader.upload(makeFile(), { uploadUrl: 'https://api.example.com/upload', responseType: 'text' })
      const [, opts] = global.fetch.mock.calls[0]
      expect(opts.headers['Authorization']).toBeUndefined()
    })
  })

  describe('error handling', () => {
    it('throws when uploadUrl is missing', async () => {
      await expect(uploader.upload(makeFile(), {})).rejects.toThrow('uploadUrl is not configured')
    })

    it('throws with HTTP status on non-ok response', async () => {
      global.fetch = mockFetch(403, 'Forbidden')
      await expect(uploader.upload(makeFile(), { uploadUrl: 'https://api.example.com/upload', responseType: 'text' }))
        .rejects.toThrow('HTTP 403')
    })

    it('throws when JSON response has no matching url field', async () => {
      global.fetch = mockFetch(200, { something: 'else' })
      await expect(uploader.upload(makeFile(), {
        uploadUrl: 'https://api.example.com/upload',
        responseType: 'json',
        responseUrlField: 'url'
      })).rejects.toThrow('"url"')
    })
  })
})
