import { describe, it, expect, vi, beforeEach } from 'vitest'
import { ViewConfigResolver } from '../../src/services/ViewConfigResolver.js'
import { makeFetchOk } from './helpers/mockFetch.js'

// ── Mock SHACLParser ──────────────────────────────────────────────────────────
const SHACL_SHAPES = {
  'http://example.org/Dataset': {
    targetClass: 'http://example.org/Dataset',
    embedded: false,
    fields: {
      'dct:title': {
        id: 'dct:title',
        type: 'langstring',
        label: { de: 'Titel (SHACL)', en: 'Title (SHACL)' },
        hint: { de: 'SHACL-Hinweis' },
        visible: true,
        order: 1
      },
      'dct:description': {
        id: 'dct:description',
        type: 'textarea',
        label: { de: 'Beschreibung' },
        hint: {},
        visible: true,
        order: 2
      },
      'dct:issued': {
        id: 'dct:issued',
        type: 'date',
        label: { de: 'Veröffentlicht', en: 'Issued' },
        hint: {},
        visible: true,
        order: 3
      },
      'dct:hidden': {
        id: 'dct:hidden',
        type: 'text',
        label: { de: 'Versteckt' },
        visible: false,
        order: 4
      }
    }
  }
}

vi.mock('../../src/services/SHACLParser.js', () => {
  class SHACLParser {
    async parse() { return SHACL_SHAPES }
  }
  return { SHACLParser }
})

// ── Mock VocabularyLoader ─────────────────────────────────────────────────────
vi.mock('../../src/services/VocabularyLoader.js', () => {
  class VocabularyLoader {
    async load() {
      return [
        { value: 'http://vocab.example/a', label: { de: 'Option A' } },
        { value: 'http://vocab.example/b', label: { de: 'Option B' } }
      ]
    }
  }
  return { VocabularyLoader }
})

// ── fetch mock helpers ────────────────────────────────────────────────────────

const SHACL_DUMMY = '# dummy turtle'

const VIEW_CONFIG = {
  version: '1.0',
  sections: [
    {
      id: 'basic',
      type: 'section',
      label: { de: 'Grunddaten', en: 'Basic' },
      fields: ['dct:title', 'dct:description', 'dct:hidden', 'nonexistent']
    },
    {
      id: 'more',
      type: 'tabs',
      tabs: [
        { id: 'temporal', label: { de: 'Zeitraum', en: 'Temporal' }, fields: ['dct:issued'] },
        { id: 'spatial', label: { de: 'Räumlich', en: 'Spatial' }, fields: ['dct:hidden', 'nonexistent'] }
      ]
    }
  ],
  fields: {
    'dct:title': { order: 10, label: { de: 'Titel (UI)', fr: 'Titre (UI)' } },
    'dct:theme': {
      id: 'dct:theme',
      type: 'multiselect',
      optionsSource: 'http://vocab.example/themes',
      visible: true,
      order: 6
    }
  }
}

