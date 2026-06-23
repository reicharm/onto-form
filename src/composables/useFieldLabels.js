import { computed } from 'vue'

/**
 * Resolves localised label, placeholder, and hint from a field config object.
 * Centralises the repeated `field.label?.[lang] || field.label?.en || field.id` pattern.
 */
export function useFieldLabels(fieldRef, langRef) {
  const label = computed(() => {
    const f = fieldRef.value ?? fieldRef   // accept both ref and plain object
    const l = langRef.value  ?? langRef
    return f?.label?.[l] || f?.label?.en || f?.id || ''
  })

  const placeholder = computed(() => {
    const f = fieldRef.value ?? fieldRef
    const l = langRef.value  ?? langRef
    return f?.placeholder?.[l] || f?.placeholder?.en || ''
  })

  const hint = computed(() => {
    const f = fieldRef.value ?? fieldRef
    const l = langRef.value  ?? langRef
    return f?.hint?.[l] || ''
  })

  return { label, placeholder, hint }
}
