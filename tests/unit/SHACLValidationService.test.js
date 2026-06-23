import { describe, it, expect } from 'vitest'
import { SHACLValidationService } from '../../src/services/SHACLValidationService.js'

const SH   = 'http://www.w3.org/ns/shacl#'
const RDF  = 'http://www.w3.org/1999/02/22-rdf-syntax-ns#'
const XSD  = 'http://www.w3.org/2001/XMLSchema#'
const DCAT = 'http://www.w3.org/ns/dcat#'
const DCT  = 'http://purl.org/dc/terms/'

// Minimal SHACL Turtle with Dataset shape
function makeTTL(properties = '') {
  return `
@prefix sh:   <${SH}> .
@prefix rdf:  <${RDF}> .
@prefix xsd:  <${XSD}> .
@prefix dcat: <${DCAT}> .
@prefix dct:  <${DCT}> .

<urn:DatasetShape>
  a sh:NodeShape ;
  sh:targetClass dcat:Dataset ;
  ${properties}
  .
`
}

function prop(path, constraints = '') {
  return `sh:property [ sh:path ${path} ; ${constraints} ] ;`
}

const svc = new SHACLValidationService()
const config = {
  standard: 'dcat-ap-at',
  fields: {
    'dct:title':       { label: { de: 'Titel', en: 'Title' } },
    'dct:description': { label: { de: 'Beschreibung', en: 'Description' } },
    'dcat:landingPage':{ label: { de: 'Landingpage', en: 'Landing page' } },
  },
  groups: [
    { id: 'basic', fields: ['dct:title', 'dct:description', 'dcat:landingPage'] }
  ]
}

describe('SHACLValidationService', () => {
  it('returns valid=true with no violations for empty shape', async () => {
    const result = await svc.validate(makeTTL(), {}, config)
    expect(result.valid).toBe(true)
    expect(result.violations).toHaveLength(0)
  })

  it('returns valid=true when no Dataset shape found', async () => {
    const ttl = `@prefix sh: <${SH}> . @prefix rdf: <${RDF}> .`
    const result = await svc.validate(ttl, {}, config)
    expect(result.valid).toBe(true)
  })

  describe('sh:minCount', () => {
    const ttl = makeTTL(prop('dct:title', 'sh:minCount 1 ;'))

    it('violation when required field is empty', async () => {
      const result = await svc.validate(ttl, { 'dct:title': '' }, config)
      expect(result.valid).toBe(false)
      const v = result.violations[0]
      expect(v.fieldId).toBe('dct:title')
      expect(v.constraint).toBe('minCount')
      expect(v.severity).toBe('violation')
    })

    it('no violation when required field has value', async () => {
      const result = await svc.validate(ttl, { 'dct:title': { de: 'Test' } }, config)
      expect(result.valid).toBe(true)
    })

    it('violation when langstring map is all empty', async () => {
      const result = await svc.validate(ttl, { 'dct:title': { de: '', en: '' } }, config)
      expect(result.valid).toBe(false)
    })

    it('no violation when array has at least one non-empty item', async () => {
      const ttl2 = makeTTL(prop('dct:description', 'sh:minCount 1 ;'))
      const result = await svc.validate(ttl2, { 'dct:description': [{ value: 'Hello', lang: 'en' }] }, config)
      expect(result.valid).toBe(true)
    })
  })

  describe('sh:maxCount', () => {
    const ttl = makeTTL(prop('dct:title', 'sh:maxCount 1 ;'))

    it('no violation when count is within limit', async () => {
      const result = await svc.validate(ttl, { 'dct:title': 'one' }, config)
      expect(result.valid).toBe(true)
    })

    it('violation when too many values', async () => {
      const result = await svc.validate(ttl, { 'dct:title': ['a', 'b'] }, config)
      expect(result.valid).toBe(false)
      expect(result.violations[0].constraint).toBe('maxCount')
    })
  })

  describe('sh:nodeKind sh:IRI', () => {
    const IRI = `${SH}IRI`
    const ttl = makeTTL(prop('dcat:landingPage', `sh:nodeKind <${IRI}> ;`))

    it('violation when value is not a URI', async () => {
      const result = await svc.validate(ttl, { 'dcat:landingPage': 'not-a-uri' }, config)
      expect(result.violations[0].constraint).toBe('nodeKind')
    })

    it('no violation when value is a URI', async () => {
      const result = await svc.validate(ttl, { 'dcat:landingPage': 'https://example.com' }, config)
      expect(result.valid).toBe(true)
    })
  })

  describe('sh:datatype xsd:date', () => {
    const ttl = makeTTL(prop('dct:issued', `sh:datatype xsd:date ; sh:minCount 1 ;`))

    it('violation when value is not a date', async () => {
      const result = await svc.validate(ttl, { 'dct:issued': 'not-a-date' }, config)
      const v = result.violations.find(v => v.constraint === 'datatype')
      expect(v).toBeDefined()
    })

    it('no violation for valid date', async () => {
      const result = await svc.validate(ttl, { 'dct:issued': '2024-01-15' }, config)
      expect(result.valid).toBe(true)
    })
  })

  describe('sh:pattern', () => {
    const ttl = makeTTL(prop('dct:title', `sh:minCount 1 ; sh:pattern "^[A-Z]" ;`))

    it('violation when value does not match pattern', async () => {
      const result = await svc.validate(ttl, { 'dct:title': 'lowercase' }, config)
      expect(result.violations.find(v => v.constraint === 'pattern')).toBeDefined()
    })

    it('no violation when value matches pattern', async () => {
      const result = await svc.validate(ttl, { 'dct:title': 'Uppercase' }, config)
      expect(result.valid).toBe(true)
    })
  })

  describe('fieldLabel and groupId', () => {
    const ttl = makeTTL(prop('dct:title', 'sh:minCount 1 ;'))

    it('includes fieldLabel from config', async () => {
      const result = await svc.validate(ttl, {}, config)
      expect(result.violations[0].fieldLabel).toEqual({ de: 'Titel', en: 'Title' })
    })

    it('includes groupId from config', async () => {
      const result = await svc.validate(ttl, {}, config)
      expect(result.violations[0].groupId).toBe('basic')
    })
  })

  it('sorts violations before warnings', async () => {
    const ttl = makeTTL(
      prop('dct:title',       'sh:minCount 1 ; sh:severity sh:Warning ;') +
      prop('dct:description', 'sh:minCount 1 ;')
    )
    const result = await svc.validate(ttl, {}, config)
    expect(result.violations[0].severity).toBe('violation')
    expect(result.violations[1].severity).toBe('warning')
  })
})
