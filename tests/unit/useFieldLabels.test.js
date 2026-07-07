import { describe, it, expect } from 'vitest'
import { ref } from 'vue'
import { useFieldLabels } from '../../src/composables/useFieldLabels.js'

// ── useFieldLabels ────────────────────────────────────────────────────────────
describe('useFieldLabels', () => {
  it('resolves label from field.label[lang] when lang matches', () => {
    const field = ref({ id: 'myField', label: { de: 'Deutsch', en: 'English' } })
    const lang = ref('de')
    const { label } = useFieldLabels(field, lang)
    expect(label.value).toBe('Deutsch')
  })

  it('falls back to label.en when current lang is missing', () => {
    const field = ref({ id: 'myField', label: { en: 'English only' } })
    const lang = ref('de')
    const { label } = useFieldLabels(field, lang)
    expect(label.value).toBe('English only')
  })

  it('falls back to field.id when both lang and .en are missing', () => {
    const field = ref({ id: 'myField', label: { fr: 'Français' } })
    const lang = ref('de')
    const { label } = useFieldLabels(field, lang)
    expect(label.value).toBe('myField')
  })

  it('works with a plain object input (not a ref)', () => {
    const field = { id: 'plainField', label: { de: 'Einfach', en: 'Simple' } }
    const lang = 'de'
    const { label } = useFieldLabels(field, lang)
    expect(label.value).toBe('Einfach')
  })

  it('resolves placeholder from field.placeholder[lang]', () => {
    const field = ref({ placeholder: { de: 'Eingabe…', en: 'Enter…' } })
    const lang = ref('de')
    const { placeholder } = useFieldLabels(field, lang)
    expect(placeholder.value).toBe('Eingabe…')
  })

  it('resolves placeholder from a plain string via .en fallback', () => {
    const field = ref({ placeholder: { en: 'Enter…' } })
    const lang = ref('de')
    const { placeholder } = useFieldLabels(field, lang)
    expect(placeholder.value).toBe('Enter…')
  })

  it('resolves hint from field.hint[lang]', () => {
    const field = ref({ hint: { de: 'Hinweis', en: 'Hint' } })
    const lang = ref('de')
    const { hint } = useFieldLabels(field, lang)
    expect(hint.value).toBe('Hinweis')
  })

  it('returns empty string for hint when lang is missing and no fallback', () => {
    const field = ref({ hint: { en: 'Hint only' } })
    const lang = ref('de')
    const { hint } = useFieldLabels(field, lang)
    // hint only falls back to hint[lang], not .en — returns ''
    expect(hint.value).toBe('')
  })

  it('missing lang falls back to .en for label', () => {
    const field = ref({ id: 'f', label: { en: 'English label' } })
    const lang = ref('fr')
    const { label } = useFieldLabels(field, lang)
    expect(label.value).toBe('English label')
  })

  it('missing .en falls back to .id for label', () => {
    const field = ref({ id: 'fallbackId', label: {} })
    const lang = ref('de')
    const { label } = useFieldLabels(field, lang)
    expect(label.value).toBe('fallbackId')
  })
})
