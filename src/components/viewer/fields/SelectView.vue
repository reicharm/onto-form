<template>
  <span class="select-view">{{ displayLabel }}</span>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  field: { type: Object, required: true },
  modelValue: { required: true },
  lang: { type: String, required: true }
})

const displayLabel = computed(() => {
  const opt = (props.field.options || []).find(o => o.value === props.modelValue)
  if (!opt) return props.modelValue
  return opt.label?.[props.lang] || opt.label?.de || opt.label?.en || opt.label || props.modelValue
})
</script>

<style scoped>
.select-view { word-break: break-word; }
</style>
