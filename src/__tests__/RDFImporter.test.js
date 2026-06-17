import { describe, it, expect } from 'vitest'
import { RDFImporter } from '../services/RDFImporter.js'

const importer = new RDFImporter()

const basicConfig = {
  fields: {
    'dct:title': { type: 'langstring' },
    'dct:description': { type: 'langstring' },
    'dct:identifier': { type: 'text' },
    'dct:issued': { type: 'date' },
    'dcat:keyword': { type: 'langstring', multiple: true },
    'dcat:theme': { type: 'multiselect' },
    'dcat:contactPoint': {
      type: 'object',
      subFields: [
        { id: 'vcard:fn', type: 'text' },
        { id: 'vcard:hasEmail', type: 'text' }
      ]
    }
  }
}

describe('RDFImporter', () => {
  describe('fromJSONLD', () => {
    it('imports langstring from language map', () => {
      const jsonld = JSON.stringify({ 'dct:title': { de: 'Titel', en: 'Title' } })
      const result = importer.fromJSONLD(jsonld, basicConfig)
      expect(result['dct:title']).toEqual({ de: 'Titel', en: 'Title' })
    })

    it('imports langstring from @value/@language object', () => {
      const jsonld = JSON.stringify({ 'dct:title': { '@value': 'Titel', '@language': 'de' } })
      const result = importer.fromJSONLD(jsonld, basicConfig)
      expect(result['dct:title']).toEqual({ de: 'Titel' })
    })

    it('imports plain text field', () => {
      const jsonld = JSON.stringify({ 'dct:identifier': 'https://example.com/ds/1' })
      const result = importer.fromJSONLD(jsonld, basicConfig)
      expect(result['dct:identifier']).toBe('https://example.com/ds/1')
    })

    it('imports multiselect field as array', () => {
      const jsonld = JSON.stringify({ 'dcat:theme': ['http://a.com', 'http://b.com'] })
      const result = importer.fromJSONLD(jsonld, basicConfig)
      expect(result['dcat:theme']).toEqual(['http://a.com', 'http://b.com'])
    })

    it('imports multiple langstring as array of {value, lang} objects', () => {
      const jsonld = JSON.stringify({
        'dcat:keyword': [
          { '@value': 'tag1', '@language': 'de' },
          { '@value': 'tag2', '@language': 'en' }
        ]
      })
      const result = importer.fromJSONLD(jsonld, basicConfig)
      expect(Array.isArray(result['dcat:keyword'])).toBe(true)
      expect(result['dcat:keyword'][0]).toEqual({ value: 'tag1', lang: 'de' })
    })

    it('imports sub-object field', () => {
      const jsonld = JSON.stringify({
        'dcat:contactPoint': { 'vcard:fn': 'John', 'vcard:hasEmail': 'john@example.com' }
      })
      const result = importer.fromJSONLD(jsonld, basicConfig)
      expect(result['dcat:contactPoint']['vcard:fn']).toBe('John')
    })

    it('truncates datetime to date for date fields', () => {
      const jsonld = JSON.stringify({ 'dct:issued': '2024-01-15T00:00:00Z' })
      const result = importer.fromJSONLD(jsonld, basicConfig)
      expect(result['dct:issued']).toBe('2024-01-15')
    })

    it('returns empty object when config has no fields', () => {
      const jsonld = JSON.stringify({ 'dct:title': { de: 'Test' } })
      expect(importer.fromJSONLD(jsonld, {})).toEqual({})
    })

    it('skips fields not in config', () => {
      const jsonld = JSON.stringify({ 'unknown:field': 'value' })
      const result = importer.fromJSONLD(jsonld, basicConfig)
      expect(result['unknown:field']).toBeUndefined()
    })
  })

  describe('fromTurtle', () => {
    const turtleBasic = `
@prefix dct: <http://purl.org/dc/terms/> .
@prefix dcat: <http://www.w3.org/ns/dcat#> .

<https://example.com/ds/1> a dcat:Dataset ;
    dct:title "My Dataset"@en, "Mein Datensatz"@de ;
    dct:issued "2024-01-15" .
`

    it('imports title from Turtle', async () => {
      const result = await importer.fromTurtle(turtleBasic, basicConfig)
      expect(result['dct:title']).toBeDefined()
      expect(result['dct:title']['en']).toBe('My Dataset')
      expect(result['dct:title']['de']).toBe('Mein Datensatz')
    })

    it('imports date from Turtle', async () => {
      const result = await importer.fromTurtle(turtleBasic, basicConfig)
      expect(result['dct:issued']).toBe('2024-01-15')
    })

    it('normalizes PREFIX declarations', async () => {
      const sparqlStyle = `
PREFIX dct: <http://purl.org/dc/terms/>
PREFIX dcat: <http://www.w3.org/ns/dcat#>

<https://example.com/ds/2> a dcat:Dataset ;
    dct:title "Test"@en .
`
      const result = await importer.fromTurtle(sparqlStyle, basicConfig)
      expect(result['dct:title']).toBeDefined()
    })

    it('imports blank node sub-object', async () => {
      const turtle = `
@prefix dct: <http://purl.org/dc/terms/> .
@prefix dcat: <http://www.w3.org/ns/dcat#> .
@prefix vcard: <http://www.w3.org/2006/vcard/ns#> .

<https://example.com/ds/3> a dcat:Dataset ;
    dcat:contactPoint [
        vcard:fn "Jane Doe" ;
        vcard:hasEmail <mailto:jane@example.com>
    ] .
`
      const result = await importer.fromTurtle(turtle, basicConfig)
      expect(result['dcat:contactPoint']).toBeDefined()
      expect(result['dcat:contactPoint']['vcard:fn']).toBe('Jane Doe')
      expect(result['dcat:contactPoint']['vcard:hasEmail']).toBe('jane@example.com')
    })

    it('strips mailto: prefix from email sub-fields', async () => {
      const turtle = `
@prefix dct: <http://purl.org/dc/terms/> .
@prefix dcat: <http://www.w3.org/ns/dcat#> .
@prefix vcard: <http://www.w3.org/2006/vcard/ns#> .

<https://example.com/ds/4> a dcat:Dataset ;
    dcat:contactPoint [
        vcard:hasEmail <mailto:info@example.com>
    ] .
`
      const result = await importer.fromTurtle(turtle, basicConfig)
      expect(result['dcat:contactPoint']['vcard:hasEmail']).toBe('info@example.com')
    })
  })

  describe('_toPrefixed', () => {
    it('converts known namespace URIs to prefixed form', () => {
      expect(importer._toPrefixed('http://purl.org/dc/terms/title')).toBe('dct:title')
      expect(importer._toPrefixed('http://www.w3.org/ns/dcat#Dataset')).toBe('dcat:Dataset')
    })

    it('returns URI unchanged when prefix not known', () => {
      const uri = 'http://unknown.org/ns/thing'
      expect(importer._toPrefixed(uri)).toBe(uri)
    })
  })

  describe('_coerceToFieldType', () => {
    it('coerces scalar to string for scalar types', () => {
      expect(importer._coerceToFieldType(42, { type: 'text' })).toBe('42')
    })

    it('wraps scalar in array for multiple scalar fields', () => {
      const result = importer._coerceToFieldType('val', { type: 'text', multiple: true })
      expect(result).toEqual(['val'])
    })

    it('returns empty string for null scalar fields', () => {
      expect(importer._coerceToFieldType(null, { type: 'text' })).toBe('')
    })
  })
})
