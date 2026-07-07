<template>
  <section class="viewer-section">
    <h2 class="section-title">{{ section.label?.[lang] || section.label?.de || section.label?.en || section.id }}</h2>
    <FieldGroupView :fieldIds="section.fields" :fields="fields" :data="data" :lang="lang" />
  </section>
</template>

<script setup>
import FieldGroupView from './FieldGroupView.vue'

defineProps({
  section: { type: Object, required: true },
  fields: { type: Object, required: true },
  data: { type: Object, default: () => ({}) },
  lang: { type: String, default: 'de' }
})
</script>

<style scoped>
.viewer-section {
  background: var(--color-surface);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-card);
  padding: 1.5rem;
}

.section-title {
  font-size: var(--font-size-heading);
  font-weight: 600;
  color: var(--color-primary);
  margin-bottom: 1.2rem;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid var(--color-primary-bg);
}
</style>
