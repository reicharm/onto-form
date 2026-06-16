<template>
  <div class="metadata-form">
    <div v-for="group in config.groups" :key="group.id" class="form-group">
      <h2 class="group-title">{{ group.label[lang] || group.label.en }}</h2>
      <div class="group-fields">
        <template v-for="field in groupFields(group)" :key="field.id">
          <div class="field-wrapper" :class="{ 'has-error': fieldErrors[field.id]?.length }">
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
            <ul v-if="fieldErrors[field.id]?.length" class="field-errors">
              <li v-for="err in fieldErrors[field.id]" :key="err">{{ err }}</li>
            </ul>
          </div>
        </template>
      </div>
    </div>

    <div class="form-actions">
      <span v-if="!isValid" class="validation-hint">
        {{ lang === 'de' ? 'Bitte alle Fehler beheben.' : 'Please fix all errors.' }}
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
import { validateForm } from '../composables/useValidation.js'

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

const fieldErrors = computed(() => validateForm(props.config, props.modelValue, props.lang))

const isValid = computed(() => Object.keys(fieldErrors.value).length === 0)
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

.field-wrapper { display: flex; flex-direction: column; gap: 0.2rem; }

.field-wrapper.has-error :deep(input),
.field-wrapper.has-error :deep(textarea),
.field-wrapper.has-error :deep(select) {
  border-color: #c0392b !important;
}

.field-wrapper.has-error :deep(.uri-input),
.field-wrapper.has-error :deep(.object-fieldset) {
  border-color: #c0392b !important;
}

.field-errors {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 0.15rem;
}

.field-errors li {
  font-size: 0.78rem;
  color: #c0392b;
  padding-left: 0.1rem;
}

.field-errors li::before { content: '⚠ '; }

.form-actions {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 1rem;
  padding: 0.5rem 0;
}

.validation-hint {
  font-size: 0.85rem;
  color: #c0392b;
}

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
</style>
