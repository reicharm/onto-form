// Public API for the OntoForm library build.
// Import this file when embedding OntoForm as a component in another Vue project.

// ── Main component ────────────────────────────────────────────────────────────
export { default as MetadataForm } from './components/MetadataForm.vue'

// ── Sub-components (host apps may need to render these standalone) ─────────────
export { default as ValidationReport }   from './components/ValidationReport.vue'
export { default as ExportPanel }        from './components/ExportPanel.vue'
export { default as ImportPanel }        from './components/ImportPanel.vue'
export { default as StandardSelector }   from './components/StandardSelector.vue'
export { default as DistributionModal }  from './components/DistributionModal.vue'

// ── Services ──────────────────────────────────────────────────────────────────
export { FormConfigResolver }       from './services/FormConfigResolver.js'
export { VocabularyLoader }         from './services/VocabularyLoader.js'
export { RDFImporter }              from './services/RDFImporter.js'
export { RDFExporter }              from './services/RDFExporter.js'
export { SHACLValidationService }   from './services/SHACLValidationService.js'
export { FileUploader }             from './services/FileUploader.js'

// ── Configuration ─────────────────────────────────────────────────────────────
export { configure, assetUrl } from './config/ontoFormConfig.js'

// ── Vue plugin (optional: registers MetadataForm globally) ────────────────────
import MetadataForm from './components/MetadataForm.vue'

export const OntoFormPlugin = {
  install(app) {
    app.component('MetadataForm', MetadataForm)
  }
}
