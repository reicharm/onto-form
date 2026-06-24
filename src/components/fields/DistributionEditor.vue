<template>
  <div class="dist-editor">
    <label class="dist-label">{{ field.label?.[lang] || field.label?.en || field.id }}</label>

    <!-- Empty state -->
    <div v-if="!distributions.length" class="dist-empty">
      <p class="dist-empty-hint">
        {{ lang === 'de' ? 'Noch keine Distributionen vorhanden.' : 'No distributions yet.' }}
      </p>
      <button class="btn-add-first" @click="addDistribution">
        {{ lang === 'de' ? 'Erste Distribution hinzufügen' : 'Add first distribution' }}
      </button>
    </div>

    <template v-else>
      <!-- ── INLINE MODE: collapsible cards ── -->
      <template v-if="mode === 'inline'">
        <div
          v-for="(dist, idx) in distributions"
          :key="distKeys[idx] ?? idx"
          class="dist-card"
          :class="{ 'drag-over': dragOverIdx === idx, 'dragging': draggedIdx === idx }"
          draggable="true"
          @dragstart="onDragStart(idx, $event)"
          @dragover.prevent="onDragOver(idx)"
          @dragleave="onDragLeave"
          @drop.prevent="onDrop(idx)"
          @dragend="onDragEnd"
        >
          <div class="dist-card-header" @click="toggleCard(idx)">
            <span
              class="drag-handle"
              :aria-label="lang === 'de' ? 'Distribution verschieben' : 'Drag to reorder'"
              title="Drag to reorder"
              @click.stop
            >⠿</span>
            <div class="dist-card-summary">
              <span class="dist-card-index">{{ idx + 1 }}.</span>
              <span class="dist-card-title">{{ cardTitle(dist) }}</span>
              <span v-if="dist['dct:format']" class="dist-card-badge">
                {{ formatLabel(dist['dct:format']) }}
              </span>
            </div>
            <div class="dist-card-controls">
              <button type="button" class="btn-remove-inline"
                :aria-label="(lang === 'de' ? 'Distribution ' : 'Distribution ') + (idx + 1) + (lang === 'de' ? ' entfernen' : ' remove')"
                @click.stop="removeDistribution(idx)"
                :title="lang === 'de' ? 'Entfernen' : 'Remove'">✕</button>
              <span class="dist-toggle" aria-hidden="true">{{ openCards.has(idx) ? '▲' : '▼' }}</span>
            </div>
          </div>

          <div v-if="openCards.has(idx)" class="dist-card-body">
            <DistributionForm
              :modelValue="dist"
              :lang="lang"
              :formatOptions="formatOptions"
              :availabilityOptions="availabilityOptions"
              :uploadConfig="uploadConfig"
              @update:modelValue="updateDist(idx, $event)"
            />
          </div>
        </div>
      </template>

      <!-- ── MODAL MODE: compact list + overlay ── -->
      <template v-else>
        <div
          v-for="(dist, idx) in distributions"
          :key="distKeys[idx] ?? idx"
          class="dist-row"
          :class="{ 'drag-over': dragOverIdx === idx, 'dragging': draggedIdx === idx }"
          draggable="true"
          @dragstart="onDragStart(idx, $event)"
          @dragover.prevent="onDragOver(idx)"
          @dragleave="onDragLeave"
          @drop.prevent="onDrop(idx)"
          @dragend="onDragEnd"
        >
          <span
            class="drag-handle"
            :aria-label="lang === 'de' ? 'Distribution verschieben' : 'Drag to reorder'"
            title="Drag to reorder"
          >⠿</span>
          <div class="dist-row-info">
            <span class="dist-row-title">{{ cardTitle(dist) }}</span>
            <span v-if="dist['dcat:accessURL']" class="dist-row-url">{{ dist['dcat:accessURL'] }}</span>
            <span v-if="dist['dct:format']" class="dist-row-badge">{{ formatLabel(dist['dct:format']) }}</span>
          </div>
          <div class="dist-row-actions">
            <button class="btn-edit" @click="editDist(idx)">
              {{ lang === 'de' ? 'Bearbeiten' : 'Edit' }}
            </button>
            <button class="btn-remove" @click="removeDistribution(idx)">
              {{ lang === 'de' ? 'Entfernen' : 'Remove' }}
            </button>
          </div>
        </div>
      </template>

      <button type="button" class="btn-add" @click="addDistribution">
        + {{ lang === 'de' ? 'Distribution hinzufügen' : 'Add distribution' }}
      </button>
    </template>

    <!-- Modal (only used in modal mode) -->
    <DistributionModal
      v-if="mode === 'modal' && editingDraft !== null"
      :show="editingDraft !== null"
      :modelValue="editingDraft"
      :lang="lang"
      :formatOptions="formatOptions"
      :availabilityOptions="availabilityOptions"
      :uploadConfig="uploadConfig"
      @save="onModalSave"
      @cancel="editingDraft = null"
    />
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted, nextTick } from 'vue'
import DistributionForm from './DistributionForm.vue'
import DistributionModal from '../DistributionModal.vue'
import { assetUrl } from '../../config/ontoFormConfig.js'

