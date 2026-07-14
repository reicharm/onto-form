# OntoViewer

`OntoViewer` is a read-only metadata viewer that mirrors `MetadataForm` in architecture: it reads the same SHACL shapes and the same field definitions, but renders data instead of collecting it. Use it to display a published dataset record, a catalogue entry, or any RDF resource whose structure is described by a SHACL shape file.

Like `MetadataForm`, the viewer is driven by:

- A **SHACL shape** file (`public/shacl/<standard>.ttl`) that defines which properties exist and what types they carry.
- A **view config** file (`public/config/ui-view-config.<standard>.json`) that controls which fields appear, in what order, and how they are grouped into sections and tabs.
- An optional **translations** file (`public/translations/<lang>.json`) for label and UI-string overrides.

---

## Installation / Usage

### As a named import

```js
import { OntoViewer } from 'onto-form'
```

### As a Vue plugin (recommended)

`OntoFormPlugin` registers both `MetadataForm` and `OntoViewer` globally, so no per-component import is needed.

```js
// main.js
import { createApp } from 'vue'
import { OntoFormPlugin, configure } from 'onto-form'
import App from './App.vue'

configure({ baseUrl: '/onto-form/' })   // path to public/ assets

const app = createApp(App)
app.use(OntoFormPlugin)
app.mount('#app')
```

### Basic usage — inline data object

Pass a pre-loaded plain-object record via the `data` prop. The object keys must be compact IRI strings matching the field ids in the SHACL shape (e.g. `"dct:title"`).

```vue
<OntoViewer
  standard="dcat-ap-at"
  :data="datasetRecord"
  lang="de"
/>
```

### Fetching data from a URL

Provide `dataUrl` and, optionally, `dataFormat`. If `dataFormat` is omitted the viewer detects the format from the response `Content-Type` header.

```vue
<OntoViewer
  standard="dcat-ap-at"
  dataUrl="https://data.example.at/dataset/abc.jsonld"
  dataFormat="jsonld"
  lang="en"
/>
```

### Passing a resolved config object

If you need to resolve the view config yourself (e.g. to pre-load it server-side), pass it directly via `config`. The `standard` prop is then optional and only used as a fallback label key prefix.

```vue
<script setup>
import { ref, onMounted } from 'vue'
import { ViewConfigResolver } from 'onto-form'

const config = ref(null)
onMounted(async () => {
  config.value = await new ViewConfigResolver().resolve('dcat-ap-at')
})
</script>

<template>
  <OntoViewer :config="config" :data="record" lang="de" />
</template>
```

---

## Props reference

| Prop | Type | Default | Description |
|---|---|---|---|
| `standard` | `String` | — | Identifier for the metadata standard (e.g. `"dcat-ap-at"`). Used to load `ui-view-config.<standard>.json` and `shacl/<standard>.ttl`. |
| `config` | `Object` | `null` | Pre-resolved view config object. When provided, `standard`-based auto-loading is skipped. |
| `data` | `Object` | `null` | Pre-loaded data record as a plain object keyed by compact IRI field ids. Skips `dataUrl` loading when provided. |
| `dataUrl` | `String` | `null` | URL of an RDF document to fetch and parse. Requires `config` or `standard` to be set first. |
| `dataFormat` | `String` | `null` | Format of the document at `dataUrl`. One of `"jsonld"`, `"turtle"`, `"rdfxml"`. Auto-detected from `Content-Type` when omitted. |
| `lang` | `String` | `"de"` | Active display language. Drives label resolution, `LangStringView` display, and date formatting. |
| `labels` | `Object` | `{}` | Reserved for future inline label overrides. Currently accepted but not yet applied by the resolver. |

---

## View config format

Place the file at `public/config/ui-view-config.<standard>.json`. The viewer loads it automatically when `standard` is set.

### Top-level keys

