<template>
  <div class="onto-viewer">
    <div v-for="group in visibleGroups" :key="group.id" class="viewer-group">
      <h3 class="viewer-group-title">{{ group.label[lang] ?? group.label.en ?? group.id }}</h3>
      <dl class="viewer-fields">
        <template v-for="fieldId in group.fields" :key="fieldId">
          <div v-if="config.fields[fieldId] && hasValue(config.fields[fieldId])" class="viewer-field">
            <dt class="viewer-label">{{ fieldLabel(config.fields[fieldId]) }}</dt>
            <dd class="viewer-value">
              <template v-if="config.fields[fieldId].type === 'distribution-editor'">
                <div
                  v-for="(dist, i) in asArray(modelValue[fieldId])"
                  :key="i"
                  class="viewer-distribution"
                >
                  <p v-if="dist['dct:title']" class="viewer-dist-title">{{ distText(dist['dct:title']) }}</p>
                  <p v-if="dist['dct:description']" class="viewer-dist-desc">{{ distText(dist['dct:description']) }}</p>
                  <div class="viewer-dist-links">
                    <a v-if="dist['dcat:downloadURL']" :href="String(dist['dcat:downloadURL'])" target="_blank" rel="noopener" class="viewer-link">
                      {{ lang === 'de' ? 'Download' : 'Download' }}
                    </a>
                    <a v-else-if="dist['dcat:accessURL']" :href="String(dist['dcat:accessURL'])" target="_blank" rel="noopener" class="viewer-link">
                      {{ lang === 'de' ? 'Zugang' : 'Access' }}
                    </a>
                    <span v-if="dist['dct:format']" class="viewer-format">{{ distText(dist['dct:format']) }}</span>
                  </div>
                </div>
              </template>
              <template v-else-if="config.fields[fieldId].type === 'langstring'">
                <span
                  v-for="(item, i) in langstringValues(fieldId)"
                  :key="i"
                  class="viewer-langstring"
                >{{ item }}</span>
              </template>
              <template v-else-if="config.fields[fieldId].type === 'uri'">
                <span v-for="(v, i) in asArray(modelValue[fieldId])" :key="i">
                  <a v-if="isURL(String(v))" :href="String(v)" target="_blank" rel="noopener" class="viewer-uri">{{ String(v) }}</a>
                  <span v-else class="viewer-text">{{ String(v) }}</span>
                </span>
              </template>
              <template v-else-if="config.fields[fieldId].multiple">
                <span v-for="(v, i) in asArray(modelValue[fieldId])" :key="i" class="viewer-tag">
                  {{ resolveOption(config.fields[fieldId], String(v)) }}
                </span>
              </template>
              <template v-else>
                <span class="viewer-text">{{ resolveOption(config.fields[fieldId], scalar(modelValue[fieldId])) }}</span>
              </template>
            </dd>
          </div>
        </template>
      </dl>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  config: { type: Object, required: true },
  modelValue: { type: Object, default: () => ({}) },
  lang: { type: String, default: 'en' },
})

const visibleGroups = computed(() =>
  (props.config?.groups ?? []).filter(g => g.visible !== false)
)

function fieldLabel(field) {
  return field.label?.[props.lang] ?? field.label?.en ?? field.id
}

function hasValue(field) {
  const v = props.modelValue[field.id]
  if (v === undefined || v === null || v === '') return false
  if (Array.isArray(v)) return v.length > 0
  return true
}

function asArray(v) {
  if (v === undefined || v === null) return []
  return Array.isArray(v) ? v : [v]
}

function scalar(v) {
  if (Array.isArray(v)) return String(v[0] ?? '')
  return String(v ?? '')
}

function langstringValues(fieldId) {
  const items = asArray(props.modelValue[fieldId])
  // prefer current lang, fall back to all
  const inLang = items.filter(i => i?.lang === props.lang).map(i => i?.value ?? String(i))
  return inLang.length > 0 ? inLang : items.map(i => i?.value ?? String(i))
}

function isURL(s) {
  return /^https?:\/\//.test(s)
}

function resolveOption(field, value) {
  if (!value) return ''
  const opt = field.options?.find(o => o.value === value)
  if (opt) return opt.label?.[props.lang] ?? opt.label?.en ?? value
  return value
}

function distText(v) {
  if (!v) return ''
  if (typeof v === 'string') return v
  if (typeof v === 'object') {
    return v[props.lang] ?? v.en ?? v.de ?? Object.values(v)[0] ?? ''
  }
  return String(v)
}
</script>

<style scoped>
.onto-viewer {
  font-family: inherit;
  color: inherit;
}

.viewer-group {
  margin-bottom: 2rem;
}

.viewer-group-title {
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--viewer-heading-color, #6b7280);
  margin-bottom: 0.75rem;
  padding-bottom: 0.4rem;
  border-bottom: 1px solid var(--viewer-border-color, #e5e7eb);
}

.viewer-fields {
  display: grid;
  row-gap: 0.75rem;
}

.viewer-field {
  display: grid;
  grid-template-columns: 10rem 1fr;
  gap: 0.5rem;
  align-items: baseline;
}

@media (max-width: 600px) {
  .viewer-field {
    grid-template-columns: 1fr;
  }
}

.viewer-label {
  font-size: 0.8rem;
  font-weight: 500;
  color: var(--viewer-label-color, #374151);
}

.viewer-value {
  font-size: 0.875rem;
  color: var(--viewer-value-color, #111827);
  display: flex;
  flex-wrap: wrap;
  gap: 0.35rem;
  align-items: center;
}

.viewer-text {
  white-space: pre-wrap;
}

.viewer-langstring {
  display: block;
  white-space: pre-wrap;
}

.viewer-uri {
  color: var(--viewer-link-color, #2563eb);
  text-decoration: none;
  word-break: break-all;
}
.viewer-uri:hover {
  text-decoration: underline;
}

.viewer-tag {
  display: inline-block;
  background: var(--viewer-tag-bg, #f3f4f6);
  color: var(--viewer-tag-color, #374151);
  border-radius: 9999px;
  padding: 0.1rem 0.6rem;
  font-size: 0.75rem;
}

/* Distribution card */
.viewer-distribution {
  border: 1px solid var(--viewer-border-color, #e5e7eb);
  border-radius: 0.5rem;
  padding: 0.75rem 1rem;
  margin-bottom: 0.5rem;
  width: 100%;
}

.viewer-dist-title {
  font-weight: 500;
  font-size: 0.875rem;
  margin-bottom: 0.25rem;
}

.viewer-dist-desc {
  font-size: 0.8rem;
  color: var(--viewer-label-color, #6b7280);
  margin-bottom: 0.5rem;
}

.viewer-dist-links {
  display: flex;
  gap: 0.5rem;
  align-items: center;
  flex-wrap: wrap;
}

.viewer-link {
  display: inline-block;
  background: var(--viewer-link-bg, #2563eb);
  color: #fff;
  padding: 0.2rem 0.75rem;
  border-radius: 0.375rem;
  font-size: 0.75rem;
  text-decoration: none;
  transition: opacity 0.15s;
}
.viewer-link:hover {
  opacity: 0.85;
}

.viewer-format {
  font-size: 0.75rem;
  background: var(--viewer-tag-bg, #f3f4f6);
  color: var(--viewer-tag-color, #374151);
  padding: 0.1rem 0.5rem;
  border-radius: 0.25rem;
}
</style>
