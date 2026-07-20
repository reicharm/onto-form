# Technische Dokumentation – OntoForm

## Architektur

```
App.vue
├── StandardSelector.vue        Standardauswahl (DCAT-AP.at / GeoDCAT / DCAT-AP 3.0)
├── MetadataForm.vue            Formular (Wizard- und Einzel-Seiten-Modus)
│   ├── fields/FieldGroup.vue    Rendert eine Feldliste — von MetadataForm UND rekursiv von ObjectField/DistributionForm genutzt
│   │   ├── fields/TextField.vue
│   │   ├── fields/TextareaField.vue
│   │   ├── fields/LangStringField.vue
│   │   ├── fields/SelectField.vue
│   │   ├── fields/MultiSelectField.vue
│   │   ├── fields/DateField.vue
│   │   ├── fields/URIField.vue
│   │   ├── fields/ObjectField.vue          subFields → FieldGroup.vue (rekursiv, self-nesting)
│   │   ├── fields/RepeatableField.vue
│   │   └── fields/DistributionEditor.vue   Distributions-Liste (Inline- und Modal-Modus)
│   │       └── fields/DistributionForm.vue Einzelne Distribution, subFields → FieldGroup.vue
│   └── config/fieldComponentMap.js  Feldtyp → Komponente, gemeinsam genutzt von MetadataForm/ObjectField/DistributionForm
├── DistributionModal.vue       Modal-Overlay für Distribution-Bearbeitung
├── ExportPanel.vue             Export-Dialog (JSON-LD / Turtle / RDF/XML)
├── ImportPanel.vue             Import-Dialog (JSON-LD / Turtle / RDF/XML)
├── OntoViewer.vue              Leseansicht (SHACL-getrieben, tabbedView-Config)
│   ├── SectionView.vue         Einfacher Abschnitt mit Feldliste
│   ├── TabsView.vue            Tab-Gruppe mit optionalen Unter-Abschnitten pro Tab
│   └── FieldGroupView.vue      Rendert <dl>-Grid; wählt View-Komponente nach Feldtyp
│       ├── fields/TextView.vue
│       ├── fields/DateView.vue
│       ├── fields/URIView.vue
│       ├── fields/SelectView.vue
│       ├── fields/MultiSelectView.vue
│       ├── fields/LangStringView.vue
│       ├── fields/ObjectView.vue
│       ├── fields/DistributionView.vue
│       ├── fields/MapView.vue
│       └── fields/LinkButtonView.vue  (viewAs: "button")
└── services/
    ├── BaseConfigResolver.js   Gemeinsame Basis: loadSHACL, resolveFields, resolveVocabularies
    ├── FormConfigResolver.js   Erweitert BaseConfigResolver für Formular-Konfiguration
    ├── ViewConfigResolver.js   Erweitert BaseConfigResolver für Viewer-Konfiguration (ui-view-config)
    ├── SHACLParser.js          Parst SHACL-Shapes aus Turtle
    ├── RDFExporter.js          Erzeugt JSON-LD / Turtle aus Formulardaten
    ├── RDFImporter.js          Importiert JSON-LD / Turtle / RDF/XML in Formulardaten
    └── VocabularyLoader.js     Lädt und normalisiert externe Vokabulare
```

Ergänzende Module:

