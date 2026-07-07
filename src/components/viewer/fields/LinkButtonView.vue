<template>
  <div class="link-button-view">
    <template v-if="Array.isArray(modelValue)">
      <a
        v-for="(uri, i) in modelValue.filter(Boolean)"
        :key="i"
        :href="uri"
        target="_blank"
        rel="noopener noreferrer"
        class="link-btn"
      >
        <span v-if="field.buttonIcon" class="btn-icon" aria-hidden="true">{{ field.buttonIcon }}</span>
        {{ buttonLabel(i) }}
      </a>
    </template>
    <a
      v-else-if="modelValue"
      :href="modelValue"
      target="_blank"
      rel="noopener noreferrer"
      class="link-btn"
    >
      <span v-if="field.buttonIcon" class="btn-icon" aria-hidden="true">{{ field.buttonIcon }}</span>
      {{ buttonLabel(0) }}
    </a>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { resolveLangValue } from '../../../utils/resolveLangValue.js'

const props = defineProps({
  field:      { type: Object, required: true },
  modelValue: { required: true },
  lang:       { type: String, required: true },
})

function buttonLabel(index) {
  const labels = props.field.buttonLabel
  if (!labels) return props.field.label?.[props.lang] || props.field.label?.de || props.field.id
  if (Array.isArray(labels)) {
    const entry = labels[index] ?? labels[0]
    return resolveLangValue(entry, props.lang) || resolveLangValue(entry, 'en') || String(entry)
  }
  return resolveLangValue(labels, props.lang) || resolveLangValue(labels, 'en') || String(labels)
}
</script>

<style scoped>
.link-button-view {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.link-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  padding: 0.35rem 0.9rem;
  background: var(--color-primary);
  color: #fff;
  border-radius: var(--radius-sm);
  font-size: var(--font-size-sm);
  font-weight: 500;
  text-decoration: none;
  white-space: nowrap;
  transition: opacity 0.15s;
}

.link-btn:hover {
  opacity: 0.85;
}

.btn-icon {
  font-size: 1em;
  line-height: 1;
}
</style>
