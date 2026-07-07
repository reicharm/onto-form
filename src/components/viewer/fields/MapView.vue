<template>
  <div class="map-view" v-if="modelValue">
    <div class="code-block">
      <code class="geo-code">{{ modelValue }}</code>
      <button class="copy-btn" @click="copyValue" :aria-label="t('btn.copy')">
        {{ copied ? t('export.copied') : t('btn.copy') }}
      </button>
    </div>
    <dl class="bbox-info" v-if="bbox">
      <dt>N</dt><dd>{{ bbox.maxLat }}°</dd>
      <dt>S</dt><dd>{{ bbox.minLat }}°</dd>
      <dt>E</dt><dd>{{ bbox.maxLon }}°</dd>
      <dt>W</dt><dd>{{ bbox.minLon }}°</dd>
    </dl>
  </div>
  <span v-else class="map-empty">—</span>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useTranslations } from '../../../composables/useTranslations.js'

const props = defineProps({
  field: { type: Object, required: true },
  modelValue: { required: true },
  lang: { type: String, required: true },
})

const { t } = useTranslations()
const copied = ref(false)

async function copyValue() {
  try {
    await navigator.clipboard.writeText(props.modelValue)
    copied.value = true
    setTimeout(() => { copied.value = false }, 2000)
  } catch {
    // clipboard not available
  }
}

// Extract bounding box from WKT POLYGON or BBOX strings
const bbox = computed(() => {
  const val = props.modelValue
  if (!val || typeof val !== 'string') return null
  // Try to extract all coordinate pairs (lon lat) from WKT
  const coords = [...val.matchAll(/(-?\d+(?:\.\d+)?)\s+(-?\d+(?:\.\d+)?)/g)]
  if (coords.length < 2) return null
  const lons = coords.map(m => parseFloat(m[1]))
  const lats = coords.map(m => parseFloat(m[2]))
  return {
    minLat: Math.min(...lats).toFixed(6),
    maxLat: Math.max(...lats).toFixed(6),
    minLon: Math.min(...lons).toFixed(6),
    maxLon: Math.max(...lons).toFixed(6),
  }
})
</script>

<style scoped>
.map-view {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}
.code-block {
  position: relative;
  background: var(--color-surface-alt);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
  padding: 0.5rem 0.75rem;
  padding-right: 9rem;
}
.geo-code {
  font-family: monospace;
  font-size: 0.8em;
  word-break: break-all;
  white-space: pre-wrap;
  display: block;
  color: var(--color-text);
}
.copy-btn {
  position: absolute;
  top: 0.4rem;
  right: 0.5rem;
  padding: 0.2rem 0.6rem;
  font-size: var(--font-size-sm);
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
  cursor: pointer;
  color: var(--color-text);
  white-space: nowrap;
}
.copy-btn:hover {
  border-color: var(--color-primary);
  color: var(--color-primary);
}
.bbox-info {
  display: grid;
  grid-template-columns: auto auto auto auto;
  gap: 0.2rem 0.75rem;
  margin: 0;
  font-size: var(--font-size-sm);
  background: var(--color-surface-alt);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
  padding: 0.4rem 0.75rem;
  width: fit-content;
}
.bbox-info dt {
  font-weight: 600;
  color: var(--color-text-muted);
}
.bbox-info dd {
  margin: 0;
  color: var(--color-text);
  font-variant-numeric: tabular-nums;
}
.map-empty {
  color: var(--color-text-muted);
}
</style>
