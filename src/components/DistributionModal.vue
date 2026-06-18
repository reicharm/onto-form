<template>
  <div class="dist-overlay" @click.self="$emit('cancel')">
    <div class="dist-modal">
      <div class="dist-modal-header">
        <h2>{{ isNew ? (lang === 'de' ? 'Neue Distribution' : 'New Distribution') : (lang === 'de' ? 'Distribution bearbeiten' : 'Edit Distribution') }}</h2>
        <button class="close-btn" @click="$emit('cancel')">&#x2715;</button>
      </div>

      <div class="dist-modal-body">
        <!-- Access URL (required) -->
        <div class="dist-field">
          <label class="required">{{ lang === 'de' ? 'Zugriffs-URL' : 'Access URL' }}</label>
          <input
            type="url"
            v-model="local['dcat:accessURL']"
            placeholder="https://example.com/data"
          />
        </div>

        <!-- Download URL -->
        <div class="dist-field">
          <label>{{ lang === 'de' ? 'Download-URL' : 'Download URL' }}</label>
          <input
            type="url"
            v-model="local['dcat:downloadURL']"
            placeholder="https://example.com/data/download"
          />
        </div>

        <!-- Title -->
        <div class="dist-field">
          <label>{{ lang === 'de' ? 'Titel' : 'Title' }}</label>
          <input
            type="text"
            v-model="local['dct:title']"
            :placeholder="lang === 'de' ? 'Titel der Distribution' : 'Distribution title'"
          />
        </div>

        <!-- Description -->
        <div class="dist-field">
          <label>{{ lang === 'de' ? 'Beschreibung' : 'Description' }}</label>
          <textarea
            v-model="local['dct:description']"
            rows="3"
            :placeholder="lang === 'de' ? 'Beschreibung der Distribution …' : 'Description of the distribution …'"
          />
        </div>

        <div class="dist-field-row">
          <!-- Format -->
          <div class="dist-field">
            <label>{{ lang === 'de' ? 'Format' : 'Format' }}</label>
            <select v-model="local['dct:format']">
              <option value="">{{ lang === 'de' ? '— Bitte wählen —' : '— Please select —' }}</option>
              <option v-for="opt in formatOptions" :key="opt.value" :value="opt.value">
                {{ opt.label?.[lang] || opt.label?.en || opt.value }}
              </option>
            </select>
          </div>

          <!-- Media Type -->
          <div class="dist-field">
            <label>{{ lang === 'de' ? 'MIME-Typ' : 'Media Type' }}</label>
            <input
              type="text"
              v-model="local['dcat:mediaType']"
              placeholder="text/csv"
            />
          </div>
        </div>

        <!-- License -->
        <div class="dist-field">
          <label>{{ lang === 'de' ? 'Lizenz-URI' : 'License URI' }}</label>
          <input
            type="url"
            v-model="local['dct:license']"
            placeholder="https://creativecommons.org/licenses/by/4.0/"
          />
        </div>

        <!-- Availability -->
        <div class="dist-field">
          <label>{{ lang === 'de' ? 'Verfügbarkeit' : 'Availability' }}</label>
          <select v-model="local['dcatap:availability']">
            <option value="">{{ lang === 'de' ? '— Bitte wählen —' : '— Please select —' }}</option>
            <option v-for="opt in availabilityOptions" :key="opt.value" :value="opt.value">
              {{ opt.label?.[lang] || opt.label?.en || opt.value }}
            </option>
          </select>
        </div>

        <div class="dist-field-row">
          <!-- Issued -->
          <div class="dist-field">
            <label>{{ lang === 'de' ? 'Veröffentlichungsdatum' : 'Publication Date' }}</label>
            <input type="date" v-model="local['dct:issued']" />
          </div>

          <!-- Modified -->
          <div class="dist-field">
            <label>{{ lang === 'de' ? 'Änderungsdatum' : 'Modification Date' }}</label>
            <input type="date" v-model="local['dct:modified']" />
          </div>
        </div>

        <div v-if="accessURLError" class="dist-error">
          {{ lang === 'de' ? 'Zugriffs-URL ist erforderlich.' : 'Access URL is required.' }}
        </div>
      </div>

      <div class="dist-modal-actions">
        <button class="btn-cancel" @click="$emit('cancel')">
          {{ lang === 'de' ? 'Abbrechen' : 'Cancel' }}
        </button>
        <button class="btn-save" @click="save">
          {{ lang === 'de' ? 'Speichern' : 'Save' }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue'

const props = defineProps({
  lang: { type: String, default: 'en' },
  distribution: { type: Object, default: () => ({}) },
  isNew: { type: Boolean, default: false }
})

const emit = defineEmits(['save', 'cancel'])

const local = reactive({ ...props.distribution })
const accessURLError = ref(false)

const formatOptions = ref([])
const availabilityOptions = ref([])

onMounted(async () => {
  try {
    const fmtRes = await fetch('/vocabularies/file-format.json')
    if (fmtRes.ok) formatOptions.value = await fmtRes.json()
  } catch {}
  try {
    const avRes = await fetch('/vocabularies/availability.json')
    if (avRes.ok) availabilityOptions.value = await avRes.json()
  } catch {}
})

function save() {
  if (!local['dcat:accessURL']) {
    accessURLError.value = true
    return
  }
  accessURLError.value = false
  emit('save', { ...local })
}
</script>

<style scoped>
.dist-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 200;
}

