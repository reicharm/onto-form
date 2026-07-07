import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import TextView from '../../src/components/viewer/fields/TextView.vue'
import DateView from '../../src/components/viewer/fields/DateView.vue'
import URIView from '../../src/components/viewer/fields/URIView.vue'
import SelectView from '../../src/components/viewer/fields/SelectView.vue'
import MultiSelectView from '../../src/components/viewer/fields/MultiSelectView.vue'
import LangStringView from '../../src/components/viewer/fields/LangStringView.vue'
import ObjectView from '../../src/components/viewer/fields/ObjectView.vue'
import SearchSelectView from '../../src/components/viewer/fields/SearchSelectView.vue'
import DistributionView from '../../src/components/viewer/fields/DistributionView.vue'

// ── TextView ──────────────────────────────────────────────────────────────────
describe('TextView', () => {
  it('renders a plain string value', () => {
    const w = mount(TextView, { props: { field: {}, modelValue: 'Hello World', lang: 'de' } })
    expect(w.text()).toContain('Hello World')
  })

  it('renders array values joined with ", "', () => {
    const w = mount(TextView, { props: { field: {}, modelValue: ['foo', 'bar'], lang: 'de' } })
    expect(w.text()).toContain('foo, bar')
  })

  it('renders in <pre> when field.multiline is true', () => {
    const w = mount(TextView, { props: { field: { multiline: true }, modelValue: 'line1\nline2', lang: 'de' } })
    expect(w.find('pre').exists()).toBe(true)
    expect(w.find('pre').text()).toContain('line1')
  })

  it('renders in <span> when field.multiline is false', () => {
    const w = mount(TextView, { props: { field: { multiline: false }, modelValue: 'inline', lang: 'de' } })
    expect(w.find('span').exists()).toBe(true)
    expect(w.find('pre').exists()).toBe(false)
  })
})

// ── DateView ──────────────────────────────────────────────────────────────────
describe('DateView', () => {
  it('formats a valid ISO date as a localized date string', () => {
    const w = mount(DateView, { props: { field: {}, modelValue: '2024-01-15', lang: 'de' } })
    const text = w.text()
    // Should contain year and day numbers
    expect(text).toMatch(/2024/)
    expect(text).toMatch(/15/)
  })

  it('handles invalid date by rendering the raw string', () => {
    const w = mount(DateView, { props: { field: {}, modelValue: 'not-a-date', lang: 'de' } })
    expect(w.text()).toBe('not-a-date')
  })

  it('renders empty string for empty value', () => {
    const w = mount(DateView, { props: { field: {}, modelValue: '', lang: 'de' } })
    expect(w.text()).toBe('')
  })
})

// ── URIView ───────────────────────────────────────────────────────────────────
describe('URIView', () => {
  it('renders <a> with href equal to the URI value', () => {
    const uri = 'http://example.org/dataset'
    const w = mount(URIView, { props: { field: {}, modelValue: uri, lang: 'de' } })
    const a = w.find('a')
    expect(a.exists()).toBe(true)
    expect(a.attributes('href')).toBe(uri)
  })

  it('shortens URIs longer than 60 characters', () => {
    const uri = 'http://example.org/some/very/long/path/that/exceeds/sixty/chars/dataset-identifier'
    const w = mount(URIView, { props: { field: {}, modelValue: uri, lang: 'de' } })
    const a = w.find('a')
    expect(a.text().length).toBeLessThan(uri.length)
  })

  it('renders multiple <a> elements for an array of URIs', () => {
    const uris = ['http://example.org/a', 'http://example.org/b']
    const w = mount(URIView, { props: { field: {}, modelValue: uris, lang: 'de' } })
    const links = w.findAll('a')
    expect(links.length).toBe(2)
    expect(links[0].attributes('href')).toBe(uris[0])
    expect(links[1].attributes('href')).toBe(uris[1])
  })
})

// ── SelectView ────────────────────────────────────────────────────────────────
describe('SelectView', () => {
  const options = [
    { value: 'http://vocab.example/a', label: { de: 'Option A', en: 'Option A EN' } },
    { value: 'http://vocab.example/b', label: { de: 'Option B' } }
  ]

  it('shows the resolved option label for a matching value', () => {
    const w = mount(SelectView, {
      props: {
        field: { options },
        modelValue: 'http://vocab.example/a',
        lang: 'de'
      }
    })
    expect(w.text()).toBe('Option A')
  })

  it('falls back to raw value when no option matches', () => {
    const w = mount(SelectView, {
      props: {
        field: { options },
        modelValue: 'http://vocab.example/unknown',
        lang: 'de'
      }
    })
    expect(w.text()).toBe('http://vocab.example/unknown')
  })

  it('handles label as a plain string (not an object)', () => {
    const w = mount(SelectView, {
      props: {
        field: { options: [{ value: 'x', label: 'Plain Label' }] },
        modelValue: 'x',
        lang: 'de'
      }
    })
    expect(w.text()).toBe('Plain Label')
  })
})