describe('ViewConfigResolver', () => {
  let resolver

  beforeEach(() => {
    resolver = new ViewConfigResolver()
  })

  describe('merging SHACL fields with UI view config', () => {
    it('UI values override SHACL values for the same field', async () => {
      global.fetch = makeFetchOk({
        '/shacl/test.ttl': SHACL_DUMMY,
        '/config/ui-view-config.test.json': VIEW_CONFIG
      })
      const result = await resolver.resolve('test')
      expect(result.fields['dct:title'].order).toBe(10)
    })

    it('label is merged from both SHACL and UI (all languages present)', async () => {
      global.fetch = makeFetchOk({
        '/shacl/test.ttl': SHACL_DUMMY,
        '/config/ui-view-config.test.json': VIEW_CONFIG
      })
      const result = await resolver.resolve('test')
      const label = result.fields['dct:title'].label
      expect(label.en).toBe('Title (SHACL)')
      expect(label.de).toBe('Titel (UI)')
      expect(label.fr).toBe('Titre (UI)')
    })

    it('field type comes from SHACL when UI does not redefine it', async () => {
      global.fetch = makeFetchOk({
        '/shacl/test.ttl': SHACL_DUMMY,
        '/config/ui-view-config.test.json': VIEW_CONFIG
      })
      const result = await resolver.resolve('test')
      expect(result.fields['dct:title'].type).toBe('langstring')
    })
  })

  describe('sections filtering', () => {
    it('removes nonexistent field IDs from section.fields', async () => {
      global.fetch = makeFetchOk({
        '/shacl/test.ttl': SHACL_DUMMY,
        '/config/ui-view-config.test.json': VIEW_CONFIG
      })
      const result = await resolver.resolve('test')
      const basicSection = result.sections.find(s => s.id === 'basic')
      expect(basicSection.fields).not.toContain('nonexistent')
    })

    it('removes fields with visible === false from section.fields', async () => {
      global.fetch = makeFetchOk({
        '/shacl/test.ttl': SHACL_DUMMY,
        '/config/ui-view-config.test.json': VIEW_CONFIG
      })
      const result = await resolver.resolve('test')
      const basicSection = result.sections.find(s => s.id === 'basic')
      expect(basicSection.fields).not.toContain('dct:hidden')
    })

    it('keeps fields that exist and are visible', async () => {
      global.fetch = makeFetchOk({
        '/shacl/test.ttl': SHACL_DUMMY,
        '/config/ui-view-config.test.json': VIEW_CONFIG
      })
      const result = await resolver.resolve('test')
      const basicSection = result.sections.find(s => s.id === 'basic')
      expect(basicSection.fields).toContain('dct:title')
      expect(basicSection.fields).toContain('dct:description')
    })
  })

  describe('type: "tabs" sections filtering', () => {
    it('removes nonexistent fields from each tab.fields', async () => {
      global.fetch = makeFetchOk({
        '/shacl/test.ttl': SHACL_DUMMY,
        '/config/ui-view-config.test.json': VIEW_CONFIG
      })
      const result = await resolver.resolve('test')
      const tabsSection = result.sections.find(s => s.id === 'more')
      const spatialTab = tabsSection.tabs.find(t => t.id === 'spatial')
      expect(spatialTab.fields).not.toContain('nonexistent')
    })

    it('removes invisible fields from tab.fields', async () => {
      global.fetch = makeFetchOk({
        '/shacl/test.ttl': SHACL_DUMMY,
        '/config/ui-view-config.test.json': VIEW_CONFIG
      })
      const result = await resolver.resolve('test')
      const tabsSection = result.sections.find(s => s.id === 'more')
      const spatialTab = tabsSection.tabs.find(t => t.id === 'spatial')
      expect(spatialTab.fields).not.toContain('dct:hidden')
    })

    it('keeps visible fields in tabs', async () => {
      global.fetch = makeFetchOk({
        '/shacl/test.ttl': SHACL_DUMMY,
        '/config/ui-view-config.test.json': VIEW_CONFIG
      })
      const result = await resolver.resolve('test')
      const tabsSection = result.sections.find(s => s.id === 'more')
      const temporalTab = tabsSection.tabs.find(t => t.id === 'temporal')
      expect(temporalTab.fields).toContain('dct:issued')
    })
  })

  describe('translation overrides', () => {
    it('applies section label translation override', async () => {
      global.fetch = makeFetchOk({
        '/shacl/test.ttl': SHACL_DUMMY,
        '/config/ui-view-config.test.json': VIEW_CONFIG
      })
      const result = await resolver.resolve('test', {
        translations: { de: { 'section.basic.label': 'Basisdaten' } }
      })
      const basicSection = result.sections.find(s => s.id === 'basic')
      expect(basicSection.label.de).toBe('Basisdaten')
    })

    it('applies tab label translation override', async () => {
      global.fetch = makeFetchOk({
        '/shacl/test.ttl': SHACL_DUMMY,
        '/config/ui-view-config.test.json': VIEW_CONFIG
      })
      const result = await resolver.resolve('test', {
        translations: { en: { 'tab.temporal.label': 'Time Period' } }
      })
      const tabsSection = result.sections.find(s => s.id === 'more')
      const temporalTab = tabsSection.tabs.find(t => t.id === 'temporal')
      expect(temporalTab.label.en).toBe('Time Period')
    })

    it('standard-scoped section label takes priority over generic', async () => {
      global.fetch = makeFetchOk({
        '/shacl/test.ttl': SHACL_DUMMY,
        '/config/ui-view-config.test.json': VIEW_CONFIG
      })
      const result = await resolver.resolve('test', {
        translations: {
          de: {
            'section.basic.label': 'Allgemein',
            'test.section.basic.label': 'Scoped Basisdaten'
          }
        }
      })
      const basicSection = result.sections.find(s => s.id === 'basic')
      expect(basicSection.label.de).toBe('Scoped Basisdaten')
    })

    it('standard-scoped tab label takes priority over generic', async () => {
      global.fetch = makeFetchOk({
        '/shacl/test.ttl': SHACL_DUMMY,
        '/config/ui-view-config.test.json': VIEW_CONFIG
      })
      const result = await resolver.resolve('test', {
        translations: {
          en: {
            'tab.temporal.label': 'Temporal',
            'test.tab.temporal.label': 'Scoped Temporal'
          }
        }
      })
      const tabsSection = result.sections.find(s => s.id === 'more')
      const temporalTab = tabsSection.tabs.find(t => t.id === 'temporal')
      expect(temporalTab.label.en).toBe('Scoped Temporal')
    })
  })

  describe('shaclSource override', () => {
    it('fetches the SHACL named by shaclSource instead of the standard itself', async () => {
      global.fetch = makeFetchOk({
        '/shacl/test.ttl': SHACL_DUMMY,
        '/config/ui-view-config.test-catalogue.json': { ...VIEW_CONFIG, shaclSource: 'test' }
      })
      const result = await resolver.resolve('test-catalogue')
      expect(result.fields['dct:title']).toBeDefined()
    })

    it('falls back to the standard name when shaclSource is not set', async () => {
      global.fetch = makeFetchOk({
        '/shacl/test.ttl': SHACL_DUMMY,
        '/config/ui-view-config.test.json': VIEW_CONFIG
      })
      const result = await resolver.resolve('test')
      expect(result.fields['dct:title']).toBeDefined()
    })
  })

  describe('standard and version passthrough', () => {
    it('returns the standard that was requested', async () => {
      global.fetch = makeFetchOk({
        '/shacl/test.ttl': SHACL_DUMMY,
        '/config/ui-view-config.test.json': VIEW_CONFIG
      })
      const result = await resolver.resolve('test')
      expect(result.standard).toBe('test')
    })

    it('returns the version from UI view config', async () => {
      global.fetch = makeFetchOk({
        '/shacl/test.ttl': SHACL_DUMMY,
        '/config/ui-view-config.test.json': VIEW_CONFIG
      })
      const result = await resolver.resolve('test')
      expect(result.version).toBe('1.0')
    })

    it('returns rootClass from UI view config when set', async () => {
      global.fetch = makeFetchOk({
        '/shacl/test.ttl': SHACL_DUMMY,
        '/config/ui-view-config.test.json': { ...VIEW_CONFIG, rootClass: undefined }
      })
      const result = await resolver.resolve('test')
      // Fallback rootClass when not specified in config
      expect(result.rootClass).toBe('dcat:Dataset')
    })
  })

  describe('vocabulary resolution', () => {
    it('populates options for fields with optionsSource', async () => {
      global.fetch = makeFetchOk({
        '/shacl/test.ttl': SHACL_DUMMY,
        '/config/ui-view-config.test.json': VIEW_CONFIG
      })
      const result = await resolver.resolve('test')
      expect(result.fields['dct:theme'].options).toBeDefined()
      expect(result.fields['dct:theme'].options.length).toBeGreaterThan(0)
      expect(result.fields['dct:theme'].options[0].value).toBe('http://vocab.example/a')
    })

    it('fields without optionsSource do not get options injected', async () => {
      global.fetch = makeFetchOk({
        '/shacl/test.ttl': SHACL_DUMMY,
        '/config/ui-view-config.test.json': VIEW_CONFIG
      })
      const result = await resolver.resolve('test')
      expect(result.fields['dct:title'].options).toBeUndefined()
    })
  })

  describe('error handling', () => {
    it('rejects if SHACL fetch fails', async () => {
      global.fetch = vi.fn().mockImplementation((url) => {
        if (url.endsWith('.ttl')) {
          return Promise.resolve({ ok: false, status: 404, text: () => Promise.resolve('') })
        }
        return Promise.resolve({ ok: true, json: () => Promise.resolve(VIEW_CONFIG) })
      })
      await expect(resolver.resolve('missing')).rejects.toThrow(/Failed to load SHACL/)
    })

    it('rejects if UI view config fetch fails', async () => {
      global.fetch = vi.fn().mockImplementation((url) => {
        if (url.endsWith('.ttl')) {
          return Promise.resolve({ ok: true, text: () => Promise.resolve(SHACL_DUMMY) })
        }
        return Promise.resolve({ ok: false, status: 404, json: () => Promise.resolve({}) })
      })
      await expect(resolver.resolve('missing')).rejects.toThrow(/No view config found for/)
    })
  })
})
