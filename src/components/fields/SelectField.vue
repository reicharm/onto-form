<template>
  <div class="field">
    <label :for="field.id" :class="{ required: field.required }">{{ label }}</label>
    <select :id="field.id" :value="modelValue || ''" @change="$emit('update:modelValue', $event.target.value)">
      <option value="">{{ t('select.placeholder') }}</option>
      <option v-for="opt in field.options" :key="opt.value" :value="opt.value">
        {{ opt.label?.[lang] || opt.label?.de || opt.label?.en || opt.value }}
      </option>
    </select>
    <span v-if="field.hint?.[lang]" class="hint">{{ field.hint[lang] }}</span>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useTranslations } from '../../composables/useTranslations.js'
import { useFieldLabels } from '../../composables/useFieldLabels.js'

const props = defineProps({
  field: Object,
  lang: String,
  modelValue: String
})
defineEmits(['update:modelValue'])

const { t } = useTranslations()
const { label } = useFieldLabels(computed(() => props.field), computed(() => props.lang))
</script>

<style scoped>
.field { display: flex; flex-direction: column; gap: 0.3rem; }
label { font-size: var(--font-size-label); font-weight: 500; color: var(--color-text-muted); }
label.required::after { content: ' *'; color: var(--color-error); }
select {
  padding: 0.5rem 0.75rem;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
  font-size: var(--font-size-base);
  background: var(--color-surface);
  cursor: pointer;
}
select:focus { outline: none; border-color: var(--color-primary); box-shadow: var(--focus-ring); }
.hint { font-size: var(--font-size-sm); color: var(--color-text-subtle); }
</style>
