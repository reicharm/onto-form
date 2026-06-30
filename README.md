# OntoForm

Ein browserbasierter Metadaten-Editor für DCAT-AP-konforme Datensatzbeschreibungen. Unterstützt DCAT-AP.at, GeoDCAT und DCAT-AP 3.0.

## Features

- **Drei Standards**: DCAT-AP.at, GeoDCAT-AP, DCAT-AP 3.0 – umschaltbar über die Standard-Auswahl
- **Schritt-Assistent (Wizard)**: geführte Eingabe Schritt für Schritt, mit Fortschrittsanzeige und Per-Schritt-Validierung
- **Einzel-Seite**: alle Felder auf einer Seite – umschaltbar über den Header-Button „Einzel-Seite / Schritt-Assistent"
- **Export JSON-LD / Turtle**: valide RDF-Ausgabe auf Basis von SHACL-Shapes
- **Import JSON-LD / Turtle**: bestehende Metadaten per Datei-Upload oder Text-Einfügen in das Formular laden
- **Externe Vokabulare**: Select-/Multiselect-Felder laden Optionen aus Web-APIs oder lokalen JSON-Dateien
- **Vokabular-Fallback**: lokale Fallback-Datei wenn externe Quelle nicht erreichbar (z. B. CORS)
- **Automatische Berechnungen**: Felder können per `compute`-Funktion automatisch befüllt werden (z. B. Datum)
- **Versteckte Felder**: Felder mit `"visible": false` nehmen an Berechnungen und Export teil, ohne im Formular zu erscheinen
- **Mehrsprachige Oberfläche**: Deutsch und Englisch
- **Validierung**: Pflichtfelder, URI-Format, E-Mail-Format – schrittweise im Wizard oder gesamt auf der Einzel-Seite
- **SHACL-gestützt**: Feldkonfiguration wird aus SHACL-Shapes und UI-Config zusammengeführt

## Dokumentation

- [Benutzerhandbuch](docs/user-guide.md)
- [Konfigurationsreferenz](docs/configuration.md)
- [Technische Dokumentation](docs/technical.md)
- [Tests](docs/testing.md)

## Als Bibliothek einbinden

```bash
npm install @reicharm/onto-form
```

```js
// main.js
import { configure } from '@reicharm/onto-form'
import '@reicharm/onto-form/style.css'

configure({ assetsBaseUrl: '/onto-form/' })  // Pfad zu public/-Inhalten
```

```vue
<script setup>
import { MetadataForm } from '@reicharm/onto-form'
</script>

<template>
  <MetadataForm standard="dcat-ap-at" lang="de" v-model="formData" />
</template>
```

> **Hinweis:** Die Dateien aus dem `public/`-Verzeichnis des Pakets (SHACL-Shapes, Vokabulare, UI-Konfigs)
> müssen vom Webserver der Host-App ausgeliefert werden. Kopiere den Inhalt von
> `node_modules/@reicharm/onto-form/public/` in dein `public/`-Verzeichnis
> (oder ein Unterverzeichnis) und passe `assetsBaseUrl` entsprechend an.

## Lokale Entwicklung

```bash
npm install
npm run dev
```

Öffne `http://localhost:5173` im Browser.

## Tests

```bash
# Unit-Tests (Vitest)
npm test

# Unit-Tests im Watch-Modus
npm run test:watch

# E2E-Tests (Playwright) — Browser muss einmalig installiert werden
npx playwright install chromium
npm run test:e2e
```

Alle Unit-Tests (218) laufen ohne Browser oder laufenden Dev-Server. Details: [docs/testing.md](docs/testing.md)

## Technologie

- Vue 3 (Composition API, `<script setup>`)
- Vite
- n3.js (Turtle/RDF-Parsing)
- Kein Backend – rein clientseitig
