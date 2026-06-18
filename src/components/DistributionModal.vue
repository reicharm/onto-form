<template>
  <Teleport to="body">
    <div v-if="show" class="dist-overlay" @click.self="$emit('cancel')">
      <div class="dist-panel">
        <div class="dist-header">
          <h2>{{ lang === 'de' ? 'Distribution bearbeiten' : 'Edit Distribution' }}</h2>
          <button class="close-btn" @click="$emit('cancel')">✕</button>
        </div>

        <div class="dist-body">
          <!-- dcat:accessURL (required) -->
          <div class="field">
            <label class="required">{{ lang === 'de' ? 'Zugangs-URL' : 'Access URL' }}</label>
            <input
              type="url"
              :value="draft['dcat:accessURL'] || ''"
              placeholder="https://…"
              @input="draft['dcat:accessURL'] = $event.target.value"
            />
          </div>

          <!-- dcat:downloadURL -->
          <div class="field">
            <label>{{ lang === 'de' ? 'Download-URL' : 'Download URL' }}</label>
            <input
              type="url"
              :value="draft['dcat:downloadURL'] || ''"
              placeholder="https://…"
              @input="draft['dcat:downloadURL'] = $event.target.value"
            />
          </div>

          <!-- dct:title -->
          <div class="field">
            <label>{{ lang === 'de' ? 'Titel' : 'Title' }}</label>
            <input
              type="text"
              :value="draft['dct:title'] || ''"
              :placeholder="lang === 'de' ? 'Titel der Distribution' : 'Distribution title'"
              @input="draft['dct:title'] = $event.target.value"
            />
          </div>

          <!-- dct:description -->
          <div class="field">
            <label>{{ lang === 'de' ? 'Beschreibung' : 'Description' }}</label>
            <textarea
              :value="draft['dct:description'] || ''"
              :placeholder="lang === 'de' ? 'Beschreibung …' : 'Description …'"
              @input="draft['dct:description'] = $event.target.value"
              rows="3"
            />
          </div>

          <!-- dct:format -->
          <div class="field">
            <label>{{ lang === 'de' ? 'Format' : 'Format' }}</label>
            <select :value="draft['dct:format'] || ''" @change="draft['dct:format'] = $event.target.value">
              <option value="">{{ lang === 'de' ? '— Bitte wählen —' : '— Please select —' }}</option>
              <option v-for="opt in formatOptions" :key="opt.value" :value="opt.value">
                {{ opt.label?.[lang] || opt.label?.en || opt.value }}
              </option>
            </select>
          </div>

          <!-- dcat:mediaType -->
          <div class="field">
            <label>{{ lang === 'de' ? 'Medientyp' : 'Media Type' }}</label>
            <input
              type="text"
              :value="draft['dcat:mediaType'] || ''"
              placeholder="text/csv"
              @input="draft['dcat:mediaType'] = $event.target.value"
            />
          </div>

          <!-- dct:license -->
          <div class="field">
            <label>{{ lang === 'de' ? 'Lizenz' : 'License' }}</label>
            <input
              type="url"
              :value="draft['dct:license'] || ''"
              placeholder="https://creativecommons.org/licenses/by/4.0/"
              @input="draft['dct:license'] = $event.target.value"
            />
          </div>

          <!-- dcatap:availability -->
          <div class="field">
            <label>{{ lang === 'de' ? 'Verfügbarkeit' : 'Availability' }}</label>
            <select :value="draft['dcatap:availability'] || ''" @change="draft['dcatap:availability'] = $event.target.value">
              <option value="">{{ lang === 'de' ? '— Bitte wählen —' : '— Please select —' }}</option>
              <option v-for="opt in availabilityOptions" :key="opt.value" :value="opt.value">
                {{ opt.label?.[lang] || opt.label?.en || opt.value }}
              </option>
            </select>
          </div>

          <!-- dct:issued -->
          <div class="field">
            <label>{{ lang === 'de' ? 'Veröffentlichungsdatum' : 'Issued' }}</label>
            <input
              type="date"
              :value="draft['dct:issued'] || ''"
              @input="draft['dct:issued'] = $event.target.value"
            />
          </div>

          <!-- dct:modified -->
          <div class="field">
            <label>{{ lang === 'de' ? 'Zuletzt geändert' : 'Modified' }}</label>
            <input
              type="date"
              :value="draft['dct:modified'] || ''"
              @input="draft['dct:modified'] = $event.target.value"
            />
          </div>
        </div>

        <div class="dist-actions">
          <button class="btn-cancel" @click="$emit('cancel')">
            {{ lang === 'de' ? 'Abbrechen' : 'Cancel' }}
          </button>
          <button class="btn-save" :disabled="!draft['dcat:accessURL']" @click="save">
            {{ lang === 'de' ? 'Speichern' : 'Save' }}
          </button>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue'

