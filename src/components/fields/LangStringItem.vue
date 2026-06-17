<template>
  <div class="langstring-item">
    <select class="lang-select" :value="modelValue.lang || 'de'" @change="updateLang($event.target.value)">
      <option v-for="l in availableLangs" :key="l" :value="l">{{ l }}</option>
    </select>
    <input
      type="text"
      :value="modelValue.value || ''"
      :placeholder="placeholder"
      @input="updateValue($event.target.value)"
    />
  </div>
</template>

<script setup>
const props = defineProps({
  modelValue: { type: Object, default: () => ({ value: '', lang: 'de' }) },
  lang: String,
  placeholder: { type: String, default: '' }
})
const emit = defineEmits(['update:modelValue'])

const availableLangs = ['de', 'en', 'fr', 'it', 'es', 'nl', 'pl', 'cs', 'sk', 'hr']

function updateLang(l) {
  emit('update:modelValue', { ...props.modelValue, lang: l })
}
function updateValue(v) {
  emit('update:modelValue', { ...props.modelValue, value: v })
}
</script>

<style scoped>
.langstring-item {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  flex: 1;
}
.lang-select {
  width: 3.5rem;
  padding: 0.4rem 0.3rem;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
  font-size: 0.8rem;
  background: var(--color-surface);
  cursor: pointer;
}
.lang-select:focus { outline: none; border-color: var(--color-primary); }
input {
  flex: 1;
  padding: 0.5rem 0.75rem;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
  font-size: var(--font-size-base);
}
input:focus { outline: none; border-color: var(--color-primary); box-shadow: var(--focus-ring); }
</style>
