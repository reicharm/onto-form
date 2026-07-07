<template>
  <div class="metadata-form ontoform" :class="config?.cssClass">
    <!-- WIZARD MODE -->
    <template v-if="wizard">
      <!-- Step Indicator -->
      <div class="step-indicator">
        <div
          v-for="(group, idx) in visibleGroups"
          :key="group.id"
          class="step-item"
          :class="{
            completed: idx < currentStep,
            active: idx === currentStep && currentStep < visibleGroups.length,
            future: idx > currentStep || currentStep >= visibleGroups.length,
            'has-error': currentStep >= visibleGroups.length && groupHasErrors(group)
          }"
        >
          <div class="step-connector left" v-if="idx > 0" :class="{ done: idx <= currentStep }"></div>
          <button
            class="step-circle"
            :aria-label="(lang === 'de' ? 'Schritt ' : 'Step ') + (idx + 1) + ': ' + (group.label[lang] || group.label.en)"
            :aria-current="idx === currentStep ? 'step' : undefined"
            @click="jumpToStep(idx)"
          >{{ idx + 1 }}</button>
          <div class="step-label">{{ group.label[lang] || group.label.en }}</div>
          <div class="step-connector right" v-if="idx < visibleGroups.length - 1" :class="{ done: idx < currentStep }"></div>
        </div>
        <!-- Summary step -->
        <div
          class="step-item"
          :class="{
            active: currentStep === visibleGroups.length,
            future: currentStep < visibleGroups.length
          }"
        >
          <div class="step-connector left" :class="{ done: currentStep >= visibleGroups.length }"></div>
          <div class="step-circle">&#10003;</div>
          <div class="step-label">{{ t('wizard.summary') }}</div>
        </div>
      </div>

      <!-- Progress bar (optional, enabled via config.showProgress) -->
      <div v-if="config?.showProgress" class="progress-bar-wrap">
        <div
          class="progress-bar-track"
          role="progressbar"
          :aria-valuenow="progressPct"
          aria-valuemin="0"
          aria-valuemax="100"
          :aria-label="(lang === 'de' ? 'Fortschritt: ' : 'Progress: ') + progressFilled + ' / ' + progressTotal"
        >
          <div class="progress-bar-fill" :style="{ width: progressPct + '%' }"></div>
        </div>
        <span class="progress-label" aria-hidden="true">{{ progressFilled }}&thinsp;/&thinsp;{{ progressTotal }}</span>
      </div>

      <!-- Per-Step View -->
      <template v-if="currentStep < visibleGroups.length">
        <div class="form-group" :class="currentGroup.cssClass">
          <h2 class="group-title">{{ currentGroup.label[lang] || currentGroup.label.en }}</h2>
          <FieldGroup
            :fields="groupFields(currentGroup)"
            :lang="lang"
            :modelValue="modelValue"
            :fieldErrors="fieldErrors"
            :showErrors="showStepErrors"
            :fieldComponent="fieldComponent"
            @update:modelValue="$emit('update:modelValue', $event)"
          />
        </div>

        <!-- Navigation -->
        <div class="wizard-nav">
          <button v-if="currentStep > 0" class="btn-back" @click="prevStep">
            {{ t('wizard.nav.back') }}
          </button>
          <span v-else></span>
          <button class="btn-export" @click="nextStep">
            {{ currentStep < visibleGroups.length - 1
              ? t('wizard.nav.next')
              : t('wizard.nav.to-summary') }}
          </button>
        </div>
      </template>

      <!-- Summary View -->
      <template v-else>
        <div class="summary-view">
          <div
            v-for="(group, idx) in visibleGroups"
            :key="group.id"
            class="form-group summary-group"
            :class="[{ 'summary-group-has-error': groupHasErrors(group) }, group.cssClass]"
          >
            <div class="summary-group-header">
              <h2 class="group-title">{{ group.label[lang] || group.label.en }}</h2>
              <div class="summary-group-header-right">
                <span v-if="groupHasErrors(group)" class="group-error-badge">
                  {{ t('wizard.summary.error-badge') }}
                </span>
                <button class="btn-edit" @click="jumpToStep(idx)">
                  {{ t('wizard.summary.edit') }}
                </button>
              </div>
            </div>
            <div class="summary-fields">
              <template v-if="groupHasValues(group)">
                <div v-for="field in groupFields(group)" :key="field.id" class="summary-field">
                  <template v-if="fieldHasValue(field)">
                    <span class="summary-field-label">{{ field.label[lang] || field.label.en }}</span>
                    <span class="summary-field-value" v-html="formatValue(field)"></span>
                  </template>
                </div>
              </template>
              <span v-else class="no-data">{{ t('wizard.summary.no-data') }}</span>
            </div>
          </div>
        </div>

        <!-- Export actions in summary -->
        <div class="form-actions">
          <span v-if="!isValid" class="validation-hint">
            {{ t('form.validation-hint') }}
          </span>
          <button
            class="btn-validate"
            type="button"
            :disabled="validating"
            :aria-label="validating
              ? (lang === 'de' ? 'Validierung läuft …' : 'Validating …')
              : label('validateAriaLabel', { de: 'SHACL-Validierung starten', en: 'Run SHACL validation' })"
            @click="runValidation"
          >
            {{ validating ? '…' : label('validate', { de: DEFAULTS.de['btn.validate'], en: DEFAULTS.en['btn.validate'] }) }}
          </button>
          <button
            class="btn-export"
            :disabled="!isValid"
            :class="{ disabled: !isValid }"
            @click="handleExport"
          >{{ label('export', { de: DEFAULTS.de['btn.export'], en: DEFAULTS.en['btn.export'] }) }}</button>
        </div>
        <ValidationReport
          v-if="showReport"
          :violations="shaclViolations"
          :lang="lang"
          @close="showReport = false"
          @navigate="navigateToField"
        />

        <!-- Back navigation -->
        <div class="wizard-nav">
          <button class="btn-back" @click="prevStep">
            {{ t('wizard.nav.back') }}
          </button>
          <span></span>
        </div>
      </template>
    </template>

    <!-- SINGLE PAGE MODE -->
    <template v-else>
      <div v-for="group in visibleGroups" :key="group.id" class="form-group" :class="group.cssClass">
        <h2 class="group-title">{{ group.label[lang] || group.label.en }}</h2>
        <FieldGroup
          :fields="groupFields(group)"
          :lang="lang"
          :modelValue="modelValue"
          :fieldErrors="fieldErrors"
          :showErrors="true"
          :fieldComponent="fieldComponent"
          @update:modelValue="$emit('update:modelValue', $event)"
        />
      </div>

      <div class="form-actions">
        <span v-if="!isValid" class="validation-hint">
          {{ t('form.validation-hint') }}
        </span>
        <button class="btn-validate" type="button" :disabled="validating" @click="runValidation">
          {{ validating ? '…' : label('validate', { de: DEFAULTS.de['btn.validate'], en: DEFAULTS.en['btn.validate'] }) }}
        </button>
        <button
          class="btn-export"
          :disabled="!isValid"
          :class="{ disabled: !isValid }"
          @click="handleExport"
        >{{ label('export', { de: DEFAULTS.de['btn.export'], en: DEFAULTS.en['btn.export'] }) }}</button>
      </div>
      <ValidationReport
        v-if="showReport"
        :violations="shaclViolations"
        :lang="lang"
        @close="showReport = false"
        @navigate="navigateToField"
      />
    </template>
  </div>
