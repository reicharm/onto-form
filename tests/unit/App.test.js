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
