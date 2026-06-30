<template>
  <div class="field">
    <label :class="{ required: field.required }">{{ label }}</label>
    <div class="lang-inputs">
      <div v-for="l in activeLangs" :key="l" class="lang-row" :class="{ 'lang-row--multiline': field.multiline }">
        <span class="lang-tag">{{ l }}</span>
        <textarea
          v-if="field.multiline"
          :value="(modelValue || {})[l] || ''"
          :placeholder="placeholder"
          :rows="field.rows || 4"
          @input="update(l, $event.target.value)"
        />
        <input
          v-else
          type="text"
          :value="(modelValue || {})[l] || ''"
          :placeholder="placeholder"
          @input="update(l, $event.target.value)"
        />
      </div>
    </div>
    <span v-if="field.hint?.[lang]" class="hint">{{ field.hint[lang] }}</span>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  field: Object,
  lang: String,
  modelValue: Object
})
const emit = defineEmits(['update:modelValue'])

// Field config can override the default content languages via field.contentLangs
const activeLangs = computed(() => props.field?.contentLangs?.length ? props.field.contentLangs : ['de', 'en'])
const label = computed(() => props.field.label?.[props.lang] || props.field.label?.en || props.field.id)
const placeholder = computed(() => props.field.placeholder?.[props.lang] || props.field.placeholder?.en || '')

function update(l, val) {
  emit('update:modelValue', { ...(props.modelValue || {}), [l]: val })
}
</script>

<style scoped>
.field { display: flex; flex-direction: column; gap: 0.3rem; }
label { font-size: var(--font-size-label); font-weight: 500; color: var(--color-text-muted); }
label.required::after { content: ' *'; color: var(--color-error); }
.lang-inputs { display: flex; flex-direction: column; gap: 0.4rem; }
.lang-row { display: flex; align-items: center; gap: 0.5rem; }
.lang-tag {
  background: var(--color-primary);
  color: white;
  padding: 0.25rem 0.5rem;
  border-radius: 3px;
  font-size: 0.75rem;
  font-weight: 600;
  min-width: 2rem;
  text-align: center;
}
input, textarea {
  flex: 1;
  padding: 0.5rem 0.75rem;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
  font-size: var(--font-size-base);
  font-family: inherit;
}
input:focus, textarea:focus { outline: none; border-color: var(--color-primary); box-shadow: var(--focus-ring); }
textarea { resize: vertical; }
.lang-row--multiline { align-items: flex-start; }
.hint { font-size: var(--font-size-sm); color: var(--color-text-subtle); }
</style>