</template>

<script setup>
import { computed, ref, watch, nextTick } from 'vue'
import { useTranslations, DEFAULTS } from '../composables/useTranslations.js'
import TextField from './fields/TextField.vue'
import TextareaField from './fields/TextareaField.vue'
import SelectField from './fields/SelectField.vue'
import DateField from './fields/DateField.vue'
import URIField from './fields/URIField.vue'
import LangStringField from './fields/LangStringField.vue'
import ObjectField from './fields/ObjectField.vue'
import RepeatableField from './fields/RepeatableField.vue'
import MultiSelectField from './fields/MultiSelectField.vue'
import FieldGroup from './fields/FieldGroup.vue'
import DistributionEditor from './fields/DistributionEditor.vue'
import MapField from './fields/MapField.vue'
import SearchSelectField from './fields/SearchSelectField.vue'
import ValidationReport from './ValidationReport.vue'
import { assetUrl } from '../config/ontoFormConfig.js'
import { validateForm, hasValue } from '../composables/useValidation.js'
import { applyDisplay, applyEncode } from '../config/fieldTransforms.js'
import { evaluateVisibleIf } from '../config/fieldVisibility.js'
import { suggestionsStore } from '../services/SuggestionsStore.js'
import { SHACLValidationService } from '../services/SHACLValidationService.js'

