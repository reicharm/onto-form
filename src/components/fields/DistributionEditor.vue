<template>
  <div class="dist-editor">
    <label class="dist-editor-label">{{ field?.label?.[lang] || field?.label?.en || (lang === 'de' ? 'Distributionen' : 'Distributions') }}</label>

    <!-- Empty state -->
    <div v-if="!distributions.length" class="dist-empty">
      <p class="dist-empty-hint">
        {{ lang === 'de'
          ? 'Noch keine Distributionen vorhanden. Fügen Sie die erste hinzu.'
          : 'No distributions yet. Add the first one.' }}
      </p>
      <button class="btn-add-first" @click="openNew">
        {{ lang === 'de' ? '+ Erste Distribution hinzufügen' : '+ Add First Distribution' }}
      </button>
    </div>

    <!-- List -->
    <template v-else>
      <ul class="dist-list">
        <li v-for="(dist, idx) in distributions" :key="idx" class="dist-item">
          <div class="dist-item-info">
            <span class="dist-item-title">{{ dist['dct:title'] || dist['dcat:accessURL'] || (lang === 'de' ? 'Unbenannte Distribution' : 'Unnamed Distribution') }}</span>
            <span v-if="dist['dct:format']" class="dist-item-format">{{ formatLabel(dist['dct:format']) }}</span>
          </div>
          <div class="dist-item-actions">
            <button class="btn-edit-dist" @click="openEdit(idx)">
              {{ lang === 'de' ? 'Bearbeiten' : 'Edit' }}
            </button>
            <button class="btn-remove-dist" @click="remove(idx)" :title="lang === 'de' ? 'Entfernen' : 'Remove'">&#x2715;</button>
          </div>
        </li>
      </ul>
      <button class="btn-add" @click="openNew">
        {{ lang === 'de' ? '+ Distribution hinzufügen' : '+ Add Distribution' }}
      </button>
    </template>

    <!-- Modal -->
    <DistributionModal
      v-if="modalOpen"
      :lang="lang"
      :distribution="editingDist"
      :isNew="editingIdx === -1"
      @save="onSave"
      @cancel="modalOpen = false"
    />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import DistributionModal from '../DistributionModal.vue'

const props = defineProps({
  field: Object,
  lang: { type: String, default: 'en' },
  modelValue: { type: Array, default: () => [] }
})

const emit = defineEmits(['update:modelValue'])

const distributions = computed(() => Array.isArray(props.modelValue) ? props.modelValue : [])

const modalOpen = ref(false)
const editingIdx = ref(-1)
const editingDist = ref({})

const formatCache = ref({})

async function loadFormats() {
  if (Object.keys(formatCache.value).length) return
  try {
    const res = await fetch('/vocabularies/file-format.json')
    if (res.ok) {
      const opts = await res.json()
      for (const o of opts) {
        formatCache.value[o.value] = o.label
      }
    }
  } catch {}
}

loadFormats()

function formatLabel(value) {
  const label = formatCache.value[value]
  if (!label) return value
  return label[props.lang] || label.en || value
}

function openNew() {
  editingIdx.value = -1
  editingDist.value = {}
  modalOpen.value = true
}

function openEdit(idx) {
  editingIdx.value = idx
  editingDist.value = { ...distributions.value[idx] }
  modalOpen.value = true
}

function onSave(dist) {
  const list = [...distributions.value]
  if (editingIdx.value === -1) {
    list.push(dist)
  } else {
    list[editingIdx.value] = dist
  }
  emit('update:modelValue', list)
  modalOpen.value = false
}

function remove(idx) {
  const list = [...distributions.value]
  list.splice(idx, 1)
  emit('update:modelValue', list)
}
</script>

<style scoped>
.dist-editor {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.dist-editor-label {
  font-size: var(--font-size-label);
  font-weight: 500;
  color: var(--color-text-muted);
}

.dist-empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
  padding: 2rem 1rem;
  border: 2px dashed var(--color-border);
  border-radius: var(--radius-md);
  background: var(--color-surface-alt);
}

.dist-empty-hint {
  margin: 0;
  font-size: var(--font-size-base);
  color: var(--color-text-subtle);
  text-align: center;
}

.btn-add-first {
  background: var(--color-primary);
  color: white;
  border: none;
  padding: 0.55rem 1.2rem;
  border-radius: var(--radius-md);
  font-size: var(--font-size-base);
  cursor: pointer;
  font-weight: 500;
}

.btn-add-first:hover {
  background: var(--color-primary-dark);
}

.dist-list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.dist-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
  padding: 0.65rem 0.85rem;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  background: var(--color-surface-alt);
}

.dist-item-info {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  min-width: 0;
  flex: 1;
}

.dist-item-title {
  font-size: var(--font-size-base);
  color: var(--color-text);
  font-weight: 500;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.dist-item-format {
  font-size: var(--font-size-sm);
  color: var(--color-primary);
  background: var(--color-primary-bg);
  border-radius: var(--radius-sm);
  padding: 0.1rem 0.4rem;
  white-space: nowrap;
  flex-shrink: 0;
}

.dist-item-actions {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  flex-shrink: 0;
}

.btn-edit-dist {
  background: transparent;
  color: var(--color-primary);
  border: 1px solid var(--color-primary);
  padding: 0.25rem 0.65rem;
  border-radius: var(--radius-sm);
  font-size: var(--font-size-sm);
  cursor: pointer;
}

.btn-edit-dist:hover {
  background: var(--color-primary-bg);
}

.btn-remove-dist {
  background: transparent;
  color: var(--color-text-subtle);
  border: 1px solid var(--color-border);
  width: 1.8rem;
  height: 1.8rem;
  border-radius: var(--radius-sm);
  font-size: 0.8rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
}

.btn-remove-dist:hover {
  background: var(--color-error-bg);
  border-color: var(--color-error);
  color: var(--color-error);
}

.btn-add {
  align-self: flex-start;
  background: var(--color-primary-bg);
  color: var(--color-primary);
  border: 1px solid var(--color-primary);
  padding: 0.4rem 1rem;
  border-radius: var(--radius-md);
  font-size: var(--font-size-base);
  cursor: pointer;
  font-weight: 500;
}

.btn-add:hover {
  background: var(--color-primary);
  color: white;
}
</style>
