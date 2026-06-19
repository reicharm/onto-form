import { describe, it, expect } from 'vitest'
import { RDFExporter } from '../../src/services/RDFExporter.js'

const exporter = new RDFExporter()

describe('RDFExporter', () => {
  describe('toJSONLD', () => {
    it('produces valid JSON', () => {
      const result = exporter.toJSONLD({})
      expect(() => JSON.parse(result)).not.toThrow()
    })

    it('includes @type dcat:Dataset', () => {
      const doc = JSON.parse(exporter.toJSONLD({}))
      expect(doc['@type']).toBe('dcat:Dataset')
    })

    it('uses dct:identifier as @id', () => {
      const doc = JSON.parse(exporter.toJSONLD({ 'dct:identifier': 'https://example.com/ds/1' }))
      expect(doc['@id']).toBe('https://example.com/ds/1')
    })

    it('uses blank node @id when no identifier', () => {
      const doc = JSON.parse(exporter.toJSONLD({}))
      expect(doc['@id']).toMatch(/^_:dataset_/)
    })

    it('serializes language map fields', () => {
      const fd = { 'dct:title': { de: 'Titel', en: 'Title' } }
      const doc = JSON.parse(exporter.toJSONLD(fd))
      expect(doc['dct:title']).toEqual({ de: 'Titel', en: 'Title' })
    })

    it('omits empty language map entries', () => {
      const fd = { 'dct:title': { de: 'Titel', en: '' } }
      const doc = JSON.parse(exporter.toJSONLD(fd))
      expect(doc['dct:title']).toEqual({ de: 'Titel' })
    })

    it('serializes repeatable fields as array items', () => {
      const fd = { 'dcat:keyword': [
        { value: 'tag1', lang: 'de' },
        { value: 'tag2', lang: 'en' }
      ]}
      const doc = JSON.parse(exporter.toJSONLD(fd))
      expect(Array.isArray(doc['dcat:keyword'])).toBe(true)
      expect(doc['dcat:keyword']).toHaveLength(2)
    })

    it('serializes single-item repeatable field without array wrapper', () => {
      const fd = { 'dcat:keyword': [{ value: 'only', lang: 'de' }] }
      const doc = JSON.parse(exporter.toJSONLD(fd))
      expect(Array.isArray(doc['dcat:keyword'])).toBe(false)
      expect(doc['dcat:keyword']['@value']).toBe('only')
    })

    it('serializes sub-object as blank node omitting rdf:type', () => {
      const fd = { 'dcat:contactPoint': { 'vcard:fn': 'John', 'rdf:type': 'vcard:Kind' } }
      const doc = JSON.parse(exporter.toJSONLD(fd))
      expect(doc['dcat:contactPoint']['vcard:fn']).toBe('John')
      expect(doc['dcat:contactPoint']['rdf:type']).toBeUndefined()
    })

    it('includes @type in sub-object when rdf:type is set', () => {
      const fd = { 'dct:temporal': { 'rdf:type': 'dct:PeriodOfTime', 'dcat:startDate': '2020-01-01' } }
      const doc = JSON.parse(exporter.toJSONLD(fd))
      expect(doc['dct:temporal']['@type']).toBe('dct:PeriodOfTime')
    })

    it('omits null and empty string values', () => {
      const fd = { 'dct:title': null, 'dct:description': '', 'dct:identifier': 'https://x.com' }
      const doc = JSON.parse(exporter.toJSONLD(fd))
      expect(doc['dct:title']).toBeUndefined()
      expect(doc['dct:description']).toBeUndefined()
    })

    it('includes @context', () => {
      const doc = JSON.parse(exporter.toJSONLD({}))
      expect(doc['@context']).toBeDefined()
    })
  })

  describe('toTurtle', () => {
    it('produces valid prefix declarations', () => {
      const result = exporter.toTurtle({})
      expect(result).toContain('@prefix dct:')
      expect(result).toContain('@prefix dcat:')
    })

    it('declares dataset as dcat:Dataset', () => {
      const result = exporter.toTurtle({})
      expect(result).toContain('a dcat:Dataset')
    })

    it('uses URI subject when identifier is a URL', () => {
      const result = exporter.toTurtle({ 'dct:identifier': 'https://example.com/ds/1' })
      expect(result).toContain('<https://example.com/ds/1>')
    })

    it('uses blank node subject when no identifier', () => {
      const result = exporter.toTurtle({})
      expect(result).toContain('_:dataset')
    })

    it('serializes language map as @lang literals', () => {
      const result = exporter.toTurtle({ 'dct:title': { de: 'Hallo', en: 'Hello' } })
      expect(result).toContain('"Hallo"@de')
      expect(result).toContain('"Hello"@en')
    })

    it('serializes date values with xsd:date type', () => {
      const result = exporter.toTurtle({ 'dct:issued': '2024-01-15' })
      expect(result).toContain('"2024-01-15"^^xsd:date')
    })

    it('serializes URI values as <uri>', () => {
      const result = exporter.toTurtle({ 'dct:publisher': 'https://example.com/org' })
      expect(result).toContain('<https://example.com/org>')
    })

    it('serializes repeatable langstring items', () => {
      const fd = { 'dcat:keyword': [{ value: 'tag1', lang: 'de' }] }
      const result = exporter.toTurtle(fd)
      expect(result).toContain('"tag1"@de')
    })

    it('escapes special characters in literals', () => {
      const result = exporter.toTurtle({ 'dct:description': { en: 'Line1\nLine2' } })
      expect(result).toContain('\\n')
    })

    it('serializes sub-object as blank node', () => {
      const fd = { 'dcat:contactPoint': { 'vcard:fn': 'Jane', 'vcard:hasEmail': 'jane@example.com' } }
      const result = exporter.toTurtle(fd)
      expect(result).toContain('dcat:contactPoint [')
      expect(result).toContain('vcard:fn "Jane"')
    })

    it('emits rdf:type as "a" in sub-object blank node', () => {
      const fd = { 'dct:temporal': { 'rdf:type': 'dct:PeriodOfTime', 'dcat:startDate': '2020-01-01' } }
      const result = exporter.toTurtle(fd)
      expect(result).toContain('a dct:PeriodOfTime')
    })

    it('serializes date sub-fields with ^^xsd:date', () => {
      const fd = { 'dct:temporal': { 'rdf:type': 'dct:PeriodOfTime', 'dcat:startDate': '2002-01-01', 'dcat:endDate': '2024-01-01' } }
      const result = exporter.toTurtle(fd)
      expect(result).toContain('"2002-01-01"^^xsd:date')
      expect(result).toContain('"2024-01-01"^^xsd:date')
    })
  })

  describe('toRDFXML', () => {
    it('produces a valid XML declaration', () => {
      const result = exporter.toRDFXML({})
      expect(result).toContain('<?xml version="1.0" encoding="UTF-8"?>')
    })

    it('wraps content in rdf:RDF root with namespace declarations', () => {
      const result = exporter.toRDFXML({})
      expect(result).toContain('xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#"')
      expect(result).toContain('xmlns:dcat="http://www.w3.org/ns/dcat#"')
      expect(result).toContain('xmlns:dct="http://purl.org/dc/terms/"')
    })

    it('declares dataset as dcat:Dataset with rdf:about', () => {
      const result = exporter.toRDFXML({ 'dct:identifier': 'https://example.com/ds/1' })
      expect(result).toContain('<dcat:Dataset rdf:about="https://example.com/ds/1">')
    })

    it('serializes language map as xml:lang attributes', () => {
      const result = exporter.toRDFXML({ 'dct:title': { de: 'Titel', en: 'Title' } })
      expect(result).toContain('xml:lang="de"')
      expect(result).toContain('>Titel<')
    })

    it('serializes URI values as rdf:resource', () => {
      const result = exporter.toRDFXML({ 'dct:publisher': 'https://example.com/org' })
      expect(result).toContain('rdf:resource="https://example.com/org"')
    })

    it('serializes date values with rdf:datatype xsd:date', () => {
      const result = exporter.toRDFXML({ 'dct:issued': '2024-01-15' })
      expect(result).toContain('rdf:datatype="http://www.w3.org/2001/XMLSchema#date"')
      expect(result).toContain('>2024-01-15<')
    })

    it('serializes sub-object with rdf:type as typed XML element and ^^xsd:date sub-fields', () => {
      const fd = { 'dct:temporal': { 'rdf:type': 'dct:PeriodOfTime', 'dcat:startDate': '2002-01-01', 'dcat:endDate': '2024-01-01' } }
      const result = exporter.toRDFXML(fd)
      expect(result).toContain('<dct:PeriodOfTime>')
      expect(result).toContain('rdf:datatype="http://www.w3.org/2001/XMLSchema#date"')
    })

    it('escapes special XML characters', () => {
      const result = exporter.toRDFXML({ 'dct:description': { en: 'A & B < C' } })
      expect(result).toContain('A &amp; B &lt; C')
    })
  })
})
