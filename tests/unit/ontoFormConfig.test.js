import { describe, it, expect, beforeEach } from 'vitest'

// Re-import fresh module state for each test via dynamic import with cache-bust
// Vitest resets module registry between test files, so a direct import is safe here.
import { configure, assetUrl } from '../../src/config/ontoFormConfig.js'

describe('ontoFormConfig', () => {
  beforeEach(() => {
    // Reset to default before each test
    configure({ assetsBaseUrl: '/' })
  })

  it('defaults to root base url', () => {
    expect(assetUrl('shacl/dcat-ap.ttl')).toBe('/shacl/dcat-ap.ttl')
  })

  it('resolves path with leading slash against base', () => {
    expect(assetUrl('/shacl/dcat-ap.ttl')).toBe('/shacl/dcat-ap.ttl')
  })

  it('configure sets a custom base url', () => {
    configure({ assetsBaseUrl: '/ontoform/' })
    expect(assetUrl('shacl/dcat-ap.ttl')).toBe('/ontoform/shacl/dcat-ap.ttl')
  })

  it('normalises missing trailing slash on base url', () => {
    configure({ assetsBaseUrl: '/assets' })
    expect(assetUrl('shacl/test.ttl')).toBe('/assets/shacl/test.ttl')
  })

  it('strips leading slash from path when base has trailing slash', () => {
    configure({ assetsBaseUrl: 'https://cdn.example.com/of/' })
    expect(assetUrl('/vocabularies/file-format.json')).toBe('https://cdn.example.com/of/vocabularies/file-format.json')
  })

  it('ignores unknown options keys', () => {
    configure({ unknownKey: 'value' })
    expect(assetUrl('test.json')).toBe('/test.json')
  })
})
