<template>
  <div class="import-overlay" @click.self="$emit('close')">
    <div class="import-panel">
      <div class="import-header">
        <h2>{{ lang === 'de' ? 'Importieren' : 'Import' }}</h2>
        <button class="close-btn" @click="$emit('close')">✕</button>
      </div>

      <div class="import-tabs">
        <button :class="{ active: activeTab === 'jsonld' }" @click="activeTab = 'jsonld'">JSON-LD</button>
        <button :class="{ active: activeTab === 'turtle' }" @click="activeTab = 'turtle'">Turtle</button>
      </div>

      <div class="import-body">
        <div class="file-row">
          <label class="btn-file">
            {{ lang === 'de' ? 'Datei öffnen …' : 'Open file …' }}
            <input type="file" :accept="activeTab === 'jsonld' ? '.json,.jsonld' : '.ttl,.turtle'" @change="loadFile" />
          </label>
          <span v-if="filename" class="filename">{{ filename }}</span>
        </div>

        <textarea
          v-model="text"
          class="import-textarea"
          :placeholder="placeholder"
          spellcheck="false"
        />

        <div v-if="error" class="import-error">⚠ {{ error }}</div>
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

const props = defineProps({
  config: Object,
  lang: String
})

const emit = defineEmits(['import', 'close'])

const activeTab = ref('jsonld')
const text = ref('')
const filename = ref('')
const error = ref('')

const placeholder = computed(() =>
  activeTab.value === 'jsonld'
    ? '{\n  "@context": { ... },\n  "@type": "dcat:Dataset",\n  "dct:title": { "de": "...", "en": "..." },\n  ...\n}'
    : '@prefix dct: <http://purl.org/dc/terms/> .\n<https://...> a dcat:Dataset ;\n    dct:title "..."@de .'
)

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
    } else {
      formData = await importer.fromTurtle(text.value, props.config)
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
  border-bottom: 1px solid #eee;
}
.import-header h2 { font-size: var(--font-size-heading); color: var(--color-primary); }

.close-btn {
  background: none; border: none; font-size: 1.2rem;
  cursor: pointer; color: var(--color-text-subtle); line-height: 1;
}

.import-tabs { display: flex; padding: 0 1.5rem; border-bottom: 1px solid #eee; }
.import-tabs button {
  background: none; border: none; border-bottom: 3px solid transparent;
  padding: 0.7rem 1rem; cursor: pointer; font-size: 0.9rem; color: var(--color-text-muted);
  margin-bottom: -1px;
}
.import-tabs button.active { border-bottom-color: var(--color-primary); color: var(--color-primary); font-weight: 600; }

.import-body {
  flex: 1;
  overflow: auto;
  padding: 1rem 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.file-row {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

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
  background: #f8f9fa;
  color: var(--color-text);
  outline: none;
}
.import-textarea:focus { border-color: var(--color-primary); }

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
  border-top: 1px solid #eee;
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
</style>
