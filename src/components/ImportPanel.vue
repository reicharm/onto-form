<template>
  <div
    class="import-overlay"
    @click.self="$emit('close')"
    @keydown.esc="$emit('close')"
  >
    <div
      class="import-panel"
      role="dialog"
      aria-modal="true"
      aria-labelledby="import-heading"
      ref="panelEl"
    >
      <div class="import-header">
        <h2 id="import-heading">{{ lang === 'de' ? 'Importieren' : 'Import' }}</h2>
        <button
          class="close-btn"
          :aria-label="lang === 'de' ? 'Import schließen' : 'Close import'"
          @click="$emit('close')"
        >✕</button>
      </div>

      <div class="import-tabs" role="tablist" :aria-label="lang === 'de' ? 'Importformat' : 'Import format'">
        <button
          role="tab"
          :aria-selected="activeTab === 'jsonld'"
          aria-controls="import-panel-jsonld"
          :class="{ active: activeTab === 'jsonld' }"
          :tabindex="activeTab === 'jsonld' ? 0 : -1"
          @click="activeTab = 'jsonld'"
        >JSON-LD</button>
        <button
          role="tab"
          :aria-selected="activeTab === 'turtle'"
          aria-controls="import-panel-turtle"
          :class="{ active: activeTab === 'turtle' }"
          :tabindex="activeTab === 'turtle' ? 0 : -1"
          @click="activeTab = 'turtle'"
        >Turtle</button>
        <button
          role="tab"
          :aria-selected="activeTab === 'rdfxml'"
          aria-controls="import-panel-rdfxml"
          :class="{ active: activeTab === 'rdfxml' }"
          :tabindex="activeTab === 'rdfxml' ? 0 : -1"
          @click="activeTab = 'rdfxml'"
        >RDF/XML</button>
      </div>

      <div class="import-body">
        <div class="file-row">
          <label class="btn-file">
            {{ lang === 'de' ? 'Datei öffnen …' : 'Open file …' }}
            <input
              type="file"
              :accept="activeTab === 'jsonld' ? '.json,.jsonld' : activeTab === 'turtle' ? '.ttl,.turtle' : '.rdf,.xml'"
              :aria-label="lang === 'de' ? 'RDF-Datei auswählen' : 'Select RDF file'"
              @change="loadFile"
            />
          </label>
          <span v-if="filename" class="filename" aria-live="polite">{{ filename }}</span>
        </div>

        <textarea
          v-model="text"
          class="import-textarea"
          :placeholder="placeholder"
          :aria-label="lang === 'de' ? 'RDF-Inhalt zum Importieren' : 'RDF content to import'"
          :aria-describedby="error ? 'import-error' : undefined"
          spellcheck="false"
        />

        <div
          v-if="error"
          id="import-error"
          class="import-error"
          role="alert"
        >⚠ {{ error }}</div>
      </div>

      <div class="import-actions">
        <button class="btn-cancel" @click="$emit('close')">
          {{ lang === 'de' ? 'Abbrechen' : 'Cancel' }}
        </button>
        <button class="btn-import" :disabled="!text.trim()" @click="doImport">
          {{ lang === 'de' ? 'Importieren' : 'Import' }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { RDFImporter } from '../services/RDFImporter.js'
import { useFocusFirstOnShow } from '../composables/useFocusFirstOnShow.js'

const props = defineProps({
  config: Object,
  lang: String
})

const emit = defineEmits(['import', 'close'])

const activeTab = ref('jsonld')
const text      = ref('')
const filename  = ref('')
const error     = ref('')
const panelEl   = ref(null)

useFocusFirstOnShow(panelEl, { selectors: ['[role="tab"]', 'button'] })

const placeholder = computed(() => {
  if (activeTab.value === 'jsonld')
    return '{\n  "@context": { ... },\n  "@type": "dcat:Dataset",\n  "dct:title": { "de": "...", "en": "..." },\n  ...\n}'
  if (activeTab.value === 'turtle')
    return '@prefix dct: <http://purl.org/dc/terms/> .\n<https://...> a dcat:Dataset ;\n    dct:title "..."@de .'
  return '<?xml version="1.0" encoding="UTF-8"?>\n<rdf:RDF xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#"\n         xmlns:dct="http://purl.org/dc/terms/"\n         xmlns:dcat="http://www.w3.org/ns/dcat#">\n  <dcat:Dataset rdf:about="https://...">\n    <dct:title xml:lang="de">...</dct:title>\n  </dcat:Dataset>\n</rdf:RDF>'
})

function loadFile(event) {
  const file = event.target.files[0]
  if (!file) return
  filename.value = file.name
  error.value = ''
  const reader = new FileReader()
  reader.onload = e => { text.value = e.target.result }
  reader.readAsText(file)
  event.target.value = ''
}

async function doImport() {
  error.value = ''
  const importer = new RDFImporter()
  try {
    let formData
    if (activeTab.value === 'jsonld') {
      formData = importer.fromJSONLD(text.value, props.config)
    } else if (activeTab.value === 'turtle') {
      formData = await importer.fromTurtle(text.value, props.config)
    } else {
      formData = importer.fromRDFXML(text.value, props.config)
    }
    emit('import', formData)
  } catch (err) {
    error.value = err.message
  }
}
</script>

<style scoped>
.import-overlay {
  position: fixed; inset: 0;
  background: rgba(0,0,0,0.5);
  display: flex; align-items: center; justify-content: center;
  z-index: 100;
}

.import-panel {
  background: var(--color-surface);
  border-radius: var(--radius-lg);
  width: 90%;
  max-width: 700px;
  max-height: 85vh;
  display: flex;
  flex-direction: column;
  box-shadow: 0 20px 60px rgba(0,0,0,0.3);
}

.import-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 1.5rem;
  border-bottom: 1px solid var(--color-border);
}
.import-header h2 { font-size: var(--font-size-heading); color: var(--color-primary); }

