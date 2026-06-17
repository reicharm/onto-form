# Konfigurationsreferenz – DCAT-AP Metadata Editor

Die Formularkonfiguration setzt sich aus zwei Quellen zusammen:

1. **SHACL-Shape** (z. B. `public/shacl/dcat-ap-at.ttl`) – liefert Feldtypen, Kardinalität, Pflichtfelder
2. **UI-Config** (z. B. `public/config/ui-config.dcat-ap-at.json`) – erweitert und überschreibt SHACL-Daten für die Anzeige

`FormConfigResolver` lädt beide, merged sie und löst externe Vokabulare auf.

---

## UI-Config: Struktur

```json
{
  "standard": "dcat-ap-at",
  "version": "2.0",
  "wizard": true,
  "groups": [ ... ],
  "fields": { ... }
}
```

### `wizard`

`true` aktiviert den Schritt-Assistenten als Standard beim Start. Standardmäßig `true` für alle drei vordefinierten Standards. Der Nutzer kann über den Header-Button jederzeit zwischen Wizard und Einzel-Seite wechseln.

---

## Gruppen (`groups`)

Jede Gruppe entspricht einem Schritt im Wizard bzw. einem Abschnitt auf der Einzel-Seite.

```json
{
  "id": "basic",
  "label": { "de": "Grundinformationen", "en": "Basic Information" },
  "fields": ["dct:title", "dct:description", "dct:identifier"],
  "visible": true
}
```

| Eigenschaft | Typ | Beschreibung |
|---|---|---|
| `id` | string | Eindeutige ID der Gruppe |
| `label` | `{de, en}` | Angezeigter Name |
| `fields` | string[] | Geordnete Liste der Feld-IDs |
| `visible` | boolean | `false` blendet die Gruppe aus (Standard: `true`) |

---

## Felder (`fields`)

```json
"dct:title": {
  "type": "langstring",
  "required": true,
  "label": { "de": "Titel", "en": "Title" },
  "placeholder": { "de": "Titel eingeben", "en": "Enter title" },
  "hint": { "de": "...", "en": "..." },
  "errorMessages": {
    "required": { "de": "Titel ist erforderlich", "en": "Title is required" }
  },
  "order": 1,
  "visible": true,
  "multiple": false,
  "compute": "setTodayIfTitleAndEmpty",
  "validate": "isURI",
  "options": [...],
  "optionsSource": "https://...",
  "optionsSourceFallback": "/vocabularies/..."
}
```

### Allgemeine Eigenschaften

| Eigenschaft | Typ | Beschreibung |
|---|---|---|
| `type` | string | Feldtyp (siehe unten) |
| `required` | boolean | Pflichtfeld |
| `label` | `{de, en}` | Feldbezeichnung |
| `placeholder` | `{de, en}` | Platzhaltertext |
| `hint` | `{de, en}` | Hilfetext unter dem Feld |
| `errorMessages` | object | Eigene Fehlermeldungen |
| `order` | number | Reihenfolge innerhalb der Gruppe |
| `visible` | boolean | `false` = Feld unsichtbar (aber weiterhin aktiv für Berechnung und Export) |
| `multiple` | boolean | Wiederholbares Feld (RepeatableField) |
| `defaultValue` | any | Standardwert bei Initialisierung |

### Feldtypen

| Wert | Komponente | Beschreibung |
|---|---|---|
| `text` | `TextField` | Einzeiliger Text |
| `textarea` | `TextareaField` | Mehrzeiliger Text |
| `langstring` | `LangStringField` | Sprachspezifischer Text (Sprachkürzel → Wert) |
| `uri` | `URIField` | URI-Eingabe |
| `date` | `DateField` | Datum (ISO 8601) |
| `select` | `SelectField` | Einzelauswahl |
| `multiselect` | `MultiSelectField` | Mehrfachauswahl (Checkbox-Liste); wird nie in `RepeatableField` eingebettet, auch wenn SHACL `multiple: true` setzt |
| `object` | `ObjectField` | Zusammengesetztes Feld mit Unterfeldern |

