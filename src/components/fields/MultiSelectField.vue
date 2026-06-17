<template>
  <div class="field">
    <label :class="{ required: field.required }">{{ label }}</label>
    <div class="multiselect-box">
      <label
        v-for="opt in field.options"
        :key="opt.value"
        class="option-row"
      >
        <input
          type="checkbox"
          :value="opt.value"
          :checked="(modelValue || []).includes(opt.value)"
          @change="toggle(opt.value)"
        />
        <span>{{ opt.label?.[lang] || opt.label?.de || opt.value }}</span>
      </label>
      <span v-if="!field.options?.length" class="empty">
        {{ lang === 'de' ? 'Keine Optionen konfiguriert.' : 'No options configured.' }}
      </span>
    </div>
    <span v-if="field.hint?.[lang]" class="hint">{{ field.hint[lang] }}</span>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  field: Object,
  lang: String,
  modelValue: { type: Array, default: () => [] }
})
const emit = defineEmits(['update:modelValue'])

const label = computed(() => props.field.label?.[props.lang] || props.field.label?.en || props.field.id)

function toggle(value) {
  const current = props.modelValue || []
  const next = current.includes(value)
    ? current.filter(v => v !== value)
    : [...current, value]
  emit('update:modelValue', next)
}
</script>

<style scoped>
.field { display: flex; flex-direction: column; gap: 0.3rem; }
label { font-size: var(--font-size-label); font-weight: 500; color: var(--color-text-muted); }
label.required::after { content: ' *'; color: var(--color-error); }

.multiselect-box {
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
  background: var(--color-surface);
  max-height: 12rem;
  overflow-y: auto;
  padding: 0.25rem 0;
}

.option-row {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.35rem 0.75rem;
  cursor: pointer;
  font-size: 0.9rem;
  font-weight: 400;
  color: var(--color-text);
  transition: background 0.1s;
}
.option-row:hover { background: var(--color-surface-alt); }
.option-row input[type="checkbox"] {
  accent-color: var(--color-primary);
  width: 1rem;
  height: 1rem;
  flex-shrink: 0;
  cursor: pointer;
}

.empty { padding: 0.5rem 0.75rem; font-size: var(--font-size-label); color: #aaa; }
.hint { font-size: var(--font-size-sm); color: var(--color-text-subtle); }
</style>
