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
  'dcat:keyword': { '@container': '@language' },
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
      if (!value || key === '@id') continue
      if (typeof value === 'object' && !Array.isArray(value)) {
        const nonEmpty = Object.fromEntries(Object.entries(value).filter(([, v]) => v))
        if (Object.keys(nonEmpty).length > 0) doc[key] = nonEmpty
      } else if (value !== '') {
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
      ''
    ]

    const id = formData['dct:identifier']
    const subject = id && id.startsWith('http') ? `<${id}>` : `_:dataset`

    const triples = [`${subject} a dcat:Dataset ;`]

    const entries = Object.entries(formData || {}).filter(([k, v]) => v && k !== 'dct:identifier')

    entries.forEach(([key, value], idx) => {
      const sep = idx < entries.length - 1 ? ' ;' : ' .'
      if (typeof value === 'object' && !Array.isArray(value)) {
        const langParts = Object.entries(value)
          .filter(([, v]) => v)
          .map(([lang, v]) => `"${escapeTurtle(v)}"@${lang}`)
        if (langParts.length > 0) {
          triples.push(`    ${key} ${langParts.join(', ')}${sep}`)
        }
      } else if (isURI(value)) {
        triples.push(`    ${key} <${value}>${sep}`)
      } else if (isDate(value)) {
        triples.push(`    ${key} "${value}"^^xsd:date${sep}`)
      } else {
        triples.push(`    ${key} "${escapeTurtle(String(value))}"${sep}`)
      }
    })

    if (triples.length === 1) triples[0] = `${subject} a dcat:Dataset .`

    return [...prefixes, ...triples].join('\n')
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
