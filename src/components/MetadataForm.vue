<template>
  <div class="metadata-form">
    <div v-for="group in config.groups" :key="group.id" class="form-group">
      <h2 class="group-title">{{ group.label[lang] || group.label.en }}</h2>
      <div class="group-fields">
        <template v-for="field in groupFields(group)" :key="field.id">
          <RepeatableField
            v-if="field.multiple"
            :field="field"
            :lang="lang"
            :modelValue="modelValue[field.id]"
            @update:modelValue="updateField(field.id, $event)"
          />
          <component
            v-else
            :is="fieldComponent(field)"
            :field="field"
            :lang="lang"
            :modelValue="modelValue[field.id]"
            @update:modelValue="updateField(field.id, $event)"
          />
        </template>
      </div>
    </div>

    <div class="form-actions">
      <span v-if="!isValid" class="validation-hint">
        {{ lang === 'de' ? 'Bitte alle Pflichtfelder (*) ausfüllen.' : 'Please fill in all required fields (*).' }}
      </span>
      <button
        class="btn-export"
        :disabled="!isValid"
        :class="{ disabled: !isValid }"
        @click="isValid && $emit('export')"
      >Export JSON-LD / Turtle</button>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import TextField from './fields/TextField.vue'
import TextareaField from './fields/TextareaField.vue'
import SelectField from './fields/SelectField.vue'
import DateField from './fields/DateField.vue'
import URIField from './fields/URIField.vue'
import LangStringField from './fields/LangStringField.vue'
import ObjectField from './fields/ObjectField.vue'
import RepeatableField from './fields/RepeatableField.vue'

const props = defineProps({
  config: Object,
  lang: String,
  modelValue: Object
})

const emit = defineEmits(['update:modelValue', 'export'])

const componentMap = {
  textarea: TextareaField,
  select: SelectField,
  date: DateField,
  uri: URIField,
  langstring: LangStringField,
  text: TextField,
  object: ObjectField
}

function fieldComponent(field) {
  return componentMap[field.type] || TextField
}

function groupFields(group) {
  return (group.fields || [])
    .map(id => props.config.fields[id])
    .filter(f => f && f.visible !== false)
    .sort((a, b) => (a.order || 0) - (b.order || 0))
}

function updateField(id, value) {
  emit('update:modelValue', { ...props.modelValue, [id]: value })
}

function hasValue(value, field) {
  if (value == null) return false
  if (Array.isArray(value)) {
    return value.some(item =>
      item && (typeof item === 'object' ? (item.value || Object.values(item).some(v => v)) : item)
    )
  }
  if (typeof value === 'object') {
    // Sub-object: check required sub-fields
    if (field?.subFields) {
      return field.subFields.filter(sf => sf.required).every(sf => value[sf.id])
    }
    // Language map: at least one language filled
    return Object.values(value).some(v => v)
  }
  return value !== ''
}

const isValid = computed(() => {
  if (!props.config?.fields) return true
  return Object.entries(props.config.fields).every(([id, field]) => {
    if (!field.required) return true
    return hasValue(props.modelValue?.[id], field)
  })
})
</script>

<style scoped>
.metadata-form { display: flex; flex-direction: column; gap: 2rem; }

.form-group {
  background: white;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
  padding: 1.5rem;
}

.group-title {
  font-size: 1.1rem;
  font-weight: 600;
  color: #2c5f8a;
  margin-bottom: 1.2rem;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid #e8f0f7;
}

.group-fields { display: flex; flex-direction: column; gap: 1rem; }

.form-actions { display: flex; justify-content: flex-end; padding: 0.5rem 0; }

.btn-export {
  background: #2c5f8a;
  color: white;
  border: none;
  padding: 0.7rem 1.5rem;
  border-radius: 6px;
  font-size: 0.95rem;
  cursor: pointer;
  font-weight: 500;
}
.btn-export:hover:not(.disabled) { background: #1e4468; }
.btn-export.disabled {
  background: #a0b4c5;
  cursor: not-allowed;
  opacity: 0.7;
}
.validation-hint {
  font-size: 0.85rem;
  color: #c0392b;
  align-self: center;
  margin-right: 1rem;
}
</style>
