<template>
  <div class="dist-editor">
    <label class="dist-label">{{ field.label?.[lang] || field.label?.en || field.id }}</label>

    <!-- Empty state -->
    <div v-if="!modelValue || modelValue.length === 0" class="dist-empty">
      <p class="dist-empty-hint">
        {{ lang === 'de' ? 'Noch keine Distributionen vorhanden.' : 'No distributions yet.' }}
      </p>
      <button class="btn-add-first" @click="addNew">
        {{ lang === 'de' ? 'Erste Distribution hinzufügen' : 'Add first distribution' }}
      </button>
    </div>

    <!-- Distribution cards -->
    <div v-else class="dist-list">
      <div v-for="(dist, idx) in modelValue" :key="idx" class="dist-card">
        <div class="dist-card-body">
          <div class="dist-card-title">
            {{ dist['dct:title'] || dist['dcat:accessURL'] || (lang === 'de' ? 'Distribution ' + (idx + 1) : 'Distribution ' + (idx + 1)) }}
          </div>
          <div v-if="dist['dcat:accessURL']" class="dist-card-url">{{ dist['dcat:accessURL'] }}</div>
          <div v-if="dist['dct:format']" class="dist-card-format">{{ dist['dct:format'] }}</div>
        </div>
        <div class="dist-card-actions">
          <button class="btn-edit" @click="editDist(idx)">
            {{ lang === 'de' ? 'Bearbeiten' : 'Edit' }}
          </button>
          <button class="btn-remove" @click="removeDist(idx)">
            {{ lang === 'de' ? 'Entfernen' : 'Remove' }}
          </button>
        </div>
      </div>

      <button class="btn-add" @click="addNew">+ {{ lang === 'de' ? 'Distribution hinzufügen' : 'Add distribution' }}</button>
    </div>

    <!-- Modal -->
    <DistributionModal
      v-if="editingDraft !== null"
      :show="editingDraft !== null"
      :modelValue="editingDraft"
      :lang="lang"
      @save="onSave"
      @cancel="editingDraft = null"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import DistributionModal from '../DistributionModal.vue'

const props = defineProps({
  field: Object,
  lang: String,
  modelValue: {
    type: Array,
    default: () => []
  }
})

const emit = defineEmits(['update:modelValue'])

const editingDraft = ref(null)
const editingIndex = ref(-1)

function addNew() {
  editingIndex.value = -1
  editingDraft.value = {}
}

function editDist(idx) {
  editingIndex.value = idx
  editingDraft.value = { ...(props.modelValue[idx] || {}) }
}

function removeDist(idx) {
  const updated = [...(props.modelValue || [])]
  updated.splice(idx, 1)
  emit('update:modelValue', updated)
}

function onSave(saved) {
  const updated = [...(props.modelValue || [])]
  if (editingIndex.value === -1) {
    updated.push(saved)
  } else {
    updated[editingIndex.value] = saved
  }
  emit('update:modelValue', updated)
  editingDraft.value = null
}
</script>

<style scoped>
.dist-editor { display: flex; flex-direction: column; gap: 0.5rem; }

.dist-label {
  font-size: var(--font-size-label);
  font-weight: 500;
  color: var(--color-text-muted);
}

.dist-empty {
  border: 2px dashed var(--color-border);
  border-radius: var(--radius-md);
  padding: 1.5rem;
  text-align: center;
  background: var(--color-surface-alt);
}

.dist-empty-hint {
  color: var(--color-text-subtle);
  font-size: var(--font-size-label);
  margin: 0 0 0.75rem;
}

.btn-add-first {
  background: var(--color-primary);
  color: white;
  border: none;
  border-radius: var(--radius-md);
  padding: 0.5rem 1.1rem;
  font-size: var(--font-size-base);
  cursor: pointer;
  font-weight: 500;
}
.btn-add-first:hover { background: var(--color-primary-dark); }

.dist-list { display: flex; flex-direction: column; gap: 0.6rem; }

.dist-card {
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

.dist-card-body { flex: 1; min-width: 0; }

.dist-card-title {
  font-weight: 600;
  font-size: var(--font-size-base);
  color: var(--color-text);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.dist-card-url {
  font-size: var(--font-size-sm);
  color: var(--color-primary);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-top: 0.15rem;
}

.dist-card-format {
  font-size: var(--font-size-sm);
  color: var(--color-text-subtle);
  margin-top: 0.1rem;
}

.dist-card-actions { display: flex; gap: 0.4rem; flex-shrink: 0; }

.btn-edit, .btn-remove {
  border: none;
  border-radius: var(--radius-sm);
  padding: 0.3rem 0.7rem;
  font-size: var(--font-size-sm);
  cursor: pointer;
}

.btn-edit {
  background: var(--color-primary-bg);
  color: var(--color-primary);
}
.btn-edit:hover { background: var(--color-primary); color: white; }

.btn-remove {
  background: #fdf0f0;
  color: var(--color-error);
}
.btn-remove:hover { background: var(--color-error); color: white; }

.btn-add {
  background: none;
  border: 2px dashed var(--color-border);
  border-radius: var(--radius-md);
  padding: 0.5rem 1rem;
  font-size: var(--font-size-base);
  color: var(--color-primary);
  cursor: pointer;
  text-align: center;
  transition: border-color 0.2s, background 0.2s;
}
.btn-add:hover { border-color: var(--color-primary); background: var(--color-primary-bg); }
</style>
