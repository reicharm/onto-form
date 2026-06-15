<template>
  <div class="field">
    <label :class="{ required: field.required }">{{ label }}</label>
    <select :value="modelValue || ''" @change="$emit('update:modelValue', $event.target.value)">
      <option value="">{{ lang === 'de' ? '— Bitte wählen —' : '— Please select —' }}</option>
      <option v-for="opt in field.options" :key="opt.value" :value="opt.value">
        {{ opt.label?.[lang] || opt.label?.en || opt.value }}
      </option>
    </select>
    <span v-if="field.hint?.[lang]" class="hint">{{ field.hint[lang] }}</span>
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
</script>

<style scoped>
.field { display: flex; flex-direction: column; gap: 0.3rem; }
label { font-size: 0.85rem; font-weight: 500; color: #555; }
label.required::after { content: ' *'; color: #c0392b; }
select {
  padding: 0.5rem 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 0.95rem;
  background: white;
  cursor: pointer;
}
select:focus { outline: none; border-color: #2c5f8a; }
.hint { font-size: 0.78rem; color: #888; }
</style>
