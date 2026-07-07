<template>
  <BaseModal
    heading-id="export-heading"
    title="Export"
    :close-label="lang === 'de' ? 'Export schließen' : 'Close export'"
    max-width="800px"
    :focus-selectors="['[role=\'tab\']', 'button']"
    @close="$emit('close')"
  >
    <template #notice>
      <div v-if="preview" class="preview-notice" role="status">
        {{ lang === 'de'
          ? 'Vorschau-Modus: Daten können unvollständig oder ungültig sein.'
          : 'Preview mode: data may be incomplete or invalid.' }}
      </div>
    </template>

    <template #tabs>
      <TabBar
        v-model="activeTab"
        :aria-label="lang === 'de' ? 'Exportformat' : 'Export format'"
        :tabs="[
          { id: 'jsonld', label: 'JSON-LD', controls: 'export-panel-jsonld' },
          { id: 'turtle', label: 'Turtle', controls: 'export-panel-turtle' },
          { id: 'rdfxml', label: 'RDF/XML', controls: 'export-panel-rdfxml' }
        ]"
      />
    </template>

    <div class="export-content">
      <div
        id="export-panel-jsonld"
        role="tabpanel"
        aria-labelledby="export-tab-jsonld"
        :hidden="activeTab !== 'jsonld'"
      ><pre>{{ jsonld }}</pre></div>
      <div
        id="export-panel-turtle"
        role="tabpanel"
        aria-labelledby="export-tab-turtle"
        :hidden="activeTab !== 'turtle'"
      ><pre>{{ turtle }}</pre></div>
      <div
        id="export-panel-rdfxml"
        role="tabpanel"
        aria-labelledby="export-tab-rdfxml"
        :hidden="activeTab !== 'rdfxml'"
      ><pre>{{ rdfxml }}</pre></div>
    </div>

    <template #actions>
      <span role="status" aria-live="polite" class="copy-status">{{ copied ? t('export.copied') : '' }}</span>
      <button class="btn-copy" @click="copy">{{ t('btn.copy') }}</button>
      <button class="btn-download" @click="download">{{ t('btn.download') }}</button>
    </template>
  </BaseModal>
</template>

<script setup>
import { ref, computed } from 'vue'
import { RDFExporter } from '../services/RDFExporter.js'
import BaseModal from './BaseModal.vue'
import TabBar from './TabBar.vue'
import { useTranslations } from '../composables/useTranslations.js'

const { t } = useTranslations()

const props = defineProps({
  formData: Object,
  standard: String,
  rootClass: { type: String, default: 'dcat:Dataset' },
  lang: String,
  preview: { type: Boolean, default: false }
})
defineEmits(['close'])

const activeTab = ref('jsonld')
const copied    = ref(false)
const exporter  = new RDFExporter()

const jsonld = computed(() => exporter.toJSONLD(props.formData, props.standard, props.rootClass))
const turtle = computed(() => exporter.toTurtle(props.formData, props.standard, props.rootClass))
const rdfxml = computed(() => exporter.toRDFXML(props.formData, props.standard, props.rootClass))

const currentContent = computed(() => {
  if (activeTab.value === 'jsonld') return jsonld.value
  if (activeTab.value === 'turtle') return turtle.value
  return rdfxml.value
})

async function copy() {
  await navigator.clipboard.writeText(currentContent.value)
  copied.value = true
  setTimeout(() => copied.value = false, 2000)
}

function download() {
  const extMap  = { jsonld: 'jsonld', turtle: 'ttl', rdfxml: 'rdf' }
  const mimeMap = { jsonld: 'application/ld+json', turtle: 'text/turtle', rdfxml: 'application/rdf+xml' }
  const ext  = extMap[activeTab.value] || 'rdf'
  const mime = mimeMap[activeTab.value] || 'application/rdf+xml'
  const blob = new Blob([currentContent.value], { type: mime })
  const url  = URL.createObjectURL(blob)
  const a    = document.createElement('a')
  a.href     = url
  a.download = activeTab.value === 'jsonld' ? 'metadata.jsonld' : activeTab.value === 'turtle' ? 'metadata.ttl' : 'metadata.rdf'
  a.click()
  URL.revokeObjectURL(url)
}
</script>

<style scoped>
.preview-notice {
  background: #fff8e1;
  border-bottom: 1px solid #ffe082;
  color: #7a5800;
  padding: 0.5rem 1.25rem;
  font-size: 0.85rem;
}

.export-content { flex: 1; overflow: auto; padding: 1rem 1.5rem; }
pre {
  background: var(--color-surface-alt);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
  padding: 1rem;
  font-size: 0.82rem;
  line-height: 1.5;
  white-space: pre-wrap;
  word-break: break-word;
}

.copy-status {
  margin-right: auto;
  font-size: var(--font-size-sm);
  color: var(--color-text-subtle);
  min-width: 5rem;
}

.btn-copy, .btn-download {
  padding: 0.5rem 1rem; border-radius: var(--radius-sm); cursor: pointer; font-size: 0.9rem; border: none;
}
.btn-copy  { background: var(--color-primary-bg); color: var(--color-primary); }
.btn-download { background: var(--color-primary); color: white; }
.btn-copy:focus, .btn-download:focus { outline: none; box-shadow: var(--focus-ring); }
</style>