.dist-modal {
  background: var(--color-surface);
  border-radius: var(--radius-lg);
  width: 90%;
  max-width: 680px;
  max-height: 90vh;
  display: flex;
  flex-direction: column;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
}

.dist-modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 1.5rem;
  border-bottom: 1px solid var(--color-border);
}

.dist-modal-header h2 {
  font-size: var(--font-size-heading);
  color: var(--color-primary);
  margin: 0;
}

.close-btn {
  background: none;
  border: none;
  font-size: 1.2rem;
  cursor: pointer;
  color: var(--color-text-subtle);
  line-height: 1;
  padding: 0.2rem;
}

.dist-modal-body {
  flex: 1;
  overflow-y: auto;
  padding: 1.25rem 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
}

.dist-field {
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
  flex: 1;
}

.dist-field-row {
  display: flex;
  gap: 1rem;
}

label {
  font-size: var(--font-size-label);
  font-weight: 500;
  color: var(--color-text-muted);
}

label.required::after {
  content: ' *';
  color: var(--color-error);
}

input[type="text"],
input[type="url"],
input[type="date"],
select,
textarea {
  padding: 0.5rem 0.75rem;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
  font-size: var(--font-size-base);
  background: var(--color-surface);
  font-family: inherit;
  transition: border-color 0.2s;
}

input:focus,
select:focus,
textarea:focus {
  outline: none;
  border-color: var(--color-primary);
  box-shadow: var(--focus-ring);
}

textarea {
  resize: vertical;
}

.dist-error {
  font-size: var(--font-size-sm);
  color: var(--color-error);
  background: var(--color-error-bg);
  border: 1px solid #f5c6cb;
  border-radius: var(--radius-sm);
  padding: 0.4rem 0.75rem;
}

.dist-modal-actions {
  display: flex;
  gap: 0.5rem;
  justify-content: flex-end;
  padding: 1rem 1.5rem;
  border-top: 1px solid var(--color-border);
}

.btn-cancel,
.btn-save {
  padding: 0.5rem 1.1rem;
  border-radius: var(--radius-sm);
  cursor: pointer;
  font-size: var(--font-size-base);
  border: none;
  font-weight: 500;
}

.btn-cancel {
  background: var(--color-primary-bg);
  color: var(--color-primary);
}

.btn-save {
  background: var(--color-primary);
  color: white;
}

.btn-save:hover {
  background: var(--color-primary-dark);
}
</style>
