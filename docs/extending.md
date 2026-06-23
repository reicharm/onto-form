# Erweiterungspunkte – OntoForm

OntoForm stellt vier Erweiterungspunkte bereit, über die Host-Anwendungen eigene Logik einbringen können: Validatoren, Compute-Funktionen, Transforms und Visibility-Funktionen. Alle vier folgen demselben Muster: benannte Funktion registrieren, Namen in der UI-Config referenzieren.

---

## 1. Übersicht

| Punkt | Registrierung | Referenz im UI-Config | Signatur |
|---|---|---|---|
| Validator | `registerValidator()` | `"validate": "<name>"` | `(value, lang) => string[]` |
| Compute | `registerCompute()` | `"compute": "<name>"` | `(formData, lang, fieldId) => value \| undefined` |
| Transform | `registerTransform()` | `"transform": "<name>"` | `{ display(stored, opts), encode(display, opts, stored) }` |
| Visibility | `registerVisibility()` | `"visibleIf"` / `"requiredIf": "<name>"` | `(formData) => boolean` |

Eingebaute Namen können nicht überschrieben werden — bei einem Versuch wird eine Warnung in der Konsole ausgegeben.

---

## 2. Registrierung

### a) configure({ extend: { … } }) — alles auf einmal in main.js

```js
import { configure } from 'onto-form'

configure({
  assetsBaseUrl: '/assets/',
  extend: {
    validators: {
      isBundeslandCode: (value) => { /* … */ }
    },
    computes: {
      prefillPublisher: (formData, lang, fieldId) => { /* … */ }
    },
    transforms: {
      catalogPrefix: { display: (stored, opts) => { /* … */ }, encode: (display, opts, stored) => { /* … */ } }
    },
    visibility: {
      ifAustria: (formData) => { /* … */ }
    }
  }
})
```

### b) Einzelne Registrierfunktionen

```js
import { registerValidator, registerCompute, registerTransform, registerVisibility } from 'onto-form'

registerValidator('isBundeslandCode', (value, lang) => { /* … */ })
registerCompute('prefillPublisher', (formData, lang, fieldId) => { /* … */ })
registerTransform('catalogPrefix', { display: (stored, opts) => { /* … */ }, encode: (display, opts) => { /* … */ } })
registerVisibility('ifAustria', (formData) => { /* … */ })
```

Beide Wege sind gleichwertig. Der direkte Aufruf der `registerX()`-Funktionen ist synchron; `configure({ extend })` wertet die Funktionen intern ebenfalls synchron aus, sodass beide Varianten vor `app.mount()` vollständig abgeschlossen sind.

---

## 3. Empfohlene Dateistruktur

Erweiterungen in einem eigenen Ordner bündeln:

```
host-app/src/
  ontoform/
    validators.js
    computes.js
    transforms.js
    visibility.js
    index.js        ← importiert und registriert alle vier
```

`index.js`:

```js
import { registerValidator } from 'onto-form'
import { registerCompute }   from 'onto-form'
import { registerTransform } from 'onto-form'
import { registerVisibility } from 'onto-form'

import * as validators from './validators.js'
import * as computes   from './computes.js'
import * as transforms from './transforms.js'
import * as visibility from './visibility.js'

Object.entries(validators).forEach(([name, fn]) => registerValidator(name, fn))
Object.entries(computes).forEach(([name, fn])   => registerCompute(name, fn))
Object.entries(transforms).forEach(([name, fn]) => registerTransform(name, fn))
Object.entries(visibility).forEach(([name, fn]) => registerVisibility(name, fn))
```

In `main.js` diesen Import **vor** `app.mount()` einfügen:

```js
import './ontoform/index.js'
```

---

## 4. Erweiterungspunkte im Detail

### Validators

**Signatur:** `(value, lang) => string[]`

- Rückgabe `[]` bedeutet gültig.
- Rückgabe eines Arrays mit Strings bedeutet ungültig; jeder String wird als Fehlermeldung angezeigt.
- `lang` ist die aktuelle Anzeigesprache (`"de"` / `"en"`); damit können Fehlermeldungen lokalisiert werden.
- Der Validator wird **nur aufgerufen, wenn das Feld einen Wert hat** — leere optionale Felder sind automatisch gültig.

Beispiel `validators.js`:

```js
export function isBundeslandCode(value, lang) {
  const valid = ['W', 'N', 'B', 'S', 'K', 'T', 'V', 'O', 'ST']
  if (!valid.includes(value)) {
    return lang === 'de'
      ? [`Ungültiger Bundesland-Code: ${value}`]
      : [`Invalid state code: ${value}`]
  }
  return []
}
```

Referenz in der UI-Config:

```json
"ex:bundesland": {
  "validate": "isBundeslandCode"
}
```

---

### Computes

**Signatur:** `(formData, lang, fieldId) => newValue | undefined`