.close-btn {
  background: none; border: none; font-size: 1.2rem;
  cursor: pointer; color: var(--color-text-subtle); line-height: 1;
  padding: 0.2rem 0.4rem; border-radius: var(--radius-sm);
}
.close-btn:hover { color: var(--color-error); }
.close-btn:focus { outline: none; box-shadow: var(--focus-ring); }

.import-tabs { display: flex; padding: 0 1.5rem; border-bottom: 1px solid var(--color-border); }
.import-tabs button {
  background: none; border: none; border-bottom: 3px solid transparent;
  padding: 0.7rem 1rem; cursor: pointer; font-size: 0.9rem; color: var(--color-text-muted);
  margin-bottom: -1px;
}
.import-tabs button.active { border-bottom-color: var(--color-primary); color: var(--color-primary); font-weight: 600; }
.import-tabs button:focus { outline: none; box-shadow: var(--focus-ring); }

.import-body {
  flex: 1;
  overflow: auto;
  padding: 1rem 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.file-row { display: flex; align-items: center; gap: 0.75rem; }

.btn-file {
  display: inline-block;
  padding: 0.4rem 0.9rem;
  background: var(--color-primary-bg);
  color: var(--color-primary);
  border-radius: var(--radius-sm);
  cursor: pointer;
  font-size: var(--font-size-label);
  font-weight: 500;
  white-space: nowrap;
}
.btn-file input { display: none; }
.filename { font-size: 0.82rem; color: var(--color-text-muted); }

.import-textarea {
  flex: 1;
  min-height: 280px;
  resize: vertical;
  font-family: monospace;
  font-size: 0.82rem;
  line-height: 1.5;
  padding: 0.75rem;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
  background: var(--color-surface-alt);
  color: var(--color-text);
  outline: none;
}
.import-textarea:focus { border-color: var(--color-primary); box-shadow: var(--focus-ring); }

.import-error {
  font-size: 0.82rem;
  color: var(--color-error);
  background: #fdf0f0;
  border: 1px solid #f5c6cb;
  border-radius: var(--radius-sm);
  padding: 0.5rem 0.75rem;
}

.import-actions {
  display: flex;
  gap: 0.5rem;
  justify-content: flex-end;
  padding: 1rem 1.5rem;
  border-top: 1px solid var(--color-border);
}

.btn-cancel, .btn-import {
  padding: 0.5rem 1.1rem;
  border-radius: var(--radius-sm);
  cursor: pointer;
  font-size: 0.9rem;
  border: none;
}
.btn-cancel { background: var(--color-primary-bg); color: var(--color-primary); }
.btn-import { background: var(--color-primary); color: white; }
.btn-import:disabled { background: #a0b4c5; cursor: not-allowed; opacity: 0.7; }
.btn-cancel:focus, .btn-import:focus { outline: none; box-shadow: var(--focus-ring); }
</style>
