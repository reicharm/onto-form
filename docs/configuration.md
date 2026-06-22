# Konfigurationsreferenz – OntoForm

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
| `required` | boolean | Statisches Pflichtfeld |
| `requiredIf` | string | Bedingtes Pflichtfeld – Name einer Funktion aus `fieldVisibility.js` (siehe unten) |
| `label` | `{de, en}` | Feldbezeichnung |
| `placeholder` | `{de, en}` | Platzhaltertext |
| `hint` | `{de, en}` | Hilfetext unter dem Feld |
| `errorMessages` | object | Eigene Fehlermeldungen (siehe unten) |
| `order` | number | Reihenfolge innerhalb der Gruppe |
| `visible` | boolean | `false` = Feld unsichtbar (aber weiterhin aktiv für Berechnung und Export) |
| `multiple` | boolean | Wiederholbares Feld (RepeatableField) |
| `defaultValue` | any | Standardwert bei Initialisierung |
| `generate` | string | Name eines ID-Generators (siehe unten) |
| `generateOptions` | object | Optionen für den Generator (z. B. `prefix`) |
| `remember` | boolean | Frühere Eingaben als Vorschläge anbieten (siehe unten) |

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

### Eigene Fehlermeldungen: `errorMessages`

Mit `errorMessages` können die Standard-Fehlermeldungen pro Fehlertyp und Sprache überschrieben werden:

```json
"dct:identifier": {
  "required": true,
  "validate": "isURI",
  "errorMessages": {
    "required": {
      "de": "Identifikator ist erforderlich",
      "en": "Identifier is required"
    }
  }
}
```

Aktuell unterstützter Schlüssel: `required`. Validator-Fehlermeldungen werden direkt in `fieldValidators.js` lokalisiert.

---

### Bedingte Pflichtfelder: `requiredIf`

Analog zu `visibleIf` kann ein Feld nur dann als Pflichtfeld gelten, wenn eine bestimmte Bedingung erfüllt ist:

```json
"dcatap:hvdCategory": {
  "type": "select",
  "visibleIf": "ifHVDLegislation",
  "requiredIf": "ifHVDLegislation",
  "label": { "de": "HVD-Kategorie", "en": "HVD Category" }
}
```

`requiredIf` referenziert dieselben Funktionen aus `fieldVisibility.js` wie `visibleIf`. Das Feld zeigt in der Übersicht einen Fehler und blockiert den Export, solange die Bedingung wahr ist und das Feld leer bleibt.

Kombination mit `visibleIf`: Wenn ein Feld sowohl `visibleIf` als auch `requiredIf` trägt, wird die Pflichtprüfung nur durchgeführt, wenn das Feld auch sichtbar ist — da `visibleIf`-Felder bei nicht erfüllter Bedingung vollständig aus dem DOM entfernt werden und nicht validiert werden.

---

### ID-Generatoren: `generate` / `generateOptions`

Für Felder vom Typ `text` oder `uri` kann automatisch ein Identifikator erzeugt werden:

```json
"dct:identifier": {
  "type": "text",
  "generate": "uuid",
  "generateOptions": { "prefix": "https://data.gv.at/dataset/" },
  "transform": "uriSuffix",
  "transformOptions": { "prefix": "https://data.gv.at/dataset/" }
}
```

**Verhalten:**
- Beim Öffnen eines leeren Formulars wird automatisch ein Wert erzeugt.
- Ein ↺-Button neben dem Eingabefeld ermöglicht das manuelle Neu-Generieren.
- `generateOptions.prefix` wird dem generierten Wert vorangestellt, um eine vollständige URI zu erzeugen.

Vordefinierte Generatoren (`src/config/idGenerators.js`):

| Name | Algorithmus | Beispielausgabe |
|---|---|---|
| `uuid` | RFC 4122 v4 UUID via `crypto.randomUUID()` | `https://data.gv.at/dataset/550e8400-e29b-41d4-a716-446655440000` |
| `slugDate` | Heutiges Datum + 4 Hex-Zeichen | `https://data.gv.at/dataset/2026-06-19-a3f1` |
| `nanoid` | 21 URL-sichere Zufallszeichen (`[A-Za-z0-9_-]`) | `https://data.gv.at/dataset/V1StGXR8_Z5jdHi6B-myT` |

**`generateOptions`:**
| Option | Typ | Beschreibung |
|---|---|---|
| `prefix` | string | Wird dem generierten Wert vorangestellt |
| `length` | number | Nur für `nanoid`: Länge der Zeichenkette (Standard: 21) |

Eigenen Generator hinzufügen: Eintrag in `src/config/idGenerators.js` unter `idGenerators` als synchrone oder asynchrone Funktion `(opts) => string`:

```js
// Beispiel: DOI per externe API
doi: async (opts) => {
  const res = await fetch('https://api.datacite.org/dois', { method: 'POST', ... })
  const data = await res.json()
  return data.data.attributes.doi
}
```

---

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

Unterstützte Subfeld-Typen: `text`, `textarea`, `uri`, `date`, `select`, `langstring`.

