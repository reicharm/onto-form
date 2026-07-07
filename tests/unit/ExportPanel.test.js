import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import ExportPanel from '../../src/components/ExportPanel.vue'

const toJSONLDMock = vi.fn(() => '{}')
const toTurtleMock = vi.fn(() => '')
const toRDFXMLMock = vi.fn(() => '')

vi.mock('../../src/services/RDFExporter.js', () => {
  class RDFExporter {
    toJSONLD(...args) { return toJSONLDMock(...args) }
    toTurtle(...args) { return toTurtleMock(...args) }
    toRDFXML(...args) { return toRDFXMLMock(...args) }
  }
  return { RDFExporter }
})

describe('ExportPanel rootClass', () => {
  it('passes the configured rootClass through to the exporter', () => {
    mount(ExportPanel, {
      props: {
        formData: {},
        standard: 'dcat-ap-at-catalogue',
        rootClass: 'dcat:Catalog',
        lang: 'de'
      }
    })

    expect(toJSONLDMock).toHaveBeenCalledWith({}, 'dcat-ap-at-catalogue', 'dcat:Catalog')
    expect(toTurtleMock).toHaveBeenCalledWith({}, 'dcat-ap-at-catalogue', 'dcat:Catalog')
    expect(toRDFXMLMock).toHaveBeenCalledWith({}, 'dcat-ap-at-catalogue', 'dcat:Catalog')
  })

  it('defaults to dcat:Dataset when no rootClass prop is given', () => {
    mount(ExportPanel, {
      props: {
        formData: {},
        standard: 'dcat-ap-at',
        lang: 'de'
      }
    })

    expect(toJSONLDMock).toHaveBeenCalledWith({}, 'dcat-ap-at', 'dcat:Dataset')
  })
})
