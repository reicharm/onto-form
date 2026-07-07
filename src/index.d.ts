import type { App, DefineComponent } from 'vue'

// ── Primitive types ────────────────────────────────────────────────────────────

/** Language code, e.g. 'de' | 'en' */
export type LangCode = string

/** A multilingual label map, e.g. { de: 'Titel', en: 'Title' } */
export type LangMap = Record<LangCode, string>

/** A single langstring item in a repeatable langstring field */
export interface LangStringItem {
  value: string
  lang: LangCode
}

/** Supported DCAT standards */
export type Standard = 'dcat-ap-at' | 'geodcat' | 'dcat-ap-3' | string

// ── Form data types ────────────────────────────────────────────────────────────

/** Distribution sub-object stored under dcat:distribution */
export interface DistributionData {
  'rdf:type'?: string
  'dcat:accessURL'?: string
  'dcat:downloadURL'?: string
  'dct:title'?: string
  'dct:description'?: string
  'dct:format'?: string
  'dct:license'?: string
  [key: string]: unknown
}

/** Form data as a flat key→value map keyed by RDF predicates */
export type FormData = Record<string, unknown>

// ── Configuration types ────────────────────────────────────────────────────────

/** Vocabulary option used in select / multiselect fields */
export interface VocabOption {
  value: string
  label: LangMap
}

/** Sub-field definition for object-type fields */
export interface SubFieldConfig {
  id: string
  type: string
  label?: LangMap
  hint?: LangMap
  required?: boolean
  [key: string]: unknown
}

/** File upload configuration block */
export interface FileUploadConfig {
  uploadUrl: string
  method?: 'POST' | 'PUT'
  formField?: string
  responseType?: 'text' | 'json'
  responseUrlField?: string
  headers?: Record<string, string>
  auth?: {
    type?: 'bearer' | 'apikey' | 'basic' | 'oauth2cc' | string
  }
}

/** A single field definition after SHACL + UI config merge */
export interface FieldConfig {
  id: string
  type:
    | 'text'
    | 'textarea'
    | 'langstring'
    | 'select'
    | 'multiselect'
    | 'searchselect'
    | 'uri'
    | 'date'
    | 'object'
    | 'distribution-editor'
    | 'map'
    | string
  label: LangMap
  hint?: LangMap
  required?: boolean
  multiple?: boolean
  multiline?: boolean
  visible?: boolean
  order?: number
  options?: VocabOption[]
  optionsSource?: string
  optionsSourceFallback?: string
  subFields?: SubFieldConfig[]
  transform?: string
  transformOptions?: Record<string, string>
  compute?: string
  validate?: string
  remember?: boolean
  visibleIf?: string
  requiredIf?: string
  fileUpload?: FileUploadConfig
  [key: string]: unknown
}

/** A field group (wizard step) */
export interface FieldGroup {
  id: string
  label: LangMap
  fields: string[]
  visible?: boolean
}

/** Resolved form configuration returned by FormConfigResolver */
export interface FormConfig {
  standard: Standard
  version?: string
  groups: FieldGroup[]
  fields: Record<string, FieldConfig>
  vocabWarnings: Array<{ field: string; message: string }>
  showProgress?: boolean
  rootClass?: string
}

/** Label override map for MetadataForm */
export type LabelOverrides = Partial<
  Record<'validate' | 'validateAriaLabel' | 'export' | string, string | LangMap>
>

// ── SHACL validation types ─────────────────────────────────────────────────────

export type ViolationSeverity = 'violation' | 'warning' | 'info'

export interface Violation {
  fieldId: string
  groupId?: string
  fieldLabel?: LangMap
  constraint: string
  severity: ViolationSeverity
  messageDe: string
  messageEn: string
}

export interface ValidationResult {
  valid: boolean
  violations: Violation[]
}

// ── Standard descriptor ────────────────────────────────────────────────────────

export interface StandardDescriptor {
  id: Standard
  label: string
}

// ── Extension point signatures ─────────────────────────────────────────────────

export type ValidatorFn = (value: unknown, lang: LangCode) => string[]
export type ComputeFn = (formData: FormData, lang: LangCode, fieldId: string) => unknown
export interface TransformPair {
  display(storedValue: unknown, opts?: Record<string, string>): unknown
  encode(displayValue: unknown, opts?: Record<string, string>, storedValue?: unknown): unknown
}
export type VisibilityFn = (formData: FormData) => boolean

// ── configure() options ────────────────────────────────────────────────────────