function escHtml(s) {
  return String(s ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

const props = defineProps({
  config: Object,
  lang: String,
  modelValue: Object,
  wizard: {
    type: Boolean,
    default: false
  },
  labels: {
    type: Object,
    default: () => ({})
  }
})

const emit = defineEmits(['update:modelValue', 'export'])

const { t } = useTranslations()

function label(key, defaults) {
  const override = props.labels?.[key]
  if (!override) return defaults[props.lang] ?? defaults.en ?? defaults.de
  if (typeof override === 'string') return override
  return override[props.lang] ?? override.en ?? override.de ?? defaults[props.lang] ?? defaults.en
}

const componentMap = {
  textarea: TextareaField,
  select: SelectField,
  date: DateField,
  uri: URIField,
  langstring: LangStringField,
  text: TextField,
  object: ObjectField,
  multiselect: MultiSelectField,
  'distribution-editor': DistributionEditor,
  map: MapField,
  searchselect: SearchSelectField,
}

function fieldComponent(field) {
  return componentMap[field.type] || TextField
}

const visibleGroups = computed(() => {
  return (props.config?.groups || []).filter(g => g.visible !== false)
})

function groupFields(group) {
  return (group.fields || [])
    .map(id => props.config.fields[id])
    .filter(f => f && f.visible !== false && evaluateVisibleIf(f.visibleIf, props.modelValue))
    .sort((a, b) => (a.order || 0) - (b.order || 0))
}

// Returns the value to show in the form field (applies display transform if configured)
function displayValue(field) {
  const stored = props.modelValue?.[field.id]
  if (!field.transform) return stored
  return applyDisplay(field.transform, stored, field.transformOptions)
}

// Returns the encoded preview URI (shown as hint below the field)
function encodedPreview(field, currentDisplayValue) {
  if (!field.transform || !currentDisplayValue) return null
  const stored = props.modelValue?.[field.id]
  const encoded = applyEncode(field.transform, currentDisplayValue, field.transformOptions, stored)
  // Only show preview when it differs from what the user typed
  return encoded !== currentDisplayValue ? encoded : null
}

function updateField(field, value) {
  const id = typeof field === 'string' ? field : field.id
  if (typeof field === 'object' && field.transform) {
    const stored = props.modelValue?.[id]
    const encoded = applyEncode(field.transform, value, field.transformOptions, stored)
    emit('update:modelValue', { ...props.modelValue, [id]: encoded })
  } else {
    emit('update:modelValue', { ...props.modelValue, [id]: value })
  }
}

const fieldErrors = computed(() => validateForm(props.config, props.modelValue, props.lang))

// ── Progress ──────────────────────────────────────────────────────────────
// Counts visible, non-hidden fields across all groups: how many have a value.
const progressStats = computed(() => {
  let filled = 0, total = 0
  for (const group of visibleGroups.value) {
    for (const field of groupFields(group)) {
      total++
      if (hasValue(props.modelValue?.[field.id], field)) filled++
    }
  }
  return { filled, total }
})
const progressFilled = computed(() => progressStats.value.filled)
const progressTotal  = computed(() => progressStats.value.total)
const progressPct    = computed(() =>
  progressTotal.value ? Math.round(progressFilled.value / progressTotal.value * 100) : 0
)

const isValid = computed(() => Object.keys(fieldErrors.value).length === 0)

// ── SHACL validation report ───────────────────────────────────────────────
const shaclViolations = ref([])
const showReport      = ref(false)
const validating      = ref(false)

async function runValidation() {
  const standard = props.config?.standard
  if (!standard) return
  validating.value = true
  try {
    const ttl = await fetch(assetUrl(`shacl/${standard}.ttl`)).then(r => r.text())
    const svc = new SHACLValidationService()
    const result = await svc.validate(ttl, props.modelValue, props.config)
    shaclViolations.value = result.violations
    showReport.value = true
  } finally {
    validating.value = false
  }
}

async function navigateToField({ fieldId, groupId }) {
  // In wizard mode: jump to the group step first
  if (props.wizard) {
    const idx = visibleGroups.value.findIndex(g => g.id === groupId)
    if (idx >= 0) jumpToStep(idx)
  }
  await nextTick()
  const safeId = typeof CSS !== 'undefined' && CSS.escape ? CSS.escape(fieldId) : fieldId.replace(/[^\w-]/g, '_')
  const el = document.getElementById(`field-${safeId}`)
  el?.scrollIntoView({ behavior: 'smooth', block: 'center' })
  el?.querySelector('input,textarea,select')?.focus()
}

function handleExport() {
  if (!isValid.value) return
  // Save values of all "remember" fields before exporting
  const fields = props.config?.fields || {}
  for (const [id, field] of Object.entries(fields)) {
    if (field.remember && props.modelValue?.[id] != null) {
      suggestionsStore.save(id, props.modelValue[id])
    }
  }
  emit('export')
}

// Wizard state
const currentStep = ref(0)
const showStepErrors = ref(false)

watch(() => props.config, () => {
  currentStep.value = 0
  showStepErrors.value = false
})

const currentGroup = computed(() => visibleGroups.value[currentStep.value])

function groupFieldErrors(group) {
  const fields = groupFields(group)
  const result = {}
  for (const f of fields) {
    if (fieldErrors.value[f.id]) result[f.id] = fieldErrors.value[f.id]
  }
  return result
}

function groupHasErrors(group) {
  return Object.keys(groupFieldErrors(group)).length > 0
}

const currentStepHasErrors = computed(() => {
  if (!currentGroup.value) return false
  return Object.keys(groupFieldErrors(currentGroup.value)).length > 0
})

function nextStep() {
  if (currentStepHasErrors.value) {
    showStepErrors.value = true
    return
  }
  showStepErrors.value = false
  currentStep.value++
}

function prevStep() {
  showStepErrors.value = false
  if (currentStep.value > 0) currentStep.value--
}

function jumpToStep(idx) {
  showStepErrors.value = false
  currentStep.value = idx
}

// Summary helpers
function fieldHasValue(field) {
  const val = props.modelValue?.[field.id]
  if (val == null || val === '') return false
  if (Array.isArray(val)) {
    return val.some(item => {
      if (!item) return false
      if (typeof item === 'object') return Object.values(item).some(v => v)
      return true
    })
  }
  if (typeof val === 'object') return Object.values(val).some(v => v)
  return true
}

function groupHasValues(group) {
  return groupFields(group).some(f => fieldHasValue(f))
}

function formatValue(field) {
  const val = props.modelValue?.[field.id]
  if (val == null) return ''

  if (field.type === 'langstring') {
    if (field.multiple && Array.isArray(val)) {
      return val
        .filter(item => item && item.value)
        .map(item => `${item.value} (${item.lang || '?'})`)
        .join(', ')
    } else if (typeof val === 'object') {
      return Object.entries(val)
        .filter(([, v]) => v)
        .map(([k, v]) => `${k.toUpperCase()}: ${v}`)
        .join(', ')
    }
    return String(val)
  }

  if (field.type === 'multiselect' && Array.isArray(val)) {
    return val.map(v => {
      const opt = (field.options || []).find(o => o.value === v)
      return opt ? (opt.label?.[props.lang] || opt.label?.en || opt.label || v) : v
    }).join(', ')
  }

  if (field.type === 'select') {
    const opt = (field.options || []).find(o => o.value === val)
    return opt ? (opt.label?.[props.lang] || opt.label?.en || opt.label || val) : val
  }

  if (field.type === 'uri') {
    if (!val) return ''
    const safeVal = escHtml(val)
    return `<a href="${safeVal}" target="_blank" rel="noopener">${safeVal}</a>`
  }

  if (field.type === 'date') {
    return String(val)
  }

  if (field.type === 'object' && typeof val === 'object' && field.subFields) {
    const parts = field.subFields
      .filter(sf => val[sf.id] && sf.type !== 'map')
      .map(sf => {
        const sfLabel = escHtml(sf.label?.[props.lang] || sf.label?.de || sf.id)
        return `<span class="sub-field"><b>${sfLabel}:</b> ${escHtml(val[sf.id])}</span>`
      })
    const mapParts = field.subFields
      .filter(sf => val[sf.id] && sf.type === 'map')
      .map(sf => {
        const sfLabel = escHtml(sf.label?.[props.lang] || sf.label?.de || sf.id)
        return `<span class="sub-field"><b>${sfLabel}:</b> <code style="font-size:0.75em">${escHtml(val[sf.id])}</code></span>`
      })
    return [...parts, ...mapParts].join('<br>') || ''
  }

  if (field.type === 'map') {
    if (!val) return ''
    return `<code style="font-size:0.75em">${escHtml(val)}</code>`
  }

  if (field.type === 'distribution-editor' && Array.isArray(val)) {
    if (!val.length) return ''
    return val
      .filter(d => d && d['dcat:accessURL'])
      .map((d, i) => {
        const title = escHtml(d['dct:title'] || d['dcat:accessURL'])
        const url = escHtml(d['dcat:accessURL'])
        return `<span class="sub-field"><b>${i + 1}.</b> <a href="${url}" target="_blank" rel="noopener">${title}</a></span>`
      })
      .join('<br>') || `${val.length} Distribution(s)`
  }

  return String(val)
}
</script>

<style scoped>
.metadata-form { display: flex; flex-direction: column; gap: 2rem; }

.form-group {
  background: var(--color-surface);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-card);
  padding: 1.5rem;
}

.group-title {
  font-size: var(--font-size-heading);
  font-weight: 600;
  color: var(--color-primary);
  margin-bottom: 1.2rem;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid var(--color-primary-bg);
}


.form-actions {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 1rem;
  padding: 0.5rem 0;
}

.validation-hint {
  font-size: var(--font-size-label);
  color: var(--color-error);
}

.btn-export {
  background: var(--color-primary);
  color: white;
  border: none;
  padding: 0.7rem 1.5rem;
  border-radius: var(--radius-md);
  font-size: var(--font-size-base);
  cursor: pointer;
  font-weight: 500;
}
.btn-export:hover:not(.disabled) { background: var(--color-primary-dark); }
.btn-export.disabled {
  background: #a0b4c5;
  cursor: not-allowed;
  opacity: 0.7;
}

.btn-validate {
  background: var(--color-surface-alt);
  color: var(--color-primary);
  border: 1px solid var(--color-primary);
  padding: 0.7rem 1.2rem;
  border-radius: var(--radius-md);
  font-size: var(--font-size-base);
  cursor: pointer;
  font-weight: 500;
}
.btn-validate:hover:not(:disabled) { background: var(--color-primary-bg); }
.btn-validate:disabled { opacity: 0.6; cursor: not-allowed; }

/* Step indicator */
/* ── Progress bar ── */
.progress-bar-wrap {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  padding: 0.1rem 1.5rem 0.75rem;
}

.progress-bar-track {
  flex: 1;
  height: 6px;
  background: var(--color-border);
  border-radius: 999px;
  overflow: hidden;
}

.progress-bar-fill {
  height: 100%;
  background: var(--color-primary);
  border-radius: 999px;
  transition: width 0.35s ease;
}

.progress-label {
  font-size: var(--font-size-sm);
  color: var(--color-text-subtle);
  white-space: nowrap;
  min-width: 3.5rem;
  text-align: right;
}

.step-indicator {
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding: 1rem 0 0.5rem;
  overflow-x: auto;
}

.step-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  flex: 1;
  min-width: 60px;
}

