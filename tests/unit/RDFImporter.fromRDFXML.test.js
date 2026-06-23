import { describe, it, expect } from 'vitest'
import { RDFImporter } from '../../src/services/RDFImporter.js'

const importer = new RDFImporter()

// ── Config stubs ──────────────────────────────────────────────────────────────

const basicConfig = {
  fields: {
    'dct:title': { type: 'langstring' },
    'dct:identifier': { type: 'text' },
    'dct:description': { type: 'langstring' },
  }
}

const distConfig = {
  fields: {
    'dct:title': { type: 'langstring' },
    'dcat:distribution': { type: 'distribution-editor' },
  }
}

// ── RDF/XML helpers ───────────────────────────────────────────────────────────

const MINIMAL_RDFXML = `<?xml version="1.0" encoding="UTF-8"?>
<rdf:RDF
  xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#"
  xmlns:dct="http://purl.org/dc/terms/"
  xmlns:dcat="http://www.w3.org/ns/dcat#">
  <dcat:Dataset rdf:about="https://example.com/dataset/1">
    <dct:title xml:lang="de">Testdatensatz</dct:title>
    <dct:identifier>https://example.com/dataset/1</dct:identifier>
    <dct:description xml:lang="de">Eine Beschreibung</dct:description>
    <dct:description xml:lang="en">A description</dct:description>
  </dcat:Dataset>
</rdf:RDF>`

const RDFXML_WITH_DISTRIBUTION = `<?xml version="1.0" encoding="UTF-8"?>
<rdf:RDF
  xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#"
  xmlns:dct="http://purl.org/dc/terms/"
  xmlns:dcat="http://www.w3.org/ns/dcat#">
  <dcat:Dataset rdf:about="https://example.com/dataset/2">
    <dct:title xml:lang="de">Dataset mit Distribution</dct:title>
    <dcat:distribution>
      <rdf:Description>
        <dcat:accessURL rdf:resource="https://example.com/data.csv"/>
        <dct:title xml:lang="de">CSV Download</dct:title>
      </rdf:Description>
    </dcat:distribution>
    <dcat:distribution>
      <rdf:Description>
        <dcat:accessURL rdf:resource="https://example.com/data.json"/>
      </rdf:Description>
    </dcat:distribution>
  </dcat:Dataset>
</rdf:RDF>`

const MALFORMED_XML = `<?xml version="1.0" encoding="UTF-8"?>
<rdf:RDF xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#">
  <unclosed-tag>
</rdf:RDF>`

// ── Tests ─────────────────────────────────────────────────────────────────────

describe('RDFImporter.fromRDFXML', () => {
  describe('basic parsing', () => {
    it('parses dct:title with xml:lang="de" as langstring', () => {
      const result = importer.fromRDFXML(MINIMAL_RDFXML, basicConfig)
      expect(result['dct:title']).toBeDefined()
      expect(result['dct:title'].de).toBe('Testdatensatz')
    })

    it('parses dct:identifier as text', () => {
      const result = importer.fromRDFXML(MINIMAL_RDFXML, basicConfig)
      expect(result['dct:identifier']).toBe('https://example.com/dataset/1')
    })

    it('parses dct:description in multiple languages', () => {
      const result = importer.fromRDFXML(MINIMAL_RDFXML, basicConfig)
      expect(result['dct:description']).toBeDefined()
      expect(result['dct:description'].de).toBe('Eine Beschreibung')
      expect(result['dct:description'].en).toBe('A description')
    })

    it('returns only fields defined in config', () => {
      const result = importer.fromRDFXML(MINIMAL_RDFXML, basicConfig)
      const keys = Object.keys(result)
      // Only fields from config should appear
      for (const key of keys) {
        expect(basicConfig.fields).toHaveProperty(key)
      }
    })
  })

  describe('dcat:distribution sub-elements', () => {
    it('parses dcat:distribution into an array', () => {
      const result = importer.fromRDFXML(RDFXML_WITH_DISTRIBUTION, distConfig)
      expect(Array.isArray(result['dcat:distribution'])).toBe(true)
    })

    it('each distribution has dcat:accessURL', () => {
      const result = importer.fromRDFXML(RDFXML_WITH_DISTRIBUTION, distConfig)
      const distributions = result['dcat:distribution']
      expect(distributions.length).toBeGreaterThanOrEqual(1)
      for (const dist of distributions) {
        expect(dist['dcat:accessURL']).toBeDefined()
      }
    })

    it('parses two distributions', () => {
      const result = importer.fromRDFXML(RDFXML_WITH_DISTRIBUTION, distConfig)
      expect(result['dcat:distribution'].length).toBe(2)
    })

    it('first distribution has correct accessURL', () => {
      const result = importer.fromRDFXML(RDFXML_WITH_DISTRIBUTION, distConfig)
      const first = result['dcat:distribution'][0]
      expect(first['dcat:accessURL']).toBe('https://example.com/data.csv')
    })
  })

  describe('error handling', () => {
    it('throws with a useful message when XML is malformed', () => {
      expect(() => importer.fromRDFXML(MALFORMED_XML, basicConfig)).toThrow()
    })

    it('throws when no dcat:Dataset element is found', () => {
      const noDataset = `<?xml version="1.0"?>
<rdf:RDF xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#">
  <rdf:Description rdf:about="http://example.com/x"/>
</rdf:RDF>`
      expect(() => importer.fromRDFXML(noDataset, basicConfig)).toThrow(/dcat:Dataset/)
    })

    it('returns empty formData when config has no fields', () => {
      const result = importer.fromRDFXML(MINIMAL_RDFXML, { fields: {} })
      expect(result).toEqual({})
    })
  })
})
