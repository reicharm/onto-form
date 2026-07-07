<template>
  <div class="distribution-view">
    <div v-if="!items.length" class="no-distributions">—</div>
    <div v-for="(dist, i) in items" :key="i" class="dist-card">
      <div class="dist-title">{{ resolveTitle(dist) || `Distribution ${i + 1}` }}</div>

      <div class="dist-links">
        <a
          v-if="dist['dcat:accessURL']"
          :href="dist['dcat:accessURL']"
          target="_blank"
          rel="noopener noreferrer"
          class="dist-link"
        >
          <span class="link-label">{{ t('dist.field.access-url') }}</span>
          {{ dist['dcat:accessURL'] }}
        </a>
        <a
          v-if="dist['dcat:downloadURL']"
          :href="dist['dcat:downloadURL']"
          target="_blank"
          rel="noopener noreferrer"
          class="dist-link"
        >
          <span class="link-label">{{ t('dist.field.download-url') }}</span>
          {{ dist['dcat:downloadURL'] }}
        </a>
      </div>

      <div class="dist-badges" v-if="dist['dct:format'] || dist['dcat:mediaType']">
        <span v-if="dist['dct:format']" class="badge">{{ dist['dct:format'] }}</span>
        <span v-if="dist['dcat:mediaType']" class="badge badge--secondary">{{ dist['dcat:mediaType'] }}</span>
      </div>

      <dl class="dist-meta" v-if="hasMeta(dist)">
        <template v-if="dist['dct:license']">
          <dt>{{ t('dist.field.license') }}</dt>
          <dd>{{ dist['dct:license'] }}</dd>
        </template>
        <template v-if="dist['dcatap:availability']">
          <dt>{{ t('dist.field.availability') }}</dt>
          <dd>{{ dist['dcatap:availability'] }}</dd>
        </template>
        <template v-if="dist['dct:issued']">
          <dt>{{ t('dist.field.issued') }}</dt>
          <dd>{{ formatDate(dist['dct:issued']) }}</dd>
        </template>
        <template v-if="dist['dct:modified']">
          <dt>{{ t('dist.field.modified') }}</dt>
          <dd>{{ formatDate(dist['dct:modified']) }}</dd>
        </template>
      </dl>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useTranslations } from '../../../composables/useTranslations.js'

const props = defineProps({
  field: { type: Object, required: true },
  modelValue: { required: true },
  lang: { type: String, required: true },
})

const { t } = useTranslations()

const items = computed(() =>
  Array.isArray(props.modelValue) ? props.modelValue.filter(Boolean) : []
)

function resolveTitle(dist) {
  const title = dist['dct:title']
  if (!title) return ''
  if (typeof title === 'string') return title
  if (typeof title === 'object' && !Array.isArray(title)) {
    return title[props.lang] || title.de || title.en || Object.values(title)[0] || ''
  }
  if (Array.isArray(title)) {
    const match = title.find(t => t.lang === props.lang)
    return (match || title[0])?.value || ''
  }
  return String(title)
}

function formatDate(val) {
  if (!val) return ''
  try {
    const d = new Date(val)
    if (isNaN(d.getTime())) return val
    const locale = props.lang === 'de' ? 'de-AT' : 'en-GB'
    return d.toLocaleDateString(locale, { year: 'numeric', month: 'long', day: 'numeric' })
  } catch {
    return val
  }
}

function hasMeta(dist) {
  return dist['dct:license'] || dist['dcatap:availability'] || dist['dct:issued'] || dist['dct:modified']
}
</script>

<style scoped>
.distribution-view {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}
.no-distributions {
  color: var(--color-text-muted);
  font-style: italic;
}
.dist-card {
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
  padding: 0.75rem 1rem;
  background: var(--color-surface);
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}
.dist-title {
  font-weight: 600;
  color: var(--color-text);
}
.dist-links {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}
.dist-link {
  font-size: var(--font-size-sm);
  color: var(--color-primary);
  text-decoration: none;
  word-break: break-all;
}
.dist-link:hover {
  text-decoration: underline;
}
.link-label {
  font-weight: 500;
  color: var(--color-text-muted);
  margin-right: 0.4rem;
  font-style: normal;
}
.dist-badges {
  display: flex;
  flex-wrap: wrap;
  gap: 0.35rem;
}
.badge {
  background: var(--color-surface-alt);
  border: 1px solid var(--color-border);
  border-radius: 12px;
  padding: 0.1rem 0.55rem;
  font-size: var(--font-size-sm);
  color: var(--color-text);
}
.badge--secondary {
  border-color: var(--color-primary);
  color: var(--color-primary);
}
.dist-meta {
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 0.15rem 0.6rem;
  margin: 0;
  font-size: var(--font-size-sm);
}
.dist-meta dt {
  color: var(--color-text-muted);
  font-weight: 500;
  white-space: nowrap;
}
.dist-meta dd {
  margin: 0;
  color: var(--color-text);
  word-break: break-word;
}
</style>
