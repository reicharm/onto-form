<template>
  <div class="chips" v-if="displayLabels.length">
    <span v-for="(label, i) in displayLabels" :key="i" class="chip">{{ label }}</span>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  field: { type: Object, required: true },
  modelValue: { required: true },
  lang: { type: String, required: true }
})

const displayLabels = computed(() => {
  const arr = Array.isArray(props.modelValue) ? props.modelValue : (props.modelValue ? [props.modelValue] : [])
  return arr.map(v => {
    const opt = (props.field.options || []).find(o => o.value === v)
    if (!opt) return v
    return opt.label?.[props.lang] || opt.label?.de || opt.label?.en || opt.label || v
  })
})
</script>

<style scoped>
.chips {
  display: flex;
  flex-wrap: wrap;
  gap: 0.35rem;
}
.chip {
  background: var(--color-surface-alt);
  border: 1px solid var(--color-border);
  border-radius: 12px;
  padding: 0.15rem 0.6rem;
  font-size: var(--font-size-sm);
  color: var(--color-text);
}
</style>