```
src/config/
├── fieldComputes.js            Benannte Compute-Funktionen für automatische Feldwerte
├── fieldValidators.js          Benannte Validatoren (isURI, isEmail, …)
├── fieldTransforms.js          Benannte Transforms (display ↔ encode, z.B. uriSuffix)
├── fieldVisibility.js          Benannte Visibility- und RequiredIf-Funktionen
├── fieldComponentMap.js        Feldtyp → Vue-Komponente (Top-Level- und Unterfelder)
├── fieldDefaults.js            Leerwert je Feldtyp (App.vue-Formular-Init und DistributionEditor-Neuanlage)
└── idGenerators.js             Benannte ID-Generatoren (uuid, slugDate, nanoid)
src/composables/
└── useValidation.js            Formular- und Einzelfeld-Validierung
src/styles/
├── theme.css                   CSS Design-Tokens (Farben, Radien, Schriftgrößen)
└── base.css                    Globaler Reset und Body-Basis
public/
├── config/
│   ├── ui-config.dcat-ap-at.json
│   ├── ui-config.dcat-ap-3.json
│   ├── ui-config.geodcat.json
│   └── ui-view-config.dcat-ap-at.json  (Viewer-Tabs-Konfiguration)
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
- `distributionMode` – aktiver Bearbeitungsmodus für Distributionen (`"modal"` oder `"inline"`); initialisiert aus dem `distributionMode`-Feld des Config-Feldes `dcat:distribution`
- `formData` – reaktives Datenobjekt für alle Felder
- `showExport` / `showImport` – Steuerung der Overlays

Computed:

- `hasDistributionEditor` – `true`, wenn der aktive Standard ein Feld vom Typ `distribution-editor` enthält; steuert die Sichtbarkeit des Modus-Umschalters im Header

Methoden:

- `toggleDistributionMode()` – wechselt `distributionMode` zwischen `"inline"` und `"modal"` und schreibt den neuen Wert in `formConfig.fields['dcat:distribution'].distributionMode`

Beim Standardwechsel wird `FormConfigResolver.resolve(standard)` aufgerufen, danach `buildDefaultFormData` und `applyComputes`. Compute-Funktionen laufen außerdem bei jeder Änderung von `formData` (Watcher).

`buildDefaultFormData` initialisiert **alle** Feldtypen auf leere Werte (inkl. `date`, `text`, `uri`, `select`).

#### Fehler- und Warnungsanzeige

`App.vue` zeigt zwei unabhängige, nicht-blockierende Hinweis-Banner oberhalb des Formulars:

- **`appError`** (rot, `role="alert"`): wird gesetzt, wenn `FormConfigResolver.resolve(standard)` in `loadFormConfig()` einen Fehler wirft (z. B. SHACL- oder UI-Config-Datei nicht erreichbar/parsbar). Enthält einen „Erneut versuchen"-Button, der `loadFormConfig(selectedStandard)` erneut aufruft. Zusätzlich fängt `onErrorCaptured` unbehandelte Fehler aus Kindkomponenten ab und zeigt sie über dasselbe Banner an, statt die App abstürzen zu lassen.
- **`vocabWarnings`** (blau, `role="status"`): zeigt die Anzahl der Vokabulare, die beim Auflösen der Konfiguration nicht geladen werden konnten (`config.vocabWarnings`, siehe [`VocabularyLoader.js`](#vocabularyloaderjs)). Die betroffenen Felder bleiben nutzbar, zeigen aber keine externen Optionen an.

Beide Banner sind rein informativ; `vocabWarnings` blockiert das Formular nicht, `appError` verhindert lediglich das Rendern von `MetadataForm`, solange `formConfig` `null` ist.

#### Datensatz-/Katalog-Auswahl (`entityType`)

Neben dem Standard-Selector zeigt der Header einen zweiten `StandardSelector` für `entityType` (`"dataset"` | `"catalogue"`, Standard: `"dataset"`):

- `effectiveStandard` (computed) liefert den tatsächlich zu ladenden Standard: bei `entityType === 'catalogue'` immer die feste Konstante `'dcat-ap-at-catalogue'`, sonst `selectedStandard`. `loadFormConfig` reagiert per Watcher auf `effectiveStandard`, nicht direkt auf `selectedStandard`.
- Der Standard-Selector (`standards`-Prop) wird ausgeblendet, solange `entityType === 'catalogue'` ist, da die Katalog-Konfiguration aktuell standard-unabhängig fest verdrahtet ist (`ui-config.dcat-ap-at-catalogue.json`, siehe [configuration.md](./configuration.md#shaclsource)).
- Beim Zurückschalten auf `entityType = 'dataset'` wird wieder der zuletzt gewählte `selectedStandard` geladen (Wert bleibt während der Katalog-Bearbeitung erhalten, wird aber nicht aktiv verwendet).
- `ExportPanel` erhält zusätzlich die `rootClass`-Prop aus `formConfig.rootClass`, damit Export/Vorschau für `dcat:Catalog` auch tatsächlich `@type: "dcat:Catalog"` statt des Default `dcat:Dataset` ausgeben (vorher ein Bug: `RDFExporter`-Methoden wurden ohne `rootClass`-Argument aufgerufen).

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

Overlay-Komponente für den Import. Drei Tabs: JSON-LD, Turtle und RDF/XML.

- Datei-Upload via `<input type="file">` oder direktes Einfügen von Text
- Ruft `RDFImporter.fromJSONLD()`, `RDFImporter.fromTurtle()` oder `RDFImporter.fromRDFXML()` auf
- Emittiert `import`-Event mit dem geparsten Datenobjekt an `App.vue`
- Importierte Werte werden mit `formData` gemergt (bestehende Werte bleiben erhalten)

### ExportPanel.vue

Zeigt JSON-LD, Turtle und RDF/XML aus `RDFExporter` an; Copy-to-Clipboard und Download.

---

## Services

### BaseConfigResolver.js

Gemeinsame Basisklasse für `FormConfigResolver` und `ViewConfigResolver`. Stellt bereit:

- `loadSHACL(standard, shaclSource?)` — lädt und parst die SHACL-Shape-Datei
- `resolveFields(standard, uiConfig, { translations })` — mergt SHACL-Felder mit UI-Config-Feldern, wendet Übersetzungen an, gibt `{ mergedFields, vocabWarnings }` zurück
- `resolveVocabularies(fields)` — lädt alle `optionsSource`-Vokabulare parallel via `VocabularyLoader`

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

Wandelt JSON-LD, Turtle oder RDF/XML in ein `formData`-Objekt um.

**JSON-LD** (`fromJSONLD(text, config)`):
- Parst JSON und iteriert über konfigurierte Felder
- Typ-bewusstes Deserialisieren:
  - `langstring` → Sprachmap `{de: "...", en: "..."}`
  - `multiselect` → Array von URIs
  - `object` → Unterfeld-Map (inkl. `rdf:type`, falls vorhanden)
  - `date` → auf Datum gekürzt (ISO 8601 ohne Zeit)
  - mehrwertige Felder → Arrays

**Turtle** (`fromTurtle(text, config)`):
- Normalisiert SPARQL-`PREFIX`-Deklarationen zu `@prefix` (n3.js-Kompatibilität)
- Parst via n3.js
- Quad-basiertes Mapping auf Felder
- Blank-Node-Sub-Objekte: `rdf:type` wird als `rdf:type`-Schlüssel im Ergebnis bewahrt

**RDF/XML** (`fromRDFXML(text, config)`):
- Parst via nativen `DOMParser` (Browser) bzw. jsdom (Tests)
- Erkennt `dcat:Dataset`-Element via Namespace
- `rdf:about` → `dct:identifier`
- `xml:lang` → Sprachkennzeichen
- `rdf:resource` → URI-Werte
- Typisierte Sub-Elemente (z. B. `<dct:PeriodOfTime>`) → `rdf:type` im Ergebnis

Ungültige Werte (scheitern am Validator) werden **stillschweigend verworfen**. Das Feld zeigt dann einen Validierungsfehler in der Formularoberfläche.

### RDFExporter.js

Wandelt `formData` in JSON-LD, Turtle oder RDF/XML um. Unterstützt alle Feldtypen.

- Sub-Objekte mit `rdf:type` (z. B. `dct:PeriodOfTime`): werden als typisierte Blank Nodes ausgegeben (`a dct:PeriodOfTime` in Turtle, `<dct:PeriodOfTime>` in RDF/XML, `@type` in JSON-LD)
- Datumswerte in Sub-Objekten erhalten `^^xsd:date`-Typisierung in Turtle und RDF/XML

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

## ID-Generatoren

`src/config/idGenerators.js` exportiert:

- `idGenerators`: benannte Generatorfunktionen `(opts?) => string | Promise<string>`
- `generateId(name, opts)` → `Promise<string | null>`: ruft einen benannten Generator auf

`TextField` und `URIField` rufen `generateId` auf dem Mount auf (wenn das Feld leer ist) und zeigen einen ↺-Button für manuelle Neugenerierung.

Signatur eines Generators:

```js
export const idGenerators = {
  meinGenerator: async (opts) => {
    // opts = field.generateOptions aus der UI-Config
    const id = await fetch('...')
    return opts?.prefix ? opts.prefix + id : id
  }
}
```

Die Rückgabe ist immer der **gespeicherte Wert** (also ggf. inkl. Prefix). Wenn `transform: uriSuffix` konfiguriert ist, zeigt das Eingabefeld nur den Suffix — die Kombination aus Generator und Transform funktioniert nahtlos.

---

## Bedingte Feldsichtbarkeit und bedingte Pflichtfelder

`src/config/fieldVisibility.js` exportiert:

- `fieldVisibilityFns`: benannte Funktionen `(formData) => boolean`
- `evaluateVisibleIf(fnName, formData)`: wertet eine Funktion aus; gibt `true` bei unbekanntem Namen
- `evaluateRequiredIf(fnName, formData)`: wertet dieselben Funktionen aus; gibt `false` bei unbekanntem Namen

`MetadataForm.vue` ruft `evaluateVisibleIf` in `groupFields()` auf — bei jedem Render reaktiv. `useValidation.js` ruft `evaluateRequiredIf` in `validateField()` auf.

```js
// fieldVisibility.js
ifHVDLegislation: (formData) =>
  formData?.['dcatap:applicableLegislation'] === 'http://data.europa.eu/eli/reg_impl/2023/138/oj'
