<template>
  <div class="field" ref="root">
    <label :id="`${field.id}-label`" :class="{ required: field.required || field.requiredIf }">{{ label }}</label>

    <!-- Trigger — combobox pattern -->
    <div
      class="ss-input-wrap"
      :class="{ open: isOpen, focused: isOpen }"
      role="combobox"
      :aria-expanded="isOpen"
      aria-haspopup="listbox"
      :aria-labelledby="`${field.id}-label`"
      :aria-owns="`${field.id}-panel`"
      tabindex="0"
      @click="open"
      @keydown.enter.prevent="open"
      @keydown.space.prevent="open"
    >
      <span v-if="selectedLabel" class="ss-value">{{ selectedLabel }}</span>
      <span v-else class="ss-placeholder">{{ t('select.placeholder') }}</span>
      <span class="ss-caret" aria-hidden="true">▾</span>
      <button
        v-if="modelValue"
        type="button"
        class="ss-clear"
        :aria-label="`Clear ${label} selection`"
        @click.stop="clear"
      >×</button>
    </div>

    <!-- Dropdown panel -->
    <div
      v-if="isOpen"
      :id="`${field.id}-panel`"
      class="ss-panel"
      role="listbox"
      :aria-labelledby="`${field.id}-label`"
    >
      <input
        ref="searchInput"
        v-model="query"
        class="ss-search"
        :placeholder="t('searchselect.search-placeholder')"
        :aria-label="`Search ${label}`"
        autocomplete="off"
        @keydown.down.prevent="moveHighlight(1)"
        @keydown.up.prevent="moveHighlight(-1)"
        @keydown.enter.prevent="selectHighlighted"
        @keydown.esc="close"
      />
      <ul class="ss-list" ref="listEl">
        <li
          v-if="!filtered.length"
          class="ss-empty"
          role="alert"
        >{{ t('searchselect.empty') }}</li>
        <li
          v-for="(opt, idx) in filtered"
          :key="opt.value"
          class="ss-option"
          :class="{ selected: opt.value === modelValue, highlighted: idx === highlightIdx }"
          role="option"
          :aria-selected="opt.value === modelValue"
          @mousedown.prevent="select(opt)"
          @mousemove="highlightIdx = idx"
        >{{ opt.label?.[lang] || opt.label?.en || opt.value }}</li>
      </ul>
    </div>

    <span v-if="field.hint?.[lang]" class="hint">{{ field.hint[lang] }}</span>
  </div>
</template>

<script setup>
import { ref, computed, nextTick, onBeforeUnmount } from 'vue'
import { useTranslations } from '../../composables/useTranslations.js'

const props = defineProps({
  field: Object,
  lang: String,
  modelValue: String
})
const emit = defineEmits(['update:modelValue'])

const { t } = useTranslations()

const label    = computed(() => props.field.label?.[props.lang] || props.field.label?.en || props.field.id)
const options  = computed(() => props.field.options || [])

// ── Search & filter ────────────────────────────────────────────────────────

const query = ref('')

const filtered = computed(() => {
  const q = query.value.trim().toLowerCase()
  if (!q) return options.value
  return options.value.filter(opt => {
    const text = (opt.label?.[props.lang] || opt.label?.en || opt.value || '').toLowerCase()
    return text.includes(q)
  })
})

const selectedLabel = computed(() => {
  if (!props.modelValue) return ''
  const opt = options.value.find(o => o.value === props.modelValue)
  return opt ? (opt.label?.[props.lang] || opt.label?.en || opt.value) : props.modelValue
})

// ── Open / close ───────────────────────────────────────────────────────────

const root        = ref(null)
const searchInput = ref(null)
const listEl      = ref(null)
const isOpen      = ref(false)
const highlightIdx = ref(-1)

async function open() {
  if (isOpen.value) return
  isOpen.value = true
  query.value = ''
  highlightIdx.value = -1
  await nextTick()
  searchInput.value?.focus()
  const selIdx = filtered.value.findIndex(o => o.value === props.modelValue)
  if (selIdx >= 0) { highlightIdx.value = selIdx; scrollToHighlight() }
  document.addEventListener('mousedown', onOutside)
}

