<template>
  <div class="dist-form">

    <!-- ── File upload widget ── -->
    <div v-if="uploadConfig?.enabled" class="field span2 upload-section">
      <label>{{ lang === 'de' ? 'Datei hochladen' : 'Upload file' }}</label>

      <div
        class="drop-zone"
        :class="{ dragging: isDragging, uploading: uploadState === 'uploading', success: uploadState === 'success', error: uploadState === 'error' }"
        @dragover.prevent="isDragging = true"
        @dragleave="isDragging = false"
        @drop.prevent="onDrop"
        @click="fileInput?.click()"
      >
        <input ref="fileInput" type="file" class="hidden-input" @change="onFileChange" />

        <template v-if="uploadState === 'idle'">
          <span class="drop-icon">📂</span>
          <span class="drop-text">
            {{ lang === 'de'
              ? 'Datei hierher ziehen oder klicken zum Auswählen'
              : 'Drag a file here or click to select' }}
          </span>
        </template>

        <template v-else-if="uploadState === 'selected'">
          <span class="drop-icon">📄</span>
          <span class="drop-text">{{ selectedFile?.name }}</span>
          <span class="drop-size">{{ formatFileSize(selectedFile?.size) }}</span>
        </template>

        <template v-else-if="uploadState === 'uploading'">
          <span class="drop-icon spin">⟳</span>
          <span class="drop-text">
            {{ lang === 'de' ? 'Wird hochgeladen …' : 'Uploading …' }}
          </span>
        </template>

        <template v-else-if="uploadState === 'success'">
          <span class="drop-icon">✓</span>
          <span class="drop-text">{{ lang === 'de' ? 'Erfolgreich hochgeladen' : 'Upload successful' }}</span>
          <button type="button" class="btn-reset-upload" @click.stop="resetUpload">
            {{ lang === 'de' ? 'Andere Datei' : 'Choose another' }}
          </button>
        </template>

        <template v-else-if="uploadState === 'error'">
          <span class="drop-icon">⚠</span>
          <span class="drop-text error-text">{{ uploadError }}</span>
          <button type="button" class="btn-reset-upload" @click.stop="resetUpload">
            {{ lang === 'de' ? 'Erneut versuchen' : 'Try again' }}
          </button>
        </template>
      </div>

      <button
        v-if="uploadState === 'selected'"
        type="button"
        class="btn-upload"
        @click="doUpload"
      >
        {{ lang === 'de' ? 'Hochladen' : 'Upload' }}
      </button>
    </div>

    <!-- ── Standard fields ── -->
    <div class="field">
      <label class="required">{{ lang === 'de' ? 'Zugangs-URL' : 'Access URL' }}</label>
      <input type="url" :value="modelValue['dcat:accessURL'] || ''" placeholder="https://…"
        @input="update('dcat:accessURL', $event.target.value)" />
    </div>

    <div class="field">
      <label>{{ lang === 'de' ? 'Download-URL' : 'Download URL' }}</label>
      <input type="url" :value="modelValue['dcat:downloadURL'] || ''" placeholder="https://…"
        @input="update('dcat:downloadURL', $event.target.value)" />
    </div>

    <div class="field span2">
      <label>{{ lang === 'de' ? 'Titel' : 'Title' }}</label>
      <input type="text" :value="modelValue['dct:title'] || ''"
        :placeholder="lang === 'de' ? 'Titel der Distribution' : 'Distribution title'"
        @input="update('dct:title', $event.target.value)" />
    </div>

    <div class="field span2">
      <label>{{ lang === 'de' ? 'Beschreibung' : 'Description' }}</label>
      <textarea :value="modelValue['dct:description'] || ''"
        :placeholder="lang === 'de' ? 'Beschreibung …' : 'Description …'"
        @input="update('dct:description', $event.target.value)" rows="3" />
    </div>

    <div class="field">
      <label>{{ lang === 'de' ? 'Dateiformat' : 'File Format' }}</label>
      <select :value="modelValue['dct:format'] || ''" @change="update('dct:format', $event.target.value)">
        <option value="">{{ lang === 'de' ? '— Bitte wählen —' : '— Please select —' }}</option>
        <option v-for="opt in formatOptions" :key="opt.value" :value="opt.value">
          {{ opt.label?.[lang] || opt.label?.en || opt.value }}
        </option>
      </select>
    </div>

    <div class="field">
      <label>{{ lang === 'de' ? 'Medientyp' : 'Media Type' }}</label>
      <input type="text" :value="modelValue['dcat:mediaType'] || ''" placeholder="text/csv"
        @input="update('dcat:mediaType', $event.target.value)" />
    </div>

    <div class="field span2">
      <label>{{ lang === 'de' ? 'Lizenz' : 'License' }}</label>
      <input type="url" :value="modelValue['dct:license'] || ''"
        placeholder="https://creativecommons.org/licenses/by/4.0/"
        @input="update('dct:license', $event.target.value)" />
    </div>

    <div class="field">
      <label>{{ lang === 'de' ? 'Verfügbarkeit' : 'Availability' }}</label>
      <select :value="modelValue['dcatap:availability'] || ''"
        @change="update('dcatap:availability', $event.target.value)">
        <option value="">{{ lang === 'de' ? '— Bitte wählen —' : '— Please select —' }}</option>
        <option v-for="opt in availabilityOptions" :key="opt.value" :value="opt.value">
          {{ opt.label?.[lang] || opt.label?.en || opt.value }}
        </option>
      </select>
    </div>

    <div class="field">
      <label>{{ lang === 'de' ? 'Veröffentlichungsdatum' : 'Issued' }}</label>
      <input type="date" :value="modelValue['dct:issued'] || ''"
        @input="update('dct:issued', $event.target.value)" />
    </div>

    <div class="field">
      <label>{{ lang === 'de' ? 'Zuletzt geändert' : 'Modified' }}</label>
      <input type="date" :value="modelValue['dct:modified'] || ''"
        @input="update('dct:modified', $event.target.value)" />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { FileUploader } from '../../services/FileUploader.js'

