<template>
  <div class="field">
    <label :class="{ required: field.required }">
      {{ label }}
    </label>
    <input
      type="text"
      :value="modelValue || ''"
      :placeholder="placeholder"
      @input="$emit('update:modelValue', $event.target.value)"
    />
    <span v-if="field.hint?.[lang]" class="hint">{{ field.hint[lang] }}</span>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  field: Object,
  lang: String,
  modelValue: [String, Number]
})
defineEmits(['update:modelValue'])

const label = computed(() => props.field.label?.[props.lang] || props.field.label?.en || props.field.id)
const placeholder = computed(() => props.field.placeholder?.[props.lang] || props.field.placeholder?.en || '')
</script>

<style scoped>
.field { display: flex; flex-direction: column; gap: 0.3rem; }
label { font-size: 0.85rem; font-weight: 500; color: #555; }
label.required::after { content: ' *'; color: #c0392b; }
input {
  padding: 0.5rem 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 0.95rem;
  transition: border-color 0.2s;
}
input:focus { outline: none; border-color: #2c5f8a; box-shadow: 0 0 0 2px rgba(44,95,138,0.15); }
.hint { font-size: 0.78rem; color: #888; }
</style>