```

```json
// ui-config
"dcatap:hvdCategory": {
  "visibleIf": "ifHVDLegislation",
  "requiredIf": "ifHVDLegislation"
}
```

Neue Funktion: Eintrag in `fieldVisibilityFns` — kein weiterer Code notwendig. Die Funktion steht automatisch für `visibleIf` und `requiredIf` zur Verfügung.

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
- `sh:maxCount 1` → `multiple: false`; `sh:maxCount` > 1 oder **fehlendes** `sh:maxCount` (= unbegrenzt) → `multiple: true`. Felder ohne explizite Kardinalitätsangabe sind daher standardmäßig wiederholbar (z. B. `dct:title`, `dct:description` in allen eingebauten Standards) und laufen über `RepeatableField`; UI-Config kann dies per `"multiple": false` überschreiben.
- `sh:message` → Fehlermeldungen

#### `pv:mappingLink`

Eigenschafts-Shapes können `pv:mappingLink <weitere NodeShape>` referenzieren, um ein eingebettetes Objektfeld zu beschreiben (z. B. `dcat:distribution` → `Distribution_Shape`).

- Erster Parse-Durchlauf: `SHACLParser` liest alle `NodeShape`s in der Datei unabhängig voneinander in `rawShapes` ein.
- Zweiter Durchlauf: Für jedes Feld mit `pv:mappingLink` wird die referenzierte `NodeShape` nachgeschlagen; ihre Felder werden als `field.subFields` an das verlinkende Feld gehängt, und der Feldtyp wird auf `object` gesetzt.
- Die verlinkte `NodeShape` wird zusätzlich als `embedded` markiert und dadurch von `FormConfigResolver` aus der Top-Level-Feldliste ausgeschlossen — sie taucht im Formular ausschließlich als `subFields` des verlinkenden Felds auf, nicht als eigenständiges Root-Feld (siehe auch [`rootClass`](./configuration.md#rootclass) in der Konfigurationsreferenz).

---

## Distributionen / DistributionEditor

`DistributionEditor.vue` ist die zentrale Komponente für die Bearbeitung von `dcat:distribution`-Feldern. Sie unterstützt zwei Modi, die über `field.distributionMode` gesteuert werden:

| Modus | Wert | Verhalten |
|---|---|---|
| Modal | `"modal"` (Standard) | Kompakte Kartenliste; Klick auf „Bearbeiten" öffnet ein Modal-Overlay (`DistributionModal.vue`) |
| Inline | `"inline"` | Aufklappbare Karten; das Formular wird direkt in der Seite angezeigt |

`DistributionForm.vue` rendert die Formularfelder einer einzelnen Distribution **generisch aus `field.subFields`** — über dieselbe `FieldGroup.vue`-Pipeline wie Top-Level-Felder und `ObjectField.vue` (siehe [Konfigurationsauflösung](#konfigurationsauflösung) unten). Es gibt keine hartcodierte Feldliste mehr; die Auswahl, Reihenfolge und Konfiguration der Distributionsfelder kommt vollständig aus der UI-Config (siehe `subFields` bei [`distribution-editor`](./configuration.md#distribution-editor--distributions-liste)). Die einzige feste Ausnahme ist das optionale Datei-Upload-Widget (`field.fileUpload`), das oberhalb der generischen Felder gerendert wird und beim erfolgreichen Upload `dcat:accessURL`/`dcat:downloadURL` befüllt.

`DistributionForm.vue` wird von beiden Modi genutzt — entweder direkt in den Inline-Karten oder über `DistributionModal.vue`.

Props von `DistributionEditor.vue`:

- `field` – Feldkonfiguration (inkl. `field.distributionMode`, `field.subFields`, `field.fileUpload`)
- `modelValue` – Array von Distribution-Objekten
- `lang` – Anzeigesprache
- `showErrors` – wie bei `FieldGroup`, steuert die Sichtbarkeit von Validierungsfehlern (im Wizard: erst nach Schrittwechsel-Versuch)

Ein neues, leeres Distribution-Objekt wird aus `field.subFields` abgeleitet (`defaultFieldValue()` in `src/config/fieldDefaults.js` — dieselbe Regel wie `App.vue`s `buildDefaultFormData`), nicht mehr aus einer hartcodierten Objektvorlage. `dct:format`-Optionen werden wie jedes andere `select`-Feld über `optionsSource` beim Konfigurations-Laden aufgelöst (`BaseConfigResolver.resolveVocabularies` rekursiert dafür in `field.subFields`).

Der aktive Modus kann zur Laufzeit über den Toggle-Button im Header umgeschaltet werden (siehe `toggleDistributionMode()` in App.vue).

### Datei-Upload (`FileUploader.js`)

`src/services/FileUploader.js` kapselt den HTTP-Upload einer Datei an eine externe API. Konfiguriert über das `fileUpload`-Objekt im Feldconfig (siehe `configuration.md`).

Unterstützte Strategien: `POST` (multipart/form-data) und `PUT` (Datei direkt im Body). Die Antwort wird als Plaintext-URL oder als JSON mit konfigurierbarem Feldpfad ausgewertet.

#### Auth-Provider-Hook

OntoForm verwaltet selbst keine Zugangsdaten. Die einbettende Anwendung registriert eine async Funktion, die Auth-Header liefert:

```js
FileUploader.setAuthProvider(async (config) => ({
  Authorization: `Bearer ${myAuthStore.getToken()}`
}))
```

Die Funktion wird vor jedem Upload aufgerufen. Ihr Rückgabewert wird mit den statischen `config.headers` gemergt (Provider-Header haben Vorrang). Mit `FileUploader.setAuthProvider(null)` wird der Hook entfernt.

Das optionale Feld `auth.type` in der Konfiguration (`"bearer"`, `"apikey"`, …) ist ein reiner Hinweis für Entwickler — OntoForm wertet ihn nicht aus.

---

## Konfigurationsauflösung

**Formular (FormConfigResolver):**

```
SHACL-Shape (.ttl)
        │
        ▼
  SHACLParser.parse()
        │
        ├──── ui-config.<standard>.json
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

