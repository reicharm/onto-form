<template>
  <div class="app ontoform">
    <header class="app-header">
      <h1>OntoForm</h1>
      <div class="header-controls">
        <StandardSelector :standards="standards" v-model="selectedStandard" />
        <button class="btn-import-header" @click="showImport = true">
          {{ lang === 'de' ? 'Importieren' : 'Import' }}
        </button>
        <button class="btn-mode-toggle" @click="wizardMode = !wizardMode">
          {{ wizardMode
            ? (lang === 'de' ? 'Einzel-Seite' : 'Single page')
            : (lang === 'de' ? 'Schritt-Assistent' : 'Wizard') }}
        </button>
        <button v-if="hasDistributionEditor" class="btn-mode-toggle" @click="toggleDistributionMode">
          {{ distributionMode === 'modal'
            ? (lang === 'de' ? 'Dist.: Inline' : 'Dist.: Inline')
            : (lang === 'de' ? 'Dist.: Modal' : 'Dist.: Modal') }}
        </button>
        <button class="btn-preview-header" @click="showPreview = true" :title="lang === 'de' ? 'Aktuelle Daten als RDF ansehen (Debug)' : 'Preview current data as RDF (debug)'">
          {{ lang === 'de' ? 'Vorschau' : 'Preview' }}
        </button>
        <div class="lang-toggle">
          <button :class="{ active: lang === 'de' }" @click="lang = 'de'">DE</button>
          <button :class="{ active: lang === 'en' }" @click="lang = 'en'">EN</button>
        </div>
      </div>
    </header>

    <div v-if="vocabWarnings.length" class="app-warning" role="status" aria-live="polite">
      <span aria-hidden="true">ℹ</span>
      {{ lang === 'de'
        ? `${vocabWarnings.length} Vokabular(e) konnten nicht geladen werden und wurden übersprungen.`
        : `${vocabWarnings.length} vocabulary source(s) could not be loaded and were skipped.` }}
    </div>

    <div v-if="appError" class="app-error" role="alert">
      <span class="app-error-icon" aria-hidden="true">⚠</span>
      {{ appError }}
      <button class="app-error-retry" @click="loadFormConfig(selectedStandard)">
        {{ lang === 'de' ? 'Erneut versuchen' : 'Retry' }}
      </button>
    </div>

    <main class="app-main">
      <MetadataForm
        v-if="activeConfig"
        :config="activeConfig"
        :lang="lang"
        :wizard="wizardMode"
        :labels="props.labels"
        v-model="formData"
        @export="showExport = true"
      />
      <div v-else-if="!appError" class="loading">
        {{ lang === 'de' ? 'Formular wird geladen…' : 'Loading form configuration…' }}
      </div>
    </main>

    <ExportPanel
      v-if="showExport"
      :formData="formData"
      :standard="selectedStandard"
      :lang="lang"
      @close="showExport = false"
    />

    <ExportPanel
      v-if="showPreview"
      :formData="formData"
      :standard="selectedStandard"
      :lang="lang"
      :preview="true"
      @close="showPreview = false"
    />

    <ImportPanel
      v-if="showImport"
      :config="formConfig"
      :lang="lang"
      @import="onImport"
      @close="showImport = false"
    />
  </div>
</template>

<script>
export const BUILTIN_STANDARDS = [
  { id: 'dcat-ap-at', label: 'DCAT-AP.at' },
  { id: 'geodcat',    label: 'GeoDCAT' },
  { id: 'dcat-ap-3',  label: 'DCAT-AP 3.0' }
]
</script>

<script setup>
import { ref, computed, watch, onMounted, onErrorCaptured } from 'vue'
import StandardSelector from './components/StandardSelector.vue'
import MetadataForm from './components/MetadataForm.vue'
import ExportPanel from './components/ExportPanel.vue'
import ImportPanel from './components/ImportPanel.vue'
import { FormConfigResolver } from './services/FormConfigResolver.js'
import { applyComputes } from './config/fieldComputes.js'
import { applyEncode } from './config/fieldTransforms.js'

