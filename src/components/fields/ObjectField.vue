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
  textarea: TextareaField
}

function subFieldComponent(subField) {
  return componentMap[subField.type] || TextField
}

function updateSubField(id, value) {
  emit('update:modelValue', { ...(props.modelValue || {}), [id]: value })
}
</script>

<style scoped>
.field { display: flex; flex-direction: column; gap: 0.3rem; }
.object-label {
  font-size: 0.85rem;
  font-weight: 600;
  color: #555;
}
.object-fieldset {
  border: 1px solid #d0d7de;
  border-radius: 6px;
  background: #f0f4f8;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
}
</style>