**Viewer (ViewConfigResolver):**

```
ui-view-config.<standard>.json  +  ui-config.<standard>.json  (parallel)
        │                                    │
        │           form fields als Basis ◄──┘
        ▼
  merge (view overrides überschreiben form fields)
        │
        ├──── SHACL-Shape (.ttl)
        │           │
        ▼           ▼
  resolveFields() (BaseConfigResolver)
        │
        ▼
  Sections / Tabs filtern (visible: false ausschließen)
        │
        ▼
   ViewConfig { standard, version, rootClass, sections, fields }
```

Wenn keine `ui-view-config.<standard>.json` existiert, konvertiert `ViewConfigResolver` die `groups` der Formular-Konfiguration automatisch zu flachen Sections als Fallback.

---

## Validierung

`useValidation.js` exportiert:

- `validateField(field, value, lang, formData?)` → `string[]` (Fehler)
- `validateForm(config, formData, lang)` → `{[fieldId]: string[]}` (nur Felder mit Fehlern)

Regeln:
1. Pflichtprüfung (`field.required` oder `evaluateRequiredIf(field.requiredIf, formData)`) — wenn Feld leer: Fehler, weiterer Validator wird nicht mehr ausgeführt
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

## Vorschläge aus früheren Eingaben (`SuggestionsStore.js`)

