<template>
  <div class="field">
    <label :for="field.id" :class="{ required: field.required }">{{ label }}</label>
    <input
      :id="field.id"
      type="date"
      :value="modelValue || ''"
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
  modelValue: String
})
defineEmits(['update:modelValue'])

const label = computed(() => props.field.label?.[props.lang] || props.field.label?.en || props.field.id)
</script>

<style scoped>
.field { display: flex; flex-direction: column; gap: 0.3rem; }
label { font-size: var(--font-size-label); font-weight: 500; color: var(--color-text-muted); }
label.required::after { content: ' *'; color: var(--color-error); }
input {
  padding: 0.5rem 0.75rem;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
  font-size: var(--font-size-base);
}
input:focus { outline: none; border-color: var(--color-primary); box-shadow: var(--focus-ring); }
.hint { font-size: var(--font-size-sm); color: var(--color-text-subtle); }
</style>
