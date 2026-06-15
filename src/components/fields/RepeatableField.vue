<template>
  <div class="field">
    <label :class="{ required: field.required }">{{ label }}</label>
    <div class="items">
      <div v-for="(item, index) in items" :key="index" class="item-row">
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
        <button type="button" class="btn-remove" @click="removeItem(index)" title="Entfernen / Remove">×</button>
      </div>
    </div>
    <button type="button" class="btn-add" @click="addItem">
      + {{ lang === 'de' ? 'Hinzufügen' : 'Add' }}
    </button>
    <span v-if="field.hint?.[lang]" class="hint">{{ field.hint[lang] }}</span>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import LangStringItem from './LangStringItem.vue'
import TextField from './TextField.vue'
import URIField from './URIField.vue'
import SelectField from './SelectField.vue'

const props = defineProps({
  field: Object,
  lang: String,
  modelValue: { type: Array, default: () => [] }
})
const emit = defineEmits(['update:modelValue'])

const label = computed(() => props.field.label?.[props.lang] || props.field.label?.en || props.field.id)
const placeholder = computed(() => props.field.placeholder?.[props.lang] || props.field.placeholder?.en || '')

const componentMap = {
  uri: URIField,
  select: SelectField,
  text: TextField
}

const innerComponent = computed(() => componentMap[props.field.type] || TextField)

const items = computed(() => props.modelValue?.length ? props.modelValue : [emptyItem()])

function emptyItem() {
  if (props.field.type === 'langstring') return { value: '', lang: props.lang || 'de' }
  return ''
}

function updateItem(index, val) {
  const arr = [...(props.modelValue || [])]
  while (arr.length <= index) arr.push(emptyItem())
  arr[index] = val
  emit('update:modelValue', arr)
}

function addItem() {
  emit('update:modelValue', [...(props.modelValue || [emptyItem()]), emptyItem()])
}

function removeItem(index) {
  const arr = [...(props.modelValue || [])]
  arr.splice(index, 1)
  emit('update:modelValue', arr.length ? arr : [emptyItem()])
}
</script>

<style scoped>
.field { display: flex; flex-direction: column; gap: 0.3rem; }
label { font-size: 0.85rem; font-weight: 500; color: #555; }
label.required::after { content: ' *'; color: #c0392b; }
.items { display: flex; flex-direction: column; gap: 0.4rem; }
.item-row {
  display: flex;
  align-items: center;
  gap: 0.4rem;
}
.item-row :deep(.field) { flex: 1; margin: 0; }
.item-row :deep(input),
.item-row :deep(select) { width: 100%; }
.btn-remove {
  background: #c0392b;
  color: white;
  border: none;
  border-radius: 4px;
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
.btn-remove:hover { background: #a93226; }
.btn-add {
  background: #2c5f8a;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 0.35rem 0.8rem;
  font-size: 0.85rem;
  cursor: pointer;
  align-self: flex-start;
  margin-top: 0.2rem;
}
.btn-add:hover { background: #1e4468; }
.hint { font-size: 0.78rem; color: #888; }
</style>