// ── SearchSelectView ──────────────────────────────────────────────────────────
describe('SearchSelectView', () => {
  const options = [
    { value: 'http://vocab.example/a', label: { de: 'Option A', en: 'Option A EN' } },
    { value: 'http://vocab.example/b', label: { de: 'Option B' } }
  ]

  it('shows the resolved option label for a matching value', () => {
    const w = mount(SearchSelectView, {
      props: {
        field: { options },
        modelValue: 'http://vocab.example/a',
        lang: 'de'
      }
    })
    expect(w.text()).toBe('Option A')
  })

  it('falls back to raw value when no option matches', () => {
    const w = mount(SearchSelectView, {
      props: {
        field: { options },
        modelValue: 'http://vocab.example/unknown',
        lang: 'de'
      }
    })
    expect(w.text()).toBe('http://vocab.example/unknown')
  })

  it('handles label as a plain string (not an object)', () => {
    const w = mount(SearchSelectView, {
      props: {
        field: { options: [{ value: 'x', label: 'Plain Label' }] },
        modelValue: 'x',
        lang: 'de'
      }
    })
    expect(w.text()).toBe('Plain Label')
  })
})

// ── MultiSelectView ───────────────────────────────────────────────────────────
describe('MultiSelectView', () => {
  const options = [
    { value: 'http://vocab.example/a', label: { de: 'Option A' } },
    { value: 'http://vocab.example/b', label: { de: 'Option B' } }
  ]

  it('shows a chip for each selected value', () => {
    const w = mount(MultiSelectView, {
      props: {
        field: { options },
        modelValue: ['http://vocab.example/a', 'http://vocab.example/b'],
        lang: 'de'
      }
    })
    const chips = w.findAll('.chip')
    expect(chips.length).toBe(2)
  })

  it('resolves labels from options for each chip', () => {
    const w = mount(MultiSelectView, {
      props: {
        field: { options },
        modelValue: ['http://vocab.example/a', 'http://vocab.example/b'],
        lang: 'de'
      }
    })
    const text = w.text()
    expect(text).toContain('Option A')
    expect(text).toContain('Option B')
  })

  it('falls back to raw value for unknown selections', () => {
    const w = mount(MultiSelectView, {
      props: {
        field: { options },
        modelValue: ['http://vocab.example/unknown'],
        lang: 'de'
      }
    })
    expect(w.text()).toContain('http://vocab.example/unknown')
  })
})

// ── LangStringView ────────────────────────────────────────────────────────────
describe('LangStringView', () => {
  it('with object form {de, en} and lang=de shows the German value', () => {
    const w = mount(LangStringView, {
      props: {
        field: {},
        modelValue: { de: 'Hallo', en: 'Hello' },
        lang: 'de'
      }
    })
    expect(w.text()).toContain('Hallo')
  })

  it('with array form [{value, lang}] and lang=de shows the German value', () => {
    const w = mount(LangStringView, {
      props: {
        field: {},
        modelValue: [{ value: 'Hallo', lang: 'de' }, { value: 'Hello', lang: 'en' }],
        lang: 'de'
      }
    })
    expect(w.text()).toContain('Hallo')
  })

  it('falls back to another language when the current lang is missing from object', () => {
    const w = mount(LangStringView, {
      props: {
        field: {},
        modelValue: { en: 'Hello' },
        lang: 'de'
      }
    })
    expect(w.text()).toContain('Hello')
  })

  it('falls back to other language items when current lang missing from array', () => {
    const w = mount(LangStringView, {
      props: {
        field: {},
        modelValue: [{ value: 'Hello', lang: 'en' }],
        lang: 'de'
      }
    })
    // No 'de' items, should show English value as fallback
    expect(w.text()).toContain('Hello')
  })
})

