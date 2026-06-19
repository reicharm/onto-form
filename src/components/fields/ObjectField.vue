<template>
  <div class="field object-field">
    <div class="object-label">{{ label }}</div>
    <fieldset class="object-fieldset">
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
}

function subFieldComponent(subField) {
  return componentMap[subField.type] || TextField
}

function updateSubField(id, value) {
  const base = { ...(props.modelValue || {}) }
  if (props.field.rdfType) base['rdf:type'] = props.field.rdfType
  emit('update:modelValue', { ...base, [id]: value })
}
</script>

<style scoped>
.field { display: flex; flex-direction: column; gap: 0.3rem; }
.object-label {
  font-size: var(--font-size-label);
  font-weight: 600;
  color: var(--color-text-muted);
}
.object-fieldset {
  border: 1px solid #d0d7de;
  border-radius: var(--radius-md);
  background: var(--color-surface-alt);
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
}
</style>