`src/services/SuggestionsStore.js` verwaltet Vorschlagswerte für Felder mit `"remember": true`.

**Zwei Quellen (Priorität: Kontext > localStorage):**

| Quelle | Beschreibung |
|---|---|
| User Context | Vom einbettenden System per `suggestionsStore.setUserContext(map)` injiziert; nie in localStorage gespeichert |
| localStorage | Von OntoForm beim Export automatisch gespeichert; max. 5 Werte pro Feld |

**API:**

```js
suggestionsStore.setUserContext({ 'dct:publisher': [...], 'dcat:contactPoint': [...] })
suggestionsStore.get('dct:publisher')        // → alle Vorschläge (Kontext + localStorage)
suggestionsStore.save('dct:publisher', val)  // in localStorage schreiben
suggestionsStore.clear('dct:publisher')      // localStorage-Einträge löschen
suggestionsStore.label(value)               // → lesbare Kurzbezeichnung für Anzeige
```

`FieldSuggestions.vue` ist die zugehörige UI-Komponente (Chip-Leiste). Sie ist in `ObjectField.vue` und `TextField.vue` eingebunden und wird aktiviert, wenn `field.remember === true`.

---

## Feldkomponenten-Zuordnung (`fieldComponentMap.js`)

`src/config/fieldComponentMap.js` ist die zentrale Zuordnung Feldtyp → Vue-Komponente, aber sie enthält **nur Blatt-Feldtypen** (`text`, `textarea`, `select`, `date`, `uri`, `langstring`, `multiselect`, `map`, `searchselect`) — bewusst **ohne** `object` und `distribution-editor`:

