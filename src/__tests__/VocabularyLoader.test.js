import { describe, it, expect, vi, beforeEach } from 'vitest'
import { VocabularyLoader } from '../services/VocabularyLoader.js'

function makeLoader() {
  return new VocabularyLoader()
}

function mockFetch(data, ok = true) {
  global.fetch = vi.fn().mockResolvedValue({
    ok,
    status: ok ? 200 : 404,
    json: () => Promise.resolve(data)
  })
}

beforeEach(() => {
  vi.restoreAllMocks()
})

describe('VocabularyLoader', () => {
  describe('load', () => {
    it('fetches and returns normalized options', async () => {
      const loader = makeLoader()
      const native = [
        { value: 'http://a.com', label: { de: 'A', en: 'A-en' } }
      ]
      mockFetch(native)
      const result = await loader.load('http://vocab.example.com')
      expect(result).toEqual(native)
      expect(fetch).toHaveBeenCalledWith('http://vocab.example.com')
    })

    it('caches results and only fetches once', async () => {
      const loader = makeLoader()
      mockFetch([{ value: 'http://x.com', label: { de: 'X' } }])
      await loader.load('http://vocab.example.com/cached')
      await loader.load('http://vocab.example.com/cached')
      expect(fetch).toHaveBeenCalledTimes(1)
    })

    it('tries fallback when primary source fails', async () => {
      const loader = makeLoader()
      const fallbackData = [{ value: 'http://fb.com', label: { de: 'Fallback' } }]
      global.fetch = vi.fn()
        .mockResolvedValueOnce({ ok: false, status: 500, json: () => Promise.resolve({}) })
        .mockResolvedValueOnce({ ok: true, json: () => Promise.resolve(fallbackData) })
      const result = await loader.load('http://primary.fail', 'http://fallback.ok')
      expect(result).toEqual(fallbackData)
    })

    it('throws when source fails and no fallback', async () => {
      const loader = makeLoader()
      global.fetch = vi.fn().mockResolvedValue({ ok: false, status: 503, json: () => Promise.resolve({}) })
      await expect(loader.load('http://bad.source')).rejects.toThrow('Failed to load vocabulary')
    })
  })

  describe('_normalize', () => {
    it('normalizes native format array', () => {
      const loader = makeLoader()
      const data = [{ value: 'http://a.com', label: { de: 'A' } }]
      expect(loader._normalize(data)).toEqual(data)
    })

    it('normalizes SKOS-lite format', () => {
      const loader = makeLoader()
      const data = [{ uri: 'http://a.com', prefLabel: { de: 'A', en: 'A-en' } }]
      const result = loader._normalize(data)
      expect(result[0].value).toBe('http://a.com')
      expect(result[0].label).toEqual({ de: 'A', en: 'A-en' })
    })

    it('normalizes SPARQL JSON format', () => {
      const loader = makeLoader()
      const data = {
        results: {
          bindings: [
            { concept: { value: 'http://a.com' }, label: { 'xml:lang': 'de', value: 'A-de' } },
            { concept: { value: 'http://a.com' }, label: { 'xml:lang': 'en', value: 'A-en' } }
          ]
        }
      }
      const result = loader._normalize(data)
      expect(result).toHaveLength(1)
      expect(result[0].value).toBe('http://a.com')
      expect(result[0].label).toEqual({ de: 'A-de', en: 'A-en' })
    })

    it('normalizes JSON-LD @graph format', () => {
      const loader = makeLoader()
      const data = {
        '@graph': [
          {
            '@id': 'http://a.com',
            'skos:prefLabel': [
              { '@language': 'de', '@value': 'Deutsch' },
              { '@language': 'en', '@value': 'English' }
            ]
          }
        ]
      }
      const result = loader._normalize(data)
      expect(result[0].value).toBe('http://a.com')
      expect(result[0].label).toEqual({ de: 'Deutsch', en: 'English' })
    })

    it('returns empty array for unknown format', () => {
      const loader = makeLoader()
      expect(loader._normalize({ unknown: true })).toEqual([])
    })

    it('filters out null items from array', () => {
      const loader = makeLoader()
      const data = [
        { value: 'http://a.com', label: { de: 'A' } },
        { notValid: true }
      ]
      const result = loader._normalize(data)
      expect(result).toHaveLength(1)
    })
  })

  describe('_normalizeSparql', () => {
    it('skips bindings missing uri, lang, or val', () => {
      const loader = makeLoader()
      const bindings = [
        { concept: { value: 'http://a.com' } }, // missing label
        { label: { 'xml:lang': 'de', value: 'test' } } // missing concept
      ]
      const result = loader._normalizeSparql(bindings)
      expect(result).toHaveLength(0)
    })

    it('handles uri key in addition to concept key', () => {
      const loader = makeLoader()
      const bindings = [
        { uri: { value: 'http://b.com' }, label: { 'xml:lang': 'en', value: 'B' } }
      ]
      const result = loader._normalizeSparql(bindings)
      expect(result[0].value).toBe('http://b.com')
    })
  })
})
