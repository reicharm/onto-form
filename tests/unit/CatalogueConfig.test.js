import { describe, it, expect, beforeAll } from 'vitest'
import fs from 'node:fs'
import path from 'node:path'
import { FormConfigResolver } from '../../src/services/FormConfigResolver.js'

// End-to-end check (no mocks) that the dcat:Catalog form config resolves
// correctly against the real public/ assets: it must reuse the dcat-ap-at
// SHACL (via shaclSource) rather than expecting its own non-existent
// shacl/dcat-ap-at-catalogue.ttl file.
beforeAll(() => {
  global.fetch = async (url) => {
    const relative = String(url).replace(/^\/+/, '')
    const filePath = path.resolve(process.cwd(), 'public', relative)
    if (!fs.existsSync(filePath)) {
      return { ok: false, status: 404, text: async () => '', json: async () => ({}) }
    }
    const content = fs.readFileSync(filePath, 'utf8')
    return { ok: true, text: async () => content, json: async () => JSON.parse(content) }
  }
})

describe('dcat-ap-at-catalogue config (real assets)', () => {
  it('resolves using the dataset SHACL via shaclSource', async () => {
    const resolver = new FormConfigResolver()
    const result = await resolver.resolve('dcat-ap-at-catalogue')
    expect(result.rootClass).toBe('dcat:Catalog')
  })

  it('includes only fields from the Catalog shape', async () => {
    const resolver = new FormConfigResolver()
    const result = await resolver.resolve('dcat-ap-at-catalogue')
    expect(result.fields['dct:title']).toBeDefined()
    // dcat:distribution is a Dataset-only field and must not leak into the catalogue form
    expect(result.fields['dcat:distribution']).toBeUndefined()
  })

  it('keeps the dataset config resolving against its own SHACL unaffected', async () => {
    const resolver = new FormConfigResolver()
    const result = await resolver.resolve('dcat-ap-at')
    expect(result.rootClass).toBe('dcat:Dataset')
    expect(result.fields['dct:title']).toBeDefined()
  })
})
