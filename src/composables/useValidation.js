import { fieldValidators } from '../config/fieldValidators.js'
import { evaluateRequiredIf } from '../config/fieldVisibility.js'

export function hasValue(value, field) {
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
 *
 * Validation is driven entirely by the UI config field definition:
 *   field.required  — whether the field must be non-empty
 *   field.validate  — name of a validator from fieldValidators.js
 *
 * Sub-fields of object fields can each carry their own "required" and
 * "validate" keys and are checked recursively.
 *
 * Returns an array of localised error strings (empty = valid).
 */
export function validateField(field, value, lang, formData) {
  const errors = []
  const de = lang === 'de'

  // Required check: static "required" or conditional "requiredIf"
  const isRequired = field.required || evaluateRequiredIf(field.requiredIf, formData)
  if (isRequired && !hasValue(value, field)) {
    const msg = field.errorMessages?.required?.[lang]
      || (de ? 'Dieses Feld ist erforderlich.' : 'This field is required.')
    errors.push(msg)
    return errors
  }

  // Named validator from config — only if field has a value
  if (field.validate && hasValue(value, field)) {
    const fn = fieldValidators[field.validate]
    if (fn) {
      errors.push(...fn(value, lang))
    } else {
      console.warn(`[useValidation] Unknown validator: "${field.validate}"`)
    }
  }

  // Sub-object: validate sub-fields only if the user has started filling the object
  const objectHasInput = typeof value === 'object' && value !== null && !Array.isArray(value)
    && Object.values(value).some(v => v)
  if (field.type === 'object' && field.subFields && objectHasInput) {
    for (const sf of field.subFields) {
      const sfErrors = validateField(sf, value[sf.id], lang)
      if (sfErrors.length) {
        const sfLabel = sf.label?.[lang] || sf.label?.de || sf.id
        errors.push(...sfErrors.map(e => `${sfLabel}: ${e}`))
      }
    }
  }

  return errors
}

/**
 * Validate all fields in a config against formData.
 * Returns { [fieldId]: string[] } — only entries with errors are included.
 * Only fields referenced in at least one group are validated — SHACL fields
 * from other shapes (e.g. Distribution) that bleed into the merged config
 * are excluded since they are never shown in the form.
 */
export function validateForm(config, formData, lang) {
  const result = {}
  if (!config?.fields) return result

  // Only validate fields that appear in the form (referenced by a group)
  const groupedIds = new Set(
    (config.groups || []).flatMap(g => g.fields || [])
  )

  for (const [id, field] of Object.entries(config.fields)) {
    if (field.visible === false) continue
    if (!groupedIds.has(id)) continue
    const errors = validateField(field, formData?.[id], lang, formData)
    if (errors.length) result[id] = errors
  }
  return result
}
