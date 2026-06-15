<template>
  <div class="field">
    <label :class="{ required: field.required }">{{ label }}</label>
    <div class="uri-input">
      <span class="uri-icon">🔗</span>
      <input
        type="url"
        :value="modelValue || ''"
        :placeholder="placeholder || 'https://...'"
        @input="$emit('update:modelValue', $event.target.value)"
      />
    </div>
    <span v-if="validationError" class="error">{{ validationError }}</span>
    <span v-else-if="field.hint?.[lang]" class="hint">{{ field.hint[lang] }}</span>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  field: Object,
  lang: String,
  modelValue: String
})
defineEmits(['update:modelValue'])

const label = computed(() => props.field.label?.[props.lang] || props.field.label?.en || props.field.id)
const placeholder = computed(() => props.field.placeholder?.[props.lang] || props.field.placeholder?.en || '')

const validationError = computed(() => {
  if (!props.modelValue) return null
  try { new URL(props.modelValue); return null } catch { return props.lang === 'de' ? 'Ungültige URL' : 'Invalid URL' }
})
</script>

<style scoped>
.field { display: flex; flex-direction: column; gap: 0.3rem; }
label { font-size: 0.85rem; font-weight: 500; color: #555; }
label.required::after { content: ' *'; color: #c0392b; }
.uri-input { display: flex; align-items: center; border: 1px solid #ddd; border-radius: 4px; overflow: hidden; }
.uri-icon { padding: 0 0.5rem; font-size: 0.85rem; background: #f5f5f5; height: 100%; display: flex; align-items: center; border-right: 1px solid #ddd; }
input { flex: 1; padding: 0.5rem 0.75rem; border: none; font-size: 0.95rem; }
input:focus { outline: none; }
.uri-input:focus-within { border-color: #2c5f8a; box-shadow: 0 0 0 2px rgba(44,95,138,0.15); }
.hint { font-size: 0.78rem; color: #888; }
.error { font-size: 0.78rem; color: #c0392b; }
</style>
