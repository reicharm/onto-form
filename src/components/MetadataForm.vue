<template>
  <div class="metadata-form">
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
            future: idx > currentStep || currentStep >= visibleGroups.length
          }"
        >
          <div class="step-connector left" v-if="idx > 0" :class="{ done: idx <= currentStep }"></div>
          <div class="step-circle" @click="jumpToStep(idx)">{{ idx + 1 }}</div>
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
          <div class="step-label">{{ lang === 'de' ? 'Übersicht' : 'Summary' }}</div>
        </div>
      </div>

      <!-- Per-Step View -->
      <template v-if="currentStep < visibleGroups.length">
        <div class="form-group">
          <h2 class="group-title">{{ currentGroup.label[lang] || currentGroup.label.en }}</h2>
          <div class="group-fields">
            <template v-for="field in groupFields(currentGroup)" :key="field.id">
              <div class="field-wrapper" :class="{ 'has-error': showStepErrors && fieldErrors[field.id]?.length }">
                <RepeatableField
                  v-if="field.multiple && field.type !== 'multiselect'"
                  :field="field"
                  :lang="lang"
                  :modelValue="displayValue(field)"
                  @update:modelValue="updateField(field, $event)"
                />
                <component
                  v-else
                  :is="fieldComponent(field)"
                  :field="field"
                  :lang="lang"
                  :modelValue="displayValue(field)"
                  @update:modelValue="updateField(field, $event)"
                />
                <div v-if="field.transform && displayValue(field)" class="transform-preview">
                  {{ lang === 'de' ? 'Gespeichert als:' : 'Stored as:' }}
                  <code>{{ encodedPreview(field, displayValue(field)) || modelValue[field.id] }}</code>
                </div>
                <ul v-if="showStepErrors && fieldErrors[field.id]?.length" class="field-errors">
                  <li v-for="err in fieldErrors[field.id]" :key="err">{{ err }}</li>
                </ul>
              </div>
            </template>
          </div>
        </div>

        <!-- Navigation -->
        <div class="wizard-nav">
          <button v-if="currentStep > 0" class="btn-back" @click="prevStep">
            {{ lang === 'de' ? 'Zurück' : 'Back' }}
          </button>
          <span v-else></span>
          <button class="btn-export" @click="nextStep">
            {{ currentStep < visibleGroups.length - 1
              ? (lang === 'de' ? 'Weiter' : 'Next')
              : (lang === 'de' ? 'Zur Übersicht' : 'Summary') }}
          </button>
        </div>
      </template>

      <!-- Summary View -->
      <template v-else>
        <div class="summary-view">
          <div v-for="(group, idx) in visibleGroups" :key="group.id" class="form-group summary-group">
            <div class="summary-group-header">
              <h2 class="group-title">{{ group.label[lang] || group.label.en }}</h2>
              <button class="btn-edit" @click="jumpToStep(idx)">
                {{ lang === 'de' ? 'Bearbeiten' : 'Edit' }}
              </button>
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
              <span v-else class="no-data">{{ lang === 'de' ? 'Keine Angaben' : 'No data' }}</span>
            </div>
          </div>
        </div>

        <!-- Export actions in summary -->
        <div class="form-actions">
          <span v-if="!isValid" class="validation-hint">
            {{ lang === 'de' ? 'Bitte alle Fehler beheben.' : 'Please fix all errors.' }}
          </span>
          <button
            class="btn-export"
            :disabled="!isValid"
            :class="{ disabled: !isValid }"
            @click="isValid && $emit('export')"
          >Export JSON-LD / Turtle</button>
        </div>

        <!-- Back navigation -->
        <div class="wizard-nav">
          <button class="btn-back" @click="prevStep">
            {{ lang === 'de' ? 'Zurück' : 'Back' }}
          </button>
          <span></span>
        </div>
      </template>
    </template>

    <!-- SINGLE PAGE MODE -->
    <template v-else>
      <div v-for="group in visibleGroups" :key="group.id" class="form-group">
        <h2 class="group-title">{{ group.label[lang] || group.label.en }}</h2>
        <div class="group-fields">
          <template v-for="field in groupFields(group)" :key="field.id">
            <div class="field-wrapper" :class="{ 'has-error': fieldErrors[field.id]?.length }">
              <RepeatableField
                v-if="field.multiple && field.type !== 'multiselect'"
                :field="field"
                :lang="lang"
                :modelValue="displayValue(field)"
                @update:modelValue="updateField(field, $event)"
              />
              <component
                v-else
                :is="fieldComponent(field)"
                :field="field"
                :lang="lang"
                :modelValue="displayValue(field)"
                @update:modelValue="updateField(field, $event)"
              />
              <div v-if="field.transform && displayValue(field)" class="transform-preview">
                {{ lang === 'de' ? 'Gespeichert als:' : 'Stored as:' }}
                <code>{{ encodedPreview(field, displayValue(field)) || modelValue[field.id] }}</code>
              </div>
              <ul v-if="fieldErrors[field.id]?.length" class="field-errors">
                <li v-for="err in fieldErrors[field.id]" :key="err">{{ err }}</li>
              </ul>
            </div>
          </template>
        </div>
      </div>

      <div class="form-actions">
        <span v-if="!isValid" class="validation-hint">
          {{ lang === 'de' ? 'Bitte alle Fehler beheben.' : 'Please fix all errors.' }}
        </span>
        <button
          class="btn-export"
          :disabled="!isValid"
          :class="{ disabled: !isValid }"
          @click="isValid && $emit('export')"
        >Export JSON-LD / Turtle</button>
      </div>
    </template>
  </div>