### Validierung: `validate`

Referenziert eine benannte Validator-Funktion aus `fieldValidators.js`. Validatoren laufen **nur wenn das Feld einen Wert enthält** – leere optionale Felder sind immer gültig.

Vordefinierte Validatoren:

| Name | Prüfung |
|---|---|
| `isURI` | Gültige URI |
| `isEmail` | Gültige E-Mail-Adresse |
| `isDate` | Datum im Format YYYY-MM-DD |
| `isURIList` | Array von URIs (für mehrwertige URI-Felder) |
| `isWKTorGeoJSON` | WKT- oder GeoJSON-Geometrie |

### Berechnungen: `compute`

Referenziert eine benannte Funktion aus `fieldComputes.js`. Die Funktion erhält `(formData, lang, fieldId)` und gibt einen neuen Wert oder `undefined` zurück.

Vordefinierte Compute-Funktionen:

| Name | Verhalten |
|---|---|
| `setTodayIfTitle` | Setzt heute's Datum, wenn ein Titel vorhanden ist. **Überschreibt immer.** |
| `setTodayIfTitleAndEmpty` | Setzt heute's Datum nur wenn das Feld noch leer ist. Importierte/manuelle Werte bleiben erhalten. |
| `setToday` | Setzt immer das heutige Datum. |
| `setLanguageFromUI` | Setzt Sprach-URI aus der aktuellen UI-Sprache, wenn Feld leer. |

### Transforms: `transform` / `transformOptions`

Ein Transform trennt den **angezeigten Wert** vom **gespeicherten Wert**. Das Feld-Komponent sieht nur den Anzeigewert; `encode()` wandelt ihn vor dem Speichern automatisch um.

```json
"dct:identifier": {
  "type": "text",
  "transform": "uriSuffix",
  "transformOptions": { "prefix": "https://data.gv.at/dataset/" },
  "label": { "de": "Datensatz-ID", "en": "Dataset ID" },
  "placeholder": { "de": "mein-datensatz-2024", "en": "my-dataset-2024" }
}
```

Der Nutzer tippt nur `mein-datensatz-2024`; gespeichert und exportiert wird `https://data.gv.at/dataset/mein-datensatz-2024`. Unter dem Feld erscheint eine Vorschau des gespeicherten Werts.

Vordefinierte Transforms (`src/config/fieldTransforms.js`):

| Name | Anzeige | Gespeichert |
|---|---|---|
| `uriSuffix` | Letztes Pfadsegment der URI | Vollständige URI (Prefix aus `transformOptions.prefix` oder aus bestehendem Wert) |
| `stripPrefix` | Wert ohne konfigurierten Prefix | Wert mit Prefix |

Eigene Transforms: neue Einträge in `fieldTransforms.js` als `{ display(stored, opts), encode(display, opts, stored) }` — kein weiterer Code notwendig.

### Bedingte Sichtbarkeit: `visibleIf`

Referenziert eine benannte Funktion aus `fieldVisibility.js`. Das Feld wird nur angezeigt, wenn die Funktion `true` zurückgibt — sie wird bei jedem Render reaktiv gegen den aktuellen `formData`-Stand ausgewertet.

```json
"dcatap:hvdCategory": {
  "visibleIf": "ifHVDLegislation",
  "type": "select",
  "label": { "de": "HVD-Kategorie", "en": "HVD Category" }
}
```

Vordefinierte Visibility-Funktionen:

| Name | Bedingung |
|---|---|
| `ifHVDLegislation` | Wahr, wenn `dcatap:applicableLegislation` die URI der EU-HVD-Durchführungsverordnung (`2023/138`) enthält |

Neue Funktion hinzufügen: Eintrag in `src/config/fieldVisibility.js` unter `fieldVisibilityFns`:

```js
meineBedingung: (formData) => formData['dct:type'] === 'http://...'
```

