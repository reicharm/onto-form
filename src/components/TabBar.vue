<template>
  <div class="tab-bar" role="tablist" :aria-label="ariaLabel">
    <button
      v-for="tab in tabs"
      :key="tab.id"
      role="tab"
      :aria-selected="modelValue === tab.id"
      :aria-controls="tab.controls"
      :class="{ active: modelValue === tab.id }"
      :tabindex="modelValue === tab.id ? 0 : -1"
      @click="$emit('update:modelValue', tab.id)"
    >{{ tab.label }}</button>
  </div>
</template>

<script setup>
defineProps({
  tabs: { type: Array, required: true }, // [{ id, label, controls }]
  modelValue: { type: String, required: true },
  ariaLabel: { type: String, default: '' }
})
defineEmits(['update:modelValue'])
</script>

<style scoped>
.tab-bar { display: flex; padding: 0 1.5rem; border-bottom: 1px solid var(--color-border); }
.tab-bar button {
  background: none; border: none; border-bottom: 3px solid transparent;
  padding: 0.7rem 1rem; cursor: pointer; font-size: 0.9rem; color: var(--color-text-muted);
  margin-bottom: -1px;
}
.tab-bar button.active { border-bottom-color: var(--color-primary); color: var(--color-primary); font-weight: 600; }
.tab-bar button:focus { outline: none; box-shadow: var(--focus-ring); }
</style>