### `rdfType`

Optionale Eigenschaft auf `object`-Feldern. Gibt den RDF-Typ des Blank Nodes an:

```json
"dct:temporal": {
  "type": "object",
  "rdfType": "dct:PeriodOfTime",
  "label": { "de": "Zeitliche Abdeckung", "en": "Temporal Coverage" },
  "subFields": [
    { "id": "dcat:startDate", "type": "date", "label": { "de": "Von", "en": "Start date" } },
    { "id": "dcat:endDate",   "type": "date", "label": { "de": "Bis", "en": "End date" } }
  ]
}
```

Der Typ wird beim Export als `a dct:PeriodOfTime` (Turtle), `<dct:PeriodOfTime>` (RDF/XML) bzw. `"@type": "dct:PeriodOfTime"` (JSON-LD) ausgegeben und beim Import round-trip-sicher eingelesen.

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

## `fileUpload` – Datei-Upload für Distributionen

Optionale Eigenschaft auf Feldern vom Typ `distribution`. Aktiviert ein Upload-Widget in `DistributionForm`, mit dem Dateien direkt an eine API gesendet werden. Die zurückgegebene URL wird als `dcat:downloadURL` eingetragen.

```json
"dcat:distribution": {
  "fileUpload": {
    "enabled": true,
    "uploadUrl": "https://api.example.com/store/{filename}",
    "method": "POST",
    "formField": "file",
    "responseType": "text"
  }
}
```

### `fileUpload`-Eigenschaften

| Eigenschaft | Typ | Standard | Beschreibung |
|---|---|---|---|
| `enabled` | boolean | `false` | Widget einblenden |
| `uploadUrl` | string | — | Pflicht. API-Endpunkt; `{filename}` wird durch den URL-codierten Dateinamen ersetzt |
| `method` | `"POST"` \| `"PUT"` | `"POST"` | HTTP-Methode. POST → `multipart/form-data`; PUT → Datei direkt im Body |
| `formField` | string | `"file"` | Feldname im FormData (nur POST) |
| `responseType` | `"text"` \| `"json"` | `"text"` | Wie die API-Antwort ausgewertet wird |
| `responseUrlField` | string | `"url"` | JSON-Pfad zur Download-URL (Punkt-Notation, nur wenn `responseType: "json"`) |
| `headers` | object | — | Statische zusätzliche HTTP-Header (z. B. `Accept`) |
| `auth.type` | string | — | Hinweis für das einbettende System: `"bearer"`, `"apikey"`, `"basic"`, `"oauth2cc"` (OntoForm wertet diesen Wert selbst nicht aus) |

### Authentifizierung – Auth-Provider-Hook

OntoForm verwaltet keine Zugangsdaten. Stattdessen registriert die einbettende Anwendung einmalig eine async Funktion, die vor jedem Upload die benötigten Auth-Header zurückgibt. OntoForm ruft diese Funktion auf und fügt die Header in den Request ein.

```js
import { FileUploader } from 'onto-form/src/services/FileUploader.js'

// Einmalig beim Start der einbettenden Anwendung aufrufen:
FileUploader.setAuthProvider(async (config) => {
  return { Authorization: `Bearer ${meinAuthStore.getToken()}` }
})
```

Die Funktion erhält das vollständige `fileUpload`-Konfigurationsobjekt, damit sie bei Bedarf pro Endpunkt unterschiedlich reagieren kann.

#### Beispiele

**Bearer-Token aus einem eigenen Auth-Store:**
```js
FileUploader.setAuthProvider(async (config) => ({
  Authorization: `Bearer ${myAuthStore.getToken()}`
}))
```

**API-Key:**
```js
FileUploader.setAuthProvider(async (config) => ({
  'X-API-Key': appConfig.uploadApiKey
}))
```

**Per-Endpunkt-Logik** (wenn mehrere Upload-APIs mit unterschiedlicher Auth):
```js
FileUploader.setAuthProvider(async (config) => {
  if (config.uploadUrl.startsWith('https://intern.example.com')) {
    return { Authorization: `Bearer ${internalStore.token}` }
  }
  return { 'X-API-Key': publicApiKey }
})
```

**OAuth 2.0 mit automatischem Token-Refresh** (Refresh-Logik liegt im Wrapper):
```js
FileUploader.setAuthProvider(async (config) => {
  const token = await oauthClient.getValidToken()  // kümmert sich selbst um Ablauf
  return { Authorization: `Bearer ${token}` }
})
```

**Keiner Auth** (Standard; auch explizit zurücksetzen):
```js
FileUploader.setAuthProvider(null)
```

#### Priorität der Header

Statische `headers` aus der Konfiguration werden zuerst gesetzt; Auth-Provider-Header werden danach gemergt und überschreiben bei Namenskonflikten die statischen Werte.

#### `auth.type` als Hinweis im Config

Das optionale Feld `auth.type` in der Konfiguration hat für OntoForm nur dokumentarischen Charakter — es wird nicht ausgewertet. Es dient als Hinweis für Entwickler, was die API erwartet:

```json
"fileUpload": {
  "enabled": true,
  "uploadUrl": "https://api.example.com/store/{filename}",
  "auth": { "type": "bearer" }
}
```

---

## `remember` – Vorschläge aus früheren Eingaben

Mit `"remember": true` auf einem Feld werden frühere Eingaben als klickbare Vorschläge direkt unter dem Feld angezeigt. Der Nutzer wählt aktiv einen Vorschlag aus — es gibt kein automatisches Ausfüllen. Bei Objekt-Feldern (z. B. Herausgeber, Kontaktstelle) wird das gesamte Objekt mit allen Unterfeldern übernommen.

```json
"dct:publisher": {
  "type": "object",
  "remember": true,
  "label": { "de": "Herausgeber", "en": "Publisher" },
  "subFields": [ ... ]
}
```

Vorschläge werden beim Export automatisch in `localStorage` gespeichert (maximal 5 pro Feld, neueste zuerst). Sie bleiben über Browser-Sessions erhalten und gehen nur verloren, wenn der Nutzer den localStorage leert.

### Vorschläge aus dem einbettenden System

Das einbettende System kann zusätzliche Vorschläge per Hook bereitstellen — z. B. aus dem Nutzerprofil oder einer Organisationsdatenbank. Diese erscheinen immer ganz oben in der Liste, noch vor den lokal gespeicherten Werten.

```js
import { suggestionsStore } from 'onto-form/src/services/SuggestionsStore.js'

// Einmalig beim Start der einbettenden Anwendung:
suggestionsStore.setUserContext({
  'dct:publisher': [
    {
      'foaf:name': 'Stadt Wien – Magistrat',
      'foaf:homepage': 'https://wien.gv.at',
      'foaf:mbox': 'opendata@wien.gv.at'
    }
  ],
  'dcat:contactPoint': [
    {
      'vcard:fn': 'Open Data Koordination',
      'vcard:hasEmail': 'opendata@wien.gv.at',
      'vcard:hasTelephone': '+43 1 4000-0'
    }
  ]
})
```

Die Werte für `dct:publisher` und `dcat:contactPoint` können aus denselben Nutzerdaten abgeleitet werden — die Feldstrukturen unterscheiden sich jedoch (`foaf:` vs. `vcard:`), daher werden sie separat übergeben.

### Manuelles Speichern

OntoForm speichert automatisch beim Export. Falls das einbettende System den Speichervorgang selbst steuert, kann es `save()` direkt aufrufen:

```js
import { suggestionsStore } from 'onto-form/src/services/SuggestionsStore.js'

suggestionsStore.save('dct:publisher', formData['dct:publisher'])
```

### Feldübergreifende Vorschläge (`suggestionsFrom` / `suggestionsMap`)

Ein Feld kann Vorschläge auch aus anderen Feldern beziehen — z. B. soll eine Eingabe bei Herausgeber auch bei Kontaktstelle als Vorschlag auftauchen. Da die Felder unterschiedliche Vokabulare verwenden (`foaf:` vs. `vcard:`), übersetzt `suggestionsMap` die Schlüssel beim Importieren.

```json
"dcat:contactPoint": {
  "type": "object",
  "remember": true,
  "suggestionsFrom": ["dct:publisher"],
  "suggestionsMap": {
    "foaf:name":     "vcard:fn",
    "foaf:mbox":     "vcard:hasEmail",
    "foaf:homepage": "vcard:hasURL"
  }
}
```

```json
"dct:publisher": {
  "type": "object",
  "remember": true,
  "suggestionsFrom": ["dcat:contactPoint"],
  "suggestionsMap": {
    "vcard:fn":       "foaf:name",
    "vcard:hasEmail": "foaf:mbox",
    "vcard:hasURL":   "foaf:homepage"
  }
}
```

**Reihenfolge der Vorschläge:** Eigene Vorschläge (context + localStorage) erscheinen zuerst, danach die umgemappten Vorschläge aus Fremdfeldern. Duplikate (nach Schlüsselumbenennung) werden entfernt. Unbekannte Schlüssel (kein Eintrag in `suggestionsMap`) werden unverändert übernommen.

`suggestionsFrom` kann mehrere Feld-IDs enthalten:

```json
"suggestionsFrom": ["dct:publisher", "dct:creator"]
```

### Gespeicherte Vorschläge löschen

```js
suggestionsStore.clear('dct:publisher')   // nur dieses Feld
suggestionsStore.setUserContext(null)      // Context des einbettenden Systems zurücksetzen
```

---

## SHACL-Integration

`SHACLParser` liest SHACL-Shapes aus Turtle-Dateien und extrahiert:

- Feldtypen (Mapping: XSD-Datentypen → interne Typen)
- Kardinalität (`sh:minCount`, `sh:maxCount`) → `required`, `multiple`
- Fehlermeldungen (`sh:message`)

UI-Config-Werte überschreiben SHACL-Werte bei Konflikten. Labels und Hints werden gemergt.