```js
export const fieldComponentMap = {
  text: TextField, textarea: TextareaField, select: SelectField, date: DateField,
  uri: URIField, langstring: LangStringField, multiselect: MultiSelectField,
  map: MapField, searchselect: SearchSelectField,
}
export function fieldComponent(field, extra) {
  return (extra && extra[field.type]) || fieldComponentMap[field.type] || TextField
}
```

**Warum `object`/`distribution-editor` fehlen (zirkuläre Importe):** `ObjectField.vue` und `DistributionForm.vue` importieren `fieldComponentMap.js`, um ihre eigenen `subFields` zu rendern. Würde `fieldComponentMap.js` umgekehrt `ObjectField.vue`/`DistributionEditor.vue` importieren, entstünde ein Importzyklus (`fieldComponentMap → ObjectField → fieldComponentMap`), der unter Vite/Rollup im Library-Build dazu führt, dass Rollup die betroffenen Komponenten zwangsweise in separate Chunks auslagert — `dist/onto-form.es.js` wird dann fast leer, der eigentliche Code landet in zusätzlichen, nicht dokumentierten Chunk-Dateien. Im Dev-Server äußert sich derselbe Zyklus zusätzlich als „Cannot access '...' before initialization" (TDZ) beim ersten Laden.

Jeder Aufrufer erweitert die Basis-Map stattdessen lokal um das, was er tatsächlich braucht, über den zweiten `extra`-Parameter von `fieldComponent()`:

