import { describe, it, expect } from 'vitest'
import { fieldVisibilityFns, evaluateVisibleIf } from '../../src/config/fieldVisibility.js'

const HVD_URI = 'http://data.europa.eu/eli/reg_impl/2023/138/oj'

describe('ifHVDLegislation', () => {
  const { ifHVDLegislation } = fieldVisibilityFns

  it('returns true when applicableLegislation matches HVD regulation URI', () => {
    expect(ifHVDLegislation({ 'dcatap:applicableLegislation': HVD_URI })).toBe(true)
  })

  it('returns false for a different legislation URI', () => {
    expect(ifHVDLegislation({ 'dcatap:applicableLegislation': 'http://data.europa.eu/eli/dir/2019/1024/oj' })).toBe(false)
  })

  it('returns false when field is empty', () => {
    expect(ifHVDLegislation({ 'dcatap:applicableLegislation': '' })).toBe(false)
  })

  it('returns false when field is absent', () => {
    expect(ifHVDLegislation({})).toBe(false)
  })

  it('returns false for null formData', () => {
    expect(ifHVDLegislation(null)).toBe(false)
  })
})

describe('evaluateVisibleIf', () => {
  it('returns true when no fnName given', () => {
    expect(evaluateVisibleIf(undefined, {})).toBe(true)
    expect(evaluateVisibleIf(null, {})).toBe(true)
    expect(evaluateVisibleIf('', {})).toBe(true)
  })

  it('returns true for unknown function name and logs warning', () => {
    expect(evaluateVisibleIf('nonExistentFn', {})).toBe(true)
  })

  it('delegates to the named function with formData', () => {
    const formData = { 'dcatap:applicableLegislation': HVD_URI }
    expect(evaluateVisibleIf('ifHVDLegislation', formData)).toBe(true)
  })

  it('returns false when named function condition is not met', () => {
    expect(evaluateVisibleIf('ifHVDLegislation', {})).toBe(false)
  })
})
