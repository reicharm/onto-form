# Technische Dokumentation

## Architektur-Überblick

```
src/
├── App.vue                          # Root-Komponente, Standard-/Sprachwahl, Compute-Watcher
├── main.js                          # Vue-App-Initialisierung
├── components/
│   ├── StandardSelector.vue         # Dropdown für Standard-Auswahl
│   ├── MetadataForm.vue             # Formular-Rendering, Validierung, Feldverteilung
│   ├── ExportPanel.vue              # Export-Modal (JSON-LD / Turtle)
│   └── fields/
│       ├── TextField.vue            # Feldtyp: text
│       ├── TextareaField.vue        # Feldtyp: textarea
│       ├── SelectField.vue          # Feldtyp: select
│       ├── MultiSelectField.vue     # Feldtyp: multiselect
│       ├── DateField.vue            # Feldtyp: date
│       ├── URIField.vue             # Feldtyp: uri
│       ├── LangStringField.vue      # Feldtyp: langstring (parallel DE/EN)
│       ├── LangStringItem.vue       # Einzeleintrag in RepeatableField für langstring
│       ├── ObjectField.vue          # Feldtyp: object (Unterobjekte)
│       └── RepeatableField.vue      # Wrapper für multiple: true Felder
├── composables/
│   └── useValidation.js             # validateField(), validateForm()
├── config/
│   ├── fieldComputes.js             # Benannte Compute-Funktionen, applyComputes()
│   ├── fieldValidators.js           # Benannte Validierungsfunktionen
│   ├── ui-config.dcat-ap-at.json
│   ├── ui-config.dcat-ap-3.json
│   └── ui-config.geodcat.json
├── services/
│   ├── FormConfigResolver.js        # Lädt und merged SHACL + UI-Config
│   ├── SHACLParser.js               # Parst SHACL-TTL zu Felddefinitionen
│   └── RDFExporter.js               # Exportiert formData → JSON-LD / Turtle
└── shacl/
    ├── dcat-ap-at.ttl
    ├── dcat-ap-3.ttl
    └── geodcat.ttl

public/
├── config/                          # Laufzeit-Kopien der UI-Configs (fetch)
└── shacl/                           # Laufzeit-Kopien der SHACL-Dateien (fetch)
```

---

## Datenfluss

```
App.vue
  └─ loadFormConfig(standard)
       ├─ FormConfigResolver.resolve(standard)
       │    ├─ fetch /shacl/<standard>.ttl  →  SHACLParser.parse()
       │    └─ fetch /config/ui-config.<standard>.json
       │         └─ merge: SHACL-Felder + UI-Config-Overrides
       │              (UI-Config gewinnt bei Konflikten)
       │
       ├─ buildDefaultFormData(config)
       │    └─ initialisiert formData aus defaultValue / Typ-Defaults
       │
       └─ watch([formData, lang])
            └─ applyComputes(config, formData, lang)
                 └─ liest field.compute → fieldComputeFns[name](formData, lang)

MetadataForm.vue
  ├─ groupFields(group) → sortiert und filtert sichtbare Felder
  ├─ fieldComponent(field) → wählt Vue-Komponente nach field.type
  ├─ fieldErrors = validateForm(config, formData, lang)
  │    └─ pro Feld: validateField(field, value, lang)
  │         ├─ required-Prüfung
  │         ├─ field.validate → fieldValidators[name](value, lang)
  │         └─ Sub-Felder rekursiv (für object-Typ)
  └─ isValid = Object.keys(fieldErrors).length === 0

ExportPanel.vue
  ├─ RDFExporter.toJSONLD(formData, standard)
  └─ RDFExporter.toTurtle(formData, standard)
```

---

## Komponenten

### `App.vue`

Zentrale Zustandsverwaltung:
- `selectedStandard` — aktiver Metadatenstandard
- `lang` — aktive UI-Sprache (`'de'` | `'en'`)
- `formConfig` — geladene und gemergete Konfiguration
- `formData` — reaktives Formularobjekt (Feldinhalte)

Beim Standardwechsel wird `formData` neu initialisiert. Ein `deep`-Watcher auf `[formData, lang]` ruft nach jeder Änderung `applyComputes()` auf.

### `MetadataForm.vue`

Rendert alle Formulargruppen dynamisch. Für jedes Feld:
- Wenn `field.multiple === true` → `RepeatableField`
- Sonst → direkte Komponente aus `componentMap`

Fehler aus `validateForm()` werden als `{ [fieldId]: string[] }` berechnet und inline unter dem jeweiligen Feld angezeigt. Das Feld-Wrapper-Element bekommt die CSS-Klasse `has-error`, die den Eingabe-Rahmen per `:deep()` rot färbt.

### `RepeatableField.vue`

Wrapper für Felder mit `multiple: true`. Verwaltet ein Array von Einzelwerten:
- Für `type: 'langstring'` → rendert `LangStringItem` (Textfeld + Sprachauswahl)
- Für andere Typen → rendert die normale Feldkomponente

Minimum: immer mindestens ein Eintrag. Beim Entfernen des letzten Eintrags bleibt ein leerer übrig.

### `ObjectField.vue`

