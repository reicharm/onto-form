<template>
  <div class="field">
    <label :class="{ required: field.required }">{{ label }}</label>
    <div class="items">
      <div v-for="(item, index) in items" :key="itemKeys[index] ?? index" class="item-row">
        <LangStringItem
          v-if="field.type === 'langstring'"
          :modelValue="item"
          :lang="lang"
          :placeholder="placeholder"
          @update:modelValue="updateItem(index, $event)"
        />
        <component
          v-else
          :is="innerComponent"
          :field="field"
          :lang="lang"
          :modelValue="item"
          @update:modelValue="updateItem(index, $event)"
        />
        <button type="button" class="btn-remove"
          :aria-label="lang === 'de' ? `Eintrag ${index + 1} aus ${label} entfernen` : `Remove item ${index + 1} from ${label}`"
          @click="removeItem(index)">×</button>
      </div>
    </div>
    <button type="button" class="btn-add" @click="addItem">
      + {{ lang === 'de' ? 'Hinzufügen' : 'Add' }}
    </button>
    <span v-if="field.hint?.[lang]" class="hint">{{ field.hint[lang] }}</span>
  </div>
</template>

<script setup>
import { computed, ref, watch } from 'vue'
import LangStringItem from './LangStringItem.vue'
import TextField from './TextField.vue'
import TextareaField from './TextareaField.vue'
import URIField from './URIField.vue'
import SelectField from './SelectField.vue'
import SearchSelectField from './SearchSelectField.vue'
import DateField from './DateField.vue'
import ObjectField from './ObjectField.vue'

const props = defineProps({
  field: Object,
  lang: String,
  modelValue: { type: Array, default: () => [] }
})
const emit = defineEmits(['update:modelValue'])

const label = computed(() => props.field.label?.[props.lang] || props.field.label?.en || props.field.id)
const placeholder = computed(() => props.field.placeholder?.[props.lang] || props.field.placeholder?.en || '')

const componentMap = {
  text:         TextField,
  textarea:     TextareaField,
  uri:          URIField,
  date:         DateField,
  select:       SelectField,
  searchselect: SearchSelectField,
  object:       ObjectField,
}

const innerComponent = computed(() => componentMap[props.field.type] || TextField)

const items = computed(() => {
  const val = props.modelValue
  if (Array.isArray(val)) return val.length ? val : [emptyItem()]
  if (val !== null && val !== undefined && val !== '') return [val]
  return [emptyItem()]
})

// Stable per-item keys so Vue doesn't reuse DOM nodes when splicing from the middle.
// Keys live only in component memory — never written into emitted data.
let _nextKey = 0
const itemKeys = ref([])

watch(items, (newItems) => {
  // Grow the key array to match; never shrink (handled in removeItem)
  while (itemKeys.value.length < newItems.length) {
    itemKeys.value.push(++_nextKey)
  }
}, { immediate: true })

function emptyItem() {
  if (props.field.type === 'langstring') return { value: '', lang: props.lang || 'de' }
  return ''
}

function updateItem(index, val) {
  const arr = Array.isArray(props.modelValue) ? [...props.modelValue] : []
  while (arr.length <= index) arr.push(emptyItem())
  arr[index] = val
  emit('update:modelValue', arr)
}

function addItem() {
  const base = Array.isArray(props.modelValue) && props.modelValue.length ? props.modelValue : [emptyItem()]
  emit('update:modelValue', [...base, emptyItem()])
}

function removeItem(index) {
  const arr = Array.isArray(props.modelValue) ? [...props.modelValue] : []
  arr.splice(index, 1)
  itemKeys.value.splice(index, 1)
  emit('update:modelValue', arr.length ? arr : [emptyItem()])
}
</script>

<style scoped>
.field { display: flex; flex-direction: column; gap: 0.3rem; }
label { font-size: var(--font-size-label); font-weight: 500; color: var(--color-text-muted); }
label.required::after { content: ' *'; color: var(--color-error); }
.items { display: flex; flex-direction: column; gap: 0.4rem; }
.item-row {
  display: flex;
  align-items: center;
  gap: 0.4rem;
}
.item-row :deep(.field) { flex: 1; margin: 0; }
/* Hide label and hint rendered by the inner field component — RepeatableField shows them once */
.item-row :deep(.field > label) { display: none; }
.item-row :deep(.field > .hint) { display: none; }
/* Full-width for regular inputs and selects, but NOT the protocol-select (URIField) or lang-select (LangStringItem) */
.item-row :deep(input) { width: 100%; }
.item-row :deep(select:not(.protocol-select):not(.lang-select)) { width: 100%; }
.btn-remove {
  background: var(--color-error);
  color: white;
  border: none;
  border-radius: var(--radius-sm);
  width: 1.6rem;
  height: 1.6rem;
  font-size: 1.1rem;
  line-height: 1;
  cursor: pointer;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}
.btn-remove:hover { background: var(--color-error-dark); }
.btn-remove:focus { outline: none; box-shadow: var(--focus-ring); }
.btn-add {
  background: var(--color-primary);
  color: white;
  border: none;
  border-radius: var(--radius-sm);
  padding: 0.35rem 0.8rem;
  font-size: var(--font-size-label);
  cursor: pointer;
  align-self: flex-start;
  margin-top: 0.2rem;
}
.btn-add:hover { background: var(--color-primary-dark); }
.btn-add:focus { outline: none; box-shadow: var(--focus-ring); }
.hint { font-size: var(--font-size-sm); color: var(--color-text-subtle); }
</style>
