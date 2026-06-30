import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import RepeatableField from '../../src/components/fields/RepeatableField.vue'

function makeWrapper(props = {}) {
  return mount(RepeatableField, {
    props: {
      field: { id: 'dcat:keyword', type: 'text', label: { de: 'Schlagwort', en: 'Keyword' } },
      lang: 'de',
      modelValue: [],
      ...props
    }
  })
}

describe('RepeatableField', () => {
  it('renders one empty item row when modelValue is an empty array', () => {
    const w = makeWrapper({ modelValue: [] })
    expect(w.findAll('.item-row')).toHaveLength(1)
  })

  it('does not split a plain string modelValue into characters', () => {
    const w = makeWrapper({ modelValue: 'hello' })
    const rows = w.findAll('.item-row')
    expect(rows).toHaveLength(1)
    expect(w.find('input').element.value).toBe('hello')
  })

  it('treats a non-array, non-empty modelValue as a single item', () => {
    const w = makeWrapper({ modelValue: 'single-value' })
    expect(w.findAll('.item-row')).toHaveLength(1)
  })

  it('addItem appends an empty string item for text fields', async () => {
    const w = makeWrapper({ modelValue: ['a'] })
    await w.find('.btn-add').trigger('click')
    const emitted = w.emitted('update:modelValue')
    expect(emitted[0][0]).toEqual(['a', ''])
  })

  it('addItem appends an empty {value, lang} item for langstring fields', async () => {
    const w = makeWrapper({
      field: { id: 'dct:title', type: 'langstring', label: { de: 'Titel', en: 'Title' } },
      modelValue: [{ value: 'a', lang: 'de' }]
    })
    await w.find('.btn-add').trigger('click')
    const emitted = w.emitted('update:modelValue')
    expect(emitted[0][0]).toEqual([{ value: 'a', lang: 'de' }, { value: '', lang: 'de' }])
  })

  it('removeItem removes the item at the given index', async () => {
    const w = makeWrapper({ modelValue: ['a', 'b', 'c'] })
    await w.findAll('.btn-remove')[1].trigger('click')
    const emitted = w.emitted('update:modelValue')
    expect(emitted[0][0]).toEqual(['a', 'c'])
  })

  it('removeItem on the last remaining item resets to a single empty item', async () => {
    const w = makeWrapper({ modelValue: ['a'] })
    await w.find('.btn-remove').trigger('click')
    const emitted = w.emitted('update:modelValue')
    expect(emitted[0][0]).toEqual([''])
  })

  it('updateItem updates the value at the given index without affecting others', async () => {
    const w = makeWrapper({ modelValue: ['a', 'b'] })
    const inputs = w.findAll('input')
    await inputs[1].setValue('updated')
    const emitted = w.emitted('update:modelValue')
    expect(emitted[emitted.length - 1][0]).toEqual(['a', 'updated'])
  })
})
