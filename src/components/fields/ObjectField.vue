<template>
  <div class="field object-field">
    <!-- Suggestion picker (shown when field.remember is true and suggestions exist) -->
    <FieldSuggestions
      v-if="field.remember"
      :field="field"
      :lang="lang"
      @select="applySuggestion"
    />

    <fieldset class="object-fieldset">
      <legend class="object-legend">{{ label }}</legend>
      <FieldGroup
        :fields="visibleSubFields"
        :lang="lang"
        :modelValue="modelValue || {}"
        :fieldErrors="subFieldErrors"
        :showErrors="showErrors"
        :fieldComponent="fieldComponent"
        @update:modelValue="onSubUpdate"
      />
    </fieldset>
  </div>
</template>

<script setup>
import { computed, getCurrentInstance } from 'vue'
import FieldGroup from './FieldGroup.vue'
import FieldSuggestions from './FieldSuggestions.vue'
import { fieldComponent as resolveFieldComponent } from '../../config/fieldComponentMap.js'
import { evaluateVisibleIf } from '../../config/fieldVisibility.js'
import { validateField } from '../../composables/useValidation.js'

const props = defineProps({
  field: Object,
  lang: String,
  modelValue: { type: Object, default: () => ({}) },
  showErrors: { type: Boolean, default: true },
  // Whether this field is currently required (field.required or a truthy
  // field.requiredIf evaluated by the parent FieldGroup against its own
  // modelValue scope). Gates whether sub-field errors show before the user
  // has entered anything — see objectHasInput below.
  parentRequired: { type: Boolean, default: true }
})
const emit = defineEmits(['update:modelValue'])

const label = computed(() => props.field.label?.[props.lang] || props.field.label?.en || props.field.id)

// A sub-field of type "object" nests another ObjectField recursively (e.g. an
// address object inside an agent object). Resolving that self-reference via
// getCurrentInstance().type — rather than importing this component's own
// file — avoids a real import cycle (this file already imports
// fieldComponentMap.js for the leaf types).
const SELF_EXTRA = { object: getCurrentInstance().type }
function fieldComponent(field) {
  return resolveFieldComponent(field, SELF_EXTRA)
}

// Sub-fields support the same visible/visibleIf mechanism as top-level fields.
// visibleIf conditions on sub-fields are evaluated against the sub-object's
// own values (sibling sub-fields), not the root form data.
const visibleSubFields = computed(() =>
  (props.field.subFields || []).filter(sf =>
    sf.visible !== false && evaluateVisibleIf(sf.visibleIf, props.modelValue)
  )
)

// Sub-fields validate the same way top-level fields do (required/requiredIf/validate).
// Only surface those errors once this object is actually relevant: either
// it's currently required (parentRequired — e.g. not hidden behind a
// requiredIf that evaluated false, as with a dataproduct-only field) or the
// user has already started filling it in. Otherwise an optional, untouched
// section would show "required" errors for fields the user may never need
// to fill in at all.
const objectHasInput = computed(() => {
  const v = props.modelValue
  return typeof v === 'object' && v !== null && !Array.isArray(v) && Object.values(v).some(x => x)
})

const subFieldErrors = computed(() => {
  const result = {}
  if (!props.parentRequired && !objectHasInput.value) return result
  for (const sf of visibleSubFields.value) {
    const errors = validateField(sf, (props.modelValue || {})[sf.id], props.lang, props.modelValue)
    if (errors.length) result[sf.id] = errors
  }
  return result
})

function onSubUpdate(updated) {
  const base = props.field.rdfType ? { 'rdf:type': props.field.rdfType } : {}
  emit('update:modelValue', { ...base, ...updated })
}

function applySuggestion(value) {
  const base = props.field.rdfType ? { 'rdf:type': props.field.rdfType } : {}
  emit('update:modelValue', { ...base, ...value })
}
</script>

<style scoped>
.field { display: flex; flex-direction: column; gap: 0.3rem; }

.object-fieldset {
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  background: var(--color-surface-alt);
  padding: 0.75rem 1rem 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
}

.object-legend {
  font-size: var(--font-size-label);
  font-weight: 600;
  color: var(--color-text-muted);
  padding: 0 0.25rem;
}

.object-fieldset :deep(.group-fields) { gap: 0.8rem; }
</style>
