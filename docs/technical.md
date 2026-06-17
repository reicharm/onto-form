# Technische Dokumentation – DCAT-AP Metadata Editor

## Architektur

```
App.vue
├── StandardSelector.vue        Standardauswahl (DCAT-AP.at / GeoDCAT / DCAT-AP 3.0)
├── MetadataForm.vue            Formular (Wizard- und Einzel-Seiten-Modus)
│   ├── fields/TextField.vue
│   ├── fields/TextareaField.vue
│   ├── fields/LangStringField.vue
│   ├── fields/SelectField.vue
│   ├── fields/MultiSelectField.vue
│   ├── fields/DateField.vue
│   ├── fields/URIField.vue
│   ├── fields/ObjectField.vue
│   └── fields/RepeatableField.vue
├── ExportPanel.vue             Export-Dialog (JSON-LD / Turtle)
├── ImportPanel.vue             Import-Dialog (JSON-LD / Turtle)
└── services/
    ├── FormConfigResolver.js   Konfigurationsauflösung (SHACL + UI-Config + Vokabulare)
    ├── SHACLParser.js          Parst SHACL-Shapes aus Turtle
    ├── RDFExporter.js          Erzeugt JSON-LD / Turtle aus Formulardaten
    ├── RDFImporter.js          Importiert JSON-LD / Turtle in Formulardaten
    └── VocabularyLoader.js     Lädt und normalisiert externe Vokabulare
```

Ergänzende Module:

```
src/config/
├── fieldComputes.js            Benannte Compute-Funktionen für automatische Feldwerte
├── fieldValidators.js          Benannte Validatoren (isURI, isEmail, …)
├── fieldTransforms.js          Benannte Transforms (display ↔ encode, z.B. uriSuffix)
└── fieldVisibility.js          Benannte Visibility-Funktionen (dynamische Feldsichtbarkeit)
src/composables/
└── useValidation.js            Formular- und Einzelfeld-Validierung
src/styles/
├── theme.css                   CSS Design-Tokens (Farben, Radien, Schriftgrößen)
└── base.css                    Globaler Reset und Body-Basis
public/
├── config/
│   ├── ui-config.dcat-ap-at.json
│   ├── ui-config.dcat-ap-3.json
│   └── ui-config.geodcat.json
├── shacl/                      SHACL-Shapes als Turtle-Dateien
└── vocabularies/               Lokale Vokabular-JSON-Dateien (Fallback)
```

---

## Komponenten

### App.vue

Wurzelkomponente. Verwaltet:

- `selectedStandard` – aktiver Standard
- `lang` – Anzeigesprache (`de` / `en`)
- `wizardMode` – Wizard (`true`) oder Einzel-Seite (`false`); Standard: `true`
- `formData` – reaktives Datenobjekt für alle Felder
- `showExport` / `showImport` – Steuerung der Overlays

Beim Standardwechsel wird `FormConfigResolver.resolve(standard)` aufgerufen, danach `buildDefaultFormData` und `applyComputes`. Compute-Funktionen laufen außerdem bei jeder Änderung von `formData` (Watcher).

`buildDefaultFormData` initialisiert **alle** Feldtypen auf leere Werte (inkl. `date`, `text`, `uri`, `select`).

### MetadataForm.vue

Props: `config`, `lang`, `modelValue`, `wizard`

**Wizard-Modus** (`wizard: true`):
- Schrittanzeige (`step-indicator`) zeigt Gruppen + Abschluss-Schritt
- `currentStep` steuert die angezeigte Gruppe
- `nextStep()` prüft per-Schritt-Validierung; `showStepErrors` aktiviert Fehleranzeige nur bei Versuch weiterzugehen
- Übersicht (letzter Schritt): alle Gruppen als read-only-Karten, „Bearbeiten/Edit" springt direkt zum jeweiligen Schritt, Export-Button

**Einzel-Seiten-Modus** (`wizard: false`):
- Alle Gruppen werden sequenziell gerendert
- Export-Button am Ende

`multiselect`-Felder werden **nie** in `RepeatableField` eingebettet, auch wenn `field.multiple === true`.

### ImportPanel.vue

Overlay-Komponente für den Import. Zwei Tabs: JSON-LD und Turtle.

- Datei-Upload via `<input type="file">` oder direktes Einfügen von Text
- Ruft `RDFImporter.fromJSONLD()` oder `RDFImporter.fromTurtle()` auf
- Emittiert `import`-Event mit dem geparsten Datenobjekt an `App.vue`
- Importierte Werte werden mit `formData` gemergt (bestehende Werte bleiben erhalten)

### ExportPanel.vue

