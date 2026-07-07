<template>
  <div class="object-view" v-if="modelValue && typeof modelValue === 'object'">
    <template v-for="sf in visibleSubFields" :key="sf.id">
      <div class="sub-row">
        <div class="sub-label">{{ sf.label?.[lang] || sf.label?.de || sf.label?.en || sf.id }}</div>
        <div class="sub-value">
          <component
            :is="subComponent(sf)"
            :field="sf"
            :modelValue="modelValue[sf.id]"
            :lang="lang"
          />
        </div>
      </div>
    </template>
  </div>
  <span v-else>{{ modelValue }}</span>
</template>

<script setup>
import { computed } from 'vue'
import TextView from './TextView.vue'
import DateView from './DateView.vue'
import URIView from './URIView.vue'
import MapView from './MapView.vue'
import LangStringView from './LangStringView.vue'
import SelectView from './SelectView.vue'

const props = defineProps({
  field:      { type: Object, required: true },
  modelValue: { required: true },
  lang:       { type: String, required: true },
})

const componentMap = {
  text:         TextView,
  textarea:     TextView,
  date:         DateView,
  uri:          URIView,
  map:          MapView,
  langstring:   LangStringView,
  select:       SelectView,
  searchselect: SelectView,
}

function subComponent(sf) {
  return componentMap[sf.type] ?? TextView
}

const visibleSubFields = computed(() => {
  const raw = props.field.subFields
  const arr = Array.isArray(raw) ? raw : (raw && typeof raw === 'object' ? Object.values(raw) : [])
  return arr.filter(sf => {
    const val = props.modelValue?.[sf.id]
    return val !== undefined && val !== null && val !== ''
  })
})
</script>

<style scoped>
.object-view {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.sub-row {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.sub-label {
  font-size: var(--font-size-sm);
  color: var(--color-text-muted);
  font-weight: 600;
}

.sub-value {
  word-break: break-word;
  color: var(--color-text);
}

.sub-link {
  color: var(--color-primary);
  text-decoration: none;
  word-break: break-all;
}
.sub-link:hover {
  text-decoration: underline;
}
</style>