// ── ObjectView ────────────────────────────────────────────────────────────────
describe('ObjectView', () => {
  const field = {
    subFields: [
      { id: 'title', type: 'text', label: { de: 'Titel', en: 'Title' } },
      { id: 'url', type: 'uri', label: { de: 'URL', en: 'URL' } },
      { id: 'empty', type: 'text', label: { de: 'Leer' } }
    ]
  }

  it('renders sub-fields that have values', () => {
    const w = mount(ObjectView, {
      props: {
        field,
        modelValue: { title: 'My Title', url: 'http://example.org', empty: '' },
        lang: 'de'
      }
    })
    expect(w.text()).toContain('My Title')
  })

  it('skips empty sub-fields', () => {
    const w = mount(ObjectView, {
      props: {
        field,
        modelValue: { title: 'My Title', url: 'http://example.org', empty: '' },
        lang: 'de'
      }
    })
    // The 'Leer' label should not appear because empty field is filtered out
    expect(w.text()).not.toContain('Leer')
  })

  it('renders URI sub-fields as <a> links', () => {
    const w = mount(ObjectView, {
      props: {
        field,
        modelValue: { title: 'My Title', url: 'http://example.org' },
        lang: 'de'
      }
    })
    const a = w.find('a')
    expect(a.exists()).toBe(true)
    expect(a.attributes('href')).toBe('http://example.org')
  })

  it('skips null sub-fields', () => {
    const w = mount(ObjectView, {
      props: {
        field,
        modelValue: { title: null, url: 'http://example.org' },
        lang: 'de'
      }
    })
    // title with null should not appear
    const dts = w.findAll('dt')
    const labels = dts.map(dt => dt.text())
    expect(labels).not.toContain('Titel')
  })
})

// ── DistributionView ──────────────────────────────────────────────────────────
describe('DistributionView', () => {
  it('renders a .dist-card for each distribution in the array', () => {
    const w = mount(DistributionView, {
      props: {
        field: {},
        modelValue: [
          { 'dct:title': 'Dist 1' },
          { 'dct:title': 'Dist 2' }
        ],
        lang: 'de'
      }
    })
    expect(w.findAll('.dist-card').length).toBe(2)
  })

  it('shows dct:title as plain string in the card', () => {
    const w = mount(DistributionView, {
      props: {
        field: {},
        modelValue: [{ 'dct:title': 'My Distribution' }],
        lang: 'de'
      }
    })
    expect(w.text()).toContain('My Distribution')
  })

  it('resolves dct:title from an object by lang', () => {
    const w = mount(DistributionView, {
      props: {
        field: {},
        modelValue: [{ 'dct:title': { de: 'Deutsch', en: 'English' } }],
        lang: 'de'
      }
    })
    expect(w.text()).toContain('Deutsch')
    expect(w.text()).not.toContain('English')
  })

  it('resolves dct:title from an array by lang', () => {
    const w = mount(DistributionView, {
      props: {
        field: {},
        modelValue: [{ 'dct:title': [{ value: 'Array title', lang: 'de' }] }],
        lang: 'de'
      }
    })
    expect(w.text()).toContain('Array title')
  })

  it('renders dcat:accessURL as an <a> link', () => {
    const url = 'http://example.org/access'
    const w = mount(DistributionView, {
      props: {
        field: {},
        modelValue: [{ 'dcat:accessURL': url }],
        lang: 'de'
      }
    })
    const a = w.find('a')
    expect(a.exists()).toBe(true)
    expect(a.attributes('href')).toBe(url)
  })

  it('does not crash when dcat:accessURL is missing', () => {
    expect(() => {
      mount(DistributionView, {
        props: {
          field: {},
          modelValue: [{ 'dct:title': 'No link here' }],
          lang: 'de'
        }
      })
    }).not.toThrow()
  })

  it('formatDate with a valid ISO date shows a formatted string (not the raw date)', () => {
    const w = mount(DistributionView, {
      props: {
        field: {},
        modelValue: [{ 'dct:issued': '2024-03-15' }],
        lang: 'de'
      }
    })
    const text = w.text()
    expect(text).toMatch(/2024/)
    expect(text).not.toBe('2024-03-15')
  })

  it('formatDate with an invalid date shows the raw string', () => {
    const w = mount(DistributionView, {
      props: {
        field: {},
        modelValue: [{ 'dct:issued': 'not-a-date' }],
        lang: 'de'
      }
    })
    expect(w.text()).toContain('not-a-date')
  })

  it('shows the .no-distributions element for an empty array', () => {
    const w = mount(DistributionView, {
      props: {
        field: {},
        modelValue: [],
        lang: 'de'
      }
    })
    expect(w.find('.no-distributions').exists()).toBe(true)
    expect(w.findAll('.dist-card').length).toBe(0)
  })
})
