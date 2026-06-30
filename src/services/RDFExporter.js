import { isURI, isDate, isWKT } from './rdfTypeUtils.js'

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
        // Repeatable field: array of { value, lang }, plain strings, or sub-objects
        const items = value.flatMap(item => {
          if (item && typeof item === 'object' && 'value' in item) {
            return item.value ? [{ '@value': item.value, '@language': item.lang }] : []
          }
          if (isSubObject(item)) {
            // Distribution or other sub-object: emit as typed blank node
            const rdfType = item['rdf:type'] || 'dcat:Distribution'
            const node = { '@type': rdfType }
            for (const [subKey, subVal] of Object.entries(item)) {
              if (!subKey.includes(':') || subKey === 'rdf:type') continue
              if (!subVal) continue
              if (isURI(subVal)) node[subKey] = { '@id': subVal }
              else if (isWKT(subVal)) node[subKey] = { '@value': subVal, '@type': 'http://www.opengis.net/ont/geosparql#wktLiteral' }
              else node[subKey] = subVal
            }
            return Object.keys(node).length > 1 ? [node] : []
          }
          return item ? [item] : []
        })
        if (items.length > 0) doc[key] = items.length === 1 ? items[0] : items
      } else if (isSubObject(value)) {
        // Sub-object → blank node
        const node = {}
        if (value['rdf:type']) node['@type'] = value['rdf:type']
        for (const [subKey, subVal] of Object.entries(value)) {
          if (!subKey.includes(':') || subKey === 'rdf:type') continue
          if (!subVal) continue
          if (isURI(subVal)) node[subKey] = { '@id': subVal }
          else if (isWKT(subVal)) node[subKey] = { '@value': subVal, '@type': 'http://www.opengis.net/ont/geosparql#wktLiteral' }
          else node[subKey] = subVal
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

  toRDFXML(formData, standard) {
    const nsDecls = [
      '  xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#"',
      '  xmlns:dct="http://purl.org/dc/terms/"',
      '  xmlns:dcat="http://www.w3.org/ns/dcat#"',
      '  xmlns:foaf="http://xmlns.com/foaf/0.1/"',
      '  xmlns:skos="http://www.w3.org/2004/02/skos/core#"',
      '  xmlns:vcard="http://www.w3.org/2006/vcard/ns#"',
      '  xmlns:xsd="http://www.w3.org/2001/XMLSchema#"',
      '  xmlns:rdfs="http://www.w3.org/2000/01/rdf-schema#"',
    ].join('\n')

    const id = formData['dct:identifier']
    const aboutAttr = id && isURI(id) ? ` rdf:about="${escapeXML(id)}"` : ''

    const lines = []

    for (const [key, value] of Object.entries(formData || {})) {
      if (value == null || value === '' || key === 'dct:identifier') continue

      if (Array.isArray(value)) {
        for (const item of value) {
          if (!item) continue
          if (typeof item === 'object' && 'value' in item) {
            // langstring item {value, lang}
            if (item.value) lines.push(`    <${key} xml:lang="${item.lang}">${escapeXML(item.value)}</${key}>`)
          } else if (isSubObject(item)) {
            // distribution or other sub-object in an array → typed blank node
            const rdfType = item['rdf:type'] || 'dcat:Distribution'
            const subLines = []
            for (const [subKey, subVal] of Object.entries(item)) {
              if (!subKey.includes(':') || subKey === 'rdf:type') continue
              if (!subVal) continue
              if (isURI(subVal)) subLines.push(`        <${subKey} rdf:resource="${escapeXML(subVal)}"/>`)
              else if (isDate(subVal)) subLines.push(`        <${subKey} rdf:datatype="http://www.w3.org/2001/XMLSchema#date">${escapeXML(subVal)}</${subKey}>`)
              else if (isWKT(subVal)) subLines.push(`        <${subKey} rdf:datatype="http://www.opengis.net/ont/geosparql#wktLiteral">${escapeXML(String(subVal))}</${subKey}>`)
              else subLines.push(`        <${subKey}>${escapeXML(String(subVal))}</${subKey}>`)
            }
            if (subLines.length > 0) {
              lines.push(`    <${key}>\n      <${rdfType}>\n${subLines.join('\n')}\n      </${rdfType}>\n    </${key}>`)
            }
          } else if (isURI(item)) {
            lines.push(`    <${key} rdf:resource="${escapeXML(item)}"/>`)
          } else if (item) {
            lines.push(`    <${key}>${escapeXML(String(item))}</${key}>`)
          }
        }
      } else if (isSubObject(value)) {
        const subLines = []
        const rdfType = value['rdf:type']
        const openTag = rdfType
          ? `      <${rdfType}>`
          : '      <rdf:Description>'
        const closeTag = rdfType ? `      </${rdfType}>` : '      </rdf:Description>'
        for (const [subKey, subVal] of Object.entries(value)) {
          if (!subKey.includes(':') || subKey === 'rdf:type') continue
          if (!subVal) continue
          if (isURI(subVal)) subLines.push(`        <${subKey} rdf:resource="${escapeXML(subVal)}"/>`)
          else if (isDate(subVal)) subLines.push(`        <${subKey} rdf:datatype="http://www.w3.org/2001/XMLSchema#date">${escapeXML(subVal)}</${subKey}>`)
          else if (isWKT(subVal)) subLines.push(`        <${subKey} rdf:datatype="http://www.opengis.net/ont/geosparql#wktLiteral">${escapeXML(String(subVal))}</${subKey}>`)
          else subLines.push(`        <${subKey}>${escapeXML(String(subVal))}</${subKey}>`)
        }
        if (subLines.length > 0) {
          lines.push(`    <${key}>\n${openTag}\n${subLines.join('\n')}\n${closeTag}\n    </${key}>`)
        }
      } else if (typeof value === 'object') {
        for (const [lang, v] of Object.entries(value)) {
          if (v) lines.push(`    <${key} xml:lang="${lang}">${escapeXML(v)}</${key}>`)
        }
      } else if (isURI(value)) {
        lines.push(`    <${key} rdf:resource="${escapeXML(value)}"/>`)
      } else if (isDate(value)) {
        lines.push(`    <${key} rdf:datatype="http://www.w3.org/2001/XMLSchema#date">${escapeXML(value)}</${key}>`)
      } else if (isWKT(value)) {
        lines.push(`    <${key} rdf:datatype="http://www.opengis.net/ont/geosparql#wktLiteral">${escapeXML(String(value))}</${key}>`)
      } else {
        lines.push(`    <${key}>${escapeXML(String(value))}</${key}>`)
      }
    }

    return [
      '<?xml version="1.0" encoding="UTF-8"?>',
      `<rdf:RDF\n${nsDecls}>`,
      `  <dcat:Dataset${aboutAttr}>`,
      ...lines,
      '  </dcat:Dataset>',
      '</rdf:RDF>',
    ].join('\n')
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
      '@prefix geo: <http://www.opengis.net/ont/geosparql#> .',
      '@prefix locn: <http://www.w3.org/ns/locn#> .',
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
            // langstring item {value, lang}
            if (item.value) lines.push(`    ${key} "${escapeTurtle(item.value)}"@${item.lang}`)
          } else if (isSubObject(item)) {
            // distribution or other sub-object in an array → blank node
            const rdfType = item['rdf:type'] || 'dcat:Distribution'
            const subLines = [`        a ${rdfType}`]
            for (const [subKey, subVal] of Object.entries(item)) {
              if (!subKey.includes(':') || subKey === 'rdf:type') continue
              if (!subVal) continue
              if (isURI(subVal)) subLines.push(`        ${subKey} <${subVal}>`)
              else if (isDate(subVal)) subLines.push(`        ${subKey} "${subVal}"^^xsd:date`)
              else if (isWKT(subVal)) subLines.push(`        ${subKey} "${escapeTurtle(String(subVal))}"^^geo:wktLiteral`)
              else subLines.push(`        ${subKey} "${escapeTurtle(String(subVal))}"`)
            }
            if (subLines.length > 1) {
              const inner = subLines.map((l, i) => i < subLines.length - 1 ? l + ' ;' : l).join('\n')
              lines.push(`    ${key} [\n${inner}\n    ]`)
            }
          } else if (isURI(item)) {
            lines.push(`    ${key} <${item}>`)
          } else if (item) {
            lines.push(`    ${key} "${escapeTurtle(String(item))}"`)
          }
        }
      } else if (isSubObject(value)) {
        // Sub-object → blank node
        const subLines = []
        if (value['rdf:type']) subLines.push(`        a ${value['rdf:type']}`)
        for (const [subKey, subVal] of Object.entries(value)) {
          if (!subKey.includes(':') || subKey === 'rdf:type') continue
          if (!subVal) continue
          if (isURI(subVal)) subLines.push(`        ${subKey} <${subVal}>`)
          else if (isDate(subVal)) subLines.push(`        ${subKey} "${subVal}"^^xsd:date`)
          else if (isWKT(subVal)) subLines.push(`        ${subKey} "${escapeTurtle(String(subVal))}"^^geo:wktLiteral`)
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
      } else if (isWKT(value)) {
        lines.push(`    ${key} "${escapeTurtle(String(value))}"^^geo:wktLiteral`)
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

function escapeXML(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

function escapeTurtle(s) {
  return s.replace(/\\/g, '\\\\').replace(/"/g, '\\"').replace(/\n/g, '\\n')
}

// Sub-objects have prefixed property keys like "foaf:name", "vcard:fn"
function isSubObject(v) {
  if (typeof v !== 'object' || v === null || Array.isArray(v)) return false
  return Object.keys(v).some(k => k.includes(':'))
}
