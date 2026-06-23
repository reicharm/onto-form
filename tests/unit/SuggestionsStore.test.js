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

// ── remove ─────────────────────────────────────────────────────────────────

describe('remove', () => {
  it('removes a specific value by JSON equality', () => {
    const a = { 'foaf:name': 'A' }
    const b = { 'foaf:name': 'B' }
    suggestionsStore.save('dct:publisher', a)
    suggestionsStore.save('dct:publisher', b)
    suggestionsStore.remove('dct:publisher', a)
    expect(suggestionsStore.get('dct:publisher')).toEqual([b])
  })

  it('removes localStorage entry entirely when last item is removed', () => {
    const a = { 'foaf:name': 'A' }
    suggestionsStore.save('dct:publisher', a)
    suggestionsStore.remove('dct:publisher', a)
    expect(suggestionsStore.get('dct:publisher')).toEqual([])
    expect(localStorageMock.removeItem).toHaveBeenCalledWith('ontoform:suggestions:dct:publisher')
  })

  it('does not remove user-context values (they are not stored)', () => {
    const ctx = { 'foaf:name': 'Context' }
    suggestionsStore.setUserContext({ 'dct:publisher': [ctx] })
    suggestionsStore.remove('dct:publisher', ctx)
    expect(suggestionsStore.get('dct:publisher')).toEqual([ctx])
  })

  it('is a no-op when value is not found', () => {
    suggestionsStore.save('dct:publisher', { 'foaf:name': 'A' })
    suggestionsStore.remove('dct:publisher', { 'foaf:name': 'B' })
    expect(suggestionsStore.get('dct:publisher')).toHaveLength(1)
  })
})

// ── removeFor ──────────────────────────────────────────────────────────────

describe('removeFor', () => {
  const publisherField = {
    id: 'dct:publisher',
    remember: true,
    suggestionsFrom: ['dcat:contactPoint'],
    suggestionsMap: { 'vcard:fn': 'foaf:name', 'vcard:hasEmail': 'foaf:mbox' }
  }

  it('removes own stored suggestion by value', () => {
    const val = { 'foaf:name': 'Stadt Wien' }
    suggestionsStore.save('dct:publisher', val)
    suggestionsStore.removeFor(publisherField, val)
    expect(suggestionsStore.get('dct:publisher')).toEqual([])
  })

  it('removes cross-field suggestion from source field storage', () => {
    // Stored in dcat:contactPoint with vcard: keys
    const contact = { 'vcard:fn': 'Team', 'vcard:hasEmail': 'a@b.at' }
    suggestionsStore.save('dcat:contactPoint', contact)

    // getFor returns it remapped to foaf: keys
    const remapped = { 'foaf:name': 'Team', 'foaf:mbox': 'a@b.at' }

    suggestionsStore.removeFor(publisherField, remapped)
    expect(suggestionsStore.get('dcat:contactPoint')).toEqual([])
  })

  it('prefers removing from own field if value exists there', () => {
    // Same remapped value saved in both own and source
    const own = { 'foaf:name': 'Wien' }
    const contact = { 'vcard:fn': 'Wien' }
    suggestionsStore.save('dct:publisher', own)
    suggestionsStore.save('dcat:contactPoint', contact)

    suggestionsStore.removeFor(publisherField, own)
    // own removed; source untouched
    expect(suggestionsStore.get('dct:publisher')).toEqual([])
    expect(suggestionsStore.get('dcat:contactPoint')).toHaveLength(1)
  })

  it('is a no-op for user-context values (not in localStorage)', () => {
    suggestionsStore.setUserContext({ 'dct:publisher': [{ 'foaf:name': 'Ctx' }] })
    suggestionsStore.removeFor(publisherField, { 'foaf:name': 'Ctx' })
    // Still visible via context
    expect(suggestionsStore.get('dct:publisher')).toHaveLength(1)
  })

  it('works for fields without suggestionsFrom', () => {
    const simpleField = { id: 'dct:publisher' }
    suggestionsStore.save('dct:publisher', { 'foaf:name': 'A' })
    suggestionsStore.removeFor(simpleField, { 'foaf:name': 'A' })
    expect(suggestionsStore.get('dct:publisher')).toEqual([])
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

// ── getFor (cross-field) ───────────────────────────────────────────────────

describe('getFor', () => {
  const publisherField = { id: 'dct:publisher' }
  const contactField = {
    id: 'dcat:contactPoint',
    suggestionsFrom: ['dct:publisher'],
    suggestionsMap: {
      'foaf:name': 'vcard:fn',
      'foaf:mbox': 'vcard:hasEmail',
      'foaf:homepage': 'vcard:hasURL'
    }
  }

  it('returns own suggestions when no suggestionsFrom defined', () => {
    suggestionsStore.save('dct:publisher', { 'foaf:name': 'Pub' })
    expect(suggestionsStore.getFor(publisherField)).toHaveLength(1)
  })

  it('remaps keys from foreign field according to suggestionsMap', () => {
    suggestionsStore.save('dct:publisher', {
      'foaf:name': 'Stadt Wien',
      'foaf:mbox': 'pub@wien.gv.at',
      'foaf:homepage': 'https://wien.gv.at'
    })
    const results = suggestionsStore.getFor(contactField)
    const fromPublisher = results.find(r => r['vcard:fn'] === 'Stadt Wien')
    expect(fromPublisher).toBeDefined()
    expect(fromPublisher['vcard:hasEmail']).toBe('pub@wien.gv.at')
    expect(fromPublisher['vcard:hasURL']).toBe('https://wien.gv.at')
  })

  it('own suggestions appear before cross-field suggestions', () => {
    suggestionsStore.save('dct:publisher', { 'foaf:name': 'Foreign' })
    suggestionsStore.save('dcat:contactPoint', { 'vcard:fn': 'Own' })
    const results = suggestionsStore.getFor(contactField)
    expect(results[0]['vcard:fn']).toBe('Own')
  })

  it('deduplicates cross-field values that match own values after remapping', () => {
    // Store the same person in both fields with matching data
    suggestionsStore.save('dct:publisher', { 'foaf:name': 'X', 'foaf:mbox': 'x@x.at' })
    suggestionsStore.save('dcat:contactPoint', { 'vcard:fn': 'X', 'vcard:hasEmail': 'x@x.at' })
    const results = suggestionsStore.getFor(contactField)
    // The remapped publisher entry equals the contact entry — should appear only once
    expect(results.filter(r => r['vcard:fn'] === 'X')).toHaveLength(1)
  })

  it('keeps unknown keys unchanged when not in suggestionsMap', () => {
    suggestionsStore.save('dct:publisher', { 'foaf:name': 'Pub', 'dct:type': 'LocalAuthority' })
    const results = suggestionsStore.getFor(contactField)
    const remapped = results.find(r => r['vcard:fn'] === 'Pub')
    expect(remapped?.['dct:type']).toBe('LocalAuthority')
  })

  it('handles multiple suggestionsFrom sources', () => {
    const multiField = {
      id: 'target',
      suggestionsFrom: ['dct:publisher', 'dcat:contactPoint'],
      suggestionsMap: { 'foaf:name': 'name', 'vcard:fn': 'name' }
    }
    suggestionsStore.save('dct:publisher', { 'foaf:name': 'Pub' })
    suggestionsStore.save('dcat:contactPoint', { 'vcard:fn': 'Contact' })
    const results = suggestionsStore.getFor(multiField)
    expect(results.some(r => r.name === 'Pub')).toBe(true)
    expect(results.some(r => r.name === 'Contact')).toBe(true)
  })
})
