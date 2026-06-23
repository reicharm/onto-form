import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount, flushPromises } from '@vue/test-utils'
import App from '../../src/App.vue'

// Minimal config stub
function makeConfig(fields = {}) {
  return { wizard: true, fields }
}

vi.mock('../../src/services/FormConfigResolver.js', () => ({
  FormConfigResolver: class {
    resolve(standard) {
      if (standard === 'dcat-ap-at') {
        return Promise.resolve(makeConfig({
          'dct:title':     { type: 'text', multiple: false },
          'dct:language':  { type: 'searchselect', multiple: false },
        }))
      }
      if (standard === 'geodcat') {
        return Promise.resolve(makeConfig({
          'dct:title':     { type: 'text', multiple: false },
          'dct:spatial':   { type: 'text', multiple: false },
        }))
      }
      return Promise.resolve(makeConfig())
    }
  }
}))

vi.mock('../../src/config/fieldComputes.js', () => ({
  applyComputes: (_config, data) => data
}))

vi.mock('../../src/components/MetadataForm.vue', () => ({
  default: { template: '<div class="mock-form"></div>', props: ['config', 'lang', 'wizard', 'modelValue'] }
}))
vi.mock('../../src/components/ExportPanel.vue', () => ({
  default: { template: '<div></div>' }
}))
vi.mock('../../src/components/ImportPanel.vue', () => ({
  default: { template: '<div></div>' }
}))
vi.mock('../../src/components/StandardSelector.vue', () => ({
  default: { template: '<select><option value="dcat-ap-at">A</option><option value="geodcat">G</option></select>', props: ['standards', 'modelValue'] }
}))

describe('profile switching (preserveData)', () => {
  it('keeps shared field values when switching profiles', async () => {
    const w = mount(App, { attachTo: document.body })
    await flushPromises()

    // Set a value in dct:title (shared between both profiles)
    w.vm.formData['dct:title'] = 'My Dataset'

    // Switch to geodcat
    w.vm.selectedStandard = 'geodcat'
    await flushPromises()

    expect(w.vm.formData['dct:title']).toBe('My Dataset')
  })

  it('initialises new fields with defaults when switching profiles', async () => {
    const w = mount(App, { attachTo: document.body })
    await flushPromises()

    w.vm.selectedStandard = 'geodcat'
    await flushPromises()

    // dct:spatial only exists in geodcat; should be initialised to ''
    expect(w.vm.formData['dct:spatial']).toBe('')
  })

  it('preserves values of shared fields when switching to a profile where other fields are absent', async () => {
    const w = mount(App, { attachTo: document.body })
    await flushPromises()

    w.vm.formData['dct:title']    = 'My Dataset'
    w.vm.formData['dct:language'] = 'de'

    w.vm.selectedStandard = 'geodcat'
    await flushPromises()

    // dct:language is not in geodcat — its value is carried along (preserved) but irrelevant
    // for the new profile. The essential check: dct:title (shared) survived.
    expect(w.vm.formData['dct:title']).toBe('My Dataset')
  })

  it('resets data on initial mount (no preserveData)', async () => {
    const w = mount(App, { attachTo: document.body })
    await flushPromises()

    // After mount, title should be the default empty string, not anything residual
    expect(w.vm.formData['dct:title']).toBe('')
  })
})
