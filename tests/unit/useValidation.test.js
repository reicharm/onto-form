import { describe, it, expect } from 'vitest'
import { validateField, validateForm } from '../../src/composables/useValidation.js'

describe('validateField', () => {
  describe('required check', () => {
    it('returns error when required and value is empty string', () => {
      const errors = validateField({ required: true }, '', 'en')
      expect(errors).toEqual(['This field is required.'])
    })

    it('returns German error when lang=de', () => {
      const errors = validateField({ required: true }, '', 'de')
      expect(errors).toEqual(['Dieses Feld ist erforderlich.'])
    })

    it('uses custom errorMessages if provided', () => {
      const field = {
        required: true,
        errorMessages: { required: { en: 'Custom required msg', de: 'Benutzerdefiniert' } }
      }
      expect(validateField(field, '', 'en')).toEqual(['Custom required msg'])
      expect(validateField(field, '', 'de')).toEqual(['Benutzerdefiniert'])
    })

    it('returns no errors for required field with a value', () => {
      expect(validateField({ required: true }, 'some value', 'en')).toEqual([])
    })

    it('returns no errors for required field with non-empty object', () => {
      expect(validateField({ required: true }, { de: 'Titel' }, 'en')).toEqual([])
    })

    it('returns no errors for required field with non-empty array', () => {
      expect(validateField({ required: true }, ['item1'], 'en')).toEqual([])
    })

    it('returns error for required field with empty array', () => {
      const errors = validateField({ required: true }, [], 'en')
      expect(errors).toHaveLength(1)
    })

    it('returns no error for required field with array item that has lang key set', () => {
      // hasValue considers { value: '', lang: 'de' } as having a value because lang is non-empty
      const errors = validateField({ required: true }, [{ value: '', lang: 'de' }], 'en')
      expect(errors).toHaveLength(0)
    })

    it('returns error for required field with array of fully empty objects', () => {
      const errors = validateField({ required: true }, [{}], 'en')
      expect(errors).toHaveLength(1)
    })
  })

  describe('named validator', () => {
    it('runs isURI validator when field.validate = "isURI"', () => {
      const field = { validate: 'isURI' }
      expect(validateField(field, 'not-a-url', 'en')).toEqual(['Invalid URL.'])
      expect(validateField(field, 'https://example.com', 'en')).toEqual([])
    })

    it('does not run validator on empty value', () => {
      const field = { validate: 'isURI' }
      expect(validateField(field, '', 'en')).toEqual([])
    })

    it('warns for unknown validator name', () => {
      const warn = vi.spyOn(console, 'warn').mockImplementation(() => {})
      const field = { validate: 'unknownValidator' }
      validateField(field, 'some value', 'en')
      expect(warn).toHaveBeenCalled()
      warn.mockRestore()
    })
  })

  describe('object subfields', () => {
    it('validates required sub-fields when object has input', () => {
      const field = {
        type: 'object',
        subFields: [
          { id: 'foaf:name', label: { en: 'Name', de: 'Name' }, required: true }
        ]
      }
      const value = { 'foaf:name': '' , 'foaf:mbox': 'test@test.com' }
      const errors = validateField(field, value, 'en')
      expect(errors.length).toBeGreaterThan(0)
      expect(errors[0]).toContain('Name')
    })

    it('does not validate sub-fields when object is empty', () => {
      const field = {
        type: 'object',
        subFields: [
          { id: 'foaf:name', required: true }
        ]
      }
      const errors = validateField(field, {}, 'en')
      expect(errors).toEqual([])
    })
  })
})

describe('validateForm', () => {
  const config = {
    fields: {
      'dct:title': { required: true, type: 'langstring' },
      'dct:description': { type: 'textarea' },
      'dct:identifier': { validate: 'isURI' },
      'dct:hidden': { visible: false, required: true }
    },
    groups: [
      { fields: ['dct:title', 'dct:description', 'dct:identifier', 'dct:hidden'] }
    ]
  }

  it('returns errors for invalid fields', () => {
    const result = validateForm(config, {}, 'en')
    expect(result['dct:title']).toBeDefined()
    expect(result['dct:title']).toHaveLength(1)
  })

  it('does not include hidden fields', () => {
    const result = validateForm(config, {}, 'en')
    expect(result['dct:hidden']).toBeUndefined()
  })

  it('does not include fields not in any group', () => {
    const configWithExtra = {
      fields: {
        'dct:title': { required: true },
        'extra:field': { required: true }
      },
      groups: [{ fields: ['dct:title'] }]
    }
    const result = validateForm(configWithExtra, {}, 'en')
    expect(result['extra:field']).toBeUndefined()
  })

  it('returns empty object when all fields are valid', () => {
    const result = validateForm(config, {
      'dct:title': { de: 'Test Titel', en: '' },
      'dct:identifier': 'https://example.com'
    }, 'en')
    expect(Object.keys(result)).toHaveLength(0)
  })

  it('returns empty object when config has no fields', () => {
    expect(validateForm({}, {}, 'en')).toEqual({})
    expect(validateForm(null, {}, 'en')).toEqual({})
  })
})
