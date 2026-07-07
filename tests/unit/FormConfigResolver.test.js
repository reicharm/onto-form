import { describe, it, expect, vi, beforeEach } from 'vitest'
import { FormConfigResolver } from '../../src/services/FormConfigResolver.js'
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
      'dct:hidden': {
        id: 'dct:hidden',
        type: 'text',
        label: { de: 'Versteckt' },
        visible: false,
        order: 3
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

const UI_CONFIG = {
  version: '2.1.0',
  fields: {
    'dct:title': {
      id: 'dct:title',
      label: { de: 'Titel (UI)', fr: 'Titre (UI)' },
      hint: { de: 'UI-Hinweis', en: 'UI hint' },
      order: 10
    },
    'dcat:keyword': {
      id: 'dcat:keyword',
      type: 'text',
      label: { de: 'Schlüsselwörter' },
      visible: true,
      order: 5
    },
    'dcat:theme': {
      id: 'dcat:theme',
      type: 'multiselect',
      optionsSource: 'http://vocab.example/themes',
      visible: true,
      order: 6
    }
  },
  groups: [
    {
      id: 'basic',
      label: { de: 'Grunddaten' },
      fields: ['dct:title', 'dct:description', 'dct:hidden', 'dcat:keyword', 'nonexistent']
    }
  ]
}

describe('FormConfigResolver', () => {
  let resolver

  beforeEach(() => {
    resolver = new FormConfigResolver()
  })

  describe('merging SHACL fields with UI config', () => {
    it('UI values override SHACL values for the same field', async () => {
      global.fetch = makeFetchOk({
        '/shacl/test.ttl': SHACL_DUMMY,
        '/config/ui-config.test.json': UI_CONFIG
      })
      const result = await resolver.resolve('test')
      // UI order overrides SHACL order
      expect(result.fields['dct:title'].order).toBe(10)
    })

    it('label is merged from both SHACL and UI (all languages present)', async () => {
      global.fetch = makeFetchOk({
        '/shacl/test.ttl': SHACL_DUMMY,
        '/config/ui-config.test.json': UI_CONFIG
      })
      const result = await resolver.resolve('test')
      const label = result.fields['dct:title'].label
      // SHACL provides 'en', UI provides 'de' and 'fr'
      expect(label.en).toBe('Title (SHACL)')
      expect(label.de).toBe('Titel (UI)')
      expect(label.fr).toBe('Titre (UI)')
    })

    it('hint is merged from both SHACL and UI', async () => {
      global.fetch = makeFetchOk({
        '/shacl/test.ttl': SHACL_DUMMY,
        '/config/ui-config.test.json': UI_CONFIG
      })
      const result = await resolver.resolve('test')
      const hint = result.fields['dct:title'].hint
      expect(hint.de).toBe('UI-Hinweis')
      expect(hint.en).toBe('UI hint')
    })

    it('field type comes from SHACL when UI does not redefine it', async () => {
      global.fetch = makeFetchOk({
        '/shacl/test.ttl': SHACL_DUMMY,
        '/config/ui-config.test.json': UI_CONFIG
      })
      const result = await resolver.resolve('test')
      // dct:title type is 'langstring' from SHACL, UI config for dct:title has no `type`
      expect(result.fields['dct:title'].type).toBe('langstring')
    })
  })

  describe('UI-only fields (not in SHACL)', () => {
    it('UI-defined type and order are preserved', async () => {
      global.fetch = makeFetchOk({
        '/shacl/test.ttl': SHACL_DUMMY,
        '/config/ui-config.test.json': UI_CONFIG
      })
      const result = await resolver.resolve('test')
      // dcat:keyword is in UI only (SHACL mock does not include it)
      const kw = result.fields['dcat:keyword']
      expect(kw).toBeDefined()
      expect(kw.type).toBe('text')
      expect(kw.order).toBe(5)
    })

    it('UI-only field without type gets default type text and order 999', async () => {
      const uiWithBare = {
        ...UI_CONFIG,
        fields: {
          ...UI_CONFIG.fields,
          'dcat:bareField': { id: 'dcat:bareField', label: { de: 'Bare' } }
        }
      }
      global.fetch = makeFetchOk({
        '/shacl/test.ttl': SHACL_DUMMY,
        '/config/ui-config.test.json': uiWithBare
      })
      const result = await resolver.resolve('test')
      expect(result.fields['dcat:bareField'].type).toBe('text')
      expect(result.fields['dcat:bareField'].order).toBe(999)
    })
  })

  describe('groups filtering', () => {
    it('removes nonexistent field IDs from group.fields', async () => {
      global.fetch = makeFetchOk({
        '/shacl/test.ttl': SHACL_DUMMY,
        '/config/ui-config.test.json': UI_CONFIG
      })
      const result = await resolver.resolve('test')
      expect(result.groups[0].fields).not.toContain('nonexistent')
    })

    it('removes fields with visible === false from group.fields', async () => {
      global.fetch = makeFetchOk({
        '/shacl/test.ttl': SHACL_DUMMY,
        '/config/ui-config.test.json': UI_CONFIG
      })
      const result = await resolver.resolve('test')
      expect(result.groups[0].fields).not.toContain('dct:hidden')
    })

    it('keeps fields that exist and are visible', async () => {
      global.fetch = makeFetchOk({
        '/shacl/test.ttl': SHACL_DUMMY,
        '/config/ui-config.test.json': UI_CONFIG
      })
      const result = await resolver.resolve('test')
      expect(result.groups[0].fields).toContain('dct:title')
      expect(result.groups[0].fields).toContain('dct:description')
      expect(result.groups[0].fields).toContain('dcat:keyword')
    })
  })

  describe('standard and version passthrough', () => {
    it('returns the standard that was requested', async () => {
      global.fetch = makeFetchOk({
        '/shacl/dcat-ap.ttl': SHACL_DUMMY,
        '/config/ui-config.dcat-ap.json': { ...UI_CONFIG, version: '3.0.0' }
      })
      const result = await resolver.resolve('dcat-ap')
      expect(result.standard).toBe('dcat-ap')
    })

    it('returns the version from UI config', async () => {
      global.fetch = makeFetchOk({
        '/shacl/test.ttl': SHACL_DUMMY,
        '/config/ui-config.test.json': UI_CONFIG
      })
      const result = await resolver.resolve('test')
      expect(result.version).toBe('2.1.0')
    })
  })

  describe('vocabulary resolution', () => {
    it('populates options for fields with optionsSource', async () => {
      global.fetch = makeFetchOk({
        '/shacl/test.ttl': SHACL_DUMMY,
        '/config/ui-config.test.json': UI_CONFIG
      })
      const result = await resolver.resolve('test')
      const themeField = result.fields['dcat:theme']
      expect(themeField.options).toBeDefined()
      expect(themeField.options.length).toBeGreaterThan(0)
      expect(themeField.options[0].value).toBe('http://vocab.example/a')
    })

    it('fields without optionsSource do not get options injected', async () => {
      global.fetch = makeFetchOk({
        '/shacl/test.ttl': SHACL_DUMMY,
        '/config/ui-config.test.json': UI_CONFIG
      })
      const result = await resolver.resolve('test')
      expect(result.fields['dct:title'].options).toBeUndefined()
    })

    it('does not load vocabularies twice (no duplicate options)', async () => {
      global.fetch = makeFetchOk({
        '/shacl/test.ttl': SHACL_DUMMY,
        '/config/ui-config.test.json': UI_CONFIG
      })
      const result = await resolver.resolve('test')
      const themeField = result.fields['dcat:theme']
      expect(themeField.options).toEqual([
        { value: 'http://vocab.example/a', label: { de: 'Option A' } },
        { value: 'http://vocab.example/b', label: { de: 'Option B' } }
      ])
    })
  })

  describe('rootClass filtering', () => {
    const SHAPES_WITH_DIST = {
      'http://www.w3.org/ns/dcat#Dataset': {
        targetClass: 'http://www.w3.org/ns/dcat#Dataset',
        embedded: false,
        fields: {
          'dct:title':        { id: 'dct:title',        type: 'langstring', label: { de: 'Titel', en: 'Title' }, hint: {}, visible: true, order: 1 },
          'dcat:distribution':{ id: 'dcat:distribution', type: 'text',      label: { de: 'Dist',  en: 'Dist'  }, hint: {}, visible: true, order: 2, multiple: true }
        }
      },
      'http://www.w3.org/ns/dcat#Distribution': {
        targetClass: 'http://www.w3.org/ns/dcat#Distribution',
        embedded: false,
        fields: {
          'dcat:accessURL': { id: 'dcat:accessURL', type: 'uri',  label: { de: 'URL', en: 'URL' }, hint: {}, visible: true, order: 1 },
          'dct:title':      { id: 'dct:title',      type: 'text', label: { de: 'Titel-Dist', en: 'Title-Dist' }, hint: {}, visible: true, order: 2 }
        }
      }
    }

    it('with rootClass set: excludes fields from non-root shapes', async () => {
      vi.doMock('../../src/services/SHACLParser.js', () => {
        class SHACLParser { async parse() { return SHAPES_WITH_DIST } }
        return { SHACLParser }
      })
      const { FormConfigResolver: FCR } = await import('../../src/services/FormConfigResolver.js?bust=1')
      const r = new FCR()
      global.fetch = makeFetchOk({
        '/shacl/test.ttl': SHACL_DUMMY,
        '/config/ui-config.test.json': { rootClass: 'dcat:Dataset', groups: [], fields: {} }
      })
      const result = await r.resolve('test')
      expect(result.fields['dct:title']).toBeDefined()
      expect(result.fields['dcat:distribution']).toBeDefined()
      expect(result.fields['dcat:accessURL']).toBeUndefined()
    })

    it('with rootClass set: dct:title comes from Dataset shape, not Distribution shape', async () => {
      vi.doMock('../../src/services/SHACLParser.js', () => {
        class SHACLParser { async parse() { return SHAPES_WITH_DIST } }
        return { SHACLParser }
      })
      const { FormConfigResolver: FCR } = await import('../../src/services/FormConfigResolver.js?bust=2')
      const r = new FCR()
      global.fetch = makeFetchOk({
        '/shacl/test.ttl': SHACL_DUMMY,
        '/config/ui-config.test.json': { rootClass: 'dcat:Dataset', groups: [], fields: {} }
      })
      const result = await r.resolve('test')
      expect(result.fields['dct:title'].type).toBe('langstring')
    })

    it('without rootClass: all non-embedded shapes are included (backward compat)', async () => {
      vi.doMock('../../src/services/SHACLParser.js', () => {
        class SHACLParser { async parse() { return SHAPES_WITH_DIST } }
        return { SHACLParser }
      })
      const { FormConfigResolver: FCR } = await import('../../src/services/FormConfigResolver.js?bust=3')
      const r = new FCR()
      global.fetch = makeFetchOk({
        '/shacl/test.ttl': SHACL_DUMMY,
        '/config/ui-config.test.json': { groups: [], fields: {} }
      })
      const result = await r.resolve('test')
      expect(result.fields['dcat:accessURL']).toBeDefined()
    })
  })

  describe('shaclSource override', () => {
    it('fetches the SHACL named by shaclSource instead of the standard itself', async () => {
      global.fetch = makeFetchOk({
        '/shacl/test.ttl': SHACL_DUMMY,
        '/config/ui-config.test-catalogue.json': { ...UI_CONFIG, shaclSource: 'test' }
      })
      const result = await resolver.resolve('test-catalogue')
      expect(result.fields['dct:title']).toBeDefined()
    })

    it('falls back to the standard name when shaclSource is not set', async () => {
      global.fetch = makeFetchOk({
        '/shacl/test.ttl': SHACL_DUMMY,
        '/config/ui-config.test.json': UI_CONFIG
      })
      const result = await resolver.resolve('test')
      expect(result.fields['dct:title']).toBeDefined()
    })
  })

  describe('translation overrides', () => {
    it('generic field label override sets field label for that language', async () => {
      global.fetch = makeFetchOk({
        '/shacl/test.ttl': SHACL_DUMMY,
        '/config/ui-config.test.json': UI_CONFIG
      })
      const result = await resolver.resolve('test', {
        translations: { de: { 'field.dct:title.label': 'Überschrift' } }
      })
      expect(result.fields['dct:title'].label.de).toBe('Überschrift')
    })

    it('standard-scoped field label takes priority over generic', async () => {
      global.fetch = makeFetchOk({
        '/shacl/test.ttl': SHACL_DUMMY,
        '/config/ui-config.test.json': UI_CONFIG
      })
      const result = await resolver.resolve('test', {
        translations: {
          de: {
            'field.dct:title.label': 'Generisch',
            'test.field.dct:title.label': 'Vorrang'
          }
        }
      })
      expect(result.fields['dct:title'].label.de).toBe('Vorrang')
    })

    it('generic group label override sets group label for that language', async () => {
      global.fetch = makeFetchOk({
        '/shacl/test.ttl': SHACL_DUMMY,
        '/config/ui-config.test.json': UI_CONFIG
      })
      const result = await resolver.resolve('test', {
        translations: { de: { 'group.basic.label': 'Grunddaten Übersetzt' } }
      })
      expect(result.groups[0].label.de).toBe('Grunddaten Übersetzt')
    })

    it('standard-scoped group label takes priority over generic', async () => {
      global.fetch = makeFetchOk({
        '/shacl/test.ttl': SHACL_DUMMY,
        '/config/ui-config.test.json': UI_CONFIG
      })
      const result = await resolver.resolve('test', {
        translations: {
          de: {
            'group.basic.label': 'Generisch',
            'test.group.basic.label': 'Vorrang'
          }
        }
      })
      expect(result.groups[0].label.de).toBe('Vorrang')
    })
  })

  describe('error handling', () => {
    it('rejects if SHACL fetch fails', async () => {
      global.fetch = vi.fn().mockImplementation((url) => {
        if (url.endsWith('.ttl')) {
          return Promise.resolve({ ok: false, status: 404, text: () => Promise.resolve('') })
        }
        return Promise.resolve({ ok: true, json: () => Promise.resolve(UI_CONFIG) })
      })
      await expect(resolver.resolve('missing')).rejects.toThrow(/Failed to load SHACL/)
    })

    it('rejects if UI config fetch fails', async () => {
      global.fetch = vi.fn().mockImplementation((url) => {
        if (url.endsWith('.ttl')) {
          return Promise.resolve({ ok: true, text: () => Promise.resolve(SHACL_DUMMY) })
        }
        return Promise.resolve({ ok: false, status: 404, json: () => Promise.resolve({}) })
      })
      await expect(resolver.resolve('missing')).rejects.toThrow(/Failed to load UI config/)
    })
  })
})
