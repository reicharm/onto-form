/**
 * Central field validation.
 * Add new rules here — MetadataForm picks them up automatically.
 */

function isValidURI(v) {
  try { new URL(v); return true } catch { return false }
}

function hasValue(value, field) {
  if (value == null) return false
  if (Array.isArray(value)) {
    return value.some(item =>
      item && (typeof item === 'object' ? (item.value || Object.values(item).some(v => v)) : item)
    )
  }
  if (typeof value === 'object') {
    if (field?.subFields) {
      return field.subFields.filter(sf => sf.required).every(sf => value[sf.id])
    }
    return Object.values(value).some(v => v)
  }
  return value !== ''
}

/**
 * Validate a single field value.
 * Returns an array of localised error strings (empty = valid).
 */
export function validateField(field, value, lang) {
  const errors = []
  const de = lang === 'de'

  // Required
  if (field.required && !hasValue(value, field)) {
    const msg = field.errorMessages?.required?.[lang]
      || (de ? 'Dieses Feld ist erforderlich.' : 'This field is required.')
    errors.push(msg)
    return errors // no point checking further if empty
  }

  // URI format (single value)
  if (field.type === 'uri' && typeof value === 'string' && value) {
    if (!isValidURI(value)) {
      errors.push(de ? 'Ungültige URL.' : 'Invalid URL.')
    }
  }

  // URI format (repeatable)
  if (field.type === 'uri' && field.multiple && Array.isArray(value)) {
    value.forEach((item, i) => {
      if (item && !isValidURI(item)) {
        errors.push(`${de ? 'Eintrag' : 'Entry'} ${i + 1}: ${de ? 'Ungültige URL' : 'Invalid URL'}`)
      }
    })
  }

  // Sub-object: required sub-fields + URI sub-fields
  if (field.type === 'object' && field.subFields && value && typeof value === 'object') {
    for (const sf of field.subFields) {
      const sfLabel = sf.label?.[lang] || sf.label?.de || sf.id
      if (sf.required && !value[sf.id]) {
        errors.push(`${sfLabel}: ${de ? 'Pflichtfeld' : 'required'}`)
      } else if (sf.type === 'uri' && value[sf.id] && !isValidURI(value[sf.id])) {
        errors.push(`${sfLabel}: ${de ? 'Ungültige URL' : 'Invalid URL'}`)
      }
    }
  }

  return errors
}

/**
 * Validate all fields in a config against formData.
 * Returns { [fieldId]: string[] } — only entries with errors are included.
 */
export function validateForm(config, formData, lang) {
  const result = {}
  if (!config?.fields) return result
  for (const [id, field] of Object.entries(config.fields)) {
    const errors = validateField(field, formData?.[id], lang)
    if (errors.length) result[id] = errors
  }
  return result
}
