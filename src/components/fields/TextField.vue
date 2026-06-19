<template>
  <div class="field">
    <label :class="{ required: field.required || field.requiredIf }">
      {{ label }}
    </label>
    <div v-if="field.generate" class="input-with-action">
      <input
        type="text"
        :value="modelValue || ''"
        :placeholder="placeholder"
        @input="$emit('update:modelValue', $event.target.value)"
      />
      <button
        type="button"
        class="btn-generate"
        :title="lang === 'de' ? 'Neuen Identifikator generieren' : 'Generate new identifier'"
        @click="generate"
      >↺</button>
    </div>
    <input
      v-else
      type="text"
      :value="modelValue || ''"
      :placeholder="placeholder"
      @input="$emit('update:modelValue', $event.target.value)"
    />
    <span v-if="field.hint?.[lang]" class="hint">{{ field.hint[lang] }}</span>
    <FieldSuggestions
      v-if="field.remember"
      :fieldId="field.id"
      :lang="lang"
      @select="$emit('update:modelValue', $event)"
    />
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import { generateId } from '../../config/idGenerators.js'
import FieldSuggestions from './FieldSuggestions.vue'

const props = defineProps({
  field: Object,
  lang: String,
  modelValue: [String, Number]
})
const emit = defineEmits(['update:modelValue'])

const label = computed(() => props.field.label?.[props.lang] || props.field.label?.en || props.field.id)
const placeholder = computed(() => props.field.placeholder?.[props.lang] || props.field.placeholder?.en || '')

async function generate() {
  const value = await generateId(props.field.generate, props.field.generateOptions)
  if (value != null) emit('update:modelValue', value)
}

onMounted(() => {
  if (props.field.generate && !props.modelValue) generate()
})
</script>

<style scoped>
.field { display: flex; flex-direction: column; gap: 0.3rem; }
label { font-size: var(--font-size-label); font-weight: 500; color: var(--color-text-muted); }
label.required::after { content: ' *'; color: var(--color-error); }

.input-with-action {
  display: flex;
  gap: 0.4rem;
  align-items: stretch;
}

.input-with-action input {
  flex: 1;
  min-width: 0;
}

input {
  padding: 0.5rem 0.75rem;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
  font-size: var(--font-size-base);
  transition: border-color 0.2s;
}
input:focus { outline: none; border-color: var(--color-primary); box-shadow: var(--focus-ring); }

.btn-generate {
  padding: 0.5rem 0.7rem;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
  background: var(--color-surface-alt, #f5f7fa);
  color: var(--color-primary);
  font-size: 1rem;
  line-height: 1;
  cursor: pointer;
  transition: background 0.15s, border-color 0.15s;
  white-space: nowrap;
  flex-shrink: 0;
}
.btn-generate:hover {
  background: var(--color-primary-bg);
  border-color: var(--color-primary);
}

.hint { font-size: var(--font-size-sm); color: var(--color-text-subtle); }
</style>
