import { describe, it, expect } from 'vitest'
import { SHACLParser } from '../../src/services/SHACLParser.js'

// ─── helpers ────────────────────────────────────────────────────────────────

function makeTTL({ maxCount, minCount, datatype = 'xsd:string', extra = '' } = {}) {
  const maxLine = maxCount !== undefined ? `sh:maxCount ${maxCount} ;` : ''
  const minLine = minCount !== undefined ? `sh:minCount ${minCount} ;` : ''
  return `
@prefix sh:   <http://www.w3.org/ns/shacl#> .
@prefix dct:  <http://purl.org/dc/terms/> .
@prefix xsd:  <http://www.w3.org/2001/XMLSchema#> .
@prefix rdf:  <http://www.w3.org/1999/02/22-rdf-syntax-ns#> .

<http://example.org/TestShape> a sh:NodeShape ;
  sh:targetClass <http://example.org/Test> ;
  sh:property [
    sh:path dct:title ;
    ${maxLine}
    ${minLine}
    sh:datatype ${datatype}
    ${extra}
  ] .
`
}

async function parseField(ttl, fieldId = 'dct:title') {
  const parser = new SHACLParser()
  const shapes = await parser.parse(ttl)
  const shape = shapes['http://example.org/Test']
  return shape?.fields[fieldId]
}

// ─── cardinality ────────────────────────────────────────────────────────────

describe('SHACLParser – multiple field mapping', () => {
  it('sh:maxCount 1 → multiple: false', async () => {
    expect((await parseField(makeTTL({ maxCount: 1 }))).multiple).toBe(false)
  })

  it('sh:maxCount 2 → multiple: true', async () => {
    expect((await parseField(makeTTL({ maxCount: 2 }))).multiple).toBe(true)
  })

  it('no sh:maxCount → multiple: false', async () => {
    expect((await parseField(makeTTL())).multiple).toBe(false)
  })
})

describe('SHACLParser – required field mapping', () => {
  it('sh:minCount 1 → required: true', async () => {
    expect((await parseField(makeTTL({ minCount: 1 }))).required).toBe(true)
  })

  it('no sh:minCount → required: false', async () => {
    expect((await parseField(makeTTL())).required).toBe(false)
  })
})

// ─── datatype → field type mapping ──────────────────────────────────────────

describe('SHACLParser – datatype mapping', () => {
  const cases = [
    ['xsd:string',             'text'],
    ['xsd:date',               'date'],
    ['xsd:dateTime',           'date'],
    ['xsd:anyURI',             'uri'],
    ['rdf:langString',         'langstring'],
    ['xsd:integer',            'text'],
    ['xsd:decimal',            'text'],
    ['xsd:nonNegativeInteger', 'text'],
  ]

  for (const [datatype, expectedType] of cases) {
    it(`${datatype} → type: "${expectedType}"`, async () => {
      const field = await parseField(makeTTL({ datatype }))
      expect(field.type).toBe(expectedType)
    })
  }

  it('unknown datatype falls back to "text"', async () => {
    const field = await parseField(makeTTL({ datatype: 'xsd:boolean' }))
    expect(field.type).toBe('text')
  })

  it('sh:nodeKind sh:IRI → type: "uri" (no datatype)', async () => {
    const ttl = `
@prefix sh:   <http://www.w3.org/ns/shacl#> .
@prefix dct:  <http://purl.org/dc/terms/> .

<http://example.org/TestShape> a sh:NodeShape ;
  sh:targetClass <http://example.org/Test> ;
  sh:property [
    sh:path dct:title ;
    sh:nodeKind sh:IRI
  ] .
`
    const field = await parseField(ttl)
    expect(field.type).toBe('uri')
  })
})

// ─── sh:in (enum / select) ───────────────────────────────────────────────────

