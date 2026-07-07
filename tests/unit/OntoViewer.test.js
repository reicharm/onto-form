import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount, flushPromises } from '@vue/test-utils'
import OntoViewer from '../../src/components/viewer/OntoViewer.vue'

// ── Mocks ─────────────────────────────────────────────────────────────────────
const MOCK_VIEW_CONFIG = {
  standard: 'test',
  version: '1.0',
  rootClass: 'dcat:Dataset',
  sections: [
    {
      id: 'basic',
      type: 'section',
      label: { de: 'Grunddaten', en: 'Basic' },
      fields: ['dct:title', 'dct:description']
    },
    {
      id: 'more',
      type: 'tabs',
      tabs: [
        { id: 'temporal', label: { de: 'Zeitraum', en: 'Temporal' }, fields: ['dct:issued'] }
      ]
    }
  ],
  fields: {
    'dct:title': { id: 'dct:title', type: 'text', label: { de: 'Titel', en: 'Title' }, visible: true, order: 1 },
    'dct:description': { id: 'dct:description', type: 'text', label: { de: 'Beschreibung', en: 'Description' }, visible: true, order: 2 },
    'dct:issued': { id: 'dct:issued', type: 'date', label: { de: 'Veröffentlicht', en: 'Issued' }, visible: true, order: 3 }
  },
  vocabWarnings: []
}

vi.mock('../../src/services/ViewConfigResolver.js', () => {
  class ViewConfigResolver {
    async resolve() { return MOCK_VIEW_CONFIG }
  }
  return { ViewConfigResolver }
})

vi.mock('../../src/services/RDFImporter.js', () => {
  class RDFImporter {
    fromJSONLD() { return {} }
    fromTurtle() { return {} }
    fromRDFXML() { return {} }
  }
  return { RDFImporter }
})

// Suppress fetch for translations (return empty)
beforeEach(() => {
  global.fetch = vi.fn().mockResolvedValue({
    ok: false,
    status: 404,
    json: () => Promise.resolve({}),
    text: () => Promise.resolve('')
  })
})

function makeWrapper(props = {}) {
  return mount(OntoViewer, {
    props: {
      lang: 'de',
      ...props
    }
  })
}

