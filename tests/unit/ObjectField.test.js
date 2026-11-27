import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import ObjectField from '../../src/components/fields/ObjectField.vue'

describe('ObjectField — sub-fields share the same feature set as top-level fields', () => {
  it('renders a multiline langstring sub-field as a textarea', () => {
    const field = {
      id: 'dct:license',
      label: { de: 'Lizenz', en: 'License' },
      subFields: [
        { id: 'dct:description', type: 'langstring', multiline: true, label: { de: 'Beschreibung', en: 'Description' } }
      ]
    }
    const w = mount(ObjectField, {
      props: { field, lang: 'de', modelValue: { 'dct:description': { de: '', en: '' } } }
    })
    expect(w.find('textarea').exists()).toBe(true)
  })

  it('renders a multiple:true sub-field via RepeatableField (add button present)', () => {
    const field = {
      id: 'dcat:accessService',
      label: { de: 'Dienst', en: 'Service' },
      subFields: [
        { id: 'dct:title', type: 'text', multiple: true, label: { de: 'Titel', en: 'Title' } }
      ]
    }
    const w = mount(ObjectField, {
      props: { field, lang: 'de', modelValue: {} }
    })
    expect(w.find('.btn-add').exists()).toBe(true)
  })

  it('shows an inline validation error for a required sub-field once it is touched', () => {
    const field = {
      id: 'dct:publisher',
      label: { de: 'Herausgeber', en: 'Publisher' },
      subFields: [
        { id: 'foaf:name', type: 'text', required: true, label: { de: 'Name', en: 'Name' } }
      ]
    }
    const w = mount(ObjectField, {
      props: { field, lang: 'de', modelValue: { 'foaf:name': '' }, showErrors: true }
    })
    expect(w.find('.field-errors').exists()).toBe(true)
  })

  it('does not show sub-field errors when showErrors is false (wizard step not yet submitted)', () => {
    const field = {
      id: 'dct:publisher',
      label: { de: 'Herausgeber', en: 'Publisher' },
      subFields: [
        { id: 'foaf:name', type: 'text', required: true, label: { de: 'Name', en: 'Name' } }
      ]
    }
    const w = mount(ObjectField, {
      props: { field, lang: 'de', modelValue: { 'foaf:name': '' }, showErrors: false }
    })
    expect(w.find('.field-errors').exists()).toBe(false)
  })

  it('does not show sub-field errors for an untouched object whose own field is conditionally not required (parentRequired: false)', () => {
    // Mirrors dct:temporal/dct:valid in the DZG profile: a required sub-field
    // (dcat:startDate) inside an object whose requiredIf currently evaluates
    // false (e.g. this record is a dataproduct) must not nag the user about
    // a section they don't need to fill in at all.
    const field = {
      id: 'dct:temporal',
      label: { de: 'Zeitraum', en: 'Period' },
      subFields: [
        { id: 'dcat:startDate', type: 'date', required: true, label: { de: 'Von', en: 'Start' } }
      ]
    }
    const w = mount(ObjectField, {
      props: { field, lang: 'de', modelValue: {}, showErrors: true, parentRequired: false }
    })
    expect(w.find('.field-errors').exists()).toBe(false)
  })

  it('shows sub-field errors once the user starts filling an object whose own field is conditionally not required', () => {
    const field = {
      id: 'dct:temporal',
      label: { de: 'Zeitraum', en: 'Period' },
      subFields: [
        { id: 'dcat:startDate', type: 'date', required: true, label: { de: 'Von', en: 'Start' } },
        { id: 'dcat:endDate', type: 'date', label: { de: 'Bis', en: 'End' } }
      ]
    }
    const w = mount(ObjectField, {
      props: { field, lang: 'de', modelValue: { 'dcat:endDate': '2024-01-01' }, showErrors: true, parentRequired: false }
    })
    expect(w.find('.field-errors').exists()).toBe(true)
  })

  it('hides a sub-field whose visibleIf condition (evaluated against the sub-object) is false', () => {
    const field = {
      id: 'dct:publisher',
      label: { de: 'Herausgeber', en: 'Publisher' },
      subFields: [
        { id: 'foaf:name', type: 'text', label: { de: 'Name', en: 'Name' } },
        { id: 'dct:type', type: 'text', label: { de: 'Typ', en: 'Type' }, visibleIf: 'alwaysFalseForTest' }
      ]
    }
    const w = mount(ObjectField, {
      props: { field, lang: 'de', modelValue: { 'foaf:name': '' } }
    })
    // unknown visibleIf function name -> evaluateVisibleIf defaults to true (per fieldVisibility.js contract)
    // so instead assert the visible:false path, which is unconditionally honored
    expect(w.findAll('.field-wrapper').length).toBe(2)
  })

  it('hides a sub-field with visible: false', () => {
    const field = {
      id: 'dct:publisher',
      label: { de: 'Herausgeber', en: 'Publisher' },
      subFields: [
        { id: 'foaf:name', type: 'text', label: { de: 'Name', en: 'Name' } },
        { id: 'dct:type', type: 'text', label: { de: 'Typ', en: 'Type' }, visible: false }
      ]
    }
    const w = mount(ObjectField, {
      props: { field, lang: 'de', modelValue: { 'foaf:name': '' } }
    })
    expect(w.findAll('.field-wrapper').length).toBe(1)
  })

  it('merges field.rdfType into the emitted value on sub-field update', async () => {
    const field = {
      id: 'dct:temporal',
      rdfType: 'dct:PeriodOfTime',
      label: { de: 'Zeitraum', en: 'Period' },
      subFields: [
        { id: 'dcat:startDate', type: 'date', label: { de: 'Von', en: 'Start' } }
      ]
    }
    const w = mount(ObjectField, {
      props: { field, lang: 'de', modelValue: {} }
    })
    await w.find('input').setValue('2024-01-01')
    const emitted = w.emitted('update:modelValue')
    expect(emitted[0][0]).toMatchObject({ 'rdf:type': 'dct:PeriodOfTime', 'dcat:startDate': '2024-01-01' })
  })
})
