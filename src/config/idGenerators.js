/**
 * Named ID generator functions, referenced via "generate": "<name>" in UI config fields.
 *
 * Signature: (opts) => Promise<string> | string
 *   opts  — the field's "generateOptions" object (may be undefined)
 *
 * The returned value is always the *stored* value (full URI if a prefix is configured).
 * Generators should be fast and self-contained. Async generators (e.g. DOI minting)
 * may return a Promise.
 *
 * Add new generators here and reference them by name in any field config:
 *   "generate": "uuid",
 *   "generateOptions": { "prefix": "https://data.gv.at/dataset/" }
 */

export const idGenerators = {

  /**
   * RFC 4122 v4 UUID, optionally prepended with a prefix.
   * Uses crypto.randomUUID() when available, falls back to a manual implementation.
   *
   * generateOptions: { prefix?: string }
   */
  uuid(opts) {
    const id = typeof crypto?.randomUUID === 'function'
      ? crypto.randomUUID()
      : 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
          const r = (Math.random() * 16) | 0
          return (c === 'x' ? r : (r & 0x3) | 0x8).toString(16)
        })
    return opts?.prefix ? opts.prefix + id : id
  },

  /**
   * Slug based on current date + a short random suffix.
   * Format: YYYY-MM-DD-<4 hex chars>
   *
   * generateOptions: { prefix?: string }
   */
  slugDate(opts) {
    const date = new Date().toISOString().slice(0, 10)
    const suffix = Math.floor(Math.random() * 0xffff).toString(16).padStart(4, '0')
    const id = `${date}-${suffix}`
    return opts?.prefix ? opts.prefix + id : id
  },

  /**
   * Nano-ID style: 21 URL-safe characters (A-Za-z0-9_-).
   * Collision probability comparable to UUID v4.
   *
   * generateOptions: { prefix?: string, length?: number }
   */
  nanoid(opts) {
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789_-'
    const len = opts?.length ?? 21
    const bytes = new Uint8Array(len)
    crypto.getRandomValues(bytes)
    const id = Array.from(bytes).map(b => alphabet[b % alphabet.length]).join('')
    return opts?.prefix ? opts.prefix + id : id
  },

}

/**
 * Run a named generator and return the generated value.
 * Returns null and warns when the generator name is unknown.
 *
 * @param {string} name
 * @param {object|undefined} opts
 * @returns {Promise<string|null>}
 */
export async function generateId(name, opts) {
  const fn = idGenerators[name]
  if (!fn) {
    console.warn(`[idGenerators] Unknown generator: "${name}"`)
    return null
  }
  return fn(opts) ?? null
}