- Rückgabe `undefined` lässt den gespeicherten Wert unverändert.
- Die Funktion läuft **reaktiv bei jeder Änderung von `formData`** — daher auf Effizienz achten und keine Seiteneffekte produzieren.
- `fieldId` ermöglicht selbstreferentielle Prüfungen (z. B. nur befüllen, wenn das Feld noch leer ist).

Beispiel `computes.js`:

```js
export function prefillPublisher(formData, lang, fieldId) {
  if (formData[fieldId]) return undefined          // bereits befüllt
  if (!formData['dct:creator']) return undefined   // kein Creator vorhanden
  return formData['dct:creator']                   // Publisher aus Creator übernehmen
}
```

Referenz in der UI-Config:

```json
"dct:publisher": {
  "compute": "prefillPublisher"
}
```

---

### Transforms

**Signatur:** `{ display(stored, opts), encode(display, opts, stored) }`

- `display(stored, opts)` — wandelt den **gespeicherten** Wert in den **angezeigten** Wert um (aufgerufen beim Rendern des Felds).
- `encode(display, opts, stored)` — wandelt die **Eingabe des Nutzers** zurück in den **gespeicherten** Wert (aufgerufen beim Schreiben in `formData`).
- `opts` entspricht `field.transformOptions` aus der UI-Config.
- Die Feld-Komponenten selbst kennen keine Transforms; `MetadataForm.vue` wendet sie transparent an.

Beispiel `transforms.js`:

```js
export const catalogPrefix = {
  display(stored, opts) {
    const prefix = opts?.prefix ?? 'https://catalog.example.org/dataset/'
    return stored?.startsWith(prefix) ? stored.slice(prefix.length) : (stored ?? '')
  },
  encode(display, opts, stored) {
    const prefix = opts?.prefix ?? 'https://catalog.example.org/dataset/'
    return display ? prefix + display : ''
  }
}
```

Referenz in der UI-Config:

```json
"dct:identifier": {
  "transform": "catalogPrefix",
  "transformOptions": { "prefix": "https://catalog.example.org/dataset/" }
}
```

---

### Visibility

**Signatur:** `(formData) => boolean`

- Rückgabe `true`: Feld ist sichtbar / Pflichtfeld aktiv.
- Rückgabe `false`: Feld ist ausgeblendet / kein Pflichtfeld.
- Wird sowohl für `visibleIf` als auch für `requiredIf` verwendet.
- Läuft reaktiv bei jedem Render von `MetadataForm.vue`.

Beispiel `visibility.js`:

```js
export function ifAustria(formData) {
  return formData['dct:spatial'] === 'http://publications.europa.eu/resource/authority/country/AUT'
}
```

Referenz in der UI-Config:

```json
"ex:bundesland": {
  "visibleIf": "ifAustria",
  "requiredIf": "ifAustria"
}
```

---

## 5. Eingebaute Funktionen (Referenz)

Diese Namen sind bereits vergeben und können nicht überschrieben werden.

### Validators

| Name | Beschreibung |
|---|---|
| `isURI` | Gültige absolute URI |
| `isURIList` | Leerzeichen-getrennte Liste gültiger URIs |
| `isEmail` | Gültige E-Mail-Adresse |
| `isDate` | Gültiges ISO-8601-Datum |
| `isWKTorGeoJSON` | Gültiges WKT- oder GeoJSON-Geometrie-Literal |

### Computes

| Name | Beschreibung |
|---|---|
| `setTodayIfTitle` | Setzt das Feld auf heute, wenn `dct:title` befüllt ist |
| `setTodayIfTitleAndEmpty` | Wie `setTodayIfTitle`, aber nur wenn das Feld noch leer ist |
| `setToday` | Setzt das Feld immer auf das heutige Datum |
| `setLanguageFromUI` | Setzt das Feld auf die aktive UI-Sprache |

### Transforms

| Name | Beschreibung |
|---|---|
| `uriSuffix` | Zeigt nur den Teil nach dem letzten `/` oder `#` an; encode fügt den Prefix wieder an |
| `stripPrefix` | Entfernt einen konfigurierbaren Prefix für die Anzeige; encode fügt ihn wieder an |

### Visibility

| Name | Beschreibung |
|---|---|
| `ifHVDLegislation` | `true`, wenn `dcatap:applicableLegislation` auf die HVD-Durchführungsverordnung gesetzt ist |

---

## 6. Hinweise

- **Namen müssen innerhalb desselben Registrys eindeutig sein.** Doppelte Namen aus der Host-Anwendung werden ignoriert; eingebaute Namen können nicht überschrieben werden.
- **Reihenfolge:** Erweiterungen müssen **vor `app.mount()`** registriert sein. Die `ontoform/index.js` in `main.js` am Anfang importieren, bevor `createApp` aufgerufen wird.
- **`configure({ extend })`** wertet die übergebenen Funktionen synchron aus. Für zeitkritische Initialisierung (z. B. wenn eine Registrierung von einem async-Schritt abhängt) die `registerX()`-Funktionen direkt aufrufen und den Abschluss abwarten, bevor `app.mount()` läuft.
