<template>
  <div class="langstring-item">
    <select
      class="lang-select"
      :value="modelValue.lang || 'de'"
      :aria-label="t('aria.lang-select')"
      @change="updateLang($event.target.value)"
    >
      <option v-for="l in availableLangs" :key="l" :value="l">{{ l }}</option>
    </select>
    <textarea
      v-if="multiline"
      :value="modelValue.value || ''"
      :placeholder="placeholder"
      :rows="rows"
      :aria-label="lang === 'de' ? `Texteingabe auf ${modelValue.lang || 'de'}` : `Text in ${modelValue.lang || 'de'}`"
      @input="updateValue($event.target.value)"
    />
    <input
      v-else
      type="text"
      :value="modelValue.value || ''"
      :placeholder="placeholder"
      :aria-label="lang === 'de' ? `Texteingabe auf ${modelValue.lang || 'de'}` : `Text in ${modelValue.lang || 'de'}`"
      @input="updateValue($event.target.value)"
    />
  </div>
</template>

<script setup>
import { useTranslations } from '../../composables/useTranslations.js'

const { t } = useTranslations()

const props = defineProps({
  modelValue: { type: Object, default: () => ({ value: '', lang: 'de' }) },
  lang: String,
  placeholder: { type: String, default: '' },
  multiline: { type: Boolean, default: false },
  rows: { type: Number, default: 4 }
})
const emit = defineEmits(['update:modelValue'])

const availableLangs = ['de', 'en', 'fr', 'it', 'es', 'nl', 'pl', 'cs', 'sk', 'hr']

function updateLang(l) {
  emit('update:modelValue', { ...props.modelValue, lang: l })
}
function updateValue(v) {
  emit('update:modelValue', { ...props.modelValue, value: v })
}
</script>

<style scoped>
.langstring-item {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  flex: 1;
}
.langstring-item:has(textarea) {
  align-items: flex-start;
}
.lang-select {
  width: 3.5rem;
  padding: 0.4rem 0.3rem;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
  font-size: 0.8rem;
  background: var(--color-surface);
  cursor: pointer;
}
.lang-select:focus { outline: none; border-color: var(--color-primary); box-shadow: var(--focus-ring); }
input, textarea {
  flex: 1;
  padding: 0.5rem 0.75rem;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
  font-size: var(--font-size-base);
  font-family: inherit;
}
input:focus, textarea:focus { outline: none; border-color: var(--color-primary); box-shadow: var(--focus-ring); }
textarea { resize: vertical; }
</style>
