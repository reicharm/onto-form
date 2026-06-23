# Accessibility Report — OntoForm

**Standard:** WCAG 2.1 Level AA  
**Audit date:** 2026-06-23  
**Auditor:** Claude Code (automated review + manual code inspection)

---

## Summary

A full accessibility audit was performed across all interactive Vue components. Findings covered missing ARIA semantics, unlabelled controls, absent focus management, and missing focus rings. All identified issues were remediated.

| Category | Issues found | Fixed |
|---|---|---|
| Missing ARIA labels on buttons/inputs | 14 | 14 ✓ |
| Missing `for`/`id` label associations | 8 | 8 ✓ |
| Missing dialog semantics (role, aria-modal, aria-labelledby) | 3 | 3 ✓ |
| Missing tab/tabpanel ARIA pattern | 2 | 2 ✓ |
| Missing combobox ARIA pattern | 1 | 1 ✓ |
| Missing focus management on modal open | 3 | 3 ✓ |
| Missing focus rings | 12 | 12 ✓ |
| Non-button interactive elements (clickable divs) | 2 | 2 ✓ |
| Missing live regions (role="alert", aria-live) | 6 | 6 ✓ |
| Missing progressbar ARIA | 1 | 1 ✓ |
| Hardcoded colours (not honouring CSS variables) | 3 | 3 ✓ |

---

## Component-Level Findings and Fixes

### Field Components

#### `TextField.vue`
- **Fixed:** Added `for`/`id` association between label and input.
- **Fixed:** Added `aria-label` on the UUID generate button.
- **Fixed:** Added `box-shadow: var(--focus-ring)` on `.btn-generate:focus`.

#### `SelectField.vue`
- **Fixed:** Added `for`/`id` label association.
- **Fixed:** Added `box-shadow: var(--focus-ring)` on `select:focus`.

#### `DateField.vue`
- **Fixed:** Added `for`/`id` label association.
- **Fixed:** Added `box-shadow: var(--focus-ring)` on `input:focus`.

#### `TextareaField.vue`
- **Fixed:** Added `for`/`id` label association.

#### `LangStringItem.vue`
- **Fixed:** Added `aria-label` on the language `<select>` ("Sprache des Eintrags" / "Entry language").
- **Fixed:** Added `aria-label` on the text input that reflects the current language code ("Texteingabe auf de").
- **Fixed:** Added `box-shadow: var(--focus-ring)` on `.lang-select:focus`.

#### `URIField.vue`
- **Fixed:** Added `for` on the label pointing to `${field.id}-body`.
- **Fixed:** Added `aria-label` on the protocol `<select>` ("URI-Protokoll" / "URI protocol").
- **Fixed:** Added `aria-hidden="true"` on the `://` visual separator span.
- **Fixed:** Added `aria-label` on the body input ("URI-Pfad" / "URI path").
- **Fixed:** Added `aria-label` on the generate button.
- **Fixed:** Added `box-shadow: var(--focus-ring)` on `.btn-generate:focus`.

#### `MultiSelectField.vue`
- **Changed:** Replaced `div.field` + nested `<label>` with `<fieldset class="multiselect-fieldset">` + `<legend>`. This is the correct HTML/ARIA pattern for groups of checkboxes — each checkbox `<label>` now refers only to its own option.
- **Fixed:** Added `outline: 2px solid var(--color-primary)` on `input[type=checkbox]:focus`.

#### `ObjectField.vue`
- **Fixed:** Added `<legend>` as first child of the existing `<fieldset>`.
- **Fixed:** Replaced hardcoded `border: 1px solid #d0d7de` with `border: 1px solid var(--color-border)` to honour dark mode / high-contrast themes.
- **Fixed:** Moved `<FieldSuggestions>` outside the `<fieldset>` so it does not interrupt the fieldset's labelling.

#### `SearchSelectField.vue`
- **Fixed:** Full ARIA combobox pattern applied to the trigger:
  - `role="combobox"`, `aria-expanded`, `aria-haspopup="listbox"`, `aria-owns`, `aria-labelledby`.
  - `Enter`/`Space` keys open the listbox (keyboard operability).
  - The caret icon has `aria-hidden="true"`.
- **Fixed:** Search input inside the dropdown has an `aria-label`.
- **Fixed:** Empty-state message has `role="alert"` so screen readers announce it.
- **Fixed:** Focus ring on trigger and clear-button via `box-shadow: var(--focus-ring)`.

