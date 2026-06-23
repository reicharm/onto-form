# Integration als Library – OntoForm

OntoForm kann als wiederverwendbare Komponentenbibliothek in beliebige Vue-3-Anwendungen eingebunden werden. Die Library exportiert Komponenten, Services und Hilfsfunktionen; die einbettende Anwendung stellt Assets (SHACL, UI-Config, Vokabulare) unter einer konfigurierbaren Basis-URL bereit.

---

## 1. Installation / Setup

**Noch nicht auf npm veröffentlicht.** Bis zur Veröffentlichung entweder als lokaler Pfad oder als Git-Abhängigkeit einbinden:

```bash
# lokaler Pfad
npm install ../onto-form

# Git-Abhängigkeit
npm install git+https://github.com/your-org/onto-form.git
```

CSS importieren (einmalig in `main.js` oder `main.ts`):

```js
import 'onto-form/style.css'
```

### Verwendungsmuster

**a) Plugin** – registriert `<MetadataForm>` global:

```js
import { OntoFormPlugin } from 'onto-form'
app.use(OntoFormPlugin)
```

**b) Direktimport** – Komponente wird lokal importiert:

```js
import { MetadataForm } from 'onto-form'
```

---

## 2. Minimales Beispiel

`main.js`:

```js
import { createApp } from 'vue'
import App from './App.vue'
import { OntoFormPlugin, configure } from 'onto-form'
import 'onto-form/style.css'

configure({
  assetsBaseUrl: '/ontoform-assets/'
})

const app = createApp(App)
app.use(OntoFormPlugin)
app.mount('#app')
```

`App.vue`:

```vue
<template>
  <MetadataForm
    v-model="formData"
    :config="formConfig"
    :lang="'de'"
    :wizard="true"
  />
</template>

<script setup>
import { ref } from 'vue'
import { useFormConfig } from 'onto-form'

const formConfig = await useFormConfig('dcat-ap-at')
const formData = ref({})
</script>
```

---

## 3. configure() – alle Optionen

`configure()` muss **vor** `app.mount()` aufgerufen werden.

```js
configure({
  assetsBaseUrl: '/meine-assets/',   // Basis-URL für SHACL, UI-Config, Vokabulare
  extend: {                          // optional – eigene Erweiterungsfunktionen
    validators:  { … },              // (value, lang) => string[]
    computes:    { … },              // (formData, lang, fieldId) => value | undefined
    transforms:  { … },              // { display(stored, opts), encode(display, opts, stored) }
    visibility:  { … }               // (formData) => boolean
  }
})
```

`assetsBaseUrl` muss mit `/` enden. Der Resolver hängt die Pfade `shacl/`, `config/` und `vocabularies/` direkt an diese URL.

Details zu `extend` siehe [extending.md](./extending.md).

---

## 4. Asset-Struktur

Die einbettende Anwendung muss folgende Dateien unter `assetsBaseUrl` bereitstellen:

```
<assetsBaseUrl>/
  shacl/
    <standard-id>.ttl          SHACL-Shape für den jeweiligen Standard
  config/
    ui-config.<standard-id>.json   UI-Konfiguration für den Standard
  vocabularies/
    file-format.json           (optional) Formatoptionen für Distributionen
    <eigenes-vokabular>.json   (optional) weitere Vokabulare
```

Beispiel für `assetsBaseUrl: '/ontoform-assets/'`:

- SHACL: `/ontoform-assets/shacl/dcat-ap-at.ttl`
- UI-Config: `/ontoform-assets/config/ui-config.dcat-ap-at.json`
- Vokabular: `/ontoform-assets/vocabularies/file-format.json`

Die eingebauten Standards (`dcat-ap-at`, `dcat-ap-3`, `geodcat`) liefern SHACL und UI-Config bereits mit; eigene Standards müssen vollständig als Assets bereitgestellt werden.

---

## 5. Eigene Standards definieren

Die `<App>`-Komponente akzeptiert ein `standards`-Prop und ein `initial-standard`-Prop:

```js
import { App, BUILTIN_STANDARDS } from 'onto-form'
```

Nur eigene Standards:

```vue
<App
  :standards="[{ id: 'mein-standard', label: 'Mein Standard' }]"
  initial-standard="mein-standard"
/>
```