| Aufrufer | Erweiterung | Warum unproblematisch |
|---|---|---|
| `MetadataForm.vue` | `{ object: ObjectField, 'distribution-editor': DistributionEditor }` | Wird von keiner der beiden importiert — kein Zyklus |
| `ObjectField.vue` | `{ object: getCurrentInstance().type }` | Selbstreferenz für rekursive Verschachtelung (z. B. Adress-Unterobjekt in einem Agent-Unterobjekt) — kein Import nötig, daher kein Zyklus |
| `DistributionForm.vue` | `{ object: ObjectField }` | Direkter Import von `ObjectField.vue` ist sicher, da diese Datei ihrerseits nie `DistributionForm.vue`/`DistributionEditor.vue` importiert |

`distribution-editor` als Unterfeld-Typ innerhalb eines `object`- oder `distribution-editor`-Felds wird bewusst nicht unterstützt (keine reale DCAT-Shape verschachtelt Distributionslisten ineinander).

### `ObjectField.vue` und `DistributionForm.vue` delegieren an `FieldGroup.vue`

Beide Komponenten rendern ihre `subFields` nicht mit einer eigenen, reduzierten Logik, sondern instanziieren `FieldGroup.vue` — dieselbe Komponente, die auch Top-Level-Felder rendert. Dadurch erhalten Unterfelder automatisch alle Features, die Top-Level-Felder haben: `RepeatableField`-Einbettung bei `multiple: true`, Transform-Anzeige/-Kodierung, Fehleranzeige pro Feld, und Komponentenauswahl über dieselbe `fieldComponentMap`.

- `ObjectField.vue` filtert `field.subFields` nach `visible`/`visibleIf` (ausgewertet gegen das **Unterobjekt selbst**, nicht die globalen Formulardaten) und validiert sie über `validateField()` aus `useValidation.js`.
- `DistributionForm.vue` macht dasselbe für ein einzelnes Distribution-Objekt; das Datei-Upload-Widget bleibt eine feste Zusatzkomponente oberhalb der generischen Felder.
- `useValidation.js`s `validateField()` validiert `subFields` rekursiv für zwei Formen: ein einzelnes Unterobjekt (`field.type === 'object'`) und ein Array von Unterobjekten (`field.subFields` + Array-Wert, z. B. `distribution-editor`) — Fehler werden pro Array-Element mit `#<Index>:`-Präfix gesammelt.

### `subFields`-Normalisierung in `SHACLParser.js`

`SHACLParser.js` setzt `field.subFields` bei `pv:mappingLink` immer als **Array** (`Object.values(linkedShape.fields)`), nie als Objekt. Vor dieser Vereinheitlichung war das SHACL-abgeleitete `subFields` ein Objekt (`{ [fieldId]: fieldDef }`), während handgeschriebene `subFields` in `ui-config.*.json` immer Arrays waren — eine Inkonsistenz, die zu `.filter is not a function`-artigen Fehlern führen konnte, sobald ein `object`-Feld ausschließlich auf SHACL-abgeleitete Unterfelder ohne UI-Config-Override angewiesen war.

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
2. In `src/config/fieldComponentMap.js` eintragen — steht damit automatisch für Top-Level-Felder, `object`-Unterfelder und `distribution-editor`-Unterfelder gleichermaßen zur Verfügung
3. In `RDFExporter.js` und `RDFImporter.js` Serialisierung/Deserialisierung ergänzen
