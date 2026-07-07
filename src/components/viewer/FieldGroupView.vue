<template>
  <dl class="field-group-view">
    <template v-for="fieldId in fieldIds" :key="fieldId">
      <template v-if="resolvedField(fieldId)">
        <dt class="field-label">{{ fieldLabel(resolvedField(fieldId)) }}</dt>
        <dd class="field-value">
          <!-- multiple non-collection fields: one component per item -->
          <template v-if="shouldIterateMultiple(resolvedField(fieldId))">
            <component
              :is="fieldComponent(resolvedField(fieldId))"
              v-for="(item, i) in data[fieldId]"
              :key="i"
              :field="resolvedField(fieldId)"
              :modelValue="item"
              :lang="lang"
              class="field-item"
            />
          </template>
          <!-- single or collection-aware component -->
          <component
            v-else
            :is="fieldComponent(resolvedField(fieldId))"
            :field="resolvedField(fieldId)"
            :modelValue="data[fieldId]"
            :lang="lang"
          />
        </dd>
      </template>
    </template>
  </dl>
</template>

<script setup>
import { computed } from 'vue'
import { useFieldLabels } from '../../composables/useFieldLabels.js'
import TextView from './fields/TextView.vue'
import DateView from './fields/DateView.vue'
import URIView from './fields/URIView.vue'
import SelectView from './fields/SelectView.vue'
import MultiSelectView from './fields/MultiSelectView.vue'
import LangStringView from './fields/LangStringView.vue'
import ObjectView from './fields/ObjectView.vue'
import DistributionView from './fields/DistributionView.vue'
import MapView from './fields/MapView.vue'

const props = defineProps({
  fieldIds: { type: Array, required: true },
  fields: { type: Object, required: true },
  data: { type: Object, default: () => ({}) },
  lang: { type: String, default: 'de' }
})

const COLLECTION_TYPES = new Set(['multiselect', 'distribution-editor', 'object', 'langstring'])

const componentMap = {
  textarea: TextView,
  text: TextView,
  date: DateView,
  uri: URIView,
  select: SelectView,
  multiselect: MultiSelectView,
  searchselect: SelectView,
  langstring: LangStringView,
  object: ObjectView,
  'distribution-editor': DistributionView,
  map: MapView,
}

function fieldComponent(field) {
  return componentMap[field.type] || TextView
}

function fieldLabel(field) {
  const { label } = useFieldLabels(field, props.lang)
  return label.value
}

function hasValue(val) {
  if (val == null || val === '') return false
  if (Array.isArray(val)) return val.some(item => item != null && item !== '')
  return true
}

function resolvedField(fieldId) {
  const field = props.fields[fieldId]
  if (!field || field.visible === false) return null
  if (!hasValue(props.data?.[fieldId])) return null
  return field
}

function shouldIterateMultiple(field) {
  if (!field || !field.multiple) return false
  return !COLLECTION_TYPES.has(field.type)
}
</script>

<style scoped>
.field-group-view {
  display: grid;
  grid-template-columns: minmax(160px, 220px) 1fr;
  gap: 0.6rem 1.25rem;
  align-items: baseline;
}

.field-label {
  font-size: var(--font-size-label, 0.82rem);
  font-weight: 600;
  color: var(--color-text-muted);
  padding-top: 0.15rem;
}

.field-value {
  font-size: 0.9rem;
  color: var(--color-text);
  word-break: break-word;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.field-item + .field-item {
  border-top: 1px solid var(--color-border);
  padding-top: 0.25rem;
}
</style>
