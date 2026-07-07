<template>
  <div class="langstring-view">
    <!-- Array of { value, lang } objects -->
    <template v-if="Array.isArray(modelValue)">
      <template v-if="currentLangItems.length">
        <div v-for="(item, i) in currentLangItems" :key="i" class="langstring-item">
          <span class="langstring-value">{{ item.value }}</span>
        </div>
        <!-- Show other-lang entries if they differ -->
        <div v-for="(item, i) in otherLangItems" :key="'other-' + i" class="langstring-item muted">
          <span class="langstring-value">{{ item.value }}</span>
          <span class="langstring-lang">({{ item.lang }})</span>
        </div>
      </template>
      <template v-else>
        <div v-for="(item, i) in modelValue" :key="i" class="langstring-item">
          <span class="langstring-value">{{ item.value }}</span>
          <span class="langstring-lang" v-if="item.lang">({{ item.lang }})</span>
        </div>
      </template>
    </template>

    <!-- Object { de: "...", en: "..." } -->
    <template v-else-if="modelValue && typeof modelValue === 'object'">
      <span class="langstring-value">{{ primaryValue }}</span>
      <template v-if="showOtherLangs">
        <div v-for="(val, lk) in otherValues" :key="lk" class="langstring-item muted">
          <span class="langstring-value">{{ val }}</span>
          <span class="langstring-lang">({{ lk }})</span>
        </div>
      </template>
    </template>

    <span v-else>{{ modelValue }}</span>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { resolveLangValue } from '../../../utils/resolveLangValue.js'

const props = defineProps({
  field: { type: Object, required: true },
  modelValue: { required: true },
  lang: { type: String, required: true },
})

// Array form helpers
const currentLangItems = computed(() =>
  Array.isArray(props.modelValue)
    ? props.modelValue.filter(i => i.lang === props.lang)
    : []
)
const otherLangItems = computed(() =>
  Array.isArray(props.modelValue)
    ? props.modelValue.filter(i => i.lang !== props.lang)
    : []
)

// Object form helpers
const primaryValue = computed(() => {
  const mv = props.modelValue
  if (!mv || typeof mv !== 'object') return ''
  return resolveLangValue(mv, props.lang)
})
const otherValues = computed(() => {
  const mv = props.modelValue
  if (!mv || typeof mv !== 'object') return {}
  const primary = primaryValue.value
  return Object.fromEntries(
    Object.entries(mv).filter(([lk, v]) => lk !== props.lang && v && v !== primary)
  )
})
const showOtherLangs = computed(() => Object.keys(otherValues.value).length > 0)
</script>

<style scoped>
.langstring-view {
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
}
.langstring-item {
  display: flex;
  gap: 0.4rem;
  align-items: baseline;
}
.langstring-value {
  word-break: break-word;
  color: var(--color-text);
}
.langstring-lang {
  font-size: var(--font-size-sm);
  color: var(--color-text-muted);
}
.muted .langstring-value {
  color: var(--color-text-muted);
  font-size: var(--font-size-sm);
}
</style>