const props = defineProps({
  standards: {
    type: Array,
    default: () => BUILTIN_STANDARDS
  },
  initialStandard: {
    type: String,
    default: null   // falls back to first entry in standards
  },
  labels: {
    type: Object,
    default: () => ({})
  }
})

// Expose as local so the template can reference it without props. prefix
const standards = computed(() => props.standards)

const selectedStandard = ref(props.initialStandard ?? props.standards[0]?.id ?? 'dcat-ap-at')
const lang = ref('de')
const formConfig = ref(null)
const formData = ref({})
const showExport = ref(false)
const showImport = ref(false)
const wizardMode = ref(true)
const distributionMode = ref('modal')
const appError = ref(null)
const showPreview = ref(false)

// Inject the active distributionMode back into the config without mutating formConfig
const activeConfig = computed(() => {
  if (!formConfig.value) return null
  const distField = formConfig.value.fields?.['dcat:distribution']
  if (!distField) return formConfig.value
  return {
    ...formConfig.value,
    fields: {
      ...formConfig.value.fields,
      'dcat:distribution': { ...distField, distributionMode: distributionMode.value }
    }
  }
})

function buildDefaultFormData(config) {
  const data = {}
  if (!config?.fields) return data
  for (const [id, field] of Object.entries(config.fields)) {
    if (field.type === 'distribution-editor') {
      data[id] = []
    } else if (field.multiple) {
      // Start repeatable fields with one empty item
      if (field.type === 'langstring') {
        data[id] = [{ value: '', lang: 'de' }]
      } else {
        data[id] = ['']
      }
    } else if (field.defaultValue !== undefined) {
      data[id] = field.defaultValue
    } else if (field.type === 'langstring') {
      data[id] = { de: '', en: '' }
    } else if (field.type === 'multiselect') {
      data[id] = []
    } else if (field.type === 'object') {
      data[id] = {}
    } else {
      // date, text, textarea, uri, select — also hidden fields
      data[id] = ''
    }
  }
  return data
}

const hasDistributionEditor = ref(false)
const vocabWarnings = ref([])

async function loadFormConfig(standard, { preserveData = false } = {}) {
  formConfig.value = null
  appError.value = null
  const resolver = new FormConfigResolver()
  let config
  try {
    config = await resolver.resolve(standard)
  } catch (err) {
    appError.value = lang.value === 'de'
      ? `Konfiguration konnte nicht geladen werden: ${err.message}`
      : `Failed to load configuration: ${err.message}`
    return
  }
  formConfig.value = config
  vocabWarnings.value = config.vocabWarnings || []
  if (!preserveData) {
    wizardMode.value = config?.wizard !== false
    const distField = config?.fields?.['dcat:distribution']
    hasDistributionEditor.value = distField?.type === 'distribution-editor'
    if (distField) distributionMode.value = distField.distributionMode || 'modal'
  } else {
    const distField = config?.fields?.['dcat:distribution']
    hasDistributionEditor.value = distField?.type === 'distribution-editor'
  }
  const defaults = buildDefaultFormData(config)
  if (preserveData) {
    const merged = { ...defaults, ...formData.value }
    // Normalize values whose cardinality changed between profiles
    for (const [id, field] of Object.entries(config.fields || {})) {
      if (field.type === 'distribution-editor') continue
      const val = merged[id]
      if (field.multiple && !Array.isArray(val)) {
        merged[id] = val !== '' && val != null ? [val] : ['']
      } else if (!field.multiple && Array.isArray(val)) {
        merged[id] = val[0] ?? ''
      }
    }
    formData.value = merged
  } else {
    formData.value = defaults
  }
}

function toggleDistributionMode() {
  distributionMode.value = distributionMode.value === 'modal' ? 'inline' : 'modal'
}

