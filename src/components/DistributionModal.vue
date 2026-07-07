<template>
  <BaseModal
    :show="show"
    teleport
    refocus-on-show
    heading-id="dist-modal-heading"
    :title="t('dist.modal.title')"
    :close-label="lang === 'de' ? 'Dialog schließen' : 'Close dialog'"
    max-width="680px"
    :focus-selectors="['input, select, textarea, button, [tabindex]:not([tabindex=\'-1\'])']"
    @close="$emit('cancel')"
  >
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

    <template #actions>
      <button class="btn-cancel" @click="$emit('cancel')">
        {{ t('btn.cancel') }}
      </button>
      <button
        class="btn-save"
        :disabled="!draft['dcat:accessURL']"
        :aria-disabled="!draft['dcat:accessURL']"
        @click="save"
      >
        {{ t('btn.save') }}
      </button>
    </template>
  </BaseModal>
</template>

<script setup>
import { ref, watch } from 'vue'
import DistributionForm from './fields/DistributionForm.vue'
import BaseModal from './BaseModal.vue'
import { useTranslations } from '../composables/useTranslations.js'

const { t } = useTranslations()

const props = defineProps({
  modelValue: { type: Object, default: () => ({}) },
  lang: String,
  show: Boolean,
  formatOptions: { type: Array, default: () => [] },
  availabilityOptions: { type: Array, default: () => [] },
  uploadConfig: { type: Object, default: null }
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
.dist-body {
  flex: 1;
  overflow-y: auto;
  padding: 1.25rem 1.5rem;
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
