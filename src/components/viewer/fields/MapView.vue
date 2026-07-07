<template>
  <div class="map-view" v-if="modelValue">
    <div ref="mapEl" class="map-container"></div>
    <div class="map-footer">
      <dl class="bbox-info" v-if="bbox">
        <span class="bbox-label">{{ t('viewer.bounds') }}:</span>
        <dt>N</dt><dd>{{ bbox.maxLat }}°</dd>
        <dt>S</dt><dd>{{ bbox.minLat }}°</dd>
        <dt>E</dt><dd>{{ bbox.maxLon }}°</dd>
        <dt>W</dt><dd>{{ bbox.minLon }}°</dd>
      </dl>
      <button class="copy-btn" @click="copyWKT" :aria-label="t('viewer.copy-wkt')">
        {{ copied ? t('viewer.wkt-copied') : t('viewer.copy-wkt') }}
      </button>
    </div>
  </div>
  <span v-else class="map-empty">—</span>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount, watch } from 'vue'
import { useTranslations } from '../../../composables/useTranslations.js'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: new URL('leaflet/dist/images/marker-icon-2x.png', import.meta.url).href,
  iconUrl:       new URL('leaflet/dist/images/marker-icon.png',   import.meta.url).href,
  shadowUrl:     new URL('leaflet/dist/images/marker-shadow.png', import.meta.url).href,
})

const props = defineProps({
  field:      { type: Object, required: true },
  modelValue: { required: true },
  lang:       { type: String, required: true },
})

const { t } = useTranslations()
const copied = ref(false)
const mapEl  = ref(null)

let map   = null
let layer = null

const bbox = computed(() => {
  const val = props.modelValue
  if (!val || typeof val !== 'string') return null
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

function showWKT(wkt) {
  if (!map) return
  if (layer) { layer.remove(); layer = null }
  if (!wkt) return

  const match = wkt.match(/POLYGON\s*\(\(([^)]+)\)\)/i)
  if (match) {
    const latlngs = match[1].split(',').map(pair => {
      const [lng, lat] = pair.trim().split(/\s+/).map(Number)
      return [lat, lng]
    })
    layer = L.polygon(latlngs, { color: '#2878a8', weight: 2, fillOpacity: 0.15 }).addTo(map)
    map.fitBounds(layer.getBounds(), { padding: [20, 20] })
    return
  }

  // POINT(lon lat)
  const point = wkt.match(/POINT\s*\((-?\d+(?:\.\d+)?)\s+(-?\d+(?:\.\d+)?)\)/i)
  if (point) {
    const [, lon, lat] = point
    layer = L.circleMarker([parseFloat(lat), parseFloat(lon)], { radius: 8, color: '#2878a8' }).addTo(map)
    map.setView([parseFloat(lat), parseFloat(lon)], 10)
  }
}

onMounted(() => {
  map = L.map(mapEl.value, { zoomControl: true, attributionControl: true })
    .setView([47.5, 13.5], 5)

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    maxZoom: 19,
  }).addTo(map)

  if (props.modelValue) showWKT(props.modelValue)
})

watch(() => props.modelValue, val => showWKT(val))

onBeforeUnmount(() => { map?.remove(); map = null })

async function copyWKT() {
  try {
    await navigator.clipboard.writeText(props.modelValue)
    copied.value = true
    setTimeout(() => { copied.value = false }, 2000)
  } catch {
    // clipboard not available
  }
}
</script>

<style scoped>
.map-view {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.map-container {
  height: 300px;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
  z-index: 0;
}

.map-footer {
  display: flex;
  align-items: center;
  gap: 1rem;
  flex-wrap: wrap;
}

.bbox-info {
  display: flex;
  align-items: center;
  gap: 0.4rem 0.6rem;
  flex-wrap: wrap;
  margin: 0;
  font-size: var(--font-size-sm);
  background: var(--color-surface-alt);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
  padding: 0.3rem 0.75rem;
}

.bbox-label {
  font-weight: 600;
  color: var(--color-text-muted);
  margin-right: 0.25rem;
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

.copy-btn {
  margin-left: auto;
  padding: 0.25rem 0.7rem;
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

.map-empty {
  color: var(--color-text-muted);
}
</style>
