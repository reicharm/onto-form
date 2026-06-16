export class VocabularyLoader {
  constructor() {
    this._cache = new Map()
  }

  async load(source) {
    if (this._cache.has(source)) return this._cache.get(source)

    const response = await fetch(source)
    if (!response.ok) throw new Error(`Failed to load vocabulary from ${source}: ${response.status}`)

    const data = await response.json()
    const options = this._normalize(data)
    this._cache.set(source, options)
    return options
  }

  _normalize(data) {
    if (!Array.isArray(data)) return []
    return data.map(item => {
      // Native format: { value, label: { de, en } }
      if (item.value !== undefined) return item

      // SKOS-lite format: { uri, prefLabel: { de, en } }
      if (item.uri !== undefined) {
        return { value: item.uri, label: item.prefLabel || {} }
      }

      return null
    }).filter(Boolean)
  }
}