.step-circle {
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: var(--font-size-label);
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  z-index: 1;
  background: var(--color-surface);
  border: 2px solid #ccc;
  color: #ccc;
  padding: 0;
}
.step-circle:focus { outline: none; box-shadow: var(--focus-ring); }

.step-item.completed .step-circle {
  background: var(--color-primary);
  border-color: var(--color-primary);
  color: white;
}

.step-item.active .step-circle {
  background: var(--color-surface);
  border-color: var(--color-primary);
  color: var(--color-primary);
}

.step-item.future .step-circle {
  background: var(--color-surface);
  border-color: #ccc;
  color: #ccc;
  cursor: default;
}

.step-item.has-error .step-circle {
  border-color: var(--color-error) !important;
  color: var(--color-error) !important;
  background: color-mix(in srgb, var(--color-error) 10%, var(--color-surface)) !important;
}

.step-item.has-error .step-label {
  color: var(--color-error) !important;
}

.step-label {
  font-size: 0.7rem;
  color: var(--color-text-muted);
  margin-top: 0.3rem;
  text-align: center;
  max-width: 80px;
  word-wrap: break-word;
}

.step-item.active .step-label { color: var(--color-primary); font-weight: 600; }
.step-item.completed .step-label { color: var(--color-primary); }

.step-connector {
  position: absolute;
  top: 1rem;
  height: 2px;
  background: #e0e0e0;
  width: 50%;
  z-index: 0;
}
.step-connector.left { left: 0; }
.step-connector.right { right: 0; }
.step-connector.done { background: var(--color-primary); }

