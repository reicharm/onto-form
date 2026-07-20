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
        :field="field"
        :modelValue="draft"
        :lang="lang"
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
        :disabled="!canSave"
        :aria-disabled="!canSave"
        @click="save"
      >
        {{ t('btn.save') }}
      </button>
    </template>
  </BaseModal>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import DistributionForm from './fields/DistributionForm.vue'
import BaseModal from './BaseModal.vue'
import { useTranslations } from '../composables/useTranslations.js'
import { hasValue } from '../composables/useValidation.js'

const { t } = useTranslations()

const props = defineProps({
  field: { type: Object, required: true },
  modelValue: { type: Object, default: () => ({}) },
  lang: String,
  show: Boolean,
  uploadConfig: { type: Object, default: null }
})

const emit = defineEmits(['save', 'cancel'])

const draft = ref({ ...(props.modelValue || {}) })

watch(() => props.modelValue, (val) => {
  draft.value = { ...(val || {}) }
}, { deep: true })

// Save is only blocked by required sub-fields, driven by config —
// same rule the inline form uses (useValidation's required check).
const canSave = computed(() =>
  (props.field.subFields || [])
    .filter(sf => sf.required)
    .every(sf => hasValue(draft.value?.[sf.id], sf))
)

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
