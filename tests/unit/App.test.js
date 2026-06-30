import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount, flushPromises } from '@vue/test-utils'
import App from '../../src/App.vue'

const resolveMock = vi.fn()

vi.mock('../../src/services/FormConfigResolver.js', () => {
  class FormConfigResolver {
    resolve(standard) { return resolveMock(standard) }
  }
  return { FormConfigResolver }
})

function okConfig(overrides = {}) {
  return {
    standard: 'dcat-ap-at',
    wizard: false,
    groups: [],
    fields: {},
    vocabWarnings: [],
    ...overrides
  }
}

beforeEach(() => {
  resolveMock.mockReset()
})

describe('App error UI', () => {
  it('shows the error banner with a retry button when loadFormConfig fails', async () => {
    resolveMock.mockRejectedValueOnce(new Error('network down'))
    const w = mount(App)
    await flushPromises()

    expect(w.find('.app-error').exists()).toBe(true)
    expect(w.find('.app-error').text()).toContain('network down')
    expect(w.find('.loading').exists()).toBe(false)
  })

  it('retries loadFormConfig when the retry button is clicked', async () => {
    resolveMock.mockRejectedValueOnce(new Error('network down'))
    const w = mount(App)
    await flushPromises()
    expect(w.find('.app-error').exists()).toBe(true)

    resolveMock.mockResolvedValueOnce(okConfig())
    await w.find('.app-error-retry').trigger('click')
    await flushPromises()

    expect(w.find('.app-error').exists()).toBe(false)
  })

  it('does not show the error banner on a successful load', async () => {
    resolveMock.mockResolvedValueOnce(okConfig())
    const w = mount(App)
    await flushPromises()

    expect(w.find('.app-error').exists()).toBe(false)
  })

  it('shows the vocabulary warning banner when config reports vocabWarnings', async () => {
    resolveMock.mockResolvedValueOnce(okConfig({
      vocabWarnings: [{ field: 'dcat:theme', message: 'fetch failed' }]
    }))
    const w = mount(App)
    await flushPromises()

    expect(w.find('.app-warning').exists()).toBe(true)
    expect(w.find('.app-warning').text()).toContain('1')
  })

  it('does not show the vocabulary warning banner when there are no warnings', async () => {
    resolveMock.mockResolvedValueOnce(okConfig({ vocabWarnings: [] }))
    const w = mount(App)
    await flushPromises()

    expect(w.find('.app-warning').exists()).toBe(false)
  })
})

describe('App entity type selector', () => {
  it('loads the dataset standard by default', async () => {
    resolveMock.mockResolvedValueOnce(okConfig())
    mount(App)
    await flushPromises()

    expect(resolveMock).toHaveBeenCalledWith('dcat-ap-at')
  })

  it('loads the fixed catalogue config when switching entityType to catalogue', async () => {
    resolveMock.mockResolvedValueOnce(okConfig())
    const w = mount(App)
    await flushPromises()

    resolveMock.mockResolvedValueOnce(okConfig({ standard: 'dcat-ap-at-catalogue', rootClass: 'dcat:Catalog' }))
    w.vm.entityType = 'catalogue'
    await flushPromises()

    expect(resolveMock).toHaveBeenLastCalledWith('dcat-ap-at-catalogue')
  })

  it('hides the standard selector while editing a catalogue', async () => {
    resolveMock.mockResolvedValueOnce(okConfig())
    const w = mount(App)
    await flushPromises()

    expect(w.findAll('.standard-selector').length).toBe(2)

    resolveMock.mockResolvedValueOnce(okConfig({ standard: 'dcat-ap-at-catalogue', rootClass: 'dcat:Catalog' }))
    w.vm.entityType = 'catalogue'
    await flushPromises()

    expect(w.findAll('.standard-selector').length).toBe(1)
  })

  it('resets a field whose type changed between profiles instead of reusing the old shape', async () => {
    resolveMock.mockResolvedValueOnce(okConfig({
      fields: {
        'dct:description': { id: 'dct:description', type: 'langstring', multiple: true, label: { de: 'Beschreibung' } }
      }
    }))
    const w = mount(App)
    await flushPromises()
    // Dataset profile starts with a langstring item for dct:description
    expect(w.vm.formData['dct:description']).toEqual([{ value: '', lang: 'de' }])

    resolveMock.mockResolvedValueOnce(okConfig({
      standard: 'dcat-ap-at-catalogue',
      rootClass: 'dcat:Catalog',
      fields: {
        'dct:description': { id: 'dct:description', type: 'textarea', multiple: true, label: { de: 'Beschreibung' } }
      }
    }))
    w.vm.entityType = 'catalogue'
    await flushPromises()

    // The catalogue profile's textarea field must not inherit the dataset's langstring object
    expect(w.vm.formData['dct:description']).toEqual([''])
  })

  it('reverts to the previously selected dataset standard when switching back', async () => {
    resolveMock.mockResolvedValueOnce(okConfig())
    const w = mount(App)
    await flushPromises()

    w.vm.selectedStandard = 'geodcat'
    resolveMock.mockResolvedValueOnce(okConfig({ standard: 'geodcat' }))
    await flushPromises()

    resolveMock.mockResolvedValueOnce(okConfig({ standard: 'dcat-ap-at-catalogue', rootClass: 'dcat:Catalog' }))
    w.vm.entityType = 'catalogue'
    await flushPromises()

    resolveMock.mockResolvedValueOnce(okConfig({ standard: 'geodcat' }))
    w.vm.entityType = 'dataset'
    await flushPromises()

    expect(resolveMock).toHaveBeenLastCalledWith('geodcat')
  })
})