</template>

<script setup>
import { computed, ref, watch } from 'vue'
import TextField from './fields/TextField.vue'
import TextareaField from './fields/TextareaField.vue'
import SelectField from './fields/SelectField.vue'
import DateField from './fields/DateField.vue'
import URIField from './fields/URIField.vue'
import LangStringField from './fields/LangStringField.vue'
import ObjectField from './fields/ObjectField.vue'
import RepeatableField from './fields/RepeatableField.vue'
import MultiSelectField from './fields/MultiSelectField.vue'
import { validateForm } from '../composables/useValidation.js'
import { applyDisplay, applyEncode } from '../config/fieldTransforms.js'

const props = defineProps({
  config: Object,
  lang: String,
  modelValue: Object,
  wizard: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['update:modelValue', 'export'])

const componentMap = {
  textarea: TextareaField,
  select: SelectField,
  date: DateField,
  uri: URIField,
  langstring: LangStringField,
  text: TextField,
  object: ObjectField,
  multiselect: MultiSelectField
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
    .filter(f => f && f.visible !== false)
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

const isValid = computed(() => Object.keys(fieldErrors.value).length === 0)

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
    return `<a href="${val}" target="_blank" rel="noopener">${val}</a>`
  }

  if (field.type === 'date') {
    return String(val)
  }

  if (field.type === 'object' && typeof val === 'object' && field.subFields) {
    return field.subFields
      .filter(sf => val[sf.id])
      .map(sf => {
        const sfLabel = sf.label?.[props.lang] || sf.label?.de || sf.id
        return `<span class="sub-field"><b>${sfLabel}:</b> ${val[sf.id]}</span>`
      })
      .join('<br>')
  }

  return String(val)
}
</script>

<style scoped>
.metadata-form { display: flex; flex-direction: column; gap: 2rem; }

.form-group {
  background: white;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
  padding: 1.5rem;
}

.group-title {
  font-size: 1.1rem;
  font-weight: 600;
  color: #2c5f8a;
  margin-bottom: 1.2rem;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid #e8f0f7;
}

.group-fields { display: flex; flex-direction: column; gap: 1rem; }

.field-wrapper { display: flex; flex-direction: column; gap: 0.2rem; }

