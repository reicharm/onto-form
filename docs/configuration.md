# Konfigurationsreferenz

Die Anwendung wird über drei Ebenen konfiguriert:

1. **UI-Config JSON** (`src/config/ui-config.*.json` + `public/config/`) — Felder, Gruppen, Labels, Validierung, Compute
2. **`fieldValidators.js`** (`src/config/`) — benannte Validierungsfunktionen
3. **`fieldComputes.js`** (`src/config/`) — benannte Compute-Funktionen

> **Hinweis:** Die Dateien in `src/config/` und `public/config/` müssen immer synchron gehalten werden. Die App lädt zur Laufzeit aus `public/config/`.

---

## UI-Config JSON

Jeder Metadatenstandard hat eine eigene Config-Datei:

| Standard | Datei |
|---|---|
| DCAT-AP.at | `ui-config.dcat-ap-at.json` |
| DCAT-AP 3.0 | `ui-config.dcat-ap-3.json` |
| GeoDCAT | `ui-config.geodcat.json` |

### Grundstruktur

```json
{
  "standard": "dcat-ap-at",
  "version": "2.0",
  "groups": [ ... ],
  "fields": { ... }
}
```

### Gruppen (`groups`)

Felder werden in benannte Gruppen organisiert, die als Abschnitte im Formular dargestellt werden:

```json
{
  "id": "basic",
  "label": { "de": "Grundinformationen", "en": "Basic Information" },
  "fields": ["dct:title", "dct:description", "dct:identifier"]
}
```

### Felddefinitionen (`fields`)

Jedes Feld wird unter seinem RDF-Präfix-Schlüssel definiert:

```json
"dct:title": {
  "type": "langstring",
  "required": true,
  "validate": "isURI",
  "compute": "setTodayIfTitle",
  "label": { "de": "Titel", "en": "Title" },
  "placeholder": { "de": "...", "en": "..." },
  "hint": { "de": "...", "en": "..." },
  "defaultValue": { "de": "", "en": "" },
  "multiple": false,
  "visible": true,
  "order": 1,
  "errorMessages": {
    "required": { "de": "Titel ist erforderlich", "en": "Title is required" }
  },
  "options": [ ... ],
  "subFields": [ ... ]
}
```

#### Alle Feld-Eigenschaften

| Eigenschaft | Typ | Beschreibung |
|---|---|---|
| `type` | `string` | Feldtyp (siehe unten) |
| `required` | `boolean` | Pflichtfeld |
| `validate` | `string` | Name einer Funktion aus `fieldValidators.js` |
| `compute` | `string` | Name einer Funktion aus `fieldComputes.js` |
| `label` | `{de, en}` | Beschriftung |
| `placeholder` | `{de, en}` | Platzhaltertext |
| `hint` | `{de, en}` | Hilfetext unter dem Feld |
| `defaultValue` | `any` | Vorausgefüllter Startwert |
| `multiple` | `boolean` | Wiederholbares Feld (Array) |
| `visible` | `boolean` | Feld im Formular anzeigen |
| `order` | `number` | Sortierreihenfolge innerhalb der Gruppe |
| `errorMessages` | `object` | Lokalisierte Fehlermeldungen |
| `options` | `array` | Optionen für `select` und `multiselect` |
| `subFields` | `array` | Sub-Felder für `object` |

#### Verfügbare Feldtypen

| `type` | Beschreibung | Wert |
|---|---|---|
| `text` | Einzeiliges Textfeld | `string` |
| `textarea` | Mehrzeiliges Textfeld | `string` |
| `langstring` | Mehrsprachiger Text | `{de: string, en: string}` |
| `uri` | URL/URI-Eingabe | `string` |
| `date` | Datumsauswahl | `string` (YYYY-MM-DD) |
| `select` | Einzelauswahl aus Vokabular | `string` |
| `multiselect` | Mehrfachauswahl aus Vokabular | `string[]` |
| `object` | Unterobjekt mit Sub-Feldern | `object` |

#### Optionen (für `select` und `multiselect`)

