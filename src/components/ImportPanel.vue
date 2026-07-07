<template>
  <BaseModal
    heading-id="import-heading"
    :title="t('btn.import')"
    :close-label="lang === 'de' ? 'Import schließen' : 'Close import'"
    max-width="700px"
    :focus-selectors="['[role=\'tab\']', 'button']"
    @close="$emit('close')"
  >
    <template #tabs>
      <TabBar
        v-model="activeTab"
        :aria-label="lang === 'de' ? 'Importformat' : 'Import format'"
        :tabs="[
          { id: 'jsonld', label: 'JSON-LD', controls: 'import-panel-jsonld' },
          { id: 'turtle', label: 'Turtle', controls: 'import-panel-turtle' },
          { id: 'rdfxml', label: 'RDF/XML', controls: 'import-panel-rdfxml' }
        ]"
      />
    </template>

    <div class="import-body">
      <div class="file-row">
        <label class="btn-file">
          {{ t('btn.open-file') }}
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

    <template #actions>
      <button class="btn-cancel" @click="$emit('close')">
        {{ t('btn.cancel') }}
      </button>
      <button class="btn-import" :disabled="!text.trim()" @click="doImport">
        {{ t('btn.import') }}
      </button>
    </template>
  </BaseModal>
</template>

<script setup>
import { ref, computed } from 'vue'
import { RDFImporter } from '../services/RDFImporter.js'
import BaseModal from './BaseModal.vue'
import TabBar from './TabBar.vue'
import { useTranslations } from '../composables/useTranslations.js'

const { t } = useTranslations()

const props = defineProps({
  config: Object,
  lang: String
})

const emit = defineEmits(['import', 'close'])

const activeTab = ref('jsonld')
const text      = ref('')
const filename  = ref('')
const error     = ref('')

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