.field-wrapper.has-error :deep(input),
.field-wrapper.has-error :deep(textarea),
.field-wrapper.has-error :deep(select) {
  border-color: #c0392b !important;
}

.field-wrapper.has-error :deep(.uri-input),
.field-wrapper.has-error :deep(.object-fieldset) {
  border-color: #c0392b !important;
}

.field-errors {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 0.15rem;
}

.field-errors li {
  font-size: 0.78rem;
  color: #c0392b;
  padding-left: 0.1rem;
}

.field-errors li::before { content: '⚠ '; }

.form-actions {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 1rem;
  padding: 0.5rem 0;
}

.validation-hint {
  font-size: 0.85rem;
  color: #c0392b;
}

.btn-export {
  background: #2c5f8a;
  color: white;
  border: none;
  padding: 0.7rem 1.5rem;
  border-radius: 6px;
  font-size: 0.95rem;
  cursor: pointer;
  font-weight: 500;
}
.btn-export:hover:not(.disabled) { background: #1e4468; }
.btn-export.disabled {
  background: #a0b4c5;
  cursor: not-allowed;
  opacity: 0.7;
}

/* Step indicator */
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
  font-size: 0.85rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  z-index: 1;
  background: white;
  border: 2px solid #ccc;
  color: #ccc;
}

.step-item.completed .step-circle {
  background: #2c5f8a;
  border-color: #2c5f8a;
  color: white;
}

.step-item.active .step-circle {
  background: white;
  border-color: #2c5f8a;
  color: #2c5f8a;
}

.step-item.future .step-circle {
  background: white;
  border-color: #ccc;
  color: #ccc;
  cursor: default;
}

.step-label {
  font-size: 0.7rem;
  color: #666;
  margin-top: 0.3rem;
  text-align: center;
  max-width: 80px;
  word-wrap: break-word;
}

.step-item.active .step-label { color: #2c5f8a; font-weight: 600; }
.step-item.completed .step-label { color: #2c5f8a; }

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
.step-connector.done { background: #2c5f8a; }

/* Wizard navigation */
.wizard-nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 0;
}

.btn-back {
  background: transparent;
  color: #2c5f8a;
  border: 2px solid #2c5f8a;
  padding: 0.65rem 1.4rem;
  border-radius: 6px;
  font-size: 0.95rem;
  cursor: pointer;
  font-weight: 500;
}
.btn-back:hover { background: #e8f0f7; }

/* Summary */
.summary-view { display: flex; flex-direction: column; gap: 1.5rem; }

.summary-group-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid #e8f0f7;
}

.summary-group-header .group-title {
  margin-bottom: 0;
  padding-bottom: 0;
  border-bottom: none;
}

.btn-edit {
  background: transparent;
  color: #2c5f8a;
  border: 1px solid #2c5f8a;
  padding: 0.3rem 0.8rem;
  border-radius: 4px;
  font-size: 0.82rem;
  cursor: pointer;
}
.btn-edit:hover { background: #e8f0f7; }

.summary-fields { display: flex; flex-direction: column; gap: 0.6rem; }

.summary-field {
  display: grid;
  grid-template-columns: 200px 1fr;
  gap: 0.5rem;
  align-items: baseline;
}

.summary-field-label {
  font-size: 0.85rem;
  font-weight: 600;
  color: #555;
}

.summary-field-value {
  font-size: 0.9rem;
  color: #333;
  word-break: break-word;
}

.summary-field-value :deep(a) {
  color: #2c5f8a;
}

.summary-field-value :deep(.sub-field) {
  display: block;
}

.no-data {
  font-size: 0.85rem;
  color: #999;
  font-style: italic;
}

.transform-preview {
  font-size: 0.78rem;
  color: #555;
  margin-top: 0.15rem;
}

.transform-preview code {
  font-size: 0.78rem;
  background: #f0f4f8;
  padding: 0.05rem 0.3rem;
  border-radius: 3px;
  color: #2c5f8a;
  word-break: break-all;
}
</style>
