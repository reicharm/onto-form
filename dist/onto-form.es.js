var Tu = Object.defineProperty;
var Du = (h, l, d) => l in h ? Tu(h, l, { enumerable: !0, configurable: !0, writable: !0, value: d }) : h[l] = d;
var Nt = (h, l, d) => Du(h, typeof l != "symbol" ? l + "" : l, d);
import { ref as Xt, watchEffect as Iu, openBlock as ut, createElementBlock as ct, createElementVNode as G, toDisplayString as ht, Fragment as se, renderList as Pe, unref as Ou, createCommentVNode as Vt, computed as Jt, onMounted as Lr, normalizeClass as ne, createBlock as Pi, watch as Zn, onBeforeUnmount as Ll, createTextVNode as Gn, withKeys as rn, withModifiers as De, withDirectives as wl, vModelText as Cl, nextTick as br, resolveDynamicComponent as No, Teleport as Fu, createVNode as Ts, normalizeStyle as Ru } from "vue";
const Nu = {
  /**
   * RFC 4122 v4 UUID, optionally prepended with a prefix.
   * Uses crypto.randomUUID() when available, falls back to a manual implementation.
   *
   * generateOptions: { prefix?: string }
   */
  uuid(h) {
    const l = typeof (crypto == null ? void 0 : crypto.randomUUID) == "function" ? crypto.randomUUID() : "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (d) => {
      const y = Math.random() * 16 | 0;
      return (d === "x" ? y : y & 3 | 8).toString(16);
    });
    return h != null && h.prefix ? h.prefix + l : l;
  },
  /**
   * Slug based on current date + a short random suffix.
   * Format: YYYY-MM-DD-<4 hex chars>
   *
   * generateOptions: { prefix?: string }
   */
  slugDate(h) {
    const l = (/* @__PURE__ */ new Date()).toISOString().slice(0, 10), d = Math.floor(Math.random() * 65535).toString(16).padStart(4, "0"), y = `${l}-${d}`;
    return h != null && h.prefix ? h.prefix + y : y;
  },
  /**
   * Nano-ID style: 21 URL-safe characters (A-Za-z0-9_-).
   * Collision probability comparable to UUID v4.
   *
   * generateOptions: { prefix?: string, length?: number }
   */
  nanoid(h) {
    const l = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789_-", d = (h == null ? void 0 : h.length) ?? 21, y = new Uint8Array(d);
    crypto.getRandomValues(y);
    const k = Array.from(y).map((I) => l[I % l.length]).join("");
    return h != null && h.prefix ? h.prefix + k : k;
  }
};
async function kl(h, l) {
  const d = Nu[h];
  return d ? d(l) ?? null : (console.warn(`[idGenerators] Unknown generator: "${h}"`), null);
}
const zu = 5, pa = "ontoform:suggestions:";
let ll = {};
const yr = {
  /**
   * Inject user-specific suggestions from the embedding application.
   * Values appear at the top of the suggestion list and are not persisted.
   *
   * @param {{ [fieldId: string]: any[] }} contextMap
   */
  setUserContext(h) {
    ll = h ?? {};
  },
  /**
   * Returns all suggestions for a single field (no cross-field resolution).
   * Order: context values first, then localStorage.
   * Duplicates (by JSON equality) are removed.
   *
   * @param {string} fieldId
   * @returns {any[]}
   */
  get(h) {
    return ul([
      ...ll[h] ?? [],
      ...la(h)
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
  getFor(h) {
    var k;
    const l = this.get(h.id);
    if (!((k = h.suggestionsFrom) != null && k.length)) return l;
    const d = h.suggestionsMap || {}, y = h.suggestionsFrom.flatMap(
      (I) => this.get(I).map((w) => hl(w, d))
    );
    return ul([...l, ...y]);
  },
  /**
   * Saves a value for a field into localStorage.
   * Prepends the new value, deduplicates, and caps at MAX_STORED.
   * Null / undefined / empty objects are silently ignored.
   *
   * @param {string} fieldId
   * @param {any} value
   */
  save(h, l) {
    if (!ju(l)) return;
    const d = la(h), y = _a(l), k = d.filter((w) => _a(w) !== y), I = [l, ...k].slice(0, zu);
    try {
      localStorage.setItem(pa + h, JSON.stringify(I));
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
  remove(h, l) {
    const d = _a(l), y = la(h).filter((k) => _a(k) !== d);
    try {
      y.length ? localStorage.setItem(pa + h, JSON.stringify(y)) : localStorage.removeItem(pa + h);
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
  removeFor(h, l) {
    var v;
    const d = la(h.id);
    if (this.remove(h.id, l), la(h.id).length < d.length || !((v = h.suggestionsFrom) != null && v.length)) return;
    const k = h.suggestionsMap || {}, I = Object.fromEntries(
      Object.entries(k).map(([x, R]) => [R, x])
    ), w = hl(l, I);
    for (const x of h.suggestionsFrom)
      this.remove(x, w);
  },
  /**
   * Removes all stored suggestions for a field from localStorage.
   * User-context values are not affected.
   *
   * @param {string} fieldId
   */
  clear(h) {
    try {
      localStorage.removeItem(pa + h);
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
  label(h) {
    if (h == null) return "";
    if (typeof h != "object") return String(h);
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
    ], y = cl(h, l), k = cl(h, d);
    return y && k ? `${y} · ${k}` : y || k || Object.values(h).filter((w) => w && typeof w == "string").slice(0, 3).join(" · ") || JSON.stringify(h);
  }
};
function la(h) {
  try {
    const l = localStorage.getItem(pa + h);
    return l ? JSON.parse(l) : [];
  } catch {
    return [];
  }
}
function _a(h) {
  return JSON.stringify(h);
}
function ul(h) {
  const l = /* @__PURE__ */ new Set(), d = [];
  for (const y of h) {
    const k = _a(y);
    l.has(k) || (l.add(k), d.push(y));
  }
  return d;
}
function hl(h, l) {
  if (!h || typeof h != "object" || !Object.keys(l).length) return h;
  const d = {};
  for (const [y, k] of Object.entries(h))
    d[l[y] ?? y] = k;
  return d;
}
function ju(h) {
  return h == null ? !1 : typeof h == "object" ? Object.values(h).some((l) => l != null && l !== "") : String(h).trim() !== "";
}
function cl(h, l) {
  for (const d of l)
    if (h[d] && typeof h[d] == "string") return h[d];
  return null;
}
const Se = (h, l) => {
  const d = h.__vccOpts || h;
  for (const [y, k] of l)
    d[y] = k;
  return d;
}, $u = {
  key: 0,
  class: "field-suggestions"
}, Uu = { class: "suggestions-label" }, Vu = { class: "suggestions-list" }, Gu = ["title", "onClick"], Zu = ["aria-label", "onClick"], qu = {
  __name: "FieldSuggestions",
  props: {
    field: { type: Object, required: !0 },
    lang: { type: String, default: "de" }
  },
  emits: ["select"],
  setup(h) {
    const l = h, d = Xt([]);
    Iu(() => {
      d.value = yr.getFor(l.field);
    });
    function y(I) {
      const w = yr.label(I);
      return l.lang === "de" ? `Vorschlag „${w}" entfernen` : `Remove suggestion „${w}"`;
    }
    function k(I) {
      yr.removeFor(l.field, I), d.value = yr.getFor(l.field);
    }
    return (I, w) => d.value.length ? (ut(), ct("div", $u, [
      G("span", Uu, ht(h.lang === "de" ? "Frühere Eingaben:" : "Previous entries:"), 1),
      G("div", Vu, [
        (ut(!0), ct(se, null, Pe(d.value, (v, x) => (ut(), ct("span", {
          key: x,
          class: "suggestion-chip"
        }, [
          G("button", {
            type: "button",
            class: "chip-label",
            title: h.lang === "de" ? "Diesen Wert übernehmen" : "Use this value",
            onClick: (R) => I.$emit("select", v)
          }, ht(Ou(yr).label(v)), 9, Gu),
          G("button", {
            type: "button",
            class: "chip-remove",
            "aria-label": y(v),
            onClick: (R) => k(v)
          }, "×", 8, Zu)
        ]))), 128))
      ])
    ])) : Vt("", !0);
  }
}, El = /* @__PURE__ */ Se(qu, [["__scopeId", "data-v-0a2fc9d2"]]), Hu = { class: "field" }, Ku = ["for"], Wu = {
  key: 0,
  class: "input-with-action"
}, Ju = ["id", "value", "placeholder"], Xu = ["aria-label"], Yu = ["id", "value", "placeholder"], Qu = {
  key: 2,
  class: "hint"
}, th = {
  __name: "TextField",
  props: {
    field: Object,
    lang: String,
    modelValue: [String, Number]
  },
  emits: ["update:modelValue"],
  setup(h, { emit: l }) {
    const d = h, y = l, k = Jt(() => {
      var v, x;
      return ((v = d.field.label) == null ? void 0 : v[d.lang]) || ((x = d.field.label) == null ? void 0 : x.en) || d.field.id;
    }), I = Jt(() => {
      var v, x;
      return ((v = d.field.placeholder) == null ? void 0 : v[d.lang]) || ((x = d.field.placeholder) == null ? void 0 : x.en) || "";
    });
    async function w() {
      const v = await kl(d.field.generate, d.field.generateOptions);
      v != null && y("update:modelValue", v);
    }
    return Lr(() => {
      d.field.generate && !d.modelValue && w();
    }), (v, x) => {
      var R;
      return ut(), ct("div", Hu, [
        G("label", {
          for: h.field.id,
          class: ne({ required: h.field.required || h.field.requiredIf })
        }, ht(k.value), 11, Ku),
        h.field.generate ? (ut(), ct("div", Wu, [
          G("input", {
            id: h.field.id,
            type: "text",
            value: h.modelValue || "",
            placeholder: I.value,
            onInput: x[0] || (x[0] = (U) => v.$emit("update:modelValue", U.target.value))
          }, null, 40, Ju),
          G("button", {
            type: "button",
            class: "btn-generate",
            "aria-label": h.lang === "de" ? `Neuen ${k.value} generieren` : `Generate new ${k.value}`,
            onClick: w
          }, "↺", 8, Xu)
        ])) : (ut(), ct("input", {
          key: 1,
          id: h.field.id,
          type: "text",
          value: h.modelValue || "",
          placeholder: I.value,
          onInput: x[1] || (x[1] = (U) => v.$emit("update:modelValue", U.target.value))
        }, null, 40, Yu)),
        (R = h.field.hint) != null && R[h.lang] ? (ut(), ct("span", Qu, ht(h.field.hint[h.lang]), 1)) : Vt("", !0),
        h.field.remember ? (ut(), Pi(El, {
          key: 3,
          field: h.field,
          lang: h.lang,
          onSelect: x[2] || (x[2] = (U) => v.$emit("update:modelValue", U))
        }, null, 8, ["field", "lang"])) : Vt("", !0)
      ]);
    };
  }
}, xr = /* @__PURE__ */ Se(th, [["__scopeId", "data-v-c6b3ffa9"]]), eh = { class: "field" }, ih = ["for"], nh = ["id", "value", "placeholder"], rh = {
  key: 0,
  class: "hint"
}, ah = {
  __name: "TextareaField",
  props: {
    field: Object,
    lang: String,
    modelValue: String
  },
  emits: ["update:modelValue"],
  setup(h) {
    const l = h, d = Jt(() => {
      var k, I;
      return ((k = l.field.label) == null ? void 0 : k[l.lang]) || ((I = l.field.label) == null ? void 0 : I.en) || l.field.id;
    }), y = Jt(() => {
      var k, I;
      return ((k = l.field.placeholder) == null ? void 0 : k[l.lang]) || ((I = l.field.placeholder) == null ? void 0 : I.en) || "";
    });
    return (k, I) => {
      var w;
      return ut(), ct("div", eh, [
        G("label", {
          for: h.field.id,
          class: ne({ required: h.field.required })
        }, ht(d.value), 11, ih),
        G("textarea", {
          id: h.field.id,
          value: h.modelValue || "",
          placeholder: y.value,
          rows: "4",
          onInput: I[0] || (I[0] = (v) => k.$emit("update:modelValue", v.target.value))
        }, null, 40, nh),
        (w = h.field.hint) != null && w[h.lang] ? (ut(), ct("span", rh, ht(h.field.hint[h.lang]), 1)) : Vt("", !0)
      ]);
    };
  }
}, zo = /* @__PURE__ */ Se(ah, [["__scopeId", "data-v-974fffb5"]]), sh = { class: "field" }, oh = ["for"], lh = ["id", "value"], uh = { value: "" }, hh = ["value"], ch = {
  key: 0,
  class: "hint"
}, dh = {
  __name: "SelectField",
  props: {
    field: Object,
    lang: String,
    modelValue: String
  },
  emits: ["update:modelValue"],
  setup(h) {
    const l = h, d = Jt(() => {
      var y, k;
      return ((y = l.field.label) == null ? void 0 : y[l.lang]) || ((k = l.field.label) == null ? void 0 : k.en) || l.field.id;
    });
    return (y, k) => {
      var I;
      return ut(), ct("div", sh, [
        G("label", {
          for: h.field.id,
          class: ne({ required: h.field.required })
        }, ht(d.value), 11, oh),
        G("select", {
          id: h.field.id,
          value: h.modelValue || "",
          onChange: k[0] || (k[0] = (w) => y.$emit("update:modelValue", w.target.value))
        }, [
          G("option", uh, ht(h.lang === "de" ? "— Bitte wählen —" : "— Please select —"), 1),
          (ut(!0), ct(se, null, Pe(h.field.options, (w) => {
            var v, x;
            return ut(), ct("option", {
              key: w.value,
              value: w.value
            }, ht(((v = w.label) == null ? void 0 : v[h.lang]) || ((x = w.label) == null ? void 0 : x.en) || w.value), 9, hh);
          }), 128))
        ], 40, lh),
        (I = h.field.hint) != null && I[h.lang] ? (ut(), ct("span", ch, ht(h.field.hint[h.lang]), 1)) : Vt("", !0)
      ]);
    };
  }
}, jo = /* @__PURE__ */ Se(dh, [["__scopeId", "data-v-1c132b85"]]), fh = { class: "field" }, ph = ["for"], _h = ["id", "value"], mh = {
  key: 0,
  class: "hint"
}, gh = {
  __name: "DateField",
  props: {
    field: Object,
    lang: String,
    modelValue: String
  },
  emits: ["update:modelValue"],
  setup(h) {
    const l = h, d = Jt(() => {
      var y, k;
      return ((y = l.field.label) == null ? void 0 : y[l.lang]) || ((k = l.field.label) == null ? void 0 : k.en) || l.field.id;
    });
    return (y, k) => {
      var I;
      return ut(), ct("div", fh, [
        G("label", {
          for: h.field.id,
          class: ne({ required: h.field.required })
        }, ht(d.value), 11, ph),
        G("input", {
          id: h.field.id,
          type: "date",
          value: h.modelValue || "",
          onInput: k[0] || (k[0] = (w) => y.$emit("update:modelValue", w.target.value))
        }, null, 40, _h),
        (I = h.field.hint) != null && I[h.lang] ? (ut(), ct("span", mh, ht(h.field.hint[h.lang]), 1)) : Vt("", !0)
      ]);
    };
  }
}, $o = /* @__PURE__ */ Se(gh, [["__scopeId", "data-v-659cf997"]]), yh = { class: "field" }, vh = ["for"], bh = { class: "uri-row" }, xh = ["value", "aria-label"], Lh = ["value"], wh = ["id", "value", "placeholder", "aria-label"], Ch = ["aria-label"], kh = {
  key: 0,
  class: "hint"
}, Bo = "https", Eh = {
  __name: "URIField",
  props: {
    field: Object,
    lang: String,
    modelValue: String
  },
  emits: ["update:modelValue"],
  setup(h, { emit: l }) {
    const d = h, y = l, k = ["https", "http", "mailto", "ftp", "urn"], I = Xt(!1), w = Xt(null);
    function v(dt) {
      if (!dt) return { protocol: Bo, body: "" };
      const Q = dt.indexOf("://");
      if (Q !== -1) {
        const Et = dt.slice(0, Q);
        return k.includes(Et) ? { protocol: Et, body: dt.slice(Q + 3) } : { protocol: Bo, body: dt };
      }
      return dt.startsWith("mailto:") ? { protocol: "mailto", body: dt.slice(7) } : { protocol: Bo, body: dt };
    }
    const x = Xt(v(d.modelValue).protocol), R = Xt(v(d.modelValue).body);
    Zn(() => d.modelValue, (dt) => {
      const Q = v(dt);
      Q.protocol !== x.value && (x.value = Q.protocol), Q.body !== R.value && (R.value = Q.body);
    });
    function U() {
      return R.value ? x.value === "mailto" ? `mailto:${R.value}` : `${x.value}://${R.value}` : "";
    }
    function A(dt) {
      var Q;
      x.value = dt, y("update:modelValue", U()), (Q = w.value) == null || Q.focus();
    }
    function j(dt) {
      const Q = dt.indexOf("://");
      if (Q !== -1) {
        const Et = dt.slice(0, Q);
        if (k.includes(Et)) {
          x.value = Et, R.value = dt.slice(Q + 3), y("update:modelValue", U());
          return;
        }
      }
      R.value = dt, y("update:modelValue", U());
    }
    async function N() {
      const dt = await kl(d.field.generate, d.field.generateOptions);
      dt != null && y("update:modelValue", dt);
    }
    Lr(() => {
      d.field.generate && !d.modelValue && N();
    });
    const J = Jt(() => {
      var dt, Q;
      return ((dt = d.field.label) == null ? void 0 : dt[d.lang]) || ((Q = d.field.label) == null ? void 0 : Q.en) || d.field.id;
    }), X = Jt(() => {
      var Et, At;
      const dt = ((Et = d.field.placeholder) == null ? void 0 : Et[d.lang]) || ((At = d.field.placeholder) == null ? void 0 : At.en) || "", Q = dt.indexOf("://");
      return Q !== -1 ? dt.slice(Q + 3) : dt || (x.value === "mailto" ? "name@example.com" : "example.com/path");
    });
    return (dt, Q) => {
      var Et;
      return ut(), ct("div", yh, [
        G("label", {
          for: `${h.field.id}-body`,
          class: ne({ required: h.field.required })
        }, ht(J.value), 11, vh),
        G("div", bh, [
          G("div", {
            class: ne(["uri-input", { focused: I.value }])
          }, [
            G("select", {
              class: "protocol-select",
              value: x.value,
              "aria-label": h.lang === "de" ? "URI-Protokoll" : "URI protocol",
              onChange: Q[0] || (Q[0] = (At) => A(At.target.value)),
              onFocus: Q[1] || (Q[1] = (At) => I.value = !0),
              onBlur: Q[2] || (Q[2] = (At) => I.value = !1)
            }, [
              (ut(), ct(se, null, Pe(k, (At) => G("option", {
                key: At,
                value: At
              }, ht(At), 9, Lh)), 64))
            ], 40, xh),
            Q[6] || (Q[6] = G("span", {
              class: "protocol-sep",
              "aria-hidden": "true"
            }, "://", -1)),
            G("input", {
              id: `${h.field.id}-body`,
              ref_key: "inputEl",
              ref: w,
              type: "text",
              value: R.value,
              placeholder: X.value,
              "aria-label": `${x.value}://${h.lang === "de" ? " Adresspfad" : " address path"}`,
              onInput: Q[3] || (Q[3] = (At) => j(At.target.value)),
              onFocus: Q[4] || (Q[4] = (At) => I.value = !0),
              onBlur: Q[5] || (Q[5] = (At) => I.value = !1)
            }, null, 40, wh)
          ], 2),
          h.field.generate ? (ut(), ct("button", {
            key: 0,
            type: "button",
            class: "btn-generate",
            "aria-label": h.lang === "de" ? `Neuen ${J.value} generieren` : `Generate new ${J.value}`,
            onClick: N
          }, "↺", 8, Ch)) : Vt("", !0)
        ]),
        (Et = h.field.hint) != null && Et[h.lang] ? (ut(), ct("span", kh, ht(h.field.hint[h.lang]), 1)) : Vt("", !0)
      ]);
    };
  }
}, Uo = /* @__PURE__ */ Se(Eh, [["__scopeId", "data-v-b94afa7b"]]), Mh = { class: "field" }, Bh = { class: "lang-inputs" }, Ph = { class: "lang-tag" }, Sh = ["value", "placeholder", "rows", "onInput"], Ah = ["value", "placeholder", "onInput"], Th = {
  key: 0,
  class: "hint"
}, Dh = {
  __name: "LangStringField",
  props: {
    field: Object,
    lang: String,
    modelValue: Object
  },
  emits: ["update:modelValue"],
  setup(h, { emit: l }) {
    const d = h, y = l, k = Jt(() => {
      var x, R;
      return (R = (x = d.field) == null ? void 0 : x.contentLangs) != null && R.length ? d.field.contentLangs : ["de", "en"];
    }), I = Jt(() => {
      var x, R;
      return ((x = d.field.label) == null ? void 0 : x[d.lang]) || ((R = d.field.label) == null ? void 0 : R.en) || d.field.id;
    }), w = Jt(() => {
      var x, R;
      return ((x = d.field.placeholder) == null ? void 0 : x[d.lang]) || ((R = d.field.placeholder) == null ? void 0 : R.en) || "";
    });
    function v(x, R) {
      y("update:modelValue", { ...d.modelValue || {}, [x]: R });
    }
    return (x, R) => {
      var U;
      return ut(), ct("div", Mh, [
        G("label", {
          class: ne({ required: h.field.required })
        }, ht(I.value), 3),
        G("div", Bh, [
          (ut(!0), ct(se, null, Pe(k.value, (A) => (ut(), ct("div", {
            key: A,
            class: ne(["lang-row", { "lang-row--multiline": h.field.multiline }])
          }, [
            G("span", Ph, ht(A), 1),
            h.field.multiline ? (ut(), ct("textarea", {
              key: 0,
              value: (h.modelValue || {})[A] || "",
              placeholder: w.value,
              rows: h.field.rows || 4,
              onInput: (j) => v(A, j.target.value)
            }, null, 40, Sh)) : (ut(), ct("input", {
              key: 1,
              type: "text",
              value: (h.modelValue || {})[A] || "",
              placeholder: w.value,
              onInput: (j) => v(A, j.target.value)
            }, null, 40, Ah))
          ], 2))), 128))
        ]),
        (U = h.field.hint) != null && U[h.lang] ? (ut(), ct("span", Th, ht(h.field.hint[h.lang]), 1)) : Vt("", !0)
      ]);
    };
  }
}, Ml = /* @__PURE__ */ Se(Dh, [["__scopeId", "data-v-cbdddfb7"]]);
var ma = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function Ih(h) {
  return h && h.__esModule && Object.prototype.hasOwnProperty.call(h, "default") ? h.default : h;
}
var Do = { exports: {} };
/* @preserve
 * Leaflet 1.9.4, a JS library for interactive maps. https://leafletjs.com
 * (c) 2010-2023 Vladimir Agafonkin, (c) 2010-2011 CloudMade
 */
(function(h, l) {
  (function(d, y) {
    y(l);
  })(ma, function(d) {
    var y = "1.9.4";
    function k(t) {
      var n, s, c, m;
      for (s = 1, c = arguments.length; s < c; s++) {
        m = arguments[s];
        for (n in m)
          t[n] = m[n];
      }
      return t;
    }
    var I = Object.create || /* @__PURE__ */ function() {
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
    var v = 0;
    function x(t) {
      return "_leaflet_id" in t || (t._leaflet_id = ++v), t._leaflet_id;
    }
    function R(t, n, s) {
      var c, m, E, $;
      return $ = function() {
        c = !1, m && (E.apply(s, m), m = !1);
      }, E = function() {
        c ? m = arguments : (t.apply(s, arguments), setTimeout($, n), c = !0);
      }, E;
    }
    function U(t, n, s) {
      var c = n[1], m = n[0], E = c - m;
      return t === c && s ? t : ((t - m) % E + E) % E + m;
    }
    function A() {
      return !1;
    }
    function j(t, n) {
      if (n === !1)
        return t;
      var s = Math.pow(10, n === void 0 ? 6 : n);
      return Math.round(t * s) / s;
    }
    function N(t) {
      return t.trim ? t.trim() : t.replace(/^\s+|\s+$/g, "");
    }
    function J(t) {
      return N(t).split(/\s+/);
    }
    function X(t, n) {
      Object.prototype.hasOwnProperty.call(t, "options") || (t.options = t.options ? I(t.options) : {});
      for (var s in n)
        t.options[s] = n[s];
      return t.options;
    }
    function dt(t, n, s) {
      var c = [];
      for (var m in t)
        c.push(encodeURIComponent(s ? m.toUpperCase() : m) + "=" + encodeURIComponent(t[m]));
      return (!n || n.indexOf("?") === -1 ? "?" : "&") + c.join("&");
    }
    var Q = /\{ *([\w_ -]+) *\}/g;
    function Et(t, n) {
      return t.replace(Q, function(s, c) {
        var m = n[c];
        if (m === void 0)
          throw new Error("No value provided for variable " + s);
        return typeof m == "function" && (m = m(n)), m;
      });
    }
    var At = Array.isArray || function(t) {
      return Object.prototype.toString.call(t) === "[object Array]";
    };
    function pe(t, n) {
      for (var s = 0; s < t.length; s++)
        if (t[s] === n)
          return s;
      return -1;
    }
    var Mt = "data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=";
    function Ct(t) {
      return window["webkit" + t] || window["moz" + t] || window["ms" + t];
    }
    var Dt = 0;
    function re(t) {
      var n = +/* @__PURE__ */ new Date(), s = Math.max(0, 16 - (n - Dt));
      return Dt = n + s, window.setTimeout(t, s);
    }
    var ee = window.requestAnimationFrame || Ct("RequestAnimationFrame") || re, Yt = window.cancelAnimationFrame || Ct("CancelAnimationFrame") || Ct("CancelRequestAnimationFrame") || function(t) {
      window.clearTimeout(t);
    };
    function Kt(t, n, s) {
      if (s && ee === re)
        t.call(n);
      else
        return ee.call(window, w(t, n));
    }
    function me(t) {
      t && Yt.call(window, t);
    }
    var Ge = {
      __proto__: null,
      extend: k,
      create: I,
      bind: w,
      get lastId() {
        return v;
      },
      stamp: x,
      throttle: R,
      wrapNum: U,
      falseFn: A,
      formatNum: j,
      trim: N,
      splitWords: J,
      setOptions: X,
      getParamString: dt,
      template: Et,
      isArray: At,
      indexOf: pe,
      emptyImageUrl: Mt,
      requestFn: ee,
      cancelFn: Yt,
      requestAnimFrame: Kt,
      cancelAnimFrame: me
    };
    function be() {
    }
    be.extend = function(t) {
      var n = function() {
        X(this), this.initialize && this.initialize.apply(this, arguments), this.callInitHooks();
      }, s = n.__super__ = this.prototype, c = I(s);
      c.constructor = n, n.prototype = c;
      for (var m in this)
        Object.prototype.hasOwnProperty.call(this, m) && m !== "prototype" && m !== "__super__" && (n[m] = this[m]);
      return t.statics && k(n, t.statics), t.includes && (St(t.includes), k.apply(null, [c].concat(t.includes))), k(c, t), delete c.statics, delete c.includes, c.options && (c.options = s.options ? I(s.options) : {}, k(c.options, t.options)), c._initHooks = [], c.callInitHooks = function() {
        if (!this._initHooksCalled) {
          s.callInitHooks && s.callInitHooks.call(this), this._initHooksCalled = !0;
          for (var E = 0, $ = c._initHooks.length; E < $; E++)
            c._initHooks[E].call(this);
        }
      }, n;
    }, be.include = function(t) {
      var n = this.prototype.options;
      return k(this.prototype, t), t.options && (this.prototype.options = n, this.mergeOptions(t.options)), this;
    }, be.mergeOptions = function(t) {
      return k(this.prototype.options, t), this;
    }, be.addInitHook = function(t) {
      var n = Array.prototype.slice.call(arguments, 1), s = typeof t == "function" ? t : function() {
        this[t].apply(this, n);
      };
      return this.prototype._initHooks = this.prototype._initHooks || [], this.prototype._initHooks.push(s), this;
    };
    function St(t) {
      if (!(typeof L > "u" || !L || !L.Mixin)) {
        t = At(t) ? t : [t];
        for (var n = 0; n < t.length; n++)
          t[n] === L.Mixin.Events && console.warn("Deprecated include of L.Mixin.Events: this property will be removed in future releases, please inherit from L.Evented instead.", new Error().stack);
      }
    }
    var zt = {
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
          t = J(t);
          for (var m = 0, E = t.length; m < E; m++)
            this._on(t[m], n, s);
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
          t = J(t);
          for (var m = arguments.length === 1, E = 0, $ = t.length; E < $; E++)
            m ? this._off(t[E]) : this._off(t[E], n, s);
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
          var m = { fn: n, ctx: s };
          c && (m.once = !0), this._events = this._events || {}, this._events[t] = this._events[t] || [], this._events[t].push(m);
        }
      },
      _off: function(t, n, s) {
        var c, m, E;
        if (this._events && (c = this._events[t], !!c)) {
          if (arguments.length === 1) {
            if (this._firingCount)
              for (m = 0, E = c.length; m < E; m++)
                c[m].fn = A;
            delete this._events[t];
            return;
          }
          if (typeof n != "function") {
            console.warn("wrong listener type: " + typeof n);
            return;
          }
          var $ = this._listens(t, n, s);
          if ($ !== !1) {
            var it = c[$];
            this._firingCount && (it.fn = A, this._events[t] = c = c.slice()), c.splice($, 1);
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
        var c = k({}, n, {
          type: t,
          target: this,
          sourceTarget: n && n.sourceTarget || this
        });
        if (this._events) {
          var m = this._events[t];
          if (m) {
            this._firingCount = this._firingCount + 1 || 1;
            for (var E = 0, $ = m.length; E < $; E++) {
              var it = m[E], st = it.fn;
              it.once && this.off(t, st, it.ctx), st.call(it.ctx || this, c);
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
        var m = n;
        typeof n != "function" && (c = !!n, m = void 0, s = void 0);
        var E = this._events && this._events[t];
        if (E && E.length && this._listens(t, m, s) !== !1)
          return !0;
        if (c) {
          for (var $ in this._eventParents)
            if (this._eventParents[$].listens(t, n, s, c))
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
        for (var m = 0, E = c.length; m < E; m++)
          if (c[m].fn === n && c[m].ctx === s)
            return m;
        return !1;
      },
      // @method once(…): this
      // Behaves as [`on(…)`](#evented-on), except the listener will only get fired once and then removed.
      once: function(t, n, s) {
        if (typeof t == "object")
          for (var c in t)
            this._on(c, t[c], n, !0);
        else {
          t = J(t);
          for (var m = 0, E = t.length; m < E; m++)
            this._on(t[m], n, s, !0);
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
          this._eventParents[n].fire(t.type, k({
            layer: t.target,
            propagatedFrom: t.target
          }, t), !0);
      }
    };
    zt.addEventListener = zt.on, zt.removeEventListener = zt.clearAllEventListeners = zt.off, zt.addOneTimeEventListener = zt.once, zt.fireEvent = zt.fire, zt.hasEventListeners = zt.listens;
    var le = be.extend(zt);
    function pt(t, n, s) {
      this.x = s ? Math.round(t) : t, this.y = s ? Math.round(n) : n;
    }
    var bt = Math.trunc || function(t) {
      return t > 0 ? Math.floor(t) : Math.ceil(t);
    };
    pt.prototype = {
      // @method clone(): Point
      // Returns a copy of the current point.
      clone: function() {
        return new pt(this.x, this.y);
      },
      // @method add(otherPoint: Point): Point
      // Returns the result of addition of the current and the given points.
      add: function(t) {
        return this.clone()._add(mt(t));
      },
      _add: function(t) {
        return this.x += t.x, this.y += t.y, this;
      },
      // @method subtract(otherPoint: Point): Point
      // Returns the result of subtraction of the given point from the current.
      subtract: function(t) {
        return this.clone()._subtract(mt(t));
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
        return new pt(this.x * t.x, this.y * t.y);
      },
      // @method unscaleBy(scale: Point): Point
      // Inverse of `scaleBy`. Divide each coordinate of the current point by
      // each coordinate of `scale`.
      unscaleBy: function(t) {
        return new pt(this.x / t.x, this.y / t.y);
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
        return this.x = bt(this.x), this.y = bt(this.y), this;
      },
      // @method distanceTo(otherPoint: Point): Number
      // Returns the cartesian distance between the current and the given points.
      distanceTo: function(t) {
        t = mt(t);
        var n = t.x - this.x, s = t.y - this.y;
        return Math.sqrt(n * n + s * s);
      },
      // @method equals(otherPoint: Point): Boolean
      // Returns `true` if the given point has the same coordinates.
      equals: function(t) {
        return t = mt(t), t.x === this.x && t.y === this.y;
      },
      // @method contains(otherPoint: Point): Boolean
      // Returns `true` if both coordinates of the given point are less than the corresponding current point coordinates (in absolute values).
      contains: function(t) {
        return t = mt(t), Math.abs(t.x) <= Math.abs(this.x) && Math.abs(t.y) <= Math.abs(this.y);
      },
      // @method toString(): String
      // Returns a string representation of the point for debugging purposes.
      toString: function() {
        return "Point(" + j(this.x) + ", " + j(this.y) + ")";
      }
    };
    function mt(t, n, s) {
      return t instanceof pt ? t : At(t) ? new pt(t[0], t[1]) : t == null ? t : typeof t == "object" && "x" in t && "y" in t ? new pt(t.x, t.y) : new pt(t, n, s);
    }
    function _t(t, n) {
      if (t)
        for (var s = n ? [t, n] : t, c = 0, m = s.length; c < m; c++)
          this.extend(s[c]);
    }
    _t.prototype = {
      // @method extend(point: Point): this
      // Extends the bounds to contain the given point.
      // @alternative
      // @method extend(otherBounds: Bounds): this
      // Extend the bounds to contain the given bounds
      extend: function(t) {
        var n, s;
        if (!t)
          return this;
        if (t instanceof pt || typeof t[0] == "number" || "x" in t)
          n = s = mt(t);
        else if (t = It(t), n = t.min, s = t.max, !n || !s)
          return this;
        return !this.min && !this.max ? (this.min = n.clone(), this.max = s.clone()) : (this.min.x = Math.min(n.x, this.min.x), this.max.x = Math.max(s.x, this.max.x), this.min.y = Math.min(n.y, this.min.y), this.max.y = Math.max(s.y, this.max.y)), this;
      },
      // @method getCenter(round?: Boolean): Point
      // Returns the center point of the bounds.
      getCenter: function(t) {
        return mt(
          (this.min.x + this.max.x) / 2,
          (this.min.y + this.max.y) / 2,
          t
        );
      },
      // @method getBottomLeft(): Point
      // Returns the bottom-left point of the bounds.
      getBottomLeft: function() {
        return mt(this.min.x, this.max.y);
      },
      // @method getTopRight(): Point
      // Returns the top-right point of the bounds.
      getTopRight: function() {
        return mt(this.max.x, this.min.y);
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
        return typeof t[0] == "number" || t instanceof pt ? t = mt(t) : t = It(t), t instanceof _t ? (n = t.min, s = t.max) : n = s = t, n.x >= this.min.x && s.x <= this.max.x && n.y >= this.min.y && s.y <= this.max.y;
      },
      // @method intersects(otherBounds: Bounds): Boolean
      // Returns `true` if the rectangle intersects the given bounds. Two bounds
      // intersect if they have at least one point in common.
      intersects: function(t) {
        t = It(t);
        var n = this.min, s = this.max, c = t.min, m = t.max, E = m.x >= n.x && c.x <= s.x, $ = m.y >= n.y && c.y <= s.y;
        return E && $;
      },
      // @method overlaps(otherBounds: Bounds): Boolean
      // Returns `true` if the rectangle overlaps the given bounds. Two bounds
      // overlap if their intersection is an area.
      overlaps: function(t) {
        t = It(t);
        var n = this.min, s = this.max, c = t.min, m = t.max, E = m.x > n.x && c.x < s.x, $ = m.y > n.y && c.y < s.y;
        return E && $;
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
        var n = this.min, s = this.max, c = Math.abs(n.x - s.x) * t, m = Math.abs(n.y - s.y) * t;
        return It(
          mt(n.x - c, n.y - m),
          mt(s.x + c, s.y + m)
        );
      },
      // @method equals(otherBounds: Bounds): Boolean
      // Returns `true` if the rectangle is equivalent to the given bounds.
      equals: function(t) {
        return t ? (t = It(t), this.min.equals(t.getTopLeft()) && this.max.equals(t.getBottomRight())) : !1;
      }
    };
    function It(t, n) {
      return !t || t instanceof _t ? t : new _t(t, n);
    }
    function Tt(t, n) {
      if (t)
        for (var s = n ? [t, n] : t, c = 0, m = s.length; c < m; c++)
          this.extend(s[c]);
    }
    Tt.prototype = {
      // @method extend(latlng: LatLng): this
      // Extend the bounds to contain the given point
      // @alternative
      // @method extend(otherBounds: LatLngBounds): this
      // Extend the bounds to contain the given bounds
      extend: function(t) {
        var n = this._southWest, s = this._northEast, c, m;
        if (t instanceof jt)
          c = t, m = t;
        else if (t instanceof Tt) {
          if (c = t._southWest, m = t._northEast, !c || !m)
            return this;
        } else
          return t ? this.extend(Gt(t) || Qt(t)) : this;
        return !n && !s ? (this._southWest = new jt(c.lat, c.lng), this._northEast = new jt(m.lat, m.lng)) : (n.lat = Math.min(c.lat, n.lat), n.lng = Math.min(c.lng, n.lng), s.lat = Math.max(m.lat, s.lat), s.lng = Math.max(m.lng, s.lng)), this;
      },
      // @method pad(bufferRatio: Number): LatLngBounds
      // Returns bounds created by extending or retracting the current bounds by a given ratio in each direction.
      // For example, a ratio of 0.5 extends the bounds by 50% in each direction.
      // Negative values will retract the bounds.
      pad: function(t) {
        var n = this._southWest, s = this._northEast, c = Math.abs(n.lat - s.lat) * t, m = Math.abs(n.lng - s.lng) * t;
        return new Tt(
          new jt(n.lat - c, n.lng - m),
          new jt(s.lat + c, s.lng + m)
        );
      },
      // @method getCenter(): LatLng
      // Returns the center point of the bounds.
      getCenter: function() {
        return new jt(
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
        return new jt(this.getNorth(), this.getWest());
      },
      // @method getSouthEast(): LatLng
      // Returns the south-east point of the bounds.
      getSouthEast: function() {
        return new jt(this.getSouth(), this.getEast());
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
        typeof t[0] == "number" || t instanceof jt || "lat" in t ? t = Gt(t) : t = Qt(t);
        var n = this._southWest, s = this._northEast, c, m;
        return t instanceof Tt ? (c = t.getSouthWest(), m = t.getNorthEast()) : c = m = t, c.lat >= n.lat && m.lat <= s.lat && c.lng >= n.lng && m.lng <= s.lng;
      },
      // @method intersects(otherBounds: LatLngBounds): Boolean
      // Returns `true` if the rectangle intersects the given bounds. Two bounds intersect if they have at least one point in common.
      intersects: function(t) {
        t = Qt(t);
        var n = this._southWest, s = this._northEast, c = t.getSouthWest(), m = t.getNorthEast(), E = m.lat >= n.lat && c.lat <= s.lat, $ = m.lng >= n.lng && c.lng <= s.lng;
        return E && $;
      },
      // @method overlaps(otherBounds: LatLngBounds): Boolean
      // Returns `true` if the rectangle overlaps the given bounds. Two bounds overlap if their intersection is an area.
      overlaps: function(t) {
        t = Qt(t);
        var n = this._southWest, s = this._northEast, c = t.getSouthWest(), m = t.getNorthEast(), E = m.lat > n.lat && c.lat < s.lat, $ = m.lng > n.lng && c.lng < s.lng;
        return E && $;
      },
      // @method toBBoxString(): String
      // Returns a string with bounding box coordinates in a 'southwest_lng,southwest_lat,northeast_lng,northeast_lat' format. Useful for sending requests to web services that return geo data.
      toBBoxString: function() {
        return [this.getWest(), this.getSouth(), this.getEast(), this.getNorth()].join(",");
      },
      // @method equals(otherBounds: LatLngBounds, maxMargin?: Number): Boolean
      // Returns `true` if the rectangle is equivalent (within a small margin of error) to the given bounds. The margin of error can be overridden by setting `maxMargin` to a small number.
      equals: function(t, n) {
        return t ? (t = Qt(t), this._southWest.equals(t.getSouthWest(), n) && this._northEast.equals(t.getNorthEast(), n)) : !1;
      },
      // @method isValid(): Boolean
      // Returns `true` if the bounds are properly initialized.
      isValid: function() {
        return !!(this._southWest && this._northEast);
      }
    };
    function Qt(t, n) {
      return t instanceof Tt ? t : new Tt(t, n);
    }
    function jt(t, n, s) {
      if (isNaN(t) || isNaN(n))
        throw new Error("Invalid LatLng object: (" + t + ", " + n + ")");
      this.lat = +t, this.lng = +n, s !== void 0 && (this.alt = +s);
    }
    jt.prototype = {
      // @method equals(otherLatLng: LatLng, maxMargin?: Number): Boolean
      // Returns `true` if the given `LatLng` point is at the same position (within a small margin of error). The margin of error can be overridden by setting `maxMargin` to a small number.
      equals: function(t, n) {
        if (!t)
          return !1;
        t = Gt(t);
        var s = Math.max(
          Math.abs(this.lat - t.lat),
          Math.abs(this.lng - t.lng)
        );
        return s <= (n === void 0 ? 1e-9 : n);
      },
      // @method toString(): String
      // Returns a string representation of the point (for debugging purposes).
      toString: function(t) {
        return "LatLng(" + j(this.lat, t) + ", " + j(this.lng, t) + ")";
      },
      // @method distanceTo(otherLatLng: LatLng): Number
      // Returns the distance (in meters) to the given `LatLng` calculated using the [Spherical Law of Cosines](https://en.wikipedia.org/wiki/Spherical_law_of_cosines).
      distanceTo: function(t) {
        return xe.distance(this, Gt(t));
      },
      // @method wrap(): LatLng
      // Returns a new `LatLng` object with the longitude wrapped so it's always between -180 and +180 degrees.
      wrap: function() {
        return xe.wrapLatLng(this);
      },
      // @method toBounds(sizeInMeters: Number): LatLngBounds
      // Returns a new `LatLngBounds` object in which each boundary is `sizeInMeters/2` meters apart from the `LatLng`.
      toBounds: function(t) {
        var n = 180 * t / 40075017, s = n / Math.cos(Math.PI / 180 * this.lat);
        return Qt(
          [this.lat - n, this.lng - s],
          [this.lat + n, this.lng + s]
        );
      },
      clone: function() {
        return new jt(this.lat, this.lng, this.alt);
      }
    };
    function Gt(t, n, s) {
      return t instanceof jt ? t : At(t) && typeof t[0] != "object" ? t.length === 3 ? new jt(t[0], t[1], t[2]) : t.length === 2 ? new jt(t[0], t[1]) : null : t == null ? t : typeof t == "object" && "lat" in t ? new jt(t.lat, "lng" in t ? t.lng : t.lon, t.alt) : n === void 0 ? null : new jt(t, n, s);
    }
    var Ce = {
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
        var n = this.projection.bounds, s = this.scale(t), c = this.transformation.transform(n.min, s), m = this.transformation.transform(n.max, s);
        return new _t(c, m);
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
        var n = this.wrapLng ? U(t.lng, this.wrapLng, !0) : t.lng, s = this.wrapLat ? U(t.lat, this.wrapLat, !0) : t.lat, c = t.alt;
        return new jt(s, n, c);
      },
      // @method wrapLatLngBounds(bounds: LatLngBounds): LatLngBounds
      // Returns a `LatLngBounds` with the same size as the given one, ensuring
      // that its center is within the CRS's bounds.
      // Only accepts actual `L.LatLngBounds` instances, not arrays.
      wrapLatLngBounds: function(t) {
        var n = t.getCenter(), s = this.wrapLatLng(n), c = n.lat - s.lat, m = n.lng - s.lng;
        if (c === 0 && m === 0)
          return t;
        var E = t.getSouthWest(), $ = t.getNorthEast(), it = new jt(E.lat - c, E.lng - m), st = new jt($.lat - c, $.lng - m);
        return new Tt(it, st);
      }
    }, xe = k({}, Ce, {
      wrapLng: [-180, 180],
      // Mean Earth Radius, as recommended for use by
      // the International Union of Geodesy and Geophysics,
      // see https://rosettacode.org/wiki/Haversine_formula
      R: 6371e3,
      // distance between two geographical points using spherical law of cosines approximation
      distance: function(t, n) {
        var s = Math.PI / 180, c = t.lat * s, m = n.lat * s, E = Math.sin((n.lat - t.lat) * s / 2), $ = Math.sin((n.lng - t.lng) * s / 2), it = E * E + Math.cos(c) * Math.cos(m) * $ * $, st = 2 * Math.atan2(Math.sqrt(it), Math.sqrt(1 - it));
        return this.R * st;
      }
    }), Li = 6378137, sn = {
      R: Li,
      MAX_LATITUDE: 85.0511287798,
      project: function(t) {
        var n = Math.PI / 180, s = this.MAX_LATITUDE, c = Math.max(Math.min(s, t.lat), -s), m = Math.sin(c * n);
        return new pt(
          this.R * t.lng * n,
          this.R * Math.log((1 + m) / (1 - m)) / 2
        );
      },
      unproject: function(t) {
        var n = 180 / Math.PI;
        return new jt(
          (2 * Math.atan(Math.exp(t.y / this.R)) - Math.PI / 2) * n,
          t.x * n / this.R
        );
      },
      bounds: function() {
        var t = Li * Math.PI;
        return new _t([-t, -t], [t, t]);
      }()
    };
    function Cn(t, n, s, c) {
      if (At(t)) {
        this._a = t[0], this._b = t[1], this._c = t[2], this._d = t[3];
        return;
      }
      this._a = t, this._b = n, this._c = s, this._d = c;
    }
    Cn.prototype = {
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
        return n = n || 1, new pt(
          (t.x / n - this._b) / this._a,
          (t.y / n - this._d) / this._c
        );
      }
    };
    function Si(t, n, s, c) {
      return new Cn(t, n, s, c);
    }
    var ui = k({}, xe, {
      code: "EPSG:3857",
      projection: sn,
      transformation: function() {
        var t = 0.5 / (Math.PI * sn.R);
        return Si(t, 0.5, -t, 0.5);
      }()
    }), Ai = k({}, ui, {
      code: "EPSG:900913"
    });
    function qn(t) {
      return document.createElementNS("http://www.w3.org/2000/svg", t);
    }
    function Hn(t, n) {
      var s = "", c, m, E, $, it, st;
      for (c = 0, E = t.length; c < E; c++) {
        for (it = t[c], m = 0, $ = it.length; m < $; m++)
          st = it[m], s += (m ? "L" : "M") + st.x + " " + st.y;
        s += n ? Rt.svg ? "z" : "x" : "";
      }
      return s || "M0 0";
    }
    var Ti = document.documentElement.style, Di = "ActiveXObject" in window, Kn = Di && !document.addEventListener, kn = "msLaunchUri" in navigator && !("documentMode" in document), Ii = si("webkit"), Je = si("android"), on = si("android 2") || si("android 3"), wr = parseInt(/WebKit\/([0-9]+)|$/.exec(navigator.userAgent)[1], 10), hi = Je && si("Google") && wr < 537 && !("AudioNode" in window), En = !!window.opera, B = !kn && si("chrome"), p = si("gecko") && !Ii && !En && !Di, g = !B && si("safari"), O = si("phantom"), K = "OTransition" in Ti, at = navigator.platform.indexOf("Win") === 0, ft = Di && "transition" in Ti, Zt = "WebKitCSSMatrix" in window && "m11" in new window.WebKitCSSMatrix() && !on, de = "MozPerspective" in Ti, _e = !window.L_DISABLE_3D && (ft || Zt || de) && !K && !O, ce = typeof orientation < "u" || si("mobile"), fe = ce && Ii, Fs = ce && Zt, Cr = !window.PointerEvent && window.MSPointerEvent, Ea = !!(window.PointerEvent || Cr), Ma = "ontouchstart" in window || !!window.TouchEvent, Rs = !window.L_NO_TOUCH && (Ma || Ea), Ns = ce && En, Ba = ce && p, Pa = (window.devicePixelRatio || window.screen.deviceXDPI / window.screen.logicalXDPI) > 1, zs = function() {
      var t = !1;
      try {
        var n = Object.defineProperty({}, "passive", {
          get: function() {
            t = !0;
          }
        });
        window.addEventListener("testPassiveEventSupport", A, n), window.removeEventListener("testPassiveEventSupport", A, n);
      } catch {
      }
      return t;
    }(), js = function() {
      return !!document.createElement("canvas").getContext;
    }(), kr = !!(document.createElementNS && qn("svg").createSVGRect), Sa = !!kr && function() {
      var t = document.createElement("div");
      return t.innerHTML = "<svg/>", (t.firstChild && t.firstChild.namespaceURI) === "http://www.w3.org/2000/svg";
    }(), $s = !kr && function() {
      try {
        var t = document.createElement("div");
        t.innerHTML = '<v:shape adj="1"/>';
        var n = t.firstChild;
        return n.style.behavior = "url(#default#VML)", n && typeof n.adj == "object";
      } catch {
        return !1;
      }
    }(), Us = navigator.platform.indexOf("Mac") === 0, Vs = navigator.platform.indexOf("Linux") === 0;
    function si(t) {
      return navigator.userAgent.toLowerCase().indexOf(t) >= 0;
    }
    var Rt = {
      ie: Di,
      ielt9: Kn,
      edge: kn,
      webkit: Ii,
      android: Je,
      android23: on,
      androidStock: hi,
      opera: En,
      chrome: B,
      gecko: p,
      safari: g,
      phantom: O,
      opera12: K,
      win: at,
      ie3d: ft,
      webkit3d: Zt,
      gecko3d: de,
      any3d: _e,
      mobile: ce,
      mobileWebkit: fe,
      mobileWebkit3d: Fs,
      msPointer: Cr,
      pointer: Ea,
      touch: Rs,
      touchNative: Ma,
      mobileOpera: Ns,
      mobileGecko: Ba,
      retina: Pa,
      passiveEvents: zs,
      canvas: js,
      svg: kr,
      vml: $s,
      inlineSvg: Sa,
      mac: Us,
      linux: Vs
    }, Aa = Rt.msPointer ? "MSPointerDown" : "pointerdown", Ta = Rt.msPointer ? "MSPointerMove" : "pointermove", Er = Rt.msPointer ? "MSPointerUp" : "pointerup", Da = Rt.msPointer ? "MSPointerCancel" : "pointercancel", Mr = {
      touchstart: Aa,
      touchmove: Ta,
      touchend: Er,
      touchcancel: Da
    }, Ia = {
      touchstart: Ks,
      touchmove: Jn,
      touchend: Jn,
      touchcancel: Jn
    }, ln = {}, Oa = !1;
    function Gs(t, n, s) {
      return n === "touchstart" && Br(), Ia[n] ? (s = Ia[n].bind(this, s), t.addEventListener(Mr[n], s, !1), s) : (console.warn("wrong event specified:", n), A);
    }
    function Zs(t, n, s) {
      if (!Mr[n]) {
        console.warn("wrong event specified:", n);
        return;
      }
      t.removeEventListener(Mr[n], s, !1);
    }
    function qs(t) {
      ln[t.pointerId] = t;
    }
    function Hs(t) {
      ln[t.pointerId] && (ln[t.pointerId] = t);
    }
    function Wn(t) {
      delete ln[t.pointerId];
    }
    function Br() {
      Oa || (document.addEventListener(Aa, qs, !0), document.addEventListener(Ta, Hs, !0), document.addEventListener(Er, Wn, !0), document.addEventListener(Da, Wn, !0), Oa = !0);
    }
    function Jn(t, n) {
      if (n.pointerType !== (n.MSPOINTER_TYPE_MOUSE || "mouse")) {
        n.touches = [];
        for (var s in ln)
          n.touches.push(ln[s]);
        n.changedTouches = [n], t(n);
      }
    }
    function Ks(t, n) {
      n.MSPOINTER_TYPE_TOUCH && n.pointerType === n.MSPOINTER_TYPE_TOUCH && Ie(n), Jn(t, n);
    }
    function Ws(t) {
      var n = {}, s, c;
      for (c in t)
        s = t[c], n[c] = s && s.bind ? s.bind(t) : s;
      return t = n, n.type = "dblclick", n.detail = 2, n.isTrusted = !1, n._simulated = !0, n;
    }
    var Js = 200;
    function Xs(t, n) {
      t.addEventListener("dblclick", n);
      var s = 0, c;
      function m(E) {
        if (E.detail !== 1) {
          c = E.detail;
          return;
        }
        if (!(E.pointerType === "mouse" || E.sourceCapabilities && !E.sourceCapabilities.firesTouchEvents)) {
          var $ = ja(E);
          if (!($.some(function(st) {
            return st instanceof HTMLLabelElement && st.attributes.for;
          }) && !$.some(function(st) {
            return st instanceof HTMLInputElement || st instanceof HTMLSelectElement;
          }))) {
            var it = Date.now();
            it - s <= Js ? (c++, c === 2 && n(Ws(E))) : c = 1, s = it;
          }
        }
      }
      return t.addEventListener("click", m), {
        dblclick: n,
        simDblclick: m
      };
    }
    function Ys(t, n) {
      t.removeEventListener("dblclick", n.dblclick), t.removeEventListener("click", n.simDblclick);
    }
    var Pr = Yn(
      ["transform", "webkitTransform", "OTransform", "MozTransform", "msTransform"]
    ), Mn = Yn(
      ["webkitTransition", "transition", "OTransition", "MozTransition", "msTransition"]
    ), Fa = Mn === "webkitTransition" || Mn === "OTransition" ? Mn + "End" : "transitionend";
    function Ra(t) {
      return typeof t == "string" ? document.getElementById(t) : t;
    }
    function Oi(t, n) {
      var s = t.style[n] || t.currentStyle && t.currentStyle[n];
      if ((!s || s === "auto") && document.defaultView) {
        var c = document.defaultView.getComputedStyle(t, null);
        s = c ? c[n] : null;
      }
      return s === "auto" ? null : s;
    }
    function oe(t, n, s) {
      var c = document.createElement(t);
      return c.className = n || "", s && s.appendChild(c), c;
    }
    function ye(t) {
      var n = t.parentNode;
      n && n.removeChild(t);
    }
    function Bn(t) {
      for (; t.firstChild; )
        t.removeChild(t.firstChild);
    }
    function un(t) {
      var n = t.parentNode;
      n && n.lastChild !== t && n.appendChild(t);
    }
    function hn(t) {
      var n = t.parentNode;
      n && n.firstChild !== t && n.insertBefore(t, n.firstChild);
    }
    function Sr(t, n) {
      if (t.classList !== void 0)
        return t.classList.contains(n);
      var s = Xn(t);
      return s.length > 0 && new RegExp("(^|\\s)" + n + "(\\s|$)").test(s);
    }
    function Wt(t, n) {
      if (t.classList !== void 0)
        for (var s = J(n), c = 0, m = s.length; c < m; c++)
          t.classList.add(s[c]);
      else if (!Sr(t, n)) {
        var E = Xn(t);
        Ar(t, (E ? E + " " : "") + n);
      }
    }
    function Le(t, n) {
      t.classList !== void 0 ? t.classList.remove(n) : Ar(t, N((" " + Xn(t) + " ").replace(" " + n + " ", " ")));
    }
    function Ar(t, n) {
      t.className.baseVal === void 0 ? t.className = n : t.className.baseVal = n;
    }
    function Xn(t) {
      return t.correspondingElement && (t = t.correspondingElement), t.className.baseVal === void 0 ? t.className : t.className.baseVal;
    }
    function ti(t, n) {
      "opacity" in t.style ? t.style.opacity = n : "filter" in t.style && Qs(t, n);
    }
    function Qs(t, n) {
      var s = !1, c = "DXImageTransform.Microsoft.Alpha";
      try {
        s = t.filters.item(c);
      } catch {
        if (n === 1)
          return;
      }
      n = Math.round(n * 100), s ? (s.Enabled = n !== 100, s.Opacity = n) : t.style.filter += " progid:" + c + "(opacity=" + n + ")";
    }
    function Yn(t) {
      for (var n = document.documentElement.style, s = 0; s < t.length; s++)
        if (t[s] in n)
          return t[s];
      return !1;
    }
    function qi(t, n, s) {
      var c = n || new pt(0, 0);
      t.style[Pr] = (Rt.ie3d ? "translate(" + c.x + "px," + c.y + "px)" : "translate3d(" + c.x + "px," + c.y + "px,0)") + (s ? " scale(" + s + ")" : "");
    }
    function ke(t, n) {
      t._leaflet_pos = n, Rt.any3d ? qi(t, n) : (t.style.left = n.x + "px", t.style.top = n.y + "px");
    }
    function Fi(t) {
      return t._leaflet_pos || new pt(0, 0);
    }
    var Pn, Sn, Tr;
    if ("onselectstart" in document)
      Pn = function() {
        qt(window, "selectstart", Ie);
      }, Sn = function() {
        ue(window, "selectstart", Ie);
      };
    else {
      var An = Yn(
        ["userSelect", "WebkitUserSelect", "OUserSelect", "MozUserSelect", "msUserSelect"]
      );
      Pn = function() {
        if (An) {
          var t = document.documentElement.style;
          Tr = t[An], t[An] = "none";
        }
      }, Sn = function() {
        An && (document.documentElement.style[An] = Tr, Tr = void 0);
      };
    }
    function Dr() {
      qt(window, "dragstart", Ie);
    }
    function Ir() {
      ue(window, "dragstart", Ie);
    }
    var Qn, Or;
    function Fr(t) {
      for (; t.tabIndex === -1; )
        t = t.parentNode;
      t.style && (tr(), Qn = t, Or = t.style.outlineStyle, t.style.outlineStyle = "none", qt(window, "keydown", tr));
    }
    function tr() {
      Qn && (Qn.style.outlineStyle = Or, Qn = void 0, Or = void 0, ue(window, "keydown", tr));
    }
    function Na(t) {
      do
        t = t.parentNode;
      while ((!t.offsetWidth || !t.offsetHeight) && t !== document.body);
      return t;
    }
    function Rr(t) {
      var n = t.getBoundingClientRect();
      return {
        x: n.width / t.offsetWidth || 1,
        y: n.height / t.offsetHeight || 1,
        boundingClientRect: n
      };
    }
    var to = {
      __proto__: null,
      TRANSFORM: Pr,
      TRANSITION: Mn,
      TRANSITION_END: Fa,
      get: Ra,
      getStyle: Oi,
      create: oe,
      remove: ye,
      empty: Bn,
      toFront: un,
      toBack: hn,
      hasClass: Sr,
      addClass: Wt,
      removeClass: Le,
      setClass: Ar,
      getClass: Xn,
      setOpacity: ti,
      testProp: Yn,
      setTransform: qi,
      setPosition: ke,
      getPosition: Fi,
      get disableTextSelection() {
        return Pn;
      },
      get enableTextSelection() {
        return Sn;
      },
      disableImageDrag: Dr,
      enableImageDrag: Ir,
      preventOutline: Fr,
      restoreOutline: tr,
      getSizedParentNode: Na,
      getScale: Rr
    };
    function qt(t, n, s, c) {
      if (n && typeof n == "object")
        for (var m in n)
          zr(t, m, n[m], s);
      else {
        n = J(n);
        for (var E = 0, $ = n.length; E < $; E++)
          zr(t, n[E], s, c);
      }
      return this;
    }
    var ci = "_leaflet_events";
    function ue(t, n, s, c) {
      if (arguments.length === 1)
        za(t), delete t[ci];
      else if (n && typeof n == "object")
        for (var m in n)
          jr(t, m, n[m], s);
      else if (n = J(n), arguments.length === 2)
        za(t, function(it) {
          return pe(n, it) !== -1;
        });
      else
        for (var E = 0, $ = n.length; E < $; E++)
          jr(t, n[E], s, c);
      return this;
    }
    function za(t, n) {
      for (var s in t[ci]) {
        var c = s.split(/\d/)[0];
        (!n || n(c)) && jr(t, c, null, null, s);
      }
    }
    var Nr = {
      mouseenter: "mouseover",
      mouseleave: "mouseout",
      wheel: !("onwheel" in window) && "mousewheel"
    };
    function zr(t, n, s, c) {
      var m = n + x(s) + (c ? "_" + x(c) : "");
      if (t[ci] && t[ci][m])
        return this;
      var E = function(it) {
        return s.call(c || t, it || window.event);
      }, $ = E;
      !Rt.touchNative && Rt.pointer && n.indexOf("touch") === 0 ? E = Gs(t, n, E) : Rt.touch && n === "dblclick" ? E = Xs(t, E) : "addEventListener" in t ? n === "touchstart" || n === "touchmove" || n === "wheel" || n === "mousewheel" ? t.addEventListener(Nr[n] || n, E, Rt.passiveEvents ? { passive: !1 } : !1) : n === "mouseenter" || n === "mouseleave" ? (E = function(it) {
        it = it || window.event, er(t, it) && $(it);
      }, t.addEventListener(Nr[n], E, !1)) : t.addEventListener(n, $, !1) : t.attachEvent("on" + n, E), t[ci] = t[ci] || {}, t[ci][m] = E;
    }
    function jr(t, n, s, c, m) {
      m = m || n + x(s) + (c ? "_" + x(c) : "");
      var E = t[ci] && t[ci][m];
      if (!E)
        return this;
      !Rt.touchNative && Rt.pointer && n.indexOf("touch") === 0 ? Zs(t, n, E) : Rt.touch && n === "dblclick" ? Ys(t, E) : "removeEventListener" in t ? t.removeEventListener(Nr[n] || n, E, !1) : t.detachEvent("on" + n, E), t[ci][m] = null;
    }
    function Hi(t) {
      return t.stopPropagation ? t.stopPropagation() : t.originalEvent ? t.originalEvent._stopped = !0 : t.cancelBubble = !0, this;
    }
    function $r(t) {
      return zr(t, "wheel", Hi), this;
    }
    function Tn(t) {
      return qt(t, "mousedown touchstart dblclick contextmenu", Hi), t._leaflet_disable_click = !0, this;
    }
    function Ie(t) {
      return t.preventDefault ? t.preventDefault() : t.returnValue = !1, this;
    }
    function Ki(t) {
      return Ie(t), Hi(t), this;
    }
    function ja(t) {
      if (t.composedPath)
        return t.composedPath();
      for (var n = [], s = t.target; s; )
        n.push(s), s = s.parentNode;
      return n;
    }
    function Dn(t, n) {
      if (!n)
        return new pt(t.clientX, t.clientY);
      var s = Rr(n), c = s.boundingClientRect;
      return new pt(
        // offset.left/top values are in page scale (like clientX/Y),
        // whereas clientLeft/Top (border width) values are the original values (before CSS scale applies).
        (t.clientX - c.left) / s.x - n.clientLeft,
        (t.clientY - c.top) / s.y - n.clientTop
      );
    }
    var eo = Rt.linux && Rt.chrome ? window.devicePixelRatio : Rt.mac ? window.devicePixelRatio * 3 : window.devicePixelRatio > 0 ? 2 * window.devicePixelRatio : 1;
    function $a(t) {
      return Rt.edge ? t.wheelDeltaY / 2 : (
        // Don't trust window-geometry-based delta
        t.deltaY && t.deltaMode === 0 ? -t.deltaY / eo : (
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
    function er(t, n) {
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
    var ae = {
      __proto__: null,
      on: qt,
      off: ue,
      stopPropagation: Hi,
      disableScrollPropagation: $r,
      disableClickPropagation: Tn,
      preventDefault: Ie,
      stop: Ki,
      getPropagationPath: ja,
      getMousePosition: Dn,
      getWheelDelta: $a,
      isExternalTarget: er,
      addListener: qt,
      removeListener: ue
    }, Ua = le.extend({
      // @method run(el: HTMLElement, newPos: Point, duration?: Number, easeLinearity?: Number)
      // Run an animation of a given element to a new position, optionally setting
      // duration in seconds (`0.25` by default) and easing linearity factor (3rd
      // argument of the [cubic bezier curve](https://cubic-bezier.com/#0,0,.5,1),
      // `0.5` by default).
      run: function(t, n, s, c) {
        this.stop(), this._el = t, this._inProgress = !0, this._duration = s || 0.25, this._easeOutPower = 1 / Math.max(c || 0.5, 0.2), this._startPos = Fi(t), this._offset = n.subtract(this._startPos), this._startTime = +/* @__PURE__ */ new Date(), this.fire("start"), this._animate();
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
        n && s._round(), ke(this._el, s), this.fire("step");
      },
      _complete: function() {
        me(this._animId), this._inProgress = !1, this.fire("end");
      },
      _easeOut: function(t) {
        return 1 - Math.pow(1 - t, this._easeOutPower);
      }
    }), ie = le.extend({
      options: {
        // @section Map State Options
        // @option crs: CRS = L.CRS.EPSG3857
        // The [Coordinate Reference System](#crs) to use. Don't change this if you're not
        // sure what it means.
        crs: ui,
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
        n = X(this, n), this._handlers = [], this._layers = {}, this._zoomBoundLayers = {}, this._sizeChanged = !0, this._initContainer(t), this._initLayout(), this._onResize = w(this._onResize, this), this._initEvents(), n.maxBounds && this.setMaxBounds(n.maxBounds), n.zoom !== void 0 && (this._zoom = this._limitZoom(n.zoom)), n.center && n.zoom !== void 0 && this.setView(Gt(n.center), n.zoom, { reset: !0 }), this.callInitHooks(), this._zoomAnimated = Mn && Rt.any3d && !Rt.mobileOpera && this.options.zoomAnimation, this._zoomAnimated && (this._createAnimProxy(), qt(this._proxy, Fa, this._catchTransitionEnd, this)), this._addLayers(this.options.layers);
      },
      // @section Methods for modifying map state
      // @method setView(center: LatLng, zoom: Number, options?: Zoom/pan options): this
      // Sets the view of the map (geographical center and zoom) with the given
      // animation options.
      setView: function(t, n, s) {
        if (n = n === void 0 ? this._zoom : this._limitZoom(n), t = this._limitCenter(Gt(t), n, this.options.maxBounds), s = s || {}, this._stop(), this._loaded && !s.reset && s !== !0) {
          s.animate !== void 0 && (s.zoom = k({ animate: s.animate }, s.zoom), s.pan = k({ animate: s.animate, duration: s.duration }, s.pan));
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
        return t = t || (Rt.any3d ? this.options.zoomDelta : 1), this.setZoom(this._zoom + t, n);
      },
      // @method zoomOut(delta?: Number, options?: Zoom options): this
      // Decreases the zoom of the map by `delta` ([`zoomDelta`](#map-zoomdelta) by default).
      zoomOut: function(t, n) {
        return t = t || (Rt.any3d ? this.options.zoomDelta : 1), this.setZoom(this._zoom - t, n);
      },
      // @method setZoomAround(latlng: LatLng, zoom: Number, options: Zoom options): this
      // Zooms the map while keeping a specified geographical point on the map
      // stationary (e.g. used internally for scroll zoom and double-click zoom).
      // @alternative
      // @method setZoomAround(offset: Point, zoom: Number, options: Zoom options): this
      // Zooms the map while keeping a specified pixel on the map (relative to the top-left corner) stationary.
      setZoomAround: function(t, n, s) {
        var c = this.getZoomScale(n), m = this.getSize().divideBy(2), E = t instanceof pt ? t : this.latLngToContainerPoint(t), $ = E.subtract(m).multiplyBy(1 - 1 / c), it = this.containerPointToLatLng(m.add($));
        return this.setView(it, n, { zoom: s });
      },
      _getBoundsCenterZoom: function(t, n) {
        n = n || {}, t = t.getBounds ? t.getBounds() : Qt(t);
        var s = mt(n.paddingTopLeft || n.padding || [0, 0]), c = mt(n.paddingBottomRight || n.padding || [0, 0]), m = this.getBoundsZoom(t, !1, s.add(c));
        if (m = typeof n.maxZoom == "number" ? Math.min(n.maxZoom, m) : m, m === 1 / 0)
          return {
            center: t.getCenter(),
            zoom: m
          };
        var E = c.subtract(s).divideBy(2), $ = this.project(t.getSouthWest(), m), it = this.project(t.getNorthEast(), m), st = this.unproject($.add(it).divideBy(2).add(E), m);
        return {
          center: st,
          zoom: m
        };
      },
      // @method fitBounds(bounds: LatLngBounds, options?: fitBounds options): this
      // Sets a map view that contains the given geographical bounds with the
      // maximum zoom level possible.
      fitBounds: function(t, n) {
        if (t = Qt(t), !t.isValid())
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
        if (t = mt(t).round(), n = n || {}, !t.x && !t.y)
          return this.fire("moveend");
        if (n.animate !== !0 && !this.getSize().contains(t))
          return this._resetView(this.unproject(this.project(this.getCenter()).add(t)), this.getZoom()), this;
        if (this._panAnim || (this._panAnim = new Ua(), this._panAnim.on({
          step: this._onPanTransitionStep,
          end: this._onPanTransitionEnd
        }, this)), n.noMoveStart || this.fire("movestart"), n.animate !== !1) {
          Wt(this._mapPane, "leaflet-pan-anim");
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
        if (s = s || {}, s.animate === !1 || !Rt.any3d)
          return this.setView(t, n, s);
        this._stop();
        var c = this.project(this.getCenter()), m = this.project(t), E = this.getSize(), $ = this._zoom;
        t = Gt(t), n = n === void 0 ? $ : n;
        var it = Math.max(E.x, E.y), st = it * this.getZoomScale($, n), yt = m.distanceTo(c) || 1, Pt = 1.42, $t = Pt * Pt;
        function te(ve) {
          var $e = ve ? -1 : 1, He = ve ? st : it, ms = st * st - it * it + $e * $t * $t * yt * yt, li = 2 * He * $t * yt, Ut = ms / li, fr = Math.sqrt(Ut * Ut + 1) - Ut, na = fr < 1e-9 ? -18 : Math.log(fr);
          return na;
        }
        function je(ve) {
          return (Math.exp(ve) - Math.exp(-ve)) / 2;
        }
        function Te(ve) {
          return (Math.exp(ve) + Math.exp(-ve)) / 2;
        }
        function ai(ve) {
          return je(ve) / Te(ve);
        }
        var qe = te(0);
        function $i(ve) {
          return it * (Te(qe) / Te(qe + Pt * ve));
        }
        function fs(ve) {
          return it * (Te(qe) * ai(qe + Pt * ve) - je(qe)) / $t;
        }
        function ia(ve) {
          return 1 - Math.pow(1 - ve, 1.5);
        }
        var bo = Date.now(), ps = (te(1) - qe) / Pt, xo = s.duration ? 1e3 * s.duration : 1e3 * ps * 0.8;
        function _s() {
          var ve = (Date.now() - bo) / xo, $e = ia(ve) * ps;
          ve <= 1 ? (this._flyToFrame = Kt(_s, this), this._move(
            this.unproject(c.add(m.subtract(c).multiplyBy(fs($e) / yt)), $),
            this.getScaleZoom(it / $i($e), $),
            { flyTo: !0 }
          )) : this._move(t, n)._moveEnd(!0);
        }
        return this._moveStart(!0, s.noMoveStart), _s.call(this), this;
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
        return t = Qt(t), this.listens("moveend", this._panInsideMaxBounds) && this.off("moveend", this._panInsideMaxBounds), t.isValid() ? (this.options.maxBounds = t, this._loaded && this._panInsideMaxBounds(), this.on("moveend", this._panInsideMaxBounds)) : (this.options.maxBounds = null, this);
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
        var s = this.getCenter(), c = this._limitCenter(s, this._zoom, Qt(t));
        return s.equals(c) || this.panTo(c, n), this._enforcingBounds = !1, this;
      },
      // @method panInside(latlng: LatLng, options?: padding options): this
      // Pans the map the minimum amount to make the `latlng` visible. Use
      // padding options to fit the display to more restricted bounds.
      // If `latlng` is already within the (optionally padded) display bounds,
      // the map will not be panned.
      panInside: function(t, n) {
        n = n || {};
        var s = mt(n.paddingTopLeft || n.padding || [0, 0]), c = mt(n.paddingBottomRight || n.padding || [0, 0]), m = this.project(this.getCenter()), E = this.project(t), $ = this.getPixelBounds(), it = It([$.min.add(s), $.max.subtract(c)]), st = it.getSize();
        if (!it.contains(E)) {
          this._enforcingBounds = !0;
          var yt = E.subtract(it.getCenter()), Pt = it.extend(E).getSize().subtract(st);
          m.x += yt.x < 0 ? -Pt.x : Pt.x, m.y += yt.y < 0 ? -Pt.y : Pt.y, this.panTo(this.unproject(m), n), this._enforcingBounds = !1;
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
        t = k({
          animate: !1,
          pan: !0
        }, t === !0 ? { animate: !0 } : t);
        var n = this.getSize();
        this._sizeChanged = !0, this._lastCenter = null;
        var s = this.getSize(), c = n.divideBy(2).round(), m = s.divideBy(2).round(), E = c.subtract(m);
        return !E.x && !E.y ? this : (t.animate && t.pan ? this.panBy(E) : (t.pan && this._rawPanBy(E), this.fire("move"), t.debounceMoveend ? (clearTimeout(this._sizeTimer), this._sizeTimer = setTimeout(w(this.fire, this, "moveend"), 200)) : this.fire("moveend")), this.fire("resize", {
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
        if (t = this._locateOptions = k({
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
          var n = t.coords.latitude, s = t.coords.longitude, c = new jt(n, s), m = c.toBounds(t.coords.accuracy * 2), E = this._locateOptions;
          if (E.setView) {
            var $ = this.getBoundsZoom(m);
            this.setView(c, E.maxZoom ? Math.min($, E.maxZoom) : $);
          }
          var it = {
            latlng: c,
            bounds: m,
            timestamp: t.timestamp
          };
          for (var st in t.coords)
            typeof t.coords[st] == "number" && (it[st] = t.coords[st]);
          this.fire("locationfound", it);
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
        this._locationWatchId !== void 0 && this.stopLocate(), this._stop(), ye(this._mapPane), this._clearControlPos && this._clearControlPos(), this._resizeRequest && (me(this._resizeRequest), this._resizeRequest = null), this._clearHandlers(), this._loaded && this.fire("unload");
        var t;
        for (t in this._layers)
          this._layers[t].remove();
        for (t in this._panes)
          ye(this._panes[t]);
        return this._layers = [], this._panes = [], delete this._mapPane, delete this._renderer, this;
      },
      // @section Other Methods
      // @method createPane(name: String, container?: HTMLElement): HTMLElement
      // Creates a new [map pane](#map-pane) with the given name if it doesn't exist already,
      // then returns it. The pane is created as a child of `container`, or
      // as a child of the main map pane if not set.
      createPane: function(t, n) {
        var s = "leaflet-pane" + (t ? " leaflet-" + t.replace("Pane", "") + "-pane" : ""), c = oe("div", s, n || this._mapPane);
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
        return new Tt(n, s);
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
        t = Qt(t), s = mt(s || [0, 0]);
        var c = this.getZoom() || 0, m = this.getMinZoom(), E = this.getMaxZoom(), $ = t.getNorthWest(), it = t.getSouthEast(), st = this.getSize().subtract(s), yt = It(this.project(it, c), this.project($, c)).getSize(), Pt = Rt.any3d ? this.options.zoomSnap : 1, $t = st.x / yt.x, te = st.y / yt.y, je = n ? Math.max($t, te) : Math.min($t, te);
        return c = this.getScaleZoom(je, c), Pt && (c = Math.round(c / (Pt / 100)) * (Pt / 100), c = n ? Math.ceil(c / Pt) * Pt : Math.floor(c / Pt) * Pt), Math.max(m, Math.min(E, c));
      },
      // @method getSize(): Point
      // Returns the current size of the map container (in pixels).
      getSize: function() {
        return (!this._size || this._sizeChanged) && (this._size = new pt(
          this._container.clientWidth || 0,
          this._container.clientHeight || 0
        ), this._sizeChanged = !1), this._size.clone();
      },
      // @method getPixelBounds(): Bounds
      // Returns the bounds of the current map view in projected pixel
      // coordinates (sometimes useful in layer and overlay implementations).
      getPixelBounds: function(t, n) {
        var s = this._getTopLeftPoint(t, n);
        return new _t(s, s.add(this.getSize()));
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
        return n = n === void 0 ? this._zoom : n, this.options.crs.latLngToPoint(Gt(t), n);
      },
      // @method unproject(point: Point, zoom: Number): LatLng
      // Inverse of [`project`](#map-project).
      unproject: function(t, n) {
        return n = n === void 0 ? this._zoom : n, this.options.crs.pointToLatLng(mt(t), n);
      },
      // @method layerPointToLatLng(point: Point): LatLng
      // Given a pixel coordinate relative to the [origin pixel](#map-getpixelorigin),
      // returns the corresponding geographical coordinate (for the current zoom level).
      layerPointToLatLng: function(t) {
        var n = mt(t).add(this.getPixelOrigin());
        return this.unproject(n);
      },
      // @method latLngToLayerPoint(latlng: LatLng): Point
      // Given a geographical coordinate, returns the corresponding pixel coordinate
      // relative to the [origin pixel](#map-getpixelorigin).
      latLngToLayerPoint: function(t) {
        var n = this.project(Gt(t))._round();
        return n._subtract(this.getPixelOrigin());
      },
      // @method wrapLatLng(latlng: LatLng): LatLng
      // Returns a `LatLng` where `lat` and `lng` has been wrapped according to the
      // map's CRS's `wrapLat` and `wrapLng` properties, if they are outside the
      // CRS's bounds.
      // By default this means longitude is wrapped around the dateline so its
      // value is between -180 and +180 degrees.
      wrapLatLng: function(t) {
        return this.options.crs.wrapLatLng(Gt(t));
      },
      // @method wrapLatLngBounds(bounds: LatLngBounds): LatLngBounds
      // Returns a `LatLngBounds` with the same size as the given one, ensuring that
      // its center is within the CRS's bounds.
      // By default this means the center longitude is wrapped around the dateline so its
      // value is between -180 and +180 degrees, and the majority of the bounds
      // overlaps the CRS's bounds.
      wrapLatLngBounds: function(t) {
        return this.options.crs.wrapLatLngBounds(Qt(t));
      },
      // @method distance(latlng1: LatLng, latlng2: LatLng): Number
      // Returns the distance between two geographical coordinates according to
      // the map's CRS. By default this measures distance in meters.
      distance: function(t, n) {
        return this.options.crs.distance(Gt(t), Gt(n));
      },
      // @method containerPointToLayerPoint(point: Point): Point
      // Given a pixel coordinate relative to the map container, returns the corresponding
      // pixel coordinate relative to the [origin pixel](#map-getpixelorigin).
      containerPointToLayerPoint: function(t) {
        return mt(t).subtract(this._getMapPanePos());
      },
      // @method layerPointToContainerPoint(point: Point): Point
      // Given a pixel coordinate relative to the [origin pixel](#map-getpixelorigin),
      // returns the corresponding pixel coordinate relative to the map container.
      layerPointToContainerPoint: function(t) {
        return mt(t).add(this._getMapPanePos());
      },
      // @method containerPointToLatLng(point: Point): LatLng
      // Given a pixel coordinate relative to the map container, returns
      // the corresponding geographical coordinate (for the current zoom level).
      containerPointToLatLng: function(t) {
        var n = this.containerPointToLayerPoint(mt(t));
        return this.layerPointToLatLng(n);
      },
      // @method latLngToContainerPoint(latlng: LatLng): Point
      // Given a geographical coordinate, returns the corresponding pixel coordinate
      // relative to the map container.
      latLngToContainerPoint: function(t) {
        return this.layerPointToContainerPoint(this.latLngToLayerPoint(Gt(t)));
      },
      // @method mouseEventToContainerPoint(ev: MouseEvent): Point
      // Given a MouseEvent object, returns the pixel coordinate relative to the
      // map container where the event took place.
      mouseEventToContainerPoint: function(t) {
        return Dn(t, this._container);
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
        var n = this._container = Ra(t);
        if (n) {
          if (n._leaflet_id)
            throw new Error("Map container is already initialized.");
        } else throw new Error("Map container not found.");
        qt(n, "scroll", this._onScroll, this), this._containerId = x(n);
      },
      _initLayout: function() {
        var t = this._container;
        this._fadeAnimated = this.options.fadeAnimation && Rt.any3d, Wt(t, "leaflet-container" + (Rt.touch ? " leaflet-touch" : "") + (Rt.retina ? " leaflet-retina" : "") + (Rt.ielt9 ? " leaflet-oldie" : "") + (Rt.safari ? " leaflet-safari" : "") + (this._fadeAnimated ? " leaflet-fade-anim" : ""));
        var n = Oi(t, "position");
        n !== "absolute" && n !== "relative" && n !== "fixed" && n !== "sticky" && (t.style.position = "relative"), this._initPanes(), this._initControlPos && this._initControlPos();
      },
      _initPanes: function() {
        var t = this._panes = {};
        this._paneRenderers = {}, this._mapPane = this.createPane("mapPane", this._container), ke(this._mapPane, new pt(0, 0)), this.createPane("tilePane"), this.createPane("overlayPane"), this.createPane("shadowPane"), this.createPane("markerPane"), this.createPane("tooltipPane"), this.createPane("popupPane"), this.options.markerZoomAnimation || (Wt(t.markerPane, "leaflet-zoom-hide"), Wt(t.shadowPane, "leaflet-zoom-hide"));
      },
      // private methods that modify map state
      // @section Map state change events
      _resetView: function(t, n, s) {
        ke(this._mapPane, new pt(0, 0));
        var c = !this._loaded;
        this._loaded = !0, n = this._limitZoom(n), this.fire("viewprereset");
        var m = this._zoom !== n;
        this._moveStart(m, s)._move(t, n)._moveEnd(m), this.fire("viewreset"), c && this.fire("load");
      },
      _moveStart: function(t, n) {
        return t && this.fire("zoomstart"), n || this.fire("movestart"), this;
      },
      _move: function(t, n, s, c) {
        n === void 0 && (n = this._zoom);
        var m = this._zoom !== n;
        return this._zoom = n, this._lastCenter = t, this._pixelOrigin = this._getNewPixelOrigin(t), c ? s && s.pinch && this.fire("zoom", s) : ((m || s && s.pinch) && this.fire("zoom", s), this.fire("move", s)), this;
      },
      _moveEnd: function(t) {
        return t && this.fire("zoomend"), this.fire("moveend");
      },
      _stop: function() {
        return me(this._flyToFrame), this._panAnim && this._panAnim.stop(), this;
      },
      _rawPanBy: function(t) {
        ke(this._mapPane, this._getMapPanePos().subtract(t));
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
        var n = t ? ue : qt;
        n(this._container, "click dblclick mousedown mouseup mouseover mouseout mousemove contextmenu keypress keydown keyup", this._handleDOMEvent, this), this.options.trackResize && n(window, "resize", this._onResize, this), Rt.any3d && this.options.transform3DLimit && (t ? this.off : this.on).call(this, "moveend", this._onMoveEnd);
      },
      _onResize: function() {
        me(this._resizeRequest), this._resizeRequest = Kt(
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
        for (var s = [], c, m = n === "mouseout" || n === "mouseover", E = t.target || t.srcElement, $ = !1; E; ) {
          if (c = this._targets[x(E)], c && (n === "click" || n === "preclick") && this._draggableMoved(c)) {
            $ = !0;
            break;
          }
          if (c && c.listens(n, !0) && (m && !er(E, t) || (s.push(c), m)) || E === this._container)
            break;
          E = E.parentNode;
        }
        return !s.length && !$ && !m && this.listens(n, !0) && (s = [this]), s;
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
          s === "mousedown" && Fr(n), this._fireDOMEvent(t, s);
        }
      },
      _mouseEvents: ["click", "dblclick", "mouseover", "mouseout", "contextmenu"],
      _fireDOMEvent: function(t, n, s) {
        if (t.type === "click") {
          var c = k({}, t);
          c.type = "preclick", this._fireDOMEvent(c, c.type, s);
        }
        var m = this._findEventTargets(t, n);
        if (s) {
          for (var E = [], $ = 0; $ < s.length; $++)
            s[$].listens(n, !0) && E.push(s[$]);
          m = E.concat(m);
        }
        if (m.length) {
          n === "contextmenu" && Ie(t);
          var it = m[0], st = {
            originalEvent: t
          };
          if (t.type !== "keypress" && t.type !== "keydown" && t.type !== "keyup") {
            var yt = it.getLatLng && (!it._radius || it._radius <= 10);
            st.containerPoint = yt ? this.latLngToContainerPoint(it.getLatLng()) : this.mouseEventToContainerPoint(t), st.layerPoint = this.containerPointToLayerPoint(st.containerPoint), st.latlng = yt ? it.getLatLng() : this.layerPointToLatLng(st.layerPoint);
          }
          for ($ = 0; $ < m.length; $++)
            if (m[$].fire(n, st, !0), st.originalEvent._stopped || m[$].options.bubblingMouseEvents === !1 && pe(this._mouseEvents, n) !== -1)
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
        return Fi(this._mapPane) || new pt(0, 0);
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
        return It([
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
        var c = this.project(t, n), m = this.getSize().divideBy(2), E = new _t(c.subtract(m), c.add(m)), $ = this._getBoundsOffset(E, s, n);
        return Math.abs($.x) <= 1 && Math.abs($.y) <= 1 ? t : this.unproject(c.add($), n);
      },
      // adjust offset for view to get inside bounds
      _limitOffset: function(t, n) {
        if (!n)
          return t;
        var s = this.getPixelBounds(), c = new _t(s.min.add(t), s.max.add(t));
        return t.add(this._getBoundsOffset(c, n));
      },
      // returns offset needed for pxBounds to get inside maxBounds at a specified zoom
      _getBoundsOffset: function(t, n, s) {
        var c = It(
          this.project(n.getNorthEast(), s),
          this.project(n.getSouthWest(), s)
        ), m = c.min.subtract(t.min), E = c.max.subtract(t.max), $ = this._rebound(m.x, -E.x), it = this._rebound(m.y, -E.y);
        return new pt($, it);
      },
      _rebound: function(t, n) {
        return t + n > 0 ? Math.round(t - n) / 2 : Math.max(0, Math.ceil(t)) - Math.max(0, Math.floor(n));
      },
      _limitZoom: function(t) {
        var n = this.getMinZoom(), s = this.getMaxZoom(), c = Rt.any3d ? this.options.zoomSnap : 1;
        return c && (t = Math.round(t / c) * c), Math.max(n, Math.min(s, t));
      },
      _onPanTransitionStep: function() {
        this.fire("move");
      },
      _onPanTransitionEnd: function() {
        Le(this._mapPane, "leaflet-pan-anim"), this.fire("moveend");
      },
      _tryAnimatedPan: function(t, n) {
        var s = this._getCenterOffset(t)._trunc();
        return (n && n.animate) !== !0 && !this.getSize().contains(s) ? !1 : (this.panBy(s, n), !0);
      },
      _createAnimProxy: function() {
        var t = this._proxy = oe("div", "leaflet-proxy leaflet-zoom-animated");
        this._panes.mapPane.appendChild(t), this.on("zoomanim", function(n) {
          var s = Pr, c = this._proxy.style[s];
          qi(this._proxy, this.project(n.center, n.zoom), this.getZoomScale(n.zoom, 1)), c === this._proxy.style[s] && this._animatingZoom && this._onZoomTransitionEnd();
        }, this), this.on("load moveend", this._animMoveEnd, this), this._on("unload", this._destroyAnimProxy, this);
      },
      _destroyAnimProxy: function() {
        ye(this._proxy), this.off("load moveend", this._animMoveEnd, this), delete this._proxy;
      },
      _animMoveEnd: function() {
        var t = this.getCenter(), n = this.getZoom();
        qi(this._proxy, this.project(t, n), this.getZoomScale(n, 1));
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
        var c = this.getZoomScale(n), m = this._getCenterOffset(t)._divideBy(1 - 1 / c);
        return s.animate !== !0 && !this.getSize().contains(m) ? !1 : (Kt(function() {
          this._moveStart(!0, s.noMoveStart || !1)._animateZoom(t, n, !0);
        }, this), !0);
      },
      _animateZoom: function(t, n, s, c) {
        this._mapPane && (s && (this._animatingZoom = !0, this._animateToCenter = t, this._animateToZoom = n, Wt(this._mapPane, "leaflet-zoom-anim")), this.fire("zoomanim", {
          center: t,
          zoom: n,
          noUpdate: c
        }), this._tempFireZoomEvent || (this._tempFireZoomEvent = this._zoom !== this._animateToZoom), this._move(this._animateToCenter, this._animateToZoom, void 0, !0), setTimeout(w(this._onZoomTransitionEnd, this), 250));
      },
      _onZoomTransitionEnd: function() {
        this._animatingZoom && (this._mapPane && Le(this._mapPane, "leaflet-zoom-anim"), this._animatingZoom = !1, this._move(this._animateToCenter, this._animateToZoom, void 0, !0), this._tempFireZoomEvent && this.fire("zoom"), delete this._tempFireZoomEvent, this.fire("move"), this._moveEnd(!0));
      }
    });
    function ir(t, n) {
      return new ie(t, n);
    }
    var oi = be.extend({
      // @section
      // @aka Control Options
      options: {
        // @option position: String = 'topright'
        // The position of the control (one of the map corners). Possible values are `'topleft'`,
        // `'topright'`, `'bottomleft'` or `'bottomright'`
        position: "topright"
      },
      initialize: function(t) {
        X(this, t);
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
        return Wt(n, "leaflet-control"), s.indexOf("bottom") !== -1 ? c.insertBefore(n, c.firstChild) : c.appendChild(n), this._map.on("unload", this.remove, this), this;
      },
      // @method remove: this
      // Removes the control from the map it is currently active on.
      remove: function() {
        return this._map ? (ye(this._container), this.onRemove && this.onRemove(this._map), this._map.off("unload", this.remove, this), this._map = null, this) : this;
      },
      _refocusOnMap: function(t) {
        this._map && t && t.screenX > 0 && t.screenY > 0 && this._map.getContainer().focus();
      }
    }), cn = function(t) {
      return new oi(t);
    };
    ie.include({
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
        var t = this._controlCorners = {}, n = "leaflet-", s = this._controlContainer = oe("div", n + "control-container", this._container);
        function c(m, E) {
          var $ = n + m + " " + n + E;
          t[m + E] = oe("div", $, s);
        }
        c("top", "left"), c("top", "right"), c("bottom", "left"), c("bottom", "right");
      },
      _clearControlPos: function() {
        for (var t in this._controlCorners)
          ye(this._controlCorners[t]);
        ye(this._controlContainer), delete this._controlCorners, delete this._controlContainer;
      }
    });
    var Va = oi.extend({
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
        X(this, s), this._layerControlInputs = [], this._layers = [], this._lastZIndex = 0, this._handlingClick = !1, this._preventClick = !1;
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
        return oi.prototype.addTo.call(this, t), this._expandIfNotCollapsed();
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
        Wt(this._container, "leaflet-control-layers-expanded"), this._section.style.height = null;
        var t = this._map.getSize().y - (this._container.offsetTop + 50);
        return t < this._section.clientHeight ? (Wt(this._section, "leaflet-control-layers-scrollbar"), this._section.style.height = t + "px") : Le(this._section, "leaflet-control-layers-scrollbar"), this._checkDisabledLayers(), this;
      },
      // @method collapse(): this
      // Collapse the control container if expanded.
      collapse: function() {
        return Le(this._container, "leaflet-control-layers-expanded"), this;
      },
      _initLayout: function() {
        var t = "leaflet-control-layers", n = this._container = oe("div", t), s = this.options.collapsed;
        n.setAttribute("aria-haspopup", !0), Tn(n), $r(n);
        var c = this._section = oe("section", t + "-list");
        s && (this._map.on("click", this.collapse, this), qt(n, {
          mouseenter: this._expandSafely,
          mouseleave: this.collapse
        }, this));
        var m = this._layersLink = oe("a", t + "-toggle", n);
        m.href = "#", m.title = "Layers", m.setAttribute("role", "button"), qt(m, {
          keydown: function(E) {
            E.keyCode === 13 && this._expandSafely();
          },
          // Certain screen readers intercept the key event and instead send a click event
          click: function(E) {
            Ie(E), this._expandSafely();
          }
        }, this), s || this.expand(), this._baseLayersList = oe("div", t + "-base", c), this._separator = oe("div", t + "-separator", c), this._overlaysList = oe("div", t + "-overlays", c), n.appendChild(c);
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
        }), this.options.sortLayers && this._layers.sort(w(function(c, m) {
          return this.options.sortFunction(c.layer, m.layer, c.name, m.name);
        }, this)), this.options.autoZIndex && t.setZIndex && (this._lastZIndex++, t.setZIndex(this._lastZIndex)), this._expandIfNotCollapsed();
      },
      _update: function() {
        if (!this._container)
          return this;
        Bn(this._baseLayersList), Bn(this._overlaysList), this._layerControlInputs = [];
        var t, n, s, c, m = 0;
        for (s = 0; s < this._layers.length; s++)
          c = this._layers[s], this._addItem(c), n = n || c.overlay, t = t || !c.overlay, m += c.overlay ? 0 : 1;
        return this.options.hideSingleBase && (t = t && m > 1, this._baseLayersList.style.display = t ? "" : "none"), this._separator.style.display = n && t ? "" : "none", this;
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
        t.overlay ? (c = document.createElement("input"), c.type = "checkbox", c.className = "leaflet-control-layers-selector", c.defaultChecked = s) : c = this._createRadioElement("leaflet-base-layers_" + x(this), s), this._layerControlInputs.push(c), c.layerId = x(t.layer), qt(c, "click", this._onInputClick, this);
        var m = document.createElement("span");
        m.innerHTML = " " + t.name;
        var E = document.createElement("span");
        n.appendChild(E), E.appendChild(c), E.appendChild(m);
        var $ = t.overlay ? this._overlaysList : this._baseLayersList;
        return $.appendChild(n), this._checkDisabledLayers(), n;
      },
      _onInputClick: function() {
        if (!this._preventClick) {
          var t = this._layerControlInputs, n, s, c = [], m = [];
          this._handlingClick = !0;
          for (var E = t.length - 1; E >= 0; E--)
            n = t[E], s = this._getLayer(n.layerId).layer, n.checked ? c.push(s) : n.checked || m.push(s);
          for (E = 0; E < m.length; E++)
            this._map.hasLayer(m[E]) && this._map.removeLayer(m[E]);
          for (E = 0; E < c.length; E++)
            this._map.hasLayer(c[E]) || this._map.addLayer(c[E]);
          this._handlingClick = !1, this._refocusOnMap();
        }
      },
      _checkDisabledLayers: function() {
        for (var t = this._layerControlInputs, n, s, c = this._map.getZoom(), m = t.length - 1; m >= 0; m--)
          n = t[m], s = this._getLayer(n.layerId).layer, n.disabled = s.options.minZoom !== void 0 && c < s.options.minZoom || s.options.maxZoom !== void 0 && c > s.options.maxZoom;
      },
      _expandIfNotCollapsed: function() {
        return this._map && !this.options.collapsed && this.expand(), this;
      },
      _expandSafely: function() {
        var t = this._section;
        this._preventClick = !0, qt(t, "click", Ie), this.expand();
        var n = this;
        setTimeout(function() {
          ue(t, "click", Ie), n._preventClick = !1;
        });
      }
    }), Ur = function(t, n, s) {
      return new Va(t, n, s);
    }, dn = oi.extend({
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
        var n = "leaflet-control-zoom", s = oe("div", n + " leaflet-bar"), c = this.options;
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
      _createButton: function(t, n, s, c, m) {
        var E = oe("a", s, c);
        return E.innerHTML = t, E.href = "#", E.title = n, E.setAttribute("role", "button"), E.setAttribute("aria-label", n), Tn(E), qt(E, "click", Ki), qt(E, "click", m, this), qt(E, "click", this._refocusOnMap, this), E;
      },
      _updateDisabled: function() {
        var t = this._map, n = "leaflet-disabled";
        Le(this._zoomInButton, n), Le(this._zoomOutButton, n), this._zoomInButton.setAttribute("aria-disabled", "false"), this._zoomOutButton.setAttribute("aria-disabled", "false"), (this._disabled || t._zoom === t.getMinZoom()) && (Wt(this._zoomOutButton, n), this._zoomOutButton.setAttribute("aria-disabled", "true")), (this._disabled || t._zoom === t.getMaxZoom()) && (Wt(this._zoomInButton, n), this._zoomInButton.setAttribute("aria-disabled", "true"));
      }
    });
    ie.mergeOptions({
      zoomControl: !0
    }), ie.addInitHook(function() {
      this.options.zoomControl && (this.zoomControl = new dn(), this.addControl(this.zoomControl));
    });
    var io = function(t) {
      return new dn(t);
    }, wi = oi.extend({
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
        var n = "leaflet-control-scale", s = oe("div", n), c = this.options;
        return this._addScales(c, n + "-line", s), t.on(c.updateWhenIdle ? "moveend" : "move", this._update, this), t.whenReady(this._update, this), s;
      },
      onRemove: function(t) {
        t.off(this.options.updateWhenIdle ? "moveend" : "move", this._update, this);
      },
      _addScales: function(t, n, s) {
        t.metric && (this._mScale = oe("div", n, s)), t.imperial && (this._iScale = oe("div", n, s));
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
        var n = t * 3.2808399, s, c, m;
        n > 5280 ? (s = n / 5280, c = this._getRoundNum(s), this._updateScale(this._iScale, c + " mi", c / s)) : (m = this._getRoundNum(n), this._updateScale(this._iScale, m + " ft", m / n));
      },
      _updateScale: function(t, n, s) {
        t.style.width = Math.round(this.options.maxWidth * s) + "px", t.innerHTML = n;
      },
      _getRoundNum: function(t) {
        var n = Math.pow(10, (Math.floor(t) + "").length - 1), s = t / n;
        return s = s >= 10 ? 10 : s >= 5 ? 5 : s >= 3 ? 3 : s >= 2 ? 2 : 1, n * s;
      }
    }), Ga = function(t) {
      return new wi(t);
    }, fn = '<svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="12" height="8" viewBox="0 0 12 8" class="leaflet-attribution-flag"><path fill="#4C7BE1" d="M0 0h12v4H0z"/><path fill="#FFD500" d="M0 4h12v3H0z"/><path fill="#E0BC00" d="M0 7h12v1H0z"/></svg>', Vr = oi.extend({
      // @section
      // @aka Control.Attribution options
      options: {
        position: "bottomright",
        // @option prefix: String|false = 'Leaflet'
        // The HTML text shown before the attributions. Pass `false` to disable.
        prefix: '<a href="https://leafletjs.com" title="A JavaScript library for interactive maps">' + (Rt.inlineSvg ? fn + " " : "") + "Leaflet</a>"
      },
      initialize: function(t) {
        X(this, t), this._attributions = {};
      },
      onAdd: function(t) {
        t.attributionControl = this, this._container = oe("div", "leaflet-control-attribution"), Tn(this._container);
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
    ie.mergeOptions({
      attributionControl: !0
    }), ie.addInitHook(function() {
      this.options.attributionControl && new Vr().addTo(this);
    });
    var no = function(t) {
      return new Vr(t);
    };
    oi.Layers = Va, oi.Zoom = dn, oi.Scale = wi, oi.Attribution = Vr, cn.layers = Ur, cn.zoom = io, cn.scale = Ga, cn.attribution = no;
    var di = be.extend({
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
    di.addTo = function(t, n) {
      return t.addHandler(n, this), this;
    };
    var ro = { Events: zt }, Za = Rt.touch ? "touchstart mousedown" : "mousedown", Ri = le.extend({
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
        X(this, c), this._element = t, this._dragStartTarget = n || t, this._preventOutline = s;
      },
      // @method enable()
      // Enables the dragging ability
      enable: function() {
        this._enabled || (qt(this._dragStartTarget, Za, this._onDown, this), this._enabled = !0);
      },
      // @method disable()
      // Disables the dragging ability
      disable: function() {
        this._enabled && (Ri._dragging === this && this.finishDrag(!0), ue(this._dragStartTarget, Za, this._onDown, this), this._enabled = !1, this._moved = !1);
      },
      _onDown: function(t) {
        if (this._enabled && (this._moved = !1, !Sr(this._element, "leaflet-zoom-anim"))) {
          if (t.touches && t.touches.length !== 1) {
            Ri._dragging === this && this.finishDrag();
            return;
          }
          if (!(Ri._dragging || t.shiftKey || t.which !== 1 && t.button !== 1 && !t.touches) && (Ri._dragging = this, this._preventOutline && Fr(this._element), Dr(), Pn(), !this._moving)) {
            this.fire("down");
            var n = t.touches ? t.touches[0] : t, s = Na(this._element);
            this._startPoint = new pt(n.clientX, n.clientY), this._startPos = Fi(this._element), this._parentScale = Rr(s);
            var c = t.type === "mousedown";
            qt(document, c ? "mousemove" : "touchmove", this._onMove, this), qt(document, c ? "mouseup" : "touchend touchcancel", this._onUp, this);
          }
        }
      },
      _onMove: function(t) {
        if (this._enabled) {
          if (t.touches && t.touches.length > 1) {
            this._moved = !0;
            return;
          }
          var n = t.touches && t.touches.length === 1 ? t.touches[0] : t, s = new pt(n.clientX, n.clientY)._subtract(this._startPoint);
          !s.x && !s.y || Math.abs(s.x) + Math.abs(s.y) < this.options.clickTolerance || (s.x /= this._parentScale.x, s.y /= this._parentScale.y, Ie(t), this._moved || (this.fire("dragstart"), this._moved = !0, Wt(document.body, "leaflet-dragging"), this._lastTarget = t.target || t.srcElement, window.SVGElementInstance && this._lastTarget instanceof window.SVGElementInstance && (this._lastTarget = this._lastTarget.correspondingUseElement), Wt(this._lastTarget, "leaflet-drag-target")), this._newPos = this._startPos.add(s), this._moving = !0, this._lastEvent = t, this._updatePosition());
        }
      },
      _updatePosition: function() {
        var t = { originalEvent: this._lastEvent };
        this.fire("predrag", t), ke(this._element, this._newPos), this.fire("drag", t);
      },
      _onUp: function() {
        this._enabled && this.finishDrag();
      },
      finishDrag: function(t) {
        Le(document.body, "leaflet-dragging"), this._lastTarget && (Le(this._lastTarget, "leaflet-drag-target"), this._lastTarget = null), ue(document, "mousemove touchmove", this._onMove, this), ue(document, "mouseup touchend touchcancel", this._onUp, this), Ir(), Sn();
        var n = this._moved && this._moving;
        this._moving = !1, Ri._dragging = !1, n && this.fire("dragend", {
          noInertia: t,
          distance: this._newPos.distanceTo(this._startPos)
        });
      }
    });
    function qa(t, n, s) {
      var c, m = [1, 4, 2, 8], E, $, it, st, yt, Pt, $t, te;
      for (E = 0, Pt = t.length; E < Pt; E++)
        t[E]._code = Ni(t[E], n);
      for (it = 0; it < 4; it++) {
        for ($t = m[it], c = [], E = 0, Pt = t.length, $ = Pt - 1; E < Pt; $ = E++)
          st = t[E], yt = t[$], st._code & $t ? yt._code & $t || (te = nr(yt, st, $t, n, s), te._code = Ni(te, n), c.push(te)) : (yt._code & $t && (te = nr(yt, st, $t, n, s), te._code = Ni(te, n), c.push(te)), c.push(st));
        t = c;
      }
      return t;
    }
    function Ha(t, n) {
      var s, c, m, E, $, it, st, yt, Pt;
      if (!t || t.length === 0)
        throw new Error("latlngs not passed");
      ii(t) || (console.warn("latlngs are not flat! Only the first ring will be used"), t = t[0]);
      var $t = Gt([0, 0]), te = Qt(t), je = te.getNorthWest().distanceTo(te.getSouthWest()) * te.getNorthEast().distanceTo(te.getNorthWest());
      je < 1700 && ($t = Gr(t));
      var Te = t.length, ai = [];
      for (s = 0; s < Te; s++) {
        var qe = Gt(t[s]);
        ai.push(n.project(Gt([qe.lat - $t.lat, qe.lng - $t.lng])));
      }
      for (it = st = yt = 0, s = 0, c = Te - 1; s < Te; c = s++)
        m = ai[s], E = ai[c], $ = m.y * E.x - E.y * m.x, st += (m.x + E.x) * $, yt += (m.y + E.y) * $, it += $ * 3;
      it === 0 ? Pt = ai[0] : Pt = [st / it, yt / it];
      var $i = n.unproject(mt(Pt));
      return Gt([$i.lat + $t.lat, $i.lng + $t.lng]);
    }
    function Gr(t) {
      for (var n = 0, s = 0, c = 0, m = 0; m < t.length; m++) {
        var E = Gt(t[m]);
        n += E.lat, s += E.lng, c++;
      }
      return Gt([n / c, s / c]);
    }
    var Ka = {
      __proto__: null,
      clipPolygon: qa,
      polygonCenter: Ha,
      centroid: Gr
    };
    function Wa(t, n) {
      if (!n || !t.length)
        return t.slice();
      var s = n * n;
      return t = pn(t, s), t = ao(t, s), t;
    }
    function Ae(t, n, s) {
      return Math.sqrt(mn(t, n, s, !0));
    }
    function Xe(t, n, s) {
      return mn(t, n, s);
    }
    function ao(t, n) {
      var s = t.length, c = typeof Uint8Array < "u" ? Uint8Array : Array, m = new c(s);
      m[0] = m[s - 1] = 1, fi(t, m, n, 0, s - 1);
      var E, $ = [];
      for (E = 0; E < s; E++)
        m[E] && $.push(t[E]);
      return $;
    }
    function fi(t, n, s, c, m) {
      var E = 0, $, it, st;
      for (it = c + 1; it <= m - 1; it++)
        st = mn(t[it], t[c], t[m], !0), st > E && ($ = it, E = st);
      E > s && (n[$] = 1, fi(t, n, s, c, $), fi(t, n, s, $, m));
    }
    function pn(t, n) {
      for (var s = [t[0]], c = 1, m = 0, E = t.length; c < E; c++)
        _n(t[c], t[m]) > n && (s.push(t[c]), m = c);
      return m < E - 1 && s.push(t[E - 1]), s;
    }
    var In;
    function ei(t, n, s, c, m) {
      var E = c ? In : Ni(t, s), $ = Ni(n, s), it, st, yt;
      for (In = $; ; ) {
        if (!(E | $))
          return [t, n];
        if (E & $)
          return !1;
        it = E || $, st = nr(t, n, it, s, m), yt = Ni(st, s), it === E ? (t = st, E = yt) : (n = st, $ = yt);
      }
    }
    function nr(t, n, s, c, m) {
      var E = n.x - t.x, $ = n.y - t.y, it = c.min, st = c.max, yt, Pt;
      return s & 8 ? (yt = t.x + E * (st.y - t.y) / $, Pt = st.y) : s & 4 ? (yt = t.x + E * (it.y - t.y) / $, Pt = it.y) : s & 2 ? (yt = st.x, Pt = t.y + $ * (st.x - t.x) / E) : s & 1 && (yt = it.x, Pt = t.y + $ * (it.x - t.x) / E), new pt(yt, Pt, m);
    }
    function Ni(t, n) {
      var s = 0;
      return t.x < n.min.x ? s |= 1 : t.x > n.max.x && (s |= 2), t.y < n.min.y ? s |= 4 : t.y > n.max.y && (s |= 8), s;
    }
    function _n(t, n) {
      var s = n.x - t.x, c = n.y - t.y;
      return s * s + c * c;
    }
    function mn(t, n, s, c) {
      var m = n.x, E = n.y, $ = s.x - m, it = s.y - E, st = $ * $ + it * it, yt;
      return st > 0 && (yt = ((t.x - m) * $ + (t.y - E) * it) / st, yt > 1 ? (m = s.x, E = s.y) : yt > 0 && (m += $ * yt, E += it * yt)), $ = t.x - m, it = t.y - E, c ? $ * $ + it * it : new pt(m, E);
    }
    function ii(t) {
      return !At(t[0]) || typeof t[0][0] != "object" && typeof t[0][0] < "u";
    }
    function Ja(t) {
      return console.warn("Deprecated use of _flat, please use L.LineUtil.isFlat instead."), ii(t);
    }
    function Xa(t, n) {
      var s, c, m, E, $, it, st, yt;
      if (!t || t.length === 0)
        throw new Error("latlngs not passed");
      ii(t) || (console.warn("latlngs are not flat! Only the first ring will be used"), t = t[0]);
      var Pt = Gt([0, 0]), $t = Qt(t), te = $t.getNorthWest().distanceTo($t.getSouthWest()) * $t.getNorthEast().distanceTo($t.getNorthWest());
      te < 1700 && (Pt = Gr(t));
      var je = t.length, Te = [];
      for (s = 0; s < je; s++) {
        var ai = Gt(t[s]);
        Te.push(n.project(Gt([ai.lat - Pt.lat, ai.lng - Pt.lng])));
      }
      for (s = 0, c = 0; s < je - 1; s++)
        c += Te[s].distanceTo(Te[s + 1]) / 2;
      if (c === 0)
        yt = Te[0];
      else
        for (s = 0, E = 0; s < je - 1; s++)
          if ($ = Te[s], it = Te[s + 1], m = $.distanceTo(it), E += m, E > c) {
            st = (E - c) / m, yt = [
              it.x - st * (it.x - $.x),
              it.y - st * (it.y - $.y)
            ];
            break;
          }
      var qe = n.unproject(mt(yt));
      return Gt([qe.lat + Pt.lat, qe.lng + Pt.lng]);
    }
    var rr = {
      __proto__: null,
      simplify: Wa,
      pointToSegmentDistance: Ae,
      closestPointOnSegment: Xe,
      clipSegment: ei,
      _getEdgeIntersection: nr,
      _getBitCode: Ni,
      _sqClosestPointOnSegment: mn,
      isFlat: ii,
      _flat: Ja,
      polylineCenter: Xa
    }, ar = {
      project: function(t) {
        return new pt(t.lng, t.lat);
      },
      unproject: function(t) {
        return new jt(t.y, t.x);
      },
      bounds: new _t([-180, -90], [180, 90])
    }, Zr = {
      R: 6378137,
      R_MINOR: 6356752314245179e-9,
      bounds: new _t([-2003750834279e-5, -1549657073972e-5], [2003750834279e-5, 1876465623138e-5]),
      project: function(t) {
        var n = Math.PI / 180, s = this.R, c = t.lat * n, m = this.R_MINOR / s, E = Math.sqrt(1 - m * m), $ = E * Math.sin(c), it = Math.tan(Math.PI / 4 - c / 2) / Math.pow((1 - $) / (1 + $), E / 2);
        return c = -s * Math.log(Math.max(it, 1e-10)), new pt(t.lng * n * s, c);
      },
      unproject: function(t) {
        for (var n = 180 / Math.PI, s = this.R, c = this.R_MINOR / s, m = Math.sqrt(1 - c * c), E = Math.exp(-t.y / s), $ = Math.PI / 2 - 2 * Math.atan(E), it = 0, st = 0.1, yt; it < 15 && Math.abs(st) > 1e-7; it++)
          yt = m * Math.sin($), yt = Math.pow((1 - yt) / (1 + yt), m / 2), st = Math.PI / 2 - 2 * Math.atan(E * yt) - $, $ += st;
        return new jt($ * n, t.x * n / s);
      }
    }, Ya = {
      __proto__: null,
      LonLat: ar,
      Mercator: Zr,
      SphericalMercator: sn
    }, so = k({}, xe, {
      code: "EPSG:3395",
      projection: Zr,
      transformation: function() {
        var t = 0.5 / (Math.PI * Zr.R);
        return Si(t, 0.5, -t, 0.5);
      }()
    }), qr = k({}, xe, {
      code: "EPSG:4326",
      projection: ar,
      transformation: Si(1 / 180, 1, -1 / 180, 0.5)
    }), oo = k({}, Ce, {
      projection: ar,
      transformation: Si(1, 0, -1, 0),
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
    Ce.Earth = xe, Ce.EPSG3395 = so, Ce.EPSG3857 = ui, Ce.EPSG900913 = Ai, Ce.EPSG4326 = qr, Ce.Simple = oo;
    var Ze = le.extend({
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
    ie.include({
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
        t = t ? At(t) ? t : [t] : [];
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
          var m = this._zoomBoundLayers[c].options;
          t = m.minZoom === void 0 ? t : Math.min(t, m.minZoom), n = m.maxZoom === void 0 ? n : Math.max(n, m.maxZoom);
        }
        this._layersMaxZoom = n === -1 / 0 ? void 0 : n, this._layersMinZoom = t === 1 / 0 ? void 0 : t, s !== this._getZoomSpan() && this.fire("zoomlevelschange"), this.options.maxZoom === void 0 && this._layersMaxZoom && this.getZoom() > this._layersMaxZoom && this.setZoom(this._layersMaxZoom), this.options.minZoom === void 0 && this._layersMinZoom && this.getZoom() < this._layersMinZoom && this.setZoom(this._layersMinZoom);
      }
    });
    var Ci = Ze.extend({
      initialize: function(t, n) {
        X(this, n), this._layers = {};
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
    }), sr = function(t, n) {
      return new Ci(t, n);
    }, pi = Ci.extend({
      addLayer: function(t) {
        return this.hasLayer(t) ? this : (t.addEventParent(this), Ci.prototype.addLayer.call(this, t), this.fire("layeradd", { layer: t }));
      },
      removeLayer: function(t) {
        return this.hasLayer(t) ? (t in this._layers && (t = this._layers[t]), t.removeEventParent(this), Ci.prototype.removeLayer.call(this, t), this.fire("layerremove", { layer: t })) : this;
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
        var t = new Tt();
        for (var n in this._layers) {
          var s = this._layers[n];
          t.extend(s.getBounds ? s.getBounds() : s.getLatLng());
        }
        return t;
      }
    }), lo = function(t, n) {
      return new pi(t, n);
    }, gn = be.extend({
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
        X(this, t);
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
        var m = mt(c), E = mt(n === "shadow" && s.shadowAnchor || s.iconAnchor || m && m.divideBy(2, !0));
        t.className = "leaflet-marker-" + n + " " + (s.className || ""), E && (t.style.marginLeft = -E.x + "px", t.style.marginTop = -E.y + "px"), m && (t.style.width = m.x + "px", t.style.height = m.y + "px");
      },
      _createImg: function(t, n) {
        return n = n || document.createElement("img"), n.src = t, n;
      },
      _getIconUrl: function(t) {
        return Rt.retina && this.options[t + "RetinaUrl"] || this.options[t + "Url"];
      }
    });
    function uo(t) {
      return new gn(t);
    }
    var On = gn.extend({
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
        return typeof On.imagePath != "string" && (On.imagePath = this._detectIconPath()), (this.options.imagePath || On.imagePath) + gn.prototype._getIconUrl.call(this, t);
      },
      _stripUrl: function(t) {
        var n = function(s, c, m) {
          var E = c.exec(s);
          return E && E[m];
        };
        return t = n(t, /^url\((['"])?(.+)\1\)$/, 2), t && n(t, /^(.*)marker-icon\.png$/, 1);
      },
      _detectIconPath: function() {
        var t = oe("div", "leaflet-default-icon-path", document.body), n = Oi(t, "background-image") || Oi(t, "backgroundImage");
        if (document.body.removeChild(t), n = this._stripUrl(n), n)
          return n;
        var s = document.querySelector('link[href$="leaflet.css"]');
        return s ? s.href.substring(0, s.href.length - 11 - 1) : "";
      }
    }), Qa = di.extend({
      initialize: function(t) {
        this._marker = t;
      },
      addHooks: function() {
        var t = this._marker._icon;
        this._draggable || (this._draggable = new Ri(t, t, !0)), this._draggable.on({
          dragstart: this._onDragStart,
          predrag: this._onPreDrag,
          drag: this._onDrag,
          dragend: this._onDragEnd
        }, this).enable(), Wt(t, "leaflet-marker-draggable");
      },
      removeHooks: function() {
        this._draggable.off({
          dragstart: this._onDragStart,
          predrag: this._onPreDrag,
          drag: this._onDrag,
          dragend: this._onDragEnd
        }, this).disable(), this._marker._icon && Le(this._marker._icon, "leaflet-marker-draggable");
      },
      moved: function() {
        return this._draggable && this._draggable._moved;
      },
      _adjustPan: function(t) {
        var n = this._marker, s = n._map, c = this._marker.options.autoPanSpeed, m = this._marker.options.autoPanPadding, E = Fi(n._icon), $ = s.getPixelBounds(), it = s.getPixelOrigin(), st = It(
          $.min._subtract(it).add(m),
          $.max._subtract(it).subtract(m)
        );
        if (!st.contains(E)) {
          var yt = mt(
            (Math.max(st.max.x, E.x) - st.max.x) / ($.max.x - st.max.x) - (Math.min(st.min.x, E.x) - st.min.x) / ($.min.x - st.min.x),
            (Math.max(st.max.y, E.y) - st.max.y) / ($.max.y - st.max.y) - (Math.min(st.min.y, E.y) - st.min.y) / ($.min.y - st.min.y)
          ).multiplyBy(c);
          s.panBy(yt, { animate: !1 }), this._draggable._newPos._add(yt), this._draggable._startPos._add(yt), ke(n._icon, this._draggable._newPos), this._onDrag(t), this._panRequest = Kt(this._adjustPan.bind(this, t));
        }
      },
      _onDragStart: function() {
        this._oldLatLng = this._marker.getLatLng(), this._marker.closePopup && this._marker.closePopup(), this._marker.fire("movestart").fire("dragstart");
      },
      _onPreDrag: function(t) {
        this._marker.options.autoPan && (me(this._panRequest), this._panRequest = Kt(this._adjustPan.bind(this, t)));
      },
      _onDrag: function(t) {
        var n = this._marker, s = n._shadow, c = Fi(n._icon), m = n._map.layerPointToLatLng(c);
        s && ke(s, c), n._latlng = m, t.latlng = m, t.oldLatLng = this._oldLatLng, n.fire("move", t).fire("drag", t);
      },
      _onDragEnd: function(t) {
        me(this._panRequest), delete this._oldLatLng, this._marker.fire("moveend").fire("dragend", t);
      }
    }), or = Ze.extend({
      // @section
      // @aka Marker options
      options: {
        // @option icon: Icon = *
        // Icon instance to use for rendering the marker.
        // See [Icon documentation](#L.Icon) for details on how to customize the marker icon.
        // If not specified, a common instance of `L.Icon.Default` is used.
        icon: new On(),
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
        X(this, n), this._latlng = Gt(t);
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
        return this._latlng = Gt(t), this.update(), this.fire("move", { oldLatLng: n, latlng: this._latlng });
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
        s !== this._icon && (this._icon && this._removeIcon(), c = !0, t.title && (s.title = t.title), s.tagName === "IMG" && (s.alt = t.alt || "")), Wt(s, n), t.keyboard && (s.tabIndex = "0", s.setAttribute("role", "button")), this._icon = s, t.riseOnHover && this.on({
          mouseover: this._bringToFront,
          mouseout: this._resetZIndex
        }), this.options.autoPanOnFocus && qt(s, "focus", this._panOnFocus, this);
        var m = t.icon.createShadow(this._shadow), E = !1;
        m !== this._shadow && (this._removeShadow(), E = !0), m && (Wt(m, n), m.alt = ""), this._shadow = m, t.opacity < 1 && this._updateOpacity(), c && this.getPane().appendChild(this._icon), this._initInteraction(), m && E && this.getPane(t.shadowPane).appendChild(this._shadow);
      },
      _removeIcon: function() {
        this.options.riseOnHover && this.off({
          mouseover: this._bringToFront,
          mouseout: this._resetZIndex
        }), this.options.autoPanOnFocus && ue(this._icon, "focus", this._panOnFocus, this), ye(this._icon), this.removeInteractiveTarget(this._icon), this._icon = null;
      },
      _removeShadow: function() {
        this._shadow && ye(this._shadow), this._shadow = null;
      },
      _setPos: function(t) {
        this._icon && ke(this._icon, t), this._shadow && ke(this._shadow, t), this._zIndex = t.y + this.options.zIndexOffset, this._resetZIndex();
      },
      _updateZIndex: function(t) {
        this._icon && (this._icon.style.zIndex = this._zIndex + t);
      },
      _animateZoom: function(t) {
        var n = this._map._latLngToNewLayerPoint(this._latlng, t.zoom, t.center).round();
        this._setPos(n);
      },
      _initInteraction: function() {
        if (this.options.interactive && (Wt(this._icon, "leaflet-interactive"), this.addInteractiveTarget(this._icon), Qa)) {
          var t = this.options.draggable;
          this.dragging && (t = this.dragging.enabled(), this.dragging.disable()), this.dragging = new Qa(this), t && this.dragging.enable();
        }
      },
      // @method setOpacity(opacity: Number): this
      // Changes the opacity of the marker.
      setOpacity: function(t) {
        return this.options.opacity = t, this._map && this._updateOpacity(), this;
      },
      _updateOpacity: function() {
        var t = this.options.opacity;
        this._icon && ti(this._icon, t), this._shadow && ti(this._shadow, t);
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
          var n = this.options.icon.options, s = n.iconSize ? mt(n.iconSize) : mt(0, 0), c = n.iconAnchor ? mt(n.iconAnchor) : mt(0, 0);
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
    function ts(t, n) {
      return new or(t, n);
    }
    var ni = Ze.extend({
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
        return X(this, t), this._renderer && (this._renderer._updateStyle(this), this.options.stroke && t && Object.prototype.hasOwnProperty.call(t, "weight") && this._updateBounds()), this;
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
    }), lr = ni.extend({
      // @section
      // @aka CircleMarker options
      options: {
        fill: !0,
        // @option radius: Number = 10
        // Radius of the circle marker, in pixels
        radius: 10
      },
      initialize: function(t, n) {
        X(this, n), this._latlng = Gt(t), this._radius = this.options.radius;
      },
      // @method setLatLng(latLng: LatLng): this
      // Sets the position of a circle marker to a new location.
      setLatLng: function(t) {
        var n = this._latlng;
        return this._latlng = Gt(t), this.redraw(), this.fire("move", { oldLatLng: n, latlng: this._latlng });
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
        return ni.prototype.setStyle.call(this, t), this.setRadius(n), this;
      },
      _project: function() {
        this._point = this._map.latLngToLayerPoint(this._latlng), this._updateBounds();
      },
      _updateBounds: function() {
        var t = this._radius, n = this._radiusY || t, s = this._clickTolerance(), c = [t + s, n + s];
        this._pxBounds = new _t(this._point.subtract(c), this._point.add(c));
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
    function Hr(t, n) {
      return new lr(t, n);
    }
    var yn = lr.extend({
      initialize: function(t, n, s) {
        if (typeof n == "number" && (n = k({}, s, { radius: n })), X(this, n), this._latlng = Gt(t), isNaN(this.options.radius))
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
        return new Tt(
          this._map.layerPointToLatLng(this._point.subtract(t)),
          this._map.layerPointToLatLng(this._point.add(t))
        );
      },
      setStyle: ni.prototype.setStyle,
      _project: function() {
        var t = this._latlng.lng, n = this._latlng.lat, s = this._map, c = s.options.crs;
        if (c.distance === xe.distance) {
          var m = Math.PI / 180, E = this._mRadius / xe.R / m, $ = s.project([n + E, t]), it = s.project([n - E, t]), st = $.add(it).divideBy(2), yt = s.unproject(st).lat, Pt = Math.acos((Math.cos(E * m) - Math.sin(n * m) * Math.sin(yt * m)) / (Math.cos(n * m) * Math.cos(yt * m))) / m;
          (isNaN(Pt) || Pt === 0) && (Pt = E / Math.cos(Math.PI / 180 * n)), this._point = st.subtract(s.getPixelOrigin()), this._radius = isNaN(Pt) ? 0 : st.x - s.project([yt, t - Pt]).x, this._radiusY = st.y - $.y;
        } else {
          var $t = c.unproject(c.project(this._latlng).subtract([this._mRadius, 0]));
          this._point = s.latLngToLayerPoint(this._latlng), this._radius = this._point.x - s.latLngToLayerPoint($t).x;
        }
        this._updateBounds();
      }
    });
    function ho(t, n, s) {
      return new yn(t, n, s);
    }
    var ki = ni.extend({
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
        X(this, n), this._setLatLngs(t);
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
        for (var n = 1 / 0, s = null, c = mn, m, E, $ = 0, it = this._parts.length; $ < it; $++)
          for (var st = this._parts[$], yt = 1, Pt = st.length; yt < Pt; yt++) {
            m = st[yt - 1], E = st[yt];
            var $t = c(t, m, E, !0);
            $t < n && (n = $t, s = c(t, m, E));
          }
        return s && (s.distance = Math.sqrt(n)), s;
      },
      // @method getCenter(): LatLng
      // Returns the center ([centroid](https://en.wikipedia.org/wiki/Centroid)) of the polyline.
      getCenter: function() {
        if (!this._map)
          throw new Error("Must add layer to map before using getCenter()");
        return Xa(this._defaultShape(), this._map.options.crs);
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
        return n = n || this._defaultShape(), t = Gt(t), n.push(t), this._bounds.extend(t), this.redraw();
      },
      _setLatLngs: function(t) {
        this._bounds = new Tt(), this._latlngs = this._convertLatLngs(t);
      },
      _defaultShape: function() {
        return ii(this._latlngs) ? this._latlngs : this._latlngs[0];
      },
      // recursively convert latlngs input into actual LatLng instances; calculate bounds along the way
      _convertLatLngs: function(t) {
        for (var n = [], s = ii(t), c = 0, m = t.length; c < m; c++)
          s ? (n[c] = Gt(t[c]), this._bounds.extend(n[c])) : n[c] = this._convertLatLngs(t[c]);
        return n;
      },
      _project: function() {
        var t = new _t();
        this._rings = [], this._projectLatlngs(this._latlngs, this._rings, t), this._bounds.isValid() && t.isValid() && (this._rawPxBounds = t, this._updateBounds());
      },
      _updateBounds: function() {
        var t = this._clickTolerance(), n = new pt(t, t);
        this._rawPxBounds && (this._pxBounds = new _t([
          this._rawPxBounds.min.subtract(n),
          this._rawPxBounds.max.add(n)
        ]));
      },
      // recursively turns latlngs into a set of rings with projected coordinates
      _projectLatlngs: function(t, n, s) {
        var c = t[0] instanceof jt, m = t.length, E, $;
        if (c) {
          for ($ = [], E = 0; E < m; E++)
            $[E] = this._map.latLngToLayerPoint(t[E]), s.extend($[E]);
          n.push($);
        } else
          for (E = 0; E < m; E++)
            this._projectLatlngs(t[E], n, s);
      },
      // clip polyline by renderer bounds so that we have less to render for performance
      _clipPoints: function() {
        var t = this._renderer._bounds;
        if (this._parts = [], !(!this._pxBounds || !this._pxBounds.intersects(t))) {
          if (this.options.noClip) {
            this._parts = this._rings;
            return;
          }
          var n = this._parts, s, c, m, E, $, it, st;
          for (s = 0, m = 0, E = this._rings.length; s < E; s++)
            for (st = this._rings[s], c = 0, $ = st.length; c < $ - 1; c++)
              it = ei(st[c], st[c + 1], t, c, !0), it && (n[m] = n[m] || [], n[m].push(it[0]), (it[1] !== st[c + 1] || c === $ - 2) && (n[m].push(it[1]), m++));
        }
      },
      // simplify each clipped part of the polyline for performance
      _simplifyPoints: function() {
        for (var t = this._parts, n = this.options.smoothFactor, s = 0, c = t.length; s < c; s++)
          t[s] = Wa(t[s], n);
      },
      _update: function() {
        this._map && (this._clipPoints(), this._simplifyPoints(), this._updatePath());
      },
      _updatePath: function() {
        this._renderer._updatePoly(this);
      },
      // Needed by the `Canvas` renderer for interactivity
      _containsPoint: function(t, n) {
        var s, c, m, E, $, it, st = this._clickTolerance();
        if (!this._pxBounds || !this._pxBounds.contains(t))
          return !1;
        for (s = 0, E = this._parts.length; s < E; s++)
          for (it = this._parts[s], c = 0, $ = it.length, m = $ - 1; c < $; m = c++)
            if (!(!n && c === 0) && Ae(t, it[m], it[c]) <= st)
              return !0;
        return !1;
      }
    });
    function Kr(t, n) {
      return new ki(t, n);
    }
    ki._flat = Ja;
    var Ne = ki.extend({
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
        return Ha(this._defaultShape(), this._map.options.crs);
      },
      _convertLatLngs: function(t) {
        var n = ki.prototype._convertLatLngs.call(this, t), s = n.length;
        return s >= 2 && n[0] instanceof jt && n[0].equals(n[s - 1]) && n.pop(), n;
      },
      _setLatLngs: function(t) {
        ki.prototype._setLatLngs.call(this, t), ii(this._latlngs) && (this._latlngs = [this._latlngs]);
      },
      _defaultShape: function() {
        return ii(this._latlngs[0]) ? this._latlngs[0] : this._latlngs[0][0];
      },
      _clipPoints: function() {
        var t = this._renderer._bounds, n = this.options.weight, s = new pt(n, n);
        if (t = new _t(t.min.subtract(s), t.max.add(s)), this._parts = [], !(!this._pxBounds || !this._pxBounds.intersects(t))) {
          if (this.options.noClip) {
            this._parts = this._rings;
            return;
          }
          for (var c = 0, m = this._rings.length, E; c < m; c++)
            E = qa(this._rings[c], t, !0), E.length && this._parts.push(E);
        }
      },
      _updatePath: function() {
        this._renderer._updatePoly(this, !0);
      },
      // Needed by the `Canvas` renderer for interactivity
      _containsPoint: function(t) {
        var n = !1, s, c, m, E, $, it, st, yt;
        if (!this._pxBounds || !this._pxBounds.contains(t))
          return !1;
        for (E = 0, st = this._parts.length; E < st; E++)
          for (s = this._parts[E], $ = 0, yt = s.length, it = yt - 1; $ < yt; it = $++)
            c = s[$], m = s[it], c.y > t.y != m.y > t.y && t.x < (m.x - c.x) * (t.y - c.y) / (m.y - c.y) + c.x && (n = !n);
        return n || ki.prototype._containsPoint.call(this, t, !0);
      }
    });
    function Wr(t, n) {
      return new Ne(t, n);
    }
    var Ei = pi.extend({
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
        X(this, n), this._layers = {}, t && this.addData(t);
      },
      // @method addData( <GeoJSON> data ): this
      // Adds a GeoJSON object to the layer.
      addData: function(t) {
        var n = At(t) ? t : t.features, s, c, m;
        if (n) {
          for (s = 0, c = n.length; s < c; s++)
            m = n[s], (m.geometries || m.geometry || m.features || m.coordinates) && this.addData(m);
          return this;
        }
        var E = this.options;
        if (E.filter && !E.filter(t))
          return this;
        var $ = Fn(t, E);
        return $ ? ($.feature = ur(t), $.defaultOptions = $.options, this.resetStyle($), E.onEachFeature && E.onEachFeature(t, $), this.addLayer($)) : this;
      },
      // @method resetStyle( <Path> layer? ): this
      // Resets the given vector layer's style to the original GeoJSON style, useful for resetting style after hover events.
      // If `layer` is omitted, the style of all features in the current layer is reset.
      resetStyle: function(t) {
        return t === void 0 ? this.eachLayer(this.resetStyle, this) : (t.options = k({}, t.defaultOptions), this._setLayerStyle(t, this.options.style), this);
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
    function Fn(t, n) {
      var s = t.type === "Feature" ? t.geometry : t, c = s ? s.coordinates : null, m = [], E = n && n.pointToLayer, $ = n && n.coordsToLatLng || Jr, it, st, yt, Pt;
      if (!c && !s)
        return null;
      switch (s.type) {
        case "Point":
          return it = $(c), es(E, t, it, n);
        case "MultiPoint":
          for (yt = 0, Pt = c.length; yt < Pt; yt++)
            it = $(c[yt]), m.push(es(E, t, it, n));
          return new pi(m);
        case "LineString":
        case "MultiLineString":
          return st = Ye(c, s.type === "LineString" ? 0 : 1, $), new ki(st, n);
        case "Polygon":
        case "MultiPolygon":
          return st = Ye(c, s.type === "Polygon" ? 1 : 2, $), new Ne(st, n);
        case "GeometryCollection":
          for (yt = 0, Pt = s.geometries.length; yt < Pt; yt++) {
            var $t = Fn({
              geometry: s.geometries[yt],
              type: "Feature",
              properties: t.properties
            }, n);
            $t && m.push($t);
          }
          return new pi(m);
        case "FeatureCollection":
          for (yt = 0, Pt = s.features.length; yt < Pt; yt++) {
            var te = Fn(s.features[yt], n);
            te && m.push(te);
          }
          return new pi(m);
        default:
          throw new Error("Invalid GeoJSON object.");
      }
    }
    function es(t, n, s, c) {
      return t ? t(n, s) : new or(s, c && c.markersInheritOptions && c);
    }
    function Jr(t) {
      return new jt(t[1], t[0], t[2]);
    }
    function Ye(t, n, s) {
      for (var c = [], m = 0, E = t.length, $; m < E; m++)
        $ = n ? Ye(t[m], n - 1, s) : (s || Jr)(t[m]), c.push($);
      return c;
    }
    function Mi(t, n) {
      return t = Gt(t), t.alt !== void 0 ? [j(t.lng, n), j(t.lat, n), j(t.alt, n)] : [j(t.lng, n), j(t.lat, n)];
    }
    function Wi(t, n, s, c) {
      for (var m = [], E = 0, $ = t.length; E < $; E++)
        m.push(n ? Wi(t[E], ii(t[E]) ? 0 : n - 1, s, c) : Mi(t[E], c));
      return !n && s && m.length > 0 && m.push(m[0].slice()), m;
    }
    function Ji(t, n) {
      return t.feature ? k({}, t.feature, { geometry: n }) : ur(n);
    }
    function ur(t) {
      return t.type === "Feature" || t.type === "FeatureCollection" ? t : {
        type: "Feature",
        properties: {},
        geometry: t
      };
    }
    var Xr = {
      toGeoJSON: function(t) {
        return Ji(this, {
          type: "Point",
          coordinates: Mi(this.getLatLng(), t)
        });
      }
    };
    or.include(Xr), yn.include(Xr), lr.include(Xr), ki.include({
      toGeoJSON: function(t) {
        var n = !ii(this._latlngs), s = Wi(this._latlngs, n ? 1 : 0, !1, t);
        return Ji(this, {
          type: (n ? "Multi" : "") + "LineString",
          coordinates: s
        });
      }
    }), Ne.include({
      toGeoJSON: function(t) {
        var n = !ii(this._latlngs), s = n && !ii(this._latlngs[0]), c = Wi(this._latlngs, s ? 2 : n ? 1 : 0, !0, t);
        return n || (c = [c]), Ji(this, {
          type: (s ? "Multi" : "") + "Polygon",
          coordinates: c
        });
      }
    }), Ci.include({
      toMultiPoint: function(t) {
        var n = [];
        return this.eachLayer(function(s) {
          n.push(s.toGeoJSON(t).geometry.coordinates);
        }), Ji(this, {
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
        return this.eachLayer(function(m) {
          if (m.toGeoJSON) {
            var E = m.toGeoJSON(t);
            if (s)
              c.push(E.geometry);
            else {
              var $ = ur(E);
              $.type === "FeatureCollection" ? c.push.apply(c, $.features) : c.push($);
            }
          }
        }), s ? Ji(this, {
          geometries: c,
          type: "GeometryCollection"
        }) : {
          type: "FeatureCollection",
          features: c
        };
      }
    });
    function is(t, n) {
      return new Ei(t, n);
    }
    var co = is, vn = Ze.extend({
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
        this._url = t, this._bounds = Qt(n), X(this, s);
      },
      onAdd: function() {
        this._image || (this._initImage(), this.options.opacity < 1 && this._updateOpacity()), this.options.interactive && (Wt(this._image, "leaflet-interactive"), this.addInteractiveTarget(this._image)), this.getPane().appendChild(this._image), this._reset();
      },
      onRemove: function() {
        ye(this._image), this.options.interactive && this.removeInteractiveTarget(this._image);
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
        return this._map && un(this._image), this;
      },
      // @method bringToBack(): this
      // Brings the layer to the bottom of all overlays.
      bringToBack: function() {
        return this._map && hn(this._image), this;
      },
      // @method setUrl(url: String): this
      // Changes the URL of the image.
      setUrl: function(t) {
        return this._url = t, this._image && (this._image.src = t), this;
      },
      // @method setBounds(bounds: LatLngBounds): this
      // Update the bounds that this ImageOverlay covers
      setBounds: function(t) {
        return this._bounds = Qt(t), this._map && this._reset(), this;
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
        var t = this._url.tagName === "IMG", n = this._image = t ? this._url : oe("img");
        if (Wt(n, "leaflet-image-layer"), this._zoomAnimated && Wt(n, "leaflet-zoom-animated"), this.options.className && Wt(n, this.options.className), n.onselectstart = A, n.onmousemove = A, n.onload = w(this.fire, this, "load"), n.onerror = w(this._overlayOnError, this, "error"), (this.options.crossOrigin || this.options.crossOrigin === "") && (n.crossOrigin = this.options.crossOrigin === !0 ? "" : this.options.crossOrigin), this.options.zIndex && this._updateZIndex(), t) {
          this._url = n.src;
          return;
        }
        n.src = this._url, n.alt = this.options.alt;
      },
      _animateZoom: function(t) {
        var n = this._map.getZoomScale(t.zoom), s = this._map._latLngBoundsToNewLayerBounds(this._bounds, t.zoom, t.center).min;
        qi(this._image, s, n);
      },
      _reset: function() {
        var t = this._image, n = new _t(
          this._map.latLngToLayerPoint(this._bounds.getNorthWest()),
          this._map.latLngToLayerPoint(this._bounds.getSouthEast())
        ), s = n.getSize();
        ke(t, n.min), t.style.width = s.x + "px", t.style.height = s.y + "px";
      },
      _updateOpacity: function() {
        ti(this._image, this.options.opacity);
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
    }), fo = function(t, n, s) {
      return new vn(t, n, s);
    }, ns = vn.extend({
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
        var t = this._url.tagName === "VIDEO", n = this._image = t ? this._url : oe("video");
        if (Wt(n, "leaflet-image-layer"), this._zoomAnimated && Wt(n, "leaflet-zoom-animated"), this.options.className && Wt(n, this.options.className), n.onselectstart = A, n.onmousemove = A, n.onloadeddata = w(this.fire, this, "load"), t) {
          for (var s = n.getElementsByTagName("source"), c = [], m = 0; m < s.length; m++)
            c.push(s[m].src);
          this._url = s.length > 0 ? c : [n.src];
          return;
        }
        At(this._url) || (this._url = [this._url]), !this.options.keepAspectRatio && Object.prototype.hasOwnProperty.call(n.style, "objectFit") && (n.style.objectFit = "fill"), n.autoplay = !!this.options.autoplay, n.loop = !!this.options.loop, n.muted = !!this.options.muted, n.playsInline = !!this.options.playsInline;
        for (var E = 0; E < this._url.length; E++) {
          var $ = oe("source");
          $.src = this._url[E], n.appendChild($);
        }
      }
      // @method getElement(): HTMLVideoElement
      // Returns the instance of [`HTMLVideoElement`](https://developer.mozilla.org/docs/Web/API/HTMLVideoElement)
      // used by this overlay.
    });
    function po(t, n, s) {
      return new ns(t, n, s);
    }
    var Yr = vn.extend({
      _initImage: function() {
        var t = this._image = this._url;
        Wt(t, "leaflet-image-layer"), this._zoomAnimated && Wt(t, "leaflet-zoom-animated"), this.options.className && Wt(t, this.options.className), t.onselectstart = A, t.onmousemove = A;
      }
      // @method getElement(): SVGElement
      // Returns the instance of [`SVGElement`](https://developer.mozilla.org/docs/Web/API/SVGElement)
      // used by this overlay.
    });
    function _o(t, n, s) {
      return new Yr(t, n, s);
    }
    var _i = Ze.extend({
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
        t && (t instanceof jt || At(t)) ? (this._latlng = Gt(t), X(this, n)) : (X(this, t), this._source = n), this.options.content && (this._content = this.options.content);
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
        this._zoomAnimated = t._zoomAnimated, this._container || this._initLayout(), t._fadeAnimated && ti(this._container, 0), clearTimeout(this._removeTimeout), this.getPane().appendChild(this._container), this.update(), t._fadeAnimated && ti(this._container, 1), this.bringToFront(), this.options.interactive && (Wt(this._container, "leaflet-interactive"), this.addInteractiveTarget(this._container));
      },
      onRemove: function(t) {
        t._fadeAnimated ? (ti(this._container, 0), this._removeTimeout = setTimeout(w(ye, void 0, this._container), 200)) : ye(this._container), this.options.interactive && (Le(this._container, "leaflet-interactive"), this.removeInteractiveTarget(this._container));
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
        return this._latlng = Gt(t), this._map && (this._updatePosition(), this._adjustPan()), this;
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
        return this._map && un(this._container), this;
      },
      // @method bringToBack: this
      // Brings this overlay to the back of other overlays (in the same map pane).
      bringToBack: function() {
        return this._map && hn(this._container), this;
      },
      // prepare bound overlay to open: update latlng pos / content source (for FeatureGroup)
      _prepareOpen: function(t) {
        var n = this._source;
        if (!n._map)
          return !1;
        if (n instanceof pi) {
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
          var t = this._map.latLngToLayerPoint(this._latlng), n = mt(this.options.offset), s = this._getAnchor();
          this._zoomAnimated ? ke(this._container, t.add(s)) : n = n.add(t).add(s);
          var c = this._containerBottom = -n.y, m = this._containerLeft = -Math.round(this._containerWidth / 2) + n.x;
          this._container.style.bottom = c + "px", this._container.style.left = m + "px";
        }
      },
      _getAnchor: function() {
        return [0, 0];
      }
    });
    ie.include({
      _initOverlay: function(t, n, s, c) {
        var m = n;
        return m instanceof t || (m = new t(c).setContent(n)), s && m.setLatLng(s), m;
      }
    }), Ze.include({
      _initOverlay: function(t, n, s, c) {
        var m = s;
        return m instanceof t ? (X(m, c), m._source = this) : (m = n && !c ? n : new t(c, this), m.setContent(s)), m;
      }
    });
    var Rn = _i.extend({
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
        return t = arguments.length ? t : this._source._map, !t.hasLayer(this) && t._popup && t._popup.options.autoClose && t.removeLayer(t._popup), t._popup = this, _i.prototype.openOn.call(this, t);
      },
      onAdd: function(t) {
        _i.prototype.onAdd.call(this, t), t.fire("popupopen", { popup: this }), this._source && (this._source.fire("popupopen", { popup: this }, !0), this._source instanceof ni || this._source.on("preclick", Hi));
      },
      onRemove: function(t) {
        _i.prototype.onRemove.call(this, t), t.fire("popupclose", { popup: this }), this._source && (this._source.fire("popupclose", { popup: this }, !0), this._source instanceof ni || this._source.off("preclick", Hi));
      },
      getEvents: function() {
        var t = _i.prototype.getEvents.call(this);
        return (this.options.closeOnClick !== void 0 ? this.options.closeOnClick : this._map.options.closePopupOnClick) && (t.preclick = this.close), this.options.keepInView && (t.moveend = this._adjustPan), t;
      },
      _initLayout: function() {
        var t = "leaflet-popup", n = this._container = oe(
          "div",
          t + " " + (this.options.className || "") + " leaflet-zoom-animated"
        ), s = this._wrapper = oe("div", t + "-content-wrapper", n);
        if (this._contentNode = oe("div", t + "-content", s), Tn(n), $r(this._contentNode), qt(n, "contextmenu", Hi), this._tipContainer = oe("div", t + "-tip-container", n), this._tip = oe("div", t + "-tip", this._tipContainer), this.options.closeButton) {
          var c = this._closeButton = oe("a", t + "-close-button", n);
          c.setAttribute("role", "button"), c.setAttribute("aria-label", "Close popup"), c.href = "#close", c.innerHTML = '<span aria-hidden="true">&#215;</span>', qt(c, "click", function(m) {
            Ie(m), this.close();
          }, this);
        }
      },
      _updateLayout: function() {
        var t = this._contentNode, n = t.style;
        n.width = "", n.whiteSpace = "nowrap";
        var s = t.offsetWidth;
        s = Math.min(s, this.options.maxWidth), s = Math.max(s, this.options.minWidth), n.width = s + 1 + "px", n.whiteSpace = "", n.height = "";
        var c = t.offsetHeight, m = this.options.maxHeight, E = "leaflet-popup-scrolled";
        m && c > m ? (n.height = m + "px", Wt(t, E)) : Le(t, E), this._containerWidth = this._container.offsetWidth;
      },
      _animateZoom: function(t) {
        var n = this._map._latLngToNewLayerPoint(this._latlng, t.zoom, t.center), s = this._getAnchor();
        ke(this._container, n.add(s));
      },
      _adjustPan: function() {
        if (this.options.autoPan) {
          if (this._map._panAnim && this._map._panAnim.stop(), this._autopanning) {
            this._autopanning = !1;
            return;
          }
          var t = this._map, n = parseInt(Oi(this._container, "marginBottom"), 10) || 0, s = this._container.offsetHeight + n, c = this._containerWidth, m = new pt(this._containerLeft, -s - this._containerBottom);
          m._add(Fi(this._container));
          var E = t.layerPointToContainerPoint(m), $ = mt(this.options.autoPanPadding), it = mt(this.options.autoPanPaddingTopLeft || $), st = mt(this.options.autoPanPaddingBottomRight || $), yt = t.getSize(), Pt = 0, $t = 0;
          E.x + c + st.x > yt.x && (Pt = E.x + c - yt.x + st.x), E.x - Pt - it.x < 0 && (Pt = E.x - it.x), E.y + s + st.y > yt.y && ($t = E.y + s - yt.y + st.y), E.y - $t - it.y < 0 && ($t = E.y - it.y), (Pt || $t) && (this.options.keepInView && (this._autopanning = !0), t.fire("autopanstart").panBy([Pt, $t]));
        }
      },
      _getAnchor: function() {
        return mt(this._source && this._source._getPopupAnchor ? this._source._getPopupAnchor() : [0, 0]);
      }
    }), mo = function(t, n) {
      return new Rn(t, n);
    };
    ie.mergeOptions({
      closePopupOnClick: !0
    }), ie.include({
      // @method openPopup(popup: Popup): this
      // Opens the specified popup while closing the previously opened (to make sure only one is opened at one time for usability).
      // @alternative
      // @method openPopup(content: String|HTMLElement, latlng: LatLng, options?: Popup options): this
      // Creates a popup with the specified content and options and opens it in the given point on a map.
      openPopup: function(t, n, s) {
        return this._initOverlay(Rn, t, n, s).openOn(this), this;
      },
      // @method closePopup(popup?: Popup): this
      // Closes the popup previously opened with [openPopup](#map-openpopup) (or the given one).
      closePopup: function(t) {
        return t = arguments.length ? t : this._popup, t && t.close(), this;
      }
    }), Ze.include({
      // @method bindPopup(content: String|HTMLElement|Function|Popup, options?: Popup options): this
      // Binds a popup to the layer with the passed `content` and sets up the
      // necessary event listeners. If a `Function` is passed it will receive
      // the layer as the first argument and should return a `String` or `HTMLElement`.
      bindPopup: function(t, n) {
        return this._popup = this._initOverlay(Rn, this._popup, t, n), this._popupHandlersAdded || (this.on({
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
        return this._popup && (this instanceof pi || (this._popup._source = this), this._popup._prepareOpen(t || this._latlng) && this._popup.openOn(this._map)), this;
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
          Ki(t);
          var n = t.layer || t.target;
          if (this._popup._source === n && !(n instanceof ni)) {
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
    var hr = _i.extend({
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
        _i.prototype.onAdd.call(this, t), this.setOpacity(this.options.opacity), t.fire("tooltipopen", { tooltip: this }), this._source && (this.addEventParent(this._source), this._source.fire("tooltipopen", { tooltip: this }, !0));
      },
      onRemove: function(t) {
        _i.prototype.onRemove.call(this, t), t.fire("tooltipclose", { tooltip: this }), this._source && (this.removeEventParent(this._source), this._source.fire("tooltipclose", { tooltip: this }, !0));
      },
      getEvents: function() {
        var t = _i.prototype.getEvents.call(this);
        return this.options.permanent || (t.preclick = this.close), t;
      },
      _initLayout: function() {
        var t = "leaflet-tooltip", n = t + " " + (this.options.className || "") + " leaflet-zoom-" + (this._zoomAnimated ? "animated" : "hide");
        this._contentNode = this._container = oe("div", n), this._container.setAttribute("role", "tooltip"), this._container.setAttribute("id", "leaflet-tooltip-" + x(this));
      },
      _updateLayout: function() {
      },
      _adjustPan: function() {
      },
      _setPosition: function(t) {
        var n, s, c = this._map, m = this._container, E = c.latLngToContainerPoint(c.getCenter()), $ = c.layerPointToContainerPoint(t), it = this.options.direction, st = m.offsetWidth, yt = m.offsetHeight, Pt = mt(this.options.offset), $t = this._getAnchor();
        it === "top" ? (n = st / 2, s = yt) : it === "bottom" ? (n = st / 2, s = 0) : it === "center" ? (n = st / 2, s = yt / 2) : it === "right" ? (n = 0, s = yt / 2) : it === "left" ? (n = st, s = yt / 2) : $.x < E.x ? (it = "right", n = 0, s = yt / 2) : (it = "left", n = st + (Pt.x + $t.x) * 2, s = yt / 2), t = t.subtract(mt(n, s, !0)).add(Pt).add($t), Le(m, "leaflet-tooltip-right"), Le(m, "leaflet-tooltip-left"), Le(m, "leaflet-tooltip-top"), Le(m, "leaflet-tooltip-bottom"), Wt(m, "leaflet-tooltip-" + it), ke(m, t);
      },
      _updatePosition: function() {
        var t = this._map.latLngToLayerPoint(this._latlng);
        this._setPosition(t);
      },
      setOpacity: function(t) {
        this.options.opacity = t, this._container && ti(this._container, t);
      },
      _animateZoom: function(t) {
        var n = this._map._latLngToNewLayerPoint(this._latlng, t.zoom, t.center);
        this._setPosition(n);
      },
      _getAnchor: function() {
        return mt(this._source && this._source._getTooltipAnchor && !this.options.sticky ? this._source._getTooltipAnchor() : [0, 0]);
      }
    }), go = function(t, n) {
      return new hr(t, n);
    };
    ie.include({
      // @method openTooltip(tooltip: Tooltip): this
      // Opens the specified tooltip.
      // @alternative
      // @method openTooltip(content: String|HTMLElement, latlng: LatLng, options?: Tooltip options): this
      // Creates a tooltip with the specified content and options and open it.
      openTooltip: function(t, n, s) {
        return this._initOverlay(hr, t, n, s).openOn(this), this;
      },
      // @method closeTooltip(tooltip: Tooltip): this
      // Closes the tooltip given as parameter.
      closeTooltip: function(t) {
        return t.close(), this;
      }
    }), Ze.include({
      // @method bindTooltip(content: String|HTMLElement|Function|Tooltip, options?: Tooltip options): this
      // Binds a tooltip to the layer with the passed `content` and sets up the
      // necessary event listeners. If a `Function` is passed it will receive
      // the layer as the first argument and should return a `String` or `HTMLElement`.
      bindTooltip: function(t, n) {
        return this._tooltip && this.isTooltipOpen() && this.unbindTooltip(), this._tooltip = this._initOverlay(hr, this._tooltip, t, n), this._initTooltipInteractions(), this._tooltip.options.permanent && this._map && this._map.hasLayer(this) && this.openTooltip(), this;
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
        return this._tooltip && (this instanceof pi || (this._tooltip._source = this), this._tooltip._prepareOpen(t) && (this._tooltip.openOn(this._map), this.getElement ? this._setAriaDescribedByOnLayer(this) : this.eachLayer && this.eachLayer(this._setAriaDescribedByOnLayer, this))), this;
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
        n && (qt(n, "focus", function() {
          this._tooltip._source = t, this.openTooltip();
        }, this), qt(n, "blur", this.closeTooltip, this));
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
    var zi = gn.extend({
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
        if (s.html instanceof Element ? (Bn(n), n.appendChild(s.html)) : n.innerHTML = s.html !== !1 ? s.html : "", s.bgPos) {
          var c = mt(s.bgPos);
          n.style.backgroundPosition = -c.x + "px " + -c.y + "px";
        }
        return this._setIconStyles(n, "icon"), n;
      },
      createShadow: function() {
        return null;
      }
    });
    function Nn(t) {
      return new zi(t);
    }
    gn.Default = On;
    var zn = Ze.extend({
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
        updateWhenIdle: Rt.mobile,
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
        X(this, t);
      },
      onAdd: function() {
        this._initContainer(), this._levels = {}, this._tiles = {}, this._resetView();
      },
      beforeAdd: function(t) {
        t._addZoomLimit(this);
      },
      onRemove: function(t) {
        this._removeAllTiles(), ye(this._container), t._removeZoomLimit(this), this._container = null, this._tileZoom = void 0;
      },
      // @method bringToFront: this
      // Brings the tile layer to the top of all tile layers.
      bringToFront: function() {
        return this._map && (un(this._container), this._setAutoZIndex(Math.max)), this;
      },
      // @method bringToBack: this
      // Brings the tile layer to the bottom of all tile layers.
      bringToBack: function() {
        return this._map && (hn(this._container), this._setAutoZIndex(Math.min)), this;
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
        return this.options.updateWhenIdle || (this._onMove || (this._onMove = R(this._onMoveEnd, this.options.updateInterval, this)), t.move = this._onMove), this._zoomAnimated && (t.zoomanim = this._animateZoom), t;
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
        return t instanceof pt ? t : new pt(t, t);
      },
      _updateZIndex: function() {
        this._container && this.options.zIndex !== void 0 && this.options.zIndex !== null && (this._container.style.zIndex = this.options.zIndex);
      },
      _setAutoZIndex: function(t) {
        for (var n = this.getPane().children, s = -t(-1 / 0, 1 / 0), c = 0, m = n.length, E; c < m; c++)
          E = n[c].style.zIndex, n[c] !== this._container && E && (s = t(s, +E));
        isFinite(s) && (this.options.zIndex = s + t(-1, 1), this._updateZIndex());
      },
      _updateOpacity: function() {
        if (this._map && !Rt.ielt9) {
          ti(this._container, this.options.opacity);
          var t = +/* @__PURE__ */ new Date(), n = !1, s = !1;
          for (var c in this._tiles) {
            var m = this._tiles[c];
            if (!(!m.current || !m.loaded)) {
              var E = Math.min(1, (t - m.loaded) / 200);
              ti(m.el, E), E < 1 ? n = !0 : (m.active ? s = !0 : this._onOpaqueTile(m), m.active = !0);
            }
          }
          s && !this._noPrune && this._pruneTiles(), n && (me(this._fadeFrame), this._fadeFrame = Kt(this._updateOpacity, this));
        }
      },
      _onOpaqueTile: A,
      _initContainer: function() {
        this._container || (this._container = oe("div", "leaflet-layer " + (this.options.className || "")), this._updateZIndex(), this.options.opacity < 1 && this._updateOpacity(), this.getPane().appendChild(this._container));
      },
      _updateLevels: function() {
        var t = this._tileZoom, n = this.options.maxZoom;
        if (t !== void 0) {
          for (var s in this._levels)
            s = Number(s), this._levels[s].el.children.length || s === t ? (this._levels[s].el.style.zIndex = n - Math.abs(t - s), this._onUpdateLevel(s)) : (ye(this._levels[s].el), this._removeTilesAtZoom(s), this._onRemoveLevel(s), delete this._levels[s]);
          var c = this._levels[t], m = this._map;
          return c || (c = this._levels[t] = {}, c.el = oe("div", "leaflet-tile-container leaflet-zoom-animated", this._container), c.el.style.zIndex = n, c.origin = m.project(m.unproject(m.getPixelOrigin()), t).round(), c.zoom = t, this._setZoomTransform(c, m.getCenter(), m.getZoom()), A(c.el.offsetWidth), this._onCreateLevel(c)), this._level = c, c;
        }
      },
      _onUpdateLevel: A,
      _onRemoveLevel: A,
      _onCreateLevel: A,
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
          ye(this._levels[t].el), this._onRemoveLevel(Number(t)), delete this._levels[t];
        this._removeAllTiles(), this._tileZoom = void 0;
      },
      _retainParent: function(t, n, s, c) {
        var m = Math.floor(t / 2), E = Math.floor(n / 2), $ = s - 1, it = new pt(+m, +E);
        it.z = +$;
        var st = this._tileCoordsToKey(it), yt = this._tiles[st];
        return yt && yt.active ? (yt.retain = !0, !0) : (yt && yt.loaded && (yt.retain = !0), $ > c ? this._retainParent(m, E, $, c) : !1);
      },
      _retainChildren: function(t, n, s, c) {
        for (var m = 2 * t; m < 2 * t + 2; m++)
          for (var E = 2 * n; E < 2 * n + 2; E++) {
            var $ = new pt(m, E);
            $.z = s + 1;
            var it = this._tileCoordsToKey($), st = this._tiles[it];
            if (st && st.active) {
              st.retain = !0;
              continue;
            } else st && st.loaded && (st.retain = !0);
            s + 1 < c && this._retainChildren(m, E, s + 1, c);
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
        var m = Math.round(n);
        this.options.maxZoom !== void 0 && m > this.options.maxZoom || this.options.minZoom !== void 0 && m < this.options.minZoom ? m = void 0 : m = this._clampZoom(m);
        var E = this.options.updateWhenZooming && m !== this._tileZoom;
        (!c || E) && (this._tileZoom = m, this._abortLoading && this._abortLoading(), this._updateLevels(), this._resetGrid(), m !== void 0 && this._update(t), s || this._pruneTiles(), this._noPrune = !!s), this._setZoomTransforms(t, n);
      },
      _setZoomTransforms: function(t, n) {
        for (var s in this._levels)
          this._setZoomTransform(this._levels[s], t, n);
      },
      _setZoomTransform: function(t, n, s) {
        var c = this._map.getZoomScale(s, t.zoom), m = t.origin.multiplyBy(c).subtract(this._map._getNewPixelOrigin(n, s)).round();
        Rt.any3d ? qi(t.el, m, c) : ke(t.el, m);
      },
      _resetGrid: function() {
        var t = this._map, n = t.options.crs, s = this._tileSize = this.getTileSize(), c = this._tileZoom, m = this._map.getPixelWorldBounds(this._tileZoom);
        m && (this._globalTileRange = this._pxBoundsToTileRange(m)), this._wrapX = n.wrapLng && !this.options.noWrap && [
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
        var n = this._map, s = n._animatingZoom ? Math.max(n._animateToZoom, n.getZoom()) : n.getZoom(), c = n.getZoomScale(s, this._tileZoom), m = n.project(t, this._tileZoom).floor(), E = n.getSize().divideBy(c * 2);
        return new _t(m.subtract(E), m.add(E));
      },
      // Private method to load tiles in the grid's active zoom level according to map bounds
      _update: function(t) {
        var n = this._map;
        if (n) {
          var s = this._clampZoom(n.getZoom());
          if (t === void 0 && (t = n.getCenter()), this._tileZoom !== void 0) {
            var c = this._getTiledPixelBounds(t), m = this._pxBoundsToTileRange(c), E = m.getCenter(), $ = [], it = this.options.keepBuffer, st = new _t(
              m.getBottomLeft().subtract([it, -it]),
              m.getTopRight().add([it, -it])
            );
            if (!(isFinite(m.min.x) && isFinite(m.min.y) && isFinite(m.max.x) && isFinite(m.max.y)))
              throw new Error("Attempted to load an infinite number of tiles");
            for (var yt in this._tiles) {
              var Pt = this._tiles[yt].coords;
              (Pt.z !== this._tileZoom || !st.contains(new pt(Pt.x, Pt.y))) && (this._tiles[yt].current = !1);
            }
            if (Math.abs(s - this._tileZoom) > 1) {
              this._setView(t, s);
              return;
            }
            for (var $t = m.min.y; $t <= m.max.y; $t++)
              for (var te = m.min.x; te <= m.max.x; te++) {
                var je = new pt(te, $t);
                if (je.z = this._tileZoom, !!this._isValidTile(je)) {
                  var Te = this._tiles[this._tileCoordsToKey(je)];
                  Te ? Te.current = !0 : $.push(je);
                }
              }
            if ($.sort(function(qe, $i) {
              return qe.distanceTo(E) - $i.distanceTo(E);
            }), $.length !== 0) {
              this._loading || (this._loading = !0, this.fire("loading"));
              var ai = document.createDocumentFragment();
              for (te = 0; te < $.length; te++)
                this._addTile($[te], ai);
              this._level.el.appendChild(ai);
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
        return Qt(this.options.bounds).overlaps(c);
      },
      _keyToBounds: function(t) {
        return this._tileCoordsToBounds(this._keyToTileCoords(t));
      },
      _tileCoordsToNwSe: function(t) {
        var n = this._map, s = this.getTileSize(), c = t.scaleBy(s), m = c.add(s), E = n.unproject(c, t.z), $ = n.unproject(m, t.z);
        return [E, $];
      },
      // converts tile coordinates to its geographical bounds
      _tileCoordsToBounds: function(t) {
        var n = this._tileCoordsToNwSe(t), s = new Tt(n[0], n[1]);
        return this.options.noWrap || (s = this._map.wrapLatLngBounds(s)), s;
      },
      // converts tile coordinates to key for the tile cache
      _tileCoordsToKey: function(t) {
        return t.x + ":" + t.y + ":" + t.z;
      },
      // converts tile cache key to coordinates
      _keyToTileCoords: function(t) {
        var n = t.split(":"), s = new pt(+n[0], +n[1]);
        return s.z = +n[2], s;
      },
      _removeTile: function(t) {
        var n = this._tiles[t];
        n && (ye(n.el), delete this._tiles[t], this.fire("tileunload", {
          tile: n.el,
          coords: this._keyToTileCoords(t)
        }));
      },
      _initTile: function(t) {
        Wt(t, "leaflet-tile");
        var n = this.getTileSize();
        t.style.width = n.x + "px", t.style.height = n.y + "px", t.onselectstart = A, t.onmousemove = A, Rt.ielt9 && this.options.opacity < 1 && ti(t, this.options.opacity);
      },
      _addTile: function(t, n) {
        var s = this._getTilePos(t), c = this._tileCoordsToKey(t), m = this.createTile(this._wrapCoords(t), w(this._tileReady, this, t));
        this._initTile(m), this.createTile.length < 2 && Kt(w(this._tileReady, this, t, null, m)), ke(m, s), this._tiles[c] = {
          el: m,
          coords: t,
          current: !0
        }, n.appendChild(m), this.fire("tileloadstart", {
          tile: m,
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
        s = this._tiles[c], s && (s.loaded = +/* @__PURE__ */ new Date(), this._map._fadeAnimated ? (ti(s.el, 0), me(this._fadeFrame), this._fadeFrame = Kt(this._updateOpacity, this)) : (s.active = !0, this._pruneTiles()), n || (Wt(s.el, "leaflet-tile-loaded"), this.fire("tileload", {
          tile: s.el,
          coords: t
        })), this._noTilesToLoad() && (this._loading = !1, this.fire("load"), Rt.ielt9 || !this._map._fadeAnimated ? Kt(this._pruneTiles, this) : setTimeout(w(this._pruneTiles, this), 250)));
      },
      _getTilePos: function(t) {
        return t.scaleBy(this.getTileSize()).subtract(this._level.origin);
      },
      _wrapCoords: function(t) {
        var n = new pt(
          this._wrapX ? U(t.x, this._wrapX) : t.x,
          this._wrapY ? U(t.y, this._wrapY) : t.y
        );
        return n.z = t.z, n;
      },
      _pxBoundsToTileRange: function(t) {
        var n = this.getTileSize();
        return new _t(
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
    function rs(t) {
      return new zn(t);
    }
    var ji = zn.extend({
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
        this._url = t, n = X(this, n), n.detectRetina && Rt.retina && n.maxZoom > 0 ? (n.tileSize = Math.floor(n.tileSize / 2), n.zoomReverse ? (n.zoomOffset--, n.minZoom = Math.min(n.maxZoom, n.minZoom + 1)) : (n.zoomOffset++, n.maxZoom = Math.max(n.minZoom, n.maxZoom - 1)), n.minZoom = Math.max(0, n.minZoom)) : n.zoomReverse ? n.minZoom = Math.min(n.maxZoom, n.minZoom) : n.maxZoom = Math.max(n.minZoom, n.maxZoom), typeof n.subdomains == "string" && (n.subdomains = n.subdomains.split("")), this.on("tileunload", this._onTileRemove);
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
        return qt(s, "load", w(this._tileOnLoad, this, n, s)), qt(s, "error", w(this._tileOnError, this, n, s)), (this.options.crossOrigin || this.options.crossOrigin === "") && (s.crossOrigin = this.options.crossOrigin === !0 ? "" : this.options.crossOrigin), typeof this.options.referrerPolicy == "string" && (s.referrerPolicy = this.options.referrerPolicy), s.alt = "", s.src = this.getTileUrl(t), s;
      },
      // @section Extension methods
      // @uninheritable
      // Layers extending `TileLayer` might reimplement the following method.
      // @method getTileUrl(coords: Object): String
      // Called only internally, returns the URL for a tile given its coordinates.
      // Classes extending `TileLayer` can override this function to provide custom tile URL naming schemes.
      getTileUrl: function(t) {
        var n = {
          r: Rt.retina ? "@2x" : "",
          s: this._getSubdomain(t),
          x: t.x,
          y: t.y,
          z: this._getZoomForUrl()
        };
        if (this._map && !this._map.options.crs.infinite) {
          var s = this._globalTileRange.max.y - t.y;
          this.options.tms && (n.y = s), n["-y"] = s;
        }
        return Et(this._url, k(n, this.options));
      },
      _tileOnLoad: function(t, n) {
        Rt.ielt9 ? setTimeout(w(t, this, null, n), 0) : t(null, n);
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
          if (this._tiles[t].coords.z !== this._tileZoom && (n = this._tiles[t].el, n.onload = A, n.onerror = A, !n.complete)) {
            n.src = Mt;
            var s = this._tiles[t].coords;
            ye(n), delete this._tiles[t], this.fire("tileabort", {
              tile: n,
              coords: s
            });
          }
      },
      _removeTile: function(t) {
        var n = this._tiles[t];
        if (n)
          return n.el.setAttribute("src", Mt), zn.prototype._removeTile.call(this, t);
      },
      _tileReady: function(t, n, s) {
        if (!(!this._map || s && s.getAttribute("src") === Mt))
          return zn.prototype._tileReady.call(this, t, n, s);
      }
    });
    function as(t, n) {
      return new ji(t, n);
    }
    var ss = ji.extend({
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
        var s = k({}, this.defaultWmsParams);
        for (var c in n)
          c in this.options || (s[c] = n[c]);
        n = X(this, n);
        var m = n.detectRetina && Rt.retina ? 2 : 1, E = this.getTileSize();
        s.width = E.x * m, s.height = E.y * m, this.wmsParams = s;
      },
      onAdd: function(t) {
        this._crs = this.options.crs || t.options.crs, this._wmsVersion = parseFloat(this.wmsParams.version);
        var n = this._wmsVersion >= 1.3 ? "crs" : "srs";
        this.wmsParams[n] = this._crs.code, ji.prototype.onAdd.call(this, t);
      },
      getTileUrl: function(t) {
        var n = this._tileCoordsToNwSe(t), s = this._crs, c = It(s.project(n[0]), s.project(n[1])), m = c.min, E = c.max, $ = (this._wmsVersion >= 1.3 && this._crs === qr ? [m.y, m.x, E.y, E.x] : [m.x, m.y, E.x, E.y]).join(","), it = ji.prototype.getTileUrl.call(this, t);
        return it + dt(this.wmsParams, it, this.options.uppercase) + (this.options.uppercase ? "&BBOX=" : "&bbox=") + $;
      },
      // @method setParams(params: Object, noRedraw?: Boolean): this
      // Merges an object with the new parameters and re-requests tiles on the current screen (unless `noRedraw` was set to true).
      setParams: function(t, n) {
        return k(this.wmsParams, t), n || this.redraw(), this;
      }
    });
    function os(t, n) {
      return new ss(t, n);
    }
    ji.WMS = ss, as.wms = os;
    var mi = Ze.extend({
      // @section
      // @aka Renderer options
      options: {
        // @option padding: Number = 0.1
        // How much to extend the clip area around the map view (relative to its size)
        // e.g. 0.1 would be 10% of map view in each direction
        padding: 0.1
      },
      initialize: function(t) {
        X(this, t), x(this), this._layers = this._layers || {};
      },
      onAdd: function() {
        this._container || (this._initContainer(), Wt(this._container, "leaflet-zoom-animated")), this.getPane().appendChild(this._container), this._update(), this.on("update", this._updatePaths, this);
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
        var s = this._map.getZoomScale(n, this._zoom), c = this._map.getSize().multiplyBy(0.5 + this.options.padding), m = this._map.project(this._center, n), E = c.multiplyBy(-s).add(m).subtract(this._map._getNewPixelOrigin(t, n));
        Rt.any3d ? qi(this._container, E, s) : ke(this._container, E);
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
        this._bounds = new _t(s, s.add(n.multiplyBy(1 + t * 2)).round()), this._center = this._map.getCenter(), this._zoom = this._map.getZoom();
      }
    }), cr = mi.extend({
      // @section
      // @aka Canvas options
      options: {
        // @option tolerance: Number = 0
        // How much to extend the click tolerance around a path/object on the map.
        tolerance: 0
      },
      getEvents: function() {
        var t = mi.prototype.getEvents.call(this);
        return t.viewprereset = this._onViewPreReset, t;
      },
      _onViewPreReset: function() {
        this._postponeUpdatePaths = !0;
      },
      onAdd: function() {
        mi.prototype.onAdd.call(this), this._draw();
      },
      _initContainer: function() {
        var t = this._container = document.createElement("canvas");
        qt(t, "mousemove", this._onMouseMove, this), qt(t, "click dblclick mousedown mouseup contextmenu", this._onClick, this), qt(t, "mouseout", this._handleMouseOut, this), t._leaflet_disable_events = !0, this._ctx = t.getContext("2d");
      },
      _destroyContainer: function() {
        me(this._redrawRequest), delete this._ctx, ye(this._container), ue(this._container), delete this._container;
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
          mi.prototype._update.call(this);
          var t = this._bounds, n = this._container, s = t.getSize(), c = Rt.retina ? 2 : 1;
          ke(n, t.min), n.width = c * s.x, n.height = c * s.y, n.style.width = s.x + "px", n.style.height = s.y + "px", Rt.retina && this._ctx.scale(2, 2), this._ctx.translate(-t.min.x, -t.min.y), this.fire("update");
        }
      },
      _reset: function() {
        mi.prototype._reset.call(this), this._postponeUpdatePaths && (this._postponeUpdatePaths = !1, this._updatePaths());
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
          var n = t.options.dashArray.split(/[, ]+/), s = [], c, m;
          for (m = 0; m < n.length; m++) {
            if (c = Number(n[m]), isNaN(c))
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
          this._redrawBounds = this._redrawBounds || new _t(), this._redrawBounds.extend(t._pxBounds.min.subtract([n, n])), this._redrawBounds.extend(t._pxBounds.max.add([n, n]));
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
          var s, c, m, E, $ = t._parts, it = $.length, st = this._ctx;
          if (it) {
            for (st.beginPath(), s = 0; s < it; s++) {
              for (c = 0, m = $[s].length; c < m; c++)
                E = $[s][c], st[c ? "lineTo" : "moveTo"](E.x, E.y);
              n && st.closePath();
            }
            this._fillStroke(st, t);
          }
        }
      },
      _updateCircle: function(t) {
        if (!(!this._drawing || t._empty())) {
          var n = t._point, s = this._ctx, c = Math.max(Math.round(t._radius), 1), m = (Math.max(Math.round(t._radiusY), 1) || c) / c;
          m !== 1 && (s.save(), s.scale(1, m)), s.beginPath(), s.arc(n.x, n.y / m, c, 0, Math.PI * 2, !1), m !== 1 && s.restore(), this._fillStroke(s, t);
        }
      },
      _fillStroke: function(t, n) {
        var s = n.options;
        s.fill && (t.globalAlpha = s.fillOpacity, t.fillStyle = s.fillColor || s.color, t.fill(s.fillRule || "evenodd")), s.stroke && s.weight !== 0 && (t.setLineDash && t.setLineDash(n.options && n.options._dashArray || []), t.globalAlpha = s.opacity, t.lineWidth = s.weight, t.strokeStyle = s.color, t.lineCap = s.lineCap, t.lineJoin = s.lineJoin, t.stroke());
      },
      // Canvas obviously doesn't have mouse events for individual drawn objects,
      // so we emulate that by calculating what's under the mouse on mousemove/click manually
      _onClick: function(t) {
        for (var n = this._map.mouseEventToLayerPoint(t), s, c, m = this._drawFirst; m; m = m.next)
          s = m.layer, s.options.interactive && s._containsPoint(n) && (!(t.type === "click" || t.type === "preclick") || !this._map._draggableMoved(s)) && (c = s);
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
        n && (Le(this._container, "leaflet-interactive"), this._fireEvent([n], t, "mouseout"), this._hoveredLayer = null, this._mouseHoverThrottled = !1);
      },
      _handleMouseHover: function(t, n) {
        if (!this._mouseHoverThrottled) {
          for (var s, c, m = this._drawFirst; m; m = m.next)
            s = m.layer, s.options.interactive && s._containsPoint(n) && (c = s);
          c !== this._hoveredLayer && (this._handleMouseOut(t), c && (Wt(this._container, "leaflet-interactive"), this._fireEvent([c], t, "mouseover"), this._hoveredLayer = c)), this._fireEvent(this._hoveredLayer ? [this._hoveredLayer] : !1, t), this._mouseHoverThrottled = !0, setTimeout(w(function() {
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
    function Qr(t) {
      return Rt.canvas ? new cr(t) : null;
    }
    var Xi = function() {
      try {
        return document.namespaces.add("lvml", "urn:schemas-microsoft-com:vml"), function(t) {
          return document.createElement("<lvml:" + t + ' class="lvml">');
        };
      } catch {
      }
      return function(t) {
        return document.createElement("<" + t + ' xmlns="urn:schemas-microsoft.com:vml" class="lvml">');
      };
    }(), yo = {
      _initContainer: function() {
        this._container = oe("div", "leaflet-vml-container");
      },
      _update: function() {
        this._map._animatingZoom || (mi.prototype._update.call(this), this.fire("update"));
      },
      _initPath: function(t) {
        var n = t._container = Xi("shape");
        Wt(n, "leaflet-vml-shape " + (this.options.className || "")), n.coordsize = "1 1", t._path = Xi("path"), n.appendChild(t._path), this._updateStyle(t), this._layers[x(t)] = t;
      },
      _addPath: function(t) {
        var n = t._container;
        this._container.appendChild(n), t.options.interactive && t.addInteractiveTarget(n);
      },
      _removePath: function(t) {
        var n = t._container;
        ye(n), t.removeInteractiveTarget(n), delete this._layers[x(t)];
      },
      _updateStyle: function(t) {
        var n = t._stroke, s = t._fill, c = t.options, m = t._container;
        m.stroked = !!c.stroke, m.filled = !!c.fill, c.stroke ? (n || (n = t._stroke = Xi("stroke")), m.appendChild(n), n.weight = c.weight + "px", n.color = c.color, n.opacity = c.opacity, c.dashArray ? n.dashStyle = At(c.dashArray) ? c.dashArray.join(" ") : c.dashArray.replace(/( *, *)/g, " ") : n.dashStyle = "", n.endcap = c.lineCap.replace("butt", "flat"), n.joinstyle = c.lineJoin) : n && (m.removeChild(n), t._stroke = null), c.fill ? (s || (s = t._fill = Xi("fill")), m.appendChild(s), s.color = c.fillColor || c.color, s.opacity = c.fillOpacity) : s && (m.removeChild(s), t._fill = null);
      },
      _updateCircle: function(t) {
        var n = t._point.round(), s = Math.round(t._radius), c = Math.round(t._radiusY || s);
        this._setPath(t, t._empty() ? "M0 0" : "AL " + n.x + "," + n.y + " " + s + "," + c + " 0," + 65535 * 360);
      },
      _setPath: function(t, n) {
        t._path.v = n;
      },
      _bringToFront: function(t) {
        un(t._container);
      },
      _bringToBack: function(t) {
        hn(t._container);
      }
    }, ri = Rt.vml ? Xi : qn, Ee = mi.extend({
      _initContainer: function() {
        this._container = ri("svg"), this._container.setAttribute("pointer-events", "none"), this._rootGroup = ri("g"), this._container.appendChild(this._rootGroup);
      },
      _destroyContainer: function() {
        ye(this._container), ue(this._container), delete this._container, delete this._rootGroup, delete this._svgSize;
      },
      _update: function() {
        if (!(this._map._animatingZoom && this._bounds)) {
          mi.prototype._update.call(this);
          var t = this._bounds, n = t.getSize(), s = this._container;
          (!this._svgSize || !this._svgSize.equals(n)) && (this._svgSize = n, s.setAttribute("width", n.x), s.setAttribute("height", n.y)), ke(s, t.min), s.setAttribute("viewBox", [t.min.x, t.min.y, n.x, n.y].join(" ")), this.fire("update");
        }
      },
      // methods below are called by vector layers implementations
      _initPath: function(t) {
        var n = t._path = ri("path");
        t.options.className && Wt(n, t.options.className), t.options.interactive && Wt(n, "leaflet-interactive"), this._updateStyle(t), this._layers[x(t)] = t;
      },
      _addPath: function(t) {
        this._rootGroup || this._initContainer(), this._rootGroup.appendChild(t._path), t.addInteractiveTarget(t._path);
      },
      _removePath: function(t) {
        ye(t._path), t.removeInteractiveTarget(t._path), delete this._layers[x(t)];
      },
      _updatePath: function(t) {
        t._project(), t._update();
      },
      _updateStyle: function(t) {
        var n = t._path, s = t.options;
        n && (s.stroke ? (n.setAttribute("stroke", s.color), n.setAttribute("stroke-opacity", s.opacity), n.setAttribute("stroke-width", s.weight), n.setAttribute("stroke-linecap", s.lineCap), n.setAttribute("stroke-linejoin", s.lineJoin), s.dashArray ? n.setAttribute("stroke-dasharray", s.dashArray) : n.removeAttribute("stroke-dasharray"), s.dashOffset ? n.setAttribute("stroke-dashoffset", s.dashOffset) : n.removeAttribute("stroke-dashoffset")) : n.setAttribute("stroke", "none"), s.fill ? (n.setAttribute("fill", s.fillColor || s.color), n.setAttribute("fill-opacity", s.fillOpacity), n.setAttribute("fill-rule", s.fillRule || "evenodd")) : n.setAttribute("fill", "none"));
      },
      _updatePoly: function(t, n) {
        this._setPath(t, Hn(t._parts, n));
      },
      _updateCircle: function(t) {
        var n = t._point, s = Math.max(Math.round(t._radius), 1), c = Math.max(Math.round(t._radiusY), 1) || s, m = "a" + s + "," + c + " 0 1,0 ", E = t._empty() ? "M0 0" : "M" + (n.x - s) + "," + n.y + m + s * 2 + ",0 " + m + -s * 2 + ",0 ";
        this._setPath(t, E);
      },
      _setPath: function(t, n) {
        t._path.setAttribute("d", n);
      },
      // SVG does not have the concept of zIndex so we resort to changing the DOM order of elements
      _bringToFront: function(t) {
        un(t._path);
      },
      _bringToBack: function(t) {
        hn(t._path);
      }
    });
    Rt.vml && Ee.include(yo);
    function ls(t) {
      return Rt.svg || Rt.vml ? new Ee(t) : null;
    }
    ie.include({
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
        return this.options.preferCanvas && Qr(t) || ls(t);
      }
    });
    var dr = Ne.extend({
      initialize: function(t, n) {
        Ne.prototype.initialize.call(this, this._boundsToLatLngs(t), n);
      },
      // @method setBounds(latLngBounds: LatLngBounds): this
      // Redraws the rectangle with the passed bounds.
      setBounds: function(t) {
        return this.setLatLngs(this._boundsToLatLngs(t));
      },
      _boundsToLatLngs: function(t) {
        return t = Qt(t), [
          t.getSouthWest(),
          t.getNorthWest(),
          t.getNorthEast(),
          t.getSouthEast()
        ];
      }
    });
    function vo(t, n) {
      return new dr(t, n);
    }
    Ee.create = ri, Ee.pointsToPath = Hn, Ei.geometryToLayer = Fn, Ei.coordsToLatLng = Jr, Ei.coordsToLatLngs = Ye, Ei.latLngToCoords = Mi, Ei.latLngsToCoords = Wi, Ei.getFeature = Ji, Ei.asFeature = ur, ie.mergeOptions({
      // @option boxZoom: Boolean = true
      // Whether the map can be zoomed to a rectangular area specified by
      // dragging the mouse while pressing the shift key.
      boxZoom: !0
    });
    var bn = di.extend({
      initialize: function(t) {
        this._map = t, this._container = t._container, this._pane = t._panes.overlayPane, this._resetStateTimeout = 0, t.on("unload", this._destroy, this);
      },
      addHooks: function() {
        qt(this._container, "mousedown", this._onMouseDown, this);
      },
      removeHooks: function() {
        ue(this._container, "mousedown", this._onMouseDown, this);
      },
      moved: function() {
        return this._moved;
      },
      _destroy: function() {
        ye(this._pane), delete this._pane;
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
        this._clearDeferredResetState(), this._resetState(), Pn(), Dr(), this._startPoint = this._map.mouseEventToContainerPoint(t), qt(document, {
          contextmenu: Ki,
          mousemove: this._onMouseMove,
          mouseup: this._onMouseUp,
          keydown: this._onKeyDown
        }, this);
      },
      _onMouseMove: function(t) {
        this._moved || (this._moved = !0, this._box = oe("div", "leaflet-zoom-box", this._container), Wt(this._container, "leaflet-crosshair"), this._map.fire("boxzoomstart")), this._point = this._map.mouseEventToContainerPoint(t);
        var n = new _t(this._point, this._startPoint), s = n.getSize();
        ke(this._box, n.min), this._box.style.width = s.x + "px", this._box.style.height = s.y + "px";
      },
      _finish: function() {
        this._moved && (ye(this._box), Le(this._container, "leaflet-crosshair")), Sn(), Ir(), ue(document, {
          contextmenu: Ki,
          mousemove: this._onMouseMove,
          mouseup: this._onMouseUp,
          keydown: this._onKeyDown
        }, this);
      },
      _onMouseUp: function(t) {
        if (!(t.which !== 1 && t.button !== 1) && (this._finish(), !!this._moved)) {
          this._clearDeferredResetState(), this._resetStateTimeout = setTimeout(w(this._resetState, this), 0);
          var n = new Tt(
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
    ie.addInitHook("addHandler", "boxZoom", bn), ie.mergeOptions({
      // @option doubleClickZoom: Boolean|String = true
      // Whether the map can be zoomed in by double clicking on it and
      // zoomed out by double clicking while holding shift. If passed
      // `'center'`, double-click zoom will zoom to the center of the
      //  view regardless of where the mouse was.
      doubleClickZoom: !0
    });
    var us = di.extend({
      addHooks: function() {
        this._map.on("dblclick", this._onDoubleClick, this);
      },
      removeHooks: function() {
        this._map.off("dblclick", this._onDoubleClick, this);
      },
      _onDoubleClick: function(t) {
        var n = this._map, s = n.getZoom(), c = n.options.zoomDelta, m = t.originalEvent.shiftKey ? s - c : s + c;
        n.options.doubleClickZoom === "center" ? n.setZoom(m) : n.setZoomAround(t.containerPoint, m);
      }
    });
    ie.addInitHook("addHandler", "doubleClickZoom", us), ie.mergeOptions({
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
    var hs = di.extend({
      addHooks: function() {
        if (!this._draggable) {
          var t = this._map;
          this._draggable = new Ri(t._mapPane, t._container), this._draggable.on({
            dragstart: this._onDragStart,
            drag: this._onDrag,
            dragend: this._onDragEnd
          }, this), this._draggable.on("predrag", this._onPreDragLimit, this), t.options.worldCopyJump && (this._draggable.on("predrag", this._onPreDragWrap, this), t.on("zoomend", this._onZoomEnd, this), t.whenReady(this._onZoomEnd, this));
        }
        Wt(this._map._container, "leaflet-grab leaflet-touch-drag"), this._draggable.enable(), this._positions = [], this._times = [];
      },
      removeHooks: function() {
        Le(this._map._container, "leaflet-grab"), Le(this._map._container, "leaflet-touch-drag"), this._draggable.disable();
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
          var n = Qt(this._map.options.maxBounds);
          this._offsetLimit = It(
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
        var t = this._worldWidth, n = Math.round(t / 2), s = this._initialWorldOffset, c = this._draggable._newPos.x, m = (c - n + s) % t + n - s, E = (c + n + s) % t - n - s, $ = Math.abs(m + s) < Math.abs(E + s) ? m : E;
        this._draggable._absPos = this._draggable._newPos.clone(), this._draggable._newPos.x = $;
      },
      _onDragEnd: function(t) {
        var n = this._map, s = n.options, c = !s.inertia || t.noInertia || this._times.length < 2;
        if (n.fire("dragend", t), c)
          n.fire("moveend");
        else {
          this._prunePositions(+/* @__PURE__ */ new Date());
          var m = this._lastPos.subtract(this._positions[0]), E = (this._lastTime - this._times[0]) / 1e3, $ = s.easeLinearity, it = m.multiplyBy($ / E), st = it.distanceTo([0, 0]), yt = Math.min(s.inertiaMaxSpeed, st), Pt = it.multiplyBy(yt / st), $t = yt / (s.inertiaDeceleration * $), te = Pt.multiplyBy(-$t / 2).round();
          !te.x && !te.y ? n.fire("moveend") : (te = n._limitOffset(te, n.options.maxBounds), Kt(function() {
            n.panBy(te, {
              duration: $t,
              easeLinearity: $,
              noMoveStart: !0,
              animate: !0
            });
          }));
        }
      }
    });
    ie.addInitHook("addHandler", "dragging", hs), ie.mergeOptions({
      // @option keyboard: Boolean = true
      // Makes the map focusable and allows users to navigate the map with keyboard
      // arrows and `+`/`-` keys.
      keyboard: !0,
      // @option keyboardPanDelta: Number = 80
      // Amount of pixels to pan when pressing an arrow key.
      keyboardPanDelta: 80
    });
    var cs = di.extend({
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
        t.tabIndex <= 0 && (t.tabIndex = "0"), qt(t, {
          focus: this._onFocus,
          blur: this._onBlur,
          mousedown: this._onMouseDown
        }, this), this._map.on({
          focus: this._addHooks,
          blur: this._removeHooks
        }, this);
      },
      removeHooks: function() {
        this._removeHooks(), ue(this._map._container, {
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
        var n = this._panKeys = {}, s = this.keyCodes, c, m;
        for (c = 0, m = s.left.length; c < m; c++)
          n[s.left[c]] = [-1 * t, 0];
        for (c = 0, m = s.right.length; c < m; c++)
          n[s.right[c]] = [t, 0];
        for (c = 0, m = s.down.length; c < m; c++)
          n[s.down[c]] = [0, t];
        for (c = 0, m = s.up.length; c < m; c++)
          n[s.up[c]] = [0, -1 * t];
      },
      _setZoomDelta: function(t) {
        var n = this._zoomKeys = {}, s = this.keyCodes, c, m;
        for (c = 0, m = s.zoomIn.length; c < m; c++)
          n[s.zoomIn[c]] = t;
        for (c = 0, m = s.zoomOut.length; c < m; c++)
          n[s.zoomOut[c]] = -t;
      },
      _addHooks: function() {
        qt(document, "keydown", this._onKeyDown, this);
      },
      _removeHooks: function() {
        ue(document, "keydown", this._onKeyDown, this);
      },
      _onKeyDown: function(t) {
        if (!(t.altKey || t.ctrlKey || t.metaKey)) {
          var n = t.keyCode, s = this._map, c;
          if (n in this._panKeys) {
            if (!s._panAnim || !s._panAnim._inProgress)
              if (c = this._panKeys[n], t.shiftKey && (c = mt(c).multiplyBy(3)), s.options.maxBounds && (c = s._limitOffset(mt(c), s.options.maxBounds)), s.options.worldCopyJump) {
                var m = s.wrapLatLng(s.unproject(s.project(s.getCenter()).add(c)));
                s.panTo(m);
              } else
                s.panBy(c);
          } else if (n in this._zoomKeys)
            s.setZoom(s.getZoom() + (t.shiftKey ? 3 : 1) * this._zoomKeys[n]);
          else if (n === 27 && s._popup && s._popup.options.closeOnEscapeKey)
            s.closePopup();
          else
            return;
          Ki(t);
        }
      }
    });
    ie.addInitHook("addHandler", "keyboard", cs), ie.mergeOptions({
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
    var Yi = di.extend({
      addHooks: function() {
        qt(this._map._container, "wheel", this._onWheelScroll, this), this._delta = 0;
      },
      removeHooks: function() {
        ue(this._map._container, "wheel", this._onWheelScroll, this);
      },
      _onWheelScroll: function(t) {
        var n = $a(t), s = this._map.options.wheelDebounceTime;
        this._delta += n, this._lastMousePos = this._map.mouseEventToContainerPoint(t), this._startTime || (this._startTime = +/* @__PURE__ */ new Date());
        var c = Math.max(s - (+/* @__PURE__ */ new Date() - this._startTime), 0);
        clearTimeout(this._timer), this._timer = setTimeout(w(this._performZoom, this), c), Ki(t);
      },
      _performZoom: function() {
        var t = this._map, n = t.getZoom(), s = this._map.options.zoomSnap || 0;
        t._stop();
        var c = this._delta / (this._map.options.wheelPxPerZoomLevel * 4), m = 4 * Math.log(2 / (1 + Math.exp(-Math.abs(c)))) / Math.LN2, E = s ? Math.ceil(m / s) * s : m, $ = t._limitZoom(n + (this._delta > 0 ? E : -E)) - n;
        this._delta = 0, this._startTime = null, $ && (t.options.scrollWheelZoom === "center" ? t.setZoom(n + $) : t.setZoomAround(this._lastMousePos, n + $));
      }
    });
    ie.addInitHook("addHandler", "scrollWheelZoom", Yi);
    var ds = 600;
    ie.mergeOptions({
      // @section Touch interaction options
      // @option tapHold: Boolean
      // Enables simulation of `contextmenu` event, default is `true` for mobile Safari.
      tapHold: Rt.touchNative && Rt.safari && Rt.mobile,
      // @option tapTolerance: Number = 15
      // The max number of pixels a user can shift his finger during touch
      // for it to be considered a valid tap.
      tapTolerance: 15
    });
    var ta = di.extend({
      addHooks: function() {
        qt(this._map._container, "touchstart", this._onDown, this);
      },
      removeHooks: function() {
        ue(this._map._container, "touchstart", this._onDown, this);
      },
      _onDown: function(t) {
        if (clearTimeout(this._holdTimeout), t.touches.length === 1) {
          var n = t.touches[0];
          this._startPos = this._newPos = new pt(n.clientX, n.clientY), this._holdTimeout = setTimeout(w(function() {
            this._cancel(), this._isTapValid() && (qt(document, "touchend", Ie), qt(document, "touchend touchcancel", this._cancelClickPrevent), this._simulateEvent("contextmenu", n));
          }, this), ds), qt(document, "touchend touchcancel contextmenu", this._cancel, this), qt(document, "touchmove", this._onMove, this);
        }
      },
      _cancelClickPrevent: function t() {
        ue(document, "touchend", Ie), ue(document, "touchend touchcancel", t);
      },
      _cancel: function() {
        clearTimeout(this._holdTimeout), ue(document, "touchend touchcancel contextmenu", this._cancel, this), ue(document, "touchmove", this._onMove, this);
      },
      _onMove: function(t) {
        var n = t.touches[0];
        this._newPos = new pt(n.clientX, n.clientY);
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
    ie.addInitHook("addHandler", "tapHold", ta), ie.mergeOptions({
      // @section Touch interaction options
      // @option touchZoom: Boolean|String = *
      // Whether the map can be zoomed by touch-dragging with two fingers. If
      // passed `'center'`, it will zoom to the center of the view regardless of
      // where the touch events (fingers) were. Enabled for touch-capable web
      // browsers.
      touchZoom: Rt.touch,
      // @option bounceAtZoomLimits: Boolean = true
      // Set it to false if you don't want the map to zoom beyond min/max zoom
      // and then bounce back when pinch-zooming.
      bounceAtZoomLimits: !0
    });
    var ea = di.extend({
      addHooks: function() {
        Wt(this._map._container, "leaflet-touch-zoom"), qt(this._map._container, "touchstart", this._onTouchStart, this);
      },
      removeHooks: function() {
        Le(this._map._container, "leaflet-touch-zoom"), ue(this._map._container, "touchstart", this._onTouchStart, this);
      },
      _onTouchStart: function(t) {
        var n = this._map;
        if (!(!t.touches || t.touches.length !== 2 || n._animatingZoom || this._zooming)) {
          var s = n.mouseEventToContainerPoint(t.touches[0]), c = n.mouseEventToContainerPoint(t.touches[1]);
          this._centerPoint = n.getSize()._divideBy(2), this._startLatLng = n.containerPointToLatLng(this._centerPoint), n.options.touchZoom !== "center" && (this._pinchStartLatLng = n.containerPointToLatLng(s.add(c)._divideBy(2))), this._startDist = s.distanceTo(c), this._startZoom = n.getZoom(), this._moved = !1, this._zooming = !0, n._stop(), qt(document, "touchmove", this._onTouchMove, this), qt(document, "touchend touchcancel", this._onTouchEnd, this), Ie(t);
        }
      },
      _onTouchMove: function(t) {
        if (!(!t.touches || t.touches.length !== 2 || !this._zooming)) {
          var n = this._map, s = n.mouseEventToContainerPoint(t.touches[0]), c = n.mouseEventToContainerPoint(t.touches[1]), m = s.distanceTo(c) / this._startDist;
          if (this._zoom = n.getScaleZoom(m, this._startZoom), !n.options.bounceAtZoomLimits && (this._zoom < n.getMinZoom() && m < 1 || this._zoom > n.getMaxZoom() && m > 1) && (this._zoom = n._limitZoom(this._zoom)), n.options.touchZoom === "center") {
            if (this._center = this._startLatLng, m === 1)
              return;
          } else {
            var E = s._add(c)._divideBy(2)._subtract(this._centerPoint);
            if (m === 1 && E.x === 0 && E.y === 0)
              return;
            this._center = n.unproject(n.project(this._pinchStartLatLng, this._zoom).subtract(E), this._zoom);
          }
          this._moved || (n._moveStart(!0, !1), this._moved = !0), me(this._animRequest);
          var $ = w(n._move, n, this._center, this._zoom, { pinch: !0, round: !1 }, void 0);
          this._animRequest = Kt($, this, !0), Ie(t);
        }
      },
      _onTouchEnd: function() {
        if (!this._moved || !this._zooming) {
          this._zooming = !1;
          return;
        }
        this._zooming = !1, me(this._animRequest), ue(document, "touchmove", this._onTouchMove, this), ue(document, "touchend touchcancel", this._onTouchEnd, this), this._map.options.zoomAnimation ? this._map._animateZoom(this._center, this._map._limitZoom(this._zoom), !0, this._map.options.zoomSnap) : this._map._resetView(this._center, this._map._limitZoom(this._zoom));
      }
    });
    ie.addInitHook("addHandler", "touchZoom", ea), ie.BoxZoom = bn, ie.DoubleClickZoom = us, ie.Drag = hs, ie.Keyboard = cs, ie.ScrollWheelZoom = Yi, ie.TapHold = ta, ie.TouchZoom = ea, d.Bounds = _t, d.Browser = Rt, d.CRS = Ce, d.Canvas = cr, d.Circle = yn, d.CircleMarker = lr, d.Class = be, d.Control = oi, d.DivIcon = zi, d.DivOverlay = _i, d.DomEvent = ae, d.DomUtil = to, d.Draggable = Ri, d.Evented = le, d.FeatureGroup = pi, d.GeoJSON = Ei, d.GridLayer = zn, d.Handler = di, d.Icon = gn, d.ImageOverlay = vn, d.LatLng = jt, d.LatLngBounds = Tt, d.Layer = Ze, d.LayerGroup = Ci, d.LineUtil = rr, d.Map = ie, d.Marker = or, d.Mixin = ro, d.Path = ni, d.Point = pt, d.PolyUtil = Ka, d.Polygon = Ne, d.Polyline = ki, d.Popup = Rn, d.PosAnimation = Ua, d.Projection = Ya, d.Rectangle = dr, d.Renderer = mi, d.SVG = Ee, d.SVGOverlay = Yr, d.TileLayer = ji, d.Tooltip = hr, d.Transformation = Cn, d.Util = Ge, d.VideoOverlay = ns, d.bind = w, d.bounds = It, d.canvas = Qr, d.circle = ho, d.circleMarker = Hr, d.control = cn, d.divIcon = Nn, d.extend = k, d.featureGroup = lo, d.geoJSON = is, d.geoJson = co, d.gridLayer = rs, d.icon = uo, d.imageOverlay = fo, d.latLng = Gt, d.latLngBounds = Qt, d.layerGroup = sr, d.map = ir, d.marker = ts, d.point = mt, d.polygon = Wr, d.polyline = Kr, d.popup = mo, d.rectangle = vo, d.setOptions = X, d.stamp = x, d.svg = ls, d.svgOverlay = _o, d.tileLayer = as, d.tooltip = go, d.transformation = Si, d.version = y, d.videoOverlay = po;
    var ze = window.L;
    d.noConflict = function() {
      return window.L = ze, this;
    }, window.L = d;
  });
})(Do, Do.exports);
var Oh = Do.exports;
const ua = /* @__PURE__ */ Ih(Oh);
(() => {
  var sl, ol;
  var h = Object.create, l = Object.defineProperty, d = Object.getOwnPropertyDescriptor, y = Object.getOwnPropertyNames, k = Object.getPrototypeOf, I = Object.prototype.hasOwnProperty, w = (e, i) => () => (i || e((i = { exports: {} }).exports, i), i.exports), v = (e, i, r, a) => {
    if (i && typeof i == "object" || typeof i == "function") for (let o of y(i)) !I.call(e, o) && o !== r && l(e, o, { get: () => i[o], enumerable: !(a = d(i, o)) || a.enumerable });
    return e;
  }, x = (e, i, r) => (r = e != null ? h(k(e)) : {}, v(i || !e || !e.__esModule ? l(r, "default", { value: e, enumerable: !0 }) : r, e)), R = w((e, i) => {
    function r() {
      this.__data__ = [], this.size = 0;
    }
    i.exports = r;
  }), U = w((e, i) => {
    function r(a, o) {
      return a === o || a !== a && o !== o;
    }
    i.exports = r;
  }), A = w((e, i) => {
    var r = U();
    function a(o, u) {
      for (var f = o.length; f--; ) if (r(o[f][0], u)) return f;
      return -1;
    }
    i.exports = a;
  }), j = w((e, i) => {
    var r = A(), a = Array.prototype, o = a.splice;
    function u(f) {
      var _ = this.__data__, b = r(_, f);
      if (b < 0) return !1;
      var C = _.length - 1;
      return b == C ? _.pop() : o.call(_, b, 1), --this.size, !0;
    }
    i.exports = u;
  }), N = w((e, i) => {
    var r = A();
    function a(o) {
      var u = this.__data__, f = r(u, o);
      return f < 0 ? void 0 : u[f][1];
    }
    i.exports = a;
  }), J = w((e, i) => {
    var r = A();
    function a(o) {
      return r(this.__data__, o) > -1;
    }
    i.exports = a;
  }), X = w((e, i) => {
    var r = A();
    function a(o, u) {
      var f = this.__data__, _ = r(f, o);
      return _ < 0 ? (++this.size, f.push([o, u])) : f[_][1] = u, this;
    }
    i.exports = a;
  }), dt = w((e, i) => {
    var r = R(), a = j(), o = N(), u = J(), f = X();
    function _(b) {
      var C = -1, F = b == null ? 0 : b.length;
      for (this.clear(); ++C < F; ) {
        var S = b[C];
        this.set(S[0], S[1]);
      }
    }
    _.prototype.clear = r, _.prototype.delete = a, _.prototype.get = o, _.prototype.has = u, _.prototype.set = f, i.exports = _;
  }), Q = w((e, i) => {
    var r = dt();
    function a() {
      this.__data__ = new r(), this.size = 0;
    }
    i.exports = a;
  }), Et = w((e, i) => {
    function r(a) {
      var o = this.__data__, u = o.delete(a);
      return this.size = o.size, u;
    }
    i.exports = r;
  }), At = w((e, i) => {
    function r(a) {
      return this.__data__.get(a);
    }
    i.exports = r;
  }), pe = w((e, i) => {
    function r(a) {
      return this.__data__.has(a);
    }
    i.exports = r;
  }), Mt = w((e, i) => {
    var r = typeof ma == "object" && ma && ma.Object === Object && ma;
    i.exports = r;
  }), Ct = w((e, i) => {
    var r = Mt(), a = typeof self == "object" && self && self.Object === Object && self, o = r || a || Function("return this")();
    i.exports = o;
  }), Dt = w((e, i) => {
    var r = Ct(), a = r.Symbol;
    i.exports = a;
  }), re = w((e, i) => {
    var r = Dt(), a = Object.prototype, o = a.hasOwnProperty, u = a.toString, f = r ? r.toStringTag : void 0;
    function _(b) {
      var C = o.call(b, f), F = b[f];
      try {
        b[f] = void 0;
        var S = !0;
      } catch {
      }
      var Z = u.call(b);
      return S && (C ? b[f] = F : delete b[f]), Z;
    }
    i.exports = _;
  }), ee = w((e, i) => {
    var r = Object.prototype, a = r.toString;
    function o(u) {
      return a.call(u);
    }
    i.exports = o;
  }), Yt = w((e, i) => {
    var r = Dt(), a = re(), o = ee(), u = "[object Null]", f = "[object Undefined]", _ = r ? r.toStringTag : void 0;
    function b(C) {
      return C == null ? C === void 0 ? f : u : _ && _ in Object(C) ? a(C) : o(C);
    }
    i.exports = b;
  }), Kt = w((e, i) => {
    function r(a) {
      var o = typeof a;
      return a != null && (o == "object" || o == "function");
    }
    i.exports = r;
  }), me = w((e, i) => {
    var r = Yt(), a = Kt(), o = "[object AsyncFunction]", u = "[object Function]", f = "[object GeneratorFunction]", _ = "[object Proxy]";
    function b(C) {
      if (!a(C)) return !1;
      var F = r(C);
      return F == u || F == f || F == o || F == _;
    }
    i.exports = b;
  }), Ge = w((e, i) => {
    var r = Ct(), a = r["__core-js_shared__"];
    i.exports = a;
  }), be = w((e, i) => {
    var r = Ge(), a = function() {
      var u = /[^.]+$/.exec(r && r.keys && r.keys.IE_PROTO || "");
      return u ? "Symbol(src)_1." + u : "";
    }();
    function o(u) {
      return !!a && a in u;
    }
    i.exports = o;
  }), St = w((e, i) => {
    var r = Function.prototype, a = r.toString;
    function o(u) {
      if (u != null) {
        try {
          return a.call(u);
        } catch {
        }
        try {
          return u + "";
        } catch {
        }
      }
      return "";
    }
    i.exports = o;
  }), zt = w((e, i) => {
    var r = me(), a = be(), o = Kt(), u = St(), f = /[\\^$.*+?()[\]{}|]/g, _ = /^\[object .+?Constructor\]$/, b = Function.prototype, C = Object.prototype, F = b.toString, S = C.hasOwnProperty, Z = RegExp("^" + F.call(S).replace(f, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$");
    function W(lt) {
      if (!o(lt) || a(lt)) return !1;
      var vt = r(lt) ? Z : _;
      return vt.test(u(lt));
    }
    i.exports = W;
  }), le = w((e, i) => {
    function r(a, o) {
      return a == null ? void 0 : a[o];
    }
    i.exports = r;
  }), pt = w((e, i) => {
    var r = zt(), a = le();
    function o(u, f) {
      var _ = a(u, f);
      return r(_) ? _ : void 0;
    }
    i.exports = o;
  }), bt = w((e, i) => {
    var r = pt(), a = Ct(), o = r(a, "Map");
    i.exports = o;
  }), mt = w((e, i) => {
    var r = pt(), a = r(Object, "create");
    i.exports = a;
  }), _t = w((e, i) => {
    var r = mt();
    function a() {
      this.__data__ = r ? r(null) : {}, this.size = 0;
    }
    i.exports = a;
  }), It = w((e, i) => {
    function r(a) {
      var o = this.has(a) && delete this.__data__[a];
      return this.size -= o ? 1 : 0, o;
    }
    i.exports = r;
  }), Tt = w((e, i) => {
    var r = mt(), a = "__lodash_hash_undefined__", o = Object.prototype, u = o.hasOwnProperty;
    function f(_) {
      var b = this.__data__;
      if (r) {
        var C = b[_];
        return C === a ? void 0 : C;
      }
      return u.call(b, _) ? b[_] : void 0;
    }
    i.exports = f;
  }), Qt = w((e, i) => {
    var r = mt(), a = Object.prototype, o = a.hasOwnProperty;
    function u(f) {
      var _ = this.__data__;
      return r ? _[f] !== void 0 : o.call(_, f);
    }
    i.exports = u;
  }), jt = w((e, i) => {
    var r = mt(), a = "__lodash_hash_undefined__";
    function o(u, f) {
      var _ = this.__data__;
      return this.size += this.has(u) ? 0 : 1, _[u] = r && f === void 0 ? a : f, this;
    }
    i.exports = o;
  }), Gt = w((e, i) => {
    var r = _t(), a = It(), o = Tt(), u = Qt(), f = jt();
    function _(b) {
      var C = -1, F = b == null ? 0 : b.length;
      for (this.clear(); ++C < F; ) {
        var S = b[C];
        this.set(S[0], S[1]);
      }
    }
    _.prototype.clear = r, _.prototype.delete = a, _.prototype.get = o, _.prototype.has = u, _.prototype.set = f, i.exports = _;
  }), Ce = w((e, i) => {
    var r = Gt(), a = dt(), o = bt();
    function u() {
      this.size = 0, this.__data__ = { hash: new r(), map: new (o || a)(), string: new r() };
    }
    i.exports = u;
  }), xe = w((e, i) => {
    function r(a) {
      var o = typeof a;
      return o == "string" || o == "number" || o == "symbol" || o == "boolean" ? a !== "__proto__" : a === null;
    }
    i.exports = r;
  }), Li = w((e, i) => {
    var r = xe();
    function a(o, u) {
      var f = o.__data__;
      return r(u) ? f[typeof u == "string" ? "string" : "hash"] : f.map;
    }
    i.exports = a;
  }), sn = w((e, i) => {
    var r = Li();
    function a(o) {
      var u = r(this, o).delete(o);
      return this.size -= u ? 1 : 0, u;
    }
    i.exports = a;
  }), Cn = w((e, i) => {
    var r = Li();
    function a(o) {
      return r(this, o).get(o);
    }
    i.exports = a;
  }), Si = w((e, i) => {
    var r = Li();
    function a(o) {
      return r(this, o).has(o);
    }
    i.exports = a;
  }), ui = w((e, i) => {
    var r = Li();
    function a(o, u) {
      var f = r(this, o), _ = f.size;
      return f.set(o, u), this.size += f.size == _ ? 0 : 1, this;
    }
    i.exports = a;
  }), Ai = w((e, i) => {
    var r = Ce(), a = sn(), o = Cn(), u = Si(), f = ui();
    function _(b) {
      var C = -1, F = b == null ? 0 : b.length;
      for (this.clear(); ++C < F; ) {
        var S = b[C];
        this.set(S[0], S[1]);
      }
    }
    _.prototype.clear = r, _.prototype.delete = a, _.prototype.get = o, _.prototype.has = u, _.prototype.set = f, i.exports = _;
  }), qn = w((e, i) => {
    var r = dt(), a = bt(), o = Ai(), u = 200;
    function f(_, b) {
      var C = this.__data__;
      if (C instanceof r) {
        var F = C.__data__;
        if (!a || F.length < u - 1) return F.push([_, b]), this.size = ++C.size, this;
        C = this.__data__ = new o(F);
      }
      return C.set(_, b), this.size = C.size, this;
    }
    i.exports = f;
  }), Hn = w((e, i) => {
    var r = dt(), a = Q(), o = Et(), u = At(), f = pe(), _ = qn();
    function b(C) {
      var F = this.__data__ = new r(C);
      this.size = F.size;
    }
    b.prototype.clear = a, b.prototype.delete = o, b.prototype.get = u, b.prototype.has = f, b.prototype.set = _, i.exports = b;
  }), Ti = w((e, i) => {
    var r = pt(), a = function() {
      try {
        var o = r(Object, "defineProperty");
        return o({}, "", {}), o;
      } catch {
      }
    }();
    i.exports = a;
  }), Di = w((e, i) => {
    var r = Ti();
    function a(o, u, f) {
      u == "__proto__" && r ? r(o, u, { configurable: !0, enumerable: !0, value: f, writable: !0 }) : o[u] = f;
    }
    i.exports = a;
  }), Kn = w((e, i) => {
    var r = Di(), a = U();
    function o(u, f, _) {
      (_ !== void 0 && !a(u[f], _) || _ === void 0 && !(f in u)) && r(u, f, _);
    }
    i.exports = o;
  }), kn = w((e, i) => {
    function r(a) {
      return function(o, u, f) {
        for (var _ = -1, b = Object(o), C = f(o), F = C.length; F--; ) {
          var S = C[a ? F : ++_];
          if (u(b[S], S, b) === !1) break;
        }
        return o;
      };
    }
    i.exports = r;
  }), Ii = w((e, i) => {
    var r = kn(), a = r();
    i.exports = a;
  }), Je = w((e, i) => {
    var r = Ct(), a = typeof e == "object" && e && !e.nodeType && e, o = a && typeof i == "object" && i && !i.nodeType && i, u = o && o.exports === a, f = u ? r.Buffer : void 0, _ = f ? f.allocUnsafe : void 0;
    function b(C, F) {
      if (F) return C.slice();
      var S = C.length, Z = _ ? _(S) : new C.constructor(S);
      return C.copy(Z), Z;
    }
    i.exports = b;
  }), on = w((e, i) => {
    var r = Ct(), a = r.Uint8Array;
    i.exports = a;
  }), wr = w((e, i) => {
    var r = on();
    function a(o) {
      var u = new o.constructor(o.byteLength);
      return new r(u).set(new r(o)), u;
    }
    i.exports = a;
  }), hi = w((e, i) => {
    var r = wr();
    function a(o, u) {
      var f = u ? r(o.buffer) : o.buffer;
      return new o.constructor(f, o.byteOffset, o.length);
    }
    i.exports = a;
  }), En = w((e, i) => {
    function r(a, o) {
      var u = -1, f = a.length;
      for (o || (o = Array(f)); ++u < f; ) o[u] = a[u];
      return o;
    }
    i.exports = r;
  }), B = w((e, i) => {
    var r = Kt(), a = Object.create, o = /* @__PURE__ */ function() {
      function u() {
      }
      return function(f) {
        if (!r(f)) return {};
        if (a) return a(f);
        u.prototype = f;
        var _ = new u();
        return u.prototype = void 0, _;
      };
    }();
    i.exports = o;
  }), p = w((e, i) => {
    function r(a, o) {
      return function(u) {
        return a(o(u));
      };
    }
    i.exports = r;
  }), g = w((e, i) => {
    var r = p(), a = r(Object.getPrototypeOf, Object);
    i.exports = a;
  }), O = w((e, i) => {
    var r = Object.prototype;
    function a(o) {
      var u = o && o.constructor, f = typeof u == "function" && u.prototype || r;
      return o === f;
    }
    i.exports = a;
  }), K = w((e, i) => {
    var r = B(), a = g(), o = O();
    function u(f) {
      return typeof f.constructor == "function" && !o(f) ? r(a(f)) : {};
    }
    i.exports = u;
  }), at = w((e, i) => {
    function r(a) {
      return a != null && typeof a == "object";
    }
    i.exports = r;
  }), ft = w((e, i) => {
    var r = Yt(), a = at(), o = "[object Arguments]";
    function u(f) {
      return a(f) && r(f) == o;
    }
    i.exports = u;
  }), Zt = w((e, i) => {
    var r = ft(), a = at(), o = Object.prototype, u = o.hasOwnProperty, f = o.propertyIsEnumerable, _ = r(/* @__PURE__ */ function() {
      return arguments;
    }()) ? r : function(b) {
      return a(b) && u.call(b, "callee") && !f.call(b, "callee");
    };
    i.exports = _;
  }), de = w((e, i) => {
    var r = Array.isArray;
    i.exports = r;
  }), _e = w((e, i) => {
    var r = 9007199254740991;
    function a(o) {
      return typeof o == "number" && o > -1 && o % 1 == 0 && o <= r;
    }
    i.exports = a;
  }), ce = w((e, i) => {
    var r = me(), a = _e();
    function o(u) {
      return u != null && a(u.length) && !r(u);
    }
    i.exports = o;
  }), fe = w((e, i) => {
    var r = ce(), a = at();
    function o(u) {
      return a(u) && r(u);
    }
    i.exports = o;
  }), Fs = w((e, i) => {
    function r() {
      return !1;
    }
    i.exports = r;
  }), Cr = w((e, i) => {
    var r = Ct(), a = Fs(), o = typeof e == "object" && e && !e.nodeType && e, u = o && typeof i == "object" && i && !i.nodeType && i, f = u && u.exports === o, _ = f ? r.Buffer : void 0, b = _ ? _.isBuffer : void 0, C = b || a;
    i.exports = C;
  }), Ea = w((e, i) => {
    var r = Yt(), a = g(), o = at(), u = "[object Object]", f = Function.prototype, _ = Object.prototype, b = f.toString, C = _.hasOwnProperty, F = b.call(Object);
    function S(Z) {
      if (!o(Z) || r(Z) != u) return !1;
      var W = a(Z);
      if (W === null) return !0;
      var lt = C.call(W, "constructor") && W.constructor;
      return typeof lt == "function" && lt instanceof lt && b.call(lt) == F;
    }
    i.exports = S;
  }), Ma = w((e, i) => {
    var r = Yt(), a = _e(), o = at(), u = "[object Arguments]", f = "[object Array]", _ = "[object Boolean]", b = "[object Date]", C = "[object Error]", F = "[object Function]", S = "[object Map]", Z = "[object Number]", W = "[object Object]", lt = "[object RegExp]", vt = "[object Set]", kt = "[object String]", Bt = "[object WeakMap]", D = "[object ArrayBuffer]", et = "[object DataView]", ot = "[object Float32Array]", Lt = "[object Float64Array]", xt = "[object Int8Array]", wt = "[object Int16Array]", M = "[object Int32Array]", P = "[object Uint8Array]", T = "[object Uint8ClampedArray]", q = "[object Uint16Array]", V = "[object Uint32Array]", z = {};
    z[ot] = z[Lt] = z[xt] = z[wt] = z[M] = z[P] = z[T] = z[q] = z[V] = !0, z[u] = z[f] = z[D] = z[_] = z[et] = z[b] = z[C] = z[F] = z[S] = z[Z] = z[W] = z[lt] = z[vt] = z[kt] = z[Bt] = !1;
    function tt(H) {
      return o(H) && a(H.length) && !!z[r(H)];
    }
    i.exports = tt;
  }), Rs = w((e, i) => {
    function r(a) {
      return function(o) {
        return a(o);
      };
    }
    i.exports = r;
  }), Ns = w((e, i) => {
    var r = Mt(), a = typeof e == "object" && e && !e.nodeType && e, o = a && typeof i == "object" && i && !i.nodeType && i, u = o && o.exports === a, f = u && r.process, _ = function() {
      try {
        var b = o && o.require && o.require("util").types;
        return b || f && f.binding && f.binding("util");
      } catch {
      }
    }();
    i.exports = _;
  }), Ba = w((e, i) => {
    var r = Ma(), a = Rs(), o = Ns(), u = o && o.isTypedArray, f = u ? a(u) : r;
    i.exports = f;
  }), Pa = w((e, i) => {
    function r(a, o) {
      if (!(o === "constructor" && typeof a[o] == "function") && o != "__proto__") return a[o];
    }
    i.exports = r;
  }), zs = w((e, i) => {
    var r = Di(), a = U(), o = Object.prototype, u = o.hasOwnProperty;
    function f(_, b, C) {
      var F = _[b];
      (!(u.call(_, b) && a(F, C)) || C === void 0 && !(b in _)) && r(_, b, C);
    }
    i.exports = f;
  }), js = w((e, i) => {
    var r = zs(), a = Di();
    function o(u, f, _, b) {
      var C = !_;
      _ || (_ = {});
      for (var F = -1, S = f.length; ++F < S; ) {
        var Z = f[F], W = b ? b(_[Z], u[Z], Z, _, u) : void 0;
        W === void 0 && (W = u[Z]), C ? a(_, Z, W) : r(_, Z, W);
      }
      return _;
    }
    i.exports = o;
  }), kr = w((e, i) => {
    function r(a, o) {
      for (var u = -1, f = Array(a); ++u < a; ) f[u] = o(u);
      return f;
    }
    i.exports = r;
  }), Sa = w((e, i) => {
    var r = 9007199254740991, a = /^(?:0|[1-9]\d*)$/;
    function o(u, f) {
      var _ = typeof u;
      return f = f ?? r, !!f && (_ == "number" || _ != "symbol" && a.test(u)) && u > -1 && u % 1 == 0 && u < f;
    }
    i.exports = o;
  }), $s = w((e, i) => {
    var r = kr(), a = Zt(), o = de(), u = Cr(), f = Sa(), _ = Ba(), b = Object.prototype, C = b.hasOwnProperty;
    function F(S, Z) {
      var W = o(S), lt = !W && a(S), vt = !W && !lt && u(S), kt = !W && !lt && !vt && _(S), Bt = W || lt || vt || kt, D = Bt ? r(S.length, String) : [], et = D.length;
      for (var ot in S) (Z || C.call(S, ot)) && !(Bt && (ot == "length" || vt && (ot == "offset" || ot == "parent") || kt && (ot == "buffer" || ot == "byteLength" || ot == "byteOffset") || f(ot, et))) && D.push(ot);
      return D;
    }
    i.exports = F;
  }), Us = w((e, i) => {
    function r(a) {
      var o = [];
      if (a != null) for (var u in Object(a)) o.push(u);
      return o;
    }
    i.exports = r;
  }), Vs = w((e, i) => {
    var r = Kt(), a = O(), o = Us(), u = Object.prototype, f = u.hasOwnProperty;
    function _(b) {
      if (!r(b)) return o(b);
      var C = a(b), F = [];
      for (var S in b) S == "constructor" && (C || !f.call(b, S)) || F.push(S);
      return F;
    }
    i.exports = _;
  }), si = w((e, i) => {
    var r = $s(), a = Vs(), o = ce();
    function u(f) {
      return o(f) ? r(f, !0) : a(f);
    }
    i.exports = u;
  }), Rt = w((e, i) => {
    var r = js(), a = si();
    function o(u) {
      return r(u, a(u));
    }
    i.exports = o;
  }), Aa = w((e, i) => {
    var r = Kn(), a = Je(), o = hi(), u = En(), f = K(), _ = Zt(), b = de(), C = fe(), F = Cr(), S = me(), Z = Kt(), W = Ea(), lt = Ba(), vt = Pa(), kt = Rt();
    function Bt(D, et, ot, Lt, xt, wt, M) {
      var P = vt(D, ot), T = vt(et, ot), q = M.get(T);
      if (q) {
        r(D, ot, q);
        return;
      }
      var V = wt ? wt(P, T, ot + "", D, et, M) : void 0, z = V === void 0;
      if (z) {
        var tt = b(T), H = !tt && F(T), Y = !tt && !H && lt(T);
        V = T, tt || H || Y ? b(P) ? V = P : C(P) ? V = u(P) : H ? (z = !1, V = a(T, !0)) : Y ? (z = !1, V = o(T, !0)) : V = [] : W(T) || _(T) ? (V = P, _(P) ? V = kt(P) : (!Z(P) || S(P)) && (V = f(T))) : z = !1;
      }
      z && (M.set(T, V), xt(V, T, Lt, wt, M), M.delete(T)), r(D, ot, V);
    }
    i.exports = Bt;
  }), Ta = w((e, i) => {
    var r = Hn(), a = Kn(), o = Ii(), u = Aa(), f = Kt(), _ = si(), b = Pa();
    function C(F, S, Z, W, lt) {
      F !== S && o(S, function(vt, kt) {
        if (lt || (lt = new r()), f(vt)) u(F, S, kt, Z, C, W, lt);
        else {
          var Bt = W ? W(b(F, kt), vt, kt + "", F, S, lt) : void 0;
          Bt === void 0 && (Bt = vt), a(F, kt, Bt);
        }
      }, _);
    }
    i.exports = C;
  }), Er = w((e, i) => {
    function r(a) {
      return a;
    }
    i.exports = r;
  }), Da = w((e, i) => {
    function r(a, o, u) {
      switch (u.length) {
        case 0:
          return a.call(o);
        case 1:
          return a.call(o, u[0]);
        case 2:
          return a.call(o, u[0], u[1]);
        case 3:
          return a.call(o, u[0], u[1], u[2]);
      }
      return a.apply(o, u);
    }
    i.exports = r;
  }), Mr = w((e, i) => {
    var r = Da(), a = Math.max;
    function o(u, f, _) {
      return f = a(f === void 0 ? u.length - 1 : f, 0), function() {
        for (var b = arguments, C = -1, F = a(b.length - f, 0), S = Array(F); ++C < F; ) S[C] = b[f + C];
        C = -1;
        for (var Z = Array(f + 1); ++C < f; ) Z[C] = b[C];
        return Z[f] = _(S), r(u, this, Z);
      };
    }
    i.exports = o;
  }), Ia = w((e, i) => {
    function r(a) {
      return function() {
        return a;
      };
    }
    i.exports = r;
  }), ln = w((e, i) => {
    var r = Ia(), a = Ti(), o = Er(), u = a ? function(f, _) {
      return a(f, "toString", { configurable: !0, enumerable: !1, value: r(_), writable: !0 });
    } : o;
    i.exports = u;
  }), Oa = w((e, i) => {
    var r = 800, a = 16, o = Date.now;
    function u(f) {
      var _ = 0, b = 0;
      return function() {
        var C = o(), F = a - (C - b);
        if (b = C, F > 0) {
          if (++_ >= r) return arguments[0];
        } else _ = 0;
        return f.apply(void 0, arguments);
      };
    }
    i.exports = u;
  }), Gs = w((e, i) => {
    var r = ln(), a = Oa(), o = a(r);
    i.exports = o;
  }), Zs = w((e, i) => {
    var r = Er(), a = Mr(), o = Gs();
    function u(f, _) {
      return o(a(f, _, r), f + "");
    }
    i.exports = u;
  }), qs = w((e, i) => {
    var r = U(), a = ce(), o = Sa(), u = Kt();
    function f(_, b, C) {
      if (!u(C)) return !1;
      var F = typeof b;
      return (F == "number" ? a(C) && o(b, C.length) : F == "string" && b in C) ? r(C[b], _) : !1;
    }
    i.exports = f;
  }), Hs = w((e, i) => {
    var r = Zs(), a = qs();
    function o(u) {
      return r(function(f, _) {
        var b = -1, C = _.length, F = C > 1 ? _[C - 1] : void 0, S = C > 2 ? _[2] : void 0;
        for (F = u.length > 3 && typeof F == "function" ? (C--, F) : void 0, S && a(_[0], _[1], S) && (F = C < 3 ? void 0 : F, C = 1), f = Object(f); ++b < C; ) {
          var Z = _[b];
          Z && u(f, Z, b, F);
        }
        return f;
      });
    }
    i.exports = o;
  }), Wn = w((e, i) => {
    var r = Ta(), a = Hs(), o = a(function(u, f, _) {
      r(u, f, _);
    });
    i.exports = o;
  }), Br = w((e, i) => {
    var r = Yt(), a = at(), o = "[object Symbol]";
    function u(f) {
      return typeof f == "symbol" || a(f) && r(f) == o;
    }
    i.exports = u;
  }), Jn = w((e, i) => {
    var r = de(), a = Br(), o = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/, u = /^\w*$/;
    function f(_, b) {
      if (r(_)) return !1;
      var C = typeof _;
      return C == "number" || C == "symbol" || C == "boolean" || _ == null || a(_) ? !0 : u.test(_) || !o.test(_) || b != null && _ in Object(b);
    }
    i.exports = f;
  }), Ks = w((e, i) => {
    var r = Ai(), a = "Expected a function";
    function o(u, f) {
      if (typeof u != "function" || f != null && typeof f != "function") throw new TypeError(a);
      var _ = function() {
        var b = arguments, C = f ? f.apply(this, b) : b[0], F = _.cache;
        if (F.has(C)) return F.get(C);
        var S = u.apply(this, b);
        return _.cache = F.set(C, S) || F, S;
      };
      return _.cache = new (o.Cache || r)(), _;
    }
    o.Cache = r, i.exports = o;
  }), Ws = w((e, i) => {
    var r = Ks(), a = 500;
    function o(u) {
      var f = r(u, function(b) {
        return _.size === a && _.clear(), b;
      }), _ = f.cache;
      return f;
    }
    i.exports = o;
  }), Js = w((e, i) => {
    var r = Ws(), a = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g, o = /\\(\\)?/g, u = r(function(f) {
      var _ = [];
      return f.charCodeAt(0) === 46 && _.push(""), f.replace(a, function(b, C, F, S) {
        _.push(F ? S.replace(o, "$1") : C || b);
      }), _;
    });
    i.exports = u;
  }), Xs = w((e, i) => {
    function r(a, o) {
      for (var u = -1, f = a == null ? 0 : a.length, _ = Array(f); ++u < f; ) _[u] = o(a[u], u, a);
      return _;
    }
    i.exports = r;
  }), Ys = w((e, i) => {
    var r = Dt(), a = Xs(), o = de(), u = Br(), f = r ? r.prototype : void 0, _ = f ? f.toString : void 0;
    function b(C) {
      if (typeof C == "string") return C;
      if (o(C)) return a(C, b) + "";
      if (u(C)) return _ ? _.call(C) : "";
      var F = C + "";
      return F == "0" && 1 / C == -1 / 0 ? "-0" : F;
    }
    i.exports = b;
  }), Pr = w((e, i) => {
    var r = Ys();
    function a(o) {
      return o == null ? "" : r(o);
    }
    i.exports = a;
  }), Mn = w((e, i) => {
    var r = de(), a = Jn(), o = Js(), u = Pr();
    function f(_, b) {
      return r(_) ? _ : a(_, b) ? [_] : o(u(_));
    }
    i.exports = f;
  }), Fa = w((e, i) => {
    var r = Br();
    function a(o) {
      if (typeof o == "string" || r(o)) return o;
      var u = o + "";
      return u == "0" && 1 / o == -1 / 0 ? "-0" : u;
    }
    i.exports = a;
  }), Ra = w((e, i) => {
    var r = Mn(), a = Fa();
    function o(u, f) {
      f = r(f, u);
      for (var _ = 0, b = f.length; u != null && _ < b; ) u = u[a(f[_++])];
      return _ && _ == b ? u : void 0;
    }
    i.exports = o;
  }), Oi = w((e, i) => {
    var r = Ra();
    function a(o, u, f) {
      var _ = o == null ? void 0 : r(o, u);
      return _ === void 0 ? f : _;
    }
    i.exports = a;
  }), oe = w((e, i) => {
    (function(r, a) {
      typeof e == "object" && typeof i < "u" ? i.exports = a() : (r = r || self).RBush = a();
    })(e, function() {
      function r(D, et, ot, Lt, xt) {
        (function wt(M, P, T, q, V) {
          for (; q > T; ) {
            if (q - T > 600) {
              var z = q - T + 1, tt = P - T + 1, H = Math.log(z), Y = 0.5 * Math.exp(2 * H / 3), rt = 0.5 * Math.sqrt(H * Y * (z - Y) / z) * (tt - z / 2 < 0 ? -1 : 1), nt = Math.max(T, Math.floor(P - tt * Y / z + rt)), gt = Math.min(q, Math.floor(P + (z - tt) * Y / z + rt));
              wt(M, P, nt, gt, V);
            }
            var Ot = M[P], Ft = T, Ht = q;
            for (a(M, T, P), V(M[q], Ot) > 0 && a(M, T, q); Ft < Ht; ) {
              for (a(M, Ft, Ht), Ft++, Ht--; V(M[Ft], Ot) < 0; ) Ft++;
              for (; V(M[Ht], Ot) > 0; ) Ht--;
            }
            V(M[T], Ot) === 0 ? a(M, T, Ht) : a(M, ++Ht, q), Ht <= P && (T = Ht + 1), P <= Ht && (q = Ht - 1);
          }
        })(D, et, ot || 0, Lt || D.length - 1, xt || o);
      }
      function a(D, et, ot) {
        var Lt = D[et];
        D[et] = D[ot], D[ot] = Lt;
      }
      function o(D, et) {
        return D < et ? -1 : D > et ? 1 : 0;
      }
      var u = function(D) {
        D === void 0 && (D = 9), this._maxEntries = Math.max(4, D), this._minEntries = Math.max(2, Math.ceil(0.4 * this._maxEntries)), this.clear();
      };
      function f(D, et, ot) {
        if (!ot) return et.indexOf(D);
        for (var Lt = 0; Lt < et.length; Lt++) if (ot(D, et[Lt])) return Lt;
        return -1;
      }
      function _(D, et) {
        b(D, 0, D.children.length, et, D);
      }
      function b(D, et, ot, Lt, xt) {
        xt || (xt = kt(null)), xt.minX = 1 / 0, xt.minY = 1 / 0, xt.maxX = -1 / 0, xt.maxY = -1 / 0;
        for (var wt = et; wt < ot; wt++) {
          var M = D.children[wt];
          C(xt, D.leaf ? Lt(M) : M);
        }
        return xt;
      }
      function C(D, et) {
        return D.minX = Math.min(D.minX, et.minX), D.minY = Math.min(D.minY, et.minY), D.maxX = Math.max(D.maxX, et.maxX), D.maxY = Math.max(D.maxY, et.maxY), D;
      }
      function F(D, et) {
        return D.minX - et.minX;
      }
      function S(D, et) {
        return D.minY - et.minY;
      }
      function Z(D) {
        return (D.maxX - D.minX) * (D.maxY - D.minY);
      }
      function W(D) {
        return D.maxX - D.minX + (D.maxY - D.minY);
      }
      function lt(D, et) {
        return D.minX <= et.minX && D.minY <= et.minY && et.maxX <= D.maxX && et.maxY <= D.maxY;
      }
      function vt(D, et) {
        return et.minX <= D.maxX && et.minY <= D.maxY && et.maxX >= D.minX && et.maxY >= D.minY;
      }
      function kt(D) {
        return { children: D, height: 1, leaf: !0, minX: 1 / 0, minY: 1 / 0, maxX: -1 / 0, maxY: -1 / 0 };
      }
      function Bt(D, et, ot, Lt, xt) {
        for (var wt = [et, ot]; wt.length; ) if (!((ot = wt.pop()) - (et = wt.pop()) <= Lt)) {
          var M = et + Math.ceil((ot - et) / Lt / 2) * Lt;
          r(D, M, et, ot, xt), wt.push(et, M, M, ot);
        }
      }
      return u.prototype.all = function() {
        return this._all(this.data, []);
      }, u.prototype.search = function(D) {
        var et = this.data, ot = [];
        if (!vt(D, et)) return ot;
        for (var Lt = this.toBBox, xt = []; et; ) {
          for (var wt = 0; wt < et.children.length; wt++) {
            var M = et.children[wt], P = et.leaf ? Lt(M) : M;
            vt(D, P) && (et.leaf ? ot.push(M) : lt(D, P) ? this._all(M, ot) : xt.push(M));
          }
          et = xt.pop();
        }
        return ot;
      }, u.prototype.collides = function(D) {
        var et = this.data;
        if (!vt(D, et)) return !1;
        for (var ot = []; et; ) {
          for (var Lt = 0; Lt < et.children.length; Lt++) {
            var xt = et.children[Lt], wt = et.leaf ? this.toBBox(xt) : xt;
            if (vt(D, wt)) {
              if (et.leaf || lt(D, wt)) return !0;
              ot.push(xt);
            }
          }
          et = ot.pop();
        }
        return !1;
      }, u.prototype.load = function(D) {
        if (!D || !D.length) return this;
        if (D.length < this._minEntries) {
          for (var et = 0; et < D.length; et++) this.insert(D[et]);
          return this;
        }
        var ot = this._build(D.slice(), 0, D.length - 1, 0);
        if (this.data.children.length) if (this.data.height === ot.height) this._splitRoot(this.data, ot);
        else {
          if (this.data.height < ot.height) {
            var Lt = this.data;
            this.data = ot, ot = Lt;
          }
          this._insert(ot, this.data.height - ot.height - 1, !0);
        }
        else this.data = ot;
        return this;
      }, u.prototype.insert = function(D) {
        return D && this._insert(D, this.data.height - 1), this;
      }, u.prototype.clear = function() {
        return this.data = kt([]), this;
      }, u.prototype.remove = function(D, et) {
        if (!D) return this;
        for (var ot, Lt, xt, wt = this.data, M = this.toBBox(D), P = [], T = []; wt || P.length; ) {
          if (wt || (wt = P.pop(), Lt = P[P.length - 1], ot = T.pop(), xt = !0), wt.leaf) {
            var q = f(D, wt.children, et);
            if (q !== -1) return wt.children.splice(q, 1), P.push(wt), this._condense(P), this;
          }
          xt || wt.leaf || !lt(wt, M) ? Lt ? (ot++, wt = Lt.children[ot], xt = !1) : wt = null : (P.push(wt), T.push(ot), ot = 0, Lt = wt, wt = wt.children[0]);
        }
        return this;
      }, u.prototype.toBBox = function(D) {
        return D;
      }, u.prototype.compareMinX = function(D, et) {
        return D.minX - et.minX;
      }, u.prototype.compareMinY = function(D, et) {
        return D.minY - et.minY;
      }, u.prototype.toJSON = function() {
        return this.data;
      }, u.prototype.fromJSON = function(D) {
        return this.data = D, this;
      }, u.prototype._all = function(D, et) {
        for (var ot = []; D; ) D.leaf ? et.push.apply(et, D.children) : ot.push.apply(ot, D.children), D = ot.pop();
        return et;
      }, u.prototype._build = function(D, et, ot, Lt) {
        var xt, wt = ot - et + 1, M = this._maxEntries;
        if (wt <= M) return _(xt = kt(D.slice(et, ot + 1)), this.toBBox), xt;
        Lt || (Lt = Math.ceil(Math.log(wt) / Math.log(M)), M = Math.ceil(wt / Math.pow(M, Lt - 1))), (xt = kt([])).leaf = !1, xt.height = Lt;
        var P = Math.ceil(wt / M), T = P * Math.ceil(Math.sqrt(M));
        Bt(D, et, ot, T, this.compareMinX);
        for (var q = et; q <= ot; q += T) {
          var V = Math.min(q + T - 1, ot);
          Bt(D, q, V, P, this.compareMinY);
          for (var z = q; z <= V; z += P) {
            var tt = Math.min(z + P - 1, V);
            xt.children.push(this._build(D, z, tt, Lt - 1));
          }
        }
        return _(xt, this.toBBox), xt;
      }, u.prototype._chooseSubtree = function(D, et, ot, Lt) {
        for (; Lt.push(et), !et.leaf && Lt.length - 1 !== ot; ) {
          for (var xt = 1 / 0, wt = 1 / 0, M = void 0, P = 0; P < et.children.length; P++) {
            var T = et.children[P], q = Z(T), V = (z = D, tt = T, (Math.max(tt.maxX, z.maxX) - Math.min(tt.minX, z.minX)) * (Math.max(tt.maxY, z.maxY) - Math.min(tt.minY, z.minY)) - q);
            V < wt ? (wt = V, xt = q < xt ? q : xt, M = T) : V === wt && q < xt && (xt = q, M = T);
          }
          et = M || et.children[0];
        }
        var z, tt;
        return et;
      }, u.prototype._insert = function(D, et, ot) {
        var Lt = ot ? D : this.toBBox(D), xt = [], wt = this._chooseSubtree(Lt, this.data, et, xt);
        for (wt.children.push(D), C(wt, Lt); et >= 0 && xt[et].children.length > this._maxEntries; ) this._split(xt, et), et--;
        this._adjustParentBBoxes(Lt, xt, et);
      }, u.prototype._split = function(D, et) {
        var ot = D[et], Lt = ot.children.length, xt = this._minEntries;
        this._chooseSplitAxis(ot, xt, Lt);
        var wt = this._chooseSplitIndex(ot, xt, Lt), M = kt(ot.children.splice(wt, ot.children.length - wt));
        M.height = ot.height, M.leaf = ot.leaf, _(ot, this.toBBox), _(M, this.toBBox), et ? D[et - 1].children.push(M) : this._splitRoot(ot, M);
      }, u.prototype._splitRoot = function(D, et) {
        this.data = kt([D, et]), this.data.height = D.height + 1, this.data.leaf = !1, _(this.data, this.toBBox);
      }, u.prototype._chooseSplitIndex = function(D, et, ot) {
        for (var Lt, xt, wt, M, P, T, q, V = 1 / 0, z = 1 / 0, tt = et; tt <= ot - et; tt++) {
          var H = b(D, 0, tt, this.toBBox), Y = b(D, tt, ot, this.toBBox), rt = (xt = H, wt = Y, M = void 0, P = void 0, T = void 0, q = void 0, M = Math.max(xt.minX, wt.minX), P = Math.max(xt.minY, wt.minY), T = Math.min(xt.maxX, wt.maxX), q = Math.min(xt.maxY, wt.maxY), Math.max(0, T - M) * Math.max(0, q - P)), nt = Z(H) + Z(Y);
          rt < V ? (V = rt, Lt = tt, z = nt < z ? nt : z) : rt === V && nt < z && (z = nt, Lt = tt);
        }
        return Lt || ot - et;
      }, u.prototype._chooseSplitAxis = function(D, et, ot) {
        var Lt = D.leaf ? this.compareMinX : F, xt = D.leaf ? this.compareMinY : S;
        this._allDistMargin(D, et, ot, Lt) < this._allDistMargin(D, et, ot, xt) && D.children.sort(Lt);
      }, u.prototype._allDistMargin = function(D, et, ot, Lt) {
        D.children.sort(Lt);
        for (var xt = this.toBBox, wt = b(D, 0, et, xt), M = b(D, ot - et, ot, xt), P = W(wt) + W(M), T = et; T < ot - et; T++) {
          var q = D.children[T];
          C(wt, D.leaf ? xt(q) : q), P += W(wt);
        }
        for (var V = ot - et - 1; V >= et; V--) {
          var z = D.children[V];
          C(M, D.leaf ? xt(z) : z), P += W(M);
        }
        return P;
      }, u.prototype._adjustParentBBoxes = function(D, et, ot) {
        for (var Lt = ot; Lt >= 0; Lt--) C(et[Lt], D);
      }, u.prototype._condense = function(D) {
        for (var et = D.length - 1, ot = void 0; et >= 0; et--) D[et].children.length === 0 ? et > 0 ? (ot = D[et - 1].children).splice(ot.indexOf(D[et]), 1) : this.clear() : _(D[et], this.toBBox);
      }, u;
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
      var u = i[o];
      if (e.call(a, u, o, i)) return u;
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
    var o = i | 0, u = Math.max(o >= 0 ? o : a - Math.abs(o), 0);
    function f(_, b) {
      return _ === b || typeof _ == "number" && typeof b == "number" && isNaN(_) && isNaN(b);
    }
    for (; u < a; ) {
      if (f(r[u], e)) return !0;
      u++;
    }
    return !1;
  } });
  var ye = { version: "2.19.3" }, Bn = x(Wn()), un = { tooltips: { placeMarker: "Click to place marker", placeMarkerTouch: "Tap the map to place a marker", firstVertex: "Click to place first vertex", continueLine: "Click to continue drawing", finishLine: "Click any existing marker to finish", finishPoly: "Click first marker to finish", finishRect: "Click to finish", startCircle: "Click to place circle center", finishCircle: "Click to finish circle", placeCircleMarker: "Click to place circle marker", placeText: "Click to place text", selectFirstLayerFor: "Select first layer for {action}", selectSecondLayerFor: "Select second layer for {action}" }, actions: { finish: "Finish", cancel: "Cancel", removeLastVertex: "Remove Last Vertex" }, buttonTitles: { drawMarkerButton: "Draw Marker", drawPolyButton: "Draw Polygons", drawLineButton: "Draw Polyline", drawCircleButton: "Draw Circle", drawRectButton: "Draw Rectangle", editButton: "Edit Layers", dragButton: "Drag Layers", cutButton: "Cut Layers", deleteButton: "Remove Layers", drawCircleMarkerButton: "Draw Circle Marker", snappingButton: "Snap dragged marker to other layers and vertices", pinningButton: "Pin shared vertices together", rotateButton: "Rotate Layers", drawTextButton: "Draw Text", scaleButton: "Scale Layers", autoTracingButton: "Auto trace Line", snapGuidesButton: "Show SnapGuides", unionButton: "Union layers", differenceButton: "Subtract layers" }, measurements: { totalLength: "Length", segmentLength: "Segment length", area: "Area", radius: "Radius", perimeter: "Perimeter", height: "Height", width: "Width", coordinates: "Position", coordinatesMarker: "Position Marker" } }, hn = { tooltips: { placeMarker: "Platziere den Marker mit Klick", placeMarkerTouch: "Tippe auf die Karte, um einen Marker zu platzieren", firstVertex: "Platziere den ersten Marker mit Klick", continueLine: "Klicke, um weiter zu zeichnen", finishLine: "Beende mit Klick auf existierenden Marker", finishPoly: "Beende mit Klick auf ersten Marker", finishRect: "Beende mit Klick", startCircle: "Platziere das Kreiszentrum mit Klick", finishCircle: "Beende den Kreis mit Klick", placeCircleMarker: "Platziere den Kreismarker mit Klick", placeText: "Platziere den Text mit Klick" }, actions: { finish: "Beenden", cancel: "Abbrechen", removeLastVertex: "Letzten Vertex löschen" }, buttonTitles: { drawMarkerButton: "Marker zeichnen", drawPolyButton: "Polygon zeichnen", drawLineButton: "Polyline zeichnen", drawCircleButton: "Kreis zeichnen", drawRectButton: "Rechteck zeichnen", editButton: "Layer editieren", dragButton: "Layer bewegen", cutButton: "Layer schneiden", deleteButton: "Layer löschen", drawCircleMarkerButton: "Kreismarker zeichnen", snappingButton: "Bewegter Layer an andere Layer oder Vertexe einhacken", pinningButton: "Vertexe an der gleichen Position verknüpfen", rotateButton: "Layer drehen", drawTextButton: "Text zeichnen", scaleButton: "Layer skalieren", autoTracingButton: "Linie automatisch nachzeichen" }, measurements: { totalLength: "Länge", segmentLength: "Segment Länge", area: "Fläche", radius: "Radius", perimeter: "Umfang", height: "Höhe", width: "Breite", coordinates: "Position", coordinatesMarker: "Position Marker" } }, Sr = { tooltips: { placeMarker: "Clicca per posizionare un Marker", placeMarkerTouch: "Tocca la mappa per posizionare un marker", firstVertex: "Clicca per posizionare il primo vertice", continueLine: "Clicca per continuare a disegnare", finishLine: "Clicca qualsiasi marker esistente per terminare", finishPoly: "Clicca il primo marker per terminare", finishRect: "Clicca per terminare", startCircle: "Clicca per posizionare il punto centrale del cerchio", finishCircle: "Clicca per terminare il cerchio", placeCircleMarker: "Clicca per posizionare un Marker del cherchio" }, actions: { finish: "Termina", cancel: "Annulla", removeLastVertex: "Rimuovi l'ultimo vertice" }, buttonTitles: { drawMarkerButton: "Disegna Marker", drawPolyButton: "Disegna Poligoni", drawLineButton: "Disegna Polilinea", drawCircleButton: "Disegna Cerchio", drawRectButton: "Disegna Rettangolo", editButton: "Modifica Livelli", dragButton: "Sposta Livelli", cutButton: "Ritaglia Livelli", deleteButton: "Elimina Livelli", drawCircleMarkerButton: "Disegna Marker del Cerchio", snappingButton: "Snap ha trascinato il pennarello su altri strati e vertici", pinningButton: "Pin condiviso vertici insieme", rotateButton: "Ruota livello" } }, Wt = { tooltips: { placeMarker: "Klik untuk menempatkan marker", placeMarkerTouch: "Ketuk peta untuk menempatkan marker", firstVertex: "Klik untuk menempatkan vertex pertama", continueLine: "Klik untuk meneruskan digitasi", finishLine: "Klik pada sembarang marker yang ada untuk mengakhiri", finishPoly: "Klik marker pertama untuk mengakhiri", finishRect: "Klik untuk mengakhiri", startCircle: "Klik untuk menempatkan titik pusat lingkaran", finishCircle: "Klik untuk mengakhiri lingkaran", placeCircleMarker: "Klik untuk menempatkan penanda lingkarann" }, actions: { finish: "Selesai", cancel: "Batal", removeLastVertex: "Hilangkan Vertex Terakhir" }, buttonTitles: { drawMarkerButton: "Digitasi Marker", drawPolyButton: "Digitasi Polygon", drawLineButton: "Digitasi Polyline", drawCircleButton: "Digitasi Lingkaran", drawRectButton: "Digitasi Segi Empat", editButton: "Edit Layer", dragButton: "Geser Layer", cutButton: "Potong Layer", deleteButton: "Hilangkan Layer", drawCircleMarkerButton: "Digitasi Penanda Lingkaran", snappingButton: "Jepretkan penanda yang ditarik ke lapisan dan simpul lain", pinningButton: "Sematkan simpul bersama bersama", rotateButton: "Putar lapisan" } }, Le = { tooltips: { placeMarker: "Adaugă un punct", placeMarkerTouch: "Atingeți harta pentru a plasa un punct", firstVertex: "Apasă aici pentru a adăuga primul Vertex", continueLine: "Apasă aici pentru a continua desenul", finishLine: "Apasă pe orice obiect pentru a finisa desenul", finishPoly: "Apasă pe primul obiect pentru a finisa", finishRect: "Apasă pentru a finisa", startCircle: "Apasă pentru a desena un cerc", finishCircle: "Apasă pentru a finisa un cerc", placeCircleMarker: "Adaugă un punct" }, actions: { finish: "Termină", cancel: "Anulează", removeLastVertex: "Șterge ultimul Vertex" }, buttonTitles: { drawMarkerButton: "Adaugă o bulină", drawPolyButton: "Desenează un poligon", drawLineButton: "Desenează o linie", drawCircleButton: "Desenează un cerc", drawRectButton: "Desenează un dreptunghi", editButton: "Editează straturile", dragButton: "Mută straturile", cutButton: "Taie straturile", deleteButton: "Șterge straturile", drawCircleMarkerButton: "Desenează marcatorul cercului", snappingButton: "Fixați marcatorul glisat pe alte straturi și vârfuri", pinningButton: "Fixați vârfurile partajate împreună", rotateButton: "Rotiți stratul" } }, Ar = { tooltips: { placeMarker: "Нажмите, чтобы нанести маркер", placeMarkerTouch: "Коснитесь карты, чтобы разместить маркер", firstVertex: "Нажмите, чтобы нанести первый объект", continueLine: "Нажмите, чтобы продолжить рисование", finishLine: "Нажмите любой существующий маркер для завершения", finishPoly: "Выберите первую точку, чтобы закончить", finishRect: "Нажмите, чтобы закончить", startCircle: "Нажмите, чтобы добавить центр круга", finishCircle: "Нажмите, чтобы задать радиус", placeCircleMarker: "Нажмите, чтобы нанести круговой маркер" }, actions: { finish: "Завершить", cancel: "Отменить", removeLastVertex: "Отменить последнее действие" }, buttonTitles: { drawMarkerButton: "Добавить маркер", drawPolyButton: "Рисовать полигон", drawLineButton: "Рисовать кривую", drawCircleButton: "Рисовать круг", drawRectButton: "Рисовать прямоугольник", editButton: "Редактировать слой", dragButton: "Перенести слой", cutButton: "Вырезать слой", deleteButton: "Удалить слой", drawCircleMarkerButton: "Добавить круговой маркер", snappingButton: "Привязать перетаскиваемый маркер к другим слоям и вершинам", pinningButton: "Связать общие точки вместе", rotateButton: "Поворот слоя" } }, Xn = { tooltips: { placeMarker: "Presiona para colocar un marcador", placeMarkerTouch: "Toca el mapa para colocar un marcador", firstVertex: "Presiona para colocar el primer vértice", continueLine: "Presiona para continuar dibujando", finishLine: "Presiona cualquier marcador existente para finalizar", finishPoly: "Presiona el primer marcador para finalizar", finishRect: "Presiona para finalizar", startCircle: "Presiona para colocar el centro del círculo", finishCircle: "Presiona para finalizar el círculo", placeCircleMarker: "Presiona para colocar un marcador de círculo" }, actions: { finish: "Finalizar", cancel: "Cancelar", removeLastVertex: "Eliminar último vértice" }, buttonTitles: { drawMarkerButton: "Dibujar Marcador", drawPolyButton: "Dibujar Polígono", drawLineButton: "Dibujar Línea", drawCircleButton: "Dibujar Círculo", drawRectButton: "Dibujar Rectángulo", editButton: "Editar Capas", dragButton: "Arrastrar Capas", cutButton: "Cortar Capas", deleteButton: "Eliminar Capas", drawCircleMarkerButton: "Dibujar Marcador de Círculo", snappingButton: "El marcador de Snap arrastrado a otras capas y vértices", pinningButton: "Fijar juntos los vértices compartidos", rotateButton: "Rotar capa" } }, ti = { tooltips: { placeMarker: "Klik om een marker te plaatsen", placeMarkerTouch: "Tik op de kaart om een marker te plaatsen", firstVertex: "Klik om het eerste punt te plaatsen", continueLine: "Klik om te blijven tekenen", finishLine: "Klik op een bestaand punt om te beëindigen", finishPoly: "Klik op het eerst punt om te beëindigen", finishRect: "Klik om te beëindigen", startCircle: "Klik om het middelpunt te plaatsen", finishCircle: "Klik om de cirkel te beëindigen", placeCircleMarker: "Klik om een marker te plaatsen" }, actions: { finish: "Bewaar", cancel: "Annuleer", removeLastVertex: "Verwijder laatste punt" }, buttonTitles: { drawMarkerButton: "Plaats Marker", drawPolyButton: "Teken een vlak", drawLineButton: "Teken een lijn", drawCircleButton: "Teken een cirkel", drawRectButton: "Teken een vierkant", editButton: "Bewerk", dragButton: "Verplaats", cutButton: "Knip", deleteButton: "Verwijder", drawCircleMarkerButton: "Plaats Marker", snappingButton: "Snap gesleepte marker naar andere lagen en hoekpunten", pinningButton: "Speld gedeelde hoekpunten samen", rotateButton: "Laag roteren" } }, Qs = { tooltips: { placeMarker: "Cliquez pour placer un marqueur", placeMarkerTouch: "Appuyez sur la carte pour placer un marqueur", firstVertex: "Cliquez pour placer le premier sommet", continueLine: "Cliquez pour continuer à dessiner", finishLine: "Cliquez sur n'importe quel marqueur pour terminer", finishPoly: "Cliquez sur le premier marqueur pour terminer", finishRect: "Cliquez pour terminer", startCircle: "Cliquez pour placer le centre du cercle", finishCircle: "Cliquez pour finir le cercle", placeCircleMarker: "Cliquez pour placer le marqueur circulaire" }, actions: { finish: "Terminer", cancel: "Annuler", removeLastVertex: "Retirer le dernier sommet" }, buttonTitles: { drawMarkerButton: "Placer des marqueurs", drawPolyButton: "Dessiner des polygones", drawLineButton: "Dessiner des polylignes", drawCircleButton: "Dessiner un cercle", drawRectButton: "Dessiner un rectangle", editButton: "Éditer des calques", dragButton: "Déplacer des calques", cutButton: "Couper des calques", deleteButton: "Supprimer des calques", drawCircleMarkerButton: "Dessiner un marqueur circulaire", snappingButton: "Glisser le marqueur vers d'autres couches et sommets", pinningButton: "Épingler ensemble les sommets partagés", rotateButton: "Tourner des calques" } }, Yn = { tooltips: { placeMarker: "单击放置标记", placeMarkerTouch: "点击地图放置标记", firstVertex: "单击放置首个顶点", continueLine: "单击继续绘制", finishLine: "单击任何存在的标记以完成", finishPoly: "单击第一个标记以完成", finishRect: "单击完成", startCircle: "单击放置圆心", finishCircle: "单击完成圆形", placeCircleMarker: "点击放置圆形标记" }, actions: { finish: "完成", cancel: "取消", removeLastVertex: "移除最后的顶点" }, buttonTitles: { drawMarkerButton: "绘制标记", drawPolyButton: "绘制多边形", drawLineButton: "绘制线段", drawCircleButton: "绘制圆形", drawRectButton: "绘制长方形", editButton: "编辑图层", dragButton: "拖拽图层", cutButton: "剪切图层", deleteButton: "删除图层", drawCircleMarkerButton: "画圆圈标记", snappingButton: "将拖动的标记捕捉到其他图层和顶点", pinningButton: "将共享顶点固定在一起", rotateButton: "旋转图层" } }, qi = { tooltips: { placeMarker: "單擊放置標記", placeMarkerTouch: "點擊地圖放置標記", firstVertex: "單擊放置第一個頂點", continueLine: "單擊繼續繪製", finishLine: "單擊任何存在的標記以完成", finishPoly: "單擊第一個標記以完成", finishRect: "單擊完成", startCircle: "單擊放置圓心", finishCircle: "單擊完成圓形", placeCircleMarker: "點擊放置圓形標記" }, actions: { finish: "完成", cancel: "取消", removeLastVertex: "移除最後一個頂點" }, buttonTitles: { drawMarkerButton: "放置標記", drawPolyButton: "繪製多邊形", drawLineButton: "繪製線段", drawCircleButton: "繪製圓形", drawRectButton: "繪製方形", editButton: "編輯圖形", dragButton: "移動圖形", cutButton: "裁切圖形", deleteButton: "刪除圖形", drawCircleMarkerButton: "畫圓圈標記", snappingButton: "將拖動的標記對齊到其他圖層和頂點", pinningButton: "將共享頂點固定在一起", rotateButton: "旋轉圖形" } }, ke = { tooltips: { placeMarker: "Clique para posicionar o marcador", placeMarkerTouch: "Toque no mapa para posicionar um marcador", firstVertex: "Clique para posicionar o primeiro vértice", continueLine: "Clique para continuar desenhando", finishLine: "Clique em qualquer marcador existente para finalizar", finishPoly: "Clique no primeiro marcador para finalizar", finishRect: "Clique para finalizar", startCircle: "Clique para posicionar o centro do círculo", finishCircle: "Clique para finalizar o círculo", placeCircleMarker: "Clique para posicionar o marcador circular", placeText: "Clique para inserir texto" }, actions: { finish: "Finalizar", cancel: "Cancelar", removeLastVertex: "Remover último vértice" }, buttonTitles: { drawMarkerButton: "Desenhar Marcador", drawPolyButton: "Desenhar Polígonos", drawLineButton: "Desenhar Linha Poligonal", drawCircleButton: "Desenhar Círculo", drawRectButton: "Desenhar Retângulo", editButton: "Editar Camadas", dragButton: "Arrastar Camadas", cutButton: "Recortar Camadas", deleteButton: "Remover Camadas", drawCircleMarkerButton: "Desenhar Marcador de Círculo", snappingButton: "Ajustar marcador arrastado a outras camadas e vértices", pinningButton: "Unir vértices compartilhados", rotateButton: "Rotacionar Camadas", drawTextButton: "Desenhar Texto", scaleButton: "Redimensionar Camadas", autoTracingButton: "Traçado Automático de Linha" }, measurements: { totalLength: "Comprimento", segmentLength: "Comprimento do Segmento", area: "Área", radius: "Raio", perimeter: "Perímetro", height: "Altura", width: "Largura", coordinates: "Posição", coordinatesMarker: "Marcador de Posição" } }, Fi = { tooltips: { placeMarker: "Clique para colocar marcador", placeMarkerTouch: "Toque no mapa para colocar um marcador", firstVertex: "Clique para colocar primeiro vértice", continueLine: "Clique para continuar a desenhar", finishLine: "Clique num marcador existente para terminar", finishPoly: "Clique no primeiro marcador para terminar", finishRect: "Clique para terminar", startCircle: "Clique para colocar o centro do círculo", finishCircle: "Clique para terminar o círculo", placeCircleMarker: "Clique para colocar marcador de círculo", placeText: "Clique para colocar texto" }, actions: { finish: "Terminar", cancel: "Cancelar", removeLastVertex: "Remover Último Vértice" }, buttonTitles: { drawMarkerButton: "Desenhar Marcador", drawPolyButton: "Desenhar Polígonos", drawLineButton: "Desenhar Polilinha", drawCircleButton: "Desenhar Círculo", drawRectButton: "Desenhar Retângulo", editButton: "Editar Camadas", dragButton: "Arrastar Camadas", cutButton: "Cortar Camadas", deleteButton: "Remover Camadas", drawCircleMarkerButton: "Desenhar Marcador de Círculo", snappingButton: "Ajustar marcador arrastado a outras camadas e vértices", pinningButton: "Unir vértices partilhados", rotateButton: "Rodar Camadas", drawTextButton: "Desenhar Texto", scaleButton: "Escalar Camadas", autoTracingButton: "Traçado Automático de Linha" }, measurements: { totalLength: "Comprimento", segmentLength: "Comprimento do Segmento", area: "Área", radius: "Raio", perimeter: "Perímetro", height: "Altura", width: "Largura", coordinates: "Posição", coordinatesMarker: "Marcador de Posição" } }, Pn = { tooltips: { placeMarker: "Kliknij, aby umieścić znacznik", placeMarkerTouch: "Dotknij mapę, aby umieścić znacznik", firstVertex: "Kliknij, aby umieścić pierwszy wierzchołek", continueLine: "Kliknij, aby kontynuować rysowanie", finishLine: "Kliknij dowolny istniejący znacznik, aby zakończyć", finishPoly: "Kliknij pierwszy znacznik, aby zakończyć", finishRect: "Kliknij, aby zakończyć", startCircle: "Kliknij, aby umieścić środek okręgu", finishCircle: "Kliknij, aby zakończyć okrąg", placeCircleMarker: "Kliknij, aby umieścić znacznik okręgu", placeText: "Kliknij, aby umieścić tekst" }, actions: { finish: "Zakończ", cancel: "Anuluj", removeLastVertex: "Usuń ostatni wierzchołek" }, buttonTitles: { drawMarkerButton: "Rysuj znacznik", drawPolyButton: "Rysuj wielokąt", drawLineButton: "Rysuj linię", drawCircleButton: "Rysuj okrąg", drawRectButton: "Rysuj prostokąt", editButton: "Edytuj warstwy", dragButton: "Przeciągnij warstwy", cutButton: "Wytnij warstwy", deleteButton: "Usuń warstwy", drawCircleMarkerButton: "Rysuj znacznik okrągły", snappingButton: "Przyciągnij przenoszony znacznik do innych warstw i wierzchołków", pinningButton: "Przypnij wspólne wierzchołki razem", rotateButton: "Obróć warstwy", drawTextButton: "Rysuj tekst", scaleButton: "Skaluj warstwy", autoTracingButton: "Automatyczne śledzenie linii" }, measurements: { totalLength: "Długość", segmentLength: "Długość odcinka", area: "Obszar", radius: "Promień", perimeter: "Obwód", height: "Wysokość", width: "Szerokość", coordinates: "Pozycja", coordinatesMarker: "Znacznik pozycji" } }, Sn = { tooltips: { placeMarker: "Klicka för att placera markör", placeMarkerTouch: "Tryck på kartan för att placera en markör", firstVertex: "Klicka för att placera första hörnet", continueLine: "Klicka för att fortsätta rita", finishLine: "Klicka på en existerande punkt för att slutföra", finishPoly: "Klicka på den första punkten för att slutföra", finishRect: "Klicka för att slutföra", startCircle: "Klicka för att placera cirkelns centrum", finishCircle: "Klicka för att slutföra cirkeln", placeCircleMarker: "Klicka för att placera cirkelmarkör" }, actions: { finish: "Slutför", cancel: "Avbryt", removeLastVertex: "Ta bort sista hörnet" }, buttonTitles: { drawMarkerButton: "Rita Markör", drawPolyButton: "Rita Polygoner", drawLineButton: "Rita Linje", drawCircleButton: "Rita Cirkel", drawRectButton: "Rita Rektangel", editButton: "Redigera Lager", dragButton: "Dra Lager", cutButton: "Klipp i Lager", deleteButton: "Ta bort Lager", drawCircleMarkerButton: "Rita Cirkelmarkör", snappingButton: "Snäpp dra markören till andra lager och hörn", pinningButton: "Fäst delade hörn tillsammans", rotateButton: "Rotera lagret" } }, Tr = { tooltips: { placeMarker: "Κάντε κλικ για να τοποθετήσετε Δείκτη", placeMarkerTouch: "Πατήστε στο χάρτη για να τοποθετήσετε δείκτη", firstVertex: "Κάντε κλικ για να τοποθετήσετε το πρώτο σημείο", continueLine: "Κάντε κλικ για να συνεχίσετε να σχεδιάζετε", finishLine: "Κάντε κλικ σε οποιονδήποτε υπάρχον σημείο για να ολοκληρωθεί", finishPoly: "Κάντε κλικ στο πρώτο σημείο για να τελειώσετε", finishRect: "Κάντε κλικ για να τελειώσετε", startCircle: "Κάντε κλικ για να τοποθετήσετε κέντρο Κύκλου", finishCircle: "Κάντε κλικ για να ολοκληρώσετε τον Κύκλο", placeCircleMarker: "Κάντε κλικ για να τοποθετήσετε Κυκλικό Δείκτη" }, actions: { finish: "Τέλος", cancel: "Ακύρωση", removeLastVertex: "Κατάργηση τελευταίου σημείου" }, buttonTitles: { drawMarkerButton: "Σχεδίαση Δείκτη", drawPolyButton: "Σχεδίαση Πολυγώνου", drawLineButton: "Σχεδίαση Γραμμής", drawCircleButton: "Σχεδίαση Κύκλου", drawRectButton: "Σχεδίαση Ορθογωνίου", editButton: "Επεξεργασία Επιπέδων", dragButton: "Μεταφορά Επιπέδων", cutButton: "Αποκοπή Επιπέδων", deleteButton: "Κατάργηση Επιπέδων", drawCircleMarkerButton: "Σχεδίαση Κυκλικού Δείκτη", snappingButton: "Προσκόλληση του Δείκτη μεταφοράς σε άλλα Επίπεδα και Κορυφές", pinningButton: "Περικοπή κοινών κορυφών μαζί", rotateButton: "Περιστρέψτε το στρώμα" } }, An = { tooltips: { placeMarker: "Kattintson a jelölő elhelyezéséhez", placeMarkerTouch: "Érintse meg a térképet a jelölő elhelyezéséhez", firstVertex: "Kattintson az első pont elhelyezéséhez", continueLine: "Kattintson a következő pont elhelyezéséhez", finishLine: "A befejezéshez kattintson egy meglévő pontra", finishPoly: "A befejezéshez kattintson az első pontra", finishRect: "Kattintson a befejezéshez", startCircle: "Kattintson a kör középpontjának elhelyezéséhez", finishCircle: "Kattintson a kör befejezéséhez", placeCircleMarker: "Kattintson a körjelölő elhelyezéséhez" }, actions: { finish: "Befejezés", cancel: "Mégse", removeLastVertex: "Utolsó pont eltávolítása" }, buttonTitles: { drawMarkerButton: "Jelölő rajzolása", drawPolyButton: "Poligon rajzolása", drawLineButton: "Vonal rajzolása", drawCircleButton: "Kör rajzolása", drawRectButton: "Négyzet rajzolása", editButton: "Elemek szerkesztése", dragButton: "Elemek mozgatása", cutButton: "Elemek vágása", deleteButton: "Elemek törlése", drawCircleMarkerButton: "Kör jelölő rajzolása", snappingButton: "Kapcsolja a jelöltőt másik elemhez vagy ponthoz", pinningButton: "Közös pontok összekötése", rotateButton: "Fólia elforgatása" } }, Dr = { tooltips: { placeMarker: "Tryk for at placere en markør", placeMarkerTouch: "Tryk på kortet for at placere en markør", firstVertex: "Tryk for at placere det første punkt", continueLine: "Tryk for at fortsætte linjen", finishLine: "Tryk på et eksisterende punkt for at afslutte", finishPoly: "Tryk på det første punkt for at afslutte", finishRect: "Tryk for at afslutte", startCircle: "Tryk for at placere cirklens center", finishCircle: "Tryk for at afslutte cirklen", placeCircleMarker: "Tryk for at placere en cirkelmarkør" }, actions: { finish: "Afslut", cancel: "Afbryd", removeLastVertex: "Fjern sidste punkt" }, buttonTitles: { drawMarkerButton: "Placer markør", drawPolyButton: "Tegn polygon", drawLineButton: "Tegn linje", drawCircleButton: "Tegn cirkel", drawRectButton: "Tegn firkant", editButton: "Rediger", dragButton: "Træk", cutButton: "Klip", deleteButton: "Fjern", drawCircleMarkerButton: "Tegn cirkelmarkør", snappingButton: "Fastgør trukket markør til andre elementer", pinningButton: "Sammenlæg delte elementer", rotateButton: "Roter laget" } }, Ir = { tooltips: { placeMarker: "Klikk for å plassere punkt", placeMarkerTouch: "Trykk på kartet for å plassere et punkt", firstVertex: "Klikk for å plassere første punkt", continueLine: "Klikk for å tegne videre", finishLine: "Klikk på et eksisterende punkt for å fullføre", finishPoly: "Klikk første punkt for å fullføre", finishRect: "Klikk for å fullføre", startCircle: "Klikk for å sette sirkel midtpunkt", finishCircle: "Klikk for å fullføre sirkel", placeCircleMarker: "Klikk for å plassere sirkel", placeText: "Klikk for å plassere tekst" }, actions: { finish: "Fullfør", cancel: "Kanseller", removeLastVertex: "Fjern forrige punkt" }, buttonTitles: { drawMarkerButton: "Tegn punkt", drawPolyButton: "Tegn flate", drawLineButton: "Tegn linje", drawCircleButton: "Tegn sirkel", drawRectButton: "Tegn rektangel", editButton: "Rediger objekter", dragButton: "Dra objekter", cutButton: "Kutt objekter", deleteButton: "Fjern objekter", drawCircleMarkerButton: "Tegn sirkel-punkt", snappingButton: "Fest dratt punkt til andre objekter og punkt", pinningButton: "Pin delte punkter sammen", rotateButton: "Rotér objekter", drawTextButton: "Tegn tekst", scaleButton: "Skalér objekter", autoTracingButton: "Automatisk sporing av linje" }, measurements: { totalLength: "Lengde", segmentLength: "Segmentlengde", area: "Område", radius: "Radius", perimeter: "Omriss", height: "Høyde", width: "Bredde", coordinates: "Posisjon", coordinatesMarker: "Posisjonsmarkør" } }, Qn = { tooltips: { placeMarker: "کلیک برای جانمایی نشان", placeMarkerTouch: "روی نقشه ضربه بزنید تا نشان بگذارید", firstVertex: "کلیک برای رسم اولین رأس", continueLine: "کلیک برای ادامه رسم", finishLine: "کلیک روی هر نشان موجود برای پایان", finishPoly: "کلیک روی اولین نشان برای پایان", finishRect: "کلیک برای پایان", startCircle: "کلیک برای رسم مرکز دایره", finishCircle: "کلیک برای پایان رسم دایره", placeCircleMarker: "کلیک برای رسم نشان دایره", placeText: "کلیک برای نوشتن متن" }, actions: { finish: "پایان", cancel: "لفو", removeLastVertex: "حذف آخرین رأس" }, buttonTitles: { drawMarkerButton: "درج نشان", drawPolyButton: "رسم چندضلعی", drawLineButton: "رسم خط", drawCircleButton: "رسم دایره", drawRectButton: "رسم چهارضلعی", editButton: "ویرایش لایه‌ها", dragButton: "جابجایی لایه‌ها", cutButton: "برش لایه‌ها", deleteButton: "حذف لایه‌ها", drawCircleMarkerButton: "رسم نشان دایره", snappingButton: "نشانگر را به لایه‌ها و رئوس دیگر بکشید", pinningButton: "رئوس مشترک را با هم پین کنید", rotateButton: "چرخش لایه", drawTextButton: "رسم متن", scaleButton: "مقیاس‌گذاری", autoTracingButton: "ردیاب خودکار" }, measurements: { totalLength: "طول", segmentLength: "طول بخش", area: "ناحیه", radius: "شعاع", perimeter: "محیط", height: "ارتفاع", width: "عرض", coordinates: "موقعیت", coordinatesMarker: "موقعیت نشان" } }, Or = { tooltips: { placeMarker: "Натисніть, щоб нанести маркер", placeMarkerTouch: "Торкніться карти, щоб розмістити маркер", firstVertex: "Натисніть, щоб нанести першу вершину", continueLine: "Натисніть, щоб продовжити малювати", finishLine: "Натисніть будь-який існуючий маркер для завершення", finishPoly: "Виберіть перший маркер, щоб завершити", finishRect: "Натисніть, щоб завершити", startCircle: "Натисніть, щоб додати центр кола", finishCircle: "Натисніть, щоб завершити коло", placeCircleMarker: "Натисніть, щоб нанести круговий маркер" }, actions: { finish: "Завершити", cancel: "Відмінити", removeLastVertex: "Видалити попередню вершину" }, buttonTitles: { drawMarkerButton: "Малювати маркер", drawPolyButton: "Малювати полігон", drawLineButton: "Малювати криву", drawCircleButton: "Малювати коло", drawRectButton: "Малювати прямокутник", editButton: "Редагувати шари", dragButton: "Перенести шари", cutButton: "Вирізати шари", deleteButton: "Видалити шари", drawCircleMarkerButton: "Малювати круговий маркер", snappingButton: "Прив’язати перетягнутий маркер до інших шарів та вершин", pinningButton: "Зв'язати спільні вершини разом", rotateButton: "Повернути шар" } }, Fr = { tooltips: { placeMarker: "İşaretçi yerleştirmek için tıklayın", placeMarkerTouch: "İşaretçi yerleştirmek için haritaya dokunun", firstVertex: "İlk tepe noktasını yerleştirmek için tıklayın", continueLine: "Çizime devam etmek için tıklayın", finishLine: "Bitirmek için mevcut herhangi bir işaretçiyi tıklayın", finishPoly: "Bitirmek için ilk işaretçiyi tıklayın", finishRect: "Bitirmek için tıklayın", startCircle: "Daire merkezine yerleştirmek için tıklayın", finishCircle: "Daireyi bitirmek için tıklayın", placeCircleMarker: "Daire işaretçisi yerleştirmek için tıklayın" }, actions: { finish: "Bitir", cancel: "İptal", removeLastVertex: "Son köşeyi kaldır" }, buttonTitles: { drawMarkerButton: "Çizim İşaretçisi", drawPolyButton: "Çokgenler çiz", drawLineButton: "Çoklu çizgi çiz", drawCircleButton: "Çember çiz", drawRectButton: "Dikdörtgen çiz", editButton: "Katmanları düzenle", dragButton: "Katmanları sürükle", cutButton: "Katmanları kes", deleteButton: "Katmanları kaldır", drawCircleMarkerButton: "Daire işaretçisi çiz", snappingButton: "Sürüklenen işaretçiyi diğer katmanlara ve köşelere yapıştır", pinningButton: "Paylaşılan köşeleri birbirine sabitle", rotateButton: "Katmanı döndür" } }, tr = { tooltips: { placeMarker: "Kliknutím vytvoříte značku", placeMarkerTouch: "Klepnutím na mapu umístíte značku", firstVertex: "Kliknutím vytvoříte první objekt", continueLine: "Kliknutím pokračujte v kreslení", finishLine: "Kliknutí na libovolnou existující značku pro dokončení", finishPoly: "Vyberte první bod pro dokončení", finishRect: "Klikněte pro dokončení", startCircle: "Kliknutím přidejte střed kruhu", finishCircle: "Нажмите, чтобы задать радиус", placeCircleMarker: "Kliknutím nastavte poloměr" }, actions: { finish: "Dokončit", cancel: "Zrušit", removeLastVertex: "Zrušit poslední akci" }, buttonTitles: { drawMarkerButton: "Přidat značku", drawPolyButton: "Nakreslit polygon", drawLineButton: "Nakreslit křivku", drawCircleButton: "Nakreslit kruh", drawRectButton: "Nakreslit obdélník", editButton: "Upravit vrstvu", dragButton: "Přeneste vrstvu", cutButton: "Vyjmout vrstvu", deleteButton: "Smazat vrstvu", drawCircleMarkerButton: "Přidat kruhovou značku", snappingButton: "Navázat tažnou značku k dalším vrstvám a vrcholům", pinningButton: "Spojit společné body dohromady", rotateButton: "Otočte vrstvu" } }, Na = { tooltips: { placeMarker: "クリックしてマーカーを配置", placeMarkerTouch: "地図をタップしてマーカーを配置", firstVertex: "クリックして最初の頂点を配置", continueLine: "クリックして描画を続ける", finishLine: "任意のマーカーをクリックして終了", finishPoly: "最初のマーカーをクリックして終了", finishRect: "クリックして終了", startCircle: "クリックして円の中心を配置", finishCircle: "クリックして円の描画を終了", placeCircleMarker: "クリックして円マーカーを配置", placeText: "クリックしてテキストを配置" }, actions: { finish: "終了", cancel: "キャンセル", removeLastVertex: "最後の頂点を削除" }, buttonTitles: { drawMarkerButton: "マーカーを描画", drawPolyButton: "ポリゴンを描画", drawLineButton: "折れ線を描画", drawCircleButton: "円を描画", drawRectButton: "矩形を描画", editButton: "レイヤーを編集", dragButton: "レイヤーをドラッグ", cutButton: "レイヤーを切り取り", deleteButton: "レイヤーを削除", drawCircleMarkerButton: "円マーカーを描画", snappingButton: "ドラッグしたマーカーを他のレイヤーや頂点にスナップする", pinningButton: "共有する頂点を同時に動かす", rotateButton: "レイヤーを回転", drawTextButton: "テキストを描画" } }, Rr = { tooltips: { placeMarker: "Klikkaa asettaaksesi merkin", placeMarkerTouch: "Napauta karttaa asettaaksesi merkin", firstVertex: "Klikkaa asettaakseni ensimmäisen osuuden", continueLine: "Klikkaa jatkaaksesi piirtämistä", finishLine: "Klikkaa olemassa olevaa merkkiä lopettaaksesi", finishPoly: "Klikkaa ensimmäistä merkkiä lopettaaksesi", finishRect: "Klikkaa lopettaaksesi", startCircle: "Klikkaa asettaaksesi ympyrän keskipisteen", finishCircle: "Klikkaa lopettaaksesi ympyrän", placeCircleMarker: "Klikkaa asettaaksesi ympyrämerkin", placeText: "Klikkaa asettaaksesi tekstin" }, actions: { finish: "Valmis", cancel: "Peruuta", removeLastVertex: "Poista viimeinen osuus" }, buttonTitles: { drawMarkerButton: "Piirrä merkkejä", drawPolyButton: "Piirrä monikulmioita", drawLineButton: "Piirrä viivoja", drawCircleButton: "Piirrä ympyrä", drawRectButton: "Piirrä neliskulmioita", editButton: "Muokkaa", dragButton: "Siirrä", cutButton: "Leikkaa", deleteButton: "Poista", drawCircleMarkerButton: "Piirrä ympyrämerkki", snappingButton: "Kiinnitä siirrettävä merkki toisiin muotoihin", pinningButton: "Kiinnitä jaetut muodot yhteen", rotateButton: "Käännä", drawTextButton: "Piirrä tekstiä" } }, to = { tooltips: { placeMarker: "마커 위치를 클릭하세요", placeMarkerTouch: "지도를 탭하여 마커를 배치하세요", firstVertex: "첫번째 꼭지점 위치을 클릭하세요", continueLine: "계속 그리려면 클릭하세요", finishLine: "끝내려면 기존 마커를 클릭하세요", finishPoly: "끝내려면 처음 마커를 클릭하세요", finishRect: "끝내려면 클릭하세요", startCircle: "원의 중심이 될 위치를 클릭하세요", finishCircle: "원을 끝내려면 클릭하세요", placeCircleMarker: "원 마커 위치를 클릭하세요", placeText: "텍스트 위치를 클릭하세요" }, actions: { finish: "끝내기", cancel: "취소", removeLastVertex: "마지막 꼭지점 제거" }, buttonTitles: { drawMarkerButton: "마커 그리기", drawPolyButton: "다각형 그리기", drawLineButton: "다각선 그리기", drawCircleButton: "원 그리기", drawRectButton: "직사각형 그리기", editButton: "레이어 편집하기", dragButton: "레이어 끌기", cutButton: "레이어 자르기", deleteButton: "레이어 제거하기", drawCircleMarkerButton: "원 마커 그리기", snappingButton: "잡아끈 마커를 다른 레이어 및 꼭지점에 들러붙게 하기", pinningButton: "공유 꼭지점을 함께 찍기", rotateButton: "레이어 회전하기", drawTextButton: "텍스트 그리기" } }, qt = { tooltips: { placeMarker: "Маркерди жайгаштыруу үчүн басыңыз", placeMarkerTouch: "Маркерди жайгаштыруу үчүн картага тийиңиз", firstVertex: "Биринчи чокуну жайгаштырууну үчүн басыңыз", continueLine: "Сүрөт тартууну улантуу үчүн басыңыз", finishLine: "Аяктоо үчүн учурдагы маркерди басыңыз", finishPoly: "Бүтүрүү үчүн биринчи маркерди басыңыз", finishRect: "Бүтүрүү үчүн басыңыз", startCircle: "Айлананын борборун жайгаштырууну үчүн басыңыз", finishCircle: "Айлананы бүтүрүү үчүн басыңыз", placeCircleMarker: "Тегерек маркерди жайгаштыруу үчүн басыңыз", placeText: "Текстти жайгаштыруу үчүн басыңыз" }, actions: { finish: "Аягы", cancel: "Жок кылуу", removeLastVertex: "Акыркы чокуну өчүрүү" }, buttonTitles: { drawMarkerButton: "Маркерди чизуу", drawPolyButton: "Полигон чизуу", drawLineButton: "Полилиния чизуу", drawCircleButton: "Дайынды чизуу", drawRectButton: "Прямоугольник чизуу", editButton: "Слоопту түзөтүү", dragButton: "Слоопту карап сүйлөү", cutButton: "Слооптун башын кесүү", deleteButton: "Слооптун өчүрүү", drawCircleMarkerButton: "Дайынды маркерди чизуу", snappingButton: "Башка слооптордун жана вертекстердин арасына чекилдөө", pinningButton: "Бөлүшкөн вертекстерди бирге тутуштуруу", rotateButton: "Слооптун өзгөртүү", drawTextButton: "Текст чизуу", scaleButton: "Слооптун өлчөмүн өзгөртүү", autoTracingButton: "Автоматтык тизмеги чизуу" }, measurements: { totalLength: "Узундук", segmentLength: "Сегмент узундугу", area: "Аймак", radius: "Радиус", perimeter: "Периметр", height: "Диаметр", width: "Кенчилик", coordinates: "Координаттар", coordinatesMarker: "Маркердин координаттары" } }, ci = Fi, ue = { en: un, de: hn, it: Sr, id: Wt, ro: Le, ru: Ar, es: Xn, nl: ti, fr: Qs, pt: ci, pt_br: ke, pt_pt: Fi, zh: Yn, zh_tw: qi, pl: Pn, sv: Sn, el: Tr, hu: An, da: Dr, no: Ir, fa: Qn, ua: Or, tr: Fr, cz: tr, ja: Na, fi: Rr, ko: to, ky: qt }, za = { _globalEditModeEnabled: !1, enableGlobalEditMode(e) {
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
  } }, Nr = za, zr = { _globalDragModeEnabled: !1, enableGlobalDragMode() {
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
  } }, jr = zr, Hi = { _globalRemovalModeEnabled: !1, enableGlobalRemovalMode() {
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
  } }, $r = Hi, Tn = { _globalRotateModeEnabled: !1, enableGlobalRotateMode() {
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
  } }, Ie = Tn, Ki = x(Wn()), ja = { _fireDrawStart(e = "Draw", i = {}) {
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
  }, _fireRotation(e, i, r, a = this._rotationLayer, o = "Rotation", u = {}) {
    this.__fire(e, "pm:rotate", { layer: a, helpLayer: this._layer, startAngle: this._startAngle, angle: a.pm.getAngle(), angleDiff: i, oldLatLngs: r, newLatLngs: a.getLatLngs() }, o, u);
  }, _fireRotationEnd(e, i, r, a = "Rotation", o = {}) {
    this.__fire(e, "pm:rotateend", { layer: this._rotationLayer, helpLayer: this._layer, startAngle: i, angle: this._rotationLayer.pm.getAngle(), originLatLngs: r, newLatLngs: this._rotationLayer.getLatLngs() }, a, o);
  }, _fireActionClick(e, i, r, a = "Toolbar", o = {}) {
    this.__fire(this._map, "pm:actionclick", { text: e.text, action: e, btnName: i, button: r }, a, o);
  }, _fireButtonClick(e, i, r = "Toolbar", a = {}) {
    this.__fire(this._map, "pm:buttonclick", { btnName: e, button: i }, r, a);
  }, _fireLangChange(e, i, r, a, o = "Global", u = {}) {
    this.__fire(this.map, "pm:langchange", { oldLang: e, activeLang: i, fallback: r, translations: a }, o, u);
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
    r = (0, Ki.default)(r, o, { source: a }), L.PM.Utils._fireEvent(e, i, r);
  } }, Dn = ja, eo = () => ({ _lastEvents: { keydown: void 0, keyup: void 0, current: void 0 }, _initKeyListener(e) {
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
  } }), $a = eo, er = x(Oi());
  function ae(e) {
    let i = L.PM.activeLang;
    return (0, er.default)(ue[i], e) || (0, er.default)(ue.en, e) || e;
  }
  function Ua() {
    return window.matchMedia ? !window.matchMedia("(pointer: coarse)").matches : !0;
  }
  function ie(e) {
    for (let i = 0; i < e.length; i += 1) {
      let r = e[i];
      if (Array.isArray(r)) {
        if (ie(r)) return !0;
      } else if (r != null && r !== "") return !0;
    }
    return !1;
  }
  function ir(e) {
    return e.reduce((i, r) => {
      if (r.length !== 0) {
        let a = Array.isArray(r) ? ir(r) : r;
        Array.isArray(a) ? a.length !== 0 && i.push(a) : i.push(a);
      }
      return i;
    }, []);
  }
  function oi(e, i, r) {
    let a = { a: L.CRS.Earth.R, b: 63567523142e-4, f: 0.0033528106647474805 }, { a: o, b: u, f } = a, _ = e.lng, b = e.lat, C = r, F = Math.PI, S = i * F / 180, Z = Math.sin(S), W = Math.cos(S), lt = (1 - f) * Math.tan(b * F / 180), vt = 1 / Math.sqrt(1 + lt * lt), kt = lt * vt, Bt = Math.atan2(lt, W), D = vt * Z, et = 1 - D * D, ot = et * (o * o - u * u) / (u * u), Lt = 1 + ot / 16384 * (4096 + ot * (-768 + ot * (320 - 175 * ot))), xt = ot / 1024 * (256 + ot * (-128 + ot * (74 - 47 * ot))), wt = C / (u * Lt), M = 2 * Math.PI, P, T, q;
    for (; Math.abs(wt - M) > 1e-12; ) {
      P = Math.cos(2 * Bt + wt), T = Math.sin(wt), q = Math.cos(wt);
      let gt = xt * T * (P + xt / 4 * (q * (-1 + 2 * P * P) - xt / 6 * P * (-3 + 4 * T * T) * (-3 + 4 * P * P)));
      M = wt, wt = C / (u * Lt) + gt;
    }
    let V = kt * T - vt * q * W, z = Math.atan2(kt * q + vt * T * W, (1 - f) * Math.sqrt(D * D + V * V)), tt = Math.atan2(T * Z, vt * q - kt * T * W), H = f / 16 * et * (4 + f * (4 - 3 * et)), Y = tt - (1 - H) * f * D * (wt + H * T * (P + H * q * (-1 + 2 * P * P))), rt = _ + Y * 180 / F, nt = z * 180 / F;
    return L.latLng(rt, nt);
  }
  function cn(e, i, r, a, o = !0) {
    let u, f, _, b = [];
    for (let C = 0; C < r; C += 1) {
      if (o) u = C * 360 / r + a, f = oi(e, u, i), _ = L.latLng(f.lng, f.lat);
      else {
        let F = e.lat + Math.cos(2 * C * Math.PI / r) * i, S = e.lng + Math.sin(2 * C * Math.PI / r) * i;
        _ = L.latLng(F, S);
      }
      b.push(_);
    }
    return b;
  }
  function Va(e, i, r) {
    i = (i + 360) % 360;
    let a = Math.PI / 180, o = 180 / Math.PI, { R: u } = L.CRS.Earth, f = e.lng * a, _ = e.lat * a, b = i * a, C = Math.sin(_), F = Math.cos(_), S = Math.cos(r / u), Z = Math.sin(r / u), W = Math.asin(C * S + F * Z * Math.cos(b)), lt = f + Math.atan2(Math.sin(b) * Z * F, S - C * Math.sin(W));
    lt *= o;
    let vt = lt - 360, kt = lt < -180 ? lt + 360 : lt;
    return lt = lt > 180 ? vt : kt, L.latLng([W * o, lt]);
  }
  function Ur(e, i, r) {
    let a = e.latLngToContainerPoint(i), o = e.latLngToContainerPoint(r), u = Math.atan2(o.y - a.y, o.x - a.x) * 180 / Math.PI + 90;
    return u += u < 0 ? 360 : 0, u;
  }
  function dn(e, i, r, a) {
    let o = Ur(e, i, r);
    return Va(i, o, a);
  }
  function io(e, i, r = "asc") {
    if (!i || Object.keys(i).length === 0) return (b, C) => b - C;
    let a = Object.keys(i), o, u = a.length - 1, f = {};
    for (; u >= 0; ) o = a[u], f[o.toLowerCase()] = i[o], u -= 1;
    function _(b) {
      if (b instanceof L.Marker) return "Marker";
      if (b instanceof L.Circle) return "Circle";
      if (b instanceof L.CircleMarker) return "CircleMarker";
      if (b instanceof L.Rectangle) return "Rectangle";
      if (b instanceof L.Polygon) return "Polygon";
      if (b instanceof L.Polyline) return "Line";
    }
    return (b, C) => {
      let F, S;
      if (F = _(b.layer).toLowerCase(), S = _(C.layer).toLowerCase(), !F || !S) return 0;
      let Z = F in f ? f[F] : Number.MAX_SAFE_INTEGER, W = S in f ? f[S] : Number.MAX_SAFE_INTEGER, lt = 0;
      return Z < W ? lt = -1 : Z > W && (lt = 1), r === "desc" ? lt * -1 : lt;
    };
  }
  function wi(e, i = e.getLatLngs()) {
    return e instanceof L.Polygon ? L.polygon(i).getLatLngs() : L.polyline(i).getLatLngs();
  }
  function Ga(e, i) {
    var r, a, o, u;
    if ((a = (r = i.options.crs) == null ? void 0 : r.projection) != null && a.MAX_LATITUDE) {
      let f = (u = (o = i.options.crs) == null ? void 0 : o.projection) == null ? void 0 : u.MAX_LATITUDE;
      e.lat = Math.max(Math.min(f, e.lat), -f);
    }
    return e;
  }
  function fn(e) {
    return e.options.renderer || e._map && (e._map._getPaneRenderer(e.options.pane) || e._map.options.renderer || e._map._renderer) || e._renderer;
  }
  function Vr(e, i) {
    if (e = e.trim().toLowerCase(), i[e]) return e;
    let r = e.replace(/[-_\s]/g, "_").match(/^([a-z]{2,3})(?:_([a-z]{2,3}))?$/);
    if (r) {
      let a = [];
      r[2] && a.push(`${r[1]}_${r[2]}`), a.push(r[1]);
      for (let o of a) if (i[o]) return o;
    }
    return e;
  }
  var no = L.Class.extend({ includes: [Nr, jr, $r, Ie, Dn], initialize(e) {
    this.map = e, this.Draw = new L.PM.Draw(e), this.Toolbar = new L.PM.Toolbar(e), this.Keyboard = $a(), this.globalOptions = { snappable: !0, layerGroup: void 0, snappingOrder: ["Marker", "CircleMarker", "Circle", "Line", "Polygon", "Rectangle"], panes: { vertexPane: "markerPane", layerPane: "overlayPane", markerPane: "markerPane" }, draggable: !0, exitModeOnEscape: !1, finishOnEnter: !1 }, this.Keyboard._initKeyListener(e);
  }, setLang(e = "en", i, r = "en") {
    e = Vr(e, ue);
    let a = L.PM.activeLang;
    i && (ue[e] = (0, Bn.default)(ue[r], i)), L.PM.activeLang = e, this.map.pm.Toolbar.reinit(), this._fireLangChange(a, e, r, ue[e]);
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
    let i = (0, Bn.default)(this.globalOptions, e);
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
    fn(this.map)._onMouseMove(this._createMouseEvent("mousemove", e));
  }, _canvasTouchClick(e) {
    let i = "";
    e.type === "touchstart" || e.type === "pointerdown" ? i = "mousedown" : (e.type === "touchend" || e.type === "pointerup" || e.type === "touchcancel" || e.type === "pointercancel") && (i = "mouseup"), i && fn(this.map)._onClick(this._createMouseEvent(i, e));
  }, _createMouseEvent(e, i) {
    let r, a = i.touches[0] || i.changedTouches[0];
    try {
      r = new MouseEvent(e, { bubbles: i.bubbles, cancelable: i.cancelable, view: i.view, detail: a.detail, screenX: a.screenX, screenY: a.screenY, clientX: a.clientX, clientY: a.clientY, ctrlKey: i.ctrlKey, altKey: i.altKey, shiftKey: i.shiftKey, metaKey: i.metaKey, button: i.button, relatedTarget: i.relatedTarget });
    } catch {
      r = document.createEvent("MouseEvents"), r.initMouseEvent(e, i.bubbles, i.cancelable, i.view, a.detail, a.screenX, a.screenY, a.clientX, a.clientY, i.ctrlKey, i.altKey, i.shiftKey, i.metaKey, i.button, i.relatedTarget);
    }
    return r;
  } }), di = no, ro = L.Control.extend({ includes: [Dn], options: { position: "topleft", disableByOtherButtons: !0 }, initialize(e) {
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
    let o = L.DomUtil.create("div", `leaflet-pm-actions-container ${i}`, r), u = e.actions, f = { cancel: { text: ae("actions.cancel"), title: ae("actions.cancel"), onClick() {
      this._triggerClick();
    } }, finishMode: { text: ae("actions.finish"), title: ae("actions.finish"), onClick() {
      this._triggerClick();
    } }, removeLastVertex: { text: ae("actions.removeLastVertex"), title: ae("actions.removeLastVertex"), onClick() {
      this._map.pm.Draw[e.jsClass]._removeLastVertex();
    } }, finish: { text: ae("actions.finish"), title: ae("actions.finish"), onClick(b) {
      this._map.pm.Draw[e.jsClass]._finishShape(b);
    } } };
    e._preparedActions = u.map((b) => {
      let C = typeof b == "string" ? b : b.name, F;
      if (f[C]) F = f[C];
      else if (b.text) F = b;
      else return F;
      let S = L.DomUtil.create("a", `leaflet-pm-action ${i} action-${C}`, o);
      if (S.setAttribute("role", "button"), S.setAttribute("tabindex", "0"), S.href = "#", F.title && (S.title = F.title), S.innerHTML = F.text, L.DomEvent.disableClickPropagation(S), L.DomEvent.on(S, "click", L.DomEvent.stop), F._node = S, !e.disabled && F.onClick) {
        let Z = (W) => {
          W.preventDefault();
          let lt = "", { buttons: vt } = this._map.pm.Toolbar;
          for (let kt in vt) if (vt[kt]._button === e) {
            lt = kt;
            break;
          }
          this._fireActionClick(F, lt, e);
        };
        L.DomEvent.addListener(S, "click", Z, this), L.DomEvent.addListener(S, "click", F.onClick, this), L.DomEvent.addListener(S, "click", () => this._updateActiveAction(e));
      }
      return F;
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
  } }), Za = ro;
  L.Control.PMButton = Za;
  var Ri = L.Class.extend({ options: { drawMarker: !0, drawRectangle: !0, drawPolyline: !0, drawPolygon: !0, drawCircle: !0, drawCircleMarker: !0, drawText: !0, editMode: !0, dragMode: !0, cutPolygon: !0, removalMode: !0, rotateMode: !0, snappingOption: !0, drawControls: !0, editControls: !0, optionsControls: !0, customControls: !0, oneBlock: !1, position: "topleft", positions: { draw: "", edit: "", options: "", custom: "" } }, customButtons: [], initialize(e) {
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
    let e = { className: "control-icon leaflet-pm-icon-marker", title: ae("buttonTitles.drawMarkerButton"), jsClass: "Marker", onClick: () => {
    }, afterClick: (Z, W) => {
      this.map.pm.Draw[W.button._button.jsClass].toggle();
    }, doToggle: !0, toggleStatus: !1, disableOtherButtons: !0, position: this.options.position, actions: ["cancel"] }, i = { title: ae("buttonTitles.drawPolyButton"), className: "control-icon leaflet-pm-icon-polygon", jsClass: "Polygon", onClick: () => {
    }, afterClick: (Z, W) => {
      this.map.pm.Draw[W.button._button.jsClass].toggle();
    }, doToggle: !0, toggleStatus: !1, disableOtherButtons: !0, position: this.options.position, actions: ["finish", "removeLastVertex", "cancel"] }, r = { className: "control-icon leaflet-pm-icon-polyline", title: ae("buttonTitles.drawLineButton"), jsClass: "Line", onClick: () => {
    }, afterClick: (Z, W) => {
      this.map.pm.Draw[W.button._button.jsClass].toggle();
    }, doToggle: !0, toggleStatus: !1, disableOtherButtons: !0, position: this.options.position, actions: ["finish", "removeLastVertex", "cancel"] }, a = { title: ae("buttonTitles.drawCircleButton"), className: "control-icon leaflet-pm-icon-circle", jsClass: "Circle", onClick: () => {
    }, afterClick: (Z, W) => {
      this.map.pm.Draw[W.button._button.jsClass].toggle();
    }, doToggle: !0, toggleStatus: !1, disableOtherButtons: !0, position: this.options.position, actions: ["cancel"] }, o = { title: ae("buttonTitles.drawCircleMarkerButton"), className: "control-icon leaflet-pm-icon-circle-marker", jsClass: "CircleMarker", onClick: () => {
    }, afterClick: (Z, W) => {
      this.map.pm.Draw[W.button._button.jsClass].toggle();
    }, doToggle: !0, toggleStatus: !1, disableOtherButtons: !0, position: this.options.position, actions: ["cancel"] }, u = { title: ae("buttonTitles.drawRectButton"), className: "control-icon leaflet-pm-icon-rectangle", jsClass: "Rectangle", onClick: () => {
    }, afterClick: (Z, W) => {
      this.map.pm.Draw[W.button._button.jsClass].toggle();
    }, doToggle: !0, toggleStatus: !1, disableOtherButtons: !0, position: this.options.position, actions: ["cancel"] }, f = { title: ae("buttonTitles.editButton"), className: "control-icon leaflet-pm-icon-edit", onClick: () => {
    }, afterClick: () => {
      this.map.pm.toggleGlobalEditMode();
    }, doToggle: !0, toggleStatus: !1, disableOtherButtons: !0, position: this.options.position, tool: "edit", actions: ["finishMode"] }, _ = { title: ae("buttonTitles.dragButton"), className: "control-icon leaflet-pm-icon-drag", onClick: () => {
    }, afterClick: () => {
      this.map.pm.toggleGlobalDragMode();
    }, doToggle: !0, toggleStatus: !1, disableOtherButtons: !0, position: this.options.position, tool: "edit", actions: ["finishMode"] }, b = { title: ae("buttonTitles.cutButton"), className: "control-icon leaflet-pm-icon-cut", jsClass: "Cut", onClick: () => {
    }, afterClick: (Z, W) => {
      this.map.pm.Draw[W.button._button.jsClass].toggle({ snappable: !0, cursorMarker: !0, allowSelfIntersection: !1 });
    }, doToggle: !0, toggleStatus: !1, disableOtherButtons: !0, position: this.options.position, tool: "edit", actions: ["finish", "removeLastVertex", "cancel"] }, C = { title: ae("buttonTitles.deleteButton"), className: "control-icon leaflet-pm-icon-delete", onClick: () => {
    }, afterClick: () => {
      this.map.pm.toggleGlobalRemovalMode();
    }, doToggle: !0, toggleStatus: !1, disableOtherButtons: !0, position: this.options.position, tool: "edit", actions: ["finishMode"] }, F = { title: ae("buttonTitles.rotateButton"), className: "control-icon leaflet-pm-icon-rotate", onClick: () => {
    }, afterClick: () => {
      this.map.pm.toggleGlobalRotateMode();
    }, doToggle: !0, toggleStatus: !1, disableOtherButtons: !0, position: this.options.position, tool: "edit", actions: ["finishMode"] }, S = { className: "control-icon leaflet-pm-icon-text", title: ae("buttonTitles.drawTextButton"), jsClass: "Text", onClick: () => {
    }, afterClick: (Z, W) => {
      this.map.pm.Draw[W.button._button.jsClass].toggle();
    }, doToggle: !0, toggleStatus: !1, disableOtherButtons: !0, position: this.options.position, actions: ["cancel"] };
    this._addButton("drawMarker", new L.Control.PMButton(e)), this._addButton("drawPolyline", new L.Control.PMButton(r)), this._addButton("drawRectangle", new L.Control.PMButton(u)), this._addButton("drawPolygon", new L.Control.PMButton(i)), this._addButton("drawCircle", new L.Control.PMButton(a)), this._addButton("drawCircleMarker", new L.Control.PMButton(o)), this._addButton("drawText", new L.Control.PMButton(S)), this._addButton("editMode", new L.Control.PMButton(f)), this._addButton("dragMode", new L.Control.PMButton(_)), this._addButton("cutPolygon", new L.Control.PMButton(b)), this._addButton("removalMode", new L.Control.PMButton(C)), this._addButton("rotateMode", new L.Control.PMButton(F));
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
    e.forEach((u) => {
      i[u] ? r.push(i[u]) : r.push(u);
    });
    let a = this.getButtons(), o = {};
    r.forEach((u) => {
      a[u] && (o[u] = a[u]);
    }), Object.keys(a).filter((u) => !a[u]._button.tool || a[u]._button.tool === "draw").forEach((u) => {
      r.indexOf(u) === -1 && (o[u] = a[u]);
    }), Object.keys(a).filter((u) => a[u]._button.tool === "edit").forEach((u) => {
      r.indexOf(u) === -1 && (o[u] = a[u]);
    }), Object.keys(a).filter((u) => a[u]._button.tool === "options").forEach((u) => {
      r.indexOf(u) === -1 && (o[u] = a[u]);
    }), Object.keys(a).filter((u) => a[u]._button.tool === "custom").forEach((u) => {
      r.indexOf(u) === -1 && (o[u] = a[u]);
    }), Object.keys(a).forEach((u) => {
      r.indexOf(u) === -1 && (o[u] = a[u]);
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
  } }), qa = Ri, Ha = x(Wn()), Gr = { _initSnappableMarkers() {
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
    var C, F, S;
    let r = e.target;
    if (r._snapped = !1, this.throttledList || (this.throttledList = L.Util.throttle(this._handleThrottleSnapping, 100, this)), ((C = e == null ? void 0 : e.originalEvent) == null ? void 0 : C.altKey) || ((S = (F = this._map) == null ? void 0 : F.pm) == null ? void 0 : S.Keyboard.isAltKeyPressed())) return !1;
    let a;
    if (i) {
      if (!this._otherSnapLayers || this._otherSnapLayers.length === 0) return !1;
      a = this._otherSnapLayers;
    } else this._snapList === void 0 && (this._createSnapList(), this._map.off("layeradd", this.throttledList, this), this._map.on("layeradd", this.throttledList, this)), a = this._snapList;
    if (a.length <= 0) return !1;
    let o = this._calcClosestLayer(r.getLatLng(), a);
    if (Object.keys(o).length === 0) return !1;
    let u = o.layer instanceof L.Marker || o.layer instanceof L.CircleMarker || !this.options.snapSegment, f;
    u ? f = o.latlng : f = this._checkPrioritiySnapping(o);
    let _ = this.options.snapDistance, b = { marker: r, shape: this._shape, snapLatLng: f, segment: o.segment, layer: this._layer, workingLayer: this._layer, layerInteractedWith: o.layer, distance: o.distance };
    if (this._fireSnapDrag(b.marker, b), this._fireSnapDrag(this._layer, b), o.distance < _) {
      r._orgLatLng = r.getLatLng(), r.setLatLng(f), r._snapped = !0, r._snapInfo = b;
      let Z = () => {
        this._snapLatLng = f, this._fireSnap(r, b), this._fireSnap(this._layer, b);
      }, W = this._snapLatLng || {}, lt = f || {};
      (W.lat !== lt.lat || W.lng !== lt.lng) && Z();
    } else this._snapLatLng && (this._unsnap(b), r._snapped = !1, r._snapInfo = void 0, this._fireUnsnap(b.marker, b), this._fireUnsnap(this._layer, b));
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
    }), e = e.filter((a) => this._layer !== a), e = e.filter((a) => a._latlng || a._latlngs && ie(a._latlngs)), e = e.filter((a) => !a._pmTempLayer), this._otherSnapLayers ? (this._otherSnapLayers.forEach(() => {
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
      let b = this._calcLayerDistances(e, f);
      if (b.distance = Math.floor(b.distance), this.debugIndicatorLines) {
        if (!this.debugIndicatorLines[_]) {
          let F = L.polyline([], { color: "red", pmIgnore: !0 });
          F._pmTempLayer = !0, this.debugIndicatorLines[_] = F;
        }
        this.debugIndicatorLines[_].setLatLngs([e, b.latlng]);
      }
      r === 1 && (o.distance === void 0 || b.distance - 5 <= o.distance) ? (b.distance + 5 < o.distance && (a = []), o = b, o.layer = f, a.push(o)) : r !== 1 && (o = {}, o = b, o.layer = f, a.push(o));
    }), r !== 1 && (a = a.sort((f, _) => f.distance - _.distance)), r === -1 && (r = a.length);
    let u = this._getClosestLayerByPriority(a, r);
    return L.Util.isArray(u) ? u : [u];
  }, _calcLayerDistances(e, i) {
    let r = this._map, a = i instanceof L.Marker || i instanceof L.CircleMarker, o = i instanceof L.Polygon, u = e;
    if (a) {
      let f = i.getLatLng();
      return { latlng: { ...f }, distance: this._getDistance(r, f, u) };
    }
    return this._calcLatLngDistances(u, i.getLatLngs(), r, o);
  }, _calcLatLngDistances(e, i, r, a = !1) {
    let o, u, f, _ = (b) => {
      b.forEach((C, F) => {
        if (Array.isArray(C)) {
          _(C);
          return;
        }
        if (this.options.snapSegment) {
          let S = C, Z;
          a ? Z = F + 1 === b.length ? 0 : F + 1 : Z = F + 1 === b.length ? void 0 : F + 1;
          let W = b[Z];
          if (W) {
            let lt = this._getDistanceToSegment(r, e, S, W);
            (u === void 0 || lt < u) && (u = lt, f = [S, W]);
          }
        } else {
          let S = this._getDistance(r, e, C);
          (u === void 0 || S < u) && (u = S, o = C);
        }
      });
    };
    return _(i), this.options.snapSegment ? { latlng: { ...this._getClosestPointOnSegment(r, e, f[0], f[1]) }, segment: f, distance: u } : { latlng: o, distance: u };
  }, _getClosestLayerByPriority(e, i = 1) {
    e = e.sort((f, _) => f._leaflet_id - _._leaflet_id);
    let r = ["Marker", "CircleMarker", "Circle", "Line", "Polygon", "Rectangle"], a = this._map.pm.globalOptions.snappingOrder || [], o = 0, u = {};
    return a.concat(r).forEach((f) => {
      u[f] || (o += 1, u[f] = o);
    }), e.sort(io("instanceofShape", u)), i === 1 ? e[0] || {} : e.slice(0, i);
  }, _checkPrioritiySnapping(e) {
    let i = this._map, r = e.segment[0], a = e.segment[1], o = e.latlng, u = o;
    if (this.options.snapVertex) {
      let f = this._getDistance(i, r, o), _ = this._getDistance(i, a, o), b = f < _ ? r : a, C = f < _ ? f : _;
      if (this.options.snapMiddle) {
        let S = L.PM.Utils.calcMiddleLatLng(i, r, a), Z = this._getDistance(i, S, o);
        Z < f && Z < _ && (b = S, C = Z);
      }
      let F = this.options.snapDistance;
      C < F && (u = b);
    }
    return { ...u };
  }, _unsnap() {
    delete this._snapLatLng;
  }, _getClosestPointOnSegment(e, i, r, a) {
    let o = e.getMaxZoom();
    o === 1 / 0 && (o = e.getZoom());
    let u = e.project(i, o), f = e.project(r, o), _ = e.project(a, o), b = L.LineUtil.closestPointOnSegment(u, f, _);
    return e.unproject(b, o);
  }, _getDistanceToSegment(e, i, r, a) {
    let o = e.latLngToContainerPoint(i), u = e.latLngToContainerPoint(r), f = e.latLngToContainerPoint(a);
    return L.LineUtil.pointToSegmentDistance(o, u, f);
  }, _getDistance(e, i, r) {
    return e.latLngToContainerPoint(i).distanceTo(e.latLngToContainerPoint(r));
  } }, Ka = Gr, Wa = L.Class.extend({ includes: [Ka, Dn], options: { snappable: !0, snapDistance: 20, snapMiddle: !1, allowSelfIntersection: !0, tooltips: !0, templineStyle: {}, hintlineStyle: { color: "#3388ff", dashArray: "5,5" }, pathOptions: null, cursorMarker: !0, finishOn: null, markerStyle: { draggable: !0, icon: L.icon() }, hideMiddleMarkers: !1, minRadiusCircle: null, maxRadiusCircle: null, minRadiusCircleMarker: null, maxRadiusCircleMarker: null, resizeableCircleMarker: !1, resizeableCircle: !0, markerEditable: !0, continueDrawing: !1, snapSegment: !0, requireSnapToFinish: !1, rectangleAngle: 0, textOptions: { text: null, focusAfterDraw: null, removeIfEmpty: null, className: null }, snapVertex: !0 }, setOptions(e) {
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
    i ? this.options.pathOptions = (0, Ha.default)(this.options.pathOptions, e) : this.options.pathOptions = e;
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
  } }), Ae = Wa;
  Ae.Marker = Ae.extend({ initialize(e) {
    this._map = e, this._shape = "Marker", this.toolbarButtonName = "drawMarker", this._layerIsDragging = !1;
  }, enable(e) {
    L.Util.setOptions(this, e), this._enabled = !0, this._isTouchDevice = !Ua(), this._map.getContainer().classList.add("geoman-draw-cursor"), this._map.on("click", this._createMarker, this), this._map.pm.Toolbar.toggleButton(this.toolbarButtonName, !0), this._isTouchDevice ? (this._createTouchHint(), this._hintMarker = L.marker(this._map.getCenter(), { ...this.options.markerStyle, opacity: 0, interactive: !1 }), this._setPane(this._hintMarker, "markerPane"), this._hintMarker._pmTempLayer = !0) : (this._hintMarker = L.marker(this._map.getCenter(), this.options.markerStyle), this._setPane(this._hintMarker, "markerPane"), this._hintMarker._pmTempLayer = !0, this._hintMarker.addTo(this._map), this.options.tooltips && this._hintMarker.bindTooltip(ae("tooltips.placeMarker"), { permanent: !0, offset: L.point(0, 10), direction: "bottom", opacity: 0.8 }).openTooltip(), this._map.on("mousemove", this._syncHintMarker, this)), this._layer = this._hintMarker, this.options.markerEditable && this._map.eachLayer((i) => {
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
    this.options.tooltips && (this._touchHint = L.DomUtil.create("div", "leaflet-pm-touch-hint"), this._touchHint.textContent = ae("tooltips.placeMarkerTouch"), this._map.getContainer().appendChild(this._touchHint));
  }, _removeTouchHint() {
    this._touchHint && this._touchHint.parentNode && (this._touchHint.parentNode.removeChild(this._touchHint), this._touchHint = null);
  } });
  var Xe = 63710088e-1, ao = { centimeters: Xe * 100, centimetres: Xe * 100, degrees: 360 / (2 * Math.PI), feet: Xe * 3.28084, inches: Xe * 39.37, kilometers: Xe / 1e3, kilometres: Xe / 1e3, meters: Xe, metres: Xe, miles: Xe / 1609.344, millimeters: Xe * 1e3, millimetres: Xe * 1e3, nauticalmiles: Xe / 1852, radians: 1, yards: Xe * 1.0936 };
  function fi(e, i, r = {}) {
    let a = { type: "Feature" };
    return (r.id === 0 || r.id) && (a.id = r.id), r.bbox && (a.bbox = r.bbox), a.properties = i || {}, a.geometry = e, a;
  }
  function pn(e, i, r = {}) {
    if (!e) throw new Error("coordinates is required");
    if (!Array.isArray(e)) throw new Error("coordinates must be an Array");
    if (e.length < 2) throw new Error("coordinates must be at least 2 numbers long");
    if (!mn(e[0]) || !mn(e[1])) throw new Error("coordinates must contain numbers");
    return fi({ type: "Point", coordinates: e }, i, r);
  }
  function In(e, i, r = {}) {
    if (e.length < 2) throw new Error("coordinates must be an array of two or more positions");
    return fi({ type: "LineString", coordinates: e }, i, r);
  }
  function ei(e, i = {}) {
    let r = { type: "FeatureCollection" };
    return i.id && (r.id = i.id), i.bbox && (r.bbox = i.bbox), r.features = e, r;
  }
  function nr(e, i = "kilometers") {
    let r = ao[i];
    if (!r) throw new Error(i + " units is invalid");
    return e * r;
  }
  function Ni(e) {
    return e % (2 * Math.PI) * 180 / Math.PI;
  }
  function _n(e) {
    return e % 360 * Math.PI / 180;
  }
  function mn(e) {
    return !isNaN(e) && e !== null && !Array.isArray(e);
  }
  function ii(e) {
    return e !== null && typeof e == "object" && !Array.isArray(e);
  }
  function Ja(e) {
    let i, r, a = { type: "FeatureCollection", features: [] };
    if (e.type === "Feature" ? r = e.geometry : r = e, r.type === "LineString") i = [r.coordinates];
    else if (r.type === "MultiLineString") i = r.coordinates;
    else if (r.type === "MultiPolygon") i = [].concat(...r.coordinates);
    else if (r.type === "Polygon") i = r.coordinates;
    else throw new Error("Input must be a LineString, MultiLineString, Polygon, or MultiPolygon Feature or Geometry");
    return i.forEach((o) => {
      i.forEach((u) => {
        for (let f = 0; f < o.length - 1; f++) for (let _ = f; _ < u.length - 1; _++) {
          if (o === u && (Math.abs(f - _) === 1 || f === 0 && _ === o.length - 2 && o[f][0] === o[o.length - 1][0] && o[f][1] === o[o.length - 1][1])) continue;
          let b = Xa(o[f][0], o[f][1], o[f + 1][0], o[f + 1][1], u[_][0], u[_][1], u[_ + 1][0], u[_ + 1][1]);
          b && a.features.push(pn([b[0], b[1]]));
        }
      });
    }), a;
  }
  function Xa(e, i, r, a, o, u, f, _) {
    let b, C, F, S, Z, W = { x: null, y: null, onLine1: !1, onLine2: !1 };
    return b = (_ - u) * (r - e) - (f - o) * (a - i), b === 0 ? W.x !== null && W.y !== null ? W : !1 : (C = i - u, F = e - o, S = (f - o) * C - (_ - u) * F, Z = (r - e) * C - (a - i) * F, C = S / b, F = Z / b, W.x = e + C * (r - e), W.y = i + C * (a - i), C >= 0 && C <= 1 && (W.onLine1 = !0), F >= 0 && F <= 1 && (W.onLine2 = !0), W.onLine1 && W.onLine2 ? [W.x, W.y] : !1);
  }
  var rr = Ja;
  Ae.Line = Ae.extend({ initialize(e) {
    this._map = e, this._shape = "Line", this.toolbarButtonName = "drawPolyline", this._doesSelfIntersect = !1;
  }, enable(e) {
    L.Util.setOptions(this, e), this._enabled = !0, this._markers = [], this._layerGroup = new L.FeatureGroup(), this._layerGroup._pmTempLayer = !0, this._layerGroup.addTo(this._map), this._layer = L.polyline([], { ...this.options.templineStyle, pmIgnore: !1 }), this._setPane(this._layer, "layerPane"), this._layer._pmTempLayer = !0, this._layerGroup.addLayer(this._layer), this._hintline = L.polyline([], this.options.hintlineStyle), this._setPane(this._hintline, "layerPane"), this._hintline._pmTempLayer = !0, this._layerGroup.addLayer(this._hintline), this._hintMarker = L.marker(this._map.getCenter(), { interactive: !1, zIndexOffset: 100, icon: L.divIcon({ className: "marker-icon cursor-marker" }) }), this._setPane(this._hintMarker, "vertexPane"), this._hintMarker._pmTempLayer = !0, this._layerGroup.addLayer(this._hintMarker), this.options.cursorMarker && L.DomUtil.addClass(this._hintMarker._icon, "visible"), this.options.tooltips && this._hintMarker.bindTooltip(ae("tooltips.firstVertex"), { permanent: !0, offset: L.point(0, 10), direction: "bottom", opacity: 0.8 }).openTooltip(), this._map.getContainer().classList.add("geoman-draw-cursor"), this._map.on("click", this._createVertex, this), this.options.finishOn && this.options.finishOn !== "snap" && this._map.on(this.options.finishOn, this._finishShape, this), this.options.finishOn === "dblclick" && (this.tempMapDoubleClickZoomState = this._map.doubleClickZoom._enabled, this.tempMapDoubleClickZoomState && this._map.doubleClickZoom.disable()), this._map.on("mousemove", this._syncHintMarker, this), this._hintMarker.on("move", this._syncHintLine, this), this._map.pm.Toolbar.toggleButton(this.toolbarButtonName, !0), this._otherSnapLayers = [], this.isRed = !1, this._fireDrawStart(), this._setGlobalDrawMode();
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
    return rr(this._layer.toGeoJSON(15)).features.length > 0;
  }, _handleSelfIntersection(e, i) {
    let r = L.polyline(this._layer.getLatLngs());
    e && (i || (i = this._hintMarker.getLatLng()), r.addLatLng(i));
    let a = rr(r.toGeoJSON(15));
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
    let o = e[e.length - 1], u = i.indexOf(o.getLatLng());
    i = i.slice(0, u + 1), this._layer.setLatLngs(i), this._layer._latlngInfo.pop(), this._syncHintLine(), this._setTooltipText(), this._fireVertexRemoved(r, a, "Draw"), this._change(this._layer.getLatLngs());
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
    e <= 1 ? i = ae("tooltips.continueLine") : i = ae("tooltips.finishLine"), this._hintMarker.setTooltipContent(i);
  }, _change(e) {
    this._fireChange(e, "Draw");
  }, setStyle() {
    var e, i;
    (e = this._layer) == null || e.setStyle(this.options.templineStyle), (i = this._hintline) == null || i.setStyle(this.options.hintlineStyle);
  } }), Ae.Polygon = Ae.Line.extend({ initialize(e) {
    this._map = e, this._shape = "Polygon", this.toolbarButtonName = "drawPolygon";
  }, enable(e) {
    L.PM.Draw.Line.prototype.enable.call(this, e), this._layer.pm._shape = "Polygon";
  }, _createMarker(e) {
    let i = new L.Marker(e, { draggable: !1, icon: L.divIcon({ className: "marker-icon" }) });
    return this._setPane(i, "vertexPane"), i._pmTempLayer = !0, this._layerGroup.addLayer(i), this._markers.push(i), this._layer.getLatLngs().flat().length === 1 ? (i.on("click", this._finishShape, this), this._tempSnapLayerIndex = this._otherSnapLayers.push(i) - 1, this.options.snappable && this._cleanupSnapping()) : i.on("click", () => 1), i;
  }, _setTooltipText() {
    let { length: e } = this._layer.getLatLngs().flat(), i = "";
    e <= 2 ? i = ae("tooltips.continueLine") : i = ae("tooltips.finishPoly"), this._hintMarker.setTooltipContent(i);
  }, _finishShape() {
    if (!this.options.allowSelfIntersection && (this._handleSelfIntersection(!0, this._layer.getLatLngs()[0]), this._doesSelfIntersect) || this.options.requireSnapToFinish && !this._hintMarker._snapped && !this._isFirstLayer()) return;
    let e = this._layer.getLatLngs();
    if (e.length <= 2) return;
    let i = L.polygon(e, this.options.pathOptions);
    this._setPane(i, "layerPane"), this._finishLayer(i), i.addTo(this._map.pm._getContainingLayer()), this._fireCreate(i), this._cleanupSnapping(), this._otherSnapLayers.splice(this._tempSnapLayerIndex, 1), delete this._tempSnapLayerIndex;
    let r = this._hintMarker.getLatLng();
    this.disable(), this.options.continueDrawing && (this.enable(), this._hintMarker.setLatLng(r));
  } }), Ae.Rectangle = Ae.extend({ initialize(e) {
    this._map = e, this._shape = "Rectangle", this.toolbarButtonName = "drawRectangle";
  }, enable(e) {
    if (L.Util.setOptions(this, e), this._enabled = !0, this._layerGroup = new L.FeatureGroup(), this._layerGroup._pmTempLayer = !0, this._layerGroup.addTo(this._map), this._layer = L.rectangle([[0, 0], [0, 0]], this.options.pathOptions), this._setPane(this._layer, "layerPane"), this._layer._pmTempLayer = !0, this._startMarker = L.marker(this._map.getCenter(), { icon: L.divIcon({ className: "marker-icon rect-start-marker" }), draggable: !1, zIndexOffset: -100, opacity: this.options.cursorMarker ? 1 : 0 }), this._setPane(this._startMarker, "vertexPane"), this._startMarker._pmTempLayer = !0, this._layerGroup.addLayer(this._startMarker), this._hintMarker = L.marker(this._map.getCenter(), { zIndexOffset: 150, icon: L.divIcon({ className: "marker-icon cursor-marker" }) }), this._setPane(this._hintMarker, "vertexPane"), this._hintMarker._pmTempLayer = !0, this._layerGroup.addLayer(this._hintMarker), this.options.cursorMarker && L.DomUtil.addClass(this._hintMarker._icon, "visible"), this.options.tooltips && this._hintMarker.bindTooltip(ae("tooltips.firstVertex"), { permanent: !0, offset: L.point(0, 10), direction: "bottom", opacity: 0.8 }).openTooltip(), this.options.cursorMarker) {
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
    }), this._map.off("click", this._placeStartingMarkers, this), this._map.on("click", this._finishShape, this), this._hintMarker.setTooltipContent(ae("tooltips.finishRect")), this._setRectangleOrigin();
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
    let e = Ga(this._startMarker.getLatLng(), this._map), i = Ga(this._hintMarker.getLatLng(), this._map), r = L.PM.Utils._getRotatedRectangle(e, i, this.options.rectangleAngle || 0, this._map);
    if (this._layer.setLatLngs(r), this.options.cursorMarker && this._styleMarkers) {
      let a = [];
      r.forEach((o) => {
        !o.equals(e, 1e-8) && !o.equals(i, 1e-8) && a.push(o);
      }), a.forEach((o, u) => {
        try {
          this._styleMarkers[u].setLatLng(o);
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
      let u = L.PM.Utils._getRotatedRectangle(r, i, this.options.rectangleAngle || 0, this._map);
      a.setLatLngs(u), a.pm && a.pm._setAngle(this.options.rectangleAngle || 0);
    }
    this._setPane(a, "layerPane"), this._finishLayer(a), a.addTo(this._map.pm._getContainingLayer()), this._fireCreate(a);
    let o = this._hintMarker.getLatLng();
    this.disable(), this.options.continueDrawing && (this.enable(), this._hintMarker.setLatLng(o));
  }, setStyle() {
    var e;
    (e = this._layer) == null || e.setStyle(this.options.pathOptions);
  } }), Ae.CircleMarker = Ae.extend({ initialize(e) {
    this._map = e, this._shape = "CircleMarker", this.toolbarButtonName = "drawCircleMarker", this._layerIsDragging = !1, this._BaseCircleClass = L.CircleMarker, this._minRadiusOption = "minRadiusCircleMarker", this._maxRadiusOption = "maxRadiusCircleMarker", this._editableOption = "resizeableCircleMarker", this._defaultRadius = 10;
  }, enable(e) {
    if (L.Util.setOptions(this, e), this.options.editable && (this.options.resizeableCircleMarker = this.options.editable, delete this.options.editable), this._enabled = !0, this._map.pm.Toolbar.toggleButton(this.toolbarButtonName, !0), this._map.getContainer().classList.add("geoman-draw-cursor"), this.options[this._editableOption]) {
      let i = {};
      L.extend(i, this.options.templineStyle), i.radius = 0, this._layerGroup = new L.FeatureGroup(), this._layerGroup._pmTempLayer = !0, this._layerGroup.addTo(this._map), this._layer = new this._BaseCircleClass(this._map.getCenter(), i), this._setPane(this._layer, "layerPane"), this._layer._pmTempLayer = !0, this._centerMarker = L.marker(this._map.getCenter(), { icon: L.divIcon({ className: "marker-icon" }), draggable: !1, zIndexOffset: 100 }), this._setPane(this._centerMarker, "vertexPane"), this._centerMarker._pmTempLayer = !0, this._hintMarker = L.marker(this._map.getCenter(), { zIndexOffset: 110, icon: L.divIcon({ className: "marker-icon cursor-marker" }) }), this._setPane(this._hintMarker, "vertexPane"), this._hintMarker._pmTempLayer = !0, this._layerGroup.addLayer(this._hintMarker), this.options.cursorMarker && L.DomUtil.addClass(this._hintMarker._icon, "visible"), this.options.tooltips && this._hintMarker.bindTooltip(ae("tooltips.startCircle"), { permanent: !0, offset: L.point(0, 10), direction: "bottom", opacity: 0.8 }).openTooltip(), this._hintline = L.polyline([], this.options.hintlineStyle), this._setPane(this._hintline, "layerPane"), this._hintline._pmTempLayer = !0, this._layerGroup.addLayer(this._hintline), this._map.on("click", this._placeCenterMarker, this);
    } else this._map.on("click", this._createMarker, this), this._hintMarker = new this._BaseCircleClass(this._map.getCenter(), { radius: this._defaultRadius, ...this.options.templineStyle }), this._setPane(this._hintMarker, "layerPane"), this._hintMarker._pmTempLayer = !0, this._hintMarker.addTo(this._map), this._layer = this._hintMarker, this.options.tooltips && this._hintMarker.bindTooltip(ae("tooltips.placeCircleMarker"), { permanent: !0, offset: L.point(0, 10), direction: "bottom", opacity: 0.8 }).openTooltip();
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
    e && (this._layer.setLatLng(e), this._hintMarker.on("move", this._syncHintLine, this), this._hintMarker.on("move", this._syncCircleRadius, this), this._hintMarker.setTooltipContent(ae("tooltips.finishCircle")), this._fireCenterPlaced(), this._fireChange(this._layer.getLatLng(), "Draw"));
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
    let u = this._hintMarker.getLatLng();
    this.disable(), this.options.continueDrawing && (this.enable(), this._hintMarker.setLatLng(u));
  }, _getNewDestinationOfHintMarker() {
    let e = this._hintMarker.getLatLng();
    if (this.options[this._editableOption]) {
      if (!this._layerGroup.hasLayer(this._centerMarker)) return e;
      let i = this._centerMarker.getLatLng(), r = this._distanceCalculation(i, e);
      this.options[this._minRadiusOption] && r < this.options[this._minRadiusOption] ? e = dn(this._map, i, e, this._getMinDistanceInMeter()) : this.options[this._maxRadiusOption] && r > this.options[this._maxRadiusOption] && (e = dn(this._map, i, e, this._getMaxDistanceInMeter()));
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
  } }), Ae.Circle = Ae.CircleMarker.extend({ initialize(e) {
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
  var ar = class {
    constructor(e = [], i = Zr) {
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
        let o = e - 1 >> 1, u = i[o];
        if (r(a, u) >= 0) break;
        i[e] = u, e = o;
      }
      i[e] = a;
    }
    _down(e) {
      let { data: i, compare: r } = this, a = this.length >> 1, o = i[e];
      for (; e < a; ) {
        let u = (e << 1) + 1, f = i[u], _ = u + 1;
        if (_ < this.length && r(i[_], f) < 0 && (u = _, f = i[_]), r(f, o) >= 0) break;
        i[e] = f, e = u;
      }
      i[e] = o;
    }
  };
  function Zr(e, i) {
    return e < i ? -1 : e > i ? 1 : 0;
  }
  function Ya(e, i) {
    return e.p.x > i.p.x ? 1 : e.p.x < i.p.x ? -1 : e.p.y !== i.p.y ? e.p.y > i.p.y ? 1 : -1 : 1;
  }
  function so(e, i) {
    return e.rightSweepEvent.p.x > i.rightSweepEvent.p.x ? 1 : e.rightSweepEvent.p.x < i.rightSweepEvent.p.x ? -1 : e.rightSweepEvent.p.y !== i.rightSweepEvent.p.y ? e.rightSweepEvent.p.y < i.rightSweepEvent.p.y ? 1 : -1 : 1;
  }
  var qr = class {
    constructor(e, i, r, a) {
      this.p = { x: e[0], y: e[1] }, this.featureId = i, this.ringId = r, this.eventId = a, this.otherEvent = null, this.isLeftEndpoint = null;
    }
    isSamePoint(e) {
      return this.p.x === e.p.x && this.p.y === e.p.y;
    }
  };
  function oo(e, i) {
    if (e.type === "FeatureCollection") {
      let r = e.features;
      for (let a = 0; a < r.length; a++) pi(r[a], i);
    } else pi(e, i);
  }
  var Ze = 0, Ci = 0, sr = 0;
  function pi(e, i) {
    let r = e.type === "Feature" ? e.geometry : e, a = r.coordinates;
    (r.type === "Polygon" || r.type === "MultiLineString") && (a = [a]), r.type === "LineString" && (a = [[a]]);
    for (let o = 0; o < a.length; o++) for (let u = 0; u < a[o].length; u++) {
      let f = a[o][u][0], _ = null;
      Ci = Ci + 1;
      for (let b = 0; b < a[o][u].length - 1; b++) {
        _ = a[o][u][b + 1];
        let C = new qr(f, Ze, Ci, sr), F = new qr(_, Ze, Ci, sr + 1);
        C.otherEvent = F, F.otherEvent = C, Ya(C, F) > 0 ? (F.isLeftEndpoint = !0, C.isLeftEndpoint = !1) : (C.isLeftEndpoint = !0, F.isLeftEndpoint = !1), i.push(C), i.push(F), f = _, sr = sr + 1;
      }
    }
    Ze = Ze + 1;
  }
  var lo = class {
    constructor(e) {
      this.leftSweepEvent = e, this.rightSweepEvent = e.otherEvent;
    }
  };
  function gn(e, i) {
    if (e === null || i === null || e.leftSweepEvent.ringId === i.leftSweepEvent.ringId && (e.rightSweepEvent.isSamePoint(i.leftSweepEvent) || e.rightSweepEvent.isSamePoint(i.leftSweepEvent) || e.rightSweepEvent.isSamePoint(i.rightSweepEvent) || e.leftSweepEvent.isSamePoint(i.leftSweepEvent) || e.leftSweepEvent.isSamePoint(i.rightSweepEvent))) return !1;
    let r = e.leftSweepEvent.p.x, a = e.leftSweepEvent.p.y, o = e.rightSweepEvent.p.x, u = e.rightSweepEvent.p.y, f = i.leftSweepEvent.p.x, _ = i.leftSweepEvent.p.y, b = i.rightSweepEvent.p.x, C = i.rightSweepEvent.p.y, F = (C - _) * (o - r) - (b - f) * (u - a), S = (b - f) * (a - _) - (C - _) * (r - f), Z = (o - r) * (a - _) - (u - a) * (r - f);
    if (F === 0) return !1;
    let W = S / F, lt = Z / F;
    if (W >= 0 && W <= 1 && lt >= 0 && lt <= 1) {
      let vt = r + W * (o - r), kt = a + W * (u - a);
      return [vt, kt];
    }
    return !1;
  }
  function uo(e, i) {
    i = i || !1;
    let r = [], a = new ar([], so);
    for (; e.length; ) {
      let o = e.pop();
      if (o.isLeftEndpoint) {
        let u = new lo(o);
        for (let f = 0; f < a.data.length; f++) {
          let _ = a.data[f];
          if (i && _.leftSweepEvent.featureId === o.featureId) continue;
          let b = gn(u, _);
          b !== !1 && r.push(b);
        }
        a.push(u);
      } else o.isLeftEndpoint === !1 && a.pop();
    }
    return r;
  }
  function On(e, i) {
    let r = new ar([], Ya);
    return oo(e, r), uo(r, i);
  }
  var Qa = On, or = Qa;
  function ts(e, i, r = {}) {
    let { removeDuplicates: a = !0, ignoreSelfIntersections: o = !0 } = r, u = [];
    e.type === "FeatureCollection" ? u = u.concat(e.features) : e.type === "Feature" ? u.push(e) : (e.type === "LineString" || e.type === "Polygon" || e.type === "MultiLineString" || e.type === "MultiPolygon") && u.push(fi(e)), i.type === "FeatureCollection" ? u = u.concat(i.features) : i.type === "Feature" ? u.push(i) : (i.type === "LineString" || i.type === "Polygon" || i.type === "MultiLineString" || i.type === "MultiPolygon") && u.push(fi(i));
    let f = or(ei(u), o), _ = [];
    if (a) {
      let b = {};
      f.forEach((C) => {
        let F = C.join(",");
        b[F] || (b[F] = !0, _.push(C));
      });
    } else _ = f;
    return ei(_.map((b) => pn(b)));
  }
  var ni = ts, lr = x(oe(), 1);
  function Hr(e, i, r) {
    if (e !== null) for (var a, o, u, f, _, b, C, F = 0, S = 0, Z, W = e.type, lt = W === "FeatureCollection", vt = W === "Feature", kt = lt ? e.features.length : 1, Bt = 0; Bt < kt; Bt++) {
      C = lt ? e.features[Bt].geometry : vt ? e.geometry : e, Z = C ? C.type === "GeometryCollection" : !1, _ = Z ? C.geometries.length : 1;
      for (var D = 0; D < _; D++) {
        var et = 0, ot = 0;
        if (f = Z ? C.geometries[D] : C, f !== null) {
          b = f.coordinates;
          var Lt = f.type;
          switch (F = 0, Lt) {
            case null:
              break;
            case "Point":
              if (i(b, S, Bt, et, ot) === !1) return !1;
              S++, et++;
              break;
            case "LineString":
            case "MultiPoint":
              for (a = 0; a < b.length; a++) {
                if (i(b[a], S, Bt, et, ot) === !1) return !1;
                S++, Lt === "MultiPoint" && et++;
              }
              Lt === "LineString" && et++;
              break;
            case "Polygon":
            case "MultiLineString":
              for (a = 0; a < b.length; a++) {
                for (o = 0; o < b[a].length - F; o++) {
                  if (i(b[a][o], S, Bt, et, ot) === !1) return !1;
                  S++;
                }
                Lt === "MultiLineString" && et++, Lt === "Polygon" && ot++;
              }
              Lt === "Polygon" && et++;
              break;
            case "MultiPolygon":
              for (a = 0; a < b.length; a++) {
                for (ot = 0, o = 0; o < b[a].length; o++) {
                  for (u = 0; u < b[a][o].length - F; u++) {
                    if (i(b[a][o][u], S, Bt, et, ot) === !1) return !1;
                    S++;
                  }
                  ot++;
                }
                et++;
              }
              break;
            case "GeometryCollection":
              for (a = 0; a < f.geometries.length; a++) if (Hr(f.geometries[a], i) === !1) return !1;
              break;
            default:
              throw new Error("Unknown Geometry Type");
          }
        }
      }
    }
  }
  function yn(e, i) {
    if (e.type === "Feature") i(e, 0);
    else if (e.type === "FeatureCollection") for (var r = 0; r < e.features.length && i(e.features[r], r) !== !1; r++) ;
  }
  function ho(e, i, r) {
    var a = r;
    return yn(e, function(o, u) {
      u === 0 && r === void 0 ? a = o : a = i(a, o, u);
    }), a;
  }
  function ki(e, i) {
    var r, a, o, u, f, _, b, C, F, S, Z = 0, W = e.type === "FeatureCollection", lt = e.type === "Feature", vt = W ? e.features.length : 1;
    for (r = 0; r < vt; r++) {
      for (_ = W ? e.features[r].geometry : lt ? e.geometry : e, C = W ? e.features[r].properties : lt ? e.properties : {}, F = W ? e.features[r].bbox : lt ? e.bbox : void 0, S = W ? e.features[r].id : lt ? e.id : void 0, b = _ ? _.type === "GeometryCollection" : !1, f = b ? _.geometries.length : 1, o = 0; o < f; o++) {
        if (u = b ? _.geometries[o] : _, u === null) {
          if (i(null, Z, C, F, S) === !1) return !1;
          continue;
        }
        switch (u.type) {
          case "Point":
          case "LineString":
          case "MultiPoint":
          case "Polygon":
          case "MultiLineString":
          case "MultiPolygon": {
            if (i(u, Z, C, F, S) === !1) return !1;
            break;
          }
          case "GeometryCollection": {
            for (a = 0; a < u.geometries.length; a++) if (i(u.geometries[a], Z, C, F, S) === !1) return !1;
            break;
          }
          default:
            throw new Error("Unknown Geometry Type");
        }
      }
      Z++;
    }
  }
  function Kr(e, i) {
    ki(e, function(r, a, o, u, f) {
      var _ = r === null ? null : r.type;
      switch (_) {
        case null:
        case "Point":
        case "LineString":
        case "Polygon":
          return i(fi(r, o, { bbox: u, id: f }), a, 0) === !1 ? !1 : void 0;
      }
      var b;
      switch (_) {
        case "MultiPoint":
          b = "Point";
          break;
        case "MultiLineString":
          b = "LineString";
          break;
        case "MultiPolygon":
          b = "Polygon";
          break;
      }
      for (var C = 0; C < r.coordinates.length; C++) {
        var F = r.coordinates[C], S = { type: b, coordinates: F };
        if (i(fi(S, o), a, C) === !1) return !1;
      }
    });
  }
  function Ne(e, i = {}) {
    if (e.bbox != null && i.recompute !== !0) return e.bbox;
    let r = [1 / 0, 1 / 0, -1 / 0, -1 / 0];
    return Hr(e, (a) => {
      r[0] > a[0] && (r[0] = a[0]), r[1] > a[1] && (r[1] = a[1]), r[2] < a[0] && (r[2] = a[0]), r[3] < a[1] && (r[3] = a[1]);
    }), r;
  }
  function Wr(e) {
    var i;
    if (e.bbox) i = e.bbox;
    else if (Array.isArray(e) && e.length === 4) i = e;
    else if (Array.isArray(e) && e.length === 6) i = [e[0], e[1], e[3], e[4]];
    else if (e.type === "Feature") i = Ne(e);
    else if (e.type === "FeatureCollection") i = Ne(e);
    else throw new Error("invalid geojson");
    return { minX: i[0], minY: i[1], maxX: i[2], maxY: i[3] };
  }
  var Ei = class {
    constructor(e = 9) {
      this.tree = new lr.default(e), this.tree.toBBox = Wr;
    }
    insert(e) {
      if (e.type !== "Feature") throw new Error("invalid feature");
      return e.bbox = e.bbox ? e.bbox : Ne(e), this.tree.insert(e), this;
    }
    load(e) {
      var i = [];
      return Array.isArray(e) ? e.forEach(function(r) {
        if (r.type !== "Feature") throw new Error("invalid features");
        r.bbox = r.bbox ? r.bbox : Ne(r), i.push(r);
      }) : yn(e, function(r) {
        if (r.type !== "Feature") throw new Error("invalid features");
        r.bbox = r.bbox ? r.bbox : Ne(r), i.push(r);
      }), this.tree.load(i), this;
    }
    remove(e, i) {
      if (e.type !== "Feature") throw new Error("invalid feature");
      return e.bbox = e.bbox ? e.bbox : Ne(e), this.tree.remove(e, i), this;
    }
    clear() {
      return this.tree.clear(), this;
    }
    search(e) {
      var i = this.tree.search(Wr(e));
      return ei(i);
    }
    collides(e) {
      return this.tree.collides(Wr(e));
    }
    all() {
      let e = this.tree.all();
      return ei(e);
    }
    toJSON() {
      return this.tree.toJSON();
    }
    fromJSON(e) {
      return this.tree.fromJSON(e), this;
    }
  };
  function Fn(e) {
    return new Ei(e);
  }
  function es(e, i) {
    if (i = i ?? {}, !ii(i)) throw new Error("options is invalid");
    var r = i.precision, a = i.coordinates, o = i.mutate;
    if (r = r == null || isNaN(r) ? 6 : r, a = a == null || isNaN(a) ? 3 : a, !e) throw new Error("<geojson> is required");
    if (typeof r != "number") throw new Error("<precision> must be a number");
    if (typeof a != "number") throw new Error("<coordinates> must be a number");
    (o === !1 || o === void 0) && (e = JSON.parse(JSON.stringify(e)));
    var u = Math.pow(10, r);
    return Hr(e, function(f) {
      Jr(f, u, a);
    }), e;
  }
  function Jr(e, i, r) {
    e.length > r && e.splice(r, e.length);
    for (var a = 0; a < e.length; a++) e[a] = Math.round(e[a] * i) / i;
    return e;
  }
  function Ye(e) {
    if (!e) throw new Error("coord is required");
    if (!Array.isArray(e)) {
      if (e.type === "Feature" && e.geometry !== null && e.geometry.type === "Point") return [...e.geometry.coordinates];
      if (e.type === "Point") return [...e.coordinates];
    }
    if (Array.isArray(e) && e.length >= 2 && !Array.isArray(e[0]) && !Array.isArray(e[1])) return [...e];
    throw new Error("coord must be GeoJSON Point or an Array of numbers");
  }
  function Mi(e) {
    if (Array.isArray(e)) return e;
    if (e.type === "Feature") {
      if (e.geometry !== null) return e.geometry.coordinates;
    } else if (e.coordinates) return e.coordinates;
    throw new Error("coords must be GeoJSON Feature, Geometry Object or an Array");
  }
  function Wi(e) {
    return e.type === "Feature" ? e.geometry : e;
  }
  function Ji(e, i) {
    return e.type === "FeatureCollection" ? "FeatureCollection" : e.type === "GeometryCollection" ? "GeometryCollection" : e.type === "Feature" && e.geometry !== null ? e.geometry.type : e.type;
  }
  function ur(e) {
    if (!e) throw new Error("geojson is required");
    let i = [];
    return Kr(e, (r) => {
      Xr(r, i);
    }), ei(i);
  }
  function Xr(e, i) {
    let r = [], a = e.geometry;
    if (a !== null) {
      switch (a.type) {
        case "Polygon":
          r = Mi(a);
          break;
        case "LineString":
          r = [Mi(a)];
      }
      r.forEach((o) => {
        is(o, e.properties).forEach((u) => {
          u.id = i.length, i.push(u);
        });
      });
    }
  }
  function is(e, i) {
    let r = [];
    return e.reduce((a, o) => {
      let u = In([a, o], i);
      return u.bbox = co(a, o), r.push(u), o;
    }), r;
  }
  function co(e, i) {
    let r = e[0], a = e[1], o = i[0], u = i[1], f = r < o ? r : o, _ = a < u ? a : u, b = r > o ? r : o, C = a > u ? a : u;
    return [f, _, b, C];
  }
  function vn(e, i, r = {}) {
    var a = Ye(e), o = Ye(i), u = _n(o[1] - a[1]), f = _n(o[0] - a[0]), _ = _n(a[1]), b = _n(o[1]), C = Math.pow(Math.sin(u / 2), 2) + Math.pow(Math.sin(f / 2), 2) * Math.cos(_) * Math.cos(b);
    return nr(2 * Math.atan2(Math.sqrt(C), Math.sqrt(1 - C)), r.units);
  }
  var fo = Object.defineProperty, ns = Object.defineProperties, po = Object.getOwnPropertyDescriptors, Yr = Object.getOwnPropertySymbols, _o = Object.prototype.hasOwnProperty, _i = Object.prototype.propertyIsEnumerable, Rn = (e, i, r) => i in e ? fo(e, i, { enumerable: !0, configurable: !0, writable: !0, value: r }) : e[i] = r, mo = (e, i) => {
    for (var r in i || (i = {})) _o.call(i, r) && Rn(e, r, i[r]);
    if (Yr) for (var r of Yr(i)) _i.call(i, r) && Rn(e, r, i[r]);
    return e;
  }, hr = (e, i) => ns(e, po(i));
  function go(e, i, r = {}) {
    if (!e || !i) throw new Error("lines and inputPoint are required arguments");
    let a = Ye(i), o = pn([1 / 0, 1 / 0], { lineStringIndex: -1, segmentIndex: -1, totalDistance: -1, lineDistance: -1, segmentDistance: -1, pointDistance: 1 / 0, multiFeatureIndex: -1, index: -1, location: -1, dist: 1 / 0 }), u = 0, f = 0, _ = -1;
    return Kr(e, function(b, C, F) {
      _ !== F && (_ = F, f = 0);
      let S = Mi(b);
      for (let Z = 0; Z < S.length - 1; Z++) {
        let W = pn(S[Z]), lt = Ye(W), vt = pn(S[Z + 1]), kt = Ye(vt), Bt = vn(W, vt, r), D, et;
        kt[0] === a[0] && kt[1] === a[1] ? [D, et] = [kt, !0] : lt[0] === a[0] && lt[1] === a[1] ? [D, et] = [lt, !1] : [D, et] = ss(lt, kt, a);
        let ot = vn(i, D, r);
        if (ot < o.properties.pointDistance) {
          let Lt = vn(W, D, r);
          o = pn(D, { lineStringIndex: F, segmentIndex: et ? Z + 1 : Z, totalDistance: u + Lt, lineDistance: f + Lt, segmentDistance: Lt, pointDistance: ot, multiFeatureIndex: -1, index: -1, location: -1, dist: 1 / 0 }), o.properties = hr(mo({}, o.properties), { multiFeatureIndex: o.properties.lineStringIndex, index: o.properties.segmentIndex, location: o.properties.totalDistance, dist: o.properties.pointDistance });
        }
        u += Bt, f += Bt;
      }
    }), o;
  }
  function zi(e, i) {
    let [r, a, o] = e, [u, f, _] = i;
    return r * u + a * f + o * _;
  }
  function Nn(e, i) {
    let [r, a, o] = e, [u, f, _] = i;
    return [a * _ - o * f, o * u - r * _, r * f - a * u];
  }
  function zn(e) {
    return Math.sqrt(Math.pow(e[0], 2) + Math.pow(e[1], 2) + Math.pow(e[2], 2));
  }
  function rs(e) {
    let i = zn(e);
    return [e[0] / i, e[1] / i, e[2] / i];
  }
  function ji(e) {
    let i = _n(e[1]), r = _n(e[0]);
    return [Math.cos(i) * Math.cos(r), Math.cos(i) * Math.sin(r), Math.sin(i)];
  }
  function as(e) {
    let [i, r, a] = e, o = Math.min(Math.max(a, -1), 1), u = Ni(Math.asin(o));
    return [Ni(Math.atan2(r, i)), u];
  }
  function ss(e, i, r) {
    let a = ji(e), o = ji(i), u = ji(r), f = Nn(a, o);
    if (f[0] === 0 && f[1] === 0 && f[2] === 0) return zi(a, o) > 0 ? [[...i], !0] : [[...r], !1];
    let _ = Nn(f, u);
    if (_[0] === 0 && _[1] === 0 && _[2] === 0) return [[...i], !0];
    let b = Nn(_, f), C = rs(b), F = [-C[0], -C[1], -C[2]], S = zi(u, C) > zi(u, F) ? C : F, Z = rs(f), W = zi(Nn(a, S), Z), lt = zi(Nn(S, o), Z);
    return W >= 0 && lt >= 0 ? [as(S), !1] : zi(a, u) > zi(o, u) ? [[...e], !1] : [[...i], !0];
  }
  function os(e, i) {
    if (!e) throw new Error("line is required");
    if (!i) throw new Error("splitter is required");
    let r = Ji(e), a = Ji(i);
    if (r !== "LineString") throw new Error("line must be LineString");
    if (a === "FeatureCollection") throw new Error("splitter cannot be a FeatureCollection");
    if (a === "GeometryCollection") throw new Error("splitter cannot be a GeometryCollection");
    var o = es(i, { precision: 7 });
    switch (e.type !== "Feature" && (e = fi(e)), a) {
      case "Point":
        return cr(e, o);
      case "MultiPoint":
        return mi(e, o);
      case "LineString":
      case "MultiLineString":
      case "Polygon":
      case "MultiPolygon":
        return mi(e, ts(e, o, { ignoreSelfIntersections: !0 }));
    }
  }
  function mi(e, i) {
    var r = [], a = Fn();
    return Kr(i, function(o) {
      if (r.forEach(function(_, b) {
        _.id = b;
      }), !r.length) r = cr(e, o).features, a.load(ei(r));
      else {
        var u = a.search(o);
        if (u.features.length) {
          var f = Qr(o, u);
          r = r.filter(function(_) {
            return _.id !== f.id;
          }), a.remove(f), yn(cr(f, o), function(_) {
            r.push(_), a.insert(_);
          });
        }
      }
    }), ei(r);
  }
  function cr(e, i) {
    var r = [], a = Mi(e)[0], o = Mi(e)[e.geometry.coordinates.length - 1];
    if (Xi(a, Ye(i)) || Xi(o, Ye(i))) return ei([e]);
    var u = Fn(), f = ur(e);
    u.load(f);
    var _ = u.search(i);
    if (!_.features.length) return ei([e]);
    var b = Qr(i, _), C = [a], F = ho(f, function(S, Z, W) {
      var lt = Mi(Z)[1], vt = Ye(i);
      return W === b.id ? (S.push(vt), r.push(In(S)), Xi(vt, lt) ? [vt] : [vt, lt]) : (S.push(lt), S);
    }, C);
    return F.length > 1 && r.push(In(F)), ei(r);
  }
  function Qr(e, i) {
    if (!i.features.length) throw new Error("lines must contain features");
    if (i.features.length === 1) return i.features[0];
    var r, a = 1 / 0;
    return yn(i, function(o) {
      var u = go(o, e), f = u.properties.dist;
      f < a && (r = o, a = f);
    }), r;
  }
  function Xi(e, i) {
    return e[0] === i[0] && e[1] === i[1];
  }
  var yo = os, ri = 11102230246251565e-32, Ee = 134217729, ls = (3 + 8 * ri) * ri;
  function dr(e, i, r, a, o) {
    let u, f, _, b, C = i[0], F = a[0], S = 0, Z = 0;
    F > C == F > -C ? (u = C, C = i[++S]) : (u = F, F = a[++Z]);
    let W = 0;
    if (S < e && Z < r) for (F > C == F > -C ? (f = C + u, _ = u - (f - C), C = i[++S]) : (f = F + u, _ = u - (f - F), F = a[++Z]), u = f, _ !== 0 && (o[W++] = _); S < e && Z < r; ) F > C == F > -C ? (f = u + C, b = f - u, _ = u - (f - b) + (C - b), C = i[++S]) : (f = u + F, b = f - u, _ = u - (f - b) + (F - b), F = a[++Z]), u = f, _ !== 0 && (o[W++] = _);
    for (; S < e; ) f = u + C, b = f - u, _ = u - (f - b) + (C - b), C = i[++S], u = f, _ !== 0 && (o[W++] = _);
    for (; Z < r; ) f = u + F, b = f - u, _ = u - (f - b) + (F - b), F = a[++Z], u = f, _ !== 0 && (o[W++] = _);
    return (u !== 0 || W === 0) && (o[W++] = u), W;
  }
  function vo(e, i) {
    let r = i[0];
    for (let a = 1; a < e; a++) r += i[a];
    return r;
  }
  function bn(e) {
    return new Float64Array(e);
  }
  var us = (3 + 16 * ri) * ri, hs = (2 + 12 * ri) * ri, cs = (9 + 64 * ri) * ri * ri, Yi = bn(4), ds = bn(8), ta = bn(12), ea = bn(16), ze = bn(4);
  function t(e, i, r, a, o, u, f) {
    let _, b, C, F, S, Z, W, lt, vt, kt, Bt, D, et, ot, Lt, xt, wt, M, P = e - o, T = r - o, q = i - u, V = a - u;
    ot = P * V, Z = Ee * P, W = Z - (Z - P), lt = P - W, Z = Ee * V, vt = Z - (Z - V), kt = V - vt, Lt = lt * kt - (ot - W * vt - lt * vt - W * kt), xt = q * T, Z = Ee * q, W = Z - (Z - q), lt = q - W, Z = Ee * T, vt = Z - (Z - T), kt = T - vt, wt = lt * kt - (xt - W * vt - lt * vt - W * kt), Bt = Lt - wt, S = Lt - Bt, Yi[0] = Lt - (Bt + S) + (S - wt), D = ot + Bt, S = D - ot, et = ot - (D - S) + (Bt - S), Bt = et - xt, S = et - Bt, Yi[1] = et - (Bt + S) + (S - xt), M = D + Bt, S = M - D, Yi[2] = D - (M - S) + (Bt - S), Yi[3] = M;
    let z = vo(4, Yi), tt = hs * f;
    if (z >= tt || -z >= tt || (S = e - P, _ = e - (P + S) + (S - o), S = r - T, C = r - (T + S) + (S - o), S = i - q, b = i - (q + S) + (S - u), S = a - V, F = a - (V + S) + (S - u), _ === 0 && b === 0 && C === 0 && F === 0) || (tt = cs * f + ls * Math.abs(z), z += P * F + V * _ - (q * C + T * b), z >= tt || -z >= tt)) return z;
    ot = _ * V, Z = Ee * _, W = Z - (Z - _), lt = _ - W, Z = Ee * V, vt = Z - (Z - V), kt = V - vt, Lt = lt * kt - (ot - W * vt - lt * vt - W * kt), xt = b * T, Z = Ee * b, W = Z - (Z - b), lt = b - W, Z = Ee * T, vt = Z - (Z - T), kt = T - vt, wt = lt * kt - (xt - W * vt - lt * vt - W * kt), Bt = Lt - wt, S = Lt - Bt, ze[0] = Lt - (Bt + S) + (S - wt), D = ot + Bt, S = D - ot, et = ot - (D - S) + (Bt - S), Bt = et - xt, S = et - Bt, ze[1] = et - (Bt + S) + (S - xt), M = D + Bt, S = M - D, ze[2] = D - (M - S) + (Bt - S), ze[3] = M;
    let H = dr(4, Yi, 4, ze, ds);
    ot = P * F, Z = Ee * P, W = Z - (Z - P), lt = P - W, Z = Ee * F, vt = Z - (Z - F), kt = F - vt, Lt = lt * kt - (ot - W * vt - lt * vt - W * kt), xt = q * C, Z = Ee * q, W = Z - (Z - q), lt = q - W, Z = Ee * C, vt = Z - (Z - C), kt = C - vt, wt = lt * kt - (xt - W * vt - lt * vt - W * kt), Bt = Lt - wt, S = Lt - Bt, ze[0] = Lt - (Bt + S) + (S - wt), D = ot + Bt, S = D - ot, et = ot - (D - S) + (Bt - S), Bt = et - xt, S = et - Bt, ze[1] = et - (Bt + S) + (S - xt), M = D + Bt, S = M - D, ze[2] = D - (M - S) + (Bt - S), ze[3] = M;
    let Y = dr(H, ds, 4, ze, ta);
    ot = _ * F, Z = Ee * _, W = Z - (Z - _), lt = _ - W, Z = Ee * F, vt = Z - (Z - F), kt = F - vt, Lt = lt * kt - (ot - W * vt - lt * vt - W * kt), xt = b * C, Z = Ee * b, W = Z - (Z - b), lt = b - W, Z = Ee * C, vt = Z - (Z - C), kt = C - vt, wt = lt * kt - (xt - W * vt - lt * vt - W * kt), Bt = Lt - wt, S = Lt - Bt, ze[0] = Lt - (Bt + S) + (S - wt), D = ot + Bt, S = D - ot, et = ot - (D - S) + (Bt - S), Bt = et - xt, S = et - Bt, ze[1] = et - (Bt + S) + (S - xt), M = D + Bt, S = M - D, ze[2] = D - (M - S) + (Bt - S), ze[3] = M;
    let rt = dr(Y, ta, 4, ze, ea);
    return ea[rt - 1];
  }
  function n(e, i, r, a, o, u) {
    let f = (i - u) * (r - o), _ = (e - o) * (a - u), b = f - _, C = Math.abs(f + _);
    return Math.abs(b) >= us * C ? b : -t(e, i, r, a, o, u, C);
  }
  function s(e, i) {
    var r, a, o = 0, u, f, _, b, C, F, S, Z = e[0], W = e[1], lt = i.length;
    for (r = 0; r < lt; r++) {
      a = 0;
      var vt = i[r], kt = vt.length - 1;
      if (F = vt[0], F[0] !== vt[kt][0] && F[1] !== vt[kt][1]) throw new Error("First and last coordinates in a ring must be the same");
      for (f = F[0] - Z, _ = F[1] - W, a; a < kt; a++) {
        if (S = vt[a + 1], b = S[0] - Z, C = S[1] - W, _ === 0 && C === 0) {
          if (b <= 0 && f >= 0 || f <= 0 && b >= 0) return 0;
        } else if (C >= 0 && _ <= 0 || C <= 0 && _ >= 0) {
          if (u = n(f, b, _, C, 0, 0), u === 0) return 0;
          (u > 0 && C > 0 && _ <= 0 || u < 0 && C <= 0 && _ > 0) && o++;
        }
        F = S, _ = C, f = b;
      }
    }
    return o % 2 !== 0;
  }
  function c(e, i, r = {}) {
    if (!e) throw new Error("point is required");
    if (!i) throw new Error("polygon is required");
    let a = Ye(e), o = Wi(i), u = o.type, f = i.bbox, _ = o.coordinates;
    if (f && m(a, f) === !1) return !1;
    u === "Polygon" && (_ = [_]);
    let b = !1;
    for (var C = 0; C < _.length; ++C) {
      let F = s(a, _[C]);
      if (F === 0) return !r.ignoreBoundary;
      F && (b = !0);
    }
    return b;
  }
  function m(e, i) {
    return i[0] <= e[0] && i[1] <= e[1] && i[2] >= e[0] && i[3] >= e[1];
  }
  function E(e, i, r = {}) {
    let a = Ye(e), o = Mi(i);
    for (let u = 0; u < o.length - 1; u++) {
      let f = !1;
      if (r.ignoreEndVertices && (u === 0 && (f = "start"), u === o.length - 2 && (f = "end"), u === 0 && u + 1 === o.length - 1 && (f = "both")), $(o[u], o[u + 1], a, f, typeof r.epsilon > "u" ? null : r.epsilon)) return !0;
    }
    return !1;
  }
  function $(e, i, r, a, o) {
    let u = r[0], f = r[1], _ = e[0], b = e[1], C = i[0], F = i[1], S = r[0] - _, Z = r[1] - b, W = C - _, lt = F - b, vt = S * lt - Z * W;
    if (o !== null) {
      if (Math.abs(vt) > o) return !1;
    } else if (vt !== 0) return !1;
    if (Math.abs(W) === Math.abs(lt) && Math.abs(W) === 0) return a ? !1 : r[0] === e[0] && r[1] === e[1];
    if (a) {
      if (a === "start") return Math.abs(W) >= Math.abs(lt) ? W > 0 ? _ < u && u <= C : C <= u && u < _ : lt > 0 ? b < f && f <= F : F <= f && f < b;
      if (a === "end") return Math.abs(W) >= Math.abs(lt) ? W > 0 ? _ <= u && u < C : C < u && u <= _ : lt > 0 ? b <= f && f < F : F < f && f <= b;
      if (a === "both") return Math.abs(W) >= Math.abs(lt) ? W > 0 ? _ < u && u < C : C < u && u < _ : lt > 0 ? b < f && f < F : F < f && f < b;
    } else return Math.abs(W) >= Math.abs(lt) ? W > 0 ? _ <= u && u <= C : C <= u && u <= _ : lt > 0 ? b <= f && f <= F : F <= f && f <= b;
    return !1;
  }
  function it(e, i) {
    let r = Wi(e), a = Wi(i), o = r.type, u = a.type, f = r.coordinates, _ = a.coordinates;
    switch (o) {
      case "Point":
        if (u === "Point") return ia(f, _);
        throw new Error("feature2 " + u + " geometry not supported");
      case "MultiPoint":
        switch (u) {
          case "Point":
            return Pt(r, a);
          case "MultiPoint":
            return $t(r, a);
          default:
            throw new Error("feature2 " + u + " geometry not supported");
        }
      case "LineString":
        switch (u) {
          case "Point":
            return E(a, r, { ignoreEndVertices: !0 });
          case "LineString":
            return Te(r, a);
          case "MultiPoint":
            return te(r, a);
          default:
            throw new Error("feature2 " + u + " geometry not supported");
        }
      case "Polygon":
        switch (u) {
          case "Point":
            return c(a, r, { ignoreBoundary: !0 });
          case "LineString":
            return qe(r, a);
          case "Polygon":
            return $i(r, a);
          case "MultiPoint":
            return je(r, a);
          case "MultiPolygon":
            return yt(r, a);
          default:
            throw new Error("feature2 " + u + " geometry not supported");
        }
      case "MultiPolygon":
        if (u === "Polygon") return st(r, a);
        throw new Error("feature2 " + u + " geometry not supported");
      default:
        throw new Error("feature1 " + o + " geometry not supported");
    }
  }
  function st(e, i) {
    return e.coordinates.some((r) => $i({ type: "Polygon", coordinates: r }, i));
  }
  function yt(e, i) {
    return i.coordinates.every((r) => $i(e, { type: "Polygon", coordinates: r }));
  }
  function Pt(e, i) {
    let r, a = !1;
    for (r = 0; r < e.coordinates.length; r++) if (ia(e.coordinates[r], i.coordinates)) {
      a = !0;
      break;
    }
    return a;
  }
  function $t(e, i) {
    for (let r of i.coordinates) {
      let a = !1;
      for (let o of e.coordinates) if (ia(r, o)) {
        a = !0;
        break;
      }
      if (!a) return !1;
    }
    return !0;
  }
  function te(e, i) {
    let r = !1;
    for (let a of i.coordinates) if (E(a, e, { ignoreEndVertices: !0 }) && (r = !0), !E(a, e)) return !1;
    return !!r;
  }
  function je(e, i) {
    for (let r of i.coordinates) if (!c(r, e, { ignoreBoundary: !0 })) return !1;
    return !0;
  }
  function Te(e, i) {
    let r = !1;
    for (let a of i.coordinates) if (E({ type: "Point", coordinates: a }, e, { ignoreEndVertices: !0 }) && (r = !0), !E({ type: "Point", coordinates: a }, e, { ignoreEndVertices: !1 })) return !1;
    return r;
  }
  function ai(e, i) {
    let r = e.coordinates, a = [];
    for (let o = 0; o < r.length - 1; o++) {
      let u = In([r[o], r[o + 1]]), f = os(u, fi(i));
      f.features.length === 0 ? a.push(u) : a.push(...f.features);
    }
    return ei(a);
  }
  function qe(e, i) {
    let r = Ne(e), a = Ne(i);
    if (!fs(r, a)) return !1;
    for (let f of i.coordinates) if (!c(f, e)) return !1;
    let o = !1, u = ai(i, e);
    for (let f of u.features) {
      let _ = bo(f.geometry.coordinates[0], f.geometry.coordinates[1]);
      if (!c(_, e)) return !1;
      !o && c(_, e, { ignoreBoundary: !0 }) && (o = !0);
    }
    return o;
  }
  function $i(e, i) {
    if (e.type === "Feature" && e.geometry === null || i.type === "Feature" && i.geometry === null) return !1;
    let r = Ne(e), a = Ne(i);
    if (!fs(r, a)) return !1;
    let o = Wi(i).coordinates;
    for (let u of o) for (let f of u) if (!c(f, e)) return !1;
    return !0;
  }
  function fs(e, i) {
    return !(e[0] > i[0] || e[2] < i[2] || e[1] > i[1] || e[3] < i[3]);
  }
  function ia(e, i) {
    return e[0] === i[0] && e[1] === i[1];
  }
  function bo(e, i) {
    return [(e[0] + i[0]) / 2, (e[1] + i[1]) / 2];
  }
  var ps = it, xo = x(Oi()), _s = /^-?(?:\d+(?:\.\d*)?|\.\d+)(?:e[+-]?\d+)?$/i, ve = Math.ceil, $e = Math.floor, He = "[BigNumber Error] ", ms = He + "Number primitive has more than 15 significant digits: ", li = 1e14, Ut = 14, fr = 9007199254740991, na = [1, 10, 100, 1e3, 1e4, 1e5, 1e6, 1e7, 1e8, 1e9, 1e10, 1e11, 1e12, 1e13], xn = 1e7, Fe = 1e9;
  function qo(e) {
    var i, r, a, o = D.prototype = { constructor: D, toString: null, valueOf: null }, u = new D(1), f = 20, _ = 4, b = -7, C = 21, F = -1e7, S = 1e7, Z = !1, W = 1, lt = 0, vt = { prefix: "", groupSize: 3, secondaryGroupSize: 0, groupSeparator: ",", decimalSeparator: ".", fractionGroupSize: 0, fractionGroupSeparator: " ", suffix: "" }, kt = "0123456789abcdefghijklmnopqrstuvwxyz", Bt = !0;
    function D(M, P) {
      var T, q, V, z, tt, H, Y, rt, nt = this;
      if (!(nt instanceof D)) return new D(M, P);
      if (P == null) {
        if (M && M._isBigNumber === !0) {
          nt.s = M.s, !M.c || M.e > S ? nt.c = nt.e = null : M.e < F ? nt.c = [nt.e = 0] : (nt.e = M.e, nt.c = M.c.slice());
          return;
        }
        if ((H = typeof M == "number") && M * 0 == 0) {
          if (nt.s = 1 / M < 0 ? (M = -M, -1) : 1, M === ~~M) {
            for (z = 0, tt = M; tt >= 10; tt /= 10, z++) ;
            z > S ? nt.c = nt.e = null : (nt.e = z, nt.c = [M]);
            return;
          }
          rt = String(M);
        } else {
          if (!_s.test(rt = String(M))) return a(nt, rt, H);
          nt.s = rt.charCodeAt(0) == 45 ? (rt = rt.slice(1), -1) : 1;
        }
        (z = rt.indexOf(".")) > -1 && (rt = rt.replace(".", "")), (tt = rt.search(/e/i)) > 0 ? (z < 0 && (z = tt), z += +rt.slice(tt + 1), rt = rt.substring(0, tt)) : z < 0 && (z = rt.length);
      } else {
        if (we(P, 2, kt.length, "Base"), P == 10 && Bt) return nt = new D(M), xt(nt, f + nt.e + 1, _);
        if (rt = String(M), H = typeof M == "number") {
          if (M * 0 != 0) return a(nt, rt, H, P);
          if (nt.s = 1 / M < 0 ? (rt = rt.slice(1), -1) : 1, D.DEBUG && rt.replace(/^0\.0*|\./, "").length > 15) throw Error(ms + M);
        } else nt.s = rt.charCodeAt(0) === 45 ? (rt = rt.slice(1), -1) : 1;
        for (T = kt.slice(0, P), z = tt = 0, Y = rt.length; tt < Y; tt++) if (T.indexOf(q = rt.charAt(tt)) < 0) {
          if (q == ".") {
            if (tt > z) {
              z = Y;
              continue;
            }
          } else if (!V && (rt == rt.toUpperCase() && (rt = rt.toLowerCase()) || rt == rt.toLowerCase() && (rt = rt.toUpperCase()))) {
            V = !0, tt = -1, z = 0;
            continue;
          }
          return a(nt, String(M), H, P);
        }
        H = !1, rt = r(rt, P, 10, nt.s), (z = rt.indexOf(".")) > -1 ? rt = rt.replace(".", "") : z = rt.length;
      }
      for (tt = 0; rt.charCodeAt(tt) === 48; tt++) ;
      for (Y = rt.length; rt.charCodeAt(--Y) === 48; ) ;
      if (rt = rt.slice(tt, ++Y)) {
        if (Y -= tt, H && D.DEBUG && Y > 15 && (M > fr || M !== $e(M))) throw Error(ms + nt.s * M);
        if ((z = z - tt - 1) > S) nt.c = nt.e = null;
        else if (z < F) nt.c = [nt.e = 0];
        else {
          if (nt.e = z, nt.c = [], tt = (z + 1) % Ut, z < 0 && (tt += Ut), tt < Y) {
            for (tt && nt.c.push(+rt.slice(0, tt)), Y -= Ut; tt < Y; ) nt.c.push(+rt.slice(tt, tt += Ut));
            tt = Ut - (rt = rt.slice(tt)).length;
          } else tt -= Y;
          for (; tt--; rt += "0") ;
          nt.c.push(+rt);
        }
      } else nt.c = [nt.e = 0];
    }
    D.clone = qo, D.ROUND_UP = 0, D.ROUND_DOWN = 1, D.ROUND_CEIL = 2, D.ROUND_FLOOR = 3, D.ROUND_HALF_UP = 4, D.ROUND_HALF_DOWN = 5, D.ROUND_HALF_EVEN = 6, D.ROUND_HALF_CEIL = 7, D.ROUND_HALF_FLOOR = 8, D.EUCLID = 9, D.config = D.set = function(M) {
      var P, T;
      if (M != null) if (typeof M == "object") {
        if (M.hasOwnProperty(P = "DECIMAL_PLACES") && (T = M[P], we(T, 0, Fe, P), f = T), M.hasOwnProperty(P = "ROUNDING_MODE") && (T = M[P], we(T, 0, 8, P), _ = T), M.hasOwnProperty(P = "EXPONENTIAL_AT") && (T = M[P], T && T.pop ? (we(T[0], -Fe, 0, P), we(T[1], 0, Fe, P), b = T[0], C = T[1]) : (we(T, -Fe, Fe, P), b = -(C = T < 0 ? -T : T))), M.hasOwnProperty(P = "RANGE")) if (T = M[P], T && T.pop) we(T[0], -Fe, -1, P), we(T[1], 1, Fe, P), F = T[0], S = T[1];
        else if (we(T, -Fe, Fe, P), T) F = -(S = T < 0 ? -T : T);
        else throw Error(He + P + " cannot be zero: " + T);
        if (M.hasOwnProperty(P = "CRYPTO")) if (T = M[P], T === !!T) if (T) if (typeof crypto < "u" && crypto && (crypto.getRandomValues || crypto.randomBytes)) Z = T;
        else throw Z = !T, Error(He + "crypto unavailable");
        else Z = T;
        else throw Error(He + P + " not true or false: " + T);
        if (M.hasOwnProperty(P = "MODULO_MODE") && (T = M[P], we(T, 0, 9, P), W = T), M.hasOwnProperty(P = "POW_PRECISION") && (T = M[P], we(T, 0, Fe, P), lt = T), M.hasOwnProperty(P = "FORMAT")) if (T = M[P], typeof T == "object") vt = T;
        else throw Error(He + P + " not an object: " + T);
        if (M.hasOwnProperty(P = "ALPHABET")) if (T = M[P], typeof T == "string" && !/^.?$|[+\-.\s]|(.).*\1/.test(T)) Bt = T.slice(0, 10) == "0123456789", kt = T;
        else throw Error(He + P + " invalid: " + T);
      } else throw Error(He + "Object expected: " + M);
      return { DECIMAL_PLACES: f, ROUNDING_MODE: _, EXPONENTIAL_AT: [b, C], RANGE: [F, S], CRYPTO: Z, MODULO_MODE: W, POW_PRECISION: lt, FORMAT: vt, ALPHABET: kt };
    }, D.isBigNumber = function(M) {
      if (!M || M._isBigNumber !== !0) return !1;
      if (!D.DEBUG) return !0;
      var P, T, q = M.c, V = M.e, z = M.s;
      t: if ({}.toString.call(q) == "[object Array]") {
        if ((z === 1 || z === -1) && V >= -Fe && V <= Fe && V === $e(V)) {
          if (q[0] === 0) {
            if (V === 0 && q.length === 1) return !0;
            break t;
          }
          if (P = (V + 1) % Ut, P < 1 && (P += Ut), String(q[0]).length == P) {
            for (P = 0; P < q.length; P++) if (T = q[P], T < 0 || T >= li || T !== $e(T)) break t;
            if (T !== 0) return !0;
          }
        }
      } else if (q === null && V === null && (z === null || z === 1 || z === -1)) return !0;
      throw Error(He + "Invalid BigNumber: " + M);
    }, D.maximum = D.max = function() {
      return ot(arguments, -1);
    }, D.minimum = D.min = function() {
      return ot(arguments, 1);
    }, D.random = function() {
      var M = 9007199254740992, P = Math.random() * M & 2097151 ? function() {
        return $e(Math.random() * M);
      } : function() {
        return (Math.random() * 1073741824 | 0) * 8388608 + (Math.random() * 8388608 | 0);
      };
      return function(T) {
        var q, V, z, tt, H, Y = 0, rt = [], nt = new D(u);
        if (T == null ? T = f : we(T, 0, Fe), tt = ve(T / Ut), Z) if (crypto.getRandomValues) {
          for (q = crypto.getRandomValues(new Uint32Array(tt *= 2)); Y < tt; ) H = q[Y] * 131072 + (q[Y + 1] >>> 11), H >= 9e15 ? (V = crypto.getRandomValues(new Uint32Array(2)), q[Y] = V[0], q[Y + 1] = V[1]) : (rt.push(H % 1e14), Y += 2);
          Y = tt / 2;
        } else if (crypto.randomBytes) {
          for (q = crypto.randomBytes(tt *= 7); Y < tt; ) H = (q[Y] & 31) * 281474976710656 + q[Y + 1] * 1099511627776 + q[Y + 2] * 4294967296 + q[Y + 3] * 16777216 + (q[Y + 4] << 16) + (q[Y + 5] << 8) + q[Y + 6], H >= 9e15 ? crypto.randomBytes(7).copy(q, Y) : (rt.push(H % 1e14), Y += 7);
          Y = tt / 7;
        } else throw Z = !1, Error(He + "crypto unavailable");
        if (!Z) for (; Y < tt; ) H = P(), H < 9e15 && (rt[Y++] = H % 1e14);
        for (tt = rt[--Y], T %= Ut, tt && T && (H = na[Ut - T], rt[Y] = $e(tt / H) * H); rt[Y] === 0; rt.pop(), Y--) ;
        if (Y < 0) rt = [z = 0];
        else {
          for (z = -1; rt[0] === 0; rt.splice(0, 1), z -= Ut) ;
          for (Y = 1, H = rt[0]; H >= 10; H /= 10, Y++) ;
          Y < Ut && (z -= Ut - Y);
        }
        return nt.e = z, nt.c = rt, nt;
      };
    }(), D.sum = function() {
      for (var M = 1, P = arguments, T = new D(P[0]); M < P.length; ) T = T.plus(P[M++]);
      return T;
    }, r = /* @__PURE__ */ function() {
      var M = "0123456789";
      function P(T, q, V, z) {
        for (var tt, H = [0], Y, rt = 0, nt = T.length; rt < nt; ) {
          for (Y = H.length; Y--; H[Y] *= q) ;
          for (H[0] += z.indexOf(T.charAt(rt++)), tt = 0; tt < H.length; tt++) H[tt] > V - 1 && (H[tt + 1] == null && (H[tt + 1] = 0), H[tt + 1] += H[tt] / V | 0, H[tt] %= V);
        }
        return H.reverse();
      }
      return function(T, q, V, z, tt) {
        var H, Y, rt, nt, gt, Ot, Ft, Ht, Me = T.indexOf("."), Oe = f, he = _;
        for (Me >= 0 && (nt = lt, lt = 0, T = T.replace(".", ""), Ht = new D(q), Ot = Ht.pow(T.length - Me), lt = nt, Ht.c = P(Qi(yi(Ot.c), Ot.e, "0"), 10, V, M), Ht.e = Ht.c.length), Ft = P(T, q, V, tt ? (H = kt, M) : (H = M, kt)), rt = nt = Ft.length; Ft[--nt] == 0; Ft.pop()) ;
        if (!Ft[0]) return H.charAt(0);
        if (Me < 0 ? --rt : (Ot.c = Ft, Ot.e = rt, Ot.s = z, Ot = i(Ot, Ht, Oe, he, V), Ft = Ot.c, gt = Ot.r, rt = Ot.e), Y = rt + Oe + 1, Me = Ft[Y], nt = V / 2, gt = gt || Y < 0 || Ft[Y + 1] != null, gt = he < 4 ? (Me != null || gt) && (he == 0 || he == (Ot.s < 0 ? 3 : 2)) : Me > nt || Me == nt && (he == 4 || gt || he == 6 && Ft[Y - 1] & 1 || he == (Ot.s < 0 ? 8 : 7)), Y < 1 || !Ft[0]) T = gt ? Qi(H.charAt(1), -Oe, H.charAt(0)) : H.charAt(0);
        else {
          if (Ft.length = Y, gt) for (--V; ++Ft[--Y] > V; ) Ft[Y] = 0, Y || (++rt, Ft = [1].concat(Ft));
          for (nt = Ft.length; !Ft[--nt]; ) ;
          for (Me = 0, T = ""; Me <= nt; T += H.charAt(Ft[Me++])) ;
          T = Qi(T, rt, H.charAt(0));
        }
        return T;
      };
    }(), i = /* @__PURE__ */ function() {
      function M(q, V, z) {
        var tt, H, Y, rt, nt = 0, gt = q.length, Ot = V % xn, Ft = V / xn | 0;
        for (q = q.slice(); gt--; ) Y = q[gt] % xn, rt = q[gt] / xn | 0, tt = Ft * Y + rt * Ot, H = Ot * Y + tt % xn * xn + nt, nt = (H / z | 0) + (tt / xn | 0) + Ft * rt, q[gt] = H % z;
        return nt && (q = [nt].concat(q)), q;
      }
      function P(q, V, z, tt) {
        var H, Y;
        if (z != tt) Y = z > tt ? 1 : -1;
        else for (H = Y = 0; H < z; H++) if (q[H] != V[H]) {
          Y = q[H] > V[H] ? 1 : -1;
          break;
        }
        return Y;
      }
      function T(q, V, z, tt) {
        for (var H = 0; z--; ) q[z] -= H, H = q[z] < V[z] ? 1 : 0, q[z] = H * tt + q[z] - V[z];
        for (; !q[0] && q.length > 1; q.splice(0, 1)) ;
      }
      return function(q, V, z, tt, H) {
        var Y, rt, nt, gt, Ot, Ft, Ht, Me, Oe, he, ge, Ke, Ms, Eo, Mo, Gi, oa, vi = q.s == V.s ? 1 : -1, Qe = q.c, Be = V.c;
        if (!Qe || !Qe[0] || !Be || !Be[0]) return new D(!q.s || !V.s || (Qe ? Be && Qe[0] == Be[0] : !Be) ? NaN : Qe && Qe[0] == 0 || !Be ? vi * 0 : vi / 0);
        for (Me = new D(vi), Oe = Me.c = [], rt = q.e - V.e, vi = z + rt + 1, H || (H = li, rt = gi(q.e / Ut) - gi(V.e / Ut), vi = vi / Ut | 0), nt = 0; Be[nt] == (Qe[nt] || 0); nt++) ;
        if (Be[nt] > (Qe[nt] || 0) && rt--, vi < 0) Oe.push(1), gt = !0;
        else {
          for (Eo = Qe.length, Gi = Be.length, nt = 0, vi += 2, Ot = $e(H / (Be[0] + 1)), Ot > 1 && (Be = M(Be, Ot, H), Qe = M(Qe, Ot, H), Gi = Be.length, Eo = Qe.length), Ms = Gi, he = Qe.slice(0, Gi), ge = he.length; ge < Gi; he[ge++] = 0) ;
          oa = Be.slice(), oa = [0].concat(oa), Mo = Be[0], Be[1] >= H / 2 && Mo++;
          do {
            if (Ot = 0, Y = P(Be, he, Gi, ge), Y < 0) {
              if (Ke = he[0], Gi != ge && (Ke = Ke * H + (he[1] || 0)), Ot = $e(Ke / Mo), Ot > 1) for (Ot >= H && (Ot = H - 1), Ft = M(Be, Ot, H), Ht = Ft.length, ge = he.length; P(Ft, he, Ht, ge) == 1; ) Ot--, T(Ft, Gi < Ht ? oa : Be, Ht, H), Ht = Ft.length, Y = 1;
              else Ot == 0 && (Y = Ot = 1), Ft = Be.slice(), Ht = Ft.length;
              if (Ht < ge && (Ft = [0].concat(Ft)), T(he, Ft, ge, H), ge = he.length, Y == -1) for (; P(Be, he, Gi, ge) < 1; ) Ot++, T(he, Gi < ge ? oa : Be, ge, H), ge = he.length;
            } else Y === 0 && (Ot++, he = [0]);
            Oe[nt++] = Ot, he[0] ? he[ge++] = Qe[Ms] || 0 : (he = [Qe[Ms]], ge = 1);
          } while ((Ms++ < Eo || he[0] != null) && vi--);
          gt = he[0] != null, Oe[0] || Oe.splice(0, 1);
        }
        if (H == li) {
          for (nt = 1, vi = Oe[0]; vi >= 10; vi /= 10, nt++) ;
          xt(Me, z + (Me.e = nt + rt * Ut - 1) + 1, tt, gt);
        } else Me.e = rt, Me.r = +gt;
        return Me;
      };
    }();
    function et(M, P, T, q) {
      var V, z, tt, H, Y;
      if (T == null ? T = _ : we(T, 0, 8), !M.c) return M.toString();
      if (V = M.c[0], tt = M.e, P == null) Y = yi(M.c), Y = q == 1 || q == 2 && (tt <= b || tt >= C) ? ys(Y, tt) : Qi(Y, tt, "0");
      else if (M = xt(new D(M), P, T), z = M.e, Y = yi(M.c), H = Y.length, q == 1 || q == 2 && (P <= z || z <= b)) {
        for (; H < P; Y += "0", H++) ;
        Y = ys(Y, z);
      } else if (P -= tt + (q === 2 && z > tt), Y = Qi(Y, z, "0"), z + 1 > H) {
        if (--P > 0) for (Y += "."; P--; Y += "0") ;
      } else if (P += z - H, P > 0) for (z + 1 == H && (Y += "."); P--; Y += "0") ;
      return M.s < 0 && V ? "-" + Y : Y;
    }
    function ot(M, P) {
      for (var T, q, V = 1, z = new D(M[0]); V < M.length; V++) q = new D(M[V]), (!q.s || (T = jn(z, q)) === P || T === 0 && z.s === P) && (z = q);
      return z;
    }
    function Lt(M, P, T) {
      for (var q = 1, V = P.length; !P[--V]; P.pop()) ;
      for (V = P[0]; V >= 10; V /= 10, q++) ;
      return (T = q + T * Ut - 1) > S ? M.c = M.e = null : T < F ? M.c = [M.e = 0] : (M.e = T, M.c = P), M;
    }
    a = /* @__PURE__ */ function() {
      var M = /^(-?)0([xbo])(?=\w[\w.]*$)/i, P = /^([^.]+)\.$/, T = /^\.([^.]+)$/, q = /^-?(Infinity|NaN)$/, V = /^\s*\+(?=[\w.])|^\s+|\s+$/g;
      return function(z, tt, H, Y) {
        var rt, nt = H ? tt : tt.replace(V, "");
        if (q.test(nt)) z.s = isNaN(nt) ? null : nt < 0 ? -1 : 1;
        else {
          if (!H && (nt = nt.replace(M, function(gt, Ot, Ft) {
            return rt = (Ft = Ft.toLowerCase()) == "x" ? 16 : Ft == "b" ? 2 : 8, !Y || Y == rt ? Ot : gt;
          }), Y && (rt = Y, nt = nt.replace(P, "$1").replace(T, "0.$1")), tt != nt)) return new D(nt, rt);
          if (D.DEBUG) throw Error(He + "Not a" + (Y ? " base " + Y : "") + " number: " + tt);
          z.s = null;
        }
        z.c = z.e = null;
      };
    }();
    function xt(M, P, T, q) {
      var V, z, tt, H, Y, rt, nt, gt = M.c, Ot = na;
      if (gt) {
        t: {
          for (V = 1, H = gt[0]; H >= 10; H /= 10, V++) ;
          if (z = P - V, z < 0) z += Ut, tt = P, Y = gt[rt = 0], nt = $e(Y / Ot[V - tt - 1] % 10);
          else if (rt = ve((z + 1) / Ut), rt >= gt.length) if (q) {
            for (; gt.length <= rt; gt.push(0)) ;
            Y = nt = 0, V = 1, z %= Ut, tt = z - Ut + 1;
          } else break t;
          else {
            for (Y = H = gt[rt], V = 1; H >= 10; H /= 10, V++) ;
            z %= Ut, tt = z - Ut + V, nt = tt < 0 ? 0 : $e(Y / Ot[V - tt - 1] % 10);
          }
          if (q = q || P < 0 || gt[rt + 1] != null || (tt < 0 ? Y : Y % Ot[V - tt - 1]), q = T < 4 ? (nt || q) && (T == 0 || T == (M.s < 0 ? 3 : 2)) : nt > 5 || nt == 5 && (T == 4 || q || T == 6 && (z > 0 ? tt > 0 ? Y / Ot[V - tt] : 0 : gt[rt - 1]) % 10 & 1 || T == (M.s < 0 ? 8 : 7)), P < 1 || !gt[0]) return gt.length = 0, q ? (P -= M.e + 1, gt[0] = Ot[(Ut - P % Ut) % Ut], M.e = -P || 0) : gt[0] = M.e = 0, M;
          if (z == 0 ? (gt.length = rt, H = 1, rt--) : (gt.length = rt + 1, H = Ot[Ut - z], gt[rt] = tt > 0 ? $e(Y / Ot[V - tt] % Ot[tt]) * H : 0), q) for (; ; ) if (rt == 0) {
            for (z = 1, tt = gt[0]; tt >= 10; tt /= 10, z++) ;
            for (tt = gt[0] += H, H = 1; tt >= 10; tt /= 10, H++) ;
            z != H && (M.e++, gt[0] == li && (gt[0] = 1));
            break;
          } else {
            if (gt[rt] += H, gt[rt] != li) break;
            gt[rt--] = 0, H = 1;
          }
          for (z = gt.length; gt[--z] === 0; gt.pop()) ;
        }
        M.e > S ? M.c = M.e = null : M.e < F && (M.c = [M.e = 0]);
      }
      return M;
    }
    function wt(M) {
      var P, T = M.e;
      return T === null ? M.toString() : (P = yi(M.c), P = T <= b || T >= C ? ys(P, T) : Qi(P, T, "0"), M.s < 0 ? "-" + P : P);
    }
    return o.absoluteValue = o.abs = function() {
      var M = new D(this);
      return M.s < 0 && (M.s = 1), M;
    }, o.comparedTo = function(M, P) {
      return jn(this, new D(M, P));
    }, o.decimalPlaces = o.dp = function(M, P) {
      var T, q, V, z = this;
      if (M != null) return we(M, 0, Fe), P == null ? P = _ : we(P, 0, 8), xt(new D(z), M + z.e + 1, P);
      if (!(T = z.c)) return null;
      if (q = ((V = T.length - 1) - gi(this.e / Ut)) * Ut, V = T[V]) for (; V % 10 == 0; V /= 10, q--) ;
      return q < 0 && (q = 0), q;
    }, o.dividedBy = o.div = function(M, P) {
      return i(this, new D(M, P), f, _);
    }, o.dividedToIntegerBy = o.idiv = function(M, P) {
      return i(this, new D(M, P), 0, 1);
    }, o.exponentiatedBy = o.pow = function(M, P) {
      var T, q, V, z, tt, H, Y, rt, nt, gt = this;
      if (M = new D(M), M.c && !M.isInteger()) throw Error(He + "Exponent not an integer: " + wt(M));
      if (P != null && (P = new D(P)), H = M.e > 14, !gt.c || !gt.c[0] || gt.c[0] == 1 && !gt.e && gt.c.length == 1 || !M.c || !M.c[0]) return nt = new D(Math.pow(+wt(gt), H ? M.s * (2 - gs(M)) : +wt(M))), P ? nt.mod(P) : nt;
      if (Y = M.s < 0, P) {
        if (P.c ? !P.c[0] : !P.s) return new D(NaN);
        q = !Y && gt.isInteger() && P.isInteger(), q && (gt = gt.mod(P));
      } else {
        if (M.e > 9 && (gt.e > 0 || gt.e < -1 || (gt.e == 0 ? gt.c[0] > 1 || H && gt.c[1] >= 24e7 : gt.c[0] < 8e13 || H && gt.c[0] <= 9999975e7))) return z = gt.s < 0 && gs(M) ? -0 : 0, gt.e > -1 && (z = 1 / z), new D(Y ? 1 / z : z);
        lt && (z = ve(lt / Ut + 2));
      }
      for (H ? (T = new D(0.5), Y && (M.s = 1), rt = gs(M)) : (V = Math.abs(+wt(M)), rt = V % 2), nt = new D(u); ; ) {
        if (rt) {
          if (nt = nt.times(gt), !nt.c) break;
          z ? nt.c.length > z && (nt.c.length = z) : q && (nt = nt.mod(P));
        }
        if (V) {
          if (V = $e(V / 2), V === 0) break;
          rt = V % 2;
        } else if (M = M.times(T), xt(M, M.e + 1, 1), M.e > 14) rt = gs(M);
        else {
          if (V = +wt(M), V === 0) break;
          rt = V % 2;
        }
        gt = gt.times(gt), z ? gt.c && gt.c.length > z && (gt.c.length = z) : q && (gt = gt.mod(P));
      }
      return q ? nt : (Y && (nt = u.div(nt)), P ? nt.mod(P) : z ? xt(nt, lt, _, tt) : nt);
    }, o.integerValue = function(M) {
      var P = new D(this);
      return M == null ? M = _ : we(M, 0, 8), xt(P, P.e + 1, M);
    }, o.isEqualTo = o.eq = function(M, P) {
      return jn(this, new D(M, P)) === 0;
    }, o.isFinite = function() {
      return !!this.c;
    }, o.isGreaterThan = o.gt = function(M, P) {
      return jn(this, new D(M, P)) > 0;
    }, o.isGreaterThanOrEqualTo = o.gte = function(M, P) {
      return (P = jn(this, new D(M, P))) === 1 || P === 0;
    }, o.isInteger = function() {
      return !!this.c && gi(this.e / Ut) > this.c.length - 2;
    }, o.isLessThan = o.lt = function(M, P) {
      return jn(this, new D(M, P)) < 0;
    }, o.isLessThanOrEqualTo = o.lte = function(M, P) {
      return (P = jn(this, new D(M, P))) === -1 || P === 0;
    }, o.isNaN = function() {
      return !this.s;
    }, o.isNegative = function() {
      return this.s < 0;
    }, o.isPositive = function() {
      return this.s > 0;
    }, o.isZero = function() {
      return !!this.c && this.c[0] == 0;
    }, o.minus = function(M, P) {
      var T, q, V, z, tt = this, H = tt.s;
      if (M = new D(M, P), P = M.s, !H || !P) return new D(NaN);
      if (H != P) return M.s = -P, tt.plus(M);
      var Y = tt.e / Ut, rt = M.e / Ut, nt = tt.c, gt = M.c;
      if (!Y || !rt) {
        if (!nt || !gt) return nt ? (M.s = -P, M) : new D(gt ? tt : NaN);
        if (!nt[0] || !gt[0]) return gt[0] ? (M.s = -P, M) : new D(nt[0] ? tt : _ == 3 ? -0 : 0);
      }
      if (Y = gi(Y), rt = gi(rt), nt = nt.slice(), H = Y - rt) {
        for ((z = H < 0) ? (H = -H, V = nt) : (rt = Y, V = gt), V.reverse(), P = H; P--; V.push(0)) ;
        V.reverse();
      } else for (q = (z = (H = nt.length) < (P = gt.length)) ? H : P, H = P = 0; P < q; P++) if (nt[P] != gt[P]) {
        z = nt[P] < gt[P];
        break;
      }
      if (z && (V = nt, nt = gt, gt = V, M.s = -M.s), P = (q = gt.length) - (T = nt.length), P > 0) for (; P--; nt[T++] = 0) ;
      for (P = li - 1; q > H; ) {
        if (nt[--q] < gt[q]) {
          for (T = q; T && !nt[--T]; nt[T] = P) ;
          --nt[T], nt[q] += li;
        }
        nt[q] -= gt[q];
      }
      for (; nt[0] == 0; nt.splice(0, 1), --rt) ;
      return nt[0] ? Lt(M, nt, rt) : (M.s = _ == 3 ? -1 : 1, M.c = [M.e = 0], M);
    }, o.modulo = o.mod = function(M, P) {
      var T, q, V = this;
      return M = new D(M, P), !V.c || !M.s || M.c && !M.c[0] ? new D(NaN) : !M.c || V.c && !V.c[0] ? new D(V) : (W == 9 ? (q = M.s, M.s = 1, T = i(V, M, 0, 3), M.s = q, T.s *= q) : T = i(V, M, 0, W), M = V.minus(T.times(M)), !M.c[0] && W == 1 && (M.s = V.s), M);
    }, o.multipliedBy = o.times = function(M, P) {
      var T, q, V, z, tt, H, Y, rt, nt, gt, Ot, Ft, Ht, Me, Oe, he = this, ge = he.c, Ke = (M = new D(M, P)).c;
      if (!ge || !Ke || !ge[0] || !Ke[0]) return !he.s || !M.s || ge && !ge[0] && !Ke || Ke && !Ke[0] && !ge ? M.c = M.e = M.s = null : (M.s *= he.s, !ge || !Ke ? M.c = M.e = null : (M.c = [0], M.e = 0)), M;
      for (q = gi(he.e / Ut) + gi(M.e / Ut), M.s *= he.s, Y = ge.length, gt = Ke.length, Y < gt && (Ht = ge, ge = Ke, Ke = Ht, V = Y, Y = gt, gt = V), V = Y + gt, Ht = []; V--; Ht.push(0)) ;
      for (Me = li, Oe = xn, V = gt; --V >= 0; ) {
        for (T = 0, Ot = Ke[V] % Oe, Ft = Ke[V] / Oe | 0, tt = Y, z = V + tt; z > V; ) rt = ge[--tt] % Oe, nt = ge[tt] / Oe | 0, H = Ft * rt + nt * Ot, rt = Ot * rt + H % Oe * Oe + Ht[z] + T, T = (rt / Me | 0) + (H / Oe | 0) + Ft * nt, Ht[z--] = rt % Me;
        Ht[z] = T;
      }
      return T ? ++q : Ht.splice(0, 1), Lt(M, Ht, q);
    }, o.negated = function() {
      var M = new D(this);
      return M.s = -M.s || null, M;
    }, o.plus = function(M, P) {
      var T, q = this, V = q.s;
      if (M = new D(M, P), P = M.s, !V || !P) return new D(NaN);
      if (V != P) return M.s = -P, q.minus(M);
      var z = q.e / Ut, tt = M.e / Ut, H = q.c, Y = M.c;
      if (!z || !tt) {
        if (!H || !Y) return new D(V / 0);
        if (!H[0] || !Y[0]) return Y[0] ? M : new D(H[0] ? q : V * 0);
      }
      if (z = gi(z), tt = gi(tt), H = H.slice(), V = z - tt) {
        for (V > 0 ? (tt = z, T = Y) : (V = -V, T = H), T.reverse(); V--; T.push(0)) ;
        T.reverse();
      }
      for (V = H.length, P = Y.length, V - P < 0 && (T = Y, Y = H, H = T, P = V), V = 0; P; ) V = (H[--P] = H[P] + Y[P] + V) / li | 0, H[P] = li === H[P] ? 0 : H[P] % li;
      return V && (H = [V].concat(H), ++tt), Lt(M, H, tt);
    }, o.precision = o.sd = function(M, P) {
      var T, q, V, z = this;
      if (M != null && M !== !!M) return we(M, 1, Fe), P == null ? P = _ : we(P, 0, 8), xt(new D(z), M, P);
      if (!(T = z.c)) return null;
      if (V = T.length - 1, q = V * Ut + 1, V = T[V]) {
        for (; V % 10 == 0; V /= 10, q--) ;
        for (V = T[0]; V >= 10; V /= 10, q++) ;
      }
      return M && z.e + 1 > q && (q = z.e + 1), q;
    }, o.shiftedBy = function(M) {
      return we(M, -fr, fr), this.times("1e" + M);
    }, o.squareRoot = o.sqrt = function() {
      var M, P, T, q, V, z = this, tt = z.c, H = z.s, Y = z.e, rt = f + 4, nt = new D("0.5");
      if (H !== 1 || !tt || !tt[0]) return new D(!H || H < 0 && (!tt || tt[0]) ? NaN : tt ? z : 1 / 0);
      if (H = Math.sqrt(+wt(z)), H == 0 || H == 1 / 0 ? (P = yi(tt), (P.length + Y) % 2 == 0 && (P += "0"), H = Math.sqrt(+P), Y = gi((Y + 1) / 2) - (Y < 0 || Y % 2), H == 1 / 0 ? P = "5e" + Y : (P = H.toExponential(), P = P.slice(0, P.indexOf("e") + 1) + Y), T = new D(P)) : T = new D(H + ""), T.c[0]) {
        for (Y = T.e, H = Y + rt, H < 3 && (H = 0); ; ) if (V = T, T = nt.times(V.plus(i(z, V, rt, 1))), yi(V.c).slice(0, H) === (P = yi(T.c)).slice(0, H)) if (T.e < Y && --H, P = P.slice(H - 3, H + 1), P == "9999" || !q && P == "4999") {
          if (!q && (xt(V, V.e + f + 2, 0), V.times(V).eq(z))) {
            T = V;
            break;
          }
          rt += 4, H += 4, q = 1;
        } else {
          (!+P || !+P.slice(1) && P.charAt(0) == "5") && (xt(T, T.e + f + 2, 1), M = !T.times(T).eq(z));
          break;
        }
      }
      return xt(T, T.e + f + 1, _, M);
    }, o.toExponential = function(M, P) {
      return M != null && (we(M, 0, Fe), M++), et(this, M, P, 1);
    }, o.toFixed = function(M, P) {
      return M != null && (we(M, 0, Fe), M = M + this.e + 1), et(this, M, P);
    }, o.toFormat = function(M, P, T) {
      var q, V = this;
      if (T == null) M != null && P && typeof P == "object" ? (T = P, P = null) : M && typeof M == "object" ? (T = M, M = P = null) : T = vt;
      else if (typeof T != "object") throw Error(He + "Argument not an object: " + T);
      if (q = V.toFixed(M, P), V.c) {
        var z, tt = q.split("."), H = +T.groupSize, Y = +T.secondaryGroupSize, rt = T.groupSeparator || "", nt = tt[0], gt = tt[1], Ot = V.s < 0, Ft = Ot ? nt.slice(1) : nt, Ht = Ft.length;
        if (Y && (z = H, H = Y, Y = z, Ht -= z), H > 0 && Ht > 0) {
          for (z = Ht % H || H, nt = Ft.substr(0, z); z < Ht; z += H) nt += rt + Ft.substr(z, H);
          Y > 0 && (nt += rt + Ft.slice(z)), Ot && (nt = "-" + nt);
        }
        q = gt ? nt + (T.decimalSeparator || "") + ((Y = +T.fractionGroupSize) ? gt.replace(new RegExp("\\d{" + Y + "}\\B", "g"), "$&" + (T.fractionGroupSeparator || "")) : gt) : nt;
      }
      return (T.prefix || "") + q + (T.suffix || "");
    }, o.toFraction = function(M) {
      var P, T, q, V, z, tt, H, Y, rt, nt, gt, Ot, Ft = this, Ht = Ft.c;
      if (M != null && (H = new D(M), !H.isInteger() && (H.c || H.s !== 1) || H.lt(u))) throw Error(He + "Argument " + (H.isInteger() ? "out of range: " : "not an integer: ") + wt(H));
      if (!Ht) return new D(Ft);
      for (P = new D(u), rt = T = new D(u), q = Y = new D(u), Ot = yi(Ht), z = P.e = Ot.length - Ft.e - 1, P.c[0] = na[(tt = z % Ut) < 0 ? Ut + tt : tt], M = !M || H.comparedTo(P) > 0 ? z > 0 ? P : rt : H, tt = S, S = 1 / 0, H = new D(Ot), Y.c[0] = 0; nt = i(H, P, 0, 1), V = T.plus(nt.times(q)), V.comparedTo(M) != 1; ) T = q, q = V, rt = Y.plus(nt.times(V = rt)), Y = V, P = H.minus(nt.times(V = P)), H = V;
      return V = i(M.minus(T), q, 0, 1), Y = Y.plus(V.times(rt)), T = T.plus(V.times(q)), Y.s = rt.s = Ft.s, z = z * 2, gt = i(rt, q, z, _).minus(Ft).abs().comparedTo(i(Y, T, z, _).minus(Ft).abs()) < 1 ? [rt, q] : [Y, T], S = tt, gt;
    }, o.toNumber = function() {
      return +wt(this);
    }, o.toPrecision = function(M, P) {
      return M != null && we(M, 1, Fe), et(this, M, P, 2);
    }, o.toString = function(M) {
      var P, T = this, q = T.s, V = T.e;
      return V === null ? q ? (P = "Infinity", q < 0 && (P = "-" + P)) : P = "NaN" : (M == null ? P = V <= b || V >= C ? ys(yi(T.c), V) : Qi(yi(T.c), V, "0") : M === 10 && Bt ? (T = xt(new D(T), f + V + 1, _), P = Qi(yi(T.c), T.e, "0")) : (we(M, 2, kt.length, "Base"), P = r(Qi(yi(T.c), V, "0"), 10, M, q, !0)), q < 0 && T.c[0] && (P = "-" + P)), P;
    }, o.valueOf = o.toJSON = function() {
      return wt(this);
    }, o._isBigNumber = !0, o[Symbol.toStringTag] = "BigNumber", o[Symbol.for("nodejs.util.inspect.custom")] = o.valueOf, e != null && D.set(e), D;
  }
  function gi(e) {
    var i = e | 0;
    return e > 0 || e === i ? i : i - 1;
  }
  function yi(e) {
    for (var i, r, a = 1, o = e.length, u = e[0] + ""; a < o; ) {
      for (i = e[a++] + "", r = Ut - i.length; r--; i = "0" + i) ;
      u += i;
    }
    for (o = u.length; u.charCodeAt(--o) === 48; ) ;
    return u.slice(0, o + 1 || 1);
  }
  function jn(e, i) {
    var r, a, o = e.c, u = i.c, f = e.s, _ = i.s, b = e.e, C = i.e;
    if (!f || !_) return null;
    if (r = o && !o[0], a = u && !u[0], r || a) return r ? a ? 0 : -_ : f;
    if (f != _) return f;
    if (r = f < 0, a = b == C, !o || !u) return a ? 0 : !o ^ r ? 1 : -1;
    if (!a) return b > C ^ r ? 1 : -1;
    for (_ = (b = o.length) < (C = u.length) ? b : C, f = 0; f < _; f++) if (o[f] != u[f]) return o[f] > u[f] ^ r ? 1 : -1;
    return b == C ? 0 : b > C ^ r ? 1 : -1;
  }
  function we(e, i, r, a) {
    if (e < i || e > r || e !== $e(e)) throw Error(He + (a || "Argument") + (typeof e == "number" ? e < i || e > r ? " out of range: " : " not an integer: " : " not a primitive number: ") + String(e));
  }
  function gs(e) {
    var i = e.c.length - 1;
    return gi(e.e / Ut) == i && e.c[i] % 2 != 0;
  }
  function ys(e, i) {
    return (e.length > 1 ? e.charAt(0) + "." + e.slice(1) : e) + (i < 0 ? "e" : "e+") + i;
  }
  function Qi(e, i, r) {
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
  var Wl = qo(), Ui = Wl, Jl = class {
    constructor(e) {
      Nt(this, "key");
      Nt(this, "left", null);
      Nt(this, "right", null);
      this.key = e;
    }
  }, ra = class extends Jl {
    constructor(e) {
      super(e);
    }
  }, Xl = class {
    constructor() {
      Nt(this, "size", 0);
      Nt(this, "modificationCount", 0);
      Nt(this, "splayCount", 0);
    }
    splay(e) {
      let i = this.root;
      if (i == null) return this.compare(e, e), -1;
      let r = null, a = null, o = null, u = null, f = i, _ = this.compare, b;
      for (; ; ) if (b = _(f.key, e), b > 0) {
        let C = f.left;
        if (C == null || (b = _(C.key, e), b > 0 && (f.left = C.right, C.right = f, f = C, C = f.left, C == null))) break;
        r == null ? a = f : r.left = f, r = f, f = C;
      } else if (b < 0) {
        let C = f.right;
        if (C == null || (b = _(C.key, e), b < 0 && (f.right = C.left, C.left = f, f = C, C = f.right, C == null))) break;
        o == null ? u = f : o.right = f, o = f, f = C;
      } else break;
      return o != null && (o.right = f.left, f.left = u), r != null && (r.left = f.right, f.right = a), this.root !== f && (this.root = f, this.splayCount++), b;
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
  }, vs = class ga extends Xl {
    constructor(r, a) {
      super();
      Nt(this, "root", null);
      Nt(this, "compare");
      Nt(this, "validKey");
      Nt(this, sl, "[object Set]");
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
      return a != 0 && this.addNewRoot(new ra(r), a), this;
    }
    addAndReturn(r) {
      let a = this.splay(r);
      return a != 0 && this.addNewRoot(new ra(r), a), this.root.key;
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
      let a = new ga(this.compare, this.validKey), o = this.modificationCount;
      for (let u of r) {
        if (o != this.modificationCount) throw "Concurrent modification during iteration.";
        this.validKey(u) && this.splay(u) == 0 && a.add(this.root.key);
      }
      a.size != this.size && (this.root = a.root, this.size = a.size, this.modificationCount++);
    }
    lookup(r) {
      return !this.validKey(r) || this.splay(r) != 0 ? null : this.root.key;
    }
    intersection(r) {
      let a = new ga(this.compare, this.validKey);
      for (let o of this) r.has(o) && a.add(o);
      return a;
    }
    difference(r) {
      let a = new ga(this.compare, this.validKey);
      for (let o of this) r.has(o) || a.add(o);
      return a;
    }
    union(r) {
      let a = this.clone();
      return a.addAll(r), a;
    }
    clone() {
      let r = new ga(this.compare, this.validKey);
      return r.size = this.size, r.root = this.copyNode(this.root), r;
    }
    copyNode(r) {
      if (r == null) return null;
      function a(u, f) {
        let _, b;
        do {
          if (_ = u.left, b = u.right, _ != null) {
            let C = new ra(_.key);
            f.left = C, a(_, C);
          }
          if (b != null) {
            let C = new ra(b.key);
            f.right = C, u = b, f = C;
          }
        } while (b != null);
      }
      let o = new ra(r.key);
      return a(r, o), o;
    }
    toSet() {
      return this.clone();
    }
    entries() {
      return new Ql(this.wrap());
    }
    keys() {
      return this[Symbol.iterator]();
    }
    values() {
      return this[Symbol.iterator]();
    }
    [(ol = Symbol.iterator, sl = Symbol.toStringTag, ol)]() {
      return new Yl(this.wrap());
    }
  }, Ho = class {
    constructor(e) {
      Nt(this, "tree");
      Nt(this, "path", new Array());
      Nt(this, "modificationCount", null);
      Nt(this, "splayCount");
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
  }, Yl = class extends Ho {
    getValue(e) {
      return e.key;
    }
  }, Ql = class extends Ho {
    getValue(e) {
      return [e.key, e.key];
    }
  }, Ko = (e) => () => e, Lo = (e) => {
    let i = e ? (r, a) => a.minus(r).abs().isLessThanOrEqualTo(e) : Ko(!1);
    return (r, a) => i(r, a) ? 0 : r.comparedTo(a);
  };
  function tu(e) {
    let i = e ? (r, a, o, u, f) => r.exponentiatedBy(2).isLessThanOrEqualTo(u.minus(a).exponentiatedBy(2).plus(f.minus(o).exponentiatedBy(2)).times(e)) : Ko(!1);
    return (r, a, o) => {
      let u = r.x, f = r.y, _ = o.x, b = o.y, C = f.minus(b).times(a.x.minus(_)).minus(u.minus(_).times(a.y.minus(b)));
      return i(C, u, f, _, b) ? 0 : C.comparedTo(0);
    };
  }
  var eu = (e) => e, iu = (e) => {
    if (e) {
      let i = new vs(Lo(e)), r = new vs(Lo(e)), a = (u, f) => f.addAndReturn(u), o = (u) => ({ x: a(u.x, i), y: a(u.y, r) });
      return o({ x: new Ui(0), y: new Ui(0) }), o;
    }
    return eu;
  }, wo = (e) => ({ set: (i) => {
    tn = wo(i);
  }, reset: () => wo(e), compare: Lo(e), snap: iu(e), orient: tu(e) }), tn = wo(), aa = (e, i) => e.ll.x.isLessThanOrEqualTo(i.x) && i.x.isLessThanOrEqualTo(e.ur.x) && e.ll.y.isLessThanOrEqualTo(i.y) && i.y.isLessThanOrEqualTo(e.ur.y), Co = (e, i) => {
    if (i.ur.x.isLessThan(e.ll.x) || e.ur.x.isLessThan(i.ll.x) || i.ur.y.isLessThan(e.ll.y) || e.ur.y.isLessThan(i.ll.y)) return null;
    let r = e.ll.x.isLessThan(i.ll.x) ? i.ll.x : e.ll.x, a = e.ur.x.isLessThan(i.ur.x) ? e.ur.x : i.ur.x, o = e.ll.y.isLessThan(i.ll.y) ? i.ll.y : e.ll.y, u = e.ur.y.isLessThan(i.ur.y) ? e.ur.y : i.ur.y;
    return { ll: { x: r, y: o }, ur: { x: a, y: u } };
  }, bs = (e, i) => e.x.times(i.y).minus(e.y.times(i.x)), Wo = (e, i) => e.x.times(i.x).plus(e.y.times(i.y)), xs = (e) => Wo(e, e).sqrt(), nu = (e, i, r) => {
    let a = { x: i.x.minus(e.x), y: i.y.minus(e.y) }, o = { x: r.x.minus(e.x), y: r.y.minus(e.y) };
    return bs(o, a).div(xs(o)).div(xs(a));
  }, ru = (e, i, r) => {
    let a = { x: i.x.minus(e.x), y: i.y.minus(e.y) }, o = { x: r.x.minus(e.x), y: r.y.minus(e.y) };
    return Wo(o, a).div(xs(o)).div(xs(a));
  }, Jo = (e, i, r) => i.y.isZero() ? null : { x: e.x.plus(i.x.div(i.y).times(r.minus(e.y))), y: r }, Xo = (e, i, r) => i.x.isZero() ? null : { x: r, y: e.y.plus(i.y.div(i.x).times(r.minus(e.x))) }, au = (e, i, r, a) => {
    if (i.x.isZero()) return Xo(r, a, e.x);
    if (a.x.isZero()) return Xo(e, i, r.x);
    if (i.y.isZero()) return Jo(r, a, e.y);
    if (a.y.isZero()) return Jo(e, i, r.y);
    let o = bs(i, a);
    if (o.isZero()) return null;
    let u = { x: r.x.minus(e.x), y: r.y.minus(e.y) }, f = bs(u, i).div(o), _ = bs(u, a).div(o), b = e.x.plus(_.times(i.x)), C = r.x.plus(f.times(a.x)), F = e.y.plus(_.times(i.y)), S = r.y.plus(f.times(a.y)), Z = b.plus(C).div(2), W = F.plus(S).div(2);
    return { x: Z, y: W };
  }, Vi = class Bl {
    constructor(i, r) {
      Nt(this, "point");
      Nt(this, "isLeft");
      Nt(this, "segment");
      Nt(this, "otherSE");
      Nt(this, "consumedBy");
      i.events === void 0 ? i.events = [this] : i.events.push(this), this.point = i, this.isLeft = r;
    }
    static compare(i, r) {
      let a = Bl.comparePoints(i.point, r.point);
      return a !== 0 ? a : (i.point !== r.point && i.link(r), i.isLeft !== r.isLeft ? i.isLeft ? 1 : -1 : ws.compare(i.segment, r.segment));
    }
    static comparePoints(i, r) {
      return i.x.isLessThan(r.x) ? -1 : i.x.isGreaterThan(r.x) ? 1 : i.y.isLessThan(r.y) ? -1 : i.y.isGreaterThan(r.y) ? 1 : 0;
    }
    link(i) {
      if (i.point === this.point) throw new Error("Tried to link already linked events");
      let r = i.point.events;
      for (let a = 0, o = r.length; a < o; a++) {
        let u = r[a];
        this.point.events.push(u), u.point = this.point;
      }
      this.checkForConsuming();
    }
    checkForConsuming() {
      let i = this.point.events.length;
      for (let r = 0; r < i; r++) {
        let a = this.point.events[r];
        if (a.segment.consumedBy === void 0) for (let o = r + 1; o < i; o++) {
          let u = this.point.events[o];
          u.consumedBy === void 0 && a.otherSE.point.events === u.otherSE.point.events && a.segment.consume(u.segment);
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
        let u = o.otherSE;
        r.set(o, { sine: nu(this.point, i.point, u.point), cosine: ru(this.point, i.point, u.point) });
      };
      return (o, u) => {
        r.has(o) || a(o), r.has(u) || a(u);
        let { sine: f, cosine: _ } = r.get(o), { sine: b, cosine: C } = r.get(u);
        return f.isGreaterThanOrEqualTo(0) && b.isGreaterThanOrEqualTo(0) ? _.isLessThan(C) ? 1 : _.isGreaterThan(C) ? -1 : 0 : f.isLessThan(0) && b.isLessThan(0) ? _.isLessThan(C) ? -1 : _.isGreaterThan(C) ? 1 : 0 : b.isLessThan(f) ? -1 : b.isGreaterThan(f) ? 1 : 0;
      };
    }
  }, su = class Io {
    constructor(i) {
      Nt(this, "events");
      Nt(this, "poly");
      Nt(this, "_isExteriorRing");
      Nt(this, "_enclosingRing");
      this.events = i;
      for (let r = 0, a = i.length; r < a; r++) i[r].segment.ringOut = this;
      this.poly = null;
    }
    static factory(i) {
      let r = [];
      for (let a = 0, o = i.length; a < o; a++) {
        let u = i[a];
        if (!u.isInResult() || u.ringOut) continue;
        let f = null, _ = u.leftSE, b = u.rightSE, C = [_], F = _.point, S = [];
        for (; f = _, _ = b, C.push(_), _.point !== F; ) for (; ; ) {
          let Z = _.getAvailableLinkedEvents();
          if (Z.length === 0) {
            let vt = C[0].point, kt = C[C.length - 1].point;
            throw new Error(`Unable to complete output ring starting at [${vt.x}, ${vt.y}]. Last matching segment found ends at [${kt.x}, ${kt.y}].`);
          }
          if (Z.length === 1) {
            b = Z[0].otherSE;
            break;
          }
          let W = null;
          for (let vt = 0, kt = S.length; vt < kt; vt++) if (S[vt].point === _.point) {
            W = vt;
            break;
          }
          if (W !== null) {
            let vt = S.splice(W)[0], kt = C.splice(vt.index);
            kt.unshift(kt[0].otherSE), r.push(new Io(kt.reverse()));
            continue;
          }
          S.push({ index: C.length, point: _.point });
          let lt = _.getLeftmostComparator(f);
          b = Z.sort(lt)[0].otherSE;
          break;
        }
        r.push(new Io(C));
      }
      return r;
    }
    getGeom() {
      let i = this.events[0].point, r = [i];
      for (let C = 1, F = this.events.length - 1; C < F; C++) {
        let S = this.events[C].point, Z = this.events[C + 1].point;
        tn.orient(S, i, Z) !== 0 && (r.push(S), i = S);
      }
      if (r.length === 1) return null;
      let a = r[0], o = r[1];
      tn.orient(a, i, o) === 0 && r.shift(), r.push(r[0]);
      let u = this.isExteriorRing() ? 1 : -1, f = this.isExteriorRing() ? 0 : r.length - 1, _ = this.isExteriorRing() ? r.length : -1, b = [];
      for (let C = f; C != _; C += u) b.push([r[C].x.toNumber(), r[C].y.toNumber()]);
      return b;
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
      var o, u;
      let i = this.events[0];
      for (let f = 1, _ = this.events.length; f < _; f++) {
        let b = this.events[f];
        Vi.compare(i, b) > 0 && (i = b);
      }
      let r = i.segment.prevInResult(), a = r ? r.prevInResult() : null;
      for (; ; ) {
        if (!r) return null;
        if (!a) return r.ringOut;
        if (a.ringOut !== r.ringOut) return ((o = a.ringOut) == null ? void 0 : o.enclosingRing()) !== r.ringOut ? r.ringOut : (u = r.ringOut) == null ? void 0 : u.enclosingRing();
        r = a.prevInResult(), a = r ? r.prevInResult() : null;
      }
    }
  }, Yo = class {
    constructor(e) {
      Nt(this, "exteriorRing");
      Nt(this, "interiorRings");
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
  }, ou = class {
    constructor(e) {
      Nt(this, "rings");
      Nt(this, "polys");
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
        let u = e[a];
        if (!u.poly) if (u.isExteriorRing()) i.push(new Yo(u));
        else {
          let f = u.enclosingRing();
          f != null && f.poly || i.push(new Yo(f)), (r = f == null ? void 0 : f.poly) == null || r.addInterior(u);
        }
      }
      return i;
    }
  }, lu = class {
    constructor(e, i = ws.compare) {
      Nt(this, "queue");
      Nt(this, "tree");
      Nt(this, "segments");
      this.queue = e, this.tree = new vs(i), this.segments = [];
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
        let u = null;
        if (a) {
          let _ = a.getIntersection(i);
          if (_ !== null && (i.isAnEndpoint(_) || (u = _), !a.isAnEndpoint(_))) {
            let b = this._splitSafely(a, _);
            for (let C = 0, F = b.length; C < F; C++) r.push(b[C]);
          }
        }
        let f = null;
        if (o) {
          let _ = o.getIntersection(i);
          if (_ !== null && (i.isAnEndpoint(_) || (f = _), !o.isAnEndpoint(_))) {
            let b = this._splitSafely(o, _);
            for (let C = 0, F = b.length; C < F; C++) r.push(b[C]);
          }
        }
        if (u !== null || f !== null) {
          let _ = null;
          u === null ? _ = f : f === null ? _ = u : _ = Vi.comparePoints(u, f) <= 0 ? u : f, this.queue.delete(i.rightSE), r.push(i.rightSE);
          let b = i.split(_);
          for (let C = 0, F = b.length; C < F; C++) r.push(b[C]);
        }
        r.length > 0 ? (this.tree.delete(i), r.push(e)) : (this.segments.push(i), i.prev = a);
      } else {
        if (a && o) {
          let u = a.getIntersection(o);
          if (u !== null) {
            if (!a.isAnEndpoint(u)) {
              let f = this._splitSafely(a, u);
              for (let _ = 0, b = f.length; _ < b; _++) r.push(f[_]);
            }
            if (!o.isAnEndpoint(u)) {
              let f = this._splitSafely(o, u);
              for (let _ = 0, b = f.length; _ < b; _++) r.push(f[_]);
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
  }, uu = class {
    constructor() {
      Nt(this, "type");
      Nt(this, "numMultiPolys");
    }
    run(e, i, r) {
      sa.type = e;
      let a = [new tl(i, !0)];
      for (let b = 0, C = r.length; b < C; b++) a.push(new tl(r[b], !1));
      if (sa.numMultiPolys = a.length, sa.type === "difference") {
        let b = a[0], C = 1;
        for (; C < a.length; ) Co(a[C].bbox, b.bbox) !== null ? C++ : a.splice(C, 1);
      }
      if (sa.type === "intersection") for (let b = 0, C = a.length; b < C; b++) {
        let F = a[b];
        for (let S = b + 1, Z = a.length; S < Z; S++) if (Co(F.bbox, a[S].bbox) === null) return [];
      }
      let o = new vs(Vi.compare);
      for (let b = 0, C = a.length; b < C; b++) {
        let F = a[b].getSweepEvents();
        for (let S = 0, Z = F.length; S < Z; S++) o.add(F[S]);
      }
      let u = new lu(o), f = null;
      for (o.size != 0 && (f = o.first(), o.delete(f)); f; ) {
        let b = u.process(f);
        for (let C = 0, F = b.length; C < F; C++) {
          let S = b[C];
          S.consumedBy === void 0 && o.add(S);
        }
        o.size != 0 ? (f = o.first(), o.delete(f)) : f = null;
      }
      tn.reset();
      let _ = su.factory(u.segments);
      return new ou(_).getGeom();
    }
  }, sa = new uu(), Ls = sa, hu = 0, ws = class As {
    constructor(i, r, a, o) {
      Nt(this, "id");
      Nt(this, "leftSE");
      Nt(this, "rightSE");
      Nt(this, "rings");
      Nt(this, "windings");
      Nt(this, "ringOut");
      Nt(this, "consumedBy");
      Nt(this, "prev");
      Nt(this, "_prevInResult");
      Nt(this, "_beforeState");
      Nt(this, "_afterState");
      Nt(this, "_isInResult");
      this.id = ++hu, this.leftSE = i, i.segment = this, i.otherSE = r, this.rightSE = r, r.segment = this, r.otherSE = i, this.rings = a, this.windings = o;
    }
    static compare(i, r) {
      let a = i.leftSE.point.x, o = r.leftSE.point.x, u = i.rightSE.point.x, f = r.rightSE.point.x;
      if (f.isLessThan(a)) return 1;
      if (u.isLessThan(o)) return -1;
      let _ = i.leftSE.point.y, b = r.leftSE.point.y, C = i.rightSE.point.y, F = r.rightSE.point.y;
      if (a.isLessThan(o)) {
        if (b.isLessThan(_) && b.isLessThan(C)) return 1;
        if (b.isGreaterThan(_) && b.isGreaterThan(C)) return -1;
        let S = i.comparePoint(r.leftSE.point);
        if (S < 0) return 1;
        if (S > 0) return -1;
        let Z = r.comparePoint(i.rightSE.point);
        return Z !== 0 ? Z : -1;
      }
      if (a.isGreaterThan(o)) {
        if (_.isLessThan(b) && _.isLessThan(F)) return -1;
        if (_.isGreaterThan(b) && _.isGreaterThan(F)) return 1;
        let S = r.comparePoint(i.leftSE.point);
        if (S !== 0) return S;
        let Z = i.comparePoint(r.rightSE.point);
        return Z < 0 ? 1 : Z > 0 ? -1 : 1;
      }
      if (_.isLessThan(b)) return -1;
      if (_.isGreaterThan(b)) return 1;
      if (u.isLessThan(f)) {
        let S = r.comparePoint(i.rightSE.point);
        if (S !== 0) return S;
      }
      if (u.isGreaterThan(f)) {
        let S = i.comparePoint(r.rightSE.point);
        if (S < 0) return 1;
        if (S > 0) return -1;
      }
      if (!u.eq(f)) {
        let S = C.minus(_), Z = u.minus(a), W = F.minus(b), lt = f.minus(o);
        if (S.isGreaterThan(Z) && W.isLessThan(lt)) return 1;
        if (S.isLessThan(Z) && W.isGreaterThan(lt)) return -1;
      }
      return u.isGreaterThan(f) ? 1 : u.isLessThan(f) || C.isLessThan(F) ? -1 : C.isGreaterThan(F) ? 1 : i.id < r.id ? -1 : i.id > r.id ? 1 : 0;
    }
    static fromRing(i, r, a) {
      let o, u, f, _ = Vi.comparePoints(i, r);
      if (_ < 0) o = i, u = r, f = 1;
      else if (_ > 0) o = r, u = i, f = -1;
      else throw new Error(`Tried to create degenerate segment at [${i.x}, ${i.y}]`);
      let b = new Vi(o, !0), C = new Vi(u, !1);
      return new As(b, C, [a], [f]);
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
      return tn.orient(this.leftSE.point, i, this.rightSE.point);
    }
    getIntersection(i) {
      let r = this.bbox(), a = i.bbox(), o = Co(r, a);
      if (o === null) return null;
      let u = this.leftSE.point, f = this.rightSE.point, _ = i.leftSE.point, b = i.rightSE.point, C = aa(r, _) && this.comparePoint(_) === 0, F = aa(a, u) && i.comparePoint(u) === 0, S = aa(r, b) && this.comparePoint(b) === 0, Z = aa(a, f) && i.comparePoint(f) === 0;
      if (F && C) return Z && !S ? f : !Z && S ? b : null;
      if (F) return S && u.x.eq(b.x) && u.y.eq(b.y) ? null : u;
      if (C) return Z && f.x.eq(_.x) && f.y.eq(_.y) ? null : _;
      if (Z && S) return null;
      if (Z) return f;
      if (S) return b;
      let W = au(u, this.vector(), _, i.vector());
      return W === null || !aa(o, W) ? null : tn.snap(W);
    }
    split(i) {
      let r = [], a = i.events !== void 0, o = new Vi(i, !0), u = new Vi(i, !1), f = this.rightSE;
      this.replaceRightSE(u), r.push(u), r.push(o);
      let _ = new As(o, f, this.rings.slice(), this.windings.slice());
      return Vi.comparePoints(_.leftSE.point, _.rightSE.point) > 0 && _.swapEvents(), Vi.comparePoints(this.leftSE.point, this.rightSE.point) > 0 && this.swapEvents(), a && (o.checkForConsuming(), u.checkForConsuming()), r;
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
      let o = As.compare(r, a);
      if (o !== 0) {
        if (o > 0) {
          let u = r;
          r = a, a = u;
        }
        if (r.prev === a) {
          let u = r;
          r = a, a = u;
        }
        for (let u = 0, f = a.rings.length; u < f; u++) {
          let _ = a.rings[u], b = a.windings[u], C = r.rings.indexOf(_);
          C === -1 ? (r.rings.push(_), r.windings.push(b)) : r.windings[C] += b;
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
      for (let _ = 0, b = this.rings.length; _ < b; _++) {
        let C = this.rings[_], F = this.windings[_], S = r.indexOf(C);
        S === -1 ? (r.push(C), a.push(F)) : a[S] += F;
      }
      let u = [], f = [];
      for (let _ = 0, b = r.length; _ < b; _++) {
        if (a[_] === 0) continue;
        let C = r[_], F = C.poly;
        if (f.indexOf(F) === -1) if (C.isExterior) u.push(F);
        else {
          f.indexOf(F) === -1 && f.push(F);
          let S = u.indexOf(C.poly);
          S !== -1 && u.splice(S, 1);
        }
      }
      for (let _ = 0, b = u.length; _ < b; _++) {
        let C = u[_].multiPoly;
        o.indexOf(C) === -1 && o.push(C);
      }
      return this._afterState;
    }
    isInResult() {
      if (this.consumedBy) return !1;
      if (this._isInResult !== void 0) return this._isInResult;
      let i = this.beforeState().multiPolys, r = this.afterState().multiPolys;
      switch (Ls.type) {
        case "union": {
          let a = i.length === 0, o = r.length === 0;
          this._isInResult = a !== o;
          break;
        }
        case "intersection": {
          let a, o;
          i.length < r.length ? (a = i.length, o = r.length) : (a = r.length, o = i.length), this._isInResult = o === Ls.numMultiPolys && a < o;
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
  }, Qo = class {
    constructor(e, i, r) {
      Nt(this, "poly");
      Nt(this, "isExterior");
      Nt(this, "segments");
      Nt(this, "bbox");
      if (!Array.isArray(e) || e.length === 0) throw new Error("Input geometry is not a valid Polygon or MultiPolygon");
      if (this.poly = i, this.isExterior = r, this.segments = [], typeof e[0][0] != "number" || typeof e[0][1] != "number") throw new Error("Input geometry is not a valid Polygon or MultiPolygon");
      let a = tn.snap({ x: new Ui(e[0][0]), y: new Ui(e[0][1]) });
      this.bbox = { ll: { x: a.x, y: a.y }, ur: { x: a.x, y: a.y } };
      let o = a;
      for (let u = 1, f = e.length; u < f; u++) {
        if (typeof e[u][0] != "number" || typeof e[u][1] != "number") throw new Error("Input geometry is not a valid Polygon or MultiPolygon");
        let _ = tn.snap({ x: new Ui(e[u][0]), y: new Ui(e[u][1]) });
        _.x.eq(o.x) && _.y.eq(o.y) || (this.segments.push(ws.fromRing(o, _, this)), _.x.isLessThan(this.bbox.ll.x) && (this.bbox.ll.x = _.x), _.y.isLessThan(this.bbox.ll.y) && (this.bbox.ll.y = _.y), _.x.isGreaterThan(this.bbox.ur.x) && (this.bbox.ur.x = _.x), _.y.isGreaterThan(this.bbox.ur.y) && (this.bbox.ur.y = _.y), o = _);
      }
      (!a.x.eq(o.x) || !a.y.eq(o.y)) && this.segments.push(ws.fromRing(o, a, this));
    }
    getSweepEvents() {
      let e = [];
      for (let i = 0, r = this.segments.length; i < r; i++) {
        let a = this.segments[i];
        e.push(a.leftSE), e.push(a.rightSE);
      }
      return e;
    }
  }, cu = class {
    constructor(e, i) {
      Nt(this, "multiPoly");
      Nt(this, "exteriorRing");
      Nt(this, "interiorRings");
      Nt(this, "bbox");
      if (!Array.isArray(e)) throw new Error("Input geometry is not a valid Polygon or MultiPolygon");
      this.exteriorRing = new Qo(e[0], this, !0), this.bbox = { ll: { x: this.exteriorRing.bbox.ll.x, y: this.exteriorRing.bbox.ll.y }, ur: { x: this.exteriorRing.bbox.ur.x, y: this.exteriorRing.bbox.ur.y } }, this.interiorRings = [];
      for (let r = 1, a = e.length; r < a; r++) {
        let o = new Qo(e[r], this, !1);
        o.bbox.ll.x.isLessThan(this.bbox.ll.x) && (this.bbox.ll.x = o.bbox.ll.x), o.bbox.ll.y.isLessThan(this.bbox.ll.y) && (this.bbox.ll.y = o.bbox.ll.y), o.bbox.ur.x.isGreaterThan(this.bbox.ur.x) && (this.bbox.ur.x = o.bbox.ur.x), o.bbox.ur.y.isGreaterThan(this.bbox.ur.y) && (this.bbox.ur.y = o.bbox.ur.y), this.interiorRings.push(o);
      }
      this.multiPoly = i;
    }
    getSweepEvents() {
      let e = this.exteriorRing.getSweepEvents();
      for (let i = 0, r = this.interiorRings.length; i < r; i++) {
        let a = this.interiorRings[i].getSweepEvents();
        for (let o = 0, u = a.length; o < u; o++) e.push(a[o]);
      }
      return e;
    }
  }, tl = class {
    constructor(e, i) {
      Nt(this, "isSubject");
      Nt(this, "polys");
      Nt(this, "bbox");
      if (!Array.isArray(e)) throw new Error("Input geometry is not a valid Polygon or MultiPolygon");
      try {
        typeof e[0][0][0] == "number" && (e = [e]);
      } catch {
      }
      this.polys = [], this.bbox = { ll: { x: new Ui(Number.POSITIVE_INFINITY), y: new Ui(Number.POSITIVE_INFINITY) }, ur: { x: new Ui(Number.NEGATIVE_INFINITY), y: new Ui(Number.NEGATIVE_INFINITY) } };
      for (let r = 0, a = e.length; r < a; r++) {
        let o = new cu(e[r], this);
        o.bbox.ll.x.isLessThan(this.bbox.ll.x) && (this.bbox.ll.x = o.bbox.ll.x), o.bbox.ll.y.isLessThan(this.bbox.ll.y) && (this.bbox.ll.y = o.bbox.ll.y), o.bbox.ur.x.isGreaterThan(this.bbox.ur.x) && (this.bbox.ur.x = o.bbox.ur.x), o.bbox.ur.y.isGreaterThan(this.bbox.ur.y) && (this.bbox.ur.y = o.bbox.ur.y), this.polys.push(o);
      }
      this.isSubject = i;
    }
    getSweepEvents() {
      let e = [];
      for (let i = 0, r = this.polys.length; i < r; i++) {
        let a = this.polys[i].getSweepEvents();
        for (let o = 0, u = a.length; o < u; o++) e.push(a[o]);
      }
      return e;
    }
  }, du = (e, ...i) => Ls.run("intersection", e, i), fu = (e, ...i) => Ls.run("difference", e, i);
  tn.set;
  function Cs(e) {
    let i = { type: "Feature" };
    return i.geometry = e, i;
  }
  function ks(e) {
    return e.type === "Feature" ? e.geometry : e;
  }
  function el(e) {
    return e && e.geometry && e.geometry.coordinates ? e.geometry.coordinates : e;
  }
  function pu(e) {
    return Cs({ type: "LineString", coordinates: e });
  }
  function _u(e) {
    return Cs({ type: "MultiLineString", coordinates: e });
  }
  function il(e) {
    return Cs({ type: "Polygon", coordinates: e });
  }
  function nl(e) {
    return Cs({ type: "MultiPolygon", coordinates: e });
  }
  function mu(e, i) {
    let r = ks(e), a = ks(i), o = du(r.coordinates, a.coordinates);
    return o.length === 0 ? null : o.length === 1 ? il(o[0]) : nl(o);
  }
  function gu(e, i) {
    let r = ks(e), a = ks(i), o = fu(r.coordinates, a.coordinates);
    return o.length === 0 ? null : o.length === 1 ? il(o[0]) : nl(o);
  }
  function rl(e) {
    return Array.isArray(e) ? 1 + rl(e[0]) : -1;
  }
  function yu(e) {
    e instanceof L.Polyline && (e = e.toGeoJSON(15));
    let i = el(e), r = rl(i), a = [];
    return r > 1 ? i.forEach((o) => {
      a.push(pu(o));
    }) : a.push(e), a;
  }
  function vu(e) {
    let i = [];
    return e.eachLayer((r) => {
      i.push(el(r.toGeoJSON(15)));
    }), _u(i);
  }
  Ae.Cut = Ae.Polygon.extend({ initialize(e) {
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
        let o = !!ni(e.toGeoJSON(15), a.toGeoJSON(15)).features.length > 0;
        return o || a instanceof L.Polyline && !(a instanceof L.Polygon) ? o : !!mu(e.toGeoJSON(15), a.toGeoJSON(15));
      } catch {
        return a instanceof L.Polygon && console.error("You can't cut polygons with self-intersections"), !1;
      }
    }).forEach((a) => {
      let o;
      if (a instanceof L.Polygon) {
        o = L.polygon(a.getLatLngs());
        let b = o.getLatLngs();
        r.forEach((C) => {
          if (C && C.snapInfo) {
            let { latlng: F } = C, S = this._calcClosestLayer(F, [o]);
            if (S && S.segment && S.distance < this.options.snapDistance) {
              let { segment: Z } = S;
              if (Z && Z.length === 2) {
                let { indexPath: W, parentPath: lt, newIndex: vt } = L.PM.Utils._getIndexFromSegment(b, Z);
                (W.length > 1 ? (0, xo.default)(b, lt) : b).splice(vt, 0, F);
              }
            }
          }
        });
      } else o = a;
      let u = this._cutLayer(e, o), f = L.geoJSON(u, a.options);
      f.getLayers().length === 1 && ([f] = f.getLayers()), this._setPane(f, "layerPane");
      let _ = f.addTo(this._map.pm._getContainingLayer());
      if (_.pm.enable(a.pm.options), _.pm.disable(), a._pmTempLayer = !0, e._pmTempLayer = !0, a.remove(), a.removeFrom(this._map.pm._getContainingLayer()), e.remove(), e.removeFrom(this._map.pm._getContainingLayer()), _.getLayers && _.getLayers().length === 0 && this._map.pm.removeLayer({ target: _ }), _ instanceof L.LayerGroup ? (_.eachLayer((b) => {
        this._addDrawnLayerProp(b);
      }), this._addDrawnLayerProp(_)) : this._addDrawnLayerProp(_), this.options.layersToCut && L.Util.isArray(this.options.layersToCut) && this.options.layersToCut.length > 0) {
        let b = this.options.layersToCut.indexOf(a);
        b > -1 && this.options.layersToCut.splice(b, 1);
      }
      this._editedLayers.push({ layer: _, originalLayer: a });
    });
  }, _cutLayer(e, i) {
    let r = L.geoJSON(), a;
    if (i instanceof L.Polygon) a = gu(i.toGeoJSON(15), e.toGeoJSON(15));
    else {
      let o = yu(i);
      o.forEach((u) => {
        let f = yo(u, e.toGeoJSON(15)), _;
        f && f.features.length > 0 ? _ = L.geoJSON(f) : _ = L.geoJSON(u), _.getLayers().forEach((b) => {
          ps(e.toGeoJSON(15), b.toGeoJSON(15)) || b.addTo(r);
        });
      }), o.length > 1 ? a = vu(r) : a = r.toGeoJSON(15);
    }
    return a;
  }, _change: L.Util.falseFn }), Ae.Text = Ae.extend({ initialize(e) {
    this._map = e, this._shape = "Text", this.toolbarButtonName = "drawText";
  }, enable(e) {
    L.Util.setOptions(this, e), this._enabled = !0, this._map.on("click", this._createMarker, this), this._map.pm.Toolbar.toggleButton(this.toolbarButtonName, !0), this._hintMarker = L.marker(this._map.getCenter(), { interactive: !1, zIndexOffset: 100, icon: L.divIcon({ className: "marker-icon cursor-marker" }) }), this._setPane(this._hintMarker, "vertexPane"), this._hintMarker._pmTempLayer = !0, this._hintMarker.addTo(this._map), this.options.cursorMarker && L.DomUtil.addClass(this._hintMarker._icon, "visible"), this.options.tooltips && this._hintMarker.bindTooltip(ae("tooltips.placeText"), { permanent: !0, offset: L.point(0, 10), direction: "bottom", opacity: 0.8 }).openTooltip(), this._layer = this._hintMarker, this._map.on("mousemove", this._syncHintMarker, this), this._map.getContainer().classList.add("geoman-draw-cursor"), this._fireDrawStart(), this._setGlobalDrawMode();
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
    var o, u, f, _;
    if (!e.latlng || this.options.requireSnapToFinish && !this._hintMarker._snapped && !this._isFirstLayer()) return;
    this._hintMarker._snapped || this._hintMarker.setLatLng(e.latlng);
    let i = this._hintMarker.getLatLng();
    if (this.textArea = this._createTextArea(), (o = this.options.textOptions) == null ? void 0 : o.className) {
      let b = this.options.textOptions.className.split(" ");
      this.textArea.classList.add(...b);
    }
    let r = this._createTextIcon(this.textArea), a = new L.Marker(i, { textMarker: !0, _textMarkerOverPM: !0, icon: r });
    if (this._setPane(a, "markerPane"), this._finishLayer(a), a.pm || (a.options.draggable = !1), a.addTo(this._map.pm._getContainingLayer()), a.pm) {
      a.pm.textArea = this.textArea, L.setOptions(a.pm, { removeIfEmpty: ((u = this.options.textOptions) == null ? void 0 : u.removeIfEmpty) ?? !0 });
      let b = ((f = this.options.textOptions) == null ? void 0 : f.focusAfterDraw) ?? !0;
      a.pm._createTextMarker(b), (_ = this.options.textOptions) != null && _.text && a.pm.setText(this.options.textOptions.text);
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
  var bu = { enableLayerDrag() {
    if (!this.options.draggable || !this._layer._map) return;
    this.disable(), this._layerDragEnabled = !0, this._map || (this._map = this._layer._map), (this._layer instanceof L.Marker || this._layer instanceof L.ImageOverlay) && L.DomEvent.on(this._getDOMElem(), "dragstart", this._stopDOMImageDrag), this._layer.dragging && this._layer.dragging.disable(), this._tempDragCoord = null, fn(this._layer) instanceof L.Canvas ? (this._layer.on("mouseout", this.removeDraggingClass, this), this._layer.on("mouseover", this.addDraggingClass, this)) : this.addDraggingClass(), this._originalMapDragState = this._layer._map.dragging._enabled, this._safeToCacheDragState = !0;
    let e = this._getDOMElem();
    e && (fn(this._layer) instanceof L.Canvas ? (this._layer.on("touchstart mousedown", this._dragMixinOnMouseDown, this), this._map.pm._addTouchEvents(e)) : L.DomEvent.on(e, "touchstart mousedown", this._simulateMouseDownEvent, this)), this._fireDragEnable();
  }, disableLayerDrag() {
    this._layerDragEnabled = !1, fn(this._layer) instanceof L.Canvas ? (this._layer.off("mouseout", this.removeDraggingClass, this), this._layer.off("mouseover", this.addDraggingClass, this)) : this.removeDraggingClass(), this._originalMapDragState && this._dragging && this._map.dragging.enable(), this._safeToCacheDragState = !1, this._layer.dragging && this._layer.dragging.disable();
    let e = this._getDOMElem();
    e && (fn(this._layer) instanceof L.Canvas ? (this._layer.off("touchstart mousedown", this._dragMixinOnMouseDown, this), this._map.pm._removeTouchEvents(e)) : L.DomEvent.off(e, "touchstart mousedown", this._simulateMouseDownEvent, this)), this._layerDragged && this._fireUpdate(), this._layerDragged = !1, this._fireDragDisable();
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
    let { latlng: i } = e, r = { lat: i.lat - this._tempDragCoord.lat, lng: i.lng - this._tempDragCoord.lng }, a = (o) => o.map((u) => {
      if (Array.isArray(u)) return a(u);
      let f = { lat: u.lat + r.lat, lng: u.lng + r.lng };
      return (u.alt || u.alt === 0) && (f.alt = u.alt), f;
    });
    if (this._layer instanceof L.Circle && this._layer.options.resizeableCircle || this._layer instanceof L.CircleMarker && this._layer.options.resizeableCircleMarker) {
      let o = a([this._layer.getLatLng()]);
      this._layer.setLatLng(o[0]), this._fireChange(this._layer.getLatLng(), "Edit");
    } else if (this._layer instanceof L.CircleMarker || this._layer instanceof L.Marker) {
      let o = this._layer.getLatLng();
      this._layer._snapped && (o = this._layer._orgLatLng);
      let u = a([o]);
      this._layer.setLatLng(u[0]), this._fireChange(this._layer.getLatLng(), "Edit");
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
  } }, xu = bu, Lu = x(Oi());
  function wu(e, i, r, a) {
    return r.unproject(i.transform(r.project(e, a)), a);
  }
  function al(e, i, r) {
    let a = r.getMaxZoom();
    if (a === 1 / 0 && (a = r.getZoom()), L.Util.isArray(e)) {
      let o = [];
      return e.forEach((u) => {
        o.push(al(u, i, r));
      }), o;
    }
    return e instanceof L.LatLng ? wu(e, i, r, a) : null;
  }
  function pr(e, i) {
    i instanceof L.Layer && (i = i.getLatLng());
    let r = e.getMaxZoom();
    return r === 1 / 0 && (r = e.getZoom()), e.project(i, r);
  }
  function Es(e, i) {
    let r = e.getMaxZoom();
    return r === 1 / 0 && (r = e.getZoom()), e.unproject(i, r);
  }
  var Cu = { _onRotateStart(e) {
    this._preventRenderingMarkers(!0), this._rotationOriginLatLng = this._getRotationCenter().clone(), this._rotationOriginPoint = pr(this._map, this._rotationOriginLatLng), this._rotationStartPoint = pr(this._map, e.target.getLatLng()), this._initialRotateLatLng = wi(this._layer), this._startAngle = this.getAngle();
    let i = wi(this._rotationLayer, this._rotationLayer.pm._rotateOrgLatLng);
    this._fireRotationStart(this._rotationLayer, i), this._fireRotationStart(this._map, i);
  }, _onRotate(e) {
    let i = pr(this._map, e.target.getLatLng()), r = this._rotationStartPoint, a = this._rotationOriginPoint, o = Math.atan2(i.y - a.y, i.x - a.x) - Math.atan2(r.y - a.y, r.x - a.x);
    this._layer.setLatLngs(this._rotateLayer(o, this._initialRotateLatLng, this._rotationOriginLatLng, L.PM.Matrix.init(), this._map));
    let u = this;
    function f(F, S = [], Z = -1) {
      if (Z > -1 && S.push(Z), L.Util.isArray(F[0])) F.forEach((W, lt) => f(W, S.slice(), lt));
      else {
        let W = S.length > 0 ? (0, Lu.default)(u._markers, S) : u._markers[0];
        F.forEach((lt, vt) => {
          W[vt].setLatLng(lt);
        });
      }
    }
    f(this._layer.getLatLngs());
    let _ = wi(this._rotationLayer);
    this._rotationLayer.setLatLngs(this._rotateLayer(o, this._rotationLayer.pm._rotateOrgLatLng, this._rotationOriginLatLng, L.PM.Matrix.init(), this._map));
    let b = o * 180 / Math.PI;
    b = b < 0 ? b + 360 : b;
    let C = b + this._startAngle;
    this._setAngle(C), this._rotationLayer.pm._setAngle(C), this._fireRotation(this._rotationLayer, b, _), this._fireRotation(this._map, b, _), this._rotationLayer.pm._fireChange(this._rotationLayer.getLatLngs(), "Rotation");
  }, _onRotateEnd() {
    let e = this._startAngle;
    delete this._rotationOriginLatLng, delete this._rotationOriginPoint, delete this._rotationStartPoint, delete this._initialRotateLatLng, delete this._startAngle;
    let i = wi(this._rotationLayer, this._rotationLayer.pm._rotateOrgLatLng);
    this._rotationLayer.pm._rotateOrgLatLng = wi(this._rotationLayer), this._fireRotationEnd(this._rotationLayer, e, i), this._fireRotationEnd(this._map, e, i), this._rotationLayer.pm._fireEdit(this._rotationLayer, "Rotation"), this._preventRenderingMarkers(!1), this._layerRotated = !0;
  }, _rotateLayer(e, i, r, a, o) {
    let u = pr(o, r);
    return this._matrix = a.clone().rotate(e, u).flip(), al(i, this._matrix, o);
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
    this.rotateEnabled() && this.disableRotate(), this._layer instanceof L.Rectangle && this._angle === void 0 && this.setInitAngle(Ur(this._layer._map, this._layer.getLatLngs()[0][0], this._layer.getLatLngs()[0][1]) || 0);
    let e = { fill: !1, stroke: !1, pmIgnore: !1, snapIgnore: !0 };
    this._rotatePoly = L.polygon(this._layer.getLatLngs(), e), this._rotatePoly._pmTempLayer = !0, this._rotatePoly.addTo(this._layer._map), this._rotatePoly.pm._setAngle(this.getAngle()), this._rotatePoly.pm.setRotationCenter(this.getRotationCenter()), this._rotatePoly.pm.setOptions(this._layer._map.pm.getGlobalOptions()), this._rotatePoly.pm.setOptions({ rotate: !0, snappable: !1, hideMiddleMarkers: !0 }), this._rotatePoly.pm._rotationLayer = this._layer, this._rotatePoly.pm.enable(), this._rotateOrgLatLng = wi(this._layer), this._rotateEnabled = !0, this._layer.on("remove", this.disableRotate, this), this._fireRotationEnable(this._layer), this._fireRotationEnable(this._layer._map);
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
  } }, ku = Cu, Eu = L.Class.extend({ includes: [xu, Ka, ku, Dn], options: { snappable: !0, snapDistance: 20, allowSelfIntersection: !0, allowSelfIntersectionEdit: !1, preventMarkerRemoval: !1, removeLayerBelowMinVertexCount: !0, limitMarkersToCount: -1, hideMiddleMarkers: !1, snapSegment: !0, syncLayersOnDrag: !1, draggable: !0, allowEditing: !0, allowRemoval: !0, allowCutting: !0, allowRotation: !0, addVertexOn: "click", removeVertexOn: "contextmenu", removeVertexValidation: void 0, addVertexValidation: void 0, moveVertexValidation: void 0, resizeableCircleMarker: !1, resizeableCircle: !0, snapMiddle: !1, snapVertex: !0 }, setOptions(e) {
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
  } }), Re = Eu;
  Re.LayerGroup = L.Class.extend({ initialize(e) {
    this._layerGroup = e, this._layers = this.getLayers(), this._getMap(), this._layers.forEach((a) => this._initLayer(a));
    let i = (a) => {
      if (a.layer._pmTempLayer) return;
      this._layers = this.getLayers();
      let o = this._layers.filter((u) => !u.pm._parentLayerGroup || !(this._layerGroup._leaflet_id in u.pm._parentLayerGroup));
      o.forEach((u) => {
        this._initLayer(u);
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
    return e ? this._layerGroup.getLayers().forEach((u) => {
      o.push(u), u instanceof L.LayerGroup && a.indexOf(u._leaflet_id) === -1 && (a.push(u._leaflet_id), o = o.concat(u.pm.getLayers(!0, !0, !0, a)));
    }) : o = this._layerGroup.getLayers(), r && (o = o.filter((u) => !(u instanceof L.LayerGroup))), i && (o = o.filter((u) => !!u.pm), o = o.filter((u) => !u._pmTempLayer), o = o.filter((u) => !L.PM.optIn && !u.options.pmIgnore || L.PM.optIn && u.options.pmIgnore === !1)), o;
  }, setOptions(e, i = []) {
    i.length === 0 && (this._layers = this.getLayers()), this.options = e, this._layers.forEach((r) => {
      r.pm && (r instanceof L.LayerGroup ? i.indexOf(r._leaflet_id) === -1 && (i.push(r._leaflet_id), r.pm.setOptions(e, i)) : r.pm.setOptions(e));
    });
  } }), Re.Marker = Re.extend({ _shape: "Marker", initialize(e) {
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
  var Ln = x(Oi()), Mu = { filterMarkerGroup() {
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
      let u = a._latlng.distanceTo(e), f = o._latlng.distanceTo(e);
      return u - f;
    }), i.filter((a, o) => r > -1 ? o < r : !0));
  }, _preventRenderMarkers: !1, _preventRenderingMarkers(e) {
    this._preventRenderMarkers = !!e;
  } }, Bu = Mu;
  Re.Line = Re.extend({ includes: [Bu], _shape: "Line", initialize(e) {
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
      return this.options.hideMiddleMarkers !== !0 && a.map((u, f) => {
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
    let { indexPath: u, index: f, parentPath: _ } = L.PM.Utils.findDeepMarkerIndex(this._markers, i), b = u.length > 1 ? (0, Ln.default)(o, _) : o, C = u.length > 1 ? (0, Ln.default)(this._markers, _) : this._markers;
    b.splice(f + 1, 0, a), C.splice(f + 1, 0, e), this._layer.setLatLngs(o), this.options.hideMiddleMarkers !== !0 && (this._createMiddleMarker(i, e), this._createMiddleMarker(e, r)), this._fireEdit(), this._layerEdited = !0, this._fireChange(this._layer.getLatLngs(), "Edit"), this._fireVertexAdded(e, L.PM.Utils.findDeepMarkerIndex(this._markers, e).indexPath, a), this.options.snappable && this._initSnappableMarkers();
  }, hasSelfIntersection() {
    return rr(this._layer.toGeoJSON(15)).features.length > 0;
  }, _handleSelfIntersectionOnVertexRemoval() {
    this._handleLayerStyle(!0) && (this._layer.setLatLngs(this._coordsBeforeEdit), this._coordsBeforeEdit = null, this._initMarkers());
  }, _handleLayerStyle(e) {
    let i = this._layer, r, a;
    if (this.options.allowSelfIntersection ? r = !1 : (a = rr(this._layer.toGeoJSON(15)), r = a.features.length > 0), r) {
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
    this.options.allowSelfIntersection || (this._coordsBeforeEdit = wi(this._layer, this._layer.getLatLngs()));
    let r = this._layer.getLatLngs(), { indexPath: a, index: o, parentPath: u } = L.PM.Utils.findDeepMarkerIndex(this._markers, i);
    if (!a) return;
    let f = a.length > 1 ? (0, Ln.default)(r, u) : r, _ = a.length > 1 ? (0, Ln.default)(this._markers, u) : this._markers, b = u[u.length - 1] > 0 && this._layer instanceof L.Polygon;
    if (!this.options.removeLayerBelowMinVertexCount && !b && (f.length <= 2 || this.isPolygon() && f.length <= 3)) {
      this._flashLayer();
      return;
    }
    f.splice(o, 1), this._layer.setLatLngs(r), this.isPolygon() && f.length <= 2 && f.splice(0, f.length);
    let C = !1;
    if (f.length <= 1 && (f.splice(0, f.length), u.length > 1 && a.length > 1 && (r = ir(r)), this._layer.setLatLngs(r), this._initMarkers(), C = !0), ie(r) || this._layer.remove(), r = ir(r), this._layer.setLatLngs(r), this._markers = ir(this._markers), !C && (_ = a.length > 1 ? (0, Ln.default)(this._markers, u) : this._markers, i._middleMarkerPrev && (this._markerGroup.removeLayer(i._middleMarkerPrev), this._removeFromCache(i._middleMarkerPrev)), i._middleMarkerNext && (this._markerGroup.removeLayer(i._middleMarkerNext), this._removeFromCache(i._middleMarkerNext)), this._markerGroup.removeLayer(i), this._removeFromCache(i), _)) {
      let F, S;
      if (this.isPolygon() ? (F = (o + 1) % _.length, S = (o + (_.length - 1)) % _.length) : (S = o - 1 < 0 ? void 0 : o - 1, F = o + 1 >= _.length ? void 0 : o + 1), F !== S) {
        let Z = _[S], W = _[F];
        this.options.hideMiddleMarkers !== !0 && this._createMiddleMarker(Z, W);
      }
      _.splice(o, 1);
    }
    this._fireEdit(), this._layerEdited = !0, this._fireVertexRemoved(i, a), this._fireChange(this._layer.getLatLngs(), "Edit");
  }, updatePolygonCoordsFromMarkerDrag(e) {
    let i = this._layer.getLatLngs(), r = e.getLatLng(), { indexPath: a, index: o, parentPath: u } = L.PM.Utils.findDeepMarkerIndex(this._markers, e), f = a.length > 1 ? (0, Ln.default)(i, u) : i;
    r.alt = f[o].alt, f.splice(o, 1, r), this._layer.setLatLngs(i);
  }, _getNeighborMarkers(e) {
    let { indexPath: i, index: r, parentPath: a } = L.PM.Utils.findDeepMarkerIndex(this._markers, e), o = i.length > 1 ? (0, Ln.default)(this._markers, a) : this._markers, u = (r + 1) % o.length, f = (r + (o.length - 1)) % o.length, _ = o[f], b = o[u];
    return { prevMarker: _, nextMarker: b };
  }, _checkMarkerAllowedToDrag(e) {
    let { prevMarker: i, nextMarker: r } = this._getNeighborMarkers(e), a = L.polyline([i.getLatLng(), e.getLatLng()]), o = L.polyline([e.getLatLng(), r.getLatLng()]), u = ni(this._layer.toGeoJSON(15), a.toGeoJSON(15)).features.filter((_) => {
      let b = _.geometry.coordinates, C = L.latLng(b[1], b[0]);
      return !C.equals(i.getLatLng()) && !C.equals(e.getLatLng());
    }).length, f = ni(this._layer.toGeoJSON(15), o.toGeoJSON(15)).features.filter((_) => {
      let b = _.geometry.coordinates, C = L.latLng(b[1], b[0]);
      return !C.equals(r.getLatLng()) && !C.equals(e.getLatLng());
    }).length;
    return !(u < 1 && f < 1);
  }, _onMarkerDragStart(e) {
    let i = e.target;
    if (this._preventRenderingMarkers(!0), this.cachedColor || (this.cachedColor = this._layer.options.color), !this._vertexValidation("move", e)) return;
    let { indexPath: r } = L.PM.Utils.findDeepMarkerIndex(this._markers, i);
    this._fireMarkerDragStart(e, r), this.options.allowSelfIntersection || (this._coordsBeforeEdit = wi(this._layer, this._layer.getLatLngs())), !this.options.allowSelfIntersection && this.options.allowSelfIntersectionEdit && this.hasSelfIntersection() ? this._markerAllowedToDrag = this._checkMarkerAllowedToDrag(i) : this._markerAllowedToDrag = null;
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
    let u = r.length > 1 ? (0, Ln.default)(this._markers, o) : this._markers, f = (a + 1) % u.length, _ = (a + (u.length - 1)) % u.length, b = i.getLatLng(), C = u[_].getLatLng(), F = u[f].getLatLng();
    if (i._middleMarkerNext) {
      let S = L.PM.Utils.calcMiddleLatLng(this._map, b, F);
      i._middleMarkerNext.setLatLng(S);
    }
    if (i._middleMarkerPrev) {
      let S = L.PM.Utils.calcMiddleLatLng(this._map, b, C);
      i._middleMarkerPrev.setLatLng(S);
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
  } }), Re.Polygon = Re.Line.extend({ _shape: "Polygon", _checkMarkerAllowedToDrag(e) {
    let { prevMarker: i, nextMarker: r } = this._getNeighborMarkers(e), a = L.polyline([i.getLatLng(), e.getLatLng()]), o = L.polyline([e.getLatLng(), r.getLatLng()]), u = ni(this._layer.toGeoJSON(15), a.toGeoJSON(15)).features.filter((_) => {
      let b = _.geometry.coordinates, C = L.latLng(b[1], b[0]);
      return !C.equals(i.getLatLng()) && !C.equals(e.getLatLng());
    }).length, f = ni(this._layer.toGeoJSON(15), o.toGeoJSON(15)).features.filter((_) => {
      let b = _.geometry.coordinates, C = L.latLng(b[1], b[0]);
      return !C.equals(r.getLatLng()) && !C.equals(e.getLatLng());
    }).length;
    return !(u < 1 && f < 1);
  } }), Re.Rectangle = Re.Polygon.extend({ _shape: "Rectangle", _initMarkers() {
    let e = this._map, i = this._findCorners();
    this._markerGroup && this._markerGroup.clearLayers(), this._markerGroup = new L.FeatureGroup(), this._markerGroup._pmTempLayer = !0, e.addLayer(this._markerGroup), this._markers = [], this._markers[0] = i.map(this._createMarker, this), [this._cornerMarkers] = this._markers, this._layer.getLatLngs()[0].forEach((r, a) => {
      let o = this._cornerMarkers.find((u) => u._index === a);
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
    this._angle === void 0 && this.setInitAngle(Ur(this._map, this._layer.getLatLngs()[0][0], this._layer.getLatLngs()[0][1]) || 0);
    let e = this._layer.getLatLngs()[0];
    return L.PM.Utils._getRotatedRectangle(e[0], e[2], this.getAngle(), this._map || this);
  } }), Re.CircleMarker = Re.extend({ _shape: "CircleMarker", initialize(e) {
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
    return this.options[this._minRadiusOption] && r < this.options[this._minRadiusOption] ? i = dn(this._map, e, i, this._getMinDistanceInMeter(e)) : this.options[this._maxRadiusOption] && r > this.options[this._maxRadiusOption] && (i = dn(this._map, e, i, this._getMaxDistanceInMeter(e))), i;
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
  } }), Re.Circle = Re.CircleMarker.extend({ _shape: "Circle", initialize(e) {
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
  } }), Re.ImageOverlay = Re.extend({ _shape: "ImageOverlay", initialize(e) {
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
  } }), Re.Text = Re.extend({ _shape: "Text", initialize(e) {
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
  var ko = function(e, i, r, a, o, u) {
    this._matrix = [e, i, r, a, o, u];
  };
  ko.init = () => new L.PM.Matrix(1, 0, 0, 1, 0, 0), ko.prototype = { transform(e) {
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
  }, _add(e, i, r, a, o, u) {
    let f = [[], [], []], _ = this._matrix, b = [[_[0], _[2], _[4]], [_[1], _[3], _[5]], [0, 0, 1]], C = [[e, r, o], [i, a, u], [0, 0, 1]], F;
    e && e instanceof L.PM.Matrix && (_ = e._matrix, C = [[_[0], _[2], _[4]], [_[1], _[3], _[5]], [0, 0, 1]]);
    for (let S = 0; S < 3; S += 1) for (let Z = 0; Z < 3; Z += 1) {
      F = 0;
      for (let W = 0; W < 3; W += 1) F += b[S][W] * C[W][Z];
      f[S][Z] = F;
    }
    return this._matrix = [f[0][0], f[1][0], f[0][1], f[1][1], f[0][2], f[1][2]], this;
  } };
  var Pu = ko, Su = { calcMiddleLatLng(e, i, r) {
    let a = e.project(i), o = e.project(r);
    return e.unproject(a._add(o)._divideBy(2));
  }, findLayers(e) {
    let i = [];
    return e.eachLayer((r) => {
      (r instanceof L.Polyline || r instanceof L.Marker || r instanceof L.Circle || r instanceof L.CircleMarker || r instanceof L.ImageOverlay) && i.push(r);
    }), i = i.filter((r) => !!r.pm), i = i.filter((r) => !r._pmTempLayer), i = i.filter((r) => !L.PM.optIn && !r.options.pmIgnore || L.PM.optIn && r.options.pmIgnore === !1), i;
  }, circleToPolygon(e, i = 60, r = !0) {
    let a = e.getLatLng(), o = e.getRadius(), u = cn(a, o, i, 0, r), f = [];
    for (let _ = 0; _ < u.length; _ += 1) {
      let b = [u[_].lat, u[_].lng];
      f.push(b);
    }
    return L.polygon(f, e.options);
  }, disablePopup(e) {
    e.getPopup() && (e._tempPopupCopy = e.getPopup(), e.unbindPopup());
  }, enablePopup(e) {
    e._tempPopupCopy && (e.bindPopup(e._tempPopupCopy), delete e._tempPopupCopy);
  }, _fireEvent(e, i, r, a = !1) {
    e.fire(i, r, a);
    let { groups: o } = this.getAllParentGroups(e);
    o.forEach((u) => {
      u.fire(i, r, a);
    });
  }, getAllParentGroups(e) {
    let i = [], r = [], a = (o) => {
      for (let u in o._eventParents) if (i.indexOf(u) === -1) {
        i.push(u);
        let f = o._eventParents[u];
        r.push(f), a(f);
      }
    };
    return !e._pmLastGroupFetch || !e._pmLastGroupFetch.time || (/* @__PURE__ */ new Date()).getTime() - e._pmLastGroupFetch.time > 1e3 ? (a(e), e._pmLastGroupFetch = { time: (/* @__PURE__ */ new Date()).getTime(), groups: r, groupIds: i }, { groupIds: i, groups: r }) : { groups: e._pmLastGroupFetch.groups, groupIds: e._pmLastGroupFetch.groupIds };
  }, createGeodesicPolygon: cn, getTranslation: ae, findDeepCoordIndex(e, i, r = !0) {
    let a, o = (f) => (_, b) => {
      let C = f.concat(b);
      if (r) {
        if (_.lat && _.lat === i.lat && _.lng === i.lng) return a = C, !0;
      } else if (_.lat && L.latLng(_).equals(i)) return a = C, !0;
      return Array.isArray(_) && _.some(o(C));
    };
    e.some(o([]));
    let u = {};
    return a && (u = { indexPath: a, index: a[a.length - 1], parentPath: a.slice(0, a.length - 1) }), u;
  }, findDeepMarkerIndex(e, i) {
    let r, a = (u) => (f, _) => {
      let b = u.concat(_);
      return f._leaflet_id === i._leaflet_id ? (r = b, !0) : Array.isArray(f) && f.some(a(b));
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
    let o = pr(a, e), u = pr(a, i), f = r * Math.PI / 180, _ = Math.cos(f), b = Math.sin(f), C = (u.x - o.x) * _ + (u.y - o.y) * b, F = (u.y - o.y) * _ - (u.x - o.x) * b, S = C * _ + o.x, Z = C * b + o.y, W = -F * b + o.x, lt = F * _ + o.y, vt = Es(a, o), kt = Es(a, { x: S, y: Z }), Bt = Es(a, u), D = Es(a, { x: W, y: lt });
    return [vt, kt, Bt, D];
  }, pxRadiusToMeterRadius(e, i, r) {
    let a = i.project(r), o = L.point(a.x + e, a.y);
    return i.distance(i.unproject(o), r);
  } }, Au = Su;
  L.PM = L.PM || { version: ye.version, Map: di, Toolbar: qa, Draw: Ae, Edit: Re, Utils: Au, Matrix: Pu, activeLang: "en", optIn: !1, initialize(e) {
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
    function u() {
      this.pm = void 0, L.PM.optIn ? this.options.pmIgnore === !1 && (this.pm = new L.PM.Edit.Polygon(this)) : this.options.pmIgnore || (this.pm = new L.PM.Edit.Polygon(this));
    }
    L.Polygon.addInitHook(u);
    function f() {
      this.pm = void 0, L.PM.optIn ? this.options.pmIgnore === !1 && (this.pm = new L.PM.Edit.Rectangle(this)) : this.options.pmIgnore || (this.pm = new L.PM.Edit.Rectangle(this));
    }
    L.Rectangle.addInitHook(f);
    function _() {
      this.pm = void 0, L.PM.optIn ? this.options.pmIgnore === !1 && (this.pm = new L.PM.Edit.Circle(this)) : this.options.pmIgnore || (this.pm = new L.PM.Edit.Circle(this));
    }
    L.Circle.addInitHook(_);
    function b() {
      this.pm = void 0, L.PM.optIn ? this.options.pmIgnore === !1 && (this.pm = new L.PM.Edit.ImageOverlay(this)) : this.options.pmIgnore || (this.pm = new L.PM.Edit.ImageOverlay(this));
    }
    L.ImageOverlay.addInitHook(b);
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
const Fh = { class: "field map-field" }, Rh = { class: "map-label" }, Nh = { class: "map-toolbar" }, zh = ["title"], jh = ["title"], $h = {
  key: 0,
  class: "map-wkt"
}, Uh = {
  key: 1,
  class: "map-hint"
}, Vh = {
  __name: "MapField",
  props: {
    field: Object,
    lang: String,
    modelValue: { type: String, default: "" }
  },
  emits: ["update:modelValue"],
  setup(h, { emit: l }) {
    delete ua.Icon.Default.prototype._getIconUrl, ua.Icon.Default.mergeOptions({
      iconRetinaUrl: new URL("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAABSCAMAAAAhFXfZAAAC91BMVEVMaXEzeak2f7I4g7g3g7cua5gzeKg8hJo3grY4g7c3grU0gLI2frE0daAubJc2gbQwd6QzeKk2gLMtd5sxdKIua5g1frA2f7IydaM0e6w2fq41fK01eqo3grgubJgta5cxdKI1f7AydaQydaMxc6EubJgvbJkwcZ4ubZkwcJwubZgubJcydqUydKIxapgubJctbJcubZcubJcvbJYubJcvbZkubJctbJctbZcubJg2f7AubJcrbZcubJcubJcua5g3grY0fq8ubJcubJdEkdEwhsw6i88vhswuhcsuhMtBjMgthMsrg8srgss6is8qgcs8i9A9iMYtg8spgcoogMo7hcMngMonf8olfso4gr8kfck5iM8jfMk4iM8he8k1fro7itAgesk2hs8eecgzfLcofssdeMg0hc4cd8g2hcsxeLQbdsgZdcgxeLImfcszhM0vda4xgckzhM4xg84wf8Yxgs4udKsvfcQucqhUndROmdM1fK0wcZ8vb5w0eqpQm9MzeKhXoNVcpdYydKNWn9VZotVKltJFjsIwcJ1Rms9OlslLmtH///8+kc9epdYzd6dbo9VHkMM2f7FHmNBClM8ydqVcpNY9hro3gLM9hLczealQmcw3fa46f7A8gLMxc6I3eagyc6FIldJMl9JSnNRSntNNl9JPnNJFi75UnM9ZodVKksg8kM45jc09e6ZHltFBk883gbRBh7pDk9EwcaBzn784g7dKkcY2i81Om9M7j85Llc81is09g7Q4grY/j9A0eqxKmdFFltBEjcXf6fFImdBCiLxJl9FGlNFBi78yiMxVndEvbpo6js74+vx+psPP3+o/ks5HkcpGmNCjwdZCkNDM3ehYoNJEls+lxNkxh8xHks0+jdC1zd5Lg6r+/v/H2ufz9/o3jM3t8/edvdM/k89Th61OiLBSjbZklbaTt9BfptdjmL1AicBHj8hGk9FAgK1dkLNTjLRekrdClc/k7fM0icy0y9tgp9c4jc2NtM9Dlc8zicxeXZn3AAAAQ3RSTlMAHDdTb4yPA+LtnEQmC4L2EmHqB7XA0d0sr478x4/Yd5i1zOfyPkf1sLVq4Nh3FvjxopQ2/STNuFzUwFIwxKaejILpIBEV9wAABhVJREFUeF6s1NdyFEcYBeBeoQIhRAkLlRDGrhIgY3BJL8CVeKzuyXFzzjkn5ZxzzuScg3PO8cKzu70JkO0LfxdTU//pM9vTu7Xgf6KqOVTb9X7toRrVEfBf1HTVjZccrT/2by1VV928Yty9ZbVuucdz90frG8DBjl9pVApbOstvmMuvVgaNXSfAAd6pGxpy6yxf5ph43pS/4f3uoaGm2rdu72S9xzOvMymkZFq/ptDrk90mhW7e4zl7HLzhxGWPR20xmSxJ/VqldG5m9XhaVOA1DadsNh3Pu5L2N6QtPO/32JpqQBVVk20oy/Pi2s23WEvyfHbe1thadVQttvm7Llf65gGmXK67XtupyoM7HQhmXdLS8oGWJNeOJ3C5fG5XCEJnkez3/oFdsvgJ4l2ANZwhrJKk/7OSXa+3Vw2WJMlKnGkobouYk6T0TyX30klOUnTD9HJ5qpckL3EW/w4XF3Xd0FGywXUrstrclVsqz5Pd/sXFYyDnPdrLcQODmGOK47IZb4CmibmMn+MYRzFZ5jg33ZL/EJrWcszHmANy3ARBK/IXtciJy8VsitPSdE3uuHxzougojcUdr8/32atnz/ev3f/K5wtpxUTpcaI45zusVDpYtZi+jg0oU9b3x74h7+n9ABvYEZeKaVq0sh0AtLKsFtqNBdeT0MrSzwwlq9+x6xAO4tgOtSzbCjrNQQiNvQUbUEubvzBUeGw26yDCsRHCoLkTHDa7IdOLIThs/gHvChszh2CimE8peRs47cxANI0lYNB5y1DljpOF0IhzBDPOZnDOqYYbeGKECbPzWnXludPphw5c2YBq5zlwXphIbO4VDCZ0gnPfUO1TwZoYwAs2ExPCedAu9DAjfQUjzITQb3jNj0KG2Sgt6BHaQUdYzWz+XmBktOHwanXjaSTcwwziBcuMOtwBmqPrTOxFQR/DRKKPqyur0aiW6cULYsx6tBm0jXpR/AUWR6HRq9WVW6MRhIq5jLyjbaCTDCijyYJNpCajdyobP/eTw0iexBAKkJ3gA5KcQb2zBXsIBckn+xVv8jkZSaEFHE+jFEleAEfayRU0MouNoBmB/L50Ai/HSLIHxcrpCvnhSQAuakKp2C/YbCylJjXRVy/z3+Kv/RrNcCo+WUzlVEhzKffnTQnxeN9fWF88fiNCUdSTsaufaChKWInHeysygfpIqagoakW+vV20J8uyl6TyNKEZWV4oRSPyCkWpgOLSbkCObT8o2r6tlG58HQquf6O0v50tB7JM7F4EORd2dx/K0w/KHsVkLPaoYrwgP/y7krr3SSMA4zj+OBgmjYkxcdIJQyQRKgg2viX9Hddi9UBb29LrKR7CVVEEEXWojUkXNyfTNDE14W9gbHJNuhjDettN3ZvbOvdOqCD3Jp/9l+/wJE+9PkYGjx/fqkys3S2rMozM/o2106rfMUINo6hVqz+eu/hd1c4xTg0TAfy5kV+4UG6+IthHTU9woWmxuKNbTfuCSfovBCxq7EtHqvYL4Sm6F8GVxsSXHMQ07TOi1DKtZxjWaaIyi4CXWjxPccUw8WVbMYY5wxC1mzEyXMJWkllpRloi+Kkoq69sxBTlElF6aAxYUbjXNlhlDZilDnM4U5SlN5biRsRHnbx3mbeWjEh4mEyiuJDl5XcWVmX5GvNkFgLWZM5qwsop4/AWfLhU1cR7k1VVvcYCWRkOI6Xy5gmnphCYIkvzuNYzHzosq2oNk2RtSs8khfUOfHIDgR6ysYBaMpl4uEgk2U/oJTs9AaTSwma7dT69geAE2ZpEjUsn2ieJNHeKfrI3EcAGJ2ZaNgVuC8EBctCLc57P5u5led6IOBkIYkuQMrmmjChs4VkfOerHqSBkPzZlhe06RslZ3zMjk2sscqKwY0RcjKK+LWbzd7KiHhkncs/siFJ+V5eXxD34B8nVuJEpGJNmxN2gH3vSvp7J70tF+D1Ej8qUJD1TkErAND2GZwTFg/LubvmgiBG3SOvdlsqFQrkEzJCL1rstlnVFROixZoDDSuXQFHESwVGlcuQcMb/b42NgjLowh5MTDFE3vNB5qStRIErdCQEh6pLPR92anSUb/wAIhldAaDMpGgAAAABJRU5ErkJggg==", import.meta.url).href,
      iconUrl: new URL("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAApCAYAAADAk4LOAAAFgUlEQVR4Aa1XA5BjWRTN2oW17d3YaZtr2962HUzbDNpjszW24mRt28p47v7zq/bXZtrp/lWnXr337j3nPCe85NcypgSFdugCpW5YoDAMRaIMqRi6aKq5E3YqDQO3qAwjVWrD8Ncq/RBpykd8oZUb/kaJutow8r1aP9II0WmLKLIsJyv1w/kqw9Ch2MYdB++12Onxee/QMwvf4/Dk/Lfp/i4nxTXtOoQ4pW5Aj7wpici1A9erdAN2OH64x8OSP9j3Ft3b7aWkTg/Fm91siTra0f9on5sQr9INejH6CUUUpavjFNq1B+Oadhxmnfa8RfEmN8VNAsQhPqF55xHkMzz3jSmChWU6f7/XZKNH+9+hBLOHYozuKQPxyMPUKkrX/K0uWnfFaJGS1QPRtZsOPtr3NsW0uyh6NNCOkU3Yz+bXbT3I8G3xE5EXLXtCXbbqwCO9zPQYPRTZ5vIDXD7U+w7rFDEoUUf7ibHIR4y6bLVPXrz8JVZEql13trxwue/uDivd3fkWRbS6/IA2bID4uk0UpF1N8qLlbBlXs4Ee7HLTfV1j54APvODnSfOWBqtKVvjgLKzF5YdEk5ewRkGlK0i33Eofffc7HT56jD7/6U+qH3Cx7SBLNntH5YIPvODnyfIXZYRVDPqgHtLs5ABHD3YzLuespb7t79FY34DjMwrVrcTuwlT55YMPvOBnRrJ4VXTdNnYug5ucHLBjEpt30701A3Ts+HEa73u6dT3FNWwflY86eMHPk+Yu+i6pzUpRrW7SNDg5JHR4KapmM5Wv2E8Tfcb1HoqqHMHU+uWDD7zg54mz5/2BSnizi9T1Dg4QQXLToGNCkb6tb1NU+QAlGr1++eADrzhn/u8Q2YZhQVlZ5+CAOtqfbhmaUCS1ezNFVm2imDbPmPng5wmz+gwh+oHDce0eUtQ6OGDIyR0uUhUsoO3vfDmmgOezH0mZN59x7MBi++WDL1g/eEiU3avlidO671bkLfwbw5XV2P8Pzo0ydy4t2/0eu33xYSOMOD8hTf4CrBtGMSoXfPLchX+J0ruSePw3LZeK0juPJbYzrhkH0io7B3k164hiGvawhOKMLkrQLyVpZg8rHFW7E2uHOL888IBPlNZ1FPzstSJM694fWr6RwpvcJK60+0HCILTBzZLFNdtAzJaohze60T8qBzyh5ZuOg5e7uwQppofEmf2++DYvmySqGBuKaicF1blQjhuHdvCIMvp8whTTfZzI7RldpwtSzL+F1+wkdZ2TBOW2gIF88PBTzD/gpeREAMEbxnJcaJHNHrpzji0gQCS6hdkEeYt9DF/2qPcEC8RM28Hwmr3sdNyht00byAut2k3gufWNtgtOEOFGUwcXWNDbdNbpgBGxEvKkOQsxivJx33iow0Vw5S6SVTrpVq11ysA2Rp7gTfPfktc6zhtXBBC+adRLshf6sG2RfHPZ5EAc4sVZ83yCN00Fk/4kggu40ZTvIEm5g24qtU4KjBrx/BTTH8ifVASAG7gKrnWxJDcU7x8X6Ecczhm3o6YicvsLXWfh3Ch1W0k8x0nXF+0fFxgt4phz8QvypiwCCFKMqXCnqXExjq10beH+UUA7+nG6mdG/Pu0f3LgFcGrl2s0kNNjpmoJ9o4B29CMO8dMT4Q5ox8uitF6fqsrJOr8qnwNbRzv6hSnG5wP+64C7h9lp30hKNtKdWjtdkbuPA19nJ7Tz3zR/ibgARbhb4AlhavcBebmTHcFl2fvYEnW0ox9xMxKBS8btJ+KiEbq9zA4RthQXDhPa0T9TEe69gWupwc6uBUphquXgf+/FrIjweHQS4/pduMe5ERUMHUd9xv8ZR98CxkS4F2n3EUrUZ10EYNw7BWm9x1GiPssi3GgiGRDKWRYZfXlON+dfNbM+GgIwYdwAAAAASUVORK5CYII=", import.meta.url).href,
      shadowUrl: new URL("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACkAAAApCAQAAAACach9AAACMUlEQVR4Ae3ShY7jQBAE0Aoz/f9/HTMzhg1zrdKUrJbdx+Kd2nD8VNudfsL/Th///dyQN2TH6f3y/BGpC379rV+S+qqetBOxImNQXL8JCAr2V4iMQXHGNJxeCfZXhSRBcQMfvkOWUdtfzlLgAENmZDcmo2TVmt8OSM2eXxBp3DjHSMFutqS7SbmemzBiR+xpKCNUIRkdkkYxhAkyGoBvyQFEJEefwSmmvBfJuJ6aKqKWnAkvGZOaZXTUgFqYULWNSHUckZuR1HIIimUExutRxwzOLROIG4vKmCKQt364mIlhSyzAf1m9lHZHJZrlAOMMztRRiKimp/rpdJDc9Awry5xTZCte7FHtuS8wJgeYGrex28xNTd086Dik7vUMscQOa8y4DoGtCCSkAKlNwpgNtphjrC6MIHUkR6YWxxs6Sc5xqn222mmCRFzIt8lEdKx+ikCtg91qS2WpwVfBelJCiQJwvzixfI9cxZQWgiSJelKnwBElKYtDOb2MFbhmUigbReQBV0Cg4+qMXSxXSyGUn4UbF8l+7qdSGnTC0XLCmahIgUHLhLOhpVCtw4CzYXvLQWQbJNmxoCsOKAxSgBJno75avolkRw8iIAFcsdc02e9iyCd8tHwmeSSoKTowIgvscSGZUOA7PuCN5b2BX9mQM7S0wYhMNU74zgsPBj3HU7wguAfnxxjFQGBE6pwN+GjME9zHY7zGp8wVxMShYX9NXvEWD3HbwJf4giO4CFIQxXScH1/TM+04kkBiAAAAAElFTkSuQmCC", import.meta.url).href
    });
    const d = h, y = l, k = Jt(() => {
      var N, J;
      return ((N = d.field.label) == null ? void 0 : N[d.lang]) || ((J = d.field.label) == null ? void 0 : J.en) || d.field.id;
    }), I = Xt(null), w = Xt(null);
    let v = null, x = null;
    Lr(() => {
      v = ua.map(I.value).setView([47.5, 13.5], 6), ua.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        maxZoom: 19
      }).addTo(v), v.pm.setLang(d.lang === "de" ? "de" : "en"), v.on("pm:create", (N) => {
        x && x.remove(), x = N.layer, v.pm.disableDraw(), w.value = null, y("update:modelValue", A(N.layer));
      }), d.modelValue && j(d.modelValue);
    }), Zn(() => d.modelValue, (N) => {
      x && (x.remove(), x = null), N && j(N);
    }), Ll(() => {
      v == null || v.remove();
    });
    function R(N) {
      if (w.value === N) {
        v.pm.disableDraw(), w.value = null;
        return;
      }
      w.value = N, N === "rectangle" ? v.pm.enableDraw("Rectangle", { snappable: !1 }) : v.pm.enableDraw("Polygon", { snappable: !1 });
    }
    function U() {
      x && (x.remove(), x = null), v.pm.disableDraw(), w.value = null, y("update:modelValue", "");
    }
    function A(N) {
      const J = N.getLatLngs(), X = Array.isArray(J[0]) ? J[0] : J[0][0] ?? J, dt = (Array.isArray(X[0]) ? X[0] : X).map((At) => `${At.lng.toFixed(6)} ${At.lat.toFixed(6)}`), Q = dt[0];
      return `POLYGON((${(dt[dt.length - 1] === Q ? dt : [...dt, Q]).join(", ")}))`;
    }
    function j(N) {
      const J = N.match(/POLYGON\s*\(\(([^)]+)\)\)/i);
      if (!J) return;
      const X = J[1].split(",").map((dt) => {
        const [Q, Et] = dt.trim().split(/\s+/).map(Number);
        return [Et, Q];
      });
      x = ua.polygon(X, { color: "#2878a8" }).addTo(v), v.fitBounds(x.getBounds(), { padding: [20, 20] });
    }
    return (N, J) => (ut(), ct("div", Fh, [
      G("div", Rh, ht(k.value), 1),
      G("div", Nh, [
        G("button", {
          class: ne(["tool-btn", { active: w.value === "rectangle" }]),
          onClick: J[0] || (J[0] = (X) => R("rectangle")),
          title: h.lang === "de" ? "Rechteck zeichnen" : "Draw rectangle"
        }, "▭ " + ht(h.lang === "de" ? "Rechteck" : "Rectangle"), 11, zh),
        G("button", {
          class: ne(["tool-btn", { active: w.value === "polygon" }]),
          onClick: J[1] || (J[1] = (X) => R("polygon")),
          title: h.lang === "de" ? "Polygon zeichnen" : "Draw polygon"
        }, "⬡ " + ht((h.lang === "de", "Polygon")), 11, jh),
        h.modelValue ? (ut(), ct("button", {
          key: 0,
          class: "tool-btn tool-btn--clear",
          onClick: U
        }, "✕ " + ht(h.lang === "de" ? "Löschen" : "Clear"), 1)) : Vt("", !0)
      ]),
      G("div", {
        ref_key: "mapEl",
        ref: I,
        class: "map-container"
      }, null, 512),
      h.modelValue ? (ut(), ct("div", $h, [
        J[2] || (J[2] = G("span", { class: "map-wkt-label" }, "WKT:", -1)),
        G("code", null, ht(h.modelValue), 1)
      ])) : Vt("", !0),
      w.value ? (ut(), ct("div", Uh, [
        w.value === "rectangle" ? (ut(), ct(se, { key: 0 }, [
          Gn(ht(h.lang === "de" ? "Klicken und ziehen um ein Rechteck aufzuspannen." : "Click and drag to draw a bounding box."), 1)
        ], 64)) : (ut(), ct(se, { key: 1 }, [
          Gn(ht(h.lang === "de" ? "Klicken um Punkte zu setzen, Doppelklick zum Abschließen." : "Click to place points, double-click to finish."), 1)
        ], 64))
      ])) : Vt("", !0)
    ]));
  }
}, Pl = /* @__PURE__ */ Se(Vh, [["__scopeId", "data-v-e6275f83"]]), Gh = ["id"], Zh = ["aria-expanded", "aria-labelledby", "aria-owns", "onKeydown"], qh = {
  key: 0,
  class: "ss-value"
}, Hh = {
  key: 1,
  class: "ss-placeholder"
}, Kh = ["aria-label"], Wh = ["id", "aria-labelledby"], Jh = ["placeholder", "aria-label", "onKeydown"], Xh = {
  key: 0,
  class: "ss-empty",
  role: "alert"
}, Yh = ["aria-selected", "onMousedown", "onMousemove"], Qh = {
  key: 1,
  class: "hint"
}, tc = {
  __name: "SearchSelectField",
  props: {
    field: Object,
    lang: String,
    modelValue: String
  },
  emits: ["update:modelValue"],
  setup(h, { emit: l }) {
    const d = h, y = l, k = Jt(() => {
      var Ct, Dt;
      return ((Ct = d.field.label) == null ? void 0 : Ct[d.lang]) || ((Dt = d.field.label) == null ? void 0 : Dt.en) || d.field.id;
    }), I = Jt(() => d.field.options || []), w = Xt(""), v = Jt(() => {
      const Ct = w.value.trim().toLowerCase();
      return Ct ? I.value.filter((Dt) => {
        var ee, Yt;
        return (((ee = Dt.label) == null ? void 0 : ee[d.lang]) || ((Yt = Dt.label) == null ? void 0 : Yt.en) || Dt.value || "").toLowerCase().includes(Ct);
      }) : I.value;
    }), x = Jt(() => {
      var Dt, re;
      if (!d.modelValue) return "";
      const Ct = I.value.find((ee) => ee.value === d.modelValue);
      return Ct ? ((Dt = Ct.label) == null ? void 0 : Dt[d.lang]) || ((re = Ct.label) == null ? void 0 : re.en) || Ct.value : d.modelValue;
    }), R = Xt(null), U = Xt(null), A = Xt(null), j = Xt(!1), N = Xt(-1);
    async function J() {
      var Dt;
      if (j.value) return;
      j.value = !0, w.value = "", N.value = -1, await br(), (Dt = U.value) == null || Dt.focus();
      const Ct = v.value.findIndex((re) => re.value === d.modelValue);
      Ct >= 0 && (N.value = Ct, Mt()), document.addEventListener("mousedown", dt);
    }
    function X() {
      j.value = !1, document.removeEventListener("mousedown", dt);
    }
    function dt(Ct) {
      var Dt;
      (Dt = R.value) != null && Dt.contains(Ct.target) || X();
    }
    Ll(() => document.removeEventListener("mousedown", dt));
    function Q(Ct) {
      y("update:modelValue", Ct.value), X();
    }
    function Et() {
      y("update:modelValue", "");
    }
    function At(Ct) {
      const Dt = v.value.length;
      Dt && (N.value = (N.value + Ct + Dt) % Dt, Mt());
    }
    function pe() {
      const Ct = v.value[N.value];
      Ct && Q(Ct);
    }
    function Mt() {
      br(() => {
        var Dt, re;
        const Ct = (Dt = A.value) == null ? void 0 : Dt.querySelectorAll(".ss-option")[N.value];
        (re = Ct == null ? void 0 : Ct.scrollIntoView) == null || re.call(Ct, { block: "nearest" });
      });
    }
    return (Ct, Dt) => {
      var re;
      return ut(), ct("div", {
        class: "field",
        ref_key: "root",
        ref: R
      }, [
        G("label", {
          id: `${h.field.id}-label`,
          class: ne({ required: h.field.required || h.field.requiredIf })
        }, ht(k.value), 11, Gh),
        G("div", {
          class: ne(["ss-input-wrap", { open: j.value, focused: j.value }]),
          role: "combobox",
          "aria-expanded": j.value,
          "aria-haspopup": "listbox",
          "aria-labelledby": `${h.field.id}-label`,
          "aria-owns": `${h.field.id}-panel`,
          tabindex: "0",
          onClick: J,
          onKeydown: [
            rn(De(J, ["prevent"]), ["enter"]),
            rn(De(J, ["prevent"]), ["space"])
          ]
        }, [
          x.value ? (ut(), ct("span", qh, ht(x.value), 1)) : (ut(), ct("span", Hh, ht(h.lang === "de" ? "— Bitte wählen —" : "— Please select —"), 1)),
          Dt[3] || (Dt[3] = G("span", {
            class: "ss-caret",
            "aria-hidden": "true"
          }, "▾", -1)),
          h.modelValue ? (ut(), ct("button", {
            key: 2,
            type: "button",
            class: "ss-clear",
            "aria-label": h.lang === "de" ? `${k.value} Auswahl aufheben` : `Clear ${k.value} selection`,
            onClick: De(Et, ["stop"])
          }, "×", 8, Kh)) : Vt("", !0)
        ], 42, Zh),
        j.value ? (ut(), ct("div", {
          key: 0,
          id: `${h.field.id}-panel`,
          class: "ss-panel",
          role: "listbox",
          "aria-labelledby": `${h.field.id}-label`
        }, [
          wl(G("input", {
            ref_key: "searchInput",
            ref: U,
            "onUpdate:modelValue": Dt[0] || (Dt[0] = (ee) => w.value = ee),
            class: "ss-search",
            placeholder: h.lang === "de" ? "Suchen …" : "Search …",
            "aria-label": h.lang === "de" ? `${k.value} durchsuchen` : `Search ${k.value}`,
            autocomplete: "off",
            onKeydown: [
              Dt[1] || (Dt[1] = rn(De((ee) => At(1), ["prevent"]), ["down"])),
              Dt[2] || (Dt[2] = rn(De((ee) => At(-1), ["prevent"]), ["up"])),
              rn(De(pe, ["prevent"]), ["enter"]),
              rn(X, ["esc"])
            ]
          }, null, 40, Jh), [
            [Cl, w.value]
          ]),
          G("ul", {
            class: "ss-list",
            ref_key: "listEl",
            ref: A
          }, [
            v.value.length ? Vt("", !0) : (ut(), ct("li", Xh, ht(h.lang === "de" ? "Keine Treffer" : "No results"), 1)),
            (ut(!0), ct(se, null, Pe(v.value, (ee, Yt) => {
              var Kt, me;
              return ut(), ct("li", {
                key: ee.value,
                class: ne(["ss-option", { selected: ee.value === h.modelValue, highlighted: Yt === N.value }]),
                role: "option",
                "aria-selected": ee.value === h.modelValue,
                onMousedown: De((Ge) => Q(ee), ["prevent"]),
                onMousemove: (Ge) => N.value = Yt
              }, ht(((Kt = ee.label) == null ? void 0 : Kt[h.lang]) || ((me = ee.label) == null ? void 0 : me.en) || ee.value), 43, Yh);
            }), 128))
          ], 512)
        ], 8, Wh)) : Vt("", !0),
        (re = h.field.hint) != null && re[h.lang] ? (ut(), ct("span", Qh, ht(h.field.hint[h.lang]), 1)) : Vt("", !0)
      ], 512);
    };
  }
}, Vo = /* @__PURE__ */ Se(tc, [["__scopeId", "data-v-9a833d33"]]), ec = { class: "field object-field" }, ic = { class: "object-fieldset" }, nc = { class: "object-legend" }, rc = {
  __name: "ObjectField",
  props: {
    field: Object,
    lang: String,
    modelValue: { type: Object, default: () => ({}) }
  },
  emits: ["update:modelValue"],
  setup(h, { emit: l }) {
    const d = h, y = l, k = Jt(() => {
      var R, U;
      return ((R = d.field.label) == null ? void 0 : R[d.lang]) || ((U = d.field.label) == null ? void 0 : U.en) || d.field.id;
    }), I = {
      text: xr,
      uri: Uo,
      select: jo,
      langstring: Ml,
      textarea: zo,
      date: $o,
      map: Pl,
      searchselect: Vo
    };
    function w(R) {
      return I[R.type] || xr;
    }
    function v(R, U) {
      const A = { ...d.modelValue || {} };
      d.field.rdfType && (A["rdf:type"] = d.field.rdfType), y("update:modelValue", { ...A, [R]: U });
    }
    function x(R) {
      const U = d.field.rdfType ? { "rdf:type": d.field.rdfType } : {};
      y("update:modelValue", { ...U, ...R });
    }
    return (R, U) => (ut(), ct("div", ec, [
      h.field.remember ? (ut(), Pi(El, {
        key: 0,
        field: h.field,
        lang: h.lang,
        onSelect: x
      }, null, 8, ["field", "lang"])) : Vt("", !0),
      G("fieldset", ic, [
        G("legend", nc, ht(k.value), 1),
        (ut(!0), ct(se, null, Pe(h.field.subFields, (A) => (ut(), Pi(No(w(A)), {
          key: A.id,
          field: A,
          lang: h.lang,
          modelValue: (h.modelValue || {})[A.id],
          "onUpdate:modelValue": (j) => v(A.id, j)
        }, null, 8, ["field", "lang", "modelValue", "onUpdate:modelValue"]))), 128))
      ])
    ]));
  }
}, Sl = /* @__PURE__ */ Se(rc, [["__scopeId", "data-v-468d73b0"]]), ac = { class: "langstring-item" }, sc = ["value", "aria-label"], oc = ["value"], lc = ["value", "placeholder", "aria-label"], uc = {
  __name: "LangStringItem",
  props: {
    modelValue: { type: Object, default: () => ({ value: "", lang: "de" }) },
    lang: String,
    placeholder: { type: String, default: "" }
  },
  emits: ["update:modelValue"],
  setup(h, { emit: l }) {
    const d = h, y = l, k = ["de", "en", "fr", "it", "es", "nl", "pl", "cs", "sk", "hr"];
    function I(v) {
      y("update:modelValue", { ...d.modelValue, lang: v });
    }
    function w(v) {
      y("update:modelValue", { ...d.modelValue, value: v });
    }
    return (v, x) => (ut(), ct("div", ac, [
      G("select", {
        class: "lang-select",
        value: h.modelValue.lang || "de",
        "aria-label": h.lang === "de" ? "Sprache des Eintrags" : "Language of this entry",
        onChange: x[0] || (x[0] = (R) => I(R.target.value))
      }, [
        (ut(), ct(se, null, Pe(k, (R) => G("option", {
          key: R,
          value: R
        }, ht(R), 9, oc)), 64))
      ], 40, sc),
      G("input", {
        type: "text",
        value: h.modelValue.value || "",
        placeholder: h.placeholder,
        "aria-label": h.lang === "de" ? `Texteingabe auf ${h.modelValue.lang || "de"}` : `Text in ${h.modelValue.lang || "de"}`,
        onInput: x[1] || (x[1] = (R) => w(R.target.value))
      }, null, 40, lc)
    ]));
  }
}, hc = /* @__PURE__ */ Se(uc, [["__scopeId", "data-v-470faf43"]]), cc = { class: "field" }, dc = { class: "items" }, fc = ["aria-label", "onClick"], pc = {
  key: 0,
  class: "hint"
}, _c = {
  __name: "RepeatableField",
  props: {
    field: Object,
    lang: String,
    modelValue: { type: Array, default: () => [] }
  },
  emits: ["update:modelValue"],
  setup(h, { emit: l }) {
    const d = h, y = l, k = Jt(() => {
      var X, dt;
      return ((X = d.field.label) == null ? void 0 : X[d.lang]) || ((dt = d.field.label) == null ? void 0 : dt.en) || d.field.id;
    }), I = Jt(() => {
      var X, dt;
      return ((X = d.field.placeholder) == null ? void 0 : X[d.lang]) || ((dt = d.field.placeholder) == null ? void 0 : dt.en) || "";
    }), w = {
      text: xr,
      textarea: zo,
      uri: Uo,
      date: $o,
      select: jo,
      searchselect: Vo,
      object: Sl
    }, v = Jt(() => w[d.field.type] || xr), x = Jt(() => {
      const X = d.modelValue;
      return Array.isArray(X) ? X.length ? X : [A()] : X != null && X !== "" ? [X] : [A()];
    });
    let R = 0;
    const U = Xt([]);
    Zn(x, (X) => {
      for (; U.value.length < X.length; )
        U.value.push(++R);
    }, { immediate: !0 });
    function A() {
      return d.field.type === "langstring" ? { value: "", lang: d.lang || "de" } : "";
    }
    function j(X, dt) {
      const Q = Array.isArray(d.modelValue) ? [...d.modelValue] : [];
      for (; Q.length <= X; ) Q.push(A());
      Q[X] = dt, y("update:modelValue", Q);
    }
    function N() {
      const X = Array.isArray(d.modelValue) && d.modelValue.length ? d.modelValue : [A()];
      y("update:modelValue", [...X, A()]);
    }
    function J(X) {
      const dt = Array.isArray(d.modelValue) ? [...d.modelValue] : [];
      dt.splice(X, 1), U.value.splice(X, 1), y("update:modelValue", dt.length ? dt : [A()]);
    }
    return (X, dt) => {
      var Q;
      return ut(), ct("div", cc, [
        G("label", {
          class: ne({ required: h.field.required })
        }, ht(k.value), 3),
        G("div", dc, [
          (ut(!0), ct(se, null, Pe(x.value, (Et, At) => (ut(), ct("div", {
            key: U.value[At] ?? At,
            class: "item-row"
          }, [
            h.field.type === "langstring" ? (ut(), Pi(hc, {
              key: 0,
              modelValue: Et,
              lang: h.lang,
              placeholder: I.value,
              "onUpdate:modelValue": (pe) => j(At, pe)
            }, null, 8, ["modelValue", "lang", "placeholder", "onUpdate:modelValue"])) : (ut(), Pi(No(v.value), {
              key: 1,
              field: h.field,
              lang: h.lang,
              modelValue: Et,
              "onUpdate:modelValue": (pe) => j(At, pe)
            }, null, 8, ["field", "lang", "modelValue", "onUpdate:modelValue"])),
            G("button", {
              type: "button",
              class: "btn-remove",
              "aria-label": h.lang === "de" ? `Eintrag ${At + 1} aus ${k.value} entfernen` : `Remove item ${At + 1} from ${k.value}`,
              onClick: (pe) => J(At)
            }, "×", 8, fc)
          ]))), 128))
        ]),
        G("button", {
          type: "button",
          class: "btn-add",
          onClick: N
        }, " + " + ht(h.lang === "de" ? "Hinzufügen" : "Add"), 1),
        (Q = h.field.hint) != null && Q[h.lang] ? (ut(), ct("span", pc, ht(h.field.hint[h.lang]), 1)) : Vt("", !0)
      ]);
    };
  }
}, mc = /* @__PURE__ */ Se(_c, [["__scopeId", "data-v-ed1327e0"]]), gc = { class: "field" }, yc = { class: "multiselect-fieldset" }, vc = { class: "multiselect-box" }, bc = ["value", "checked", "onChange"], xc = {
  key: 0,
  class: "empty"
}, Lc = {
  key: 0,
  class: "hint"
}, wc = {
  __name: "MultiSelectField",
  props: {
    field: Object,
    lang: String,
    modelValue: { type: Array, default: () => [] }
  },
  emits: ["update:modelValue"],
  setup(h, { emit: l }) {
    const d = h, y = l, k = Jt(() => {
      var w, v;
      return ((w = d.field.label) == null ? void 0 : w[d.lang]) || ((v = d.field.label) == null ? void 0 : v.en) || d.field.id;
    });
    function I(w) {
      const v = d.modelValue || [], x = v.includes(w) ? v.filter((R) => R !== w) : [...v, w];
      y("update:modelValue", x);
    }
    return (w, v) => {
      var x, R;
      return ut(), ct("div", gc, [
        G("fieldset", yc, [
          G("legend", {
            class: ne({ required: h.field.required })
          }, ht(k.value), 3),
          G("div", vc, [
            (ut(!0), ct(se, null, Pe(h.field.options, (U) => {
              var A, j;
              return ut(), ct("label", {
                key: U.value,
                class: "option-row"
              }, [
                G("input", {
                  type: "checkbox",
                  value: U.value,
                  checked: (h.modelValue || []).includes(U.value),
                  onChange: (N) => I(U.value)
                }, null, 40, bc),
                G("span", null, ht(((A = U.label) == null ? void 0 : A[h.lang]) || ((j = U.label) == null ? void 0 : j.de) || U.value), 1)
              ]);
            }), 128)),
            (x = h.field.options) != null && x.length ? Vt("", !0) : (ut(), ct("span", xc, ht(h.lang === "de" ? "Keine Optionen konfiguriert." : "No options configured."), 1))
          ])
        ]),
        (R = h.field.hint) != null && R[h.lang] ? (ut(), ct("span", Lc, ht(h.field.hint[h.lang]), 1)) : Vt("", !0)
      ]);
    };
  }
}, Cc = /* @__PURE__ */ Se(wc, [["__scopeId", "data-v-de4950da"]]), xa = {
  /**
   * Shows only the last path segment of a URI.
   * Encodes back by prepending the original prefix (or a configured one).
   *
   * Config example:
   *   "transform": "uriSuffix"
   *   "transformOptions": { "prefix": "https://data.gv.at/dataset/" }
   */
  uriSuffix: {
    display(h) {
      if (!h) return h;
      try {
        const d = new URL(h).pathname.split("/").filter(Boolean);
        return d[d.length - 1] || h;
      } catch {
        return h;
      }
    },
    encode(h, l, d) {
      if (!h) return h;
      try {
        return new URL(h), h;
      } catch {
      }
      if (d)
        try {
          new URL(d);
          const y = d.slice(0, d.lastIndexOf("/") + 1);
          if (y) return y + h;
        } catch {
        }
      return l != null && l.prefix ? l.prefix + h : h;
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
    display(h, l) {
      return !h || !(l != null && l.prefix) ? h : h.startsWith(l.prefix) ? h.slice(l.prefix.length) : h;
    },
    encode(h, l, d) {
      if (!h) return h;
      try {
        return new URL(h), h;
      } catch {
      }
      return l != null && l.prefix ? l.prefix + h : h;
    }
  }
};
function kc(h, l) {
  const d = typeof h == "string" ? { [h]: l } : h;
  for (const [y, k] of Object.entries(d)) {
    if (xa[y]) {
      console.warn(`[fieldTransforms] "${y}" already exists — skipping. Use a unique name.`);
      continue;
    }
    xa[y] = k;
  }
}
function Oo(h, l, d) {
  const y = xa[h];
  return y ? y.display(l, d) : (console.warn(`[fieldTransforms] Unknown transform: "${h}"`), l);
}
function Vn(h, l, d, y) {
  const k = xa[h];
  return k ? k.encode(l, d, y) : (console.warn(`[fieldTransforms] Unknown transform: "${h}"`), l);
}
const Ec = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  applyDisplay: Oo,
  applyEncode: Vn,
  fieldTransforms: xa,
  registerTransform: kc
}, Symbol.toStringTag, { value: "Module" })), Mc = { class: "group-fields" }, Bc = ["id"], Pc = {
  key: 2,
  class: "transform-preview"
}, Sc = {
  key: 3,
  class: "field-errors",
  role: "alert"
}, Ac = {
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
  setup(h, { emit: l }) {
    const d = h, y = l;
    function k(v) {
      var R;
      const x = (R = d.modelValue) == null ? void 0 : R[v.id];
      return v.transform ? v.multiple && Array.isArray(x) ? x.map((U) => Oo(v.transform, U, v.transformOptions)) : Oo(v.transform, x, v.transformOptions) : x;
    }
    function I(v, x) {
      var A;
      if (!v.transform || !x) return null;
      const R = (A = d.modelValue) == null ? void 0 : A[v.id];
      if (v.multiple && Array.isArray(x)) {
        const j = x.map((N, J) => {
          const X = Array.isArray(R) ? R[J] : R;
          return Vn(v.transform, N, v.transformOptions, X);
        });
        return j.some((N, J) => N !== x[J]) ? j.join(", ") : null;
      }
      const U = Vn(v.transform, x, v.transformOptions, R);
      return U !== x ? U : null;
    }
    function w(v, x) {
      var U;
      const R = typeof v == "string" ? v : v.id;
      if (typeof v == "object" && v.transform) {
        const A = (U = d.modelValue) == null ? void 0 : U[R];
        let j;
        v.multiple && Array.isArray(x) ? j = x.map((N, J) => {
          const X = Array.isArray(A) ? A[J] : A;
          return Vn(v.transform, N, v.transformOptions, X);
        }) : j = Vn(v.transform, x, v.transformOptions, A), y("update:modelValue", { ...d.modelValue, [R]: j });
      } else
        y("update:modelValue", { ...d.modelValue, [R]: x });
    }
    return (v, x) => (ut(), ct("div", Mc, [
      (ut(!0), ct(se, null, Pe(h.fields, (R) => {
        var U, A;
        return ut(), ct("div", {
          key: R.id,
          id: "field-" + R.id,
          class: ne(["field-wrapper", { "has-error": h.showErrors && ((U = h.fieldErrors[R.id]) == null ? void 0 : U.length) }])
        }, [
          R.multiple && R.type !== "multiselect" && R.type !== "distribution-editor" && R.type !== "object" ? (ut(), Pi(mc, {
            key: 0,
            field: R,
            lang: h.lang,
            modelValue: k(R),
            "onUpdate:modelValue": (j) => w(R, j)
          }, null, 8, ["field", "lang", "modelValue", "onUpdate:modelValue"])) : (ut(), Pi(No(h.fieldComponent(R)), {
            key: 1,
            field: R,
            lang: h.lang,
            modelValue: k(R),
            "onUpdate:modelValue": (j) => w(R, j)
          }, null, 8, ["field", "lang", "modelValue", "onUpdate:modelValue"])),
          R.transform && k(R) ? (ut(), ct("div", Pc, [
            Gn(ht(h.lang === "de" ? "Gespeichert als:" : "Stored as:") + " ", 1),
            G("code", null, ht(I(R, k(R)) || h.modelValue[R.id]), 1)
          ])) : Vt("", !0),
          h.showErrors && ((A = h.fieldErrors[R.id]) != null && A.length) ? (ut(), ct("ul", Sc, [
            (ut(!0), ct(se, null, Pe(h.fieldErrors[R.id], (j) => (ut(), ct("li", { key: j }, ht(j), 1))), 128))
          ])) : Vt("", !0)
        ], 10, Bc);
      }), 128))
    ]));
  }
}, dl = /* @__PURE__ */ Se(Ac, [["__scopeId", "data-v-5e63de70"]]);
let Po = null;
class Tc {
  /**
   * Registers a global async function that returns auth headers for every upload.
   * Pass null to remove the provider (uploads will be unauthenticated).
   *
   * @param {((config: object) => Promise<Record<string,string>>) | null} providerFn
   */
  static setAuthProvider(l) {
    Po = l ?? null;
  }
  /**
   * @param {File} file
   * @param {object} config — fileUpload config block from the field definition
   * @returns {Promise<string>} download URL returned by the API
   */
  async upload(l, d) {
    if (!(d != null && d.uploadUrl)) throw new Error("fileUpload.uploadUrl is not configured");
    const y = d.uploadUrl.replace("{filename}", encodeURIComponent(l.name)), k = (d.method || "POST").toUpperCase(), I = Po ? await Po(d) : {}, w = { ...d.headers || {}, ...I };
    let v;
    if (k === "PUT")
      w["Content-Type"] = l.type || "application/octet-stream", v = l;
    else {
      const U = new FormData();
      U.append(d.formField || "file", l, l.name), v = U;
    }
    const x = await fetch(y, { method: k, headers: w, body: v });
    if (!x.ok) {
      const U = await x.text().catch(() => "");
      throw new Error(`Upload failed: HTTP ${x.status}${U ? " – " + U.slice(0, 200) : ""}`);
    }
    if ((d.responseType || "text") === "json") {
      const U = await x.json(), A = d.responseUrlField || "url", j = Dc(U, A);
      if (!j) throw new Error(`Response JSON has no field "${A}"`);
      return String(j);
    }
    return (await x.text()).trim();
  }
}
function Dc(h, l) {
  return l.split(".").reduce((d, y) => d != null ? d[y] : void 0, h);
}
const Ic = { class: "dist-form" }, Oc = {
  key: 0,
  class: "field span2 upload-section"
}, Fc = { class: "drop-text" }, Rc = { class: "drop-text" }, Nc = { class: "drop-size" }, zc = { class: "drop-text" }, jc = { class: "drop-text" }, $c = { class: "drop-text error-text" }, Uc = { class: "field" }, Vc = { class: "required" }, Gc = ["value"], Zc = { class: "field" }, qc = ["value"], Hc = { class: "field span2" }, Kc = ["value", "placeholder"], Wc = { class: "field span2" }, Jc = ["value", "placeholder"], Xc = { class: "field" }, Yc = ["value"], Qc = { value: "" }, td = ["value"], ed = { class: "field" }, id = ["value"], nd = { class: "field span2" }, rd = ["value"], ad = { class: "field" }, sd = ["value"], od = { value: "" }, ld = ["value"], ud = { class: "field" }, hd = ["value"], cd = { class: "field" }, dd = ["value"], fd = {
  __name: "DistributionForm",
  props: {
    modelValue: { type: Object, default: () => ({}) },
    lang: String,
    formatOptions: { type: Array, default: () => [] },
    availabilityOptions: { type: Array, default: () => [] },
    uploadConfig: { type: Object, default: null }
  },
  emits: ["update:modelValue"],
  setup(h, { emit: l }) {
    const d = h, y = l;
    function k(dt, Q) {
      y("update:modelValue", { ...d.modelValue, [dt]: Q });
    }
    const I = Xt(null), w = Xt(null), v = Xt(!1), x = Xt("idle"), R = Xt("");
    function U(dt) {
      var Et;
      const Q = (Et = dt.target.files) == null ? void 0 : Et[0];
      Q && j(Q);
    }
    function A(dt) {
      var Et;
      if (v.value = !1, x.value === "uploading") return;
      const Q = (Et = dt.dataTransfer.files) == null ? void 0 : Et[0];
      Q && j(Q);
    }
    function j(dt) {
      w.value = dt, x.value = "selected", R.value = "";
    }
    function N() {
      w.value = null, x.value = "idle", R.value = "", I.value && (I.value.value = "");
    }
    async function J() {
      if (w.value) {
        x.value = "uploading";
        try {
          const Q = await new Tc().upload(w.value, d.uploadConfig);
          x.value = "success";
          const Et = { ...d.modelValue, "dcat:downloadURL": Q };
          Et["dcat:accessURL"] || (Et["dcat:accessURL"] = Q), y("update:modelValue", Et);
        } catch (dt) {
          x.value = "error", R.value = dt.message;
        }
      }
    }
    function X(dt) {
      return dt ? dt < 1024 ? `${dt} B` : dt < 1024 * 1024 ? `${(dt / 1024).toFixed(1)} KB` : `${(dt / (1024 * 1024)).toFixed(1)} MB` : "";
    }
    return (dt, Q) => {
      var Et, At, pe;
      return ut(), ct("div", Ic, [
        (Et = h.uploadConfig) != null && Et.enabled ? (ut(), ct("div", Oc, [
          G("label", null, ht(h.lang === "de" ? "Datei hochladen" : "Upload file"), 1),
          G("div", {
            class: ne(["drop-zone", { dragging: v.value, uploading: x.value === "uploading", success: x.value === "success", error: x.value === "error" }]),
            onDragover: Q[0] || (Q[0] = De((Mt) => v.value = !0, ["prevent"])),
            onDragleave: Q[1] || (Q[1] = (Mt) => v.value = !1),
            onDrop: De(A, ["prevent"]),
            onClick: Q[2] || (Q[2] = (Mt) => {
              var Ct;
              return (Ct = I.value) == null ? void 0 : Ct.click();
            })
          }, [
            G("input", {
              ref_key: "fileInput",
              ref: I,
              type: "file",
              class: "hidden-input",
              onChange: U
            }, null, 544),
            x.value === "idle" ? (ut(), ct(se, { key: 0 }, [
              Q[13] || (Q[13] = G("span", { class: "drop-icon" }, "📂", -1)),
              G("span", Fc, ht(h.lang === "de" ? "Datei hierher ziehen oder klicken zum Auswählen" : "Drag a file here or click to select"), 1)
            ], 64)) : x.value === "selected" ? (ut(), ct(se, { key: 1 }, [
              Q[14] || (Q[14] = G("span", { class: "drop-icon" }, "📄", -1)),
              G("span", Rc, ht((At = w.value) == null ? void 0 : At.name), 1),
              G("span", Nc, ht(X((pe = w.value) == null ? void 0 : pe.size)), 1)
            ], 64)) : x.value === "uploading" ? (ut(), ct(se, { key: 2 }, [
              Q[15] || (Q[15] = G("span", { class: "drop-icon spin" }, "⟳", -1)),
              G("span", zc, ht(h.lang === "de" ? "Wird hochgeladen …" : "Uploading …"), 1)
            ], 64)) : x.value === "success" ? (ut(), ct(se, { key: 3 }, [
              Q[16] || (Q[16] = G("span", { class: "drop-icon" }, "✓", -1)),
              G("span", jc, ht(h.lang === "de" ? "Erfolgreich hochgeladen" : "Upload successful"), 1),
              G("button", {
                type: "button",
                class: "btn-reset-upload",
                onClick: De(N, ["stop"])
              }, ht(h.lang === "de" ? "Andere Datei" : "Choose another"), 1)
            ], 64)) : x.value === "error" ? (ut(), ct(se, { key: 4 }, [
              Q[17] || (Q[17] = G("span", { class: "drop-icon" }, "⚠", -1)),
              G("span", $c, ht(R.value), 1),
              G("button", {
                type: "button",
                class: "btn-reset-upload",
                onClick: De(N, ["stop"])
              }, ht(h.lang === "de" ? "Erneut versuchen" : "Try again"), 1)
            ], 64)) : Vt("", !0)
          ], 34),
          x.value === "selected" ? (ut(), ct("button", {
            key: 0,
            type: "button",
            class: "btn-upload",
            onClick: J
          }, ht(h.lang === "de" ? "Hochladen" : "Upload"), 1)) : Vt("", !0)
        ])) : Vt("", !0),
        G("div", Uc, [
          G("label", Vc, ht(h.lang === "de" ? "Zugangs-URL" : "Access URL"), 1),
          G("input", {
            type: "url",
            value: h.modelValue["dcat:accessURL"] || "",
            placeholder: "https://…",
            onInput: Q[3] || (Q[3] = (Mt) => k("dcat:accessURL", Mt.target.value))
          }, null, 40, Gc)
        ]),
        G("div", Zc, [
          G("label", null, ht(h.lang === "de" ? "Download-URL" : "Download URL"), 1),
          G("input", {
            type: "url",
            value: h.modelValue["dcat:downloadURL"] || "",
            placeholder: "https://…",
            onInput: Q[4] || (Q[4] = (Mt) => k("dcat:downloadURL", Mt.target.value))
          }, null, 40, qc)
        ]),
        G("div", Hc, [
          G("label", null, ht(h.lang === "de" ? "Titel" : "Title"), 1),
          G("input", {
            type: "text",
            value: h.modelValue["dct:title"] || "",
            placeholder: h.lang === "de" ? "Titel der Distribution" : "Distribution title",
            onInput: Q[5] || (Q[5] = (Mt) => k("dct:title", Mt.target.value))
          }, null, 40, Kc)
        ]),
        G("div", Wc, [
          G("label", null, ht(h.lang === "de" ? "Beschreibung" : "Description"), 1),
          G("textarea", {
            value: h.modelValue["dct:description"] || "",
            placeholder: h.lang === "de" ? "Beschreibung …" : "Description …",
            onInput: Q[6] || (Q[6] = (Mt) => k("dct:description", Mt.target.value)),
            rows: "3"
          }, null, 40, Jc)
        ]),
        G("div", Xc, [
          G("label", null, ht(h.lang === "de" ? "Dateiformat" : "File Format"), 1),
          G("select", {
            value: h.modelValue["dct:format"] || "",
            onChange: Q[7] || (Q[7] = (Mt) => k("dct:format", Mt.target.value))
          }, [
            G("option", Qc, ht(h.lang === "de" ? "— Bitte wählen —" : "— Please select —"), 1),
            (ut(!0), ct(se, null, Pe(h.formatOptions, (Mt) => {
              var Ct, Dt;
              return ut(), ct("option", {
                key: Mt.value,
                value: Mt.value
              }, ht(((Ct = Mt.label) == null ? void 0 : Ct[h.lang]) || ((Dt = Mt.label) == null ? void 0 : Dt.en) || Mt.value), 9, td);
            }), 128))
          ], 40, Yc)
        ]),
        G("div", ed, [
          G("label", null, ht(h.lang === "de" ? "Medientyp" : "Media Type"), 1),
          G("input", {
            type: "text",
            value: h.modelValue["dcat:mediaType"] || "",
            placeholder: "text/csv",
            onInput: Q[8] || (Q[8] = (Mt) => k("dcat:mediaType", Mt.target.value))
          }, null, 40, id)
        ]),
        G("div", nd, [
          G("label", null, ht(h.lang === "de" ? "Lizenz" : "License"), 1),
          G("input", {
            type: "url",
            value: h.modelValue["dct:license"] || "",
            placeholder: "https://creativecommons.org/licenses/by/4.0/",
            onInput: Q[9] || (Q[9] = (Mt) => k("dct:license", Mt.target.value))
          }, null, 40, rd)
        ]),
        G("div", ad, [
          G("label", null, ht(h.lang === "de" ? "Verfügbarkeit" : "Availability"), 1),
          G("select", {
            value: h.modelValue["dcatap:availability"] || "",
            onChange: Q[10] || (Q[10] = (Mt) => k("dcatap:availability", Mt.target.value))
          }, [
            G("option", od, ht(h.lang === "de" ? "— Bitte wählen —" : "— Please select —"), 1),
            (ut(!0), ct(se, null, Pe(h.availabilityOptions, (Mt) => {
              var Ct, Dt;
              return ut(), ct("option", {
                key: Mt.value,
                value: Mt.value
              }, ht(((Ct = Mt.label) == null ? void 0 : Ct[h.lang]) || ((Dt = Mt.label) == null ? void 0 : Dt.en) || Mt.value), 9, ld);
            }), 128))
          ], 40, sd)
        ]),
        G("div", ud, [
          G("label", null, ht(h.lang === "de" ? "Veröffentlichungsdatum" : "Issued"), 1),
          G("input", {
            type: "date",
            value: h.modelValue["dct:issued"] || "",
            onInput: Q[11] || (Q[11] = (Mt) => k("dct:issued", Mt.target.value))
          }, null, 40, hd)
        ]),
        G("div", cd, [
          G("label", null, ht(h.lang === "de" ? "Zuletzt geändert" : "Modified"), 1),
          G("input", {
            type: "date",
            value: h.modelValue["dct:modified"] || "",
            onInput: Q[12] || (Q[12] = (Mt) => k("dct:modified", Mt.target.value))
          }, null, 40, dd)
        ])
      ]);
    };
  }
}, Al = /* @__PURE__ */ Se(fd, [["__scopeId", "data-v-963049dc"]]), pd = { class: "dist-header" }, _d = ["aria-label"], md = { class: "dist-body" }, gd = { class: "dist-actions" }, yd = ["disabled", "aria-disabled"], fl = "dist-modal-heading", vd = {
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
  setup(h, { emit: l }) {
    const d = h, y = l, k = Xt({ ...d.modelValue || {} }), I = Xt(null);
    Zn(() => d.modelValue, (v) => {
      k.value = { ...v || {} };
    }, { deep: !0 }), Zn(() => d.show, async (v) => {
      var x;
      if (v) {
        await br();
        const R = (x = I.value) == null ? void 0 : x.querySelector('input, select, textarea, button, [tabindex]:not([tabindex="-1"])');
        R == null || R.focus();
      }
    });
    function w() {
      y("save", { ...k.value });
    }
    return (v, x) => (ut(), Pi(Fu, { to: "body" }, [
      h.show ? (ut(), ct("div", {
        key: 0,
        class: "dist-overlay",
        onClick: x[3] || (x[3] = De((R) => v.$emit("cancel"), ["self"])),
        onKeydown: x[4] || (x[4] = rn((R) => v.$emit("cancel"), ["esc"]))
      }, [
        G("div", {
          class: "dist-panel",
          role: "dialog",
          "aria-modal": "true",
          "aria-labelledby": fl,
          ref_key: "panelEl",
          ref: I
        }, [
          G("div", pd, [
            G("h2", { id: fl }, ht(h.lang === "de" ? "Distribution bearbeiten" : "Edit Distribution"), 1),
            G("button", {
              class: "close-btn",
              "aria-label": h.lang === "de" ? "Dialog schließen" : "Close dialog",
              onClick: x[0] || (x[0] = (R) => v.$emit("cancel"))
            }, "✕", 8, _d)
          ]),
          G("div", md, [
            Ts(Al, {
              modelValue: k.value,
              lang: h.lang,
              formatOptions: h.formatOptions,
              availabilityOptions: h.availabilityOptions,
              uploadConfig: h.uploadConfig,
              "onUpdate:modelValue": x[1] || (x[1] = (R) => k.value = R)
            }, null, 8, ["modelValue", "lang", "formatOptions", "availabilityOptions", "uploadConfig"])
          ]),
          G("div", gd, [
            G("button", {
              class: "btn-cancel",
              onClick: x[2] || (x[2] = (R) => v.$emit("cancel"))
            }, ht(h.lang === "de" ? "Abbrechen" : "Cancel"), 1),
            G("button", {
              class: "btn-save",
              disabled: !k.value["dcat:accessURL"],
              "aria-disabled": !k.value["dcat:accessURL"],
              onClick: w
            }, ht(h.lang === "de" ? "Speichern" : "Save"), 9, yd)
          ])
        ], 512)
      ], 32)) : Vt("", !0)
    ]));
  }
}, bd = /* @__PURE__ */ Se(vd, [["__scopeId", "data-v-ddae0d1c"]]), Tl = {
  assetsBaseUrl: "/"
};
function w0(h = {}) {
  if (h.assetsBaseUrl !== void 0 && (Tl.assetsBaseUrl = String(h.assetsBaseUrl).replace(/\/?$/, "/")), h.extend) {
    const { extend: l } = h;
    l.validators && Promise.resolve().then(() => df).then((d) => d.registerValidator(l.validators)), l.computes && Promise.resolve().then(() => b0).then((d) => d.registerCompute(l.computes)), l.transforms && Promise.resolve().then(() => Ec).then((d) => d.registerTransform(l.transforms)), l.visibility && Promise.resolve().then(() => pf).then((d) => d.registerVisibility(l.visibility));
  }
}
function Ds(h) {
  return Tl.assetsBaseUrl + String(h).replace(/^\//, "");
}
const xd = { class: "dist-editor" }, Ld = { class: "dist-label" }, wd = {
  key: 0,
  class: "dist-empty"
}, Cd = { class: "dist-empty-hint" }, kd = ["onDragstart", "onDragover", "onDrop"], Ed = ["onClick"], Md = ["aria-label"], Bd = { class: "dist-card-summary" }, Pd = { class: "dist-card-index" }, Sd = { class: "dist-card-title" }, Ad = {
  key: 0,
  class: "dist-card-badge"
}, Td = { class: "dist-card-controls" }, Dd = ["aria-label", "onClick", "title"], Id = {
  class: "dist-toggle",
  "aria-hidden": "true"
}, Od = {
  key: 0,
  class: "dist-card-body"
}, Fd = ["onDragstart", "onDragover", "onDrop"], Rd = ["aria-label"], Nd = { class: "dist-row-info" }, zd = { class: "dist-row-title" }, jd = {
  key: 0,
  class: "dist-row-url"
}, $d = {
  key: 1,
  class: "dist-row-badge"
}, Ud = { class: "dist-row-actions" }, Vd = ["onClick"], Gd = ["onClick"], Zd = {
  __name: "DistributionEditor",
  props: {
    field: Object,
    lang: String,
    modelValue: { type: Array, default: () => [] }
  },
  emits: ["update:modelValue"],
  setup(h, { emit: l }) {
    const d = h, y = Jt(() => {
      var St;
      return ((St = d.field) == null ? void 0 : St.fileUpload) || null;
    }), k = l, I = Jt(() => {
      var St;
      return ((St = d.field) == null ? void 0 : St.distributionMode) || "inline";
    }), w = Xt([]), v = [
      { value: "http://data.europa.eu/r5r/availability/stable", label: { de: "Stabil", en: "Stable" } },
      { value: "http://data.europa.eu/r5r/availability/available", label: { de: "Verfügbar", en: "Available" } },
      { value: "http://data.europa.eu/r5r/availability/experimental", label: { de: "Experimentell", en: "Experimental" } },
      { value: "http://data.europa.eu/r5r/availability/temporary", label: { de: "Vorübergehend", en: "Temporary" } }
    ];
    Lr(async () => {
      try {
        const St = await fetch(Ds("vocabularies/file-format.json"));
        St.ok && (w.value = await St.json());
      } catch {
      }
    });
    const x = Jt(() => Array.isArray(d.modelValue) ? d.modelValue : []);
    function R() {
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
    function U() {
      if (I.value === "inline") {
        const St = [...x.value, R()];
        k("update:modelValue", St), X.value = /* @__PURE__ */ new Set([...X.value, St.length - 1]);
      } else
        Et.value = -1, Q.value = R();
    }
    function A(St) {
      const zt = x.value.filter((le, pt) => pt !== St);
      if (J.value.splice(St, 1), k("update:modelValue", zt), I.value === "inline") {
        const le = /* @__PURE__ */ new Set();
        for (const pt of X.value)
          pt < St ? le.add(pt) : pt > St && le.add(pt - 1);
        X.value = le;
      }
    }
    function j(St, zt) {
      const le = x.value.map((pt, bt) => bt === St ? zt : pt);
      k("update:modelValue", le);
    }
    let N = 0;
    const J = Xt([]);
    Zn(x, (St) => {
      for (; J.value.length < St.length; ) J.value.push(++N);
    }, { immediate: !0 });
    const X = Xt(/* @__PURE__ */ new Set([0]));
    function dt(St) {
      const zt = new Set(X.value);
      zt.has(St) ? zt.delete(St) : zt.add(St), X.value = zt;
    }
    const Q = Xt(null), Et = Xt(-1);
    function At(St) {
      Et.value = St, Q.value = { ...x.value[St] || {} };
    }
    function pe(St) {
      const zt = [...x.value];
      Et.value === -1 ? zt.push(St) : zt[Et.value] = St, k("update:modelValue", zt), Q.value = null;
    }
    const Mt = Xt(-1), Ct = Xt(-1);
    function Dt(St, zt) {
      Mt.value = St, zt.dataTransfer.effectAllowed = "move", zt.dataTransfer.setData("text/plain", String(St));
    }
    function re(St) {
      St !== Mt.value && (Ct.value = St);
    }
    function ee() {
      Ct.value = -1;
    }
    function Yt(St) {
      const zt = Mt.value;
      if (zt === -1 || zt === St) {
        Kt();
        return;
      }
      const le = [...x.value], [pt] = le.splice(zt, 1);
      if (le.splice(St, 0, pt), I.value === "inline") {
        const bt = /* @__PURE__ */ new Set();
        for (const mt of X.value) {
          const _t = me(mt, zt, St);
          _t >= 0 && bt.add(_t);
        }
        X.value = bt;
      }
      k("update:modelValue", le), Kt();
    }
    function Kt() {
      Mt.value = -1, Ct.value = -1;
    }
    function me(St, zt, le) {
      return St === zt ? le : zt < le ? St > zt && St <= le ? St - 1 : St : St >= le && St < zt ? St + 1 : St;
    }
    function Ge(St) {
      return St["dct:title"] || St["dcat:accessURL"] || "—";
    }
    function be(St) {
      var le, pt;
      const zt = w.value.find((bt) => bt.value === St);
      return zt ? ((le = zt.label) == null ? void 0 : le[d.lang]) || ((pt = zt.label) == null ? void 0 : pt.en) || St : St.split("/").pop() || St;
    }
    return (St, zt) => {
      var le, pt;
      return ut(), ct("div", xd, [
        G("label", Ld, ht(((le = h.field.label) == null ? void 0 : le[h.lang]) || ((pt = h.field.label) == null ? void 0 : pt.en) || h.field.id), 1),
        x.value.length ? (ut(), ct(se, { key: 1 }, [
          I.value === "inline" ? (ut(!0), ct(se, { key: 0 }, Pe(x.value, (bt, mt) => (ut(), ct("div", {
            key: J.value[mt] ?? mt,
            class: ne(["dist-card", { "drag-over": Ct.value === mt, dragging: Mt.value === mt }]),
            draggable: "true",
            onDragstart: (_t) => Dt(mt, _t),
            onDragover: De((_t) => re(mt), ["prevent"]),
            onDragleave: ee,
            onDrop: De((_t) => Yt(mt), ["prevent"]),
            onDragend: Kt
          }, [
            G("div", {
              class: "dist-card-header",
              onClick: (_t) => dt(mt)
            }, [
              G("span", {
                class: "drag-handle",
                "aria-label": h.lang === "de" ? "Distribution verschieben" : "Drag to reorder",
                title: "Drag to reorder",
                onClick: zt[0] || (zt[0] = De(() => {
                }, ["stop"]))
              }, "⠿", 8, Md),
              G("div", Bd, [
                G("span", Pd, ht(mt + 1) + ".", 1),
                G("span", Sd, ht(Ge(bt)), 1),
                bt["dct:format"] ? (ut(), ct("span", Ad, ht(be(bt["dct:format"])), 1)) : Vt("", !0)
              ]),
              G("div", Td, [
                G("button", {
                  type: "button",
                  class: "btn-remove-inline",
                  "aria-label": (h.lang === "de", "Distribution " + (mt + 1) + (h.lang === "de" ? " entfernen" : " remove")),
                  onClick: De((_t) => A(mt), ["stop"]),
                  title: h.lang === "de" ? "Entfernen" : "Remove"
                }, "✕", 8, Dd),
                G("span", Id, ht(X.value.has(mt) ? "▲" : "▼"), 1)
              ])
            ], 8, Ed),
            X.value.has(mt) ? (ut(), ct("div", Od, [
              Ts(Al, {
                modelValue: bt,
                lang: h.lang,
                formatOptions: w.value,
                availabilityOptions: v,
                uploadConfig: y.value,
                "onUpdate:modelValue": (_t) => j(mt, _t)
              }, null, 8, ["modelValue", "lang", "formatOptions", "uploadConfig", "onUpdate:modelValue"])
            ])) : Vt("", !0)
          ], 42, kd))), 128)) : (ut(!0), ct(se, { key: 1 }, Pe(x.value, (bt, mt) => (ut(), ct("div", {
            key: J.value[mt] ?? mt,
            class: ne(["dist-row", { "drag-over": Ct.value === mt, dragging: Mt.value === mt }]),
            draggable: "true",
            onDragstart: (_t) => Dt(mt, _t),
            onDragover: De((_t) => re(mt), ["prevent"]),
            onDragleave: ee,
            onDrop: De((_t) => Yt(mt), ["prevent"]),
            onDragend: Kt
          }, [
            G("span", {
              class: "drag-handle",
              "aria-label": h.lang === "de" ? "Distribution verschieben" : "Drag to reorder",
              title: "Drag to reorder"
            }, "⠿", 8, Rd),
            G("div", Nd, [
              G("span", zd, ht(Ge(bt)), 1),
              bt["dcat:accessURL"] ? (ut(), ct("span", jd, ht(bt["dcat:accessURL"]), 1)) : Vt("", !0),
              bt["dct:format"] ? (ut(), ct("span", $d, ht(be(bt["dct:format"])), 1)) : Vt("", !0)
            ]),
            G("div", Ud, [
              G("button", {
                class: "btn-edit",
                onClick: (_t) => At(mt)
              }, ht(h.lang === "de" ? "Bearbeiten" : "Edit"), 9, Vd),
              G("button", {
                class: "btn-remove",
                onClick: (_t) => A(mt)
              }, ht(h.lang === "de" ? "Entfernen" : "Remove"), 9, Gd)
            ])
          ], 42, Fd))), 128)),
          G("button", {
            type: "button",
            class: "btn-add",
            onClick: U
          }, " + " + ht(h.lang === "de" ? "Distribution hinzufügen" : "Add distribution"), 1)
        ], 64)) : (ut(), ct("div", wd, [
          G("p", Cd, ht(h.lang === "de" ? "Noch keine Distributionen vorhanden." : "No distributions yet."), 1),
          G("button", {
            class: "btn-add-first",
            onClick: U
          }, ht(h.lang === "de" ? "Erste Distribution hinzufügen" : "Add first distribution"), 1)
        ])),
        I.value === "modal" && Q.value !== null ? (ut(), Pi(bd, {
          key: 2,
          show: Q.value !== null,
          modelValue: Q.value,
          lang: h.lang,
          formatOptions: w.value,
          availabilityOptions: v,
          uploadConfig: y.value,
          onSave: pe,
          onCancel: zt[1] || (zt[1] = (bt) => Q.value = null)
        }, null, 8, ["show", "modelValue", "lang", "formatOptions", "uploadConfig"])) : Vt("", !0)
      ]);
    };
  }
}, qd = /* @__PURE__ */ Se(Zd, [["__scopeId", "data-v-9bf8f7a8"]]), Hd = { class: "validation-report" }, Kd = { class: "report-header" }, Wd = { class: "report-title" }, Jd = { class: "report-summary" }, Xd = {
  key: 0,
  class: "badge badge-info"
}, Yd = ["aria-label"], Qd = {
  key: 0,
  class: "report-valid",
  role: "status",
  "aria-live": "polite"
}, tf = {
  key: 0,
  class: "sev-section"
}, ef = { class: "sev-count" }, nf = { class: "violation-field" }, rf = { class: "field-label" }, af = { class: "field-id" }, sf = { class: "violation-constraint" }, of = { class: "constraint-tag" }, lf = { class: "constraint-msg" }, uf = ["aria-label", "onClick"], hf = {
  __name: "ValidationReport",
  props: {
    violations: { type: Array, default: () => [] },
    lang: { type: String, default: "de" }
  },
  emits: ["close", "navigate"],
  setup(h) {
    const l = h, d = Jt(() => {
      var v;
      const w = { violation: [], warning: [], info: [] };
      for (const x of l.violations)
        (v = w[x.severity]) == null || v.push(x);
      return w;
    }), y = Jt(() => ({
      violation: d.value.violation.length,
      warning: d.value.warning.length,
      info: d.value.info.length
    }));
    function k(w) {
      var v, x;
      return ((v = w.fieldLabel) == null ? void 0 : v[l.lang]) || ((x = w.fieldLabel) == null ? void 0 : x.en) || w.fieldId;
    }
    function I(w) {
      var x, R;
      const v = {
        violation: { de: "Verstöße", en: "Violations" },
        warning: { de: "Warnungen", en: "Warnings" },
        info: { de: "Hinweise", en: "Info" }
      };
      return ((x = v[w]) == null ? void 0 : x[l.lang]) || ((R = v[w]) == null ? void 0 : R.en) || w;
    }
    return (w, v) => (ut(), ct("div", Hd, [
      G("div", Kd, [
        G("span", Wd, ht(h.lang === "de" ? "SHACL-Validierungsbericht" : "SHACL Validation Report"), 1),
        G("div", Jd, [
          G("span", {
            class: ne(["badge badge-violation", { zero: y.value.violation === 0 }])
          }, [
            v[1] || (v[1] = G("span", { "aria-hidden": "true" }, "✗ ", -1)),
            Gn(ht(y.value.violation) + " " + ht(h.lang === "de" ? " Verstoß" + (y.value.violation !== 1 ? "e" : "") : " Violation" + (y.value.violation !== 1 ? "s" : "")), 1)
          ], 2),
          G("span", {
            class: ne(["badge badge-warning", { zero: y.value.warning === 0 }])
          }, [
            v[2] || (v[2] = G("span", { "aria-hidden": "true" }, "⚠ ", -1)),
            Gn(ht(y.value.warning) + " " + ht(h.lang === "de" ? " Warnung" + (y.value.warning !== 1 ? "en" : "") : " Warning" + (y.value.warning !== 1 ? "s" : "")), 1)
          ], 2),
          y.value.info > 0 ? (ut(), ct("span", Xd, [
            v[3] || (v[3] = G("span", { "aria-hidden": "true" }, "ℹ ", -1)),
            Gn(ht(y.value.info), 1)
          ])) : Vt("", !0)
        ]),
        G("button", {
          class: "btn-close",
          type: "button",
          "aria-label": h.lang === "de" ? "Bericht schließen" : "Close report",
          onClick: v[0] || (v[0] = (x) => w.$emit("close"))
        }, "×", 8, Yd)
      ]),
      h.violations.length === 0 ? (ut(), ct("div", Qd, [
        v[4] || (v[4] = G("span", {
          class: "valid-icon",
          "aria-hidden": "true"
        }, "✓", -1)),
        G("span", null, ht(h.lang === "de" ? "Keine Verstöße gefunden." : "No violations found."), 1)
      ])) : Vt("", !0),
      (ut(), ct(se, null, Pe(["violation", "warning", "info"], (x) => {
        var R;
        return ut(), ct(se, { key: x }, [
          (R = d.value[x]) != null && R.length ? (ut(), ct("div", tf, [
            G("div", {
              class: ne(["sev-heading", "sev-" + x])
            }, [
              G("span", null, ht(I(x)), 1),
              G("span", ef, "(" + ht(d.value[x].length) + ")", 1)
            ], 2),
            (ut(!0), ct(se, null, Pe(d.value[x], (U) => (ut(), ct("div", {
              key: U.fieldId + "|" + U.constraint,
              class: ne(["violation-row", "row-" + U.severity])
            }, [
              G("div", nf, [
                G("span", rf, ht(k(U)), 1),
                G("code", af, ht(U.fieldId), 1)
              ]),
              G("div", sf, [
                G("span", of, ht(U.constraint), 1),
                G("span", lf, ht(h.lang === "de" ? U.messageDe : U.messageEn), 1)
              ]),
              U.groupId ? (ut(), ct("button", {
                key: 0,
                type: "button",
                class: "btn-navigate",
                "aria-label": (h.lang === "de" ? "Zum Feld navigieren: " : "Navigate to field: ") + k(U),
                onClick: (A) => w.$emit("navigate", { fieldId: U.fieldId, groupId: U.groupId })
              }, ht(h.lang === "de" ? "Zum Feld" : "Go to field"), 9, uf)) : Vt("", !0)
            ], 2))), 128))
          ])) : Vt("", !0)
        ], 64);
      }), 64))
    ]));
  }
}, pl = /* @__PURE__ */ Se(hf, [["__scopeId", "data-v-b7f169b8"]]), La = {
  isURI: (h, l) => {
    if (!h) return [];
    try {
      return new URL(h), [];
    } catch {
      return [l === "de" ? "Ungültige URL." : "Invalid URL."];
    }
  },
  isURIList: (h, l) => {
    if (!Array.isArray(h)) return [];
    const d = [];
    return h.forEach((y, k) => {
      if (y)
        try {
          new URL(y);
        } catch {
          const I = l === "de" ? `Eintrag ${k + 1}` : `Entry ${k + 1}`;
          d.push(`${I}: ${l === "de" ? "Ungültige URL" : "Invalid URL"}`);
        }
    }), d;
  },
  isEmail: (h, l) => h ? /^[^\s@]+@[^\s@]+\.[^\s@]+$/i.test(h) ? [] : [l === "de" ? "Ungültige E-Mail-Adresse." : "Invalid email address."] : [],
  isDate: (h, l) => h ? /^\d{4}-\d{2}-\d{2}$/.test(h) ? [] : [l === "de" ? "Ungültiges Datum (JJJJ-MM-TT)." : "Invalid date (YYYY-MM-DD)."] : [],
  isWKTorGeoJSON: (h, l) => {
    if (!h) return [];
    const d = h.trim(), y = /^(POINT|LINESTRING|POLYGON|MULTIPOINT|MULTILINESTRING|MULTIPOLYGON|GEOMETRYCOLLECTION)/i.test(d), k = d.startsWith("{") && d.includes('"type"');
    return y || k ? [] : [l === "de" ? "Bitte WKT- oder GeoJSON-Geometrie eingeben." : "Please enter a WKT or GeoJSON geometry."];
  }
};
function cf(h, l) {
  const d = typeof h == "string" ? { [h]: l } : h;
  for (const [y, k] of Object.entries(d)) {
    if (La[y]) {
      console.warn(`[fieldValidators] "${y}" already exists — skipping. Use a unique name.`);
      continue;
    }
    La[y] = k;
  }
}
const df = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  fieldValidators: La,
  registerValidator: cf
}, Symbol.toStringTag, { value: "Module" })), wa = {
  ifHVDLegislation: (h) => (h == null ? void 0 : h["dcatap:applicableLegislation"]) === "http://data.europa.eu/eli/reg_impl/2023/138/oj"
};
function ff(h, l) {
  const d = typeof h == "string" ? { [h]: l } : h;
  for (const [y, k] of Object.entries(d)) {
    if (wa[y]) {
      console.warn(`[fieldVisibility] "${y}" already exists — skipping. Use a unique name.`);
      continue;
    }
    wa[y] = k;
  }
}
function Dl(h, l) {
  if (!h) return !0;
  const d = wa[h];
  return d ? d(l) : (console.warn(`[fieldVisibility] unknown function: "${h}"`), !0);
}
function Il(h, l) {
  if (!h) return !1;
  const d = wa[h];
  return d ? d(l) : (console.warn(`[fieldVisibility] unknown requiredIf function: "${h}"`), !1);
}
const pf = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  evaluateRequiredIf: Il,
  evaluateVisibleIf: Dl,
  fieldVisibilityFns: wa,
  registerVisibility: ff
}, Symbol.toStringTag, { value: "Module" }));
function Fo(h, l) {
  return h == null ? !1 : Array.isArray(h) ? h.some(
    (d) => d && (typeof d == "object" ? d.value || Object.values(d).some((y) => y) : d)
  ) : typeof h == "object" ? l != null && l.subFields ? l.subFields.filter((d) => d.required).every((d) => h[d.id]) : Object.values(h).some((d) => d) : h !== "";
}
function Ol(h, l, d, y) {
  var x, R, U, A;
  const k = [], I = d === "de";
  if ((h.required || Il(h.requiredIf, y)) && !Fo(l, h)) {
    const j = ((R = (x = h.errorMessages) == null ? void 0 : x.required) == null ? void 0 : R[d]) || (I ? "Dieses Feld ist erforderlich." : "This field is required.");
    return k.push(j), k;
  }
  if (h.validate && Fo(l, h)) {
    const j = La[h.validate];
    j ? k.push(...j(l, d)) : console.warn(`[useValidation] Unknown validator: "${h.validate}"`);
  }
  const v = typeof l == "object" && l !== null && !Array.isArray(l) && Object.values(l).some((j) => j);
  if (h.type === "object" && h.subFields && v)
    for (const j of h.subFields) {
      const N = Ol(j, l[j.id], d);
      if (N.length) {
        const J = ((U = j.label) == null ? void 0 : U[d]) || ((A = j.label) == null ? void 0 : A.de) || j.id;
        k.push(...N.map((X) => `${J}: ${X}`));
      }
    }
  return k;
}
function _f(h, l, d) {
  const y = {};
  if (!(h != null && h.fields)) return y;
  const k = new Set(
    (h.groups || []).flatMap((I) => I.fields || [])
  );
  for (const [I, w] of Object.entries(h.fields)) {
    if (w.visible === !1 || !k.has(I)) continue;
    const v = Ol(w, l == null ? void 0 : l[I], d, l);
    v.length && (y[I] = v);
  }
  return y;
}
var Fl = {}, Os = {};
Os.byteLength = yf;
Os.toByteArray = bf;
Os.fromByteArray = wf;
var Zi = [], xi = [], mf = typeof Uint8Array < "u" ? Uint8Array : Array, So = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
for (var _r = 0, gf = So.length; _r < gf; ++_r)
  Zi[_r] = So[_r], xi[So.charCodeAt(_r)] = _r;
xi[45] = 62;
xi[95] = 63;
function Rl(h) {
  var l = h.length;
  if (l % 4 > 0)
    throw new Error("Invalid string. Length must be a multiple of 4");
  var d = h.indexOf("=");
  d === -1 && (d = l);
  var y = d === l ? 0 : 4 - d % 4;
  return [d, y];
}
function yf(h) {
  var l = Rl(h), d = l[0], y = l[1];
  return (d + y) * 3 / 4 - y;
}
function vf(h, l, d) {
  return (l + d) * 3 / 4 - d;
}
function bf(h) {
  var l, d = Rl(h), y = d[0], k = d[1], I = new mf(vf(h, y, k)), w = 0, v = k > 0 ? y - 4 : y, x;
  for (x = 0; x < v; x += 4)
    l = xi[h.charCodeAt(x)] << 18 | xi[h.charCodeAt(x + 1)] << 12 | xi[h.charCodeAt(x + 2)] << 6 | xi[h.charCodeAt(x + 3)], I[w++] = l >> 16 & 255, I[w++] = l >> 8 & 255, I[w++] = l & 255;
  return k === 2 && (l = xi[h.charCodeAt(x)] << 2 | xi[h.charCodeAt(x + 1)] >> 4, I[w++] = l & 255), k === 1 && (l = xi[h.charCodeAt(x)] << 10 | xi[h.charCodeAt(x + 1)] << 4 | xi[h.charCodeAt(x + 2)] >> 2, I[w++] = l >> 8 & 255, I[w++] = l & 255), I;
}
function xf(h) {
  return Zi[h >> 18 & 63] + Zi[h >> 12 & 63] + Zi[h >> 6 & 63] + Zi[h & 63];
}
function Lf(h, l, d) {
  for (var y, k = [], I = l; I < d; I += 3)
    y = (h[I] << 16 & 16711680) + (h[I + 1] << 8 & 65280) + (h[I + 2] & 255), k.push(xf(y));
  return k.join("");
}
function wf(h) {
  for (var l, d = h.length, y = d % 3, k = [], I = 16383, w = 0, v = d - y; w < v; w += I)
    k.push(Lf(h, w, w + I > v ? v : w + I));
  return y === 1 ? (l = h[d - 1], k.push(
    Zi[l >> 2] + Zi[l << 4 & 63] + "=="
  )) : y === 2 && (l = (h[d - 2] << 8) + h[d - 1], k.push(
    Zi[l >> 10] + Zi[l >> 4 & 63] + Zi[l << 2 & 63] + "="
  )), k.join("");
}
var Go = {};
/*! ieee754. BSD-3-Clause License. Feross Aboukhadijeh <https://feross.org/opensource> */
Go.read = function(h, l, d, y, k) {
  var I, w, v = k * 8 - y - 1, x = (1 << v) - 1, R = x >> 1, U = -7, A = d ? k - 1 : 0, j = d ? -1 : 1, N = h[l + A];
  for (A += j, I = N & (1 << -U) - 1, N >>= -U, U += v; U > 0; I = I * 256 + h[l + A], A += j, U -= 8)
    ;
  for (w = I & (1 << -U) - 1, I >>= -U, U += y; U > 0; w = w * 256 + h[l + A], A += j, U -= 8)
    ;
  if (I === 0)
    I = 1 - R;
  else {
    if (I === x)
      return w ? NaN : (N ? -1 : 1) * (1 / 0);
    w = w + Math.pow(2, y), I = I - R;
  }
  return (N ? -1 : 1) * w * Math.pow(2, I - y);
};
Go.write = function(h, l, d, y, k, I) {
  var w, v, x, R = I * 8 - k - 1, U = (1 << R) - 1, A = U >> 1, j = k === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0, N = y ? 0 : I - 1, J = y ? 1 : -1, X = l < 0 || l === 0 && 1 / l < 0 ? 1 : 0;
  for (l = Math.abs(l), isNaN(l) || l === 1 / 0 ? (v = isNaN(l) ? 1 : 0, w = U) : (w = Math.floor(Math.log(l) / Math.LN2), l * (x = Math.pow(2, -w)) < 1 && (w--, x *= 2), w + A >= 1 ? l += j / x : l += j * Math.pow(2, 1 - A), l * x >= 2 && (w++, x /= 2), w + A >= U ? (v = 0, w = U) : w + A >= 1 ? (v = (l * x - 1) * Math.pow(2, k), w = w + A) : (v = l * Math.pow(2, A - 1) * Math.pow(2, k), w = 0)); k >= 8; h[d + N] = v & 255, N += J, v /= 256, k -= 8)
    ;
  for (w = w << k | v, R += k; R > 0; h[d + N] = w & 255, N += J, w /= 256, R -= 8)
    ;
  h[d + N - J] |= X * 128;
};
/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <https://feross.org>
 * @license  MIT
 */
(function(h) {
  const l = Os, d = Go, y = typeof Symbol == "function" && typeof Symbol.for == "function" ? Symbol.for("nodejs.util.inspect.custom") : null;
  h.Buffer = v, h.SlowBuffer = Et, h.INSPECT_MAX_BYTES = 50;
  const k = 2147483647;
  h.kMaxLength = k, v.TYPED_ARRAY_SUPPORT = I(), !v.TYPED_ARRAY_SUPPORT && typeof console < "u" && typeof console.error == "function" && console.error(
    "This browser lacks typed array (Uint8Array) support which is required by `buffer` v5.x. Use `buffer` v4.x if you require old browser support."
  );
  function I() {
    try {
      const B = new Uint8Array(1), p = { foo: function() {
        return 42;
      } };
      return Object.setPrototypeOf(p, Uint8Array.prototype), Object.setPrototypeOf(B, p), B.foo() === 42;
    } catch {
      return !1;
    }
  }
  Object.defineProperty(v.prototype, "parent", {
    enumerable: !0,
    get: function() {
      if (v.isBuffer(this))
        return this.buffer;
    }
  }), Object.defineProperty(v.prototype, "offset", {
    enumerable: !0,
    get: function() {
      if (v.isBuffer(this))
        return this.byteOffset;
    }
  });
  function w(B) {
    if (B > k)
      throw new RangeError('The value "' + B + '" is invalid for option "size"');
    const p = new Uint8Array(B);
    return Object.setPrototypeOf(p, v.prototype), p;
  }
  function v(B, p, g) {
    if (typeof B == "number") {
      if (typeof p == "string")
        throw new TypeError(
          'The "string" argument must be of type string. Received type number'
        );
      return A(B);
    }
    return x(B, p, g);
  }
  v.poolSize = 8192;
  function x(B, p, g) {
    if (typeof B == "string")
      return j(B, p);
    if (ArrayBuffer.isView(B))
      return J(B);
    if (B == null)
      throw new TypeError(
        "The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " + typeof B
      );
    if (Je(B, ArrayBuffer) || B && Je(B.buffer, ArrayBuffer) || typeof SharedArrayBuffer < "u" && (Je(B, SharedArrayBuffer) || B && Je(B.buffer, SharedArrayBuffer)))
      return X(B, p, g);
    if (typeof B == "number")
      throw new TypeError(
        'The "value" argument must not be of type number. Received type number'
      );
    const O = B.valueOf && B.valueOf();
    if (O != null && O !== B)
      return v.from(O, p, g);
    const K = dt(B);
    if (K) return K;
    if (typeof Symbol < "u" && Symbol.toPrimitive != null && typeof B[Symbol.toPrimitive] == "function")
      return v.from(B[Symbol.toPrimitive]("string"), p, g);
    throw new TypeError(
      "The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " + typeof B
    );
  }
  v.from = function(B, p, g) {
    return x(B, p, g);
  }, Object.setPrototypeOf(v.prototype, Uint8Array.prototype), Object.setPrototypeOf(v, Uint8Array);
  function R(B) {
    if (typeof B != "number")
      throw new TypeError('"size" argument must be of type number');
    if (B < 0)
      throw new RangeError('The value "' + B + '" is invalid for option "size"');
  }
  function U(B, p, g) {
    return R(B), B <= 0 ? w(B) : p !== void 0 ? typeof g == "string" ? w(B).fill(p, g) : w(B).fill(p) : w(B);
  }
  v.alloc = function(B, p, g) {
    return U(B, p, g);
  };
  function A(B) {
    return R(B), w(B < 0 ? 0 : Q(B) | 0);
  }
  v.allocUnsafe = function(B) {
    return A(B);
  }, v.allocUnsafeSlow = function(B) {
    return A(B);
  };
  function j(B, p) {
    if ((typeof p != "string" || p === "") && (p = "utf8"), !v.isEncoding(p))
      throw new TypeError("Unknown encoding: " + p);
    const g = At(B, p) | 0;
    let O = w(g);
    const K = O.write(B, p);
    return K !== g && (O = O.slice(0, K)), O;
  }
  function N(B) {
    const p = B.length < 0 ? 0 : Q(B.length) | 0, g = w(p);
    for (let O = 0; O < p; O += 1)
      g[O] = B[O] & 255;
    return g;
  }
  function J(B) {
    if (Je(B, Uint8Array)) {
      const p = new Uint8Array(B);
      return X(p.buffer, p.byteOffset, p.byteLength);
    }
    return N(B);
  }
  function X(B, p, g) {
    if (p < 0 || B.byteLength < p)
      throw new RangeError('"offset" is outside of buffer bounds');
    if (B.byteLength < p + (g || 0))
      throw new RangeError('"length" is outside of buffer bounds');
    let O;
    return p === void 0 && g === void 0 ? O = new Uint8Array(B) : g === void 0 ? O = new Uint8Array(B, p) : O = new Uint8Array(B, p, g), Object.setPrototypeOf(O, v.prototype), O;
  }
  function dt(B) {
    if (v.isBuffer(B)) {
      const p = Q(B.length) | 0, g = w(p);
      return g.length === 0 || B.copy(g, 0, 0, p), g;
    }
    if (B.length !== void 0)
      return typeof B.length != "number" || on(B.length) ? w(0) : N(B);
    if (B.type === "Buffer" && Array.isArray(B.data))
      return N(B.data);
  }
  function Q(B) {
    if (B >= k)
      throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x" + k.toString(16) + " bytes");
    return B | 0;
  }
  function Et(B) {
    return +B != B && (B = 0), v.alloc(+B);
  }
  v.isBuffer = function(p) {
    return p != null && p._isBuffer === !0 && p !== v.prototype;
  }, v.compare = function(p, g) {
    if (Je(p, Uint8Array) && (p = v.from(p, p.offset, p.byteLength)), Je(g, Uint8Array) && (g = v.from(g, g.offset, g.byteLength)), !v.isBuffer(p) || !v.isBuffer(g))
      throw new TypeError(
        'The "buf1", "buf2" arguments must be one of type Buffer or Uint8Array'
      );
    if (p === g) return 0;
    let O = p.length, K = g.length;
    for (let at = 0, ft = Math.min(O, K); at < ft; ++at)
      if (p[at] !== g[at]) {
        O = p[at], K = g[at];
        break;
      }
    return O < K ? -1 : K < O ? 1 : 0;
  }, v.isEncoding = function(p) {
    switch (String(p).toLowerCase()) {
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
  }, v.concat = function(p, g) {
    if (!Array.isArray(p))
      throw new TypeError('"list" argument must be an Array of Buffers');
    if (p.length === 0)
      return v.alloc(0);
    let O;
    if (g === void 0)
      for (g = 0, O = 0; O < p.length; ++O)
        g += p[O].length;
    const K = v.allocUnsafe(g);
    let at = 0;
    for (O = 0; O < p.length; ++O) {
      let ft = p[O];
      if (Je(ft, Uint8Array))
        at + ft.length > K.length ? (v.isBuffer(ft) || (ft = v.from(ft)), ft.copy(K, at)) : Uint8Array.prototype.set.call(
          K,
          ft,
          at
        );
      else if (v.isBuffer(ft))
        ft.copy(K, at);
      else
        throw new TypeError('"list" argument must be an Array of Buffers');
      at += ft.length;
    }
    return K;
  };
  function At(B, p) {
    if (v.isBuffer(B))
      return B.length;
    if (ArrayBuffer.isView(B) || Je(B, ArrayBuffer))
      return B.byteLength;
    if (typeof B != "string")
      throw new TypeError(
        'The "string" argument must be one of type string, Buffer, or ArrayBuffer. Received type ' + typeof B
      );
    const g = B.length, O = arguments.length > 2 && arguments[2] === !0;
    if (!O && g === 0) return 0;
    let K = !1;
    for (; ; )
      switch (p) {
        case "ascii":
        case "latin1":
        case "binary":
          return g;
        case "utf8":
        case "utf-8":
          return Ti(B).length;
        case "ucs2":
        case "ucs-2":
        case "utf16le":
        case "utf-16le":
          return g * 2;
        case "hex":
          return g >>> 1;
        case "base64":
          return kn(B).length;
        default:
          if (K)
            return O ? -1 : Ti(B).length;
          p = ("" + p).toLowerCase(), K = !0;
      }
  }
  v.byteLength = At;
  function pe(B, p, g) {
    let O = !1;
    if ((p === void 0 || p < 0) && (p = 0), p > this.length || ((g === void 0 || g > this.length) && (g = this.length), g <= 0) || (g >>>= 0, p >>>= 0, g <= p))
      return "";
    for (B || (B = "utf8"); ; )
      switch (B) {
        case "hex":
          return bt(this, p, g);
        case "utf8":
        case "utf-8":
          return be(this, p, g);
        case "ascii":
          return le(this, p, g);
        case "latin1":
        case "binary":
          return pt(this, p, g);
        case "base64":
          return Ge(this, p, g);
        case "ucs2":
        case "ucs-2":
        case "utf16le":
        case "utf-16le":
          return mt(this, p, g);
        default:
          if (O) throw new TypeError("Unknown encoding: " + B);
          B = (B + "").toLowerCase(), O = !0;
      }
  }
  v.prototype._isBuffer = !0;
  function Mt(B, p, g) {
    const O = B[p];
    B[p] = B[g], B[g] = O;
  }
  v.prototype.swap16 = function() {
    const p = this.length;
    if (p % 2 !== 0)
      throw new RangeError("Buffer size must be a multiple of 16-bits");
    for (let g = 0; g < p; g += 2)
      Mt(this, g, g + 1);
    return this;
  }, v.prototype.swap32 = function() {
    const p = this.length;
    if (p % 4 !== 0)
      throw new RangeError("Buffer size must be a multiple of 32-bits");
    for (let g = 0; g < p; g += 4)
      Mt(this, g, g + 3), Mt(this, g + 1, g + 2);
    return this;
  }, v.prototype.swap64 = function() {
    const p = this.length;
    if (p % 8 !== 0)
      throw new RangeError("Buffer size must be a multiple of 64-bits");
    for (let g = 0; g < p; g += 8)
      Mt(this, g, g + 7), Mt(this, g + 1, g + 6), Mt(this, g + 2, g + 5), Mt(this, g + 3, g + 4);
    return this;
  }, v.prototype.toString = function() {
    const p = this.length;
    return p === 0 ? "" : arguments.length === 0 ? be(this, 0, p) : pe.apply(this, arguments);
  }, v.prototype.toLocaleString = v.prototype.toString, v.prototype.equals = function(p) {
    if (!v.isBuffer(p)) throw new TypeError("Argument must be a Buffer");
    return this === p ? !0 : v.compare(this, p) === 0;
  }, v.prototype.inspect = function() {
    let p = "";
    const g = h.INSPECT_MAX_BYTES;
    return p = this.toString("hex", 0, g).replace(/(.{2})/g, "$1 ").trim(), this.length > g && (p += " ... "), "<Buffer " + p + ">";
  }, y && (v.prototype[y] = v.prototype.inspect), v.prototype.compare = function(p, g, O, K, at) {
    if (Je(p, Uint8Array) && (p = v.from(p, p.offset, p.byteLength)), !v.isBuffer(p))
      throw new TypeError(
        'The "target" argument must be one of type Buffer or Uint8Array. Received type ' + typeof p
      );
    if (g === void 0 && (g = 0), O === void 0 && (O = p ? p.length : 0), K === void 0 && (K = 0), at === void 0 && (at = this.length), g < 0 || O > p.length || K < 0 || at > this.length)
      throw new RangeError("out of range index");
    if (K >= at && g >= O)
      return 0;
    if (K >= at)
      return -1;
    if (g >= O)
      return 1;
    if (g >>>= 0, O >>>= 0, K >>>= 0, at >>>= 0, this === p) return 0;
    let ft = at - K, Zt = O - g;
    const de = Math.min(ft, Zt), _e = this.slice(K, at), ce = p.slice(g, O);
    for (let fe = 0; fe < de; ++fe)
      if (_e[fe] !== ce[fe]) {
        ft = _e[fe], Zt = ce[fe];
        break;
      }
    return ft < Zt ? -1 : Zt < ft ? 1 : 0;
  };
  function Ct(B, p, g, O, K) {
    if (B.length === 0) return -1;
    if (typeof g == "string" ? (O = g, g = 0) : g > 2147483647 ? g = 2147483647 : g < -2147483648 && (g = -2147483648), g = +g, on(g) && (g = K ? 0 : B.length - 1), g < 0 && (g = B.length + g), g >= B.length) {
      if (K) return -1;
      g = B.length - 1;
    } else if (g < 0)
      if (K) g = 0;
      else return -1;
    if (typeof p == "string" && (p = v.from(p, O)), v.isBuffer(p))
      return p.length === 0 ? -1 : Dt(B, p, g, O, K);
    if (typeof p == "number")
      return p = p & 255, typeof Uint8Array.prototype.indexOf == "function" ? K ? Uint8Array.prototype.indexOf.call(B, p, g) : Uint8Array.prototype.lastIndexOf.call(B, p, g) : Dt(B, [p], g, O, K);
    throw new TypeError("val must be string, number or Buffer");
  }
  function Dt(B, p, g, O, K) {
    let at = 1, ft = B.length, Zt = p.length;
    if (O !== void 0 && (O = String(O).toLowerCase(), O === "ucs2" || O === "ucs-2" || O === "utf16le" || O === "utf-16le")) {
      if (B.length < 2 || p.length < 2)
        return -1;
      at = 2, ft /= 2, Zt /= 2, g /= 2;
    }
    function de(ce, fe) {
      return at === 1 ? ce[fe] : ce.readUInt16BE(fe * at);
    }
    let _e;
    if (K) {
      let ce = -1;
      for (_e = g; _e < ft; _e++)
        if (de(B, _e) === de(p, ce === -1 ? 0 : _e - ce)) {
          if (ce === -1 && (ce = _e), _e - ce + 1 === Zt) return ce * at;
        } else
          ce !== -1 && (_e -= _e - ce), ce = -1;
    } else
      for (g + Zt > ft && (g = ft - Zt), _e = g; _e >= 0; _e--) {
        let ce = !0;
        for (let fe = 0; fe < Zt; fe++)
          if (de(B, _e + fe) !== de(p, fe)) {
            ce = !1;
            break;
          }
        if (ce) return _e;
      }
    return -1;
  }
  v.prototype.includes = function(p, g, O) {
    return this.indexOf(p, g, O) !== -1;
  }, v.prototype.indexOf = function(p, g, O) {
    return Ct(this, p, g, O, !0);
  }, v.prototype.lastIndexOf = function(p, g, O) {
    return Ct(this, p, g, O, !1);
  };
  function re(B, p, g, O) {
    g = Number(g) || 0;
    const K = B.length - g;
    O ? (O = Number(O), O > K && (O = K)) : O = K;
    const at = p.length;
    O > at / 2 && (O = at / 2);
    let ft;
    for (ft = 0; ft < O; ++ft) {
      const Zt = parseInt(p.substr(ft * 2, 2), 16);
      if (on(Zt)) return ft;
      B[g + ft] = Zt;
    }
    return ft;
  }
  function ee(B, p, g, O) {
    return Ii(Ti(p, B.length - g), B, g, O);
  }
  function Yt(B, p, g, O) {
    return Ii(Di(p), B, g, O);
  }
  function Kt(B, p, g, O) {
    return Ii(kn(p), B, g, O);
  }
  function me(B, p, g, O) {
    return Ii(Kn(p, B.length - g), B, g, O);
  }
  v.prototype.write = function(p, g, O, K) {
    if (g === void 0)
      K = "utf8", O = this.length, g = 0;
    else if (O === void 0 && typeof g == "string")
      K = g, O = this.length, g = 0;
    else if (isFinite(g))
      g = g >>> 0, isFinite(O) ? (O = O >>> 0, K === void 0 && (K = "utf8")) : (K = O, O = void 0);
    else
      throw new Error(
        "Buffer.write(string, encoding, offset[, length]) is no longer supported"
      );
    const at = this.length - g;
    if ((O === void 0 || O > at) && (O = at), p.length > 0 && (O < 0 || g < 0) || g > this.length)
      throw new RangeError("Attempt to write outside buffer bounds");
    K || (K = "utf8");
    let ft = !1;
    for (; ; )
      switch (K) {
        case "hex":
          return re(this, p, g, O);
        case "utf8":
        case "utf-8":
          return ee(this, p, g, O);
        case "ascii":
        case "latin1":
        case "binary":
          return Yt(this, p, g, O);
        case "base64":
          return Kt(this, p, g, O);
        case "ucs2":
        case "ucs-2":
        case "utf16le":
        case "utf-16le":
          return me(this, p, g, O);
        default:
          if (ft) throw new TypeError("Unknown encoding: " + K);
          K = ("" + K).toLowerCase(), ft = !0;
      }
  }, v.prototype.toJSON = function() {
    return {
      type: "Buffer",
      data: Array.prototype.slice.call(this._arr || this, 0)
    };
  };
  function Ge(B, p, g) {
    return p === 0 && g === B.length ? l.fromByteArray(B) : l.fromByteArray(B.slice(p, g));
  }
  function be(B, p, g) {
    g = Math.min(B.length, g);
    const O = [];
    let K = p;
    for (; K < g; ) {
      const at = B[K];
      let ft = null, Zt = at > 239 ? 4 : at > 223 ? 3 : at > 191 ? 2 : 1;
      if (K + Zt <= g) {
        let de, _e, ce, fe;
        switch (Zt) {
          case 1:
            at < 128 && (ft = at);
            break;
          case 2:
            de = B[K + 1], (de & 192) === 128 && (fe = (at & 31) << 6 | de & 63, fe > 127 && (ft = fe));
            break;
          case 3:
            de = B[K + 1], _e = B[K + 2], (de & 192) === 128 && (_e & 192) === 128 && (fe = (at & 15) << 12 | (de & 63) << 6 | _e & 63, fe > 2047 && (fe < 55296 || fe > 57343) && (ft = fe));
            break;
          case 4:
            de = B[K + 1], _e = B[K + 2], ce = B[K + 3], (de & 192) === 128 && (_e & 192) === 128 && (ce & 192) === 128 && (fe = (at & 15) << 18 | (de & 63) << 12 | (_e & 63) << 6 | ce & 63, fe > 65535 && fe < 1114112 && (ft = fe));
        }
      }
      ft === null ? (ft = 65533, Zt = 1) : ft > 65535 && (ft -= 65536, O.push(ft >>> 10 & 1023 | 55296), ft = 56320 | ft & 1023), O.push(ft), K += Zt;
    }
    return zt(O);
  }
  const St = 4096;
  function zt(B) {
    const p = B.length;
    if (p <= St)
      return String.fromCharCode.apply(String, B);
    let g = "", O = 0;
    for (; O < p; )
      g += String.fromCharCode.apply(
        String,
        B.slice(O, O += St)
      );
    return g;
  }
  function le(B, p, g) {
    let O = "";
    g = Math.min(B.length, g);
    for (let K = p; K < g; ++K)
      O += String.fromCharCode(B[K] & 127);
    return O;
  }
  function pt(B, p, g) {
    let O = "";
    g = Math.min(B.length, g);
    for (let K = p; K < g; ++K)
      O += String.fromCharCode(B[K]);
    return O;
  }
  function bt(B, p, g) {
    const O = B.length;
    (!p || p < 0) && (p = 0), (!g || g < 0 || g > O) && (g = O);
    let K = "";
    for (let at = p; at < g; ++at)
      K += wr[B[at]];
    return K;
  }
  function mt(B, p, g) {
    const O = B.slice(p, g);
    let K = "";
    for (let at = 0; at < O.length - 1; at += 2)
      K += String.fromCharCode(O[at] + O[at + 1] * 256);
    return K;
  }
  v.prototype.slice = function(p, g) {
    const O = this.length;
    p = ~~p, g = g === void 0 ? O : ~~g, p < 0 ? (p += O, p < 0 && (p = 0)) : p > O && (p = O), g < 0 ? (g += O, g < 0 && (g = 0)) : g > O && (g = O), g < p && (g = p);
    const K = this.subarray(p, g);
    return Object.setPrototypeOf(K, v.prototype), K;
  };
  function _t(B, p, g) {
    if (B % 1 !== 0 || B < 0) throw new RangeError("offset is not uint");
    if (B + p > g) throw new RangeError("Trying to access beyond buffer length");
  }
  v.prototype.readUintLE = v.prototype.readUIntLE = function(p, g, O) {
    p = p >>> 0, g = g >>> 0, O || _t(p, g, this.length);
    let K = this[p], at = 1, ft = 0;
    for (; ++ft < g && (at *= 256); )
      K += this[p + ft] * at;
    return K;
  }, v.prototype.readUintBE = v.prototype.readUIntBE = function(p, g, O) {
    p = p >>> 0, g = g >>> 0, O || _t(p, g, this.length);
    let K = this[p + --g], at = 1;
    for (; g > 0 && (at *= 256); )
      K += this[p + --g] * at;
    return K;
  }, v.prototype.readUint8 = v.prototype.readUInt8 = function(p, g) {
    return p = p >>> 0, g || _t(p, 1, this.length), this[p];
  }, v.prototype.readUint16LE = v.prototype.readUInt16LE = function(p, g) {
    return p = p >>> 0, g || _t(p, 2, this.length), this[p] | this[p + 1] << 8;
  }, v.prototype.readUint16BE = v.prototype.readUInt16BE = function(p, g) {
    return p = p >>> 0, g || _t(p, 2, this.length), this[p] << 8 | this[p + 1];
  }, v.prototype.readUint32LE = v.prototype.readUInt32LE = function(p, g) {
    return p = p >>> 0, g || _t(p, 4, this.length), (this[p] | this[p + 1] << 8 | this[p + 2] << 16) + this[p + 3] * 16777216;
  }, v.prototype.readUint32BE = v.prototype.readUInt32BE = function(p, g) {
    return p = p >>> 0, g || _t(p, 4, this.length), this[p] * 16777216 + (this[p + 1] << 16 | this[p + 2] << 8 | this[p + 3]);
  }, v.prototype.readBigUInt64LE = hi(function(p) {
    p = p >>> 0, ui(p, "offset");
    const g = this[p], O = this[p + 7];
    (g === void 0 || O === void 0) && Ai(p, this.length - 8);
    const K = g + this[++p] * 2 ** 8 + this[++p] * 2 ** 16 + this[++p] * 2 ** 24, at = this[++p] + this[++p] * 2 ** 8 + this[++p] * 2 ** 16 + O * 2 ** 24;
    return BigInt(K) + (BigInt(at) << BigInt(32));
  }), v.prototype.readBigUInt64BE = hi(function(p) {
    p = p >>> 0, ui(p, "offset");
    const g = this[p], O = this[p + 7];
    (g === void 0 || O === void 0) && Ai(p, this.length - 8);
    const K = g * 2 ** 24 + this[++p] * 2 ** 16 + this[++p] * 2 ** 8 + this[++p], at = this[++p] * 2 ** 24 + this[++p] * 2 ** 16 + this[++p] * 2 ** 8 + O;
    return (BigInt(K) << BigInt(32)) + BigInt(at);
  }), v.prototype.readIntLE = function(p, g, O) {
    p = p >>> 0, g = g >>> 0, O || _t(p, g, this.length);
    let K = this[p], at = 1, ft = 0;
    for (; ++ft < g && (at *= 256); )
      K += this[p + ft] * at;
    return at *= 128, K >= at && (K -= Math.pow(2, 8 * g)), K;
  }, v.prototype.readIntBE = function(p, g, O) {
    p = p >>> 0, g = g >>> 0, O || _t(p, g, this.length);
    let K = g, at = 1, ft = this[p + --K];
    for (; K > 0 && (at *= 256); )
      ft += this[p + --K] * at;
    return at *= 128, ft >= at && (ft -= Math.pow(2, 8 * g)), ft;
  }, v.prototype.readInt8 = function(p, g) {
    return p = p >>> 0, g || _t(p, 1, this.length), this[p] & 128 ? (255 - this[p] + 1) * -1 : this[p];
  }, v.prototype.readInt16LE = function(p, g) {
    p = p >>> 0, g || _t(p, 2, this.length);
    const O = this[p] | this[p + 1] << 8;
    return O & 32768 ? O | 4294901760 : O;
  }, v.prototype.readInt16BE = function(p, g) {
    p = p >>> 0, g || _t(p, 2, this.length);
    const O = this[p + 1] | this[p] << 8;
    return O & 32768 ? O | 4294901760 : O;
  }, v.prototype.readInt32LE = function(p, g) {
    return p = p >>> 0, g || _t(p, 4, this.length), this[p] | this[p + 1] << 8 | this[p + 2] << 16 | this[p + 3] << 24;
  }, v.prototype.readInt32BE = function(p, g) {
    return p = p >>> 0, g || _t(p, 4, this.length), this[p] << 24 | this[p + 1] << 16 | this[p + 2] << 8 | this[p + 3];
  }, v.prototype.readBigInt64LE = hi(function(p) {
    p = p >>> 0, ui(p, "offset");
    const g = this[p], O = this[p + 7];
    (g === void 0 || O === void 0) && Ai(p, this.length - 8);
    const K = this[p + 4] + this[p + 5] * 2 ** 8 + this[p + 6] * 2 ** 16 + (O << 24);
    return (BigInt(K) << BigInt(32)) + BigInt(g + this[++p] * 2 ** 8 + this[++p] * 2 ** 16 + this[++p] * 2 ** 24);
  }), v.prototype.readBigInt64BE = hi(function(p) {
    p = p >>> 0, ui(p, "offset");
    const g = this[p], O = this[p + 7];
    (g === void 0 || O === void 0) && Ai(p, this.length - 8);
    const K = (g << 24) + // Overflow
    this[++p] * 2 ** 16 + this[++p] * 2 ** 8 + this[++p];
    return (BigInt(K) << BigInt(32)) + BigInt(this[++p] * 2 ** 24 + this[++p] * 2 ** 16 + this[++p] * 2 ** 8 + O);
  }), v.prototype.readFloatLE = function(p, g) {
    return p = p >>> 0, g || _t(p, 4, this.length), d.read(this, p, !0, 23, 4);
  }, v.prototype.readFloatBE = function(p, g) {
    return p = p >>> 0, g || _t(p, 4, this.length), d.read(this, p, !1, 23, 4);
  }, v.prototype.readDoubleLE = function(p, g) {
    return p = p >>> 0, g || _t(p, 8, this.length), d.read(this, p, !0, 52, 8);
  }, v.prototype.readDoubleBE = function(p, g) {
    return p = p >>> 0, g || _t(p, 8, this.length), d.read(this, p, !1, 52, 8);
  };
  function It(B, p, g, O, K, at) {
    if (!v.isBuffer(B)) throw new TypeError('"buffer" argument must be a Buffer instance');
    if (p > K || p < at) throw new RangeError('"value" argument is out of bounds');
    if (g + O > B.length) throw new RangeError("Index out of range");
  }
  v.prototype.writeUintLE = v.prototype.writeUIntLE = function(p, g, O, K) {
    if (p = +p, g = g >>> 0, O = O >>> 0, !K) {
      const Zt = Math.pow(2, 8 * O) - 1;
      It(this, p, g, O, Zt, 0);
    }
    let at = 1, ft = 0;
    for (this[g] = p & 255; ++ft < O && (at *= 256); )
      this[g + ft] = p / at & 255;
    return g + O;
  }, v.prototype.writeUintBE = v.prototype.writeUIntBE = function(p, g, O, K) {
    if (p = +p, g = g >>> 0, O = O >>> 0, !K) {
      const Zt = Math.pow(2, 8 * O) - 1;
      It(this, p, g, O, Zt, 0);
    }
    let at = O - 1, ft = 1;
    for (this[g + at] = p & 255; --at >= 0 && (ft *= 256); )
      this[g + at] = p / ft & 255;
    return g + O;
  }, v.prototype.writeUint8 = v.prototype.writeUInt8 = function(p, g, O) {
    return p = +p, g = g >>> 0, O || It(this, p, g, 1, 255, 0), this[g] = p & 255, g + 1;
  }, v.prototype.writeUint16LE = v.prototype.writeUInt16LE = function(p, g, O) {
    return p = +p, g = g >>> 0, O || It(this, p, g, 2, 65535, 0), this[g] = p & 255, this[g + 1] = p >>> 8, g + 2;
  }, v.prototype.writeUint16BE = v.prototype.writeUInt16BE = function(p, g, O) {
    return p = +p, g = g >>> 0, O || It(this, p, g, 2, 65535, 0), this[g] = p >>> 8, this[g + 1] = p & 255, g + 2;
  }, v.prototype.writeUint32LE = v.prototype.writeUInt32LE = function(p, g, O) {
    return p = +p, g = g >>> 0, O || It(this, p, g, 4, 4294967295, 0), this[g + 3] = p >>> 24, this[g + 2] = p >>> 16, this[g + 1] = p >>> 8, this[g] = p & 255, g + 4;
  }, v.prototype.writeUint32BE = v.prototype.writeUInt32BE = function(p, g, O) {
    return p = +p, g = g >>> 0, O || It(this, p, g, 4, 4294967295, 0), this[g] = p >>> 24, this[g + 1] = p >>> 16, this[g + 2] = p >>> 8, this[g + 3] = p & 255, g + 4;
  };
  function Tt(B, p, g, O, K) {
    Si(p, O, K, B, g, 7);
    let at = Number(p & BigInt(4294967295));
    B[g++] = at, at = at >> 8, B[g++] = at, at = at >> 8, B[g++] = at, at = at >> 8, B[g++] = at;
    let ft = Number(p >> BigInt(32) & BigInt(4294967295));
    return B[g++] = ft, ft = ft >> 8, B[g++] = ft, ft = ft >> 8, B[g++] = ft, ft = ft >> 8, B[g++] = ft, g;
  }
  function Qt(B, p, g, O, K) {
    Si(p, O, K, B, g, 7);
    let at = Number(p & BigInt(4294967295));
    B[g + 7] = at, at = at >> 8, B[g + 6] = at, at = at >> 8, B[g + 5] = at, at = at >> 8, B[g + 4] = at;
    let ft = Number(p >> BigInt(32) & BigInt(4294967295));
    return B[g + 3] = ft, ft = ft >> 8, B[g + 2] = ft, ft = ft >> 8, B[g + 1] = ft, ft = ft >> 8, B[g] = ft, g + 8;
  }
  v.prototype.writeBigUInt64LE = hi(function(p, g = 0) {
    return Tt(this, p, g, BigInt(0), BigInt("0xffffffffffffffff"));
  }), v.prototype.writeBigUInt64BE = hi(function(p, g = 0) {
    return Qt(this, p, g, BigInt(0), BigInt("0xffffffffffffffff"));
  }), v.prototype.writeIntLE = function(p, g, O, K) {
    if (p = +p, g = g >>> 0, !K) {
      const de = Math.pow(2, 8 * O - 1);
      It(this, p, g, O, de - 1, -de);
    }
    let at = 0, ft = 1, Zt = 0;
    for (this[g] = p & 255; ++at < O && (ft *= 256); )
      p < 0 && Zt === 0 && this[g + at - 1] !== 0 && (Zt = 1), this[g + at] = (p / ft >> 0) - Zt & 255;
    return g + O;
  }, v.prototype.writeIntBE = function(p, g, O, K) {
    if (p = +p, g = g >>> 0, !K) {
      const de = Math.pow(2, 8 * O - 1);
      It(this, p, g, O, de - 1, -de);
    }
    let at = O - 1, ft = 1, Zt = 0;
    for (this[g + at] = p & 255; --at >= 0 && (ft *= 256); )
      p < 0 && Zt === 0 && this[g + at + 1] !== 0 && (Zt = 1), this[g + at] = (p / ft >> 0) - Zt & 255;
    return g + O;
  }, v.prototype.writeInt8 = function(p, g, O) {
    return p = +p, g = g >>> 0, O || It(this, p, g, 1, 127, -128), p < 0 && (p = 255 + p + 1), this[g] = p & 255, g + 1;
  }, v.prototype.writeInt16LE = function(p, g, O) {
    return p = +p, g = g >>> 0, O || It(this, p, g, 2, 32767, -32768), this[g] = p & 255, this[g + 1] = p >>> 8, g + 2;
  }, v.prototype.writeInt16BE = function(p, g, O) {
    return p = +p, g = g >>> 0, O || It(this, p, g, 2, 32767, -32768), this[g] = p >>> 8, this[g + 1] = p & 255, g + 2;
  }, v.prototype.writeInt32LE = function(p, g, O) {
    return p = +p, g = g >>> 0, O || It(this, p, g, 4, 2147483647, -2147483648), this[g] = p & 255, this[g + 1] = p >>> 8, this[g + 2] = p >>> 16, this[g + 3] = p >>> 24, g + 4;
  }, v.prototype.writeInt32BE = function(p, g, O) {
    return p = +p, g = g >>> 0, O || It(this, p, g, 4, 2147483647, -2147483648), p < 0 && (p = 4294967295 + p + 1), this[g] = p >>> 24, this[g + 1] = p >>> 16, this[g + 2] = p >>> 8, this[g + 3] = p & 255, g + 4;
  }, v.prototype.writeBigInt64LE = hi(function(p, g = 0) {
    return Tt(this, p, g, -BigInt("0x8000000000000000"), BigInt("0x7fffffffffffffff"));
  }), v.prototype.writeBigInt64BE = hi(function(p, g = 0) {
    return Qt(this, p, g, -BigInt("0x8000000000000000"), BigInt("0x7fffffffffffffff"));
  });
  function jt(B, p, g, O, K, at) {
    if (g + O > B.length) throw new RangeError("Index out of range");
    if (g < 0) throw new RangeError("Index out of range");
  }
  function Gt(B, p, g, O, K) {
    return p = +p, g = g >>> 0, K || jt(B, p, g, 4), d.write(B, p, g, O, 23, 4), g + 4;
  }
  v.prototype.writeFloatLE = function(p, g, O) {
    return Gt(this, p, g, !0, O);
  }, v.prototype.writeFloatBE = function(p, g, O) {
    return Gt(this, p, g, !1, O);
  };
  function Ce(B, p, g, O, K) {
    return p = +p, g = g >>> 0, K || jt(B, p, g, 8), d.write(B, p, g, O, 52, 8), g + 8;
  }
  v.prototype.writeDoubleLE = function(p, g, O) {
    return Ce(this, p, g, !0, O);
  }, v.prototype.writeDoubleBE = function(p, g, O) {
    return Ce(this, p, g, !1, O);
  }, v.prototype.copy = function(p, g, O, K) {
    if (!v.isBuffer(p)) throw new TypeError("argument should be a Buffer");
    if (O || (O = 0), !K && K !== 0 && (K = this.length), g >= p.length && (g = p.length), g || (g = 0), K > 0 && K < O && (K = O), K === O || p.length === 0 || this.length === 0) return 0;
    if (g < 0)
      throw new RangeError("targetStart out of bounds");
    if (O < 0 || O >= this.length) throw new RangeError("Index out of range");
    if (K < 0) throw new RangeError("sourceEnd out of bounds");
    K > this.length && (K = this.length), p.length - g < K - O && (K = p.length - g + O);
    const at = K - O;
    return this === p && typeof Uint8Array.prototype.copyWithin == "function" ? this.copyWithin(g, O, K) : Uint8Array.prototype.set.call(
      p,
      this.subarray(O, K),
      g
    ), at;
  }, v.prototype.fill = function(p, g, O, K) {
    if (typeof p == "string") {
      if (typeof g == "string" ? (K = g, g = 0, O = this.length) : typeof O == "string" && (K = O, O = this.length), K !== void 0 && typeof K != "string")
        throw new TypeError("encoding must be a string");
      if (typeof K == "string" && !v.isEncoding(K))
        throw new TypeError("Unknown encoding: " + K);
      if (p.length === 1) {
        const ft = p.charCodeAt(0);
        (K === "utf8" && ft < 128 || K === "latin1") && (p = ft);
      }
    } else typeof p == "number" ? p = p & 255 : typeof p == "boolean" && (p = Number(p));
    if (g < 0 || this.length < g || this.length < O)
      throw new RangeError("Out of range index");
    if (O <= g)
      return this;
    g = g >>> 0, O = O === void 0 ? this.length : O >>> 0, p || (p = 0);
    let at;
    if (typeof p == "number")
      for (at = g; at < O; ++at)
        this[at] = p;
    else {
      const ft = v.isBuffer(p) ? p : v.from(p, K), Zt = ft.length;
      if (Zt === 0)
        throw new TypeError('The value "' + p + '" is invalid for argument "value"');
      for (at = 0; at < O - g; ++at)
        this[at + g] = ft[at % Zt];
    }
    return this;
  };
  const xe = {};
  function Li(B, p, g) {
    xe[B] = class extends g {
      constructor() {
        super(), Object.defineProperty(this, "message", {
          value: p.apply(this, arguments),
          writable: !0,
          configurable: !0
        }), this.name = `${this.name} [${B}]`, this.stack, delete this.name;
      }
      get code() {
        return B;
      }
      set code(K) {
        Object.defineProperty(this, "code", {
          configurable: !0,
          enumerable: !0,
          value: K,
          writable: !0
        });
      }
      toString() {
        return `${this.name} [${B}]: ${this.message}`;
      }
    };
  }
  Li(
    "ERR_BUFFER_OUT_OF_BOUNDS",
    function(B) {
      return B ? `${B} is outside of buffer bounds` : "Attempt to access memory outside buffer bounds";
    },
    RangeError
  ), Li(
    "ERR_INVALID_ARG_TYPE",
    function(B, p) {
      return `The "${B}" argument must be of type number. Received type ${typeof p}`;
    },
    TypeError
  ), Li(
    "ERR_OUT_OF_RANGE",
    function(B, p, g) {
      let O = `The value of "${B}" is out of range.`, K = g;
      return Number.isInteger(g) && Math.abs(g) > 2 ** 32 ? K = sn(String(g)) : typeof g == "bigint" && (K = String(g), (g > BigInt(2) ** BigInt(32) || g < -(BigInt(2) ** BigInt(32))) && (K = sn(K)), K += "n"), O += ` It must be ${p}. Received ${K}`, O;
    },
    RangeError
  );
  function sn(B) {
    let p = "", g = B.length;
    const O = B[0] === "-" ? 1 : 0;
    for (; g >= O + 4; g -= 3)
      p = `_${B.slice(g - 3, g)}${p}`;
    return `${B.slice(0, g)}${p}`;
  }
  function Cn(B, p, g) {
    ui(p, "offset"), (B[p] === void 0 || B[p + g] === void 0) && Ai(p, B.length - (g + 1));
  }
  function Si(B, p, g, O, K, at) {
    if (B > g || B < p) {
      const ft = typeof p == "bigint" ? "n" : "";
      let Zt;
      throw p === 0 || p === BigInt(0) ? Zt = `>= 0${ft} and < 2${ft} ** ${(at + 1) * 8}${ft}` : Zt = `>= -(2${ft} ** ${(at + 1) * 8 - 1}${ft}) and < 2 ** ${(at + 1) * 8 - 1}${ft}`, new xe.ERR_OUT_OF_RANGE("value", Zt, B);
    }
    Cn(O, K, at);
  }
  function ui(B, p) {
    if (typeof B != "number")
      throw new xe.ERR_INVALID_ARG_TYPE(p, "number", B);
  }
  function Ai(B, p, g) {
    throw Math.floor(B) !== B ? (ui(B, g), new xe.ERR_OUT_OF_RANGE("offset", "an integer", B)) : p < 0 ? new xe.ERR_BUFFER_OUT_OF_BOUNDS() : new xe.ERR_OUT_OF_RANGE(
      "offset",
      `>= 0 and <= ${p}`,
      B
    );
  }
  const qn = /[^+/0-9A-Za-z-_]/g;
  function Hn(B) {
    if (B = B.split("=")[0], B = B.trim().replace(qn, ""), B.length < 2) return "";
    for (; B.length % 4 !== 0; )
      B = B + "=";
    return B;
  }
  function Ti(B, p) {
    p = p || 1 / 0;
    let g;
    const O = B.length;
    let K = null;
    const at = [];
    for (let ft = 0; ft < O; ++ft) {
      if (g = B.charCodeAt(ft), g > 55295 && g < 57344) {
        if (!K) {
          if (g > 56319) {
            (p -= 3) > -1 && at.push(239, 191, 189);
            continue;
          } else if (ft + 1 === O) {
            (p -= 3) > -1 && at.push(239, 191, 189);
            continue;
          }
          K = g;
          continue;
        }
        if (g < 56320) {
          (p -= 3) > -1 && at.push(239, 191, 189), K = g;
          continue;
        }
        g = (K - 55296 << 10 | g - 56320) + 65536;
      } else K && (p -= 3) > -1 && at.push(239, 191, 189);
      if (K = null, g < 128) {
        if ((p -= 1) < 0) break;
        at.push(g);
      } else if (g < 2048) {
        if ((p -= 2) < 0) break;
        at.push(
          g >> 6 | 192,
          g & 63 | 128
        );
      } else if (g < 65536) {
        if ((p -= 3) < 0) break;
        at.push(
          g >> 12 | 224,
          g >> 6 & 63 | 128,
          g & 63 | 128
        );
      } else if (g < 1114112) {
        if ((p -= 4) < 0) break;
        at.push(
          g >> 18 | 240,
          g >> 12 & 63 | 128,
          g >> 6 & 63 | 128,
          g & 63 | 128
        );
      } else
        throw new Error("Invalid code point");
    }
    return at;
  }
  function Di(B) {
    const p = [];
    for (let g = 0; g < B.length; ++g)
      p.push(B.charCodeAt(g) & 255);
    return p;
  }
  function Kn(B, p) {
    let g, O, K;
    const at = [];
    for (let ft = 0; ft < B.length && !((p -= 2) < 0); ++ft)
      g = B.charCodeAt(ft), O = g >> 8, K = g % 256, at.push(K), at.push(O);
    return at;
  }
  function kn(B) {
    return l.toByteArray(Hn(B));
  }
  function Ii(B, p, g, O) {
    let K;
    for (K = 0; K < O && !(K + g >= p.length || K >= B.length); ++K)
      p[K + g] = B[K];
    return K;
  }
  function Je(B, p) {
    return B instanceof p || B != null && B.constructor != null && B.constructor.name != null && B.constructor.name === p.name;
  }
  function on(B) {
    return B !== B;
  }
  const wr = function() {
    const B = "0123456789abcdef", p = new Array(256);
    for (let g = 0; g < 16; ++g) {
      const O = g * 16;
      for (let K = 0; K < 16; ++K)
        p[O + K] = B[g] + B[K];
    }
    return p;
  }();
  function hi(B) {
    return typeof BigInt > "u" ? En : B;
  }
  function En() {
    throw new Error("BigInt not supported");
  }
})(Fl);
const ha = "http://www.w3.org/1999/02/22-rdf-syntax-ns#", ca = "http://www.w3.org/2001/XMLSchema#", Bs = "http://www.w3.org/2000/10/swap/", Bi = {
  xsd: {
    decimal: `${ca}decimal`,
    boolean: `${ca}boolean`,
    double: `${ca}double`,
    integer: `${ca}integer`,
    string: `${ca}string`
  },
  rdf: {
    type: `${ha}type`,
    nil: `${ha}nil`,
    first: `${ha}first`,
    rest: `${ha}rest`,
    langString: `${ha}langString`
  },
  owl: {
    sameAs: "http://www.w3.org/2002/07/owl#sameAs"
  },
  r: {
    forSome: `${Bs}reify#forSome`,
    forAll: `${Bs}reify#forAll`
  },
  log: {
    implies: `${Bs}log#implies`,
    isImpliedBy: `${Bs}log#isImpliedBy`
  }
}, { xsd: Ps } = Bi, Cf = /\\u([a-fA-F0-9]{4})|\\U([a-fA-F0-9]{8})|\\([^])/g, _l = {
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
}, kf = /[\x00-\x20<>\\"\{\}\|\^\`]/, Ef = {
  _iri: !0,
  _unescapedIri: !0,
  _simpleQuotedString: !0,
  _langcode: !0,
  _blank: !0,
  _newline: !0,
  _comment: !0,
  _whitespace: !0,
  _endOfFile: !0
}, Mf = /$0^/;
class Bf {
  constructor(l) {
    if (this._iri = /^<((?:[^ <>{}\\]|\\[uU])+)>[ \t]*/, this._unescapedIri = /^<([^\x00-\x20<>\\"\{\}\|\^\`]*)>[ \t]*/, this._simpleQuotedString = /^"([^"\\\r\n]*)"(?=[^"])/, this._simpleApostropheString = /^'([^'\\\r\n]*)'(?=[^'])/, this._langcode = /^@([a-z]+(?:-[a-z0-9]+)*)(?=[^a-z0-9\-])/i, this._prefix = /^((?:[A-Za-z\xc0-\xd6\xd8-\xf6\xf8-\u02ff\u0370-\u037d\u037f-\u1fff\u200c\u200d\u2070-\u218f\u2c00-\u2fef\u3001-\ud7ff\uf900-\ufdcf\ufdf0-\ufffd]|[\ud800-\udb7f][\udc00-\udfff])(?:\.?[\-0-9A-Z_a-z\xb7\xc0-\xd6\xd8-\xf6\xf8-\u037d\u037f-\u1fff\u200c\u200d\u203f\u2040\u2070-\u218f\u2c00-\u2fef\u3001-\ud7ff\uf900-\ufdcf\ufdf0-\ufffd]|[\ud800-\udb7f][\udc00-\udfff])*)?:(?=[#\s<])/, this._prefixed = /^((?:[A-Za-z\xc0-\xd6\xd8-\xf6\xf8-\u02ff\u0370-\u037d\u037f-\u1fff\u200c\u200d\u2070-\u218f\u2c00-\u2fef\u3001-\ud7ff\uf900-\ufdcf\ufdf0-\ufffd]|[\ud800-\udb7f][\udc00-\udfff])(?:\.?[\-0-9A-Z_a-z\xb7\xc0-\xd6\xd8-\xf6\xf8-\u037d\u037f-\u1fff\u200c\u200d\u203f\u2040\u2070-\u218f\u2c00-\u2fef\u3001-\ud7ff\uf900-\ufdcf\ufdf0-\ufffd]|[\ud800-\udb7f][\udc00-\udfff])*)?:((?:(?:[0-:A-Z_a-z\xc0-\xd6\xd8-\xf6\xf8-\u02ff\u0370-\u037d\u037f-\u1fff\u200c\u200d\u2070-\u218f\u2c00-\u2fef\u3001-\ud7ff\uf900-\ufdcf\ufdf0-\ufffd]|[\ud800-\udb7f][\udc00-\udfff]|%[0-9a-fA-F]{2}|\\[!#-\/;=?\-@_~])(?:(?:[\.\-0-:A-Z_a-z\xb7\xc0-\xd6\xd8-\xf6\xf8-\u037d\u037f-\u1fff\u200c\u200d\u203f\u2040\u2070-\u218f\u2c00-\u2fef\u3001-\ud7ff\uf900-\ufdcf\ufdf0-\ufffd]|[\ud800-\udb7f][\udc00-\udfff]|%[0-9a-fA-F]{2}|\\[!#-\/;=?\-@_~])*(?:[\-0-:A-Z_a-z\xb7\xc0-\xd6\xd8-\xf6\xf8-\u037d\u037f-\u1fff\u200c\u200d\u203f\u2040\u2070-\u218f\u2c00-\u2fef\u3001-\ud7ff\uf900-\ufdcf\ufdf0-\ufffd]|[\ud800-\udb7f][\udc00-\udfff]|%[0-9a-fA-F]{2}|\\[!#-\/;=?\-@_~]))?)?)(?:[ \t]+|(?=\.?[,;!\^\s#()\[\]\{\}"'<>]))/, this._variable = /^\?(?:(?:[A-Z_a-z\xc0-\xd6\xd8-\xf6\xf8-\u02ff\u0370-\u037d\u037f-\u1fff\u200c\u200d\u2070-\u218f\u2c00-\u2fef\u3001-\ud7ff\uf900-\ufdcf\ufdf0-\ufffd]|[\ud800-\udb7f][\udc00-\udfff])(?:[\-0-:A-Z_a-z\xb7\xc0-\xd6\xd8-\xf6\xf8-\u037d\u037f-\u1fff\u200c\u200d\u203f\u2040\u2070-\u218f\u2c00-\u2fef\u3001-\ud7ff\uf900-\ufdcf\ufdf0-\ufffd]|[\ud800-\udb7f][\udc00-\udfff])*)(?=[.,;!\^\s#()\[\]\{\}"'<>])/, this._blank = /^_:((?:[0-9A-Z_a-z\xc0-\xd6\xd8-\xf6\xf8-\u02ff\u0370-\u037d\u037f-\u1fff\u200c\u200d\u2070-\u218f\u2c00-\u2fef\u3001-\ud7ff\uf900-\ufdcf\ufdf0-\ufffd]|[\ud800-\udb7f][\udc00-\udfff])(?:\.?[\-0-9A-Z_a-z\xb7\xc0-\xd6\xd8-\xf6\xf8-\u037d\u037f-\u1fff\u200c\u200d\u203f\u2040\u2070-\u218f\u2c00-\u2fef\u3001-\ud7ff\uf900-\ufdcf\ufdf0-\ufffd]|[\ud800-\udb7f][\udc00-\udfff])*)(?:[ \t]+|(?=\.?[,;:\s#()\[\]\{\}"'<>]))/, this._number = /^[\-+]?(?:(\d+\.\d*|\.?\d+)[eE][\-+]?|\d*(\.)?)\d+(?=\.?[,;:\s#()\[\]\{\}"'<>])/, this._boolean = /^(?:true|false)(?=[.,;\s#()\[\]\{\}"'<>])/, this._keyword = /^@[a-z]+(?=[\s#<:])/i, this._sparqlKeyword = /^(?:PREFIX|BASE|GRAPH)(?=[\s#<])/i, this._shortPredicates = /^a(?=[\s#()\[\]\{\}"'<>])/, this._newline = /^[ \t]*(?:#[^\n\r]*)?(?:\r\n|\n|\r)[ \t]*/, this._comment = /#([^\n\r]*)/, this._whitespace = /^[ \t]+/, this._endOfFile = /^(?:#[^\n\r]*)?$/, l = l || {}, this._isImpliedBy = l.isImpliedBy, this._lineMode = !!l.lineMode) {
      this._n3Mode = !1;
      for (const d in this)
        !(d in Ef) && this[d] instanceof RegExp && (this[d] = Mf);
    } else
      this._n3Mode = l.n3 !== !1;
    this.comments = !!l.comments, this._literalClosingPos = 0;
  }
  // ## Private methods
  // ### `_tokenizeToEnd` tokenizes as for as possible, emitting tokens through the callback
  _tokenizeToEnd(l, d) {
    let y = this._input, k = y.length;
    for (; ; ) {
      let v, x;
      for (; v = this._newline.exec(y); )
        this.comments && (x = this._comment.exec(v[0])) && I("comment", x[1], "", this._line, v[0].length), y = y.substr(v[0].length, y.length), k = y.length, this._line++;
      if (!v && (v = this._whitespace.exec(y)) && (y = y.substr(v[0].length, y.length)), this._endOfFile.test(y))
        return d && (this.comments && (x = this._comment.exec(y)) && I("comment", x[1], "", this._line, y.length), y = null, I("eof", "", "", this._line, 0)), this._input = y;
      const R = this._line, U = y[0];
      let A = "", j = "", N = "", J = null, X = 0, dt = !1;
      switch (U) {
        case "^":
          if (y.length < 3)
            break;
          if (y[1] === "^") {
            if (this._previousMarker = "^^", y = y.substr(2), y[0] !== "<") {
              dt = !0;
              break;
            }
          } else {
            this._n3Mode && (X = 1, A = "^");
            break;
          }
        case "<":
          if (J = this._unescapedIri.exec(y))
            A = "IRI", j = J[1];
          else if (J = this._iri.exec(y)) {
            if (j = this._unescape(J[1]), j === null || kf.test(j))
              return w(this);
            A = "IRI";
          } else y.length > 1 && y[1] === "<" ? (A = "<<", X = 2) : this._n3Mode && y.length > 1 && y[1] === "=" && (X = 2, this._isImpliedBy ? (A = "abbreviation", j = "<") : (A = "inverse", j = ">"));
          break;
        case ">":
          y.length > 1 && y[1] === ">" && (A = ">>", X = 2);
          break;
        case "_":
          ((J = this._blank.exec(y)) || d && (J = this._blank.exec(`${y} `))) && (A = "blank", N = "_", j = J[1]);
          break;
        case '"':
          if (J = this._simpleQuotedString.exec(y))
            j = J[1];
          else if ({ value: j, matchLength: X } = this._parseLiteral(y), j === null)
            return w(this);
          (J !== null || X !== 0) && (A = "literal", this._literalClosingPos = 0);
          break;
        case "'":
          if (!this._lineMode) {
            if (J = this._simpleApostropheString.exec(y))
              j = J[1];
            else if ({ value: j, matchLength: X } = this._parseLiteral(y), j === null)
              return w(this);
            (J !== null || X !== 0) && (A = "literal", this._literalClosingPos = 0);
          }
          break;
        case "?":
          this._n3Mode && (J = this._variable.exec(y)) && (A = "var", j = J[0]);
          break;
        case "@":
          this._previousMarker === "literal" && (J = this._langcode.exec(y)) ? (A = "langcode", j = J[1]) : (J = this._keyword.exec(y)) && (A = J[0]);
          break;
        case ".":
          if (y.length === 1 ? d : y[1] < "0" || y[1] > "9") {
            A = ".", X = 1;
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
          (J = this._number.exec(y) || d && (J = this._number.exec(`${y} `))) && (A = "literal", j = J[0], N = typeof J[1] == "string" ? Ps.double : typeof J[2] == "string" ? Ps.decimal : Ps.integer);
          break;
        case "B":
        case "b":
        case "p":
        case "P":
        case "G":
        case "g":
          (J = this._sparqlKeyword.exec(y)) ? A = J[0].toUpperCase() : dt = !0;
          break;
        case "f":
        case "t":
          (J = this._boolean.exec(y)) ? (A = "literal", j = J[0], N = Ps.boolean) : dt = !0;
          break;
        case "a":
          (J = this._shortPredicates.exec(y)) ? (A = "abbreviation", j = "a") : dt = !0;
          break;
        case "=":
          this._n3Mode && y.length > 1 && (A = "abbreviation", y[1] !== ">" ? (X = 1, j = "=") : (X = 2, j = ">"));
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
          this._lineMode || (X = 1, A = U);
          break;
        case "{":
          !this._lineMode && y.length >= 2 && (y[1] === "|" ? (A = "{|", X = 2) : (A = U, X = 1));
          break;
        case "|":
          y.length >= 2 && y[1] === "}" && (A = "|}", X = 2);
          break;
        default:
          dt = !0;
      }
      if (dt && ((this._previousMarker === "@prefix" || this._previousMarker === "PREFIX") && (J = this._prefix.exec(y)) ? (A = "prefix", j = J[1] || "") : ((J = this._prefixed.exec(y)) || d && (J = this._prefixed.exec(`${y} `))) && (A = "prefixed", N = J[1] || "", j = this._unescape(J[2]))), this._previousMarker === "^^")
        switch (A) {
          case "prefixed":
            A = "type";
            break;
          case "IRI":
            A = "typeIRI";
            break;
          default:
            A = "";
        }
      if (!A)
        return d || !/^'''|^"""/.test(y) && /\n|\r/.test(y) ? w(this) : this._input = y;
      const Q = X || J[0].length, Et = I(A, j, N, R, Q);
      this.previousToken = Et, this._previousMarker = A, y = y.substr(Q, y.length);
    }
    function I(v, x, R, U, A) {
      const j = y ? k - y.length : k, N = j + A, J = { type: v, value: x, prefix: R, line: U, start: j, end: N };
      return l(null, J), J;
    }
    function w(v) {
      l(v._syntaxError(/^\S*/.exec(y)[0]));
    }
  }
  // ### `_unescape` replaces N3 escape codes by their corresponding characters
  _unescape(l) {
    let d = !1;
    const y = l.replace(Cf, (k, I, w, v) => {
      if (typeof I == "string")
        return String.fromCharCode(Number.parseInt(I, 16));
      if (typeof w == "string") {
        let x = Number.parseInt(w, 16);
        return x <= 65535 ? String.fromCharCode(Number.parseInt(w, 16)) : String.fromCharCode(55296 + ((x -= 65536) >> 10), 56320 + (x & 1023));
      }
      return v in _l ? _l[v] : (d = !0, "");
    });
    return d ? null : y;
  }
  // ### `_parseLiteral` parses a literal into an unescaped value
  _parseLiteral(l) {
    if (l.length >= 3) {
      const d = l.match(/^(?:"""|"|'''|'|)/)[0], y = d.length;
      let k = Math.max(this._literalClosingPos, y);
      for (; (k = l.indexOf(d, k)) > 0; ) {
        let I = 0;
        for (; l[k - I - 1] === "\\"; )
          I++;
        if (I % 2 === 0) {
          const w = l.substring(y, k), v = w.split(/\r\n|\r|\n/).length - 1, x = k + y;
          if (y === 1 && v !== 0 || y === 3 && this._lineMode)
            break;
          return this._line += v, { value: this._unescape(w), matchLength: x };
        }
        k++;
      }
      this._literalClosingPos = l.length - y + 1;
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
        const y = [];
        let k;
        if (this._tokenizeToEnd((I, w) => I ? k = I : y.push(w), !0), k) throw k;
        return y;
      }
    else
      this._pendingBuffer = null, typeof l.setEncoding == "function" && l.setEncoding("utf8"), l.on("data", (y) => {
        this._input !== null && y.length !== 0 && (this._pendingBuffer && (y = Fl.Buffer.concat([this._pendingBuffer, y]), this._pendingBuffer = null), y[y.length - 1] & 128 ? this._pendingBuffer = y : (typeof this._input > "u" ? this._input = this._readStartingBom(typeof y == "string" ? y : y.toString()) : this._input += y, this._tokenizeToEnd(d, !1)));
      }), l.on("end", () => {
        typeof this._input == "string" && this._tokenizeToEnd(d, !0);
      }), l.on("error", d);
  }
}
const { rdf: Pf, xsd: vr } = Bi;
let ka, Sf = 0;
const Af = {
  namedNode: jl,
  blankNode: $l,
  variable: Vl,
  literal: Ul,
  defaultGraph: Of,
  quad: Ro,
  triple: Ro,
  fromTerm: ya,
  fromQuad: Gl
};
class an {
  constructor(l) {
    this.id = l;
  }
  // ### The value of this term
  get value() {
    return this.id;
  }
  // ### Returns whether this object represents the same term as the other
  equals(l) {
    return l instanceof an ? this.id === l.id : !!l && this.termType === l.termType && this.value === l.value;
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
class Nl extends an {
  // ### The term type of this term
  get termType() {
    return "NamedNode";
  }
}
class va extends an {
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
    return new Nl(this.datatypeString);
  }
  // ### The datatype string of this literal
  get datatypeString() {
    const l = this.id, d = l.lastIndexOf('"') + 1, y = d < l.length ? l[d] : "";
    return y === "^" ? l.substr(d + 2) : (
      // If "@" follows, return rdf:langString; xsd:string otherwise
      y !== "@" ? vr.string : Pf.langString
    );
  }
  // ### Returns whether this object represents the same term as the other
  equals(l) {
    return l instanceof va ? this.id === l.id : !!l && !!l.datatype && this.termType === l.termType && this.value === l.value && this.language === l.language && this.datatype.value === l.datatype.value;
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
class Tf extends an {
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
class Df extends an {
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
class If extends an {
  constructor() {
    return super(""), ka || this;
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
ka = new If();
class zl extends an {
  constructor(l, d, y, k) {
    super(""), this._subject = l, this._predicate = d, this._object = y, this._graph = k || ka;
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
function jl(h) {
  return new Nl(h);
}
function $l(h) {
  return new Tf(h || `n3-${Sf++}`);
}
function Ul(h, l) {
  if (typeof l == "string")
    return new va(`"${h}"@${l.toLowerCase()}`);
  let d = l ? l.value : "";
  return d === "" && (typeof h == "boolean" ? d = vr.boolean : typeof h == "number" && (Number.isFinite(h) ? d = Number.isInteger(h) ? vr.integer : vr.double : (d = vr.double, Number.isNaN(h) || (h = h > 0 ? "INF" : "-INF")))), d === "" || d === vr.string ? new va(`"${h}"`) : new va(`"${h}"^^${d}`);
}
function Vl(h) {
  return new Df(h);
}
function Of() {
  return ka;
}
function Ro(h, l, d, y) {
  return new zl(h, l, d, y);
}
function ya(h) {
  if (h instanceof an)
    return h;
  switch (h.termType) {
    case "NamedNode":
      return jl(h.value);
    case "BlankNode":
      return $l(h.value);
    case "Variable":
      return Vl(h.value);
    case "DefaultGraph":
      return ka;
    case "Literal":
      return Ul(h.value, h.language || h.datatype);
    case "Quad":
      return Gl(h);
    default:
      throw new Error(`Unexpected termType: ${h.termType}`);
  }
}
function Gl(h) {
  if (h instanceof zl)
    return h;
  if (h.termType !== "Quad")
    throw new Error(`Unexpected termType: ${h.termType}`);
  return Ro(ya(h.subject), ya(h.predicate), ya(h.object), ya(h.graph));
}
let ml = 0;
class Zo {
  constructor(l) {
    this._contextStack = [], this._graph = null, l = l || {}, this._setBase(l.baseIRI), l.factory && Zl(this, l.factory);
    const d = typeof l.format == "string" ? l.format.match(/\w*$/)[0].toLowerCase() : "", y = /turtle/.test(d), k = /trig/.test(d), I = /triple/.test(d), w = /quad/.test(d), v = this._n3Mode = /n3/.test(d), x = I || w;
    (this._supportsNamedGraphs = !(y || v)) || (this._readPredicateOrNamedGraph = this._readPredicate), this._supportsQuads = !(y || k || I || v), this._isImpliedBy = l.isImpliedBy, this._supportsRDFStar = d === "" || /star|\*$/.test(d), x && (this._resolveRelativeIRI = (R) => null), this._blankNodePrefix = typeof l.blankNodePrefix != "string" ? "" : l.blankNodePrefix.replace(/^(?!_:)/, "_:"), this._lexer = l.lexer || new Bf({ lineMode: x, n3: v, isImpliedBy: this._isImpliedBy }), this._explicitQuantifiers = !!l.explicitQuantifiers;
  }
  // ## Static class methods
  // ### `_resetBlankNodePrefix` restarts blank node prefix identification
  static _resetBlankNodePrefix() {
    ml = 0;
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
  _saveContext(l, d, y, k, I) {
    const w = this._n3Mode;
    this._contextStack.push({
      type: l,
      subject: y,
      predicate: k,
      object: I,
      graph: d,
      inverse: w ? this._inversePredicate : !1,
      blankPrefix: w ? this._prefixes._ : "",
      quantified: w ? this._quantified : null
    }), w && (this._inversePredicate = !1, this._prefixes._ = this._graph ? `${this._graph.value}.` : ".", this._quantified = Object.create(this._quantified));
  }
  // ### `_restoreContext` restores the parent context
  // when leaving a scope (list, blank node, formula)
  _restoreContext(l, d) {
    const y = this._contextStack.pop();
    if (!y || y.type !== l)
      return this._error(`Unexpected ${d.type}`, d);
    this._subject = y.subject, this._predicate = y.predicate, this._object = y.object, this._graph = y.graph, this._n3Mode && (this._inversePredicate = y.inverse, this._prefixes._ = y.blankPrefix, this._quantified = y.quantified);
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
    let y;
    switch (l.type) {
      case "IRI":
      case "typeIRI":
        const k = this._resolveIRI(l.value);
        if (k === null)
          return this._error("Invalid IRI", l);
        y = this._factory.namedNode(k);
        break;
      case "type":
      case "prefixed":
        const I = this._prefixes[l.prefix];
        if (I === void 0)
          return this._error(`Undefined prefix "${l.prefix}:"`, l);
        y = this._factory.namedNode(I + l.value);
        break;
      case "blank":
        y = this._factory.blankNode(this._prefixes[l.prefix] + l.value);
        break;
      case "var":
        y = this._factory.variable(l.value.substr(1));
        break;
      default:
        return this._error(`Expected entity but got ${l.type}`, l);
    }
    return !d && this._n3Mode && y.id in this._quantified && (y = this._quantified[y.id]), y;
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
    let d = null, y = null, k = this._readListItem;
    const I = this._subject, w = this._contextStack, v = w[w.length - 1];
    switch (l.type) {
      case "[":
        this._saveContext(
          "blank",
          this._graph,
          y = this._factory.blankNode(),
          this.RDF_FIRST,
          this._subject = d = this._factory.blankNode()
        ), k = this._readBlankNodeHead;
        break;
      case "(":
        this._saveContext(
          "list",
          this._graph,
          y = this._factory.blankNode(),
          this.RDF_FIRST,
          this.RDF_NIL
        ), this._subject = null;
        break;
      case ")":
        if (this._restoreContext("list", l), w.length !== 0 && w[w.length - 1].type === "list" && this._emit(this._subject, this._predicate, this._object, this._graph), this._predicate === null) {
          if (k = this._readPredicate, this._subject === this.RDF_NIL)
            return k;
        } else if (k = this._getContextEndReader(), this._object === this.RDF_NIL)
          return k;
        y = this.RDF_NIL;
        break;
      case "literal":
        l.prefix.length === 0 ? (this._literalValue = l.value, k = this._readListItemDataTypeOrLang) : (d = this._factory.literal(l.value, this._factory.namedNode(l.prefix)), k = this._getContextEndReader());
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
    if (y === null && (this._subject = y = this._factory.blankNode()), I === null ? v.predicate === null ? v.subject = y : v.object = y : this._emit(I, this.RDF_REST, y, this._graph), d !== null) {
      if (this._n3Mode && (l.type === "IRI" || l.type === "prefixed"))
        return this._saveContext("item", this._graph, y, this.RDF_FIRST, d), this._subject = d, this._predicate = null, this._getPathReader(this._readListItem);
      this._emit(y, this.RDF_FIRST, d, this._graph);
    }
    return k;
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
        const y = this._readEntity(l);
        if (y === void 0) return;
        d = this._factory.literal(this._literalValue, y), l = null;
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
    const y = this._completeLiteral(l);
    if (y)
      return this._object = y.literal, d && this._emit(this._subject, this.RDF_FIRST, this._object, this._graph), y.token === null ? this._getContextEndReader() : (this._readCallback = this._getContextEndReader(), this._readCallback(y.token));
  }
  // ### `_readFormulaTail` reads the end of a formula
  _readFormulaTail(l) {
    return l.type !== "}" ? this._readPunctuation(l) : (this._subject !== null && this._emit(this._subject, this._predicate, this._object, this._graph), this._restoreContext("formula", l), this._object === null ? this._readPredicate : this._getContextEndReader());
  }
  // ### `_readPunctuation` reads punctuation between quads or quad parts
  _readPunctuation(l) {
    let d, y = this._graph;
    const k = this._subject, I = this._inversePredicate;
    switch (l.type) {
      case "}":
        if (this._graph === null)
          return this._error("Unexpected graph closing", l);
        if (this._n3Mode)
          return this._readFormulaTail(l);
        this._graph = null;
      case ".":
        this._subject = null, d = this._contextStack.length ? this._readSubject : this._readInTopContext, I && (this._inversePredicate = !1);
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
        const w = this._predicate, v = this._object;
        this._subject = this._factory.quad(k, w, v, this.DEFAULTGRAPH), d = this._readPredicate;
        break;
      case "|}":
        if (this._subject.termType !== "Quad")
          return this._error("Unexpected asserted triple closing", l);
        this._subject = null, d = this._readPunctuation;
        break;
      default:
        if (this._supportsQuads && this._graph === null && (y = this._readEntity(l)) !== void 0) {
          d = this._readQuadPunctuation;
          break;
        }
        return this._error(`Expected punctuation to follow "${this._object.id}"`, l);
    }
    if (k !== null) {
      const w = this._predicate, v = this._object;
      I ? this._emit(v, w, k, y) : this._emit(k, w, v, y);
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
        const d = this._contextStack, y = d.length && d[d.length - 1];
        if (y && y.type === "item") {
          const k = this._subject;
          this._restoreContext("item", l), this._emit(this._subject, this.RDF_FIRST, k, this._graph);
        }
        return this._afterPath(l);
    }
  }
  // ### `_readForwardPath` reads a '!' path
  _readForwardPath(l) {
    let d, y;
    const k = this._factory.blankNode();
    if ((y = this._readEntity(l)) !== void 0)
      return this._predicate === null ? (d = this._subject, this._subject = k) : (d = this._object, this._object = k), this._emit(d, y, k, this._graph), this._readPath;
  }
  // ### `_readBackwardPath` reads a '^' path
  _readBackwardPath(l) {
    const d = this._factory.blankNode();
    let y, k;
    if ((y = this._readEntity(l)) !== void 0)
      return this._predicate === null ? (k = this._subject, this._subject = d) : (k = this._object, this._object = d), this._emit(d, y, k, this._graph), this._readPath;
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
  _emit(l, d, y, k) {
    this._callback(null, this._factory.quad(l, d, y, k || this.DEFAULTGRAPH));
  }
  // ### `_error` emits an error message through the callback
  _error(l, d) {
    const y = new Error(`${l} on line ${d.line}.`);
    y.context = {
      token: d,
      line: d.line,
      previousToken: this._lexer.previousToken
    }, this._callback(y), this._callback = Ss;
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
    let y = "", k = -1, I = -1, w = 0, v = "/";
    for (; k < d; ) {
      switch (v) {
        case ":":
          if (I < 0 && l[++k] === "/" && l[++k] === "/")
            for (; (I = k + 1) < d && l[I] !== "/"; )
              k = I;
          break;
        case "?":
        case "#":
          k = d;
          break;
        case "/":
          if (l[k + 1] === ".")
            switch (v = l[++k + 1], v) {
              case "/":
                y += l.substring(w, k - 1), w = k + 1;
                break;
              case void 0:
              case "?":
              case "#":
                return y + l.substring(w, k) + l.substr(k + 1);
              case ".":
                if (v = l[++k + 1], v === void 0 || v === "/" || v === "?" || v === "#") {
                  if (y += l.substring(w, k - 2), (w = y.lastIndexOf("/")) >= I && (y = y.substr(0, w)), v !== "/")
                    return `${y}/${l.substr(k + 1)}`;
                  w = k + 1;
                }
            }
      }
      v = l[++k];
    }
    return y + l.substring(w);
  }
  // ## Public methods
  // ### `parse` parses the N3 input and emits each parsed quad through the onQuad callback.
  parse(l, d, y) {
    let k, I, w;
    if (d && (d.onQuad || d.onPrefix || d.onComment) ? (k = d.onQuad, I = d.onPrefix, w = d.onComment) : (k = d, I = y), this._readCallback = this._readInTopContext, this._sparqlStyle = !1, this._prefixes = /* @__PURE__ */ Object.create(null), this._prefixes._ = this._blankNodePrefix ? this._blankNodePrefix.substr(2) : `b${ml++}_`, this._prefixCallback = I || Ss, this._inversePredicate = !1, this._quantified = /* @__PURE__ */ Object.create(null), !k) {
      const x = [];
      let R;
      if (this._callback = (U, A) => {
        U ? R = U : A && x.push(A);
      }, this._lexer.tokenize(l).every((U) => this._readCallback = this._readCallback(U)), R) throw R;
      return x;
    }
    let v = (x, R) => {
      x !== null ? (this._callback(x), this._callback = Ss) : this._readCallback && (this._readCallback = this._readCallback(R));
    };
    w && (this._lexer.comments = !0, v = (x, R) => {
      x !== null ? (this._callback(x), this._callback = Ss) : this._readCallback && (R.type === "comment" ? w(R.value) : this._readCallback = this._readCallback(R));
    }), this._callback = k, this._lexer.tokenize(l, v);
  }
}
function Ss() {
}
function Zl(h, l) {
  h._factory = l, h.DEFAULTGRAPH = l.defaultGraph(), h.RDF_FIRST = l.namedNode(Bi.rdf.first), h.RDF_REST = l.namedNode(Bi.rdf.rest), h.RDF_NIL = l.namedNode(Bi.rdf.nil), h.N3_FORALL = l.namedNode(Bi.r.forAll), h.N3_FORSOME = l.namedNode(Bi.r.forSome), h.ABBREVIATIONS = {
    a: l.namedNode(Bi.rdf.type),
    "=": l.namedNode(Bi.owl.sameAs),
    ">": l.namedNode(Bi.log.implies),
    "<": l.namedNode(Bi.log.isImpliedBy)
  }, h.QUANTIFIERS_GRAPH = l.namedNode("urn:n3:quantifiers");
}
Zl(Zo.prototype, Af);
async function ql(h) {
  const l = new Zo(), d = await new Promise((k, I) => {
    const w = [];
    l.parse(h, (v, x) => {
      if (v) return I(v);
      x ? w.push(x) : k(w);
    });
  }), y = /* @__PURE__ */ new Map();
  for (const k of d) {
    const I = k.subject.value;
    y.has(I) || y.set(I, []), y.get(I).push({ p: k.predicate.value, o: k.object });
  }
  return y;
}
const Hl = {
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
function Ca(h) {
  for (const [l, d] of Object.entries(Hl))
    if (h.startsWith(l)) return d + h.slice(l.length);
  return h.split(/[#/]/).at(-1) || h;
}
function gl(h) {
  const l = h.indexOf(":");
  if (l === -1) return h;
  const d = h.slice(0, l + 1);
  for (const [y, k] of Object.entries(Hl))
    if (k === d) return y + h.slice(l + 1);
  return h;
}
function Ao(h) {
  return typeof h == "string" && /^https?:\/\/|^urn:|^mailto:/.test(h);
}
function Ff(h) {
  return typeof h == "string" && /^\d{4}-\d{2}-\d{2}/.test(h);
}
const Ve = "http://www.w3.org/ns/shacl#", Rf = "http://www.w3.org/1999/02/22-rdf-syntax-ns#", To = "http://www.w3.org/2001/XMLSchema#", Nf = "http://www.w3.org/ns/dcat#", zf = `${Ve}Violation`, jf = `${Ve}Warning`, $f = `${Ve}Info`;
class Uf {
  /**
   * @param {string}  ttlContent   Raw Turtle content of the SHACL shapes file
   * @param {object}  formData     Current form data keyed by compact field IRI
   * @param {object}  config       Resolved form config (groups, fields)
   * @returns {{ valid: boolean, violations: object[] }}
   */
  async validate(l, d, y) {
    var R, U;
    const k = await ql(l), I = Zf(k), w = Object.values(I).find(
      (A) => A.targetClass === `${Nf}Dataset`
    );
    if (!w) return { valid: !0, violations: [] };
    const v = [];
    for (const A of w.properties) {
      const j = Ca(A.path), N = d == null ? void 0 : d[j], J = ((U = (R = y == null ? void 0 : y.fields) == null ? void 0 : R[j]) == null ? void 0 : U.label) || { en: j, de: j }, X = Gf(j, y), dt = { fieldId: j, fieldLabel: J, groupId: X, shapeRef: A.shapeRef };
      if (A.minCount > 0 && da(N) < A.minCount) {
        v.push(en(
          dt,
          A.severity,
          "minCount",
          `Pflichtfeld (sh:minCount ${A.minCount}) — kein Wert angegeben.`,
          `Required field (sh:minCount ${A.minCount}) — no value provided.`
        ));
        continue;
      }
      if (da(N) !== 0) {
        if (A.maxCount !== null && da(N) > A.maxCount && v.push(en(
          dt,
          A.severity,
          "maxCount",
          `Zu viele Werte (sh:maxCount ${A.maxCount}, vorhanden: ${da(N)}).`,
          `Too many values (sh:maxCount ${A.maxCount}, found: ${da(N)}).`
        )), A.nodeKind === `${Ve}IRI`) {
          const Q = $n(N).filter((Et) => !Ao(Et));
          Q.length && v.push(en(
            dt,
            A.severity,
            "nodeKind",
            `Wert muss eine URI sein (sh:nodeKind sh:IRI). Ungültig: ${Q.slice(0, 2).join(", ")}`,
            `Value must be a URI (sh:nodeKind sh:IRI). Invalid: ${Q.slice(0, 2).join(", ")}`
          ));
        } else A.nodeKind === `${Ve}Literal` && $n(N).filter((Et) => Ao(Et)).length && v.push(en(
          dt,
          A.severity,
          "nodeKind",
          "Wert darf keine URI sein (sh:nodeKind sh:Literal).",
          "Value must not be a URI (sh:nodeKind sh:Literal)."
        ));
        if (A.datatype === `${To}anyURI`)
          $n(N).filter((Et) => !Ao(Et)).length && v.push(en(
            dt,
            A.severity,
            "datatype",
            "Wert muss eine gültige URI sein (xsd:anyURI).",
            "Value must be a valid URI (xsd:anyURI)."
          ));
        else if (A.datatype === `${To}date` || A.datatype === `${To}dateTime`) {
          const Q = $n(N).filter((Et) => !Ff(Et));
          Q.length && v.push(en(
            dt,
            A.severity,
            "datatype",
            `Wert muss ein gültiges Datum sein (xsd:date). Ungültig: ${Q[0]}`,
            `Value must be a valid date (xsd:date). Invalid: ${Q[0]}`
          ));
        }
        if (A.pattern) {
          let Q;
          try {
            Q = new RegExp(A.pattern);
          } catch {
          }
          Q && $n(N).filter((At) => !Q.test(At)).length && v.push(en(
            dt,
            A.severity,
            "pattern",
            `Wert entspricht nicht dem Muster (sh:pattern ${A.pattern}).`,
            `Value does not match pattern (sh:pattern ${A.pattern}).`
          ));
        }
        A.minLength !== null && $n(N).filter((Et) => Et.length < A.minLength).length && v.push(en(
          dt,
          A.severity,
          "minLength",
          `Wert zu kurz — Minimum ${A.minLength} Zeichen (sh:minLength).`,
          `Value too short — minimum ${A.minLength} characters (sh:minLength).`
        )), A.maxLength !== null && $n(N).filter((Et) => Et.length > A.maxLength).length && v.push(en(
          dt,
          A.severity,
          "maxLength",
          `Wert zu lang — Maximum ${A.maxLength} Zeichen (sh:maxLength).`,
          `Value too long — maximum ${A.maxLength} characters (sh:maxLength).`
        ));
      }
    }
    const x = { violation: 0, warning: 1, info: 2 };
    return v.sort((A, j) => x[A.severity] - x[j.severity]), {
      valid: v.every((A) => A.severity !== "violation"),
      violations: v
    };
  }
}
function en(h, l, d, y, k) {
  return {
    fieldId: h.fieldId,
    fieldLabel: h.fieldLabel,
    groupId: h.groupId,
    shapeRef: h.shapeRef,
    severity: Vf(l),
    constraint: d,
    messageDe: y,
    messageEn: k
  };
}
function Vf(h) {
  return h === jf ? "warning" : h === $f ? "info" : "violation";
}
function da(h) {
  return h == null || h === "" ? 0 : Array.isArray(h) ? h.filter((l) => l ? typeof l == "object" && "value" in l ? !!l.value : typeof l == "object" ? Object.values(l).some((d) => d) : String(l).trim() !== "" : !1).length : typeof h == "object" ? Object.values(h).some((l) => l && String(l).trim()) ? 1 : 0 : String(h).trim() ? 1 : 0;
}
function $n(h) {
  return h == null || h === "" ? [] : Array.isArray(h) ? h.flatMap((l) => l ? typeof l == "object" && "value" in l ? l.value ? [l.value] : [] : typeof l == "object" ? Object.values(l).filter((d) => typeof d == "string" && d) : [String(l)] : []) : typeof h == "object" ? Object.values(h).filter((l) => typeof l == "string" && l) : [String(h)];
}
function Gf(h, l) {
  var d;
  if (!(l != null && l.groups)) return null;
  for (const y of l.groups)
    if ((d = y.fields) != null && d.includes(h)) return y.id;
  return null;
}
function Zf(h) {
  var d;
  const l = {};
  for (const [y, k] of h.entries()) {
    if (!k.filter((R) => R.p === `${Rf}type`).map((R) => R.o.value).includes(`${Ve}NodeShape`)) continue;
    const w = (d = k.find((R) => R.p === `${Ve}targetClass`)) == null ? void 0 : d.o.value, x = k.filter((R) => R.p === `${Ve}property`).map((R) => R.o.value).map((R) => qf(R, h)).filter(Boolean);
    l[y] = { subject: y, targetClass: w, properties: x };
  }
  return l;
}
function qf(h, l) {
  const d = l.get(h) || [], y = d.find((w) => w.p === `${Ve}path`);
  if (!y) return null;
  const k = (w) => {
    var v;
    return ((v = d.find((x) => x.p === w)) == null ? void 0 : v.o.value) ?? null;
  }, I = (w) => {
    const v = k(w);
    return v !== null ? parseInt(v) : null;
  };
  return {
    path: y.o.value,
    shapeRef: h,
    minCount: I(`${Ve}minCount`) ?? 0,
    maxCount: I(`${Ve}maxCount`),
    nodeKind: k(`${Ve}nodeKind`),
    datatype: k(`${Ve}datatype`),
    severity: k(`${Ve}severity`) ?? zf,
    pattern: k(`${Ve}pattern`),
    minLength: I(`${Ve}minLength`),
    maxLength: I(`${Ve}maxLength`)
  };
}
const Hf = { class: "metadata-form ontoform" }, Kf = { class: "step-indicator" }, Wf = ["aria-label", "aria-current", "onClick"], Jf = { class: "step-label" }, Xf = { class: "step-label" }, Yf = {
  key: 0,
  class: "progress-bar-wrap"
}, Qf = ["aria-valuenow", "aria-label"], tp = {
  class: "progress-label",
  "aria-hidden": "true"
}, ep = { class: "form-group" }, ip = { class: "group-title" }, np = { class: "wizard-nav" }, rp = { key: 1 }, ap = { class: "summary-view" }, sp = { class: "summary-group-header" }, op = { class: "group-title" }, lp = { class: "summary-group-header-right" }, up = {
  key: 0,
  class: "group-error-badge"
}, hp = ["onClick"], cp = { class: "summary-fields" }, dp = { class: "summary-field-label" }, fp = ["innerHTML"], pp = {
  key: 1,
  class: "no-data"
}, _p = { class: "form-actions" }, mp = {
  key: 0,
  class: "validation-hint"
}, gp = ["disabled", "aria-label"], yp = ["disabled"], vp = { class: "wizard-nav" }, bp = { class: "group-title" }, xp = { class: "form-actions" }, Lp = {
  key: 0,
  class: "validation-hint"
}, wp = ["disabled"], Cp = ["disabled"], kp = {
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
  setup(h, { emit: l }) {
    function d(pt) {
      return String(pt ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");
    }
    const y = h, k = l;
    function I(pt, bt) {
      var _t;
      const mt = (_t = y.labels) == null ? void 0 : _t[pt];
      return mt ? typeof mt == "string" ? mt : mt[y.lang] ?? mt.en ?? mt.de ?? bt[y.lang] ?? bt.en : bt[y.lang] ?? bt.en ?? bt.de;
    }
    const w = {
      textarea: zo,
      select: jo,
      date: $o,
      uri: Uo,
      langstring: Ml,
      text: xr,
      object: Sl,
      multiselect: Cc,
      "distribution-editor": qd,
      map: Pl,
      searchselect: Vo
    };
    function v(pt) {
      return w[pt.type] || xr;
    }
    const x = Jt(() => {
      var pt;
      return (((pt = y.config) == null ? void 0 : pt.groups) || []).filter((bt) => bt.visible !== !1);
    });
    function R(pt) {
      return (pt.fields || []).map((bt) => y.config.fields[bt]).filter((bt) => bt && bt.visible !== !1 && Dl(bt.visibleIf, y.modelValue)).sort((bt, mt) => (bt.order || 0) - (mt.order || 0));
    }
    const U = Jt(() => _f(y.config, y.modelValue, y.lang)), A = Jt(() => {
      var mt;
      let pt = 0, bt = 0;
      for (const _t of x.value)
        for (const It of R(_t))
          bt++, Fo((mt = y.modelValue) == null ? void 0 : mt[It.id], It) && pt++;
      return { filled: pt, total: bt };
    }), j = Jt(() => A.value.filled), N = Jt(() => A.value.total), J = Jt(
      () => N.value ? Math.round(j.value / N.value * 100) : 0
    ), X = Jt(() => Object.keys(U.value).length === 0), dt = Xt([]), Q = Xt(!1), Et = Xt(!1);
    async function At() {
      var bt;
      const pt = (bt = y.config) == null ? void 0 : bt.standard;
      if (pt) {
        Et.value = !0;
        try {
          const mt = await fetch(Ds(`shacl/${pt}.ttl`)).then((Tt) => Tt.text()), It = await new Uf().validate(mt, y.modelValue, y.config);
          dt.value = It.violations, Q.value = !0;
        } finally {
          Et.value = !1;
        }
      }
    }
    async function pe({ fieldId: pt, groupId: bt }) {
      var It;
      if (y.wizard) {
        const Tt = x.value.findIndex((Qt) => Qt.id === bt);
        Tt >= 0 && be(Tt);
      }
      await br();
      const mt = typeof CSS < "u" && CSS.escape ? CSS.escape(pt) : pt.replace(/[^\w-]/g, "_"), _t = document.getElementById(`field-${mt}`);
      _t == null || _t.scrollIntoView({ behavior: "smooth", block: "center" }), (It = _t == null ? void 0 : _t.querySelector("input,textarea,select")) == null || It.focus();
    }
    function Mt() {
      var bt, mt;
      if (!X.value) return;
      const pt = ((bt = y.config) == null ? void 0 : bt.fields) || {};
      for (const [_t, It] of Object.entries(pt))
        It.remember && ((mt = y.modelValue) == null ? void 0 : mt[_t]) != null && yr.save(_t, y.modelValue[_t]);
      k("export");
    }
    const Ct = Xt(0), Dt = Xt(!1);
    Zn(() => y.config, () => {
      Ct.value = 0, Dt.value = !1;
    });
    const re = Jt(() => x.value[Ct.value]);
    function ee(pt) {
      const bt = R(pt), mt = {};
      for (const _t of bt)
        U.value[_t.id] && (mt[_t.id] = U.value[_t.id]);
      return mt;
    }
    function Yt(pt) {
      return Object.keys(ee(pt)).length > 0;
    }
    const Kt = Jt(() => re.value ? Object.keys(ee(re.value)).length > 0 : !1);
    function me() {
      if (Kt.value) {
        Dt.value = !0;
        return;
      }
      Dt.value = !1, Ct.value++;
    }
    function Ge() {
      Dt.value = !1, Ct.value > 0 && Ct.value--;
    }
    function be(pt) {
      Dt.value = !1, Ct.value = pt;
    }
    function St(pt) {
      var mt;
      const bt = (mt = y.modelValue) == null ? void 0 : mt[pt.id];
      return bt == null || bt === "" ? !1 : Array.isArray(bt) ? bt.some((_t) => _t ? typeof _t == "object" ? Object.values(_t).some((It) => It) : !0 : !1) : typeof bt == "object" ? Object.values(bt).some((_t) => _t) : !0;
    }
    function zt(pt) {
      return R(pt).some((bt) => St(bt));
    }
    function le(pt) {
      var mt, _t, It;
      const bt = (mt = y.modelValue) == null ? void 0 : mt[pt.id];
      if (bt == null) return "";
      if (pt.type === "langstring")
        return pt.multiple && Array.isArray(bt) ? bt.filter((Tt) => Tt && Tt.value).map((Tt) => `${Tt.value} (${Tt.lang || "?"})`).join(", ") : typeof bt == "object" ? Object.entries(bt).filter(([, Tt]) => Tt).map(([Tt, Qt]) => `${Tt.toUpperCase()}: ${Qt}`).join(", ") : String(bt);
      if (pt.type === "multiselect" && Array.isArray(bt))
        return bt.map((Tt) => {
          var jt, Gt;
          const Qt = (pt.options || []).find((Ce) => Ce.value === Tt);
          return Qt && (((jt = Qt.label) == null ? void 0 : jt[y.lang]) || ((Gt = Qt.label) == null ? void 0 : Gt.en) || Qt.label) || Tt;
        }).join(", ");
      if (pt.type === "select") {
        const Tt = (pt.options || []).find((Qt) => Qt.value === bt);
        return Tt && (((_t = Tt.label) == null ? void 0 : _t[y.lang]) || ((It = Tt.label) == null ? void 0 : It.en) || Tt.label) || bt;
      }
      if (pt.type === "uri") {
        if (!bt) return "";
        const Tt = d(bt);
        return `<a href="${Tt}" target="_blank" rel="noopener">${Tt}</a>`;
      }
      if (pt.type === "date")
        return String(bt);
      if (pt.type === "object" && typeof bt == "object" && pt.subFields) {
        const Tt = pt.subFields.filter((jt) => bt[jt.id] && jt.type !== "map").map((jt) => {
          var Ce, xe;
          return `<span class="sub-field"><b>${d(((Ce = jt.label) == null ? void 0 : Ce[y.lang]) || ((xe = jt.label) == null ? void 0 : xe.de) || jt.id)}:</b> ${d(bt[jt.id])}</span>`;
        }), Qt = pt.subFields.filter((jt) => bt[jt.id] && jt.type === "map").map((jt) => {
          var Ce, xe;
          return `<span class="sub-field"><b>${d(((Ce = jt.label) == null ? void 0 : Ce[y.lang]) || ((xe = jt.label) == null ? void 0 : xe.de) || jt.id)}:</b> <code style="font-size:0.75em">${d(bt[jt.id])}</code></span>`;
        });
        return [...Tt, ...Qt].join("<br>") || "";
      }
      return pt.type === "map" ? bt ? `<code style="font-size:0.75em">${d(bt)}</code>` : "" : pt.type === "distribution-editor" && Array.isArray(bt) ? bt.length ? bt.filter((Tt) => Tt && Tt["dcat:accessURL"]).map((Tt, Qt) => {
        const jt = d(Tt["dct:title"] || Tt["dcat:accessURL"]), Gt = d(Tt["dcat:accessURL"]);
        return `<span class="sub-field"><b>${Qt + 1}.</b> <a href="${Gt}" target="_blank" rel="noopener">${jt}</a></span>`;
      }).join("<br>") || `${bt.length} Distribution(s)` : "" : String(bt);
    }
    return (pt, bt) => {
      var mt;
      return ut(), ct("div", Hf, [
        h.wizard ? (ut(), ct(se, { key: 0 }, [
          G("div", Kf, [
            (ut(!0), ct(se, null, Pe(x.value, (_t, It) => (ut(), ct("div", {
              key: _t.id,
              class: ne(["step-item", {
                completed: It < Ct.value,
                active: It === Ct.value && Ct.value < x.value.length,
                future: It > Ct.value || Ct.value >= x.value.length,
                "has-error": Ct.value >= x.value.length && Yt(_t)
              }])
            }, [
              It > 0 ? (ut(), ct("div", {
                key: 0,
                class: ne(["step-connector left", { done: It <= Ct.value }])
              }, null, 2)) : Vt("", !0),
              G("button", {
                class: "step-circle",
                "aria-label": (h.lang === "de" ? "Schritt " : "Step ") + (It + 1) + ": " + (_t.label[h.lang] || _t.label.en),
                "aria-current": It === Ct.value ? "step" : void 0,
                onClick: (Tt) => be(It)
              }, ht(It + 1), 9, Wf),
              G("div", Jf, ht(_t.label[h.lang] || _t.label.en), 1),
              It < x.value.length - 1 ? (ut(), ct("div", {
                key: 1,
                class: ne(["step-connector right", { done: It < Ct.value }])
              }, null, 2)) : Vt("", !0)
            ], 2))), 128)),
            G("div", {
              class: ne(["step-item", {
                active: Ct.value === x.value.length,
                future: Ct.value < x.value.length
              }])
            }, [
              G("div", {
                class: ne(["step-connector left", { done: Ct.value >= x.value.length }])
              }, null, 2),
              bt[4] || (bt[4] = G("div", { class: "step-circle" }, "✓", -1)),
              G("div", Xf, ht(h.lang === "de" ? "Übersicht" : "Summary"), 1)
            ], 2)
          ]),
          (mt = h.config) != null && mt.showProgress ? (ut(), ct("div", Yf, [
            G("div", {
              class: "progress-bar-track",
              role: "progressbar",
              "aria-valuenow": J.value,
              "aria-valuemin": "0",
              "aria-valuemax": "100",
              "aria-label": (h.lang === "de" ? "Fortschritt: " : "Progress: ") + j.value + " / " + N.value
            }, [
              G("div", {
                class: "progress-bar-fill",
                style: Ru({ width: J.value + "%" })
              }, null, 4)
            ], 8, Qf),
            G("span", tp, ht(j.value) + " / " + ht(N.value), 1)
          ])) : Vt("", !0),
          Ct.value < x.value.length ? (ut(), ct(se, { key: 1 }, [
            G("div", ep, [
              G("h2", ip, ht(re.value.label[h.lang] || re.value.label.en), 1),
              Ts(dl, {
                fields: R(re.value),
                lang: h.lang,
                modelValue: h.modelValue,
                fieldErrors: U.value,
                showErrors: Dt.value,
                fieldComponent: v,
                "onUpdate:modelValue": bt[0] || (bt[0] = (_t) => pt.$emit("update:modelValue", _t))
              }, null, 8, ["fields", "lang", "modelValue", "fieldErrors", "showErrors"])
            ]),
            G("div", np, [
              Ct.value > 0 ? (ut(), ct("button", {
                key: 0,
                class: "btn-back",
                onClick: Ge
              }, ht(h.lang === "de" ? "Zurück" : "Back"), 1)) : (ut(), ct("span", rp)),
              G("button", {
                class: "btn-export",
                onClick: me
              }, ht(Ct.value < x.value.length - 1 ? h.lang === "de" ? "Weiter" : "Next" : h.lang === "de" ? "Zur Übersicht" : "Summary"), 1)
            ])
          ], 64)) : (ut(), ct(se, { key: 2 }, [
            G("div", ap, [
              (ut(!0), ct(se, null, Pe(x.value, (_t, It) => (ut(), ct("div", {
                key: _t.id,
                class: ne(["form-group summary-group", { "summary-group-has-error": Yt(_t) }])
              }, [
                G("div", sp, [
                  G("h2", op, ht(_t.label[h.lang] || _t.label.en), 1),
                  G("div", lp, [
                    Yt(_t) ? (ut(), ct("span", up, ht(h.lang === "de" ? "Fehlende Pflichtfelder" : "Required fields missing"), 1)) : Vt("", !0),
                    G("button", {
                      class: "btn-edit",
                      onClick: (Tt) => be(It)
                    }, ht(h.lang === "de" ? "Bearbeiten" : "Edit"), 9, hp)
                  ])
                ]),
                G("div", cp, [
                  zt(_t) ? (ut(!0), ct(se, { key: 0 }, Pe(R(_t), (Tt) => (ut(), ct("div", {
                    key: Tt.id,
                    class: "summary-field"
                  }, [
                    St(Tt) ? (ut(), ct(se, { key: 0 }, [
                      G("span", dp, ht(Tt.label[h.lang] || Tt.label.en), 1),
                      G("span", {
                        class: "summary-field-value",
                        innerHTML: le(Tt)
                      }, null, 8, fp)
                    ], 64)) : Vt("", !0)
                  ]))), 128)) : (ut(), ct("span", pp, ht(h.lang === "de" ? "Keine Angaben" : "No data"), 1))
                ])
              ], 2))), 128))
            ]),
            G("div", _p, [
              X.value ? Vt("", !0) : (ut(), ct("span", mp, ht(h.lang === "de" ? "Bitte alle Fehler beheben." : "Please fix all errors."), 1)),
              G("button", {
                class: "btn-validate",
                type: "button",
                disabled: Et.value,
                "aria-label": Et.value ? h.lang === "de" ? "Validierung läuft …" : "Validating …" : I("validateAriaLabel", { de: "SHACL-Validierung starten", en: "Run SHACL validation" }),
                onClick: At
              }, ht(Et.value ? "…" : I("validate", { de: "SHACL prüfen", en: "SHACL validate" })), 9, gp),
              G("button", {
                class: ne(["btn-export", { disabled: !X.value }]),
                disabled: !X.value,
                onClick: Mt
              }, ht(I("export", { de: "Export JSON-LD / Turtle", en: "Export JSON-LD / Turtle" })), 11, yp)
            ]),
            Q.value ? (ut(), Pi(pl, {
              key: 0,
              violations: dt.value,
              lang: h.lang,
              onClose: bt[1] || (bt[1] = (_t) => Q.value = !1),
              onNavigate: pe
            }, null, 8, ["violations", "lang"])) : Vt("", !0),
            G("div", vp, [
              G("button", {
                class: "btn-back",
                onClick: Ge
              }, ht(h.lang === "de" ? "Zurück" : "Back"), 1),
              bt[5] || (bt[5] = G("span", null, null, -1))
            ])
          ], 64))
        ], 64)) : (ut(), ct(se, { key: 1 }, [
          (ut(!0), ct(se, null, Pe(x.value, (_t) => (ut(), ct("div", {
            key: _t.id,
            class: "form-group"
          }, [
            G("h2", bp, ht(_t.label[h.lang] || _t.label.en), 1),
            Ts(dl, {
              fields: R(_t),
              lang: h.lang,
              modelValue: h.modelValue,
              fieldErrors: U.value,
              showErrors: !0,
              fieldComponent: v,
              "onUpdate:modelValue": bt[2] || (bt[2] = (It) => pt.$emit("update:modelValue", It))
            }, null, 8, ["fields", "lang", "modelValue", "fieldErrors"])
          ]))), 128)),
          G("div", xp, [
            X.value ? Vt("", !0) : (ut(), ct("span", Lp, ht(h.lang === "de" ? "Bitte alle Fehler beheben." : "Please fix all errors."), 1)),
            G("button", {
              class: "btn-validate",
              type: "button",
              disabled: Et.value,
              onClick: At
            }, ht(Et.value ? "…" : I("validate", { de: "SHACL prüfen", en: "SHACL validate" })), 9, wp),
            G("button", {
              class: ne(["btn-export", { disabled: !X.value }]),
              disabled: !X.value,
              onClick: Mt
            }, ht(I("export", { de: "Export JSON-LD / Turtle", en: "Export JSON-LD / Turtle" })), 11, Cp)
          ]),
          Q.value ? (ut(), Pi(pl, {
            key: 0,
            violations: dt.value,
            lang: h.lang,
            onClose: bt[3] || (bt[3] = (_t) => Q.value = !1),
            onNavigate: pe
          }, null, 8, ["violations", "lang"])) : Vt("", !0)
        ], 64))
      ]);
    };
  }
}, Ep = /* @__PURE__ */ Se(kp, [["__scopeId", "data-v-9f8b5e07"]]), Mp = {
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
class Bp {
  toJSONLD(l, d, y = "dcat:Dataset") {
    const k = {
      "@context": Mp,
      "@type": y,
      "@id": l["dct:identifier"] || `_:dataset_${Date.now()}`
    };
    for (const [I, w] of Object.entries(l || {}))
      if (!(w == null || w === "" || I === "@id"))
        if (Array.isArray(w)) {
          const v = w.flatMap((x) => {
            if (x && typeof x == "object" && "value" in x)
              return x.value ? [{ "@value": x.value, "@language": x.lang }] : [];
            if (gr(x)) {
              const U = { "@type": x["rdf:type"] || "dcat:Distribution" };
              for (const [A, j] of Object.entries(x))
                !A.includes(":") || A === "rdf:type" || j && (bi(j) ? U[A] = { "@id": j } : wn(j) ? U[A] = { "@value": j, "@type": "http://www.opengis.net/ont/geosparql#wktLiteral" } : U[A] = j);
              return Object.keys(U).length > 1 ? [U] : [];
            }
            return x ? [x] : [];
          });
          v.length > 0 && (k[I] = v.length === 1 ? v[0] : v);
        } else if (gr(w)) {
          const v = {};
          w["rdf:type"] && (v["@type"] = w["rdf:type"]);
          for (const [x, R] of Object.entries(w))
            !x.includes(":") || x === "rdf:type" || R && (bi(R) ? v[x] = { "@id": R } : wn(R) ? v[x] = { "@value": R, "@type": "http://www.opengis.net/ont/geosparql#wktLiteral" } : v[x] = R);
          Object.keys(v).length > 0 && (k[I] = v);
        } else if (typeof w == "object") {
          const v = Object.fromEntries(Object.entries(w).filter(([, x]) => x));
          Object.keys(v).length > 0 && (k[I] = v);
        } else
          k[I] = w;
    return JSON.stringify(k, null, 2);
  }
  toRDFXML(l, d, y = "dcat:Dataset") {
    const k = [
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
`), I = l["dct:identifier"], w = I && bi(I) ? ` rdf:about="${Ue(I)}"` : "", v = [];
    for (const [x, R] of Object.entries(l || {}))
      if (!(R == null || R === "" || x === "dct:identifier"))
        if (Array.isArray(R)) {
          for (const U of R)
            if (U)
              if (typeof U == "object" && "value" in U)
                U.value && v.push(`    <${x} xml:lang="${U.lang}">${Ue(U.value)}</${x}>`);
              else if (gr(U)) {
                const A = U["rdf:type"] || "dcat:Distribution", j = [];
                for (const [N, J] of Object.entries(U))
                  !N.includes(":") || N === "rdf:type" || J && (bi(J) ? j.push(`        <${N} rdf:resource="${Ue(J)}"/>`) : mr(J) ? j.push(`        <${N} rdf:datatype="http://www.w3.org/2001/XMLSchema#date">${Ue(J)}</${N}>`) : wn(J) ? j.push(`        <${N} rdf:datatype="http://www.opengis.net/ont/geosparql#wktLiteral">${Ue(String(J))}</${N}>`) : j.push(`        <${N}>${Ue(String(J))}</${N}>`));
                j.length > 0 && v.push(`    <${x}>
      <${A}>
${j.join(`
`)}
      </${A}>
    </${x}>`);
              } else bi(U) ? v.push(`    <${x} rdf:resource="${Ue(U)}"/>`) : U && v.push(`    <${x}>${Ue(String(U))}</${x}>`);
        } else if (gr(R)) {
          const U = [], A = R["rdf:type"], j = A ? `      <${A}>` : "      <rdf:Description>", N = A ? `      </${A}>` : "      </rdf:Description>";
          for (const [J, X] of Object.entries(R))
            !J.includes(":") || J === "rdf:type" || X && (bi(X) ? U.push(`        <${J} rdf:resource="${Ue(X)}"/>`) : mr(X) ? U.push(`        <${J} rdf:datatype="http://www.w3.org/2001/XMLSchema#date">${Ue(X)}</${J}>`) : wn(X) ? U.push(`        <${J} rdf:datatype="http://www.opengis.net/ont/geosparql#wktLiteral">${Ue(String(X))}</${J}>`) : U.push(`        <${J}>${Ue(String(X))}</${J}>`));
          U.length > 0 && v.push(`    <${x}>
${j}
${U.join(`
`)}
${N}
    </${x}>`);
        } else if (typeof R == "object")
          for (const [U, A] of Object.entries(R))
            A && v.push(`    <${x} xml:lang="${U}">${Ue(A)}</${x}>`);
        else bi(R) ? v.push(`    <${x} rdf:resource="${Ue(R)}"/>`) : mr(R) ? v.push(`    <${x} rdf:datatype="http://www.w3.org/2001/XMLSchema#date">${Ue(R)}</${x}>`) : wn(R) ? v.push(`    <${x} rdf:datatype="http://www.opengis.net/ont/geosparql#wktLiteral">${Ue(String(R))}</${x}>`) : v.push(`    <${x}>${Ue(String(R))}</${x}>`);
    return [
      '<?xml version="1.0" encoding="UTF-8"?>',
      `<rdf:RDF
${k}>`,
      `  <${y}${w}>`,
      ...v,
      `  </${y}>`,
      "</rdf:RDF>"
    ].join(`
`);
  }
  toTurtle(l, d, y = "dcat:Dataset") {
    const k = [
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
    ], I = l["dct:identifier"], w = I && bi(I) ? `<${I}>` : "_:dataset", v = [];
    for (const [R, U] of Object.entries(l || {}))
      if (!(U == null || U === "" || R === "dct:identifier"))
        if (Array.isArray(U)) {
          for (const A of U)
            if (A)
              if (typeof A == "object" && "value" in A)
                A.value && v.push(`    ${R} "${nn(A.value)}"@${A.lang}`);
              else if (gr(A)) {
                const N = [`        a ${A["rdf:type"] || "dcat:Distribution"}`];
                for (const [J, X] of Object.entries(A))
                  !J.includes(":") || J === "rdf:type" || X && (bi(X) ? N.push(`        ${J} <${X}>`) : mr(X) ? N.push(`        ${J} "${X}"^^xsd:date`) : wn(X) ? N.push(`        ${J} "${nn(String(X))}"^^geo:wktLiteral`) : N.push(`        ${J} "${nn(String(X))}"`));
                if (N.length > 1) {
                  const J = N.map((X, dt) => dt < N.length - 1 ? X + " ;" : X).join(`
`);
                  v.push(`    ${R} [
${J}
    ]`);
                }
              } else bi(A) ? v.push(`    ${R} <${A}>`) : A && v.push(`    ${R} "${nn(String(A))}"`);
        } else if (gr(U)) {
          const A = [];
          U["rdf:type"] && A.push(`        a ${U["rdf:type"]}`);
          for (const [j, N] of Object.entries(U))
            !j.includes(":") || j === "rdf:type" || N && (bi(N) ? A.push(`        ${j} <${N}>`) : mr(N) ? A.push(`        ${j} "${N}"^^xsd:date`) : wn(N) ? A.push(`        ${j} "${nn(String(N))}"^^geo:wktLiteral`) : A.push(`        ${j} "${nn(String(N))}"`));
          if (A.length > 0) {
            const j = A.map(
              (N, J) => J < A.length - 1 ? N + " ;" : N
            ).join(`
`);
            v.push(`    ${R} [
${j}
    ]`);
          }
        } else if (typeof U == "object") {
          const A = Object.entries(U).filter(([, j]) => j).map(([j, N]) => `"${nn(N)}"@${j}`);
          A.length > 0 && v.push(`    ${R} ${A.join(", ")}`);
        } else bi(U) ? v.push(`    ${R} <${U}>`) : mr(U) ? v.push(`    ${R} "${U}"^^xsd:date`) : wn(U) ? v.push(`    ${R} "${nn(String(U))}"^^geo:wktLiteral`) : v.push(`    ${R} "${nn(String(U))}"`);
    if (v.length === 0)
      return [...k, `${w} a ${y} .`].join(`
`);
    const x = v.map(
      (R, U) => U < v.length - 1 ? R + " ;" : R + " ."
    );
    return [...k, `${w} a ${y} ;`, ...x].join(`
`);
  }
}
function Ue(h) {
  return String(h).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}
function nn(h) {
  return h.replace(/\\/g, "\\\\").replace(/"/g, '\\"').replace(/\n/g, "\\n");
}
function bi(h) {
  if (typeof h != "string" || !h) return !1;
  try {
    return !!new URL(h);
  } catch {
    return !1;
  }
}
function mr(h) {
  return typeof h == "string" && /^\d{4}-\d{2}-\d{2}/.test(h);
}
function wn(h) {
  return typeof h == "string" && /^(POLYGON|POINT|LINESTRING|MULTIPOLYGON|MULTIPOINT|MULTILINESTRING|GEOMETRYCOLLECTION)\s*\(/i.test(h.trim());
}
function gr(h) {
  return typeof h != "object" || h === null || Array.isArray(h) ? !1 : Object.keys(h).some((l) => l.includes(":"));
}
const Pp = { class: "export-header" }, Sp = ["aria-label"], Ap = {
  key: 0,
  class: "preview-notice",
  role: "status"
}, Tp = ["aria-label"], Dp = ["aria-selected", "tabindex"], Ip = ["aria-selected", "tabindex"], Op = ["aria-selected", "tabindex"], Fp = { class: "export-content" }, Rp = ["hidden"], Np = ["hidden"], zp = ["hidden"], jp = { class: "export-actions" }, $p = {
  role: "status",
  "aria-live": "polite",
  class: "copy-status"
}, Up = {
  __name: "ExportPanel",
  props: {
    formData: Object,
    standard: String,
    lang: String,
    preview: { type: Boolean, default: !1 }
  },
  emits: ["close"],
  setup(h) {
    const l = h, d = Xt("jsonld"), y = Xt(!1), k = Xt(null), I = new Bp();
    Lr(async () => {
      var N, J, X;
      await br(), (X = ((N = k.value) == null ? void 0 : N.querySelector('[role="tab"]')) || ((J = k.value) == null ? void 0 : J.querySelector("button"))) == null || X.focus();
    });
    const w = Jt(() => I.toJSONLD(l.formData, l.standard)), v = Jt(() => I.toTurtle(l.formData, l.standard)), x = Jt(() => I.toRDFXML(l.formData, l.standard)), R = Jt(() => d.value === "jsonld" ? w.value : d.value === "turtle" ? v.value : x.value);
    async function U() {
      await navigator.clipboard.writeText(R.value), y.value = !0, setTimeout(() => y.value = !1, 2e3);
    }
    function A() {
      const j = { jsonld: "jsonld", turtle: "ttl", rdfxml: "rdf" }, N = { jsonld: "application/ld+json", turtle: "text/turtle", rdfxml: "application/rdf+xml" };
      j[d.value];
      const J = N[d.value] || "application/rdf+xml", X = new Blob([R.value], { type: J }), dt = URL.createObjectURL(X), Q = document.createElement("a");
      Q.href = dt, Q.download = d.value === "jsonld" ? "metadata.jsonld" : d.value === "turtle" ? "metadata.ttl" : "metadata.rdf", Q.click(), URL.revokeObjectURL(dt);
    }
    return (j, N) => (ut(), ct("div", {
      class: "export-overlay",
      onClick: N[4] || (N[4] = De((J) => j.$emit("close"), ["self"])),
      onKeydown: N[5] || (N[5] = rn((J) => j.$emit("close"), ["esc"]))
    }, [
      G("div", {
        class: "export-panel",
        role: "dialog",
        "aria-modal": "true",
        "aria-labelledby": "export-heading",
        ref_key: "panelEl",
        ref: k
      }, [
        G("div", Pp, [
          N[6] || (N[6] = G("h2", { id: "export-heading" }, "Export", -1)),
          G("button", {
            class: "close-btn",
            "aria-label": h.lang === "de" ? "Export schließen" : "Close export",
            onClick: N[0] || (N[0] = (J) => j.$emit("close"))
          }, "✕", 8, Sp)
        ]),
        h.preview ? (ut(), ct("div", Ap, ht(h.lang === "de" ? "Vorschau-Modus: Daten können unvollständig oder ungültig sein." : "Preview mode: data may be incomplete or invalid."), 1)) : Vt("", !0),
        G("div", {
          class: "export-tabs",
          role: "tablist",
          "aria-label": h.lang === "de" ? "Exportformat" : "Export format"
        }, [
          G("button", {
            role: "tab",
            "aria-selected": d.value === "jsonld",
            "aria-controls": "export-panel-jsonld",
            class: ne({ active: d.value === "jsonld" }),
            tabindex: d.value === "jsonld" ? 0 : -1,
            onClick: N[1] || (N[1] = (J) => d.value = "jsonld")
          }, "JSON-LD", 10, Dp),
          G("button", {
            role: "tab",
            "aria-selected": d.value === "turtle",
            "aria-controls": "export-panel-turtle",
            class: ne({ active: d.value === "turtle" }),
            tabindex: d.value === "turtle" ? 0 : -1,
            onClick: N[2] || (N[2] = (J) => d.value = "turtle")
          }, "Turtle", 10, Ip),
          G("button", {
            role: "tab",
            "aria-selected": d.value === "rdfxml",
            "aria-controls": "export-panel-rdfxml",
            class: ne({ active: d.value === "rdfxml" }),
            tabindex: d.value === "rdfxml" ? 0 : -1,
            onClick: N[3] || (N[3] = (J) => d.value = "rdfxml")
          }, "RDF/XML", 10, Op)
        ], 8, Tp),
        G("div", Fp, [
          G("div", {
            id: "export-panel-jsonld",
            role: "tabpanel",
            "aria-labelledby": "export-tab-jsonld",
            hidden: d.value !== "jsonld"
          }, [
            G("pre", null, ht(w.value), 1)
          ], 8, Rp),
          G("div", {
            id: "export-panel-turtle",
            role: "tabpanel",
            "aria-labelledby": "export-tab-turtle",
            hidden: d.value !== "turtle"
          }, [
            G("pre", null, ht(v.value), 1)
          ], 8, Np),
          G("div", {
            id: "export-panel-rdfxml",
            role: "tabpanel",
            "aria-labelledby": "export-tab-rdfxml",
            hidden: d.value !== "rdfxml"
          }, [
            G("pre", null, ht(x.value), 1)
          ], 8, zp)
        ]),
        G("div", jp, [
          G("span", $p, ht(y.value ? h.lang === "de" ? "Kopiert!" : "Copied!" : ""), 1),
          G("button", {
            class: "btn-copy",
            onClick: U
          }, ht(h.lang === "de" ? "In Zwischenablage kopieren" : "Copy to clipboard"), 1),
          G("button", {
            class: "btn-download",
            onClick: A
          }, ht(h.lang === "de" ? "Herunterladen" : "Download"), 1)
        ])
      ], 512)
    ], 32));
  }
}, k0 = /* @__PURE__ */ Se(Up, [["__scopeId", "data-v-41416ede"]]);
function yl(h) {
  return typeof h == "string" && (h.startsWith("http://") || h.startsWith("https://"));
}
const vl = {
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
}, bl = [
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
], xl = {
  "vcard:hasEmail": (h) => h.startsWith("mailto:") ? h.slice(7) : h,
  "foaf:mbox": (h) => h.startsWith("mailto:") ? h.slice(7) : h
};
class Vp {
  fromJSONLD(l, d) {
    const y = JSON.parse(l), k = (d == null ? void 0 : d.fields) || {};
    let I = y, w = {};
    if (Array.isArray(y["@graph"])) {
      for (const J of y["@graph"])
        J["@id"] && (w[J["@id"]] = J);
      const A = (d == null ? void 0 : d.rootClass) || "dcat:Dataset", j = [A, gl(A)], N = (J) => {
        const X = J["@type"];
        return (Array.isArray(X) ? X : X ? [X] : []).some((Q) => j.includes(Q));
      };
      I = y["@graph"].find(N) ?? y["@graph"].find((J) => {
        const X = J["@type"];
        return !(Array.isArray(X) ? X : X ? [X] : []).some((Q) => Q === "rdfs:Resource" || Q.endsWith("#Resource") || Q.endsWith("/Resource"));
      }) ?? y["@graph"][0] ?? y;
    }
    const v = (A) => {
      if (!A.startsWith("http")) return A;
      for (const [j, N] of Object.entries(vl))
        if (A.startsWith(N)) return `${j}:${A.slice(N.length)}`;
      return A;
    }, x = (A) => {
      if (Array.isArray(A)) return A.map(x);
      if (A && typeof A == "object") {
        if (Object.keys(A).length === 1 && A["@id"])
          return w[A["@id"]] ? x(w[A["@id"]]) : A["@id"];
        const N = {};
        for (const [J, X] of Object.entries(A)) N[J] = x(X);
        return N;
      }
      return A;
    }, R = {};
    for (const [A, j] of Object.entries(I))
      R[v(A)] = x(j);
    const U = {};
    for (const [A, j] of Object.entries(k)) {
      const N = R[A];
      if (N == null) continue;
      const J = this._deserializeJSONLD(N, j), X = this._encodeIfTransformed(this._coerceToFieldType(J, j), j);
      X != null && !this._isInvalid(X, j) && (U[A] = X);
    }
    if (!U["dct:identifier"] && I["@id"] && yl(I["@id"])) {
      const A = k["dct:identifier"];
      (!A || !this._isInvalid(I["@id"], A)) && (U["dct:identifier"] = A != null && A.multiple ? [I["@id"]] : I["@id"]);
    }
    return U;
  }
  fromRDFXML(l, d) {
    const k = new DOMParser().parseFromString(l, "application/xml"), I = k.querySelector("parsererror");
    if (I) throw new Error(I.textContent);
    const w = "http://www.w3.org/ns/dcat#", v = "http://www.w3.org/1999/02/22-rdf-syntax-ns#", x = "http://www.w3.org/XML/1998/namespace", R = k.getElementsByTagNameNS(w, "Dataset")[0];
    if (!R) throw new Error("Kein dcat:Dataset gefunden");
    const U = {}, A = /* @__PURE__ */ new Map();
    let j = 0;
    const N = (Q, Et) => {
      U[Q] || (U[Q] = []), U[Q].push(Et);
    }, J = R.getAttributeNS(v, "about");
    J && N("dct:identifier", { termType: "NamedNode", value: J });
    for (const Q of R.children) {
      const Et = Q.namespaceURI + Q.localName, At = this._toPrefixed(Et), pe = Q.getAttributeNS(v, "resource");
      if (pe) {
        N(At, { termType: "NamedNode", value: pe });
        continue;
      }
      const Mt = Q.getElementsByTagNameNS(v, "Description")[0] || (Q.children.length > 0 ? Q.children[0] : null);
      if (Mt) {
        const re = `_:bn${j++}`, ee = [];
        if (!(Mt.namespaceURI === v && Mt.localName === "Description")) {
          const Kt = Mt.namespaceURI + Mt.localName;
          ee.push({ subject: { value: re }, predicate: { value: v + "type" }, object: { termType: "NamedNode", value: Kt } });
        }
        for (const Kt of Mt.children) {
          const me = Kt.namespaceURI + Kt.localName, Ge = Kt.getAttributeNS(v, "resource");
          if (Ge)
            ee.push({ subject: { value: re }, predicate: { value: me }, object: { termType: "NamedNode", value: Ge } });
          else {
            const be = Kt.getAttributeNS(x, "lang") || Kt.getAttribute("xml:lang") || "";
            ee.push({ subject: { value: re }, predicate: { value: me }, object: { termType: "Literal", value: Kt.textContent, language: be } });
          }
        }
        A.set(re, ee), N(At, { termType: "BlankNode", value: re });
        continue;
      }
      const Ct = Q.getAttributeNS(x, "lang") || Q.getAttribute("xml:lang") || "", Dt = Q.getAttributeNS(v, "datatype") || "";
      N(At, { termType: "Literal", value: Q.textContent, language: Ct, datatype: Dt });
    }
    const X = (d == null ? void 0 : d.fields) || {}, dt = {};
    for (const [Q, Et] of Object.entries(X)) {
      const At = U[Q];
      if (!(At != null && At.length)) continue;
      const pe = this._deserializeTurtleObjects(At, Et, A), Mt = this._encodeIfTransformed(this._coerceToFieldType(pe, Et), Et);
      Mt != null && !this._isInvalid(Mt, Et) && (dt[Q] = Mt);
    }
    return dt;
  }
  async fromTurtle(l, d) {
    const y = this._normalizePrefixes(l), k = await this._parseTurtle(y);
    return this._quadsToFormData(k, d);
  }
  // ── Preprocessing ──────────────────────────────────────────────────────────
  _normalizePrefixes(l) {
    return l.replace(/^PREFIX\s+(\S+)\s+(<[^>]+>)\s*$/gim, "@prefix $1 $2 .");
  }
  // ── JSON-LD ────────────────────────────────────────────────────────────────
  _deserializeJSONLD(l, d) {
    const { type: y, multiple: k } = d;
    if (y === "langstring") {
      if (k)
        return (Array.isArray(l) ? l : [l]).map((x) => x && typeof x == "object" && "@value" in x ? { value: x["@value"], lang: x["@language"] || "de" } : { value: String(x), lang: "de" }).filter((x) => x.value);
      if (Array.isArray(l)) {
        const v = {};
        for (const x of l)
          x && typeof x == "object" && "@value" in x && (v[x["@language"] || "de"] = x["@value"]);
        return Object.keys(v).length ? v : { de: "" };
      }
      return typeof l == "object" && !("@value" in l) ? l : typeof l == "object" && "@value" in l ? { [l["@language"] || "de"]: l["@value"] } : { de: String(l) };
    }
    if (y === "multiselect")
      return (Array.isArray(l) ? l : [l]).map((x) => typeof x == "string" ? x : (x == null ? void 0 : x["@id"]) || String(x));
    if (y === "distribution-editor")
      return (Array.isArray(l) ? l : [l]).map((x) => this._importDistributionJSONLD(x)).filter((x) => x["dcat:accessURL"]);
    if (y === "object") {
      if (typeof l != "object" || Array.isArray(l)) return {};
      const v = {};
      for (const [x, R] of Object.entries(l)) {
        if (x === "@type") {
          const j = Array.isArray(R) ? R[0] : R;
          j && (v["rdf:type"] = this._toPrefixed(String(j)));
          continue;
        }
        if (x.startsWith("@")) continue;
        let U;
        if (typeof R == "string") U = R;
        else if (R && typeof R == "object" && "@id" in R) U = R["@id"];
        else if (R && typeof R == "object" && "@value" in R) U = R["@value"];
        else continue;
        const A = xl[x];
        v[x] = A ? A(U) : U;
      }
      return v;
    }
    const I = (v) => typeof v == "string" ? this._scalarValue(v, d) : v && typeof v == "object" && "@value" in v ? this._scalarValue(v["@value"], d) : v && typeof v == "object" && "@id" in v ? this._scalarValue(v["@id"], d) : this._scalarValue(String(v), d), w = Array.isArray(l) ? l[0] != null ? I(l[0]) : "" : I(l);
    return k ? w ? [w] : [""] : w;
  }
  // ── Turtle ─────────────────────────────────────────────────────────────────
  async _parseTurtle(l) {
    return new Promise((d, y) => {
      const k = new Zo(), I = [];
      k.parse(l, (w, v) => {
        if (w) return y(w);
        v ? I.push(v) : d(I);
      });
    });
  }
  _quadsToFormData(l, d) {
    const y = /* @__PURE__ */ new Map();
    for (const A of l) {
      const j = A.subject.value;
      y.has(j) || y.set(j, []), y.get(j).push(A);
    }
    const k = gl((d == null ? void 0 : d.rootClass) || "dcat:Dataset"), I = "http://www.w3.org/1999/02/22-rdf-syntax-ns#type";
    let w = null;
    for (const [A, j] of y)
      if (j.some((N) => N.predicate.value === I && N.object.value === k)) {
        w = A;
        break;
      }
    w || (w = [...y.keys()][0]);
    const v = y.get(w) || [], x = {};
    for (const A of v) {
      const j = this._toPrefixed(A.predicate.value);
      x[j] || (x[j] = []), x[j].push(A.object);
    }
    const R = (d == null ? void 0 : d.fields) || {}, U = {};
    for (const [A, j] of Object.entries(R)) {
      const N = x[A];
      if (!(N != null && N.length)) continue;
      const J = this._deserializeTurtleObjects(N, j, y), X = this._encodeIfTransformed(this._coerceToFieldType(J, j), j);
      X != null && !this._isInvalid(X, j) && (U[A] = X);
    }
    if (!U["dct:identifier"] && w && yl(w)) {
      const A = R["dct:identifier"];
      (!A || !this._isInvalid(w, A)) && (U["dct:identifier"] = w);
    }
    return U;
  }
  _deserializeTurtleObjects(l, d, y) {
    const { type: k, multiple: I } = d;
    if (k === "langstring") {
      const x = l.filter((U) => U.termType === "Literal" && U.value);
      if (I)
        return x.map((U) => ({ value: U.value, lang: U.language || "de" }));
      const R = {};
      for (const U of x) R[U.language || "de"] = U.value;
      return R;
    }
    if (k === "multiselect")
      return l.map((x) => x.value);
    if (k === "distribution-editor")
      return l.filter((x) => x.termType === "BlankNode" || x.termType === "NamedNode").map((x) => this._importDistributionTurtle(y.get(x.value) || [])).filter((x) => x["dcat:accessURL"]);
    if (k === "object") {
      const x = l.find((N) => N.termType === "BlankNode" || N.termType === "NamedNode");
      if (!x) return {};
      const R = y.get(x.value) || [], U = new Set((d.subFields || []).map((N) => N.id)), A = "http://www.w3.org/1999/02/22-rdf-syntax-ns#type", j = {};
      for (const N of R) {
        const J = this._toPrefixed(N.predicate.value);
        if (N.predicate.value === A) {
          j["rdf:type"] = this._toPrefixed(N.object.value);
          continue;
        }
        if (U.size > 0 && !U.has(J)) continue;
        const X = xl[J];
        j[J] = X ? X(N.object.value) : N.object.value;
      }
      return j;
    }
    const w = l.filter((x) => x.termType === "Literal" || x.termType === "NamedNode");
    if (!w.length) return I ? [""] : "";
    const v = w.map((x) => this._scalarValue(x.value, d)).filter(Boolean);
    return I ? v.length ? v : [""] : v[0] ?? "";
  }
  // ── Helpers ────────────────────────────────────────────────────────────────
  _toPrefixed(l) {
    for (const [d, y] of Object.entries(vl))
      if (l.startsWith(y)) return `${d}:${l.slice(y.length)}`;
    return l;
  }
  _scalarValue(l, d) {
    return d.type === "date" && l.length > 10 && l[10] === "T" ? l.slice(0, 10) : l;
  }
  // Ensure the value matches what the form expects for this field type
  _coerceToFieldType(l, d) {
    const { type: y, multiple: k } = d;
    return y === "langstring" ? k ? Array.isArray(l) ? l : [{ value: String(l || ""), lang: "de" }] : typeof l != "object" || Array.isArray(l) ? { de: String(l || "") } : l : y === "multiselect" ? Array.isArray(l) ? l : l ? [String(l)] : [] : y === "distribution-editor" ? Array.isArray(l) ? l : [] : y === "object" ? typeof l != "object" || Array.isArray(l) ? {} : l : k ? Array.isArray(l) ? l : l ? [String(l)] : [""] : l != null ? String(l) : "";
  }
  _importDistributionJSONLD(l) {
    if (!l || typeof l != "object") return {};
    const d = { "rdf:type": "dcat:Distribution" };
    for (const y of bl) {
      const k = l[y];
      if (k == null) continue;
      if (typeof k == "string") {
        d[y] = k;
        continue;
      }
      if (typeof k == "object" && "@id" in k) {
        d[y] = k["@id"];
        continue;
      }
      if (typeof k == "object" && "@value" in k) {
        d[y] = k["@value"];
        continue;
      }
      const I = Array.isArray(k) ? k[0] : null;
      I != null && (d[y] = typeof I == "string" ? I : I["@id"] || I["@value"] || "");
    }
    return d;
  }
  _importDistributionTurtle(l) {
    const d = {};
    for (const y of l) {
      const k = this._toPrefixed(y.predicate.value);
      if (!bl.includes(k)) continue;
      let I = y.object.value;
      (k === "dct:issued" || k === "dct:modified") && I.length > 10 && (I = I.slice(0, 10)), d[k] = I;
    }
    return d;
  }
  // Apply encode transform so the stored form is validated, not the raw display form.
  // uriSuffix.encode is idempotent when the value is already a full URI.
  _encodeIfTransformed(l, d) {
    return !d.transform || l == null ? l : d.multiple && Array.isArray(l) ? l.map((y) => Vn(d.transform, y, d.transformOptions, y)) : Vn(d.transform, l, d.transformOptions, l);
  }
  // Returns true if the value should be discarded (fails validation)
  _isInvalid(l, d) {
    if (!d.validate) return !1;
    const y = La[d.validate];
    if (!y || d.multiple && Array.isArray(l)) return !1;
    try {
      const k = y(l, "de");
      return k && k.length > 0;
    } catch {
      return !1;
    }
  }
}
const Gp = { class: "import-header" }, Zp = { id: "import-heading" }, qp = ["aria-label"], Hp = ["aria-label"], Kp = ["aria-selected", "tabindex"], Wp = ["aria-selected", "tabindex"], Jp = ["aria-selected", "tabindex"], Xp = { class: "import-body" }, Yp = { class: "file-row" }, Qp = { class: "btn-file" }, t0 = ["accept", "aria-label"], e0 = {
  key: 0,
  class: "filename",
  "aria-live": "polite"
}, i0 = ["placeholder", "aria-label", "aria-describedby"], n0 = {
  key: 0,
  id: "import-error",
  class: "import-error",
  role: "alert"
}, r0 = { class: "import-actions" }, a0 = ["disabled"], s0 = {
  __name: "ImportPanel",
  props: {
    config: Object,
    lang: String
  },
  emits: ["import", "close"],
  setup(h, { emit: l }) {
    const d = h, y = l, k = Xt("jsonld"), I = Xt(""), w = Xt(""), v = Xt(""), x = Xt(null);
    Lr(async () => {
      var N, J, X;
      await br(), (X = ((N = x.value) == null ? void 0 : N.querySelector('[role="tab"]')) || ((J = x.value) == null ? void 0 : J.querySelector("button"))) == null || X.focus();
    });
    const R = Jt(() => k.value === "jsonld" ? `{
  "@context": { ... },
  "@type": "dcat:Dataset",
  "dct:title": { "de": "...", "en": "..." },
  ...
}` : k.value === "turtle" ? `@prefix dct: <http://purl.org/dc/terms/> .
<https://...> a dcat:Dataset ;
    dct:title "..."@de .` : `<?xml version="1.0" encoding="UTF-8"?>
<rdf:RDF xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#"
         xmlns:dct="http://purl.org/dc/terms/"
         xmlns:dcat="http://www.w3.org/ns/dcat#">
  <dcat:Dataset rdf:about="https://...">
    <dct:title xml:lang="de">...</dct:title>
  </dcat:Dataset>
</rdf:RDF>`);
    function U(j) {
      const N = j.target.files[0];
      if (!N) return;
      w.value = N.name, v.value = "";
      const J = new FileReader();
      J.onload = (X) => {
        I.value = X.target.result;
      }, J.readAsText(N), j.target.value = "";
    }
    async function A() {
      v.value = "";
      const j = new Vp();
      try {
        let N;
        k.value === "jsonld" ? N = j.fromJSONLD(I.value, d.config) : k.value === "turtle" ? N = await j.fromTurtle(I.value, d.config) : N = j.fromRDFXML(I.value, d.config), y("import", N);
      } catch (N) {
        v.value = N.message;
      }
    }
    return (j, N) => (ut(), ct("div", {
      class: "import-overlay",
      onClick: N[6] || (N[6] = De((J) => j.$emit("close"), ["self"])),
      onKeydown: N[7] || (N[7] = rn((J) => j.$emit("close"), ["esc"]))
    }, [
      G("div", {
        class: "import-panel",
        role: "dialog",
        "aria-modal": "true",
        "aria-labelledby": "import-heading",
        ref_key: "panelEl",
        ref: x
      }, [
        G("div", Gp, [
          G("h2", Zp, ht(h.lang === "de" ? "Importieren" : "Import"), 1),
          G("button", {
            class: "close-btn",
            "aria-label": h.lang === "de" ? "Import schließen" : "Close import",
            onClick: N[0] || (N[0] = (J) => j.$emit("close"))
          }, "✕", 8, qp)
        ]),
        G("div", {
          class: "import-tabs",
          role: "tablist",
          "aria-label": h.lang === "de" ? "Importformat" : "Import format"
        }, [
          G("button", {
            role: "tab",
            "aria-selected": k.value === "jsonld",
            "aria-controls": "import-panel-jsonld",
            class: ne({ active: k.value === "jsonld" }),
            tabindex: k.value === "jsonld" ? 0 : -1,
            onClick: N[1] || (N[1] = (J) => k.value = "jsonld")
          }, "JSON-LD", 10, Kp),
          G("button", {
            role: "tab",
            "aria-selected": k.value === "turtle",
            "aria-controls": "import-panel-turtle",
            class: ne({ active: k.value === "turtle" }),
            tabindex: k.value === "turtle" ? 0 : -1,
            onClick: N[2] || (N[2] = (J) => k.value = "turtle")
          }, "Turtle", 10, Wp),
          G("button", {
            role: "tab",
            "aria-selected": k.value === "rdfxml",
            "aria-controls": "import-panel-rdfxml",
            class: ne({ active: k.value === "rdfxml" }),
            tabindex: k.value === "rdfxml" ? 0 : -1,
            onClick: N[3] || (N[3] = (J) => k.value = "rdfxml")
          }, "RDF/XML", 10, Jp)
        ], 8, Hp),
        G("div", Xp, [
          G("div", Yp, [
            G("label", Qp, [
              Gn(ht(h.lang === "de" ? "Datei öffnen …" : "Open file …") + " ", 1),
              G("input", {
                type: "file",
                accept: k.value === "jsonld" ? ".json,.jsonld" : k.value === "turtle" ? ".ttl,.turtle" : ".rdf,.xml",
                "aria-label": h.lang === "de" ? "RDF-Datei auswählen" : "Select RDF file",
                onChange: U
              }, null, 40, t0)
            ]),
            w.value ? (ut(), ct("span", e0, ht(w.value), 1)) : Vt("", !0)
          ]),
          wl(G("textarea", {
            "onUpdate:modelValue": N[4] || (N[4] = (J) => I.value = J),
            class: "import-textarea",
            placeholder: R.value,
            "aria-label": h.lang === "de" ? "RDF-Inhalt zum Importieren" : "RDF content to import",
            "aria-describedby": v.value ? "import-error" : void 0,
            spellcheck: "false"
          }, null, 8, i0), [
            [Cl, I.value]
          ]),
          v.value ? (ut(), ct("div", n0, "⚠ " + ht(v.value), 1)) : Vt("", !0)
        ]),
        G("div", r0, [
          G("button", {
            class: "btn-cancel",
            onClick: N[5] || (N[5] = (J) => j.$emit("close"))
          }, ht(h.lang === "de" ? "Abbrechen" : "Cancel"), 1),
          G("button", {
            class: "btn-import",
            disabled: !I.value.trim(),
            onClick: A
          }, ht(h.lang === "de" ? "Importieren" : "Import"), 9, a0)
        ])
      ], 512)
    ], 32));
  }
}, E0 = /* @__PURE__ */ Se(s0, [["__scopeId", "data-v-721b75f6"]]), o0 = { class: "standard-selector" }, l0 = ["value"], u0 = ["value"], h0 = {
  __name: "StandardSelector",
  props: {
    standards: Array,
    modelValue: String
  },
  emits: ["update:modelValue"],
  setup(h) {
    return (l, d) => (ut(), ct("div", o0, [
      d[1] || (d[1] = G("label", null, "Standard:", -1)),
      G("select", {
        value: h.modelValue,
        onChange: d[0] || (d[0] = (y) => l.$emit("update:modelValue", y.target.value))
      }, [
        (ut(!0), ct(se, null, Pe(h.standards, (y) => (ut(), ct("option", {
          key: y.id,
          value: y.id
        }, ht(y.label), 9, u0))), 128))
      ], 40, l0)
    ]));
  }
}, M0 = /* @__PURE__ */ Se(h0, [["__scopeId", "data-v-5412301f"]]), We = "http://www.w3.org/ns/shacl#", ba = "http://www.w3.org/1999/02/22-rdf-syntax-ns#", Un = "http://www.w3.org/2001/XMLSchema#", c0 = "https://piveau.eu/ns/voc#", d0 = {
  [`${Un}string`]: "text",
  [`${Un}date`]: "date",
  [`${Un}dateTime`]: "date",
  [`${Un}anyURI`]: "uri",
  [`${ba}langString`]: "langstring",
  [`${Un}integer`]: "text",
  [`${Un}decimal`]: "text",
  [`${Un}nonNegativeInteger`]: "text"
};
class f0 {
  async parse(l) {
    var w;
    const d = await ql(l), y = {};
    for (const [v, x] of d.entries()) {
      if (!x.filter((N) => N.p === `${ba}type`).map((N) => N.o.value).includes(`${We}NodeShape`)) continue;
      const U = (w = x.find((N) => N.p === `${We}targetClass`)) == null ? void 0 : w.o.value, A = x.filter((N) => N.p === `${We}property`).map((N) => N.o.value), j = {};
      for (const N of A) {
        const J = d.get(N) || [], X = p0(J, d);
        X && (j[X.id] = X);
      }
      y[v] = { subject: v, targetClass: U, fields: j };
    }
    const k = /* @__PURE__ */ new Set();
    for (const v of Object.values(y))
      for (const x of Object.values(v.fields)) {
        if (!x._linkedShape) continue;
        const R = x._linkedShape;
        delete x._linkedShape;
        const U = y[R];
        U && (x.subFields = U.fields, k.add(R));
      }
    const I = {};
    for (const [v, x] of Object.entries(y)) {
      const R = x.targetClass || v;
      I[R] = {
        targetClass: x.targetClass,
        fields: x.fields,
        embedded: k.has(v)
      };
    }
    return I;
  }
}
function fa(h, l, d) {
  const y = h.filter((I) => I.p === l);
  if (d) {
    const I = y.find((w) => w.o.language === d);
    if (I) return I.o.value;
  }
  const k = y[0];
  return k ? k.o.value : null;
}
function p0(h, l) {
  var pe, Mt, Ct, Dt, re, ee;
  const d = h.find((Yt) => Yt.p === `${We}path`);
  if (!d) return null;
  const y = d.o.value, k = Ca(y), I = fa(h, `${We}name`, "de"), w = fa(h, `${We}name`, "en"), v = fa(h, `${We}name`, null), x = fa(h, `${We}description`, "de"), R = fa(h, `${We}description`, "en"), U = (pe = h.find((Yt) => Yt.p === `${We}datatype`)) == null ? void 0 : pe.o.value, A = (Mt = h.find((Yt) => Yt.p === `${We}nodeKind`)) == null ? void 0 : Mt.o.value, j = parseInt(((Ct = h.find((Yt) => Yt.p === `${We}minCount`)) == null ? void 0 : Ct.o.value) || "0"), N = (Dt = h.find((Yt) => Yt.p === `${We}maxCount`)) == null ? void 0 : Dt.o.value, J = parseFloat(((re = h.find((Yt) => Yt.p === `${We}order`)) == null ? void 0 : re.o.value) || "999"), X = h.filter((Yt) => Yt.p === `${We}in`), dt = _0(X, l), Q = (ee = h.find((Yt) => Yt.p === `${c0}mappingLink`)) == null ? void 0 : ee.o.value;
  let Et = "text";
  Q ? Et = "object" : dt.length > 0 ? Et = "select" : U ? Et = d0[U] || "text" : A === `${We}IRI` && (Et = "uri");
  const At = {
    id: k,
    path: y,
    label: { de: I || v || k, en: w || v || k },
    hint: { de: x || "", en: R || "" },
    type: Et,
    required: j > 0,
    // absence of sh:maxCount means unbounded → multiple: true
    multiple: N === void 0 || parseInt(N) !== 1,
    order: J,
    options: dt,
    visible: !0
  };
  return Q && (At._linkedShape = Q), At;
}
function _0(h, l) {
  const d = [];
  for (const y of h) Kl(y.o.value, l, d);
  return d;
}
function Kl(h, l, d) {
  if (!h || h === `${ba}nil`) return;
  const y = l.get(h) || [], k = y.find((w) => w.p === `${ba}first`), I = y.find((w) => w.p === `${ba}rest`);
  if (k) {
    const w = k.o.value;
    d.push({ value: w, label: { de: Ca(w), en: Ca(w) } });
  }
  I && Kl(I.o.value, l, d);
}
class m0 {
  constructor() {
    this._cache = /* @__PURE__ */ new Map();
  }
  async load(l, d) {
    if (this._cache.has(l)) return this._cache.get(l);
    try {
      const y = await fetch(l);
      if (!y.ok) throw new Error(`HTTP ${y.status}`);
      const k = await y.json(), I = this._normalize(k);
      return this._cache.set(l, I), I;
    } catch (y) {
      if (d)
        return console.warn(`[VocabularyLoader] Primary source failed (${l}): ${y.message} — trying fallback`), this.load(d);
      throw new Error(`Failed to load vocabulary from ${l}: ${y.message}`);
    }
  }
  _normalize(l) {
    var d;
    return (d = l == null ? void 0 : l.results) != null && d.bindings ? this._normalizeSparql(l.results.bindings) : l != null && l["@graph"] ? this._normalizeJsonLD(l["@graph"]) : Array.isArray(l) ? l.map((y) => y.value !== void 0 && typeof y.value == "string" ? y : y.uri !== void 0 ? { value: y.uri, label: y.prefLabel || {} } : null).filter(Boolean) : [];
  }
  _normalizeJsonLD(l) {
    return l.flatMap((d) => {
      const y = d["@id"];
      if (!y) return [];
      const k = d["skos:prefLabel"] || d["http://www.w3.org/2004/02/skos/core#prefLabel"] || [], I = {}, w = Array.isArray(k) ? k : [k];
      for (const v of w) {
        const x = v["@language"], R = v["@value"];
        x && R && (I[x] = R);
      }
      return Object.keys(I).length ? [{ value: y, label: I }] : [];
    });
  }
  _normalizeSparql(l) {
    var y, k, I, w;
    const d = /* @__PURE__ */ new Map();
    for (const v of l) {
      const x = ((y = v.concept) == null ? void 0 : y.value) || ((k = v.uri) == null ? void 0 : k.value), R = (I = v.label) == null ? void 0 : I["xml:lang"], U = (w = v.label) == null ? void 0 : w.value;
      !x || !R || !U || (d.has(x) || d.set(x, { value: x, label: {} }), d.get(x).label[R] = U);
    }
    return [...d.values()];
  }
}
class B0 {
  async resolve(l) {
    const [d, y] = await Promise.all([
      this.loadSHACL(l),
      this.loadUIConfig(l)
    ]), I = await new f0().parse(d), w = y.rootClass, v = {};
    for (const j of Object.values(I))
      j.embedded || w && j.targetClass && Ca(j.targetClass) !== w || Object.assign(v, j.fields);
    const x = { ...v }, R = y.fields || {};
    for (const [j, N] of Object.entries(R))
      x[j] ? x[j] = {
        ...x[j],
        ...N,
        label: { ...x[j].label, ...N.label || {} },
        hint: { ...x[j].hint, ...N.hint || {} }
      } : x[j] = { id: j, type: "text", visible: !0, order: 999, ...N };
    const U = (y.groups || []).map((j) => ({
      ...j,
      fields: j.fields.filter((N) => x[N] && x[N].visible !== !1)
    }));
    await this.resolveVocabularies(x);
    const A = await this.resolveVocabularies(x);
    return {
      standard: l,
      version: y.version,
      rootClass: w || "dcat:Dataset",
      groups: U,
      fields: x,
      vocabWarnings: A
    };
  }
  async resolveVocabularies(l) {
    const d = new m0(), y = [], k = [];
    for (const [I, w] of Object.entries(l))
      w.optionsSource && k.push(
        d.load(w.optionsSource, w.optionsSourceFallback).then((v) => {
          w.options = [...v, ...w.options || []];
        }).catch((v) => {
          console.warn(`[VocabularyLoader] ${I}: ${v.message}`), y.push({ field: I, message: v.message });
        })
      );
    return await Promise.all(k), y;
  }
  async loadSHACL(l) {
    const d = await fetch(Ds(`shacl/${l}.ttl`));
    if (!d.ok) throw new Error(`Failed to load SHACL for ${l}`);
    return d.text();
  }
  async loadUIConfig(l) {
    const d = await fetch(Ds(`config/ui-config.${l}.json`));
    if (!d.ok) throw new Error(`Failed to load UI config for ${l}`);
    return d.json();
  }
}
const Is = {
  // Sets the field to today's date whenever a title is present.
  // Always overwrites — suitable for "last modified" fields that should stay current.
  setTodayIfTitle: (h) => {
    const l = h["dct:title"];
    return (l == null ? void 0 : l.de) || (l == null ? void 0 : l.en) || typeof l == "string" && l ? (/* @__PURE__ */ new Date()).toISOString().slice(0, 10) : void 0;
  },
  // Sets the field to today's date only if it has no value yet.
  // Preserves imported or manually entered values — ideal for hidden auto-filled fields.
  setTodayIfTitleAndEmpty: (h, l, d) => {
    if (h[d]) return;
    const y = h["dct:title"];
    return (y == null ? void 0 : y.de) || (y == null ? void 0 : y.en) || typeof y == "string" && y ? (/* @__PURE__ */ new Date()).toISOString().slice(0, 10) : void 0;
  },
  // Always sets the field to today's date.
  setToday: () => (/* @__PURE__ */ new Date()).toISOString().slice(0, 10),
  // Sets dct:language from the current UI language if the field is empty.
  setLanguageFromUI: (h, l) => h["dct:language"] ? void 0 : {
    de: "http://publications.europa.eu/resource/authority/language/DEU",
    en: "http://publications.europa.eu/resource/authority/language/ENG",
    fr: "http://publications.europa.eu/resource/authority/language/FRA"
  }[l]
};
function g0(h, l) {
  return h === l ? !0 : typeof h != typeof l || h === null || l === null ? !1 : JSON.stringify(h) === JSON.stringify(l);
}
function y0(h, l, d) {
  if (!(h != null && h.fields)) return l;
  let y = !1;
  const k = { ...l };
  for (const [I, w] of Object.entries(h.fields)) {
    if (!w.compute) continue;
    const v = Is[w.compute];
    if (!v) {
      console.warn(`[fieldComputes] Unknown compute function: "${w.compute}"`);
      continue;
    }
    const x = v(k, d, I);
    x !== void 0 && !g0(x, k[I]) && (k[I] = x, y = !0);
  }
  return y ? k : l;
}
function v0(h, l) {
  const d = typeof h == "string" ? { [h]: l } : h;
  for (const [y, k] of Object.entries(d)) {
    if (Is[y]) {
      console.warn(`[fieldComputes] "${y}" already exists — skipping. Use a unique name.`);
      continue;
    }
    Is[y] = k;
  }
}
const b0 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  applyComputes: y0,
  fieldComputeFns: Is,
  registerCompute: v0
}, Symbol.toStringTag, { value: "Module" })), P0 = [
  { id: "dcat-ap-at", label: "DCAT-AP.at" },
  { id: "geodcat", label: "GeoDCAT" },
  { id: "dcat-ap-3", label: "DCAT-AP 3.0" }
], S0 = {
  install(h) {
    h.component("MetadataForm", Ep);
  }
};
export {
  P0 as BUILTIN_STANDARDS,
  bd as DistributionModal,
  k0 as ExportPanel,
  Tc as FileUploader,
  B0 as FormConfigResolver,
  E0 as ImportPanel,
  Ep as MetadataForm,
  S0 as OntoFormPlugin,
  Bp as RDFExporter,
  Vp as RDFImporter,
  Uf as SHACLValidationService,
  M0 as StandardSelector,
  pl as ValidationReport,
  m0 as VocabularyLoader,
  Ds as assetUrl,
  w0 as configure,
  v0 as registerCompute,
  kc as registerTransform,
  cf as registerValidator,
  ff as registerVisibility
};
//# sourceMappingURL=onto-form.es.js.map
