import { BaseConfigResolver } from './BaseConfigResolver.js'
import { assetUrl } from '../config/ontoFormConfig.js'

export class FormConfigResolver extends BaseConfigResolver {
  // translations: optional object keyed by language code, each value a flat
  // { 'field.dct:title.label': 'Titel', 'group.basic.label': 'Grunddaten', … }
  // Standard-scoped keys override generic ones:
  //   'dcat-ap-at-catalogue.field.dct:title.label' overrides 'field.dct:title.label'
  async resolve(standard, { translations = {} } = {}) {
    const uiConfig = await this.loadUIConfig(standard)
    const { mergedFields, vocabWarnings } = await this.resolveFields(standard, uiConfig, { translations })

    const groups = (uiConfig.groups || []).map(group => {
      const g = {
        ...group,
        fields: group.fields.filter(fid => mergedFields[fid] && mergedFields[fid].visible !== false)
      }
      // Apply optional per-language translation overrides for group labels
      for (const [lang, map] of Object.entries(translations)) {
        const val = map[`${standard}.group.${group.id}.label`] ?? map[`group.${group.id}.label`]
        if (val != null) g.label = { ...(g.label || {}), [lang]: val }
      }
      return g
    })

    return {
      standard,
      version: uiConfig.version,
      rootClass: uiConfig.rootClass || 'dcat:Dataset',
      groups,
      fields: mergedFields,
      vocabWarnings
    }
  }

  async loadUIConfig(standard) {
    const response = await fetch(assetUrl(`config/ui-config.${standard}.json`))
    if (!response.ok) throw new Error(`Failed to load UI config for ${standard}`)
    return response.json()
  }
}
