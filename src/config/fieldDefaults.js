// Default empty value for a field, shared by top-level form initialization
// (App.vue's buildDefaultFormData) and repeatable sub-object items
// (DistributionEditor's emptyDist) so both use identical rules.
export function defaultFieldValue(field) {
  if (field.type === 'distribution-editor') return []
  if (field.multiple) {
    return field.type === 'langstring' ? [{ value: '', lang: 'de' }] : ['']
  }
  if (field.defaultValue !== undefined) return field.defaultValue
  if (field.type === 'langstring') return { de: '', en: '' }
  if (field.type === 'multiselect') return []
  if (field.type === 'object') return {}
  // date, text, textarea, uri, select — also hidden fields
  return ''
}

export function defaultFieldValues(fields) {
  const data = {}
  for (const field of fields) data[field.id] = defaultFieldValue(field)
  return data
}
