import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { fieldComputeFns, applyComputes } from '../../src/config/fieldComputes.js'

const TODAY = '2024-06-15'

beforeEach(() => {
  vi.useFakeTimers()
  vi.setSystemTime(new Date('2024-06-15'))
})

afterEach(() => {
  vi.useRealTimers()
})

describe('fieldComputeFns', () => {
  describe('setTodayIfTitle', () => {
    it('returns today when title.de is present', () => {
      const data = { 'dct:title': { de: 'Mein Datensatz', en: '' } }
      expect(fieldComputeFns.setTodayIfTitle(data)).toBe(TODAY)
    })

    it('returns today when title.en is present', () => {
      const data = { 'dct:title': { de: '', en: 'My Dataset' } }
      expect(fieldComputeFns.setTodayIfTitle(data)).toBe(TODAY)
    })

    it('returns today when title is a plain string', () => {
      const data = { 'dct:title': 'A title' }
      expect(fieldComputeFns.setTodayIfTitle(data)).toBe(TODAY)
    })

    it('returns undefined when no title', () => {
      expect(fieldComputeFns.setTodayIfTitle({})).toBeUndefined()
      expect(fieldComputeFns.setTodayIfTitle({ 'dct:title': { de: '', en: '' } })).toBeUndefined()
    })
  })

  describe('setTodayIfTitleAndEmpty', () => {
    it('returns today when title present and field empty', () => {
      const data = { 'dct:title': { de: 'Titel' } }
      expect(fieldComputeFns.setTodayIfTitleAndEmpty(data, 'de', 'dct:issued')).toBe(TODAY)
    })

    it('returns undefined when field already has a value', () => {
      const data = { 'dct:title': { de: 'Titel' }, 'dct:issued': '2023-01-01' }
      expect(fieldComputeFns.setTodayIfTitleAndEmpty(data, 'de', 'dct:issued')).toBeUndefined()
    })

    it('returns undefined when no title', () => {
      const data = {}
      expect(fieldComputeFns.setTodayIfTitleAndEmpty(data, 'de', 'dct:issued')).toBeUndefined()
    })
  })

  describe('setToday', () => {
    it('always returns today', () => {
      expect(fieldComputeFns.setToday()).toBe(TODAY)
    })
  })

  describe('setLanguageFromUI', () => {
    it('sets language URI when field is empty', () => {
      expect(fieldComputeFns.setLanguageFromUI({}, 'de')).toBe(
        'http://publications.europa.eu/resource/authority/language/DEU'
      )
      expect(fieldComputeFns.setLanguageFromUI({}, 'en')).toBe(
        'http://publications.europa.eu/resource/authority/language/ENG'
      )
      expect(fieldComputeFns.setLanguageFromUI({}, 'fr')).toBe(
        'http://publications.europa.eu/resource/authority/language/FRA'
      )
    })

    it('returns undefined when field already has a value', () => {
      const data = { 'dct:language': 'http://some-lang-uri' }
      expect(fieldComputeFns.setLanguageFromUI(data, 'de')).toBeUndefined()
    })
  })
})

describe('applyComputes', () => {
  it('returns formData unchanged if config has no fields', () => {
    const fd = { 'dct:title': { de: 'test' } }
    expect(applyComputes({}, fd, 'de')).toBe(fd)
    expect(applyComputes(null, fd, 'de')).toBe(fd)
  })

  it('applies compute function and returns new object when value changed', () => {
    const config = {
      fields: {
        'dct:modified': { compute: 'setTodayIfTitle' }
      }
    }
    const fd = { 'dct:title': { de: 'Test' } }
    const result = applyComputes(config, fd, 'de')
    expect(result).not.toBe(fd)
    expect(result['dct:modified']).toBe(TODAY)
  })

  it('returns same formData reference when no changes needed', () => {
    const config = {
      fields: {
        'dct:modified': { compute: 'setTodayIfTitle' }
      }
    }
    const fd = { 'dct:title': { de: '' } }
    const result = applyComputes(config, fd, 'de')
    expect(result).toBe(fd)
  })

  it('warns and skips unknown compute functions', () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {})
    const config = {
      fields: {
        'some:field': { compute: 'nonExistentFn' }
      }
    }
    const fd = {}
    applyComputes(config, fd, 'de')
    expect(warn).toHaveBeenCalledWith(expect.stringContaining('nonExistentFn'))
    warn.mockRestore()
  })

  it('skips fields without compute key', () => {
    const config = {
      fields: {
        'dct:title': { type: 'langstring', required: true }
      }
    }
    const fd = { 'dct:title': { de: 'original' } }
    const result = applyComputes(config, fd, 'de')
    expect(result).toBe(fd)
  })
})
