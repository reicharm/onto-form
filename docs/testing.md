# Testing

Das Projekt enthält Unit-Tests (Vitest) und End-to-End-Tests (Playwright).

## Unit-Tests (Vitest)

### Ausführen

```bash
# Alle Unit-Tests einmalig ausführen
npm test

# Tests im Watch-Modus (re-runs bei Dateiänderungen)
npm run test:watch
```

### Abgedeckte Module

| Datei | Getestetes Modul |
|-------|-----------------|
| `tests/unit/fieldValidators.test.js` | `src/config/fieldValidators.js` — `isURI`, `isURIList`, `isEmail`, `isDate`, `isWKTorGeoJSON` |
| `tests/unit/fieldComputes.test.js` | `src/config/fieldComputes.js` — `setTodayIfTitle`, `setTodayIfTitleAndEmpty`, `setToday`, `setLanguageFromUI`, `applyComputes` |
| `tests/unit/useValidation.test.js` | `src/composables/useValidation.js` — `validateField`, `validateForm` |
| `tests/unit/RDFExporter.test.js` | `src/services/RDFExporter.js` — `toJSONLD`, `toTurtle` |
| `tests/unit/RDFImporter.test.js` | `src/services/RDFImporter.js` — `fromJSONLD`, `fromTurtle` |
| `tests/unit/VocabularyLoader.test.js` | `src/services/VocabularyLoader.js` — `load`, `_normalize`, `_normalizeSparql` |
| `tests/unit/fieldVisibility.test.js` | `src/config/fieldVisibility.js` — `ifHVDLegislation`, `evaluateVisibleIf` |
| `tests/unit/fieldTransforms.test.js` | `src/config/fieldTransforms.js` — `uriSuffix`, `stripPrefix`, `applyDisplay`, `applyEncode` |
| `tests/unit/SHACLParser.test.js` | `src/services/SHACLParser.js` — `multiple`/`required`-Feld-Mapping aus `sh:maxCount`/`sh:minCount` |

### Konfiguration

`vitest.config.js` — Vitest mit jsdom-Umgebung und Vue-Plugin:

```js
import { defineConfig } from 'vitest/config'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  test: {
    environment: 'jsdom',
    globals: true,
    include: ['tests/unit/**/*.test.js'],
    exclude: ['**/node_modules/**'],
  },
})
```

### Neue Tests schreiben

Tests liegen unter `tests/unit/`. Dateiname-Konvention: `<ModulName>.test.js`.

```js
import { describe, it, expect } from 'vitest'
import { myFunction } from '../services/MyService.js'

describe('myFunction', () => {
  it('does something expected', () => {
    expect(myFunction('input')).toBe('expected output')
  })
})
```

Für Tests mit `fetch` (z. B. VocabularyLoader) wird `global.fetch` mit `vi.fn()` gemockt:

```js
global.fetch = vi.fn().mockResolvedValue({
  ok: true,
  json: () => Promise.resolve(data)
})
```

---

## E2E-Tests (Playwright)

### Voraussetzungen

Playwright benötigt einen installierten Browser. Bei erstmaliger Einrichtung:

```bash
npx playwright install chromium
```

### Ausführen

```bash
# Dev-Server starten (in einem separaten Terminal)
npm run dev

# E2E-Tests ausführen
npm run test:e2e
```

Playwright startet den Dev-Server automatisch (konfiguriert in `playwright.config.js`), falls er nicht bereits läuft.

### Abgedeckte Szenarien

| Datei | Testszenario |
|-------|-------------|
| `e2e/wizard.spec.js` | Wizard-Navigation: Schritte vor/zurück, Pflichtfeld-Validierung pro Schritt, Zusammenfassung |
| `e2e/import.spec.js` | Import-Panel: Turtle-Import per Texteingabe, Fehlerbehandlung bei ungültigem RDF |
| `e2e/singlepage.spec.js` | Einzel-Seite: Umschalten zwischen Wizard und Einzel-Seite, Formular-Export |

### Konfiguration

`playwright.config.js`:

```js
import { defineConfig } from '@playwright/test'

export default defineConfig({
  testDir: './tests/e2e',
  use: {
    baseURL: 'http://localhost:5173',
    headless: true,
  },
  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:5173',
    reuseExistingServer: true,
    timeout: 30000,
  },
})
```

### Neue E2E-Tests schreiben

Tests liegen unter `tests/e2e/`. Dateiname-Konvention: `<Feature>.spec.js`.

```js
import { test, expect } from '@playwright/test'

test('my feature works', async ({ page }) => {
  await page.goto('/')
  await expect(page.locator('h1')).toBeVisible()
})
```

---

## Übersicht der npm-Skripte

| Skript | Befehl | Beschreibung |
|--------|--------|-------------|
| `npm test` | `vitest run` | Unit-Tests einmalig ausführen |
| `npm run test:watch` | `vitest` | Unit-Tests im Watch-Modus |
| `npm run test:e2e` | `playwright test` | E2E-Tests ausführen |
