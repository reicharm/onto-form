import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import DistributionEditor from '../../src/components/fields/DistributionEditor.vue'

const FIELD = {
  id: 'dcat:distribution',
  label: { de: 'Distributionen', en: 'Distributions' },
  distributionMode: 'inline',
  subFields: [
    { id: 'dcat:accessURL', type: 'uri', required: true, label: { de: 'Zugangs-URL', en: 'Access URL' } },
    { id: 'dct:title', type: 'text', label: { de: 'Titel', en: 'Title' } },
    {
      id: 'dct:format',
      type: 'select',
      label: { de: 'Format', en: 'Format' },
      options: [{ value: 'http://format/csv', label: { de: 'CSV', en: 'CSV' } }]
    }
  ]
}

describe('DistributionEditor — subFields-driven rendering', () => {
  it('creates a new distribution with keys derived from field.subFields (not a hardcoded list)', async () => {
    const w = mount(DistributionEditor, {
      props: { field: FIELD, lang: 'de', modelValue: [] }
    })
    await w.find('.btn-add-first').trigger('click')
    const emitted = w.emitted('update:modelValue')
    const created = emitted[0][0][0]
    expect(Object.keys(created).sort()).toEqual(['dcat:accessURL', 'dct:format', 'dct:title'])
  })

  it('renders sub-fields configured on the field (access URL + title inputs)', () => {
    const w = mount(DistributionEditor, {
      props: {
        field: FIELD,
        lang: 'de',
        modelValue: [{ 'dcat:accessURL': 'https://example.com', 'dct:title': 'My file', 'dct:format': '' }]
      }
    })
    // inline mode opens the first card by default
    const inputs = w.findAll('input[type="url"], input[type="text"]')
    expect(inputs.length).toBeGreaterThanOrEqual(2)
  })

  it('resolves the format badge label from the subField options, not a separately fetched list', () => {
    const w = mount(DistributionEditor, {
      props: {
        field: FIELD,
        lang: 'de',
        modelValue: [{ 'dcat:accessURL': 'https://example.com', 'dct:title': '', 'dct:format': 'http://format/csv' }]
      }
    })
    expect(w.text()).toContain('CSV')
  })

  it('shows a required-field validation error inline when showErrors is true', () => {
    const w = mount(DistributionEditor, {
      props: {
        field: FIELD,
        lang: 'de',
        modelValue: [{ 'dcat:accessURL': '', 'dct:title': 'has input so the item is validated', 'dct:format': '' }],
        showErrors: true
      }
    })
    expect(w.find('.field-errors').exists()).toBe(true)
  })
})
