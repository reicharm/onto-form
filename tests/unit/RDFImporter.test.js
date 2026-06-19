import { describe, it, expect } from 'vitest'
import { RDFImporter } from '../../src/services/RDFImporter.js'

const importer = new RDFImporter()

const distConfig = {
  fields: {
    'dct:title': { type: 'langstring' },
    'dcat:distribution': { type: 'distribution-editor' }
  }
}

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
    },
    'dct:temporal': {
      type: 'object',
      rdfType: 'dct:PeriodOfTime',
      subFields: [
        { id: 'dcat:startDate', type: 'date' },
        { id: 'dcat:endDate', type: 'date' }
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

    it('truncates datetime with timezone offset to date', () => {
      const jsonld = JSON.stringify({ 'dct:issued': '2024-06-19T14:30:00+02:00' })
      const result = importer.fromJSONLD(jsonld, basicConfig)
      expect(result['dct:issued']).toBe('2024-06-19')
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

    it('falls back to subject URI when dct:identifier is a non-URI literal', async () => {
      const turtle = `
@prefix dct: <http://purl.org/dc/terms/> .
@prefix dcat: <http://www.w3.org/ns/dcat#> .

<https://example.com/datasets/abc-123> a dcat:Dataset ;
    dct:identifier "abc-123" .
`
      const config = { fields: { 'dct:identifier': { type: 'text', validate: 'isURI' } } }
      const result = await importer.fromTurtle(turtle, config)
      expect(result['dct:identifier']).toBe('https://example.com/datasets/abc-123')
    })

    it('uses literal dct:identifier when it is a valid URI', async () => {
      const turtle = `
@prefix dct: <http://purl.org/dc/terms/> .
@prefix dcat: <http://www.w3.org/ns/dcat#> .

<https://example.com/datasets/abc-123> a dcat:Dataset ;
    dct:identifier "https://example.com/datasets/abc-123" .
`
      const config = { fields: { 'dct:identifier': { type: 'text', validate: 'isURI' } } }
      const result = await importer.fromTurtle(turtle, config)
      expect(result['dct:identifier']).toBe('https://example.com/datasets/abc-123')
    })

    it('imports distributions referenced by named node URI', async () => {
      const turtle = `
@prefix dct: <http://purl.org/dc/terms/> .
@prefix dcat: <http://www.w3.org/ns/dcat#> .

<https://example.com/ds/1> a dcat:Dataset ;
    dcat:distribution <https://example.com/dist/1> .

<https://example.com/dist/1> a dcat:Distribution ;
    dcat:accessURL <https://example.com/file.csv> ;
    dct:title "My CSV" .
`
      const config = { fields: { 'dcat:distribution': { type: 'distribution-editor' } } }
      const result = await importer.fromTurtle(turtle, config)
      expect(result['dcat:distribution']).toHaveLength(1)
      expect(result['dcat:distribution'][0]['dcat:accessURL']).toBe('https://example.com/file.csv')
    })

    it('imports keywords without language tag as lang=de', async () => {
      const turtle = `
@prefix dct: <http://purl.org/dc/terms/> .
@prefix dcat: <http://www.w3.org/ns/dcat#> .

<https://example.com/ds/1> a dcat:Dataset ;
    dcat:keyword "GSAA", "InVeKoS" .
`
      const result = await importer.fromTurtle(turtle, basicConfig)
      expect(Array.isArray(result['dcat:keyword'])).toBe(true)
      expect(result['dcat:keyword'].length).toBeGreaterThan(0)
      expect(result['dcat:keyword'][0].lang).toBe('de')
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

  describe('fromRDFXML', () => {
    it('imports langstring from xml:lang attribute', () => {
      const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rdf:RDF xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#"
         xmlns:dct="http://purl.org/dc/terms/"
         xmlns:dcat="http://www.w3.org/ns/dcat#">
  <dcat:Dataset rdf:about="https://example.com/ds/1">
    <dct:title xml:lang="de">Titel</dct:title>
    <dct:title xml:lang="en">Title</dct:title>
  </dcat:Dataset>
</rdf:RDF>`
      const result = importer.fromRDFXML(xml, basicConfig)
      expect(result['dct:title']['de']).toBe('Titel')
      expect(result['dct:title']['en']).toBe('Title')
    })

    it('imports identifier from rdf:about', () => {
      const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rdf:RDF xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#"
         xmlns:dct="http://purl.org/dc/terms/"
         xmlns:dcat="http://www.w3.org/ns/dcat#">
  <dcat:Dataset rdf:about="https://example.com/ds/1">
  </dcat:Dataset>
</rdf:RDF>`
      const result = importer.fromRDFXML(xml, basicConfig)
      expect(result['dct:identifier']).toBe('https://example.com/ds/1')
    })

    it('imports URI values from rdf:resource', () => {
      const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rdf:RDF xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#"
         xmlns:dct="http://purl.org/dc/terms/"
         xmlns:dcat="http://www.w3.org/ns/dcat#">
  <dcat:Dataset>
    <dcat:theme rdf:resource="http://eurovoc.europa.eu/100141"/>
  </dcat:Dataset>
</rdf:RDF>`
      const result = importer.fromRDFXML(xml, basicConfig)
      expect(result['dcat:theme']).toContain('http://eurovoc.europa.eu/100141')
    })

    it('imports sub-object blank node with rdf:type', () => {
      const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rdf:RDF xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#"
         xmlns:dct="http://purl.org/dc/terms/"
         xmlns:dcat="http://www.w3.org/ns/dcat#">
  <dcat:Dataset>
    <dct:temporal>
      <dct:PeriodOfTime>
        <dcat:startDate rdf:datatype="http://www.w3.org/2001/XMLSchema#date">2002-01-01</dcat:startDate>
        <dcat:endDate rdf:datatype="http://www.w3.org/2001/XMLSchema#date">2024-01-01</dcat:endDate>
      </dct:PeriodOfTime>
    </dct:temporal>
  </dcat:Dataset>
</rdf:RDF>`
      const result = importer.fromRDFXML(xml, basicConfig)
      expect(result['dct:temporal']['dcat:startDate']).toBe('2002-01-01')
      expect(result['dct:temporal']['dcat:endDate']).toBe('2024-01-01')
      expect(result['dct:temporal']['rdf:type']).toBe('dct:PeriodOfTime')
    })

    it('throws on malformed XML', () => {
      expect(() => importer.fromRDFXML('<broken', basicConfig)).toThrow()
    })

    it('throws when no dcat:Dataset element found', () => {
      const xml = `<?xml version="1.0"?><rdf:RDF xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#"></rdf:RDF>`
      expect(() => importer.fromRDFXML(xml, basicConfig)).toThrow('dcat:Dataset')
    })
  })

  describe('fromTurtle – rdf:type in sub-objects', () => {
    it('preserves rdf:type from blank node in object field', async () => {
      const turtle = `
@prefix dct: <http://purl.org/dc/terms/> .
@prefix dcat: <http://www.w3.org/ns/dcat#> .

<https://example.com/ds/1> a dcat:Dataset ;
    dct:temporal [
        a dct:PeriodOfTime ;
        dcat:startDate "2002-01-01"^^<http://www.w3.org/2001/XMLSchema#date> ;
        dcat:endDate   "2024-01-01"^^<http://www.w3.org/2001/XMLSchema#date>
    ] .
`
      const result = await importer.fromTurtle(turtle, basicConfig)
      expect(result['dct:temporal']['dcat:startDate']).toBe('2002-01-01')
      expect(result['dct:temporal']['dcat:endDate']).toBe('2024-01-01')
      expect(result['dct:temporal']['rdf:type']).toBe('dct:PeriodOfTime')
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

  describe('distributions (JSON-LD)', () => {
    it('imports a single distribution from compact JSON-LD', () => {
      const jsonld = JSON.stringify({
        'dcat:distribution': [
          { 'dcat:accessURL': 'https://example.com/file.csv', 'dct:format': 'http://publications.europa.eu/resource/authority/file-type/CSV' }
        ]
      })
      const result = importer.fromJSONLD(jsonld, distConfig)
      expect(result['dcat:distribution']).toHaveLength(1)
      expect(result['dcat:distribution'][0]['dcat:accessURL']).toBe('https://example.com/file.csv')
      expect(result['dcat:distribution'][0]['dct:format']).toBe('http://publications.europa.eu/resource/authority/file-type/CSV')
    })

    it('imports multiple distributions', () => {
      const jsonld = JSON.stringify({
        'dcat:distribution': [
          { 'dcat:accessURL': 'https://example.com/a.csv', 'dct:title': 'CSV' },
          { 'dcat:accessURL': 'https://example.com/b.json', 'dct:title': 'JSON' }
        ]
      })
      const result = importer.fromJSONLD(jsonld, distConfig)
      expect(result['dcat:distribution']).toHaveLength(2)
      expect(result['dcat:distribution'][1]['dcat:accessURL']).toBe('https://example.com/b.json')
    })

    it('accepts @id objects for URI fields', () => {
      const jsonld = JSON.stringify({
        'dcat:distribution': [
          { 'dcat:accessURL': { '@id': 'https://example.com/data.csv' } }
        ]
      })
      const result = importer.fromJSONLD(jsonld, distConfig)
      expect(result['dcat:distribution'][0]['dcat:accessURL']).toBe('https://example.com/data.csv')
    })

    it('filters out distributions without accessURL', () => {
      const jsonld = JSON.stringify({
        'dcat:distribution': [
          { 'dct:title': 'No URL' },
          { 'dcat:accessURL': 'https://example.com/ok.csv' }
        ]
      })
      const result = importer.fromJSONLD(jsonld, distConfig)
      expect(result['dcat:distribution']).toHaveLength(1)
    })
  })

  describe('distributions (Turtle)', () => {
    it('imports a blank-node distribution from Turtle', async () => {
      const turtle = `
@prefix dcat: <http://www.w3.org/ns/dcat#> .
@prefix dct: <http://purl.org/dc/terms/> .

<https://example.com/ds/1> a dcat:Dataset ;
    dcat:distribution [
        dcat:accessURL <https://example.com/file.csv> ;
        dct:format <http://publications.europa.eu/resource/authority/file-type/CSV>
    ] .
`
      const result = await importer.fromTurtle(turtle, distConfig)
      expect(result['dcat:distribution']).toHaveLength(1)
      expect(result['dcat:distribution'][0]['dcat:accessURL']).toBe('https://example.com/file.csv')
      expect(result['dcat:distribution'][0]['dct:format']).toBe('http://publications.europa.eu/resource/authority/file-type/CSV')
    })

    it('imports multiple distributions from Turtle', async () => {
      const turtle = `
@prefix dcat: <http://www.w3.org/ns/dcat#> .
@prefix dct: <http://purl.org/dc/terms/> .

<https://example.com/ds/2> a dcat:Dataset ;
    dcat:distribution
        [ dcat:accessURL <https://example.com/a.csv> ; dct:title "CSV"@de ],
        [ dcat:accessURL <https://example.com/b.json> ; dct:title "JSON"@de ] .
`
      const result = await importer.fromTurtle(turtle, distConfig)
      expect(result['dcat:distribution']).toHaveLength(2)
    })

    it('truncates datetime to date in distribution date fields', async () => {
      const turtle = `
@prefix dcat: <http://www.w3.org/ns/dcat#> .
@prefix dct: <http://purl.org/dc/terms/> .
@prefix xsd: <http://www.w3.org/2001/XMLSchema#> .

<https://example.com/ds/3> a dcat:Dataset ;
    dcat:distribution [
        dcat:accessURL <https://example.com/f.csv> ;
        dct:issued "2024-03-15T00:00:00"^^xsd:dateTime
    ] .
`
      const result = await importer.fromTurtle(turtle, distConfig)
      expect(result['dcat:distribution'][0]['dct:issued']).toBe('2024-03-15')
    })

    it('truncates dateTime with timezone to date in distribution fields', async () => {
      const turtle = `
@prefix dcat: <http://www.w3.org/ns/dcat#> .
@prefix dct: <http://purl.org/dc/terms/> .
@prefix xsd: <http://www.w3.org/2001/XMLSchema#> .

<https://example.com/ds/tz> a dcat:Dataset ;
    dcat:distribution [
        dcat:accessURL <https://example.com/f.csv> ;
        dct:issued "2024-06-19T14:30:00+02:00"^^xsd:dateTime
    ] .
`
      const result = await importer.fromTurtle(turtle, distConfig)
      expect(result['dcat:distribution'][0]['dct:issued']).toBe('2024-06-19')
    })

    it('imports dcatap:availability using dcatap prefix', async () => {
      const turtle = `
@prefix dcat: <http://www.w3.org/ns/dcat#> .
@prefix dcatap: <http://data.europa.eu/r5r/> .

<https://example.com/ds/4> a dcat:Dataset ;
    dcat:distribution [
        dcat:accessURL <https://example.com/f.csv> ;
        dcatap:availability <http://data.europa.eu/r5r/availability/stable>
    ] .
`
      const result = await importer.fromTurtle(turtle, distConfig)
      expect(result['dcat:distribution'][0]['dcatap:availability'])
        .toBe('http://data.europa.eu/r5r/availability/stable')
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
