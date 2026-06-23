import { describe, it, expect, vi, afterEach } from 'vitest'
import { mount } from '@vue/test-utils'
import SearchSelectField from '../../src/components/fields/SearchSelectField.vue'

const OPTIONS = [
  { value: 'de', label: { de: 'Deutsch', en: 'German' } },
  { value: 'en', label: { de: 'Englisch', en: 'English' } },
  { value: 'fr', label: { de: 'Französisch', en: 'French' } },
]

function makeField(overrides = {}) {
  return { id: 'dct:language', label: { de: 'Sprache', en: 'Language' }, options: OPTIONS, ...overrides }
}

function makeWrapper(props = {}) {
  return mount(SearchSelectField, {
    props: { field: makeField(), lang: 'de', modelValue: '', ...props },
    attachTo: document.body
  })
}

afterEach(() => {
  document.body.innerHTML = ''
  vi.restoreAllMocks()
})

describe('SearchSelectField', () => {
  it('renders the field label', () => {
    const w = makeWrapper()
    expect(w.find('label').text()).toBe('Sprache')
  })

  it('shows placeholder when no value selected', () => {
    const w = makeWrapper()
    expect(w.find('.ss-placeholder').exists()).toBe(true)
  })

  it('shows selected label when value is set', () => {
    const w = makeWrapper({ modelValue: 'de' })
    expect(w.find('.ss-value').text()).toBe('Deutsch')
  })

  it('opens dropdown on click', async () => {
    const w = makeWrapper()
    await w.find('.ss-input-wrap').trigger('click')
    expect(w.find('.ss-panel').exists()).toBe(true)
  })

  it('renders all options when panel is open', async () => {
    const w = makeWrapper()
    await w.find('.ss-input-wrap').trigger('click')
    expect(w.findAll('.ss-option')).toHaveLength(3)
  })

  it('filters options by search query', async () => {
    const w = makeWrapper()
    await w.find('.ss-input-wrap').trigger('click')
    await w.find('.ss-search').setValue('franz')
    expect(w.findAll('.ss-option')).toHaveLength(1)
    expect(w.find('.ss-option').text()).toBe('Französisch')
  })

  it('shows "Keine Treffer" when nothing matches', async () => {
    const w = makeWrapper()
    await w.find('.ss-input-wrap').trigger('click')
    await w.find('.ss-search').setValue('zzz')
    expect(w.find('.ss-empty').exists()).toBe(true)
    expect(w.findAll('.ss-option')).toHaveLength(0)
  })

  it('emits update:modelValue when option is clicked', async () => {
    const w = makeWrapper()
    await w.find('.ss-input-wrap').trigger('click')
    await w.findAll('.ss-option')[1].trigger('mousedown')
    expect(w.emitted('update:modelValue')?.[0]).toEqual(['en'])
  })

  it('closes the panel after selecting an option', async () => {
    const w = makeWrapper()
    await w.find('.ss-input-wrap').trigger('click')
    await w.findAll('.ss-option')[0].trigger('mousedown')
    expect(w.find('.ss-panel').exists()).toBe(false)
  })

  it('emits empty string when clear button is clicked', async () => {
    const w = makeWrapper({ modelValue: 'de' })
    await w.find('.ss-clear').trigger('click')
    expect(w.emitted('update:modelValue')?.[0]).toEqual([''])
  })

  it('closes on Escape key', async () => {
    const w = makeWrapper()
    await w.find('.ss-input-wrap').trigger('click')
    expect(w.find('.ss-panel').exists()).toBe(true)
    await w.find('.ss-search').trigger('keydown', { key: 'Escape' })
    expect(w.find('.ss-panel').exists()).toBe(false)
  })

  it('navigates options with ArrowDown and selects with Enter', async () => {
    const w = makeWrapper()
    await w.find('.ss-input-wrap').trigger('click')
    const search = w.find('.ss-search')
    await search.trigger('keydown', { key: 'ArrowDown' })
    await search.trigger('keydown', { key: 'ArrowDown' })
    await search.trigger('keydown', { key: 'Enter' })
    // ArrowDown twice → index 1 (en)
    expect(w.emitted('update:modelValue')?.[0]).toEqual(['en'])
  })

  it('uses english label when lang is en', () => {
    const w = makeWrapper({ modelValue: 'fr', lang: 'en' })
    expect(w.find('.ss-value').text()).toBe('French')
  })

  it('search is case-insensitive', async () => {
    const w = makeWrapper()
    await w.find('.ss-input-wrap').trigger('click')
    await w.find('.ss-search').setValue('DEUTSCH')
    expect(w.findAll('.ss-option')).toHaveLength(1)
  })

  it('does not show clear button when no value selected', () => {
    const w = makeWrapper({ modelValue: '' })
    expect(w.find('.ss-clear').exists()).toBe(false)
  })

  it('shows hint when configured', () => {
    const w = makeWrapper({ field: makeField({ hint: { de: 'Hilfe', en: 'Help' } }) })
    expect(w.find('.hint').text()).toBe('Hilfe')
  })
})
