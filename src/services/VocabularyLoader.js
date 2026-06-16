export class VocabularyLoader {
  constructor() {
    this._cache = new Map()
  }

  async load(source, fallback) {
    if (this._cache.has(source)) return this._cache.get(source)

    try {
      const response = await fetch(source)
      if (!response.ok) throw new Error(`HTTP ${response.status}`)
      const data = await response.json()
      const options = this._normalize(data)
      this._cache.set(source, options)
      return options
    } catch (err) {
      if (fallback) {
        console.warn(`[VocabularyLoader] Primary source failed (${source}): ${err.message} — trying fallback`)
        return this.load(fallback)
      }
      throw new Error(`Failed to load vocabulary from ${source}: ${err.message}`)
    }
  }

  _normalize(data) {
    // SPARQL JSON format: { results: { bindings: [...] } }
    if (data?.results?.bindings) return this._normalizeSparql(data.results.bindings)

    // JSON-LD graph: { @graph: [...] }
    if (data?.['@graph']) return this._normalizeJsonLD(data['@graph'])

    if (!Array.isArray(data)) return []

    return data.map(item => {
      // Native format: { value, label: { de, en } }
      if (item.value !== undefined && typeof item.value === 'string') return item

      // SKOS-lite format: { uri, prefLabel: { de, en } }
      if (item.uri !== undefined) {
        return { value: item.uri, label: item.prefLabel || {} }
      }

      return null
    }).filter(Boolean)
  }

  _normalizeJsonLD(graph) {
    return graph.flatMap(item => {
      const uri = item['@id']
      if (!uri) return []
      const prefLabels = item['skos:prefLabel'] || item['http://www.w3.org/2004/02/skos/core#prefLabel'] || []
      const label = {}
      const items = Array.isArray(prefLabels) ? prefLabels : [prefLabels]
      for (const l of items) {
        const lang = l['@language']
        const val = l['@value']
        if (lang && val) label[lang] = val
      }
      if (!Object.keys(label).length) return []
      return [{ value: uri, label }]
    })
  }

  _normalizeSparql(bindings) {
    const map = new Map()
    for (const row of bindings) {
      const uri = row.concept?.value || row.uri?.value
      const lang = row.label?.['xml:lang']
      const val = row.label?.value
      if (!uri || !lang || !val) continue
      if (!map.has(uri)) map.set(uri, { value: uri, label: {} })
      map.get(uri).label[lang] = val
    }
    return [...map.values()]
  }
}