#### `RepeatableField.vue`
- **Fixed:** Remove button now has a dynamic `aria-label` that includes the item index and field name (e.g. "Remove item 2 from Title").
- **Fixed:** Focus rings on `.btn-remove:focus` and `.btn-add:focus`.

#### `FieldSuggestions.vue`
- **Fixed:** Remove chip button has a descriptive `aria-label` (e.g. "Remove suggestion „BMSGPK"").

### Modals and Panels

#### `DistributionModal.vue`
- **Fixed:** Added `role="dialog"`, `aria-modal="true"`, `aria-labelledby` on `.dist-panel`.
- **Fixed:** Added `id` on the `<h2>` heading.
- **Fixed:** Added `aria-label` on the close button.
- **Fixed:** Added `@keydown.esc` handler on the overlay for keyboard dismissal.
- **Fixed:** On modal open (`watch(show)`), focus is moved to the first interactive element inside the panel.
- **Fixed:** Save button has both `:disabled` and `:aria-disabled` bindings.
- **Fixed:** Focus rings on all buttons.

#### `ExportPanel.vue`
- **Fixed:** Added `role="dialog"`, `aria-modal`, `aria-labelledby` on `.export-panel`.
- **Fixed:** Added `id` on the `<h2>` heading.
- **Fixed:** Added `aria-label` on the close button.
- **Fixed:** Added `@keydown.esc` on the overlay.
- **Fixed:** `onMounted` focuses the first button in the panel.
- **Fixed:** Tab strip uses `role="tablist"` with per-button `role="tab"`, `aria-selected`, `aria-controls`, and `:tabindex` (roving tabindex).
- **Fixed:** Tab panels use `role="tabpanel"`, `id`, and `aria-labelledby`.
- **Fixed:** Copy-feedback span uses `role="status" aria-live="polite"`.

#### `ImportPanel.vue`
- **Fixed:** Same dialog semantics as ExportPanel.
- **Fixed:** Same tab ARIA pattern as ExportPanel.
- **Fixed:** Error message `<div>` uses `role="alert"`.
- **Fixed:** File `<input>` has an `aria-label`.
- **Fixed:** Filename display span has `aria-live="polite"`.
- **Fixed:** Textarea has `aria-describedby` pointing to the error `id` when an error is present.

### Form Shell

#### `MetadataForm.vue`
- **Fixed:** Step-indicator circles changed from `<div @click>` to `<button>` elements with descriptive `aria-label` (e.g. "Schritt 1: Allgemein") and `aria-current="step"` on the active step.
- **Fixed:** Progress bar track has `role="progressbar"`, `aria-valuenow`, `aria-valuemin`, `aria-valuemax`, and `aria-label`; the visible label text has `aria-hidden="true"` to avoid double-reading.
- **Fixed:** Field error lists use `role="alert"` so errors announced immediately on display.
- **Fixed:** SHACL validate button has a stable `aria-label` that is always meaningful even when the visible text is "…" during loading.
- **Fixed:** `box-shadow: var(--focus-ring)` on `.step-circle:focus`.

#### `ValidationReport.vue`
- **Fixed:** Valid-state `<div>` has `role="status" aria-live="polite"`.
- **Fixed:** Checkmark icon has `aria-hidden="true"`.
- **Fixed:** Badge icons (✗, ⚠, ℹ) wrapped in `<span aria-hidden="true">`.
- **Fixed:** "Go to field" buttons have descriptive `aria-label` including the field name.
- **Fixed:** Close button has `aria-label`.
- **Fixed:** Focus rings on close button and navigate buttons.

---

## Known Remaining Limitations

| Area | Note |
|---|---|
| Drag-and-drop (distribution list reordering) | Not implemented, so no accessibility concern. |
| Map preview (`MapField.vue`) | The map iframe/canvas is presentational; a text alternative (coordinates) is always shown. |
| Colour contrast | Uses CSS design-token variables; contrast was verified for the default light theme. A dark-mode audit should be performed separately when dark-mode CSS variables are finalised. |
| Touch targets | Minimum 44×44 px is met for most controls; the remove chip button (×) is ~28 px — acceptable as secondary action adjacent to its primary label button. |
| Screen-reader testing | This audit is based on code inspection and ARIA specification conformance. Full end-to-end testing with NVDA/JAWS/VoiceOver was not performed in this session. |

---

## Test Coverage

All 309 unit tests continue to pass after the accessibility changes (`npx vitest run tests/unit/`). Accessibility-specific assertions (label associations, ARIA attributes) are not yet part of the automated test suite — this is a future improvement area.
