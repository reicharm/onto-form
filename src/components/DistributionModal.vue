<template>
  <Teleport to="body">
    <div
      v-if="show"
      class="dist-overlay"
      @click.self="$emit('cancel')"
      @keydown.esc="$emit('cancel')"
    >
      <div
        class="dist-panel"
        role="dialog"
        aria-modal="true"
        :aria-labelledby="headingId"
        ref="panelEl"
      >
        <div class="dist-header">
          <h2 :id="headingId">{{ lang === 'de' ? 'Distribution bearbeiten' : 'Edit Distribution' }}</h2>
          <button
            class="close-btn"
            :aria-label="lang === 'de' ? 'Dialog schließen' : 'Close dialog'"
            @click="$emit('cancel')"
          >✕</button>
        </div>

        <div class="dist-body">
          <DistributionForm
            :modelValue="draft"
            :lang="lang"
            :formatOptions="formatOptions"
            :availabilityOptions="availabilityOptions"
            :uploadConfig="uploadConfig"
            @update:modelValue="draft = $event"
          />
        </div>

        <div class="dist-actions">
          <button class="btn-cancel" @click="$emit('cancel')">
            {{ lang === 'de' ? 'Abbrechen' : 'Cancel' }}
          </button>
          <button
            class="btn-save"
            :disabled="!draft['dcat:accessURL']"
            :aria-disabled="!draft['dcat:accessURL']"
            @click="save"
          >
            {{ lang === 'de' ? 'Speichern' : 'Save' }}
          </button>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup>
import { ref, watch, toRef } from 'vue'
import DistributionForm from './fields/DistributionForm.vue'
import { useFocusFirstOnShow } from '../composables/useFocusFirstOnShow.js'

const props = defineProps({
  modelValue: { type: Object, default: () => ({}) },
  lang: String,
  show: Boolean,
  formatOptions: { type: Array, default: () => [] },
  availabilityOptions: { type: Array, default: () => [] },
  uploadConfig: { type: Object, default: null }
})

const emit = defineEmits(['save', 'cancel'])

const draft   = ref({ ...(props.modelValue || {}) })
const panelEl = ref(null)
const headingId = 'dist-modal-heading'

watch(() => props.modelValue, (val) => {
  draft.value = { ...(val || {}) }
}, { deep: true })

useFocusFirstOnShow(panelEl, {
  selectors: ['input, select, textarea, button, [tabindex]:not([tabindex="-1"])'],
  show: toRef(props, 'show')
})

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
  padding: 0.2rem 0.4rem;
  border-radius: var(--radius-sm);
}
.close-btn:hover { color: var(--color-error); }
.close-btn:focus { outline: none; box-shadow: var(--focus-ring); }

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
.btn-cancel:focus { outline: none; box-shadow: var(--focus-ring); }

.btn-save {
  background: var(--color-primary);
  color: white;
}
.btn-save:focus { outline: none; box-shadow: var(--focus-ring); }

.btn-save:disabled {
  background: #a0b4c5;
  cursor: not-allowed;
  opacity: 0.7;
}

.btn-save:not(:disabled):hover { background: var(--color-primary-dark); }
</style>
