<template>
  <div class="field map-field">
    <div class="map-label">{{ label }}</div>
    <div class="map-toolbar">
      <button
        :class="['tool-btn', { active: drawMode === 'rectangle' }]"
        @click="activateDraw('rectangle')"
        :title="t('map.btn.rectangle')"
      >▭ {{ t('map.btn.rectangle') }}</button>
      <button
        :class="['tool-btn', { active: drawMode === 'polygon' }]"
        @click="activateDraw('polygon')"
        :title="t('map.btn.polygon')"
      >⬡ {{ t('map.btn.polygon') }}</button>
      <button
        v-if="modelValue"
        class="tool-btn tool-btn--clear"
        @click="clearShape"
      >✕ {{ t('map.btn.clear') }}</button>
    </div>
    <div ref="mapEl" class="map-container"></div>
    <div v-if="modelValue" class="map-wkt">
      <span class="map-wkt-label">WKT:</span>
      <code>{{ modelValue }}</code>
    </div>
    <div v-if="drawMode" class="map-hint">
      <template v-if="drawMode === 'rectangle'">
        {{ t('map.hint.rectangle') }}
      </template>
      <template v-else>
        {{ t('map.hint.polygon') }}
      </template>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount, watch } from 'vue'
import { useTranslations } from '../../composables/useTranslations.js'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import '@geoman-io/leaflet-geoman-free'
import '@geoman-io/leaflet-geoman-free/dist/leaflet-geoman.css'

// Fix Leaflet default marker icons broken by bundlers
delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: new URL('leaflet/dist/images/marker-icon-2x.png', import.meta.url).href,
  iconUrl:       new URL('leaflet/dist/images/marker-icon.png',   import.meta.url).href,
  shadowUrl:     new URL('leaflet/dist/images/marker-shadow.png', import.meta.url).href,
})

const props = defineProps({
  field: Object,
  lang: String,
  modelValue: { type: String, default: '' },
})
const emit = defineEmits(['update:modelValue'])

const { t } = useTranslations()

const label   = computed(() => props.field.label?.[props.lang] || props.field.label?.en || props.field.id)
const mapEl   = ref(null)
const drawMode = ref(null)

let map = null
let drawnLayer = null

onMounted(() => {
  map = L.map(mapEl.value).setView([47.5, 13.5], 6)

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    maxZoom: 19,
  }).addTo(map)

  map.pm.setLang(props.lang === 'de' ? 'de' : 'en')

  map.on('pm:create', e => {
    if (drawnLayer) drawnLayer.remove()
    drawnLayer = e.layer
    map.pm.disableDraw()
    drawMode.value = null
    emit('update:modelValue', layerToWKT(e.layer))
  })

  if (props.modelValue) showWKT(props.modelValue)
})

watch(() => props.modelValue, val => {
  if (drawnLayer) { drawnLayer.remove(); drawnLayer = null }
  if (val) showWKT(val)
})

onBeforeUnmount(() => { map?.remove() })

function activateDraw(mode) {
  if (drawMode.value === mode) {
    map.pm.disableDraw()
    drawMode.value = null
    return
  }
  drawMode.value = mode
  if (mode === 'rectangle') {
    map.pm.enableDraw('Rectangle', { snappable: false })
  } else {
    map.pm.enableDraw('Polygon', { snappable: false })
  }
}

function clearShape() {
  if (drawnLayer) { drawnLayer.remove(); drawnLayer = null }
  map.pm.disableDraw()
  drawMode.value = null
  emit('update:modelValue', '')
}

// ── WKT helpers ─────────────────────────────────────────────────────────────

function layerToWKT(layer) {
  const latlngs = layer.getLatLngs()
  // Rectangles/Polygons: [[points]] or [[[points]]]
  const ring = Array.isArray(latlngs[0]) ? latlngs[0] : latlngs[0][0] ?? latlngs
  const coords = (Array.isArray(ring[0]) ? ring[0] : ring)
    .map(p => `${p.lng.toFixed(6)} ${p.lat.toFixed(6)}`)
  // Close ring
  const first = coords[0]
  const closed = coords[coords.length - 1] === first ? coords : [...coords, first]
  return `POLYGON((${closed.join(', ')}))`
}

function showWKT(wkt) {
  const match = wkt.match(/POLYGON\s*\(\(([^)]+)\)\)/i)
  if (!match) return
  const latlngs = match[1].split(',').map(pair => {
    const [lng, lat] = pair.trim().split(/\s+/).map(Number)
    return [lat, lng]
  })
  drawnLayer = L.polygon(latlngs, { color: '#2878a8' }).addTo(map)
  map.fitBounds(drawnLayer.getBounds(), { padding: [20, 20] })
}
</script>

<style scoped>
.field { display: flex; flex-direction: column; gap: 0.4rem; }

.map-label {
  font-size: var(--font-size-label);
  font-weight: 600;
  color: var(--color-text-muted);
}

.map-toolbar {
  display: flex;
  gap: 0.4rem;
  flex-wrap: wrap;
}

.tool-btn {
  padding: 0.3rem 0.8rem;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
  background: var(--color-surface);
  color: var(--color-text);
  cursor: pointer;
  font-size: 0.82rem;
}
.tool-btn:hover { background: var(--color-primary-bg); }
.tool-btn.active { background: var(--color-primary); color: #fff; border-color: var(--color-primary); }
.tool-btn--clear { color: var(--color-error); border-color: var(--color-error); }
.tool-btn--clear:hover { background: #fdf0f0; }

.map-container {
  height: 340px;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
  z-index: 0;
}

.map-hint {
  font-size: 0.78rem;
  color: var(--color-text-muted);
  font-style: italic;
}

.map-wkt {
  font-size: 0.75rem;
  color: var(--color-text-muted);
  word-break: break-all;
  background: #f8f9fa;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
  padding: 0.4rem 0.6rem;
}
.map-wkt-label {
  font-weight: 600;
  margin-right: 0.4rem;
}
</style>
