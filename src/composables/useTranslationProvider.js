import { ref, computed, provide } from 'vue'
import { assetUrl } from '../config/ontoFormConfig.js'

export function useTranslationProvider(langRef) {
  const allTranslations = ref({})

  async function loadTranslations(l) {
    try {
      const res = await fetch(assetUrl(`translations/${l}.json`))
      if (!res.ok) return
      allTranslations.value = { ...allTranslations.value, [l]: await res.json() }
    } catch { /* translation files are optional */ }
  }

  provide('onto-form:lang', langRef)
  provide('onto-form:translations', computed(() => allTranslations.value[langRef.value] ?? {}))

  return { allTranslations, loadTranslations }
}