const props = defineProps({
  field: Object,
  lang: String,
  modelValue: { type: Array, default: () => [] }
})

const uploadConfig = computed(() => props.field?.fileUpload || null)

const emit = defineEmits(['update:modelValue'])

const mode = computed(() => props.field?.distributionMode || 'inline')

// Vocabulary data
const formatOptions = ref([])
const availabilityOptions = [
  { value: 'http://data.europa.eu/r5r/availability/stable',       label: { de: 'Stabil',         en: 'Stable' } },
  { value: 'http://data.europa.eu/r5r/availability/available',    label: { de: 'Verfügbar',      en: 'Available' } },
  { value: 'http://data.europa.eu/r5r/availability/experimental', label: { de: 'Experimentell',  en: 'Experimental' } },
  { value: 'http://data.europa.eu/r5r/availability/temporary',    label: { de: 'Vorübergehend',  en: 'Temporary' } }
]

onMounted(async () => {
  try {
    const res = await fetch(assetUrl('vocabularies/file-format.json'))
    if (res.ok) formatOptions.value = await res.json()
  } catch { /* fallback: empty list */ }
})

// Distribution list
const distributions = computed(() => Array.isArray(props.modelValue) ? props.modelValue : [])

function emptyDist() {
  return {
    'dcat:accessURL': '', 'dcat:downloadURL': '',
    'dct:title': '', 'dct:description': '',
    'dct:format': '', 'dcat:mediaType': '',
    'dct:license': '', 'dcatap:availability': '',
    'dct:issued': '', 'dct:modified': ''
  }
}

function addDistribution() {
  if (mode.value === 'inline') {
    const next = [...distributions.value, emptyDist()]
    emit('update:modelValue', next)
    openCards.value = new Set([...openCards.value, next.length - 1])
  } else {
    // Modal mode: open modal first — add to list only on save
    editingIndex.value = -1
    editingDraft.value = emptyDist()
  }
}

function removeDistribution(idx) {
  const next = distributions.value.filter((_, i) => i !== idx)
  distKeys.value.splice(idx, 1)
  emit('update:modelValue', next)
  if (mode.value === 'inline') {
    const nextOpen = new Set()
    for (const i of openCards.value) {
      if (i < idx) nextOpen.add(i)
      else if (i > idx) nextOpen.add(i - 1)
    }
    openCards.value = nextOpen
  }
}

function updateDist(idx, val) {
  const next = distributions.value.map((d, i) => i === idx ? val : d)
  emit('update:modelValue', next)
}

// Stable per-distribution keys — prevents DOM reuse when items are removed mid-list
let _nextDistKey = 0
const distKeys = ref([])

watch(distributions, (newDists) => {
  while (distKeys.value.length < newDists.length) distKeys.value.push(++_nextDistKey)
}, { immediate: true })

// ── Inline mode state ──
const openCards = ref(new Set([0]))

function toggleCard(idx) {
  const next = new Set(openCards.value)
  next.has(idx) ? next.delete(idx) : next.add(idx)
  openCards.value = next
}

// ── Modal mode state ──
const editingDraft = ref(null)
const editingIndex = ref(-1)

function editDist(idx) {
  editingIndex.value = idx
  editingDraft.value = { ...(distributions.value[idx] || {}) }
}

function onModalSave(saved) {
  const next = [...distributions.value]
  if (editingIndex.value === -1) {
    next.push(saved)
  } else {
    next[editingIndex.value] = saved
  }
  emit('update:modelValue', next)
  editingDraft.value = null
}

// ── Drag-and-drop reordering ──
const draggedIdx  = ref(-1)
const dragOverIdx = ref(-1)

function onDragStart(idx, event) {
  draggedIdx.value = idx
  event.dataTransfer.effectAllowed = 'move'
  event.dataTransfer.setData('text/plain', String(idx))
}

function onDragOver(idx) {
  if (idx !== draggedIdx.value) dragOverIdx.value = idx
}

function onDragLeave() {
  dragOverIdx.value = -1
}

function onDrop(targetIdx) {
  const from = draggedIdx.value
  if (from === -1 || from === targetIdx) { onDragEnd(); return }
  const next = [...distributions.value]
  const [moved] = next.splice(from, 1)
  next.splice(targetIdx, 0, moved)
  // Adjust open-card set for inline mode
  if (mode.value === 'inline') {
    const nextOpen = new Set()
    for (const i of openCards.value) {
      const newI = shiftIndex(i, from, targetIdx)
      if (newI >= 0) nextOpen.add(newI)
    }
    openCards.value = nextOpen
  }
  emit('update:modelValue', next)
  onDragEnd()
}

function onDragEnd() {
  draggedIdx.value  = -1
  dragOverIdx.value = -1
}

function shiftIndex(i, from, to) {
  if (i === from) return to
  if (from < to) return i > from && i <= to ? i - 1 : i
  return i >= to && i < from ? i + 1 : i
}

