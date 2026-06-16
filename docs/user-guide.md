# Anwenderdokumentation

## Übersicht

Der DCAT-AP Metadata Editor ermöglicht die Erfassung und den Export von Metadaten für offene Datensätze gemäß den DCAT-AP-Standards. Die Metadaten werden im Browser erfasst und können als RDF (JSON-LD oder Turtle) exportiert werden.

---

## Bedienung

### Standard auswählen

Oben rechts im Header kann zwischen drei Metadatenstandards gewählt werden:

| Standard | Beschreibung |
|---|---|
| **DCAT-AP.at** | Österreichisches DCAT-AP-Profil (Version 2.0) |
| **DCAT-AP 3.0** | Europäisches DCAT-AP-Profil (Version 3.0) |
| **GeoDCAT** | Geodaten-erweitertes DCAT-Profil (Version 2.0) |

Beim Wechsel des Standards wird das Formular neu geladen. Eingegebene Daten gehen dabei verloren.

### Sprache wählen

Die Schaltflächen **DE** / **EN** im Header schalten die Formularbeschriftungen zwischen Deutsch und Englisch. Für sprachgebundene Felder (z.B. Titel, Beschreibung) werden beide Sprachen parallel angezeigt.

### Felder ausfüllen

Pflichtfelder sind mit einem roten Sternchen `*` markiert. Fehlerhafte oder fehlende Pflichtfelder werden rot umrandet und mit einer Fehlermeldung versehen.

### Export

Der Button **Export JSON-LD / Turtle** am Ende des Formulars ist erst aktiv, wenn alle Pflichtfelder korrekt ausgefüllt und keine Validierungsfehler vorhanden sind. Nach dem Klick öffnet sich ein Modal mit zwei Tabs:

- **JSON-LD** — Maschinenlesbare Repräsentation im JSON-Format
- **Turtle** — Kompakte RDF-Notation

Beide Formate können kopiert oder als Datei heruntergeladen werden.

---

## Feldtypen

### `text` — Einzeiliges Textfeld

Einfache Texteingabe für kurze Werte (Identifikatoren, Versionsnummern, etc.).

### `textarea` — Mehrzeiliges Textfeld

Für längere Texte wie Beschreibungen. Die Höhe ist manuell anpassbar.

### `langstring` — Mehrsprachiger Text

Zeigt parallel Eingabefelder für Deutsch und Englisch. Beide Versionen werden beim RDF-Export als sprachgetaggte Literale exportiert (`"Titel"@de`, `"Title"@en`).

### `uri` — URL/URI-Eingabe

Eingabefeld für URIs mit automatischer URL-Validierung (sofern `"validate": "isURI"` in der Config gesetzt ist). Ungültige URLs werden sofort angezeigt.

### `date` — Datumsauswahl

HTML5-Datumsauswahl. Liefert Werte im Format `YYYY-MM-DD`, die beim Export als `xsd:date` typisiert werden.

### `select` — Einzelauswahl

Dropdown-Menü für Auswahl aus einem vordefinierten Vokabular. Liefert den `value` der gewählten Option.

### `multiselect` — Mehrfachauswahl

Checkbox-Liste für die gleichzeitige Auswahl mehrerer Vokabulareinträge (z.B. Themen). Jede Auswahl wird beim RDF-Export als eigenes Triple exportiert.

### `object` — Unterobjekt

Zeigt einen strukturierten Block mit mehreren Sub-Feldern (z.B. Herausgeber mit Name, Webseite und Typ). Wird beim RDF-Export als Blank Node mit Sub-Prädikaten ausgegeben.

### Wiederholbare Felder

Felder mit `"multiple": true` (z.B. Schlagwörter) werden mit **+ Hinzufügen**- und **×**-Buttons dargestellt. Jeder Eintrag kann einzeln entfernt werden. Mindestens ein leerer Eintrag bleibt immer bestehen.

Für `langstring`-Felder mit `multiple: true` hat jeder Eintrag zusätzlich eine Sprachauswahl (`de`, `en`, `fr`, ...).

---

## Automatisch befüllte Felder

Manche Felder werden automatisch befüllt, sobald bestimmte Bedingungen erfüllt sind:

| Feld | Verhalten |
|---|---|
| **Zuletzt geändert** (`dct:modified`) | Wird automatisch auf das heutige Datum gesetzt, sobald ein Titel eingegeben wird |

Dieses Verhalten ist über Compute-Funktionen konfigurierbar (siehe [Konfigurationsreferenz](configuration.md)).