describe('SHACLParser – sh:in (enum options)', () => {
  it('sh:in list → type: "select" with options array', async () => {
    const ttl = `
@prefix sh:   <http://www.w3.org/ns/shacl#> .
@prefix dct:  <http://purl.org/dc/terms/> .
@prefix ex:   <http://example.org/> .

<ex:TestShape> a sh:NodeShape ;
  sh:targetClass ex:Test ;
  sh:property [
    sh:path dct:title ;
    sh:in ( ex:A ex:B ex:C )
  ] .
`
    const field = await parseField(ttl)
    expect(field.type).toBe('select')
    expect(field.options).toHaveLength(3)
    expect(field.options[0].value).toBe('http://example.org/A')
    expect(field.options[2].value).toBe('http://example.org/C')
  })
})

// ─── sh:name / sh:description ───────────────────────────────────────────────

describe('SHACLParser – sh:name and sh:description', () => {
  it('extracts sh:name as localised label', async () => {
    const ttl = `
@prefix sh:   <http://www.w3.org/ns/shacl#> .
@prefix dct:  <http://purl.org/dc/terms/> .
@prefix xsd:  <http://www.w3.org/2001/XMLSchema#> .

<http://example.org/TestShape> a sh:NodeShape ;
  sh:targetClass <http://example.org/Test> ;
  sh:property [
    sh:path dct:title ;
    sh:name "Titel"@de ;
    sh:name "Title"@en ;
    sh:datatype xsd:string
  ] .
`
    const field = await parseField(ttl)
    expect(field.label.de).toBe('Titel')
    expect(field.label.en).toBe('Title')
  })

  it('extracts sh:description as localised hint', async () => {
    const ttl = `
@prefix sh:   <http://www.w3.org/ns/shacl#> .
@prefix dct:  <http://purl.org/dc/terms/> .
@prefix xsd:  <http://www.w3.org/2001/XMLSchema#> .

<http://example.org/TestShape> a sh:NodeShape ;
  sh:targetClass <http://example.org/Test> ;
  sh:property [
    sh:path dct:title ;
    sh:description "Pflichtfeld"@de ;
    sh:description "Required field"@en ;
    sh:datatype xsd:string
  ] .
`
    const field = await parseField(ttl)
    expect(field.hint.de).toBe('Pflichtfeld')
    expect(field.hint.en).toBe('Required field')
  })
})

// ─── multiple shapes / no targetClass ────────────────────────────────────────

describe('SHACLParser – multiple shapes', () => {
  it('parses two NodeShapes independently', async () => {
    const ttl = `
@prefix sh:   <http://www.w3.org/ns/shacl#> .
@prefix dct:  <http://purl.org/dc/terms/> .
@prefix xsd:  <http://www.w3.org/2001/XMLSchema#> .
@prefix ex:   <http://example.org/> .

ex:ShapeA a sh:NodeShape ; sh:targetClass ex:A ;
  sh:property [ sh:path dct:title ; sh:datatype xsd:string ; sh:minCount 1 ] .

ex:ShapeB a sh:NodeShape ; sh:targetClass ex:B ;
  sh:property [ sh:path dct:title ; sh:datatype xsd:string ] .
`
    const parser = new SHACLParser()
    const shapes = await parser.parse(ttl)
    expect(shapes['http://example.org/A'].fields['dct:title'].required).toBe(true)
    expect(shapes['http://example.org/B'].fields['dct:title'].required).toBe(false)
  })

  it('falls back to shape subject URI as key when no sh:targetClass', async () => {
    const ttl = `
@prefix sh:   <http://www.w3.org/ns/shacl#> .
@prefix dct:  <http://purl.org/dc/terms/> .
@prefix xsd:  <http://www.w3.org/2001/XMLSchema#> .
@prefix ex:   <http://example.org/> .

ex:OrphanShape a sh:NodeShape ;
  sh:property [ sh:path dct:title ; sh:datatype xsd:string ] .
`
    const parser = new SHACLParser()
    const shapes = await parser.parse(ttl)
    expect(shapes['http://example.org/OrphanShape']).toBeDefined()
  })
})
