import { BaseConfigResolver } from './BaseConfigResolver.js'
import { assetUrl } from '../config/ontoFormConfig.js'

export class ViewConfigResolver extends BaseConfigResolver {
  // translations: optional object keyed by language code, each value a flat
  // { 'field.dct:title.label': 'Titel', 'section.basic.label': 'Grunddaten', … }
  // Standard-scoped keys override generic ones:
  //   'dcat-ap-at.field.dct:title.label' overrides 'field.dct:title.label'
  async resolve(standard, { translations = {} } = {}) {
    const uiConfig = await this.loadUIConfig(standard)
    const { mergedFields, vocabWarnings } = await this.resolveFields(standard, uiConfig, { translations })

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

    return {
      standard,
      version: uiConfig.version,
      rootClass: uiConfig.rootClass || 'dcat:Dataset',
      sections,
      fields: mergedFields,
      vocabWarnings
    }
  }

  async loadUIConfig(standard) {
    const [viewRes, formRes] = await Promise.all([
      fetch(assetUrl(`config/ui-view-config.${standard}.json`)),
      fetch(assetUrl(`config/ui-config.${standard}.json`))
    ])

    const formConfig = formRes.ok ? await formRes.json() : null

    if (viewRes.ok) {
      const viewConfig = await viewRes.json()
      // Merge form config field definitions as base so labels/types/subFields are available;
      // view config field overrides take precedence.
      if (formConfig) {
        viewConfig.fields = { ...(formConfig.fields || {}), ...(viewConfig.fields || {}) }
      }
      return viewConfig
    }

    if (!formConfig) throw new Error(`No view config found for ${standard}`)

    // Fall back to the form ui-config and convert groups → flat sections
    return {
      standard,
      version: formConfig.version,
      rootClass: formConfig.rootClass,
      shaclSource: formConfig.shaclSource ?? standard,
      sections: (formConfig.groups || []).map(g => ({ ...g, type: 'section' })),
      fields: formConfig.fields ?? {}
    }
  }
}
