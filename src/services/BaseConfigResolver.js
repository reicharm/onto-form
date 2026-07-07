import { SHACLParser } from './SHACLParser.js'
import { VocabularyLoader } from './VocabularyLoader.js'
import { assetUrl } from '../config/ontoFormConfig.js'
import { compactIRI } from './rdfUtils.js'

export class BaseConfigResolver {
  async resolveFields(standard, uiConfig, { translations = {} } = {}) {
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

    // Apply translation overrides for field strings
    for (const [lang, map] of Object.entries(translations)) {
      for (const [id, field] of Object.entries(mergedFields)) {
        for (const prop of ['label', 'hint', 'placeholder']) {
          const val = map[`${standard}.field.${id}.${prop}`] ?? map[`field.${id}.${prop}`]
          if (val != null) field[prop] = { ...(field[prop] || {}), [lang]: val }
        }
      }
    }

    const vocabWarnings = await this.resolveVocabularies(mergedFields)
    return { mergedFields, vocabWarnings }
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
}