```json
"options": [
  {
    "value": "http://publications.europa.eu/resource/authority/data-theme/AGRI",
    "label": { "de": "Landwirtschaft", "en": "Agriculture" }
  }
]
```

#### Sub-Felder (für `object`)

Sub-Felder unterstützen dieselben Eigenschaften wie normale Felder (`type`, `required`, `validate`, `label`):

```json
"subFields": [
  { "id": "foaf:name", "type": "text", "required": true, "label": { "de": "Name", "en": "Name" } },
  { "id": "foaf:homepage", "type": "uri", "validate": "isURI", "label": { "de": "Webseite", "en": "Homepage" } }
]
```

---

## Validierungsfunktionen (`fieldValidators.js`)

In `src/config/fieldValidators.js` werden benannte Validatoren definiert. Ein Feld referenziert einen Validator mit `"validate": "<name>"`.

### Signatur

```js
(value, lang) => string[]
// Leeres Array = gültig
// Strings im Array = Fehlermeldungen
```

### Eingebaute Validatoren

| Name | Prüft |
|---|---|
| `isURI` | Gültige URL (`http://` oder `https://`) |
| `isURIList` | Jeder Eintrag in einem Array ist eine gültige URL |
| `isEmail` | Gültiges E-Mail-Format |
| `isDate` | Format `YYYY-MM-DD` |
| `isWKTorGeoJSON` | WKT-Geometrie oder GeoJSON-Objekt |

### Neuen Validator hinzufügen

```js
// src/config/fieldValidators.js
export const fieldValidators = {
  // ... bestehende Validatoren ...

  isPositiveNumber: (value, lang) => {
    if (!value) return []
    return Number(value) > 0
      ? []
      : [lang === 'de' ? 'Muss eine positive Zahl sein.' : 'Must be a positive number.']
  }
}
```

Danach in der UI-Config:
```json
"dcat:byteSize": { "type": "text", "validate": "isPositiveNumber" }
```

---

## Compute-Funktionen (`fieldComputes.js`)

In `src/config/fieldComputes.js` werden benannte Compute-Funktionen definiert. Ein Feld referenziert eine Funktion mit `"compute": "<name>"`. Sie laufen nach jeder Formularänderung.

### Signatur

```js
(formData, lang) => value | undefined
// undefined = Feld nicht ändern
// Anderer Wert = Feld überschreiben
```

### Eingebaute Funktionen

| Name | Verhalten |
|---|---|
| `setTodayIfTitle` | Setzt das Feld auf das heutige Datum, wenn ein Titel vorhanden ist |
| `setToday` | Setzt das Feld immer auf das heutige Datum |
| `setLanguageFromUI` | Setzt `dct:language` aus der UI-Sprache, wenn noch leer |

### Neue Compute-Funktion hinzufügen

```js
// src/config/fieldComputes.js
export const fieldComputeFns = {
  // ... bestehende Funktionen ...

  copyTitleToIdentifier: (data) => {
    const title = data['dct:title']?.de
    if (!title || data['dct:identifier']) return undefined
    return `https://example.org/datasets/${encodeURIComponent(title)}`
  }
}
```

Danach in der UI-Config:
```json
"dct:identifier": { "type": "uri", "compute": "copyTitleToIdentifier" }
```

### Abhängigkeiten zwischen Feldern

Da alle Compute-Funktionen `formData` (den gesamten aktuellen Formularstand) erhalten, können beliebige Feldabhängigkeiten abgebildet werden:

```js
setModifiedFromIssued: (data) => {
  // Setzt modified auf issued, wenn modified noch leer
  if (data['dct:modified']) return undefined
  return data['dct:issued'] || undefined
}
```

---

## Neuen Metadatenstandard hinzufügen

1. SHACL-Datei erstellen: `src/shacl/<standard>.ttl` und `public/shacl/<standard>.ttl`
2. UI-Config erstellen: `src/config/ui-config.<standard>.json` und `public/config/ui-config.<standard>.json`
3. Standard in `App.vue` registrieren:
   ```js
   const standards = [
     { id: 'dcat-ap-at', label: 'DCAT-AP.at' },
     { id: 'mein-standard', label: 'Mein Standard' }  // hinzufügen
   ]
   ```