Zeigt JSON-LD und Turtle aus `RDFExporter` an; Copy-to-Clipboard.

---

## Services

### FormConfigResolver.js

```js
const resolver = new FormConfigResolver()
const config = await resolver.resolve('dcat-ap-at')
```

Ablauf:
1. SHACL-Shape und UI-Config parallel laden
2. `SHACLParser` parst die Shapes
3. SHACL-Felder und UI-Config-Felder werden gemergt (UI überschreibt bei Konflikten, Labels/Hints werden gemergt)
4. Gruppen filtern: Felder ohne Konfiguration oder mit `visible: false` werden entfernt
5. `resolveVocabularies()` lädt alle `optionsSource`-Vokabulare parallel via `VocabularyLoader`

### VocabularyLoader.js

```js
const loader = new VocabularyLoader()
const options = await loader.load(primaryUrl, fallbackUrl)
```

- Ergebnis wird intern gecacht (Map, key = URL)
- Bei Fehler der primären Quelle: automatischer Retry mit `fallbackUrl`
- Normalisiert vier Antwortformate:

| Format | Erkennungsmerkmal |
|---|---|
| Nativ | Array mit `{value, label}` |
| SKOS-lite | Array mit `{uri, prefLabel}` |
| JSON-LD | Objekt mit `@graph` |
| SPARQL JSON | Objekt mit `results.bindings` |

Rückgabe immer: `[{value: string, label: {de?, en?, ...}}]`

### RDFImporter.js

Wandelt JSON-LD oder Turtle in ein `formData`-Objekt um.

**JSON-LD** (`fromJSONLD(text, config)`):
- Parst JSON und iteriert über konfigurierte Felder
- Typ-bewusstes Deserialisieren:
  - `langstring` → Sprachmap `{de: "...", en: "..."}`
  - `multiselect` → Array von URIs
  - `object` → Unterfeld-Map
  - `date` → auf Datum gekürzt (ISO 8601 ohne Zeit)
  - mehrwertige Felder → Arrays

**Turtle** (`fromTurtle(text, config)`):
- Normalisiert SPARQL-`PREFIX`-Deklarationen zu `@prefix` (n3.js-Kompatibilität)
- Parst via n3.js
- Quad-basiertes Mapping auf Felder
- Publisher-URIs: werden im geparsten Graphen nachgeschlagen (Quads des Publisher-Knotens)

Ungültige Werte (scheitern am Validator) werden **stillschweigend verworfen**. Das Feld zeigt dann einen Validierungsfehler in der Formularoberfläche.

### RDFExporter.js

Wandelt `formData` in JSON-LD und Turtle um. Unterstützt alle Feldtypen; nutzt konfigurierte RDF-Prädikate aus der SHACL-Shape.

---

## Field Transforms

`src/config/fieldTransforms.js` trennt Anzeigewert und gespeicherten Wert:

```
Gespeichert: "https://data.gv.at/dataset/my-id"
                       ▼ display()
Angezeigt:   "my-id"
                       ▼ encode()
Gespeichert: "https://data.gv.at/dataset/my-id"
```

`MetadataForm.vue` wendet `display()` an bevor der Wert an das Feld-Komponent übergeben wird, und `encode()` bevor der neue Wert in `formData` geschrieben wird. Die Feld-Komponenten selbst wissen nichts von Transforms.

Neue Transforms: Eintrag in `fieldTransforms.js` als `{ display(stored, opts), encode(display, opts, stored) }`, Referenz per Name in der UI-Config.

---

## Bedingte Feldsichtbarkeit

`src/config/fieldVisibility.js` exportiert:

- `fieldVisibilityFns`: benannte Funktionen `(formData) => boolean`
- `evaluateVisibleIf(fnName, formData)`: wertet eine Funktion aus; gibt `true` zurück bei unbekanntem Namen

`MetadataForm.vue` ruft `evaluateVisibleIf` in `groupFields()` auf — bei jedem Render reaktiv. Felder mit nicht erfüllter Bedingung werden aus dem DOM entfernt und überspringen die Validierung.

```js
// fieldVisibility.js
ifHVDLegislation: (formData) =>
  formData?.['dcatap:applicableLegislation'] === 'http://data.europa.eu/eli/reg_impl/2023/138/oj'
```

```json
// ui-config
"dcatap:hvdCategory": { "visibleIf": "ifHVDLegislation", ... }
```

Neue Funktion: Eintrag in `fieldVisibilityFns` — kein weiterer Code notwendig.

---

## Theming

`src/styles/theme.css` definiert alle Design-Token als CSS Custom Properties auf `:root`:

