import { describe, it, expect } from 'vitest'
import { hasValue } from '../../src/composables/useValidation.js'

describe('hasValue', () => {
  it('returns false for null and undefined', () => {
    expect(hasValue(null)).toBe(false)
    expect(hasValue(undefined)).toBe(false)
  })

  it('returns false for empty string', () => {
    expect(hasValue('')).toBe(false)
  })

  it('returns true for non-empty string', () => {
    expect(hasValue('hello')).toBe(true)
  })

  it('returns false for empty array', () => {
    expect(hasValue([])).toBe(false)
  })

  it('returns true for array with a non-empty string item', () => {
    expect(hasValue(['a'])).toBe(true)
  })

  it('returns true for array with a non-empty object item', () => {
    expect(hasValue([{ value: 'http://example.com' }])).toBe(true)
  })

  it('returns false for object with all empty values', () => {
    expect(hasValue({ 'foaf:name': '', 'foaf:mbox': '' })).toBe(false)
  })

  it('returns true for object with at least one non-empty value', () => {
    expect(hasValue({ 'foaf:name': 'Stadt Wien', 'foaf:mbox': '' })).toBe(true)
  })

  it('returns true for object field when required subFields are filled', () => {
    const field = { subFields: [{ id: 'foaf:name', required: true }] }
    expect(hasValue({ 'foaf:name': 'Wien' }, field)).toBe(true)
  })

  it('returns false for object field when required subField is missing', () => {
    const field = { subFields: [{ id: 'foaf:name', required: true }] }
    expect(hasValue({ 'foaf:name': '' }, field)).toBe(false)
  })
})
