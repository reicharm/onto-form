# DCAT-AP Metadata Editor

Ein konfigurierbarer, webbasierter Metadaten-Editor für DCAT-AP-konforme Datensatzbeschreibungen. Unterstützt mehrere Metadatenstandards, vollständige RDF-Exportfunktion und eine erweiterbare Konfigurationsarchitektur.

## Features

- **Mehrere Metadatenstandards:** DCAT-AP.at 2.0, DCAT-AP 3.0, GeoDCAT 2.0
- **Dynamische Formularerstellung** aus SHACL-Shapes und UI-Konfigurationsdateien
- **RDF-Export** als JSON-LD und Turtle
- **Zweisprachige UI** (Deutsch/Englisch)
- **Konfigurierbare Validierung** — `required` und `validate`-Funktionen pro Feld
- **Konfigurierbare Compute-Funktionen** — automatisches Befüllen von Feldern auf Basis anderer Felder
- **Wiederholbare Felder** mit +/×-Buttons
- **Unterobjekte** (Publisher, Kontaktstelle) mit eigenen Sub-Feldern
- **Multiselect** für Vokabular-Mehrfachauswahl

## Schnellstart

```bash
npm install
npm run dev
```

## Dokumentation

| Dokument | Inhalt |
|---|---|
| [Anwenderdokumentation](docs/user-guide.md) | Bedienung, Feldtypen, Export |
| [Konfigurationsreferenz](docs/configuration.md) | UI-Config, Validierung, Compute-Funktionen |
| [Technische Dokumentation](docs/technical.md) | Architektur, Komponenten, Services |

## Technologie-Stack

- [Vue 3](https://vuejs.org/) — UI-Framework
- [Vite](https://vitejs.dev/) — Build-Tool
- [N3.js](https://github.com/rdfjs/N3.js) — RDF/Turtle-Parser
- [SHACL](https://www.w3.org/TR/shacl/) — Metadaten-Constraints
