<template>
  <div class="onto-viewer ontoform">
    <div v-if="loading" class="viewer-loading">{{ t('viewer.loading') }}</div>
    <div v-if="viewError" class="viewer-error" role="alert">{{ viewError }}</div>
    <div v-if="viewConfig && resolvedData" class="viewer-content">
      <template v-for="section in viewConfig.sections" :key="section.id">
        <SectionView
          v-if="section.type === 'section'"
          :section="section"
          :fields="viewConfig.fields"
          :data="resolvedData"
          :lang="lang"
        />
        <TabsView
          v-else-if="section.type === 'tabs'"
          :section="section"
          :fields="viewConfig.fields"
          :data="resolvedData"
          :lang="lang"
        />
      </template>
    </div>
    <div v-else-if="!loading && !viewError" class="viewer-no-data">{{ t('viewer.no-data') }}</div>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted, provide } from 'vue'
import { useTranslations } from '../../composables/useTranslations.js'
import { ViewConfigResolver } from '../../services/ViewConfigResolver.js'
import { RDFImporter } from '../../services/RDFImporter.js'
import { assetUrl } from '../../config/ontoFormConfig.js'
import SectionView from './SectionView.vue'
import TabsView from './TabsView.vue'

const props = defineProps({
  standard: String,
  config: { type: Object, default: null },
  data: { type: Object, default: null },
  dataUrl: { type: String, default: null },
  dataFormat: { type: String, default: null },
  lang: { type: String, default: 'de' },
  labels: { type: Object, default: () => ({}) }
})

// ── Translations provide/inject (mirrors App.vue) ─────────────────────────
const allTranslations = ref({})

async function loadTranslations(l) {
  try {
    const res = await fetch(assetUrl(`translations/${l}.json`))
    if (!res.ok) return
    allTranslations.value = { ...allTranslations.value, [l]: await res.json() }
  } catch { /* translation files are optional */ }
}

const langRef = computed(() => props.lang)
provide('onto-form:lang', langRef)
provide('onto-form:translations', computed(() => allTranslations.value[props.lang] ?? {}))

const { t } = useTranslations()

// ── State ─────────────────────────────────────────────────────────────────
const loading = ref(false)
const viewError = ref(null)
const viewConfig = ref(null)
const resolvedData = ref(null)

// ── Config loading ─────────────────────────────────────────────────────────
async function loadConfig() {
  if (props.config) {
    viewConfig.value = props.config
    return
  }
  if (!props.standard) return
  loading.value = true
  viewError.value = null
  try {
    const resolver = new ViewConfigResolver()
    viewConfig.value = await resolver.resolve(props.standard, { translations: allTranslations.value })
  } catch (err) {
    viewError.value = t('viewer.error') + ': ' + err.message
  } finally {
    loading.value = false
  }
}

// ── Data loading ───────────────────────────────────────────────────────────
function detectFormat(contentType) {
  if (!contentType) return null
  if (contentType.includes('application/ld+json')) return 'jsonld'
  if (contentType.includes('text/turtle')) return 'turtle'
  if (contentType.includes('application/rdf+xml')) return 'rdfxml'
  return null
}

async function loadData() {
  if (props.data) {
    resolvedData.value = props.data
    return
  }
  if (!props.dataUrl) {
    resolvedData.value = null
    return
  }
  if (!viewConfig.value) return

  loading.value = true
  viewError.value = null
  try {
    const res = await fetch(props.dataUrl)
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    const text = await res.text()
    const format = props.dataFormat || detectFormat(res.headers.get('content-type'))
    const importer = new RDFImporter()
    if (format === 'turtle') {
      resolvedData.value = await importer.fromTurtle(text, viewConfig.value)
    } else if (format === 'rdfxml') {
      resolvedData.value = importer.fromRDFXML(text, viewConfig.value)
    } else {
      resolvedData.value = importer.fromJSONLD(text, viewConfig.value)
    }
  } catch (err) {
    viewError.value = t('viewer.error') + ': ' + err.message
  } finally {
    loading.value = false
  }
}

// ── Lifecycle ──────────────────────────────────────────────────────────────
onMounted(async () => {
  await loadTranslations(props.lang)
  await loadConfig()
  await loadData()
})

watch(() => props.lang, async (l) => {
  await loadTranslations(l)
})

watch(() => props.standard, async () => {
  await loadConfig()
  await loadData()
})

watch(() => props.config, async (cfg) => {
  viewConfig.value = cfg
  await loadData()
})

watch(() => props.data, (d) => {
  resolvedData.value = d
})

watch(() => props.dataUrl, async () => {
  await loadData()
})
</script>

<style scoped>
.onto-viewer {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.viewer-loading {
  text-align: center;
  padding: 2rem;
  color: var(--color-text-muted);
  font-style: italic;
}

.viewer-error {
  background: #fff3cd;
  border: 1px solid #ffc107;
  color: #7a5800;
  padding: 0.75rem 1.25rem;
  border-radius: var(--radius-sm);
  font-size: 0.9rem;
}

.viewer-content {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.viewer-no-data {
  text-align: center;
  padding: 2rem;
  color: var(--color-text-muted);
  font-style: italic;
}
</style>