const props = defineProps({
  modelValue: {
    type: Object,
    default: () => ({})
  },
  lang: String,
  show: Boolean
})

const emit = defineEmits(['save', 'cancel'])

const draft = ref({ ...(props.modelValue || {}) })

watch(() => props.modelValue, (val) => {
  draft.value = { ...(val || {}) }
}, { deep: true })

const formatOptions = ref([])

onMounted(async () => {
  try {
    const res = await fetch('/vocabularies/file-format.json')
    if (res.ok) formatOptions.value = await res.json()
  } catch {
    // fallback: empty list
  }
})

const availabilityOptions = [
  { value: 'http://data.europa.eu/r5r/availability/stable', label: { de: 'Stabil', en: 'Stable' } },
  { value: 'http://data.europa.eu/r5r/availability/available', label: { de: 'Verfügbar', en: 'Available' } },
  { value: 'http://data.europa.eu/r5r/availability/experimental', label: { de: 'Experimentell', en: 'Experimental' } },
  { value: 'http://data.europa.eu/r5r/availability/temporary', label: { de: 'Vorübergehend', en: 'Temporary' } }
]

function save() {
  emit('save', { ...draft.value })
}
</script>

<style scoped>
.dist-overlay {
  position: fixed; inset: 0;
  background: rgba(0,0,0,0.5);
  display: flex; align-items: center; justify-content: center;
  z-index: 100;
}

.dist-panel {
  background: var(--color-surface);
  border-radius: var(--radius-lg);
  width: 90%;
  max-width: 640px;
  max-height: 85vh;
  display: flex;
  flex-direction: column;
  box-shadow: 0 20px 60px rgba(0,0,0,0.3);
}

.dist-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 1.5rem;
  border-bottom: 1px solid var(--color-border);
}

.dist-header h2 {
  font-size: var(--font-size-heading);
  color: var(--color-primary);
  margin: 0;
}

.close-btn {
  background: none; border: none; font-size: 1.2rem;
  cursor: pointer; color: var(--color-text-subtle); line-height: 1;
}

.dist-body {
  flex: 1;
  overflow-y: auto;
  padding: 1rem 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
}

.field { display: flex; flex-direction: column; gap: 0.3rem; }

label {
  font-size: var(--font-size-label);
  font-weight: 500;
  color: var(--color-text-muted);
}

label.required::after { content: ' *'; color: var(--color-error); }

input[type="text"],
input[type="url"],
input[type="date"],
textarea,
select {
  padding: 0.5rem 0.75rem;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
  font-size: var(--font-size-base);
  background: var(--color-surface);
  color: var(--color-text);
  transition: border-color 0.2s;
  font-family: inherit;
}

input:focus, textarea:focus, select:focus {
  outline: none;
  border-color: var(--color-primary);
  box-shadow: var(--focus-ring);
}

textarea { resize: vertical; }

select { cursor: pointer; }

.dist-actions {
  display: flex;
  gap: 0.5rem;
  justify-content: flex-end;
  padding: 1rem 1.5rem;
  border-top: 1px solid var(--color-border);
}

.btn-cancel, .btn-save {
  padding: 0.5rem 1.1rem;
  border-radius: var(--radius-sm);
  cursor: pointer;
  font-size: 0.9rem;
  border: none;
}

.btn-cancel {
  background: var(--color-primary-bg);
  color: var(--color-primary);
}

.btn-save {
  background: var(--color-primary);
  color: white;
  font-weight: 500;
}

.btn-save:disabled {
  background: #a0b4c5;
  cursor: not-allowed;
  opacity: 0.7;
}

.btn-save:not(:disabled):hover { background: var(--color-primary-dark); }
</style>