Rendert einen `<fieldset>`-Block mit hellgrauem Hintergrund. Mappt Sub-Felder auf Feldkomponenten (rekursiv dieselbe `componentMap` wie in `MetadataForm`). Emittiert ein gemertes Sub-Objekt bei jeder Änderung.

---

## Services

### `FormConfigResolver`

Lädt SHACL und UI-Config parallel per `fetch()`. Merge-Logik:

```
mergedField = {
  ...shaclField,     // Basis aus SHACL (type, label, required, order, ...)
  ...uiField,        // UI-Config überschreibt alles
  label: { ...shaclField.label, ...uiField.label },
  hint:  { ...shaclField.hint,  ...uiField.hint  }
}
```

Felder, die nur in der UI-Config stehen (nicht in SHACL), werden mit `type: 'text'` und `visible: true` als Fallback eingefügt.

### `SHACLParser`

Parst Turtle-Dateien mit N3.js zu einem In-Memory-Quad-Store. Extrahiert alle `sh:NodeShape`-Definitionen und deren `sh:property`-Shapes. Typ-Mapping:

| SHACL-Constraint | Feldtyp |
|---|---|
| `sh:datatype xsd:string` | `text` |
| `sh:datatype xsd:date` / `xsd:dateTime` | `date` |
| `sh:datatype xsd:anyURI` | `uri` |
| `sh:datatype rdf:langString` | `langstring` |
| `sh:nodeKind sh:IRI` | `uri` |
| `sh:in (...)` | `select` (mit Optionen) |

`multiple` ergibt sich aus `sh:maxCount`: fehlt `maxCount` oder `maxCount > 1` → `multiple: true`.

### `RDFExporter`

Konvertiert `formData` in RDF-Serialisierungen. Werttypen:

| Wert | JSON-LD | Turtle |
|---|---|---|
| `string` (URI) | direkt | `<uri>` |
| `string` (Datum) | direkt | `"..."^^xsd:date` |
| `string` (Text) | direkt | `"..."` |
| `{de, en}` (langstring) | `{"@value": ..., "@language": ...}` | `"..."@de, "..."@en` |
| `[{value, lang}]` (wiederholbar) | Array von Language Objects | je ein `"..."@lang`-Triple |
| `string[]` (multiselect) | Array von Strings/URIs | je ein URI-Triple |
| `{foaf:name, ...}` (Objekt) | eingebettetes JSON-Objekt | Blank Node `[ ... ]` |

Ob ein Wert als URI erkannt wird: `value.startsWith('http://')` oder `'https://'`.

---

## Validierungssystem

Zentraler Einstiegspunkt: `useValidation.js`

```
validateForm(config, formData, lang)
  └─ pro Feld in config.fields:
       validateField(field, value, lang)
         1. required → hasValue(value, field)
         2. field.validate → fieldValidators[field.validate](value, lang)
         3. type === 'object' → Sub-Felder rekursiv mit validateField()
```

`hasValue()` erkennt:
- `null` / `undefined` → leer
- Leerer String → leer
- Array → mindestens ein nicht-leeres Element
- Sprachobjekt `{de, en}` → mindestens eine Sprache befüllt
- Sub-Objekt → alle `required`-Sub-Felder befüllt

---

## Compute-System

`applyComputes(config, formData, lang)` in `fieldComputes.js`:

1. Iteriert alle Felder mit `field.compute`
2. Schlägt die Funktion in `fieldComputeFns` nach
3. Führt sie mit `(formData, lang)` aus
4. Vergleicht Ergebnis mit aktuellem Wert per Deep-Equal (`JSON.stringify`)
5. Nur bei Änderung: neues `formData`-Objekt zurückgeben

Der `deep`-Watcher in `App.vue` erkennt dann das neue Objekt-Referenz und aktualisiert `formData.value`. Da nur bei tatsächlicher Wertänderung ein neues Objekt entsteht, gibt es keine rekursive Endlosschleife.

---

## SHACL-Präfix-Anforderungen

Alle SHACL-Dateien benötigen folgende Präfixe. Fehlende Präfixe führen zu Parse-Fehlern:

```turtle
@prefix sh:    <http://www.w3.org/ns/shacl#> .
@prefix rdf:   <http://www.w3.org/1999/02/22-rdf-syntax-ns#> .
@prefix dcat:  <http://www.w3.org/ns/dcat#> .
@prefix dct:   <http://purl.org/dc/terms/> .
@prefix xsd:   <http://www.w3.org/2001/XMLSchema#> .
@prefix foaf:  <http://xmlns.com/foaf/0.1/> .
@prefix vcard: <http://www.w3.org/2006/vcard/ns#> .
```

Weitere Präfixe je nach Standard (z.B. `geo:`, `locn:`, `odrl:`).

---

## Bekannte Einschränkungen

- Die `public/config/`- und `public/shacl/`-Dateien müssen manuell mit den `src/`-Versionen synchronisiert werden (kein automatischer Copy-Step im Build).
- Der RDF-Export erkennt URIs ausschließlich anhand des `http://`/`https://`-Präfixes; andere URI-Schemata werden als Literale exportiert.
- Sub-Objekte werden als Blank Nodes exportiert — Named Nodes (mit eigener URI) sind noch nicht unterstützt.