// Run compute functions declared in the config whenever formData or lang changes
watch([formData, lang], ([data, l]) => {
  const next = applyComputes(formConfig.value, data, l)
  if (next !== data) formData.value = next
}, { deep: true })

function applyImportTransforms(data, config) {
  if (!config?.fields) return data
  const result = { ...data }
  for (const [id, field] of Object.entries(config.fields)) {
    if (!field.transform || result[id] == null) continue
    if (field.multiple && Array.isArray(result[id])) {
      result[id] = result[id].map(v => applyEncode(field.transform, v, field.transformOptions, v))
    } else {
      result[id] = applyEncode(field.transform, result[id], field.transformOptions, result[id])
    }
  }
  return result
}

function onImport(importedData) {
  const normalized = applyImportTransforms(importedData, formConfig.value)
  formData.value = { ...formData.value, ...normalized }
  showImport.value = false
}

onErrorCaptured((err) => {
  appError.value = lang.value === 'de'
    ? `Ein unerwarteter Fehler ist aufgetreten: ${err.message}`
    : `An unexpected error occurred: ${err.message}`
  return false
})

watch(selectedStandard, (std) => loadFormConfig(std, { preserveData: true }))
onMounted(() => loadFormConfig(selectedStandard.value))
</script>

<style>
* { box-sizing: border-box; margin: 0; padding: 0; }

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  background: #f5f7fa;
  color: var(--color-text);
}

.app { min-height: 100vh; display: flex; flex-direction: column; }

.app-header {
  background: var(--color-primary);
  color: white;
  padding: 1rem 2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
}

.app-header h1 { font-size: 1.4rem; font-weight: 600; }

.header-controls { display: flex; align-items: center; gap: 1.5rem; }

.btn-import-header {
  background: rgba(255,255,255,0.15);
  border: 1px solid rgba(255,255,255,0.4);
  color: white;
  padding: 0.3rem 0.9rem;
  border-radius: var(--radius-sm);
  cursor: pointer;
  font-size: var(--font-size-label);
}
.btn-import-header:hover { background: rgba(255,255,255,0.25); }

.btn-mode-toggle {
  background: rgba(255,255,255,0.15);
  border: 1px solid rgba(255,255,255,0.4);
  color: white;
  padding: 0.3rem 0.9rem;
  border-radius: var(--radius-sm);
  cursor: pointer;
  font-size: var(--font-size-label);
}
.btn-mode-toggle:hover { background: rgba(255,255,255,0.25); }

.lang-toggle { display: flex; border: 1px solid rgba(255,255,255,0.4); border-radius: var(--radius-sm); overflow: hidden; }
.lang-toggle button {
  background: transparent;
  border: none;
  color: rgba(255,255,255,0.7);
  padding: 0.3rem 0.7rem;
  cursor: pointer;
  font-size: var(--font-size-label);
}
.lang-toggle button.active { background: rgba(255,255,255,0.2); color: white; font-weight: 600; }

.app-main { flex: 1; padding: 2rem; max-width: 900px; margin: 0 auto; width: 100%; }

.loading { text-align: center; padding: 2rem; color: var(--color-text-muted); }

.app-error {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  background: #fff3cd;
  border: 1px solid #ffc107;
  color: #7a5800;
  padding: 0.75rem 1.5rem;
  font-size: 0.9rem;
}
.app-error-icon { font-size: 1.1rem; flex-shrink: 0; }
.app-error-retry {
  margin-left: auto;
  background: none;
  border: 1px solid currentColor;
  color: inherit;
  padding: 0.25rem 0.75rem;
  border-radius: var(--radius-sm);
  cursor: pointer;
  font-size: inherit;
}
.app-error-retry:hover { background: rgba(0,0,0,0.07); }
.app-error-retry:focus { box-shadow: var(--focus-ring); outline: none; }

.app-warning {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: #e8f4fd;
  border-bottom: 1px solid #bee3f8;
  color: #2c5282;
  padding: 0.5rem 1.5rem;
  font-size: 0.85rem;
}
</style>