| Key | Type | Description |
|---|---|---|
| `standard` | string | Must match the filename suffix and the `standard` prop. |
| `shaclSource` | string | Shape file to load from `public/shacl/`. Defaults to `standard` when omitted. |
| `version` | string | Informational; passed through to the resolved config. |
| `rootClass` | string | Compact IRI of the root class (e.g. `"dcat:Dataset"`). Only properties from shapes targeting this class are included. |
| `sections` | array | Ordered list of section descriptors. Each entry is either a `section` or a `tabs` block (see below). |
| `fields` | object | Optional field override map. Same semantics as `ui-config.json` fields — see [Field overrides](#field-overrides). |

### Section type: `section`

A simple titled block rendering a flat list of fields.

```json
{
  "id": "basic",
  "type": "section",
  "label": { "de": "Grunddaten", "en": "Basic Information" },
  "fields": ["dct:title", "dct:description", "dct:publisher"]
}
```

### Section type: `tabs`

A tab group. Each tab has its own `id`, `label`, and either a flat `fields` list or a `sections` array for named sub-sections within the tab. The first tab is active by default.

**Flat fields (single list per tab):**

```json
{
  "id": "details",
  "type": "tabs",
  "tabs": [
    {
      "id": "themes",
      "label": { "de": "Themen", "en": "Themes" },
      "fields": ["dcat:theme", "dct:subject"]
    },
    {
      "id": "temporal",
      "label": { "de": "Zeitraum", "en": "Temporal" },
      "fields": ["dct:issued", "dct:modified"]
    }
  ]
}
```

**Multiple named sections per tab:**

Use `sections` instead of `fields` to divide a tab's content into titled sub-groups separated by a divider:

```json
{
  "id": "details",
  "type": "tabs",
  "tabs": [
    {
      "id": "classification",
      "label": { "de": "Klassifizierung", "en": "Classification" },
      "sections": [
        {
          "id": "themes",
          "label": { "de": "Themen & Kategorien", "en": "Themes & Categories" },
          "fields": ["dcat:theme", "dct:type", "dcat:keyword"]
        },
        {
          "id": "legal",
          "label": { "de": "Zugang & Recht", "en": "Access & Legal" },
          "fields": ["dct:accessRights", "dct:language", "dcatap:applicableLegislation"]
        }
      ]
    }
  ]
}
```

### Field overrides

The `fields` map in the view config follows the same structure as in `ui-config.json`. Override any SHACL-derived field property — label, hint, type, order, visibility — or add virtual fields that are not in the shape.

When a `ui-view-config.<standard>.json` file is present, `ViewConfigResolver` automatically merges the form's `ui-config.<standard>.json` field definitions as base (providing labels, types, and subField definitions), so you only need to specify what differs in the view config's `fields` map.

```json
"fields": {
  "dct:title": {
    "label": { "de": "Titel des Datensatzes", "en": "Dataset title" }
  },
  "dcat:landingPage": {
    "viewAs": "button",
    "buttonLabel": { "de": "Zum Datensatz", "en": "Open dataset page" },
    "buttonIcon": "🔗"
  }
}
```

Fields with `"visible": false` in either the SHACL shape or the override map are automatically excluded from every section and tab.

#### `viewAs: "button"` — link buttons

Setting `"viewAs": "button"` on any URI field renders it as a styled anchor button instead of a plain link. Additional options:

| Property | Type | Description |
|---|---|---|
| `buttonLabel` | `string \| { de, en }` | Button text. Falls back to the field label when omitted. |
| `buttonIcon` | `string` | Emoji or character prepended to the label (e.g. `"🔗"`, `"⬇"`). |

Multiple values are each rendered as a separate button.

### Full working example

The live example for DCAT-AP.at (`public/config/ui-view-config.dcat-ap-at.json`) uses a Basic section, a four-tab group with two sub-sections in the Classification tab, an Access section with a link button, and a Distributions section:

```json
{
  "standard": "dcat-ap-at",
  "shaclSource": "dcat-ap-at",
  "version": "2.1",
  "rootClass": "dcat:Dataset",
  "sections": [
    {
      "id": "basic",
      "type": "section",
      "label": { "de": "Grunddaten", "en": "Basic Information" },
      "fields": ["dct:title", "dct:description", "dct:identifier"]
    },
    {
      "id": "details",
      "type": "tabs",
      "tabs": [
        {
          "id": "classification",
          "label": { "de": "Klassifizierung", "en": "Classification" },
          "sections": [
            {
              "id": "themes",
              "label": { "de": "Themen & Kategorien", "en": "Themes & Categories" },
              "fields": ["dcat:theme", "dct:type", "dcat:keyword"]
            },
            {
              "id": "legal",
              "label": { "de": "Zugang & Recht", "en": "Access & Legal" },
              "fields": ["dct:accessRights", "dct:language", "dcatap:applicableLegislation", "dcatap:hvdCategory"]
            }
          ]
        },
        {
          "id": "dates",
          "label": { "de": "Zeitangaben", "en": "Dates" },
          "fields": ["dct:issued", "dct:modified", "dct:accrualPeriodicity", "dct:temporal"]
        },
        {
          "id": "spatial",
          "label": { "de": "Geographisch", "en": "Spatial" },
          "fields": ["dct:spatial"]
        },
        {
          "id": "contact",
          "label": { "de": "Kontakt", "en": "Contact" },
          "fields": ["dct:publisher", "dcat:contactPoint"]
        }
      ]
    },
    {
      "id": "access",
      "type": "section",
      "label": { "de": "Zugang & Rechte", "en": "Access & Rights" },
      "fields": ["dcat:landingPage", "dcatap:availability"]
    },
    {
      "id": "distributions",
      "type": "section",
      "label": { "de": "Distributionen", "en": "Distributions" },
      "fields": ["dcat:distribution"]
    }
  ],
  "fields": {
    "dcat:landingPage": {
      "viewAs": "button",
      "buttonLabel": { "de": "Zum Datensatz", "en": "Open dataset page" },
      "buttonIcon": "🔗"
    }
  }
}
```

---

## Sections and tabs

Sections are rendered in document order. A `tabs` block can appear anywhere in the `sections` array — before, after, or between `section` blocks.

```json
"sections": [
  { "id": "header",  "type": "section", ... },
  { "id": "details", "type": "tabs",    ... },
  { "id": "footer",  "type": "section", ... }
]
```

This produces a header section, then a tab group, then a footer section — each visually separated. Sections and tab panels both delegate field rendering to `FieldGroupView`, which renders a `<dl>` grid of label/value pairs. Fields with no value in the data record are silently skipped.

---

## Field view components

`FieldGroupView` picks a display component based on `field.type`. Unknown types fall back to `TextView`.

| Type | Component | Behavior |
|---|---|---|
| `text` | `TextView` | Plain inline text. |
| `textarea` | `TextView` | Multiline text rendered in a `<pre>` block. |
| `date` | `DateView` | Formatted with `toLocaleDateString` using the active `lang`. |
| `uri` | `URIView` | Rendered as an `<a>` link; href and visible text both set to the URI value. |
| `select` | `SelectView` | Resolves the stored value to its option label. |
| `searchselect` | `SelectView` | Same as `SelectView` but sourced from a searchable vocabulary. |
| `multiselect` | `MultiSelectView` | Displays all selected values as chips/badges. |
| `langstring` | `LangStringView` | Shows the value for the active `lang`; other languages shown in muted text with a language tag. |
| `object` | `ObjectView` | Renders sub-fields as a nested group; each sub-field is dispatched to its own typed component (date, URI, map, etc.). |
| `distribution-editor` | `DistributionView` | Distribution cards with styled access/download buttons, format badge, and media type. Set `buttonLinks: false` in the field override to fall back to plain links. |
| `map` | `MapView` | Renders an interactive Leaflet map (OpenStreetMap tiles). Supports POLYGON (bounding box or freehand) and POINT WKT geometries. Shows bounding-box coordinates and a "Copy WKT" button below the map. |
| *(any uri field)* | `LinkButtonView` | When `viewAs: "button"` is set in the field override, renders the URI as a styled anchor button instead of a plain link. Supports `buttonLabel` and `buttonIcon`. |

For `multiple: true` fields whose type is not in the collection group (`multiselect`, `distribution-editor`, `object`, `langstring`), `FieldGroupView` iterates the array and renders one component instance per value, separated by a thin border.

---

## Data sources

### Inline object (`data` prop)

Pass a plain JavaScript object whose keys are compact IRI strings:

```js
const record = {
  'dct:title': 'Mein Datensatz',
  'dct:issued': '2024-01-15',
  'dcat:theme': ['http://eurovoc.europa.eu/100142']
}
```

### Fetched from URL (`dataUrl` + `dataFormat`)

Set `dataUrl` to any URL that returns an RDF document. Set `dataFormat` to one of the values below, or omit it to auto-detect from `Content-Type`.

| `dataFormat` | MIME type | Description |
|---|---|---|
| `"jsonld"` | `application/ld+json` | JSON-LD (default when format is unknown) |
| `"turtle"` | `text/turtle` | Turtle RDF |
| `"rdfxml"` | `application/rdf+xml` | RDF/XML |

```vue
<!-- Explicit format -->
<OntoViewer standard="dcat-ap-at" dataUrl="/api/dataset/42" dataFormat="turtle" lang="de" />

<!-- Auto-detected from Content-Type -->
<OntoViewer standard="dcat-ap-at" dataUrl="/api/dataset/42" lang="de" />
```

The viewer internally uses `RDFImporter` (`fromJSONLD`, `fromTurtle`, `fromRDFXML`) to parse the document and produce the flat key-value record that field components consume.

---

## Translations

### Built-in viewer strings

The following keys are defined in `useTranslations.js` and have German and English defaults. Override them in `public/translations/<lang>.json`:

| Key | Default (en) |
|---|---|
| `viewer.loading` | `"Loading view…"` |
| `viewer.error` | `"Error loading view"` |
| `viewer.no-data` | `"No data available."` |
| `viewer.copy-wkt` | `"Copy WKT"` |
| `viewer.wkt-copied` | `"Copied!"` |
| `viewer.bounds` | `"Bounds"` |
| `viewer.other-langs` | `"Other languages"` |

### Field label overrides

Field labels in the viewer are resolved the same way as in `MetadataForm`. In your translation file:

```json
{
  "field.dct:title.label": "Title",
  "dcat-ap-at.field.dct:title.label": "Dataset Title"
}
```

The standard-scoped key (`<standard>.field.<id>.label`) takes precedence over the generic one.

### Section and tab label overrides

```json
{
  "section.basic.label": "Core Metadata",
  "dcat-ap-at.section.basic.label": "Basic Information",
  "tab.themes.label": "Topics",
  "dcat-ap-at.tab.temporal.label": "Time Period"
}
```

Standard-scoped keys win over generic keys. The same pattern applies to `hint` and `placeholder` for fields.

---

## Extending

The `componentMap` in `FieldGroupView.vue` maps field type strings to Vue components. To add support for a custom field type (for example `contact-point` rendered as a structured card), contribute a new entry to that map and a corresponding `ContactPointView.vue` field component alongside the existing ones in `src/components/viewer/fields/`.

The `ViewConfigResolver` is exported from `src/index.js` and can be instantiated directly if you need to pre-resolve a config, cache it, or pass it to multiple viewer instances:

```js
import { ViewConfigResolver } from 'onto-form'

const resolver = new ViewConfigResolver()
const config = await resolver.resolve('dcat-ap-at', { translations })
```