```css
:root {
  --color-primary:   #2878a8;   /* data.gv.at Blau */
  --color-error:     #c0392b;
  --color-border:    #dde4ea;
  --radius-sm:       4px;
  --font-size-base:  0.95rem;
  /* … */
}
```

Alle Komponenten verwenden ausschließlich diese Variablen — keine hardcodierten Farben oder Größen. Um das gesamte Theme anzupassen, genügt es, Werte in `theme.css` zu ändern.

`src/styles/base.css` enthält globalen Box-Sizing-Reset und Body-Basis.

---

### SHACLParser.js

Parst Turtle-SHACL-Shapes (via n3.js) und extrahiert Felddefinitionen:

- `sh:datatype` → Feldtyp-Mapping (XSD → intern)
- `sh:minCount 1` → `required: true`
- `sh:maxCount` > 1 oder kein `maxCount` → `multiple: true`
- `sh:message` → Fehlermeldungen

---

## Konfigurationsauflösung

```
SHACL-Shape (.ttl)
        │
        ▼
  SHACLParser.parse()
        │
        ├──── UI-Config (.json)
        │           │
        ▼           ▼
     merge (UI überschreibt SHACL)
        │
        ▼
  resolveVocabularies()
  (VocabularyLoader, parallel, gecacht)
        │
        ▼
   FormConfig { standard, version, groups, fields }
```

---

## Validierung

`useValidation.js` exportiert:

- `validateField(field, value, lang)` → `string[]` (Fehler)
- `validateForm(config, formData, lang)` → `{[fieldId]: string[]}` (nur Felder mit Fehlern)

Regeln:
1. Pflichtprüfung (`field.required`) — wenn Feld leer: Fehler, weiterer Validator wird nicht mehr ausgeführt
2. Validator (`field.validate`) — **nur wenn Feld einen Wert hat** (leere optionale Felder sind immer gültig)
3. Unterfelder bei `object`-Typ: rekursive Validierung

Im Wizard-Modus wird nur die aktuelle Gruppe validiert (`groupFieldErrors(currentGroup)`), wenn „Weiter" geklickt wird.

---

## Compute-Funktionen

`fieldComputes.js` exportiert:

- `fieldComputeFns`: benannte Funktionen
- `applyComputes(config, formData, lang)`: wendet alle Compute-Funktionen an, gibt neues `formData` zurück (nur bei tatsächlicher Änderung)

**Signatur**: `(formData, lang, fieldId) => value | undefined`

`fieldId` als drittes Argument ermöglicht selbstreferentielle Prüfungen (z. B. `setTodayIfTitleAndEmpty` prüft `data[fieldId]`).

`applyComputes` verhindert rekursive Watcher-Schleifen durch Gleichheitsprüfung vor der Zuweisung.

---

## Datenfluss

```
Nutzer-Eingabe
      │
      ▼
MetadataForm emittiert update:modelValue
      │
      ▼
App.vue: formData = event
      │
      ▼
applyComputes(config, formData, lang)
      │
      ▼
formData (reaktiv) → MetadataForm re-rendert
```

**Import-Fluss:**

```
ImportPanel: Datei/Text → RDFImporter → importiertes Objekt
      │
      ▼
App.vue: formData = { ...formData, ...importiertes Objekt }
      │
      ▼
applyComputes (nur für noch leere Felder, je nach compute-Funktion)
```

---

## Erweiterung

### Neuen Standard hinzufügen

1. SHACL-Shape als `.ttl` unter `public/shacl/` ablegen
2. UI-Config als `.json` unter `public/config/ui-config.<id>.json` anlegen
3. Standard-Eintrag in `App.vue` im `standards`-Array ergänzen

### Neue Compute-Funktion

In `src/config/fieldComputes.js` unter `fieldComputeFns` ergänzen:

```js
meineFunktion: (data, lang, fieldId) => {
  return data['dct:title'] ? 'berechneter Wert' : undefined
}
```

Im UI-Config-Feld referenzieren: `"compute": "meineFunktion"`

### Neues Vokabular

Lokale JSON-Datei unter `public/vocabularies/<name>.json` im nativen Format ablegen:

```json
[
  { "value": "http://...", "label": { "de": "Bezeichnung", "en": "Label" } }
]
```

Im Feld konfigurieren:

```json
"optionsSource": "/vocabularies/<name>.json"
```

### Neuer Feldtyp

1. Vue-Komponente unter `src/components/fields/` anlegen
2. In `MetadataForm.vue` in `componentMap` eintragen
3. In `RDFExporter.js` und `RDFImporter.js` Serialisierung/Deserialisierung ergänzen
