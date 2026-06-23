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
      <component
        v-for="subField in field.subFields"
        :key="subField.id"
        :is="subFieldComponent(subField)"
        :field="subField"
        :lang="lang"
        :modelValue="(modelValue || {})[subField.id]"
        @update:modelValue="updateSubField(subField.id, $event)"
      />
    </fieldset>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import TextField from './TextField.vue'
import URIField from './URIField.vue'
import SelectField from './SelectField.vue'
import LangStringField from './LangStringField.vue'
import TextareaField from './TextareaField.vue'
import DateField from './DateField.vue'
import MapField from './MapField.vue'
import SearchSelectField from './SearchSelectField.vue'
import FieldSuggestions from './FieldSuggestions.vue'

const props = defineProps({
  field: Object,
  lang: String,
  modelValue: { type: Object, default: () => ({}) }
})
const emit = defineEmits(['update:modelValue'])

const label = computed(() => props.field.label?.[props.lang] || props.field.label?.en || props.field.id)

const componentMap = {
  text: TextField,
  uri: URIField,
  select: SelectField,
  langstring: LangStringField,
  textarea: TextareaField,
  date: DateField,
  map: MapField,
  searchselect: SearchSelectField,
}

function subFieldComponent(subField) {
  return componentMap[subField.type] || TextField
}

function updateSubField(id, value) {
  const base = { ...(props.modelValue || {}) }
  if (props.field.rdfType) base['rdf:type'] = props.field.rdfType
  emit('update:modelValue', { ...base, [id]: value })
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
</style>
