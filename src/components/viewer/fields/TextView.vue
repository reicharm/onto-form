<template>
  <div class="text-view">
    <pre v-if="field.multiline" class="multiline">{{ displayValue }}</pre>
    <span v-else class="inline">{{ displayValue }}</span>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  field: { type: Object, required: true },
  modelValue: { required: true },
  lang: { type: String, required: true },
})

const displayValue = computed(() => {
  if (Array.isArray(props.modelValue)) {
    return props.modelValue.filter(Boolean).join(', ')
  }
  return props.modelValue ?? ''
})
</script>

<style scoped>
.text-view {
  color: var(--color-text);
}
.inline {
  display: inline;
  word-break: break-word;
}
.multiline {
  white-space: pre-wrap;
  word-break: break-word;
  font-family: inherit;
  font-size: inherit;
  margin: 0;
  background: var(--color-surface-alt);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
  padding: 0.5rem 0.75rem;
}
</style>