export interface ConfigureOptions {
  assetsBaseUrl?: string
  extend?: {
    validators?: Record<string, ValidatorFn>
    computes?: Record<string, ComputeFn>
    transforms?: Record<string, TransformPair>
    visibility?: Record<string, VisibilityFn>
  }
}

// ── Services ───────────────────────────────────────────────────────────────────

export declare class FormConfigResolver {
  resolve(standard: Standard): Promise<FormConfig>
}

export declare class VocabularyLoader {
  load(source: string, fallback?: string): Promise<VocabOption[]>
}

export declare class RDFImporter {
  fromJSONLD(text: string, config?: FormConfig | null): FormData
  fromRDFXML(text: string, config?: FormConfig | null): FormData
  fromTurtle(text: string, config?: FormConfig | null): Promise<FormData>
}

export declare class RDFExporter {
  toJSONLD(formData: FormData, standard?: Standard): string
  toTurtle(formData: FormData, standard?: Standard): string
  toRDFXML(formData: FormData, standard?: Standard): string
}

export declare class SHACLValidationService {
  validate(ttl: string, formData: FormData, config: FormConfig): Promise<ValidationResult>
}

export declare class FileUploader {
  static setAuthProvider(
    providerFn: ((config: FileUploadConfig) => Promise<Record<string, string>>) | null
  ): void
  upload(file: File, config: FileUploadConfig): Promise<string>
}

// ── Configuration functions ────────────────────────────────────────────────────

export declare function configure(options?: ConfigureOptions): void
export declare function assetUrl(path: string): string

// ── Extension registration ─────────────────────────────────────────────────────

export declare function registerValidator(
  nameOrMap: string | Record<string, ValidatorFn>,
  fn?: ValidatorFn
): void

export declare function registerCompute(
  nameOrMap: string | Record<string, ComputeFn>,
  fn?: ComputeFn
): void

export declare function registerTransform(
  nameOrMap: string | Record<string, TransformPair>,
  transform?: TransformPair
): void

export declare function registerVisibility(
  nameOrMap: string | Record<string, VisibilityFn>,
  fn?: VisibilityFn
): void

// ── Built-in standards ────────────────────────────────────────────────────────

export declare const BUILTIN_STANDARDS: StandardDescriptor[]

// ── Vue plugin ─────────────────────────────────────────────────────────────────

export declare const OntoFormPlugin: { install(app: App): void }

// ── Components ─────────────────────────────────────────────────────────────────

/** Read-only viewer for RDF metadata based on a FormConfig + FormData */
export declare const MetadataViewer: DefineComponent<
  {
    config: FormConfig
    modelValue?: FormData
    lang?: string
  }
>

/** Main metadata editor component */
export declare const MetadataForm: DefineComponent<
  {
    config?: FormConfig
    lang?: string
    modelValue?: FormData
    wizard?: boolean
    labels?: LabelOverrides
  },
  {},
  {},
  {},
  {},
  {},
  {},
  {
    'update:modelValue': (value: FormData) => void
    export: () => void
  }
>

/** SHACL validation result panel */
export declare const ValidationReport: DefineComponent<
  {
    violations?: Violation[]
    lang?: string
  },
  {},
  {},
  {},
  {},
  {},
  {},
  {
    close: () => void
    navigate: (payload: { fieldId: string; groupId: string }) => void
  }
>

/** RDF export modal (JSON-LD / Turtle / RDF-XML) */
export declare const ExportPanel: DefineComponent<
  {
    formData?: FormData
    standard?: string
    lang?: string
    preview?: boolean
  },
  {},
  {},
  {},
  {},
  {},
  {},
  {
    close: () => void
  }
>

/** RDF import modal (JSON-LD / Turtle / RDF-XML) */
export declare const ImportPanel: DefineComponent<
  {
    config?: FormConfig
    lang?: string
  },
  {},
  {},
  {},
  {},
  {},
  {},
  {
    import: (formData: FormData) => void
    close: () => void
  }
>

/** Standard (DCAT profile) selector dropdown */
export declare const StandardSelector: DefineComponent<
  {
    standards?: StandardDescriptor[]
    modelValue?: string
  },
  {},
  {},
  {},
  {},
  {},
  {},
  {
    'update:modelValue': (value: string) => void
  }
>

/** Distribution editor dialog */
export declare const DistributionModal: DefineComponent<
  {
    modelValue?: DistributionData
    lang?: string
    show?: boolean
    formatOptions?: VocabOption[]
    availabilityOptions?: VocabOption[]
    uploadConfig?: FileUploadConfig | null
  },
  {},
  {},
  {},
  {},
  {},
  {},
  {
    save: (distribution: DistributionData) => void
    cancel: () => void
  }
>