Eigene Standards zu den eingebauten hinzufügen:

```vue
<App
  :standards="[...BUILTIN_STANDARDS, { id: 'mein-standard', label: 'Mein Standard' }]"
  initial-standard="dcat-ap-at"
/>
```

`BUILTIN_STANDARDS` ist ein Array von `{ id, label }`-Objekten. Die entsprechenden Assets für `mein-standard` müssen unter `assetsBaseUrl/shacl/mein-standard.ttl` und `assetsBaseUrl/config/ui-config.mein-standard.json` liegen.

---

## 6. Formulardaten lesen und schreiben

### v-model

`MetadataForm` unterstützt `v-model` (emittiert `update:modelValue`):

```vue
<MetadataForm v-model="formData" :config="formConfig" lang="de" />
```

`formData` ist ein flaches Objekt mit Feld-IDs als Schlüssel:

```js
const formData = ref({
  'dct:title': { de: 'Mein Datensatz', en: 'My Dataset' },
  'dct:identifier': 'https://example.org/dataset/1',
  'dcat:distribution': []
})
```

### RDF-Import

```js
import { RDFImporter } from 'onto-form'

const importer = new RDFImporter()
const imported = await importer.fromTurtle(turtleText, formConfig)
// oder: fromJSONLD(), fromRDFXML()
formData.value = { ...formData.value, ...imported }
```

### RDF-Export

```js
import { RDFExporter } from 'onto-form'

const exporter = new RDFExporter()
const jsonld  = await exporter.toJSONLD(formData.value, formConfig)
const turtle  = await exporter.toTurtle(formData.value, formConfig)
const rdfxml  = await exporter.toRDFXML(formData.value, formConfig)
```

---

## 7. CSS-Theming

Alle OntoForm-Stile sind auf die Klasse `.ontoform` beschränkt. CSS Custom Properties können in der einbettenden Anwendung überschrieben werden:

```css
.ontoform {
  --color-primary:       #005ea2;
  --color-primary-dark:  #003d6e;
  --radius-sm:           2px;
}
```

### Verfügbare CSS-Variablen

| Gruppe | Variable |
|---|---|
| Primärfarbe | `--color-primary`, `--color-primary-dark`, `--color-primary-light`, `--color-primary-bg` |
| Fehlerfarbe | `--color-error`, `--color-error-dark`, `--color-error-bg` |
| Text | `--color-text`, `--color-text-muted`, `--color-text-subtle` |
| Flächen | `--color-surface`, `--color-surface-alt`, `--color-border` |
| Fokus | `--focus-ring` |
| Radien | `--radius-sm`, `--radius-md`, `--radius-lg` |
| Schatten | `--shadow-card` |
| Schriftgrößen | `--font-size-sm`, `--font-size-label`, `--font-size-base`, `--font-size-heading` |

Die Standardwerte sind in `src/styles/theme.css` definiert.

---

## 8. Sicherheitshinweis (Auth)

OntoForm verwaltet keine Zugangsdaten. Für den Datei-Upload an externe APIs registriert die einbettende Anwendung einen Auth-Provider:

```js
import { FileUploader } from 'onto-form'

FileUploader.setAuthProvider(async (config) => ({
  Authorization: `Bearer ${myAuthStore.getToken()}`
}))
```

Die Funktion wird vor jedem Upload aufgerufen; ihr Rückgabewert wird mit den statischen Header-Konfigurationen gemergt. Zugangsdaten werden ausschließlich im Arbeitsspeicher der Seite gehalten und nicht persistiert. Mit `FileUploader.setAuthProvider(null)` wird der Hook wieder entfernt.

---

## 9. Build (für Library-Maintainer)

Dieser Abschnitt gilt für Entwickler der Library, nicht für einbettende Anwendungen.

```bash
# SPA-Build (Entwicklung / Vorschau)
npm run build

# Library-Build (erzeugt dist/ mit ESM- und CJS-Bundles)
npm run build:lib
```

`npm run build:lib` erzeugt `dist/onto-form.js` (ESM), `dist/onto-form.cjs` und `dist/style.css`. Diese Dateien werden beim npm-Publish ausgeliefert.