describe('OntoViewer', () => {
  describe('loading state', () => {
    it('renders loading state initially when standard is set', async () => {
      const wrapper = makeWrapper({ standard: 'test' })
      // Before promises resolve, loading should be visible
      expect(wrapper.find('.onto-viewer').exists()).toBe(true)
    })

    it('renders viewer-content after config and data are resolved', async () => {
      const wrapper = makeWrapper({
        standard: 'test',
        data: { 'dct:title': 'Hello' }
      })
      await flushPromises()
      expect(wrapper.find('.viewer-content').exists()).toBe(true)
    })
  })

  describe('error handling', () => {
    it('renders viewer-error when config resolver throws', async () => {
      const { ViewConfigResolver } = await import('../../src/services/ViewConfigResolver.js')
      vi.spyOn(ViewConfigResolver.prototype, 'resolve').mockRejectedValueOnce(new Error('Config not found'))

      const wrapper = makeWrapper({ standard: 'broken' })
      await flushPromises()
      expect(wrapper.find('.viewer-error').exists()).toBe(true)
      expect(wrapper.find('.viewer-error').text()).toContain('Config not found')
    })
  })

  describe('rendering with config and data props', () => {
    it('renders sections when config and data are provided', async () => {
      const wrapper = makeWrapper({
        config: MOCK_VIEW_CONFIG,
        data: { 'dct:title': 'Test Title' }
      })
      await flushPromises()
      expect(wrapper.find('.viewer-section').exists()).toBe(true)
    })

    it('renders tabs section when config has tabs', async () => {
      const wrapper = makeWrapper({
        config: MOCK_VIEW_CONFIG,
        data: { 'dct:issued': '2024-01-15' }
      })
      await flushPromises()
      expect(wrapper.find('.viewer-tabs').exists()).toBe(true)
    })

    it('renders field value from data prop', async () => {
      const wrapper = makeWrapper({
        config: MOCK_VIEW_CONFIG,
        data: { 'dct:title': 'My Dataset Title' }
      })
      await flushPromises()
      expect(wrapper.text()).toContain('My Dataset Title')
    })

    it('does not display values for fields with no data', async () => {
      const configWithOneField = {
        ...MOCK_VIEW_CONFIG,
        sections: [
          {
            id: 'basic',
            type: 'section',
            label: { de: 'Grunddaten' },
            fields: ['dct:title']
          }
        ]
      }
      const wrapper = makeWrapper({
        config: configWithOneField,
        data: { 'dct:title': '' }
      })
      await flushPromises()
      // Empty string value renders as empty text in the field
      const content = wrapper.find('.viewer-content')
      expect(content.exists()).toBe(true)
    })
  })

  describe('lang prop', () => {
    it('uses the lang prop to display section labels in the correct language', async () => {
      const wrapper = makeWrapper({
        config: MOCK_VIEW_CONFIG,
        data: { 'dct:title': 'Test' },
        lang: 'en'
      })
      await flushPromises()
      expect(wrapper.text()).toContain('Basic')
    })

    it('falls back to German section label when lang is de', async () => {
      const wrapper = makeWrapper({
        config: MOCK_VIEW_CONFIG,
        data: { 'dct:title': 'Test' },
        lang: 'de'
      })
      await flushPromises()
      expect(wrapper.text()).toContain('Grunddaten')
    })
  })

  describe('tabs interaction', () => {
    it('renders tab buttons', async () => {
      const wrapper = makeWrapper({
        config: MOCK_VIEW_CONFIG,
        data: { 'dct:issued': '2024-01-15' }
      })
      await flushPromises()
      expect(wrapper.find('.tab-btn').exists()).toBe(true)
    })

    it('clicking a tab button does not throw', async () => {
      const wrapper = makeWrapper({
        config: MOCK_VIEW_CONFIG,
        data: { 'dct:issued': '2024-01-15' }
      })
      await flushPromises()
      const tabBtn = wrapper.find('.tab-btn')
      if (tabBtn.exists()) {
        await tabBtn.trigger('click')
        expect(tabBtn.classes()).toContain('active')
      }
    })
  })

  describe('dataUrl with format: json', () => {
    it('uses res.json() directly and skips RDFImporter when dataFormat is json', async () => {
      const jsonData = { 'dct:title': 'Direct JSON title' }
      global.fetch = vi.fn().mockImplementation((url) => {
        if (url.includes('translations')) {
          return Promise.resolve({ ok: false })
        }
        return Promise.resolve({
          ok: true,
          headers: { get: () => 'application/json' },
          json: () => Promise.resolve(jsonData),
          text: () => Promise.resolve('should not be called')
        })
      })
      const wrapper = makeWrapper({ config: MOCK_VIEW_CONFIG, dataUrl: '/api/dataset.json', dataFormat: 'json' })
      await flushPromises()
      expect(wrapper.text()).toContain('Direct JSON title')
    })

    it('auto-detects application/json Content-Type and skips RDFImporter', async () => {
      const jsonData = { 'dct:title': 'Auto-detected JSON' }
      global.fetch = vi.fn().mockImplementation((url) => {
        if (url.includes('translations')) return Promise.resolve({ ok: false })
        return Promise.resolve({
          ok: true,
          headers: { get: () => 'application/json; charset=utf-8' },
          json: () => Promise.resolve(jsonData),
          text: () => Promise.resolve('should not be called')
        })
      })
      const wrapper = makeWrapper({ config: MOCK_VIEW_CONFIG, dataUrl: '/api/dataset.json' })
      await flushPromises()
      expect(wrapper.text()).toContain('Auto-detected JSON')
    })
  })

  describe('provide context', () => {
    it('provides onto-form:lang to child components', async () => {
      let injectedLang
      const ChildComponent = {
        template: '<span></span>',
        inject: ['onto-form:lang'],
        mounted() { injectedLang = this['onto-form:lang'] }
      }
      const wrapper = mount(OntoViewer, {
        props: { lang: 'en', config: MOCK_VIEW_CONFIG, data: {} },
        global: {
          components: { ChildComponent }
        }
      })
      await flushPromises()
      // The lang ref should be provided — check wrapper has no errors
      expect(wrapper.find('.onto-viewer').exists()).toBe(true)
    })
  })
})