function close() {
  isOpen.value = false
  document.removeEventListener('mousedown', onOutside)
}

function onOutside(e) {
  if (!root.value?.contains(e.target)) close()
}

onBeforeUnmount(() => document.removeEventListener('mousedown', onOutside))

// ── Selection ──────────────────────────────────────────────────────────────

function select(opt) {
  emit('update:modelValue', opt.value)
  close()
}

function clear() {
  emit('update:modelValue', '')
}

// ── Keyboard navigation ────────────────────────────────────────────────────

function moveHighlight(dir) {
  const len = filtered.value.length
  if (!len) return
  highlightIdx.value = (highlightIdx.value + dir + len) % len
  scrollToHighlight()
}

function selectHighlighted() {
  const opt = filtered.value[highlightIdx.value]
  if (opt) select(opt)
}

function scrollToHighlight() {
  nextTick(() => {
    const li = listEl.value?.querySelectorAll('.ss-option')[highlightIdx.value]
    li?.scrollIntoView?.({ block: 'nearest' })
  })
}
</script>

<style scoped>
.field { display: flex; flex-direction: column; gap: 0.3rem; position: relative; }

label { font-size: var(--font-size-label); font-weight: 500; color: var(--color-text-muted); }
label.required::after { content: ' *'; color: var(--color-error); }

/* ── Trigger ── */
.ss-input-wrap {
  display: flex;
  align-items: center;
  padding: 0.45rem 0.75rem;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
  background: var(--color-surface);
  cursor: pointer;
  user-select: none;
  gap: 0.35rem;
  transition: border-color 0.2s;
  min-height: 2.2rem;
}
.ss-input-wrap.open,
.ss-input-wrap:hover { border-color: var(--color-primary); }
.ss-input-wrap.open  { box-shadow: var(--focus-ring); }
.ss-input-wrap:focus { outline: none; border-color: var(--color-primary); box-shadow: var(--focus-ring); }

.ss-value    { flex: 1; font-size: var(--font-size-base); color: var(--color-text); overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.ss-placeholder { flex: 1; font-size: var(--font-size-base); color: var(--color-text-subtle); }
.ss-caret    { font-size: 0.7rem; color: var(--color-text-subtle); flex-shrink: 0; }

.ss-clear {
  background: none;
  border: none;
  cursor: pointer;
  color: var(--color-text-subtle);
  font-size: 1rem;
  line-height: 1;
  padding: 0 0.1rem;
  flex-shrink: 0;
}
.ss-clear:hover { color: var(--color-error); }
.ss-clear:focus { outline: 2px solid var(--color-primary); outline-offset: 1px; border-radius: 2px; }

/* ── Panel ── */
.ss-panel {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  z-index: 200;
  background: var(--color-surface);
  border: 1px solid var(--color-primary);
  border-radius: var(--radius-sm);
  box-shadow: 0 4px 16px rgba(0,0,0,0.12);
  margin-top: 2px;
  display: flex;
  flex-direction: column;
  max-height: 280px;
}

.ss-search {
  padding: 0.5rem 0.75rem;
  border: none;
  border-bottom: 1px solid var(--color-border);
  font-size: var(--font-size-base);
  background: var(--color-surface-alt);
  outline: none;
  border-radius: var(--radius-sm) var(--radius-sm) 0 0;
  flex-shrink: 0;
}
.ss-search:focus { box-shadow: var(--focus-ring); }

.ss-list {
  list-style: none;
  margin: 0;
  padding: 0.25rem 0;
  overflow-y: auto;
  flex: 1;
}

.ss-option {
  padding: 0.45rem 0.85rem;
  font-size: var(--font-size-base);
  cursor: pointer;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.ss-option.highlighted { background: var(--color-primary-bg); }
.ss-option.selected    { font-weight: 600; color: var(--color-primary); }
.ss-option.selected.highlighted { background: var(--color-primary-bg); }

.ss-empty {
  padding: 0.6rem 0.85rem;
  font-size: var(--font-size-sm);
  color: var(--color-text-subtle);
  font-style: italic;
}

.hint { font-size: var(--font-size-sm); color: var(--color-text-subtle); }
</style>
