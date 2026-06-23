import { describe, it, expect, beforeEach, vi } from 'vitest'
import { fieldValidators, registerValidator } from '../../src/config/fieldValidators.js'
import { fieldComputeFns, registerCompute, applyComputes } from '../../src/config/fieldComputes.js'
import { fieldTransforms, registerTransform, applyDisplay, applyEncode } from '../../src/config/fieldTransforms.js'
import { fieldVisibilityFns, registerVisibility, evaluateVisibleIf } from '../../src/config/fieldVisibility.js'

// ── validators ────────────────────────────────────────────────────────────────
describe('registerValidator', () => {
  it('registers a custom validator by name', () => {
    registerValidator('myValidator', (v) => v === 'ok' ? [] : ['bad'])
    expect(fieldValidators.myValidator('ok')).toEqual([])
    expect(fieldValidators.myValidator('nope')).toEqual(['bad'])
  })

  it('accepts a map of validators', () => {
    registerValidator({ validatorA: () => [], validatorB: () => ['err'] })
    expect(fieldValidators.validatorA()).toEqual([])
    expect(fieldValidators.validatorB()).toEqual(['err'])
  })

  it('does not overwrite built-in validators', () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {})
    registerValidator('isURI', () => ['overwritten'])
    expect(fieldValidators.isURI('not-a-url', 'en')).not.toEqual(['overwritten'])
    expect(warn).toHaveBeenCalledWith(expect.stringContaining('isURI'))
    warn.mockRestore()
  })
})

// ── computes ──────────────────────────────────────────────────────────────────
describe('registerCompute', () => {
  it('registers a custom compute function', () => {
    registerCompute('alwaysFoo', () => 'foo')
    const config = { fields: { 'ex:field': { compute: 'alwaysFoo' } } }
    const result = applyComputes(config, { 'ex:field': '' }, 'de')
    expect(result['ex:field']).toBe('foo')
  })

  it('does not overwrite built-in computes', () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {})
    registerCompute('setToday', () => 'overwritten')
    expect(fieldComputeFns.setToday()).not.toBe('overwritten')
    expect(warn).toHaveBeenCalledWith(expect.stringContaining('setToday'))
    warn.mockRestore()
  })
})

// ── transforms ────────────────────────────────────────────────────────────────
describe('registerTransform', () => {
  it('registers a custom transform', () => {
    registerTransform('shout', {
      display: (v) => v?.toUpperCase() ?? v,
      encode: (v) => v?.toLowerCase() ?? v
    })
    expect(applyDisplay('shout', 'hello')).toBe('HELLO')
    expect(applyEncode('shout', 'HELLO')).toBe('hello')
  })

  it('does not overwrite built-in transforms', () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {})
    registerTransform('uriSuffix', { display: () => 'overwritten', encode: () => 'overwritten' })
    expect(applyDisplay('uriSuffix', 'https://example.com/foo')).not.toBe('overwritten')
    expect(warn).toHaveBeenCalledWith(expect.stringContaining('uriSuffix'))
    warn.mockRestore()
  })
})

// ── visibility ────────────────────────────────────────────────────────────────
describe('registerVisibility', () => {
  it('registers a custom visibility function', () => {
    registerVisibility('ifFoo', (data) => data?.foo === true)
    expect(evaluateVisibleIf('ifFoo', { foo: true })).toBe(true)
    expect(evaluateVisibleIf('ifFoo', { foo: false })).toBe(false)
  })

  it('does not overwrite built-in visibility functions', () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {})
    registerVisibility('ifHVDLegislation', () => false)
    const data = { 'dcatap:applicableLegislation': 'http://data.europa.eu/eli/reg_impl/2023/138/oj' }
    expect(evaluateVisibleIf('ifHVDLegislation', data)).toBe(true)
    expect(warn).toHaveBeenCalledWith(expect.stringContaining('ifHVDLegislation'))
    warn.mockRestore()
  })
})
