# Benutzerhandbuch – DCAT-AP Metadata Editor

## Überblick

Der DCAT-AP Metadata Editor ermöglicht die browserbasierte Erstellung und Bearbeitung von Metadaten nach den Standards DCAT-AP.at, GeoDCAT-AP und DCAT-AP 3.0. Die Metadaten können als JSON-LD oder Turtle exportiert und bestehende Dateien importiert werden.

---

## Oberfläche

### Standard auswählen

Über das Dropdown oben links wird der gewünschte Standard gewählt:

- **DCAT-AP.at** – österreichisches DCAT-AP-Profil
- **GeoDCAT** – geografische Metadaten
- **DCAT-AP 3.0** – aktueller europäischer Standard

Beim Wechsel des Standards werden die Felder zurückgesetzt und das passende Formular geladen.

### Sprache

Oben rechts kann zwischen **DE** (Deutsch) und **EN** (Englisch) gewechselt werden. Die Beschriftungen, Platzhalter und Fehlermeldungen wechseln sofort.

---

## Eingabemodi

### Schritt-Assistent (Wizard)

Der Schritt-Assistent ist standardmäßig aktiv. Er führt durch die Felder Gruppe für Gruppe:

1. **Schrittanzeige** oben: zeigt alle Gruppen als nummerierte Schritte sowie einen Abschluss-Schritt (✓ Übersicht/Summary).
2. **Navigation**: „Weiter" / „Next" geht zum nächsten Schritt, „Zurück" / „Back" zum vorherigen. Per Klick auf einen bereits abgeschlossenen Schritt kann direkt dorthin gesprungen werden.
3. **Per-Schritt-Validierung**: „Weiter" prüft nur die Felder des aktuellen Schritts. Fehler werden direkt angezeigt, der Schritt kann erst verlassen werden, wenn alle Pflichtfelder korrekt ausgefüllt sind.
4. **Übersicht/Summary** (letzter Schritt): Zeigt alle Gruppen als Lesekarten. Über „Bearbeiten / Edit" kann direkt zu einer Gruppe gesprungen werden. Der **Export-Button** ist nur hier verfügbar.

### Einzel-Seite

Alle Felder werden auf einer einzigen Seite angezeigt. Der Export-Button erscheint am Ende der Seite, sobald das Formular valide ist.

### Umschalten

Der Button im Header wechselt zwischen beiden Modi:

- Im Wizard-Modus: **„Einzel-Seite"**
- Im Einzel-Seiten-Modus: **„Schritt-Assistent"**

Zusätzlich gibt es — sofern der aktive Standard Distributionen unterstützt — einen zweiten Umschalter für den Distributions-Bearbeitungsmodus (siehe Abschnitt [Distributionen](#distributionen)).

---

## Daten importieren

Über den Button **„Importieren / Import"** im Header öffnet sich ein Importdialog.

### Formate

- **JSON-LD**: `.json`- oder `.jsonld`-Datei
- **Turtle**: `.ttl`-Datei (Standard-`@prefix`- und SPARQL-`PREFIX`-Schreibweise werden beide unterstützt)

### Vorgehensweise

1. Format-Tab auswählen (JSON-LD oder Turtle).
2. Datei über **„Datei öffnen…"** hochladen oder Text direkt in das Textfeld einfügen.
3. **„Importieren"** klicken.

Importierte Werte werden mit den aktuellen Formulardaten zusammengeführt. Felder, die nicht im Import enthalten sind, behalten ihre bisherigen Werte (z. B. automatisch berechnete Felder). Werte, die gegen Validierungsregeln verstoßen, werden stillschweigend verworfen – das Feld zeigt in diesem Fall einen Validierungsfehler.

---

## Daten exportieren

Der Export-Button (**„Export JSON-LD / Turtle"**) öffnet das Export-Panel, in dem die Metadaten als JSON-LD und Turtle angezeigt und in die Zwischenablage kopiert werden können.

Im Wizard-Modus ist der Export-Button nur auf der **Übersicht** (letzter Schritt) verfügbar.

---

## Distributionen

Distributionen sind komplexe Unterobjekte eines Datensatzes, die beschreiben, in welcher Form und über welche URL die eigentlichen Daten verfügbar sind (z. B. als CSV-Download oder als WMS-Dienst). Ein Datensatz kann mehrere Distributionen enthalten.

### Bearbeitungsmodi

Der Editor unterstützt zwei Bearbeitungsmodi:

**Inline-Modus**

Die Distributionen werden als aufklappbare Karten direkt in der Seite angezeigt. Ein Klick auf eine Karte klappt das Formular auf und zeigt alle Felder (accessURL, downloadURL, Titel, Beschreibung, Format, Medientyp, Lizenz, Verfügbarkeit, Veröffentlichungs- und Änderungsdatum) direkt an der Stelle auf.

**Modal-Modus** (Standard)

Die Distributionen werden als kompakte Liste angezeigt. Über den Button **„Bearbeiten"** öffnet sich ein Modal-Overlay mit dem vollständigen Distributions-Formular. Der Modal-Modus hält die Seite übersichtlich, besonders bei vielen Distributionen.

### Modus umschalten

Im Header erscheint — sofern der aktive Standard Distributionen unterstützt — ein Umschalter:

- Im Modal-Modus zeigt der Button **„Dist.: Inline"** (Klick wechselt in den Inline-Modus)
- Im Inline-Modus zeigt der Button **„Dist.: Modal"** (Klick wechselt in den Modal-Modus)

---

## Felder

### Feldtypen

| Typ | Beschreibung |
|---|---|
| `text` | Einzeiliges Textfeld |
| `textarea` | Mehrzeiliges Textfeld |
| `langstring` | Sprachspezifischer Text (DE/EN oder weitere Sprachen) |
| `uri` | URI-Eingabe mit Formatprüfung |
| `date` | Datumsfeld (ISO 8601) |
| `select` | Einzelauswahl aus einem Vokabular |
| `multiselect` | Mehrfachauswahl aus einem Vokabular (Checkbox-Liste) |
| `object` | Zusammengesetztes Feld (z. B. Kontaktpunkt mit Name, E-Mail, URL) |

Felder mit `+`-Button können mehrfach ausgefüllt werden (wiederholbare Felder).

### Validierung

- **Pflichtfelder** sind mit einem Sternchen markiert. Leere Pflichtfelder verhindern den Export und (im Wizard) das Weitergehen zum nächsten Schritt.
- **Optionale Felder** werden nur geprüft, wenn sie einen Wert enthalten (z. B. URI-Format, E-Mail-Format).
- Fehlermeldungen erscheinen direkt unter dem jeweiligen Feld.

### Automatisch befüllte Felder

Manche Felder werden automatisch gesetzt:

- **Zuletzt geändert** (`dct:modified`): wird auf das heutige Datum gesetzt, sobald ein Titel eingegeben wird. Importierte oder manuell eingegebene Werte bleiben erhalten.

### Vokabular-Felder

Select- und Multiselect-Felder mit externem Vokabular (z. B. Sprache, Thema) laden ihre Auswahloptionen beim Start automatisch. Ist die externe Quelle nicht erreichbar, wird eine lokale Fallback-Datei verwendet.

---

## Tastatur und Barrierefreiheit

- Alle Felder und Buttons sind per Tab erreichbar.
- Fehlermeldungen sind für Screenreader zugänglich.
