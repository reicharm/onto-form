var Yu = Object.defineProperty;
var Qu = (u, l, d) => l in u ? Yu(u, l, { enumerable: !0, configurable: !0, writable: !0, value: d }) : u[l] = d;
var qt = (u, l, d) => Qu(u, typeof l != "symbol" ? l + "" : l, d);
import { inject as xl, ref as Kt, computed as Ft, openBlock as V, createElementBlock as q, createElementVNode as H, unref as xt, Fragment as It, renderList as ae, toDisplayString as Q, watchEffect as th, createCommentVNode as Ct, onMounted as Ar, normalizeClass as he, createBlock as Re, watch as pi, onBeforeUnmount as Yo, withKeys as Jn, withModifiers as je, withDirectives as Qo, vModelText as Il, nextTick as Vs, createTextVNode as Mi, getCurrentInstance as eh, createVNode as Qi, resolveDynamicComponent as Ba, toRef as ih, Teleport as nh, normalizeStyle as Fl, renderSlot as ma, withCtx as dn, provide as wl, vShow as rh } from "vue";
const Xi = {
  de: {
    // App
    "header.type-label": "Art:",
    "btn.import": "Importieren",
    "btn.preview": "Vorschau",
    "btn.retry": "Erneut versuchen",
    "btn.wizard-toggle.to-single": "Einzel-Seite",
    "btn.wizard-toggle.to-wizard": "Schritt-Assistent",
    "btn.view-toggle.to-view": "Ansicht",
    "btn.view-toggle.to-edit": "Bearbeiten",
    "app.loading": "Formular wird geladen…",
    "app.vocab-warning": "Vokabular(e) konnten nicht geladen werden und wurden übersprungen.",
    "app.error-prefix": "Ein unerwarteter Fehler ist aufgetreten",
    "entity.dataset": "Datensatz",
    "entity.catalogue": "Katalog",
    "entity.application": "Applikation",
    // MetadataForm
    "wizard.summary": "Übersicht",
    "wizard.nav.back": "Zurück",
    "wizard.nav.next": "Weiter",
    "wizard.nav.to-summary": "Zur Übersicht",
    "wizard.summary.error-badge": "Fehlende Pflichtfelder",
    "wizard.summary.edit": "Bearbeiten",
    "wizard.summary.no-data": "Keine Angaben",
    "wizard.step-aria": "Schritt ",
    "wizard.progress-aria": "Fortschritt: ",
    "btn.validating": "Validierung läuft …",
    "form.validation-hint": "Bitte alle Fehler beheben.",
    "btn.validate": "SHACL prüfen",
    "btn.export": "Export JSON-LD / Turtle",
    // RepeatableField
    "btn.add": "Hinzufügen",
    "btn.remove": "Entfernen",
    // LangStringItem
    "aria.lang-select": "Sprache des Eintrags",
    // ExportPanel
    "export.copied": "Kopiert!",
    "btn.copy": "In Zwischenablage kopieren",
    "btn.download": "Herunterladen",
    // ImportPanel
    "btn.open-file": "Datei öffnen …",
    "btn.cancel": "Abbrechen",
    // DistributionModal
    "dist.modal.title": "Distribution bearbeiten",
    "btn.save": "Speichern",
    "dist.btn.access": "Zugang öffnen",
    "dist.btn.download": "Herunterladen",
    // DistributionEditor
    "dist.empty-hint": "Noch keine Distributionen vorhanden.",
    "btn.add-first-dist": "Erste Distribution hinzufügen",
    "btn.add-dist": "Distribution hinzufügen",
    "btn.edit": "Bearbeiten",
    // DistributionForm
    "dist.upload-label": "Datei hochladen",
    "dist.drop.idle": "Datei hierher ziehen oder klicken zum Auswählen",
    "dist.drop.uploading": "Wird hochgeladen …",
    "dist.drop.success": "Erfolgreich hochgeladen",
    "btn.choose-another": "Andere Datei",
    "btn.try-again": "Erneut versuchen",
    "btn.upload": "Hochladen",
    "dist.field.access-url": "Zugangs-URL",
    "dist.field.download-url": "Download-URL",
    "dist.field.title": "Titel",
    "dist.field.title-placeholder": "Titel der Distribution",
    "dist.field.description": "Beschreibung",
    "dist.field.description-placeholder": "Beschreibung …",
    "dist.field.format": "Dateiformat",
    "dist.field.media-type": "Medientyp",
    "dist.field.license": "Lizenz",
    "dist.field.availability": "Verfügbarkeit",
    "dist.field.issued": "Veröffentlichungsdatum",
    "dist.field.modified": "Zuletzt geändert",
    // SelectField / SearchSelectField
    "select.placeholder": "— Bitte wählen —",
    "searchselect.search-placeholder": "Suchen …",
    "searchselect.empty": "Keine Treffer",
    // MapField
    "map.btn.rectangle": "Rechteck",
    "map.btn.polygon": "Polygon",
    "map.btn.clear": "Löschen",
    "map.hint.rectangle": "Klicken und ziehen um ein Rechteck aufzuspannen.",
    "map.hint.polygon": "Klicken um Punkte zu setzen, Doppelklick zum Abschließen.",
    // ValidationReport
    "validation.title": "SHACL-Validierungsbericht",
    "validation.no-violations": "Keine Verstöße gefunden.",
    "validation.sev.violation": "Verstöße",
    "validation.sev.warning": "Warnungen",
    "validation.sev.info": "Hinweise",
    "btn.navigate-to-field": "Zum Feld",
    // FieldGroup
    "field.stored-as": "Gespeichert als:",
    // OntoViewer
    "viewer.loading": "Ansicht wird geladen…",
    "viewer.error": "Fehler beim Laden der Ansicht",
    "viewer.no-data": "Keine Daten vorhanden.",
    "viewer.copy-wkt": "WKT kopieren",
    "viewer.wkt-copied": "Kopiert!",
    "viewer.bounds": "Koordinaten",
    "viewer.other-langs": "Weitere Sprachen"
  },
  en: {
    // App
    "header.type-label": "Type:",
    "btn.import": "Import",
    "btn.preview": "Preview",
    "btn.retry": "Retry",
    "btn.wizard-toggle.to-single": "Single page",
    "btn.wizard-toggle.to-wizard": "Wizard",
    "btn.view-toggle.to-view": "View",
    "btn.view-toggle.to-edit": "Edit",
    "app.loading": "Loading form configuration…",
    "app.vocab-warning": "vocabulary source(s) could not be loaded and were skipped.",
    "app.error-prefix": "An unexpected error occurred",
    "entity.dataset": "Dataset",
    "entity.catalogue": "Catalogue",
    "entity.application": "Application",
    // MetadataForm
    "wizard.summary": "Summary",
    "wizard.nav.back": "Back",
    "wizard.nav.next": "Next",
    "wizard.nav.to-summary": "Summary",
    "wizard.summary.error-badge": "Required fields missing",
    "wizard.summary.edit": "Edit",
    "wizard.summary.no-data": "No data",
    "wizard.step-aria": "Step ",
    "wizard.progress-aria": "Progress: ",
    "btn.validating": "Validating …",
    "form.validation-hint": "Please fix all errors.",
    "btn.validate": "SHACL validate",
    "btn.export": "Export JSON-LD / Turtle",
    // RepeatableField
    "btn.add": "Add",
    "btn.remove": "Remove",
    // LangStringItem
    "aria.lang-select": "Language of this entry",
    // ExportPanel
    "export.copied": "Copied!",
    "btn.copy": "Copy to clipboard",
    "btn.download": "Download",
    // ImportPanel
    "btn.open-file": "Open file …",
    "btn.cancel": "Cancel",
    // DistributionModal
    "dist.modal.title": "Edit Distribution",
    "btn.save": "Save",
    "dist.btn.access": "Open access",
    "dist.btn.download": "Download",
    // DistributionEditor
    "dist.empty-hint": "No distributions yet.",
    "btn.add-first-dist": "Add first distribution",
    "btn.add-dist": "Add distribution",
    "btn.edit": "Edit",
    // DistributionForm
    "dist.upload-label": "Upload file",
    "dist.drop.idle": "Drag a file here or click to select",
    "dist.drop.uploading": "Uploading …",
    "dist.drop.success": "Upload successful",
    "btn.choose-another": "Choose another",
    "btn.try-again": "Try again",
    "btn.upload": "Upload",
    "dist.field.access-url": "Access URL",
    "dist.field.download-url": "Download URL",
    "dist.field.title": "Title",
    "dist.field.title-placeholder": "Distribution title",
    "dist.field.description": "Description",
    "dist.field.description-placeholder": "Description …",
    "dist.field.format": "File Format",
    "dist.field.media-type": "Media Type",
    "dist.field.license": "License",
    "dist.field.availability": "Availability",
    "dist.field.issued": "Issued",
    "dist.field.modified": "Modified",
    // SelectField / SearchSelectField
    "select.placeholder": "— Please select —",
    "searchselect.search-placeholder": "Search …",
    "searchselect.empty": "No results",
    // MapField
    "map.btn.rectangle": "Rectangle",
    "map.btn.polygon": "Polygon",
    "map.btn.clear": "Clear",
    "map.hint.rectangle": "Click and drag to draw a bounding box.",
    "map.hint.polygon": "Click to place points, double-click to finish.",
    // ValidationReport
    "validation.title": "SHACL Validation Report",
    "validation.no-violations": "No violations found.",
    "validation.sev.violation": "Violations",
    "validation.sev.warning": "Warnings",
    "validation.sev.info": "Info",
    "btn.navigate-to-field": "Go to field",
    // FieldGroup
    "field.stored-as": "Stored as:",
    // OntoViewer
    "viewer.loading": "Loading view…",
    "viewer.error": "Error loading view",
    "viewer.no-data": "No data available.",
    "viewer.copy-wkt": "Copy WKT",
    "viewer.wkt-copied": "Copied!",
    "viewer.bounds": "Bounds",
    "viewer.other-langs": "Other languages"
  }
};
function Qe() {
  const u = xl("onto-form:lang", Kt("de")), l = xl("onto-form:translations", Kt({}));
  function d(p) {
    var w;
    const b = typeof u == "string" ? u : u.value;
    return (l && "value" in l ? l.value : l ?? {})[p] ?? ((w = Xi[b]) == null ? void 0 : w[p]) ?? Xi.en[p] ?? p;
  }
  return { t: d };
}
function Da(u, l) {
  const d = Ft(() => {
    var g, x, S;
    const E = u.value ?? u, w = l.value ?? l;
    return ((g = E == null ? void 0 : E.label) == null ? void 0 : g[w]) || ((x = E == null ? void 0 : E.label) == null ? void 0 : x.de) || ((S = E == null ? void 0 : E.label) == null ? void 0 : S.en) || (E == null ? void 0 : E.id) || "";
  }), p = Ft(() => {
    var g, x, S;
    const E = u.value ?? u, w = l.value ?? l;
    return ((g = E == null ? void 0 : E.placeholder) == null ? void 0 : g[w]) || ((x = E == null ? void 0 : E.placeholder) == null ? void 0 : x.de) || ((S = E == null ? void 0 : E.placeholder) == null ? void 0 : S.en) || "";
  }), b = Ft(() => {
    var g;
    const E = u.value ?? u, w = l.value ?? l;
    return ((g = E == null ? void 0 : E.hint) == null ? void 0 : g[w]) || "";
  });
  return { label: d, placeholder: p, hint: b };
}
const oe = (u, l) => {
  const d = u.__vccOpts || u;
  for (const [p, b] of l)
    d[p] = b;
  return d;
}, ah = { class: "langstring-item" }, sh = ["value", "aria-label"], oh = ["value"], lh = ["value", "placeholder", "rows", "aria-label"], uh = ["value", "placeholder", "aria-label"], hh = {
  __name: "LangStringItem",
  props: {
    modelValue: { type: Object, default: () => ({ value: "", lang: "de" }) },
    lang: String,
    placeholder: { type: String, default: "" },
    multiline: { type: Boolean, default: !1 },
    rows: { type: Number, default: 4 }
  },
  emits: ["update:modelValue"],
  setup(u, { emit: l }) {
    const { t: d } = Qe(), p = u, b = l, E = ["de", "en", "fr", "it", "es", "nl", "pl", "cs", "sk", "hr"];
    function w(x) {
      b("update:modelValue", { ...p.modelValue, lang: x });
    }
    function g(x) {
      b("update:modelValue", { ...p.modelValue, value: x });
    }
    return (x, S) => (V(), q("div", ah, [
      H("select", {
        class: "lang-select",
        value: u.modelValue.lang || "de",
        "aria-label": xt(d)("aria.lang-select"),
        onChange: S[0] || (S[0] = (P) => w(P.target.value))
      }, [
        (V(), q(It, null, ae(E, (P) => H("option", {
          key: P,
          value: P
        }, Q(P), 9, oh)), 64))
      ], 40, sh),
      u.multiline ? (V(), q("textarea", {
        key: 0,
        value: u.modelValue.value || "",
        placeholder: u.placeholder,
        rows: u.rows,
        "aria-label": u.lang === "de" ? `Texteingabe auf ${u.modelValue.lang || "de"}` : `Text in ${u.modelValue.lang || "de"}`,
        onInput: S[1] || (S[1] = (P) => g(P.target.value))
      }, null, 40, lh)) : (V(), q("input", {
        key: 1,
        type: "text",
        value: u.modelValue.value || "",
        placeholder: u.placeholder,
        "aria-label": u.lang === "de" ? `Texteingabe auf ${u.modelValue.lang || "de"}` : `Text in ${u.modelValue.lang || "de"}`,
        onInput: S[2] || (S[2] = (P) => g(P.target.value))
      }, null, 40, uh))
    ]));
  }
}, ch = /* @__PURE__ */ oe(hh, [["__scopeId", "data-v-70b70a91"]]), dh = {
  /**
   * RFC 4122 v4 UUID, optionally prepended with a prefix.
   * Uses crypto.randomUUID() when available, falls back to a manual implementation.
   *
   * generateOptions: { prefix?: string }
   */
  uuid(u) {
    const l = typeof (crypto == null ? void 0 : crypto.randomUUID) == "function" ? crypto.randomUUID() : "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (d) => {
      const p = Math.random() * 16 | 0;
      return (d === "x" ? p : p & 3 | 8).toString(16);
    });
    return u != null && u.prefix ? u.prefix + l : l;
  },
  /**
   * Slug based on current date + a short random suffix.
   * Format: YYYY-MM-DD-<4 hex chars>
   *
   * generateOptions: { prefix?: string }
   */
  slugDate(u) {
    const l = (/* @__PURE__ */ new Date()).toISOString().slice(0, 10), d = Math.floor(Math.random() * 65535).toString(16).padStart(4, "0"), p = `${l}-${d}`;
    return u != null && u.prefix ? u.prefix + p : p;
  },
  /**
   * Nano-ID style: 21 URL-safe characters (A-Za-z0-9_-).
   * Collision probability comparable to UUID v4.
   *
   * generateOptions: { prefix?: string, length?: number }
   */
  nanoid(u) {
    const l = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789_-", d = (u == null ? void 0 : u.length) ?? 21, p = new Uint8Array(d);
    crypto.getRandomValues(p);
    const b = Array.from(p).map((E) => l[E % l.length]).join("");
    return u != null && u.prefix ? u.prefix + b : b;
  }
};
async function Rl(u, l) {
  const d = dh[u];
  return d ? d(l) ?? null : (console.warn(`[idGenerators] Unknown generator: "${u}"`), null);
}
const fh = 5, xa = "ontoform:suggestions:";
let Ll = {};
const kr = {
  /**
   * Inject user-specific suggestions from the embedding application.
   * Values appear at the top of the suggestion list and are not persisted.
   *
   * @param {{ [fieldId: string]: any[] }} contextMap
   */
  setUserContext(u) {
    Ll = u ?? {};
  },
  /**
   * Returns all suggestions for a single field (no cross-field resolution).
   * Order: context values first, then localStorage.
   * Duplicates (by JSON equality) are removed.
   *
   * @param {string} fieldId
   * @returns {any[]}
   */
  get(u) {
    return kl([
      ...Ll[u] ?? [],
      ...ga(u)
    ]);
  },
  /**
   * Returns all suggestions for a field including cross-field sources.
   * Use this when rendering the suggestion list — it respects `suggestionsFrom`
   * and applies `suggestionsMap` to remap keys from foreign fields.
   *
   * Order: own suggestions (context + stored) first, then cross-field suggestions.
   *
   * @param {object} field  — the field config object (needs .id, optionally
   *                          .suggestionsFrom and .suggestionsMap)
   * @returns {any[]}
   */
  getFor(u) {
    var b;
    const l = this.get(u.id);
    if (!((b = u.suggestionsFrom) != null && b.length)) return l;
    const d = u.suggestionsMap || {}, p = u.suggestionsFrom.flatMap(
      (E) => this.get(E).map((w) => Cl(w, d))
    );
    return kl([...l, ...p]);
  },
  /**
   * Saves a value for a field into localStorage.
   * Prepends the new value, deduplicates, and caps at MAX_STORED.
   * Null / undefined / empty objects are silently ignored.
   *
   * @param {string} fieldId
   * @param {any} value
   */
  save(u, l) {
    if (!ph(l)) return;
    const d = ga(u), p = wa(l), b = d.filter((w) => wa(w) !== p), E = [l, ...b].slice(0, fh);
    try {
      localStorage.setItem(xa + u, JSON.stringify(E));
    } catch {
    }
  },
  /**
   * Removes a single stored suggestion for a field from localStorage.
   * Matched by JSON equality. User-context values are not affected.
   *
   * @param {string} fieldId
   * @param {any} value
   */
  remove(u, l) {
    const d = wa(l), p = ga(u).filter((b) => wa(b) !== d);
    try {
      p.length ? localStorage.setItem(xa + u, JSON.stringify(p)) : localStorage.removeItem(xa + u);
    } catch {
    }
  },
  /**
   * Removes a suggestion that was returned by getFor(field).
   * Handles cross-field suggestions correctly: if the value was remapped
   * from a source field, the original (un-remapped) value is removed from
   * the source field's storage. Own suggestions are removed first; if not
   * found there, all suggestionsFrom sources are tried with the reversed map.
   *
   * User-context values (not in localStorage) are silently ignored.
   *
   * @param {object} field  — same field config object passed to getFor()
   * @param {any}    value  — the value as returned by getFor() (may be remapped)
   */
  removeFor(u, l) {
    var g;
    const d = ga(u.id);
    if (this.remove(u.id, l), ga(u.id).length < d.length || !((g = u.suggestionsFrom) != null && g.length)) return;
    const b = u.suggestionsMap || {}, E = Object.fromEntries(
      Object.entries(b).map(([x, S]) => [S, x])
    ), w = Cl(l, E);
    for (const x of u.suggestionsFrom)
      this.remove(x, w);
  },
  /**
   * Removes all stored suggestions for a field from localStorage.
   * User-context values are not affected.
   *
   * @param {string} fieldId
   */
  clear(u) {
    try {
      localStorage.removeItem(xa + u);
    } catch {
    }
  },
  /**
   * Returns a short human-readable label for a suggestion value.
   * Works for primitives and objects (picks the most meaningful fields).
   *
   * @param {any} value
   * @returns {string}
   */
  label(u) {
    if (u == null) return "";
    if (typeof u != "object") return String(u);
    const l = [
      "foaf:name",
      "vcard:fn",
      "schema:name",
      "dct:title",
      "rdfs:label",
      "skos:prefLabel",
      "name",
      "title"
    ], d = [
      "foaf:mbox",
      "vcard:hasEmail",
      "foaf:homepage",
      "vcard:hasURL",
      "vcard:hasTelephone",
      "schema:email"
    ], p = El(u, l), b = El(u, d);
    return p && b ? `${p} · ${b}` : p || b || Object.values(u).filter((w) => w && typeof w == "string").slice(0, 3).join(" · ") || JSON.stringify(u);
  }
};
function ga(u) {
  try {
    const l = localStorage.getItem(xa + u);
    return l ? JSON.parse(l) : [];
  } catch {
    return [];
  }
}
function wa(u) {
  return JSON.stringify(u);
}
function kl(u) {
  const l = /* @__PURE__ */ new Set(), d = [];
  for (const p of u) {
    const b = wa(p);
    l.has(b) || (l.add(b), d.push(p));
  }
  return d;
}
function Cl(u, l) {
  if (!u || typeof u != "object" || !Object.keys(l).length) return u;
  const d = {};
  for (const [p, b] of Object.entries(u))
    d[l[p] ?? p] = b;
  return d;
}
function ph(u) {
  return u == null ? !1 : typeof u == "object" ? Object.values(u).some((l) => l != null && l !== "") : String(u).trim() !== "";
}
function El(u, l) {
  for (const d of l)
    if (u[d] && typeof u[d] == "string") return u[d];
  return null;
}
const mh = {
  key: 0,
  class: "field-suggestions"
}, gh = { class: "suggestions-label" }, _h = { class: "suggestions-list" }, yh = ["title", "onClick"], vh = ["aria-label", "onClick"], bh = {
  __name: "FieldSuggestions",
  props: {
    field: { type: Object, required: !0 },
    lang: { type: String, default: "de" }
  },
  emits: ["select"],
  setup(u) {
    const l = u, d = Kt([]);
    th(() => {
      d.value = kr.getFor(l.field);
    });
    function p(E) {
      const w = kr.label(E);
      return l.lang === "de" ? `Vorschlag „${w}" entfernen` : `Remove suggestion „${w}"`;
    }
    function b(E) {
      kr.removeFor(l.field, E), d.value = kr.getFor(l.field);
    }
    return (E, w) => d.value.length ? (V(), q("div", mh, [
      H("span", gh, Q(u.lang === "de" ? "Frühere Eingaben:" : "Previous entries:"), 1),
      H("div", _h, [
        (V(!0), q(It, null, ae(d.value, (g, x) => (V(), q("span", {
          key: x,
          class: "suggestion-chip"
        }, [
          H("button", {
            type: "button",
            class: "chip-label",
            title: u.lang === "de" ? "Diesen Wert übernehmen" : "Use this value",
            onClick: (S) => E.$emit("select", g)
          }, Q(xt(kr).label(g)), 9, yh),
          H("button", {
            type: "button",
            class: "chip-remove",
            "aria-label": p(g),
            onClick: (S) => b(g)
          }, "×", 8, vh)
        ]))), 128))
      ])
    ])) : Ct("", !0);
  }
}, zl = /* @__PURE__ */ oe(bh, [["__scopeId", "data-v-0a2fc9d2"]]), xh = { class: "field" }, wh = ["for"], Lh = {
  key: 0,
  class: "input-with-action"
}, kh = ["id", "value", "placeholder"], Ch = ["aria-label"], Eh = ["id", "value", "placeholder"], Mh = {
  key: 2,
  class: "hint"
}, Bh = {
  __name: "TextField",
  props: {
    field: Object,
    lang: String,
    modelValue: [String, Number]
  },
  emits: ["update:modelValue"],
  setup(u, { emit: l }) {
    const d = u, p = l, b = Ft(() => {
      var g, x;
      return ((g = d.field.label) == null ? void 0 : g[d.lang]) || ((x = d.field.label) == null ? void 0 : x.en) || d.field.id;
    }), E = Ft(() => {
      var g, x;
      return ((g = d.field.placeholder) == null ? void 0 : g[d.lang]) || ((x = d.field.placeholder) == null ? void 0 : x.en) || "";
    });
    async function w() {
      const g = await Rl(d.field.generate, d.field.generateOptions);
      g != null && p("update:modelValue", g);
    }
    return Ar(() => {
      d.field.generate && !d.modelValue && w();
    }), (g, x) => {
      var S;
      return V(), q("div", xh, [
        H("label", {
          for: u.field.id,
          class: he({ required: u.field.required || u.field.requiredIf })
        }, Q(b.value), 11, wh),
        u.field.generate ? (V(), q("div", Lh, [
          H("input", {
            id: u.field.id,
            type: "text",
            value: u.modelValue || "",
            placeholder: E.value,
            onInput: x[0] || (x[0] = (P) => g.$emit("update:modelValue", P.target.value))
          }, null, 40, kh),
          H("button", {
            type: "button",
            class: "btn-generate",
            "aria-label": u.lang === "de" ? `Neuen ${b.value} generieren` : `Generate new ${b.value}`,
            onClick: w
          }, "↺", 8, Ch)
        ])) : (V(), q("input", {
          key: 1,
          id: u.field.id,
          type: "text",
          value: u.modelValue || "",
          placeholder: E.value,
          onInput: x[1] || (x[1] = (P) => g.$emit("update:modelValue", P.target.value))
        }, null, 40, Eh)),
        (S = u.field.hint) != null && S[u.lang] ? (V(), q("span", Mh, Q(u.field.hint[u.lang]), 1)) : Ct("", !0),
        u.field.remember ? (V(), Re(zl, {
          key: 3,
          field: u.field,
          lang: u.lang,
          onSelect: x[2] || (x[2] = (P) => g.$emit("update:modelValue", P))
        }, null, 8, ["field", "lang"])) : Ct("", !0)
      ]);
    };
  }
}, $s = /* @__PURE__ */ oe(Bh, [["__scopeId", "data-v-c6b3ffa9"]]), Ah = { class: "field" }, Sh = ["for"], Ph = ["id", "value", "placeholder"], Th = {
  key: 0,
  class: "hint"
}, Dh = {
  __name: "TextareaField",
  props: {
    field: Object,
    lang: String,
    modelValue: String
  },
  emits: ["update:modelValue"],
  setup(u) {
    const l = u, d = Ft(() => {
      var b, E;
      return ((b = l.field.label) == null ? void 0 : b[l.lang]) || ((E = l.field.label) == null ? void 0 : E.en) || l.field.id;
    }), p = Ft(() => {
      var b, E;
      return ((b = l.field.placeholder) == null ? void 0 : b[l.lang]) || ((E = l.field.placeholder) == null ? void 0 : E.en) || "";
    });
    return (b, E) => {
      var w;
      return V(), q("div", Ah, [
        H("label", {
          for: u.field.id,
          class: he({ required: u.field.required })
        }, Q(d.value), 11, Sh),
        H("textarea", {
          id: u.field.id,
          value: u.modelValue || "",
          placeholder: p.value,
          rows: "4",
          onInput: E[0] || (E[0] = (g) => b.$emit("update:modelValue", g.target.value))
        }, null, 40, Ph),
        (w = u.field.hint) != null && w[u.lang] ? (V(), q("span", Th, Q(u.field.hint[u.lang]), 1)) : Ct("", !0)
      ]);
    };
  }
}, Nl = /* @__PURE__ */ oe(Dh, [["__scopeId", "data-v-974fffb5"]]), Oh = { class: "field" }, Ih = ["for"], Fh = { class: "uri-row" }, Rh = ["value", "aria-label"], zh = ["value"], Nh = ["id", "value", "placeholder", "aria-label"], jh = ["aria-label"], Vh = {
  key: 0,
  class: "hint"
}, $o = "https", $h = {
  __name: "URIField",
  props: {
    field: Object,
    lang: String,
    modelValue: String
  },
  emits: ["update:modelValue"],
  setup(u, { emit: l }) {
    const d = u, p = l, b = ["https", "http", "mailto", "ftp", "urn"], E = Kt(!1), w = Kt(null);
    function g(ut) {
      if (!ut) return { protocol: $o, body: "" };
      const ft = ut.indexOf("://");
      if (ft !== -1) {
        const At = ut.slice(0, ft);
        return b.includes(At) ? { protocol: At, body: ut.slice(ft + 3) } : { protocol: $o, body: ut };
      }
      return ut.startsWith("mailto:") ? { protocol: "mailto", body: ut.slice(7) } : { protocol: $o, body: ut };
    }
    const x = Kt(g(d.modelValue).protocol), S = Kt(g(d.modelValue).body);
    pi(() => d.modelValue, (ut) => {
      const ft = g(ut);
      ft.protocol !== x.value && (x.value = ft.protocol), ft.body !== S.value && (S.value = ft.body);
    });
    function P() {
      return S.value ? x.value === "mailto" ? `mailto:${S.value}` : `${x.value}://${S.value}` : "";
    }
    function M(ut) {
      var ft;
      x.value = ut, p("update:modelValue", P()), (ft = w.value) == null || ft.focus();
    }
    function z(ut) {
      const ft = ut.indexOf("://");
      if (ft !== -1) {
        const At = ut.slice(0, ft);
        if (b.includes(At)) {
          x.value = At, S.value = ut.slice(ft + 3), p("update:modelValue", P());
          return;
        }
      }
      S.value = ut, p("update:modelValue", P());
    }
    async function j() {
      const ut = await Rl(d.field.generate, d.field.generateOptions);
      ut != null && p("update:modelValue", ut);
    }
    Ar(() => {
      d.field.generate && !d.modelValue && j();
    });
    const $ = Ft(() => {
      var ut, ft;
      return ((ut = d.field.label) == null ? void 0 : ut[d.lang]) || ((ft = d.field.label) == null ? void 0 : ft.en) || d.field.id;
    }), tt = Ft(() => {
      var At, Rt;
      const ut = ((At = d.field.placeholder) == null ? void 0 : At[d.lang]) || ((Rt = d.field.placeholder) == null ? void 0 : Rt.en) || "", ft = ut.indexOf("://");
      return ft !== -1 ? ut.slice(ft + 3) : ut || (x.value === "mailto" ? "name@example.com" : "example.com/path");
    });
    return (ut, ft) => {
      var At;
      return V(), q("div", Oh, [
        H("label", {
          for: `${u.field.id}-body`,
          class: he({ required: u.field.required })
        }, Q($.value), 11, Ih),
        H("div", Fh, [
          H("div", {
            class: he(["uri-input", { focused: E.value }])
          }, [
            H("select", {
              class: "protocol-select",
              value: x.value,
              "aria-label": u.lang === "de" ? "URI-Protokoll" : "URI protocol",
              onChange: ft[0] || (ft[0] = (Rt) => M(Rt.target.value)),
              onFocus: ft[1] || (ft[1] = (Rt) => E.value = !0),
              onBlur: ft[2] || (ft[2] = (Rt) => E.value = !1)
            }, [
              (V(), q(It, null, ae(b, (Rt) => H("option", {
                key: Rt,
                value: Rt
              }, Q(Rt), 9, zh)), 64))
            ], 40, Rh),
            ft[6] || (ft[6] = H("span", {
              class: "protocol-sep",
              "aria-hidden": "true"
            }, "://", -1)),
            H("input", {
              id: `${u.field.id}-body`,
              ref_key: "inputEl",
              ref: w,
              type: "text",
              value: S.value,
              placeholder: tt.value,
              "aria-label": `${x.value}://${u.lang === "de" ? " Adresspfad" : " address path"}`,
              onInput: ft[3] || (ft[3] = (Rt) => z(Rt.target.value)),
              onFocus: ft[4] || (ft[4] = (Rt) => E.value = !0),
              onBlur: ft[5] || (ft[5] = (Rt) => E.value = !1)
            }, null, 40, Nh)
          ], 2),
          u.field.generate ? (V(), q("button", {
            key: 0,
            type: "button",
            class: "btn-generate",
            "aria-label": u.lang === "de" ? `Neuen ${$.value} generieren` : `Generate new ${$.value}`,
            onClick: j
          }, "↺", 8, jh)) : Ct("", !0)
        ]),
        (At = u.field.hint) != null && At[u.lang] ? (V(), q("span", Vh, Q(u.field.hint[u.lang]), 1)) : Ct("", !0)
      ]);
    };
  }
}, jl = /* @__PURE__ */ oe($h, [["__scopeId", "data-v-b94afa7b"]]), Uh = { class: "field" }, Gh = ["for"], Zh = ["id", "value"], qh = { value: "" }, Hh = ["value"], Kh = {
  key: 0,
  class: "hint"
}, Wh = {
  __name: "SelectField",
  props: {
    field: Object,
    lang: String,
    modelValue: String
  },
  emits: ["update:modelValue"],
  setup(u) {
    const l = u, { t: d } = Qe(), { label: p } = Da(Ft(() => l.field), Ft(() => l.lang));
    return (b, E) => {
      var w;
      return V(), q("div", Uh, [
        H("label", {
          for: u.field.id,
          class: he({ required: u.field.required })
        }, Q(xt(p)), 11, Gh),
        H("select", {
          id: u.field.id,
          value: u.modelValue || "",
          onChange: E[0] || (E[0] = (g) => b.$emit("update:modelValue", g.target.value))
        }, [
          H("option", qh, Q(xt(d)("select.placeholder")), 1),
          (V(!0), q(It, null, ae(u.field.options, (g) => {
            var x, S, P;
            return V(), q("option", {
              key: g.value,
              value: g.value
            }, Q(((x = g.label) == null ? void 0 : x[u.lang]) || ((S = g.label) == null ? void 0 : S.de) || ((P = g.label) == null ? void 0 : P.en) || g.value), 9, Hh);
          }), 128))
        ], 40, Zh),
        (w = u.field.hint) != null && w[u.lang] ? (V(), q("span", Kh, Q(u.field.hint[u.lang]), 1)) : Ct("", !0)
      ]);
    };
  }
}, Vl = /* @__PURE__ */ oe(Wh, [["__scopeId", "data-v-13e41d99"]]), Jh = ["id"], Xh = ["aria-expanded", "aria-labelledby", "aria-owns", "onKeydown"], Yh = {
  key: 0,
  class: "ss-value"
}, Qh = {
  key: 1,
  class: "ss-placeholder"
}, tc = ["aria-label"], ec = ["id", "aria-labelledby"], ic = ["placeholder", "aria-label", "onKeydown"], nc = {
  key: 0,
  class: "ss-empty",
  role: "alert"
}, rc = ["aria-selected", "onMousedown", "onMousemove"], ac = {
  key: 1,
  class: "hint"
}, sc = {
  __name: "SearchSelectField",
  props: {
    field: Object,
    lang: String,
    modelValue: String
  },
  emits: ["update:modelValue"],
  setup(u, { emit: l }) {
    const d = u, p = l, { t: b } = Qe(), { label: E } = Da(Ft(() => d.field), Ft(() => d.lang)), w = Ft(() => d.field.options || []), g = Kt(""), x = Ft(() => {
      const Dt = g.value.trim().toLowerCase();
      return Dt ? w.value.filter((Ut) => {
        var Zt, Wt, ge;
        return (((Zt = Ut.label) == null ? void 0 : Zt[d.lang]) || ((Wt = Ut.label) == null ? void 0 : Wt.de) || ((ge = Ut.label) == null ? void 0 : ge.en) || Ut.value || "").toLowerCase().includes(Dt);
      }) : w.value;
    }), S = Ft(() => {
      var Ut, ne, Zt;
      if (!d.modelValue) return "";
      const Dt = w.value.find((Wt) => Wt.value === d.modelValue);
      return Dt ? ((Ut = Dt.label) == null ? void 0 : Ut[d.lang]) || ((ne = Dt.label) == null ? void 0 : ne.de) || ((Zt = Dt.label) == null ? void 0 : Zt.en) || Dt.value : d.modelValue;
    }), P = Kt(null), M = Kt(null), z = Kt(null), j = Kt(!1), $ = Kt(-1);
    async function tt() {
      var Ut;
      if (j.value) return;
      j.value = !0, g.value = "", $.value = -1, await Vs(), (Ut = M.value) == null || Ut.focus();
      const Dt = x.value.findIndex((ne) => ne.value === d.modelValue);
      Dt >= 0 && ($.value = Dt, ee()), document.addEventListener("mousedown", ft);
    }
    function ut() {
      j.value = !1, document.removeEventListener("mousedown", ft);
    }
    function ft(Dt) {
      var Ut;
      (Ut = P.value) != null && Ut.contains(Dt.target) || ut();
    }
    Yo(() => document.removeEventListener("mousedown", ft));
    function At(Dt) {
      p("update:modelValue", Dt.value), ut();
    }
    function Rt() {
      p("update:modelValue", "");
    }
    function zt(Dt) {
      const Ut = x.value.length;
      Ut && ($.value = ($.value + Dt + Ut) % Ut, ee());
    }
    function Et() {
      const Dt = x.value[$.value];
      Dt && At(Dt);
    }
    function ee() {
      Vs(() => {
        var Ut, ne;
        const Dt = (Ut = z.value) == null ? void 0 : Ut.querySelectorAll(".ss-option")[$.value];
        (ne = Dt == null ? void 0 : Dt.scrollIntoView) == null || ne.call(Dt, { block: "nearest" });
      });
    }
    return (Dt, Ut) => {
      var ne;
      return V(), q("div", {
        class: "field",
        ref_key: "root",
        ref: P
      }, [
        H("label", {
          id: `${u.field.id}-label`,
          class: he({ required: u.field.required || u.field.requiredIf })
        }, Q(xt(E)), 11, Jh),
        H("div", {
          class: he(["ss-input-wrap", { open: j.value, focused: j.value }]),
          role: "combobox",
          "aria-expanded": j.value,
          "aria-haspopup": "listbox",
          "aria-labelledby": `${u.field.id}-label`,
          "aria-owns": `${u.field.id}-panel`,
          tabindex: "0",
          onClick: tt,
          onKeydown: [
            Jn(je(tt, ["prevent"]), ["enter"]),
            Jn(je(tt, ["prevent"]), ["space"])
          ]
        }, [
          S.value ? (V(), q("span", Yh, Q(S.value), 1)) : (V(), q("span", Qh, Q(xt(b)("select.placeholder")), 1)),
          Ut[3] || (Ut[3] = H("span", {
            class: "ss-caret",
            "aria-hidden": "true"
          }, "▾", -1)),
          u.modelValue ? (V(), q("button", {
            key: 2,
            type: "button",
            class: "ss-clear",
            "aria-label": `Clear ${xt(E)} selection`,
            onClick: je(Rt, ["stop"])
          }, "×", 8, tc)) : Ct("", !0)
        ], 42, Xh),
        j.value ? (V(), q("div", {
          key: 0,
          id: `${u.field.id}-panel`,
          class: "ss-panel",
          role: "listbox",
          "aria-labelledby": `${u.field.id}-label`
        }, [
          Qo(H("input", {
            ref_key: "searchInput",
            ref: M,
            "onUpdate:modelValue": Ut[0] || (Ut[0] = (Zt) => g.value = Zt),
            class: "ss-search",
            placeholder: xt(b)("searchselect.search-placeholder"),
            "aria-label": `Search ${xt(E)}`,
            autocomplete: "off",
            onKeydown: [
              Ut[1] || (Ut[1] = Jn(je((Zt) => zt(1), ["prevent"]), ["down"])),
              Ut[2] || (Ut[2] = Jn(je((Zt) => zt(-1), ["prevent"]), ["up"])),
              Jn(je(Et, ["prevent"]), ["enter"]),
              Jn(ut, ["esc"])
            ]
          }, null, 40, ic), [
            [Il, g.value]
          ]),
          H("ul", {
            class: "ss-list",
            ref_key: "listEl",
            ref: z
          }, [
            x.value.length ? Ct("", !0) : (V(), q("li", nc, Q(xt(b)("searchselect.empty")), 1)),
            (V(!0), q(It, null, ae(x.value, (Zt, Wt) => {
              var ge, He, kt;
              return V(), q("li", {
                key: Zt.value,
                class: he(["ss-option", { selected: Zt.value === u.modelValue, highlighted: Wt === $.value }]),
                role: "option",
                "aria-selected": Zt.value === u.modelValue,
                onMousedown: je((Jt) => At(Zt), ["prevent"]),
                onMousemove: (Jt) => $.value = Wt
              }, Q(((ge = Zt.label) == null ? void 0 : ge[u.lang]) || ((He = Zt.label) == null ? void 0 : He.de) || ((kt = Zt.label) == null ? void 0 : kt.en) || Zt.value), 43, rc);
            }), 128))
          ], 512)
        ], 8, ec)) : Ct("", !0),
        (ne = u.field.hint) != null && ne[u.lang] ? (V(), q("span", ac, Q(u.field.hint[u.lang]), 1)) : Ct("", !0)
      ], 512);
    };
  }
}, $l = /* @__PURE__ */ oe(sc, [["__scopeId", "data-v-dbb13039"]]), oc = { class: "field" }, lc = ["for"], uc = ["id", "value"], hc = {
  key: 0,
  class: "hint"
}, cc = {
  __name: "DateField",
  props: {
    field: Object,
    lang: String,
    modelValue: String
  },
  emits: ["update:modelValue"],
  setup(u) {
    const l = u, d = Ft(() => {
      var p, b;
      return ((p = l.field.label) == null ? void 0 : p[l.lang]) || ((b = l.field.label) == null ? void 0 : b.en) || l.field.id;
    });
    return (p, b) => {
      var E;
      return V(), q("div", oc, [
        H("label", {
          for: u.field.id,
          class: he({ required: u.field.required })
        }, Q(d.value), 11, lc),
        H("input", {
          id: u.field.id,
          type: "date",
          value: u.modelValue || "",
          onInput: b[0] || (b[0] = (w) => p.$emit("update:modelValue", w.target.value))
        }, null, 40, uc),
        (E = u.field.hint) != null && E[u.lang] ? (V(), q("span", hc, Q(u.field.hint[u.lang]), 1)) : Ct("", !0)
      ]);
    };
  }
}, Ul = /* @__PURE__ */ oe(cc, [["__scopeId", "data-v-659cf997"]]), dc = { class: "field" }, fc = { class: "lang-inputs" }, pc = { class: "lang-tag" }, mc = ["value", "placeholder", "rows", "onInput"], gc = ["value", "placeholder", "onInput"], _c = {
  key: 0,
  class: "hint"
}, yc = {
  __name: "LangStringField",
  props: {
    field: Object,
    lang: String,
    modelValue: Object
  },
  emits: ["update:modelValue"],
  setup(u, { emit: l }) {
    const d = u, p = l, b = Ft(() => {
      var x, S;
      return (S = (x = d.field) == null ? void 0 : x.contentLangs) != null && S.length ? d.field.contentLangs : ["de", "en"];
    }), { label: E, placeholder: w } = Da(Ft(() => d.field), Ft(() => d.lang));
    function g(x, S) {
      p("update:modelValue", { ...d.modelValue || {}, [x]: S });
    }
    return (x, S) => {
      var P;
      return V(), q("div", dc, [
        H("label", {
          class: he({ required: u.field.required })
        }, Q(xt(E)), 3),
        H("div", fc, [
          (V(!0), q(It, null, ae(b.value, (M) => (V(), q("div", {
            key: M,
            class: he(["lang-row", { "lang-row--multiline": u.field.multiline }])
          }, [
            H("span", pc, Q(M), 1),
            u.field.multiline ? (V(), q("textarea", {
              key: 0,
              value: (u.modelValue || {})[M] || "",
              placeholder: xt(w),
              rows: u.field.rows || 4,
              onInput: (z) => g(M, z.target.value)
            }, null, 40, mc)) : (V(), q("input", {
              key: 1,
              type: "text",
              value: (u.modelValue || {})[M] || "",
              placeholder: xt(w),
              onInput: (z) => g(M, z.target.value)
            }, null, 40, gc))
          ], 2))), 128))
        ]),
        (P = u.field.hint) != null && P[u.lang] ? (V(), q("span", _c, Q(u.field.hint[u.lang]), 1)) : Ct("", !0)
      ]);
    };
  }
}, vc = /* @__PURE__ */ oe(yc, [["__scopeId", "data-v-3804ec55"]]), bc = { class: "field" }, xc = { class: "multiselect-fieldset" }, wc = { class: "multiselect-box" }, Lc = ["value", "checked", "onChange"], kc = {
  key: 0,
  class: "empty"
}, Cc = {
  key: 0,
  class: "hint"
}, Ec = {
  __name: "MultiSelectField",
  props: {
    field: Object,
    lang: String,
    modelValue: { type: Array, default: () => [] }
  },
  emits: ["update:modelValue"],
  setup(u, { emit: l }) {
    const d = u, p = l, b = Ft(() => {
      var w, g;
      return ((w = d.field.label) == null ? void 0 : w[d.lang]) || ((g = d.field.label) == null ? void 0 : g.en) || d.field.id;
    });
    function E(w) {
      const g = d.modelValue || [], x = g.includes(w) ? g.filter((S) => S !== w) : [...g, w];
      p("update:modelValue", x);
    }
    return (w, g) => {
      var x, S;
      return V(), q("div", bc, [
        H("fieldset", xc, [
          H("legend", {
            class: he({ required: u.field.required })
          }, Q(b.value), 3),
          H("div", wc, [
            (V(!0), q(It, null, ae(u.field.options, (P) => {
              var M, z;
              return V(), q("label", {
                key: P.value,
                class: "option-row"
              }, [
                H("input", {
                  type: "checkbox",
                  value: P.value,
                  checked: (u.modelValue || []).includes(P.value),
                  onChange: (j) => E(P.value)
                }, null, 40, Lc),
                H("span", null, Q(((M = P.label) == null ? void 0 : M[u.lang]) || ((z = P.label) == null ? void 0 : z.de) || P.value), 1)
              ]);
            }), 128)),
            (x = u.field.options) != null && x.length ? Ct("", !0) : (V(), q("span", kc, Q(u.lang === "de" ? "Keine Optionen konfiguriert." : "No options configured."), 1))
          ])
        ]),
        (S = u.field.hint) != null && S[u.lang] ? (V(), q("span", Cc, Q(u.field.hint[u.lang]), 1)) : Ct("", !0)
      ]);
    };
  }
}, Mc = /* @__PURE__ */ oe(Ec, [["__scopeId", "data-v-de4950da"]]);
var La = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function Bc(u) {
  return u && u.__esModule && Object.prototype.hasOwnProperty.call(u, "default") ? u.default : u;
}
var Ho = { exports: {} };
/* @preserve
 * Leaflet 1.9.4, a JS library for interactive maps. https://leafletjs.com
 * (c) 2010-2023 Vladimir Agafonkin, (c) 2010-2011 CloudMade
 */
(function(u, l) {
  (function(d, p) {
    p(l);
  })(La, function(d) {
    var p = "1.9.4";
    function b(t) {
      var n, s, c, y;
      for (s = 1, c = arguments.length; s < c; s++) {
        y = arguments[s];
        for (n in y)
          t[n] = y[n];
      }
      return t;
    }
    var E = Object.create || /* @__PURE__ */ function() {
      function t() {
      }
      return function(n) {
        return t.prototype = n, new t();
      };
    }();
    function w(t, n) {
      var s = Array.prototype.slice;
      if (t.bind)
        return t.bind.apply(t, s.call(arguments, 1));
      var c = s.call(arguments, 2);
      return function() {
        return t.apply(n, c.length ? c.concat(s.call(arguments)) : arguments);
      };
    }
    var g = 0;
    function x(t) {
      return "_leaflet_id" in t || (t._leaflet_id = ++g), t._leaflet_id;
    }
    function S(t, n, s) {
      var c, y, B, G;
      return G = function() {
        c = !1, y && (B.apply(s, y), y = !1);
      }, B = function() {
        c ? y = arguments : (t.apply(s, arguments), setTimeout(G, n), c = !0);
      }, B;
    }
    function P(t, n, s) {
      var c = n[1], y = n[0], B = c - y;
      return t === c && s ? t : ((t - y) % B + B) % B + y;
    }
    function M() {
      return !1;
    }
    function z(t, n) {
      if (n === !1)
        return t;
      var s = Math.pow(10, n === void 0 ? 6 : n);
      return Math.round(t * s) / s;
    }
    function j(t) {
      return t.trim ? t.trim() : t.replace(/^\s+|\s+$/g, "");
    }
    function $(t) {
      return j(t).split(/\s+/);
    }
    function tt(t, n) {
      Object.prototype.hasOwnProperty.call(t, "options") || (t.options = t.options ? E(t.options) : {});
      for (var s in n)
        t.options[s] = n[s];
      return t.options;
    }
    function ut(t, n, s) {
      var c = [];
      for (var y in t)
        c.push(encodeURIComponent(s ? y.toUpperCase() : y) + "=" + encodeURIComponent(t[y]));
      return (!n || n.indexOf("?") === -1 ? "?" : "&") + c.join("&");
    }
    var ft = /\{ *([\w_ -]+) *\}/g;
    function At(t, n) {
      return t.replace(ft, function(s, c) {
        var y = n[c];
        if (y === void 0)
          throw new Error("No value provided for variable " + s);
        return typeof y == "function" && (y = y(n)), y;
      });
    }
    var Rt = Array.isArray || function(t) {
      return Object.prototype.toString.call(t) === "[object Array]";
    };
    function zt(t, n) {
      for (var s = 0; s < t.length; s++)
        if (t[s] === n)
          return s;
      return -1;
    }
    var Et = "data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=";
    function ee(t) {
      return window["webkit" + t] || window["moz" + t] || window["ms" + t];
    }
    var Dt = 0;
    function Ut(t) {
      var n = +/* @__PURE__ */ new Date(), s = Math.max(0, 16 - (n - Dt));
      return Dt = n + s, window.setTimeout(t, s);
    }
    var ne = window.requestAnimationFrame || ee("RequestAnimationFrame") || Ut, Zt = window.cancelAnimationFrame || ee("CancelAnimationFrame") || ee("CancelRequestAnimationFrame") || function(t) {
      window.clearTimeout(t);
    };
    function Wt(t, n, s) {
      if (s && ne === Ut)
        t.call(n);
      else
        return ne.call(window, w(t, n));
    }
    function ge(t) {
      t && Zt.call(window, t);
    }
    var He = {
      __proto__: null,
      extend: b,
      create: E,
      bind: w,
      get lastId() {
        return g;
      },
      stamp: x,
      throttle: S,
      wrapNum: P,
      falseFn: M,
      formatNum: z,
      trim: j,
      splitWords: $,
      setOptions: tt,
      getParamString: ut,
      template: At,
      isArray: Rt,
      indexOf: zt,
      emptyImageUrl: Et,
      requestFn: ne,
      cancelFn: Zt,
      requestAnimFrame: Wt,
      cancelAnimFrame: ge
    };
    function kt() {
    }
    kt.extend = function(t) {
      var n = function() {
        tt(this), this.initialize && this.initialize.apply(this, arguments), this.callInitHooks();
      }, s = n.__super__ = this.prototype, c = E(s);
      c.constructor = n, n.prototype = c;
      for (var y in this)
        Object.prototype.hasOwnProperty.call(this, y) && y !== "prototype" && y !== "__super__" && (n[y] = this[y]);
      return t.statics && b(n, t.statics), t.includes && (Jt(t.includes), b.apply(null, [c].concat(t.includes))), b(c, t), delete c.statics, delete c.includes, c.options && (c.options = s.options ? E(s.options) : {}, b(c.options, t.options)), c._initHooks = [], c.callInitHooks = function() {
        if (!this._initHooksCalled) {
          s.callInitHooks && s.callInitHooks.call(this), this._initHooksCalled = !0;
          for (var B = 0, G = c._initHooks.length; B < G; B++)
            c._initHooks[B].call(this);
        }
      }, n;
    }, kt.include = function(t) {
      var n = this.prototype.options;
      return b(this.prototype, t), t.options && (this.prototype.options = n, this.mergeOptions(t.options)), this;
    }, kt.mergeOptions = function(t) {
      return b(this.prototype.options, t), this;
    }, kt.addInitHook = function(t) {
      var n = Array.prototype.slice.call(arguments, 1), s = typeof t == "function" ? t : function() {
        this[t].apply(this, n);
      };
      return this.prototype._initHooks = this.prototype._initHooks || [], this.prototype._initHooks.push(s), this;
    };
    function Jt(t) {
      if (!(typeof L > "u" || !L || !L.Mixin)) {
        t = Rt(t) ? t : [t];
        for (var n = 0; n < t.length; n++)
          t[n] === L.Mixin.Events && console.warn("Deprecated include of L.Mixin.Events: this property will be removed in future releases, please inherit from L.Evented instead.", new Error().stack);
      }
    }
    var ie = {
      /* @method on(type: String, fn: Function, context?: Object): this
       * Adds a listener function (`fn`) to a particular event type of the object. You can optionally specify the context of the listener (object the this keyword will point to). You can also pass several space-separated types (e.g. `'click dblclick'`).
       *
       * @alternative
       * @method on(eventMap: Object): this
       * Adds a set of type/listener pairs, e.g. `{click: onClick, mousemove: onMouseMove}`
       */
      on: function(t, n, s) {
        if (typeof t == "object")
          for (var c in t)
            this._on(c, t[c], n);
        else {
          t = $(t);
          for (var y = 0, B = t.length; y < B; y++)
            this._on(t[y], n, s);
        }
        return this;
      },
      /* @method off(type: String, fn?: Function, context?: Object): this
       * Removes a previously added listener function. If no function is specified, it will remove all the listeners of that particular event from the object. Note that if you passed a custom context to `on`, you must pass the same context to `off` in order to remove the listener.
       *
       * @alternative
       * @method off(eventMap: Object): this
       * Removes a set of type/listener pairs.
       *
       * @alternative
       * @method off: this
       * Removes all listeners to all events on the object. This includes implicitly attached events.
       */
      off: function(t, n, s) {
        if (!arguments.length)
          delete this._events;
        else if (typeof t == "object")
          for (var c in t)
            this._off(c, t[c], n);
        else {
          t = $(t);
          for (var y = arguments.length === 1, B = 0, G = t.length; B < G; B++)
            y ? this._off(t[B]) : this._off(t[B], n, s);
        }
        return this;
      },
      // attach listener (without syntactic sugar now)
      _on: function(t, n, s, c) {
        if (typeof n != "function") {
          console.warn("wrong listener type: " + typeof n);
          return;
        }
        if (this._listens(t, n, s) === !1) {
          s === this && (s = void 0);
          var y = { fn: n, ctx: s };
          c && (y.once = !0), this._events = this._events || {}, this._events[t] = this._events[t] || [], this._events[t].push(y);
        }
      },
      _off: function(t, n, s) {
        var c, y, B;
        if (this._events && (c = this._events[t], !!c)) {
          if (arguments.length === 1) {
            if (this._firingCount)
              for (y = 0, B = c.length; y < B; y++)
                c[y].fn = M;
            delete this._events[t];
            return;
          }
          if (typeof n != "function") {
            console.warn("wrong listener type: " + typeof n);
            return;
          }
          var G = this._listens(t, n, s);
          if (G !== !1) {
            var rt = c[G];
            this._firingCount && (rt.fn = M, this._events[t] = c = c.slice()), c.splice(G, 1);
          }
        }
      },
      // @method fire(type: String, data?: Object, propagate?: Boolean): this
      // Fires an event of the specified type. You can optionally provide a data
      // object — the first argument of the listener function will contain its
      // properties. The event can optionally be propagated to event parents.
      fire: function(t, n, s) {
        if (!this.listens(t, s))
          return this;
        var c = b({}, n, {
          type: t,
          target: this,
          sourceTarget: n && n.sourceTarget || this
        });
        if (this._events) {
          var y = this._events[t];
          if (y) {
            this._firingCount = this._firingCount + 1 || 1;
            for (var B = 0, G = y.length; B < G; B++) {
              var rt = y[B], ht = rt.fn;
              rt.once && this.off(t, ht, rt.ctx), ht.call(rt.ctx || this, c);
            }
            this._firingCount--;
          }
        }
        return s && this._propagateEvent(c), this;
      },
      // @method listens(type: String, propagate?: Boolean): Boolean
      // @method listens(type: String, fn: Function, context?: Object, propagate?: Boolean): Boolean
      // Returns `true` if a particular event type has any listeners attached to it.
      // The verification can optionally be propagated, it will return `true` if parents have the listener attached to it.
      listens: function(t, n, s, c) {
        typeof t != "string" && console.warn('"string" type argument expected');
        var y = n;
        typeof n != "function" && (c = !!n, y = void 0, s = void 0);
        var B = this._events && this._events[t];
        if (B && B.length && this._listens(t, y, s) !== !1)
          return !0;
        if (c) {
          for (var G in this._eventParents)
            if (this._eventParents[G].listens(t, n, s, c))
              return !0;
        }
        return !1;
      },
      // returns the index (number) or false
      _listens: function(t, n, s) {
        if (!this._events)
          return !1;
        var c = this._events[t] || [];
        if (!n)
          return !!c.length;
        s === this && (s = void 0);
        for (var y = 0, B = c.length; y < B; y++)
          if (c[y].fn === n && c[y].ctx === s)
            return y;
        return !1;
      },
      // @method once(…): this
      // Behaves as [`on(…)`](#evented-on), except the listener will only get fired once and then removed.
      once: function(t, n, s) {
        if (typeof t == "object")
          for (var c in t)
            this._on(c, t[c], n, !0);
        else {
          t = $(t);
          for (var y = 0, B = t.length; y < B; y++)
            this._on(t[y], n, s, !0);
        }
        return this;
      },
      // @method addEventParent(obj: Evented): this
      // Adds an event parent - an `Evented` that will receive propagated events
      addEventParent: function(t) {
        return this._eventParents = this._eventParents || {}, this._eventParents[x(t)] = t, this;
      },
      // @method removeEventParent(obj: Evented): this
      // Removes an event parent, so it will stop receiving propagated events
      removeEventParent: function(t) {
        return this._eventParents && delete this._eventParents[x(t)], this;
      },
      _propagateEvent: function(t) {
        for (var n in this._eventParents)
          this._eventParents[n].fire(t.type, b({
            layer: t.target,
            propagatedFrom: t.target
          }, t), !0);
      }
    };
    ie.addEventListener = ie.on, ie.removeEventListener = ie.clearAllEventListeners = ie.off, ie.addOneTimeEventListener = ie.once, ie.fireEvent = ie.fire, ie.hasEventListeners = ie.listens;
    var we = kt.extend(ie);
    function Ot(t, n, s) {
      this.x = s ? Math.round(t) : t, this.y = s ? Math.round(n) : n;
    }
    var wt = Math.trunc || function(t) {
      return t > 0 ? Math.floor(t) : Math.ceil(t);
    };
    Ot.prototype = {
      // @method clone(): Point
      // Returns a copy of the current point.
      clone: function() {
        return new Ot(this.x, this.y);
      },
      // @method add(otherPoint: Point): Point
      // Returns the result of addition of the current and the given points.
      add: function(t) {
        return this.clone()._add(lt(t));
      },
      _add: function(t) {
        return this.x += t.x, this.y += t.y, this;
      },
      // @method subtract(otherPoint: Point): Point
      // Returns the result of subtraction of the given point from the current.
      subtract: function(t) {
        return this.clone()._subtract(lt(t));
      },
      _subtract: function(t) {
        return this.x -= t.x, this.y -= t.y, this;
      },
      // @method divideBy(num: Number): Point
      // Returns the result of division of the current point by the given number.
      divideBy: function(t) {
        return this.clone()._divideBy(t);
      },
      _divideBy: function(t) {
        return this.x /= t, this.y /= t, this;
      },
      // @method multiplyBy(num: Number): Point
      // Returns the result of multiplication of the current point by the given number.
      multiplyBy: function(t) {
        return this.clone()._multiplyBy(t);
      },
      _multiplyBy: function(t) {
        return this.x *= t, this.y *= t, this;
      },
      // @method scaleBy(scale: Point): Point
      // Multiply each coordinate of the current point by each coordinate of
      // `scale`. In linear algebra terms, multiply the point by the
      // [scaling matrix](https://en.wikipedia.org/wiki/Scaling_%28geometry%29#Matrix_representation)
      // defined by `scale`.
      scaleBy: function(t) {
        return new Ot(this.x * t.x, this.y * t.y);
      },
      // @method unscaleBy(scale: Point): Point
      // Inverse of `scaleBy`. Divide each coordinate of the current point by
      // each coordinate of `scale`.
      unscaleBy: function(t) {
        return new Ot(this.x / t.x, this.y / t.y);
      },
      // @method round(): Point
      // Returns a copy of the current point with rounded coordinates.
      round: function() {
        return this.clone()._round();
      },
      _round: function() {
        return this.x = Math.round(this.x), this.y = Math.round(this.y), this;
      },
      // @method floor(): Point
      // Returns a copy of the current point with floored coordinates (rounded down).
      floor: function() {
        return this.clone()._floor();
      },
      _floor: function() {
        return this.x = Math.floor(this.x), this.y = Math.floor(this.y), this;
      },
      // @method ceil(): Point
      // Returns a copy of the current point with ceiled coordinates (rounded up).
      ceil: function() {
        return this.clone()._ceil();
      },
      _ceil: function() {
        return this.x = Math.ceil(this.x), this.y = Math.ceil(this.y), this;
      },
      // @method trunc(): Point
      // Returns a copy of the current point with truncated coordinates (rounded towards zero).
      trunc: function() {
        return this.clone()._trunc();
      },
      _trunc: function() {
        return this.x = wt(this.x), this.y = wt(this.y), this;
      },
      // @method distanceTo(otherPoint: Point): Number
      // Returns the cartesian distance between the current and the given points.
      distanceTo: function(t) {
        t = lt(t);
        var n = t.x - this.x, s = t.y - this.y;
        return Math.sqrt(n * n + s * s);
      },
      // @method equals(otherPoint: Point): Boolean
      // Returns `true` if the given point has the same coordinates.
      equals: function(t) {
        return t = lt(t), t.x === this.x && t.y === this.y;
      },
      // @method contains(otherPoint: Point): Boolean
      // Returns `true` if both coordinates of the given point are less than the corresponding current point coordinates (in absolute values).
      contains: function(t) {
        return t = lt(t), Math.abs(t.x) <= Math.abs(this.x) && Math.abs(t.y) <= Math.abs(this.y);
      },
      // @method toString(): String
      // Returns a string representation of the point for debugging purposes.
      toString: function() {
        return "Point(" + z(this.x) + ", " + z(this.y) + ")";
      }
    };
    function lt(t, n, s) {
      return t instanceof Ot ? t : Rt(t) ? new Ot(t[0], t[1]) : t == null ? t : typeof t == "object" && "x" in t && "y" in t ? new Ot(t.x, t.y) : new Ot(t, n, s);
    }
    function Bt(t, n) {
      if (t)
        for (var s = n ? [t, n] : t, c = 0, y = s.length; c < y; c++)
          this.extend(s[c]);
    }
    Bt.prototype = {
      // @method extend(point: Point): this
      // Extends the bounds to contain the given point.
      // @alternative
      // @method extend(otherBounds: Bounds): this
      // Extend the bounds to contain the given bounds
      extend: function(t) {
        var n, s;
        if (!t)
          return this;
        if (t instanceof Ot || typeof t[0] == "number" || "x" in t)
          n = s = lt(t);
        else if (t = Nt(t), n = t.min, s = t.max, !n || !s)
          return this;
        return !this.min && !this.max ? (this.min = n.clone(), this.max = s.clone()) : (this.min.x = Math.min(n.x, this.min.x), this.max.x = Math.max(s.x, this.max.x), this.min.y = Math.min(n.y, this.min.y), this.max.y = Math.max(s.y, this.max.y)), this;
      },
      // @method getCenter(round?: Boolean): Point
      // Returns the center point of the bounds.
      getCenter: function(t) {
        return lt(
          (this.min.x + this.max.x) / 2,
          (this.min.y + this.max.y) / 2,
          t
        );
      },
      // @method getBottomLeft(): Point
      // Returns the bottom-left point of the bounds.
      getBottomLeft: function() {
        return lt(this.min.x, this.max.y);
      },
      // @method getTopRight(): Point
      // Returns the top-right point of the bounds.
      getTopRight: function() {
        return lt(this.max.x, this.min.y);
      },
      // @method getTopLeft(): Point
      // Returns the top-left point of the bounds (i.e. [`this.min`](#bounds-min)).
      getTopLeft: function() {
        return this.min;
      },
      // @method getBottomRight(): Point
      // Returns the bottom-right point of the bounds (i.e. [`this.max`](#bounds-max)).
      getBottomRight: function() {
        return this.max;
      },
      // @method getSize(): Point
      // Returns the size of the given bounds
      getSize: function() {
        return this.max.subtract(this.min);
      },
      // @method contains(otherBounds: Bounds): Boolean
      // Returns `true` if the rectangle contains the given one.
      // @alternative
      // @method contains(point: Point): Boolean
      // Returns `true` if the rectangle contains the given point.
      contains: function(t) {
        var n, s;
        return typeof t[0] == "number" || t instanceof Ot ? t = lt(t) : t = Nt(t), t instanceof Bt ? (n = t.min, s = t.max) : n = s = t, n.x >= this.min.x && s.x <= this.max.x && n.y >= this.min.y && s.y <= this.max.y;
      },
      // @method intersects(otherBounds: Bounds): Boolean
      // Returns `true` if the rectangle intersects the given bounds. Two bounds
      // intersect if they have at least one point in common.
      intersects: function(t) {
        t = Nt(t);
        var n = this.min, s = this.max, c = t.min, y = t.max, B = y.x >= n.x && c.x <= s.x, G = y.y >= n.y && c.y <= s.y;
        return B && G;
      },
      // @method overlaps(otherBounds: Bounds): Boolean
      // Returns `true` if the rectangle overlaps the given bounds. Two bounds
      // overlap if their intersection is an area.
      overlaps: function(t) {
        t = Nt(t);
        var n = this.min, s = this.max, c = t.min, y = t.max, B = y.x > n.x && c.x < s.x, G = y.y > n.y && c.y < s.y;
        return B && G;
      },
      // @method isValid(): Boolean
      // Returns `true` if the bounds are properly initialized.
      isValid: function() {
        return !!(this.min && this.max);
      },
      // @method pad(bufferRatio: Number): Bounds
      // Returns bounds created by extending or retracting the current bounds by a given ratio in each direction.
      // For example, a ratio of 0.5 extends the bounds by 50% in each direction.
      // Negative values will retract the bounds.
      pad: function(t) {
        var n = this.min, s = this.max, c = Math.abs(n.x - s.x) * t, y = Math.abs(n.y - s.y) * t;
        return Nt(
          lt(n.x - c, n.y - y),
          lt(s.x + c, s.y + y)
        );
      },
      // @method equals(otherBounds: Bounds): Boolean
      // Returns `true` if the rectangle is equivalent to the given bounds.
      equals: function(t) {
        return t ? (t = Nt(t), this.min.equals(t.getTopLeft()) && this.max.equals(t.getBottomRight())) : !1;
      }
    };
    function Nt(t, n) {
      return !t || t instanceof Bt ? t : new Bt(t, n);
    }
    function ue(t, n) {
      if (t)
        for (var s = n ? [t, n] : t, c = 0, y = s.length; c < y; c++)
          this.extend(s[c]);
    }
    ue.prototype = {
      // @method extend(latlng: LatLng): this
      // Extend the bounds to contain the given point
      // @alternative
      // @method extend(otherBounds: LatLngBounds): this
      // Extend the bounds to contain the given bounds
      extend: function(t) {
        var n = this._southWest, s = this._northEast, c, y;
        if (t instanceof St)
          c = t, y = t;
        else if (t instanceof ue) {
          if (c = t._southWest, y = t._northEast, !c || !y)
            return this;
        } else
          return t ? this.extend(Mt(t) || jt(t)) : this;
        return !n && !s ? (this._southWest = new St(c.lat, c.lng), this._northEast = new St(y.lat, y.lng)) : (n.lat = Math.min(c.lat, n.lat), n.lng = Math.min(c.lng, n.lng), s.lat = Math.max(y.lat, s.lat), s.lng = Math.max(y.lng, s.lng)), this;
      },
      // @method pad(bufferRatio: Number): LatLngBounds
      // Returns bounds created by extending or retracting the current bounds by a given ratio in each direction.
      // For example, a ratio of 0.5 extends the bounds by 50% in each direction.
      // Negative values will retract the bounds.
      pad: function(t) {
        var n = this._southWest, s = this._northEast, c = Math.abs(n.lat - s.lat) * t, y = Math.abs(n.lng - s.lng) * t;
        return new ue(
          new St(n.lat - c, n.lng - y),
          new St(s.lat + c, s.lng + y)
        );
      },
      // @method getCenter(): LatLng
      // Returns the center point of the bounds.
      getCenter: function() {
        return new St(
          (this._southWest.lat + this._northEast.lat) / 2,
          (this._southWest.lng + this._northEast.lng) / 2
        );
      },
      // @method getSouthWest(): LatLng
      // Returns the south-west point of the bounds.
      getSouthWest: function() {
        return this._southWest;
      },
      // @method getNorthEast(): LatLng
      // Returns the north-east point of the bounds.
      getNorthEast: function() {
        return this._northEast;
      },
      // @method getNorthWest(): LatLng
      // Returns the north-west point of the bounds.
      getNorthWest: function() {
        return new St(this.getNorth(), this.getWest());
      },
      // @method getSouthEast(): LatLng
      // Returns the south-east point of the bounds.
      getSouthEast: function() {
        return new St(this.getSouth(), this.getEast());
      },
      // @method getWest(): Number
      // Returns the west longitude of the bounds
      getWest: function() {
        return this._southWest.lng;
      },
      // @method getSouth(): Number
      // Returns the south latitude of the bounds
      getSouth: function() {
        return this._southWest.lat;
      },
      // @method getEast(): Number
      // Returns the east longitude of the bounds
      getEast: function() {
        return this._northEast.lng;
      },
      // @method getNorth(): Number
      // Returns the north latitude of the bounds
      getNorth: function() {
        return this._northEast.lat;
      },
      // @method contains(otherBounds: LatLngBounds): Boolean
      // Returns `true` if the rectangle contains the given one.
      // @alternative
      // @method contains (latlng: LatLng): Boolean
      // Returns `true` if the rectangle contains the given point.
      contains: function(t) {
        typeof t[0] == "number" || t instanceof St || "lat" in t ? t = Mt(t) : t = jt(t);
        var n = this._southWest, s = this._northEast, c, y;
        return t instanceof ue ? (c = t.getSouthWest(), y = t.getNorthEast()) : c = y = t, c.lat >= n.lat && y.lat <= s.lat && c.lng >= n.lng && y.lng <= s.lng;
      },
      // @method intersects(otherBounds: LatLngBounds): Boolean
      // Returns `true` if the rectangle intersects the given bounds. Two bounds intersect if they have at least one point in common.
      intersects: function(t) {
        t = jt(t);
        var n = this._southWest, s = this._northEast, c = t.getSouthWest(), y = t.getNorthEast(), B = y.lat >= n.lat && c.lat <= s.lat, G = y.lng >= n.lng && c.lng <= s.lng;
        return B && G;
      },
      // @method overlaps(otherBounds: LatLngBounds): Boolean
      // Returns `true` if the rectangle overlaps the given bounds. Two bounds overlap if their intersection is an area.
      overlaps: function(t) {
        t = jt(t);
        var n = this._southWest, s = this._northEast, c = t.getSouthWest(), y = t.getNorthEast(), B = y.lat > n.lat && c.lat < s.lat, G = y.lng > n.lng && c.lng < s.lng;
        return B && G;
      },
      // @method toBBoxString(): String
      // Returns a string with bounding box coordinates in a 'southwest_lng,southwest_lat,northeast_lng,northeast_lat' format. Useful for sending requests to web services that return geo data.
      toBBoxString: function() {
        return [this.getWest(), this.getSouth(), this.getEast(), this.getNorth()].join(",");
      },
      // @method equals(otherBounds: LatLngBounds, maxMargin?: Number): Boolean
      // Returns `true` if the rectangle is equivalent (within a small margin of error) to the given bounds. The margin of error can be overridden by setting `maxMargin` to a small number.
      equals: function(t, n) {
        return t ? (t = jt(t), this._southWest.equals(t.getSouthWest(), n) && this._northEast.equals(t.getNorthEast(), n)) : !1;
      },
      // @method isValid(): Boolean
      // Returns `true` if the bounds are properly initialized.
      isValid: function() {
        return !!(this._southWest && this._northEast);
      }
    };
    function jt(t, n) {
      return t instanceof ue ? t : new ue(t, n);
    }
    function St(t, n, s) {
      if (isNaN(t) || isNaN(n))
        throw new Error("Invalid LatLng object: (" + t + ", " + n + ")");
      this.lat = +t, this.lng = +n, s !== void 0 && (this.alt = +s);
    }
    St.prototype = {
      // @method equals(otherLatLng: LatLng, maxMargin?: Number): Boolean
      // Returns `true` if the given `LatLng` point is at the same position (within a small margin of error). The margin of error can be overridden by setting `maxMargin` to a small number.
      equals: function(t, n) {
        if (!t)
          return !1;
        t = Mt(t);
        var s = Math.max(
          Math.abs(this.lat - t.lat),
          Math.abs(this.lng - t.lng)
        );
        return s <= (n === void 0 ? 1e-9 : n);
      },
      // @method toString(): String
      // Returns a string representation of the point (for debugging purposes).
      toString: function(t) {
        return "LatLng(" + z(this.lat, t) + ", " + z(this.lng, t) + ")";
      },
      // @method distanceTo(otherLatLng: LatLng): Number
      // Returns the distance (in meters) to the given `LatLng` calculated using the [Spherical Law of Cosines](https://en.wikipedia.org/wiki/Spherical_law_of_cosines).
      distanceTo: function(t) {
        return fe.distance(this, Mt(t));
      },
      // @method wrap(): LatLng
      // Returns a new `LatLng` object with the longitude wrapped so it's always between -180 and +180 degrees.
      wrap: function() {
        return fe.wrapLatLng(this);
      },
      // @method toBounds(sizeInMeters: Number): LatLngBounds
      // Returns a new `LatLngBounds` object in which each boundary is `sizeInMeters/2` meters apart from the `LatLng`.
      toBounds: function(t) {
        var n = 180 * t / 40075017, s = n / Math.cos(Math.PI / 180 * this.lat);
        return jt(
          [this.lat - n, this.lng - s],
          [this.lat + n, this.lng + s]
        );
      },
      clone: function() {
        return new St(this.lat, this.lng, this.alt);
      }
    };
    function Mt(t, n, s) {
      return t instanceof St ? t : Rt(t) && typeof t[0] != "object" ? t.length === 3 ? new St(t[0], t[1], t[2]) : t.length === 2 ? new St(t[0], t[1]) : null : t == null ? t : typeof t == "object" && "lat" in t ? new St(t.lat, "lng" in t ? t.lng : t.lon, t.alt) : n === void 0 ? null : new St(t, n, s);
    }
    var be = {
      // @method latLngToPoint(latlng: LatLng, zoom: Number): Point
      // Projects geographical coordinates into pixel coordinates for a given zoom.
      latLngToPoint: function(t, n) {
        var s = this.projection.project(t), c = this.scale(n);
        return this.transformation._transform(s, c);
      },
      // @method pointToLatLng(point: Point, zoom: Number): LatLng
      // The inverse of `latLngToPoint`. Projects pixel coordinates on a given
      // zoom into geographical coordinates.
      pointToLatLng: function(t, n) {
        var s = this.scale(n), c = this.transformation.untransform(t, s);
        return this.projection.unproject(c);
      },
      // @method project(latlng: LatLng): Point
      // Projects geographical coordinates into coordinates in units accepted for
      // this CRS (e.g. meters for EPSG:3857, for passing it to WMS services).
      project: function(t) {
        return this.projection.project(t);
      },
      // @method unproject(point: Point): LatLng
      // Given a projected coordinate returns the corresponding LatLng.
      // The inverse of `project`.
      unproject: function(t) {
        return this.projection.unproject(t);
      },
      // @method scale(zoom: Number): Number
      // Returns the scale used when transforming projected coordinates into
      // pixel coordinates for a particular zoom. For example, it returns
      // `256 * 2^zoom` for Mercator-based CRS.
      scale: function(t) {
        return 256 * Math.pow(2, t);
      },
      // @method zoom(scale: Number): Number
      // Inverse of `scale()`, returns the zoom level corresponding to a scale
      // factor of `scale`.
      zoom: function(t) {
        return Math.log(t / 256) / Math.LN2;
      },
      // @method getProjectedBounds(zoom: Number): Bounds
      // Returns the projection's bounds scaled and transformed for the provided `zoom`.
      getProjectedBounds: function(t) {
        if (this.infinite)
          return null;
        var n = this.projection.bounds, s = this.scale(t), c = this.transformation.transform(n.min, s), y = this.transformation.transform(n.max, s);
        return new Bt(c, y);
      },
      // @method distance(latlng1: LatLng, latlng2: LatLng): Number
      // Returns the distance between two geographical coordinates.
      // @property code: String
      // Standard code name of the CRS passed into WMS services (e.g. `'EPSG:3857'`)
      //
      // @property wrapLng: Number[]
      // An array of two numbers defining whether the longitude (horizontal) coordinate
      // axis wraps around a given range and how. Defaults to `[-180, 180]` in most
      // geographical CRSs. If `undefined`, the longitude axis does not wrap around.
      //
      // @property wrapLat: Number[]
      // Like `wrapLng`, but for the latitude (vertical) axis.
      // wrapLng: [min, max],
      // wrapLat: [min, max],
      // @property infinite: Boolean
      // If true, the coordinate space will be unbounded (infinite in both axes)
      infinite: !1,
      // @method wrapLatLng(latlng: LatLng): LatLng
      // Returns a `LatLng` where lat and lng has been wrapped according to the
      // CRS's `wrapLat` and `wrapLng` properties, if they are outside the CRS's bounds.
      wrapLatLng: function(t) {
        var n = this.wrapLng ? P(t.lng, this.wrapLng, !0) : t.lng, s = this.wrapLat ? P(t.lat, this.wrapLat, !0) : t.lat, c = t.alt;
        return new St(s, n, c);
      },
      // @method wrapLatLngBounds(bounds: LatLngBounds): LatLngBounds
      // Returns a `LatLngBounds` with the same size as the given one, ensuring
      // that its center is within the CRS's bounds.
      // Only accepts actual `L.LatLngBounds` instances, not arrays.
      wrapLatLngBounds: function(t) {
        var n = t.getCenter(), s = this.wrapLatLng(n), c = n.lat - s.lat, y = n.lng - s.lng;
        if (c === 0 && y === 0)
          return t;
        var B = t.getSouthWest(), G = t.getNorthEast(), rt = new St(B.lat - c, B.lng - y), ht = new St(G.lat - c, G.lng - y);
        return new ue(rt, ht);
      }
    }, fe = b({}, be, {
      wrapLng: [-180, 180],
      // Mean Earth Radius, as recommended for use by
      // the International Union of Geodesy and Geophysics,
      // see https://rosettacode.org/wiki/Haversine_formula
      R: 6371e3,
      // distance between two geographical points using spherical law of cosines approximation
      distance: function(t, n) {
        var s = Math.PI / 180, c = t.lat * s, y = n.lat * s, B = Math.sin((n.lat - t.lat) * s / 2), G = Math.sin((n.lng - t.lng) * s / 2), rt = B * B + Math.cos(c) * Math.cos(y) * G * G, ht = 2 * Math.atan2(Math.sqrt(rt), Math.sqrt(1 - rt));
        return this.R * ht;
      }
    }), ke = 6378137, Bi = {
      R: ke,
      MAX_LATITUDE: 85.0511287798,
      project: function(t) {
        var n = Math.PI / 180, s = this.MAX_LATITUDE, c = Math.max(Math.min(s, t.lat), -s), y = Math.sin(c * n);
        return new Ot(
          this.R * t.lng * n,
          this.R * Math.log((1 + y) / (1 - y)) / 2
        );
      },
      unproject: function(t) {
        var n = 180 / Math.PI;
        return new St(
          (2 * Math.atan(Math.exp(t.y / this.R)) - Math.PI / 2) * n,
          t.x * n / this.R
        );
      },
      bounds: function() {
        var t = ke * Math.PI;
        return new Bt([-t, -t], [t, t]);
      }()
    };
    function pn(t, n, s, c) {
      if (Rt(t)) {
        this._a = t[0], this._b = t[1], this._c = t[2], this._d = t[3];
        return;
      }
      this._a = t, this._b = n, this._c = s, this._d = c;
    }
    pn.prototype = {
      // @method transform(point: Point, scale?: Number): Point
      // Returns a transformed point, optionally multiplied by the given scale.
      // Only accepts actual `L.Point` instances, not arrays.
      transform: function(t, n) {
        return this._transform(t.clone(), n);
      },
      // destructive transform (faster)
      _transform: function(t, n) {
        return n = n || 1, t.x = n * (this._a * t.x + this._b), t.y = n * (this._c * t.y + this._d), t;
      },
      // @method untransform(point: Point, scale?: Number): Point
      // Returns the reverse transformation of the given point, optionally divided
      // by the given scale. Only accepts actual `L.Point` instances, not arrays.
      untransform: function(t, n) {
        return n = n || 1, new Ot(
          (t.x / n - this._b) / this._a,
          (t.y / n - this._d) / this._c
        );
      }
    };
    function Fi(t, n, s, c) {
      return new pn(t, n, s, c);
    }
    var mi = b({}, fe, {
      code: "EPSG:3857",
      projection: Bi,
      transformation: function() {
        var t = 0.5 / (Math.PI * Bi.R);
        return Fi(t, 0.5, -t, 0.5);
      }()
    }), Ri = b({}, mi, {
      code: "EPSG:900913"
    });
    function Yn(t) {
      return document.createElementNS("http://www.w3.org/2000/svg", t);
    }
    function Qn(t, n) {
      var s = "", c, y, B, G, rt, ht;
      for (c = 0, B = t.length; c < B; c++) {
        for (rt = t[c], y = 0, G = rt.length; y < G; y++)
          ht = rt[y], s += (y ? "L" : "M") + ht.x + " " + ht.y;
        s += n ? Gt.svg ? "z" : "x" : "";
      }
      return s || "M0 0";
    }
    var zi = document.documentElement.style, Ni = "ActiveXObject" in window, tr = Ni && !document.addEventListener, Tn = "msLaunchUri" in navigator && !("documentMode" in document), ji = ci("webkit"), ti = ci("android"), mn = ci("android 2") || ci("android 3"), Sr = parseInt(/WebKit\/([0-9]+)|$/.exec(navigator.userAgent)[1], 10), gi = ti && ci("Google") && Sr < 537 && !("AudioNode" in window), Dn = !!window.opera, T = !Tn && ci("chrome"), m = ci("gecko") && !ji && !Dn && !Ni, v = !T && ci("safari"), R = ci("phantom"), X = "OTransition" in zi, ot = navigator.platform.indexOf("Win") === 0, pt = Ni && "transition" in zi, Yt = "WebKitCSSMatrix" in window && "m11" in new window.WebKitCSSMatrix() && !mn, ye = "MozPerspective" in zi, xe = !window.L_DISABLE_3D && (pt || Yt || ye) && !X && !R, _e = typeof orientation < "u" || ci("mobile"), ve = _e && ji, Js = _e && Yt, Pr = !window.PointerEvent && window.MSPointerEvent, Ia = !!(window.PointerEvent || Pr), Fa = "ontouchstart" in window || !!window.TouchEvent, Xs = !window.L_NO_TOUCH && (Fa || Ia), Ys = _e && Dn, Ra = _e && m, za = (window.devicePixelRatio || window.screen.deviceXDPI / window.screen.logicalXDPI) > 1, Qs = function() {
      var t = !1;
      try {
        var n = Object.defineProperty({}, "passive", {
          get: function() {
            t = !0;
          }
        });
        window.addEventListener("testPassiveEventSupport", M, n), window.removeEventListener("testPassiveEventSupport", M, n);
      } catch {
      }
      return t;
    }(), to = function() {
      return !!document.createElement("canvas").getContext;
    }(), Tr = !!(document.createElementNS && Yn("svg").createSVGRect), Na = !!Tr && function() {
      var t = document.createElement("div");
      return t.innerHTML = "<svg/>", (t.firstChild && t.firstChild.namespaceURI) === "http://www.w3.org/2000/svg";
    }(), eo = !Tr && function() {
      try {
        var t = document.createElement("div");
        t.innerHTML = '<v:shape adj="1"/>';
        var n = t.firstChild;
        return n.style.behavior = "url(#default#VML)", n && typeof n.adj == "object";
      } catch {
        return !1;
      }
    }(), io = navigator.platform.indexOf("Mac") === 0, no = navigator.platform.indexOf("Linux") === 0;
    function ci(t) {
      return navigator.userAgent.toLowerCase().indexOf(t) >= 0;
    }
    var Gt = {
      ie: Ni,
      ielt9: tr,
      edge: Tn,
      webkit: ji,
      android: ti,
      android23: mn,
      androidStock: gi,
      opera: Dn,
      chrome: T,
      gecko: m,
      safari: v,
      phantom: R,
      opera12: X,
      win: ot,
      ie3d: pt,
      webkit3d: Yt,
      gecko3d: ye,
      any3d: xe,
      mobile: _e,
      mobileWebkit: ve,
      mobileWebkit3d: Js,
      msPointer: Pr,
      pointer: Ia,
      touch: Xs,
      touchNative: Fa,
      mobileOpera: Ys,
      mobileGecko: Ra,
      retina: za,
      passiveEvents: Qs,
      canvas: to,
      svg: Tr,
      vml: eo,
      inlineSvg: Na,
      mac: io,
      linux: no
    }, ja = Gt.msPointer ? "MSPointerDown" : "pointerdown", Va = Gt.msPointer ? "MSPointerMove" : "pointermove", Dr = Gt.msPointer ? "MSPointerUp" : "pointerup", $a = Gt.msPointer ? "MSPointerCancel" : "pointercancel", Or = {
      touchstart: ja,
      touchmove: Va,
      touchend: Dr,
      touchcancel: $a
    }, Ua = {
      touchstart: lo,
      touchmove: ir,
      touchend: ir,
      touchcancel: ir
    }, gn = {}, Ga = !1;
    function ro(t, n, s) {
      return n === "touchstart" && Ir(), Ua[n] ? (s = Ua[n].bind(this, s), t.addEventListener(Or[n], s, !1), s) : (console.warn("wrong event specified:", n), M);
    }
    function ao(t, n, s) {
      if (!Or[n]) {
        console.warn("wrong event specified:", n);
        return;
      }
      t.removeEventListener(Or[n], s, !1);
    }
    function so(t) {
      gn[t.pointerId] = t;
    }
    function oo(t) {
      gn[t.pointerId] && (gn[t.pointerId] = t);
    }
    function er(t) {
      delete gn[t.pointerId];
    }
    function Ir() {
      Ga || (document.addEventListener(ja, so, !0), document.addEventListener(Va, oo, !0), document.addEventListener(Dr, er, !0), document.addEventListener($a, er, !0), Ga = !0);
    }
    function ir(t, n) {
      if (n.pointerType !== (n.MSPOINTER_TYPE_MOUSE || "mouse")) {
        n.touches = [];
        for (var s in gn)
          n.touches.push(gn[s]);
        n.changedTouches = [n], t(n);
      }
    }
    function lo(t, n) {
      n.MSPOINTER_TYPE_TOUCH && n.pointerType === n.MSPOINTER_TYPE_TOUCH && Ie(n), ir(t, n);
    }
    function uo(t) {
      var n = {}, s, c;
      for (c in t)
        s = t[c], n[c] = s && s.bind ? s.bind(t) : s;
      return t = n, n.type = "dblclick", n.detail = 2, n.isTrusted = !1, n._simulated = !0, n;
    }
    var ho = 200;
    function co(t, n) {
      t.addEventListener("dblclick", n);
      var s = 0, c;
      function y(B) {
        if (B.detail !== 1) {
          c = B.detail;
          return;
        }
        if (!(B.pointerType === "mouse" || B.sourceCapabilities && !B.sourceCapabilities.firesTouchEvents)) {
          var G = Wa(B);
          if (!(G.some(function(ht) {
            return ht instanceof HTMLLabelElement && ht.attributes.for;
          }) && !G.some(function(ht) {
            return ht instanceof HTMLInputElement || ht instanceof HTMLSelectElement;
          }))) {
            var rt = Date.now();
            rt - s <= ho ? (c++, c === 2 && n(uo(B))) : c = 1, s = rt;
          }
        }
      }
      return t.addEventListener("click", y), {
        dblclick: n,
        simDblclick: y
      };
    }
    function fo(t, n) {
      t.removeEventListener("dblclick", n.dblclick), t.removeEventListener("click", n.simDblclick);
    }
    var Fr = rr(
      ["transform", "webkitTransform", "OTransform", "MozTransform", "msTransform"]
    ), On = rr(
      ["webkitTransition", "transition", "OTransition", "MozTransition", "msTransition"]
    ), Za = On === "webkitTransition" || On === "OTransition" ? On + "End" : "transitionend";
    function qa(t) {
      return typeof t == "string" ? document.getElementById(t) : t;
    }
    function Vi(t, n) {
      var s = t.style[n] || t.currentStyle && t.currentStyle[n];
      if ((!s || s === "auto") && document.defaultView) {
        var c = document.defaultView.getComputedStyle(t, null);
        s = c ? c[n] : null;
      }
      return s === "auto" ? null : s;
    }
    function de(t, n, s) {
      var c = document.createElement(t);
      return c.className = n || "", s && s.appendChild(c), c;
    }
    function Ce(t) {
      var n = t.parentNode;
      n && n.removeChild(t);
    }
    function In(t) {
      for (; t.firstChild; )
        t.removeChild(t.firstChild);
    }
    function _n(t) {
      var n = t.parentNode;
      n && n.lastChild !== t && n.appendChild(t);
    }
    function yn(t) {
      var n = t.parentNode;
      n && n.firstChild !== t && n.insertBefore(t, n.firstChild);
    }
    function Rr(t, n) {
      if (t.classList !== void 0)
        return t.classList.contains(n);
      var s = nr(t);
      return s.length > 0 && new RegExp("(^|\\s)" + n + "(\\s|$)").test(s);
    }
    function re(t, n) {
      if (t.classList !== void 0)
        for (var s = $(n), c = 0, y = s.length; c < y; c++)
          t.classList.add(s[c]);
      else if (!Rr(t, n)) {
        var B = nr(t);
        zr(t, (B ? B + " " : "") + n);
      }
    }
    function Me(t, n) {
      t.classList !== void 0 ? t.classList.remove(n) : zr(t, j((" " + nr(t) + " ").replace(" " + n + " ", " ")));
    }
    function zr(t, n) {
      t.className.baseVal === void 0 ? t.className = n : t.className.baseVal = n;
    }
    function nr(t) {
      return t.correspondingElement && (t = t.correspondingElement), t.className.baseVal === void 0 ? t.className : t.className.baseVal;
    }
    function ri(t, n) {
      "opacity" in t.style ? t.style.opacity = n : "filter" in t.style && po(t, n);
    }
    function po(t, n) {
      var s = !1, c = "DXImageTransform.Microsoft.Alpha";
      try {
        s = t.filters.item(c);
      } catch {
        if (n === 1)
          return;
      }
      n = Math.round(n * 100), s ? (s.Enabled = n !== 100, s.Opacity = n) : t.style.filter += " progid:" + c + "(opacity=" + n + ")";
    }
    function rr(t) {
      for (var n = document.documentElement.style, s = 0; s < t.length; s++)
        if (t[s] in n)
          return t[s];
      return !1;
    }
    function tn(t, n, s) {
      var c = n || new Ot(0, 0);
      t.style[Fr] = (Gt.ie3d ? "translate(" + c.x + "px," + c.y + "px)" : "translate3d(" + c.x + "px," + c.y + "px,0)") + (s ? " scale(" + s + ")" : "");
    }
    function Ae(t, n) {
      t._leaflet_pos = n, Gt.any3d ? tn(t, n) : (t.style.left = n.x + "px", t.style.top = n.y + "px");
    }
    function $i(t) {
      return t._leaflet_pos || new Ot(0, 0);
    }
    var Fn, Rn, Nr;
    if ("onselectstart" in document)
      Fn = function() {
        Qt(window, "selectstart", Ie);
      }, Rn = function() {
        pe(window, "selectstart", Ie);
      };
    else {
      var zn = rr(
        ["userSelect", "WebkitUserSelect", "OUserSelect", "MozUserSelect", "msUserSelect"]
      );
      Fn = function() {
        if (zn) {
          var t = document.documentElement.style;
          Nr = t[zn], t[zn] = "none";
        }
      }, Rn = function() {
        zn && (document.documentElement.style[zn] = Nr, Nr = void 0);
      };
    }
    function jr() {
      Qt(window, "dragstart", Ie);
    }
    function Vr() {
      pe(window, "dragstart", Ie);
    }
    var ar, $r;
    function Ur(t) {
      for (; t.tabIndex === -1; )
        t = t.parentNode;
      t.style && (sr(), ar = t, $r = t.style.outlineStyle, t.style.outlineStyle = "none", Qt(window, "keydown", sr));
    }
    function sr() {
      ar && (ar.style.outlineStyle = $r, ar = void 0, $r = void 0, pe(window, "keydown", sr));
    }
    function Ha(t) {
      do
        t = t.parentNode;
      while ((!t.offsetWidth || !t.offsetHeight) && t !== document.body);
      return t;
    }
    function Gr(t) {
      var n = t.getBoundingClientRect();
      return {
        x: n.width / t.offsetWidth || 1,
        y: n.height / t.offsetHeight || 1,
        boundingClientRect: n
      };
    }
    var mo = {
      __proto__: null,
      TRANSFORM: Fr,
      TRANSITION: On,
      TRANSITION_END: Za,
      get: qa,
      getStyle: Vi,
      create: de,
      remove: Ce,
      empty: In,
      toFront: _n,
      toBack: yn,
      hasClass: Rr,
      addClass: re,
      removeClass: Me,
      setClass: zr,
      getClass: nr,
      setOpacity: ri,
      testProp: rr,
      setTransform: tn,
      setPosition: Ae,
      getPosition: $i,
      get disableTextSelection() {
        return Fn;
      },
      get enableTextSelection() {
        return Rn;
      },
      disableImageDrag: jr,
      enableImageDrag: Vr,
      preventOutline: Ur,
      restoreOutline: sr,
      getSizedParentNode: Ha,
      getScale: Gr
    };
    function Qt(t, n, s, c) {
      if (n && typeof n == "object")
        for (var y in n)
          qr(t, y, n[y], s);
      else {
        n = $(n);
        for (var B = 0, G = n.length; B < G; B++)
          qr(t, n[B], s, c);
      }
      return this;
    }
    var _i = "_leaflet_events";
    function pe(t, n, s, c) {
      if (arguments.length === 1)
        Ka(t), delete t[_i];
      else if (n && typeof n == "object")
        for (var y in n)
          Hr(t, y, n[y], s);
      else if (n = $(n), arguments.length === 2)
        Ka(t, function(rt) {
          return zt(n, rt) !== -1;
        });
      else
        for (var B = 0, G = n.length; B < G; B++)
          Hr(t, n[B], s, c);
      return this;
    }
    function Ka(t, n) {
      for (var s in t[_i]) {
        var c = s.split(/\d/)[0];
        (!n || n(c)) && Hr(t, c, null, null, s);
      }
    }
    var Zr = {
      mouseenter: "mouseover",
      mouseleave: "mouseout",
      wheel: !("onwheel" in window) && "mousewheel"
    };
    function qr(t, n, s, c) {
      var y = n + x(s) + (c ? "_" + x(c) : "");
      if (t[_i] && t[_i][y])
        return this;
      var B = function(rt) {
        return s.call(c || t, rt || window.event);
      }, G = B;
      !Gt.touchNative && Gt.pointer && n.indexOf("touch") === 0 ? B = ro(t, n, B) : Gt.touch && n === "dblclick" ? B = co(t, B) : "addEventListener" in t ? n === "touchstart" || n === "touchmove" || n === "wheel" || n === "mousewheel" ? t.addEventListener(Zr[n] || n, B, Gt.passiveEvents ? { passive: !1 } : !1) : n === "mouseenter" || n === "mouseleave" ? (B = function(rt) {
        rt = rt || window.event, or(t, rt) && G(rt);
      }, t.addEventListener(Zr[n], B, !1)) : t.addEventListener(n, G, !1) : t.attachEvent("on" + n, B), t[_i] = t[_i] || {}, t[_i][y] = B;
    }
    function Hr(t, n, s, c, y) {
      y = y || n + x(s) + (c ? "_" + x(c) : "");
      var B = t[_i] && t[_i][y];
      if (!B)
        return this;
      !Gt.touchNative && Gt.pointer && n.indexOf("touch") === 0 ? ao(t, n, B) : Gt.touch && n === "dblclick" ? fo(t, B) : "removeEventListener" in t ? t.removeEventListener(Zr[n] || n, B, !1) : t.detachEvent("on" + n, B), t[_i][y] = null;
    }
    function en(t) {
      return t.stopPropagation ? t.stopPropagation() : t.originalEvent ? t.originalEvent._stopped = !0 : t.cancelBubble = !0, this;
    }
    function Kr(t) {
      return qr(t, "wheel", en), this;
    }
    function Nn(t) {
      return Qt(t, "mousedown touchstart dblclick contextmenu", en), t._leaflet_disable_click = !0, this;
    }
    function Ie(t) {
      return t.preventDefault ? t.preventDefault() : t.returnValue = !1, this;
    }
    function nn(t) {
      return Ie(t), en(t), this;
    }
    function Wa(t) {
      if (t.composedPath)
        return t.composedPath();
      for (var n = [], s = t.target; s; )
        n.push(s), s = s.parentNode;
      return n;
    }
    function jn(t, n) {
      if (!n)
        return new Ot(t.clientX, t.clientY);
      var s = Gr(n), c = s.boundingClientRect;
      return new Ot(
        // offset.left/top values are in page scale (like clientX/Y),
        // whereas clientLeft/Top (border width) values are the original values (before CSS scale applies).
        (t.clientX - c.left) / s.x - n.clientLeft,
        (t.clientY - c.top) / s.y - n.clientTop
      );
    }
    var go = Gt.linux && Gt.chrome ? window.devicePixelRatio : Gt.mac ? window.devicePixelRatio * 3 : window.devicePixelRatio > 0 ? 2 * window.devicePixelRatio : 1;
    function Ja(t) {
      return Gt.edge ? t.wheelDeltaY / 2 : (
        // Don't trust window-geometry-based delta
        t.deltaY && t.deltaMode === 0 ? -t.deltaY / go : (
          // Pixels
          t.deltaY && t.deltaMode === 1 ? -t.deltaY * 20 : (
            // Lines
            t.deltaY && t.deltaMode === 2 ? -t.deltaY * 60 : (
              // Pages
              t.deltaX || t.deltaZ ? 0 : (
                // Skip horizontal/depth wheel events
                t.wheelDelta ? (t.wheelDeltaY || t.wheelDelta) / 2 : (
                  // Legacy IE pixels
                  t.detail && Math.abs(t.detail) < 32765 ? -t.detail * 20 : (
                    // Legacy Moz lines
                    t.detail ? t.detail / -32765 * 60 : (
                      // Legacy Moz pages
                      0
                    )
                  )
                )
              )
            )
          )
        )
      );
    }
    function or(t, n) {
      var s = n.relatedTarget;
      if (!s)
        return !0;
      try {
        for (; s && s !== t; )
          s = s.parentNode;
      } catch {
        return !1;
      }
      return s !== t;
    }
    var ce = {
      __proto__: null,
      on: Qt,
      off: pe,
      stopPropagation: en,
      disableScrollPropagation: Kr,
      disableClickPropagation: Nn,
      preventDefault: Ie,
      stop: nn,
      getPropagationPath: Wa,
      getMousePosition: jn,
      getWheelDelta: Ja,
      isExternalTarget: or,
      addListener: Qt,
      removeListener: pe
    }, Xa = we.extend({
      // @method run(el: HTMLElement, newPos: Point, duration?: Number, easeLinearity?: Number)
      // Run an animation of a given element to a new position, optionally setting
      // duration in seconds (`0.25` by default) and easing linearity factor (3rd
      // argument of the [cubic bezier curve](https://cubic-bezier.com/#0,0,.5,1),
      // `0.5` by default).
      run: function(t, n, s, c) {
        this.stop(), this._el = t, this._inProgress = !0, this._duration = s || 0.25, this._easeOutPower = 1 / Math.max(c || 0.5, 0.2), this._startPos = $i(t), this._offset = n.subtract(this._startPos), this._startTime = +/* @__PURE__ */ new Date(), this.fire("start"), this._animate();
      },
      // @method stop()
      // Stops the animation (if currently running).
      stop: function() {
        this._inProgress && (this._step(!0), this._complete());
      },
      _animate: function() {
        this._animId = Wt(this._animate, this), this._step();
      },
      _step: function(t) {
        var n = +/* @__PURE__ */ new Date() - this._startTime, s = this._duration * 1e3;
        n < s ? this._runFrame(this._easeOut(n / s), t) : (this._runFrame(1), this._complete());
      },
      _runFrame: function(t, n) {
        var s = this._startPos.add(this._offset.multiplyBy(t));
        n && s._round(), Ae(this._el, s), this.fire("step");
      },
      _complete: function() {
        ge(this._animId), this._inProgress = !1, this.fire("end");
      },
      _easeOut: function(t) {
        return 1 - Math.pow(1 - t, this._easeOutPower);
      }
    }), le = we.extend({
      options: {
        // @section Map State Options
        // @option crs: CRS = L.CRS.EPSG3857
        // The [Coordinate Reference System](#crs) to use. Don't change this if you're not
        // sure what it means.
        crs: mi,
        // @option center: LatLng = undefined
        // Initial geographic center of the map
        center: void 0,
        // @option zoom: Number = undefined
        // Initial map zoom level
        zoom: void 0,
        // @option minZoom: Number = *
        // Minimum zoom level of the map.
        // If not specified and at least one `GridLayer` or `TileLayer` is in the map,
        // the lowest of their `minZoom` options will be used instead.
        minZoom: void 0,
        // @option maxZoom: Number = *
        // Maximum zoom level of the map.
        // If not specified and at least one `GridLayer` or `TileLayer` is in the map,
        // the highest of their `maxZoom` options will be used instead.
        maxZoom: void 0,
        // @option layers: Layer[] = []
        // Array of layers that will be added to the map initially
        layers: [],
        // @option maxBounds: LatLngBounds = null
        // When this option is set, the map restricts the view to the given
        // geographical bounds, bouncing the user back if the user tries to pan
        // outside the view. To set the restriction dynamically, use
        // [`setMaxBounds`](#map-setmaxbounds) method.
        maxBounds: void 0,
        // @option renderer: Renderer = *
        // The default method for drawing vector layers on the map. `L.SVG`
        // or `L.Canvas` by default depending on browser support.
        renderer: void 0,
        // @section Animation Options
        // @option zoomAnimation: Boolean = true
        // Whether the map zoom animation is enabled. By default it's enabled
        // in all browsers that support CSS3 Transitions except Android.
        zoomAnimation: !0,
        // @option zoomAnimationThreshold: Number = 4
        // Won't animate zoom if the zoom difference exceeds this value.
        zoomAnimationThreshold: 4,
        // @option fadeAnimation: Boolean = true
        // Whether the tile fade animation is enabled. By default it's enabled
        // in all browsers that support CSS3 Transitions except Android.
        fadeAnimation: !0,
        // @option markerZoomAnimation: Boolean = true
        // Whether markers animate their zoom with the zoom animation, if disabled
        // they will disappear for the length of the animation. By default it's
        // enabled in all browsers that support CSS3 Transitions except Android.
        markerZoomAnimation: !0,
        // @option transform3DLimit: Number = 2^23
        // Defines the maximum size of a CSS translation transform. The default
        // value should not be changed unless a web browser positions layers in
        // the wrong place after doing a large `panBy`.
        transform3DLimit: 8388608,
        // Precision limit of a 32-bit float
        // @section Interaction Options
        // @option zoomSnap: Number = 1
        // Forces the map's zoom level to always be a multiple of this, particularly
        // right after a [`fitBounds()`](#map-fitbounds) or a pinch-zoom.
        // By default, the zoom level snaps to the nearest integer; lower values
        // (e.g. `0.5` or `0.1`) allow for greater granularity. A value of `0`
        // means the zoom level will not be snapped after `fitBounds` or a pinch-zoom.
        zoomSnap: 1,
        // @option zoomDelta: Number = 1
        // Controls how much the map's zoom level will change after a
        // [`zoomIn()`](#map-zoomin), [`zoomOut()`](#map-zoomout), pressing `+`
        // or `-` on the keyboard, or using the [zoom controls](#control-zoom).
        // Values smaller than `1` (e.g. `0.5`) allow for greater granularity.
        zoomDelta: 1,
        // @option trackResize: Boolean = true
        // Whether the map automatically handles browser window resize to update itself.
        trackResize: !0
      },
      initialize: function(t, n) {
        n = tt(this, n), this._handlers = [], this._layers = {}, this._zoomBoundLayers = {}, this._sizeChanged = !0, this._initContainer(t), this._initLayout(), this._onResize = w(this._onResize, this), this._initEvents(), n.maxBounds && this.setMaxBounds(n.maxBounds), n.zoom !== void 0 && (this._zoom = this._limitZoom(n.zoom)), n.center && n.zoom !== void 0 && this.setView(Mt(n.center), n.zoom, { reset: !0 }), this.callInitHooks(), this._zoomAnimated = On && Gt.any3d && !Gt.mobileOpera && this.options.zoomAnimation, this._zoomAnimated && (this._createAnimProxy(), Qt(this._proxy, Za, this._catchTransitionEnd, this)), this._addLayers(this.options.layers);
      },
      // @section Methods for modifying map state
      // @method setView(center: LatLng, zoom: Number, options?: Zoom/pan options): this
      // Sets the view of the map (geographical center and zoom) with the given
      // animation options.
      setView: function(t, n, s) {
        if (n = n === void 0 ? this._zoom : this._limitZoom(n), t = this._limitCenter(Mt(t), n, this.options.maxBounds), s = s || {}, this._stop(), this._loaded && !s.reset && s !== !0) {
          s.animate !== void 0 && (s.zoom = b({ animate: s.animate }, s.zoom), s.pan = b({ animate: s.animate, duration: s.duration }, s.pan));
          var c = this._zoom !== n ? this._tryAnimatedZoom && this._tryAnimatedZoom(t, n, s.zoom) : this._tryAnimatedPan(t, s.pan);
          if (c)
            return clearTimeout(this._sizeTimer), this;
        }
        return this._resetView(t, n, s.pan && s.pan.noMoveStart), this;
      },
      // @method setZoom(zoom: Number, options?: Zoom/pan options): this
      // Sets the zoom of the map.
      setZoom: function(t, n) {
        return this._loaded ? this.setView(this.getCenter(), t, { zoom: n }) : (this._zoom = t, this);
      },
      // @method zoomIn(delta?: Number, options?: Zoom options): this
      // Increases the zoom of the map by `delta` ([`zoomDelta`](#map-zoomdelta) by default).
      zoomIn: function(t, n) {
        return t = t || (Gt.any3d ? this.options.zoomDelta : 1), this.setZoom(this._zoom + t, n);
      },
      // @method zoomOut(delta?: Number, options?: Zoom options): this
      // Decreases the zoom of the map by `delta` ([`zoomDelta`](#map-zoomdelta) by default).
      zoomOut: function(t, n) {
        return t = t || (Gt.any3d ? this.options.zoomDelta : 1), this.setZoom(this._zoom - t, n);
      },
      // @method setZoomAround(latlng: LatLng, zoom: Number, options: Zoom options): this
      // Zooms the map while keeping a specified geographical point on the map
      // stationary (e.g. used internally for scroll zoom and double-click zoom).
      // @alternative
      // @method setZoomAround(offset: Point, zoom: Number, options: Zoom options): this
      // Zooms the map while keeping a specified pixel on the map (relative to the top-left corner) stationary.
      setZoomAround: function(t, n, s) {
        var c = this.getZoomScale(n), y = this.getSize().divideBy(2), B = t instanceof Ot ? t : this.latLngToContainerPoint(t), G = B.subtract(y).multiplyBy(1 - 1 / c), rt = this.containerPointToLatLng(y.add(G));
        return this.setView(rt, n, { zoom: s });
      },
      _getBoundsCenterZoom: function(t, n) {
        n = n || {}, t = t.getBounds ? t.getBounds() : jt(t);
        var s = lt(n.paddingTopLeft || n.padding || [0, 0]), c = lt(n.paddingBottomRight || n.padding || [0, 0]), y = this.getBoundsZoom(t, !1, s.add(c));
        if (y = typeof n.maxZoom == "number" ? Math.min(n.maxZoom, y) : y, y === 1 / 0)
          return {
            center: t.getCenter(),
            zoom: y
          };
        var B = c.subtract(s).divideBy(2), G = this.project(t.getSouthWest(), y), rt = this.project(t.getNorthEast(), y), ht = this.unproject(G.add(rt).divideBy(2).add(B), y);
        return {
          center: ht,
          zoom: y
        };
      },
      // @method fitBounds(bounds: LatLngBounds, options?: fitBounds options): this
      // Sets a map view that contains the given geographical bounds with the
      // maximum zoom level possible.
      fitBounds: function(t, n) {
        if (t = jt(t), !t.isValid())
          throw new Error("Bounds are not valid.");
        var s = this._getBoundsCenterZoom(t, n);
        return this.setView(s.center, s.zoom, n);
      },
      // @method fitWorld(options?: fitBounds options): this
      // Sets a map view that mostly contains the whole world with the maximum
      // zoom level possible.
      fitWorld: function(t) {
        return this.fitBounds([[-90, -180], [90, 180]], t);
      },
      // @method panTo(latlng: LatLng, options?: Pan options): this
      // Pans the map to a given center.
      panTo: function(t, n) {
        return this.setView(t, this._zoom, { pan: n });
      },
      // @method panBy(offset: Point, options?: Pan options): this
      // Pans the map by a given number of pixels (animated).
      panBy: function(t, n) {
        if (t = lt(t).round(), n = n || {}, !t.x && !t.y)
          return this.fire("moveend");
        if (n.animate !== !0 && !this.getSize().contains(t))
          return this._resetView(this.unproject(this.project(this.getCenter()).add(t)), this.getZoom()), this;
        if (this._panAnim || (this._panAnim = new Xa(), this._panAnim.on({
          step: this._onPanTransitionStep,
          end: this._onPanTransitionEnd
        }, this)), n.noMoveStart || this.fire("movestart"), n.animate !== !1) {
          re(this._mapPane, "leaflet-pan-anim");
          var s = this._getMapPanePos().subtract(t).round();
          this._panAnim.run(this._mapPane, s, n.duration || 0.25, n.easeLinearity);
        } else
          this._rawPanBy(t), this.fire("move").fire("moveend");
        return this;
      },
      // @method flyTo(latlng: LatLng, zoom?: Number, options?: Zoom/pan options): this
      // Sets the view of the map (geographical center and zoom) performing a smooth
      // pan-zoom animation.
      flyTo: function(t, n, s) {
        if (s = s || {}, s.animate === !1 || !Gt.any3d)
          return this.setView(t, n, s);
        this._stop();
        var c = this.project(this.getCenter()), y = this.project(t), B = this.getSize(), G = this._zoom;
        t = Mt(t), n = n === void 0 ? G : n;
        var rt = Math.max(B.x, B.y), ht = rt * this.getZoomScale(G, n), gt = y.distanceTo(c) || 1, Tt = 1.42, Ht = Tt * Tt;
        function se(Ee) {
          var Ge = Ee ? -1 : 1, Je = Ee ? ht : rt, Cs = ht * ht - rt * rt + Ge * Ht * Ht * gt * gt, fi = 2 * Je * Ht * gt, Xt = Cs / fi, vr = Math.sqrt(Xt * Xt + 1) - Xt, ha = vr < 1e-9 ? -18 : Math.log(vr);
          return ha;
        }
        function Ue(Ee) {
          return (Math.exp(Ee) - Math.exp(-Ee)) / 2;
        }
        function Oe(Ee) {
          return (Math.exp(Ee) + Math.exp(-Ee)) / 2;
        }
        function ui(Ee) {
          return Ue(Ee) / Oe(Ee);
        }
        var We = se(0);
        function Hi(Ee) {
          return rt * (Oe(We) / Oe(We + Tt * Ee));
        }
        function ws(Ee) {
          return rt * (Oe(We) * ui(We + Tt * Ee) - Ue(We)) / Ht;
        }
        function ua(Ee) {
          return 1 - Math.pow(1 - Ee, 1.5);
        }
        var Oo = Date.now(), Ls = (se(1) - We) / Tt, Io = s.duration ? 1e3 * s.duration : 1e3 * Ls * 0.8;
        function ks() {
          var Ee = (Date.now() - Oo) / Io, Ge = ua(Ee) * Ls;
          Ee <= 1 ? (this._flyToFrame = Wt(ks, this), this._move(
            this.unproject(c.add(y.subtract(c).multiplyBy(ws(Ge) / gt)), G),
            this.getScaleZoom(rt / Hi(Ge), G),
            { flyTo: !0 }
          )) : this._move(t, n)._moveEnd(!0);
        }
        return this._moveStart(!0, s.noMoveStart), ks.call(this), this;
      },
      // @method flyToBounds(bounds: LatLngBounds, options?: fitBounds options): this
      // Sets the view of the map with a smooth animation like [`flyTo`](#map-flyto),
      // but takes a bounds parameter like [`fitBounds`](#map-fitbounds).
      flyToBounds: function(t, n) {
        var s = this._getBoundsCenterZoom(t, n);
        return this.flyTo(s.center, s.zoom, n);
      },
      // @method setMaxBounds(bounds: LatLngBounds): this
      // Restricts the map view to the given bounds (see the [maxBounds](#map-maxbounds) option).
      setMaxBounds: function(t) {
        return t = jt(t), this.listens("moveend", this._panInsideMaxBounds) && this.off("moveend", this._panInsideMaxBounds), t.isValid() ? (this.options.maxBounds = t, this._loaded && this._panInsideMaxBounds(), this.on("moveend", this._panInsideMaxBounds)) : (this.options.maxBounds = null, this);
      },
      // @method setMinZoom(zoom: Number): this
      // Sets the lower limit for the available zoom levels (see the [minZoom](#map-minzoom) option).
      setMinZoom: function(t) {
        var n = this.options.minZoom;
        return this.options.minZoom = t, this._loaded && n !== t && (this.fire("zoomlevelschange"), this.getZoom() < this.options.minZoom) ? this.setZoom(t) : this;
      },
      // @method setMaxZoom(zoom: Number): this
      // Sets the upper limit for the available zoom levels (see the [maxZoom](#map-maxzoom) option).
      setMaxZoom: function(t) {
        var n = this.options.maxZoom;
        return this.options.maxZoom = t, this._loaded && n !== t && (this.fire("zoomlevelschange"), this.getZoom() > this.options.maxZoom) ? this.setZoom(t) : this;
      },
      // @method panInsideBounds(bounds: LatLngBounds, options?: Pan options): this
      // Pans the map to the closest view that would lie inside the given bounds (if it's not already), controlling the animation using the options specific, if any.
      panInsideBounds: function(t, n) {
        this._enforcingBounds = !0;
        var s = this.getCenter(), c = this._limitCenter(s, this._zoom, jt(t));
        return s.equals(c) || this.panTo(c, n), this._enforcingBounds = !1, this;
      },
      // @method panInside(latlng: LatLng, options?: padding options): this
      // Pans the map the minimum amount to make the `latlng` visible. Use
      // padding options to fit the display to more restricted bounds.
      // If `latlng` is already within the (optionally padded) display bounds,
      // the map will not be panned.
      panInside: function(t, n) {
        n = n || {};
        var s = lt(n.paddingTopLeft || n.padding || [0, 0]), c = lt(n.paddingBottomRight || n.padding || [0, 0]), y = this.project(this.getCenter()), B = this.project(t), G = this.getPixelBounds(), rt = Nt([G.min.add(s), G.max.subtract(c)]), ht = rt.getSize();
        if (!rt.contains(B)) {
          this._enforcingBounds = !0;
          var gt = B.subtract(rt.getCenter()), Tt = rt.extend(B).getSize().subtract(ht);
          y.x += gt.x < 0 ? -Tt.x : Tt.x, y.y += gt.y < 0 ? -Tt.y : Tt.y, this.panTo(this.unproject(y), n), this._enforcingBounds = !1;
        }
        return this;
      },
      // @method invalidateSize(options: Zoom/pan options): this
      // Checks if the map container size changed and updates the map if so —
      // call it after you've changed the map size dynamically, also animating
      // pan by default. If `options.pan` is `false`, panning will not occur.
      // If `options.debounceMoveend` is `true`, it will delay `moveend` event so
      // that it doesn't happen often even if the method is called many
      // times in a row.
      // @alternative
      // @method invalidateSize(animate: Boolean): this
      // Checks if the map container size changed and updates the map if so —
      // call it after you've changed the map size dynamically, also animating
      // pan by default.
      invalidateSize: function(t) {
        if (!this._loaded)
          return this;
        t = b({
          animate: !1,
          pan: !0
        }, t === !0 ? { animate: !0 } : t);
        var n = this.getSize();
        this._sizeChanged = !0, this._lastCenter = null;
        var s = this.getSize(), c = n.divideBy(2).round(), y = s.divideBy(2).round(), B = c.subtract(y);
        return !B.x && !B.y ? this : (t.animate && t.pan ? this.panBy(B) : (t.pan && this._rawPanBy(B), this.fire("move"), t.debounceMoveend ? (clearTimeout(this._sizeTimer), this._sizeTimer = setTimeout(w(this.fire, this, "moveend"), 200)) : this.fire("moveend")), this.fire("resize", {
          oldSize: n,
          newSize: s
        }));
      },
      // @section Methods for modifying map state
      // @method stop(): this
      // Stops the currently running `panTo` or `flyTo` animation, if any.
      stop: function() {
        return this.setZoom(this._limitZoom(this._zoom)), this.options.zoomSnap || this.fire("viewreset"), this._stop();
      },
      // @section Geolocation methods
      // @method locate(options?: Locate options): this
      // Tries to locate the user using the Geolocation API, firing a [`locationfound`](#map-locationfound)
      // event with location data on success or a [`locationerror`](#map-locationerror) event on failure,
      // and optionally sets the map view to the user's location with respect to
      // detection accuracy (or to the world view if geolocation failed).
      // Note that, if your page doesn't use HTTPS, this method will fail in
      // modern browsers ([Chrome 50 and newer](https://sites.google.com/a/chromium.org/dev/Home/chromium-security/deprecating-powerful-features-on-insecure-origins))
      // See `Locate options` for more details.
      locate: function(t) {
        if (t = this._locateOptions = b({
          timeout: 1e4,
          watch: !1
          // setView: false
          // maxZoom: <Number>
          // maximumAge: 0
          // enableHighAccuracy: false
        }, t), !("geolocation" in navigator))
          return this._handleGeolocationError({
            code: 0,
            message: "Geolocation not supported."
          }), this;
        var n = w(this._handleGeolocationResponse, this), s = w(this._handleGeolocationError, this);
        return t.watch ? this._locationWatchId = navigator.geolocation.watchPosition(n, s, t) : navigator.geolocation.getCurrentPosition(n, s, t), this;
      },
      // @method stopLocate(): this
      // Stops watching location previously initiated by `map.locate({watch: true})`
      // and aborts resetting the map view if map.locate was called with
      // `{setView: true}`.
      stopLocate: function() {
        return navigator.geolocation && navigator.geolocation.clearWatch && navigator.geolocation.clearWatch(this._locationWatchId), this._locateOptions && (this._locateOptions.setView = !1), this;
      },
      _handleGeolocationError: function(t) {
        if (this._container._leaflet_id) {
          var n = t.code, s = t.message || (n === 1 ? "permission denied" : n === 2 ? "position unavailable" : "timeout");
          this._locateOptions.setView && !this._loaded && this.fitWorld(), this.fire("locationerror", {
            code: n,
            message: "Geolocation error: " + s + "."
          });
        }
      },
      _handleGeolocationResponse: function(t) {
        if (this._container._leaflet_id) {
          var n = t.coords.latitude, s = t.coords.longitude, c = new St(n, s), y = c.toBounds(t.coords.accuracy * 2), B = this._locateOptions;
          if (B.setView) {
            var G = this.getBoundsZoom(y);
            this.setView(c, B.maxZoom ? Math.min(G, B.maxZoom) : G);
          }
          var rt = {
            latlng: c,
            bounds: y,
            timestamp: t.timestamp
          };
          for (var ht in t.coords)
            typeof t.coords[ht] == "number" && (rt[ht] = t.coords[ht]);
          this.fire("locationfound", rt);
        }
      },
      // TODO Appropriate docs section?
      // @section Other Methods
      // @method addHandler(name: String, HandlerClass: Function): this
      // Adds a new `Handler` to the map, given its name and constructor function.
      addHandler: function(t, n) {
        if (!n)
          return this;
        var s = this[t] = new n(this);
        return this._handlers.push(s), this.options[t] && s.enable(), this;
      },
      // @method remove(): this
      // Destroys the map and clears all related event listeners.
      remove: function() {
        if (this._initEvents(!0), this.options.maxBounds && this.off("moveend", this._panInsideMaxBounds), this._containerId !== this._container._leaflet_id)
          throw new Error("Map container is being reused by another instance");
        try {
          delete this._container._leaflet_id, delete this._containerId;
        } catch {
          this._container._leaflet_id = void 0, this._containerId = void 0;
        }
        this._locationWatchId !== void 0 && this.stopLocate(), this._stop(), Ce(this._mapPane), this._clearControlPos && this._clearControlPos(), this._resizeRequest && (ge(this._resizeRequest), this._resizeRequest = null), this._clearHandlers(), this._loaded && this.fire("unload");
        var t;
        for (t in this._layers)
          this._layers[t].remove();
        for (t in this._panes)
          Ce(this._panes[t]);
        return this._layers = [], this._panes = [], delete this._mapPane, delete this._renderer, this;
      },
      // @section Other Methods
      // @method createPane(name: String, container?: HTMLElement): HTMLElement
      // Creates a new [map pane](#map-pane) with the given name if it doesn't exist already,
      // then returns it. The pane is created as a child of `container`, or
      // as a child of the main map pane if not set.
      createPane: function(t, n) {
        var s = "leaflet-pane" + (t ? " leaflet-" + t.replace("Pane", "") + "-pane" : ""), c = de("div", s, n || this._mapPane);
        return t && (this._panes[t] = c), c;
      },
      // @section Methods for Getting Map State
      // @method getCenter(): LatLng
      // Returns the geographical center of the map view
      getCenter: function() {
        return this._checkIfLoaded(), this._lastCenter && !this._moved() ? this._lastCenter.clone() : this.layerPointToLatLng(this._getCenterLayerPoint());
      },
      // @method getZoom(): Number
      // Returns the current zoom level of the map view
      getZoom: function() {
        return this._zoom;
      },
      // @method getBounds(): LatLngBounds
      // Returns the geographical bounds visible in the current map view
      getBounds: function() {
        var t = this.getPixelBounds(), n = this.unproject(t.getBottomLeft()), s = this.unproject(t.getTopRight());
        return new ue(n, s);
      },
      // @method getMinZoom(): Number
      // Returns the minimum zoom level of the map (if set in the `minZoom` option of the map or of any layers), or `0` by default.
      getMinZoom: function() {
        return this.options.minZoom === void 0 ? this._layersMinZoom || 0 : this.options.minZoom;
      },
      // @method getMaxZoom(): Number
      // Returns the maximum zoom level of the map (if set in the `maxZoom` option of the map or of any layers).
      getMaxZoom: function() {
        return this.options.maxZoom === void 0 ? this._layersMaxZoom === void 0 ? 1 / 0 : this._layersMaxZoom : this.options.maxZoom;
      },
      // @method getBoundsZoom(bounds: LatLngBounds, inside?: Boolean, padding?: Point): Number
      // Returns the maximum zoom level on which the given bounds fit to the map
      // view in its entirety. If `inside` (optional) is set to `true`, the method
      // instead returns the minimum zoom level on which the map view fits into
      // the given bounds in its entirety.
      getBoundsZoom: function(t, n, s) {
        t = jt(t), s = lt(s || [0, 0]);
        var c = this.getZoom() || 0, y = this.getMinZoom(), B = this.getMaxZoom(), G = t.getNorthWest(), rt = t.getSouthEast(), ht = this.getSize().subtract(s), gt = Nt(this.project(rt, c), this.project(G, c)).getSize(), Tt = Gt.any3d ? this.options.zoomSnap : 1, Ht = ht.x / gt.x, se = ht.y / gt.y, Ue = n ? Math.max(Ht, se) : Math.min(Ht, se);
        return c = this.getScaleZoom(Ue, c), Tt && (c = Math.round(c / (Tt / 100)) * (Tt / 100), c = n ? Math.ceil(c / Tt) * Tt : Math.floor(c / Tt) * Tt), Math.max(y, Math.min(B, c));
      },
      // @method getSize(): Point
      // Returns the current size of the map container (in pixels).
      getSize: function() {
        return (!this._size || this._sizeChanged) && (this._size = new Ot(
          this._container.clientWidth || 0,
          this._container.clientHeight || 0
        ), this._sizeChanged = !1), this._size.clone();
      },
      // @method getPixelBounds(): Bounds
      // Returns the bounds of the current map view in projected pixel
      // coordinates (sometimes useful in layer and overlay implementations).
      getPixelBounds: function(t, n) {
        var s = this._getTopLeftPoint(t, n);
        return new Bt(s, s.add(this.getSize()));
      },
      // TODO: Check semantics - isn't the pixel origin the 0,0 coord relative to
      // the map pane? "left point of the map layer" can be confusing, specially
      // since there can be negative offsets.
      // @method getPixelOrigin(): Point
      // Returns the projected pixel coordinates of the top left point of
      // the map layer (useful in custom layer and overlay implementations).
      getPixelOrigin: function() {
        return this._checkIfLoaded(), this._pixelOrigin;
      },
      // @method getPixelWorldBounds(zoom?: Number): Bounds
      // Returns the world's bounds in pixel coordinates for zoom level `zoom`.
      // If `zoom` is omitted, the map's current zoom level is used.
      getPixelWorldBounds: function(t) {
        return this.options.crs.getProjectedBounds(t === void 0 ? this.getZoom() : t);
      },
      // @section Other Methods
      // @method getPane(pane: String|HTMLElement): HTMLElement
      // Returns a [map pane](#map-pane), given its name or its HTML element (its identity).
      getPane: function(t) {
        return typeof t == "string" ? this._panes[t] : t;
      },
      // @method getPanes(): Object
      // Returns a plain object containing the names of all [panes](#map-pane) as keys and
      // the panes as values.
      getPanes: function() {
        return this._panes;
      },
      // @method getContainer: HTMLElement
      // Returns the HTML element that contains the map.
      getContainer: function() {
        return this._container;
      },
      // @section Conversion Methods
      // @method getZoomScale(toZoom: Number, fromZoom: Number): Number
      // Returns the scale factor to be applied to a map transition from zoom level
      // `fromZoom` to `toZoom`. Used internally to help with zoom animations.
      getZoomScale: function(t, n) {
        var s = this.options.crs;
        return n = n === void 0 ? this._zoom : n, s.scale(t) / s.scale(n);
      },
      // @method getScaleZoom(scale: Number, fromZoom: Number): Number
      // Returns the zoom level that the map would end up at, if it is at `fromZoom`
      // level and everything is scaled by a factor of `scale`. Inverse of
      // [`getZoomScale`](#map-getZoomScale).
      getScaleZoom: function(t, n) {
        var s = this.options.crs;
        n = n === void 0 ? this._zoom : n;
        var c = s.zoom(t * s.scale(n));
        return isNaN(c) ? 1 / 0 : c;
      },
      // @method project(latlng: LatLng, zoom: Number): Point
      // Projects a geographical coordinate `LatLng` according to the projection
      // of the map's CRS, then scales it according to `zoom` and the CRS's
      // `Transformation`. The result is pixel coordinate relative to
      // the CRS origin.
      project: function(t, n) {
        return n = n === void 0 ? this._zoom : n, this.options.crs.latLngToPoint(Mt(t), n);
      },
      // @method unproject(point: Point, zoom: Number): LatLng
      // Inverse of [`project`](#map-project).
      unproject: function(t, n) {
        return n = n === void 0 ? this._zoom : n, this.options.crs.pointToLatLng(lt(t), n);
      },
      // @method layerPointToLatLng(point: Point): LatLng
      // Given a pixel coordinate relative to the [origin pixel](#map-getpixelorigin),
      // returns the corresponding geographical coordinate (for the current zoom level).
      layerPointToLatLng: function(t) {
        var n = lt(t).add(this.getPixelOrigin());
        return this.unproject(n);
      },
      // @method latLngToLayerPoint(latlng: LatLng): Point
      // Given a geographical coordinate, returns the corresponding pixel coordinate
      // relative to the [origin pixel](#map-getpixelorigin).
      latLngToLayerPoint: function(t) {
        var n = this.project(Mt(t))._round();
        return n._subtract(this.getPixelOrigin());
      },
      // @method wrapLatLng(latlng: LatLng): LatLng
      // Returns a `LatLng` where `lat` and `lng` has been wrapped according to the
      // map's CRS's `wrapLat` and `wrapLng` properties, if they are outside the
      // CRS's bounds.
      // By default this means longitude is wrapped around the dateline so its
      // value is between -180 and +180 degrees.
      wrapLatLng: function(t) {
        return this.options.crs.wrapLatLng(Mt(t));
      },
      // @method wrapLatLngBounds(bounds: LatLngBounds): LatLngBounds
      // Returns a `LatLngBounds` with the same size as the given one, ensuring that
      // its center is within the CRS's bounds.
      // By default this means the center longitude is wrapped around the dateline so its
      // value is between -180 and +180 degrees, and the majority of the bounds
      // overlaps the CRS's bounds.
      wrapLatLngBounds: function(t) {
        return this.options.crs.wrapLatLngBounds(jt(t));
      },
      // @method distance(latlng1: LatLng, latlng2: LatLng): Number
      // Returns the distance between two geographical coordinates according to
      // the map's CRS. By default this measures distance in meters.
      distance: function(t, n) {
        return this.options.crs.distance(Mt(t), Mt(n));
      },
      // @method containerPointToLayerPoint(point: Point): Point
      // Given a pixel coordinate relative to the map container, returns the corresponding
      // pixel coordinate relative to the [origin pixel](#map-getpixelorigin).
      containerPointToLayerPoint: function(t) {
        return lt(t).subtract(this._getMapPanePos());
      },
      // @method layerPointToContainerPoint(point: Point): Point
      // Given a pixel coordinate relative to the [origin pixel](#map-getpixelorigin),
      // returns the corresponding pixel coordinate relative to the map container.
      layerPointToContainerPoint: function(t) {
        return lt(t).add(this._getMapPanePos());
      },
      // @method containerPointToLatLng(point: Point): LatLng
      // Given a pixel coordinate relative to the map container, returns
      // the corresponding geographical coordinate (for the current zoom level).
      containerPointToLatLng: function(t) {
        var n = this.containerPointToLayerPoint(lt(t));
        return this.layerPointToLatLng(n);
      },
      // @method latLngToContainerPoint(latlng: LatLng): Point
      // Given a geographical coordinate, returns the corresponding pixel coordinate
      // relative to the map container.
      latLngToContainerPoint: function(t) {
        return this.layerPointToContainerPoint(this.latLngToLayerPoint(Mt(t)));
      },
      // @method mouseEventToContainerPoint(ev: MouseEvent): Point
      // Given a MouseEvent object, returns the pixel coordinate relative to the
      // map container where the event took place.
      mouseEventToContainerPoint: function(t) {
        return jn(t, this._container);
      },
      // @method mouseEventToLayerPoint(ev: MouseEvent): Point
      // Given a MouseEvent object, returns the pixel coordinate relative to
      // the [origin pixel](#map-getpixelorigin) where the event took place.
      mouseEventToLayerPoint: function(t) {
        return this.containerPointToLayerPoint(this.mouseEventToContainerPoint(t));
      },
      // @method mouseEventToLatLng(ev: MouseEvent): LatLng
      // Given a MouseEvent object, returns geographical coordinate where the
      // event took place.
      mouseEventToLatLng: function(t) {
        return this.layerPointToLatLng(this.mouseEventToLayerPoint(t));
      },
      // map initialization methods
      _initContainer: function(t) {
        var n = this._container = qa(t);
        if (n) {
          if (n._leaflet_id)
            throw new Error("Map container is already initialized.");
        } else throw new Error("Map container not found.");
        Qt(n, "scroll", this._onScroll, this), this._containerId = x(n);
      },
      _initLayout: function() {
        var t = this._container;
        this._fadeAnimated = this.options.fadeAnimation && Gt.any3d, re(t, "leaflet-container" + (Gt.touch ? " leaflet-touch" : "") + (Gt.retina ? " leaflet-retina" : "") + (Gt.ielt9 ? " leaflet-oldie" : "") + (Gt.safari ? " leaflet-safari" : "") + (this._fadeAnimated ? " leaflet-fade-anim" : ""));
        var n = Vi(t, "position");
        n !== "absolute" && n !== "relative" && n !== "fixed" && n !== "sticky" && (t.style.position = "relative"), this._initPanes(), this._initControlPos && this._initControlPos();
      },
      _initPanes: function() {
        var t = this._panes = {};
        this._paneRenderers = {}, this._mapPane = this.createPane("mapPane", this._container), Ae(this._mapPane, new Ot(0, 0)), this.createPane("tilePane"), this.createPane("overlayPane"), this.createPane("shadowPane"), this.createPane("markerPane"), this.createPane("tooltipPane"), this.createPane("popupPane"), this.options.markerZoomAnimation || (re(t.markerPane, "leaflet-zoom-hide"), re(t.shadowPane, "leaflet-zoom-hide"));
      },
      // private methods that modify map state
      // @section Map state change events
      _resetView: function(t, n, s) {
        Ae(this._mapPane, new Ot(0, 0));
        var c = !this._loaded;
        this._loaded = !0, n = this._limitZoom(n), this.fire("viewprereset");
        var y = this._zoom !== n;
        this._moveStart(y, s)._move(t, n)._moveEnd(y), this.fire("viewreset"), c && this.fire("load");
      },
      _moveStart: function(t, n) {
        return t && this.fire("zoomstart"), n || this.fire("movestart"), this;
      },
      _move: function(t, n, s, c) {
        n === void 0 && (n = this._zoom);
        var y = this._zoom !== n;
        return this._zoom = n, this._lastCenter = t, this._pixelOrigin = this._getNewPixelOrigin(t), c ? s && s.pinch && this.fire("zoom", s) : ((y || s && s.pinch) && this.fire("zoom", s), this.fire("move", s)), this;
      },
      _moveEnd: function(t) {
        return t && this.fire("zoomend"), this.fire("moveend");
      },
      _stop: function() {
        return ge(this._flyToFrame), this._panAnim && this._panAnim.stop(), this;
      },
      _rawPanBy: function(t) {
        Ae(this._mapPane, this._getMapPanePos().subtract(t));
      },
      _getZoomSpan: function() {
        return this.getMaxZoom() - this.getMinZoom();
      },
      _panInsideMaxBounds: function() {
        this._enforcingBounds || this.panInsideBounds(this.options.maxBounds);
      },
      _checkIfLoaded: function() {
        if (!this._loaded)
          throw new Error("Set map center and zoom first.");
      },
      // DOM event handling
      // @section Interaction events
      _initEvents: function(t) {
        this._targets = {}, this._targets[x(this._container)] = this;
        var n = t ? pe : Qt;
        n(this._container, "click dblclick mousedown mouseup mouseover mouseout mousemove contextmenu keypress keydown keyup", this._handleDOMEvent, this), this.options.trackResize && n(window, "resize", this._onResize, this), Gt.any3d && this.options.transform3DLimit && (t ? this.off : this.on).call(this, "moveend", this._onMoveEnd);
      },
      _onResize: function() {
        ge(this._resizeRequest), this._resizeRequest = Wt(
          function() {
            this.invalidateSize({ debounceMoveend: !0 });
          },
          this
        );
      },
      _onScroll: function() {
        this._container.scrollTop = 0, this._container.scrollLeft = 0;
      },
      _onMoveEnd: function() {
        var t = this._getMapPanePos();
        Math.max(Math.abs(t.x), Math.abs(t.y)) >= this.options.transform3DLimit && this._resetView(this.getCenter(), this.getZoom());
      },
      _findEventTargets: function(t, n) {
        for (var s = [], c, y = n === "mouseout" || n === "mouseover", B = t.target || t.srcElement, G = !1; B; ) {
          if (c = this._targets[x(B)], c && (n === "click" || n === "preclick") && this._draggableMoved(c)) {
            G = !0;
            break;
          }
          if (c && c.listens(n, !0) && (y && !or(B, t) || (s.push(c), y)) || B === this._container)
            break;
          B = B.parentNode;
        }
        return !s.length && !G && !y && this.listens(n, !0) && (s = [this]), s;
      },
      _isClickDisabled: function(t) {
        for (; t && t !== this._container; ) {
          if (t._leaflet_disable_click)
            return !0;
          t = t.parentNode;
        }
      },
      _handleDOMEvent: function(t) {
        var n = t.target || t.srcElement;
        if (!(!this._loaded || n._leaflet_disable_events || t.type === "click" && this._isClickDisabled(n))) {
          var s = t.type;
          s === "mousedown" && Ur(n), this._fireDOMEvent(t, s);
        }
      },
      _mouseEvents: ["click", "dblclick", "mouseover", "mouseout", "contextmenu"],
      _fireDOMEvent: function(t, n, s) {
        if (t.type === "click") {
          var c = b({}, t);
          c.type = "preclick", this._fireDOMEvent(c, c.type, s);
        }
        var y = this._findEventTargets(t, n);
        if (s) {
          for (var B = [], G = 0; G < s.length; G++)
            s[G].listens(n, !0) && B.push(s[G]);
          y = B.concat(y);
        }
        if (y.length) {
          n === "contextmenu" && Ie(t);
          var rt = y[0], ht = {
            originalEvent: t
          };
          if (t.type !== "keypress" && t.type !== "keydown" && t.type !== "keyup") {
            var gt = rt.getLatLng && (!rt._radius || rt._radius <= 10);
            ht.containerPoint = gt ? this.latLngToContainerPoint(rt.getLatLng()) : this.mouseEventToContainerPoint(t), ht.layerPoint = this.containerPointToLayerPoint(ht.containerPoint), ht.latlng = gt ? rt.getLatLng() : this.layerPointToLatLng(ht.layerPoint);
          }
          for (G = 0; G < y.length; G++)
            if (y[G].fire(n, ht, !0), ht.originalEvent._stopped || y[G].options.bubblingMouseEvents === !1 && zt(this._mouseEvents, n) !== -1)
              return;
        }
      },
      _draggableMoved: function(t) {
        return t = t.dragging && t.dragging.enabled() ? t : this, t.dragging && t.dragging.moved() || this.boxZoom && this.boxZoom.moved();
      },
      _clearHandlers: function() {
        for (var t = 0, n = this._handlers.length; t < n; t++)
          this._handlers[t].disable();
      },
      // @section Other Methods
      // @method whenReady(fn: Function, context?: Object): this
      // Runs the given function `fn` when the map gets initialized with
      // a view (center and zoom) and at least one layer, or immediately
      // if it's already initialized, optionally passing a function context.
      whenReady: function(t, n) {
        return this._loaded ? t.call(n || this, { target: this }) : this.on("load", t, n), this;
      },
      // private methods for getting map state
      _getMapPanePos: function() {
        return $i(this._mapPane) || new Ot(0, 0);
      },
      _moved: function() {
        var t = this._getMapPanePos();
        return t && !t.equals([0, 0]);
      },
      _getTopLeftPoint: function(t, n) {
        var s = t && n !== void 0 ? this._getNewPixelOrigin(t, n) : this.getPixelOrigin();
        return s.subtract(this._getMapPanePos());
      },
      _getNewPixelOrigin: function(t, n) {
        var s = this.getSize()._divideBy(2);
        return this.project(t, n)._subtract(s)._add(this._getMapPanePos())._round();
      },
      _latLngToNewLayerPoint: function(t, n, s) {
        var c = this._getNewPixelOrigin(s, n);
        return this.project(t, n)._subtract(c);
      },
      _latLngBoundsToNewLayerBounds: function(t, n, s) {
        var c = this._getNewPixelOrigin(s, n);
        return Nt([
          this.project(t.getSouthWest(), n)._subtract(c),
          this.project(t.getNorthWest(), n)._subtract(c),
          this.project(t.getSouthEast(), n)._subtract(c),
          this.project(t.getNorthEast(), n)._subtract(c)
        ]);
      },
      // layer point of the current center
      _getCenterLayerPoint: function() {
        return this.containerPointToLayerPoint(this.getSize()._divideBy(2));
      },
      // offset of the specified place to the current center in pixels
      _getCenterOffset: function(t) {
        return this.latLngToLayerPoint(t).subtract(this._getCenterLayerPoint());
      },
      // adjust center for view to get inside bounds
      _limitCenter: function(t, n, s) {
        if (!s)
          return t;
        var c = this.project(t, n), y = this.getSize().divideBy(2), B = new Bt(c.subtract(y), c.add(y)), G = this._getBoundsOffset(B, s, n);
        return Math.abs(G.x) <= 1 && Math.abs(G.y) <= 1 ? t : this.unproject(c.add(G), n);
      },
      // adjust offset for view to get inside bounds
      _limitOffset: function(t, n) {
        if (!n)
          return t;
        var s = this.getPixelBounds(), c = new Bt(s.min.add(t), s.max.add(t));
        return t.add(this._getBoundsOffset(c, n));
      },
      // returns offset needed for pxBounds to get inside maxBounds at a specified zoom
      _getBoundsOffset: function(t, n, s) {
        var c = Nt(
          this.project(n.getNorthEast(), s),
          this.project(n.getSouthWest(), s)
        ), y = c.min.subtract(t.min), B = c.max.subtract(t.max), G = this._rebound(y.x, -B.x), rt = this._rebound(y.y, -B.y);
        return new Ot(G, rt);
      },
      _rebound: function(t, n) {
        return t + n > 0 ? Math.round(t - n) / 2 : Math.max(0, Math.ceil(t)) - Math.max(0, Math.floor(n));
      },
      _limitZoom: function(t) {
        var n = this.getMinZoom(), s = this.getMaxZoom(), c = Gt.any3d ? this.options.zoomSnap : 1;
        return c && (t = Math.round(t / c) * c), Math.max(n, Math.min(s, t));
      },
      _onPanTransitionStep: function() {
        this.fire("move");
      },
      _onPanTransitionEnd: function() {
        Me(this._mapPane, "leaflet-pan-anim"), this.fire("moveend");
      },
      _tryAnimatedPan: function(t, n) {
        var s = this._getCenterOffset(t)._trunc();
        return (n && n.animate) !== !0 && !this.getSize().contains(s) ? !1 : (this.panBy(s, n), !0);
      },
      _createAnimProxy: function() {
        var t = this._proxy = de("div", "leaflet-proxy leaflet-zoom-animated");
        this._panes.mapPane.appendChild(t), this.on("zoomanim", function(n) {
          var s = Fr, c = this._proxy.style[s];
          tn(this._proxy, this.project(n.center, n.zoom), this.getZoomScale(n.zoom, 1)), c === this._proxy.style[s] && this._animatingZoom && this._onZoomTransitionEnd();
        }, this), this.on("load moveend", this._animMoveEnd, this), this._on("unload", this._destroyAnimProxy, this);
      },
      _destroyAnimProxy: function() {
        Ce(this._proxy), this.off("load moveend", this._animMoveEnd, this), delete this._proxy;
      },
      _animMoveEnd: function() {
        var t = this.getCenter(), n = this.getZoom();
        tn(this._proxy, this.project(t, n), this.getZoomScale(n, 1));
      },
      _catchTransitionEnd: function(t) {
        this._animatingZoom && t.propertyName.indexOf("transform") >= 0 && this._onZoomTransitionEnd();
      },
      _nothingToAnimate: function() {
        return !this._container.getElementsByClassName("leaflet-zoom-animated").length;
      },
      _tryAnimatedZoom: function(t, n, s) {
        if (this._animatingZoom)
          return !0;
        if (s = s || {}, !this._zoomAnimated || s.animate === !1 || this._nothingToAnimate() || Math.abs(n - this._zoom) > this.options.zoomAnimationThreshold)
          return !1;
        var c = this.getZoomScale(n), y = this._getCenterOffset(t)._divideBy(1 - 1 / c);
        return s.animate !== !0 && !this.getSize().contains(y) ? !1 : (Wt(function() {
          this._moveStart(!0, s.noMoveStart || !1)._animateZoom(t, n, !0);
        }, this), !0);
      },
      _animateZoom: function(t, n, s, c) {
        this._mapPane && (s && (this._animatingZoom = !0, this._animateToCenter = t, this._animateToZoom = n, re(this._mapPane, "leaflet-zoom-anim")), this.fire("zoomanim", {
          center: t,
          zoom: n,
          noUpdate: c
        }), this._tempFireZoomEvent || (this._tempFireZoomEvent = this._zoom !== this._animateToZoom), this._move(this._animateToCenter, this._animateToZoom, void 0, !0), setTimeout(w(this._onZoomTransitionEnd, this), 250));
      },
      _onZoomTransitionEnd: function() {
        this._animatingZoom && (this._mapPane && Me(this._mapPane, "leaflet-zoom-anim"), this._animatingZoom = !1, this._move(this._animateToCenter, this._animateToZoom, void 0, !0), this._tempFireZoomEvent && this.fire("zoom"), delete this._tempFireZoomEvent, this.fire("move"), this._moveEnd(!0));
      }
    });
    function lr(t, n) {
      return new le(t, n);
    }
    var di = kt.extend({
      // @section
      // @aka Control Options
      options: {
        // @option position: String = 'topright'
        // The position of the control (one of the map corners). Possible values are `'topleft'`,
        // `'topright'`, `'bottomleft'` or `'bottomright'`
        position: "topright"
      },
      initialize: function(t) {
        tt(this, t);
      },
      /* @section
       * Classes extending L.Control will inherit the following methods:
       *
       * @method getPosition: string
       * Returns the position of the control.
       */
      getPosition: function() {
        return this.options.position;
      },
      // @method setPosition(position: string): this
      // Sets the position of the control.
      setPosition: function(t) {
        var n = this._map;
        return n && n.removeControl(this), this.options.position = t, n && n.addControl(this), this;
      },
      // @method getContainer: HTMLElement
      // Returns the HTMLElement that contains the control.
      getContainer: function() {
        return this._container;
      },
      // @method addTo(map: Map): this
      // Adds the control to the given map.
      addTo: function(t) {
        this.remove(), this._map = t;
        var n = this._container = this.onAdd(t), s = this.getPosition(), c = t._controlCorners[s];
        return re(n, "leaflet-control"), s.indexOf("bottom") !== -1 ? c.insertBefore(n, c.firstChild) : c.appendChild(n), this._map.on("unload", this.remove, this), this;
      },
      // @method remove: this
      // Removes the control from the map it is currently active on.
      remove: function() {
        return this._map ? (Ce(this._container), this.onRemove && this.onRemove(this._map), this._map.off("unload", this.remove, this), this._map = null, this) : this;
      },
      _refocusOnMap: function(t) {
        this._map && t && t.screenX > 0 && t.screenY > 0 && this._map.getContainer().focus();
      }
    }), vn = function(t) {
      return new di(t);
    };
    le.include({
      // @method addControl(control: Control): this
      // Adds the given control to the map
      addControl: function(t) {
        return t.addTo(this), this;
      },
      // @method removeControl(control: Control): this
      // Removes the given control from the map
      removeControl: function(t) {
        return t.remove(), this;
      },
      _initControlPos: function() {
        var t = this._controlCorners = {}, n = "leaflet-", s = this._controlContainer = de("div", n + "control-container", this._container);
        function c(y, B) {
          var G = n + y + " " + n + B;
          t[y + B] = de("div", G, s);
        }
        c("top", "left"), c("top", "right"), c("bottom", "left"), c("bottom", "right");
      },
      _clearControlPos: function() {
        for (var t in this._controlCorners)
          Ce(this._controlCorners[t]);
        Ce(this._controlContainer), delete this._controlCorners, delete this._controlContainer;
      }
    });
    var Ya = di.extend({
      // @section
      // @aka Control.Layers options
      options: {
        // @option collapsed: Boolean = true
        // If `true`, the control will be collapsed into an icon and expanded on mouse hover, touch, or keyboard activation.
        collapsed: !0,
        position: "topright",
        // @option autoZIndex: Boolean = true
        // If `true`, the control will assign zIndexes in increasing order to all of its layers so that the order is preserved when switching them on/off.
        autoZIndex: !0,
        // @option hideSingleBase: Boolean = false
        // If `true`, the base layers in the control will be hidden when there is only one.
        hideSingleBase: !1,
        // @option sortLayers: Boolean = false
        // Whether to sort the layers. When `false`, layers will keep the order
        // in which they were added to the control.
        sortLayers: !1,
        // @option sortFunction: Function = *
        // A [compare function](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array/sort)
        // that will be used for sorting the layers, when `sortLayers` is `true`.
        // The function receives both the `L.Layer` instances and their names, as in
        // `sortFunction(layerA, layerB, nameA, nameB)`.
        // By default, it sorts layers alphabetically by their name.
        sortFunction: function(t, n, s, c) {
          return s < c ? -1 : c < s ? 1 : 0;
        }
      },
      initialize: function(t, n, s) {
        tt(this, s), this._layerControlInputs = [], this._layers = [], this._lastZIndex = 0, this._handlingClick = !1, this._preventClick = !1;
        for (var c in t)
          this._addLayer(t[c], c);
        for (c in n)
          this._addLayer(n[c], c, !0);
      },
      onAdd: function(t) {
        this._initLayout(), this._update(), this._map = t, t.on("zoomend", this._checkDisabledLayers, this);
        for (var n = 0; n < this._layers.length; n++)
          this._layers[n].layer.on("add remove", this._onLayerChange, this);
        return this._container;
      },
      addTo: function(t) {
        return di.prototype.addTo.call(this, t), this._expandIfNotCollapsed();
      },
      onRemove: function() {
        this._map.off("zoomend", this._checkDisabledLayers, this);
        for (var t = 0; t < this._layers.length; t++)
          this._layers[t].layer.off("add remove", this._onLayerChange, this);
      },
      // @method addBaseLayer(layer: Layer, name: String): this
      // Adds a base layer (radio button entry) with the given name to the control.
      addBaseLayer: function(t, n) {
        return this._addLayer(t, n), this._map ? this._update() : this;
      },
      // @method addOverlay(layer: Layer, name: String): this
      // Adds an overlay (checkbox entry) with the given name to the control.
      addOverlay: function(t, n) {
        return this._addLayer(t, n, !0), this._map ? this._update() : this;
      },
      // @method removeLayer(layer: Layer): this
      // Remove the given layer from the control.
      removeLayer: function(t) {
        t.off("add remove", this._onLayerChange, this);
        var n = this._getLayer(x(t));
        return n && this._layers.splice(this._layers.indexOf(n), 1), this._map ? this._update() : this;
      },
      // @method expand(): this
      // Expand the control container if collapsed.
      expand: function() {
        re(this._container, "leaflet-control-layers-expanded"), this._section.style.height = null;
        var t = this._map.getSize().y - (this._container.offsetTop + 50);
        return t < this._section.clientHeight ? (re(this._section, "leaflet-control-layers-scrollbar"), this._section.style.height = t + "px") : Me(this._section, "leaflet-control-layers-scrollbar"), this._checkDisabledLayers(), this;
      },
      // @method collapse(): this
      // Collapse the control container if expanded.
      collapse: function() {
        return Me(this._container, "leaflet-control-layers-expanded"), this;
      },
      _initLayout: function() {
        var t = "leaflet-control-layers", n = this._container = de("div", t), s = this.options.collapsed;
        n.setAttribute("aria-haspopup", !0), Nn(n), Kr(n);
        var c = this._section = de("section", t + "-list");
        s && (this._map.on("click", this.collapse, this), Qt(n, {
          mouseenter: this._expandSafely,
          mouseleave: this.collapse
        }, this));
        var y = this._layersLink = de("a", t + "-toggle", n);
        y.href = "#", y.title = "Layers", y.setAttribute("role", "button"), Qt(y, {
          keydown: function(B) {
            B.keyCode === 13 && this._expandSafely();
          },
          // Certain screen readers intercept the key event and instead send a click event
          click: function(B) {
            Ie(B), this._expandSafely();
          }
        }, this), s || this.expand(), this._baseLayersList = de("div", t + "-base", c), this._separator = de("div", t + "-separator", c), this._overlaysList = de("div", t + "-overlays", c), n.appendChild(c);
      },
      _getLayer: function(t) {
        for (var n = 0; n < this._layers.length; n++)
          if (this._layers[n] && x(this._layers[n].layer) === t)
            return this._layers[n];
      },
      _addLayer: function(t, n, s) {
        this._map && t.on("add remove", this._onLayerChange, this), this._layers.push({
          layer: t,
          name: n,
          overlay: s
        }), this.options.sortLayers && this._layers.sort(w(function(c, y) {
          return this.options.sortFunction(c.layer, y.layer, c.name, y.name);
        }, this)), this.options.autoZIndex && t.setZIndex && (this._lastZIndex++, t.setZIndex(this._lastZIndex)), this._expandIfNotCollapsed();
      },
      _update: function() {
        if (!this._container)
          return this;
        In(this._baseLayersList), In(this._overlaysList), this._layerControlInputs = [];
        var t, n, s, c, y = 0;
        for (s = 0; s < this._layers.length; s++)
          c = this._layers[s], this._addItem(c), n = n || c.overlay, t = t || !c.overlay, y += c.overlay ? 0 : 1;
        return this.options.hideSingleBase && (t = t && y > 1, this._baseLayersList.style.display = t ? "" : "none"), this._separator.style.display = n && t ? "" : "none", this;
      },
      _onLayerChange: function(t) {
        this._handlingClick || this._update();
        var n = this._getLayer(x(t.target)), s = n.overlay ? t.type === "add" ? "overlayadd" : "overlayremove" : t.type === "add" ? "baselayerchange" : null;
        s && this._map.fire(s, n);
      },
      // IE7 bugs out if you create a radio dynamically, so you have to do it this hacky way (see https://stackoverflow.com/a/119079)
      _createRadioElement: function(t, n) {
        var s = '<input type="radio" class="leaflet-control-layers-selector" name="' + t + '"' + (n ? ' checked="checked"' : "") + "/>", c = document.createElement("div");
        return c.innerHTML = s, c.firstChild;
      },
      _addItem: function(t) {
        var n = document.createElement("label"), s = this._map.hasLayer(t.layer), c;
        t.overlay ? (c = document.createElement("input"), c.type = "checkbox", c.className = "leaflet-control-layers-selector", c.defaultChecked = s) : c = this._createRadioElement("leaflet-base-layers_" + x(this), s), this._layerControlInputs.push(c), c.layerId = x(t.layer), Qt(c, "click", this._onInputClick, this);
        var y = document.createElement("span");
        y.innerHTML = " " + t.name;
        var B = document.createElement("span");
        n.appendChild(B), B.appendChild(c), B.appendChild(y);
        var G = t.overlay ? this._overlaysList : this._baseLayersList;
        return G.appendChild(n), this._checkDisabledLayers(), n;
      },
      _onInputClick: function() {
        if (!this._preventClick) {
          var t = this._layerControlInputs, n, s, c = [], y = [];
          this._handlingClick = !0;
          for (var B = t.length - 1; B >= 0; B--)
            n = t[B], s = this._getLayer(n.layerId).layer, n.checked ? c.push(s) : n.checked || y.push(s);
          for (B = 0; B < y.length; B++)
            this._map.hasLayer(y[B]) && this._map.removeLayer(y[B]);
          for (B = 0; B < c.length; B++)
            this._map.hasLayer(c[B]) || this._map.addLayer(c[B]);
          this._handlingClick = !1, this._refocusOnMap();
        }
      },
      _checkDisabledLayers: function() {
        for (var t = this._layerControlInputs, n, s, c = this._map.getZoom(), y = t.length - 1; y >= 0; y--)
          n = t[y], s = this._getLayer(n.layerId).layer, n.disabled = s.options.minZoom !== void 0 && c < s.options.minZoom || s.options.maxZoom !== void 0 && c > s.options.maxZoom;
      },
      _expandIfNotCollapsed: function() {
        return this._map && !this.options.collapsed && this.expand(), this;
      },
      _expandSafely: function() {
        var t = this._section;
        this._preventClick = !0, Qt(t, "click", Ie), this.expand();
        var n = this;
        setTimeout(function() {
          pe(t, "click", Ie), n._preventClick = !1;
        });
      }
    }), Wr = function(t, n, s) {
      return new Ya(t, n, s);
    }, bn = di.extend({
      // @section
      // @aka Control.Zoom options
      options: {
        position: "topleft",
        // @option zoomInText: String = '<span aria-hidden="true">+</span>'
        // The text set on the 'zoom in' button.
        zoomInText: '<span aria-hidden="true">+</span>',
        // @option zoomInTitle: String = 'Zoom in'
        // The title set on the 'zoom in' button.
        zoomInTitle: "Zoom in",
        // @option zoomOutText: String = '<span aria-hidden="true">&#x2212;</span>'
        // The text set on the 'zoom out' button.
        zoomOutText: '<span aria-hidden="true">&#x2212;</span>',
        // @option zoomOutTitle: String = 'Zoom out'
        // The title set on the 'zoom out' button.
        zoomOutTitle: "Zoom out"
      },
      onAdd: function(t) {
        var n = "leaflet-control-zoom", s = de("div", n + " leaflet-bar"), c = this.options;
        return this._zoomInButton = this._createButton(
          c.zoomInText,
          c.zoomInTitle,
          n + "-in",
          s,
          this._zoomIn
        ), this._zoomOutButton = this._createButton(
          c.zoomOutText,
          c.zoomOutTitle,
          n + "-out",
          s,
          this._zoomOut
        ), this._updateDisabled(), t.on("zoomend zoomlevelschange", this._updateDisabled, this), s;
      },
      onRemove: function(t) {
        t.off("zoomend zoomlevelschange", this._updateDisabled, this);
      },
      disable: function() {
        return this._disabled = !0, this._updateDisabled(), this;
      },
      enable: function() {
        return this._disabled = !1, this._updateDisabled(), this;
      },
      _zoomIn: function(t) {
        !this._disabled && this._map._zoom < this._map.getMaxZoom() && this._map.zoomIn(this._map.options.zoomDelta * (t.shiftKey ? 3 : 1));
      },
      _zoomOut: function(t) {
        !this._disabled && this._map._zoom > this._map.getMinZoom() && this._map.zoomOut(this._map.options.zoomDelta * (t.shiftKey ? 3 : 1));
      },
      _createButton: function(t, n, s, c, y) {
        var B = de("a", s, c);
        return B.innerHTML = t, B.href = "#", B.title = n, B.setAttribute("role", "button"), B.setAttribute("aria-label", n), Nn(B), Qt(B, "click", nn), Qt(B, "click", y, this), Qt(B, "click", this._refocusOnMap, this), B;
      },
      _updateDisabled: function() {
        var t = this._map, n = "leaflet-disabled";
        Me(this._zoomInButton, n), Me(this._zoomOutButton, n), this._zoomInButton.setAttribute("aria-disabled", "false"), this._zoomOutButton.setAttribute("aria-disabled", "false"), (this._disabled || t._zoom === t.getMinZoom()) && (re(this._zoomOutButton, n), this._zoomOutButton.setAttribute("aria-disabled", "true")), (this._disabled || t._zoom === t.getMaxZoom()) && (re(this._zoomInButton, n), this._zoomInButton.setAttribute("aria-disabled", "true"));
      }
    });
    le.mergeOptions({
      zoomControl: !0
    }), le.addInitHook(function() {
      this.options.zoomControl && (this.zoomControl = new bn(), this.addControl(this.zoomControl));
    });
    var _o = function(t) {
      return new bn(t);
    }, Ai = di.extend({
      // @section
      // @aka Control.Scale options
      options: {
        position: "bottomleft",
        // @option maxWidth: Number = 100
        // Maximum width of the control in pixels. The width is set dynamically to show round values (e.g. 100, 200, 500).
        maxWidth: 100,
        // @option metric: Boolean = True
        // Whether to show the metric scale line (m/km).
        metric: !0,
        // @option imperial: Boolean = True
        // Whether to show the imperial scale line (mi/ft).
        imperial: !0
        // @option updateWhenIdle: Boolean = false
        // If `true`, the control is updated on [`moveend`](#map-moveend), otherwise it's always up-to-date (updated on [`move`](#map-move)).
      },
      onAdd: function(t) {
        var n = "leaflet-control-scale", s = de("div", n), c = this.options;
        return this._addScales(c, n + "-line", s), t.on(c.updateWhenIdle ? "moveend" : "move", this._update, this), t.whenReady(this._update, this), s;
      },
      onRemove: function(t) {
        t.off(this.options.updateWhenIdle ? "moveend" : "move", this._update, this);
      },
      _addScales: function(t, n, s) {
        t.metric && (this._mScale = de("div", n, s)), t.imperial && (this._iScale = de("div", n, s));
      },
      _update: function() {
        var t = this._map, n = t.getSize().y / 2, s = t.distance(
          t.containerPointToLatLng([0, n]),
          t.containerPointToLatLng([this.options.maxWidth, n])
        );
        this._updateScales(s);
      },
      _updateScales: function(t) {
        this.options.metric && t && this._updateMetric(t), this.options.imperial && t && this._updateImperial(t);
      },
      _updateMetric: function(t) {
        var n = this._getRoundNum(t), s = n < 1e3 ? n + " m" : n / 1e3 + " km";
        this._updateScale(this._mScale, s, n / t);
      },
      _updateImperial: function(t) {
        var n = t * 3.2808399, s, c, y;
        n > 5280 ? (s = n / 5280, c = this._getRoundNum(s), this._updateScale(this._iScale, c + " mi", c / s)) : (y = this._getRoundNum(n), this._updateScale(this._iScale, y + " ft", y / n));
      },
      _updateScale: function(t, n, s) {
        t.style.width = Math.round(this.options.maxWidth * s) + "px", t.innerHTML = n;
      },
      _getRoundNum: function(t) {
        var n = Math.pow(10, (Math.floor(t) + "").length - 1), s = t / n;
        return s = s >= 10 ? 10 : s >= 5 ? 5 : s >= 3 ? 3 : s >= 2 ? 2 : 1, n * s;
      }
    }), Qa = function(t) {
      return new Ai(t);
    }, xn = '<svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="12" height="8" viewBox="0 0 12 8" class="leaflet-attribution-flag"><path fill="#4C7BE1" d="M0 0h12v4H0z"/><path fill="#FFD500" d="M0 4h12v3H0z"/><path fill="#E0BC00" d="M0 7h12v1H0z"/></svg>', Jr = di.extend({
      // @section
      // @aka Control.Attribution options
      options: {
        position: "bottomright",
        // @option prefix: String|false = 'Leaflet'
        // The HTML text shown before the attributions. Pass `false` to disable.
        prefix: '<a href="https://leafletjs.com" title="A JavaScript library for interactive maps">' + (Gt.inlineSvg ? xn + " " : "") + "Leaflet</a>"
      },
      initialize: function(t) {
        tt(this, t), this._attributions = {};
      },
      onAdd: function(t) {
        t.attributionControl = this, this._container = de("div", "leaflet-control-attribution"), Nn(this._container);
        for (var n in t._layers)
          t._layers[n].getAttribution && this.addAttribution(t._layers[n].getAttribution());
        return this._update(), t.on("layeradd", this._addAttribution, this), this._container;
      },
      onRemove: function(t) {
        t.off("layeradd", this._addAttribution, this);
      },
      _addAttribution: function(t) {
        t.layer.getAttribution && (this.addAttribution(t.layer.getAttribution()), t.layer.once("remove", function() {
          this.removeAttribution(t.layer.getAttribution());
        }, this));
      },
      // @method setPrefix(prefix: String|false): this
      // The HTML text shown before the attributions. Pass `false` to disable.
      setPrefix: function(t) {
        return this.options.prefix = t, this._update(), this;
      },
      // @method addAttribution(text: String): this
      // Adds an attribution text (e.g. `'&copy; OpenStreetMap contributors'`).
      addAttribution: function(t) {
        return t ? (this._attributions[t] || (this._attributions[t] = 0), this._attributions[t]++, this._update(), this) : this;
      },
      // @method removeAttribution(text: String): this
      // Removes an attribution text.
      removeAttribution: function(t) {
        return t ? (this._attributions[t] && (this._attributions[t]--, this._update()), this) : this;
      },
      _update: function() {
        if (this._map) {
          var t = [];
          for (var n in this._attributions)
            this._attributions[n] && t.push(n);
          var s = [];
          this.options.prefix && s.push(this.options.prefix), t.length && s.push(t.join(", ")), this._container.innerHTML = s.join(' <span aria-hidden="true">|</span> ');
        }
      }
    });
    le.mergeOptions({
      attributionControl: !0
    }), le.addInitHook(function() {
      this.options.attributionControl && new Jr().addTo(this);
    });
    var yo = function(t) {
      return new Jr(t);
    };
    di.Layers = Ya, di.Zoom = bn, di.Scale = Ai, di.Attribution = Jr, vn.layers = Wr, vn.zoom = _o, vn.scale = Qa, vn.attribution = yo;
    var yi = kt.extend({
      initialize: function(t) {
        this._map = t;
      },
      // @method enable(): this
      // Enables the handler
      enable: function() {
        return this._enabled ? this : (this._enabled = !0, this.addHooks(), this);
      },
      // @method disable(): this
      // Disables the handler
      disable: function() {
        return this._enabled ? (this._enabled = !1, this.removeHooks(), this) : this;
      },
      // @method enabled(): Boolean
      // Returns `true` if the handler is enabled
      enabled: function() {
        return !!this._enabled;
      }
      // @section Extension methods
      // Classes inheriting from `Handler` must implement the two following methods:
      // @method addHooks()
      // Called when the handler is enabled, should add event hooks.
      // @method removeHooks()
      // Called when the handler is disabled, should remove the event hooks added previously.
    });
    yi.addTo = function(t, n) {
      return t.addHandler(n, this), this;
    };
    var vo = { Events: ie }, ts = Gt.touch ? "touchstart mousedown" : "mousedown", Ui = we.extend({
      options: {
        // @section
        // @aka Draggable options
        // @option clickTolerance: Number = 3
        // The max number of pixels a user can shift the mouse pointer during a click
        // for it to be considered a valid click (as opposed to a mouse drag).
        clickTolerance: 3
      },
      // @constructor L.Draggable(el: HTMLElement, dragHandle?: HTMLElement, preventOutline?: Boolean, options?: Draggable options)
      // Creates a `Draggable` object for moving `el` when you start dragging the `dragHandle` element (equals `el` itself by default).
      initialize: function(t, n, s, c) {
        tt(this, c), this._element = t, this._dragStartTarget = n || t, this._preventOutline = s;
      },
      // @method enable()
      // Enables the dragging ability
      enable: function() {
        this._enabled || (Qt(this._dragStartTarget, ts, this._onDown, this), this._enabled = !0);
      },
      // @method disable()
      // Disables the dragging ability
      disable: function() {
        this._enabled && (Ui._dragging === this && this.finishDrag(!0), pe(this._dragStartTarget, ts, this._onDown, this), this._enabled = !1, this._moved = !1);
      },
      _onDown: function(t) {
        if (this._enabled && (this._moved = !1, !Rr(this._element, "leaflet-zoom-anim"))) {
          if (t.touches && t.touches.length !== 1) {
            Ui._dragging === this && this.finishDrag();
            return;
          }
          if (!(Ui._dragging || t.shiftKey || t.which !== 1 && t.button !== 1 && !t.touches) && (Ui._dragging = this, this._preventOutline && Ur(this._element), jr(), Fn(), !this._moving)) {
            this.fire("down");
            var n = t.touches ? t.touches[0] : t, s = Ha(this._element);
            this._startPoint = new Ot(n.clientX, n.clientY), this._startPos = $i(this._element), this._parentScale = Gr(s);
            var c = t.type === "mousedown";
            Qt(document, c ? "mousemove" : "touchmove", this._onMove, this), Qt(document, c ? "mouseup" : "touchend touchcancel", this._onUp, this);
          }
        }
      },
      _onMove: function(t) {
        if (this._enabled) {
          if (t.touches && t.touches.length > 1) {
            this._moved = !0;
            return;
          }
          var n = t.touches && t.touches.length === 1 ? t.touches[0] : t, s = new Ot(n.clientX, n.clientY)._subtract(this._startPoint);
          !s.x && !s.y || Math.abs(s.x) + Math.abs(s.y) < this.options.clickTolerance || (s.x /= this._parentScale.x, s.y /= this._parentScale.y, Ie(t), this._moved || (this.fire("dragstart"), this._moved = !0, re(document.body, "leaflet-dragging"), this._lastTarget = t.target || t.srcElement, window.SVGElementInstance && this._lastTarget instanceof window.SVGElementInstance && (this._lastTarget = this._lastTarget.correspondingUseElement), re(this._lastTarget, "leaflet-drag-target")), this._newPos = this._startPos.add(s), this._moving = !0, this._lastEvent = t, this._updatePosition());
        }
      },
      _updatePosition: function() {
        var t = { originalEvent: this._lastEvent };
        this.fire("predrag", t), Ae(this._element, this._newPos), this.fire("drag", t);
      },
      _onUp: function() {
        this._enabled && this.finishDrag();
      },
      finishDrag: function(t) {
        Me(document.body, "leaflet-dragging"), this._lastTarget && (Me(this._lastTarget, "leaflet-drag-target"), this._lastTarget = null), pe(document, "mousemove touchmove", this._onMove, this), pe(document, "mouseup touchend touchcancel", this._onUp, this), Vr(), Rn();
        var n = this._moved && this._moving;
        this._moving = !1, Ui._dragging = !1, n && this.fire("dragend", {
          noInertia: t,
          distance: this._newPos.distanceTo(this._startPos)
        });
      }
    });
    function es(t, n, s) {
      var c, y = [1, 4, 2, 8], B, G, rt, ht, gt, Tt, Ht, se;
      for (B = 0, Tt = t.length; B < Tt; B++)
        t[B]._code = Gi(t[B], n);
      for (rt = 0; rt < 4; rt++) {
        for (Ht = y[rt], c = [], B = 0, Tt = t.length, G = Tt - 1; B < Tt; G = B++)
          ht = t[B], gt = t[G], ht._code & Ht ? gt._code & Ht || (se = ur(gt, ht, Ht, n, s), se._code = Gi(se, n), c.push(se)) : (gt._code & Ht && (se = ur(gt, ht, Ht, n, s), se._code = Gi(se, n), c.push(se)), c.push(ht));
        t = c;
      }
      return t;
    }
    function is(t, n) {
      var s, c, y, B, G, rt, ht, gt, Tt;
      if (!t || t.length === 0)
        throw new Error("latlngs not passed");
      si(t) || (console.warn("latlngs are not flat! Only the first ring will be used"), t = t[0]);
      var Ht = Mt([0, 0]), se = jt(t), Ue = se.getNorthWest().distanceTo(se.getSouthWest()) * se.getNorthEast().distanceTo(se.getNorthWest());
      Ue < 1700 && (Ht = Xr(t));
      var Oe = t.length, ui = [];
      for (s = 0; s < Oe; s++) {
        var We = Mt(t[s]);
        ui.push(n.project(Mt([We.lat - Ht.lat, We.lng - Ht.lng])));
      }
      for (rt = ht = gt = 0, s = 0, c = Oe - 1; s < Oe; c = s++)
        y = ui[s], B = ui[c], G = y.y * B.x - B.y * y.x, ht += (y.x + B.x) * G, gt += (y.y + B.y) * G, rt += G * 3;
      rt === 0 ? Tt = ui[0] : Tt = [ht / rt, gt / rt];
      var Hi = n.unproject(lt(Tt));
      return Mt([Hi.lat + Ht.lat, Hi.lng + Ht.lng]);
    }
    function Xr(t) {
      for (var n = 0, s = 0, c = 0, y = 0; y < t.length; y++) {
        var B = Mt(t[y]);
        n += B.lat, s += B.lng, c++;
      }
      return Mt([n / c, s / c]);
    }
    var ns = {
      __proto__: null,
      clipPolygon: es,
      polygonCenter: is,
      centroid: Xr
    };
    function rs(t, n) {
      if (!n || !t.length)
        return t.slice();
      var s = n * n;
      return t = wn(t, s), t = bo(t, s), t;
    }
    function De(t, n, s) {
      return Math.sqrt(kn(t, n, s, !0));
    }
    function ei(t, n, s) {
      return kn(t, n, s);
    }
    function bo(t, n) {
      var s = t.length, c = typeof Uint8Array < "u" ? Uint8Array : Array, y = new c(s);
      y[0] = y[s - 1] = 1, vi(t, y, n, 0, s - 1);
      var B, G = [];
      for (B = 0; B < s; B++)
        y[B] && G.push(t[B]);
      return G;
    }
    function vi(t, n, s, c, y) {
      var B = 0, G, rt, ht;
      for (rt = c + 1; rt <= y - 1; rt++)
        ht = kn(t[rt], t[c], t[y], !0), ht > B && (G = rt, B = ht);
      B > s && (n[G] = 1, vi(t, n, s, c, G), vi(t, n, s, G, y));
    }
    function wn(t, n) {
      for (var s = [t[0]], c = 1, y = 0, B = t.length; c < B; c++)
        Ln(t[c], t[y]) > n && (s.push(t[c]), y = c);
      return y < B - 1 && s.push(t[B - 1]), s;
    }
    var Vn;
    function ai(t, n, s, c, y) {
      var B = c ? Vn : Gi(t, s), G = Gi(n, s), rt, ht, gt;
      for (Vn = G; ; ) {
        if (!(B | G))
          return [t, n];
        if (B & G)
          return !1;
        rt = B || G, ht = ur(t, n, rt, s, y), gt = Gi(ht, s), rt === B ? (t = ht, B = gt) : (n = ht, G = gt);
      }
    }
    function ur(t, n, s, c, y) {
      var B = n.x - t.x, G = n.y - t.y, rt = c.min, ht = c.max, gt, Tt;
      return s & 8 ? (gt = t.x + B * (ht.y - t.y) / G, Tt = ht.y) : s & 4 ? (gt = t.x + B * (rt.y - t.y) / G, Tt = rt.y) : s & 2 ? (gt = ht.x, Tt = t.y + G * (ht.x - t.x) / B) : s & 1 && (gt = rt.x, Tt = t.y + G * (rt.x - t.x) / B), new Ot(gt, Tt, y);
    }
    function Gi(t, n) {
      var s = 0;
      return t.x < n.min.x ? s |= 1 : t.x > n.max.x && (s |= 2), t.y < n.min.y ? s |= 4 : t.y > n.max.y && (s |= 8), s;
    }
    function Ln(t, n) {
      var s = n.x - t.x, c = n.y - t.y;
      return s * s + c * c;
    }
    function kn(t, n, s, c) {
      var y = n.x, B = n.y, G = s.x - y, rt = s.y - B, ht = G * G + rt * rt, gt;
      return ht > 0 && (gt = ((t.x - y) * G + (t.y - B) * rt) / ht, gt > 1 ? (y = s.x, B = s.y) : gt > 0 && (y += G * gt, B += rt * gt)), G = t.x - y, rt = t.y - B, c ? G * G + rt * rt : new Ot(y, B);
    }
    function si(t) {
      return !Rt(t[0]) || typeof t[0][0] != "object" && typeof t[0][0] < "u";
    }
    function as(t) {
      return console.warn("Deprecated use of _flat, please use L.LineUtil.isFlat instead."), si(t);
    }
    function ss(t, n) {
      var s, c, y, B, G, rt, ht, gt;
      if (!t || t.length === 0)
        throw new Error("latlngs not passed");
      si(t) || (console.warn("latlngs are not flat! Only the first ring will be used"), t = t[0]);
      var Tt = Mt([0, 0]), Ht = jt(t), se = Ht.getNorthWest().distanceTo(Ht.getSouthWest()) * Ht.getNorthEast().distanceTo(Ht.getNorthWest());
      se < 1700 && (Tt = Xr(t));
      var Ue = t.length, Oe = [];
      for (s = 0; s < Ue; s++) {
        var ui = Mt(t[s]);
        Oe.push(n.project(Mt([ui.lat - Tt.lat, ui.lng - Tt.lng])));
      }
      for (s = 0, c = 0; s < Ue - 1; s++)
        c += Oe[s].distanceTo(Oe[s + 1]) / 2;
      if (c === 0)
        gt = Oe[0];
      else
        for (s = 0, B = 0; s < Ue - 1; s++)
          if (G = Oe[s], rt = Oe[s + 1], y = G.distanceTo(rt), B += y, B > c) {
            ht = (B - c) / y, gt = [
              rt.x - ht * (rt.x - G.x),
              rt.y - ht * (rt.y - G.y)
            ];
            break;
          }
      var We = n.unproject(lt(gt));
      return Mt([We.lat + Tt.lat, We.lng + Tt.lng]);
    }
    var hr = {
      __proto__: null,
      simplify: rs,
      pointToSegmentDistance: De,
      closestPointOnSegment: ei,
      clipSegment: ai,
      _getEdgeIntersection: ur,
      _getBitCode: Gi,
      _sqClosestPointOnSegment: kn,
      isFlat: si,
      _flat: as,
      polylineCenter: ss
    }, cr = {
      project: function(t) {
        return new Ot(t.lng, t.lat);
      },
      unproject: function(t) {
        return new St(t.y, t.x);
      },
      bounds: new Bt([-180, -90], [180, 90])
    }, Yr = {
      R: 6378137,
      R_MINOR: 6356752314245179e-9,
      bounds: new Bt([-2003750834279e-5, -1549657073972e-5], [2003750834279e-5, 1876465623138e-5]),
      project: function(t) {
        var n = Math.PI / 180, s = this.R, c = t.lat * n, y = this.R_MINOR / s, B = Math.sqrt(1 - y * y), G = B * Math.sin(c), rt = Math.tan(Math.PI / 4 - c / 2) / Math.pow((1 - G) / (1 + G), B / 2);
        return c = -s * Math.log(Math.max(rt, 1e-10)), new Ot(t.lng * n * s, c);
      },
      unproject: function(t) {
        for (var n = 180 / Math.PI, s = this.R, c = this.R_MINOR / s, y = Math.sqrt(1 - c * c), B = Math.exp(-t.y / s), G = Math.PI / 2 - 2 * Math.atan(B), rt = 0, ht = 0.1, gt; rt < 15 && Math.abs(ht) > 1e-7; rt++)
          gt = y * Math.sin(G), gt = Math.pow((1 - gt) / (1 + gt), y / 2), ht = Math.PI / 2 - 2 * Math.atan(B * gt) - G, G += ht;
        return new St(G * n, t.x * n / s);
      }
    }, os = {
      __proto__: null,
      LonLat: cr,
      Mercator: Yr,
      SphericalMercator: Bi
    }, xo = b({}, fe, {
      code: "EPSG:3395",
      projection: Yr,
      transformation: function() {
        var t = 0.5 / (Math.PI * Yr.R);
        return Fi(t, 0.5, -t, 0.5);
      }()
    }), Qr = b({}, fe, {
      code: "EPSG:4326",
      projection: cr,
      transformation: Fi(1 / 180, 1, -1 / 180, 0.5)
    }), wo = b({}, be, {
      projection: cr,
      transformation: Fi(1, 0, -1, 0),
      scale: function(t) {
        return Math.pow(2, t);
      },
      zoom: function(t) {
        return Math.log(t) / Math.LN2;
      },
      distance: function(t, n) {
        var s = n.lng - t.lng, c = n.lat - t.lat;
        return Math.sqrt(s * s + c * c);
      },
      infinite: !0
    });
    be.Earth = fe, be.EPSG3395 = xo, be.EPSG3857 = mi, be.EPSG900913 = Ri, be.EPSG4326 = Qr, be.Simple = wo;
    var Ke = we.extend({
      // Classes extending `L.Layer` will inherit the following options:
      options: {
        // @option pane: String = 'overlayPane'
        // By default the layer will be added to the map's [overlay pane](#map-overlaypane). Overriding this option will cause the layer to be placed on another pane by default.
        pane: "overlayPane",
        // @option attribution: String = null
        // String to be shown in the attribution control, e.g. "© OpenStreetMap contributors". It describes the layer data and is often a legal obligation towards copyright holders and tile providers.
        attribution: null,
        bubblingMouseEvents: !0
      },
      /* @section
       * Classes extending `L.Layer` will inherit the following methods:
       *
       * @method addTo(map: Map|LayerGroup): this
       * Adds the layer to the given map or layer group.
       */
      addTo: function(t) {
        return t.addLayer(this), this;
      },
      // @method remove: this
      // Removes the layer from the map it is currently active on.
      remove: function() {
        return this.removeFrom(this._map || this._mapToAdd);
      },
      // @method removeFrom(map: Map): this
      // Removes the layer from the given map
      //
      // @alternative
      // @method removeFrom(group: LayerGroup): this
      // Removes the layer from the given `LayerGroup`
      removeFrom: function(t) {
        return t && t.removeLayer(this), this;
      },
      // @method getPane(name? : String): HTMLElement
      // Returns the `HTMLElement` representing the named pane on the map. If `name` is omitted, returns the pane for this layer.
      getPane: function(t) {
        return this._map.getPane(t ? this.options[t] || t : this.options.pane);
      },
      addInteractiveTarget: function(t) {
        return this._map._targets[x(t)] = this, this;
      },
      removeInteractiveTarget: function(t) {
        return delete this._map._targets[x(t)], this;
      },
      // @method getAttribution: String
      // Used by the `attribution control`, returns the [attribution option](#gridlayer-attribution).
      getAttribution: function() {
        return this.options.attribution;
      },
      _layerAdd: function(t) {
        var n = t.target;
        if (n.hasLayer(this)) {
          if (this._map = n, this._zoomAnimated = n._zoomAnimated, this.getEvents) {
            var s = this.getEvents();
            n.on(s, this), this.once("remove", function() {
              n.off(s, this);
            }, this);
          }
          this.onAdd(n), this.fire("add"), n.fire("layeradd", { layer: this });
        }
      }
    });
    le.include({
      // @method addLayer(layer: Layer): this
      // Adds the given layer to the map
      addLayer: function(t) {
        if (!t._layerAdd)
          throw new Error("The provided object is not a Layer.");
        var n = x(t);
        return this._layers[n] ? this : (this._layers[n] = t, t._mapToAdd = this, t.beforeAdd && t.beforeAdd(this), this.whenReady(t._layerAdd, t), this);
      },
      // @method removeLayer(layer: Layer): this
      // Removes the given layer from the map.
      removeLayer: function(t) {
        var n = x(t);
        return this._layers[n] ? (this._loaded && t.onRemove(this), delete this._layers[n], this._loaded && (this.fire("layerremove", { layer: t }), t.fire("remove")), t._map = t._mapToAdd = null, this) : this;
      },
      // @method hasLayer(layer: Layer): Boolean
      // Returns `true` if the given layer is currently added to the map
      hasLayer: function(t) {
        return x(t) in this._layers;
      },
      /* @method eachLayer(fn: Function, context?: Object): this
       * Iterates over the layers of the map, optionally specifying context of the iterator function.
       * ```
       * map.eachLayer(function(layer){
       *     layer.bindPopup('Hello');
       * });
       * ```
       */
      eachLayer: function(t, n) {
        for (var s in this._layers)
          t.call(n, this._layers[s]);
        return this;
      },
      _addLayers: function(t) {
        t = t ? Rt(t) ? t : [t] : [];
        for (var n = 0, s = t.length; n < s; n++)
          this.addLayer(t[n]);
      },
      _addZoomLimit: function(t) {
        (!isNaN(t.options.maxZoom) || !isNaN(t.options.minZoom)) && (this._zoomBoundLayers[x(t)] = t, this._updateZoomLevels());
      },
      _removeZoomLimit: function(t) {
        var n = x(t);
        this._zoomBoundLayers[n] && (delete this._zoomBoundLayers[n], this._updateZoomLevels());
      },
      _updateZoomLevels: function() {
        var t = 1 / 0, n = -1 / 0, s = this._getZoomSpan();
        for (var c in this._zoomBoundLayers) {
          var y = this._zoomBoundLayers[c].options;
          t = y.minZoom === void 0 ? t : Math.min(t, y.minZoom), n = y.maxZoom === void 0 ? n : Math.max(n, y.maxZoom);
        }
        this._layersMaxZoom = n === -1 / 0 ? void 0 : n, this._layersMinZoom = t === 1 / 0 ? void 0 : t, s !== this._getZoomSpan() && this.fire("zoomlevelschange"), this.options.maxZoom === void 0 && this._layersMaxZoom && this.getZoom() > this._layersMaxZoom && this.setZoom(this._layersMaxZoom), this.options.minZoom === void 0 && this._layersMinZoom && this.getZoom() < this._layersMinZoom && this.setZoom(this._layersMinZoom);
      }
    });
    var Si = Ke.extend({
      initialize: function(t, n) {
        tt(this, n), this._layers = {};
        var s, c;
        if (t)
          for (s = 0, c = t.length; s < c; s++)
            this.addLayer(t[s]);
      },
      // @method addLayer(layer: Layer): this
      // Adds the given layer to the group.
      addLayer: function(t) {
        var n = this.getLayerId(t);
        return this._layers[n] = t, this._map && this._map.addLayer(t), this;
      },
      // @method removeLayer(layer: Layer): this
      // Removes the given layer from the group.
      // @alternative
      // @method removeLayer(id: Number): this
      // Removes the layer with the given internal ID from the group.
      removeLayer: function(t) {
        var n = t in this._layers ? t : this.getLayerId(t);
        return this._map && this._layers[n] && this._map.removeLayer(this._layers[n]), delete this._layers[n], this;
      },
      // @method hasLayer(layer: Layer): Boolean
      // Returns `true` if the given layer is currently added to the group.
      // @alternative
      // @method hasLayer(id: Number): Boolean
      // Returns `true` if the given internal ID is currently added to the group.
      hasLayer: function(t) {
        var n = typeof t == "number" ? t : this.getLayerId(t);
        return n in this._layers;
      },
      // @method clearLayers(): this
      // Removes all the layers from the group.
      clearLayers: function() {
        return this.eachLayer(this.removeLayer, this);
      },
      // @method invoke(methodName: String, …): this
      // Calls `methodName` on every layer contained in this group, passing any
      // additional parameters. Has no effect if the layers contained do not
      // implement `methodName`.
      invoke: function(t) {
        var n = Array.prototype.slice.call(arguments, 1), s, c;
        for (s in this._layers)
          c = this._layers[s], c[t] && c[t].apply(c, n);
        return this;
      },
      onAdd: function(t) {
        this.eachLayer(t.addLayer, t);
      },
      onRemove: function(t) {
        this.eachLayer(t.removeLayer, t);
      },
      // @method eachLayer(fn: Function, context?: Object): this
      // Iterates over the layers of the group, optionally specifying context of the iterator function.
      // ```js
      // group.eachLayer(function (layer) {
      // 	layer.bindPopup('Hello');
      // });
      // ```
      eachLayer: function(t, n) {
        for (var s in this._layers)
          t.call(n, this._layers[s]);
        return this;
      },
      // @method getLayer(id: Number): Layer
      // Returns the layer with the given internal ID.
      getLayer: function(t) {
        return this._layers[t];
      },
      // @method getLayers(): Layer[]
      // Returns an array of all the layers added to the group.
      getLayers: function() {
        var t = [];
        return this.eachLayer(t.push, t), t;
      },
      // @method setZIndex(zIndex: Number): this
      // Calls `setZIndex` on every layer contained in this group, passing the z-index.
      setZIndex: function(t) {
        return this.invoke("setZIndex", t);
      },
      // @method getLayerId(layer: Layer): Number
      // Returns the internal ID for a layer
      getLayerId: function(t) {
        return x(t);
      }
    }), dr = function(t, n) {
      return new Si(t, n);
    }, bi = Si.extend({
      addLayer: function(t) {
        return this.hasLayer(t) ? this : (t.addEventParent(this), Si.prototype.addLayer.call(this, t), this.fire("layeradd", { layer: t }));
      },
      removeLayer: function(t) {
        return this.hasLayer(t) ? (t in this._layers && (t = this._layers[t]), t.removeEventParent(this), Si.prototype.removeLayer.call(this, t), this.fire("layerremove", { layer: t })) : this;
      },
      // @method setStyle(style: Path options): this
      // Sets the given path options to each layer of the group that has a `setStyle` method.
      setStyle: function(t) {
        return this.invoke("setStyle", t);
      },
      // @method bringToFront(): this
      // Brings the layer group to the top of all other layers
      bringToFront: function() {
        return this.invoke("bringToFront");
      },
      // @method bringToBack(): this
      // Brings the layer group to the back of all other layers
      bringToBack: function() {
        return this.invoke("bringToBack");
      },
      // @method getBounds(): LatLngBounds
      // Returns the LatLngBounds of the Feature Group (created from bounds and coordinates of its children).
      getBounds: function() {
        var t = new ue();
        for (var n in this._layers) {
          var s = this._layers[n];
          t.extend(s.getBounds ? s.getBounds() : s.getLatLng());
        }
        return t;
      }
    }), Lo = function(t, n) {
      return new bi(t, n);
    }, Cn = kt.extend({
      /* @section
       * @aka Icon options
       *
       * @option iconUrl: String = null
       * **(required)** The URL to the icon image (absolute or relative to your script path).
       *
       * @option iconRetinaUrl: String = null
       * The URL to a retina sized version of the icon image (absolute or relative to your
       * script path). Used for Retina screen devices.
       *
       * @option iconSize: Point = null
       * Size of the icon image in pixels.
       *
       * @option iconAnchor: Point = null
       * The coordinates of the "tip" of the icon (relative to its top left corner). The icon
       * will be aligned so that this point is at the marker's geographical location. Centered
       * by default if size is specified, also can be set in CSS with negative margins.
       *
       * @option popupAnchor: Point = [0, 0]
       * The coordinates of the point from which popups will "open", relative to the icon anchor.
       *
       * @option tooltipAnchor: Point = [0, 0]
       * The coordinates of the point from which tooltips will "open", relative to the icon anchor.
       *
       * @option shadowUrl: String = null
       * The URL to the icon shadow image. If not specified, no shadow image will be created.
       *
       * @option shadowRetinaUrl: String = null
       *
       * @option shadowSize: Point = null
       * Size of the shadow image in pixels.
       *
       * @option shadowAnchor: Point = null
       * The coordinates of the "tip" of the shadow (relative to its top left corner) (the same
       * as iconAnchor if not specified).
       *
       * @option className: String = ''
       * A custom class name to assign to both icon and shadow images. Empty by default.
       */
      options: {
        popupAnchor: [0, 0],
        tooltipAnchor: [0, 0],
        // @option crossOrigin: Boolean|String = false
        // Whether the crossOrigin attribute will be added to the tiles.
        // If a String is provided, all tiles will have their crossOrigin attribute set to the String provided. This is needed if you want to access tile pixel data.
        // Refer to [CORS Settings](https://developer.mozilla.org/en-US/docs/Web/HTML/CORS_settings_attributes) for valid String values.
        crossOrigin: !1
      },
      initialize: function(t) {
        tt(this, t);
      },
      // @method createIcon(oldIcon?: HTMLElement): HTMLElement
      // Called internally when the icon has to be shown, returns a `<img>` HTML element
      // styled according to the options.
      createIcon: function(t) {
        return this._createIcon("icon", t);
      },
      // @method createShadow(oldIcon?: HTMLElement): HTMLElement
      // As `createIcon`, but for the shadow beneath it.
      createShadow: function(t) {
        return this._createIcon("shadow", t);
      },
      _createIcon: function(t, n) {
        var s = this._getIconUrl(t);
        if (!s) {
          if (t === "icon")
            throw new Error("iconUrl not set in Icon options (see the docs).");
          return null;
        }
        var c = this._createImg(s, n && n.tagName === "IMG" ? n : null);
        return this._setIconStyles(c, t), (this.options.crossOrigin || this.options.crossOrigin === "") && (c.crossOrigin = this.options.crossOrigin === !0 ? "" : this.options.crossOrigin), c;
      },
      _setIconStyles: function(t, n) {
        var s = this.options, c = s[n + "Size"];
        typeof c == "number" && (c = [c, c]);
        var y = lt(c), B = lt(n === "shadow" && s.shadowAnchor || s.iconAnchor || y && y.divideBy(2, !0));
        t.className = "leaflet-marker-" + n + " " + (s.className || ""), B && (t.style.marginLeft = -B.x + "px", t.style.marginTop = -B.y + "px"), y && (t.style.width = y.x + "px", t.style.height = y.y + "px");
      },
      _createImg: function(t, n) {
        return n = n || document.createElement("img"), n.src = t, n;
      },
      _getIconUrl: function(t) {
        return Gt.retina && this.options[t + "RetinaUrl"] || this.options[t + "Url"];
      }
    });
    function ko(t) {
      return new Cn(t);
    }
    var $n = Cn.extend({
      options: {
        iconUrl: "marker-icon.png",
        iconRetinaUrl: "marker-icon-2x.png",
        shadowUrl: "marker-shadow.png",
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        tooltipAnchor: [16, -28],
        shadowSize: [41, 41]
      },
      _getIconUrl: function(t) {
        return typeof $n.imagePath != "string" && ($n.imagePath = this._detectIconPath()), (this.options.imagePath || $n.imagePath) + Cn.prototype._getIconUrl.call(this, t);
      },
      _stripUrl: function(t) {
        var n = function(s, c, y) {
          var B = c.exec(s);
          return B && B[y];
        };
        return t = n(t, /^url\((['"])?(.+)\1\)$/, 2), t && n(t, /^(.*)marker-icon\.png$/, 1);
      },
      _detectIconPath: function() {
        var t = de("div", "leaflet-default-icon-path", document.body), n = Vi(t, "background-image") || Vi(t, "backgroundImage");
        if (document.body.removeChild(t), n = this._stripUrl(n), n)
          return n;
        var s = document.querySelector('link[href$="leaflet.css"]');
        return s ? s.href.substring(0, s.href.length - 11 - 1) : "";
      }
    }), ls = yi.extend({
      initialize: function(t) {
        this._marker = t;
      },
      addHooks: function() {
        var t = this._marker._icon;
        this._draggable || (this._draggable = new Ui(t, t, !0)), this._draggable.on({
          dragstart: this._onDragStart,
          predrag: this._onPreDrag,
          drag: this._onDrag,
          dragend: this._onDragEnd
        }, this).enable(), re(t, "leaflet-marker-draggable");
      },
      removeHooks: function() {
        this._draggable.off({
          dragstart: this._onDragStart,
          predrag: this._onPreDrag,
          drag: this._onDrag,
          dragend: this._onDragEnd
        }, this).disable(), this._marker._icon && Me(this._marker._icon, "leaflet-marker-draggable");
      },
      moved: function() {
        return this._draggable && this._draggable._moved;
      },
      _adjustPan: function(t) {
        var n = this._marker, s = n._map, c = this._marker.options.autoPanSpeed, y = this._marker.options.autoPanPadding, B = $i(n._icon), G = s.getPixelBounds(), rt = s.getPixelOrigin(), ht = Nt(
          G.min._subtract(rt).add(y),
          G.max._subtract(rt).subtract(y)
        );
        if (!ht.contains(B)) {
          var gt = lt(
            (Math.max(ht.max.x, B.x) - ht.max.x) / (G.max.x - ht.max.x) - (Math.min(ht.min.x, B.x) - ht.min.x) / (G.min.x - ht.min.x),
            (Math.max(ht.max.y, B.y) - ht.max.y) / (G.max.y - ht.max.y) - (Math.min(ht.min.y, B.y) - ht.min.y) / (G.min.y - ht.min.y)
          ).multiplyBy(c);
          s.panBy(gt, { animate: !1 }), this._draggable._newPos._add(gt), this._draggable._startPos._add(gt), Ae(n._icon, this._draggable._newPos), this._onDrag(t), this._panRequest = Wt(this._adjustPan.bind(this, t));
        }
      },
      _onDragStart: function() {
        this._oldLatLng = this._marker.getLatLng(), this._marker.closePopup && this._marker.closePopup(), this._marker.fire("movestart").fire("dragstart");
      },
      _onPreDrag: function(t) {
        this._marker.options.autoPan && (ge(this._panRequest), this._panRequest = Wt(this._adjustPan.bind(this, t)));
      },
      _onDrag: function(t) {
        var n = this._marker, s = n._shadow, c = $i(n._icon), y = n._map.layerPointToLatLng(c);
        s && Ae(s, c), n._latlng = y, t.latlng = y, t.oldLatLng = this._oldLatLng, n.fire("move", t).fire("drag", t);
      },
      _onDragEnd: function(t) {
        ge(this._panRequest), delete this._oldLatLng, this._marker.fire("moveend").fire("dragend", t);
      }
    }), fr = Ke.extend({
      // @section
      // @aka Marker options
      options: {
        // @option icon: Icon = *
        // Icon instance to use for rendering the marker.
        // See [Icon documentation](#L.Icon) for details on how to customize the marker icon.
        // If not specified, a common instance of `L.Icon.Default` is used.
        icon: new $n(),
        // Option inherited from "Interactive layer" abstract class
        interactive: !0,
        // @option keyboard: Boolean = true
        // Whether the marker can be tabbed to with a keyboard and clicked by pressing enter.
        keyboard: !0,
        // @option title: String = ''
        // Text for the browser tooltip that appear on marker hover (no tooltip by default).
        // [Useful for accessibility](https://leafletjs.com/examples/accessibility/#markers-must-be-labelled).
        title: "",
        // @option alt: String = 'Marker'
        // Text for the `alt` attribute of the icon image.
        // [Useful for accessibility](https://leafletjs.com/examples/accessibility/#markers-must-be-labelled).
        alt: "Marker",
        // @option zIndexOffset: Number = 0
        // By default, marker images zIndex is set automatically based on its latitude. Use this option if you want to put the marker on top of all others (or below), specifying a high value like `1000` (or high negative value, respectively).
        zIndexOffset: 0,
        // @option opacity: Number = 1.0
        // The opacity of the marker.
        opacity: 1,
        // @option riseOnHover: Boolean = false
        // If `true`, the marker will get on top of others when you hover the mouse over it.
        riseOnHover: !1,
        // @option riseOffset: Number = 250
        // The z-index offset used for the `riseOnHover` feature.
        riseOffset: 250,
        // @option pane: String = 'markerPane'
        // `Map pane` where the markers icon will be added.
        pane: "markerPane",
        // @option shadowPane: String = 'shadowPane'
        // `Map pane` where the markers shadow will be added.
        shadowPane: "shadowPane",
        // @option bubblingMouseEvents: Boolean = false
        // When `true`, a mouse event on this marker will trigger the same event on the map
        // (unless [`L.DomEvent.stopPropagation`](#domevent-stoppropagation) is used).
        bubblingMouseEvents: !1,
        // @option autoPanOnFocus: Boolean = true
        // When `true`, the map will pan whenever the marker is focused (via
        // e.g. pressing `tab` on the keyboard) to ensure the marker is
        // visible within the map's bounds
        autoPanOnFocus: !0,
        // @section Draggable marker options
        // @option draggable: Boolean = false
        // Whether the marker is draggable with mouse/touch or not.
        draggable: !1,
        // @option autoPan: Boolean = false
        // Whether to pan the map when dragging this marker near its edge or not.
        autoPan: !1,
        // @option autoPanPadding: Point = Point(50, 50)
        // Distance (in pixels to the left/right and to the top/bottom) of the
        // map edge to start panning the map.
        autoPanPadding: [50, 50],
        // @option autoPanSpeed: Number = 10
        // Number of pixels the map should pan by.
        autoPanSpeed: 10
      },
      /* @section
       *
       * In addition to [shared layer methods](#Layer) like `addTo()` and `remove()` and [popup methods](#Popup) like bindPopup() you can also use the following methods:
       */
      initialize: function(t, n) {
        tt(this, n), this._latlng = Mt(t);
      },
      onAdd: function(t) {
        this._zoomAnimated = this._zoomAnimated && t.options.markerZoomAnimation, this._zoomAnimated && t.on("zoomanim", this._animateZoom, this), this._initIcon(), this.update();
      },
      onRemove: function(t) {
        this.dragging && this.dragging.enabled() && (this.options.draggable = !0, this.dragging.removeHooks()), delete this.dragging, this._zoomAnimated && t.off("zoomanim", this._animateZoom, this), this._removeIcon(), this._removeShadow();
      },
      getEvents: function() {
        return {
          zoom: this.update,
          viewreset: this.update
        };
      },
      // @method getLatLng: LatLng
      // Returns the current geographical position of the marker.
      getLatLng: function() {
        return this._latlng;
      },
      // @method setLatLng(latlng: LatLng): this
      // Changes the marker position to the given point.
      setLatLng: function(t) {
        var n = this._latlng;
        return this._latlng = Mt(t), this.update(), this.fire("move", { oldLatLng: n, latlng: this._latlng });
      },
      // @method setZIndexOffset(offset: Number): this
      // Changes the [zIndex offset](#marker-zindexoffset) of the marker.
      setZIndexOffset: function(t) {
        return this.options.zIndexOffset = t, this.update();
      },
      // @method getIcon: Icon
      // Returns the current icon used by the marker
      getIcon: function() {
        return this.options.icon;
      },
      // @method setIcon(icon: Icon): this
      // Changes the marker icon.
      setIcon: function(t) {
        return this.options.icon = t, this._map && (this._initIcon(), this.update()), this._popup && this.bindPopup(this._popup, this._popup.options), this;
      },
      getElement: function() {
        return this._icon;
      },
      update: function() {
        if (this._icon && this._map) {
          var t = this._map.latLngToLayerPoint(this._latlng).round();
          this._setPos(t);
        }
        return this;
      },
      _initIcon: function() {
        var t = this.options, n = "leaflet-zoom-" + (this._zoomAnimated ? "animated" : "hide"), s = t.icon.createIcon(this._icon), c = !1;
        s !== this._icon && (this._icon && this._removeIcon(), c = !0, t.title && (s.title = t.title), s.tagName === "IMG" && (s.alt = t.alt || "")), re(s, n), t.keyboard && (s.tabIndex = "0", s.setAttribute("role", "button")), this._icon = s, t.riseOnHover && this.on({
          mouseover: this._bringToFront,
          mouseout: this._resetZIndex
        }), this.options.autoPanOnFocus && Qt(s, "focus", this._panOnFocus, this);
        var y = t.icon.createShadow(this._shadow), B = !1;
        y !== this._shadow && (this._removeShadow(), B = !0), y && (re(y, n), y.alt = ""), this._shadow = y, t.opacity < 1 && this._updateOpacity(), c && this.getPane().appendChild(this._icon), this._initInteraction(), y && B && this.getPane(t.shadowPane).appendChild(this._shadow);
      },
      _removeIcon: function() {
        this.options.riseOnHover && this.off({
          mouseover: this._bringToFront,
          mouseout: this._resetZIndex
        }), this.options.autoPanOnFocus && pe(this._icon, "focus", this._panOnFocus, this), Ce(this._icon), this.removeInteractiveTarget(this._icon), this._icon = null;
      },
      _removeShadow: function() {
        this._shadow && Ce(this._shadow), this._shadow = null;
      },
      _setPos: function(t) {
        this._icon && Ae(this._icon, t), this._shadow && Ae(this._shadow, t), this._zIndex = t.y + this.options.zIndexOffset, this._resetZIndex();
      },
      _updateZIndex: function(t) {
        this._icon && (this._icon.style.zIndex = this._zIndex + t);
      },
      _animateZoom: function(t) {
        var n = this._map._latLngToNewLayerPoint(this._latlng, t.zoom, t.center).round();
        this._setPos(n);
      },
      _initInteraction: function() {
        if (this.options.interactive && (re(this._icon, "leaflet-interactive"), this.addInteractiveTarget(this._icon), ls)) {
          var t = this.options.draggable;
          this.dragging && (t = this.dragging.enabled(), this.dragging.disable()), this.dragging = new ls(this), t && this.dragging.enable();
        }
      },
      // @method setOpacity(opacity: Number): this
      // Changes the opacity of the marker.
      setOpacity: function(t) {
        return this.options.opacity = t, this._map && this._updateOpacity(), this;
      },
      _updateOpacity: function() {
        var t = this.options.opacity;
        this._icon && ri(this._icon, t), this._shadow && ri(this._shadow, t);
      },
      _bringToFront: function() {
        this._updateZIndex(this.options.riseOffset);
      },
      _resetZIndex: function() {
        this._updateZIndex(0);
      },
      _panOnFocus: function() {
        var t = this._map;
        if (t) {
          var n = this.options.icon.options, s = n.iconSize ? lt(n.iconSize) : lt(0, 0), c = n.iconAnchor ? lt(n.iconAnchor) : lt(0, 0);
          t.panInside(this._latlng, {
            paddingTopLeft: c,
            paddingBottomRight: s.subtract(c)
          });
        }
      },
      _getPopupAnchor: function() {
        return this.options.icon.options.popupAnchor;
      },
      _getTooltipAnchor: function() {
        return this.options.icon.options.tooltipAnchor;
      }
    });
    function us(t, n) {
      return new fr(t, n);
    }
    var oi = Ke.extend({
      // @section
      // @aka Path options
      options: {
        // @option stroke: Boolean = true
        // Whether to draw stroke along the path. Set it to `false` to disable borders on polygons or circles.
        stroke: !0,
        // @option color: String = '#3388ff'
        // Stroke color
        color: "#3388ff",
        // @option weight: Number = 3
        // Stroke width in pixels
        weight: 3,
        // @option opacity: Number = 1.0
        // Stroke opacity
        opacity: 1,
        // @option lineCap: String= 'round'
        // A string that defines [shape to be used at the end](https://developer.mozilla.org/docs/Web/SVG/Attribute/stroke-linecap) of the stroke.
        lineCap: "round",
        // @option lineJoin: String = 'round'
        // A string that defines [shape to be used at the corners](https://developer.mozilla.org/docs/Web/SVG/Attribute/stroke-linejoin) of the stroke.
        lineJoin: "round",
        // @option dashArray: String = null
        // A string that defines the stroke [dash pattern](https://developer.mozilla.org/docs/Web/SVG/Attribute/stroke-dasharray). Doesn't work on `Canvas`-powered layers in [some old browsers](https://developer.mozilla.org/docs/Web/API/CanvasRenderingContext2D/setLineDash#Browser_compatibility).
        dashArray: null,
        // @option dashOffset: String = null
        // A string that defines the [distance into the dash pattern to start the dash](https://developer.mozilla.org/docs/Web/SVG/Attribute/stroke-dashoffset). Doesn't work on `Canvas`-powered layers in [some old browsers](https://developer.mozilla.org/docs/Web/API/CanvasRenderingContext2D/setLineDash#Browser_compatibility).
        dashOffset: null,
        // @option fill: Boolean = depends
        // Whether to fill the path with color. Set it to `false` to disable filling on polygons or circles.
        fill: !1,
        // @option fillColor: String = *
        // Fill color. Defaults to the value of the [`color`](#path-color) option
        fillColor: null,
        // @option fillOpacity: Number = 0.2
        // Fill opacity.
        fillOpacity: 0.2,
        // @option fillRule: String = 'evenodd'
        // A string that defines [how the inside of a shape](https://developer.mozilla.org/docs/Web/SVG/Attribute/fill-rule) is determined.
        fillRule: "evenodd",
        // className: '',
        // Option inherited from "Interactive layer" abstract class
        interactive: !0,
        // @option bubblingMouseEvents: Boolean = true
        // When `true`, a mouse event on this path will trigger the same event on the map
        // (unless [`L.DomEvent.stopPropagation`](#domevent-stoppropagation) is used).
        bubblingMouseEvents: !0
      },
      beforeAdd: function(t) {
        this._renderer = t.getRenderer(this);
      },
      onAdd: function() {
        this._renderer._initPath(this), this._reset(), this._renderer._addPath(this);
      },
      onRemove: function() {
        this._renderer._removePath(this);
      },
      // @method redraw(): this
      // Redraws the layer. Sometimes useful after you changed the coordinates that the path uses.
      redraw: function() {
        return this._map && this._renderer._updatePath(this), this;
      },
      // @method setStyle(style: Path options): this
      // Changes the appearance of a Path based on the options in the `Path options` object.
      setStyle: function(t) {
        return tt(this, t), this._renderer && (this._renderer._updateStyle(this), this.options.stroke && t && Object.prototype.hasOwnProperty.call(t, "weight") && this._updateBounds()), this;
      },
      // @method bringToFront(): this
      // Brings the layer to the top of all path layers.
      bringToFront: function() {
        return this._renderer && this._renderer._bringToFront(this), this;
      },
      // @method bringToBack(): this
      // Brings the layer to the bottom of all path layers.
      bringToBack: function() {
        return this._renderer && this._renderer._bringToBack(this), this;
      },
      getElement: function() {
        return this._path;
      },
      _reset: function() {
        this._project(), this._update();
      },
      _clickTolerance: function() {
        return (this.options.stroke ? this.options.weight / 2 : 0) + (this._renderer.options.tolerance || 0);
      }
    }), pr = oi.extend({
      // @section
      // @aka CircleMarker options
      options: {
        fill: !0,
        // @option radius: Number = 10
        // Radius of the circle marker, in pixels
        radius: 10
      },
      initialize: function(t, n) {
        tt(this, n), this._latlng = Mt(t), this._radius = this.options.radius;
      },
      // @method setLatLng(latLng: LatLng): this
      // Sets the position of a circle marker to a new location.
      setLatLng: function(t) {
        var n = this._latlng;
        return this._latlng = Mt(t), this.redraw(), this.fire("move", { oldLatLng: n, latlng: this._latlng });
      },
      // @method getLatLng(): LatLng
      // Returns the current geographical position of the circle marker
      getLatLng: function() {
        return this._latlng;
      },
      // @method setRadius(radius: Number): this
      // Sets the radius of a circle marker. Units are in pixels.
      setRadius: function(t) {
        return this.options.radius = this._radius = t, this.redraw();
      },
      // @method getRadius(): Number
      // Returns the current radius of the circle
      getRadius: function() {
        return this._radius;
      },
      setStyle: function(t) {
        var n = t && t.radius || this._radius;
        return oi.prototype.setStyle.call(this, t), this.setRadius(n), this;
      },
      _project: function() {
        this._point = this._map.latLngToLayerPoint(this._latlng), this._updateBounds();
      },
      _updateBounds: function() {
        var t = this._radius, n = this._radiusY || t, s = this._clickTolerance(), c = [t + s, n + s];
        this._pxBounds = new Bt(this._point.subtract(c), this._point.add(c));
      },
      _update: function() {
        this._map && this._updatePath();
      },
      _updatePath: function() {
        this._renderer._updateCircle(this);
      },
      _empty: function() {
        return this._radius && !this._renderer._bounds.intersects(this._pxBounds);
      },
      // Needed by the `Canvas` renderer for interactivity
      _containsPoint: function(t) {
        return t.distanceTo(this._point) <= this._radius + this._clickTolerance();
      }
    });
    function ta(t, n) {
      return new pr(t, n);
    }
    var En = pr.extend({
      initialize: function(t, n, s) {
        if (typeof n == "number" && (n = b({}, s, { radius: n })), tt(this, n), this._latlng = Mt(t), isNaN(this.options.radius))
          throw new Error("Circle radius cannot be NaN");
        this._mRadius = this.options.radius;
      },
      // @method setRadius(radius: Number): this
      // Sets the radius of a circle. Units are in meters.
      setRadius: function(t) {
        return this._mRadius = t, this.redraw();
      },
      // @method getRadius(): Number
      // Returns the current radius of a circle. Units are in meters.
      getRadius: function() {
        return this._mRadius;
      },
      // @method getBounds(): LatLngBounds
      // Returns the `LatLngBounds` of the path.
      getBounds: function() {
        var t = [this._radius, this._radiusY || this._radius];
        return new ue(
          this._map.layerPointToLatLng(this._point.subtract(t)),
          this._map.layerPointToLatLng(this._point.add(t))
        );
      },
      setStyle: oi.prototype.setStyle,
      _project: function() {
        var t = this._latlng.lng, n = this._latlng.lat, s = this._map, c = s.options.crs;
        if (c.distance === fe.distance) {
          var y = Math.PI / 180, B = this._mRadius / fe.R / y, G = s.project([n + B, t]), rt = s.project([n - B, t]), ht = G.add(rt).divideBy(2), gt = s.unproject(ht).lat, Tt = Math.acos((Math.cos(B * y) - Math.sin(n * y) * Math.sin(gt * y)) / (Math.cos(n * y) * Math.cos(gt * y))) / y;
          (isNaN(Tt) || Tt === 0) && (Tt = B / Math.cos(Math.PI / 180 * n)), this._point = ht.subtract(s.getPixelOrigin()), this._radius = isNaN(Tt) ? 0 : ht.x - s.project([gt, t - Tt]).x, this._radiusY = ht.y - G.y;
        } else {
          var Ht = c.unproject(c.project(this._latlng).subtract([this._mRadius, 0]));
          this._point = s.latLngToLayerPoint(this._latlng), this._radius = this._point.x - s.latLngToLayerPoint(Ht).x;
        }
        this._updateBounds();
      }
    });
    function Co(t, n, s) {
      return new En(t, n, s);
    }
    var Pi = oi.extend({
      // @section
      // @aka Polyline options
      options: {
        // @option smoothFactor: Number = 1.0
        // How much to simplify the polyline on each zoom level. More means
        // better performance and smoother look, and less means more accurate representation.
        smoothFactor: 1,
        // @option noClip: Boolean = false
        // Disable polyline clipping.
        noClip: !1
      },
      initialize: function(t, n) {
        tt(this, n), this._setLatLngs(t);
      },
      // @method getLatLngs(): LatLng[]
      // Returns an array of the points in the path, or nested arrays of points in case of multi-polyline.
      getLatLngs: function() {
        return this._latlngs;
      },
      // @method setLatLngs(latlngs: LatLng[]): this
      // Replaces all the points in the polyline with the given array of geographical points.
      setLatLngs: function(t) {
        return this._setLatLngs(t), this.redraw();
      },
      // @method isEmpty(): Boolean
      // Returns `true` if the Polyline has no LatLngs.
      isEmpty: function() {
        return !this._latlngs.length;
      },
      // @method closestLayerPoint(p: Point): Point
      // Returns the point closest to `p` on the Polyline.
      closestLayerPoint: function(t) {
        for (var n = 1 / 0, s = null, c = kn, y, B, G = 0, rt = this._parts.length; G < rt; G++)
          for (var ht = this._parts[G], gt = 1, Tt = ht.length; gt < Tt; gt++) {
            y = ht[gt - 1], B = ht[gt];
            var Ht = c(t, y, B, !0);
            Ht < n && (n = Ht, s = c(t, y, B));
          }
        return s && (s.distance = Math.sqrt(n)), s;
      },
      // @method getCenter(): LatLng
      // Returns the center ([centroid](https://en.wikipedia.org/wiki/Centroid)) of the polyline.
      getCenter: function() {
        if (!this._map)
          throw new Error("Must add layer to map before using getCenter()");
        return ss(this._defaultShape(), this._map.options.crs);
      },
      // @method getBounds(): LatLngBounds
      // Returns the `LatLngBounds` of the path.
      getBounds: function() {
        return this._bounds;
      },
      // @method addLatLng(latlng: LatLng, latlngs?: LatLng[]): this
      // Adds a given point to the polyline. By default, adds to the first ring of
      // the polyline in case of a multi-polyline, but can be overridden by passing
      // a specific ring as a LatLng array (that you can earlier access with [`getLatLngs`](#polyline-getlatlngs)).
      addLatLng: function(t, n) {
        return n = n || this._defaultShape(), t = Mt(t), n.push(t), this._bounds.extend(t), this.redraw();
      },
      _setLatLngs: function(t) {
        this._bounds = new ue(), this._latlngs = this._convertLatLngs(t);
      },
      _defaultShape: function() {
        return si(this._latlngs) ? this._latlngs : this._latlngs[0];
      },
      // recursively convert latlngs input into actual LatLng instances; calculate bounds along the way
      _convertLatLngs: function(t) {
        for (var n = [], s = si(t), c = 0, y = t.length; c < y; c++)
          s ? (n[c] = Mt(t[c]), this._bounds.extend(n[c])) : n[c] = this._convertLatLngs(t[c]);
        return n;
      },
      _project: function() {
        var t = new Bt();
        this._rings = [], this._projectLatlngs(this._latlngs, this._rings, t), this._bounds.isValid() && t.isValid() && (this._rawPxBounds = t, this._updateBounds());
      },
      _updateBounds: function() {
        var t = this._clickTolerance(), n = new Ot(t, t);
        this._rawPxBounds && (this._pxBounds = new Bt([
          this._rawPxBounds.min.subtract(n),
          this._rawPxBounds.max.add(n)
        ]));
      },
      // recursively turns latlngs into a set of rings with projected coordinates
      _projectLatlngs: function(t, n, s) {
        var c = t[0] instanceof St, y = t.length, B, G;
        if (c) {
          for (G = [], B = 0; B < y; B++)
            G[B] = this._map.latLngToLayerPoint(t[B]), s.extend(G[B]);
          n.push(G);
        } else
          for (B = 0; B < y; B++)
            this._projectLatlngs(t[B], n, s);
      },
      // clip polyline by renderer bounds so that we have less to render for performance
      _clipPoints: function() {
        var t = this._renderer._bounds;
        if (this._parts = [], !(!this._pxBounds || !this._pxBounds.intersects(t))) {
          if (this.options.noClip) {
            this._parts = this._rings;
            return;
          }
          var n = this._parts, s, c, y, B, G, rt, ht;
          for (s = 0, y = 0, B = this._rings.length; s < B; s++)
            for (ht = this._rings[s], c = 0, G = ht.length; c < G - 1; c++)
              rt = ai(ht[c], ht[c + 1], t, c, !0), rt && (n[y] = n[y] || [], n[y].push(rt[0]), (rt[1] !== ht[c + 1] || c === G - 2) && (n[y].push(rt[1]), y++));
        }
      },
      // simplify each clipped part of the polyline for performance
      _simplifyPoints: function() {
        for (var t = this._parts, n = this.options.smoothFactor, s = 0, c = t.length; s < c; s++)
          t[s] = rs(t[s], n);
      },
      _update: function() {
        this._map && (this._clipPoints(), this._simplifyPoints(), this._updatePath());
      },
      _updatePath: function() {
        this._renderer._updatePoly(this);
      },
      // Needed by the `Canvas` renderer for interactivity
      _containsPoint: function(t, n) {
        var s, c, y, B, G, rt, ht = this._clickTolerance();
        if (!this._pxBounds || !this._pxBounds.contains(t))
          return !1;
        for (s = 0, B = this._parts.length; s < B; s++)
          for (rt = this._parts[s], c = 0, G = rt.length, y = G - 1; c < G; y = c++)
            if (!(!n && c === 0) && De(t, rt[y], rt[c]) <= ht)
              return !0;
        return !1;
      }
    });
    function ea(t, n) {
      return new Pi(t, n);
    }
    Pi._flat = as;
    var Ve = Pi.extend({
      options: {
        fill: !0
      },
      isEmpty: function() {
        return !this._latlngs.length || !this._latlngs[0].length;
      },
      // @method getCenter(): LatLng
      // Returns the center ([centroid](http://en.wikipedia.org/wiki/Centroid)) of the Polygon.
      getCenter: function() {
        if (!this._map)
          throw new Error("Must add layer to map before using getCenter()");
        return is(this._defaultShape(), this._map.options.crs);
      },
      _convertLatLngs: function(t) {
        var n = Pi.prototype._convertLatLngs.call(this, t), s = n.length;
        return s >= 2 && n[0] instanceof St && n[0].equals(n[s - 1]) && n.pop(), n;
      },
      _setLatLngs: function(t) {
        Pi.prototype._setLatLngs.call(this, t), si(this._latlngs) && (this._latlngs = [this._latlngs]);
      },
      _defaultShape: function() {
        return si(this._latlngs[0]) ? this._latlngs[0] : this._latlngs[0][0];
      },
      _clipPoints: function() {
        var t = this._renderer._bounds, n = this.options.weight, s = new Ot(n, n);
        if (t = new Bt(t.min.subtract(s), t.max.add(s)), this._parts = [], !(!this._pxBounds || !this._pxBounds.intersects(t))) {
          if (this.options.noClip) {
            this._parts = this._rings;
            return;
          }
          for (var c = 0, y = this._rings.length, B; c < y; c++)
            B = es(this._rings[c], t, !0), B.length && this._parts.push(B);
        }
      },
      _updatePath: function() {
        this._renderer._updatePoly(this, !0);
      },
      // Needed by the `Canvas` renderer for interactivity
      _containsPoint: function(t) {
        var n = !1, s, c, y, B, G, rt, ht, gt;
        if (!this._pxBounds || !this._pxBounds.contains(t))
          return !1;
        for (B = 0, ht = this._parts.length; B < ht; B++)
          for (s = this._parts[B], G = 0, gt = s.length, rt = gt - 1; G < gt; rt = G++)
            c = s[G], y = s[rt], c.y > t.y != y.y > t.y && t.x < (y.x - c.x) * (t.y - c.y) / (y.y - c.y) + c.x && (n = !n);
        return n || Pi.prototype._containsPoint.call(this, t, !0);
      }
    });
    function ia(t, n) {
      return new Ve(t, n);
    }
    var Ti = bi.extend({
      /* @section
       * @aka GeoJSON options
       *
       * @option pointToLayer: Function = *
       * A `Function` defining how GeoJSON points spawn Leaflet layers. It is internally
       * called when data is added, passing the GeoJSON point feature and its `LatLng`.
       * The default is to spawn a default `Marker`:
       * ```js
       * function(geoJsonPoint, latlng) {
       * 	return L.marker(latlng);
       * }
       * ```
       *
       * @option style: Function = *
       * A `Function` defining the `Path options` for styling GeoJSON lines and polygons,
       * called internally when data is added.
       * The default value is to not override any defaults:
       * ```js
       * function (geoJsonFeature) {
       * 	return {}
       * }
       * ```
       *
       * @option onEachFeature: Function = *
       * A `Function` that will be called once for each created `Feature`, after it has
       * been created and styled. Useful for attaching events and popups to features.
       * The default is to do nothing with the newly created layers:
       * ```js
       * function (feature, layer) {}
       * ```
       *
       * @option filter: Function = *
       * A `Function` that will be used to decide whether to include a feature or not.
       * The default is to include all features:
       * ```js
       * function (geoJsonFeature) {
       * 	return true;
       * }
       * ```
       * Note: dynamically changing the `filter` option will have effect only on newly
       * added data. It will _not_ re-evaluate already included features.
       *
       * @option coordsToLatLng: Function = *
       * A `Function` that will be used for converting GeoJSON coordinates to `LatLng`s.
       * The default is the `coordsToLatLng` static method.
       *
       * @option markersInheritOptions: Boolean = false
       * Whether default Markers for "Point" type Features inherit from group options.
       */
      initialize: function(t, n) {
        tt(this, n), this._layers = {}, t && this.addData(t);
      },
      // @method addData( <GeoJSON> data ): this
      // Adds a GeoJSON object to the layer.
      addData: function(t) {
        var n = Rt(t) ? t : t.features, s, c, y;
        if (n) {
          for (s = 0, c = n.length; s < c; s++)
            y = n[s], (y.geometries || y.geometry || y.features || y.coordinates) && this.addData(y);
          return this;
        }
        var B = this.options;
        if (B.filter && !B.filter(t))
          return this;
        var G = Un(t, B);
        return G ? (G.feature = mr(t), G.defaultOptions = G.options, this.resetStyle(G), B.onEachFeature && B.onEachFeature(t, G), this.addLayer(G)) : this;
      },
      // @method resetStyle( <Path> layer? ): this
      // Resets the given vector layer's style to the original GeoJSON style, useful for resetting style after hover events.
      // If `layer` is omitted, the style of all features in the current layer is reset.
      resetStyle: function(t) {
        return t === void 0 ? this.eachLayer(this.resetStyle, this) : (t.options = b({}, t.defaultOptions), this._setLayerStyle(t, this.options.style), this);
      },
      // @method setStyle( <Function> style ): this
      // Changes styles of GeoJSON vector layers with the given style function.
      setStyle: function(t) {
        return this.eachLayer(function(n) {
          this._setLayerStyle(n, t);
        }, this);
      },
      _setLayerStyle: function(t, n) {
        t.setStyle && (typeof n == "function" && (n = n(t.feature)), t.setStyle(n));
      }
    });
    function Un(t, n) {
      var s = t.type === "Feature" ? t.geometry : t, c = s ? s.coordinates : null, y = [], B = n && n.pointToLayer, G = n && n.coordsToLatLng || na, rt, ht, gt, Tt;
      if (!c && !s)
        return null;
      switch (s.type) {
        case "Point":
          return rt = G(c), hs(B, t, rt, n);
        case "MultiPoint":
          for (gt = 0, Tt = c.length; gt < Tt; gt++)
            rt = G(c[gt]), y.push(hs(B, t, rt, n));
          return new bi(y);
        case "LineString":
        case "MultiLineString":
          return ht = ii(c, s.type === "LineString" ? 0 : 1, G), new Pi(ht, n);
        case "Polygon":
        case "MultiPolygon":
          return ht = ii(c, s.type === "Polygon" ? 1 : 2, G), new Ve(ht, n);
        case "GeometryCollection":
          for (gt = 0, Tt = s.geometries.length; gt < Tt; gt++) {
            var Ht = Un({
              geometry: s.geometries[gt],
              type: "Feature",
              properties: t.properties
            }, n);
            Ht && y.push(Ht);
          }
          return new bi(y);
        case "FeatureCollection":
          for (gt = 0, Tt = s.features.length; gt < Tt; gt++) {
            var se = Un(s.features[gt], n);
            se && y.push(se);
          }
          return new bi(y);
        default:
          throw new Error("Invalid GeoJSON object.");
      }
    }
    function hs(t, n, s, c) {
      return t ? t(n, s) : new fr(s, c && c.markersInheritOptions && c);
    }
    function na(t) {
      return new St(t[1], t[0], t[2]);
    }
    function ii(t, n, s) {
      for (var c = [], y = 0, B = t.length, G; y < B; y++)
        G = n ? ii(t[y], n - 1, s) : (s || na)(t[y]), c.push(G);
      return c;
    }
    function Di(t, n) {
      return t = Mt(t), t.alt !== void 0 ? [z(t.lng, n), z(t.lat, n), z(t.alt, n)] : [z(t.lng, n), z(t.lat, n)];
    }
    function rn(t, n, s, c) {
      for (var y = [], B = 0, G = t.length; B < G; B++)
        y.push(n ? rn(t[B], si(t[B]) ? 0 : n - 1, s, c) : Di(t[B], c));
      return !n && s && y.length > 0 && y.push(y[0].slice()), y;
    }
    function an(t, n) {
      return t.feature ? b({}, t.feature, { geometry: n }) : mr(n);
    }
    function mr(t) {
      return t.type === "Feature" || t.type === "FeatureCollection" ? t : {
        type: "Feature",
        properties: {},
        geometry: t
      };
    }
    var ra = {
      toGeoJSON: function(t) {
        return an(this, {
          type: "Point",
          coordinates: Di(this.getLatLng(), t)
        });
      }
    };
    fr.include(ra), En.include(ra), pr.include(ra), Pi.include({
      toGeoJSON: function(t) {
        var n = !si(this._latlngs), s = rn(this._latlngs, n ? 1 : 0, !1, t);
        return an(this, {
          type: (n ? "Multi" : "") + "LineString",
          coordinates: s
        });
      }
    }), Ve.include({
      toGeoJSON: function(t) {
        var n = !si(this._latlngs), s = n && !si(this._latlngs[0]), c = rn(this._latlngs, s ? 2 : n ? 1 : 0, !0, t);
        return n || (c = [c]), an(this, {
          type: (s ? "Multi" : "") + "Polygon",
          coordinates: c
        });
      }
    }), Si.include({
      toMultiPoint: function(t) {
        var n = [];
        return this.eachLayer(function(s) {
          n.push(s.toGeoJSON(t).geometry.coordinates);
        }), an(this, {
          type: "MultiPoint",
          coordinates: n
        });
      },
      // @method toGeoJSON(precision?: Number|false): Object
      // Coordinates values are rounded with [`formatNum`](#util-formatnum) function with given `precision`.
      // Returns a [`GeoJSON`](https://en.wikipedia.org/wiki/GeoJSON) representation of the layer group (as a GeoJSON `FeatureCollection`, `GeometryCollection`, or `MultiPoint`).
      toGeoJSON: function(t) {
        var n = this.feature && this.feature.geometry && this.feature.geometry.type;
        if (n === "MultiPoint")
          return this.toMultiPoint(t);
        var s = n === "GeometryCollection", c = [];
        return this.eachLayer(function(y) {
          if (y.toGeoJSON) {
            var B = y.toGeoJSON(t);
            if (s)
              c.push(B.geometry);
            else {
              var G = mr(B);
              G.type === "FeatureCollection" ? c.push.apply(c, G.features) : c.push(G);
            }
          }
        }), s ? an(this, {
          geometries: c,
          type: "GeometryCollection"
        }) : {
          type: "FeatureCollection",
          features: c
        };
      }
    });
    function cs(t, n) {
      return new Ti(t, n);
    }
    var Eo = cs, Mn = Ke.extend({
      // @section
      // @aka ImageOverlay options
      options: {
        // @option opacity: Number = 1.0
        // The opacity of the image overlay.
        opacity: 1,
        // @option alt: String = ''
        // Text for the `alt` attribute of the image (useful for accessibility).
        alt: "",
        // @option interactive: Boolean = false
        // If `true`, the image overlay will emit [mouse events](#interactive-layer) when clicked or hovered.
        interactive: !1,
        // @option crossOrigin: Boolean|String = false
        // Whether the crossOrigin attribute will be added to the image.
        // If a String is provided, the image will have its crossOrigin attribute set to the String provided. This is needed if you want to access image pixel data.
        // Refer to [CORS Settings](https://developer.mozilla.org/en-US/docs/Web/HTML/CORS_settings_attributes) for valid String values.
        crossOrigin: !1,
        // @option errorOverlayUrl: String = ''
        // URL to the overlay image to show in place of the overlay that failed to load.
        errorOverlayUrl: "",
        // @option zIndex: Number = 1
        // The explicit [zIndex](https://developer.mozilla.org/docs/Web/CSS/CSS_Positioning/Understanding_z_index) of the overlay layer.
        zIndex: 1,
        // @option className: String = ''
        // A custom class name to assign to the image. Empty by default.
        className: ""
      },
      initialize: function(t, n, s) {
        this._url = t, this._bounds = jt(n), tt(this, s);
      },
      onAdd: function() {
        this._image || (this._initImage(), this.options.opacity < 1 && this._updateOpacity()), this.options.interactive && (re(this._image, "leaflet-interactive"), this.addInteractiveTarget(this._image)), this.getPane().appendChild(this._image), this._reset();
      },
      onRemove: function() {
        Ce(this._image), this.options.interactive && this.removeInteractiveTarget(this._image);
      },
      // @method setOpacity(opacity: Number): this
      // Sets the opacity of the overlay.
      setOpacity: function(t) {
        return this.options.opacity = t, this._image && this._updateOpacity(), this;
      },
      setStyle: function(t) {
        return t.opacity && this.setOpacity(t.opacity), this;
      },
      // @method bringToFront(): this
      // Brings the layer to the top of all overlays.
      bringToFront: function() {
        return this._map && _n(this._image), this;
      },
      // @method bringToBack(): this
      // Brings the layer to the bottom of all overlays.
      bringToBack: function() {
        return this._map && yn(this._image), this;
      },
      // @method setUrl(url: String): this
      // Changes the URL of the image.
      setUrl: function(t) {
        return this._url = t, this._image && (this._image.src = t), this;
      },
      // @method setBounds(bounds: LatLngBounds): this
      // Update the bounds that this ImageOverlay covers
      setBounds: function(t) {
        return this._bounds = jt(t), this._map && this._reset(), this;
      },
      getEvents: function() {
        var t = {
          zoom: this._reset,
          viewreset: this._reset
        };
        return this._zoomAnimated && (t.zoomanim = this._animateZoom), t;
      },
      // @method setZIndex(value: Number): this
      // Changes the [zIndex](#imageoverlay-zindex) of the image overlay.
      setZIndex: function(t) {
        return this.options.zIndex = t, this._updateZIndex(), this;
      },
      // @method getBounds(): LatLngBounds
      // Get the bounds that this ImageOverlay covers
      getBounds: function() {
        return this._bounds;
      },
      // @method getElement(): HTMLElement
      // Returns the instance of [`HTMLImageElement`](https://developer.mozilla.org/docs/Web/API/HTMLImageElement)
      // used by this overlay.
      getElement: function() {
        return this._image;
      },
      _initImage: function() {
        var t = this._url.tagName === "IMG", n = this._image = t ? this._url : de("img");
        if (re(n, "leaflet-image-layer"), this._zoomAnimated && re(n, "leaflet-zoom-animated"), this.options.className && re(n, this.options.className), n.onselectstart = M, n.onmousemove = M, n.onload = w(this.fire, this, "load"), n.onerror = w(this._overlayOnError, this, "error"), (this.options.crossOrigin || this.options.crossOrigin === "") && (n.crossOrigin = this.options.crossOrigin === !0 ? "" : this.options.crossOrigin), this.options.zIndex && this._updateZIndex(), t) {
          this._url = n.src;
          return;
        }
        n.src = this._url, n.alt = this.options.alt;
      },
      _animateZoom: function(t) {
        var n = this._map.getZoomScale(t.zoom), s = this._map._latLngBoundsToNewLayerBounds(this._bounds, t.zoom, t.center).min;
        tn(this._image, s, n);
      },
      _reset: function() {
        var t = this._image, n = new Bt(
          this._map.latLngToLayerPoint(this._bounds.getNorthWest()),
          this._map.latLngToLayerPoint(this._bounds.getSouthEast())
        ), s = n.getSize();
        Ae(t, n.min), t.style.width = s.x + "px", t.style.height = s.y + "px";
      },
      _updateOpacity: function() {
        ri(this._image, this.options.opacity);
      },
      _updateZIndex: function() {
        this._image && this.options.zIndex !== void 0 && this.options.zIndex !== null && (this._image.style.zIndex = this.options.zIndex);
      },
      _overlayOnError: function() {
        this.fire("error");
        var t = this.options.errorOverlayUrl;
        t && this._url !== t && (this._url = t, this._image.src = t);
      },
      // @method getCenter(): LatLng
      // Returns the center of the ImageOverlay.
      getCenter: function() {
        return this._bounds.getCenter();
      }
    }), Mo = function(t, n, s) {
      return new Mn(t, n, s);
    }, ds = Mn.extend({
      // @section
      // @aka VideoOverlay options
      options: {
        // @option autoplay: Boolean = true
        // Whether the video starts playing automatically when loaded.
        // On some browsers autoplay will only work with `muted: true`
        autoplay: !0,
        // @option loop: Boolean = true
        // Whether the video will loop back to the beginning when played.
        loop: !0,
        // @option keepAspectRatio: Boolean = true
        // Whether the video will save aspect ratio after the projection.
        // Relevant for supported browsers. See [browser compatibility](https://developer.mozilla.org/en-US/docs/Web/CSS/object-fit)
        keepAspectRatio: !0,
        // @option muted: Boolean = false
        // Whether the video starts on mute when loaded.
        muted: !1,
        // @option playsInline: Boolean = true
        // Mobile browsers will play the video right where it is instead of open it up in fullscreen mode.
        playsInline: !0
      },
      _initImage: function() {
        var t = this._url.tagName === "VIDEO", n = this._image = t ? this._url : de("video");
        if (re(n, "leaflet-image-layer"), this._zoomAnimated && re(n, "leaflet-zoom-animated"), this.options.className && re(n, this.options.className), n.onselectstart = M, n.onmousemove = M, n.onloadeddata = w(this.fire, this, "load"), t) {
          for (var s = n.getElementsByTagName("source"), c = [], y = 0; y < s.length; y++)
            c.push(s[y].src);
          this._url = s.length > 0 ? c : [n.src];
          return;
        }
        Rt(this._url) || (this._url = [this._url]), !this.options.keepAspectRatio && Object.prototype.hasOwnProperty.call(n.style, "objectFit") && (n.style.objectFit = "fill"), n.autoplay = !!this.options.autoplay, n.loop = !!this.options.loop, n.muted = !!this.options.muted, n.playsInline = !!this.options.playsInline;
        for (var B = 0; B < this._url.length; B++) {
          var G = de("source");
          G.src = this._url[B], n.appendChild(G);
        }
      }
      // @method getElement(): HTMLVideoElement
      // Returns the instance of [`HTMLVideoElement`](https://developer.mozilla.org/docs/Web/API/HTMLVideoElement)
      // used by this overlay.
    });
    function Bo(t, n, s) {
      return new ds(t, n, s);
    }
    var aa = Mn.extend({
      _initImage: function() {
        var t = this._image = this._url;
        re(t, "leaflet-image-layer"), this._zoomAnimated && re(t, "leaflet-zoom-animated"), this.options.className && re(t, this.options.className), t.onselectstart = M, t.onmousemove = M;
      }
      // @method getElement(): SVGElement
      // Returns the instance of [`SVGElement`](https://developer.mozilla.org/docs/Web/API/SVGElement)
      // used by this overlay.
    });
    function Ao(t, n, s) {
      return new aa(t, n, s);
    }
    var xi = Ke.extend({
      // @section
      // @aka DivOverlay options
      options: {
        // @option interactive: Boolean = false
        // If true, the popup/tooltip will listen to the mouse events.
        interactive: !1,
        // @option offset: Point = Point(0, 0)
        // The offset of the overlay position.
        offset: [0, 0],
        // @option className: String = ''
        // A custom CSS class name to assign to the overlay.
        className: "",
        // @option pane: String = undefined
        // `Map pane` where the overlay will be added.
        pane: void 0,
        // @option content: String|HTMLElement|Function = ''
        // Sets the HTML content of the overlay while initializing. If a function is passed the source layer will be
        // passed to the function. The function should return a `String` or `HTMLElement` to be used in the overlay.
        content: ""
      },
      initialize: function(t, n) {
        t && (t instanceof St || Rt(t)) ? (this._latlng = Mt(t), tt(this, n)) : (tt(this, t), this._source = n), this.options.content && (this._content = this.options.content);
      },
      // @method openOn(map: Map): this
      // Adds the overlay to the map.
      // Alternative to `map.openPopup(popup)`/`.openTooltip(tooltip)`.
      openOn: function(t) {
        return t = arguments.length ? t : this._source._map, t.hasLayer(this) || t.addLayer(this), this;
      },
      // @method close(): this
      // Closes the overlay.
      // Alternative to `map.closePopup(popup)`/`.closeTooltip(tooltip)`
      // and `layer.closePopup()`/`.closeTooltip()`.
      close: function() {
        return this._map && this._map.removeLayer(this), this;
      },
      // @method toggle(layer?: Layer): this
      // Opens or closes the overlay bound to layer depending on its current state.
      // Argument may be omitted only for overlay bound to layer.
      // Alternative to `layer.togglePopup()`/`.toggleTooltip()`.
      toggle: function(t) {
        return this._map ? this.close() : (arguments.length ? this._source = t : t = this._source, this._prepareOpen(), this.openOn(t._map)), this;
      },
      onAdd: function(t) {
        this._zoomAnimated = t._zoomAnimated, this._container || this._initLayout(), t._fadeAnimated && ri(this._container, 0), clearTimeout(this._removeTimeout), this.getPane().appendChild(this._container), this.update(), t._fadeAnimated && ri(this._container, 1), this.bringToFront(), this.options.interactive && (re(this._container, "leaflet-interactive"), this.addInteractiveTarget(this._container));
      },
      onRemove: function(t) {
        t._fadeAnimated ? (ri(this._container, 0), this._removeTimeout = setTimeout(w(Ce, void 0, this._container), 200)) : Ce(this._container), this.options.interactive && (Me(this._container, "leaflet-interactive"), this.removeInteractiveTarget(this._container));
      },
      // @namespace DivOverlay
      // @method getLatLng: LatLng
      // Returns the geographical point of the overlay.
      getLatLng: function() {
        return this._latlng;
      },
      // @method setLatLng(latlng: LatLng): this
      // Sets the geographical point where the overlay will open.
      setLatLng: function(t) {
        return this._latlng = Mt(t), this._map && (this._updatePosition(), this._adjustPan()), this;
      },
      // @method getContent: String|HTMLElement
      // Returns the content of the overlay.
      getContent: function() {
        return this._content;
      },
      // @method setContent(htmlContent: String|HTMLElement|Function): this
      // Sets the HTML content of the overlay. If a function is passed the source layer will be passed to the function.
      // The function should return a `String` or `HTMLElement` to be used in the overlay.
      setContent: function(t) {
        return this._content = t, this.update(), this;
      },
      // @method getElement: String|HTMLElement
      // Returns the HTML container of the overlay.
      getElement: function() {
        return this._container;
      },
      // @method update: null
      // Updates the overlay content, layout and position. Useful for updating the overlay after something inside changed, e.g. image loaded.
      update: function() {
        this._map && (this._container.style.visibility = "hidden", this._updateContent(), this._updateLayout(), this._updatePosition(), this._container.style.visibility = "", this._adjustPan());
      },
      getEvents: function() {
        var t = {
          zoom: this._updatePosition,
          viewreset: this._updatePosition
        };
        return this._zoomAnimated && (t.zoomanim = this._animateZoom), t;
      },
      // @method isOpen: Boolean
      // Returns `true` when the overlay is visible on the map.
      isOpen: function() {
        return !!this._map && this._map.hasLayer(this);
      },
      // @method bringToFront: this
      // Brings this overlay in front of other overlays (in the same map pane).
      bringToFront: function() {
        return this._map && _n(this._container), this;
      },
      // @method bringToBack: this
      // Brings this overlay to the back of other overlays (in the same map pane).
      bringToBack: function() {
        return this._map && yn(this._container), this;
      },
      // prepare bound overlay to open: update latlng pos / content source (for FeatureGroup)
      _prepareOpen: function(t) {
        var n = this._source;
        if (!n._map)
          return !1;
        if (n instanceof bi) {
          n = null;
          var s = this._source._layers;
          for (var c in s)
            if (s[c]._map) {
              n = s[c];
              break;
            }
          if (!n)
            return !1;
          this._source = n;
        }
        if (!t)
          if (n.getCenter)
            t = n.getCenter();
          else if (n.getLatLng)
            t = n.getLatLng();
          else if (n.getBounds)
            t = n.getBounds().getCenter();
          else
            throw new Error("Unable to get source layer LatLng.");
        return this.setLatLng(t), this._map && this.update(), !0;
      },
      _updateContent: function() {
        if (this._content) {
          var t = this._contentNode, n = typeof this._content == "function" ? this._content(this._source || this) : this._content;
          if (typeof n == "string")
            t.innerHTML = n;
          else {
            for (; t.hasChildNodes(); )
              t.removeChild(t.firstChild);
            t.appendChild(n);
          }
          this.fire("contentupdate");
        }
      },
      _updatePosition: function() {
        if (this._map) {
          var t = this._map.latLngToLayerPoint(this._latlng), n = lt(this.options.offset), s = this._getAnchor();
          this._zoomAnimated ? Ae(this._container, t.add(s)) : n = n.add(t).add(s);
          var c = this._containerBottom = -n.y, y = this._containerLeft = -Math.round(this._containerWidth / 2) + n.x;
          this._container.style.bottom = c + "px", this._container.style.left = y + "px";
        }
      },
      _getAnchor: function() {
        return [0, 0];
      }
    });
    le.include({
      _initOverlay: function(t, n, s, c) {
        var y = n;
        return y instanceof t || (y = new t(c).setContent(n)), s && y.setLatLng(s), y;
      }
    }), Ke.include({
      _initOverlay: function(t, n, s, c) {
        var y = s;
        return y instanceof t ? (tt(y, c), y._source = this) : (y = n && !c ? n : new t(c, this), y.setContent(s)), y;
      }
    });
    var Gn = xi.extend({
      // @section
      // @aka Popup options
      options: {
        // @option pane: String = 'popupPane'
        // `Map pane` where the popup will be added.
        pane: "popupPane",
        // @option offset: Point = Point(0, 7)
        // The offset of the popup position.
        offset: [0, 7],
        // @option maxWidth: Number = 300
        // Max width of the popup, in pixels.
        maxWidth: 300,
        // @option minWidth: Number = 50
        // Min width of the popup, in pixels.
        minWidth: 50,
        // @option maxHeight: Number = null
        // If set, creates a scrollable container of the given height
        // inside a popup if its content exceeds it.
        // The scrollable container can be styled using the
        // `leaflet-popup-scrolled` CSS class selector.
        maxHeight: null,
        // @option autoPan: Boolean = true
        // Set it to `false` if you don't want the map to do panning animation
        // to fit the opened popup.
        autoPan: !0,
        // @option autoPanPaddingTopLeft: Point = null
        // The margin between the popup and the top left corner of the map
        // view after autopanning was performed.
        autoPanPaddingTopLeft: null,
        // @option autoPanPaddingBottomRight: Point = null
        // The margin between the popup and the bottom right corner of the map
        // view after autopanning was performed.
        autoPanPaddingBottomRight: null,
        // @option autoPanPadding: Point = Point(5, 5)
        // Equivalent of setting both top left and bottom right autopan padding to the same value.
        autoPanPadding: [5, 5],
        // @option keepInView: Boolean = false
        // Set it to `true` if you want to prevent users from panning the popup
        // off of the screen while it is open.
        keepInView: !1,
        // @option closeButton: Boolean = true
        // Controls the presence of a close button in the popup.
        closeButton: !0,
        // @option autoClose: Boolean = true
        // Set it to `false` if you want to override the default behavior of
        // the popup closing when another popup is opened.
        autoClose: !0,
        // @option closeOnEscapeKey: Boolean = true
        // Set it to `false` if you want to override the default behavior of
        // the ESC key for closing of the popup.
        closeOnEscapeKey: !0,
        // @option closeOnClick: Boolean = *
        // Set it if you want to override the default behavior of the popup closing when user clicks
        // on the map. Defaults to the map's [`closePopupOnClick`](#map-closepopuponclick) option.
        // @option className: String = ''
        // A custom CSS class name to assign to the popup.
        className: ""
      },
      // @namespace Popup
      // @method openOn(map: Map): this
      // Alternative to `map.openPopup(popup)`.
      // Adds the popup to the map and closes the previous one.
      openOn: function(t) {
        return t = arguments.length ? t : this._source._map, !t.hasLayer(this) && t._popup && t._popup.options.autoClose && t.removeLayer(t._popup), t._popup = this, xi.prototype.openOn.call(this, t);
      },
      onAdd: function(t) {
        xi.prototype.onAdd.call(this, t), t.fire("popupopen", { popup: this }), this._source && (this._source.fire("popupopen", { popup: this }, !0), this._source instanceof oi || this._source.on("preclick", en));
      },
      onRemove: function(t) {
        xi.prototype.onRemove.call(this, t), t.fire("popupclose", { popup: this }), this._source && (this._source.fire("popupclose", { popup: this }, !0), this._source instanceof oi || this._source.off("preclick", en));
      },
      getEvents: function() {
        var t = xi.prototype.getEvents.call(this);
        return (this.options.closeOnClick !== void 0 ? this.options.closeOnClick : this._map.options.closePopupOnClick) && (t.preclick = this.close), this.options.keepInView && (t.moveend = this._adjustPan), t;
      },
      _initLayout: function() {
        var t = "leaflet-popup", n = this._container = de(
          "div",
          t + " " + (this.options.className || "") + " leaflet-zoom-animated"
        ), s = this._wrapper = de("div", t + "-content-wrapper", n);
        if (this._contentNode = de("div", t + "-content", s), Nn(n), Kr(this._contentNode), Qt(n, "contextmenu", en), this._tipContainer = de("div", t + "-tip-container", n), this._tip = de("div", t + "-tip", this._tipContainer), this.options.closeButton) {
          var c = this._closeButton = de("a", t + "-close-button", n);
          c.setAttribute("role", "button"), c.setAttribute("aria-label", "Close popup"), c.href = "#close", c.innerHTML = '<span aria-hidden="true">&#215;</span>', Qt(c, "click", function(y) {
            Ie(y), this.close();
          }, this);
        }
      },
      _updateLayout: function() {
        var t = this._contentNode, n = t.style;
        n.width = "", n.whiteSpace = "nowrap";
        var s = t.offsetWidth;
        s = Math.min(s, this.options.maxWidth), s = Math.max(s, this.options.minWidth), n.width = s + 1 + "px", n.whiteSpace = "", n.height = "";
        var c = t.offsetHeight, y = this.options.maxHeight, B = "leaflet-popup-scrolled";
        y && c > y ? (n.height = y + "px", re(t, B)) : Me(t, B), this._containerWidth = this._container.offsetWidth;
      },
      _animateZoom: function(t) {
        var n = this._map._latLngToNewLayerPoint(this._latlng, t.zoom, t.center), s = this._getAnchor();
        Ae(this._container, n.add(s));
      },
      _adjustPan: function() {
        if (this.options.autoPan) {
          if (this._map._panAnim && this._map._panAnim.stop(), this._autopanning) {
            this._autopanning = !1;
            return;
          }
          var t = this._map, n = parseInt(Vi(this._container, "marginBottom"), 10) || 0, s = this._container.offsetHeight + n, c = this._containerWidth, y = new Ot(this._containerLeft, -s - this._containerBottom);
          y._add($i(this._container));
          var B = t.layerPointToContainerPoint(y), G = lt(this.options.autoPanPadding), rt = lt(this.options.autoPanPaddingTopLeft || G), ht = lt(this.options.autoPanPaddingBottomRight || G), gt = t.getSize(), Tt = 0, Ht = 0;
          B.x + c + ht.x > gt.x && (Tt = B.x + c - gt.x + ht.x), B.x - Tt - rt.x < 0 && (Tt = B.x - rt.x), B.y + s + ht.y > gt.y && (Ht = B.y + s - gt.y + ht.y), B.y - Ht - rt.y < 0 && (Ht = B.y - rt.y), (Tt || Ht) && (this.options.keepInView && (this._autopanning = !0), t.fire("autopanstart").panBy([Tt, Ht]));
        }
      },
      _getAnchor: function() {
        return lt(this._source && this._source._getPopupAnchor ? this._source._getPopupAnchor() : [0, 0]);
      }
    }), So = function(t, n) {
      return new Gn(t, n);
    };
    le.mergeOptions({
      closePopupOnClick: !0
    }), le.include({
      // @method openPopup(popup: Popup): this
      // Opens the specified popup while closing the previously opened (to make sure only one is opened at one time for usability).
      // @alternative
      // @method openPopup(content: String|HTMLElement, latlng: LatLng, options?: Popup options): this
      // Creates a popup with the specified content and options and opens it in the given point on a map.
      openPopup: function(t, n, s) {
        return this._initOverlay(Gn, t, n, s).openOn(this), this;
      },
      // @method closePopup(popup?: Popup): this
      // Closes the popup previously opened with [openPopup](#map-openpopup) (or the given one).
      closePopup: function(t) {
        return t = arguments.length ? t : this._popup, t && t.close(), this;
      }
    }), Ke.include({
      // @method bindPopup(content: String|HTMLElement|Function|Popup, options?: Popup options): this
      // Binds a popup to the layer with the passed `content` and sets up the
      // necessary event listeners. If a `Function` is passed it will receive
      // the layer as the first argument and should return a `String` or `HTMLElement`.
      bindPopup: function(t, n) {
        return this._popup = this._initOverlay(Gn, this._popup, t, n), this._popupHandlersAdded || (this.on({
          click: this._openPopup,
          keypress: this._onKeyPress,
          remove: this.closePopup,
          move: this._movePopup
        }), this._popupHandlersAdded = !0), this;
      },
      // @method unbindPopup(): this
      // Removes the popup previously bound with `bindPopup`.
      unbindPopup: function() {
        return this._popup && (this.off({
          click: this._openPopup,
          keypress: this._onKeyPress,
          remove: this.closePopup,
          move: this._movePopup
        }), this._popupHandlersAdded = !1, this._popup = null), this;
      },
      // @method openPopup(latlng?: LatLng): this
      // Opens the bound popup at the specified `latlng` or at the default popup anchor if no `latlng` is passed.
      openPopup: function(t) {
        return this._popup && (this instanceof bi || (this._popup._source = this), this._popup._prepareOpen(t || this._latlng) && this._popup.openOn(this._map)), this;
      },
      // @method closePopup(): this
      // Closes the popup bound to this layer if it is open.
      closePopup: function() {
        return this._popup && this._popup.close(), this;
      },
      // @method togglePopup(): this
      // Opens or closes the popup bound to this layer depending on its current state.
      togglePopup: function() {
        return this._popup && this._popup.toggle(this), this;
      },
      // @method isPopupOpen(): boolean
      // Returns `true` if the popup bound to this layer is currently open.
      isPopupOpen: function() {
        return this._popup ? this._popup.isOpen() : !1;
      },
      // @method setPopupContent(content: String|HTMLElement|Popup): this
      // Sets the content of the popup bound to this layer.
      setPopupContent: function(t) {
        return this._popup && this._popup.setContent(t), this;
      },
      // @method getPopup(): Popup
      // Returns the popup bound to this layer.
      getPopup: function() {
        return this._popup;
      },
      _openPopup: function(t) {
        if (!(!this._popup || !this._map)) {
          nn(t);
          var n = t.layer || t.target;
          if (this._popup._source === n && !(n instanceof oi)) {
            this._map.hasLayer(this._popup) ? this.closePopup() : this.openPopup(t.latlng);
            return;
          }
          this._popup._source = n, this.openPopup(t.latlng);
        }
      },
      _movePopup: function(t) {
        this._popup.setLatLng(t.latlng);
      },
      _onKeyPress: function(t) {
        t.originalEvent.keyCode === 13 && this._openPopup(t);
      }
    });
    var gr = xi.extend({
      // @section
      // @aka Tooltip options
      options: {
        // @option pane: String = 'tooltipPane'
        // `Map pane` where the tooltip will be added.
        pane: "tooltipPane",
        // @option offset: Point = Point(0, 0)
        // Optional offset of the tooltip position.
        offset: [0, 0],
        // @option direction: String = 'auto'
        // Direction where to open the tooltip. Possible values are: `right`, `left`,
        // `top`, `bottom`, `center`, `auto`.
        // `auto` will dynamically switch between `right` and `left` according to the tooltip
        // position on the map.
        direction: "auto",
        // @option permanent: Boolean = false
        // Whether to open the tooltip permanently or only on mouseover.
        permanent: !1,
        // @option sticky: Boolean = false
        // If true, the tooltip will follow the mouse instead of being fixed at the feature center.
        sticky: !1,
        // @option opacity: Number = 0.9
        // Tooltip container opacity.
        opacity: 0.9
      },
      onAdd: function(t) {
        xi.prototype.onAdd.call(this, t), this.setOpacity(this.options.opacity), t.fire("tooltipopen", { tooltip: this }), this._source && (this.addEventParent(this._source), this._source.fire("tooltipopen", { tooltip: this }, !0));
      },
      onRemove: function(t) {
        xi.prototype.onRemove.call(this, t), t.fire("tooltipclose", { tooltip: this }), this._source && (this.removeEventParent(this._source), this._source.fire("tooltipclose", { tooltip: this }, !0));
      },
      getEvents: function() {
        var t = xi.prototype.getEvents.call(this);
        return this.options.permanent || (t.preclick = this.close), t;
      },
      _initLayout: function() {
        var t = "leaflet-tooltip", n = t + " " + (this.options.className || "") + " leaflet-zoom-" + (this._zoomAnimated ? "animated" : "hide");
        this._contentNode = this._container = de("div", n), this._container.setAttribute("role", "tooltip"), this._container.setAttribute("id", "leaflet-tooltip-" + x(this));
      },
      _updateLayout: function() {
      },
      _adjustPan: function() {
      },
      _setPosition: function(t) {
        var n, s, c = this._map, y = this._container, B = c.latLngToContainerPoint(c.getCenter()), G = c.layerPointToContainerPoint(t), rt = this.options.direction, ht = y.offsetWidth, gt = y.offsetHeight, Tt = lt(this.options.offset), Ht = this._getAnchor();
        rt === "top" ? (n = ht / 2, s = gt) : rt === "bottom" ? (n = ht / 2, s = 0) : rt === "center" ? (n = ht / 2, s = gt / 2) : rt === "right" ? (n = 0, s = gt / 2) : rt === "left" ? (n = ht, s = gt / 2) : G.x < B.x ? (rt = "right", n = 0, s = gt / 2) : (rt = "left", n = ht + (Tt.x + Ht.x) * 2, s = gt / 2), t = t.subtract(lt(n, s, !0)).add(Tt).add(Ht), Me(y, "leaflet-tooltip-right"), Me(y, "leaflet-tooltip-left"), Me(y, "leaflet-tooltip-top"), Me(y, "leaflet-tooltip-bottom"), re(y, "leaflet-tooltip-" + rt), Ae(y, t);
      },
      _updatePosition: function() {
        var t = this._map.latLngToLayerPoint(this._latlng);
        this._setPosition(t);
      },
      setOpacity: function(t) {
        this.options.opacity = t, this._container && ri(this._container, t);
      },
      _animateZoom: function(t) {
        var n = this._map._latLngToNewLayerPoint(this._latlng, t.zoom, t.center);
        this._setPosition(n);
      },
      _getAnchor: function() {
        return lt(this._source && this._source._getTooltipAnchor && !this.options.sticky ? this._source._getTooltipAnchor() : [0, 0]);
      }
    }), Po = function(t, n) {
      return new gr(t, n);
    };
    le.include({
      // @method openTooltip(tooltip: Tooltip): this
      // Opens the specified tooltip.
      // @alternative
      // @method openTooltip(content: String|HTMLElement, latlng: LatLng, options?: Tooltip options): this
      // Creates a tooltip with the specified content and options and open it.
      openTooltip: function(t, n, s) {
        return this._initOverlay(gr, t, n, s).openOn(this), this;
      },
      // @method closeTooltip(tooltip: Tooltip): this
      // Closes the tooltip given as parameter.
      closeTooltip: function(t) {
        return t.close(), this;
      }
    }), Ke.include({
      // @method bindTooltip(content: String|HTMLElement|Function|Tooltip, options?: Tooltip options): this
      // Binds a tooltip to the layer with the passed `content` and sets up the
      // necessary event listeners. If a `Function` is passed it will receive
      // the layer as the first argument and should return a `String` or `HTMLElement`.
      bindTooltip: function(t, n) {
        return this._tooltip && this.isTooltipOpen() && this.unbindTooltip(), this._tooltip = this._initOverlay(gr, this._tooltip, t, n), this._initTooltipInteractions(), this._tooltip.options.permanent && this._map && this._map.hasLayer(this) && this.openTooltip(), this;
      },
      // @method unbindTooltip(): this
      // Removes the tooltip previously bound with `bindTooltip`.
      unbindTooltip: function() {
        return this._tooltip && (this._initTooltipInteractions(!0), this.closeTooltip(), this._tooltip = null), this;
      },
      _initTooltipInteractions: function(t) {
        if (!(!t && this._tooltipHandlersAdded)) {
          var n = t ? "off" : "on", s = {
            remove: this.closeTooltip,
            move: this._moveTooltip
          };
          this._tooltip.options.permanent ? s.add = this._openTooltip : (s.mouseover = this._openTooltip, s.mouseout = this.closeTooltip, s.click = this._openTooltip, this._map ? this._addFocusListeners() : s.add = this._addFocusListeners), this._tooltip.options.sticky && (s.mousemove = this._moveTooltip), this[n](s), this._tooltipHandlersAdded = !t;
        }
      },
      // @method openTooltip(latlng?: LatLng): this
      // Opens the bound tooltip at the specified `latlng` or at the default tooltip anchor if no `latlng` is passed.
      openTooltip: function(t) {
        return this._tooltip && (this instanceof bi || (this._tooltip._source = this), this._tooltip._prepareOpen(t) && (this._tooltip.openOn(this._map), this.getElement ? this._setAriaDescribedByOnLayer(this) : this.eachLayer && this.eachLayer(this._setAriaDescribedByOnLayer, this))), this;
      },
      // @method closeTooltip(): this
      // Closes the tooltip bound to this layer if it is open.
      closeTooltip: function() {
        if (this._tooltip)
          return this._tooltip.close();
      },
      // @method toggleTooltip(): this
      // Opens or closes the tooltip bound to this layer depending on its current state.
      toggleTooltip: function() {
        return this._tooltip && this._tooltip.toggle(this), this;
      },
      // @method isTooltipOpen(): boolean
      // Returns `true` if the tooltip bound to this layer is currently open.
      isTooltipOpen: function() {
        return this._tooltip.isOpen();
      },
      // @method setTooltipContent(content: String|HTMLElement|Tooltip): this
      // Sets the content of the tooltip bound to this layer.
      setTooltipContent: function(t) {
        return this._tooltip && this._tooltip.setContent(t), this;
      },
      // @method getTooltip(): Tooltip
      // Returns the tooltip bound to this layer.
      getTooltip: function() {
        return this._tooltip;
      },
      _addFocusListeners: function() {
        this.getElement ? this._addFocusListenersOnLayer(this) : this.eachLayer && this.eachLayer(this._addFocusListenersOnLayer, this);
      },
      _addFocusListenersOnLayer: function(t) {
        var n = typeof t.getElement == "function" && t.getElement();
        n && (Qt(n, "focus", function() {
          this._tooltip._source = t, this.openTooltip();
        }, this), Qt(n, "blur", this.closeTooltip, this));
      },
      _setAriaDescribedByOnLayer: function(t) {
        var n = typeof t.getElement == "function" && t.getElement();
        n && n.setAttribute("aria-describedby", this._tooltip._container.id);
      },
      _openTooltip: function(t) {
        if (!(!this._tooltip || !this._map)) {
          if (this._map.dragging && this._map.dragging.moving() && !this._openOnceFlag) {
            this._openOnceFlag = !0;
            var n = this;
            this._map.once("moveend", function() {
              n._openOnceFlag = !1, n._openTooltip(t);
            });
            return;
          }
          this._tooltip._source = t.layer || t.target, this.openTooltip(this._tooltip.options.sticky ? t.latlng : void 0);
        }
      },
      _moveTooltip: function(t) {
        var n = t.latlng, s, c;
        this._tooltip.options.sticky && t.originalEvent && (s = this._map.mouseEventToContainerPoint(t.originalEvent), c = this._map.containerPointToLayerPoint(s), n = this._map.layerPointToLatLng(c)), this._tooltip.setLatLng(n);
      }
    });
    var Zi = Cn.extend({
      options: {
        // @section
        // @aka DivIcon options
        iconSize: [12, 12],
        // also can be set through CSS
        // iconAnchor: (Point),
        // popupAnchor: (Point),
        // @option html: String|HTMLElement = ''
        // Custom HTML code to put inside the div element, empty by default. Alternatively,
        // an instance of `HTMLElement`.
        html: !1,
        // @option bgPos: Point = [0, 0]
        // Optional relative position of the background, in pixels
        bgPos: null,
        className: "leaflet-div-icon"
      },
      createIcon: function(t) {
        var n = t && t.tagName === "DIV" ? t : document.createElement("div"), s = this.options;
        if (s.html instanceof Element ? (In(n), n.appendChild(s.html)) : n.innerHTML = s.html !== !1 ? s.html : "", s.bgPos) {
          var c = lt(s.bgPos);
          n.style.backgroundPosition = -c.x + "px " + -c.y + "px";
        }
        return this._setIconStyles(n, "icon"), n;
      },
      createShadow: function() {
        return null;
      }
    });
    function Zn(t) {
      return new Zi(t);
    }
    Cn.Default = $n;
    var qn = Ke.extend({
      // @section
      // @aka GridLayer options
      options: {
        // @option tileSize: Number|Point = 256
        // Width and height of tiles in the grid. Use a number if width and height are equal, or `L.point(width, height)` otherwise.
        tileSize: 256,
        // @option opacity: Number = 1.0
        // Opacity of the tiles. Can be used in the `createTile()` function.
        opacity: 1,
        // @option updateWhenIdle: Boolean = (depends)
        // Load new tiles only when panning ends.
        // `true` by default on mobile browsers, in order to avoid too many requests and keep smooth navigation.
        // `false` otherwise in order to display new tiles _during_ panning, since it is easy to pan outside the
        // [`keepBuffer`](#gridlayer-keepbuffer) option in desktop browsers.
        updateWhenIdle: Gt.mobile,
        // @option updateWhenZooming: Boolean = true
        // By default, a smooth zoom animation (during a [touch zoom](#map-touchzoom) or a [`flyTo()`](#map-flyto)) will update grid layers every integer zoom level. Setting this option to `false` will update the grid layer only when the smooth animation ends.
        updateWhenZooming: !0,
        // @option updateInterval: Number = 200
        // Tiles will not update more than once every `updateInterval` milliseconds when panning.
        updateInterval: 200,
        // @option zIndex: Number = 1
        // The explicit zIndex of the tile layer.
        zIndex: 1,
        // @option bounds: LatLngBounds = undefined
        // If set, tiles will only be loaded inside the set `LatLngBounds`.
        bounds: null,
        // @option minZoom: Number = 0
        // The minimum zoom level down to which this layer will be displayed (inclusive).
        minZoom: 0,
        // @option maxZoom: Number = undefined
        // The maximum zoom level up to which this layer will be displayed (inclusive).
        maxZoom: void 0,
        // @option maxNativeZoom: Number = undefined
        // Maximum zoom number the tile source has available. If it is specified,
        // the tiles on all zoom levels higher than `maxNativeZoom` will be loaded
        // from `maxNativeZoom` level and auto-scaled.
        maxNativeZoom: void 0,
        // @option minNativeZoom: Number = undefined
        // Minimum zoom number the tile source has available. If it is specified,
        // the tiles on all zoom levels lower than `minNativeZoom` will be loaded
        // from `minNativeZoom` level and auto-scaled.
        minNativeZoom: void 0,
        // @option noWrap: Boolean = false
        // Whether the layer is wrapped around the antimeridian. If `true`, the
        // GridLayer will only be displayed once at low zoom levels. Has no
        // effect when the [map CRS](#map-crs) doesn't wrap around. Can be used
        // in combination with [`bounds`](#gridlayer-bounds) to prevent requesting
        // tiles outside the CRS limits.
        noWrap: !1,
        // @option pane: String = 'tilePane'
        // `Map pane` where the grid layer will be added.
        pane: "tilePane",
        // @option className: String = ''
        // A custom class name to assign to the tile layer. Empty by default.
        className: "",
        // @option keepBuffer: Number = 2
        // When panning the map, keep this many rows and columns of tiles before unloading them.
        keepBuffer: 2
      },
      initialize: function(t) {
        tt(this, t);
      },
      onAdd: function() {
        this._initContainer(), this._levels = {}, this._tiles = {}, this._resetView();
      },
      beforeAdd: function(t) {
        t._addZoomLimit(this);
      },
      onRemove: function(t) {
        this._removeAllTiles(), Ce(this._container), t._removeZoomLimit(this), this._container = null, this._tileZoom = void 0;
      },
      // @method bringToFront: this
      // Brings the tile layer to the top of all tile layers.
      bringToFront: function() {
        return this._map && (_n(this._container), this._setAutoZIndex(Math.max)), this;
      },
      // @method bringToBack: this
      // Brings the tile layer to the bottom of all tile layers.
      bringToBack: function() {
        return this._map && (yn(this._container), this._setAutoZIndex(Math.min)), this;
      },
      // @method getContainer: HTMLElement
      // Returns the HTML element that contains the tiles for this layer.
      getContainer: function() {
        return this._container;
      },
      // @method setOpacity(opacity: Number): this
      // Changes the [opacity](#gridlayer-opacity) of the grid layer.
      setOpacity: function(t) {
        return this.options.opacity = t, this._updateOpacity(), this;
      },
      // @method setZIndex(zIndex: Number): this
      // Changes the [zIndex](#gridlayer-zindex) of the grid layer.
      setZIndex: function(t) {
        return this.options.zIndex = t, this._updateZIndex(), this;
      },
      // @method isLoading: Boolean
      // Returns `true` if any tile in the grid layer has not finished loading.
      isLoading: function() {
        return this._loading;
      },
      // @method redraw: this
      // Causes the layer to clear all the tiles and request them again.
      redraw: function() {
        if (this._map) {
          this._removeAllTiles();
          var t = this._clampZoom(this._map.getZoom());
          t !== this._tileZoom && (this._tileZoom = t, this._updateLevels()), this._update();
        }
        return this;
      },
      getEvents: function() {
        var t = {
          viewprereset: this._invalidateAll,
          viewreset: this._resetView,
          zoom: this._resetView,
          moveend: this._onMoveEnd
        };
        return this.options.updateWhenIdle || (this._onMove || (this._onMove = S(this._onMoveEnd, this.options.updateInterval, this)), t.move = this._onMove), this._zoomAnimated && (t.zoomanim = this._animateZoom), t;
      },
      // @section Extension methods
      // Layers extending `GridLayer` shall reimplement the following method.
      // @method createTile(coords: Object, done?: Function): HTMLElement
      // Called only internally, must be overridden by classes extending `GridLayer`.
      // Returns the `HTMLElement` corresponding to the given `coords`. If the `done` callback
      // is specified, it must be called when the tile has finished loading and drawing.
      createTile: function() {
        return document.createElement("div");
      },
      // @section
      // @method getTileSize: Point
      // Normalizes the [tileSize option](#gridlayer-tilesize) into a point. Used by the `createTile()` method.
      getTileSize: function() {
        var t = this.options.tileSize;
        return t instanceof Ot ? t : new Ot(t, t);
      },
      _updateZIndex: function() {
        this._container && this.options.zIndex !== void 0 && this.options.zIndex !== null && (this._container.style.zIndex = this.options.zIndex);
      },
      _setAutoZIndex: function(t) {
        for (var n = this.getPane().children, s = -t(-1 / 0, 1 / 0), c = 0, y = n.length, B; c < y; c++)
          B = n[c].style.zIndex, n[c] !== this._container && B && (s = t(s, +B));
        isFinite(s) && (this.options.zIndex = s + t(-1, 1), this._updateZIndex());
      },
      _updateOpacity: function() {
        if (this._map && !Gt.ielt9) {
          ri(this._container, this.options.opacity);
          var t = +/* @__PURE__ */ new Date(), n = !1, s = !1;
          for (var c in this._tiles) {
            var y = this._tiles[c];
            if (!(!y.current || !y.loaded)) {
              var B = Math.min(1, (t - y.loaded) / 200);
              ri(y.el, B), B < 1 ? n = !0 : (y.active ? s = !0 : this._onOpaqueTile(y), y.active = !0);
            }
          }
          s && !this._noPrune && this._pruneTiles(), n && (ge(this._fadeFrame), this._fadeFrame = Wt(this._updateOpacity, this));
        }
      },
      _onOpaqueTile: M,
      _initContainer: function() {
        this._container || (this._container = de("div", "leaflet-layer " + (this.options.className || "")), this._updateZIndex(), this.options.opacity < 1 && this._updateOpacity(), this.getPane().appendChild(this._container));
      },
      _updateLevels: function() {
        var t = this._tileZoom, n = this.options.maxZoom;
        if (t !== void 0) {
          for (var s in this._levels)
            s = Number(s), this._levels[s].el.children.length || s === t ? (this._levels[s].el.style.zIndex = n - Math.abs(t - s), this._onUpdateLevel(s)) : (Ce(this._levels[s].el), this._removeTilesAtZoom(s), this._onRemoveLevel(s), delete this._levels[s]);
          var c = this._levels[t], y = this._map;
          return c || (c = this._levels[t] = {}, c.el = de("div", "leaflet-tile-container leaflet-zoom-animated", this._container), c.el.style.zIndex = n, c.origin = y.project(y.unproject(y.getPixelOrigin()), t).round(), c.zoom = t, this._setZoomTransform(c, y.getCenter(), y.getZoom()), M(c.el.offsetWidth), this._onCreateLevel(c)), this._level = c, c;
        }
      },
      _onUpdateLevel: M,
      _onRemoveLevel: M,
      _onCreateLevel: M,
      _pruneTiles: function() {
        if (this._map) {
          var t, n, s = this._map.getZoom();
          if (s > this.options.maxZoom || s < this.options.minZoom) {
            this._removeAllTiles();
            return;
          }
          for (t in this._tiles)
            n = this._tiles[t], n.retain = n.current;
          for (t in this._tiles)
            if (n = this._tiles[t], n.current && !n.active) {
              var c = n.coords;
              this._retainParent(c.x, c.y, c.z, c.z - 5) || this._retainChildren(c.x, c.y, c.z, c.z + 2);
            }
          for (t in this._tiles)
            this._tiles[t].retain || this._removeTile(t);
        }
      },
      _removeTilesAtZoom: function(t) {
        for (var n in this._tiles)
          this._tiles[n].coords.z === t && this._removeTile(n);
      },
      _removeAllTiles: function() {
        for (var t in this._tiles)
          this._removeTile(t);
      },
      _invalidateAll: function() {
        for (var t in this._levels)
          Ce(this._levels[t].el), this._onRemoveLevel(Number(t)), delete this._levels[t];
        this._removeAllTiles(), this._tileZoom = void 0;
      },
      _retainParent: function(t, n, s, c) {
        var y = Math.floor(t / 2), B = Math.floor(n / 2), G = s - 1, rt = new Ot(+y, +B);
        rt.z = +G;
        var ht = this._tileCoordsToKey(rt), gt = this._tiles[ht];
        return gt && gt.active ? (gt.retain = !0, !0) : (gt && gt.loaded && (gt.retain = !0), G > c ? this._retainParent(y, B, G, c) : !1);
      },
      _retainChildren: function(t, n, s, c) {
        for (var y = 2 * t; y < 2 * t + 2; y++)
          for (var B = 2 * n; B < 2 * n + 2; B++) {
            var G = new Ot(y, B);
            G.z = s + 1;
            var rt = this._tileCoordsToKey(G), ht = this._tiles[rt];
            if (ht && ht.active) {
              ht.retain = !0;
              continue;
            } else ht && ht.loaded && (ht.retain = !0);
            s + 1 < c && this._retainChildren(y, B, s + 1, c);
          }
      },
      _resetView: function(t) {
        var n = t && (t.pinch || t.flyTo);
        this._setView(this._map.getCenter(), this._map.getZoom(), n, n);
      },
      _animateZoom: function(t) {
        this._setView(t.center, t.zoom, !0, t.noUpdate);
      },
      _clampZoom: function(t) {
        var n = this.options;
        return n.minNativeZoom !== void 0 && t < n.minNativeZoom ? n.minNativeZoom : n.maxNativeZoom !== void 0 && n.maxNativeZoom < t ? n.maxNativeZoom : t;
      },
      _setView: function(t, n, s, c) {
        var y = Math.round(n);
        this.options.maxZoom !== void 0 && y > this.options.maxZoom || this.options.minZoom !== void 0 && y < this.options.minZoom ? y = void 0 : y = this._clampZoom(y);
        var B = this.options.updateWhenZooming && y !== this._tileZoom;
        (!c || B) && (this._tileZoom = y, this._abortLoading && this._abortLoading(), this._updateLevels(), this._resetGrid(), y !== void 0 && this._update(t), s || this._pruneTiles(), this._noPrune = !!s), this._setZoomTransforms(t, n);
      },
      _setZoomTransforms: function(t, n) {
        for (var s in this._levels)
          this._setZoomTransform(this._levels[s], t, n);
      },
      _setZoomTransform: function(t, n, s) {
        var c = this._map.getZoomScale(s, t.zoom), y = t.origin.multiplyBy(c).subtract(this._map._getNewPixelOrigin(n, s)).round();
        Gt.any3d ? tn(t.el, y, c) : Ae(t.el, y);
      },
      _resetGrid: function() {
        var t = this._map, n = t.options.crs, s = this._tileSize = this.getTileSize(), c = this._tileZoom, y = this._map.getPixelWorldBounds(this._tileZoom);
        y && (this._globalTileRange = this._pxBoundsToTileRange(y)), this._wrapX = n.wrapLng && !this.options.noWrap && [
          Math.floor(t.project([0, n.wrapLng[0]], c).x / s.x),
          Math.ceil(t.project([0, n.wrapLng[1]], c).x / s.y)
        ], this._wrapY = n.wrapLat && !this.options.noWrap && [
          Math.floor(t.project([n.wrapLat[0], 0], c).y / s.x),
          Math.ceil(t.project([n.wrapLat[1], 0], c).y / s.y)
        ];
      },
      _onMoveEnd: function() {
        !this._map || this._map._animatingZoom || this._update();
      },
      _getTiledPixelBounds: function(t) {
        var n = this._map, s = n._animatingZoom ? Math.max(n._animateToZoom, n.getZoom()) : n.getZoom(), c = n.getZoomScale(s, this._tileZoom), y = n.project(t, this._tileZoom).floor(), B = n.getSize().divideBy(c * 2);
        return new Bt(y.subtract(B), y.add(B));
      },
      // Private method to load tiles in the grid's active zoom level according to map bounds
      _update: function(t) {
        var n = this._map;
        if (n) {
          var s = this._clampZoom(n.getZoom());
          if (t === void 0 && (t = n.getCenter()), this._tileZoom !== void 0) {
            var c = this._getTiledPixelBounds(t), y = this._pxBoundsToTileRange(c), B = y.getCenter(), G = [], rt = this.options.keepBuffer, ht = new Bt(
              y.getBottomLeft().subtract([rt, -rt]),
              y.getTopRight().add([rt, -rt])
            );
            if (!(isFinite(y.min.x) && isFinite(y.min.y) && isFinite(y.max.x) && isFinite(y.max.y)))
              throw new Error("Attempted to load an infinite number of tiles");
            for (var gt in this._tiles) {
              var Tt = this._tiles[gt].coords;
              (Tt.z !== this._tileZoom || !ht.contains(new Ot(Tt.x, Tt.y))) && (this._tiles[gt].current = !1);
            }
            if (Math.abs(s - this._tileZoom) > 1) {
              this._setView(t, s);
              return;
            }
            for (var Ht = y.min.y; Ht <= y.max.y; Ht++)
              for (var se = y.min.x; se <= y.max.x; se++) {
                var Ue = new Ot(se, Ht);
                if (Ue.z = this._tileZoom, !!this._isValidTile(Ue)) {
                  var Oe = this._tiles[this._tileCoordsToKey(Ue)];
                  Oe ? Oe.current = !0 : G.push(Ue);
                }
              }
            if (G.sort(function(We, Hi) {
              return We.distanceTo(B) - Hi.distanceTo(B);
            }), G.length !== 0) {
              this._loading || (this._loading = !0, this.fire("loading"));
              var ui = document.createDocumentFragment();
              for (se = 0; se < G.length; se++)
                this._addTile(G[se], ui);
              this._level.el.appendChild(ui);
            }
          }
        }
      },
      _isValidTile: function(t) {
        var n = this._map.options.crs;
        if (!n.infinite) {
          var s = this._globalTileRange;
          if (!n.wrapLng && (t.x < s.min.x || t.x > s.max.x) || !n.wrapLat && (t.y < s.min.y || t.y > s.max.y))
            return !1;
        }
        if (!this.options.bounds)
          return !0;
        var c = this._tileCoordsToBounds(t);
        return jt(this.options.bounds).overlaps(c);
      },
      _keyToBounds: function(t) {
        return this._tileCoordsToBounds(this._keyToTileCoords(t));
      },
      _tileCoordsToNwSe: function(t) {
        var n = this._map, s = this.getTileSize(), c = t.scaleBy(s), y = c.add(s), B = n.unproject(c, t.z), G = n.unproject(y, t.z);
        return [B, G];
      },
      // converts tile coordinates to its geographical bounds
      _tileCoordsToBounds: function(t) {
        var n = this._tileCoordsToNwSe(t), s = new ue(n[0], n[1]);
        return this.options.noWrap || (s = this._map.wrapLatLngBounds(s)), s;
      },
      // converts tile coordinates to key for the tile cache
      _tileCoordsToKey: function(t) {
        return t.x + ":" + t.y + ":" + t.z;
      },
      // converts tile cache key to coordinates
      _keyToTileCoords: function(t) {
        var n = t.split(":"), s = new Ot(+n[0], +n[1]);
        return s.z = +n[2], s;
      },
      _removeTile: function(t) {
        var n = this._tiles[t];
        n && (Ce(n.el), delete this._tiles[t], this.fire("tileunload", {
          tile: n.el,
          coords: this._keyToTileCoords(t)
        }));
      },
      _initTile: function(t) {
        re(t, "leaflet-tile");
        var n = this.getTileSize();
        t.style.width = n.x + "px", t.style.height = n.y + "px", t.onselectstart = M, t.onmousemove = M, Gt.ielt9 && this.options.opacity < 1 && ri(t, this.options.opacity);
      },
      _addTile: function(t, n) {
        var s = this._getTilePos(t), c = this._tileCoordsToKey(t), y = this.createTile(this._wrapCoords(t), w(this._tileReady, this, t));
        this._initTile(y), this.createTile.length < 2 && Wt(w(this._tileReady, this, t, null, y)), Ae(y, s), this._tiles[c] = {
          el: y,
          coords: t,
          current: !0
        }, n.appendChild(y), this.fire("tileloadstart", {
          tile: y,
          coords: t
        });
      },
      _tileReady: function(t, n, s) {
        n && this.fire("tileerror", {
          error: n,
          tile: s,
          coords: t
        });
        var c = this._tileCoordsToKey(t);
        s = this._tiles[c], s && (s.loaded = +/* @__PURE__ */ new Date(), this._map._fadeAnimated ? (ri(s.el, 0), ge(this._fadeFrame), this._fadeFrame = Wt(this._updateOpacity, this)) : (s.active = !0, this._pruneTiles()), n || (re(s.el, "leaflet-tile-loaded"), this.fire("tileload", {
          tile: s.el,
          coords: t
        })), this._noTilesToLoad() && (this._loading = !1, this.fire("load"), Gt.ielt9 || !this._map._fadeAnimated ? Wt(this._pruneTiles, this) : setTimeout(w(this._pruneTiles, this), 250)));
      },
      _getTilePos: function(t) {
        return t.scaleBy(this.getTileSize()).subtract(this._level.origin);
      },
      _wrapCoords: function(t) {
        var n = new Ot(
          this._wrapX ? P(t.x, this._wrapX) : t.x,
          this._wrapY ? P(t.y, this._wrapY) : t.y
        );
        return n.z = t.z, n;
      },
      _pxBoundsToTileRange: function(t) {
        var n = this.getTileSize();
        return new Bt(
          t.min.unscaleBy(n).floor(),
          t.max.unscaleBy(n).ceil().subtract([1, 1])
        );
      },
      _noTilesToLoad: function() {
        for (var t in this._tiles)
          if (!this._tiles[t].loaded)
            return !1;
        return !0;
      }
    });
    function fs(t) {
      return new qn(t);
    }
    var qi = qn.extend({
      // @section
      // @aka TileLayer options
      options: {
        // @option minZoom: Number = 0
        // The minimum zoom level down to which this layer will be displayed (inclusive).
        minZoom: 0,
        // @option maxZoom: Number = 18
        // The maximum zoom level up to which this layer will be displayed (inclusive).
        maxZoom: 18,
        // @option subdomains: String|String[] = 'abc'
        // Subdomains of the tile service. Can be passed in the form of one string (where each letter is a subdomain name) or an array of strings.
        subdomains: "abc",
        // @option errorTileUrl: String = ''
        // URL to the tile image to show in place of the tile that failed to load.
        errorTileUrl: "",
        // @option zoomOffset: Number = 0
        // The zoom number used in tile URLs will be offset with this value.
        zoomOffset: 0,
        // @option tms: Boolean = false
        // If `true`, inverses Y axis numbering for tiles (turn this on for [TMS](https://en.wikipedia.org/wiki/Tile_Map_Service) services).
        tms: !1,
        // @option zoomReverse: Boolean = false
        // If set to true, the zoom number used in tile URLs will be reversed (`maxZoom - zoom` instead of `zoom`)
        zoomReverse: !1,
        // @option detectRetina: Boolean = false
        // If `true` and user is on a retina display, it will request four tiles of half the specified size and a bigger zoom level in place of one to utilize the high resolution.
        detectRetina: !1,
        // @option crossOrigin: Boolean|String = false
        // Whether the crossOrigin attribute will be added to the tiles.
        // If a String is provided, all tiles will have their crossOrigin attribute set to the String provided. This is needed if you want to access tile pixel data.
        // Refer to [CORS Settings](https://developer.mozilla.org/en-US/docs/Web/HTML/CORS_settings_attributes) for valid String values.
        crossOrigin: !1,
        // @option referrerPolicy: Boolean|String = false
        // Whether the referrerPolicy attribute will be added to the tiles.
        // If a String is provided, all tiles will have their referrerPolicy attribute set to the String provided.
        // This may be needed if your map's rendering context has a strict default but your tile provider expects a valid referrer
        // (e.g. to validate an API token).
        // Refer to [HTMLImageElement.referrerPolicy](https://developer.mozilla.org/en-US/docs/Web/API/HTMLImageElement/referrerPolicy) for valid String values.
        referrerPolicy: !1
      },
      initialize: function(t, n) {
        this._url = t, n = tt(this, n), n.detectRetina && Gt.retina && n.maxZoom > 0 ? (n.tileSize = Math.floor(n.tileSize / 2), n.zoomReverse ? (n.zoomOffset--, n.minZoom = Math.min(n.maxZoom, n.minZoom + 1)) : (n.zoomOffset++, n.maxZoom = Math.max(n.minZoom, n.maxZoom - 1)), n.minZoom = Math.max(0, n.minZoom)) : n.zoomReverse ? n.minZoom = Math.min(n.maxZoom, n.minZoom) : n.maxZoom = Math.max(n.minZoom, n.maxZoom), typeof n.subdomains == "string" && (n.subdomains = n.subdomains.split("")), this.on("tileunload", this._onTileRemove);
      },
      // @method setUrl(url: String, noRedraw?: Boolean): this
      // Updates the layer's URL template and redraws it (unless `noRedraw` is set to `true`).
      // If the URL does not change, the layer will not be redrawn unless
      // the noRedraw parameter is set to false.
      setUrl: function(t, n) {
        return this._url === t && n === void 0 && (n = !0), this._url = t, n || this.redraw(), this;
      },
      // @method createTile(coords: Object, done?: Function): HTMLElement
      // Called only internally, overrides GridLayer's [`createTile()`](#gridlayer-createtile)
      // to return an `<img>` HTML element with the appropriate image URL given `coords`. The `done`
      // callback is called when the tile has been loaded.
      createTile: function(t, n) {
        var s = document.createElement("img");
        return Qt(s, "load", w(this._tileOnLoad, this, n, s)), Qt(s, "error", w(this._tileOnError, this, n, s)), (this.options.crossOrigin || this.options.crossOrigin === "") && (s.crossOrigin = this.options.crossOrigin === !0 ? "" : this.options.crossOrigin), typeof this.options.referrerPolicy == "string" && (s.referrerPolicy = this.options.referrerPolicy), s.alt = "", s.src = this.getTileUrl(t), s;
      },
      // @section Extension methods
      // @uninheritable
      // Layers extending `TileLayer` might reimplement the following method.
      // @method getTileUrl(coords: Object): String
      // Called only internally, returns the URL for a tile given its coordinates.
      // Classes extending `TileLayer` can override this function to provide custom tile URL naming schemes.
      getTileUrl: function(t) {
        var n = {
          r: Gt.retina ? "@2x" : "",
          s: this._getSubdomain(t),
          x: t.x,
          y: t.y,
          z: this._getZoomForUrl()
        };
        if (this._map && !this._map.options.crs.infinite) {
          var s = this._globalTileRange.max.y - t.y;
          this.options.tms && (n.y = s), n["-y"] = s;
        }
        return At(this._url, b(n, this.options));
      },
      _tileOnLoad: function(t, n) {
        Gt.ielt9 ? setTimeout(w(t, this, null, n), 0) : t(null, n);
      },
      _tileOnError: function(t, n, s) {
        var c = this.options.errorTileUrl;
        c && n.getAttribute("src") !== c && (n.src = c), t(s, n);
      },
      _onTileRemove: function(t) {
        t.tile.onload = null;
      },
      _getZoomForUrl: function() {
        var t = this._tileZoom, n = this.options.maxZoom, s = this.options.zoomReverse, c = this.options.zoomOffset;
        return s && (t = n - t), t + c;
      },
      _getSubdomain: function(t) {
        var n = Math.abs(t.x + t.y) % this.options.subdomains.length;
        return this.options.subdomains[n];
      },
      // stops loading all tiles in the background layer
      _abortLoading: function() {
        var t, n;
        for (t in this._tiles)
          if (this._tiles[t].coords.z !== this._tileZoom && (n = this._tiles[t].el, n.onload = M, n.onerror = M, !n.complete)) {
            n.src = Et;
            var s = this._tiles[t].coords;
            Ce(n), delete this._tiles[t], this.fire("tileabort", {
              tile: n,
              coords: s
            });
          }
      },
      _removeTile: function(t) {
        var n = this._tiles[t];
        if (n)
          return n.el.setAttribute("src", Et), qn.prototype._removeTile.call(this, t);
      },
      _tileReady: function(t, n, s) {
        if (!(!this._map || s && s.getAttribute("src") === Et))
          return qn.prototype._tileReady.call(this, t, n, s);
      }
    });
    function ps(t, n) {
      return new qi(t, n);
    }
    var ms = qi.extend({
      // @section
      // @aka TileLayer.WMS options
      // If any custom options not documented here are used, they will be sent to the
      // WMS server as extra parameters in each request URL. This can be useful for
      // [non-standard vendor WMS parameters](https://docs.geoserver.org/stable/en/user/services/wms/vendor.html).
      defaultWmsParams: {
        service: "WMS",
        request: "GetMap",
        // @option layers: String = ''
        // **(required)** Comma-separated list of WMS layers to show.
        layers: "",
        // @option styles: String = ''
        // Comma-separated list of WMS styles.
        styles: "",
        // @option format: String = 'image/jpeg'
        // WMS image format (use `'image/png'` for layers with transparency).
        format: "image/jpeg",
        // @option transparent: Boolean = false
        // If `true`, the WMS service will return images with transparency.
        transparent: !1,
        // @option version: String = '1.1.1'
        // Version of the WMS service to use
        version: "1.1.1"
      },
      options: {
        // @option crs: CRS = null
        // Coordinate Reference System to use for the WMS requests, defaults to
        // map CRS. Don't change this if you're not sure what it means.
        crs: null,
        // @option uppercase: Boolean = false
        // If `true`, WMS request parameter keys will be uppercase.
        uppercase: !1
      },
      initialize: function(t, n) {
        this._url = t;
        var s = b({}, this.defaultWmsParams);
        for (var c in n)
          c in this.options || (s[c] = n[c]);
        n = tt(this, n);
        var y = n.detectRetina && Gt.retina ? 2 : 1, B = this.getTileSize();
        s.width = B.x * y, s.height = B.y * y, this.wmsParams = s;
      },
      onAdd: function(t) {
        this._crs = this.options.crs || t.options.crs, this._wmsVersion = parseFloat(this.wmsParams.version);
        var n = this._wmsVersion >= 1.3 ? "crs" : "srs";
        this.wmsParams[n] = this._crs.code, qi.prototype.onAdd.call(this, t);
      },
      getTileUrl: function(t) {
        var n = this._tileCoordsToNwSe(t), s = this._crs, c = Nt(s.project(n[0]), s.project(n[1])), y = c.min, B = c.max, G = (this._wmsVersion >= 1.3 && this._crs === Qr ? [y.y, y.x, B.y, B.x] : [y.x, y.y, B.x, B.y]).join(","), rt = qi.prototype.getTileUrl.call(this, t);
        return rt + ut(this.wmsParams, rt, this.options.uppercase) + (this.options.uppercase ? "&BBOX=" : "&bbox=") + G;
      },
      // @method setParams(params: Object, noRedraw?: Boolean): this
      // Merges an object with the new parameters and re-requests tiles on the current screen (unless `noRedraw` was set to true).
      setParams: function(t, n) {
        return b(this.wmsParams, t), n || this.redraw(), this;
      }
    });
    function gs(t, n) {
      return new ms(t, n);
    }
    qi.WMS = ms, ps.wms = gs;
    var wi = Ke.extend({
      // @section
      // @aka Renderer options
      options: {
        // @option padding: Number = 0.1
        // How much to extend the clip area around the map view (relative to its size)
        // e.g. 0.1 would be 10% of map view in each direction
        padding: 0.1
      },
      initialize: function(t) {
        tt(this, t), x(this), this._layers = this._layers || {};
      },
      onAdd: function() {
        this._container || (this._initContainer(), re(this._container, "leaflet-zoom-animated")), this.getPane().appendChild(this._container), this._update(), this.on("update", this._updatePaths, this);
      },
      onRemove: function() {
        this.off("update", this._updatePaths, this), this._destroyContainer();
      },
      getEvents: function() {
        var t = {
          viewreset: this._reset,
          zoom: this._onZoom,
          moveend: this._update,
          zoomend: this._onZoomEnd
        };
        return this._zoomAnimated && (t.zoomanim = this._onAnimZoom), t;
      },
      _onAnimZoom: function(t) {
        this._updateTransform(t.center, t.zoom);
      },
      _onZoom: function() {
        this._updateTransform(this._map.getCenter(), this._map.getZoom());
      },
      _updateTransform: function(t, n) {
        var s = this._map.getZoomScale(n, this._zoom), c = this._map.getSize().multiplyBy(0.5 + this.options.padding), y = this._map.project(this._center, n), B = c.multiplyBy(-s).add(y).subtract(this._map._getNewPixelOrigin(t, n));
        Gt.any3d ? tn(this._container, B, s) : Ae(this._container, B);
      },
      _reset: function() {
        this._update(), this._updateTransform(this._center, this._zoom);
        for (var t in this._layers)
          this._layers[t]._reset();
      },
      _onZoomEnd: function() {
        for (var t in this._layers)
          this._layers[t]._project();
      },
      _updatePaths: function() {
        for (var t in this._layers)
          this._layers[t]._update();
      },
      _update: function() {
        var t = this.options.padding, n = this._map.getSize(), s = this._map.containerPointToLayerPoint(n.multiplyBy(-t)).round();
        this._bounds = new Bt(s, s.add(n.multiplyBy(1 + t * 2)).round()), this._center = this._map.getCenter(), this._zoom = this._map.getZoom();
      }
    }), _r = wi.extend({
      // @section
      // @aka Canvas options
      options: {
        // @option tolerance: Number = 0
        // How much to extend the click tolerance around a path/object on the map.
        tolerance: 0
      },
      getEvents: function() {
        var t = wi.prototype.getEvents.call(this);
        return t.viewprereset = this._onViewPreReset, t;
      },
      _onViewPreReset: function() {
        this._postponeUpdatePaths = !0;
      },
      onAdd: function() {
        wi.prototype.onAdd.call(this), this._draw();
      },
      _initContainer: function() {
        var t = this._container = document.createElement("canvas");
        Qt(t, "mousemove", this._onMouseMove, this), Qt(t, "click dblclick mousedown mouseup contextmenu", this._onClick, this), Qt(t, "mouseout", this._handleMouseOut, this), t._leaflet_disable_events = !0, this._ctx = t.getContext("2d");
      },
      _destroyContainer: function() {
        ge(this._redrawRequest), delete this._ctx, Ce(this._container), pe(this._container), delete this._container;
      },
      _updatePaths: function() {
        if (!this._postponeUpdatePaths) {
          var t;
          this._redrawBounds = null;
          for (var n in this._layers)
            t = this._layers[n], t._update();
          this._redraw();
        }
      },
      _update: function() {
        if (!(this._map._animatingZoom && this._bounds)) {
          wi.prototype._update.call(this);
          var t = this._bounds, n = this._container, s = t.getSize(), c = Gt.retina ? 2 : 1;
          Ae(n, t.min), n.width = c * s.x, n.height = c * s.y, n.style.width = s.x + "px", n.style.height = s.y + "px", Gt.retina && this._ctx.scale(2, 2), this._ctx.translate(-t.min.x, -t.min.y), this.fire("update");
        }
      },
      _reset: function() {
        wi.prototype._reset.call(this), this._postponeUpdatePaths && (this._postponeUpdatePaths = !1, this._updatePaths());
      },
      _initPath: function(t) {
        this._updateDashArray(t), this._layers[x(t)] = t;
        var n = t._order = {
          layer: t,
          prev: this._drawLast,
          next: null
        };
        this._drawLast && (this._drawLast.next = n), this._drawLast = n, this._drawFirst = this._drawFirst || this._drawLast;
      },
      _addPath: function(t) {
        this._requestRedraw(t);
      },
      _removePath: function(t) {
        var n = t._order, s = n.next, c = n.prev;
        s ? s.prev = c : this._drawLast = c, c ? c.next = s : this._drawFirst = s, delete t._order, delete this._layers[x(t)], this._requestRedraw(t);
      },
      _updatePath: function(t) {
        this._extendRedrawBounds(t), t._project(), t._update(), this._requestRedraw(t);
      },
      _updateStyle: function(t) {
        this._updateDashArray(t), this._requestRedraw(t);
      },
      _updateDashArray: function(t) {
        if (typeof t.options.dashArray == "string") {
          var n = t.options.dashArray.split(/[, ]+/), s = [], c, y;
          for (y = 0; y < n.length; y++) {
            if (c = Number(n[y]), isNaN(c))
              return;
            s.push(c);
          }
          t.options._dashArray = s;
        } else
          t.options._dashArray = t.options.dashArray;
      },
      _requestRedraw: function(t) {
        this._map && (this._extendRedrawBounds(t), this._redrawRequest = this._redrawRequest || Wt(this._redraw, this));
      },
      _extendRedrawBounds: function(t) {
        if (t._pxBounds) {
          var n = (t.options.weight || 0) + 1;
          this._redrawBounds = this._redrawBounds || new Bt(), this._redrawBounds.extend(t._pxBounds.min.subtract([n, n])), this._redrawBounds.extend(t._pxBounds.max.add([n, n]));
        }
      },
      _redraw: function() {
        this._redrawRequest = null, this._redrawBounds && (this._redrawBounds.min._floor(), this._redrawBounds.max._ceil()), this._clear(), this._draw(), this._redrawBounds = null;
      },
      _clear: function() {
        var t = this._redrawBounds;
        if (t) {
          var n = t.getSize();
          this._ctx.clearRect(t.min.x, t.min.y, n.x, n.y);
        } else
          this._ctx.save(), this._ctx.setTransform(1, 0, 0, 1, 0, 0), this._ctx.clearRect(0, 0, this._container.width, this._container.height), this._ctx.restore();
      },
      _draw: function() {
        var t, n = this._redrawBounds;
        if (this._ctx.save(), n) {
          var s = n.getSize();
          this._ctx.beginPath(), this._ctx.rect(n.min.x, n.min.y, s.x, s.y), this._ctx.clip();
        }
        this._drawing = !0;
        for (var c = this._drawFirst; c; c = c.next)
          t = c.layer, (!n || t._pxBounds && t._pxBounds.intersects(n)) && t._updatePath();
        this._drawing = !1, this._ctx.restore();
      },
      _updatePoly: function(t, n) {
        if (this._drawing) {
          var s, c, y, B, G = t._parts, rt = G.length, ht = this._ctx;
          if (rt) {
            for (ht.beginPath(), s = 0; s < rt; s++) {
              for (c = 0, y = G[s].length; c < y; c++)
                B = G[s][c], ht[c ? "lineTo" : "moveTo"](B.x, B.y);
              n && ht.closePath();
            }
            this._fillStroke(ht, t);
          }
        }
      },
      _updateCircle: function(t) {
        if (!(!this._drawing || t._empty())) {
          var n = t._point, s = this._ctx, c = Math.max(Math.round(t._radius), 1), y = (Math.max(Math.round(t._radiusY), 1) || c) / c;
          y !== 1 && (s.save(), s.scale(1, y)), s.beginPath(), s.arc(n.x, n.y / y, c, 0, Math.PI * 2, !1), y !== 1 && s.restore(), this._fillStroke(s, t);
        }
      },
      _fillStroke: function(t, n) {
        var s = n.options;
        s.fill && (t.globalAlpha = s.fillOpacity, t.fillStyle = s.fillColor || s.color, t.fill(s.fillRule || "evenodd")), s.stroke && s.weight !== 0 && (t.setLineDash && t.setLineDash(n.options && n.options._dashArray || []), t.globalAlpha = s.opacity, t.lineWidth = s.weight, t.strokeStyle = s.color, t.lineCap = s.lineCap, t.lineJoin = s.lineJoin, t.stroke());
      },
      // Canvas obviously doesn't have mouse events for individual drawn objects,
      // so we emulate that by calculating what's under the mouse on mousemove/click manually
      _onClick: function(t) {
        for (var n = this._map.mouseEventToLayerPoint(t), s, c, y = this._drawFirst; y; y = y.next)
          s = y.layer, s.options.interactive && s._containsPoint(n) && (!(t.type === "click" || t.type === "preclick") || !this._map._draggableMoved(s)) && (c = s);
        this._fireEvent(c ? [c] : !1, t);
      },
      _onMouseMove: function(t) {
        if (!(!this._map || this._map.dragging.moving() || this._map._animatingZoom)) {
          var n = this._map.mouseEventToLayerPoint(t);
          this._handleMouseHover(t, n);
        }
      },
      _handleMouseOut: function(t) {
        var n = this._hoveredLayer;
        n && (Me(this._container, "leaflet-interactive"), this._fireEvent([n], t, "mouseout"), this._hoveredLayer = null, this._mouseHoverThrottled = !1);
      },
      _handleMouseHover: function(t, n) {
        if (!this._mouseHoverThrottled) {
          for (var s, c, y = this._drawFirst; y; y = y.next)
            s = y.layer, s.options.interactive && s._containsPoint(n) && (c = s);
          c !== this._hoveredLayer && (this._handleMouseOut(t), c && (re(this._container, "leaflet-interactive"), this._fireEvent([c], t, "mouseover"), this._hoveredLayer = c)), this._fireEvent(this._hoveredLayer ? [this._hoveredLayer] : !1, t), this._mouseHoverThrottled = !0, setTimeout(w(function() {
            this._mouseHoverThrottled = !1;
          }, this), 32);
        }
      },
      _fireEvent: function(t, n, s) {
        this._map._fireDOMEvent(n, s || n.type, t);
      },
      _bringToFront: function(t) {
        var n = t._order;
        if (n) {
          var s = n.next, c = n.prev;
          if (s)
            s.prev = c;
          else
            return;
          c ? c.next = s : s && (this._drawFirst = s), n.prev = this._drawLast, this._drawLast.next = n, n.next = null, this._drawLast = n, this._requestRedraw(t);
        }
      },
      _bringToBack: function(t) {
        var n = t._order;
        if (n) {
          var s = n.next, c = n.prev;
          if (c)
            c.next = s;
          else
            return;
          s ? s.prev = c : c && (this._drawLast = c), n.prev = null, n.next = this._drawFirst, this._drawFirst.prev = n, this._drawFirst = n, this._requestRedraw(t);
        }
      }
    });
    function sa(t) {
      return Gt.canvas ? new _r(t) : null;
    }
    var sn = function() {
      try {
        return document.namespaces.add("lvml", "urn:schemas-microsoft-com:vml"), function(t) {
          return document.createElement("<lvml:" + t + ' class="lvml">');
        };
      } catch {
      }
      return function(t) {
        return document.createElement("<" + t + ' xmlns="urn:schemas-microsoft.com:vml" class="lvml">');
      };
    }(), To = {
      _initContainer: function() {
        this._container = de("div", "leaflet-vml-container");
      },
      _update: function() {
        this._map._animatingZoom || (wi.prototype._update.call(this), this.fire("update"));
      },
      _initPath: function(t) {
        var n = t._container = sn("shape");
        re(n, "leaflet-vml-shape " + (this.options.className || "")), n.coordsize = "1 1", t._path = sn("path"), n.appendChild(t._path), this._updateStyle(t), this._layers[x(t)] = t;
      },
      _addPath: function(t) {
        var n = t._container;
        this._container.appendChild(n), t.options.interactive && t.addInteractiveTarget(n);
      },
      _removePath: function(t) {
        var n = t._container;
        Ce(n), t.removeInteractiveTarget(n), delete this._layers[x(t)];
      },
      _updateStyle: function(t) {
        var n = t._stroke, s = t._fill, c = t.options, y = t._container;
        y.stroked = !!c.stroke, y.filled = !!c.fill, c.stroke ? (n || (n = t._stroke = sn("stroke")), y.appendChild(n), n.weight = c.weight + "px", n.color = c.color, n.opacity = c.opacity, c.dashArray ? n.dashStyle = Rt(c.dashArray) ? c.dashArray.join(" ") : c.dashArray.replace(/( *, *)/g, " ") : n.dashStyle = "", n.endcap = c.lineCap.replace("butt", "flat"), n.joinstyle = c.lineJoin) : n && (y.removeChild(n), t._stroke = null), c.fill ? (s || (s = t._fill = sn("fill")), y.appendChild(s), s.color = c.fillColor || c.color, s.opacity = c.fillOpacity) : s && (y.removeChild(s), t._fill = null);
      },
      _updateCircle: function(t) {
        var n = t._point.round(), s = Math.round(t._radius), c = Math.round(t._radiusY || s);
        this._setPath(t, t._empty() ? "M0 0" : "AL " + n.x + "," + n.y + " " + s + "," + c + " 0," + 65535 * 360);
      },
      _setPath: function(t, n) {
        t._path.v = n;
      },
      _bringToFront: function(t) {
        _n(t._container);
      },
      _bringToBack: function(t) {
        yn(t._container);
      }
    }, li = Gt.vml ? sn : Yn, Se = wi.extend({
      _initContainer: function() {
        this._container = li("svg"), this._container.setAttribute("pointer-events", "none"), this._rootGroup = li("g"), this._container.appendChild(this._rootGroup);
      },
      _destroyContainer: function() {
        Ce(this._container), pe(this._container), delete this._container, delete this._rootGroup, delete this._svgSize;
      },
      _update: function() {
        if (!(this._map._animatingZoom && this._bounds)) {
          wi.prototype._update.call(this);
          var t = this._bounds, n = t.getSize(), s = this._container;
          (!this._svgSize || !this._svgSize.equals(n)) && (this._svgSize = n, s.setAttribute("width", n.x), s.setAttribute("height", n.y)), Ae(s, t.min), s.setAttribute("viewBox", [t.min.x, t.min.y, n.x, n.y].join(" ")), this.fire("update");
        }
      },
      // methods below are called by vector layers implementations
      _initPath: function(t) {
        var n = t._path = li("path");
        t.options.className && re(n, t.options.className), t.options.interactive && re(n, "leaflet-interactive"), this._updateStyle(t), this._layers[x(t)] = t;
      },
      _addPath: function(t) {
        this._rootGroup || this._initContainer(), this._rootGroup.appendChild(t._path), t.addInteractiveTarget(t._path);
      },
      _removePath: function(t) {
        Ce(t._path), t.removeInteractiveTarget(t._path), delete this._layers[x(t)];
      },
      _updatePath: function(t) {
        t._project(), t._update();
      },
      _updateStyle: function(t) {
        var n = t._path, s = t.options;
        n && (s.stroke ? (n.setAttribute("stroke", s.color), n.setAttribute("stroke-opacity", s.opacity), n.setAttribute("stroke-width", s.weight), n.setAttribute("stroke-linecap", s.lineCap), n.setAttribute("stroke-linejoin", s.lineJoin), s.dashArray ? n.setAttribute("stroke-dasharray", s.dashArray) : n.removeAttribute("stroke-dasharray"), s.dashOffset ? n.setAttribute("stroke-dashoffset", s.dashOffset) : n.removeAttribute("stroke-dashoffset")) : n.setAttribute("stroke", "none"), s.fill ? (n.setAttribute("fill", s.fillColor || s.color), n.setAttribute("fill-opacity", s.fillOpacity), n.setAttribute("fill-rule", s.fillRule || "evenodd")) : n.setAttribute("fill", "none"));
      },
      _updatePoly: function(t, n) {
        this._setPath(t, Qn(t._parts, n));
      },
      _updateCircle: function(t) {
        var n = t._point, s = Math.max(Math.round(t._radius), 1), c = Math.max(Math.round(t._radiusY), 1) || s, y = "a" + s + "," + c + " 0 1,0 ", B = t._empty() ? "M0 0" : "M" + (n.x - s) + "," + n.y + y + s * 2 + ",0 " + y + -s * 2 + ",0 ";
        this._setPath(t, B);
      },
      _setPath: function(t, n) {
        t._path.setAttribute("d", n);
      },
      // SVG does not have the concept of zIndex so we resort to changing the DOM order of elements
      _bringToFront: function(t) {
        _n(t._path);
      },
      _bringToBack: function(t) {
        yn(t._path);
      }
    });
    Gt.vml && Se.include(To);
    function _s(t) {
      return Gt.svg || Gt.vml ? new Se(t) : null;
    }
    le.include({
      // @namespace Map; @method getRenderer(layer: Path): Renderer
      // Returns the instance of `Renderer` that should be used to render the given
      // `Path`. It will ensure that the `renderer` options of the map and paths
      // are respected, and that the renderers do exist on the map.
      getRenderer: function(t) {
        var n = t.options.renderer || this._getPaneRenderer(t.options.pane) || this.options.renderer || this._renderer;
        return n || (n = this._renderer = this._createRenderer()), this.hasLayer(n) || this.addLayer(n), n;
      },
      _getPaneRenderer: function(t) {
        if (t === "overlayPane" || t === void 0)
          return !1;
        var n = this._paneRenderers[t];
        return n === void 0 && (n = this._createRenderer({ pane: t }), this._paneRenderers[t] = n), n;
      },
      _createRenderer: function(t) {
        return this.options.preferCanvas && sa(t) || _s(t);
      }
    });
    var yr = Ve.extend({
      initialize: function(t, n) {
        Ve.prototype.initialize.call(this, this._boundsToLatLngs(t), n);
      },
      // @method setBounds(latLngBounds: LatLngBounds): this
      // Redraws the rectangle with the passed bounds.
      setBounds: function(t) {
        return this.setLatLngs(this._boundsToLatLngs(t));
      },
      _boundsToLatLngs: function(t) {
        return t = jt(t), [
          t.getSouthWest(),
          t.getNorthWest(),
          t.getNorthEast(),
          t.getSouthEast()
        ];
      }
    });
    function Do(t, n) {
      return new yr(t, n);
    }
    Se.create = li, Se.pointsToPath = Qn, Ti.geometryToLayer = Un, Ti.coordsToLatLng = na, Ti.coordsToLatLngs = ii, Ti.latLngToCoords = Di, Ti.latLngsToCoords = rn, Ti.getFeature = an, Ti.asFeature = mr, le.mergeOptions({
      // @option boxZoom: Boolean = true
      // Whether the map can be zoomed to a rectangular area specified by
      // dragging the mouse while pressing the shift key.
      boxZoom: !0
    });
    var Bn = yi.extend({
      initialize: function(t) {
        this._map = t, this._container = t._container, this._pane = t._panes.overlayPane, this._resetStateTimeout = 0, t.on("unload", this._destroy, this);
      },
      addHooks: function() {
        Qt(this._container, "mousedown", this._onMouseDown, this);
      },
      removeHooks: function() {
        pe(this._container, "mousedown", this._onMouseDown, this);
      },
      moved: function() {
        return this._moved;
      },
      _destroy: function() {
        Ce(this._pane), delete this._pane;
      },
      _resetState: function() {
        this._resetStateTimeout = 0, this._moved = !1;
      },
      _clearDeferredResetState: function() {
        this._resetStateTimeout !== 0 && (clearTimeout(this._resetStateTimeout), this._resetStateTimeout = 0);
      },
      _onMouseDown: function(t) {
        if (!t.shiftKey || t.which !== 1 && t.button !== 1)
          return !1;
        this._clearDeferredResetState(), this._resetState(), Fn(), jr(), this._startPoint = this._map.mouseEventToContainerPoint(t), Qt(document, {
          contextmenu: nn,
          mousemove: this._onMouseMove,
          mouseup: this._onMouseUp,
          keydown: this._onKeyDown
        }, this);
      },
      _onMouseMove: function(t) {
        this._moved || (this._moved = !0, this._box = de("div", "leaflet-zoom-box", this._container), re(this._container, "leaflet-crosshair"), this._map.fire("boxzoomstart")), this._point = this._map.mouseEventToContainerPoint(t);
        var n = new Bt(this._point, this._startPoint), s = n.getSize();
        Ae(this._box, n.min), this._box.style.width = s.x + "px", this._box.style.height = s.y + "px";
      },
      _finish: function() {
        this._moved && (Ce(this._box), Me(this._container, "leaflet-crosshair")), Rn(), Vr(), pe(document, {
          contextmenu: nn,
          mousemove: this._onMouseMove,
          mouseup: this._onMouseUp,
          keydown: this._onKeyDown
        }, this);
      },
      _onMouseUp: function(t) {
        if (!(t.which !== 1 && t.button !== 1) && (this._finish(), !!this._moved)) {
          this._clearDeferredResetState(), this._resetStateTimeout = setTimeout(w(this._resetState, this), 0);
          var n = new ue(
            this._map.containerPointToLatLng(this._startPoint),
            this._map.containerPointToLatLng(this._point)
          );
          this._map.fitBounds(n).fire("boxzoomend", { boxZoomBounds: n });
        }
      },
      _onKeyDown: function(t) {
        t.keyCode === 27 && (this._finish(), this._clearDeferredResetState(), this._resetState());
      }
    });
    le.addInitHook("addHandler", "boxZoom", Bn), le.mergeOptions({
      // @option doubleClickZoom: Boolean|String = true
      // Whether the map can be zoomed in by double clicking on it and
      // zoomed out by double clicking while holding shift. If passed
      // `'center'`, double-click zoom will zoom to the center of the
      //  view regardless of where the mouse was.
      doubleClickZoom: !0
    });
    var ys = yi.extend({
      addHooks: function() {
        this._map.on("dblclick", this._onDoubleClick, this);
      },
      removeHooks: function() {
        this._map.off("dblclick", this._onDoubleClick, this);
      },
      _onDoubleClick: function(t) {
        var n = this._map, s = n.getZoom(), c = n.options.zoomDelta, y = t.originalEvent.shiftKey ? s - c : s + c;
        n.options.doubleClickZoom === "center" ? n.setZoom(y) : n.setZoomAround(t.containerPoint, y);
      }
    });
    le.addInitHook("addHandler", "doubleClickZoom", ys), le.mergeOptions({
      // @option dragging: Boolean = true
      // Whether the map is draggable with mouse/touch or not.
      dragging: !0,
      // @section Panning Inertia Options
      // @option inertia: Boolean = *
      // If enabled, panning of the map will have an inertia effect where
      // the map builds momentum while dragging and continues moving in
      // the same direction for some time. Feels especially nice on touch
      // devices. Enabled by default.
      inertia: !0,
      // @option inertiaDeceleration: Number = 3000
      // The rate with which the inertial movement slows down, in pixels/second².
      inertiaDeceleration: 3400,
      // px/s^2
      // @option inertiaMaxSpeed: Number = Infinity
      // Max speed of the inertial movement, in pixels/second.
      inertiaMaxSpeed: 1 / 0,
      // px/s
      // @option easeLinearity: Number = 0.2
      easeLinearity: 0.2,
      // TODO refactor, move to CRS
      // @option worldCopyJump: Boolean = false
      // With this option enabled, the map tracks when you pan to another "copy"
      // of the world and seamlessly jumps to the original one so that all overlays
      // like markers and vector layers are still visible.
      worldCopyJump: !1,
      // @option maxBoundsViscosity: Number = 0.0
      // If `maxBounds` is set, this option will control how solid the bounds
      // are when dragging the map around. The default value of `0.0` allows the
      // user to drag outside the bounds at normal speed, higher values will
      // slow down map dragging outside bounds, and `1.0` makes the bounds fully
      // solid, preventing the user from dragging outside the bounds.
      maxBoundsViscosity: 0
    });
    var vs = yi.extend({
      addHooks: function() {
        if (!this._draggable) {
          var t = this._map;
          this._draggable = new Ui(t._mapPane, t._container), this._draggable.on({
            dragstart: this._onDragStart,
            drag: this._onDrag,
            dragend: this._onDragEnd
          }, this), this._draggable.on("predrag", this._onPreDragLimit, this), t.options.worldCopyJump && (this._draggable.on("predrag", this._onPreDragWrap, this), t.on("zoomend", this._onZoomEnd, this), t.whenReady(this._onZoomEnd, this));
        }
        re(this._map._container, "leaflet-grab leaflet-touch-drag"), this._draggable.enable(), this._positions = [], this._times = [];
      },
      removeHooks: function() {
        Me(this._map._container, "leaflet-grab"), Me(this._map._container, "leaflet-touch-drag"), this._draggable.disable();
      },
      moved: function() {
        return this._draggable && this._draggable._moved;
      },
      moving: function() {
        return this._draggable && this._draggable._moving;
      },
      _onDragStart: function() {
        var t = this._map;
        if (t._stop(), this._map.options.maxBounds && this._map.options.maxBoundsViscosity) {
          var n = jt(this._map.options.maxBounds);
          this._offsetLimit = Nt(
            this._map.latLngToContainerPoint(n.getNorthWest()).multiplyBy(-1),
            this._map.latLngToContainerPoint(n.getSouthEast()).multiplyBy(-1).add(this._map.getSize())
          ), this._viscosity = Math.min(1, Math.max(0, this._map.options.maxBoundsViscosity));
        } else
          this._offsetLimit = null;
        t.fire("movestart").fire("dragstart"), t.options.inertia && (this._positions = [], this._times = []);
      },
      _onDrag: function(t) {
        if (this._map.options.inertia) {
          var n = this._lastTime = +/* @__PURE__ */ new Date(), s = this._lastPos = this._draggable._absPos || this._draggable._newPos;
          this._positions.push(s), this._times.push(n), this._prunePositions(n);
        }
        this._map.fire("move", t).fire("drag", t);
      },
      _prunePositions: function(t) {
        for (; this._positions.length > 1 && t - this._times[0] > 50; )
          this._positions.shift(), this._times.shift();
      },
      _onZoomEnd: function() {
        var t = this._map.getSize().divideBy(2), n = this._map.latLngToLayerPoint([0, 0]);
        this._initialWorldOffset = n.subtract(t).x, this._worldWidth = this._map.getPixelWorldBounds().getSize().x;
      },
      _viscousLimit: function(t, n) {
        return t - (t - n) * this._viscosity;
      },
      _onPreDragLimit: function() {
        if (!(!this._viscosity || !this._offsetLimit)) {
          var t = this._draggable._newPos.subtract(this._draggable._startPos), n = this._offsetLimit;
          t.x < n.min.x && (t.x = this._viscousLimit(t.x, n.min.x)), t.y < n.min.y && (t.y = this._viscousLimit(t.y, n.min.y)), t.x > n.max.x && (t.x = this._viscousLimit(t.x, n.max.x)), t.y > n.max.y && (t.y = this._viscousLimit(t.y, n.max.y)), this._draggable._newPos = this._draggable._startPos.add(t);
        }
      },
      _onPreDragWrap: function() {
        var t = this._worldWidth, n = Math.round(t / 2), s = this._initialWorldOffset, c = this._draggable._newPos.x, y = (c - n + s) % t + n - s, B = (c + n + s) % t - n - s, G = Math.abs(y + s) < Math.abs(B + s) ? y : B;
        this._draggable._absPos = this._draggable._newPos.clone(), this._draggable._newPos.x = G;
      },
      _onDragEnd: function(t) {
        var n = this._map, s = n.options, c = !s.inertia || t.noInertia || this._times.length < 2;
        if (n.fire("dragend", t), c)
          n.fire("moveend");
        else {
          this._prunePositions(+/* @__PURE__ */ new Date());
          var y = this._lastPos.subtract(this._positions[0]), B = (this._lastTime - this._times[0]) / 1e3, G = s.easeLinearity, rt = y.multiplyBy(G / B), ht = rt.distanceTo([0, 0]), gt = Math.min(s.inertiaMaxSpeed, ht), Tt = rt.multiplyBy(gt / ht), Ht = gt / (s.inertiaDeceleration * G), se = Tt.multiplyBy(-Ht / 2).round();
          !se.x && !se.y ? n.fire("moveend") : (se = n._limitOffset(se, n.options.maxBounds), Wt(function() {
            n.panBy(se, {
              duration: Ht,
              easeLinearity: G,
              noMoveStart: !0,
              animate: !0
            });
          }));
        }
      }
    });
    le.addInitHook("addHandler", "dragging", vs), le.mergeOptions({
      // @option keyboard: Boolean = true
      // Makes the map focusable and allows users to navigate the map with keyboard
      // arrows and `+`/`-` keys.
      keyboard: !0,
      // @option keyboardPanDelta: Number = 80
      // Amount of pixels to pan when pressing an arrow key.
      keyboardPanDelta: 80
    });
    var bs = yi.extend({
      keyCodes: {
        left: [37],
        right: [39],
        down: [40],
        up: [38],
        zoomIn: [187, 107, 61, 171],
        zoomOut: [189, 109, 54, 173]
      },
      initialize: function(t) {
        this._map = t, this._setPanDelta(t.options.keyboardPanDelta), this._setZoomDelta(t.options.zoomDelta);
      },
      addHooks: function() {
        var t = this._map._container;
        t.tabIndex <= 0 && (t.tabIndex = "0"), Qt(t, {
          focus: this._onFocus,
          blur: this._onBlur,
          mousedown: this._onMouseDown
        }, this), this._map.on({
          focus: this._addHooks,
          blur: this._removeHooks
        }, this);
      },
      removeHooks: function() {
        this._removeHooks(), pe(this._map._container, {
          focus: this._onFocus,
          blur: this._onBlur,
          mousedown: this._onMouseDown
        }, this), this._map.off({
          focus: this._addHooks,
          blur: this._removeHooks
        }, this);
      },
      _onMouseDown: function() {
        if (!this._focused) {
          var t = document.body, n = document.documentElement, s = t.scrollTop || n.scrollTop, c = t.scrollLeft || n.scrollLeft;
          this._map._container.focus(), window.scrollTo(c, s);
        }
      },
      _onFocus: function() {
        this._focused = !0, this._map.fire("focus");
      },
      _onBlur: function() {
        this._focused = !1, this._map.fire("blur");
      },
      _setPanDelta: function(t) {
        var n = this._panKeys = {}, s = this.keyCodes, c, y;
        for (c = 0, y = s.left.length; c < y; c++)
          n[s.left[c]] = [-1 * t, 0];
        for (c = 0, y = s.right.length; c < y; c++)
          n[s.right[c]] = [t, 0];
        for (c = 0, y = s.down.length; c < y; c++)
          n[s.down[c]] = [0, t];
        for (c = 0, y = s.up.length; c < y; c++)
          n[s.up[c]] = [0, -1 * t];
      },
      _setZoomDelta: function(t) {
        var n = this._zoomKeys = {}, s = this.keyCodes, c, y;
        for (c = 0, y = s.zoomIn.length; c < y; c++)
          n[s.zoomIn[c]] = t;
        for (c = 0, y = s.zoomOut.length; c < y; c++)
          n[s.zoomOut[c]] = -t;
      },
      _addHooks: function() {
        Qt(document, "keydown", this._onKeyDown, this);
      },
      _removeHooks: function() {
        pe(document, "keydown", this._onKeyDown, this);
      },
      _onKeyDown: function(t) {
        if (!(t.altKey || t.ctrlKey || t.metaKey)) {
          var n = t.keyCode, s = this._map, c;
          if (n in this._panKeys) {
            if (!s._panAnim || !s._panAnim._inProgress)
              if (c = this._panKeys[n], t.shiftKey && (c = lt(c).multiplyBy(3)), s.options.maxBounds && (c = s._limitOffset(lt(c), s.options.maxBounds)), s.options.worldCopyJump) {
                var y = s.wrapLatLng(s.unproject(s.project(s.getCenter()).add(c)));
                s.panTo(y);
              } else
                s.panBy(c);
          } else if (n in this._zoomKeys)
            s.setZoom(s.getZoom() + (t.shiftKey ? 3 : 1) * this._zoomKeys[n]);
          else if (n === 27 && s._popup && s._popup.options.closeOnEscapeKey)
            s.closePopup();
          else
            return;
          nn(t);
        }
      }
    });
    le.addInitHook("addHandler", "keyboard", bs), le.mergeOptions({
      // @section Mouse wheel options
      // @option scrollWheelZoom: Boolean|String = true
      // Whether the map can be zoomed by using the mouse wheel. If passed `'center'`,
      // it will zoom to the center of the view regardless of where the mouse was.
      scrollWheelZoom: !0,
      // @option wheelDebounceTime: Number = 40
      // Limits the rate at which a wheel can fire (in milliseconds). By default
      // user can't zoom via wheel more often than once per 40 ms.
      wheelDebounceTime: 40,
      // @option wheelPxPerZoomLevel: Number = 60
      // How many scroll pixels (as reported by [L.DomEvent.getWheelDelta](#domevent-getwheeldelta))
      // mean a change of one full zoom level. Smaller values will make wheel-zooming
      // faster (and vice versa).
      wheelPxPerZoomLevel: 60
    });
    var on = yi.extend({
      addHooks: function() {
        Qt(this._map._container, "wheel", this._onWheelScroll, this), this._delta = 0;
      },
      removeHooks: function() {
        pe(this._map._container, "wheel", this._onWheelScroll, this);
      },
      _onWheelScroll: function(t) {
        var n = Ja(t), s = this._map.options.wheelDebounceTime;
        this._delta += n, this._lastMousePos = this._map.mouseEventToContainerPoint(t), this._startTime || (this._startTime = +/* @__PURE__ */ new Date());
        var c = Math.max(s - (+/* @__PURE__ */ new Date() - this._startTime), 0);
        clearTimeout(this._timer), this._timer = setTimeout(w(this._performZoom, this), c), nn(t);
      },
      _performZoom: function() {
        var t = this._map, n = t.getZoom(), s = this._map.options.zoomSnap || 0;
        t._stop();
        var c = this._delta / (this._map.options.wheelPxPerZoomLevel * 4), y = 4 * Math.log(2 / (1 + Math.exp(-Math.abs(c)))) / Math.LN2, B = s ? Math.ceil(y / s) * s : y, G = t._limitZoom(n + (this._delta > 0 ? B : -B)) - n;
        this._delta = 0, this._startTime = null, G && (t.options.scrollWheelZoom === "center" ? t.setZoom(n + G) : t.setZoomAround(this._lastMousePos, n + G));
      }
    });
    le.addInitHook("addHandler", "scrollWheelZoom", on);
    var xs = 600;
    le.mergeOptions({
      // @section Touch interaction options
      // @option tapHold: Boolean
      // Enables simulation of `contextmenu` event, default is `true` for mobile Safari.
      tapHold: Gt.touchNative && Gt.safari && Gt.mobile,
      // @option tapTolerance: Number = 15
      // The max number of pixels a user can shift his finger during touch
      // for it to be considered a valid tap.
      tapTolerance: 15
    });
    var oa = yi.extend({
      addHooks: function() {
        Qt(this._map._container, "touchstart", this._onDown, this);
      },
      removeHooks: function() {
        pe(this._map._container, "touchstart", this._onDown, this);
      },
      _onDown: function(t) {
        if (clearTimeout(this._holdTimeout), t.touches.length === 1) {
          var n = t.touches[0];
          this._startPos = this._newPos = new Ot(n.clientX, n.clientY), this._holdTimeout = setTimeout(w(function() {
            this._cancel(), this._isTapValid() && (Qt(document, "touchend", Ie), Qt(document, "touchend touchcancel", this._cancelClickPrevent), this._simulateEvent("contextmenu", n));
          }, this), xs), Qt(document, "touchend touchcancel contextmenu", this._cancel, this), Qt(document, "touchmove", this._onMove, this);
        }
      },
      _cancelClickPrevent: function t() {
        pe(document, "touchend", Ie), pe(document, "touchend touchcancel", t);
      },
      _cancel: function() {
        clearTimeout(this._holdTimeout), pe(document, "touchend touchcancel contextmenu", this._cancel, this), pe(document, "touchmove", this._onMove, this);
      },
      _onMove: function(t) {
        var n = t.touches[0];
        this._newPos = new Ot(n.clientX, n.clientY);
      },
      _isTapValid: function() {
        return this._newPos.distanceTo(this._startPos) <= this._map.options.tapTolerance;
      },
      _simulateEvent: function(t, n) {
        var s = new MouseEvent(t, {
          bubbles: !0,
          cancelable: !0,
          view: window,
          // detail: 1,
          screenX: n.screenX,
          screenY: n.screenY,
          clientX: n.clientX,
          clientY: n.clientY
          // button: 2,
          // buttons: 2
        });
        s._simulated = !0, n.target.dispatchEvent(s);
      }
    });
    le.addInitHook("addHandler", "tapHold", oa), le.mergeOptions({
      // @section Touch interaction options
      // @option touchZoom: Boolean|String = *
      // Whether the map can be zoomed by touch-dragging with two fingers. If
      // passed `'center'`, it will zoom to the center of the view regardless of
      // where the touch events (fingers) were. Enabled for touch-capable web
      // browsers.
      touchZoom: Gt.touch,
      // @option bounceAtZoomLimits: Boolean = true
      // Set it to false if you don't want the map to zoom beyond min/max zoom
      // and then bounce back when pinch-zooming.
      bounceAtZoomLimits: !0
    });
    var la = yi.extend({
      addHooks: function() {
        re(this._map._container, "leaflet-touch-zoom"), Qt(this._map._container, "touchstart", this._onTouchStart, this);
      },
      removeHooks: function() {
        Me(this._map._container, "leaflet-touch-zoom"), pe(this._map._container, "touchstart", this._onTouchStart, this);
      },
      _onTouchStart: function(t) {
        var n = this._map;
        if (!(!t.touches || t.touches.length !== 2 || n._animatingZoom || this._zooming)) {
          var s = n.mouseEventToContainerPoint(t.touches[0]), c = n.mouseEventToContainerPoint(t.touches[1]);
          this._centerPoint = n.getSize()._divideBy(2), this._startLatLng = n.containerPointToLatLng(this._centerPoint), n.options.touchZoom !== "center" && (this._pinchStartLatLng = n.containerPointToLatLng(s.add(c)._divideBy(2))), this._startDist = s.distanceTo(c), this._startZoom = n.getZoom(), this._moved = !1, this._zooming = !0, n._stop(), Qt(document, "touchmove", this._onTouchMove, this), Qt(document, "touchend touchcancel", this._onTouchEnd, this), Ie(t);
        }
      },
      _onTouchMove: function(t) {
        if (!(!t.touches || t.touches.length !== 2 || !this._zooming)) {
          var n = this._map, s = n.mouseEventToContainerPoint(t.touches[0]), c = n.mouseEventToContainerPoint(t.touches[1]), y = s.distanceTo(c) / this._startDist;
          if (this._zoom = n.getScaleZoom(y, this._startZoom), !n.options.bounceAtZoomLimits && (this._zoom < n.getMinZoom() && y < 1 || this._zoom > n.getMaxZoom() && y > 1) && (this._zoom = n._limitZoom(this._zoom)), n.options.touchZoom === "center") {
            if (this._center = this._startLatLng, y === 1)
              return;
          } else {
            var B = s._add(c)._divideBy(2)._subtract(this._centerPoint);
            if (y === 1 && B.x === 0 && B.y === 0)
              return;
            this._center = n.unproject(n.project(this._pinchStartLatLng, this._zoom).subtract(B), this._zoom);
          }
          this._moved || (n._moveStart(!0, !1), this._moved = !0), ge(this._animRequest);
          var G = w(n._move, n, this._center, this._zoom, { pinch: !0, round: !1 }, void 0);
          this._animRequest = Wt(G, this, !0), Ie(t);
        }
      },
      _onTouchEnd: function() {
        if (!this._moved || !this._zooming) {
          this._zooming = !1;
          return;
        }
        this._zooming = !1, ge(this._animRequest), pe(document, "touchmove", this._onTouchMove, this), pe(document, "touchend touchcancel", this._onTouchEnd, this), this._map.options.zoomAnimation ? this._map._animateZoom(this._center, this._map._limitZoom(this._zoom), !0, this._map.options.zoomSnap) : this._map._resetView(this._center, this._map._limitZoom(this._zoom));
      }
    });
    le.addInitHook("addHandler", "touchZoom", la), le.BoxZoom = Bn, le.DoubleClickZoom = ys, le.Drag = vs, le.Keyboard = bs, le.ScrollWheelZoom = on, le.TapHold = oa, le.TouchZoom = la, d.Bounds = Bt, d.Browser = Gt, d.CRS = be, d.Canvas = _r, d.Circle = En, d.CircleMarker = pr, d.Class = kt, d.Control = di, d.DivIcon = Zi, d.DivOverlay = xi, d.DomEvent = ce, d.DomUtil = mo, d.Draggable = Ui, d.Evented = we, d.FeatureGroup = bi, d.GeoJSON = Ti, d.GridLayer = qn, d.Handler = yi, d.Icon = Cn, d.ImageOverlay = Mn, d.LatLng = St, d.LatLngBounds = ue, d.Layer = Ke, d.LayerGroup = Si, d.LineUtil = hr, d.Map = le, d.Marker = fr, d.Mixin = vo, d.Path = oi, d.Point = Ot, d.PolyUtil = ns, d.Polygon = Ve, d.Polyline = Pi, d.Popup = Gn, d.PosAnimation = Xa, d.Projection = os, d.Rectangle = yr, d.Renderer = wi, d.SVG = Se, d.SVGOverlay = aa, d.TileLayer = qi, d.Tooltip = gr, d.Transformation = pn, d.Util = He, d.VideoOverlay = ds, d.bind = w, d.bounds = Nt, d.canvas = sa, d.circle = Co, d.circleMarker = ta, d.control = vn, d.divIcon = Zn, d.extend = b, d.featureGroup = Lo, d.geoJSON = cs, d.geoJson = Eo, d.gridLayer = fs, d.icon = ko, d.imageOverlay = Mo, d.latLng = Mt, d.latLngBounds = jt, d.layerGroup = dr, d.map = lr, d.marker = us, d.point = lt, d.polygon = ia, d.polyline = ea, d.popup = So, d.rectangle = Do, d.setOptions = tt, d.stamp = x, d.svg = _s, d.svgOverlay = Ao, d.tileLayer = ps, d.tooltip = Po, d.transformation = Fi, d.version = p, d.videoOverlay = Bo;
    var $e = window.L;
    d.noConflict = function() {
      return window.L = $e, this;
    }, window.L = d;
  });
})(Ho, Ho.exports);
var Ac = Ho.exports;
const Ii = /* @__PURE__ */ Bc(Ac);
(() => {
  var vl, bl;
  var u = Object.create, l = Object.defineProperty, d = Object.getOwnPropertyDescriptor, p = Object.getOwnPropertyNames, b = Object.getPrototypeOf, E = Object.prototype.hasOwnProperty, w = (e, i) => () => (i || e((i = { exports: {} }).exports, i), i.exports), g = (e, i, r, a) => {
    if (i && typeof i == "object" || typeof i == "function") for (let o of p(i)) !E.call(e, o) && o !== r && l(e, o, { get: () => i[o], enumerable: !(a = d(i, o)) || a.enumerable });
    return e;
  }, x = (e, i, r) => (r = e != null ? u(b(e)) : {}, g(i || !e || !e.__esModule ? l(r, "default", { value: e, enumerable: !0 }) : r, e)), S = w((e, i) => {
    function r() {
      this.__data__ = [], this.size = 0;
    }
    i.exports = r;
  }), P = w((e, i) => {
    function r(a, o) {
      return a === o || a !== a && o !== o;
    }
    i.exports = r;
  }), M = w((e, i) => {
    var r = P();
    function a(o, h) {
      for (var f = o.length; f--; ) if (r(o[f][0], h)) return f;
      return -1;
    }
    i.exports = a;
  }), z = w((e, i) => {
    var r = M(), a = Array.prototype, o = a.splice;
    function h(f) {
      var _ = this.__data__, k = r(_, f);
      if (k < 0) return !1;
      var C = _.length - 1;
      return k == C ? _.pop() : o.call(_, k, 1), --this.size, !0;
    }
    i.exports = h;
  }), j = w((e, i) => {
    var r = M();
    function a(o) {
      var h = this.__data__, f = r(h, o);
      return f < 0 ? void 0 : h[f][1];
    }
    i.exports = a;
  }), $ = w((e, i) => {
    var r = M();
    function a(o) {
      return r(this.__data__, o) > -1;
    }
    i.exports = a;
  }), tt = w((e, i) => {
    var r = M();
    function a(o, h) {
      var f = this.__data__, _ = r(f, o);
      return _ < 0 ? (++this.size, f.push([o, h])) : f[_][1] = h, this;
    }
    i.exports = a;
  }), ut = w((e, i) => {
    var r = S(), a = z(), o = j(), h = $(), f = tt();
    function _(k) {
      var C = -1, N = k == null ? 0 : k.length;
      for (this.clear(); ++C < N; ) {
        var O = k[C];
        this.set(O[0], O[1]);
      }
    }
    _.prototype.clear = r, _.prototype.delete = a, _.prototype.get = o, _.prototype.has = h, _.prototype.set = f, i.exports = _;
  }), ft = w((e, i) => {
    var r = ut();
    function a() {
      this.__data__ = new r(), this.size = 0;
    }
    i.exports = a;
  }), At = w((e, i) => {
    function r(a) {
      var o = this.__data__, h = o.delete(a);
      return this.size = o.size, h;
    }
    i.exports = r;
  }), Rt = w((e, i) => {
    function r(a) {
      return this.__data__.get(a);
    }
    i.exports = r;
  }), zt = w((e, i) => {
    function r(a) {
      return this.__data__.has(a);
    }
    i.exports = r;
  }), Et = w((e, i) => {
    var r = typeof La == "object" && La && La.Object === Object && La;
    i.exports = r;
  }), ee = w((e, i) => {
    var r = Et(), a = typeof self == "object" && self && self.Object === Object && self, o = r || a || Function("return this")();
    i.exports = o;
  }), Dt = w((e, i) => {
    var r = ee(), a = r.Symbol;
    i.exports = a;
  }), Ut = w((e, i) => {
    var r = Dt(), a = Object.prototype, o = a.hasOwnProperty, h = a.toString, f = r ? r.toStringTag : void 0;
    function _(k) {
      var C = o.call(k, f), N = k[f];
      try {
        k[f] = void 0;
        var O = !0;
      } catch {
      }
      var K = h.call(k);
      return O && (C ? k[f] = N : delete k[f]), K;
    }
    i.exports = _;
  }), ne = w((e, i) => {
    var r = Object.prototype, a = r.toString;
    function o(h) {
      return a.call(h);
    }
    i.exports = o;
  }), Zt = w((e, i) => {
    var r = Dt(), a = Ut(), o = ne(), h = "[object Null]", f = "[object Undefined]", _ = r ? r.toStringTag : void 0;
    function k(C) {
      return C == null ? C === void 0 ? f : h : _ && _ in Object(C) ? a(C) : o(C);
    }
    i.exports = k;
  }), Wt = w((e, i) => {
    function r(a) {
      var o = typeof a;
      return a != null && (o == "object" || o == "function");
    }
    i.exports = r;
  }), ge = w((e, i) => {
    var r = Zt(), a = Wt(), o = "[object AsyncFunction]", h = "[object Function]", f = "[object GeneratorFunction]", _ = "[object Proxy]";
    function k(C) {
      if (!a(C)) return !1;
      var N = r(C);
      return N == h || N == f || N == o || N == _;
    }
    i.exports = k;
  }), He = w((e, i) => {
    var r = ee(), a = r["__core-js_shared__"];
    i.exports = a;
  }), kt = w((e, i) => {
    var r = He(), a = function() {
      var h = /[^.]+$/.exec(r && r.keys && r.keys.IE_PROTO || "");
      return h ? "Symbol(src)_1." + h : "";
    }();
    function o(h) {
      return !!a && a in h;
    }
    i.exports = o;
  }), Jt = w((e, i) => {
    var r = Function.prototype, a = r.toString;
    function o(h) {
      if (h != null) {
        try {
          return a.call(h);
        } catch {
        }
        try {
          return h + "";
        } catch {
        }
      }
      return "";
    }
    i.exports = o;
  }), ie = w((e, i) => {
    var r = ge(), a = kt(), o = Wt(), h = Jt(), f = /[\\^$.*+?()[\]{}|]/g, _ = /^\[object .+?Constructor\]$/, k = Function.prototype, C = Object.prototype, N = k.toString, O = C.hasOwnProperty, K = RegExp("^" + N.call(O).replace(f, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$");
    function Y(dt) {
      if (!o(dt) || a(dt)) return !1;
      var _t = r(dt) ? K : _;
      return _t.test(h(dt));
    }
    i.exports = Y;
  }), we = w((e, i) => {
    function r(a, o) {
      return a == null ? void 0 : a[o];
    }
    i.exports = r;
  }), Ot = w((e, i) => {
    var r = ie(), a = we();
    function o(h, f) {
      var _ = a(h, f);
      return r(_) ? _ : void 0;
    }
    i.exports = o;
  }), wt = w((e, i) => {
    var r = Ot(), a = ee(), o = r(a, "Map");
    i.exports = o;
  }), lt = w((e, i) => {
    var r = Ot(), a = r(Object, "create");
    i.exports = a;
  }), Bt = w((e, i) => {
    var r = lt();
    function a() {
      this.__data__ = r ? r(null) : {}, this.size = 0;
    }
    i.exports = a;
  }), Nt = w((e, i) => {
    function r(a) {
      var o = this.has(a) && delete this.__data__[a];
      return this.size -= o ? 1 : 0, o;
    }
    i.exports = r;
  }), ue = w((e, i) => {
    var r = lt(), a = "__lodash_hash_undefined__", o = Object.prototype, h = o.hasOwnProperty;
    function f(_) {
      var k = this.__data__;
      if (r) {
        var C = k[_];
        return C === a ? void 0 : C;
      }
      return h.call(k, _) ? k[_] : void 0;
    }
    i.exports = f;
  }), jt = w((e, i) => {
    var r = lt(), a = Object.prototype, o = a.hasOwnProperty;
    function h(f) {
      var _ = this.__data__;
      return r ? _[f] !== void 0 : o.call(_, f);
    }
    i.exports = h;
  }), St = w((e, i) => {
    var r = lt(), a = "__lodash_hash_undefined__";
    function o(h, f) {
      var _ = this.__data__;
      return this.size += this.has(h) ? 0 : 1, _[h] = r && f === void 0 ? a : f, this;
    }
    i.exports = o;
  }), Mt = w((e, i) => {
    var r = Bt(), a = Nt(), o = ue(), h = jt(), f = St();
    function _(k) {
      var C = -1, N = k == null ? 0 : k.length;
      for (this.clear(); ++C < N; ) {
        var O = k[C];
        this.set(O[0], O[1]);
      }
    }
    _.prototype.clear = r, _.prototype.delete = a, _.prototype.get = o, _.prototype.has = h, _.prototype.set = f, i.exports = _;
  }), be = w((e, i) => {
    var r = Mt(), a = ut(), o = wt();
    function h() {
      this.size = 0, this.__data__ = { hash: new r(), map: new (o || a)(), string: new r() };
    }
    i.exports = h;
  }), fe = w((e, i) => {
    function r(a) {
      var o = typeof a;
      return o == "string" || o == "number" || o == "symbol" || o == "boolean" ? a !== "__proto__" : a === null;
    }
    i.exports = r;
  }), ke = w((e, i) => {
    var r = fe();
    function a(o, h) {
      var f = o.__data__;
      return r(h) ? f[typeof h == "string" ? "string" : "hash"] : f.map;
    }
    i.exports = a;
  }), Bi = w((e, i) => {
    var r = ke();
    function a(o) {
      var h = r(this, o).delete(o);
      return this.size -= h ? 1 : 0, h;
    }
    i.exports = a;
  }), pn = w((e, i) => {
    var r = ke();
    function a(o) {
      return r(this, o).get(o);
    }
    i.exports = a;
  }), Fi = w((e, i) => {
    var r = ke();
    function a(o) {
      return r(this, o).has(o);
    }
    i.exports = a;
  }), mi = w((e, i) => {
    var r = ke();
    function a(o, h) {
      var f = r(this, o), _ = f.size;
      return f.set(o, h), this.size += f.size == _ ? 0 : 1, this;
    }
    i.exports = a;
  }), Ri = w((e, i) => {
    var r = be(), a = Bi(), o = pn(), h = Fi(), f = mi();
    function _(k) {
      var C = -1, N = k == null ? 0 : k.length;
      for (this.clear(); ++C < N; ) {
        var O = k[C];
        this.set(O[0], O[1]);
      }
    }
    _.prototype.clear = r, _.prototype.delete = a, _.prototype.get = o, _.prototype.has = h, _.prototype.set = f, i.exports = _;
  }), Yn = w((e, i) => {
    var r = ut(), a = wt(), o = Ri(), h = 200;
    function f(_, k) {
      var C = this.__data__;
      if (C instanceof r) {
        var N = C.__data__;
        if (!a || N.length < h - 1) return N.push([_, k]), this.size = ++C.size, this;
        C = this.__data__ = new o(N);
      }
      return C.set(_, k), this.size = C.size, this;
    }
    i.exports = f;
  }), Qn = w((e, i) => {
    var r = ut(), a = ft(), o = At(), h = Rt(), f = zt(), _ = Yn();
    function k(C) {
      var N = this.__data__ = new r(C);
      this.size = N.size;
    }
    k.prototype.clear = a, k.prototype.delete = o, k.prototype.get = h, k.prototype.has = f, k.prototype.set = _, i.exports = k;
  }), zi = w((e, i) => {
    var r = Ot(), a = function() {
      try {
        var o = r(Object, "defineProperty");
        return o({}, "", {}), o;
      } catch {
      }
    }();
    i.exports = a;
  }), Ni = w((e, i) => {
    var r = zi();
    function a(o, h, f) {
      h == "__proto__" && r ? r(o, h, { configurable: !0, enumerable: !0, value: f, writable: !0 }) : o[h] = f;
    }
    i.exports = a;
  }), tr = w((e, i) => {
    var r = Ni(), a = P();
    function o(h, f, _) {
      (_ !== void 0 && !a(h[f], _) || _ === void 0 && !(f in h)) && r(h, f, _);
    }
    i.exports = o;
  }), Tn = w((e, i) => {
    function r(a) {
      return function(o, h, f) {
        for (var _ = -1, k = Object(o), C = f(o), N = C.length; N--; ) {
          var O = C[a ? N : ++_];
          if (h(k[O], O, k) === !1) break;
        }
        return o;
      };
    }
    i.exports = r;
  }), ji = w((e, i) => {
    var r = Tn(), a = r();
    i.exports = a;
  }), ti = w((e, i) => {
    var r = ee(), a = typeof e == "object" && e && !e.nodeType && e, o = a && typeof i == "object" && i && !i.nodeType && i, h = o && o.exports === a, f = h ? r.Buffer : void 0, _ = f ? f.allocUnsafe : void 0;
    function k(C, N) {
      if (N) return C.slice();
      var O = C.length, K = _ ? _(O) : new C.constructor(O);
      return C.copy(K), K;
    }
    i.exports = k;
  }), mn = w((e, i) => {
    var r = ee(), a = r.Uint8Array;
    i.exports = a;
  }), Sr = w((e, i) => {
    var r = mn();
    function a(o) {
      var h = new o.constructor(o.byteLength);
      return new r(h).set(new r(o)), h;
    }
    i.exports = a;
  }), gi = w((e, i) => {
    var r = Sr();
    function a(o, h) {
      var f = h ? r(o.buffer) : o.buffer;
      return new o.constructor(f, o.byteOffset, o.length);
    }
    i.exports = a;
  }), Dn = w((e, i) => {
    function r(a, o) {
      var h = -1, f = a.length;
      for (o || (o = Array(f)); ++h < f; ) o[h] = a[h];
      return o;
    }
    i.exports = r;
  }), T = w((e, i) => {
    var r = Wt(), a = Object.create, o = /* @__PURE__ */ function() {
      function h() {
      }
      return function(f) {
        if (!r(f)) return {};
        if (a) return a(f);
        h.prototype = f;
        var _ = new h();
        return h.prototype = void 0, _;
      };
    }();
    i.exports = o;
  }), m = w((e, i) => {
    function r(a, o) {
      return function(h) {
        return a(o(h));
      };
    }
    i.exports = r;
  }), v = w((e, i) => {
    var r = m(), a = r(Object.getPrototypeOf, Object);
    i.exports = a;
  }), R = w((e, i) => {
    var r = Object.prototype;
    function a(o) {
      var h = o && o.constructor, f = typeof h == "function" && h.prototype || r;
      return o === f;
    }
    i.exports = a;
  }), X = w((e, i) => {
    var r = T(), a = v(), o = R();
    function h(f) {
      return typeof f.constructor == "function" && !o(f) ? r(a(f)) : {};
    }
    i.exports = h;
  }), ot = w((e, i) => {
    function r(a) {
      return a != null && typeof a == "object";
    }
    i.exports = r;
  }), pt = w((e, i) => {
    var r = Zt(), a = ot(), o = "[object Arguments]";
    function h(f) {
      return a(f) && r(f) == o;
    }
    i.exports = h;
  }), Yt = w((e, i) => {
    var r = pt(), a = ot(), o = Object.prototype, h = o.hasOwnProperty, f = o.propertyIsEnumerable, _ = r(/* @__PURE__ */ function() {
      return arguments;
    }()) ? r : function(k) {
      return a(k) && h.call(k, "callee") && !f.call(k, "callee");
    };
    i.exports = _;
  }), ye = w((e, i) => {
    var r = Array.isArray;
    i.exports = r;
  }), xe = w((e, i) => {
    var r = 9007199254740991;
    function a(o) {
      return typeof o == "number" && o > -1 && o % 1 == 0 && o <= r;
    }
    i.exports = a;
  }), _e = w((e, i) => {
    var r = ge(), a = xe();
    function o(h) {
      return h != null && a(h.length) && !r(h);
    }
    i.exports = o;
  }), ve = w((e, i) => {
    var r = _e(), a = ot();
    function o(h) {
      return a(h) && r(h);
    }
    i.exports = o;
  }), Js = w((e, i) => {
    function r() {
      return !1;
    }
    i.exports = r;
  }), Pr = w((e, i) => {
    var r = ee(), a = Js(), o = typeof e == "object" && e && !e.nodeType && e, h = o && typeof i == "object" && i && !i.nodeType && i, f = h && h.exports === o, _ = f ? r.Buffer : void 0, k = _ ? _.isBuffer : void 0, C = k || a;
    i.exports = C;
  }), Ia = w((e, i) => {
    var r = Zt(), a = v(), o = ot(), h = "[object Object]", f = Function.prototype, _ = Object.prototype, k = f.toString, C = _.hasOwnProperty, N = k.call(Object);
    function O(K) {
      if (!o(K) || r(K) != h) return !1;
      var Y = a(K);
      if (Y === null) return !0;
      var dt = C.call(Y, "constructor") && Y.constructor;
      return typeof dt == "function" && dt instanceof dt && k.call(dt) == N;
    }
    i.exports = O;
  }), Fa = w((e, i) => {
    var r = Zt(), a = xe(), o = ot(), h = "[object Arguments]", f = "[object Array]", _ = "[object Boolean]", k = "[object Date]", C = "[object Error]", N = "[object Function]", O = "[object Map]", K = "[object Number]", Y = "[object Object]", dt = "[object RegExp]", _t = "[object Set]", Lt = "[object String]", Pt = "[object WeakMap]", F = "[object ArrayBuffer]", nt = "[object DataView]", ct = "[object Float32Array]", vt = "[object Float64Array]", yt = "[object Int8Array]", bt = "[object Int16Array]", A = "[object Int32Array]", D = "[object Uint8Array]", I = "[object Uint8ClampedArray]", W = "[object Uint16Array]", Z = "[object Uint32Array]", U = {};
    U[ct] = U[vt] = U[yt] = U[bt] = U[A] = U[D] = U[I] = U[W] = U[Z] = !0, U[h] = U[f] = U[F] = U[_] = U[nt] = U[k] = U[C] = U[N] = U[O] = U[K] = U[Y] = U[dt] = U[_t] = U[Lt] = U[Pt] = !1;
    function it(J) {
      return o(J) && a(J.length) && !!U[r(J)];
    }
    i.exports = it;
  }), Xs = w((e, i) => {
    function r(a) {
      return function(o) {
        return a(o);
      };
    }
    i.exports = r;
  }), Ys = w((e, i) => {
    var r = Et(), a = typeof e == "object" && e && !e.nodeType && e, o = a && typeof i == "object" && i && !i.nodeType && i, h = o && o.exports === a, f = h && r.process, _ = function() {
      try {
        var k = o && o.require && o.require("util").types;
        return k || f && f.binding && f.binding("util");
      } catch {
      }
    }();
    i.exports = _;
  }), Ra = w((e, i) => {
    var r = Fa(), a = Xs(), o = Ys(), h = o && o.isTypedArray, f = h ? a(h) : r;
    i.exports = f;
  }), za = w((e, i) => {
    function r(a, o) {
      if (!(o === "constructor" && typeof a[o] == "function") && o != "__proto__") return a[o];
    }
    i.exports = r;
  }), Qs = w((e, i) => {
    var r = Ni(), a = P(), o = Object.prototype, h = o.hasOwnProperty;
    function f(_, k, C) {
      var N = _[k];
      (!(h.call(_, k) && a(N, C)) || C === void 0 && !(k in _)) && r(_, k, C);
    }
    i.exports = f;
  }), to = w((e, i) => {
    var r = Qs(), a = Ni();
    function o(h, f, _, k) {
      var C = !_;
      _ || (_ = {});
      for (var N = -1, O = f.length; ++N < O; ) {
        var K = f[N], Y = k ? k(_[K], h[K], K, _, h) : void 0;
        Y === void 0 && (Y = h[K]), C ? a(_, K, Y) : r(_, K, Y);
      }
      return _;
    }
    i.exports = o;
  }), Tr = w((e, i) => {
    function r(a, o) {
      for (var h = -1, f = Array(a); ++h < a; ) f[h] = o(h);
      return f;
    }
    i.exports = r;
  }), Na = w((e, i) => {
    var r = 9007199254740991, a = /^(?:0|[1-9]\d*)$/;
    function o(h, f) {
      var _ = typeof h;
      return f = f ?? r, !!f && (_ == "number" || _ != "symbol" && a.test(h)) && h > -1 && h % 1 == 0 && h < f;
    }
    i.exports = o;
  }), eo = w((e, i) => {
    var r = Tr(), a = Yt(), o = ye(), h = Pr(), f = Na(), _ = Ra(), k = Object.prototype, C = k.hasOwnProperty;
    function N(O, K) {
      var Y = o(O), dt = !Y && a(O), _t = !Y && !dt && h(O), Lt = !Y && !dt && !_t && _(O), Pt = Y || dt || _t || Lt, F = Pt ? r(O.length, String) : [], nt = F.length;
      for (var ct in O) (K || C.call(O, ct)) && !(Pt && (ct == "length" || _t && (ct == "offset" || ct == "parent") || Lt && (ct == "buffer" || ct == "byteLength" || ct == "byteOffset") || f(ct, nt))) && F.push(ct);
      return F;
    }
    i.exports = N;
  }), io = w((e, i) => {
    function r(a) {
      var o = [];
      if (a != null) for (var h in Object(a)) o.push(h);
      return o;
    }
    i.exports = r;
  }), no = w((e, i) => {
    var r = Wt(), a = R(), o = io(), h = Object.prototype, f = h.hasOwnProperty;
    function _(k) {
      if (!r(k)) return o(k);
      var C = a(k), N = [];
      for (var O in k) O == "constructor" && (C || !f.call(k, O)) || N.push(O);
      return N;
    }
    i.exports = _;
  }), ci = w((e, i) => {
    var r = eo(), a = no(), o = _e();
    function h(f) {
      return o(f) ? r(f, !0) : a(f);
    }
    i.exports = h;
  }), Gt = w((e, i) => {
    var r = to(), a = ci();
    function o(h) {
      return r(h, a(h));
    }
    i.exports = o;
  }), ja = w((e, i) => {
    var r = tr(), a = ti(), o = gi(), h = Dn(), f = X(), _ = Yt(), k = ye(), C = ve(), N = Pr(), O = ge(), K = Wt(), Y = Ia(), dt = Ra(), _t = za(), Lt = Gt();
    function Pt(F, nt, ct, vt, yt, bt, A) {
      var D = _t(F, ct), I = _t(nt, ct), W = A.get(I);
      if (W) {
        r(F, ct, W);
        return;
      }
      var Z = bt ? bt(D, I, ct + "", F, nt, A) : void 0, U = Z === void 0;
      if (U) {
        var it = k(I), J = !it && N(I), et = !it && !J && dt(I);
        Z = I, it || J || et ? k(D) ? Z = D : C(D) ? Z = h(D) : J ? (U = !1, Z = a(I, !0)) : et ? (U = !1, Z = o(I, !0)) : Z = [] : Y(I) || _(I) ? (Z = D, _(D) ? Z = Lt(D) : (!K(D) || O(D)) && (Z = f(I))) : U = !1;
      }
      U && (A.set(I, Z), yt(Z, I, vt, bt, A), A.delete(I)), r(F, ct, Z);
    }
    i.exports = Pt;
  }), Va = w((e, i) => {
    var r = Qn(), a = tr(), o = ji(), h = ja(), f = Wt(), _ = ci(), k = za();
    function C(N, O, K, Y, dt) {
      N !== O && o(O, function(_t, Lt) {
        if (dt || (dt = new r()), f(_t)) h(N, O, Lt, K, C, Y, dt);
        else {
          var Pt = Y ? Y(k(N, Lt), _t, Lt + "", N, O, dt) : void 0;
          Pt === void 0 && (Pt = _t), a(N, Lt, Pt);
        }
      }, _);
    }
    i.exports = C;
  }), Dr = w((e, i) => {
    function r(a) {
      return a;
    }
    i.exports = r;
  }), $a = w((e, i) => {
    function r(a, o, h) {
      switch (h.length) {
        case 0:
          return a.call(o);
        case 1:
          return a.call(o, h[0]);
        case 2:
          return a.call(o, h[0], h[1]);
        case 3:
          return a.call(o, h[0], h[1], h[2]);
      }
      return a.apply(o, h);
    }
    i.exports = r;
  }), Or = w((e, i) => {
    var r = $a(), a = Math.max;
    function o(h, f, _) {
      return f = a(f === void 0 ? h.length - 1 : f, 0), function() {
        for (var k = arguments, C = -1, N = a(k.length - f, 0), O = Array(N); ++C < N; ) O[C] = k[f + C];
        C = -1;
        for (var K = Array(f + 1); ++C < f; ) K[C] = k[C];
        return K[f] = _(O), r(h, this, K);
      };
    }
    i.exports = o;
  }), Ua = w((e, i) => {
    function r(a) {
      return function() {
        return a;
      };
    }
    i.exports = r;
  }), gn = w((e, i) => {
    var r = Ua(), a = zi(), o = Dr(), h = a ? function(f, _) {
      return a(f, "toString", { configurable: !0, enumerable: !1, value: r(_), writable: !0 });
    } : o;
    i.exports = h;
  }), Ga = w((e, i) => {
    var r = 800, a = 16, o = Date.now;
    function h(f) {
      var _ = 0, k = 0;
      return function() {
        var C = o(), N = a - (C - k);
        if (k = C, N > 0) {
          if (++_ >= r) return arguments[0];
        } else _ = 0;
        return f.apply(void 0, arguments);
      };
    }
    i.exports = h;
  }), ro = w((e, i) => {
    var r = gn(), a = Ga(), o = a(r);
    i.exports = o;
  }), ao = w((e, i) => {
    var r = Dr(), a = Or(), o = ro();
    function h(f, _) {
      return o(a(f, _, r), f + "");
    }
    i.exports = h;
  }), so = w((e, i) => {
    var r = P(), a = _e(), o = Na(), h = Wt();
    function f(_, k, C) {
      if (!h(C)) return !1;
      var N = typeof k;
      return (N == "number" ? a(C) && o(k, C.length) : N == "string" && k in C) ? r(C[k], _) : !1;
    }
    i.exports = f;
  }), oo = w((e, i) => {
    var r = ao(), a = so();
    function o(h) {
      return r(function(f, _) {
        var k = -1, C = _.length, N = C > 1 ? _[C - 1] : void 0, O = C > 2 ? _[2] : void 0;
        for (N = h.length > 3 && typeof N == "function" ? (C--, N) : void 0, O && a(_[0], _[1], O) && (N = C < 3 ? void 0 : N, C = 1), f = Object(f); ++k < C; ) {
          var K = _[k];
          K && h(f, K, k, N);
        }
        return f;
      });
    }
    i.exports = o;
  }), er = w((e, i) => {
    var r = Va(), a = oo(), o = a(function(h, f, _) {
      r(h, f, _);
    });
    i.exports = o;
  }), Ir = w((e, i) => {
    var r = Zt(), a = ot(), o = "[object Symbol]";
    function h(f) {
      return typeof f == "symbol" || a(f) && r(f) == o;
    }
    i.exports = h;
  }), ir = w((e, i) => {
    var r = ye(), a = Ir(), o = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/, h = /^\w*$/;
    function f(_, k) {
      if (r(_)) return !1;
      var C = typeof _;
      return C == "number" || C == "symbol" || C == "boolean" || _ == null || a(_) ? !0 : h.test(_) || !o.test(_) || k != null && _ in Object(k);
    }
    i.exports = f;
  }), lo = w((e, i) => {
    var r = Ri(), a = "Expected a function";
    function o(h, f) {
      if (typeof h != "function" || f != null && typeof f != "function") throw new TypeError(a);
      var _ = function() {
        var k = arguments, C = f ? f.apply(this, k) : k[0], N = _.cache;
        if (N.has(C)) return N.get(C);
        var O = h.apply(this, k);
        return _.cache = N.set(C, O) || N, O;
      };
      return _.cache = new (o.Cache || r)(), _;
    }
    o.Cache = r, i.exports = o;
  }), uo = w((e, i) => {
    var r = lo(), a = 500;
    function o(h) {
      var f = r(h, function(k) {
        return _.size === a && _.clear(), k;
      }), _ = f.cache;
      return f;
    }
    i.exports = o;
  }), ho = w((e, i) => {
    var r = uo(), a = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g, o = /\\(\\)?/g, h = r(function(f) {
      var _ = [];
      return f.charCodeAt(0) === 46 && _.push(""), f.replace(a, function(k, C, N, O) {
        _.push(N ? O.replace(o, "$1") : C || k);
      }), _;
    });
    i.exports = h;
  }), co = w((e, i) => {
    function r(a, o) {
      for (var h = -1, f = a == null ? 0 : a.length, _ = Array(f); ++h < f; ) _[h] = o(a[h], h, a);
      return _;
    }
    i.exports = r;
  }), fo = w((e, i) => {
    var r = Dt(), a = co(), o = ye(), h = Ir(), f = r ? r.prototype : void 0, _ = f ? f.toString : void 0;
    function k(C) {
      if (typeof C == "string") return C;
      if (o(C)) return a(C, k) + "";
      if (h(C)) return _ ? _.call(C) : "";
      var N = C + "";
      return N == "0" && 1 / C == -1 / 0 ? "-0" : N;
    }
    i.exports = k;
  }), Fr = w((e, i) => {
    var r = fo();
    function a(o) {
      return o == null ? "" : r(o);
    }
    i.exports = a;
  }), On = w((e, i) => {
    var r = ye(), a = ir(), o = ho(), h = Fr();
    function f(_, k) {
      return r(_) ? _ : a(_, k) ? [_] : o(h(_));
    }
    i.exports = f;
  }), Za = w((e, i) => {
    var r = Ir();
    function a(o) {
      if (typeof o == "string" || r(o)) return o;
      var h = o + "";
      return h == "0" && 1 / o == -1 / 0 ? "-0" : h;
    }
    i.exports = a;
  }), qa = w((e, i) => {
    var r = On(), a = Za();
    function o(h, f) {
      f = r(f, h);
      for (var _ = 0, k = f.length; h != null && _ < k; ) h = h[a(f[_++])];
      return _ && _ == k ? h : void 0;
    }
    i.exports = o;
  }), Vi = w((e, i) => {
    var r = qa();
    function a(o, h, f) {
      var _ = o == null ? void 0 : r(o, h);
      return _ === void 0 ? f : _;
    }
    i.exports = a;
  }), de = w((e, i) => {
    (function(r, a) {
      typeof e == "object" && typeof i < "u" ? i.exports = a() : (r = r || self).RBush = a();
    })(e, function() {
      function r(F, nt, ct, vt, yt) {
        (function bt(A, D, I, W, Z) {
          for (; W > I; ) {
            if (W - I > 600) {
              var U = W - I + 1, it = D - I + 1, J = Math.log(U), et = 0.5 * Math.exp(2 * J / 3), st = 0.5 * Math.sqrt(J * et * (U - et) / U) * (it - U / 2 < 0 ? -1 : 1), at = Math.max(I, Math.floor(D - it * et / U + st)), mt = Math.min(W, Math.floor(D + (U - it) * et / U + st));
              bt(A, D, at, mt, Z);
            }
            var Vt = A[D], $t = I, te = W;
            for (a(A, I, D), Z(A[W], Vt) > 0 && a(A, I, W); $t < te; ) {
              for (a(A, $t, te), $t++, te--; Z(A[$t], Vt) < 0; ) $t++;
              for (; Z(A[te], Vt) > 0; ) te--;
            }
            Z(A[I], Vt) === 0 ? a(A, I, te) : a(A, ++te, W), te <= D && (I = te + 1), D <= te && (W = te - 1);
          }
        })(F, nt, ct || 0, vt || F.length - 1, yt || o);
      }
      function a(F, nt, ct) {
        var vt = F[nt];
        F[nt] = F[ct], F[ct] = vt;
      }
      function o(F, nt) {
        return F < nt ? -1 : F > nt ? 1 : 0;
      }
      var h = function(F) {
        F === void 0 && (F = 9), this._maxEntries = Math.max(4, F), this._minEntries = Math.max(2, Math.ceil(0.4 * this._maxEntries)), this.clear();
      };
      function f(F, nt, ct) {
        if (!ct) return nt.indexOf(F);
        for (var vt = 0; vt < nt.length; vt++) if (ct(F, nt[vt])) return vt;
        return -1;
      }
      function _(F, nt) {
        k(F, 0, F.children.length, nt, F);
      }
      function k(F, nt, ct, vt, yt) {
        yt || (yt = Lt(null)), yt.minX = 1 / 0, yt.minY = 1 / 0, yt.maxX = -1 / 0, yt.maxY = -1 / 0;
        for (var bt = nt; bt < ct; bt++) {
          var A = F.children[bt];
          C(yt, F.leaf ? vt(A) : A);
        }
        return yt;
      }
      function C(F, nt) {
        return F.minX = Math.min(F.minX, nt.minX), F.minY = Math.min(F.minY, nt.minY), F.maxX = Math.max(F.maxX, nt.maxX), F.maxY = Math.max(F.maxY, nt.maxY), F;
      }
      function N(F, nt) {
        return F.minX - nt.minX;
      }
      function O(F, nt) {
        return F.minY - nt.minY;
      }
      function K(F) {
        return (F.maxX - F.minX) * (F.maxY - F.minY);
      }
      function Y(F) {
        return F.maxX - F.minX + (F.maxY - F.minY);
      }
      function dt(F, nt) {
        return F.minX <= nt.minX && F.minY <= nt.minY && nt.maxX <= F.maxX && nt.maxY <= F.maxY;
      }
      function _t(F, nt) {
        return nt.minX <= F.maxX && nt.minY <= F.maxY && nt.maxX >= F.minX && nt.maxY >= F.minY;
      }
      function Lt(F) {
        return { children: F, height: 1, leaf: !0, minX: 1 / 0, minY: 1 / 0, maxX: -1 / 0, maxY: -1 / 0 };
      }
      function Pt(F, nt, ct, vt, yt) {
        for (var bt = [nt, ct]; bt.length; ) if (!((ct = bt.pop()) - (nt = bt.pop()) <= vt)) {
          var A = nt + Math.ceil((ct - nt) / vt / 2) * vt;
          r(F, A, nt, ct, yt), bt.push(nt, A, A, ct);
        }
      }
      return h.prototype.all = function() {
        return this._all(this.data, []);
      }, h.prototype.search = function(F) {
        var nt = this.data, ct = [];
        if (!_t(F, nt)) return ct;
        for (var vt = this.toBBox, yt = []; nt; ) {
          for (var bt = 0; bt < nt.children.length; bt++) {
            var A = nt.children[bt], D = nt.leaf ? vt(A) : A;
            _t(F, D) && (nt.leaf ? ct.push(A) : dt(F, D) ? this._all(A, ct) : yt.push(A));
          }
          nt = yt.pop();
        }
        return ct;
      }, h.prototype.collides = function(F) {
        var nt = this.data;
        if (!_t(F, nt)) return !1;
        for (var ct = []; nt; ) {
          for (var vt = 0; vt < nt.children.length; vt++) {
            var yt = nt.children[vt], bt = nt.leaf ? this.toBBox(yt) : yt;
            if (_t(F, bt)) {
              if (nt.leaf || dt(F, bt)) return !0;
              ct.push(yt);
            }
          }
          nt = ct.pop();
        }
        return !1;
      }, h.prototype.load = function(F) {
        if (!F || !F.length) return this;
        if (F.length < this._minEntries) {
          for (var nt = 0; nt < F.length; nt++) this.insert(F[nt]);
          return this;
        }
        var ct = this._build(F.slice(), 0, F.length - 1, 0);
        if (this.data.children.length) if (this.data.height === ct.height) this._splitRoot(this.data, ct);
        else {
          if (this.data.height < ct.height) {
            var vt = this.data;
            this.data = ct, ct = vt;
          }
          this._insert(ct, this.data.height - ct.height - 1, !0);
        }
        else this.data = ct;
        return this;
      }, h.prototype.insert = function(F) {
        return F && this._insert(F, this.data.height - 1), this;
      }, h.prototype.clear = function() {
        return this.data = Lt([]), this;
      }, h.prototype.remove = function(F, nt) {
        if (!F) return this;
        for (var ct, vt, yt, bt = this.data, A = this.toBBox(F), D = [], I = []; bt || D.length; ) {
          if (bt || (bt = D.pop(), vt = D[D.length - 1], ct = I.pop(), yt = !0), bt.leaf) {
            var W = f(F, bt.children, nt);
            if (W !== -1) return bt.children.splice(W, 1), D.push(bt), this._condense(D), this;
          }
          yt || bt.leaf || !dt(bt, A) ? vt ? (ct++, bt = vt.children[ct], yt = !1) : bt = null : (D.push(bt), I.push(ct), ct = 0, vt = bt, bt = bt.children[0]);
        }
        return this;
      }, h.prototype.toBBox = function(F) {
        return F;
      }, h.prototype.compareMinX = function(F, nt) {
        return F.minX - nt.minX;
      }, h.prototype.compareMinY = function(F, nt) {
        return F.minY - nt.minY;
      }, h.prototype.toJSON = function() {
        return this.data;
      }, h.prototype.fromJSON = function(F) {
        return this.data = F, this;
      }, h.prototype._all = function(F, nt) {
        for (var ct = []; F; ) F.leaf ? nt.push.apply(nt, F.children) : ct.push.apply(ct, F.children), F = ct.pop();
        return nt;
      }, h.prototype._build = function(F, nt, ct, vt) {
        var yt, bt = ct - nt + 1, A = this._maxEntries;
        if (bt <= A) return _(yt = Lt(F.slice(nt, ct + 1)), this.toBBox), yt;
        vt || (vt = Math.ceil(Math.log(bt) / Math.log(A)), A = Math.ceil(bt / Math.pow(A, vt - 1))), (yt = Lt([])).leaf = !1, yt.height = vt;
        var D = Math.ceil(bt / A), I = D * Math.ceil(Math.sqrt(A));
        Pt(F, nt, ct, I, this.compareMinX);
        for (var W = nt; W <= ct; W += I) {
          var Z = Math.min(W + I - 1, ct);
          Pt(F, W, Z, D, this.compareMinY);
          for (var U = W; U <= Z; U += D) {
            var it = Math.min(U + D - 1, Z);
            yt.children.push(this._build(F, U, it, vt - 1));
          }
        }
        return _(yt, this.toBBox), yt;
      }, h.prototype._chooseSubtree = function(F, nt, ct, vt) {
        for (; vt.push(nt), !nt.leaf && vt.length - 1 !== ct; ) {
          for (var yt = 1 / 0, bt = 1 / 0, A = void 0, D = 0; D < nt.children.length; D++) {
            var I = nt.children[D], W = K(I), Z = (U = F, it = I, (Math.max(it.maxX, U.maxX) - Math.min(it.minX, U.minX)) * (Math.max(it.maxY, U.maxY) - Math.min(it.minY, U.minY)) - W);
            Z < bt ? (bt = Z, yt = W < yt ? W : yt, A = I) : Z === bt && W < yt && (yt = W, A = I);
          }
          nt = A || nt.children[0];
        }
        var U, it;
        return nt;
      }, h.prototype._insert = function(F, nt, ct) {
        var vt = ct ? F : this.toBBox(F), yt = [], bt = this._chooseSubtree(vt, this.data, nt, yt);
        for (bt.children.push(F), C(bt, vt); nt >= 0 && yt[nt].children.length > this._maxEntries; ) this._split(yt, nt), nt--;
        this._adjustParentBBoxes(vt, yt, nt);
      }, h.prototype._split = function(F, nt) {
        var ct = F[nt], vt = ct.children.length, yt = this._minEntries;
        this._chooseSplitAxis(ct, yt, vt);
        var bt = this._chooseSplitIndex(ct, yt, vt), A = Lt(ct.children.splice(bt, ct.children.length - bt));
        A.height = ct.height, A.leaf = ct.leaf, _(ct, this.toBBox), _(A, this.toBBox), nt ? F[nt - 1].children.push(A) : this._splitRoot(ct, A);
      }, h.prototype._splitRoot = function(F, nt) {
        this.data = Lt([F, nt]), this.data.height = F.height + 1, this.data.leaf = !1, _(this.data, this.toBBox);
      }, h.prototype._chooseSplitIndex = function(F, nt, ct) {
        for (var vt, yt, bt, A, D, I, W, Z = 1 / 0, U = 1 / 0, it = nt; it <= ct - nt; it++) {
          var J = k(F, 0, it, this.toBBox), et = k(F, it, ct, this.toBBox), st = (yt = J, bt = et, A = void 0, D = void 0, I = void 0, W = void 0, A = Math.max(yt.minX, bt.minX), D = Math.max(yt.minY, bt.minY), I = Math.min(yt.maxX, bt.maxX), W = Math.min(yt.maxY, bt.maxY), Math.max(0, I - A) * Math.max(0, W - D)), at = K(J) + K(et);
          st < Z ? (Z = st, vt = it, U = at < U ? at : U) : st === Z && at < U && (U = at, vt = it);
        }
        return vt || ct - nt;
      }, h.prototype._chooseSplitAxis = function(F, nt, ct) {
        var vt = F.leaf ? this.compareMinX : N, yt = F.leaf ? this.compareMinY : O;
        this._allDistMargin(F, nt, ct, vt) < this._allDistMargin(F, nt, ct, yt) && F.children.sort(vt);
      }, h.prototype._allDistMargin = function(F, nt, ct, vt) {
        F.children.sort(vt);
        for (var yt = this.toBBox, bt = k(F, 0, nt, yt), A = k(F, ct - nt, ct, yt), D = Y(bt) + Y(A), I = nt; I < ct - nt; I++) {
          var W = F.children[I];
          C(bt, F.leaf ? yt(W) : W), D += Y(bt);
        }
        for (var Z = ct - nt - 1; Z >= nt; Z--) {
          var U = F.children[Z];
          C(A, F.leaf ? yt(U) : U), D += Y(A);
        }
        return D;
      }, h.prototype._adjustParentBBoxes = function(F, nt, ct) {
        for (var vt = ct; vt >= 0; vt--) C(nt[vt], F);
      }, h.prototype._condense = function(F) {
        for (var nt = F.length - 1, ct = void 0; nt >= 0; nt--) F[nt].children.length === 0 ? nt > 0 ? (ct = F[nt - 1].children).splice(ct.indexOf(F[nt]), 1) : this.clear() : _(F[nt], this.toBBox);
      }, h;
    });
  });
  Array.prototype.findIndex = Array.prototype.findIndex || function(e) {
    if (this === null) throw new TypeError("Array.prototype.findIndex called on null or undefined");
    if (typeof e != "function") throw new TypeError("callback must be a function");
    for (var i = Object(this), r = i.length >>> 0, a = arguments[1], o = 0; o < r; o++) if (e.call(a, i[o], o, i)) return o;
    return -1;
  }, Array.prototype.find = Array.prototype.find || function(e) {
    if (this === null) throw new TypeError("Array.prototype.find called on null or undefined");
    if (typeof e != "function") throw new TypeError("callback must be a function");
    for (var i = Object(this), r = i.length >>> 0, a = arguments[1], o = 0; o < r; o++) {
      var h = i[o];
      if (e.call(a, h, o, i)) return h;
    }
  }, typeof Object.assign != "function" && (Object.assign = function(e) {
    if (e == null) throw new TypeError("Cannot convert undefined or null to object");
    e = Object(e);
    for (var i = 1; i < arguments.length; i++) {
      var r = arguments[i];
      if (r != null) for (var a in r) Object.prototype.hasOwnProperty.call(r, a) && (e[a] = r[a]);
    }
    return e;
  }), function(e) {
    e.forEach(function(i) {
      i.hasOwnProperty("remove") || Object.defineProperty(i, "remove", { configurable: !0, enumerable: !0, writable: !0, value: function() {
        this.parentNode.removeChild(this);
      } });
    });
  }([Element.prototype, CharacterData.prototype, DocumentType.prototype]), Array.prototype.includes || Object.defineProperty(Array.prototype, "includes", { value: function(e, i) {
    if (this == null) throw new TypeError('"this" is null or not defined');
    var r = Object(this), a = r.length >>> 0;
    if (a === 0) return !1;
    var o = i | 0, h = Math.max(o >= 0 ? o : a - Math.abs(o), 0);
    function f(_, k) {
      return _ === k || typeof _ == "number" && typeof k == "number" && isNaN(_) && isNaN(k);
    }
    for (; h < a; ) {
      if (f(r[h], e)) return !0;
      h++;
    }
    return !1;
  } });
  var Ce = { version: "2.19.3" }, In = x(er()), _n = { tooltips: { placeMarker: "Click to place marker", placeMarkerTouch: "Tap the map to place a marker", firstVertex: "Click to place first vertex", continueLine: "Click to continue drawing", finishLine: "Click any existing marker to finish", finishPoly: "Click first marker to finish", finishRect: "Click to finish", startCircle: "Click to place circle center", finishCircle: "Click to finish circle", placeCircleMarker: "Click to place circle marker", placeText: "Click to place text", selectFirstLayerFor: "Select first layer for {action}", selectSecondLayerFor: "Select second layer for {action}" }, actions: { finish: "Finish", cancel: "Cancel", removeLastVertex: "Remove Last Vertex" }, buttonTitles: { drawMarkerButton: "Draw Marker", drawPolyButton: "Draw Polygons", drawLineButton: "Draw Polyline", drawCircleButton: "Draw Circle", drawRectButton: "Draw Rectangle", editButton: "Edit Layers", dragButton: "Drag Layers", cutButton: "Cut Layers", deleteButton: "Remove Layers", drawCircleMarkerButton: "Draw Circle Marker", snappingButton: "Snap dragged marker to other layers and vertices", pinningButton: "Pin shared vertices together", rotateButton: "Rotate Layers", drawTextButton: "Draw Text", scaleButton: "Scale Layers", autoTracingButton: "Auto trace Line", snapGuidesButton: "Show SnapGuides", unionButton: "Union layers", differenceButton: "Subtract layers" }, measurements: { totalLength: "Length", segmentLength: "Segment length", area: "Area", radius: "Radius", perimeter: "Perimeter", height: "Height", width: "Width", coordinates: "Position", coordinatesMarker: "Position Marker" } }, yn = { tooltips: { placeMarker: "Platziere den Marker mit Klick", placeMarkerTouch: "Tippe auf die Karte, um einen Marker zu platzieren", firstVertex: "Platziere den ersten Marker mit Klick", continueLine: "Klicke, um weiter zu zeichnen", finishLine: "Beende mit Klick auf existierenden Marker", finishPoly: "Beende mit Klick auf ersten Marker", finishRect: "Beende mit Klick", startCircle: "Platziere das Kreiszentrum mit Klick", finishCircle: "Beende den Kreis mit Klick", placeCircleMarker: "Platziere den Kreismarker mit Klick", placeText: "Platziere den Text mit Klick" }, actions: { finish: "Beenden", cancel: "Abbrechen", removeLastVertex: "Letzten Vertex löschen" }, buttonTitles: { drawMarkerButton: "Marker zeichnen", drawPolyButton: "Polygon zeichnen", drawLineButton: "Polyline zeichnen", drawCircleButton: "Kreis zeichnen", drawRectButton: "Rechteck zeichnen", editButton: "Layer editieren", dragButton: "Layer bewegen", cutButton: "Layer schneiden", deleteButton: "Layer löschen", drawCircleMarkerButton: "Kreismarker zeichnen", snappingButton: "Bewegter Layer an andere Layer oder Vertexe einhacken", pinningButton: "Vertexe an der gleichen Position verknüpfen", rotateButton: "Layer drehen", drawTextButton: "Text zeichnen", scaleButton: "Layer skalieren", autoTracingButton: "Linie automatisch nachzeichen" }, measurements: { totalLength: "Länge", segmentLength: "Segment Länge", area: "Fläche", radius: "Radius", perimeter: "Umfang", height: "Höhe", width: "Breite", coordinates: "Position", coordinatesMarker: "Position Marker" } }, Rr = { tooltips: { placeMarker: "Clicca per posizionare un Marker", placeMarkerTouch: "Tocca la mappa per posizionare un marker", firstVertex: "Clicca per posizionare il primo vertice", continueLine: "Clicca per continuare a disegnare", finishLine: "Clicca qualsiasi marker esistente per terminare", finishPoly: "Clicca il primo marker per terminare", finishRect: "Clicca per terminare", startCircle: "Clicca per posizionare il punto centrale del cerchio", finishCircle: "Clicca per terminare il cerchio", placeCircleMarker: "Clicca per posizionare un Marker del cherchio" }, actions: { finish: "Termina", cancel: "Annulla", removeLastVertex: "Rimuovi l'ultimo vertice" }, buttonTitles: { drawMarkerButton: "Disegna Marker", drawPolyButton: "Disegna Poligoni", drawLineButton: "Disegna Polilinea", drawCircleButton: "Disegna Cerchio", drawRectButton: "Disegna Rettangolo", editButton: "Modifica Livelli", dragButton: "Sposta Livelli", cutButton: "Ritaglia Livelli", deleteButton: "Elimina Livelli", drawCircleMarkerButton: "Disegna Marker del Cerchio", snappingButton: "Snap ha trascinato il pennarello su altri strati e vertici", pinningButton: "Pin condiviso vertici insieme", rotateButton: "Ruota livello" } }, re = { tooltips: { placeMarker: "Klik untuk menempatkan marker", placeMarkerTouch: "Ketuk peta untuk menempatkan marker", firstVertex: "Klik untuk menempatkan vertex pertama", continueLine: "Klik untuk meneruskan digitasi", finishLine: "Klik pada sembarang marker yang ada untuk mengakhiri", finishPoly: "Klik marker pertama untuk mengakhiri", finishRect: "Klik untuk mengakhiri", startCircle: "Klik untuk menempatkan titik pusat lingkaran", finishCircle: "Klik untuk mengakhiri lingkaran", placeCircleMarker: "Klik untuk menempatkan penanda lingkarann" }, actions: { finish: "Selesai", cancel: "Batal", removeLastVertex: "Hilangkan Vertex Terakhir" }, buttonTitles: { drawMarkerButton: "Digitasi Marker", drawPolyButton: "Digitasi Polygon", drawLineButton: "Digitasi Polyline", drawCircleButton: "Digitasi Lingkaran", drawRectButton: "Digitasi Segi Empat", editButton: "Edit Layer", dragButton: "Geser Layer", cutButton: "Potong Layer", deleteButton: "Hilangkan Layer", drawCircleMarkerButton: "Digitasi Penanda Lingkaran", snappingButton: "Jepretkan penanda yang ditarik ke lapisan dan simpul lain", pinningButton: "Sematkan simpul bersama bersama", rotateButton: "Putar lapisan" } }, Me = { tooltips: { placeMarker: "Adaugă un punct", placeMarkerTouch: "Atingeți harta pentru a plasa un punct", firstVertex: "Apasă aici pentru a adăuga primul Vertex", continueLine: "Apasă aici pentru a continua desenul", finishLine: "Apasă pe orice obiect pentru a finisa desenul", finishPoly: "Apasă pe primul obiect pentru a finisa", finishRect: "Apasă pentru a finisa", startCircle: "Apasă pentru a desena un cerc", finishCircle: "Apasă pentru a finisa un cerc", placeCircleMarker: "Adaugă un punct" }, actions: { finish: "Termină", cancel: "Anulează", removeLastVertex: "Șterge ultimul Vertex" }, buttonTitles: { drawMarkerButton: "Adaugă o bulină", drawPolyButton: "Desenează un poligon", drawLineButton: "Desenează o linie", drawCircleButton: "Desenează un cerc", drawRectButton: "Desenează un dreptunghi", editButton: "Editează straturile", dragButton: "Mută straturile", cutButton: "Taie straturile", deleteButton: "Șterge straturile", drawCircleMarkerButton: "Desenează marcatorul cercului", snappingButton: "Fixați marcatorul glisat pe alte straturi și vârfuri", pinningButton: "Fixați vârfurile partajate împreună", rotateButton: "Rotiți stratul" } }, zr = { tooltips: { placeMarker: "Нажмите, чтобы нанести маркер", placeMarkerTouch: "Коснитесь карты, чтобы разместить маркер", firstVertex: "Нажмите, чтобы нанести первый объект", continueLine: "Нажмите, чтобы продолжить рисование", finishLine: "Нажмите любой существующий маркер для завершения", finishPoly: "Выберите первую точку, чтобы закончить", finishRect: "Нажмите, чтобы закончить", startCircle: "Нажмите, чтобы добавить центр круга", finishCircle: "Нажмите, чтобы задать радиус", placeCircleMarker: "Нажмите, чтобы нанести круговой маркер" }, actions: { finish: "Завершить", cancel: "Отменить", removeLastVertex: "Отменить последнее действие" }, buttonTitles: { drawMarkerButton: "Добавить маркер", drawPolyButton: "Рисовать полигон", drawLineButton: "Рисовать кривую", drawCircleButton: "Рисовать круг", drawRectButton: "Рисовать прямоугольник", editButton: "Редактировать слой", dragButton: "Перенести слой", cutButton: "Вырезать слой", deleteButton: "Удалить слой", drawCircleMarkerButton: "Добавить круговой маркер", snappingButton: "Привязать перетаскиваемый маркер к другим слоям и вершинам", pinningButton: "Связать общие точки вместе", rotateButton: "Поворот слоя" } }, nr = { tooltips: { placeMarker: "Presiona para colocar un marcador", placeMarkerTouch: "Toca el mapa para colocar un marcador", firstVertex: "Presiona para colocar el primer vértice", continueLine: "Presiona para continuar dibujando", finishLine: "Presiona cualquier marcador existente para finalizar", finishPoly: "Presiona el primer marcador para finalizar", finishRect: "Presiona para finalizar", startCircle: "Presiona para colocar el centro del círculo", finishCircle: "Presiona para finalizar el círculo", placeCircleMarker: "Presiona para colocar un marcador de círculo" }, actions: { finish: "Finalizar", cancel: "Cancelar", removeLastVertex: "Eliminar último vértice" }, buttonTitles: { drawMarkerButton: "Dibujar Marcador", drawPolyButton: "Dibujar Polígono", drawLineButton: "Dibujar Línea", drawCircleButton: "Dibujar Círculo", drawRectButton: "Dibujar Rectángulo", editButton: "Editar Capas", dragButton: "Arrastrar Capas", cutButton: "Cortar Capas", deleteButton: "Eliminar Capas", drawCircleMarkerButton: "Dibujar Marcador de Círculo", snappingButton: "El marcador de Snap arrastrado a otras capas y vértices", pinningButton: "Fijar juntos los vértices compartidos", rotateButton: "Rotar capa" } }, ri = { tooltips: { placeMarker: "Klik om een marker te plaatsen", placeMarkerTouch: "Tik op de kaart om een marker te plaatsen", firstVertex: "Klik om het eerste punt te plaatsen", continueLine: "Klik om te blijven tekenen", finishLine: "Klik op een bestaand punt om te beëindigen", finishPoly: "Klik op het eerst punt om te beëindigen", finishRect: "Klik om te beëindigen", startCircle: "Klik om het middelpunt te plaatsen", finishCircle: "Klik om de cirkel te beëindigen", placeCircleMarker: "Klik om een marker te plaatsen" }, actions: { finish: "Bewaar", cancel: "Annuleer", removeLastVertex: "Verwijder laatste punt" }, buttonTitles: { drawMarkerButton: "Plaats Marker", drawPolyButton: "Teken een vlak", drawLineButton: "Teken een lijn", drawCircleButton: "Teken een cirkel", drawRectButton: "Teken een vierkant", editButton: "Bewerk", dragButton: "Verplaats", cutButton: "Knip", deleteButton: "Verwijder", drawCircleMarkerButton: "Plaats Marker", snappingButton: "Snap gesleepte marker naar andere lagen en hoekpunten", pinningButton: "Speld gedeelde hoekpunten samen", rotateButton: "Laag roteren" } }, po = { tooltips: { placeMarker: "Cliquez pour placer un marqueur", placeMarkerTouch: "Appuyez sur la carte pour placer un marqueur", firstVertex: "Cliquez pour placer le premier sommet", continueLine: "Cliquez pour continuer à dessiner", finishLine: "Cliquez sur n'importe quel marqueur pour terminer", finishPoly: "Cliquez sur le premier marqueur pour terminer", finishRect: "Cliquez pour terminer", startCircle: "Cliquez pour placer le centre du cercle", finishCircle: "Cliquez pour finir le cercle", placeCircleMarker: "Cliquez pour placer le marqueur circulaire" }, actions: { finish: "Terminer", cancel: "Annuler", removeLastVertex: "Retirer le dernier sommet" }, buttonTitles: { drawMarkerButton: "Placer des marqueurs", drawPolyButton: "Dessiner des polygones", drawLineButton: "Dessiner des polylignes", drawCircleButton: "Dessiner un cercle", drawRectButton: "Dessiner un rectangle", editButton: "Éditer des calques", dragButton: "Déplacer des calques", cutButton: "Couper des calques", deleteButton: "Supprimer des calques", drawCircleMarkerButton: "Dessiner un marqueur circulaire", snappingButton: "Glisser le marqueur vers d'autres couches et sommets", pinningButton: "Épingler ensemble les sommets partagés", rotateButton: "Tourner des calques" } }, rr = { tooltips: { placeMarker: "单击放置标记", placeMarkerTouch: "点击地图放置标记", firstVertex: "单击放置首个顶点", continueLine: "单击继续绘制", finishLine: "单击任何存在的标记以完成", finishPoly: "单击第一个标记以完成", finishRect: "单击完成", startCircle: "单击放置圆心", finishCircle: "单击完成圆形", placeCircleMarker: "点击放置圆形标记" }, actions: { finish: "完成", cancel: "取消", removeLastVertex: "移除最后的顶点" }, buttonTitles: { drawMarkerButton: "绘制标记", drawPolyButton: "绘制多边形", drawLineButton: "绘制线段", drawCircleButton: "绘制圆形", drawRectButton: "绘制长方形", editButton: "编辑图层", dragButton: "拖拽图层", cutButton: "剪切图层", deleteButton: "删除图层", drawCircleMarkerButton: "画圆圈标记", snappingButton: "将拖动的标记捕捉到其他图层和顶点", pinningButton: "将共享顶点固定在一起", rotateButton: "旋转图层" } }, tn = { tooltips: { placeMarker: "單擊放置標記", placeMarkerTouch: "點擊地圖放置標記", firstVertex: "單擊放置第一個頂點", continueLine: "單擊繼續繪製", finishLine: "單擊任何存在的標記以完成", finishPoly: "單擊第一個標記以完成", finishRect: "單擊完成", startCircle: "單擊放置圓心", finishCircle: "單擊完成圓形", placeCircleMarker: "點擊放置圓形標記" }, actions: { finish: "完成", cancel: "取消", removeLastVertex: "移除最後一個頂點" }, buttonTitles: { drawMarkerButton: "放置標記", drawPolyButton: "繪製多邊形", drawLineButton: "繪製線段", drawCircleButton: "繪製圓形", drawRectButton: "繪製方形", editButton: "編輯圖形", dragButton: "移動圖形", cutButton: "裁切圖形", deleteButton: "刪除圖形", drawCircleMarkerButton: "畫圓圈標記", snappingButton: "將拖動的標記對齊到其他圖層和頂點", pinningButton: "將共享頂點固定在一起", rotateButton: "旋轉圖形" } }, Ae = { tooltips: { placeMarker: "Clique para posicionar o marcador", placeMarkerTouch: "Toque no mapa para posicionar um marcador", firstVertex: "Clique para posicionar o primeiro vértice", continueLine: "Clique para continuar desenhando", finishLine: "Clique em qualquer marcador existente para finalizar", finishPoly: "Clique no primeiro marcador para finalizar", finishRect: "Clique para finalizar", startCircle: "Clique para posicionar o centro do círculo", finishCircle: "Clique para finalizar o círculo", placeCircleMarker: "Clique para posicionar o marcador circular", placeText: "Clique para inserir texto" }, actions: { finish: "Finalizar", cancel: "Cancelar", removeLastVertex: "Remover último vértice" }, buttonTitles: { drawMarkerButton: "Desenhar Marcador", drawPolyButton: "Desenhar Polígonos", drawLineButton: "Desenhar Linha Poligonal", drawCircleButton: "Desenhar Círculo", drawRectButton: "Desenhar Retângulo", editButton: "Editar Camadas", dragButton: "Arrastar Camadas", cutButton: "Recortar Camadas", deleteButton: "Remover Camadas", drawCircleMarkerButton: "Desenhar Marcador de Círculo", snappingButton: "Ajustar marcador arrastado a outras camadas e vértices", pinningButton: "Unir vértices compartilhados", rotateButton: "Rotacionar Camadas", drawTextButton: "Desenhar Texto", scaleButton: "Redimensionar Camadas", autoTracingButton: "Traçado Automático de Linha" }, measurements: { totalLength: "Comprimento", segmentLength: "Comprimento do Segmento", area: "Área", radius: "Raio", perimeter: "Perímetro", height: "Altura", width: "Largura", coordinates: "Posição", coordinatesMarker: "Marcador de Posição" } }, $i = { tooltips: { placeMarker: "Clique para colocar marcador", placeMarkerTouch: "Toque no mapa para colocar um marcador", firstVertex: "Clique para colocar primeiro vértice", continueLine: "Clique para continuar a desenhar", finishLine: "Clique num marcador existente para terminar", finishPoly: "Clique no primeiro marcador para terminar", finishRect: "Clique para terminar", startCircle: "Clique para colocar o centro do círculo", finishCircle: "Clique para terminar o círculo", placeCircleMarker: "Clique para colocar marcador de círculo", placeText: "Clique para colocar texto" }, actions: { finish: "Terminar", cancel: "Cancelar", removeLastVertex: "Remover Último Vértice" }, buttonTitles: { drawMarkerButton: "Desenhar Marcador", drawPolyButton: "Desenhar Polígonos", drawLineButton: "Desenhar Polilinha", drawCircleButton: "Desenhar Círculo", drawRectButton: "Desenhar Retângulo", editButton: "Editar Camadas", dragButton: "Arrastar Camadas", cutButton: "Cortar Camadas", deleteButton: "Remover Camadas", drawCircleMarkerButton: "Desenhar Marcador de Círculo", snappingButton: "Ajustar marcador arrastado a outras camadas e vértices", pinningButton: "Unir vértices partilhados", rotateButton: "Rodar Camadas", drawTextButton: "Desenhar Texto", scaleButton: "Escalar Camadas", autoTracingButton: "Traçado Automático de Linha" }, measurements: { totalLength: "Comprimento", segmentLength: "Comprimento do Segmento", area: "Área", radius: "Raio", perimeter: "Perímetro", height: "Altura", width: "Largura", coordinates: "Posição", coordinatesMarker: "Marcador de Posição" } }, Fn = { tooltips: { placeMarker: "Kliknij, aby umieścić znacznik", placeMarkerTouch: "Dotknij mapę, aby umieścić znacznik", firstVertex: "Kliknij, aby umieścić pierwszy wierzchołek", continueLine: "Kliknij, aby kontynuować rysowanie", finishLine: "Kliknij dowolny istniejący znacznik, aby zakończyć", finishPoly: "Kliknij pierwszy znacznik, aby zakończyć", finishRect: "Kliknij, aby zakończyć", startCircle: "Kliknij, aby umieścić środek okręgu", finishCircle: "Kliknij, aby zakończyć okrąg", placeCircleMarker: "Kliknij, aby umieścić znacznik okręgu", placeText: "Kliknij, aby umieścić tekst" }, actions: { finish: "Zakończ", cancel: "Anuluj", removeLastVertex: "Usuń ostatni wierzchołek" }, buttonTitles: { drawMarkerButton: "Rysuj znacznik", drawPolyButton: "Rysuj wielokąt", drawLineButton: "Rysuj linię", drawCircleButton: "Rysuj okrąg", drawRectButton: "Rysuj prostokąt", editButton: "Edytuj warstwy", dragButton: "Przeciągnij warstwy", cutButton: "Wytnij warstwy", deleteButton: "Usuń warstwy", drawCircleMarkerButton: "Rysuj znacznik okrągły", snappingButton: "Przyciągnij przenoszony znacznik do innych warstw i wierzchołków", pinningButton: "Przypnij wspólne wierzchołki razem", rotateButton: "Obróć warstwy", drawTextButton: "Rysuj tekst", scaleButton: "Skaluj warstwy", autoTracingButton: "Automatyczne śledzenie linii" }, measurements: { totalLength: "Długość", segmentLength: "Długość odcinka", area: "Obszar", radius: "Promień", perimeter: "Obwód", height: "Wysokość", width: "Szerokość", coordinates: "Pozycja", coordinatesMarker: "Znacznik pozycji" } }, Rn = { tooltips: { placeMarker: "Klicka för att placera markör", placeMarkerTouch: "Tryck på kartan för att placera en markör", firstVertex: "Klicka för att placera första hörnet", continueLine: "Klicka för att fortsätta rita", finishLine: "Klicka på en existerande punkt för att slutföra", finishPoly: "Klicka på den första punkten för att slutföra", finishRect: "Klicka för att slutföra", startCircle: "Klicka för att placera cirkelns centrum", finishCircle: "Klicka för att slutföra cirkeln", placeCircleMarker: "Klicka för att placera cirkelmarkör" }, actions: { finish: "Slutför", cancel: "Avbryt", removeLastVertex: "Ta bort sista hörnet" }, buttonTitles: { drawMarkerButton: "Rita Markör", drawPolyButton: "Rita Polygoner", drawLineButton: "Rita Linje", drawCircleButton: "Rita Cirkel", drawRectButton: "Rita Rektangel", editButton: "Redigera Lager", dragButton: "Dra Lager", cutButton: "Klipp i Lager", deleteButton: "Ta bort Lager", drawCircleMarkerButton: "Rita Cirkelmarkör", snappingButton: "Snäpp dra markören till andra lager och hörn", pinningButton: "Fäst delade hörn tillsammans", rotateButton: "Rotera lagret" } }, Nr = { tooltips: { placeMarker: "Κάντε κλικ για να τοποθετήσετε Δείκτη", placeMarkerTouch: "Πατήστε στο χάρτη για να τοποθετήσετε δείκτη", firstVertex: "Κάντε κλικ για να τοποθετήσετε το πρώτο σημείο", continueLine: "Κάντε κλικ για να συνεχίσετε να σχεδιάζετε", finishLine: "Κάντε κλικ σε οποιονδήποτε υπάρχον σημείο για να ολοκληρωθεί", finishPoly: "Κάντε κλικ στο πρώτο σημείο για να τελειώσετε", finishRect: "Κάντε κλικ για να τελειώσετε", startCircle: "Κάντε κλικ για να τοποθετήσετε κέντρο Κύκλου", finishCircle: "Κάντε κλικ για να ολοκληρώσετε τον Κύκλο", placeCircleMarker: "Κάντε κλικ για να τοποθετήσετε Κυκλικό Δείκτη" }, actions: { finish: "Τέλος", cancel: "Ακύρωση", removeLastVertex: "Κατάργηση τελευταίου σημείου" }, buttonTitles: { drawMarkerButton: "Σχεδίαση Δείκτη", drawPolyButton: "Σχεδίαση Πολυγώνου", drawLineButton: "Σχεδίαση Γραμμής", drawCircleButton: "Σχεδίαση Κύκλου", drawRectButton: "Σχεδίαση Ορθογωνίου", editButton: "Επεξεργασία Επιπέδων", dragButton: "Μεταφορά Επιπέδων", cutButton: "Αποκοπή Επιπέδων", deleteButton: "Κατάργηση Επιπέδων", drawCircleMarkerButton: "Σχεδίαση Κυκλικού Δείκτη", snappingButton: "Προσκόλληση του Δείκτη μεταφοράς σε άλλα Επίπεδα και Κορυφές", pinningButton: "Περικοπή κοινών κορυφών μαζί", rotateButton: "Περιστρέψτε το στρώμα" } }, zn = { tooltips: { placeMarker: "Kattintson a jelölő elhelyezéséhez", placeMarkerTouch: "Érintse meg a térképet a jelölő elhelyezéséhez", firstVertex: "Kattintson az első pont elhelyezéséhez", continueLine: "Kattintson a következő pont elhelyezéséhez", finishLine: "A befejezéshez kattintson egy meglévő pontra", finishPoly: "A befejezéshez kattintson az első pontra", finishRect: "Kattintson a befejezéshez", startCircle: "Kattintson a kör középpontjának elhelyezéséhez", finishCircle: "Kattintson a kör befejezéséhez", placeCircleMarker: "Kattintson a körjelölő elhelyezéséhez" }, actions: { finish: "Befejezés", cancel: "Mégse", removeLastVertex: "Utolsó pont eltávolítása" }, buttonTitles: { drawMarkerButton: "Jelölő rajzolása", drawPolyButton: "Poligon rajzolása", drawLineButton: "Vonal rajzolása", drawCircleButton: "Kör rajzolása", drawRectButton: "Négyzet rajzolása", editButton: "Elemek szerkesztése", dragButton: "Elemek mozgatása", cutButton: "Elemek vágása", deleteButton: "Elemek törlése", drawCircleMarkerButton: "Kör jelölő rajzolása", snappingButton: "Kapcsolja a jelöltőt másik elemhez vagy ponthoz", pinningButton: "Közös pontok összekötése", rotateButton: "Fólia elforgatása" } }, jr = { tooltips: { placeMarker: "Tryk for at placere en markør", placeMarkerTouch: "Tryk på kortet for at placere en markør", firstVertex: "Tryk for at placere det første punkt", continueLine: "Tryk for at fortsætte linjen", finishLine: "Tryk på et eksisterende punkt for at afslutte", finishPoly: "Tryk på det første punkt for at afslutte", finishRect: "Tryk for at afslutte", startCircle: "Tryk for at placere cirklens center", finishCircle: "Tryk for at afslutte cirklen", placeCircleMarker: "Tryk for at placere en cirkelmarkør" }, actions: { finish: "Afslut", cancel: "Afbryd", removeLastVertex: "Fjern sidste punkt" }, buttonTitles: { drawMarkerButton: "Placer markør", drawPolyButton: "Tegn polygon", drawLineButton: "Tegn linje", drawCircleButton: "Tegn cirkel", drawRectButton: "Tegn firkant", editButton: "Rediger", dragButton: "Træk", cutButton: "Klip", deleteButton: "Fjern", drawCircleMarkerButton: "Tegn cirkelmarkør", snappingButton: "Fastgør trukket markør til andre elementer", pinningButton: "Sammenlæg delte elementer", rotateButton: "Roter laget" } }, Vr = { tooltips: { placeMarker: "Klikk for å plassere punkt", placeMarkerTouch: "Trykk på kartet for å plassere et punkt", firstVertex: "Klikk for å plassere første punkt", continueLine: "Klikk for å tegne videre", finishLine: "Klikk på et eksisterende punkt for å fullføre", finishPoly: "Klikk første punkt for å fullføre", finishRect: "Klikk for å fullføre", startCircle: "Klikk for å sette sirkel midtpunkt", finishCircle: "Klikk for å fullføre sirkel", placeCircleMarker: "Klikk for å plassere sirkel", placeText: "Klikk for å plassere tekst" }, actions: { finish: "Fullfør", cancel: "Kanseller", removeLastVertex: "Fjern forrige punkt" }, buttonTitles: { drawMarkerButton: "Tegn punkt", drawPolyButton: "Tegn flate", drawLineButton: "Tegn linje", drawCircleButton: "Tegn sirkel", drawRectButton: "Tegn rektangel", editButton: "Rediger objekter", dragButton: "Dra objekter", cutButton: "Kutt objekter", deleteButton: "Fjern objekter", drawCircleMarkerButton: "Tegn sirkel-punkt", snappingButton: "Fest dratt punkt til andre objekter og punkt", pinningButton: "Pin delte punkter sammen", rotateButton: "Rotér objekter", drawTextButton: "Tegn tekst", scaleButton: "Skalér objekter", autoTracingButton: "Automatisk sporing av linje" }, measurements: { totalLength: "Lengde", segmentLength: "Segmentlengde", area: "Område", radius: "Radius", perimeter: "Omriss", height: "Høyde", width: "Bredde", coordinates: "Posisjon", coordinatesMarker: "Posisjonsmarkør" } }, ar = { tooltips: { placeMarker: "کلیک برای جانمایی نشان", placeMarkerTouch: "روی نقشه ضربه بزنید تا نشان بگذارید", firstVertex: "کلیک برای رسم اولین رأس", continueLine: "کلیک برای ادامه رسم", finishLine: "کلیک روی هر نشان موجود برای پایان", finishPoly: "کلیک روی اولین نشان برای پایان", finishRect: "کلیک برای پایان", startCircle: "کلیک برای رسم مرکز دایره", finishCircle: "کلیک برای پایان رسم دایره", placeCircleMarker: "کلیک برای رسم نشان دایره", placeText: "کلیک برای نوشتن متن" }, actions: { finish: "پایان", cancel: "لفو", removeLastVertex: "حذف آخرین رأس" }, buttonTitles: { drawMarkerButton: "درج نشان", drawPolyButton: "رسم چندضلعی", drawLineButton: "رسم خط", drawCircleButton: "رسم دایره", drawRectButton: "رسم چهارضلعی", editButton: "ویرایش لایه‌ها", dragButton: "جابجایی لایه‌ها", cutButton: "برش لایه‌ها", deleteButton: "حذف لایه‌ها", drawCircleMarkerButton: "رسم نشان دایره", snappingButton: "نشانگر را به لایه‌ها و رئوس دیگر بکشید", pinningButton: "رئوس مشترک را با هم پین کنید", rotateButton: "چرخش لایه", drawTextButton: "رسم متن", scaleButton: "مقیاس‌گذاری", autoTracingButton: "ردیاب خودکار" }, measurements: { totalLength: "طول", segmentLength: "طول بخش", area: "ناحیه", radius: "شعاع", perimeter: "محیط", height: "ارتفاع", width: "عرض", coordinates: "موقعیت", coordinatesMarker: "موقعیت نشان" } }, $r = { tooltips: { placeMarker: "Натисніть, щоб нанести маркер", placeMarkerTouch: "Торкніться карти, щоб розмістити маркер", firstVertex: "Натисніть, щоб нанести першу вершину", continueLine: "Натисніть, щоб продовжити малювати", finishLine: "Натисніть будь-який існуючий маркер для завершення", finishPoly: "Виберіть перший маркер, щоб завершити", finishRect: "Натисніть, щоб завершити", startCircle: "Натисніть, щоб додати центр кола", finishCircle: "Натисніть, щоб завершити коло", placeCircleMarker: "Натисніть, щоб нанести круговий маркер" }, actions: { finish: "Завершити", cancel: "Відмінити", removeLastVertex: "Видалити попередню вершину" }, buttonTitles: { drawMarkerButton: "Малювати маркер", drawPolyButton: "Малювати полігон", drawLineButton: "Малювати криву", drawCircleButton: "Малювати коло", drawRectButton: "Малювати прямокутник", editButton: "Редагувати шари", dragButton: "Перенести шари", cutButton: "Вирізати шари", deleteButton: "Видалити шари", drawCircleMarkerButton: "Малювати круговий маркер", snappingButton: "Прив’язати перетягнутий маркер до інших шарів та вершин", pinningButton: "Зв'язати спільні вершини разом", rotateButton: "Повернути шар" } }, Ur = { tooltips: { placeMarker: "İşaretçi yerleştirmek için tıklayın", placeMarkerTouch: "İşaretçi yerleştirmek için haritaya dokunun", firstVertex: "İlk tepe noktasını yerleştirmek için tıklayın", continueLine: "Çizime devam etmek için tıklayın", finishLine: "Bitirmek için mevcut herhangi bir işaretçiyi tıklayın", finishPoly: "Bitirmek için ilk işaretçiyi tıklayın", finishRect: "Bitirmek için tıklayın", startCircle: "Daire merkezine yerleştirmek için tıklayın", finishCircle: "Daireyi bitirmek için tıklayın", placeCircleMarker: "Daire işaretçisi yerleştirmek için tıklayın" }, actions: { finish: "Bitir", cancel: "İptal", removeLastVertex: "Son köşeyi kaldır" }, buttonTitles: { drawMarkerButton: "Çizim İşaretçisi", drawPolyButton: "Çokgenler çiz", drawLineButton: "Çoklu çizgi çiz", drawCircleButton: "Çember çiz", drawRectButton: "Dikdörtgen çiz", editButton: "Katmanları düzenle", dragButton: "Katmanları sürükle", cutButton: "Katmanları kes", deleteButton: "Katmanları kaldır", drawCircleMarkerButton: "Daire işaretçisi çiz", snappingButton: "Sürüklenen işaretçiyi diğer katmanlara ve köşelere yapıştır", pinningButton: "Paylaşılan köşeleri birbirine sabitle", rotateButton: "Katmanı döndür" } }, sr = { tooltips: { placeMarker: "Kliknutím vytvoříte značku", placeMarkerTouch: "Klepnutím na mapu umístíte značku", firstVertex: "Kliknutím vytvoříte první objekt", continueLine: "Kliknutím pokračujte v kreslení", finishLine: "Kliknutí na libovolnou existující značku pro dokončení", finishPoly: "Vyberte první bod pro dokončení", finishRect: "Klikněte pro dokončení", startCircle: "Kliknutím přidejte střed kruhu", finishCircle: "Нажмите, чтобы задать радиус", placeCircleMarker: "Kliknutím nastavte poloměr" }, actions: { finish: "Dokončit", cancel: "Zrušit", removeLastVertex: "Zrušit poslední akci" }, buttonTitles: { drawMarkerButton: "Přidat značku", drawPolyButton: "Nakreslit polygon", drawLineButton: "Nakreslit křivku", drawCircleButton: "Nakreslit kruh", drawRectButton: "Nakreslit obdélník", editButton: "Upravit vrstvu", dragButton: "Přeneste vrstvu", cutButton: "Vyjmout vrstvu", deleteButton: "Smazat vrstvu", drawCircleMarkerButton: "Přidat kruhovou značku", snappingButton: "Navázat tažnou značku k dalším vrstvám a vrcholům", pinningButton: "Spojit společné body dohromady", rotateButton: "Otočte vrstvu" } }, Ha = { tooltips: { placeMarker: "クリックしてマーカーを配置", placeMarkerTouch: "地図をタップしてマーカーを配置", firstVertex: "クリックして最初の頂点を配置", continueLine: "クリックして描画を続ける", finishLine: "任意のマーカーをクリックして終了", finishPoly: "最初のマーカーをクリックして終了", finishRect: "クリックして終了", startCircle: "クリックして円の中心を配置", finishCircle: "クリックして円の描画を終了", placeCircleMarker: "クリックして円マーカーを配置", placeText: "クリックしてテキストを配置" }, actions: { finish: "終了", cancel: "キャンセル", removeLastVertex: "最後の頂点を削除" }, buttonTitles: { drawMarkerButton: "マーカーを描画", drawPolyButton: "ポリゴンを描画", drawLineButton: "折れ線を描画", drawCircleButton: "円を描画", drawRectButton: "矩形を描画", editButton: "レイヤーを編集", dragButton: "レイヤーをドラッグ", cutButton: "レイヤーを切り取り", deleteButton: "レイヤーを削除", drawCircleMarkerButton: "円マーカーを描画", snappingButton: "ドラッグしたマーカーを他のレイヤーや頂点にスナップする", pinningButton: "共有する頂点を同時に動かす", rotateButton: "レイヤーを回転", drawTextButton: "テキストを描画" } }, Gr = { tooltips: { placeMarker: "Klikkaa asettaaksesi merkin", placeMarkerTouch: "Napauta karttaa asettaaksesi merkin", firstVertex: "Klikkaa asettaakseni ensimmäisen osuuden", continueLine: "Klikkaa jatkaaksesi piirtämistä", finishLine: "Klikkaa olemassa olevaa merkkiä lopettaaksesi", finishPoly: "Klikkaa ensimmäistä merkkiä lopettaaksesi", finishRect: "Klikkaa lopettaaksesi", startCircle: "Klikkaa asettaaksesi ympyrän keskipisteen", finishCircle: "Klikkaa lopettaaksesi ympyrän", placeCircleMarker: "Klikkaa asettaaksesi ympyrämerkin", placeText: "Klikkaa asettaaksesi tekstin" }, actions: { finish: "Valmis", cancel: "Peruuta", removeLastVertex: "Poista viimeinen osuus" }, buttonTitles: { drawMarkerButton: "Piirrä merkkejä", drawPolyButton: "Piirrä monikulmioita", drawLineButton: "Piirrä viivoja", drawCircleButton: "Piirrä ympyrä", drawRectButton: "Piirrä neliskulmioita", editButton: "Muokkaa", dragButton: "Siirrä", cutButton: "Leikkaa", deleteButton: "Poista", drawCircleMarkerButton: "Piirrä ympyrämerkki", snappingButton: "Kiinnitä siirrettävä merkki toisiin muotoihin", pinningButton: "Kiinnitä jaetut muodot yhteen", rotateButton: "Käännä", drawTextButton: "Piirrä tekstiä" } }, mo = { tooltips: { placeMarker: "마커 위치를 클릭하세요", placeMarkerTouch: "지도를 탭하여 마커를 배치하세요", firstVertex: "첫번째 꼭지점 위치을 클릭하세요", continueLine: "계속 그리려면 클릭하세요", finishLine: "끝내려면 기존 마커를 클릭하세요", finishPoly: "끝내려면 처음 마커를 클릭하세요", finishRect: "끝내려면 클릭하세요", startCircle: "원의 중심이 될 위치를 클릭하세요", finishCircle: "원을 끝내려면 클릭하세요", placeCircleMarker: "원 마커 위치를 클릭하세요", placeText: "텍스트 위치를 클릭하세요" }, actions: { finish: "끝내기", cancel: "취소", removeLastVertex: "마지막 꼭지점 제거" }, buttonTitles: { drawMarkerButton: "마커 그리기", drawPolyButton: "다각형 그리기", drawLineButton: "다각선 그리기", drawCircleButton: "원 그리기", drawRectButton: "직사각형 그리기", editButton: "레이어 편집하기", dragButton: "레이어 끌기", cutButton: "레이어 자르기", deleteButton: "레이어 제거하기", drawCircleMarkerButton: "원 마커 그리기", snappingButton: "잡아끈 마커를 다른 레이어 및 꼭지점에 들러붙게 하기", pinningButton: "공유 꼭지점을 함께 찍기", rotateButton: "레이어 회전하기", drawTextButton: "텍스트 그리기" } }, Qt = { tooltips: { placeMarker: "Маркерди жайгаштыруу үчүн басыңыз", placeMarkerTouch: "Маркерди жайгаштыруу үчүн картага тийиңиз", firstVertex: "Биринчи чокуну жайгаштырууну үчүн басыңыз", continueLine: "Сүрөт тартууну улантуу үчүн басыңыз", finishLine: "Аяктоо үчүн учурдагы маркерди басыңыз", finishPoly: "Бүтүрүү үчүн биринчи маркерди басыңыз", finishRect: "Бүтүрүү үчүн басыңыз", startCircle: "Айлананын борборун жайгаштырууну үчүн басыңыз", finishCircle: "Айлананы бүтүрүү үчүн басыңыз", placeCircleMarker: "Тегерек маркерди жайгаштыруу үчүн басыңыз", placeText: "Текстти жайгаштыруу үчүн басыңыз" }, actions: { finish: "Аягы", cancel: "Жок кылуу", removeLastVertex: "Акыркы чокуну өчүрүү" }, buttonTitles: { drawMarkerButton: "Маркерди чизуу", drawPolyButton: "Полигон чизуу", drawLineButton: "Полилиния чизуу", drawCircleButton: "Дайынды чизуу", drawRectButton: "Прямоугольник чизуу", editButton: "Слоопту түзөтүү", dragButton: "Слоопту карап сүйлөү", cutButton: "Слооптун башын кесүү", deleteButton: "Слооптун өчүрүү", drawCircleMarkerButton: "Дайынды маркерди чизуу", snappingButton: "Башка слооптордун жана вертекстердин арасына чекилдөө", pinningButton: "Бөлүшкөн вертекстерди бирге тутуштуруу", rotateButton: "Слооптун өзгөртүү", drawTextButton: "Текст чизуу", scaleButton: "Слооптун өлчөмүн өзгөртүү", autoTracingButton: "Автоматтык тизмеги чизуу" }, measurements: { totalLength: "Узундук", segmentLength: "Сегмент узундугу", area: "Аймак", radius: "Радиус", perimeter: "Периметр", height: "Диаметр", width: "Кенчилик", coordinates: "Координаттар", coordinatesMarker: "Маркердин координаттары" } }, _i = $i, pe = { en: _n, de: yn, it: Rr, id: re, ro: Me, ru: zr, es: nr, nl: ri, fr: po, pt: _i, pt_br: Ae, pt_pt: $i, zh: rr, zh_tw: tn, pl: Fn, sv: Rn, el: Nr, hu: zn, da: jr, no: Vr, fa: ar, ua: $r, tr: Ur, cz: sr, ja: Ha, fi: Gr, ko: mo, ky: Qt }, Ka = { _globalEditModeEnabled: !1, enableGlobalEditMode(e) {
    let i = { ...e };
    this._globalEditModeEnabled = !0, this.Toolbar.toggleButton("editMode", this.globalEditModeEnabled()), L.PM.Utils.findLayers(this.map).forEach((r) => {
      this._isRelevantForEdit(r) && r.pm.enable(i);
    }), this.throttledReInitEdit || (this.throttledReInitEdit = L.Util.throttle(this.handleLayerAdditionInGlobalEditMode, 100, this)), this._addedLayersEdit = {}, this.map.on("layeradd", this._layerAddedEdit, this), this.map.on("layeradd", this.throttledReInitEdit, this), this._fireGlobalEditModeToggled(!0);
  }, disableGlobalEditMode() {
    this._globalEditModeEnabled = !1, L.PM.Utils.findLayers(this.map).forEach((e) => {
      e.pm.disable();
    }), this.map.off("layeradd", this._layerAddedEdit, this), this.map.off("layeradd", this.throttledReInitEdit, this), this.Toolbar.toggleButton("editMode", this.globalEditModeEnabled()), this._fireGlobalEditModeToggled(!1);
  }, globalEditEnabled() {
    return this.globalEditModeEnabled();
  }, globalEditModeEnabled() {
    return this._globalEditModeEnabled;
  }, toggleGlobalEditMode(e = this.globalOptions) {
    this.globalEditModeEnabled() ? this.disableGlobalEditMode() : this.enableGlobalEditMode(e);
  }, handleLayerAdditionInGlobalEditMode() {
    let e = this._addedLayersEdit;
    if (this._addedLayersEdit = {}, this.globalEditModeEnabled()) for (let i in e) {
      let r = e[i];
      this._isRelevantForEdit(r) && r.pm.enable({ ...this.globalOptions });
    }
  }, _layerAddedEdit({ layer: e }) {
    this._addedLayersEdit[L.stamp(e)] = e;
  }, _isRelevantForEdit(e) {
    return e.pm && !(e instanceof L.LayerGroup) && (!L.PM.optIn && !e.options.pmIgnore || L.PM.optIn && e.options.pmIgnore === !1) && !e._pmTempLayer && e.pm.options.allowEditing;
  } }, Zr = Ka, qr = { _globalDragModeEnabled: !1, enableGlobalDragMode() {
    let e = L.PM.Utils.findLayers(this.map);
    this._globalDragModeEnabled = !0, this._addedLayersDrag = {}, e.forEach((i) => {
      this._isRelevantForDrag(i) && i.pm.enableLayerDrag();
    }), this.throttledReInitDrag || (this.throttledReInitDrag = L.Util.throttle(this.reinitGlobalDragMode, 100, this)), this.map.on("layeradd", this._layerAddedDrag, this), this.map.on("layeradd", this.throttledReInitDrag, this), this.Toolbar.toggleButton("dragMode", this.globalDragModeEnabled()), this._fireGlobalDragModeToggled(!0);
  }, disableGlobalDragMode() {
    let e = L.PM.Utils.findLayers(this.map);
    this._globalDragModeEnabled = !1, e.forEach((i) => {
      i.pm.disableLayerDrag();
    }), this.map.off("layeradd", this._layerAddedDrag, this), this.map.off("layeradd", this.throttledReInitDrag, this), this.Toolbar.toggleButton("dragMode", this.globalDragModeEnabled()), this._fireGlobalDragModeToggled(!1);
  }, globalDragModeEnabled() {
    return !!this._globalDragModeEnabled;
  }, toggleGlobalDragMode() {
    this.globalDragModeEnabled() ? this.disableGlobalDragMode() : this.enableGlobalDragMode();
  }, reinitGlobalDragMode() {
    let e = this._addedLayersDrag;
    if (this._addedLayersDrag = {}, this.globalDragModeEnabled()) for (let i in e) {
      let r = e[i];
      this._isRelevantForDrag(r) && r.pm.enableLayerDrag();
    }
  }, _layerAddedDrag({ layer: e }) {
    this._addedLayersDrag[L.stamp(e)] = e;
  }, _isRelevantForDrag(e) {
    return e.pm && !(e instanceof L.LayerGroup) && (!L.PM.optIn && !e.options.pmIgnore || L.PM.optIn && e.options.pmIgnore === !1) && !e._pmTempLayer && e.pm.options.draggable;
  } }, Hr = qr, en = { _globalRemovalModeEnabled: !1, enableGlobalRemovalMode() {
    this._globalRemovalModeEnabled = !0, this.map.eachLayer((e) => {
      this._isRelevantForRemoval(e) && (e.pm.enabled() && e.pm.disable(), e.on("click", this.removeLayer, this));
    }), this.throttledReInitRemoval || (this.throttledReInitRemoval = L.Util.throttle(this.handleLayerAdditionInGlobalRemovalMode, 100, this)), this._addedLayersRemoval = {}, this.map.on("layeradd", this._layerAddedRemoval, this), this.map.on("layeradd", this.throttledReInitRemoval, this), this.Toolbar.toggleButton("removalMode", this.globalRemovalModeEnabled()), this._fireGlobalRemovalModeToggled(!0);
  }, disableGlobalRemovalMode() {
    this._globalRemovalModeEnabled = !1, this.map.eachLayer((e) => {
      e.off("click", this.removeLayer, this);
    }), this.map.off("layeradd", this._layerAddedRemoval, this), this.map.off("layeradd", this.throttledReInitRemoval, this), this.Toolbar.toggleButton("removalMode", this.globalRemovalModeEnabled()), this._fireGlobalRemovalModeToggled(!1);
  }, globalRemovalEnabled() {
    return this.globalRemovalModeEnabled();
  }, globalRemovalModeEnabled() {
    return !!this._globalRemovalModeEnabled;
  }, toggleGlobalRemovalMode() {
    this.globalRemovalModeEnabled() ? this.disableGlobalRemovalMode() : this.enableGlobalRemovalMode();
  }, removeLayer(e) {
    let i = e.target;
    this._isRelevantForRemoval(i) && !i.pm.dragging() && (i.removeFrom(this.map.pm._getContainingLayer()), i.remove(), i instanceof L.LayerGroup ? (this._fireRemoveLayerGroup(i), this._fireRemoveLayerGroup(this.map, i)) : (i.pm._fireRemove(i), i.pm._fireRemove(this.map, i)));
  }, _isRelevantForRemoval(e) {
    return e.pm && !(e instanceof L.LayerGroup) && (!L.PM.optIn && !e.options.pmIgnore || L.PM.optIn && e.options.pmIgnore === !1) && !e._pmTempLayer && e.pm.options.allowRemoval;
  }, handleLayerAdditionInGlobalRemovalMode() {
    let e = this._addedLayersRemoval;
    if (this._addedLayersRemoval = {}, this.globalRemovalModeEnabled()) for (let i in e) {
      let r = e[i];
      this._isRelevantForRemoval(r) && (r.pm.enabled() && r.pm.disable(), r.on("click", this.removeLayer, this));
    }
  }, _layerAddedRemoval({ layer: e }) {
    this._addedLayersRemoval[L.stamp(e)] = e;
  } }, Kr = en, Nn = { _globalRotateModeEnabled: !1, enableGlobalRotateMode() {
    this._globalRotateModeEnabled = !0, L.PM.Utils.findLayers(this.map).filter((e) => e instanceof L.Polyline).forEach((e) => {
      this._isRelevantForRotate(e) && e.pm.enableRotate();
    }), this.throttledReInitRotate || (this.throttledReInitRotate = L.Util.throttle(this.handleLayerAdditionInGlobalRotateMode, 100, this)), this._addedLayersRotate = {}, this.map.on("layeradd", this._layerAddedRotate, this), this.map.on("layeradd", this.throttledReInitRotate, this), this.Toolbar.toggleButton("rotateMode", this.globalRotateModeEnabled()), this._fireGlobalRotateModeToggled();
  }, disableGlobalRotateMode() {
    this._globalRotateModeEnabled = !1, L.PM.Utils.findLayers(this.map).filter((e) => e instanceof L.Polyline).forEach((e) => {
      e.pm.disableRotate();
    }), this.map.off("layeradd", this._layerAddedRotate, this), this.map.off("layeradd", this.throttledReInitRotate, this), this.Toolbar.toggleButton("rotateMode", this.globalRotateModeEnabled()), this._fireGlobalRotateModeToggled();
  }, globalRotateModeEnabled() {
    return !!this._globalRotateModeEnabled;
  }, toggleGlobalRotateMode() {
    this.globalRotateModeEnabled() ? this.disableGlobalRotateMode() : this.enableGlobalRotateMode();
  }, _isRelevantForRotate(e) {
    return e.pm && e instanceof L.Polyline && !(e instanceof L.LayerGroup) && (!L.PM.optIn && !e.options.pmIgnore || L.PM.optIn && e.options.pmIgnore === !1) && !e._pmTempLayer && e.pm.options.allowRotation;
  }, handleLayerAdditionInGlobalRotateMode() {
    let e = this._addedLayersRotate;
    if (this._addedLayersRotate = {}, this.globalRotateModeEnabled()) for (let i in e) {
      let r = e[i];
      this._isRelevantForRemoval(r) && r.pm.enableRotate();
    }
  }, _layerAddedRotate({ layer: e }) {
    this._addedLayersRotate[L.stamp(e)] = e;
  } }, Ie = Nn, nn = x(er()), Wa = { _fireDrawStart(e = "Draw", i = {}) {
    this.__fire(this._map, "pm:drawstart", { shape: this._shape, workingLayer: this._layer }, e, i);
  }, _fireDrawEnd(e = "Draw", i = {}) {
    this.__fire(this._map, "pm:drawend", { shape: this._shape }, e, i);
  }, _fireCreate(e, i = "Draw", r = {}) {
    this.__fire(this._map, "pm:create", { shape: this._shape, marker: e, layer: e }, i, r);
  }, _fireCenterPlaced(e = "Draw", i = {}) {
    let r = e === "Draw" ? this._layer : void 0, a = e !== "Draw" ? this._layer : void 0;
    this.__fire(this._layer, "pm:centerplaced", { shape: this._shape, workingLayer: r, layer: a, latlng: this._layer.getLatLng() }, e, i);
  }, _fireCut(e, i, r, a = "Draw", o = {}) {
    this.__fire(e, "pm:cut", { shape: this._shape, layer: i, originalLayer: r }, a, o);
  }, _fireEdit(e = this._layer, i = "Edit", r = {}) {
    this.__fire(e, "pm:edit", { layer: this._layer, shape: this.getShape() }, i, r);
  }, _fireEnable(e = "Edit", i = {}) {
    this.__fire(this._layer, "pm:enable", { layer: this._layer, shape: this.getShape() }, e, i);
  }, _fireDisable(e = "Edit", i = {}) {
    this.__fire(this._layer, "pm:disable", { layer: this._layer, shape: this.getShape() }, e, i);
  }, _fireUpdate(e = "Edit", i = {}) {
    this.__fire(this._layer, "pm:update", { layer: this._layer, shape: this.getShape() }, e, i);
  }, _fireMarkerDragStart(e, i = void 0, r = "Edit", a = {}) {
    this.__fire(this._layer, "pm:markerdragstart", { layer: this._layer, markerEvent: e, shape: this.getShape(), indexPath: i }, r, a);
  }, _fireMarkerDrag(e, i = void 0, r = "Edit", a = {}) {
    this.__fire(this._layer, "pm:markerdrag", { layer: this._layer, markerEvent: e, shape: this.getShape(), indexPath: i }, r, a);
  }, _fireMarkerDragEnd(e, i = void 0, r = void 0, a = "Edit", o = {}) {
    this.__fire(this._layer, "pm:markerdragend", { layer: this._layer, markerEvent: e, shape: this.getShape(), indexPath: i, intersectionReset: r }, a, o);
  }, _fireDragStart(e = "Edit", i = {}) {
    this.__fire(this._layer, "pm:dragstart", { layer: this._layer, shape: this.getShape() }, e, i);
  }, _fireDrag(e, i = "Edit", r = {}) {
    this.__fire(this._layer, "pm:drag", { ...e, shape: this.getShape() }, i, r);
  }, _fireDragEnd(e = "Edit", i = {}) {
    this.__fire(this._layer, "pm:dragend", { layer: this._layer, shape: this.getShape() }, e, i);
  }, _fireDragEnable(e = "Edit", i = {}) {
    this.__fire(this._layer, "pm:dragenable", { layer: this._layer, shape: this.getShape() }, e, i);
  }, _fireDragDisable(e = "Edit", i = {}) {
    this.__fire(this._layer, "pm:dragdisable", { layer: this._layer, shape: this.getShape() }, e, i);
  }, _fireRemove(e, i = e, r = "Edit", a = {}) {
    this.__fire(e, "pm:remove", { layer: i, shape: this.getShape() }, r, a);
  }, _fireVertexAdded(e, i, r, a = "Edit", o = {}) {
    this.__fire(this._layer, "pm:vertexadded", { layer: this._layer, workingLayer: this._layer, marker: e, indexPath: i, latlng: r, shape: this.getShape() }, a, o);
  }, _fireVertexRemoved(e, i, r = "Edit", a = {}) {
    this.__fire(this._layer, "pm:vertexremoved", { layer: this._layer, marker: e, indexPath: i, shape: this.getShape() }, r, a);
  }, _fireVertexClick(e, i, r = "Edit", a = {}) {
    this.__fire(this._layer, "pm:vertexclick", { layer: this._layer, markerEvent: e, indexPath: i, shape: this.getShape() }, r, a);
  }, _fireIntersect(e, i = this._layer, r = "Edit", a = {}) {
    this.__fire(i, "pm:intersect", { layer: this._layer, intersection: e, shape: this.getShape() }, r, a);
  }, _fireLayerReset(e, i, r = "Edit", a = {}) {
    this.__fire(this._layer, "pm:layerreset", { layer: this._layer, markerEvent: e, indexPath: i, shape: this.getShape() }, r, a);
  }, _fireChange(e, i = "Edit", r = {}) {
    this.__fire(this._layer, "pm:change", { layer: this._layer, latlngs: e, shape: this.getShape() }, i, r);
  }, _fireTextChange(e, i = "Edit", r = {}) {
    this.__fire(this._layer, "pm:textchange", { layer: this._layer, text: e, shape: this.getShape() }, i, r);
  }, _fireTextFocus(e = "Edit", i = {}) {
    this.__fire(this._layer, "pm:textfocus", { layer: this._layer, shape: this.getShape() }, e, i);
  }, _fireTextBlur(e = "Edit", i = {}) {
    this.__fire(this._layer, "pm:textblur", { layer: this._layer, shape: this.getShape() }, e, i);
  }, _fireSnapDrag(e, i, r = "Snapping", a = {}) {
    this.__fire(e, "pm:snapdrag", i, r, a);
  }, _fireSnap(e, i, r = "Snapping", a = {}) {
    this.__fire(e, "pm:snap", i, r, a);
  }, _fireUnsnap(e, i, r = "Snapping", a = {}) {
    this.__fire(e, "pm:unsnap", i, r, a);
  }, _fireRotationEnable(e, i, r = "Rotation", a = {}) {
    this.__fire(e, "pm:rotateenable", { layer: this._layer, helpLayer: this._rotatePoly, shape: this.getShape() }, r, a);
  }, _fireRotationDisable(e, i = "Rotation", r = {}) {
    this.__fire(e, "pm:rotatedisable", { layer: this._layer, shape: this.getShape() }, i, r);
  }, _fireRotationStart(e, i, r = "Rotation", a = {}) {
    this.__fire(e, "pm:rotatestart", { layer: this._rotationLayer, helpLayer: this._layer, startAngle: this._startAngle, originLatLngs: i }, r, a);
  }, _fireRotation(e, i, r, a = this._rotationLayer, o = "Rotation", h = {}) {
    this.__fire(e, "pm:rotate", { layer: a, helpLayer: this._layer, startAngle: this._startAngle, angle: a.pm.getAngle(), angleDiff: i, oldLatLngs: r, newLatLngs: a.getLatLngs() }, o, h);
  }, _fireRotationEnd(e, i, r, a = "Rotation", o = {}) {
    this.__fire(e, "pm:rotateend", { layer: this._rotationLayer, helpLayer: this._layer, startAngle: i, angle: this._rotationLayer.pm.getAngle(), originLatLngs: r, newLatLngs: this._rotationLayer.getLatLngs() }, a, o);
  }, _fireActionClick(e, i, r, a = "Toolbar", o = {}) {
    this.__fire(this._map, "pm:actionclick", { text: e.text, action: e, btnName: i, button: r }, a, o);
  }, _fireButtonClick(e, i, r = "Toolbar", a = {}) {
    this.__fire(this._map, "pm:buttonclick", { btnName: e, button: i }, r, a);
  }, _fireLangChange(e, i, r, a, o = "Global", h = {}) {
    this.__fire(this.map, "pm:langchange", { oldLang: e, activeLang: i, fallback: r, translations: a }, o, h);
  }, _fireGlobalDragModeToggled(e, i = "Global", r = {}) {
    this.__fire(this.map, "pm:globaldragmodetoggled", { enabled: e, map: this.map }, i, r);
  }, _fireGlobalEditModeToggled(e, i = "Global", r = {}) {
    this.__fire(this.map, "pm:globaleditmodetoggled", { enabled: e, map: this.map }, i, r);
  }, _fireGlobalRemovalModeToggled(e, i = "Global", r = {}) {
    this.__fire(this.map, "pm:globalremovalmodetoggled", { enabled: e, map: this.map }, i, r);
  }, _fireGlobalCutModeToggled(e = "Global", i = {}) {
    this.__fire(this._map, "pm:globalcutmodetoggled", { enabled: !!this._enabled, map: this._map }, e, i);
  }, _fireGlobalDrawModeToggled(e = "Global", i = {}) {
    this.__fire(this._map, "pm:globaldrawmodetoggled", { enabled: this._enabled, shape: this._shape, map: this._map }, e, i);
  }, _fireGlobalRotateModeToggled(e = "Global", i = {}) {
    this.__fire(this.map, "pm:globalrotatemodetoggled", { enabled: this.globalRotateModeEnabled(), map: this.map }, e, i);
  }, _fireRemoveLayerGroup(e, i = e, r = "Edit", a = {}) {
    this.__fire(e, "pm:remove", { layer: i, shape: void 0 }, r, a);
  }, _fireKeyeventEvent(e, i, r, a = "Global", o = {}) {
    this.__fire(this.map, "pm:keyevent", { event: e, eventType: i, focusOn: r }, a, o);
  }, __fire(e, i, r, a, o = {}) {
    r = (0, nn.default)(r, o, { source: a }), L.PM.Utils._fireEvent(e, i, r);
  } }, jn = Wa, go = () => ({ _lastEvents: { keydown: void 0, keyup: void 0, current: void 0 }, _initKeyListener(e) {
    this.map = e, L.DomEvent.on(document, "keydown keyup", this._onKeyListener, this), L.DomEvent.on(window, "blur", this._onBlur, this), e.once("unload", this._unbindKeyListenerEvents, this);
  }, _handleEscapeKey(e) {
    let i = this.map.pm;
    return !i.getGlobalOptions().exitModeOnEscape || !(i.globalDrawModeEnabled() || i.globalEditModeEnabled() || i.globalDragModeEnabled() || i.globalRemovalModeEnabled() || i.globalRotateModeEnabled() || i.globalCutModeEnabled()) ? !1 : (e.preventDefault(), i.globalDrawModeEnabled() && i.disableDraw(), i.globalEditModeEnabled() && i.disableGlobalEditMode(), i.globalDragModeEnabled() && i.disableGlobalDragMode(), i.globalRemovalModeEnabled() && i.disableGlobalRemovalMode(), i.globalRotateModeEnabled() && i.disableGlobalRotateMode(), i.globalCutModeEnabled() && i.disableGlobalCutMode(), !0);
  }, _handleEnterKey(e) {
    let i = this.map.pm;
    if (!i.getGlobalOptions().finishOnEnter) return !1;
    let r = i.Draw.getActiveShape();
    if (!r) return !1;
    let a = i.Draw[r];
    return !a || !a._finishShape || !this._canFinishShape(a, r) ? !1 : (e.preventDefault(), a._finishShape(), !0);
  }, _canFinishShape(e, i) {
    var r;
    if (["Marker", "CircleMarker", "Text"].includes(i)) return !1;
    if (i === "Rectangle") return e._startMarker !== void 0;
    if (i === "Circle") return e._centerMarker && ((r = e._layerGroup) == null ? void 0 : r.hasLayer(e._centerMarker));
    if (e._layer && e._layer.getLatLngs) {
      let a = e._layer.getLatLngs();
      if (i === "Line") return (a.flat ? a.flat() : a).length >= 2;
      if (i === "Polygon" || i === "Cut") return a.length >= 3;
    }
    return !1;
  }, _unbindKeyListenerEvents() {
    L.DomEvent.off(document, "keydown keyup", this._onKeyListener, this), L.DomEvent.off(window, "blur", this._onBlur, this);
  }, _onKeyListener(e) {
    let i = "document";
    this.map.getContainer().contains(e.target) && (i = "map");
    let r = { event: e, eventType: e.type, focusOn: i };
    this._lastEvents[e.type] = r, this._lastEvents.current = r, this.map.pm._fireKeyeventEvent(e, e.type, i), e.type === "keydown" && (e.key === "Escape" && this._handleEscapeKey(e), e.key === "Enter" && this._handleEnterKey(e));
  }, _onBlur(e) {
    e.altKey = !1;
    let i = { event: e, eventType: e.type, focusOn: "document" };
    this._lastEvents[e.type] = i, this._lastEvents.current = i;
  }, getLastKeyEvent(e = "current") {
    return this._lastEvents[e];
  }, isShiftKeyPressed() {
    var e;
    return (e = this._lastEvents.current) == null ? void 0 : e.event.shiftKey;
  }, isAltKeyPressed() {
    var e;
    return (e = this._lastEvents.current) == null ? void 0 : e.event.altKey;
  }, isCtrlKeyPressed() {
    var e;
    return (e = this._lastEvents.current) == null ? void 0 : e.event.ctrlKey;
  }, isMetaKeyPressed() {
    var e;
    return (e = this._lastEvents.current) == null ? void 0 : e.event.metaKey;
  }, getPressedKey() {
    var e;
    return (e = this._lastEvents.current) == null ? void 0 : e.event.key;
  } }), Ja = go, or = x(Vi());
  function ce(e) {
    let i = L.PM.activeLang;
    return (0, or.default)(pe[i], e) || (0, or.default)(pe.en, e) || e;
  }
  function Xa() {
    return window.matchMedia ? !window.matchMedia("(pointer: coarse)").matches : !0;
  }
  function le(e) {
    for (let i = 0; i < e.length; i += 1) {
      let r = e[i];
      if (Array.isArray(r)) {
        if (le(r)) return !0;
      } else if (r != null && r !== "") return !0;
    }
    return !1;
  }
  function lr(e) {
    return e.reduce((i, r) => {
      if (r.length !== 0) {
        let a = Array.isArray(r) ? lr(r) : r;
        Array.isArray(a) ? a.length !== 0 && i.push(a) : i.push(a);
      }
      return i;
    }, []);
  }
  function di(e, i, r) {
    let a = { a: L.CRS.Earth.R, b: 63567523142e-4, f: 0.0033528106647474805 }, { a: o, b: h, f } = a, _ = e.lng, k = e.lat, C = r, N = Math.PI, O = i * N / 180, K = Math.sin(O), Y = Math.cos(O), dt = (1 - f) * Math.tan(k * N / 180), _t = 1 / Math.sqrt(1 + dt * dt), Lt = dt * _t, Pt = Math.atan2(dt, Y), F = _t * K, nt = 1 - F * F, ct = nt * (o * o - h * h) / (h * h), vt = 1 + ct / 16384 * (4096 + ct * (-768 + ct * (320 - 175 * ct))), yt = ct / 1024 * (256 + ct * (-128 + ct * (74 - 47 * ct))), bt = C / (h * vt), A = 2 * Math.PI, D, I, W;
    for (; Math.abs(bt - A) > 1e-12; ) {
      D = Math.cos(2 * Pt + bt), I = Math.sin(bt), W = Math.cos(bt);
      let mt = yt * I * (D + yt / 4 * (W * (-1 + 2 * D * D) - yt / 6 * D * (-3 + 4 * I * I) * (-3 + 4 * D * D)));
      A = bt, bt = C / (h * vt) + mt;
    }
    let Z = Lt * I - _t * W * Y, U = Math.atan2(Lt * W + _t * I * Y, (1 - f) * Math.sqrt(F * F + Z * Z)), it = Math.atan2(I * K, _t * W - Lt * I * Y), J = f / 16 * nt * (4 + f * (4 - 3 * nt)), et = it - (1 - J) * f * F * (bt + J * I * (D + J * W * (-1 + 2 * D * D))), st = _ + et * 180 / N, at = U * 180 / N;
    return L.latLng(st, at);
  }
  function vn(e, i, r, a, o = !0) {
    let h, f, _, k = [];
    for (let C = 0; C < r; C += 1) {
      if (o) h = C * 360 / r + a, f = di(e, h, i), _ = L.latLng(f.lng, f.lat);
      else {
        let N = e.lat + Math.cos(2 * C * Math.PI / r) * i, O = e.lng + Math.sin(2 * C * Math.PI / r) * i;
        _ = L.latLng(N, O);
      }
      k.push(_);
    }
    return k;
  }
  function Ya(e, i, r) {
    i = (i + 360) % 360;
    let a = Math.PI / 180, o = 180 / Math.PI, { R: h } = L.CRS.Earth, f = e.lng * a, _ = e.lat * a, k = i * a, C = Math.sin(_), N = Math.cos(_), O = Math.cos(r / h), K = Math.sin(r / h), Y = Math.asin(C * O + N * K * Math.cos(k)), dt = f + Math.atan2(Math.sin(k) * K * N, O - C * Math.sin(Y));
    dt *= o;
    let _t = dt - 360, Lt = dt < -180 ? dt + 360 : dt;
    return dt = dt > 180 ? _t : Lt, L.latLng([Y * o, dt]);
  }
  function Wr(e, i, r) {
    let a = e.latLngToContainerPoint(i), o = e.latLngToContainerPoint(r), h = Math.atan2(o.y - a.y, o.x - a.x) * 180 / Math.PI + 90;
    return h += h < 0 ? 360 : 0, h;
  }
  function bn(e, i, r, a) {
    let o = Wr(e, i, r);
    return Ya(i, o, a);
  }
  function _o(e, i, r = "asc") {
    if (!i || Object.keys(i).length === 0) return (k, C) => k - C;
    let a = Object.keys(i), o, h = a.length - 1, f = {};
    for (; h >= 0; ) o = a[h], f[o.toLowerCase()] = i[o], h -= 1;
    function _(k) {
      if (k instanceof L.Marker) return "Marker";
      if (k instanceof L.Circle) return "Circle";
      if (k instanceof L.CircleMarker) return "CircleMarker";
      if (k instanceof L.Rectangle) return "Rectangle";
      if (k instanceof L.Polygon) return "Polygon";
      if (k instanceof L.Polyline) return "Line";
    }
    return (k, C) => {
      let N, O;
      if (N = _(k.layer).toLowerCase(), O = _(C.layer).toLowerCase(), !N || !O) return 0;
      let K = N in f ? f[N] : Number.MAX_SAFE_INTEGER, Y = O in f ? f[O] : Number.MAX_SAFE_INTEGER, dt = 0;
      return K < Y ? dt = -1 : K > Y && (dt = 1), r === "desc" ? dt * -1 : dt;
    };
  }
  function Ai(e, i = e.getLatLngs()) {
    return e instanceof L.Polygon ? L.polygon(i).getLatLngs() : L.polyline(i).getLatLngs();
  }
  function Qa(e, i) {
    var r, a, o, h;
    if ((a = (r = i.options.crs) == null ? void 0 : r.projection) != null && a.MAX_LATITUDE) {
      let f = (h = (o = i.options.crs) == null ? void 0 : o.projection) == null ? void 0 : h.MAX_LATITUDE;
      e.lat = Math.max(Math.min(f, e.lat), -f);
    }
    return e;
  }
  function xn(e) {
    return e.options.renderer || e._map && (e._map._getPaneRenderer(e.options.pane) || e._map.options.renderer || e._map._renderer) || e._renderer;
  }
  function Jr(e, i) {
    if (e = e.trim().toLowerCase(), i[e]) return e;
    let r = e.replace(/[-_\s]/g, "_").match(/^([a-z]{2,3})(?:_([a-z]{2,3}))?$/);
    if (r) {
      let a = [];
      r[2] && a.push(`${r[1]}_${r[2]}`), a.push(r[1]);
      for (let o of a) if (i[o]) return o;
    }
    return e;
  }
  var yo = L.Class.extend({ includes: [Zr, Hr, Kr, Ie, jn], initialize(e) {
    this.map = e, this.Draw = new L.PM.Draw(e), this.Toolbar = new L.PM.Toolbar(e), this.Keyboard = Ja(), this.globalOptions = { snappable: !0, layerGroup: void 0, snappingOrder: ["Marker", "CircleMarker", "Circle", "Line", "Polygon", "Rectangle"], panes: { vertexPane: "markerPane", layerPane: "overlayPane", markerPane: "markerPane" }, draggable: !0, exitModeOnEscape: !1, finishOnEnter: !1 }, this.Keyboard._initKeyListener(e);
  }, setLang(e = "en", i, r = "en") {
    e = Jr(e, pe);
    let a = L.PM.activeLang;
    i && (pe[e] = (0, In.default)(pe[r], i)), L.PM.activeLang = e, this.map.pm.Toolbar.reinit(), this._fireLangChange(a, e, r, pe[e]);
  }, addControls(e) {
    this.Toolbar.addControls(e);
  }, removeControls() {
    this.Toolbar.removeControls();
  }, toggleControls() {
    this.Toolbar.toggleControls();
  }, controlsVisible() {
    return this.Toolbar.isVisible;
  }, enableDraw(e = "Polygon", i) {
    e === "Poly" && (e = "Polygon"), this.Draw.enable(e, i);
  }, disableDraw(e = "Polygon") {
    e === "Poly" && (e = "Polygon"), this.Draw.disable(e);
  }, setPathOptions(e, i = {}) {
    let r = i.ignoreShapes || [], a = i.merge || !1;
    this.map.pm.Draw.shapes.forEach((o) => {
      r.indexOf(o) === -1 && this.map.pm.Draw[o].setPathOptions(e, a);
    });
  }, getGlobalOptions() {
    return this.globalOptions;
  }, setGlobalOptions(e) {
    let i = (0, In.default)(this.globalOptions, e);
    i.editable && (i.resizeableCircleMarker = i.editable, delete i.editable);
    let r = !1;
    this.map.pm.Draw.CircleMarker.enabled() && !!this.map.pm.Draw.CircleMarker.options.resizeableCircleMarker != !!i.resizeableCircleMarker && (this.map.pm.Draw.CircleMarker.disable(), r = !0);
    let a = !1;
    this.map.pm.Draw.Circle.enabled() && !!this.map.pm.Draw.Circle.options.resizeableCircle != !!i.resizeableCircle && (this.map.pm.Draw.Circle.disable(), a = !0), this.map.pm.Draw.shapes.forEach((o) => {
      this.map.pm.Draw[o].setOptions(i);
    }), r && this.map.pm.Draw.CircleMarker.enable(), a && this.map.pm.Draw.Circle.enable(), L.PM.Utils.findLayers(this.map).forEach((o) => {
      o.pm.setOptions(i);
    }), this.map.fire("pm:globaloptionschanged"), this.globalOptions = i, this.applyGlobalOptions();
  }, applyGlobalOptions() {
    L.PM.Utils.findLayers(this.map).forEach((e) => {
      e.pm.enabled() && e.pm.applyOptions();
    });
  }, globalDrawModeEnabled() {
    return !!this.Draw.getActiveShape();
  }, globalCutModeEnabled() {
    return !!this.Draw.Cut.enabled();
  }, enableGlobalCutMode(e) {
    return this.Draw.Cut.enable(e);
  }, toggleGlobalCutMode(e) {
    return this.Draw.Cut.toggle(e);
  }, disableGlobalCutMode() {
    return this.Draw.Cut.disable();
  }, getGeomanLayers(e = !1) {
    let i = L.PM.Utils.findLayers(this.map);
    if (!e) return i;
    let r = L.featureGroup();
    return r._pmTempLayer = !0, i.forEach((a) => {
      r.addLayer(a);
    }), r;
  }, getGeomanDrawLayers(e = !1) {
    let i = L.PM.Utils.findLayers(this.map).filter((a) => a._drawnByGeoman === !0);
    if (!e) return i;
    let r = L.featureGroup();
    return r._pmTempLayer = !0, i.forEach((a) => {
      r.addLayer(a);
    }), r;
  }, _getContainingLayer() {
    return this.globalOptions.layerGroup && this.globalOptions.layerGroup instanceof L.LayerGroup ? this.globalOptions.layerGroup : this.map;
  }, _isCRSSimple() {
    return this.map.options.crs === L.CRS.Simple;
  }, _touchEventCounter: 0, _addTouchEvents(e) {
    this._touchEventCounter === 0 && (L.DomEvent.on(e, "touchmove", this._canvasTouchMove, this), L.DomEvent.on(e, "touchstart touchend touchcancel", this._canvasTouchClick, this)), this._touchEventCounter += 1;
  }, _removeTouchEvents(e) {
    this._touchEventCounter === 1 && (L.DomEvent.off(e, "touchmove", this._canvasTouchMove, this), L.DomEvent.off(e, "touchstart touchend touchcancel", this._canvasTouchClick, this)), this._touchEventCounter = this._touchEventCounter <= 1 ? 0 : this._touchEventCounter - 1;
  }, _canvasTouchMove(e) {
    xn(this.map)._onMouseMove(this._createMouseEvent("mousemove", e));
  }, _canvasTouchClick(e) {
    let i = "";
    e.type === "touchstart" || e.type === "pointerdown" ? i = "mousedown" : (e.type === "touchend" || e.type === "pointerup" || e.type === "touchcancel" || e.type === "pointercancel") && (i = "mouseup"), i && xn(this.map)._onClick(this._createMouseEvent(i, e));
  }, _createMouseEvent(e, i) {
    let r, a = i.touches[0] || i.changedTouches[0];
    try {
      r = new MouseEvent(e, { bubbles: i.bubbles, cancelable: i.cancelable, view: i.view, detail: a.detail, screenX: a.screenX, screenY: a.screenY, clientX: a.clientX, clientY: a.clientY, ctrlKey: i.ctrlKey, altKey: i.altKey, shiftKey: i.shiftKey, metaKey: i.metaKey, button: i.button, relatedTarget: i.relatedTarget });
    } catch {
      r = document.createEvent("MouseEvents"), r.initMouseEvent(e, i.bubbles, i.cancelable, i.view, a.detail, a.screenX, a.screenY, a.clientX, a.clientY, i.ctrlKey, i.altKey, i.shiftKey, i.metaKey, i.button, i.relatedTarget);
    }
    return r;
  } }), yi = yo, vo = L.Control.extend({ includes: [jn], options: { position: "topleft", disableByOtherButtons: !0 }, initialize(e) {
    this._button = L.Util.extend({}, this.options, e);
  }, onAdd(e) {
    return this._map = e, this._map.pm.Toolbar.options.oneBlock ? this._container = this._map.pm.Toolbar._createContainer(this.options.position) : this._button.tool === "edit" ? this._container = this._map.pm.Toolbar.editContainer : this._button.tool === "options" ? this._container = this._map.pm.Toolbar.optionsContainer : this._button.tool === "custom" ? this._container = this._map.pm.Toolbar.customContainer : this._container = this._map.pm.Toolbar.drawContainer, this._renderButton(), this._container;
  }, _renderButton() {
    let e = this.buttonsDomNode;
    this.buttonsDomNode = this._makeButton(this._button), e ? e.replaceWith(this.buttonsDomNode) : this._container.appendChild(this.buttonsDomNode);
  }, onRemove() {
    return this.buttonsDomNode.remove(), this._container;
  }, getText() {
    return this._button.text;
  }, getIconUrl() {
    return this._button.iconUrl;
  }, destroy() {
    this._button = {}, this._update();
  }, toggle(e) {
    return typeof e == "boolean" ? this._button.toggleStatus = e : this._button.toggleStatus = !this._button.toggleStatus, this._applyStyleClasses(), this._updateActiveAction(this._button), this._button.toggleStatus;
  }, toggled() {
    return this._button.toggleStatus;
  }, onCreate() {
    this.toggle(!1);
  }, disable() {
    this.toggle(!1), this._button.disabled = !0, this._updateDisabled();
  }, enable() {
    this._button.disabled = !1, this._updateDisabled(), this._updateActiveAction(this._button);
  }, _triggerClick(e) {
    e && e.preventDefault(), !this._button.disabled && (this._button.onClick(e, { button: this, event: e }), this._clicked(e), this._button.afterClick(e, { button: this, event: e }));
  }, _makeButton(e) {
    let i = this.options.position.indexOf("right") > -1 ? "pos-right" : "", r = L.DomUtil.create("div", `button-container  ${i}`, this._container);
    e.title && r.setAttribute("title", e.title);
    let a = L.DomUtil.create("a", "leaflet-buttons-control-button", r);
    a.setAttribute("role", "button"), a.setAttribute("tabindex", "0"), a.href = "#";
    let o = L.DomUtil.create("div", `leaflet-pm-actions-container ${i}`, r), h = e.actions, f = { cancel: { text: ce("actions.cancel"), title: ce("actions.cancel"), onClick() {
      this._triggerClick();
    } }, finishMode: { text: ce("actions.finish"), title: ce("actions.finish"), onClick() {
      this._triggerClick();
    } }, removeLastVertex: { text: ce("actions.removeLastVertex"), title: ce("actions.removeLastVertex"), onClick() {
      this._map.pm.Draw[e.jsClass]._removeLastVertex();
    } }, finish: { text: ce("actions.finish"), title: ce("actions.finish"), onClick(k) {
      this._map.pm.Draw[e.jsClass]._finishShape(k);
    } } };
    e._preparedActions = h.map((k) => {
      let C = typeof k == "string" ? k : k.name, N;
      if (f[C]) N = f[C];
      else if (k.text) N = k;
      else return N;
      let O = L.DomUtil.create("a", `leaflet-pm-action ${i} action-${C}`, o);
      if (O.setAttribute("role", "button"), O.setAttribute("tabindex", "0"), O.href = "#", N.title && (O.title = N.title), O.innerHTML = N.text, L.DomEvent.disableClickPropagation(O), L.DomEvent.on(O, "click", L.DomEvent.stop), N._node = O, !e.disabled && N.onClick) {
        let K = (Y) => {
          Y.preventDefault();
          let dt = "", { buttons: _t } = this._map.pm.Toolbar;
          for (let Lt in _t) if (_t[Lt]._button === e) {
            dt = Lt;
            break;
          }
          this._fireActionClick(N, dt, e);
        };
        L.DomEvent.addListener(O, "click", K, this), L.DomEvent.addListener(O, "click", N.onClick, this), L.DomEvent.addListener(O, "click", () => this._updateActiveAction(e));
      }
      return N;
    }), this._updateActiveAction(e), e.toggleStatus && L.DomUtil.addClass(r, "active");
    let _ = L.DomUtil.create("div", "control-icon", a);
    return e.iconUrl && _.setAttribute("src", e.iconUrl), e.className && L.DomUtil.addClass(_, e.className), L.DomEvent.disableClickPropagation(a), L.DomEvent.on(a, "click", L.DomEvent.stop), e.disabled || (L.DomEvent.addListener(a, "click", this._onBtnClick, this), L.DomEvent.addListener(a, "click", this._triggerClick, this)), e.disabled && (L.DomUtil.addClass(a, "pm-disabled"), a.setAttribute("aria-disabled", "true")), r;
  }, _applyStyleClasses() {
    this._container && (!this._button.toggleStatus || this._button.cssToggle === !1 ? (L.DomUtil.removeClass(this.buttonsDomNode, "active"), L.DomUtil.removeClass(this._container, "activeChild")) : (L.DomUtil.addClass(this.buttonsDomNode, "active"), L.DomUtil.addClass(this._container, "activeChild")));
  }, _onBtnClick() {
    if (this._button.disabled) return;
    this._button.disableOtherButtons && this._map.pm.Toolbar.triggerClickOnToggledButtons(this);
    let e = "", { buttons: i } = this._map.pm.Toolbar;
    for (let r in i) if (i[r]._button === this._button) {
      e = r;
      break;
    }
    this._fireButtonClick(e, this._button);
  }, _clicked() {
    this._button.doToggle && this.toggle();
  }, _updateDisabled() {
    if (!this._container) return;
    let e = "pm-disabled", i = this.buttonsDomNode.children[0];
    this._button.disabled ? (L.DomUtil.addClass(i, e), i.setAttribute("aria-disabled", "true")) : (L.DomUtil.removeClass(i, e), i.setAttribute("aria-disabled", "false"));
  }, _updateActiveAction(e) {
    var i;
    (i = e._preparedActions) == null || i.forEach((r) => {
      r != null && r._node && (r.isActive && r.isActive.call(this) ? L.DomUtil.addClass(r._node, "active-action") : L.DomUtil.removeClass(r._node, "active-action"));
    });
  } }), ts = vo;
  L.Control.PMButton = ts;
  var Ui = L.Class.extend({ options: { drawMarker: !0, drawRectangle: !0, drawPolyline: !0, drawPolygon: !0, drawCircle: !0, drawCircleMarker: !0, drawText: !0, editMode: !0, dragMode: !0, cutPolygon: !0, removalMode: !0, rotateMode: !0, snappingOption: !0, drawControls: !0, editControls: !0, optionsControls: !0, customControls: !0, oneBlock: !1, position: "topleft", positions: { draw: "", edit: "", options: "", custom: "" } }, customButtons: [], initialize(e) {
    this.customButtons = [], this.options.positions = { draw: "", edit: "", options: "", custom: "" }, this.init(e);
  }, reinit() {
    let e = this.isVisible;
    this.removeControls(), this._defineButtons(), e && this.addControls();
  }, init(e) {
    this.map = e, this.buttons = {}, this.isVisible = !1, this.drawContainer = L.DomUtil.create("div", "leaflet-pm-toolbar leaflet-pm-draw leaflet-bar leaflet-control"), this.editContainer = L.DomUtil.create("div", "leaflet-pm-toolbar leaflet-pm-edit leaflet-bar leaflet-control"), this.optionsContainer = L.DomUtil.create("div", "leaflet-pm-toolbar leaflet-pm-options leaflet-bar leaflet-control"), this.customContainer = L.DomUtil.create("div", "leaflet-pm-toolbar leaflet-pm-custom leaflet-bar leaflet-control"), this._defineButtons();
  }, _createContainer(e) {
    let i = `${e}Container`;
    return this[i] || (this[i] = L.DomUtil.create("div", `leaflet-pm-toolbar leaflet-pm-${e} leaflet-bar leaflet-control`)), this[i];
  }, getButtons() {
    return this.buttons;
  }, addControls(e = this.options) {
    typeof e.editPolygon < "u" && (e.editMode = e.editPolygon), typeof e.deleteLayer < "u" && (e.removalMode = e.deleteLayer), L.Util.setOptions(this, e), this.applyIconStyle(), this.isVisible = !0, this._showHideButtons();
  }, applyIconStyle() {
    let e = this.getButtons(), i = { geomanIcons: { drawMarker: "control-icon leaflet-pm-icon-marker", drawPolyline: "control-icon leaflet-pm-icon-polyline", drawRectangle: "control-icon leaflet-pm-icon-rectangle", drawPolygon: "control-icon leaflet-pm-icon-polygon", drawCircle: "control-icon leaflet-pm-icon-circle", drawCircleMarker: "control-icon leaflet-pm-icon-circle-marker", editMode: "control-icon leaflet-pm-icon-edit", dragMode: "control-icon leaflet-pm-icon-drag", cutPolygon: "control-icon leaflet-pm-icon-cut", removalMode: "control-icon leaflet-pm-icon-delete", drawText: "control-icon leaflet-pm-icon-text" } };
    for (let r in e) {
      let a = e[r];
      L.Util.setOptions(a, { className: i.geomanIcons[r] });
    }
  }, removeControls() {
    let e = this.getButtons();
    for (let i in e) e[i].remove();
    this.isVisible = !1;
  }, deleteControl(e) {
    let i = this._btnNameMapping(e);
    this.buttons[i] && (this.buttons[i].remove(), delete this.buttons[i]);
  }, toggleControls(e = this.options) {
    this.isVisible ? this.removeControls() : this.addControls(e);
  }, _addButton(e, i) {
    return this.buttons[e] = i, this.options[e] = !!this.options[e] || !1, this.buttons[e];
  }, triggerClickOnToggledButtons(e) {
    for (let i in this.buttons) {
      let r = this.buttons[i];
      r._button.disableByOtherButtons && r !== e && r.toggled() && r._triggerClick();
    }
  }, toggleButton(e, i, r = !0) {
    e === "editPolygon" && (e = "editMode"), e === "deleteLayer" && (e = "removalMode");
    let a = e;
    return r && this.triggerClickOnToggledButtons(this.buttons[a]), this.buttons[a] ? this.buttons[a].toggle(i) : !1;
  }, _defineButtons() {
    let e = { className: "control-icon leaflet-pm-icon-marker", title: ce("buttonTitles.drawMarkerButton"), jsClass: "Marker", onClick: () => {
    }, afterClick: (K, Y) => {
      this.map.pm.Draw[Y.button._button.jsClass].toggle();
    }, doToggle: !0, toggleStatus: !1, disableOtherButtons: !0, position: this.options.position, actions: ["cancel"] }, i = { title: ce("buttonTitles.drawPolyButton"), className: "control-icon leaflet-pm-icon-polygon", jsClass: "Polygon", onClick: () => {
    }, afterClick: (K, Y) => {
      this.map.pm.Draw[Y.button._button.jsClass].toggle();
    }, doToggle: !0, toggleStatus: !1, disableOtherButtons: !0, position: this.options.position, actions: ["finish", "removeLastVertex", "cancel"] }, r = { className: "control-icon leaflet-pm-icon-polyline", title: ce("buttonTitles.drawLineButton"), jsClass: "Line", onClick: () => {
    }, afterClick: (K, Y) => {
      this.map.pm.Draw[Y.button._button.jsClass].toggle();
    }, doToggle: !0, toggleStatus: !1, disableOtherButtons: !0, position: this.options.position, actions: ["finish", "removeLastVertex", "cancel"] }, a = { title: ce("buttonTitles.drawCircleButton"), className: "control-icon leaflet-pm-icon-circle", jsClass: "Circle", onClick: () => {
    }, afterClick: (K, Y) => {
      this.map.pm.Draw[Y.button._button.jsClass].toggle();
    }, doToggle: !0, toggleStatus: !1, disableOtherButtons: !0, position: this.options.position, actions: ["cancel"] }, o = { title: ce("buttonTitles.drawCircleMarkerButton"), className: "control-icon leaflet-pm-icon-circle-marker", jsClass: "CircleMarker", onClick: () => {
    }, afterClick: (K, Y) => {
      this.map.pm.Draw[Y.button._button.jsClass].toggle();
    }, doToggle: !0, toggleStatus: !1, disableOtherButtons: !0, position: this.options.position, actions: ["cancel"] }, h = { title: ce("buttonTitles.drawRectButton"), className: "control-icon leaflet-pm-icon-rectangle", jsClass: "Rectangle", onClick: () => {
    }, afterClick: (K, Y) => {
      this.map.pm.Draw[Y.button._button.jsClass].toggle();
    }, doToggle: !0, toggleStatus: !1, disableOtherButtons: !0, position: this.options.position, actions: ["cancel"] }, f = { title: ce("buttonTitles.editButton"), className: "control-icon leaflet-pm-icon-edit", onClick: () => {
    }, afterClick: () => {
      this.map.pm.toggleGlobalEditMode();
    }, doToggle: !0, toggleStatus: !1, disableOtherButtons: !0, position: this.options.position, tool: "edit", actions: ["finishMode"] }, _ = { title: ce("buttonTitles.dragButton"), className: "control-icon leaflet-pm-icon-drag", onClick: () => {
    }, afterClick: () => {
      this.map.pm.toggleGlobalDragMode();
    }, doToggle: !0, toggleStatus: !1, disableOtherButtons: !0, position: this.options.position, tool: "edit", actions: ["finishMode"] }, k = { title: ce("buttonTitles.cutButton"), className: "control-icon leaflet-pm-icon-cut", jsClass: "Cut", onClick: () => {
    }, afterClick: (K, Y) => {
      this.map.pm.Draw[Y.button._button.jsClass].toggle({ snappable: !0, cursorMarker: !0, allowSelfIntersection: !1 });
    }, doToggle: !0, toggleStatus: !1, disableOtherButtons: !0, position: this.options.position, tool: "edit", actions: ["finish", "removeLastVertex", "cancel"] }, C = { title: ce("buttonTitles.deleteButton"), className: "control-icon leaflet-pm-icon-delete", onClick: () => {
    }, afterClick: () => {
      this.map.pm.toggleGlobalRemovalMode();
    }, doToggle: !0, toggleStatus: !1, disableOtherButtons: !0, position: this.options.position, tool: "edit", actions: ["finishMode"] }, N = { title: ce("buttonTitles.rotateButton"), className: "control-icon leaflet-pm-icon-rotate", onClick: () => {
    }, afterClick: () => {
      this.map.pm.toggleGlobalRotateMode();
    }, doToggle: !0, toggleStatus: !1, disableOtherButtons: !0, position: this.options.position, tool: "edit", actions: ["finishMode"] }, O = { className: "control-icon leaflet-pm-icon-text", title: ce("buttonTitles.drawTextButton"), jsClass: "Text", onClick: () => {
    }, afterClick: (K, Y) => {
      this.map.pm.Draw[Y.button._button.jsClass].toggle();
    }, doToggle: !0, toggleStatus: !1, disableOtherButtons: !0, position: this.options.position, actions: ["cancel"] };
    this._addButton("drawMarker", new L.Control.PMButton(e)), this._addButton("drawPolyline", new L.Control.PMButton(r)), this._addButton("drawRectangle", new L.Control.PMButton(h)), this._addButton("drawPolygon", new L.Control.PMButton(i)), this._addButton("drawCircle", new L.Control.PMButton(a)), this._addButton("drawCircleMarker", new L.Control.PMButton(o)), this._addButton("drawText", new L.Control.PMButton(O)), this._addButton("editMode", new L.Control.PMButton(f)), this._addButton("dragMode", new L.Control.PMButton(_)), this._addButton("cutPolygon", new L.Control.PMButton(k)), this._addButton("removalMode", new L.Control.PMButton(C)), this._addButton("rotateMode", new L.Control.PMButton(N));
  }, _showHideButtons() {
    if (!this.isVisible) return;
    this.removeControls(), this.isVisible = !0;
    let e = this.getButtons(), i = [];
    this.options.drawControls === !1 && (i = i.concat(Object.keys(e).filter((r) => !e[r]._button.tool))), this.options.editControls === !1 && (i = i.concat(Object.keys(e).filter((r) => e[r]._button.tool === "edit"))), this.options.optionsControls === !1 && (i = i.concat(Object.keys(e).filter((r) => e[r]._button.tool === "options"))), this.options.customControls === !1 && (i = i.concat(Object.keys(e).filter((r) => e[r]._button.tool === "custom")));
    for (let r in e) if (this.options[r] && i.indexOf(r) === -1) {
      let a = e[r]._button.tool;
      a || (a = "draw"), e[r].setPosition(this._getBtnPosition(a)), e[r].addTo(this.map);
    }
  }, _getBtnPosition(e) {
    return this.options.positions && this.options.positions[e] ? this.options.positions[e] : this.options.position;
  }, setBlockPosition(e, i) {
    this.options.positions[e] = i, this._showHideButtons(), this.changeControlOrder();
  }, getBlockPositions() {
    return this.options.positions;
  }, copyDrawControl(e, i) {
    if (i) typeof i != "object" && (i = { name: i });
    else throw new TypeError("Button has no name");
    let r = this._btnNameMapping(e);
    if (!i.name) throw new TypeError("Button has no name");
    if (this.buttons[i.name]) throw new TypeError("Button with this name already exists");
    let a = this.map.pm.Draw.createNewDrawInstance(i.name, r);
    i = { ...this.buttons[r]._button, ...i };
    let o = this.createCustomControl(i);
    return { drawInstance: a, control: o };
  }, createCustomControl(e) {
    if (!e.name) throw new TypeError("Button has no name");
    if (this.buttons[e.name]) throw new TypeError("Button with this name already exists");
    e.onClick || (e.onClick = () => {
    }), e.afterClick || (e.afterClick = () => {
    }), e.toggle !== !1 && (e.toggle = !0), e.block && (e.block = e.block.toLowerCase()), (!e.block || e.block === "draw") && (e.block = ""), e.className ? e.className.indexOf("control-icon") === -1 && (e.className = `control-icon ${e.className}`) : e.className = "control-icon";
    let i = { tool: e.block, className: e.className, title: e.title || "", jsClass: e.name, onClick: e.onClick, afterClick: e.afterClick, doToggle: e.toggle, toggleStatus: !1, disableOtherButtons: e.disableOtherButtons ?? !0, disableByOtherButtons: e.disableByOtherButtons ?? !0, cssToggle: e.toggle, position: this.options.position, actions: e.actions || [], disabled: !!e.disabled };
    this.options[e.name] !== !1 && (this.options[e.name] = !0);
    let r = this._addButton(e.name, new L.Control.PMButton(i));
    return this.changeControlOrder(), r;
  }, controlExists(e) {
    return !!this.getButton(e);
  }, getButton(e) {
    return this.getButtons()[e];
  }, getButtonsInBlock(e) {
    let i = {};
    if (e) for (let r in this.getButtons()) {
      let a = this.getButtons()[r];
      (a._button.tool === e || e === "draw" && !a._button.tool) && (i[r] = a);
    }
    return i;
  }, changeControlOrder(e = []) {
    let i = this._shapeMapping(), r = [];
    e.forEach((h) => {
      i[h] ? r.push(i[h]) : r.push(h);
    });
    let a = this.getButtons(), o = {};
    r.forEach((h) => {
      a[h] && (o[h] = a[h]);
    }), Object.keys(a).filter((h) => !a[h]._button.tool || a[h]._button.tool === "draw").forEach((h) => {
      r.indexOf(h) === -1 && (o[h] = a[h]);
    }), Object.keys(a).filter((h) => a[h]._button.tool === "edit").forEach((h) => {
      r.indexOf(h) === -1 && (o[h] = a[h]);
    }), Object.keys(a).filter((h) => a[h]._button.tool === "options").forEach((h) => {
      r.indexOf(h) === -1 && (o[h] = a[h]);
    }), Object.keys(a).filter((h) => a[h]._button.tool === "custom").forEach((h) => {
      r.indexOf(h) === -1 && (o[h] = a[h]);
    }), Object.keys(a).forEach((h) => {
      r.indexOf(h) === -1 && (o[h] = a[h]);
    }), this.map.pm.Toolbar.buttons = o, this._showHideButtons();
  }, getControlOrder() {
    let e = this.getButtons(), i = [];
    for (let r in e) i.push(r);
    return i;
  }, changeActionsOfControl(e, i) {
    let r = this._btnNameMapping(e);
    if (!r) throw new TypeError("No name passed");
    if (!i) throw new TypeError("No actions passed");
    if (!this.buttons[r]) throw new TypeError("Button with this name not exists");
    this.buttons[r]._button.actions = i, this.changeControlOrder();
  }, setButtonDisabled(e, i) {
    let r = this._btnNameMapping(e);
    i ? this.buttons[r].disable() : this.buttons[r].enable();
  }, _shapeMapping() {
    return { Marker: "drawMarker", Circle: "drawCircle", Polygon: "drawPolygon", Rectangle: "drawRectangle", Polyline: "drawPolyline", Line: "drawPolyline", CircleMarker: "drawCircleMarker", Edit: "editMode", Drag: "dragMode", Cut: "cutPolygon", Removal: "removalMode", Rotate: "rotateMode", Text: "drawText" };
  }, _btnNameMapping(e) {
    let i = this._shapeMapping();
    return i[e] ? i[e] : e;
  } }), es = Ui, is = x(er()), Xr = { _initSnappableMarkers() {
    this.options.snapDistance = this.options.snapDistance || 30, this.options.snapSegment = this.options.snapSegment === void 0 ? !0 : this.options.snapSegment, this._assignEvents(this._markers), this._layer.off("pm:dragstart", this._unsnap, this), this._layer.on("pm:dragstart", this._unsnap, this);
  }, _disableSnapping() {
    this._layer.off("pm:dragstart", this._unsnap, this);
  }, _assignEvents(e) {
    e.forEach((i) => {
      if (Array.isArray(i)) {
        this._assignEvents(i);
        return;
      }
      i.off("drag", this._handleSnapping, this), i.on("drag", this._handleSnapping, this), i.off("dragend", this._cleanupSnapping, this), i.on("dragend", this._cleanupSnapping, this);
    });
  }, _cleanupSnapping(e) {
    if (e) {
      let i = e.target;
      i._snapped = !1;
    }
    delete this._snapList, this.throttledList && (this._map.off("layeradd", this.throttledList, this), this.throttledList = void 0), this._map.off("layerremove", this._handleSnapLayerRemoval, this), this.debugIndicatorLines && this.debugIndicatorLines.forEach((i) => {
      i.remove();
    });
  }, _handleThrottleSnapping() {
    this.throttledList && this._createSnapList();
  }, _handleSnapping(e, i = !1) {
    var C, N, O;
    let r = e.target;
    if (r._snapped = !1, this.throttledList || (this.throttledList = L.Util.throttle(this._handleThrottleSnapping, 100, this)), ((C = e == null ? void 0 : e.originalEvent) == null ? void 0 : C.altKey) || ((O = (N = this._map) == null ? void 0 : N.pm) == null ? void 0 : O.Keyboard.isAltKeyPressed())) return !1;
    let a;
    if (i) {
      if (!this._otherSnapLayers || this._otherSnapLayers.length === 0) return !1;
      a = this._otherSnapLayers;
    } else this._snapList === void 0 && (this._createSnapList(), this._map.off("layeradd", this.throttledList, this), this._map.on("layeradd", this.throttledList, this)), a = this._snapList;
    if (a.length <= 0) return !1;
    let o = this._calcClosestLayer(r.getLatLng(), a);
    if (Object.keys(o).length === 0) return !1;
    let h = o.layer instanceof L.Marker || o.layer instanceof L.CircleMarker || !this.options.snapSegment, f;
    h ? f = o.latlng : f = this._checkPrioritiySnapping(o);
    let _ = this.options.snapDistance, k = { marker: r, shape: this._shape, snapLatLng: f, segment: o.segment, layer: this._layer, workingLayer: this._layer, layerInteractedWith: o.layer, distance: o.distance };
    if (this._fireSnapDrag(k.marker, k), this._fireSnapDrag(this._layer, k), o.distance < _) {
      r._orgLatLng = r.getLatLng(), r.setLatLng(f), r._snapped = !0, r._snapInfo = k;
      let K = () => {
        this._snapLatLng = f, this._fireSnap(r, k), this._fireSnap(this._layer, k);
      }, Y = this._snapLatLng || {}, dt = f || {};
      (Y.lat !== dt.lat || Y.lng !== dt.lng) && K();
    } else this._snapLatLng && (this._unsnap(k), r._snapped = !1, r._snapInfo = void 0, this._fireUnsnap(k.marker, k), this._fireUnsnap(this._layer, k));
    return !0;
  }, _createSnapList() {
    let e = [], i = [], r = this._map;
    r.off("layerremove", this._handleSnapLayerRemoval, this), r.on("layerremove", this._handleSnapLayerRemoval, this), r.eachLayer((a) => {
      if ((a instanceof L.Polyline || a instanceof L.Marker || a instanceof L.CircleMarker || a instanceof L.ImageOverlay) && a.options.snapIgnore !== !0) {
        if (a.options.snapIgnore === void 0 && (!L.PM.optIn && a.options.pmIgnore === !0 || L.PM.optIn && a.options.pmIgnore !== !1)) return;
        (a instanceof L.Circle || a instanceof L.CircleMarker) && a.pm && a.pm._hiddenPolyCircle ? e.push(a.pm._hiddenPolyCircle) : a instanceof L.ImageOverlay && (a = L.rectangle(a.getBounds())), e.push(a);
        let o = L.polyline([], { color: "red", pmIgnore: !0 });
        o._pmTempLayer = !0, i.push(o), (a instanceof L.Circle || a instanceof L.CircleMarker) && i.push(o);
      }
    }), e = e.filter((a) => this._layer !== a), e = e.filter((a) => a._latlng || a._latlngs && le(a._latlngs)), e = e.filter((a) => !a._pmTempLayer), this._otherSnapLayers ? (this._otherSnapLayers.forEach(() => {
      let a = L.polyline([], { color: "red", pmIgnore: !0 });
      a._pmTempLayer = !0, i.push(a);
    }), this._snapList = e.concat(this._otherSnapLayers)) : this._snapList = e, this.debugIndicatorLines = i;
  }, _handleSnapLayerRemoval({ layer: e }) {
    if (!e._leaflet_id) return;
    let i = this._snapList.findIndex((r) => r._leaflet_id === e._leaflet_id);
    i > -1 && this._snapList.splice(i, 1);
  }, _calcClosestLayer(e, i) {
    return this._calcClosestLayers(e, i, 1)[0];
  }, _calcClosestLayers(e, i, r = 1) {
    let a = [], o = {};
    i.forEach((f, _) => {
      var C;
      if (f._parentCopy && f._parentCopy === this._layer || ((C = f.getLatLngs) == null ? void 0 : C.call(f).flat(5).length) < 2) return;
      let k = this._calcLayerDistances(e, f);
      if (k.distance = Math.floor(k.distance), this.debugIndicatorLines) {
        if (!this.debugIndicatorLines[_]) {
          let N = L.polyline([], { color: "red", pmIgnore: !0 });
          N._pmTempLayer = !0, this.debugIndicatorLines[_] = N;
        }
        this.debugIndicatorLines[_].setLatLngs([e, k.latlng]);
      }
      r === 1 && (o.distance === void 0 || k.distance - 5 <= o.distance) ? (k.distance + 5 < o.distance && (a = []), o = k, o.layer = f, a.push(o)) : r !== 1 && (o = {}, o = k, o.layer = f, a.push(o));
    }), r !== 1 && (a = a.sort((f, _) => f.distance - _.distance)), r === -1 && (r = a.length);
    let h = this._getClosestLayerByPriority(a, r);
    return L.Util.isArray(h) ? h : [h];
  }, _calcLayerDistances(e, i) {
    let r = this._map, a = i instanceof L.Marker || i instanceof L.CircleMarker, o = i instanceof L.Polygon, h = e;
    if (a) {
      let f = i.getLatLng();
      return { latlng: { ...f }, distance: this._getDistance(r, f, h) };
    }
    return this._calcLatLngDistances(h, i.getLatLngs(), r, o);
  }, _calcLatLngDistances(e, i, r, a = !1) {
    let o, h, f, _ = (k) => {
      k.forEach((C, N) => {
        if (Array.isArray(C)) {
          _(C);
          return;
        }
        if (this.options.snapSegment) {
          let O = C, K;
          a ? K = N + 1 === k.length ? 0 : N + 1 : K = N + 1 === k.length ? void 0 : N + 1;
          let Y = k[K];
          if (Y) {
            let dt = this._getDistanceToSegment(r, e, O, Y);
            (h === void 0 || dt < h) && (h = dt, f = [O, Y]);
          }
        } else {
          let O = this._getDistance(r, e, C);
          (h === void 0 || O < h) && (h = O, o = C);
        }
      });
    };
    return _(i), this.options.snapSegment ? { latlng: { ...this._getClosestPointOnSegment(r, e, f[0], f[1]) }, segment: f, distance: h } : { latlng: o, distance: h };
  }, _getClosestLayerByPriority(e, i = 1) {
    e = e.sort((f, _) => f._leaflet_id - _._leaflet_id);
    let r = ["Marker", "CircleMarker", "Circle", "Line", "Polygon", "Rectangle"], a = this._map.pm.globalOptions.snappingOrder || [], o = 0, h = {};
    return a.concat(r).forEach((f) => {
      h[f] || (o += 1, h[f] = o);
    }), e.sort(_o("instanceofShape", h)), i === 1 ? e[0] || {} : e.slice(0, i);
  }, _checkPrioritiySnapping(e) {
    let i = this._map, r = e.segment[0], a = e.segment[1], o = e.latlng, h = o;
    if (this.options.snapVertex) {
      let f = this._getDistance(i, r, o), _ = this._getDistance(i, a, o), k = f < _ ? r : a, C = f < _ ? f : _;
      if (this.options.snapMiddle) {
        let O = L.PM.Utils.calcMiddleLatLng(i, r, a), K = this._getDistance(i, O, o);
        K < f && K < _ && (k = O, C = K);
      }
      let N = this.options.snapDistance;
      C < N && (h = k);
    }
    return { ...h };
  }, _unsnap() {
    delete this._snapLatLng;
  }, _getClosestPointOnSegment(e, i, r, a) {
    let o = e.getMaxZoom();
    o === 1 / 0 && (o = e.getZoom());
    let h = e.project(i, o), f = e.project(r, o), _ = e.project(a, o), k = L.LineUtil.closestPointOnSegment(h, f, _);
    return e.unproject(k, o);
  }, _getDistanceToSegment(e, i, r, a) {
    let o = e.latLngToContainerPoint(i), h = e.latLngToContainerPoint(r), f = e.latLngToContainerPoint(a);
    return L.LineUtil.pointToSegmentDistance(o, h, f);
  }, _getDistance(e, i, r) {
    return e.latLngToContainerPoint(i).distanceTo(e.latLngToContainerPoint(r));
  } }, ns = Xr, rs = L.Class.extend({ includes: [ns, jn], options: { snappable: !0, snapDistance: 20, snapMiddle: !1, allowSelfIntersection: !0, tooltips: !0, templineStyle: {}, hintlineStyle: { color: "#3388ff", dashArray: "5,5" }, pathOptions: null, cursorMarker: !0, finishOn: null, markerStyle: { draggable: !0, icon: L.icon() }, hideMiddleMarkers: !1, minRadiusCircle: null, maxRadiusCircle: null, minRadiusCircleMarker: null, maxRadiusCircleMarker: null, resizeableCircleMarker: !1, resizeableCircle: !0, markerEditable: !0, continueDrawing: !1, snapSegment: !0, requireSnapToFinish: !1, rectangleAngle: 0, textOptions: { text: null, focusAfterDraw: null, removeIfEmpty: null, className: null }, snapVertex: !0 }, setOptions(e) {
    L.Util.setOptions(this, e), this.setStyle(this.options);
  }, setStyle() {
  }, getOptions() {
    return this.options;
  }, initialize(e) {
    let i = new L.Icon.Default();
    i.options.tooltipAnchor = [0, 0], this.options.markerStyle.icon = i, this._map = e, this.shapes = ["Marker", "CircleMarker", "Line", "Polygon", "Rectangle", "Circle", "Cut", "Text"], this.shapes.forEach((r) => {
      this[r] = new L.PM.Draw[r](this._map);
    }), this.Marker.setOptions({ continueDrawing: !0 }), this.CircleMarker.setOptions({ continueDrawing: !0 });
  }, setPathOptions(e, i = !1) {
    i ? this.options.pathOptions = (0, is.default)(this.options.pathOptions, e) : this.options.pathOptions = e;
  }, getShapes() {
    return this.shapes;
  }, getShape() {
    return this._shape;
  }, enable(e, i) {
    if (!e) throw new Error(`Error: Please pass a shape as a parameter. Possible shapes are: ${this.getShapes().join(",")}`);
    this.disable(), this[e].enable(i);
  }, disable() {
    this.shapes.forEach((e) => {
      this[e].disable();
    });
  }, addControls() {
    this.shapes.forEach((e) => {
      this[e].addButton();
    });
  }, getActiveShape() {
    let e;
    return this.shapes.forEach((i) => {
      this[i]._enabled && (e = i);
    }), e;
  }, _setGlobalDrawMode() {
    this._shape === "Cut" ? this._fireGlobalCutModeToggled() : this._fireGlobalDrawModeToggled();
    let e = [];
    this._map.eachLayer((i) => {
      (i instanceof L.Polyline || i instanceof L.Marker || i instanceof L.Circle || i instanceof L.CircleMarker || i instanceof L.ImageOverlay) && (i._pmTempLayer || e.push(i));
    }), this._enabled ? e.forEach((i) => {
      L.PM.Utils.disablePopup(i);
    }) : e.forEach((i) => {
      L.PM.Utils.enablePopup(i);
    });
  }, createNewDrawInstance(e, i) {
    let r = this._getShapeFromBtnName(i);
    if (this[e]) throw new TypeError("Draw Type already exists");
    if (!L.PM.Draw[r]) throw new TypeError(`There is no class L.PM.Draw.${r}`);
    return this[e] = new L.PM.Draw[r](this._map), this[e].toolbarButtonName = e, this[e]._shape = e, this.shapes.push(e), this[i] && this[e].setOptions(this[i].options), this[e].setOptions(this[e].options), this[e];
  }, _getShapeFromBtnName(e) {
    let i = { drawMarker: "Marker", drawCircle: "Circle", drawPolygon: "Polygon", drawPolyline: "Line", drawRectangle: "Rectangle", drawCircleMarker: "CircleMarker", editMode: "Edit", dragMode: "Drag", cutPolygon: "Cut", removalMode: "Removal", rotateMode: "Rotate", drawText: "Text" };
    return i[e] ? i[e] : this[e] ? this[e]._shape : e;
  }, _finishLayer(e) {
    e.pm && (e.pm.setOptions(this.options), e.pm._shape = this._shape, e.pm._map = this._map), this._addDrawnLayerProp(e);
  }, _addDrawnLayerProp(e) {
    e._drawnByGeoman = !0;
  }, _setPane(e, i) {
    i === "layerPane" ? e.options.pane = this._map.pm.globalOptions.panes && this._map.pm.globalOptions.panes.layerPane || "overlayPane" : i === "vertexPane" ? e.options.pane = this._map.pm.globalOptions.panes && this._map.pm.globalOptions.panes.vertexPane || "markerPane" : i === "markerPane" && (e.options.pane = this._map.pm.globalOptions.panes && this._map.pm.globalOptions.panes.markerPane || "markerPane");
  }, _isFirstLayer() {
    return (this._map || this._layer._map).pm.getGeomanLayers().length === 0;
  } }), De = rs;
  De.Marker = De.extend({ initialize(e) {
    this._map = e, this._shape = "Marker", this.toolbarButtonName = "drawMarker", this._layerIsDragging = !1;
  }, enable(e) {
    L.Util.setOptions(this, e), this._enabled = !0, this._isTouchDevice = !Xa(), this._map.getContainer().classList.add("geoman-draw-cursor"), this._map.on("click", this._createMarker, this), this._map.pm.Toolbar.toggleButton(this.toolbarButtonName, !0), this._isTouchDevice ? (this._createTouchHint(), this._hintMarker = L.marker(this._map.getCenter(), { ...this.options.markerStyle, opacity: 0, interactive: !1 }), this._setPane(this._hintMarker, "markerPane"), this._hintMarker._pmTempLayer = !0) : (this._hintMarker = L.marker(this._map.getCenter(), this.options.markerStyle), this._setPane(this._hintMarker, "markerPane"), this._hintMarker._pmTempLayer = !0, this._hintMarker.addTo(this._map), this.options.tooltips && this._hintMarker.bindTooltip(ce("tooltips.placeMarker"), { permanent: !0, offset: L.point(0, 10), direction: "bottom", opacity: 0.8 }).openTooltip(), this._map.on("mousemove", this._syncHintMarker, this)), this._layer = this._hintMarker, this.options.markerEditable && this._map.eachLayer((i) => {
      this.isRelevantMarker(i) && i.pm.enable();
    }), this._fireDrawStart(), this._setGlobalDrawMode();
  }, disable() {
    this._enabled && (this._enabled = !1, this._map.getContainer().classList.remove("geoman-draw-cursor"), this._map.off("click", this._createMarker, this), this._isTouchDevice ? (this._removeTouchHint(), this._hintMarker = null) : (this._hintMarker.remove(), this._map.off("mousemove", this._syncHintMarker, this)), this._map.eachLayer((e) => {
      this.isRelevantMarker(e) && e.pm.disable();
    }), this._map.pm.Toolbar.toggleButton(this.toolbarButtonName, !1), this.options.snappable && this._cleanupSnapping(), this._fireDrawEnd(), this._setGlobalDrawMode());
  }, enabled() {
    return this._enabled;
  }, toggle(e) {
    this.enabled() ? this.disable() : this.enable(e);
  }, isRelevantMarker(e) {
    return e instanceof L.Marker && e.pm && !e._pmTempLayer && !e.pm._initTextMarker;
  }, _syncHintMarker(e) {
    if (this._hintMarker.setLatLng(e.latlng), this.options.snappable) {
      let i = e;
      i.target = this._hintMarker, this._handleSnapping(i);
    }
    this._fireChange(this._hintMarker.getLatLng(), "Draw");
  }, _createMarker(e) {
    if (!e.latlng || this._layerIsDragging || this.options.requireSnapToFinish && !this._hintMarker._snapped && !this._isFirstLayer()) return;
    this._hintMarker._snapped || this._hintMarker.setLatLng(e.latlng);
    let i = this._hintMarker.getLatLng(), r = new L.Marker(i, this.options.markerStyle);
    this._setPane(r, "markerPane"), this._finishLayer(r), r.pm || (r.options.draggable = !1), r.addTo(this._map.pm._getContainingLayer()), r.pm && this.options.markerEditable ? r.pm.enable() : r.dragging && r.dragging.disable(), this._fireCreate(r), this._cleanupSnapping(), this.options.continueDrawing || this.disable();
  }, setStyle() {
    var e, i;
    (e = this.options.markerStyle) != null && e.icon && ((i = this._hintMarker) == null || i.setIcon(this.options.markerStyle.icon));
  }, _createTouchHint() {
    this.options.tooltips && (this._touchHint = L.DomUtil.create("div", "leaflet-pm-touch-hint"), this._touchHint.textContent = ce("tooltips.placeMarkerTouch"), this._map.getContainer().appendChild(this._touchHint));
  }, _removeTouchHint() {
    this._touchHint && this._touchHint.parentNode && (this._touchHint.parentNode.removeChild(this._touchHint), this._touchHint = null);
  } });
  var ei = 63710088e-1, bo = { centimeters: ei * 100, centimetres: ei * 100, degrees: 360 / (2 * Math.PI), feet: ei * 3.28084, inches: ei * 39.37, kilometers: ei / 1e3, kilometres: ei / 1e3, meters: ei, metres: ei, miles: ei / 1609.344, millimeters: ei * 1e3, millimetres: ei * 1e3, nauticalmiles: ei / 1852, radians: 1, yards: ei * 1.0936 };
  function vi(e, i, r = {}) {
    let a = { type: "Feature" };
    return (r.id === 0 || r.id) && (a.id = r.id), r.bbox && (a.bbox = r.bbox), a.properties = i || {}, a.geometry = e, a;
  }
  function wn(e, i, r = {}) {
    if (!e) throw new Error("coordinates is required");
    if (!Array.isArray(e)) throw new Error("coordinates must be an Array");
    if (e.length < 2) throw new Error("coordinates must be at least 2 numbers long");
    if (!kn(e[0]) || !kn(e[1])) throw new Error("coordinates must contain numbers");
    return vi({ type: "Point", coordinates: e }, i, r);
  }
  function Vn(e, i, r = {}) {
    if (e.length < 2) throw new Error("coordinates must be an array of two or more positions");
    return vi({ type: "LineString", coordinates: e }, i, r);
  }
  function ai(e, i = {}) {
    let r = { type: "FeatureCollection" };
    return i.id && (r.id = i.id), i.bbox && (r.bbox = i.bbox), r.features = e, r;
  }
  function ur(e, i = "kilometers") {
    let r = bo[i];
    if (!r) throw new Error(i + " units is invalid");
    return e * r;
  }
  function Gi(e) {
    return e % (2 * Math.PI) * 180 / Math.PI;
  }
  function Ln(e) {
    return e % 360 * Math.PI / 180;
  }
  function kn(e) {
    return !isNaN(e) && e !== null && !Array.isArray(e);
  }
  function si(e) {
    return e !== null && typeof e == "object" && !Array.isArray(e);
  }
  function as(e) {
    let i, r, a = { type: "FeatureCollection", features: [] };
    if (e.type === "Feature" ? r = e.geometry : r = e, r.type === "LineString") i = [r.coordinates];
    else if (r.type === "MultiLineString") i = r.coordinates;
    else if (r.type === "MultiPolygon") i = [].concat(...r.coordinates);
    else if (r.type === "Polygon") i = r.coordinates;
    else throw new Error("Input must be a LineString, MultiLineString, Polygon, or MultiPolygon Feature or Geometry");
    return i.forEach((o) => {
      i.forEach((h) => {
        for (let f = 0; f < o.length - 1; f++) for (let _ = f; _ < h.length - 1; _++) {
          if (o === h && (Math.abs(f - _) === 1 || f === 0 && _ === o.length - 2 && o[f][0] === o[o.length - 1][0] && o[f][1] === o[o.length - 1][1])) continue;
          let k = ss(o[f][0], o[f][1], o[f + 1][0], o[f + 1][1], h[_][0], h[_][1], h[_ + 1][0], h[_ + 1][1]);
          k && a.features.push(wn([k[0], k[1]]));
        }
      });
    }), a;
  }
  function ss(e, i, r, a, o, h, f, _) {
    let k, C, N, O, K, Y = { x: null, y: null, onLine1: !1, onLine2: !1 };
    return k = (_ - h) * (r - e) - (f - o) * (a - i), k === 0 ? Y.x !== null && Y.y !== null ? Y : !1 : (C = i - h, N = e - o, O = (f - o) * C - (_ - h) * N, K = (r - e) * C - (a - i) * N, C = O / k, N = K / k, Y.x = e + C * (r - e), Y.y = i + C * (a - i), C >= 0 && C <= 1 && (Y.onLine1 = !0), N >= 0 && N <= 1 && (Y.onLine2 = !0), Y.onLine1 && Y.onLine2 ? [Y.x, Y.y] : !1);
  }
  var hr = as;
  De.Line = De.extend({ initialize(e) {
    this._map = e, this._shape = "Line", this.toolbarButtonName = "drawPolyline", this._doesSelfIntersect = !1;
  }, enable(e) {
    L.Util.setOptions(this, e), this._enabled = !0, this._markers = [], this._layerGroup = new L.FeatureGroup(), this._layerGroup._pmTempLayer = !0, this._layerGroup.addTo(this._map), this._layer = L.polyline([], { ...this.options.templineStyle, pmIgnore: !1 }), this._setPane(this._layer, "layerPane"), this._layer._pmTempLayer = !0, this._layerGroup.addLayer(this._layer), this._hintline = L.polyline([], this.options.hintlineStyle), this._setPane(this._hintline, "layerPane"), this._hintline._pmTempLayer = !0, this._layerGroup.addLayer(this._hintline), this._hintMarker = L.marker(this._map.getCenter(), { interactive: !1, zIndexOffset: 100, icon: L.divIcon({ className: "marker-icon cursor-marker" }) }), this._setPane(this._hintMarker, "vertexPane"), this._hintMarker._pmTempLayer = !0, this._layerGroup.addLayer(this._hintMarker), this.options.cursorMarker && L.DomUtil.addClass(this._hintMarker._icon, "visible"), this.options.tooltips && this._hintMarker.bindTooltip(ce("tooltips.firstVertex"), { permanent: !0, offset: L.point(0, 10), direction: "bottom", opacity: 0.8 }).openTooltip(), this._map.getContainer().classList.add("geoman-draw-cursor"), this._map.on("click", this._createVertex, this), this.options.finishOn && this.options.finishOn !== "snap" && this._map.on(this.options.finishOn, this._finishShape, this), this.options.finishOn === "dblclick" && (this.tempMapDoubleClickZoomState = this._map.doubleClickZoom._enabled, this.tempMapDoubleClickZoomState && this._map.doubleClickZoom.disable()), this._map.on("mousemove", this._syncHintMarker, this), this._hintMarker.on("move", this._syncHintLine, this), this._map.pm.Toolbar.toggleButton(this.toolbarButtonName, !0), this._otherSnapLayers = [], this.isRed = !1, this._fireDrawStart(), this._setGlobalDrawMode();
  }, disable() {
    this._enabled && (this._enabled = !1, this._map.getContainer().classList.remove("geoman-draw-cursor"), this._map.off("click", this._createVertex, this), this._map.off("mousemove", this._syncHintMarker, this), this.options.finishOn && this.options.finishOn !== "snap" && this._map.off(this.options.finishOn, this._finishShape, this), this.tempMapDoubleClickZoomState && this._map.doubleClickZoom.enable(), this._map.removeLayer(this._layerGroup), this._map.pm.Toolbar.toggleButton(this.toolbarButtonName, !1), this.options.snappable && this._cleanupSnapping(), this._fireDrawEnd(), this._setGlobalDrawMode());
  }, enabled() {
    return this._enabled;
  }, toggle(e) {
    this.enabled() ? this.disable() : this.enable(e);
  }, _syncHintLine() {
    let e = this._layer.getLatLngs();
    if (e.length > 0) {
      let i = e[e.length - 1];
      this._hintline.setLatLngs([i, this._hintMarker.getLatLng()]);
    }
  }, _syncHintMarker(e) {
    if (this._hintMarker.setLatLng(e.latlng), this.options.snappable) {
      let r = e;
      r.target = this._hintMarker, this._handleSnapping(r);
    } else if (this._otherSnapLayers && this._otherSnapLayers.length > 0) {
      let r = e;
      r.target = this._hintMarker, this._handleSnapping(r, !0);
    }
    this.options.allowSelfIntersection || this._handleSelfIntersection(!0, this._hintMarker.getLatLng());
    let i = this._layer._defaultShape().slice();
    i.push(this._hintMarker.getLatLng()), this._change(i);
  }, hasSelfIntersection() {
    return hr(this._layer.toGeoJSON(15)).features.length > 0;
  }, _handleSelfIntersection(e, i) {
    let r = L.polyline(this._layer.getLatLngs());
    e && (i || (i = this._hintMarker.getLatLng()), r.addLatLng(i));
    let a = hr(r.toGeoJSON(15));
    this._doesSelfIntersect = a.features.length > 0, this._doesSelfIntersect ? this.isRed || (this.isRed = !0, this._hintline.setStyle({ color: "#f00000ff" }), this._fireIntersect(a, this._map, "Draw")) : this._hintline.isEmpty() || (this.isRed = !1, this._hintline.setStyle(this.options.hintlineStyle));
  }, _createVertex(e) {
    if (!this.options.allowSelfIntersection && (this._handleSelfIntersection(!0, e.latlng), this._doesSelfIntersect)) return;
    this._hintMarker._snapped || this._hintMarker.setLatLng(e.latlng);
    let i = this._hintMarker.getLatLng(), r = this._layer.getLatLngs(), a = r[r.length - 1];
    if (i.equals(r[0]) || r.length > 0 && i.equals(a)) {
      this._finishShape();
      return;
    }
    this._layer._latlngInfo = this._layer._latlngInfo || [], this._layer._latlngInfo.push({ latlng: i, snapInfo: this._hintMarker._snapInfo }), this._layer.addLatLng(i);
    let o = this._createMarker(i);
    this._setTooltipText(), this._setHintLineAfterNewVertex(i), this._fireVertexAdded(o, void 0, i, "Draw"), this._change(this._layer.getLatLngs()), this.options.finishOn === "snap" && this._hintMarker._snapped && this._finishShape(e);
  }, _setHintLineAfterNewVertex(e) {
    this._hintline.setLatLngs([e, e]);
  }, _removeLastVertex() {
    let e = this._markers;
    if (e.length <= 1) {
      this.disable();
      return;
    }
    let i = this._layer.getLatLngs(), r = e[e.length - 1], { indexPath: a } = L.PM.Utils.findDeepMarkerIndex(e, r);
    e.pop(), this._layerGroup.removeLayer(r);
    let o = e[e.length - 1], h = i.indexOf(o.getLatLng());
    i = i.slice(0, h + 1), this._layer.setLatLngs(i), this._layer._latlngInfo.pop(), this._syncHintLine(), this._setTooltipText(), this._fireVertexRemoved(r, a, "Draw"), this._change(this._layer.getLatLngs());
  }, _finishShape() {
    if (!this.options.allowSelfIntersection && (this._handleSelfIntersection(!1), this._doesSelfIntersect) || this.options.requireSnapToFinish && !this._hintMarker._snapped && !this._isFirstLayer()) return;
    let e = this._layer.getLatLngs();
    if (e.length <= 1) return;
    let i = L.polyline(e, this.options.pathOptions);
    this._setPane(i, "layerPane"), this._finishLayer(i), i.addTo(this._map.pm._getContainingLayer()), this._fireCreate(i), this.options.snappable && this._cleanupSnapping();
    let r = this._hintMarker.getLatLng();
    this.disable(), this.options.continueDrawing && (this.enable(), this._hintMarker.setLatLng(r));
  }, _createMarker(e) {
    let i = new L.Marker(e, { draggable: !1, icon: L.divIcon({ className: "marker-icon" }) });
    return this._setPane(i, "vertexPane"), i._pmTempLayer = !0, this._layerGroup.addLayer(i), this._markers.push(i), i.on("click", this._finishShape, this), i;
  }, _setTooltipText() {
    let { length: e } = this._layer.getLatLngs().flat(), i = "";
    e <= 1 ? i = ce("tooltips.continueLine") : i = ce("tooltips.finishLine"), this._hintMarker.setTooltipContent(i);
  }, _change(e) {
    this._fireChange(e, "Draw");
  }, setStyle() {
    var e, i;
    (e = this._layer) == null || e.setStyle(this.options.templineStyle), (i = this._hintline) == null || i.setStyle(this.options.hintlineStyle);
  } }), De.Polygon = De.Line.extend({ initialize(e) {
    this._map = e, this._shape = "Polygon", this.toolbarButtonName = "drawPolygon";
  }, enable(e) {
    L.PM.Draw.Line.prototype.enable.call(this, e), this._layer.pm._shape = "Polygon";
  }, _createMarker(e) {
    let i = new L.Marker(e, { draggable: !1, icon: L.divIcon({ className: "marker-icon" }) });
    return this._setPane(i, "vertexPane"), i._pmTempLayer = !0, this._layerGroup.addLayer(i), this._markers.push(i), this._layer.getLatLngs().flat().length === 1 ? (i.on("click", this._finishShape, this), this._tempSnapLayerIndex = this._otherSnapLayers.push(i) - 1, this.options.snappable && this._cleanupSnapping()) : i.on("click", () => 1), i;
  }, _setTooltipText() {
    let { length: e } = this._layer.getLatLngs().flat(), i = "";
    e <= 2 ? i = ce("tooltips.continueLine") : i = ce("tooltips.finishPoly"), this._hintMarker.setTooltipContent(i);
  }, _finishShape() {
    if (!this.options.allowSelfIntersection && (this._handleSelfIntersection(!0, this._layer.getLatLngs()[0]), this._doesSelfIntersect) || this.options.requireSnapToFinish && !this._hintMarker._snapped && !this._isFirstLayer()) return;
    let e = this._layer.getLatLngs();
    if (e.length <= 2) return;
    let i = L.polygon(e, this.options.pathOptions);
    this._setPane(i, "layerPane"), this._finishLayer(i), i.addTo(this._map.pm._getContainingLayer()), this._fireCreate(i), this._cleanupSnapping(), this._otherSnapLayers.splice(this._tempSnapLayerIndex, 1), delete this._tempSnapLayerIndex;
    let r = this._hintMarker.getLatLng();
    this.disable(), this.options.continueDrawing && (this.enable(), this._hintMarker.setLatLng(r));
  } }), De.Rectangle = De.extend({ initialize(e) {
    this._map = e, this._shape = "Rectangle", this.toolbarButtonName = "drawRectangle";
  }, enable(e) {
    if (L.Util.setOptions(this, e), this._enabled = !0, this._layerGroup = new L.FeatureGroup(), this._layerGroup._pmTempLayer = !0, this._layerGroup.addTo(this._map), this._layer = L.rectangle([[0, 0], [0, 0]], this.options.pathOptions), this._setPane(this._layer, "layerPane"), this._layer._pmTempLayer = !0, this._startMarker = L.marker(this._map.getCenter(), { icon: L.divIcon({ className: "marker-icon rect-start-marker" }), draggable: !1, zIndexOffset: -100, opacity: this.options.cursorMarker ? 1 : 0 }), this._setPane(this._startMarker, "vertexPane"), this._startMarker._pmTempLayer = !0, this._layerGroup.addLayer(this._startMarker), this._hintMarker = L.marker(this._map.getCenter(), { zIndexOffset: 150, icon: L.divIcon({ className: "marker-icon cursor-marker" }) }), this._setPane(this._hintMarker, "vertexPane"), this._hintMarker._pmTempLayer = !0, this._layerGroup.addLayer(this._hintMarker), this.options.cursorMarker && L.DomUtil.addClass(this._hintMarker._icon, "visible"), this.options.tooltips && this._hintMarker.bindTooltip(ce("tooltips.firstVertex"), { permanent: !0, offset: L.point(0, 10), direction: "bottom", opacity: 0.8 }).openTooltip(), this.options.cursorMarker) {
      this._styleMarkers = [];
      for (let i = 0; i < 2; i += 1) {
        let r = L.marker(this._map.getCenter(), { icon: L.divIcon({ className: "marker-icon rect-style-marker" }), draggable: !1, zIndexOffset: 100 });
        this._setPane(r, "vertexPane"), r._pmTempLayer = !0, this._layerGroup.addLayer(r), this._styleMarkers.push(r);
      }
    }
    this._map.getContainer().classList.add("geoman-draw-cursor"), this._map.on("click", this._placeStartingMarkers, this), this._map.on("mousemove", this._syncHintMarker, this), this._map.pm.Toolbar.toggleButton(this.toolbarButtonName, !0), this._otherSnapLayers = [], this._fireDrawStart(), this._setGlobalDrawMode();
  }, disable() {
    this._enabled && (this._enabled = !1, this._map.getContainer().classList.remove("geoman-draw-cursor"), this._map.off("click", this._finishShape, this), this._map.off("click", this._placeStartingMarkers, this), this._map.off("mousemove", this._syncHintMarker, this), this._map.removeLayer(this._layerGroup), this._map.pm.Toolbar.toggleButton(this.toolbarButtonName, !1), this.options.snappable && this._cleanupSnapping(), this._fireDrawEnd(), this._setGlobalDrawMode());
  }, enabled() {
    return this._enabled;
  }, toggle(e) {
    this.enabled() ? this.disable() : this.enable(e);
  }, _placeStartingMarkers(e) {
    this._hintMarker._snapped || this._hintMarker.setLatLng(e.latlng);
    let i = this._hintMarker.getLatLng();
    L.DomUtil.addClass(this._startMarker._icon, "visible"), this._startMarker.setLatLng(i), this.options.cursorMarker && this._styleMarkers && this._styleMarkers.forEach((r) => {
      L.DomUtil.addClass(r._icon, "visible"), r.setLatLng(i);
    }), this._map.off("click", this._placeStartingMarkers, this), this._map.on("click", this._finishShape, this), this._hintMarker.setTooltipContent(ce("tooltips.finishRect")), this._setRectangleOrigin();
  }, _setRectangleOrigin() {
    let e = this._startMarker.getLatLng();
    e && (this._layerGroup.addLayer(this._layer), this._layer.setLatLngs([e, e]), this._hintMarker.on("move", this._syncRectangleSize, this));
  }, _syncHintMarker(e) {
    if (this._hintMarker.setLatLng(e.latlng), this.options.snappable) {
      let r = e;
      r.target = this._hintMarker, this._handleSnapping(r);
    }
    let i = this._layerGroup && this._layerGroup.hasLayer(this._layer) ? this._layer.getLatLngs() : [this._hintMarker.getLatLng()];
    this._fireChange(i, "Draw");
  }, _syncRectangleSize() {
    let e = Qa(this._startMarker.getLatLng(), this._map), i = Qa(this._hintMarker.getLatLng(), this._map), r = L.PM.Utils._getRotatedRectangle(e, i, this.options.rectangleAngle || 0, this._map);
    if (this._layer.setLatLngs(r), this.options.cursorMarker && this._styleMarkers) {
      let a = [];
      r.forEach((o) => {
        !o.equals(e, 1e-8) && !o.equals(i, 1e-8) && a.push(o);
      }), a.forEach((o, h) => {
        try {
          this._styleMarkers[h].setLatLng(o);
        } catch {
        }
      });
    }
  }, _findCorners() {
    let e = this._layer.getLatLngs()[0];
    return L.PM.Utils._getRotatedRectangle(e[0], e[2], this.options.rectangleAngle || 0, this._map);
  }, _finishShape(e) {
    e != null && e.latlng && !this._hintMarker._snapped && this._hintMarker.setLatLng(e.latlng);
    let i = this._hintMarker.getLatLng(), r = this._startMarker.getLatLng();
    if (this.options.requireSnapToFinish && !this._hintMarker._snapped && !this._isFirstLayer() || r.equals(i)) return;
    let a = L.rectangle([r, i], this.options.pathOptions);
    if (this.options.rectangleAngle) {
      let h = L.PM.Utils._getRotatedRectangle(r, i, this.options.rectangleAngle || 0, this._map);
      a.setLatLngs(h), a.pm && a.pm._setAngle(this.options.rectangleAngle || 0);
    }
    this._setPane(a, "layerPane"), this._finishLayer(a), a.addTo(this._map.pm._getContainingLayer()), this._fireCreate(a);
    let o = this._hintMarker.getLatLng();
    this.disable(), this.options.continueDrawing && (this.enable(), this._hintMarker.setLatLng(o));
  }, setStyle() {
    var e;
    (e = this._layer) == null || e.setStyle(this.options.pathOptions);
  } }), De.CircleMarker = De.extend({ initialize(e) {
    this._map = e, this._shape = "CircleMarker", this.toolbarButtonName = "drawCircleMarker", this._layerIsDragging = !1, this._BaseCircleClass = L.CircleMarker, this._minRadiusOption = "minRadiusCircleMarker", this._maxRadiusOption = "maxRadiusCircleMarker", this._editableOption = "resizeableCircleMarker", this._defaultRadius = 10;
  }, enable(e) {
    if (L.Util.setOptions(this, e), this.options.editable && (this.options.resizeableCircleMarker = this.options.editable, delete this.options.editable), this._enabled = !0, this._map.pm.Toolbar.toggleButton(this.toolbarButtonName, !0), this._map.getContainer().classList.add("geoman-draw-cursor"), this.options[this._editableOption]) {
      let i = {};
      L.extend(i, this.options.templineStyle), i.radius = 0, this._layerGroup = new L.FeatureGroup(), this._layerGroup._pmTempLayer = !0, this._layerGroup.addTo(this._map), this._layer = new this._BaseCircleClass(this._map.getCenter(), i), this._setPane(this._layer, "layerPane"), this._layer._pmTempLayer = !0, this._centerMarker = L.marker(this._map.getCenter(), { icon: L.divIcon({ className: "marker-icon" }), draggable: !1, zIndexOffset: 100 }), this._setPane(this._centerMarker, "vertexPane"), this._centerMarker._pmTempLayer = !0, this._hintMarker = L.marker(this._map.getCenter(), { zIndexOffset: 110, icon: L.divIcon({ className: "marker-icon cursor-marker" }) }), this._setPane(this._hintMarker, "vertexPane"), this._hintMarker._pmTempLayer = !0, this._layerGroup.addLayer(this._hintMarker), this.options.cursorMarker && L.DomUtil.addClass(this._hintMarker._icon, "visible"), this.options.tooltips && this._hintMarker.bindTooltip(ce("tooltips.startCircle"), { permanent: !0, offset: L.point(0, 10), direction: "bottom", opacity: 0.8 }).openTooltip(), this._hintline = L.polyline([], this.options.hintlineStyle), this._setPane(this._hintline, "layerPane"), this._hintline._pmTempLayer = !0, this._layerGroup.addLayer(this._hintline), this._map.on("click", this._placeCenterMarker, this);
    } else this._map.on("click", this._createMarker, this), this._hintMarker = new this._BaseCircleClass(this._map.getCenter(), { radius: this._defaultRadius, ...this.options.templineStyle }), this._setPane(this._hintMarker, "layerPane"), this._hintMarker._pmTempLayer = !0, this._hintMarker.addTo(this._map), this._layer = this._hintMarker, this.options.tooltips && this._hintMarker.bindTooltip(ce("tooltips.placeCircleMarker"), { permanent: !0, offset: L.point(0, 10), direction: "bottom", opacity: 0.8 }).openTooltip();
    this._map.on("mousemove", this._syncHintMarker, this), this._extendingEnable(), this._otherSnapLayers = [], this._fireDrawStart(), this._setGlobalDrawMode();
  }, _extendingEnable() {
    !this.options[this._editableOption] && this.options.markerEditable && this._map.eachLayer((e) => {
      this.isRelevantMarker(e) && e.pm.enable();
    }), this._layer.bringToBack();
  }, disable() {
    this._enabled && (this._enabled = !1, this._map.getContainer().classList.remove("geoman-draw-cursor"), this.options[this._editableOption] ? (this._map.off("click", this._finishShape, this), this._map.off("click", this._placeCenterMarker, this), this._map.removeLayer(this._layerGroup)) : (this._map.off("click", this._createMarker, this), this._extendingDisable(), this._hintMarker.remove()), this._map.off("mousemove", this._syncHintMarker, this), this._map.pm.Toolbar.toggleButton(this.toolbarButtonName, !1), this.options.snappable && this._cleanupSnapping(), this._fireDrawEnd(), this._setGlobalDrawMode());
  }, _extendingDisable() {
    this._map.eachLayer((e) => {
      this.isRelevantMarker(e) && e.pm.disable();
    });
  }, enabled() {
    return this._enabled;
  }, toggle(e) {
    this.enabled() ? this.disable() : this.enable(e);
  }, _placeCenterMarker(e) {
    this._hintMarker._snapped || this._hintMarker.setLatLng(e.latlng), this._layerGroup.addLayer(this._layer), this._layerGroup.addLayer(this._centerMarker);
    let i = this._hintMarker.getLatLng();
    this._centerMarker.setLatLng(i), this._map.off("click", this._placeCenterMarker, this), this._map.on("click", this._finishShape, this), this._placeCircleCenter();
  }, _placeCircleCenter() {
    let e = this._centerMarker.getLatLng();
    e && (this._layer.setLatLng(e), this._hintMarker.on("move", this._syncHintLine, this), this._hintMarker.on("move", this._syncCircleRadius, this), this._hintMarker.setTooltipContent(ce("tooltips.finishCircle")), this._fireCenterPlaced(), this._fireChange(this._layer.getLatLng(), "Draw"));
  }, _syncHintLine() {
    let e = this._centerMarker.getLatLng(), i = this._getNewDestinationOfHintMarker();
    this._hintline.setLatLngs([e, i]);
  }, _syncCircleRadius() {
    let e = this._centerMarker.getLatLng(), i = this._hintMarker.getLatLng(), r = this._distanceCalculation(e, i);
    this.options[this._minRadiusOption] && r < this.options[this._minRadiusOption] ? this._layer.setRadius(this.options[this._minRadiusOption]) : this.options[this._maxRadiusOption] && r > this.options[this._maxRadiusOption] ? this._layer.setRadius(this.options[this._maxRadiusOption]) : this._layer.setRadius(r);
  }, _syncHintMarker(e) {
    if (this._hintMarker.setLatLng(e.latlng), this._hintMarker.setLatLng(this._getNewDestinationOfHintMarker()), this.options.snappable) {
      let r = e;
      r.target = this._hintMarker, this._handleSnapping(r);
    }
    this._handleHintMarkerSnapping();
    let i = this._layerGroup && this._layerGroup.hasLayer(this._centerMarker) ? this._centerMarker.getLatLng() : this._hintMarker.getLatLng();
    this._fireChange(i, "Draw");
  }, isRelevantMarker(e) {
    return e instanceof L.CircleMarker && !(e instanceof L.Circle) && e.pm && !e._pmTempLayer;
  }, _createMarker(e) {
    if (this.options.requireSnapToFinish && !this._hintMarker._snapped && !this._isFirstLayer() || !e.latlng || this._layerIsDragging) return;
    this._hintMarker._snapped || this._hintMarker.setLatLng(e.latlng);
    let i = this._hintMarker.getLatLng(), r = new this._BaseCircleClass(i, { radius: this._defaultRadius, ...this.options.pathOptions });
    this._setPane(r, "layerPane"), this._finishLayer(r), r.addTo(this._map.pm._getContainingLayer()), this._extendingCreateMarker(r), this._fireCreate(r), this._cleanupSnapping(), this.options.continueDrawing || this.disable();
  }, _extendingCreateMarker(e) {
    e.pm && this.options.markerEditable && e.pm.enable();
  }, _finishShape(e) {
    if (this.options.requireSnapToFinish && !this._hintMarker._snapped && !this._isFirstLayer()) return;
    e != null && e.latlng && !this._hintMarker._snapped && this._hintMarker.setLatLng(e.latlng);
    let i = this._centerMarker.getLatLng(), r = this._defaultRadius;
    if (this.options[this._editableOption]) {
      let f = this._hintMarker.getLatLng();
      r = this._distanceCalculation(i, f), this.options[this._minRadiusOption] && r < this.options[this._minRadiusOption] ? r = this.options[this._minRadiusOption] : this.options[this._maxRadiusOption] && r > this.options[this._maxRadiusOption] && (r = this.options[this._maxRadiusOption]);
    }
    let a = { ...this.options.pathOptions, radius: r }, o = new this._BaseCircleClass(i, a);
    this._setPane(o, "layerPane"), this._finishLayer(o), o.addTo(this._map.pm._getContainingLayer()), o.pm && o.pm._updateHiddenPolyCircle(), this._fireCreate(o);
    let h = this._hintMarker.getLatLng();
    this.disable(), this.options.continueDrawing && (this.enable(), this._hintMarker.setLatLng(h));
  }, _getNewDestinationOfHintMarker() {
    let e = this._hintMarker.getLatLng();
    if (this.options[this._editableOption]) {
      if (!this._layerGroup.hasLayer(this._centerMarker)) return e;
      let i = this._centerMarker.getLatLng(), r = this._distanceCalculation(i, e);
      this.options[this._minRadiusOption] && r < this.options[this._minRadiusOption] ? e = bn(this._map, i, e, this._getMinDistanceInMeter()) : this.options[this._maxRadiusOption] && r > this.options[this._maxRadiusOption] && (e = bn(this._map, i, e, this._getMaxDistanceInMeter()));
    }
    return e;
  }, _getMinDistanceInMeter() {
    return L.PM.Utils.pxRadiusToMeterRadius(this.options[this._minRadiusOption], this._map, this._centerMarker.getLatLng());
  }, _getMaxDistanceInMeter() {
    return L.PM.Utils.pxRadiusToMeterRadius(this.options[this._maxRadiusOption], this._map, this._centerMarker.getLatLng());
  }, _handleHintMarkerSnapping() {
    if (this.options[this._editableOption]) {
      if (this._hintMarker._snapped) {
        let e = this._centerMarker.getLatLng(), i = this._hintMarker.getLatLng(), r = this._distanceCalculation(e, i);
        this._layerGroup.hasLayer(this._centerMarker) && (this.options[this._minRadiusOption] && r < this.options[this._minRadiusOption] ? this._hintMarker.setLatLng(this._hintMarker._orgLatLng) : this.options[this._maxRadiusOption] && r > this.options[this._maxRadiusOption] && this._hintMarker.setLatLng(this._hintMarker._orgLatLng));
      }
      this._hintMarker.setLatLng(this._getNewDestinationOfHintMarker());
    }
  }, setStyle() {
    var i, r;
    let e = {};
    L.extend(e, this.options.templineStyle), this.options[this._editableOption] && (e.radius = 0), (i = this._layer) == null || i.setStyle(e), (r = this._hintline) == null || r.setStyle(this.options.hintlineStyle);
  }, _distanceCalculation(e, i) {
    return this._map.project(e).distanceTo(this._map.project(i));
  } }), De.Circle = De.CircleMarker.extend({ initialize(e) {
    this._map = e, this._shape = "Circle", this.toolbarButtonName = "drawCircle", this._BaseCircleClass = L.Circle, this._minRadiusOption = "minRadiusCircle", this._maxRadiusOption = "maxRadiusCircle", this._editableOption = "resizeableCircle", this._defaultRadius = 100;
  }, _extendingEnable() {
  }, _extendingDisable() {
  }, _extendingCreateMarker() {
  }, isRelevantMarker() {
  }, _getMinDistanceInMeter() {
    return this.options[this._minRadiusOption];
  }, _getMaxDistanceInMeter() {
    return this.options[this._maxRadiusOption];
  }, _distanceCalculation(e, i) {
    return this._map.distance(e, i);
  } });
  var cr = class {
    constructor(e = [], i = Yr) {
      if (this.data = e, this.length = this.data.length, this.compare = i, this.length > 0) for (let r = (this.length >> 1) - 1; r >= 0; r--) this._down(r);
    }
    push(e) {
      this.data.push(e), this.length++, this._up(this.length - 1);
    }
    pop() {
      if (this.length === 0) return;
      let e = this.data[0], i = this.data.pop();
      return this.length--, this.length > 0 && (this.data[0] = i, this._down(0)), e;
    }
    peek() {
      return this.data[0];
    }
    _up(e) {
      let { data: i, compare: r } = this, a = i[e];
      for (; e > 0; ) {
        let o = e - 1 >> 1, h = i[o];
        if (r(a, h) >= 0) break;
        i[e] = h, e = o;
      }
      i[e] = a;
    }
    _down(e) {
      let { data: i, compare: r } = this, a = this.length >> 1, o = i[e];
      for (; e < a; ) {
        let h = (e << 1) + 1, f = i[h], _ = h + 1;
        if (_ < this.length && r(i[_], f) < 0 && (h = _, f = i[_]), r(f, o) >= 0) break;
        i[e] = f, e = h;
      }
      i[e] = o;
    }
  };
  function Yr(e, i) {
    return e < i ? -1 : e > i ? 1 : 0;
  }
  function os(e, i) {
    return e.p.x > i.p.x ? 1 : e.p.x < i.p.x ? -1 : e.p.y !== i.p.y ? e.p.y > i.p.y ? 1 : -1 : 1;
  }
  function xo(e, i) {
    return e.rightSweepEvent.p.x > i.rightSweepEvent.p.x ? 1 : e.rightSweepEvent.p.x < i.rightSweepEvent.p.x ? -1 : e.rightSweepEvent.p.y !== i.rightSweepEvent.p.y ? e.rightSweepEvent.p.y < i.rightSweepEvent.p.y ? 1 : -1 : 1;
  }
  var Qr = class {
    constructor(e, i, r, a) {
      this.p = { x: e[0], y: e[1] }, this.featureId = i, this.ringId = r, this.eventId = a, this.otherEvent = null, this.isLeftEndpoint = null;
    }
    isSamePoint(e) {
      return this.p.x === e.p.x && this.p.y === e.p.y;
    }
  };
  function wo(e, i) {
    if (e.type === "FeatureCollection") {
      let r = e.features;
      for (let a = 0; a < r.length; a++) bi(r[a], i);
    } else bi(e, i);
  }
  var Ke = 0, Si = 0, dr = 0;
  function bi(e, i) {
    let r = e.type === "Feature" ? e.geometry : e, a = r.coordinates;
    (r.type === "Polygon" || r.type === "MultiLineString") && (a = [a]), r.type === "LineString" && (a = [[a]]);
    for (let o = 0; o < a.length; o++) for (let h = 0; h < a[o].length; h++) {
      let f = a[o][h][0], _ = null;
      Si = Si + 1;
      for (let k = 0; k < a[o][h].length - 1; k++) {
        _ = a[o][h][k + 1];
        let C = new Qr(f, Ke, Si, dr), N = new Qr(_, Ke, Si, dr + 1);
        C.otherEvent = N, N.otherEvent = C, os(C, N) > 0 ? (N.isLeftEndpoint = !0, C.isLeftEndpoint = !1) : (C.isLeftEndpoint = !0, N.isLeftEndpoint = !1), i.push(C), i.push(N), f = _, dr = dr + 1;
      }
    }
    Ke = Ke + 1;
  }
  var Lo = class {
    constructor(e) {
      this.leftSweepEvent = e, this.rightSweepEvent = e.otherEvent;
    }
  };
  function Cn(e, i) {
    if (e === null || i === null || e.leftSweepEvent.ringId === i.leftSweepEvent.ringId && (e.rightSweepEvent.isSamePoint(i.leftSweepEvent) || e.rightSweepEvent.isSamePoint(i.leftSweepEvent) || e.rightSweepEvent.isSamePoint(i.rightSweepEvent) || e.leftSweepEvent.isSamePoint(i.leftSweepEvent) || e.leftSweepEvent.isSamePoint(i.rightSweepEvent))) return !1;
    let r = e.leftSweepEvent.p.x, a = e.leftSweepEvent.p.y, o = e.rightSweepEvent.p.x, h = e.rightSweepEvent.p.y, f = i.leftSweepEvent.p.x, _ = i.leftSweepEvent.p.y, k = i.rightSweepEvent.p.x, C = i.rightSweepEvent.p.y, N = (C - _) * (o - r) - (k - f) * (h - a), O = (k - f) * (a - _) - (C - _) * (r - f), K = (o - r) * (a - _) - (h - a) * (r - f);
    if (N === 0) return !1;
    let Y = O / N, dt = K / N;
    if (Y >= 0 && Y <= 1 && dt >= 0 && dt <= 1) {
      let _t = r + Y * (o - r), Lt = a + Y * (h - a);
      return [_t, Lt];
    }
    return !1;
  }
  function ko(e, i) {
    i = i || !1;
    let r = [], a = new cr([], xo);
    for (; e.length; ) {
      let o = e.pop();
      if (o.isLeftEndpoint) {
        let h = new Lo(o);
        for (let f = 0; f < a.data.length; f++) {
          let _ = a.data[f];
          if (i && _.leftSweepEvent.featureId === o.featureId) continue;
          let k = Cn(h, _);
          k !== !1 && r.push(k);
        }
        a.push(h);
      } else o.isLeftEndpoint === !1 && a.pop();
    }
    return r;
  }
  function $n(e, i) {
    let r = new cr([], os);
    return wo(e, r), ko(r, i);
  }
  var ls = $n, fr = ls;
  function us(e, i, r = {}) {
    let { removeDuplicates: a = !0, ignoreSelfIntersections: o = !0 } = r, h = [];
    e.type === "FeatureCollection" ? h = h.concat(e.features) : e.type === "Feature" ? h.push(e) : (e.type === "LineString" || e.type === "Polygon" || e.type === "MultiLineString" || e.type === "MultiPolygon") && h.push(vi(e)), i.type === "FeatureCollection" ? h = h.concat(i.features) : i.type === "Feature" ? h.push(i) : (i.type === "LineString" || i.type === "Polygon" || i.type === "MultiLineString" || i.type === "MultiPolygon") && h.push(vi(i));
    let f = fr(ai(h), o), _ = [];
    if (a) {
      let k = {};
      f.forEach((C) => {
        let N = C.join(",");
        k[N] || (k[N] = !0, _.push(C));
      });
    } else _ = f;
    return ai(_.map((k) => wn(k)));
  }
  var oi = us, pr = x(de(), 1);
  function ta(e, i, r) {
    if (e !== null) for (var a, o, h, f, _, k, C, N = 0, O = 0, K, Y = e.type, dt = Y === "FeatureCollection", _t = Y === "Feature", Lt = dt ? e.features.length : 1, Pt = 0; Pt < Lt; Pt++) {
      C = dt ? e.features[Pt].geometry : _t ? e.geometry : e, K = C ? C.type === "GeometryCollection" : !1, _ = K ? C.geometries.length : 1;
      for (var F = 0; F < _; F++) {
        var nt = 0, ct = 0;
        if (f = K ? C.geometries[F] : C, f !== null) {
          k = f.coordinates;
          var vt = f.type;
          switch (N = 0, vt) {
            case null:
              break;
            case "Point":
              if (i(k, O, Pt, nt, ct) === !1) return !1;
              O++, nt++;
              break;
            case "LineString":
            case "MultiPoint":
              for (a = 0; a < k.length; a++) {
                if (i(k[a], O, Pt, nt, ct) === !1) return !1;
                O++, vt === "MultiPoint" && nt++;
              }
              vt === "LineString" && nt++;
              break;
            case "Polygon":
            case "MultiLineString":
              for (a = 0; a < k.length; a++) {
                for (o = 0; o < k[a].length - N; o++) {
                  if (i(k[a][o], O, Pt, nt, ct) === !1) return !1;
                  O++;
                }
                vt === "MultiLineString" && nt++, vt === "Polygon" && ct++;
              }
              vt === "Polygon" && nt++;
              break;
            case "MultiPolygon":
              for (a = 0; a < k.length; a++) {
                for (ct = 0, o = 0; o < k[a].length; o++) {
                  for (h = 0; h < k[a][o].length - N; h++) {
                    if (i(k[a][o][h], O, Pt, nt, ct) === !1) return !1;
                    O++;
                  }
                  ct++;
                }
                nt++;
              }
              break;
            case "GeometryCollection":
              for (a = 0; a < f.geometries.length; a++) if (ta(f.geometries[a], i) === !1) return !1;
              break;
            default:
              throw new Error("Unknown Geometry Type");
          }
        }
      }
    }
  }
  function En(e, i) {
    if (e.type === "Feature") i(e, 0);
    else if (e.type === "FeatureCollection") for (var r = 0; r < e.features.length && i(e.features[r], r) !== !1; r++) ;
  }
  function Co(e, i, r) {
    var a = r;
    return En(e, function(o, h) {
      h === 0 && r === void 0 ? a = o : a = i(a, o, h);
    }), a;
  }
  function Pi(e, i) {
    var r, a, o, h, f, _, k, C, N, O, K = 0, Y = e.type === "FeatureCollection", dt = e.type === "Feature", _t = Y ? e.features.length : 1;
    for (r = 0; r < _t; r++) {
      for (_ = Y ? e.features[r].geometry : dt ? e.geometry : e, C = Y ? e.features[r].properties : dt ? e.properties : {}, N = Y ? e.features[r].bbox : dt ? e.bbox : void 0, O = Y ? e.features[r].id : dt ? e.id : void 0, k = _ ? _.type === "GeometryCollection" : !1, f = k ? _.geometries.length : 1, o = 0; o < f; o++) {
        if (h = k ? _.geometries[o] : _, h === null) {
          if (i(null, K, C, N, O) === !1) return !1;
          continue;
        }
        switch (h.type) {
          case "Point":
          case "LineString":
          case "MultiPoint":
          case "Polygon":
          case "MultiLineString":
          case "MultiPolygon": {
            if (i(h, K, C, N, O) === !1) return !1;
            break;
          }
          case "GeometryCollection": {
            for (a = 0; a < h.geometries.length; a++) if (i(h.geometries[a], K, C, N, O) === !1) return !1;
            break;
          }
          default:
            throw new Error("Unknown Geometry Type");
        }
      }
      K++;
    }
  }
  function ea(e, i) {
    Pi(e, function(r, a, o, h, f) {
      var _ = r === null ? null : r.type;
      switch (_) {
        case null:
        case "Point":
        case "LineString":
        case "Polygon":
          return i(vi(r, o, { bbox: h, id: f }), a, 0) === !1 ? !1 : void 0;
      }
      var k;
      switch (_) {
        case "MultiPoint":
          k = "Point";
          break;
        case "MultiLineString":
          k = "LineString";
          break;
        case "MultiPolygon":
          k = "Polygon";
          break;
      }
      for (var C = 0; C < r.coordinates.length; C++) {
        var N = r.coordinates[C], O = { type: k, coordinates: N };
        if (i(vi(O, o), a, C) === !1) return !1;
      }
    });
  }
  function Ve(e, i = {}) {
    if (e.bbox != null && i.recompute !== !0) return e.bbox;
    let r = [1 / 0, 1 / 0, -1 / 0, -1 / 0];
    return ta(e, (a) => {
      r[0] > a[0] && (r[0] = a[0]), r[1] > a[1] && (r[1] = a[1]), r[2] < a[0] && (r[2] = a[0]), r[3] < a[1] && (r[3] = a[1]);
    }), r;
  }
  function ia(e) {
    var i;
    if (e.bbox) i = e.bbox;
    else if (Array.isArray(e) && e.length === 4) i = e;
    else if (Array.isArray(e) && e.length === 6) i = [e[0], e[1], e[3], e[4]];
    else if (e.type === "Feature") i = Ve(e);
    else if (e.type === "FeatureCollection") i = Ve(e);
    else throw new Error("invalid geojson");
    return { minX: i[0], minY: i[1], maxX: i[2], maxY: i[3] };
  }
  var Ti = class {
    constructor(e = 9) {
      this.tree = new pr.default(e), this.tree.toBBox = ia;
    }
    insert(e) {
      if (e.type !== "Feature") throw new Error("invalid feature");
      return e.bbox = e.bbox ? e.bbox : Ve(e), this.tree.insert(e), this;
    }
    load(e) {
      var i = [];
      return Array.isArray(e) ? e.forEach(function(r) {
        if (r.type !== "Feature") throw new Error("invalid features");
        r.bbox = r.bbox ? r.bbox : Ve(r), i.push(r);
      }) : En(e, function(r) {
        if (r.type !== "Feature") throw new Error("invalid features");
        r.bbox = r.bbox ? r.bbox : Ve(r), i.push(r);
      }), this.tree.load(i), this;
    }
    remove(e, i) {
      if (e.type !== "Feature") throw new Error("invalid feature");
      return e.bbox = e.bbox ? e.bbox : Ve(e), this.tree.remove(e, i), this;
    }
    clear() {
      return this.tree.clear(), this;
    }
    search(e) {
      var i = this.tree.search(ia(e));
      return ai(i);
    }
    collides(e) {
      return this.tree.collides(ia(e));
    }
    all() {
      let e = this.tree.all();
      return ai(e);
    }
    toJSON() {
      return this.tree.toJSON();
    }
    fromJSON(e) {
      return this.tree.fromJSON(e), this;
    }
  };
  function Un(e) {
    return new Ti(e);
  }
  function hs(e, i) {
    if (i = i ?? {}, !si(i)) throw new Error("options is invalid");
    var r = i.precision, a = i.coordinates, o = i.mutate;
    if (r = r == null || isNaN(r) ? 6 : r, a = a == null || isNaN(a) ? 3 : a, !e) throw new Error("<geojson> is required");
    if (typeof r != "number") throw new Error("<precision> must be a number");
    if (typeof a != "number") throw new Error("<coordinates> must be a number");
    (o === !1 || o === void 0) && (e = JSON.parse(JSON.stringify(e)));
    var h = Math.pow(10, r);
    return ta(e, function(f) {
      na(f, h, a);
    }), e;
  }
  function na(e, i, r) {
    e.length > r && e.splice(r, e.length);
    for (var a = 0; a < e.length; a++) e[a] = Math.round(e[a] * i) / i;
    return e;
  }
  function ii(e) {
    if (!e) throw new Error("coord is required");
    if (!Array.isArray(e)) {
      if (e.type === "Feature" && e.geometry !== null && e.geometry.type === "Point") return [...e.geometry.coordinates];
      if (e.type === "Point") return [...e.coordinates];
    }
    if (Array.isArray(e) && e.length >= 2 && !Array.isArray(e[0]) && !Array.isArray(e[1])) return [...e];
    throw new Error("coord must be GeoJSON Point or an Array of numbers");
  }
  function Di(e) {
    if (Array.isArray(e)) return e;
    if (e.type === "Feature") {
      if (e.geometry !== null) return e.geometry.coordinates;
    } else if (e.coordinates) return e.coordinates;
    throw new Error("coords must be GeoJSON Feature, Geometry Object or an Array");
  }
  function rn(e) {
    return e.type === "Feature" ? e.geometry : e;
  }
  function an(e, i) {
    return e.type === "FeatureCollection" ? "FeatureCollection" : e.type === "GeometryCollection" ? "GeometryCollection" : e.type === "Feature" && e.geometry !== null ? e.geometry.type : e.type;
  }
  function mr(e) {
    if (!e) throw new Error("geojson is required");
    let i = [];
    return ea(e, (r) => {
      ra(r, i);
    }), ai(i);
  }
  function ra(e, i) {
    let r = [], a = e.geometry;
    if (a !== null) {
      switch (a.type) {
        case "Polygon":
          r = Di(a);
          break;
        case "LineString":
          r = [Di(a)];
      }
      r.forEach((o) => {
        cs(o, e.properties).forEach((h) => {
          h.id = i.length, i.push(h);
        });
      });
    }
  }
  function cs(e, i) {
    let r = [];
    return e.reduce((a, o) => {
      let h = Vn([a, o], i);
      return h.bbox = Eo(a, o), r.push(h), o;
    }), r;
  }
  function Eo(e, i) {
    let r = e[0], a = e[1], o = i[0], h = i[1], f = r < o ? r : o, _ = a < h ? a : h, k = r > o ? r : o, C = a > h ? a : h;
    return [f, _, k, C];
  }
  function Mn(e, i, r = {}) {
    var a = ii(e), o = ii(i), h = Ln(o[1] - a[1]), f = Ln(o[0] - a[0]), _ = Ln(a[1]), k = Ln(o[1]), C = Math.pow(Math.sin(h / 2), 2) + Math.pow(Math.sin(f / 2), 2) * Math.cos(_) * Math.cos(k);
    return ur(2 * Math.atan2(Math.sqrt(C), Math.sqrt(1 - C)), r.units);
  }
  var Mo = Object.defineProperty, ds = Object.defineProperties, Bo = Object.getOwnPropertyDescriptors, aa = Object.getOwnPropertySymbols, Ao = Object.prototype.hasOwnProperty, xi = Object.prototype.propertyIsEnumerable, Gn = (e, i, r) => i in e ? Mo(e, i, { enumerable: !0, configurable: !0, writable: !0, value: r }) : e[i] = r, So = (e, i) => {
    for (var r in i || (i = {})) Ao.call(i, r) && Gn(e, r, i[r]);
    if (aa) for (var r of aa(i)) xi.call(i, r) && Gn(e, r, i[r]);
    return e;
  }, gr = (e, i) => ds(e, Bo(i));
  function Po(e, i, r = {}) {
    if (!e || !i) throw new Error("lines and inputPoint are required arguments");
    let a = ii(i), o = wn([1 / 0, 1 / 0], { lineStringIndex: -1, segmentIndex: -1, totalDistance: -1, lineDistance: -1, segmentDistance: -1, pointDistance: 1 / 0, multiFeatureIndex: -1, index: -1, location: -1, dist: 1 / 0 }), h = 0, f = 0, _ = -1;
    return ea(e, function(k, C, N) {
      _ !== N && (_ = N, f = 0);
      let O = Di(k);
      for (let K = 0; K < O.length - 1; K++) {
        let Y = wn(O[K]), dt = ii(Y), _t = wn(O[K + 1]), Lt = ii(_t), Pt = Mn(Y, _t, r), F, nt;
        Lt[0] === a[0] && Lt[1] === a[1] ? [F, nt] = [Lt, !0] : dt[0] === a[0] && dt[1] === a[1] ? [F, nt] = [dt, !1] : [F, nt] = ms(dt, Lt, a);
        let ct = Mn(i, F, r);
        if (ct < o.properties.pointDistance) {
          let vt = Mn(Y, F, r);
          o = wn(F, { lineStringIndex: N, segmentIndex: nt ? K + 1 : K, totalDistance: h + vt, lineDistance: f + vt, segmentDistance: vt, pointDistance: ct, multiFeatureIndex: -1, index: -1, location: -1, dist: 1 / 0 }), o.properties = gr(So({}, o.properties), { multiFeatureIndex: o.properties.lineStringIndex, index: o.properties.segmentIndex, location: o.properties.totalDistance, dist: o.properties.pointDistance });
        }
        h += Pt, f += Pt;
      }
    }), o;
  }
  function Zi(e, i) {
    let [r, a, o] = e, [h, f, _] = i;
    return r * h + a * f + o * _;
  }
  function Zn(e, i) {
    let [r, a, o] = e, [h, f, _] = i;
    return [a * _ - o * f, o * h - r * _, r * f - a * h];
  }
  function qn(e) {
    return Math.sqrt(Math.pow(e[0], 2) + Math.pow(e[1], 2) + Math.pow(e[2], 2));
  }
  function fs(e) {
    let i = qn(e);
    return [e[0] / i, e[1] / i, e[2] / i];
  }
  function qi(e) {
    let i = Ln(e[1]), r = Ln(e[0]);
    return [Math.cos(i) * Math.cos(r), Math.cos(i) * Math.sin(r), Math.sin(i)];
  }
  function ps(e) {
    let [i, r, a] = e, o = Math.min(Math.max(a, -1), 1), h = Gi(Math.asin(o));
    return [Gi(Math.atan2(r, i)), h];
  }
  function ms(e, i, r) {
    let a = qi(e), o = qi(i), h = qi(r), f = Zn(a, o);
    if (f[0] === 0 && f[1] === 0 && f[2] === 0) return Zi(a, o) > 0 ? [[...i], !0] : [[...r], !1];
    let _ = Zn(f, h);
    if (_[0] === 0 && _[1] === 0 && _[2] === 0) return [[...i], !0];
    let k = Zn(_, f), C = fs(k), N = [-C[0], -C[1], -C[2]], O = Zi(h, C) > Zi(h, N) ? C : N, K = fs(f), Y = Zi(Zn(a, O), K), dt = Zi(Zn(O, o), K);
    return Y >= 0 && dt >= 0 ? [ps(O), !1] : Zi(a, h) > Zi(o, h) ? [[...e], !1] : [[...i], !0];
  }
  function gs(e, i) {
    if (!e) throw new Error("line is required");
    if (!i) throw new Error("splitter is required");
    let r = an(e), a = an(i);
    if (r !== "LineString") throw new Error("line must be LineString");
    if (a === "FeatureCollection") throw new Error("splitter cannot be a FeatureCollection");
    if (a === "GeometryCollection") throw new Error("splitter cannot be a GeometryCollection");
    var o = hs(i, { precision: 7 });
    switch (e.type !== "Feature" && (e = vi(e)), a) {
      case "Point":
        return _r(e, o);
      case "MultiPoint":
        return wi(e, o);
      case "LineString":
      case "MultiLineString":
      case "Polygon":
      case "MultiPolygon":
        return wi(e, us(e, o, { ignoreSelfIntersections: !0 }));
    }
  }
  function wi(e, i) {
    var r = [], a = Un();
    return ea(i, function(o) {
      if (r.forEach(function(_, k) {
        _.id = k;
      }), !r.length) r = _r(e, o).features, a.load(ai(r));
      else {
        var h = a.search(o);
        if (h.features.length) {
          var f = sa(o, h);
          r = r.filter(function(_) {
            return _.id !== f.id;
          }), a.remove(f), En(_r(f, o), function(_) {
            r.push(_), a.insert(_);
          });
        }
      }
    }), ai(r);
  }
  function _r(e, i) {
    var r = [], a = Di(e)[0], o = Di(e)[e.geometry.coordinates.length - 1];
    if (sn(a, ii(i)) || sn(o, ii(i))) return ai([e]);
    var h = Un(), f = mr(e);
    h.load(f);
    var _ = h.search(i);
    if (!_.features.length) return ai([e]);
    var k = sa(i, _), C = [a], N = Co(f, function(O, K, Y) {
      var dt = Di(K)[1], _t = ii(i);
      return Y === k.id ? (O.push(_t), r.push(Vn(O)), sn(_t, dt) ? [_t] : [_t, dt]) : (O.push(dt), O);
    }, C);
    return N.length > 1 && r.push(Vn(N)), ai(r);
  }
  function sa(e, i) {
    if (!i.features.length) throw new Error("lines must contain features");
    if (i.features.length === 1) return i.features[0];
    var r, a = 1 / 0;
    return En(i, function(o) {
      var h = Po(o, e), f = h.properties.dist;
      f < a && (r = o, a = f);
    }), r;
  }
  function sn(e, i) {
    return e[0] === i[0] && e[1] === i[1];
  }
  var To = gs, li = 11102230246251565e-32, Se = 134217729, _s = (3 + 8 * li) * li;
  function yr(e, i, r, a, o) {
    let h, f, _, k, C = i[0], N = a[0], O = 0, K = 0;
    N > C == N > -C ? (h = C, C = i[++O]) : (h = N, N = a[++K]);
    let Y = 0;
    if (O < e && K < r) for (N > C == N > -C ? (f = C + h, _ = h - (f - C), C = i[++O]) : (f = N + h, _ = h - (f - N), N = a[++K]), h = f, _ !== 0 && (o[Y++] = _); O < e && K < r; ) N > C == N > -C ? (f = h + C, k = f - h, _ = h - (f - k) + (C - k), C = i[++O]) : (f = h + N, k = f - h, _ = h - (f - k) + (N - k), N = a[++K]), h = f, _ !== 0 && (o[Y++] = _);
    for (; O < e; ) f = h + C, k = f - h, _ = h - (f - k) + (C - k), C = i[++O], h = f, _ !== 0 && (o[Y++] = _);
    for (; K < r; ) f = h + N, k = f - h, _ = h - (f - k) + (N - k), N = a[++K], h = f, _ !== 0 && (o[Y++] = _);
    return (h !== 0 || Y === 0) && (o[Y++] = h), Y;
  }
  function Do(e, i) {
    let r = i[0];
    for (let a = 1; a < e; a++) r += i[a];
    return r;
  }
  function Bn(e) {
    return new Float64Array(e);
  }
  var ys = (3 + 16 * li) * li, vs = (2 + 12 * li) * li, bs = (9 + 64 * li) * li * li, on = Bn(4), xs = Bn(8), oa = Bn(12), la = Bn(16), $e = Bn(4);
  function t(e, i, r, a, o, h, f) {
    let _, k, C, N, O, K, Y, dt, _t, Lt, Pt, F, nt, ct, vt, yt, bt, A, D = e - o, I = r - o, W = i - h, Z = a - h;
    ct = D * Z, K = Se * D, Y = K - (K - D), dt = D - Y, K = Se * Z, _t = K - (K - Z), Lt = Z - _t, vt = dt * Lt - (ct - Y * _t - dt * _t - Y * Lt), yt = W * I, K = Se * W, Y = K - (K - W), dt = W - Y, K = Se * I, _t = K - (K - I), Lt = I - _t, bt = dt * Lt - (yt - Y * _t - dt * _t - Y * Lt), Pt = vt - bt, O = vt - Pt, on[0] = vt - (Pt + O) + (O - bt), F = ct + Pt, O = F - ct, nt = ct - (F - O) + (Pt - O), Pt = nt - yt, O = nt - Pt, on[1] = nt - (Pt + O) + (O - yt), A = F + Pt, O = A - F, on[2] = F - (A - O) + (Pt - O), on[3] = A;
    let U = Do(4, on), it = vs * f;
    if (U >= it || -U >= it || (O = e - D, _ = e - (D + O) + (O - o), O = r - I, C = r - (I + O) + (O - o), O = i - W, k = i - (W + O) + (O - h), O = a - Z, N = a - (Z + O) + (O - h), _ === 0 && k === 0 && C === 0 && N === 0) || (it = bs * f + _s * Math.abs(U), U += D * N + Z * _ - (W * C + I * k), U >= it || -U >= it)) return U;
    ct = _ * Z, K = Se * _, Y = K - (K - _), dt = _ - Y, K = Se * Z, _t = K - (K - Z), Lt = Z - _t, vt = dt * Lt - (ct - Y * _t - dt * _t - Y * Lt), yt = k * I, K = Se * k, Y = K - (K - k), dt = k - Y, K = Se * I, _t = K - (K - I), Lt = I - _t, bt = dt * Lt - (yt - Y * _t - dt * _t - Y * Lt), Pt = vt - bt, O = vt - Pt, $e[0] = vt - (Pt + O) + (O - bt), F = ct + Pt, O = F - ct, nt = ct - (F - O) + (Pt - O), Pt = nt - yt, O = nt - Pt, $e[1] = nt - (Pt + O) + (O - yt), A = F + Pt, O = A - F, $e[2] = F - (A - O) + (Pt - O), $e[3] = A;
    let J = yr(4, on, 4, $e, xs);
    ct = D * N, K = Se * D, Y = K - (K - D), dt = D - Y, K = Se * N, _t = K - (K - N), Lt = N - _t, vt = dt * Lt - (ct - Y * _t - dt * _t - Y * Lt), yt = W * C, K = Se * W, Y = K - (K - W), dt = W - Y, K = Se * C, _t = K - (K - C), Lt = C - _t, bt = dt * Lt - (yt - Y * _t - dt * _t - Y * Lt), Pt = vt - bt, O = vt - Pt, $e[0] = vt - (Pt + O) + (O - bt), F = ct + Pt, O = F - ct, nt = ct - (F - O) + (Pt - O), Pt = nt - yt, O = nt - Pt, $e[1] = nt - (Pt + O) + (O - yt), A = F + Pt, O = A - F, $e[2] = F - (A - O) + (Pt - O), $e[3] = A;
    let et = yr(J, xs, 4, $e, oa);
    ct = _ * N, K = Se * _, Y = K - (K - _), dt = _ - Y, K = Se * N, _t = K - (K - N), Lt = N - _t, vt = dt * Lt - (ct - Y * _t - dt * _t - Y * Lt), yt = k * C, K = Se * k, Y = K - (K - k), dt = k - Y, K = Se * C, _t = K - (K - C), Lt = C - _t, bt = dt * Lt - (yt - Y * _t - dt * _t - Y * Lt), Pt = vt - bt, O = vt - Pt, $e[0] = vt - (Pt + O) + (O - bt), F = ct + Pt, O = F - ct, nt = ct - (F - O) + (Pt - O), Pt = nt - yt, O = nt - Pt, $e[1] = nt - (Pt + O) + (O - yt), A = F + Pt, O = A - F, $e[2] = F - (A - O) + (Pt - O), $e[3] = A;
    let st = yr(et, oa, 4, $e, la);
    return la[st - 1];
  }
  function n(e, i, r, a, o, h) {
    let f = (i - h) * (r - o), _ = (e - o) * (a - h), k = f - _, C = Math.abs(f + _);
    return Math.abs(k) >= ys * C ? k : -t(e, i, r, a, o, h, C);
  }
  function s(e, i) {
    var r, a, o = 0, h, f, _, k, C, N, O, K = e[0], Y = e[1], dt = i.length;
    for (r = 0; r < dt; r++) {
      a = 0;
      var _t = i[r], Lt = _t.length - 1;
      if (N = _t[0], N[0] !== _t[Lt][0] && N[1] !== _t[Lt][1]) throw new Error("First and last coordinates in a ring must be the same");
      for (f = N[0] - K, _ = N[1] - Y, a; a < Lt; a++) {
        if (O = _t[a + 1], k = O[0] - K, C = O[1] - Y, _ === 0 && C === 0) {
          if (k <= 0 && f >= 0 || f <= 0 && k >= 0) return 0;
        } else if (C >= 0 && _ <= 0 || C <= 0 && _ >= 0) {
          if (h = n(f, k, _, C, 0, 0), h === 0) return 0;
          (h > 0 && C > 0 && _ <= 0 || h < 0 && C <= 0 && _ > 0) && o++;
        }
        N = O, _ = C, f = k;
      }
    }
    return o % 2 !== 0;
  }
  function c(e, i, r = {}) {
    if (!e) throw new Error("point is required");
    if (!i) throw new Error("polygon is required");
    let a = ii(e), o = rn(i), h = o.type, f = i.bbox, _ = o.coordinates;
    if (f && y(a, f) === !1) return !1;
    h === "Polygon" && (_ = [_]);
    let k = !1;
    for (var C = 0; C < _.length; ++C) {
      let N = s(a, _[C]);
      if (N === 0) return !r.ignoreBoundary;
      N && (k = !0);
    }
    return k;
  }
  function y(e, i) {
    return i[0] <= e[0] && i[1] <= e[1] && i[2] >= e[0] && i[3] >= e[1];
  }
  function B(e, i, r = {}) {
    let a = ii(e), o = Di(i);
    for (let h = 0; h < o.length - 1; h++) {
      let f = !1;
      if (r.ignoreEndVertices && (h === 0 && (f = "start"), h === o.length - 2 && (f = "end"), h === 0 && h + 1 === o.length - 1 && (f = "both")), G(o[h], o[h + 1], a, f, typeof r.epsilon > "u" ? null : r.epsilon)) return !0;
    }
    return !1;
  }
  function G(e, i, r, a, o) {
    let h = r[0], f = r[1], _ = e[0], k = e[1], C = i[0], N = i[1], O = r[0] - _, K = r[1] - k, Y = C - _, dt = N - k, _t = O * dt - K * Y;
    if (o !== null) {
      if (Math.abs(_t) > o) return !1;
    } else if (_t !== 0) return !1;
    if (Math.abs(Y) === Math.abs(dt) && Math.abs(Y) === 0) return a ? !1 : r[0] === e[0] && r[1] === e[1];
    if (a) {
      if (a === "start") return Math.abs(Y) >= Math.abs(dt) ? Y > 0 ? _ < h && h <= C : C <= h && h < _ : dt > 0 ? k < f && f <= N : N <= f && f < k;
      if (a === "end") return Math.abs(Y) >= Math.abs(dt) ? Y > 0 ? _ <= h && h < C : C < h && h <= _ : dt > 0 ? k <= f && f < N : N < f && f <= k;
      if (a === "both") return Math.abs(Y) >= Math.abs(dt) ? Y > 0 ? _ < h && h < C : C < h && h < _ : dt > 0 ? k < f && f < N : N < f && f < k;
    } else return Math.abs(Y) >= Math.abs(dt) ? Y > 0 ? _ <= h && h <= C : C <= h && h <= _ : dt > 0 ? k <= f && f <= N : N <= f && f <= k;
    return !1;
  }
  function rt(e, i) {
    let r = rn(e), a = rn(i), o = r.type, h = a.type, f = r.coordinates, _ = a.coordinates;
    switch (o) {
      case "Point":
        if (h === "Point") return ua(f, _);
        throw new Error("feature2 " + h + " geometry not supported");
      case "MultiPoint":
        switch (h) {
          case "Point":
            return Tt(r, a);
          case "MultiPoint":
            return Ht(r, a);
          default:
            throw new Error("feature2 " + h + " geometry not supported");
        }
      case "LineString":
        switch (h) {
          case "Point":
            return B(a, r, { ignoreEndVertices: !0 });
          case "LineString":
            return Oe(r, a);
          case "MultiPoint":
            return se(r, a);
          default:
            throw new Error("feature2 " + h + " geometry not supported");
        }
      case "Polygon":
        switch (h) {
          case "Point":
            return c(a, r, { ignoreBoundary: !0 });
          case "LineString":
            return We(r, a);
          case "Polygon":
            return Hi(r, a);
          case "MultiPoint":
            return Ue(r, a);
          case "MultiPolygon":
            return gt(r, a);
          default:
            throw new Error("feature2 " + h + " geometry not supported");
        }
      case "MultiPolygon":
        if (h === "Polygon") return ht(r, a);
        throw new Error("feature2 " + h + " geometry not supported");
      default:
        throw new Error("feature1 " + o + " geometry not supported");
    }
  }
  function ht(e, i) {
    return e.coordinates.some((r) => Hi({ type: "Polygon", coordinates: r }, i));
  }
  function gt(e, i) {
    return i.coordinates.every((r) => Hi(e, { type: "Polygon", coordinates: r }));
  }
  function Tt(e, i) {
    let r, a = !1;
    for (r = 0; r < e.coordinates.length; r++) if (ua(e.coordinates[r], i.coordinates)) {
      a = !0;
      break;
    }
    return a;
  }
  function Ht(e, i) {
    for (let r of i.coordinates) {
      let a = !1;
      for (let o of e.coordinates) if (ua(r, o)) {
        a = !0;
        break;
      }
      if (!a) return !1;
    }
    return !0;
  }
  function se(e, i) {
    let r = !1;
    for (let a of i.coordinates) if (B(a, e, { ignoreEndVertices: !0 }) && (r = !0), !B(a, e)) return !1;
    return !!r;
  }
  function Ue(e, i) {
    for (let r of i.coordinates) if (!c(r, e, { ignoreBoundary: !0 })) return !1;
    return !0;
  }
  function Oe(e, i) {
    let r = !1;
    for (let a of i.coordinates) if (B({ type: "Point", coordinates: a }, e, { ignoreEndVertices: !0 }) && (r = !0), !B({ type: "Point", coordinates: a }, e, { ignoreEndVertices: !1 })) return !1;
    return r;
  }
  function ui(e, i) {
    let r = e.coordinates, a = [];
    for (let o = 0; o < r.length - 1; o++) {
      let h = Vn([r[o], r[o + 1]]), f = gs(h, vi(i));
      f.features.length === 0 ? a.push(h) : a.push(...f.features);
    }
    return ai(a);
  }
  function We(e, i) {
    let r = Ve(e), a = Ve(i);
    if (!ws(r, a)) return !1;
    for (let f of i.coordinates) if (!c(f, e)) return !1;
    let o = !1, h = ui(i, e);
    for (let f of h.features) {
      let _ = Oo(f.geometry.coordinates[0], f.geometry.coordinates[1]);
      if (!c(_, e)) return !1;
      !o && c(_, e, { ignoreBoundary: !0 }) && (o = !0);
    }
    return o;
  }
  function Hi(e, i) {
    if (e.type === "Feature" && e.geometry === null || i.type === "Feature" && i.geometry === null) return !1;
    let r = Ve(e), a = Ve(i);
    if (!ws(r, a)) return !1;
    let o = rn(i).coordinates;
    for (let h of o) for (let f of h) if (!c(f, e)) return !1;
    return !0;
  }
  function ws(e, i) {
    return !(e[0] > i[0] || e[2] < i[2] || e[1] > i[1] || e[3] < i[3]);
  }
  function ua(e, i) {
    return e[0] === i[0] && e[1] === i[1];
  }
  function Oo(e, i) {
    return [(e[0] + i[0]) / 2, (e[1] + i[1]) / 2];
  }
  var Ls = rt, Io = x(Vi()), ks = /^-?(?:\d+(?:\.\d*)?|\.\d+)(?:e[+-]?\d+)?$/i, Ee = Math.ceil, Ge = Math.floor, Je = "[BigNumber Error] ", Cs = Je + "Number primitive has more than 15 significant digits: ", fi = 1e14, Xt = 14, vr = 9007199254740991, ha = [1, 10, 100, 1e3, 1e4, 1e5, 1e6, 1e7, 1e8, 1e9, 1e10, 1e11, 1e12, 1e13], An = 1e7, ze = 1e9;
  function al(e) {
    var i, r, a, o = F.prototype = { constructor: F, toString: null, valueOf: null }, h = new F(1), f = 20, _ = 4, k = -7, C = 21, N = -1e7, O = 1e7, K = !1, Y = 1, dt = 0, _t = { prefix: "", groupSize: 3, secondaryGroupSize: 0, groupSeparator: ",", decimalSeparator: ".", fractionGroupSize: 0, fractionGroupSeparator: " ", suffix: "" }, Lt = "0123456789abcdefghijklmnopqrstuvwxyz", Pt = !0;
    function F(A, D) {
      var I, W, Z, U, it, J, et, st, at = this;
      if (!(at instanceof F)) return new F(A, D);
      if (D == null) {
        if (A && A._isBigNumber === !0) {
          at.s = A.s, !A.c || A.e > O ? at.c = at.e = null : A.e < N ? at.c = [at.e = 0] : (at.e = A.e, at.c = A.c.slice());
          return;
        }
        if ((J = typeof A == "number") && A * 0 == 0) {
          if (at.s = 1 / A < 0 ? (A = -A, -1) : 1, A === ~~A) {
            for (U = 0, it = A; it >= 10; it /= 10, U++) ;
            U > O ? at.c = at.e = null : (at.e = U, at.c = [A]);
            return;
          }
          st = String(A);
        } else {
          if (!ks.test(st = String(A))) return a(at, st, J);
          at.s = st.charCodeAt(0) == 45 ? (st = st.slice(1), -1) : 1;
        }
        (U = st.indexOf(".")) > -1 && (st = st.replace(".", "")), (it = st.search(/e/i)) > 0 ? (U < 0 && (U = it), U += +st.slice(it + 1), st = st.substring(0, it)) : U < 0 && (U = st.length);
      } else {
        if (Be(D, 2, Lt.length, "Base"), D == 10 && Pt) return at = new F(A), yt(at, f + at.e + 1, _);
        if (st = String(A), J = typeof A == "number") {
          if (A * 0 != 0) return a(at, st, J, D);
          if (at.s = 1 / A < 0 ? (st = st.slice(1), -1) : 1, F.DEBUG && st.replace(/^0\.0*|\./, "").length > 15) throw Error(Cs + A);
        } else at.s = st.charCodeAt(0) === 45 ? (st = st.slice(1), -1) : 1;
        for (I = Lt.slice(0, D), U = it = 0, et = st.length; it < et; it++) if (I.indexOf(W = st.charAt(it)) < 0) {
          if (W == ".") {
            if (it > U) {
              U = et;
              continue;
            }
          } else if (!Z && (st == st.toUpperCase() && (st = st.toLowerCase()) || st == st.toLowerCase() && (st = st.toUpperCase()))) {
            Z = !0, it = -1, U = 0;
            continue;
          }
          return a(at, String(A), J, D);
        }
        J = !1, st = r(st, D, 10, at.s), (U = st.indexOf(".")) > -1 ? st = st.replace(".", "") : U = st.length;
      }
      for (it = 0; st.charCodeAt(it) === 48; it++) ;
      for (et = st.length; st.charCodeAt(--et) === 48; ) ;
      if (st = st.slice(it, ++et)) {
        if (et -= it, J && F.DEBUG && et > 15 && (A > vr || A !== Ge(A))) throw Error(Cs + at.s * A);
        if ((U = U - it - 1) > O) at.c = at.e = null;
        else if (U < N) at.c = [at.e = 0];
        else {
          if (at.e = U, at.c = [], it = (U + 1) % Xt, U < 0 && (it += Xt), it < et) {
            for (it && at.c.push(+st.slice(0, it)), et -= Xt; it < et; ) at.c.push(+st.slice(it, it += Xt));
            it = Xt - (st = st.slice(it)).length;
          } else it -= et;
          for (; it--; st += "0") ;
          at.c.push(+st);
        }
      } else at.c = [at.e = 0];
    }
    F.clone = al, F.ROUND_UP = 0, F.ROUND_DOWN = 1, F.ROUND_CEIL = 2, F.ROUND_FLOOR = 3, F.ROUND_HALF_UP = 4, F.ROUND_HALF_DOWN = 5, F.ROUND_HALF_EVEN = 6, F.ROUND_HALF_CEIL = 7, F.ROUND_HALF_FLOOR = 8, F.EUCLID = 9, F.config = F.set = function(A) {
      var D, I;
      if (A != null) if (typeof A == "object") {
        if (A.hasOwnProperty(D = "DECIMAL_PLACES") && (I = A[D], Be(I, 0, ze, D), f = I), A.hasOwnProperty(D = "ROUNDING_MODE") && (I = A[D], Be(I, 0, 8, D), _ = I), A.hasOwnProperty(D = "EXPONENTIAL_AT") && (I = A[D], I && I.pop ? (Be(I[0], -ze, 0, D), Be(I[1], 0, ze, D), k = I[0], C = I[1]) : (Be(I, -ze, ze, D), k = -(C = I < 0 ? -I : I))), A.hasOwnProperty(D = "RANGE")) if (I = A[D], I && I.pop) Be(I[0], -ze, -1, D), Be(I[1], 1, ze, D), N = I[0], O = I[1];
        else if (Be(I, -ze, ze, D), I) N = -(O = I < 0 ? -I : I);
        else throw Error(Je + D + " cannot be zero: " + I);
        if (A.hasOwnProperty(D = "CRYPTO")) if (I = A[D], I === !!I) if (I) if (typeof crypto < "u" && crypto && (crypto.getRandomValues || crypto.randomBytes)) K = I;
        else throw K = !I, Error(Je + "crypto unavailable");
        else K = I;
        else throw Error(Je + D + " not true or false: " + I);
        if (A.hasOwnProperty(D = "MODULO_MODE") && (I = A[D], Be(I, 0, 9, D), Y = I), A.hasOwnProperty(D = "POW_PRECISION") && (I = A[D], Be(I, 0, ze, D), dt = I), A.hasOwnProperty(D = "FORMAT")) if (I = A[D], typeof I == "object") _t = I;
        else throw Error(Je + D + " not an object: " + I);
        if (A.hasOwnProperty(D = "ALPHABET")) if (I = A[D], typeof I == "string" && !/^.?$|[+\-.\s]|(.).*\1/.test(I)) Pt = I.slice(0, 10) == "0123456789", Lt = I;
        else throw Error(Je + D + " invalid: " + I);
      } else throw Error(Je + "Object expected: " + A);
      return { DECIMAL_PLACES: f, ROUNDING_MODE: _, EXPONENTIAL_AT: [k, C], RANGE: [N, O], CRYPTO: K, MODULO_MODE: Y, POW_PRECISION: dt, FORMAT: _t, ALPHABET: Lt };
    }, F.isBigNumber = function(A) {
      if (!A || A._isBigNumber !== !0) return !1;
      if (!F.DEBUG) return !0;
      var D, I, W = A.c, Z = A.e, U = A.s;
      t: if ({}.toString.call(W) == "[object Array]") {
        if ((U === 1 || U === -1) && Z >= -ze && Z <= ze && Z === Ge(Z)) {
          if (W[0] === 0) {
            if (Z === 0 && W.length === 1) return !0;
            break t;
          }
          if (D = (Z + 1) % Xt, D < 1 && (D += Xt), String(W[0]).length == D) {
            for (D = 0; D < W.length; D++) if (I = W[D], I < 0 || I >= fi || I !== Ge(I)) break t;
            if (I !== 0) return !0;
          }
        }
      } else if (W === null && Z === null && (U === null || U === 1 || U === -1)) return !0;
      throw Error(Je + "Invalid BigNumber: " + A);
    }, F.maximum = F.max = function() {
      return ct(arguments, -1);
    }, F.minimum = F.min = function() {
      return ct(arguments, 1);
    }, F.random = function() {
      var A = 9007199254740992, D = Math.random() * A & 2097151 ? function() {
        return Ge(Math.random() * A);
      } : function() {
        return (Math.random() * 1073741824 | 0) * 8388608 + (Math.random() * 8388608 | 0);
      };
      return function(I) {
        var W, Z, U, it, J, et = 0, st = [], at = new F(h);
        if (I == null ? I = f : Be(I, 0, ze), it = Ee(I / Xt), K) if (crypto.getRandomValues) {
          for (W = crypto.getRandomValues(new Uint32Array(it *= 2)); et < it; ) J = W[et] * 131072 + (W[et + 1] >>> 11), J >= 9e15 ? (Z = crypto.getRandomValues(new Uint32Array(2)), W[et] = Z[0], W[et + 1] = Z[1]) : (st.push(J % 1e14), et += 2);
          et = it / 2;
        } else if (crypto.randomBytes) {
          for (W = crypto.randomBytes(it *= 7); et < it; ) J = (W[et] & 31) * 281474976710656 + W[et + 1] * 1099511627776 + W[et + 2] * 4294967296 + W[et + 3] * 16777216 + (W[et + 4] << 16) + (W[et + 5] << 8) + W[et + 6], J >= 9e15 ? crypto.randomBytes(7).copy(W, et) : (st.push(J % 1e14), et += 7);
          et = it / 7;
        } else throw K = !1, Error(Je + "crypto unavailable");
        if (!K) for (; et < it; ) J = D(), J < 9e15 && (st[et++] = J % 1e14);
        for (it = st[--et], I %= Xt, it && I && (J = ha[Xt - I], st[et] = Ge(it / J) * J); st[et] === 0; st.pop(), et--) ;
        if (et < 0) st = [U = 0];
        else {
          for (U = -1; st[0] === 0; st.splice(0, 1), U -= Xt) ;
          for (et = 1, J = st[0]; J >= 10; J /= 10, et++) ;
          et < Xt && (U -= Xt - et);
        }
        return at.e = U, at.c = st, at;
      };
    }(), F.sum = function() {
      for (var A = 1, D = arguments, I = new F(D[0]); A < D.length; ) I = I.plus(D[A++]);
      return I;
    }, r = /* @__PURE__ */ function() {
      var A = "0123456789";
      function D(I, W, Z, U) {
        for (var it, J = [0], et, st = 0, at = I.length; st < at; ) {
          for (et = J.length; et--; J[et] *= W) ;
          for (J[0] += U.indexOf(I.charAt(st++)), it = 0; it < J.length; it++) J[it] > Z - 1 && (J[it + 1] == null && (J[it + 1] = 0), J[it + 1] += J[it] / Z | 0, J[it] %= Z);
        }
        return J.reverse();
      }
      return function(I, W, Z, U, it) {
        var J, et, st, at, mt, Vt, $t, te, Pe = I.indexOf("."), Fe = f, me = _;
        for (Pe >= 0 && (at = dt, dt = 0, I = I.replace(".", ""), te = new F(W), Vt = te.pow(I.length - Pe), dt = at, te.c = D(ln(ki(Vt.c), Vt.e, "0"), 10, Z, A), te.e = te.c.length), $t = D(I, W, Z, it ? (J = Lt, A) : (J = A, Lt)), st = at = $t.length; $t[--at] == 0; $t.pop()) ;
        if (!$t[0]) return J.charAt(0);
        if (Pe < 0 ? --st : (Vt.c = $t, Vt.e = st, Vt.s = U, Vt = i(Vt, te, Fe, me, Z), $t = Vt.c, mt = Vt.r, st = Vt.e), et = st + Fe + 1, Pe = $t[et], at = Z / 2, mt = mt || et < 0 || $t[et + 1] != null, mt = me < 4 ? (Pe != null || mt) && (me == 0 || me == (Vt.s < 0 ? 3 : 2)) : Pe > at || Pe == at && (me == 4 || mt || me == 6 && $t[et - 1] & 1 || me == (Vt.s < 0 ? 8 : 7)), et < 1 || !$t[0]) I = mt ? ln(J.charAt(1), -Fe, J.charAt(0)) : J.charAt(0);
        else {
          if ($t.length = et, mt) for (--Z; ++$t[--et] > Z; ) $t[et] = 0, et || (++st, $t = [1].concat($t));
          for (at = $t.length; !$t[--at]; ) ;
          for (Pe = 0, I = ""; Pe <= at; I += J.charAt($t[Pe++])) ;
          I = ln(I, st, J.charAt(0));
        }
        return I;
      };
    }(), i = /* @__PURE__ */ function() {
      function A(W, Z, U) {
        var it, J, et, st, at = 0, mt = W.length, Vt = Z % An, $t = Z / An | 0;
        for (W = W.slice(); mt--; ) et = W[mt] % An, st = W[mt] / An | 0, it = $t * et + st * Vt, J = Vt * et + it % An * An + at, at = (J / U | 0) + (it / An | 0) + $t * st, W[mt] = J % U;
        return at && (W = [at].concat(W)), W;
      }
      function D(W, Z, U, it) {
        var J, et;
        if (U != it) et = U > it ? 1 : -1;
        else for (J = et = 0; J < U; J++) if (W[J] != Z[J]) {
          et = W[J] > Z[J] ? 1 : -1;
          break;
        }
        return et;
      }
      function I(W, Z, U, it) {
        for (var J = 0; U--; ) W[U] -= J, J = W[U] < Z[U] ? 1 : 0, W[U] = J * it + W[U] - Z[U];
        for (; !W[0] && W.length > 1; W.splice(0, 1)) ;
      }
      return function(W, Z, U, it, J) {
        var et, st, at, mt, Vt, $t, te, Pe, Fe, me, Le, Xe, Fs, jo, Vo, Ji, pa, Ci = W.s == Z.s ? 1 : -1, ni = W.c, Te = Z.c;
        if (!ni || !ni[0] || !Te || !Te[0]) return new F(!W.s || !Z.s || (ni ? Te && ni[0] == Te[0] : !Te) ? NaN : ni && ni[0] == 0 || !Te ? Ci * 0 : Ci / 0);
        for (Pe = new F(Ci), Fe = Pe.c = [], st = W.e - Z.e, Ci = U + st + 1, J || (J = fi, st = Li(W.e / Xt) - Li(Z.e / Xt), Ci = Ci / Xt | 0), at = 0; Te[at] == (ni[at] || 0); at++) ;
        if (Te[at] > (ni[at] || 0) && st--, Ci < 0) Fe.push(1), mt = !0;
        else {
          for (jo = ni.length, Ji = Te.length, at = 0, Ci += 2, Vt = Ge(J / (Te[0] + 1)), Vt > 1 && (Te = A(Te, Vt, J), ni = A(ni, Vt, J), Ji = Te.length, jo = ni.length), Fs = Ji, me = ni.slice(0, Ji), Le = me.length; Le < Ji; me[Le++] = 0) ;
          pa = Te.slice(), pa = [0].concat(pa), Vo = Te[0], Te[1] >= J / 2 && Vo++;
          do {
            if (Vt = 0, et = D(Te, me, Ji, Le), et < 0) {
              if (Xe = me[0], Ji != Le && (Xe = Xe * J + (me[1] || 0)), Vt = Ge(Xe / Vo), Vt > 1) for (Vt >= J && (Vt = J - 1), $t = A(Te, Vt, J), te = $t.length, Le = me.length; D($t, me, te, Le) == 1; ) Vt--, I($t, Ji < te ? pa : Te, te, J), te = $t.length, et = 1;
              else Vt == 0 && (et = Vt = 1), $t = Te.slice(), te = $t.length;
              if (te < Le && ($t = [0].concat($t)), I(me, $t, Le, J), Le = me.length, et == -1) for (; D(Te, me, Ji, Le) < 1; ) Vt++, I(me, Ji < Le ? pa : Te, Le, J), Le = me.length;
            } else et === 0 && (Vt++, me = [0]);
            Fe[at++] = Vt, me[0] ? me[Le++] = ni[Fs] || 0 : (me = [ni[Fs]], Le = 1);
          } while ((Fs++ < jo || me[0] != null) && Ci--);
          mt = me[0] != null, Fe[0] || Fe.splice(0, 1);
        }
        if (J == fi) {
          for (at = 1, Ci = Fe[0]; Ci >= 10; Ci /= 10, at++) ;
          yt(Pe, U + (Pe.e = at + st * Xt - 1) + 1, it, mt);
        } else Pe.e = st, Pe.r = +mt;
        return Pe;
      };
    }();
    function nt(A, D, I, W) {
      var Z, U, it, J, et;
      if (I == null ? I = _ : Be(I, 0, 8), !A.c) return A.toString();
      if (Z = A.c[0], it = A.e, D == null) et = ki(A.c), et = W == 1 || W == 2 && (it <= k || it >= C) ? Ms(et, it) : ln(et, it, "0");
      else if (A = yt(new F(A), D, I), U = A.e, et = ki(A.c), J = et.length, W == 1 || W == 2 && (D <= U || U <= k)) {
        for (; J < D; et += "0", J++) ;
        et = Ms(et, U);
      } else if (D -= it + (W === 2 && U > it), et = ln(et, U, "0"), U + 1 > J) {
        if (--D > 0) for (et += "."; D--; et += "0") ;
      } else if (D += U - J, D > 0) for (U + 1 == J && (et += "."); D--; et += "0") ;
      return A.s < 0 && Z ? "-" + et : et;
    }
    function ct(A, D) {
      for (var I, W, Z = 1, U = new F(A[0]); Z < A.length; Z++) W = new F(A[Z]), (!W.s || (I = Hn(U, W)) === D || I === 0 && U.s === D) && (U = W);
      return U;
    }
    function vt(A, D, I) {
      for (var W = 1, Z = D.length; !D[--Z]; D.pop()) ;
      for (Z = D[0]; Z >= 10; Z /= 10, W++) ;
      return (I = W + I * Xt - 1) > O ? A.c = A.e = null : I < N ? A.c = [A.e = 0] : (A.e = I, A.c = D), A;
    }
    a = /* @__PURE__ */ function() {
      var A = /^(-?)0([xbo])(?=\w[\w.]*$)/i, D = /^([^.]+)\.$/, I = /^\.([^.]+)$/, W = /^-?(Infinity|NaN)$/, Z = /^\s*\+(?=[\w.])|^\s+|\s+$/g;
      return function(U, it, J, et) {
        var st, at = J ? it : it.replace(Z, "");
        if (W.test(at)) U.s = isNaN(at) ? null : at < 0 ? -1 : 1;
        else {
          if (!J && (at = at.replace(A, function(mt, Vt, $t) {
            return st = ($t = $t.toLowerCase()) == "x" ? 16 : $t == "b" ? 2 : 8, !et || et == st ? Vt : mt;
          }), et && (st = et, at = at.replace(D, "$1").replace(I, "0.$1")), it != at)) return new F(at, st);
          if (F.DEBUG) throw Error(Je + "Not a" + (et ? " base " + et : "") + " number: " + it);
          U.s = null;
        }
        U.c = U.e = null;
      };
    }();
    function yt(A, D, I, W) {
      var Z, U, it, J, et, st, at, mt = A.c, Vt = ha;
      if (mt) {
        t: {
          for (Z = 1, J = mt[0]; J >= 10; J /= 10, Z++) ;
          if (U = D - Z, U < 0) U += Xt, it = D, et = mt[st = 0], at = Ge(et / Vt[Z - it - 1] % 10);
          else if (st = Ee((U + 1) / Xt), st >= mt.length) if (W) {
            for (; mt.length <= st; mt.push(0)) ;
            et = at = 0, Z = 1, U %= Xt, it = U - Xt + 1;
          } else break t;
          else {
            for (et = J = mt[st], Z = 1; J >= 10; J /= 10, Z++) ;
            U %= Xt, it = U - Xt + Z, at = it < 0 ? 0 : Ge(et / Vt[Z - it - 1] % 10);
          }
          if (W = W || D < 0 || mt[st + 1] != null || (it < 0 ? et : et % Vt[Z - it - 1]), W = I < 4 ? (at || W) && (I == 0 || I == (A.s < 0 ? 3 : 2)) : at > 5 || at == 5 && (I == 4 || W || I == 6 && (U > 0 ? it > 0 ? et / Vt[Z - it] : 0 : mt[st - 1]) % 10 & 1 || I == (A.s < 0 ? 8 : 7)), D < 1 || !mt[0]) return mt.length = 0, W ? (D -= A.e + 1, mt[0] = Vt[(Xt - D % Xt) % Xt], A.e = -D || 0) : mt[0] = A.e = 0, A;
          if (U == 0 ? (mt.length = st, J = 1, st--) : (mt.length = st + 1, J = Vt[Xt - U], mt[st] = it > 0 ? Ge(et / Vt[Z - it] % Vt[it]) * J : 0), W) for (; ; ) if (st == 0) {
            for (U = 1, it = mt[0]; it >= 10; it /= 10, U++) ;
            for (it = mt[0] += J, J = 1; it >= 10; it /= 10, J++) ;
            U != J && (A.e++, mt[0] == fi && (mt[0] = 1));
            break;
          } else {
            if (mt[st] += J, mt[st] != fi) break;
            mt[st--] = 0, J = 1;
          }
          for (U = mt.length; mt[--U] === 0; mt.pop()) ;
        }
        A.e > O ? A.c = A.e = null : A.e < N && (A.c = [A.e = 0]);
      }
      return A;
    }
    function bt(A) {
      var D, I = A.e;
      return I === null ? A.toString() : (D = ki(A.c), D = I <= k || I >= C ? Ms(D, I) : ln(D, I, "0"), A.s < 0 ? "-" + D : D);
    }
    return o.absoluteValue = o.abs = function() {
      var A = new F(this);
      return A.s < 0 && (A.s = 1), A;
    }, o.comparedTo = function(A, D) {
      return Hn(this, new F(A, D));
    }, o.decimalPlaces = o.dp = function(A, D) {
      var I, W, Z, U = this;
      if (A != null) return Be(A, 0, ze), D == null ? D = _ : Be(D, 0, 8), yt(new F(U), A + U.e + 1, D);
      if (!(I = U.c)) return null;
      if (W = ((Z = I.length - 1) - Li(this.e / Xt)) * Xt, Z = I[Z]) for (; Z % 10 == 0; Z /= 10, W--) ;
      return W < 0 && (W = 0), W;
    }, o.dividedBy = o.div = function(A, D) {
      return i(this, new F(A, D), f, _);
    }, o.dividedToIntegerBy = o.idiv = function(A, D) {
      return i(this, new F(A, D), 0, 1);
    }, o.exponentiatedBy = o.pow = function(A, D) {
      var I, W, Z, U, it, J, et, st, at, mt = this;
      if (A = new F(A), A.c && !A.isInteger()) throw Error(Je + "Exponent not an integer: " + bt(A));
      if (D != null && (D = new F(D)), J = A.e > 14, !mt.c || !mt.c[0] || mt.c[0] == 1 && !mt.e && mt.c.length == 1 || !A.c || !A.c[0]) return at = new F(Math.pow(+bt(mt), J ? A.s * (2 - Es(A)) : +bt(A))), D ? at.mod(D) : at;
      if (et = A.s < 0, D) {
        if (D.c ? !D.c[0] : !D.s) return new F(NaN);
        W = !et && mt.isInteger() && D.isInteger(), W && (mt = mt.mod(D));
      } else {
        if (A.e > 9 && (mt.e > 0 || mt.e < -1 || (mt.e == 0 ? mt.c[0] > 1 || J && mt.c[1] >= 24e7 : mt.c[0] < 8e13 || J && mt.c[0] <= 9999975e7))) return U = mt.s < 0 && Es(A) ? -0 : 0, mt.e > -1 && (U = 1 / U), new F(et ? 1 / U : U);
        dt && (U = Ee(dt / Xt + 2));
      }
      for (J ? (I = new F(0.5), et && (A.s = 1), st = Es(A)) : (Z = Math.abs(+bt(A)), st = Z % 2), at = new F(h); ; ) {
        if (st) {
          if (at = at.times(mt), !at.c) break;
          U ? at.c.length > U && (at.c.length = U) : W && (at = at.mod(D));
        }
        if (Z) {
          if (Z = Ge(Z / 2), Z === 0) break;
          st = Z % 2;
        } else if (A = A.times(I), yt(A, A.e + 1, 1), A.e > 14) st = Es(A);
        else {
          if (Z = +bt(A), Z === 0) break;
          st = Z % 2;
        }
        mt = mt.times(mt), U ? mt.c && mt.c.length > U && (mt.c.length = U) : W && (mt = mt.mod(D));
      }
      return W ? at : (et && (at = h.div(at)), D ? at.mod(D) : U ? yt(at, dt, _, it) : at);
    }, o.integerValue = function(A) {
      var D = new F(this);
      return A == null ? A = _ : Be(A, 0, 8), yt(D, D.e + 1, A);
    }, o.isEqualTo = o.eq = function(A, D) {
      return Hn(this, new F(A, D)) === 0;
    }, o.isFinite = function() {
      return !!this.c;
    }, o.isGreaterThan = o.gt = function(A, D) {
      return Hn(this, new F(A, D)) > 0;
    }, o.isGreaterThanOrEqualTo = o.gte = function(A, D) {
      return (D = Hn(this, new F(A, D))) === 1 || D === 0;
    }, o.isInteger = function() {
      return !!this.c && Li(this.e / Xt) > this.c.length - 2;
    }, o.isLessThan = o.lt = function(A, D) {
      return Hn(this, new F(A, D)) < 0;
    }, o.isLessThanOrEqualTo = o.lte = function(A, D) {
      return (D = Hn(this, new F(A, D))) === -1 || D === 0;
    }, o.isNaN = function() {
      return !this.s;
    }, o.isNegative = function() {
      return this.s < 0;
    }, o.isPositive = function() {
      return this.s > 0;
    }, o.isZero = function() {
      return !!this.c && this.c[0] == 0;
    }, o.minus = function(A, D) {
      var I, W, Z, U, it = this, J = it.s;
      if (A = new F(A, D), D = A.s, !J || !D) return new F(NaN);
      if (J != D) return A.s = -D, it.plus(A);
      var et = it.e / Xt, st = A.e / Xt, at = it.c, mt = A.c;
      if (!et || !st) {
        if (!at || !mt) return at ? (A.s = -D, A) : new F(mt ? it : NaN);
        if (!at[0] || !mt[0]) return mt[0] ? (A.s = -D, A) : new F(at[0] ? it : _ == 3 ? -0 : 0);
      }
      if (et = Li(et), st = Li(st), at = at.slice(), J = et - st) {
        for ((U = J < 0) ? (J = -J, Z = at) : (st = et, Z = mt), Z.reverse(), D = J; D--; Z.push(0)) ;
        Z.reverse();
      } else for (W = (U = (J = at.length) < (D = mt.length)) ? J : D, J = D = 0; D < W; D++) if (at[D] != mt[D]) {
        U = at[D] < mt[D];
        break;
      }
      if (U && (Z = at, at = mt, mt = Z, A.s = -A.s), D = (W = mt.length) - (I = at.length), D > 0) for (; D--; at[I++] = 0) ;
      for (D = fi - 1; W > J; ) {
        if (at[--W] < mt[W]) {
          for (I = W; I && !at[--I]; at[I] = D) ;
          --at[I], at[W] += fi;
        }
        at[W] -= mt[W];
      }
      for (; at[0] == 0; at.splice(0, 1), --st) ;
      return at[0] ? vt(A, at, st) : (A.s = _ == 3 ? -1 : 1, A.c = [A.e = 0], A);
    }, o.modulo = o.mod = function(A, D) {
      var I, W, Z = this;
      return A = new F(A, D), !Z.c || !A.s || A.c && !A.c[0] ? new F(NaN) : !A.c || Z.c && !Z.c[0] ? new F(Z) : (Y == 9 ? (W = A.s, A.s = 1, I = i(Z, A, 0, 3), A.s = W, I.s *= W) : I = i(Z, A, 0, Y), A = Z.minus(I.times(A)), !A.c[0] && Y == 1 && (A.s = Z.s), A);
    }, o.multipliedBy = o.times = function(A, D) {
      var I, W, Z, U, it, J, et, st, at, mt, Vt, $t, te, Pe, Fe, me = this, Le = me.c, Xe = (A = new F(A, D)).c;
      if (!Le || !Xe || !Le[0] || !Xe[0]) return !me.s || !A.s || Le && !Le[0] && !Xe || Xe && !Xe[0] && !Le ? A.c = A.e = A.s = null : (A.s *= me.s, !Le || !Xe ? A.c = A.e = null : (A.c = [0], A.e = 0)), A;
      for (W = Li(me.e / Xt) + Li(A.e / Xt), A.s *= me.s, et = Le.length, mt = Xe.length, et < mt && (te = Le, Le = Xe, Xe = te, Z = et, et = mt, mt = Z), Z = et + mt, te = []; Z--; te.push(0)) ;
      for (Pe = fi, Fe = An, Z = mt; --Z >= 0; ) {
        for (I = 0, Vt = Xe[Z] % Fe, $t = Xe[Z] / Fe | 0, it = et, U = Z + it; U > Z; ) st = Le[--it] % Fe, at = Le[it] / Fe | 0, J = $t * st + at * Vt, st = Vt * st + J % Fe * Fe + te[U] + I, I = (st / Pe | 0) + (J / Fe | 0) + $t * at, te[U--] = st % Pe;
        te[U] = I;
      }
      return I ? ++W : te.splice(0, 1), vt(A, te, W);
    }, o.negated = function() {
      var A = new F(this);
      return A.s = -A.s || null, A;
    }, o.plus = function(A, D) {
      var I, W = this, Z = W.s;
      if (A = new F(A, D), D = A.s, !Z || !D) return new F(NaN);
      if (Z != D) return A.s = -D, W.minus(A);
      var U = W.e / Xt, it = A.e / Xt, J = W.c, et = A.c;
      if (!U || !it) {
        if (!J || !et) return new F(Z / 0);
        if (!J[0] || !et[0]) return et[0] ? A : new F(J[0] ? W : Z * 0);
      }
      if (U = Li(U), it = Li(it), J = J.slice(), Z = U - it) {
        for (Z > 0 ? (it = U, I = et) : (Z = -Z, I = J), I.reverse(); Z--; I.push(0)) ;
        I.reverse();
      }
      for (Z = J.length, D = et.length, Z - D < 0 && (I = et, et = J, J = I, D = Z), Z = 0; D; ) Z = (J[--D] = J[D] + et[D] + Z) / fi | 0, J[D] = fi === J[D] ? 0 : J[D] % fi;
      return Z && (J = [Z].concat(J), ++it), vt(A, J, it);
    }, o.precision = o.sd = function(A, D) {
      var I, W, Z, U = this;
      if (A != null && A !== !!A) return Be(A, 1, ze), D == null ? D = _ : Be(D, 0, 8), yt(new F(U), A, D);
      if (!(I = U.c)) return null;
      if (Z = I.length - 1, W = Z * Xt + 1, Z = I[Z]) {
        for (; Z % 10 == 0; Z /= 10, W--) ;
        for (Z = I[0]; Z >= 10; Z /= 10, W++) ;
      }
      return A && U.e + 1 > W && (W = U.e + 1), W;
    }, o.shiftedBy = function(A) {
      return Be(A, -vr, vr), this.times("1e" + A);
    }, o.squareRoot = o.sqrt = function() {
      var A, D, I, W, Z, U = this, it = U.c, J = U.s, et = U.e, st = f + 4, at = new F("0.5");
      if (J !== 1 || !it || !it[0]) return new F(!J || J < 0 && (!it || it[0]) ? NaN : it ? U : 1 / 0);
      if (J = Math.sqrt(+bt(U)), J == 0 || J == 1 / 0 ? (D = ki(it), (D.length + et) % 2 == 0 && (D += "0"), J = Math.sqrt(+D), et = Li((et + 1) / 2) - (et < 0 || et % 2), J == 1 / 0 ? D = "5e" + et : (D = J.toExponential(), D = D.slice(0, D.indexOf("e") + 1) + et), I = new F(D)) : I = new F(J + ""), I.c[0]) {
        for (et = I.e, J = et + st, J < 3 && (J = 0); ; ) if (Z = I, I = at.times(Z.plus(i(U, Z, st, 1))), ki(Z.c).slice(0, J) === (D = ki(I.c)).slice(0, J)) if (I.e < et && --J, D = D.slice(J - 3, J + 1), D == "9999" || !W && D == "4999") {
          if (!W && (yt(Z, Z.e + f + 2, 0), Z.times(Z).eq(U))) {
            I = Z;
            break;
          }
          st += 4, J += 4, W = 1;
        } else {
          (!+D || !+D.slice(1) && D.charAt(0) == "5") && (yt(I, I.e + f + 2, 1), A = !I.times(I).eq(U));
          break;
        }
      }
      return yt(I, I.e + f + 1, _, A);
    }, o.toExponential = function(A, D) {
      return A != null && (Be(A, 0, ze), A++), nt(this, A, D, 1);
    }, o.toFixed = function(A, D) {
      return A != null && (Be(A, 0, ze), A = A + this.e + 1), nt(this, A, D);
    }, o.toFormat = function(A, D, I) {
      var W, Z = this;
      if (I == null) A != null && D && typeof D == "object" ? (I = D, D = null) : A && typeof A == "object" ? (I = A, A = D = null) : I = _t;
      else if (typeof I != "object") throw Error(Je + "Argument not an object: " + I);
      if (W = Z.toFixed(A, D), Z.c) {
        var U, it = W.split("."), J = +I.groupSize, et = +I.secondaryGroupSize, st = I.groupSeparator || "", at = it[0], mt = it[1], Vt = Z.s < 0, $t = Vt ? at.slice(1) : at, te = $t.length;
        if (et && (U = J, J = et, et = U, te -= U), J > 0 && te > 0) {
          for (U = te % J || J, at = $t.substr(0, U); U < te; U += J) at += st + $t.substr(U, J);
          et > 0 && (at += st + $t.slice(U)), Vt && (at = "-" + at);
        }
        W = mt ? at + (I.decimalSeparator || "") + ((et = +I.fractionGroupSize) ? mt.replace(new RegExp("\\d{" + et + "}\\B", "g"), "$&" + (I.fractionGroupSeparator || "")) : mt) : at;
      }
      return (I.prefix || "") + W + (I.suffix || "");
    }, o.toFraction = function(A) {
      var D, I, W, Z, U, it, J, et, st, at, mt, Vt, $t = this, te = $t.c;
      if (A != null && (J = new F(A), !J.isInteger() && (J.c || J.s !== 1) || J.lt(h))) throw Error(Je + "Argument " + (J.isInteger() ? "out of range: " : "not an integer: ") + bt(J));
      if (!te) return new F($t);
      for (D = new F(h), st = I = new F(h), W = et = new F(h), Vt = ki(te), U = D.e = Vt.length - $t.e - 1, D.c[0] = ha[(it = U % Xt) < 0 ? Xt + it : it], A = !A || J.comparedTo(D) > 0 ? U > 0 ? D : st : J, it = O, O = 1 / 0, J = new F(Vt), et.c[0] = 0; at = i(J, D, 0, 1), Z = I.plus(at.times(W)), Z.comparedTo(A) != 1; ) I = W, W = Z, st = et.plus(at.times(Z = st)), et = Z, D = J.minus(at.times(Z = D)), J = Z;
      return Z = i(A.minus(I), W, 0, 1), et = et.plus(Z.times(st)), I = I.plus(Z.times(W)), et.s = st.s = $t.s, U = U * 2, mt = i(st, W, U, _).minus($t).abs().comparedTo(i(et, I, U, _).minus($t).abs()) < 1 ? [st, W] : [et, I], O = it, mt;
    }, o.toNumber = function() {
      return +bt(this);
    }, o.toPrecision = function(A, D) {
      return A != null && Be(A, 1, ze), nt(this, A, D, 2);
    }, o.toString = function(A) {
      var D, I = this, W = I.s, Z = I.e;
      return Z === null ? W ? (D = "Infinity", W < 0 && (D = "-" + D)) : D = "NaN" : (A == null ? D = Z <= k || Z >= C ? Ms(ki(I.c), Z) : ln(ki(I.c), Z, "0") : A === 10 && Pt ? (I = yt(new F(I), f + Z + 1, _), D = ln(ki(I.c), I.e, "0")) : (Be(A, 2, Lt.length, "Base"), D = r(ln(ki(I.c), Z, "0"), 10, A, W, !0)), W < 0 && I.c[0] && (D = "-" + D)), D;
    }, o.valueOf = o.toJSON = function() {
      return bt(this);
    }, o._isBigNumber = !0, o[Symbol.toStringTag] = "BigNumber", o[Symbol.for("nodejs.util.inspect.custom")] = o.valueOf, e != null && F.set(e), F;
  }
  function Li(e) {
    var i = e | 0;
    return e > 0 || e === i ? i : i - 1;
  }
  function ki(e) {
    for (var i, r, a = 1, o = e.length, h = e[0] + ""; a < o; ) {
      for (i = e[a++] + "", r = Xt - i.length; r--; i = "0" + i) ;
      h += i;
    }
    for (o = h.length; h.charCodeAt(--o) === 48; ) ;
    return h.slice(0, o + 1 || 1);
  }
  function Hn(e, i) {
    var r, a, o = e.c, h = i.c, f = e.s, _ = i.s, k = e.e, C = i.e;
    if (!f || !_) return null;
    if (r = o && !o[0], a = h && !h[0], r || a) return r ? a ? 0 : -_ : f;
    if (f != _) return f;
    if (r = f < 0, a = k == C, !o || !h) return a ? 0 : !o ^ r ? 1 : -1;
    if (!a) return k > C ^ r ? 1 : -1;
    for (_ = (k = o.length) < (C = h.length) ? k : C, f = 0; f < _; f++) if (o[f] != h[f]) return o[f] > h[f] ^ r ? 1 : -1;
    return k == C ? 0 : k > C ^ r ? 1 : -1;
  }
  function Be(e, i, r, a) {
    if (e < i || e > r || e !== Ge(e)) throw Error(Je + (a || "Argument") + (typeof e == "number" ? e < i || e > r ? " out of range: " : " not an integer: " : " not a primitive number: ") + String(e));
  }
  function Es(e) {
    var i = e.c.length - 1;
    return Li(e.e / Xt) == i && e.c[i] % 2 != 0;
  }
  function Ms(e, i) {
    return (e.length > 1 ? e.charAt(0) + "." + e.slice(1) : e) + (i < 0 ? "e" : "e+") + i;
  }
  function ln(e, i, r) {
    var a, o;
    if (i < 0) {
      for (o = r + "."; ++i; o += r) ;
      e = o + e;
    } else if (a = e.length, ++i > a) {
      for (o = r, i -= a; --i; o += r) ;
      e += o;
    } else i < a && (e = e.slice(0, i) + "." + e.slice(i));
    return e;
  }
  var mu = al(), Ki = mu, gu = class {
    constructor(e) {
      qt(this, "key");
      qt(this, "left", null);
      qt(this, "right", null);
      this.key = e;
    }
  }, ca = class extends gu {
    constructor(e) {
      super(e);
    }
  }, _u = class {
    constructor() {
      qt(this, "size", 0);
      qt(this, "modificationCount", 0);
      qt(this, "splayCount", 0);
    }
    splay(e) {
      let i = this.root;
      if (i == null) return this.compare(e, e), -1;
      let r = null, a = null, o = null, h = null, f = i, _ = this.compare, k;
      for (; ; ) if (k = _(f.key, e), k > 0) {
        let C = f.left;
        if (C == null || (k = _(C.key, e), k > 0 && (f.left = C.right, C.right = f, f = C, C = f.left, C == null))) break;
        r == null ? a = f : r.left = f, r = f, f = C;
      } else if (k < 0) {
        let C = f.right;
        if (C == null || (k = _(C.key, e), k < 0 && (f.right = C.left, C.left = f, f = C, C = f.right, C == null))) break;
        o == null ? h = f : o.right = f, o = f, f = C;
      } else break;
      return o != null && (o.right = f.left, f.left = h), r != null && (r.left = f.right, f.right = a), this.root !== f && (this.root = f, this.splayCount++), k;
    }
    splayMin(e) {
      let i = e, r = i.left;
      for (; r != null; ) {
        let a = r;
        i.left = a.right, a.right = i, i = a, r = i.left;
      }
      return i;
    }
    splayMax(e) {
      let i = e, r = i.right;
      for (; r != null; ) {
        let a = r;
        i.right = a.left, a.left = i, i = a, r = i.right;
      }
      return i;
    }
    _delete(e) {
      if (this.root == null || this.splay(e) != 0) return null;
      let i = this.root, r = i, a = i.left;
      if (this.size--, a == null) this.root = i.right;
      else {
        let o = i.right;
        i = this.splayMax(a), i.right = o, this.root = i;
      }
      return this.modificationCount++, r;
    }
    addNewRoot(e, i) {
      this.size++, this.modificationCount++;
      let r = this.root;
      if (r == null) {
        this.root = e;
        return;
      }
      i < 0 ? (e.left = r, e.right = r.right, r.right = null) : (e.right = r, e.left = r.left, r.left = null), this.root = e;
    }
    _first() {
      let e = this.root;
      return e == null ? null : (this.root = this.splayMin(e), this.root);
    }
    _last() {
      let e = this.root;
      return e == null ? null : (this.root = this.splayMax(e), this.root);
    }
    clear() {
      this.root = null, this.size = 0, this.modificationCount++;
    }
    has(e) {
      return this.validKey(e) && this.splay(e) == 0;
    }
    defaultCompare() {
      return (e, i) => e < i ? -1 : e > i ? 1 : 0;
    }
    wrap() {
      return { getRoot: () => this.root, setRoot: (e) => {
        this.root = e;
      }, getSize: () => this.size, getModificationCount: () => this.modificationCount, getSplayCount: () => this.splayCount, setSplayCount: (e) => {
        this.splayCount = e;
      }, splay: (e) => this.splay(e), has: (e) => this.has(e) };
    }
  }, Bs = class ka extends _u {
    constructor(r, a) {
      super();
      qt(this, "root", null);
      qt(this, "compare");
      qt(this, "validKey");
      qt(this, vl, "[object Set]");
      this.compare = r ?? this.defaultCompare(), this.validKey = a ?? ((o) => o != null && o != null);
    }
    delete(r) {
      return this.validKey(r) ? this._delete(r) != null : !1;
    }
    deleteAll(r) {
      for (let a of r) this.delete(a);
    }
    forEach(r) {
      let a = this[Symbol.iterator](), o;
      for (; o = a.next(), !o.done; ) r(o.value, o.value, this);
    }
    add(r) {
      let a = this.splay(r);
      return a != 0 && this.addNewRoot(new ca(r), a), this;
    }
    addAndReturn(r) {
      let a = this.splay(r);
      return a != 0 && this.addNewRoot(new ca(r), a), this.root.key;
    }
    addAll(r) {
      for (let a of r) this.add(a);
    }
    isEmpty() {
      return this.root == null;
    }
    isNotEmpty() {
      return this.root != null;
    }
    single() {
      if (this.size == 0) throw "Bad state: No element";
      if (this.size > 1) throw "Bad state: Too many element";
      return this.root.key;
    }
    first() {
      if (this.size == 0) throw "Bad state: No element";
      return this._first().key;
    }
    last() {
      if (this.size == 0) throw "Bad state: No element";
      return this._last().key;
    }
    lastBefore(r) {
      if (r == null) throw "Invalid arguments(s)";
      if (this.root == null) return null;
      if (this.splay(r) < 0) return this.root.key;
      let a = this.root.left;
      if (a == null) return null;
      let o = a.right;
      for (; o != null; ) a = o, o = a.right;
      return a.key;
    }
    firstAfter(r) {
      if (r == null) throw "Invalid arguments(s)";
      if (this.root == null) return null;
      if (this.splay(r) > 0) return this.root.key;
      let a = this.root.right;
      if (a == null) return null;
      let o = a.left;
      for (; o != null; ) a = o, o = a.left;
      return a.key;
    }
    retainAll(r) {
      let a = new ka(this.compare, this.validKey), o = this.modificationCount;
      for (let h of r) {
        if (o != this.modificationCount) throw "Concurrent modification during iteration.";
        this.validKey(h) && this.splay(h) == 0 && a.add(this.root.key);
      }
      a.size != this.size && (this.root = a.root, this.size = a.size, this.modificationCount++);
    }
    lookup(r) {
      return !this.validKey(r) || this.splay(r) != 0 ? null : this.root.key;
    }
    intersection(r) {
      let a = new ka(this.compare, this.validKey);
      for (let o of this) r.has(o) && a.add(o);
      return a;
    }
    difference(r) {
      let a = new ka(this.compare, this.validKey);
      for (let o of this) r.has(o) || a.add(o);
      return a;
    }
    union(r) {
      let a = this.clone();
      return a.addAll(r), a;
    }
    clone() {
      let r = new ka(this.compare, this.validKey);
      return r.size = this.size, r.root = this.copyNode(this.root), r;
    }
    copyNode(r) {
      if (r == null) return null;
      function a(h, f) {
        let _, k;
        do {
          if (_ = h.left, k = h.right, _ != null) {
            let C = new ca(_.key);
            f.left = C, a(_, C);
          }
          if (k != null) {
            let C = new ca(k.key);
            f.right = C, h = k, f = C;
          }
        } while (k != null);
      }
      let o = new ca(r.key);
      return a(r, o), o;
    }
    toSet() {
      return this.clone();
    }
    entries() {
      return new vu(this.wrap());
    }
    keys() {
      return this[Symbol.iterator]();
    }
    values() {
      return this[Symbol.iterator]();
    }
    [(bl = Symbol.iterator, vl = Symbol.toStringTag, bl)]() {
      return new yu(this.wrap());
    }
  }, sl = class {
    constructor(e) {
      qt(this, "tree");
      qt(this, "path", new Array());
      qt(this, "modificationCount", null);
      qt(this, "splayCount");
      this.tree = e, this.splayCount = e.getSplayCount();
    }
    [Symbol.iterator]() {
      return this;
    }
    next() {
      return this.moveNext() ? { done: !1, value: this.current() } : { done: !0, value: null };
    }
    current() {
      if (!this.path.length) return null;
      let e = this.path[this.path.length - 1];
      return this.getValue(e);
    }
    rebuildPath(e) {
      this.path.splice(0, this.path.length), this.tree.splay(e), this.path.push(this.tree.getRoot()), this.splayCount = this.tree.getSplayCount();
    }
    findLeftMostDescendent(e) {
      for (; e != null; ) this.path.push(e), e = e.left;
    }
    moveNext() {
      if (this.modificationCount != this.tree.getModificationCount()) {
        if (this.modificationCount == null) {
          this.modificationCount = this.tree.getModificationCount();
          let r = this.tree.getRoot();
          for (; r != null; ) this.path.push(r), r = r.left;
          return this.path.length > 0;
        }
        throw "Concurrent modification during iteration.";
      }
      if (!this.path.length) return !1;
      this.splayCount != this.tree.getSplayCount() && this.rebuildPath(this.path[this.path.length - 1].key);
      let e = this.path[this.path.length - 1], i = e.right;
      if (i != null) {
        for (; i != null; ) this.path.push(i), i = i.left;
        return !0;
      }
      for (this.path.pop(); this.path.length && this.path[this.path.length - 1].right === e; ) e = this.path.pop();
      return this.path.length > 0;
    }
  }, yu = class extends sl {
    getValue(e) {
      return e.key;
    }
  }, vu = class extends sl {
    getValue(e) {
      return [e.key, e.key];
    }
  }, ol = (e) => () => e, Fo = (e) => {
    let i = e ? (r, a) => a.minus(r).abs().isLessThanOrEqualTo(e) : ol(!1);
    return (r, a) => i(r, a) ? 0 : r.comparedTo(a);
  };
  function bu(e) {
    let i = e ? (r, a, o, h, f) => r.exponentiatedBy(2).isLessThanOrEqualTo(h.minus(a).exponentiatedBy(2).plus(f.minus(o).exponentiatedBy(2)).times(e)) : ol(!1);
    return (r, a, o) => {
      let h = r.x, f = r.y, _ = o.x, k = o.y, C = f.minus(k).times(a.x.minus(_)).minus(h.minus(_).times(a.y.minus(k)));
      return i(C, h, f, _, k) ? 0 : C.comparedTo(0);
    };
  }
  var xu = (e) => e, wu = (e) => {
    if (e) {
      let i = new Bs(Fo(e)), r = new Bs(Fo(e)), a = (h, f) => f.addAndReturn(h), o = (h) => ({ x: a(h.x, i), y: a(h.y, r) });
      return o({ x: new Ki(0), y: new Ki(0) }), o;
    }
    return xu;
  }, Ro = (e) => ({ set: (i) => {
    un = Ro(i);
  }, reset: () => Ro(e), compare: Fo(e), snap: wu(e), orient: bu(e) }), un = Ro(), da = (e, i) => e.ll.x.isLessThanOrEqualTo(i.x) && i.x.isLessThanOrEqualTo(e.ur.x) && e.ll.y.isLessThanOrEqualTo(i.y) && i.y.isLessThanOrEqualTo(e.ur.y), zo = (e, i) => {
    if (i.ur.x.isLessThan(e.ll.x) || e.ur.x.isLessThan(i.ll.x) || i.ur.y.isLessThan(e.ll.y) || e.ur.y.isLessThan(i.ll.y)) return null;
    let r = e.ll.x.isLessThan(i.ll.x) ? i.ll.x : e.ll.x, a = e.ur.x.isLessThan(i.ur.x) ? e.ur.x : i.ur.x, o = e.ll.y.isLessThan(i.ll.y) ? i.ll.y : e.ll.y, h = e.ur.y.isLessThan(i.ur.y) ? e.ur.y : i.ur.y;
    return { ll: { x: r, y: o }, ur: { x: a, y: h } };
  }, As = (e, i) => e.x.times(i.y).minus(e.y.times(i.x)), ll = (e, i) => e.x.times(i.x).plus(e.y.times(i.y)), Ss = (e) => ll(e, e).sqrt(), Lu = (e, i, r) => {
    let a = { x: i.x.minus(e.x), y: i.y.minus(e.y) }, o = { x: r.x.minus(e.x), y: r.y.minus(e.y) };
    return As(o, a).div(Ss(o)).div(Ss(a));
  }, ku = (e, i, r) => {
    let a = { x: i.x.minus(e.x), y: i.y.minus(e.y) }, o = { x: r.x.minus(e.x), y: r.y.minus(e.y) };
    return ll(o, a).div(Ss(o)).div(Ss(a));
  }, ul = (e, i, r) => i.y.isZero() ? null : { x: e.x.plus(i.x.div(i.y).times(r.minus(e.y))), y: r }, hl = (e, i, r) => i.x.isZero() ? null : { x: r, y: e.y.plus(i.y.div(i.x).times(r.minus(e.x))) }, Cu = (e, i, r, a) => {
    if (i.x.isZero()) return hl(r, a, e.x);
    if (a.x.isZero()) return hl(e, i, r.x);
    if (i.y.isZero()) return ul(r, a, e.y);
    if (a.y.isZero()) return ul(e, i, r.y);
    let o = As(i, a);
    if (o.isZero()) return null;
    let h = { x: r.x.minus(e.x), y: r.y.minus(e.y) }, f = As(h, i).div(o), _ = As(h, a).div(o), k = e.x.plus(_.times(i.x)), C = r.x.plus(f.times(a.x)), N = e.y.plus(_.times(i.y)), O = r.y.plus(f.times(a.y)), K = k.plus(C).div(2), Y = N.plus(O).div(2);
    return { x: K, y: Y };
  }, Wi = class Gl {
    constructor(i, r) {
      qt(this, "point");
      qt(this, "isLeft");
      qt(this, "segment");
      qt(this, "otherSE");
      qt(this, "consumedBy");
      i.events === void 0 ? i.events = [this] : i.events.push(this), this.point = i, this.isLeft = r;
    }
    static compare(i, r) {
      let a = Gl.comparePoints(i.point, r.point);
      return a !== 0 ? a : (i.point !== r.point && i.link(r), i.isLeft !== r.isLeft ? i.isLeft ? 1 : -1 : Ts.compare(i.segment, r.segment));
    }
    static comparePoints(i, r) {
      return i.x.isLessThan(r.x) ? -1 : i.x.isGreaterThan(r.x) ? 1 : i.y.isLessThan(r.y) ? -1 : i.y.isGreaterThan(r.y) ? 1 : 0;
    }
    link(i) {
      if (i.point === this.point) throw new Error("Tried to link already linked events");
      let r = i.point.events;
      for (let a = 0, o = r.length; a < o; a++) {
        let h = r[a];
        this.point.events.push(h), h.point = this.point;
      }
      this.checkForConsuming();
    }
    checkForConsuming() {
      let i = this.point.events.length;
      for (let r = 0; r < i; r++) {
        let a = this.point.events[r];
        if (a.segment.consumedBy === void 0) for (let o = r + 1; o < i; o++) {
          let h = this.point.events[o];
          h.consumedBy === void 0 && a.otherSE.point.events === h.otherSE.point.events && a.segment.consume(h.segment);
        }
      }
    }
    getAvailableLinkedEvents() {
      let i = [];
      for (let r = 0, a = this.point.events.length; r < a; r++) {
        let o = this.point.events[r];
        o !== this && !o.segment.ringOut && o.segment.isInResult() && i.push(o);
      }
      return i;
    }
    getLeftmostComparator(i) {
      let r = /* @__PURE__ */ new Map(), a = (o) => {
        let h = o.otherSE;
        r.set(o, { sine: Lu(this.point, i.point, h.point), cosine: ku(this.point, i.point, h.point) });
      };
      return (o, h) => {
        r.has(o) || a(o), r.has(h) || a(h);
        let { sine: f, cosine: _ } = r.get(o), { sine: k, cosine: C } = r.get(h);
        return f.isGreaterThanOrEqualTo(0) && k.isGreaterThanOrEqualTo(0) ? _.isLessThan(C) ? 1 : _.isGreaterThan(C) ? -1 : 0 : f.isLessThan(0) && k.isLessThan(0) ? _.isLessThan(C) ? -1 : _.isGreaterThan(C) ? 1 : 0 : k.isLessThan(f) ? -1 : k.isGreaterThan(f) ? 1 : 0;
      };
    }
  }, Eu = class Ko {
    constructor(i) {
      qt(this, "events");
      qt(this, "poly");
      qt(this, "_isExteriorRing");
      qt(this, "_enclosingRing");
      this.events = i;
      for (let r = 0, a = i.length; r < a; r++) i[r].segment.ringOut = this;
      this.poly = null;
    }
    static factory(i) {
      let r = [];
      for (let a = 0, o = i.length; a < o; a++) {
        let h = i[a];
        if (!h.isInResult() || h.ringOut) continue;
        let f = null, _ = h.leftSE, k = h.rightSE, C = [_], N = _.point, O = [];
        for (; f = _, _ = k, C.push(_), _.point !== N; ) for (; ; ) {
          let K = _.getAvailableLinkedEvents();
          if (K.length === 0) {
            let _t = C[0].point, Lt = C[C.length - 1].point;
            throw new Error(`Unable to complete output ring starting at [${_t.x}, ${_t.y}]. Last matching segment found ends at [${Lt.x}, ${Lt.y}].`);
          }
          if (K.length === 1) {
            k = K[0].otherSE;
            break;
          }
          let Y = null;
          for (let _t = 0, Lt = O.length; _t < Lt; _t++) if (O[_t].point === _.point) {
            Y = _t;
            break;
          }
          if (Y !== null) {
            let _t = O.splice(Y)[0], Lt = C.splice(_t.index);
            Lt.unshift(Lt[0].otherSE), r.push(new Ko(Lt.reverse()));
            continue;
          }
          O.push({ index: C.length, point: _.point });
          let dt = _.getLeftmostComparator(f);
          k = K.sort(dt)[0].otherSE;
          break;
        }
        r.push(new Ko(C));
      }
      return r;
    }
    getGeom() {
      let i = this.events[0].point, r = [i];
      for (let C = 1, N = this.events.length - 1; C < N; C++) {
        let O = this.events[C].point, K = this.events[C + 1].point;
        un.orient(O, i, K) !== 0 && (r.push(O), i = O);
      }
      if (r.length === 1) return null;
      let a = r[0], o = r[1];
      un.orient(a, i, o) === 0 && r.shift(), r.push(r[0]);
      let h = this.isExteriorRing() ? 1 : -1, f = this.isExteriorRing() ? 0 : r.length - 1, _ = this.isExteriorRing() ? r.length : -1, k = [];
      for (let C = f; C != _; C += h) k.push([r[C].x.toNumber(), r[C].y.toNumber()]);
      return k;
    }
    isExteriorRing() {
      if (this._isExteriorRing === void 0) {
        let i = this.enclosingRing();
        this._isExteriorRing = i ? !i.isExteriorRing() : !0;
      }
      return this._isExteriorRing;
    }
    enclosingRing() {
      return this._enclosingRing === void 0 && (this._enclosingRing = this._calcEnclosingRing()), this._enclosingRing;
    }
    _calcEnclosingRing() {
      var o, h;
      let i = this.events[0];
      for (let f = 1, _ = this.events.length; f < _; f++) {
        let k = this.events[f];
        Wi.compare(i, k) > 0 && (i = k);
      }
      let r = i.segment.prevInResult(), a = r ? r.prevInResult() : null;
      for (; ; ) {
        if (!r) return null;
        if (!a) return r.ringOut;
        if (a.ringOut !== r.ringOut) return ((o = a.ringOut) == null ? void 0 : o.enclosingRing()) !== r.ringOut ? r.ringOut : (h = r.ringOut) == null ? void 0 : h.enclosingRing();
        r = a.prevInResult(), a = r ? r.prevInResult() : null;
      }
    }
  }, cl = class {
    constructor(e) {
      qt(this, "exteriorRing");
      qt(this, "interiorRings");
      this.exteriorRing = e, e.poly = this, this.interiorRings = [];
    }
    addInterior(e) {
      this.interiorRings.push(e), e.poly = this;
    }
    getGeom() {
      let e = this.exteriorRing.getGeom();
      if (e === null) return null;
      let i = [e];
      for (let r = 0, a = this.interiorRings.length; r < a; r++) {
        let o = this.interiorRings[r].getGeom();
        o !== null && i.push(o);
      }
      return i;
    }
  }, Mu = class {
    constructor(e) {
      qt(this, "rings");
      qt(this, "polys");
      this.rings = e, this.polys = this._composePolys(e);
    }
    getGeom() {
      let e = [];
      for (let i = 0, r = this.polys.length; i < r; i++) {
        let a = this.polys[i].getGeom();
        a !== null && e.push(a);
      }
      return e;
    }
    _composePolys(e) {
      var r;
      let i = [];
      for (let a = 0, o = e.length; a < o; a++) {
        let h = e[a];
        if (!h.poly) if (h.isExteriorRing()) i.push(new cl(h));
        else {
          let f = h.enclosingRing();
          f != null && f.poly || i.push(new cl(f)), (r = f == null ? void 0 : f.poly) == null || r.addInterior(h);
        }
      }
      return i;
    }
  }, Bu = class {
    constructor(e, i = Ts.compare) {
      qt(this, "queue");
      qt(this, "tree");
      qt(this, "segments");
      this.queue = e, this.tree = new Bs(i), this.segments = [];
    }
    process(e) {
      let i = e.segment, r = [];
      if (e.consumedBy) return e.isLeft ? this.queue.delete(e.otherSE) : this.tree.delete(i), r;
      e.isLeft && this.tree.add(i);
      let a = i, o = i;
      do
        a = this.tree.lastBefore(a);
      while (a != null && a.consumedBy != null);
      do
        o = this.tree.firstAfter(o);
      while (o != null && o.consumedBy != null);
      if (e.isLeft) {
        let h = null;
        if (a) {
          let _ = a.getIntersection(i);
          if (_ !== null && (i.isAnEndpoint(_) || (h = _), !a.isAnEndpoint(_))) {
            let k = this._splitSafely(a, _);
            for (let C = 0, N = k.length; C < N; C++) r.push(k[C]);
          }
        }
        let f = null;
        if (o) {
          let _ = o.getIntersection(i);
          if (_ !== null && (i.isAnEndpoint(_) || (f = _), !o.isAnEndpoint(_))) {
            let k = this._splitSafely(o, _);
            for (let C = 0, N = k.length; C < N; C++) r.push(k[C]);
          }
        }
        if (h !== null || f !== null) {
          let _ = null;
          h === null ? _ = f : f === null ? _ = h : _ = Wi.comparePoints(h, f) <= 0 ? h : f, this.queue.delete(i.rightSE), r.push(i.rightSE);
          let k = i.split(_);
          for (let C = 0, N = k.length; C < N; C++) r.push(k[C]);
        }
        r.length > 0 ? (this.tree.delete(i), r.push(e)) : (this.segments.push(i), i.prev = a);
      } else {
        if (a && o) {
          let h = a.getIntersection(o);
          if (h !== null) {
            if (!a.isAnEndpoint(h)) {
              let f = this._splitSafely(a, h);
              for (let _ = 0, k = f.length; _ < k; _++) r.push(f[_]);
            }
            if (!o.isAnEndpoint(h)) {
              let f = this._splitSafely(o, h);
              for (let _ = 0, k = f.length; _ < k; _++) r.push(f[_]);
            }
          }
        }
        this.tree.delete(i);
      }
      return r;
    }
    _splitSafely(e, i) {
      this.tree.delete(e);
      let r = e.rightSE;
      this.queue.delete(r);
      let a = e.split(i);
      return a.push(r), e.consumedBy === void 0 && this.tree.add(e), a;
    }
  }, Au = class {
    constructor() {
      qt(this, "type");
      qt(this, "numMultiPolys");
    }
    run(e, i, r) {
      fa.type = e;
      let a = [new fl(i, !0)];
      for (let k = 0, C = r.length; k < C; k++) a.push(new fl(r[k], !1));
      if (fa.numMultiPolys = a.length, fa.type === "difference") {
        let k = a[0], C = 1;
        for (; C < a.length; ) zo(a[C].bbox, k.bbox) !== null ? C++ : a.splice(C, 1);
      }
      if (fa.type === "intersection") for (let k = 0, C = a.length; k < C; k++) {
        let N = a[k];
        for (let O = k + 1, K = a.length; O < K; O++) if (zo(N.bbox, a[O].bbox) === null) return [];
      }
      let o = new Bs(Wi.compare);
      for (let k = 0, C = a.length; k < C; k++) {
        let N = a[k].getSweepEvents();
        for (let O = 0, K = N.length; O < K; O++) o.add(N[O]);
      }
      let h = new Bu(o), f = null;
      for (o.size != 0 && (f = o.first(), o.delete(f)); f; ) {
        let k = h.process(f);
        for (let C = 0, N = k.length; C < N; C++) {
          let O = k[C];
          O.consumedBy === void 0 && o.add(O);
        }
        o.size != 0 ? (f = o.first(), o.delete(f)) : f = null;
      }
      un.reset();
      let _ = Eu.factory(h.segments);
      return new Mu(_).getGeom();
    }
  }, fa = new Au(), Ps = fa, Su = 0, Ts = class js {
    constructor(i, r, a, o) {
      qt(this, "id");
      qt(this, "leftSE");
      qt(this, "rightSE");
      qt(this, "rings");
      qt(this, "windings");
      qt(this, "ringOut");
      qt(this, "consumedBy");
      qt(this, "prev");
      qt(this, "_prevInResult");
      qt(this, "_beforeState");
      qt(this, "_afterState");
      qt(this, "_isInResult");
      this.id = ++Su, this.leftSE = i, i.segment = this, i.otherSE = r, this.rightSE = r, r.segment = this, r.otherSE = i, this.rings = a, this.windings = o;
    }
    static compare(i, r) {
      let a = i.leftSE.point.x, o = r.leftSE.point.x, h = i.rightSE.point.x, f = r.rightSE.point.x;
      if (f.isLessThan(a)) return 1;
      if (h.isLessThan(o)) return -1;
      let _ = i.leftSE.point.y, k = r.leftSE.point.y, C = i.rightSE.point.y, N = r.rightSE.point.y;
      if (a.isLessThan(o)) {
        if (k.isLessThan(_) && k.isLessThan(C)) return 1;
        if (k.isGreaterThan(_) && k.isGreaterThan(C)) return -1;
        let O = i.comparePoint(r.leftSE.point);
        if (O < 0) return 1;
        if (O > 0) return -1;
        let K = r.comparePoint(i.rightSE.point);
        return K !== 0 ? K : -1;
      }
      if (a.isGreaterThan(o)) {
        if (_.isLessThan(k) && _.isLessThan(N)) return -1;
        if (_.isGreaterThan(k) && _.isGreaterThan(N)) return 1;
        let O = r.comparePoint(i.leftSE.point);
        if (O !== 0) return O;
        let K = i.comparePoint(r.rightSE.point);
        return K < 0 ? 1 : K > 0 ? -1 : 1;
      }
      if (_.isLessThan(k)) return -1;
      if (_.isGreaterThan(k)) return 1;
      if (h.isLessThan(f)) {
        let O = r.comparePoint(i.rightSE.point);
        if (O !== 0) return O;
      }
      if (h.isGreaterThan(f)) {
        let O = i.comparePoint(r.rightSE.point);
        if (O < 0) return 1;
        if (O > 0) return -1;
      }
      if (!h.eq(f)) {
        let O = C.minus(_), K = h.minus(a), Y = N.minus(k), dt = f.minus(o);
        if (O.isGreaterThan(K) && Y.isLessThan(dt)) return 1;
        if (O.isLessThan(K) && Y.isGreaterThan(dt)) return -1;
      }
      return h.isGreaterThan(f) ? 1 : h.isLessThan(f) || C.isLessThan(N) ? -1 : C.isGreaterThan(N) ? 1 : i.id < r.id ? -1 : i.id > r.id ? 1 : 0;
    }
    static fromRing(i, r, a) {
      let o, h, f, _ = Wi.comparePoints(i, r);
      if (_ < 0) o = i, h = r, f = 1;
      else if (_ > 0) o = r, h = i, f = -1;
      else throw new Error(`Tried to create degenerate segment at [${i.x}, ${i.y}]`);
      let k = new Wi(o, !0), C = new Wi(h, !1);
      return new js(k, C, [a], [f]);
    }
    replaceRightSE(i) {
      this.rightSE = i, this.rightSE.segment = this, this.rightSE.otherSE = this.leftSE, this.leftSE.otherSE = this.rightSE;
    }
    bbox() {
      let i = this.leftSE.point.y, r = this.rightSE.point.y;
      return { ll: { x: this.leftSE.point.x, y: i.isLessThan(r) ? i : r }, ur: { x: this.rightSE.point.x, y: i.isGreaterThan(r) ? i : r } };
    }
    vector() {
      return { x: this.rightSE.point.x.minus(this.leftSE.point.x), y: this.rightSE.point.y.minus(this.leftSE.point.y) };
    }
    isAnEndpoint(i) {
      return i.x.eq(this.leftSE.point.x) && i.y.eq(this.leftSE.point.y) || i.x.eq(this.rightSE.point.x) && i.y.eq(this.rightSE.point.y);
    }
    comparePoint(i) {
      return un.orient(this.leftSE.point, i, this.rightSE.point);
    }
    getIntersection(i) {
      let r = this.bbox(), a = i.bbox(), o = zo(r, a);
      if (o === null) return null;
      let h = this.leftSE.point, f = this.rightSE.point, _ = i.leftSE.point, k = i.rightSE.point, C = da(r, _) && this.comparePoint(_) === 0, N = da(a, h) && i.comparePoint(h) === 0, O = da(r, k) && this.comparePoint(k) === 0, K = da(a, f) && i.comparePoint(f) === 0;
      if (N && C) return K && !O ? f : !K && O ? k : null;
      if (N) return O && h.x.eq(k.x) && h.y.eq(k.y) ? null : h;
      if (C) return K && f.x.eq(_.x) && f.y.eq(_.y) ? null : _;
      if (K && O) return null;
      if (K) return f;
      if (O) return k;
      let Y = Cu(h, this.vector(), _, i.vector());
      return Y === null || !da(o, Y) ? null : un.snap(Y);
    }
    split(i) {
      let r = [], a = i.events !== void 0, o = new Wi(i, !0), h = new Wi(i, !1), f = this.rightSE;
      this.replaceRightSE(h), r.push(h), r.push(o);
      let _ = new js(o, f, this.rings.slice(), this.windings.slice());
      return Wi.comparePoints(_.leftSE.point, _.rightSE.point) > 0 && _.swapEvents(), Wi.comparePoints(this.leftSE.point, this.rightSE.point) > 0 && this.swapEvents(), a && (o.checkForConsuming(), h.checkForConsuming()), r;
    }
    swapEvents() {
      let i = this.rightSE;
      this.rightSE = this.leftSE, this.leftSE = i, this.leftSE.isLeft = !0, this.rightSE.isLeft = !1;
      for (let r = 0, a = this.windings.length; r < a; r++) this.windings[r] *= -1;
    }
    consume(i) {
      let r = this, a = i;
      for (; r.consumedBy; ) r = r.consumedBy;
      for (; a.consumedBy; ) a = a.consumedBy;
      let o = js.compare(r, a);
      if (o !== 0) {
        if (o > 0) {
          let h = r;
          r = a, a = h;
        }
        if (r.prev === a) {
          let h = r;
          r = a, a = h;
        }
        for (let h = 0, f = a.rings.length; h < f; h++) {
          let _ = a.rings[h], k = a.windings[h], C = r.rings.indexOf(_);
          C === -1 ? (r.rings.push(_), r.windings.push(k)) : r.windings[C] += k;
        }
        a.rings = null, a.windings = null, a.consumedBy = r, a.leftSE.consumedBy = r.leftSE, a.rightSE.consumedBy = r.rightSE;
      }
    }
    prevInResult() {
      return this._prevInResult !== void 0 ? this._prevInResult : (this.prev ? this.prev.isInResult() ? this._prevInResult = this.prev : this._prevInResult = this.prev.prevInResult() : this._prevInResult = null, this._prevInResult);
    }
    beforeState() {
      if (this._beforeState !== void 0) return this._beforeState;
      if (!this.prev) this._beforeState = { rings: [], windings: [], multiPolys: [] };
      else {
        let i = this.prev.consumedBy || this.prev;
        this._beforeState = i.afterState();
      }
      return this._beforeState;
    }
    afterState() {
      if (this._afterState !== void 0) return this._afterState;
      let i = this.beforeState();
      this._afterState = { rings: i.rings.slice(0), windings: i.windings.slice(0), multiPolys: [] };
      let r = this._afterState.rings, a = this._afterState.windings, o = this._afterState.multiPolys;
      for (let _ = 0, k = this.rings.length; _ < k; _++) {
        let C = this.rings[_], N = this.windings[_], O = r.indexOf(C);
        O === -1 ? (r.push(C), a.push(N)) : a[O] += N;
      }
      let h = [], f = [];
      for (let _ = 0, k = r.length; _ < k; _++) {
        if (a[_] === 0) continue;
        let C = r[_], N = C.poly;
        if (f.indexOf(N) === -1) if (C.isExterior) h.push(N);
        else {
          f.indexOf(N) === -1 && f.push(N);
          let O = h.indexOf(C.poly);
          O !== -1 && h.splice(O, 1);
        }
      }
      for (let _ = 0, k = h.length; _ < k; _++) {
        let C = h[_].multiPoly;
        o.indexOf(C) === -1 && o.push(C);
      }
      return this._afterState;
    }
    isInResult() {
      if (this.consumedBy) return !1;
      if (this._isInResult !== void 0) return this._isInResult;
      let i = this.beforeState().multiPolys, r = this.afterState().multiPolys;
      switch (Ps.type) {
        case "union": {
          let a = i.length === 0, o = r.length === 0;
          this._isInResult = a !== o;
          break;
        }
        case "intersection": {
          let a, o;
          i.length < r.length ? (a = i.length, o = r.length) : (a = r.length, o = i.length), this._isInResult = o === Ps.numMultiPolys && a < o;
          break;
        }
        case "xor": {
          let a = Math.abs(i.length - r.length);
          this._isInResult = a % 2 === 1;
          break;
        }
        case "difference": {
          let a = (o) => o.length === 1 && o[0].isSubject;
          this._isInResult = a(i) !== a(r);
          break;
        }
      }
      return this._isInResult;
    }
  }, dl = class {
    constructor(e, i, r) {
      qt(this, "poly");
      qt(this, "isExterior");
      qt(this, "segments");
      qt(this, "bbox");
      if (!Array.isArray(e) || e.length === 0) throw new Error("Input geometry is not a valid Polygon or MultiPolygon");
      if (this.poly = i, this.isExterior = r, this.segments = [], typeof e[0][0] != "number" || typeof e[0][1] != "number") throw new Error("Input geometry is not a valid Polygon or MultiPolygon");
      let a = un.snap({ x: new Ki(e[0][0]), y: new Ki(e[0][1]) });
      this.bbox = { ll: { x: a.x, y: a.y }, ur: { x: a.x, y: a.y } };
      let o = a;
      for (let h = 1, f = e.length; h < f; h++) {
        if (typeof e[h][0] != "number" || typeof e[h][1] != "number") throw new Error("Input geometry is not a valid Polygon or MultiPolygon");
        let _ = un.snap({ x: new Ki(e[h][0]), y: new Ki(e[h][1]) });
        _.x.eq(o.x) && _.y.eq(o.y) || (this.segments.push(Ts.fromRing(o, _, this)), _.x.isLessThan(this.bbox.ll.x) && (this.bbox.ll.x = _.x), _.y.isLessThan(this.bbox.ll.y) && (this.bbox.ll.y = _.y), _.x.isGreaterThan(this.bbox.ur.x) && (this.bbox.ur.x = _.x), _.y.isGreaterThan(this.bbox.ur.y) && (this.bbox.ur.y = _.y), o = _);
      }
      (!a.x.eq(o.x) || !a.y.eq(o.y)) && this.segments.push(Ts.fromRing(o, a, this));
    }
    getSweepEvents() {
      let e = [];
      for (let i = 0, r = this.segments.length; i < r; i++) {
        let a = this.segments[i];
        e.push(a.leftSE), e.push(a.rightSE);
      }
      return e;
    }
  }, Pu = class {
    constructor(e, i) {
      qt(this, "multiPoly");
      qt(this, "exteriorRing");
      qt(this, "interiorRings");
      qt(this, "bbox");
      if (!Array.isArray(e)) throw new Error("Input geometry is not a valid Polygon or MultiPolygon");
      this.exteriorRing = new dl(e[0], this, !0), this.bbox = { ll: { x: this.exteriorRing.bbox.ll.x, y: this.exteriorRing.bbox.ll.y }, ur: { x: this.exteriorRing.bbox.ur.x, y: this.exteriorRing.bbox.ur.y } }, this.interiorRings = [];
      for (let r = 1, a = e.length; r < a; r++) {
        let o = new dl(e[r], this, !1);
        o.bbox.ll.x.isLessThan(this.bbox.ll.x) && (this.bbox.ll.x = o.bbox.ll.x), o.bbox.ll.y.isLessThan(this.bbox.ll.y) && (this.bbox.ll.y = o.bbox.ll.y), o.bbox.ur.x.isGreaterThan(this.bbox.ur.x) && (this.bbox.ur.x = o.bbox.ur.x), o.bbox.ur.y.isGreaterThan(this.bbox.ur.y) && (this.bbox.ur.y = o.bbox.ur.y), this.interiorRings.push(o);
      }
      this.multiPoly = i;
    }
    getSweepEvents() {
      let e = this.exteriorRing.getSweepEvents();
      for (let i = 0, r = this.interiorRings.length; i < r; i++) {
        let a = this.interiorRings[i].getSweepEvents();
        for (let o = 0, h = a.length; o < h; o++) e.push(a[o]);
      }
      return e;
    }
  }, fl = class {
    constructor(e, i) {
      qt(this, "isSubject");
      qt(this, "polys");
      qt(this, "bbox");
      if (!Array.isArray(e)) throw new Error("Input geometry is not a valid Polygon or MultiPolygon");
      try {
        typeof e[0][0][0] == "number" && (e = [e]);
      } catch {
      }
      this.polys = [], this.bbox = { ll: { x: new Ki(Number.POSITIVE_INFINITY), y: new Ki(Number.POSITIVE_INFINITY) }, ur: { x: new Ki(Number.NEGATIVE_INFINITY), y: new Ki(Number.NEGATIVE_INFINITY) } };
      for (let r = 0, a = e.length; r < a; r++) {
        let o = new Pu(e[r], this);
        o.bbox.ll.x.isLessThan(this.bbox.ll.x) && (this.bbox.ll.x = o.bbox.ll.x), o.bbox.ll.y.isLessThan(this.bbox.ll.y) && (this.bbox.ll.y = o.bbox.ll.y), o.bbox.ur.x.isGreaterThan(this.bbox.ur.x) && (this.bbox.ur.x = o.bbox.ur.x), o.bbox.ur.y.isGreaterThan(this.bbox.ur.y) && (this.bbox.ur.y = o.bbox.ur.y), this.polys.push(o);
      }
      this.isSubject = i;
    }
    getSweepEvents() {
      let e = [];
      for (let i = 0, r = this.polys.length; i < r; i++) {
        let a = this.polys[i].getSweepEvents();
        for (let o = 0, h = a.length; o < h; o++) e.push(a[o]);
      }
      return e;
    }
  }, Tu = (e, ...i) => Ps.run("intersection", e, i), Du = (e, ...i) => Ps.run("difference", e, i);
  un.set;
  function Ds(e) {
    let i = { type: "Feature" };
    return i.geometry = e, i;
  }
  function Os(e) {
    return e.type === "Feature" ? e.geometry : e;
  }
  function pl(e) {
    return e && e.geometry && e.geometry.coordinates ? e.geometry.coordinates : e;
  }
  function Ou(e) {
    return Ds({ type: "LineString", coordinates: e });
  }
  function Iu(e) {
    return Ds({ type: "MultiLineString", coordinates: e });
  }
  function ml(e) {
    return Ds({ type: "Polygon", coordinates: e });
  }
  function gl(e) {
    return Ds({ type: "MultiPolygon", coordinates: e });
  }
  function Fu(e, i) {
    let r = Os(e), a = Os(i), o = Tu(r.coordinates, a.coordinates);
    return o.length === 0 ? null : o.length === 1 ? ml(o[0]) : gl(o);
  }
  function Ru(e, i) {
    let r = Os(e), a = Os(i), o = Du(r.coordinates, a.coordinates);
    return o.length === 0 ? null : o.length === 1 ? ml(o[0]) : gl(o);
  }
  function _l(e) {
    return Array.isArray(e) ? 1 + _l(e[0]) : -1;
  }
  function zu(e) {
    e instanceof L.Polyline && (e = e.toGeoJSON(15));
    let i = pl(e), r = _l(i), a = [];
    return r > 1 ? i.forEach((o) => {
      a.push(Ou(o));
    }) : a.push(e), a;
  }
  function Nu(e) {
    let i = [];
    return e.eachLayer((r) => {
      i.push(pl(r.toGeoJSON(15)));
    }), Iu(i);
  }
  De.Cut = De.Polygon.extend({ initialize(e) {
    this._map = e, this._shape = "Cut", this.toolbarButtonName = "cutPolygon";
  }, _finishShape() {
    if (this._editedLayers = [], !this.options.allowSelfIntersection && (this._handleSelfIntersection(!0, this._layer.getLatLngs()[0]), this._doesSelfIntersect) || this.options.requireSnapToFinish && !this._hintMarker._snapped && !this._isFirstLayer()) return;
    let e = this._layer.getLatLngs();
    if (e.length <= 2) return;
    let i = L.polygon(e, this.options.pathOptions);
    i._latlngInfos = this._layer._latlngInfo, this.cut(i), this._cleanupSnapping(), this._otherSnapLayers.splice(this._tempSnapLayerIndex, 1), delete this._tempSnapLayerIndex, this._editedLayers.forEach(({ layer: a, originalLayer: o }) => {
      this._fireCut(o, a, o), this._fireCut(this._map, a, o), o.pm._fireEdit();
    }), this._editedLayers = [];
    let r = this._hintMarker.getLatLng();
    this.disable(), this.options.continueDrawing && (this.enable(), this._hintMarker.setLatLng(r));
  }, cut(e) {
    let i = this._map._layers, r = e._latlngInfos || [];
    Object.keys(i).map((a) => i[a]).filter((a) => a.pm).filter((a) => !a._pmTempLayer).filter((a) => !L.PM.optIn && !a.options.pmIgnore || L.PM.optIn && a.options.pmIgnore === !1).filter((a) => a instanceof L.Polyline).filter((a) => a !== e).filter((a) => a.pm.options.allowCutting).filter((a) => this.options.layersToCut && L.Util.isArray(this.options.layersToCut) && this.options.layersToCut.length > 0 ? this.options.layersToCut.indexOf(a) > -1 : !0).filter((a) => !this._layerGroup.hasLayer(a)).filter((a) => {
      try {
        let o = !!oi(e.toGeoJSON(15), a.toGeoJSON(15)).features.length > 0;
        return o || a instanceof L.Polyline && !(a instanceof L.Polygon) ? o : !!Fu(e.toGeoJSON(15), a.toGeoJSON(15));
      } catch {
        return a instanceof L.Polygon && console.error("You can't cut polygons with self-intersections"), !1;
      }
    }).forEach((a) => {
      let o;
      if (a instanceof L.Polygon) {
        o = L.polygon(a.getLatLngs());
        let k = o.getLatLngs();
        r.forEach((C) => {
          if (C && C.snapInfo) {
            let { latlng: N } = C, O = this._calcClosestLayer(N, [o]);
            if (O && O.segment && O.distance < this.options.snapDistance) {
              let { segment: K } = O;
              if (K && K.length === 2) {
                let { indexPath: Y, parentPath: dt, newIndex: _t } = L.PM.Utils._getIndexFromSegment(k, K);
                (Y.length > 1 ? (0, Io.default)(k, dt) : k).splice(_t, 0, N);
              }
            }
          }
        });
      } else o = a;
      let h = this._cutLayer(e, o), f = L.geoJSON(h, a.options);
      f.getLayers().length === 1 && ([f] = f.getLayers()), this._setPane(f, "layerPane");
      let _ = f.addTo(this._map.pm._getContainingLayer());
      if (_.pm.enable(a.pm.options), _.pm.disable(), a._pmTempLayer = !0, e._pmTempLayer = !0, a.remove(), a.removeFrom(this._map.pm._getContainingLayer()), e.remove(), e.removeFrom(this._map.pm._getContainingLayer()), _.getLayers && _.getLayers().length === 0 && this._map.pm.removeLayer({ target: _ }), _ instanceof L.LayerGroup ? (_.eachLayer((k) => {
        this._addDrawnLayerProp(k);
      }), this._addDrawnLayerProp(_)) : this._addDrawnLayerProp(_), this.options.layersToCut && L.Util.isArray(this.options.layersToCut) && this.options.layersToCut.length > 0) {
        let k = this.options.layersToCut.indexOf(a);
        k > -1 && this.options.layersToCut.splice(k, 1);
      }
      this._editedLayers.push({ layer: _, originalLayer: a });
    });
  }, _cutLayer(e, i) {
    let r = L.geoJSON(), a;
    if (i instanceof L.Polygon) a = Ru(i.toGeoJSON(15), e.toGeoJSON(15));
    else {
      let o = zu(i);
      o.forEach((h) => {
        let f = To(h, e.toGeoJSON(15)), _;
        f && f.features.length > 0 ? _ = L.geoJSON(f) : _ = L.geoJSON(h), _.getLayers().forEach((k) => {
          Ls(e.toGeoJSON(15), k.toGeoJSON(15)) || k.addTo(r);
        });
      }), o.length > 1 ? a = Nu(r) : a = r.toGeoJSON(15);
    }
    return a;
  }, _change: L.Util.falseFn }), De.Text = De.extend({ initialize(e) {
    this._map = e, this._shape = "Text", this.toolbarButtonName = "drawText";
  }, enable(e) {
    L.Util.setOptions(this, e), this._enabled = !0, this._map.on("click", this._createMarker, this), this._map.pm.Toolbar.toggleButton(this.toolbarButtonName, !0), this._hintMarker = L.marker(this._map.getCenter(), { interactive: !1, zIndexOffset: 100, icon: L.divIcon({ className: "marker-icon cursor-marker" }) }), this._setPane(this._hintMarker, "vertexPane"), this._hintMarker._pmTempLayer = !0, this._hintMarker.addTo(this._map), this.options.cursorMarker && L.DomUtil.addClass(this._hintMarker._icon, "visible"), this.options.tooltips && this._hintMarker.bindTooltip(ce("tooltips.placeText"), { permanent: !0, offset: L.point(0, 10), direction: "bottom", opacity: 0.8 }).openTooltip(), this._layer = this._hintMarker, this._map.on("mousemove", this._syncHintMarker, this), this._map.getContainer().classList.add("geoman-draw-cursor"), this._fireDrawStart(), this._setGlobalDrawMode();
  }, disable() {
    var e;
    this._enabled && (this._enabled = !1, this._map.off("click", this._createMarker, this), (e = this._hintMarker) == null || e.remove(), this._map.getContainer().classList.remove("geoman-draw-cursor"), this._map.off("mousemove", this._syncHintMarker, this), this._map.off("mousemove", this._showHintMarkerAfterMoving, this), this._map.pm.Toolbar.toggleButton(this.toolbarButtonName, !1), this.options.snappable && this._cleanupSnapping(), this._fireDrawEnd(), this._setGlobalDrawMode());
  }, enabled() {
    return this._enabled;
  }, toggle(e) {
    this.enabled() ? this.disable() : this.enable(e);
  }, _syncHintMarker(e) {
    if (this._hintMarker.setLatLng(e.latlng), this.options.snappable) {
      let i = e;
      i.target = this._hintMarker, this._handleSnapping(i);
    }
  }, _createMarker(e) {
    var o, h, f, _;
    if (!e.latlng || this.options.requireSnapToFinish && !this._hintMarker._snapped && !this._isFirstLayer()) return;
    this._hintMarker._snapped || this._hintMarker.setLatLng(e.latlng);
    let i = this._hintMarker.getLatLng();
    if (this.textArea = this._createTextArea(), (o = this.options.textOptions) == null ? void 0 : o.className) {
      let k = this.options.textOptions.className.split(" ");
      this.textArea.classList.add(...k);
    }
    let r = this._createTextIcon(this.textArea), a = new L.Marker(i, { textMarker: !0, _textMarkerOverPM: !0, icon: r });
    if (this._setPane(a, "markerPane"), this._finishLayer(a), a.pm || (a.options.draggable = !1), a.addTo(this._map.pm._getContainingLayer()), a.pm) {
      a.pm.textArea = this.textArea, L.setOptions(a.pm, { removeIfEmpty: ((h = this.options.textOptions) == null ? void 0 : h.removeIfEmpty) ?? !0 });
      let k = ((f = this.options.textOptions) == null ? void 0 : f.focusAfterDraw) ?? !0;
      a.pm._createTextMarker(k), (_ = this.options.textOptions) != null && _.text && a.pm.setText(this.options.textOptions.text);
    }
    this._fireCreate(a), this._cleanupSnapping(), this.disable(), this.options.continueDrawing && this._map.once("mousemove", this._showHintMarkerAfterMoving, this);
  }, _showHintMarkerAfterMoving(e) {
    this.enable(), this._hintMarker.setLatLng(e.latlng);
  }, _createTextArea() {
    let e = document.createElement("textarea");
    return e.readOnly = !0, e.classList.add("pm-textarea", "pm-disabled"), e;
  }, _createTextIcon(e) {
    return L.divIcon({ className: "pm-text-marker", html: e });
  } });
  var ju = { enableLayerDrag() {
    if (!this.options.draggable || !this._layer._map) return;
    this.disable(), this._layerDragEnabled = !0, this._map || (this._map = this._layer._map), (this._layer instanceof L.Marker || this._layer instanceof L.ImageOverlay) && L.DomEvent.on(this._getDOMElem(), "dragstart", this._stopDOMImageDrag), this._layer.dragging && this._layer.dragging.disable(), this._tempDragCoord = null, xn(this._layer) instanceof L.Canvas ? (this._layer.on("mouseout", this.removeDraggingClass, this), this._layer.on("mouseover", this.addDraggingClass, this)) : this.addDraggingClass(), this._originalMapDragState = this._layer._map.dragging._enabled, this._safeToCacheDragState = !0;
    let e = this._getDOMElem();
    e && (xn(this._layer) instanceof L.Canvas ? (this._layer.on("touchstart mousedown", this._dragMixinOnMouseDown, this), this._map.pm._addTouchEvents(e)) : L.DomEvent.on(e, "touchstart mousedown", this._simulateMouseDownEvent, this)), this._fireDragEnable();
  }, disableLayerDrag() {
    this._layerDragEnabled = !1, xn(this._layer) instanceof L.Canvas ? (this._layer.off("mouseout", this.removeDraggingClass, this), this._layer.off("mouseover", this.addDraggingClass, this)) : this.removeDraggingClass(), this._originalMapDragState && this._dragging && this._map.dragging.enable(), this._safeToCacheDragState = !1, this._layer.dragging && this._layer.dragging.disable();
    let e = this._getDOMElem();
    e && (xn(this._layer) instanceof L.Canvas ? (this._layer.off("touchstart mousedown", this._dragMixinOnMouseDown, this), this._map.pm._removeTouchEvents(e)) : L.DomEvent.off(e, "touchstart mousedown", this._simulateMouseDownEvent, this)), this._layerDragged && this._fireUpdate(), this._layerDragged = !1, this._fireDragDisable();
  }, dragging() {
    return this._dragging;
  }, layerDragEnabled() {
    return !!this._layerDragEnabled;
  }, _simulateMouseDownEvent(e) {
    let i = e.touches ? e.touches[0] : e, r = { originalEvent: i, target: this._layer };
    return r.containerPoint = this._map.mouseEventToContainerPoint(i), r.latlng = this._map.containerPointToLatLng(r.containerPoint), this._dragMixinOnMouseDown(r), !1;
  }, _simulateMouseMoveEvent(e) {
    let i = e.touches ? e.touches[0] : e, r = { originalEvent: i, target: this._layer };
    return r.containerPoint = this._map.mouseEventToContainerPoint(i), r.latlng = this._map.containerPointToLatLng(r.containerPoint), this._dragMixinOnMouseMove(r), !1;
  }, _simulateMouseUpEvent(e) {
    let i = { originalEvent: e.touches ? e.touches[0] : e, target: this._layer };
    return e.type.indexOf("touch") === -1 && (i.containerPoint = this._map.mouseEventToContainerPoint(e), i.latlng = this._map.containerPointToLatLng(i.containerPoint)), this._dragMixinOnMouseUp(i), !1;
  }, _dragMixinOnMouseDown(e) {
    if (e.originalEvent.button > 0) return;
    this._overwriteEventIfItComesFromMarker(e);
    let i = e._fromLayerSync, r = this._syncLayers("_dragMixinOnMouseDown", e);
    if (this._layer instanceof L.Marker && (this.options.snappable && !i && !r ? this._initSnappableMarkers() : this._disableSnapping()), this._layer instanceof L.CircleMarker) {
      let a = "resizeableCircleMarker";
      this._layer instanceof L.Circle && (a = "resizeableCircle"), this.options.snappable && !i && !r ? this._layer.pm.options[a] || this._initSnappableMarkersDrag() : this._layer.pm.options[a] ? this._layer.pm._disableSnapping() : this._layer.pm._disableSnappingDrag();
    }
    this._safeToCacheDragState && (this._originalMapDragState = this._layer._map.dragging._enabled, this._safeToCacheDragState = !1), this._tempDragCoord = e.latlng, L.DomEvent.on(this._map.getContainer(), "touchend mouseup", this._simulateMouseUpEvent, this), L.DomEvent.on(this._map.getContainer(), "touchmove mousemove", this._simulateMouseMoveEvent, this);
  }, _dragMixinOnMouseMove(e) {
    this._overwriteEventIfItComesFromMarker(e);
    let i = this._getDOMElem();
    this._syncLayers("_dragMixinOnMouseMove", e), this._dragging || (this._dragging = !0, L.DomUtil.addClass(i, "leaflet-pm-dragging"), this._layer instanceof L.Marker || this._layer.bringToFront(), this._originalMapDragState && this._map.dragging.disable(), this._fireDragStart()), this._tempDragCoord || (this._tempDragCoord = e.latlng), this._onLayerDrag(e), this._layer instanceof L.CircleMarker && this._layer.pm._updateHiddenPolyCircle();
  }, _dragMixinOnMouseUp(e) {
    let i = this._getDOMElem();
    return this._syncLayers("_dragMixinOnMouseUp", e), this._originalMapDragState && this._map.dragging.enable(), this._safeToCacheDragState = !0, L.DomEvent.off(this._map.getContainer(), "touchmove mousemove", this._simulateMouseMoveEvent, this), L.DomEvent.off(this._map.getContainer(), "touchend mouseup", this._simulateMouseUpEvent, this), this._dragging ? (this._layer instanceof L.CircleMarker && this._layer.pm._updateHiddenPolyCircle(), this._layerDragged = !0, window.setTimeout(() => {
      this._dragging = !1, i && L.DomUtil.removeClass(i, "leaflet-pm-dragging"), this._fireDragEnd(), this._fireEdit(), this._layerEdited = !0;
    }, 10), !0) : !1;
  }, _onLayerDrag(e) {
    let { latlng: i } = e, r = { lat: i.lat - this._tempDragCoord.lat, lng: i.lng - this._tempDragCoord.lng }, a = (o) => o.map((h) => {
      if (Array.isArray(h)) return a(h);
      let f = { lat: h.lat + r.lat, lng: h.lng + r.lng };
      return (h.alt || h.alt === 0) && (f.alt = h.alt), f;
    });
    if (this._layer instanceof L.Circle && this._layer.options.resizeableCircle || this._layer instanceof L.CircleMarker && this._layer.options.resizeableCircleMarker) {
      let o = a([this._layer.getLatLng()]);
      this._layer.setLatLng(o[0]), this._fireChange(this._layer.getLatLng(), "Edit");
    } else if (this._layer instanceof L.CircleMarker || this._layer instanceof L.Marker) {
      let o = this._layer.getLatLng();
      this._layer._snapped && (o = this._layer._orgLatLng);
      let h = a([o]);
      this._layer.setLatLng(h[0]), this._fireChange(this._layer.getLatLng(), "Edit");
    } else if (this._layer instanceof L.ImageOverlay) {
      let o = a([this._layer.getBounds().getNorthWest(), this._layer.getBounds().getSouthEast()]);
      this._layer.setBounds(o), this._fireChange(this._layer.getBounds(), "Edit");
    } else {
      let o = a(this._layer.getLatLngs());
      this._layer.setLatLngs(o), this._fireChange(this._layer.getLatLngs(), "Edit");
    }
    this._tempDragCoord = i, e.layer = this._layer, this._fireDrag(e);
  }, addDraggingClass() {
    let e = this._getDOMElem();
    e && L.DomUtil.addClass(e, "leaflet-pm-draggable");
  }, removeDraggingClass() {
    let e = this._getDOMElem();
    e && L.DomUtil.removeClass(e, "leaflet-pm-draggable");
  }, _getDOMElem() {
    let e = null;
    return this._layer._path ? e = this._layer._path : this._layer._renderer && this._layer._renderer._container ? e = this._layer._renderer._container : this._layer._image ? e = this._layer._image : this._layer._icon && (e = this._layer._icon), e;
  }, _overwriteEventIfItComesFromMarker(e) {
    e.target.getLatLng && (!e.target._radius || e.target._radius <= 10) && (e.containerPoint = this._map.mouseEventToContainerPoint(e.originalEvent), e.latlng = this._map.containerPointToLatLng(e.containerPoint));
  }, _syncLayers(e, i) {
    if (this.enabled()) return !1;
    if (!i._fromLayerSync && this._layer === i.target && this.options.syncLayersOnDrag) {
      i._fromLayerSync = !0;
      let r = [];
      if (L.Util.isArray(this.options.syncLayersOnDrag)) r = this.options.syncLayersOnDrag, this.options.syncLayersOnDrag.forEach((a) => {
        a instanceof L.LayerGroup && (r = r.concat(a.pm.getLayers(!0)));
      });
      else if (this.options.syncLayersOnDrag === !0 && this._parentLayerGroup) for (let a in this._parentLayerGroup) {
        let o = this._parentLayerGroup[a];
        o.pm && (r = o.pm.getLayers(!0));
      }
      return L.Util.isArray(r) && r.length > 0 && (r = r.filter((a) => !!a.pm).filter((a) => !!a.pm.options.draggable), r.forEach((a) => {
        a !== this._layer && a.pm[e] && (a._snapped = !1, a.pm[e](i));
      })), r.length > 0;
    }
    return !1;
  }, _stopDOMImageDrag(e) {
    return e.preventDefault(), !1;
  } }, Vu = ju, $u = x(Vi());
  function Uu(e, i, r, a) {
    return r.unproject(i.transform(r.project(e, a)), a);
  }
  function yl(e, i, r) {
    let a = r.getMaxZoom();
    if (a === 1 / 0 && (a = r.getZoom()), L.Util.isArray(e)) {
      let o = [];
      return e.forEach((h) => {
        o.push(yl(h, i, r));
      }), o;
    }
    return e instanceof L.LatLng ? Uu(e, i, r, a) : null;
  }
  function br(e, i) {
    i instanceof L.Layer && (i = i.getLatLng());
    let r = e.getMaxZoom();
    return r === 1 / 0 && (r = e.getZoom()), e.project(i, r);
  }
  function Is(e, i) {
    let r = e.getMaxZoom();
    return r === 1 / 0 && (r = e.getZoom()), e.unproject(i, r);
  }
  var Gu = { _onRotateStart(e) {
    this._preventRenderingMarkers(!0), this._rotationOriginLatLng = this._getRotationCenter().clone(), this._rotationOriginPoint = br(this._map, this._rotationOriginLatLng), this._rotationStartPoint = br(this._map, e.target.getLatLng()), this._initialRotateLatLng = Ai(this._layer), this._startAngle = this.getAngle();
    let i = Ai(this._rotationLayer, this._rotationLayer.pm._rotateOrgLatLng);
    this._fireRotationStart(this._rotationLayer, i), this._fireRotationStart(this._map, i);
  }, _onRotate(e) {
    let i = br(this._map, e.target.getLatLng()), r = this._rotationStartPoint, a = this._rotationOriginPoint, o = Math.atan2(i.y - a.y, i.x - a.x) - Math.atan2(r.y - a.y, r.x - a.x);
    this._layer.setLatLngs(this._rotateLayer(o, this._initialRotateLatLng, this._rotationOriginLatLng, L.PM.Matrix.init(), this._map));
    let h = this;
    function f(N, O = [], K = -1) {
      if (K > -1 && O.push(K), L.Util.isArray(N[0])) N.forEach((Y, dt) => f(Y, O.slice(), dt));
      else {
        let Y = O.length > 0 ? (0, $u.default)(h._markers, O) : h._markers[0];
        N.forEach((dt, _t) => {
          Y[_t].setLatLng(dt);
        });
      }
    }
    f(this._layer.getLatLngs());
    let _ = Ai(this._rotationLayer);
    this._rotationLayer.setLatLngs(this._rotateLayer(o, this._rotationLayer.pm._rotateOrgLatLng, this._rotationOriginLatLng, L.PM.Matrix.init(), this._map));
    let k = o * 180 / Math.PI;
    k = k < 0 ? k + 360 : k;
    let C = k + this._startAngle;
    this._setAngle(C), this._rotationLayer.pm._setAngle(C), this._fireRotation(this._rotationLayer, k, _), this._fireRotation(this._map, k, _), this._rotationLayer.pm._fireChange(this._rotationLayer.getLatLngs(), "Rotation");
  }, _onRotateEnd() {
    let e = this._startAngle;
    delete this._rotationOriginLatLng, delete this._rotationOriginPoint, delete this._rotationStartPoint, delete this._initialRotateLatLng, delete this._startAngle;
    let i = Ai(this._rotationLayer, this._rotationLayer.pm._rotateOrgLatLng);
    this._rotationLayer.pm._rotateOrgLatLng = Ai(this._rotationLayer), this._fireRotationEnd(this._rotationLayer, e, i), this._fireRotationEnd(this._map, e, i), this._rotationLayer.pm._fireEdit(this._rotationLayer, "Rotation"), this._preventRenderingMarkers(!1), this._layerRotated = !0;
  }, _rotateLayer(e, i, r, a, o) {
    let h = br(o, r);
    return this._matrix = a.clone().rotate(e, h).flip(), yl(i, this._matrix, o);
  }, _setAngle(e) {
    e = e < 0 ? e + 360 : e, this._angle = e % 360;
  }, _getRotationCenter() {
    if (this._rotationCenter) return this._rotationCenter;
    let e = L.polygon(this._layer.getLatLngs(), { stroke: !1, fill: !1, pmIgnore: !0 }).addTo(this._layer._map), i = e.getCenter();
    return e.removeFrom(this._layer._map), i;
  }, enableRotate() {
    if (!this.options.allowRotation) {
      this.disableRotate();
      return;
    }
    this.rotateEnabled() && this.disableRotate(), this._layer instanceof L.Rectangle && this._angle === void 0 && this.setInitAngle(Wr(this._layer._map, this._layer.getLatLngs()[0][0], this._layer.getLatLngs()[0][1]) || 0);
    let e = { fill: !1, stroke: !1, pmIgnore: !1, snapIgnore: !0 };
    this._rotatePoly = L.polygon(this._layer.getLatLngs(), e), this._rotatePoly._pmTempLayer = !0, this._rotatePoly.addTo(this._layer._map), this._rotatePoly.pm._setAngle(this.getAngle()), this._rotatePoly.pm.setRotationCenter(this.getRotationCenter()), this._rotatePoly.pm.setOptions(this._layer._map.pm.getGlobalOptions()), this._rotatePoly.pm.setOptions({ rotate: !0, snappable: !1, hideMiddleMarkers: !0 }), this._rotatePoly.pm._rotationLayer = this._layer, this._rotatePoly.pm.enable(), this._rotateOrgLatLng = Ai(this._layer), this._rotateEnabled = !0, this._layer.on("remove", this.disableRotate, this), this._fireRotationEnable(this._layer), this._fireRotationEnable(this._layer._map);
  }, disableRotate() {
    this.rotateEnabled() && (this._rotatePoly.pm._layerRotated && this._fireUpdate(), this._rotatePoly.pm._layerRotated = !1, this._rotatePoly.pm.disable(), this._rotatePoly.remove(), this._rotatePoly.pm.setOptions({ rotate: !1 }), this._rotatePoly = void 0, this._rotateOrgLatLng = void 0, this._layer.off("remove", this.disableRotate, this), this._rotateEnabled = !1, this._fireRotationDisable(this._layer), this._fireRotationDisable(this._layer._map));
  }, rotateEnabled() {
    return !!this._rotateEnabled;
  }, rotateLayer(e) {
    let i = this.getAngle(), r = this._layer.getLatLngs(), a = e * (Math.PI / 180);
    this._layer.setLatLngs(this._rotateLayer(a, this._layer.getLatLngs(), this._getRotationCenter(), L.PM.Matrix.init(), this._layer._map)), this._rotateOrgLatLng = L.polygon(this._layer.getLatLngs()).getLatLngs(), this._setAngle(this.getAngle() + e), this.rotateEnabled() && this._rotatePoly && this._rotatePoly.pm.enabled() && (this._rotatePoly.setLatLngs(this._rotateLayer(a, this._rotatePoly.getLatLngs(), this._getRotationCenter(), L.PM.Matrix.init(), this._rotatePoly._map)), this._rotatePoly.pm._initMarkers());
    let o = this.getAngle() - i;
    o = o < 0 ? o + 360 : o, this._startAngle = i, this._fireRotation(this._layer, o, r, this._layer), this._fireRotation(this._map || this._layer._map, o, r, this._layer), delete this._startAngle, this._fireChange(this._layer.getLatLngs(), "Rotation");
  }, rotateLayerToAngle(e) {
    let i = e - this.getAngle();
    this.rotateLayer(i);
  }, getAngle() {
    return this._angle || 0;
  }, setInitAngle(e) {
    this._setAngle(e);
  }, getRotationCenter() {
    return this._getRotationCenter();
  }, setRotationCenter(e) {
    this._rotationCenter = e, this._rotatePoly && this._rotatePoly.pm.setRotationCenter(e);
  } }, Zu = Gu, qu = L.Class.extend({ includes: [Vu, ns, Zu, jn], options: { snappable: !0, snapDistance: 20, allowSelfIntersection: !0, allowSelfIntersectionEdit: !1, preventMarkerRemoval: !1, removeLayerBelowMinVertexCount: !0, limitMarkersToCount: -1, hideMiddleMarkers: !1, snapSegment: !0, syncLayersOnDrag: !1, draggable: !0, allowEditing: !0, allowRemoval: !0, allowCutting: !0, allowRotation: !0, addVertexOn: "click", removeVertexOn: "contextmenu", removeVertexValidation: void 0, addVertexValidation: void 0, moveVertexValidation: void 0, resizeableCircleMarker: !1, resizeableCircle: !0, snapMiddle: !1, snapVertex: !0 }, setOptions(e) {
    L.Util.setOptions(this, e);
  }, getOptions() {
    return this.options;
  }, applyOptions() {
  }, isPolygon() {
    return this._layer instanceof L.Polygon;
  }, getShape() {
    return this._shape;
  }, _setPane(e, i) {
    i === "layerPane" ? e.options.pane = this._map.pm.globalOptions.panes && this._map.pm.globalOptions.panes.layerPane || "overlayPane" : i === "vertexPane" ? e.options.pane = this._map.pm.globalOptions.panes && this._map.pm.globalOptions.panes.vertexPane || "markerPane" : i === "markerPane" && (e.options.pane = this._map.pm.globalOptions.panes && this._map.pm.globalOptions.panes.markerPane || "markerPane");
  }, remove() {
    (this._map || this._layer._map).pm.removeLayer({ target: this._layer });
  }, _vertexValidation(e, i) {
    let r = i.target, a = { layer: this._layer, marker: r, event: i }, o = "";
    return e === "move" ? o = "moveVertexValidation" : e === "add" ? o = "addVertexValidation" : e === "remove" && (o = "removeVertexValidation"), this.options[o] && typeof this.options[o] == "function" && !this.options[o](a) ? (e === "move" && (r._cancelDragEventChain = r.getLatLng()), !1) : (r._cancelDragEventChain = null, !0);
  }, _vertexValidationDrag(e) {
    return e._cancelDragEventChain ? (e._latlng = e._cancelDragEventChain, e.update(), !1) : !0;
  }, _vertexValidationDragEnd(e) {
    return e._cancelDragEventChain ? (e._cancelDragEventChain = null, !1) : !0;
  } }), Ne = qu;
  Ne.LayerGroup = L.Class.extend({ initialize(e) {
    this._layerGroup = e, this._layers = this.getLayers(), this._getMap(), this._layers.forEach((a) => this._initLayer(a));
    let i = (a) => {
      if (a.layer._pmTempLayer) return;
      this._layers = this.getLayers();
      let o = this._layers.filter((h) => !h.pm._parentLayerGroup || !(this._layerGroup._leaflet_id in h.pm._parentLayerGroup));
      o.forEach((h) => {
        this._initLayer(h);
      }), o.length > 0 && this._getMap() && this._getMap().pm.globalEditModeEnabled() && this.enabled() && this.enable(this.getOptions());
    };
    this._layerGroup.on("layeradd", L.Util.throttle(i, 100, this), this), this._layerGroup.on("layerremove", (a) => {
      this._removeLayerFromGroup(a.target);
    }, this);
    let r = (a) => {
      a.target._pmTempLayer || (this._layers = this.getLayers());
    };
    this._layerGroup.on("layerremove", L.Util.throttle(r, 100, this), this);
  }, enable(e, i = []) {
    i.length === 0 && (this._layers = this.getLayers()), this._options = e, this._layers.forEach((r) => {
      r instanceof L.LayerGroup ? i.indexOf(r._leaflet_id) === -1 && (i.push(r._leaflet_id), r.pm.enable(e, i)) : r.pm.enable(e);
    });
  }, disable(e = []) {
    e.length === 0 && (this._layers = this.getLayers()), this._layers.forEach((i) => {
      i instanceof L.LayerGroup ? e.indexOf(i._leaflet_id) === -1 && (e.push(i._leaflet_id), i.pm.disable(e)) : i.pm.disable();
    });
  }, enabled(e = []) {
    return e.length === 0 && (this._layers = this.getLayers()), !!this._layers.find((i) => i instanceof L.LayerGroup ? e.indexOf(i._leaflet_id) === -1 ? (e.push(i._leaflet_id), i.pm.enabled(e)) : !1 : i.pm.enabled());
  }, toggleEdit(e, i = []) {
    i.length === 0 && (this._layers = this.getLayers()), this._options = e, this._layers.forEach((r) => {
      r instanceof L.LayerGroup ? i.indexOf(r._leaflet_id) === -1 && (i.push(r._leaflet_id), r.pm.toggleEdit(e, i)) : r.pm.toggleEdit(e);
    });
  }, _initLayer(e) {
    let i = L.Util.stamp(this._layerGroup);
    e.pm._parentLayerGroup || (e.pm._parentLayerGroup = {}), e.pm._parentLayerGroup[i] = this._layerGroup;
  }, _removeLayerFromGroup(e) {
    if (e.pm && e.pm._layerGroup) {
      let i = L.Util.stamp(this._layerGroup);
      delete e.pm._layerGroup[i];
    }
  }, dragging() {
    return this._layers = this.getLayers(), this._layers ? !!this._layers.find((e) => e.pm.dragging()) : !1;
  }, getOptions() {
    return this.options;
  }, _getMap() {
    var e;
    return this._map || ((e = this._layers.find((i) => !!i._map)) == null ? void 0 : e._map) || null;
  }, getLayers(e = !1, i = !0, r = !0, a = []) {
    let o = [];
    return e ? this._layerGroup.getLayers().forEach((h) => {
      o.push(h), h instanceof L.LayerGroup && a.indexOf(h._leaflet_id) === -1 && (a.push(h._leaflet_id), o = o.concat(h.pm.getLayers(!0, !0, !0, a)));
    }) : o = this._layerGroup.getLayers(), r && (o = o.filter((h) => !(h instanceof L.LayerGroup))), i && (o = o.filter((h) => !!h.pm), o = o.filter((h) => !h._pmTempLayer), o = o.filter((h) => !L.PM.optIn && !h.options.pmIgnore || L.PM.optIn && h.options.pmIgnore === !1)), o;
  }, setOptions(e, i = []) {
    i.length === 0 && (this._layers = this.getLayers()), this.options = e, this._layers.forEach((r) => {
      r.pm && (r instanceof L.LayerGroup ? i.indexOf(r._leaflet_id) === -1 && (i.push(r._leaflet_id), r.pm.setOptions(e, i)) : r.pm.setOptions(e));
    });
  } }), Ne.Marker = Ne.extend({ _shape: "Marker", initialize(e) {
    this._layer = e, this._enabled = !1, this._layer.on("dragend", this._onDragEnd, this);
  }, enable(e = { draggable: !0 }) {
    if (L.Util.setOptions(this, e), !this.options.allowEditing || !this._layer._map) {
      this.disable();
      return;
    }
    this._map = this._layer._map, this.enabled() && this.disable(), this.applyOptions(), this._layer.on("remove", this.disable, this), this._enabled = !0, this._layer.on("pm:dragstart", this._onDragStart, this), this._layer.on("pm:dragend", this._onMarkerDragEnd, this), this._fireEnable();
  }, disable() {
    this.enabled() && (this.disableLayerDrag(), this._layer.off("remove", this.disable, this), this._layer.off("contextmenu", this._removeMarker, this), this._layerEdited && this._fireUpdate(), this._layerEdited = !1, this._fireDisable(), this._enabled = !1);
  }, enabled() {
    return this._enabled;
  }, toggleEdit(e) {
    this.enabled() ? this.disable() : this.enable(e);
  }, applyOptions() {
    this.options.snappable ? this._initSnappableMarkers() : this._disableSnapping(), this.options.draggable ? this.enableLayerDrag() : this.disableLayerDrag(), this.options.preventMarkerRemoval || this._layer.on("contextmenu", this._removeMarker, this);
  }, _removeMarker(e) {
    let i = e.target;
    i.remove(), this._fireRemove(i), this._fireRemove(this._map, i);
  }, _onDragStart() {
    this._map.pm.Draw.Marker._layerIsDragging = !0;
  }, _onMarkerDragEnd() {
    this._map.pm.Draw.Marker._layerIsDragging = !1;
  }, _onDragEnd() {
    this._fireEdit(), this._layerEdited = !0;
  }, _initSnappableMarkers() {
    let e = this._layer;
    this.options.snapDistance = this.options.snapDistance || 30, this.options.snapSegment = this.options.snapSegment === void 0 ? !0 : this.options.snapSegment, e.off("pm:drag", this._handleSnapping, this), e.on("pm:drag", this._handleSnapping, this), e.off("pm:dragend", this._cleanupSnapping, this), e.on("pm:dragend", this._cleanupSnapping, this), e.off("pm:dragstart", this._unsnap, this), e.on("pm:dragstart", this._unsnap, this);
  }, _disableSnapping() {
    let e = this._layer;
    e.off("pm:drag", this._handleSnapping, this), e.off("pm:dragend", this._cleanupSnapping, this), e.off("pm:dragstart", this._unsnap, this);
  } });
  var Sn = x(Vi()), Hu = { filterMarkerGroup() {
    this.markerCache = [], this.createCache(), this._layer.on("pm:edit", this.createCache, this), this.applyLimitFilters({}), this.throttledApplyLimitFilters || (this.throttledApplyLimitFilters = L.Util.throttle(this.applyLimitFilters, 100, this)), this._layer.on("pm:disable", this._removeMarkerLimitEvents, this), this._layer.on("remove", this._removeMarkerLimitEvents, this), this.options.limitMarkersToCount > -1 && (this._layer.on("pm:vertexremoved", this._initMarkers, this), this._map.on("mousemove", this.throttledApplyLimitFilters, this));
  }, _removeMarkerLimitEvents() {
    this._map.off("mousemove", this.throttledApplyLimitFilters, this), this._layer.off("pm:edit", this.createCache, this), this._layer.off("pm:disable", this._removeMarkerLimitEvents, this), this._layer.off("pm:vertexremoved", this._initMarkers, this);
  }, createCache() {
    let e = [...this._markerGroup.getLayers(), ...this.markerCache];
    this.markerCache = e.filter((i, r, a) => a.indexOf(i) === r);
  }, _removeFromCache(e) {
    let i = this.markerCache.indexOf(e);
    i > -1 && this.markerCache.splice(i, 1);
  }, renderLimits(e) {
    this.markerCache.forEach((i) => {
      e.includes(i) ? this._markerGroup.addLayer(i) : this._markerGroup.removeLayer(i);
    });
  }, applyLimitFilters({ latlng: e = { lat: 0, lng: 0 } }) {
    if (this._preventRenderMarkers) return;
    let i = [...this._filterClosestMarkers(e)];
    this.renderLimits(i);
  }, _filterClosestMarkers(e) {
    let i = [...this.markerCache], r = this.options.limitMarkersToCount;
    return r === -1 ? i : (i.sort((a, o) => {
      let h = a._latlng.distanceTo(e), f = o._latlng.distanceTo(e);
      return h - f;
    }), i.filter((a, o) => r > -1 ? o < r : !0));
  }, _preventRenderMarkers: !1, _preventRenderingMarkers(e) {
    this._preventRenderMarkers = !!e;
  } }, Ku = Hu;
  Ne.Line = Ne.extend({ includes: [Ku], _shape: "Line", initialize(e) {
    this._layer = e, this._enabled = !1;
  }, enable(e) {
    if (L.Util.setOptions(this, e), this._map = this._layer._map, !!this._map) {
      if (!this.options.allowEditing) {
        this.disable();
        return;
      }
      this.enabled() && this.disable(), this._enabled = !0, this._initMarkers(), this.applyOptions(), this._layer.on("remove", this.disable, this), this.options.allowSelfIntersection || this._layer.on("pm:vertexremoved", this._handleSelfIntersectionOnVertexRemoval, this), this.options.allowSelfIntersection ? this.cachedColor = void 0 : (this._layer.options.color !== "#f00000ff" ? (this.cachedColor = this._layer.options.color, this.isRed = !1) : this.isRed = !0, this._handleLayerStyle()), this._fireEnable();
    }
  }, disable() {
    if (!this.enabled() || this._dragging) return;
    this._enabled = !1, this._markerGroup.clearLayers(), this._markerGroup.removeFrom(this._map), this._layer.off("remove", this.disable, this), this.options.allowSelfIntersection || this._layer.off("pm:vertexremoved", this._handleSelfIntersectionOnVertexRemoval, this);
    let e = this._layer._path ? this._layer._path : this._layer._renderer._container;
    L.DomUtil.removeClass(e, "leaflet-pm-draggable"), this._layerEdited && this._fireUpdate(), this._layerEdited = !1, this._fireDisable();
  }, enabled() {
    return this._enabled;
  }, toggleEdit(e) {
    return this.enabled() ? this.disable() : this.enable(e), this.enabled();
  }, applyOptions() {
    this.options.snappable ? this._initSnappableMarkers() : this._disableSnapping();
  }, _initMarkers() {
    let e = this._map, i = this._layer.getLatLngs();
    this._markerGroup && (this._markerGroup.removeFrom(e), this._markerGroup.clearLayers()), this._markerGroup = new L.FeatureGroup(), this._markerGroup._pmTempLayer = !0;
    let r = (a) => {
      if (Array.isArray(a[0])) return a.map(r, this);
      let o = a.map(this._createMarker, this);
      return this.options.hideMiddleMarkers !== !0 && a.map((h, f) => {
        let _ = this.isPolygon() ? (f + 1) % a.length : f + 1;
        return this._createMiddleMarker(o[f], o[_]);
      }), o;
    };
    this._markers = r(i), this.filterMarkerGroup(), e.addLayer(this._markerGroup);
  }, _createMarker(e) {
    let i = new L.Marker(e, { draggable: !0, icon: L.divIcon({ className: "marker-icon" }) });
    return this._setPane(i, "vertexPane"), i._pmTempLayer = !0, this.options.rotate ? (i.on("dragstart", this._onRotateStart, this), i.on("drag", this._onRotate, this), i.on("dragend", this._onRotateEnd, this)) : (i.on("click", this._onVertexClick, this), i.on("dragstart", this._onMarkerDragStart, this), i.on("move", this._onMarkerDrag, this), i.on("dragend", this._onMarkerDragEnd, this), this.options.preventMarkerRemoval || i.on(this.options.removeVertexOn, this._removeMarker, this)), this._markerGroup.addLayer(i), i;
  }, _createMiddleMarker(e, i) {
    if (!e || !i) return !1;
    let r = L.PM.Utils.calcMiddleLatLng(this._map, e.getLatLng(), i.getLatLng()), a = this._createMarker(r), o = L.divIcon({ className: "marker-icon marker-icon-middle" });
    return a.setIcon(o), a.leftM = e, a.rightM = i, e._middleMarkerNext = a, i._middleMarkerPrev = a, a.on(this.options.addVertexOn, this._onMiddleMarkerClick, this), a.on("movestart", this._onMiddleMarkerMoveStart, this), a;
  }, _onMiddleMarkerClick(e) {
    let i = e.target;
    if (!this._vertexValidation("add", e)) return;
    let r = L.divIcon({ className: "marker-icon" });
    i.setIcon(r), this._addMarker(i, i.leftM, i.rightM);
  }, _onMiddleMarkerMoveStart(e) {
    let i = e.target;
    if (i.on("moveend", this._onMiddleMarkerMoveEnd, this), !this._vertexValidation("add", e)) {
      i.on("move", this._onMiddleMarkerMovePrevent, this);
      return;
    }
    i._dragging = !0, this._addMarker(i, i.leftM, i.rightM);
  }, _onMiddleMarkerMovePrevent(e) {
    let i = e.target;
    this._vertexValidationDrag(i);
  }, _onMiddleMarkerMoveEnd(e) {
    let i = e.target;
    if (i.off("move", this._onMiddleMarkerMovePrevent, this), i.off("moveend", this._onMiddleMarkerMoveEnd, this), !this._vertexValidationDragEnd(i)) return;
    let r = L.divIcon({ className: "marker-icon" });
    i.setIcon(r), setTimeout(() => {
      delete i._dragging;
    }, 100);
  }, _addMarker(e, i, r) {
    e.off("movestart", this._onMiddleMarkerMoveStart, this), e.off(this.options.addVertexOn, this._onMiddleMarkerClick, this);
    let a = e.getLatLng(), o = this._layer._latlngs;
    delete e.leftM, delete e.rightM;
    let { indexPath: h, index: f, parentPath: _ } = L.PM.Utils.findDeepMarkerIndex(this._markers, i), k = h.length > 1 ? (0, Sn.default)(o, _) : o, C = h.length > 1 ? (0, Sn.default)(this._markers, _) : this._markers;
    k.splice(f + 1, 0, a), C.splice(f + 1, 0, e), this._layer.setLatLngs(o), this.options.hideMiddleMarkers !== !0 && (this._createMiddleMarker(i, e), this._createMiddleMarker(e, r)), this._fireEdit(), this._layerEdited = !0, this._fireChange(this._layer.getLatLngs(), "Edit"), this._fireVertexAdded(e, L.PM.Utils.findDeepMarkerIndex(this._markers, e).indexPath, a), this.options.snappable && this._initSnappableMarkers();
  }, hasSelfIntersection() {
    return hr(this._layer.toGeoJSON(15)).features.length > 0;
  }, _handleSelfIntersectionOnVertexRemoval() {
    this._handleLayerStyle(!0) && (this._layer.setLatLngs(this._coordsBeforeEdit), this._coordsBeforeEdit = null, this._initMarkers());
  }, _handleLayerStyle(e) {
    let i = this._layer, r, a;
    if (this.options.allowSelfIntersection ? r = !1 : (a = hr(this._layer.toGeoJSON(15)), r = a.features.length > 0), r) {
      if (!this.options.allowSelfIntersection && this.options.allowSelfIntersectionEdit && this._updateDisabledMarkerStyle(this._markers, !0), this.isRed) return r;
      e ? this._flashLayer() : (i.setStyle({ color: "#f00000ff" }), this.isRed = !0), this._fireIntersect(a);
    } else i.setStyle({ color: this.cachedColor }), this.isRed = !1, !this.options.allowSelfIntersection && this.options.allowSelfIntersectionEdit && this._updateDisabledMarkerStyle(this._markers, !1);
    return r;
  }, _flashLayer() {
    this.cachedColor || (this.cachedColor = this._layer.options.color), this._layer.setStyle({ color: "#f00000ff" }), this.isRed = !0, window.setTimeout(() => {
      this._layer.setStyle({ color: this.cachedColor }), this.isRed = !1;
    }, 200);
  }, _updateDisabledMarkerStyle(e, i) {
    e.forEach((r) => {
      Array.isArray(r) ? this._updateDisabledMarkerStyle(r, i) : r._icon && (i && !this._checkMarkerAllowedToDrag(r) ? L.DomUtil.addClass(r._icon, "vertexmarker-disabled") : L.DomUtil.removeClass(r._icon, "vertexmarker-disabled"));
    });
  }, _removeMarker(e) {
    let i = e.target;
    if (!this._vertexValidation("remove", e)) return;
    this.options.allowSelfIntersection || (this._coordsBeforeEdit = Ai(this._layer, this._layer.getLatLngs()));
    let r = this._layer.getLatLngs(), { indexPath: a, index: o, parentPath: h } = L.PM.Utils.findDeepMarkerIndex(this._markers, i);
    if (!a) return;
    let f = a.length > 1 ? (0, Sn.default)(r, h) : r, _ = a.length > 1 ? (0, Sn.default)(this._markers, h) : this._markers, k = h[h.length - 1] > 0 && this._layer instanceof L.Polygon;
    if (!this.options.removeLayerBelowMinVertexCount && !k && (f.length <= 2 || this.isPolygon() && f.length <= 3)) {
      this._flashLayer();
      return;
    }
    f.splice(o, 1), this._layer.setLatLngs(r), this.isPolygon() && f.length <= 2 && f.splice(0, f.length);
    let C = !1;
    if (f.length <= 1 && (f.splice(0, f.length), h.length > 1 && a.length > 1 && (r = lr(r)), this._layer.setLatLngs(r), this._initMarkers(), C = !0), le(r) || this._layer.remove(), r = lr(r), this._layer.setLatLngs(r), this._markers = lr(this._markers), !C && (_ = a.length > 1 ? (0, Sn.default)(this._markers, h) : this._markers, i._middleMarkerPrev && (this._markerGroup.removeLayer(i._middleMarkerPrev), this._removeFromCache(i._middleMarkerPrev)), i._middleMarkerNext && (this._markerGroup.removeLayer(i._middleMarkerNext), this._removeFromCache(i._middleMarkerNext)), this._markerGroup.removeLayer(i), this._removeFromCache(i), _)) {
      let N, O;
      if (this.isPolygon() ? (N = (o + 1) % _.length, O = (o + (_.length - 1)) % _.length) : (O = o - 1 < 0 ? void 0 : o - 1, N = o + 1 >= _.length ? void 0 : o + 1), N !== O) {
        let K = _[O], Y = _[N];
        this.options.hideMiddleMarkers !== !0 && this._createMiddleMarker(K, Y);
      }
      _.splice(o, 1);
    }
    this._fireEdit(), this._layerEdited = !0, this._fireVertexRemoved(i, a), this._fireChange(this._layer.getLatLngs(), "Edit");
  }, updatePolygonCoordsFromMarkerDrag(e) {
    let i = this._layer.getLatLngs(), r = e.getLatLng(), { indexPath: a, index: o, parentPath: h } = L.PM.Utils.findDeepMarkerIndex(this._markers, e), f = a.length > 1 ? (0, Sn.default)(i, h) : i;
    r.alt = f[o].alt, f.splice(o, 1, r), this._layer.setLatLngs(i);
  }, _getNeighborMarkers(e) {
    let { indexPath: i, index: r, parentPath: a } = L.PM.Utils.findDeepMarkerIndex(this._markers, e), o = i.length > 1 ? (0, Sn.default)(this._markers, a) : this._markers, h = (r + 1) % o.length, f = (r + (o.length - 1)) % o.length, _ = o[f], k = o[h];
    return { prevMarker: _, nextMarker: k };
  }, _checkMarkerAllowedToDrag(e) {
    let { prevMarker: i, nextMarker: r } = this._getNeighborMarkers(e), a = L.polyline([i.getLatLng(), e.getLatLng()]), o = L.polyline([e.getLatLng(), r.getLatLng()]), h = oi(this._layer.toGeoJSON(15), a.toGeoJSON(15)).features.filter((_) => {
      let k = _.geometry.coordinates, C = L.latLng(k[1], k[0]);
      return !C.equals(i.getLatLng()) && !C.equals(e.getLatLng());
    }).length, f = oi(this._layer.toGeoJSON(15), o.toGeoJSON(15)).features.filter((_) => {
      let k = _.geometry.coordinates, C = L.latLng(k[1], k[0]);
      return !C.equals(r.getLatLng()) && !C.equals(e.getLatLng());
    }).length;
    return !(h < 1 && f < 1);
  }, _onMarkerDragStart(e) {
    let i = e.target;
    if (this._preventRenderingMarkers(!0), this.cachedColor || (this.cachedColor = this._layer.options.color), !this._vertexValidation("move", e)) return;
    let { indexPath: r } = L.PM.Utils.findDeepMarkerIndex(this._markers, i);
    this._fireMarkerDragStart(e, r), this.options.allowSelfIntersection || (this._coordsBeforeEdit = Ai(this._layer, this._layer.getLatLngs())), !this.options.allowSelfIntersection && this.options.allowSelfIntersectionEdit && this.hasSelfIntersection() ? this._markerAllowedToDrag = this._checkMarkerAllowedToDrag(i) : this._markerAllowedToDrag = null;
  }, _onMarkerDrag(e) {
    let i = e.target;
    if (!this._vertexValidationDrag(i)) return;
    let { indexPath: r, index: a, parentPath: o } = L.PM.Utils.findDeepMarkerIndex(this._markers, i);
    if (!r) return;
    if (!this.options.allowSelfIntersection && this.options.allowSelfIntersectionEdit && this.hasSelfIntersection() && this._markerAllowedToDrag === !1) {
      this._layer.setLatLngs(this._coordsBeforeEdit), this._initMarkers(), this._handleLayerStyle();
      return;
    }
    this.updatePolygonCoordsFromMarkerDrag(i);
    let h = r.length > 1 ? (0, Sn.default)(this._markers, o) : this._markers, f = (a + 1) % h.length, _ = (a + (h.length - 1)) % h.length, k = i.getLatLng(), C = h[_].getLatLng(), N = h[f].getLatLng();
    if (i._middleMarkerNext) {
      let O = L.PM.Utils.calcMiddleLatLng(this._map, k, N);
      i._middleMarkerNext.setLatLng(O);
    }
    if (i._middleMarkerPrev) {
      let O = L.PM.Utils.calcMiddleLatLng(this._map, k, C);
      i._middleMarkerPrev.setLatLng(O);
    }
    this.options.allowSelfIntersection || this._handleLayerStyle(), this._fireMarkerDrag(e, r), this._fireChange(this._layer.getLatLngs(), "Edit");
  }, _onMarkerDragEnd(e) {
    let i = e.target;
    if (this._preventRenderingMarkers(!1), !this._vertexValidationDragEnd(i)) return;
    let { indexPath: r } = L.PM.Utils.findDeepMarkerIndex(this._markers, i), a = !this.options.allowSelfIntersection && this.hasSelfIntersection();
    a && this.options.allowSelfIntersectionEdit && this._markerAllowedToDrag && (a = !1);
    let o = !this.options.allowSelfIntersection && a;
    if (this._fireMarkerDragEnd(e, r, o), o) {
      this._layer.setLatLngs(this._coordsBeforeEdit), this._coordsBeforeEdit = null, this._initMarkers(), this.options.snappable && this._initSnappableMarkers(), this._handleLayerStyle(), this._fireLayerReset(e, r);
      return;
    }
    !this.options.allowSelfIntersection && this.options.allowSelfIntersectionEdit && this._handleLayerStyle(), this._fireEdit(), this._layerEdited = !0, this._fireChange(this._layer.getLatLngs(), "Edit");
  }, _onVertexClick(e) {
    let i = e.target;
    if (i._dragging) return;
    let { indexPath: r } = L.PM.Utils.findDeepMarkerIndex(this._markers, i);
    this._fireVertexClick(e, r);
  } }), Ne.Polygon = Ne.Line.extend({ _shape: "Polygon", _checkMarkerAllowedToDrag(e) {
    let { prevMarker: i, nextMarker: r } = this._getNeighborMarkers(e), a = L.polyline([i.getLatLng(), e.getLatLng()]), o = L.polyline([e.getLatLng(), r.getLatLng()]), h = oi(this._layer.toGeoJSON(15), a.toGeoJSON(15)).features.filter((_) => {
      let k = _.geometry.coordinates, C = L.latLng(k[1], k[0]);
      return !C.equals(i.getLatLng()) && !C.equals(e.getLatLng());
    }).length, f = oi(this._layer.toGeoJSON(15), o.toGeoJSON(15)).features.filter((_) => {
      let k = _.geometry.coordinates, C = L.latLng(k[1], k[0]);
      return !C.equals(r.getLatLng()) && !C.equals(e.getLatLng());
    }).length;
    return !(h < 1 && f < 1);
  } }), Ne.Rectangle = Ne.Polygon.extend({ _shape: "Rectangle", _initMarkers() {
    let e = this._map, i = this._findCorners();
    this._markerGroup && this._markerGroup.clearLayers(), this._markerGroup = new L.FeatureGroup(), this._markerGroup._pmTempLayer = !0, e.addLayer(this._markerGroup), this._markers = [], this._markers[0] = i.map(this._createMarker, this), [this._cornerMarkers] = this._markers, this._layer.getLatLngs()[0].forEach((r, a) => {
      let o = this._cornerMarkers.find((h) => h._index === a);
      o && o.setLatLng(r);
    });
  }, applyOptions() {
    this.options.snappable ? this._initSnappableMarkers() : this._disableSnapping(), this._addMarkerEvents();
  }, _createMarker(e, i) {
    let r = new L.Marker(e, { draggable: !0, icon: L.divIcon({ className: "marker-icon" }) });
    return this._setPane(r, "vertexPane"), r._origLatLng = e, r._index = i, r._pmTempLayer = !0, r.on("click", this._onVertexClick, this), this._markerGroup.addLayer(r), r;
  }, _addMarkerEvents() {
    this._markers[0].forEach((e) => {
      e.on("dragstart", this._onMarkerDragStart, this), e.on("drag", this._onMarkerDrag, this), e.on("dragend", this._onMarkerDragEnd, this), this.options.preventMarkerRemoval || e.on("contextmenu", this._removeMarker, this);
    });
  }, _removeMarker() {
    return null;
  }, _onMarkerDragStart(e) {
    if (!this._vertexValidation("move", e)) return;
    let i = e.target, r = this._cornerMarkers;
    i._oppositeCornerLatLng = r.find((o) => o._index === (i._index + 2) % 4).getLatLng(), i._snapped = !1;
    let { indexPath: a } = L.PM.Utils.findDeepMarkerIndex(this._markers, i);
    this._fireMarkerDragStart(e, a);
  }, _onMarkerDrag(e) {
    let i = e.target;
    if (!this._vertexValidationDrag(i) || i._index === void 0) return;
    this._adjustRectangleForMarkerMove(i);
    let { indexPath: r } = L.PM.Utils.findDeepMarkerIndex(this._markers, i);
    this._fireMarkerDrag(e, r), this._fireChange(this._layer.getLatLngs(), "Edit");
  }, _onMarkerDragEnd(e) {
    let i = e.target;
    if (!this._vertexValidationDragEnd(i)) return;
    this._cornerMarkers.forEach((a) => {
      delete a._oppositeCornerLatLng;
    });
    let { indexPath: r } = L.PM.Utils.findDeepMarkerIndex(this._markers, i);
    this._fireMarkerDragEnd(e, r), this._fireEdit(), this._layerEdited = !0, this._fireChange(this._layer.getLatLngs(), "Edit");
  }, _adjustRectangleForMarkerMove(e) {
    L.extend(e._origLatLng, e._latlng);
    let i = L.PM.Utils._getRotatedRectangle(e.getLatLng(), e._oppositeCornerLatLng, this.getAngle(), this._map);
    this._layer.setLatLngs(i), this._adjustAllMarkers(e), this._layer.redraw();
  }, _adjustAllMarkers(e) {
    let i = this._layer.getLatLngs()[0];
    if (i && i.length !== 4 && i.length > 0) i.forEach((r, a) => {
      this._cornerMarkers[a].setLatLng(r);
    }), this._cornerMarkers.slice(i.length).forEach((r) => {
      r.setLatLng(i[0]);
    });
    else if (!i || !i.length) console.error("The layer has no LatLngs");
    else {
      let r = i.findIndex((a) => e.getLatLng().equals(a));
      r > -1 ? (this._cornerMarkers[(e._index + 1) % 4].setLatLng(i[(r + 1) % 4]), this._cornerMarkers[(e._index + 2) % 4].setLatLng(i[(r + 2) % 4]), this._cornerMarkers[(e._index + 3) % 4].setLatLng(i[(r + 3) % 4])) : this._cornerMarkers.forEach((a) => {
        a.setLatLng(i[a._index]);
      });
    }
  }, _findCorners() {
    this._angle === void 0 && this.setInitAngle(Wr(this._map, this._layer.getLatLngs()[0][0], this._layer.getLatLngs()[0][1]) || 0);
    let e = this._layer.getLatLngs()[0];
    return L.PM.Utils._getRotatedRectangle(e[0], e[2], this.getAngle(), this._map || this);
  } }), Ne.CircleMarker = Ne.extend({ _shape: "CircleMarker", initialize(e) {
    this._layer = e, this._enabled = !1, this._minRadiusOption = "minRadiusCircleMarker", this._maxRadiusOption = "maxRadiusCircleMarker", this._editableOption = "resizeableCircleMarker", this._updateHiddenPolyCircle();
  }, enable(e = { draggable: !0, snappable: !0 }) {
    if (L.Util.setOptions(this, e), this.options.editable && (this.options.resizeableCircleMarker = this.options.editable, delete this.options.editable), !this.options.allowEditing || !this._layer._map) {
      this.disable();
      return;
    }
    this._map = this._layer._map, this.enabled() && this.disable(), this.applyOptions(), this._layer.on("remove", this.disable, this), this._enabled = !0, this._extendingEnable(), this._updateHiddenPolyCircle(), this._fireEnable();
  }, _extendingEnable() {
    this._layer.on("pm:dragstart", this._onDragStart, this), this._layer.on("pm:drag", this._onMarkerDrag, this), this._layer.on("pm:dragend", this._onMarkerDragEnd, this);
  }, disable() {
    this.dragging() || (this._map || (this._map = this._layer._map), this._map && this.enabled() && (this.layerDragEnabled() && this.disableLayerDrag(), this._helperLayers && (this._helperLayers.clearLayers(), this._helperLayers.removeFrom(this._map)), this.options[this._editableOption] ? (this._map.off("move", this._syncMarkers, this), this._outerMarker.off("drag", this._handleOuterMarkerSnapping, this)) : this._map.off("move", this._updateHiddenPolyCircle, this), this._extendingDisable(), this._layer.off("remove", this.disable, this), this._layerEdited && this._fireUpdate(), this._layerEdited = !1, this._fireDisable(), this._enabled = !1));
  }, _extendingDisable() {
    this._layer.off("contextmenu", this._removeMarker, this);
  }, enabled() {
    return this._enabled;
  }, toggleEdit(e) {
    this.enabled() ? this.disable() : this.enable(e);
  }, applyOptions() {
    this.options[this._editableOption] ? (this._initMarkers(), this._map.on("move", this._syncMarkers, this), this.options.snappable ? (this._initSnappableMarkers(), this._outerMarker.on("drag", this._handleOuterMarkerSnapping, this), this._outerMarker.on("move", this._syncHintLine, this), this._outerMarker.on("move", this._syncCircleRadius, this)) : this._disableSnapping()) : (this.options.draggable && this.enableLayerDrag(), this._map.on("move", this._updateHiddenPolyCircle, this), this.options.snappable ? this._initSnappableMarkersDrag() : this._disableSnappingDrag()), this._extendingApplyOptions();
  }, _extendingApplyOptions() {
    this.options.preventMarkerRemoval || this._layer.on("contextmenu", this._removeMarker, this);
  }, _initMarkers() {
    let e = this._map;
    this._helperLayers && (this._helperLayers.removeFrom(e), this._helperLayers.clearLayers()), this._helperLayers = new L.FeatureGroup(), this._helperLayers._pmTempLayer = !0, this._helperLayers.addTo(e);
    let i = this._layer.getLatLng(), r = this._layer._radius, a = this._getLatLngOnCircle(i, r);
    this._centerMarker = this._createCenterMarker(i), this._outerMarker = this._createOuterMarker(a), this._markers = [this._centerMarker, this._outerMarker], this._createHintLine(this._centerMarker, this._outerMarker);
  }, _getLatLngOnCircle(e, i) {
    let r = this._map.project(e), a = L.point(r.x + i, r.y);
    return this._map.unproject(a);
  }, _createHintLine(e, i) {
    let r = e.getLatLng(), a = i.getLatLng();
    this._hintline = L.polyline([r, a], this.options.hintlineStyle), this._setPane(this._hintline, "layerPane"), this._hintline._pmTempLayer = !0, this._helperLayers.addLayer(this._hintline);
  }, _createCenterMarker(e) {
    let i = this._createMarker(e);
    return this.options.draggable ? (L.DomUtil.addClass(i._icon, "leaflet-pm-draggable"), i.on("move", this._moveCircle, this)) : i.dragging.disable(), i;
  }, _createOuterMarker(e) {
    let i = this._createMarker(e);
    return i.on("drag", this._resizeCircle, this), i;
  }, _createMarker(e) {
    let i = new L.Marker(e, { draggable: !0, icon: L.divIcon({ className: "marker-icon" }) });
    return this._setPane(i, "vertexPane"), i._origLatLng = e, i._pmTempLayer = !0, i.on("dragstart", this._onMarkerDragStart, this), i.on("drag", this._onMarkerDrag, this), i.on("dragend", this._onMarkerDragEnd, this), i.on("click", this._onVertexClick, this), this._helperLayers.addLayer(i), i;
  }, _moveCircle(e) {
    if (e.target._cancelDragEventChain) return;
    let i = this._centerMarker.getLatLng();
    this._layer.setLatLng(i);
    let r = this._layer._radius, a = this._getLatLngOnCircle(i, r);
    this._outerMarker._latlng = a, this._outerMarker.update(), this._syncHintLine(), this._updateHiddenPolyCircle(), this._fireCenterPlaced("Edit"), this._fireChange(this._layer.getLatLng(), "Edit");
  }, _syncMarkers() {
    let e = this._layer.getLatLng(), i = this._layer._radius, r = this._getLatLngOnCircle(e, i);
    this._outerMarker.setLatLng(r), this._centerMarker.setLatLng(e), this._syncHintLine(), this._updateHiddenPolyCircle();
  }, _resizeCircle() {
    this._outerMarker.setLatLng(this._getNewDestinationOfOuterMarker()), this._syncHintLine(), this._syncCircleRadius();
  }, _syncCircleRadius() {
    let e = this._centerMarker.getLatLng(), i = this._outerMarker.getLatLng(), r = this._distanceCalculation(e, i);
    this.options[this._minRadiusOption] && r < this.options[this._minRadiusOption] ? this._layer.setRadius(this.options[this._minRadiusOption]) : this.options[this._maxRadiusOption] && r > this.options[this._maxRadiusOption] ? this._layer.setRadius(this.options[this._maxRadiusOption]) : this._layer.setRadius(r), this._updateHiddenPolyCircle(), this._fireChange(this._layer.getLatLng(), "Edit");
  }, _syncHintLine() {
    let e = this._centerMarker.getLatLng(), i = this._outerMarker.getLatLng();
    this._hintline.setLatLngs([e, i]);
  }, _removeMarker() {
    this.options[this._editableOption] && this.disable(), this._layer.remove(), this._fireRemove(this._layer), this._fireRemove(this._map, this._layer);
  }, _onDragStart() {
    this._map.pm.Draw.CircleMarker._layerIsDragging = !0;
  }, _onMarkerDragStart(e) {
    this._vertexValidation("move", e) && this._fireMarkerDragStart(e);
  }, _onMarkerDrag(e) {
    let i = e.target;
    i instanceof L.Marker && !this._vertexValidationDrag(i) || this._fireMarkerDrag(e);
  }, _onMarkerDragEnd(e) {
    this._extedingMarkerDragEnd();
    let i = e.target;
    this._vertexValidationDragEnd(i) && (this.options[this._editableOption] && (this._fireEdit(), this._layerEdited = !0), this._fireMarkerDragEnd(e));
  }, _extedingMarkerDragEnd() {
    this._map.pm.Draw.CircleMarker._layerIsDragging = !1;
  }, _initSnappableMarkersDrag() {
    let e = this._layer;
    this.options.snapDistance = this.options.snapDistance || 30, this.options.snapSegment = this.options.snapSegment === void 0 ? !0 : this.options.snapSegment, e.off("pm:drag", this._handleSnapping, this), e.on("pm:drag", this._handleSnapping, this), e.off("pm:dragend", this._cleanupSnapping, this), e.on("pm:dragend", this._cleanupSnapping, this), e.off("pm:dragstart", this._unsnap, this), e.on("pm:dragstart", this._unsnap, this);
  }, _disableSnappingDrag() {
    let e = this._layer;
    e.off("pm:drag", this._handleSnapping, this), e.off("pm:dragend", this._cleanupSnapping, this), e.off("pm:dragstart", this._unsnap, this);
  }, _updateHiddenPolyCircle() {
    let e = this._layer._map || this._map;
    if (e) {
      let i = L.PM.Utils.pxRadiusToMeterRadius(this._layer.getRadius(), e, this._layer.getLatLng()), r = L.circle(this._layer.getLatLng(), this._layer.options);
      r.setRadius(i);
      let a = e && e.pm._isCRSSimple();
      this._hiddenPolyCircle ? this._hiddenPolyCircle.setLatLngs(L.PM.Utils.circleToPolygon(r, 200, !a).getLatLngs()) : this._hiddenPolyCircle = L.PM.Utils.circleToPolygon(r, 200, !a), this._hiddenPolyCircle._parentCopy || (this._hiddenPolyCircle._parentCopy = this._layer);
    }
  }, _getNewDestinationOfOuterMarker() {
    let e = this._centerMarker.getLatLng(), i = this._outerMarker.getLatLng(), r = this._distanceCalculation(e, i);
    return this.options[this._minRadiusOption] && r < this.options[this._minRadiusOption] ? i = bn(this._map, e, i, this._getMinDistanceInMeter(e)) : this.options[this._maxRadiusOption] && r > this.options[this._maxRadiusOption] && (i = bn(this._map, e, i, this._getMaxDistanceInMeter(e))), i;
  }, _handleOuterMarkerSnapping() {
    if (this._outerMarker._snapped) {
      let e = this._centerMarker.getLatLng(), i = this._outerMarker.getLatLng(), r = this._distanceCalculation(e, i);
      this.options[this._minRadiusOption] && r < this.options[this._minRadiusOption] ? this._outerMarker.setLatLng(this._outerMarker._orgLatLng) : this.options[this._maxRadiusOption] && r > this.options[this._maxRadiusOption] && this._outerMarker.setLatLng(this._outerMarker._orgLatLng);
    }
    this._outerMarker.setLatLng(this._getNewDestinationOfOuterMarker());
  }, _distanceCalculation(e, i) {
    return this._map.project(e).distanceTo(this._map.project(i));
  }, _getMinDistanceInMeter(e) {
    return L.PM.Utils.pxRadiusToMeterRadius(this.options[this._minRadiusOption], this._map, e);
  }, _getMaxDistanceInMeter(e) {
    return L.PM.Utils.pxRadiusToMeterRadius(this.options[this._maxRadiusOption], this._map, e);
  }, _onVertexClick(e) {
    e.target._dragging || this._fireVertexClick(e, void 0);
  } }), Ne.Circle = Ne.CircleMarker.extend({ _shape: "Circle", initialize(e) {
    this._layer = e, this._enabled = !1, this._minRadiusOption = "minRadiusCircle", this._maxRadiusOption = "maxRadiusCircle", this._editableOption = "resizeableCircle", this._updateHiddenPolyCircle();
  }, enable(e) {
    L.PM.Edit.CircleMarker.prototype.enable.call(this, e || {});
  }, _extendingEnable() {
  }, _extendingDisable() {
    this._layer.off("remove", this.disable, this);
    let e = this._layer._path ? this._layer._path : this._layer._renderer._container;
    L.DomUtil.removeClass(e, "leaflet-pm-draggable");
  }, _extendingApplyOptions() {
  }, _syncMarkers() {
  }, _removeMarker() {
  }, _onDragStart() {
  }, _extedingMarkerDragEnd() {
  }, _updateHiddenPolyCircle() {
    let e = this._map && this._map.pm._isCRSSimple();
    this._hiddenPolyCircle ? this._hiddenPolyCircle.setLatLngs(L.PM.Utils.circleToPolygon(this._layer, 200, !e).getLatLngs()) : this._hiddenPolyCircle = L.PM.Utils.circleToPolygon(this._layer, 200, !e), this._hiddenPolyCircle._parentCopy || (this._hiddenPolyCircle._parentCopy = this._layer);
  }, _distanceCalculation(e, i) {
    return this._map.distance(e, i);
  }, _getMinDistanceInMeter() {
    return this.options[this._minRadiusOption];
  }, _getMaxDistanceInMeter() {
    return this.options[this._maxRadiusOption];
  }, _onVertexClick(e) {
    e.target._dragging || this._fireVertexClick(e, void 0);
  } }), Ne.ImageOverlay = Ne.extend({ _shape: "ImageOverlay", initialize(e) {
    this._layer = e, this._enabled = !1;
  }, toggleEdit(e) {
    this.enabled() ? this.disable() : this.enable(e);
  }, enabled() {
    return this._enabled;
  }, enable(e = { draggable: !0, snappable: !0 }) {
    if (L.Util.setOptions(this, e), this._map = this._layer._map, !!this._map) {
      if (!this.options.allowEditing) {
        this.disable();
        return;
      }
      this.enabled() || this.disable(), this.enableLayerDrag(), this._layer.on("remove", this.disable, this), this._enabled = !0, this._otherSnapLayers = this._findCorners(), this._fireEnable();
    }
  }, disable() {
    this._dragging || (this._map || (this._map = this._layer._map), this.disableLayerDrag(), this._layer.off("remove", this.disable, this), this.enabled() || (this._layerEdited && this._fireUpdate(), this._layerEdited = !1, this._fireDisable()), this._enabled = !1);
  }, _findCorners() {
    let e = this._layer.getBounds(), i = e.getNorthWest(), r = e.getNorthEast(), a = e.getSouthEast(), o = e.getSouthWest();
    return [i, r, a, o];
  } }), Ne.Text = Ne.extend({ _shape: "Text", initialize(e) {
    this._layer = e, this._enabled = !1;
  }, enable(e) {
    if (L.Util.setOptions(this, e), !!this.textArea) {
      if (!this.options.allowEditing || !this._layer._map) {
        this.disable();
        return;
      }
      this._map = this._layer._map, this.enabled() && this.disable(), this.applyOptions(), this._safeToCacheDragState = !0, this._focusChange(), this.textArea.readOnly = !1, this.textArea.classList.remove("pm-disabled"), this._layer.on("remove", this.disable, this), L.DomEvent.on(this.textArea, "input", this._autoResize, this), L.DomEvent.on(this.textArea, "focus", this._focusChange, this), L.DomEvent.on(this.textArea, "blur", this._focusChange, this), this._layer.on("dblclick", L.DomEvent.stop), L.DomEvent.off(this.textArea, "mousedown", this._preventTextSelection), this._enabled = !0, this._fireEnable();
    }
  }, disable() {
    if (!this.enabled()) return;
    this._layer.off("remove", this.disable, this), L.DomEvent.off(this.textArea, "input", this._autoResize, this), L.DomEvent.off(this.textArea, "focus", this._focusChange, this), L.DomEvent.off(this.textArea, "blur", this._focusChange, this), document.removeEventListener("click", this._documentClickThis, { capture: !0 }), this._focusChange(), this.textArea.readOnly = !0, this.textArea.classList.add("pm-disabled");
    let e = document.activeElement;
    this.textArea.focus(), this.textArea.selectionStart = 0, this.textArea.selectionEnd = 0, L.DomEvent.on(this.textArea, "mousedown", this._preventTextSelection), e.focus(), this._disableOnBlurActive = !1, this._layerEdited && this._fireUpdate(), this._layerEdited = !1, this._fireDisable(), this._enabled = !1;
  }, enabled() {
    return this._enabled;
  }, toggleEdit(e) {
    this.enabled() ? this.disable() : this.enable(e);
  }, applyOptions() {
    this.options.snappable ? this._initSnappableMarkers() : this._disableSnapping();
  }, _initSnappableMarkers() {
    let e = this._layer;
    this.options.snapDistance = this.options.snapDistance || 30, this.options.snapSegment = this.options.snapSegment === void 0 ? !0 : this.options.snapSegment, e.off("pm:drag", this._handleSnapping, this), e.on("pm:drag", this._handleSnapping, this), e.off("pm:dragend", this._cleanupSnapping, this), e.on("pm:dragend", this._cleanupSnapping, this), e.off("pm:dragstart", this._unsnap, this), e.on("pm:dragstart", this._unsnap, this);
  }, _disableSnapping() {
    let e = this._layer;
    e.off("pm:drag", this._handleSnapping, this), e.off("pm:dragend", this._cleanupSnapping, this), e.off("pm:dragstart", this._unsnap, this);
  }, _autoResize() {
    this.textArea.style.height = "1px", this.textArea.style.width = "1px";
    let e = this.textArea.scrollHeight > 21 ? this.textArea.scrollHeight : 21, i = this.textArea.scrollWidth > 16 ? this.textArea.scrollWidth : 16;
    this.textArea.style.height = `${e}px`, this.textArea.style.width = `${i}px`, this._layer.options.text = this.getText(), this._fireTextChange(this.getText());
  }, _disableOnBlur() {
    this._disableOnBlurActive = !0, setTimeout(() => {
      this.enabled() && (this._documentClickThis = this._documentClickThis || this._documentClick.bind(this), document.addEventListener("click", this._documentClickThis, { capture: !0 }));
    }, 100);
  }, _documentClick(e) {
    e.target !== this.textArea && (this.disable(), !this.getText() && this.options.removeIfEmpty && this.remove());
  }, _focusChange(e = {}) {
    let i = this._hasFocus;
    this._hasFocus = e.type === "focus", !i != !this._hasFocus && (this._hasFocus ? (this._applyFocus(), this._focusText = this.getText(), this._fireTextFocus()) : (this._removeFocus(), this._fireTextBlur(), this._focusText !== this.getText() && (this._fireEdit(), this._layerEdited = !0)));
  }, _applyFocus() {
    this.textArea.classList.add("pm-hasfocus"), this._map.dragging && (this._safeToCacheDragState && (this._originalMapDragState = this._map.dragging._enabled, this._safeToCacheDragState = !1), this._map.dragging.disable());
  }, _removeFocus() {
    this._map.dragging && (this._originalMapDragState && this._map.dragging.enable(), this._safeToCacheDragState = !0), this.textArea.classList.remove("pm-hasfocus");
  }, focus() {
    if (!this.enabled()) throw new TypeError("Layer is not enabled");
    this.textArea.focus();
  }, blur() {
    if (!this.enabled()) throw new TypeError("Layer is not enabled");
    this.textArea.blur(), this._disableOnBlurActive && this.disable();
  }, hasFocus() {
    return this._hasFocus;
  }, getElement() {
    return this.textArea;
  }, setText(e) {
    e && (this.textArea.value = e), this._autoResize();
  }, getText() {
    return this.textArea.value;
  }, _initTextMarker() {
    if (this.textArea = L.PM.Draw.Text.prototype._createTextArea.call(this), this.options.className) {
      let i = this.options.className.split(" ");
      this.textArea.classList.add(...i);
    }
    let e = L.PM.Draw.Text.prototype._createTextIcon.call(this, this.textArea);
    this._layer.setIcon(e), this._layer.once("add", this._createTextMarker, this);
  }, _createTextMarker(e = !1) {
    this._layer.off("add", this._createTextMarker, this), this._layer.getElement().tabIndex = -1, this.textArea.wrap = "off", this.textArea.style.overflow = "hidden", this.textArea.style.height = L.DomUtil.getStyle(this.textArea, "font-size"), this.textArea.style.width = "1px", this._layer.options.text && this.setText(this._layer.options.text), this._autoResize(), e === !0 && (this.enable(), this.focus(), this._disableOnBlur());
  }, _preventTextSelection(e) {
    e.preventDefault();
  } });
  var No = function(e, i, r, a, o, h) {
    this._matrix = [e, i, r, a, o, h];
  };
  No.init = () => new L.PM.Matrix(1, 0, 0, 1, 0, 0), No.prototype = { transform(e) {
    return this._transform(e.clone());
  }, _transform(e) {
    let i = this._matrix, { x: r, y: a } = e;
    return e.x = i[0] * r + i[1] * a + i[4], e.y = i[2] * r + i[3] * a + i[5], e;
  }, untransform(e) {
    let i = this._matrix;
    return new L.Point((e.x / i[0] - i[4]) / i[0], (e.y / i[2] - i[5]) / i[2]);
  }, clone() {
    let e = this._matrix;
    return new L.PM.Matrix(e[0], e[1], e[2], e[3], e[4], e[5]);
  }, translate(e) {
    if (e === void 0) return new L.Point(this._matrix[4], this._matrix[5]);
    let i, r;
    return typeof e == "number" ? (i = e, r = e) : (i = e.x, r = e.y), this._add(1, 0, 0, 1, i, r);
  }, scale(e, i) {
    if (e === void 0) return new L.Point(this._matrix[0], this._matrix[3]);
    let r, a;
    return i = i || L.point(0, 0), typeof e == "number" ? (r = e, a = e) : (r = e.x, a = e.y), this._add(r, 0, 0, a, i.x, i.y)._add(1, 0, 0, 1, -i.x, -i.y);
  }, rotate(e, i) {
    let r = Math.cos(e), a = Math.sin(e);
    return i = i || new L.Point(0, 0), this._add(r, a, -a, r, i.x, i.y)._add(1, 0, 0, 1, -i.x, -i.y);
  }, flip() {
    return this._matrix[1] *= -1, this._matrix[2] *= -1, this;
  }, _add(e, i, r, a, o, h) {
    let f = [[], [], []], _ = this._matrix, k = [[_[0], _[2], _[4]], [_[1], _[3], _[5]], [0, 0, 1]], C = [[e, r, o], [i, a, h], [0, 0, 1]], N;
    e && e instanceof L.PM.Matrix && (_ = e._matrix, C = [[_[0], _[2], _[4]], [_[1], _[3], _[5]], [0, 0, 1]]);
    for (let O = 0; O < 3; O += 1) for (let K = 0; K < 3; K += 1) {
      N = 0;
      for (let Y = 0; Y < 3; Y += 1) N += k[O][Y] * C[Y][K];
      f[O][K] = N;
    }
    return this._matrix = [f[0][0], f[1][0], f[0][1], f[1][1], f[0][2], f[1][2]], this;
  } };
  var Wu = No, Ju = { calcMiddleLatLng(e, i, r) {
    let a = e.project(i), o = e.project(r);
    return e.unproject(a._add(o)._divideBy(2));
  }, findLayers(e) {
    let i = [];
    return e.eachLayer((r) => {
      (r instanceof L.Polyline || r instanceof L.Marker || r instanceof L.Circle || r instanceof L.CircleMarker || r instanceof L.ImageOverlay) && i.push(r);
    }), i = i.filter((r) => !!r.pm), i = i.filter((r) => !r._pmTempLayer), i = i.filter((r) => !L.PM.optIn && !r.options.pmIgnore || L.PM.optIn && r.options.pmIgnore === !1), i;
  }, circleToPolygon(e, i = 60, r = !0) {
    let a = e.getLatLng(), o = e.getRadius(), h = vn(a, o, i, 0, r), f = [];
    for (let _ = 0; _ < h.length; _ += 1) {
      let k = [h[_].lat, h[_].lng];
      f.push(k);
    }
    return L.polygon(f, e.options);
  }, disablePopup(e) {
    e.getPopup() && (e._tempPopupCopy = e.getPopup(), e.unbindPopup());
  }, enablePopup(e) {
    e._tempPopupCopy && (e.bindPopup(e._tempPopupCopy), delete e._tempPopupCopy);
  }, _fireEvent(e, i, r, a = !1) {
    e.fire(i, r, a);
    let { groups: o } = this.getAllParentGroups(e);
    o.forEach((h) => {
      h.fire(i, r, a);
    });
  }, getAllParentGroups(e) {
    let i = [], r = [], a = (o) => {
      for (let h in o._eventParents) if (i.indexOf(h) === -1) {
        i.push(h);
        let f = o._eventParents[h];
        r.push(f), a(f);
      }
    };
    return !e._pmLastGroupFetch || !e._pmLastGroupFetch.time || (/* @__PURE__ */ new Date()).getTime() - e._pmLastGroupFetch.time > 1e3 ? (a(e), e._pmLastGroupFetch = { time: (/* @__PURE__ */ new Date()).getTime(), groups: r, groupIds: i }, { groupIds: i, groups: r }) : { groups: e._pmLastGroupFetch.groups, groupIds: e._pmLastGroupFetch.groupIds };
  }, createGeodesicPolygon: vn, getTranslation: ce, findDeepCoordIndex(e, i, r = !0) {
    let a, o = (f) => (_, k) => {
      let C = f.concat(k);
      if (r) {
        if (_.lat && _.lat === i.lat && _.lng === i.lng) return a = C, !0;
      } else if (_.lat && L.latLng(_).equals(i)) return a = C, !0;
      return Array.isArray(_) && _.some(o(C));
    };
    e.some(o([]));
    let h = {};
    return a && (h = { indexPath: a, index: a[a.length - 1], parentPath: a.slice(0, a.length - 1) }), h;
  }, findDeepMarkerIndex(e, i) {
    let r, a = (h) => (f, _) => {
      let k = h.concat(_);
      return f._leaflet_id === i._leaflet_id ? (r = k, !0) : Array.isArray(f) && f.some(a(k));
    };
    e.some(a([]));
    let o = {};
    return r && (o = { indexPath: r, index: r[r.length - 1], parentPath: r.slice(0, r.length - 1) }), o;
  }, _getIndexFromSegment(e, i) {
    if (i && i.length === 2) {
      let r = this.findDeepCoordIndex(e, i[0]), a = this.findDeepCoordIndex(e, i[1]), o = Math.max(r.index, a.index);
      return (r.index === 0 || a.index === 0) && o !== 1 && (o += 1), { indexA: r, indexB: a, newIndex: o, indexPath: r.indexPath, parentPath: r.parentPath };
    }
    return null;
  }, _getRotatedRectangle(e, i, r, a) {
    let o = br(a, e), h = br(a, i), f = r * Math.PI / 180, _ = Math.cos(f), k = Math.sin(f), C = (h.x - o.x) * _ + (h.y - o.y) * k, N = (h.y - o.y) * _ - (h.x - o.x) * k, O = C * _ + o.x, K = C * k + o.y, Y = -N * k + o.x, dt = N * _ + o.y, _t = Is(a, o), Lt = Is(a, { x: O, y: K }), Pt = Is(a, h), F = Is(a, { x: Y, y: dt });
    return [_t, Lt, Pt, F];
  }, pxRadiusToMeterRadius(e, i, r) {
    let a = i.project(r), o = L.point(a.x + e, a.y);
    return i.distance(i.unproject(o), r);
  } }, Xu = Ju;
  L.PM = L.PM || { version: Ce.version, Map: yi, Toolbar: es, Draw: De, Edit: Ne, Utils: Xu, Matrix: Wu, activeLang: "en", optIn: !1, initialize(e) {
    this.addInitHooks(e);
  }, setOptIn(e) {
    this.optIn = !!e;
  }, addInitHooks() {
    function e() {
      this.pm = void 0, L.PM.optIn ? this.options.pmIgnore === !1 && (this.pm = new L.PM.Map(this)) : this.options.pmIgnore || (this.pm = new L.PM.Map(this)), this.pm && this.pm.setGlobalOptions({});
    }
    L.Map.addInitHook(e);
    function i() {
      this.pm = void 0, L.PM.optIn ? this.options.pmIgnore === !1 && (this.pm = new L.PM.Edit.LayerGroup(this)) : this.options.pmIgnore || (this.pm = new L.PM.Edit.LayerGroup(this));
    }
    L.LayerGroup.addInitHook(i);
    function r() {
      this.pm = void 0, L.PM.optIn ? this.options.pmIgnore === !1 && (this.options.textMarker ? (this.pm = new L.PM.Edit.Text(this), this.options._textMarkerOverPM || this.pm._initTextMarker(), delete this.options._textMarkerOverPM) : this.pm = new L.PM.Edit.Marker(this)) : this.options.pmIgnore || (this.options.textMarker ? (this.pm = new L.PM.Edit.Text(this), this.options._textMarkerOverPM || this.pm._initTextMarker(), delete this.options._textMarkerOverPM) : this.pm = new L.PM.Edit.Marker(this));
    }
    L.Marker.addInitHook(r);
    function a() {
      this.pm = void 0, L.PM.optIn ? this.options.pmIgnore === !1 && (this.pm = new L.PM.Edit.CircleMarker(this)) : this.options.pmIgnore || (this.pm = new L.PM.Edit.CircleMarker(this));
    }
    L.CircleMarker.addInitHook(a);
    function o() {
      this.pm = void 0, L.PM.optIn ? this.options.pmIgnore === !1 && (this.pm = new L.PM.Edit.Line(this)) : this.options.pmIgnore || (this.pm = new L.PM.Edit.Line(this));
    }
    L.Polyline.addInitHook(o);
    function h() {
      this.pm = void 0, L.PM.optIn ? this.options.pmIgnore === !1 && (this.pm = new L.PM.Edit.Polygon(this)) : this.options.pmIgnore || (this.pm = new L.PM.Edit.Polygon(this));
    }
    L.Polygon.addInitHook(h);
    function f() {
      this.pm = void 0, L.PM.optIn ? this.options.pmIgnore === !1 && (this.pm = new L.PM.Edit.Rectangle(this)) : this.options.pmIgnore || (this.pm = new L.PM.Edit.Rectangle(this));
    }
    L.Rectangle.addInitHook(f);
    function _() {
      this.pm = void 0, L.PM.optIn ? this.options.pmIgnore === !1 && (this.pm = new L.PM.Edit.Circle(this)) : this.options.pmIgnore || (this.pm = new L.PM.Edit.Circle(this));
    }
    L.Circle.addInitHook(_);
    function k() {
      this.pm = void 0, L.PM.optIn ? this.options.pmIgnore === !1 && (this.pm = new L.PM.Edit.ImageOverlay(this)) : this.options.pmIgnore || (this.pm = new L.PM.Edit.ImageOverlay(this));
    }
    L.ImageOverlay.addInitHook(k);
  }, reInitLayer(e) {
    e instanceof L.LayerGroup && e.eachLayer((i) => {
      this.reInitLayer(i);
    }), e.pm || L.PM.optIn && e.options.pmIgnore !== !1 || e.options.pmIgnore || (e instanceof L.Map ? e.pm = new L.PM.Map(e) : e instanceof L.Marker ? e.options.textMarker ? (e.pm = new L.PM.Edit.Text(e), e.pm._initTextMarker(), e.pm._createTextMarker(!1)) : e.pm = new L.PM.Edit.Marker(e) : e instanceof L.Circle ? e.pm = new L.PM.Edit.Circle(e) : e instanceof L.CircleMarker ? e.pm = new L.PM.Edit.CircleMarker(e) : e instanceof L.Rectangle ? e.pm = new L.PM.Edit.Rectangle(e) : e instanceof L.Polygon ? e.pm = new L.PM.Edit.Polygon(e) : e instanceof L.Polyline ? e.pm = new L.PM.Edit.Line(e) : e instanceof L.LayerGroup ? e.pm = new L.PM.Edit.LayerGroup(e) : e instanceof L.ImageOverlay && (e.pm = new L.PM.Edit.ImageOverlay(e)));
  } }, L.version === "1.7.1" && L.Canvas.include({ _onClick(e) {
    let i = this._map.mouseEventToLayerPoint(e), r, a;
    for (let o = this._drawFirst; o; o = o.next) r = o.layer, r.options.interactive && r._containsPoint(i) && (!(e.type === "click" || e.type === "preclick") || !this._map._draggableMoved(r)) && (a = r);
    a && (L.DomEvent.fakeStop(e), this._fireEvent([a], e));
  } }), L.PM.initialize();
})();
const Sc = { class: "field map-field" }, Pc = { class: "map-label" }, Tc = { class: "map-toolbar" }, Dc = ["title"], Oc = ["title"], Ic = {
  key: 0,
  class: "map-wkt"
}, Fc = {
  key: 1,
  class: "map-hint"
}, Rc = {
  __name: "MapField",
  props: {
    field: Object,
    lang: String,
    modelValue: { type: String, default: "" }
  },
  emits: ["update:modelValue"],
  setup(u, { emit: l }) {
    delete Ii.Icon.Default.prototype._getIconUrl, Ii.Icon.Default.mergeOptions({
      iconRetinaUrl: new URL("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAABSCAMAAAAhFXfZAAAC91BMVEVMaXEzeak2f7I4g7g3g7cua5gzeKg8hJo3grY4g7c3grU0gLI2frE0daAubJc2gbQwd6QzeKk2gLMtd5sxdKIua5g1frA2f7IydaM0e6w2fq41fK01eqo3grgubJgta5cxdKI1f7AydaQydaMxc6EubJgvbJkwcZ4ubZkwcJwubZgubJcydqUydKIxapgubJctbJcubZcubJcvbJYubJcvbZkubJctbJctbZcubJg2f7AubJcrbZcubJcubJcua5g3grY0fq8ubJcubJdEkdEwhsw6i88vhswuhcsuhMtBjMgthMsrg8srgss6is8qgcs8i9A9iMYtg8spgcoogMo7hcMngMonf8olfso4gr8kfck5iM8jfMk4iM8he8k1fro7itAgesk2hs8eecgzfLcofssdeMg0hc4cd8g2hcsxeLQbdsgZdcgxeLImfcszhM0vda4xgckzhM4xg84wf8Yxgs4udKsvfcQucqhUndROmdM1fK0wcZ8vb5w0eqpQm9MzeKhXoNVcpdYydKNWn9VZotVKltJFjsIwcJ1Rms9OlslLmtH///8+kc9epdYzd6dbo9VHkMM2f7FHmNBClM8ydqVcpNY9hro3gLM9hLczealQmcw3fa46f7A8gLMxc6I3eagyc6FIldJMl9JSnNRSntNNl9JPnNJFi75UnM9ZodVKksg8kM45jc09e6ZHltFBk883gbRBh7pDk9EwcaBzn784g7dKkcY2i81Om9M7j85Llc81is09g7Q4grY/j9A0eqxKmdFFltBEjcXf6fFImdBCiLxJl9FGlNFBi78yiMxVndEvbpo6js74+vx+psPP3+o/ks5HkcpGmNCjwdZCkNDM3ehYoNJEls+lxNkxh8xHks0+jdC1zd5Lg6r+/v/H2ufz9/o3jM3t8/edvdM/k89Th61OiLBSjbZklbaTt9BfptdjmL1AicBHj8hGk9FAgK1dkLNTjLRekrdClc/k7fM0icy0y9tgp9c4jc2NtM9Dlc8zicxeXZn3AAAAQ3RSTlMAHDdTb4yPA+LtnEQmC4L2EmHqB7XA0d0sr478x4/Yd5i1zOfyPkf1sLVq4Nh3FvjxopQ2/STNuFzUwFIwxKaejILpIBEV9wAABhVJREFUeF6s1NdyFEcYBeBeoQIhRAkLlRDGrhIgY3BJL8CVeKzuyXFzzjkn5ZxzzuScg3PO8cKzu70JkO0LfxdTU//pM9vTu7Xgf6KqOVTb9X7toRrVEfBf1HTVjZccrT/2by1VV928Yty9ZbVuucdz90frG8DBjl9pVApbOstvmMuvVgaNXSfAAd6pGxpy6yxf5ph43pS/4f3uoaGm2rdu72S9xzOvMymkZFq/ptDrk90mhW7e4zl7HLzhxGWPR20xmSxJ/VqldG5m9XhaVOA1DadsNh3Pu5L2N6QtPO/32JpqQBVVk20oy/Pi2s23WEvyfHbe1thadVQttvm7Llf65gGmXK67XtupyoM7HQhmXdLS8oGWJNeOJ3C5fG5XCEJnkez3/oFdsvgJ4l2ANZwhrJKk/7OSXa+3Vw2WJMlKnGkobouYk6T0TyX30klOUnTD9HJ5qpckL3EW/w4XF3Xd0FGywXUrstrclVsqz5Pd/sXFYyDnPdrLcQODmGOK47IZb4CmibmMn+MYRzFZ5jg33ZL/EJrWcszHmANy3ARBK/IXtciJy8VsitPSdE3uuHxzougojcUdr8/32atnz/ev3f/K5wtpxUTpcaI45zusVDpYtZi+jg0oU9b3x74h7+n9ABvYEZeKaVq0sh0AtLKsFtqNBdeT0MrSzwwlq9+x6xAO4tgOtSzbCjrNQQiNvQUbUEubvzBUeGw26yDCsRHCoLkTHDa7IdOLIThs/gHvChszh2CimE8peRs47cxANI0lYNB5y1DljpOF0IhzBDPOZnDOqYYbeGKECbPzWnXludPphw5c2YBq5zlwXphIbO4VDCZ0gnPfUO1TwZoYwAs2ExPCedAu9DAjfQUjzITQb3jNj0KG2Sgt6BHaQUdYzWz+XmBktOHwanXjaSTcwwziBcuMOtwBmqPrTOxFQR/DRKKPqyur0aiW6cULYsx6tBm0jXpR/AUWR6HRq9WVW6MRhIq5jLyjbaCTDCijyYJNpCajdyobP/eTw0iexBAKkJ3gA5KcQb2zBXsIBckn+xVv8jkZSaEFHE+jFEleAEfayRU0MouNoBmB/L50Ai/HSLIHxcrpCvnhSQAuakKp2C/YbCylJjXRVy/z3+Kv/RrNcCo+WUzlVEhzKffnTQnxeN9fWF88fiNCUdSTsaufaChKWInHeysygfpIqagoakW+vV20J8uyl6TyNKEZWV4oRSPyCkWpgOLSbkCObT8o2r6tlG58HQquf6O0v50tB7JM7F4EORd2dx/K0w/KHsVkLPaoYrwgP/y7krr3SSMA4zj+OBgmjYkxcdIJQyQRKgg2viX9Hddi9UBb29LrKR7CVVEEEXWojUkXNyfTNDE14W9gbHJNuhjDettN3ZvbOvdOqCD3Jp/9l+/wJE+9PkYGjx/fqkys3S2rMozM/o2106rfMUINo6hVqz+eu/hd1c4xTg0TAfy5kV+4UG6+IthHTU9woWmxuKNbTfuCSfovBCxq7EtHqvYL4Sm6F8GVxsSXHMQ07TOi1DKtZxjWaaIyi4CXWjxPccUw8WVbMYY5wxC1mzEyXMJWkllpRloi+Kkoq69sxBTlElF6aAxYUbjXNlhlDZilDnM4U5SlN5biRsRHnbx3mbeWjEh4mEyiuJDl5XcWVmX5GvNkFgLWZM5qwsop4/AWfLhU1cR7k1VVvcYCWRkOI6Xy5gmnphCYIkvzuNYzHzosq2oNk2RtSs8khfUOfHIDgR6ysYBaMpl4uEgk2U/oJTs9AaTSwma7dT69geAE2ZpEjUsn2ieJNHeKfrI3EcAGJ2ZaNgVuC8EBctCLc57P5u5led6IOBkIYkuQMrmmjChs4VkfOerHqSBkPzZlhe06RslZ3zMjk2sscqKwY0RcjKK+LWbzd7KiHhkncs/siFJ+V5eXxD34B8nVuJEpGJNmxN2gH3vSvp7J70tF+D1Ej8qUJD1TkErAND2GZwTFg/LubvmgiBG3SOvdlsqFQrkEzJCL1rstlnVFROixZoDDSuXQFHESwVGlcuQcMb/b42NgjLowh5MTDFE3vNB5qStRIErdCQEh6pLPR92anSUb/wAIhldAaDMpGgAAAABJRU5ErkJggg==", import.meta.url).href,
      iconUrl: new URL("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAApCAYAAADAk4LOAAAFgUlEQVR4Aa1XA5BjWRTN2oW17d3YaZtr2962HUzbDNpjszW24mRt28p47v7zq/bXZtrp/lWnXr337j3nPCe85NcypgSFdugCpW5YoDAMRaIMqRi6aKq5E3YqDQO3qAwjVWrD8Ncq/RBpykd8oZUb/kaJutow8r1aP9II0WmLKLIsJyv1w/kqw9Ch2MYdB++12Onxee/QMwvf4/Dk/Lfp/i4nxTXtOoQ4pW5Aj7wpici1A9erdAN2OH64x8OSP9j3Ft3b7aWkTg/Fm91siTra0f9on5sQr9INejH6CUUUpavjFNq1B+Oadhxmnfa8RfEmN8VNAsQhPqF55xHkMzz3jSmChWU6f7/XZKNH+9+hBLOHYozuKQPxyMPUKkrX/K0uWnfFaJGS1QPRtZsOPtr3NsW0uyh6NNCOkU3Yz+bXbT3I8G3xE5EXLXtCXbbqwCO9zPQYPRTZ5vIDXD7U+w7rFDEoUUf7ibHIR4y6bLVPXrz8JVZEql13trxwue/uDivd3fkWRbS6/IA2bID4uk0UpF1N8qLlbBlXs4Ee7HLTfV1j54APvODnSfOWBqtKVvjgLKzF5YdEk5ewRkGlK0i33Eofffc7HT56jD7/6U+qH3Cx7SBLNntH5YIPvODnyfIXZYRVDPqgHtLs5ABHD3YzLuespb7t79FY34DjMwrVrcTuwlT55YMPvOBnRrJ4VXTdNnYug5ucHLBjEpt30701A3Ts+HEa73u6dT3FNWwflY86eMHPk+Yu+i6pzUpRrW7SNDg5JHR4KapmM5Wv2E8Tfcb1HoqqHMHU+uWDD7zg54mz5/2BSnizi9T1Dg4QQXLToGNCkb6tb1NU+QAlGr1++eADrzhn/u8Q2YZhQVlZ5+CAOtqfbhmaUCS1ezNFVm2imDbPmPng5wmz+gwh+oHDce0eUtQ6OGDIyR0uUhUsoO3vfDmmgOezH0mZN59x7MBi++WDL1g/eEiU3avlidO671bkLfwbw5XV2P8Pzo0ydy4t2/0eu33xYSOMOD8hTf4CrBtGMSoXfPLchX+J0ruSePw3LZeK0juPJbYzrhkH0io7B3k164hiGvawhOKMLkrQLyVpZg8rHFW7E2uHOL888IBPlNZ1FPzstSJM694fWr6RwpvcJK60+0HCILTBzZLFNdtAzJaohze60T8qBzyh5ZuOg5e7uwQppofEmf2++DYvmySqGBuKaicF1blQjhuHdvCIMvp8whTTfZzI7RldpwtSzL+F1+wkdZ2TBOW2gIF88PBTzD/gpeREAMEbxnJcaJHNHrpzji0gQCS6hdkEeYt9DF/2qPcEC8RM28Hwmr3sdNyht00byAut2k3gufWNtgtOEOFGUwcXWNDbdNbpgBGxEvKkOQsxivJx33iow0Vw5S6SVTrpVq11ysA2Rp7gTfPfktc6zhtXBBC+adRLshf6sG2RfHPZ5EAc4sVZ83yCN00Fk/4kggu40ZTvIEm5g24qtU4KjBrx/BTTH8ifVASAG7gKrnWxJDcU7x8X6Ecczhm3o6YicvsLXWfh3Ch1W0k8x0nXF+0fFxgt4phz8QvypiwCCFKMqXCnqXExjq10beH+UUA7+nG6mdG/Pu0f3LgFcGrl2s0kNNjpmoJ9o4B29CMO8dMT4Q5ox8uitF6fqsrJOr8qnwNbRzv6hSnG5wP+64C7h9lp30hKNtKdWjtdkbuPA19nJ7Tz3zR/ibgARbhb4AlhavcBebmTHcFl2fvYEnW0ox9xMxKBS8btJ+KiEbq9zA4RthQXDhPa0T9TEe69gWupwc6uBUphquXgf+/FrIjweHQS4/pduMe5ERUMHUd9xv8ZR98CxkS4F2n3EUrUZ10EYNw7BWm9x1GiPssi3GgiGRDKWRYZfXlON+dfNbM+GgIwYdwAAAAASUVORK5CYII=", import.meta.url).href,
      shadowUrl: new URL("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACkAAAApCAQAAAACach9AAACMUlEQVR4Ae3ShY7jQBAE0Aoz/f9/HTMzhg1zrdKUrJbdx+Kd2nD8VNudfsL/Th///dyQN2TH6f3y/BGpC379rV+S+qqetBOxImNQXL8JCAr2V4iMQXHGNJxeCfZXhSRBcQMfvkOWUdtfzlLgAENmZDcmo2TVmt8OSM2eXxBp3DjHSMFutqS7SbmemzBiR+xpKCNUIRkdkkYxhAkyGoBvyQFEJEefwSmmvBfJuJ6aKqKWnAkvGZOaZXTUgFqYULWNSHUckZuR1HIIimUExutRxwzOLROIG4vKmCKQt364mIlhSyzAf1m9lHZHJZrlAOMMztRRiKimp/rpdJDc9Awry5xTZCte7FHtuS8wJgeYGrex28xNTd086Dik7vUMscQOa8y4DoGtCCSkAKlNwpgNtphjrC6MIHUkR6YWxxs6Sc5xqn222mmCRFzIt8lEdKx+ikCtg91qS2WpwVfBelJCiQJwvzixfI9cxZQWgiSJelKnwBElKYtDOb2MFbhmUigbReQBV0Cg4+qMXSxXSyGUn4UbF8l+7qdSGnTC0XLCmahIgUHLhLOhpVCtw4CzYXvLQWQbJNmxoCsOKAxSgBJno75avolkRw8iIAFcsdc02e9iyCd8tHwmeSSoKTowIgvscSGZUOA7PuCN5b2BX9mQM7S0wYhMNU74zgsPBj3HU7wguAfnxxjFQGBE6pwN+GjME9zHY7zGp8wVxMShYX9NXvEWD3HbwJf4giO4CFIQxXScH1/TM+04kkBiAAAAAElFTkSuQmCC", import.meta.url).href
    });
    const d = u, p = l, { t: b } = Qe(), E = Ft(() => {
      var $, tt;
      return (($ = d.field.label) == null ? void 0 : $[d.lang]) || ((tt = d.field.label) == null ? void 0 : tt.en) || d.field.id;
    }), w = Kt(null), g = Kt(null);
    let x = null, S = null;
    Ar(() => {
      x = Ii.map(w.value).setView([47.5, 13.5], 6), Ii.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        maxZoom: 19
      }).addTo(x), x.pm.setLang(d.lang === "de" ? "de" : "en"), x.on("pm:create", ($) => {
        S && S.remove(), S = $.layer, x.pm.disableDraw(), g.value = null, p("update:modelValue", z($.layer));
      }), d.modelValue && j(d.modelValue);
    }), pi(() => d.modelValue, ($) => {
      S && (S.remove(), S = null), $ && j($);
    }), Yo(() => {
      x == null || x.remove();
    });
    function P($) {
      if (g.value === $) {
        x.pm.disableDraw(), g.value = null;
        return;
      }
      g.value = $, $ === "rectangle" ? x.pm.enableDraw("Rectangle", { snappable: !1 }) : x.pm.enableDraw("Polygon", { snappable: !1 });
    }
    function M() {
      S && (S.remove(), S = null), x.pm.disableDraw(), g.value = null, p("update:modelValue", "");
    }
    function z($) {
      const tt = $.getLatLngs(), ut = Array.isArray(tt[0]) ? tt[0] : tt[0][0] ?? tt, ft = (Array.isArray(ut[0]) ? ut[0] : ut).map((zt) => `${zt.lng.toFixed(6)} ${zt.lat.toFixed(6)}`), At = ft[0];
      return `POLYGON((${(ft[ft.length - 1] === At ? ft : [...ft, At]).join(", ")}))`;
    }
    function j($) {
      const tt = $.match(/POLYGON\s*\(\(([^)]+)\)\)/i);
      if (!tt) return;
      const ut = tt[1].split(",").map((ft) => {
        const [At, Rt] = ft.trim().split(/\s+/).map(Number);
        return [Rt, At];
      });
      S = Ii.polygon(ut, { color: "#2878a8" }).addTo(x), x.fitBounds(S.getBounds(), { padding: [20, 20] });
    }
    return ($, tt) => (V(), q("div", Sc, [
      H("div", Pc, Q(E.value), 1),
      H("div", Tc, [
        H("button", {
          class: he(["tool-btn", { active: g.value === "rectangle" }]),
          onClick: tt[0] || (tt[0] = (ut) => P("rectangle")),
          title: xt(b)("map.btn.rectangle")
        }, "▭ " + Q(xt(b)("map.btn.rectangle")), 11, Dc),
        H("button", {
          class: he(["tool-btn", { active: g.value === "polygon" }]),
          onClick: tt[1] || (tt[1] = (ut) => P("polygon")),
          title: xt(b)("map.btn.polygon")
        }, "⬡ " + Q(xt(b)("map.btn.polygon")), 11, Oc),
        u.modelValue ? (V(), q("button", {
          key: 0,
          class: "tool-btn tool-btn--clear",
          onClick: M
        }, "✕ " + Q(xt(b)("map.btn.clear")), 1)) : Ct("", !0)
      ]),
      H("div", {
        ref_key: "mapEl",
        ref: w,
        class: "map-container"
      }, null, 512),
      u.modelValue ? (V(), q("div", Ic, [
        tt[2] || (tt[2] = H("span", { class: "map-wkt-label" }, "WKT:", -1)),
        H("code", null, Q(u.modelValue), 1)
      ])) : Ct("", !0),
      g.value ? (V(), q("div", Fc, [
        g.value === "rectangle" ? (V(), q(It, { key: 0 }, [
          Mi(Q(xt(b)("map.hint.rectangle")), 1)
        ], 64)) : (V(), q(It, { key: 1 }, [
          Mi(Q(xt(b)("map.hint.polygon")), 1)
        ], 64))
      ])) : Ct("", !0)
    ]));
  }
}, zc = /* @__PURE__ */ oe(Rc, [["__scopeId", "data-v-aed9671f"]]), Nc = {
  textarea: Nl,
  select: Vl,
  date: Ul,
  uri: jl,
  langstring: vc,
  text: $s,
  multiselect: Mc,
  map: zc,
  searchselect: $l
};
function tl(u, l) {
  return l && l[u.type] || Nc[u.type] || $s;
}
const Aa = {
  ifHVDLegislation: (u) => (u == null ? void 0 : u["dcatap:applicableLegislation"]) === "http://data.europa.eu/eli/reg_impl/2023/138/oj"
};
function jc(u, l) {
  const d = typeof u == "string" ? { [u]: l } : u;
  for (const [p, b] of Object.entries(d)) {
    if (Aa[p]) {
      console.warn(`[fieldVisibility] "${p}" already exists — skipping. Use a unique name.`);
      continue;
    }
    Aa[p] = b;
  }
}
function Hs(u, l) {
  if (!u) return !0;
  const d = Aa[u];
  return d ? d(l) : (console.warn(`[fieldVisibility] unknown function: "${u}"`), !0);
}
function Zl(u, l) {
  if (!u) return !1;
  const d = Aa[u];
  return d ? d(l) : (console.warn(`[fieldVisibility] unknown requiredIf function: "${u}"`), !1);
}
const Vc = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  evaluateRequiredIf: Zl,
  evaluateVisibleIf: Hs,
  fieldVisibilityFns: Aa,
  registerVisibility: jc
}, Symbol.toStringTag, { value: "Module" })), Sa = {
  isURI: (u, l) => {
    if (!u) return [];
    try {
      return new URL(u), [];
    } catch {
      return [l === "de" ? "Ungültige URL." : "Invalid URL."];
    }
  },
  isURIList: (u, l) => {
    if (!Array.isArray(u)) return [];
    const d = [];
    return u.forEach((p, b) => {
      if (p)
        try {
          new URL(p);
        } catch {
          const E = l === "de" ? `Eintrag ${b + 1}` : `Entry ${b + 1}`;
          d.push(`${E}: ${l === "de" ? "Ungültige URL" : "Invalid URL"}`);
        }
    }), d;
  },
  isEmail: (u, l) => u ? /^[^\s@]+@[^\s@]+\.[^\s@]+$/i.test(u) ? [] : [l === "de" ? "Ungültige E-Mail-Adresse." : "Invalid email address."] : [],
  isDate: (u, l) => u ? /^\d{4}-\d{2}-\d{2}$/.test(u) ? [] : [l === "de" ? "Ungültiges Datum (JJJJ-MM-TT)." : "Invalid date (YYYY-MM-DD)."] : [],
  isWKTorGeoJSON: (u, l) => {
    if (!u) return [];
    const d = u.trim(), p = /^(POINT|LINESTRING|POLYGON|MULTIPOINT|MULTILINESTRING|MULTIPOLYGON|GEOMETRYCOLLECTION)/i.test(d), b = d.startsWith("{") && d.includes('"type"');
    return p || b ? [] : [l === "de" ? "Bitte WKT- oder GeoJSON-Geometrie eingeben." : "Please enter a WKT or GeoJSON geometry."];
  }
};
function $c(u, l) {
  const d = typeof u == "string" ? { [u]: l } : u;
  for (const [p, b] of Object.entries(d)) {
    if (Sa[p]) {
      console.warn(`[fieldValidators] "${p}" already exists — skipping. Use a unique name.`);
      continue;
    }
    Sa[p] = b;
  }
}
const Uc = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  fieldValidators: Sa,
  registerValidator: $c
}, Symbol.toStringTag, { value: "Module" }));
function Us(u, l) {
  return u == null ? !1 : Array.isArray(u) ? u.some(
    (d) => d && (typeof d == "object" ? d.value || Object.values(d).some((p) => p) : d)
  ) : typeof u == "object" ? l != null && l.subFields ? l.subFields.filter((d) => d.required).every((d) => u[d.id]) : Object.values(u).some((d) => d) : u !== "";
}
function Ks(u, l, d, p) {
  var x, S;
  const b = [], E = d === "de";
  if ((u.required || Zl(u.requiredIf, p)) && !Us(l, u)) {
    const P = ((S = (x = u.errorMessages) == null ? void 0 : x.required) == null ? void 0 : S[d]) || (E ? "Dieses Feld ist erforderlich." : "This field is required.");
    return b.push(P), b;
  }
  if (u.validate && Us(l, u)) {
    const P = Sa[u.validate];
    P ? b.push(...P(l, d)) : console.warn(`[useValidation] Unknown validator: "${u.validate}"`);
  }
  const g = typeof l == "object" && l !== null && !Array.isArray(l) && Object.values(l).some((P) => P);
  return u.type === "object" && u.subFields && g && b.push(...Ml(u.subFields, l, d)), u.type !== "object" && u.subFields && Array.isArray(l) && l.forEach((P, M) => {
    if (!(P && typeof P == "object" && Object.values(P).some(($) => $))) return;
    const j = Ml(u.subFields, P, d);
    j.length && b.push(...j.map(($) => `#${M + 1}: ${$}`));
  }), b;
}
function Ml(u, l, d) {
  var b, E;
  const p = [];
  for (const w of u) {
    const g = Ks(w, l == null ? void 0 : l[w.id], d, l);
    if (g.length) {
      const x = ((b = w.label) == null ? void 0 : b[d]) || ((E = w.label) == null ? void 0 : E.de) || w.id;
      p.push(...g.map((S) => `${x}: ${S}`));
    }
  }
  return p;
}
function Gc(u, l, d) {
  const p = {};
  if (!(u != null && u.fields)) return p;
  const b = new Set(
    (u.groups || []).flatMap((E) => E.fields || [])
  );
  for (const [E, w] of Object.entries(u.fields)) {
    if (w.visible === !1 || !b.has(E)) continue;
    const g = Ks(w, l == null ? void 0 : l[E], d, l);
    g.length && (p[E] = g);
  }
  return p;
}
const Zc = { class: "field object-field" }, qc = { class: "object-fieldset" }, Hc = { class: "object-legend" }, Kc = {
  __name: "ObjectField",
  props: {
    field: Object,
    lang: String,
    modelValue: { type: Object, default: () => ({}) },
    showErrors: { type: Boolean, default: !0 }
  },
  emits: ["update:modelValue"],
  setup(u, { emit: l }) {
    const d = u, p = l, b = Ft(() => {
      var M, z;
      return ((M = d.field.label) == null ? void 0 : M[d.lang]) || ((z = d.field.label) == null ? void 0 : z.en) || d.field.id;
    }), E = { object: eh().type };
    function w(M) {
      return tl(M, E);
    }
    const g = Ft(
      () => (d.field.subFields || []).filter(
        (M) => M.visible !== !1 && Hs(M.visibleIf, d.modelValue)
      )
    ), x = Ft(() => {
      const M = {};
      for (const z of g.value) {
        const j = Ks(z, (d.modelValue || {})[z.id], d.lang, d.modelValue);
        j.length && (M[z.id] = j);
      }
      return M;
    });
    function S(M) {
      const z = d.field.rdfType ? { "rdf:type": d.field.rdfType } : {};
      p("update:modelValue", { ...z, ...M });
    }
    function P(M) {
      const z = d.field.rdfType ? { "rdf:type": d.field.rdfType } : {};
      p("update:modelValue", { ...z, ...M });
    }
    return (M, z) => (V(), q("div", Zc, [
      u.field.remember ? (V(), Re(zl, {
        key: 0,
        field: u.field,
        lang: u.lang,
        onSelect: P
      }, null, 8, ["field", "lang"])) : Ct("", !0),
      H("fieldset", qc, [
        H("legend", Hc, Q(b.value), 1),
        Qi(Gs, {
          fields: g.value,
          lang: u.lang,
          modelValue: u.modelValue || {},
          fieldErrors: x.value,
          showErrors: u.showErrors,
          fieldComponent: w,
          "onUpdate:modelValue": S
        }, null, 8, ["fields", "lang", "modelValue", "fieldErrors", "showErrors"])
      ])
    ]));
  }
}, el = /* @__PURE__ */ oe(Kc, [["__scopeId", "data-v-7551c264"]]), Wc = { class: "field" }, Jc = { class: "items" }, Xc = ["aria-label", "onClick"], Yc = {
  key: 0,
  class: "hint"
}, Qc = {
  __name: "RepeatableField",
  props: {
    field: Object,
    lang: String,
    modelValue: { type: Array, default: () => [] }
  },
  emits: ["update:modelValue"],
  setup(u, { emit: l }) {
    const { t: d } = Qe(), p = u, b = l, { label: E, placeholder: w } = Da(Ft(() => p.field), Ft(() => p.lang)), g = {
      text: $s,
      textarea: Nl,
      uri: jl,
      date: Ul,
      select: Vl,
      searchselect: $l,
      object: el
    }, x = Ft(() => g[p.field.type] || $s), S = Ft(() => {
      const ut = p.modelValue;
      return Array.isArray(ut) ? ut.length ? ut : [z()] : ut != null && ut !== "" ? [ut] : [z()];
    });
    let P = 0;
    const M = Kt([]);
    pi(S, (ut) => {
      for (; M.value.length < ut.length; )
        M.value.push(++P);
    }, { immediate: !0 });
    function z() {
      return p.field.type === "langstring" ? { value: "", lang: p.lang || "de" } : "";
    }
    function j(ut, ft) {
      const At = Array.isArray(p.modelValue) ? [...p.modelValue] : [];
      for (; At.length <= ut; ) At.push(z());
      At[ut] = ft, b("update:modelValue", At);
    }
    function $() {
      const ut = Array.isArray(p.modelValue) && p.modelValue.length ? p.modelValue : [z()];
      b("update:modelValue", [...ut, z()]);
    }
    function tt(ut) {
      const ft = Array.isArray(p.modelValue) ? [...p.modelValue] : [];
      ft.splice(ut, 1), M.value.splice(ut, 1), b("update:modelValue", ft.length ? ft : [z()]);
    }
    return (ut, ft) => {
      var At;
      return V(), q("div", Wc, [
        H("label", {
          class: he({ required: u.field.required })
        }, Q(xt(E)), 3),
        H("div", Jc, [
          (V(!0), q(It, null, ae(S.value, (Rt, zt) => (V(), q("div", {
            key: M.value[zt] ?? zt,
            class: "item-row"
          }, [
            u.field.type === "langstring" ? (V(), Re(ch, {
              key: 0,
              modelValue: Rt,
              lang: u.lang,
              placeholder: xt(w),
              multiline: u.field.multiline,
              rows: u.field.rows,
              "onUpdate:modelValue": (Et) => j(zt, Et)
            }, null, 8, ["modelValue", "lang", "placeholder", "multiline", "rows", "onUpdate:modelValue"])) : (V(), Re(Ba(x.value), {
              key: 1,
              field: u.field,
              lang: u.lang,
              modelValue: Rt,
              "onUpdate:modelValue": (Et) => j(zt, Et)
            }, null, 8, ["field", "lang", "modelValue", "onUpdate:modelValue"])),
            H("button", {
              type: "button",
              class: "btn-remove",
              "aria-label": `${xt(d)("btn.remove")} ${zt + 1} ${xt(E)}`,
              onClick: (Et) => tt(zt)
            }, "×", 8, Xc)
          ]))), 128))
        ]),
        H("button", {
          type: "button",
          class: "btn-add",
          onClick: $
        }, " + " + Q(xt(d)("btn.add")), 1),
        (At = u.field.hint) != null && At[u.lang] ? (V(), q("span", Yc, Q(u.field.hint[u.lang]), 1)) : Ct("", !0)
      ]);
    };
  }
}, td = /* @__PURE__ */ oe(Qc, [["__scopeId", "data-v-2d900a5f"]]), Pa = {
  /**
   * Shows only the last path segment of a URI.
   * Encodes back by prepending the original prefix (or a configured one).
   *
   * Config example:
   *   "transform": "uriSuffix"
   *   "transformOptions": { "prefix": "https://data.gv.at/dataset/" }
   */
  uriSuffix: {
    display(u) {
      if (!u) return u;
      try {
        const d = new URL(u).pathname.split("/").filter(Boolean);
        return d[d.length - 1] || u;
      } catch {
        return u;
      }
    },
    encode(u, l, d) {
      if (!u) return u;
      try {
        return new URL(u), u;
      } catch {
      }
      if (d)
        try {
          new URL(d);
          const p = d.slice(0, d.lastIndexOf("/") + 1);
          if (p) return p + u;
        } catch {
        }
      return l != null && l.prefix ? l.prefix + u : u;
    }
  },
  /**
   * Strips a known prefix from the stored value for display, re-adds it on encode.
   * Requires "transformOptions": { "prefix": "https://..." }.
   *
   * Config example:
   *   "transform": "stripPrefix"
   *   "transformOptions": { "prefix": "https://data.gv.at/catalog/" }
   */
  stripPrefix: {
    display(u, l) {
      return !u || !(l != null && l.prefix) ? u : u.startsWith(l.prefix) ? u.slice(l.prefix.length) : u;
    },
    encode(u, l, d) {
      if (!u) return u;
      try {
        return new URL(u), u;
      } catch {
      }
      return l != null && l.prefix ? l.prefix + u : u;
    }
  }
};
function ed(u, l) {
  const d = typeof u == "string" ? { [u]: l } : u;
  for (const [p, b] of Object.entries(d)) {
    if (Pa[p]) {
      console.warn(`[fieldTransforms] "${p}" already exists — skipping. Use a unique name.`);
      continue;
    }
    Pa[p] = b;
  }
}
function Wo(u, l, d) {
  const p = Pa[u];
  return p ? p.display(l, d) : (console.warn(`[fieldTransforms] Unknown transform: "${u}"`), l);
}
function Xn(u, l, d, p) {
  const b = Pa[u];
  return b ? b.encode(l, d, p) : (console.warn(`[fieldTransforms] Unknown transform: "${u}"`), l);
}
const id = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  applyDisplay: Wo,
  applyEncode: Xn,
  fieldTransforms: Pa,
  registerTransform: ed
}, Symbol.toStringTag, { value: "Module" })), nd = { class: "group-fields" }, rd = ["id"], ad = {
  key: 2,
  class: "transform-preview"
}, sd = {
  key: 3,
  class: "field-errors",
  role: "alert"
}, od = {
  __name: "FieldGroup",
  props: {
    fields: { type: Array, required: !0 },
    lang: { type: String, required: !0 },
    modelValue: { type: Object, required: !0 },
    fieldErrors: { type: Object, default: () => ({}) },
    showErrors: { type: Boolean, default: !0 },
    fieldComponent: { type: Function, required: !0 }
  },
  emits: ["update:modelValue"],
  setup(u, { emit: l }) {
    const { t: d } = Qe(), p = u, b = l;
    function E(x) {
      var P;
      const S = (P = p.modelValue) == null ? void 0 : P[x.id];
      return x.transform ? x.multiple && Array.isArray(S) ? S.map((M) => Wo(x.transform, M, x.transformOptions)) : Wo(x.transform, S, x.transformOptions) : S;
    }
    function w(x, S) {
      var z;
      if (!x.transform || !S) return null;
      const P = (z = p.modelValue) == null ? void 0 : z[x.id];
      if (x.multiple && Array.isArray(S)) {
        const j = S.map(($, tt) => {
          const ut = Array.isArray(P) ? P[tt] : P;
          return Xn(x.transform, $, x.transformOptions, ut);
        });
        return j.some(($, tt) => $ !== S[tt]) ? j.join(", ") : null;
      }
      const M = Xn(x.transform, S, x.transformOptions, P);
      return M !== S ? M : null;
    }
    function g(x, S) {
      var M;
      const P = typeof x == "string" ? x : x.id;
      if (typeof x == "object" && x.transform) {
        const z = (M = p.modelValue) == null ? void 0 : M[P];
        let j;
        x.multiple && Array.isArray(S) ? j = S.map(($, tt) => {
          const ut = Array.isArray(z) ? z[tt] : z;
          return Xn(x.transform, $, x.transformOptions, ut);
        }) : j = Xn(x.transform, S, x.transformOptions, z), b("update:modelValue", { ...p.modelValue, [P]: j });
      } else
        b("update:modelValue", { ...p.modelValue, [P]: S });
    }
    return (x, S) => (V(), q("div", nd, [
      (V(!0), q(It, null, ae(u.fields, (P) => {
        var M, z;
        return V(), q("div", {
          key: P.id,
          id: "field-" + P.id,
          class: he(["field-wrapper", [{ "has-error": u.showErrors && ((M = u.fieldErrors[P.id]) == null ? void 0 : M.length) }, P.cssClass]])
        }, [
          P.multiple && P.type !== "multiselect" && P.type !== "distribution-editor" && P.type !== "object" ? (V(), Re(td, {
            key: 0,
            field: P,
            lang: u.lang,
            modelValue: E(P),
            "onUpdate:modelValue": (j) => g(P, j)
          }, null, 8, ["field", "lang", "modelValue", "onUpdate:modelValue"])) : (V(), Re(Ba(u.fieldComponent(P)), {
            key: 1,
            field: P,
            lang: u.lang,
            modelValue: E(P),
            showErrors: P.type === "object" || P.type === "distribution-editor" ? u.showErrors : void 0,
            "onUpdate:modelValue": (j) => g(P, j)
          }, null, 8, ["field", "lang", "modelValue", "showErrors", "onUpdate:modelValue"])),
          P.transform && E(P) ? (V(), q("div", ad, [
            Mi(Q(xt(d)("field.stored-as")) + " ", 1),
            H("code", null, Q(w(P, E(P)) || u.modelValue[P.id]), 1)
          ])) : Ct("", !0),
          u.showErrors && ((z = u.fieldErrors[P.id]) != null && z.length) ? (V(), q("ul", sd, [
            (V(!0), q(It, null, ae(u.fieldErrors[P.id], (j) => (V(), q("li", { key: j }, Q(j), 1))), 128))
          ])) : Ct("", !0)
        ], 10, rd);
      }), 128))
    ]));
  }
}, Gs = /* @__PURE__ */ oe(od, [["__scopeId", "data-v-160c0b2e"]]);
let Uo = null;
class ld {
  /**
   * Registers a global async function that returns auth headers for every upload.
   * Pass null to remove the provider (uploads will be unauthenticated).
   *
   * @param {((config: object) => Promise<Record<string,string>>) | null} providerFn
   */
  static setAuthProvider(l) {
    Uo = l ?? null;
  }
  /**
   * @param {File} file
   * @param {object} config — fileUpload config block from the field definition
   * @returns {Promise<string>} download URL returned by the API
   */
  async upload(l, d) {
    if (!(d != null && d.uploadUrl)) throw new Error("fileUpload.uploadUrl is not configured");
    const p = d.uploadUrl.replace("{filename}", encodeURIComponent(l.name)), b = (d.method || "POST").toUpperCase(), E = Uo ? await Uo(d) : {}, w = { ...d.headers || {}, ...E };
    let g;
    if (b === "PUT")
      w["Content-Type"] = l.type || "application/octet-stream", g = l;
    else {
      const P = new FormData();
      P.append(d.formField || "file", l, l.name), g = P;
    }
    const x = await fetch(p, { method: b, headers: w, body: g });
    if (!x.ok) {
      const P = await x.text().catch(() => "");
      throw new Error(`Upload failed: HTTP ${x.status}${P ? " – " + P.slice(0, 200) : ""}`);
    }
    if ((d.responseType || "text") === "json") {
      const P = await x.json(), M = d.responseUrlField || "url", z = ud(P, M);
      if (!z) throw new Error(`Response JSON has no field "${M}"`);
      return String(z);
    }
    return (await x.text()).trim();
  }
}
function ud(u, l) {
  return l.split(".").reduce((d, p) => d != null ? d[p] : void 0, u);
}
const hd = { class: "dist-form" }, cd = {
  key: 0,
  class: "upload-section"
}, dd = { class: "drop-text" }, fd = { class: "drop-text" }, pd = { class: "drop-size" }, md = { class: "drop-text" }, gd = { class: "drop-text" }, _d = { class: "drop-text error-text" }, yd = {
  __name: "DistributionForm",
  props: {
    field: { type: Object, required: !0 },
    modelValue: { type: Object, default: () => ({}) },
    lang: String,
    uploadConfig: { type: Object, default: null },
    showErrors: { type: Boolean, default: !0 }
  },
  emits: ["update:modelValue"],
  setup(u, { emit: l }) {
    const d = { object: el };
    function p(zt) {
      return tl(zt, d);
    }
    const b = u, E = l, { t: w } = Qe(), g = Ft(
      () => (b.field.subFields || []).filter(
        (zt) => zt.visible !== !1 && Hs(zt.visibleIf, b.modelValue)
      )
    ), x = Ft(() => {
      const zt = {};
      for (const Et of g.value) {
        const ee = Ks(Et, (b.modelValue || {})[Et.id], b.lang, b.modelValue);
        ee.length && (zt[Et.id] = ee);
      }
      return zt;
    }), S = Kt(null), P = Kt(null), M = Kt(!1), z = Kt("idle"), j = Kt("");
    function $(zt) {
      var ee;
      const Et = (ee = zt.target.files) == null ? void 0 : ee[0];
      Et && ut(Et);
    }
    function tt(zt) {
      var ee;
      if (M.value = !1, z.value === "uploading") return;
      const Et = (ee = zt.dataTransfer.files) == null ? void 0 : ee[0];
      Et && ut(Et);
    }
    function ut(zt) {
      P.value = zt, z.value = "selected", j.value = "";
    }
    function ft() {
      P.value = null, z.value = "idle", j.value = "", S.value && (S.value.value = "");
    }
    async function At() {
      if (P.value) {
        z.value = "uploading";
        try {
          const Et = await new ld().upload(P.value, b.uploadConfig);
          z.value = "success";
          const ee = { ...b.modelValue, "dcat:downloadURL": Et };
          ee["dcat:accessURL"] || (ee["dcat:accessURL"] = Et), E("update:modelValue", ee);
        } catch (zt) {
          z.value = "error", j.value = zt.message;
        }
      }
    }
    function Rt(zt) {
      return zt ? zt < 1024 ? `${zt} B` : zt < 1024 * 1024 ? `${(zt / 1024).toFixed(1)} KB` : `${(zt / (1024 * 1024)).toFixed(1)} MB` : "";
    }
    return (zt, Et) => {
      var ee, Dt, Ut;
      return V(), q("div", hd, [
        (ee = u.uploadConfig) != null && ee.enabled ? (V(), q("div", cd, [
          H("label", null, Q(xt(w)("dist.upload-label")), 1),
          H("div", {
            class: he(["drop-zone", { dragging: M.value, uploading: z.value === "uploading", success: z.value === "success", error: z.value === "error" }]),
            onDragover: Et[0] || (Et[0] = je((ne) => M.value = !0, ["prevent"])),
            onDragleave: Et[1] || (Et[1] = (ne) => M.value = !1),
            onDrop: je(tt, ["prevent"]),
            onClick: Et[2] || (Et[2] = (ne) => {
              var Zt;
              return (Zt = S.value) == null ? void 0 : Zt.click();
            })
          }, [
            H("input", {
              ref_key: "fileInput",
              ref: S,
              type: "file",
              class: "hidden-input",
              onChange: $
            }, null, 544),
            z.value === "idle" ? (V(), q(It, { key: 0 }, [
              Et[4] || (Et[4] = H("span", { class: "drop-icon" }, "📂", -1)),
              H("span", dd, Q(xt(w)("dist.drop.idle")), 1)
            ], 64)) : z.value === "selected" ? (V(), q(It, { key: 1 }, [
              Et[5] || (Et[5] = H("span", { class: "drop-icon" }, "📄", -1)),
              H("span", fd, Q((Dt = P.value) == null ? void 0 : Dt.name), 1),
              H("span", pd, Q(Rt((Ut = P.value) == null ? void 0 : Ut.size)), 1)
            ], 64)) : z.value === "uploading" ? (V(), q(It, { key: 2 }, [
              Et[6] || (Et[6] = H("span", { class: "drop-icon spin" }, "⟳", -1)),
              H("span", md, Q(xt(w)("dist.drop.uploading")), 1)
            ], 64)) : z.value === "success" ? (V(), q(It, { key: 3 }, [
              Et[7] || (Et[7] = H("span", { class: "drop-icon" }, "✓", -1)),
              H("span", gd, Q(xt(w)("dist.drop.success")), 1),
              H("button", {
                type: "button",
                class: "btn-reset-upload",
                onClick: je(ft, ["stop"])
              }, Q(xt(w)("btn.choose-another")), 1)
            ], 64)) : z.value === "error" ? (V(), q(It, { key: 4 }, [
              Et[8] || (Et[8] = H("span", { class: "drop-icon" }, "⚠", -1)),
              H("span", _d, Q(j.value), 1),
              H("button", {
                type: "button",
                class: "btn-reset-upload",
                onClick: je(ft, ["stop"])
              }, Q(xt(w)("btn.try-again")), 1)
            ], 64)) : Ct("", !0)
          ], 34),
          z.value === "selected" ? (V(), q("button", {
            key: 0,
            type: "button",
            class: "btn-upload",
            onClick: At
          }, Q(xt(w)("btn.upload")), 1)) : Ct("", !0)
        ])) : Ct("", !0),
        Qi(Gs, {
          fields: g.value,
          lang: u.lang,
          modelValue: u.modelValue || {},
          fieldErrors: x.value,
          showErrors: u.showErrors,
          fieldComponent: p,
          "onUpdate:modelValue": Et[3] || (Et[3] = (ne) => zt.$emit("update:modelValue", ne))
        }, null, 8, ["fields", "lang", "modelValue", "fieldErrors", "showErrors"])
      ]);
    };
  }
}, ql = /* @__PURE__ */ oe(yd, [["__scopeId", "data-v-acc166be"]]);
function vd(u, { selectors: l = ["button"], show: d } = {}) {
  async function p() {
    await Vs();
    const b = u.value;
    if (b)
      for (const E of l) {
        const w = b.querySelector(E);
        if (w) {
          w.focus();
          return;
        }
      }
  }
  d ? pi(d, (b) => {
    b && p();
  }) : Ar(p);
}
const bd = ["aria-labelledby"], xd = { class: "modal-header" }, wd = ["id"], Ld = ["aria-label"], kd = { class: "modal-actions" }, Cd = {
  __name: "BaseModal",
  props: {
    show: { type: Boolean, default: !0 },
    teleport: { type: Boolean, default: !1 },
    title: { type: String, default: "" },
    headingId: { type: String, required: !0 },
    closeLabel: { type: String, default: "Close" },
    maxWidth: { type: String, default: "" },
    focusSelectors: { type: Array, default: () => ["button"] },
    // Non-teleported modals (Export/Import) are mounted only while shown, so
    // focus should happen once on mount. Teleported modals (Distribution)
    // stay mounted and toggle `show`, so focus must re-trigger on each open.
    refocusOnShow: { type: Boolean, default: !1 }
  },
  emits: ["close"],
  setup(u, { expose: l }) {
    const d = u, p = Kt(null);
    return vd(p, {
      selectors: d.focusSelectors,
      show: d.refocusOnShow ? ih(d, "show") : void 0
    }), l({ panelEl: p }), (b, E) => (V(), Re(nh, {
      to: "body",
      disabled: !u.teleport
    }, [
      u.show ? (V(), q("div", {
        key: 0,
        class: "modal-overlay",
        onClick: E[1] || (E[1] = je((w) => b.$emit("close"), ["self"])),
        onKeydown: E[2] || (E[2] = Jn((w) => b.$emit("close"), ["esc"]))
      }, [
        H("div", {
          class: "modal-panel",
          role: "dialog",
          "aria-modal": "true",
          "aria-labelledby": u.headingId,
          style: Fl(u.maxWidth ? { maxWidth: u.maxWidth } : void 0),
          ref_key: "panelEl",
          ref: p
        }, [
          H("div", xd, [
            H("h2", { id: u.headingId }, [
              ma(b.$slots, "title", {}, () => [
                Mi(Q(u.title), 1)
              ], !0)
            ], 8, wd),
            H("button", {
              class: "close-btn",
              "aria-label": u.closeLabel,
              onClick: E[0] || (E[0] = (w) => b.$emit("close"))
            }, "✕", 8, Ld)
          ]),
          ma(b.$slots, "notice", {}, void 0, !0),
          ma(b.$slots, "tabs", {}, void 0, !0),
          ma(b.$slots, "default", {}, void 0, !0),
          H("div", kd, [
            ma(b.$slots, "actions", {}, void 0, !0)
          ])
        ], 12, bd)
      ], 32)) : Ct("", !0)
    ], 8, ["disabled"]));
  }
}, il = /* @__PURE__ */ oe(Cd, [["__scopeId", "data-v-79ead561"]]), Ed = { class: "dist-body" }, Md = ["disabled", "aria-disabled"], Bd = {
  __name: "DistributionModal",
  props: {
    field: { type: Object, required: !0 },
    modelValue: { type: Object, default: () => ({}) },
    lang: String,
    show: Boolean,
    uploadConfig: { type: Object, default: null }
  },
  emits: ["save", "cancel"],
  setup(u, { emit: l }) {
    const { t: d } = Qe(), p = u, b = l, E = Kt({ ...p.modelValue || {} });
    pi(() => p.modelValue, (x) => {
      E.value = { ...x || {} };
    }, { deep: !0 });
    const w = Ft(
      () => (p.field.subFields || []).filter((x) => x.required).every((x) => {
        var S;
        return Us((S = E.value) == null ? void 0 : S[x.id], x);
      })
    );
    function g() {
      b("save", { ...E.value });
    }
    return (x, S) => (V(), Re(il, {
      show: u.show,
      teleport: "",
      "refocus-on-show": "",
      "heading-id": "dist-modal-heading",
      title: xt(d)("dist.modal.title"),
      "close-label": u.lang === "de" ? "Dialog schließen" : "Close dialog",
      "max-width": "680px",
      "focus-selectors": ["input, select, textarea, button, [tabindex]:not([tabindex='-1'])"],
      onClose: S[2] || (S[2] = (P) => x.$emit("cancel"))
    }, {
      actions: dn(() => [
        H("button", {
          class: "btn-cancel",
          onClick: S[1] || (S[1] = (P) => x.$emit("cancel"))
        }, Q(xt(d)("btn.cancel")), 1),
        H("button", {
          class: "btn-save",
          disabled: !w.value,
          "aria-disabled": !w.value,
          onClick: g
        }, Q(xt(d)("btn.save")), 9, Md)
      ]),
      default: dn(() => [
        H("div", Ed, [
          Qi(ql, {
            field: u.field,
            modelValue: E.value,
            lang: u.lang,
            uploadConfig: u.uploadConfig,
            "onUpdate:modelValue": S[0] || (S[0] = (P) => E.value = P)
          }, null, 8, ["field", "modelValue", "lang", "uploadConfig"])
        ])
      ]),
      _: 1
    }, 8, ["show", "title", "close-label"]));
  }
}, Ad = /* @__PURE__ */ oe(Bd, [["__scopeId", "data-v-23bbacb0"]]);
function Sd(u) {
  return u.type === "distribution-editor" ? [] : u.multiple ? u.type === "langstring" ? [{ value: "", lang: "de" }] : [""] : u.defaultValue !== void 0 ? u.defaultValue : u.type === "langstring" ? { de: "", en: "" } : u.type === "multiselect" ? [] : u.type === "object" ? {} : "";
}
const Pd = { class: "dist-editor" }, Td = { class: "dist-label" }, Dd = {
  key: 0,
  class: "dist-empty"
}, Od = { class: "dist-empty-hint" }, Id = ["onDragstart", "onDragover", "onDrop"], Fd = ["onClick"], Rd = ["aria-label"], zd = { class: "dist-card-summary" }, Nd = { class: "dist-card-index" }, jd = { class: "dist-card-title" }, Vd = {
  key: 0,
  class: "dist-card-badge"
}, $d = { class: "dist-card-controls" }, Ud = ["aria-label", "onClick", "title"], Gd = {
  class: "dist-toggle",
  "aria-hidden": "true"
}, Zd = {
  key: 0,
  class: "dist-card-body"
}, qd = ["onDragstart", "onDragover", "onDrop"], Hd = ["aria-label"], Kd = { class: "dist-row-info" }, Wd = { class: "dist-row-title" }, Jd = {
  key: 0,
  class: "dist-row-url"
}, Xd = {
  key: 1,
  class: "dist-row-badge"
}, Yd = { class: "dist-row-actions" }, Qd = ["onClick"], tf = ["onClick"], ef = {
  __name: "DistributionEditor",
  props: {
    field: Object,
    lang: String,
    modelValue: { type: Array, default: () => [] },
    showErrors: { type: Boolean, default: !0 }
  },
  emits: ["update:modelValue"],
  setup(u, { emit: l }) {
    const d = u, { t: p } = Qe(), b = Ft(() => {
      var kt;
      return ((kt = d.field) == null ? void 0 : kt.fileUpload) || null;
    }), E = l, w = Ft(() => {
      var kt;
      return ((kt = d.field) == null ? void 0 : kt.distributionMode) || "inline";
    }), g = Ft(() => Array.isArray(d.modelValue) ? d.modelValue : []);
    function x() {
      return Object.fromEntries(
        (d.field.subFields || []).map((kt) => [kt.id, Sd(kt)])
      );
    }
    function S() {
      if (w.value === "inline") {
        const kt = [...g.value, x()];
        E("update:modelValue", kt), $.value = /* @__PURE__ */ new Set([...$.value, kt.length - 1]);
      } else
        ft.value = -1, ut.value = x();
    }
    function P(kt) {
      const Jt = g.value.filter((ie, we) => we !== kt);
      if (j.value.splice(kt, 1), E("update:modelValue", Jt), w.value === "inline") {
        const ie = /* @__PURE__ */ new Set();
        for (const we of $.value)
          we < kt ? ie.add(we) : we > kt && ie.add(we - 1);
        $.value = ie;
      }
    }
    function M(kt, Jt) {
      const ie = g.value.map((we, Ot) => Ot === kt ? Jt : we);
      E("update:modelValue", ie);
    }
    let z = 0;
    const j = Kt([]);
    pi(g, (kt) => {
      for (; j.value.length < kt.length; ) j.value.push(++z);
    }, { immediate: !0 });
    const $ = Kt(/* @__PURE__ */ new Set([0]));
    function tt(kt) {
      const Jt = new Set($.value);
      Jt.has(kt) ? Jt.delete(kt) : Jt.add(kt), $.value = Jt;
    }
    const ut = Kt(null), ft = Kt(-1);
    function At(kt) {
      ft.value = kt, ut.value = { ...g.value[kt] || {} };
    }
    function Rt(kt) {
      const Jt = [...g.value];
      ft.value === -1 ? Jt.push(kt) : Jt[ft.value] = kt, E("update:modelValue", Jt), ut.value = null;
    }
    const zt = Kt(-1), Et = Kt(-1);
    function ee(kt, Jt) {
      zt.value = kt, Jt.dataTransfer.effectAllowed = "move", Jt.dataTransfer.setData("text/plain", String(kt));
    }
    function Dt(kt) {
      kt !== zt.value && (Et.value = kt);
    }
    function Ut() {
      Et.value = -1;
    }
    function ne(kt) {
      const Jt = zt.value;
      if (Jt === -1 || Jt === kt) {
        Zt();
        return;
      }
      const ie = [...g.value], [we] = ie.splice(Jt, 1);
      if (ie.splice(kt, 0, we), w.value === "inline") {
        const Ot = /* @__PURE__ */ new Set();
        for (const wt of $.value) {
          const lt = Wt(wt, Jt, kt);
          lt >= 0 && Ot.add(lt);
        }
        $.value = Ot;
      }
      E("update:modelValue", ie), Zt();
    }
    function Zt() {
      zt.value = -1, Et.value = -1;
    }
    function Wt(kt, Jt, ie) {
      return kt === Jt ? ie : Jt < ie ? kt > Jt && kt <= ie ? kt - 1 : kt : kt >= ie && kt < Jt ? kt + 1 : kt;
    }
    function ge(kt) {
      return kt["dct:title"] || kt["dcat:accessURL"] || "—";
    }
    function He(kt) {
      var we, Ot, wt;
      const Jt = (d.field.subFields || []).find((lt) => lt.id === "dct:format"), ie = (we = Jt == null ? void 0 : Jt.options) == null ? void 0 : we.find((lt) => lt.value === kt);
      return ie ? ((Ot = ie.label) == null ? void 0 : Ot[d.lang]) || ((wt = ie.label) == null ? void 0 : wt.en) || kt : kt.split("/").pop() || kt;
    }
    return (kt, Jt) => {
      var ie, we;
      return V(), q("div", Pd, [
        H("label", Td, Q(((ie = u.field.label) == null ? void 0 : ie[u.lang]) || ((we = u.field.label) == null ? void 0 : we.en) || u.field.id), 1),
        g.value.length ? (V(), q(It, { key: 1 }, [
          w.value === "inline" ? (V(!0), q(It, { key: 0 }, ae(g.value, (Ot, wt) => (V(), q("div", {
            key: j.value[wt] ?? wt,
            class: he(["dist-card", { "drag-over": Et.value === wt, dragging: zt.value === wt }]),
            draggable: "true",
            onDragstart: (lt) => ee(wt, lt),
            onDragover: je((lt) => Dt(wt), ["prevent"]),
            onDragleave: Ut,
            onDrop: je((lt) => ne(wt), ["prevent"]),
            onDragend: Zt
          }, [
            H("div", {
              class: "dist-card-header",
              onClick: (lt) => tt(wt)
            }, [
              H("span", {
                class: "drag-handle",
                "aria-label": u.lang === "de" ? "Distribution verschieben" : "Drag to reorder",
                title: "Drag to reorder",
                onClick: Jt[0] || (Jt[0] = je(() => {
                }, ["stop"]))
              }, "⠿", 8, Rd),
              H("div", zd, [
                H("span", Nd, Q(wt + 1) + ".", 1),
                H("span", jd, Q(ge(Ot)), 1),
                Ot["dct:format"] ? (V(), q("span", Vd, Q(He(Ot["dct:format"])), 1)) : Ct("", !0)
              ]),
              H("div", $d, [
                H("button", {
                  type: "button",
                  class: "btn-remove-inline",
                  "aria-label": `Distribution ${wt + 1}`,
                  onClick: je((lt) => P(wt), ["stop"]),
                  title: xt(p)("btn.remove")
                }, "✕", 8, Ud),
                H("span", Gd, Q($.value.has(wt) ? "▲" : "▼"), 1)
              ])
            ], 8, Fd),
            $.value.has(wt) ? (V(), q("div", Zd, [
              Qi(ql, {
                field: u.field,
                modelValue: Ot,
                lang: u.lang,
                uploadConfig: b.value,
                showErrors: u.showErrors,
                "onUpdate:modelValue": (lt) => M(wt, lt)
              }, null, 8, ["field", "modelValue", "lang", "uploadConfig", "showErrors", "onUpdate:modelValue"])
            ])) : Ct("", !0)
          ], 42, Id))), 128)) : (V(!0), q(It, { key: 1 }, ae(g.value, (Ot, wt) => (V(), q("div", {
            key: j.value[wt] ?? wt,
            class: he(["dist-row", { "drag-over": Et.value === wt, dragging: zt.value === wt }]),
            draggable: "true",
            onDragstart: (lt) => ee(wt, lt),
            onDragover: je((lt) => Dt(wt), ["prevent"]),
            onDragleave: Ut,
            onDrop: je((lt) => ne(wt), ["prevent"]),
            onDragend: Zt
          }, [
            H("span", {
              class: "drag-handle",
              "aria-label": u.lang === "de" ? "Distribution verschieben" : "Drag to reorder",
              title: "Drag to reorder"
            }, "⠿", 8, Hd),
            H("div", Kd, [
              H("span", Wd, Q(ge(Ot)), 1),
              Ot["dcat:accessURL"] ? (V(), q("span", Jd, Q(Ot["dcat:accessURL"]), 1)) : Ct("", !0),
              Ot["dct:format"] ? (V(), q("span", Xd, Q(He(Ot["dct:format"])), 1)) : Ct("", !0)
            ]),
            H("div", Yd, [
              H("button", {
                class: "btn-edit",
                onClick: (lt) => At(wt)
              }, Q(xt(p)("btn.edit")), 9, Qd),
              H("button", {
                class: "btn-remove",
                onClick: (lt) => P(wt)
              }, Q(xt(p)("btn.remove")), 9, tf)
            ])
          ], 42, qd))), 128)),
          H("button", {
            type: "button",
            class: "btn-add",
            onClick: S
          }, " + " + Q(xt(p)("btn.add-dist")), 1)
        ], 64)) : (V(), q("div", Dd, [
          H("p", Od, Q(xt(p)("dist.empty-hint")), 1),
          H("button", {
            class: "btn-add-first",
            onClick: S
          }, Q(xt(p)("btn.add-first-dist")), 1)
        ])),
        w.value === "modal" && ut.value !== null ? (V(), Re(Ad, {
          key: 2,
          show: ut.value !== null,
          field: u.field,
          modelValue: ut.value,
          lang: u.lang,
          uploadConfig: b.value,
          onSave: Rt,
          onCancel: Jt[1] || (Jt[1] = (Ot) => ut.value = null)
        }, null, 8, ["show", "field", "modelValue", "lang", "uploadConfig"])) : Ct("", !0)
      ]);
    };
  }
}, nf = /* @__PURE__ */ oe(ef, [["__scopeId", "data-v-8de71143"]]), rf = { class: "validation-report" }, af = { class: "report-header" }, sf = { class: "report-title" }, of = { class: "report-summary" }, lf = {
  key: 0,
  class: "badge badge-info"
}, uf = ["aria-label"], hf = {
  key: 0,
  class: "report-valid",
  role: "status",
  "aria-live": "polite"
}, cf = {
  key: 0,
  class: "sev-section"
}, df = { class: "sev-count" }, ff = { class: "violation-field" }, pf = { class: "field-label" }, mf = { class: "field-id" }, gf = { class: "violation-constraint" }, _f = { class: "constraint-tag" }, yf = { class: "constraint-msg" }, vf = ["aria-label", "onClick"], bf = {
  __name: "ValidationReport",
  props: {
    violations: { type: Array, default: () => [] },
    lang: { type: String, default: "de" }
  },
  emits: ["close", "navigate"],
  setup(u) {
    const { t: l } = Qe(), d = u, p = Ft(() => {
      var x;
      const g = { violation: [], warning: [], info: [] };
      for (const S of d.violations)
        (x = g[S.severity]) == null || x.push(S);
      return g;
    }), b = Ft(() => ({
      violation: p.value.violation.length,
      warning: p.value.warning.length,
      info: p.value.info.length
    }));
    function E(g) {
      var x, S;
      return ((x = g.fieldLabel) == null ? void 0 : x[d.lang]) || ((S = g.fieldLabel) == null ? void 0 : S.en) || g.fieldId;
    }
    function w(g) {
      return g === "violation" ? l("validation.sev.violation") : g === "warning" ? l("validation.sev.warning") : g === "info" ? l("validation.sev.info") : g;
    }
    return (g, x) => (V(), q("div", rf, [
      H("div", af, [
        H("span", sf, Q(xt(l)("validation.title")), 1),
        H("div", of, [
          H("span", {
            class: he(["badge badge-violation", { zero: b.value.violation === 0 }])
          }, [
            x[1] || (x[1] = H("span", { "aria-hidden": "true" }, "✗ ", -1)),
            Mi(Q(b.value.violation) + " " + Q(" " + xt(l)("validation.sev.violation")), 1)
          ], 2),
          H("span", {
            class: he(["badge badge-warning", { zero: b.value.warning === 0 }])
          }, [
            x[2] || (x[2] = H("span", { "aria-hidden": "true" }, "⚠ ", -1)),
            Mi(Q(b.value.warning) + " " + Q(" " + xt(l)("validation.sev.warning")), 1)
          ], 2),
          b.value.info > 0 ? (V(), q("span", lf, [
            x[3] || (x[3] = H("span", { "aria-hidden": "true" }, "ℹ ", -1)),
            Mi(Q(b.value.info), 1)
          ])) : Ct("", !0)
        ]),
        H("button", {
          class: "btn-close",
          type: "button",
          "aria-label": u.lang === "de" ? "Bericht schließen" : "Close report",
          onClick: x[0] || (x[0] = (S) => g.$emit("close"))
        }, "×", 8, uf)
      ]),
      u.violations.length === 0 ? (V(), q("div", hf, [
        x[4] || (x[4] = H("span", {
          class: "valid-icon",
          "aria-hidden": "true"
        }, "✓", -1)),
        H("span", null, Q(xt(l)("validation.no-violations")), 1)
      ])) : Ct("", !0),
      (V(), q(It, null, ae(["violation", "warning", "info"], (S) => {
        var P;
        return V(), q(It, { key: S }, [
          (P = p.value[S]) != null && P.length ? (V(), q("div", cf, [
            H("div", {
              class: he(["sev-heading", "sev-" + S])
            }, [
              H("span", null, Q(w(S)), 1),
              H("span", df, "(" + Q(p.value[S].length) + ")", 1)
            ], 2),
            (V(!0), q(It, null, ae(p.value[S], (M) => (V(), q("div", {
              key: M.fieldId + "|" + M.constraint,
              class: he(["violation-row", "row-" + M.severity])
            }, [
              H("div", ff, [
                H("span", pf, Q(E(M)), 1),
                H("code", mf, Q(M.fieldId), 1)
              ]),
              H("div", gf, [
                H("span", _f, Q(M.constraint), 1),
                H("span", yf, Q(u.lang === "de" ? M.messageDe : M.messageEn), 1)
              ]),
              M.groupId ? (V(), q("button", {
                key: 0,
                type: "button",
                class: "btn-navigate",
                "aria-label": xt(l)("btn.navigate-to-field") + ": " + E(M),
                onClick: (z) => g.$emit("navigate", { fieldId: M.fieldId, groupId: M.groupId })
              }, Q(xt(l)("btn.navigate-to-field")), 9, vf)) : Ct("", !0)
            ], 2))), 128))
          ])) : Ct("", !0)
        ], 64);
      }), 64))
    ]));
  }
}, Bl = /* @__PURE__ */ oe(bf, [["__scopeId", "data-v-80082868"]]), Hl = {
  assetsBaseUrl: "/"
};
function hg(u = {}) {
  if (u.assetsBaseUrl !== void 0 && (Hl.assetsBaseUrl = String(u.assetsBaseUrl).replace(/\/?$/, "/")), u.extend) {
    const { extend: l } = u;
    l.validators && Promise.resolve().then(() => Uc).then((d) => d.registerValidator(l.validators)), l.computes && Promise.resolve().then(() => og).then((d) => d.registerCompute(l.computes)), l.transforms && Promise.resolve().then(() => id).then((d) => d.registerTransform(l.transforms)), l.visibility && Promise.resolve().then(() => Vc).then((d) => d.registerVisibility(l.visibility));
  }
}
function Br(u) {
  return Hl.assetsBaseUrl + String(u).replace(/^\//, "");
}
var Kl = {}, Ws = {};
Ws.byteLength = Lf;
Ws.toByteArray = Cf;
Ws.fromByteArray = Bf;
var Yi = [], Ei = [], xf = typeof Uint8Array < "u" ? Uint8Array : Array, Go = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
for (var xr = 0, wf = Go.length; xr < wf; ++xr)
  Yi[xr] = Go[xr], Ei[Go.charCodeAt(xr)] = xr;
Ei[45] = 62;
Ei[95] = 63;
function Wl(u) {
  var l = u.length;
  if (l % 4 > 0)
    throw new Error("Invalid string. Length must be a multiple of 4");
  var d = u.indexOf("=");
  d === -1 && (d = l);
  var p = d === l ? 0 : 4 - d % 4;
  return [d, p];
}
function Lf(u) {
  var l = Wl(u), d = l[0], p = l[1];
  return (d + p) * 3 / 4 - p;
}
function kf(u, l, d) {
  return (l + d) * 3 / 4 - d;
}
function Cf(u) {
  var l, d = Wl(u), p = d[0], b = d[1], E = new xf(kf(u, p, b)), w = 0, g = b > 0 ? p - 4 : p, x;
  for (x = 0; x < g; x += 4)
    l = Ei[u.charCodeAt(x)] << 18 | Ei[u.charCodeAt(x + 1)] << 12 | Ei[u.charCodeAt(x + 2)] << 6 | Ei[u.charCodeAt(x + 3)], E[w++] = l >> 16 & 255, E[w++] = l >> 8 & 255, E[w++] = l & 255;
  return b === 2 && (l = Ei[u.charCodeAt(x)] << 2 | Ei[u.charCodeAt(x + 1)] >> 4, E[w++] = l & 255), b === 1 && (l = Ei[u.charCodeAt(x)] << 10 | Ei[u.charCodeAt(x + 1)] << 4 | Ei[u.charCodeAt(x + 2)] >> 2, E[w++] = l >> 8 & 255, E[w++] = l & 255), E;
}
function Ef(u) {
  return Yi[u >> 18 & 63] + Yi[u >> 12 & 63] + Yi[u >> 6 & 63] + Yi[u & 63];
}
function Mf(u, l, d) {
  for (var p, b = [], E = l; E < d; E += 3)
    p = (u[E] << 16 & 16711680) + (u[E + 1] << 8 & 65280) + (u[E + 2] & 255), b.push(Ef(p));
  return b.join("");
}
function Bf(u) {
  for (var l, d = u.length, p = d % 3, b = [], E = 16383, w = 0, g = d - p; w < g; w += E)
    b.push(Mf(u, w, w + E > g ? g : w + E));
  return p === 1 ? (l = u[d - 1], b.push(
    Yi[l >> 2] + Yi[l << 4 & 63] + "=="
  )) : p === 2 && (l = (u[d - 2] << 8) + u[d - 1], b.push(
    Yi[l >> 10] + Yi[l >> 4 & 63] + Yi[l << 2 & 63] + "="
  )), b.join("");
}
var nl = {};
/*! ieee754. BSD-3-Clause License. Feross Aboukhadijeh <https://feross.org/opensource> */
nl.read = function(u, l, d, p, b) {
  var E, w, g = b * 8 - p - 1, x = (1 << g) - 1, S = x >> 1, P = -7, M = d ? b - 1 : 0, z = d ? -1 : 1, j = u[l + M];
  for (M += z, E = j & (1 << -P) - 1, j >>= -P, P += g; P > 0; E = E * 256 + u[l + M], M += z, P -= 8)
    ;
  for (w = E & (1 << -P) - 1, E >>= -P, P += p; P > 0; w = w * 256 + u[l + M], M += z, P -= 8)
    ;
  if (E === 0)
    E = 1 - S;
  else {
    if (E === x)
      return w ? NaN : (j ? -1 : 1) * (1 / 0);
    w = w + Math.pow(2, p), E = E - S;
  }
  return (j ? -1 : 1) * w * Math.pow(2, E - p);
};
nl.write = function(u, l, d, p, b, E) {
  var w, g, x, S = E * 8 - b - 1, P = (1 << S) - 1, M = P >> 1, z = b === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0, j = p ? 0 : E - 1, $ = p ? 1 : -1, tt = l < 0 || l === 0 && 1 / l < 0 ? 1 : 0;
  for (l = Math.abs(l), isNaN(l) || l === 1 / 0 ? (g = isNaN(l) ? 1 : 0, w = P) : (w = Math.floor(Math.log(l) / Math.LN2), l * (x = Math.pow(2, -w)) < 1 && (w--, x *= 2), w + M >= 1 ? l += z / x : l += z * Math.pow(2, 1 - M), l * x >= 2 && (w++, x /= 2), w + M >= P ? (g = 0, w = P) : w + M >= 1 ? (g = (l * x - 1) * Math.pow(2, b), w = w + M) : (g = l * Math.pow(2, M - 1) * Math.pow(2, b), w = 0)); b >= 8; u[d + j] = g & 255, j += $, g /= 256, b -= 8)
    ;
  for (w = w << b | g, S += b; S > 0; u[d + j] = w & 255, j += $, w /= 256, S -= 8)
    ;
  u[d + j - $] |= tt * 128;
};
/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <https://feross.org>
 * @license  MIT
 */
(function(u) {
  const l = Ws, d = nl, p = typeof Symbol == "function" && typeof Symbol.for == "function" ? Symbol.for("nodejs.util.inspect.custom") : null;
  u.Buffer = g, u.SlowBuffer = At, u.INSPECT_MAX_BYTES = 50;
  const b = 2147483647;
  u.kMaxLength = b, g.TYPED_ARRAY_SUPPORT = E(), !g.TYPED_ARRAY_SUPPORT && typeof console < "u" && typeof console.error == "function" && console.error(
    "This browser lacks typed array (Uint8Array) support which is required by `buffer` v5.x. Use `buffer` v4.x if you require old browser support."
  );
  function E() {
    try {
      const T = new Uint8Array(1), m = { foo: function() {
        return 42;
      } };
      return Object.setPrototypeOf(m, Uint8Array.prototype), Object.setPrototypeOf(T, m), T.foo() === 42;
    } catch {
      return !1;
    }
  }
  Object.defineProperty(g.prototype, "parent", {
    enumerable: !0,
    get: function() {
      if (g.isBuffer(this))
        return this.buffer;
    }
  }), Object.defineProperty(g.prototype, "offset", {
    enumerable: !0,
    get: function() {
      if (g.isBuffer(this))
        return this.byteOffset;
    }
  });
  function w(T) {
    if (T > b)
      throw new RangeError('The value "' + T + '" is invalid for option "size"');
    const m = new Uint8Array(T);
    return Object.setPrototypeOf(m, g.prototype), m;
  }
  function g(T, m, v) {
    if (typeof T == "number") {
      if (typeof m == "string")
        throw new TypeError(
          'The "string" argument must be of type string. Received type number'
        );
      return M(T);
    }
    return x(T, m, v);
  }
  g.poolSize = 8192;
  function x(T, m, v) {
    if (typeof T == "string")
      return z(T, m);
    if (ArrayBuffer.isView(T))
      return $(T);
    if (T == null)
      throw new TypeError(
        "The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " + typeof T
      );
    if (ti(T, ArrayBuffer) || T && ti(T.buffer, ArrayBuffer) || typeof SharedArrayBuffer < "u" && (ti(T, SharedArrayBuffer) || T && ti(T.buffer, SharedArrayBuffer)))
      return tt(T, m, v);
    if (typeof T == "number")
      throw new TypeError(
        'The "value" argument must not be of type number. Received type number'
      );
    const R = T.valueOf && T.valueOf();
    if (R != null && R !== T)
      return g.from(R, m, v);
    const X = ut(T);
    if (X) return X;
    if (typeof Symbol < "u" && Symbol.toPrimitive != null && typeof T[Symbol.toPrimitive] == "function")
      return g.from(T[Symbol.toPrimitive]("string"), m, v);
    throw new TypeError(
      "The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " + typeof T
    );
  }
  g.from = function(T, m, v) {
    return x(T, m, v);
  }, Object.setPrototypeOf(g.prototype, Uint8Array.prototype), Object.setPrototypeOf(g, Uint8Array);
  function S(T) {
    if (typeof T != "number")
      throw new TypeError('"size" argument must be of type number');
    if (T < 0)
      throw new RangeError('The value "' + T + '" is invalid for option "size"');
  }
  function P(T, m, v) {
    return S(T), T <= 0 ? w(T) : m !== void 0 ? typeof v == "string" ? w(T).fill(m, v) : w(T).fill(m) : w(T);
  }
  g.alloc = function(T, m, v) {
    return P(T, m, v);
  };
  function M(T) {
    return S(T), w(T < 0 ? 0 : ft(T) | 0);
  }
  g.allocUnsafe = function(T) {
    return M(T);
  }, g.allocUnsafeSlow = function(T) {
    return M(T);
  };
  function z(T, m) {
    if ((typeof m != "string" || m === "") && (m = "utf8"), !g.isEncoding(m))
      throw new TypeError("Unknown encoding: " + m);
    const v = Rt(T, m) | 0;
    let R = w(v);
    const X = R.write(T, m);
    return X !== v && (R = R.slice(0, X)), R;
  }
  function j(T) {
    const m = T.length < 0 ? 0 : ft(T.length) | 0, v = w(m);
    for (let R = 0; R < m; R += 1)
      v[R] = T[R] & 255;
    return v;
  }
  function $(T) {
    if (ti(T, Uint8Array)) {
      const m = new Uint8Array(T);
      return tt(m.buffer, m.byteOffset, m.byteLength);
    }
    return j(T);
  }
  function tt(T, m, v) {
    if (m < 0 || T.byteLength < m)
      throw new RangeError('"offset" is outside of buffer bounds');
    if (T.byteLength < m + (v || 0))
      throw new RangeError('"length" is outside of buffer bounds');
    let R;
    return m === void 0 && v === void 0 ? R = new Uint8Array(T) : v === void 0 ? R = new Uint8Array(T, m) : R = new Uint8Array(T, m, v), Object.setPrototypeOf(R, g.prototype), R;
  }
  function ut(T) {
    if (g.isBuffer(T)) {
      const m = ft(T.length) | 0, v = w(m);
      return v.length === 0 || T.copy(v, 0, 0, m), v;
    }
    if (T.length !== void 0)
      return typeof T.length != "number" || mn(T.length) ? w(0) : j(T);
    if (T.type === "Buffer" && Array.isArray(T.data))
      return j(T.data);
  }
  function ft(T) {
    if (T >= b)
      throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x" + b.toString(16) + " bytes");
    return T | 0;
  }
  function At(T) {
    return +T != T && (T = 0), g.alloc(+T);
  }
  g.isBuffer = function(m) {
    return m != null && m._isBuffer === !0 && m !== g.prototype;
  }, g.compare = function(m, v) {
    if (ti(m, Uint8Array) && (m = g.from(m, m.offset, m.byteLength)), ti(v, Uint8Array) && (v = g.from(v, v.offset, v.byteLength)), !g.isBuffer(m) || !g.isBuffer(v))
      throw new TypeError(
        'The "buf1", "buf2" arguments must be one of type Buffer or Uint8Array'
      );
    if (m === v) return 0;
    let R = m.length, X = v.length;
    for (let ot = 0, pt = Math.min(R, X); ot < pt; ++ot)
      if (m[ot] !== v[ot]) {
        R = m[ot], X = v[ot];
        break;
      }
    return R < X ? -1 : X < R ? 1 : 0;
  }, g.isEncoding = function(m) {
    switch (String(m).toLowerCase()) {
      case "hex":
      case "utf8":
      case "utf-8":
      case "ascii":
      case "latin1":
      case "binary":
      case "base64":
      case "ucs2":
      case "ucs-2":
      case "utf16le":
      case "utf-16le":
        return !0;
      default:
        return !1;
    }
  }, g.concat = function(m, v) {
    if (!Array.isArray(m))
      throw new TypeError('"list" argument must be an Array of Buffers');
    if (m.length === 0)
      return g.alloc(0);
    let R;
    if (v === void 0)
      for (v = 0, R = 0; R < m.length; ++R)
        v += m[R].length;
    const X = g.allocUnsafe(v);
    let ot = 0;
    for (R = 0; R < m.length; ++R) {
      let pt = m[R];
      if (ti(pt, Uint8Array))
        ot + pt.length > X.length ? (g.isBuffer(pt) || (pt = g.from(pt)), pt.copy(X, ot)) : Uint8Array.prototype.set.call(
          X,
          pt,
          ot
        );
      else if (g.isBuffer(pt))
        pt.copy(X, ot);
      else
        throw new TypeError('"list" argument must be an Array of Buffers');
      ot += pt.length;
    }
    return X;
  };
  function Rt(T, m) {
    if (g.isBuffer(T))
      return T.length;
    if (ArrayBuffer.isView(T) || ti(T, ArrayBuffer))
      return T.byteLength;
    if (typeof T != "string")
      throw new TypeError(
        'The "string" argument must be one of type string, Buffer, or ArrayBuffer. Received type ' + typeof T
      );
    const v = T.length, R = arguments.length > 2 && arguments[2] === !0;
    if (!R && v === 0) return 0;
    let X = !1;
    for (; ; )
      switch (m) {
        case "ascii":
        case "latin1":
        case "binary":
          return v;
        case "utf8":
        case "utf-8":
          return zi(T).length;
        case "ucs2":
        case "ucs-2":
        case "utf16le":
        case "utf-16le":
          return v * 2;
        case "hex":
          return v >>> 1;
        case "base64":
          return Tn(T).length;
        default:
          if (X)
            return R ? -1 : zi(T).length;
          m = ("" + m).toLowerCase(), X = !0;
      }
  }
  g.byteLength = Rt;
  function zt(T, m, v) {
    let R = !1;
    if ((m === void 0 || m < 0) && (m = 0), m > this.length || ((v === void 0 || v > this.length) && (v = this.length), v <= 0) || (v >>>= 0, m >>>= 0, v <= m))
      return "";
    for (T || (T = "utf8"); ; )
      switch (T) {
        case "hex":
          return wt(this, m, v);
        case "utf8":
        case "utf-8":
          return kt(this, m, v);
        case "ascii":
          return we(this, m, v);
        case "latin1":
        case "binary":
          return Ot(this, m, v);
        case "base64":
          return He(this, m, v);
        case "ucs2":
        case "ucs-2":
        case "utf16le":
        case "utf-16le":
          return lt(this, m, v);
        default:
          if (R) throw new TypeError("Unknown encoding: " + T);
          T = (T + "").toLowerCase(), R = !0;
      }
  }
  g.prototype._isBuffer = !0;
  function Et(T, m, v) {
    const R = T[m];
    T[m] = T[v], T[v] = R;
  }
  g.prototype.swap16 = function() {
    const m = this.length;
    if (m % 2 !== 0)
      throw new RangeError("Buffer size must be a multiple of 16-bits");
    for (let v = 0; v < m; v += 2)
      Et(this, v, v + 1);
    return this;
  }, g.prototype.swap32 = function() {
    const m = this.length;
    if (m % 4 !== 0)
      throw new RangeError("Buffer size must be a multiple of 32-bits");
    for (let v = 0; v < m; v += 4)
      Et(this, v, v + 3), Et(this, v + 1, v + 2);
    return this;
  }, g.prototype.swap64 = function() {
    const m = this.length;
    if (m % 8 !== 0)
      throw new RangeError("Buffer size must be a multiple of 64-bits");
    for (let v = 0; v < m; v += 8)
      Et(this, v, v + 7), Et(this, v + 1, v + 6), Et(this, v + 2, v + 5), Et(this, v + 3, v + 4);
    return this;
  }, g.prototype.toString = function() {
    const m = this.length;
    return m === 0 ? "" : arguments.length === 0 ? kt(this, 0, m) : zt.apply(this, arguments);
  }, g.prototype.toLocaleString = g.prototype.toString, g.prototype.equals = function(m) {
    if (!g.isBuffer(m)) throw new TypeError("Argument must be a Buffer");
    return this === m ? !0 : g.compare(this, m) === 0;
  }, g.prototype.inspect = function() {
    let m = "";
    const v = u.INSPECT_MAX_BYTES;
    return m = this.toString("hex", 0, v).replace(/(.{2})/g, "$1 ").trim(), this.length > v && (m += " ... "), "<Buffer " + m + ">";
  }, p && (g.prototype[p] = g.prototype.inspect), g.prototype.compare = function(m, v, R, X, ot) {
    if (ti(m, Uint8Array) && (m = g.from(m, m.offset, m.byteLength)), !g.isBuffer(m))
      throw new TypeError(
        'The "target" argument must be one of type Buffer or Uint8Array. Received type ' + typeof m
      );
    if (v === void 0 && (v = 0), R === void 0 && (R = m ? m.length : 0), X === void 0 && (X = 0), ot === void 0 && (ot = this.length), v < 0 || R > m.length || X < 0 || ot > this.length)
      throw new RangeError("out of range index");
    if (X >= ot && v >= R)
      return 0;
    if (X >= ot)
      return -1;
    if (v >= R)
      return 1;
    if (v >>>= 0, R >>>= 0, X >>>= 0, ot >>>= 0, this === m) return 0;
    let pt = ot - X, Yt = R - v;
    const ye = Math.min(pt, Yt), xe = this.slice(X, ot), _e = m.slice(v, R);
    for (let ve = 0; ve < ye; ++ve)
      if (xe[ve] !== _e[ve]) {
        pt = xe[ve], Yt = _e[ve];
        break;
      }
    return pt < Yt ? -1 : Yt < pt ? 1 : 0;
  };
  function ee(T, m, v, R, X) {
    if (T.length === 0) return -1;
    if (typeof v == "string" ? (R = v, v = 0) : v > 2147483647 ? v = 2147483647 : v < -2147483648 && (v = -2147483648), v = +v, mn(v) && (v = X ? 0 : T.length - 1), v < 0 && (v = T.length + v), v >= T.length) {
      if (X) return -1;
      v = T.length - 1;
    } else if (v < 0)
      if (X) v = 0;
      else return -1;
    if (typeof m == "string" && (m = g.from(m, R)), g.isBuffer(m))
      return m.length === 0 ? -1 : Dt(T, m, v, R, X);
    if (typeof m == "number")
      return m = m & 255, typeof Uint8Array.prototype.indexOf == "function" ? X ? Uint8Array.prototype.indexOf.call(T, m, v) : Uint8Array.prototype.lastIndexOf.call(T, m, v) : Dt(T, [m], v, R, X);
    throw new TypeError("val must be string, number or Buffer");
  }
  function Dt(T, m, v, R, X) {
    let ot = 1, pt = T.length, Yt = m.length;
    if (R !== void 0 && (R = String(R).toLowerCase(), R === "ucs2" || R === "ucs-2" || R === "utf16le" || R === "utf-16le")) {
      if (T.length < 2 || m.length < 2)
        return -1;
      ot = 2, pt /= 2, Yt /= 2, v /= 2;
    }
    function ye(_e, ve) {
      return ot === 1 ? _e[ve] : _e.readUInt16BE(ve * ot);
    }
    let xe;
    if (X) {
      let _e = -1;
      for (xe = v; xe < pt; xe++)
        if (ye(T, xe) === ye(m, _e === -1 ? 0 : xe - _e)) {
          if (_e === -1 && (_e = xe), xe - _e + 1 === Yt) return _e * ot;
        } else
          _e !== -1 && (xe -= xe - _e), _e = -1;
    } else
      for (v + Yt > pt && (v = pt - Yt), xe = v; xe >= 0; xe--) {
        let _e = !0;
        for (let ve = 0; ve < Yt; ve++)
          if (ye(T, xe + ve) !== ye(m, ve)) {
            _e = !1;
            break;
          }
        if (_e) return xe;
      }
    return -1;
  }
  g.prototype.includes = function(m, v, R) {
    return this.indexOf(m, v, R) !== -1;
  }, g.prototype.indexOf = function(m, v, R) {
    return ee(this, m, v, R, !0);
  }, g.prototype.lastIndexOf = function(m, v, R) {
    return ee(this, m, v, R, !1);
  };
  function Ut(T, m, v, R) {
    v = Number(v) || 0;
    const X = T.length - v;
    R ? (R = Number(R), R > X && (R = X)) : R = X;
    const ot = m.length;
    R > ot / 2 && (R = ot / 2);
    let pt;
    for (pt = 0; pt < R; ++pt) {
      const Yt = parseInt(m.substr(pt * 2, 2), 16);
      if (mn(Yt)) return pt;
      T[v + pt] = Yt;
    }
    return pt;
  }
  function ne(T, m, v, R) {
    return ji(zi(m, T.length - v), T, v, R);
  }
  function Zt(T, m, v, R) {
    return ji(Ni(m), T, v, R);
  }
  function Wt(T, m, v, R) {
    return ji(Tn(m), T, v, R);
  }
  function ge(T, m, v, R) {
    return ji(tr(m, T.length - v), T, v, R);
  }
  g.prototype.write = function(m, v, R, X) {
    if (v === void 0)
      X = "utf8", R = this.length, v = 0;
    else if (R === void 0 && typeof v == "string")
      X = v, R = this.length, v = 0;
    else if (isFinite(v))
      v = v >>> 0, isFinite(R) ? (R = R >>> 0, X === void 0 && (X = "utf8")) : (X = R, R = void 0);
    else
      throw new Error(
        "Buffer.write(string, encoding, offset[, length]) is no longer supported"
      );
    const ot = this.length - v;
    if ((R === void 0 || R > ot) && (R = ot), m.length > 0 && (R < 0 || v < 0) || v > this.length)
      throw new RangeError("Attempt to write outside buffer bounds");
    X || (X = "utf8");
    let pt = !1;
    for (; ; )
      switch (X) {
        case "hex":
          return Ut(this, m, v, R);
        case "utf8":
        case "utf-8":
          return ne(this, m, v, R);
        case "ascii":
        case "latin1":
        case "binary":
          return Zt(this, m, v, R);
        case "base64":
          return Wt(this, m, v, R);
        case "ucs2":
        case "ucs-2":
        case "utf16le":
        case "utf-16le":
          return ge(this, m, v, R);
        default:
          if (pt) throw new TypeError("Unknown encoding: " + X);
          X = ("" + X).toLowerCase(), pt = !0;
      }
  }, g.prototype.toJSON = function() {
    return {
      type: "Buffer",
      data: Array.prototype.slice.call(this._arr || this, 0)
    };
  };
  function He(T, m, v) {
    return m === 0 && v === T.length ? l.fromByteArray(T) : l.fromByteArray(T.slice(m, v));
  }
  function kt(T, m, v) {
    v = Math.min(T.length, v);
    const R = [];
    let X = m;
    for (; X < v; ) {
      const ot = T[X];
      let pt = null, Yt = ot > 239 ? 4 : ot > 223 ? 3 : ot > 191 ? 2 : 1;
      if (X + Yt <= v) {
        let ye, xe, _e, ve;
        switch (Yt) {
          case 1:
            ot < 128 && (pt = ot);
            break;
          case 2:
            ye = T[X + 1], (ye & 192) === 128 && (ve = (ot & 31) << 6 | ye & 63, ve > 127 && (pt = ve));
            break;
          case 3:
            ye = T[X + 1], xe = T[X + 2], (ye & 192) === 128 && (xe & 192) === 128 && (ve = (ot & 15) << 12 | (ye & 63) << 6 | xe & 63, ve > 2047 && (ve < 55296 || ve > 57343) && (pt = ve));
            break;
          case 4:
            ye = T[X + 1], xe = T[X + 2], _e = T[X + 3], (ye & 192) === 128 && (xe & 192) === 128 && (_e & 192) === 128 && (ve = (ot & 15) << 18 | (ye & 63) << 12 | (xe & 63) << 6 | _e & 63, ve > 65535 && ve < 1114112 && (pt = ve));
        }
      }
      pt === null ? (pt = 65533, Yt = 1) : pt > 65535 && (pt -= 65536, R.push(pt >>> 10 & 1023 | 55296), pt = 56320 | pt & 1023), R.push(pt), X += Yt;
    }
    return ie(R);
  }
  const Jt = 4096;
  function ie(T) {
    const m = T.length;
    if (m <= Jt)
      return String.fromCharCode.apply(String, T);
    let v = "", R = 0;
    for (; R < m; )
      v += String.fromCharCode.apply(
        String,
        T.slice(R, R += Jt)
      );
    return v;
  }
  function we(T, m, v) {
    let R = "";
    v = Math.min(T.length, v);
    for (let X = m; X < v; ++X)
      R += String.fromCharCode(T[X] & 127);
    return R;
  }
  function Ot(T, m, v) {
    let R = "";
    v = Math.min(T.length, v);
    for (let X = m; X < v; ++X)
      R += String.fromCharCode(T[X]);
    return R;
  }
  function wt(T, m, v) {
    const R = T.length;
    (!m || m < 0) && (m = 0), (!v || v < 0 || v > R) && (v = R);
    let X = "";
    for (let ot = m; ot < v; ++ot)
      X += Sr[T[ot]];
    return X;
  }
  function lt(T, m, v) {
    const R = T.slice(m, v);
    let X = "";
    for (let ot = 0; ot < R.length - 1; ot += 2)
      X += String.fromCharCode(R[ot] + R[ot + 1] * 256);
    return X;
  }
  g.prototype.slice = function(m, v) {
    const R = this.length;
    m = ~~m, v = v === void 0 ? R : ~~v, m < 0 ? (m += R, m < 0 && (m = 0)) : m > R && (m = R), v < 0 ? (v += R, v < 0 && (v = 0)) : v > R && (v = R), v < m && (v = m);
    const X = this.subarray(m, v);
    return Object.setPrototypeOf(X, g.prototype), X;
  };
  function Bt(T, m, v) {
    if (T % 1 !== 0 || T < 0) throw new RangeError("offset is not uint");
    if (T + m > v) throw new RangeError("Trying to access beyond buffer length");
  }
  g.prototype.readUintLE = g.prototype.readUIntLE = function(m, v, R) {
    m = m >>> 0, v = v >>> 0, R || Bt(m, v, this.length);
    let X = this[m], ot = 1, pt = 0;
    for (; ++pt < v && (ot *= 256); )
      X += this[m + pt] * ot;
    return X;
  }, g.prototype.readUintBE = g.prototype.readUIntBE = function(m, v, R) {
    m = m >>> 0, v = v >>> 0, R || Bt(m, v, this.length);
    let X = this[m + --v], ot = 1;
    for (; v > 0 && (ot *= 256); )
      X += this[m + --v] * ot;
    return X;
  }, g.prototype.readUint8 = g.prototype.readUInt8 = function(m, v) {
    return m = m >>> 0, v || Bt(m, 1, this.length), this[m];
  }, g.prototype.readUint16LE = g.prototype.readUInt16LE = function(m, v) {
    return m = m >>> 0, v || Bt(m, 2, this.length), this[m] | this[m + 1] << 8;
  }, g.prototype.readUint16BE = g.prototype.readUInt16BE = function(m, v) {
    return m = m >>> 0, v || Bt(m, 2, this.length), this[m] << 8 | this[m + 1];
  }, g.prototype.readUint32LE = g.prototype.readUInt32LE = function(m, v) {
    return m = m >>> 0, v || Bt(m, 4, this.length), (this[m] | this[m + 1] << 8 | this[m + 2] << 16) + this[m + 3] * 16777216;
  }, g.prototype.readUint32BE = g.prototype.readUInt32BE = function(m, v) {
    return m = m >>> 0, v || Bt(m, 4, this.length), this[m] * 16777216 + (this[m + 1] << 16 | this[m + 2] << 8 | this[m + 3]);
  }, g.prototype.readBigUInt64LE = gi(function(m) {
    m = m >>> 0, mi(m, "offset");
    const v = this[m], R = this[m + 7];
    (v === void 0 || R === void 0) && Ri(m, this.length - 8);
    const X = v + this[++m] * 2 ** 8 + this[++m] * 2 ** 16 + this[++m] * 2 ** 24, ot = this[++m] + this[++m] * 2 ** 8 + this[++m] * 2 ** 16 + R * 2 ** 24;
    return BigInt(X) + (BigInt(ot) << BigInt(32));
  }), g.prototype.readBigUInt64BE = gi(function(m) {
    m = m >>> 0, mi(m, "offset");
    const v = this[m], R = this[m + 7];
    (v === void 0 || R === void 0) && Ri(m, this.length - 8);
    const X = v * 2 ** 24 + this[++m] * 2 ** 16 + this[++m] * 2 ** 8 + this[++m], ot = this[++m] * 2 ** 24 + this[++m] * 2 ** 16 + this[++m] * 2 ** 8 + R;
    return (BigInt(X) << BigInt(32)) + BigInt(ot);
  }), g.prototype.readIntLE = function(m, v, R) {
    m = m >>> 0, v = v >>> 0, R || Bt(m, v, this.length);
    let X = this[m], ot = 1, pt = 0;
    for (; ++pt < v && (ot *= 256); )
      X += this[m + pt] * ot;
    return ot *= 128, X >= ot && (X -= Math.pow(2, 8 * v)), X;
  }, g.prototype.readIntBE = function(m, v, R) {
    m = m >>> 0, v = v >>> 0, R || Bt(m, v, this.length);
    let X = v, ot = 1, pt = this[m + --X];
    for (; X > 0 && (ot *= 256); )
      pt += this[m + --X] * ot;
    return ot *= 128, pt >= ot && (pt -= Math.pow(2, 8 * v)), pt;
  }, g.prototype.readInt8 = function(m, v) {
    return m = m >>> 0, v || Bt(m, 1, this.length), this[m] & 128 ? (255 - this[m] + 1) * -1 : this[m];
  }, g.prototype.readInt16LE = function(m, v) {
    m = m >>> 0, v || Bt(m, 2, this.length);
    const R = this[m] | this[m + 1] << 8;
    return R & 32768 ? R | 4294901760 : R;
  }, g.prototype.readInt16BE = function(m, v) {
    m = m >>> 0, v || Bt(m, 2, this.length);
    const R = this[m + 1] | this[m] << 8;
    return R & 32768 ? R | 4294901760 : R;
  }, g.prototype.readInt32LE = function(m, v) {
    return m = m >>> 0, v || Bt(m, 4, this.length), this[m] | this[m + 1] << 8 | this[m + 2] << 16 | this[m + 3] << 24;
  }, g.prototype.readInt32BE = function(m, v) {
    return m = m >>> 0, v || Bt(m, 4, this.length), this[m] << 24 | this[m + 1] << 16 | this[m + 2] << 8 | this[m + 3];
  }, g.prototype.readBigInt64LE = gi(function(m) {
    m = m >>> 0, mi(m, "offset");
    const v = this[m], R = this[m + 7];
    (v === void 0 || R === void 0) && Ri(m, this.length - 8);
    const X = this[m + 4] + this[m + 5] * 2 ** 8 + this[m + 6] * 2 ** 16 + (R << 24);
    return (BigInt(X) << BigInt(32)) + BigInt(v + this[++m] * 2 ** 8 + this[++m] * 2 ** 16 + this[++m] * 2 ** 24);
  }), g.prototype.readBigInt64BE = gi(function(m) {
    m = m >>> 0, mi(m, "offset");
    const v = this[m], R = this[m + 7];
    (v === void 0 || R === void 0) && Ri(m, this.length - 8);
    const X = (v << 24) + // Overflow
    this[++m] * 2 ** 16 + this[++m] * 2 ** 8 + this[++m];
    return (BigInt(X) << BigInt(32)) + BigInt(this[++m] * 2 ** 24 + this[++m] * 2 ** 16 + this[++m] * 2 ** 8 + R);
  }), g.prototype.readFloatLE = function(m, v) {
    return m = m >>> 0, v || Bt(m, 4, this.length), d.read(this, m, !0, 23, 4);
  }, g.prototype.readFloatBE = function(m, v) {
    return m = m >>> 0, v || Bt(m, 4, this.length), d.read(this, m, !1, 23, 4);
  }, g.prototype.readDoubleLE = function(m, v) {
    return m = m >>> 0, v || Bt(m, 8, this.length), d.read(this, m, !0, 52, 8);
  }, g.prototype.readDoubleBE = function(m, v) {
    return m = m >>> 0, v || Bt(m, 8, this.length), d.read(this, m, !1, 52, 8);
  };
  function Nt(T, m, v, R, X, ot) {
    if (!g.isBuffer(T)) throw new TypeError('"buffer" argument must be a Buffer instance');
    if (m > X || m < ot) throw new RangeError('"value" argument is out of bounds');
    if (v + R > T.length) throw new RangeError("Index out of range");
  }
  g.prototype.writeUintLE = g.prototype.writeUIntLE = function(m, v, R, X) {
    if (m = +m, v = v >>> 0, R = R >>> 0, !X) {
      const Yt = Math.pow(2, 8 * R) - 1;
      Nt(this, m, v, R, Yt, 0);
    }
    let ot = 1, pt = 0;
    for (this[v] = m & 255; ++pt < R && (ot *= 256); )
      this[v + pt] = m / ot & 255;
    return v + R;
  }, g.prototype.writeUintBE = g.prototype.writeUIntBE = function(m, v, R, X) {
    if (m = +m, v = v >>> 0, R = R >>> 0, !X) {
      const Yt = Math.pow(2, 8 * R) - 1;
      Nt(this, m, v, R, Yt, 0);
    }
    let ot = R - 1, pt = 1;
    for (this[v + ot] = m & 255; --ot >= 0 && (pt *= 256); )
      this[v + ot] = m / pt & 255;
    return v + R;
  }, g.prototype.writeUint8 = g.prototype.writeUInt8 = function(m, v, R) {
    return m = +m, v = v >>> 0, R || Nt(this, m, v, 1, 255, 0), this[v] = m & 255, v + 1;
  }, g.prototype.writeUint16LE = g.prototype.writeUInt16LE = function(m, v, R) {
    return m = +m, v = v >>> 0, R || Nt(this, m, v, 2, 65535, 0), this[v] = m & 255, this[v + 1] = m >>> 8, v + 2;
  }, g.prototype.writeUint16BE = g.prototype.writeUInt16BE = function(m, v, R) {
    return m = +m, v = v >>> 0, R || Nt(this, m, v, 2, 65535, 0), this[v] = m >>> 8, this[v + 1] = m & 255, v + 2;
  }, g.prototype.writeUint32LE = g.prototype.writeUInt32LE = function(m, v, R) {
    return m = +m, v = v >>> 0, R || Nt(this, m, v, 4, 4294967295, 0), this[v + 3] = m >>> 24, this[v + 2] = m >>> 16, this[v + 1] = m >>> 8, this[v] = m & 255, v + 4;
  }, g.prototype.writeUint32BE = g.prototype.writeUInt32BE = function(m, v, R) {
    return m = +m, v = v >>> 0, R || Nt(this, m, v, 4, 4294967295, 0), this[v] = m >>> 24, this[v + 1] = m >>> 16, this[v + 2] = m >>> 8, this[v + 3] = m & 255, v + 4;
  };
  function ue(T, m, v, R, X) {
    Fi(m, R, X, T, v, 7);
    let ot = Number(m & BigInt(4294967295));
    T[v++] = ot, ot = ot >> 8, T[v++] = ot, ot = ot >> 8, T[v++] = ot, ot = ot >> 8, T[v++] = ot;
    let pt = Number(m >> BigInt(32) & BigInt(4294967295));
    return T[v++] = pt, pt = pt >> 8, T[v++] = pt, pt = pt >> 8, T[v++] = pt, pt = pt >> 8, T[v++] = pt, v;
  }
  function jt(T, m, v, R, X) {
    Fi(m, R, X, T, v, 7);
    let ot = Number(m & BigInt(4294967295));
    T[v + 7] = ot, ot = ot >> 8, T[v + 6] = ot, ot = ot >> 8, T[v + 5] = ot, ot = ot >> 8, T[v + 4] = ot;
    let pt = Number(m >> BigInt(32) & BigInt(4294967295));
    return T[v + 3] = pt, pt = pt >> 8, T[v + 2] = pt, pt = pt >> 8, T[v + 1] = pt, pt = pt >> 8, T[v] = pt, v + 8;
  }
  g.prototype.writeBigUInt64LE = gi(function(m, v = 0) {
    return ue(this, m, v, BigInt(0), BigInt("0xffffffffffffffff"));
  }), g.prototype.writeBigUInt64BE = gi(function(m, v = 0) {
    return jt(this, m, v, BigInt(0), BigInt("0xffffffffffffffff"));
  }), g.prototype.writeIntLE = function(m, v, R, X) {
    if (m = +m, v = v >>> 0, !X) {
      const ye = Math.pow(2, 8 * R - 1);
      Nt(this, m, v, R, ye - 1, -ye);
    }
    let ot = 0, pt = 1, Yt = 0;
    for (this[v] = m & 255; ++ot < R && (pt *= 256); )
      m < 0 && Yt === 0 && this[v + ot - 1] !== 0 && (Yt = 1), this[v + ot] = (m / pt >> 0) - Yt & 255;
    return v + R;
  }, g.prototype.writeIntBE = function(m, v, R, X) {
    if (m = +m, v = v >>> 0, !X) {
      const ye = Math.pow(2, 8 * R - 1);
      Nt(this, m, v, R, ye - 1, -ye);
    }
    let ot = R - 1, pt = 1, Yt = 0;
    for (this[v + ot] = m & 255; --ot >= 0 && (pt *= 256); )
      m < 0 && Yt === 0 && this[v + ot + 1] !== 0 && (Yt = 1), this[v + ot] = (m / pt >> 0) - Yt & 255;
    return v + R;
  }, g.prototype.writeInt8 = function(m, v, R) {
    return m = +m, v = v >>> 0, R || Nt(this, m, v, 1, 127, -128), m < 0 && (m = 255 + m + 1), this[v] = m & 255, v + 1;
  }, g.prototype.writeInt16LE = function(m, v, R) {
    return m = +m, v = v >>> 0, R || Nt(this, m, v, 2, 32767, -32768), this[v] = m & 255, this[v + 1] = m >>> 8, v + 2;
  }, g.prototype.writeInt16BE = function(m, v, R) {
    return m = +m, v = v >>> 0, R || Nt(this, m, v, 2, 32767, -32768), this[v] = m >>> 8, this[v + 1] = m & 255, v + 2;
  }, g.prototype.writeInt32LE = function(m, v, R) {
    return m = +m, v = v >>> 0, R || Nt(this, m, v, 4, 2147483647, -2147483648), this[v] = m & 255, this[v + 1] = m >>> 8, this[v + 2] = m >>> 16, this[v + 3] = m >>> 24, v + 4;
  }, g.prototype.writeInt32BE = function(m, v, R) {
    return m = +m, v = v >>> 0, R || Nt(this, m, v, 4, 2147483647, -2147483648), m < 0 && (m = 4294967295 + m + 1), this[v] = m >>> 24, this[v + 1] = m >>> 16, this[v + 2] = m >>> 8, this[v + 3] = m & 255, v + 4;
  }, g.prototype.writeBigInt64LE = gi(function(m, v = 0) {
    return ue(this, m, v, -BigInt("0x8000000000000000"), BigInt("0x7fffffffffffffff"));
  }), g.prototype.writeBigInt64BE = gi(function(m, v = 0) {
    return jt(this, m, v, -BigInt("0x8000000000000000"), BigInt("0x7fffffffffffffff"));
  });
  function St(T, m, v, R, X, ot) {
    if (v + R > T.length) throw new RangeError("Index out of range");
    if (v < 0) throw new RangeError("Index out of range");
  }
  function Mt(T, m, v, R, X) {
    return m = +m, v = v >>> 0, X || St(T, m, v, 4), d.write(T, m, v, R, 23, 4), v + 4;
  }
  g.prototype.writeFloatLE = function(m, v, R) {
    return Mt(this, m, v, !0, R);
  }, g.prototype.writeFloatBE = function(m, v, R) {
    return Mt(this, m, v, !1, R);
  };
  function be(T, m, v, R, X) {
    return m = +m, v = v >>> 0, X || St(T, m, v, 8), d.write(T, m, v, R, 52, 8), v + 8;
  }
  g.prototype.writeDoubleLE = function(m, v, R) {
    return be(this, m, v, !0, R);
  }, g.prototype.writeDoubleBE = function(m, v, R) {
    return be(this, m, v, !1, R);
  }, g.prototype.copy = function(m, v, R, X) {
    if (!g.isBuffer(m)) throw new TypeError("argument should be a Buffer");
    if (R || (R = 0), !X && X !== 0 && (X = this.length), v >= m.length && (v = m.length), v || (v = 0), X > 0 && X < R && (X = R), X === R || m.length === 0 || this.length === 0) return 0;
    if (v < 0)
      throw new RangeError("targetStart out of bounds");
    if (R < 0 || R >= this.length) throw new RangeError("Index out of range");
    if (X < 0) throw new RangeError("sourceEnd out of bounds");
    X > this.length && (X = this.length), m.length - v < X - R && (X = m.length - v + R);
    const ot = X - R;
    return this === m && typeof Uint8Array.prototype.copyWithin == "function" ? this.copyWithin(v, R, X) : Uint8Array.prototype.set.call(
      m,
      this.subarray(R, X),
      v
    ), ot;
  }, g.prototype.fill = function(m, v, R, X) {
    if (typeof m == "string") {
      if (typeof v == "string" ? (X = v, v = 0, R = this.length) : typeof R == "string" && (X = R, R = this.length), X !== void 0 && typeof X != "string")
        throw new TypeError("encoding must be a string");
      if (typeof X == "string" && !g.isEncoding(X))
        throw new TypeError("Unknown encoding: " + X);
      if (m.length === 1) {
        const pt = m.charCodeAt(0);
        (X === "utf8" && pt < 128 || X === "latin1") && (m = pt);
      }
    } else typeof m == "number" ? m = m & 255 : typeof m == "boolean" && (m = Number(m));
    if (v < 0 || this.length < v || this.length < R)
      throw new RangeError("Out of range index");
    if (R <= v)
      return this;
    v = v >>> 0, R = R === void 0 ? this.length : R >>> 0, m || (m = 0);
    let ot;
    if (typeof m == "number")
      for (ot = v; ot < R; ++ot)
        this[ot] = m;
    else {
      const pt = g.isBuffer(m) ? m : g.from(m, X), Yt = pt.length;
      if (Yt === 0)
        throw new TypeError('The value "' + m + '" is invalid for argument "value"');
      for (ot = 0; ot < R - v; ++ot)
        this[ot + v] = pt[ot % Yt];
    }
    return this;
  };
  const fe = {};
  function ke(T, m, v) {
    fe[T] = class extends v {
      constructor() {
        super(), Object.defineProperty(this, "message", {
          value: m.apply(this, arguments),
          writable: !0,
          configurable: !0
        }), this.name = `${this.name} [${T}]`, this.stack, delete this.name;
      }
      get code() {
        return T;
      }
      set code(X) {
        Object.defineProperty(this, "code", {
          configurable: !0,
          enumerable: !0,
          value: X,
          writable: !0
        });
      }
      toString() {
        return `${this.name} [${T}]: ${this.message}`;
      }
    };
  }
  ke(
    "ERR_BUFFER_OUT_OF_BOUNDS",
    function(T) {
      return T ? `${T} is outside of buffer bounds` : "Attempt to access memory outside buffer bounds";
    },
    RangeError
  ), ke(
    "ERR_INVALID_ARG_TYPE",
    function(T, m) {
      return `The "${T}" argument must be of type number. Received type ${typeof m}`;
    },
    TypeError
  ), ke(
    "ERR_OUT_OF_RANGE",
    function(T, m, v) {
      let R = `The value of "${T}" is out of range.`, X = v;
      return Number.isInteger(v) && Math.abs(v) > 2 ** 32 ? X = Bi(String(v)) : typeof v == "bigint" && (X = String(v), (v > BigInt(2) ** BigInt(32) || v < -(BigInt(2) ** BigInt(32))) && (X = Bi(X)), X += "n"), R += ` It must be ${m}. Received ${X}`, R;
    },
    RangeError
  );
  function Bi(T) {
    let m = "", v = T.length;
    const R = T[0] === "-" ? 1 : 0;
    for (; v >= R + 4; v -= 3)
      m = `_${T.slice(v - 3, v)}${m}`;
    return `${T.slice(0, v)}${m}`;
  }
  function pn(T, m, v) {
    mi(m, "offset"), (T[m] === void 0 || T[m + v] === void 0) && Ri(m, T.length - (v + 1));
  }
  function Fi(T, m, v, R, X, ot) {
    if (T > v || T < m) {
      const pt = typeof m == "bigint" ? "n" : "";
      let Yt;
      throw m === 0 || m === BigInt(0) ? Yt = `>= 0${pt} and < 2${pt} ** ${(ot + 1) * 8}${pt}` : Yt = `>= -(2${pt} ** ${(ot + 1) * 8 - 1}${pt}) and < 2 ** ${(ot + 1) * 8 - 1}${pt}`, new fe.ERR_OUT_OF_RANGE("value", Yt, T);
    }
    pn(R, X, ot);
  }
  function mi(T, m) {
    if (typeof T != "number")
      throw new fe.ERR_INVALID_ARG_TYPE(m, "number", T);
  }
  function Ri(T, m, v) {
    throw Math.floor(T) !== T ? (mi(T, v), new fe.ERR_OUT_OF_RANGE("offset", "an integer", T)) : m < 0 ? new fe.ERR_BUFFER_OUT_OF_BOUNDS() : new fe.ERR_OUT_OF_RANGE(
      "offset",
      `>= 0 and <= ${m}`,
      T
    );
  }
  const Yn = /[^+/0-9A-Za-z-_]/g;
  function Qn(T) {
    if (T = T.split("=")[0], T = T.trim().replace(Yn, ""), T.length < 2) return "";
    for (; T.length % 4 !== 0; )
      T = T + "=";
    return T;
  }
  function zi(T, m) {
    m = m || 1 / 0;
    let v;
    const R = T.length;
    let X = null;
    const ot = [];
    for (let pt = 0; pt < R; ++pt) {
      if (v = T.charCodeAt(pt), v > 55295 && v < 57344) {
        if (!X) {
          if (v > 56319) {
            (m -= 3) > -1 && ot.push(239, 191, 189);
            continue;
          } else if (pt + 1 === R) {
            (m -= 3) > -1 && ot.push(239, 191, 189);
            continue;
          }
          X = v;
          continue;
        }
        if (v < 56320) {
          (m -= 3) > -1 && ot.push(239, 191, 189), X = v;
          continue;
        }
        v = (X - 55296 << 10 | v - 56320) + 65536;
      } else X && (m -= 3) > -1 && ot.push(239, 191, 189);
      if (X = null, v < 128) {
        if ((m -= 1) < 0) break;
        ot.push(v);
      } else if (v < 2048) {
        if ((m -= 2) < 0) break;
        ot.push(
          v >> 6 | 192,
          v & 63 | 128
        );
      } else if (v < 65536) {
        if ((m -= 3) < 0) break;
        ot.push(
          v >> 12 | 224,
          v >> 6 & 63 | 128,
          v & 63 | 128
        );
      } else if (v < 1114112) {
        if ((m -= 4) < 0) break;
        ot.push(
          v >> 18 | 240,
          v >> 12 & 63 | 128,
          v >> 6 & 63 | 128,
          v & 63 | 128
        );
      } else
        throw new Error("Invalid code point");
    }
    return ot;
  }
  function Ni(T) {
    const m = [];
    for (let v = 0; v < T.length; ++v)
      m.push(T.charCodeAt(v) & 255);
    return m;
  }
  function tr(T, m) {
    let v, R, X;
    const ot = [];
    for (let pt = 0; pt < T.length && !((m -= 2) < 0); ++pt)
      v = T.charCodeAt(pt), R = v >> 8, X = v % 256, ot.push(X), ot.push(R);
    return ot;
  }
  function Tn(T) {
    return l.toByteArray(Qn(T));
  }
  function ji(T, m, v, R) {
    let X;
    for (X = 0; X < R && !(X + v >= m.length || X >= T.length); ++X)
      m[X + v] = T[X];
    return X;
  }
  function ti(T, m) {
    return T instanceof m || T != null && T.constructor != null && T.constructor.name != null && T.constructor.name === m.name;
  }
  function mn(T) {
    return T !== T;
  }
  const Sr = function() {
    const T = "0123456789abcdef", m = new Array(256);
    for (let v = 0; v < 16; ++v) {
      const R = v * 16;
      for (let X = 0; X < 16; ++X)
        m[R + X] = T[v] + T[X];
    }
    return m;
  }();
  function gi(T) {
    return typeof BigInt > "u" ? Dn : T;
  }
  function Dn() {
    throw new Error("BigInt not supported");
  }
})(Kl);
const _a = "http://www.w3.org/1999/02/22-rdf-syntax-ns#", ya = "http://www.w3.org/2001/XMLSchema#", Rs = "http://www.w3.org/2000/10/swap/", Oi = {
  xsd: {
    decimal: `${ya}decimal`,
    boolean: `${ya}boolean`,
    double: `${ya}double`,
    integer: `${ya}integer`,
    string: `${ya}string`
  },
  rdf: {
    type: `${_a}type`,
    nil: `${_a}nil`,
    first: `${_a}first`,
    rest: `${_a}rest`,
    langString: `${_a}langString`
  },
  owl: {
    sameAs: "http://www.w3.org/2002/07/owl#sameAs"
  },
  r: {
    forSome: `${Rs}reify#forSome`,
    forAll: `${Rs}reify#forAll`
  },
  log: {
    implies: `${Rs}log#implies`,
    isImpliedBy: `${Rs}log#isImpliedBy`
  }
}, { xsd: zs } = Oi, Af = /\\u([a-fA-F0-9]{4})|\\U([a-fA-F0-9]{8})|\\([^])/g, Al = {
  "\\": "\\",
  "'": "'",
  '"': '"',
  n: `
`,
  r: "\r",
  t: "	",
  f: "\f",
  b: "\b",
  _: "_",
  "~": "~",
  ".": ".",
  "-": "-",
  "!": "!",
  $: "$",
  "&": "&",
  "(": "(",
  ")": ")",
  "*": "*",
  "+": "+",
  ",": ",",
  ";": ";",
  "=": "=",
  "/": "/",
  "?": "?",
  "#": "#",
  "@": "@",
  "%": "%"
}, Sf = /[\x00-\x20<>\\"\{\}\|\^\`]/, Pf = {
  _iri: !0,
  _unescapedIri: !0,
  _simpleQuotedString: !0,
  _langcode: !0,
  _blank: !0,
  _newline: !0,
  _comment: !0,
  _whitespace: !0,
  _endOfFile: !0
}, Tf = /$0^/;
class Df {
  constructor(l) {
    if (this._iri = /^<((?:[^ <>{}\\]|\\[uU])+)>[ \t]*/, this._unescapedIri = /^<([^\x00-\x20<>\\"\{\}\|\^\`]*)>[ \t]*/, this._simpleQuotedString = /^"([^"\\\r\n]*)"(?=[^"])/, this._simpleApostropheString = /^'([^'\\\r\n]*)'(?=[^'])/, this._langcode = /^@([a-z]+(?:-[a-z0-9]+)*)(?=[^a-z0-9\-])/i, this._prefix = /^((?:[A-Za-z\xc0-\xd6\xd8-\xf6\xf8-\u02ff\u0370-\u037d\u037f-\u1fff\u200c\u200d\u2070-\u218f\u2c00-\u2fef\u3001-\ud7ff\uf900-\ufdcf\ufdf0-\ufffd]|[\ud800-\udb7f][\udc00-\udfff])(?:\.?[\-0-9A-Z_a-z\xb7\xc0-\xd6\xd8-\xf6\xf8-\u037d\u037f-\u1fff\u200c\u200d\u203f\u2040\u2070-\u218f\u2c00-\u2fef\u3001-\ud7ff\uf900-\ufdcf\ufdf0-\ufffd]|[\ud800-\udb7f][\udc00-\udfff])*)?:(?=[#\s<])/, this._prefixed = /^((?:[A-Za-z\xc0-\xd6\xd8-\xf6\xf8-\u02ff\u0370-\u037d\u037f-\u1fff\u200c\u200d\u2070-\u218f\u2c00-\u2fef\u3001-\ud7ff\uf900-\ufdcf\ufdf0-\ufffd]|[\ud800-\udb7f][\udc00-\udfff])(?:\.?[\-0-9A-Z_a-z\xb7\xc0-\xd6\xd8-\xf6\xf8-\u037d\u037f-\u1fff\u200c\u200d\u203f\u2040\u2070-\u218f\u2c00-\u2fef\u3001-\ud7ff\uf900-\ufdcf\ufdf0-\ufffd]|[\ud800-\udb7f][\udc00-\udfff])*)?:((?:(?:[0-:A-Z_a-z\xc0-\xd6\xd8-\xf6\xf8-\u02ff\u0370-\u037d\u037f-\u1fff\u200c\u200d\u2070-\u218f\u2c00-\u2fef\u3001-\ud7ff\uf900-\ufdcf\ufdf0-\ufffd]|[\ud800-\udb7f][\udc00-\udfff]|%[0-9a-fA-F]{2}|\\[!#-\/;=?\-@_~])(?:(?:[\.\-0-:A-Z_a-z\xb7\xc0-\xd6\xd8-\xf6\xf8-\u037d\u037f-\u1fff\u200c\u200d\u203f\u2040\u2070-\u218f\u2c00-\u2fef\u3001-\ud7ff\uf900-\ufdcf\ufdf0-\ufffd]|[\ud800-\udb7f][\udc00-\udfff]|%[0-9a-fA-F]{2}|\\[!#-\/;=?\-@_~])*(?:[\-0-:A-Z_a-z\xb7\xc0-\xd6\xd8-\xf6\xf8-\u037d\u037f-\u1fff\u200c\u200d\u203f\u2040\u2070-\u218f\u2c00-\u2fef\u3001-\ud7ff\uf900-\ufdcf\ufdf0-\ufffd]|[\ud800-\udb7f][\udc00-\udfff]|%[0-9a-fA-F]{2}|\\[!#-\/;=?\-@_~]))?)?)(?:[ \t]+|(?=\.?[,;!\^\s#()\[\]\{\}"'<>]))/, this._variable = /^\?(?:(?:[A-Z_a-z\xc0-\xd6\xd8-\xf6\xf8-\u02ff\u0370-\u037d\u037f-\u1fff\u200c\u200d\u2070-\u218f\u2c00-\u2fef\u3001-\ud7ff\uf900-\ufdcf\ufdf0-\ufffd]|[\ud800-\udb7f][\udc00-\udfff])(?:[\-0-:A-Z_a-z\xb7\xc0-\xd6\xd8-\xf6\xf8-\u037d\u037f-\u1fff\u200c\u200d\u203f\u2040\u2070-\u218f\u2c00-\u2fef\u3001-\ud7ff\uf900-\ufdcf\ufdf0-\ufffd]|[\ud800-\udb7f][\udc00-\udfff])*)(?=[.,;!\^\s#()\[\]\{\}"'<>])/, this._blank = /^_:((?:[0-9A-Z_a-z\xc0-\xd6\xd8-\xf6\xf8-\u02ff\u0370-\u037d\u037f-\u1fff\u200c\u200d\u2070-\u218f\u2c00-\u2fef\u3001-\ud7ff\uf900-\ufdcf\ufdf0-\ufffd]|[\ud800-\udb7f][\udc00-\udfff])(?:\.?[\-0-9A-Z_a-z\xb7\xc0-\xd6\xd8-\xf6\xf8-\u037d\u037f-\u1fff\u200c\u200d\u203f\u2040\u2070-\u218f\u2c00-\u2fef\u3001-\ud7ff\uf900-\ufdcf\ufdf0-\ufffd]|[\ud800-\udb7f][\udc00-\udfff])*)(?:[ \t]+|(?=\.?[,;:\s#()\[\]\{\}"'<>]))/, this._number = /^[\-+]?(?:(\d+\.\d*|\.?\d+)[eE][\-+]?|\d*(\.)?)\d+(?=\.?[,;:\s#()\[\]\{\}"'<>])/, this._boolean = /^(?:true|false)(?=[.,;\s#()\[\]\{\}"'<>])/, this._keyword = /^@[a-z]+(?=[\s#<:])/i, this._sparqlKeyword = /^(?:PREFIX|BASE|GRAPH)(?=[\s#<])/i, this._shortPredicates = /^a(?=[\s#()\[\]\{\}"'<>])/, this._newline = /^[ \t]*(?:#[^\n\r]*)?(?:\r\n|\n|\r)[ \t]*/, this._comment = /#([^\n\r]*)/, this._whitespace = /^[ \t]+/, this._endOfFile = /^(?:#[^\n\r]*)?$/, l = l || {}, this._isImpliedBy = l.isImpliedBy, this._lineMode = !!l.lineMode) {
      this._n3Mode = !1;
      for (const d in this)
        !(d in Pf) && this[d] instanceof RegExp && (this[d] = Tf);
    } else
      this._n3Mode = l.n3 !== !1;
    this.comments = !!l.comments, this._literalClosingPos = 0;
  }
  // ## Private methods
  // ### `_tokenizeToEnd` tokenizes as for as possible, emitting tokens through the callback
  _tokenizeToEnd(l, d) {
    let p = this._input, b = p.length;
    for (; ; ) {
      let g, x;
      for (; g = this._newline.exec(p); )
        this.comments && (x = this._comment.exec(g[0])) && E("comment", x[1], "", this._line, g[0].length), p = p.substr(g[0].length, p.length), b = p.length, this._line++;
      if (!g && (g = this._whitespace.exec(p)) && (p = p.substr(g[0].length, p.length)), this._endOfFile.test(p))
        return d && (this.comments && (x = this._comment.exec(p)) && E("comment", x[1], "", this._line, p.length), p = null, E("eof", "", "", this._line, 0)), this._input = p;
      const S = this._line, P = p[0];
      let M = "", z = "", j = "", $ = null, tt = 0, ut = !1;
      switch (P) {
        case "^":
          if (p.length < 3)
            break;
          if (p[1] === "^") {
            if (this._previousMarker = "^^", p = p.substr(2), p[0] !== "<") {
              ut = !0;
              break;
            }
          } else {
            this._n3Mode && (tt = 1, M = "^");
            break;
          }
        case "<":
          if ($ = this._unescapedIri.exec(p))
            M = "IRI", z = $[1];
          else if ($ = this._iri.exec(p)) {
            if (z = this._unescape($[1]), z === null || Sf.test(z))
              return w(this);
            M = "IRI";
          } else p.length > 1 && p[1] === "<" ? (M = "<<", tt = 2) : this._n3Mode && p.length > 1 && p[1] === "=" && (tt = 2, this._isImpliedBy ? (M = "abbreviation", z = "<") : (M = "inverse", z = ">"));
          break;
        case ">":
          p.length > 1 && p[1] === ">" && (M = ">>", tt = 2);
          break;
        case "_":
          (($ = this._blank.exec(p)) || d && ($ = this._blank.exec(`${p} `))) && (M = "blank", j = "_", z = $[1]);
          break;
        case '"':
          if ($ = this._simpleQuotedString.exec(p))
            z = $[1];
          else if ({ value: z, matchLength: tt } = this._parseLiteral(p), z === null)
            return w(this);
          ($ !== null || tt !== 0) && (M = "literal", this._literalClosingPos = 0);
          break;
        case "'":
          if (!this._lineMode) {
            if ($ = this._simpleApostropheString.exec(p))
              z = $[1];
            else if ({ value: z, matchLength: tt } = this._parseLiteral(p), z === null)
              return w(this);
            ($ !== null || tt !== 0) && (M = "literal", this._literalClosingPos = 0);
          }
          break;
        case "?":
          this._n3Mode && ($ = this._variable.exec(p)) && (M = "var", z = $[0]);
          break;
        case "@":
          this._previousMarker === "literal" && ($ = this._langcode.exec(p)) ? (M = "langcode", z = $[1]) : ($ = this._keyword.exec(p)) && (M = $[0]);
          break;
        case ".":
          if (p.length === 1 ? d : p[1] < "0" || p[1] > "9") {
            M = ".", tt = 1;
            break;
          }
        case "0":
        case "1":
        case "2":
        case "3":
        case "4":
        case "5":
        case "6":
        case "7":
        case "8":
        case "9":
        case "+":
        case "-":
          ($ = this._number.exec(p) || d && ($ = this._number.exec(`${p} `))) && (M = "literal", z = $[0], j = typeof $[1] == "string" ? zs.double : typeof $[2] == "string" ? zs.decimal : zs.integer);
          break;
        case "B":
        case "b":
        case "p":
        case "P":
        case "G":
        case "g":
          ($ = this._sparqlKeyword.exec(p)) ? M = $[0].toUpperCase() : ut = !0;
          break;
        case "f":
        case "t":
          ($ = this._boolean.exec(p)) ? (M = "literal", z = $[0], j = zs.boolean) : ut = !0;
          break;
        case "a":
          ($ = this._shortPredicates.exec(p)) ? (M = "abbreviation", z = "a") : ut = !0;
          break;
        case "=":
          this._n3Mode && p.length > 1 && (M = "abbreviation", p[1] !== ">" ? (tt = 1, z = "=") : (tt = 2, z = ">"));
          break;
        case "!":
          if (!this._n3Mode)
            break;
        case ",":
        case ";":
        case "[":
        case "]":
        case "(":
        case ")":
        case "}":
          this._lineMode || (tt = 1, M = P);
          break;
        case "{":
          !this._lineMode && p.length >= 2 && (p[1] === "|" ? (M = "{|", tt = 2) : (M = P, tt = 1));
          break;
        case "|":
          p.length >= 2 && p[1] === "}" && (M = "|}", tt = 2);
          break;
        default:
          ut = !0;
      }
      if (ut && ((this._previousMarker === "@prefix" || this._previousMarker === "PREFIX") && ($ = this._prefix.exec(p)) ? (M = "prefix", z = $[1] || "") : (($ = this._prefixed.exec(p)) || d && ($ = this._prefixed.exec(`${p} `))) && (M = "prefixed", j = $[1] || "", z = this._unescape($[2]))), this._previousMarker === "^^")
        switch (M) {
          case "prefixed":
            M = "type";
            break;
          case "IRI":
            M = "typeIRI";
            break;
          default:
            M = "";
        }
      if (!M)
        return d || !/^'''|^"""/.test(p) && /\n|\r/.test(p) ? w(this) : this._input = p;
      const ft = tt || $[0].length, At = E(M, z, j, S, ft);
      this.previousToken = At, this._previousMarker = M, p = p.substr(ft, p.length);
    }
    function E(g, x, S, P, M) {
      const z = p ? b - p.length : b, j = z + M, $ = { type: g, value: x, prefix: S, line: P, start: z, end: j };
      return l(null, $), $;
    }
    function w(g) {
      l(g._syntaxError(/^\S*/.exec(p)[0]));
    }
  }
  // ### `_unescape` replaces N3 escape codes by their corresponding characters
  _unescape(l) {
    let d = !1;
    const p = l.replace(Af, (b, E, w, g) => {
      if (typeof E == "string")
        return String.fromCharCode(Number.parseInt(E, 16));
      if (typeof w == "string") {
        let x = Number.parseInt(w, 16);
        return x <= 65535 ? String.fromCharCode(Number.parseInt(w, 16)) : String.fromCharCode(55296 + ((x -= 65536) >> 10), 56320 + (x & 1023));
      }
      return g in Al ? Al[g] : (d = !0, "");
    });
    return d ? null : p;
  }
  // ### `_parseLiteral` parses a literal into an unescaped value
  _parseLiteral(l) {
    if (l.length >= 3) {
      const d = l.match(/^(?:"""|"|'''|'|)/)[0], p = d.length;
      let b = Math.max(this._literalClosingPos, p);
      for (; (b = l.indexOf(d, b)) > 0; ) {
        let E = 0;
        for (; l[b - E - 1] === "\\"; )
          E++;
        if (E % 2 === 0) {
          const w = l.substring(p, b), g = w.split(/\r\n|\r|\n/).length - 1, x = b + p;
          if (p === 1 && g !== 0 || p === 3 && this._lineMode)
            break;
          return this._line += g, { value: this._unescape(w), matchLength: x };
        }
        b++;
      }
      this._literalClosingPos = l.length - p + 1;
    }
    return { value: "", matchLength: 0 };
  }
  // ### `_syntaxError` creates a syntax error for the given issue
  _syntaxError(l) {
    this._input = null;
    const d = new Error(`Unexpected "${l}" on line ${this._line}.`);
    return d.context = {
      token: void 0,
      line: this._line,
      previousToken: this.previousToken
    }, d;
  }
  // ### Strips off any starting UTF BOM mark.
  _readStartingBom(l) {
    return l.startsWith("\uFEFF") ? l.substr(1) : l;
  }
  // ## Public methods
  // ### `tokenize` starts the transformation of an N3 document into an array of tokens.
  // The input can be a string or a stream.
  tokenize(l, d) {
    if (this._line = 1, typeof l == "string")
      if (this._input = this._readStartingBom(l), typeof d == "function")
        queueMicrotask(() => this._tokenizeToEnd(d, !0));
      else {
        const p = [];
        let b;
        if (this._tokenizeToEnd((E, w) => E ? b = E : p.push(w), !0), b) throw b;
        return p;
      }
    else
      this._pendingBuffer = null, typeof l.setEncoding == "function" && l.setEncoding("utf8"), l.on("data", (p) => {
        this._input !== null && p.length !== 0 && (this._pendingBuffer && (p = Kl.Buffer.concat([this._pendingBuffer, p]), this._pendingBuffer = null), p[p.length - 1] & 128 ? this._pendingBuffer = p : (typeof this._input > "u" ? this._input = this._readStartingBom(typeof p == "string" ? p : p.toString()) : this._input += p, this._tokenizeToEnd(d, !1)));
      }), l.on("end", () => {
        typeof this._input == "string" && this._tokenizeToEnd(d, !0);
      }), l.on("error", d);
  }
}
const { rdf: Of, xsd: Cr } = Oi;
let Oa, If = 0;
const Ff = {
  namedNode: Yl,
  blankNode: Ql,
  variable: eu,
  literal: tu,
  defaultGraph: jf,
  quad: Jo,
  triple: Jo,
  fromTerm: Ca,
  fromQuad: iu
};
class fn {
  constructor(l) {
    this.id = l;
  }
  // ### The value of this term
  get value() {
    return this.id;
  }
  // ### Returns whether this object represents the same term as the other
  equals(l) {
    return l instanceof fn ? this.id === l.id : !!l && this.termType === l.termType && this.value === l.value;
  }
  // ### Implement hashCode for Immutable.js, since we implement `equals`
  // https://immutable-js.com/docs/v4.0.0/ValueObject/#hashCode()
  hashCode() {
    return 0;
  }
  // ### Returns a plain object representation of this term
  toJSON() {
    return {
      termType: this.termType,
      value: this.value
    };
  }
}
class Jl extends fn {
  // ### The term type of this term
  get termType() {
    return "NamedNode";
  }
}
class Ea extends fn {
  // ### The term type of this term
  get termType() {
    return "Literal";
  }
  // ### The text value of this literal
  get value() {
    return this.id.substring(1, this.id.lastIndexOf('"'));
  }
  // ### The language of this literal
  get language() {
    const l = this.id;
    let d = l.lastIndexOf('"') + 1;
    return d < l.length && l[d++] === "@" ? l.substr(d).toLowerCase() : "";
  }
  // ### The datatype IRI of this literal
  get datatype() {
    return new Jl(this.datatypeString);
  }
  // ### The datatype string of this literal
  get datatypeString() {
    const l = this.id, d = l.lastIndexOf('"') + 1, p = d < l.length ? l[d] : "";
    return p === "^" ? l.substr(d + 2) : (
      // If "@" follows, return rdf:langString; xsd:string otherwise
      p !== "@" ? Cr.string : Of.langString
    );
  }
  // ### Returns whether this object represents the same term as the other
  equals(l) {
    return l instanceof Ea ? this.id === l.id : !!l && !!l.datatype && this.termType === l.termType && this.value === l.value && this.language === l.language && this.datatype.value === l.datatype.value;
  }
  toJSON() {
    return {
      termType: this.termType,
      value: this.value,
      language: this.language,
      datatype: { termType: "NamedNode", value: this.datatypeString }
    };
  }
}
class Rf extends fn {
  constructor(l) {
    super(`_:${l}`);
  }
  // ### The term type of this term
  get termType() {
    return "BlankNode";
  }
  // ### The name of this blank node
  get value() {
    return this.id.substr(2);
  }
}
class zf extends fn {
  constructor(l) {
    super(`?${l}`);
  }
  // ### The term type of this term
  get termType() {
    return "Variable";
  }
  // ### The name of this variable
  get value() {
    return this.id.substr(1);
  }
}
class Nf extends fn {
  constructor() {
    return super(""), Oa || this;
  }
  // ### The term type of this term
  get termType() {
    return "DefaultGraph";
  }
  // ### Returns whether this object represents the same term as the other
  equals(l) {
    return this === l || !!l && this.termType === l.termType;
  }
}
Oa = new Nf();
class Xl extends fn {
  constructor(l, d, p, b) {
    super(""), this._subject = l, this._predicate = d, this._object = p, this._graph = b || Oa;
  }
  // ### The term type of this term
  get termType() {
    return "Quad";
  }
  get subject() {
    return this._subject;
  }
  get predicate() {
    return this._predicate;
  }
  get object() {
    return this._object;
  }
  get graph() {
    return this._graph;
  }
  // ### Returns a plain object representation of this quad
  toJSON() {
    return {
      termType: this.termType,
      subject: this._subject.toJSON(),
      predicate: this._predicate.toJSON(),
      object: this._object.toJSON(),
      graph: this._graph.toJSON()
    };
  }
  // ### Returns whether this object represents the same quad as the other
  equals(l) {
    return !!l && this._subject.equals(l.subject) && this._predicate.equals(l.predicate) && this._object.equals(l.object) && this._graph.equals(l.graph);
  }
}
function Yl(u) {
  return new Jl(u);
}
function Ql(u) {
  return new Rf(u || `n3-${If++}`);
}
function tu(u, l) {
  if (typeof l == "string")
    return new Ea(`"${u}"@${l.toLowerCase()}`);
  let d = l ? l.value : "";
  return d === "" && (typeof u == "boolean" ? d = Cr.boolean : typeof u == "number" && (Number.isFinite(u) ? d = Number.isInteger(u) ? Cr.integer : Cr.double : (d = Cr.double, Number.isNaN(u) || (u = u > 0 ? "INF" : "-INF")))), d === "" || d === Cr.string ? new Ea(`"${u}"`) : new Ea(`"${u}"^^${d}`);
}
function eu(u) {
  return new zf(u);
}
function jf() {
  return Oa;
}
function Jo(u, l, d, p) {
  return new Xl(u, l, d, p);
}
function Ca(u) {
  if (u instanceof fn)
    return u;
  switch (u.termType) {
    case "NamedNode":
      return Yl(u.value);
    case "BlankNode":
      return Ql(u.value);
    case "Variable":
      return eu(u.value);
    case "DefaultGraph":
      return Oa;
    case "Literal":
      return tu(u.value, u.language || u.datatype);
    case "Quad":
      return iu(u);
    default:
      throw new Error(`Unexpected termType: ${u.termType}`);
  }
}
function iu(u) {
  if (u instanceof Xl)
    return u;
  if (u.termType !== "Quad")
    throw new Error(`Unexpected termType: ${u.termType}`);
  return Jo(Ca(u.subject), Ca(u.predicate), Ca(u.object), Ca(u.graph));
}
let Sl = 0;
class rl {
  constructor(l) {
    this._contextStack = [], this._graph = null, l = l || {}, this._setBase(l.baseIRI), l.factory && nu(this, l.factory);
    const d = typeof l.format == "string" ? l.format.match(/\w*$/)[0].toLowerCase() : "", p = /turtle/.test(d), b = /trig/.test(d), E = /triple/.test(d), w = /quad/.test(d), g = this._n3Mode = /n3/.test(d), x = E || w;
    (this._supportsNamedGraphs = !(p || g)) || (this._readPredicateOrNamedGraph = this._readPredicate), this._supportsQuads = !(p || b || E || g), this._isImpliedBy = l.isImpliedBy, this._supportsRDFStar = d === "" || /star|\*$/.test(d), x && (this._resolveRelativeIRI = (S) => null), this._blankNodePrefix = typeof l.blankNodePrefix != "string" ? "" : l.blankNodePrefix.replace(/^(?!_:)/, "_:"), this._lexer = l.lexer || new Df({ lineMode: x, n3: g, isImpliedBy: this._isImpliedBy }), this._explicitQuantifiers = !!l.explicitQuantifiers;
  }
  // ## Static class methods
  // ### `_resetBlankNodePrefix` restarts blank node prefix identification
  static _resetBlankNodePrefix() {
    Sl = 0;
  }
  // ## Private methods
  // ### `_setBase` sets the base IRI to resolve relative IRIs
  _setBase(l) {
    if (!l)
      this._base = "", this._basePath = "";
    else {
      const d = l.indexOf("#");
      d >= 0 && (l = l.substr(0, d)), this._base = l, this._basePath = l.indexOf("/") < 0 ? l : l.replace(/[^\/?]*(?:\?.*)?$/, ""), l = l.match(/^(?:([a-z][a-z0-9+.-]*:))?(?:\/\/[^\/]*)?/i), this._baseRoot = l[0], this._baseScheme = l[1];
    }
  }
  // ### `_saveContext` stores the current parsing context
  // when entering a new scope (list, blank node, formula)
  _saveContext(l, d, p, b, E) {
    const w = this._n3Mode;
    this._contextStack.push({
      type: l,
      subject: p,
      predicate: b,
      object: E,
      graph: d,
      inverse: w ? this._inversePredicate : !1,
      blankPrefix: w ? this._prefixes._ : "",
      quantified: w ? this._quantified : null
    }), w && (this._inversePredicate = !1, this._prefixes._ = this._graph ? `${this._graph.value}.` : ".", this._quantified = Object.create(this._quantified));
  }
  // ### `_restoreContext` restores the parent context
  // when leaving a scope (list, blank node, formula)
  _restoreContext(l, d) {
    const p = this._contextStack.pop();
    if (!p || p.type !== l)
      return this._error(`Unexpected ${d.type}`, d);
    this._subject = p.subject, this._predicate = p.predicate, this._object = p.object, this._graph = p.graph, this._n3Mode && (this._inversePredicate = p.inverse, this._prefixes._ = p.blankPrefix, this._quantified = p.quantified);
  }
  // ### `_readInTopContext` reads a token when in the top context
  _readInTopContext(l) {
    switch (l.type) {
      case "eof":
        return this._graph !== null ? this._error("Unclosed graph", l) : (delete this._prefixes._, this._callback(null, null, this._prefixes));
      case "PREFIX":
        this._sparqlStyle = !0;
      case "@prefix":
        return this._readPrefix;
      case "BASE":
        this._sparqlStyle = !0;
      case "@base":
        return this._readBaseIRI;
      case "{":
        if (this._supportsNamedGraphs)
          return this._graph = "", this._subject = null, this._readSubject;
      case "GRAPH":
        if (this._supportsNamedGraphs)
          return this._readNamedGraphLabel;
      default:
        return this._readSubject(l);
    }
  }
  // ### `_readEntity` reads an IRI, prefixed name, blank node, or variable
  _readEntity(l, d) {
    let p;
    switch (l.type) {
      case "IRI":
      case "typeIRI":
        const b = this._resolveIRI(l.value);
        if (b === null)
          return this._error("Invalid IRI", l);
        p = this._factory.namedNode(b);
        break;
      case "type":
      case "prefixed":
        const E = this._prefixes[l.prefix];
        if (E === void 0)
          return this._error(`Undefined prefix "${l.prefix}:"`, l);
        p = this._factory.namedNode(E + l.value);
        break;
      case "blank":
        p = this._factory.blankNode(this._prefixes[l.prefix] + l.value);
        break;
      case "var":
        p = this._factory.variable(l.value.substr(1));
        break;
      default:
        return this._error(`Expected entity but got ${l.type}`, l);
    }
    return !d && this._n3Mode && p.id in this._quantified && (p = this._quantified[p.id]), p;
  }
  // ### `_readSubject` reads a quad's subject
  _readSubject(l) {
    switch (this._predicate = null, l.type) {
      case "[":
        return this._saveContext(
          "blank",
          this._graph,
          this._subject = this._factory.blankNode(),
          null,
          null
        ), this._readBlankNodeHead;
      case "(":
        return this._saveContext("list", this._graph, this.RDF_NIL, null, null), this._subject = null, this._readListItem;
      case "{":
        return this._n3Mode ? (this._saveContext(
          "formula",
          this._graph,
          this._graph = this._factory.blankNode(),
          null,
          null
        ), this._readSubject) : this._error("Unexpected graph", l);
      case "}":
        return this._readPunctuation(l);
      case "@forSome":
        return this._n3Mode ? (this._subject = null, this._predicate = this.N3_FORSOME, this._quantifier = "blankNode", this._readQuantifierList) : this._error('Unexpected "@forSome"', l);
      case "@forAll":
        return this._n3Mode ? (this._subject = null, this._predicate = this.N3_FORALL, this._quantifier = "variable", this._readQuantifierList) : this._error('Unexpected "@forAll"', l);
      case "literal":
        if (!this._n3Mode)
          return this._error("Unexpected literal", l);
        if (l.prefix.length === 0)
          return this._literalValue = l.value, this._completeSubjectLiteral;
        this._subject = this._factory.literal(l.value, this._factory.namedNode(l.prefix));
        break;
      case "<<":
        return this._supportsRDFStar ? (this._saveContext("<<", this._graph, null, null, null), this._graph = null, this._readSubject) : this._error("Unexpected RDF-star syntax", l);
      default:
        if ((this._subject = this._readEntity(l)) === void 0)
          return;
        if (this._n3Mode)
          return this._getPathReader(this._readPredicateOrNamedGraph);
    }
    return this._readPredicateOrNamedGraph;
  }
  // ### `_readPredicate` reads a quad's predicate
  _readPredicate(l) {
    const d = l.type;
    switch (d) {
      case "inverse":
        this._inversePredicate = !0;
      case "abbreviation":
        this._predicate = this.ABBREVIATIONS[l.value];
        break;
      case ".":
      case "]":
      case "}":
        return this._predicate === null ? this._error(`Unexpected ${d}`, l) : (this._subject = null, d === "]" ? this._readBlankNodeTail(l) : this._readPunctuation(l));
      case ";":
        return this._predicate !== null ? this._readPredicate : this._error("Expected predicate but got ;", l);
      case "[":
        if (this._n3Mode)
          return this._saveContext(
            "blank",
            this._graph,
            this._subject,
            this._subject = this._factory.blankNode(),
            null
          ), this._readBlankNodeHead;
      case "blank":
        if (!this._n3Mode)
          return this._error("Disallowed blank node as predicate", l);
      default:
        if ((this._predicate = this._readEntity(l)) === void 0)
          return;
    }
    return this._readObject;
  }
  // ### `_readObject` reads a quad's object
  _readObject(l) {
    switch (l.type) {
      case "literal":
        if (l.prefix.length === 0)
          return this._literalValue = l.value, this._readDataTypeOrLang;
        this._object = this._factory.literal(l.value, this._factory.namedNode(l.prefix));
        break;
      case "[":
        return this._saveContext(
          "blank",
          this._graph,
          this._subject,
          this._predicate,
          this._subject = this._factory.blankNode()
        ), this._readBlankNodeHead;
      case "(":
        return this._saveContext("list", this._graph, this._subject, this._predicate, this.RDF_NIL), this._subject = null, this._readListItem;
      case "{":
        return this._n3Mode ? (this._saveContext(
          "formula",
          this._graph,
          this._subject,
          this._predicate,
          this._graph = this._factory.blankNode()
        ), this._readSubject) : this._error("Unexpected graph", l);
      case "<<":
        return this._supportsRDFStar ? (this._saveContext("<<", this._graph, this._subject, this._predicate, null), this._graph = null, this._readSubject) : this._error("Unexpected RDF-star syntax", l);
      default:
        if ((this._object = this._readEntity(l)) === void 0)
          return;
        if (this._n3Mode)
          return this._getPathReader(this._getContextEndReader());
    }
    return this._getContextEndReader();
  }
  // ### `_readPredicateOrNamedGraph` reads a quad's predicate, or a named graph
  _readPredicateOrNamedGraph(l) {
    return l.type === "{" ? this._readGraph(l) : this._readPredicate(l);
  }
  // ### `_readGraph` reads a graph
  _readGraph(l) {
    return l.type !== "{" ? this._error(`Expected graph but got ${l.type}`, l) : (this._graph = this._subject, this._subject = null, this._readSubject);
  }
  // ### `_readBlankNodeHead` reads the head of a blank node
  _readBlankNodeHead(l) {
    return l.type === "]" ? (this._subject = null, this._readBlankNodeTail(l)) : (this._predicate = null, this._readPredicate(l));
  }
  // ### `_readBlankNodeTail` reads the end of a blank node
  _readBlankNodeTail(l) {
    if (l.type !== "]")
      return this._readBlankNodePunctuation(l);
    this._subject !== null && this._emit(this._subject, this._predicate, this._object, this._graph);
    const d = this._predicate === null;
    return this._restoreContext("blank", l), this._object !== null ? this._getContextEndReader() : this._predicate !== null ? this._readObject : d ? this._readPredicateOrNamedGraph : this._readPredicateAfterBlank;
  }
  // ### `_readPredicateAfterBlank` reads a predicate after an anonymous blank node
  _readPredicateAfterBlank(l) {
    switch (l.type) {
      case ".":
      case "}":
        return this._subject = null, this._readPunctuation(l);
      default:
        return this._readPredicate(l);
    }
  }
  // ### `_readListItem` reads items from a list
  _readListItem(l) {
    let d = null, p = null, b = this._readListItem;
    const E = this._subject, w = this._contextStack, g = w[w.length - 1];
    switch (l.type) {
      case "[":
        this._saveContext(
          "blank",
          this._graph,
          p = this._factory.blankNode(),
          this.RDF_FIRST,
          this._subject = d = this._factory.blankNode()
        ), b = this._readBlankNodeHead;
        break;
      case "(":
        this._saveContext(
          "list",
          this._graph,
          p = this._factory.blankNode(),
          this.RDF_FIRST,
          this.RDF_NIL
        ), this._subject = null;
        break;
      case ")":
        if (this._restoreContext("list", l), w.length !== 0 && w[w.length - 1].type === "list" && this._emit(this._subject, this._predicate, this._object, this._graph), this._predicate === null) {
          if (b = this._readPredicate, this._subject === this.RDF_NIL)
            return b;
        } else if (b = this._getContextEndReader(), this._object === this.RDF_NIL)
          return b;
        p = this.RDF_NIL;
        break;
      case "literal":
        l.prefix.length === 0 ? (this._literalValue = l.value, b = this._readListItemDataTypeOrLang) : (d = this._factory.literal(l.value, this._factory.namedNode(l.prefix)), b = this._getContextEndReader());
        break;
      case "{":
        return this._n3Mode ? (this._saveContext(
          "formula",
          this._graph,
          this._subject,
          this._predicate,
          this._graph = this._factory.blankNode()
        ), this._readSubject) : this._error("Unexpected graph", l);
      default:
        if ((d = this._readEntity(l)) === void 0)
          return;
    }
    if (p === null && (this._subject = p = this._factory.blankNode()), E === null ? g.predicate === null ? g.subject = p : g.object = p : this._emit(E, this.RDF_REST, p, this._graph), d !== null) {
      if (this._n3Mode && (l.type === "IRI" || l.type === "prefixed"))
        return this._saveContext("item", this._graph, p, this.RDF_FIRST, d), this._subject = d, this._predicate = null, this._getPathReader(this._readListItem);
      this._emit(p, this.RDF_FIRST, d, this._graph);
    }
    return b;
  }
  // ### `_readDataTypeOrLang` reads an _optional_ datatype or language
  _readDataTypeOrLang(l) {
    return this._completeObjectLiteral(l, !1);
  }
  // ### `_readListItemDataTypeOrLang` reads an _optional_ datatype or language in a list
  _readListItemDataTypeOrLang(l) {
    return this._completeObjectLiteral(l, !0);
  }
  // ### `_completeLiteral` completes a literal with an optional datatype or language
  _completeLiteral(l) {
    let d = this._factory.literal(this._literalValue);
    switch (l.type) {
      case "type":
      case "typeIRI":
        const p = this._readEntity(l);
        if (p === void 0) return;
        d = this._factory.literal(this._literalValue, p), l = null;
        break;
      case "langcode":
        d = this._factory.literal(this._literalValue, l.value), l = null;
        break;
    }
    return { token: l, literal: d };
  }
  // Completes a literal in subject position
  _completeSubjectLiteral(l) {
    return this._subject = this._completeLiteral(l).literal, this._readPredicateOrNamedGraph;
  }
  // Completes a literal in object position
  _completeObjectLiteral(l, d) {
    const p = this._completeLiteral(l);
    if (p)
      return this._object = p.literal, d && this._emit(this._subject, this.RDF_FIRST, this._object, this._graph), p.token === null ? this._getContextEndReader() : (this._readCallback = this._getContextEndReader(), this._readCallback(p.token));
  }
  // ### `_readFormulaTail` reads the end of a formula
  _readFormulaTail(l) {
    return l.type !== "}" ? this._readPunctuation(l) : (this._subject !== null && this._emit(this._subject, this._predicate, this._object, this._graph), this._restoreContext("formula", l), this._object === null ? this._readPredicate : this._getContextEndReader());
  }
  // ### `_readPunctuation` reads punctuation between quads or quad parts
  _readPunctuation(l) {
    let d, p = this._graph;
    const b = this._subject, E = this._inversePredicate;
    switch (l.type) {
      case "}":
        if (this._graph === null)
          return this._error("Unexpected graph closing", l);
        if (this._n3Mode)
          return this._readFormulaTail(l);
        this._graph = null;
      case ".":
        this._subject = null, d = this._contextStack.length ? this._readSubject : this._readInTopContext, E && (this._inversePredicate = !1);
        break;
      case ";":
        d = this._readPredicate;
        break;
      case ",":
        d = this._readObject;
        break;
      case "{|":
        if (!this._supportsRDFStar)
          return this._error("Unexpected RDF-star syntax", l);
        const w = this._predicate, g = this._object;
        this._subject = this._factory.quad(b, w, g, this.DEFAULTGRAPH), d = this._readPredicate;
        break;
      case "|}":
        if (this._subject.termType !== "Quad")
          return this._error("Unexpected asserted triple closing", l);
        this._subject = null, d = this._readPunctuation;
        break;
      default:
        if (this._supportsQuads && this._graph === null && (p = this._readEntity(l)) !== void 0) {
          d = this._readQuadPunctuation;
          break;
        }
        return this._error(`Expected punctuation to follow "${this._object.id}"`, l);
    }
    if (b !== null) {
      const w = this._predicate, g = this._object;
      E ? this._emit(g, w, b, p) : this._emit(b, w, g, p);
    }
    return d;
  }
  // ### `_readBlankNodePunctuation` reads punctuation in a blank node
  _readBlankNodePunctuation(l) {
    let d;
    switch (l.type) {
      case ";":
        d = this._readPredicate;
        break;
      case ",":
        d = this._readObject;
        break;
      default:
        return this._error(`Expected punctuation to follow "${this._object.id}"`, l);
    }
    return this._emit(this._subject, this._predicate, this._object, this._graph), d;
  }
  // ### `_readQuadPunctuation` reads punctuation after a quad
  _readQuadPunctuation(l) {
    return l.type !== "." ? this._error("Expected dot to follow quad", l) : this._readInTopContext;
  }
  // ### `_readPrefix` reads the prefix of a prefix declaration
  _readPrefix(l) {
    return l.type !== "prefix" ? this._error("Expected prefix to follow @prefix", l) : (this._prefix = l.value, this._readPrefixIRI);
  }
  // ### `_readPrefixIRI` reads the IRI of a prefix declaration
  _readPrefixIRI(l) {
    if (l.type !== "IRI")
      return this._error(`Expected IRI to follow prefix "${this._prefix}:"`, l);
    const d = this._readEntity(l);
    return this._prefixes[this._prefix] = d.value, this._prefixCallback(this._prefix, d), this._readDeclarationPunctuation;
  }
  // ### `_readBaseIRI` reads the IRI of a base declaration
  _readBaseIRI(l) {
    const d = l.type === "IRI" && this._resolveIRI(l.value);
    return d ? (this._setBase(d), this._readDeclarationPunctuation) : this._error("Expected valid IRI to follow base declaration", l);
  }
  // ### `_readNamedGraphLabel` reads the label of a named graph
  _readNamedGraphLabel(l) {
    switch (l.type) {
      case "IRI":
      case "blank":
      case "prefixed":
        return this._readSubject(l), this._readGraph;
      case "[":
        return this._readNamedGraphBlankLabel;
      default:
        return this._error("Invalid graph label", l);
    }
  }
  // ### `_readNamedGraphLabel` reads a blank node label of a named graph
  _readNamedGraphBlankLabel(l) {
    return l.type !== "]" ? this._error("Invalid graph label", l) : (this._subject = this._factory.blankNode(), this._readGraph);
  }
  // ### `_readDeclarationPunctuation` reads the punctuation of a declaration
  _readDeclarationPunctuation(l) {
    return this._sparqlStyle ? (this._sparqlStyle = !1, this._readInTopContext(l)) : l.type !== "." ? this._error("Expected declaration to end with a dot", l) : this._readInTopContext;
  }
  // Reads a list of quantified symbols from a @forSome or @forAll statement
  _readQuantifierList(l) {
    let d;
    switch (l.type) {
      case "IRI":
      case "prefixed":
        if ((d = this._readEntity(l, !0)) !== void 0)
          break;
      default:
        return this._error(`Unexpected ${l.type}`, l);
    }
    return this._explicitQuantifiers ? (this._subject === null ? this._emit(
      this._graph || this.DEFAULTGRAPH,
      this._predicate,
      this._subject = this._factory.blankNode(),
      this.QUANTIFIERS_GRAPH
    ) : this._emit(
      this._subject,
      this.RDF_REST,
      this._subject = this._factory.blankNode(),
      this.QUANTIFIERS_GRAPH
    ), this._emit(this._subject, this.RDF_FIRST, d, this.QUANTIFIERS_GRAPH)) : this._quantified[d.id] = this._factory[this._quantifier](this._factory.blankNode().value), this._readQuantifierPunctuation;
  }
  // Reads punctuation from a @forSome or @forAll statement
  _readQuantifierPunctuation(l) {
    return l.type === "," ? this._readQuantifierList : (this._explicitQuantifiers && (this._emit(this._subject, this.RDF_REST, this.RDF_NIL, this.QUANTIFIERS_GRAPH), this._subject = null), this._readCallback = this._getContextEndReader(), this._readCallback(l));
  }
  // ### `_getPathReader` reads a potential path and then resumes with the given function
  _getPathReader(l) {
    return this._afterPath = l, this._readPath;
  }
  // ### `_readPath` reads a potential path
  _readPath(l) {
    switch (l.type) {
      case "!":
        return this._readForwardPath;
      case "^":
        return this._readBackwardPath;
      default:
        const d = this._contextStack, p = d.length && d[d.length - 1];
        if (p && p.type === "item") {
          const b = this._subject;
          this._restoreContext("item", l), this._emit(this._subject, this.RDF_FIRST, b, this._graph);
        }
        return this._afterPath(l);
    }
  }
  // ### `_readForwardPath` reads a '!' path
  _readForwardPath(l) {
    let d, p;
    const b = this._factory.blankNode();
    if ((p = this._readEntity(l)) !== void 0)
      return this._predicate === null ? (d = this._subject, this._subject = b) : (d = this._object, this._object = b), this._emit(d, p, b, this._graph), this._readPath;
  }
  // ### `_readBackwardPath` reads a '^' path
  _readBackwardPath(l) {
    const d = this._factory.blankNode();
    let p, b;
    if ((p = this._readEntity(l)) !== void 0)
      return this._predicate === null ? (b = this._subject, this._subject = d) : (b = this._object, this._object = d), this._emit(d, p, b, this._graph), this._readPath;
  }
  // ### `_readRDFStarTailOrGraph` reads the graph of a nested RDF-star quad or the end of a nested RDF-star triple
  _readRDFStarTailOrGraph(l) {
    return l.type !== ">>" ? this._supportsQuads && this._graph === null && (this._graph = this._readEntity(l)) !== void 0 ? this._readRDFStarTail : this._error(`Expected >> to follow "${this._object.id}"`, l) : this._readRDFStarTail(l);
  }
  // ### `_readRDFStarTail` reads the end of a nested RDF-star triple
  _readRDFStarTail(l) {
    if (l.type !== ">>")
      return this._error(`Expected >> but got ${l.type}`, l);
    const d = this._factory.quad(
      this._subject,
      this._predicate,
      this._object,
      this._graph || this.DEFAULTGRAPH
    );
    return this._restoreContext("<<", l), this._subject === null ? (this._subject = d, this._readPredicate) : (this._object = d, this._getContextEndReader());
  }
  // ### `_getContextEndReader` gets the next reader function at the end of a context
  _getContextEndReader() {
    const l = this._contextStack;
    if (!l.length)
      return this._readPunctuation;
    switch (l[l.length - 1].type) {
      case "blank":
        return this._readBlankNodeTail;
      case "list":
        return this._readListItem;
      case "formula":
        return this._readFormulaTail;
      case "<<":
        return this._readRDFStarTailOrGraph;
    }
  }
  // ### `_emit` sends a quad through the callback
  _emit(l, d, p, b) {
    this._callback(null, this._factory.quad(l, d, p, b || this.DEFAULTGRAPH));
  }
  // ### `_error` emits an error message through the callback
  _error(l, d) {
    const p = new Error(`${l} on line ${d.line}.`);
    p.context = {
      token: d,
      line: d.line,
      previousToken: this._lexer.previousToken
    }, this._callback(p), this._callback = Ns;
  }
  // ### `_resolveIRI` resolves an IRI against the base path
  _resolveIRI(l) {
    return /^[a-z][a-z0-9+.-]*:/i.test(l) ? l : this._resolveRelativeIRI(l);
  }
  // ### `_resolveRelativeIRI` resolves an IRI against the base path,
  // assuming that a base path has been set and that the IRI is indeed relative
  _resolveRelativeIRI(l) {
    if (!l.length)
      return this._base;
    switch (l[0]) {
      case "#":
        return this._base + l;
      case "?":
        return this._base.replace(/(?:\?.*)?$/, l);
      case "/":
        return (l[1] === "/" ? this._baseScheme : this._baseRoot) + this._removeDotSegments(l);
      default:
        return /^[^/:]*:/.test(l) ? null : this._removeDotSegments(this._basePath + l);
    }
  }
  // ### `_removeDotSegments` resolves './' and '../' path segments in an IRI as per RFC3986
  _removeDotSegments(l) {
    if (!/(^|\/)\.\.?($|[/#?])/.test(l))
      return l;
    const d = l.length;
    let p = "", b = -1, E = -1, w = 0, g = "/";
    for (; b < d; ) {
      switch (g) {
        case ":":
          if (E < 0 && l[++b] === "/" && l[++b] === "/")
            for (; (E = b + 1) < d && l[E] !== "/"; )
              b = E;
          break;
        case "?":
        case "#":
          b = d;
          break;
        case "/":
          if (l[b + 1] === ".")
            switch (g = l[++b + 1], g) {
              case "/":
                p += l.substring(w, b - 1), w = b + 1;
                break;
              case void 0:
              case "?":
              case "#":
                return p + l.substring(w, b) + l.substr(b + 1);
              case ".":
                if (g = l[++b + 1], g === void 0 || g === "/" || g === "?" || g === "#") {
                  if (p += l.substring(w, b - 2), (w = p.lastIndexOf("/")) >= E && (p = p.substr(0, w)), g !== "/")
                    return `${p}/${l.substr(b + 1)}`;
                  w = b + 1;
                }
            }
      }
      g = l[++b];
    }
    return p + l.substring(w);
  }
  // ## Public methods
  // ### `parse` parses the N3 input and emits each parsed quad through the onQuad callback.
  parse(l, d, p) {
    let b, E, w;
    if (d && (d.onQuad || d.onPrefix || d.onComment) ? (b = d.onQuad, E = d.onPrefix, w = d.onComment) : (b = d, E = p), this._readCallback = this._readInTopContext, this._sparqlStyle = !1, this._prefixes = /* @__PURE__ */ Object.create(null), this._prefixes._ = this._blankNodePrefix ? this._blankNodePrefix.substr(2) : `b${Sl++}_`, this._prefixCallback = E || Ns, this._inversePredicate = !1, this._quantified = /* @__PURE__ */ Object.create(null), !b) {
      const x = [];
      let S;
      if (this._callback = (P, M) => {
        P ? S = P : M && x.push(M);
      }, this._lexer.tokenize(l).every((P) => this._readCallback = this._readCallback(P)), S) throw S;
      return x;
    }
    let g = (x, S) => {
      x !== null ? (this._callback(x), this._callback = Ns) : this._readCallback && (this._readCallback = this._readCallback(S));
    };
    w && (this._lexer.comments = !0, g = (x, S) => {
      x !== null ? (this._callback(x), this._callback = Ns) : this._readCallback && (S.type === "comment" ? w(S.value) : this._readCallback = this._readCallback(S));
    }), this._callback = b, this._lexer.tokenize(l, g);
  }
}
function Ns() {
}
function nu(u, l) {
  u._factory = l, u.DEFAULTGRAPH = l.defaultGraph(), u.RDF_FIRST = l.namedNode(Oi.rdf.first), u.RDF_REST = l.namedNode(Oi.rdf.rest), u.RDF_NIL = l.namedNode(Oi.rdf.nil), u.N3_FORALL = l.namedNode(Oi.r.forAll), u.N3_FORSOME = l.namedNode(Oi.r.forSome), u.ABBREVIATIONS = {
    a: l.namedNode(Oi.rdf.type),
    "=": l.namedNode(Oi.owl.sameAs),
    ">": l.namedNode(Oi.log.implies),
    "<": l.namedNode(Oi.log.isImpliedBy)
  }, u.QUANTIFIERS_GRAPH = l.namedNode("urn:n3:quantifiers");
}
nu(rl.prototype, Ff);
async function ru(u) {
  const l = new rl(), d = await new Promise((b, E) => {
    const w = [];
    l.parse(u, (g, x) => {
      if (g) return E(g);
      x ? w.push(x) : b(w);
    });
  }), p = /* @__PURE__ */ new Map();
  for (const b of d) {
    const E = b.subject.value;
    p.has(E) || p.set(E, []), p.get(E).push({ p: b.predicate.value, o: b.object });
  }
  return p;
}
const au = {
  "http://purl.org/dc/terms/": "dct:",
  "http://www.w3.org/ns/dcat#": "dcat:",
  "http://xmlns.com/foaf/0.1/": "foaf:",
  "http://www.w3.org/2004/02/skos/core#": "skos:",
  "http://www.w3.org/2006/vcard/ns#": "vcard:",
  "http://www.w3.org/ns/locn#": "locn:",
  "http://www.w3.org/2006/time#": "time:",
  "http://www.opengis.net/ont/geosparql#": "geo:",
  "http://www.w3.org/ns/adms#": "adms:",
  "http://www.w3.org/ns/prov#": "prov:",
  "http://purl.org/dc/elements/1.1/": "dc:",
  "http://dcat-ap.at/dev/dmp/": "dcatapatdmp:"
};
function Ta(u) {
  for (const [l, d] of Object.entries(au))
    if (u.startsWith(l)) return d + u.slice(l.length);
  return u.split(/[#/]/).at(-1) || u;
}
function Pl(u) {
  const l = u.indexOf(":");
  if (l === -1) return u;
  const d = u.slice(0, l + 1);
  for (const [p, b] of Object.entries(au))
    if (b === d) return p + u.slice(l + 1);
  return u;
}
function Zo(u) {
  return typeof u == "string" && /^https?:\/\/|^urn:|^mailto:/.test(u);
}
function Vf(u) {
  return typeof u == "string" && /^\d{4}-\d{2}-\d{2}/.test(u);
}
const qe = "http://www.w3.org/ns/shacl#", $f = "http://www.w3.org/1999/02/22-rdf-syntax-ns#", qo = "http://www.w3.org/2001/XMLSchema#", Uf = "http://www.w3.org/ns/dcat#", Gf = `${qe}Violation`, Zf = `${qe}Warning`, qf = `${qe}Info`;
class Hf {
  /**
   * @param {string}  ttlContent   Raw Turtle content of the SHACL shapes file
   * @param {object}  formData     Current form data keyed by compact field IRI
   * @param {object}  config       Resolved form config (groups, fields)
   * @returns {{ valid: boolean, violations: object[] }}
   */
  async validate(l, d, p) {
    var S, P;
    const b = await ru(l), E = Jf(b), w = Object.values(E).find(
      (M) => M.targetClass === `${Uf}Dataset`
    );
    if (!w) return { valid: !0, violations: [] };
    const g = [];
    for (const M of w.properties) {
      const z = Ta(M.path), j = d == null ? void 0 : d[z], $ = ((P = (S = p == null ? void 0 : p.fields) == null ? void 0 : S[z]) == null ? void 0 : P.label) || { en: z, de: z }, tt = Wf(z, p), ut = { fieldId: z, fieldLabel: $, groupId: tt, shapeRef: M.shapeRef };
      if (M.minCount > 0 && va(j) < M.minCount) {
        g.push(hn(
          ut,
          M.severity,
          "minCount",
          `Pflichtfeld (sh:minCount ${M.minCount}) — kein Wert angegeben.`,
          `Required field (sh:minCount ${M.minCount}) — no value provided.`
        ));
        continue;
      }
      if (va(j) !== 0) {
        if (M.maxCount !== null && va(j) > M.maxCount && g.push(hn(
          ut,
          M.severity,
          "maxCount",
          `Zu viele Werte (sh:maxCount ${M.maxCount}, vorhanden: ${va(j)}).`,
          `Too many values (sh:maxCount ${M.maxCount}, found: ${va(j)}).`
        )), M.nodeKind === `${qe}IRI`) {
          const ft = Kn(j).filter((At) => !Zo(At));
          ft.length && g.push(hn(
            ut,
            M.severity,
            "nodeKind",
            `Wert muss eine URI sein (sh:nodeKind sh:IRI). Ungültig: ${ft.slice(0, 2).join(", ")}`,
            `Value must be a URI (sh:nodeKind sh:IRI). Invalid: ${ft.slice(0, 2).join(", ")}`
          ));
        } else M.nodeKind === `${qe}Literal` && Kn(j).filter((At) => Zo(At)).length && g.push(hn(
          ut,
          M.severity,
          "nodeKind",
          "Wert darf keine URI sein (sh:nodeKind sh:Literal).",
          "Value must not be a URI (sh:nodeKind sh:Literal)."
        ));
        if (M.datatype === `${qo}anyURI`)
          Kn(j).filter((At) => !Zo(At)).length && g.push(hn(
            ut,
            M.severity,
            "datatype",
            "Wert muss eine gültige URI sein (xsd:anyURI).",
            "Value must be a valid URI (xsd:anyURI)."
          ));
        else if (M.datatype === `${qo}date` || M.datatype === `${qo}dateTime`) {
          const ft = Kn(j).filter((At) => !Vf(At));
          ft.length && g.push(hn(
            ut,
            M.severity,
            "datatype",
            `Wert muss ein gültiges Datum sein (xsd:date). Ungültig: ${ft[0]}`,
            `Value must be a valid date (xsd:date). Invalid: ${ft[0]}`
          ));
        }
        if (M.pattern) {
          let ft;
          try {
            ft = new RegExp(M.pattern);
          } catch {
          }
          ft && Kn(j).filter((Rt) => !ft.test(Rt)).length && g.push(hn(
            ut,
            M.severity,
            "pattern",
            `Wert entspricht nicht dem Muster (sh:pattern ${M.pattern}).`,
            `Value does not match pattern (sh:pattern ${M.pattern}).`
          ));
        }
        M.minLength !== null && Kn(j).filter((At) => At.length < M.minLength).length && g.push(hn(
          ut,
          M.severity,
          "minLength",
          `Wert zu kurz — Minimum ${M.minLength} Zeichen (sh:minLength).`,
          `Value too short — minimum ${M.minLength} characters (sh:minLength).`
        )), M.maxLength !== null && Kn(j).filter((At) => At.length > M.maxLength).length && g.push(hn(
          ut,
          M.severity,
          "maxLength",
          `Wert zu lang — Maximum ${M.maxLength} Zeichen (sh:maxLength).`,
          `Value too long — maximum ${M.maxLength} characters (sh:maxLength).`
        ));
      }
    }
    const x = { violation: 0, warning: 1, info: 2 };
    return g.sort((M, z) => x[M.severity] - x[z.severity]), {
      valid: g.every((M) => M.severity !== "violation"),
      violations: g
    };
  }
}
function hn(u, l, d, p, b) {
  return {
    fieldId: u.fieldId,
    fieldLabel: u.fieldLabel,
    groupId: u.groupId,
    shapeRef: u.shapeRef,
    severity: Kf(l),
    constraint: d,
    messageDe: p,
    messageEn: b
  };
}
function Kf(u) {
  return u === Zf ? "warning" : u === qf ? "info" : "violation";
}
function va(u) {
  return u == null || u === "" ? 0 : Array.isArray(u) ? u.filter((l) => l ? typeof l == "object" && "value" in l ? !!l.value : typeof l == "object" ? Object.values(l).some((d) => d) : String(l).trim() !== "" : !1).length : typeof u == "object" ? Object.values(u).some((l) => l && String(l).trim()) ? 1 : 0 : String(u).trim() ? 1 : 0;
}
function Kn(u) {
  return u == null || u === "" ? [] : Array.isArray(u) ? u.flatMap((l) => l ? typeof l == "object" && "value" in l ? l.value ? [l.value] : [] : typeof l == "object" ? Object.values(l).filter((d) => typeof d == "string" && d) : [String(l)] : []) : typeof u == "object" ? Object.values(u).filter((l) => typeof l == "string" && l) : [String(u)];
}
function Wf(u, l) {
  var d;
  if (!(l != null && l.groups)) return null;
  for (const p of l.groups)
    if ((d = p.fields) != null && d.includes(u)) return p.id;
  return null;
}
function Jf(u) {
  var d;
  const l = {};
  for (const [p, b] of u.entries()) {
    if (!b.filter((S) => S.p === `${$f}type`).map((S) => S.o.value).includes(`${qe}NodeShape`)) continue;
    const w = (d = b.find((S) => S.p === `${qe}targetClass`)) == null ? void 0 : d.o.value, x = b.filter((S) => S.p === `${qe}property`).map((S) => S.o.value).map((S) => Xf(S, u)).filter(Boolean);
    l[p] = { subject: p, targetClass: w, properties: x };
  }
  return l;
}
function Xf(u, l) {
  const d = l.get(u) || [], p = d.find((w) => w.p === `${qe}path`);
  if (!p) return null;
  const b = (w) => {
    var g;
    return ((g = d.find((x) => x.p === w)) == null ? void 0 : g.o.value) ?? null;
  }, E = (w) => {
    const g = b(w);
    return g !== null ? parseInt(g) : null;
  };
  return {
    path: p.o.value,
    shapeRef: u,
    minCount: E(`${qe}minCount`) ?? 0,
    maxCount: E(`${qe}maxCount`),
    nodeKind: b(`${qe}nodeKind`),
    datatype: b(`${qe}datatype`),
    severity: b(`${qe}severity`) ?? Gf,
    pattern: b(`${qe}pattern`),
    minLength: E(`${qe}minLength`),
    maxLength: E(`${qe}maxLength`)
  };
}
const Yf = { class: "step-indicator" }, Qf = ["aria-label", "aria-current", "onClick"], tp = { class: "step-label" }, ep = { class: "step-label" }, ip = {
  key: 0,
  class: "progress-bar-wrap"
}, np = ["aria-valuenow", "aria-label"], rp = {
  class: "progress-label",
  "aria-hidden": "true"
}, ap = { class: "group-title" }, sp = { class: "wizard-nav" }, op = { key: 1 }, lp = { class: "summary-view" }, up = { class: "summary-group-header" }, hp = { class: "group-title" }, cp = { class: "summary-group-header-right" }, dp = {
  key: 0,
  class: "group-error-badge"
}, fp = ["onClick"], pp = { class: "summary-fields" }, mp = { class: "summary-field-label" }, gp = ["innerHTML"], _p = {
  key: 1,
  class: "no-data"
}, yp = { class: "form-actions" }, vp = {
  key: 0,
  class: "validation-hint"
}, bp = ["disabled", "aria-label"], xp = ["disabled"], wp = { class: "wizard-nav" }, Lp = { class: "group-title" }, kp = { class: "form-actions" }, Cp = {
  key: 0,
  class: "validation-hint"
}, Ep = ["disabled"], Mp = ["disabled"], Bp = {
  __name: "MetadataForm",
  props: {
    config: Object,
    lang: String,
    modelValue: Object,
    wizard: {
      type: Boolean,
      default: !1
    },
    labels: {
      type: Object,
      default: () => ({})
    }
  },
  emits: ["update:modelValue", "export"],
  setup(u, { emit: l }) {
    const d = { object: el, "distribution-editor": nf };
    function p(wt) {
      return tl(wt, d);
    }
    function b(wt) {
      return String(wt ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");
    }
    const E = u, w = l, { t: g } = Qe();
    function x(wt, lt) {
      var Nt;
      const Bt = (Nt = E.labels) == null ? void 0 : Nt[wt];
      return Bt ? typeof Bt == "string" ? Bt : Bt[E.lang] ?? Bt.en ?? Bt.de ?? lt[E.lang] ?? lt.en : lt[E.lang] ?? lt.en ?? lt.de;
    }
    const S = Ft(() => {
      var wt;
      return (((wt = E.config) == null ? void 0 : wt.groups) || []).filter((lt) => lt.visible !== !1);
    });
    function P(wt) {
      return (wt.fields || []).map((lt) => E.config.fields[lt]).filter((lt) => lt && lt.visible !== !1 && Hs(lt.visibleIf, E.modelValue)).sort((lt, Bt) => (lt.order || 0) - (Bt.order || 0));
    }
    const M = Ft(() => Gc(E.config, E.modelValue, E.lang)), z = Ft(() => {
      var Bt;
      let wt = 0, lt = 0;
      for (const Nt of S.value)
        for (const ue of P(Nt))
          lt++, Us((Bt = E.modelValue) == null ? void 0 : Bt[ue.id], ue) && wt++;
      return { filled: wt, total: lt };
    }), j = Ft(() => z.value.filled), $ = Ft(() => z.value.total), tt = Ft(
      () => $.value ? Math.round(j.value / $.value * 100) : 0
    ), ut = Ft(() => Object.keys(M.value).length === 0), ft = Kt([]), At = Kt(!1), Rt = Kt(!1);
    async function zt() {
      var lt;
      const wt = (lt = E.config) == null ? void 0 : lt.standard;
      if (wt) {
        Rt.value = !0;
        try {
          const Bt = await fetch(Br(`shacl/${wt}.ttl`)).then((jt) => jt.text()), ue = await new Hf().validate(Bt, E.modelValue, E.config);
          ft.value = ue.violations, At.value = !0;
        } finally {
          Rt.value = !1;
        }
      }
    }
    async function Et({ fieldId: wt, groupId: lt }) {
      var ue;
      if (E.wizard) {
        const jt = S.value.findIndex((St) => St.id === lt);
        jt >= 0 && Jt(jt);
      }
      await Vs();
      const Bt = typeof CSS < "u" && CSS.escape ? CSS.escape(wt) : wt.replace(/[^\w-]/g, "_"), Nt = document.getElementById(`field-${Bt}`);
      Nt == null || Nt.scrollIntoView({ behavior: "smooth", block: "center" }), (ue = Nt == null ? void 0 : Nt.querySelector("input,textarea,select")) == null || ue.focus();
    }
    function ee() {
      var lt, Bt;
      if (!ut.value) return;
      const wt = ((lt = E.config) == null ? void 0 : lt.fields) || {};
      for (const [Nt, ue] of Object.entries(wt))
        ue.remember && ((Bt = E.modelValue) == null ? void 0 : Bt[Nt]) != null && kr.save(Nt, E.modelValue[Nt]);
      w("export");
    }
    const Dt = Kt(0), Ut = Kt(!1);
    pi(() => E.config, () => {
      Dt.value = 0, Ut.value = !1;
    });
    const ne = Ft(() => S.value[Dt.value]);
    function Zt(wt) {
      const lt = P(wt), Bt = {};
      for (const Nt of lt)
        M.value[Nt.id] && (Bt[Nt.id] = M.value[Nt.id]);
      return Bt;
    }
    function Wt(wt) {
      return Object.keys(Zt(wt)).length > 0;
    }
    const ge = Ft(() => ne.value ? Object.keys(Zt(ne.value)).length > 0 : !1);
    function He() {
      if (ge.value) {
        Ut.value = !0;
        return;
      }
      Ut.value = !1, Dt.value++;
    }
    function kt() {
      Ut.value = !1, Dt.value > 0 && Dt.value--;
    }
    function Jt(wt) {
      Ut.value = !1, Dt.value = wt;
    }
    function ie(wt) {
      var Bt;
      const lt = (Bt = E.modelValue) == null ? void 0 : Bt[wt.id];
      return lt == null || lt === "" ? !1 : Array.isArray(lt) ? lt.some((Nt) => Nt ? typeof Nt == "object" ? Object.values(Nt).some((ue) => ue) : !0 : !1) : typeof lt == "object" ? Object.values(lt).some((Nt) => Nt) : !0;
    }
    function we(wt) {
      return P(wt).some((lt) => ie(lt));
    }
    function Ot(wt) {
      var Bt, Nt, ue;
      const lt = (Bt = E.modelValue) == null ? void 0 : Bt[wt.id];
      if (lt == null) return "";
      if (wt.type === "langstring")
        return wt.multiple && Array.isArray(lt) ? lt.filter((jt) => jt && jt.value).map((jt) => `${jt.value} (${jt.lang || "?"})`).join(", ") : typeof lt == "object" ? Object.entries(lt).filter(([, jt]) => jt).map(([jt, St]) => `${jt.toUpperCase()}: ${St}`).join(", ") : String(lt);
      if (wt.type === "multiselect" && Array.isArray(lt))
        return lt.map((jt) => {
          var Mt, be;
          const St = (wt.options || []).find((fe) => fe.value === jt);
          return St && (((Mt = St.label) == null ? void 0 : Mt[E.lang]) || ((be = St.label) == null ? void 0 : be.en) || St.label) || jt;
        }).join(", ");
      if (wt.type === "select") {
        const jt = (wt.options || []).find((St) => St.value === lt);
        return jt && (((Nt = jt.label) == null ? void 0 : Nt[E.lang]) || ((ue = jt.label) == null ? void 0 : ue.en) || jt.label) || lt;
      }
      if (wt.type === "uri") {
        if (!lt) return "";
        const jt = b(lt);
        return `<a href="${jt}" target="_blank" rel="noopener">${jt}</a>`;
      }
      if (wt.type === "date")
        return String(lt);
      if (wt.type === "object" && typeof lt == "object" && wt.subFields) {
        const jt = wt.subFields.filter((Mt) => lt[Mt.id] && Mt.type !== "map").map((Mt) => {
          var fe, ke;
          return `<span class="sub-field"><b>${b(((fe = Mt.label) == null ? void 0 : fe[E.lang]) || ((ke = Mt.label) == null ? void 0 : ke.de) || Mt.id)}:</b> ${b(lt[Mt.id])}</span>`;
        }), St = wt.subFields.filter((Mt) => lt[Mt.id] && Mt.type === "map").map((Mt) => {
          var fe, ke;
          return `<span class="sub-field"><b>${b(((fe = Mt.label) == null ? void 0 : fe[E.lang]) || ((ke = Mt.label) == null ? void 0 : ke.de) || Mt.id)}:</b> <code style="font-size:0.75em">${b(lt[Mt.id])}</code></span>`;
        });
        return [...jt, ...St].join("<br>") || "";
      }
      return wt.type === "map" ? lt ? `<code style="font-size:0.75em">${b(lt)}</code>` : "" : wt.type === "distribution-editor" && Array.isArray(lt) ? lt.length ? lt.filter((jt) => jt && jt["dcat:accessURL"]).map((jt, St) => {
        const Mt = b(jt["dct:title"] || jt["dcat:accessURL"]), be = b(jt["dcat:accessURL"]);
        return `<span class="sub-field"><b>${St + 1}.</b> <a href="${be}" target="_blank" rel="noopener">${Mt}</a></span>`;
      }).join("<br>") || `${lt.length} Distribution(s)` : "" : String(lt);
    }
    return (wt, lt) => {
      var Bt, Nt, ue, jt;
      return V(), q("div", {
        class: he(["metadata-form ontoform", (Bt = u.config) == null ? void 0 : Bt.cssClass])
      }, [
        u.wizard ? (V(), q(It, { key: 0 }, [
          H("div", Yf, [
            (V(!0), q(It, null, ae(S.value, (St, Mt) => {
              var be, fe, ke, Bi;
              return V(), q("div", {
                key: St.id,
                class: he(["step-item", {
                  completed: Mt < Dt.value,
                  active: Mt === Dt.value && Dt.value < S.value.length,
                  future: Mt > Dt.value || Dt.value >= S.value.length,
                  "has-error": Dt.value >= S.value.length && Wt(St)
                }])
              }, [
                Mt > 0 ? (V(), q("div", {
                  key: 0,
                  class: he(["step-connector left", { done: Mt <= Dt.value }])
                }, null, 2)) : Ct("", !0),
                H("button", {
                  class: "step-circle",
                  "aria-label": xt(g)("wizard.step-aria") + (Mt + 1) + ": " + (((be = St.label) == null ? void 0 : be[u.lang]) || ((fe = St.label) == null ? void 0 : fe.en)),
                  "aria-current": Mt === Dt.value ? "step" : void 0,
                  onClick: (pn) => Jt(Mt)
                }, Q(Mt + 1), 9, Qf),
                H("div", tp, Q(((ke = St.label) == null ? void 0 : ke[u.lang]) || ((Bi = St.label) == null ? void 0 : Bi.en)), 1),
                Mt < S.value.length - 1 ? (V(), q("div", {
                  key: 1,
                  class: he(["step-connector right", { done: Mt < Dt.value }])
                }, null, 2)) : Ct("", !0)
              ], 2);
            }), 128)),
            H("div", {
              class: he(["step-item", {
                active: Dt.value === S.value.length,
                future: Dt.value < S.value.length
              }])
            }, [
              H("div", {
                class: he(["step-connector left", { done: Dt.value >= S.value.length }])
              }, null, 2),
              lt[4] || (lt[4] = H("div", { class: "step-circle" }, "✓", -1)),
              H("div", ep, Q(xt(g)("wizard.summary")), 1)
            ], 2)
          ]),
          (Nt = u.config) != null && Nt.showProgress ? (V(), q("div", ip, [
            H("div", {
              class: "progress-bar-track",
              role: "progressbar",
              "aria-valuenow": tt.value,
              "aria-valuemin": "0",
              "aria-valuemax": "100",
              "aria-label": xt(g)("wizard.progress-aria") + j.value + " / " + $.value
            }, [
              H("div", {
                class: "progress-bar-fill",
                style: Fl({ width: tt.value + "%" })
              }, null, 4)
            ], 8, np),
            H("span", rp, Q(j.value) + " / " + Q($.value), 1)
          ])) : Ct("", !0),
          Dt.value < S.value.length ? (V(), q(It, { key: 1 }, [
            H("div", {
              class: he(["form-group", ne.value.cssClass])
            }, [
              H("h2", ap, Q(((ue = ne.value.label) == null ? void 0 : ue[u.lang]) || ((jt = ne.value.label) == null ? void 0 : jt.en)), 1),
              Qi(Gs, {
                fields: P(ne.value),
                lang: u.lang,
                modelValue: u.modelValue,
                fieldErrors: M.value,
                showErrors: Ut.value,
                fieldComponent: p,
                "onUpdate:modelValue": lt[0] || (lt[0] = (St) => wt.$emit("update:modelValue", St))
              }, null, 8, ["fields", "lang", "modelValue", "fieldErrors", "showErrors"])
            ], 2),
            H("div", sp, [
              Dt.value > 0 ? (V(), q("button", {
                key: 0,
                class: "btn-back",
                onClick: kt
              }, Q(xt(g)("wizard.nav.back")), 1)) : (V(), q("span", op)),
              H("button", {
                class: "btn-export",
                onClick: He
              }, Q(Dt.value < S.value.length - 1 ? xt(g)("wizard.nav.next") : xt(g)("wizard.nav.to-summary")), 1)
            ])
          ], 64)) : (V(), q(It, { key: 2 }, [
            H("div", lp, [
              (V(!0), q(It, null, ae(S.value, (St, Mt) => {
                var be, fe;
                return V(), q("div", {
                  key: St.id,
                  class: he(["form-group summary-group", [{ "summary-group-has-error": Wt(St) }, St.cssClass]])
                }, [
                  H("div", up, [
                    H("h2", hp, Q(((be = St.label) == null ? void 0 : be[u.lang]) || ((fe = St.label) == null ? void 0 : fe.en)), 1),
                    H("div", cp, [
                      Wt(St) ? (V(), q("span", dp, Q(xt(g)("wizard.summary.error-badge")), 1)) : Ct("", !0),
                      H("button", {
                        class: "btn-edit",
                        onClick: (ke) => Jt(Mt)
                      }, Q(xt(g)("wizard.summary.edit")), 9, fp)
                    ])
                  ]),
                  H("div", pp, [
                    we(St) ? (V(!0), q(It, { key: 0 }, ae(P(St), (ke) => (V(), q("div", {
                      key: ke.id,
                      class: "summary-field"
                    }, [
                      ie(ke) ? (V(), q(It, { key: 0 }, [
                        H("span", mp, Q(ke.label[u.lang] || ke.label.en), 1),
                        H("span", {
                          class: "summary-field-value",
                          innerHTML: Ot(ke)
                        }, null, 8, gp)
                      ], 64)) : Ct("", !0)
                    ]))), 128)) : (V(), q("span", _p, Q(xt(g)("wizard.summary.no-data")), 1))
                  ])
                ], 2);
              }), 128))
            ]),
            H("div", yp, [
              ut.value ? Ct("", !0) : (V(), q("span", vp, Q(xt(g)("form.validation-hint")), 1)),
              H("button", {
                class: "btn-validate",
                type: "button",
                disabled: Rt.value,
                "aria-label": Rt.value ? xt(g)("btn.validating") : x("validateAriaLabel", { de: "SHACL-Validierung starten", en: "Run SHACL validation" }),
                onClick: zt
              }, Q(Rt.value ? "…" : x("validate", { de: xt(Xi).de["btn.validate"], en: xt(Xi).en["btn.validate"] })), 9, bp),
              H("button", {
                class: he(["btn-export", { disabled: !ut.value }]),
                disabled: !ut.value,
                onClick: ee
              }, Q(x("export", { de: xt(Xi).de["btn.export"], en: xt(Xi).en["btn.export"] })), 11, xp)
            ]),
            At.value ? (V(), Re(Bl, {
              key: 0,
              violations: ft.value,
              lang: u.lang,
              onClose: lt[1] || (lt[1] = (St) => At.value = !1),
              onNavigate: Et
            }, null, 8, ["violations", "lang"])) : Ct("", !0),
            H("div", wp, [
              H("button", {
                class: "btn-back",
                onClick: kt
              }, Q(xt(g)("wizard.nav.back")), 1),
              lt[5] || (lt[5] = H("span", null, null, -1))
            ])
          ], 64))
        ], 64)) : (V(), q(It, { key: 1 }, [
          (V(!0), q(It, null, ae(S.value, (St) => {
            var Mt, be;
            return V(), q("div", {
              key: St.id,
              class: he(["form-group", St.cssClass])
            }, [
              H("h2", Lp, Q(((Mt = St.label) == null ? void 0 : Mt[u.lang]) || ((be = St.label) == null ? void 0 : be.en)), 1),
              Qi(Gs, {
                fields: P(St),
                lang: u.lang,
                modelValue: u.modelValue,
                fieldErrors: M.value,
                showErrors: !0,
                fieldComponent: p,
                "onUpdate:modelValue": lt[2] || (lt[2] = (fe) => wt.$emit("update:modelValue", fe))
              }, null, 8, ["fields", "lang", "modelValue", "fieldErrors"])
            ], 2);
          }), 128)),
          H("div", kp, [
            ut.value ? Ct("", !0) : (V(), q("span", Cp, Q(xt(g)("form.validation-hint")), 1)),
            H("button", {
              class: "btn-validate",
              type: "button",
              disabled: Rt.value,
              onClick: zt
            }, Q(Rt.value ? "…" : x("validate", { de: xt(Xi).de["btn.validate"], en: xt(Xi).en["btn.validate"] })), 9, Ep),
            H("button", {
              class: he(["btn-export", { disabled: !ut.value }]),
              disabled: !ut.value,
              onClick: ee
            }, Q(x("export", { de: xt(Xi).de["btn.export"], en: xt(Xi).en["btn.export"] })), 11, Mp)
          ]),
          At.value ? (V(), Re(Bl, {
            key: 0,
            violations: ft.value,
            lang: u.lang,
            onClose: lt[3] || (lt[3] = (St) => At.value = !1),
            onNavigate: Et
          }, null, 8, ["violations", "lang"])) : Ct("", !0)
        ], 64))
      ], 2);
    };
  }
}, Ap = /* @__PURE__ */ oe(Bp, [["__scopeId", "data-v-e5d5f41b"]]), Sp = { class: "onto-viewer" }, Pp = { class: "viewer-group-title" }, Tp = { class: "viewer-fields" }, Dp = {
  key: 0,
  class: "viewer-field"
}, Op = { class: "viewer-label" }, Ip = { class: "viewer-value" }, Fp = {
  key: 0,
  class: "viewer-dist-title"
}, Rp = {
  key: 1,
  class: "viewer-dist-desc"
}, zp = { class: "viewer-dist-links" }, Np = ["href"], jp = ["href"], Vp = {
  key: 2,
  class: "viewer-format"
}, $p = ["href"], Up = {
  key: 1,
  class: "viewer-text"
}, Gp = {
  key: 4,
  class: "viewer-text"
}, Zp = {
  __name: "MetadataViewer",
  props: {
    config: { type: Object, required: !0 },
    modelValue: { type: Object, default: () => ({}) },
    lang: { type: String, default: "en" }
  },
  setup(u) {
    const l = u, d = Ft(
      () => {
        var M;
        return (((M = l.config) == null ? void 0 : M.groups) ?? []).filter((z) => z.visible !== !1);
      }
    );
    function p(M) {
      var z, j;
      return ((z = M.label) == null ? void 0 : z[l.lang]) ?? ((j = M.label) == null ? void 0 : j.en) ?? M.id;
    }
    function b(M) {
      const z = l.modelValue[M.id];
      return z == null || z === "" ? !1 : Array.isArray(z) ? z.length > 0 : !0;
    }
    function E(M) {
      return M == null ? [] : Array.isArray(M) ? M : [M];
    }
    function w(M) {
      return Array.isArray(M) ? String(M[0] ?? "") : String(M ?? "");
    }
    function g(M) {
      const z = E(l.modelValue[M]), j = z.filter(($) => ($ == null ? void 0 : $.lang) === l.lang).map(($) => ($ == null ? void 0 : $.value) ?? String($));
      return j.length > 0 ? j : z.map(($) => ($ == null ? void 0 : $.value) ?? String($));
    }
    function x(M) {
      return /^https?:\/\//.test(M);
    }
    function S(M, z) {
      var $, tt, ut;
      if (!z) return "";
      const j = ($ = M.options) == null ? void 0 : $.find((ft) => ft.value === z);
      return j ? ((tt = j.label) == null ? void 0 : tt[l.lang]) ?? ((ut = j.label) == null ? void 0 : ut.en) ?? z : z;
    }
    function P(M) {
      return M ? typeof M == "string" ? M : typeof M == "object" ? M[l.lang] ?? M.en ?? M.de ?? Object.values(M)[0] ?? "" : String(M) : "";
    }
    return (M, z) => (V(), q("div", Sp, [
      (V(!0), q(It, null, ae(d.value, (j) => (V(), q("div", {
        key: j.id,
        class: "viewer-group"
      }, [
        H("h3", Pp, Q(j.label[u.lang] ?? j.label.en ?? j.id), 1),
        H("dl", Tp, [
          (V(!0), q(It, null, ae(j.fields, ($) => (V(), q(It, { key: $ }, [
            u.config.fields[$] && b(u.config.fields[$]) ? (V(), q("div", Dp, [
              H("dt", Op, Q(p(u.config.fields[$])), 1),
              H("dd", Ip, [
                u.config.fields[$].type === "distribution-editor" ? (V(!0), q(It, { key: 0 }, ae(E(u.modelValue[$]), (tt, ut) => (V(), q("div", {
                  key: ut,
                  class: "viewer-distribution"
                }, [
                  tt["dct:title"] ? (V(), q("p", Fp, Q(P(tt["dct:title"])), 1)) : Ct("", !0),
                  tt["dct:description"] ? (V(), q("p", Rp, Q(P(tt["dct:description"])), 1)) : Ct("", !0),
                  H("div", zp, [
                    tt["dcat:downloadURL"] ? (V(), q("a", {
                      key: 0,
                      href: String(tt["dcat:downloadURL"]),
                      target: "_blank",
                      rel: "noopener",
                      class: "viewer-link"
                    }, Q((u.lang === "de", "Download")), 9, Np)) : tt["dcat:accessURL"] ? (V(), q("a", {
                      key: 1,
                      href: String(tt["dcat:accessURL"]),
                      target: "_blank",
                      rel: "noopener",
                      class: "viewer-link"
                    }, Q(u.lang === "de" ? "Zugang" : "Access"), 9, jp)) : Ct("", !0),
                    tt["dct:format"] ? (V(), q("span", Vp, Q(P(tt["dct:format"])), 1)) : Ct("", !0)
                  ])
                ]))), 128)) : u.config.fields[$].type === "langstring" ? (V(!0), q(It, { key: 1 }, ae(g($), (tt, ut) => (V(), q("span", {
                  key: ut,
                  class: "viewer-langstring"
                }, Q(tt), 1))), 128)) : u.config.fields[$].type === "uri" ? (V(!0), q(It, { key: 2 }, ae(E(u.modelValue[$]), (tt, ut) => (V(), q("span", { key: ut }, [
                  x(String(tt)) ? (V(), q("a", {
                    key: 0,
                    href: String(tt),
                    target: "_blank",
                    rel: "noopener",
                    class: "viewer-uri"
                  }, Q(String(tt)), 9, $p)) : (V(), q("span", Up, Q(String(tt)), 1))
                ]))), 128)) : u.config.fields[$].multiple ? (V(!0), q(It, { key: 3 }, ae(E(u.modelValue[$]), (tt, ut) => (V(), q("span", {
                  key: ut,
                  class: "viewer-tag"
                }, Q(S(u.config.fields[$], String(tt))), 1))), 128)) : (V(), q("span", Gp, Q(S(u.config.fields[$], w(u.modelValue[$]))), 1))
              ])
            ])) : Ct("", !0)
          ], 64))), 128))
        ])
      ]))), 128))
    ]));
  }
}, dg = /* @__PURE__ */ oe(Zp, [["__scopeId", "data-v-440cb69b"]]);
function hi(u) {
  if (typeof u != "string" || !u) return !1;
  try {
    return !!new URL(u);
  } catch {
    return !1;
  }
}
function wr(u) {
  return typeof u == "string" && /^\d{4}-\d{2}-\d{2}/.test(u);
}
function Pn(u) {
  return typeof u == "string" && /^(POLYGON|POINT|LINESTRING|MULTIPOLYGON|MULTIPOINT|MULTILINESTRING|GEOMETRYCOLLECTION)\s*\(/i.test(u.trim());
}
const qp = {
  dct: "http://purl.org/dc/terms/",
  dcat: "http://www.w3.org/ns/dcat#",
  foaf: "http://xmlns.com/foaf/0.1/",
  skos: "http://www.w3.org/2004/02/skos/core#",
  vcard: "http://www.w3.org/2006/vcard/ns#",
  xsd: "http://www.w3.org/2001/XMLSchema#",
  rdfs: "http://www.w3.org/2000/01/rdf-schema#",
  "dct:title": { "@container": "@language" },
  "dct:description": { "@container": "@language" },
  "dct:issued": { "@type": "xsd:date" },
  "dct:modified": { "@type": "xsd:date" },
  "dcat:accessURL": { "@type": "@id" },
  "dcat:downloadURL": { "@type": "@id" },
  "dct:publisher": { "@type": "@id" },
  "dcat:theme": { "@type": "@id" },
  "dct:spatial": { "@type": "@id" },
  dcatapatdmp: "http://dcat-ap.at/dev/dmp/"
};
class Hp {
  toJSONLD(l, d, p = "dcat:Dataset") {
    const b = {
      "@context": qp,
      "@type": p,
      "@id": l["dct:identifier"] || `_:dataset_${Date.now()}`
    };
    for (const [E, w] of Object.entries(l || {}))
      if (!(w == null || w === "" || E === "@id"))
        if (Array.isArray(w)) {
          const g = w.flatMap((x) => {
            if (x && typeof x == "object" && "value" in x)
              return x.value ? [{ "@value": x.value, "@language": x.lang }] : [];
            if (Lr(x)) {
              const P = { "@type": x["rdf:type"] || "dcat:Distribution" };
              for (const [M, z] of Object.entries(x))
                !M.includes(":") || M === "rdf:type" || z && (hi(z) ? P[M] = { "@id": z } : Pn(z) ? P[M] = { "@value": z, "@type": "http://www.opengis.net/ont/geosparql#wktLiteral" } : P[M] = z);
              return Object.keys(P).length > 1 ? [P] : [];
            }
            return x ? [x] : [];
          });
          g.length > 0 && (b[E] = g.length === 1 ? g[0] : g);
        } else if (Lr(w)) {
          const g = {};
          w["rdf:type"] && (g["@type"] = w["rdf:type"]);
          for (const [x, S] of Object.entries(w))
            !x.includes(":") || x === "rdf:type" || S && (hi(S) ? g[x] = { "@id": S } : Pn(S) ? g[x] = { "@value": S, "@type": "http://www.opengis.net/ont/geosparql#wktLiteral" } : g[x] = S);
          Object.keys(g).length > 0 && (b[E] = g);
        } else if (typeof w == "object") {
          const g = Object.fromEntries(Object.entries(w).filter(([, x]) => x));
          Object.keys(g).length > 0 && (b[E] = g);
        } else
          b[E] = w;
    return JSON.stringify(b, null, 2);
  }
  toRDFXML(l, d, p = "dcat:Dataset") {
    const b = [
      '  xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#"',
      '  xmlns:dct="http://purl.org/dc/terms/"',
      '  xmlns:dcat="http://www.w3.org/ns/dcat#"',
      '  xmlns:foaf="http://xmlns.com/foaf/0.1/"',
      '  xmlns:skos="http://www.w3.org/2004/02/skos/core#"',
      '  xmlns:vcard="http://www.w3.org/2006/vcard/ns#"',
      '  xmlns:xsd="http://www.w3.org/2001/XMLSchema#"',
      '  xmlns:rdfs="http://www.w3.org/2000/01/rdf-schema#"',
      '  xmlns:dcatapatdmp="http://dcat-ap.at/dev/dmp/"'
    ].join(`
`), E = l["dct:identifier"], w = E && hi(E) ? ` rdf:about="${Ze(E)}"` : "", g = [];
    for (const [x, S] of Object.entries(l || {}))
      if (!(S == null || S === "" || x === "dct:identifier"))
        if (Array.isArray(S)) {
          for (const P of S)
            if (P)
              if (typeof P == "object" && "value" in P)
                P.value && g.push(`    <${x} xml:lang="${P.lang}">${Ze(P.value)}</${x}>`);
              else if (Lr(P)) {
                const M = P["rdf:type"] || "dcat:Distribution", z = [];
                for (const [j, $] of Object.entries(P))
                  !j.includes(":") || j === "rdf:type" || $ && (hi($) ? z.push(`        <${j} rdf:resource="${Ze($)}"/>`) : wr($) ? z.push(`        <${j} rdf:datatype="http://www.w3.org/2001/XMLSchema#date">${Ze($)}</${j}>`) : Pn($) ? z.push(`        <${j} rdf:datatype="http://www.opengis.net/ont/geosparql#wktLiteral">${Ze(String($))}</${j}>`) : z.push(`        <${j}>${Ze(String($))}</${j}>`));
                z.length > 0 && g.push(`    <${x}>
      <${M}>
${z.join(`
`)}
      </${M}>
    </${x}>`);
              } else hi(P) ? g.push(`    <${x} rdf:resource="${Ze(P)}"/>`) : P && g.push(`    <${x}>${Ze(String(P))}</${x}>`);
        } else if (Lr(S)) {
          const P = [], M = S["rdf:type"], z = M ? `      <${M}>` : "      <rdf:Description>", j = M ? `      </${M}>` : "      </rdf:Description>";
          for (const [$, tt] of Object.entries(S))
            !$.includes(":") || $ === "rdf:type" || tt && (hi(tt) ? P.push(`        <${$} rdf:resource="${Ze(tt)}"/>`) : wr(tt) ? P.push(`        <${$} rdf:datatype="http://www.w3.org/2001/XMLSchema#date">${Ze(tt)}</${$}>`) : Pn(tt) ? P.push(`        <${$} rdf:datatype="http://www.opengis.net/ont/geosparql#wktLiteral">${Ze(String(tt))}</${$}>`) : P.push(`        <${$}>${Ze(String(tt))}</${$}>`));
          P.length > 0 && g.push(`    <${x}>
${z}
${P.join(`
`)}
${j}
    </${x}>`);
        } else if (typeof S == "object")
          for (const [P, M] of Object.entries(S))
            M && g.push(`    <${x} xml:lang="${P}">${Ze(M)}</${x}>`);
        else hi(S) ? g.push(`    <${x} rdf:resource="${Ze(S)}"/>`) : wr(S) ? g.push(`    <${x} rdf:datatype="http://www.w3.org/2001/XMLSchema#date">${Ze(S)}</${x}>`) : Pn(S) ? g.push(`    <${x} rdf:datatype="http://www.opengis.net/ont/geosparql#wktLiteral">${Ze(String(S))}</${x}>`) : g.push(`    <${x}>${Ze(String(S))}</${x}>`);
    return [
      '<?xml version="1.0" encoding="UTF-8"?>',
      `<rdf:RDF
${b}>`,
      `  <${p}${w}>`,
      ...g,
      `  </${p}>`,
      "</rdf:RDF>"
    ].join(`
`);
  }
  toTurtle(l, d, p = "dcat:Dataset") {
    const b = [
      "@prefix dct: <http://purl.org/dc/terms/> .",
      "@prefix dcat: <http://www.w3.org/ns/dcat#> .",
      "@prefix foaf: <http://xmlns.com/foaf/0.1/> .",
      "@prefix xsd: <http://www.w3.org/2001/XMLSchema#> .",
      "@prefix skos: <http://www.w3.org/2004/02/skos/core#> .",
      "@prefix vcard: <http://www.w3.org/2006/vcard/ns#> .",
      "@prefix rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#> .",
      "@prefix geo: <http://www.opengis.net/ont/geosparql#> .",
      "@prefix locn: <http://www.w3.org/ns/locn#> .",
      "@prefix dcatapatdmp: <http://dcat-ap.at/dev/dmp/> .",
      ""
    ], E = l["dct:identifier"], w = E && hi(E) ? `<${E}>` : "_:dataset", g = [];
    for (const [S, P] of Object.entries(l || {}))
      if (!(P == null || P === "" || S === "dct:identifier"))
        if (Array.isArray(P)) {
          for (const M of P)
            if (M)
              if (typeof M == "object" && "value" in M)
                M.value && g.push(`    ${S} "${cn(M.value)}"@${M.lang}`);
              else if (Lr(M)) {
                const j = [`        a ${M["rdf:type"] || "dcat:Distribution"}`];
                for (const [$, tt] of Object.entries(M))
                  !$.includes(":") || $ === "rdf:type" || tt && (hi(tt) ? j.push(`        ${$} <${tt}>`) : wr(tt) ? j.push(`        ${$} "${tt}"^^xsd:date`) : Pn(tt) ? j.push(`        ${$} "${cn(String(tt))}"^^geo:wktLiteral`) : j.push(`        ${$} "${cn(String(tt))}"`));
                if (j.length > 1) {
                  const $ = j.map((tt, ut) => ut < j.length - 1 ? tt + " ;" : tt).join(`
`);
                  g.push(`    ${S} [
${$}
    ]`);
                }
              } else hi(M) ? g.push(`    ${S} <${M}>`) : M && g.push(`    ${S} "${cn(String(M))}"`);
        } else if (Lr(P)) {
          const M = [];
          P["rdf:type"] && M.push(`        a ${P["rdf:type"]}`);
          for (const [z, j] of Object.entries(P))
            !z.includes(":") || z === "rdf:type" || j && (hi(j) ? M.push(`        ${z} <${j}>`) : wr(j) ? M.push(`        ${z} "${j}"^^xsd:date`) : Pn(j) ? M.push(`        ${z} "${cn(String(j))}"^^geo:wktLiteral`) : M.push(`        ${z} "${cn(String(j))}"`));
          if (M.length > 0) {
            const z = M.map(
              (j, $) => $ < M.length - 1 ? j + " ;" : j
            ).join(`
`);
            g.push(`    ${S} [
${z}
    ]`);
          }
        } else if (typeof P == "object") {
          const M = Object.entries(P).filter(([, z]) => z).map(([z, j]) => `"${cn(j)}"@${z}`);
          M.length > 0 && g.push(`    ${S} ${M.join(", ")}`);
        } else hi(P) ? g.push(`    ${S} <${P}>`) : wr(P) ? g.push(`    ${S} "${P}"^^xsd:date`) : Pn(P) ? g.push(`    ${S} "${cn(String(P))}"^^geo:wktLiteral`) : g.push(`    ${S} "${cn(String(P))}"`);
    if (g.length === 0)
      return [...b, `${w} a ${p} .`].join(`
`);
    const x = g.map(
      (S, P) => P < g.length - 1 ? S + " ;" : S + " ."
    );
    return [...b, `${w} a ${p} ;`, ...x].join(`
`);
  }
}
function Ze(u) {
  return String(u).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}
function cn(u) {
  return u.replace(/\\/g, "\\\\").replace(/"/g, '\\"').replace(/\n/g, "\\n");
}
function Lr(u) {
  return typeof u != "object" || u === null || Array.isArray(u) ? !1 : Object.keys(u).some((l) => l.includes(":"));
}
const Kp = ["aria-label"], Wp = ["aria-selected", "aria-controls", "tabindex", "onClick"], Jp = {
  __name: "TabBar",
  props: {
    tabs: { type: Array, required: !0 },
    // [{ id, label, controls }]
    modelValue: { type: String, required: !0 },
    ariaLabel: { type: String, default: "" }
  },
  emits: ["update:modelValue"],
  setup(u) {
    return (l, d) => (V(), q("div", {
      class: "tab-bar",
      role: "tablist",
      "aria-label": u.ariaLabel
    }, [
      (V(!0), q(It, null, ae(u.tabs, (p) => (V(), q("button", {
        key: p.id,
        role: "tab",
        "aria-selected": u.modelValue === p.id,
        "aria-controls": p.controls,
        class: he({ active: u.modelValue === p.id }),
        tabindex: u.modelValue === p.id ? 0 : -1,
        onClick: (b) => l.$emit("update:modelValue", p.id)
      }, Q(p.label), 11, Wp))), 128))
    ], 8, Kp));
  }
}, su = /* @__PURE__ */ oe(Jp, [["__scopeId", "data-v-f81603fa"]]), Xp = {
  key: 0,
  class: "preview-notice",
  role: "status"
}, Yp = { class: "export-content" }, Qp = ["hidden"], t0 = ["hidden"], e0 = ["hidden"], i0 = {
  role: "status",
  "aria-live": "polite",
  class: "copy-status"
}, n0 = {
  __name: "ExportPanel",
  props: {
    formData: Object,
    standard: String,
    rootClass: { type: String, default: "dcat:Dataset" },
    lang: String,
    preview: { type: Boolean, default: !1 }
  },
  emits: ["close"],
  setup(u) {
    const { t: l } = Qe(), d = u, p = Kt("jsonld"), b = Kt(!1), E = new Hp(), w = Ft(() => E.toJSONLD(d.formData, d.standard, d.rootClass)), g = Ft(() => E.toTurtle(d.formData, d.standard, d.rootClass)), x = Ft(() => E.toRDFXML(d.formData, d.standard, d.rootClass)), S = Ft(() => p.value === "jsonld" ? w.value : p.value === "turtle" ? g.value : x.value);
    async function P() {
      await navigator.clipboard.writeText(S.value), b.value = !0, setTimeout(() => b.value = !1, 2e3);
    }
    function M() {
      const z = { jsonld: "jsonld", turtle: "ttl", rdfxml: "rdf" }, j = { jsonld: "application/ld+json", turtle: "text/turtle", rdfxml: "application/rdf+xml" };
      z[p.value];
      const $ = j[p.value] || "application/rdf+xml", tt = new Blob([S.value], { type: $ }), ut = URL.createObjectURL(tt), ft = document.createElement("a");
      ft.href = ut, ft.download = p.value === "jsonld" ? "metadata.jsonld" : p.value === "turtle" ? "metadata.ttl" : "metadata.rdf", ft.click(), URL.revokeObjectURL(ut);
    }
    return (z, j) => (V(), Re(il, {
      "heading-id": "export-heading",
      title: "Export",
      "close-label": u.lang === "de" ? "Export schließen" : "Close export",
      "max-width": "800px",
      "focus-selectors": ["[role='tab']", "button"],
      onClose: j[1] || (j[1] = ($) => z.$emit("close"))
    }, {
      notice: dn(() => [
        u.preview ? (V(), q("div", Xp, Q(u.lang === "de" ? "Vorschau-Modus: Daten können unvollständig oder ungültig sein." : "Preview mode: data may be incomplete or invalid."), 1)) : Ct("", !0)
      ]),
      tabs: dn(() => [
        Qi(su, {
          modelValue: p.value,
          "onUpdate:modelValue": j[0] || (j[0] = ($) => p.value = $),
          "aria-label": u.lang === "de" ? "Exportformat" : "Export format",
          tabs: [
            { id: "jsonld", label: "JSON-LD", controls: "export-panel-jsonld" },
            { id: "turtle", label: "Turtle", controls: "export-panel-turtle" },
            { id: "rdfxml", label: "RDF/XML", controls: "export-panel-rdfxml" }
          ]
        }, null, 8, ["modelValue", "aria-label"])
      ]),
      actions: dn(() => [
        H("span", i0, Q(b.value ? xt(l)("export.copied") : ""), 1),
        H("button", {
          class: "btn-copy",
          onClick: P
        }, Q(xt(l)("btn.copy")), 1),
        H("button", {
          class: "btn-download",
          onClick: M
        }, Q(xt(l)("btn.download")), 1)
      ]),
      default: dn(() => [
        H("div", Yp, [
          H("div", {
            id: "export-panel-jsonld",
            role: "tabpanel",
            "aria-labelledby": "export-tab-jsonld",
            hidden: p.value !== "jsonld"
          }, [
            H("pre", null, Q(w.value), 1)
          ], 8, Qp),
          H("div", {
            id: "export-panel-turtle",
            role: "tabpanel",
            "aria-labelledby": "export-tab-turtle",
            hidden: p.value !== "turtle"
          }, [
            H("pre", null, Q(g.value), 1)
          ], 8, t0),
          H("div", {
            id: "export-panel-rdfxml",
            role: "tabpanel",
            "aria-labelledby": "export-tab-rdfxml",
            hidden: p.value !== "rdfxml"
          }, [
            H("pre", null, Q(x.value), 1)
          ], 8, e0)
        ])
      ]),
      _: 1
    }, 8, ["close-label"]));
  }
}, fg = /* @__PURE__ */ oe(n0, [["__scopeId", "data-v-05cc92ef"]]), Tl = {
  rdf: "http://www.w3.org/1999/02/22-rdf-syntax-ns#",
  dct: "http://purl.org/dc/terms/",
  dcat: "http://www.w3.org/ns/dcat#",
  dcatap: "http://data.europa.eu/r5r/",
  foaf: "http://xmlns.com/foaf/0.1/",
  vcard: "http://www.w3.org/2006/vcard/ns#",
  skos: "http://www.w3.org/2004/02/skos/core#",
  xsd: "http://www.w3.org/2001/XMLSchema#",
  rdfs: "http://www.w3.org/2000/01/rdf-schema#",
  geo: "http://www.opengis.net/ont/geosparql#",
  locn: "http://www.w3.org/ns/locn#",
  odrl: "http://www.w3.org/ns/odrl/2/",
  dcatapatdmp: "http://dcat-ap.at/dev/dmp/"
}, Dl = [
  "dcat:accessURL",
  "dcat:downloadURL",
  "dct:title",
  "dct:description",
  "dct:format",
  "dcat:mediaType",
  "dct:license",
  "dcatap:availability",
  "dct:issued",
  "dct:modified"
], Ol = {
  "vcard:hasEmail": (u) => u.startsWith("mailto:") ? u.slice(7) : u,
  "foaf:mbox": (u) => u.startsWith("mailto:") ? u.slice(7) : u
};
class ou {
  fromJSONLD(l, d) {
    const p = JSON.parse(l), b = (d == null ? void 0 : d.fields) || {};
    let E = p, w = {};
    if (Array.isArray(p["@graph"])) {
      for (const $ of p["@graph"])
        $["@id"] && (w[$["@id"]] = $);
      const M = (d == null ? void 0 : d.rootClass) || "dcat:Dataset", z = [M, Pl(M)], j = ($) => {
        const tt = $["@type"];
        return (Array.isArray(tt) ? tt : tt ? [tt] : []).some((ft) => z.includes(ft));
      };
      E = p["@graph"].find(j) ?? p["@graph"].find(($) => {
        const tt = $["@type"];
        return !(Array.isArray(tt) ? tt : tt ? [tt] : []).some((ft) => ft === "rdfs:Resource" || ft.endsWith("#Resource") || ft.endsWith("/Resource"));
      }) ?? p["@graph"][0] ?? p;
    }
    const g = (M) => {
      if (!M.startsWith("http")) return M;
      for (const [z, j] of Object.entries(Tl))
        if (M.startsWith(j)) return `${z}:${M.slice(j.length)}`;
      return M;
    }, x = (M, z = /* @__PURE__ */ new Set()) => {
      if (Array.isArray(M)) return M.map((j) => x(j, z));
      if (M && typeof M == "object") {
        if (Object.keys(M).length === 1 && M["@id"])
          return w[M["@id"]] && !z.has(M["@id"]) ? x(w[M["@id"]], new Set(z).add(M["@id"])) : M["@id"];
        const $ = {};
        for (const [tt, ut] of Object.entries(M)) $[tt] = x(ut, z);
        return $;
      }
      return M;
    }, S = {};
    for (const [M, z] of Object.entries(E))
      S[g(M)] = x(z);
    const P = {};
    for (const [M, z] of Object.entries(b)) {
      const j = S[M];
      if (j == null) continue;
      const $ = this._deserializeJSONLD(j, z), tt = this._encodeIfTransformed(this._coerceToFieldType($, z), z);
      tt != null && !this._isInvalid(tt, z) && (P[M] = tt);
    }
    if (!P["dct:identifier"] && E["@id"] && hi(E["@id"])) {
      const M = b["dct:identifier"];
      (!M || !this._isInvalid(E["@id"], M)) && (P["dct:identifier"] = M != null && M.multiple ? [E["@id"]] : E["@id"]);
    }
    return P;
  }
  fromRDFXML(l, d) {
    const b = new DOMParser().parseFromString(l, "application/xml"), E = b.querySelector("parsererror");
    if (E) throw new Error(E.textContent);
    const w = "http://www.w3.org/ns/dcat#", g = "http://www.w3.org/1999/02/22-rdf-syntax-ns#", x = "http://www.w3.org/XML/1998/namespace", S = b.getElementsByTagNameNS(w, "Dataset")[0];
    if (!S) throw new Error("Kein dcat:Dataset gefunden");
    const P = {}, M = /* @__PURE__ */ new Map();
    let z = 0;
    const j = (ft, At) => {
      P[ft] || (P[ft] = []), P[ft].push(At);
    }, $ = S.getAttributeNS(g, "about");
    $ && j("dct:identifier", { termType: "NamedNode", value: $ });
    for (const ft of S.children) {
      const At = ft.namespaceURI + ft.localName, Rt = this._toPrefixed(At), zt = ft.getAttributeNS(g, "resource");
      if (zt) {
        j(Rt, { termType: "NamedNode", value: zt });
        continue;
      }
      const Et = ft.getElementsByTagNameNS(g, "Description")[0] || (ft.children.length > 0 ? ft.children[0] : null);
      if (Et) {
        const Ut = `_:bn${z++}`, ne = [];
        if (!(Et.namespaceURI === g && Et.localName === "Description")) {
          const Wt = Et.namespaceURI + Et.localName;
          ne.push({ subject: { value: Ut }, predicate: { value: g + "type" }, object: { termType: "NamedNode", value: Wt } });
        }
        for (const Wt of Et.children) {
          const ge = Wt.namespaceURI + Wt.localName, He = Wt.getAttributeNS(g, "resource");
          if (He)
            ne.push({ subject: { value: Ut }, predicate: { value: ge }, object: { termType: "NamedNode", value: He } });
          else {
            const kt = Wt.getAttributeNS(x, "lang") || Wt.getAttribute("xml:lang") || "";
            ne.push({ subject: { value: Ut }, predicate: { value: ge }, object: { termType: "Literal", value: Wt.textContent, language: kt } });
          }
        }
        M.set(Ut, ne), j(Rt, { termType: "BlankNode", value: Ut });
        continue;
      }
      const ee = ft.getAttributeNS(x, "lang") || ft.getAttribute("xml:lang") || "", Dt = ft.getAttributeNS(g, "datatype") || "";
      j(Rt, { termType: "Literal", value: ft.textContent, language: ee, datatype: Dt });
    }
    const tt = (d == null ? void 0 : d.fields) || {}, ut = {};
    for (const [ft, At] of Object.entries(tt)) {
      const Rt = P[ft];
      if (!(Rt != null && Rt.length)) continue;
      const zt = this._deserializeTurtleObjects(Rt, At, M), Et = this._encodeIfTransformed(this._coerceToFieldType(zt, At), At);
      Et != null && !this._isInvalid(Et, At) && (ut[ft] = Et);
    }
    return ut;
  }
  async fromTurtle(l, d) {
    const p = this._normalizePrefixes(l), b = await this._parseTurtle(p);
    return this._quadsToFormData(b, d);
  }
  // ── Preprocessing ──────────────────────────────────────────────────────────
  _normalizePrefixes(l) {
    return l.replace(/^PREFIX\s+(\S+)\s+(<[^>]+>)\s*$/gim, "@prefix $1 $2 .");
  }
  // ── JSON-LD ────────────────────────────────────────────────────────────────
  _deserializeJSONLD(l, d) {
    const { type: p, multiple: b } = d;
    if (p === "langstring") {
      if (b)
        return (Array.isArray(l) ? l : [l]).map((x) => x && typeof x == "object" && "@value" in x ? { value: x["@value"], lang: x["@language"] || "de" } : { value: String(x), lang: "de" }).filter((x) => x.value);
      if (Array.isArray(l)) {
        const g = {};
        for (const x of l)
          x && typeof x == "object" && "@value" in x && (g[x["@language"] || "de"] = x["@value"]);
        return Object.keys(g).length ? g : { de: "" };
      }
      return typeof l == "object" && !("@value" in l) ? l : typeof l == "object" && "@value" in l ? { [l["@language"] || "de"]: l["@value"] } : { de: String(l) };
    }
    if (p === "multiselect")
      return (Array.isArray(l) ? l : [l]).map((x) => typeof x == "string" ? x : (x == null ? void 0 : x["@id"]) || String(x));
    if (p === "distribution-editor")
      return (Array.isArray(l) ? l : [l]).map((x) => this._importDistributionJSONLD(x)).filter((x) => x["dcat:accessURL"]);
    if (p === "object") {
      if (typeof l != "object" || Array.isArray(l)) return {};
      const g = {};
      for (const [x, S] of Object.entries(l)) {
        if (x === "@type") {
          const z = Array.isArray(S) ? S[0] : S;
          z && (g["rdf:type"] = this._toPrefixed(String(z)));
          continue;
        }
        if (x.startsWith("@")) continue;
        let P;
        if (typeof S == "string") P = S;
        else if (S && typeof S == "object" && "@id" in S) P = S["@id"];
        else if (S && typeof S == "object" && "@value" in S) P = S["@value"];
        else continue;
        const M = Ol[x];
        g[x] = M ? M(P) : P;
      }
      return g;
    }
    const E = (g) => typeof g == "string" ? this._scalarValue(g, d) : g && typeof g == "object" && "@value" in g ? this._scalarValue(g["@value"], d) : g && typeof g == "object" && "@id" in g ? this._scalarValue(g["@id"], d) : this._scalarValue(String(g), d), w = Array.isArray(l) ? l[0] != null ? E(l[0]) : "" : E(l);
    return b ? w ? [w] : [""] : w;
  }
  // ── Turtle ─────────────────────────────────────────────────────────────────
  async _parseTurtle(l) {
    return new Promise((d, p) => {
      const b = new rl(), E = [];
      b.parse(l, (w, g) => {
        if (w) return p(w);
        g ? E.push(g) : d(E);
      });
    });
  }
  _quadsToFormData(l, d) {
    const p = /* @__PURE__ */ new Map();
    for (const M of l) {
      const z = M.subject.value;
      p.has(z) || p.set(z, []), p.get(z).push(M);
    }
    const b = Pl((d == null ? void 0 : d.rootClass) || "dcat:Dataset"), E = "http://www.w3.org/1999/02/22-rdf-syntax-ns#type";
    let w = null;
    for (const [M, z] of p)
      if (z.some((j) => j.predicate.value === E && j.object.value === b)) {
        w = M;
        break;
      }
    w || (w = [...p.keys()][0]);
    const g = p.get(w) || [], x = {};
    for (const M of g) {
      const z = this._toPrefixed(M.predicate.value);
      x[z] || (x[z] = []), x[z].push(M.object);
    }
    const S = (d == null ? void 0 : d.fields) || {}, P = {};
    for (const [M, z] of Object.entries(S)) {
      const j = x[M];
      if (!(j != null && j.length)) continue;
      const $ = this._deserializeTurtleObjects(j, z, p), tt = this._encodeIfTransformed(this._coerceToFieldType($, z), z);
      tt != null && !this._isInvalid(tt, z) && (P[M] = tt);
    }
    if (!P["dct:identifier"] && w && hi(w)) {
      const M = S["dct:identifier"];
      (!M || !this._isInvalid(w, M)) && (P["dct:identifier"] = w);
    }
    return P;
  }
  _deserializeTurtleObjects(l, d, p) {
    const { type: b, multiple: E } = d;
    if (b === "langstring") {
      const x = l.filter((P) => P.termType === "Literal" && P.value);
      if (E)
        return x.map((P) => ({ value: P.value, lang: P.language || "de" }));
      const S = {};
      for (const P of x) S[P.language || "de"] = P.value;
      return S;
    }
    if (b === "multiselect")
      return l.map((x) => x.value);
    if (b === "distribution-editor")
      return l.filter((x) => x.termType === "BlankNode" || x.termType === "NamedNode").map((x) => this._importDistributionTurtle(p.get(x.value) || [])).filter((x) => x["dcat:accessURL"]);
    if (b === "object") {
      const x = l.find((j) => j.termType === "BlankNode" || j.termType === "NamedNode");
      if (!x) return {};
      const S = p.get(x.value) || [], P = new Set((d.subFields || []).map((j) => j.id)), M = "http://www.w3.org/1999/02/22-rdf-syntax-ns#type", z = {};
      for (const j of S) {
        const $ = this._toPrefixed(j.predicate.value);
        if (j.predicate.value === M) {
          z["rdf:type"] = this._toPrefixed(j.object.value);
          continue;
        }
        if (P.size > 0 && !P.has($)) continue;
        const tt = Ol[$];
        z[$] = tt ? tt(j.object.value) : j.object.value;
      }
      return z;
    }
    const w = l.filter((x) => x.termType === "Literal" || x.termType === "NamedNode");
    if (!w.length) return E ? [""] : "";
    const g = w.map((x) => this._scalarValue(x.value, d)).filter(Boolean);
    return E ? g.length ? g : [""] : g[0] ?? "";
  }
  // ── Helpers ────────────────────────────────────────────────────────────────
  _toPrefixed(l) {
    for (const [d, p] of Object.entries(Tl))
      if (l.startsWith(p)) return `${d}:${l.slice(p.length)}`;
    return l;
  }
  _scalarValue(l, d) {
    return d.type === "date" && l.length > 10 && l[10] === "T" ? l.slice(0, 10) : l;
  }
  // Ensure the value matches what the form expects for this field type
  _coerceToFieldType(l, d) {
    const { type: p, multiple: b } = d;
    return p === "langstring" ? b ? Array.isArray(l) ? l : [{ value: String(l || ""), lang: "de" }] : typeof l != "object" || Array.isArray(l) ? { de: String(l || "") } : l : p === "multiselect" ? Array.isArray(l) ? l : l ? [String(l)] : [] : p === "distribution-editor" ? Array.isArray(l) ? l : [] : p === "object" ? typeof l != "object" || Array.isArray(l) ? {} : l : b ? Array.isArray(l) ? l : l ? [String(l)] : [""] : l != null ? String(l) : "";
  }
  _importDistributionJSONLD(l) {
    if (!l || typeof l != "object") return {};
    const d = { "rdf:type": "dcat:Distribution" };
    for (const p of Dl) {
      const b = l[p];
      if (b == null) continue;
      if (typeof b == "string") {
        d[p] = b;
        continue;
      }
      if (typeof b == "object" && "@id" in b) {
        d[p] = b["@id"];
        continue;
      }
      if (typeof b == "object" && "@value" in b) {
        d[p] = b["@value"];
        continue;
      }
      const E = Array.isArray(b) ? b[0] : null;
      E != null && (d[p] = typeof E == "string" ? E : E["@id"] || E["@value"] || "");
    }
    return d;
  }
  _importDistributionTurtle(l) {
    const d = {};
    for (const p of l) {
      const b = this._toPrefixed(p.predicate.value);
      if (!Dl.includes(b)) continue;
      let E = p.object.value;
      (b === "dct:issued" || b === "dct:modified") && E.length > 10 && (E = E.slice(0, 10)), d[b] = E;
    }
    return d;
  }
  // Apply encode transform so the stored form is validated, not the raw display form.
  // uriSuffix.encode is idempotent when the value is already a full URI.
  _encodeIfTransformed(l, d) {
    return !d.transform || l == null ? l : d.multiple && Array.isArray(l) ? l.map((p) => Xn(d.transform, p, d.transformOptions, p)) : Xn(d.transform, l, d.transformOptions, l);
  }
  // Returns true if the value should be discarded (fails validation)
  _isInvalid(l, d) {
    if (!d.validate) return !1;
    const p = Sa[d.validate];
    if (!p || d.multiple && Array.isArray(l)) return !1;
    try {
      const b = p(l, "de");
      return b && b.length > 0;
    } catch {
      return !1;
    }
  }
}
const r0 = { class: "import-body" }, a0 = { class: "file-row" }, s0 = { class: "btn-file" }, o0 = ["accept", "aria-label"], l0 = {
  key: 0,
  class: "filename",
  "aria-live": "polite"
}, u0 = ["placeholder", "aria-label", "aria-describedby"], h0 = {
  key: 0,
  id: "import-error",
  class: "import-error",
  role: "alert"
}, c0 = ["disabled"], d0 = {
  __name: "ImportPanel",
  props: {
    config: Object,
    lang: String
  },
  emits: ["import", "close"],
  setup(u, { emit: l }) {
    const { t: d } = Qe(), p = u, b = l, E = Kt("jsonld"), w = Kt(""), g = Kt(""), x = Kt(""), S = Ft(() => E.value === "jsonld" ? `{
  "@context": { ... },
  "@type": "dcat:Dataset",
  "dct:title": { "de": "...", "en": "..." },
  ...
}` : E.value === "turtle" ? `@prefix dct: <http://purl.org/dc/terms/> .
<https://...> a dcat:Dataset ;
    dct:title "..."@de .` : `<?xml version="1.0" encoding="UTF-8"?>
<rdf:RDF xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#"
         xmlns:dct="http://purl.org/dc/terms/"
         xmlns:dcat="http://www.w3.org/ns/dcat#">
  <dcat:Dataset rdf:about="https://...">
    <dct:title xml:lang="de">...</dct:title>
  </dcat:Dataset>
</rdf:RDF>`);
    function P(z) {
      const j = z.target.files[0];
      if (!j) return;
      g.value = j.name, x.value = "";
      const $ = new FileReader();
      $.onload = (tt) => {
        w.value = tt.target.result;
      }, $.readAsText(j), z.target.value = "";
    }
    async function M() {
      x.value = "";
      const z = new ou();
      try {
        let j;
        E.value === "jsonld" ? j = z.fromJSONLD(w.value, p.config) : E.value === "turtle" ? j = await z.fromTurtle(w.value, p.config) : j = z.fromRDFXML(w.value, p.config), b("import", j);
      } catch (j) {
        x.value = j.message;
      }
    }
    return (z, j) => (V(), Re(il, {
      "heading-id": "import-heading",
      title: xt(d)("btn.import"),
      "close-label": u.lang === "de" ? "Import schließen" : "Close import",
      "max-width": "700px",
      "focus-selectors": ["[role='tab']", "button"],
      onClose: j[3] || (j[3] = ($) => z.$emit("close"))
    }, {
      tabs: dn(() => [
        Qi(su, {
          modelValue: E.value,
          "onUpdate:modelValue": j[0] || (j[0] = ($) => E.value = $),
          "aria-label": u.lang === "de" ? "Importformat" : "Import format",
          tabs: [
            { id: "jsonld", label: "JSON-LD", controls: "import-panel-jsonld" },
            { id: "turtle", label: "Turtle", controls: "import-panel-turtle" },
            { id: "rdfxml", label: "RDF/XML", controls: "import-panel-rdfxml" }
          ]
        }, null, 8, ["modelValue", "aria-label"])
      ]),
      actions: dn(() => [
        H("button", {
          class: "btn-cancel",
          onClick: j[2] || (j[2] = ($) => z.$emit("close"))
        }, Q(xt(d)("btn.cancel")), 1),
        H("button", {
          class: "btn-import",
          disabled: !w.value.trim(),
          onClick: M
        }, Q(xt(d)("btn.import")), 9, c0)
      ]),
      default: dn(() => [
        H("div", r0, [
          H("div", a0, [
            H("label", s0, [
              Mi(Q(xt(d)("btn.open-file")) + " ", 1),
              H("input", {
                type: "file",
                accept: E.value === "jsonld" ? ".json,.jsonld" : E.value === "turtle" ? ".ttl,.turtle" : ".rdf,.xml",
                "aria-label": u.lang === "de" ? "RDF-Datei auswählen" : "Select RDF file",
                onChange: P
              }, null, 40, o0)
            ]),
            g.value ? (V(), q("span", l0, Q(g.value), 1)) : Ct("", !0)
          ]),
          Qo(H("textarea", {
            "onUpdate:modelValue": j[1] || (j[1] = ($) => w.value = $),
            class: "import-textarea",
            placeholder: S.value,
            "aria-label": u.lang === "de" ? "RDF-Inhalt zum Importieren" : "RDF content to import",
            "aria-describedby": x.value ? "import-error" : void 0,
            spellcheck: "false"
          }, null, 8, u0), [
            [Il, w.value]
          ]),
          x.value ? (V(), q("div", h0, "⚠ " + Q(x.value), 1)) : Ct("", !0)
        ])
      ]),
      _: 1
    }, 8, ["title", "close-label"]));
  }
}, pg = /* @__PURE__ */ oe(d0, [["__scopeId", "data-v-f43095d6"]]), f0 = { class: "standard-selector" }, p0 = ["value"], m0 = ["value"], g0 = {
  __name: "StandardSelector",
  props: {
    standards: Array,
    modelValue: String,
    label: { type: String, default: "Standard:" }
  },
  emits: ["update:modelValue"],
  setup(u) {
    return (l, d) => (V(), q("div", f0, [
      H("label", null, Q(u.label), 1),
      H("select", {
        value: u.modelValue,
        onChange: d[0] || (d[0] = (p) => l.$emit("update:modelValue", p.target.value))
      }, [
        (V(!0), q(It, null, ae(u.standards, (p) => (V(), q("option", {
          key: p.id,
          value: p.id
        }, Q(p.label), 9, m0))), 128))
      ], 40, p0)
    ]));
  }
}, mg = /* @__PURE__ */ oe(g0, [["__scopeId", "data-v-5b12c43c"]]), Ye = "http://www.w3.org/ns/shacl#", Ma = "http://www.w3.org/1999/02/22-rdf-syntax-ns#", Wn = "http://www.w3.org/2001/XMLSchema#", _0 = "https://piveau.eu/ns/voc#", y0 = {
  [`${Wn}string`]: "text",
  [`${Wn}date`]: "date",
  [`${Wn}dateTime`]: "date",
  [`${Wn}anyURI`]: "uri",
  [`${Ma}langString`]: "langstring",
  [`${Wn}integer`]: "text",
  [`${Wn}decimal`]: "text",
  [`${Wn}nonNegativeInteger`]: "text"
};
class v0 {
  async parse(l) {
    var w;
    const d = await ru(l), p = {};
    for (const [g, x] of d.entries()) {
      if (!x.filter((j) => j.p === `${Ma}type`).map((j) => j.o.value).includes(`${Ye}NodeShape`)) continue;
      const P = (w = x.find((j) => j.p === `${Ye}targetClass`)) == null ? void 0 : w.o.value, M = x.filter((j) => j.p === `${Ye}property`).map((j) => j.o.value), z = {};
      for (const j of M) {
        const $ = d.get(j) || [], tt = b0($, d);
        tt && (z[tt.id] = tt);
      }
      p[g] = { subject: g, targetClass: P, fields: z };
    }
    const b = /* @__PURE__ */ new Set();
    for (const g of Object.values(p))
      for (const x of Object.values(g.fields)) {
        if (!x._linkedShape) continue;
        const S = x._linkedShape;
        delete x._linkedShape;
        const P = p[S];
        P && (x.subFields = Object.values(P.fields), b.add(S));
      }
    const E = {};
    for (const [g, x] of Object.entries(p)) {
      const S = x.targetClass || g;
      E[S] = {
        targetClass: x.targetClass,
        fields: x.fields,
        embedded: b.has(g)
      };
    }
    return E;
  }
}
function ba(u, l, d) {
  const p = u.filter((E) => E.p === l);
  if (d) {
    const E = p.find((w) => w.o.language === d);
    if (E) return E.o.value;
  }
  const b = p[0];
  return b ? b.o.value : null;
}
function b0(u, l) {
  var zt, Et, ee, Dt, Ut, ne;
  const d = u.find((Zt) => Zt.p === `${Ye}path`);
  if (!d) return null;
  const p = d.o.value, b = Ta(p), E = ba(u, `${Ye}name`, "de"), w = ba(u, `${Ye}name`, "en"), g = ba(u, `${Ye}name`, null), x = ba(u, `${Ye}description`, "de"), S = ba(u, `${Ye}description`, "en"), P = (zt = u.find((Zt) => Zt.p === `${Ye}datatype`)) == null ? void 0 : zt.o.value, M = (Et = u.find((Zt) => Zt.p === `${Ye}nodeKind`)) == null ? void 0 : Et.o.value, z = parseInt(((ee = u.find((Zt) => Zt.p === `${Ye}minCount`)) == null ? void 0 : ee.o.value) || "0"), j = (Dt = u.find((Zt) => Zt.p === `${Ye}maxCount`)) == null ? void 0 : Dt.o.value, $ = parseFloat(((Ut = u.find((Zt) => Zt.p === `${Ye}order`)) == null ? void 0 : Ut.o.value) || "999"), tt = u.filter((Zt) => Zt.p === `${Ye}in`), ut = x0(tt, l), ft = (ne = u.find((Zt) => Zt.p === `${_0}mappingLink`)) == null ? void 0 : ne.o.value;
  let At = "text";
  ft ? At = "object" : ut.length > 0 ? At = "select" : P ? At = y0[P] || "text" : M === `${Ye}IRI` && (At = "uri");
  const Rt = {
    id: b,
    path: p,
    label: { de: E || g || b, en: w || g || b },
    hint: { de: x || "", en: S || "" },
    type: At,
    required: z > 0,
    // absence of sh:maxCount means unbounded → multiple: true
    multiple: j === void 0 || parseInt(j) !== 1,
    order: $,
    options: ut,
    visible: !0
  };
  return ft && (Rt._linkedShape = ft), Rt;
}
function x0(u, l) {
  const d = [];
  for (const p of u) lu(p.o.value, l, d);
  return d;
}
function lu(u, l, d) {
  if (!u || u === `${Ma}nil`) return;
  const p = l.get(u) || [], b = p.find((w) => w.p === `${Ma}first`), E = p.find((w) => w.p === `${Ma}rest`);
  if (b) {
    const w = b.o.value;
    d.push({ value: w, label: { de: Ta(w), en: Ta(w) } });
  }
  E && lu(E.o.value, l, d);
}
class w0 {
  constructor() {
    this._cache = /* @__PURE__ */ new Map();
  }
  async load(l, d) {
    if (this._cache.has(l)) return this._cache.get(l);
    try {
      const p = await fetch(l);
      if (!p.ok) throw new Error(`HTTP ${p.status}`);
      const b = await p.json(), E = this._normalize(b);
      return this._cache.set(l, E), E;
    } catch (p) {
      if (d)
        return console.warn(`[VocabularyLoader] Primary source failed (${l}): ${p.message} — trying fallback`), this.load(d);
      throw new Error(`Failed to load vocabulary from ${l}: ${p.message}`);
    }
  }
  _normalize(l) {
    var d;
    return (d = l == null ? void 0 : l.results) != null && d.bindings ? this._normalizeSparql(l.results.bindings) : l != null && l["@graph"] ? this._normalizeJsonLD(l["@graph"]) : Array.isArray(l) ? l.map((p) => p.value !== void 0 && typeof p.value == "string" ? p : p.uri !== void 0 ? { value: p.uri, label: p.prefLabel || {} } : null).filter(Boolean) : [];
  }
  _normalizeJsonLD(l) {
    return l.flatMap((d) => {
      const p = d["@id"];
      if (!p) return [];
      const b = d["skos:prefLabel"] || d["http://www.w3.org/2004/02/skos/core#prefLabel"] || [], E = {}, w = Array.isArray(b) ? b : [b];
      for (const g of w) {
        const x = g["@language"], S = g["@value"];
        x && S && (E[x] = S);
      }
      return Object.keys(E).length ? [{ value: p, label: E }] : [];
    });
  }
  _normalizeSparql(l) {
    var p, b, E, w;
    const d = /* @__PURE__ */ new Map();
    for (const g of l) {
      const x = ((p = g.concept) == null ? void 0 : p.value) || ((b = g.uri) == null ? void 0 : b.value), S = (E = g.label) == null ? void 0 : E["xml:lang"], P = (w = g.label) == null ? void 0 : w.value;
      !x || !S || !P || (d.has(x) || d.set(x, { value: x, label: {} }), d.get(x).label[S] = P);
    }
    return [...d.values()];
  }
}
class uu {
  async resolveFields(l, d, { translations: p = {} } = {}) {
    const b = await this.loadSHACL(d.shaclSource || l), w = await new v0().parse(b), g = d.rootClass, x = {};
    for (const z of Object.values(w))
      z.embedded || g && z.targetClass && Ta(z.targetClass) !== g || Object.assign(x, z.fields);
    const S = { ...x }, P = d.fields || {};
    for (const [z, j] of Object.entries(P))
      S[z] ? S[z] = {
        ...S[z],
        ...j,
        label: { ...S[z].label, ...j.label || {} },
        hint: { ...S[z].hint, ...j.hint || {} }
      } : S[z] = { id: z, type: "text", visible: !0, order: 999, ...j };
    for (const [z, j] of Object.entries(p))
      for (const [$, tt] of Object.entries(S))
        for (const ut of ["label", "hint", "placeholder"]) {
          const ft = j[`${l}.field.${$}.${ut}`] ?? j[`field.${$}.${ut}`];
          ft != null && (tt[ut] = { ...tt[ut] || {}, [z]: ft });
        }
    const M = await this.resolveVocabularies(S);
    return { mergedFields: S, vocabWarnings: M };
  }
  async resolveVocabularies(l) {
    const d = new w0(), p = [], b = [], E = (w, g) => {
      g.optionsSource && b.push(
        d.load(g.optionsSource, g.optionsSourceFallback).then((x) => {
          g.options = [...x, ...g.options || []];
        }).catch((x) => {
          console.warn(`[VocabularyLoader] ${w}: ${x.message}`), p.push({ field: w, message: x.message });
        })
      );
      for (const x of g.subFields || [])
        E(`${w}.${x.id}`, x);
    };
    for (const [w, g] of Object.entries(l))
      E(w, g);
    return await Promise.all(b), p;
  }
  async loadSHACL(l) {
    const d = await fetch(Br(`shacl/${l}.ttl`));
    if (!d.ok) throw new Error(`Failed to load SHACL for ${l}`);
    return d.text();
  }
}
class gg extends uu {
  // translations: optional object keyed by language code, each value a flat
  // { 'field.dct:title.label': 'Titel', 'group.basic.label': 'Grunddaten', … }
  // Standard-scoped keys override generic ones:
  //   'dcat-ap-at-catalogue.field.dct:title.label' overrides 'field.dct:title.label'
  async resolve(l, { translations: d = {} } = {}) {
    const p = await this.loadUIConfig(l), { mergedFields: b, vocabWarnings: E } = await this.resolveFields(l, p, { translations: d }), w = (p.groups || []).map((g) => {
      const x = {
        ...g,
        fields: g.fields.filter((S) => b[S] && b[S].visible !== !1)
      };
      for (const [S, P] of Object.entries(d)) {
        const M = P[`${l}.group.${g.id}.label`] ?? P[`group.${g.id}.label`];
        M != null && (x.label = { ...x.label || {}, [S]: M });
      }
      return x;
    });
    return {
      standard: l,
      version: p.version,
      rootClass: p.rootClass || "dcat:Dataset",
      groups: w,
      fields: b,
      vocabWarnings: E
    };
  }
  async loadUIConfig(l) {
    const d = await fetch(Br(`config/ui-config.${l}.json`));
    if (!d.ok) throw new Error(`Failed to load UI config for ${l}`);
    return d.json();
  }
}
function L0(u) {
  const l = Kt({});
  async function d(p) {
    try {
      const b = await fetch(Br(`translations/${p}.json`));
      if (!b.ok) return;
      l.value = { ...l.value, [p]: await b.json() };
    } catch {
    }
  }
  return wl("onto-form:lang", u), wl("onto-form:translations", Ft(() => l.value[u.value] ?? {})), { allTranslations: l, loadTranslations: d };
}
class k0 extends uu {
  // translations: optional object keyed by language code, each value a flat
  // { 'field.dct:title.label': 'Titel', 'section.basic.label': 'Grunddaten', … }
  // Standard-scoped keys override generic ones:
  //   'dcat-ap-at.field.dct:title.label' overrides 'field.dct:title.label'
  async resolve(l, { translations: d = {} } = {}) {
    const p = await this.loadUIConfig(l), { mergedFields: b, vocabWarnings: E } = await this.resolveFields(l, p, { translations: d }), w = (p.sections || []).map((g) => {
      if (g.type === "section") {
        const x = {
          ...g,
          fields: (g.fields || []).filter((S) => b[S] && b[S].visible !== !1)
        };
        for (const [S, P] of Object.entries(d)) {
          const M = P[`${l}.section.${g.id}.label`] ?? P[`section.${g.id}.label`];
          M != null && (x.label = { ...x.label || {}, [S]: M });
        }
        return x;
      } else if (g.type === "tabs") {
        const x = (g.tabs || []).map((S) => {
          const P = {
            ...S,
            fields: (S.fields || []).filter((M) => b[M] && b[M].visible !== !1),
            sections: S.sections ? S.sections.map((M) => ({
              ...M,
              fields: (M.fields || []).filter((z) => b[z] && b[z].visible !== !1)
            })) : void 0
          };
          for (const [M, z] of Object.entries(d)) {
            const j = z[`${l}.tab.${S.id}.label`] ?? z[`tab.${S.id}.label`];
            j != null && (P.label = { ...P.label || {}, [M]: j });
          }
          return P;
        });
        return { ...g, tabs: x };
      }
      return g;
    });
    return {
      standard: l,
      version: p.version,
      rootClass: p.rootClass || "dcat:Dataset",
      sections: w,
      fields: b,
      vocabWarnings: E
    };
  }
  async loadUIConfig(l) {
    const [d, p] = await Promise.all([
      fetch(Br(`config/ui-view-config.${l}.json`)),
      fetch(Br(`config/ui-config.${l}.json`))
    ]), b = p.ok ? await p.json() : null;
    if (d.ok) {
      const E = await d.json();
      return b && (E.fields = { ...b.fields || {}, ...E.fields || {} }), E;
    }
    if (!b) throw new Error(`No view config found for ${l}`);
    return {
      standard: l,
      version: b.version,
      rootClass: b.rootClass,
      shaclSource: b.shaclSource ?? l,
      sections: (b.groups || []).map((E) => ({ ...E, type: "section" })),
      fields: b.fields ?? {}
    };
  }
}
const C0 = { class: "text-view" }, E0 = {
  key: 0,
  class: "multiline"
}, M0 = {
  key: 1,
  class: "inline"
}, B0 = {
  __name: "TextView",
  props: {
    field: { type: Object, required: !0 },
    modelValue: { required: !0 },
    lang: { type: String, required: !0 }
  },
  setup(u) {
    const l = u, d = Ft(() => Array.isArray(l.modelValue) ? l.modelValue.filter(Boolean).join(", ") : l.modelValue ?? "");
    return (p, b) => (V(), q("div", C0, [
      u.field.multiline ? (V(), q("pre", E0, Q(d.value), 1)) : (V(), q("span", M0, Q(d.value), 1))
    ]));
  }
}, Mr = /* @__PURE__ */ oe(B0, [["__scopeId", "data-v-da8ef62d"]]);
function hu(u, l) {
  if (!u) return "";
  try {
    const d = new Date(u);
    if (isNaN(d.getTime())) return u;
    const p = l === "de" ? "de-AT" : "en-GB";
    return d.toLocaleDateString(p, { year: "numeric", month: "long", day: "numeric" });
  } catch {
    return u;
  }
}
const A0 = { class: "date-view" }, S0 = {
  __name: "DateView",
  props: {
    field: { type: Object, required: !0 },
    modelValue: { required: !0 },
    lang: { type: String, required: !0 }
  },
  setup(u) {
    const l = u, d = Ft(() => hu(l.modelValue, l.lang));
    return (p, b) => (V(), q("span", A0, Q(d.value), 1));
  }
}, cu = /* @__PURE__ */ oe(S0, [["__scopeId", "data-v-5481964a"]]), P0 = { class: "uri-view" }, T0 = ["href"], D0 = ["href"], O0 = {
  __name: "URIView",
  props: {
    field: { type: Object, required: !0 },
    modelValue: { required: !0 },
    lang: { type: String, required: !0 }
  },
  setup(u) {
    function l(d) {
      if (!d || d.length < 60) return d;
      try {
        const b = new URL(d).pathname.split("/").filter(Boolean);
        return b.length ? b[b.length - 1] : d;
      } catch {
        return d;
      }
    }
    return (d, p) => (V(), q("div", P0, [
      Array.isArray(u.modelValue) ? (V(!0), q(It, { key: 0 }, ae(u.modelValue, (b, E) => (V(), q("a", {
        key: E,
        href: b,
        target: "_blank",
        rel: "noopener noreferrer",
        class: "uri-link"
      }, Q(l(b)), 9, T0))), 128)) : u.modelValue ? (V(), q("a", {
        key: 1,
        href: u.modelValue,
        target: "_blank",
        rel: "noopener noreferrer",
        class: "uri-link"
      }, Q(l(u.modelValue)), 9, D0)) : Ct("", !0)
    ]));
  }
}, du = /* @__PURE__ */ oe(O0, [["__scopeId", "data-v-0eb669cb"]]), I0 = { class: "select-view" }, F0 = {
  __name: "SelectView",
  props: {
    field: { type: Object, required: !0 },
    modelValue: { required: !0 },
    lang: { type: String, required: !0 }
  },
  setup(u) {
    const l = u, d = Ft(() => {
      var b, E, w;
      const p = (l.field.options || []).find((g) => g.value === l.modelValue);
      return p && (((b = p.label) == null ? void 0 : b[l.lang]) || ((E = p.label) == null ? void 0 : E.de) || ((w = p.label) == null ? void 0 : w.en) || p.label) || l.modelValue;
    });
    return (p, b) => (V(), q("span", I0, Q(d.value), 1));
  }
}, Zs = /* @__PURE__ */ oe(F0, [["__scopeId", "data-v-aa0b5182"]]), R0 = {
  key: 0,
  class: "chips"
}, z0 = {
  __name: "MultiSelectView",
  props: {
    field: { type: Object, required: !0 },
    modelValue: { required: !0 },
    lang: { type: String, required: !0 }
  },
  setup(u) {
    const l = u, d = Ft(() => (Array.isArray(l.modelValue) ? l.modelValue : l.modelValue ? [l.modelValue] : []).map((b) => {
      var w, g, x;
      const E = (l.field.options || []).find((S) => S.value === b);
      return E && (((w = E.label) == null ? void 0 : w[l.lang]) || ((g = E.label) == null ? void 0 : g.de) || ((x = E.label) == null ? void 0 : x.en) || E.label) || b;
    }));
    return (p, b) => d.value.length ? (V(), q("div", R0, [
      (V(!0), q(It, null, ae(d.value, (E, w) => (V(), q("span", {
        key: w,
        class: "chip"
      }, Q(E), 1))), 128))
    ])) : Ct("", !0);
  }
}, N0 = /* @__PURE__ */ oe(z0, [["__scopeId", "data-v-ef8d75f2"]]);
function Er(u, l) {
  var d;
  return u ? typeof u == "string" ? u : Array.isArray(u) ? ((d = u.find((b) => b.lang === l) || u[0]) == null ? void 0 : d.value) || "" : typeof u == "object" ? u[l] || u.de || u.en || Object.values(u)[0] || "" : String(u) : "";
}
const j0 = { class: "langstring-view" }, V0 = { class: "langstring-value" }, $0 = { class: "langstring-value" }, U0 = { class: "langstring-lang" }, G0 = { class: "langstring-value" }, Z0 = {
  key: 0,
  class: "langstring-lang"
}, q0 = {
  key: 1,
  class: "langstring-item"
}, H0 = { class: "langstring-value" }, K0 = {
  key: 0,
  class: "langstring-lang"
}, W0 = { class: "langstring-value" }, J0 = { class: "langstring-value" }, X0 = { class: "langstring-lang" }, Y0 = { key: 3 }, Q0 = {
  __name: "LangStringView",
  props: {
    field: { type: Object, required: !0 },
    modelValue: { required: !0 },
    lang: { type: String, required: !0 }
  },
  setup(u) {
    const l = u, d = Ft(
      () => Array.isArray(l.modelValue) ? l.modelValue.filter((g) => g.lang === l.lang) : []
    ), p = Ft(
      () => Array.isArray(l.modelValue) ? l.modelValue.filter((g) => g.lang !== l.lang) : []
    ), b = Ft(() => {
      const g = l.modelValue;
      return !g || typeof g != "object" ? "" : Er(g, l.lang);
    }), E = Ft(() => {
      const g = l.modelValue;
      if (!g || typeof g != "object") return {};
      const x = b.value;
      return Object.fromEntries(
        Object.entries(g).filter(([S, P]) => S !== l.lang && P && P !== x)
      );
    }), w = Ft(() => Object.keys(E.value).length > 0);
    return (g, x) => (V(), q("div", j0, [
      Array.isArray(u.modelValue) ? (V(), q(It, { key: 0 }, [
        d.value.length ? (V(), q(It, { key: 0 }, [
          (V(!0), q(It, null, ae(d.value, (S, P) => (V(), q("div", {
            key: P,
            class: "langstring-item"
          }, [
            H("span", V0, Q(S.value), 1)
          ]))), 128)),
          (V(!0), q(It, null, ae(p.value, (S, P) => (V(), q("div", {
            key: "other-" + P,
            class: "langstring-item muted"
          }, [
            H("span", $0, Q(S.value), 1),
            H("span", U0, "(" + Q(S.lang) + ")", 1)
          ]))), 128))
        ], 64)) : (V(!0), q(It, { key: 1 }, ae(u.modelValue, (S, P) => (V(), q("div", {
          key: P,
          class: "langstring-item"
        }, [
          H("span", G0, Q(S.value), 1),
          S.lang ? (V(), q("span", Z0, "(" + Q(S.lang) + ")", 1)) : Ct("", !0)
        ]))), 128))
      ], 64)) : u.modelValue && typeof u.modelValue == "object" && "value" in u.modelValue && "lang" in u.modelValue ? (V(), q("div", q0, [
        H("span", H0, Q(u.modelValue.value), 1),
        u.modelValue.lang !== u.lang ? (V(), q("span", K0, "(" + Q(u.modelValue.lang) + ")", 1)) : Ct("", !0)
      ])) : u.modelValue && typeof u.modelValue == "object" ? (V(), q(It, { key: 2 }, [
        H("span", W0, Q(b.value), 1),
        w.value ? (V(!0), q(It, { key: 0 }, ae(E.value, (S, P) => (V(), q("div", {
          key: P,
          class: "langstring-item muted"
        }, [
          H("span", J0, Q(S), 1),
          H("span", X0, "(" + Q(P) + ")", 1)
        ]))), 128)) : Ct("", !0)
      ], 64)) : (V(), q("span", Y0, Q(u.modelValue), 1))
    ]));
  }
}, fu = /* @__PURE__ */ oe(Q0, [["__scopeId", "data-v-ab1576d4"]]), tm = {
  key: 0,
  class: "map-view"
}, em = { class: "map-footer" }, im = {
  key: 0,
  class: "bbox-info"
}, nm = { class: "bbox-label" }, rm = ["aria-label"], am = {
  key: 1,
  class: "map-empty"
}, sm = {
  __name: "MapView",
  props: {
    field: { type: Object, required: !0 },
    modelValue: { required: !0 },
    lang: { type: String, required: !0 }
  },
  setup(u) {
    delete Ii.Icon.Default.prototype._getIconUrl, Ii.Icon.Default.mergeOptions({
      iconRetinaUrl: new URL("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAABSCAMAAAAhFXfZAAAC91BMVEVMaXEzeak2f7I4g7g3g7cua5gzeKg8hJo3grY4g7c3grU0gLI2frE0daAubJc2gbQwd6QzeKk2gLMtd5sxdKIua5g1frA2f7IydaM0e6w2fq41fK01eqo3grgubJgta5cxdKI1f7AydaQydaMxc6EubJgvbJkwcZ4ubZkwcJwubZgubJcydqUydKIxapgubJctbJcubZcubJcvbJYubJcvbZkubJctbJctbZcubJg2f7AubJcrbZcubJcubJcua5g3grY0fq8ubJcubJdEkdEwhsw6i88vhswuhcsuhMtBjMgthMsrg8srgss6is8qgcs8i9A9iMYtg8spgcoogMo7hcMngMonf8olfso4gr8kfck5iM8jfMk4iM8he8k1fro7itAgesk2hs8eecgzfLcofssdeMg0hc4cd8g2hcsxeLQbdsgZdcgxeLImfcszhM0vda4xgckzhM4xg84wf8Yxgs4udKsvfcQucqhUndROmdM1fK0wcZ8vb5w0eqpQm9MzeKhXoNVcpdYydKNWn9VZotVKltJFjsIwcJ1Rms9OlslLmtH///8+kc9epdYzd6dbo9VHkMM2f7FHmNBClM8ydqVcpNY9hro3gLM9hLczealQmcw3fa46f7A8gLMxc6I3eagyc6FIldJMl9JSnNRSntNNl9JPnNJFi75UnM9ZodVKksg8kM45jc09e6ZHltFBk883gbRBh7pDk9EwcaBzn784g7dKkcY2i81Om9M7j85Llc81is09g7Q4grY/j9A0eqxKmdFFltBEjcXf6fFImdBCiLxJl9FGlNFBi78yiMxVndEvbpo6js74+vx+psPP3+o/ks5HkcpGmNCjwdZCkNDM3ehYoNJEls+lxNkxh8xHks0+jdC1zd5Lg6r+/v/H2ufz9/o3jM3t8/edvdM/k89Th61OiLBSjbZklbaTt9BfptdjmL1AicBHj8hGk9FAgK1dkLNTjLRekrdClc/k7fM0icy0y9tgp9c4jc2NtM9Dlc8zicxeXZn3AAAAQ3RSTlMAHDdTb4yPA+LtnEQmC4L2EmHqB7XA0d0sr478x4/Yd5i1zOfyPkf1sLVq4Nh3FvjxopQ2/STNuFzUwFIwxKaejILpIBEV9wAABhVJREFUeF6s1NdyFEcYBeBeoQIhRAkLlRDGrhIgY3BJL8CVeKzuyXFzzjkn5ZxzzuScg3PO8cKzu70JkO0LfxdTU//pM9vTu7Xgf6KqOVTb9X7toRrVEfBf1HTVjZccrT/2by1VV928Yty9ZbVuucdz90frG8DBjl9pVApbOstvmMuvVgaNXSfAAd6pGxpy6yxf5ph43pS/4f3uoaGm2rdu72S9xzOvMymkZFq/ptDrk90mhW7e4zl7HLzhxGWPR20xmSxJ/VqldG5m9XhaVOA1DadsNh3Pu5L2N6QtPO/32JpqQBVVk20oy/Pi2s23WEvyfHbe1thadVQttvm7Llf65gGmXK67XtupyoM7HQhmXdLS8oGWJNeOJ3C5fG5XCEJnkez3/oFdsvgJ4l2ANZwhrJKk/7OSXa+3Vw2WJMlKnGkobouYk6T0TyX30klOUnTD9HJ5qpckL3EW/w4XF3Xd0FGywXUrstrclVsqz5Pd/sXFYyDnPdrLcQODmGOK47IZb4CmibmMn+MYRzFZ5jg33ZL/EJrWcszHmANy3ARBK/IXtciJy8VsitPSdE3uuHxzougojcUdr8/32atnz/ev3f/K5wtpxUTpcaI45zusVDpYtZi+jg0oU9b3x74h7+n9ABvYEZeKaVq0sh0AtLKsFtqNBdeT0MrSzwwlq9+x6xAO4tgOtSzbCjrNQQiNvQUbUEubvzBUeGw26yDCsRHCoLkTHDa7IdOLIThs/gHvChszh2CimE8peRs47cxANI0lYNB5y1DljpOF0IhzBDPOZnDOqYYbeGKECbPzWnXludPphw5c2YBq5zlwXphIbO4VDCZ0gnPfUO1TwZoYwAs2ExPCedAu9DAjfQUjzITQb3jNj0KG2Sgt6BHaQUdYzWz+XmBktOHwanXjaSTcwwziBcuMOtwBmqPrTOxFQR/DRKKPqyur0aiW6cULYsx6tBm0jXpR/AUWR6HRq9WVW6MRhIq5jLyjbaCTDCijyYJNpCajdyobP/eTw0iexBAKkJ3gA5KcQb2zBXsIBckn+xVv8jkZSaEFHE+jFEleAEfayRU0MouNoBmB/L50Ai/HSLIHxcrpCvnhSQAuakKp2C/YbCylJjXRVy/z3+Kv/RrNcCo+WUzlVEhzKffnTQnxeN9fWF88fiNCUdSTsaufaChKWInHeysygfpIqagoakW+vV20J8uyl6TyNKEZWV4oRSPyCkWpgOLSbkCObT8o2r6tlG58HQquf6O0v50tB7JM7F4EORd2dx/K0w/KHsVkLPaoYrwgP/y7krr3SSMA4zj+OBgmjYkxcdIJQyQRKgg2viX9Hddi9UBb29LrKR7CVVEEEXWojUkXNyfTNDE14W9gbHJNuhjDettN3ZvbOvdOqCD3Jp/9l+/wJE+9PkYGjx/fqkys3S2rMozM/o2106rfMUINo6hVqz+eu/hd1c4xTg0TAfy5kV+4UG6+IthHTU9woWmxuKNbTfuCSfovBCxq7EtHqvYL4Sm6F8GVxsSXHMQ07TOi1DKtZxjWaaIyi4CXWjxPccUw8WVbMYY5wxC1mzEyXMJWkllpRloi+Kkoq69sxBTlElF6aAxYUbjXNlhlDZilDnM4U5SlN5biRsRHnbx3mbeWjEh4mEyiuJDl5XcWVmX5GvNkFgLWZM5qwsop4/AWfLhU1cR7k1VVvcYCWRkOI6Xy5gmnphCYIkvzuNYzHzosq2oNk2RtSs8khfUOfHIDgR6ysYBaMpl4uEgk2U/oJTs9AaTSwma7dT69geAE2ZpEjUsn2ieJNHeKfrI3EcAGJ2ZaNgVuC8EBctCLc57P5u5led6IOBkIYkuQMrmmjChs4VkfOerHqSBkPzZlhe06RslZ3zMjk2sscqKwY0RcjKK+LWbzd7KiHhkncs/siFJ+V5eXxD34B8nVuJEpGJNmxN2gH3vSvp7J70tF+D1Ej8qUJD1TkErAND2GZwTFg/LubvmgiBG3SOvdlsqFQrkEzJCL1rstlnVFROixZoDDSuXQFHESwVGlcuQcMb/b42NgjLowh5MTDFE3vNB5qStRIErdCQEh6pLPR92anSUb/wAIhldAaDMpGgAAAABJRU5ErkJggg==", import.meta.url).href,
      iconUrl: new URL("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAApCAYAAADAk4LOAAAFgUlEQVR4Aa1XA5BjWRTN2oW17d3YaZtr2962HUzbDNpjszW24mRt28p47v7zq/bXZtrp/lWnXr337j3nPCe85NcypgSFdugCpW5YoDAMRaIMqRi6aKq5E3YqDQO3qAwjVWrD8Ncq/RBpykd8oZUb/kaJutow8r1aP9II0WmLKLIsJyv1w/kqw9Ch2MYdB++12Onxee/QMwvf4/Dk/Lfp/i4nxTXtOoQ4pW5Aj7wpici1A9erdAN2OH64x8OSP9j3Ft3b7aWkTg/Fm91siTra0f9on5sQr9INejH6CUUUpavjFNq1B+Oadhxmnfa8RfEmN8VNAsQhPqF55xHkMzz3jSmChWU6f7/XZKNH+9+hBLOHYozuKQPxyMPUKkrX/K0uWnfFaJGS1QPRtZsOPtr3NsW0uyh6NNCOkU3Yz+bXbT3I8G3xE5EXLXtCXbbqwCO9zPQYPRTZ5vIDXD7U+w7rFDEoUUf7ibHIR4y6bLVPXrz8JVZEql13trxwue/uDivd3fkWRbS6/IA2bID4uk0UpF1N8qLlbBlXs4Ee7HLTfV1j54APvODnSfOWBqtKVvjgLKzF5YdEk5ewRkGlK0i33Eofffc7HT56jD7/6U+qH3Cx7SBLNntH5YIPvODnyfIXZYRVDPqgHtLs5ABHD3YzLuespb7t79FY34DjMwrVrcTuwlT55YMPvOBnRrJ4VXTdNnYug5ucHLBjEpt30701A3Ts+HEa73u6dT3FNWwflY86eMHPk+Yu+i6pzUpRrW7SNDg5JHR4KapmM5Wv2E8Tfcb1HoqqHMHU+uWDD7zg54mz5/2BSnizi9T1Dg4QQXLToGNCkb6tb1NU+QAlGr1++eADrzhn/u8Q2YZhQVlZ5+CAOtqfbhmaUCS1ezNFVm2imDbPmPng5wmz+gwh+oHDce0eUtQ6OGDIyR0uUhUsoO3vfDmmgOezH0mZN59x7MBi++WDL1g/eEiU3avlidO671bkLfwbw5XV2P8Pzo0ydy4t2/0eu33xYSOMOD8hTf4CrBtGMSoXfPLchX+J0ruSePw3LZeK0juPJbYzrhkH0io7B3k164hiGvawhOKMLkrQLyVpZg8rHFW7E2uHOL888IBPlNZ1FPzstSJM694fWr6RwpvcJK60+0HCILTBzZLFNdtAzJaohze60T8qBzyh5ZuOg5e7uwQppofEmf2++DYvmySqGBuKaicF1blQjhuHdvCIMvp8whTTfZzI7RldpwtSzL+F1+wkdZ2TBOW2gIF88PBTzD/gpeREAMEbxnJcaJHNHrpzji0gQCS6hdkEeYt9DF/2qPcEC8RM28Hwmr3sdNyht00byAut2k3gufWNtgtOEOFGUwcXWNDbdNbpgBGxEvKkOQsxivJx33iow0Vw5S6SVTrpVq11ysA2Rp7gTfPfktc6zhtXBBC+adRLshf6sG2RfHPZ5EAc4sVZ83yCN00Fk/4kggu40ZTvIEm5g24qtU4KjBrx/BTTH8ifVASAG7gKrnWxJDcU7x8X6Ecczhm3o6YicvsLXWfh3Ch1W0k8x0nXF+0fFxgt4phz8QvypiwCCFKMqXCnqXExjq10beH+UUA7+nG6mdG/Pu0f3LgFcGrl2s0kNNjpmoJ9o4B29CMO8dMT4Q5ox8uitF6fqsrJOr8qnwNbRzv6hSnG5wP+64C7h9lp30hKNtKdWjtdkbuPA19nJ7Tz3zR/ibgARbhb4AlhavcBebmTHcFl2fvYEnW0ox9xMxKBS8btJ+KiEbq9zA4RthQXDhPa0T9TEe69gWupwc6uBUphquXgf+/FrIjweHQS4/pduMe5ERUMHUd9xv8ZR98CxkS4F2n3EUrUZ10EYNw7BWm9x1GiPssi3GgiGRDKWRYZfXlON+dfNbM+GgIwYdwAAAAASUVORK5CYII=", import.meta.url).href,
      shadowUrl: new URL("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACkAAAApCAQAAAACach9AAACMUlEQVR4Ae3ShY7jQBAE0Aoz/f9/HTMzhg1zrdKUrJbdx+Kd2nD8VNudfsL/Th///dyQN2TH6f3y/BGpC379rV+S+qqetBOxImNQXL8JCAr2V4iMQXHGNJxeCfZXhSRBcQMfvkOWUdtfzlLgAENmZDcmo2TVmt8OSM2eXxBp3DjHSMFutqS7SbmemzBiR+xpKCNUIRkdkkYxhAkyGoBvyQFEJEefwSmmvBfJuJ6aKqKWnAkvGZOaZXTUgFqYULWNSHUckZuR1HIIimUExutRxwzOLROIG4vKmCKQt364mIlhSyzAf1m9lHZHJZrlAOMMztRRiKimp/rpdJDc9Awry5xTZCte7FHtuS8wJgeYGrex28xNTd086Dik7vUMscQOa8y4DoGtCCSkAKlNwpgNtphjrC6MIHUkR6YWxxs6Sc5xqn222mmCRFzIt8lEdKx+ikCtg91qS2WpwVfBelJCiQJwvzixfI9cxZQWgiSJelKnwBElKYtDOb2MFbhmUigbReQBV0Cg4+qMXSxXSyGUn4UbF8l+7qdSGnTC0XLCmahIgUHLhLOhpVCtw4CzYXvLQWQbJNmxoCsOKAxSgBJno75avolkRw8iIAFcsdc02e9iyCd8tHwmeSSoKTowIgvscSGZUOA7PuCN5b2BX9mQM7S0wYhMNU74zgsPBj3HU7wguAfnxxjFQGBE6pwN+GjME9zHY7zGp8wVxMShYX9NXvEWD3HbwJf4giO4CFIQxXScH1/TM+04kkBiAAAAAElFTkSuQmCC", import.meta.url).href
    });
    const l = u, { t: d } = Qe(), p = Kt(!1), b = Kt(null);
    let E = null, w = null;
    const g = Ft(() => {
      const P = l.modelValue;
      if (!P || typeof P != "string") return null;
      const M = [...P.matchAll(/(-?\d+(?:\.\d+)?)\s+(-?\d+(?:\.\d+)?)/g)];
      if (M.length < 2) return null;
      const z = M.map(($) => parseFloat($[1])), j = M.map(($) => parseFloat($[2]));
      return {
        minLat: Math.min(...j).toFixed(6),
        maxLat: Math.max(...j).toFixed(6),
        minLon: Math.min(...z).toFixed(6),
        maxLon: Math.max(...z).toFixed(6)
      };
    });
    function x(P) {
      if (!E || (w && (w.remove(), w = null), !P)) return;
      const M = P.match(/POLYGON\s*\(\(([^)]+)\)\)/i);
      if (M) {
        const j = M[1].split(",").map(($) => {
          const [tt, ut] = $.trim().split(/\s+/).map(Number);
          return [ut, tt];
        });
        w = Ii.polygon(j, { color: "#2878a8", weight: 2, fillOpacity: 0.15 }).addTo(E), E.fitBounds(w.getBounds(), { padding: [20, 20] });
        return;
      }
      const z = P.match(/POINT\s*\((-?\d+(?:\.\d+)?)\s+(-?\d+(?:\.\d+)?)\)/i);
      if (z) {
        const [, j, $] = z;
        w = Ii.circleMarker([parseFloat($), parseFloat(j)], { radius: 8, color: "#2878a8" }).addTo(E), E.setView([parseFloat($), parseFloat(j)], 10);
      }
    }
    Ar(() => {
      E = Ii.map(b.value, { zoomControl: !0, attributionControl: !0 }).setView([47.5, 13.5], 5), Ii.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        maxZoom: 19
      }).addTo(E), l.modelValue && x(l.modelValue);
    }), pi(() => l.modelValue, (P) => x(P)), Yo(() => {
      E == null || E.remove(), E = null;
    });
    async function S() {
      try {
        await navigator.clipboard.writeText(l.modelValue), p.value = !0, setTimeout(() => {
          p.value = !1;
        }, 2e3);
      } catch {
      }
    }
    return (P, M) => u.modelValue ? (V(), q("div", tm, [
      H("div", {
        ref_key: "mapEl",
        ref: b,
        class: "map-container"
      }, null, 512),
      H("div", em, [
        g.value ? (V(), q("dl", im, [
          H("span", nm, Q(xt(d)("viewer.bounds")) + ":", 1),
          M[0] || (M[0] = H("dt", null, "N", -1)),
          H("dd", null, Q(g.value.maxLat) + "°", 1),
          M[1] || (M[1] = H("dt", null, "S", -1)),
          H("dd", null, Q(g.value.minLat) + "°", 1),
          M[2] || (M[2] = H("dt", null, "E", -1)),
          H("dd", null, Q(g.value.maxLon) + "°", 1),
          M[3] || (M[3] = H("dt", null, "W", -1)),
          H("dd", null, Q(g.value.minLon) + "°", 1)
        ])) : Ct("", !0),
        H("button", {
          class: "copy-btn",
          onClick: S,
          "aria-label": xt(d)("viewer.copy-wkt")
        }, Q(p.value ? xt(d)("viewer.wkt-copied") : xt(d)("viewer.copy-wkt")), 9, rm)
      ])
    ])) : (V(), q("span", am, "—"));
  }
}, pu = /* @__PURE__ */ oe(sm, [["__scopeId", "data-v-40fbed3f"]]), om = {
  key: 0,
  class: "object-view"
}, lm = { class: "sub-label" }, um = { class: "sub-value" }, hm = { key: 1 }, cm = {
  __name: "ObjectView",
  props: {
    field: { type: Object, required: !0 },
    modelValue: { required: !0 },
    lang: { type: String, required: !0 }
  },
  setup(u) {
    const l = u, d = {
      text: Mr,
      textarea: Mr,
      date: cu,
      uri: du,
      map: pu,
      langstring: fu,
      select: Zs,
      searchselect: Zs
    };
    function p(E) {
      return d[E.type] ?? Mr;
    }
    const b = Ft(() => {
      const E = l.field.subFields;
      return (Array.isArray(E) ? E : E && typeof E == "object" ? Object.values(E) : []).filter((g) => {
        var S;
        const x = (S = l.modelValue) == null ? void 0 : S[g.id];
        return x != null && x !== "";
      });
    });
    return (E, w) => u.modelValue && typeof u.modelValue == "object" ? (V(), q("div", om, [
      (V(!0), q(It, null, ae(b.value, (g) => {
        var x, S, P;
        return V(), q("div", {
          key: g.id,
          class: "sub-row"
        }, [
          H("div", lm, Q(((x = g.label) == null ? void 0 : x[u.lang]) || ((S = g.label) == null ? void 0 : S.de) || ((P = g.label) == null ? void 0 : P.en) || g.id), 1),
          H("div", um, [
            (V(), Re(Ba(p(g)), {
              field: g,
              modelValue: u.modelValue[g.id],
              lang: u.lang
            }, null, 8, ["field", "modelValue", "lang"]))
          ])
        ]);
      }), 128))
    ])) : (V(), q("span", hm, Q(u.modelValue), 1));
  }
}, dm = /* @__PURE__ */ oe(cm, [["__scopeId", "data-v-9f432f51"]]), fm = { class: "distribution-view" }, pm = {
  key: 0,
  class: "no-distributions"
}, mm = { class: "dist-title" }, gm = { class: "dist-links" }, _m = ["href"], ym = ["href"], vm = ["href"], bm = { class: "link-label" }, xm = ["href"], wm = { class: "link-label" }, Lm = {
  key: 0,
  class: "dist-badges"
}, km = {
  key: 0,
  class: "badge"
}, Cm = {
  key: 1,
  class: "badge badge--secondary"
}, Em = {
  key: 1,
  class: "dist-meta"
}, Mm = {
  __name: "DistributionView",
  props: {
    field: { type: Object, required: !0 },
    modelValue: { required: !0 },
    lang: { type: String, required: !0 }
  },
  setup(u) {
    const l = u, { t: d } = Qe(), p = Ft(
      () => Array.isArray(l.modelValue) ? l.modelValue.filter(Boolean) : []
    ), b = Ft(() => l.field.buttonLinks !== !1);
    function E(x) {
      return Er(x["dct:title"], l.lang);
    }
    function w(x) {
      return hu(x, l.lang);
    }
    function g(x) {
      return x["dct:license"] || x["dcatap:availability"] || x["dct:issued"] || x["dct:modified"];
    }
    return (x, S) => (V(), q("div", fm, [
      p.value.length ? Ct("", !0) : (V(), q("div", pm, "—")),
      (V(!0), q(It, null, ae(p.value, (P, M) => (V(), q("div", {
        key: M,
        class: "dist-card"
      }, [
        H("div", mm, Q(E(P) || `Distribution ${M + 1}`), 1),
        H("div", gm, [
          b.value ? (V(), q(It, { key: 0 }, [
            P["dcat:accessURL"] ? (V(), q("a", {
              key: 0,
              href: P["dcat:accessURL"],
              target: "_blank",
              rel: "noopener noreferrer",
              class: "dist-btn dist-btn--access"
            }, "🔗 " + Q(xt(d)("dist.btn.access")), 9, _m)) : Ct("", !0),
            P["dcat:downloadURL"] ? (V(), q("a", {
              key: 1,
              href: P["dcat:downloadURL"],
              target: "_blank",
              rel: "noopener noreferrer",
              class: "dist-btn dist-btn--download"
            }, "⬇ " + Q(xt(d)("dist.btn.download")), 9, ym)) : Ct("", !0)
          ], 64)) : (V(), q(It, { key: 1 }, [
            P["dcat:accessURL"] ? (V(), q("a", {
              key: 0,
              href: P["dcat:accessURL"],
              target: "_blank",
              rel: "noopener noreferrer",
              class: "dist-link"
            }, [
              H("span", bm, Q(xt(d)("dist.field.access-url")), 1),
              Mi(" " + Q(P["dcat:accessURL"]), 1)
            ], 8, vm)) : Ct("", !0),
            P["dcat:downloadURL"] ? (V(), q("a", {
              key: 1,
              href: P["dcat:downloadURL"],
              target: "_blank",
              rel: "noopener noreferrer",
              class: "dist-link"
            }, [
              H("span", wm, Q(xt(d)("dist.field.download-url")), 1),
              Mi(" " + Q(P["dcat:downloadURL"]), 1)
            ], 8, xm)) : Ct("", !0)
          ], 64))
        ]),
        P["dct:format"] || P["dcat:mediaType"] ? (V(), q("div", Lm, [
          P["dct:format"] ? (V(), q("span", km, Q(P["dct:format"]), 1)) : Ct("", !0),
          P["dcat:mediaType"] ? (V(), q("span", Cm, Q(P["dcat:mediaType"]), 1)) : Ct("", !0)
        ])) : Ct("", !0),
        g(P) ? (V(), q("dl", Em, [
          P["dct:license"] ? (V(), q(It, { key: 0 }, [
            H("dt", null, Q(xt(d)("dist.field.license")), 1),
            H("dd", null, Q(P["dct:license"]), 1)
          ], 64)) : Ct("", !0),
          P["dcatap:availability"] ? (V(), q(It, { key: 1 }, [
            H("dt", null, Q(xt(d)("dist.field.availability")), 1),
            H("dd", null, Q(P["dcatap:availability"]), 1)
          ], 64)) : Ct("", !0),
          P["dct:issued"] ? (V(), q(It, { key: 2 }, [
            H("dt", null, Q(xt(d)("dist.field.issued")), 1),
            H("dd", null, Q(w(P["dct:issued"])), 1)
          ], 64)) : Ct("", !0),
          P["dct:modified"] ? (V(), q(It, { key: 3 }, [
            H("dt", null, Q(xt(d)("dist.field.modified")), 1),
            H("dd", null, Q(w(P["dct:modified"])), 1)
          ], 64)) : Ct("", !0)
        ])) : Ct("", !0)
      ]))), 128))
    ]));
  }
}, Bm = /* @__PURE__ */ oe(Mm, [["__scopeId", "data-v-b3f90791"]]), Am = { class: "link-button-view" }, Sm = ["href"], Pm = {
  key: 0,
  class: "btn-icon",
  "aria-hidden": "true"
}, Tm = ["href"], Dm = {
  key: 0,
  class: "btn-icon",
  "aria-hidden": "true"
}, Om = {
  __name: "LinkButtonView",
  props: {
    field: { type: Object, required: !0 },
    modelValue: { required: !0 },
    lang: { type: String, required: !0 }
  },
  setup(u) {
    const l = u;
    function d(p) {
      var E, w;
      const b = l.field.buttonLabel;
      if (!b) return ((E = l.field.label) == null ? void 0 : E[l.lang]) || ((w = l.field.label) == null ? void 0 : w.de) || l.field.id;
      if (Array.isArray(b)) {
        const g = b[p] ?? b[0];
        return Er(g, l.lang) || Er(g, "en") || String(g);
      }
      return Er(b, l.lang) || Er(b, "en") || String(b);
    }
    return (p, b) => (V(), q("div", Am, [
      Array.isArray(u.modelValue) ? (V(!0), q(It, { key: 0 }, ae(u.modelValue.filter(Boolean), (E, w) => (V(), q("a", {
        key: w,
        href: E,
        target: "_blank",
        rel: "noopener noreferrer",
        class: "link-btn"
      }, [
        u.field.buttonIcon ? (V(), q("span", Pm, Q(u.field.buttonIcon), 1)) : Ct("", !0),
        Mi(" " + Q(d(w)), 1)
      ], 8, Sm))), 128)) : u.modelValue ? (V(), q("a", {
        key: 1,
        href: u.modelValue,
        target: "_blank",
        rel: "noopener noreferrer",
        class: "link-btn"
      }, [
        u.field.buttonIcon ? (V(), q("span", Dm, Q(u.field.buttonIcon), 1)) : Ct("", !0),
        Mi(" " + Q(d(0)), 1)
      ], 8, Tm)) : Ct("", !0)
    ]));
  }
}, Im = /* @__PURE__ */ oe(Om, [["__scopeId", "data-v-64b6f0be"]]), Fm = { class: "field-group-view" }, Rm = { class: "field-label" }, zm = { class: "field-value" }, Nm = {
  __name: "FieldGroupView",
  props: {
    fieldIds: { type: Array, required: !0 },
    fields: { type: Object, required: !0 },
    data: { type: Object, default: () => ({}) },
    lang: { type: String, default: "de" }
  },
  setup(u) {
    const l = u, d = /* @__PURE__ */ new Set(["multiselect", "distribution-editor", "object", "langstring"]), p = {
      textarea: Mr,
      text: Mr,
      date: cu,
      uri: du,
      select: Zs,
      multiselect: N0,
      searchselect: Zs,
      langstring: fu,
      object: dm,
      "distribution-editor": Bm,
      map: pu
    };
    function b(S) {
      return S.viewAs === "button" ? Im : p[S.type] || Mr;
    }
    function E(S) {
      const { label: P } = Da(S, l.lang);
      return P.value;
    }
    function w(S) {
      return S == null || S === "" ? !1 : Array.isArray(S) ? S.some((P) => P != null && P !== "") : !0;
    }
    function g(S) {
      var M;
      const P = l.fields[S];
      return !P || P.visible === !1 || !w((M = l.data) == null ? void 0 : M[S]) ? null : P;
    }
    function x(S) {
      return !S || !S.multiple ? !1 : !d.has(S.type);
    }
    return (S, P) => (V(), q("dl", Fm, [
      (V(!0), q(It, null, ae(u.fieldIds, (M) => (V(), q(It, { key: M }, [
        g(M) ? (V(), q(It, { key: 0 }, [
          H("dt", Rm, Q(E(g(M))), 1),
          H("dd", zm, [
            x(g(M)) ? (V(!0), q(It, { key: 0 }, ae(u.data[M], (z, j) => (V(), Re(Ba(b(g(M))), {
              key: j,
              field: g(M),
              modelValue: z,
              lang: u.lang,
              class: "field-item"
            }, null, 8, ["field", "modelValue", "lang"]))), 128)) : (V(), Re(Ba(b(g(M))), {
              key: 1,
              field: g(M),
              modelValue: u.data[M],
              lang: u.lang
            }, null, 8, ["field", "modelValue", "lang"]))
          ])
        ], 64)) : Ct("", !0)
      ], 64))), 128))
    ]));
  }
}, Xo = /* @__PURE__ */ oe(Nm, [["__scopeId", "data-v-ccd466b8"]]), jm = { class: "viewer-section" }, Vm = { class: "section-title" }, $m = {
  __name: "SectionView",
  props: {
    section: { type: Object, required: !0 },
    fields: { type: Object, required: !0 },
    data: { type: Object, default: () => ({}) },
    lang: { type: String, default: "de" }
  },
  setup(u) {
    return (l, d) => {
      var p, b, E;
      return V(), q("section", jm, [
        H("h2", Vm, Q(((p = u.section.label) == null ? void 0 : p[u.lang]) || ((b = u.section.label) == null ? void 0 : b.de) || ((E = u.section.label) == null ? void 0 : E.en) || u.section.id), 1),
        Qi(Xo, {
          fieldIds: u.section.fields,
          fields: u.fields,
          data: u.data,
          lang: u.lang
        }, null, 8, ["fieldIds", "fields", "data", "lang"])
      ]);
    };
  }
}, Um = /* @__PURE__ */ oe($m, [["__scopeId", "data-v-31bf0c12"]]), Gm = { class: "viewer-tabs" }, Zm = {
  class: "tabs-bar",
  role: "tablist"
}, qm = ["aria-selected", "onClick"], Hm = {
  class: "tab-content",
  role: "tabpanel"
}, Km = {
  key: 0,
  class: "tab-section-label"
}, Wm = {
  __name: "TabsView",
  props: {
    section: { type: Object, required: !0 },
    fields: { type: Object, required: !0 },
    data: { type: Object, default: () => ({}) },
    lang: { type: String, default: "de" }
  },
  setup(u) {
    var p, b;
    const d = Kt((b = (p = u.section.tabs) == null ? void 0 : p[0]) == null ? void 0 : b.id);
    return (E, w) => (V(), q("div", Gm, [
      H("div", Zm, [
        (V(!0), q(It, null, ae(u.section.tabs, (g) => {
          var x, S, P;
          return V(), q("button", {
            key: g.id,
            role: "tab",
            "aria-selected": d.value === g.id,
            class: he(["tab-btn", { active: d.value === g.id }]),
            onClick: (M) => d.value = g.id
          }, Q(((x = g.label) == null ? void 0 : x[u.lang]) || ((S = g.label) == null ? void 0 : S.de) || ((P = g.label) == null ? void 0 : P.en) || g.id), 11, qm);
        }), 128))
      ]),
      H("div", Hm, [
        (V(!0), q(It, null, ae(u.section.tabs, (g) => Qo((V(), q("div", {
          key: g.id,
          class: "tab-panel"
        }, [
          g.sections && g.sections.length ? (V(!0), q(It, { key: 0 }, ae(g.sections, (x, S) => {
            var P, M, z;
            return V(), q("div", {
              key: x.id || S,
              class: he(["tab-section", { "tab-section--first": S === 0 }])
            }, [
              x.label ? (V(), q("div", Km, Q(((P = x.label) == null ? void 0 : P[u.lang]) || ((M = x.label) == null ? void 0 : M.de) || ((z = x.label) == null ? void 0 : z.en) || x.id), 1)) : Ct("", !0),
              Qi(Xo, {
                fieldIds: x.fields || [],
                fields: u.fields,
                data: u.data,
                lang: u.lang
              }, null, 8, ["fieldIds", "fields", "data", "lang"])
            ], 2);
          }), 128)) : (V(), Re(Xo, {
            key: 1,
            fieldIds: g.fields || [],
            fields: u.fields,
            data: u.data,
            lang: u.lang
          }, null, 8, ["fieldIds", "fields", "data", "lang"]))
        ], 512)), [
          [rh, d.value === g.id]
        ])), 128))
      ])
    ]));
  }
}, Jm = /* @__PURE__ */ oe(Wm, [["__scopeId", "data-v-f86b76d6"]]), Xm = { class: "onto-viewer ontoform" }, Ym = {
  key: 0,
  class: "viewer-loading"
}, Qm = {
  key: 1,
  class: "viewer-error",
  role: "alert"
}, tg = {
  key: 2,
  class: "viewer-content"
}, eg = {
  key: 3,
  class: "viewer-no-data"
}, ig = {
  __name: "OntoViewer",
  props: {
    standard: String,
    config: { type: Object, default: null },
    data: { type: Object, default: null },
    dataUrl: { type: String, default: null },
    dataFormat: { type: String, default: null },
    lang: { type: String, default: "de" },
    labels: { type: Object, default: () => ({}) }
  },
  setup(u) {
    const l = u, d = Ft(() => l.lang), { allTranslations: p, loadTranslations: b } = L0(d), { t: E } = Qe(), w = Kt(!1), g = Kt(null), x = Kt(null), S = Kt(null);
    async function P() {
      if (l.config) {
        x.value = l.config;
        return;
      }
      if (l.standard) {
        w.value = !0, g.value = null;
        try {
          const j = new k0();
          x.value = await j.resolve(l.standard, { translations: p.value });
        } catch (j) {
          g.value = E("viewer.error") + ": " + j.message;
        } finally {
          w.value = !1;
        }
      }
    }
    function M(j) {
      return j ? j.includes("application/ld+json") ? "jsonld" : j.includes("text/turtle") ? "turtle" : j.includes("application/rdf+xml") ? "rdfxml" : j.includes("application/json") ? "json" : null : null;
    }
    async function z() {
      if (l.data) {
        S.value = l.data;
        return;
      }
      if (!l.dataUrl) {
        S.value = null;
        return;
      }
      if (x.value) {
        w.value = !0, g.value = null;
        try {
          const j = await fetch(l.dataUrl);
          if (!j.ok) throw new Error(`HTTP ${j.status}`);
          const $ = l.dataFormat || M(j.headers.get("content-type"));
          if ($ === "json") {
            S.value = await j.json();
            return;
          }
          const tt = await j.text(), ut = new ou();
          $ === "turtle" ? S.value = await ut.fromTurtle(tt, x.value) : $ === "rdfxml" ? S.value = ut.fromRDFXML(tt, x.value) : S.value = ut.fromJSONLD(tt, x.value);
        } catch (j) {
          g.value = E("viewer.error") + ": " + j.message;
        } finally {
          w.value = !1;
        }
      }
    }
    return Ar(async () => {
      await b(l.lang), await P(), await z();
    }), pi(() => l.lang, async (j) => {
      await b(j);
    }), pi(() => l.standard, async () => {
      await P(), await z();
    }), pi(() => l.config, async (j) => {
      x.value = j, await z();
    }), pi(() => l.data, (j) => {
      S.value = j;
    }), pi(() => l.dataUrl, async () => {
      await z();
    }), (j, $) => (V(), q("div", Xm, [
      w.value ? (V(), q("div", Ym, Q(xt(E)("viewer.loading")), 1)) : Ct("", !0),
      g.value ? (V(), q("div", Qm, Q(g.value), 1)) : Ct("", !0),
      x.value && S.value ? (V(), q("div", tg, [
        (V(!0), q(It, null, ae(x.value.sections, (tt) => (V(), q(It, {
          key: tt.id
        }, [
          tt.type === "section" ? (V(), Re(Um, {
            key: 0,
            section: tt,
            fields: x.value.fields,
            data: S.value,
            lang: u.lang
          }, null, 8, ["section", "fields", "data", "lang"])) : tt.type === "tabs" ? (V(), Re(Jm, {
            key: 1,
            section: tt,
            fields: x.value.fields,
            data: S.value,
            lang: u.lang
          }, null, 8, ["section", "fields", "data", "lang"])) : Ct("", !0)
        ], 64))), 128))
      ])) : !w.value && !g.value ? (V(), q("div", eg, Q(xt(E)("viewer.no-data")), 1)) : Ct("", !0)
    ]));
  }
}, ng = /* @__PURE__ */ oe(ig, [["__scopeId", "data-v-99c55e64"]]), qs = {
  // Sets the field to today's date whenever a title is present.
  // Always overwrites — suitable for "last modified" fields that should stay current.
  setTodayIfTitle: (u) => {
    const l = u["dct:title"];
    return (l == null ? void 0 : l.de) || (l == null ? void 0 : l.en) || typeof l == "string" && l ? (/* @__PURE__ */ new Date()).toISOString().slice(0, 10) : void 0;
  },
  // Sets the field to today's date only if it has no value yet.
  // Preserves imported or manually entered values — ideal for hidden auto-filled fields.
  setTodayIfTitleAndEmpty: (u, l, d) => {
    if (u[d]) return;
    const p = u["dct:title"];
    return (p == null ? void 0 : p.de) || (p == null ? void 0 : p.en) || typeof p == "string" && p ? (/* @__PURE__ */ new Date()).toISOString().slice(0, 10) : void 0;
  },
  // Always sets the field to today's date.
  setToday: () => (/* @__PURE__ */ new Date()).toISOString().slice(0, 10),
  // Sets dct:language from the current UI language if the field is empty.
  setLanguageFromUI: (u, l) => u["dct:language"] ? void 0 : {
    de: "http://publications.europa.eu/resource/authority/language/DEU",
    en: "http://publications.europa.eu/resource/authority/language/ENG",
    fr: "http://publications.europa.eu/resource/authority/language/FRA"
  }[l]
};
function rg(u, l) {
  return u === l ? !0 : typeof u != typeof l || u === null || l === null ? !1 : JSON.stringify(u) === JSON.stringify(l);
}
function ag(u, l, d) {
  if (!(u != null && u.fields)) return l;
  let p = !1;
  const b = { ...l };
  for (const [E, w] of Object.entries(u.fields)) {
    if (!w.compute) continue;
    const g = qs[w.compute];
    if (!g) {
      console.warn(`[fieldComputes] Unknown compute function: "${w.compute}"`);
      continue;
    }
    const x = g(b, d, E);
    x !== void 0 && !rg(x, b[E]) && (b[E] = x, p = !0);
  }
  return p ? b : l;
}
function sg(u, l) {
  const d = typeof u == "string" ? { [u]: l } : u;
  for (const [p, b] of Object.entries(d)) {
    if (qs[p]) {
      console.warn(`[fieldComputes] "${p}" already exists — skipping. Use a unique name.`);
      continue;
    }
    qs[p] = b;
  }
}
const og = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  applyComputes: ag,
  fieldComputeFns: qs,
  registerCompute: sg
}, Symbol.toStringTag, { value: "Module" })), _g = [
  { id: "dcat-ap-at", label: "DCAT-AP.at" },
  { id: "dcat-ap-at-easy", label: "DCAT-AP.at - Einfacher Modus" }
], yg = {
  install(u) {
    u.component("MetadataForm", Ap), u.component("OntoViewer", ng);
  }
};
export {
  _g as BUILTIN_STANDARDS,
  Ad as DistributionModal,
  fg as ExportPanel,
  ld as FileUploader,
  gg as FormConfigResolver,
  pg as ImportPanel,
  Ap as MetadataForm,
  dg as MetadataViewer,
  yg as OntoFormPlugin,
  ng as OntoViewer,
  Hp as RDFExporter,
  ou as RDFImporter,
  Hf as SHACLValidationService,
  mg as StandardSelector,
  Bl as ValidationReport,
  k0 as ViewConfigResolver,
  w0 as VocabularyLoader,
  Br as assetUrl,
  hg as configure,
  sg as registerCompute,
  ed as registerTransform,
  $c as registerValidator,
  jc as registerVisibility
};
//# sourceMappingURL=onto-form.es.js.map