const props = defineProps({
  modelValue: { type: Object, default: () => ({}) },
  lang: String,
  formatOptions: { type: Array, default: () => [] },
  availabilityOptions: { type: Array, default: () => [] },
  uploadConfig: { type: Object, default: null }
})

const emit = defineEmits(['update:modelValue'])

function update(key, value) {
  emit('update:modelValue', { ...props.modelValue, [key]: value })
}

// ── File upload state ──
const fileInput = ref(null)
const selectedFile = ref(null)
const isDragging = ref(false)
const uploadState = ref('idle') // idle | selected | uploading | success | error
const uploadError = ref('')

function onFileChange(e) {
  const file = e.target.files?.[0]
  if (file) selectFile(file)
}

function onDrop(e) {
  isDragging.value = false
  if (uploadState.value === 'uploading') return
  const file = e.dataTransfer.files?.[0]
  if (file) selectFile(file)
}

function selectFile(file) {
  selectedFile.value = file
  uploadState.value = 'selected'
  uploadError.value = ''
}

function resetUpload() {
  selectedFile.value = null
  uploadState.value = 'idle'
  uploadError.value = ''
  if (fileInput.value) fileInput.value.value = ''
}

async function doUpload() {
  if (!selectedFile.value) return
  uploadState.value = 'uploading'
  try {
    const uploader = new FileUploader()
    const downloadUrl = await uploader.upload(selectedFile.value, props.uploadConfig)
    uploadState.value = 'success'
    // Write URL into downloadURL; also into accessURL if still empty
    const updated = { ...props.modelValue, 'dcat:downloadURL': downloadUrl }
    if (!updated['dcat:accessURL']) updated['dcat:accessURL'] = downloadUrl
    emit('update:modelValue', updated)
  } catch (err) {
    uploadState.value = 'error'
    uploadError.value = err.message
  }
}

function formatFileSize(bytes) {
  if (!bytes) return ''
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}
</script>

<style scoped>
.dist-form {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.85rem;
}

.field { display: flex; flex-direction: column; gap: 0.25rem; }
.field.span2 { grid-column: span 2; }

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
  padding: 0.45rem 0.7rem;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
  font-size: var(--font-size-base);
  background: var(--color-surface);
  color: var(--color-text);
  width: 100%;
  box-sizing: border-box;
  font-family: inherit;
  transition: border-color 0.2s;
}

input:focus, textarea:focus, select:focus {
  outline: none;
  border-color: var(--color-primary);
  box-shadow: var(--focus-ring);
}

textarea { resize: vertical; }
select { cursor: pointer; }

/* ── Upload section ── */
.upload-section {
  background: var(--color-surface-alt);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  padding: 0.85rem;
  gap: 0.6rem;
}

.hidden-input { display: none; }

.drop-zone {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.35rem;
  border: 2px dashed var(--color-border);
  border-radius: var(--radius-sm);
  padding: 1.2rem 1rem;
  cursor: pointer;
  transition: border-color 0.2s, background 0.2s;
  min-height: 80px;
  text-align: center;
}

.drop-zone:hover,
.drop-zone.dragging {
  border-color: var(--color-primary);
  background: var(--color-primary-bg);
}

.drop-zone.uploading {
  cursor: default;
  opacity: 0.7;
}

.drop-zone.success {
  border-color: #27ae60;
  background: #f0faf4;
  cursor: default;
}

.drop-zone.error {
  border-color: var(--color-error);
  background: #fdf0f0;
  cursor: default;
}

.drop-icon {
  font-size: 1.5rem;
  line-height: 1;
}

.drop-icon.spin {
  display: inline-block;
  animation: spin 1s linear infinite;
}

@keyframes spin { to { transform: rotate(360deg); } }

.drop-text {
  font-size: var(--font-size-label);
  color: var(--color-text-muted);
}

.drop-size {
  font-size: var(--font-size-sm);
  color: var(--color-text-subtle);
}

.error-text { color: var(--color-error); }

.btn-upload {
  align-self: flex-end;
  background: var(--color-primary);
  color: white;
  border: none;
  border-radius: var(--radius-sm);
  padding: 0.45rem 1.1rem;
  font-size: var(--font-size-base);
  font-weight: 500;
  cursor: pointer;
  transition: background 0.15s;
}
.btn-upload:hover { background: var(--color-primary-dark); }

.btn-reset-upload {
  font-size: var(--font-size-sm);
  color: var(--color-primary);
  background: none;
  border: none;
  cursor: pointer;
  text-decoration: underline;
  padding: 0;
}

@media (max-width: 600px) {
  .dist-form { grid-template-columns: 1fr; }
  .field.span2 { grid-column: span 1; }
}
</style>