/* Wizard navigation */
.wizard-nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 0;
}

.btn-back {
  background: transparent;
  color: var(--color-primary);
  border: 2px solid var(--color-primary);
  padding: 0.65rem 1.4rem;
  border-radius: var(--radius-md);
  font-size: var(--font-size-base);
  cursor: pointer;
  font-weight: 500;
}
.btn-back:hover { background: var(--color-primary-bg); }

/* Summary */
.summary-view { display: flex; flex-direction: column; gap: 1.5rem; }

.summary-group-has-error {
  border-left: 3px solid var(--color-error);
}

.summary-group-has-error .summary-group-header {
  border-bottom-color: var(--color-error);
}

.summary-group-has-error .group-title {
  color: var(--color-error);
}

.summary-group-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid var(--color-primary-bg);
}

.summary-group-header-right {
  display: flex;
  align-items: center;
  gap: 0.6rem;
}

.group-error-badge {
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--color-error);
  background: color-mix(in srgb, var(--color-error) 12%, transparent);
  border: 1px solid color-mix(in srgb, var(--color-error) 30%, transparent);
  padding: 0.2rem 0.55rem;
  border-radius: var(--radius-sm);
  white-space: nowrap;
}

.summary-group-header .group-title {
  margin-bottom: 0;
  padding-bottom: 0;
  border-bottom: none;
}

.btn-edit {
  background: transparent;
  color: var(--color-primary);
  border: 1px solid var(--color-primary);
  padding: 0.3rem 0.8rem;
  border-radius: var(--radius-sm);
  font-size: 0.82rem;
  cursor: pointer;
}
.btn-edit:hover { background: var(--color-primary-bg); }

.summary-fields { display: flex; flex-direction: column; gap: 0.6rem; }

.summary-field {
  display: grid;
  grid-template-columns: 200px 1fr;
  gap: 0.5rem;
  align-items: baseline;
}

.summary-field-label {
  font-size: var(--font-size-label);
  font-weight: 600;
  color: var(--color-text-muted);
}

.summary-field-value {
  font-size: 0.9rem;
  color: var(--color-text);
  word-break: break-word;
}

.summary-field-value :deep(a) {
  color: var(--color-primary);
}

.summary-field-value :deep(.sub-field) {
  display: block;
}

.no-data {
  font-size: var(--font-size-label);
  color: var(--color-text-subtle);
  font-style: italic;
}

</style>
