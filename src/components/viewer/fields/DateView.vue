<template>
  <span class="date-view">{{ formatted }}</span>
</template>

<script setup>
import { computed } from 'vue'
import { formatDate } from '../../../utils/formatDate.js'

const props = defineProps({
  field: { type: Object, required: true },
  modelValue: { required: true },
  lang: { type: String, required: true },
})

const formatted = computed(() => formatDate(props.modelValue, props.lang))
</script>

<style scoped>
.date-view {
  color: var(--color-text);
  font-variant-numeric: tabular-nums;
}
</style>
