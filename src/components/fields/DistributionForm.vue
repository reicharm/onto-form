<template>
  <div class="dist-form">

    <!-- ── File upload widget ── -->
    <div v-if="uploadConfig?.enabled" class="field span2 upload-section">
      <label>{{ lang === 'de' ? 'Datei hochladen' : 'Upload file' }}</label>

      <!-- Auth credentials box -->
      <div v-if="needsCredentials" class="auth-box">
        <div class="auth-title">
          {{ authConfig?.label?.[lang] || authConfig?.label?.en || (lang === 'de' ? 'Zugangsdaten' : 'Credentials') }}
        </div>

        <template v-if="authConfig?.type === 'apikey'">
          <input type="password" :placeholder="lang === 'de' ? 'API-Schlüssel' : 'API key'"
            v-model="creds.value" autocomplete="off" class="auth-input" />
        </template>

        <template v-else-if="authConfig?.type === 'bearer'">
          <input type="password" placeholder="Token"
            v-model="creds.token" autocomplete="off" class="auth-input" />
        </template>

        <template v-else-if="authConfig?.type === 'basic'">
          <input type="text" :placeholder="lang === 'de' ? 'Benutzername' : 'Username'"
            v-model="creds.username" autocomplete="off" class="auth-input" />
          <input type="password" :placeholder="lang === 'de' ? 'Passwort' : 'Password'"
            v-model="creds.password" autocomplete="off" class="auth-input" />
        </template>

        <template v-else-if="authConfig?.type === 'oauth2cc'">
          <input type="text" placeholder="Client ID"
            v-model="creds.clientId" autocomplete="off" class="auth-input" />
          <input type="password" placeholder="Client Secret"
            v-model="creds.clientSecret" autocomplete="off" class="auth-input" />
        </template>

        <p class="auth-note">
          {{ lang === 'de'
            ? '🔒 Wird nur für diese Sitzung im Arbeitsspeicher gehalten.'
            : '🔒 Kept in memory for this session only.' }}
        </p>
        <button type="button" class="btn-save-creds" :disabled="!credsComplete" @click="saveCredentials">
          {{ lang === 'de' ? 'Speichern' : 'Save' }}
        </button>
      </div>

      <!-- Clear button when credentials are stored -->
      <div v-else-if="authConfig && uploadAuthStore.requiresCredentials(authConfig.type)" class="auth-stored">
        <span class="auth-stored-label">🔒 {{ lang === 'de' ? 'Zugangsdaten gespeichert' : 'Credentials stored' }}</span>
        <button type="button" class="btn-clear-creds" @click="clearCredentials">
          {{ lang === 'de' ? 'Ändern' : 'Change' }}
        </button>
      </div>

      <div
        class="drop-zone"
        :class="{ dragging: isDragging, uploading: uploadState === 'uploading', success: uploadState === 'success', error: uploadState === 'error', locked: needsCredentials }"
        @dragover.prevent="!needsCredentials && (isDragging = true)"
        @dragleave="isDragging = false"
        @drop.prevent="!needsCredentials && onDrop($event)"
        @click="!needsCredentials && fileInput?.click()"
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
import { ref, computed } from 'vue'
import { FileUploader } from '../../services/FileUploader.js'
import { uploadAuthStore } from '../../services/UploadAuthStore.js'

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

// ── Auth ──
const authConfig = computed(() => props.uploadConfig?.auth || null)
const needsCredentials = computed(() => {
  if (!authConfig.value) return false
  const type = authConfig.value.type
  if (!uploadAuthStore.requiresCredentials(type)) return false
  return !uploadAuthStore.has(props.uploadConfig.uploadUrl)
})

const creds = ref({ value: '', token: '', username: '', password: '', clientId: '', clientSecret: '' })
const credsComplete = computed(() => {
  if (!authConfig.value) return true
  const c = creds.value
  switch (authConfig.value.type) {
    case 'apikey': return !!c.value
    case 'bearer': return !!c.token
    case 'basic': return !!(c.username && c.password)
    case 'oauth2cc': return !!(c.clientId && c.clientSecret)
    default: return true
  }
})

function saveCredentials() {
  const type = authConfig.value?.type
  const url = props.uploadConfig.uploadUrl
  const c = creds.value
  let stored
  switch (type) {
    case 'apikey': stored = { value: c.value }; break
    case 'bearer': stored = { token: c.token }; break
    case 'basic': stored = { username: c.username, password: c.password }; break
    case 'oauth2cc': stored = { clientId: c.clientId, clientSecret: c.clientSecret }; break
    default: return
  }
  uploadAuthStore.set(url, stored)
  creds.value = { value: '', token: '', username: '', password: '', clientId: '', clientSecret: '' }
}

function clearCredentials() {
  uploadAuthStore.set(props.uploadConfig.uploadUrl, null)
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

.drop-zone.locked {
  cursor: default;
  opacity: 0.5;
  pointer-events: none;
}

.auth-box {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
  padding: 0.75rem;
}

.auth-title {
  font-size: var(--font-size-label);
  font-weight: 500;
  color: var(--color-text-muted);
  margin-bottom: 0.15rem;
}

.auth-input {
  padding: 0.4rem 0.6rem;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
  font-size: var(--font-size-base);
  background: var(--color-surface);
  color: var(--color-text);
  width: 100%;
  box-sizing: border-box;
}

.auth-note {
  font-size: var(--font-size-sm);
  color: var(--color-text-subtle);
  margin: 0.1rem 0 0;
}

.btn-save-creds {
  align-self: flex-start;
  background: var(--color-primary);
  color: white;
  border: none;
  border-radius: var(--radius-sm);
  padding: 0.4rem 1rem;
  font-size: var(--font-size-base);
  cursor: pointer;
}
.btn-save-creds:disabled { opacity: 0.5; cursor: default; }
.btn-save-creds:not(:disabled):hover { background: var(--color-primary-dark); }

.auth-stored {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  font-size: var(--font-size-sm);
}

.auth-stored-label { color: var(--color-text-muted); }

.btn-clear-creds {
  background: none;
  border: none;
  color: var(--color-primary);
  font-size: var(--font-size-sm);
  cursor: pointer;
  text-decoration: underline;
  padding: 0;
}

@media (max-width: 600px) {
  .dist-form { grid-template-columns: 1fr; }
  .field.span2 { grid-column: span 1; }
}
</style>
