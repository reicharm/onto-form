<template>
  <div class="export-overlay" @click.self="$emit('close')">
    <div class="export-panel">
      <div class="export-header">
        <h2>Export</h2>
        <button class="close-btn" @click="$emit('close')">✕</button>
      </div>

      <div class="export-tabs">
        <button :class="{ active: activeTab === 'jsonld' }" @click="activeTab = 'jsonld'">JSON-LD</button>
        <button :class="{ active: activeTab === 'turtle' }" @click="activeTab = 'turtle'">Turtle</button>
        <button :class="{ active: activeTab === 'rdfxml' }" @click="activeTab = 'rdfxml'">RDF/XML</button>
      </div>

      <div class="export-content">
        <pre v-if="activeTab === 'jsonld'">{{ jsonld }}</pre>
        <pre v-else-if="activeTab === 'turtle'">{{ turtle }}</pre>
        <pre v-else>{{ rdfxml }}</pre>
      </div>

      <div class="export-actions">
        <button class="btn-copy" @click="copy">{{ copied ? 'Copied!' : 'Copy to clipboard' }}</button>
        <button class="btn-download" @click="download">Download</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { RDFExporter } from '../services/RDFExporter.js'

const props = defineProps({
  formData: Object,
  standard: String,
  lang: String
})
defineEmits(['close'])

const activeTab = ref('jsonld')
const copied = ref(false)
const exporter = new RDFExporter()

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
  const extMap = { jsonld: 'jsonld', turtle: 'ttl', rdfxml: 'rdf' }
  const mimeMap = { jsonld: 'application/ld+json', turtle: 'text/turtle', rdfxml: 'application/rdf+xml' }
  const ext = extMap[activeTab.value] || 'rdf'
  const mime = mimeMap[activeTab.value] || 'application/rdf+xml'
  const blob = new Blob([currentContent.value], { type: mime })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
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

.export-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 1.5rem;
  border-bottom: 1px solid #eee;
}

.export-header h2 { font-size: var(--font-size-heading); color: var(--color-primary); }

.close-btn {
  background: none; border: none; font-size: 1.2rem;
  cursor: pointer; color: var(--color-text-subtle); line-height: 1;
}

.export-tabs { display: flex; padding: 0 1.5rem; border-bottom: 1px solid #eee; }
.export-tabs button {
  background: none; border: none; border-bottom: 3px solid transparent;
  padding: 0.7rem 1rem; cursor: pointer; font-size: 0.9rem; color: var(--color-text-muted);
  margin-bottom: -1px;
}
.export-tabs button.active { border-bottom-color: var(--color-primary); color: var(--color-primary); font-weight: 600; }

.export-content { flex: 1; overflow: auto; padding: 1rem 1.5rem; }
pre {
  background: #f8f9fa;
  border: 1px solid #e9ecef;
  border-radius: var(--radius-sm);
  padding: 1rem;
  font-size: 0.82rem;
  line-height: 1.5;
  white-space: pre-wrap;
  word-break: break-word;
}

.export-actions {
  display: flex; gap: 0.5rem; justify-content: flex-end;
  padding: 1rem 1.5rem;
  border-top: 1px solid #eee;
}

.btn-copy, .btn-download {
  padding: 0.5rem 1rem; border-radius: var(--radius-sm); cursor: pointer; font-size: 0.9rem; border: none;
}
.btn-copy { background: var(--color-primary-bg); color: var(--color-primary); }
.btn-download { background: var(--color-primary); color: white; }
</style>
