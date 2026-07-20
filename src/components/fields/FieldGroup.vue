<template>
  <div class="group-fields">
    <template v-for="field in fields" :key="field.id">
      <div :id="'field-' + field.id" class="field-wrapper" :class="[{ 'has-error': showErrors && fieldErrors[field.id]?.length }, field.cssClass]">
        <RepeatableField
          v-if="field.multiple && field.type !== 'multiselect' && field.type !== 'distribution-editor' && field.type !== 'object'"
          :field="field"
          :lang="lang"
          :modelValue="displayValue(field)"
          @update:modelValue="updateField(field, $event)"
        />
        <component
          v-else
          :is="fieldComponent(field)"
          :field="field"
          :lang="lang"
          :modelValue="displayValue(field)"
          :showErrors="(field.type === 'object' || field.type === 'distribution-editor') ? showErrors : undefined"
          @update:modelValue="updateField(field, $event)"
        />
        <div v-if="field.transform && displayValue(field)" class="transform-preview">
          {{ t('field.stored-as') }}
          <code>{{ encodedPreview(field, displayValue(field)) || modelValue[field.id] }}</code>
        </div>
        <ul v-if="showErrors && fieldErrors[field.id]?.length" class="field-errors" role="alert">
          <li v-for="err in fieldErrors[field.id]" :key="err">{{ err }}</li>
        </ul>
      </div>
    </template>
  </div>
</template>

<script setup>
import RepeatableField from './RepeatableField.vue'
import { applyDisplay, applyEncode } from '../../config/fieldTransforms.js'
import { useTranslations } from '../../composables/useTranslations.js'

const { t } = useTranslations()

const props = defineProps({
  fields: { type: Array, required: true },
  lang: { type: String, required: true },
  modelValue: { type: Object, required: true },
  fieldErrors: { type: Object, default: () => ({}) },
  showErrors: { type: Boolean, default: true },
  fieldComponent: { type: Function, required: true },
})

const emit = defineEmits(['update:modelValue'])

function displayValue(field) {
  const stored = props.modelValue?.[field.id]
  if (!field.transform) return stored
  if (field.multiple && Array.isArray(stored)) {
    return stored.map(item => applyDisplay(field.transform, item, field.transformOptions))
  }
  return applyDisplay(field.transform, stored, field.transformOptions)
}

function encodedPreview(field, currentDisplayValue) {
  if (!field.transform || !currentDisplayValue) return null
  const stored = props.modelValue?.[field.id]
  if (field.multiple && Array.isArray(currentDisplayValue)) {
    const encoded = currentDisplayValue.map((v, i) => {
      const storedItem = Array.isArray(stored) ? stored[i] : stored
      return applyEncode(field.transform, v, field.transformOptions, storedItem)
    })
    return encoded.some((e, i) => e !== currentDisplayValue[i]) ? encoded.join(', ') : null
  }
  const encoded = applyEncode(field.transform, currentDisplayValue, field.transformOptions, stored)
  return encoded !== currentDisplayValue ? encoded : null
}

function updateField(field, value) {
  const id = typeof field === 'string' ? field : field.id
  if (typeof field === 'object' && field.transform) {
    const stored = props.modelValue?.[id]
    let encoded
    if (field.multiple && Array.isArray(value)) {
      encoded = value.map((v, i) => {
        const storedItem = Array.isArray(stored) ? stored[i] : stored
        return applyEncode(field.transform, v, field.transformOptions, storedItem)
      })
    } else {
      encoded = applyEncode(field.transform, value, field.transformOptions, stored)
    }
    emit('update:modelValue', { ...props.modelValue, [id]: encoded })
  } else {
    emit('update:modelValue', { ...props.modelValue, [id]: value })
  }
}
</script>

<style scoped>
.group-fields { display: flex; flex-direction: column; gap: 1rem; }

.field-wrapper { display: flex; flex-direction: column; gap: 0.2rem; }

.field-wrapper.has-error :deep(input),
.field-wrapper.has-error :deep(textarea),
.field-wrapper.has-error :deep(select) {
  border-color: var(--color-error) !important;
}

.field-wrapper.has-error :deep(.uri-input),
.field-wrapper.has-error :deep(.object-fieldset) {
  border-color: var(--color-error) !important;
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
  font-size: var(--font-size-sm);
  color: var(--color-error);
  padding-left: 0.1rem;
}

.field-errors li::before { content: '⚠ '; }

.transform-preview {
  font-size: var(--font-size-sm);
  color: var(--color-text-muted);
  margin-top: 0.15rem;
}

.transform-preview code {
  font-size: var(--font-size-sm);
  background: var(--color-surface-alt);
  padding: 0.05rem 0.3rem;
  border-radius: 3px;
  color: var(--color-primary);
  word-break: break-all;
}
</style>
