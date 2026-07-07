<template>
  <div class="standard-selector">
    <label>{{ label }}</label>
    <select :value="modelValue" @change="$emit('update:modelValue', $event.target.value)">
      <option v-for="s in standards" :key="s.id" :value="s.id">{{ s.label }}</option>
    </select>
  </div>
</template>

<script setup>
defineProps({
  standards: Array,
  modelValue: String,
  label: { type: String, default: 'Standard:' }
})
defineEmits(['update:modelValue'])
</script>

<style scoped>
.standard-selector { display: flex; align-items: center; gap: 0.5rem; color: white; }
label { font-size: 0.9rem; }
select {
  padding: 0.3rem 0.6rem;
  border-radius: var(--radius-sm);
  border: 1px solid rgba(255,255,255,0.4);
  background: rgba(255,255,255,0.15);
  color: white;
  font-size: 0.9rem;
  cursor: pointer;
}
select option { background: var(--color-primary); }
</style>