Im Unterschied zu `"visible": false` (statisch, konfigurationszeit) ist `visibleIf` dynamisch und reagiert auf Nutzereingaben. Felder mit `visibleIf` werden bei nicht erfüllter Bedingung vollständig ausgeblendet — sie nehmen nicht an Validierung, aber weiterhin am Export teil, solange `formData` einen Wert enthält.

### Versteckte Felder: `"visible": false`

Felder mit `"visible": false` erscheinen nicht im Formular, werden aber weiterhin:
- durch `compute`-Funktionen befüllt
- beim Export in JSON-LD/Turtle ausgegeben

Typischer Anwendungsfall: automatisch berechnete Metadaten (z. B. Erstellungsdatum), die nicht manuell bearbeitet werden sollen.

---

## Vokabulare

### Inline-Optionen: `options`

```json
"options": [
  { "value": "http://...", "label": { "de": "Deutsch", "en": "German" } }
]
```

### Externe Vokabulare: `optionsSource` / `optionsSourceFallback`

```json
"optionsSource": "https://publications.europa.eu/resource/authority/language.json",
"optionsSourceFallback": "/vocabularies/language.json"
```

- `optionsSource`: primäre URL (Web-API oder lokaler Pfad)
- `optionsSourceFallback`: Fallback, falls primäre Quelle fehlschlägt (z. B. CORS-Fehler)

Externe Optionen werden beim Laden der Konfiguration parallel aufgelöst und gecacht. Inline-`options` werden **nach** den geladenen Optionen angehängt.

#### Unterstützte Antwortformate

| Format | Erkennung | Beschreibung |
|---|---|---|
| Nativ | `[{value, label}]` | Direktes Format des Editors |
| SKOS-lite | `[{uri, prefLabel}]` | URI als Wert, `prefLabel` als Sprachmap |
| JSON-LD | `{"@graph": [...]}` | Objekte mit `@id` und `skos:prefLabel` |
| SPARQL JSON | `{results: {bindings: [...]}}` | SPARQL-Ergebnis mit `concept`/`uri` und `label` |

#### Lokale Vokabulardateien

Lokale Dateien liegen unter `public/vocabularies/`. Beispiele:

- `public/vocabularies/language.json` – Sprachvokabular (Fallback)
- `public/vocabularies/data-theme.json` – Datenkategorien für `dcat:theme`

---

## Unterfelder (`subFields`)

Für Felder vom Typ `object`:

```json
"dcat:contactPoint": {
  "type": "object",
  "subFields": [
    { "id": "vcard:fn", "type": "text", "label": { "de": "Name", "en": "Name" }, "required": true },
    { "id": "vcard:hasEmail", "type": "text", "validate": "isEmail", "label": { "de": "E-Mail", "en": "Email" } }
  ]
}
```

Unterfelder unterstützen `required` und `validate`, aber keine weiteren verschachtelten `subFields`.

---

## Beispiel: Vollständige Feldkonfiguration

```json
"dct:language": {
  "type": "select",
  "label": { "de": "Sprache", "en": "Language" },
  "optionsSource": "https://publications.europa.eu/resource/authority/language.json",
  "optionsSourceFallback": "/vocabularies/language.json",
  "defaultValue": "http://publications.europa.eu/resource/authority/language/DEU",
  "order": 10,
  "visible": true
}
```

```json
"dct:modified": {
  "type": "date",
  "compute": "setTodayIfTitleAndEmpty",
  "label": { "de": "Zuletzt geändert", "en": "Last Modified" },
  "order": 5,
  "visible": true
}
```

---

## SHACL-Integration

`SHACLParser` liest SHACL-Shapes aus Turtle-Dateien und extrahiert:

- Feldtypen (Mapping: XSD-Datentypen → interne Typen)
- Kardinalität (`sh:minCount`, `sh:maxCount`) → `required`, `multiple`
- Fehlermeldungen (`sh:message`)

UI-Config-Werte überschreiben SHACL-Werte bei Konflikten. Labels und Hints werden gemergt.
