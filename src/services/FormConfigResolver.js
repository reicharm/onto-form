import { SHACLParser } from './SHACLParser.js'

export class FormConfigResolver {
  async resolve(standard) {
    const [shaclContent, uiConfig] = await Promise.all([
      this.loadSHACL(standard),
      this.loadUIConfig(standard)
    ])

    const parser = new SHACLParser()
    const shapes = await parser.parse(shaclContent)

    const allFields = {}
    for (const shape of Object.values(shapes)) {
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

    const groups = (uiConfig.groups || []).map(group => ({
      ...group,
      fields: group.fields.filter(fid => mergedFields[fid] && mergedFields[fid].visible !== false)
    }))

    return {
      standard,
      version: uiConfig.version,
      groups,
      fields: mergedFields
    }
  }

  async loadSHACL(standard) {
    const response = await fetch(`/shacl/${standard}.ttl`)
    if (!response.ok) throw new Error(`Failed to load SHACL for ${standard}`)
    return response.text()
  }

  async loadUIConfig(standard) {
    const response = await fetch(`/config/ui-config.${standard}.json`)
    if (!response.ok) throw new Error(`Failed to load UI config for ${standard}`)
    return response.json()
  }
}
