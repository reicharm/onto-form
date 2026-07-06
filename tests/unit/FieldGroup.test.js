import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { h } from 'vue'
import FieldGroup from '../../src/components/fields/FieldGroup.vue'

// Stub field component: renders an <input> bound to modelValue and just
// re-emits whatever update:modelValue value is passed to it.
const StubField = {
  props: ['field', 'lang', 'modelValue'],
  emits: ['update:modelValue'],
  render() {
    return h('input', {
      class: 'stub-input',
      value: this.modelValue,
      onInput: (e) => this.$emit('update:modelValue', e.target.value)
    })
  }
}

function makeWrapper(fields, modelValue) {
  return mount(FieldGroup, {
    props: {
      fields,
      lang: 'de',
      modelValue,
      fieldComponent: () => StubField
    }
  })
}

describe('FieldGroup', () => {
  it('applies the transform display() to a single-value field for rendering', () => {
    const fields = [{
      id: 'dct:identifier',
      type: 'uri',
      transform: 'uriSuffix',
      transformOptions: { prefix: 'https://data.gv.at/dataset/' }
    }]
    const w = makeWrapper(fields, { 'dct:identifier': 'https://data.gv.at/dataset/abc-123' })
    expect(w.find('input').element.value).toBe('abc-123')
  })

  it('applies the transform encode() when a single-value field is updated', async () => {
    const fields = [{
      id: 'dct:identifier',
      type: 'uri',
      transform: 'uriSuffix',
      transformOptions: { prefix: 'https://data.gv.at/dataset/' }
    }]
    const w = makeWrapper(fields, { 'dct:identifier': 'https://data.gv.at/dataset/abc-123' })
    await w.find('input').setValue('xyz-789')
    const emitted = w.emitted('update:modelValue')
    expect(emitted[0][0]['dct:identifier']).toBe('https://data.gv.at/dataset/xyz-789')
  })

  it('applies the transform per-item to a multiple:true field for rendering', () => {
    const fields = [{
      id: 'dcat:keyword',
      type: 'text',
      multiple: true,
      transform: 'uriSuffix',
      transformOptions: { prefix: 'https://data.gv.at/dataset/' }
    }]
    const w = makeWrapper(fields, {
      'dcat:keyword': ['https://data.gv.at/dataset/a', 'https://data.gv.at/dataset/b']
    })
    const inputs = w.findAll('input')
    expect(inputs.map(i => i.element.value)).toEqual(['a', 'b'])
  })

  it('applies the transform per-item when one item of a multiple:true field is updated, leaving others untouched', async () => {
    const fields = [{
      id: 'dcat:keyword',
      type: 'text',
      multiple: true,
      transform: 'uriSuffix',
      transformOptions: { prefix: 'https://data.gv.at/dataset/' }
    }]
    const w = makeWrapper(fields, {
      'dcat:keyword': ['https://data.gv.at/dataset/a', 'https://data.gv.at/dataset/b']
    })
    const inputs = w.findAll('input')
    await inputs[1].setValue('updated-b')
    const emitted = w.emitted('update:modelValue')
    expect(emitted[0][0]['dcat:keyword']).toEqual([
      'https://data.gv.at/dataset/a',
      'https://data.gv.at/dataset/updated-b'
    ])
  })

  it('passes the value through unchanged when no transform is configured', async () => {
    const fields = [{ id: 'dct:title', type: 'text' }]
    const w = makeWrapper(fields, { 'dct:title': 'Hello' })
    expect(w.find('input').element.value).toBe('Hello')
    await w.find('input').setValue('Changed')
    const emitted = w.emitted('update:modelValue')
    expect(emitted[0][0]['dct:title']).toBe('Changed')
  })
})

describe('FieldGroup field.cssClass', () => {
  it('applies field.cssClass to the field-wrapper element', () => {
    const fields = [{ id: 'dct:title', type: 'text', label: { de: 'Titel' }, visible: true, cssClass: 'wide-field' }]
    const w = makeWrapper(fields, { 'dct:title': '' })
    expect(w.find('.field-wrapper').classes()).toContain('wide-field')
  })

  it('does not add a class when cssClass is absent', () => {
    const fields = [{ id: 'dct:title', type: 'text', label: { de: 'Titel' }, visible: true }]
    const w = makeWrapper(fields, { 'dct:title': '' })
    expect(w.find('.field-wrapper').classes()).not.toContain('undefined')
  })
})
