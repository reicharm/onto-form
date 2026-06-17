const CONTEXT = {
  dct: 'http://purl.org/dc/terms/',
  dcat: 'http://www.w3.org/ns/dcat#',
  foaf: 'http://xmlns.com/foaf/0.1/',
  skos: 'http://www.w3.org/2004/02/skos/core#',
  vcard: 'http://www.w3.org/2006/vcard/ns#',
  xsd: 'http://www.w3.org/2001/XMLSchema#',
  rdfs: 'http://www.w3.org/2000/01/rdf-schema#',
  'dct:title': { '@container': '@language' },
  'dct:description': { '@container': '@language' },
  'dct:issued': { '@type': 'xsd:date' },
  'dct:modified': { '@type': 'xsd:date' },
  'dcat:accessURL': { '@type': '@id' },
  'dcat:downloadURL': { '@type': '@id' },
  'dct:publisher': { '@type': '@id' },
  'dcat:theme': { '@type': '@id' },
  'dct:spatial': { '@type': '@id' }
}

export class RDFExporter {
  toJSONLD(formData, standard) {
    const doc = {
      '@context': CONTEXT,
      '@type': 'dcat:Dataset',
      '@id': formData['dct:identifier'] || `_:dataset_${Date.now()}`
    }

    for (const [key, value] of Object.entries(formData || {})) {
      if (value == null || value === '' || key === '@id') continue

      if (Array.isArray(value)) {
        // Repeatable field: array of { value, lang } or plain strings
        const items = value.flatMap(item => {
          if (item && typeof item === 'object' && 'value' in item) {
            return item.value ? [{ '@value': item.value, '@language': item.lang }] : []
          }
          return item ? [item] : []
        })
        if (items.length > 0) doc[key] = items.length === 1 ? items[0] : items
      } else if (isSubObject(value)) {
        // Sub-object → blank node; skip rdf:type and non-prefixed keys
        const node = {}
        for (const [subKey, subVal] of Object.entries(value)) {
          if (!subKey.includes(':') || subKey === 'rdf:type') continue
          if (subVal) node[subKey] = subVal
        }
        if (Object.keys(node).length > 0) doc[key] = node
      } else if (typeof value === 'object') {
        // Language map { de: '...', en: '...' }
        const nonEmpty = Object.fromEntries(Object.entries(value).filter(([, v]) => v))
        if (Object.keys(nonEmpty).length > 0) doc[key] = nonEmpty
      } else {
        doc[key] = value
      }
    }

    return JSON.stringify(doc, null, 2)
  }

  toTurtle(formData, standard) {
    const prefixes = [
      '@prefix dct: <http://purl.org/dc/terms/> .',
      '@prefix dcat: <http://www.w3.org/ns/dcat#> .',
      '@prefix foaf: <http://xmlns.com/foaf/0.1/> .',
      '@prefix xsd: <http://www.w3.org/2001/XMLSchema#> .',
      '@prefix skos: <http://www.w3.org/2004/02/skos/core#> .',
      '@prefix vcard: <http://www.w3.org/2006/vcard/ns#> .',
      '@prefix rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#> .',
      ''
    ]

    const id = formData['dct:identifier']
    const subject = id && isURI(id) ? `<${id}>` : `_:dataset`

    // Build flat list of rendered triple lines (predicate + object)
    const lines = []

    for (const [key, value] of Object.entries(formData || {})) {
      if (value == null || value === '' || key === 'dct:identifier') continue

      if (Array.isArray(value)) {
        // Repeatable: one triple per item
        for (const item of value) {
          if (!item) continue
          if (typeof item === 'object' && 'value' in item) {
            if (item.value) lines.push(`    ${key} "${escapeTurtle(item.value)}"@${item.lang}`)
          } else if (isURI(item)) {
            lines.push(`    ${key} <${item}>`)
          } else if (item) {
            lines.push(`    ${key} "${escapeTurtle(String(item))}"`)
          }
        }
      } else if (isSubObject(value)) {
        // Sub-object → blank node; skip rdf:type and non-prefixed keys
        const subLines = []
        for (const [subKey, subVal] of Object.entries(value)) {
          if (!subKey.includes(':') || subKey === 'rdf:type') continue
          if (!subVal) continue
          if (isURI(subVal)) subLines.push(`        ${subKey} <${subVal}>`)
          else subLines.push(`        ${subKey} "${escapeTurtle(String(subVal))}"`)
        }
        if (subLines.length > 0) {
          const inner = subLines.map((l, i) =>
            i < subLines.length - 1 ? l + ' ;' : l
          ).join('\n')
          lines.push(`    ${key} [\n${inner}\n    ]`)
        }
      } else if (typeof value === 'object') {
        // Language map { de: '...', en: '...' }
        const parts = Object.entries(value)
          .filter(([, v]) => v)
          .map(([lang, v]) => `"${escapeTurtle(v)}"@${lang}`)
        if (parts.length > 0) lines.push(`    ${key} ${parts.join(', ')}`)
      } else if (isURI(value)) {
        lines.push(`    ${key} <${value}>`)
      } else if (isDate(value)) {
        lines.push(`    ${key} "${value}"^^xsd:date`)
      } else {
        lines.push(`    ${key} "${escapeTurtle(String(value))}"`)
      }
    }

    if (lines.length === 0) {
      return [...prefixes, `${subject} a dcat:Dataset .`].join('\n')
    }

    const body = lines.map((l, i) =>
      i < lines.length - 1 ? l + ' ;' : l + ' .'
    )

    return [...prefixes, `${subject} a dcat:Dataset ;`, ...body].join('\n')
  }
}

function escapeTurtle(s) {
  return s.replace(/\\/g, '\\\\').replace(/"/g, '\\"').replace(/\n/g, '\\n')
}

function isURI(v) {
  return typeof v === 'string' && (v.startsWith('http://') || v.startsWith('https://'))
}

function isDate(v) {
  return typeof v === 'string' && /^\d{4}-\d{2}-\d{2}/.test(v)
}

// Sub-objects have prefixed property keys like "foaf:name", "vcard:fn"
function isSubObject(v) {
  if (typeof v !== 'object' || v === null || Array.isArray(v)) return false
  return Object.keys(v).some(k => k.includes(':'))
}
