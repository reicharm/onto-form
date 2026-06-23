# OntoForm – Claude Code Projektdokumentation

## Projektübersicht

Browserbasierter Metadaten-Editor für DCAT-AP-konforme Datensatzbeschreibungen (DCAT-AP.at, GeoDCAT-AP, DCAT-AP 3.0). Rein clientseitig, kein Backend.

**Stack:** Vue 3 (Composition API, `<script setup>`) · Vite · Vitest · Playwright · n3.js · jsonld.js

## Befehle

```bash
npm run dev          # Dev-Server (http://localhost:5173)
npm run build        # Production Build
npm test             # Unit-Tests (Vitest, 218 Tests, kein Browser nötig)
npm run test:watch   # Unit-Tests im Watch-Modus
npm run test:e2e     # E2E-Tests (Playwright, Chromium muss installiert sein)
npx playwright install chromium  # Einmalig nötig für E2E
```

## Projektstruktur

```
src/
  App.vue              # Root-Komponente, Wizard/Single-Page-Umschalter
  main.js              # App-Einstiegspunkt
  components/          # UI-Komponenten (FormField, Wizard, Header, ...)
  composables/         # Vue Composables (useForm, useValidation, ...)
  config/              # Statische Konfiguration
  services/            # Datenservices (Vokabular-Loader, RDF-Export/Import)
  shacl/               # SHACL-Shapes und Feldkonfigurationen (JSON)
  styles/              # Globale CSS
public/
  vocabularies/        # Lokale Fallback-Vokabulare (JSON)
docs/                  # Projektdokumentation
tests/                 # Playwright E2E-Tests
```

## Architektur

- **SHACL-getrieben:** Feldkonfiguration kommt aus SHACL-Shapes (`src/shacl/`) kombiniert mit UI-Config. Neue Felder → Shape anpassen, nicht Komponenten.
- **Kein Vuex/Pinia:** Zustand liegt in Composables (`useForm`, `useValidation`). State wird als Props/Emits weitergegeben.
- **Vokabular-System:** `services/vocabulary-loader.js` lädt externe APIs mit lokalem Fallback aus `public/vocabularies/`.
- **Profile-System:** Drei DCAT-Profile sind umschaltbar; Formularfelder filtern sich per `profile`-Flag in der Shape-Config.

## Konventionen

- Komponenten: PascalCase, `<script setup>`, kein Options-API
- Composables: `useXxx.js`, geben reaktive Refs zurück
- Services: reine Funktionen, kein Vue-spezifischer Code
- Keine Klassen, keine globalen Stores
- Kommentare nur für nicht-offensichtliche Logik (SHACL-Mapping, RDF-Namespace-Handling)

## Tests

Unit-Tests mit Vitest in `src/**/*.test.js`. E2E mit Playwright in `tests/`. Tests laufen ohne laufenden Server. Vor jedem Commit: `npm test` muss grün sein.

## Bekannte Eigenheiten

- `jsonld.js` hat CORS-Einschränkungen bei externen Kontexten → lokale Kopien in `public/`
- SHACL-to-UI-Mapping in `services/shacl-parser.js`: Reihenfolge der Shapes bestimmt Feldreihenfolge
- Leaflet (Geo-Felder) braucht CSS-Import in `main.js` – ohne den Import rendert die Karte nicht
