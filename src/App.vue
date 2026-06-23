<template>
  <div class="app">
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
        <div class="lang-toggle">
          <button :class="{ active: lang === 'de' }" @click="lang = 'de'">DE</button>
          <button :class="{ active: lang === 'en' }" @click="lang = 'en'">EN</button>
        </div>
      </div>
    </header>

    <main class="app-main">
      <MetadataForm
        v-if="formConfig"
        :config="formConfig"
        :lang="lang"
        :wizard="wizardMode"
        v-model="formData"
        @export="showExport = true"
      />
      <div v-else class="loading">Loading form configuration...</div>
    </main>

    <ExportPanel
      v-if="showExport"
      :formData="formData"
      :standard="selectedStandard"
      :lang="lang"
      @close="showExport = false"
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

<script setup>
import { ref, watch, onMounted } from 'vue'
import StandardSelector from './components/StandardSelector.vue'
import MetadataForm from './components/MetadataForm.vue'
import ExportPanel from './components/ExportPanel.vue'
import ImportPanel from './components/ImportPanel.vue'
import { FormConfigResolver } from './services/FormConfigResolver.js'
import { applyComputes } from './config/fieldComputes.js'

const standards = [
  { id: 'dcat-ap-at', label: 'DCAT-AP.at' },
  { id: 'geodcat', label: 'GeoDCAT' },
  { id: 'dcat-ap-3', label: 'DCAT-AP 3.0' }
]

const selectedStandard = ref('dcat-ap-at')
const lang = ref('de')
const formConfig = ref(null)
const formData = ref({})
const showExport = ref(false)
const showImport = ref(false)
const wizardMode = ref(true)
const distributionMode = ref('modal')

function buildDefaultFormData(config) {
  const data = {}
  if (!config?.fields) return data
  for (const [id, field] of Object.entries(config.fields)) {
    if (field.multiple) {
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

async function loadFormConfig(standard, { preserveData = false } = {}) {
  formConfig.value = null
  const resolver = new FormConfigResolver()
  const config = await resolver.resolve(standard)
  formConfig.value = config
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
  formData.value = preserveData
    ? { ...defaults, ...formData.value }
    : defaults
}

function toggleDistributionMode() {
  distributionMode.value = distributionMode.value === 'modal' ? 'inline' : 'modal'
  if (formConfig.value?.fields?.['dcat:distribution']) {
    formConfig.value.fields['dcat:distribution'].distributionMode = distributionMode.value
  }
}

// Run compute functions declared in the config whenever formData or lang changes
watch([formData, lang], ([data, l]) => {
  const next = applyComputes(formConfig.value, data, l)
  if (next !== data) formData.value = next
}, { deep: true })

function onImport(importedData) {
  // Merge imported values into current formData (keeps defaults for unimported fields)
  formData.value = { ...formData.value, ...importedData }
  showImport.value = false
}

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
</style>
