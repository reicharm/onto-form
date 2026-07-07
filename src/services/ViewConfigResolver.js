import { SHACLParser } from './SHACLParser.js'
import { VocabularyLoader } from './VocabularyLoader.js'
import { assetUrl } from '../config/ontoFormConfig.js'
import { compactIRI } from './rdfUtils.js'

export class ViewConfigResolver {
  // translations: optional object keyed by language code, each value a flat
  // { 'field.dct:title.label': 'Titel', 'section.basic.label': 'Grunddaten', … }
  // Standard-scoped keys override generic ones:
  //   'dcat-ap-at.field.dct:title.label' overrides 'field.dct:title.label'
  async resolve(standard, { translations = {} } = {}) {
    const uiConfig = await this.loadUIConfig(standard)
    const shaclContent = await this.loadSHACL(uiConfig.shaclSource || standard)

    const parser = new SHACLParser()
    const shapes = await parser.parse(shaclContent)

    const rootClass = uiConfig.rootClass
    const allFields = {}
    for (const shape of Object.values(shapes)) {
      if (shape.embedded) continue
      if (rootClass && shape.targetClass && compactIRI(shape.targetClass) !== rootClass) continue
      Object.assign(allFields, shape.fields)
    }

    const mergedFields = { ...allFields }
    const uiFields = uiConfig.fields || {}

    for (const [id, uiField] of Object.entries(uiFields)) {
      if (mergedFields[id]) {
        mergedFields[id] = {
          ...mergedFields[id],
          ...uiField,
          label: { ...mergedFields[id].label, ...(uiField.label || {}) },
          hint: { ...mergedFields[id].hint, ...(uiField.hint || {}) }
        }
      } else {
        mergedFields[id] = { id, type: 'text', visible: true, order: 999, ...uiField }
      }
    }

    // Apply optional per-language translation overrides for field strings
    for (const [lang, map] of Object.entries(translations)) {
      for (const [id, field] of Object.entries(mergedFields)) {
        for (const prop of ['label', 'hint', 'placeholder']) {
          const val = map[`${standard}.field.${id}.${prop}`] ?? map[`field.${id}.${prop}`]
          if (val != null) field[prop] = { ...(field[prop] || {}), [lang]: val }
        }
      }
    }

    const sections = (uiConfig.sections || []).map(section => {
      if (section.type === 'section') {
        const s = {
          ...section,
          fields: (section.fields || []).filter(fid => mergedFields[fid] && mergedFields[fid].visible !== false)
        }
        // Apply translation overrides for section labels
        for (const [lang, map] of Object.entries(translations)) {
          const val = map[`${standard}.section.${section.id}.label`] ?? map[`section.${section.id}.label`]
          if (val != null) s.label = { ...(s.label || {}), [lang]: val }
        }
        return s
      } else if (section.type === 'tabs') {
        const tabs = (section.tabs || []).map(tab => {
          const t = {
            ...tab,
            fields: (tab.fields || []).filter(fid => mergedFields[fid] && mergedFields[fid].visible !== false)
          }
          // Apply translation overrides for tab labels
          for (const [lang, map] of Object.entries(translations)) {
            const val = map[`${standard}.tab.${tab.id}.label`] ?? map[`tab.${tab.id}.label`]
            if (val != null) t.label = { ...(t.label || {}), [lang]: val }
          }
          return t
        })
        return { ...section, tabs }
      }
      return section
    })

    const vocabWarnings = await this.resolveVocabularies(mergedFields)

    return {
      standard,
      version: uiConfig.version,
      rootClass: rootClass || 'dcat:Dataset',
      sections,
      fields: mergedFields,
      vocabWarnings
    }
  }

  async resolveVocabularies(fields) {
    const loader = new VocabularyLoader()
    const warnings = []
    const pending = []

    for (const [id, field] of Object.entries(fields)) {
      if (!field.optionsSource) continue
      pending.push(
        loader.load(field.optionsSource, field.optionsSourceFallback)
          .then(options => { field.options = [...options, ...(field.options || [])] })
          .catch(err => {
            console.warn(`[VocabularyLoader] ${id}: ${err.message}`)
            warnings.push({ field: id, message: err.message })
          })
      )
    }

    await Promise.all(pending)
    return warnings
  }

  async loadSHACL(standard) {
    const response = await fetch(assetUrl(`shacl/${standard}.ttl`))
    if (!response.ok) throw new Error(`Failed to load SHACL for ${standard}`)
    return response.text()
  }

  async loadUIConfig(standard) {
    const response = await fetch(assetUrl(`config/ui-view-config.${standard}.json`))
    if (!response.ok) throw new Error(`Failed to load UI view config for ${standard}`)
    return response.json()
  }
}
