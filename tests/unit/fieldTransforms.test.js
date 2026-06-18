import { describe, it, expect } from 'vitest'
import { fieldTransforms, applyDisplay, applyEncode } from '../../src/config/fieldTransforms.js'

describe('uriSuffix.display', () => {
  const { display } = fieldTransforms.uriSuffix

  it('returns empty/null values unchanged', () => {
    expect(display('')).toBe('')
    expect(display(null)).toBe(null)
    expect(display(undefined)).toBe(undefined)
  })

  it('returns last path segment of a URI', () => {
    expect(display('https://data.gv.at/dataset/my-dataset')).toBe('my-dataset')
    expect(display('https://example.com/catalog/items/abc-123')).toBe('abc-123')
  })

  it('returns value unchanged when not a valid URI', () => {
    expect(display('not-a-uri')).toBe('not-a-uri')
  })
})

describe('uriSuffix.encode', () => {
  const { encode } = fieldTransforms.uriSuffix

  it('returns empty values unchanged', () => {
    expect(encode('', {}, '')).toBe('')
    expect(encode(null, {}, null)).toBe(null)
  })

  it('stores full URI as-is when user pastes one', () => {
    expect(encode('https://other.org/ds/123', {}, '')).toBe('https://other.org/ds/123')
  })

  it('reconstructs URI from original stored value prefix', () => {
    const result = encode('new-id', {}, 'https://data.gv.at/dataset/old-id')
    expect(result).toBe('https://data.gv.at/dataset/new-id')
  })

  it('uses configured prefix when no stored value exists', () => {
    const result = encode('my-dataset', { prefix: 'https://data.gv.at/dataset/' }, '')
    expect(result).toBe('https://data.gv.at/dataset/my-dataset')
  })

  it('falls back to raw display value when no prefix or stored value', () => {
    expect(encode('just-text', {}, '')).toBe('just-text')
  })
})

describe('stripPrefix.display', () => {
  const { display } = fieldTransforms.stripPrefix

  it('strips configured prefix', () => {
    expect(display('https://catalog.example.com/item-1', { prefix: 'https://catalog.example.com/' }))
      .toBe('item-1')
  })

  it('returns value unchanged when prefix does not match', () => {
    expect(display('https://other.com/item', { prefix: 'https://catalog.example.com/' }))
      .toBe('https://other.com/item')
  })

  it('returns value unchanged when no opts', () => {
    expect(display('https://example.com/x', undefined)).toBe('https://example.com/x')
  })
})

describe('stripPrefix.encode', () => {
  const { encode } = fieldTransforms.stripPrefix

  it('adds configured prefix', () => {
    expect(encode('item-1', { prefix: 'https://catalog.example.com/' }, ''))
      .toBe('https://catalog.example.com/item-1')
  })

  it('stores full URI as-is when user pastes one', () => {
    expect(encode('https://other.com/x', { prefix: 'https://catalog.example.com/' }, ''))
      .toBe('https://other.com/x')
  })
})

describe('applyDisplay', () => {
  it('applies named transform display function', () => {
    expect(applyDisplay('uriSuffix', 'https://example.com/path/id-123'))
      .toBe('id-123')
  })

  it('returns stored value and warns for unknown transform', () => {
    const result = applyDisplay('unknownTransform', 'some-value')
    expect(result).toBe('some-value')
  })
})

describe('applyEncode', () => {
  it('applies named transform encode function', () => {
    expect(applyEncode('uriSuffix', 'new-id', { prefix: 'https://data.gv.at/dataset/' }, ''))
      .toBe('https://data.gv.at/dataset/new-id')
  })

  it('returns display value and warns for unknown transform', () => {
    expect(applyEncode('unknownTransform', 'display-val')).toBe('display-val')
  })
})
