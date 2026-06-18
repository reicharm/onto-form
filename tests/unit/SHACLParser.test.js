import { describe, it, expect, beforeEach, vi } from 'vitest'
import { SHACLParser } from '../../src/services/SHACLParser.js'

function makeTTL({ maxCount, minCount } = {}) {
  const maxLine = maxCount !== undefined ? `sh:maxCount ${maxCount} ;` : ''
  const minLine = minCount !== undefined ? `sh:minCount ${minCount} ;` : ''
  return `
@prefix sh: <http://www.w3.org/ns/shacl#> .
@prefix dct: <http://purl.org/dc/terms/> .
@prefix xsd: <http://www.w3.org/2001/XMLSchema#> .

<http://example.org/TestShape> a sh:NodeShape ;
  sh:targetClass <http://example.org/Test> ;
  sh:property [
    sh:path dct:title ;
    ${maxLine}
    ${minLine}
    sh:datatype xsd:string
  ] .
`
}

async function parseField(ttl) {
  const parser = new SHACLParser()
  const shapes = await parser.parse(ttl)
  const shape = shapes['http://example.org/Test']
  return shape.fields['dct:title']
}

describe('SHACLParser – multiple field mapping', () => {
  it('sh:maxCount 1 → multiple: false', async () => {
    const field = await parseField(makeTTL({ maxCount: 1 }))
    expect(field.multiple).toBe(false)
  })

  it('sh:maxCount 2 → multiple: true', async () => {
    const field = await parseField(makeTTL({ maxCount: 2 }))
    expect(field.multiple).toBe(true)
  })

  it('no sh:maxCount → multiple: false', async () => {
    const field = await parseField(makeTTL())
    expect(field.multiple).toBe(false)
  })
})

describe('SHACLParser – required field mapping', () => {
  it('sh:minCount 1 → required: true', async () => {
    const field = await parseField(makeTTL({ minCount: 1 }))
    expect(field.required).toBe(true)
  })

  it('no sh:minCount → required: false', async () => {
    const field = await parseField(makeTTL())
    expect(field.required).toBe(false)
  })
})
