import { describe, it, expect } from 'vitest'
import { fieldValidators } from '../config/fieldValidators.js'

describe('fieldValidators', () => {
  describe('isURI', () => {
    it('returns no errors for empty value', () => {
      expect(fieldValidators.isURI('', 'en')).toEqual([])
      expect(fieldValidators.isURI(null, 'en')).toEqual([])
      expect(fieldValidators.isURI(undefined, 'en')).toEqual([])
    })

    it('returns no errors for valid URLs', () => {
      expect(fieldValidators.isURI('https://example.com', 'en')).toEqual([])
      expect(fieldValidators.isURI('http://example.com/path?q=1', 'en')).toEqual([])
    })

    it('returns English error for invalid URL', () => {
      const errors = fieldValidators.isURI('not-a-url', 'en')
      expect(errors).toEqual(['Invalid URL.'])
    })

    it('returns German error for invalid URL when lang=de', () => {
      const errors = fieldValidators.isURI('not-a-url', 'de')
      expect(errors).toEqual(['Ungültige URL.'])
    })
  })

  describe('isURIList', () => {
    it('returns no errors for non-array value', () => {
      expect(fieldValidators.isURIList('not-array', 'en')).toEqual([])
    })

    it('returns no errors for empty array', () => {
      expect(fieldValidators.isURIList([], 'en')).toEqual([])
    })

    it('returns no errors for array of valid URLs', () => {
      expect(fieldValidators.isURIList(['https://a.com', 'http://b.org'], 'en')).toEqual([])
    })

    it('returns errors for invalid URLs in array', () => {
      const errors = fieldValidators.isURIList(['https://valid.com', 'bad-url'], 'en')
      expect(errors).toHaveLength(1)
      expect(errors[0]).toContain('Entry 2')
    })

    it('skips empty items', () => {
      expect(fieldValidators.isURIList(['', null], 'en')).toEqual([])
    })

    it('returns German error labels when lang=de', () => {
      const errors = fieldValidators.isURIList(['bad'], 'de')
      expect(errors[0]).toContain('Eintrag 1')
    })
  })

  describe('isEmail', () => {
    it('returns no errors for empty value', () => {
      expect(fieldValidators.isEmail('', 'en')).toEqual([])
    })

    it('returns no errors for valid email', () => {
      expect(fieldValidators.isEmail('user@example.com', 'en')).toEqual([])
    })

    it('returns English error for invalid email', () => {
      expect(fieldValidators.isEmail('not-an-email', 'en')).toEqual(['Invalid email address.'])
    })

    it('returns German error when lang=de', () => {
      expect(fieldValidators.isEmail('bad', 'de')).toEqual(['Ungültige E-Mail-Adresse.'])
    })
  })

  describe('isDate', () => {
    it('returns no errors for empty value', () => {
      expect(fieldValidators.isDate('', 'en')).toEqual([])
    })

    it('returns no errors for valid date YYYY-MM-DD', () => {
      expect(fieldValidators.isDate('2024-01-15', 'en')).toEqual([])
    })

    it('returns error for invalid date format', () => {
      expect(fieldValidators.isDate('15.01.2024', 'en')).toEqual(['Invalid date (YYYY-MM-DD).'])
      expect(fieldValidators.isDate('2024/01/15', 'en')).toEqual(['Invalid date (YYYY-MM-DD).'])
    })

    it('returns German error when lang=de', () => {
      expect(fieldValidators.isDate('bad-date', 'de')).toEqual(['Ungültiges Datum (JJJJ-MM-TT).'])
    })
  })

  describe('isWKTorGeoJSON', () => {
    it('returns no errors for empty value', () => {
      expect(fieldValidators.isWKTorGeoJSON('', 'en')).toEqual([])
    })

    it('accepts WKT geometry', () => {
      expect(fieldValidators.isWKTorGeoJSON('POINT(13.4 52.5)', 'en')).toEqual([])
      expect(fieldValidators.isWKTorGeoJSON('POLYGON((0 0, 1 0, 1 1, 0 0))', 'en')).toEqual([])
    })

    it('accepts GeoJSON geometry', () => {
      const geojson = '{"type":"Point","coordinates":[13.4,52.5]}'
      expect(fieldValidators.isWKTorGeoJSON(geojson, 'en')).toEqual([])
    })

    it('rejects invalid geometry', () => {
      expect(fieldValidators.isWKTorGeoJSON('not geometry', 'en')).toEqual(['Please enter a WKT or GeoJSON geometry.'])
    })

    it('returns German error when lang=de', () => {
      expect(fieldValidators.isWKTorGeoJSON('bad', 'de')).toEqual(['Bitte WKT- oder GeoJSON-Geometrie eingeben.'])
    })
  })
})
