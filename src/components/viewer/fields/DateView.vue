<template>
  <span class="date-view">{{ formatted }}</span>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  field: { type: Object, required: true },
  modelValue: { required: true },
  lang: { type: String, required: true },
})

const formatted = computed(() => {
  if (!props.modelValue) return ''
  try {
    const d = new Date(props.modelValue)
    if (isNaN(d.getTime())) return props.modelValue
    const locale = props.lang === 'de' ? 'de-AT' : 'en-GB'
    return d.toLocaleDateString(locale, { year: 'numeric', month: 'long', day: 'numeric' })
  } catch {
    return props.modelValue
  }
})
</script>

<style scoped>
.date-view {
  color: var(--color-text);
  font-variant-numeric: tabular-nums;
}
</style>
