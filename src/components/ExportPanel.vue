<template>
  <div
    class="export-overlay"
    @click.self="$emit('close')"
    @keydown.esc="$emit('close')"
  >
    <div
      class="export-panel"
      role="dialog"
      aria-modal="true"
      aria-labelledby="export-heading"
      ref="panelEl"
    >
      <div class="export-header">
        <h2 id="export-heading">Export</h2>
        <button
          class="close-btn"
          :aria-label="lang === 'de' ? 'Export schließen' : 'Close export'"
          @click="$emit('close')"
        >✕</button>
      </div>

      <div v-if="preview" class="preview-notice" role="status">
        {{ lang === 'de'
          ? 'Vorschau-Modus: Daten können unvollständig oder ungültig sein.'
          : 'Preview mode: data may be incomplete or invalid.' }}
      </div>

      <div class="export-tabs" role="tablist" :aria-label="lang === 'de' ? 'Exportformat' : 'Export format'">
        <button
          role="tab"
          :aria-selected="activeTab === 'jsonld'"
          aria-controls="export-panel-jsonld"
          :class="{ active: activeTab === 'jsonld' }"
          :tabindex="activeTab === 'jsonld' ? 0 : -1"
          @click="activeTab = 'jsonld'"
        >JSON-LD</button>
        <button
          role="tab"
          :aria-selected="activeTab === 'turtle'"
          aria-controls="export-panel-turtle"
          :class="{ active: activeTab === 'turtle' }"
          :tabindex="activeTab === 'turtle' ? 0 : -1"
          @click="activeTab = 'turtle'"
        >Turtle</button>
        <button
          role="tab"
          :aria-selected="activeTab === 'rdfxml'"
          aria-controls="export-panel-rdfxml"
          :class="{ active: activeTab === 'rdfxml' }"
          :tabindex="activeTab === 'rdfxml' ? 0 : -1"
          @click="activeTab = 'rdfxml'"
        >RDF/XML</button>
      </div>

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

      <div class="export-actions">
        <span role="status" aria-live="polite" class="copy-status">{{ copied ? (lang === 'de' ? 'Kopiert!' : 'Copied!') : '' }}</span>
        <button class="btn-copy" @click="copy">{{ lang === 'de' ? 'In Zwischenablage kopieren' : 'Copy to clipboard' }}</button>
        <button class="btn-download" @click="download">{{ lang === 'de' ? 'Herunterladen' : 'Download' }}</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { RDFExporter } from '../services/RDFExporter.js'
import { useFocusFirstOnShow } from '../composables/useFocusFirstOnShow.js'

const props = defineProps({
  formData: Object,
  standard: String,
  lang: String,
  preview: { type: Boolean, default: false }
})
defineEmits(['close'])

const activeTab = ref('jsonld')
const copied    = ref(false)
const panelEl   = ref(null)
const exporter  = new RDFExporter()

// Focus first tab, not the close button which is the first button in DOM order
useFocusFirstOnShow(panelEl, { selectors: ['[role="tab"]', 'button'] })

const jsonld = computed(() => exporter.toJSONLD(props.formData, props.standard))
const turtle = computed(() => exporter.toTurtle(props.formData, props.standard))
const rdfxml = computed(() => exporter.toRDFXML(props.formData, props.standard))

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
.export-overlay {
  position: fixed; inset: 0;
  background: rgba(0,0,0,0.5);
  display: flex; align-items: center; justify-content: center;
  z-index: 100;
}

.export-panel {
  background: var(--color-surface);
  border-radius: var(--radius-lg);
  width: 90%;
  max-width: 800px;
  max-height: 85vh;
  display: flex;
  flex-direction: column;
  box-shadow: 0 20px 60px rgba(0,0,0,0.3);
}

.preview-notice {
  background: #fff8e1;
  border-bottom: 1px solid #ffe082;
  color: #7a5800;
  padding: 0.5rem 1.25rem;
  font-size: 0.85rem;
}

.export-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 1.5rem;
  border-bottom: 1px solid var(--color-border);
}

.export-header h2 { font-size: var(--font-size-heading); color: var(--color-primary); }

.close-btn {
  background: none; border: none; font-size: 1.2rem;
  cursor: pointer; color: var(--color-text-subtle); line-height: 1;
  padding: 0.2rem 0.4rem; border-radius: var(--radius-sm);
}
.close-btn:hover { color: var(--color-error); }
.close-btn:focus { outline: none; box-shadow: var(--focus-ring); }

.export-tabs { display: flex; padding: 0 1.5rem; border-bottom: 1px solid var(--color-border); }
.export-tabs button {
  background: none; border: none; border-bottom: 3px solid transparent;
  padding: 0.7rem 1rem; cursor: pointer; font-size: 0.9rem; color: var(--color-text-muted);
  margin-bottom: -1px;
}
.export-tabs button.active { border-bottom-color: var(--color-primary); color: var(--color-primary); font-weight: 600; }
.export-tabs button:focus { outline: none; box-shadow: var(--focus-ring); }

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

.export-actions {
  display: flex; gap: 0.5rem; justify-content: flex-end; align-items: center;
  padding: 1rem 1.5rem;
  border-top: 1px solid var(--color-border);
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
