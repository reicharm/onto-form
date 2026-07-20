import TextField from '../components/fields/TextField.vue'
import TextareaField from '../components/fields/TextareaField.vue'
import SelectField from '../components/fields/SelectField.vue'
import DateField from '../components/fields/DateField.vue'
import URIField from '../components/fields/URIField.vue'
import LangStringField from '../components/fields/LangStringField.vue'
import MultiSelectField from '../components/fields/MultiSelectField.vue'
import MapField from '../components/fields/MapField.vue'
import SearchSelectField from '../components/fields/SearchSelectField.vue'

// Leaf field types only — deliberately excludes "object" and
// "distribution-editor", which resolve to components (ObjectField,
// DistributionEditor) that themselves need this map to render their own
// sub-fields. A static import of either here would create an import cycle
// (e.g. fieldComponentMap -> ObjectField -> fieldComponentMap), which under
// Vite/Rollup library builds forces those components into separate chunks
// instead of the single bundled onto-form.es.js file. Callers that need
// "object"/"distribution-editor" resolved (MetadataForm for top-level
// fields, ObjectField/DistributionForm for their own sub-fields) extend
// this map locally — see fieldComponent() below.
export const fieldComponentMap = {
  textarea: TextareaField,
  select: SelectField,
  date: DateField,
  uri: URIField,
  langstring: LangStringField,
  text: TextField,
  multiselect: MultiSelectField,
  map: MapField,
  searchselect: SearchSelectField,
}

// extra: optional map of additional type -> component entries (e.g. { object: ObjectField })
export function fieldComponent(field, extra) {
  return (extra && extra[field.type]) || fieldComponentMap[field.type] || TextField
}
