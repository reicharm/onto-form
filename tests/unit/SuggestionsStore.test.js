import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { suggestionsStore } from '../../src/services/SuggestionsStore.js'

// ── localStorage mock ──────────────────────────────────────────────────────

const store = {}
const localStorageMock = {
  getItem: vi.fn(k => store[k] ?? null),
  setItem: vi.fn((k, v) => { store[k] = v }),
  removeItem: vi.fn(k => { delete store[k] }),
}

beforeEach(() => {
  // Clear storage and reset user context before each test
  Object.keys(store).forEach(k => delete store[k])
  vi.stubGlobal('localStorage', localStorageMock)
  suggestionsStore.setUserContext({})
})

afterEach(() => {
  vi.unstubAllGlobals()
})

// ── save / get ─────────────────────────────────────────────────────────────

describe('save and get', () => {
  it('returns empty array when nothing stored', () => {
    expect(suggestionsStore.get('dct:publisher')).toEqual([])
  })

  it('saves a value and retrieves it', () => {
    const val = { 'foaf:name': 'Stadt Wien' }
    suggestionsStore.save('dct:publisher', val)
    expect(suggestionsStore.get('dct:publisher')).toEqual([val])
  })

  it('prepends new values (most recent first)', () => {
    suggestionsStore.save('dct:publisher', { 'foaf:name': 'A' })
    suggestionsStore.save('dct:publisher', { 'foaf:name': 'B' })
    const result = suggestionsStore.get('dct:publisher')
    expect(result[0]['foaf:name']).toBe('B')
    expect(result[1]['foaf:name']).toBe('A')
  })

  it('deduplicates identical values', () => {
    const val = { 'foaf:name': 'Stadt Wien' }
    suggestionsStore.save('dct:publisher', val)
    suggestionsStore.save('dct:publisher', val)
    expect(suggestionsStore.get('dct:publisher')).toHaveLength(1)
  })

  it('caps stored values at 5', () => {
    for (let i = 1; i <= 7; i++) {
      suggestionsStore.save('dct:publisher', { 'foaf:name': `Org ${i}` })
    }
    expect(suggestionsStore.get('dct:publisher')).toHaveLength(5)
  })

  it('stores different fields independently', () => {
    suggestionsStore.save('dct:publisher', { 'foaf:name': 'Publisher' })
    suggestionsStore.save('dcat:contactPoint', { 'vcard:fn': 'Contact' })
    expect(suggestionsStore.get('dct:publisher')).toHaveLength(1)
    expect(suggestionsStore.get('dcat:contactPoint')).toHaveLength(1)
  })

  it('ignores empty objects', () => {
    suggestionsStore.save('dct:publisher', {})
    suggestionsStore.save('dct:publisher', { 'foaf:name': '' })
    expect(suggestionsStore.get('dct:publisher')).toHaveLength(0)
  })

  it('ignores null and undefined', () => {
    suggestionsStore.save('dct:publisher', null)
    suggestionsStore.save('dct:publisher', undefined)
    expect(suggestionsStore.get('dct:publisher')).toHaveLength(0)
  })

  it('works with primitive (string) values', () => {
    suggestionsStore.save('dct:title', 'My Dataset')
    expect(suggestionsStore.get('dct:title')).toEqual(['My Dataset'])
  })
})

// ── clear ──────────────────────────────────────────────────────────────────

describe('clear', () => {
  it('removes stored values for a field', () => {
    suggestionsStore.save('dct:publisher', { 'foaf:name': 'A' })
    suggestionsStore.clear('dct:publisher')
    expect(suggestionsStore.get('dct:publisher')).toEqual([])
  })

  it('does not affect other fields', () => {
    suggestionsStore.save('dct:publisher', { 'foaf:name': 'A' })
    suggestionsStore.save('dcat:contactPoint', { 'vcard:fn': 'B' })
    suggestionsStore.clear('dct:publisher')
    expect(suggestionsStore.get('dcat:contactPoint')).toHaveLength(1)
  })
})

// ── user context ───────────────────────────────────────────────────────────

describe('setUserContext', () => {
  it('returns context values when no stored values exist', () => {
    suggestionsStore.setUserContext({
      'dct:publisher': [{ 'foaf:name': 'Bund' }]
    })
    expect(suggestionsStore.get('dct:publisher')).toEqual([{ 'foaf:name': 'Bund' }])
  })

  it('context values appear before stored values', () => {
    suggestionsStore.save('dct:publisher', { 'foaf:name': 'Stored' })
    suggestionsStore.setUserContext({
      'dct:publisher': [{ 'foaf:name': 'Context' }]
    })
    const result = suggestionsStore.get('dct:publisher')
    expect(result[0]['foaf:name']).toBe('Context')
    expect(result[1]['foaf:name']).toBe('Stored')
  })

  it('deduplicates context values that duplicate stored values', () => {
    const val = { 'foaf:name': 'Same' }
    suggestionsStore.save('dct:publisher', val)
    suggestionsStore.setUserContext({ 'dct:publisher': [val] })
    expect(suggestionsStore.get('dct:publisher')).toHaveLength(1)
  })

  it('supports multiple fields', () => {
    suggestionsStore.setUserContext({
      'dct:publisher': [{ 'foaf:name': 'Pub' }],
      'dcat:contactPoint': [{ 'vcard:fn': 'Contact' }]
    })
    expect(suggestionsStore.get('dct:publisher')).toHaveLength(1)
    expect(suggestionsStore.get('dcat:contactPoint')).toHaveLength(1)
  })

  it('passing null resets user context', () => {
    suggestionsStore.setUserContext({ 'dct:publisher': [{ 'foaf:name': 'X' }] })
    suggestionsStore.setUserContext(null)
    expect(suggestionsStore.get('dct:publisher')).toHaveLength(0)
  })
})

// ── label ──────────────────────────────────────────────────────────────────

describe('label', () => {
  it('returns name + email for foaf objects', () => {
    expect(suggestionsStore.label({ 'foaf:name': 'Stadt Wien', 'foaf:mbox': 'x@wien.gv.at' }))
      .toBe('Stadt Wien · x@wien.gv.at')
  })

  it('returns name + email for vcard objects', () => {
    expect(suggestionsStore.label({ 'vcard:fn': 'Team OD', 'vcard:hasEmail': 'od@bund.at' }))
      .toBe('Team OD · od@bund.at')
  })

  it('returns just name when no contact field present', () => {
    expect(suggestionsStore.label({ 'foaf:name': 'Stadt Wien' })).toBe('Stadt Wien')
  })

  it('returns string values directly', () => {
    expect(suggestionsStore.label('My Dataset')).toBe('My Dataset')
  })

  it('returns empty string for null', () => {
    expect(suggestionsStore.label(null)).toBe('')
  })

  it('falls back to joining values for unknown objects', () => {
    expect(suggestionsStore.label({ x: 'foo', y: 'bar' })).toBe('foo · bar')
  })
})
