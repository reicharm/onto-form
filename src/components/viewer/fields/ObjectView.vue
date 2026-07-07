<template>
  <dl class="object-view" v-if="modelValue && typeof modelValue === 'object'">
    <template v-for="sf in visibleSubFields" :key="sf.id">
      <dt class="sub-label">{{ sf.label?.[lang] || sf.label?.de || sf.label?.en || sf.id }}</dt>
      <dd class="sub-value">
        <a
          v-if="sf.type === 'uri'"
          :href="modelValue[sf.id]"
          target="_blank"
          rel="noopener noreferrer"
          class="sub-link"
        >{{ modelValue[sf.id] }}</a>
        <span v-else>{{ modelValue[sf.id] }}</span>
      </dd>
    </template>
  </dl>
  <span v-else>{{ modelValue }}</span>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  field: { type: Object, required: true },
  modelValue: { required: true },
  lang: { type: String, required: true },
})

const visibleSubFields = computed(() =>
  (props.field.subFields || []).filter(sf => {
    const val = props.modelValue?.[sf.id]
    return val !== undefined && val !== null && val !== ''
  })
)
</script>

<style scoped>
.object-view {
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 0.2rem 0.75rem;
  align-items: baseline;
  margin: 0;
}
.sub-label {
  font-size: var(--font-size-sm);
  color: var(--color-text-muted);
  font-weight: 500;
  white-space: nowrap;
}
.sub-value {
  word-break: break-word;
  color: var(--color-text);
  margin: 0;
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
