<template>
  <Teleport to="body">
    <div v-if="show" class="dist-overlay" @click.self="$emit('cancel')">
      <div class="dist-panel">
        <div class="dist-header">
          <h2>{{ lang === 'de' ? 'Distribution bearbeiten' : 'Edit Distribution' }}</h2>
          <button class="close-btn" @click="$emit('cancel')">✕</button>
        </div>

        <div class="dist-body">
          <DistributionForm
            :modelValue="draft"
            :lang="lang"
            :formatOptions="formatOptions"
            :availabilityOptions="availabilityOptions"
            @update:modelValue="draft = $event"
          />
        </div>

        <div class="dist-actions">
          <button class="btn-cancel" @click="$emit('cancel')">
            {{ lang === 'de' ? 'Abbrechen' : 'Cancel' }}
          </button>
          <button class="btn-save" :disabled="!draft['dcat:accessURL']" @click="save">
            {{ lang === 'de' ? 'Speichern' : 'Save' }}
          </button>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup>
import { ref, watch } from 'vue'
import DistributionForm from './fields/DistributionForm.vue'

const props = defineProps({
  modelValue: { type: Object, default: () => ({}) },
  lang: String,
  show: Boolean,
  formatOptions: { type: Array, default: () => [] },
  availabilityOptions: { type: Array, default: () => [] }
})

const emit = defineEmits(['save', 'cancel'])

const draft = ref({ ...(props.modelValue || {}) })

watch(() => props.modelValue, (val) => {
  draft.value = { ...(val || {}) }
}, { deep: true })

function save() {
  emit('save', { ...draft.value })
}
</script>

<style scoped>
.dist-overlay {
  position: fixed; inset: 0;
  background: rgba(0,0,0,0.5);
  display: flex; align-items: center; justify-content: center;
  z-index: 100;
}

.dist-panel {
  background: var(--color-surface);
  border-radius: var(--radius-lg);
  width: 90%;
  max-width: 680px;
  max-height: 85vh;
  display: flex;
  flex-direction: column;
  box-shadow: 0 20px 60px rgba(0,0,0,0.3);
}

.dist-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 1.5rem;
  border-bottom: 1px solid var(--color-border);
  flex-shrink: 0;
}

.dist-header h2 {
  font-size: var(--font-size-heading);
  color: var(--color-primary);
  margin: 0;
}

.close-btn {
  background: none; border: none; font-size: 1.2rem;
  cursor: pointer; color: var(--color-text-subtle); line-height: 1;
}
.close-btn:hover { color: var(--color-error); }

.dist-body {
  flex: 1;
  overflow-y: auto;
  padding: 1.25rem 1.5rem;
}

.dist-actions {
  display: flex;
  gap: 0.5rem;
  justify-content: flex-end;
  padding: 1rem 1.5rem;
  border-top: 1px solid var(--color-border);
  flex-shrink: 0;
}

.btn-cancel, .btn-save {
  padding: 0.5rem 1.1rem;
  border-radius: var(--radius-sm);
  cursor: pointer;
  font-size: 0.9rem;
  border: none;
  font-weight: 500;
}

.btn-cancel {
  background: var(--color-primary-bg);
  color: var(--color-primary);
}

.btn-save {
  background: var(--color-primary);
  color: white;
}

.btn-save:disabled {
  background: #a0b4c5;
  cursor: not-allowed;
  opacity: 0.7;
}

.btn-save:not(:disabled):hover { background: var(--color-primary-dark); }
</style>
