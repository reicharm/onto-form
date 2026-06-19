import { describe, it, expect } from 'vitest'
import { idGenerators, generateId } from '../../src/config/idGenerators.js'

describe('idGenerators.uuid', () => {
  it('returns a valid UUID string', () => {
    const id = idGenerators.uuid()
    expect(id).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i)
  })

  it('prepends prefix when provided', () => {
    const id = idGenerators.uuid({ prefix: 'https://data.gv.at/dataset/' })
    expect(id).toMatch(/^https:\/\/data\.gv\.at\/dataset\/[0-9a-f-]{36}$/)
  })

  it('produces unique values on each call', () => {
    const a = idGenerators.uuid()
    const b = idGenerators.uuid()
    expect(a).not.toBe(b)
  })
})

describe('idGenerators.slugDate', () => {
  it('starts with today\'s date in YYYY-MM-DD format', () => {
    const id = idGenerators.slugDate()
    const today = new Date().toISOString().slice(0, 10)
    expect(id).toMatch(new RegExp(`^${today}-[0-9a-f]{4}$`))
  })

  it('prepends prefix when provided', () => {
    const id = idGenerators.slugDate({ prefix: 'https://example.org/' })
    expect(id).toMatch(/^https:\/\/example\.org\/\d{4}-\d{2}-\d{2}-[0-9a-f]{4}$/)
  })
})

describe('idGenerators.nanoid', () => {
  it('returns a string of the default length (21)', () => {
    const id = idGenerators.nanoid()
    expect(id).toHaveLength(21)
  })

  it('returns a string of custom length', () => {
    const id = idGenerators.nanoid({ length: 10 })
    expect(id).toHaveLength(10)
  })

  it('only uses URL-safe characters', () => {
    const id = idGenerators.nanoid()
    expect(id).toMatch(/^[A-Za-z0-9_-]+$/)
  })

  it('prepends prefix when provided', () => {
    const id = idGenerators.nanoid({ prefix: 'https://x.org/', length: 8 })
    expect(id).toMatch(/^https:\/\/x\.org\/[A-Za-z0-9_-]{8}$/)
  })
})

describe('generateId', () => {
  it('resolves with the generated value', async () => {
    const id = await generateId('uuid')
    expect(id).toMatch(/^[0-9a-f-]{36}$/)
  })

  it('passes opts to the generator', async () => {
    const id = await generateId('uuid', { prefix: 'https://p/' })
    expect(id).toMatch(/^https:\/\/p\//)
  })

  it('returns null and warns for an unknown generator', async () => {
    const id = await generateId('nonexistent')
    expect(id).toBeNull()
  })
})
