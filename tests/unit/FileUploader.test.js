import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { FileUploader } from '../../src/services/FileUploader.js'
import { uploadAuthStore } from '../../src/services/UploadAuthStore.js'

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

  describe('authentication header injection', () => {
    const uploadUrl = 'https://api.example.com/upload'

    beforeEach(() => {
      uploadAuthStore.set(uploadUrl, null)
    })

    it('passes bearer token as Authorization header', async () => {
      global.fetch = mockFetch(200, 'https://example.com/f.csv')
      uploadAuthStore.set(uploadUrl, { token: 'mytoken' })
      await uploader.upload(makeFile(), { uploadUrl, responseType: 'text', auth: { type: 'bearer' } })
      const [, opts] = global.fetch.mock.calls[0]
      expect(opts.headers['Authorization']).toBe('Bearer mytoken')
    })

    it('passes API key as X-API-Key header', async () => {
      global.fetch = mockFetch(200, 'https://example.com/f.csv')
      uploadAuthStore.set(uploadUrl, { value: 'secretkey' })
      await uploader.upload(makeFile(), { uploadUrl, responseType: 'text', auth: { type: 'apikey' } })
      const [, opts] = global.fetch.mock.calls[0]
      expect(opts.headers['X-API-Key']).toBe('secretkey')
    })

    it('auth headers override static config headers', async () => {
      global.fetch = mockFetch(200, 'https://example.com/f.csv')
      uploadAuthStore.set(uploadUrl, { token: 'override' })
      await uploader.upload(makeFile(), {
        uploadUrl, responseType: 'text',
        headers: { Authorization: 'Bearer old', 'X-Custom': 'kept' },
        auth: { type: 'bearer' }
      })
      const [, opts] = global.fetch.mock.calls[0]
      expect(opts.headers['Authorization']).toBe('Bearer override')
      expect(opts.headers['X-Custom']).toBe('kept')
    })

    it('sends no auth headers when no credentials stored', async () => {
      global.fetch = mockFetch(200, 'https://example.com/f.csv')
      await uploader.upload(makeFile(), { uploadUrl, responseType: 'text', auth: { type: 'bearer' } })
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
