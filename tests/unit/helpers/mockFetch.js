import { vi } from 'vitest'

export function makeFetchOk(responseMap) {
  return vi.fn().mockImplementation((url) => {
    const entry = responseMap[url]
    if (!entry) {
      return Promise.resolve({ ok: false, status: 404, text: () => Promise.resolve(''), json: () => Promise.resolve({}) })
    }
    if (typeof entry === 'string') {
      return Promise.resolve({ ok: true, text: () => Promise.resolve(entry), json: () => Promise.resolve({}) })
    }
    return Promise.resolve({ ok: true, text: () => Promise.resolve(''), json: () => Promise.resolve(entry) })
  })
}
