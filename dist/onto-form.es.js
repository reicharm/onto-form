var Yu = Object.defineProperty;
var Qu = (u, l, d) => l in u ? Yu(u, l, { enumerable: !0, configurable: !0, writable: !0, value: d }) : u[l] = d;
var Gt = (u, l, d) => Qu(u, typeof l != "symbol" ? l + "" : l, d);
import { inject as xl, ref as Ht, watchEffect as th, openBlock as V, createElementBlock as q, createElementVNode as $, toDisplayString as X, Fragment as Ft, renderList as ee, unref as vt, createCommentVNode as Mt, computed as Nt, onMounted as Qn, normalizeClass as le, createBlock as Oe, watch as pi, onBeforeUnmount as Wo, createTextVNode as Mi, withKeys as Jn, withModifiers as Ne, withDirectives as Jo, vModelText as Il, nextTick as $s, resolveDynamicComponent as Sr, toRef as eh, Teleport as ih, normalizeStyle as Fl, renderSlot as ga, withCtx as cn, createVNode as Pn, provide as wl, vShow as nh } from "vue";
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
function Xe() {
  const u = xl("onto-form:lang", Ht("de")), l = xl("onto-form:translations", Ht({}));
  function d(p) {
    var x;
    const b = typeof u == "string" ? u : u.value;
    return (l && "value" in l ? l.value : l ?? {})[p] ?? ((x = Xi[b]) == null ? void 0 : x[p]) ?? Xi.en[p] ?? p;
  }
  return { t: d };
}
const rh = {
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
  const d = rh[u];
  return d ? d(l) ?? null : (console.warn(`[idGenerators] Unknown generator: "${u}"`), null);
}
const ah = 5, La = "ontoform:suggestions:";
let Ll = {};
const Er = {
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
      ...ya(u)
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
      (E) => this.get(E).map((x) => Cl(x, d))
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
    if (!sh(l)) return;
    const d = ya(u), p = ka(l), b = d.filter((x) => ka(x) !== p), E = [l, ...b].slice(0, ah);
    try {
      localStorage.setItem(La + u, JSON.stringify(E));
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
    const d = ka(l), p = ya(u).filter((b) => ka(b) !== d);
    try {
      p.length ? localStorage.setItem(La + u, JSON.stringify(p)) : localStorage.removeItem(La + u);
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
    const d = ya(u.id);
    if (this.remove(u.id, l), ya(u.id).length < d.length || !((g = u.suggestionsFrom) != null && g.length)) return;
    const b = u.suggestionsMap || {}, E = Object.fromEntries(
      Object.entries(b).map(([w, B]) => [B, w])
    ), x = Cl(l, E);
    for (const w of u.suggestionsFrom)
      this.remove(w, x);
  },
  /**
   * Removes all stored suggestions for a field from localStorage.
   * User-context values are not affected.
   *
   * @param {string} fieldId
   */
  clear(u) {
    try {
      localStorage.removeItem(La + u);
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
    return p && b ? `${p} · ${b}` : p || b || Object.values(u).filter((x) => x && typeof x == "string").slice(0, 3).join(" · ") || JSON.stringify(u);
  }
};
function ya(u) {
  try {
    const l = localStorage.getItem(La + u);
    return l ? JSON.parse(l) : [];
  } catch {
    return [];
  }
}
function ka(u) {
  return JSON.stringify(u);
}
function kl(u) {
  const l = /* @__PURE__ */ new Set(), d = [];
  for (const p of u) {
    const b = ka(p);
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
function sh(u) {
  return u == null ? !1 : typeof u == "object" ? Object.values(u).some((l) => l != null && l !== "") : String(u).trim() !== "";
}
function El(u, l) {
  for (const d of l)
    if (u[d] && typeof u[d] == "string") return u[d];
  return null;
}
const re = (u, l) => {
  const d = u.__vccOpts || u;
  for (const [p, b] of l)
    d[p] = b;
  return d;
}, oh = {
  key: 0,
  class: "field-suggestions"
}, lh = { class: "suggestions-label" }, uh = { class: "suggestions-list" }, hh = ["title", "onClick"], ch = ["aria-label", "onClick"], dh = {
  __name: "FieldSuggestions",
  props: {
    field: { type: Object, required: !0 },
    lang: { type: String, default: "de" }
  },
  emits: ["select"],
  setup(u) {
    const l = u, d = Ht([]);
    th(() => {
      d.value = Er.getFor(l.field);
    });
    function p(E) {
      const x = Er.label(E);
      return l.lang === "de" ? `Vorschlag „${x}" entfernen` : `Remove suggestion „${x}"`;
    }
    function b(E) {
      Er.removeFor(l.field, E), d.value = Er.getFor(l.field);
    }
    return (E, x) => d.value.length ? (V(), q("div", oh, [
      $("span", lh, X(u.lang === "de" ? "Frühere Eingaben:" : "Previous entries:"), 1),
      $("div", uh, [
        (V(!0), q(Ft, null, ee(d.value, (g, w) => (V(), q("span", {
          key: w,
          class: "suggestion-chip"
        }, [
          $("button", {
            type: "button",
            class: "chip-label",
            title: u.lang === "de" ? "Diesen Wert übernehmen" : "Use this value",
            onClick: (B) => E.$emit("select", g)
          }, X(vt(Er).label(g)), 9, hh),
          $("button", {
            type: "button",
            class: "chip-remove",
            "aria-label": p(g),
            onClick: (B) => b(g)
          }, "×", 8, ch)
        ]))), 128))
      ])
    ])) : Mt("", !0);
  }
}, zl = /* @__PURE__ */ re(dh, [["__scopeId", "data-v-0a2fc9d2"]]), fh = { class: "field" }, ph = ["for"], mh = {
  key: 0,
  class: "input-with-action"
}, _h = ["id", "value", "placeholder"], gh = ["aria-label"], yh = ["id", "value", "placeholder"], vh = {
  key: 2,
  class: "hint"
}, bh = {
  __name: "TextField",
  props: {
    field: Object,
    lang: String,
    modelValue: [String, Number]
  },
  emits: ["update:modelValue"],
  setup(u, { emit: l }) {
    const d = u, p = l, b = Nt(() => {
      var g, w;
      return ((g = d.field.label) == null ? void 0 : g[d.lang]) || ((w = d.field.label) == null ? void 0 : w.en) || d.field.id;
    }), E = Nt(() => {
      var g, w;
      return ((g = d.field.placeholder) == null ? void 0 : g[d.lang]) || ((w = d.field.placeholder) == null ? void 0 : w.en) || "";
    });
    async function x() {
      const g = await Rl(d.field.generate, d.field.generateOptions);
      g != null && p("update:modelValue", g);
    }
    return Qn(() => {
      d.field.generate && !d.modelValue && x();
    }), (g, w) => {
      var B;
      return V(), q("div", fh, [
        $("label", {
          for: u.field.id,
          class: le({ required: u.field.required || u.field.requiredIf })
        }, X(b.value), 11, ph),
        u.field.generate ? (V(), q("div", mh, [
          $("input", {
            id: u.field.id,
            type: "text",
            value: u.modelValue || "",
            placeholder: E.value,
            onInput: w[0] || (w[0] = (T) => g.$emit("update:modelValue", T.target.value))
          }, null, 40, _h),
          $("button", {
            type: "button",
            class: "btn-generate",
            "aria-label": u.lang === "de" ? `Neuen ${b.value} generieren` : `Generate new ${b.value}`,
            onClick: x
          }, "↺", 8, gh)
        ])) : (V(), q("input", {
          key: 1,
          id: u.field.id,
          type: "text",
          value: u.modelValue || "",
          placeholder: E.value,
          onInput: w[1] || (w[1] = (T) => g.$emit("update:modelValue", T.target.value))
        }, null, 40, yh)),
        (B = u.field.hint) != null && B[u.lang] ? (V(), q("span", vh, X(u.field.hint[u.lang]), 1)) : Mt("", !0),
        u.field.remember ? (V(), Oe(zl, {
          key: 3,
          field: u.field,
          lang: u.lang,
          onSelect: w[2] || (w[2] = (T) => g.$emit("update:modelValue", T))
        }, null, 8, ["field", "lang"])) : Mt("", !0)
      ]);
    };
  }
}, Pr = /* @__PURE__ */ re(bh, [["__scopeId", "data-v-c6b3ffa9"]]), xh = { class: "field" }, wh = ["for"], Lh = ["id", "value", "placeholder"], kh = {
  key: 0,
  class: "hint"
}, Ch = {
  __name: "TextareaField",
  props: {
    field: Object,
    lang: String,
    modelValue: String
  },
  emits: ["update:modelValue"],
  setup(u) {
    const l = u, d = Nt(() => {
      var b, E;
      return ((b = l.field.label) == null ? void 0 : b[l.lang]) || ((E = l.field.label) == null ? void 0 : E.en) || l.field.id;
    }), p = Nt(() => {
      var b, E;
      return ((b = l.field.placeholder) == null ? void 0 : b[l.lang]) || ((E = l.field.placeholder) == null ? void 0 : E.en) || "";
    });
    return (b, E) => {
      var x;
      return V(), q("div", xh, [
        $("label", {
          for: u.field.id,
          class: le({ required: u.field.required })
        }, X(d.value), 11, wh),
        $("textarea", {
          id: u.field.id,
          value: u.modelValue || "",
          placeholder: p.value,
          rows: "4",
          onInput: E[0] || (E[0] = (g) => b.$emit("update:modelValue", g.target.value))
        }, null, 40, Lh),
        (x = u.field.hint) != null && x[u.lang] ? (V(), q("span", kh, X(u.field.hint[u.lang]), 1)) : Mt("", !0)
      ]);
    };
  }
}, Xo = /* @__PURE__ */ re(Ch, [["__scopeId", "data-v-974fffb5"]]);
function Oa(u, l) {
  const d = Nt(() => {
    var g, w, B;
    const E = u.value ?? u, x = l.value ?? l;
    return ((g = E == null ? void 0 : E.label) == null ? void 0 : g[x]) || ((w = E == null ? void 0 : E.label) == null ? void 0 : w.de) || ((B = E == null ? void 0 : E.label) == null ? void 0 : B.en) || (E == null ? void 0 : E.id) || "";
  }), p = Nt(() => {
    var g, w, B;
    const E = u.value ?? u, x = l.value ?? l;
    return ((g = E == null ? void 0 : E.placeholder) == null ? void 0 : g[x]) || ((w = E == null ? void 0 : E.placeholder) == null ? void 0 : w.de) || ((B = E == null ? void 0 : E.placeholder) == null ? void 0 : B.en) || "";
  }), b = Nt(() => {
    var g;
    const E = u.value ?? u, x = l.value ?? l;
    return ((g = E == null ? void 0 : E.hint) == null ? void 0 : g[x]) || "";
  });
  return { label: d, placeholder: p, hint: b };
}
const Eh = { class: "field" }, Mh = ["for"], Bh = ["id", "value"], Ah = { value: "" }, Sh = ["value"], Ph = {
  key: 0,
  class: "hint"
}, Th = {
  __name: "SelectField",
  props: {
    field: Object,
    lang: String,
    modelValue: String
  },
  emits: ["update:modelValue"],
  setup(u) {
    const l = u, { t: d } = Xe(), { label: p } = Oa(Nt(() => l.field), Nt(() => l.lang));
    return (b, E) => {
      var x;
      return V(), q("div", Eh, [
        $("label", {
          for: u.field.id,
          class: le({ required: u.field.required })
        }, X(vt(p)), 11, Mh),
        $("select", {
          id: u.field.id,
          value: u.modelValue || "",
          onChange: E[0] || (E[0] = (g) => b.$emit("update:modelValue", g.target.value))
        }, [
          $("option", Ah, X(vt(d)("select.placeholder")), 1),
          (V(!0), q(Ft, null, ee(u.field.options, (g) => {
            var w, B, T;
            return V(), q("option", {
              key: g.value,
              value: g.value
            }, X(((w = g.label) == null ? void 0 : w[u.lang]) || ((B = g.label) == null ? void 0 : B.de) || ((T = g.label) == null ? void 0 : T.en) || g.value), 9, Sh);
          }), 128))
        ], 40, Bh),
        (x = u.field.hint) != null && x[u.lang] ? (V(), q("span", Ph, X(u.field.hint[u.lang]), 1)) : Mt("", !0)
      ]);
    };
  }
}, Yo = /* @__PURE__ */ re(Th, [["__scopeId", "data-v-13e41d99"]]), Dh = { class: "field" }, Oh = ["for"], Ih = ["id", "value"], Fh = {
  key: 0,
  class: "hint"
}, Rh = {
  __name: "DateField",
  props: {
    field: Object,
    lang: String,
    modelValue: String
  },
  emits: ["update:modelValue"],
  setup(u) {
    const l = u, d = Nt(() => {
      var p, b;
      return ((p = l.field.label) == null ? void 0 : p[l.lang]) || ((b = l.field.label) == null ? void 0 : b.en) || l.field.id;
    });
    return (p, b) => {
      var E;
      return V(), q("div", Dh, [
        $("label", {
          for: u.field.id,
          class: le({ required: u.field.required })
        }, X(d.value), 11, Oh),
        $("input", {
          id: u.field.id,
          type: "date",
          value: u.modelValue || "",
          onInput: b[0] || (b[0] = (x) => p.$emit("update:modelValue", x.target.value))
        }, null, 40, Ih),
        (E = u.field.hint) != null && E[u.lang] ? (V(), q("span", Fh, X(u.field.hint[u.lang]), 1)) : Mt("", !0)
      ]);
    };
  }
}, Qo = /* @__PURE__ */ re(Rh, [["__scopeId", "data-v-659cf997"]]), zh = { class: "field" }, Nh = ["for"], jh = { class: "uri-row" }, Vh = ["value", "aria-label"], $h = ["value"], Uh = ["id", "value", "placeholder", "aria-label"], Gh = ["aria-label"], Zh = {
  key: 0,
  class: "hint"
}, zo = "https", qh = {
  __name: "URIField",
  props: {
    field: Object,
    lang: String,
    modelValue: String
  },
  emits: ["update:modelValue"],
  setup(u, { emit: l }) {
    const d = u, p = l, b = ["https", "http", "mailto", "ftp", "urn"], E = Ht(!1), x = Ht(null);
    function g(lt) {
      if (!lt) return { protocol: zo, body: "" };
      const ct = lt.indexOf("://");
      if (ct !== -1) {
        const pt = lt.slice(0, ct);
        return b.includes(pt) ? { protocol: pt, body: lt.slice(ct + 3) } : { protocol: zo, body: lt };
      }
      return lt.startsWith("mailto:") ? { protocol: "mailto", body: lt.slice(7) } : { protocol: zo, body: lt };
    }
    const w = Ht(g(d.modelValue).protocol), B = Ht(g(d.modelValue).body);
    pi(() => d.modelValue, (lt) => {
      const ct = g(lt);
      ct.protocol !== w.value && (w.value = ct.protocol), ct.body !== B.value && (B.value = ct.body);
    });
    function T() {
      return B.value ? w.value === "mailto" ? `mailto:${B.value}` : `${w.value}://${B.value}` : "";
    }
    function M(lt) {
      var ct;
      w.value = lt, p("update:modelValue", T()), (ct = x.value) == null || ct.focus();
    }
    function N(lt) {
      const ct = lt.indexOf("://");
      if (ct !== -1) {
        const pt = lt.slice(0, ct);
        if (b.includes(pt)) {
          w.value = pt, B.value = lt.slice(ct + 3), p("update:modelValue", T());
          return;
        }
      }
      B.value = lt, p("update:modelValue", T());
    }
    async function j() {
      const lt = await Rl(d.field.generate, d.field.generateOptions);
      lt != null && p("update:modelValue", lt);
    }
    Qn(() => {
      d.field.generate && !d.modelValue && j();
    });
    const G = Nt(() => {
      var lt, ct;
      return ((lt = d.field.label) == null ? void 0 : lt[d.lang]) || ((ct = d.field.label) == null ? void 0 : ct.en) || d.field.id;
    }), Y = Nt(() => {
      var pt, Bt;
      const lt = ((pt = d.field.placeholder) == null ? void 0 : pt[d.lang]) || ((Bt = d.field.placeholder) == null ? void 0 : Bt.en) || "", ct = lt.indexOf("://");
      return ct !== -1 ? lt.slice(ct + 3) : lt || (w.value === "mailto" ? "name@example.com" : "example.com/path");
    });
    return (lt, ct) => {
      var pt;
      return V(), q("div", zh, [
        $("label", {
          for: `${u.field.id}-body`,
          class: le({ required: u.field.required })
        }, X(G.value), 11, Nh),
        $("div", jh, [
          $("div", {
            class: le(["uri-input", { focused: E.value }])
          }, [
            $("select", {
              class: "protocol-select",
              value: w.value,
              "aria-label": u.lang === "de" ? "URI-Protokoll" : "URI protocol",
              onChange: ct[0] || (ct[0] = (Bt) => M(Bt.target.value)),
              onFocus: ct[1] || (ct[1] = (Bt) => E.value = !0),
              onBlur: ct[2] || (ct[2] = (Bt) => E.value = !1)
            }, [
              (V(), q(Ft, null, ee(b, (Bt) => $("option", {
                key: Bt,
                value: Bt
              }, X(Bt), 9, $h)), 64))
            ], 40, Vh),
            ct[6] || (ct[6] = $("span", {
              class: "protocol-sep",
              "aria-hidden": "true"
            }, "://", -1)),
            $("input", {
              id: `${u.field.id}-body`,
              ref_key: "inputEl",
              ref: x,
              type: "text",
              value: B.value,
              placeholder: Y.value,
              "aria-label": `${w.value}://${u.lang === "de" ? " Adresspfad" : " address path"}`,
              onInput: ct[3] || (ct[3] = (Bt) => N(Bt.target.value)),
              onFocus: ct[4] || (ct[4] = (Bt) => E.value = !0),
              onBlur: ct[5] || (ct[5] = (Bt) => E.value = !1)
            }, null, 40, Uh)
          ], 2),
          u.field.generate ? (V(), q("button", {
            key: 0,
            type: "button",
            class: "btn-generate",
            "aria-label": u.lang === "de" ? `Neuen ${G.value} generieren` : `Generate new ${G.value}`,
            onClick: j
          }, "↺", 8, Gh)) : Mt("", !0)
        ]),
        (pt = u.field.hint) != null && pt[u.lang] ? (V(), q("span", Zh, X(u.field.hint[u.lang]), 1)) : Mt("", !0)
      ]);
    };
  }
}, tl = /* @__PURE__ */ re(qh, [["__scopeId", "data-v-b94afa7b"]]), Hh = { class: "field" }, Kh = { class: "lang-inputs" }, Wh = { class: "lang-tag" }, Jh = ["value", "placeholder", "rows", "onInput"], Xh = ["value", "placeholder", "onInput"], Yh = {
  key: 0,
  class: "hint"
}, Qh = {
  __name: "LangStringField",
  props: {
    field: Object,
    lang: String,
    modelValue: Object
  },
  emits: ["update:modelValue"],
  setup(u, { emit: l }) {
    const d = u, p = l, b = Nt(() => {
      var w, B;
      return (B = (w = d.field) == null ? void 0 : w.contentLangs) != null && B.length ? d.field.contentLangs : ["de", "en"];
    }), { label: E, placeholder: x } = Oa(Nt(() => d.field), Nt(() => d.lang));
    function g(w, B) {
      p("update:modelValue", { ...d.modelValue || {}, [w]: B });
    }
    return (w, B) => {
      var T;
      return V(), q("div", Hh, [
        $("label", {
          class: le({ required: u.field.required })
        }, X(vt(E)), 3),
        $("div", Kh, [
          (V(!0), q(Ft, null, ee(b.value, (M) => (V(), q("div", {
            key: M,
            class: le(["lang-row", { "lang-row--multiline": u.field.multiline }])
          }, [
            $("span", Wh, X(M), 1),
            u.field.multiline ? (V(), q("textarea", {
              key: 0,
              value: (u.modelValue || {})[M] || "",
              placeholder: vt(x),
              rows: u.field.rows || 4,
              onInput: (N) => g(M, N.target.value)
            }, null, 40, Jh)) : (V(), q("input", {
              key: 1,
              type: "text",
              value: (u.modelValue || {})[M] || "",
              placeholder: vt(x),
              onInput: (N) => g(M, N.target.value)
            }, null, 40, Xh))
          ], 2))), 128))
        ]),
        (T = u.field.hint) != null && T[u.lang] ? (V(), q("span", Yh, X(u.field.hint[u.lang]), 1)) : Mt("", !0)
      ]);
    };
  }
}, Nl = /* @__PURE__ */ re(Qh, [["__scopeId", "data-v-3804ec55"]]);
var Ca = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function tc(u) {
  return u && u.__esModule && Object.prototype.hasOwnProperty.call(u, "default") ? u.default : u;
}
var Uo = { exports: {} };
/* @preserve
 * Leaflet 1.9.4, a JS library for interactive maps. https://leafletjs.com
 * (c) 2010-2023 Vladimir Agafonkin, (c) 2010-2011 CloudMade
 */
(function(u, l) {
  (function(d, p) {
    p(l);
  })(Ca, function(d) {
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
    function x(t, n) {
      var s = Array.prototype.slice;
      if (t.bind)
        return t.bind.apply(t, s.call(arguments, 1));
      var c = s.call(arguments, 2);
      return function() {
        return t.apply(n, c.length ? c.concat(s.call(arguments)) : arguments);
      };
    }
    var g = 0;
    function w(t) {
      return "_leaflet_id" in t || (t._leaflet_id = ++g), t._leaflet_id;
    }
    function B(t, n, s) {
      var c, y, A, Z;
      return Z = function() {
        c = !1, y && (A.apply(s, y), y = !1);
      }, A = function() {
        c ? y = arguments : (t.apply(s, arguments), setTimeout(Z, n), c = !0);
      }, A;
    }
    function T(t, n, s) {
      var c = n[1], y = n[0], A = c - y;
      return t === c && s ? t : ((t - y) % A + A) % A + y;
    }
    function M() {
      return !1;
    }
    function N(t, n) {
      if (n === !1)
        return t;
      var s = Math.pow(10, n === void 0 ? 6 : n);
      return Math.round(t * s) / s;
    }
    function j(t) {
      return t.trim ? t.trim() : t.replace(/^\s+|\s+$/g, "");
    }
    function G(t) {
      return j(t).split(/\s+/);
    }
    function Y(t, n) {
      Object.prototype.hasOwnProperty.call(t, "options") || (t.options = t.options ? E(t.options) : {});
      for (var s in n)
        t.options[s] = n[s];
      return t.options;
    }
    function lt(t, n, s) {
      var c = [];
      for (var y in t)
        c.push(encodeURIComponent(s ? y.toUpperCase() : y) + "=" + encodeURIComponent(t[y]));
      return (!n || n.indexOf("?") === -1 ? "?" : "&") + c.join("&");
    }
    var ct = /\{ *([\w_ -]+) *\}/g;
    function pt(t, n) {
      return t.replace(ct, function(s, c) {
        var y = n[c];
        if (y === void 0)
          throw new Error("No value provided for variable " + s);
        return typeof y == "function" && (y = y(n)), y;
      });
    }
    var Bt = Array.isArray || function(t) {
      return Object.prototype.toString.call(t) === "[object Array]";
    };
    function ue(t, n) {
      for (var s = 0; s < t.length; s++)
        if (t[s] === n)
          return s;
      return -1;
    }
    var Xt = "data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=";
    function Rt(t) {
      return window["webkit" + t] || window["moz" + t] || window["ms" + t];
    }
    var At = 0;
    function jt(t) {
      var n = +/* @__PURE__ */ new Date(), s = Math.max(0, 16 - (n - At));
      return At = n + s, window.setTimeout(t, s);
    }
    var se = window.requestAnimationFrame || Rt("RequestAnimationFrame") || jt, Zt = window.cancelAnimationFrame || Rt("CancelAnimationFrame") || Rt("CancelRequestAnimationFrame") || function(t) {
      window.clearTimeout(t);
    };
    function Kt(t, n, s) {
      if (s && se === jt)
        t.call(n);
      else
        return se.call(window, x(t, n));
    }
    function ce(t) {
      t && Zt.call(window, t);
    }
    var Ye = {
      __proto__: null,
      extend: b,
      create: E,
      bind: x,
      get lastId() {
        return g;
      },
      stamp: w,
      throttle: B,
      wrapNum: T,
      falseFn: M,
      formatNum: N,
      trim: j,
      splitWords: G,
      setOptions: Y,
      getParamString: lt,
      template: pt,
      isArray: Bt,
      indexOf: ue,
      emptyImageUrl: Xt,
      requestFn: se,
      cancelFn: Zt,
      requestAnimFrame: Kt,
      cancelAnimFrame: ce
    };
    function Le() {
    }
    Le.extend = function(t) {
      var n = function() {
        Y(this), this.initialize && this.initialize.apply(this, arguments), this.callInitHooks();
      }, s = n.__super__ = this.prototype, c = E(s);
      c.constructor = n, n.prototype = c;
      for (var y in this)
        Object.prototype.hasOwnProperty.call(this, y) && y !== "prototype" && y !== "__super__" && (n[y] = this[y]);
      return t.statics && b(n, t.statics), t.includes && (Qe(t.includes), b.apply(null, [c].concat(t.includes))), b(c, t), delete c.statics, delete c.includes, c.options && (c.options = s.options ? E(s.options) : {}, b(c.options, t.options)), c._initHooks = [], c.callInitHooks = function() {
        if (!this._initHooksCalled) {
          s.callInitHooks && s.callInitHooks.call(this), this._initHooksCalled = !0;
          for (var A = 0, Z = c._initHooks.length; A < Z; A++)
            c._initHooks[A].call(this);
        }
      }, n;
    }, Le.include = function(t) {
      var n = this.prototype.options;
      return b(this.prototype, t), t.options && (this.prototype.options = n, this.mergeOptions(t.options)), this;
    }, Le.mergeOptions = function(t) {
      return b(this.prototype.options, t), this;
    }, Le.addInitHook = function(t) {
      var n = Array.prototype.slice.call(arguments, 1), s = typeof t == "function" ? t : function() {
        this[t].apply(this, n);
      };
      return this.prototype._initHooks = this.prototype._initHooks || [], this.prototype._initHooks.push(s), this;
    };
    function Qe(t) {
      if (!(typeof L > "u" || !L || !L.Mixin)) {
        t = Bt(t) ? t : [t];
        for (var n = 0; n < t.length; n++)
          t[n] === L.Mixin.Events && console.warn("Deprecated include of L.Mixin.Events: this property will be removed in future releases, please inherit from L.Evented instead.", new Error().stack);
      }
    }
    var Et = {
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
          t = G(t);
          for (var y = 0, A = t.length; y < A; y++)
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
          t = G(t);
          for (var y = arguments.length === 1, A = 0, Z = t.length; A < Z; A++)
            y ? this._off(t[A]) : this._off(t[A], n, s);
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
        var c, y, A;
        if (this._events && (c = this._events[t], !!c)) {
          if (arguments.length === 1) {
            if (this._firingCount)
              for (y = 0, A = c.length; y < A; y++)
                c[y].fn = M;
            delete this._events[t];
            return;
          }
          if (typeof n != "function") {
            console.warn("wrong listener type: " + typeof n);
            return;
          }
          var Z = this._listens(t, n, s);
          if (Z !== !1) {
            var rt = c[Z];
            this._firingCount && (rt.fn = M, this._events[t] = c = c.slice()), c.splice(Z, 1);
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
            for (var A = 0, Z = y.length; A < Z; A++) {
              var rt = y[A], ht = rt.fn;
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
        var A = this._events && this._events[t];
        if (A && A.length && this._listens(t, y, s) !== !1)
          return !0;
        if (c) {
          for (var Z in this._eventParents)
            if (this._eventParents[Z].listens(t, n, s, c))
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
        for (var y = 0, A = c.length; y < A; y++)
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
          t = G(t);
          for (var y = 0, A = t.length; y < A; y++)
            this._on(t[y], n, s, !0);
        }
        return this;
      },
      // @method addEventParent(obj: Evented): this
      // Adds an event parent - an `Evented` that will receive propagated events
      addEventParent: function(t) {
        return this._eventParents = this._eventParents || {}, this._eventParents[w(t)] = t, this;
      },
      // @method removeEventParent(obj: Evented): this
      // Removes an event parent, so it will stop receiving propagated events
      removeEventParent: function(t) {
        return this._eventParents && delete this._eventParents[w(t)], this;
      },
      _propagateEvent: function(t) {
        for (var n in this._eventParents)
          this._eventParents[n].fire(t.type, b({
            layer: t.target,
            propagatedFrom: t.target
          }, t), !0);
      }
    };
    Et.addEventListener = Et.on, Et.removeEventListener = Et.clearAllEventListeners = Et.off, Et.addOneTimeEventListener = Et.once, Et.fireEvent = Et.fire, Et.hasEventListeners = Et.listens;
    var Jt = Le.extend(Et);
    function Ot(t, n, s) {
      this.x = s ? Math.round(t) : t, this.y = s ? Math.round(n) : n;
    }
    var Pt = Math.trunc || function(t) {
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
        return this.clone()._add(ut(t));
      },
      _add: function(t) {
        return this.x += t.x, this.y += t.y, this;
      },
      // @method subtract(otherPoint: Point): Point
      // Returns the result of subtraction of the given point from the current.
      subtract: function(t) {
        return this.clone()._subtract(ut(t));
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
        return this.x = Pt(this.x), this.y = Pt(this.y), this;
      },
      // @method distanceTo(otherPoint: Point): Number
      // Returns the cartesian distance between the current and the given points.
      distanceTo: function(t) {
        t = ut(t);
        var n = t.x - this.x, s = t.y - this.y;
        return Math.sqrt(n * n + s * s);
      },
      // @method equals(otherPoint: Point): Boolean
      // Returns `true` if the given point has the same coordinates.
      equals: function(t) {
        return t = ut(t), t.x === this.x && t.y === this.y;
      },
      // @method contains(otherPoint: Point): Boolean
      // Returns `true` if both coordinates of the given point are less than the corresponding current point coordinates (in absolute values).
      contains: function(t) {
        return t = ut(t), Math.abs(t.x) <= Math.abs(this.x) && Math.abs(t.y) <= Math.abs(this.y);
      },
      // @method toString(): String
      // Returns a string representation of the point for debugging purposes.
      toString: function() {
        return "Point(" + N(this.x) + ", " + N(this.y) + ")";
      }
    };
    function ut(t, n, s) {
      return t instanceof Ot ? t : Bt(t) ? new Ot(t[0], t[1]) : t == null ? t : typeof t == "object" && "x" in t && "y" in t ? new Ot(t.x, t.y) : new Ot(t, n, s);
    }
    function bt(t, n) {
      if (t)
        for (var s = n ? [t, n] : t, c = 0, y = s.length; c < y; c++)
          this.extend(s[c]);
    }
    bt.prototype = {
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
          n = s = ut(t);
        else if (t = Ct(t), n = t.min, s = t.max, !n || !s)
          return this;
        return !this.min && !this.max ? (this.min = n.clone(), this.max = s.clone()) : (this.min.x = Math.min(n.x, this.min.x), this.max.x = Math.max(s.x, this.max.x), this.min.y = Math.min(n.y, this.min.y), this.max.y = Math.max(s.y, this.max.y)), this;
      },
      // @method getCenter(round?: Boolean): Point
      // Returns the center point of the bounds.
      getCenter: function(t) {
        return ut(
          (this.min.x + this.max.x) / 2,
          (this.min.y + this.max.y) / 2,
          t
        );
      },
      // @method getBottomLeft(): Point
      // Returns the bottom-left point of the bounds.
      getBottomLeft: function() {
        return ut(this.min.x, this.max.y);
      },
      // @method getTopRight(): Point
      // Returns the top-right point of the bounds.
      getTopRight: function() {
        return ut(this.max.x, this.min.y);
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
        return typeof t[0] == "number" || t instanceof Ot ? t = ut(t) : t = Ct(t), t instanceof bt ? (n = t.min, s = t.max) : n = s = t, n.x >= this.min.x && s.x <= this.max.x && n.y >= this.min.y && s.y <= this.max.y;
      },
      // @method intersects(otherBounds: Bounds): Boolean
      // Returns `true` if the rectangle intersects the given bounds. Two bounds
      // intersect if they have at least one point in common.
      intersects: function(t) {
        t = Ct(t);
        var n = this.min, s = this.max, c = t.min, y = t.max, A = y.x >= n.x && c.x <= s.x, Z = y.y >= n.y && c.y <= s.y;
        return A && Z;
      },
      // @method overlaps(otherBounds: Bounds): Boolean
      // Returns `true` if the rectangle overlaps the given bounds. Two bounds
      // overlap if their intersection is an area.
      overlaps: function(t) {
        t = Ct(t);
        var n = this.min, s = this.max, c = t.min, y = t.max, A = y.x > n.x && c.x < s.x, Z = y.y > n.y && c.y < s.y;
        return A && Z;
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
        return Ct(
          ut(n.x - c, n.y - y),
          ut(s.x + c, s.y + y)
        );
      },
      // @method equals(otherBounds: Bounds): Boolean
      // Returns `true` if the rectangle is equivalent to the given bounds.
      equals: function(t) {
        return t ? (t = Ct(t), this.min.equals(t.getTopLeft()) && this.max.equals(t.getBottomRight())) : !1;
      }
    };
    function Ct(t, n) {
      return !t || t instanceof bt ? t : new bt(t, n);
    }
    function oe(t, n) {
      if (t)
        for (var s = n ? [t, n] : t, c = 0, y = s.length; c < y; c++)
          this.extend(s[c]);
    }
    oe.prototype = {
      // @method extend(latlng: LatLng): this
      // Extend the bounds to contain the given point
      // @alternative
      // @method extend(otherBounds: LatLngBounds): this
      // Extend the bounds to contain the given bounds
      extend: function(t) {
        var n = this._southWest, s = this._northEast, c, y;
        if (t instanceof Tt)
          c = t, y = t;
        else if (t instanceof oe) {
          if (c = t._southWest, y = t._northEast, !c || !y)
            return this;
        } else
          return t ? this.extend(St(t) || zt(t)) : this;
        return !n && !s ? (this._southWest = new Tt(c.lat, c.lng), this._northEast = new Tt(y.lat, y.lng)) : (n.lat = Math.min(c.lat, n.lat), n.lng = Math.min(c.lng, n.lng), s.lat = Math.max(y.lat, s.lat), s.lng = Math.max(y.lng, s.lng)), this;
      },
      // @method pad(bufferRatio: Number): LatLngBounds
      // Returns bounds created by extending or retracting the current bounds by a given ratio in each direction.
      // For example, a ratio of 0.5 extends the bounds by 50% in each direction.
      // Negative values will retract the bounds.
      pad: function(t) {
        var n = this._southWest, s = this._northEast, c = Math.abs(n.lat - s.lat) * t, y = Math.abs(n.lng - s.lng) * t;
        return new oe(
          new Tt(n.lat - c, n.lng - y),
          new Tt(s.lat + c, s.lng + y)
        );
      },
      // @method getCenter(): LatLng
      // Returns the center point of the bounds.
      getCenter: function() {
        return new Tt(
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
        return new Tt(this.getNorth(), this.getWest());
      },
      // @method getSouthEast(): LatLng
      // Returns the south-east point of the bounds.
      getSouthEast: function() {
        return new Tt(this.getSouth(), this.getEast());
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
        typeof t[0] == "number" || t instanceof Tt || "lat" in t ? t = St(t) : t = zt(t);
        var n = this._southWest, s = this._northEast, c, y;
        return t instanceof oe ? (c = t.getSouthWest(), y = t.getNorthEast()) : c = y = t, c.lat >= n.lat && y.lat <= s.lat && c.lng >= n.lng && y.lng <= s.lng;
      },
      // @method intersects(otherBounds: LatLngBounds): Boolean
      // Returns `true` if the rectangle intersects the given bounds. Two bounds intersect if they have at least one point in common.
      intersects: function(t) {
        t = zt(t);
        var n = this._southWest, s = this._northEast, c = t.getSouthWest(), y = t.getNorthEast(), A = y.lat >= n.lat && c.lat <= s.lat, Z = y.lng >= n.lng && c.lng <= s.lng;
        return A && Z;
      },
      // @method overlaps(otherBounds: LatLngBounds): Boolean
      // Returns `true` if the rectangle overlaps the given bounds. Two bounds overlap if their intersection is an area.
      overlaps: function(t) {
        t = zt(t);
        var n = this._southWest, s = this._northEast, c = t.getSouthWest(), y = t.getNorthEast(), A = y.lat > n.lat && c.lat < s.lat, Z = y.lng > n.lng && c.lng < s.lng;
        return A && Z;
      },
      // @method toBBoxString(): String
      // Returns a string with bounding box coordinates in a 'southwest_lng,southwest_lat,northeast_lng,northeast_lat' format. Useful for sending requests to web services that return geo data.
      toBBoxString: function() {
        return [this.getWest(), this.getSouth(), this.getEast(), this.getNorth()].join(",");
      },
      // @method equals(otherBounds: LatLngBounds, maxMargin?: Number): Boolean
      // Returns `true` if the rectangle is equivalent (within a small margin of error) to the given bounds. The margin of error can be overridden by setting `maxMargin` to a small number.
      equals: function(t, n) {
        return t ? (t = zt(t), this._southWest.equals(t.getSouthWest(), n) && this._northEast.equals(t.getNorthEast(), n)) : !1;
      },
      // @method isValid(): Boolean
      // Returns `true` if the bounds are properly initialized.
      isValid: function() {
        return !!(this._southWest && this._northEast);
      }
    };
    function zt(t, n) {
      return t instanceof oe ? t : new oe(t, n);
    }
    function Tt(t, n, s) {
      if (isNaN(t) || isNaN(n))
        throw new Error("Invalid LatLng object: (" + t + ", " + n + ")");
      this.lat = +t, this.lng = +n, s !== void 0 && (this.alt = +s);
    }
    Tt.prototype = {
      // @method equals(otherLatLng: LatLng, maxMargin?: Number): Boolean
      // Returns `true` if the given `LatLng` point is at the same position (within a small margin of error). The margin of error can be overridden by setting `maxMargin` to a small number.
      equals: function(t, n) {
        if (!t)
          return !1;
        t = St(t);
        var s = Math.max(
          Math.abs(this.lat - t.lat),
          Math.abs(this.lng - t.lng)
        );
        return s <= (n === void 0 ? 1e-9 : n);
      },
      // @method toString(): String
      // Returns a string representation of the point (for debugging purposes).
      toString: function(t) {
        return "LatLng(" + N(this.lat, t) + ", " + N(this.lng, t) + ")";
      },
      // @method distanceTo(otherLatLng: LatLng): Number
      // Returns the distance (in meters) to the given `LatLng` calculated using the [Spherical Law of Cosines](https://en.wikipedia.org/wiki/Spherical_law_of_cosines).
      distanceTo: function(t) {
        return fe.distance(this, St(t));
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
        return zt(
          [this.lat - n, this.lng - s],
          [this.lat + n, this.lng + s]
        );
      },
      clone: function() {
        return new Tt(this.lat, this.lng, this.alt);
      }
    };
    function St(t, n, s) {
      return t instanceof Tt ? t : Bt(t) && typeof t[0] != "object" ? t.length === 3 ? new Tt(t[0], t[1], t[2]) : t.length === 2 ? new Tt(t[0], t[1]) : null : t == null ? t : typeof t == "object" && "lat" in t ? new Tt(t.lat, "lng" in t ? t.lng : t.lon, t.alt) : n === void 0 ? null : new Tt(t, n, s);
    }
    var ve = {
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
        return new bt(c, y);
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
        var n = this.wrapLng ? T(t.lng, this.wrapLng, !0) : t.lng, s = this.wrapLat ? T(t.lat, this.wrapLat, !0) : t.lat, c = t.alt;
        return new Tt(s, n, c);
      },
      // @method wrapLatLngBounds(bounds: LatLngBounds): LatLngBounds
      // Returns a `LatLngBounds` with the same size as the given one, ensuring
      // that its center is within the CRS's bounds.
      // Only accepts actual `L.LatLngBounds` instances, not arrays.
      wrapLatLngBounds: function(t) {
        var n = t.getCenter(), s = this.wrapLatLng(n), c = n.lat - s.lat, y = n.lng - s.lng;
        if (c === 0 && y === 0)
          return t;
        var A = t.getSouthWest(), Z = t.getNorthEast(), rt = new Tt(A.lat - c, A.lng - y), ht = new Tt(Z.lat - c, Z.lng - y);
        return new oe(rt, ht);
      }
    }, fe = b({}, ve, {
      wrapLng: [-180, 180],
      // Mean Earth Radius, as recommended for use by
      // the International Union of Geodesy and Geophysics,
      // see https://rosettacode.org/wiki/Haversine_formula
      R: 6371e3,
      // distance between two geographical points using spherical law of cosines approximation
      distance: function(t, n) {
        var s = Math.PI / 180, c = t.lat * s, y = n.lat * s, A = Math.sin((n.lat - t.lat) * s / 2), Z = Math.sin((n.lng - t.lng) * s / 2), rt = A * A + Math.cos(c) * Math.cos(y) * Z * Z, ht = 2 * Math.atan2(Math.sqrt(rt), Math.sqrt(1 - rt));
        return this.R * ht;
      }
    }), we = 6378137, Bi = {
      R: we,
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
        return new Tt(
          (2 * Math.atan(Math.exp(t.y / this.R)) - Math.PI / 2) * n,
          t.x * n / this.R
        );
      },
      bounds: function() {
        var t = we * Math.PI;
        return new bt([-t, -t], [t, t]);
      }()
    };
    function fn(t, n, s, c) {
      if (Bt(t)) {
        this._a = t[0], this._b = t[1], this._c = t[2], this._d = t[3];
        return;
      }
      this._a = t, this._b = n, this._c = s, this._d = c;
    }
    fn.prototype = {
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
      return new fn(t, n, s, c);
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
    function tr(t) {
      return document.createElementNS("http://www.w3.org/2000/svg", t);
    }
    function er(t, n) {
      var s = "", c, y, A, Z, rt, ht;
      for (c = 0, A = t.length; c < A; c++) {
        for (rt = t[c], y = 0, Z = rt.length; y < Z; y++)
          ht = rt[y], s += (y ? "L" : "M") + ht.x + " " + ht.y;
        s += n ? Ut.svg ? "z" : "x" : "";
      }
      return s || "M0 0";
    }
    var zi = document.documentElement.style, Ni = "ActiveXObject" in window, ir = Ni && !document.addEventListener, Tn = "msLaunchUri" in navigator && !("documentMode" in document), ji = ci("webkit"), ti = ci("android"), pn = ci("android 2") || ci("android 3"), Tr = parseInt(/WebKit\/([0-9]+)|$/.exec(navigator.userAgent)[1], 10), _i = ti && ci("Google") && Tr < 537 && !("AudioNode" in window), Dn = !!window.opera, P = !Tn && ci("chrome"), m = ci("gecko") && !ji && !Dn && !Ni, v = !P && ci("safari"), R = ci("phantom"), Q = "OTransition" in zi, ot = navigator.platform.indexOf("Win") === 0, mt = Ni && "transition" in zi, Yt = "WebKitCSSMatrix" in window && "m11" in new window.WebKitCSSMatrix() && !pn, ge = "MozPerspective" in zi, be = !window.L_DISABLE_3D && (mt || Yt || ge) && !Q && !R, _e = typeof orientation < "u" || ci("mobile"), ye = _e && ji, qs = _e && Yt, Dr = !window.PointerEvent && window.MSPointerEvent, Fa = !!(window.PointerEvent || Dr), Ra = "ontouchstart" in window || !!window.TouchEvent, Hs = !window.L_NO_TOUCH && (Ra || Fa), Ks = _e && Dn, za = _e && m, Na = (window.devicePixelRatio || window.screen.deviceXDPI / window.screen.logicalXDPI) > 1, Ws = function() {
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
    }(), Js = function() {
      return !!document.createElement("canvas").getContext;
    }(), Or = !!(document.createElementNS && tr("svg").createSVGRect), ja = !!Or && function() {
      var t = document.createElement("div");
      return t.innerHTML = "<svg/>", (t.firstChild && t.firstChild.namespaceURI) === "http://www.w3.org/2000/svg";
    }(), Xs = !Or && function() {
      try {
        var t = document.createElement("div");
        t.innerHTML = '<v:shape adj="1"/>';
        var n = t.firstChild;
        return n.style.behavior = "url(#default#VML)", n && typeof n.adj == "object";
      } catch {
        return !1;
      }
    }(), Ys = navigator.platform.indexOf("Mac") === 0, Qs = navigator.platform.indexOf("Linux") === 0;
    function ci(t) {
      return navigator.userAgent.toLowerCase().indexOf(t) >= 0;
    }
    var Ut = {
      ie: Ni,
      ielt9: ir,
      edge: Tn,
      webkit: ji,
      android: ti,
      android23: pn,
      androidStock: _i,
      opera: Dn,
      chrome: P,
      gecko: m,
      safari: v,
      phantom: R,
      opera12: Q,
      win: ot,
      ie3d: mt,
      webkit3d: Yt,
      gecko3d: ge,
      any3d: be,
      mobile: _e,
      mobileWebkit: ye,
      mobileWebkit3d: qs,
      msPointer: Dr,
      pointer: Fa,
      touch: Hs,
      touchNative: Ra,
      mobileOpera: Ks,
      mobileGecko: za,
      retina: Na,
      passiveEvents: Ws,
      canvas: Js,
      svg: Or,
      vml: Xs,
      inlineSvg: ja,
      mac: Ys,
      linux: Qs
    }, Va = Ut.msPointer ? "MSPointerDown" : "pointerdown", $a = Ut.msPointer ? "MSPointerMove" : "pointermove", Ir = Ut.msPointer ? "MSPointerUp" : "pointerup", Ua = Ut.msPointer ? "MSPointerCancel" : "pointercancel", Fr = {
      touchstart: Va,
      touchmove: $a,
      touchend: Ir,
      touchcancel: Ua
    }, Ga = {
      touchstart: ro,
      touchmove: rr,
      touchend: rr,
      touchcancel: rr
    }, mn = {}, Za = !1;
    function to(t, n, s) {
      return n === "touchstart" && Rr(), Ga[n] ? (s = Ga[n].bind(this, s), t.addEventListener(Fr[n], s, !1), s) : (console.warn("wrong event specified:", n), M);
    }
    function eo(t, n, s) {
      if (!Fr[n]) {
        console.warn("wrong event specified:", n);
        return;
      }
      t.removeEventListener(Fr[n], s, !1);
    }
    function io(t) {
      mn[t.pointerId] = t;
    }
    function no(t) {
      mn[t.pointerId] && (mn[t.pointerId] = t);
    }
    function nr(t) {
      delete mn[t.pointerId];
    }
    function Rr() {
      Za || (document.addEventListener(Va, io, !0), document.addEventListener($a, no, !0), document.addEventListener(Ir, nr, !0), document.addEventListener(Ua, nr, !0), Za = !0);
    }
    function rr(t, n) {
      if (n.pointerType !== (n.MSPOINTER_TYPE_MOUSE || "mouse")) {
        n.touches = [];
        for (var s in mn)
          n.touches.push(mn[s]);
        n.changedTouches = [n], t(n);
      }
    }
    function ro(t, n) {
      n.MSPOINTER_TYPE_TOUCH && n.pointerType === n.MSPOINTER_TYPE_TOUCH && Ie(n), rr(t, n);
    }
    function ao(t) {
      var n = {}, s, c;
      for (c in t)
        s = t[c], n[c] = s && s.bind ? s.bind(t) : s;
      return t = n, n.type = "dblclick", n.detail = 2, n.isTrusted = !1, n._simulated = !0, n;
    }
    var so = 200;
    function oo(t, n) {
      t.addEventListener("dblclick", n);
      var s = 0, c;
      function y(A) {
        if (A.detail !== 1) {
          c = A.detail;
          return;
        }
        if (!(A.pointerType === "mouse" || A.sourceCapabilities && !A.sourceCapabilities.firesTouchEvents)) {
          var Z = Ja(A);
          if (!(Z.some(function(ht) {
            return ht instanceof HTMLLabelElement && ht.attributes.for;
          }) && !Z.some(function(ht) {
            return ht instanceof HTMLInputElement || ht instanceof HTMLSelectElement;
          }))) {
            var rt = Date.now();
            rt - s <= so ? (c++, c === 2 && n(ao(A))) : c = 1, s = rt;
          }
        }
      }
      return t.addEventListener("click", y), {
        dblclick: n,
        simDblclick: y
      };
    }
    function lo(t, n) {
      t.removeEventListener("dblclick", n.dblclick), t.removeEventListener("click", n.simDblclick);
    }
    var zr = sr(
      ["transform", "webkitTransform", "OTransform", "MozTransform", "msTransform"]
    ), On = sr(
      ["webkitTransition", "transition", "OTransition", "MozTransition", "msTransition"]
    ), qa = On === "webkitTransition" || On === "OTransition" ? On + "End" : "transitionend";
    function Ha(t) {
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
    function ke(t) {
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
    function gn(t) {
      var n = t.parentNode;
      n && n.firstChild !== t && n.insertBefore(t, n.firstChild);
    }
    function Nr(t, n) {
      if (t.classList !== void 0)
        return t.classList.contains(n);
      var s = ar(t);
      return s.length > 0 && new RegExp("(^|\\s)" + n + "(\\s|$)").test(s);
    }
    function ie(t, n) {
      if (t.classList !== void 0)
        for (var s = G(n), c = 0, y = s.length; c < y; c++)
          t.classList.add(s[c]);
      else if (!Nr(t, n)) {
        var A = ar(t);
        jr(t, (A ? A + " " : "") + n);
      }
    }
    function Ee(t, n) {
      t.classList !== void 0 ? t.classList.remove(n) : jr(t, j((" " + ar(t) + " ").replace(" " + n + " ", " ")));
    }
    function jr(t, n) {
      t.className.baseVal === void 0 ? t.className = n : t.className.baseVal = n;
    }
    function ar(t) {
      return t.correspondingElement && (t = t.correspondingElement), t.className.baseVal === void 0 ? t.className : t.className.baseVal;
    }
    function ri(t, n) {
      "opacity" in t.style ? t.style.opacity = n : "filter" in t.style && uo(t, n);
    }
    function uo(t, n) {
      var s = !1, c = "DXImageTransform.Microsoft.Alpha";
      try {
        s = t.filters.item(c);
      } catch {
        if (n === 1)
          return;
      }
      n = Math.round(n * 100), s ? (s.Enabled = n !== 100, s.Opacity = n) : t.style.filter += " progid:" + c + "(opacity=" + n + ")";
    }
    function sr(t) {
      for (var n = document.documentElement.style, s = 0; s < t.length; s++)
        if (t[s] in n)
          return t[s];
      return !1;
    }
    function Qi(t, n, s) {
      var c = n || new Ot(0, 0);
      t.style[zr] = (Ut.ie3d ? "translate(" + c.x + "px," + c.y + "px)" : "translate3d(" + c.x + "px," + c.y + "px,0)") + (s ? " scale(" + s + ")" : "");
    }
    function Be(t, n) {
      t._leaflet_pos = n, Ut.any3d ? Qi(t, n) : (t.style.left = n.x + "px", t.style.top = n.y + "px");
    }
    function $i(t) {
      return t._leaflet_pos || new Ot(0, 0);
    }
    var Fn, Rn, Vr;
    if ("onselectstart" in document)
      Fn = function() {
        Qt(window, "selectstart", Ie);
      }, Rn = function() {
        pe(window, "selectstart", Ie);
      };
    else {
      var zn = sr(
        ["userSelect", "WebkitUserSelect", "OUserSelect", "MozUserSelect", "msUserSelect"]
      );
      Fn = function() {
        if (zn) {
          var t = document.documentElement.style;
          Vr = t[zn], t[zn] = "none";
        }
      }, Rn = function() {
        zn && (document.documentElement.style[zn] = Vr, Vr = void 0);
      };
    }
    function $r() {
      Qt(window, "dragstart", Ie);
    }
    function Ur() {
      pe(window, "dragstart", Ie);
    }
    var or, Gr;
    function Zr(t) {
      for (; t.tabIndex === -1; )
        t = t.parentNode;
      t.style && (lr(), or = t, Gr = t.style.outlineStyle, t.style.outlineStyle = "none", Qt(window, "keydown", lr));
    }
    function lr() {
      or && (or.style.outlineStyle = Gr, or = void 0, Gr = void 0, pe(window, "keydown", lr));
    }
    function Ka(t) {
      do
        t = t.parentNode;
      while ((!t.offsetWidth || !t.offsetHeight) && t !== document.body);
      return t;
    }
    function qr(t) {
      var n = t.getBoundingClientRect();
      return {
        x: n.width / t.offsetWidth || 1,
        y: n.height / t.offsetHeight || 1,
        boundingClientRect: n
      };
    }
    var ho = {
      __proto__: null,
      TRANSFORM: zr,
      TRANSITION: On,
      TRANSITION_END: qa,
      get: Ha,
      getStyle: Vi,
      create: de,
      remove: ke,
      empty: In,
      toFront: _n,
      toBack: gn,
      hasClass: Nr,
      addClass: ie,
      removeClass: Ee,
      setClass: jr,
      getClass: ar,
      setOpacity: ri,
      testProp: sr,
      setTransform: Qi,
      setPosition: Be,
      getPosition: $i,
      get disableTextSelection() {
        return Fn;
      },
      get enableTextSelection() {
        return Rn;
      },
      disableImageDrag: $r,
      enableImageDrag: Ur,
      preventOutline: Zr,
      restoreOutline: lr,
      getSizedParentNode: Ka,
      getScale: qr
    };
    function Qt(t, n, s, c) {
      if (n && typeof n == "object")
        for (var y in n)
          Kr(t, y, n[y], s);
      else {
        n = G(n);
        for (var A = 0, Z = n.length; A < Z; A++)
          Kr(t, n[A], s, c);
      }
      return this;
    }
    var gi = "_leaflet_events";
    function pe(t, n, s, c) {
      if (arguments.length === 1)
        Wa(t), delete t[gi];
      else if (n && typeof n == "object")
        for (var y in n)
          Wr(t, y, n[y], s);
      else if (n = G(n), arguments.length === 2)
        Wa(t, function(rt) {
          return ue(n, rt) !== -1;
        });
      else
        for (var A = 0, Z = n.length; A < Z; A++)
          Wr(t, n[A], s, c);
      return this;
    }
    function Wa(t, n) {
      for (var s in t[gi]) {
        var c = s.split(/\d/)[0];
        (!n || n(c)) && Wr(t, c, null, null, s);
      }
    }
    var Hr = {
      mouseenter: "mouseover",
      mouseleave: "mouseout",
      wheel: !("onwheel" in window) && "mousewheel"
    };
    function Kr(t, n, s, c) {
      var y = n + w(s) + (c ? "_" + w(c) : "");
      if (t[gi] && t[gi][y])
        return this;
      var A = function(rt) {
        return s.call(c || t, rt || window.event);
      }, Z = A;
      !Ut.touchNative && Ut.pointer && n.indexOf("touch") === 0 ? A = to(t, n, A) : Ut.touch && n === "dblclick" ? A = oo(t, A) : "addEventListener" in t ? n === "touchstart" || n === "touchmove" || n === "wheel" || n === "mousewheel" ? t.addEventListener(Hr[n] || n, A, Ut.passiveEvents ? { passive: !1 } : !1) : n === "mouseenter" || n === "mouseleave" ? (A = function(rt) {
        rt = rt || window.event, ur(t, rt) && Z(rt);
      }, t.addEventListener(Hr[n], A, !1)) : t.addEventListener(n, Z, !1) : t.attachEvent("on" + n, A), t[gi] = t[gi] || {}, t[gi][y] = A;
    }
    function Wr(t, n, s, c, y) {
      y = y || n + w(s) + (c ? "_" + w(c) : "");
      var A = t[gi] && t[gi][y];
      if (!A)
        return this;
      !Ut.touchNative && Ut.pointer && n.indexOf("touch") === 0 ? eo(t, n, A) : Ut.touch && n === "dblclick" ? lo(t, A) : "removeEventListener" in t ? t.removeEventListener(Hr[n] || n, A, !1) : t.detachEvent("on" + n, A), t[gi][y] = null;
    }
    function tn(t) {
      return t.stopPropagation ? t.stopPropagation() : t.originalEvent ? t.originalEvent._stopped = !0 : t.cancelBubble = !0, this;
    }
    function Jr(t) {
      return Kr(t, "wheel", tn), this;
    }
    function Nn(t) {
      return Qt(t, "mousedown touchstart dblclick contextmenu", tn), t._leaflet_disable_click = !0, this;
    }
    function Ie(t) {
      return t.preventDefault ? t.preventDefault() : t.returnValue = !1, this;
    }
    function en(t) {
      return Ie(t), tn(t), this;
    }
    function Ja(t) {
      if (t.composedPath)
        return t.composedPath();
      for (var n = [], s = t.target; s; )
        n.push(s), s = s.parentNode;
      return n;
    }
    function jn(t, n) {
      if (!n)
        return new Ot(t.clientX, t.clientY);
      var s = qr(n), c = s.boundingClientRect;
      return new Ot(
        // offset.left/top values are in page scale (like clientX/Y),
        // whereas clientLeft/Top (border width) values are the original values (before CSS scale applies).
        (t.clientX - c.left) / s.x - n.clientLeft,
        (t.clientY - c.top) / s.y - n.clientTop
      );
    }
    var co = Ut.linux && Ut.chrome ? window.devicePixelRatio : Ut.mac ? window.devicePixelRatio * 3 : window.devicePixelRatio > 0 ? 2 * window.devicePixelRatio : 1;
    function Xa(t) {
      return Ut.edge ? t.wheelDeltaY / 2 : (
        // Don't trust window-geometry-based delta
        t.deltaY && t.deltaMode === 0 ? -t.deltaY / co : (
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
    function ur(t, n) {
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
    var he = {
      __proto__: null,
      on: Qt,
      off: pe,
      stopPropagation: tn,
      disableScrollPropagation: Jr,
      disableClickPropagation: Nn,
      preventDefault: Ie,
      stop: en,
      getPropagationPath: Ja,
      getMousePosition: jn,
      getWheelDelta: Xa,
      isExternalTarget: ur,
      addListener: Qt,
      removeListener: pe
    }, Ya = Jt.extend({
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
        this._animId = Kt(this._animate, this), this._step();
      },
      _step: function(t) {
        var n = +/* @__PURE__ */ new Date() - this._startTime, s = this._duration * 1e3;
        n < s ? this._runFrame(this._easeOut(n / s), t) : (this._runFrame(1), this._complete());
      },
      _runFrame: function(t, n) {
        var s = this._startPos.add(this._offset.multiplyBy(t));
        n && s._round(), Be(this._el, s), this.fire("step");
      },
      _complete: function() {
        ce(this._animId), this._inProgress = !1, this.fire("end");
      },
      _easeOut: function(t) {
        return 1 - Math.pow(1 - t, this._easeOutPower);
      }
    }), ae = Jt.extend({
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
        n = Y(this, n), this._handlers = [], this._layers = {}, this._zoomBoundLayers = {}, this._sizeChanged = !0, this._initContainer(t), this._initLayout(), this._onResize = x(this._onResize, this), this._initEvents(), n.maxBounds && this.setMaxBounds(n.maxBounds), n.zoom !== void 0 && (this._zoom = this._limitZoom(n.zoom)), n.center && n.zoom !== void 0 && this.setView(St(n.center), n.zoom, { reset: !0 }), this.callInitHooks(), this._zoomAnimated = On && Ut.any3d && !Ut.mobileOpera && this.options.zoomAnimation, this._zoomAnimated && (this._createAnimProxy(), Qt(this._proxy, qa, this._catchTransitionEnd, this)), this._addLayers(this.options.layers);
      },
      // @section Methods for modifying map state
      // @method setView(center: LatLng, zoom: Number, options?: Zoom/pan options): this
      // Sets the view of the map (geographical center and zoom) with the given
      // animation options.
      setView: function(t, n, s) {
        if (n = n === void 0 ? this._zoom : this._limitZoom(n), t = this._limitCenter(St(t), n, this.options.maxBounds), s = s || {}, this._stop(), this._loaded && !s.reset && s !== !0) {
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
        return t = t || (Ut.any3d ? this.options.zoomDelta : 1), this.setZoom(this._zoom + t, n);
      },
      // @method zoomOut(delta?: Number, options?: Zoom options): this
      // Decreases the zoom of the map by `delta` ([`zoomDelta`](#map-zoomdelta) by default).
      zoomOut: function(t, n) {
        return t = t || (Ut.any3d ? this.options.zoomDelta : 1), this.setZoom(this._zoom - t, n);
      },
      // @method setZoomAround(latlng: LatLng, zoom: Number, options: Zoom options): this
      // Zooms the map while keeping a specified geographical point on the map
      // stationary (e.g. used internally for scroll zoom and double-click zoom).
      // @alternative
      // @method setZoomAround(offset: Point, zoom: Number, options: Zoom options): this
      // Zooms the map while keeping a specified pixel on the map (relative to the top-left corner) stationary.
      setZoomAround: function(t, n, s) {
        var c = this.getZoomScale(n), y = this.getSize().divideBy(2), A = t instanceof Ot ? t : this.latLngToContainerPoint(t), Z = A.subtract(y).multiplyBy(1 - 1 / c), rt = this.containerPointToLatLng(y.add(Z));
        return this.setView(rt, n, { zoom: s });
      },
      _getBoundsCenterZoom: function(t, n) {
        n = n || {}, t = t.getBounds ? t.getBounds() : zt(t);
        var s = ut(n.paddingTopLeft || n.padding || [0, 0]), c = ut(n.paddingBottomRight || n.padding || [0, 0]), y = this.getBoundsZoom(t, !1, s.add(c));
        if (y = typeof n.maxZoom == "number" ? Math.min(n.maxZoom, y) : y, y === 1 / 0)
          return {
            center: t.getCenter(),
            zoom: y
          };
        var A = c.subtract(s).divideBy(2), Z = this.project(t.getSouthWest(), y), rt = this.project(t.getNorthEast(), y), ht = this.unproject(Z.add(rt).divideBy(2).add(A), y);
        return {
          center: ht,
          zoom: y
        };
      },
      // @method fitBounds(bounds: LatLngBounds, options?: fitBounds options): this
      // Sets a map view that contains the given geographical bounds with the
      // maximum zoom level possible.
      fitBounds: function(t, n) {
        if (t = zt(t), !t.isValid())
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
        if (t = ut(t).round(), n = n || {}, !t.x && !t.y)
          return this.fire("moveend");
        if (n.animate !== !0 && !this.getSize().contains(t))
          return this._resetView(this.unproject(this.project(this.getCenter()).add(t)), this.getZoom()), this;
        if (this._panAnim || (this._panAnim = new Ya(), this._panAnim.on({
          step: this._onPanTransitionStep,
          end: this._onPanTransitionEnd
        }, this)), n.noMoveStart || this.fire("movestart"), n.animate !== !1) {
          ie(this._mapPane, "leaflet-pan-anim");
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
        if (s = s || {}, s.animate === !1 || !Ut.any3d)
          return this.setView(t, n, s);
        this._stop();
        var c = this.project(this.getCenter()), y = this.project(t), A = this.getSize(), Z = this._zoom;
        t = St(t), n = n === void 0 ? Z : n;
        var rt = Math.max(A.x, A.y), ht = rt * this.getZoomScale(Z, n), gt = y.distanceTo(c) || 1, It = 1.42, qt = It * It;
        function ne(Ce) {
          var Ue = Ce ? -1 : 1, Ke = Ce ? ht : rt, Es = ht * ht - rt * rt + Ue * qt * qt * gt * gt, fi = 2 * Ke * qt * gt, Wt = Es / fi, xr = Math.sqrt(Wt * Wt + 1) - Wt, da = xr < 1e-9 ? -18 : Math.log(xr);
          return da;
        }
        function $e(Ce) {
          return (Math.exp(Ce) - Math.exp(-Ce)) / 2;
        }
        function De(Ce) {
          return (Math.exp(Ce) + Math.exp(-Ce)) / 2;
        }
        function ui(Ce) {
          return $e(Ce) / De(Ce);
        }
        var He = ne(0);
        function Hi(Ce) {
          return rt * (De(He) / De(He + It * Ce));
        }
        function Ls(Ce) {
          return rt * (De(He) * ui(He + It * Ce) - $e(He)) / qt;
        }
        function ca(Ce) {
          return 1 - Math.pow(1 - Ce, 1.5);
        }
        var So = Date.now(), ks = (ne(1) - He) / It, Po = s.duration ? 1e3 * s.duration : 1e3 * ks * 0.8;
        function Cs() {
          var Ce = (Date.now() - So) / Po, Ue = ca(Ce) * ks;
          Ce <= 1 ? (this._flyToFrame = Kt(Cs, this), this._move(
            this.unproject(c.add(y.subtract(c).multiplyBy(Ls(Ue) / gt)), Z),
            this.getScaleZoom(rt / Hi(Ue), Z),
            { flyTo: !0 }
          )) : this._move(t, n)._moveEnd(!0);
        }
        return this._moveStart(!0, s.noMoveStart), Cs.call(this), this;
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
        return t = zt(t), this.listens("moveend", this._panInsideMaxBounds) && this.off("moveend", this._panInsideMaxBounds), t.isValid() ? (this.options.maxBounds = t, this._loaded && this._panInsideMaxBounds(), this.on("moveend", this._panInsideMaxBounds)) : (this.options.maxBounds = null, this);
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
        var s = this.getCenter(), c = this._limitCenter(s, this._zoom, zt(t));
        return s.equals(c) || this.panTo(c, n), this._enforcingBounds = !1, this;
      },
      // @method panInside(latlng: LatLng, options?: padding options): this
      // Pans the map the minimum amount to make the `latlng` visible. Use
      // padding options to fit the display to more restricted bounds.
      // If `latlng` is already within the (optionally padded) display bounds,
      // the map will not be panned.
      panInside: function(t, n) {
        n = n || {};
        var s = ut(n.paddingTopLeft || n.padding || [0, 0]), c = ut(n.paddingBottomRight || n.padding || [0, 0]), y = this.project(this.getCenter()), A = this.project(t), Z = this.getPixelBounds(), rt = Ct([Z.min.add(s), Z.max.subtract(c)]), ht = rt.getSize();
        if (!rt.contains(A)) {
          this._enforcingBounds = !0;
          var gt = A.subtract(rt.getCenter()), It = rt.extend(A).getSize().subtract(ht);
          y.x += gt.x < 0 ? -It.x : It.x, y.y += gt.y < 0 ? -It.y : It.y, this.panTo(this.unproject(y), n), this._enforcingBounds = !1;
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
        var s = this.getSize(), c = n.divideBy(2).round(), y = s.divideBy(2).round(), A = c.subtract(y);
        return !A.x && !A.y ? this : (t.animate && t.pan ? this.panBy(A) : (t.pan && this._rawPanBy(A), this.fire("move"), t.debounceMoveend ? (clearTimeout(this._sizeTimer), this._sizeTimer = setTimeout(x(this.fire, this, "moveend"), 200)) : this.fire("moveend")), this.fire("resize", {
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
        var n = x(this._handleGeolocationResponse, this), s = x(this._handleGeolocationError, this);
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
          var n = t.coords.latitude, s = t.coords.longitude, c = new Tt(n, s), y = c.toBounds(t.coords.accuracy * 2), A = this._locateOptions;
          if (A.setView) {
            var Z = this.getBoundsZoom(y);
            this.setView(c, A.maxZoom ? Math.min(Z, A.maxZoom) : Z);
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
        this._locationWatchId !== void 0 && this.stopLocate(), this._stop(), ke(this._mapPane), this._clearControlPos && this._clearControlPos(), this._resizeRequest && (ce(this._resizeRequest), this._resizeRequest = null), this._clearHandlers(), this._loaded && this.fire("unload");
        var t;
        for (t in this._layers)
          this._layers[t].remove();
        for (t in this._panes)
          ke(this._panes[t]);
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
        return new oe(n, s);
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
        t = zt(t), s = ut(s || [0, 0]);
        var c = this.getZoom() || 0, y = this.getMinZoom(), A = this.getMaxZoom(), Z = t.getNorthWest(), rt = t.getSouthEast(), ht = this.getSize().subtract(s), gt = Ct(this.project(rt, c), this.project(Z, c)).getSize(), It = Ut.any3d ? this.options.zoomSnap : 1, qt = ht.x / gt.x, ne = ht.y / gt.y, $e = n ? Math.max(qt, ne) : Math.min(qt, ne);
        return c = this.getScaleZoom($e, c), It && (c = Math.round(c / (It / 100)) * (It / 100), c = n ? Math.ceil(c / It) * It : Math.floor(c / It) * It), Math.max(y, Math.min(A, c));
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
        return new bt(s, s.add(this.getSize()));
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
        return n = n === void 0 ? this._zoom : n, this.options.crs.latLngToPoint(St(t), n);
      },
      // @method unproject(point: Point, zoom: Number): LatLng
      // Inverse of [`project`](#map-project).
      unproject: function(t, n) {
        return n = n === void 0 ? this._zoom : n, this.options.crs.pointToLatLng(ut(t), n);
      },
      // @method layerPointToLatLng(point: Point): LatLng
      // Given a pixel coordinate relative to the [origin pixel](#map-getpixelorigin),
      // returns the corresponding geographical coordinate (for the current zoom level).
      layerPointToLatLng: function(t) {
        var n = ut(t).add(this.getPixelOrigin());
        return this.unproject(n);
      },
      // @method latLngToLayerPoint(latlng: LatLng): Point
      // Given a geographical coordinate, returns the corresponding pixel coordinate
      // relative to the [origin pixel](#map-getpixelorigin).
      latLngToLayerPoint: function(t) {
        var n = this.project(St(t))._round();
        return n._subtract(this.getPixelOrigin());
      },
      // @method wrapLatLng(latlng: LatLng): LatLng
      // Returns a `LatLng` where `lat` and `lng` has been wrapped according to the
      // map's CRS's `wrapLat` and `wrapLng` properties, if they are outside the
      // CRS's bounds.
      // By default this means longitude is wrapped around the dateline so its
      // value is between -180 and +180 degrees.
      wrapLatLng: function(t) {
        return this.options.crs.wrapLatLng(St(t));
      },
      // @method wrapLatLngBounds(bounds: LatLngBounds): LatLngBounds
      // Returns a `LatLngBounds` with the same size as the given one, ensuring that
      // its center is within the CRS's bounds.
      // By default this means the center longitude is wrapped around the dateline so its
      // value is between -180 and +180 degrees, and the majority of the bounds
      // overlaps the CRS's bounds.
      wrapLatLngBounds: function(t) {
        return this.options.crs.wrapLatLngBounds(zt(t));
      },
      // @method distance(latlng1: LatLng, latlng2: LatLng): Number
      // Returns the distance between two geographical coordinates according to
      // the map's CRS. By default this measures distance in meters.
      distance: function(t, n) {
        return this.options.crs.distance(St(t), St(n));
      },
      // @method containerPointToLayerPoint(point: Point): Point
      // Given a pixel coordinate relative to the map container, returns the corresponding
      // pixel coordinate relative to the [origin pixel](#map-getpixelorigin).
      containerPointToLayerPoint: function(t) {
        return ut(t).subtract(this._getMapPanePos());
      },
      // @method layerPointToContainerPoint(point: Point): Point
      // Given a pixel coordinate relative to the [origin pixel](#map-getpixelorigin),
      // returns the corresponding pixel coordinate relative to the map container.
      layerPointToContainerPoint: function(t) {
        return ut(t).add(this._getMapPanePos());
      },
      // @method containerPointToLatLng(point: Point): LatLng
      // Given a pixel coordinate relative to the map container, returns
      // the corresponding geographical coordinate (for the current zoom level).
      containerPointToLatLng: function(t) {
        var n = this.containerPointToLayerPoint(ut(t));
        return this.layerPointToLatLng(n);
      },
      // @method latLngToContainerPoint(latlng: LatLng): Point
      // Given a geographical coordinate, returns the corresponding pixel coordinate
      // relative to the map container.
      latLngToContainerPoint: function(t) {
        return this.layerPointToContainerPoint(this.latLngToLayerPoint(St(t)));
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
        var n = this._container = Ha(t);
        if (n) {
          if (n._leaflet_id)
            throw new Error("Map container is already initialized.");
        } else throw new Error("Map container not found.");
        Qt(n, "scroll", this._onScroll, this), this._containerId = w(n);
      },
      _initLayout: function() {
        var t = this._container;
        this._fadeAnimated = this.options.fadeAnimation && Ut.any3d, ie(t, "leaflet-container" + (Ut.touch ? " leaflet-touch" : "") + (Ut.retina ? " leaflet-retina" : "") + (Ut.ielt9 ? " leaflet-oldie" : "") + (Ut.safari ? " leaflet-safari" : "") + (this._fadeAnimated ? " leaflet-fade-anim" : ""));
        var n = Vi(t, "position");
        n !== "absolute" && n !== "relative" && n !== "fixed" && n !== "sticky" && (t.style.position = "relative"), this._initPanes(), this._initControlPos && this._initControlPos();
      },
      _initPanes: function() {
        var t = this._panes = {};
        this._paneRenderers = {}, this._mapPane = this.createPane("mapPane", this._container), Be(this._mapPane, new Ot(0, 0)), this.createPane("tilePane"), this.createPane("overlayPane"), this.createPane("shadowPane"), this.createPane("markerPane"), this.createPane("tooltipPane"), this.createPane("popupPane"), this.options.markerZoomAnimation || (ie(t.markerPane, "leaflet-zoom-hide"), ie(t.shadowPane, "leaflet-zoom-hide"));
      },
      // private methods that modify map state
      // @section Map state change events
      _resetView: function(t, n, s) {
        Be(this._mapPane, new Ot(0, 0));
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
        return ce(this._flyToFrame), this._panAnim && this._panAnim.stop(), this;
      },
      _rawPanBy: function(t) {
        Be(this._mapPane, this._getMapPanePos().subtract(t));
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
        this._targets = {}, this._targets[w(this._container)] = this;
        var n = t ? pe : Qt;
        n(this._container, "click dblclick mousedown mouseup mouseover mouseout mousemove contextmenu keypress keydown keyup", this._handleDOMEvent, this), this.options.trackResize && n(window, "resize", this._onResize, this), Ut.any3d && this.options.transform3DLimit && (t ? this.off : this.on).call(this, "moveend", this._onMoveEnd);
      },
      _onResize: function() {
        ce(this._resizeRequest), this._resizeRequest = Kt(
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
        for (var s = [], c, y = n === "mouseout" || n === "mouseover", A = t.target || t.srcElement, Z = !1; A; ) {
          if (c = this._targets[w(A)], c && (n === "click" || n === "preclick") && this._draggableMoved(c)) {
            Z = !0;
            break;
          }
          if (c && c.listens(n, !0) && (y && !ur(A, t) || (s.push(c), y)) || A === this._container)
            break;
          A = A.parentNode;
        }
        return !s.length && !Z && !y && this.listens(n, !0) && (s = [this]), s;
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
          s === "mousedown" && Zr(n), this._fireDOMEvent(t, s);
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
          for (var A = [], Z = 0; Z < s.length; Z++)
            s[Z].listens(n, !0) && A.push(s[Z]);
          y = A.concat(y);
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
          for (Z = 0; Z < y.length; Z++)
            if (y[Z].fire(n, ht, !0), ht.originalEvent._stopped || y[Z].options.bubblingMouseEvents === !1 && ue(this._mouseEvents, n) !== -1)
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
        return Ct([
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
        var c = this.project(t, n), y = this.getSize().divideBy(2), A = new bt(c.subtract(y), c.add(y)), Z = this._getBoundsOffset(A, s, n);
        return Math.abs(Z.x) <= 1 && Math.abs(Z.y) <= 1 ? t : this.unproject(c.add(Z), n);
      },
      // adjust offset for view to get inside bounds
      _limitOffset: function(t, n) {
        if (!n)
          return t;
        var s = this.getPixelBounds(), c = new bt(s.min.add(t), s.max.add(t));
        return t.add(this._getBoundsOffset(c, n));
      },
      // returns offset needed for pxBounds to get inside maxBounds at a specified zoom
      _getBoundsOffset: function(t, n, s) {
        var c = Ct(
          this.project(n.getNorthEast(), s),
          this.project(n.getSouthWest(), s)
        ), y = c.min.subtract(t.min), A = c.max.subtract(t.max), Z = this._rebound(y.x, -A.x), rt = this._rebound(y.y, -A.y);
        return new Ot(Z, rt);
      },
      _rebound: function(t, n) {
        return t + n > 0 ? Math.round(t - n) / 2 : Math.max(0, Math.ceil(t)) - Math.max(0, Math.floor(n));
      },
      _limitZoom: function(t) {
        var n = this.getMinZoom(), s = this.getMaxZoom(), c = Ut.any3d ? this.options.zoomSnap : 1;
        return c && (t = Math.round(t / c) * c), Math.max(n, Math.min(s, t));
      },
      _onPanTransitionStep: function() {
        this.fire("move");
      },
      _onPanTransitionEnd: function() {
        Ee(this._mapPane, "leaflet-pan-anim"), this.fire("moveend");
      },
      _tryAnimatedPan: function(t, n) {
        var s = this._getCenterOffset(t)._trunc();
        return (n && n.animate) !== !0 && !this.getSize().contains(s) ? !1 : (this.panBy(s, n), !0);
      },
      _createAnimProxy: function() {
        var t = this._proxy = de("div", "leaflet-proxy leaflet-zoom-animated");
        this._panes.mapPane.appendChild(t), this.on("zoomanim", function(n) {
          var s = zr, c = this._proxy.style[s];
          Qi(this._proxy, this.project(n.center, n.zoom), this.getZoomScale(n.zoom, 1)), c === this._proxy.style[s] && this._animatingZoom && this._onZoomTransitionEnd();
        }, this), this.on("load moveend", this._animMoveEnd, this), this._on("unload", this._destroyAnimProxy, this);
      },
      _destroyAnimProxy: function() {
        ke(this._proxy), this.off("load moveend", this._animMoveEnd, this), delete this._proxy;
      },
      _animMoveEnd: function() {
        var t = this.getCenter(), n = this.getZoom();
        Qi(this._proxy, this.project(t, n), this.getZoomScale(n, 1));
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
        return s.animate !== !0 && !this.getSize().contains(y) ? !1 : (Kt(function() {
          this._moveStart(!0, s.noMoveStart || !1)._animateZoom(t, n, !0);
        }, this), !0);
      },
      _animateZoom: function(t, n, s, c) {
        this._mapPane && (s && (this._animatingZoom = !0, this._animateToCenter = t, this._animateToZoom = n, ie(this._mapPane, "leaflet-zoom-anim")), this.fire("zoomanim", {
          center: t,
          zoom: n,
          noUpdate: c
        }), this._tempFireZoomEvent || (this._tempFireZoomEvent = this._zoom !== this._animateToZoom), this._move(this._animateToCenter, this._animateToZoom, void 0, !0), setTimeout(x(this._onZoomTransitionEnd, this), 250));
      },
      _onZoomTransitionEnd: function() {
        this._animatingZoom && (this._mapPane && Ee(this._mapPane, "leaflet-zoom-anim"), this._animatingZoom = !1, this._move(this._animateToCenter, this._animateToZoom, void 0, !0), this._tempFireZoomEvent && this.fire("zoom"), delete this._tempFireZoomEvent, this.fire("move"), this._moveEnd(!0));
      }
    });
    function hr(t, n) {
      return new ae(t, n);
    }
    var di = Le.extend({
      // @section
      // @aka Control Options
      options: {
        // @option position: String = 'topright'
        // The position of the control (one of the map corners). Possible values are `'topleft'`,
        // `'topright'`, `'bottomleft'` or `'bottomright'`
        position: "topright"
      },
      initialize: function(t) {
        Y(this, t);
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
        return ie(n, "leaflet-control"), s.indexOf("bottom") !== -1 ? c.insertBefore(n, c.firstChild) : c.appendChild(n), this._map.on("unload", this.remove, this), this;
      },
      // @method remove: this
      // Removes the control from the map it is currently active on.
      remove: function() {
        return this._map ? (ke(this._container), this.onRemove && this.onRemove(this._map), this._map.off("unload", this.remove, this), this._map = null, this) : this;
      },
      _refocusOnMap: function(t) {
        this._map && t && t.screenX > 0 && t.screenY > 0 && this._map.getContainer().focus();
      }
    }), yn = function(t) {
      return new di(t);
    };
    ae.include({
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
        function c(y, A) {
          var Z = n + y + " " + n + A;
          t[y + A] = de("div", Z, s);
        }
        c("top", "left"), c("top", "right"), c("bottom", "left"), c("bottom", "right");
      },
      _clearControlPos: function() {
        for (var t in this._controlCorners)
          ke(this._controlCorners[t]);
        ke(this._controlContainer), delete this._controlCorners, delete this._controlContainer;
      }
    });
    var Qa = di.extend({
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
        Y(this, s), this._layerControlInputs = [], this._layers = [], this._lastZIndex = 0, this._handlingClick = !1, this._preventClick = !1;
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
        var n = this._getLayer(w(t));
        return n && this._layers.splice(this._layers.indexOf(n), 1), this._map ? this._update() : this;
      },
      // @method expand(): this
      // Expand the control container if collapsed.
      expand: function() {
        ie(this._container, "leaflet-control-layers-expanded"), this._section.style.height = null;
        var t = this._map.getSize().y - (this._container.offsetTop + 50);
        return t < this._section.clientHeight ? (ie(this._section, "leaflet-control-layers-scrollbar"), this._section.style.height = t + "px") : Ee(this._section, "leaflet-control-layers-scrollbar"), this._checkDisabledLayers(), this;
      },
      // @method collapse(): this
      // Collapse the control container if expanded.
      collapse: function() {
        return Ee(this._container, "leaflet-control-layers-expanded"), this;
      },
      _initLayout: function() {
        var t = "leaflet-control-layers", n = this._container = de("div", t), s = this.options.collapsed;
        n.setAttribute("aria-haspopup", !0), Nn(n), Jr(n);
        var c = this._section = de("section", t + "-list");
        s && (this._map.on("click", this.collapse, this), Qt(n, {
          mouseenter: this._expandSafely,
          mouseleave: this.collapse
        }, this));
        var y = this._layersLink = de("a", t + "-toggle", n);
        y.href = "#", y.title = "Layers", y.setAttribute("role", "button"), Qt(y, {
          keydown: function(A) {
            A.keyCode === 13 && this._expandSafely();
          },
          // Certain screen readers intercept the key event and instead send a click event
          click: function(A) {
            Ie(A), this._expandSafely();
          }
        }, this), s || this.expand(), this._baseLayersList = de("div", t + "-base", c), this._separator = de("div", t + "-separator", c), this._overlaysList = de("div", t + "-overlays", c), n.appendChild(c);
      },
      _getLayer: function(t) {
        for (var n = 0; n < this._layers.length; n++)
          if (this._layers[n] && w(this._layers[n].layer) === t)
            return this._layers[n];
      },
      _addLayer: function(t, n, s) {
        this._map && t.on("add remove", this._onLayerChange, this), this._layers.push({
          layer: t,
          name: n,
          overlay: s
        }), this.options.sortLayers && this._layers.sort(x(function(c, y) {
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
        var n = this._getLayer(w(t.target)), s = n.overlay ? t.type === "add" ? "overlayadd" : "overlayremove" : t.type === "add" ? "baselayerchange" : null;
        s && this._map.fire(s, n);
      },
      // IE7 bugs out if you create a radio dynamically, so you have to do it this hacky way (see https://stackoverflow.com/a/119079)
      _createRadioElement: function(t, n) {
        var s = '<input type="radio" class="leaflet-control-layers-selector" name="' + t + '"' + (n ? ' checked="checked"' : "") + "/>", c = document.createElement("div");
        return c.innerHTML = s, c.firstChild;
      },
      _addItem: function(t) {
        var n = document.createElement("label"), s = this._map.hasLayer(t.layer), c;
        t.overlay ? (c = document.createElement("input"), c.type = "checkbox", c.className = "leaflet-control-layers-selector", c.defaultChecked = s) : c = this._createRadioElement("leaflet-base-layers_" + w(this), s), this._layerControlInputs.push(c), c.layerId = w(t.layer), Qt(c, "click", this._onInputClick, this);
        var y = document.createElement("span");
        y.innerHTML = " " + t.name;
        var A = document.createElement("span");
        n.appendChild(A), A.appendChild(c), A.appendChild(y);
        var Z = t.overlay ? this._overlaysList : this._baseLayersList;
        return Z.appendChild(n), this._checkDisabledLayers(), n;
      },
      _onInputClick: function() {
        if (!this._preventClick) {
          var t = this._layerControlInputs, n, s, c = [], y = [];
          this._handlingClick = !0;
          for (var A = t.length - 1; A >= 0; A--)
            n = t[A], s = this._getLayer(n.layerId).layer, n.checked ? c.push(s) : n.checked || y.push(s);
          for (A = 0; A < y.length; A++)
            this._map.hasLayer(y[A]) && this._map.removeLayer(y[A]);
          for (A = 0; A < c.length; A++)
            this._map.hasLayer(c[A]) || this._map.addLayer(c[A]);
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
    }), Xr = function(t, n, s) {
      return new Qa(t, n, s);
    }, vn = di.extend({
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
        var A = de("a", s, c);
        return A.innerHTML = t, A.href = "#", A.title = n, A.setAttribute("role", "button"), A.setAttribute("aria-label", n), Nn(A), Qt(A, "click", en), Qt(A, "click", y, this), Qt(A, "click", this._refocusOnMap, this), A;
      },
      _updateDisabled: function() {
        var t = this._map, n = "leaflet-disabled";
        Ee(this._zoomInButton, n), Ee(this._zoomOutButton, n), this._zoomInButton.setAttribute("aria-disabled", "false"), this._zoomOutButton.setAttribute("aria-disabled", "false"), (this._disabled || t._zoom === t.getMinZoom()) && (ie(this._zoomOutButton, n), this._zoomOutButton.setAttribute("aria-disabled", "true")), (this._disabled || t._zoom === t.getMaxZoom()) && (ie(this._zoomInButton, n), this._zoomInButton.setAttribute("aria-disabled", "true"));
      }
    });
    ae.mergeOptions({
      zoomControl: !0
    }), ae.addInitHook(function() {
      this.options.zoomControl && (this.zoomControl = new vn(), this.addControl(this.zoomControl));
    });
    var fo = function(t) {
      return new vn(t);
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
    }), ts = function(t) {
      return new Ai(t);
    }, bn = '<svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="12" height="8" viewBox="0 0 12 8" class="leaflet-attribution-flag"><path fill="#4C7BE1" d="M0 0h12v4H0z"/><path fill="#FFD500" d="M0 4h12v3H0z"/><path fill="#E0BC00" d="M0 7h12v1H0z"/></svg>', Yr = di.extend({
      // @section
      // @aka Control.Attribution options
      options: {
        position: "bottomright",
        // @option prefix: String|false = 'Leaflet'
        // The HTML text shown before the attributions. Pass `false` to disable.
        prefix: '<a href="https://leafletjs.com" title="A JavaScript library for interactive maps">' + (Ut.inlineSvg ? bn + " " : "") + "Leaflet</a>"
      },
      initialize: function(t) {
        Y(this, t), this._attributions = {};
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
    ae.mergeOptions({
      attributionControl: !0
    }), ae.addInitHook(function() {
      this.options.attributionControl && new Yr().addTo(this);
    });
    var po = function(t) {
      return new Yr(t);
    };
    di.Layers = Qa, di.Zoom = vn, di.Scale = Ai, di.Attribution = Yr, yn.layers = Xr, yn.zoom = fo, yn.scale = ts, yn.attribution = po;
    var yi = Le.extend({
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
    var mo = { Events: Et }, es = Ut.touch ? "touchstart mousedown" : "mousedown", Ui = Jt.extend({
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
        Y(this, c), this._element = t, this._dragStartTarget = n || t, this._preventOutline = s;
      },
      // @method enable()
      // Enables the dragging ability
      enable: function() {
        this._enabled || (Qt(this._dragStartTarget, es, this._onDown, this), this._enabled = !0);
      },
      // @method disable()
      // Disables the dragging ability
      disable: function() {
        this._enabled && (Ui._dragging === this && this.finishDrag(!0), pe(this._dragStartTarget, es, this._onDown, this), this._enabled = !1, this._moved = !1);
      },
      _onDown: function(t) {
        if (this._enabled && (this._moved = !1, !Nr(this._element, "leaflet-zoom-anim"))) {
          if (t.touches && t.touches.length !== 1) {
            Ui._dragging === this && this.finishDrag();
            return;
          }
          if (!(Ui._dragging || t.shiftKey || t.which !== 1 && t.button !== 1 && !t.touches) && (Ui._dragging = this, this._preventOutline && Zr(this._element), $r(), Fn(), !this._moving)) {
            this.fire("down");
            var n = t.touches ? t.touches[0] : t, s = Ka(this._element);
            this._startPoint = new Ot(n.clientX, n.clientY), this._startPos = $i(this._element), this._parentScale = qr(s);
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
          !s.x && !s.y || Math.abs(s.x) + Math.abs(s.y) < this.options.clickTolerance || (s.x /= this._parentScale.x, s.y /= this._parentScale.y, Ie(t), this._moved || (this.fire("dragstart"), this._moved = !0, ie(document.body, "leaflet-dragging"), this._lastTarget = t.target || t.srcElement, window.SVGElementInstance && this._lastTarget instanceof window.SVGElementInstance && (this._lastTarget = this._lastTarget.correspondingUseElement), ie(this._lastTarget, "leaflet-drag-target")), this._newPos = this._startPos.add(s), this._moving = !0, this._lastEvent = t, this._updatePosition());
        }
      },
      _updatePosition: function() {
        var t = { originalEvent: this._lastEvent };
        this.fire("predrag", t), Be(this._element, this._newPos), this.fire("drag", t);
      },
      _onUp: function() {
        this._enabled && this.finishDrag();
      },
      finishDrag: function(t) {
        Ee(document.body, "leaflet-dragging"), this._lastTarget && (Ee(this._lastTarget, "leaflet-drag-target"), this._lastTarget = null), pe(document, "mousemove touchmove", this._onMove, this), pe(document, "mouseup touchend touchcancel", this._onUp, this), Ur(), Rn();
        var n = this._moved && this._moving;
        this._moving = !1, Ui._dragging = !1, n && this.fire("dragend", {
          noInertia: t,
          distance: this._newPos.distanceTo(this._startPos)
        });
      }
    });
    function is(t, n, s) {
      var c, y = [1, 4, 2, 8], A, Z, rt, ht, gt, It, qt, ne;
      for (A = 0, It = t.length; A < It; A++)
        t[A]._code = Gi(t[A], n);
      for (rt = 0; rt < 4; rt++) {
        for (qt = y[rt], c = [], A = 0, It = t.length, Z = It - 1; A < It; Z = A++)
          ht = t[A], gt = t[Z], ht._code & qt ? gt._code & qt || (ne = cr(gt, ht, qt, n, s), ne._code = Gi(ne, n), c.push(ne)) : (gt._code & qt && (ne = cr(gt, ht, qt, n, s), ne._code = Gi(ne, n), c.push(ne)), c.push(ht));
        t = c;
      }
      return t;
    }
    function ns(t, n) {
      var s, c, y, A, Z, rt, ht, gt, It;
      if (!t || t.length === 0)
        throw new Error("latlngs not passed");
      si(t) || (console.warn("latlngs are not flat! Only the first ring will be used"), t = t[0]);
      var qt = St([0, 0]), ne = zt(t), $e = ne.getNorthWest().distanceTo(ne.getSouthWest()) * ne.getNorthEast().distanceTo(ne.getNorthWest());
      $e < 1700 && (qt = Qr(t));
      var De = t.length, ui = [];
      for (s = 0; s < De; s++) {
        var He = St(t[s]);
        ui.push(n.project(St([He.lat - qt.lat, He.lng - qt.lng])));
      }
      for (rt = ht = gt = 0, s = 0, c = De - 1; s < De; c = s++)
        y = ui[s], A = ui[c], Z = y.y * A.x - A.y * y.x, ht += (y.x + A.x) * Z, gt += (y.y + A.y) * Z, rt += Z * 3;
      rt === 0 ? It = ui[0] : It = [ht / rt, gt / rt];
      var Hi = n.unproject(ut(It));
      return St([Hi.lat + qt.lat, Hi.lng + qt.lng]);
    }
    function Qr(t) {
      for (var n = 0, s = 0, c = 0, y = 0; y < t.length; y++) {
        var A = St(t[y]);
        n += A.lat, s += A.lng, c++;
      }
      return St([n / c, s / c]);
    }
    var rs = {
      __proto__: null,
      clipPolygon: is,
      polygonCenter: ns,
      centroid: Qr
    };
    function as(t, n) {
      if (!n || !t.length)
        return t.slice();
      var s = n * n;
      return t = xn(t, s), t = _o(t, s), t;
    }
    function Te(t, n, s) {
      return Math.sqrt(Ln(t, n, s, !0));
    }
    function ei(t, n, s) {
      return Ln(t, n, s);
    }
    function _o(t, n) {
      var s = t.length, c = typeof Uint8Array < "u" ? Uint8Array : Array, y = new c(s);
      y[0] = y[s - 1] = 1, vi(t, y, n, 0, s - 1);
      var A, Z = [];
      for (A = 0; A < s; A++)
        y[A] && Z.push(t[A]);
      return Z;
    }
    function vi(t, n, s, c, y) {
      var A = 0, Z, rt, ht;
      for (rt = c + 1; rt <= y - 1; rt++)
        ht = Ln(t[rt], t[c], t[y], !0), ht > A && (Z = rt, A = ht);
      A > s && (n[Z] = 1, vi(t, n, s, c, Z), vi(t, n, s, Z, y));
    }
    function xn(t, n) {
      for (var s = [t[0]], c = 1, y = 0, A = t.length; c < A; c++)
        wn(t[c], t[y]) > n && (s.push(t[c]), y = c);
      return y < A - 1 && s.push(t[A - 1]), s;
    }
    var Vn;
    function ai(t, n, s, c, y) {
      var A = c ? Vn : Gi(t, s), Z = Gi(n, s), rt, ht, gt;
      for (Vn = Z; ; ) {
        if (!(A | Z))
          return [t, n];
        if (A & Z)
          return !1;
        rt = A || Z, ht = cr(t, n, rt, s, y), gt = Gi(ht, s), rt === A ? (t = ht, A = gt) : (n = ht, Z = gt);
      }
    }
    function cr(t, n, s, c, y) {
      var A = n.x - t.x, Z = n.y - t.y, rt = c.min, ht = c.max, gt, It;
      return s & 8 ? (gt = t.x + A * (ht.y - t.y) / Z, It = ht.y) : s & 4 ? (gt = t.x + A * (rt.y - t.y) / Z, It = rt.y) : s & 2 ? (gt = ht.x, It = t.y + Z * (ht.x - t.x) / A) : s & 1 && (gt = rt.x, It = t.y + Z * (rt.x - t.x) / A), new Ot(gt, It, y);
    }
    function Gi(t, n) {
      var s = 0;
      return t.x < n.min.x ? s |= 1 : t.x > n.max.x && (s |= 2), t.y < n.min.y ? s |= 4 : t.y > n.max.y && (s |= 8), s;
    }
    function wn(t, n) {
      var s = n.x - t.x, c = n.y - t.y;
      return s * s + c * c;
    }
    function Ln(t, n, s, c) {
      var y = n.x, A = n.y, Z = s.x - y, rt = s.y - A, ht = Z * Z + rt * rt, gt;
      return ht > 0 && (gt = ((t.x - y) * Z + (t.y - A) * rt) / ht, gt > 1 ? (y = s.x, A = s.y) : gt > 0 && (y += Z * gt, A += rt * gt)), Z = t.x - y, rt = t.y - A, c ? Z * Z + rt * rt : new Ot(y, A);
    }
    function si(t) {
      return !Bt(t[0]) || typeof t[0][0] != "object" && typeof t[0][0] < "u";
    }
    function ss(t) {
      return console.warn("Deprecated use of _flat, please use L.LineUtil.isFlat instead."), si(t);
    }
    function os(t, n) {
      var s, c, y, A, Z, rt, ht, gt;
      if (!t || t.length === 0)
        throw new Error("latlngs not passed");
      si(t) || (console.warn("latlngs are not flat! Only the first ring will be used"), t = t[0]);
      var It = St([0, 0]), qt = zt(t), ne = qt.getNorthWest().distanceTo(qt.getSouthWest()) * qt.getNorthEast().distanceTo(qt.getNorthWest());
      ne < 1700 && (It = Qr(t));
      var $e = t.length, De = [];
      for (s = 0; s < $e; s++) {
        var ui = St(t[s]);
        De.push(n.project(St([ui.lat - It.lat, ui.lng - It.lng])));
      }
      for (s = 0, c = 0; s < $e - 1; s++)
        c += De[s].distanceTo(De[s + 1]) / 2;
      if (c === 0)
        gt = De[0];
      else
        for (s = 0, A = 0; s < $e - 1; s++)
          if (Z = De[s], rt = De[s + 1], y = Z.distanceTo(rt), A += y, A > c) {
            ht = (A - c) / y, gt = [
              rt.x - ht * (rt.x - Z.x),
              rt.y - ht * (rt.y - Z.y)
            ];
            break;
          }
      var He = n.unproject(ut(gt));
      return St([He.lat + It.lat, He.lng + It.lng]);
    }
    var dr = {
      __proto__: null,
      simplify: as,
      pointToSegmentDistance: Te,
      closestPointOnSegment: ei,
      clipSegment: ai,
      _getEdgeIntersection: cr,
      _getBitCode: Gi,
      _sqClosestPointOnSegment: Ln,
      isFlat: si,
      _flat: ss,
      polylineCenter: os
    }, fr = {
      project: function(t) {
        return new Ot(t.lng, t.lat);
      },
      unproject: function(t) {
        return new Tt(t.y, t.x);
      },
      bounds: new bt([-180, -90], [180, 90])
    }, ta = {
      R: 6378137,
      R_MINOR: 6356752314245179e-9,
      bounds: new bt([-2003750834279e-5, -1549657073972e-5], [2003750834279e-5, 1876465623138e-5]),
      project: function(t) {
        var n = Math.PI / 180, s = this.R, c = t.lat * n, y = this.R_MINOR / s, A = Math.sqrt(1 - y * y), Z = A * Math.sin(c), rt = Math.tan(Math.PI / 4 - c / 2) / Math.pow((1 - Z) / (1 + Z), A / 2);
        return c = -s * Math.log(Math.max(rt, 1e-10)), new Ot(t.lng * n * s, c);
      },
      unproject: function(t) {
        for (var n = 180 / Math.PI, s = this.R, c = this.R_MINOR / s, y = Math.sqrt(1 - c * c), A = Math.exp(-t.y / s), Z = Math.PI / 2 - 2 * Math.atan(A), rt = 0, ht = 0.1, gt; rt < 15 && Math.abs(ht) > 1e-7; rt++)
          gt = y * Math.sin(Z), gt = Math.pow((1 - gt) / (1 + gt), y / 2), ht = Math.PI / 2 - 2 * Math.atan(A * gt) - Z, Z += ht;
        return new Tt(Z * n, t.x * n / s);
      }
    }, ls = {
      __proto__: null,
      LonLat: fr,
      Mercator: ta,
      SphericalMercator: Bi
    }, go = b({}, fe, {
      code: "EPSG:3395",
      projection: ta,
      transformation: function() {
        var t = 0.5 / (Math.PI * ta.R);
        return Fi(t, 0.5, -t, 0.5);
      }()
    }), ea = b({}, fe, {
      code: "EPSG:4326",
      projection: fr,
      transformation: Fi(1 / 180, 1, -1 / 180, 0.5)
    }), yo = b({}, ve, {
      projection: fr,
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
    ve.Earth = fe, ve.EPSG3395 = go, ve.EPSG3857 = mi, ve.EPSG900913 = Ri, ve.EPSG4326 = ea, ve.Simple = yo;
    var qe = Jt.extend({
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
        return this._map._targets[w(t)] = this, this;
      },
      removeInteractiveTarget: function(t) {
        return delete this._map._targets[w(t)], this;
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
    ae.include({
      // @method addLayer(layer: Layer): this
      // Adds the given layer to the map
      addLayer: function(t) {
        if (!t._layerAdd)
          throw new Error("The provided object is not a Layer.");
        var n = w(t);
        return this._layers[n] ? this : (this._layers[n] = t, t._mapToAdd = this, t.beforeAdd && t.beforeAdd(this), this.whenReady(t._layerAdd, t), this);
      },
      // @method removeLayer(layer: Layer): this
      // Removes the given layer from the map.
      removeLayer: function(t) {
        var n = w(t);
        return this._layers[n] ? (this._loaded && t.onRemove(this), delete this._layers[n], this._loaded && (this.fire("layerremove", { layer: t }), t.fire("remove")), t._map = t._mapToAdd = null, this) : this;
      },
      // @method hasLayer(layer: Layer): Boolean
      // Returns `true` if the given layer is currently added to the map
      hasLayer: function(t) {
        return w(t) in this._layers;
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
        t = t ? Bt(t) ? t : [t] : [];
        for (var n = 0, s = t.length; n < s; n++)
          this.addLayer(t[n]);
      },
      _addZoomLimit: function(t) {
        (!isNaN(t.options.maxZoom) || !isNaN(t.options.minZoom)) && (this._zoomBoundLayers[w(t)] = t, this._updateZoomLevels());
      },
      _removeZoomLimit: function(t) {
        var n = w(t);
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
    var Si = qe.extend({
      initialize: function(t, n) {
        Y(this, n), this._layers = {};
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
        return w(t);
      }
    }), pr = function(t, n) {
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
        var t = new oe();
        for (var n in this._layers) {
          var s = this._layers[n];
          t.extend(s.getBounds ? s.getBounds() : s.getLatLng());
        }
        return t;
      }
    }), vo = function(t, n) {
      return new bi(t, n);
    }, kn = Le.extend({
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
        Y(this, t);
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
        var y = ut(c), A = ut(n === "shadow" && s.shadowAnchor || s.iconAnchor || y && y.divideBy(2, !0));
        t.className = "leaflet-marker-" + n + " " + (s.className || ""), A && (t.style.marginLeft = -A.x + "px", t.style.marginTop = -A.y + "px"), y && (t.style.width = y.x + "px", t.style.height = y.y + "px");
      },
      _createImg: function(t, n) {
        return n = n || document.createElement("img"), n.src = t, n;
      },
      _getIconUrl: function(t) {
        return Ut.retina && this.options[t + "RetinaUrl"] || this.options[t + "Url"];
      }
    });
    function bo(t) {
      return new kn(t);
    }
    var $n = kn.extend({
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
        return typeof $n.imagePath != "string" && ($n.imagePath = this._detectIconPath()), (this.options.imagePath || $n.imagePath) + kn.prototype._getIconUrl.call(this, t);
      },
      _stripUrl: function(t) {
        var n = function(s, c, y) {
          var A = c.exec(s);
          return A && A[y];
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
    }), us = yi.extend({
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
        }, this).enable(), ie(t, "leaflet-marker-draggable");
      },
      removeHooks: function() {
        this._draggable.off({
          dragstart: this._onDragStart,
          predrag: this._onPreDrag,
          drag: this._onDrag,
          dragend: this._onDragEnd
        }, this).disable(), this._marker._icon && Ee(this._marker._icon, "leaflet-marker-draggable");
      },
      moved: function() {
        return this._draggable && this._draggable._moved;
      },
      _adjustPan: function(t) {
        var n = this._marker, s = n._map, c = this._marker.options.autoPanSpeed, y = this._marker.options.autoPanPadding, A = $i(n._icon), Z = s.getPixelBounds(), rt = s.getPixelOrigin(), ht = Ct(
          Z.min._subtract(rt).add(y),
          Z.max._subtract(rt).subtract(y)
        );
        if (!ht.contains(A)) {
          var gt = ut(
            (Math.max(ht.max.x, A.x) - ht.max.x) / (Z.max.x - ht.max.x) - (Math.min(ht.min.x, A.x) - ht.min.x) / (Z.min.x - ht.min.x),
            (Math.max(ht.max.y, A.y) - ht.max.y) / (Z.max.y - ht.max.y) - (Math.min(ht.min.y, A.y) - ht.min.y) / (Z.min.y - ht.min.y)
          ).multiplyBy(c);
          s.panBy(gt, { animate: !1 }), this._draggable._newPos._add(gt), this._draggable._startPos._add(gt), Be(n._icon, this._draggable._newPos), this._onDrag(t), this._panRequest = Kt(this._adjustPan.bind(this, t));
        }
      },
      _onDragStart: function() {
        this._oldLatLng = this._marker.getLatLng(), this._marker.closePopup && this._marker.closePopup(), this._marker.fire("movestart").fire("dragstart");
      },
      _onPreDrag: function(t) {
        this._marker.options.autoPan && (ce(this._panRequest), this._panRequest = Kt(this._adjustPan.bind(this, t)));
      },
      _onDrag: function(t) {
        var n = this._marker, s = n._shadow, c = $i(n._icon), y = n._map.layerPointToLatLng(c);
        s && Be(s, c), n._latlng = y, t.latlng = y, t.oldLatLng = this._oldLatLng, n.fire("move", t).fire("drag", t);
      },
      _onDragEnd: function(t) {
        ce(this._panRequest), delete this._oldLatLng, this._marker.fire("moveend").fire("dragend", t);
      }
    }), mr = qe.extend({
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
        Y(this, n), this._latlng = St(t);
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
        return this._latlng = St(t), this.update(), this.fire("move", { oldLatLng: n, latlng: this._latlng });
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
        s !== this._icon && (this._icon && this._removeIcon(), c = !0, t.title && (s.title = t.title), s.tagName === "IMG" && (s.alt = t.alt || "")), ie(s, n), t.keyboard && (s.tabIndex = "0", s.setAttribute("role", "button")), this._icon = s, t.riseOnHover && this.on({
          mouseover: this._bringToFront,
          mouseout: this._resetZIndex
        }), this.options.autoPanOnFocus && Qt(s, "focus", this._panOnFocus, this);
        var y = t.icon.createShadow(this._shadow), A = !1;
        y !== this._shadow && (this._removeShadow(), A = !0), y && (ie(y, n), y.alt = ""), this._shadow = y, t.opacity < 1 && this._updateOpacity(), c && this.getPane().appendChild(this._icon), this._initInteraction(), y && A && this.getPane(t.shadowPane).appendChild(this._shadow);
      },
      _removeIcon: function() {
        this.options.riseOnHover && this.off({
          mouseover: this._bringToFront,
          mouseout: this._resetZIndex
        }), this.options.autoPanOnFocus && pe(this._icon, "focus", this._panOnFocus, this), ke(this._icon), this.removeInteractiveTarget(this._icon), this._icon = null;
      },
      _removeShadow: function() {
        this._shadow && ke(this._shadow), this._shadow = null;
      },
      _setPos: function(t) {
        this._icon && Be(this._icon, t), this._shadow && Be(this._shadow, t), this._zIndex = t.y + this.options.zIndexOffset, this._resetZIndex();
      },
      _updateZIndex: function(t) {
        this._icon && (this._icon.style.zIndex = this._zIndex + t);
      },
      _animateZoom: function(t) {
        var n = this._map._latLngToNewLayerPoint(this._latlng, t.zoom, t.center).round();
        this._setPos(n);
      },
      _initInteraction: function() {
        if (this.options.interactive && (ie(this._icon, "leaflet-interactive"), this.addInteractiveTarget(this._icon), us)) {
          var t = this.options.draggable;
          this.dragging && (t = this.dragging.enabled(), this.dragging.disable()), this.dragging = new us(this), t && this.dragging.enable();
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
          var n = this.options.icon.options, s = n.iconSize ? ut(n.iconSize) : ut(0, 0), c = n.iconAnchor ? ut(n.iconAnchor) : ut(0, 0);
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
    function hs(t, n) {
      return new mr(t, n);
    }
    var oi = qe.extend({
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
        return Y(this, t), this._renderer && (this._renderer._updateStyle(this), this.options.stroke && t && Object.prototype.hasOwnProperty.call(t, "weight") && this._updateBounds()), this;
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
    }), _r = oi.extend({
      // @section
      // @aka CircleMarker options
      options: {
        fill: !0,
        // @option radius: Number = 10
        // Radius of the circle marker, in pixels
        radius: 10
      },
      initialize: function(t, n) {
        Y(this, n), this._latlng = St(t), this._radius = this.options.radius;
      },
      // @method setLatLng(latLng: LatLng): this
      // Sets the position of a circle marker to a new location.
      setLatLng: function(t) {
        var n = this._latlng;
        return this._latlng = St(t), this.redraw(), this.fire("move", { oldLatLng: n, latlng: this._latlng });
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
        this._pxBounds = new bt(this._point.subtract(c), this._point.add(c));
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
    function ia(t, n) {
      return new _r(t, n);
    }
    var Cn = _r.extend({
      initialize: function(t, n, s) {
        if (typeof n == "number" && (n = b({}, s, { radius: n })), Y(this, n), this._latlng = St(t), isNaN(this.options.radius))
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
        return new oe(
          this._map.layerPointToLatLng(this._point.subtract(t)),
          this._map.layerPointToLatLng(this._point.add(t))
        );
      },
      setStyle: oi.prototype.setStyle,
      _project: function() {
        var t = this._latlng.lng, n = this._latlng.lat, s = this._map, c = s.options.crs;
        if (c.distance === fe.distance) {
          var y = Math.PI / 180, A = this._mRadius / fe.R / y, Z = s.project([n + A, t]), rt = s.project([n - A, t]), ht = Z.add(rt).divideBy(2), gt = s.unproject(ht).lat, It = Math.acos((Math.cos(A * y) - Math.sin(n * y) * Math.sin(gt * y)) / (Math.cos(n * y) * Math.cos(gt * y))) / y;
          (isNaN(It) || It === 0) && (It = A / Math.cos(Math.PI / 180 * n)), this._point = ht.subtract(s.getPixelOrigin()), this._radius = isNaN(It) ? 0 : ht.x - s.project([gt, t - It]).x, this._radiusY = ht.y - Z.y;
        } else {
          var qt = c.unproject(c.project(this._latlng).subtract([this._mRadius, 0]));
          this._point = s.latLngToLayerPoint(this._latlng), this._radius = this._point.x - s.latLngToLayerPoint(qt).x;
        }
        this._updateBounds();
      }
    });
    function xo(t, n, s) {
      return new Cn(t, n, s);
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
        Y(this, n), this._setLatLngs(t);
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
        for (var n = 1 / 0, s = null, c = Ln, y, A, Z = 0, rt = this._parts.length; Z < rt; Z++)
          for (var ht = this._parts[Z], gt = 1, It = ht.length; gt < It; gt++) {
            y = ht[gt - 1], A = ht[gt];
            var qt = c(t, y, A, !0);
            qt < n && (n = qt, s = c(t, y, A));
          }
        return s && (s.distance = Math.sqrt(n)), s;
      },
      // @method getCenter(): LatLng
      // Returns the center ([centroid](https://en.wikipedia.org/wiki/Centroid)) of the polyline.
      getCenter: function() {
        if (!this._map)
          throw new Error("Must add layer to map before using getCenter()");
        return os(this._defaultShape(), this._map.options.crs);
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
        return n = n || this._defaultShape(), t = St(t), n.push(t), this._bounds.extend(t), this.redraw();
      },
      _setLatLngs: function(t) {
        this._bounds = new oe(), this._latlngs = this._convertLatLngs(t);
      },
      _defaultShape: function() {
        return si(this._latlngs) ? this._latlngs : this._latlngs[0];
      },
      // recursively convert latlngs input into actual LatLng instances; calculate bounds along the way
      _convertLatLngs: function(t) {
        for (var n = [], s = si(t), c = 0, y = t.length; c < y; c++)
          s ? (n[c] = St(t[c]), this._bounds.extend(n[c])) : n[c] = this._convertLatLngs(t[c]);
        return n;
      },
      _project: function() {
        var t = new bt();
        this._rings = [], this._projectLatlngs(this._latlngs, this._rings, t), this._bounds.isValid() && t.isValid() && (this._rawPxBounds = t, this._updateBounds());
      },
      _updateBounds: function() {
        var t = this._clickTolerance(), n = new Ot(t, t);
        this._rawPxBounds && (this._pxBounds = new bt([
          this._rawPxBounds.min.subtract(n),
          this._rawPxBounds.max.add(n)
        ]));
      },
      // recursively turns latlngs into a set of rings with projected coordinates
      _projectLatlngs: function(t, n, s) {
        var c = t[0] instanceof Tt, y = t.length, A, Z;
        if (c) {
          for (Z = [], A = 0; A < y; A++)
            Z[A] = this._map.latLngToLayerPoint(t[A]), s.extend(Z[A]);
          n.push(Z);
        } else
          for (A = 0; A < y; A++)
            this._projectLatlngs(t[A], n, s);
      },
      // clip polyline by renderer bounds so that we have less to render for performance
      _clipPoints: function() {
        var t = this._renderer._bounds;
        if (this._parts = [], !(!this._pxBounds || !this._pxBounds.intersects(t))) {
          if (this.options.noClip) {
            this._parts = this._rings;
            return;
          }
          var n = this._parts, s, c, y, A, Z, rt, ht;
          for (s = 0, y = 0, A = this._rings.length; s < A; s++)
            for (ht = this._rings[s], c = 0, Z = ht.length; c < Z - 1; c++)
              rt = ai(ht[c], ht[c + 1], t, c, !0), rt && (n[y] = n[y] || [], n[y].push(rt[0]), (rt[1] !== ht[c + 1] || c === Z - 2) && (n[y].push(rt[1]), y++));
        }
      },
      // simplify each clipped part of the polyline for performance
      _simplifyPoints: function() {
        for (var t = this._parts, n = this.options.smoothFactor, s = 0, c = t.length; s < c; s++)
          t[s] = as(t[s], n);
      },
      _update: function() {
        this._map && (this._clipPoints(), this._simplifyPoints(), this._updatePath());
      },
      _updatePath: function() {
        this._renderer._updatePoly(this);
      },
      // Needed by the `Canvas` renderer for interactivity
      _containsPoint: function(t, n) {
        var s, c, y, A, Z, rt, ht = this._clickTolerance();
        if (!this._pxBounds || !this._pxBounds.contains(t))
          return !1;
        for (s = 0, A = this._parts.length; s < A; s++)
          for (rt = this._parts[s], c = 0, Z = rt.length, y = Z - 1; c < Z; y = c++)
            if (!(!n && c === 0) && Te(t, rt[y], rt[c]) <= ht)
              return !0;
        return !1;
      }
    });
    function na(t, n) {
      return new Pi(t, n);
    }
    Pi._flat = ss;
    var je = Pi.extend({
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
        return ns(this._defaultShape(), this._map.options.crs);
      },
      _convertLatLngs: function(t) {
        var n = Pi.prototype._convertLatLngs.call(this, t), s = n.length;
        return s >= 2 && n[0] instanceof Tt && n[0].equals(n[s - 1]) && n.pop(), n;
      },
      _setLatLngs: function(t) {
        Pi.prototype._setLatLngs.call(this, t), si(this._latlngs) && (this._latlngs = [this._latlngs]);
      },
      _defaultShape: function() {
        return si(this._latlngs[0]) ? this._latlngs[0] : this._latlngs[0][0];
      },
      _clipPoints: function() {
        var t = this._renderer._bounds, n = this.options.weight, s = new Ot(n, n);
        if (t = new bt(t.min.subtract(s), t.max.add(s)), this._parts = [], !(!this._pxBounds || !this._pxBounds.intersects(t))) {
          if (this.options.noClip) {
            this._parts = this._rings;
            return;
          }
          for (var c = 0, y = this._rings.length, A; c < y; c++)
            A = is(this._rings[c], t, !0), A.length && this._parts.push(A);
        }
      },
      _updatePath: function() {
        this._renderer._updatePoly(this, !0);
      },
      // Needed by the `Canvas` renderer for interactivity
      _containsPoint: function(t) {
        var n = !1, s, c, y, A, Z, rt, ht, gt;
        if (!this._pxBounds || !this._pxBounds.contains(t))
          return !1;
        for (A = 0, ht = this._parts.length; A < ht; A++)
          for (s = this._parts[A], Z = 0, gt = s.length, rt = gt - 1; Z < gt; rt = Z++)
            c = s[Z], y = s[rt], c.y > t.y != y.y > t.y && t.x < (y.x - c.x) * (t.y - c.y) / (y.y - c.y) + c.x && (n = !n);
        return n || Pi.prototype._containsPoint.call(this, t, !0);
      }
    });
    function ra(t, n) {
      return new je(t, n);
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
        Y(this, n), this._layers = {}, t && this.addData(t);
      },
      // @method addData( <GeoJSON> data ): this
      // Adds a GeoJSON object to the layer.
      addData: function(t) {
        var n = Bt(t) ? t : t.features, s, c, y;
        if (n) {
          for (s = 0, c = n.length; s < c; s++)
            y = n[s], (y.geometries || y.geometry || y.features || y.coordinates) && this.addData(y);
          return this;
        }
        var A = this.options;
        if (A.filter && !A.filter(t))
          return this;
        var Z = Un(t, A);
        return Z ? (Z.feature = gr(t), Z.defaultOptions = Z.options, this.resetStyle(Z), A.onEachFeature && A.onEachFeature(t, Z), this.addLayer(Z)) : this;
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
      var s = t.type === "Feature" ? t.geometry : t, c = s ? s.coordinates : null, y = [], A = n && n.pointToLayer, Z = n && n.coordsToLatLng || aa, rt, ht, gt, It;
      if (!c && !s)
        return null;
      switch (s.type) {
        case "Point":
          return rt = Z(c), cs(A, t, rt, n);
        case "MultiPoint":
          for (gt = 0, It = c.length; gt < It; gt++)
            rt = Z(c[gt]), y.push(cs(A, t, rt, n));
          return new bi(y);
        case "LineString":
        case "MultiLineString":
          return ht = ii(c, s.type === "LineString" ? 0 : 1, Z), new Pi(ht, n);
        case "Polygon":
        case "MultiPolygon":
          return ht = ii(c, s.type === "Polygon" ? 1 : 2, Z), new je(ht, n);
        case "GeometryCollection":
          for (gt = 0, It = s.geometries.length; gt < It; gt++) {
            var qt = Un({
              geometry: s.geometries[gt],
              type: "Feature",
              properties: t.properties
            }, n);
            qt && y.push(qt);
          }
          return new bi(y);
        case "FeatureCollection":
          for (gt = 0, It = s.features.length; gt < It; gt++) {
            var ne = Un(s.features[gt], n);
            ne && y.push(ne);
          }
          return new bi(y);
        default:
          throw new Error("Invalid GeoJSON object.");
      }
    }
    function cs(t, n, s, c) {
      return t ? t(n, s) : new mr(s, c && c.markersInheritOptions && c);
    }
    function aa(t) {
      return new Tt(t[1], t[0], t[2]);
    }
    function ii(t, n, s) {
      for (var c = [], y = 0, A = t.length, Z; y < A; y++)
        Z = n ? ii(t[y], n - 1, s) : (s || aa)(t[y]), c.push(Z);
      return c;
    }
    function Di(t, n) {
      return t = St(t), t.alt !== void 0 ? [N(t.lng, n), N(t.lat, n), N(t.alt, n)] : [N(t.lng, n), N(t.lat, n)];
    }
    function nn(t, n, s, c) {
      for (var y = [], A = 0, Z = t.length; A < Z; A++)
        y.push(n ? nn(t[A], si(t[A]) ? 0 : n - 1, s, c) : Di(t[A], c));
      return !n && s && y.length > 0 && y.push(y[0].slice()), y;
    }
    function rn(t, n) {
      return t.feature ? b({}, t.feature, { geometry: n }) : gr(n);
    }
    function gr(t) {
      return t.type === "Feature" || t.type === "FeatureCollection" ? t : {
        type: "Feature",
        properties: {},
        geometry: t
      };
    }
    var sa = {
      toGeoJSON: function(t) {
        return rn(this, {
          type: "Point",
          coordinates: Di(this.getLatLng(), t)
        });
      }
    };
    mr.include(sa), Cn.include(sa), _r.include(sa), Pi.include({
      toGeoJSON: function(t) {
        var n = !si(this._latlngs), s = nn(this._latlngs, n ? 1 : 0, !1, t);
        return rn(this, {
          type: (n ? "Multi" : "") + "LineString",
          coordinates: s
        });
      }
    }), je.include({
      toGeoJSON: function(t) {
        var n = !si(this._latlngs), s = n && !si(this._latlngs[0]), c = nn(this._latlngs, s ? 2 : n ? 1 : 0, !0, t);
        return n || (c = [c]), rn(this, {
          type: (s ? "Multi" : "") + "Polygon",
          coordinates: c
        });
      }
    }), Si.include({
      toMultiPoint: function(t) {
        var n = [];
        return this.eachLayer(function(s) {
          n.push(s.toGeoJSON(t).geometry.coordinates);
        }), rn(this, {
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
            var A = y.toGeoJSON(t);
            if (s)
              c.push(A.geometry);
            else {
              var Z = gr(A);
              Z.type === "FeatureCollection" ? c.push.apply(c, Z.features) : c.push(Z);
            }
          }
        }), s ? rn(this, {
          geometries: c,
          type: "GeometryCollection"
        }) : {
          type: "FeatureCollection",
          features: c
        };
      }
    });
    function ds(t, n) {
      return new Ti(t, n);
    }
    var wo = ds, En = qe.extend({
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
        this._url = t, this._bounds = zt(n), Y(this, s);
      },
      onAdd: function() {
        this._image || (this._initImage(), this.options.opacity < 1 && this._updateOpacity()), this.options.interactive && (ie(this._image, "leaflet-interactive"), this.addInteractiveTarget(this._image)), this.getPane().appendChild(this._image), this._reset();
      },
      onRemove: function() {
        ke(this._image), this.options.interactive && this.removeInteractiveTarget(this._image);
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
        return this._map && gn(this._image), this;
      },
      // @method setUrl(url: String): this
      // Changes the URL of the image.
      setUrl: function(t) {
        return this._url = t, this._image && (this._image.src = t), this;
      },
      // @method setBounds(bounds: LatLngBounds): this
      // Update the bounds that this ImageOverlay covers
      setBounds: function(t) {
        return this._bounds = zt(t), this._map && this._reset(), this;
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
        if (ie(n, "leaflet-image-layer"), this._zoomAnimated && ie(n, "leaflet-zoom-animated"), this.options.className && ie(n, this.options.className), n.onselectstart = M, n.onmousemove = M, n.onload = x(this.fire, this, "load"), n.onerror = x(this._overlayOnError, this, "error"), (this.options.crossOrigin || this.options.crossOrigin === "") && (n.crossOrigin = this.options.crossOrigin === !0 ? "" : this.options.crossOrigin), this.options.zIndex && this._updateZIndex(), t) {
          this._url = n.src;
          return;
        }
        n.src = this._url, n.alt = this.options.alt;
      },
      _animateZoom: function(t) {
        var n = this._map.getZoomScale(t.zoom), s = this._map._latLngBoundsToNewLayerBounds(this._bounds, t.zoom, t.center).min;
        Qi(this._image, s, n);
      },
      _reset: function() {
        var t = this._image, n = new bt(
          this._map.latLngToLayerPoint(this._bounds.getNorthWest()),
          this._map.latLngToLayerPoint(this._bounds.getSouthEast())
        ), s = n.getSize();
        Be(t, n.min), t.style.width = s.x + "px", t.style.height = s.y + "px";
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
    }), Lo = function(t, n, s) {
      return new En(t, n, s);
    }, fs = En.extend({
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
        if (ie(n, "leaflet-image-layer"), this._zoomAnimated && ie(n, "leaflet-zoom-animated"), this.options.className && ie(n, this.options.className), n.onselectstart = M, n.onmousemove = M, n.onloadeddata = x(this.fire, this, "load"), t) {
          for (var s = n.getElementsByTagName("source"), c = [], y = 0; y < s.length; y++)
            c.push(s[y].src);
          this._url = s.length > 0 ? c : [n.src];
          return;
        }
        Bt(this._url) || (this._url = [this._url]), !this.options.keepAspectRatio && Object.prototype.hasOwnProperty.call(n.style, "objectFit") && (n.style.objectFit = "fill"), n.autoplay = !!this.options.autoplay, n.loop = !!this.options.loop, n.muted = !!this.options.muted, n.playsInline = !!this.options.playsInline;
        for (var A = 0; A < this._url.length; A++) {
          var Z = de("source");
          Z.src = this._url[A], n.appendChild(Z);
        }
      }
      // @method getElement(): HTMLVideoElement
      // Returns the instance of [`HTMLVideoElement`](https://developer.mozilla.org/docs/Web/API/HTMLVideoElement)
      // used by this overlay.
    });
    function ko(t, n, s) {
      return new fs(t, n, s);
    }
    var oa = En.extend({
      _initImage: function() {
        var t = this._image = this._url;
        ie(t, "leaflet-image-layer"), this._zoomAnimated && ie(t, "leaflet-zoom-animated"), this.options.className && ie(t, this.options.className), t.onselectstart = M, t.onmousemove = M;
      }
      // @method getElement(): SVGElement
      // Returns the instance of [`SVGElement`](https://developer.mozilla.org/docs/Web/API/SVGElement)
      // used by this overlay.
    });
    function Co(t, n, s) {
      return new oa(t, n, s);
    }
    var xi = qe.extend({
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
        t && (t instanceof Tt || Bt(t)) ? (this._latlng = St(t), Y(this, n)) : (Y(this, t), this._source = n), this.options.content && (this._content = this.options.content);
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
        this._zoomAnimated = t._zoomAnimated, this._container || this._initLayout(), t._fadeAnimated && ri(this._container, 0), clearTimeout(this._removeTimeout), this.getPane().appendChild(this._container), this.update(), t._fadeAnimated && ri(this._container, 1), this.bringToFront(), this.options.interactive && (ie(this._container, "leaflet-interactive"), this.addInteractiveTarget(this._container));
      },
      onRemove: function(t) {
        t._fadeAnimated ? (ri(this._container, 0), this._removeTimeout = setTimeout(x(ke, void 0, this._container), 200)) : ke(this._container), this.options.interactive && (Ee(this._container, "leaflet-interactive"), this.removeInteractiveTarget(this._container));
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
        return this._latlng = St(t), this._map && (this._updatePosition(), this._adjustPan()), this;
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
        return this._map && gn(this._container), this;
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
          var t = this._map.latLngToLayerPoint(this._latlng), n = ut(this.options.offset), s = this._getAnchor();
          this._zoomAnimated ? Be(this._container, t.add(s)) : n = n.add(t).add(s);
          var c = this._containerBottom = -n.y, y = this._containerLeft = -Math.round(this._containerWidth / 2) + n.x;
          this._container.style.bottom = c + "px", this._container.style.left = y + "px";
        }
      },
      _getAnchor: function() {
        return [0, 0];
      }
    });
    ae.include({
      _initOverlay: function(t, n, s, c) {
        var y = n;
        return y instanceof t || (y = new t(c).setContent(n)), s && y.setLatLng(s), y;
      }
    }), qe.include({
      _initOverlay: function(t, n, s, c) {
        var y = s;
        return y instanceof t ? (Y(y, c), y._source = this) : (y = n && !c ? n : new t(c, this), y.setContent(s)), y;
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
        xi.prototype.onAdd.call(this, t), t.fire("popupopen", { popup: this }), this._source && (this._source.fire("popupopen", { popup: this }, !0), this._source instanceof oi || this._source.on("preclick", tn));
      },
      onRemove: function(t) {
        xi.prototype.onRemove.call(this, t), t.fire("popupclose", { popup: this }), this._source && (this._source.fire("popupclose", { popup: this }, !0), this._source instanceof oi || this._source.off("preclick", tn));
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
        if (this._contentNode = de("div", t + "-content", s), Nn(n), Jr(this._contentNode), Qt(n, "contextmenu", tn), this._tipContainer = de("div", t + "-tip-container", n), this._tip = de("div", t + "-tip", this._tipContainer), this.options.closeButton) {
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
        var c = t.offsetHeight, y = this.options.maxHeight, A = "leaflet-popup-scrolled";
        y && c > y ? (n.height = y + "px", ie(t, A)) : Ee(t, A), this._containerWidth = this._container.offsetWidth;
      },
      _animateZoom: function(t) {
        var n = this._map._latLngToNewLayerPoint(this._latlng, t.zoom, t.center), s = this._getAnchor();
        Be(this._container, n.add(s));
      },
      _adjustPan: function() {
        if (this.options.autoPan) {
          if (this._map._panAnim && this._map._panAnim.stop(), this._autopanning) {
            this._autopanning = !1;
            return;
          }
          var t = this._map, n = parseInt(Vi(this._container, "marginBottom"), 10) || 0, s = this._container.offsetHeight + n, c = this._containerWidth, y = new Ot(this._containerLeft, -s - this._containerBottom);
          y._add($i(this._container));
          var A = t.layerPointToContainerPoint(y), Z = ut(this.options.autoPanPadding), rt = ut(this.options.autoPanPaddingTopLeft || Z), ht = ut(this.options.autoPanPaddingBottomRight || Z), gt = t.getSize(), It = 0, qt = 0;
          A.x + c + ht.x > gt.x && (It = A.x + c - gt.x + ht.x), A.x - It - rt.x < 0 && (It = A.x - rt.x), A.y + s + ht.y > gt.y && (qt = A.y + s - gt.y + ht.y), A.y - qt - rt.y < 0 && (qt = A.y - rt.y), (It || qt) && (this.options.keepInView && (this._autopanning = !0), t.fire("autopanstart").panBy([It, qt]));
        }
      },
      _getAnchor: function() {
        return ut(this._source && this._source._getPopupAnchor ? this._source._getPopupAnchor() : [0, 0]);
      }
    }), Eo = function(t, n) {
      return new Gn(t, n);
    };
    ae.mergeOptions({
      closePopupOnClick: !0
    }), ae.include({
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
    }), qe.include({
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
          en(t);
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
    var yr = xi.extend({
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
        this._contentNode = this._container = de("div", n), this._container.setAttribute("role", "tooltip"), this._container.setAttribute("id", "leaflet-tooltip-" + w(this));
      },
      _updateLayout: function() {
      },
      _adjustPan: function() {
      },
      _setPosition: function(t) {
        var n, s, c = this._map, y = this._container, A = c.latLngToContainerPoint(c.getCenter()), Z = c.layerPointToContainerPoint(t), rt = this.options.direction, ht = y.offsetWidth, gt = y.offsetHeight, It = ut(this.options.offset), qt = this._getAnchor();
        rt === "top" ? (n = ht / 2, s = gt) : rt === "bottom" ? (n = ht / 2, s = 0) : rt === "center" ? (n = ht / 2, s = gt / 2) : rt === "right" ? (n = 0, s = gt / 2) : rt === "left" ? (n = ht, s = gt / 2) : Z.x < A.x ? (rt = "right", n = 0, s = gt / 2) : (rt = "left", n = ht + (It.x + qt.x) * 2, s = gt / 2), t = t.subtract(ut(n, s, !0)).add(It).add(qt), Ee(y, "leaflet-tooltip-right"), Ee(y, "leaflet-tooltip-left"), Ee(y, "leaflet-tooltip-top"), Ee(y, "leaflet-tooltip-bottom"), ie(y, "leaflet-tooltip-" + rt), Be(y, t);
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
        return ut(this._source && this._source._getTooltipAnchor && !this.options.sticky ? this._source._getTooltipAnchor() : [0, 0]);
      }
    }), Mo = function(t, n) {
      return new yr(t, n);
    };
    ae.include({
      // @method openTooltip(tooltip: Tooltip): this
      // Opens the specified tooltip.
      // @alternative
      // @method openTooltip(content: String|HTMLElement, latlng: LatLng, options?: Tooltip options): this
      // Creates a tooltip with the specified content and options and open it.
      openTooltip: function(t, n, s) {
        return this._initOverlay(yr, t, n, s).openOn(this), this;
      },
      // @method closeTooltip(tooltip: Tooltip): this
      // Closes the tooltip given as parameter.
      closeTooltip: function(t) {
        return t.close(), this;
      }
    }), qe.include({
      // @method bindTooltip(content: String|HTMLElement|Function|Tooltip, options?: Tooltip options): this
      // Binds a tooltip to the layer with the passed `content` and sets up the
      // necessary event listeners. If a `Function` is passed it will receive
      // the layer as the first argument and should return a `String` or `HTMLElement`.
      bindTooltip: function(t, n) {
        return this._tooltip && this.isTooltipOpen() && this.unbindTooltip(), this._tooltip = this._initOverlay(yr, this._tooltip, t, n), this._initTooltipInteractions(), this._tooltip.options.permanent && this._map && this._map.hasLayer(this) && this.openTooltip(), this;
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
    var Zi = kn.extend({
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
          var c = ut(s.bgPos);
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
    kn.Default = $n;
    var qn = qe.extend({
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
        updateWhenIdle: Ut.mobile,
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
        Y(this, t);
      },
      onAdd: function() {
        this._initContainer(), this._levels = {}, this._tiles = {}, this._resetView();
      },
      beforeAdd: function(t) {
        t._addZoomLimit(this);
      },
      onRemove: function(t) {
        this._removeAllTiles(), ke(this._container), t._removeZoomLimit(this), this._container = null, this._tileZoom = void 0;
      },
      // @method bringToFront: this
      // Brings the tile layer to the top of all tile layers.
      bringToFront: function() {
        return this._map && (_n(this._container), this._setAutoZIndex(Math.max)), this;
      },
      // @method bringToBack: this
      // Brings the tile layer to the bottom of all tile layers.
      bringToBack: function() {
        return this._map && (gn(this._container), this._setAutoZIndex(Math.min)), this;
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
        return this.options.updateWhenIdle || (this._onMove || (this._onMove = B(this._onMoveEnd, this.options.updateInterval, this)), t.move = this._onMove), this._zoomAnimated && (t.zoomanim = this._animateZoom), t;
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
        for (var n = this.getPane().children, s = -t(-1 / 0, 1 / 0), c = 0, y = n.length, A; c < y; c++)
          A = n[c].style.zIndex, n[c] !== this._container && A && (s = t(s, +A));
        isFinite(s) && (this.options.zIndex = s + t(-1, 1), this._updateZIndex());
      },
      _updateOpacity: function() {
        if (this._map && !Ut.ielt9) {
          ri(this._container, this.options.opacity);
          var t = +/* @__PURE__ */ new Date(), n = !1, s = !1;
          for (var c in this._tiles) {
            var y = this._tiles[c];
            if (!(!y.current || !y.loaded)) {
              var A = Math.min(1, (t - y.loaded) / 200);
              ri(y.el, A), A < 1 ? n = !0 : (y.active ? s = !0 : this._onOpaqueTile(y), y.active = !0);
            }
          }
          s && !this._noPrune && this._pruneTiles(), n && (ce(this._fadeFrame), this._fadeFrame = Kt(this._updateOpacity, this));
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
            s = Number(s), this._levels[s].el.children.length || s === t ? (this._levels[s].el.style.zIndex = n - Math.abs(t - s), this._onUpdateLevel(s)) : (ke(this._levels[s].el), this._removeTilesAtZoom(s), this._onRemoveLevel(s), delete this._levels[s]);
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
          ke(this._levels[t].el), this._onRemoveLevel(Number(t)), delete this._levels[t];
        this._removeAllTiles(), this._tileZoom = void 0;
      },
      _retainParent: function(t, n, s, c) {
        var y = Math.floor(t / 2), A = Math.floor(n / 2), Z = s - 1, rt = new Ot(+y, +A);
        rt.z = +Z;
        var ht = this._tileCoordsToKey(rt), gt = this._tiles[ht];
        return gt && gt.active ? (gt.retain = !0, !0) : (gt && gt.loaded && (gt.retain = !0), Z > c ? this._retainParent(y, A, Z, c) : !1);
      },
      _retainChildren: function(t, n, s, c) {
        for (var y = 2 * t; y < 2 * t + 2; y++)
          for (var A = 2 * n; A < 2 * n + 2; A++) {
            var Z = new Ot(y, A);
            Z.z = s + 1;
            var rt = this._tileCoordsToKey(Z), ht = this._tiles[rt];
            if (ht && ht.active) {
              ht.retain = !0;
              continue;
            } else ht && ht.loaded && (ht.retain = !0);
            s + 1 < c && this._retainChildren(y, A, s + 1, c);
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
        var A = this.options.updateWhenZooming && y !== this._tileZoom;
        (!c || A) && (this._tileZoom = y, this._abortLoading && this._abortLoading(), this._updateLevels(), this._resetGrid(), y !== void 0 && this._update(t), s || this._pruneTiles(), this._noPrune = !!s), this._setZoomTransforms(t, n);
      },
      _setZoomTransforms: function(t, n) {
        for (var s in this._levels)
          this._setZoomTransform(this._levels[s], t, n);
      },
      _setZoomTransform: function(t, n, s) {
        var c = this._map.getZoomScale(s, t.zoom), y = t.origin.multiplyBy(c).subtract(this._map._getNewPixelOrigin(n, s)).round();
        Ut.any3d ? Qi(t.el, y, c) : Be(t.el, y);
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
        var n = this._map, s = n._animatingZoom ? Math.max(n._animateToZoom, n.getZoom()) : n.getZoom(), c = n.getZoomScale(s, this._tileZoom), y = n.project(t, this._tileZoom).floor(), A = n.getSize().divideBy(c * 2);
        return new bt(y.subtract(A), y.add(A));
      },
      // Private method to load tiles in the grid's active zoom level according to map bounds
      _update: function(t) {
        var n = this._map;
        if (n) {
          var s = this._clampZoom(n.getZoom());
          if (t === void 0 && (t = n.getCenter()), this._tileZoom !== void 0) {
            var c = this._getTiledPixelBounds(t), y = this._pxBoundsToTileRange(c), A = y.getCenter(), Z = [], rt = this.options.keepBuffer, ht = new bt(
              y.getBottomLeft().subtract([rt, -rt]),
              y.getTopRight().add([rt, -rt])
            );
            if (!(isFinite(y.min.x) && isFinite(y.min.y) && isFinite(y.max.x) && isFinite(y.max.y)))
              throw new Error("Attempted to load an infinite number of tiles");
            for (var gt in this._tiles) {
              var It = this._tiles[gt].coords;
              (It.z !== this._tileZoom || !ht.contains(new Ot(It.x, It.y))) && (this._tiles[gt].current = !1);
            }
            if (Math.abs(s - this._tileZoom) > 1) {
              this._setView(t, s);
              return;
            }
            for (var qt = y.min.y; qt <= y.max.y; qt++)
              for (var ne = y.min.x; ne <= y.max.x; ne++) {
                var $e = new Ot(ne, qt);
                if ($e.z = this._tileZoom, !!this._isValidTile($e)) {
                  var De = this._tiles[this._tileCoordsToKey($e)];
                  De ? De.current = !0 : Z.push($e);
                }
              }
            if (Z.sort(function(He, Hi) {
              return He.distanceTo(A) - Hi.distanceTo(A);
            }), Z.length !== 0) {
              this._loading || (this._loading = !0, this.fire("loading"));
              var ui = document.createDocumentFragment();
              for (ne = 0; ne < Z.length; ne++)
                this._addTile(Z[ne], ui);
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
        return zt(this.options.bounds).overlaps(c);
      },
      _keyToBounds: function(t) {
        return this._tileCoordsToBounds(this._keyToTileCoords(t));
      },
      _tileCoordsToNwSe: function(t) {
        var n = this._map, s = this.getTileSize(), c = t.scaleBy(s), y = c.add(s), A = n.unproject(c, t.z), Z = n.unproject(y, t.z);
        return [A, Z];
      },
      // converts tile coordinates to its geographical bounds
      _tileCoordsToBounds: function(t) {
        var n = this._tileCoordsToNwSe(t), s = new oe(n[0], n[1]);
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
        n && (ke(n.el), delete this._tiles[t], this.fire("tileunload", {
          tile: n.el,
          coords: this._keyToTileCoords(t)
        }));
      },
      _initTile: function(t) {
        ie(t, "leaflet-tile");
        var n = this.getTileSize();
        t.style.width = n.x + "px", t.style.height = n.y + "px", t.onselectstart = M, t.onmousemove = M, Ut.ielt9 && this.options.opacity < 1 && ri(t, this.options.opacity);
      },
      _addTile: function(t, n) {
        var s = this._getTilePos(t), c = this._tileCoordsToKey(t), y = this.createTile(this._wrapCoords(t), x(this._tileReady, this, t));
        this._initTile(y), this.createTile.length < 2 && Kt(x(this._tileReady, this, t, null, y)), Be(y, s), this._tiles[c] = {
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
        s = this._tiles[c], s && (s.loaded = +/* @__PURE__ */ new Date(), this._map._fadeAnimated ? (ri(s.el, 0), ce(this._fadeFrame), this._fadeFrame = Kt(this._updateOpacity, this)) : (s.active = !0, this._pruneTiles()), n || (ie(s.el, "leaflet-tile-loaded"), this.fire("tileload", {
          tile: s.el,
          coords: t
        })), this._noTilesToLoad() && (this._loading = !1, this.fire("load"), Ut.ielt9 || !this._map._fadeAnimated ? Kt(this._pruneTiles, this) : setTimeout(x(this._pruneTiles, this), 250)));
      },
      _getTilePos: function(t) {
        return t.scaleBy(this.getTileSize()).subtract(this._level.origin);
      },
      _wrapCoords: function(t) {
        var n = new Ot(
          this._wrapX ? T(t.x, this._wrapX) : t.x,
          this._wrapY ? T(t.y, this._wrapY) : t.y
        );
        return n.z = t.z, n;
      },
      _pxBoundsToTileRange: function(t) {
        var n = this.getTileSize();
        return new bt(
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
    function ps(t) {
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
        this._url = t, n = Y(this, n), n.detectRetina && Ut.retina && n.maxZoom > 0 ? (n.tileSize = Math.floor(n.tileSize / 2), n.zoomReverse ? (n.zoomOffset--, n.minZoom = Math.min(n.maxZoom, n.minZoom + 1)) : (n.zoomOffset++, n.maxZoom = Math.max(n.minZoom, n.maxZoom - 1)), n.minZoom = Math.max(0, n.minZoom)) : n.zoomReverse ? n.minZoom = Math.min(n.maxZoom, n.minZoom) : n.maxZoom = Math.max(n.minZoom, n.maxZoom), typeof n.subdomains == "string" && (n.subdomains = n.subdomains.split("")), this.on("tileunload", this._onTileRemove);
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
        return Qt(s, "load", x(this._tileOnLoad, this, n, s)), Qt(s, "error", x(this._tileOnError, this, n, s)), (this.options.crossOrigin || this.options.crossOrigin === "") && (s.crossOrigin = this.options.crossOrigin === !0 ? "" : this.options.crossOrigin), typeof this.options.referrerPolicy == "string" && (s.referrerPolicy = this.options.referrerPolicy), s.alt = "", s.src = this.getTileUrl(t), s;
      },
      // @section Extension methods
      // @uninheritable
      // Layers extending `TileLayer` might reimplement the following method.
      // @method getTileUrl(coords: Object): String
      // Called only internally, returns the URL for a tile given its coordinates.
      // Classes extending `TileLayer` can override this function to provide custom tile URL naming schemes.
      getTileUrl: function(t) {
        var n = {
          r: Ut.retina ? "@2x" : "",
          s: this._getSubdomain(t),
          x: t.x,
          y: t.y,
          z: this._getZoomForUrl()
        };
        if (this._map && !this._map.options.crs.infinite) {
          var s = this._globalTileRange.max.y - t.y;
          this.options.tms && (n.y = s), n["-y"] = s;
        }
        return pt(this._url, b(n, this.options));
      },
      _tileOnLoad: function(t, n) {
        Ut.ielt9 ? setTimeout(x(t, this, null, n), 0) : t(null, n);
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
            n.src = Xt;
            var s = this._tiles[t].coords;
            ke(n), delete this._tiles[t], this.fire("tileabort", {
              tile: n,
              coords: s
            });
          }
      },
      _removeTile: function(t) {
        var n = this._tiles[t];
        if (n)
          return n.el.setAttribute("src", Xt), qn.prototype._removeTile.call(this, t);
      },
      _tileReady: function(t, n, s) {
        if (!(!this._map || s && s.getAttribute("src") === Xt))
          return qn.prototype._tileReady.call(this, t, n, s);
      }
    });
    function ms(t, n) {
      return new qi(t, n);
    }
    var _s = qi.extend({
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
        n = Y(this, n);
        var y = n.detectRetina && Ut.retina ? 2 : 1, A = this.getTileSize();
        s.width = A.x * y, s.height = A.y * y, this.wmsParams = s;
      },
      onAdd: function(t) {
        this._crs = this.options.crs || t.options.crs, this._wmsVersion = parseFloat(this.wmsParams.version);
        var n = this._wmsVersion >= 1.3 ? "crs" : "srs";
        this.wmsParams[n] = this._crs.code, qi.prototype.onAdd.call(this, t);
      },
      getTileUrl: function(t) {
        var n = this._tileCoordsToNwSe(t), s = this._crs, c = Ct(s.project(n[0]), s.project(n[1])), y = c.min, A = c.max, Z = (this._wmsVersion >= 1.3 && this._crs === ea ? [y.y, y.x, A.y, A.x] : [y.x, y.y, A.x, A.y]).join(","), rt = qi.prototype.getTileUrl.call(this, t);
        return rt + lt(this.wmsParams, rt, this.options.uppercase) + (this.options.uppercase ? "&BBOX=" : "&bbox=") + Z;
      },
      // @method setParams(params: Object, noRedraw?: Boolean): this
      // Merges an object with the new parameters and re-requests tiles on the current screen (unless `noRedraw` was set to true).
      setParams: function(t, n) {
        return b(this.wmsParams, t), n || this.redraw(), this;
      }
    });
    function gs(t, n) {
      return new _s(t, n);
    }
    qi.WMS = _s, ms.wms = gs;
    var wi = qe.extend({
      // @section
      // @aka Renderer options
      options: {
        // @option padding: Number = 0.1
        // How much to extend the clip area around the map view (relative to its size)
        // e.g. 0.1 would be 10% of map view in each direction
        padding: 0.1
      },
      initialize: function(t) {
        Y(this, t), w(this), this._layers = this._layers || {};
      },
      onAdd: function() {
        this._container || (this._initContainer(), ie(this._container, "leaflet-zoom-animated")), this.getPane().appendChild(this._container), this._update(), this.on("update", this._updatePaths, this);
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
        var s = this._map.getZoomScale(n, this._zoom), c = this._map.getSize().multiplyBy(0.5 + this.options.padding), y = this._map.project(this._center, n), A = c.multiplyBy(-s).add(y).subtract(this._map._getNewPixelOrigin(t, n));
        Ut.any3d ? Qi(this._container, A, s) : Be(this._container, A);
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
        this._bounds = new bt(s, s.add(n.multiplyBy(1 + t * 2)).round()), this._center = this._map.getCenter(), this._zoom = this._map.getZoom();
      }
    }), vr = wi.extend({
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
        ce(this._redrawRequest), delete this._ctx, ke(this._container), pe(this._container), delete this._container;
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
          var t = this._bounds, n = this._container, s = t.getSize(), c = Ut.retina ? 2 : 1;
          Be(n, t.min), n.width = c * s.x, n.height = c * s.y, n.style.width = s.x + "px", n.style.height = s.y + "px", Ut.retina && this._ctx.scale(2, 2), this._ctx.translate(-t.min.x, -t.min.y), this.fire("update");
        }
      },
      _reset: function() {
        wi.prototype._reset.call(this), this._postponeUpdatePaths && (this._postponeUpdatePaths = !1, this._updatePaths());
      },
      _initPath: function(t) {
        this._updateDashArray(t), this._layers[w(t)] = t;
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
        s ? s.prev = c : this._drawLast = c, c ? c.next = s : this._drawFirst = s, delete t._order, delete this._layers[w(t)], this._requestRedraw(t);
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
        this._map && (this._extendRedrawBounds(t), this._redrawRequest = this._redrawRequest || Kt(this._redraw, this));
      },
      _extendRedrawBounds: function(t) {
        if (t._pxBounds) {
          var n = (t.options.weight || 0) + 1;
          this._redrawBounds = this._redrawBounds || new bt(), this._redrawBounds.extend(t._pxBounds.min.subtract([n, n])), this._redrawBounds.extend(t._pxBounds.max.add([n, n]));
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
          var s, c, y, A, Z = t._parts, rt = Z.length, ht = this._ctx;
          if (rt) {
            for (ht.beginPath(), s = 0; s < rt; s++) {
              for (c = 0, y = Z[s].length; c < y; c++)
                A = Z[s][c], ht[c ? "lineTo" : "moveTo"](A.x, A.y);
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
        n && (Ee(this._container, "leaflet-interactive"), this._fireEvent([n], t, "mouseout"), this._hoveredLayer = null, this._mouseHoverThrottled = !1);
      },
      _handleMouseHover: function(t, n) {
        if (!this._mouseHoverThrottled) {
          for (var s, c, y = this._drawFirst; y; y = y.next)
            s = y.layer, s.options.interactive && s._containsPoint(n) && (c = s);
          c !== this._hoveredLayer && (this._handleMouseOut(t), c && (ie(this._container, "leaflet-interactive"), this._fireEvent([c], t, "mouseover"), this._hoveredLayer = c)), this._fireEvent(this._hoveredLayer ? [this._hoveredLayer] : !1, t), this._mouseHoverThrottled = !0, setTimeout(x(function() {
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
    function la(t) {
      return Ut.canvas ? new vr(t) : null;
    }
    var an = function() {
      try {
        return document.namespaces.add("lvml", "urn:schemas-microsoft-com:vml"), function(t) {
          return document.createElement("<lvml:" + t + ' class="lvml">');
        };
      } catch {
      }
      return function(t) {
        return document.createElement("<" + t + ' xmlns="urn:schemas-microsoft.com:vml" class="lvml">');
      };
    }(), Bo = {
      _initContainer: function() {
        this._container = de("div", "leaflet-vml-container");
      },
      _update: function() {
        this._map._animatingZoom || (wi.prototype._update.call(this), this.fire("update"));
      },
      _initPath: function(t) {
        var n = t._container = an("shape");
        ie(n, "leaflet-vml-shape " + (this.options.className || "")), n.coordsize = "1 1", t._path = an("path"), n.appendChild(t._path), this._updateStyle(t), this._layers[w(t)] = t;
      },
      _addPath: function(t) {
        var n = t._container;
        this._container.appendChild(n), t.options.interactive && t.addInteractiveTarget(n);
      },
      _removePath: function(t) {
        var n = t._container;
        ke(n), t.removeInteractiveTarget(n), delete this._layers[w(t)];
      },
      _updateStyle: function(t) {
        var n = t._stroke, s = t._fill, c = t.options, y = t._container;
        y.stroked = !!c.stroke, y.filled = !!c.fill, c.stroke ? (n || (n = t._stroke = an("stroke")), y.appendChild(n), n.weight = c.weight + "px", n.color = c.color, n.opacity = c.opacity, c.dashArray ? n.dashStyle = Bt(c.dashArray) ? c.dashArray.join(" ") : c.dashArray.replace(/( *, *)/g, " ") : n.dashStyle = "", n.endcap = c.lineCap.replace("butt", "flat"), n.joinstyle = c.lineJoin) : n && (y.removeChild(n), t._stroke = null), c.fill ? (s || (s = t._fill = an("fill")), y.appendChild(s), s.color = c.fillColor || c.color, s.opacity = c.fillOpacity) : s && (y.removeChild(s), t._fill = null);
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
        gn(t._container);
      }
    }, li = Ut.vml ? an : tr, Ae = wi.extend({
      _initContainer: function() {
        this._container = li("svg"), this._container.setAttribute("pointer-events", "none"), this._rootGroup = li("g"), this._container.appendChild(this._rootGroup);
      },
      _destroyContainer: function() {
        ke(this._container), pe(this._container), delete this._container, delete this._rootGroup, delete this._svgSize;
      },
      _update: function() {
        if (!(this._map._animatingZoom && this._bounds)) {
          wi.prototype._update.call(this);
          var t = this._bounds, n = t.getSize(), s = this._container;
          (!this._svgSize || !this._svgSize.equals(n)) && (this._svgSize = n, s.setAttribute("width", n.x), s.setAttribute("height", n.y)), Be(s, t.min), s.setAttribute("viewBox", [t.min.x, t.min.y, n.x, n.y].join(" ")), this.fire("update");
        }
      },
      // methods below are called by vector layers implementations
      _initPath: function(t) {
        var n = t._path = li("path");
        t.options.className && ie(n, t.options.className), t.options.interactive && ie(n, "leaflet-interactive"), this._updateStyle(t), this._layers[w(t)] = t;
      },
      _addPath: function(t) {
        this._rootGroup || this._initContainer(), this._rootGroup.appendChild(t._path), t.addInteractiveTarget(t._path);
      },
      _removePath: function(t) {
        ke(t._path), t.removeInteractiveTarget(t._path), delete this._layers[w(t)];
      },
      _updatePath: function(t) {
        t._project(), t._update();
      },
      _updateStyle: function(t) {
        var n = t._path, s = t.options;
        n && (s.stroke ? (n.setAttribute("stroke", s.color), n.setAttribute("stroke-opacity", s.opacity), n.setAttribute("stroke-width", s.weight), n.setAttribute("stroke-linecap", s.lineCap), n.setAttribute("stroke-linejoin", s.lineJoin), s.dashArray ? n.setAttribute("stroke-dasharray", s.dashArray) : n.removeAttribute("stroke-dasharray"), s.dashOffset ? n.setAttribute("stroke-dashoffset", s.dashOffset) : n.removeAttribute("stroke-dashoffset")) : n.setAttribute("stroke", "none"), s.fill ? (n.setAttribute("fill", s.fillColor || s.color), n.setAttribute("fill-opacity", s.fillOpacity), n.setAttribute("fill-rule", s.fillRule || "evenodd")) : n.setAttribute("fill", "none"));
      },
      _updatePoly: function(t, n) {
        this._setPath(t, er(t._parts, n));
      },
      _updateCircle: function(t) {
        var n = t._point, s = Math.max(Math.round(t._radius), 1), c = Math.max(Math.round(t._radiusY), 1) || s, y = "a" + s + "," + c + " 0 1,0 ", A = t._empty() ? "M0 0" : "M" + (n.x - s) + "," + n.y + y + s * 2 + ",0 " + y + -s * 2 + ",0 ";
        this._setPath(t, A);
      },
      _setPath: function(t, n) {
        t._path.setAttribute("d", n);
      },
      // SVG does not have the concept of zIndex so we resort to changing the DOM order of elements
      _bringToFront: function(t) {
        _n(t._path);
      },
      _bringToBack: function(t) {
        gn(t._path);
      }
    });
    Ut.vml && Ae.include(Bo);
    function ys(t) {
      return Ut.svg || Ut.vml ? new Ae(t) : null;
    }
    ae.include({
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
        return this.options.preferCanvas && la(t) || ys(t);
      }
    });
    var br = je.extend({
      initialize: function(t, n) {
        je.prototype.initialize.call(this, this._boundsToLatLngs(t), n);
      },
      // @method setBounds(latLngBounds: LatLngBounds): this
      // Redraws the rectangle with the passed bounds.
      setBounds: function(t) {
        return this.setLatLngs(this._boundsToLatLngs(t));
      },
      _boundsToLatLngs: function(t) {
        return t = zt(t), [
          t.getSouthWest(),
          t.getNorthWest(),
          t.getNorthEast(),
          t.getSouthEast()
        ];
      }
    });
    function Ao(t, n) {
      return new br(t, n);
    }
    Ae.create = li, Ae.pointsToPath = er, Ti.geometryToLayer = Un, Ti.coordsToLatLng = aa, Ti.coordsToLatLngs = ii, Ti.latLngToCoords = Di, Ti.latLngsToCoords = nn, Ti.getFeature = rn, Ti.asFeature = gr, ae.mergeOptions({
      // @option boxZoom: Boolean = true
      // Whether the map can be zoomed to a rectangular area specified by
      // dragging the mouse while pressing the shift key.
      boxZoom: !0
    });
    var Mn = yi.extend({
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
        ke(this._pane), delete this._pane;
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
        this._clearDeferredResetState(), this._resetState(), Fn(), $r(), this._startPoint = this._map.mouseEventToContainerPoint(t), Qt(document, {
          contextmenu: en,
          mousemove: this._onMouseMove,
          mouseup: this._onMouseUp,
          keydown: this._onKeyDown
        }, this);
      },
      _onMouseMove: function(t) {
        this._moved || (this._moved = !0, this._box = de("div", "leaflet-zoom-box", this._container), ie(this._container, "leaflet-crosshair"), this._map.fire("boxzoomstart")), this._point = this._map.mouseEventToContainerPoint(t);
        var n = new bt(this._point, this._startPoint), s = n.getSize();
        Be(this._box, n.min), this._box.style.width = s.x + "px", this._box.style.height = s.y + "px";
      },
      _finish: function() {
        this._moved && (ke(this._box), Ee(this._container, "leaflet-crosshair")), Rn(), Ur(), pe(document, {
          contextmenu: en,
          mousemove: this._onMouseMove,
          mouseup: this._onMouseUp,
          keydown: this._onKeyDown
        }, this);
      },
      _onMouseUp: function(t) {
        if (!(t.which !== 1 && t.button !== 1) && (this._finish(), !!this._moved)) {
          this._clearDeferredResetState(), this._resetStateTimeout = setTimeout(x(this._resetState, this), 0);
          var n = new oe(
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
    ae.addInitHook("addHandler", "boxZoom", Mn), ae.mergeOptions({
      // @option doubleClickZoom: Boolean|String = true
      // Whether the map can be zoomed in by double clicking on it and
      // zoomed out by double clicking while holding shift. If passed
      // `'center'`, double-click zoom will zoom to the center of the
      //  view regardless of where the mouse was.
      doubleClickZoom: !0
    });
    var vs = yi.extend({
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
    ae.addInitHook("addHandler", "doubleClickZoom", vs), ae.mergeOptions({
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
    var bs = yi.extend({
      addHooks: function() {
        if (!this._draggable) {
          var t = this._map;
          this._draggable = new Ui(t._mapPane, t._container), this._draggable.on({
            dragstart: this._onDragStart,
            drag: this._onDrag,
            dragend: this._onDragEnd
          }, this), this._draggable.on("predrag", this._onPreDragLimit, this), t.options.worldCopyJump && (this._draggable.on("predrag", this._onPreDragWrap, this), t.on("zoomend", this._onZoomEnd, this), t.whenReady(this._onZoomEnd, this));
        }
        ie(this._map._container, "leaflet-grab leaflet-touch-drag"), this._draggable.enable(), this._positions = [], this._times = [];
      },
      removeHooks: function() {
        Ee(this._map._container, "leaflet-grab"), Ee(this._map._container, "leaflet-touch-drag"), this._draggable.disable();
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
          var n = zt(this._map.options.maxBounds);
          this._offsetLimit = Ct(
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
        var t = this._worldWidth, n = Math.round(t / 2), s = this._initialWorldOffset, c = this._draggable._newPos.x, y = (c - n + s) % t + n - s, A = (c + n + s) % t - n - s, Z = Math.abs(y + s) < Math.abs(A + s) ? y : A;
        this._draggable._absPos = this._draggable._newPos.clone(), this._draggable._newPos.x = Z;
      },
      _onDragEnd: function(t) {
        var n = this._map, s = n.options, c = !s.inertia || t.noInertia || this._times.length < 2;
        if (n.fire("dragend", t), c)
          n.fire("moveend");
        else {
          this._prunePositions(+/* @__PURE__ */ new Date());
          var y = this._lastPos.subtract(this._positions[0]), A = (this._lastTime - this._times[0]) / 1e3, Z = s.easeLinearity, rt = y.multiplyBy(Z / A), ht = rt.distanceTo([0, 0]), gt = Math.min(s.inertiaMaxSpeed, ht), It = rt.multiplyBy(gt / ht), qt = gt / (s.inertiaDeceleration * Z), ne = It.multiplyBy(-qt / 2).round();
          !ne.x && !ne.y ? n.fire("moveend") : (ne = n._limitOffset(ne, n.options.maxBounds), Kt(function() {
            n.panBy(ne, {
              duration: qt,
              easeLinearity: Z,
              noMoveStart: !0,
              animate: !0
            });
          }));
        }
      }
    });
    ae.addInitHook("addHandler", "dragging", bs), ae.mergeOptions({
      // @option keyboard: Boolean = true
      // Makes the map focusable and allows users to navigate the map with keyboard
      // arrows and `+`/`-` keys.
      keyboard: !0,
      // @option keyboardPanDelta: Number = 80
      // Amount of pixels to pan when pressing an arrow key.
      keyboardPanDelta: 80
    });
    var xs = yi.extend({
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
              if (c = this._panKeys[n], t.shiftKey && (c = ut(c).multiplyBy(3)), s.options.maxBounds && (c = s._limitOffset(ut(c), s.options.maxBounds)), s.options.worldCopyJump) {
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
          en(t);
        }
      }
    });
    ae.addInitHook("addHandler", "keyboard", xs), ae.mergeOptions({
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
    var sn = yi.extend({
      addHooks: function() {
        Qt(this._map._container, "wheel", this._onWheelScroll, this), this._delta = 0;
      },
      removeHooks: function() {
        pe(this._map._container, "wheel", this._onWheelScroll, this);
      },
      _onWheelScroll: function(t) {
        var n = Xa(t), s = this._map.options.wheelDebounceTime;
        this._delta += n, this._lastMousePos = this._map.mouseEventToContainerPoint(t), this._startTime || (this._startTime = +/* @__PURE__ */ new Date());
        var c = Math.max(s - (+/* @__PURE__ */ new Date() - this._startTime), 0);
        clearTimeout(this._timer), this._timer = setTimeout(x(this._performZoom, this), c), en(t);
      },
      _performZoom: function() {
        var t = this._map, n = t.getZoom(), s = this._map.options.zoomSnap || 0;
        t._stop();
        var c = this._delta / (this._map.options.wheelPxPerZoomLevel * 4), y = 4 * Math.log(2 / (1 + Math.exp(-Math.abs(c)))) / Math.LN2, A = s ? Math.ceil(y / s) * s : y, Z = t._limitZoom(n + (this._delta > 0 ? A : -A)) - n;
        this._delta = 0, this._startTime = null, Z && (t.options.scrollWheelZoom === "center" ? t.setZoom(n + Z) : t.setZoomAround(this._lastMousePos, n + Z));
      }
    });
    ae.addInitHook("addHandler", "scrollWheelZoom", sn);
    var ws = 600;
    ae.mergeOptions({
      // @section Touch interaction options
      // @option tapHold: Boolean
      // Enables simulation of `contextmenu` event, default is `true` for mobile Safari.
      tapHold: Ut.touchNative && Ut.safari && Ut.mobile,
      // @option tapTolerance: Number = 15
      // The max number of pixels a user can shift his finger during touch
      // for it to be considered a valid tap.
      tapTolerance: 15
    });
    var ua = yi.extend({
      addHooks: function() {
        Qt(this._map._container, "touchstart", this._onDown, this);
      },
      removeHooks: function() {
        pe(this._map._container, "touchstart", this._onDown, this);
      },
      _onDown: function(t) {
        if (clearTimeout(this._holdTimeout), t.touches.length === 1) {
          var n = t.touches[0];
          this._startPos = this._newPos = new Ot(n.clientX, n.clientY), this._holdTimeout = setTimeout(x(function() {
            this._cancel(), this._isTapValid() && (Qt(document, "touchend", Ie), Qt(document, "touchend touchcancel", this._cancelClickPrevent), this._simulateEvent("contextmenu", n));
          }, this), ws), Qt(document, "touchend touchcancel contextmenu", this._cancel, this), Qt(document, "touchmove", this._onMove, this);
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
    ae.addInitHook("addHandler", "tapHold", ua), ae.mergeOptions({
      // @section Touch interaction options
      // @option touchZoom: Boolean|String = *
      // Whether the map can be zoomed by touch-dragging with two fingers. If
      // passed `'center'`, it will zoom to the center of the view regardless of
      // where the touch events (fingers) were. Enabled for touch-capable web
      // browsers.
      touchZoom: Ut.touch,
      // @option bounceAtZoomLimits: Boolean = true
      // Set it to false if you don't want the map to zoom beyond min/max zoom
      // and then bounce back when pinch-zooming.
      bounceAtZoomLimits: !0
    });
    var ha = yi.extend({
      addHooks: function() {
        ie(this._map._container, "leaflet-touch-zoom"), Qt(this._map._container, "touchstart", this._onTouchStart, this);
      },
      removeHooks: function() {
        Ee(this._map._container, "leaflet-touch-zoom"), pe(this._map._container, "touchstart", this._onTouchStart, this);
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
            var A = s._add(c)._divideBy(2)._subtract(this._centerPoint);
            if (y === 1 && A.x === 0 && A.y === 0)
              return;
            this._center = n.unproject(n.project(this._pinchStartLatLng, this._zoom).subtract(A), this._zoom);
          }
          this._moved || (n._moveStart(!0, !1), this._moved = !0), ce(this._animRequest);
          var Z = x(n._move, n, this._center, this._zoom, { pinch: !0, round: !1 }, void 0);
          this._animRequest = Kt(Z, this, !0), Ie(t);
        }
      },
      _onTouchEnd: function() {
        if (!this._moved || !this._zooming) {
          this._zooming = !1;
          return;
        }
        this._zooming = !1, ce(this._animRequest), pe(document, "touchmove", this._onTouchMove, this), pe(document, "touchend touchcancel", this._onTouchEnd, this), this._map.options.zoomAnimation ? this._map._animateZoom(this._center, this._map._limitZoom(this._zoom), !0, this._map.options.zoomSnap) : this._map._resetView(this._center, this._map._limitZoom(this._zoom));
      }
    });
    ae.addInitHook("addHandler", "touchZoom", ha), ae.BoxZoom = Mn, ae.DoubleClickZoom = vs, ae.Drag = bs, ae.Keyboard = xs, ae.ScrollWheelZoom = sn, ae.TapHold = ua, ae.TouchZoom = ha, d.Bounds = bt, d.Browser = Ut, d.CRS = ve, d.Canvas = vr, d.Circle = Cn, d.CircleMarker = _r, d.Class = Le, d.Control = di, d.DivIcon = Zi, d.DivOverlay = xi, d.DomEvent = he, d.DomUtil = ho, d.Draggable = Ui, d.Evented = Jt, d.FeatureGroup = bi, d.GeoJSON = Ti, d.GridLayer = qn, d.Handler = yi, d.Icon = kn, d.ImageOverlay = En, d.LatLng = Tt, d.LatLngBounds = oe, d.Layer = qe, d.LayerGroup = Si, d.LineUtil = dr, d.Map = ae, d.Marker = mr, d.Mixin = mo, d.Path = oi, d.Point = Ot, d.PolyUtil = rs, d.Polygon = je, d.Polyline = Pi, d.Popup = Gn, d.PosAnimation = Ya, d.Projection = ls, d.Rectangle = br, d.Renderer = wi, d.SVG = Ae, d.SVGOverlay = oa, d.TileLayer = qi, d.Tooltip = yr, d.Transformation = fn, d.Util = Ye, d.VideoOverlay = fs, d.bind = x, d.bounds = Ct, d.canvas = la, d.circle = xo, d.circleMarker = ia, d.control = yn, d.divIcon = Zn, d.extend = b, d.featureGroup = vo, d.geoJSON = ds, d.geoJson = wo, d.gridLayer = ps, d.icon = bo, d.imageOverlay = Lo, d.latLng = St, d.latLngBounds = zt, d.layerGroup = pr, d.map = hr, d.marker = hs, d.point = ut, d.polygon = ra, d.polyline = na, d.popup = Eo, d.rectangle = Ao, d.setOptions = Y, d.stamp = w, d.svg = ys, d.svgOverlay = Co, d.tileLayer = ms, d.tooltip = Mo, d.transformation = Fi, d.version = p, d.videoOverlay = ko;
    var Ve = window.L;
    d.noConflict = function() {
      return window.L = Ve, this;
    }, window.L = d;
  });
})(Uo, Uo.exports);
var ec = Uo.exports;
const Ii = /* @__PURE__ */ tc(ec);
(() => {
  var vl, bl;
  var u = Object.create, l = Object.defineProperty, d = Object.getOwnPropertyDescriptor, p = Object.getOwnPropertyNames, b = Object.getPrototypeOf, E = Object.prototype.hasOwnProperty, x = (e, i) => () => (i || e((i = { exports: {} }).exports, i), i.exports), g = (e, i, r, a) => {
    if (i && typeof i == "object" || typeof i == "function") for (let o of p(i)) !E.call(e, o) && o !== r && l(e, o, { get: () => i[o], enumerable: !(a = d(i, o)) || a.enumerable });
    return e;
  }, w = (e, i, r) => (r = e != null ? u(b(e)) : {}, g(i || !e || !e.__esModule ? l(r, "default", { value: e, enumerable: !0 }) : r, e)), B = x((e, i) => {
    function r() {
      this.__data__ = [], this.size = 0;
    }
    i.exports = r;
  }), T = x((e, i) => {
    function r(a, o) {
      return a === o || a !== a && o !== o;
    }
    i.exports = r;
  }), M = x((e, i) => {
    var r = T();
    function a(o, h) {
      for (var f = o.length; f--; ) if (r(o[f][0], h)) return f;
      return -1;
    }
    i.exports = a;
  }), N = x((e, i) => {
    var r = M(), a = Array.prototype, o = a.splice;
    function h(f) {
      var _ = this.__data__, k = r(_, f);
      if (k < 0) return !1;
      var C = _.length - 1;
      return k == C ? _.pop() : o.call(_, k, 1), --this.size, !0;
    }
    i.exports = h;
  }), j = x((e, i) => {
    var r = M();
    function a(o) {
      var h = this.__data__, f = r(h, o);
      return f < 0 ? void 0 : h[f][1];
    }
    i.exports = a;
  }), G = x((e, i) => {
    var r = M();
    function a(o) {
      return r(this.__data__, o) > -1;
    }
    i.exports = a;
  }), Y = x((e, i) => {
    var r = M();
    function a(o, h) {
      var f = this.__data__, _ = r(f, o);
      return _ < 0 ? (++this.size, f.push([o, h])) : f[_][1] = h, this;
    }
    i.exports = a;
  }), lt = x((e, i) => {
    var r = B(), a = N(), o = j(), h = G(), f = Y();
    function _(k) {
      var C = -1, z = k == null ? 0 : k.length;
      for (this.clear(); ++C < z; ) {
        var O = k[C];
        this.set(O[0], O[1]);
      }
    }
    _.prototype.clear = r, _.prototype.delete = a, _.prototype.get = o, _.prototype.has = h, _.prototype.set = f, i.exports = _;
  }), ct = x((e, i) => {
    var r = lt();
    function a() {
      this.__data__ = new r(), this.size = 0;
    }
    i.exports = a;
  }), pt = x((e, i) => {
    function r(a) {
      var o = this.__data__, h = o.delete(a);
      return this.size = o.size, h;
    }
    i.exports = r;
  }), Bt = x((e, i) => {
    function r(a) {
      return this.__data__.get(a);
    }
    i.exports = r;
  }), ue = x((e, i) => {
    function r(a) {
      return this.__data__.has(a);
    }
    i.exports = r;
  }), Xt = x((e, i) => {
    var r = typeof Ca == "object" && Ca && Ca.Object === Object && Ca;
    i.exports = r;
  }), Rt = x((e, i) => {
    var r = Xt(), a = typeof self == "object" && self && self.Object === Object && self, o = r || a || Function("return this")();
    i.exports = o;
  }), At = x((e, i) => {
    var r = Rt(), a = r.Symbol;
    i.exports = a;
  }), jt = x((e, i) => {
    var r = At(), a = Object.prototype, o = a.hasOwnProperty, h = a.toString, f = r ? r.toStringTag : void 0;
    function _(k) {
      var C = o.call(k, f), z = k[f];
      try {
        k[f] = void 0;
        var O = !0;
      } catch {
      }
      var K = h.call(k);
      return O && (C ? k[f] = z : delete k[f]), K;
    }
    i.exports = _;
  }), se = x((e, i) => {
    var r = Object.prototype, a = r.toString;
    function o(h) {
      return a.call(h);
    }
    i.exports = o;
  }), Zt = x((e, i) => {
    var r = At(), a = jt(), o = se(), h = "[object Null]", f = "[object Undefined]", _ = r ? r.toStringTag : void 0;
    function k(C) {
      return C == null ? C === void 0 ? f : h : _ && _ in Object(C) ? a(C) : o(C);
    }
    i.exports = k;
  }), Kt = x((e, i) => {
    function r(a) {
      var o = typeof a;
      return a != null && (o == "object" || o == "function");
    }
    i.exports = r;
  }), ce = x((e, i) => {
    var r = Zt(), a = Kt(), o = "[object AsyncFunction]", h = "[object Function]", f = "[object GeneratorFunction]", _ = "[object Proxy]";
    function k(C) {
      if (!a(C)) return !1;
      var z = r(C);
      return z == h || z == f || z == o || z == _;
    }
    i.exports = k;
  }), Ye = x((e, i) => {
    var r = Rt(), a = r["__core-js_shared__"];
    i.exports = a;
  }), Le = x((e, i) => {
    var r = Ye(), a = function() {
      var h = /[^.]+$/.exec(r && r.keys && r.keys.IE_PROTO || "");
      return h ? "Symbol(src)_1." + h : "";
    }();
    function o(h) {
      return !!a && a in h;
    }
    i.exports = o;
  }), Qe = x((e, i) => {
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
  }), Et = x((e, i) => {
    var r = ce(), a = Le(), o = Kt(), h = Qe(), f = /[\\^$.*+?()[\]{}|]/g, _ = /^\[object .+?Constructor\]$/, k = Function.prototype, C = Object.prototype, z = k.toString, O = C.hasOwnProperty, K = RegExp("^" + z.call(O).replace(f, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$");
    function tt(ft) {
      if (!o(ft) || a(ft)) return !1;
      var yt = r(ft) ? K : _;
      return yt.test(h(ft));
    }
    i.exports = tt;
  }), Jt = x((e, i) => {
    function r(a, o) {
      return a == null ? void 0 : a[o];
    }
    i.exports = r;
  }), Ot = x((e, i) => {
    var r = Et(), a = Jt();
    function o(h, f) {
      var _ = a(h, f);
      return r(_) ? _ : void 0;
    }
    i.exports = o;
  }), Pt = x((e, i) => {
    var r = Ot(), a = Rt(), o = r(a, "Map");
    i.exports = o;
  }), ut = x((e, i) => {
    var r = Ot(), a = r(Object, "create");
    i.exports = a;
  }), bt = x((e, i) => {
    var r = ut();
    function a() {
      this.__data__ = r ? r(null) : {}, this.size = 0;
    }
    i.exports = a;
  }), Ct = x((e, i) => {
    function r(a) {
      var o = this.has(a) && delete this.__data__[a];
      return this.size -= o ? 1 : 0, o;
    }
    i.exports = r;
  }), oe = x((e, i) => {
    var r = ut(), a = "__lodash_hash_undefined__", o = Object.prototype, h = o.hasOwnProperty;
    function f(_) {
      var k = this.__data__;
      if (r) {
        var C = k[_];
        return C === a ? void 0 : C;
      }
      return h.call(k, _) ? k[_] : void 0;
    }
    i.exports = f;
  }), zt = x((e, i) => {
    var r = ut(), a = Object.prototype, o = a.hasOwnProperty;
    function h(f) {
      var _ = this.__data__;
      return r ? _[f] !== void 0 : o.call(_, f);
    }
    i.exports = h;
  }), Tt = x((e, i) => {
    var r = ut(), a = "__lodash_hash_undefined__";
    function o(h, f) {
      var _ = this.__data__;
      return this.size += this.has(h) ? 0 : 1, _[h] = r && f === void 0 ? a : f, this;
    }
    i.exports = o;
  }), St = x((e, i) => {
    var r = bt(), a = Ct(), o = oe(), h = zt(), f = Tt();
    function _(k) {
      var C = -1, z = k == null ? 0 : k.length;
      for (this.clear(); ++C < z; ) {
        var O = k[C];
        this.set(O[0], O[1]);
      }
    }
    _.prototype.clear = r, _.prototype.delete = a, _.prototype.get = o, _.prototype.has = h, _.prototype.set = f, i.exports = _;
  }), ve = x((e, i) => {
    var r = St(), a = lt(), o = Pt();
    function h() {
      this.size = 0, this.__data__ = { hash: new r(), map: new (o || a)(), string: new r() };
    }
    i.exports = h;
  }), fe = x((e, i) => {
    function r(a) {
      var o = typeof a;
      return o == "string" || o == "number" || o == "symbol" || o == "boolean" ? a !== "__proto__" : a === null;
    }
    i.exports = r;
  }), we = x((e, i) => {
    var r = fe();
    function a(o, h) {
      var f = o.__data__;
      return r(h) ? f[typeof h == "string" ? "string" : "hash"] : f.map;
    }
    i.exports = a;
  }), Bi = x((e, i) => {
    var r = we();
    function a(o) {
      var h = r(this, o).delete(o);
      return this.size -= h ? 1 : 0, h;
    }
    i.exports = a;
  }), fn = x((e, i) => {
    var r = we();
    function a(o) {
      return r(this, o).get(o);
    }
    i.exports = a;
  }), Fi = x((e, i) => {
    var r = we();
    function a(o) {
      return r(this, o).has(o);
    }
    i.exports = a;
  }), mi = x((e, i) => {
    var r = we();
    function a(o, h) {
      var f = r(this, o), _ = f.size;
      return f.set(o, h), this.size += f.size == _ ? 0 : 1, this;
    }
    i.exports = a;
  }), Ri = x((e, i) => {
    var r = ve(), a = Bi(), o = fn(), h = Fi(), f = mi();
    function _(k) {
      var C = -1, z = k == null ? 0 : k.length;
      for (this.clear(); ++C < z; ) {
        var O = k[C];
        this.set(O[0], O[1]);
      }
    }
    _.prototype.clear = r, _.prototype.delete = a, _.prototype.get = o, _.prototype.has = h, _.prototype.set = f, i.exports = _;
  }), tr = x((e, i) => {
    var r = lt(), a = Pt(), o = Ri(), h = 200;
    function f(_, k) {
      var C = this.__data__;
      if (C instanceof r) {
        var z = C.__data__;
        if (!a || z.length < h - 1) return z.push([_, k]), this.size = ++C.size, this;
        C = this.__data__ = new o(z);
      }
      return C.set(_, k), this.size = C.size, this;
    }
    i.exports = f;
  }), er = x((e, i) => {
    var r = lt(), a = ct(), o = pt(), h = Bt(), f = ue(), _ = tr();
    function k(C) {
      var z = this.__data__ = new r(C);
      this.size = z.size;
    }
    k.prototype.clear = a, k.prototype.delete = o, k.prototype.get = h, k.prototype.has = f, k.prototype.set = _, i.exports = k;
  }), zi = x((e, i) => {
    var r = Ot(), a = function() {
      try {
        var o = r(Object, "defineProperty");
        return o({}, "", {}), o;
      } catch {
      }
    }();
    i.exports = a;
  }), Ni = x((e, i) => {
    var r = zi();
    function a(o, h, f) {
      h == "__proto__" && r ? r(o, h, { configurable: !0, enumerable: !0, value: f, writable: !0 }) : o[h] = f;
    }
    i.exports = a;
  }), ir = x((e, i) => {
    var r = Ni(), a = T();
    function o(h, f, _) {
      (_ !== void 0 && !a(h[f], _) || _ === void 0 && !(f in h)) && r(h, f, _);
    }
    i.exports = o;
  }), Tn = x((e, i) => {
    function r(a) {
      return function(o, h, f) {
        for (var _ = -1, k = Object(o), C = f(o), z = C.length; z--; ) {
          var O = C[a ? z : ++_];
          if (h(k[O], O, k) === !1) break;
        }
        return o;
      };
    }
    i.exports = r;
  }), ji = x((e, i) => {
    var r = Tn(), a = r();
    i.exports = a;
  }), ti = x((e, i) => {
    var r = Rt(), a = typeof e == "object" && e && !e.nodeType && e, o = a && typeof i == "object" && i && !i.nodeType && i, h = o && o.exports === a, f = h ? r.Buffer : void 0, _ = f ? f.allocUnsafe : void 0;
    function k(C, z) {
      if (z) return C.slice();
      var O = C.length, K = _ ? _(O) : new C.constructor(O);
      return C.copy(K), K;
    }
    i.exports = k;
  }), pn = x((e, i) => {
    var r = Rt(), a = r.Uint8Array;
    i.exports = a;
  }), Tr = x((e, i) => {
    var r = pn();
    function a(o) {
      var h = new o.constructor(o.byteLength);
      return new r(h).set(new r(o)), h;
    }
    i.exports = a;
  }), _i = x((e, i) => {
    var r = Tr();
    function a(o, h) {
      var f = h ? r(o.buffer) : o.buffer;
      return new o.constructor(f, o.byteOffset, o.length);
    }
    i.exports = a;
  }), Dn = x((e, i) => {
    function r(a, o) {
      var h = -1, f = a.length;
      for (o || (o = Array(f)); ++h < f; ) o[h] = a[h];
      return o;
    }
    i.exports = r;
  }), P = x((e, i) => {
    var r = Kt(), a = Object.create, o = /* @__PURE__ */ function() {
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
  }), m = x((e, i) => {
    function r(a, o) {
      return function(h) {
        return a(o(h));
      };
    }
    i.exports = r;
  }), v = x((e, i) => {
    var r = m(), a = r(Object.getPrototypeOf, Object);
    i.exports = a;
  }), R = x((e, i) => {
    var r = Object.prototype;
    function a(o) {
      var h = o && o.constructor, f = typeof h == "function" && h.prototype || r;
      return o === f;
    }
    i.exports = a;
  }), Q = x((e, i) => {
    var r = P(), a = v(), o = R();
    function h(f) {
      return typeof f.constructor == "function" && !o(f) ? r(a(f)) : {};
    }
    i.exports = h;
  }), ot = x((e, i) => {
    function r(a) {
      return a != null && typeof a == "object";
    }
    i.exports = r;
  }), mt = x((e, i) => {
    var r = Zt(), a = ot(), o = "[object Arguments]";
    function h(f) {
      return a(f) && r(f) == o;
    }
    i.exports = h;
  }), Yt = x((e, i) => {
    var r = mt(), a = ot(), o = Object.prototype, h = o.hasOwnProperty, f = o.propertyIsEnumerable, _ = r(/* @__PURE__ */ function() {
      return arguments;
    }()) ? r : function(k) {
      return a(k) && h.call(k, "callee") && !f.call(k, "callee");
    };
    i.exports = _;
  }), ge = x((e, i) => {
    var r = Array.isArray;
    i.exports = r;
  }), be = x((e, i) => {
    var r = 9007199254740991;
    function a(o) {
      return typeof o == "number" && o > -1 && o % 1 == 0 && o <= r;
    }
    i.exports = a;
  }), _e = x((e, i) => {
    var r = ce(), a = be();
    function o(h) {
      return h != null && a(h.length) && !r(h);
    }
    i.exports = o;
  }), ye = x((e, i) => {
    var r = _e(), a = ot();
    function o(h) {
      return a(h) && r(h);
    }
    i.exports = o;
  }), qs = x((e, i) => {
    function r() {
      return !1;
    }
    i.exports = r;
  }), Dr = x((e, i) => {
    var r = Rt(), a = qs(), o = typeof e == "object" && e && !e.nodeType && e, h = o && typeof i == "object" && i && !i.nodeType && i, f = h && h.exports === o, _ = f ? r.Buffer : void 0, k = _ ? _.isBuffer : void 0, C = k || a;
    i.exports = C;
  }), Fa = x((e, i) => {
    var r = Zt(), a = v(), o = ot(), h = "[object Object]", f = Function.prototype, _ = Object.prototype, k = f.toString, C = _.hasOwnProperty, z = k.call(Object);
    function O(K) {
      if (!o(K) || r(K) != h) return !1;
      var tt = a(K);
      if (tt === null) return !0;
      var ft = C.call(tt, "constructor") && tt.constructor;
      return typeof ft == "function" && ft instanceof ft && k.call(ft) == z;
    }
    i.exports = O;
  }), Ra = x((e, i) => {
    var r = Zt(), a = be(), o = ot(), h = "[object Arguments]", f = "[object Array]", _ = "[object Boolean]", k = "[object Date]", C = "[object Error]", z = "[object Function]", O = "[object Map]", K = "[object Number]", tt = "[object Object]", ft = "[object RegExp]", yt = "[object Set]", kt = "[object String]", Dt = "[object WeakMap]", F = "[object ArrayBuffer]", nt = "[object DataView]", dt = "[object Float32Array]", wt = "[object Float64Array]", xt = "[object Int8Array]", Lt = "[object Int16Array]", S = "[object Int32Array]", D = "[object Uint8Array]", I = "[object Uint8ClampedArray]", W = "[object Uint16Array]", H = "[object Uint32Array]", U = {};
    U[dt] = U[wt] = U[xt] = U[Lt] = U[S] = U[D] = U[I] = U[W] = U[H] = !0, U[h] = U[f] = U[F] = U[_] = U[nt] = U[k] = U[C] = U[z] = U[O] = U[K] = U[tt] = U[ft] = U[yt] = U[kt] = U[Dt] = !1;
    function it(J) {
      return o(J) && a(J.length) && !!U[r(J)];
    }
    i.exports = it;
  }), Hs = x((e, i) => {
    function r(a) {
      return function(o) {
        return a(o);
      };
    }
    i.exports = r;
  }), Ks = x((e, i) => {
    var r = Xt(), a = typeof e == "object" && e && !e.nodeType && e, o = a && typeof i == "object" && i && !i.nodeType && i, h = o && o.exports === a, f = h && r.process, _ = function() {
      try {
        var k = o && o.require && o.require("util").types;
        return k || f && f.binding && f.binding("util");
      } catch {
      }
    }();
    i.exports = _;
  }), za = x((e, i) => {
    var r = Ra(), a = Hs(), o = Ks(), h = o && o.isTypedArray, f = h ? a(h) : r;
    i.exports = f;
  }), Na = x((e, i) => {
    function r(a, o) {
      if (!(o === "constructor" && typeof a[o] == "function") && o != "__proto__") return a[o];
    }
    i.exports = r;
  }), Ws = x((e, i) => {
    var r = Ni(), a = T(), o = Object.prototype, h = o.hasOwnProperty;
    function f(_, k, C) {
      var z = _[k];
      (!(h.call(_, k) && a(z, C)) || C === void 0 && !(k in _)) && r(_, k, C);
    }
    i.exports = f;
  }), Js = x((e, i) => {
    var r = Ws(), a = Ni();
    function o(h, f, _, k) {
      var C = !_;
      _ || (_ = {});
      for (var z = -1, O = f.length; ++z < O; ) {
        var K = f[z], tt = k ? k(_[K], h[K], K, _, h) : void 0;
        tt === void 0 && (tt = h[K]), C ? a(_, K, tt) : r(_, K, tt);
      }
      return _;
    }
    i.exports = o;
  }), Or = x((e, i) => {
    function r(a, o) {
      for (var h = -1, f = Array(a); ++h < a; ) f[h] = o(h);
      return f;
    }
    i.exports = r;
  }), ja = x((e, i) => {
    var r = 9007199254740991, a = /^(?:0|[1-9]\d*)$/;
    function o(h, f) {
      var _ = typeof h;
      return f = f ?? r, !!f && (_ == "number" || _ != "symbol" && a.test(h)) && h > -1 && h % 1 == 0 && h < f;
    }
    i.exports = o;
  }), Xs = x((e, i) => {
    var r = Or(), a = Yt(), o = ge(), h = Dr(), f = ja(), _ = za(), k = Object.prototype, C = k.hasOwnProperty;
    function z(O, K) {
      var tt = o(O), ft = !tt && a(O), yt = !tt && !ft && h(O), kt = !tt && !ft && !yt && _(O), Dt = tt || ft || yt || kt, F = Dt ? r(O.length, String) : [], nt = F.length;
      for (var dt in O) (K || C.call(O, dt)) && !(Dt && (dt == "length" || yt && (dt == "offset" || dt == "parent") || kt && (dt == "buffer" || dt == "byteLength" || dt == "byteOffset") || f(dt, nt))) && F.push(dt);
      return F;
    }
    i.exports = z;
  }), Ys = x((e, i) => {
    function r(a) {
      var o = [];
      if (a != null) for (var h in Object(a)) o.push(h);
      return o;
    }
    i.exports = r;
  }), Qs = x((e, i) => {
    var r = Kt(), a = R(), o = Ys(), h = Object.prototype, f = h.hasOwnProperty;
    function _(k) {
      if (!r(k)) return o(k);
      var C = a(k), z = [];
      for (var O in k) O == "constructor" && (C || !f.call(k, O)) || z.push(O);
      return z;
    }
    i.exports = _;
  }), ci = x((e, i) => {
    var r = Xs(), a = Qs(), o = _e();
    function h(f) {
      return o(f) ? r(f, !0) : a(f);
    }
    i.exports = h;
  }), Ut = x((e, i) => {
    var r = Js(), a = ci();
    function o(h) {
      return r(h, a(h));
    }
    i.exports = o;
  }), Va = x((e, i) => {
    var r = ir(), a = ti(), o = _i(), h = Dn(), f = Q(), _ = Yt(), k = ge(), C = ye(), z = Dr(), O = ce(), K = Kt(), tt = Fa(), ft = za(), yt = Na(), kt = Ut();
    function Dt(F, nt, dt, wt, xt, Lt, S) {
      var D = yt(F, dt), I = yt(nt, dt), W = S.get(I);
      if (W) {
        r(F, dt, W);
        return;
      }
      var H = Lt ? Lt(D, I, dt + "", F, nt, S) : void 0, U = H === void 0;
      if (U) {
        var it = k(I), J = !it && z(I), et = !it && !J && ft(I);
        H = I, it || J || et ? k(D) ? H = D : C(D) ? H = h(D) : J ? (U = !1, H = a(I, !0)) : et ? (U = !1, H = o(I, !0)) : H = [] : tt(I) || _(I) ? (H = D, _(D) ? H = kt(D) : (!K(D) || O(D)) && (H = f(I))) : U = !1;
      }
      U && (S.set(I, H), xt(H, I, wt, Lt, S), S.delete(I)), r(F, dt, H);
    }
    i.exports = Dt;
  }), $a = x((e, i) => {
    var r = er(), a = ir(), o = ji(), h = Va(), f = Kt(), _ = ci(), k = Na();
    function C(z, O, K, tt, ft) {
      z !== O && o(O, function(yt, kt) {
        if (ft || (ft = new r()), f(yt)) h(z, O, kt, K, C, tt, ft);
        else {
          var Dt = tt ? tt(k(z, kt), yt, kt + "", z, O, ft) : void 0;
          Dt === void 0 && (Dt = yt), a(z, kt, Dt);
        }
      }, _);
    }
    i.exports = C;
  }), Ir = x((e, i) => {
    function r(a) {
      return a;
    }
    i.exports = r;
  }), Ua = x((e, i) => {
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
  }), Fr = x((e, i) => {
    var r = Ua(), a = Math.max;
    function o(h, f, _) {
      return f = a(f === void 0 ? h.length - 1 : f, 0), function() {
        for (var k = arguments, C = -1, z = a(k.length - f, 0), O = Array(z); ++C < z; ) O[C] = k[f + C];
        C = -1;
        for (var K = Array(f + 1); ++C < f; ) K[C] = k[C];
        return K[f] = _(O), r(h, this, K);
      };
    }
    i.exports = o;
  }), Ga = x((e, i) => {
    function r(a) {
      return function() {
        return a;
      };
    }
    i.exports = r;
  }), mn = x((e, i) => {
    var r = Ga(), a = zi(), o = Ir(), h = a ? function(f, _) {
      return a(f, "toString", { configurable: !0, enumerable: !1, value: r(_), writable: !0 });
    } : o;
    i.exports = h;
  }), Za = x((e, i) => {
    var r = 800, a = 16, o = Date.now;
    function h(f) {
      var _ = 0, k = 0;
      return function() {
        var C = o(), z = a - (C - k);
        if (k = C, z > 0) {
          if (++_ >= r) return arguments[0];
        } else _ = 0;
        return f.apply(void 0, arguments);
      };
    }
    i.exports = h;
  }), to = x((e, i) => {
    var r = mn(), a = Za(), o = a(r);
    i.exports = o;
  }), eo = x((e, i) => {
    var r = Ir(), a = Fr(), o = to();
    function h(f, _) {
      return o(a(f, _, r), f + "");
    }
    i.exports = h;
  }), io = x((e, i) => {
    var r = T(), a = _e(), o = ja(), h = Kt();
    function f(_, k, C) {
      if (!h(C)) return !1;
      var z = typeof k;
      return (z == "number" ? a(C) && o(k, C.length) : z == "string" && k in C) ? r(C[k], _) : !1;
    }
    i.exports = f;
  }), no = x((e, i) => {
    var r = eo(), a = io();
    function o(h) {
      return r(function(f, _) {
        var k = -1, C = _.length, z = C > 1 ? _[C - 1] : void 0, O = C > 2 ? _[2] : void 0;
        for (z = h.length > 3 && typeof z == "function" ? (C--, z) : void 0, O && a(_[0], _[1], O) && (z = C < 3 ? void 0 : z, C = 1), f = Object(f); ++k < C; ) {
          var K = _[k];
          K && h(f, K, k, z);
        }
        return f;
      });
    }
    i.exports = o;
  }), nr = x((e, i) => {
    var r = $a(), a = no(), o = a(function(h, f, _) {
      r(h, f, _);
    });
    i.exports = o;
  }), Rr = x((e, i) => {
    var r = Zt(), a = ot(), o = "[object Symbol]";
    function h(f) {
      return typeof f == "symbol" || a(f) && r(f) == o;
    }
    i.exports = h;
  }), rr = x((e, i) => {
    var r = ge(), a = Rr(), o = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/, h = /^\w*$/;
    function f(_, k) {
      if (r(_)) return !1;
      var C = typeof _;
      return C == "number" || C == "symbol" || C == "boolean" || _ == null || a(_) ? !0 : h.test(_) || !o.test(_) || k != null && _ in Object(k);
    }
    i.exports = f;
  }), ro = x((e, i) => {
    var r = Ri(), a = "Expected a function";
    function o(h, f) {
      if (typeof h != "function" || f != null && typeof f != "function") throw new TypeError(a);
      var _ = function() {
        var k = arguments, C = f ? f.apply(this, k) : k[0], z = _.cache;
        if (z.has(C)) return z.get(C);
        var O = h.apply(this, k);
        return _.cache = z.set(C, O) || z, O;
      };
      return _.cache = new (o.Cache || r)(), _;
    }
    o.Cache = r, i.exports = o;
  }), ao = x((e, i) => {
    var r = ro(), a = 500;
    function o(h) {
      var f = r(h, function(k) {
        return _.size === a && _.clear(), k;
      }), _ = f.cache;
      return f;
    }
    i.exports = o;
  }), so = x((e, i) => {
    var r = ao(), a = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g, o = /\\(\\)?/g, h = r(function(f) {
      var _ = [];
      return f.charCodeAt(0) === 46 && _.push(""), f.replace(a, function(k, C, z, O) {
        _.push(z ? O.replace(o, "$1") : C || k);
      }), _;
    });
    i.exports = h;
  }), oo = x((e, i) => {
    function r(a, o) {
      for (var h = -1, f = a == null ? 0 : a.length, _ = Array(f); ++h < f; ) _[h] = o(a[h], h, a);
      return _;
    }
    i.exports = r;
  }), lo = x((e, i) => {
    var r = At(), a = oo(), o = ge(), h = Rr(), f = r ? r.prototype : void 0, _ = f ? f.toString : void 0;
    function k(C) {
      if (typeof C == "string") return C;
      if (o(C)) return a(C, k) + "";
      if (h(C)) return _ ? _.call(C) : "";
      var z = C + "";
      return z == "0" && 1 / C == -1 / 0 ? "-0" : z;
    }
    i.exports = k;
  }), zr = x((e, i) => {
    var r = lo();
    function a(o) {
      return o == null ? "" : r(o);
    }
    i.exports = a;
  }), On = x((e, i) => {
    var r = ge(), a = rr(), o = so(), h = zr();
    function f(_, k) {
      return r(_) ? _ : a(_, k) ? [_] : o(h(_));
    }
    i.exports = f;
  }), qa = x((e, i) => {
    var r = Rr();
    function a(o) {
      if (typeof o == "string" || r(o)) return o;
      var h = o + "";
      return h == "0" && 1 / o == -1 / 0 ? "-0" : h;
    }
    i.exports = a;
  }), Ha = x((e, i) => {
    var r = On(), a = qa();
    function o(h, f) {
      f = r(f, h);
      for (var _ = 0, k = f.length; h != null && _ < k; ) h = h[a(f[_++])];
      return _ && _ == k ? h : void 0;
    }
    i.exports = o;
  }), Vi = x((e, i) => {
    var r = Ha();
    function a(o, h, f) {
      var _ = o == null ? void 0 : r(o, h);
      return _ === void 0 ? f : _;
    }
    i.exports = a;
  }), de = x((e, i) => {
    (function(r, a) {
      typeof e == "object" && typeof i < "u" ? i.exports = a() : (r = r || self).RBush = a();
    })(e, function() {
      function r(F, nt, dt, wt, xt) {
        (function Lt(S, D, I, W, H) {
          for (; W > I; ) {
            if (W - I > 600) {
              var U = W - I + 1, it = D - I + 1, J = Math.log(U), et = 0.5 * Math.exp(2 * J / 3), st = 0.5 * Math.sqrt(J * et * (U - et) / U) * (it - U / 2 < 0 ? -1 : 1), at = Math.max(I, Math.floor(D - it * et / U + st)), _t = Math.min(W, Math.floor(D + (U - it) * et / U + st));
              Lt(S, D, at, _t, H);
            }
            var Vt = S[D], $t = I, te = W;
            for (a(S, I, D), H(S[W], Vt) > 0 && a(S, I, W); $t < te; ) {
              for (a(S, $t, te), $t++, te--; H(S[$t], Vt) < 0; ) $t++;
              for (; H(S[te], Vt) > 0; ) te--;
            }
            H(S[I], Vt) === 0 ? a(S, I, te) : a(S, ++te, W), te <= D && (I = te + 1), D <= te && (W = te - 1);
          }
        })(F, nt, dt || 0, wt || F.length - 1, xt || o);
      }
      function a(F, nt, dt) {
        var wt = F[nt];
        F[nt] = F[dt], F[dt] = wt;
      }
      function o(F, nt) {
        return F < nt ? -1 : F > nt ? 1 : 0;
      }
      var h = function(F) {
        F === void 0 && (F = 9), this._maxEntries = Math.max(4, F), this._minEntries = Math.max(2, Math.ceil(0.4 * this._maxEntries)), this.clear();
      };
      function f(F, nt, dt) {
        if (!dt) return nt.indexOf(F);
        for (var wt = 0; wt < nt.length; wt++) if (dt(F, nt[wt])) return wt;
        return -1;
      }
      function _(F, nt) {
        k(F, 0, F.children.length, nt, F);
      }
      function k(F, nt, dt, wt, xt) {
        xt || (xt = kt(null)), xt.minX = 1 / 0, xt.minY = 1 / 0, xt.maxX = -1 / 0, xt.maxY = -1 / 0;
        for (var Lt = nt; Lt < dt; Lt++) {
          var S = F.children[Lt];
          C(xt, F.leaf ? wt(S) : S);
        }
        return xt;
      }
      function C(F, nt) {
        return F.minX = Math.min(F.minX, nt.minX), F.minY = Math.min(F.minY, nt.minY), F.maxX = Math.max(F.maxX, nt.maxX), F.maxY = Math.max(F.maxY, nt.maxY), F;
      }
      function z(F, nt) {
        return F.minX - nt.minX;
      }
      function O(F, nt) {
        return F.minY - nt.minY;
      }
      function K(F) {
        return (F.maxX - F.minX) * (F.maxY - F.minY);
      }
      function tt(F) {
        return F.maxX - F.minX + (F.maxY - F.minY);
      }
      function ft(F, nt) {
        return F.minX <= nt.minX && F.minY <= nt.minY && nt.maxX <= F.maxX && nt.maxY <= F.maxY;
      }
      function yt(F, nt) {
        return nt.minX <= F.maxX && nt.minY <= F.maxY && nt.maxX >= F.minX && nt.maxY >= F.minY;
      }
      function kt(F) {
        return { children: F, height: 1, leaf: !0, minX: 1 / 0, minY: 1 / 0, maxX: -1 / 0, maxY: -1 / 0 };
      }
      function Dt(F, nt, dt, wt, xt) {
        for (var Lt = [nt, dt]; Lt.length; ) if (!((dt = Lt.pop()) - (nt = Lt.pop()) <= wt)) {
          var S = nt + Math.ceil((dt - nt) / wt / 2) * wt;
          r(F, S, nt, dt, xt), Lt.push(nt, S, S, dt);
        }
      }
      return h.prototype.all = function() {
        return this._all(this.data, []);
      }, h.prototype.search = function(F) {
        var nt = this.data, dt = [];
        if (!yt(F, nt)) return dt;
        for (var wt = this.toBBox, xt = []; nt; ) {
          for (var Lt = 0; Lt < nt.children.length; Lt++) {
            var S = nt.children[Lt], D = nt.leaf ? wt(S) : S;
            yt(F, D) && (nt.leaf ? dt.push(S) : ft(F, D) ? this._all(S, dt) : xt.push(S));
          }
          nt = xt.pop();
        }
        return dt;
      }, h.prototype.collides = function(F) {
        var nt = this.data;
        if (!yt(F, nt)) return !1;
        for (var dt = []; nt; ) {
          for (var wt = 0; wt < nt.children.length; wt++) {
            var xt = nt.children[wt], Lt = nt.leaf ? this.toBBox(xt) : xt;
            if (yt(F, Lt)) {
              if (nt.leaf || ft(F, Lt)) return !0;
              dt.push(xt);
            }
          }
          nt = dt.pop();
        }
        return !1;
      }, h.prototype.load = function(F) {
        if (!F || !F.length) return this;
        if (F.length < this._minEntries) {
          for (var nt = 0; nt < F.length; nt++) this.insert(F[nt]);
          return this;
        }
        var dt = this._build(F.slice(), 0, F.length - 1, 0);
        if (this.data.children.length) if (this.data.height === dt.height) this._splitRoot(this.data, dt);
        else {
          if (this.data.height < dt.height) {
            var wt = this.data;
            this.data = dt, dt = wt;
          }
          this._insert(dt, this.data.height - dt.height - 1, !0);
        }
        else this.data = dt;
        return this;
      }, h.prototype.insert = function(F) {
        return F && this._insert(F, this.data.height - 1), this;
      }, h.prototype.clear = function() {
        return this.data = kt([]), this;
      }, h.prototype.remove = function(F, nt) {
        if (!F) return this;
        for (var dt, wt, xt, Lt = this.data, S = this.toBBox(F), D = [], I = []; Lt || D.length; ) {
          if (Lt || (Lt = D.pop(), wt = D[D.length - 1], dt = I.pop(), xt = !0), Lt.leaf) {
            var W = f(F, Lt.children, nt);
            if (W !== -1) return Lt.children.splice(W, 1), D.push(Lt), this._condense(D), this;
          }
          xt || Lt.leaf || !ft(Lt, S) ? wt ? (dt++, Lt = wt.children[dt], xt = !1) : Lt = null : (D.push(Lt), I.push(dt), dt = 0, wt = Lt, Lt = Lt.children[0]);
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
        for (var dt = []; F; ) F.leaf ? nt.push.apply(nt, F.children) : dt.push.apply(dt, F.children), F = dt.pop();
        return nt;
      }, h.prototype._build = function(F, nt, dt, wt) {
        var xt, Lt = dt - nt + 1, S = this._maxEntries;
        if (Lt <= S) return _(xt = kt(F.slice(nt, dt + 1)), this.toBBox), xt;
        wt || (wt = Math.ceil(Math.log(Lt) / Math.log(S)), S = Math.ceil(Lt / Math.pow(S, wt - 1))), (xt = kt([])).leaf = !1, xt.height = wt;
        var D = Math.ceil(Lt / S), I = D * Math.ceil(Math.sqrt(S));
        Dt(F, nt, dt, I, this.compareMinX);
        for (var W = nt; W <= dt; W += I) {
          var H = Math.min(W + I - 1, dt);
          Dt(F, W, H, D, this.compareMinY);
          for (var U = W; U <= H; U += D) {
            var it = Math.min(U + D - 1, H);
            xt.children.push(this._build(F, U, it, wt - 1));
          }
        }
        return _(xt, this.toBBox), xt;
      }, h.prototype._chooseSubtree = function(F, nt, dt, wt) {
        for (; wt.push(nt), !nt.leaf && wt.length - 1 !== dt; ) {
          for (var xt = 1 / 0, Lt = 1 / 0, S = void 0, D = 0; D < nt.children.length; D++) {
            var I = nt.children[D], W = K(I), H = (U = F, it = I, (Math.max(it.maxX, U.maxX) - Math.min(it.minX, U.minX)) * (Math.max(it.maxY, U.maxY) - Math.min(it.minY, U.minY)) - W);
            H < Lt ? (Lt = H, xt = W < xt ? W : xt, S = I) : H === Lt && W < xt && (xt = W, S = I);
          }
          nt = S || nt.children[0];
        }
        var U, it;
        return nt;
      }, h.prototype._insert = function(F, nt, dt) {
        var wt = dt ? F : this.toBBox(F), xt = [], Lt = this._chooseSubtree(wt, this.data, nt, xt);
        for (Lt.children.push(F), C(Lt, wt); nt >= 0 && xt[nt].children.length > this._maxEntries; ) this._split(xt, nt), nt--;
        this._adjustParentBBoxes(wt, xt, nt);
      }, h.prototype._split = function(F, nt) {
        var dt = F[nt], wt = dt.children.length, xt = this._minEntries;
        this._chooseSplitAxis(dt, xt, wt);
        var Lt = this._chooseSplitIndex(dt, xt, wt), S = kt(dt.children.splice(Lt, dt.children.length - Lt));
        S.height = dt.height, S.leaf = dt.leaf, _(dt, this.toBBox), _(S, this.toBBox), nt ? F[nt - 1].children.push(S) : this._splitRoot(dt, S);
      }, h.prototype._splitRoot = function(F, nt) {
        this.data = kt([F, nt]), this.data.height = F.height + 1, this.data.leaf = !1, _(this.data, this.toBBox);
      }, h.prototype._chooseSplitIndex = function(F, nt, dt) {
        for (var wt, xt, Lt, S, D, I, W, H = 1 / 0, U = 1 / 0, it = nt; it <= dt - nt; it++) {
          var J = k(F, 0, it, this.toBBox), et = k(F, it, dt, this.toBBox), st = (xt = J, Lt = et, S = void 0, D = void 0, I = void 0, W = void 0, S = Math.max(xt.minX, Lt.minX), D = Math.max(xt.minY, Lt.minY), I = Math.min(xt.maxX, Lt.maxX), W = Math.min(xt.maxY, Lt.maxY), Math.max(0, I - S) * Math.max(0, W - D)), at = K(J) + K(et);
          st < H ? (H = st, wt = it, U = at < U ? at : U) : st === H && at < U && (U = at, wt = it);
        }
        return wt || dt - nt;
      }, h.prototype._chooseSplitAxis = function(F, nt, dt) {
        var wt = F.leaf ? this.compareMinX : z, xt = F.leaf ? this.compareMinY : O;
        this._allDistMargin(F, nt, dt, wt) < this._allDistMargin(F, nt, dt, xt) && F.children.sort(wt);
      }, h.prototype._allDistMargin = function(F, nt, dt, wt) {
        F.children.sort(wt);
        for (var xt = this.toBBox, Lt = k(F, 0, nt, xt), S = k(F, dt - nt, dt, xt), D = tt(Lt) + tt(S), I = nt; I < dt - nt; I++) {
          var W = F.children[I];
          C(Lt, F.leaf ? xt(W) : W), D += tt(Lt);
        }
        for (var H = dt - nt - 1; H >= nt; H--) {
          var U = F.children[H];
          C(S, F.leaf ? xt(U) : U), D += tt(S);
        }
        return D;
      }, h.prototype._adjustParentBBoxes = function(F, nt, dt) {
        for (var wt = dt; wt >= 0; wt--) C(nt[wt], F);
      }, h.prototype._condense = function(F) {
        for (var nt = F.length - 1, dt = void 0; nt >= 0; nt--) F[nt].children.length === 0 ? nt > 0 ? (dt = F[nt - 1].children).splice(dt.indexOf(F[nt]), 1) : this.clear() : _(F[nt], this.toBBox);
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
  var ke = { version: "2.19.3" }, In = w(nr()), _n = { tooltips: { placeMarker: "Click to place marker", placeMarkerTouch: "Tap the map to place a marker", firstVertex: "Click to place first vertex", continueLine: "Click to continue drawing", finishLine: "Click any existing marker to finish", finishPoly: "Click first marker to finish", finishRect: "Click to finish", startCircle: "Click to place circle center", finishCircle: "Click to finish circle", placeCircleMarker: "Click to place circle marker", placeText: "Click to place text", selectFirstLayerFor: "Select first layer for {action}", selectSecondLayerFor: "Select second layer for {action}" }, actions: { finish: "Finish", cancel: "Cancel", removeLastVertex: "Remove Last Vertex" }, buttonTitles: { drawMarkerButton: "Draw Marker", drawPolyButton: "Draw Polygons", drawLineButton: "Draw Polyline", drawCircleButton: "Draw Circle", drawRectButton: "Draw Rectangle", editButton: "Edit Layers", dragButton: "Drag Layers", cutButton: "Cut Layers", deleteButton: "Remove Layers", drawCircleMarkerButton: "Draw Circle Marker", snappingButton: "Snap dragged marker to other layers and vertices", pinningButton: "Pin shared vertices together", rotateButton: "Rotate Layers", drawTextButton: "Draw Text", scaleButton: "Scale Layers", autoTracingButton: "Auto trace Line", snapGuidesButton: "Show SnapGuides", unionButton: "Union layers", differenceButton: "Subtract layers" }, measurements: { totalLength: "Length", segmentLength: "Segment length", area: "Area", radius: "Radius", perimeter: "Perimeter", height: "Height", width: "Width", coordinates: "Position", coordinatesMarker: "Position Marker" } }, gn = { tooltips: { placeMarker: "Platziere den Marker mit Klick", placeMarkerTouch: "Tippe auf die Karte, um einen Marker zu platzieren", firstVertex: "Platziere den ersten Marker mit Klick", continueLine: "Klicke, um weiter zu zeichnen", finishLine: "Beende mit Klick auf existierenden Marker", finishPoly: "Beende mit Klick auf ersten Marker", finishRect: "Beende mit Klick", startCircle: "Platziere das Kreiszentrum mit Klick", finishCircle: "Beende den Kreis mit Klick", placeCircleMarker: "Platziere den Kreismarker mit Klick", placeText: "Platziere den Text mit Klick" }, actions: { finish: "Beenden", cancel: "Abbrechen", removeLastVertex: "Letzten Vertex löschen" }, buttonTitles: { drawMarkerButton: "Marker zeichnen", drawPolyButton: "Polygon zeichnen", drawLineButton: "Polyline zeichnen", drawCircleButton: "Kreis zeichnen", drawRectButton: "Rechteck zeichnen", editButton: "Layer editieren", dragButton: "Layer bewegen", cutButton: "Layer schneiden", deleteButton: "Layer löschen", drawCircleMarkerButton: "Kreismarker zeichnen", snappingButton: "Bewegter Layer an andere Layer oder Vertexe einhacken", pinningButton: "Vertexe an der gleichen Position verknüpfen", rotateButton: "Layer drehen", drawTextButton: "Text zeichnen", scaleButton: "Layer skalieren", autoTracingButton: "Linie automatisch nachzeichen" }, measurements: { totalLength: "Länge", segmentLength: "Segment Länge", area: "Fläche", radius: "Radius", perimeter: "Umfang", height: "Höhe", width: "Breite", coordinates: "Position", coordinatesMarker: "Position Marker" } }, Nr = { tooltips: { placeMarker: "Clicca per posizionare un Marker", placeMarkerTouch: "Tocca la mappa per posizionare un marker", firstVertex: "Clicca per posizionare il primo vertice", continueLine: "Clicca per continuare a disegnare", finishLine: "Clicca qualsiasi marker esistente per terminare", finishPoly: "Clicca il primo marker per terminare", finishRect: "Clicca per terminare", startCircle: "Clicca per posizionare il punto centrale del cerchio", finishCircle: "Clicca per terminare il cerchio", placeCircleMarker: "Clicca per posizionare un Marker del cherchio" }, actions: { finish: "Termina", cancel: "Annulla", removeLastVertex: "Rimuovi l'ultimo vertice" }, buttonTitles: { drawMarkerButton: "Disegna Marker", drawPolyButton: "Disegna Poligoni", drawLineButton: "Disegna Polilinea", drawCircleButton: "Disegna Cerchio", drawRectButton: "Disegna Rettangolo", editButton: "Modifica Livelli", dragButton: "Sposta Livelli", cutButton: "Ritaglia Livelli", deleteButton: "Elimina Livelli", drawCircleMarkerButton: "Disegna Marker del Cerchio", snappingButton: "Snap ha trascinato il pennarello su altri strati e vertici", pinningButton: "Pin condiviso vertici insieme", rotateButton: "Ruota livello" } }, ie = { tooltips: { placeMarker: "Klik untuk menempatkan marker", placeMarkerTouch: "Ketuk peta untuk menempatkan marker", firstVertex: "Klik untuk menempatkan vertex pertama", continueLine: "Klik untuk meneruskan digitasi", finishLine: "Klik pada sembarang marker yang ada untuk mengakhiri", finishPoly: "Klik marker pertama untuk mengakhiri", finishRect: "Klik untuk mengakhiri", startCircle: "Klik untuk menempatkan titik pusat lingkaran", finishCircle: "Klik untuk mengakhiri lingkaran", placeCircleMarker: "Klik untuk menempatkan penanda lingkarann" }, actions: { finish: "Selesai", cancel: "Batal", removeLastVertex: "Hilangkan Vertex Terakhir" }, buttonTitles: { drawMarkerButton: "Digitasi Marker", drawPolyButton: "Digitasi Polygon", drawLineButton: "Digitasi Polyline", drawCircleButton: "Digitasi Lingkaran", drawRectButton: "Digitasi Segi Empat", editButton: "Edit Layer", dragButton: "Geser Layer", cutButton: "Potong Layer", deleteButton: "Hilangkan Layer", drawCircleMarkerButton: "Digitasi Penanda Lingkaran", snappingButton: "Jepretkan penanda yang ditarik ke lapisan dan simpul lain", pinningButton: "Sematkan simpul bersama bersama", rotateButton: "Putar lapisan" } }, Ee = { tooltips: { placeMarker: "Adaugă un punct", placeMarkerTouch: "Atingeți harta pentru a plasa un punct", firstVertex: "Apasă aici pentru a adăuga primul Vertex", continueLine: "Apasă aici pentru a continua desenul", finishLine: "Apasă pe orice obiect pentru a finisa desenul", finishPoly: "Apasă pe primul obiect pentru a finisa", finishRect: "Apasă pentru a finisa", startCircle: "Apasă pentru a desena un cerc", finishCircle: "Apasă pentru a finisa un cerc", placeCircleMarker: "Adaugă un punct" }, actions: { finish: "Termină", cancel: "Anulează", removeLastVertex: "Șterge ultimul Vertex" }, buttonTitles: { drawMarkerButton: "Adaugă o bulină", drawPolyButton: "Desenează un poligon", drawLineButton: "Desenează o linie", drawCircleButton: "Desenează un cerc", drawRectButton: "Desenează un dreptunghi", editButton: "Editează straturile", dragButton: "Mută straturile", cutButton: "Taie straturile", deleteButton: "Șterge straturile", drawCircleMarkerButton: "Desenează marcatorul cercului", snappingButton: "Fixați marcatorul glisat pe alte straturi și vârfuri", pinningButton: "Fixați vârfurile partajate împreună", rotateButton: "Rotiți stratul" } }, jr = { tooltips: { placeMarker: "Нажмите, чтобы нанести маркер", placeMarkerTouch: "Коснитесь карты, чтобы разместить маркер", firstVertex: "Нажмите, чтобы нанести первый объект", continueLine: "Нажмите, чтобы продолжить рисование", finishLine: "Нажмите любой существующий маркер для завершения", finishPoly: "Выберите первую точку, чтобы закончить", finishRect: "Нажмите, чтобы закончить", startCircle: "Нажмите, чтобы добавить центр круга", finishCircle: "Нажмите, чтобы задать радиус", placeCircleMarker: "Нажмите, чтобы нанести круговой маркер" }, actions: { finish: "Завершить", cancel: "Отменить", removeLastVertex: "Отменить последнее действие" }, buttonTitles: { drawMarkerButton: "Добавить маркер", drawPolyButton: "Рисовать полигон", drawLineButton: "Рисовать кривую", drawCircleButton: "Рисовать круг", drawRectButton: "Рисовать прямоугольник", editButton: "Редактировать слой", dragButton: "Перенести слой", cutButton: "Вырезать слой", deleteButton: "Удалить слой", drawCircleMarkerButton: "Добавить круговой маркер", snappingButton: "Привязать перетаскиваемый маркер к другим слоям и вершинам", pinningButton: "Связать общие точки вместе", rotateButton: "Поворот слоя" } }, ar = { tooltips: { placeMarker: "Presiona para colocar un marcador", placeMarkerTouch: "Toca el mapa para colocar un marcador", firstVertex: "Presiona para colocar el primer vértice", continueLine: "Presiona para continuar dibujando", finishLine: "Presiona cualquier marcador existente para finalizar", finishPoly: "Presiona el primer marcador para finalizar", finishRect: "Presiona para finalizar", startCircle: "Presiona para colocar el centro del círculo", finishCircle: "Presiona para finalizar el círculo", placeCircleMarker: "Presiona para colocar un marcador de círculo" }, actions: { finish: "Finalizar", cancel: "Cancelar", removeLastVertex: "Eliminar último vértice" }, buttonTitles: { drawMarkerButton: "Dibujar Marcador", drawPolyButton: "Dibujar Polígono", drawLineButton: "Dibujar Línea", drawCircleButton: "Dibujar Círculo", drawRectButton: "Dibujar Rectángulo", editButton: "Editar Capas", dragButton: "Arrastrar Capas", cutButton: "Cortar Capas", deleteButton: "Eliminar Capas", drawCircleMarkerButton: "Dibujar Marcador de Círculo", snappingButton: "El marcador de Snap arrastrado a otras capas y vértices", pinningButton: "Fijar juntos los vértices compartidos", rotateButton: "Rotar capa" } }, ri = { tooltips: { placeMarker: "Klik om een marker te plaatsen", placeMarkerTouch: "Tik op de kaart om een marker te plaatsen", firstVertex: "Klik om het eerste punt te plaatsen", continueLine: "Klik om te blijven tekenen", finishLine: "Klik op een bestaand punt om te beëindigen", finishPoly: "Klik op het eerst punt om te beëindigen", finishRect: "Klik om te beëindigen", startCircle: "Klik om het middelpunt te plaatsen", finishCircle: "Klik om de cirkel te beëindigen", placeCircleMarker: "Klik om een marker te plaatsen" }, actions: { finish: "Bewaar", cancel: "Annuleer", removeLastVertex: "Verwijder laatste punt" }, buttonTitles: { drawMarkerButton: "Plaats Marker", drawPolyButton: "Teken een vlak", drawLineButton: "Teken een lijn", drawCircleButton: "Teken een cirkel", drawRectButton: "Teken een vierkant", editButton: "Bewerk", dragButton: "Verplaats", cutButton: "Knip", deleteButton: "Verwijder", drawCircleMarkerButton: "Plaats Marker", snappingButton: "Snap gesleepte marker naar andere lagen en hoekpunten", pinningButton: "Speld gedeelde hoekpunten samen", rotateButton: "Laag roteren" } }, uo = { tooltips: { placeMarker: "Cliquez pour placer un marqueur", placeMarkerTouch: "Appuyez sur la carte pour placer un marqueur", firstVertex: "Cliquez pour placer le premier sommet", continueLine: "Cliquez pour continuer à dessiner", finishLine: "Cliquez sur n'importe quel marqueur pour terminer", finishPoly: "Cliquez sur le premier marqueur pour terminer", finishRect: "Cliquez pour terminer", startCircle: "Cliquez pour placer le centre du cercle", finishCircle: "Cliquez pour finir le cercle", placeCircleMarker: "Cliquez pour placer le marqueur circulaire" }, actions: { finish: "Terminer", cancel: "Annuler", removeLastVertex: "Retirer le dernier sommet" }, buttonTitles: { drawMarkerButton: "Placer des marqueurs", drawPolyButton: "Dessiner des polygones", drawLineButton: "Dessiner des polylignes", drawCircleButton: "Dessiner un cercle", drawRectButton: "Dessiner un rectangle", editButton: "Éditer des calques", dragButton: "Déplacer des calques", cutButton: "Couper des calques", deleteButton: "Supprimer des calques", drawCircleMarkerButton: "Dessiner un marqueur circulaire", snappingButton: "Glisser le marqueur vers d'autres couches et sommets", pinningButton: "Épingler ensemble les sommets partagés", rotateButton: "Tourner des calques" } }, sr = { tooltips: { placeMarker: "单击放置标记", placeMarkerTouch: "点击地图放置标记", firstVertex: "单击放置首个顶点", continueLine: "单击继续绘制", finishLine: "单击任何存在的标记以完成", finishPoly: "单击第一个标记以完成", finishRect: "单击完成", startCircle: "单击放置圆心", finishCircle: "单击完成圆形", placeCircleMarker: "点击放置圆形标记" }, actions: { finish: "完成", cancel: "取消", removeLastVertex: "移除最后的顶点" }, buttonTitles: { drawMarkerButton: "绘制标记", drawPolyButton: "绘制多边形", drawLineButton: "绘制线段", drawCircleButton: "绘制圆形", drawRectButton: "绘制长方形", editButton: "编辑图层", dragButton: "拖拽图层", cutButton: "剪切图层", deleteButton: "删除图层", drawCircleMarkerButton: "画圆圈标记", snappingButton: "将拖动的标记捕捉到其他图层和顶点", pinningButton: "将共享顶点固定在一起", rotateButton: "旋转图层" } }, Qi = { tooltips: { placeMarker: "單擊放置標記", placeMarkerTouch: "點擊地圖放置標記", firstVertex: "單擊放置第一個頂點", continueLine: "單擊繼續繪製", finishLine: "單擊任何存在的標記以完成", finishPoly: "單擊第一個標記以完成", finishRect: "單擊完成", startCircle: "單擊放置圓心", finishCircle: "單擊完成圓形", placeCircleMarker: "點擊放置圓形標記" }, actions: { finish: "完成", cancel: "取消", removeLastVertex: "移除最後一個頂點" }, buttonTitles: { drawMarkerButton: "放置標記", drawPolyButton: "繪製多邊形", drawLineButton: "繪製線段", drawCircleButton: "繪製圓形", drawRectButton: "繪製方形", editButton: "編輯圖形", dragButton: "移動圖形", cutButton: "裁切圖形", deleteButton: "刪除圖形", drawCircleMarkerButton: "畫圓圈標記", snappingButton: "將拖動的標記對齊到其他圖層和頂點", pinningButton: "將共享頂點固定在一起", rotateButton: "旋轉圖形" } }, Be = { tooltips: { placeMarker: "Clique para posicionar o marcador", placeMarkerTouch: "Toque no mapa para posicionar um marcador", firstVertex: "Clique para posicionar o primeiro vértice", continueLine: "Clique para continuar desenhando", finishLine: "Clique em qualquer marcador existente para finalizar", finishPoly: "Clique no primeiro marcador para finalizar", finishRect: "Clique para finalizar", startCircle: "Clique para posicionar o centro do círculo", finishCircle: "Clique para finalizar o círculo", placeCircleMarker: "Clique para posicionar o marcador circular", placeText: "Clique para inserir texto" }, actions: { finish: "Finalizar", cancel: "Cancelar", removeLastVertex: "Remover último vértice" }, buttonTitles: { drawMarkerButton: "Desenhar Marcador", drawPolyButton: "Desenhar Polígonos", drawLineButton: "Desenhar Linha Poligonal", drawCircleButton: "Desenhar Círculo", drawRectButton: "Desenhar Retângulo", editButton: "Editar Camadas", dragButton: "Arrastar Camadas", cutButton: "Recortar Camadas", deleteButton: "Remover Camadas", drawCircleMarkerButton: "Desenhar Marcador de Círculo", snappingButton: "Ajustar marcador arrastado a outras camadas e vértices", pinningButton: "Unir vértices compartilhados", rotateButton: "Rotacionar Camadas", drawTextButton: "Desenhar Texto", scaleButton: "Redimensionar Camadas", autoTracingButton: "Traçado Automático de Linha" }, measurements: { totalLength: "Comprimento", segmentLength: "Comprimento do Segmento", area: "Área", radius: "Raio", perimeter: "Perímetro", height: "Altura", width: "Largura", coordinates: "Posição", coordinatesMarker: "Marcador de Posição" } }, $i = { tooltips: { placeMarker: "Clique para colocar marcador", placeMarkerTouch: "Toque no mapa para colocar um marcador", firstVertex: "Clique para colocar primeiro vértice", continueLine: "Clique para continuar a desenhar", finishLine: "Clique num marcador existente para terminar", finishPoly: "Clique no primeiro marcador para terminar", finishRect: "Clique para terminar", startCircle: "Clique para colocar o centro do círculo", finishCircle: "Clique para terminar o círculo", placeCircleMarker: "Clique para colocar marcador de círculo", placeText: "Clique para colocar texto" }, actions: { finish: "Terminar", cancel: "Cancelar", removeLastVertex: "Remover Último Vértice" }, buttonTitles: { drawMarkerButton: "Desenhar Marcador", drawPolyButton: "Desenhar Polígonos", drawLineButton: "Desenhar Polilinha", drawCircleButton: "Desenhar Círculo", drawRectButton: "Desenhar Retângulo", editButton: "Editar Camadas", dragButton: "Arrastar Camadas", cutButton: "Cortar Camadas", deleteButton: "Remover Camadas", drawCircleMarkerButton: "Desenhar Marcador de Círculo", snappingButton: "Ajustar marcador arrastado a outras camadas e vértices", pinningButton: "Unir vértices partilhados", rotateButton: "Rodar Camadas", drawTextButton: "Desenhar Texto", scaleButton: "Escalar Camadas", autoTracingButton: "Traçado Automático de Linha" }, measurements: { totalLength: "Comprimento", segmentLength: "Comprimento do Segmento", area: "Área", radius: "Raio", perimeter: "Perímetro", height: "Altura", width: "Largura", coordinates: "Posição", coordinatesMarker: "Marcador de Posição" } }, Fn = { tooltips: { placeMarker: "Kliknij, aby umieścić znacznik", placeMarkerTouch: "Dotknij mapę, aby umieścić znacznik", firstVertex: "Kliknij, aby umieścić pierwszy wierzchołek", continueLine: "Kliknij, aby kontynuować rysowanie", finishLine: "Kliknij dowolny istniejący znacznik, aby zakończyć", finishPoly: "Kliknij pierwszy znacznik, aby zakończyć", finishRect: "Kliknij, aby zakończyć", startCircle: "Kliknij, aby umieścić środek okręgu", finishCircle: "Kliknij, aby zakończyć okrąg", placeCircleMarker: "Kliknij, aby umieścić znacznik okręgu", placeText: "Kliknij, aby umieścić tekst" }, actions: { finish: "Zakończ", cancel: "Anuluj", removeLastVertex: "Usuń ostatni wierzchołek" }, buttonTitles: { drawMarkerButton: "Rysuj znacznik", drawPolyButton: "Rysuj wielokąt", drawLineButton: "Rysuj linię", drawCircleButton: "Rysuj okrąg", drawRectButton: "Rysuj prostokąt", editButton: "Edytuj warstwy", dragButton: "Przeciągnij warstwy", cutButton: "Wytnij warstwy", deleteButton: "Usuń warstwy", drawCircleMarkerButton: "Rysuj znacznik okrągły", snappingButton: "Przyciągnij przenoszony znacznik do innych warstw i wierzchołków", pinningButton: "Przypnij wspólne wierzchołki razem", rotateButton: "Obróć warstwy", drawTextButton: "Rysuj tekst", scaleButton: "Skaluj warstwy", autoTracingButton: "Automatyczne śledzenie linii" }, measurements: { totalLength: "Długość", segmentLength: "Długość odcinka", area: "Obszar", radius: "Promień", perimeter: "Obwód", height: "Wysokość", width: "Szerokość", coordinates: "Pozycja", coordinatesMarker: "Znacznik pozycji" } }, Rn = { tooltips: { placeMarker: "Klicka för att placera markör", placeMarkerTouch: "Tryck på kartan för att placera en markör", firstVertex: "Klicka för att placera första hörnet", continueLine: "Klicka för att fortsätta rita", finishLine: "Klicka på en existerande punkt för att slutföra", finishPoly: "Klicka på den första punkten för att slutföra", finishRect: "Klicka för att slutföra", startCircle: "Klicka för att placera cirkelns centrum", finishCircle: "Klicka för att slutföra cirkeln", placeCircleMarker: "Klicka för att placera cirkelmarkör" }, actions: { finish: "Slutför", cancel: "Avbryt", removeLastVertex: "Ta bort sista hörnet" }, buttonTitles: { drawMarkerButton: "Rita Markör", drawPolyButton: "Rita Polygoner", drawLineButton: "Rita Linje", drawCircleButton: "Rita Cirkel", drawRectButton: "Rita Rektangel", editButton: "Redigera Lager", dragButton: "Dra Lager", cutButton: "Klipp i Lager", deleteButton: "Ta bort Lager", drawCircleMarkerButton: "Rita Cirkelmarkör", snappingButton: "Snäpp dra markören till andra lager och hörn", pinningButton: "Fäst delade hörn tillsammans", rotateButton: "Rotera lagret" } }, Vr = { tooltips: { placeMarker: "Κάντε κλικ για να τοποθετήσετε Δείκτη", placeMarkerTouch: "Πατήστε στο χάρτη για να τοποθετήσετε δείκτη", firstVertex: "Κάντε κλικ για να τοποθετήσετε το πρώτο σημείο", continueLine: "Κάντε κλικ για να συνεχίσετε να σχεδιάζετε", finishLine: "Κάντε κλικ σε οποιονδήποτε υπάρχον σημείο για να ολοκληρωθεί", finishPoly: "Κάντε κλικ στο πρώτο σημείο για να τελειώσετε", finishRect: "Κάντε κλικ για να τελειώσετε", startCircle: "Κάντε κλικ για να τοποθετήσετε κέντρο Κύκλου", finishCircle: "Κάντε κλικ για να ολοκληρώσετε τον Κύκλο", placeCircleMarker: "Κάντε κλικ για να τοποθετήσετε Κυκλικό Δείκτη" }, actions: { finish: "Τέλος", cancel: "Ακύρωση", removeLastVertex: "Κατάργηση τελευταίου σημείου" }, buttonTitles: { drawMarkerButton: "Σχεδίαση Δείκτη", drawPolyButton: "Σχεδίαση Πολυγώνου", drawLineButton: "Σχεδίαση Γραμμής", drawCircleButton: "Σχεδίαση Κύκλου", drawRectButton: "Σχεδίαση Ορθογωνίου", editButton: "Επεξεργασία Επιπέδων", dragButton: "Μεταφορά Επιπέδων", cutButton: "Αποκοπή Επιπέδων", deleteButton: "Κατάργηση Επιπέδων", drawCircleMarkerButton: "Σχεδίαση Κυκλικού Δείκτη", snappingButton: "Προσκόλληση του Δείκτη μεταφοράς σε άλλα Επίπεδα και Κορυφές", pinningButton: "Περικοπή κοινών κορυφών μαζί", rotateButton: "Περιστρέψτε το στρώμα" } }, zn = { tooltips: { placeMarker: "Kattintson a jelölő elhelyezéséhez", placeMarkerTouch: "Érintse meg a térképet a jelölő elhelyezéséhez", firstVertex: "Kattintson az első pont elhelyezéséhez", continueLine: "Kattintson a következő pont elhelyezéséhez", finishLine: "A befejezéshez kattintson egy meglévő pontra", finishPoly: "A befejezéshez kattintson az első pontra", finishRect: "Kattintson a befejezéshez", startCircle: "Kattintson a kör középpontjának elhelyezéséhez", finishCircle: "Kattintson a kör befejezéséhez", placeCircleMarker: "Kattintson a körjelölő elhelyezéséhez" }, actions: { finish: "Befejezés", cancel: "Mégse", removeLastVertex: "Utolsó pont eltávolítása" }, buttonTitles: { drawMarkerButton: "Jelölő rajzolása", drawPolyButton: "Poligon rajzolása", drawLineButton: "Vonal rajzolása", drawCircleButton: "Kör rajzolása", drawRectButton: "Négyzet rajzolása", editButton: "Elemek szerkesztése", dragButton: "Elemek mozgatása", cutButton: "Elemek vágása", deleteButton: "Elemek törlése", drawCircleMarkerButton: "Kör jelölő rajzolása", snappingButton: "Kapcsolja a jelöltőt másik elemhez vagy ponthoz", pinningButton: "Közös pontok összekötése", rotateButton: "Fólia elforgatása" } }, $r = { tooltips: { placeMarker: "Tryk for at placere en markør", placeMarkerTouch: "Tryk på kortet for at placere en markør", firstVertex: "Tryk for at placere det første punkt", continueLine: "Tryk for at fortsætte linjen", finishLine: "Tryk på et eksisterende punkt for at afslutte", finishPoly: "Tryk på det første punkt for at afslutte", finishRect: "Tryk for at afslutte", startCircle: "Tryk for at placere cirklens center", finishCircle: "Tryk for at afslutte cirklen", placeCircleMarker: "Tryk for at placere en cirkelmarkør" }, actions: { finish: "Afslut", cancel: "Afbryd", removeLastVertex: "Fjern sidste punkt" }, buttonTitles: { drawMarkerButton: "Placer markør", drawPolyButton: "Tegn polygon", drawLineButton: "Tegn linje", drawCircleButton: "Tegn cirkel", drawRectButton: "Tegn firkant", editButton: "Rediger", dragButton: "Træk", cutButton: "Klip", deleteButton: "Fjern", drawCircleMarkerButton: "Tegn cirkelmarkør", snappingButton: "Fastgør trukket markør til andre elementer", pinningButton: "Sammenlæg delte elementer", rotateButton: "Roter laget" } }, Ur = { tooltips: { placeMarker: "Klikk for å plassere punkt", placeMarkerTouch: "Trykk på kartet for å plassere et punkt", firstVertex: "Klikk for å plassere første punkt", continueLine: "Klikk for å tegne videre", finishLine: "Klikk på et eksisterende punkt for å fullføre", finishPoly: "Klikk første punkt for å fullføre", finishRect: "Klikk for å fullføre", startCircle: "Klikk for å sette sirkel midtpunkt", finishCircle: "Klikk for å fullføre sirkel", placeCircleMarker: "Klikk for å plassere sirkel", placeText: "Klikk for å plassere tekst" }, actions: { finish: "Fullfør", cancel: "Kanseller", removeLastVertex: "Fjern forrige punkt" }, buttonTitles: { drawMarkerButton: "Tegn punkt", drawPolyButton: "Tegn flate", drawLineButton: "Tegn linje", drawCircleButton: "Tegn sirkel", drawRectButton: "Tegn rektangel", editButton: "Rediger objekter", dragButton: "Dra objekter", cutButton: "Kutt objekter", deleteButton: "Fjern objekter", drawCircleMarkerButton: "Tegn sirkel-punkt", snappingButton: "Fest dratt punkt til andre objekter og punkt", pinningButton: "Pin delte punkter sammen", rotateButton: "Rotér objekter", drawTextButton: "Tegn tekst", scaleButton: "Skalér objekter", autoTracingButton: "Automatisk sporing av linje" }, measurements: { totalLength: "Lengde", segmentLength: "Segmentlengde", area: "Område", radius: "Radius", perimeter: "Omriss", height: "Høyde", width: "Bredde", coordinates: "Posisjon", coordinatesMarker: "Posisjonsmarkør" } }, or = { tooltips: { placeMarker: "کلیک برای جانمایی نشان", placeMarkerTouch: "روی نقشه ضربه بزنید تا نشان بگذارید", firstVertex: "کلیک برای رسم اولین رأس", continueLine: "کلیک برای ادامه رسم", finishLine: "کلیک روی هر نشان موجود برای پایان", finishPoly: "کلیک روی اولین نشان برای پایان", finishRect: "کلیک برای پایان", startCircle: "کلیک برای رسم مرکز دایره", finishCircle: "کلیک برای پایان رسم دایره", placeCircleMarker: "کلیک برای رسم نشان دایره", placeText: "کلیک برای نوشتن متن" }, actions: { finish: "پایان", cancel: "لفو", removeLastVertex: "حذف آخرین رأس" }, buttonTitles: { drawMarkerButton: "درج نشان", drawPolyButton: "رسم چندضلعی", drawLineButton: "رسم خط", drawCircleButton: "رسم دایره", drawRectButton: "رسم چهارضلعی", editButton: "ویرایش لایه‌ها", dragButton: "جابجایی لایه‌ها", cutButton: "برش لایه‌ها", deleteButton: "حذف لایه‌ها", drawCircleMarkerButton: "رسم نشان دایره", snappingButton: "نشانگر را به لایه‌ها و رئوس دیگر بکشید", pinningButton: "رئوس مشترک را با هم پین کنید", rotateButton: "چرخش لایه", drawTextButton: "رسم متن", scaleButton: "مقیاس‌گذاری", autoTracingButton: "ردیاب خودکار" }, measurements: { totalLength: "طول", segmentLength: "طول بخش", area: "ناحیه", radius: "شعاع", perimeter: "محیط", height: "ارتفاع", width: "عرض", coordinates: "موقعیت", coordinatesMarker: "موقعیت نشان" } }, Gr = { tooltips: { placeMarker: "Натисніть, щоб нанести маркер", placeMarkerTouch: "Торкніться карти, щоб розмістити маркер", firstVertex: "Натисніть, щоб нанести першу вершину", continueLine: "Натисніть, щоб продовжити малювати", finishLine: "Натисніть будь-який існуючий маркер для завершення", finishPoly: "Виберіть перший маркер, щоб завершити", finishRect: "Натисніть, щоб завершити", startCircle: "Натисніть, щоб додати центр кола", finishCircle: "Натисніть, щоб завершити коло", placeCircleMarker: "Натисніть, щоб нанести круговий маркер" }, actions: { finish: "Завершити", cancel: "Відмінити", removeLastVertex: "Видалити попередню вершину" }, buttonTitles: { drawMarkerButton: "Малювати маркер", drawPolyButton: "Малювати полігон", drawLineButton: "Малювати криву", drawCircleButton: "Малювати коло", drawRectButton: "Малювати прямокутник", editButton: "Редагувати шари", dragButton: "Перенести шари", cutButton: "Вирізати шари", deleteButton: "Видалити шари", drawCircleMarkerButton: "Малювати круговий маркер", snappingButton: "Прив’язати перетягнутий маркер до інших шарів та вершин", pinningButton: "Зв'язати спільні вершини разом", rotateButton: "Повернути шар" } }, Zr = { tooltips: { placeMarker: "İşaretçi yerleştirmek için tıklayın", placeMarkerTouch: "İşaretçi yerleştirmek için haritaya dokunun", firstVertex: "İlk tepe noktasını yerleştirmek için tıklayın", continueLine: "Çizime devam etmek için tıklayın", finishLine: "Bitirmek için mevcut herhangi bir işaretçiyi tıklayın", finishPoly: "Bitirmek için ilk işaretçiyi tıklayın", finishRect: "Bitirmek için tıklayın", startCircle: "Daire merkezine yerleştirmek için tıklayın", finishCircle: "Daireyi bitirmek için tıklayın", placeCircleMarker: "Daire işaretçisi yerleştirmek için tıklayın" }, actions: { finish: "Bitir", cancel: "İptal", removeLastVertex: "Son köşeyi kaldır" }, buttonTitles: { drawMarkerButton: "Çizim İşaretçisi", drawPolyButton: "Çokgenler çiz", drawLineButton: "Çoklu çizgi çiz", drawCircleButton: "Çember çiz", drawRectButton: "Dikdörtgen çiz", editButton: "Katmanları düzenle", dragButton: "Katmanları sürükle", cutButton: "Katmanları kes", deleteButton: "Katmanları kaldır", drawCircleMarkerButton: "Daire işaretçisi çiz", snappingButton: "Sürüklenen işaretçiyi diğer katmanlara ve köşelere yapıştır", pinningButton: "Paylaşılan köşeleri birbirine sabitle", rotateButton: "Katmanı döndür" } }, lr = { tooltips: { placeMarker: "Kliknutím vytvoříte značku", placeMarkerTouch: "Klepnutím na mapu umístíte značku", firstVertex: "Kliknutím vytvoříte první objekt", continueLine: "Kliknutím pokračujte v kreslení", finishLine: "Kliknutí na libovolnou existující značku pro dokončení", finishPoly: "Vyberte první bod pro dokončení", finishRect: "Klikněte pro dokončení", startCircle: "Kliknutím přidejte střed kruhu", finishCircle: "Нажмите, чтобы задать радиус", placeCircleMarker: "Kliknutím nastavte poloměr" }, actions: { finish: "Dokončit", cancel: "Zrušit", removeLastVertex: "Zrušit poslední akci" }, buttonTitles: { drawMarkerButton: "Přidat značku", drawPolyButton: "Nakreslit polygon", drawLineButton: "Nakreslit křivku", drawCircleButton: "Nakreslit kruh", drawRectButton: "Nakreslit obdélník", editButton: "Upravit vrstvu", dragButton: "Přeneste vrstvu", cutButton: "Vyjmout vrstvu", deleteButton: "Smazat vrstvu", drawCircleMarkerButton: "Přidat kruhovou značku", snappingButton: "Navázat tažnou značku k dalším vrstvám a vrcholům", pinningButton: "Spojit společné body dohromady", rotateButton: "Otočte vrstvu" } }, Ka = { tooltips: { placeMarker: "クリックしてマーカーを配置", placeMarkerTouch: "地図をタップしてマーカーを配置", firstVertex: "クリックして最初の頂点を配置", continueLine: "クリックして描画を続ける", finishLine: "任意のマーカーをクリックして終了", finishPoly: "最初のマーカーをクリックして終了", finishRect: "クリックして終了", startCircle: "クリックして円の中心を配置", finishCircle: "クリックして円の描画を終了", placeCircleMarker: "クリックして円マーカーを配置", placeText: "クリックしてテキストを配置" }, actions: { finish: "終了", cancel: "キャンセル", removeLastVertex: "最後の頂点を削除" }, buttonTitles: { drawMarkerButton: "マーカーを描画", drawPolyButton: "ポリゴンを描画", drawLineButton: "折れ線を描画", drawCircleButton: "円を描画", drawRectButton: "矩形を描画", editButton: "レイヤーを編集", dragButton: "レイヤーをドラッグ", cutButton: "レイヤーを切り取り", deleteButton: "レイヤーを削除", drawCircleMarkerButton: "円マーカーを描画", snappingButton: "ドラッグしたマーカーを他のレイヤーや頂点にスナップする", pinningButton: "共有する頂点を同時に動かす", rotateButton: "レイヤーを回転", drawTextButton: "テキストを描画" } }, qr = { tooltips: { placeMarker: "Klikkaa asettaaksesi merkin", placeMarkerTouch: "Napauta karttaa asettaaksesi merkin", firstVertex: "Klikkaa asettaakseni ensimmäisen osuuden", continueLine: "Klikkaa jatkaaksesi piirtämistä", finishLine: "Klikkaa olemassa olevaa merkkiä lopettaaksesi", finishPoly: "Klikkaa ensimmäistä merkkiä lopettaaksesi", finishRect: "Klikkaa lopettaaksesi", startCircle: "Klikkaa asettaaksesi ympyrän keskipisteen", finishCircle: "Klikkaa lopettaaksesi ympyrän", placeCircleMarker: "Klikkaa asettaaksesi ympyrämerkin", placeText: "Klikkaa asettaaksesi tekstin" }, actions: { finish: "Valmis", cancel: "Peruuta", removeLastVertex: "Poista viimeinen osuus" }, buttonTitles: { drawMarkerButton: "Piirrä merkkejä", drawPolyButton: "Piirrä monikulmioita", drawLineButton: "Piirrä viivoja", drawCircleButton: "Piirrä ympyrä", drawRectButton: "Piirrä neliskulmioita", editButton: "Muokkaa", dragButton: "Siirrä", cutButton: "Leikkaa", deleteButton: "Poista", drawCircleMarkerButton: "Piirrä ympyrämerkki", snappingButton: "Kiinnitä siirrettävä merkki toisiin muotoihin", pinningButton: "Kiinnitä jaetut muodot yhteen", rotateButton: "Käännä", drawTextButton: "Piirrä tekstiä" } }, ho = { tooltips: { placeMarker: "마커 위치를 클릭하세요", placeMarkerTouch: "지도를 탭하여 마커를 배치하세요", firstVertex: "첫번째 꼭지점 위치을 클릭하세요", continueLine: "계속 그리려면 클릭하세요", finishLine: "끝내려면 기존 마커를 클릭하세요", finishPoly: "끝내려면 처음 마커를 클릭하세요", finishRect: "끝내려면 클릭하세요", startCircle: "원의 중심이 될 위치를 클릭하세요", finishCircle: "원을 끝내려면 클릭하세요", placeCircleMarker: "원 마커 위치를 클릭하세요", placeText: "텍스트 위치를 클릭하세요" }, actions: { finish: "끝내기", cancel: "취소", removeLastVertex: "마지막 꼭지점 제거" }, buttonTitles: { drawMarkerButton: "마커 그리기", drawPolyButton: "다각형 그리기", drawLineButton: "다각선 그리기", drawCircleButton: "원 그리기", drawRectButton: "직사각형 그리기", editButton: "레이어 편집하기", dragButton: "레이어 끌기", cutButton: "레이어 자르기", deleteButton: "레이어 제거하기", drawCircleMarkerButton: "원 마커 그리기", snappingButton: "잡아끈 마커를 다른 레이어 및 꼭지점에 들러붙게 하기", pinningButton: "공유 꼭지점을 함께 찍기", rotateButton: "레이어 회전하기", drawTextButton: "텍스트 그리기" } }, Qt = { tooltips: { placeMarker: "Маркерди жайгаштыруу үчүн басыңыз", placeMarkerTouch: "Маркерди жайгаштыруу үчүн картага тийиңиз", firstVertex: "Биринчи чокуну жайгаштырууну үчүн басыңыз", continueLine: "Сүрөт тартууну улантуу үчүн басыңыз", finishLine: "Аяктоо үчүн учурдагы маркерди басыңыз", finishPoly: "Бүтүрүү үчүн биринчи маркерди басыңыз", finishRect: "Бүтүрүү үчүн басыңыз", startCircle: "Айлананын борборун жайгаштырууну үчүн басыңыз", finishCircle: "Айлананы бүтүрүү үчүн басыңыз", placeCircleMarker: "Тегерек маркерди жайгаштыруу үчүн басыңыз", placeText: "Текстти жайгаштыруу үчүн басыңыз" }, actions: { finish: "Аягы", cancel: "Жок кылуу", removeLastVertex: "Акыркы чокуну өчүрүү" }, buttonTitles: { drawMarkerButton: "Маркерди чизуу", drawPolyButton: "Полигон чизуу", drawLineButton: "Полилиния чизуу", drawCircleButton: "Дайынды чизуу", drawRectButton: "Прямоугольник чизуу", editButton: "Слоопту түзөтүү", dragButton: "Слоопту карап сүйлөү", cutButton: "Слооптун башын кесүү", deleteButton: "Слооптун өчүрүү", drawCircleMarkerButton: "Дайынды маркерди чизуу", snappingButton: "Башка слооптордун жана вертекстердин арасына чекилдөө", pinningButton: "Бөлүшкөн вертекстерди бирге тутуштуруу", rotateButton: "Слооптун өзгөртүү", drawTextButton: "Текст чизуу", scaleButton: "Слооптун өлчөмүн өзгөртүү", autoTracingButton: "Автоматтык тизмеги чизуу" }, measurements: { totalLength: "Узундук", segmentLength: "Сегмент узундугу", area: "Аймак", radius: "Радиус", perimeter: "Периметр", height: "Диаметр", width: "Кенчилик", coordinates: "Координаттар", coordinatesMarker: "Маркердин координаттары" } }, gi = $i, pe = { en: _n, de: gn, it: Nr, id: ie, ro: Ee, ru: jr, es: ar, nl: ri, fr: uo, pt: gi, pt_br: Be, pt_pt: $i, zh: sr, zh_tw: Qi, pl: Fn, sv: Rn, el: Vr, hu: zn, da: $r, no: Ur, fa: or, ua: Gr, tr: Zr, cz: lr, ja: Ka, fi: qr, ko: ho, ky: Qt }, Wa = { _globalEditModeEnabled: !1, enableGlobalEditMode(e) {
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
  } }, Hr = Wa, Kr = { _globalDragModeEnabled: !1, enableGlobalDragMode() {
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
  } }, Wr = Kr, tn = { _globalRemovalModeEnabled: !1, enableGlobalRemovalMode() {
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
  } }, Jr = tn, Nn = { _globalRotateModeEnabled: !1, enableGlobalRotateMode() {
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
  } }, Ie = Nn, en = w(nr()), Ja = { _fireDrawStart(e = "Draw", i = {}) {
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
    r = (0, en.default)(r, o, { source: a }), L.PM.Utils._fireEvent(e, i, r);
  } }, jn = Ja, co = () => ({ _lastEvents: { keydown: void 0, keyup: void 0, current: void 0 }, _initKeyListener(e) {
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
  } }), Xa = co, ur = w(Vi());
  function he(e) {
    let i = L.PM.activeLang;
    return (0, ur.default)(pe[i], e) || (0, ur.default)(pe.en, e) || e;
  }
  function Ya() {
    return window.matchMedia ? !window.matchMedia("(pointer: coarse)").matches : !0;
  }
  function ae(e) {
    for (let i = 0; i < e.length; i += 1) {
      let r = e[i];
      if (Array.isArray(r)) {
        if (ae(r)) return !0;
      } else if (r != null && r !== "") return !0;
    }
    return !1;
  }
  function hr(e) {
    return e.reduce((i, r) => {
      if (r.length !== 0) {
        let a = Array.isArray(r) ? hr(r) : r;
        Array.isArray(a) ? a.length !== 0 && i.push(a) : i.push(a);
      }
      return i;
    }, []);
  }
  function di(e, i, r) {
    let a = { a: L.CRS.Earth.R, b: 63567523142e-4, f: 0.0033528106647474805 }, { a: o, b: h, f } = a, _ = e.lng, k = e.lat, C = r, z = Math.PI, O = i * z / 180, K = Math.sin(O), tt = Math.cos(O), ft = (1 - f) * Math.tan(k * z / 180), yt = 1 / Math.sqrt(1 + ft * ft), kt = ft * yt, Dt = Math.atan2(ft, tt), F = yt * K, nt = 1 - F * F, dt = nt * (o * o - h * h) / (h * h), wt = 1 + dt / 16384 * (4096 + dt * (-768 + dt * (320 - 175 * dt))), xt = dt / 1024 * (256 + dt * (-128 + dt * (74 - 47 * dt))), Lt = C / (h * wt), S = 2 * Math.PI, D, I, W;
    for (; Math.abs(Lt - S) > 1e-12; ) {
      D = Math.cos(2 * Dt + Lt), I = Math.sin(Lt), W = Math.cos(Lt);
      let _t = xt * I * (D + xt / 4 * (W * (-1 + 2 * D * D) - xt / 6 * D * (-3 + 4 * I * I) * (-3 + 4 * D * D)));
      S = Lt, Lt = C / (h * wt) + _t;
    }
    let H = kt * I - yt * W * tt, U = Math.atan2(kt * W + yt * I * tt, (1 - f) * Math.sqrt(F * F + H * H)), it = Math.atan2(I * K, yt * W - kt * I * tt), J = f / 16 * nt * (4 + f * (4 - 3 * nt)), et = it - (1 - J) * f * F * (Lt + J * I * (D + J * W * (-1 + 2 * D * D))), st = _ + et * 180 / z, at = U * 180 / z;
    return L.latLng(st, at);
  }
  function yn(e, i, r, a, o = !0) {
    let h, f, _, k = [];
    for (let C = 0; C < r; C += 1) {
      if (o) h = C * 360 / r + a, f = di(e, h, i), _ = L.latLng(f.lng, f.lat);
      else {
        let z = e.lat + Math.cos(2 * C * Math.PI / r) * i, O = e.lng + Math.sin(2 * C * Math.PI / r) * i;
        _ = L.latLng(z, O);
      }
      k.push(_);
    }
    return k;
  }
  function Qa(e, i, r) {
    i = (i + 360) % 360;
    let a = Math.PI / 180, o = 180 / Math.PI, { R: h } = L.CRS.Earth, f = e.lng * a, _ = e.lat * a, k = i * a, C = Math.sin(_), z = Math.cos(_), O = Math.cos(r / h), K = Math.sin(r / h), tt = Math.asin(C * O + z * K * Math.cos(k)), ft = f + Math.atan2(Math.sin(k) * K * z, O - C * Math.sin(tt));
    ft *= o;
    let yt = ft - 360, kt = ft < -180 ? ft + 360 : ft;
    return ft = ft > 180 ? yt : kt, L.latLng([tt * o, ft]);
  }
  function Xr(e, i, r) {
    let a = e.latLngToContainerPoint(i), o = e.latLngToContainerPoint(r), h = Math.atan2(o.y - a.y, o.x - a.x) * 180 / Math.PI + 90;
    return h += h < 0 ? 360 : 0, h;
  }
  function vn(e, i, r, a) {
    let o = Xr(e, i, r);
    return Qa(i, o, a);
  }
  function fo(e, i, r = "asc") {
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
      let z, O;
      if (z = _(k.layer).toLowerCase(), O = _(C.layer).toLowerCase(), !z || !O) return 0;
      let K = z in f ? f[z] : Number.MAX_SAFE_INTEGER, tt = O in f ? f[O] : Number.MAX_SAFE_INTEGER, ft = 0;
      return K < tt ? ft = -1 : K > tt && (ft = 1), r === "desc" ? ft * -1 : ft;
    };
  }
  function Ai(e, i = e.getLatLngs()) {
    return e instanceof L.Polygon ? L.polygon(i).getLatLngs() : L.polyline(i).getLatLngs();
  }
  function ts(e, i) {
    var r, a, o, h;
    if ((a = (r = i.options.crs) == null ? void 0 : r.projection) != null && a.MAX_LATITUDE) {
      let f = (h = (o = i.options.crs) == null ? void 0 : o.projection) == null ? void 0 : h.MAX_LATITUDE;
      e.lat = Math.max(Math.min(f, e.lat), -f);
    }
    return e;
  }
  function bn(e) {
    return e.options.renderer || e._map && (e._map._getPaneRenderer(e.options.pane) || e._map.options.renderer || e._map._renderer) || e._renderer;
  }
  function Yr(e, i) {
    if (e = e.trim().toLowerCase(), i[e]) return e;
    let r = e.replace(/[-_\s]/g, "_").match(/^([a-z]{2,3})(?:_([a-z]{2,3}))?$/);
    if (r) {
      let a = [];
      r[2] && a.push(`${r[1]}_${r[2]}`), a.push(r[1]);
      for (let o of a) if (i[o]) return o;
    }
    return e;
  }
  var po = L.Class.extend({ includes: [Hr, Wr, Jr, Ie, jn], initialize(e) {
    this.map = e, this.Draw = new L.PM.Draw(e), this.Toolbar = new L.PM.Toolbar(e), this.Keyboard = Xa(), this.globalOptions = { snappable: !0, layerGroup: void 0, snappingOrder: ["Marker", "CircleMarker", "Circle", "Line", "Polygon", "Rectangle"], panes: { vertexPane: "markerPane", layerPane: "overlayPane", markerPane: "markerPane" }, draggable: !0, exitModeOnEscape: !1, finishOnEnter: !1 }, this.Keyboard._initKeyListener(e);
  }, setLang(e = "en", i, r = "en") {
    e = Yr(e, pe);
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
    bn(this.map)._onMouseMove(this._createMouseEvent("mousemove", e));
  }, _canvasTouchClick(e) {
    let i = "";
    e.type === "touchstart" || e.type === "pointerdown" ? i = "mousedown" : (e.type === "touchend" || e.type === "pointerup" || e.type === "touchcancel" || e.type === "pointercancel") && (i = "mouseup"), i && bn(this.map)._onClick(this._createMouseEvent(i, e));
  }, _createMouseEvent(e, i) {
    let r, a = i.touches[0] || i.changedTouches[0];
    try {
      r = new MouseEvent(e, { bubbles: i.bubbles, cancelable: i.cancelable, view: i.view, detail: a.detail, screenX: a.screenX, screenY: a.screenY, clientX: a.clientX, clientY: a.clientY, ctrlKey: i.ctrlKey, altKey: i.altKey, shiftKey: i.shiftKey, metaKey: i.metaKey, button: i.button, relatedTarget: i.relatedTarget });
    } catch {
      r = document.createEvent("MouseEvents"), r.initMouseEvent(e, i.bubbles, i.cancelable, i.view, a.detail, a.screenX, a.screenY, a.clientX, a.clientY, i.ctrlKey, i.altKey, i.shiftKey, i.metaKey, i.button, i.relatedTarget);
    }
    return r;
  } }), yi = po, mo = L.Control.extend({ includes: [jn], options: { position: "topleft", disableByOtherButtons: !0 }, initialize(e) {
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
    let o = L.DomUtil.create("div", `leaflet-pm-actions-container ${i}`, r), h = e.actions, f = { cancel: { text: he("actions.cancel"), title: he("actions.cancel"), onClick() {
      this._triggerClick();
    } }, finishMode: { text: he("actions.finish"), title: he("actions.finish"), onClick() {
      this._triggerClick();
    } }, removeLastVertex: { text: he("actions.removeLastVertex"), title: he("actions.removeLastVertex"), onClick() {
      this._map.pm.Draw[e.jsClass]._removeLastVertex();
    } }, finish: { text: he("actions.finish"), title: he("actions.finish"), onClick(k) {
      this._map.pm.Draw[e.jsClass]._finishShape(k);
    } } };
    e._preparedActions = h.map((k) => {
      let C = typeof k == "string" ? k : k.name, z;
      if (f[C]) z = f[C];
      else if (k.text) z = k;
      else return z;
      let O = L.DomUtil.create("a", `leaflet-pm-action ${i} action-${C}`, o);
      if (O.setAttribute("role", "button"), O.setAttribute("tabindex", "0"), O.href = "#", z.title && (O.title = z.title), O.innerHTML = z.text, L.DomEvent.disableClickPropagation(O), L.DomEvent.on(O, "click", L.DomEvent.stop), z._node = O, !e.disabled && z.onClick) {
        let K = (tt) => {
          tt.preventDefault();
          let ft = "", { buttons: yt } = this._map.pm.Toolbar;
          for (let kt in yt) if (yt[kt]._button === e) {
            ft = kt;
            break;
          }
          this._fireActionClick(z, ft, e);
        };
        L.DomEvent.addListener(O, "click", K, this), L.DomEvent.addListener(O, "click", z.onClick, this), L.DomEvent.addListener(O, "click", () => this._updateActiveAction(e));
      }
      return z;
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
  } }), es = mo;
  L.Control.PMButton = es;
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
    let e = { className: "control-icon leaflet-pm-icon-marker", title: he("buttonTitles.drawMarkerButton"), jsClass: "Marker", onClick: () => {
    }, afterClick: (K, tt) => {
      this.map.pm.Draw[tt.button._button.jsClass].toggle();
    }, doToggle: !0, toggleStatus: !1, disableOtherButtons: !0, position: this.options.position, actions: ["cancel"] }, i = { title: he("buttonTitles.drawPolyButton"), className: "control-icon leaflet-pm-icon-polygon", jsClass: "Polygon", onClick: () => {
    }, afterClick: (K, tt) => {
      this.map.pm.Draw[tt.button._button.jsClass].toggle();
    }, doToggle: !0, toggleStatus: !1, disableOtherButtons: !0, position: this.options.position, actions: ["finish", "removeLastVertex", "cancel"] }, r = { className: "control-icon leaflet-pm-icon-polyline", title: he("buttonTitles.drawLineButton"), jsClass: "Line", onClick: () => {
    }, afterClick: (K, tt) => {
      this.map.pm.Draw[tt.button._button.jsClass].toggle();
    }, doToggle: !0, toggleStatus: !1, disableOtherButtons: !0, position: this.options.position, actions: ["finish", "removeLastVertex", "cancel"] }, a = { title: he("buttonTitles.drawCircleButton"), className: "control-icon leaflet-pm-icon-circle", jsClass: "Circle", onClick: () => {
    }, afterClick: (K, tt) => {
      this.map.pm.Draw[tt.button._button.jsClass].toggle();
    }, doToggle: !0, toggleStatus: !1, disableOtherButtons: !0, position: this.options.position, actions: ["cancel"] }, o = { title: he("buttonTitles.drawCircleMarkerButton"), className: "control-icon leaflet-pm-icon-circle-marker", jsClass: "CircleMarker", onClick: () => {
    }, afterClick: (K, tt) => {
      this.map.pm.Draw[tt.button._button.jsClass].toggle();
    }, doToggle: !0, toggleStatus: !1, disableOtherButtons: !0, position: this.options.position, actions: ["cancel"] }, h = { title: he("buttonTitles.drawRectButton"), className: "control-icon leaflet-pm-icon-rectangle", jsClass: "Rectangle", onClick: () => {
    }, afterClick: (K, tt) => {
      this.map.pm.Draw[tt.button._button.jsClass].toggle();
    }, doToggle: !0, toggleStatus: !1, disableOtherButtons: !0, position: this.options.position, actions: ["cancel"] }, f = { title: he("buttonTitles.editButton"), className: "control-icon leaflet-pm-icon-edit", onClick: () => {
    }, afterClick: () => {
      this.map.pm.toggleGlobalEditMode();
    }, doToggle: !0, toggleStatus: !1, disableOtherButtons: !0, position: this.options.position, tool: "edit", actions: ["finishMode"] }, _ = { title: he("buttonTitles.dragButton"), className: "control-icon leaflet-pm-icon-drag", onClick: () => {
    }, afterClick: () => {
      this.map.pm.toggleGlobalDragMode();
    }, doToggle: !0, toggleStatus: !1, disableOtherButtons: !0, position: this.options.position, tool: "edit", actions: ["finishMode"] }, k = { title: he("buttonTitles.cutButton"), className: "control-icon leaflet-pm-icon-cut", jsClass: "Cut", onClick: () => {
    }, afterClick: (K, tt) => {
      this.map.pm.Draw[tt.button._button.jsClass].toggle({ snappable: !0, cursorMarker: !0, allowSelfIntersection: !1 });
    }, doToggle: !0, toggleStatus: !1, disableOtherButtons: !0, position: this.options.position, tool: "edit", actions: ["finish", "removeLastVertex", "cancel"] }, C = { title: he("buttonTitles.deleteButton"), className: "control-icon leaflet-pm-icon-delete", onClick: () => {
    }, afterClick: () => {
      this.map.pm.toggleGlobalRemovalMode();
    }, doToggle: !0, toggleStatus: !1, disableOtherButtons: !0, position: this.options.position, tool: "edit", actions: ["finishMode"] }, z = { title: he("buttonTitles.rotateButton"), className: "control-icon leaflet-pm-icon-rotate", onClick: () => {
    }, afterClick: () => {
      this.map.pm.toggleGlobalRotateMode();
    }, doToggle: !0, toggleStatus: !1, disableOtherButtons: !0, position: this.options.position, tool: "edit", actions: ["finishMode"] }, O = { className: "control-icon leaflet-pm-icon-text", title: he("buttonTitles.drawTextButton"), jsClass: "Text", onClick: () => {
    }, afterClick: (K, tt) => {
      this.map.pm.Draw[tt.button._button.jsClass].toggle();
    }, doToggle: !0, toggleStatus: !1, disableOtherButtons: !0, position: this.options.position, actions: ["cancel"] };
    this._addButton("drawMarker", new L.Control.PMButton(e)), this._addButton("drawPolyline", new L.Control.PMButton(r)), this._addButton("drawRectangle", new L.Control.PMButton(h)), this._addButton("drawPolygon", new L.Control.PMButton(i)), this._addButton("drawCircle", new L.Control.PMButton(a)), this._addButton("drawCircleMarker", new L.Control.PMButton(o)), this._addButton("drawText", new L.Control.PMButton(O)), this._addButton("editMode", new L.Control.PMButton(f)), this._addButton("dragMode", new L.Control.PMButton(_)), this._addButton("cutPolygon", new L.Control.PMButton(k)), this._addButton("removalMode", new L.Control.PMButton(C)), this._addButton("rotateMode", new L.Control.PMButton(z));
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
  } }), is = Ui, ns = w(nr()), Qr = { _initSnappableMarkers() {
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
    var C, z, O;
    let r = e.target;
    if (r._snapped = !1, this.throttledList || (this.throttledList = L.Util.throttle(this._handleThrottleSnapping, 100, this)), ((C = e == null ? void 0 : e.originalEvent) == null ? void 0 : C.altKey) || ((O = (z = this._map) == null ? void 0 : z.pm) == null ? void 0 : O.Keyboard.isAltKeyPressed())) return !1;
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
      }, tt = this._snapLatLng || {}, ft = f || {};
      (tt.lat !== ft.lat || tt.lng !== ft.lng) && K();
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
    }), e = e.filter((a) => this._layer !== a), e = e.filter((a) => a._latlng || a._latlngs && ae(a._latlngs)), e = e.filter((a) => !a._pmTempLayer), this._otherSnapLayers ? (this._otherSnapLayers.forEach(() => {
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
          let z = L.polyline([], { color: "red", pmIgnore: !0 });
          z._pmTempLayer = !0, this.debugIndicatorLines[_] = z;
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
      k.forEach((C, z) => {
        if (Array.isArray(C)) {
          _(C);
          return;
        }
        if (this.options.snapSegment) {
          let O = C, K;
          a ? K = z + 1 === k.length ? 0 : z + 1 : K = z + 1 === k.length ? void 0 : z + 1;
          let tt = k[K];
          if (tt) {
            let ft = this._getDistanceToSegment(r, e, O, tt);
            (h === void 0 || ft < h) && (h = ft, f = [O, tt]);
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
    }), e.sort(fo("instanceofShape", h)), i === 1 ? e[0] || {} : e.slice(0, i);
  }, _checkPrioritiySnapping(e) {
    let i = this._map, r = e.segment[0], a = e.segment[1], o = e.latlng, h = o;
    if (this.options.snapVertex) {
      let f = this._getDistance(i, r, o), _ = this._getDistance(i, a, o), k = f < _ ? r : a, C = f < _ ? f : _;
      if (this.options.snapMiddle) {
        let O = L.PM.Utils.calcMiddleLatLng(i, r, a), K = this._getDistance(i, O, o);
        K < f && K < _ && (k = O, C = K);
      }
      let z = this.options.snapDistance;
      C < z && (h = k);
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
  } }, rs = Qr, as = L.Class.extend({ includes: [rs, jn], options: { snappable: !0, snapDistance: 20, snapMiddle: !1, allowSelfIntersection: !0, tooltips: !0, templineStyle: {}, hintlineStyle: { color: "#3388ff", dashArray: "5,5" }, pathOptions: null, cursorMarker: !0, finishOn: null, markerStyle: { draggable: !0, icon: L.icon() }, hideMiddleMarkers: !1, minRadiusCircle: null, maxRadiusCircle: null, minRadiusCircleMarker: null, maxRadiusCircleMarker: null, resizeableCircleMarker: !1, resizeableCircle: !0, markerEditable: !0, continueDrawing: !1, snapSegment: !0, requireSnapToFinish: !1, rectangleAngle: 0, textOptions: { text: null, focusAfterDraw: null, removeIfEmpty: null, className: null }, snapVertex: !0 }, setOptions(e) {
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
    i ? this.options.pathOptions = (0, ns.default)(this.options.pathOptions, e) : this.options.pathOptions = e;
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
  } }), Te = as;
  Te.Marker = Te.extend({ initialize(e) {
    this._map = e, this._shape = "Marker", this.toolbarButtonName = "drawMarker", this._layerIsDragging = !1;
  }, enable(e) {
    L.Util.setOptions(this, e), this._enabled = !0, this._isTouchDevice = !Ya(), this._map.getContainer().classList.add("geoman-draw-cursor"), this._map.on("click", this._createMarker, this), this._map.pm.Toolbar.toggleButton(this.toolbarButtonName, !0), this._isTouchDevice ? (this._createTouchHint(), this._hintMarker = L.marker(this._map.getCenter(), { ...this.options.markerStyle, opacity: 0, interactive: !1 }), this._setPane(this._hintMarker, "markerPane"), this._hintMarker._pmTempLayer = !0) : (this._hintMarker = L.marker(this._map.getCenter(), this.options.markerStyle), this._setPane(this._hintMarker, "markerPane"), this._hintMarker._pmTempLayer = !0, this._hintMarker.addTo(this._map), this.options.tooltips && this._hintMarker.bindTooltip(he("tooltips.placeMarker"), { permanent: !0, offset: L.point(0, 10), direction: "bottom", opacity: 0.8 }).openTooltip(), this._map.on("mousemove", this._syncHintMarker, this)), this._layer = this._hintMarker, this.options.markerEditable && this._map.eachLayer((i) => {
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
    this.options.tooltips && (this._touchHint = L.DomUtil.create("div", "leaflet-pm-touch-hint"), this._touchHint.textContent = he("tooltips.placeMarkerTouch"), this._map.getContainer().appendChild(this._touchHint));
  }, _removeTouchHint() {
    this._touchHint && this._touchHint.parentNode && (this._touchHint.parentNode.removeChild(this._touchHint), this._touchHint = null);
  } });
  var ei = 63710088e-1, _o = { centimeters: ei * 100, centimetres: ei * 100, degrees: 360 / (2 * Math.PI), feet: ei * 3.28084, inches: ei * 39.37, kilometers: ei / 1e3, kilometres: ei / 1e3, meters: ei, metres: ei, miles: ei / 1609.344, millimeters: ei * 1e3, millimetres: ei * 1e3, nauticalmiles: ei / 1852, radians: 1, yards: ei * 1.0936 };
  function vi(e, i, r = {}) {
    let a = { type: "Feature" };
    return (r.id === 0 || r.id) && (a.id = r.id), r.bbox && (a.bbox = r.bbox), a.properties = i || {}, a.geometry = e, a;
  }
  function xn(e, i, r = {}) {
    if (!e) throw new Error("coordinates is required");
    if (!Array.isArray(e)) throw new Error("coordinates must be an Array");
    if (e.length < 2) throw new Error("coordinates must be at least 2 numbers long");
    if (!Ln(e[0]) || !Ln(e[1])) throw new Error("coordinates must contain numbers");
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
  function cr(e, i = "kilometers") {
    let r = _o[i];
    if (!r) throw new Error(i + " units is invalid");
    return e * r;
  }
  function Gi(e) {
    return e % (2 * Math.PI) * 180 / Math.PI;
  }
  function wn(e) {
    return e % 360 * Math.PI / 180;
  }
  function Ln(e) {
    return !isNaN(e) && e !== null && !Array.isArray(e);
  }
  function si(e) {
    return e !== null && typeof e == "object" && !Array.isArray(e);
  }
  function ss(e) {
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
          let k = os(o[f][0], o[f][1], o[f + 1][0], o[f + 1][1], h[_][0], h[_][1], h[_ + 1][0], h[_ + 1][1]);
          k && a.features.push(xn([k[0], k[1]]));
        }
      });
    }), a;
  }
  function os(e, i, r, a, o, h, f, _) {
    let k, C, z, O, K, tt = { x: null, y: null, onLine1: !1, onLine2: !1 };
    return k = (_ - h) * (r - e) - (f - o) * (a - i), k === 0 ? tt.x !== null && tt.y !== null ? tt : !1 : (C = i - h, z = e - o, O = (f - o) * C - (_ - h) * z, K = (r - e) * C - (a - i) * z, C = O / k, z = K / k, tt.x = e + C * (r - e), tt.y = i + C * (a - i), C >= 0 && C <= 1 && (tt.onLine1 = !0), z >= 0 && z <= 1 && (tt.onLine2 = !0), tt.onLine1 && tt.onLine2 ? [tt.x, tt.y] : !1);
  }
  var dr = ss;
  Te.Line = Te.extend({ initialize(e) {
    this._map = e, this._shape = "Line", this.toolbarButtonName = "drawPolyline", this._doesSelfIntersect = !1;
  }, enable(e) {
    L.Util.setOptions(this, e), this._enabled = !0, this._markers = [], this._layerGroup = new L.FeatureGroup(), this._layerGroup._pmTempLayer = !0, this._layerGroup.addTo(this._map), this._layer = L.polyline([], { ...this.options.templineStyle, pmIgnore: !1 }), this._setPane(this._layer, "layerPane"), this._layer._pmTempLayer = !0, this._layerGroup.addLayer(this._layer), this._hintline = L.polyline([], this.options.hintlineStyle), this._setPane(this._hintline, "layerPane"), this._hintline._pmTempLayer = !0, this._layerGroup.addLayer(this._hintline), this._hintMarker = L.marker(this._map.getCenter(), { interactive: !1, zIndexOffset: 100, icon: L.divIcon({ className: "marker-icon cursor-marker" }) }), this._setPane(this._hintMarker, "vertexPane"), this._hintMarker._pmTempLayer = !0, this._layerGroup.addLayer(this._hintMarker), this.options.cursorMarker && L.DomUtil.addClass(this._hintMarker._icon, "visible"), this.options.tooltips && this._hintMarker.bindTooltip(he("tooltips.firstVertex"), { permanent: !0, offset: L.point(0, 10), direction: "bottom", opacity: 0.8 }).openTooltip(), this._map.getContainer().classList.add("geoman-draw-cursor"), this._map.on("click", this._createVertex, this), this.options.finishOn && this.options.finishOn !== "snap" && this._map.on(this.options.finishOn, this._finishShape, this), this.options.finishOn === "dblclick" && (this.tempMapDoubleClickZoomState = this._map.doubleClickZoom._enabled, this.tempMapDoubleClickZoomState && this._map.doubleClickZoom.disable()), this._map.on("mousemove", this._syncHintMarker, this), this._hintMarker.on("move", this._syncHintLine, this), this._map.pm.Toolbar.toggleButton(this.toolbarButtonName, !0), this._otherSnapLayers = [], this.isRed = !1, this._fireDrawStart(), this._setGlobalDrawMode();
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
    return dr(this._layer.toGeoJSON(15)).features.length > 0;
  }, _handleSelfIntersection(e, i) {
    let r = L.polyline(this._layer.getLatLngs());
    e && (i || (i = this._hintMarker.getLatLng()), r.addLatLng(i));
    let a = dr(r.toGeoJSON(15));
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
    e <= 1 ? i = he("tooltips.continueLine") : i = he("tooltips.finishLine"), this._hintMarker.setTooltipContent(i);
  }, _change(e) {
    this._fireChange(e, "Draw");
  }, setStyle() {
    var e, i;
    (e = this._layer) == null || e.setStyle(this.options.templineStyle), (i = this._hintline) == null || i.setStyle(this.options.hintlineStyle);
  } }), Te.Polygon = Te.Line.extend({ initialize(e) {
    this._map = e, this._shape = "Polygon", this.toolbarButtonName = "drawPolygon";
  }, enable(e) {
    L.PM.Draw.Line.prototype.enable.call(this, e), this._layer.pm._shape = "Polygon";
  }, _createMarker(e) {
    let i = new L.Marker(e, { draggable: !1, icon: L.divIcon({ className: "marker-icon" }) });
    return this._setPane(i, "vertexPane"), i._pmTempLayer = !0, this._layerGroup.addLayer(i), this._markers.push(i), this._layer.getLatLngs().flat().length === 1 ? (i.on("click", this._finishShape, this), this._tempSnapLayerIndex = this._otherSnapLayers.push(i) - 1, this.options.snappable && this._cleanupSnapping()) : i.on("click", () => 1), i;
  }, _setTooltipText() {
    let { length: e } = this._layer.getLatLngs().flat(), i = "";
    e <= 2 ? i = he("tooltips.continueLine") : i = he("tooltips.finishPoly"), this._hintMarker.setTooltipContent(i);
  }, _finishShape() {
    if (!this.options.allowSelfIntersection && (this._handleSelfIntersection(!0, this._layer.getLatLngs()[0]), this._doesSelfIntersect) || this.options.requireSnapToFinish && !this._hintMarker._snapped && !this._isFirstLayer()) return;
    let e = this._layer.getLatLngs();
    if (e.length <= 2) return;
    let i = L.polygon(e, this.options.pathOptions);
    this._setPane(i, "layerPane"), this._finishLayer(i), i.addTo(this._map.pm._getContainingLayer()), this._fireCreate(i), this._cleanupSnapping(), this._otherSnapLayers.splice(this._tempSnapLayerIndex, 1), delete this._tempSnapLayerIndex;
    let r = this._hintMarker.getLatLng();
    this.disable(), this.options.continueDrawing && (this.enable(), this._hintMarker.setLatLng(r));
  } }), Te.Rectangle = Te.extend({ initialize(e) {
    this._map = e, this._shape = "Rectangle", this.toolbarButtonName = "drawRectangle";
  }, enable(e) {
    if (L.Util.setOptions(this, e), this._enabled = !0, this._layerGroup = new L.FeatureGroup(), this._layerGroup._pmTempLayer = !0, this._layerGroup.addTo(this._map), this._layer = L.rectangle([[0, 0], [0, 0]], this.options.pathOptions), this._setPane(this._layer, "layerPane"), this._layer._pmTempLayer = !0, this._startMarker = L.marker(this._map.getCenter(), { icon: L.divIcon({ className: "marker-icon rect-start-marker" }), draggable: !1, zIndexOffset: -100, opacity: this.options.cursorMarker ? 1 : 0 }), this._setPane(this._startMarker, "vertexPane"), this._startMarker._pmTempLayer = !0, this._layerGroup.addLayer(this._startMarker), this._hintMarker = L.marker(this._map.getCenter(), { zIndexOffset: 150, icon: L.divIcon({ className: "marker-icon cursor-marker" }) }), this._setPane(this._hintMarker, "vertexPane"), this._hintMarker._pmTempLayer = !0, this._layerGroup.addLayer(this._hintMarker), this.options.cursorMarker && L.DomUtil.addClass(this._hintMarker._icon, "visible"), this.options.tooltips && this._hintMarker.bindTooltip(he("tooltips.firstVertex"), { permanent: !0, offset: L.point(0, 10), direction: "bottom", opacity: 0.8 }).openTooltip(), this.options.cursorMarker) {
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
    }), this._map.off("click", this._placeStartingMarkers, this), this._map.on("click", this._finishShape, this), this._hintMarker.setTooltipContent(he("tooltips.finishRect")), this._setRectangleOrigin();
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
    let e = ts(this._startMarker.getLatLng(), this._map), i = ts(this._hintMarker.getLatLng(), this._map), r = L.PM.Utils._getRotatedRectangle(e, i, this.options.rectangleAngle || 0, this._map);
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
  } }), Te.CircleMarker = Te.extend({ initialize(e) {
    this._map = e, this._shape = "CircleMarker", this.toolbarButtonName = "drawCircleMarker", this._layerIsDragging = !1, this._BaseCircleClass = L.CircleMarker, this._minRadiusOption = "minRadiusCircleMarker", this._maxRadiusOption = "maxRadiusCircleMarker", this._editableOption = "resizeableCircleMarker", this._defaultRadius = 10;
  }, enable(e) {
    if (L.Util.setOptions(this, e), this.options.editable && (this.options.resizeableCircleMarker = this.options.editable, delete this.options.editable), this._enabled = !0, this._map.pm.Toolbar.toggleButton(this.toolbarButtonName, !0), this._map.getContainer().classList.add("geoman-draw-cursor"), this.options[this._editableOption]) {
      let i = {};
      L.extend(i, this.options.templineStyle), i.radius = 0, this._layerGroup = new L.FeatureGroup(), this._layerGroup._pmTempLayer = !0, this._layerGroup.addTo(this._map), this._layer = new this._BaseCircleClass(this._map.getCenter(), i), this._setPane(this._layer, "layerPane"), this._layer._pmTempLayer = !0, this._centerMarker = L.marker(this._map.getCenter(), { icon: L.divIcon({ className: "marker-icon" }), draggable: !1, zIndexOffset: 100 }), this._setPane(this._centerMarker, "vertexPane"), this._centerMarker._pmTempLayer = !0, this._hintMarker = L.marker(this._map.getCenter(), { zIndexOffset: 110, icon: L.divIcon({ className: "marker-icon cursor-marker" }) }), this._setPane(this._hintMarker, "vertexPane"), this._hintMarker._pmTempLayer = !0, this._layerGroup.addLayer(this._hintMarker), this.options.cursorMarker && L.DomUtil.addClass(this._hintMarker._icon, "visible"), this.options.tooltips && this._hintMarker.bindTooltip(he("tooltips.startCircle"), { permanent: !0, offset: L.point(0, 10), direction: "bottom", opacity: 0.8 }).openTooltip(), this._hintline = L.polyline([], this.options.hintlineStyle), this._setPane(this._hintline, "layerPane"), this._hintline._pmTempLayer = !0, this._layerGroup.addLayer(this._hintline), this._map.on("click", this._placeCenterMarker, this);
    } else this._map.on("click", this._createMarker, this), this._hintMarker = new this._BaseCircleClass(this._map.getCenter(), { radius: this._defaultRadius, ...this.options.templineStyle }), this._setPane(this._hintMarker, "layerPane"), this._hintMarker._pmTempLayer = !0, this._hintMarker.addTo(this._map), this._layer = this._hintMarker, this.options.tooltips && this._hintMarker.bindTooltip(he("tooltips.placeCircleMarker"), { permanent: !0, offset: L.point(0, 10), direction: "bottom", opacity: 0.8 }).openTooltip();
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
    e && (this._layer.setLatLng(e), this._hintMarker.on("move", this._syncHintLine, this), this._hintMarker.on("move", this._syncCircleRadius, this), this._hintMarker.setTooltipContent(he("tooltips.finishCircle")), this._fireCenterPlaced(), this._fireChange(this._layer.getLatLng(), "Draw"));
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
      this.options[this._minRadiusOption] && r < this.options[this._minRadiusOption] ? e = vn(this._map, i, e, this._getMinDistanceInMeter()) : this.options[this._maxRadiusOption] && r > this.options[this._maxRadiusOption] && (e = vn(this._map, i, e, this._getMaxDistanceInMeter()));
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
  } }), Te.Circle = Te.CircleMarker.extend({ initialize(e) {
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
  var fr = class {
    constructor(e = [], i = ta) {
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
  function ta(e, i) {
    return e < i ? -1 : e > i ? 1 : 0;
  }
  function ls(e, i) {
    return e.p.x > i.p.x ? 1 : e.p.x < i.p.x ? -1 : e.p.y !== i.p.y ? e.p.y > i.p.y ? 1 : -1 : 1;
  }
  function go(e, i) {
    return e.rightSweepEvent.p.x > i.rightSweepEvent.p.x ? 1 : e.rightSweepEvent.p.x < i.rightSweepEvent.p.x ? -1 : e.rightSweepEvent.p.y !== i.rightSweepEvent.p.y ? e.rightSweepEvent.p.y < i.rightSweepEvent.p.y ? 1 : -1 : 1;
  }
  var ea = class {
    constructor(e, i, r, a) {
      this.p = { x: e[0], y: e[1] }, this.featureId = i, this.ringId = r, this.eventId = a, this.otherEvent = null, this.isLeftEndpoint = null;
    }
    isSamePoint(e) {
      return this.p.x === e.p.x && this.p.y === e.p.y;
    }
  };
  function yo(e, i) {
    if (e.type === "FeatureCollection") {
      let r = e.features;
      for (let a = 0; a < r.length; a++) bi(r[a], i);
    } else bi(e, i);
  }
  var qe = 0, Si = 0, pr = 0;
  function bi(e, i) {
    let r = e.type === "Feature" ? e.geometry : e, a = r.coordinates;
    (r.type === "Polygon" || r.type === "MultiLineString") && (a = [a]), r.type === "LineString" && (a = [[a]]);
    for (let o = 0; o < a.length; o++) for (let h = 0; h < a[o].length; h++) {
      let f = a[o][h][0], _ = null;
      Si = Si + 1;
      for (let k = 0; k < a[o][h].length - 1; k++) {
        _ = a[o][h][k + 1];
        let C = new ea(f, qe, Si, pr), z = new ea(_, qe, Si, pr + 1);
        C.otherEvent = z, z.otherEvent = C, ls(C, z) > 0 ? (z.isLeftEndpoint = !0, C.isLeftEndpoint = !1) : (C.isLeftEndpoint = !0, z.isLeftEndpoint = !1), i.push(C), i.push(z), f = _, pr = pr + 1;
      }
    }
    qe = qe + 1;
  }
  var vo = class {
    constructor(e) {
      this.leftSweepEvent = e, this.rightSweepEvent = e.otherEvent;
    }
  };
  function kn(e, i) {
    if (e === null || i === null || e.leftSweepEvent.ringId === i.leftSweepEvent.ringId && (e.rightSweepEvent.isSamePoint(i.leftSweepEvent) || e.rightSweepEvent.isSamePoint(i.leftSweepEvent) || e.rightSweepEvent.isSamePoint(i.rightSweepEvent) || e.leftSweepEvent.isSamePoint(i.leftSweepEvent) || e.leftSweepEvent.isSamePoint(i.rightSweepEvent))) return !1;
    let r = e.leftSweepEvent.p.x, a = e.leftSweepEvent.p.y, o = e.rightSweepEvent.p.x, h = e.rightSweepEvent.p.y, f = i.leftSweepEvent.p.x, _ = i.leftSweepEvent.p.y, k = i.rightSweepEvent.p.x, C = i.rightSweepEvent.p.y, z = (C - _) * (o - r) - (k - f) * (h - a), O = (k - f) * (a - _) - (C - _) * (r - f), K = (o - r) * (a - _) - (h - a) * (r - f);
    if (z === 0) return !1;
    let tt = O / z, ft = K / z;
    if (tt >= 0 && tt <= 1 && ft >= 0 && ft <= 1) {
      let yt = r + tt * (o - r), kt = a + tt * (h - a);
      return [yt, kt];
    }
    return !1;
  }
  function bo(e, i) {
    i = i || !1;
    let r = [], a = new fr([], go);
    for (; e.length; ) {
      let o = e.pop();
      if (o.isLeftEndpoint) {
        let h = new vo(o);
        for (let f = 0; f < a.data.length; f++) {
          let _ = a.data[f];
          if (i && _.leftSweepEvent.featureId === o.featureId) continue;
          let k = kn(h, _);
          k !== !1 && r.push(k);
        }
        a.push(h);
      } else o.isLeftEndpoint === !1 && a.pop();
    }
    return r;
  }
  function $n(e, i) {
    let r = new fr([], ls);
    return yo(e, r), bo(r, i);
  }
  var us = $n, mr = us;
  function hs(e, i, r = {}) {
    let { removeDuplicates: a = !0, ignoreSelfIntersections: o = !0 } = r, h = [];
    e.type === "FeatureCollection" ? h = h.concat(e.features) : e.type === "Feature" ? h.push(e) : (e.type === "LineString" || e.type === "Polygon" || e.type === "MultiLineString" || e.type === "MultiPolygon") && h.push(vi(e)), i.type === "FeatureCollection" ? h = h.concat(i.features) : i.type === "Feature" ? h.push(i) : (i.type === "LineString" || i.type === "Polygon" || i.type === "MultiLineString" || i.type === "MultiPolygon") && h.push(vi(i));
    let f = mr(ai(h), o), _ = [];
    if (a) {
      let k = {};
      f.forEach((C) => {
        let z = C.join(",");
        k[z] || (k[z] = !0, _.push(C));
      });
    } else _ = f;
    return ai(_.map((k) => xn(k)));
  }
  var oi = hs, _r = w(de(), 1);
  function ia(e, i, r) {
    if (e !== null) for (var a, o, h, f, _, k, C, z = 0, O = 0, K, tt = e.type, ft = tt === "FeatureCollection", yt = tt === "Feature", kt = ft ? e.features.length : 1, Dt = 0; Dt < kt; Dt++) {
      C = ft ? e.features[Dt].geometry : yt ? e.geometry : e, K = C ? C.type === "GeometryCollection" : !1, _ = K ? C.geometries.length : 1;
      for (var F = 0; F < _; F++) {
        var nt = 0, dt = 0;
        if (f = K ? C.geometries[F] : C, f !== null) {
          k = f.coordinates;
          var wt = f.type;
          switch (z = 0, wt) {
            case null:
              break;
            case "Point":
              if (i(k, O, Dt, nt, dt) === !1) return !1;
              O++, nt++;
              break;
            case "LineString":
            case "MultiPoint":
              for (a = 0; a < k.length; a++) {
                if (i(k[a], O, Dt, nt, dt) === !1) return !1;
                O++, wt === "MultiPoint" && nt++;
              }
              wt === "LineString" && nt++;
              break;
            case "Polygon":
            case "MultiLineString":
              for (a = 0; a < k.length; a++) {
                for (o = 0; o < k[a].length - z; o++) {
                  if (i(k[a][o], O, Dt, nt, dt) === !1) return !1;
                  O++;
                }
                wt === "MultiLineString" && nt++, wt === "Polygon" && dt++;
              }
              wt === "Polygon" && nt++;
              break;
            case "MultiPolygon":
              for (a = 0; a < k.length; a++) {
                for (dt = 0, o = 0; o < k[a].length; o++) {
                  for (h = 0; h < k[a][o].length - z; h++) {
                    if (i(k[a][o][h], O, Dt, nt, dt) === !1) return !1;
                    O++;
                  }
                  dt++;
                }
                nt++;
              }
              break;
            case "GeometryCollection":
              for (a = 0; a < f.geometries.length; a++) if (ia(f.geometries[a], i) === !1) return !1;
              break;
            default:
              throw new Error("Unknown Geometry Type");
          }
        }
      }
    }
  }
  function Cn(e, i) {
    if (e.type === "Feature") i(e, 0);
    else if (e.type === "FeatureCollection") for (var r = 0; r < e.features.length && i(e.features[r], r) !== !1; r++) ;
  }
  function xo(e, i, r) {
    var a = r;
    return Cn(e, function(o, h) {
      h === 0 && r === void 0 ? a = o : a = i(a, o, h);
    }), a;
  }
  function Pi(e, i) {
    var r, a, o, h, f, _, k, C, z, O, K = 0, tt = e.type === "FeatureCollection", ft = e.type === "Feature", yt = tt ? e.features.length : 1;
    for (r = 0; r < yt; r++) {
      for (_ = tt ? e.features[r].geometry : ft ? e.geometry : e, C = tt ? e.features[r].properties : ft ? e.properties : {}, z = tt ? e.features[r].bbox : ft ? e.bbox : void 0, O = tt ? e.features[r].id : ft ? e.id : void 0, k = _ ? _.type === "GeometryCollection" : !1, f = k ? _.geometries.length : 1, o = 0; o < f; o++) {
        if (h = k ? _.geometries[o] : _, h === null) {
          if (i(null, K, C, z, O) === !1) return !1;
          continue;
        }
        switch (h.type) {
          case "Point":
          case "LineString":
          case "MultiPoint":
          case "Polygon":
          case "MultiLineString":
          case "MultiPolygon": {
            if (i(h, K, C, z, O) === !1) return !1;
            break;
          }
          case "GeometryCollection": {
            for (a = 0; a < h.geometries.length; a++) if (i(h.geometries[a], K, C, z, O) === !1) return !1;
            break;
          }
          default:
            throw new Error("Unknown Geometry Type");
        }
      }
      K++;
    }
  }
  function na(e, i) {
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
        var z = r.coordinates[C], O = { type: k, coordinates: z };
        if (i(vi(O, o), a, C) === !1) return !1;
      }
    });
  }
  function je(e, i = {}) {
    if (e.bbox != null && i.recompute !== !0) return e.bbox;
    let r = [1 / 0, 1 / 0, -1 / 0, -1 / 0];
    return ia(e, (a) => {
      r[0] > a[0] && (r[0] = a[0]), r[1] > a[1] && (r[1] = a[1]), r[2] < a[0] && (r[2] = a[0]), r[3] < a[1] && (r[3] = a[1]);
    }), r;
  }
  function ra(e) {
    var i;
    if (e.bbox) i = e.bbox;
    else if (Array.isArray(e) && e.length === 4) i = e;
    else if (Array.isArray(e) && e.length === 6) i = [e[0], e[1], e[3], e[4]];
    else if (e.type === "Feature") i = je(e);
    else if (e.type === "FeatureCollection") i = je(e);
    else throw new Error("invalid geojson");
    return { minX: i[0], minY: i[1], maxX: i[2], maxY: i[3] };
  }
  var Ti = class {
    constructor(e = 9) {
      this.tree = new _r.default(e), this.tree.toBBox = ra;
    }
    insert(e) {
      if (e.type !== "Feature") throw new Error("invalid feature");
      return e.bbox = e.bbox ? e.bbox : je(e), this.tree.insert(e), this;
    }
    load(e) {
      var i = [];
      return Array.isArray(e) ? e.forEach(function(r) {
        if (r.type !== "Feature") throw new Error("invalid features");
        r.bbox = r.bbox ? r.bbox : je(r), i.push(r);
      }) : Cn(e, function(r) {
        if (r.type !== "Feature") throw new Error("invalid features");
        r.bbox = r.bbox ? r.bbox : je(r), i.push(r);
      }), this.tree.load(i), this;
    }
    remove(e, i) {
      if (e.type !== "Feature") throw new Error("invalid feature");
      return e.bbox = e.bbox ? e.bbox : je(e), this.tree.remove(e, i), this;
    }
    clear() {
      return this.tree.clear(), this;
    }
    search(e) {
      var i = this.tree.search(ra(e));
      return ai(i);
    }
    collides(e) {
      return this.tree.collides(ra(e));
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
  function cs(e, i) {
    if (i = i ?? {}, !si(i)) throw new Error("options is invalid");
    var r = i.precision, a = i.coordinates, o = i.mutate;
    if (r = r == null || isNaN(r) ? 6 : r, a = a == null || isNaN(a) ? 3 : a, !e) throw new Error("<geojson> is required");
    if (typeof r != "number") throw new Error("<precision> must be a number");
    if (typeof a != "number") throw new Error("<coordinates> must be a number");
    (o === !1 || o === void 0) && (e = JSON.parse(JSON.stringify(e)));
    var h = Math.pow(10, r);
    return ia(e, function(f) {
      aa(f, h, a);
    }), e;
  }
  function aa(e, i, r) {
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
  function nn(e) {
    return e.type === "Feature" ? e.geometry : e;
  }
  function rn(e, i) {
    return e.type === "FeatureCollection" ? "FeatureCollection" : e.type === "GeometryCollection" ? "GeometryCollection" : e.type === "Feature" && e.geometry !== null ? e.geometry.type : e.type;
  }
  function gr(e) {
    if (!e) throw new Error("geojson is required");
    let i = [];
    return na(e, (r) => {
      sa(r, i);
    }), ai(i);
  }
  function sa(e, i) {
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
        ds(o, e.properties).forEach((h) => {
          h.id = i.length, i.push(h);
        });
      });
    }
  }
  function ds(e, i) {
    let r = [];
    return e.reduce((a, o) => {
      let h = Vn([a, o], i);
      return h.bbox = wo(a, o), r.push(h), o;
    }), r;
  }
  function wo(e, i) {
    let r = e[0], a = e[1], o = i[0], h = i[1], f = r < o ? r : o, _ = a < h ? a : h, k = r > o ? r : o, C = a > h ? a : h;
    return [f, _, k, C];
  }
  function En(e, i, r = {}) {
    var a = ii(e), o = ii(i), h = wn(o[1] - a[1]), f = wn(o[0] - a[0]), _ = wn(a[1]), k = wn(o[1]), C = Math.pow(Math.sin(h / 2), 2) + Math.pow(Math.sin(f / 2), 2) * Math.cos(_) * Math.cos(k);
    return cr(2 * Math.atan2(Math.sqrt(C), Math.sqrt(1 - C)), r.units);
  }
  var Lo = Object.defineProperty, fs = Object.defineProperties, ko = Object.getOwnPropertyDescriptors, oa = Object.getOwnPropertySymbols, Co = Object.prototype.hasOwnProperty, xi = Object.prototype.propertyIsEnumerable, Gn = (e, i, r) => i in e ? Lo(e, i, { enumerable: !0, configurable: !0, writable: !0, value: r }) : e[i] = r, Eo = (e, i) => {
    for (var r in i || (i = {})) Co.call(i, r) && Gn(e, r, i[r]);
    if (oa) for (var r of oa(i)) xi.call(i, r) && Gn(e, r, i[r]);
    return e;
  }, yr = (e, i) => fs(e, ko(i));
  function Mo(e, i, r = {}) {
    if (!e || !i) throw new Error("lines and inputPoint are required arguments");
    let a = ii(i), o = xn([1 / 0, 1 / 0], { lineStringIndex: -1, segmentIndex: -1, totalDistance: -1, lineDistance: -1, segmentDistance: -1, pointDistance: 1 / 0, multiFeatureIndex: -1, index: -1, location: -1, dist: 1 / 0 }), h = 0, f = 0, _ = -1;
    return na(e, function(k, C, z) {
      _ !== z && (_ = z, f = 0);
      let O = Di(k);
      for (let K = 0; K < O.length - 1; K++) {
        let tt = xn(O[K]), ft = ii(tt), yt = xn(O[K + 1]), kt = ii(yt), Dt = En(tt, yt, r), F, nt;
        kt[0] === a[0] && kt[1] === a[1] ? [F, nt] = [kt, !0] : ft[0] === a[0] && ft[1] === a[1] ? [F, nt] = [ft, !1] : [F, nt] = _s(ft, kt, a);
        let dt = En(i, F, r);
        if (dt < o.properties.pointDistance) {
          let wt = En(tt, F, r);
          o = xn(F, { lineStringIndex: z, segmentIndex: nt ? K + 1 : K, totalDistance: h + wt, lineDistance: f + wt, segmentDistance: wt, pointDistance: dt, multiFeatureIndex: -1, index: -1, location: -1, dist: 1 / 0 }), o.properties = yr(Eo({}, o.properties), { multiFeatureIndex: o.properties.lineStringIndex, index: o.properties.segmentIndex, location: o.properties.totalDistance, dist: o.properties.pointDistance });
        }
        h += Dt, f += Dt;
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
  function ps(e) {
    let i = qn(e);
    return [e[0] / i, e[1] / i, e[2] / i];
  }
  function qi(e) {
    let i = wn(e[1]), r = wn(e[0]);
    return [Math.cos(i) * Math.cos(r), Math.cos(i) * Math.sin(r), Math.sin(i)];
  }
  function ms(e) {
    let [i, r, a] = e, o = Math.min(Math.max(a, -1), 1), h = Gi(Math.asin(o));
    return [Gi(Math.atan2(r, i)), h];
  }
  function _s(e, i, r) {
    let a = qi(e), o = qi(i), h = qi(r), f = Zn(a, o);
    if (f[0] === 0 && f[1] === 0 && f[2] === 0) return Zi(a, o) > 0 ? [[...i], !0] : [[...r], !1];
    let _ = Zn(f, h);
    if (_[0] === 0 && _[1] === 0 && _[2] === 0) return [[...i], !0];
    let k = Zn(_, f), C = ps(k), z = [-C[0], -C[1], -C[2]], O = Zi(h, C) > Zi(h, z) ? C : z, K = ps(f), tt = Zi(Zn(a, O), K), ft = Zi(Zn(O, o), K);
    return tt >= 0 && ft >= 0 ? [ms(O), !1] : Zi(a, h) > Zi(o, h) ? [[...e], !1] : [[...i], !0];
  }
  function gs(e, i) {
    if (!e) throw new Error("line is required");
    if (!i) throw new Error("splitter is required");
    let r = rn(e), a = rn(i);
    if (r !== "LineString") throw new Error("line must be LineString");
    if (a === "FeatureCollection") throw new Error("splitter cannot be a FeatureCollection");
    if (a === "GeometryCollection") throw new Error("splitter cannot be a GeometryCollection");
    var o = cs(i, { precision: 7 });
    switch (e.type !== "Feature" && (e = vi(e)), a) {
      case "Point":
        return vr(e, o);
      case "MultiPoint":
        return wi(e, o);
      case "LineString":
      case "MultiLineString":
      case "Polygon":
      case "MultiPolygon":
        return wi(e, hs(e, o, { ignoreSelfIntersections: !0 }));
    }
  }
  function wi(e, i) {
    var r = [], a = Un();
    return na(i, function(o) {
      if (r.forEach(function(_, k) {
        _.id = k;
      }), !r.length) r = vr(e, o).features, a.load(ai(r));
      else {
        var h = a.search(o);
        if (h.features.length) {
          var f = la(o, h);
          r = r.filter(function(_) {
            return _.id !== f.id;
          }), a.remove(f), Cn(vr(f, o), function(_) {
            r.push(_), a.insert(_);
          });
        }
      }
    }), ai(r);
  }
  function vr(e, i) {
    var r = [], a = Di(e)[0], o = Di(e)[e.geometry.coordinates.length - 1];
    if (an(a, ii(i)) || an(o, ii(i))) return ai([e]);
    var h = Un(), f = gr(e);
    h.load(f);
    var _ = h.search(i);
    if (!_.features.length) return ai([e]);
    var k = la(i, _), C = [a], z = xo(f, function(O, K, tt) {
      var ft = Di(K)[1], yt = ii(i);
      return tt === k.id ? (O.push(yt), r.push(Vn(O)), an(yt, ft) ? [yt] : [yt, ft]) : (O.push(ft), O);
    }, C);
    return z.length > 1 && r.push(Vn(z)), ai(r);
  }
  function la(e, i) {
    if (!i.features.length) throw new Error("lines must contain features");
    if (i.features.length === 1) return i.features[0];
    var r, a = 1 / 0;
    return Cn(i, function(o) {
      var h = Mo(o, e), f = h.properties.dist;
      f < a && (r = o, a = f);
    }), r;
  }
  function an(e, i) {
    return e[0] === i[0] && e[1] === i[1];
  }
  var Bo = gs, li = 11102230246251565e-32, Ae = 134217729, ys = (3 + 8 * li) * li;
  function br(e, i, r, a, o) {
    let h, f, _, k, C = i[0], z = a[0], O = 0, K = 0;
    z > C == z > -C ? (h = C, C = i[++O]) : (h = z, z = a[++K]);
    let tt = 0;
    if (O < e && K < r) for (z > C == z > -C ? (f = C + h, _ = h - (f - C), C = i[++O]) : (f = z + h, _ = h - (f - z), z = a[++K]), h = f, _ !== 0 && (o[tt++] = _); O < e && K < r; ) z > C == z > -C ? (f = h + C, k = f - h, _ = h - (f - k) + (C - k), C = i[++O]) : (f = h + z, k = f - h, _ = h - (f - k) + (z - k), z = a[++K]), h = f, _ !== 0 && (o[tt++] = _);
    for (; O < e; ) f = h + C, k = f - h, _ = h - (f - k) + (C - k), C = i[++O], h = f, _ !== 0 && (o[tt++] = _);
    for (; K < r; ) f = h + z, k = f - h, _ = h - (f - k) + (z - k), z = a[++K], h = f, _ !== 0 && (o[tt++] = _);
    return (h !== 0 || tt === 0) && (o[tt++] = h), tt;
  }
  function Ao(e, i) {
    let r = i[0];
    for (let a = 1; a < e; a++) r += i[a];
    return r;
  }
  function Mn(e) {
    return new Float64Array(e);
  }
  var vs = (3 + 16 * li) * li, bs = (2 + 12 * li) * li, xs = (9 + 64 * li) * li * li, sn = Mn(4), ws = Mn(8), ua = Mn(12), ha = Mn(16), Ve = Mn(4);
  function t(e, i, r, a, o, h, f) {
    let _, k, C, z, O, K, tt, ft, yt, kt, Dt, F, nt, dt, wt, xt, Lt, S, D = e - o, I = r - o, W = i - h, H = a - h;
    dt = D * H, K = Ae * D, tt = K - (K - D), ft = D - tt, K = Ae * H, yt = K - (K - H), kt = H - yt, wt = ft * kt - (dt - tt * yt - ft * yt - tt * kt), xt = W * I, K = Ae * W, tt = K - (K - W), ft = W - tt, K = Ae * I, yt = K - (K - I), kt = I - yt, Lt = ft * kt - (xt - tt * yt - ft * yt - tt * kt), Dt = wt - Lt, O = wt - Dt, sn[0] = wt - (Dt + O) + (O - Lt), F = dt + Dt, O = F - dt, nt = dt - (F - O) + (Dt - O), Dt = nt - xt, O = nt - Dt, sn[1] = nt - (Dt + O) + (O - xt), S = F + Dt, O = S - F, sn[2] = F - (S - O) + (Dt - O), sn[3] = S;
    let U = Ao(4, sn), it = bs * f;
    if (U >= it || -U >= it || (O = e - D, _ = e - (D + O) + (O - o), O = r - I, C = r - (I + O) + (O - o), O = i - W, k = i - (W + O) + (O - h), O = a - H, z = a - (H + O) + (O - h), _ === 0 && k === 0 && C === 0 && z === 0) || (it = xs * f + ys * Math.abs(U), U += D * z + H * _ - (W * C + I * k), U >= it || -U >= it)) return U;
    dt = _ * H, K = Ae * _, tt = K - (K - _), ft = _ - tt, K = Ae * H, yt = K - (K - H), kt = H - yt, wt = ft * kt - (dt - tt * yt - ft * yt - tt * kt), xt = k * I, K = Ae * k, tt = K - (K - k), ft = k - tt, K = Ae * I, yt = K - (K - I), kt = I - yt, Lt = ft * kt - (xt - tt * yt - ft * yt - tt * kt), Dt = wt - Lt, O = wt - Dt, Ve[0] = wt - (Dt + O) + (O - Lt), F = dt + Dt, O = F - dt, nt = dt - (F - O) + (Dt - O), Dt = nt - xt, O = nt - Dt, Ve[1] = nt - (Dt + O) + (O - xt), S = F + Dt, O = S - F, Ve[2] = F - (S - O) + (Dt - O), Ve[3] = S;
    let J = br(4, sn, 4, Ve, ws);
    dt = D * z, K = Ae * D, tt = K - (K - D), ft = D - tt, K = Ae * z, yt = K - (K - z), kt = z - yt, wt = ft * kt - (dt - tt * yt - ft * yt - tt * kt), xt = W * C, K = Ae * W, tt = K - (K - W), ft = W - tt, K = Ae * C, yt = K - (K - C), kt = C - yt, Lt = ft * kt - (xt - tt * yt - ft * yt - tt * kt), Dt = wt - Lt, O = wt - Dt, Ve[0] = wt - (Dt + O) + (O - Lt), F = dt + Dt, O = F - dt, nt = dt - (F - O) + (Dt - O), Dt = nt - xt, O = nt - Dt, Ve[1] = nt - (Dt + O) + (O - xt), S = F + Dt, O = S - F, Ve[2] = F - (S - O) + (Dt - O), Ve[3] = S;
    let et = br(J, ws, 4, Ve, ua);
    dt = _ * z, K = Ae * _, tt = K - (K - _), ft = _ - tt, K = Ae * z, yt = K - (K - z), kt = z - yt, wt = ft * kt - (dt - tt * yt - ft * yt - tt * kt), xt = k * C, K = Ae * k, tt = K - (K - k), ft = k - tt, K = Ae * C, yt = K - (K - C), kt = C - yt, Lt = ft * kt - (xt - tt * yt - ft * yt - tt * kt), Dt = wt - Lt, O = wt - Dt, Ve[0] = wt - (Dt + O) + (O - Lt), F = dt + Dt, O = F - dt, nt = dt - (F - O) + (Dt - O), Dt = nt - xt, O = nt - Dt, Ve[1] = nt - (Dt + O) + (O - xt), S = F + Dt, O = S - F, Ve[2] = F - (S - O) + (Dt - O), Ve[3] = S;
    let st = br(et, ua, 4, Ve, ha);
    return ha[st - 1];
  }
  function n(e, i, r, a, o, h) {
    let f = (i - h) * (r - o), _ = (e - o) * (a - h), k = f - _, C = Math.abs(f + _);
    return Math.abs(k) >= vs * C ? k : -t(e, i, r, a, o, h, C);
  }
  function s(e, i) {
    var r, a, o = 0, h, f, _, k, C, z, O, K = e[0], tt = e[1], ft = i.length;
    for (r = 0; r < ft; r++) {
      a = 0;
      var yt = i[r], kt = yt.length - 1;
      if (z = yt[0], z[0] !== yt[kt][0] && z[1] !== yt[kt][1]) throw new Error("First and last coordinates in a ring must be the same");
      for (f = z[0] - K, _ = z[1] - tt, a; a < kt; a++) {
        if (O = yt[a + 1], k = O[0] - K, C = O[1] - tt, _ === 0 && C === 0) {
          if (k <= 0 && f >= 0 || f <= 0 && k >= 0) return 0;
        } else if (C >= 0 && _ <= 0 || C <= 0 && _ >= 0) {
          if (h = n(f, k, _, C, 0, 0), h === 0) return 0;
          (h > 0 && C > 0 && _ <= 0 || h < 0 && C <= 0 && _ > 0) && o++;
        }
        z = O, _ = C, f = k;
      }
    }
    return o % 2 !== 0;
  }
  function c(e, i, r = {}) {
    if (!e) throw new Error("point is required");
    if (!i) throw new Error("polygon is required");
    let a = ii(e), o = nn(i), h = o.type, f = i.bbox, _ = o.coordinates;
    if (f && y(a, f) === !1) return !1;
    h === "Polygon" && (_ = [_]);
    let k = !1;
    for (var C = 0; C < _.length; ++C) {
      let z = s(a, _[C]);
      if (z === 0) return !r.ignoreBoundary;
      z && (k = !0);
    }
    return k;
  }
  function y(e, i) {
    return i[0] <= e[0] && i[1] <= e[1] && i[2] >= e[0] && i[3] >= e[1];
  }
  function A(e, i, r = {}) {
    let a = ii(e), o = Di(i);
    for (let h = 0; h < o.length - 1; h++) {
      let f = !1;
      if (r.ignoreEndVertices && (h === 0 && (f = "start"), h === o.length - 2 && (f = "end"), h === 0 && h + 1 === o.length - 1 && (f = "both")), Z(o[h], o[h + 1], a, f, typeof r.epsilon > "u" ? null : r.epsilon)) return !0;
    }
    return !1;
  }
  function Z(e, i, r, a, o) {
    let h = r[0], f = r[1], _ = e[0], k = e[1], C = i[0], z = i[1], O = r[0] - _, K = r[1] - k, tt = C - _, ft = z - k, yt = O * ft - K * tt;
    if (o !== null) {
      if (Math.abs(yt) > o) return !1;
    } else if (yt !== 0) return !1;
    if (Math.abs(tt) === Math.abs(ft) && Math.abs(tt) === 0) return a ? !1 : r[0] === e[0] && r[1] === e[1];
    if (a) {
      if (a === "start") return Math.abs(tt) >= Math.abs(ft) ? tt > 0 ? _ < h && h <= C : C <= h && h < _ : ft > 0 ? k < f && f <= z : z <= f && f < k;
      if (a === "end") return Math.abs(tt) >= Math.abs(ft) ? tt > 0 ? _ <= h && h < C : C < h && h <= _ : ft > 0 ? k <= f && f < z : z < f && f <= k;
      if (a === "both") return Math.abs(tt) >= Math.abs(ft) ? tt > 0 ? _ < h && h < C : C < h && h < _ : ft > 0 ? k < f && f < z : z < f && f < k;
    } else return Math.abs(tt) >= Math.abs(ft) ? tt > 0 ? _ <= h && h <= C : C <= h && h <= _ : ft > 0 ? k <= f && f <= z : z <= f && f <= k;
    return !1;
  }
  function rt(e, i) {
    let r = nn(e), a = nn(i), o = r.type, h = a.type, f = r.coordinates, _ = a.coordinates;
    switch (o) {
      case "Point":
        if (h === "Point") return ca(f, _);
        throw new Error("feature2 " + h + " geometry not supported");
      case "MultiPoint":
        switch (h) {
          case "Point":
            return It(r, a);
          case "MultiPoint":
            return qt(r, a);
          default:
            throw new Error("feature2 " + h + " geometry not supported");
        }
      case "LineString":
        switch (h) {
          case "Point":
            return A(a, r, { ignoreEndVertices: !0 });
          case "LineString":
            return De(r, a);
          case "MultiPoint":
            return ne(r, a);
          default:
            throw new Error("feature2 " + h + " geometry not supported");
        }
      case "Polygon":
        switch (h) {
          case "Point":
            return c(a, r, { ignoreBoundary: !0 });
          case "LineString":
            return He(r, a);
          case "Polygon":
            return Hi(r, a);
          case "MultiPoint":
            return $e(r, a);
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
  function It(e, i) {
    let r, a = !1;
    for (r = 0; r < e.coordinates.length; r++) if (ca(e.coordinates[r], i.coordinates)) {
      a = !0;
      break;
    }
    return a;
  }
  function qt(e, i) {
    for (let r of i.coordinates) {
      let a = !1;
      for (let o of e.coordinates) if (ca(r, o)) {
        a = !0;
        break;
      }
      if (!a) return !1;
    }
    return !0;
  }
  function ne(e, i) {
    let r = !1;
    for (let a of i.coordinates) if (A(a, e, { ignoreEndVertices: !0 }) && (r = !0), !A(a, e)) return !1;
    return !!r;
  }
  function $e(e, i) {
    for (let r of i.coordinates) if (!c(r, e, { ignoreBoundary: !0 })) return !1;
    return !0;
  }
  function De(e, i) {
    let r = !1;
    for (let a of i.coordinates) if (A({ type: "Point", coordinates: a }, e, { ignoreEndVertices: !0 }) && (r = !0), !A({ type: "Point", coordinates: a }, e, { ignoreEndVertices: !1 })) return !1;
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
  function He(e, i) {
    let r = je(e), a = je(i);
    if (!Ls(r, a)) return !1;
    for (let f of i.coordinates) if (!c(f, e)) return !1;
    let o = !1, h = ui(i, e);
    for (let f of h.features) {
      let _ = So(f.geometry.coordinates[0], f.geometry.coordinates[1]);
      if (!c(_, e)) return !1;
      !o && c(_, e, { ignoreBoundary: !0 }) && (o = !0);
    }
    return o;
  }
  function Hi(e, i) {
    if (e.type === "Feature" && e.geometry === null || i.type === "Feature" && i.geometry === null) return !1;
    let r = je(e), a = je(i);
    if (!Ls(r, a)) return !1;
    let o = nn(i).coordinates;
    for (let h of o) for (let f of h) if (!c(f, e)) return !1;
    return !0;
  }
  function Ls(e, i) {
    return !(e[0] > i[0] || e[2] < i[2] || e[1] > i[1] || e[3] < i[3]);
  }
  function ca(e, i) {
    return e[0] === i[0] && e[1] === i[1];
  }
  function So(e, i) {
    return [(e[0] + i[0]) / 2, (e[1] + i[1]) / 2];
  }
  var ks = rt, Po = w(Vi()), Cs = /^-?(?:\d+(?:\.\d*)?|\.\d+)(?:e[+-]?\d+)?$/i, Ce = Math.ceil, Ue = Math.floor, Ke = "[BigNumber Error] ", Es = Ke + "Number primitive has more than 15 significant digits: ", fi = 1e14, Wt = 14, xr = 9007199254740991, da = [1, 10, 100, 1e3, 1e4, 1e5, 1e6, 1e7, 1e8, 1e9, 1e10, 1e11, 1e12, 1e13], Bn = 1e7, Re = 1e9;
  function al(e) {
    var i, r, a, o = F.prototype = { constructor: F, toString: null, valueOf: null }, h = new F(1), f = 20, _ = 4, k = -7, C = 21, z = -1e7, O = 1e7, K = !1, tt = 1, ft = 0, yt = { prefix: "", groupSize: 3, secondaryGroupSize: 0, groupSeparator: ",", decimalSeparator: ".", fractionGroupSize: 0, fractionGroupSeparator: " ", suffix: "" }, kt = "0123456789abcdefghijklmnopqrstuvwxyz", Dt = !0;
    function F(S, D) {
      var I, W, H, U, it, J, et, st, at = this;
      if (!(at instanceof F)) return new F(S, D);
      if (D == null) {
        if (S && S._isBigNumber === !0) {
          at.s = S.s, !S.c || S.e > O ? at.c = at.e = null : S.e < z ? at.c = [at.e = 0] : (at.e = S.e, at.c = S.c.slice());
          return;
        }
        if ((J = typeof S == "number") && S * 0 == 0) {
          if (at.s = 1 / S < 0 ? (S = -S, -1) : 1, S === ~~S) {
            for (U = 0, it = S; it >= 10; it /= 10, U++) ;
            U > O ? at.c = at.e = null : (at.e = U, at.c = [S]);
            return;
          }
          st = String(S);
        } else {
          if (!Cs.test(st = String(S))) return a(at, st, J);
          at.s = st.charCodeAt(0) == 45 ? (st = st.slice(1), -1) : 1;
        }
        (U = st.indexOf(".")) > -1 && (st = st.replace(".", "")), (it = st.search(/e/i)) > 0 ? (U < 0 && (U = it), U += +st.slice(it + 1), st = st.substring(0, it)) : U < 0 && (U = st.length);
      } else {
        if (Me(D, 2, kt.length, "Base"), D == 10 && Dt) return at = new F(S), xt(at, f + at.e + 1, _);
        if (st = String(S), J = typeof S == "number") {
          if (S * 0 != 0) return a(at, st, J, D);
          if (at.s = 1 / S < 0 ? (st = st.slice(1), -1) : 1, F.DEBUG && st.replace(/^0\.0*|\./, "").length > 15) throw Error(Es + S);
        } else at.s = st.charCodeAt(0) === 45 ? (st = st.slice(1), -1) : 1;
        for (I = kt.slice(0, D), U = it = 0, et = st.length; it < et; it++) if (I.indexOf(W = st.charAt(it)) < 0) {
          if (W == ".") {
            if (it > U) {
              U = et;
              continue;
            }
          } else if (!H && (st == st.toUpperCase() && (st = st.toLowerCase()) || st == st.toLowerCase() && (st = st.toUpperCase()))) {
            H = !0, it = -1, U = 0;
            continue;
          }
          return a(at, String(S), J, D);
        }
        J = !1, st = r(st, D, 10, at.s), (U = st.indexOf(".")) > -1 ? st = st.replace(".", "") : U = st.length;
      }
      for (it = 0; st.charCodeAt(it) === 48; it++) ;
      for (et = st.length; st.charCodeAt(--et) === 48; ) ;
      if (st = st.slice(it, ++et)) {
        if (et -= it, J && F.DEBUG && et > 15 && (S > xr || S !== Ue(S))) throw Error(Es + at.s * S);
        if ((U = U - it - 1) > O) at.c = at.e = null;
        else if (U < z) at.c = [at.e = 0];
        else {
          if (at.e = U, at.c = [], it = (U + 1) % Wt, U < 0 && (it += Wt), it < et) {
            for (it && at.c.push(+st.slice(0, it)), et -= Wt; it < et; ) at.c.push(+st.slice(it, it += Wt));
            it = Wt - (st = st.slice(it)).length;
          } else it -= et;
          for (; it--; st += "0") ;
          at.c.push(+st);
        }
      } else at.c = [at.e = 0];
    }
    F.clone = al, F.ROUND_UP = 0, F.ROUND_DOWN = 1, F.ROUND_CEIL = 2, F.ROUND_FLOOR = 3, F.ROUND_HALF_UP = 4, F.ROUND_HALF_DOWN = 5, F.ROUND_HALF_EVEN = 6, F.ROUND_HALF_CEIL = 7, F.ROUND_HALF_FLOOR = 8, F.EUCLID = 9, F.config = F.set = function(S) {
      var D, I;
      if (S != null) if (typeof S == "object") {
        if (S.hasOwnProperty(D = "DECIMAL_PLACES") && (I = S[D], Me(I, 0, Re, D), f = I), S.hasOwnProperty(D = "ROUNDING_MODE") && (I = S[D], Me(I, 0, 8, D), _ = I), S.hasOwnProperty(D = "EXPONENTIAL_AT") && (I = S[D], I && I.pop ? (Me(I[0], -Re, 0, D), Me(I[1], 0, Re, D), k = I[0], C = I[1]) : (Me(I, -Re, Re, D), k = -(C = I < 0 ? -I : I))), S.hasOwnProperty(D = "RANGE")) if (I = S[D], I && I.pop) Me(I[0], -Re, -1, D), Me(I[1], 1, Re, D), z = I[0], O = I[1];
        else if (Me(I, -Re, Re, D), I) z = -(O = I < 0 ? -I : I);
        else throw Error(Ke + D + " cannot be zero: " + I);
        if (S.hasOwnProperty(D = "CRYPTO")) if (I = S[D], I === !!I) if (I) if (typeof crypto < "u" && crypto && (crypto.getRandomValues || crypto.randomBytes)) K = I;
        else throw K = !I, Error(Ke + "crypto unavailable");
        else K = I;
        else throw Error(Ke + D + " not true or false: " + I);
        if (S.hasOwnProperty(D = "MODULO_MODE") && (I = S[D], Me(I, 0, 9, D), tt = I), S.hasOwnProperty(D = "POW_PRECISION") && (I = S[D], Me(I, 0, Re, D), ft = I), S.hasOwnProperty(D = "FORMAT")) if (I = S[D], typeof I == "object") yt = I;
        else throw Error(Ke + D + " not an object: " + I);
        if (S.hasOwnProperty(D = "ALPHABET")) if (I = S[D], typeof I == "string" && !/^.?$|[+\-.\s]|(.).*\1/.test(I)) Dt = I.slice(0, 10) == "0123456789", kt = I;
        else throw Error(Ke + D + " invalid: " + I);
      } else throw Error(Ke + "Object expected: " + S);
      return { DECIMAL_PLACES: f, ROUNDING_MODE: _, EXPONENTIAL_AT: [k, C], RANGE: [z, O], CRYPTO: K, MODULO_MODE: tt, POW_PRECISION: ft, FORMAT: yt, ALPHABET: kt };
    }, F.isBigNumber = function(S) {
      if (!S || S._isBigNumber !== !0) return !1;
      if (!F.DEBUG) return !0;
      var D, I, W = S.c, H = S.e, U = S.s;
      t: if ({}.toString.call(W) == "[object Array]") {
        if ((U === 1 || U === -1) && H >= -Re && H <= Re && H === Ue(H)) {
          if (W[0] === 0) {
            if (H === 0 && W.length === 1) return !0;
            break t;
          }
          if (D = (H + 1) % Wt, D < 1 && (D += Wt), String(W[0]).length == D) {
            for (D = 0; D < W.length; D++) if (I = W[D], I < 0 || I >= fi || I !== Ue(I)) break t;
            if (I !== 0) return !0;
          }
        }
      } else if (W === null && H === null && (U === null || U === 1 || U === -1)) return !0;
      throw Error(Ke + "Invalid BigNumber: " + S);
    }, F.maximum = F.max = function() {
      return dt(arguments, -1);
    }, F.minimum = F.min = function() {
      return dt(arguments, 1);
    }, F.random = function() {
      var S = 9007199254740992, D = Math.random() * S & 2097151 ? function() {
        return Ue(Math.random() * S);
      } : function() {
        return (Math.random() * 1073741824 | 0) * 8388608 + (Math.random() * 8388608 | 0);
      };
      return function(I) {
        var W, H, U, it, J, et = 0, st = [], at = new F(h);
        if (I == null ? I = f : Me(I, 0, Re), it = Ce(I / Wt), K) if (crypto.getRandomValues) {
          for (W = crypto.getRandomValues(new Uint32Array(it *= 2)); et < it; ) J = W[et] * 131072 + (W[et + 1] >>> 11), J >= 9e15 ? (H = crypto.getRandomValues(new Uint32Array(2)), W[et] = H[0], W[et + 1] = H[1]) : (st.push(J % 1e14), et += 2);
          et = it / 2;
        } else if (crypto.randomBytes) {
          for (W = crypto.randomBytes(it *= 7); et < it; ) J = (W[et] & 31) * 281474976710656 + W[et + 1] * 1099511627776 + W[et + 2] * 4294967296 + W[et + 3] * 16777216 + (W[et + 4] << 16) + (W[et + 5] << 8) + W[et + 6], J >= 9e15 ? crypto.randomBytes(7).copy(W, et) : (st.push(J % 1e14), et += 7);
          et = it / 7;
        } else throw K = !1, Error(Ke + "crypto unavailable");
        if (!K) for (; et < it; ) J = D(), J < 9e15 && (st[et++] = J % 1e14);
        for (it = st[--et], I %= Wt, it && I && (J = da[Wt - I], st[et] = Ue(it / J) * J); st[et] === 0; st.pop(), et--) ;
        if (et < 0) st = [U = 0];
        else {
          for (U = -1; st[0] === 0; st.splice(0, 1), U -= Wt) ;
          for (et = 1, J = st[0]; J >= 10; J /= 10, et++) ;
          et < Wt && (U -= Wt - et);
        }
        return at.e = U, at.c = st, at;
      };
    }(), F.sum = function() {
      for (var S = 1, D = arguments, I = new F(D[0]); S < D.length; ) I = I.plus(D[S++]);
      return I;
    }, r = /* @__PURE__ */ function() {
      var S = "0123456789";
      function D(I, W, H, U) {
        for (var it, J = [0], et, st = 0, at = I.length; st < at; ) {
          for (et = J.length; et--; J[et] *= W) ;
          for (J[0] += U.indexOf(I.charAt(st++)), it = 0; it < J.length; it++) J[it] > H - 1 && (J[it + 1] == null && (J[it + 1] = 0), J[it + 1] += J[it] / H | 0, J[it] %= H);
        }
        return J.reverse();
      }
      return function(I, W, H, U, it) {
        var J, et, st, at, _t, Vt, $t, te, Se = I.indexOf("."), Fe = f, me = _;
        for (Se >= 0 && (at = ft, ft = 0, I = I.replace(".", ""), te = new F(W), Vt = te.pow(I.length - Se), ft = at, te.c = D(on(ki(Vt.c), Vt.e, "0"), 10, H, S), te.e = te.c.length), $t = D(I, W, H, it ? (J = kt, S) : (J = S, kt)), st = at = $t.length; $t[--at] == 0; $t.pop()) ;
        if (!$t[0]) return J.charAt(0);
        if (Se < 0 ? --st : (Vt.c = $t, Vt.e = st, Vt.s = U, Vt = i(Vt, te, Fe, me, H), $t = Vt.c, _t = Vt.r, st = Vt.e), et = st + Fe + 1, Se = $t[et], at = H / 2, _t = _t || et < 0 || $t[et + 1] != null, _t = me < 4 ? (Se != null || _t) && (me == 0 || me == (Vt.s < 0 ? 3 : 2)) : Se > at || Se == at && (me == 4 || _t || me == 6 && $t[et - 1] & 1 || me == (Vt.s < 0 ? 8 : 7)), et < 1 || !$t[0]) I = _t ? on(J.charAt(1), -Fe, J.charAt(0)) : J.charAt(0);
        else {
          if ($t.length = et, _t) for (--H; ++$t[--et] > H; ) $t[et] = 0, et || (++st, $t = [1].concat($t));
          for (at = $t.length; !$t[--at]; ) ;
          for (Se = 0, I = ""; Se <= at; I += J.charAt($t[Se++])) ;
          I = on(I, st, J.charAt(0));
        }
        return I;
      };
    }(), i = /* @__PURE__ */ function() {
      function S(W, H, U) {
        var it, J, et, st, at = 0, _t = W.length, Vt = H % Bn, $t = H / Bn | 0;
        for (W = W.slice(); _t--; ) et = W[_t] % Bn, st = W[_t] / Bn | 0, it = $t * et + st * Vt, J = Vt * et + it % Bn * Bn + at, at = (J / U | 0) + (it / Bn | 0) + $t * st, W[_t] = J % U;
        return at && (W = [at].concat(W)), W;
      }
      function D(W, H, U, it) {
        var J, et;
        if (U != it) et = U > it ? 1 : -1;
        else for (J = et = 0; J < U; J++) if (W[J] != H[J]) {
          et = W[J] > H[J] ? 1 : -1;
          break;
        }
        return et;
      }
      function I(W, H, U, it) {
        for (var J = 0; U--; ) W[U] -= J, J = W[U] < H[U] ? 1 : 0, W[U] = J * it + W[U] - H[U];
        for (; !W[0] && W.length > 1; W.splice(0, 1)) ;
      }
      return function(W, H, U, it, J) {
        var et, st, at, _t, Vt, $t, te, Se, Fe, me, xe, We, Rs, Fo, Ro, Ji, _a, Ci = W.s == H.s ? 1 : -1, ni = W.c, Pe = H.c;
        if (!ni || !ni[0] || !Pe || !Pe[0]) return new F(!W.s || !H.s || (ni ? Pe && ni[0] == Pe[0] : !Pe) ? NaN : ni && ni[0] == 0 || !Pe ? Ci * 0 : Ci / 0);
        for (Se = new F(Ci), Fe = Se.c = [], st = W.e - H.e, Ci = U + st + 1, J || (J = fi, st = Li(W.e / Wt) - Li(H.e / Wt), Ci = Ci / Wt | 0), at = 0; Pe[at] == (ni[at] || 0); at++) ;
        if (Pe[at] > (ni[at] || 0) && st--, Ci < 0) Fe.push(1), _t = !0;
        else {
          for (Fo = ni.length, Ji = Pe.length, at = 0, Ci += 2, Vt = Ue(J / (Pe[0] + 1)), Vt > 1 && (Pe = S(Pe, Vt, J), ni = S(ni, Vt, J), Ji = Pe.length, Fo = ni.length), Rs = Ji, me = ni.slice(0, Ji), xe = me.length; xe < Ji; me[xe++] = 0) ;
          _a = Pe.slice(), _a = [0].concat(_a), Ro = Pe[0], Pe[1] >= J / 2 && Ro++;
          do {
            if (Vt = 0, et = D(Pe, me, Ji, xe), et < 0) {
              if (We = me[0], Ji != xe && (We = We * J + (me[1] || 0)), Vt = Ue(We / Ro), Vt > 1) for (Vt >= J && (Vt = J - 1), $t = S(Pe, Vt, J), te = $t.length, xe = me.length; D($t, me, te, xe) == 1; ) Vt--, I($t, Ji < te ? _a : Pe, te, J), te = $t.length, et = 1;
              else Vt == 0 && (et = Vt = 1), $t = Pe.slice(), te = $t.length;
              if (te < xe && ($t = [0].concat($t)), I(me, $t, xe, J), xe = me.length, et == -1) for (; D(Pe, me, Ji, xe) < 1; ) Vt++, I(me, Ji < xe ? _a : Pe, xe, J), xe = me.length;
            } else et === 0 && (Vt++, me = [0]);
            Fe[at++] = Vt, me[0] ? me[xe++] = ni[Rs] || 0 : (me = [ni[Rs]], xe = 1);
          } while ((Rs++ < Fo || me[0] != null) && Ci--);
          _t = me[0] != null, Fe[0] || Fe.splice(0, 1);
        }
        if (J == fi) {
          for (at = 1, Ci = Fe[0]; Ci >= 10; Ci /= 10, at++) ;
          xt(Se, U + (Se.e = at + st * Wt - 1) + 1, it, _t);
        } else Se.e = st, Se.r = +_t;
        return Se;
      };
    }();
    function nt(S, D, I, W) {
      var H, U, it, J, et;
      if (I == null ? I = _ : Me(I, 0, 8), !S.c) return S.toString();
      if (H = S.c[0], it = S.e, D == null) et = ki(S.c), et = W == 1 || W == 2 && (it <= k || it >= C) ? Bs(et, it) : on(et, it, "0");
      else if (S = xt(new F(S), D, I), U = S.e, et = ki(S.c), J = et.length, W == 1 || W == 2 && (D <= U || U <= k)) {
        for (; J < D; et += "0", J++) ;
        et = Bs(et, U);
      } else if (D -= it + (W === 2 && U > it), et = on(et, U, "0"), U + 1 > J) {
        if (--D > 0) for (et += "."; D--; et += "0") ;
      } else if (D += U - J, D > 0) for (U + 1 == J && (et += "."); D--; et += "0") ;
      return S.s < 0 && H ? "-" + et : et;
    }
    function dt(S, D) {
      for (var I, W, H = 1, U = new F(S[0]); H < S.length; H++) W = new F(S[H]), (!W.s || (I = Hn(U, W)) === D || I === 0 && U.s === D) && (U = W);
      return U;
    }
    function wt(S, D, I) {
      for (var W = 1, H = D.length; !D[--H]; D.pop()) ;
      for (H = D[0]; H >= 10; H /= 10, W++) ;
      return (I = W + I * Wt - 1) > O ? S.c = S.e = null : I < z ? S.c = [S.e = 0] : (S.e = I, S.c = D), S;
    }
    a = /* @__PURE__ */ function() {
      var S = /^(-?)0([xbo])(?=\w[\w.]*$)/i, D = /^([^.]+)\.$/, I = /^\.([^.]+)$/, W = /^-?(Infinity|NaN)$/, H = /^\s*\+(?=[\w.])|^\s+|\s+$/g;
      return function(U, it, J, et) {
        var st, at = J ? it : it.replace(H, "");
        if (W.test(at)) U.s = isNaN(at) ? null : at < 0 ? -1 : 1;
        else {
          if (!J && (at = at.replace(S, function(_t, Vt, $t) {
            return st = ($t = $t.toLowerCase()) == "x" ? 16 : $t == "b" ? 2 : 8, !et || et == st ? Vt : _t;
          }), et && (st = et, at = at.replace(D, "$1").replace(I, "0.$1")), it != at)) return new F(at, st);
          if (F.DEBUG) throw Error(Ke + "Not a" + (et ? " base " + et : "") + " number: " + it);
          U.s = null;
        }
        U.c = U.e = null;
      };
    }();
    function xt(S, D, I, W) {
      var H, U, it, J, et, st, at, _t = S.c, Vt = da;
      if (_t) {
        t: {
          for (H = 1, J = _t[0]; J >= 10; J /= 10, H++) ;
          if (U = D - H, U < 0) U += Wt, it = D, et = _t[st = 0], at = Ue(et / Vt[H - it - 1] % 10);
          else if (st = Ce((U + 1) / Wt), st >= _t.length) if (W) {
            for (; _t.length <= st; _t.push(0)) ;
            et = at = 0, H = 1, U %= Wt, it = U - Wt + 1;
          } else break t;
          else {
            for (et = J = _t[st], H = 1; J >= 10; J /= 10, H++) ;
            U %= Wt, it = U - Wt + H, at = it < 0 ? 0 : Ue(et / Vt[H - it - 1] % 10);
          }
          if (W = W || D < 0 || _t[st + 1] != null || (it < 0 ? et : et % Vt[H - it - 1]), W = I < 4 ? (at || W) && (I == 0 || I == (S.s < 0 ? 3 : 2)) : at > 5 || at == 5 && (I == 4 || W || I == 6 && (U > 0 ? it > 0 ? et / Vt[H - it] : 0 : _t[st - 1]) % 10 & 1 || I == (S.s < 0 ? 8 : 7)), D < 1 || !_t[0]) return _t.length = 0, W ? (D -= S.e + 1, _t[0] = Vt[(Wt - D % Wt) % Wt], S.e = -D || 0) : _t[0] = S.e = 0, S;
          if (U == 0 ? (_t.length = st, J = 1, st--) : (_t.length = st + 1, J = Vt[Wt - U], _t[st] = it > 0 ? Ue(et / Vt[H - it] % Vt[it]) * J : 0), W) for (; ; ) if (st == 0) {
            for (U = 1, it = _t[0]; it >= 10; it /= 10, U++) ;
            for (it = _t[0] += J, J = 1; it >= 10; it /= 10, J++) ;
            U != J && (S.e++, _t[0] == fi && (_t[0] = 1));
            break;
          } else {
            if (_t[st] += J, _t[st] != fi) break;
            _t[st--] = 0, J = 1;
          }
          for (U = _t.length; _t[--U] === 0; _t.pop()) ;
        }
        S.e > O ? S.c = S.e = null : S.e < z && (S.c = [S.e = 0]);
      }
      return S;
    }
    function Lt(S) {
      var D, I = S.e;
      return I === null ? S.toString() : (D = ki(S.c), D = I <= k || I >= C ? Bs(D, I) : on(D, I, "0"), S.s < 0 ? "-" + D : D);
    }
    return o.absoluteValue = o.abs = function() {
      var S = new F(this);
      return S.s < 0 && (S.s = 1), S;
    }, o.comparedTo = function(S, D) {
      return Hn(this, new F(S, D));
    }, o.decimalPlaces = o.dp = function(S, D) {
      var I, W, H, U = this;
      if (S != null) return Me(S, 0, Re), D == null ? D = _ : Me(D, 0, 8), xt(new F(U), S + U.e + 1, D);
      if (!(I = U.c)) return null;
      if (W = ((H = I.length - 1) - Li(this.e / Wt)) * Wt, H = I[H]) for (; H % 10 == 0; H /= 10, W--) ;
      return W < 0 && (W = 0), W;
    }, o.dividedBy = o.div = function(S, D) {
      return i(this, new F(S, D), f, _);
    }, o.dividedToIntegerBy = o.idiv = function(S, D) {
      return i(this, new F(S, D), 0, 1);
    }, o.exponentiatedBy = o.pow = function(S, D) {
      var I, W, H, U, it, J, et, st, at, _t = this;
      if (S = new F(S), S.c && !S.isInteger()) throw Error(Ke + "Exponent not an integer: " + Lt(S));
      if (D != null && (D = new F(D)), J = S.e > 14, !_t.c || !_t.c[0] || _t.c[0] == 1 && !_t.e && _t.c.length == 1 || !S.c || !S.c[0]) return at = new F(Math.pow(+Lt(_t), J ? S.s * (2 - Ms(S)) : +Lt(S))), D ? at.mod(D) : at;
      if (et = S.s < 0, D) {
        if (D.c ? !D.c[0] : !D.s) return new F(NaN);
        W = !et && _t.isInteger() && D.isInteger(), W && (_t = _t.mod(D));
      } else {
        if (S.e > 9 && (_t.e > 0 || _t.e < -1 || (_t.e == 0 ? _t.c[0] > 1 || J && _t.c[1] >= 24e7 : _t.c[0] < 8e13 || J && _t.c[0] <= 9999975e7))) return U = _t.s < 0 && Ms(S) ? -0 : 0, _t.e > -1 && (U = 1 / U), new F(et ? 1 / U : U);
        ft && (U = Ce(ft / Wt + 2));
      }
      for (J ? (I = new F(0.5), et && (S.s = 1), st = Ms(S)) : (H = Math.abs(+Lt(S)), st = H % 2), at = new F(h); ; ) {
        if (st) {
          if (at = at.times(_t), !at.c) break;
          U ? at.c.length > U && (at.c.length = U) : W && (at = at.mod(D));
        }
        if (H) {
          if (H = Ue(H / 2), H === 0) break;
          st = H % 2;
        } else if (S = S.times(I), xt(S, S.e + 1, 1), S.e > 14) st = Ms(S);
        else {
          if (H = +Lt(S), H === 0) break;
          st = H % 2;
        }
        _t = _t.times(_t), U ? _t.c && _t.c.length > U && (_t.c.length = U) : W && (_t = _t.mod(D));
      }
      return W ? at : (et && (at = h.div(at)), D ? at.mod(D) : U ? xt(at, ft, _, it) : at);
    }, o.integerValue = function(S) {
      var D = new F(this);
      return S == null ? S = _ : Me(S, 0, 8), xt(D, D.e + 1, S);
    }, o.isEqualTo = o.eq = function(S, D) {
      return Hn(this, new F(S, D)) === 0;
    }, o.isFinite = function() {
      return !!this.c;
    }, o.isGreaterThan = o.gt = function(S, D) {
      return Hn(this, new F(S, D)) > 0;
    }, o.isGreaterThanOrEqualTo = o.gte = function(S, D) {
      return (D = Hn(this, new F(S, D))) === 1 || D === 0;
    }, o.isInteger = function() {
      return !!this.c && Li(this.e / Wt) > this.c.length - 2;
    }, o.isLessThan = o.lt = function(S, D) {
      return Hn(this, new F(S, D)) < 0;
    }, o.isLessThanOrEqualTo = o.lte = function(S, D) {
      return (D = Hn(this, new F(S, D))) === -1 || D === 0;
    }, o.isNaN = function() {
      return !this.s;
    }, o.isNegative = function() {
      return this.s < 0;
    }, o.isPositive = function() {
      return this.s > 0;
    }, o.isZero = function() {
      return !!this.c && this.c[0] == 0;
    }, o.minus = function(S, D) {
      var I, W, H, U, it = this, J = it.s;
      if (S = new F(S, D), D = S.s, !J || !D) return new F(NaN);
      if (J != D) return S.s = -D, it.plus(S);
      var et = it.e / Wt, st = S.e / Wt, at = it.c, _t = S.c;
      if (!et || !st) {
        if (!at || !_t) return at ? (S.s = -D, S) : new F(_t ? it : NaN);
        if (!at[0] || !_t[0]) return _t[0] ? (S.s = -D, S) : new F(at[0] ? it : _ == 3 ? -0 : 0);
      }
      if (et = Li(et), st = Li(st), at = at.slice(), J = et - st) {
        for ((U = J < 0) ? (J = -J, H = at) : (st = et, H = _t), H.reverse(), D = J; D--; H.push(0)) ;
        H.reverse();
      } else for (W = (U = (J = at.length) < (D = _t.length)) ? J : D, J = D = 0; D < W; D++) if (at[D] != _t[D]) {
        U = at[D] < _t[D];
        break;
      }
      if (U && (H = at, at = _t, _t = H, S.s = -S.s), D = (W = _t.length) - (I = at.length), D > 0) for (; D--; at[I++] = 0) ;
      for (D = fi - 1; W > J; ) {
        if (at[--W] < _t[W]) {
          for (I = W; I && !at[--I]; at[I] = D) ;
          --at[I], at[W] += fi;
        }
        at[W] -= _t[W];
      }
      for (; at[0] == 0; at.splice(0, 1), --st) ;
      return at[0] ? wt(S, at, st) : (S.s = _ == 3 ? -1 : 1, S.c = [S.e = 0], S);
    }, o.modulo = o.mod = function(S, D) {
      var I, W, H = this;
      return S = new F(S, D), !H.c || !S.s || S.c && !S.c[0] ? new F(NaN) : !S.c || H.c && !H.c[0] ? new F(H) : (tt == 9 ? (W = S.s, S.s = 1, I = i(H, S, 0, 3), S.s = W, I.s *= W) : I = i(H, S, 0, tt), S = H.minus(I.times(S)), !S.c[0] && tt == 1 && (S.s = H.s), S);
    }, o.multipliedBy = o.times = function(S, D) {
      var I, W, H, U, it, J, et, st, at, _t, Vt, $t, te, Se, Fe, me = this, xe = me.c, We = (S = new F(S, D)).c;
      if (!xe || !We || !xe[0] || !We[0]) return !me.s || !S.s || xe && !xe[0] && !We || We && !We[0] && !xe ? S.c = S.e = S.s = null : (S.s *= me.s, !xe || !We ? S.c = S.e = null : (S.c = [0], S.e = 0)), S;
      for (W = Li(me.e / Wt) + Li(S.e / Wt), S.s *= me.s, et = xe.length, _t = We.length, et < _t && (te = xe, xe = We, We = te, H = et, et = _t, _t = H), H = et + _t, te = []; H--; te.push(0)) ;
      for (Se = fi, Fe = Bn, H = _t; --H >= 0; ) {
        for (I = 0, Vt = We[H] % Fe, $t = We[H] / Fe | 0, it = et, U = H + it; U > H; ) st = xe[--it] % Fe, at = xe[it] / Fe | 0, J = $t * st + at * Vt, st = Vt * st + J % Fe * Fe + te[U] + I, I = (st / Se | 0) + (J / Fe | 0) + $t * at, te[U--] = st % Se;
        te[U] = I;
      }
      return I ? ++W : te.splice(0, 1), wt(S, te, W);
    }, o.negated = function() {
      var S = new F(this);
      return S.s = -S.s || null, S;
    }, o.plus = function(S, D) {
      var I, W = this, H = W.s;
      if (S = new F(S, D), D = S.s, !H || !D) return new F(NaN);
      if (H != D) return S.s = -D, W.minus(S);
      var U = W.e / Wt, it = S.e / Wt, J = W.c, et = S.c;
      if (!U || !it) {
        if (!J || !et) return new F(H / 0);
        if (!J[0] || !et[0]) return et[0] ? S : new F(J[0] ? W : H * 0);
      }
      if (U = Li(U), it = Li(it), J = J.slice(), H = U - it) {
        for (H > 0 ? (it = U, I = et) : (H = -H, I = J), I.reverse(); H--; I.push(0)) ;
        I.reverse();
      }
      for (H = J.length, D = et.length, H - D < 0 && (I = et, et = J, J = I, D = H), H = 0; D; ) H = (J[--D] = J[D] + et[D] + H) / fi | 0, J[D] = fi === J[D] ? 0 : J[D] % fi;
      return H && (J = [H].concat(J), ++it), wt(S, J, it);
    }, o.precision = o.sd = function(S, D) {
      var I, W, H, U = this;
      if (S != null && S !== !!S) return Me(S, 1, Re), D == null ? D = _ : Me(D, 0, 8), xt(new F(U), S, D);
      if (!(I = U.c)) return null;
      if (H = I.length - 1, W = H * Wt + 1, H = I[H]) {
        for (; H % 10 == 0; H /= 10, W--) ;
        for (H = I[0]; H >= 10; H /= 10, W++) ;
      }
      return S && U.e + 1 > W && (W = U.e + 1), W;
    }, o.shiftedBy = function(S) {
      return Me(S, -xr, xr), this.times("1e" + S);
    }, o.squareRoot = o.sqrt = function() {
      var S, D, I, W, H, U = this, it = U.c, J = U.s, et = U.e, st = f + 4, at = new F("0.5");
      if (J !== 1 || !it || !it[0]) return new F(!J || J < 0 && (!it || it[0]) ? NaN : it ? U : 1 / 0);
      if (J = Math.sqrt(+Lt(U)), J == 0 || J == 1 / 0 ? (D = ki(it), (D.length + et) % 2 == 0 && (D += "0"), J = Math.sqrt(+D), et = Li((et + 1) / 2) - (et < 0 || et % 2), J == 1 / 0 ? D = "5e" + et : (D = J.toExponential(), D = D.slice(0, D.indexOf("e") + 1) + et), I = new F(D)) : I = new F(J + ""), I.c[0]) {
        for (et = I.e, J = et + st, J < 3 && (J = 0); ; ) if (H = I, I = at.times(H.plus(i(U, H, st, 1))), ki(H.c).slice(0, J) === (D = ki(I.c)).slice(0, J)) if (I.e < et && --J, D = D.slice(J - 3, J + 1), D == "9999" || !W && D == "4999") {
          if (!W && (xt(H, H.e + f + 2, 0), H.times(H).eq(U))) {
            I = H;
            break;
          }
          st += 4, J += 4, W = 1;
        } else {
          (!+D || !+D.slice(1) && D.charAt(0) == "5") && (xt(I, I.e + f + 2, 1), S = !I.times(I).eq(U));
          break;
        }
      }
      return xt(I, I.e + f + 1, _, S);
    }, o.toExponential = function(S, D) {
      return S != null && (Me(S, 0, Re), S++), nt(this, S, D, 1);
    }, o.toFixed = function(S, D) {
      return S != null && (Me(S, 0, Re), S = S + this.e + 1), nt(this, S, D);
    }, o.toFormat = function(S, D, I) {
      var W, H = this;
      if (I == null) S != null && D && typeof D == "object" ? (I = D, D = null) : S && typeof S == "object" ? (I = S, S = D = null) : I = yt;
      else if (typeof I != "object") throw Error(Ke + "Argument not an object: " + I);
      if (W = H.toFixed(S, D), H.c) {
        var U, it = W.split("."), J = +I.groupSize, et = +I.secondaryGroupSize, st = I.groupSeparator || "", at = it[0], _t = it[1], Vt = H.s < 0, $t = Vt ? at.slice(1) : at, te = $t.length;
        if (et && (U = J, J = et, et = U, te -= U), J > 0 && te > 0) {
          for (U = te % J || J, at = $t.substr(0, U); U < te; U += J) at += st + $t.substr(U, J);
          et > 0 && (at += st + $t.slice(U)), Vt && (at = "-" + at);
        }
        W = _t ? at + (I.decimalSeparator || "") + ((et = +I.fractionGroupSize) ? _t.replace(new RegExp("\\d{" + et + "}\\B", "g"), "$&" + (I.fractionGroupSeparator || "")) : _t) : at;
      }
      return (I.prefix || "") + W + (I.suffix || "");
    }, o.toFraction = function(S) {
      var D, I, W, H, U, it, J, et, st, at, _t, Vt, $t = this, te = $t.c;
      if (S != null && (J = new F(S), !J.isInteger() && (J.c || J.s !== 1) || J.lt(h))) throw Error(Ke + "Argument " + (J.isInteger() ? "out of range: " : "not an integer: ") + Lt(J));
      if (!te) return new F($t);
      for (D = new F(h), st = I = new F(h), W = et = new F(h), Vt = ki(te), U = D.e = Vt.length - $t.e - 1, D.c[0] = da[(it = U % Wt) < 0 ? Wt + it : it], S = !S || J.comparedTo(D) > 0 ? U > 0 ? D : st : J, it = O, O = 1 / 0, J = new F(Vt), et.c[0] = 0; at = i(J, D, 0, 1), H = I.plus(at.times(W)), H.comparedTo(S) != 1; ) I = W, W = H, st = et.plus(at.times(H = st)), et = H, D = J.minus(at.times(H = D)), J = H;
      return H = i(S.minus(I), W, 0, 1), et = et.plus(H.times(st)), I = I.plus(H.times(W)), et.s = st.s = $t.s, U = U * 2, _t = i(st, W, U, _).minus($t).abs().comparedTo(i(et, I, U, _).minus($t).abs()) < 1 ? [st, W] : [et, I], O = it, _t;
    }, o.toNumber = function() {
      return +Lt(this);
    }, o.toPrecision = function(S, D) {
      return S != null && Me(S, 1, Re), nt(this, S, D, 2);
    }, o.toString = function(S) {
      var D, I = this, W = I.s, H = I.e;
      return H === null ? W ? (D = "Infinity", W < 0 && (D = "-" + D)) : D = "NaN" : (S == null ? D = H <= k || H >= C ? Bs(ki(I.c), H) : on(ki(I.c), H, "0") : S === 10 && Dt ? (I = xt(new F(I), f + H + 1, _), D = on(ki(I.c), I.e, "0")) : (Me(S, 2, kt.length, "Base"), D = r(on(ki(I.c), H, "0"), 10, S, W, !0)), W < 0 && I.c[0] && (D = "-" + D)), D;
    }, o.valueOf = o.toJSON = function() {
      return Lt(this);
    }, o._isBigNumber = !0, o[Symbol.toStringTag] = "BigNumber", o[Symbol.for("nodejs.util.inspect.custom")] = o.valueOf, e != null && F.set(e), F;
  }
  function Li(e) {
    var i = e | 0;
    return e > 0 || e === i ? i : i - 1;
  }
  function ki(e) {
    for (var i, r, a = 1, o = e.length, h = e[0] + ""; a < o; ) {
      for (i = e[a++] + "", r = Wt - i.length; r--; i = "0" + i) ;
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
  function Me(e, i, r, a) {
    if (e < i || e > r || e !== Ue(e)) throw Error(Ke + (a || "Argument") + (typeof e == "number" ? e < i || e > r ? " out of range: " : " not an integer: " : " not a primitive number: ") + String(e));
  }
  function Ms(e) {
    var i = e.c.length - 1;
    return Li(e.e / Wt) == i && e.c[i] % 2 != 0;
  }
  function Bs(e, i) {
    return (e.length > 1 ? e.charAt(0) + "." + e.slice(1) : e) + (i < 0 ? "e" : "e+") + i;
  }
  function on(e, i, r) {
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
  var mu = al(), Ki = mu, _u = class {
    constructor(e) {
      Gt(this, "key");
      Gt(this, "left", null);
      Gt(this, "right", null);
      this.key = e;
    }
  }, fa = class extends _u {
    constructor(e) {
      super(e);
    }
  }, gu = class {
    constructor() {
      Gt(this, "size", 0);
      Gt(this, "modificationCount", 0);
      Gt(this, "splayCount", 0);
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
  }, As = class Ea extends gu {
    constructor(r, a) {
      super();
      Gt(this, "root", null);
      Gt(this, "compare");
      Gt(this, "validKey");
      Gt(this, vl, "[object Set]");
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
      return a != 0 && this.addNewRoot(new fa(r), a), this;
    }
    addAndReturn(r) {
      let a = this.splay(r);
      return a != 0 && this.addNewRoot(new fa(r), a), this.root.key;
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
      let a = new Ea(this.compare, this.validKey), o = this.modificationCount;
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
      let a = new Ea(this.compare, this.validKey);
      for (let o of this) r.has(o) && a.add(o);
      return a;
    }
    difference(r) {
      let a = new Ea(this.compare, this.validKey);
      for (let o of this) r.has(o) || a.add(o);
      return a;
    }
    union(r) {
      let a = this.clone();
      return a.addAll(r), a;
    }
    clone() {
      let r = new Ea(this.compare, this.validKey);
      return r.size = this.size, r.root = this.copyNode(this.root), r;
    }
    copyNode(r) {
      if (r == null) return null;
      function a(h, f) {
        let _, k;
        do {
          if (_ = h.left, k = h.right, _ != null) {
            let C = new fa(_.key);
            f.left = C, a(_, C);
          }
          if (k != null) {
            let C = new fa(k.key);
            f.right = C, h = k, f = C;
          }
        } while (k != null);
      }
      let o = new fa(r.key);
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
      Gt(this, "tree");
      Gt(this, "path", new Array());
      Gt(this, "modificationCount", null);
      Gt(this, "splayCount");
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
  }, ol = (e) => () => e, To = (e) => {
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
      let i = new As(To(e)), r = new As(To(e)), a = (h, f) => f.addAndReturn(h), o = (h) => ({ x: a(h.x, i), y: a(h.y, r) });
      return o({ x: new Ki(0), y: new Ki(0) }), o;
    }
    return xu;
  }, Do = (e) => ({ set: (i) => {
    ln = Do(i);
  }, reset: () => Do(e), compare: To(e), snap: wu(e), orient: bu(e) }), ln = Do(), pa = (e, i) => e.ll.x.isLessThanOrEqualTo(i.x) && i.x.isLessThanOrEqualTo(e.ur.x) && e.ll.y.isLessThanOrEqualTo(i.y) && i.y.isLessThanOrEqualTo(e.ur.y), Oo = (e, i) => {
    if (i.ur.x.isLessThan(e.ll.x) || e.ur.x.isLessThan(i.ll.x) || i.ur.y.isLessThan(e.ll.y) || e.ur.y.isLessThan(i.ll.y)) return null;
    let r = e.ll.x.isLessThan(i.ll.x) ? i.ll.x : e.ll.x, a = e.ur.x.isLessThan(i.ur.x) ? e.ur.x : i.ur.x, o = e.ll.y.isLessThan(i.ll.y) ? i.ll.y : e.ll.y, h = e.ur.y.isLessThan(i.ur.y) ? e.ur.y : i.ur.y;
    return { ll: { x: r, y: o }, ur: { x: a, y: h } };
  }, Ss = (e, i) => e.x.times(i.y).minus(e.y.times(i.x)), ll = (e, i) => e.x.times(i.x).plus(e.y.times(i.y)), Ps = (e) => ll(e, e).sqrt(), Lu = (e, i, r) => {
    let a = { x: i.x.minus(e.x), y: i.y.minus(e.y) }, o = { x: r.x.minus(e.x), y: r.y.minus(e.y) };
    return Ss(o, a).div(Ps(o)).div(Ps(a));
  }, ku = (e, i, r) => {
    let a = { x: i.x.minus(e.x), y: i.y.minus(e.y) }, o = { x: r.x.minus(e.x), y: r.y.minus(e.y) };
    return ll(o, a).div(Ps(o)).div(Ps(a));
  }, ul = (e, i, r) => i.y.isZero() ? null : { x: e.x.plus(i.x.div(i.y).times(r.minus(e.y))), y: r }, hl = (e, i, r) => i.x.isZero() ? null : { x: r, y: e.y.plus(i.y.div(i.x).times(r.minus(e.x))) }, Cu = (e, i, r, a) => {
    if (i.x.isZero()) return hl(r, a, e.x);
    if (a.x.isZero()) return hl(e, i, r.x);
    if (i.y.isZero()) return ul(r, a, e.y);
    if (a.y.isZero()) return ul(e, i, r.y);
    let o = Ss(i, a);
    if (o.isZero()) return null;
    let h = { x: r.x.minus(e.x), y: r.y.minus(e.y) }, f = Ss(h, i).div(o), _ = Ss(h, a).div(o), k = e.x.plus(_.times(i.x)), C = r.x.plus(f.times(a.x)), z = e.y.plus(_.times(i.y)), O = r.y.plus(f.times(a.y)), K = k.plus(C).div(2), tt = z.plus(O).div(2);
    return { x: K, y: tt };
  }, Wi = class jl {
    constructor(i, r) {
      Gt(this, "point");
      Gt(this, "isLeft");
      Gt(this, "segment");
      Gt(this, "otherSE");
      Gt(this, "consumedBy");
      i.events === void 0 ? i.events = [this] : i.events.push(this), this.point = i, this.isLeft = r;
    }
    static compare(i, r) {
      let a = jl.comparePoints(i.point, r.point);
      return a !== 0 ? a : (i.point !== r.point && i.link(r), i.isLeft !== r.isLeft ? i.isLeft ? 1 : -1 : Ds.compare(i.segment, r.segment));
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
  }, Eu = class Go {
    constructor(i) {
      Gt(this, "events");
      Gt(this, "poly");
      Gt(this, "_isExteriorRing");
      Gt(this, "_enclosingRing");
      this.events = i;
      for (let r = 0, a = i.length; r < a; r++) i[r].segment.ringOut = this;
      this.poly = null;
    }
    static factory(i) {
      let r = [];
      for (let a = 0, o = i.length; a < o; a++) {
        let h = i[a];
        if (!h.isInResult() || h.ringOut) continue;
        let f = null, _ = h.leftSE, k = h.rightSE, C = [_], z = _.point, O = [];
        for (; f = _, _ = k, C.push(_), _.point !== z; ) for (; ; ) {
          let K = _.getAvailableLinkedEvents();
          if (K.length === 0) {
            let yt = C[0].point, kt = C[C.length - 1].point;
            throw new Error(`Unable to complete output ring starting at [${yt.x}, ${yt.y}]. Last matching segment found ends at [${kt.x}, ${kt.y}].`);
          }
          if (K.length === 1) {
            k = K[0].otherSE;
            break;
          }
          let tt = null;
          for (let yt = 0, kt = O.length; yt < kt; yt++) if (O[yt].point === _.point) {
            tt = yt;
            break;
          }
          if (tt !== null) {
            let yt = O.splice(tt)[0], kt = C.splice(yt.index);
            kt.unshift(kt[0].otherSE), r.push(new Go(kt.reverse()));
            continue;
          }
          O.push({ index: C.length, point: _.point });
          let ft = _.getLeftmostComparator(f);
          k = K.sort(ft)[0].otherSE;
          break;
        }
        r.push(new Go(C));
      }
      return r;
    }
    getGeom() {
      let i = this.events[0].point, r = [i];
      for (let C = 1, z = this.events.length - 1; C < z; C++) {
        let O = this.events[C].point, K = this.events[C + 1].point;
        ln.orient(O, i, K) !== 0 && (r.push(O), i = O);
      }
      if (r.length === 1) return null;
      let a = r[0], o = r[1];
      ln.orient(a, i, o) === 0 && r.shift(), r.push(r[0]);
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
      Gt(this, "exteriorRing");
      Gt(this, "interiorRings");
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
      Gt(this, "rings");
      Gt(this, "polys");
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
    constructor(e, i = Ds.compare) {
      Gt(this, "queue");
      Gt(this, "tree");
      Gt(this, "segments");
      this.queue = e, this.tree = new As(i), this.segments = [];
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
            for (let C = 0, z = k.length; C < z; C++) r.push(k[C]);
          }
        }
        let f = null;
        if (o) {
          let _ = o.getIntersection(i);
          if (_ !== null && (i.isAnEndpoint(_) || (f = _), !o.isAnEndpoint(_))) {
            let k = this._splitSafely(o, _);
            for (let C = 0, z = k.length; C < z; C++) r.push(k[C]);
          }
        }
        if (h !== null || f !== null) {
          let _ = null;
          h === null ? _ = f : f === null ? _ = h : _ = Wi.comparePoints(h, f) <= 0 ? h : f, this.queue.delete(i.rightSE), r.push(i.rightSE);
          let k = i.split(_);
          for (let C = 0, z = k.length; C < z; C++) r.push(k[C]);
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
      Gt(this, "type");
      Gt(this, "numMultiPolys");
    }
    run(e, i, r) {
      ma.type = e;
      let a = [new fl(i, !0)];
      for (let k = 0, C = r.length; k < C; k++) a.push(new fl(r[k], !1));
      if (ma.numMultiPolys = a.length, ma.type === "difference") {
        let k = a[0], C = 1;
        for (; C < a.length; ) Oo(a[C].bbox, k.bbox) !== null ? C++ : a.splice(C, 1);
      }
      if (ma.type === "intersection") for (let k = 0, C = a.length; k < C; k++) {
        let z = a[k];
        for (let O = k + 1, K = a.length; O < K; O++) if (Oo(z.bbox, a[O].bbox) === null) return [];
      }
      let o = new As(Wi.compare);
      for (let k = 0, C = a.length; k < C; k++) {
        let z = a[k].getSweepEvents();
        for (let O = 0, K = z.length; O < K; O++) o.add(z[O]);
      }
      let h = new Bu(o), f = null;
      for (o.size != 0 && (f = o.first(), o.delete(f)); f; ) {
        let k = h.process(f);
        for (let C = 0, z = k.length; C < z; C++) {
          let O = k[C];
          O.consumedBy === void 0 && o.add(O);
        }
        o.size != 0 ? (f = o.first(), o.delete(f)) : f = null;
      }
      ln.reset();
      let _ = Eu.factory(h.segments);
      return new Mu(_).getGeom();
    }
  }, ma = new Au(), Ts = ma, Su = 0, Ds = class Vs {
    constructor(i, r, a, o) {
      Gt(this, "id");
      Gt(this, "leftSE");
      Gt(this, "rightSE");
      Gt(this, "rings");
      Gt(this, "windings");
      Gt(this, "ringOut");
      Gt(this, "consumedBy");
      Gt(this, "prev");
      Gt(this, "_prevInResult");
      Gt(this, "_beforeState");
      Gt(this, "_afterState");
      Gt(this, "_isInResult");
      this.id = ++Su, this.leftSE = i, i.segment = this, i.otherSE = r, this.rightSE = r, r.segment = this, r.otherSE = i, this.rings = a, this.windings = o;
    }
    static compare(i, r) {
      let a = i.leftSE.point.x, o = r.leftSE.point.x, h = i.rightSE.point.x, f = r.rightSE.point.x;
      if (f.isLessThan(a)) return 1;
      if (h.isLessThan(o)) return -1;
      let _ = i.leftSE.point.y, k = r.leftSE.point.y, C = i.rightSE.point.y, z = r.rightSE.point.y;
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
        if (_.isLessThan(k) && _.isLessThan(z)) return -1;
        if (_.isGreaterThan(k) && _.isGreaterThan(z)) return 1;
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
        let O = C.minus(_), K = h.minus(a), tt = z.minus(k), ft = f.minus(o);
        if (O.isGreaterThan(K) && tt.isLessThan(ft)) return 1;
        if (O.isLessThan(K) && tt.isGreaterThan(ft)) return -1;
      }
      return h.isGreaterThan(f) ? 1 : h.isLessThan(f) || C.isLessThan(z) ? -1 : C.isGreaterThan(z) ? 1 : i.id < r.id ? -1 : i.id > r.id ? 1 : 0;
    }
    static fromRing(i, r, a) {
      let o, h, f, _ = Wi.comparePoints(i, r);
      if (_ < 0) o = i, h = r, f = 1;
      else if (_ > 0) o = r, h = i, f = -1;
      else throw new Error(`Tried to create degenerate segment at [${i.x}, ${i.y}]`);
      let k = new Wi(o, !0), C = new Wi(h, !1);
      return new Vs(k, C, [a], [f]);
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
      return ln.orient(this.leftSE.point, i, this.rightSE.point);
    }
    getIntersection(i) {
      let r = this.bbox(), a = i.bbox(), o = Oo(r, a);
      if (o === null) return null;
      let h = this.leftSE.point, f = this.rightSE.point, _ = i.leftSE.point, k = i.rightSE.point, C = pa(r, _) && this.comparePoint(_) === 0, z = pa(a, h) && i.comparePoint(h) === 0, O = pa(r, k) && this.comparePoint(k) === 0, K = pa(a, f) && i.comparePoint(f) === 0;
      if (z && C) return K && !O ? f : !K && O ? k : null;
      if (z) return O && h.x.eq(k.x) && h.y.eq(k.y) ? null : h;
      if (C) return K && f.x.eq(_.x) && f.y.eq(_.y) ? null : _;
      if (K && O) return null;
      if (K) return f;
      if (O) return k;
      let tt = Cu(h, this.vector(), _, i.vector());
      return tt === null || !pa(o, tt) ? null : ln.snap(tt);
    }
    split(i) {
      let r = [], a = i.events !== void 0, o = new Wi(i, !0), h = new Wi(i, !1), f = this.rightSE;
      this.replaceRightSE(h), r.push(h), r.push(o);
      let _ = new Vs(o, f, this.rings.slice(), this.windings.slice());
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
      let o = Vs.compare(r, a);
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
        let C = this.rings[_], z = this.windings[_], O = r.indexOf(C);
        O === -1 ? (r.push(C), a.push(z)) : a[O] += z;
      }
      let h = [], f = [];
      for (let _ = 0, k = r.length; _ < k; _++) {
        if (a[_] === 0) continue;
        let C = r[_], z = C.poly;
        if (f.indexOf(z) === -1) if (C.isExterior) h.push(z);
        else {
          f.indexOf(z) === -1 && f.push(z);
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
      switch (Ts.type) {
        case "union": {
          let a = i.length === 0, o = r.length === 0;
          this._isInResult = a !== o;
          break;
        }
        case "intersection": {
          let a, o;
          i.length < r.length ? (a = i.length, o = r.length) : (a = r.length, o = i.length), this._isInResult = o === Ts.numMultiPolys && a < o;
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
      Gt(this, "poly");
      Gt(this, "isExterior");
      Gt(this, "segments");
      Gt(this, "bbox");
      if (!Array.isArray(e) || e.length === 0) throw new Error("Input geometry is not a valid Polygon or MultiPolygon");
      if (this.poly = i, this.isExterior = r, this.segments = [], typeof e[0][0] != "number" || typeof e[0][1] != "number") throw new Error("Input geometry is not a valid Polygon or MultiPolygon");
      let a = ln.snap({ x: new Ki(e[0][0]), y: new Ki(e[0][1]) });
      this.bbox = { ll: { x: a.x, y: a.y }, ur: { x: a.x, y: a.y } };
      let o = a;
      for (let h = 1, f = e.length; h < f; h++) {
        if (typeof e[h][0] != "number" || typeof e[h][1] != "number") throw new Error("Input geometry is not a valid Polygon or MultiPolygon");
        let _ = ln.snap({ x: new Ki(e[h][0]), y: new Ki(e[h][1]) });
        _.x.eq(o.x) && _.y.eq(o.y) || (this.segments.push(Ds.fromRing(o, _, this)), _.x.isLessThan(this.bbox.ll.x) && (this.bbox.ll.x = _.x), _.y.isLessThan(this.bbox.ll.y) && (this.bbox.ll.y = _.y), _.x.isGreaterThan(this.bbox.ur.x) && (this.bbox.ur.x = _.x), _.y.isGreaterThan(this.bbox.ur.y) && (this.bbox.ur.y = _.y), o = _);
      }
      (!a.x.eq(o.x) || !a.y.eq(o.y)) && this.segments.push(Ds.fromRing(o, a, this));
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
      Gt(this, "multiPoly");
      Gt(this, "exteriorRing");
      Gt(this, "interiorRings");
      Gt(this, "bbox");
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
      Gt(this, "isSubject");
      Gt(this, "polys");
      Gt(this, "bbox");
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
  }, Tu = (e, ...i) => Ts.run("intersection", e, i), Du = (e, ...i) => Ts.run("difference", e, i);
  ln.set;
  function Os(e) {
    let i = { type: "Feature" };
    return i.geometry = e, i;
  }
  function Is(e) {
    return e.type === "Feature" ? e.geometry : e;
  }
  function pl(e) {
    return e && e.geometry && e.geometry.coordinates ? e.geometry.coordinates : e;
  }
  function Ou(e) {
    return Os({ type: "LineString", coordinates: e });
  }
  function Iu(e) {
    return Os({ type: "MultiLineString", coordinates: e });
  }
  function ml(e) {
    return Os({ type: "Polygon", coordinates: e });
  }
  function _l(e) {
    return Os({ type: "MultiPolygon", coordinates: e });
  }
  function Fu(e, i) {
    let r = Is(e), a = Is(i), o = Tu(r.coordinates, a.coordinates);
    return o.length === 0 ? null : o.length === 1 ? ml(o[0]) : _l(o);
  }
  function Ru(e, i) {
    let r = Is(e), a = Is(i), o = Du(r.coordinates, a.coordinates);
    return o.length === 0 ? null : o.length === 1 ? ml(o[0]) : _l(o);
  }
  function gl(e) {
    return Array.isArray(e) ? 1 + gl(e[0]) : -1;
  }
  function zu(e) {
    e instanceof L.Polyline && (e = e.toGeoJSON(15));
    let i = pl(e), r = gl(i), a = [];
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
  Te.Cut = Te.Polygon.extend({ initialize(e) {
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
            let { latlng: z } = C, O = this._calcClosestLayer(z, [o]);
            if (O && O.segment && O.distance < this.options.snapDistance) {
              let { segment: K } = O;
              if (K && K.length === 2) {
                let { indexPath: tt, parentPath: ft, newIndex: yt } = L.PM.Utils._getIndexFromSegment(k, K);
                (tt.length > 1 ? (0, Po.default)(k, ft) : k).splice(yt, 0, z);
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
        let f = Bo(h, e.toGeoJSON(15)), _;
        f && f.features.length > 0 ? _ = L.geoJSON(f) : _ = L.geoJSON(h), _.getLayers().forEach((k) => {
          ks(e.toGeoJSON(15), k.toGeoJSON(15)) || k.addTo(r);
        });
      }), o.length > 1 ? a = Nu(r) : a = r.toGeoJSON(15);
    }
    return a;
  }, _change: L.Util.falseFn }), Te.Text = Te.extend({ initialize(e) {
    this._map = e, this._shape = "Text", this.toolbarButtonName = "drawText";
  }, enable(e) {
    L.Util.setOptions(this, e), this._enabled = !0, this._map.on("click", this._createMarker, this), this._map.pm.Toolbar.toggleButton(this.toolbarButtonName, !0), this._hintMarker = L.marker(this._map.getCenter(), { interactive: !1, zIndexOffset: 100, icon: L.divIcon({ className: "marker-icon cursor-marker" }) }), this._setPane(this._hintMarker, "vertexPane"), this._hintMarker._pmTempLayer = !0, this._hintMarker.addTo(this._map), this.options.cursorMarker && L.DomUtil.addClass(this._hintMarker._icon, "visible"), this.options.tooltips && this._hintMarker.bindTooltip(he("tooltips.placeText"), { permanent: !0, offset: L.point(0, 10), direction: "bottom", opacity: 0.8 }).openTooltip(), this._layer = this._hintMarker, this._map.on("mousemove", this._syncHintMarker, this), this._map.getContainer().classList.add("geoman-draw-cursor"), this._fireDrawStart(), this._setGlobalDrawMode();
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
    this.disable(), this._layerDragEnabled = !0, this._map || (this._map = this._layer._map), (this._layer instanceof L.Marker || this._layer instanceof L.ImageOverlay) && L.DomEvent.on(this._getDOMElem(), "dragstart", this._stopDOMImageDrag), this._layer.dragging && this._layer.dragging.disable(), this._tempDragCoord = null, bn(this._layer) instanceof L.Canvas ? (this._layer.on("mouseout", this.removeDraggingClass, this), this._layer.on("mouseover", this.addDraggingClass, this)) : this.addDraggingClass(), this._originalMapDragState = this._layer._map.dragging._enabled, this._safeToCacheDragState = !0;
    let e = this._getDOMElem();
    e && (bn(this._layer) instanceof L.Canvas ? (this._layer.on("touchstart mousedown", this._dragMixinOnMouseDown, this), this._map.pm._addTouchEvents(e)) : L.DomEvent.on(e, "touchstart mousedown", this._simulateMouseDownEvent, this)), this._fireDragEnable();
  }, disableLayerDrag() {
    this._layerDragEnabled = !1, bn(this._layer) instanceof L.Canvas ? (this._layer.off("mouseout", this.removeDraggingClass, this), this._layer.off("mouseover", this.addDraggingClass, this)) : this.removeDraggingClass(), this._originalMapDragState && this._dragging && this._map.dragging.enable(), this._safeToCacheDragState = !1, this._layer.dragging && this._layer.dragging.disable();
    let e = this._getDOMElem();
    e && (bn(this._layer) instanceof L.Canvas ? (this._layer.off("touchstart mousedown", this._dragMixinOnMouseDown, this), this._map.pm._removeTouchEvents(e)) : L.DomEvent.off(e, "touchstart mousedown", this._simulateMouseDownEvent, this)), this._layerDragged && this._fireUpdate(), this._layerDragged = !1, this._fireDragDisable();
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
  } }, Vu = ju, $u = w(Vi());
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
  function wr(e, i) {
    i instanceof L.Layer && (i = i.getLatLng());
    let r = e.getMaxZoom();
    return r === 1 / 0 && (r = e.getZoom()), e.project(i, r);
  }
  function Fs(e, i) {
    let r = e.getMaxZoom();
    return r === 1 / 0 && (r = e.getZoom()), e.unproject(i, r);
  }
  var Gu = { _onRotateStart(e) {
    this._preventRenderingMarkers(!0), this._rotationOriginLatLng = this._getRotationCenter().clone(), this._rotationOriginPoint = wr(this._map, this._rotationOriginLatLng), this._rotationStartPoint = wr(this._map, e.target.getLatLng()), this._initialRotateLatLng = Ai(this._layer), this._startAngle = this.getAngle();
    let i = Ai(this._rotationLayer, this._rotationLayer.pm._rotateOrgLatLng);
    this._fireRotationStart(this._rotationLayer, i), this._fireRotationStart(this._map, i);
  }, _onRotate(e) {
    let i = wr(this._map, e.target.getLatLng()), r = this._rotationStartPoint, a = this._rotationOriginPoint, o = Math.atan2(i.y - a.y, i.x - a.x) - Math.atan2(r.y - a.y, r.x - a.x);
    this._layer.setLatLngs(this._rotateLayer(o, this._initialRotateLatLng, this._rotationOriginLatLng, L.PM.Matrix.init(), this._map));
    let h = this;
    function f(z, O = [], K = -1) {
      if (K > -1 && O.push(K), L.Util.isArray(z[0])) z.forEach((tt, ft) => f(tt, O.slice(), ft));
      else {
        let tt = O.length > 0 ? (0, $u.default)(h._markers, O) : h._markers[0];
        z.forEach((ft, yt) => {
          tt[yt].setLatLng(ft);
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
    let h = wr(o, r);
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
    this.rotateEnabled() && this.disableRotate(), this._layer instanceof L.Rectangle && this._angle === void 0 && this.setInitAngle(Xr(this._layer._map, this._layer.getLatLngs()[0][0], this._layer.getLatLngs()[0][1]) || 0);
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
  } }, Zu = Gu, qu = L.Class.extend({ includes: [Vu, rs, Zu, jn], options: { snappable: !0, snapDistance: 20, allowSelfIntersection: !0, allowSelfIntersectionEdit: !1, preventMarkerRemoval: !1, removeLayerBelowMinVertexCount: !0, limitMarkersToCount: -1, hideMiddleMarkers: !1, snapSegment: !0, syncLayersOnDrag: !1, draggable: !0, allowEditing: !0, allowRemoval: !0, allowCutting: !0, allowRotation: !0, addVertexOn: "click", removeVertexOn: "contextmenu", removeVertexValidation: void 0, addVertexValidation: void 0, moveVertexValidation: void 0, resizeableCircleMarker: !1, resizeableCircle: !0, snapMiddle: !1, snapVertex: !0 }, setOptions(e) {
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
  } }), ze = qu;
  ze.LayerGroup = L.Class.extend({ initialize(e) {
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
  } }), ze.Marker = ze.extend({ _shape: "Marker", initialize(e) {
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
  var An = w(Vi()), Hu = { filterMarkerGroup() {
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
  ze.Line = ze.extend({ includes: [Ku], _shape: "Line", initialize(e) {
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
    let { indexPath: h, index: f, parentPath: _ } = L.PM.Utils.findDeepMarkerIndex(this._markers, i), k = h.length > 1 ? (0, An.default)(o, _) : o, C = h.length > 1 ? (0, An.default)(this._markers, _) : this._markers;
    k.splice(f + 1, 0, a), C.splice(f + 1, 0, e), this._layer.setLatLngs(o), this.options.hideMiddleMarkers !== !0 && (this._createMiddleMarker(i, e), this._createMiddleMarker(e, r)), this._fireEdit(), this._layerEdited = !0, this._fireChange(this._layer.getLatLngs(), "Edit"), this._fireVertexAdded(e, L.PM.Utils.findDeepMarkerIndex(this._markers, e).indexPath, a), this.options.snappable && this._initSnappableMarkers();
  }, hasSelfIntersection() {
    return dr(this._layer.toGeoJSON(15)).features.length > 0;
  }, _handleSelfIntersectionOnVertexRemoval() {
    this._handleLayerStyle(!0) && (this._layer.setLatLngs(this._coordsBeforeEdit), this._coordsBeforeEdit = null, this._initMarkers());
  }, _handleLayerStyle(e) {
    let i = this._layer, r, a;
    if (this.options.allowSelfIntersection ? r = !1 : (a = dr(this._layer.toGeoJSON(15)), r = a.features.length > 0), r) {
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
    let f = a.length > 1 ? (0, An.default)(r, h) : r, _ = a.length > 1 ? (0, An.default)(this._markers, h) : this._markers, k = h[h.length - 1] > 0 && this._layer instanceof L.Polygon;
    if (!this.options.removeLayerBelowMinVertexCount && !k && (f.length <= 2 || this.isPolygon() && f.length <= 3)) {
      this._flashLayer();
      return;
    }
    f.splice(o, 1), this._layer.setLatLngs(r), this.isPolygon() && f.length <= 2 && f.splice(0, f.length);
    let C = !1;
    if (f.length <= 1 && (f.splice(0, f.length), h.length > 1 && a.length > 1 && (r = hr(r)), this._layer.setLatLngs(r), this._initMarkers(), C = !0), ae(r) || this._layer.remove(), r = hr(r), this._layer.setLatLngs(r), this._markers = hr(this._markers), !C && (_ = a.length > 1 ? (0, An.default)(this._markers, h) : this._markers, i._middleMarkerPrev && (this._markerGroup.removeLayer(i._middleMarkerPrev), this._removeFromCache(i._middleMarkerPrev)), i._middleMarkerNext && (this._markerGroup.removeLayer(i._middleMarkerNext), this._removeFromCache(i._middleMarkerNext)), this._markerGroup.removeLayer(i), this._removeFromCache(i), _)) {
      let z, O;
      if (this.isPolygon() ? (z = (o + 1) % _.length, O = (o + (_.length - 1)) % _.length) : (O = o - 1 < 0 ? void 0 : o - 1, z = o + 1 >= _.length ? void 0 : o + 1), z !== O) {
        let K = _[O], tt = _[z];
        this.options.hideMiddleMarkers !== !0 && this._createMiddleMarker(K, tt);
      }
      _.splice(o, 1);
    }
    this._fireEdit(), this._layerEdited = !0, this._fireVertexRemoved(i, a), this._fireChange(this._layer.getLatLngs(), "Edit");
  }, updatePolygonCoordsFromMarkerDrag(e) {
    let i = this._layer.getLatLngs(), r = e.getLatLng(), { indexPath: a, index: o, parentPath: h } = L.PM.Utils.findDeepMarkerIndex(this._markers, e), f = a.length > 1 ? (0, An.default)(i, h) : i;
    r.alt = f[o].alt, f.splice(o, 1, r), this._layer.setLatLngs(i);
  }, _getNeighborMarkers(e) {
    let { indexPath: i, index: r, parentPath: a } = L.PM.Utils.findDeepMarkerIndex(this._markers, e), o = i.length > 1 ? (0, An.default)(this._markers, a) : this._markers, h = (r + 1) % o.length, f = (r + (o.length - 1)) % o.length, _ = o[f], k = o[h];
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
    let h = r.length > 1 ? (0, An.default)(this._markers, o) : this._markers, f = (a + 1) % h.length, _ = (a + (h.length - 1)) % h.length, k = i.getLatLng(), C = h[_].getLatLng(), z = h[f].getLatLng();
    if (i._middleMarkerNext) {
      let O = L.PM.Utils.calcMiddleLatLng(this._map, k, z);
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
  } }), ze.Polygon = ze.Line.extend({ _shape: "Polygon", _checkMarkerAllowedToDrag(e) {
    let { prevMarker: i, nextMarker: r } = this._getNeighborMarkers(e), a = L.polyline([i.getLatLng(), e.getLatLng()]), o = L.polyline([e.getLatLng(), r.getLatLng()]), h = oi(this._layer.toGeoJSON(15), a.toGeoJSON(15)).features.filter((_) => {
      let k = _.geometry.coordinates, C = L.latLng(k[1], k[0]);
      return !C.equals(i.getLatLng()) && !C.equals(e.getLatLng());
    }).length, f = oi(this._layer.toGeoJSON(15), o.toGeoJSON(15)).features.filter((_) => {
      let k = _.geometry.coordinates, C = L.latLng(k[1], k[0]);
      return !C.equals(r.getLatLng()) && !C.equals(e.getLatLng());
    }).length;
    return !(h < 1 && f < 1);
  } }), ze.Rectangle = ze.Polygon.extend({ _shape: "Rectangle", _initMarkers() {
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
    this._angle === void 0 && this.setInitAngle(Xr(this._map, this._layer.getLatLngs()[0][0], this._layer.getLatLngs()[0][1]) || 0);
    let e = this._layer.getLatLngs()[0];
    return L.PM.Utils._getRotatedRectangle(e[0], e[2], this.getAngle(), this._map || this);
  } }), ze.CircleMarker = ze.extend({ _shape: "CircleMarker", initialize(e) {
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
    return this.options[this._minRadiusOption] && r < this.options[this._minRadiusOption] ? i = vn(this._map, e, i, this._getMinDistanceInMeter(e)) : this.options[this._maxRadiusOption] && r > this.options[this._maxRadiusOption] && (i = vn(this._map, e, i, this._getMaxDistanceInMeter(e))), i;
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
  } }), ze.Circle = ze.CircleMarker.extend({ _shape: "Circle", initialize(e) {
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
  } }), ze.ImageOverlay = ze.extend({ _shape: "ImageOverlay", initialize(e) {
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
  } }), ze.Text = ze.extend({ _shape: "Text", initialize(e) {
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
  var Io = function(e, i, r, a, o, h) {
    this._matrix = [e, i, r, a, o, h];
  };
  Io.init = () => new L.PM.Matrix(1, 0, 0, 1, 0, 0), Io.prototype = { transform(e) {
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
    let f = [[], [], []], _ = this._matrix, k = [[_[0], _[2], _[4]], [_[1], _[3], _[5]], [0, 0, 1]], C = [[e, r, o], [i, a, h], [0, 0, 1]], z;
    e && e instanceof L.PM.Matrix && (_ = e._matrix, C = [[_[0], _[2], _[4]], [_[1], _[3], _[5]], [0, 0, 1]]);
    for (let O = 0; O < 3; O += 1) for (let K = 0; K < 3; K += 1) {
      z = 0;
      for (let tt = 0; tt < 3; tt += 1) z += k[O][tt] * C[tt][K];
      f[O][K] = z;
    }
    return this._matrix = [f[0][0], f[1][0], f[0][1], f[1][1], f[0][2], f[1][2]], this;
  } };
  var Wu = Io, Ju = { calcMiddleLatLng(e, i, r) {
    let a = e.project(i), o = e.project(r);
    return e.unproject(a._add(o)._divideBy(2));
  }, findLayers(e) {
    let i = [];
    return e.eachLayer((r) => {
      (r instanceof L.Polyline || r instanceof L.Marker || r instanceof L.Circle || r instanceof L.CircleMarker || r instanceof L.ImageOverlay) && i.push(r);
    }), i = i.filter((r) => !!r.pm), i = i.filter((r) => !r._pmTempLayer), i = i.filter((r) => !L.PM.optIn && !r.options.pmIgnore || L.PM.optIn && r.options.pmIgnore === !1), i;
  }, circleToPolygon(e, i = 60, r = !0) {
    let a = e.getLatLng(), o = e.getRadius(), h = yn(a, o, i, 0, r), f = [];
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
  }, createGeodesicPolygon: yn, getTranslation: he, findDeepCoordIndex(e, i, r = !0) {
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
    let o = wr(a, e), h = wr(a, i), f = r * Math.PI / 180, _ = Math.cos(f), k = Math.sin(f), C = (h.x - o.x) * _ + (h.y - o.y) * k, z = (h.y - o.y) * _ - (h.x - o.x) * k, O = C * _ + o.x, K = C * k + o.y, tt = -z * k + o.x, ft = z * _ + o.y, yt = Fs(a, o), kt = Fs(a, { x: O, y: K }), Dt = Fs(a, h), F = Fs(a, { x: tt, y: ft });
    return [yt, kt, Dt, F];
  }, pxRadiusToMeterRadius(e, i, r) {
    let a = i.project(r), o = L.point(a.x + e, a.y);
    return i.distance(i.unproject(o), r);
  } }, Xu = Ju;
  L.PM = L.PM || { version: ke.version, Map: yi, Toolbar: is, Draw: Te, Edit: ze, Utils: Xu, Matrix: Wu, activeLang: "en", optIn: !1, initialize(e) {
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
const ic = { class: "field map-field" }, nc = { class: "map-label" }, rc = { class: "map-toolbar" }, ac = ["title"], sc = ["title"], oc = {
  key: 0,
  class: "map-wkt"
}, lc = {
  key: 1,
  class: "map-hint"
}, uc = {
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
    const d = u, p = l, { t: b } = Xe(), E = Nt(() => {
      var G, Y;
      return ((G = d.field.label) == null ? void 0 : G[d.lang]) || ((Y = d.field.label) == null ? void 0 : Y.en) || d.field.id;
    }), x = Ht(null), g = Ht(null);
    let w = null, B = null;
    Qn(() => {
      w = Ii.map(x.value).setView([47.5, 13.5], 6), Ii.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        maxZoom: 19
      }).addTo(w), w.pm.setLang(d.lang === "de" ? "de" : "en"), w.on("pm:create", (G) => {
        B && B.remove(), B = G.layer, w.pm.disableDraw(), g.value = null, p("update:modelValue", N(G.layer));
      }), d.modelValue && j(d.modelValue);
    }), pi(() => d.modelValue, (G) => {
      B && (B.remove(), B = null), G && j(G);
    }), Wo(() => {
      w == null || w.remove();
    });
    function T(G) {
      if (g.value === G) {
        w.pm.disableDraw(), g.value = null;
        return;
      }
      g.value = G, G === "rectangle" ? w.pm.enableDraw("Rectangle", { snappable: !1 }) : w.pm.enableDraw("Polygon", { snappable: !1 });
    }
    function M() {
      B && (B.remove(), B = null), w.pm.disableDraw(), g.value = null, p("update:modelValue", "");
    }
    function N(G) {
      const Y = G.getLatLngs(), lt = Array.isArray(Y[0]) ? Y[0] : Y[0][0] ?? Y, ct = (Array.isArray(lt[0]) ? lt[0] : lt).map((ue) => `${ue.lng.toFixed(6)} ${ue.lat.toFixed(6)}`), pt = ct[0];
      return `POLYGON((${(ct[ct.length - 1] === pt ? ct : [...ct, pt]).join(", ")}))`;
    }
    function j(G) {
      const Y = G.match(/POLYGON\s*\(\(([^)]+)\)\)/i);
      if (!Y) return;
      const lt = Y[1].split(",").map((ct) => {
        const [pt, Bt] = ct.trim().split(/\s+/).map(Number);
        return [Bt, pt];
      });
      B = Ii.polygon(lt, { color: "#2878a8" }).addTo(w), w.fitBounds(B.getBounds(), { padding: [20, 20] });
    }
    return (G, Y) => (V(), q("div", ic, [
      $("div", nc, X(E.value), 1),
      $("div", rc, [
        $("button", {
          class: le(["tool-btn", { active: g.value === "rectangle" }]),
          onClick: Y[0] || (Y[0] = (lt) => T("rectangle")),
          title: vt(b)("map.btn.rectangle")
        }, "▭ " + X(vt(b)("map.btn.rectangle")), 11, ac),
        $("button", {
          class: le(["tool-btn", { active: g.value === "polygon" }]),
          onClick: Y[1] || (Y[1] = (lt) => T("polygon")),
          title: vt(b)("map.btn.polygon")
        }, "⬡ " + X(vt(b)("map.btn.polygon")), 11, sc),
        u.modelValue ? (V(), q("button", {
          key: 0,
          class: "tool-btn tool-btn--clear",
          onClick: M
        }, "✕ " + X(vt(b)("map.btn.clear")), 1)) : Mt("", !0)
      ]),
      $("div", {
        ref_key: "mapEl",
        ref: x,
        class: "map-container"
      }, null, 512),
      u.modelValue ? (V(), q("div", oc, [
        Y[2] || (Y[2] = $("span", { class: "map-wkt-label" }, "WKT:", -1)),
        $("code", null, X(u.modelValue), 1)
      ])) : Mt("", !0),
      g.value ? (V(), q("div", lc, [
        g.value === "rectangle" ? (V(), q(Ft, { key: 0 }, [
          Mi(X(vt(b)("map.hint.rectangle")), 1)
        ], 64)) : (V(), q(Ft, { key: 1 }, [
          Mi(X(vt(b)("map.hint.polygon")), 1)
        ], 64))
      ])) : Mt("", !0)
    ]));
  }
}, Vl = /* @__PURE__ */ re(uc, [["__scopeId", "data-v-aed9671f"]]), hc = ["id"], cc = ["aria-expanded", "aria-labelledby", "aria-owns", "onKeydown"], dc = {
  key: 0,
  class: "ss-value"
}, fc = {
  key: 1,
  class: "ss-placeholder"
}, pc = ["aria-label"], mc = ["id", "aria-labelledby"], _c = ["placeholder", "aria-label", "onKeydown"], gc = {
  key: 0,
  class: "ss-empty",
  role: "alert"
}, yc = ["aria-selected", "onMousedown", "onMousemove"], vc = {
  key: 1,
  class: "hint"
}, bc = {
  __name: "SearchSelectField",
  props: {
    field: Object,
    lang: String,
    modelValue: String
  },
  emits: ["update:modelValue"],
  setup(u, { emit: l }) {
    const d = u, p = l, { t: b } = Xe(), { label: E } = Oa(Nt(() => d.field), Nt(() => d.lang)), x = Nt(() => d.field.options || []), g = Ht(""), w = Nt(() => {
      const At = g.value.trim().toLowerCase();
      return At ? x.value.filter((jt) => {
        var Zt, Kt, ce;
        return (((Zt = jt.label) == null ? void 0 : Zt[d.lang]) || ((Kt = jt.label) == null ? void 0 : Kt.de) || ((ce = jt.label) == null ? void 0 : ce.en) || jt.value || "").toLowerCase().includes(At);
      }) : x.value;
    }), B = Nt(() => {
      var jt, se, Zt;
      if (!d.modelValue) return "";
      const At = x.value.find((Kt) => Kt.value === d.modelValue);
      return At ? ((jt = At.label) == null ? void 0 : jt[d.lang]) || ((se = At.label) == null ? void 0 : se.de) || ((Zt = At.label) == null ? void 0 : Zt.en) || At.value : d.modelValue;
    }), T = Ht(null), M = Ht(null), N = Ht(null), j = Ht(!1), G = Ht(-1);
    async function Y() {
      var jt;
      if (j.value) return;
      j.value = !0, g.value = "", G.value = -1, await $s(), (jt = M.value) == null || jt.focus();
      const At = w.value.findIndex((se) => se.value === d.modelValue);
      At >= 0 && (G.value = At, Rt()), document.addEventListener("mousedown", ct);
    }
    function lt() {
      j.value = !1, document.removeEventListener("mousedown", ct);
    }
    function ct(At) {
      var jt;
      (jt = T.value) != null && jt.contains(At.target) || lt();
    }
    Wo(() => document.removeEventListener("mousedown", ct));
    function pt(At) {
      p("update:modelValue", At.value), lt();
    }
    function Bt() {
      p("update:modelValue", "");
    }
    function ue(At) {
      const jt = w.value.length;
      jt && (G.value = (G.value + At + jt) % jt, Rt());
    }
    function Xt() {
      const At = w.value[G.value];
      At && pt(At);
    }
    function Rt() {
      $s(() => {
        var jt, se;
        const At = (jt = N.value) == null ? void 0 : jt.querySelectorAll(".ss-option")[G.value];
        (se = At == null ? void 0 : At.scrollIntoView) == null || se.call(At, { block: "nearest" });
      });
    }
    return (At, jt) => {
      var se;
      return V(), q("div", {
        class: "field",
        ref_key: "root",
        ref: T
      }, [
        $("label", {
          id: `${u.field.id}-label`,
          class: le({ required: u.field.required || u.field.requiredIf })
        }, X(vt(E)), 11, hc),
        $("div", {
          class: le(["ss-input-wrap", { open: j.value, focused: j.value }]),
          role: "combobox",
          "aria-expanded": j.value,
          "aria-haspopup": "listbox",
          "aria-labelledby": `${u.field.id}-label`,
          "aria-owns": `${u.field.id}-panel`,
          tabindex: "0",
          onClick: Y,
          onKeydown: [
            Jn(Ne(Y, ["prevent"]), ["enter"]),
            Jn(Ne(Y, ["prevent"]), ["space"])
          ]
        }, [
          B.value ? (V(), q("span", dc, X(B.value), 1)) : (V(), q("span", fc, X(vt(b)("select.placeholder")), 1)),
          jt[3] || (jt[3] = $("span", {
            class: "ss-caret",
            "aria-hidden": "true"
          }, "▾", -1)),
          u.modelValue ? (V(), q("button", {
            key: 2,
            type: "button",
            class: "ss-clear",
            "aria-label": `Clear ${vt(E)} selection`,
            onClick: Ne(Bt, ["stop"])
          }, "×", 8, pc)) : Mt("", !0)
        ], 42, cc),
        j.value ? (V(), q("div", {
          key: 0,
          id: `${u.field.id}-panel`,
          class: "ss-panel",
          role: "listbox",
          "aria-labelledby": `${u.field.id}-label`
        }, [
          Jo($("input", {
            ref_key: "searchInput",
            ref: M,
            "onUpdate:modelValue": jt[0] || (jt[0] = (Zt) => g.value = Zt),
            class: "ss-search",
            placeholder: vt(b)("searchselect.search-placeholder"),
            "aria-label": `Search ${vt(E)}`,
            autocomplete: "off",
            onKeydown: [
              jt[1] || (jt[1] = Jn(Ne((Zt) => ue(1), ["prevent"]), ["down"])),
              jt[2] || (jt[2] = Jn(Ne((Zt) => ue(-1), ["prevent"]), ["up"])),
              Jn(Ne(Xt, ["prevent"]), ["enter"]),
              Jn(lt, ["esc"])
            ]
          }, null, 40, _c), [
            [Il, g.value]
          ]),
          $("ul", {
            class: "ss-list",
            ref_key: "listEl",
            ref: N
          }, [
            w.value.length ? Mt("", !0) : (V(), q("li", gc, X(vt(b)("searchselect.empty")), 1)),
            (V(!0), q(Ft, null, ee(w.value, (Zt, Kt) => {
              var ce, Ye, Le;
              return V(), q("li", {
                key: Zt.value,
                class: le(["ss-option", { selected: Zt.value === u.modelValue, highlighted: Kt === G.value }]),
                role: "option",
                "aria-selected": Zt.value === u.modelValue,
                onMousedown: Ne((Qe) => pt(Zt), ["prevent"]),
                onMousemove: (Qe) => G.value = Kt
              }, X(((ce = Zt.label) == null ? void 0 : ce[u.lang]) || ((Ye = Zt.label) == null ? void 0 : Ye.de) || ((Le = Zt.label) == null ? void 0 : Le.en) || Zt.value), 43, yc);
            }), 128))
          ], 512)
        ], 8, mc)) : Mt("", !0),
        (se = u.field.hint) != null && se[u.lang] ? (V(), q("span", vc, X(u.field.hint[u.lang]), 1)) : Mt("", !0)
      ], 512);
    };
  }
}, el = /* @__PURE__ */ re(bc, [["__scopeId", "data-v-dbb13039"]]), xc = { class: "field object-field" }, wc = { class: "object-fieldset" }, Lc = { class: "object-legend" }, kc = {
  __name: "ObjectField",
  props: {
    field: Object,
    lang: String,
    modelValue: { type: Object, default: () => ({}) }
  },
  emits: ["update:modelValue"],
  setup(u, { emit: l }) {
    const d = u, p = l, b = Nt(() => {
      var B, T;
      return ((B = d.field.label) == null ? void 0 : B[d.lang]) || ((T = d.field.label) == null ? void 0 : T.en) || d.field.id;
    }), E = {
      text: Pr,
      uri: tl,
      select: Yo,
      langstring: Nl,
      textarea: Xo,
      date: Qo,
      map: Vl,
      searchselect: el
    };
    function x(B) {
      return E[B.type] || Pr;
    }
    function g(B, T) {
      const M = { ...d.modelValue || {} };
      d.field.rdfType && (M["rdf:type"] = d.field.rdfType), p("update:modelValue", { ...M, [B]: T });
    }
    function w(B) {
      const T = d.field.rdfType ? { "rdf:type": d.field.rdfType } : {};
      p("update:modelValue", { ...T, ...B });
    }
    return (B, T) => (V(), q("div", xc, [
      u.field.remember ? (V(), Oe(zl, {
        key: 0,
        field: u.field,
        lang: u.lang,
        onSelect: w
      }, null, 8, ["field", "lang"])) : Mt("", !0),
      $("fieldset", wc, [
        $("legend", Lc, X(b.value), 1),
        (V(!0), q(Ft, null, ee(u.field.subFields, (M) => (V(), Oe(Sr(x(M)), {
          key: M.id,
          field: M,
          lang: u.lang,
          modelValue: (u.modelValue || {})[M.id],
          "onUpdate:modelValue": (N) => g(M.id, N)
        }, null, 8, ["field", "lang", "modelValue", "onUpdate:modelValue"]))), 128))
      ])
    ]));
  }
}, $l = /* @__PURE__ */ re(kc, [["__scopeId", "data-v-468d73b0"]]), Cc = { class: "langstring-item" }, Ec = ["value", "aria-label"], Mc = ["value"], Bc = ["value", "placeholder", "aria-label"], Ac = {
  __name: "LangStringItem",
  props: {
    modelValue: { type: Object, default: () => ({ value: "", lang: "de" }) },
    lang: String,
    placeholder: { type: String, default: "" }
  },
  emits: ["update:modelValue"],
  setup(u, { emit: l }) {
    const { t: d } = Xe(), p = u, b = l, E = ["de", "en", "fr", "it", "es", "nl", "pl", "cs", "sk", "hr"];
    function x(w) {
      b("update:modelValue", { ...p.modelValue, lang: w });
    }
    function g(w) {
      b("update:modelValue", { ...p.modelValue, value: w });
    }
    return (w, B) => (V(), q("div", Cc, [
      $("select", {
        class: "lang-select",
        value: u.modelValue.lang || "de",
        "aria-label": vt(d)("aria.lang-select"),
        onChange: B[0] || (B[0] = (T) => x(T.target.value))
      }, [
        (V(), q(Ft, null, ee(E, (T) => $("option", {
          key: T,
          value: T
        }, X(T), 9, Mc)), 64))
      ], 40, Ec),
      $("input", {
        type: "text",
        value: u.modelValue.value || "",
        placeholder: u.placeholder,
        "aria-label": u.lang === "de" ? `Texteingabe auf ${u.modelValue.lang || "de"}` : `Text in ${u.modelValue.lang || "de"}`,
        onInput: B[1] || (B[1] = (T) => g(T.target.value))
      }, null, 40, Bc)
    ]));
  }
}, Sc = /* @__PURE__ */ re(Ac, [["__scopeId", "data-v-992a4fd2"]]), Pc = { class: "field" }, Tc = { class: "items" }, Dc = ["aria-label", "onClick"], Oc = {
  key: 0,
  class: "hint"
}, Ic = {
  __name: "RepeatableField",
  props: {
    field: Object,
    lang: String,
    modelValue: { type: Array, default: () => [] }
  },
  emits: ["update:modelValue"],
  setup(u, { emit: l }) {
    const { t: d } = Xe(), p = u, b = l, { label: E, placeholder: x } = Oa(Nt(() => p.field), Nt(() => p.lang)), g = {
      text: Pr,
      textarea: Xo,
      uri: tl,
      date: Qo,
      select: Yo,
      searchselect: el,
      object: $l
    }, w = Nt(() => g[p.field.type] || Pr), B = Nt(() => {
      const lt = p.modelValue;
      return Array.isArray(lt) ? lt.length ? lt : [N()] : lt != null && lt !== "" ? [lt] : [N()];
    });
    let T = 0;
    const M = Ht([]);
    pi(B, (lt) => {
      for (; M.value.length < lt.length; )
        M.value.push(++T);
    }, { immediate: !0 });
    function N() {
      return p.field.type === "langstring" ? { value: "", lang: p.lang || "de" } : "";
    }
    function j(lt, ct) {
      const pt = Array.isArray(p.modelValue) ? [...p.modelValue] : [];
      for (; pt.length <= lt; ) pt.push(N());
      pt[lt] = ct, b("update:modelValue", pt);
    }
    function G() {
      const lt = Array.isArray(p.modelValue) && p.modelValue.length ? p.modelValue : [N()];
      b("update:modelValue", [...lt, N()]);
    }
    function Y(lt) {
      const ct = Array.isArray(p.modelValue) ? [...p.modelValue] : [];
      ct.splice(lt, 1), M.value.splice(lt, 1), b("update:modelValue", ct.length ? ct : [N()]);
    }
    return (lt, ct) => {
      var pt;
      return V(), q("div", Pc, [
        $("label", {
          class: le({ required: u.field.required })
        }, X(vt(E)), 3),
        $("div", Tc, [
          (V(!0), q(Ft, null, ee(B.value, (Bt, ue) => (V(), q("div", {
            key: M.value[ue] ?? ue,
            class: "item-row"
          }, [
            u.field.type === "langstring" ? (V(), Oe(Sc, {
              key: 0,
              modelValue: Bt,
              lang: u.lang,
              placeholder: vt(x),
              "onUpdate:modelValue": (Xt) => j(ue, Xt)
            }, null, 8, ["modelValue", "lang", "placeholder", "onUpdate:modelValue"])) : (V(), Oe(Sr(w.value), {
              key: 1,
              field: u.field,
              lang: u.lang,
              modelValue: Bt,
              "onUpdate:modelValue": (Xt) => j(ue, Xt)
            }, null, 8, ["field", "lang", "modelValue", "onUpdate:modelValue"])),
            $("button", {
              type: "button",
              class: "btn-remove",
              "aria-label": `${vt(d)("btn.remove")} ${ue + 1} ${vt(E)}`,
              onClick: (Xt) => Y(ue)
            }, "×", 8, Dc)
          ]))), 128))
        ]),
        $("button", {
          type: "button",
          class: "btn-add",
          onClick: G
        }, " + " + X(vt(d)("btn.add")), 1),
        (pt = u.field.hint) != null && pt[u.lang] ? (V(), q("span", Oc, X(u.field.hint[u.lang]), 1)) : Mt("", !0)
      ]);
    };
  }
}, Fc = /* @__PURE__ */ re(Ic, [["__scopeId", "data-v-8f48ce28"]]), Rc = { class: "field" }, zc = { class: "multiselect-fieldset" }, Nc = { class: "multiselect-box" }, jc = ["value", "checked", "onChange"], Vc = {
  key: 0,
  class: "empty"
}, $c = {
  key: 0,
  class: "hint"
}, Uc = {
  __name: "MultiSelectField",
  props: {
    field: Object,
    lang: String,
    modelValue: { type: Array, default: () => [] }
  },
  emits: ["update:modelValue"],
  setup(u, { emit: l }) {
    const d = u, p = l, b = Nt(() => {
      var x, g;
      return ((x = d.field.label) == null ? void 0 : x[d.lang]) || ((g = d.field.label) == null ? void 0 : g.en) || d.field.id;
    });
    function E(x) {
      const g = d.modelValue || [], w = g.includes(x) ? g.filter((B) => B !== x) : [...g, x];
      p("update:modelValue", w);
    }
    return (x, g) => {
      var w, B;
      return V(), q("div", Rc, [
        $("fieldset", zc, [
          $("legend", {
            class: le({ required: u.field.required })
          }, X(b.value), 3),
          $("div", Nc, [
            (V(!0), q(Ft, null, ee(u.field.options, (T) => {
              var M, N;
              return V(), q("label", {
                key: T.value,
                class: "option-row"
              }, [
                $("input", {
                  type: "checkbox",
                  value: T.value,
                  checked: (u.modelValue || []).includes(T.value),
                  onChange: (j) => E(T.value)
                }, null, 40, jc),
                $("span", null, X(((M = T.label) == null ? void 0 : M[u.lang]) || ((N = T.label) == null ? void 0 : N.de) || T.value), 1)
              ]);
            }), 128)),
            (w = u.field.options) != null && w.length ? Mt("", !0) : (V(), q("span", Vc, X(u.lang === "de" ? "Keine Optionen konfiguriert." : "No options configured."), 1))
          ])
        ]),
        (B = u.field.hint) != null && B[u.lang] ? (V(), q("span", $c, X(u.field.hint[u.lang]), 1)) : Mt("", !0)
      ]);
    };
  }
}, Gc = /* @__PURE__ */ re(Uc, [["__scopeId", "data-v-de4950da"]]), Sa = {
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
function Zc(u, l) {
  const d = typeof u == "string" ? { [u]: l } : u;
  for (const [p, b] of Object.entries(d)) {
    if (Sa[p]) {
      console.warn(`[fieldTransforms] "${p}" already exists — skipping. Use a unique name.`);
      continue;
    }
    Sa[p] = b;
  }
}
function Zo(u, l, d) {
  const p = Sa[u];
  return p ? p.display(l, d) : (console.warn(`[fieldTransforms] Unknown transform: "${u}"`), l);
}
function Xn(u, l, d, p) {
  const b = Sa[u];
  return b ? b.encode(l, d, p) : (console.warn(`[fieldTransforms] Unknown transform: "${u}"`), l);
}
const qc = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  applyDisplay: Zo,
  applyEncode: Xn,
  fieldTransforms: Sa,
  registerTransform: Zc
}, Symbol.toStringTag, { value: "Module" })), Hc = { class: "group-fields" }, Kc = ["id"], Wc = {
  key: 2,
  class: "transform-preview"
}, Jc = {
  key: 3,
  class: "field-errors",
  role: "alert"
}, Xc = {
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
    const { t: d } = Xe(), p = u, b = l;
    function E(w) {
      var T;
      const B = (T = p.modelValue) == null ? void 0 : T[w.id];
      return w.transform ? w.multiple && Array.isArray(B) ? B.map((M) => Zo(w.transform, M, w.transformOptions)) : Zo(w.transform, B, w.transformOptions) : B;
    }
    function x(w, B) {
      var N;
      if (!w.transform || !B) return null;
      const T = (N = p.modelValue) == null ? void 0 : N[w.id];
      if (w.multiple && Array.isArray(B)) {
        const j = B.map((G, Y) => {
          const lt = Array.isArray(T) ? T[Y] : T;
          return Xn(w.transform, G, w.transformOptions, lt);
        });
        return j.some((G, Y) => G !== B[Y]) ? j.join(", ") : null;
      }
      const M = Xn(w.transform, B, w.transformOptions, T);
      return M !== B ? M : null;
    }
    function g(w, B) {
      var M;
      const T = typeof w == "string" ? w : w.id;
      if (typeof w == "object" && w.transform) {
        const N = (M = p.modelValue) == null ? void 0 : M[T];
        let j;
        w.multiple && Array.isArray(B) ? j = B.map((G, Y) => {
          const lt = Array.isArray(N) ? N[Y] : N;
          return Xn(w.transform, G, w.transformOptions, lt);
        }) : j = Xn(w.transform, B, w.transformOptions, N), b("update:modelValue", { ...p.modelValue, [T]: j });
      } else
        b("update:modelValue", { ...p.modelValue, [T]: B });
    }
    return (w, B) => (V(), q("div", Hc, [
      (V(!0), q(Ft, null, ee(u.fields, (T) => {
        var M, N;
        return V(), q("div", {
          key: T.id,
          id: "field-" + T.id,
          class: le(["field-wrapper", [{ "has-error": u.showErrors && ((M = u.fieldErrors[T.id]) == null ? void 0 : M.length) }, T.cssClass]])
        }, [
          T.multiple && T.type !== "multiselect" && T.type !== "distribution-editor" && T.type !== "object" ? (V(), Oe(Fc, {
            key: 0,
            field: T,
            lang: u.lang,
            modelValue: E(T),
            "onUpdate:modelValue": (j) => g(T, j)
          }, null, 8, ["field", "lang", "modelValue", "onUpdate:modelValue"])) : (V(), Oe(Sr(u.fieldComponent(T)), {
            key: 1,
            field: T,
            lang: u.lang,
            modelValue: E(T),
            "onUpdate:modelValue": (j) => g(T, j)
          }, null, 8, ["field", "lang", "modelValue", "onUpdate:modelValue"])),
          T.transform && E(T) ? (V(), q("div", Wc, [
            Mi(X(vt(d)("field.stored-as")) + " ", 1),
            $("code", null, X(x(T, E(T)) || u.modelValue[T.id]), 1)
          ])) : Mt("", !0),
          u.showErrors && ((N = u.fieldErrors[T.id]) != null && N.length) ? (V(), q("ul", Jc, [
            (V(!0), q(Ft, null, ee(u.fieldErrors[T.id], (j) => (V(), q("li", { key: j }, X(j), 1))), 128))
          ])) : Mt("", !0)
        ], 10, Kc);
      }), 128))
    ]));
  }
}, Ml = /* @__PURE__ */ re(Xc, [["__scopeId", "data-v-404b8112"]]);
let No = null;
class Yc {
  /**
   * Registers a global async function that returns auth headers for every upload.
   * Pass null to remove the provider (uploads will be unauthenticated).
   *
   * @param {((config: object) => Promise<Record<string,string>>) | null} providerFn
   */
  static setAuthProvider(l) {
    No = l ?? null;
  }
  /**
   * @param {File} file
   * @param {object} config — fileUpload config block from the field definition
   * @returns {Promise<string>} download URL returned by the API
   */
  async upload(l, d) {
    if (!(d != null && d.uploadUrl)) throw new Error("fileUpload.uploadUrl is not configured");
    const p = d.uploadUrl.replace("{filename}", encodeURIComponent(l.name)), b = (d.method || "POST").toUpperCase(), E = No ? await No(d) : {}, x = { ...d.headers || {}, ...E };
    let g;
    if (b === "PUT")
      x["Content-Type"] = l.type || "application/octet-stream", g = l;
    else {
      const T = new FormData();
      T.append(d.formField || "file", l, l.name), g = T;
    }
    const w = await fetch(p, { method: b, headers: x, body: g });
    if (!w.ok) {
      const T = await w.text().catch(() => "");
      throw new Error(`Upload failed: HTTP ${w.status}${T ? " – " + T.slice(0, 200) : ""}`);
    }
    if ((d.responseType || "text") === "json") {
      const T = await w.json(), M = d.responseUrlField || "url", N = Qc(T, M);
      if (!N) throw new Error(`Response JSON has no field "${M}"`);
      return String(N);
    }
    return (await w.text()).trim();
  }
}
function Qc(u, l) {
  return l.split(".").reduce((d, p) => d != null ? d[p] : void 0, u);
}
const td = { class: "dist-form" }, ed = {
  key: 0,
  class: "field span2 upload-section"
}, id = { class: "drop-text" }, nd = { class: "drop-text" }, rd = { class: "drop-size" }, ad = { class: "drop-text" }, sd = { class: "drop-text" }, od = { class: "drop-text error-text" }, ld = { class: "field" }, ud = { class: "required" }, hd = ["value"], cd = { class: "field" }, dd = ["value"], fd = { class: "field span2" }, pd = ["value", "placeholder"], md = { class: "field span2" }, _d = ["value", "placeholder"], gd = { class: "field" }, yd = ["value"], vd = { value: "" }, bd = ["value"], xd = { class: "field" }, wd = ["value"], Ld = { class: "field span2" }, kd = ["value"], Cd = { class: "field" }, Ed = ["value"], Md = { value: "" }, Bd = ["value"], Ad = { class: "field" }, Sd = ["value"], Pd = { class: "field" }, Td = ["value"], Dd = {
  __name: "DistributionForm",
  props: {
    modelValue: { type: Object, default: () => ({}) },
    lang: String,
    formatOptions: { type: Array, default: () => [] },
    availabilityOptions: { type: Array, default: () => [] },
    uploadConfig: { type: Object, default: null }
  },
  emits: ["update:modelValue"],
  setup(u, { emit: l }) {
    const d = u, p = l, { t: b } = Xe();
    function E(ct, pt) {
      p("update:modelValue", { ...d.modelValue, [ct]: pt });
    }
    const x = Ht(null), g = Ht(null), w = Ht(!1), B = Ht("idle"), T = Ht("");
    function M(ct) {
      var Bt;
      const pt = (Bt = ct.target.files) == null ? void 0 : Bt[0];
      pt && j(pt);
    }
    function N(ct) {
      var Bt;
      if (w.value = !1, B.value === "uploading") return;
      const pt = (Bt = ct.dataTransfer.files) == null ? void 0 : Bt[0];
      pt && j(pt);
    }
    function j(ct) {
      g.value = ct, B.value = "selected", T.value = "";
    }
    function G() {
      g.value = null, B.value = "idle", T.value = "", x.value && (x.value.value = "");
    }
    async function Y() {
      if (g.value) {
        B.value = "uploading";
        try {
          const pt = await new Yc().upload(g.value, d.uploadConfig);
          B.value = "success";
          const Bt = { ...d.modelValue, "dcat:downloadURL": pt };
          Bt["dcat:accessURL"] || (Bt["dcat:accessURL"] = pt), p("update:modelValue", Bt);
        } catch (ct) {
          B.value = "error", T.value = ct.message;
        }
      }
    }
    function lt(ct) {
      return ct ? ct < 1024 ? `${ct} B` : ct < 1024 * 1024 ? `${(ct / 1024).toFixed(1)} KB` : `${(ct / (1024 * 1024)).toFixed(1)} MB` : "";
    }
    return (ct, pt) => {
      var Bt, ue, Xt;
      return V(), q("div", td, [
        (Bt = u.uploadConfig) != null && Bt.enabled ? (V(), q("div", ed, [
          $("label", null, X(vt(b)("dist.upload-label")), 1),
          $("div", {
            class: le(["drop-zone", { dragging: w.value, uploading: B.value === "uploading", success: B.value === "success", error: B.value === "error" }]),
            onDragover: pt[0] || (pt[0] = Ne((Rt) => w.value = !0, ["prevent"])),
            onDragleave: pt[1] || (pt[1] = (Rt) => w.value = !1),
            onDrop: Ne(N, ["prevent"]),
            onClick: pt[2] || (pt[2] = (Rt) => {
              var At;
              return (At = x.value) == null ? void 0 : At.click();
            })
          }, [
            $("input", {
              ref_key: "fileInput",
              ref: x,
              type: "file",
              class: "hidden-input",
              onChange: M
            }, null, 544),
            B.value === "idle" ? (V(), q(Ft, { key: 0 }, [
              pt[13] || (pt[13] = $("span", { class: "drop-icon" }, "📂", -1)),
              $("span", id, X(vt(b)("dist.drop.idle")), 1)
            ], 64)) : B.value === "selected" ? (V(), q(Ft, { key: 1 }, [
              pt[14] || (pt[14] = $("span", { class: "drop-icon" }, "📄", -1)),
              $("span", nd, X((ue = g.value) == null ? void 0 : ue.name), 1),
              $("span", rd, X(lt((Xt = g.value) == null ? void 0 : Xt.size)), 1)
            ], 64)) : B.value === "uploading" ? (V(), q(Ft, { key: 2 }, [
              pt[15] || (pt[15] = $("span", { class: "drop-icon spin" }, "⟳", -1)),
              $("span", ad, X(vt(b)("dist.drop.uploading")), 1)
            ], 64)) : B.value === "success" ? (V(), q(Ft, { key: 3 }, [
              pt[16] || (pt[16] = $("span", { class: "drop-icon" }, "✓", -1)),
              $("span", sd, X(vt(b)("dist.drop.success")), 1),
              $("button", {
                type: "button",
                class: "btn-reset-upload",
                onClick: Ne(G, ["stop"])
              }, X(vt(b)("btn.choose-another")), 1)
            ], 64)) : B.value === "error" ? (V(), q(Ft, { key: 4 }, [
              pt[17] || (pt[17] = $("span", { class: "drop-icon" }, "⚠", -1)),
              $("span", od, X(T.value), 1),
              $("button", {
                type: "button",
                class: "btn-reset-upload",
                onClick: Ne(G, ["stop"])
              }, X(vt(b)("btn.try-again")), 1)
            ], 64)) : Mt("", !0)
          ], 34),
          B.value === "selected" ? (V(), q("button", {
            key: 0,
            type: "button",
            class: "btn-upload",
            onClick: Y
          }, X(vt(b)("btn.upload")), 1)) : Mt("", !0)
        ])) : Mt("", !0),
        $("div", ld, [
          $("label", ud, X(vt(b)("dist.field.access-url")), 1),
          $("input", {
            type: "url",
            value: u.modelValue["dcat:accessURL"] || "",
            placeholder: "https://…",
            onInput: pt[3] || (pt[3] = (Rt) => E("dcat:accessURL", Rt.target.value))
          }, null, 40, hd)
        ]),
        $("div", cd, [
          $("label", null, X(vt(b)("dist.field.download-url")), 1),
          $("input", {
            type: "url",
            value: u.modelValue["dcat:downloadURL"] || "",
            placeholder: "https://…",
            onInput: pt[4] || (pt[4] = (Rt) => E("dcat:downloadURL", Rt.target.value))
          }, null, 40, dd)
        ]),
        $("div", fd, [
          $("label", null, X(vt(b)("dist.field.title")), 1),
          $("input", {
            type: "text",
            value: u.modelValue["dct:title"] || "",
            placeholder: vt(b)("dist.field.title-placeholder"),
            onInput: pt[5] || (pt[5] = (Rt) => E("dct:title", Rt.target.value))
          }, null, 40, pd)
        ]),
        $("div", md, [
          $("label", null, X(vt(b)("dist.field.description")), 1),
          $("textarea", {
            value: u.modelValue["dct:description"] || "",
            placeholder: vt(b)("dist.field.description-placeholder"),
            onInput: pt[6] || (pt[6] = (Rt) => E("dct:description", Rt.target.value)),
            rows: "3"
          }, null, 40, _d)
        ]),
        $("div", gd, [
          $("label", null, X(vt(b)("dist.field.format")), 1),
          $("select", {
            value: u.modelValue["dct:format"] || "",
            onChange: pt[7] || (pt[7] = (Rt) => E("dct:format", Rt.target.value))
          }, [
            $("option", vd, X(vt(b)("select.placeholder")), 1),
            (V(!0), q(Ft, null, ee(u.formatOptions, (Rt) => {
              var At, jt;
              return V(), q("option", {
                key: Rt.value,
                value: Rt.value
              }, X(((At = Rt.label) == null ? void 0 : At[u.lang]) || ((jt = Rt.label) == null ? void 0 : jt.en) || Rt.value), 9, bd);
            }), 128))
          ], 40, yd)
        ]),
        $("div", xd, [
          $("label", null, X(vt(b)("dist.field.media-type")), 1),
          $("input", {
            type: "text",
            value: u.modelValue["dcat:mediaType"] || "",
            placeholder: "text/csv",
            onInput: pt[8] || (pt[8] = (Rt) => E("dcat:mediaType", Rt.target.value))
          }, null, 40, wd)
        ]),
        $("div", Ld, [
          $("label", null, X(vt(b)("dist.field.license")), 1),
          $("input", {
            type: "url",
            value: u.modelValue["dct:license"] || "",
            placeholder: "https://creativecommons.org/licenses/by/4.0/",
            onInput: pt[9] || (pt[9] = (Rt) => E("dct:license", Rt.target.value))
          }, null, 40, kd)
        ]),
        $("div", Cd, [
          $("label", null, X(vt(b)("dist.field.availability")), 1),
          $("select", {
            value: u.modelValue["dcatap:availability"] || "",
            onChange: pt[10] || (pt[10] = (Rt) => E("dcatap:availability", Rt.target.value))
          }, [
            $("option", Md, X(vt(b)("select.placeholder")), 1),
            (V(!0), q(Ft, null, ee(u.availabilityOptions, (Rt) => {
              var At, jt;
              return V(), q("option", {
                key: Rt.value,
                value: Rt.value
              }, X(((At = Rt.label) == null ? void 0 : At[u.lang]) || ((jt = Rt.label) == null ? void 0 : jt.en) || Rt.value), 9, Bd);
            }), 128))
          ], 40, Ed)
        ]),
        $("div", Ad, [
          $("label", null, X(vt(b)("dist.field.issued")), 1),
          $("input", {
            type: "date",
            value: u.modelValue["dct:issued"] || "",
            onInput: pt[11] || (pt[11] = (Rt) => E("dct:issued", Rt.target.value))
          }, null, 40, Sd)
        ]),
        $("div", Pd, [
          $("label", null, X(vt(b)("dist.field.modified")), 1),
          $("input", {
            type: "date",
            value: u.modelValue["dct:modified"] || "",
            onInput: pt[12] || (pt[12] = (Rt) => E("dct:modified", Rt.target.value))
          }, null, 40, Td)
        ])
      ]);
    };
  }
}, Ul = /* @__PURE__ */ re(Dd, [["__scopeId", "data-v-173f90fb"]]);
function Od(u, { selectors: l = ["button"], show: d } = {}) {
  async function p() {
    await $s();
    const b = u.value;
    if (b)
      for (const E of l) {
        const x = b.querySelector(E);
        if (x) {
          x.focus();
          return;
        }
      }
  }
  d ? pi(d, (b) => {
    b && p();
  }) : Qn(p);
}
const Id = ["aria-labelledby"], Fd = { class: "modal-header" }, Rd = ["id"], zd = ["aria-label"], Nd = { class: "modal-actions" }, jd = {
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
    const d = u, p = Ht(null);
    return Od(p, {
      selectors: d.focusSelectors,
      show: d.refocusOnShow ? eh(d, "show") : void 0
    }), l({ panelEl: p }), (b, E) => (V(), Oe(ih, {
      to: "body",
      disabled: !u.teleport
    }, [
      u.show ? (V(), q("div", {
        key: 0,
        class: "modal-overlay",
        onClick: E[1] || (E[1] = Ne((x) => b.$emit("close"), ["self"])),
        onKeydown: E[2] || (E[2] = Jn((x) => b.$emit("close"), ["esc"]))
      }, [
        $("div", {
          class: "modal-panel",
          role: "dialog",
          "aria-modal": "true",
          "aria-labelledby": u.headingId,
          style: Fl(u.maxWidth ? { maxWidth: u.maxWidth } : void 0),
          ref_key: "panelEl",
          ref: p
        }, [
          $("div", Fd, [
            $("h2", { id: u.headingId }, [
              ga(b.$slots, "title", {}, () => [
                Mi(X(u.title), 1)
              ], !0)
            ], 8, Rd),
            $("button", {
              class: "close-btn",
              "aria-label": u.closeLabel,
              onClick: E[0] || (E[0] = (x) => b.$emit("close"))
            }, "✕", 8, zd)
          ]),
          ga(b.$slots, "notice", {}, void 0, !0),
          ga(b.$slots, "tabs", {}, void 0, !0),
          ga(b.$slots, "default", {}, void 0, !0),
          $("div", Nd, [
            ga(b.$slots, "actions", {}, void 0, !0)
          ])
        ], 12, Id)
      ], 32)) : Mt("", !0)
    ], 8, ["disabled"]));
  }
}, il = /* @__PURE__ */ re(jd, [["__scopeId", "data-v-79ead561"]]), Vd = { class: "dist-body" }, $d = ["disabled", "aria-disabled"], Ud = {
  __name: "DistributionModal",
  props: {
    modelValue: { type: Object, default: () => ({}) },
    lang: String,
    show: Boolean,
    formatOptions: { type: Array, default: () => [] },
    availabilityOptions: { type: Array, default: () => [] },
    uploadConfig: { type: Object, default: null }
  },
  emits: ["save", "cancel"],
  setup(u, { emit: l }) {
    const { t: d } = Xe(), p = u, b = l, E = Ht({ ...p.modelValue || {} });
    pi(() => p.modelValue, (g) => {
      E.value = { ...g || {} };
    }, { deep: !0 });
    function x() {
      b("save", { ...E.value });
    }
    return (g, w) => (V(), Oe(il, {
      show: u.show,
      teleport: "",
      "refocus-on-show": "",
      "heading-id": "dist-modal-heading",
      title: vt(d)("dist.modal.title"),
      "close-label": u.lang === "de" ? "Dialog schließen" : "Close dialog",
      "max-width": "680px",
      "focus-selectors": ["input, select, textarea, button, [tabindex]:not([tabindex='-1'])"],
      onClose: w[2] || (w[2] = (B) => g.$emit("cancel"))
    }, {
      actions: cn(() => [
        $("button", {
          class: "btn-cancel",
          onClick: w[1] || (w[1] = (B) => g.$emit("cancel"))
        }, X(vt(d)("btn.cancel")), 1),
        $("button", {
          class: "btn-save",
          disabled: !E.value["dcat:accessURL"],
          "aria-disabled": !E.value["dcat:accessURL"],
          onClick: x
        }, X(vt(d)("btn.save")), 9, $d)
      ]),
      default: cn(() => [
        $("div", Vd, [
          Pn(Ul, {
            modelValue: E.value,
            lang: u.lang,
            formatOptions: u.formatOptions,
            availabilityOptions: u.availabilityOptions,
            uploadConfig: u.uploadConfig,
            "onUpdate:modelValue": w[0] || (w[0] = (B) => E.value = B)
          }, null, 8, ["modelValue", "lang", "formatOptions", "availabilityOptions", "uploadConfig"])
        ])
      ]),
      _: 1
    }, 8, ["show", "title", "close-label"]));
  }
}, Gd = /* @__PURE__ */ re(Ud, [["__scopeId", "data-v-82e5e491"]]), Gl = {
  assetsBaseUrl: "/"
};
function A_(u = {}) {
  if (u.assetsBaseUrl !== void 0 && (Gl.assetsBaseUrl = String(u.assetsBaseUrl).replace(/\/?$/, "/")), u.extend) {
    const { extend: l } = u;
    l.validators && Promise.resolve().then(() => Ff).then((d) => d.registerValidator(l.validators)), l.computes && Promise.resolve().then(() => E_).then((d) => d.registerCompute(l.computes)), l.transforms && Promise.resolve().then(() => qc).then((d) => d.registerTransform(l.transforms)), l.visibility && Promise.resolve().then(() => zf).then((d) => d.registerVisibility(l.visibility));
  }
}
function Yn(u) {
  return Gl.assetsBaseUrl + String(u).replace(/^\//, "");
}
const Zd = { class: "dist-editor" }, qd = { class: "dist-label" }, Hd = {
  key: 0,
  class: "dist-empty"
}, Kd = { class: "dist-empty-hint" }, Wd = ["onDragstart", "onDragover", "onDrop"], Jd = ["onClick"], Xd = ["aria-label"], Yd = { class: "dist-card-summary" }, Qd = { class: "dist-card-index" }, tf = { class: "dist-card-title" }, ef = {
  key: 0,
  class: "dist-card-badge"
}, nf = { class: "dist-card-controls" }, rf = ["aria-label", "onClick", "title"], af = {
  class: "dist-toggle",
  "aria-hidden": "true"
}, sf = {
  key: 0,
  class: "dist-card-body"
}, of = ["onDragstart", "onDragover", "onDrop"], lf = ["aria-label"], uf = { class: "dist-row-info" }, hf = { class: "dist-row-title" }, cf = {
  key: 0,
  class: "dist-row-url"
}, df = {
  key: 1,
  class: "dist-row-badge"
}, ff = { class: "dist-row-actions" }, pf = ["onClick"], mf = ["onClick"], _f = {
  __name: "DistributionEditor",
  props: {
    field: Object,
    lang: String,
    modelValue: { type: Array, default: () => [] }
  },
  emits: ["update:modelValue"],
  setup(u, { emit: l }) {
    const d = u, { t: p } = Xe(), b = Nt(() => {
      var Et;
      return ((Et = d.field) == null ? void 0 : Et.fileUpload) || null;
    }), E = l, x = Nt(() => {
      var Et;
      return ((Et = d.field) == null ? void 0 : Et.distributionMode) || "inline";
    }), g = Ht([]), w = [
      { value: "http://data.europa.eu/r5r/availability/stable", label: { de: "Stabil", en: "Stable" } },
      { value: "http://data.europa.eu/r5r/availability/available", label: { de: "Verfügbar", en: "Available" } },
      { value: "http://data.europa.eu/r5r/availability/experimental", label: { de: "Experimentell", en: "Experimental" } },
      { value: "http://data.europa.eu/r5r/availability/temporary", label: { de: "Vorübergehend", en: "Temporary" } }
    ];
    Qn(async () => {
      try {
        const Et = await fetch(Yn("vocabularies/file-format.json"));
        Et.ok && (g.value = await Et.json());
      } catch {
      }
    });
    const B = Nt(() => Array.isArray(d.modelValue) ? d.modelValue : []);
    function T() {
      return {
        "dcat:accessURL": "",
        "dcat:downloadURL": "",
        "dct:title": "",
        "dct:description": "",
        "dct:format": "",
        "dcat:mediaType": "",
        "dct:license": "",
        "dcatap:availability": "",
        "dct:issued": "",
        "dct:modified": ""
      };
    }
    function M() {
      if (x.value === "inline") {
        const Et = [...B.value, T()];
        E("update:modelValue", Et), lt.value = /* @__PURE__ */ new Set([...lt.value, Et.length - 1]);
      } else
        Bt.value = -1, pt.value = T();
    }
    function N(Et) {
      const Jt = B.value.filter((Ot, Pt) => Pt !== Et);
      if (Y.value.splice(Et, 1), E("update:modelValue", Jt), x.value === "inline") {
        const Ot = /* @__PURE__ */ new Set();
        for (const Pt of lt.value)
          Pt < Et ? Ot.add(Pt) : Pt > Et && Ot.add(Pt - 1);
        lt.value = Ot;
      }
    }
    function j(Et, Jt) {
      const Ot = B.value.map((Pt, ut) => ut === Et ? Jt : Pt);
      E("update:modelValue", Ot);
    }
    let G = 0;
    const Y = Ht([]);
    pi(B, (Et) => {
      for (; Y.value.length < Et.length; ) Y.value.push(++G);
    }, { immediate: !0 });
    const lt = Ht(/* @__PURE__ */ new Set([0]));
    function ct(Et) {
      const Jt = new Set(lt.value);
      Jt.has(Et) ? Jt.delete(Et) : Jt.add(Et), lt.value = Jt;
    }
    const pt = Ht(null), Bt = Ht(-1);
    function ue(Et) {
      Bt.value = Et, pt.value = { ...B.value[Et] || {} };
    }
    function Xt(Et) {
      const Jt = [...B.value];
      Bt.value === -1 ? Jt.push(Et) : Jt[Bt.value] = Et, E("update:modelValue", Jt), pt.value = null;
    }
    const Rt = Ht(-1), At = Ht(-1);
    function jt(Et, Jt) {
      Rt.value = Et, Jt.dataTransfer.effectAllowed = "move", Jt.dataTransfer.setData("text/plain", String(Et));
    }
    function se(Et) {
      Et !== Rt.value && (At.value = Et);
    }
    function Zt() {
      At.value = -1;
    }
    function Kt(Et) {
      const Jt = Rt.value;
      if (Jt === -1 || Jt === Et) {
        ce();
        return;
      }
      const Ot = [...B.value], [Pt] = Ot.splice(Jt, 1);
      if (Ot.splice(Et, 0, Pt), x.value === "inline") {
        const ut = /* @__PURE__ */ new Set();
        for (const bt of lt.value) {
          const Ct = Ye(bt, Jt, Et);
          Ct >= 0 && ut.add(Ct);
        }
        lt.value = ut;
      }
      E("update:modelValue", Ot), ce();
    }
    function ce() {
      Rt.value = -1, At.value = -1;
    }
    function Ye(Et, Jt, Ot) {
      return Et === Jt ? Ot : Jt < Ot ? Et > Jt && Et <= Ot ? Et - 1 : Et : Et >= Ot && Et < Jt ? Et + 1 : Et;
    }
    function Le(Et) {
      return Et["dct:title"] || Et["dcat:accessURL"] || "—";
    }
    function Qe(Et) {
      var Ot, Pt;
      const Jt = g.value.find((ut) => ut.value === Et);
      return Jt ? ((Ot = Jt.label) == null ? void 0 : Ot[d.lang]) || ((Pt = Jt.label) == null ? void 0 : Pt.en) || Et : Et.split("/").pop() || Et;
    }
    return (Et, Jt) => {
      var Ot, Pt;
      return V(), q("div", Zd, [
        $("label", qd, X(((Ot = u.field.label) == null ? void 0 : Ot[u.lang]) || ((Pt = u.field.label) == null ? void 0 : Pt.en) || u.field.id), 1),
        B.value.length ? (V(), q(Ft, { key: 1 }, [
          x.value === "inline" ? (V(!0), q(Ft, { key: 0 }, ee(B.value, (ut, bt) => (V(), q("div", {
            key: Y.value[bt] ?? bt,
            class: le(["dist-card", { "drag-over": At.value === bt, dragging: Rt.value === bt }]),
            draggable: "true",
            onDragstart: (Ct) => jt(bt, Ct),
            onDragover: Ne((Ct) => se(bt), ["prevent"]),
            onDragleave: Zt,
            onDrop: Ne((Ct) => Kt(bt), ["prevent"]),
            onDragend: ce
          }, [
            $("div", {
              class: "dist-card-header",
              onClick: (Ct) => ct(bt)
            }, [
              $("span", {
                class: "drag-handle",
                "aria-label": u.lang === "de" ? "Distribution verschieben" : "Drag to reorder",
                title: "Drag to reorder",
                onClick: Jt[0] || (Jt[0] = Ne(() => {
                }, ["stop"]))
              }, "⠿", 8, Xd),
              $("div", Yd, [
                $("span", Qd, X(bt + 1) + ".", 1),
                $("span", tf, X(Le(ut)), 1),
                ut["dct:format"] ? (V(), q("span", ef, X(Qe(ut["dct:format"])), 1)) : Mt("", !0)
              ]),
              $("div", nf, [
                $("button", {
                  type: "button",
                  class: "btn-remove-inline",
                  "aria-label": `Distribution ${bt + 1}`,
                  onClick: Ne((Ct) => N(bt), ["stop"]),
                  title: vt(p)("btn.remove")
                }, "✕", 8, rf),
                $("span", af, X(lt.value.has(bt) ? "▲" : "▼"), 1)
              ])
            ], 8, Jd),
            lt.value.has(bt) ? (V(), q("div", sf, [
              Pn(Ul, {
                modelValue: ut,
                lang: u.lang,
                formatOptions: g.value,
                availabilityOptions: w,
                uploadConfig: b.value,
                "onUpdate:modelValue": (Ct) => j(bt, Ct)
              }, null, 8, ["modelValue", "lang", "formatOptions", "uploadConfig", "onUpdate:modelValue"])
            ])) : Mt("", !0)
          ], 42, Wd))), 128)) : (V(!0), q(Ft, { key: 1 }, ee(B.value, (ut, bt) => (V(), q("div", {
            key: Y.value[bt] ?? bt,
            class: le(["dist-row", { "drag-over": At.value === bt, dragging: Rt.value === bt }]),
            draggable: "true",
            onDragstart: (Ct) => jt(bt, Ct),
            onDragover: Ne((Ct) => se(bt), ["prevent"]),
            onDragleave: Zt,
            onDrop: Ne((Ct) => Kt(bt), ["prevent"]),
            onDragend: ce
          }, [
            $("span", {
              class: "drag-handle",
              "aria-label": u.lang === "de" ? "Distribution verschieben" : "Drag to reorder",
              title: "Drag to reorder"
            }, "⠿", 8, lf),
            $("div", uf, [
              $("span", hf, X(Le(ut)), 1),
              ut["dcat:accessURL"] ? (V(), q("span", cf, X(ut["dcat:accessURL"]), 1)) : Mt("", !0),
              ut["dct:format"] ? (V(), q("span", df, X(Qe(ut["dct:format"])), 1)) : Mt("", !0)
            ]),
            $("div", ff, [
              $("button", {
                class: "btn-edit",
                onClick: (Ct) => ue(bt)
              }, X(vt(p)("btn.edit")), 9, pf),
              $("button", {
                class: "btn-remove",
                onClick: (Ct) => N(bt)
              }, X(vt(p)("btn.remove")), 9, mf)
            ])
          ], 42, of))), 128)),
          $("button", {
            type: "button",
            class: "btn-add",
            onClick: M
          }, " + " + X(vt(p)("btn.add-dist")), 1)
        ], 64)) : (V(), q("div", Hd, [
          $("p", Kd, X(vt(p)("dist.empty-hint")), 1),
          $("button", {
            class: "btn-add-first",
            onClick: M
          }, X(vt(p)("btn.add-first-dist")), 1)
        ])),
        x.value === "modal" && pt.value !== null ? (V(), Oe(Gd, {
          key: 2,
          show: pt.value !== null,
          modelValue: pt.value,
          lang: u.lang,
          formatOptions: g.value,
          availabilityOptions: w,
          uploadConfig: b.value,
          onSave: Xt,
          onCancel: Jt[1] || (Jt[1] = (ut) => pt.value = null)
        }, null, 8, ["show", "modelValue", "lang", "formatOptions", "uploadConfig"])) : Mt("", !0)
      ]);
    };
  }
}, gf = /* @__PURE__ */ re(_f, [["__scopeId", "data-v-c0c6b7c8"]]), yf = { class: "validation-report" }, vf = { class: "report-header" }, bf = { class: "report-title" }, xf = { class: "report-summary" }, wf = {
  key: 0,
  class: "badge badge-info"
}, Lf = ["aria-label"], kf = {
  key: 0,
  class: "report-valid",
  role: "status",
  "aria-live": "polite"
}, Cf = {
  key: 0,
  class: "sev-section"
}, Ef = { class: "sev-count" }, Mf = { class: "violation-field" }, Bf = { class: "field-label" }, Af = { class: "field-id" }, Sf = { class: "violation-constraint" }, Pf = { class: "constraint-tag" }, Tf = { class: "constraint-msg" }, Df = ["aria-label", "onClick"], Of = {
  __name: "ValidationReport",
  props: {
    violations: { type: Array, default: () => [] },
    lang: { type: String, default: "de" }
  },
  emits: ["close", "navigate"],
  setup(u) {
    const { t: l } = Xe(), d = u, p = Nt(() => {
      var w;
      const g = { violation: [], warning: [], info: [] };
      for (const B of d.violations)
        (w = g[B.severity]) == null || w.push(B);
      return g;
    }), b = Nt(() => ({
      violation: p.value.violation.length,
      warning: p.value.warning.length,
      info: p.value.info.length
    }));
    function E(g) {
      var w, B;
      return ((w = g.fieldLabel) == null ? void 0 : w[d.lang]) || ((B = g.fieldLabel) == null ? void 0 : B.en) || g.fieldId;
    }
    function x(g) {
      return g === "violation" ? l("validation.sev.violation") : g === "warning" ? l("validation.sev.warning") : g === "info" ? l("validation.sev.info") : g;
    }
    return (g, w) => (V(), q("div", yf, [
      $("div", vf, [
        $("span", bf, X(vt(l)("validation.title")), 1),
        $("div", xf, [
          $("span", {
            class: le(["badge badge-violation", { zero: b.value.violation === 0 }])
          }, [
            w[1] || (w[1] = $("span", { "aria-hidden": "true" }, "✗ ", -1)),
            Mi(X(b.value.violation) + " " + X(" " + vt(l)("validation.sev.violation")), 1)
          ], 2),
          $("span", {
            class: le(["badge badge-warning", { zero: b.value.warning === 0 }])
          }, [
            w[2] || (w[2] = $("span", { "aria-hidden": "true" }, "⚠ ", -1)),
            Mi(X(b.value.warning) + " " + X(" " + vt(l)("validation.sev.warning")), 1)
          ], 2),
          b.value.info > 0 ? (V(), q("span", wf, [
            w[3] || (w[3] = $("span", { "aria-hidden": "true" }, "ℹ ", -1)),
            Mi(X(b.value.info), 1)
          ])) : Mt("", !0)
        ]),
        $("button", {
          class: "btn-close",
          type: "button",
          "aria-label": u.lang === "de" ? "Bericht schließen" : "Close report",
          onClick: w[0] || (w[0] = (B) => g.$emit("close"))
        }, "×", 8, Lf)
      ]),
      u.violations.length === 0 ? (V(), q("div", kf, [
        w[4] || (w[4] = $("span", {
          class: "valid-icon",
          "aria-hidden": "true"
        }, "✓", -1)),
        $("span", null, X(vt(l)("validation.no-violations")), 1)
      ])) : Mt("", !0),
      (V(), q(Ft, null, ee(["violation", "warning", "info"], (B) => {
        var T;
        return V(), q(Ft, { key: B }, [
          (T = p.value[B]) != null && T.length ? (V(), q("div", Cf, [
            $("div", {
              class: le(["sev-heading", "sev-" + B])
            }, [
              $("span", null, X(x(B)), 1),
              $("span", Ef, "(" + X(p.value[B].length) + ")", 1)
            ], 2),
            (V(!0), q(Ft, null, ee(p.value[B], (M) => (V(), q("div", {
              key: M.fieldId + "|" + M.constraint,
              class: le(["violation-row", "row-" + M.severity])
            }, [
              $("div", Mf, [
                $("span", Bf, X(E(M)), 1),
                $("code", Af, X(M.fieldId), 1)
              ]),
              $("div", Sf, [
                $("span", Pf, X(M.constraint), 1),
                $("span", Tf, X(u.lang === "de" ? M.messageDe : M.messageEn), 1)
              ]),
              M.groupId ? (V(), q("button", {
                key: 0,
                type: "button",
                class: "btn-navigate",
                "aria-label": vt(l)("btn.navigate-to-field") + ": " + E(M),
                onClick: (N) => g.$emit("navigate", { fieldId: M.fieldId, groupId: M.groupId })
              }, X(vt(l)("btn.navigate-to-field")), 9, Df)) : Mt("", !0)
            ], 2))), 128))
          ])) : Mt("", !0)
        ], 64);
      }), 64))
    ]));
  }
}, Bl = /* @__PURE__ */ re(Of, [["__scopeId", "data-v-80082868"]]), Pa = {
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
function If(u, l) {
  const d = typeof u == "string" ? { [u]: l } : u;
  for (const [p, b] of Object.entries(d)) {
    if (Pa[p]) {
      console.warn(`[fieldValidators] "${p}" already exists — skipping. Use a unique name.`);
      continue;
    }
    Pa[p] = b;
  }
}
const Ff = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  fieldValidators: Pa,
  registerValidator: If
}, Symbol.toStringTag, { value: "Module" })), Ta = {
  ifHVDLegislation: (u) => (u == null ? void 0 : u["dcatap:applicableLegislation"]) === "http://data.europa.eu/eli/reg_impl/2023/138/oj"
};
function Rf(u, l) {
  const d = typeof u == "string" ? { [u]: l } : u;
  for (const [p, b] of Object.entries(d)) {
    if (Ta[p]) {
      console.warn(`[fieldVisibility] "${p}" already exists — skipping. Use a unique name.`);
      continue;
    }
    Ta[p] = b;
  }
}
function Zl(u, l) {
  if (!u) return !0;
  const d = Ta[u];
  return d ? d(l) : (console.warn(`[fieldVisibility] unknown function: "${u}"`), !0);
}
function ql(u, l) {
  if (!u) return !1;
  const d = Ta[u];
  return d ? d(l) : (console.warn(`[fieldVisibility] unknown requiredIf function: "${u}"`), !1);
}
const zf = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  evaluateRequiredIf: ql,
  evaluateVisibleIf: Zl,
  fieldVisibilityFns: Ta,
  registerVisibility: Rf
}, Symbol.toStringTag, { value: "Module" }));
function qo(u, l) {
  return u == null ? !1 : Array.isArray(u) ? u.some(
    (d) => d && (typeof d == "object" ? d.value || Object.values(d).some((p) => p) : d)
  ) : typeof u == "object" ? l != null && l.subFields ? l.subFields.filter((d) => d.required).every((d) => u[d.id]) : Object.values(u).some((d) => d) : u !== "";
}
function Hl(u, l, d, p) {
  var w, B, T, M;
  const b = [], E = d === "de";
  if ((u.required || ql(u.requiredIf, p)) && !qo(l, u)) {
    const N = ((B = (w = u.errorMessages) == null ? void 0 : w.required) == null ? void 0 : B[d]) || (E ? "Dieses Feld ist erforderlich." : "This field is required.");
    return b.push(N), b;
  }
  if (u.validate && qo(l, u)) {
    const N = Pa[u.validate];
    N ? b.push(...N(l, d)) : console.warn(`[useValidation] Unknown validator: "${u.validate}"`);
  }
  const g = typeof l == "object" && l !== null && !Array.isArray(l) && Object.values(l).some((N) => N);
  if (u.type === "object" && u.subFields && g)
    for (const N of u.subFields) {
      const j = Hl(N, l[N.id], d);
      if (j.length) {
        const G = ((T = N.label) == null ? void 0 : T[d]) || ((M = N.label) == null ? void 0 : M.de) || N.id;
        b.push(...j.map((Y) => `${G}: ${Y}`));
      }
    }
  return b;
}
function Nf(u, l, d) {
  const p = {};
  if (!(u != null && u.fields)) return p;
  const b = new Set(
    (u.groups || []).flatMap((E) => E.fields || [])
  );
  for (const [E, x] of Object.entries(u.fields)) {
    if (x.visible === !1 || !b.has(E)) continue;
    const g = Hl(x, l == null ? void 0 : l[E], d, l);
    g.length && (p[E] = g);
  }
  return p;
}
var Kl = {}, Zs = {};
Zs.byteLength = $f;
Zs.toByteArray = Gf;
Zs.fromByteArray = Hf;
var Yi = [], Ei = [], jf = typeof Uint8Array < "u" ? Uint8Array : Array, jo = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
for (var Lr = 0, Vf = jo.length; Lr < Vf; ++Lr)
  Yi[Lr] = jo[Lr], Ei[jo.charCodeAt(Lr)] = Lr;
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
function $f(u) {
  var l = Wl(u), d = l[0], p = l[1];
  return (d + p) * 3 / 4 - p;
}
function Uf(u, l, d) {
  return (l + d) * 3 / 4 - d;
}
function Gf(u) {
  var l, d = Wl(u), p = d[0], b = d[1], E = new jf(Uf(u, p, b)), x = 0, g = b > 0 ? p - 4 : p, w;
  for (w = 0; w < g; w += 4)
    l = Ei[u.charCodeAt(w)] << 18 | Ei[u.charCodeAt(w + 1)] << 12 | Ei[u.charCodeAt(w + 2)] << 6 | Ei[u.charCodeAt(w + 3)], E[x++] = l >> 16 & 255, E[x++] = l >> 8 & 255, E[x++] = l & 255;
  return b === 2 && (l = Ei[u.charCodeAt(w)] << 2 | Ei[u.charCodeAt(w + 1)] >> 4, E[x++] = l & 255), b === 1 && (l = Ei[u.charCodeAt(w)] << 10 | Ei[u.charCodeAt(w + 1)] << 4 | Ei[u.charCodeAt(w + 2)] >> 2, E[x++] = l >> 8 & 255, E[x++] = l & 255), E;
}
function Zf(u) {
  return Yi[u >> 18 & 63] + Yi[u >> 12 & 63] + Yi[u >> 6 & 63] + Yi[u & 63];
}
function qf(u, l, d) {
  for (var p, b = [], E = l; E < d; E += 3)
    p = (u[E] << 16 & 16711680) + (u[E + 1] << 8 & 65280) + (u[E + 2] & 255), b.push(Zf(p));
  return b.join("");
}
function Hf(u) {
  for (var l, d = u.length, p = d % 3, b = [], E = 16383, x = 0, g = d - p; x < g; x += E)
    b.push(qf(u, x, x + E > g ? g : x + E));
  return p === 1 ? (l = u[d - 1], b.push(
    Yi[l >> 2] + Yi[l << 4 & 63] + "=="
  )) : p === 2 && (l = (u[d - 2] << 8) + u[d - 1], b.push(
    Yi[l >> 10] + Yi[l >> 4 & 63] + Yi[l << 2 & 63] + "="
  )), b.join("");
}
var nl = {};
/*! ieee754. BSD-3-Clause License. Feross Aboukhadijeh <https://feross.org/opensource> */
nl.read = function(u, l, d, p, b) {
  var E, x, g = b * 8 - p - 1, w = (1 << g) - 1, B = w >> 1, T = -7, M = d ? b - 1 : 0, N = d ? -1 : 1, j = u[l + M];
  for (M += N, E = j & (1 << -T) - 1, j >>= -T, T += g; T > 0; E = E * 256 + u[l + M], M += N, T -= 8)
    ;
  for (x = E & (1 << -T) - 1, E >>= -T, T += p; T > 0; x = x * 256 + u[l + M], M += N, T -= 8)
    ;
  if (E === 0)
    E = 1 - B;
  else {
    if (E === w)
      return x ? NaN : (j ? -1 : 1) * (1 / 0);
    x = x + Math.pow(2, p), E = E - B;
  }
  return (j ? -1 : 1) * x * Math.pow(2, E - p);
};
nl.write = function(u, l, d, p, b, E) {
  var x, g, w, B = E * 8 - b - 1, T = (1 << B) - 1, M = T >> 1, N = b === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0, j = p ? 0 : E - 1, G = p ? 1 : -1, Y = l < 0 || l === 0 && 1 / l < 0 ? 1 : 0;
  for (l = Math.abs(l), isNaN(l) || l === 1 / 0 ? (g = isNaN(l) ? 1 : 0, x = T) : (x = Math.floor(Math.log(l) / Math.LN2), l * (w = Math.pow(2, -x)) < 1 && (x--, w *= 2), x + M >= 1 ? l += N / w : l += N * Math.pow(2, 1 - M), l * w >= 2 && (x++, w /= 2), x + M >= T ? (g = 0, x = T) : x + M >= 1 ? (g = (l * w - 1) * Math.pow(2, b), x = x + M) : (g = l * Math.pow(2, M - 1) * Math.pow(2, b), x = 0)); b >= 8; u[d + j] = g & 255, j += G, g /= 256, b -= 8)
    ;
  for (x = x << b | g, B += b; B > 0; u[d + j] = x & 255, j += G, x /= 256, B -= 8)
    ;
  u[d + j - G] |= Y * 128;
};
/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <https://feross.org>
 * @license  MIT
 */
(function(u) {
  const l = Zs, d = nl, p = typeof Symbol == "function" && typeof Symbol.for == "function" ? Symbol.for("nodejs.util.inspect.custom") : null;
  u.Buffer = g, u.SlowBuffer = pt, u.INSPECT_MAX_BYTES = 50;
  const b = 2147483647;
  u.kMaxLength = b, g.TYPED_ARRAY_SUPPORT = E(), !g.TYPED_ARRAY_SUPPORT && typeof console < "u" && typeof console.error == "function" && console.error(
    "This browser lacks typed array (Uint8Array) support which is required by `buffer` v5.x. Use `buffer` v4.x if you require old browser support."
  );
  function E() {
    try {
      const P = new Uint8Array(1), m = { foo: function() {
        return 42;
      } };
      return Object.setPrototypeOf(m, Uint8Array.prototype), Object.setPrototypeOf(P, m), P.foo() === 42;
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
  function x(P) {
    if (P > b)
      throw new RangeError('The value "' + P + '" is invalid for option "size"');
    const m = new Uint8Array(P);
    return Object.setPrototypeOf(m, g.prototype), m;
  }
  function g(P, m, v) {
    if (typeof P == "number") {
      if (typeof m == "string")
        throw new TypeError(
          'The "string" argument must be of type string. Received type number'
        );
      return M(P);
    }
    return w(P, m, v);
  }
  g.poolSize = 8192;
  function w(P, m, v) {
    if (typeof P == "string")
      return N(P, m);
    if (ArrayBuffer.isView(P))
      return G(P);
    if (P == null)
      throw new TypeError(
        "The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " + typeof P
      );
    if (ti(P, ArrayBuffer) || P && ti(P.buffer, ArrayBuffer) || typeof SharedArrayBuffer < "u" && (ti(P, SharedArrayBuffer) || P && ti(P.buffer, SharedArrayBuffer)))
      return Y(P, m, v);
    if (typeof P == "number")
      throw new TypeError(
        'The "value" argument must not be of type number. Received type number'
      );
    const R = P.valueOf && P.valueOf();
    if (R != null && R !== P)
      return g.from(R, m, v);
    const Q = lt(P);
    if (Q) return Q;
    if (typeof Symbol < "u" && Symbol.toPrimitive != null && typeof P[Symbol.toPrimitive] == "function")
      return g.from(P[Symbol.toPrimitive]("string"), m, v);
    throw new TypeError(
      "The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " + typeof P
    );
  }
  g.from = function(P, m, v) {
    return w(P, m, v);
  }, Object.setPrototypeOf(g.prototype, Uint8Array.prototype), Object.setPrototypeOf(g, Uint8Array);
  function B(P) {
    if (typeof P != "number")
      throw new TypeError('"size" argument must be of type number');
    if (P < 0)
      throw new RangeError('The value "' + P + '" is invalid for option "size"');
  }
  function T(P, m, v) {
    return B(P), P <= 0 ? x(P) : m !== void 0 ? typeof v == "string" ? x(P).fill(m, v) : x(P).fill(m) : x(P);
  }
  g.alloc = function(P, m, v) {
    return T(P, m, v);
  };
  function M(P) {
    return B(P), x(P < 0 ? 0 : ct(P) | 0);
  }
  g.allocUnsafe = function(P) {
    return M(P);
  }, g.allocUnsafeSlow = function(P) {
    return M(P);
  };
  function N(P, m) {
    if ((typeof m != "string" || m === "") && (m = "utf8"), !g.isEncoding(m))
      throw new TypeError("Unknown encoding: " + m);
    const v = Bt(P, m) | 0;
    let R = x(v);
    const Q = R.write(P, m);
    return Q !== v && (R = R.slice(0, Q)), R;
  }
  function j(P) {
    const m = P.length < 0 ? 0 : ct(P.length) | 0, v = x(m);
    for (let R = 0; R < m; R += 1)
      v[R] = P[R] & 255;
    return v;
  }
  function G(P) {
    if (ti(P, Uint8Array)) {
      const m = new Uint8Array(P);
      return Y(m.buffer, m.byteOffset, m.byteLength);
    }
    return j(P);
  }
  function Y(P, m, v) {
    if (m < 0 || P.byteLength < m)
      throw new RangeError('"offset" is outside of buffer bounds');
    if (P.byteLength < m + (v || 0))
      throw new RangeError('"length" is outside of buffer bounds');
    let R;
    return m === void 0 && v === void 0 ? R = new Uint8Array(P) : v === void 0 ? R = new Uint8Array(P, m) : R = new Uint8Array(P, m, v), Object.setPrototypeOf(R, g.prototype), R;
  }
  function lt(P) {
    if (g.isBuffer(P)) {
      const m = ct(P.length) | 0, v = x(m);
      return v.length === 0 || P.copy(v, 0, 0, m), v;
    }
    if (P.length !== void 0)
      return typeof P.length != "number" || pn(P.length) ? x(0) : j(P);
    if (P.type === "Buffer" && Array.isArray(P.data))
      return j(P.data);
  }
  function ct(P) {
    if (P >= b)
      throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x" + b.toString(16) + " bytes");
    return P | 0;
  }
  function pt(P) {
    return +P != P && (P = 0), g.alloc(+P);
  }
  g.isBuffer = function(m) {
    return m != null && m._isBuffer === !0 && m !== g.prototype;
  }, g.compare = function(m, v) {
    if (ti(m, Uint8Array) && (m = g.from(m, m.offset, m.byteLength)), ti(v, Uint8Array) && (v = g.from(v, v.offset, v.byteLength)), !g.isBuffer(m) || !g.isBuffer(v))
      throw new TypeError(
        'The "buf1", "buf2" arguments must be one of type Buffer or Uint8Array'
      );
    if (m === v) return 0;
    let R = m.length, Q = v.length;
    for (let ot = 0, mt = Math.min(R, Q); ot < mt; ++ot)
      if (m[ot] !== v[ot]) {
        R = m[ot], Q = v[ot];
        break;
      }
    return R < Q ? -1 : Q < R ? 1 : 0;
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
    const Q = g.allocUnsafe(v);
    let ot = 0;
    for (R = 0; R < m.length; ++R) {
      let mt = m[R];
      if (ti(mt, Uint8Array))
        ot + mt.length > Q.length ? (g.isBuffer(mt) || (mt = g.from(mt)), mt.copy(Q, ot)) : Uint8Array.prototype.set.call(
          Q,
          mt,
          ot
        );
      else if (g.isBuffer(mt))
        mt.copy(Q, ot);
      else
        throw new TypeError('"list" argument must be an Array of Buffers');
      ot += mt.length;
    }
    return Q;
  };
  function Bt(P, m) {
    if (g.isBuffer(P))
      return P.length;
    if (ArrayBuffer.isView(P) || ti(P, ArrayBuffer))
      return P.byteLength;
    if (typeof P != "string")
      throw new TypeError(
        'The "string" argument must be one of type string, Buffer, or ArrayBuffer. Received type ' + typeof P
      );
    const v = P.length, R = arguments.length > 2 && arguments[2] === !0;
    if (!R && v === 0) return 0;
    let Q = !1;
    for (; ; )
      switch (m) {
        case "ascii":
        case "latin1":
        case "binary":
          return v;
        case "utf8":
        case "utf-8":
          return zi(P).length;
        case "ucs2":
        case "ucs-2":
        case "utf16le":
        case "utf-16le":
          return v * 2;
        case "hex":
          return v >>> 1;
        case "base64":
          return Tn(P).length;
        default:
          if (Q)
            return R ? -1 : zi(P).length;
          m = ("" + m).toLowerCase(), Q = !0;
      }
  }
  g.byteLength = Bt;
  function ue(P, m, v) {
    let R = !1;
    if ((m === void 0 || m < 0) && (m = 0), m > this.length || ((v === void 0 || v > this.length) && (v = this.length), v <= 0) || (v >>>= 0, m >>>= 0, v <= m))
      return "";
    for (P || (P = "utf8"); ; )
      switch (P) {
        case "hex":
          return Pt(this, m, v);
        case "utf8":
        case "utf-8":
          return Le(this, m, v);
        case "ascii":
          return Jt(this, m, v);
        case "latin1":
        case "binary":
          return Ot(this, m, v);
        case "base64":
          return Ye(this, m, v);
        case "ucs2":
        case "ucs-2":
        case "utf16le":
        case "utf-16le":
          return ut(this, m, v);
        default:
          if (R) throw new TypeError("Unknown encoding: " + P);
          P = (P + "").toLowerCase(), R = !0;
      }
  }
  g.prototype._isBuffer = !0;
  function Xt(P, m, v) {
    const R = P[m];
    P[m] = P[v], P[v] = R;
  }
  g.prototype.swap16 = function() {
    const m = this.length;
    if (m % 2 !== 0)
      throw new RangeError("Buffer size must be a multiple of 16-bits");
    for (let v = 0; v < m; v += 2)
      Xt(this, v, v + 1);
    return this;
  }, g.prototype.swap32 = function() {
    const m = this.length;
    if (m % 4 !== 0)
      throw new RangeError("Buffer size must be a multiple of 32-bits");
    for (let v = 0; v < m; v += 4)
      Xt(this, v, v + 3), Xt(this, v + 1, v + 2);
    return this;
  }, g.prototype.swap64 = function() {
    const m = this.length;
    if (m % 8 !== 0)
      throw new RangeError("Buffer size must be a multiple of 64-bits");
    for (let v = 0; v < m; v += 8)
      Xt(this, v, v + 7), Xt(this, v + 1, v + 6), Xt(this, v + 2, v + 5), Xt(this, v + 3, v + 4);
    return this;
  }, g.prototype.toString = function() {
    const m = this.length;
    return m === 0 ? "" : arguments.length === 0 ? Le(this, 0, m) : ue.apply(this, arguments);
  }, g.prototype.toLocaleString = g.prototype.toString, g.prototype.equals = function(m) {
    if (!g.isBuffer(m)) throw new TypeError("Argument must be a Buffer");
    return this === m ? !0 : g.compare(this, m) === 0;
  }, g.prototype.inspect = function() {
    let m = "";
    const v = u.INSPECT_MAX_BYTES;
    return m = this.toString("hex", 0, v).replace(/(.{2})/g, "$1 ").trim(), this.length > v && (m += " ... "), "<Buffer " + m + ">";
  }, p && (g.prototype[p] = g.prototype.inspect), g.prototype.compare = function(m, v, R, Q, ot) {
    if (ti(m, Uint8Array) && (m = g.from(m, m.offset, m.byteLength)), !g.isBuffer(m))
      throw new TypeError(
        'The "target" argument must be one of type Buffer or Uint8Array. Received type ' + typeof m
      );
    if (v === void 0 && (v = 0), R === void 0 && (R = m ? m.length : 0), Q === void 0 && (Q = 0), ot === void 0 && (ot = this.length), v < 0 || R > m.length || Q < 0 || ot > this.length)
      throw new RangeError("out of range index");
    if (Q >= ot && v >= R)
      return 0;
    if (Q >= ot)
      return -1;
    if (v >= R)
      return 1;
    if (v >>>= 0, R >>>= 0, Q >>>= 0, ot >>>= 0, this === m) return 0;
    let mt = ot - Q, Yt = R - v;
    const ge = Math.min(mt, Yt), be = this.slice(Q, ot), _e = m.slice(v, R);
    for (let ye = 0; ye < ge; ++ye)
      if (be[ye] !== _e[ye]) {
        mt = be[ye], Yt = _e[ye];
        break;
      }
    return mt < Yt ? -1 : Yt < mt ? 1 : 0;
  };
  function Rt(P, m, v, R, Q) {
    if (P.length === 0) return -1;
    if (typeof v == "string" ? (R = v, v = 0) : v > 2147483647 ? v = 2147483647 : v < -2147483648 && (v = -2147483648), v = +v, pn(v) && (v = Q ? 0 : P.length - 1), v < 0 && (v = P.length + v), v >= P.length) {
      if (Q) return -1;
      v = P.length - 1;
    } else if (v < 0)
      if (Q) v = 0;
      else return -1;
    if (typeof m == "string" && (m = g.from(m, R)), g.isBuffer(m))
      return m.length === 0 ? -1 : At(P, m, v, R, Q);
    if (typeof m == "number")
      return m = m & 255, typeof Uint8Array.prototype.indexOf == "function" ? Q ? Uint8Array.prototype.indexOf.call(P, m, v) : Uint8Array.prototype.lastIndexOf.call(P, m, v) : At(P, [m], v, R, Q);
    throw new TypeError("val must be string, number or Buffer");
  }
  function At(P, m, v, R, Q) {
    let ot = 1, mt = P.length, Yt = m.length;
    if (R !== void 0 && (R = String(R).toLowerCase(), R === "ucs2" || R === "ucs-2" || R === "utf16le" || R === "utf-16le")) {
      if (P.length < 2 || m.length < 2)
        return -1;
      ot = 2, mt /= 2, Yt /= 2, v /= 2;
    }
    function ge(_e, ye) {
      return ot === 1 ? _e[ye] : _e.readUInt16BE(ye * ot);
    }
    let be;
    if (Q) {
      let _e = -1;
      for (be = v; be < mt; be++)
        if (ge(P, be) === ge(m, _e === -1 ? 0 : be - _e)) {
          if (_e === -1 && (_e = be), be - _e + 1 === Yt) return _e * ot;
        } else
          _e !== -1 && (be -= be - _e), _e = -1;
    } else
      for (v + Yt > mt && (v = mt - Yt), be = v; be >= 0; be--) {
        let _e = !0;
        for (let ye = 0; ye < Yt; ye++)
          if (ge(P, be + ye) !== ge(m, ye)) {
            _e = !1;
            break;
          }
        if (_e) return be;
      }
    return -1;
  }
  g.prototype.includes = function(m, v, R) {
    return this.indexOf(m, v, R) !== -1;
  }, g.prototype.indexOf = function(m, v, R) {
    return Rt(this, m, v, R, !0);
  }, g.prototype.lastIndexOf = function(m, v, R) {
    return Rt(this, m, v, R, !1);
  };
  function jt(P, m, v, R) {
    v = Number(v) || 0;
    const Q = P.length - v;
    R ? (R = Number(R), R > Q && (R = Q)) : R = Q;
    const ot = m.length;
    R > ot / 2 && (R = ot / 2);
    let mt;
    for (mt = 0; mt < R; ++mt) {
      const Yt = parseInt(m.substr(mt * 2, 2), 16);
      if (pn(Yt)) return mt;
      P[v + mt] = Yt;
    }
    return mt;
  }
  function se(P, m, v, R) {
    return ji(zi(m, P.length - v), P, v, R);
  }
  function Zt(P, m, v, R) {
    return ji(Ni(m), P, v, R);
  }
  function Kt(P, m, v, R) {
    return ji(Tn(m), P, v, R);
  }
  function ce(P, m, v, R) {
    return ji(ir(m, P.length - v), P, v, R);
  }
  g.prototype.write = function(m, v, R, Q) {
    if (v === void 0)
      Q = "utf8", R = this.length, v = 0;
    else if (R === void 0 && typeof v == "string")
      Q = v, R = this.length, v = 0;
    else if (isFinite(v))
      v = v >>> 0, isFinite(R) ? (R = R >>> 0, Q === void 0 && (Q = "utf8")) : (Q = R, R = void 0);
    else
      throw new Error(
        "Buffer.write(string, encoding, offset[, length]) is no longer supported"
      );
    const ot = this.length - v;
    if ((R === void 0 || R > ot) && (R = ot), m.length > 0 && (R < 0 || v < 0) || v > this.length)
      throw new RangeError("Attempt to write outside buffer bounds");
    Q || (Q = "utf8");
    let mt = !1;
    for (; ; )
      switch (Q) {
        case "hex":
          return jt(this, m, v, R);
        case "utf8":
        case "utf-8":
          return se(this, m, v, R);
        case "ascii":
        case "latin1":
        case "binary":
          return Zt(this, m, v, R);
        case "base64":
          return Kt(this, m, v, R);
        case "ucs2":
        case "ucs-2":
        case "utf16le":
        case "utf-16le":
          return ce(this, m, v, R);
        default:
          if (mt) throw new TypeError("Unknown encoding: " + Q);
          Q = ("" + Q).toLowerCase(), mt = !0;
      }
  }, g.prototype.toJSON = function() {
    return {
      type: "Buffer",
      data: Array.prototype.slice.call(this._arr || this, 0)
    };
  };
  function Ye(P, m, v) {
    return m === 0 && v === P.length ? l.fromByteArray(P) : l.fromByteArray(P.slice(m, v));
  }
  function Le(P, m, v) {
    v = Math.min(P.length, v);
    const R = [];
    let Q = m;
    for (; Q < v; ) {
      const ot = P[Q];
      let mt = null, Yt = ot > 239 ? 4 : ot > 223 ? 3 : ot > 191 ? 2 : 1;
      if (Q + Yt <= v) {
        let ge, be, _e, ye;
        switch (Yt) {
          case 1:
            ot < 128 && (mt = ot);
            break;
          case 2:
            ge = P[Q + 1], (ge & 192) === 128 && (ye = (ot & 31) << 6 | ge & 63, ye > 127 && (mt = ye));
            break;
          case 3:
            ge = P[Q + 1], be = P[Q + 2], (ge & 192) === 128 && (be & 192) === 128 && (ye = (ot & 15) << 12 | (ge & 63) << 6 | be & 63, ye > 2047 && (ye < 55296 || ye > 57343) && (mt = ye));
            break;
          case 4:
            ge = P[Q + 1], be = P[Q + 2], _e = P[Q + 3], (ge & 192) === 128 && (be & 192) === 128 && (_e & 192) === 128 && (ye = (ot & 15) << 18 | (ge & 63) << 12 | (be & 63) << 6 | _e & 63, ye > 65535 && ye < 1114112 && (mt = ye));
        }
      }
      mt === null ? (mt = 65533, Yt = 1) : mt > 65535 && (mt -= 65536, R.push(mt >>> 10 & 1023 | 55296), mt = 56320 | mt & 1023), R.push(mt), Q += Yt;
    }
    return Et(R);
  }
  const Qe = 4096;
  function Et(P) {
    const m = P.length;
    if (m <= Qe)
      return String.fromCharCode.apply(String, P);
    let v = "", R = 0;
    for (; R < m; )
      v += String.fromCharCode.apply(
        String,
        P.slice(R, R += Qe)
      );
    return v;
  }
  function Jt(P, m, v) {
    let R = "";
    v = Math.min(P.length, v);
    for (let Q = m; Q < v; ++Q)
      R += String.fromCharCode(P[Q] & 127);
    return R;
  }
  function Ot(P, m, v) {
    let R = "";
    v = Math.min(P.length, v);
    for (let Q = m; Q < v; ++Q)
      R += String.fromCharCode(P[Q]);
    return R;
  }
  function Pt(P, m, v) {
    const R = P.length;
    (!m || m < 0) && (m = 0), (!v || v < 0 || v > R) && (v = R);
    let Q = "";
    for (let ot = m; ot < v; ++ot)
      Q += Tr[P[ot]];
    return Q;
  }
  function ut(P, m, v) {
    const R = P.slice(m, v);
    let Q = "";
    for (let ot = 0; ot < R.length - 1; ot += 2)
      Q += String.fromCharCode(R[ot] + R[ot + 1] * 256);
    return Q;
  }
  g.prototype.slice = function(m, v) {
    const R = this.length;
    m = ~~m, v = v === void 0 ? R : ~~v, m < 0 ? (m += R, m < 0 && (m = 0)) : m > R && (m = R), v < 0 ? (v += R, v < 0 && (v = 0)) : v > R && (v = R), v < m && (v = m);
    const Q = this.subarray(m, v);
    return Object.setPrototypeOf(Q, g.prototype), Q;
  };
  function bt(P, m, v) {
    if (P % 1 !== 0 || P < 0) throw new RangeError("offset is not uint");
    if (P + m > v) throw new RangeError("Trying to access beyond buffer length");
  }
  g.prototype.readUintLE = g.prototype.readUIntLE = function(m, v, R) {
    m = m >>> 0, v = v >>> 0, R || bt(m, v, this.length);
    let Q = this[m], ot = 1, mt = 0;
    for (; ++mt < v && (ot *= 256); )
      Q += this[m + mt] * ot;
    return Q;
  }, g.prototype.readUintBE = g.prototype.readUIntBE = function(m, v, R) {
    m = m >>> 0, v = v >>> 0, R || bt(m, v, this.length);
    let Q = this[m + --v], ot = 1;
    for (; v > 0 && (ot *= 256); )
      Q += this[m + --v] * ot;
    return Q;
  }, g.prototype.readUint8 = g.prototype.readUInt8 = function(m, v) {
    return m = m >>> 0, v || bt(m, 1, this.length), this[m];
  }, g.prototype.readUint16LE = g.prototype.readUInt16LE = function(m, v) {
    return m = m >>> 0, v || bt(m, 2, this.length), this[m] | this[m + 1] << 8;
  }, g.prototype.readUint16BE = g.prototype.readUInt16BE = function(m, v) {
    return m = m >>> 0, v || bt(m, 2, this.length), this[m] << 8 | this[m + 1];
  }, g.prototype.readUint32LE = g.prototype.readUInt32LE = function(m, v) {
    return m = m >>> 0, v || bt(m, 4, this.length), (this[m] | this[m + 1] << 8 | this[m + 2] << 16) + this[m + 3] * 16777216;
  }, g.prototype.readUint32BE = g.prototype.readUInt32BE = function(m, v) {
    return m = m >>> 0, v || bt(m, 4, this.length), this[m] * 16777216 + (this[m + 1] << 16 | this[m + 2] << 8 | this[m + 3]);
  }, g.prototype.readBigUInt64LE = _i(function(m) {
    m = m >>> 0, mi(m, "offset");
    const v = this[m], R = this[m + 7];
    (v === void 0 || R === void 0) && Ri(m, this.length - 8);
    const Q = v + this[++m] * 2 ** 8 + this[++m] * 2 ** 16 + this[++m] * 2 ** 24, ot = this[++m] + this[++m] * 2 ** 8 + this[++m] * 2 ** 16 + R * 2 ** 24;
    return BigInt(Q) + (BigInt(ot) << BigInt(32));
  }), g.prototype.readBigUInt64BE = _i(function(m) {
    m = m >>> 0, mi(m, "offset");
    const v = this[m], R = this[m + 7];
    (v === void 0 || R === void 0) && Ri(m, this.length - 8);
    const Q = v * 2 ** 24 + this[++m] * 2 ** 16 + this[++m] * 2 ** 8 + this[++m], ot = this[++m] * 2 ** 24 + this[++m] * 2 ** 16 + this[++m] * 2 ** 8 + R;
    return (BigInt(Q) << BigInt(32)) + BigInt(ot);
  }), g.prototype.readIntLE = function(m, v, R) {
    m = m >>> 0, v = v >>> 0, R || bt(m, v, this.length);
    let Q = this[m], ot = 1, mt = 0;
    for (; ++mt < v && (ot *= 256); )
      Q += this[m + mt] * ot;
    return ot *= 128, Q >= ot && (Q -= Math.pow(2, 8 * v)), Q;
  }, g.prototype.readIntBE = function(m, v, R) {
    m = m >>> 0, v = v >>> 0, R || bt(m, v, this.length);
    let Q = v, ot = 1, mt = this[m + --Q];
    for (; Q > 0 && (ot *= 256); )
      mt += this[m + --Q] * ot;
    return ot *= 128, mt >= ot && (mt -= Math.pow(2, 8 * v)), mt;
  }, g.prototype.readInt8 = function(m, v) {
    return m = m >>> 0, v || bt(m, 1, this.length), this[m] & 128 ? (255 - this[m] + 1) * -1 : this[m];
  }, g.prototype.readInt16LE = function(m, v) {
    m = m >>> 0, v || bt(m, 2, this.length);
    const R = this[m] | this[m + 1] << 8;
    return R & 32768 ? R | 4294901760 : R;
  }, g.prototype.readInt16BE = function(m, v) {
    m = m >>> 0, v || bt(m, 2, this.length);
    const R = this[m + 1] | this[m] << 8;
    return R & 32768 ? R | 4294901760 : R;
  }, g.prototype.readInt32LE = function(m, v) {
    return m = m >>> 0, v || bt(m, 4, this.length), this[m] | this[m + 1] << 8 | this[m + 2] << 16 | this[m + 3] << 24;
  }, g.prototype.readInt32BE = function(m, v) {
    return m = m >>> 0, v || bt(m, 4, this.length), this[m] << 24 | this[m + 1] << 16 | this[m + 2] << 8 | this[m + 3];
  }, g.prototype.readBigInt64LE = _i(function(m) {
    m = m >>> 0, mi(m, "offset");
    const v = this[m], R = this[m + 7];
    (v === void 0 || R === void 0) && Ri(m, this.length - 8);
    const Q = this[m + 4] + this[m + 5] * 2 ** 8 + this[m + 6] * 2 ** 16 + (R << 24);
    return (BigInt(Q) << BigInt(32)) + BigInt(v + this[++m] * 2 ** 8 + this[++m] * 2 ** 16 + this[++m] * 2 ** 24);
  }), g.prototype.readBigInt64BE = _i(function(m) {
    m = m >>> 0, mi(m, "offset");
    const v = this[m], R = this[m + 7];
    (v === void 0 || R === void 0) && Ri(m, this.length - 8);
    const Q = (v << 24) + // Overflow
    this[++m] * 2 ** 16 + this[++m] * 2 ** 8 + this[++m];
    return (BigInt(Q) << BigInt(32)) + BigInt(this[++m] * 2 ** 24 + this[++m] * 2 ** 16 + this[++m] * 2 ** 8 + R);
  }), g.prototype.readFloatLE = function(m, v) {
    return m = m >>> 0, v || bt(m, 4, this.length), d.read(this, m, !0, 23, 4);
  }, g.prototype.readFloatBE = function(m, v) {
    return m = m >>> 0, v || bt(m, 4, this.length), d.read(this, m, !1, 23, 4);
  }, g.prototype.readDoubleLE = function(m, v) {
    return m = m >>> 0, v || bt(m, 8, this.length), d.read(this, m, !0, 52, 8);
  }, g.prototype.readDoubleBE = function(m, v) {
    return m = m >>> 0, v || bt(m, 8, this.length), d.read(this, m, !1, 52, 8);
  };
  function Ct(P, m, v, R, Q, ot) {
    if (!g.isBuffer(P)) throw new TypeError('"buffer" argument must be a Buffer instance');
    if (m > Q || m < ot) throw new RangeError('"value" argument is out of bounds');
    if (v + R > P.length) throw new RangeError("Index out of range");
  }
  g.prototype.writeUintLE = g.prototype.writeUIntLE = function(m, v, R, Q) {
    if (m = +m, v = v >>> 0, R = R >>> 0, !Q) {
      const Yt = Math.pow(2, 8 * R) - 1;
      Ct(this, m, v, R, Yt, 0);
    }
    let ot = 1, mt = 0;
    for (this[v] = m & 255; ++mt < R && (ot *= 256); )
      this[v + mt] = m / ot & 255;
    return v + R;
  }, g.prototype.writeUintBE = g.prototype.writeUIntBE = function(m, v, R, Q) {
    if (m = +m, v = v >>> 0, R = R >>> 0, !Q) {
      const Yt = Math.pow(2, 8 * R) - 1;
      Ct(this, m, v, R, Yt, 0);
    }
    let ot = R - 1, mt = 1;
    for (this[v + ot] = m & 255; --ot >= 0 && (mt *= 256); )
      this[v + ot] = m / mt & 255;
    return v + R;
  }, g.prototype.writeUint8 = g.prototype.writeUInt8 = function(m, v, R) {
    return m = +m, v = v >>> 0, R || Ct(this, m, v, 1, 255, 0), this[v] = m & 255, v + 1;
  }, g.prototype.writeUint16LE = g.prototype.writeUInt16LE = function(m, v, R) {
    return m = +m, v = v >>> 0, R || Ct(this, m, v, 2, 65535, 0), this[v] = m & 255, this[v + 1] = m >>> 8, v + 2;
  }, g.prototype.writeUint16BE = g.prototype.writeUInt16BE = function(m, v, R) {
    return m = +m, v = v >>> 0, R || Ct(this, m, v, 2, 65535, 0), this[v] = m >>> 8, this[v + 1] = m & 255, v + 2;
  }, g.prototype.writeUint32LE = g.prototype.writeUInt32LE = function(m, v, R) {
    return m = +m, v = v >>> 0, R || Ct(this, m, v, 4, 4294967295, 0), this[v + 3] = m >>> 24, this[v + 2] = m >>> 16, this[v + 1] = m >>> 8, this[v] = m & 255, v + 4;
  }, g.prototype.writeUint32BE = g.prototype.writeUInt32BE = function(m, v, R) {
    return m = +m, v = v >>> 0, R || Ct(this, m, v, 4, 4294967295, 0), this[v] = m >>> 24, this[v + 1] = m >>> 16, this[v + 2] = m >>> 8, this[v + 3] = m & 255, v + 4;
  };
  function oe(P, m, v, R, Q) {
    Fi(m, R, Q, P, v, 7);
    let ot = Number(m & BigInt(4294967295));
    P[v++] = ot, ot = ot >> 8, P[v++] = ot, ot = ot >> 8, P[v++] = ot, ot = ot >> 8, P[v++] = ot;
    let mt = Number(m >> BigInt(32) & BigInt(4294967295));
    return P[v++] = mt, mt = mt >> 8, P[v++] = mt, mt = mt >> 8, P[v++] = mt, mt = mt >> 8, P[v++] = mt, v;
  }
  function zt(P, m, v, R, Q) {
    Fi(m, R, Q, P, v, 7);
    let ot = Number(m & BigInt(4294967295));
    P[v + 7] = ot, ot = ot >> 8, P[v + 6] = ot, ot = ot >> 8, P[v + 5] = ot, ot = ot >> 8, P[v + 4] = ot;
    let mt = Number(m >> BigInt(32) & BigInt(4294967295));
    return P[v + 3] = mt, mt = mt >> 8, P[v + 2] = mt, mt = mt >> 8, P[v + 1] = mt, mt = mt >> 8, P[v] = mt, v + 8;
  }
  g.prototype.writeBigUInt64LE = _i(function(m, v = 0) {
    return oe(this, m, v, BigInt(0), BigInt("0xffffffffffffffff"));
  }), g.prototype.writeBigUInt64BE = _i(function(m, v = 0) {
    return zt(this, m, v, BigInt(0), BigInt("0xffffffffffffffff"));
  }), g.prototype.writeIntLE = function(m, v, R, Q) {
    if (m = +m, v = v >>> 0, !Q) {
      const ge = Math.pow(2, 8 * R - 1);
      Ct(this, m, v, R, ge - 1, -ge);
    }
    let ot = 0, mt = 1, Yt = 0;
    for (this[v] = m & 255; ++ot < R && (mt *= 256); )
      m < 0 && Yt === 0 && this[v + ot - 1] !== 0 && (Yt = 1), this[v + ot] = (m / mt >> 0) - Yt & 255;
    return v + R;
  }, g.prototype.writeIntBE = function(m, v, R, Q) {
    if (m = +m, v = v >>> 0, !Q) {
      const ge = Math.pow(2, 8 * R - 1);
      Ct(this, m, v, R, ge - 1, -ge);
    }
    let ot = R - 1, mt = 1, Yt = 0;
    for (this[v + ot] = m & 255; --ot >= 0 && (mt *= 256); )
      m < 0 && Yt === 0 && this[v + ot + 1] !== 0 && (Yt = 1), this[v + ot] = (m / mt >> 0) - Yt & 255;
    return v + R;
  }, g.prototype.writeInt8 = function(m, v, R) {
    return m = +m, v = v >>> 0, R || Ct(this, m, v, 1, 127, -128), m < 0 && (m = 255 + m + 1), this[v] = m & 255, v + 1;
  }, g.prototype.writeInt16LE = function(m, v, R) {
    return m = +m, v = v >>> 0, R || Ct(this, m, v, 2, 32767, -32768), this[v] = m & 255, this[v + 1] = m >>> 8, v + 2;
  }, g.prototype.writeInt16BE = function(m, v, R) {
    return m = +m, v = v >>> 0, R || Ct(this, m, v, 2, 32767, -32768), this[v] = m >>> 8, this[v + 1] = m & 255, v + 2;
  }, g.prototype.writeInt32LE = function(m, v, R) {
    return m = +m, v = v >>> 0, R || Ct(this, m, v, 4, 2147483647, -2147483648), this[v] = m & 255, this[v + 1] = m >>> 8, this[v + 2] = m >>> 16, this[v + 3] = m >>> 24, v + 4;
  }, g.prototype.writeInt32BE = function(m, v, R) {
    return m = +m, v = v >>> 0, R || Ct(this, m, v, 4, 2147483647, -2147483648), m < 0 && (m = 4294967295 + m + 1), this[v] = m >>> 24, this[v + 1] = m >>> 16, this[v + 2] = m >>> 8, this[v + 3] = m & 255, v + 4;
  }, g.prototype.writeBigInt64LE = _i(function(m, v = 0) {
    return oe(this, m, v, -BigInt("0x8000000000000000"), BigInt("0x7fffffffffffffff"));
  }), g.prototype.writeBigInt64BE = _i(function(m, v = 0) {
    return zt(this, m, v, -BigInt("0x8000000000000000"), BigInt("0x7fffffffffffffff"));
  });
  function Tt(P, m, v, R, Q, ot) {
    if (v + R > P.length) throw new RangeError("Index out of range");
    if (v < 0) throw new RangeError("Index out of range");
  }
  function St(P, m, v, R, Q) {
    return m = +m, v = v >>> 0, Q || Tt(P, m, v, 4), d.write(P, m, v, R, 23, 4), v + 4;
  }
  g.prototype.writeFloatLE = function(m, v, R) {
    return St(this, m, v, !0, R);
  }, g.prototype.writeFloatBE = function(m, v, R) {
    return St(this, m, v, !1, R);
  };
  function ve(P, m, v, R, Q) {
    return m = +m, v = v >>> 0, Q || Tt(P, m, v, 8), d.write(P, m, v, R, 52, 8), v + 8;
  }
  g.prototype.writeDoubleLE = function(m, v, R) {
    return ve(this, m, v, !0, R);
  }, g.prototype.writeDoubleBE = function(m, v, R) {
    return ve(this, m, v, !1, R);
  }, g.prototype.copy = function(m, v, R, Q) {
    if (!g.isBuffer(m)) throw new TypeError("argument should be a Buffer");
    if (R || (R = 0), !Q && Q !== 0 && (Q = this.length), v >= m.length && (v = m.length), v || (v = 0), Q > 0 && Q < R && (Q = R), Q === R || m.length === 0 || this.length === 0) return 0;
    if (v < 0)
      throw new RangeError("targetStart out of bounds");
    if (R < 0 || R >= this.length) throw new RangeError("Index out of range");
    if (Q < 0) throw new RangeError("sourceEnd out of bounds");
    Q > this.length && (Q = this.length), m.length - v < Q - R && (Q = m.length - v + R);
    const ot = Q - R;
    return this === m && typeof Uint8Array.prototype.copyWithin == "function" ? this.copyWithin(v, R, Q) : Uint8Array.prototype.set.call(
      m,
      this.subarray(R, Q),
      v
    ), ot;
  }, g.prototype.fill = function(m, v, R, Q) {
    if (typeof m == "string") {
      if (typeof v == "string" ? (Q = v, v = 0, R = this.length) : typeof R == "string" && (Q = R, R = this.length), Q !== void 0 && typeof Q != "string")
        throw new TypeError("encoding must be a string");
      if (typeof Q == "string" && !g.isEncoding(Q))
        throw new TypeError("Unknown encoding: " + Q);
      if (m.length === 1) {
        const mt = m.charCodeAt(0);
        (Q === "utf8" && mt < 128 || Q === "latin1") && (m = mt);
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
      const mt = g.isBuffer(m) ? m : g.from(m, Q), Yt = mt.length;
      if (Yt === 0)
        throw new TypeError('The value "' + m + '" is invalid for argument "value"');
      for (ot = 0; ot < R - v; ++ot)
        this[ot + v] = mt[ot % Yt];
    }
    return this;
  };
  const fe = {};
  function we(P, m, v) {
    fe[P] = class extends v {
      constructor() {
        super(), Object.defineProperty(this, "message", {
          value: m.apply(this, arguments),
          writable: !0,
          configurable: !0
        }), this.name = `${this.name} [${P}]`, this.stack, delete this.name;
      }
      get code() {
        return P;
      }
      set code(Q) {
        Object.defineProperty(this, "code", {
          configurable: !0,
          enumerable: !0,
          value: Q,
          writable: !0
        });
      }
      toString() {
        return `${this.name} [${P}]: ${this.message}`;
      }
    };
  }
  we(
    "ERR_BUFFER_OUT_OF_BOUNDS",
    function(P) {
      return P ? `${P} is outside of buffer bounds` : "Attempt to access memory outside buffer bounds";
    },
    RangeError
  ), we(
    "ERR_INVALID_ARG_TYPE",
    function(P, m) {
      return `The "${P}" argument must be of type number. Received type ${typeof m}`;
    },
    TypeError
  ), we(
    "ERR_OUT_OF_RANGE",
    function(P, m, v) {
      let R = `The value of "${P}" is out of range.`, Q = v;
      return Number.isInteger(v) && Math.abs(v) > 2 ** 32 ? Q = Bi(String(v)) : typeof v == "bigint" && (Q = String(v), (v > BigInt(2) ** BigInt(32) || v < -(BigInt(2) ** BigInt(32))) && (Q = Bi(Q)), Q += "n"), R += ` It must be ${m}. Received ${Q}`, R;
    },
    RangeError
  );
  function Bi(P) {
    let m = "", v = P.length;
    const R = P[0] === "-" ? 1 : 0;
    for (; v >= R + 4; v -= 3)
      m = `_${P.slice(v - 3, v)}${m}`;
    return `${P.slice(0, v)}${m}`;
  }
  function fn(P, m, v) {
    mi(m, "offset"), (P[m] === void 0 || P[m + v] === void 0) && Ri(m, P.length - (v + 1));
  }
  function Fi(P, m, v, R, Q, ot) {
    if (P > v || P < m) {
      const mt = typeof m == "bigint" ? "n" : "";
      let Yt;
      throw m === 0 || m === BigInt(0) ? Yt = `>= 0${mt} and < 2${mt} ** ${(ot + 1) * 8}${mt}` : Yt = `>= -(2${mt} ** ${(ot + 1) * 8 - 1}${mt}) and < 2 ** ${(ot + 1) * 8 - 1}${mt}`, new fe.ERR_OUT_OF_RANGE("value", Yt, P);
    }
    fn(R, Q, ot);
  }
  function mi(P, m) {
    if (typeof P != "number")
      throw new fe.ERR_INVALID_ARG_TYPE(m, "number", P);
  }
  function Ri(P, m, v) {
    throw Math.floor(P) !== P ? (mi(P, v), new fe.ERR_OUT_OF_RANGE("offset", "an integer", P)) : m < 0 ? new fe.ERR_BUFFER_OUT_OF_BOUNDS() : new fe.ERR_OUT_OF_RANGE(
      "offset",
      `>= 0 and <= ${m}`,
      P
    );
  }
  const tr = /[^+/0-9A-Za-z-_]/g;
  function er(P) {
    if (P = P.split("=")[0], P = P.trim().replace(tr, ""), P.length < 2) return "";
    for (; P.length % 4 !== 0; )
      P = P + "=";
    return P;
  }
  function zi(P, m) {
    m = m || 1 / 0;
    let v;
    const R = P.length;
    let Q = null;
    const ot = [];
    for (let mt = 0; mt < R; ++mt) {
      if (v = P.charCodeAt(mt), v > 55295 && v < 57344) {
        if (!Q) {
          if (v > 56319) {
            (m -= 3) > -1 && ot.push(239, 191, 189);
            continue;
          } else if (mt + 1 === R) {
            (m -= 3) > -1 && ot.push(239, 191, 189);
            continue;
          }
          Q = v;
          continue;
        }
        if (v < 56320) {
          (m -= 3) > -1 && ot.push(239, 191, 189), Q = v;
          continue;
        }
        v = (Q - 55296 << 10 | v - 56320) + 65536;
      } else Q && (m -= 3) > -1 && ot.push(239, 191, 189);
      if (Q = null, v < 128) {
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
  function Ni(P) {
    const m = [];
    for (let v = 0; v < P.length; ++v)
      m.push(P.charCodeAt(v) & 255);
    return m;
  }
  function ir(P, m) {
    let v, R, Q;
    const ot = [];
    for (let mt = 0; mt < P.length && !((m -= 2) < 0); ++mt)
      v = P.charCodeAt(mt), R = v >> 8, Q = v % 256, ot.push(Q), ot.push(R);
    return ot;
  }
  function Tn(P) {
    return l.toByteArray(er(P));
  }
  function ji(P, m, v, R) {
    let Q;
    for (Q = 0; Q < R && !(Q + v >= m.length || Q >= P.length); ++Q)
      m[Q + v] = P[Q];
    return Q;
  }
  function ti(P, m) {
    return P instanceof m || P != null && P.constructor != null && P.constructor.name != null && P.constructor.name === m.name;
  }
  function pn(P) {
    return P !== P;
  }
  const Tr = function() {
    const P = "0123456789abcdef", m = new Array(256);
    for (let v = 0; v < 16; ++v) {
      const R = v * 16;
      for (let Q = 0; Q < 16; ++Q)
        m[R + Q] = P[v] + P[Q];
    }
    return m;
  }();
  function _i(P) {
    return typeof BigInt > "u" ? Dn : P;
  }
  function Dn() {
    throw new Error("BigInt not supported");
  }
})(Kl);
const va = "http://www.w3.org/1999/02/22-rdf-syntax-ns#", ba = "http://www.w3.org/2001/XMLSchema#", zs = "http://www.w3.org/2000/10/swap/", Oi = {
  xsd: {
    decimal: `${ba}decimal`,
    boolean: `${ba}boolean`,
    double: `${ba}double`,
    integer: `${ba}integer`,
    string: `${ba}string`
  },
  rdf: {
    type: `${va}type`,
    nil: `${va}nil`,
    first: `${va}first`,
    rest: `${va}rest`,
    langString: `${va}langString`
  },
  owl: {
    sameAs: "http://www.w3.org/2002/07/owl#sameAs"
  },
  r: {
    forSome: `${zs}reify#forSome`,
    forAll: `${zs}reify#forAll`
  },
  log: {
    implies: `${zs}log#implies`,
    isImpliedBy: `${zs}log#isImpliedBy`
  }
}, { xsd: Ns } = Oi, Kf = /\\u([a-fA-F0-9]{4})|\\U([a-fA-F0-9]{8})|\\([^])/g, Al = {
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
}, Wf = /[\x00-\x20<>\\"\{\}\|\^\`]/, Jf = {
  _iri: !0,
  _unescapedIri: !0,
  _simpleQuotedString: !0,
  _langcode: !0,
  _blank: !0,
  _newline: !0,
  _comment: !0,
  _whitespace: !0,
  _endOfFile: !0
}, Xf = /$0^/;
class Yf {
  constructor(l) {
    if (this._iri = /^<((?:[^ <>{}\\]|\\[uU])+)>[ \t]*/, this._unescapedIri = /^<([^\x00-\x20<>\\"\{\}\|\^\`]*)>[ \t]*/, this._simpleQuotedString = /^"([^"\\\r\n]*)"(?=[^"])/, this._simpleApostropheString = /^'([^'\\\r\n]*)'(?=[^'])/, this._langcode = /^@([a-z]+(?:-[a-z0-9]+)*)(?=[^a-z0-9\-])/i, this._prefix = /^((?:[A-Za-z\xc0-\xd6\xd8-\xf6\xf8-\u02ff\u0370-\u037d\u037f-\u1fff\u200c\u200d\u2070-\u218f\u2c00-\u2fef\u3001-\ud7ff\uf900-\ufdcf\ufdf0-\ufffd]|[\ud800-\udb7f][\udc00-\udfff])(?:\.?[\-0-9A-Z_a-z\xb7\xc0-\xd6\xd8-\xf6\xf8-\u037d\u037f-\u1fff\u200c\u200d\u203f\u2040\u2070-\u218f\u2c00-\u2fef\u3001-\ud7ff\uf900-\ufdcf\ufdf0-\ufffd]|[\ud800-\udb7f][\udc00-\udfff])*)?:(?=[#\s<])/, this._prefixed = /^((?:[A-Za-z\xc0-\xd6\xd8-\xf6\xf8-\u02ff\u0370-\u037d\u037f-\u1fff\u200c\u200d\u2070-\u218f\u2c00-\u2fef\u3001-\ud7ff\uf900-\ufdcf\ufdf0-\ufffd]|[\ud800-\udb7f][\udc00-\udfff])(?:\.?[\-0-9A-Z_a-z\xb7\xc0-\xd6\xd8-\xf6\xf8-\u037d\u037f-\u1fff\u200c\u200d\u203f\u2040\u2070-\u218f\u2c00-\u2fef\u3001-\ud7ff\uf900-\ufdcf\ufdf0-\ufffd]|[\ud800-\udb7f][\udc00-\udfff])*)?:((?:(?:[0-:A-Z_a-z\xc0-\xd6\xd8-\xf6\xf8-\u02ff\u0370-\u037d\u037f-\u1fff\u200c\u200d\u2070-\u218f\u2c00-\u2fef\u3001-\ud7ff\uf900-\ufdcf\ufdf0-\ufffd]|[\ud800-\udb7f][\udc00-\udfff]|%[0-9a-fA-F]{2}|\\[!#-\/;=?\-@_~])(?:(?:[\.\-0-:A-Z_a-z\xb7\xc0-\xd6\xd8-\xf6\xf8-\u037d\u037f-\u1fff\u200c\u200d\u203f\u2040\u2070-\u218f\u2c00-\u2fef\u3001-\ud7ff\uf900-\ufdcf\ufdf0-\ufffd]|[\ud800-\udb7f][\udc00-\udfff]|%[0-9a-fA-F]{2}|\\[!#-\/;=?\-@_~])*(?:[\-0-:A-Z_a-z\xb7\xc0-\xd6\xd8-\xf6\xf8-\u037d\u037f-\u1fff\u200c\u200d\u203f\u2040\u2070-\u218f\u2c00-\u2fef\u3001-\ud7ff\uf900-\ufdcf\ufdf0-\ufffd]|[\ud800-\udb7f][\udc00-\udfff]|%[0-9a-fA-F]{2}|\\[!#-\/;=?\-@_~]))?)?)(?:[ \t]+|(?=\.?[,;!\^\s#()\[\]\{\}"'<>]))/, this._variable = /^\?(?:(?:[A-Z_a-z\xc0-\xd6\xd8-\xf6\xf8-\u02ff\u0370-\u037d\u037f-\u1fff\u200c\u200d\u2070-\u218f\u2c00-\u2fef\u3001-\ud7ff\uf900-\ufdcf\ufdf0-\ufffd]|[\ud800-\udb7f][\udc00-\udfff])(?:[\-0-:A-Z_a-z\xb7\xc0-\xd6\xd8-\xf6\xf8-\u037d\u037f-\u1fff\u200c\u200d\u203f\u2040\u2070-\u218f\u2c00-\u2fef\u3001-\ud7ff\uf900-\ufdcf\ufdf0-\ufffd]|[\ud800-\udb7f][\udc00-\udfff])*)(?=[.,;!\^\s#()\[\]\{\}"'<>])/, this._blank = /^_:((?:[0-9A-Z_a-z\xc0-\xd6\xd8-\xf6\xf8-\u02ff\u0370-\u037d\u037f-\u1fff\u200c\u200d\u2070-\u218f\u2c00-\u2fef\u3001-\ud7ff\uf900-\ufdcf\ufdf0-\ufffd]|[\ud800-\udb7f][\udc00-\udfff])(?:\.?[\-0-9A-Z_a-z\xb7\xc0-\xd6\xd8-\xf6\xf8-\u037d\u037f-\u1fff\u200c\u200d\u203f\u2040\u2070-\u218f\u2c00-\u2fef\u3001-\ud7ff\uf900-\ufdcf\ufdf0-\ufffd]|[\ud800-\udb7f][\udc00-\udfff])*)(?:[ \t]+|(?=\.?[,;:\s#()\[\]\{\}"'<>]))/, this._number = /^[\-+]?(?:(\d+\.\d*|\.?\d+)[eE][\-+]?|\d*(\.)?)\d+(?=\.?[,;:\s#()\[\]\{\}"'<>])/, this._boolean = /^(?:true|false)(?=[.,;\s#()\[\]\{\}"'<>])/, this._keyword = /^@[a-z]+(?=[\s#<:])/i, this._sparqlKeyword = /^(?:PREFIX|BASE|GRAPH)(?=[\s#<])/i, this._shortPredicates = /^a(?=[\s#()\[\]\{\}"'<>])/, this._newline = /^[ \t]*(?:#[^\n\r]*)?(?:\r\n|\n|\r)[ \t]*/, this._comment = /#([^\n\r]*)/, this._whitespace = /^[ \t]+/, this._endOfFile = /^(?:#[^\n\r]*)?$/, l = l || {}, this._isImpliedBy = l.isImpliedBy, this._lineMode = !!l.lineMode) {
      this._n3Mode = !1;
      for (const d in this)
        !(d in Jf) && this[d] instanceof RegExp && (this[d] = Xf);
    } else
      this._n3Mode = l.n3 !== !1;
    this.comments = !!l.comments, this._literalClosingPos = 0;
  }
  // ## Private methods
  // ### `_tokenizeToEnd` tokenizes as for as possible, emitting tokens through the callback
  _tokenizeToEnd(l, d) {
    let p = this._input, b = p.length;
    for (; ; ) {
      let g, w;
      for (; g = this._newline.exec(p); )
        this.comments && (w = this._comment.exec(g[0])) && E("comment", w[1], "", this._line, g[0].length), p = p.substr(g[0].length, p.length), b = p.length, this._line++;
      if (!g && (g = this._whitespace.exec(p)) && (p = p.substr(g[0].length, p.length)), this._endOfFile.test(p))
        return d && (this.comments && (w = this._comment.exec(p)) && E("comment", w[1], "", this._line, p.length), p = null, E("eof", "", "", this._line, 0)), this._input = p;
      const B = this._line, T = p[0];
      let M = "", N = "", j = "", G = null, Y = 0, lt = !1;
      switch (T) {
        case "^":
          if (p.length < 3)
            break;
          if (p[1] === "^") {
            if (this._previousMarker = "^^", p = p.substr(2), p[0] !== "<") {
              lt = !0;
              break;
            }
          } else {
            this._n3Mode && (Y = 1, M = "^");
            break;
          }
        case "<":
          if (G = this._unescapedIri.exec(p))
            M = "IRI", N = G[1];
          else if (G = this._iri.exec(p)) {
            if (N = this._unescape(G[1]), N === null || Wf.test(N))
              return x(this);
            M = "IRI";
          } else p.length > 1 && p[1] === "<" ? (M = "<<", Y = 2) : this._n3Mode && p.length > 1 && p[1] === "=" && (Y = 2, this._isImpliedBy ? (M = "abbreviation", N = "<") : (M = "inverse", N = ">"));
          break;
        case ">":
          p.length > 1 && p[1] === ">" && (M = ">>", Y = 2);
          break;
        case "_":
          ((G = this._blank.exec(p)) || d && (G = this._blank.exec(`${p} `))) && (M = "blank", j = "_", N = G[1]);
          break;
        case '"':
          if (G = this._simpleQuotedString.exec(p))
            N = G[1];
          else if ({ value: N, matchLength: Y } = this._parseLiteral(p), N === null)
            return x(this);
          (G !== null || Y !== 0) && (M = "literal", this._literalClosingPos = 0);
          break;
        case "'":
          if (!this._lineMode) {
            if (G = this._simpleApostropheString.exec(p))
              N = G[1];
            else if ({ value: N, matchLength: Y } = this._parseLiteral(p), N === null)
              return x(this);
            (G !== null || Y !== 0) && (M = "literal", this._literalClosingPos = 0);
          }
          break;
        case "?":
          this._n3Mode && (G = this._variable.exec(p)) && (M = "var", N = G[0]);
          break;
        case "@":
          this._previousMarker === "literal" && (G = this._langcode.exec(p)) ? (M = "langcode", N = G[1]) : (G = this._keyword.exec(p)) && (M = G[0]);
          break;
        case ".":
          if (p.length === 1 ? d : p[1] < "0" || p[1] > "9") {
            M = ".", Y = 1;
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
          (G = this._number.exec(p) || d && (G = this._number.exec(`${p} `))) && (M = "literal", N = G[0], j = typeof G[1] == "string" ? Ns.double : typeof G[2] == "string" ? Ns.decimal : Ns.integer);
          break;
        case "B":
        case "b":
        case "p":
        case "P":
        case "G":
        case "g":
          (G = this._sparqlKeyword.exec(p)) ? M = G[0].toUpperCase() : lt = !0;
          break;
        case "f":
        case "t":
          (G = this._boolean.exec(p)) ? (M = "literal", N = G[0], j = Ns.boolean) : lt = !0;
          break;
        case "a":
          (G = this._shortPredicates.exec(p)) ? (M = "abbreviation", N = "a") : lt = !0;
          break;
        case "=":
          this._n3Mode && p.length > 1 && (M = "abbreviation", p[1] !== ">" ? (Y = 1, N = "=") : (Y = 2, N = ">"));
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
          this._lineMode || (Y = 1, M = T);
          break;
        case "{":
          !this._lineMode && p.length >= 2 && (p[1] === "|" ? (M = "{|", Y = 2) : (M = T, Y = 1));
          break;
        case "|":
          p.length >= 2 && p[1] === "}" && (M = "|}", Y = 2);
          break;
        default:
          lt = !0;
      }
      if (lt && ((this._previousMarker === "@prefix" || this._previousMarker === "PREFIX") && (G = this._prefix.exec(p)) ? (M = "prefix", N = G[1] || "") : ((G = this._prefixed.exec(p)) || d && (G = this._prefixed.exec(`${p} `))) && (M = "prefixed", j = G[1] || "", N = this._unescape(G[2]))), this._previousMarker === "^^")
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
        return d || !/^'''|^"""/.test(p) && /\n|\r/.test(p) ? x(this) : this._input = p;
      const ct = Y || G[0].length, pt = E(M, N, j, B, ct);
      this.previousToken = pt, this._previousMarker = M, p = p.substr(ct, p.length);
    }
    function E(g, w, B, T, M) {
      const N = p ? b - p.length : b, j = N + M, G = { type: g, value: w, prefix: B, line: T, start: N, end: j };
      return l(null, G), G;
    }
    function x(g) {
      l(g._syntaxError(/^\S*/.exec(p)[0]));
    }
  }
  // ### `_unescape` replaces N3 escape codes by their corresponding characters
  _unescape(l) {
    let d = !1;
    const p = l.replace(Kf, (b, E, x, g) => {
      if (typeof E == "string")
        return String.fromCharCode(Number.parseInt(E, 16));
      if (typeof x == "string") {
        let w = Number.parseInt(x, 16);
        return w <= 65535 ? String.fromCharCode(Number.parseInt(x, 16)) : String.fromCharCode(55296 + ((w -= 65536) >> 10), 56320 + (w & 1023));
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
          const x = l.substring(p, b), g = x.split(/\r\n|\r|\n/).length - 1, w = b + p;
          if (p === 1 && g !== 0 || p === 3 && this._lineMode)
            break;
          return this._line += g, { value: this._unescape(x), matchLength: w };
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
        if (this._tokenizeToEnd((E, x) => E ? b = E : p.push(x), !0), b) throw b;
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
const { rdf: Qf, xsd: Mr } = Oi;
let Ia, tp = 0;
const ep = {
  namedNode: Yl,
  blankNode: Ql,
  variable: eu,
  literal: tu,
  defaultGraph: ap,
  quad: Ho,
  triple: Ho,
  fromTerm: Ma,
  fromQuad: iu
};
class dn {
  constructor(l) {
    this.id = l;
  }
  // ### The value of this term
  get value() {
    return this.id;
  }
  // ### Returns whether this object represents the same term as the other
  equals(l) {
    return l instanceof dn ? this.id === l.id : !!l && this.termType === l.termType && this.value === l.value;
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
class Jl extends dn {
  // ### The term type of this term
  get termType() {
    return "NamedNode";
  }
}
class Ba extends dn {
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
      p !== "@" ? Mr.string : Qf.langString
    );
  }
  // ### Returns whether this object represents the same term as the other
  equals(l) {
    return l instanceof Ba ? this.id === l.id : !!l && !!l.datatype && this.termType === l.termType && this.value === l.value && this.language === l.language && this.datatype.value === l.datatype.value;
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
class ip extends dn {
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
class np extends dn {
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
class rp extends dn {
  constructor() {
    return super(""), Ia || this;
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
Ia = new rp();
class Xl extends dn {
  constructor(l, d, p, b) {
    super(""), this._subject = l, this._predicate = d, this._object = p, this._graph = b || Ia;
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
  return new ip(u || `n3-${tp++}`);
}
function tu(u, l) {
  if (typeof l == "string")
    return new Ba(`"${u}"@${l.toLowerCase()}`);
  let d = l ? l.value : "";
  return d === "" && (typeof u == "boolean" ? d = Mr.boolean : typeof u == "number" && (Number.isFinite(u) ? d = Number.isInteger(u) ? Mr.integer : Mr.double : (d = Mr.double, Number.isNaN(u) || (u = u > 0 ? "INF" : "-INF")))), d === "" || d === Mr.string ? new Ba(`"${u}"`) : new Ba(`"${u}"^^${d}`);
}
function eu(u) {
  return new np(u);
}
function ap() {
  return Ia;
}
function Ho(u, l, d, p) {
  return new Xl(u, l, d, p);
}
function Ma(u) {
  if (u instanceof dn)
    return u;
  switch (u.termType) {
    case "NamedNode":
      return Yl(u.value);
    case "BlankNode":
      return Ql(u.value);
    case "Variable":
      return eu(u.value);
    case "DefaultGraph":
      return Ia;
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
  return Ho(Ma(u.subject), Ma(u.predicate), Ma(u.object), Ma(u.graph));
}
let Sl = 0;
class rl {
  constructor(l) {
    this._contextStack = [], this._graph = null, l = l || {}, this._setBase(l.baseIRI), l.factory && nu(this, l.factory);
    const d = typeof l.format == "string" ? l.format.match(/\w*$/)[0].toLowerCase() : "", p = /turtle/.test(d), b = /trig/.test(d), E = /triple/.test(d), x = /quad/.test(d), g = this._n3Mode = /n3/.test(d), w = E || x;
    (this._supportsNamedGraphs = !(p || g)) || (this._readPredicateOrNamedGraph = this._readPredicate), this._supportsQuads = !(p || b || E || g), this._isImpliedBy = l.isImpliedBy, this._supportsRDFStar = d === "" || /star|\*$/.test(d), w && (this._resolveRelativeIRI = (B) => null), this._blankNodePrefix = typeof l.blankNodePrefix != "string" ? "" : l.blankNodePrefix.replace(/^(?!_:)/, "_:"), this._lexer = l.lexer || new Yf({ lineMode: w, n3: g, isImpliedBy: this._isImpliedBy }), this._explicitQuantifiers = !!l.explicitQuantifiers;
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
    const x = this._n3Mode;
    this._contextStack.push({
      type: l,
      subject: p,
      predicate: b,
      object: E,
      graph: d,
      inverse: x ? this._inversePredicate : !1,
      blankPrefix: x ? this._prefixes._ : "",
      quantified: x ? this._quantified : null
    }), x && (this._inversePredicate = !1, this._prefixes._ = this._graph ? `${this._graph.value}.` : ".", this._quantified = Object.create(this._quantified));
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
    const E = this._subject, x = this._contextStack, g = x[x.length - 1];
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
        if (this._restoreContext("list", l), x.length !== 0 && x[x.length - 1].type === "list" && this._emit(this._subject, this._predicate, this._object, this._graph), this._predicate === null) {
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
        const x = this._predicate, g = this._object;
        this._subject = this._factory.quad(b, x, g, this.DEFAULTGRAPH), d = this._readPredicate;
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
      const x = this._predicate, g = this._object;
      E ? this._emit(g, x, b, p) : this._emit(b, x, g, p);
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
    }, this._callback(p), this._callback = js;
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
    let p = "", b = -1, E = -1, x = 0, g = "/";
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
                p += l.substring(x, b - 1), x = b + 1;
                break;
              case void 0:
              case "?":
              case "#":
                return p + l.substring(x, b) + l.substr(b + 1);
              case ".":
                if (g = l[++b + 1], g === void 0 || g === "/" || g === "?" || g === "#") {
                  if (p += l.substring(x, b - 2), (x = p.lastIndexOf("/")) >= E && (p = p.substr(0, x)), g !== "/")
                    return `${p}/${l.substr(b + 1)}`;
                  x = b + 1;
                }
            }
      }
      g = l[++b];
    }
    return p + l.substring(x);
  }
  // ## Public methods
  // ### `parse` parses the N3 input and emits each parsed quad through the onQuad callback.
  parse(l, d, p) {
    let b, E, x;
    if (d && (d.onQuad || d.onPrefix || d.onComment) ? (b = d.onQuad, E = d.onPrefix, x = d.onComment) : (b = d, E = p), this._readCallback = this._readInTopContext, this._sparqlStyle = !1, this._prefixes = /* @__PURE__ */ Object.create(null), this._prefixes._ = this._blankNodePrefix ? this._blankNodePrefix.substr(2) : `b${Sl++}_`, this._prefixCallback = E || js, this._inversePredicate = !1, this._quantified = /* @__PURE__ */ Object.create(null), !b) {
      const w = [];
      let B;
      if (this._callback = (T, M) => {
        T ? B = T : M && w.push(M);
      }, this._lexer.tokenize(l).every((T) => this._readCallback = this._readCallback(T)), B) throw B;
      return w;
    }
    let g = (w, B) => {
      w !== null ? (this._callback(w), this._callback = js) : this._readCallback && (this._readCallback = this._readCallback(B));
    };
    x && (this._lexer.comments = !0, g = (w, B) => {
      w !== null ? (this._callback(w), this._callback = js) : this._readCallback && (B.type === "comment" ? x(B.value) : this._readCallback = this._readCallback(B));
    }), this._callback = b, this._lexer.tokenize(l, g);
  }
}
function js() {
}
function nu(u, l) {
  u._factory = l, u.DEFAULTGRAPH = l.defaultGraph(), u.RDF_FIRST = l.namedNode(Oi.rdf.first), u.RDF_REST = l.namedNode(Oi.rdf.rest), u.RDF_NIL = l.namedNode(Oi.rdf.nil), u.N3_FORALL = l.namedNode(Oi.r.forAll), u.N3_FORSOME = l.namedNode(Oi.r.forSome), u.ABBREVIATIONS = {
    a: l.namedNode(Oi.rdf.type),
    "=": l.namedNode(Oi.owl.sameAs),
    ">": l.namedNode(Oi.log.implies),
    "<": l.namedNode(Oi.log.isImpliedBy)
  }, u.QUANTIFIERS_GRAPH = l.namedNode("urn:n3:quantifiers");
}
nu(rl.prototype, ep);
async function ru(u) {
  const l = new rl(), d = await new Promise((b, E) => {
    const x = [];
    l.parse(u, (g, w) => {
      if (g) return E(g);
      w ? x.push(w) : b(x);
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
function Da(u) {
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
function Vo(u) {
  return typeof u == "string" && /^https?:\/\/|^urn:|^mailto:/.test(u);
}
function sp(u) {
  return typeof u == "string" && /^\d{4}-\d{2}-\d{2}/.test(u);
}
const Ze = "http://www.w3.org/ns/shacl#", op = "http://www.w3.org/1999/02/22-rdf-syntax-ns#", $o = "http://www.w3.org/2001/XMLSchema#", lp = "http://www.w3.org/ns/dcat#", up = `${Ze}Violation`, hp = `${Ze}Warning`, cp = `${Ze}Info`;
class dp {
  /**
   * @param {string}  ttlContent   Raw Turtle content of the SHACL shapes file
   * @param {object}  formData     Current form data keyed by compact field IRI
   * @param {object}  config       Resolved form config (groups, fields)
   * @returns {{ valid: boolean, violations: object[] }}
   */
  async validate(l, d, p) {
    var B, T;
    const b = await ru(l), E = mp(b), x = Object.values(E).find(
      (M) => M.targetClass === `${lp}Dataset`
    );
    if (!x) return { valid: !0, violations: [] };
    const g = [];
    for (const M of x.properties) {
      const N = Da(M.path), j = d == null ? void 0 : d[N], G = ((T = (B = p == null ? void 0 : p.fields) == null ? void 0 : B[N]) == null ? void 0 : T.label) || { en: N, de: N }, Y = pp(N, p), lt = { fieldId: N, fieldLabel: G, groupId: Y, shapeRef: M.shapeRef };
      if (M.minCount > 0 && xa(j) < M.minCount) {
        g.push(un(
          lt,
          M.severity,
          "minCount",
          `Pflichtfeld (sh:minCount ${M.minCount}) — kein Wert angegeben.`,
          `Required field (sh:minCount ${M.minCount}) — no value provided.`
        ));
        continue;
      }
      if (xa(j) !== 0) {
        if (M.maxCount !== null && xa(j) > M.maxCount && g.push(un(
          lt,
          M.severity,
          "maxCount",
          `Zu viele Werte (sh:maxCount ${M.maxCount}, vorhanden: ${xa(j)}).`,
          `Too many values (sh:maxCount ${M.maxCount}, found: ${xa(j)}).`
        )), M.nodeKind === `${Ze}IRI`) {
          const ct = Kn(j).filter((pt) => !Vo(pt));
          ct.length && g.push(un(
            lt,
            M.severity,
            "nodeKind",
            `Wert muss eine URI sein (sh:nodeKind sh:IRI). Ungültig: ${ct.slice(0, 2).join(", ")}`,
            `Value must be a URI (sh:nodeKind sh:IRI). Invalid: ${ct.slice(0, 2).join(", ")}`
          ));
        } else M.nodeKind === `${Ze}Literal` && Kn(j).filter((pt) => Vo(pt)).length && g.push(un(
          lt,
          M.severity,
          "nodeKind",
          "Wert darf keine URI sein (sh:nodeKind sh:Literal).",
          "Value must not be a URI (sh:nodeKind sh:Literal)."
        ));
        if (M.datatype === `${$o}anyURI`)
          Kn(j).filter((pt) => !Vo(pt)).length && g.push(un(
            lt,
            M.severity,
            "datatype",
            "Wert muss eine gültige URI sein (xsd:anyURI).",
            "Value must be a valid URI (xsd:anyURI)."
          ));
        else if (M.datatype === `${$o}date` || M.datatype === `${$o}dateTime`) {
          const ct = Kn(j).filter((pt) => !sp(pt));
          ct.length && g.push(un(
            lt,
            M.severity,
            "datatype",
            `Wert muss ein gültiges Datum sein (xsd:date). Ungültig: ${ct[0]}`,
            `Value must be a valid date (xsd:date). Invalid: ${ct[0]}`
          ));
        }
        if (M.pattern) {
          let ct;
          try {
            ct = new RegExp(M.pattern);
          } catch {
          }
          ct && Kn(j).filter((Bt) => !ct.test(Bt)).length && g.push(un(
            lt,
            M.severity,
            "pattern",
            `Wert entspricht nicht dem Muster (sh:pattern ${M.pattern}).`,
            `Value does not match pattern (sh:pattern ${M.pattern}).`
          ));
        }
        M.minLength !== null && Kn(j).filter((pt) => pt.length < M.minLength).length && g.push(un(
          lt,
          M.severity,
          "minLength",
          `Wert zu kurz — Minimum ${M.minLength} Zeichen (sh:minLength).`,
          `Value too short — minimum ${M.minLength} characters (sh:minLength).`
        )), M.maxLength !== null && Kn(j).filter((pt) => pt.length > M.maxLength).length && g.push(un(
          lt,
          M.severity,
          "maxLength",
          `Wert zu lang — Maximum ${M.maxLength} Zeichen (sh:maxLength).`,
          `Value too long — maximum ${M.maxLength} characters (sh:maxLength).`
        ));
      }
    }
    const w = { violation: 0, warning: 1, info: 2 };
    return g.sort((M, N) => w[M.severity] - w[N.severity]), {
      valid: g.every((M) => M.severity !== "violation"),
      violations: g
    };
  }
}
function un(u, l, d, p, b) {
  return {
    fieldId: u.fieldId,
    fieldLabel: u.fieldLabel,
    groupId: u.groupId,
    shapeRef: u.shapeRef,
    severity: fp(l),
    constraint: d,
    messageDe: p,
    messageEn: b
  };
}
function fp(u) {
  return u === hp ? "warning" : u === cp ? "info" : "violation";
}
function xa(u) {
  return u == null || u === "" ? 0 : Array.isArray(u) ? u.filter((l) => l ? typeof l == "object" && "value" in l ? !!l.value : typeof l == "object" ? Object.values(l).some((d) => d) : String(l).trim() !== "" : !1).length : typeof u == "object" ? Object.values(u).some((l) => l && String(l).trim()) ? 1 : 0 : String(u).trim() ? 1 : 0;
}
function Kn(u) {
  return u == null || u === "" ? [] : Array.isArray(u) ? u.flatMap((l) => l ? typeof l == "object" && "value" in l ? l.value ? [l.value] : [] : typeof l == "object" ? Object.values(l).filter((d) => typeof d == "string" && d) : [String(l)] : []) : typeof u == "object" ? Object.values(u).filter((l) => typeof l == "string" && l) : [String(u)];
}
function pp(u, l) {
  var d;
  if (!(l != null && l.groups)) return null;
  for (const p of l.groups)
    if ((d = p.fields) != null && d.includes(u)) return p.id;
  return null;
}
function mp(u) {
  var d;
  const l = {};
  for (const [p, b] of u.entries()) {
    if (!b.filter((B) => B.p === `${op}type`).map((B) => B.o.value).includes(`${Ze}NodeShape`)) continue;
    const x = (d = b.find((B) => B.p === `${Ze}targetClass`)) == null ? void 0 : d.o.value, w = b.filter((B) => B.p === `${Ze}property`).map((B) => B.o.value).map((B) => _p(B, u)).filter(Boolean);
    l[p] = { subject: p, targetClass: x, properties: w };
  }
  return l;
}
function _p(u, l) {
  const d = l.get(u) || [], p = d.find((x) => x.p === `${Ze}path`);
  if (!p) return null;
  const b = (x) => {
    var g;
    return ((g = d.find((w) => w.p === x)) == null ? void 0 : g.o.value) ?? null;
  }, E = (x) => {
    const g = b(x);
    return g !== null ? parseInt(g) : null;
  };
  return {
    path: p.o.value,
    shapeRef: u,
    minCount: E(`${Ze}minCount`) ?? 0,
    maxCount: E(`${Ze}maxCount`),
    nodeKind: b(`${Ze}nodeKind`),
    datatype: b(`${Ze}datatype`),
    severity: b(`${Ze}severity`) ?? up,
    pattern: b(`${Ze}pattern`),
    minLength: E(`${Ze}minLength`),
    maxLength: E(`${Ze}maxLength`)
  };
}
const gp = { class: "step-indicator" }, yp = ["aria-label", "aria-current", "onClick"], vp = { class: "step-label" }, bp = { class: "step-label" }, xp = {
  key: 0,
  class: "progress-bar-wrap"
}, wp = ["aria-valuenow", "aria-label"], Lp = {
  class: "progress-label",
  "aria-hidden": "true"
}, kp = { class: "group-title" }, Cp = { class: "wizard-nav" }, Ep = { key: 1 }, Mp = { class: "summary-view" }, Bp = { class: "summary-group-header" }, Ap = { class: "group-title" }, Sp = { class: "summary-group-header-right" }, Pp = {
  key: 0,
  class: "group-error-badge"
}, Tp = ["onClick"], Dp = { class: "summary-fields" }, Op = { class: "summary-field-label" }, Ip = ["innerHTML"], Fp = {
  key: 1,
  class: "no-data"
}, Rp = { class: "form-actions" }, zp = {
  key: 0,
  class: "validation-hint"
}, Np = ["disabled", "aria-label"], jp = ["disabled"], Vp = { class: "wizard-nav" }, $p = { class: "group-title" }, Up = { class: "form-actions" }, Gp = {
  key: 0,
  class: "validation-hint"
}, Zp = ["disabled"], qp = ["disabled"], Hp = {
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
    function d(Pt) {
      return String(Pt ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");
    }
    const p = u, b = l, { t: E } = Xe();
    function x(Pt, ut) {
      var Ct;
      const bt = (Ct = p.labels) == null ? void 0 : Ct[Pt];
      return bt ? typeof bt == "string" ? bt : bt[p.lang] ?? bt.en ?? bt.de ?? ut[p.lang] ?? ut.en : ut[p.lang] ?? ut.en ?? ut.de;
    }
    const g = {
      textarea: Xo,
      select: Yo,
      date: Qo,
      uri: tl,
      langstring: Nl,
      text: Pr,
      object: $l,
      multiselect: Gc,
      "distribution-editor": gf,
      map: Vl,
      searchselect: el
    };
    function w(Pt) {
      return g[Pt.type] || Pr;
    }
    const B = Nt(() => {
      var Pt;
      return (((Pt = p.config) == null ? void 0 : Pt.groups) || []).filter((ut) => ut.visible !== !1);
    });
    function T(Pt) {
      return (Pt.fields || []).map((ut) => p.config.fields[ut]).filter((ut) => ut && ut.visible !== !1 && Zl(ut.visibleIf, p.modelValue)).sort((ut, bt) => (ut.order || 0) - (bt.order || 0));
    }
    const M = Nt(() => Nf(p.config, p.modelValue, p.lang)), N = Nt(() => {
      var bt;
      let Pt = 0, ut = 0;
      for (const Ct of B.value)
        for (const oe of T(Ct))
          ut++, qo((bt = p.modelValue) == null ? void 0 : bt[oe.id], oe) && Pt++;
      return { filled: Pt, total: ut };
    }), j = Nt(() => N.value.filled), G = Nt(() => N.value.total), Y = Nt(
      () => G.value ? Math.round(j.value / G.value * 100) : 0
    ), lt = Nt(() => Object.keys(M.value).length === 0), ct = Ht([]), pt = Ht(!1), Bt = Ht(!1);
    async function ue() {
      var ut;
      const Pt = (ut = p.config) == null ? void 0 : ut.standard;
      if (Pt) {
        Bt.value = !0;
        try {
          const bt = await fetch(Yn(`shacl/${Pt}.ttl`)).then((zt) => zt.text()), oe = await new dp().validate(bt, p.modelValue, p.config);
          ct.value = oe.violations, pt.value = !0;
        } finally {
          Bt.value = !1;
        }
      }
    }
    async function Xt({ fieldId: Pt, groupId: ut }) {
      var oe;
      if (p.wizard) {
        const zt = B.value.findIndex((Tt) => Tt.id === ut);
        zt >= 0 && Qe(zt);
      }
      await $s();
      const bt = typeof CSS < "u" && CSS.escape ? CSS.escape(Pt) : Pt.replace(/[^\w-]/g, "_"), Ct = document.getElementById(`field-${bt}`);
      Ct == null || Ct.scrollIntoView({ behavior: "smooth", block: "center" }), (oe = Ct == null ? void 0 : Ct.querySelector("input,textarea,select")) == null || oe.focus();
    }
    function Rt() {
      var ut, bt;
      if (!lt.value) return;
      const Pt = ((ut = p.config) == null ? void 0 : ut.fields) || {};
      for (const [Ct, oe] of Object.entries(Pt))
        oe.remember && ((bt = p.modelValue) == null ? void 0 : bt[Ct]) != null && Er.save(Ct, p.modelValue[Ct]);
      b("export");
    }
    const At = Ht(0), jt = Ht(!1);
    pi(() => p.config, () => {
      At.value = 0, jt.value = !1;
    });
    const se = Nt(() => B.value[At.value]);
    function Zt(Pt) {
      const ut = T(Pt), bt = {};
      for (const Ct of ut)
        M.value[Ct.id] && (bt[Ct.id] = M.value[Ct.id]);
      return bt;
    }
    function Kt(Pt) {
      return Object.keys(Zt(Pt)).length > 0;
    }
    const ce = Nt(() => se.value ? Object.keys(Zt(se.value)).length > 0 : !1);
    function Ye() {
      if (ce.value) {
        jt.value = !0;
        return;
      }
      jt.value = !1, At.value++;
    }
    function Le() {
      jt.value = !1, At.value > 0 && At.value--;
    }
    function Qe(Pt) {
      jt.value = !1, At.value = Pt;
    }
    function Et(Pt) {
      var bt;
      const ut = (bt = p.modelValue) == null ? void 0 : bt[Pt.id];
      return ut == null || ut === "" ? !1 : Array.isArray(ut) ? ut.some((Ct) => Ct ? typeof Ct == "object" ? Object.values(Ct).some((oe) => oe) : !0 : !1) : typeof ut == "object" ? Object.values(ut).some((Ct) => Ct) : !0;
    }
    function Jt(Pt) {
      return T(Pt).some((ut) => Et(ut));
    }
    function Ot(Pt) {
      var bt, Ct, oe;
      const ut = (bt = p.modelValue) == null ? void 0 : bt[Pt.id];
      if (ut == null) return "";
      if (Pt.type === "langstring")
        return Pt.multiple && Array.isArray(ut) ? ut.filter((zt) => zt && zt.value).map((zt) => `${zt.value} (${zt.lang || "?"})`).join(", ") : typeof ut == "object" ? Object.entries(ut).filter(([, zt]) => zt).map(([zt, Tt]) => `${zt.toUpperCase()}: ${Tt}`).join(", ") : String(ut);
      if (Pt.type === "multiselect" && Array.isArray(ut))
        return ut.map((zt) => {
          var St, ve;
          const Tt = (Pt.options || []).find((fe) => fe.value === zt);
          return Tt && (((St = Tt.label) == null ? void 0 : St[p.lang]) || ((ve = Tt.label) == null ? void 0 : ve.en) || Tt.label) || zt;
        }).join(", ");
      if (Pt.type === "select") {
        const zt = (Pt.options || []).find((Tt) => Tt.value === ut);
        return zt && (((Ct = zt.label) == null ? void 0 : Ct[p.lang]) || ((oe = zt.label) == null ? void 0 : oe.en) || zt.label) || ut;
      }
      if (Pt.type === "uri") {
        if (!ut) return "";
        const zt = d(ut);
        return `<a href="${zt}" target="_blank" rel="noopener">${zt}</a>`;
      }
      if (Pt.type === "date")
        return String(ut);
      if (Pt.type === "object" && typeof ut == "object" && Pt.subFields) {
        const zt = Pt.subFields.filter((St) => ut[St.id] && St.type !== "map").map((St) => {
          var fe, we;
          return `<span class="sub-field"><b>${d(((fe = St.label) == null ? void 0 : fe[p.lang]) || ((we = St.label) == null ? void 0 : we.de) || St.id)}:</b> ${d(ut[St.id])}</span>`;
        }), Tt = Pt.subFields.filter((St) => ut[St.id] && St.type === "map").map((St) => {
          var fe, we;
          return `<span class="sub-field"><b>${d(((fe = St.label) == null ? void 0 : fe[p.lang]) || ((we = St.label) == null ? void 0 : we.de) || St.id)}:</b> <code style="font-size:0.75em">${d(ut[St.id])}</code></span>`;
        });
        return [...zt, ...Tt].join("<br>") || "";
      }
      return Pt.type === "map" ? ut ? `<code style="font-size:0.75em">${d(ut)}</code>` : "" : Pt.type === "distribution-editor" && Array.isArray(ut) ? ut.length ? ut.filter((zt) => zt && zt["dcat:accessURL"]).map((zt, Tt) => {
        const St = d(zt["dct:title"] || zt["dcat:accessURL"]), ve = d(zt["dcat:accessURL"]);
        return `<span class="sub-field"><b>${Tt + 1}.</b> <a href="${ve}" target="_blank" rel="noopener">${St}</a></span>`;
      }).join("<br>") || `${ut.length} Distribution(s)` : "" : String(ut);
    }
    return (Pt, ut) => {
      var bt, Ct, oe, zt;
      return V(), q("div", {
        class: le(["metadata-form ontoform", (bt = u.config) == null ? void 0 : bt.cssClass])
      }, [
        u.wizard ? (V(), q(Ft, { key: 0 }, [
          $("div", gp, [
            (V(!0), q(Ft, null, ee(B.value, (Tt, St) => {
              var ve, fe, we, Bi;
              return V(), q("div", {
                key: Tt.id,
                class: le(["step-item", {
                  completed: St < At.value,
                  active: St === At.value && At.value < B.value.length,
                  future: St > At.value || At.value >= B.value.length,
                  "has-error": At.value >= B.value.length && Kt(Tt)
                }])
              }, [
                St > 0 ? (V(), q("div", {
                  key: 0,
                  class: le(["step-connector left", { done: St <= At.value }])
                }, null, 2)) : Mt("", !0),
                $("button", {
                  class: "step-circle",
                  "aria-label": vt(E)("wizard.step-aria") + (St + 1) + ": " + (((ve = Tt.label) == null ? void 0 : ve[u.lang]) || ((fe = Tt.label) == null ? void 0 : fe.en)),
                  "aria-current": St === At.value ? "step" : void 0,
                  onClick: (fn) => Qe(St)
                }, X(St + 1), 9, yp),
                $("div", vp, X(((we = Tt.label) == null ? void 0 : we[u.lang]) || ((Bi = Tt.label) == null ? void 0 : Bi.en)), 1),
                St < B.value.length - 1 ? (V(), q("div", {
                  key: 1,
                  class: le(["step-connector right", { done: St < At.value }])
                }, null, 2)) : Mt("", !0)
              ], 2);
            }), 128)),
            $("div", {
              class: le(["step-item", {
                active: At.value === B.value.length,
                future: At.value < B.value.length
              }])
            }, [
              $("div", {
                class: le(["step-connector left", { done: At.value >= B.value.length }])
              }, null, 2),
              ut[4] || (ut[4] = $("div", { class: "step-circle" }, "✓", -1)),
              $("div", bp, X(vt(E)("wizard.summary")), 1)
            ], 2)
          ]),
          (Ct = u.config) != null && Ct.showProgress ? (V(), q("div", xp, [
            $("div", {
              class: "progress-bar-track",
              role: "progressbar",
              "aria-valuenow": Y.value,
              "aria-valuemin": "0",
              "aria-valuemax": "100",
              "aria-label": vt(E)("wizard.progress-aria") + j.value + " / " + G.value
            }, [
              $("div", {
                class: "progress-bar-fill",
                style: Fl({ width: Y.value + "%" })
              }, null, 4)
            ], 8, wp),
            $("span", Lp, X(j.value) + " / " + X(G.value), 1)
          ])) : Mt("", !0),
          At.value < B.value.length ? (V(), q(Ft, { key: 1 }, [
            $("div", {
              class: le(["form-group", se.value.cssClass])
            }, [
              $("h2", kp, X(((oe = se.value.label) == null ? void 0 : oe[u.lang]) || ((zt = se.value.label) == null ? void 0 : zt.en)), 1),
              Pn(Ml, {
                fields: T(se.value),
                lang: u.lang,
                modelValue: u.modelValue,
                fieldErrors: M.value,
                showErrors: jt.value,
                fieldComponent: w,
                "onUpdate:modelValue": ut[0] || (ut[0] = (Tt) => Pt.$emit("update:modelValue", Tt))
              }, null, 8, ["fields", "lang", "modelValue", "fieldErrors", "showErrors"])
            ], 2),
            $("div", Cp, [
              At.value > 0 ? (V(), q("button", {
                key: 0,
                class: "btn-back",
                onClick: Le
              }, X(vt(E)("wizard.nav.back")), 1)) : (V(), q("span", Ep)),
              $("button", {
                class: "btn-export",
                onClick: Ye
              }, X(At.value < B.value.length - 1 ? vt(E)("wizard.nav.next") : vt(E)("wizard.nav.to-summary")), 1)
            ])
          ], 64)) : (V(), q(Ft, { key: 2 }, [
            $("div", Mp, [
              (V(!0), q(Ft, null, ee(B.value, (Tt, St) => {
                var ve, fe;
                return V(), q("div", {
                  key: Tt.id,
                  class: le(["form-group summary-group", [{ "summary-group-has-error": Kt(Tt) }, Tt.cssClass]])
                }, [
                  $("div", Bp, [
                    $("h2", Ap, X(((ve = Tt.label) == null ? void 0 : ve[u.lang]) || ((fe = Tt.label) == null ? void 0 : fe.en)), 1),
                    $("div", Sp, [
                      Kt(Tt) ? (V(), q("span", Pp, X(vt(E)("wizard.summary.error-badge")), 1)) : Mt("", !0),
                      $("button", {
                        class: "btn-edit",
                        onClick: (we) => Qe(St)
                      }, X(vt(E)("wizard.summary.edit")), 9, Tp)
                    ])
                  ]),
                  $("div", Dp, [
                    Jt(Tt) ? (V(!0), q(Ft, { key: 0 }, ee(T(Tt), (we) => (V(), q("div", {
                      key: we.id,
                      class: "summary-field"
                    }, [
                      Et(we) ? (V(), q(Ft, { key: 0 }, [
                        $("span", Op, X(we.label[u.lang] || we.label.en), 1),
                        $("span", {
                          class: "summary-field-value",
                          innerHTML: Ot(we)
                        }, null, 8, Ip)
                      ], 64)) : Mt("", !0)
                    ]))), 128)) : (V(), q("span", Fp, X(vt(E)("wizard.summary.no-data")), 1))
                  ])
                ], 2);
              }), 128))
            ]),
            $("div", Rp, [
              lt.value ? Mt("", !0) : (V(), q("span", zp, X(vt(E)("form.validation-hint")), 1)),
              $("button", {
                class: "btn-validate",
                type: "button",
                disabled: Bt.value,
                "aria-label": Bt.value ? vt(E)("btn.validating") : x("validateAriaLabel", { de: "SHACL-Validierung starten", en: "Run SHACL validation" }),
                onClick: ue
              }, X(Bt.value ? "…" : x("validate", { de: vt(Xi).de["btn.validate"], en: vt(Xi).en["btn.validate"] })), 9, Np),
              $("button", {
                class: le(["btn-export", { disabled: !lt.value }]),
                disabled: !lt.value,
                onClick: Rt
              }, X(x("export", { de: vt(Xi).de["btn.export"], en: vt(Xi).en["btn.export"] })), 11, jp)
            ]),
            pt.value ? (V(), Oe(Bl, {
              key: 0,
              violations: ct.value,
              lang: u.lang,
              onClose: ut[1] || (ut[1] = (Tt) => pt.value = !1),
              onNavigate: Xt
            }, null, 8, ["violations", "lang"])) : Mt("", !0),
            $("div", Vp, [
              $("button", {
                class: "btn-back",
                onClick: Le
              }, X(vt(E)("wizard.nav.back")), 1),
              ut[5] || (ut[5] = $("span", null, null, -1))
            ])
          ], 64))
        ], 64)) : (V(), q(Ft, { key: 1 }, [
          (V(!0), q(Ft, null, ee(B.value, (Tt) => {
            var St, ve;
            return V(), q("div", {
              key: Tt.id,
              class: le(["form-group", Tt.cssClass])
            }, [
              $("h2", $p, X(((St = Tt.label) == null ? void 0 : St[u.lang]) || ((ve = Tt.label) == null ? void 0 : ve.en)), 1),
              Pn(Ml, {
                fields: T(Tt),
                lang: u.lang,
                modelValue: u.modelValue,
                fieldErrors: M.value,
                showErrors: !0,
                fieldComponent: w,
                "onUpdate:modelValue": ut[2] || (ut[2] = (fe) => Pt.$emit("update:modelValue", fe))
              }, null, 8, ["fields", "lang", "modelValue", "fieldErrors"])
            ], 2);
          }), 128)),
          $("div", Up, [
            lt.value ? Mt("", !0) : (V(), q("span", Gp, X(vt(E)("form.validation-hint")), 1)),
            $("button", {
              class: "btn-validate",
              type: "button",
              disabled: Bt.value,
              onClick: ue
            }, X(Bt.value ? "…" : x("validate", { de: vt(Xi).de["btn.validate"], en: vt(Xi).en["btn.validate"] })), 9, Zp),
            $("button", {
              class: le(["btn-export", { disabled: !lt.value }]),
              disabled: !lt.value,
              onClick: Rt
            }, X(x("export", { de: vt(Xi).de["btn.export"], en: vt(Xi).en["btn.export"] })), 11, qp)
          ]),
          pt.value ? (V(), Oe(Bl, {
            key: 0,
            violations: ct.value,
            lang: u.lang,
            onClose: ut[3] || (ut[3] = (Tt) => pt.value = !1),
            onNavigate: Xt
          }, null, 8, ["violations", "lang"])) : Mt("", !0)
        ], 64))
      ], 2);
    };
  }
}, Kp = /* @__PURE__ */ re(Hp, [["__scopeId", "data-v-a7205321"]]), Wp = { class: "onto-viewer" }, Jp = { class: "viewer-group-title" }, Xp = { class: "viewer-fields" }, Yp = {
  key: 0,
  class: "viewer-field"
}, Qp = { class: "viewer-label" }, t0 = { class: "viewer-value" }, e0 = {
  key: 0,
  class: "viewer-dist-title"
}, i0 = {
  key: 1,
  class: "viewer-dist-desc"
}, n0 = { class: "viewer-dist-links" }, r0 = ["href"], a0 = ["href"], s0 = {
  key: 2,
  class: "viewer-format"
}, o0 = ["href"], l0 = {
  key: 1,
  class: "viewer-text"
}, u0 = {
  key: 4,
  class: "viewer-text"
}, h0 = {
  __name: "MetadataViewer",
  props: {
    config: { type: Object, required: !0 },
    modelValue: { type: Object, default: () => ({}) },
    lang: { type: String, default: "en" }
  },
  setup(u) {
    const l = u, d = Nt(
      () => {
        var M;
        return (((M = l.config) == null ? void 0 : M.groups) ?? []).filter((N) => N.visible !== !1);
      }
    );
    function p(M) {
      var N, j;
      return ((N = M.label) == null ? void 0 : N[l.lang]) ?? ((j = M.label) == null ? void 0 : j.en) ?? M.id;
    }
    function b(M) {
      const N = l.modelValue[M.id];
      return N == null || N === "" ? !1 : Array.isArray(N) ? N.length > 0 : !0;
    }
    function E(M) {
      return M == null ? [] : Array.isArray(M) ? M : [M];
    }
    function x(M) {
      return Array.isArray(M) ? String(M[0] ?? "") : String(M ?? "");
    }
    function g(M) {
      const N = E(l.modelValue[M]), j = N.filter((G) => (G == null ? void 0 : G.lang) === l.lang).map((G) => (G == null ? void 0 : G.value) ?? String(G));
      return j.length > 0 ? j : N.map((G) => (G == null ? void 0 : G.value) ?? String(G));
    }
    function w(M) {
      return /^https?:\/\//.test(M);
    }
    function B(M, N) {
      var G, Y, lt;
      if (!N) return "";
      const j = (G = M.options) == null ? void 0 : G.find((ct) => ct.value === N);
      return j ? ((Y = j.label) == null ? void 0 : Y[l.lang]) ?? ((lt = j.label) == null ? void 0 : lt.en) ?? N : N;
    }
    function T(M) {
      return M ? typeof M == "string" ? M : typeof M == "object" ? M[l.lang] ?? M.en ?? M.de ?? Object.values(M)[0] ?? "" : String(M) : "";
    }
    return (M, N) => (V(), q("div", Wp, [
      (V(!0), q(Ft, null, ee(d.value, (j) => (V(), q("div", {
        key: j.id,
        class: "viewer-group"
      }, [
        $("h3", Jp, X(j.label[u.lang] ?? j.label.en ?? j.id), 1),
        $("dl", Xp, [
          (V(!0), q(Ft, null, ee(j.fields, (G) => (V(), q(Ft, { key: G }, [
            u.config.fields[G] && b(u.config.fields[G]) ? (V(), q("div", Yp, [
              $("dt", Qp, X(p(u.config.fields[G])), 1),
              $("dd", t0, [
                u.config.fields[G].type === "distribution-editor" ? (V(!0), q(Ft, { key: 0 }, ee(E(u.modelValue[G]), (Y, lt) => (V(), q("div", {
                  key: lt,
                  class: "viewer-distribution"
                }, [
                  Y["dct:title"] ? (V(), q("p", e0, X(T(Y["dct:title"])), 1)) : Mt("", !0),
                  Y["dct:description"] ? (V(), q("p", i0, X(T(Y["dct:description"])), 1)) : Mt("", !0),
                  $("div", n0, [
                    Y["dcat:downloadURL"] ? (V(), q("a", {
                      key: 0,
                      href: String(Y["dcat:downloadURL"]),
                      target: "_blank",
                      rel: "noopener",
                      class: "viewer-link"
                    }, X((u.lang === "de", "Download")), 9, r0)) : Y["dcat:accessURL"] ? (V(), q("a", {
                      key: 1,
                      href: String(Y["dcat:accessURL"]),
                      target: "_blank",
                      rel: "noopener",
                      class: "viewer-link"
                    }, X(u.lang === "de" ? "Zugang" : "Access"), 9, a0)) : Mt("", !0),
                    Y["dct:format"] ? (V(), q("span", s0, X(T(Y["dct:format"])), 1)) : Mt("", !0)
                  ])
                ]))), 128)) : u.config.fields[G].type === "langstring" ? (V(!0), q(Ft, { key: 1 }, ee(g(G), (Y, lt) => (V(), q("span", {
                  key: lt,
                  class: "viewer-langstring"
                }, X(Y), 1))), 128)) : u.config.fields[G].type === "uri" ? (V(!0), q(Ft, { key: 2 }, ee(E(u.modelValue[G]), (Y, lt) => (V(), q("span", { key: lt }, [
                  w(String(Y)) ? (V(), q("a", {
                    key: 0,
                    href: String(Y),
                    target: "_blank",
                    rel: "noopener",
                    class: "viewer-uri"
                  }, X(String(Y)), 9, o0)) : (V(), q("span", l0, X(String(Y)), 1))
                ]))), 128)) : u.config.fields[G].multiple ? (V(!0), q(Ft, { key: 3 }, ee(E(u.modelValue[G]), (Y, lt) => (V(), q("span", {
                  key: lt,
                  class: "viewer-tag"
                }, X(B(u.config.fields[G], String(Y))), 1))), 128)) : (V(), q("span", u0, X(B(u.config.fields[G], x(u.modelValue[G]))), 1))
              ])
            ])) : Mt("", !0)
          ], 64))), 128))
        ])
      ]))), 128))
    ]));
  }
}, P_ = /* @__PURE__ */ re(h0, [["__scopeId", "data-v-440cb69b"]]);
function hi(u) {
  if (typeof u != "string" || !u) return !1;
  try {
    return !!new URL(u);
  } catch {
    return !1;
  }
}
function kr(u) {
  return typeof u == "string" && /^\d{4}-\d{2}-\d{2}/.test(u);
}
function Sn(u) {
  return typeof u == "string" && /^(POLYGON|POINT|LINESTRING|MULTIPOLYGON|MULTIPOINT|MULTILINESTRING|GEOMETRYCOLLECTION)\s*\(/i.test(u.trim());
}
const c0 = {
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
class d0 {
  toJSONLD(l, d, p = "dcat:Dataset") {
    const b = {
      "@context": c0,
      "@type": p,
      "@id": l["dct:identifier"] || `_:dataset_${Date.now()}`
    };
    for (const [E, x] of Object.entries(l || {}))
      if (!(x == null || x === "" || E === "@id"))
        if (Array.isArray(x)) {
          const g = x.flatMap((w) => {
            if (w && typeof w == "object" && "value" in w)
              return w.value ? [{ "@value": w.value, "@language": w.lang }] : [];
            if (Cr(w)) {
              const T = { "@type": w["rdf:type"] || "dcat:Distribution" };
              for (const [M, N] of Object.entries(w))
                !M.includes(":") || M === "rdf:type" || N && (hi(N) ? T[M] = { "@id": N } : Sn(N) ? T[M] = { "@value": N, "@type": "http://www.opengis.net/ont/geosparql#wktLiteral" } : T[M] = N);
              return Object.keys(T).length > 1 ? [T] : [];
            }
            return w ? [w] : [];
          });
          g.length > 0 && (b[E] = g.length === 1 ? g[0] : g);
        } else if (Cr(x)) {
          const g = {};
          x["rdf:type"] && (g["@type"] = x["rdf:type"]);
          for (const [w, B] of Object.entries(x))
            !w.includes(":") || w === "rdf:type" || B && (hi(B) ? g[w] = { "@id": B } : Sn(B) ? g[w] = { "@value": B, "@type": "http://www.opengis.net/ont/geosparql#wktLiteral" } : g[w] = B);
          Object.keys(g).length > 0 && (b[E] = g);
        } else if (typeof x == "object") {
          const g = Object.fromEntries(Object.entries(x).filter(([, w]) => w));
          Object.keys(g).length > 0 && (b[E] = g);
        } else
          b[E] = x;
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
`), E = l["dct:identifier"], x = E && hi(E) ? ` rdf:about="${Ge(E)}"` : "", g = [];
    for (const [w, B] of Object.entries(l || {}))
      if (!(B == null || B === "" || w === "dct:identifier"))
        if (Array.isArray(B)) {
          for (const T of B)
            if (T)
              if (typeof T == "object" && "value" in T)
                T.value && g.push(`    <${w} xml:lang="${T.lang}">${Ge(T.value)}</${w}>`);
              else if (Cr(T)) {
                const M = T["rdf:type"] || "dcat:Distribution", N = [];
                for (const [j, G] of Object.entries(T))
                  !j.includes(":") || j === "rdf:type" || G && (hi(G) ? N.push(`        <${j} rdf:resource="${Ge(G)}"/>`) : kr(G) ? N.push(`        <${j} rdf:datatype="http://www.w3.org/2001/XMLSchema#date">${Ge(G)}</${j}>`) : Sn(G) ? N.push(`        <${j} rdf:datatype="http://www.opengis.net/ont/geosparql#wktLiteral">${Ge(String(G))}</${j}>`) : N.push(`        <${j}>${Ge(String(G))}</${j}>`));
                N.length > 0 && g.push(`    <${w}>
      <${M}>
${N.join(`
`)}
      </${M}>
    </${w}>`);
              } else hi(T) ? g.push(`    <${w} rdf:resource="${Ge(T)}"/>`) : T && g.push(`    <${w}>${Ge(String(T))}</${w}>`);
        } else if (Cr(B)) {
          const T = [], M = B["rdf:type"], N = M ? `      <${M}>` : "      <rdf:Description>", j = M ? `      </${M}>` : "      </rdf:Description>";
          for (const [G, Y] of Object.entries(B))
            !G.includes(":") || G === "rdf:type" || Y && (hi(Y) ? T.push(`        <${G} rdf:resource="${Ge(Y)}"/>`) : kr(Y) ? T.push(`        <${G} rdf:datatype="http://www.w3.org/2001/XMLSchema#date">${Ge(Y)}</${G}>`) : Sn(Y) ? T.push(`        <${G} rdf:datatype="http://www.opengis.net/ont/geosparql#wktLiteral">${Ge(String(Y))}</${G}>`) : T.push(`        <${G}>${Ge(String(Y))}</${G}>`));
          T.length > 0 && g.push(`    <${w}>
${N}
${T.join(`
`)}
${j}
    </${w}>`);
        } else if (typeof B == "object")
          for (const [T, M] of Object.entries(B))
            M && g.push(`    <${w} xml:lang="${T}">${Ge(M)}</${w}>`);
        else hi(B) ? g.push(`    <${w} rdf:resource="${Ge(B)}"/>`) : kr(B) ? g.push(`    <${w} rdf:datatype="http://www.w3.org/2001/XMLSchema#date">${Ge(B)}</${w}>`) : Sn(B) ? g.push(`    <${w} rdf:datatype="http://www.opengis.net/ont/geosparql#wktLiteral">${Ge(String(B))}</${w}>`) : g.push(`    <${w}>${Ge(String(B))}</${w}>`);
    return [
      '<?xml version="1.0" encoding="UTF-8"?>',
      `<rdf:RDF
${b}>`,
      `  <${p}${x}>`,
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
    ], E = l["dct:identifier"], x = E && hi(E) ? `<${E}>` : "_:dataset", g = [];
    for (const [B, T] of Object.entries(l || {}))
      if (!(T == null || T === "" || B === "dct:identifier"))
        if (Array.isArray(T)) {
          for (const M of T)
            if (M)
              if (typeof M == "object" && "value" in M)
                M.value && g.push(`    ${B} "${hn(M.value)}"@${M.lang}`);
              else if (Cr(M)) {
                const j = [`        a ${M["rdf:type"] || "dcat:Distribution"}`];
                for (const [G, Y] of Object.entries(M))
                  !G.includes(":") || G === "rdf:type" || Y && (hi(Y) ? j.push(`        ${G} <${Y}>`) : kr(Y) ? j.push(`        ${G} "${Y}"^^xsd:date`) : Sn(Y) ? j.push(`        ${G} "${hn(String(Y))}"^^geo:wktLiteral`) : j.push(`        ${G} "${hn(String(Y))}"`));
                if (j.length > 1) {
                  const G = j.map((Y, lt) => lt < j.length - 1 ? Y + " ;" : Y).join(`
`);
                  g.push(`    ${B} [
${G}
    ]`);
                }
              } else hi(M) ? g.push(`    ${B} <${M}>`) : M && g.push(`    ${B} "${hn(String(M))}"`);
        } else if (Cr(T)) {
          const M = [];
          T["rdf:type"] && M.push(`        a ${T["rdf:type"]}`);
          for (const [N, j] of Object.entries(T))
            !N.includes(":") || N === "rdf:type" || j && (hi(j) ? M.push(`        ${N} <${j}>`) : kr(j) ? M.push(`        ${N} "${j}"^^xsd:date`) : Sn(j) ? M.push(`        ${N} "${hn(String(j))}"^^geo:wktLiteral`) : M.push(`        ${N} "${hn(String(j))}"`));
          if (M.length > 0) {
            const N = M.map(
              (j, G) => G < M.length - 1 ? j + " ;" : j
            ).join(`
`);
            g.push(`    ${B} [
${N}
    ]`);
          }
        } else if (typeof T == "object") {
          const M = Object.entries(T).filter(([, N]) => N).map(([N, j]) => `"${hn(j)}"@${N}`);
          M.length > 0 && g.push(`    ${B} ${M.join(", ")}`);
        } else hi(T) ? g.push(`    ${B} <${T}>`) : kr(T) ? g.push(`    ${B} "${T}"^^xsd:date`) : Sn(T) ? g.push(`    ${B} "${hn(String(T))}"^^geo:wktLiteral`) : g.push(`    ${B} "${hn(String(T))}"`);
    if (g.length === 0)
      return [...b, `${x} a ${p} .`].join(`
`);
    const w = g.map(
      (B, T) => T < g.length - 1 ? B + " ;" : B + " ."
    );
    return [...b, `${x} a ${p} ;`, ...w].join(`
`);
  }
}
function Ge(u) {
  return String(u).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}
function hn(u) {
  return u.replace(/\\/g, "\\\\").replace(/"/g, '\\"').replace(/\n/g, "\\n");
}
function Cr(u) {
  return typeof u != "object" || u === null || Array.isArray(u) ? !1 : Object.keys(u).some((l) => l.includes(":"));
}
const f0 = ["aria-label"], p0 = ["aria-selected", "aria-controls", "tabindex", "onClick"], m0 = {
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
      (V(!0), q(Ft, null, ee(u.tabs, (p) => (V(), q("button", {
        key: p.id,
        role: "tab",
        "aria-selected": u.modelValue === p.id,
        "aria-controls": p.controls,
        class: le({ active: u.modelValue === p.id }),
        tabindex: u.modelValue === p.id ? 0 : -1,
        onClick: (b) => l.$emit("update:modelValue", p.id)
      }, X(p.label), 11, p0))), 128))
    ], 8, f0));
  }
}, su = /* @__PURE__ */ re(m0, [["__scopeId", "data-v-f81603fa"]]), _0 = {
  key: 0,
  class: "preview-notice",
  role: "status"
}, g0 = { class: "export-content" }, y0 = ["hidden"], v0 = ["hidden"], b0 = ["hidden"], x0 = {
  role: "status",
  "aria-live": "polite",
  class: "copy-status"
}, w0 = {
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
    const { t: l } = Xe(), d = u, p = Ht("jsonld"), b = Ht(!1), E = new d0(), x = Nt(() => E.toJSONLD(d.formData, d.standard, d.rootClass)), g = Nt(() => E.toTurtle(d.formData, d.standard, d.rootClass)), w = Nt(() => E.toRDFXML(d.formData, d.standard, d.rootClass)), B = Nt(() => p.value === "jsonld" ? x.value : p.value === "turtle" ? g.value : w.value);
    async function T() {
      await navigator.clipboard.writeText(B.value), b.value = !0, setTimeout(() => b.value = !1, 2e3);
    }
    function M() {
      const N = { jsonld: "jsonld", turtle: "ttl", rdfxml: "rdf" }, j = { jsonld: "application/ld+json", turtle: "text/turtle", rdfxml: "application/rdf+xml" };
      N[p.value];
      const G = j[p.value] || "application/rdf+xml", Y = new Blob([B.value], { type: G }), lt = URL.createObjectURL(Y), ct = document.createElement("a");
      ct.href = lt, ct.download = p.value === "jsonld" ? "metadata.jsonld" : p.value === "turtle" ? "metadata.ttl" : "metadata.rdf", ct.click(), URL.revokeObjectURL(lt);
    }
    return (N, j) => (V(), Oe(il, {
      "heading-id": "export-heading",
      title: "Export",
      "close-label": u.lang === "de" ? "Export schließen" : "Close export",
      "max-width": "800px",
      "focus-selectors": ["[role='tab']", "button"],
      onClose: j[1] || (j[1] = (G) => N.$emit("close"))
    }, {
      notice: cn(() => [
        u.preview ? (V(), q("div", _0, X(u.lang === "de" ? "Vorschau-Modus: Daten können unvollständig oder ungültig sein." : "Preview mode: data may be incomplete or invalid."), 1)) : Mt("", !0)
      ]),
      tabs: cn(() => [
        Pn(su, {
          modelValue: p.value,
          "onUpdate:modelValue": j[0] || (j[0] = (G) => p.value = G),
          "aria-label": u.lang === "de" ? "Exportformat" : "Export format",
          tabs: [
            { id: "jsonld", label: "JSON-LD", controls: "export-panel-jsonld" },
            { id: "turtle", label: "Turtle", controls: "export-panel-turtle" },
            { id: "rdfxml", label: "RDF/XML", controls: "export-panel-rdfxml" }
          ]
        }, null, 8, ["modelValue", "aria-label"])
      ]),
      actions: cn(() => [
        $("span", x0, X(b.value ? vt(l)("export.copied") : ""), 1),
        $("button", {
          class: "btn-copy",
          onClick: T
        }, X(vt(l)("btn.copy")), 1),
        $("button", {
          class: "btn-download",
          onClick: M
        }, X(vt(l)("btn.download")), 1)
      ]),
      default: cn(() => [
        $("div", g0, [
          $("div", {
            id: "export-panel-jsonld",
            role: "tabpanel",
            "aria-labelledby": "export-tab-jsonld",
            hidden: p.value !== "jsonld"
          }, [
            $("pre", null, X(x.value), 1)
          ], 8, y0),
          $("div", {
            id: "export-panel-turtle",
            role: "tabpanel",
            "aria-labelledby": "export-tab-turtle",
            hidden: p.value !== "turtle"
          }, [
            $("pre", null, X(g.value), 1)
          ], 8, v0),
          $("div", {
            id: "export-panel-rdfxml",
            role: "tabpanel",
            "aria-labelledby": "export-tab-rdfxml",
            hidden: p.value !== "rdfxml"
          }, [
            $("pre", null, X(w.value), 1)
          ], 8, b0)
        ])
      ]),
      _: 1
    }, 8, ["close-label"]));
  }
}, T_ = /* @__PURE__ */ re(w0, [["__scopeId", "data-v-05cc92ef"]]), Tl = {
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
    let E = p, x = {};
    if (Array.isArray(p["@graph"])) {
      for (const G of p["@graph"])
        G["@id"] && (x[G["@id"]] = G);
      const M = (d == null ? void 0 : d.rootClass) || "dcat:Dataset", N = [M, Pl(M)], j = (G) => {
        const Y = G["@type"];
        return (Array.isArray(Y) ? Y : Y ? [Y] : []).some((ct) => N.includes(ct));
      };
      E = p["@graph"].find(j) ?? p["@graph"].find((G) => {
        const Y = G["@type"];
        return !(Array.isArray(Y) ? Y : Y ? [Y] : []).some((ct) => ct === "rdfs:Resource" || ct.endsWith("#Resource") || ct.endsWith("/Resource"));
      }) ?? p["@graph"][0] ?? p;
    }
    const g = (M) => {
      if (!M.startsWith("http")) return M;
      for (const [N, j] of Object.entries(Tl))
        if (M.startsWith(j)) return `${N}:${M.slice(j.length)}`;
      return M;
    }, w = (M, N = /* @__PURE__ */ new Set()) => {
      if (Array.isArray(M)) return M.map((j) => w(j, N));
      if (M && typeof M == "object") {
        if (Object.keys(M).length === 1 && M["@id"])
          return x[M["@id"]] && !N.has(M["@id"]) ? w(x[M["@id"]], new Set(N).add(M["@id"])) : M["@id"];
        const G = {};
        for (const [Y, lt] of Object.entries(M)) G[Y] = w(lt, N);
        return G;
      }
      return M;
    }, B = {};
    for (const [M, N] of Object.entries(E))
      B[g(M)] = w(N);
    const T = {};
    for (const [M, N] of Object.entries(b)) {
      const j = B[M];
      if (j == null) continue;
      const G = this._deserializeJSONLD(j, N), Y = this._encodeIfTransformed(this._coerceToFieldType(G, N), N);
      Y != null && !this._isInvalid(Y, N) && (T[M] = Y);
    }
    if (!T["dct:identifier"] && E["@id"] && hi(E["@id"])) {
      const M = b["dct:identifier"];
      (!M || !this._isInvalid(E["@id"], M)) && (T["dct:identifier"] = M != null && M.multiple ? [E["@id"]] : E["@id"]);
    }
    return T;
  }
  fromRDFXML(l, d) {
    const b = new DOMParser().parseFromString(l, "application/xml"), E = b.querySelector("parsererror");
    if (E) throw new Error(E.textContent);
    const x = "http://www.w3.org/ns/dcat#", g = "http://www.w3.org/1999/02/22-rdf-syntax-ns#", w = "http://www.w3.org/XML/1998/namespace", B = b.getElementsByTagNameNS(x, "Dataset")[0];
    if (!B) throw new Error("Kein dcat:Dataset gefunden");
    const T = {}, M = /* @__PURE__ */ new Map();
    let N = 0;
    const j = (ct, pt) => {
      T[ct] || (T[ct] = []), T[ct].push(pt);
    }, G = B.getAttributeNS(g, "about");
    G && j("dct:identifier", { termType: "NamedNode", value: G });
    for (const ct of B.children) {
      const pt = ct.namespaceURI + ct.localName, Bt = this._toPrefixed(pt), ue = ct.getAttributeNS(g, "resource");
      if (ue) {
        j(Bt, { termType: "NamedNode", value: ue });
        continue;
      }
      const Xt = ct.getElementsByTagNameNS(g, "Description")[0] || (ct.children.length > 0 ? ct.children[0] : null);
      if (Xt) {
        const jt = `_:bn${N++}`, se = [];
        if (!(Xt.namespaceURI === g && Xt.localName === "Description")) {
          const Kt = Xt.namespaceURI + Xt.localName;
          se.push({ subject: { value: jt }, predicate: { value: g + "type" }, object: { termType: "NamedNode", value: Kt } });
        }
        for (const Kt of Xt.children) {
          const ce = Kt.namespaceURI + Kt.localName, Ye = Kt.getAttributeNS(g, "resource");
          if (Ye)
            se.push({ subject: { value: jt }, predicate: { value: ce }, object: { termType: "NamedNode", value: Ye } });
          else {
            const Le = Kt.getAttributeNS(w, "lang") || Kt.getAttribute("xml:lang") || "";
            se.push({ subject: { value: jt }, predicate: { value: ce }, object: { termType: "Literal", value: Kt.textContent, language: Le } });
          }
        }
        M.set(jt, se), j(Bt, { termType: "BlankNode", value: jt });
        continue;
      }
      const Rt = ct.getAttributeNS(w, "lang") || ct.getAttribute("xml:lang") || "", At = ct.getAttributeNS(g, "datatype") || "";
      j(Bt, { termType: "Literal", value: ct.textContent, language: Rt, datatype: At });
    }
    const Y = (d == null ? void 0 : d.fields) || {}, lt = {};
    for (const [ct, pt] of Object.entries(Y)) {
      const Bt = T[ct];
      if (!(Bt != null && Bt.length)) continue;
      const ue = this._deserializeTurtleObjects(Bt, pt, M), Xt = this._encodeIfTransformed(this._coerceToFieldType(ue, pt), pt);
      Xt != null && !this._isInvalid(Xt, pt) && (lt[ct] = Xt);
    }
    return lt;
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
        return (Array.isArray(l) ? l : [l]).map((w) => w && typeof w == "object" && "@value" in w ? { value: w["@value"], lang: w["@language"] || "de" } : { value: String(w), lang: "de" }).filter((w) => w.value);
      if (Array.isArray(l)) {
        const g = {};
        for (const w of l)
          w && typeof w == "object" && "@value" in w && (g[w["@language"] || "de"] = w["@value"]);
        return Object.keys(g).length ? g : { de: "" };
      }
      return typeof l == "object" && !("@value" in l) ? l : typeof l == "object" && "@value" in l ? { [l["@language"] || "de"]: l["@value"] } : { de: String(l) };
    }
    if (p === "multiselect")
      return (Array.isArray(l) ? l : [l]).map((w) => typeof w == "string" ? w : (w == null ? void 0 : w["@id"]) || String(w));
    if (p === "distribution-editor")
      return (Array.isArray(l) ? l : [l]).map((w) => this._importDistributionJSONLD(w)).filter((w) => w["dcat:accessURL"]);
    if (p === "object") {
      if (typeof l != "object" || Array.isArray(l)) return {};
      const g = {};
      for (const [w, B] of Object.entries(l)) {
        if (w === "@type") {
          const N = Array.isArray(B) ? B[0] : B;
          N && (g["rdf:type"] = this._toPrefixed(String(N)));
          continue;
        }
        if (w.startsWith("@")) continue;
        let T;
        if (typeof B == "string") T = B;
        else if (B && typeof B == "object" && "@id" in B) T = B["@id"];
        else if (B && typeof B == "object" && "@value" in B) T = B["@value"];
        else continue;
        const M = Ol[w];
        g[w] = M ? M(T) : T;
      }
      return g;
    }
    const E = (g) => typeof g == "string" ? this._scalarValue(g, d) : g && typeof g == "object" && "@value" in g ? this._scalarValue(g["@value"], d) : g && typeof g == "object" && "@id" in g ? this._scalarValue(g["@id"], d) : this._scalarValue(String(g), d), x = Array.isArray(l) ? l[0] != null ? E(l[0]) : "" : E(l);
    return b ? x ? [x] : [""] : x;
  }
  // ── Turtle ─────────────────────────────────────────────────────────────────
  async _parseTurtle(l) {
    return new Promise((d, p) => {
      const b = new rl(), E = [];
      b.parse(l, (x, g) => {
        if (x) return p(x);
        g ? E.push(g) : d(E);
      });
    });
  }
  _quadsToFormData(l, d) {
    const p = /* @__PURE__ */ new Map();
    for (const M of l) {
      const N = M.subject.value;
      p.has(N) || p.set(N, []), p.get(N).push(M);
    }
    const b = Pl((d == null ? void 0 : d.rootClass) || "dcat:Dataset"), E = "http://www.w3.org/1999/02/22-rdf-syntax-ns#type";
    let x = null;
    for (const [M, N] of p)
      if (N.some((j) => j.predicate.value === E && j.object.value === b)) {
        x = M;
        break;
      }
    x || (x = [...p.keys()][0]);
    const g = p.get(x) || [], w = {};
    for (const M of g) {
      const N = this._toPrefixed(M.predicate.value);
      w[N] || (w[N] = []), w[N].push(M.object);
    }
    const B = (d == null ? void 0 : d.fields) || {}, T = {};
    for (const [M, N] of Object.entries(B)) {
      const j = w[M];
      if (!(j != null && j.length)) continue;
      const G = this._deserializeTurtleObjects(j, N, p), Y = this._encodeIfTransformed(this._coerceToFieldType(G, N), N);
      Y != null && !this._isInvalid(Y, N) && (T[M] = Y);
    }
    if (!T["dct:identifier"] && x && hi(x)) {
      const M = B["dct:identifier"];
      (!M || !this._isInvalid(x, M)) && (T["dct:identifier"] = x);
    }
    return T;
  }
  _deserializeTurtleObjects(l, d, p) {
    const { type: b, multiple: E } = d;
    if (b === "langstring") {
      const w = l.filter((T) => T.termType === "Literal" && T.value);
      if (E)
        return w.map((T) => ({ value: T.value, lang: T.language || "de" }));
      const B = {};
      for (const T of w) B[T.language || "de"] = T.value;
      return B;
    }
    if (b === "multiselect")
      return l.map((w) => w.value);
    if (b === "distribution-editor")
      return l.filter((w) => w.termType === "BlankNode" || w.termType === "NamedNode").map((w) => this._importDistributionTurtle(p.get(w.value) || [])).filter((w) => w["dcat:accessURL"]);
    if (b === "object") {
      const w = l.find((j) => j.termType === "BlankNode" || j.termType === "NamedNode");
      if (!w) return {};
      const B = p.get(w.value) || [], T = new Set((d.subFields || []).map((j) => j.id)), M = "http://www.w3.org/1999/02/22-rdf-syntax-ns#type", N = {};
      for (const j of B) {
        const G = this._toPrefixed(j.predicate.value);
        if (j.predicate.value === M) {
          N["rdf:type"] = this._toPrefixed(j.object.value);
          continue;
        }
        if (T.size > 0 && !T.has(G)) continue;
        const Y = Ol[G];
        N[G] = Y ? Y(j.object.value) : j.object.value;
      }
      return N;
    }
    const x = l.filter((w) => w.termType === "Literal" || w.termType === "NamedNode");
    if (!x.length) return E ? [""] : "";
    const g = x.map((w) => this._scalarValue(w.value, d)).filter(Boolean);
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
    const p = Pa[d.validate];
    if (!p || d.multiple && Array.isArray(l)) return !1;
    try {
      const b = p(l, "de");
      return b && b.length > 0;
    } catch {
      return !1;
    }
  }
}
const L0 = { class: "import-body" }, k0 = { class: "file-row" }, C0 = { class: "btn-file" }, E0 = ["accept", "aria-label"], M0 = {
  key: 0,
  class: "filename",
  "aria-live": "polite"
}, B0 = ["placeholder", "aria-label", "aria-describedby"], A0 = {
  key: 0,
  id: "import-error",
  class: "import-error",
  role: "alert"
}, S0 = ["disabled"], P0 = {
  __name: "ImportPanel",
  props: {
    config: Object,
    lang: String
  },
  emits: ["import", "close"],
  setup(u, { emit: l }) {
    const { t: d } = Xe(), p = u, b = l, E = Ht("jsonld"), x = Ht(""), g = Ht(""), w = Ht(""), B = Nt(() => E.value === "jsonld" ? `{
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
    function T(N) {
      const j = N.target.files[0];
      if (!j) return;
      g.value = j.name, w.value = "";
      const G = new FileReader();
      G.onload = (Y) => {
        x.value = Y.target.result;
      }, G.readAsText(j), N.target.value = "";
    }
    async function M() {
      w.value = "";
      const N = new ou();
      try {
        let j;
        E.value === "jsonld" ? j = N.fromJSONLD(x.value, p.config) : E.value === "turtle" ? j = await N.fromTurtle(x.value, p.config) : j = N.fromRDFXML(x.value, p.config), b("import", j);
      } catch (j) {
        w.value = j.message;
      }
    }
    return (N, j) => (V(), Oe(il, {
      "heading-id": "import-heading",
      title: vt(d)("btn.import"),
      "close-label": u.lang === "de" ? "Import schließen" : "Close import",
      "max-width": "700px",
      "focus-selectors": ["[role='tab']", "button"],
      onClose: j[3] || (j[3] = (G) => N.$emit("close"))
    }, {
      tabs: cn(() => [
        Pn(su, {
          modelValue: E.value,
          "onUpdate:modelValue": j[0] || (j[0] = (G) => E.value = G),
          "aria-label": u.lang === "de" ? "Importformat" : "Import format",
          tabs: [
            { id: "jsonld", label: "JSON-LD", controls: "import-panel-jsonld" },
            { id: "turtle", label: "Turtle", controls: "import-panel-turtle" },
            { id: "rdfxml", label: "RDF/XML", controls: "import-panel-rdfxml" }
          ]
        }, null, 8, ["modelValue", "aria-label"])
      ]),
      actions: cn(() => [
        $("button", {
          class: "btn-cancel",
          onClick: j[2] || (j[2] = (G) => N.$emit("close"))
        }, X(vt(d)("btn.cancel")), 1),
        $("button", {
          class: "btn-import",
          disabled: !x.value.trim(),
          onClick: M
        }, X(vt(d)("btn.import")), 9, S0)
      ]),
      default: cn(() => [
        $("div", L0, [
          $("div", k0, [
            $("label", C0, [
              Mi(X(vt(d)("btn.open-file")) + " ", 1),
              $("input", {
                type: "file",
                accept: E.value === "jsonld" ? ".json,.jsonld" : E.value === "turtle" ? ".ttl,.turtle" : ".rdf,.xml",
                "aria-label": u.lang === "de" ? "RDF-Datei auswählen" : "Select RDF file",
                onChange: T
              }, null, 40, E0)
            ]),
            g.value ? (V(), q("span", M0, X(g.value), 1)) : Mt("", !0)
          ]),
          Jo($("textarea", {
            "onUpdate:modelValue": j[1] || (j[1] = (G) => x.value = G),
            class: "import-textarea",
            placeholder: B.value,
            "aria-label": u.lang === "de" ? "RDF-Inhalt zum Importieren" : "RDF content to import",
            "aria-describedby": w.value ? "import-error" : void 0,
            spellcheck: "false"
          }, null, 8, B0), [
            [Il, x.value]
          ]),
          w.value ? (V(), q("div", A0, "⚠ " + X(w.value), 1)) : Mt("", !0)
        ])
      ]),
      _: 1
    }, 8, ["title", "close-label"]));
  }
}, D_ = /* @__PURE__ */ re(P0, [["__scopeId", "data-v-f43095d6"]]), T0 = { class: "standard-selector" }, D0 = ["value"], O0 = ["value"], I0 = {
  __name: "StandardSelector",
  props: {
    standards: Array,
    modelValue: String,
    label: { type: String, default: "Standard:" }
  },
  emits: ["update:modelValue"],
  setup(u) {
    return (l, d) => (V(), q("div", T0, [
      $("label", null, X(u.label), 1),
      $("select", {
        value: u.modelValue,
        onChange: d[0] || (d[0] = (p) => l.$emit("update:modelValue", p.target.value))
      }, [
        (V(!0), q(Ft, null, ee(u.standards, (p) => (V(), q("option", {
          key: p.id,
          value: p.id
        }, X(p.label), 9, O0))), 128))
      ], 40, D0)
    ]));
  }
}, O_ = /* @__PURE__ */ re(I0, [["__scopeId", "data-v-5b12c43c"]]), Je = "http://www.w3.org/ns/shacl#", Aa = "http://www.w3.org/1999/02/22-rdf-syntax-ns#", Wn = "http://www.w3.org/2001/XMLSchema#", F0 = "https://piveau.eu/ns/voc#", R0 = {
  [`${Wn}string`]: "text",
  [`${Wn}date`]: "date",
  [`${Wn}dateTime`]: "date",
  [`${Wn}anyURI`]: "uri",
  [`${Aa}langString`]: "langstring",
  [`${Wn}integer`]: "text",
  [`${Wn}decimal`]: "text",
  [`${Wn}nonNegativeInteger`]: "text"
};
class z0 {
  async parse(l) {
    var x;
    const d = await ru(l), p = {};
    for (const [g, w] of d.entries()) {
      if (!w.filter((j) => j.p === `${Aa}type`).map((j) => j.o.value).includes(`${Je}NodeShape`)) continue;
      const T = (x = w.find((j) => j.p === `${Je}targetClass`)) == null ? void 0 : x.o.value, M = w.filter((j) => j.p === `${Je}property`).map((j) => j.o.value), N = {};
      for (const j of M) {
        const G = d.get(j) || [], Y = N0(G, d);
        Y && (N[Y.id] = Y);
      }
      p[g] = { subject: g, targetClass: T, fields: N };
    }
    const b = /* @__PURE__ */ new Set();
    for (const g of Object.values(p))
      for (const w of Object.values(g.fields)) {
        if (!w._linkedShape) continue;
        const B = w._linkedShape;
        delete w._linkedShape;
        const T = p[B];
        T && (w.subFields = T.fields, b.add(B));
      }
    const E = {};
    for (const [g, w] of Object.entries(p)) {
      const B = w.targetClass || g;
      E[B] = {
        targetClass: w.targetClass,
        fields: w.fields,
        embedded: b.has(g)
      };
    }
    return E;
  }
}
function wa(u, l, d) {
  const p = u.filter((E) => E.p === l);
  if (d) {
    const E = p.find((x) => x.o.language === d);
    if (E) return E.o.value;
  }
  const b = p[0];
  return b ? b.o.value : null;
}
function N0(u, l) {
  var ue, Xt, Rt, At, jt, se;
  const d = u.find((Zt) => Zt.p === `${Je}path`);
  if (!d) return null;
  const p = d.o.value, b = Da(p), E = wa(u, `${Je}name`, "de"), x = wa(u, `${Je}name`, "en"), g = wa(u, `${Je}name`, null), w = wa(u, `${Je}description`, "de"), B = wa(u, `${Je}description`, "en"), T = (ue = u.find((Zt) => Zt.p === `${Je}datatype`)) == null ? void 0 : ue.o.value, M = (Xt = u.find((Zt) => Zt.p === `${Je}nodeKind`)) == null ? void 0 : Xt.o.value, N = parseInt(((Rt = u.find((Zt) => Zt.p === `${Je}minCount`)) == null ? void 0 : Rt.o.value) || "0"), j = (At = u.find((Zt) => Zt.p === `${Je}maxCount`)) == null ? void 0 : At.o.value, G = parseFloat(((jt = u.find((Zt) => Zt.p === `${Je}order`)) == null ? void 0 : jt.o.value) || "999"), Y = u.filter((Zt) => Zt.p === `${Je}in`), lt = j0(Y, l), ct = (se = u.find((Zt) => Zt.p === `${F0}mappingLink`)) == null ? void 0 : se.o.value;
  let pt = "text";
  ct ? pt = "object" : lt.length > 0 ? pt = "select" : T ? pt = R0[T] || "text" : M === `${Je}IRI` && (pt = "uri");
  const Bt = {
    id: b,
    path: p,
    label: { de: E || g || b, en: x || g || b },
    hint: { de: w || "", en: B || "" },
    type: pt,
    required: N > 0,
    // absence of sh:maxCount means unbounded → multiple: true
    multiple: j === void 0 || parseInt(j) !== 1,
    order: G,
    options: lt,
    visible: !0
  };
  return ct && (Bt._linkedShape = ct), Bt;
}
function j0(u, l) {
  const d = [];
  for (const p of u) lu(p.o.value, l, d);
  return d;
}
function lu(u, l, d) {
  if (!u || u === `${Aa}nil`) return;
  const p = l.get(u) || [], b = p.find((x) => x.p === `${Aa}first`), E = p.find((x) => x.p === `${Aa}rest`);
  if (b) {
    const x = b.o.value;
    d.push({ value: x, label: { de: Da(x), en: Da(x) } });
  }
  E && lu(E.o.value, l, d);
}
class V0 {
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
      const b = d["skos:prefLabel"] || d["http://www.w3.org/2004/02/skos/core#prefLabel"] || [], E = {}, x = Array.isArray(b) ? b : [b];
      for (const g of x) {
        const w = g["@language"], B = g["@value"];
        w && B && (E[w] = B);
      }
      return Object.keys(E).length ? [{ value: p, label: E }] : [];
    });
  }
  _normalizeSparql(l) {
    var p, b, E, x;
    const d = /* @__PURE__ */ new Map();
    for (const g of l) {
      const w = ((p = g.concept) == null ? void 0 : p.value) || ((b = g.uri) == null ? void 0 : b.value), B = (E = g.label) == null ? void 0 : E["xml:lang"], T = (x = g.label) == null ? void 0 : x.value;
      !w || !B || !T || (d.has(w) || d.set(w, { value: w, label: {} }), d.get(w).label[B] = T);
    }
    return [...d.values()];
  }
}
class uu {
  async resolveFields(l, d, { translations: p = {} } = {}) {
    const b = await this.loadSHACL(d.shaclSource || l), x = await new z0().parse(b), g = d.rootClass, w = {};
    for (const N of Object.values(x))
      N.embedded || g && N.targetClass && Da(N.targetClass) !== g || Object.assign(w, N.fields);
    const B = { ...w }, T = d.fields || {};
    for (const [N, j] of Object.entries(T))
      B[N] ? B[N] = {
        ...B[N],
        ...j,
        label: { ...B[N].label, ...j.label || {} },
        hint: { ...B[N].hint, ...j.hint || {} }
      } : B[N] = { id: N, type: "text", visible: !0, order: 999, ...j };
    for (const [N, j] of Object.entries(p))
      for (const [G, Y] of Object.entries(B))
        for (const lt of ["label", "hint", "placeholder"]) {
          const ct = j[`${l}.field.${G}.${lt}`] ?? j[`field.${G}.${lt}`];
          ct != null && (Y[lt] = { ...Y[lt] || {}, [N]: ct });
        }
    const M = await this.resolveVocabularies(B);
    return { mergedFields: B, vocabWarnings: M };
  }
  async resolveVocabularies(l) {
    const d = new V0(), p = [], b = [];
    for (const [E, x] of Object.entries(l))
      x.optionsSource && b.push(
        d.load(x.optionsSource, x.optionsSourceFallback).then((g) => {
          x.options = [...g, ...x.options || []];
        }).catch((g) => {
          console.warn(`[VocabularyLoader] ${E}: ${g.message}`), p.push({ field: E, message: g.message });
        })
      );
    return await Promise.all(b), p;
  }
  async loadSHACL(l) {
    const d = await fetch(Yn(`shacl/${l}.ttl`));
    if (!d.ok) throw new Error(`Failed to load SHACL for ${l}`);
    return d.text();
  }
}
class I_ extends uu {
  // translations: optional object keyed by language code, each value a flat
  // { 'field.dct:title.label': 'Titel', 'group.basic.label': 'Grunddaten', … }
  // Standard-scoped keys override generic ones:
  //   'dcat-ap-at-catalogue.field.dct:title.label' overrides 'field.dct:title.label'
  async resolve(l, { translations: d = {} } = {}) {
    const p = await this.loadUIConfig(l), { mergedFields: b, vocabWarnings: E } = await this.resolveFields(l, p, { translations: d }), x = (p.groups || []).map((g) => {
      const w = {
        ...g,
        fields: g.fields.filter((B) => b[B] && b[B].visible !== !1)
      };
      for (const [B, T] of Object.entries(d)) {
        const M = T[`${l}.group.${g.id}.label`] ?? T[`group.${g.id}.label`];
        M != null && (w.label = { ...w.label || {}, [B]: M });
      }
      return w;
    });
    return {
      standard: l,
      version: p.version,
      rootClass: p.rootClass || "dcat:Dataset",
      groups: x,
      fields: b,
      vocabWarnings: E
    };
  }
  async loadUIConfig(l) {
    const d = await fetch(Yn(`config/ui-config.${l}.json`));
    if (!d.ok) throw new Error(`Failed to load UI config for ${l}`);
    return d.json();
  }
}
function $0(u) {
  const l = Ht({});
  async function d(p) {
    try {
      const b = await fetch(Yn(`translations/${p}.json`));
      if (!b.ok) return;
      l.value = { ...l.value, [p]: await b.json() };
    } catch {
    }
  }
  return wl("onto-form:lang", u), wl("onto-form:translations", Nt(() => l.value[u.value] ?? {})), { allTranslations: l, loadTranslations: d };
}
class U0 extends uu {
  // translations: optional object keyed by language code, each value a flat
  // { 'field.dct:title.label': 'Titel', 'section.basic.label': 'Grunddaten', … }
  // Standard-scoped keys override generic ones:
  //   'dcat-ap-at.field.dct:title.label' overrides 'field.dct:title.label'
  async resolve(l, { translations: d = {} } = {}) {
    const p = await this.loadUIConfig(l), { mergedFields: b, vocabWarnings: E } = await this.resolveFields(l, p, { translations: d }), x = (p.sections || []).map((g) => {
      if (g.type === "section") {
        const w = {
          ...g,
          fields: (g.fields || []).filter((B) => b[B] && b[B].visible !== !1)
        };
        for (const [B, T] of Object.entries(d)) {
          const M = T[`${l}.section.${g.id}.label`] ?? T[`section.${g.id}.label`];
          M != null && (w.label = { ...w.label || {}, [B]: M });
        }
        return w;
      } else if (g.type === "tabs") {
        const w = (g.tabs || []).map((B) => {
          const T = {
            ...B,
            fields: (B.fields || []).filter((M) => b[M] && b[M].visible !== !1),
            sections: B.sections ? B.sections.map((M) => ({
              ...M,
              fields: (M.fields || []).filter((N) => b[N] && b[N].visible !== !1)
            })) : void 0
          };
          for (const [M, N] of Object.entries(d)) {
            const j = N[`${l}.tab.${B.id}.label`] ?? N[`tab.${B.id}.label`];
            j != null && (T.label = { ...T.label || {}, [M]: j });
          }
          return T;
        });
        return { ...g, tabs: w };
      }
      return g;
    });
    return {
      standard: l,
      version: p.version,
      rootClass: p.rootClass || "dcat:Dataset",
      sections: x,
      fields: b,
      vocabWarnings: E
    };
  }
  async loadUIConfig(l) {
    const [d, p] = await Promise.all([
      fetch(Yn(`config/ui-view-config.${l}.json`)),
      fetch(Yn(`config/ui-config.${l}.json`))
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
const G0 = { class: "text-view" }, Z0 = {
  key: 0,
  class: "multiline"
}, q0 = {
  key: 1,
  class: "inline"
}, H0 = {
  __name: "TextView",
  props: {
    field: { type: Object, required: !0 },
    modelValue: { required: !0 },
    lang: { type: String, required: !0 }
  },
  setup(u) {
    const l = u, d = Nt(() => Array.isArray(l.modelValue) ? l.modelValue.filter(Boolean).join(", ") : l.modelValue ?? "");
    return (p, b) => (V(), q("div", G0, [
      u.field.multiline ? (V(), q("pre", Z0, X(d.value), 1)) : (V(), q("span", q0, X(d.value), 1))
    ]));
  }
}, Ar = /* @__PURE__ */ re(H0, [["__scopeId", "data-v-da8ef62d"]]);
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
const K0 = { class: "date-view" }, W0 = {
  __name: "DateView",
  props: {
    field: { type: Object, required: !0 },
    modelValue: { required: !0 },
    lang: { type: String, required: !0 }
  },
  setup(u) {
    const l = u, d = Nt(() => hu(l.modelValue, l.lang));
    return (p, b) => (V(), q("span", K0, X(d.value), 1));
  }
}, cu = /* @__PURE__ */ re(W0, [["__scopeId", "data-v-5481964a"]]), J0 = { class: "uri-view" }, X0 = ["href"], Y0 = ["href"], Q0 = {
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
    return (d, p) => (V(), q("div", J0, [
      Array.isArray(u.modelValue) ? (V(!0), q(Ft, { key: 0 }, ee(u.modelValue, (b, E) => (V(), q("a", {
        key: E,
        href: b,
        target: "_blank",
        rel: "noopener noreferrer",
        class: "uri-link"
      }, X(l(b)), 9, X0))), 128)) : u.modelValue ? (V(), q("a", {
        key: 1,
        href: u.modelValue,
        target: "_blank",
        rel: "noopener noreferrer",
        class: "uri-link"
      }, X(l(u.modelValue)), 9, Y0)) : Mt("", !0)
    ]));
  }
}, du = /* @__PURE__ */ re(Q0, [["__scopeId", "data-v-0eb669cb"]]), tm = { class: "select-view" }, em = {
  __name: "SelectView",
  props: {
    field: { type: Object, required: !0 },
    modelValue: { required: !0 },
    lang: { type: String, required: !0 }
  },
  setup(u) {
    const l = u, d = Nt(() => {
      var b, E, x;
      const p = (l.field.options || []).find((g) => g.value === l.modelValue);
      return p && (((b = p.label) == null ? void 0 : b[l.lang]) || ((E = p.label) == null ? void 0 : E.de) || ((x = p.label) == null ? void 0 : x.en) || p.label) || l.modelValue;
    });
    return (p, b) => (V(), q("span", tm, X(d.value), 1));
  }
}, Us = /* @__PURE__ */ re(em, [["__scopeId", "data-v-aa0b5182"]]), im = {
  key: 0,
  class: "chips"
}, nm = {
  __name: "MultiSelectView",
  props: {
    field: { type: Object, required: !0 },
    modelValue: { required: !0 },
    lang: { type: String, required: !0 }
  },
  setup(u) {
    const l = u, d = Nt(() => (Array.isArray(l.modelValue) ? l.modelValue : l.modelValue ? [l.modelValue] : []).map((b) => {
      var x, g, w;
      const E = (l.field.options || []).find((B) => B.value === b);
      return E && (((x = E.label) == null ? void 0 : x[l.lang]) || ((g = E.label) == null ? void 0 : g.de) || ((w = E.label) == null ? void 0 : w.en) || E.label) || b;
    }));
    return (p, b) => d.value.length ? (V(), q("div", im, [
      (V(!0), q(Ft, null, ee(d.value, (E, x) => (V(), q("span", {
        key: x,
        class: "chip"
      }, X(E), 1))), 128))
    ])) : Mt("", !0);
  }
}, rm = /* @__PURE__ */ re(nm, [["__scopeId", "data-v-ef8d75f2"]]);
function Br(u, l) {
  var d;
  return u ? typeof u == "string" ? u : Array.isArray(u) ? ((d = u.find((b) => b.lang === l) || u[0]) == null ? void 0 : d.value) || "" : typeof u == "object" ? u[l] || u.de || u.en || Object.values(u)[0] || "" : String(u) : "";
}
const am = { class: "langstring-view" }, sm = { class: "langstring-value" }, om = { class: "langstring-value" }, lm = { class: "langstring-lang" }, um = { class: "langstring-value" }, hm = {
  key: 0,
  class: "langstring-lang"
}, cm = {
  key: 1,
  class: "langstring-item"
}, dm = { class: "langstring-value" }, fm = {
  key: 0,
  class: "langstring-lang"
}, pm = { class: "langstring-value" }, mm = { class: "langstring-value" }, _m = { class: "langstring-lang" }, gm = { key: 3 }, ym = {
  __name: "LangStringView",
  props: {
    field: { type: Object, required: !0 },
    modelValue: { required: !0 },
    lang: { type: String, required: !0 }
  },
  setup(u) {
    const l = u, d = Nt(
      () => Array.isArray(l.modelValue) ? l.modelValue.filter((g) => g.lang === l.lang) : []
    ), p = Nt(
      () => Array.isArray(l.modelValue) ? l.modelValue.filter((g) => g.lang !== l.lang) : []
    ), b = Nt(() => {
      const g = l.modelValue;
      return !g || typeof g != "object" ? "" : Br(g, l.lang);
    }), E = Nt(() => {
      const g = l.modelValue;
      if (!g || typeof g != "object") return {};
      const w = b.value;
      return Object.fromEntries(
        Object.entries(g).filter(([B, T]) => B !== l.lang && T && T !== w)
      );
    }), x = Nt(() => Object.keys(E.value).length > 0);
    return (g, w) => (V(), q("div", am, [
      Array.isArray(u.modelValue) ? (V(), q(Ft, { key: 0 }, [
        d.value.length ? (V(), q(Ft, { key: 0 }, [
          (V(!0), q(Ft, null, ee(d.value, (B, T) => (V(), q("div", {
            key: T,
            class: "langstring-item"
          }, [
            $("span", sm, X(B.value), 1)
          ]))), 128)),
          (V(!0), q(Ft, null, ee(p.value, (B, T) => (V(), q("div", {
            key: "other-" + T,
            class: "langstring-item muted"
          }, [
            $("span", om, X(B.value), 1),
            $("span", lm, "(" + X(B.lang) + ")", 1)
          ]))), 128))
        ], 64)) : (V(!0), q(Ft, { key: 1 }, ee(u.modelValue, (B, T) => (V(), q("div", {
          key: T,
          class: "langstring-item"
        }, [
          $("span", um, X(B.value), 1),
          B.lang ? (V(), q("span", hm, "(" + X(B.lang) + ")", 1)) : Mt("", !0)
        ]))), 128))
      ], 64)) : u.modelValue && typeof u.modelValue == "object" && "value" in u.modelValue && "lang" in u.modelValue ? (V(), q("div", cm, [
        $("span", dm, X(u.modelValue.value), 1),
        u.modelValue.lang !== u.lang ? (V(), q("span", fm, "(" + X(u.modelValue.lang) + ")", 1)) : Mt("", !0)
      ])) : u.modelValue && typeof u.modelValue == "object" ? (V(), q(Ft, { key: 2 }, [
        $("span", pm, X(b.value), 1),
        x.value ? (V(!0), q(Ft, { key: 0 }, ee(E.value, (B, T) => (V(), q("div", {
          key: T,
          class: "langstring-item muted"
        }, [
          $("span", mm, X(B), 1),
          $("span", _m, "(" + X(T) + ")", 1)
        ]))), 128)) : Mt("", !0)
      ], 64)) : (V(), q("span", gm, X(u.modelValue), 1))
    ]));
  }
}, fu = /* @__PURE__ */ re(ym, [["__scopeId", "data-v-7fa61b26"]]), vm = {
  key: 0,
  class: "map-view"
}, bm = { class: "map-footer" }, xm = {
  key: 0,
  class: "bbox-info"
}, wm = { class: "bbox-label" }, Lm = ["aria-label"], km = {
  key: 1,
  class: "map-empty"
}, Cm = {
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
    const l = u, { t: d } = Xe(), p = Ht(!1), b = Ht(null);
    let E = null, x = null;
    const g = Nt(() => {
      const T = l.modelValue;
      if (!T || typeof T != "string") return null;
      const M = [...T.matchAll(/(-?\d+(?:\.\d+)?)\s+(-?\d+(?:\.\d+)?)/g)];
      if (M.length < 2) return null;
      const N = M.map((G) => parseFloat(G[1])), j = M.map((G) => parseFloat(G[2]));
      return {
        minLat: Math.min(...j).toFixed(6),
        maxLat: Math.max(...j).toFixed(6),
        minLon: Math.min(...N).toFixed(6),
        maxLon: Math.max(...N).toFixed(6)
      };
    });
    function w(T) {
      if (!E || (x && (x.remove(), x = null), !T)) return;
      const M = T.match(/POLYGON\s*\(\(([^)]+)\)\)/i);
      if (M) {
        const j = M[1].split(",").map((G) => {
          const [Y, lt] = G.trim().split(/\s+/).map(Number);
          return [lt, Y];
        });
        x = Ii.polygon(j, { color: "#2878a8", weight: 2, fillOpacity: 0.15 }).addTo(E), E.fitBounds(x.getBounds(), { padding: [20, 20] });
        return;
      }
      const N = T.match(/POINT\s*\((-?\d+(?:\.\d+)?)\s+(-?\d+(?:\.\d+)?)\)/i);
      if (N) {
        const [, j, G] = N;
        x = Ii.circleMarker([parseFloat(G), parseFloat(j)], { radius: 8, color: "#2878a8" }).addTo(E), E.setView([parseFloat(G), parseFloat(j)], 10);
      }
    }
    Qn(() => {
      E = Ii.map(b.value, { zoomControl: !0, attributionControl: !0 }).setView([47.5, 13.5], 5), Ii.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        maxZoom: 19
      }).addTo(E), l.modelValue && w(l.modelValue);
    }), pi(() => l.modelValue, (T) => w(T)), Wo(() => {
      E == null || E.remove(), E = null;
    });
    async function B() {
      try {
        await navigator.clipboard.writeText(l.modelValue), p.value = !0, setTimeout(() => {
          p.value = !1;
        }, 2e3);
      } catch {
      }
    }
    return (T, M) => u.modelValue ? (V(), q("div", vm, [
      $("div", {
        ref_key: "mapEl",
        ref: b,
        class: "map-container"
      }, null, 512),
      $("div", bm, [
        g.value ? (V(), q("dl", xm, [
          $("span", wm, X(vt(d)("viewer.bounds")) + ":", 1),
          M[0] || (M[0] = $("dt", null, "N", -1)),
          $("dd", null, X(g.value.maxLat) + "°", 1),
          M[1] || (M[1] = $("dt", null, "S", -1)),
          $("dd", null, X(g.value.minLat) + "°", 1),
          M[2] || (M[2] = $("dt", null, "E", -1)),
          $("dd", null, X(g.value.maxLon) + "°", 1),
          M[3] || (M[3] = $("dt", null, "W", -1)),
          $("dd", null, X(g.value.minLon) + "°", 1)
        ])) : Mt("", !0),
        $("button", {
          class: "copy-btn",
          onClick: B,
          "aria-label": vt(d)("viewer.copy-wkt")
        }, X(p.value ? vt(d)("viewer.wkt-copied") : vt(d)("viewer.copy-wkt")), 9, Lm)
      ])
    ])) : (V(), q("span", km, "—"));
  }
}, pu = /* @__PURE__ */ re(Cm, [["__scopeId", "data-v-40fbed3f"]]), Em = {
  key: 0,
  class: "object-view"
}, Mm = { class: "sub-label" }, Bm = { class: "sub-value" }, Am = { key: 1 }, Sm = {
  __name: "ObjectView",
  props: {
    field: { type: Object, required: !0 },
    modelValue: { required: !0 },
    lang: { type: String, required: !0 }
  },
  setup(u) {
    const l = u, d = {
      text: Ar,
      textarea: Ar,
      date: cu,
      uri: du,
      map: pu,
      langstring: fu,
      select: Us,
      searchselect: Us
    };
    function p(E) {
      return d[E.type] ?? Ar;
    }
    const b = Nt(() => {
      const E = l.field.subFields;
      return (Array.isArray(E) ? E : E && typeof E == "object" ? Object.values(E) : []).filter((g) => {
        var B;
        const w = (B = l.modelValue) == null ? void 0 : B[g.id];
        return w != null && w !== "";
      });
    });
    return (E, x) => u.modelValue && typeof u.modelValue == "object" ? (V(), q("div", Em, [
      (V(!0), q(Ft, null, ee(b.value, (g) => {
        var w, B, T;
        return V(), q("div", {
          key: g.id,
          class: "sub-row"
        }, [
          $("div", Mm, X(((w = g.label) == null ? void 0 : w[u.lang]) || ((B = g.label) == null ? void 0 : B.de) || ((T = g.label) == null ? void 0 : T.en) || g.id), 1),
          $("div", Bm, [
            (V(), Oe(Sr(p(g)), {
              field: g,
              modelValue: u.modelValue[g.id],
              lang: u.lang
            }, null, 8, ["field", "modelValue", "lang"]))
          ])
        ]);
      }), 128))
    ])) : (V(), q("span", Am, X(u.modelValue), 1));
  }
}, Pm = /* @__PURE__ */ re(Sm, [["__scopeId", "data-v-9f432f51"]]), Tm = { class: "distribution-view" }, Dm = {
  key: 0,
  class: "no-distributions"
}, Om = { class: "dist-title" }, Im = { class: "dist-links" }, Fm = ["href"], Rm = ["href"], zm = ["href"], Nm = { class: "link-label" }, jm = ["href"], Vm = { class: "link-label" }, $m = {
  key: 0,
  class: "dist-badges"
}, Um = {
  key: 0,
  class: "badge"
}, Gm = {
  key: 1,
  class: "badge badge--secondary"
}, Zm = {
  key: 1,
  class: "dist-meta"
}, qm = {
  __name: "DistributionView",
  props: {
    field: { type: Object, required: !0 },
    modelValue: { required: !0 },
    lang: { type: String, required: !0 }
  },
  setup(u) {
    const l = u, { t: d } = Xe(), p = Nt(
      () => Array.isArray(l.modelValue) ? l.modelValue.filter(Boolean) : []
    ), b = Nt(() => l.field.buttonLinks !== !1);
    function E(w) {
      return Br(w["dct:title"], l.lang);
    }
    function x(w) {
      return hu(w, l.lang);
    }
    function g(w) {
      return w["dct:license"] || w["dcatap:availability"] || w["dct:issued"] || w["dct:modified"];
    }
    return (w, B) => (V(), q("div", Tm, [
      p.value.length ? Mt("", !0) : (V(), q("div", Dm, "—")),
      (V(!0), q(Ft, null, ee(p.value, (T, M) => (V(), q("div", {
        key: M,
        class: "dist-card"
      }, [
        $("div", Om, X(E(T) || `Distribution ${M + 1}`), 1),
        $("div", Im, [
          b.value ? (V(), q(Ft, { key: 0 }, [
            T["dcat:accessURL"] ? (V(), q("a", {
              key: 0,
              href: T["dcat:accessURL"],
              target: "_blank",
              rel: "noopener noreferrer",
              class: "dist-btn dist-btn--access"
            }, "🔗 " + X(vt(d)("dist.btn.access")), 9, Fm)) : Mt("", !0),
            T["dcat:downloadURL"] ? (V(), q("a", {
              key: 1,
              href: T["dcat:downloadURL"],
              target: "_blank",
              rel: "noopener noreferrer",
              class: "dist-btn dist-btn--download"
            }, "⬇ " + X(vt(d)("dist.btn.download")), 9, Rm)) : Mt("", !0)
          ], 64)) : (V(), q(Ft, { key: 1 }, [
            T["dcat:accessURL"] ? (V(), q("a", {
              key: 0,
              href: T["dcat:accessURL"],
              target: "_blank",
              rel: "noopener noreferrer",
              class: "dist-link"
            }, [
              $("span", Nm, X(vt(d)("dist.field.access-url")), 1),
              Mi(" " + X(T["dcat:accessURL"]), 1)
            ], 8, zm)) : Mt("", !0),
            T["dcat:downloadURL"] ? (V(), q("a", {
              key: 1,
              href: T["dcat:downloadURL"],
              target: "_blank",
              rel: "noopener noreferrer",
              class: "dist-link"
            }, [
              $("span", Vm, X(vt(d)("dist.field.download-url")), 1),
              Mi(" " + X(T["dcat:downloadURL"]), 1)
            ], 8, jm)) : Mt("", !0)
          ], 64))
        ]),
        T["dct:format"] || T["dcat:mediaType"] ? (V(), q("div", $m, [
          T["dct:format"] ? (V(), q("span", Um, X(T["dct:format"]), 1)) : Mt("", !0),
          T["dcat:mediaType"] ? (V(), q("span", Gm, X(T["dcat:mediaType"]), 1)) : Mt("", !0)
        ])) : Mt("", !0),
        g(T) ? (V(), q("dl", Zm, [
          T["dct:license"] ? (V(), q(Ft, { key: 0 }, [
            $("dt", null, X(vt(d)("dist.field.license")), 1),
            $("dd", null, X(T["dct:license"]), 1)
          ], 64)) : Mt("", !0),
          T["dcatap:availability"] ? (V(), q(Ft, { key: 1 }, [
            $("dt", null, X(vt(d)("dist.field.availability")), 1),
            $("dd", null, X(T["dcatap:availability"]), 1)
          ], 64)) : Mt("", !0),
          T["dct:issued"] ? (V(), q(Ft, { key: 2 }, [
            $("dt", null, X(vt(d)("dist.field.issued")), 1),
            $("dd", null, X(x(T["dct:issued"])), 1)
          ], 64)) : Mt("", !0),
          T["dct:modified"] ? (V(), q(Ft, { key: 3 }, [
            $("dt", null, X(vt(d)("dist.field.modified")), 1),
            $("dd", null, X(x(T["dct:modified"])), 1)
          ], 64)) : Mt("", !0)
        ])) : Mt("", !0)
      ]))), 128))
    ]));
  }
}, Hm = /* @__PURE__ */ re(qm, [["__scopeId", "data-v-b3f90791"]]), Km = { class: "link-button-view" }, Wm = ["href"], Jm = {
  key: 0,
  class: "btn-icon",
  "aria-hidden": "true"
}, Xm = ["href"], Ym = {
  key: 0,
  class: "btn-icon",
  "aria-hidden": "true"
}, Qm = {
  __name: "LinkButtonView",
  props: {
    field: { type: Object, required: !0 },
    modelValue: { required: !0 },
    lang: { type: String, required: !0 }
  },
  setup(u) {
    const l = u;
    function d(p) {
      var E, x;
      const b = l.field.buttonLabel;
      if (!b) return ((E = l.field.label) == null ? void 0 : E[l.lang]) || ((x = l.field.label) == null ? void 0 : x.de) || l.field.id;
      if (Array.isArray(b)) {
        const g = b[p] ?? b[0];
        return Br(g, l.lang) || Br(g, "en") || String(g);
      }
      return Br(b, l.lang) || Br(b, "en") || String(b);
    }
    return (p, b) => (V(), q("div", Km, [
      Array.isArray(u.modelValue) ? (V(!0), q(Ft, { key: 0 }, ee(u.modelValue.filter(Boolean), (E, x) => (V(), q("a", {
        key: x,
        href: E,
        target: "_blank",
        rel: "noopener noreferrer",
        class: "link-btn"
      }, [
        u.field.buttonIcon ? (V(), q("span", Jm, X(u.field.buttonIcon), 1)) : Mt("", !0),
        Mi(" " + X(d(x)), 1)
      ], 8, Wm))), 128)) : u.modelValue ? (V(), q("a", {
        key: 1,
        href: u.modelValue,
        target: "_blank",
        rel: "noopener noreferrer",
        class: "link-btn"
      }, [
        u.field.buttonIcon ? (V(), q("span", Ym, X(u.field.buttonIcon), 1)) : Mt("", !0),
        Mi(" " + X(d(0)), 1)
      ], 8, Xm)) : Mt("", !0)
    ]));
  }
}, t_ = /* @__PURE__ */ re(Qm, [["__scopeId", "data-v-64b6f0be"]]), e_ = { class: "field-group-view" }, i_ = { class: "field-label" }, n_ = { class: "field-value" }, r_ = {
  __name: "FieldGroupView",
  props: {
    fieldIds: { type: Array, required: !0 },
    fields: { type: Object, required: !0 },
    data: { type: Object, default: () => ({}) },
    lang: { type: String, default: "de" }
  },
  setup(u) {
    const l = u, d = /* @__PURE__ */ new Set(["multiselect", "distribution-editor", "object", "langstring"]), p = {
      textarea: Ar,
      text: Ar,
      date: cu,
      uri: du,
      select: Us,
      multiselect: rm,
      searchselect: Us,
      langstring: fu,
      object: Pm,
      "distribution-editor": Hm,
      map: pu
    };
    function b(B) {
      return B.viewAs === "button" ? t_ : p[B.type] || Ar;
    }
    function E(B) {
      const { label: T } = Oa(B, l.lang);
      return T.value;
    }
    function x(B) {
      return B == null || B === "" ? !1 : Array.isArray(B) ? B.some((T) => T != null && T !== "") : !0;
    }
    function g(B) {
      var M;
      const T = l.fields[B];
      return !T || T.visible === !1 || !x((M = l.data) == null ? void 0 : M[B]) ? null : T;
    }
    function w(B) {
      return !B || !B.multiple ? !1 : !d.has(B.type);
    }
    return (B, T) => (V(), q("dl", e_, [
      (V(!0), q(Ft, null, ee(u.fieldIds, (M) => (V(), q(Ft, { key: M }, [
        g(M) ? (V(), q(Ft, { key: 0 }, [
          $("dt", i_, X(E(g(M))), 1),
          $("dd", n_, [
            w(g(M)) ? (V(!0), q(Ft, { key: 0 }, ee(u.data[M], (N, j) => (V(), Oe(Sr(b(g(M))), {
              key: j,
              field: g(M),
              modelValue: N,
              lang: u.lang,
              class: "field-item"
            }, null, 8, ["field", "modelValue", "lang"]))), 128)) : (V(), Oe(Sr(b(g(M))), {
              key: 1,
              field: g(M),
              modelValue: u.data[M],
              lang: u.lang
            }, null, 8, ["field", "modelValue", "lang"]))
          ])
        ], 64)) : Mt("", !0)
      ], 64))), 128))
    ]));
  }
}, Ko = /* @__PURE__ */ re(r_, [["__scopeId", "data-v-ccd466b8"]]), a_ = { class: "viewer-section" }, s_ = { class: "section-title" }, o_ = {
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
      return V(), q("section", a_, [
        $("h2", s_, X(((p = u.section.label) == null ? void 0 : p[u.lang]) || ((b = u.section.label) == null ? void 0 : b.de) || ((E = u.section.label) == null ? void 0 : E.en) || u.section.id), 1),
        Pn(Ko, {
          fieldIds: u.section.fields,
          fields: u.fields,
          data: u.data,
          lang: u.lang
        }, null, 8, ["fieldIds", "fields", "data", "lang"])
      ]);
    };
  }
}, l_ = /* @__PURE__ */ re(o_, [["__scopeId", "data-v-31bf0c12"]]), u_ = { class: "viewer-tabs" }, h_ = {
  class: "tabs-bar",
  role: "tablist"
}, c_ = ["aria-selected", "onClick"], d_ = {
  class: "tab-content",
  role: "tabpanel"
}, f_ = {
  key: 0,
  class: "tab-section-label"
}, p_ = {
  __name: "TabsView",
  props: {
    section: { type: Object, required: !0 },
    fields: { type: Object, required: !0 },
    data: { type: Object, default: () => ({}) },
    lang: { type: String, default: "de" }
  },
  setup(u) {
    var p, b;
    const d = Ht((b = (p = u.section.tabs) == null ? void 0 : p[0]) == null ? void 0 : b.id);
    return (E, x) => (V(), q("div", u_, [
      $("div", h_, [
        (V(!0), q(Ft, null, ee(u.section.tabs, (g) => {
          var w, B, T;
          return V(), q("button", {
            key: g.id,
            role: "tab",
            "aria-selected": d.value === g.id,
            class: le(["tab-btn", { active: d.value === g.id }]),
            onClick: (M) => d.value = g.id
          }, X(((w = g.label) == null ? void 0 : w[u.lang]) || ((B = g.label) == null ? void 0 : B.de) || ((T = g.label) == null ? void 0 : T.en) || g.id), 11, c_);
        }), 128))
      ]),
      $("div", d_, [
        (V(!0), q(Ft, null, ee(u.section.tabs, (g) => Jo((V(), q("div", {
          key: g.id,
          class: "tab-panel"
        }, [
          g.sections && g.sections.length ? (V(!0), q(Ft, { key: 0 }, ee(g.sections, (w, B) => {
            var T, M, N;
            return V(), q("div", {
              key: w.id || B,
              class: le(["tab-section", { "tab-section--first": B === 0 }])
            }, [
              w.label ? (V(), q("div", f_, X(((T = w.label) == null ? void 0 : T[u.lang]) || ((M = w.label) == null ? void 0 : M.de) || ((N = w.label) == null ? void 0 : N.en) || w.id), 1)) : Mt("", !0),
              Pn(Ko, {
                fieldIds: w.fields || [],
                fields: u.fields,
                data: u.data,
                lang: u.lang
              }, null, 8, ["fieldIds", "fields", "data", "lang"])
            ], 2);
          }), 128)) : (V(), Oe(Ko, {
            key: 1,
            fieldIds: g.fields || [],
            fields: u.fields,
            data: u.data,
            lang: u.lang
          }, null, 8, ["fieldIds", "fields", "data", "lang"]))
        ], 512)), [
          [nh, d.value === g.id]
        ])), 128))
      ])
    ]));
  }
}, m_ = /* @__PURE__ */ re(p_, [["__scopeId", "data-v-f86b76d6"]]), __ = { class: "onto-viewer ontoform" }, g_ = {
  key: 0,
  class: "viewer-loading"
}, y_ = {
  key: 1,
  class: "viewer-error",
  role: "alert"
}, v_ = {
  key: 2,
  class: "viewer-content"
}, b_ = {
  key: 3,
  class: "viewer-no-data"
}, x_ = {
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
    const l = u, d = Nt(() => l.lang), { allTranslations: p, loadTranslations: b } = $0(d), { t: E } = Xe(), x = Ht(!1), g = Ht(null), w = Ht(null), B = Ht(null);
    async function T() {
      if (l.config) {
        w.value = l.config;
        return;
      }
      if (l.standard) {
        x.value = !0, g.value = null;
        try {
          const j = new U0();
          w.value = await j.resolve(l.standard, { translations: p.value });
        } catch (j) {
          g.value = E("viewer.error") + ": " + j.message;
        } finally {
          x.value = !1;
        }
      }
    }
    function M(j) {
      return j ? j.includes("application/ld+json") ? "jsonld" : j.includes("text/turtle") ? "turtle" : j.includes("application/rdf+xml") ? "rdfxml" : j.includes("application/json") ? "json" : null : null;
    }
    async function N() {
      if (l.data) {
        B.value = l.data;
        return;
      }
      if (!l.dataUrl) {
        B.value = null;
        return;
      }
      if (w.value) {
        x.value = !0, g.value = null;
        try {
          const j = await fetch(l.dataUrl);
          if (!j.ok) throw new Error(`HTTP ${j.status}`);
          const G = l.dataFormat || M(j.headers.get("content-type"));
          if (G === "json") {
            B.value = await j.json();
            return;
          }
          const Y = await j.text(), lt = new ou();
          G === "turtle" ? B.value = await lt.fromTurtle(Y, w.value) : G === "rdfxml" ? B.value = lt.fromRDFXML(Y, w.value) : B.value = lt.fromJSONLD(Y, w.value);
        } catch (j) {
          g.value = E("viewer.error") + ": " + j.message;
        } finally {
          x.value = !1;
        }
      }
    }
    return Qn(async () => {
      await b(l.lang), await T(), await N();
    }), pi(() => l.lang, async (j) => {
      await b(j);
    }), pi(() => l.standard, async () => {
      await T(), await N();
    }), pi(() => l.config, async (j) => {
      w.value = j, await N();
    }), pi(() => l.data, (j) => {
      B.value = j;
    }), pi(() => l.dataUrl, async () => {
      await N();
    }), (j, G) => (V(), q("div", __, [
      x.value ? (V(), q("div", g_, X(vt(E)("viewer.loading")), 1)) : Mt("", !0),
      g.value ? (V(), q("div", y_, X(g.value), 1)) : Mt("", !0),
      w.value && B.value ? (V(), q("div", v_, [
        (V(!0), q(Ft, null, ee(w.value.sections, (Y) => (V(), q(Ft, {
          key: Y.id
        }, [
          Y.type === "section" ? (V(), Oe(l_, {
            key: 0,
            section: Y,
            fields: w.value.fields,
            data: B.value,
            lang: u.lang
          }, null, 8, ["section", "fields", "data", "lang"])) : Y.type === "tabs" ? (V(), Oe(m_, {
            key: 1,
            section: Y,
            fields: w.value.fields,
            data: B.value,
            lang: u.lang
          }, null, 8, ["section", "fields", "data", "lang"])) : Mt("", !0)
        ], 64))), 128))
      ])) : !x.value && !g.value ? (V(), q("div", b_, X(vt(E)("viewer.no-data")), 1)) : Mt("", !0)
    ]));
  }
}, w_ = /* @__PURE__ */ re(x_, [["__scopeId", "data-v-99c55e64"]]), Gs = {
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
function L_(u, l) {
  return u === l ? !0 : typeof u != typeof l || u === null || l === null ? !1 : JSON.stringify(u) === JSON.stringify(l);
}
function k_(u, l, d) {
  if (!(u != null && u.fields)) return l;
  let p = !1;
  const b = { ...l };
  for (const [E, x] of Object.entries(u.fields)) {
    if (!x.compute) continue;
    const g = Gs[x.compute];
    if (!g) {
      console.warn(`[fieldComputes] Unknown compute function: "${x.compute}"`);
      continue;
    }
    const w = g(b, d, E);
    w !== void 0 && !L_(w, b[E]) && (b[E] = w, p = !0);
  }
  return p ? b : l;
}
function C_(u, l) {
  const d = typeof u == "string" ? { [u]: l } : u;
  for (const [p, b] of Object.entries(d)) {
    if (Gs[p]) {
      console.warn(`[fieldComputes] "${p}" already exists — skipping. Use a unique name.`);
      continue;
    }
    Gs[p] = b;
  }
}
const E_ = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  applyComputes: k_,
  fieldComputeFns: Gs,
  registerCompute: C_
}, Symbol.toStringTag, { value: "Module" })), F_ = [
  { id: "dcat-ap-at", label: "DCAT-AP.at" },
  { id: "geodcat", label: "GeoDCAT" },
  { id: "dcat-ap-3", label: "DCAT-AP 3.0" }
], R_ = {
  install(u) {
    u.component("MetadataForm", Kp), u.component("OntoViewer", w_);
  }
};
export {
  F_ as BUILTIN_STANDARDS,
  Gd as DistributionModal,
  T_ as ExportPanel,
  Yc as FileUploader,
  I_ as FormConfigResolver,
  D_ as ImportPanel,
  Kp as MetadataForm,
  P_ as MetadataViewer,
  R_ as OntoFormPlugin,
  w_ as OntoViewer,
  d0 as RDFExporter,
  ou as RDFImporter,
  dp as SHACLValidationService,
  O_ as StandardSelector,
  Bl as ValidationReport,
  U0 as ViewConfigResolver,
  V0 as VocabularyLoader,
  Yn as assetUrl,
  A_ as configure,
  C_ as registerCompute,
  Zc as registerTransform,
  If as registerValidator,
  Rf as registerVisibility
};
//# sourceMappingURL=onto-form.es.js.map
