import { inject, ref } from 'vue'

const DEFAULTS = {
  de: {
    // App
    'header.type-label': 'Art:',
    'btn.import': 'Importieren',
    'btn.preview': 'Vorschau',
    'btn.retry': 'Erneut versuchen',
    'btn.wizard-toggle.to-single': 'Einzel-Seite',
    'btn.wizard-toggle.to-wizard': 'Schritt-Assistent',
    'btn.view-toggle.to-view': 'Ansicht',
    'btn.view-toggle.to-edit': 'Bearbeiten',
    'app.loading': 'Formular wird geladen…',
    'app.vocab-warning': 'Vokabular(e) konnten nicht geladen werden und wurden übersprungen.',
    'app.error-prefix': 'Ein unerwarteter Fehler ist aufgetreten',
    'entity.dataset': 'Datensatz',
    'entity.catalogue': 'Katalog',
    'entity.application': 'Applikation',
    // MetadataForm
    'wizard.summary': 'Übersicht',
    'wizard.nav.back': 'Zurück',
    'wizard.nav.next': 'Weiter',
    'wizard.nav.to-summary': 'Zur Übersicht',
    'wizard.summary.error-badge': 'Fehlende Pflichtfelder',
    'wizard.summary.edit': 'Bearbeiten',
    'wizard.summary.no-data': 'Keine Angaben',
    'form.validation-hint': 'Bitte alle Fehler beheben.',
    'btn.validate': 'SHACL prüfen',
    'btn.export': 'Export JSON-LD / Turtle',
    // RepeatableField
    'btn.add': 'Hinzufügen',
    'btn.remove': 'Entfernen',
    // LangStringItem
    'aria.lang-select': 'Sprache des Eintrags',
    // ExportPanel
    'export.copied': 'Kopiert!',
    'btn.copy': 'In Zwischenablage kopieren',
    'btn.download': 'Herunterladen',
    // ImportPanel
    'btn.open-file': 'Datei öffnen …',
    'btn.cancel': 'Abbrechen',
    // DistributionModal
    'dist.modal.title': 'Distribution bearbeiten',
    'btn.save': 'Speichern',
    // DistributionEditor
    'dist.empty-hint': 'Noch keine Distributionen vorhanden.',
    'btn.add-first-dist': 'Erste Distribution hinzufügen',
    'btn.add-dist': 'Distribution hinzufügen',
    'btn.edit': 'Bearbeiten',
    // DistributionForm
    'dist.upload-label': 'Datei hochladen',
    'dist.drop.idle': 'Datei hierher ziehen oder klicken zum Auswählen',
    'dist.drop.uploading': 'Wird hochgeladen …',
    'dist.drop.success': 'Erfolgreich hochgeladen',
    'btn.choose-another': 'Andere Datei',
    'btn.try-again': 'Erneut versuchen',
    'btn.upload': 'Hochladen',
    'dist.field.access-url': 'Zugangs-URL',
    'dist.field.download-url': 'Download-URL',
    'dist.field.title': 'Titel',
    'dist.field.title-placeholder': 'Titel der Distribution',
    'dist.field.description': 'Beschreibung',
    'dist.field.description-placeholder': 'Beschreibung …',
    'dist.field.format': 'Dateiformat',
    'dist.field.media-type': 'Medientyp',
    'dist.field.license': 'Lizenz',
    'dist.field.availability': 'Verfügbarkeit',
    'dist.field.issued': 'Veröffentlichungsdatum',
    'dist.field.modified': 'Zuletzt geändert',
    // SelectField / SearchSelectField
    'select.placeholder': '— Bitte wählen —',
    'searchselect.search-placeholder': 'Suchen …',
    'searchselect.empty': 'Keine Treffer',
    // MapField
    'map.btn.rectangle': 'Rechteck',
    'map.btn.polygon': 'Polygon',
    'map.btn.clear': 'Löschen',
    'map.hint.rectangle': 'Klicken und ziehen um ein Rechteck aufzuspannen.',
    'map.hint.polygon': 'Klicken um Punkte zu setzen, Doppelklick zum Abschließen.',
    // ValidationReport
    'validation.title': 'SHACL-Validierungsbericht',
    'validation.no-violations': 'Keine Verstöße gefunden.',
    'validation.sev.violation': 'Verstöße',
    'validation.sev.warning': 'Warnungen',
    'validation.sev.info': 'Hinweise',
    'btn.navigate-to-field': 'Zum Feld',
    // FieldGroup
    'field.stored-as': 'Gespeichert als:',
    // OntoViewer
    'viewer.loading': 'Ansicht wird geladen…',
    'viewer.error': 'Fehler beim Laden der Ansicht',
    'viewer.no-data': 'Keine Daten vorhanden.',
    'viewer.copy-wkt': 'WKT kopieren',
    'viewer.wkt-copied': 'Kopiert!',
    'viewer.bounds': 'Koordinaten',
    'viewer.other-langs': 'Weitere Sprachen',
  },
  en: {
    // App
    'header.type-label': 'Type:',
    'btn.import': 'Import',
    'btn.preview': 'Preview',
    'btn.retry': 'Retry',
    'btn.wizard-toggle.to-single': 'Single page',
    'btn.wizard-toggle.to-wizard': 'Wizard',
    'btn.view-toggle.to-view': 'View',
    'btn.view-toggle.to-edit': 'Edit',
    'app.loading': 'Loading form configuration…',
    'app.vocab-warning': 'vocabulary source(s) could not be loaded and were skipped.',
    'app.error-prefix': 'An unexpected error occurred',
    'entity.dataset': 'Dataset',
    'entity.catalogue': 'Catalogue',
    'entity.application': 'Application',
    // MetadataForm
    'wizard.summary': 'Summary',
    'wizard.nav.back': 'Back',
    'wizard.nav.next': 'Next',
    'wizard.nav.to-summary': 'Summary',
    'wizard.summary.error-badge': 'Required fields missing',
    'wizard.summary.edit': 'Edit',
    'wizard.summary.no-data': 'No data',
    'form.validation-hint': 'Please fix all errors.',
    'btn.validate': 'SHACL validate',
    'btn.export': 'Export JSON-LD / Turtle',
    // RepeatableField
    'btn.add': 'Add',
    'btn.remove': 'Remove',
    // LangStringItem
    'aria.lang-select': 'Language of this entry',
    // ExportPanel
    'export.copied': 'Copied!',
    'btn.copy': 'Copy to clipboard',
    'btn.download': 'Download',
    // ImportPanel
    'btn.open-file': 'Open file …',
    'btn.cancel': 'Cancel',
    // DistributionModal
    'dist.modal.title': 'Edit Distribution',
    'btn.save': 'Save',
    // DistributionEditor
    'dist.empty-hint': 'No distributions yet.',
    'btn.add-first-dist': 'Add first distribution',
    'btn.add-dist': 'Add distribution',
    'btn.edit': 'Edit',
    // DistributionForm
    'dist.upload-label': 'Upload file',
    'dist.drop.idle': 'Drag a file here or click to select',
    'dist.drop.uploading': 'Uploading …',
    'dist.drop.success': 'Upload successful',
    'btn.choose-another': 'Choose another',
    'btn.try-again': 'Try again',
    'btn.upload': 'Upload',
    'dist.field.access-url': 'Access URL',
    'dist.field.download-url': 'Download URL',
    'dist.field.title': 'Title',
    'dist.field.title-placeholder': 'Distribution title',
    'dist.field.description': 'Description',
    'dist.field.description-placeholder': 'Description …',
    'dist.field.format': 'File Format',
    'dist.field.media-type': 'Media Type',
    'dist.field.license': 'License',
    'dist.field.availability': 'Availability',
    'dist.field.issued': 'Issued',
    'dist.field.modified': 'Modified',
    // SelectField / SearchSelectField
    'select.placeholder': '— Please select —',
    'searchselect.search-placeholder': 'Search …',
    'searchselect.empty': 'No results',
    // MapField
    'map.btn.rectangle': 'Rectangle',
    'map.btn.polygon': 'Polygon',
    'map.btn.clear': 'Clear',
    'map.hint.rectangle': 'Click and drag to draw a bounding box.',
    'map.hint.polygon': 'Click to place points, double-click to finish.',
    // ValidationReport
    'validation.title': 'SHACL Validation Report',
    'validation.no-violations': 'No violations found.',
    'validation.sev.violation': 'Violations',
    'validation.sev.warning': 'Warnings',
    'validation.sev.info': 'Info',
    'btn.navigate-to-field': 'Go to field',
    // FieldGroup
    'field.stored-as': 'Stored as:',
    // OntoViewer
    'viewer.loading': 'Loading view…',
    'viewer.error': 'Error loading view',
    'viewer.no-data': 'No data available.',
    'viewer.copy-wkt': 'Copy WKT',
    'viewer.wkt-copied': 'Copied!',
    'viewer.bounds': 'Bounds',
    'viewer.other-langs': 'Other languages',
  }
}

export function useTranslations() {
  const lang = inject('onto-form:lang', ref('de'))
  const translations = inject('onto-form:translations', ref({}))

  function t(key) {
    const l = typeof lang === 'string' ? lang : lang.value
    const map = translations && 'value' in translations ? translations.value : (translations ?? {})
    return map[key] ?? DEFAULTS[l]?.[key] ?? DEFAULTS.en[key] ?? key
  }

  return { t }
}

export { DEFAULTS }