// Helpers
function cardTitle(dist) {
  return dist['dct:title'] || dist['dcat:accessURL'] || '—'
}

function formatLabel(formatUri) {
  const opt = formatOptions.value.find(o => o.value === formatUri)
  return opt ? (opt.label?.[props.lang] || opt.label?.en || formatUri) : (formatUri.split('/').pop() || formatUri)
}
</script>

<style scoped>
.dist-editor { display: flex; flex-direction: column; gap: 0.6rem; }

.dist-label {
  font-size: var(--font-size-label);
  font-weight: 500;
  color: var(--color-text-muted);
}

/* Empty state */
.dist-empty {
  border: 2px dashed var(--color-border);
  border-radius: var(--radius-md);
  padding: 1.5rem;
  text-align: center;
  background: var(--color-surface-alt);
}
.dist-empty-hint { color: var(--color-text-subtle); font-size: var(--font-size-label); margin: 0 0 0.75rem; }
.btn-add-first {
  background: var(--color-primary); color: white; border: none;
  border-radius: var(--radius-md); padding: 0.5rem 1.1rem;
  font-size: var(--font-size-base); cursor: pointer; font-weight: 500;
}
.btn-add-first:hover { background: var(--color-primary-dark); }

/* ── Inline mode ── */
.dist-card {
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  overflow: hidden;
  background: var(--color-surface);
  box-shadow: var(--shadow-card);
}

.dist-card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.75rem 1rem;
  cursor: pointer;
  background: var(--color-surface-alt);
  user-select: none;
  gap: 0.5rem;
}
.dist-card-header:hover { background: var(--color-primary-bg); }

.dist-card-summary { display: flex; align-items: center; gap: 0.5rem; flex: 1; min-width: 0; }
.dist-card-index { font-size: var(--font-size-label); font-weight: 600; color: var(--color-text-muted); flex-shrink: 0; }
.dist-card-title { font-size: var(--font-size-base); color: var(--color-text); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }

.dist-card-controls { display: flex; align-items: center; gap: 0.5rem; flex-shrink: 0; }
.dist-toggle { font-size: 0.75rem; color: var(--color-text-muted); }

.btn-remove-inline {
  background: transparent; border: 1px solid var(--color-border);
  border-radius: var(--radius-sm); padding: 0.15rem 0.4rem;
  font-size: var(--font-size-sm); color: var(--color-text-muted);
  cursor: pointer; line-height: 1;
}
.btn-remove-inline:hover { background: #fdf0f0; color: var(--color-error); border-color: var(--color-error); }

.dist-card-body { padding: 1rem; border-top: 1px solid var(--color-border); }

/* ── Modal mode ── */
.dist-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-card);
  padding: 0.75rem 1rem;
  gap: 1rem;
}
.dist-row-info { flex: 1; min-width: 0; display: flex; flex-direction: column; gap: 0.15rem; }
.dist-row-title { font-weight: 600; font-size: var(--font-size-base); color: var(--color-text); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.dist-row-url { font-size: var(--font-size-sm); color: var(--color-primary); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.dist-row-actions { display: flex; gap: 0.4rem; flex-shrink: 0; }

.btn-edit, .btn-remove {
  border: none; border-radius: var(--radius-sm);
  padding: 0.3rem 0.7rem; font-size: var(--font-size-sm); cursor: pointer;
}
.btn-edit { background: var(--color-primary-bg); color: var(--color-primary); }
.btn-edit:hover { background: var(--color-primary); color: white; }
.btn-remove { background: #fdf0f0; color: var(--color-error); }
.btn-remove:hover { background: var(--color-error); color: white; }

/* ── Drag-and-drop ── */
.drag-handle {
  cursor: grab;
  font-size: 1rem;
  color: var(--color-text-subtle);
  padding: 0 0.3rem;
  flex-shrink: 0;
  user-select: none;
  line-height: 1;
}
.drag-handle:active { cursor: grabbing; }

.dist-card.dragging,
.dist-row.dragging {
  opacity: 0.4;
}

.dist-card.drag-over {
  border-color: var(--color-primary);
  box-shadow: 0 0 0 2px var(--color-primary);
}

.dist-row.drag-over {
  border-color: var(--color-primary);
  box-shadow: 0 0 0 2px var(--color-primary);
}

/* ── Shared ── */
.dist-card-badge, .dist-row-badge {
  font-size: var(--font-size-sm);
  background: var(--color-primary-bg);
  color: var(--color-primary);
  border: 1px solid var(--color-primary-light);
  border-radius: var(--radius-sm);
  padding: 0.1rem 0.4rem;
  flex-shrink: 0;
}

.btn-add {
  align-self: flex-start;
  background: transparent;
  color: var(--color-primary);
  border: 2px dashed var(--color-primary);
  padding: 0.5rem 1.2rem;
  border-radius: var(--radius-md);
  font-size: var(--font-size-base);
  cursor: pointer;
  font-weight: 500;
  transition: background 0.15s;
}
.btn-add:hover { background: var(--color-primary-bg); }
</style>
