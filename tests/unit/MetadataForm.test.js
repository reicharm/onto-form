import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import MetadataForm from '../../src/components/MetadataForm.vue'

function makeConfig() {
  return {
    standard: 'dcat-ap-at',
    wizard: false,
    groups: [
      { id: 'main', label: { de: 'Allgemein', en: 'General' }, fields: ['dct:title'] }
    ],
    fields: {
      'dct:title': { id: 'dct:title', type: 'text', label: { de: 'Titel', en: 'Title' }, visible: true, order: 1 }
    }
  }
}

function makeWrapper(props = {}) {
  return mount(MetadataForm, {
    props: {
      config: makeConfig(),
      lang: 'de',
      wizard: false,
      modelValue: { 'dct:title': '' },
      labels: {},
      ...props
    }
  })
}

describe('MetadataForm labels prop', () => {
  it('uses the built-in German default when no label override is given', () => {
    const w = makeWrapper({ lang: 'de' })
    expect(w.find('.btn-validate').text()).toBe('SHACL prüfen')
    expect(w.find('.btn-export').text()).toBe('Export JSON-LD / Turtle')
  })

  it('uses the built-in English default when no label override is given', () => {
    const w = makeWrapper({ lang: 'en' })
    expect(w.find('.btn-validate').text()).toBe('SHACL validate')
  })

  it('overrides a label with a plain string for both languages', () => {
    const w = makeWrapper({ lang: 'de', labels: { validate: 'Prüfen!' } })
    expect(w.find('.btn-validate').text()).toBe('Prüfen!')
  })

  it('overrides a label with a {de, en} object selecting by current language', () => {
    const w = makeWrapper({
      lang: 'en',
      labels: { export: { de: 'Exportieren', en: 'Export now' } }
    })
    expect(w.find('.btn-export').text()).toBe('Export now')
  })

  it('falls back to the default when the override object is missing the current language', () => {
    const w = makeWrapper({
      lang: 'de',
      labels: { export: { en: 'Export now' } }
    })
    expect(w.find('.btn-export').text()).toBe('Export now')
  })

  it('leaves unrelated labels untouched when only one key is overridden', () => {
    const w = makeWrapper({ lang: 'de', labels: { validate: 'Prüfen!' } })
    expect(w.find('.btn-export').text()).toBe('Export JSON-LD / Turtle')
  })
})

describe('MetadataForm cssClass', () => {
  it('applies config.cssClass to the root element', () => {
    const config = { ...makeConfig(), cssClass: 'my-form theme-dark' }
    const w = mount(MetadataForm, {
      props: { config, lang: 'de', wizard: false, modelValue: { 'dct:title': '' } }
    })
    expect(w.find('.metadata-form').classes()).toContain('my-form')
    expect(w.find('.metadata-form').classes()).toContain('theme-dark')
  })

  it('applies group.cssClass to the form-group element in single-page mode', () => {
    const config = {
      ...makeConfig(),
      groups: [
        { id: 'main', label: { de: 'Allgemein', en: 'General' }, fields: ['dct:title'], cssClass: 'highlight-group' }
      ]
    }
    const w = mount(MetadataForm, {
      props: { config, lang: 'de', wizard: false, modelValue: { 'dct:title': '' } }
    })
    expect(w.find('.form-group').classes()).toContain('highlight-group')
  })

  it('does not break when cssClass is absent', () => {
    const w = makeWrapper()
    expect(w.find('.metadata-form').classes()).not.toContain('undefined')
    expect(w.find('.metadata-form').classes()).not.toContain('null')
  })
})
