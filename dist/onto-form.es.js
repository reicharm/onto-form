var Bu = Object.defineProperty;
var Pu = (h, l, d) => l in h ? Bu(h, l, { enumerable: !0, configurable: !0, writable: !0, value: d }) : h[l] = d;
var Rt = (h, l, d) => Pu(h, typeof l != "symbol" ? l + "" : l, d);
import { ref as Xt, watchEffect as Su, openBlock as ht, createElementBlock as ft, createElementVNode as $, toDisplayString as dt, Fragment as re, renderList as Me, unref as Au, createCommentVNode as Gt, computed as Jt, onMounted as yr, normalizeClass as ae, createBlock as Bi, watch as Vn, onBeforeUnmount as yl, createTextVNode as Un, withKeys as en, withModifiers as Te, withDirectives as vl, vModelText as bl, nextTick as gr, resolveDynamicComponent as Ro, Teleport as Tu, createVNode as Ss, normalizeStyle as Du } from "vue";
const Iu = {
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
    const C = Array.from(y).map((D) => l[D % l.length]).join("");
    return h != null && h.prefix ? h.prefix + C : C;
  }
};
async function xl(h, l) {
  const d = Iu[h];
  return d ? d(l) ?? null : (console.warn(`[idGenerators] Unknown generator: "${h}"`), null);
}
const Ou = 5, ha = "ontoform:suggestions:";
let ol = {};
const pr = {
  /**
   * Inject user-specific suggestions from the embedding application.
   * Values appear at the top of the suggestion list and are not persisted.
   *
   * @param {{ [fieldId: string]: any[] }} contextMap
   */
  setUserContext(h) {
    ol = h ?? {};
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
    return ll([
      ...ol[h] ?? [],
      ...ra(h)
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
    var C;
    const l = this.get(h.id);
    if (!((C = h.suggestionsFrom) != null && C.length)) return l;
    const d = h.suggestionsMap || {}, y = h.suggestionsFrom.flatMap(
      (D) => this.get(D).map((x) => ul(x, d))
    );
    return ll([...l, ...y]);
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
    if (!Fu(l)) return;
    const d = ra(h), y = ca(l), C = d.filter((x) => ca(x) !== y), D = [l, ...C].slice(0, Ou);
    try {
      localStorage.setItem(ha + h, JSON.stringify(D));
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
    const d = ca(l), y = ra(h).filter((C) => ca(C) !== d);
    try {
      y.length ? localStorage.setItem(ha + h, JSON.stringify(y)) : localStorage.removeItem(ha + h);
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
    const d = ra(h.id);
    if (this.remove(h.id, l), ra(h.id).length < d.length || !((v = h.suggestionsFrom) != null && v.length)) return;
    const C = h.suggestionsMap || {}, D = Object.fromEntries(
      Object.entries(C).map(([k, F]) => [F, k])
    ), x = ul(l, D);
    for (const k of h.suggestionsFrom)
      this.remove(k, x);
  },
  /**
   * Removes all stored suggestions for a field from localStorage.
   * User-context values are not affected.
   *
   * @param {string} fieldId
   */
  clear(h) {
    try {
      localStorage.removeItem(ha + h);
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
    ], y = hl(h, l), C = hl(h, d);
    return y && C ? `${y} · ${C}` : y || C || Object.values(h).filter((x) => x && typeof x == "string").slice(0, 3).join(" · ") || JSON.stringify(h);
  }
};
function ra(h) {
  try {
    const l = localStorage.getItem(ha + h);
    return l ? JSON.parse(l) : [];
  } catch {
    return [];
  }
}
function ca(h) {
  return JSON.stringify(h);
}
function ll(h) {
  const l = /* @__PURE__ */ new Set(), d = [];
  for (const y of h) {
    const C = ca(y);
    l.has(C) || (l.add(C), d.push(y));
  }
  return d;
}
function ul(h, l) {
  if (!h || typeof h != "object" || !Object.keys(l).length) return h;
  const d = {};
  for (const [y, C] of Object.entries(h))
    d[l[y] ?? y] = C;
  return d;
}
function Fu(h) {
  return h == null ? !1 : typeof h == "object" ? Object.values(h).some((l) => l != null && l !== "") : String(h).trim() !== "";
}
function hl(h, l) {
  for (const d of l)
    if (h[d] && typeof h[d] == "string") return h[d];
  return null;
}
const Be = (h, l) => {
  const d = h.__vccOpts || h;
  for (const [y, C] of l)
    d[y] = C;
  return d;
}, Ru = {
  key: 0,
  class: "field-suggestions"
}, Nu = { class: "suggestions-label" }, zu = { class: "suggestions-list" }, ju = ["title", "onClick"], $u = ["aria-label", "onClick"], Uu = {
  __name: "FieldSuggestions",
  props: {
    field: { type: Object, required: !0 },
    lang: { type: String, default: "de" }
  },
  emits: ["select"],
  setup(h) {
    const l = h, d = Xt([]);
    Su(() => {
      d.value = pr.getFor(l.field);
    });
    function y(D) {
      const x = pr.label(D);
      return l.lang === "de" ? `Vorschlag „${x}" entfernen` : `Remove suggestion „${x}"`;
    }
    function C(D) {
      pr.removeFor(l.field, D), d.value = pr.getFor(l.field);
    }
    return (D, x) => d.value.length ? (ht(), ft("div", Ru, [
      $("span", Nu, dt(h.lang === "de" ? "Frühere Eingaben:" : "Previous entries:"), 1),
      $("div", zu, [
        (ht(!0), ft(re, null, Me(d.value, (v, k) => (ht(), ft("span", {
          key: k,
          class: "suggestion-chip"
        }, [
          $("button", {
            type: "button",
            class: "chip-label",
            title: h.lang === "de" ? "Diesen Wert übernehmen" : "Use this value",
            onClick: (F) => D.$emit("select", v)
          }, dt(Au(pr).label(v)), 9, ju),
          $("button", {
            type: "button",
            class: "chip-remove",
            "aria-label": y(v),
            onClick: (F) => C(v)
          }, "×", 8, $u)
        ]))), 128))
      ])
    ])) : Gt("", !0);
  }
}, Ll = /* @__PURE__ */ Be(Uu, [["__scopeId", "data-v-0a2fc9d2"]]), Vu = { class: "field" }, Gu = ["for"], Zu = {
  key: 0,
  class: "input-with-action"
}, Hu = ["id", "value", "placeholder"], qu = ["aria-label"], Ku = ["id", "value", "placeholder"], Wu = {
  key: 2,
  class: "hint"
}, Ju = {
  __name: "TextField",
  props: {
    field: Object,
    lang: String,
    modelValue: [String, Number]
  },
  emits: ["update:modelValue"],
  setup(h, { emit: l }) {
    const d = h, y = l, C = Jt(() => {
      var v, k;
      return ((v = d.field.label) == null ? void 0 : v[d.lang]) || ((k = d.field.label) == null ? void 0 : k.en) || d.field.id;
    }), D = Jt(() => {
      var v, k;
      return ((v = d.field.placeholder) == null ? void 0 : v[d.lang]) || ((k = d.field.placeholder) == null ? void 0 : k.en) || "";
    });
    async function x() {
      const v = await xl(d.field.generate, d.field.generateOptions);
      v != null && y("update:modelValue", v);
    }
    return yr(() => {
      d.field.generate && !d.modelValue && x();
    }), (v, k) => {
      var F;
      return ht(), ft("div", Vu, [
        $("label", {
          for: h.field.id,
          class: ae({ required: h.field.required || h.field.requiredIf })
        }, dt(C.value), 11, Gu),
        h.field.generate ? (ht(), ft("div", Zu, [
          $("input", {
            id: h.field.id,
            type: "text",
            value: h.modelValue || "",
            placeholder: D.value,
            onInput: k[0] || (k[0] = (Z) => v.$emit("update:modelValue", Z.target.value))
          }, null, 40, Hu),
          $("button", {
            type: "button",
            class: "btn-generate",
            "aria-label": h.lang === "de" ? `Neuen ${C.value} generieren` : `Generate new ${C.value}`,
            onClick: x
          }, "↺", 8, qu)
        ])) : (ht(), ft("input", {
          key: 1,
          id: h.field.id,
          type: "text",
          value: h.modelValue || "",
          placeholder: D.value,
          onInput: k[1] || (k[1] = (Z) => v.$emit("update:modelValue", Z.target.value))
        }, null, 40, Ku)),
        (F = h.field.hint) != null && F[h.lang] ? (ht(), ft("span", Wu, dt(h.field.hint[h.lang]), 1)) : Gt("", !0),
        h.field.remember ? (ht(), Bi(Ll, {
          key: 3,
          field: h.field,
          lang: h.lang,
          onSelect: k[2] || (k[2] = (Z) => v.$emit("update:modelValue", Z))
        }, null, 8, ["field", "lang"])) : Gt("", !0)
      ]);
    };
  }
}, mr = /* @__PURE__ */ Be(Ju, [["__scopeId", "data-v-c6b3ffa9"]]), Xu = { class: "field" }, Yu = ["for"], Qu = ["id", "value", "placeholder"], th = {
  key: 0,
  class: "hint"
}, eh = {
  __name: "TextareaField",
  props: {
    field: Object,
    lang: String,
    modelValue: String
  },
  emits: ["update:modelValue"],
  setup(h) {
    const l = h, d = Jt(() => {
      var C, D;
      return ((C = l.field.label) == null ? void 0 : C[l.lang]) || ((D = l.field.label) == null ? void 0 : D.en) || l.field.id;
    }), y = Jt(() => {
      var C, D;
      return ((C = l.field.placeholder) == null ? void 0 : C[l.lang]) || ((D = l.field.placeholder) == null ? void 0 : D.en) || "";
    });
    return (C, D) => {
      var x;
      return ht(), ft("div", Xu, [
        $("label", {
          for: h.field.id,
          class: ae({ required: h.field.required })
        }, dt(d.value), 11, Yu),
        $("textarea", {
          id: h.field.id,
          value: h.modelValue || "",
          placeholder: y.value,
          rows: "4",
          onInput: D[0] || (D[0] = (v) => C.$emit("update:modelValue", v.target.value))
        }, null, 40, Qu),
        (x = h.field.hint) != null && x[h.lang] ? (ht(), ft("span", th, dt(h.field.hint[h.lang]), 1)) : Gt("", !0)
      ]);
    };
  }
}, No = /* @__PURE__ */ Be(eh, [["__scopeId", "data-v-974fffb5"]]), ih = { class: "field" }, nh = ["for"], rh = ["id", "value"], ah = { value: "" }, sh = ["value"], oh = {
  key: 0,
  class: "hint"
}, lh = {
  __name: "SelectField",
  props: {
    field: Object,
    lang: String,
    modelValue: String
  },
  emits: ["update:modelValue"],
  setup(h) {
    const l = h, d = Jt(() => {
      var y, C;
      return ((y = l.field.label) == null ? void 0 : y[l.lang]) || ((C = l.field.label) == null ? void 0 : C.en) || l.field.id;
    });
    return (y, C) => {
      var D;
      return ht(), ft("div", ih, [
        $("label", {
          for: h.field.id,
          class: ae({ required: h.field.required })
        }, dt(d.value), 11, nh),
        $("select", {
          id: h.field.id,
          value: h.modelValue || "",
          onChange: C[0] || (C[0] = (x) => y.$emit("update:modelValue", x.target.value))
        }, [
          $("option", ah, dt(h.lang === "de" ? "— Bitte wählen —" : "— Please select —"), 1),
          (ht(!0), ft(re, null, Me(h.field.options, (x) => {
            var v, k;
            return ht(), ft("option", {
              key: x.value,
              value: x.value
            }, dt(((v = x.label) == null ? void 0 : v[h.lang]) || ((k = x.label) == null ? void 0 : k.en) || x.value), 9, sh);
          }), 128))
        ], 40, rh),
        (D = h.field.hint) != null && D[h.lang] ? (ht(), ft("span", oh, dt(h.field.hint[h.lang]), 1)) : Gt("", !0)
      ]);
    };
  }
}, zo = /* @__PURE__ */ Be(lh, [["__scopeId", "data-v-1c132b85"]]), uh = { class: "field" }, hh = ["for"], ch = ["id", "value"], dh = {
  key: 0,
  class: "hint"
}, fh = {
  __name: "DateField",
  props: {
    field: Object,
    lang: String,
    modelValue: String
  },
  emits: ["update:modelValue"],
  setup(h) {
    const l = h, d = Jt(() => {
      var y, C;
      return ((y = l.field.label) == null ? void 0 : y[l.lang]) || ((C = l.field.label) == null ? void 0 : C.en) || l.field.id;
    });
    return (y, C) => {
      var D;
      return ht(), ft("div", uh, [
        $("label", {
          for: h.field.id,
          class: ae({ required: h.field.required })
        }, dt(d.value), 11, hh),
        $("input", {
          id: h.field.id,
          type: "date",
          value: h.modelValue || "",
          onInput: C[0] || (C[0] = (x) => y.$emit("update:modelValue", x.target.value))
        }, null, 40, ch),
        (D = h.field.hint) != null && D[h.lang] ? (ht(), ft("span", dh, dt(h.field.hint[h.lang]), 1)) : Gt("", !0)
      ]);
    };
  }
}, jo = /* @__PURE__ */ Be(fh, [["__scopeId", "data-v-659cf997"]]), ph = { class: "field" }, _h = ["for"], gh = { class: "uri-row" }, mh = ["value", "aria-label"], yh = ["value"], vh = ["id", "value", "placeholder", "aria-label"], bh = ["aria-label"], xh = {
  key: 0,
  class: "hint"
}, Eo = "https", Lh = {
  __name: "URIField",
  props: {
    field: Object,
    lang: String,
    modelValue: String
  },
  emits: ["update:modelValue"],
  setup(h, { emit: l }) {
    const d = h, y = l, C = ["https", "http", "mailto", "ftp", "urn"], D = Xt(!1), x = Xt(null);
    function v(_t) {
      if (!_t) return { protocol: Eo, body: "" };
      const Y = _t.indexOf("://");
      if (Y !== -1) {
        const Et = _t.slice(0, Y);
        return C.includes(Et) ? { protocol: Et, body: _t.slice(Y + 3) } : { protocol: Eo, body: _t };
      }
      return _t.startsWith("mailto:") ? { protocol: "mailto", body: _t.slice(7) } : { protocol: Eo, body: _t };
    }
    const k = Xt(v(d.modelValue).protocol), F = Xt(v(d.modelValue).body);
    Vn(() => d.modelValue, (_t) => {
      const Y = v(_t);
      Y.protocol !== k.value && (k.value = Y.protocol), Y.body !== F.value && (F.value = Y.body);
    });
    function Z() {
      return F.value ? k.value === "mailto" ? `mailto:${F.value}` : `${k.value}://${F.value}` : "";
    }
    function j(_t) {
      var Y;
      k.value = _t, y("update:modelValue", Z()), (Y = x.value) == null || Y.focus();
    }
    function q(_t) {
      const Y = _t.indexOf("://");
      if (Y !== -1) {
        const Et = _t.slice(0, Y);
        if (C.includes(Et)) {
          k.value = Et, F.value = _t.slice(Y + 3), y("update:modelValue", Z());
          return;
        }
      }
      F.value = _t, y("update:modelValue", Z());
    }
    async function H() {
      const _t = await xl(d.field.generate, d.field.generateOptions);
      _t != null && y("update:modelValue", _t);
    }
    yr(() => {
      d.field.generate && !d.modelValue && H();
    });
    const nt = Jt(() => {
      var _t, Y;
      return ((_t = d.field.label) == null ? void 0 : _t[d.lang]) || ((Y = d.field.label) == null ? void 0 : Y.en) || d.field.id;
    }), ut = Jt(() => {
      var Et, Tt;
      const _t = ((Et = d.field.placeholder) == null ? void 0 : Et[d.lang]) || ((Tt = d.field.placeholder) == null ? void 0 : Tt.en) || "", Y = _t.indexOf("://");
      return Y !== -1 ? _t.slice(Y + 3) : _t || (k.value === "mailto" ? "name@example.com" : "example.com/path");
    });
    return (_t, Y) => {
      var Et;
      return ht(), ft("div", ph, [
        $("label", {
          for: `${h.field.id}-body`,
          class: ae({ required: h.field.required })
        }, dt(nt.value), 11, _h),
        $("div", gh, [
          $("div", {
            class: ae(["uri-input", { focused: D.value }])
          }, [
            $("select", {
              class: "protocol-select",
              value: k.value,
              "aria-label": h.lang === "de" ? "URI-Protokoll" : "URI protocol",
              onChange: Y[0] || (Y[0] = (Tt) => j(Tt.target.value)),
              onFocus: Y[1] || (Y[1] = (Tt) => D.value = !0),
              onBlur: Y[2] || (Y[2] = (Tt) => D.value = !1)
            }, [
              (ht(), ft(re, null, Me(C, (Tt) => $("option", {
                key: Tt,
                value: Tt
              }, dt(Tt), 9, yh)), 64))
            ], 40, mh),
            Y[6] || (Y[6] = $("span", {
              class: "protocol-sep",
              "aria-hidden": "true"
            }, "://", -1)),
            $("input", {
              id: `${h.field.id}-body`,
              ref_key: "inputEl",
              ref: x,
              type: "text",
              value: F.value,
              placeholder: ut.value,
              "aria-label": `${k.value}://${h.lang === "de" ? " Adresspfad" : " address path"}`,
              onInput: Y[3] || (Y[3] = (Tt) => q(Tt.target.value)),
              onFocus: Y[4] || (Y[4] = (Tt) => D.value = !0),
              onBlur: Y[5] || (Y[5] = (Tt) => D.value = !1)
            }, null, 40, vh)
          ], 2),
          h.field.generate ? (ht(), ft("button", {
            key: 0,
            type: "button",
            class: "btn-generate",
            "aria-label": h.lang === "de" ? `Neuen ${nt.value} generieren` : `Generate new ${nt.value}`,
            onClick: H
          }, "↺", 8, bh)) : Gt("", !0)
        ]),
        (Et = h.field.hint) != null && Et[h.lang] ? (ht(), ft("span", xh, dt(h.field.hint[h.lang]), 1)) : Gt("", !0)
      ]);
    };
  }
}, $o = /* @__PURE__ */ Be(Lh, [["__scopeId", "data-v-b94afa7b"]]), wh = { class: "field" }, Ch = { class: "lang-inputs" }, kh = { class: "lang-tag" }, Eh = ["value", "placeholder", "onInput"], Mh = {
  key: 0,
  class: "hint"
}, Bh = {
  __name: "LangStringField",
  props: {
    field: Object,
    lang: String,
    modelValue: Object
  },
  emits: ["update:modelValue"],
  setup(h, { emit: l }) {
    const d = h, y = l, C = Jt(() => {
      var k, F;
      return (F = (k = d.field) == null ? void 0 : k.contentLangs) != null && F.length ? d.field.contentLangs : ["de", "en"];
    }), D = Jt(() => {
      var k, F;
      return ((k = d.field.label) == null ? void 0 : k[d.lang]) || ((F = d.field.label) == null ? void 0 : F.en) || d.field.id;
    }), x = Jt(() => {
      var k, F;
      return ((k = d.field.placeholder) == null ? void 0 : k[d.lang]) || ((F = d.field.placeholder) == null ? void 0 : F.en) || "";
    });
    function v(k, F) {
      y("update:modelValue", { ...d.modelValue || {}, [k]: F });
    }
    return (k, F) => {
      var Z;
      return ht(), ft("div", wh, [
        $("label", {
          class: ae({ required: h.field.required })
        }, dt(D.value), 3),
        $("div", Ch, [
          (ht(!0), ft(re, null, Me(C.value, (j) => (ht(), ft("div", {
            key: j,
            class: "lang-row"
          }, [
            $("span", kh, dt(j), 1),
            $("input", {
              type: "text",
              value: (h.modelValue || {})[j] || "",
              placeholder: x.value,
              onInput: (q) => v(j, q.target.value)
            }, null, 40, Eh)
          ]))), 128))
        ]),
        (Z = h.field.hint) != null && Z[h.lang] ? (ht(), ft("span", Mh, dt(h.field.hint[h.lang]), 1)) : Gt("", !0)
      ]);
    };
  }
}, wl = /* @__PURE__ */ Be(Bh, [["__scopeId", "data-v-41ea85eb"]]);
var da = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function Ph(h) {
  return h && h.__esModule && Object.prototype.hasOwnProperty.call(h, "default") ? h.default : h;
}
var To = { exports: {} };
/* @preserve
 * Leaflet 1.9.4, a JS library for interactive maps. https://leafletjs.com
 * (c) 2010-2023 Vladimir Agafonkin, (c) 2010-2011 CloudMade
 */
(function(h, l) {
  (function(d, y) {
    y(l);
  })(da, function(d) {
    var y = "1.9.4";
    function C(t) {
      var n, s, c, g;
      for (s = 1, c = arguments.length; s < c; s++) {
        g = arguments[s];
        for (n in g)
          t[n] = g[n];
      }
      return t;
    }
    var D = Object.create || /* @__PURE__ */ function() {
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
    var v = 0;
    function k(t) {
      return "_leaflet_id" in t || (t._leaflet_id = ++v), t._leaflet_id;
    }
    function F(t, n, s) {
      var c, g, E, N;
      return N = function() {
        c = !1, g && (E.apply(s, g), g = !1);
      }, E = function() {
        c ? g = arguments : (t.apply(s, arguments), setTimeout(N, n), c = !0);
      }, E;
    }
    function Z(t, n, s) {
      var c = n[1], g = n[0], E = c - g;
      return t === c && s ? t : ((t - g) % E + E) % E + g;
    }
    function j() {
      return !1;
    }
    function q(t, n) {
      if (n === !1)
        return t;
      var s = Math.pow(10, n === void 0 ? 6 : n);
      return Math.round(t * s) / s;
    }
    function H(t) {
      return t.trim ? t.trim() : t.replace(/^\s+|\s+$/g, "");
    }
    function nt(t) {
      return H(t).split(/\s+/);
    }
    function ut(t, n) {
      Object.prototype.hasOwnProperty.call(t, "options") || (t.options = t.options ? D(t.options) : {});
      for (var s in n)
        t.options[s] = n[s];
      return t.options;
    }
    function _t(t, n, s) {
      var c = [];
      for (var g in t)
        c.push(encodeURIComponent(s ? g.toUpperCase() : g) + "=" + encodeURIComponent(t[g]));
      return (!n || n.indexOf("?") === -1 ? "?" : "&") + c.join("&");
    }
    var Y = /\{ *([\w_ -]+) *\}/g;
    function Et(t, n) {
      return t.replace(Y, function(s, c) {
        var g = n[c];
        if (g === void 0)
          throw new Error("No value provided for variable " + s);
        return typeof g == "function" && (g = g(n)), g;
      });
    }
    var Tt = Array.isArray || function(t) {
      return Object.prototype.toString.call(t) === "[object Array]";
    };
    function pe(t, n) {
      for (var s = 0; s < t.length; s++)
        if (t[s] === n)
          return s;
      return -1;
    }
    var vt = "data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=";
    function St(t) {
      return window["webkit" + t] || window["moz" + t] || window["ms" + t];
    }
    var Dt = 0;
    function le(t) {
      var n = +/* @__PURE__ */ new Date(), s = Math.max(0, 16 - (n - Dt));
      return Dt = n + s, window.setTimeout(t, s);
    }
    var te = window.requestAnimationFrame || St("RequestAnimationFrame") || le, ee = window.cancelAnimationFrame || St("CancelAnimationFrame") || St("CancelRequestAnimationFrame") || function(t) {
      window.clearTimeout(t);
    };
    function Kt(t, n, s) {
      if (s && te === le)
        t.call(n);
      else
        return te.call(window, x(t, n));
    }
    function _e(t) {
      t && ee.call(window, t);
    }
    var Re = {
      __proto__: null,
      extend: C,
      create: D,
      bind: x,
      get lastId() {
        return v;
      },
      stamp: k,
      throttle: F,
      wrapNum: Z,
      falseFn: j,
      formatNum: q,
      trim: H,
      splitWords: nt,
      setOptions: ut,
      getParamString: _t,
      template: Et,
      isArray: Tt,
      indexOf: pe,
      emptyImageUrl: vt,
      requestFn: te,
      cancelFn: ee,
      requestAnimFrame: Kt,
      cancelAnimFrame: _e
    };
    function Le() {
    }
    Le.extend = function(t) {
      var n = function() {
        ut(this), this.initialize && this.initialize.apply(this, arguments), this.callInitHooks();
      }, s = n.__super__ = this.prototype, c = D(s);
      c.constructor = n, n.prototype = c;
      for (var g in this)
        Object.prototype.hasOwnProperty.call(this, g) && g !== "prototype" && g !== "__super__" && (n[g] = this[g]);
      return t.statics && C(n, t.statics), t.includes && (At(t.includes), C.apply(null, [c].concat(t.includes))), C(c, t), delete c.statics, delete c.includes, c.options && (c.options = s.options ? D(s.options) : {}, C(c.options, t.options)), c._initHooks = [], c.callInitHooks = function() {
        if (!this._initHooksCalled) {
          s.callInitHooks && s.callInitHooks.call(this), this._initHooksCalled = !0;
          for (var E = 0, N = c._initHooks.length; E < N; E++)
            c._initHooks[E].call(this);
        }
      }, n;
    }, Le.include = function(t) {
      var n = this.prototype.options;
      return C(this.prototype, t), t.options && (this.prototype.options = n, this.mergeOptions(t.options)), this;
    }, Le.mergeOptions = function(t) {
      return C(this.prototype.options, t), this;
    }, Le.addInitHook = function(t) {
      var n = Array.prototype.slice.call(arguments, 1), s = typeof t == "function" ? t : function() {
        this[t].apply(this, n);
      };
      return this.prototype._initHooks = this.prototype._initHooks || [], this.prototype._initHooks.push(s), this;
    };
    function At(t) {
      if (!(typeof L > "u" || !L || !L.Mixin)) {
        t = Tt(t) ? t : [t];
        for (var n = 0; n < t.length; n++)
          t[n] === L.Mixin.Events && console.warn("Deprecated include of L.Mixin.Events: this property will be removed in future releases, please inherit from L.Evented instead.", new Error().stack);
      }
    }
    var Nt = {
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
          t = nt(t);
          for (var g = 0, E = t.length; g < E; g++)
            this._on(t[g], n, s);
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
          t = nt(t);
          for (var g = arguments.length === 1, E = 0, N = t.length; E < N; E++)
            g ? this._off(t[E]) : this._off(t[E], n, s);
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
          var g = { fn: n, ctx: s };
          c && (g.once = !0), this._events = this._events || {}, this._events[t] = this._events[t] || [], this._events[t].push(g);
        }
      },
      _off: function(t, n, s) {
        var c, g, E;
        if (this._events && (c = this._events[t], !!c)) {
          if (arguments.length === 1) {
            if (this._firingCount)
              for (g = 0, E = c.length; g < E; g++)
                c[g].fn = j;
            delete this._events[t];
            return;
          }
          if (typeof n != "function") {
            console.warn("wrong listener type: " + typeof n);
            return;
          }
          var N = this._listens(t, n, s);
          if (N !== !1) {
            var tt = c[N];
            this._firingCount && (tt.fn = j, this._events[t] = c = c.slice()), c.splice(N, 1);
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
        var c = C({}, n, {
          type: t,
          target: this,
          sourceTarget: n && n.sourceTarget || this
        });
        if (this._events) {
          var g = this._events[t];
          if (g) {
            this._firingCount = this._firingCount + 1 || 1;
            for (var E = 0, N = g.length; E < N; E++) {
              var tt = g[E], at = tt.fn;
              tt.once && this.off(t, at, tt.ctx), at.call(tt.ctx || this, c);
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
        var g = n;
        typeof n != "function" && (c = !!n, g = void 0, s = void 0);
        var E = this._events && this._events[t];
        if (E && E.length && this._listens(t, g, s) !== !1)
          return !0;
        if (c) {
          for (var N in this._eventParents)
            if (this._eventParents[N].listens(t, n, s, c))
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
        for (var g = 0, E = c.length; g < E; g++)
          if (c[g].fn === n && c[g].ctx === s)
            return g;
        return !1;
      },
      // @method once(…): this
      // Behaves as [`on(…)`](#evented-on), except the listener will only get fired once and then removed.
      once: function(t, n, s) {
        if (typeof t == "object")
          for (var c in t)
            this._on(c, t[c], n, !0);
        else {
          t = nt(t);
          for (var g = 0, E = t.length; g < E; g++)
            this._on(t[g], n, s, !0);
        }
        return this;
      },
      // @method addEventParent(obj: Evented): this
      // Adds an event parent - an `Evented` that will receive propagated events
      addEventParent: function(t) {
        return this._eventParents = this._eventParents || {}, this._eventParents[k(t)] = t, this;
      },
      // @method removeEventParent(obj: Evented): this
      // Removes an event parent, so it will stop receiving propagated events
      removeEventParent: function(t) {
        return this._eventParents && delete this._eventParents[k(t)], this;
      },
      _propagateEvent: function(t) {
        for (var n in this._eventParents)
          this._eventParents[n].fire(t.type, C({
            layer: t.target,
            propagatedFrom: t.target
          }, t), !0);
      }
    };
    Nt.addEventListener = Nt.on, Nt.removeEventListener = Nt.clearAllEventListeners = Nt.off, Nt.addOneTimeEventListener = Nt.once, Nt.fireEvent = Nt.fire, Nt.hasEventListeners = Nt.listens;
    var kt = Le.extend(Nt);
    function ot(t, n, s) {
      this.x = s ? Math.round(t) : t, this.y = s ? Math.round(n) : n;
    }
    var jt = Math.trunc || function(t) {
      return t > 0 ? Math.floor(t) : Math.ceil(t);
    };
    ot.prototype = {
      // @method clone(): Point
      // Returns a copy of the current point.
      clone: function() {
        return new ot(this.x, this.y);
      },
      // @method add(otherPoint: Point): Point
      // Returns the result of addition of the current and the given points.
      add: function(t) {
        return this.clone()._add(ct(t));
      },
      _add: function(t) {
        return this.x += t.x, this.y += t.y, this;
      },
      // @method subtract(otherPoint: Point): Point
      // Returns the result of subtraction of the given point from the current.
      subtract: function(t) {
        return this.clone()._subtract(ct(t));
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
        return new ot(this.x * t.x, this.y * t.y);
      },
      // @method unscaleBy(scale: Point): Point
      // Inverse of `scaleBy`. Divide each coordinate of the current point by
      // each coordinate of `scale`.
      unscaleBy: function(t) {
        return new ot(this.x / t.x, this.y / t.y);
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
        return this.x = jt(this.x), this.y = jt(this.y), this;
      },
      // @method distanceTo(otherPoint: Point): Number
      // Returns the cartesian distance between the current and the given points.
      distanceTo: function(t) {
        t = ct(t);
        var n = t.x - this.x, s = t.y - this.y;
        return Math.sqrt(n * n + s * s);
      },
      // @method equals(otherPoint: Point): Boolean
      // Returns `true` if the given point has the same coordinates.
      equals: function(t) {
        return t = ct(t), t.x === this.x && t.y === this.y;
      },
      // @method contains(otherPoint: Point): Boolean
      // Returns `true` if both coordinates of the given point are less than the corresponding current point coordinates (in absolute values).
      contains: function(t) {
        return t = ct(t), Math.abs(t.x) <= Math.abs(this.x) && Math.abs(t.y) <= Math.abs(this.y);
      },
      // @method toString(): String
      // Returns a string representation of the point for debugging purposes.
      toString: function() {
        return "Point(" + q(this.x) + ", " + q(this.y) + ")";
      }
    };
    function ct(t, n, s) {
      return t instanceof ot ? t : Tt(t) ? new ot(t[0], t[1]) : t == null ? t : typeof t == "object" && "x" in t && "y" in t ? new ot(t.x, t.y) : new ot(t, n, s);
    }
    function wt(t, n) {
      if (t)
        for (var s = n ? [t, n] : t, c = 0, g = s.length; c < g; c++)
          this.extend(s[c]);
    }
    wt.prototype = {
      // @method extend(point: Point): this
      // Extends the bounds to contain the given point.
      // @alternative
      // @method extend(otherBounds: Bounds): this
      // Extend the bounds to contain the given bounds
      extend: function(t) {
        var n, s;
        if (!t)
          return this;
        if (t instanceof ot || typeof t[0] == "number" || "x" in t)
          n = s = ct(t);
        else if (t = Mt(t), n = t.min, s = t.max, !n || !s)
          return this;
        return !this.min && !this.max ? (this.min = n.clone(), this.max = s.clone()) : (this.min.x = Math.min(n.x, this.min.x), this.max.x = Math.max(s.x, this.max.x), this.min.y = Math.min(n.y, this.min.y), this.max.y = Math.max(s.y, this.max.y)), this;
      },
      // @method getCenter(round?: Boolean): Point
      // Returns the center point of the bounds.
      getCenter: function(t) {
        return ct(
          (this.min.x + this.max.x) / 2,
          (this.min.y + this.max.y) / 2,
          t
        );
      },
      // @method getBottomLeft(): Point
      // Returns the bottom-left point of the bounds.
      getBottomLeft: function() {
        return ct(this.min.x, this.max.y);
      },
      // @method getTopRight(): Point
      // Returns the top-right point of the bounds.
      getTopRight: function() {
        return ct(this.max.x, this.min.y);
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
        return typeof t[0] == "number" || t instanceof ot ? t = ct(t) : t = Mt(t), t instanceof wt ? (n = t.min, s = t.max) : n = s = t, n.x >= this.min.x && s.x <= this.max.x && n.y >= this.min.y && s.y <= this.max.y;
      },
      // @method intersects(otherBounds: Bounds): Boolean
      // Returns `true` if the rectangle intersects the given bounds. Two bounds
      // intersect if they have at least one point in common.
      intersects: function(t) {
        t = Mt(t);
        var n = this.min, s = this.max, c = t.min, g = t.max, E = g.x >= n.x && c.x <= s.x, N = g.y >= n.y && c.y <= s.y;
        return E && N;
      },
      // @method overlaps(otherBounds: Bounds): Boolean
      // Returns `true` if the rectangle overlaps the given bounds. Two bounds
      // overlap if their intersection is an area.
      overlaps: function(t) {
        t = Mt(t);
        var n = this.min, s = this.max, c = t.min, g = t.max, E = g.x > n.x && c.x < s.x, N = g.y > n.y && c.y < s.y;
        return E && N;
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
        var n = this.min, s = this.max, c = Math.abs(n.x - s.x) * t, g = Math.abs(n.y - s.y) * t;
        return Mt(
          ct(n.x - c, n.y - g),
          ct(s.x + c, s.y + g)
        );
      },
      // @method equals(otherBounds: Bounds): Boolean
      // Returns `true` if the rectangle is equivalent to the given bounds.
      equals: function(t) {
        return t ? (t = Mt(t), this.min.equals(t.getTopLeft()) && this.max.equals(t.getBottomRight())) : !1;
      }
    };
    function Mt(t, n) {
      return !t || t instanceof wt ? t : new wt(t, n);
    }
    function se(t, n) {
      if (t)
        for (var s = n ? [t, n] : t, c = 0, g = s.length; c < g; c++)
          this.extend(s[c]);
    }
    se.prototype = {
      // @method extend(latlng: LatLng): this
      // Extend the bounds to contain the given point
      // @alternative
      // @method extend(otherBounds: LatLngBounds): this
      // Extend the bounds to contain the given bounds
      extend: function(t) {
        var n = this._southWest, s = this._northEast, c, g;
        if (t instanceof Yt)
          c = t, g = t;
        else if (t instanceof se) {
          if (c = t._southWest, g = t._northEast, !c || !g)
            return this;
        } else
          return t ? this.extend($t(t) || Vt(t)) : this;
        return !n && !s ? (this._southWest = new Yt(c.lat, c.lng), this._northEast = new Yt(g.lat, g.lng)) : (n.lat = Math.min(c.lat, n.lat), n.lng = Math.min(c.lng, n.lng), s.lat = Math.max(g.lat, s.lat), s.lng = Math.max(g.lng, s.lng)), this;
      },
      // @method pad(bufferRatio: Number): LatLngBounds
      // Returns bounds created by extending or retracting the current bounds by a given ratio in each direction.
      // For example, a ratio of 0.5 extends the bounds by 50% in each direction.
      // Negative values will retract the bounds.
      pad: function(t) {
        var n = this._southWest, s = this._northEast, c = Math.abs(n.lat - s.lat) * t, g = Math.abs(n.lng - s.lng) * t;
        return new se(
          new Yt(n.lat - c, n.lng - g),
          new Yt(s.lat + c, s.lng + g)
        );
      },
      // @method getCenter(): LatLng
      // Returns the center point of the bounds.
      getCenter: function() {
        return new Yt(
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
        return new Yt(this.getNorth(), this.getWest());
      },
      // @method getSouthEast(): LatLng
      // Returns the south-east point of the bounds.
      getSouthEast: function() {
        return new Yt(this.getSouth(), this.getEast());
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
        typeof t[0] == "number" || t instanceof Yt || "lat" in t ? t = $t(t) : t = Vt(t);
        var n = this._southWest, s = this._northEast, c, g;
        return t instanceof se ? (c = t.getSouthWest(), g = t.getNorthEast()) : c = g = t, c.lat >= n.lat && g.lat <= s.lat && c.lng >= n.lng && g.lng <= s.lng;
      },
      // @method intersects(otherBounds: LatLngBounds): Boolean
      // Returns `true` if the rectangle intersects the given bounds. Two bounds intersect if they have at least one point in common.
      intersects: function(t) {
        t = Vt(t);
        var n = this._southWest, s = this._northEast, c = t.getSouthWest(), g = t.getNorthEast(), E = g.lat >= n.lat && c.lat <= s.lat, N = g.lng >= n.lng && c.lng <= s.lng;
        return E && N;
      },
      // @method overlaps(otherBounds: LatLngBounds): Boolean
      // Returns `true` if the rectangle overlaps the given bounds. Two bounds overlap if their intersection is an area.
      overlaps: function(t) {
        t = Vt(t);
        var n = this._southWest, s = this._northEast, c = t.getSouthWest(), g = t.getNorthEast(), E = g.lat > n.lat && c.lat < s.lat, N = g.lng > n.lng && c.lng < s.lng;
        return E && N;
      },
      // @method toBBoxString(): String
      // Returns a string with bounding box coordinates in a 'southwest_lng,southwest_lat,northeast_lng,northeast_lat' format. Useful for sending requests to web services that return geo data.
      toBBoxString: function() {
        return [this.getWest(), this.getSouth(), this.getEast(), this.getNorth()].join(",");
      },
      // @method equals(otherBounds: LatLngBounds, maxMargin?: Number): Boolean
      // Returns `true` if the rectangle is equivalent (within a small margin of error) to the given bounds. The margin of error can be overridden by setting `maxMargin` to a small number.
      equals: function(t, n) {
        return t ? (t = Vt(t), this._southWest.equals(t.getSouthWest(), n) && this._northEast.equals(t.getNorthEast(), n)) : !1;
      },
      // @method isValid(): Boolean
      // Returns `true` if the bounds are properly initialized.
      isValid: function() {
        return !!(this._southWest && this._northEast);
      }
    };
    function Vt(t, n) {
      return t instanceof se ? t : new se(t, n);
    }
    function Yt(t, n, s) {
      if (isNaN(t) || isNaN(n))
        throw new Error("Invalid LatLng object: (" + t + ", " + n + ")");
      this.lat = +t, this.lng = +n, s !== void 0 && (this.alt = +s);
    }
    Yt.prototype = {
      // @method equals(otherLatLng: LatLng, maxMargin?: Number): Boolean
      // Returns `true` if the given `LatLng` point is at the same position (within a small margin of error). The margin of error can be overridden by setting `maxMargin` to a small number.
      equals: function(t, n) {
        if (!t)
          return !1;
        t = $t(t);
        var s = Math.max(
          Math.abs(this.lat - t.lat),
          Math.abs(this.lng - t.lng)
        );
        return s <= (n === void 0 ? 1e-9 : n);
      },
      // @method toString(): String
      // Returns a string representation of the point (for debugging purposes).
      toString: function(t) {
        return "LatLng(" + q(this.lat, t) + ", " + q(this.lng, t) + ")";
      },
      // @method distanceTo(otherLatLng: LatLng): Number
      // Returns the distance (in meters) to the given `LatLng` calculated using the [Spherical Law of Cosines](https://en.wikipedia.org/wiki/Spherical_law_of_cosines).
      distanceTo: function(t) {
        return Ne.distance(this, $t(t));
      },
      // @method wrap(): LatLng
      // Returns a new `LatLng` object with the longitude wrapped so it's always between -180 and +180 degrees.
      wrap: function() {
        return Ne.wrapLatLng(this);
      },
      // @method toBounds(sizeInMeters: Number): LatLngBounds
      // Returns a new `LatLngBounds` object in which each boundary is `sizeInMeters/2` meters apart from the `LatLng`.
      toBounds: function(t) {
        var n = 180 * t / 40075017, s = n / Math.cos(Math.PI / 180 * this.lat);
        return Vt(
          [this.lat - n, this.lng - s],
          [this.lat + n, this.lng + s]
        );
      },
      clone: function() {
        return new Yt(this.lat, this.lng, this.alt);
      }
    };
    function $t(t, n, s) {
      return t instanceof Yt ? t : Tt(t) && typeof t[0] != "object" ? t.length === 3 ? new Yt(t[0], t[1], t[2]) : t.length === 2 ? new Yt(t[0], t[1]) : null : t == null ? t : typeof t == "object" && "lat" in t ? new Yt(t.lat, "lng" in t ? t.lng : t.lon, t.alt) : n === void 0 ? null : new Yt(t, n, s);
    }
    var Pe = {
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
        var n = this.projection.bounds, s = this.scale(t), c = this.transformation.transform(n.min, s), g = this.transformation.transform(n.max, s);
        return new wt(c, g);
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
        var n = this.wrapLng ? Z(t.lng, this.wrapLng, !0) : t.lng, s = this.wrapLat ? Z(t.lat, this.wrapLat, !0) : t.lat, c = t.alt;
        return new Yt(s, n, c);
      },
      // @method wrapLatLngBounds(bounds: LatLngBounds): LatLngBounds
      // Returns a `LatLngBounds` with the same size as the given one, ensuring
      // that its center is within the CRS's bounds.
      // Only accepts actual `L.LatLngBounds` instances, not arrays.
      wrapLatLngBounds: function(t) {
        var n = t.getCenter(), s = this.wrapLatLng(n), c = n.lat - s.lat, g = n.lng - s.lng;
        if (c === 0 && g === 0)
          return t;
        var E = t.getSouthWest(), N = t.getNorthEast(), tt = new Yt(E.lat - c, E.lng - g), at = new Yt(N.lat - c, N.lng - g);
        return new se(tt, at);
      }
    }, Ne = C({}, Pe, {
      wrapLng: [-180, 180],
      // Mean Earth Radius, as recommended for use by
      // the International Union of Geodesy and Geophysics,
      // see https://rosettacode.org/wiki/Haversine_formula
      R: 6371e3,
      // distance between two geographical points using spherical law of cosines approximation
      distance: function(t, n) {
        var s = Math.PI / 180, c = t.lat * s, g = n.lat * s, E = Math.sin((n.lat - t.lat) * s / 2), N = Math.sin((n.lng - t.lng) * s / 2), tt = E * E + Math.cos(c) * Math.cos(g) * N * N, at = 2 * Math.atan2(Math.sqrt(tt), Math.sqrt(1 - tt));
        return this.R * at;
      }
    }), xi = 6378137, rn = {
      R: xi,
      MAX_LATITUDE: 85.0511287798,
      project: function(t) {
        var n = Math.PI / 180, s = this.MAX_LATITUDE, c = Math.max(Math.min(s, t.lat), -s), g = Math.sin(c * n);
        return new ot(
          this.R * t.lng * n,
          this.R * Math.log((1 + g) / (1 - g)) / 2
        );
      },
      unproject: function(t) {
        var n = 180 / Math.PI;
        return new Yt(
          (2 * Math.atan(Math.exp(t.y / this.R)) - Math.PI / 2) * n,
          t.x * n / this.R
        );
      },
      bounds: function() {
        var t = xi * Math.PI;
        return new wt([-t, -t], [t, t]);
      }()
    };
    function Ln(t, n, s, c) {
      if (Tt(t)) {
        this._a = t[0], this._b = t[1], this._c = t[2], this._d = t[3];
        return;
      }
      this._a = t, this._b = n, this._c = s, this._d = c;
    }
    Ln.prototype = {
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
        return n = n || 1, new ot(
          (t.x / n - this._b) / this._a,
          (t.y / n - this._d) / this._c
        );
      }
    };
    function Pi(t, n, s, c) {
      return new Ln(t, n, s, c);
    }
    var ui = C({}, Ne, {
      code: "EPSG:3857",
      projection: rn,
      transformation: function() {
        var t = 0.5 / (Math.PI * rn.R);
        return Pi(t, 0.5, -t, 0.5);
      }()
    }), Si = C({}, ui, {
      code: "EPSG:900913"
    });
    function Gn(t) {
      return document.createElementNS("http://www.w3.org/2000/svg", t);
    }
    function Zn(t, n) {
      var s = "", c, g, E, N, tt, at;
      for (c = 0, E = t.length; c < E; c++) {
        for (tt = t[c], g = 0, N = tt.length; g < N; g++)
          at = tt[g], s += (g ? "L" : "M") + at.x + " " + at.y;
        s += n ? Ft.svg ? "z" : "x" : "";
      }
      return s || "M0 0";
    }
    var Ai = document.documentElement.style, Ti = "ActiveXObject" in window, Hn = Ti && !document.addEventListener, wn = "msLaunchUri" in navigator && !("documentMode" in document), Di = ai("webkit"), We = ai("android"), an = ai("android 2") || ai("android 3"), vr = parseInt(/WebKit\/([0-9]+)|$/.exec(navigator.userAgent)[1], 10), hi = We && ai("Google") && vr < 537 && !("AudioNode" in window), Cn = !!window.opera, B = !wn && ai("chrome"), p = ai("gecko") && !Di && !Cn && !Ti, m = !B && ai("safari"), I = ai("phantom"), K = "OTransition" in Ai, rt = navigator.platform.indexOf("Win") === 0, pt = Ti && "transition" in Ai, Zt = "WebKitCSSMatrix" in window && "m11" in new window.WebKitCSSMatrix() && !an, de = "MozPerspective" in Ai, ge = !window.L_DISABLE_3D && (pt || Zt || de) && !K && !I, ce = typeof orientation < "u" || ai("mobile"), fe = ce && Di, Is = ce && Zt, br = !window.PointerEvent && window.MSPointerEvent, La = !!(window.PointerEvent || br), wa = "ontouchstart" in window || !!window.TouchEvent, Os = !window.L_NO_TOUCH && (wa || La), Fs = ce && Cn, Ca = ce && p, ka = (window.devicePixelRatio || window.screen.deviceXDPI / window.screen.logicalXDPI) > 1, Rs = function() {
      var t = !1;
      try {
        var n = Object.defineProperty({}, "passive", {
          get: function() {
            t = !0;
          }
        });
        window.addEventListener("testPassiveEventSupport", j, n), window.removeEventListener("testPassiveEventSupport", j, n);
      } catch {
      }
      return t;
    }(), Ns = function() {
      return !!document.createElement("canvas").getContext;
    }(), xr = !!(document.createElementNS && Gn("svg").createSVGRect), Ea = !!xr && function() {
      var t = document.createElement("div");
      return t.innerHTML = "<svg/>", (t.firstChild && t.firstChild.namespaceURI) === "http://www.w3.org/2000/svg";
    }(), zs = !xr && function() {
      try {
        var t = document.createElement("div");
        t.innerHTML = '<v:shape adj="1"/>';
        var n = t.firstChild;
        return n.style.behavior = "url(#default#VML)", n && typeof n.adj == "object";
      } catch {
        return !1;
      }
    }(), js = navigator.platform.indexOf("Mac") === 0, $s = navigator.platform.indexOf("Linux") === 0;
    function ai(t) {
      return navigator.userAgent.toLowerCase().indexOf(t) >= 0;
    }
    var Ft = {
      ie: Ti,
      ielt9: Hn,
      edge: wn,
      webkit: Di,
      android: We,
      android23: an,
      androidStock: hi,
      opera: Cn,
      chrome: B,
      gecko: p,
      safari: m,
      phantom: I,
      opera12: K,
      win: rt,
      ie3d: pt,
      webkit3d: Zt,
      gecko3d: de,
      any3d: ge,
      mobile: ce,
      mobileWebkit: fe,
      mobileWebkit3d: Is,
      msPointer: br,
      pointer: La,
      touch: Os,
      touchNative: wa,
      mobileOpera: Fs,
      mobileGecko: Ca,
      retina: ka,
      passiveEvents: Rs,
      canvas: Ns,
      svg: xr,
      vml: zs,
      inlineSvg: Ea,
      mac: js,
      linux: $s
    }, Ma = Ft.msPointer ? "MSPointerDown" : "pointerdown", Ba = Ft.msPointer ? "MSPointerMove" : "pointermove", Lr = Ft.msPointer ? "MSPointerUp" : "pointerup", Pa = Ft.msPointer ? "MSPointerCancel" : "pointercancel", wr = {
      touchstart: Ma,
      touchmove: Ba,
      touchend: Lr,
      touchcancel: Pa
    }, Sa = {
      touchstart: Hs,
      touchmove: Kn,
      touchend: Kn,
      touchcancel: Kn
    }, sn = {}, Aa = !1;
    function Us(t, n, s) {
      return n === "touchstart" && Cr(), Sa[n] ? (s = Sa[n].bind(this, s), t.addEventListener(wr[n], s, !1), s) : (console.warn("wrong event specified:", n), j);
    }
    function Vs(t, n, s) {
      if (!wr[n]) {
        console.warn("wrong event specified:", n);
        return;
      }
      t.removeEventListener(wr[n], s, !1);
    }
    function Gs(t) {
      sn[t.pointerId] = t;
    }
    function Zs(t) {
      sn[t.pointerId] && (sn[t.pointerId] = t);
    }
    function qn(t) {
      delete sn[t.pointerId];
    }
    function Cr() {
      Aa || (document.addEventListener(Ma, Gs, !0), document.addEventListener(Ba, Zs, !0), document.addEventListener(Lr, qn, !0), document.addEventListener(Pa, qn, !0), Aa = !0);
    }
    function Kn(t, n) {
      if (n.pointerType !== (n.MSPOINTER_TYPE_MOUSE || "mouse")) {
        n.touches = [];
        for (var s in sn)
          n.touches.push(sn[s]);
        n.changedTouches = [n], t(n);
      }
    }
    function Hs(t, n) {
      n.MSPOINTER_TYPE_TOUCH && n.pointerType === n.MSPOINTER_TYPE_TOUCH && De(n), Kn(t, n);
    }
    function qs(t) {
      var n = {}, s, c;
      for (c in t)
        s = t[c], n[c] = s && s.bind ? s.bind(t) : s;
      return t = n, n.type = "dblclick", n.detail = 2, n.isTrusted = !1, n._simulated = !0, n;
    }
    var Ks = 200;
    function Ws(t, n) {
      t.addEventListener("dblclick", n);
      var s = 0, c;
      function g(E) {
        if (E.detail !== 1) {
          c = E.detail;
          return;
        }
        if (!(E.pointerType === "mouse" || E.sourceCapabilities && !E.sourceCapabilities.firesTouchEvents)) {
          var N = Fa(E);
          if (!(N.some(function(at) {
            return at instanceof HTMLLabelElement && at.attributes.for;
          }) && !N.some(function(at) {
            return at instanceof HTMLInputElement || at instanceof HTMLSelectElement;
          }))) {
            var tt = Date.now();
            tt - s <= Ks ? (c++, c === 2 && n(qs(E))) : c = 1, s = tt;
          }
        }
      }
      return t.addEventListener("click", g), {
        dblclick: n,
        simDblclick: g
      };
    }
    function Js(t, n) {
      t.removeEventListener("dblclick", n.dblclick), t.removeEventListener("click", n.simDblclick);
    }
    var kr = Jn(
      ["transform", "webkitTransform", "OTransform", "MozTransform", "msTransform"]
    ), kn = Jn(
      ["webkitTransition", "transition", "OTransition", "MozTransition", "msTransition"]
    ), Ta = kn === "webkitTransition" || kn === "OTransition" ? kn + "End" : "transitionend";
    function Da(t) {
      return typeof t == "string" ? document.getElementById(t) : t;
    }
    function Ii(t, n) {
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
    function En(t) {
      for (; t.firstChild; )
        t.removeChild(t.firstChild);
    }
    function on(t) {
      var n = t.parentNode;
      n && n.lastChild !== t && n.appendChild(t);
    }
    function ln(t) {
      var n = t.parentNode;
      n && n.firstChild !== t && n.insertBefore(t, n.firstChild);
    }
    function Er(t, n) {
      if (t.classList !== void 0)
        return t.classList.contains(n);
      var s = Wn(t);
      return s.length > 0 && new RegExp("(^|\\s)" + n + "(\\s|$)").test(s);
    }
    function Wt(t, n) {
      if (t.classList !== void 0)
        for (var s = nt(n), c = 0, g = s.length; c < g; c++)
          t.classList.add(s[c]);
      else if (!Er(t, n)) {
        var E = Wn(t);
        Mr(t, (E ? E + " " : "") + n);
      }
    }
    function be(t, n) {
      t.classList !== void 0 ? t.classList.remove(n) : Mr(t, H((" " + Wn(t) + " ").replace(" " + n + " ", " ")));
    }
    function Mr(t, n) {
      t.className.baseVal === void 0 ? t.className = n : t.className.baseVal = n;
    }
    function Wn(t) {
      return t.correspondingElement && (t = t.correspondingElement), t.className.baseVal === void 0 ? t.className : t.className.baseVal;
    }
    function Qe(t, n) {
      "opacity" in t.style ? t.style.opacity = n : "filter" in t.style && Xs(t, n);
    }
    function Xs(t, n) {
      var s = !1, c = "DXImageTransform.Microsoft.Alpha";
      try {
        s = t.filters.item(c);
      } catch {
        if (n === 1)
          return;
      }
      n = Math.round(n * 100), s ? (s.Enabled = n !== 100, s.Opacity = n) : t.style.filter += " progid:" + c + "(opacity=" + n + ")";
    }
    function Jn(t) {
      for (var n = document.documentElement.style, s = 0; s < t.length; s++)
        if (t[s] in n)
          return t[s];
      return !1;
    }
    function Zi(t, n, s) {
      var c = n || new ot(0, 0);
      t.style[kr] = (Ft.ie3d ? "translate(" + c.x + "px," + c.y + "px)" : "translate3d(" + c.x + "px," + c.y + "px,0)") + (s ? " scale(" + s + ")" : "");
    }
    function we(t, n) {
      t._leaflet_pos = n, Ft.any3d ? Zi(t, n) : (t.style.left = n.x + "px", t.style.top = n.y + "px");
    }
    function Oi(t) {
      return t._leaflet_pos || new ot(0, 0);
    }
    var Mn, Bn, Br;
    if ("onselectstart" in document)
      Mn = function() {
        Ht(window, "selectstart", De);
      }, Bn = function() {
        ue(window, "selectstart", De);
      };
    else {
      var Pn = Jn(
        ["userSelect", "WebkitUserSelect", "OUserSelect", "MozUserSelect", "msUserSelect"]
      );
      Mn = function() {
        if (Pn) {
          var t = document.documentElement.style;
          Br = t[Pn], t[Pn] = "none";
        }
      }, Bn = function() {
        Pn && (document.documentElement.style[Pn] = Br, Br = void 0);
      };
    }
    function Pr() {
      Ht(window, "dragstart", De);
    }
    function Sr() {
      ue(window, "dragstart", De);
    }
    var Xn, Ar;
    function Tr(t) {
      for (; t.tabIndex === -1; )
        t = t.parentNode;
      t.style && (Yn(), Xn = t, Ar = t.style.outlineStyle, t.style.outlineStyle = "none", Ht(window, "keydown", Yn));
    }
    function Yn() {
      Xn && (Xn.style.outlineStyle = Ar, Xn = void 0, Ar = void 0, ue(window, "keydown", Yn));
    }
    function Ia(t) {
      do
        t = t.parentNode;
      while ((!t.offsetWidth || !t.offsetHeight) && t !== document.body);
      return t;
    }
    function Dr(t) {
      var n = t.getBoundingClientRect();
      return {
        x: n.width / t.offsetWidth || 1,
        y: n.height / t.offsetHeight || 1,
        boundingClientRect: n
      };
    }
    var Ys = {
      __proto__: null,
      TRANSFORM: kr,
      TRANSITION: kn,
      TRANSITION_END: Ta,
      get: Da,
      getStyle: Ii,
      create: oe,
      remove: ye,
      empty: En,
      toFront: on,
      toBack: ln,
      hasClass: Er,
      addClass: Wt,
      removeClass: be,
      setClass: Mr,
      getClass: Wn,
      setOpacity: Qe,
      testProp: Jn,
      setTransform: Zi,
      setPosition: we,
      getPosition: Oi,
      get disableTextSelection() {
        return Mn;
      },
      get enableTextSelection() {
        return Bn;
      },
      disableImageDrag: Pr,
      enableImageDrag: Sr,
      preventOutline: Tr,
      restoreOutline: Yn,
      getSizedParentNode: Ia,
      getScale: Dr
    };
    function Ht(t, n, s, c) {
      if (n && typeof n == "object")
        for (var g in n)
          Or(t, g, n[g], s);
      else {
        n = nt(n);
        for (var E = 0, N = n.length; E < N; E++)
          Or(t, n[E], s, c);
      }
      return this;
    }
    var ci = "_leaflet_events";
    function ue(t, n, s, c) {
      if (arguments.length === 1)
        Oa(t), delete t[ci];
      else if (n && typeof n == "object")
        for (var g in n)
          Fr(t, g, n[g], s);
      else if (n = nt(n), arguments.length === 2)
        Oa(t, function(tt) {
          return pe(n, tt) !== -1;
        });
      else
        for (var E = 0, N = n.length; E < N; E++)
          Fr(t, n[E], s, c);
      return this;
    }
    function Oa(t, n) {
      for (var s in t[ci]) {
        var c = s.split(/\d/)[0];
        (!n || n(c)) && Fr(t, c, null, null, s);
      }
    }
    var Ir = {
      mouseenter: "mouseover",
      mouseleave: "mouseout",
      wheel: !("onwheel" in window) && "mousewheel"
    };
    function Or(t, n, s, c) {
      var g = n + k(s) + (c ? "_" + k(c) : "");
      if (t[ci] && t[ci][g])
        return this;
      var E = function(tt) {
        return s.call(c || t, tt || window.event);
      }, N = E;
      !Ft.touchNative && Ft.pointer && n.indexOf("touch") === 0 ? E = Us(t, n, E) : Ft.touch && n === "dblclick" ? E = Ws(t, E) : "addEventListener" in t ? n === "touchstart" || n === "touchmove" || n === "wheel" || n === "mousewheel" ? t.addEventListener(Ir[n] || n, E, Ft.passiveEvents ? { passive: !1 } : !1) : n === "mouseenter" || n === "mouseleave" ? (E = function(tt) {
        tt = tt || window.event, Qn(t, tt) && N(tt);
      }, t.addEventListener(Ir[n], E, !1)) : t.addEventListener(n, N, !1) : t.attachEvent("on" + n, E), t[ci] = t[ci] || {}, t[ci][g] = E;
    }
    function Fr(t, n, s, c, g) {
      g = g || n + k(s) + (c ? "_" + k(c) : "");
      var E = t[ci] && t[ci][g];
      if (!E)
        return this;
      !Ft.touchNative && Ft.pointer && n.indexOf("touch") === 0 ? Vs(t, n, E) : Ft.touch && n === "dblclick" ? Js(t, E) : "removeEventListener" in t ? t.removeEventListener(Ir[n] || n, E, !1) : t.detachEvent("on" + n, E), t[ci][g] = null;
    }
    function Hi(t) {
      return t.stopPropagation ? t.stopPropagation() : t.originalEvent ? t.originalEvent._stopped = !0 : t.cancelBubble = !0, this;
    }
    function Rr(t) {
      return Or(t, "wheel", Hi), this;
    }
    function Sn(t) {
      return Ht(t, "mousedown touchstart dblclick contextmenu", Hi), t._leaflet_disable_click = !0, this;
    }
    function De(t) {
      return t.preventDefault ? t.preventDefault() : t.returnValue = !1, this;
    }
    function qi(t) {
      return De(t), Hi(t), this;
    }
    function Fa(t) {
      if (t.composedPath)
        return t.composedPath();
      for (var n = [], s = t.target; s; )
        n.push(s), s = s.parentNode;
      return n;
    }
    function An(t, n) {
      if (!n)
        return new ot(t.clientX, t.clientY);
      var s = Dr(n), c = s.boundingClientRect;
      return new ot(
        // offset.left/top values are in page scale (like clientX/Y),
        // whereas clientLeft/Top (border width) values are the original values (before CSS scale applies).
        (t.clientX - c.left) / s.x - n.clientLeft,
        (t.clientY - c.top) / s.y - n.clientTop
      );
    }
    var Qs = Ft.linux && Ft.chrome ? window.devicePixelRatio : Ft.mac ? window.devicePixelRatio * 3 : window.devicePixelRatio > 0 ? 2 * window.devicePixelRatio : 1;
    function Ra(t) {
      return Ft.edge ? t.wheelDeltaY / 2 : (
        // Don't trust window-geometry-based delta
        t.deltaY && t.deltaMode === 0 ? -t.deltaY / Qs : (
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
    function Qn(t, n) {
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
    var ne = {
      __proto__: null,
      on: Ht,
      off: ue,
      stopPropagation: Hi,
      disableScrollPropagation: Rr,
      disableClickPropagation: Sn,
      preventDefault: De,
      stop: qi,
      getPropagationPath: Fa,
      getMousePosition: An,
      getWheelDelta: Ra,
      isExternalTarget: Qn,
      addListener: Ht,
      removeListener: ue
    }, Na = kt.extend({
      // @method run(el: HTMLElement, newPos: Point, duration?: Number, easeLinearity?: Number)
      // Run an animation of a given element to a new position, optionally setting
      // duration in seconds (`0.25` by default) and easing linearity factor (3rd
      // argument of the [cubic bezier curve](https://cubic-bezier.com/#0,0,.5,1),
      // `0.5` by default).
      run: function(t, n, s, c) {
        this.stop(), this._el = t, this._inProgress = !0, this._duration = s || 0.25, this._easeOutPower = 1 / Math.max(c || 0.5, 0.2), this._startPos = Oi(t), this._offset = n.subtract(this._startPos), this._startTime = +/* @__PURE__ */ new Date(), this.fire("start"), this._animate();
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
        n && s._round(), we(this._el, s), this.fire("step");
      },
      _complete: function() {
        _e(this._animId), this._inProgress = !1, this.fire("end");
      },
      _easeOut: function(t) {
        return 1 - Math.pow(1 - t, this._easeOutPower);
      }
    }), ie = kt.extend({
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
        n = ut(this, n), this._handlers = [], this._layers = {}, this._zoomBoundLayers = {}, this._sizeChanged = !0, this._initContainer(t), this._initLayout(), this._onResize = x(this._onResize, this), this._initEvents(), n.maxBounds && this.setMaxBounds(n.maxBounds), n.zoom !== void 0 && (this._zoom = this._limitZoom(n.zoom)), n.center && n.zoom !== void 0 && this.setView($t(n.center), n.zoom, { reset: !0 }), this.callInitHooks(), this._zoomAnimated = kn && Ft.any3d && !Ft.mobileOpera && this.options.zoomAnimation, this._zoomAnimated && (this._createAnimProxy(), Ht(this._proxy, Ta, this._catchTransitionEnd, this)), this._addLayers(this.options.layers);
      },
      // @section Methods for modifying map state
      // @method setView(center: LatLng, zoom: Number, options?: Zoom/pan options): this
      // Sets the view of the map (geographical center and zoom) with the given
      // animation options.
      setView: function(t, n, s) {
        if (n = n === void 0 ? this._zoom : this._limitZoom(n), t = this._limitCenter($t(t), n, this.options.maxBounds), s = s || {}, this._stop(), this._loaded && !s.reset && s !== !0) {
          s.animate !== void 0 && (s.zoom = C({ animate: s.animate }, s.zoom), s.pan = C({ animate: s.animate, duration: s.duration }, s.pan));
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
        return t = t || (Ft.any3d ? this.options.zoomDelta : 1), this.setZoom(this._zoom + t, n);
      },
      // @method zoomOut(delta?: Number, options?: Zoom options): this
      // Decreases the zoom of the map by `delta` ([`zoomDelta`](#map-zoomdelta) by default).
      zoomOut: function(t, n) {
        return t = t || (Ft.any3d ? this.options.zoomDelta : 1), this.setZoom(this._zoom - t, n);
      },
      // @method setZoomAround(latlng: LatLng, zoom: Number, options: Zoom options): this
      // Zooms the map while keeping a specified geographical point on the map
      // stationary (e.g. used internally for scroll zoom and double-click zoom).
      // @alternative
      // @method setZoomAround(offset: Point, zoom: Number, options: Zoom options): this
      // Zooms the map while keeping a specified pixel on the map (relative to the top-left corner) stationary.
      setZoomAround: function(t, n, s) {
        var c = this.getZoomScale(n), g = this.getSize().divideBy(2), E = t instanceof ot ? t : this.latLngToContainerPoint(t), N = E.subtract(g).multiplyBy(1 - 1 / c), tt = this.containerPointToLatLng(g.add(N));
        return this.setView(tt, n, { zoom: s });
      },
      _getBoundsCenterZoom: function(t, n) {
        n = n || {}, t = t.getBounds ? t.getBounds() : Vt(t);
        var s = ct(n.paddingTopLeft || n.padding || [0, 0]), c = ct(n.paddingBottomRight || n.padding || [0, 0]), g = this.getBoundsZoom(t, !1, s.add(c));
        if (g = typeof n.maxZoom == "number" ? Math.min(n.maxZoom, g) : g, g === 1 / 0)
          return {
            center: t.getCenter(),
            zoom: g
          };
        var E = c.subtract(s).divideBy(2), N = this.project(t.getSouthWest(), g), tt = this.project(t.getNorthEast(), g), at = this.unproject(N.add(tt).divideBy(2).add(E), g);
        return {
          center: at,
          zoom: g
        };
      },
      // @method fitBounds(bounds: LatLngBounds, options?: fitBounds options): this
      // Sets a map view that contains the given geographical bounds with the
      // maximum zoom level possible.
      fitBounds: function(t, n) {
        if (t = Vt(t), !t.isValid())
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
        if (t = ct(t).round(), n = n || {}, !t.x && !t.y)
          return this.fire("moveend");
        if (n.animate !== !0 && !this.getSize().contains(t))
          return this._resetView(this.unproject(this.project(this.getCenter()).add(t)), this.getZoom()), this;
        if (this._panAnim || (this._panAnim = new Na(), this._panAnim.on({
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
        if (s = s || {}, s.animate === !1 || !Ft.any3d)
          return this.setView(t, n, s);
        this._stop();
        var c = this.project(this.getCenter()), g = this.project(t), E = this.getSize(), N = this._zoom;
        t = $t(t), n = n === void 0 ? N : n;
        var tt = Math.max(E.x, E.y), at = tt * this.getZoomScale(N, n), mt = g.distanceTo(c) || 1, Pt = 1.42, zt = Pt * Pt;
        function Qt(ve) {
          var Ue = ve ? -1 : 1, He = ve ? at : tt, ds = at * at - tt * tt + Ue * zt * zt * mt * mt, oi = 2 * He * zt * mt, Ut = ds / oi, cr = Math.sqrt(Ut * Ut + 1) - Ut, Qr = cr < 1e-9 ? -18 : Math.log(cr);
          return Qr;
        }
        function $e(ve) {
          return (Math.exp(ve) - Math.exp(-ve)) / 2;
        }
        function Ae(ve) {
          return (Math.exp(ve) + Math.exp(-ve)) / 2;
        }
        function ri(ve) {
          return $e(ve) / Ae(ve);
        }
        var Ze = Qt(0);
        function ji(ve) {
          return tt * (Ae(Ze) / Ae(Ze + Pt * ve));
        }
        function us(ve) {
          return tt * (Ae(Ze) * ri(Ze + Pt * ve) - $e(Ze)) / zt;
        }
        function Yr(ve) {
          return 1 - Math.pow(1 - ve, 1.5);
        }
        var yo = Date.now(), hs = (Qt(1) - Ze) / Pt, vo = s.duration ? 1e3 * s.duration : 1e3 * hs * 0.8;
        function cs() {
          var ve = (Date.now() - yo) / vo, Ue = Yr(ve) * hs;
          ve <= 1 ? (this._flyToFrame = Kt(cs, this), this._move(
            this.unproject(c.add(g.subtract(c).multiplyBy(us(Ue) / mt)), N),
            this.getScaleZoom(tt / ji(Ue), N),
            { flyTo: !0 }
          )) : this._move(t, n)._moveEnd(!0);
        }
        return this._moveStart(!0, s.noMoveStart), cs.call(this), this;
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
        return t = Vt(t), this.listens("moveend", this._panInsideMaxBounds) && this.off("moveend", this._panInsideMaxBounds), t.isValid() ? (this.options.maxBounds = t, this._loaded && this._panInsideMaxBounds(), this.on("moveend", this._panInsideMaxBounds)) : (this.options.maxBounds = null, this);
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
        var s = this.getCenter(), c = this._limitCenter(s, this._zoom, Vt(t));
        return s.equals(c) || this.panTo(c, n), this._enforcingBounds = !1, this;
      },
      // @method panInside(latlng: LatLng, options?: padding options): this
      // Pans the map the minimum amount to make the `latlng` visible. Use
      // padding options to fit the display to more restricted bounds.
      // If `latlng` is already within the (optionally padded) display bounds,
      // the map will not be panned.
      panInside: function(t, n) {
        n = n || {};
        var s = ct(n.paddingTopLeft || n.padding || [0, 0]), c = ct(n.paddingBottomRight || n.padding || [0, 0]), g = this.project(this.getCenter()), E = this.project(t), N = this.getPixelBounds(), tt = Mt([N.min.add(s), N.max.subtract(c)]), at = tt.getSize();
        if (!tt.contains(E)) {
          this._enforcingBounds = !0;
          var mt = E.subtract(tt.getCenter()), Pt = tt.extend(E).getSize().subtract(at);
          g.x += mt.x < 0 ? -Pt.x : Pt.x, g.y += mt.y < 0 ? -Pt.y : Pt.y, this.panTo(this.unproject(g), n), this._enforcingBounds = !1;
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
        t = C({
          animate: !1,
          pan: !0
        }, t === !0 ? { animate: !0 } : t);
        var n = this.getSize();
        this._sizeChanged = !0, this._lastCenter = null;
        var s = this.getSize(), c = n.divideBy(2).round(), g = s.divideBy(2).round(), E = c.subtract(g);
        return !E.x && !E.y ? this : (t.animate && t.pan ? this.panBy(E) : (t.pan && this._rawPanBy(E), this.fire("move"), t.debounceMoveend ? (clearTimeout(this._sizeTimer), this._sizeTimer = setTimeout(x(this.fire, this, "moveend"), 200)) : this.fire("moveend")), this.fire("resize", {
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
        if (t = this._locateOptions = C({
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
          var n = t.coords.latitude, s = t.coords.longitude, c = new Yt(n, s), g = c.toBounds(t.coords.accuracy * 2), E = this._locateOptions;
          if (E.setView) {
            var N = this.getBoundsZoom(g);
            this.setView(c, E.maxZoom ? Math.min(N, E.maxZoom) : N);
          }
          var tt = {
            latlng: c,
            bounds: g,
            timestamp: t.timestamp
          };
          for (var at in t.coords)
            typeof t.coords[at] == "number" && (tt[at] = t.coords[at]);
          this.fire("locationfound", tt);
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
        this._locationWatchId !== void 0 && this.stopLocate(), this._stop(), ye(this._mapPane), this._clearControlPos && this._clearControlPos(), this._resizeRequest && (_e(this._resizeRequest), this._resizeRequest = null), this._clearHandlers(), this._loaded && this.fire("unload");
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
        return new se(n, s);
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
        t = Vt(t), s = ct(s || [0, 0]);
        var c = this.getZoom() || 0, g = this.getMinZoom(), E = this.getMaxZoom(), N = t.getNorthWest(), tt = t.getSouthEast(), at = this.getSize().subtract(s), mt = Mt(this.project(tt, c), this.project(N, c)).getSize(), Pt = Ft.any3d ? this.options.zoomSnap : 1, zt = at.x / mt.x, Qt = at.y / mt.y, $e = n ? Math.max(zt, Qt) : Math.min(zt, Qt);
        return c = this.getScaleZoom($e, c), Pt && (c = Math.round(c / (Pt / 100)) * (Pt / 100), c = n ? Math.ceil(c / Pt) * Pt : Math.floor(c / Pt) * Pt), Math.max(g, Math.min(E, c));
      },
      // @method getSize(): Point
      // Returns the current size of the map container (in pixels).
      getSize: function() {
        return (!this._size || this._sizeChanged) && (this._size = new ot(
          this._container.clientWidth || 0,
          this._container.clientHeight || 0
        ), this._sizeChanged = !1), this._size.clone();
      },
      // @method getPixelBounds(): Bounds
      // Returns the bounds of the current map view in projected pixel
      // coordinates (sometimes useful in layer and overlay implementations).
      getPixelBounds: function(t, n) {
        var s = this._getTopLeftPoint(t, n);
        return new wt(s, s.add(this.getSize()));
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
        return n = n === void 0 ? this._zoom : n, this.options.crs.latLngToPoint($t(t), n);
      },
      // @method unproject(point: Point, zoom: Number): LatLng
      // Inverse of [`project`](#map-project).
      unproject: function(t, n) {
        return n = n === void 0 ? this._zoom : n, this.options.crs.pointToLatLng(ct(t), n);
      },
      // @method layerPointToLatLng(point: Point): LatLng
      // Given a pixel coordinate relative to the [origin pixel](#map-getpixelorigin),
      // returns the corresponding geographical coordinate (for the current zoom level).
      layerPointToLatLng: function(t) {
        var n = ct(t).add(this.getPixelOrigin());
        return this.unproject(n);
      },
      // @method latLngToLayerPoint(latlng: LatLng): Point
      // Given a geographical coordinate, returns the corresponding pixel coordinate
      // relative to the [origin pixel](#map-getpixelorigin).
      latLngToLayerPoint: function(t) {
        var n = this.project($t(t))._round();
        return n._subtract(this.getPixelOrigin());
      },
      // @method wrapLatLng(latlng: LatLng): LatLng
      // Returns a `LatLng` where `lat` and `lng` has been wrapped according to the
      // map's CRS's `wrapLat` and `wrapLng` properties, if they are outside the
      // CRS's bounds.
      // By default this means longitude is wrapped around the dateline so its
      // value is between -180 and +180 degrees.
      wrapLatLng: function(t) {
        return this.options.crs.wrapLatLng($t(t));
      },
      // @method wrapLatLngBounds(bounds: LatLngBounds): LatLngBounds
      // Returns a `LatLngBounds` with the same size as the given one, ensuring that
      // its center is within the CRS's bounds.
      // By default this means the center longitude is wrapped around the dateline so its
      // value is between -180 and +180 degrees, and the majority of the bounds
      // overlaps the CRS's bounds.
      wrapLatLngBounds: function(t) {
        return this.options.crs.wrapLatLngBounds(Vt(t));
      },
      // @method distance(latlng1: LatLng, latlng2: LatLng): Number
      // Returns the distance between two geographical coordinates according to
      // the map's CRS. By default this measures distance in meters.
      distance: function(t, n) {
        return this.options.crs.distance($t(t), $t(n));
      },
      // @method containerPointToLayerPoint(point: Point): Point
      // Given a pixel coordinate relative to the map container, returns the corresponding
      // pixel coordinate relative to the [origin pixel](#map-getpixelorigin).
      containerPointToLayerPoint: function(t) {
        return ct(t).subtract(this._getMapPanePos());
      },
      // @method layerPointToContainerPoint(point: Point): Point
      // Given a pixel coordinate relative to the [origin pixel](#map-getpixelorigin),
      // returns the corresponding pixel coordinate relative to the map container.
      layerPointToContainerPoint: function(t) {
        return ct(t).add(this._getMapPanePos());
      },
      // @method containerPointToLatLng(point: Point): LatLng
      // Given a pixel coordinate relative to the map container, returns
      // the corresponding geographical coordinate (for the current zoom level).
      containerPointToLatLng: function(t) {
        var n = this.containerPointToLayerPoint(ct(t));
        return this.layerPointToLatLng(n);
      },
      // @method latLngToContainerPoint(latlng: LatLng): Point
      // Given a geographical coordinate, returns the corresponding pixel coordinate
      // relative to the map container.
      latLngToContainerPoint: function(t) {
        return this.layerPointToContainerPoint(this.latLngToLayerPoint($t(t)));
      },
      // @method mouseEventToContainerPoint(ev: MouseEvent): Point
      // Given a MouseEvent object, returns the pixel coordinate relative to the
      // map container where the event took place.
      mouseEventToContainerPoint: function(t) {
        return An(t, this._container);
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
        var n = this._container = Da(t);
        if (n) {
          if (n._leaflet_id)
            throw new Error("Map container is already initialized.");
        } else throw new Error("Map container not found.");
        Ht(n, "scroll", this._onScroll, this), this._containerId = k(n);
      },
      _initLayout: function() {
        var t = this._container;
        this._fadeAnimated = this.options.fadeAnimation && Ft.any3d, Wt(t, "leaflet-container" + (Ft.touch ? " leaflet-touch" : "") + (Ft.retina ? " leaflet-retina" : "") + (Ft.ielt9 ? " leaflet-oldie" : "") + (Ft.safari ? " leaflet-safari" : "") + (this._fadeAnimated ? " leaflet-fade-anim" : ""));
        var n = Ii(t, "position");
        n !== "absolute" && n !== "relative" && n !== "fixed" && n !== "sticky" && (t.style.position = "relative"), this._initPanes(), this._initControlPos && this._initControlPos();
      },
      _initPanes: function() {
        var t = this._panes = {};
        this._paneRenderers = {}, this._mapPane = this.createPane("mapPane", this._container), we(this._mapPane, new ot(0, 0)), this.createPane("tilePane"), this.createPane("overlayPane"), this.createPane("shadowPane"), this.createPane("markerPane"), this.createPane("tooltipPane"), this.createPane("popupPane"), this.options.markerZoomAnimation || (Wt(t.markerPane, "leaflet-zoom-hide"), Wt(t.shadowPane, "leaflet-zoom-hide"));
      },
      // private methods that modify map state
      // @section Map state change events
      _resetView: function(t, n, s) {
        we(this._mapPane, new ot(0, 0));
        var c = !this._loaded;
        this._loaded = !0, n = this._limitZoom(n), this.fire("viewprereset");
        var g = this._zoom !== n;
        this._moveStart(g, s)._move(t, n)._moveEnd(g), this.fire("viewreset"), c && this.fire("load");
      },
      _moveStart: function(t, n) {
        return t && this.fire("zoomstart"), n || this.fire("movestart"), this;
      },
      _move: function(t, n, s, c) {
        n === void 0 && (n = this._zoom);
        var g = this._zoom !== n;
        return this._zoom = n, this._lastCenter = t, this._pixelOrigin = this._getNewPixelOrigin(t), c ? s && s.pinch && this.fire("zoom", s) : ((g || s && s.pinch) && this.fire("zoom", s), this.fire("move", s)), this;
      },
      _moveEnd: function(t) {
        return t && this.fire("zoomend"), this.fire("moveend");
      },
      _stop: function() {
        return _e(this._flyToFrame), this._panAnim && this._panAnim.stop(), this;
      },
      _rawPanBy: function(t) {
        we(this._mapPane, this._getMapPanePos().subtract(t));
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
        this._targets = {}, this._targets[k(this._container)] = this;
        var n = t ? ue : Ht;
        n(this._container, "click dblclick mousedown mouseup mouseover mouseout mousemove contextmenu keypress keydown keyup", this._handleDOMEvent, this), this.options.trackResize && n(window, "resize", this._onResize, this), Ft.any3d && this.options.transform3DLimit && (t ? this.off : this.on).call(this, "moveend", this._onMoveEnd);
      },
      _onResize: function() {
        _e(this._resizeRequest), this._resizeRequest = Kt(
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
        for (var s = [], c, g = n === "mouseout" || n === "mouseover", E = t.target || t.srcElement, N = !1; E; ) {
          if (c = this._targets[k(E)], c && (n === "click" || n === "preclick") && this._draggableMoved(c)) {
            N = !0;
            break;
          }
          if (c && c.listens(n, !0) && (g && !Qn(E, t) || (s.push(c), g)) || E === this._container)
            break;
          E = E.parentNode;
        }
        return !s.length && !N && !g && this.listens(n, !0) && (s = [this]), s;
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
          s === "mousedown" && Tr(n), this._fireDOMEvent(t, s);
        }
      },
      _mouseEvents: ["click", "dblclick", "mouseover", "mouseout", "contextmenu"],
      _fireDOMEvent: function(t, n, s) {
        if (t.type === "click") {
          var c = C({}, t);
          c.type = "preclick", this._fireDOMEvent(c, c.type, s);
        }
        var g = this._findEventTargets(t, n);
        if (s) {
          for (var E = [], N = 0; N < s.length; N++)
            s[N].listens(n, !0) && E.push(s[N]);
          g = E.concat(g);
        }
        if (g.length) {
          n === "contextmenu" && De(t);
          var tt = g[0], at = {
            originalEvent: t
          };
          if (t.type !== "keypress" && t.type !== "keydown" && t.type !== "keyup") {
            var mt = tt.getLatLng && (!tt._radius || tt._radius <= 10);
            at.containerPoint = mt ? this.latLngToContainerPoint(tt.getLatLng()) : this.mouseEventToContainerPoint(t), at.layerPoint = this.containerPointToLayerPoint(at.containerPoint), at.latlng = mt ? tt.getLatLng() : this.layerPointToLatLng(at.layerPoint);
          }
          for (N = 0; N < g.length; N++)
            if (g[N].fire(n, at, !0), at.originalEvent._stopped || g[N].options.bubblingMouseEvents === !1 && pe(this._mouseEvents, n) !== -1)
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
        return Oi(this._mapPane) || new ot(0, 0);
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
        return Mt([
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
        var c = this.project(t, n), g = this.getSize().divideBy(2), E = new wt(c.subtract(g), c.add(g)), N = this._getBoundsOffset(E, s, n);
        return Math.abs(N.x) <= 1 && Math.abs(N.y) <= 1 ? t : this.unproject(c.add(N), n);
      },
      // adjust offset for view to get inside bounds
      _limitOffset: function(t, n) {
        if (!n)
          return t;
        var s = this.getPixelBounds(), c = new wt(s.min.add(t), s.max.add(t));
        return t.add(this._getBoundsOffset(c, n));
      },
      // returns offset needed for pxBounds to get inside maxBounds at a specified zoom
      _getBoundsOffset: function(t, n, s) {
        var c = Mt(
          this.project(n.getNorthEast(), s),
          this.project(n.getSouthWest(), s)
        ), g = c.min.subtract(t.min), E = c.max.subtract(t.max), N = this._rebound(g.x, -E.x), tt = this._rebound(g.y, -E.y);
        return new ot(N, tt);
      },
      _rebound: function(t, n) {
        return t + n > 0 ? Math.round(t - n) / 2 : Math.max(0, Math.ceil(t)) - Math.max(0, Math.floor(n));
      },
      _limitZoom: function(t) {
        var n = this.getMinZoom(), s = this.getMaxZoom(), c = Ft.any3d ? this.options.zoomSnap : 1;
        return c && (t = Math.round(t / c) * c), Math.max(n, Math.min(s, t));
      },
      _onPanTransitionStep: function() {
        this.fire("move");
      },
      _onPanTransitionEnd: function() {
        be(this._mapPane, "leaflet-pan-anim"), this.fire("moveend");
      },
      _tryAnimatedPan: function(t, n) {
        var s = this._getCenterOffset(t)._trunc();
        return (n && n.animate) !== !0 && !this.getSize().contains(s) ? !1 : (this.panBy(s, n), !0);
      },
      _createAnimProxy: function() {
        var t = this._proxy = oe("div", "leaflet-proxy leaflet-zoom-animated");
        this._panes.mapPane.appendChild(t), this.on("zoomanim", function(n) {
          var s = kr, c = this._proxy.style[s];
          Zi(this._proxy, this.project(n.center, n.zoom), this.getZoomScale(n.zoom, 1)), c === this._proxy.style[s] && this._animatingZoom && this._onZoomTransitionEnd();
        }, this), this.on("load moveend", this._animMoveEnd, this), this._on("unload", this._destroyAnimProxy, this);
      },
      _destroyAnimProxy: function() {
        ye(this._proxy), this.off("load moveend", this._animMoveEnd, this), delete this._proxy;
      },
      _animMoveEnd: function() {
        var t = this.getCenter(), n = this.getZoom();
        Zi(this._proxy, this.project(t, n), this.getZoomScale(n, 1));
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
        var c = this.getZoomScale(n), g = this._getCenterOffset(t)._divideBy(1 - 1 / c);
        return s.animate !== !0 && !this.getSize().contains(g) ? !1 : (Kt(function() {
          this._moveStart(!0, s.noMoveStart || !1)._animateZoom(t, n, !0);
        }, this), !0);
      },
      _animateZoom: function(t, n, s, c) {
        this._mapPane && (s && (this._animatingZoom = !0, this._animateToCenter = t, this._animateToZoom = n, Wt(this._mapPane, "leaflet-zoom-anim")), this.fire("zoomanim", {
          center: t,
          zoom: n,
          noUpdate: c
        }), this._tempFireZoomEvent || (this._tempFireZoomEvent = this._zoom !== this._animateToZoom), this._move(this._animateToCenter, this._animateToZoom, void 0, !0), setTimeout(x(this._onZoomTransitionEnd, this), 250));
      },
      _onZoomTransitionEnd: function() {
        this._animatingZoom && (this._mapPane && be(this._mapPane, "leaflet-zoom-anim"), this._animatingZoom = !1, this._move(this._animateToCenter, this._animateToZoom, void 0, !0), this._tempFireZoomEvent && this.fire("zoom"), delete this._tempFireZoomEvent, this.fire("move"), this._moveEnd(!0));
      }
    });
    function tr(t, n) {
      return new ie(t, n);
    }
    var si = Le.extend({
      // @section
      // @aka Control Options
      options: {
        // @option position: String = 'topright'
        // The position of the control (one of the map corners). Possible values are `'topleft'`,
        // `'topright'`, `'bottomleft'` or `'bottomright'`
        position: "topright"
      },
      initialize: function(t) {
        ut(this, t);
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
    }), un = function(t) {
      return new si(t);
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
        function c(g, E) {
          var N = n + g + " " + n + E;
          t[g + E] = oe("div", N, s);
        }
        c("top", "left"), c("top", "right"), c("bottom", "left"), c("bottom", "right");
      },
      _clearControlPos: function() {
        for (var t in this._controlCorners)
          ye(this._controlCorners[t]);
        ye(this._controlContainer), delete this._controlCorners, delete this._controlContainer;
      }
    });
    var za = si.extend({
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
        ut(this, s), this._layerControlInputs = [], this._layers = [], this._lastZIndex = 0, this._handlingClick = !1, this._preventClick = !1;
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
        return si.prototype.addTo.call(this, t), this._expandIfNotCollapsed();
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
        var n = this._getLayer(k(t));
        return n && this._layers.splice(this._layers.indexOf(n), 1), this._map ? this._update() : this;
      },
      // @method expand(): this
      // Expand the control container if collapsed.
      expand: function() {
        Wt(this._container, "leaflet-control-layers-expanded"), this._section.style.height = null;
        var t = this._map.getSize().y - (this._container.offsetTop + 50);
        return t < this._section.clientHeight ? (Wt(this._section, "leaflet-control-layers-scrollbar"), this._section.style.height = t + "px") : be(this._section, "leaflet-control-layers-scrollbar"), this._checkDisabledLayers(), this;
      },
      // @method collapse(): this
      // Collapse the control container if expanded.
      collapse: function() {
        return be(this._container, "leaflet-control-layers-expanded"), this;
      },
      _initLayout: function() {
        var t = "leaflet-control-layers", n = this._container = oe("div", t), s = this.options.collapsed;
        n.setAttribute("aria-haspopup", !0), Sn(n), Rr(n);
        var c = this._section = oe("section", t + "-list");
        s && (this._map.on("click", this.collapse, this), Ht(n, {
          mouseenter: this._expandSafely,
          mouseleave: this.collapse
        }, this));
        var g = this._layersLink = oe("a", t + "-toggle", n);
        g.href = "#", g.title = "Layers", g.setAttribute("role", "button"), Ht(g, {
          keydown: function(E) {
            E.keyCode === 13 && this._expandSafely();
          },
          // Certain screen readers intercept the key event and instead send a click event
          click: function(E) {
            De(E), this._expandSafely();
          }
        }, this), s || this.expand(), this._baseLayersList = oe("div", t + "-base", c), this._separator = oe("div", t + "-separator", c), this._overlaysList = oe("div", t + "-overlays", c), n.appendChild(c);
      },
      _getLayer: function(t) {
        for (var n = 0; n < this._layers.length; n++)
          if (this._layers[n] && k(this._layers[n].layer) === t)
            return this._layers[n];
      },
      _addLayer: function(t, n, s) {
        this._map && t.on("add remove", this._onLayerChange, this), this._layers.push({
          layer: t,
          name: n,
          overlay: s
        }), this.options.sortLayers && this._layers.sort(x(function(c, g) {
          return this.options.sortFunction(c.layer, g.layer, c.name, g.name);
        }, this)), this.options.autoZIndex && t.setZIndex && (this._lastZIndex++, t.setZIndex(this._lastZIndex)), this._expandIfNotCollapsed();
      },
      _update: function() {
        if (!this._container)
          return this;
        En(this._baseLayersList), En(this._overlaysList), this._layerControlInputs = [];
        var t, n, s, c, g = 0;
        for (s = 0; s < this._layers.length; s++)
          c = this._layers[s], this._addItem(c), n = n || c.overlay, t = t || !c.overlay, g += c.overlay ? 0 : 1;
        return this.options.hideSingleBase && (t = t && g > 1, this._baseLayersList.style.display = t ? "" : "none"), this._separator.style.display = n && t ? "" : "none", this;
      },
      _onLayerChange: function(t) {
        this._handlingClick || this._update();
        var n = this._getLayer(k(t.target)), s = n.overlay ? t.type === "add" ? "overlayadd" : "overlayremove" : t.type === "add" ? "baselayerchange" : null;
        s && this._map.fire(s, n);
      },
      // IE7 bugs out if you create a radio dynamically, so you have to do it this hacky way (see https://stackoverflow.com/a/119079)
      _createRadioElement: function(t, n) {
        var s = '<input type="radio" class="leaflet-control-layers-selector" name="' + t + '"' + (n ? ' checked="checked"' : "") + "/>", c = document.createElement("div");
        return c.innerHTML = s, c.firstChild;
      },
      _addItem: function(t) {
        var n = document.createElement("label"), s = this._map.hasLayer(t.layer), c;
        t.overlay ? (c = document.createElement("input"), c.type = "checkbox", c.className = "leaflet-control-layers-selector", c.defaultChecked = s) : c = this._createRadioElement("leaflet-base-layers_" + k(this), s), this._layerControlInputs.push(c), c.layerId = k(t.layer), Ht(c, "click", this._onInputClick, this);
        var g = document.createElement("span");
        g.innerHTML = " " + t.name;
        var E = document.createElement("span");
        n.appendChild(E), E.appendChild(c), E.appendChild(g);
        var N = t.overlay ? this._overlaysList : this._baseLayersList;
        return N.appendChild(n), this._checkDisabledLayers(), n;
      },
      _onInputClick: function() {
        if (!this._preventClick) {
          var t = this._layerControlInputs, n, s, c = [], g = [];
          this._handlingClick = !0;
          for (var E = t.length - 1; E >= 0; E--)
            n = t[E], s = this._getLayer(n.layerId).layer, n.checked ? c.push(s) : n.checked || g.push(s);
          for (E = 0; E < g.length; E++)
            this._map.hasLayer(g[E]) && this._map.removeLayer(g[E]);
          for (E = 0; E < c.length; E++)
            this._map.hasLayer(c[E]) || this._map.addLayer(c[E]);
          this._handlingClick = !1, this._refocusOnMap();
        }
      },
      _checkDisabledLayers: function() {
        for (var t = this._layerControlInputs, n, s, c = this._map.getZoom(), g = t.length - 1; g >= 0; g--)
          n = t[g], s = this._getLayer(n.layerId).layer, n.disabled = s.options.minZoom !== void 0 && c < s.options.minZoom || s.options.maxZoom !== void 0 && c > s.options.maxZoom;
      },
      _expandIfNotCollapsed: function() {
        return this._map && !this.options.collapsed && this.expand(), this;
      },
      _expandSafely: function() {
        var t = this._section;
        this._preventClick = !0, Ht(t, "click", De), this.expand();
        var n = this;
        setTimeout(function() {
          ue(t, "click", De), n._preventClick = !1;
        });
      }
    }), Nr = function(t, n, s) {
      return new za(t, n, s);
    }, hn = si.extend({
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
      _createButton: function(t, n, s, c, g) {
        var E = oe("a", s, c);
        return E.innerHTML = t, E.href = "#", E.title = n, E.setAttribute("role", "button"), E.setAttribute("aria-label", n), Sn(E), Ht(E, "click", qi), Ht(E, "click", g, this), Ht(E, "click", this._refocusOnMap, this), E;
      },
      _updateDisabled: function() {
        var t = this._map, n = "leaflet-disabled";
        be(this._zoomInButton, n), be(this._zoomOutButton, n), this._zoomInButton.setAttribute("aria-disabled", "false"), this._zoomOutButton.setAttribute("aria-disabled", "false"), (this._disabled || t._zoom === t.getMinZoom()) && (Wt(this._zoomOutButton, n), this._zoomOutButton.setAttribute("aria-disabled", "true")), (this._disabled || t._zoom === t.getMaxZoom()) && (Wt(this._zoomInButton, n), this._zoomInButton.setAttribute("aria-disabled", "true"));
      }
    });
    ie.mergeOptions({
      zoomControl: !0
    }), ie.addInitHook(function() {
      this.options.zoomControl && (this.zoomControl = new hn(), this.addControl(this.zoomControl));
    });
    var to = function(t) {
      return new hn(t);
    }, Li = si.extend({
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
        var n = t * 3.2808399, s, c, g;
        n > 5280 ? (s = n / 5280, c = this._getRoundNum(s), this._updateScale(this._iScale, c + " mi", c / s)) : (g = this._getRoundNum(n), this._updateScale(this._iScale, g + " ft", g / n));
      },
      _updateScale: function(t, n, s) {
        t.style.width = Math.round(this.options.maxWidth * s) + "px", t.innerHTML = n;
      },
      _getRoundNum: function(t) {
        var n = Math.pow(10, (Math.floor(t) + "").length - 1), s = t / n;
        return s = s >= 10 ? 10 : s >= 5 ? 5 : s >= 3 ? 3 : s >= 2 ? 2 : 1, n * s;
      }
    }), ja = function(t) {
      return new Li(t);
    }, cn = '<svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="12" height="8" viewBox="0 0 12 8" class="leaflet-attribution-flag"><path fill="#4C7BE1" d="M0 0h12v4H0z"/><path fill="#FFD500" d="M0 4h12v3H0z"/><path fill="#E0BC00" d="M0 7h12v1H0z"/></svg>', zr = si.extend({
      // @section
      // @aka Control.Attribution options
      options: {
        position: "bottomright",
        // @option prefix: String|false = 'Leaflet'
        // The HTML text shown before the attributions. Pass `false` to disable.
        prefix: '<a href="https://leafletjs.com" title="A JavaScript library for interactive maps">' + (Ft.inlineSvg ? cn + " " : "") + "Leaflet</a>"
      },
      initialize: function(t) {
        ut(this, t), this._attributions = {};
      },
      onAdd: function(t) {
        t.attributionControl = this, this._container = oe("div", "leaflet-control-attribution"), Sn(this._container);
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
      this.options.attributionControl && new zr().addTo(this);
    });
    var eo = function(t) {
      return new zr(t);
    };
    si.Layers = za, si.Zoom = hn, si.Scale = Li, si.Attribution = zr, un.layers = Nr, un.zoom = to, un.scale = ja, un.attribution = eo;
    var di = Le.extend({
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
    var io = { Events: Nt }, $a = Ft.touch ? "touchstart mousedown" : "mousedown", Fi = kt.extend({
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
        ut(this, c), this._element = t, this._dragStartTarget = n || t, this._preventOutline = s;
      },
      // @method enable()
      // Enables the dragging ability
      enable: function() {
        this._enabled || (Ht(this._dragStartTarget, $a, this._onDown, this), this._enabled = !0);
      },
      // @method disable()
      // Disables the dragging ability
      disable: function() {
        this._enabled && (Fi._dragging === this && this.finishDrag(!0), ue(this._dragStartTarget, $a, this._onDown, this), this._enabled = !1, this._moved = !1);
      },
      _onDown: function(t) {
        if (this._enabled && (this._moved = !1, !Er(this._element, "leaflet-zoom-anim"))) {
          if (t.touches && t.touches.length !== 1) {
            Fi._dragging === this && this.finishDrag();
            return;
          }
          if (!(Fi._dragging || t.shiftKey || t.which !== 1 && t.button !== 1 && !t.touches) && (Fi._dragging = this, this._preventOutline && Tr(this._element), Pr(), Mn(), !this._moving)) {
            this.fire("down");
            var n = t.touches ? t.touches[0] : t, s = Ia(this._element);
            this._startPoint = new ot(n.clientX, n.clientY), this._startPos = Oi(this._element), this._parentScale = Dr(s);
            var c = t.type === "mousedown";
            Ht(document, c ? "mousemove" : "touchmove", this._onMove, this), Ht(document, c ? "mouseup" : "touchend touchcancel", this._onUp, this);
          }
        }
      },
      _onMove: function(t) {
        if (this._enabled) {
          if (t.touches && t.touches.length > 1) {
            this._moved = !0;
            return;
          }
          var n = t.touches && t.touches.length === 1 ? t.touches[0] : t, s = new ot(n.clientX, n.clientY)._subtract(this._startPoint);
          !s.x && !s.y || Math.abs(s.x) + Math.abs(s.y) < this.options.clickTolerance || (s.x /= this._parentScale.x, s.y /= this._parentScale.y, De(t), this._moved || (this.fire("dragstart"), this._moved = !0, Wt(document.body, "leaflet-dragging"), this._lastTarget = t.target || t.srcElement, window.SVGElementInstance && this._lastTarget instanceof window.SVGElementInstance && (this._lastTarget = this._lastTarget.correspondingUseElement), Wt(this._lastTarget, "leaflet-drag-target")), this._newPos = this._startPos.add(s), this._moving = !0, this._lastEvent = t, this._updatePosition());
        }
      },
      _updatePosition: function() {
        var t = { originalEvent: this._lastEvent };
        this.fire("predrag", t), we(this._element, this._newPos), this.fire("drag", t);
      },
      _onUp: function() {
        this._enabled && this.finishDrag();
      },
      finishDrag: function(t) {
        be(document.body, "leaflet-dragging"), this._lastTarget && (be(this._lastTarget, "leaflet-drag-target"), this._lastTarget = null), ue(document, "mousemove touchmove", this._onMove, this), ue(document, "mouseup touchend touchcancel", this._onUp, this), Sr(), Bn();
        var n = this._moved && this._moving;
        this._moving = !1, Fi._dragging = !1, n && this.fire("dragend", {
          noInertia: t,
          distance: this._newPos.distanceTo(this._startPos)
        });
      }
    });
    function Ua(t, n, s) {
      var c, g = [1, 4, 2, 8], E, N, tt, at, mt, Pt, zt, Qt;
      for (E = 0, Pt = t.length; E < Pt; E++)
        t[E]._code = Ri(t[E], n);
      for (tt = 0; tt < 4; tt++) {
        for (zt = g[tt], c = [], E = 0, Pt = t.length, N = Pt - 1; E < Pt; N = E++)
          at = t[E], mt = t[N], at._code & zt ? mt._code & zt || (Qt = er(mt, at, zt, n, s), Qt._code = Ri(Qt, n), c.push(Qt)) : (mt._code & zt && (Qt = er(mt, at, zt, n, s), Qt._code = Ri(Qt, n), c.push(Qt)), c.push(at));
        t = c;
      }
      return t;
    }
    function Va(t, n) {
      var s, c, g, E, N, tt, at, mt, Pt;
      if (!t || t.length === 0)
        throw new Error("latlngs not passed");
      ei(t) || (console.warn("latlngs are not flat! Only the first ring will be used"), t = t[0]);
      var zt = $t([0, 0]), Qt = Vt(t), $e = Qt.getNorthWest().distanceTo(Qt.getSouthWest()) * Qt.getNorthEast().distanceTo(Qt.getNorthWest());
      $e < 1700 && (zt = jr(t));
      var Ae = t.length, ri = [];
      for (s = 0; s < Ae; s++) {
        var Ze = $t(t[s]);
        ri.push(n.project($t([Ze.lat - zt.lat, Ze.lng - zt.lng])));
      }
      for (tt = at = mt = 0, s = 0, c = Ae - 1; s < Ae; c = s++)
        g = ri[s], E = ri[c], N = g.y * E.x - E.y * g.x, at += (g.x + E.x) * N, mt += (g.y + E.y) * N, tt += N * 3;
      tt === 0 ? Pt = ri[0] : Pt = [at / tt, mt / tt];
      var ji = n.unproject(ct(Pt));
      return $t([ji.lat + zt.lat, ji.lng + zt.lng]);
    }
    function jr(t) {
      for (var n = 0, s = 0, c = 0, g = 0; g < t.length; g++) {
        var E = $t(t[g]);
        n += E.lat, s += E.lng, c++;
      }
      return $t([n / c, s / c]);
    }
    var Ga = {
      __proto__: null,
      clipPolygon: Ua,
      polygonCenter: Va,
      centroid: jr
    };
    function Za(t, n) {
      if (!n || !t.length)
        return t.slice();
      var s = n * n;
      return t = dn(t, s), t = no(t, s), t;
    }
    function Se(t, n, s) {
      return Math.sqrt(pn(t, n, s, !0));
    }
    function Je(t, n, s) {
      return pn(t, n, s);
    }
    function no(t, n) {
      var s = t.length, c = typeof Uint8Array < "u" ? Uint8Array : Array, g = new c(s);
      g[0] = g[s - 1] = 1, fi(t, g, n, 0, s - 1);
      var E, N = [];
      for (E = 0; E < s; E++)
        g[E] && N.push(t[E]);
      return N;
    }
    function fi(t, n, s, c, g) {
      var E = 0, N, tt, at;
      for (tt = c + 1; tt <= g - 1; tt++)
        at = pn(t[tt], t[c], t[g], !0), at > E && (N = tt, E = at);
      E > s && (n[N] = 1, fi(t, n, s, c, N), fi(t, n, s, N, g));
    }
    function dn(t, n) {
      for (var s = [t[0]], c = 1, g = 0, E = t.length; c < E; c++)
        fn(t[c], t[g]) > n && (s.push(t[c]), g = c);
      return g < E - 1 && s.push(t[E - 1]), s;
    }
    var Tn;
    function ti(t, n, s, c, g) {
      var E = c ? Tn : Ri(t, s), N = Ri(n, s), tt, at, mt;
      for (Tn = N; ; ) {
        if (!(E | N))
          return [t, n];
        if (E & N)
          return !1;
        tt = E || N, at = er(t, n, tt, s, g), mt = Ri(at, s), tt === E ? (t = at, E = mt) : (n = at, N = mt);
      }
    }
    function er(t, n, s, c, g) {
      var E = n.x - t.x, N = n.y - t.y, tt = c.min, at = c.max, mt, Pt;
      return s & 8 ? (mt = t.x + E * (at.y - t.y) / N, Pt = at.y) : s & 4 ? (mt = t.x + E * (tt.y - t.y) / N, Pt = tt.y) : s & 2 ? (mt = at.x, Pt = t.y + N * (at.x - t.x) / E) : s & 1 && (mt = tt.x, Pt = t.y + N * (tt.x - t.x) / E), new ot(mt, Pt, g);
    }
    function Ri(t, n) {
      var s = 0;
      return t.x < n.min.x ? s |= 1 : t.x > n.max.x && (s |= 2), t.y < n.min.y ? s |= 4 : t.y > n.max.y && (s |= 8), s;
    }
    function fn(t, n) {
      var s = n.x - t.x, c = n.y - t.y;
      return s * s + c * c;
    }
    function pn(t, n, s, c) {
      var g = n.x, E = n.y, N = s.x - g, tt = s.y - E, at = N * N + tt * tt, mt;
      return at > 0 && (mt = ((t.x - g) * N + (t.y - E) * tt) / at, mt > 1 ? (g = s.x, E = s.y) : mt > 0 && (g += N * mt, E += tt * mt)), N = t.x - g, tt = t.y - E, c ? N * N + tt * tt : new ot(g, E);
    }
    function ei(t) {
      return !Tt(t[0]) || typeof t[0][0] != "object" && typeof t[0][0] < "u";
    }
    function Ha(t) {
      return console.warn("Deprecated use of _flat, please use L.LineUtil.isFlat instead."), ei(t);
    }
    function qa(t, n) {
      var s, c, g, E, N, tt, at, mt;
      if (!t || t.length === 0)
        throw new Error("latlngs not passed");
      ei(t) || (console.warn("latlngs are not flat! Only the first ring will be used"), t = t[0]);
      var Pt = $t([0, 0]), zt = Vt(t), Qt = zt.getNorthWest().distanceTo(zt.getSouthWest()) * zt.getNorthEast().distanceTo(zt.getNorthWest());
      Qt < 1700 && (Pt = jr(t));
      var $e = t.length, Ae = [];
      for (s = 0; s < $e; s++) {
        var ri = $t(t[s]);
        Ae.push(n.project($t([ri.lat - Pt.lat, ri.lng - Pt.lng])));
      }
      for (s = 0, c = 0; s < $e - 1; s++)
        c += Ae[s].distanceTo(Ae[s + 1]) / 2;
      if (c === 0)
        mt = Ae[0];
      else
        for (s = 0, E = 0; s < $e - 1; s++)
          if (N = Ae[s], tt = Ae[s + 1], g = N.distanceTo(tt), E += g, E > c) {
            at = (E - c) / g, mt = [
              tt.x - at * (tt.x - N.x),
              tt.y - at * (tt.y - N.y)
            ];
            break;
          }
      var Ze = n.unproject(ct(mt));
      return $t([Ze.lat + Pt.lat, Ze.lng + Pt.lng]);
    }
    var ir = {
      __proto__: null,
      simplify: Za,
      pointToSegmentDistance: Se,
      closestPointOnSegment: Je,
      clipSegment: ti,
      _getEdgeIntersection: er,
      _getBitCode: Ri,
      _sqClosestPointOnSegment: pn,
      isFlat: ei,
      _flat: Ha,
      polylineCenter: qa
    }, nr = {
      project: function(t) {
        return new ot(t.lng, t.lat);
      },
      unproject: function(t) {
        return new Yt(t.y, t.x);
      },
      bounds: new wt([-180, -90], [180, 90])
    }, $r = {
      R: 6378137,
      R_MINOR: 6356752314245179e-9,
      bounds: new wt([-2003750834279e-5, -1549657073972e-5], [2003750834279e-5, 1876465623138e-5]),
      project: function(t) {
        var n = Math.PI / 180, s = this.R, c = t.lat * n, g = this.R_MINOR / s, E = Math.sqrt(1 - g * g), N = E * Math.sin(c), tt = Math.tan(Math.PI / 4 - c / 2) / Math.pow((1 - N) / (1 + N), E / 2);
        return c = -s * Math.log(Math.max(tt, 1e-10)), new ot(t.lng * n * s, c);
      },
      unproject: function(t) {
        for (var n = 180 / Math.PI, s = this.R, c = this.R_MINOR / s, g = Math.sqrt(1 - c * c), E = Math.exp(-t.y / s), N = Math.PI / 2 - 2 * Math.atan(E), tt = 0, at = 0.1, mt; tt < 15 && Math.abs(at) > 1e-7; tt++)
          mt = g * Math.sin(N), mt = Math.pow((1 - mt) / (1 + mt), g / 2), at = Math.PI / 2 - 2 * Math.atan(E * mt) - N, N += at;
        return new Yt(N * n, t.x * n / s);
      }
    }, Ka = {
      __proto__: null,
      LonLat: nr,
      Mercator: $r,
      SphericalMercator: rn
    }, ro = C({}, Ne, {
      code: "EPSG:3395",
      projection: $r,
      transformation: function() {
        var t = 0.5 / (Math.PI * $r.R);
        return Pi(t, 0.5, -t, 0.5);
      }()
    }), Ur = C({}, Ne, {
      code: "EPSG:4326",
      projection: nr,
      transformation: Pi(1 / 180, 1, -1 / 180, 0.5)
    }), ao = C({}, Pe, {
      projection: nr,
      transformation: Pi(1, 0, -1, 0),
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
    Pe.Earth = Ne, Pe.EPSG3395 = ro, Pe.EPSG3857 = ui, Pe.EPSG900913 = Si, Pe.EPSG4326 = Ur, Pe.Simple = ao;
    var Ge = kt.extend({
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
        return this._map._targets[k(t)] = this, this;
      },
      removeInteractiveTarget: function(t) {
        return delete this._map._targets[k(t)], this;
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
        var n = k(t);
        return this._layers[n] ? this : (this._layers[n] = t, t._mapToAdd = this, t.beforeAdd && t.beforeAdd(this), this.whenReady(t._layerAdd, t), this);
      },
      // @method removeLayer(layer: Layer): this
      // Removes the given layer from the map.
      removeLayer: function(t) {
        var n = k(t);
        return this._layers[n] ? (this._loaded && t.onRemove(this), delete this._layers[n], this._loaded && (this.fire("layerremove", { layer: t }), t.fire("remove")), t._map = t._mapToAdd = null, this) : this;
      },
      // @method hasLayer(layer: Layer): Boolean
      // Returns `true` if the given layer is currently added to the map
      hasLayer: function(t) {
        return k(t) in this._layers;
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
        t = t ? Tt(t) ? t : [t] : [];
        for (var n = 0, s = t.length; n < s; n++)
          this.addLayer(t[n]);
      },
      _addZoomLimit: function(t) {
        (!isNaN(t.options.maxZoom) || !isNaN(t.options.minZoom)) && (this._zoomBoundLayers[k(t)] = t, this._updateZoomLevels());
      },
      _removeZoomLimit: function(t) {
        var n = k(t);
        this._zoomBoundLayers[n] && (delete this._zoomBoundLayers[n], this._updateZoomLevels());
      },
      _updateZoomLevels: function() {
        var t = 1 / 0, n = -1 / 0, s = this._getZoomSpan();
        for (var c in this._zoomBoundLayers) {
          var g = this._zoomBoundLayers[c].options;
          t = g.minZoom === void 0 ? t : Math.min(t, g.minZoom), n = g.maxZoom === void 0 ? n : Math.max(n, g.maxZoom);
        }
        this._layersMaxZoom = n === -1 / 0 ? void 0 : n, this._layersMinZoom = t === 1 / 0 ? void 0 : t, s !== this._getZoomSpan() && this.fire("zoomlevelschange"), this.options.maxZoom === void 0 && this._layersMaxZoom && this.getZoom() > this._layersMaxZoom && this.setZoom(this._layersMaxZoom), this.options.minZoom === void 0 && this._layersMinZoom && this.getZoom() < this._layersMinZoom && this.setZoom(this._layersMinZoom);
      }
    });
    var wi = Ge.extend({
      initialize: function(t, n) {
        ut(this, n), this._layers = {};
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
        return k(t);
      }
    }), rr = function(t, n) {
      return new wi(t, n);
    }, pi = wi.extend({
      addLayer: function(t) {
        return this.hasLayer(t) ? this : (t.addEventParent(this), wi.prototype.addLayer.call(this, t), this.fire("layeradd", { layer: t }));
      },
      removeLayer: function(t) {
        return this.hasLayer(t) ? (t in this._layers && (t = this._layers[t]), t.removeEventParent(this), wi.prototype.removeLayer.call(this, t), this.fire("layerremove", { layer: t })) : this;
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
        var t = new se();
        for (var n in this._layers) {
          var s = this._layers[n];
          t.extend(s.getBounds ? s.getBounds() : s.getLatLng());
        }
        return t;
      }
    }), so = function(t, n) {
      return new pi(t, n);
    }, _n = Le.extend({
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
        ut(this, t);
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
        var g = ct(c), E = ct(n === "shadow" && s.shadowAnchor || s.iconAnchor || g && g.divideBy(2, !0));
        t.className = "leaflet-marker-" + n + " " + (s.className || ""), E && (t.style.marginLeft = -E.x + "px", t.style.marginTop = -E.y + "px"), g && (t.style.width = g.x + "px", t.style.height = g.y + "px");
      },
      _createImg: function(t, n) {
        return n = n || document.createElement("img"), n.src = t, n;
      },
      _getIconUrl: function(t) {
        return Ft.retina && this.options[t + "RetinaUrl"] || this.options[t + "Url"];
      }
    });
    function oo(t) {
      return new _n(t);
    }
    var Dn = _n.extend({
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
        return typeof Dn.imagePath != "string" && (Dn.imagePath = this._detectIconPath()), (this.options.imagePath || Dn.imagePath) + _n.prototype._getIconUrl.call(this, t);
      },
      _stripUrl: function(t) {
        var n = function(s, c, g) {
          var E = c.exec(s);
          return E && E[g];
        };
        return t = n(t, /^url\((['"])?(.+)\1\)$/, 2), t && n(t, /^(.*)marker-icon\.png$/, 1);
      },
      _detectIconPath: function() {
        var t = oe("div", "leaflet-default-icon-path", document.body), n = Ii(t, "background-image") || Ii(t, "backgroundImage");
        if (document.body.removeChild(t), n = this._stripUrl(n), n)
          return n;
        var s = document.querySelector('link[href$="leaflet.css"]');
        return s ? s.href.substring(0, s.href.length - 11 - 1) : "";
      }
    }), Wa = di.extend({
      initialize: function(t) {
        this._marker = t;
      },
      addHooks: function() {
        var t = this._marker._icon;
        this._draggable || (this._draggable = new Fi(t, t, !0)), this._draggable.on({
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
        }, this).disable(), this._marker._icon && be(this._marker._icon, "leaflet-marker-draggable");
      },
      moved: function() {
        return this._draggable && this._draggable._moved;
      },
      _adjustPan: function(t) {
        var n = this._marker, s = n._map, c = this._marker.options.autoPanSpeed, g = this._marker.options.autoPanPadding, E = Oi(n._icon), N = s.getPixelBounds(), tt = s.getPixelOrigin(), at = Mt(
          N.min._subtract(tt).add(g),
          N.max._subtract(tt).subtract(g)
        );
        if (!at.contains(E)) {
          var mt = ct(
            (Math.max(at.max.x, E.x) - at.max.x) / (N.max.x - at.max.x) - (Math.min(at.min.x, E.x) - at.min.x) / (N.min.x - at.min.x),
            (Math.max(at.max.y, E.y) - at.max.y) / (N.max.y - at.max.y) - (Math.min(at.min.y, E.y) - at.min.y) / (N.min.y - at.min.y)
          ).multiplyBy(c);
          s.panBy(mt, { animate: !1 }), this._draggable._newPos._add(mt), this._draggable._startPos._add(mt), we(n._icon, this._draggable._newPos), this._onDrag(t), this._panRequest = Kt(this._adjustPan.bind(this, t));
        }
      },
      _onDragStart: function() {
        this._oldLatLng = this._marker.getLatLng(), this._marker.closePopup && this._marker.closePopup(), this._marker.fire("movestart").fire("dragstart");
      },
      _onPreDrag: function(t) {
        this._marker.options.autoPan && (_e(this._panRequest), this._panRequest = Kt(this._adjustPan.bind(this, t)));
      },
      _onDrag: function(t) {
        var n = this._marker, s = n._shadow, c = Oi(n._icon), g = n._map.layerPointToLatLng(c);
        s && we(s, c), n._latlng = g, t.latlng = g, t.oldLatLng = this._oldLatLng, n.fire("move", t).fire("drag", t);
      },
      _onDragEnd: function(t) {
        _e(this._panRequest), delete this._oldLatLng, this._marker.fire("moveend").fire("dragend", t);
      }
    }), ar = Ge.extend({
      // @section
      // @aka Marker options
      options: {
        // @option icon: Icon = *
        // Icon instance to use for rendering the marker.
        // See [Icon documentation](#L.Icon) for details on how to customize the marker icon.
        // If not specified, a common instance of `L.Icon.Default` is used.
        icon: new Dn(),
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
        ut(this, n), this._latlng = $t(t);
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
        return this._latlng = $t(t), this.update(), this.fire("move", { oldLatLng: n, latlng: this._latlng });
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
        }), this.options.autoPanOnFocus && Ht(s, "focus", this._panOnFocus, this);
        var g = t.icon.createShadow(this._shadow), E = !1;
        g !== this._shadow && (this._removeShadow(), E = !0), g && (Wt(g, n), g.alt = ""), this._shadow = g, t.opacity < 1 && this._updateOpacity(), c && this.getPane().appendChild(this._icon), this._initInteraction(), g && E && this.getPane(t.shadowPane).appendChild(this._shadow);
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
        this._icon && we(this._icon, t), this._shadow && we(this._shadow, t), this._zIndex = t.y + this.options.zIndexOffset, this._resetZIndex();
      },
      _updateZIndex: function(t) {
        this._icon && (this._icon.style.zIndex = this._zIndex + t);
      },
      _animateZoom: function(t) {
        var n = this._map._latLngToNewLayerPoint(this._latlng, t.zoom, t.center).round();
        this._setPos(n);
      },
      _initInteraction: function() {
        if (this.options.interactive && (Wt(this._icon, "leaflet-interactive"), this.addInteractiveTarget(this._icon), Wa)) {
          var t = this.options.draggable;
          this.dragging && (t = this.dragging.enabled(), this.dragging.disable()), this.dragging = new Wa(this), t && this.dragging.enable();
        }
      },
      // @method setOpacity(opacity: Number): this
      // Changes the opacity of the marker.
      setOpacity: function(t) {
        return this.options.opacity = t, this._map && this._updateOpacity(), this;
      },
      _updateOpacity: function() {
        var t = this.options.opacity;
        this._icon && Qe(this._icon, t), this._shadow && Qe(this._shadow, t);
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
          var n = this.options.icon.options, s = n.iconSize ? ct(n.iconSize) : ct(0, 0), c = n.iconAnchor ? ct(n.iconAnchor) : ct(0, 0);
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
    function Ja(t, n) {
      return new ar(t, n);
    }
    var ii = Ge.extend({
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
        return ut(this, t), this._renderer && (this._renderer._updateStyle(this), this.options.stroke && t && Object.prototype.hasOwnProperty.call(t, "weight") && this._updateBounds()), this;
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
    }), sr = ii.extend({
      // @section
      // @aka CircleMarker options
      options: {
        fill: !0,
        // @option radius: Number = 10
        // Radius of the circle marker, in pixels
        radius: 10
      },
      initialize: function(t, n) {
        ut(this, n), this._latlng = $t(t), this._radius = this.options.radius;
      },
      // @method setLatLng(latLng: LatLng): this
      // Sets the position of a circle marker to a new location.
      setLatLng: function(t) {
        var n = this._latlng;
        return this._latlng = $t(t), this.redraw(), this.fire("move", { oldLatLng: n, latlng: this._latlng });
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
        return ii.prototype.setStyle.call(this, t), this.setRadius(n), this;
      },
      _project: function() {
        this._point = this._map.latLngToLayerPoint(this._latlng), this._updateBounds();
      },
      _updateBounds: function() {
        var t = this._radius, n = this._radiusY || t, s = this._clickTolerance(), c = [t + s, n + s];
        this._pxBounds = new wt(this._point.subtract(c), this._point.add(c));
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
    function Vr(t, n) {
      return new sr(t, n);
    }
    var gn = sr.extend({
      initialize: function(t, n, s) {
        if (typeof n == "number" && (n = C({}, s, { radius: n })), ut(this, n), this._latlng = $t(t), isNaN(this.options.radius))
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
        return new se(
          this._map.layerPointToLatLng(this._point.subtract(t)),
          this._map.layerPointToLatLng(this._point.add(t))
        );
      },
      setStyle: ii.prototype.setStyle,
      _project: function() {
        var t = this._latlng.lng, n = this._latlng.lat, s = this._map, c = s.options.crs;
        if (c.distance === Ne.distance) {
          var g = Math.PI / 180, E = this._mRadius / Ne.R / g, N = s.project([n + E, t]), tt = s.project([n - E, t]), at = N.add(tt).divideBy(2), mt = s.unproject(at).lat, Pt = Math.acos((Math.cos(E * g) - Math.sin(n * g) * Math.sin(mt * g)) / (Math.cos(n * g) * Math.cos(mt * g))) / g;
          (isNaN(Pt) || Pt === 0) && (Pt = E / Math.cos(Math.PI / 180 * n)), this._point = at.subtract(s.getPixelOrigin()), this._radius = isNaN(Pt) ? 0 : at.x - s.project([mt, t - Pt]).x, this._radiusY = at.y - N.y;
        } else {
          var zt = c.unproject(c.project(this._latlng).subtract([this._mRadius, 0]));
          this._point = s.latLngToLayerPoint(this._latlng), this._radius = this._point.x - s.latLngToLayerPoint(zt).x;
        }
        this._updateBounds();
      }
    });
    function lo(t, n, s) {
      return new gn(t, n, s);
    }
    var Ci = ii.extend({
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
        ut(this, n), this._setLatLngs(t);
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
        for (var n = 1 / 0, s = null, c = pn, g, E, N = 0, tt = this._parts.length; N < tt; N++)
          for (var at = this._parts[N], mt = 1, Pt = at.length; mt < Pt; mt++) {
            g = at[mt - 1], E = at[mt];
            var zt = c(t, g, E, !0);
            zt < n && (n = zt, s = c(t, g, E));
          }
        return s && (s.distance = Math.sqrt(n)), s;
      },
      // @method getCenter(): LatLng
      // Returns the center ([centroid](https://en.wikipedia.org/wiki/Centroid)) of the polyline.
      getCenter: function() {
        if (!this._map)
          throw new Error("Must add layer to map before using getCenter()");
        return qa(this._defaultShape(), this._map.options.crs);
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
        return n = n || this._defaultShape(), t = $t(t), n.push(t), this._bounds.extend(t), this.redraw();
      },
      _setLatLngs: function(t) {
        this._bounds = new se(), this._latlngs = this._convertLatLngs(t);
      },
      _defaultShape: function() {
        return ei(this._latlngs) ? this._latlngs : this._latlngs[0];
      },
      // recursively convert latlngs input into actual LatLng instances; calculate bounds along the way
      _convertLatLngs: function(t) {
        for (var n = [], s = ei(t), c = 0, g = t.length; c < g; c++)
          s ? (n[c] = $t(t[c]), this._bounds.extend(n[c])) : n[c] = this._convertLatLngs(t[c]);
        return n;
      },
      _project: function() {
        var t = new wt();
        this._rings = [], this._projectLatlngs(this._latlngs, this._rings, t), this._bounds.isValid() && t.isValid() && (this._rawPxBounds = t, this._updateBounds());
      },
      _updateBounds: function() {
        var t = this._clickTolerance(), n = new ot(t, t);
        this._rawPxBounds && (this._pxBounds = new wt([
          this._rawPxBounds.min.subtract(n),
          this._rawPxBounds.max.add(n)
        ]));
      },
      // recursively turns latlngs into a set of rings with projected coordinates
      _projectLatlngs: function(t, n, s) {
        var c = t[0] instanceof Yt, g = t.length, E, N;
        if (c) {
          for (N = [], E = 0; E < g; E++)
            N[E] = this._map.latLngToLayerPoint(t[E]), s.extend(N[E]);
          n.push(N);
        } else
          for (E = 0; E < g; E++)
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
          var n = this._parts, s, c, g, E, N, tt, at;
          for (s = 0, g = 0, E = this._rings.length; s < E; s++)
            for (at = this._rings[s], c = 0, N = at.length; c < N - 1; c++)
              tt = ti(at[c], at[c + 1], t, c, !0), tt && (n[g] = n[g] || [], n[g].push(tt[0]), (tt[1] !== at[c + 1] || c === N - 2) && (n[g].push(tt[1]), g++));
        }
      },
      // simplify each clipped part of the polyline for performance
      _simplifyPoints: function() {
        for (var t = this._parts, n = this.options.smoothFactor, s = 0, c = t.length; s < c; s++)
          t[s] = Za(t[s], n);
      },
      _update: function() {
        this._map && (this._clipPoints(), this._simplifyPoints(), this._updatePath());
      },
      _updatePath: function() {
        this._renderer._updatePoly(this);
      },
      // Needed by the `Canvas` renderer for interactivity
      _containsPoint: function(t, n) {
        var s, c, g, E, N, tt, at = this._clickTolerance();
        if (!this._pxBounds || !this._pxBounds.contains(t))
          return !1;
        for (s = 0, E = this._parts.length; s < E; s++)
          for (tt = this._parts[s], c = 0, N = tt.length, g = N - 1; c < N; g = c++)
            if (!(!n && c === 0) && Se(t, tt[g], tt[c]) <= at)
              return !0;
        return !1;
      }
    });
    function Gr(t, n) {
      return new Ci(t, n);
    }
    Ci._flat = Ha;
    var ze = Ci.extend({
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
        return Va(this._defaultShape(), this._map.options.crs);
      },
      _convertLatLngs: function(t) {
        var n = Ci.prototype._convertLatLngs.call(this, t), s = n.length;
        return s >= 2 && n[0] instanceof Yt && n[0].equals(n[s - 1]) && n.pop(), n;
      },
      _setLatLngs: function(t) {
        Ci.prototype._setLatLngs.call(this, t), ei(this._latlngs) && (this._latlngs = [this._latlngs]);
      },
      _defaultShape: function() {
        return ei(this._latlngs[0]) ? this._latlngs[0] : this._latlngs[0][0];
      },
      _clipPoints: function() {
        var t = this._renderer._bounds, n = this.options.weight, s = new ot(n, n);
        if (t = new wt(t.min.subtract(s), t.max.add(s)), this._parts = [], !(!this._pxBounds || !this._pxBounds.intersects(t))) {
          if (this.options.noClip) {
            this._parts = this._rings;
            return;
          }
          for (var c = 0, g = this._rings.length, E; c < g; c++)
            E = Ua(this._rings[c], t, !0), E.length && this._parts.push(E);
        }
      },
      _updatePath: function() {
        this._renderer._updatePoly(this, !0);
      },
      // Needed by the `Canvas` renderer for interactivity
      _containsPoint: function(t) {
        var n = !1, s, c, g, E, N, tt, at, mt;
        if (!this._pxBounds || !this._pxBounds.contains(t))
          return !1;
        for (E = 0, at = this._parts.length; E < at; E++)
          for (s = this._parts[E], N = 0, mt = s.length, tt = mt - 1; N < mt; tt = N++)
            c = s[N], g = s[tt], c.y > t.y != g.y > t.y && t.x < (g.x - c.x) * (t.y - c.y) / (g.y - c.y) + c.x && (n = !n);
        return n || Ci.prototype._containsPoint.call(this, t, !0);
      }
    });
    function Zr(t, n) {
      return new ze(t, n);
    }
    var ki = pi.extend({
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
        ut(this, n), this._layers = {}, t && this.addData(t);
      },
      // @method addData( <GeoJSON> data ): this
      // Adds a GeoJSON object to the layer.
      addData: function(t) {
        var n = Tt(t) ? t : t.features, s, c, g;
        if (n) {
          for (s = 0, c = n.length; s < c; s++)
            g = n[s], (g.geometries || g.geometry || g.features || g.coordinates) && this.addData(g);
          return this;
        }
        var E = this.options;
        if (E.filter && !E.filter(t))
          return this;
        var N = In(t, E);
        return N ? (N.feature = or(t), N.defaultOptions = N.options, this.resetStyle(N), E.onEachFeature && E.onEachFeature(t, N), this.addLayer(N)) : this;
      },
      // @method resetStyle( <Path> layer? ): this
      // Resets the given vector layer's style to the original GeoJSON style, useful for resetting style after hover events.
      // If `layer` is omitted, the style of all features in the current layer is reset.
      resetStyle: function(t) {
        return t === void 0 ? this.eachLayer(this.resetStyle, this) : (t.options = C({}, t.defaultOptions), this._setLayerStyle(t, this.options.style), this);
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
    function In(t, n) {
      var s = t.type === "Feature" ? t.geometry : t, c = s ? s.coordinates : null, g = [], E = n && n.pointToLayer, N = n && n.coordsToLatLng || Hr, tt, at, mt, Pt;
      if (!c && !s)
        return null;
      switch (s.type) {
        case "Point":
          return tt = N(c), Xa(E, t, tt, n);
        case "MultiPoint":
          for (mt = 0, Pt = c.length; mt < Pt; mt++)
            tt = N(c[mt]), g.push(Xa(E, t, tt, n));
          return new pi(g);
        case "LineString":
        case "MultiLineString":
          return at = Xe(c, s.type === "LineString" ? 0 : 1, N), new Ci(at, n);
        case "Polygon":
        case "MultiPolygon":
          return at = Xe(c, s.type === "Polygon" ? 1 : 2, N), new ze(at, n);
        case "GeometryCollection":
          for (mt = 0, Pt = s.geometries.length; mt < Pt; mt++) {
            var zt = In({
              geometry: s.geometries[mt],
              type: "Feature",
              properties: t.properties
            }, n);
            zt && g.push(zt);
          }
          return new pi(g);
        case "FeatureCollection":
          for (mt = 0, Pt = s.features.length; mt < Pt; mt++) {
            var Qt = In(s.features[mt], n);
            Qt && g.push(Qt);
          }
          return new pi(g);
        default:
          throw new Error("Invalid GeoJSON object.");
      }
    }
    function Xa(t, n, s, c) {
      return t ? t(n, s) : new ar(s, c && c.markersInheritOptions && c);
    }
    function Hr(t) {
      return new Yt(t[1], t[0], t[2]);
    }
    function Xe(t, n, s) {
      for (var c = [], g = 0, E = t.length, N; g < E; g++)
        N = n ? Xe(t[g], n - 1, s) : (s || Hr)(t[g]), c.push(N);
      return c;
    }
    function Ei(t, n) {
      return t = $t(t), t.alt !== void 0 ? [q(t.lng, n), q(t.lat, n), q(t.alt, n)] : [q(t.lng, n), q(t.lat, n)];
    }
    function Ki(t, n, s, c) {
      for (var g = [], E = 0, N = t.length; E < N; E++)
        g.push(n ? Ki(t[E], ei(t[E]) ? 0 : n - 1, s, c) : Ei(t[E], c));
      return !n && s && g.length > 0 && g.push(g[0].slice()), g;
    }
    function Wi(t, n) {
      return t.feature ? C({}, t.feature, { geometry: n }) : or(n);
    }
    function or(t) {
      return t.type === "Feature" || t.type === "FeatureCollection" ? t : {
        type: "Feature",
        properties: {},
        geometry: t
      };
    }
    var qr = {
      toGeoJSON: function(t) {
        return Wi(this, {
          type: "Point",
          coordinates: Ei(this.getLatLng(), t)
        });
      }
    };
    ar.include(qr), gn.include(qr), sr.include(qr), Ci.include({
      toGeoJSON: function(t) {
        var n = !ei(this._latlngs), s = Ki(this._latlngs, n ? 1 : 0, !1, t);
        return Wi(this, {
          type: (n ? "Multi" : "") + "LineString",
          coordinates: s
        });
      }
    }), ze.include({
      toGeoJSON: function(t) {
        var n = !ei(this._latlngs), s = n && !ei(this._latlngs[0]), c = Ki(this._latlngs, s ? 2 : n ? 1 : 0, !0, t);
        return n || (c = [c]), Wi(this, {
          type: (s ? "Multi" : "") + "Polygon",
          coordinates: c
        });
      }
    }), wi.include({
      toMultiPoint: function(t) {
        var n = [];
        return this.eachLayer(function(s) {
          n.push(s.toGeoJSON(t).geometry.coordinates);
        }), Wi(this, {
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
        return this.eachLayer(function(g) {
          if (g.toGeoJSON) {
            var E = g.toGeoJSON(t);
            if (s)
              c.push(E.geometry);
            else {
              var N = or(E);
              N.type === "FeatureCollection" ? c.push.apply(c, N.features) : c.push(N);
            }
          }
        }), s ? Wi(this, {
          geometries: c,
          type: "GeometryCollection"
        }) : {
          type: "FeatureCollection",
          features: c
        };
      }
    });
    function Ya(t, n) {
      return new ki(t, n);
    }
    var uo = Ya, mn = Ge.extend({
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
        this._url = t, this._bounds = Vt(n), ut(this, s);
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
        return this._map && on(this._image), this;
      },
      // @method bringToBack(): this
      // Brings the layer to the bottom of all overlays.
      bringToBack: function() {
        return this._map && ln(this._image), this;
      },
      // @method setUrl(url: String): this
      // Changes the URL of the image.
      setUrl: function(t) {
        return this._url = t, this._image && (this._image.src = t), this;
      },
      // @method setBounds(bounds: LatLngBounds): this
      // Update the bounds that this ImageOverlay covers
      setBounds: function(t) {
        return this._bounds = Vt(t), this._map && this._reset(), this;
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
        if (Wt(n, "leaflet-image-layer"), this._zoomAnimated && Wt(n, "leaflet-zoom-animated"), this.options.className && Wt(n, this.options.className), n.onselectstart = j, n.onmousemove = j, n.onload = x(this.fire, this, "load"), n.onerror = x(this._overlayOnError, this, "error"), (this.options.crossOrigin || this.options.crossOrigin === "") && (n.crossOrigin = this.options.crossOrigin === !0 ? "" : this.options.crossOrigin), this.options.zIndex && this._updateZIndex(), t) {
          this._url = n.src;
          return;
        }
        n.src = this._url, n.alt = this.options.alt;
      },
      _animateZoom: function(t) {
        var n = this._map.getZoomScale(t.zoom), s = this._map._latLngBoundsToNewLayerBounds(this._bounds, t.zoom, t.center).min;
        Zi(this._image, s, n);
      },
      _reset: function() {
        var t = this._image, n = new wt(
          this._map.latLngToLayerPoint(this._bounds.getNorthWest()),
          this._map.latLngToLayerPoint(this._bounds.getSouthEast())
        ), s = n.getSize();
        we(t, n.min), t.style.width = s.x + "px", t.style.height = s.y + "px";
      },
      _updateOpacity: function() {
        Qe(this._image, this.options.opacity);
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
    }), ho = function(t, n, s) {
      return new mn(t, n, s);
    }, Qa = mn.extend({
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
        if (Wt(n, "leaflet-image-layer"), this._zoomAnimated && Wt(n, "leaflet-zoom-animated"), this.options.className && Wt(n, this.options.className), n.onselectstart = j, n.onmousemove = j, n.onloadeddata = x(this.fire, this, "load"), t) {
          for (var s = n.getElementsByTagName("source"), c = [], g = 0; g < s.length; g++)
            c.push(s[g].src);
          this._url = s.length > 0 ? c : [n.src];
          return;
        }
        Tt(this._url) || (this._url = [this._url]), !this.options.keepAspectRatio && Object.prototype.hasOwnProperty.call(n.style, "objectFit") && (n.style.objectFit = "fill"), n.autoplay = !!this.options.autoplay, n.loop = !!this.options.loop, n.muted = !!this.options.muted, n.playsInline = !!this.options.playsInline;
        for (var E = 0; E < this._url.length; E++) {
          var N = oe("source");
          N.src = this._url[E], n.appendChild(N);
        }
      }
      // @method getElement(): HTMLVideoElement
      // Returns the instance of [`HTMLVideoElement`](https://developer.mozilla.org/docs/Web/API/HTMLVideoElement)
      // used by this overlay.
    });
    function co(t, n, s) {
      return new Qa(t, n, s);
    }
    var Kr = mn.extend({
      _initImage: function() {
        var t = this._image = this._url;
        Wt(t, "leaflet-image-layer"), this._zoomAnimated && Wt(t, "leaflet-zoom-animated"), this.options.className && Wt(t, this.options.className), t.onselectstart = j, t.onmousemove = j;
      }
      // @method getElement(): SVGElement
      // Returns the instance of [`SVGElement`](https://developer.mozilla.org/docs/Web/API/SVGElement)
      // used by this overlay.
    });
    function fo(t, n, s) {
      return new Kr(t, n, s);
    }
    var _i = Ge.extend({
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
        t && (t instanceof Yt || Tt(t)) ? (this._latlng = $t(t), ut(this, n)) : (ut(this, t), this._source = n), this.options.content && (this._content = this.options.content);
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
        this._zoomAnimated = t._zoomAnimated, this._container || this._initLayout(), t._fadeAnimated && Qe(this._container, 0), clearTimeout(this._removeTimeout), this.getPane().appendChild(this._container), this.update(), t._fadeAnimated && Qe(this._container, 1), this.bringToFront(), this.options.interactive && (Wt(this._container, "leaflet-interactive"), this.addInteractiveTarget(this._container));
      },
      onRemove: function(t) {
        t._fadeAnimated ? (Qe(this._container, 0), this._removeTimeout = setTimeout(x(ye, void 0, this._container), 200)) : ye(this._container), this.options.interactive && (be(this._container, "leaflet-interactive"), this.removeInteractiveTarget(this._container));
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
        return this._latlng = $t(t), this._map && (this._updatePosition(), this._adjustPan()), this;
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
        return this._map && on(this._container), this;
      },
      // @method bringToBack: this
      // Brings this overlay to the back of other overlays (in the same map pane).
      bringToBack: function() {
        return this._map && ln(this._container), this;
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
          var t = this._map.latLngToLayerPoint(this._latlng), n = ct(this.options.offset), s = this._getAnchor();
          this._zoomAnimated ? we(this._container, t.add(s)) : n = n.add(t).add(s);
          var c = this._containerBottom = -n.y, g = this._containerLeft = -Math.round(this._containerWidth / 2) + n.x;
          this._container.style.bottom = c + "px", this._container.style.left = g + "px";
        }
      },
      _getAnchor: function() {
        return [0, 0];
      }
    });
    ie.include({
      _initOverlay: function(t, n, s, c) {
        var g = n;
        return g instanceof t || (g = new t(c).setContent(n)), s && g.setLatLng(s), g;
      }
    }), Ge.include({
      _initOverlay: function(t, n, s, c) {
        var g = s;
        return g instanceof t ? (ut(g, c), g._source = this) : (g = n && !c ? n : new t(c, this), g.setContent(s)), g;
      }
    });
    var On = _i.extend({
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
        _i.prototype.onAdd.call(this, t), t.fire("popupopen", { popup: this }), this._source && (this._source.fire("popupopen", { popup: this }, !0), this._source instanceof ii || this._source.on("preclick", Hi));
      },
      onRemove: function(t) {
        _i.prototype.onRemove.call(this, t), t.fire("popupclose", { popup: this }), this._source && (this._source.fire("popupclose", { popup: this }, !0), this._source instanceof ii || this._source.off("preclick", Hi));
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
        if (this._contentNode = oe("div", t + "-content", s), Sn(n), Rr(this._contentNode), Ht(n, "contextmenu", Hi), this._tipContainer = oe("div", t + "-tip-container", n), this._tip = oe("div", t + "-tip", this._tipContainer), this.options.closeButton) {
          var c = this._closeButton = oe("a", t + "-close-button", n);
          c.setAttribute("role", "button"), c.setAttribute("aria-label", "Close popup"), c.href = "#close", c.innerHTML = '<span aria-hidden="true">&#215;</span>', Ht(c, "click", function(g) {
            De(g), this.close();
          }, this);
        }
      },
      _updateLayout: function() {
        var t = this._contentNode, n = t.style;
        n.width = "", n.whiteSpace = "nowrap";
        var s = t.offsetWidth;
        s = Math.min(s, this.options.maxWidth), s = Math.max(s, this.options.minWidth), n.width = s + 1 + "px", n.whiteSpace = "", n.height = "";
        var c = t.offsetHeight, g = this.options.maxHeight, E = "leaflet-popup-scrolled";
        g && c > g ? (n.height = g + "px", Wt(t, E)) : be(t, E), this._containerWidth = this._container.offsetWidth;
      },
      _animateZoom: function(t) {
        var n = this._map._latLngToNewLayerPoint(this._latlng, t.zoom, t.center), s = this._getAnchor();
        we(this._container, n.add(s));
      },
      _adjustPan: function() {
        if (this.options.autoPan) {
          if (this._map._panAnim && this._map._panAnim.stop(), this._autopanning) {
            this._autopanning = !1;
            return;
          }
          var t = this._map, n = parseInt(Ii(this._container, "marginBottom"), 10) || 0, s = this._container.offsetHeight + n, c = this._containerWidth, g = new ot(this._containerLeft, -s - this._containerBottom);
          g._add(Oi(this._container));
          var E = t.layerPointToContainerPoint(g), N = ct(this.options.autoPanPadding), tt = ct(this.options.autoPanPaddingTopLeft || N), at = ct(this.options.autoPanPaddingBottomRight || N), mt = t.getSize(), Pt = 0, zt = 0;
          E.x + c + at.x > mt.x && (Pt = E.x + c - mt.x + at.x), E.x - Pt - tt.x < 0 && (Pt = E.x - tt.x), E.y + s + at.y > mt.y && (zt = E.y + s - mt.y + at.y), E.y - zt - tt.y < 0 && (zt = E.y - tt.y), (Pt || zt) && (this.options.keepInView && (this._autopanning = !0), t.fire("autopanstart").panBy([Pt, zt]));
        }
      },
      _getAnchor: function() {
        return ct(this._source && this._source._getPopupAnchor ? this._source._getPopupAnchor() : [0, 0]);
      }
    }), po = function(t, n) {
      return new On(t, n);
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
        return this._initOverlay(On, t, n, s).openOn(this), this;
      },
      // @method closePopup(popup?: Popup): this
      // Closes the popup previously opened with [openPopup](#map-openpopup) (or the given one).
      closePopup: function(t) {
        return t = arguments.length ? t : this._popup, t && t.close(), this;
      }
    }), Ge.include({
      // @method bindPopup(content: String|HTMLElement|Function|Popup, options?: Popup options): this
      // Binds a popup to the layer with the passed `content` and sets up the
      // necessary event listeners. If a `Function` is passed it will receive
      // the layer as the first argument and should return a `String` or `HTMLElement`.
      bindPopup: function(t, n) {
        return this._popup = this._initOverlay(On, this._popup, t, n), this._popupHandlersAdded || (this.on({
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
          qi(t);
          var n = t.layer || t.target;
          if (this._popup._source === n && !(n instanceof ii)) {
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
    var lr = _i.extend({
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
        this._contentNode = this._container = oe("div", n), this._container.setAttribute("role", "tooltip"), this._container.setAttribute("id", "leaflet-tooltip-" + k(this));
      },
      _updateLayout: function() {
      },
      _adjustPan: function() {
      },
      _setPosition: function(t) {
        var n, s, c = this._map, g = this._container, E = c.latLngToContainerPoint(c.getCenter()), N = c.layerPointToContainerPoint(t), tt = this.options.direction, at = g.offsetWidth, mt = g.offsetHeight, Pt = ct(this.options.offset), zt = this._getAnchor();
        tt === "top" ? (n = at / 2, s = mt) : tt === "bottom" ? (n = at / 2, s = 0) : tt === "center" ? (n = at / 2, s = mt / 2) : tt === "right" ? (n = 0, s = mt / 2) : tt === "left" ? (n = at, s = mt / 2) : N.x < E.x ? (tt = "right", n = 0, s = mt / 2) : (tt = "left", n = at + (Pt.x + zt.x) * 2, s = mt / 2), t = t.subtract(ct(n, s, !0)).add(Pt).add(zt), be(g, "leaflet-tooltip-right"), be(g, "leaflet-tooltip-left"), be(g, "leaflet-tooltip-top"), be(g, "leaflet-tooltip-bottom"), Wt(g, "leaflet-tooltip-" + tt), we(g, t);
      },
      _updatePosition: function() {
        var t = this._map.latLngToLayerPoint(this._latlng);
        this._setPosition(t);
      },
      setOpacity: function(t) {
        this.options.opacity = t, this._container && Qe(this._container, t);
      },
      _animateZoom: function(t) {
        var n = this._map._latLngToNewLayerPoint(this._latlng, t.zoom, t.center);
        this._setPosition(n);
      },
      _getAnchor: function() {
        return ct(this._source && this._source._getTooltipAnchor && !this.options.sticky ? this._source._getTooltipAnchor() : [0, 0]);
      }
    }), _o = function(t, n) {
      return new lr(t, n);
    };
    ie.include({
      // @method openTooltip(tooltip: Tooltip): this
      // Opens the specified tooltip.
      // @alternative
      // @method openTooltip(content: String|HTMLElement, latlng: LatLng, options?: Tooltip options): this
      // Creates a tooltip with the specified content and options and open it.
      openTooltip: function(t, n, s) {
        return this._initOverlay(lr, t, n, s).openOn(this), this;
      },
      // @method closeTooltip(tooltip: Tooltip): this
      // Closes the tooltip given as parameter.
      closeTooltip: function(t) {
        return t.close(), this;
      }
    }), Ge.include({
      // @method bindTooltip(content: String|HTMLElement|Function|Tooltip, options?: Tooltip options): this
      // Binds a tooltip to the layer with the passed `content` and sets up the
      // necessary event listeners. If a `Function` is passed it will receive
      // the layer as the first argument and should return a `String` or `HTMLElement`.
      bindTooltip: function(t, n) {
        return this._tooltip && this.isTooltipOpen() && this.unbindTooltip(), this._tooltip = this._initOverlay(lr, this._tooltip, t, n), this._initTooltipInteractions(), this._tooltip.options.permanent && this._map && this._map.hasLayer(this) && this.openTooltip(), this;
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
        n && (Ht(n, "focus", function() {
          this._tooltip._source = t, this.openTooltip();
        }, this), Ht(n, "blur", this.closeTooltip, this));
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
    var Ni = _n.extend({
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
        if (s.html instanceof Element ? (En(n), n.appendChild(s.html)) : n.innerHTML = s.html !== !1 ? s.html : "", s.bgPos) {
          var c = ct(s.bgPos);
          n.style.backgroundPosition = -c.x + "px " + -c.y + "px";
        }
        return this._setIconStyles(n, "icon"), n;
      },
      createShadow: function() {
        return null;
      }
    });
    function Fn(t) {
      return new Ni(t);
    }
    _n.Default = Dn;
    var Rn = Ge.extend({
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
        updateWhenIdle: Ft.mobile,
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
        ut(this, t);
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
        return this._map && (on(this._container), this._setAutoZIndex(Math.max)), this;
      },
      // @method bringToBack: this
      // Brings the tile layer to the bottom of all tile layers.
      bringToBack: function() {
        return this._map && (ln(this._container), this._setAutoZIndex(Math.min)), this;
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
        return this.options.updateWhenIdle || (this._onMove || (this._onMove = F(this._onMoveEnd, this.options.updateInterval, this)), t.move = this._onMove), this._zoomAnimated && (t.zoomanim = this._animateZoom), t;
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
        return t instanceof ot ? t : new ot(t, t);
      },
      _updateZIndex: function() {
        this._container && this.options.zIndex !== void 0 && this.options.zIndex !== null && (this._container.style.zIndex = this.options.zIndex);
      },
      _setAutoZIndex: function(t) {
        for (var n = this.getPane().children, s = -t(-1 / 0, 1 / 0), c = 0, g = n.length, E; c < g; c++)
          E = n[c].style.zIndex, n[c] !== this._container && E && (s = t(s, +E));
        isFinite(s) && (this.options.zIndex = s + t(-1, 1), this._updateZIndex());
      },
      _updateOpacity: function() {
        if (this._map && !Ft.ielt9) {
          Qe(this._container, this.options.opacity);
          var t = +/* @__PURE__ */ new Date(), n = !1, s = !1;
          for (var c in this._tiles) {
            var g = this._tiles[c];
            if (!(!g.current || !g.loaded)) {
              var E = Math.min(1, (t - g.loaded) / 200);
              Qe(g.el, E), E < 1 ? n = !0 : (g.active ? s = !0 : this._onOpaqueTile(g), g.active = !0);
            }
          }
          s && !this._noPrune && this._pruneTiles(), n && (_e(this._fadeFrame), this._fadeFrame = Kt(this._updateOpacity, this));
        }
      },
      _onOpaqueTile: j,
      _initContainer: function() {
        this._container || (this._container = oe("div", "leaflet-layer " + (this.options.className || "")), this._updateZIndex(), this.options.opacity < 1 && this._updateOpacity(), this.getPane().appendChild(this._container));
      },
      _updateLevels: function() {
        var t = this._tileZoom, n = this.options.maxZoom;
        if (t !== void 0) {
          for (var s in this._levels)
            s = Number(s), this._levels[s].el.children.length || s === t ? (this._levels[s].el.style.zIndex = n - Math.abs(t - s), this._onUpdateLevel(s)) : (ye(this._levels[s].el), this._removeTilesAtZoom(s), this._onRemoveLevel(s), delete this._levels[s]);
          var c = this._levels[t], g = this._map;
          return c || (c = this._levels[t] = {}, c.el = oe("div", "leaflet-tile-container leaflet-zoom-animated", this._container), c.el.style.zIndex = n, c.origin = g.project(g.unproject(g.getPixelOrigin()), t).round(), c.zoom = t, this._setZoomTransform(c, g.getCenter(), g.getZoom()), j(c.el.offsetWidth), this._onCreateLevel(c)), this._level = c, c;
        }
      },
      _onUpdateLevel: j,
      _onRemoveLevel: j,
      _onCreateLevel: j,
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
        var g = Math.floor(t / 2), E = Math.floor(n / 2), N = s - 1, tt = new ot(+g, +E);
        tt.z = +N;
        var at = this._tileCoordsToKey(tt), mt = this._tiles[at];
        return mt && mt.active ? (mt.retain = !0, !0) : (mt && mt.loaded && (mt.retain = !0), N > c ? this._retainParent(g, E, N, c) : !1);
      },
      _retainChildren: function(t, n, s, c) {
        for (var g = 2 * t; g < 2 * t + 2; g++)
          for (var E = 2 * n; E < 2 * n + 2; E++) {
            var N = new ot(g, E);
            N.z = s + 1;
            var tt = this._tileCoordsToKey(N), at = this._tiles[tt];
            if (at && at.active) {
              at.retain = !0;
              continue;
            } else at && at.loaded && (at.retain = !0);
            s + 1 < c && this._retainChildren(g, E, s + 1, c);
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
        var g = Math.round(n);
        this.options.maxZoom !== void 0 && g > this.options.maxZoom || this.options.minZoom !== void 0 && g < this.options.minZoom ? g = void 0 : g = this._clampZoom(g);
        var E = this.options.updateWhenZooming && g !== this._tileZoom;
        (!c || E) && (this._tileZoom = g, this._abortLoading && this._abortLoading(), this._updateLevels(), this._resetGrid(), g !== void 0 && this._update(t), s || this._pruneTiles(), this._noPrune = !!s), this._setZoomTransforms(t, n);
      },
      _setZoomTransforms: function(t, n) {
        for (var s in this._levels)
          this._setZoomTransform(this._levels[s], t, n);
      },
      _setZoomTransform: function(t, n, s) {
        var c = this._map.getZoomScale(s, t.zoom), g = t.origin.multiplyBy(c).subtract(this._map._getNewPixelOrigin(n, s)).round();
        Ft.any3d ? Zi(t.el, g, c) : we(t.el, g);
      },
      _resetGrid: function() {
        var t = this._map, n = t.options.crs, s = this._tileSize = this.getTileSize(), c = this._tileZoom, g = this._map.getPixelWorldBounds(this._tileZoom);
        g && (this._globalTileRange = this._pxBoundsToTileRange(g)), this._wrapX = n.wrapLng && !this.options.noWrap && [
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
        var n = this._map, s = n._animatingZoom ? Math.max(n._animateToZoom, n.getZoom()) : n.getZoom(), c = n.getZoomScale(s, this._tileZoom), g = n.project(t, this._tileZoom).floor(), E = n.getSize().divideBy(c * 2);
        return new wt(g.subtract(E), g.add(E));
      },
      // Private method to load tiles in the grid's active zoom level according to map bounds
      _update: function(t) {
        var n = this._map;
        if (n) {
          var s = this._clampZoom(n.getZoom());
          if (t === void 0 && (t = n.getCenter()), this._tileZoom !== void 0) {
            var c = this._getTiledPixelBounds(t), g = this._pxBoundsToTileRange(c), E = g.getCenter(), N = [], tt = this.options.keepBuffer, at = new wt(
              g.getBottomLeft().subtract([tt, -tt]),
              g.getTopRight().add([tt, -tt])
            );
            if (!(isFinite(g.min.x) && isFinite(g.min.y) && isFinite(g.max.x) && isFinite(g.max.y)))
              throw new Error("Attempted to load an infinite number of tiles");
            for (var mt in this._tiles) {
              var Pt = this._tiles[mt].coords;
              (Pt.z !== this._tileZoom || !at.contains(new ot(Pt.x, Pt.y))) && (this._tiles[mt].current = !1);
            }
            if (Math.abs(s - this._tileZoom) > 1) {
              this._setView(t, s);
              return;
            }
            for (var zt = g.min.y; zt <= g.max.y; zt++)
              for (var Qt = g.min.x; Qt <= g.max.x; Qt++) {
                var $e = new ot(Qt, zt);
                if ($e.z = this._tileZoom, !!this._isValidTile($e)) {
                  var Ae = this._tiles[this._tileCoordsToKey($e)];
                  Ae ? Ae.current = !0 : N.push($e);
                }
              }
            if (N.sort(function(Ze, ji) {
              return Ze.distanceTo(E) - ji.distanceTo(E);
            }), N.length !== 0) {
              this._loading || (this._loading = !0, this.fire("loading"));
              var ri = document.createDocumentFragment();
              for (Qt = 0; Qt < N.length; Qt++)
                this._addTile(N[Qt], ri);
              this._level.el.appendChild(ri);
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
        return Vt(this.options.bounds).overlaps(c);
      },
      _keyToBounds: function(t) {
        return this._tileCoordsToBounds(this._keyToTileCoords(t));
      },
      _tileCoordsToNwSe: function(t) {
        var n = this._map, s = this.getTileSize(), c = t.scaleBy(s), g = c.add(s), E = n.unproject(c, t.z), N = n.unproject(g, t.z);
        return [E, N];
      },
      // converts tile coordinates to its geographical bounds
      _tileCoordsToBounds: function(t) {
        var n = this._tileCoordsToNwSe(t), s = new se(n[0], n[1]);
        return this.options.noWrap || (s = this._map.wrapLatLngBounds(s)), s;
      },
      // converts tile coordinates to key for the tile cache
      _tileCoordsToKey: function(t) {
        return t.x + ":" + t.y + ":" + t.z;
      },
      // converts tile cache key to coordinates
      _keyToTileCoords: function(t) {
        var n = t.split(":"), s = new ot(+n[0], +n[1]);
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
        t.style.width = n.x + "px", t.style.height = n.y + "px", t.onselectstart = j, t.onmousemove = j, Ft.ielt9 && this.options.opacity < 1 && Qe(t, this.options.opacity);
      },
      _addTile: function(t, n) {
        var s = this._getTilePos(t), c = this._tileCoordsToKey(t), g = this.createTile(this._wrapCoords(t), x(this._tileReady, this, t));
        this._initTile(g), this.createTile.length < 2 && Kt(x(this._tileReady, this, t, null, g)), we(g, s), this._tiles[c] = {
          el: g,
          coords: t,
          current: !0
        }, n.appendChild(g), this.fire("tileloadstart", {
          tile: g,
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
        s = this._tiles[c], s && (s.loaded = +/* @__PURE__ */ new Date(), this._map._fadeAnimated ? (Qe(s.el, 0), _e(this._fadeFrame), this._fadeFrame = Kt(this._updateOpacity, this)) : (s.active = !0, this._pruneTiles()), n || (Wt(s.el, "leaflet-tile-loaded"), this.fire("tileload", {
          tile: s.el,
          coords: t
        })), this._noTilesToLoad() && (this._loading = !1, this.fire("load"), Ft.ielt9 || !this._map._fadeAnimated ? Kt(this._pruneTiles, this) : setTimeout(x(this._pruneTiles, this), 250)));
      },
      _getTilePos: function(t) {
        return t.scaleBy(this.getTileSize()).subtract(this._level.origin);
      },
      _wrapCoords: function(t) {
        var n = new ot(
          this._wrapX ? Z(t.x, this._wrapX) : t.x,
          this._wrapY ? Z(t.y, this._wrapY) : t.y
        );
        return n.z = t.z, n;
      },
      _pxBoundsToTileRange: function(t) {
        var n = this.getTileSize();
        return new wt(
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
    function ts(t) {
      return new Rn(t);
    }
    var zi = Rn.extend({
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
        this._url = t, n = ut(this, n), n.detectRetina && Ft.retina && n.maxZoom > 0 ? (n.tileSize = Math.floor(n.tileSize / 2), n.zoomReverse ? (n.zoomOffset--, n.minZoom = Math.min(n.maxZoom, n.minZoom + 1)) : (n.zoomOffset++, n.maxZoom = Math.max(n.minZoom, n.maxZoom - 1)), n.minZoom = Math.max(0, n.minZoom)) : n.zoomReverse ? n.minZoom = Math.min(n.maxZoom, n.minZoom) : n.maxZoom = Math.max(n.minZoom, n.maxZoom), typeof n.subdomains == "string" && (n.subdomains = n.subdomains.split("")), this.on("tileunload", this._onTileRemove);
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
        return Ht(s, "load", x(this._tileOnLoad, this, n, s)), Ht(s, "error", x(this._tileOnError, this, n, s)), (this.options.crossOrigin || this.options.crossOrigin === "") && (s.crossOrigin = this.options.crossOrigin === !0 ? "" : this.options.crossOrigin), typeof this.options.referrerPolicy == "string" && (s.referrerPolicy = this.options.referrerPolicy), s.alt = "", s.src = this.getTileUrl(t), s;
      },
      // @section Extension methods
      // @uninheritable
      // Layers extending `TileLayer` might reimplement the following method.
      // @method getTileUrl(coords: Object): String
      // Called only internally, returns the URL for a tile given its coordinates.
      // Classes extending `TileLayer` can override this function to provide custom tile URL naming schemes.
      getTileUrl: function(t) {
        var n = {
          r: Ft.retina ? "@2x" : "",
          s: this._getSubdomain(t),
          x: t.x,
          y: t.y,
          z: this._getZoomForUrl()
        };
        if (this._map && !this._map.options.crs.infinite) {
          var s = this._globalTileRange.max.y - t.y;
          this.options.tms && (n.y = s), n["-y"] = s;
        }
        return Et(this._url, C(n, this.options));
      },
      _tileOnLoad: function(t, n) {
        Ft.ielt9 ? setTimeout(x(t, this, null, n), 0) : t(null, n);
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
          if (this._tiles[t].coords.z !== this._tileZoom && (n = this._tiles[t].el, n.onload = j, n.onerror = j, !n.complete)) {
            n.src = vt;
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
          return n.el.setAttribute("src", vt), Rn.prototype._removeTile.call(this, t);
      },
      _tileReady: function(t, n, s) {
        if (!(!this._map || s && s.getAttribute("src") === vt))
          return Rn.prototype._tileReady.call(this, t, n, s);
      }
    });
    function es(t, n) {
      return new zi(t, n);
    }
    var is = zi.extend({
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
        var s = C({}, this.defaultWmsParams);
        for (var c in n)
          c in this.options || (s[c] = n[c]);
        n = ut(this, n);
        var g = n.detectRetina && Ft.retina ? 2 : 1, E = this.getTileSize();
        s.width = E.x * g, s.height = E.y * g, this.wmsParams = s;
      },
      onAdd: function(t) {
        this._crs = this.options.crs || t.options.crs, this._wmsVersion = parseFloat(this.wmsParams.version);
        var n = this._wmsVersion >= 1.3 ? "crs" : "srs";
        this.wmsParams[n] = this._crs.code, zi.prototype.onAdd.call(this, t);
      },
      getTileUrl: function(t) {
        var n = this._tileCoordsToNwSe(t), s = this._crs, c = Mt(s.project(n[0]), s.project(n[1])), g = c.min, E = c.max, N = (this._wmsVersion >= 1.3 && this._crs === Ur ? [g.y, g.x, E.y, E.x] : [g.x, g.y, E.x, E.y]).join(","), tt = zi.prototype.getTileUrl.call(this, t);
        return tt + _t(this.wmsParams, tt, this.options.uppercase) + (this.options.uppercase ? "&BBOX=" : "&bbox=") + N;
      },
      // @method setParams(params: Object, noRedraw?: Boolean): this
      // Merges an object with the new parameters and re-requests tiles on the current screen (unless `noRedraw` was set to true).
      setParams: function(t, n) {
        return C(this.wmsParams, t), n || this.redraw(), this;
      }
    });
    function ns(t, n) {
      return new is(t, n);
    }
    zi.WMS = is, es.wms = ns;
    var gi = Ge.extend({
      // @section
      // @aka Renderer options
      options: {
        // @option padding: Number = 0.1
        // How much to extend the clip area around the map view (relative to its size)
        // e.g. 0.1 would be 10% of map view in each direction
        padding: 0.1
      },
      initialize: function(t) {
        ut(this, t), k(this), this._layers = this._layers || {};
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
        var s = this._map.getZoomScale(n, this._zoom), c = this._map.getSize().multiplyBy(0.5 + this.options.padding), g = this._map.project(this._center, n), E = c.multiplyBy(-s).add(g).subtract(this._map._getNewPixelOrigin(t, n));
        Ft.any3d ? Zi(this._container, E, s) : we(this._container, E);
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
        this._bounds = new wt(s, s.add(n.multiplyBy(1 + t * 2)).round()), this._center = this._map.getCenter(), this._zoom = this._map.getZoom();
      }
    }), ur = gi.extend({
      // @section
      // @aka Canvas options
      options: {
        // @option tolerance: Number = 0
        // How much to extend the click tolerance around a path/object on the map.
        tolerance: 0
      },
      getEvents: function() {
        var t = gi.prototype.getEvents.call(this);
        return t.viewprereset = this._onViewPreReset, t;
      },
      _onViewPreReset: function() {
        this._postponeUpdatePaths = !0;
      },
      onAdd: function() {
        gi.prototype.onAdd.call(this), this._draw();
      },
      _initContainer: function() {
        var t = this._container = document.createElement("canvas");
        Ht(t, "mousemove", this._onMouseMove, this), Ht(t, "click dblclick mousedown mouseup contextmenu", this._onClick, this), Ht(t, "mouseout", this._handleMouseOut, this), t._leaflet_disable_events = !0, this._ctx = t.getContext("2d");
      },
      _destroyContainer: function() {
        _e(this._redrawRequest), delete this._ctx, ye(this._container), ue(this._container), delete this._container;
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
          gi.prototype._update.call(this);
          var t = this._bounds, n = this._container, s = t.getSize(), c = Ft.retina ? 2 : 1;
          we(n, t.min), n.width = c * s.x, n.height = c * s.y, n.style.width = s.x + "px", n.style.height = s.y + "px", Ft.retina && this._ctx.scale(2, 2), this._ctx.translate(-t.min.x, -t.min.y), this.fire("update");
        }
      },
      _reset: function() {
        gi.prototype._reset.call(this), this._postponeUpdatePaths && (this._postponeUpdatePaths = !1, this._updatePaths());
      },
      _initPath: function(t) {
        this._updateDashArray(t), this._layers[k(t)] = t;
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
        s ? s.prev = c : this._drawLast = c, c ? c.next = s : this._drawFirst = s, delete t._order, delete this._layers[k(t)], this._requestRedraw(t);
      },
      _updatePath: function(t) {
        this._extendRedrawBounds(t), t._project(), t._update(), this._requestRedraw(t);
      },
      _updateStyle: function(t) {
        this._updateDashArray(t), this._requestRedraw(t);
      },
      _updateDashArray: function(t) {
        if (typeof t.options.dashArray == "string") {
          var n = t.options.dashArray.split(/[, ]+/), s = [], c, g;
          for (g = 0; g < n.length; g++) {
            if (c = Number(n[g]), isNaN(c))
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
          this._redrawBounds = this._redrawBounds || new wt(), this._redrawBounds.extend(t._pxBounds.min.subtract([n, n])), this._redrawBounds.extend(t._pxBounds.max.add([n, n]));
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
          var s, c, g, E, N = t._parts, tt = N.length, at = this._ctx;
          if (tt) {
            for (at.beginPath(), s = 0; s < tt; s++) {
              for (c = 0, g = N[s].length; c < g; c++)
                E = N[s][c], at[c ? "lineTo" : "moveTo"](E.x, E.y);
              n && at.closePath();
            }
            this._fillStroke(at, t);
          }
        }
      },
      _updateCircle: function(t) {
        if (!(!this._drawing || t._empty())) {
          var n = t._point, s = this._ctx, c = Math.max(Math.round(t._radius), 1), g = (Math.max(Math.round(t._radiusY), 1) || c) / c;
          g !== 1 && (s.save(), s.scale(1, g)), s.beginPath(), s.arc(n.x, n.y / g, c, 0, Math.PI * 2, !1), g !== 1 && s.restore(), this._fillStroke(s, t);
        }
      },
      _fillStroke: function(t, n) {
        var s = n.options;
        s.fill && (t.globalAlpha = s.fillOpacity, t.fillStyle = s.fillColor || s.color, t.fill(s.fillRule || "evenodd")), s.stroke && s.weight !== 0 && (t.setLineDash && t.setLineDash(n.options && n.options._dashArray || []), t.globalAlpha = s.opacity, t.lineWidth = s.weight, t.strokeStyle = s.color, t.lineCap = s.lineCap, t.lineJoin = s.lineJoin, t.stroke());
      },
      // Canvas obviously doesn't have mouse events for individual drawn objects,
      // so we emulate that by calculating what's under the mouse on mousemove/click manually
      _onClick: function(t) {
        for (var n = this._map.mouseEventToLayerPoint(t), s, c, g = this._drawFirst; g; g = g.next)
          s = g.layer, s.options.interactive && s._containsPoint(n) && (!(t.type === "click" || t.type === "preclick") || !this._map._draggableMoved(s)) && (c = s);
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
        n && (be(this._container, "leaflet-interactive"), this._fireEvent([n], t, "mouseout"), this._hoveredLayer = null, this._mouseHoverThrottled = !1);
      },
      _handleMouseHover: function(t, n) {
        if (!this._mouseHoverThrottled) {
          for (var s, c, g = this._drawFirst; g; g = g.next)
            s = g.layer, s.options.interactive && s._containsPoint(n) && (c = s);
          c !== this._hoveredLayer && (this._handleMouseOut(t), c && (Wt(this._container, "leaflet-interactive"), this._fireEvent([c], t, "mouseover"), this._hoveredLayer = c)), this._fireEvent(this._hoveredLayer ? [this._hoveredLayer] : !1, t), this._mouseHoverThrottled = !0, setTimeout(x(function() {
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
    function Wr(t) {
      return Ft.canvas ? new ur(t) : null;
    }
    var Ji = function() {
      try {
        return document.namespaces.add("lvml", "urn:schemas-microsoft-com:vml"), function(t) {
          return document.createElement("<lvml:" + t + ' class="lvml">');
        };
      } catch {
      }
      return function(t) {
        return document.createElement("<" + t + ' xmlns="urn:schemas-microsoft.com:vml" class="lvml">');
      };
    }(), go = {
      _initContainer: function() {
        this._container = oe("div", "leaflet-vml-container");
      },
      _update: function() {
        this._map._animatingZoom || (gi.prototype._update.call(this), this.fire("update"));
      },
      _initPath: function(t) {
        var n = t._container = Ji("shape");
        Wt(n, "leaflet-vml-shape " + (this.options.className || "")), n.coordsize = "1 1", t._path = Ji("path"), n.appendChild(t._path), this._updateStyle(t), this._layers[k(t)] = t;
      },
      _addPath: function(t) {
        var n = t._container;
        this._container.appendChild(n), t.options.interactive && t.addInteractiveTarget(n);
      },
      _removePath: function(t) {
        var n = t._container;
        ye(n), t.removeInteractiveTarget(n), delete this._layers[k(t)];
      },
      _updateStyle: function(t) {
        var n = t._stroke, s = t._fill, c = t.options, g = t._container;
        g.stroked = !!c.stroke, g.filled = !!c.fill, c.stroke ? (n || (n = t._stroke = Ji("stroke")), g.appendChild(n), n.weight = c.weight + "px", n.color = c.color, n.opacity = c.opacity, c.dashArray ? n.dashStyle = Tt(c.dashArray) ? c.dashArray.join(" ") : c.dashArray.replace(/( *, *)/g, " ") : n.dashStyle = "", n.endcap = c.lineCap.replace("butt", "flat"), n.joinstyle = c.lineJoin) : n && (g.removeChild(n), t._stroke = null), c.fill ? (s || (s = t._fill = Ji("fill")), g.appendChild(s), s.color = c.fillColor || c.color, s.opacity = c.fillOpacity) : s && (g.removeChild(s), t._fill = null);
      },
      _updateCircle: function(t) {
        var n = t._point.round(), s = Math.round(t._radius), c = Math.round(t._radiusY || s);
        this._setPath(t, t._empty() ? "M0 0" : "AL " + n.x + "," + n.y + " " + s + "," + c + " 0," + 65535 * 360);
      },
      _setPath: function(t, n) {
        t._path.v = n;
      },
      _bringToFront: function(t) {
        on(t._container);
      },
      _bringToBack: function(t) {
        ln(t._container);
      }
    }, ni = Ft.vml ? Ji : Gn, Ce = gi.extend({
      _initContainer: function() {
        this._container = ni("svg"), this._container.setAttribute("pointer-events", "none"), this._rootGroup = ni("g"), this._container.appendChild(this._rootGroup);
      },
      _destroyContainer: function() {
        ye(this._container), ue(this._container), delete this._container, delete this._rootGroup, delete this._svgSize;
      },
      _update: function() {
        if (!(this._map._animatingZoom && this._bounds)) {
          gi.prototype._update.call(this);
          var t = this._bounds, n = t.getSize(), s = this._container;
          (!this._svgSize || !this._svgSize.equals(n)) && (this._svgSize = n, s.setAttribute("width", n.x), s.setAttribute("height", n.y)), we(s, t.min), s.setAttribute("viewBox", [t.min.x, t.min.y, n.x, n.y].join(" ")), this.fire("update");
        }
      },
      // methods below are called by vector layers implementations
      _initPath: function(t) {
        var n = t._path = ni("path");
        t.options.className && Wt(n, t.options.className), t.options.interactive && Wt(n, "leaflet-interactive"), this._updateStyle(t), this._layers[k(t)] = t;
      },
      _addPath: function(t) {
        this._rootGroup || this._initContainer(), this._rootGroup.appendChild(t._path), t.addInteractiveTarget(t._path);
      },
      _removePath: function(t) {
        ye(t._path), t.removeInteractiveTarget(t._path), delete this._layers[k(t)];
      },
      _updatePath: function(t) {
        t._project(), t._update();
      },
      _updateStyle: function(t) {
        var n = t._path, s = t.options;
        n && (s.stroke ? (n.setAttribute("stroke", s.color), n.setAttribute("stroke-opacity", s.opacity), n.setAttribute("stroke-width", s.weight), n.setAttribute("stroke-linecap", s.lineCap), n.setAttribute("stroke-linejoin", s.lineJoin), s.dashArray ? n.setAttribute("stroke-dasharray", s.dashArray) : n.removeAttribute("stroke-dasharray"), s.dashOffset ? n.setAttribute("stroke-dashoffset", s.dashOffset) : n.removeAttribute("stroke-dashoffset")) : n.setAttribute("stroke", "none"), s.fill ? (n.setAttribute("fill", s.fillColor || s.color), n.setAttribute("fill-opacity", s.fillOpacity), n.setAttribute("fill-rule", s.fillRule || "evenodd")) : n.setAttribute("fill", "none"));
      },
      _updatePoly: function(t, n) {
        this._setPath(t, Zn(t._parts, n));
      },
      _updateCircle: function(t) {
        var n = t._point, s = Math.max(Math.round(t._radius), 1), c = Math.max(Math.round(t._radiusY), 1) || s, g = "a" + s + "," + c + " 0 1,0 ", E = t._empty() ? "M0 0" : "M" + (n.x - s) + "," + n.y + g + s * 2 + ",0 " + g + -s * 2 + ",0 ";
        this._setPath(t, E);
      },
      _setPath: function(t, n) {
        t._path.setAttribute("d", n);
      },
      // SVG does not have the concept of zIndex so we resort to changing the DOM order of elements
      _bringToFront: function(t) {
        on(t._path);
      },
      _bringToBack: function(t) {
        ln(t._path);
      }
    });
    Ft.vml && Ce.include(go);
    function rs(t) {
      return Ft.svg || Ft.vml ? new Ce(t) : null;
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
        return this.options.preferCanvas && Wr(t) || rs(t);
      }
    });
    var hr = ze.extend({
      initialize: function(t, n) {
        ze.prototype.initialize.call(this, this._boundsToLatLngs(t), n);
      },
      // @method setBounds(latLngBounds: LatLngBounds): this
      // Redraws the rectangle with the passed bounds.
      setBounds: function(t) {
        return this.setLatLngs(this._boundsToLatLngs(t));
      },
      _boundsToLatLngs: function(t) {
        return t = Vt(t), [
          t.getSouthWest(),
          t.getNorthWest(),
          t.getNorthEast(),
          t.getSouthEast()
        ];
      }
    });
    function mo(t, n) {
      return new hr(t, n);
    }
    Ce.create = ni, Ce.pointsToPath = Zn, ki.geometryToLayer = In, ki.coordsToLatLng = Hr, ki.coordsToLatLngs = Xe, ki.latLngToCoords = Ei, ki.latLngsToCoords = Ki, ki.getFeature = Wi, ki.asFeature = or, ie.mergeOptions({
      // @option boxZoom: Boolean = true
      // Whether the map can be zoomed to a rectangular area specified by
      // dragging the mouse while pressing the shift key.
      boxZoom: !0
    });
    var yn = di.extend({
      initialize: function(t) {
        this._map = t, this._container = t._container, this._pane = t._panes.overlayPane, this._resetStateTimeout = 0, t.on("unload", this._destroy, this);
      },
      addHooks: function() {
        Ht(this._container, "mousedown", this._onMouseDown, this);
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
        this._clearDeferredResetState(), this._resetState(), Mn(), Pr(), this._startPoint = this._map.mouseEventToContainerPoint(t), Ht(document, {
          contextmenu: qi,
          mousemove: this._onMouseMove,
          mouseup: this._onMouseUp,
          keydown: this._onKeyDown
        }, this);
      },
      _onMouseMove: function(t) {
        this._moved || (this._moved = !0, this._box = oe("div", "leaflet-zoom-box", this._container), Wt(this._container, "leaflet-crosshair"), this._map.fire("boxzoomstart")), this._point = this._map.mouseEventToContainerPoint(t);
        var n = new wt(this._point, this._startPoint), s = n.getSize();
        we(this._box, n.min), this._box.style.width = s.x + "px", this._box.style.height = s.y + "px";
      },
      _finish: function() {
        this._moved && (ye(this._box), be(this._container, "leaflet-crosshair")), Bn(), Sr(), ue(document, {
          contextmenu: qi,
          mousemove: this._onMouseMove,
          mouseup: this._onMouseUp,
          keydown: this._onKeyDown
        }, this);
      },
      _onMouseUp: function(t) {
        if (!(t.which !== 1 && t.button !== 1) && (this._finish(), !!this._moved)) {
          this._clearDeferredResetState(), this._resetStateTimeout = setTimeout(x(this._resetState, this), 0);
          var n = new se(
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
    ie.addInitHook("addHandler", "boxZoom", yn), ie.mergeOptions({
      // @option doubleClickZoom: Boolean|String = true
      // Whether the map can be zoomed in by double clicking on it and
      // zoomed out by double clicking while holding shift. If passed
      // `'center'`, double-click zoom will zoom to the center of the
      //  view regardless of where the mouse was.
      doubleClickZoom: !0
    });
    var as = di.extend({
      addHooks: function() {
        this._map.on("dblclick", this._onDoubleClick, this);
      },
      removeHooks: function() {
        this._map.off("dblclick", this._onDoubleClick, this);
      },
      _onDoubleClick: function(t) {
        var n = this._map, s = n.getZoom(), c = n.options.zoomDelta, g = t.originalEvent.shiftKey ? s - c : s + c;
        n.options.doubleClickZoom === "center" ? n.setZoom(g) : n.setZoomAround(t.containerPoint, g);
      }
    });
    ie.addInitHook("addHandler", "doubleClickZoom", as), ie.mergeOptions({
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
    var ss = di.extend({
      addHooks: function() {
        if (!this._draggable) {
          var t = this._map;
          this._draggable = new Fi(t._mapPane, t._container), this._draggable.on({
            dragstart: this._onDragStart,
            drag: this._onDrag,
            dragend: this._onDragEnd
          }, this), this._draggable.on("predrag", this._onPreDragLimit, this), t.options.worldCopyJump && (this._draggable.on("predrag", this._onPreDragWrap, this), t.on("zoomend", this._onZoomEnd, this), t.whenReady(this._onZoomEnd, this));
        }
        Wt(this._map._container, "leaflet-grab leaflet-touch-drag"), this._draggable.enable(), this._positions = [], this._times = [];
      },
      removeHooks: function() {
        be(this._map._container, "leaflet-grab"), be(this._map._container, "leaflet-touch-drag"), this._draggable.disable();
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
          var n = Vt(this._map.options.maxBounds);
          this._offsetLimit = Mt(
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
        var t = this._worldWidth, n = Math.round(t / 2), s = this._initialWorldOffset, c = this._draggable._newPos.x, g = (c - n + s) % t + n - s, E = (c + n + s) % t - n - s, N = Math.abs(g + s) < Math.abs(E + s) ? g : E;
        this._draggable._absPos = this._draggable._newPos.clone(), this._draggable._newPos.x = N;
      },
      _onDragEnd: function(t) {
        var n = this._map, s = n.options, c = !s.inertia || t.noInertia || this._times.length < 2;
        if (n.fire("dragend", t), c)
          n.fire("moveend");
        else {
          this._prunePositions(+/* @__PURE__ */ new Date());
          var g = this._lastPos.subtract(this._positions[0]), E = (this._lastTime - this._times[0]) / 1e3, N = s.easeLinearity, tt = g.multiplyBy(N / E), at = tt.distanceTo([0, 0]), mt = Math.min(s.inertiaMaxSpeed, at), Pt = tt.multiplyBy(mt / at), zt = mt / (s.inertiaDeceleration * N), Qt = Pt.multiplyBy(-zt / 2).round();
          !Qt.x && !Qt.y ? n.fire("moveend") : (Qt = n._limitOffset(Qt, n.options.maxBounds), Kt(function() {
            n.panBy(Qt, {
              duration: zt,
              easeLinearity: N,
              noMoveStart: !0,
              animate: !0
            });
          }));
        }
      }
    });
    ie.addInitHook("addHandler", "dragging", ss), ie.mergeOptions({
      // @option keyboard: Boolean = true
      // Makes the map focusable and allows users to navigate the map with keyboard
      // arrows and `+`/`-` keys.
      keyboard: !0,
      // @option keyboardPanDelta: Number = 80
      // Amount of pixels to pan when pressing an arrow key.
      keyboardPanDelta: 80
    });
    var os = di.extend({
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
        t.tabIndex <= 0 && (t.tabIndex = "0"), Ht(t, {
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
        var n = this._panKeys = {}, s = this.keyCodes, c, g;
        for (c = 0, g = s.left.length; c < g; c++)
          n[s.left[c]] = [-1 * t, 0];
        for (c = 0, g = s.right.length; c < g; c++)
          n[s.right[c]] = [t, 0];
        for (c = 0, g = s.down.length; c < g; c++)
          n[s.down[c]] = [0, t];
        for (c = 0, g = s.up.length; c < g; c++)
          n[s.up[c]] = [0, -1 * t];
      },
      _setZoomDelta: function(t) {
        var n = this._zoomKeys = {}, s = this.keyCodes, c, g;
        for (c = 0, g = s.zoomIn.length; c < g; c++)
          n[s.zoomIn[c]] = t;
        for (c = 0, g = s.zoomOut.length; c < g; c++)
          n[s.zoomOut[c]] = -t;
      },
      _addHooks: function() {
        Ht(document, "keydown", this._onKeyDown, this);
      },
      _removeHooks: function() {
        ue(document, "keydown", this._onKeyDown, this);
      },
      _onKeyDown: function(t) {
        if (!(t.altKey || t.ctrlKey || t.metaKey)) {
          var n = t.keyCode, s = this._map, c;
          if (n in this._panKeys) {
            if (!s._panAnim || !s._panAnim._inProgress)
              if (c = this._panKeys[n], t.shiftKey && (c = ct(c).multiplyBy(3)), s.options.maxBounds && (c = s._limitOffset(ct(c), s.options.maxBounds)), s.options.worldCopyJump) {
                var g = s.wrapLatLng(s.unproject(s.project(s.getCenter()).add(c)));
                s.panTo(g);
              } else
                s.panBy(c);
          } else if (n in this._zoomKeys)
            s.setZoom(s.getZoom() + (t.shiftKey ? 3 : 1) * this._zoomKeys[n]);
          else if (n === 27 && s._popup && s._popup.options.closeOnEscapeKey)
            s.closePopup();
          else
            return;
          qi(t);
        }
      }
    });
    ie.addInitHook("addHandler", "keyboard", os), ie.mergeOptions({
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
    var Xi = di.extend({
      addHooks: function() {
        Ht(this._map._container, "wheel", this._onWheelScroll, this), this._delta = 0;
      },
      removeHooks: function() {
        ue(this._map._container, "wheel", this._onWheelScroll, this);
      },
      _onWheelScroll: function(t) {
        var n = Ra(t), s = this._map.options.wheelDebounceTime;
        this._delta += n, this._lastMousePos = this._map.mouseEventToContainerPoint(t), this._startTime || (this._startTime = +/* @__PURE__ */ new Date());
        var c = Math.max(s - (+/* @__PURE__ */ new Date() - this._startTime), 0);
        clearTimeout(this._timer), this._timer = setTimeout(x(this._performZoom, this), c), qi(t);
      },
      _performZoom: function() {
        var t = this._map, n = t.getZoom(), s = this._map.options.zoomSnap || 0;
        t._stop();
        var c = this._delta / (this._map.options.wheelPxPerZoomLevel * 4), g = 4 * Math.log(2 / (1 + Math.exp(-Math.abs(c)))) / Math.LN2, E = s ? Math.ceil(g / s) * s : g, N = t._limitZoom(n + (this._delta > 0 ? E : -E)) - n;
        this._delta = 0, this._startTime = null, N && (t.options.scrollWheelZoom === "center" ? t.setZoom(n + N) : t.setZoomAround(this._lastMousePos, n + N));
      }
    });
    ie.addInitHook("addHandler", "scrollWheelZoom", Xi);
    var ls = 600;
    ie.mergeOptions({
      // @section Touch interaction options
      // @option tapHold: Boolean
      // Enables simulation of `contextmenu` event, default is `true` for mobile Safari.
      tapHold: Ft.touchNative && Ft.safari && Ft.mobile,
      // @option tapTolerance: Number = 15
      // The max number of pixels a user can shift his finger during touch
      // for it to be considered a valid tap.
      tapTolerance: 15
    });
    var Jr = di.extend({
      addHooks: function() {
        Ht(this._map._container, "touchstart", this._onDown, this);
      },
      removeHooks: function() {
        ue(this._map._container, "touchstart", this._onDown, this);
      },
      _onDown: function(t) {
        if (clearTimeout(this._holdTimeout), t.touches.length === 1) {
          var n = t.touches[0];
          this._startPos = this._newPos = new ot(n.clientX, n.clientY), this._holdTimeout = setTimeout(x(function() {
            this._cancel(), this._isTapValid() && (Ht(document, "touchend", De), Ht(document, "touchend touchcancel", this._cancelClickPrevent), this._simulateEvent("contextmenu", n));
          }, this), ls), Ht(document, "touchend touchcancel contextmenu", this._cancel, this), Ht(document, "touchmove", this._onMove, this);
        }
      },
      _cancelClickPrevent: function t() {
        ue(document, "touchend", De), ue(document, "touchend touchcancel", t);
      },
      _cancel: function() {
        clearTimeout(this._holdTimeout), ue(document, "touchend touchcancel contextmenu", this._cancel, this), ue(document, "touchmove", this._onMove, this);
      },
      _onMove: function(t) {
        var n = t.touches[0];
        this._newPos = new ot(n.clientX, n.clientY);
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
    ie.addInitHook("addHandler", "tapHold", Jr), ie.mergeOptions({
      // @section Touch interaction options
      // @option touchZoom: Boolean|String = *
      // Whether the map can be zoomed by touch-dragging with two fingers. If
      // passed `'center'`, it will zoom to the center of the view regardless of
      // where the touch events (fingers) were. Enabled for touch-capable web
      // browsers.
      touchZoom: Ft.touch,
      // @option bounceAtZoomLimits: Boolean = true
      // Set it to false if you don't want the map to zoom beyond min/max zoom
      // and then bounce back when pinch-zooming.
      bounceAtZoomLimits: !0
    });
    var Xr = di.extend({
      addHooks: function() {
        Wt(this._map._container, "leaflet-touch-zoom"), Ht(this._map._container, "touchstart", this._onTouchStart, this);
      },
      removeHooks: function() {
        be(this._map._container, "leaflet-touch-zoom"), ue(this._map._container, "touchstart", this._onTouchStart, this);
      },
      _onTouchStart: function(t) {
        var n = this._map;
        if (!(!t.touches || t.touches.length !== 2 || n._animatingZoom || this._zooming)) {
          var s = n.mouseEventToContainerPoint(t.touches[0]), c = n.mouseEventToContainerPoint(t.touches[1]);
          this._centerPoint = n.getSize()._divideBy(2), this._startLatLng = n.containerPointToLatLng(this._centerPoint), n.options.touchZoom !== "center" && (this._pinchStartLatLng = n.containerPointToLatLng(s.add(c)._divideBy(2))), this._startDist = s.distanceTo(c), this._startZoom = n.getZoom(), this._moved = !1, this._zooming = !0, n._stop(), Ht(document, "touchmove", this._onTouchMove, this), Ht(document, "touchend touchcancel", this._onTouchEnd, this), De(t);
        }
      },
      _onTouchMove: function(t) {
        if (!(!t.touches || t.touches.length !== 2 || !this._zooming)) {
          var n = this._map, s = n.mouseEventToContainerPoint(t.touches[0]), c = n.mouseEventToContainerPoint(t.touches[1]), g = s.distanceTo(c) / this._startDist;
          if (this._zoom = n.getScaleZoom(g, this._startZoom), !n.options.bounceAtZoomLimits && (this._zoom < n.getMinZoom() && g < 1 || this._zoom > n.getMaxZoom() && g > 1) && (this._zoom = n._limitZoom(this._zoom)), n.options.touchZoom === "center") {
            if (this._center = this._startLatLng, g === 1)
              return;
          } else {
            var E = s._add(c)._divideBy(2)._subtract(this._centerPoint);
            if (g === 1 && E.x === 0 && E.y === 0)
              return;
            this._center = n.unproject(n.project(this._pinchStartLatLng, this._zoom).subtract(E), this._zoom);
          }
          this._moved || (n._moveStart(!0, !1), this._moved = !0), _e(this._animRequest);
          var N = x(n._move, n, this._center, this._zoom, { pinch: !0, round: !1 }, void 0);
          this._animRequest = Kt(N, this, !0), De(t);
        }
      },
      _onTouchEnd: function() {
        if (!this._moved || !this._zooming) {
          this._zooming = !1;
          return;
        }
        this._zooming = !1, _e(this._animRequest), ue(document, "touchmove", this._onTouchMove, this), ue(document, "touchend touchcancel", this._onTouchEnd, this), this._map.options.zoomAnimation ? this._map._animateZoom(this._center, this._map._limitZoom(this._zoom), !0, this._map.options.zoomSnap) : this._map._resetView(this._center, this._map._limitZoom(this._zoom));
      }
    });
    ie.addInitHook("addHandler", "touchZoom", Xr), ie.BoxZoom = yn, ie.DoubleClickZoom = as, ie.Drag = ss, ie.Keyboard = os, ie.ScrollWheelZoom = Xi, ie.TapHold = Jr, ie.TouchZoom = Xr, d.Bounds = wt, d.Browser = Ft, d.CRS = Pe, d.Canvas = ur, d.Circle = gn, d.CircleMarker = sr, d.Class = Le, d.Control = si, d.DivIcon = Ni, d.DivOverlay = _i, d.DomEvent = ne, d.DomUtil = Ys, d.Draggable = Fi, d.Evented = kt, d.FeatureGroup = pi, d.GeoJSON = ki, d.GridLayer = Rn, d.Handler = di, d.Icon = _n, d.ImageOverlay = mn, d.LatLng = Yt, d.LatLngBounds = se, d.Layer = Ge, d.LayerGroup = wi, d.LineUtil = ir, d.Map = ie, d.Marker = ar, d.Mixin = io, d.Path = ii, d.Point = ot, d.PolyUtil = Ga, d.Polygon = ze, d.Polyline = Ci, d.Popup = On, d.PosAnimation = Na, d.Projection = Ka, d.Rectangle = hr, d.Renderer = gi, d.SVG = Ce, d.SVGOverlay = Kr, d.TileLayer = zi, d.Tooltip = lr, d.Transformation = Ln, d.Util = Re, d.VideoOverlay = Qa, d.bind = x, d.bounds = Mt, d.canvas = Wr, d.circle = lo, d.circleMarker = Vr, d.control = un, d.divIcon = Fn, d.extend = C, d.featureGroup = so, d.geoJSON = Ya, d.geoJson = uo, d.gridLayer = ts, d.icon = oo, d.imageOverlay = ho, d.latLng = $t, d.latLngBounds = Vt, d.layerGroup = rr, d.map = tr, d.marker = Ja, d.point = ct, d.polygon = Zr, d.polyline = Gr, d.popup = po, d.rectangle = mo, d.setOptions = ut, d.stamp = k, d.svg = rs, d.svgOverlay = fo, d.tileLayer = es, d.tooltip = _o, d.transformation = Pi, d.version = y, d.videoOverlay = co;
    var je = window.L;
    d.noConflict = function() {
      return window.L = je, this;
    }, window.L = d;
  });
})(To, To.exports);
var Sh = To.exports;
const aa = /* @__PURE__ */ Ph(Sh);
(() => {
  var al, sl;
  var h = Object.create, l = Object.defineProperty, d = Object.getOwnPropertyDescriptor, y = Object.getOwnPropertyNames, C = Object.getPrototypeOf, D = Object.prototype.hasOwnProperty, x = (e, i) => () => (i || e((i = { exports: {} }).exports, i), i.exports), v = (e, i, r, a) => {
    if (i && typeof i == "object" || typeof i == "function") for (let o of y(i)) !D.call(e, o) && o !== r && l(e, o, { get: () => i[o], enumerable: !(a = d(i, o)) || a.enumerable });
    return e;
  }, k = (e, i, r) => (r = e != null ? h(C(e)) : {}, v(i || !e || !e.__esModule ? l(r, "default", { value: e, enumerable: !0 }) : r, e)), F = x((e, i) => {
    function r() {
      this.__data__ = [], this.size = 0;
    }
    i.exports = r;
  }), Z = x((e, i) => {
    function r(a, o) {
      return a === o || a !== a && o !== o;
    }
    i.exports = r;
  }), j = x((e, i) => {
    var r = Z();
    function a(o, u) {
      for (var f = o.length; f--; ) if (r(o[f][0], u)) return f;
      return -1;
    }
    i.exports = a;
  }), q = x((e, i) => {
    var r = j(), a = Array.prototype, o = a.splice;
    function u(f) {
      var _ = this.__data__, b = r(_, f);
      if (b < 0) return !1;
      var w = _.length - 1;
      return b == w ? _.pop() : o.call(_, b, 1), --this.size, !0;
    }
    i.exports = u;
  }), H = x((e, i) => {
    var r = j();
    function a(o) {
      var u = this.__data__, f = r(u, o);
      return f < 0 ? void 0 : u[f][1];
    }
    i.exports = a;
  }), nt = x((e, i) => {
    var r = j();
    function a(o) {
      return r(this.__data__, o) > -1;
    }
    i.exports = a;
  }), ut = x((e, i) => {
    var r = j();
    function a(o, u) {
      var f = this.__data__, _ = r(f, o);
      return _ < 0 ? (++this.size, f.push([o, u])) : f[_][1] = u, this;
    }
    i.exports = a;
  }), _t = x((e, i) => {
    var r = F(), a = q(), o = H(), u = nt(), f = ut();
    function _(b) {
      var w = -1, O = b == null ? 0 : b.length;
      for (this.clear(); ++w < O; ) {
        var S = b[w];
        this.set(S[0], S[1]);
      }
    }
    _.prototype.clear = r, _.prototype.delete = a, _.prototype.get = o, _.prototype.has = u, _.prototype.set = f, i.exports = _;
  }), Y = x((e, i) => {
    var r = _t();
    function a() {
      this.__data__ = new r(), this.size = 0;
    }
    i.exports = a;
  }), Et = x((e, i) => {
    function r(a) {
      var o = this.__data__, u = o.delete(a);
      return this.size = o.size, u;
    }
    i.exports = r;
  }), Tt = x((e, i) => {
    function r(a) {
      return this.__data__.get(a);
    }
    i.exports = r;
  }), pe = x((e, i) => {
    function r(a) {
      return this.__data__.has(a);
    }
    i.exports = r;
  }), vt = x((e, i) => {
    var r = typeof da == "object" && da && da.Object === Object && da;
    i.exports = r;
  }), St = x((e, i) => {
    var r = vt(), a = typeof self == "object" && self && self.Object === Object && self, o = r || a || Function("return this")();
    i.exports = o;
  }), Dt = x((e, i) => {
    var r = St(), a = r.Symbol;
    i.exports = a;
  }), le = x((e, i) => {
    var r = Dt(), a = Object.prototype, o = a.hasOwnProperty, u = a.toString, f = r ? r.toStringTag : void 0;
    function _(b) {
      var w = o.call(b, f), O = b[f];
      try {
        b[f] = void 0;
        var S = !0;
      } catch {
      }
      var U = u.call(b);
      return S && (w ? b[f] = O : delete b[f]), U;
    }
    i.exports = _;
  }), te = x((e, i) => {
    var r = Object.prototype, a = r.toString;
    function o(u) {
      return a.call(u);
    }
    i.exports = o;
  }), ee = x((e, i) => {
    var r = Dt(), a = le(), o = te(), u = "[object Null]", f = "[object Undefined]", _ = r ? r.toStringTag : void 0;
    function b(w) {
      return w == null ? w === void 0 ? f : u : _ && _ in Object(w) ? a(w) : o(w);
    }
    i.exports = b;
  }), Kt = x((e, i) => {
    function r(a) {
      var o = typeof a;
      return a != null && (o == "object" || o == "function");
    }
    i.exports = r;
  }), _e = x((e, i) => {
    var r = ee(), a = Kt(), o = "[object AsyncFunction]", u = "[object Function]", f = "[object GeneratorFunction]", _ = "[object Proxy]";
    function b(w) {
      if (!a(w)) return !1;
      var O = r(w);
      return O == u || O == f || O == o || O == _;
    }
    i.exports = b;
  }), Re = x((e, i) => {
    var r = St(), a = r["__core-js_shared__"];
    i.exports = a;
  }), Le = x((e, i) => {
    var r = Re(), a = function() {
      var u = /[^.]+$/.exec(r && r.keys && r.keys.IE_PROTO || "");
      return u ? "Symbol(src)_1." + u : "";
    }();
    function o(u) {
      return !!a && a in u;
    }
    i.exports = o;
  }), At = x((e, i) => {
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
  }), Nt = x((e, i) => {
    var r = _e(), a = Le(), o = Kt(), u = At(), f = /[\\^$.*+?()[\]{}|]/g, _ = /^\[object .+?Constructor\]$/, b = Function.prototype, w = Object.prototype, O = b.toString, S = w.hasOwnProperty, U = RegExp("^" + O.call(S).replace(f, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$");
    function W(lt) {
      if (!o(lt) || a(lt)) return !1;
      var yt = r(lt) ? U : _;
      return yt.test(u(lt));
    }
    i.exports = W;
  }), kt = x((e, i) => {
    function r(a, o) {
      return a == null ? void 0 : a[o];
    }
    i.exports = r;
  }), ot = x((e, i) => {
    var r = Nt(), a = kt();
    function o(u, f) {
      var _ = a(u, f);
      return r(_) ? _ : void 0;
    }
    i.exports = o;
  }), jt = x((e, i) => {
    var r = ot(), a = St(), o = r(a, "Map");
    i.exports = o;
  }), ct = x((e, i) => {
    var r = ot(), a = r(Object, "create");
    i.exports = a;
  }), wt = x((e, i) => {
    var r = ct();
    function a() {
      this.__data__ = r ? r(null) : {}, this.size = 0;
    }
    i.exports = a;
  }), Mt = x((e, i) => {
    function r(a) {
      var o = this.has(a) && delete this.__data__[a];
      return this.size -= o ? 1 : 0, o;
    }
    i.exports = r;
  }), se = x((e, i) => {
    var r = ct(), a = "__lodash_hash_undefined__", o = Object.prototype, u = o.hasOwnProperty;
    function f(_) {
      var b = this.__data__;
      if (r) {
        var w = b[_];
        return w === a ? void 0 : w;
      }
      return u.call(b, _) ? b[_] : void 0;
    }
    i.exports = f;
  }), Vt = x((e, i) => {
    var r = ct(), a = Object.prototype, o = a.hasOwnProperty;
    function u(f) {
      var _ = this.__data__;
      return r ? _[f] !== void 0 : o.call(_, f);
    }
    i.exports = u;
  }), Yt = x((e, i) => {
    var r = ct(), a = "__lodash_hash_undefined__";
    function o(u, f) {
      var _ = this.__data__;
      return this.size += this.has(u) ? 0 : 1, _[u] = r && f === void 0 ? a : f, this;
    }
    i.exports = o;
  }), $t = x((e, i) => {
    var r = wt(), a = Mt(), o = se(), u = Vt(), f = Yt();
    function _(b) {
      var w = -1, O = b == null ? 0 : b.length;
      for (this.clear(); ++w < O; ) {
        var S = b[w];
        this.set(S[0], S[1]);
      }
    }
    _.prototype.clear = r, _.prototype.delete = a, _.prototype.get = o, _.prototype.has = u, _.prototype.set = f, i.exports = _;
  }), Pe = x((e, i) => {
    var r = $t(), a = _t(), o = jt();
    function u() {
      this.size = 0, this.__data__ = { hash: new r(), map: new (o || a)(), string: new r() };
    }
    i.exports = u;
  }), Ne = x((e, i) => {
    function r(a) {
      var o = typeof a;
      return o == "string" || o == "number" || o == "symbol" || o == "boolean" ? a !== "__proto__" : a === null;
    }
    i.exports = r;
  }), xi = x((e, i) => {
    var r = Ne();
    function a(o, u) {
      var f = o.__data__;
      return r(u) ? f[typeof u == "string" ? "string" : "hash"] : f.map;
    }
    i.exports = a;
  }), rn = x((e, i) => {
    var r = xi();
    function a(o) {
      var u = r(this, o).delete(o);
      return this.size -= u ? 1 : 0, u;
    }
    i.exports = a;
  }), Ln = x((e, i) => {
    var r = xi();
    function a(o) {
      return r(this, o).get(o);
    }
    i.exports = a;
  }), Pi = x((e, i) => {
    var r = xi();
    function a(o) {
      return r(this, o).has(o);
    }
    i.exports = a;
  }), ui = x((e, i) => {
    var r = xi();
    function a(o, u) {
      var f = r(this, o), _ = f.size;
      return f.set(o, u), this.size += f.size == _ ? 0 : 1, this;
    }
    i.exports = a;
  }), Si = x((e, i) => {
    var r = Pe(), a = rn(), o = Ln(), u = Pi(), f = ui();
    function _(b) {
      var w = -1, O = b == null ? 0 : b.length;
      for (this.clear(); ++w < O; ) {
        var S = b[w];
        this.set(S[0], S[1]);
      }
    }
    _.prototype.clear = r, _.prototype.delete = a, _.prototype.get = o, _.prototype.has = u, _.prototype.set = f, i.exports = _;
  }), Gn = x((e, i) => {
    var r = _t(), a = jt(), o = Si(), u = 200;
    function f(_, b) {
      var w = this.__data__;
      if (w instanceof r) {
        var O = w.__data__;
        if (!a || O.length < u - 1) return O.push([_, b]), this.size = ++w.size, this;
        w = this.__data__ = new o(O);
      }
      return w.set(_, b), this.size = w.size, this;
    }
    i.exports = f;
  }), Zn = x((e, i) => {
    var r = _t(), a = Y(), o = Et(), u = Tt(), f = pe(), _ = Gn();
    function b(w) {
      var O = this.__data__ = new r(w);
      this.size = O.size;
    }
    b.prototype.clear = a, b.prototype.delete = o, b.prototype.get = u, b.prototype.has = f, b.prototype.set = _, i.exports = b;
  }), Ai = x((e, i) => {
    var r = ot(), a = function() {
      try {
        var o = r(Object, "defineProperty");
        return o({}, "", {}), o;
      } catch {
      }
    }();
    i.exports = a;
  }), Ti = x((e, i) => {
    var r = Ai();
    function a(o, u, f) {
      u == "__proto__" && r ? r(o, u, { configurable: !0, enumerable: !0, value: f, writable: !0 }) : o[u] = f;
    }
    i.exports = a;
  }), Hn = x((e, i) => {
    var r = Ti(), a = Z();
    function o(u, f, _) {
      (_ !== void 0 && !a(u[f], _) || _ === void 0 && !(f in u)) && r(u, f, _);
    }
    i.exports = o;
  }), wn = x((e, i) => {
    function r(a) {
      return function(o, u, f) {
        for (var _ = -1, b = Object(o), w = f(o), O = w.length; O--; ) {
          var S = w[a ? O : ++_];
          if (u(b[S], S, b) === !1) break;
        }
        return o;
      };
    }
    i.exports = r;
  }), Di = x((e, i) => {
    var r = wn(), a = r();
    i.exports = a;
  }), We = x((e, i) => {
    var r = St(), a = typeof e == "object" && e && !e.nodeType && e, o = a && typeof i == "object" && i && !i.nodeType && i, u = o && o.exports === a, f = u ? r.Buffer : void 0, _ = f ? f.allocUnsafe : void 0;
    function b(w, O) {
      if (O) return w.slice();
      var S = w.length, U = _ ? _(S) : new w.constructor(S);
      return w.copy(U), U;
    }
    i.exports = b;
  }), an = x((e, i) => {
    var r = St(), a = r.Uint8Array;
    i.exports = a;
  }), vr = x((e, i) => {
    var r = an();
    function a(o) {
      var u = new o.constructor(o.byteLength);
      return new r(u).set(new r(o)), u;
    }
    i.exports = a;
  }), hi = x((e, i) => {
    var r = vr();
    function a(o, u) {
      var f = u ? r(o.buffer) : o.buffer;
      return new o.constructor(f, o.byteOffset, o.length);
    }
    i.exports = a;
  }), Cn = x((e, i) => {
    function r(a, o) {
      var u = -1, f = a.length;
      for (o || (o = Array(f)); ++u < f; ) o[u] = a[u];
      return o;
    }
    i.exports = r;
  }), B = x((e, i) => {
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
  }), p = x((e, i) => {
    function r(a, o) {
      return function(u) {
        return a(o(u));
      };
    }
    i.exports = r;
  }), m = x((e, i) => {
    var r = p(), a = r(Object.getPrototypeOf, Object);
    i.exports = a;
  }), I = x((e, i) => {
    var r = Object.prototype;
    function a(o) {
      var u = o && o.constructor, f = typeof u == "function" && u.prototype || r;
      return o === f;
    }
    i.exports = a;
  }), K = x((e, i) => {
    var r = B(), a = m(), o = I();
    function u(f) {
      return typeof f.constructor == "function" && !o(f) ? r(a(f)) : {};
    }
    i.exports = u;
  }), rt = x((e, i) => {
    function r(a) {
      return a != null && typeof a == "object";
    }
    i.exports = r;
  }), pt = x((e, i) => {
    var r = ee(), a = rt(), o = "[object Arguments]";
    function u(f) {
      return a(f) && r(f) == o;
    }
    i.exports = u;
  }), Zt = x((e, i) => {
    var r = pt(), a = rt(), o = Object.prototype, u = o.hasOwnProperty, f = o.propertyIsEnumerable, _ = r(/* @__PURE__ */ function() {
      return arguments;
    }()) ? r : function(b) {
      return a(b) && u.call(b, "callee") && !f.call(b, "callee");
    };
    i.exports = _;
  }), de = x((e, i) => {
    var r = Array.isArray;
    i.exports = r;
  }), ge = x((e, i) => {
    var r = 9007199254740991;
    function a(o) {
      return typeof o == "number" && o > -1 && o % 1 == 0 && o <= r;
    }
    i.exports = a;
  }), ce = x((e, i) => {
    var r = _e(), a = ge();
    function o(u) {
      return u != null && a(u.length) && !r(u);
    }
    i.exports = o;
  }), fe = x((e, i) => {
    var r = ce(), a = rt();
    function o(u) {
      return a(u) && r(u);
    }
    i.exports = o;
  }), Is = x((e, i) => {
    function r() {
      return !1;
    }
    i.exports = r;
  }), br = x((e, i) => {
    var r = St(), a = Is(), o = typeof e == "object" && e && !e.nodeType && e, u = o && typeof i == "object" && i && !i.nodeType && i, f = u && u.exports === o, _ = f ? r.Buffer : void 0, b = _ ? _.isBuffer : void 0, w = b || a;
    i.exports = w;
  }), La = x((e, i) => {
    var r = ee(), a = m(), o = rt(), u = "[object Object]", f = Function.prototype, _ = Object.prototype, b = f.toString, w = _.hasOwnProperty, O = b.call(Object);
    function S(U) {
      if (!o(U) || r(U) != u) return !1;
      var W = a(U);
      if (W === null) return !0;
      var lt = w.call(W, "constructor") && W.constructor;
      return typeof lt == "function" && lt instanceof lt && b.call(lt) == O;
    }
    i.exports = S;
  }), wa = x((e, i) => {
    var r = ee(), a = ge(), o = rt(), u = "[object Arguments]", f = "[object Array]", _ = "[object Boolean]", b = "[object Date]", w = "[object Error]", O = "[object Function]", S = "[object Map]", U = "[object Number]", W = "[object Object]", lt = "[object RegExp]", yt = "[object Set]", Ct = "[object String]", Bt = "[object WeakMap]", T = "[object ArrayBuffer]", Q = "[object DataView]", st = "[object Float32Array]", xt = "[object Float64Array]", bt = "[object Int8Array]", Lt = "[object Int16Array]", M = "[object Int32Array]", P = "[object Uint8Array]", A = "[object Uint8ClampedArray]", V = "[object Uint16Array]", z = "[object Uint32Array]", R = {};
    R[st] = R[xt] = R[bt] = R[Lt] = R[M] = R[P] = R[A] = R[V] = R[z] = !0, R[u] = R[f] = R[T] = R[_] = R[Q] = R[b] = R[w] = R[O] = R[S] = R[U] = R[W] = R[lt] = R[yt] = R[Ct] = R[Bt] = !1;
    function X(G) {
      return o(G) && a(G.length) && !!R[r(G)];
    }
    i.exports = X;
  }), Os = x((e, i) => {
    function r(a) {
      return function(o) {
        return a(o);
      };
    }
    i.exports = r;
  }), Fs = x((e, i) => {
    var r = vt(), a = typeof e == "object" && e && !e.nodeType && e, o = a && typeof i == "object" && i && !i.nodeType && i, u = o && o.exports === a, f = u && r.process, _ = function() {
      try {
        var b = o && o.require && o.require("util").types;
        return b || f && f.binding && f.binding("util");
      } catch {
      }
    }();
    i.exports = _;
  }), Ca = x((e, i) => {
    var r = wa(), a = Os(), o = Fs(), u = o && o.isTypedArray, f = u ? a(u) : r;
    i.exports = f;
  }), ka = x((e, i) => {
    function r(a, o) {
      if (!(o === "constructor" && typeof a[o] == "function") && o != "__proto__") return a[o];
    }
    i.exports = r;
  }), Rs = x((e, i) => {
    var r = Ti(), a = Z(), o = Object.prototype, u = o.hasOwnProperty;
    function f(_, b, w) {
      var O = _[b];
      (!(u.call(_, b) && a(O, w)) || w === void 0 && !(b in _)) && r(_, b, w);
    }
    i.exports = f;
  }), Ns = x((e, i) => {
    var r = Rs(), a = Ti();
    function o(u, f, _, b) {
      var w = !_;
      _ || (_ = {});
      for (var O = -1, S = f.length; ++O < S; ) {
        var U = f[O], W = b ? b(_[U], u[U], U, _, u) : void 0;
        W === void 0 && (W = u[U]), w ? a(_, U, W) : r(_, U, W);
      }
      return _;
    }
    i.exports = o;
  }), xr = x((e, i) => {
    function r(a, o) {
      for (var u = -1, f = Array(a); ++u < a; ) f[u] = o(u);
      return f;
    }
    i.exports = r;
  }), Ea = x((e, i) => {
    var r = 9007199254740991, a = /^(?:0|[1-9]\d*)$/;
    function o(u, f) {
      var _ = typeof u;
      return f = f ?? r, !!f && (_ == "number" || _ != "symbol" && a.test(u)) && u > -1 && u % 1 == 0 && u < f;
    }
    i.exports = o;
  }), zs = x((e, i) => {
    var r = xr(), a = Zt(), o = de(), u = br(), f = Ea(), _ = Ca(), b = Object.prototype, w = b.hasOwnProperty;
    function O(S, U) {
      var W = o(S), lt = !W && a(S), yt = !W && !lt && u(S), Ct = !W && !lt && !yt && _(S), Bt = W || lt || yt || Ct, T = Bt ? r(S.length, String) : [], Q = T.length;
      for (var st in S) (U || w.call(S, st)) && !(Bt && (st == "length" || yt && (st == "offset" || st == "parent") || Ct && (st == "buffer" || st == "byteLength" || st == "byteOffset") || f(st, Q))) && T.push(st);
      return T;
    }
    i.exports = O;
  }), js = x((e, i) => {
    function r(a) {
      var o = [];
      if (a != null) for (var u in Object(a)) o.push(u);
      return o;
    }
    i.exports = r;
  }), $s = x((e, i) => {
    var r = Kt(), a = I(), o = js(), u = Object.prototype, f = u.hasOwnProperty;
    function _(b) {
      if (!r(b)) return o(b);
      var w = a(b), O = [];
      for (var S in b) S == "constructor" && (w || !f.call(b, S)) || O.push(S);
      return O;
    }
    i.exports = _;
  }), ai = x((e, i) => {
    var r = zs(), a = $s(), o = ce();
    function u(f) {
      return o(f) ? r(f, !0) : a(f);
    }
    i.exports = u;
  }), Ft = x((e, i) => {
    var r = Ns(), a = ai();
    function o(u) {
      return r(u, a(u));
    }
    i.exports = o;
  }), Ma = x((e, i) => {
    var r = Hn(), a = We(), o = hi(), u = Cn(), f = K(), _ = Zt(), b = de(), w = fe(), O = br(), S = _e(), U = Kt(), W = La(), lt = Ca(), yt = ka(), Ct = Ft();
    function Bt(T, Q, st, xt, bt, Lt, M) {
      var P = yt(T, st), A = yt(Q, st), V = M.get(A);
      if (V) {
        r(T, st, V);
        return;
      }
      var z = Lt ? Lt(P, A, st + "", T, Q, M) : void 0, R = z === void 0;
      if (R) {
        var X = b(A), G = !X && O(A), J = !X && !G && lt(A);
        z = A, X || G || J ? b(P) ? z = P : w(P) ? z = u(P) : G ? (R = !1, z = a(A, !0)) : J ? (R = !1, z = o(A, !0)) : z = [] : W(A) || _(A) ? (z = P, _(P) ? z = Ct(P) : (!U(P) || S(P)) && (z = f(A))) : R = !1;
      }
      R && (M.set(A, z), bt(z, A, xt, Lt, M), M.delete(A)), r(T, st, z);
    }
    i.exports = Bt;
  }), Ba = x((e, i) => {
    var r = Zn(), a = Hn(), o = Di(), u = Ma(), f = Kt(), _ = ai(), b = ka();
    function w(O, S, U, W, lt) {
      O !== S && o(S, function(yt, Ct) {
        if (lt || (lt = new r()), f(yt)) u(O, S, Ct, U, w, W, lt);
        else {
          var Bt = W ? W(b(O, Ct), yt, Ct + "", O, S, lt) : void 0;
          Bt === void 0 && (Bt = yt), a(O, Ct, Bt);
        }
      }, _);
    }
    i.exports = w;
  }), Lr = x((e, i) => {
    function r(a) {
      return a;
    }
    i.exports = r;
  }), Pa = x((e, i) => {
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
  }), wr = x((e, i) => {
    var r = Pa(), a = Math.max;
    function o(u, f, _) {
      return f = a(f === void 0 ? u.length - 1 : f, 0), function() {
        for (var b = arguments, w = -1, O = a(b.length - f, 0), S = Array(O); ++w < O; ) S[w] = b[f + w];
        w = -1;
        for (var U = Array(f + 1); ++w < f; ) U[w] = b[w];
        return U[f] = _(S), r(u, this, U);
      };
    }
    i.exports = o;
  }), Sa = x((e, i) => {
    function r(a) {
      return function() {
        return a;
      };
    }
    i.exports = r;
  }), sn = x((e, i) => {
    var r = Sa(), a = Ai(), o = Lr(), u = a ? function(f, _) {
      return a(f, "toString", { configurable: !0, enumerable: !1, value: r(_), writable: !0 });
    } : o;
    i.exports = u;
  }), Aa = x((e, i) => {
    var r = 800, a = 16, o = Date.now;
    function u(f) {
      var _ = 0, b = 0;
      return function() {
        var w = o(), O = a - (w - b);
        if (b = w, O > 0) {
          if (++_ >= r) return arguments[0];
        } else _ = 0;
        return f.apply(void 0, arguments);
      };
    }
    i.exports = u;
  }), Us = x((e, i) => {
    var r = sn(), a = Aa(), o = a(r);
    i.exports = o;
  }), Vs = x((e, i) => {
    var r = Lr(), a = wr(), o = Us();
    function u(f, _) {
      return o(a(f, _, r), f + "");
    }
    i.exports = u;
  }), Gs = x((e, i) => {
    var r = Z(), a = ce(), o = Ea(), u = Kt();
    function f(_, b, w) {
      if (!u(w)) return !1;
      var O = typeof b;
      return (O == "number" ? a(w) && o(b, w.length) : O == "string" && b in w) ? r(w[b], _) : !1;
    }
    i.exports = f;
  }), Zs = x((e, i) => {
    var r = Vs(), a = Gs();
    function o(u) {
      return r(function(f, _) {
        var b = -1, w = _.length, O = w > 1 ? _[w - 1] : void 0, S = w > 2 ? _[2] : void 0;
        for (O = u.length > 3 && typeof O == "function" ? (w--, O) : void 0, S && a(_[0], _[1], S) && (O = w < 3 ? void 0 : O, w = 1), f = Object(f); ++b < w; ) {
          var U = _[b];
          U && u(f, U, b, O);
        }
        return f;
      });
    }
    i.exports = o;
  }), qn = x((e, i) => {
    var r = Ba(), a = Zs(), o = a(function(u, f, _) {
      r(u, f, _);
    });
    i.exports = o;
  }), Cr = x((e, i) => {
    var r = ee(), a = rt(), o = "[object Symbol]";
    function u(f) {
      return typeof f == "symbol" || a(f) && r(f) == o;
    }
    i.exports = u;
  }), Kn = x((e, i) => {
    var r = de(), a = Cr(), o = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/, u = /^\w*$/;
    function f(_, b) {
      if (r(_)) return !1;
      var w = typeof _;
      return w == "number" || w == "symbol" || w == "boolean" || _ == null || a(_) ? !0 : u.test(_) || !o.test(_) || b != null && _ in Object(b);
    }
    i.exports = f;
  }), Hs = x((e, i) => {
    var r = Si(), a = "Expected a function";
    function o(u, f) {
      if (typeof u != "function" || f != null && typeof f != "function") throw new TypeError(a);
      var _ = function() {
        var b = arguments, w = f ? f.apply(this, b) : b[0], O = _.cache;
        if (O.has(w)) return O.get(w);
        var S = u.apply(this, b);
        return _.cache = O.set(w, S) || O, S;
      };
      return _.cache = new (o.Cache || r)(), _;
    }
    o.Cache = r, i.exports = o;
  }), qs = x((e, i) => {
    var r = Hs(), a = 500;
    function o(u) {
      var f = r(u, function(b) {
        return _.size === a && _.clear(), b;
      }), _ = f.cache;
      return f;
    }
    i.exports = o;
  }), Ks = x((e, i) => {
    var r = qs(), a = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g, o = /\\(\\)?/g, u = r(function(f) {
      var _ = [];
      return f.charCodeAt(0) === 46 && _.push(""), f.replace(a, function(b, w, O, S) {
        _.push(O ? S.replace(o, "$1") : w || b);
      }), _;
    });
    i.exports = u;
  }), Ws = x((e, i) => {
    function r(a, o) {
      for (var u = -1, f = a == null ? 0 : a.length, _ = Array(f); ++u < f; ) _[u] = o(a[u], u, a);
      return _;
    }
    i.exports = r;
  }), Js = x((e, i) => {
    var r = Dt(), a = Ws(), o = de(), u = Cr(), f = r ? r.prototype : void 0, _ = f ? f.toString : void 0;
    function b(w) {
      if (typeof w == "string") return w;
      if (o(w)) return a(w, b) + "";
      if (u(w)) return _ ? _.call(w) : "";
      var O = w + "";
      return O == "0" && 1 / w == -1 / 0 ? "-0" : O;
    }
    i.exports = b;
  }), kr = x((e, i) => {
    var r = Js();
    function a(o) {
      return o == null ? "" : r(o);
    }
    i.exports = a;
  }), kn = x((e, i) => {
    var r = de(), a = Kn(), o = Ks(), u = kr();
    function f(_, b) {
      return r(_) ? _ : a(_, b) ? [_] : o(u(_));
    }
    i.exports = f;
  }), Ta = x((e, i) => {
    var r = Cr();
    function a(o) {
      if (typeof o == "string" || r(o)) return o;
      var u = o + "";
      return u == "0" && 1 / o == -1 / 0 ? "-0" : u;
    }
    i.exports = a;
  }), Da = x((e, i) => {
    var r = kn(), a = Ta();
    function o(u, f) {
      f = r(f, u);
      for (var _ = 0, b = f.length; u != null && _ < b; ) u = u[a(f[_++])];
      return _ && _ == b ? u : void 0;
    }
    i.exports = o;
  }), Ii = x((e, i) => {
    var r = Da();
    function a(o, u, f) {
      var _ = o == null ? void 0 : r(o, u);
      return _ === void 0 ? f : _;
    }
    i.exports = a;
  }), oe = x((e, i) => {
    (function(r, a) {
      typeof e == "object" && typeof i < "u" ? i.exports = a() : (r = r || self).RBush = a();
    })(e, function() {
      function r(T, Q, st, xt, bt) {
        (function Lt(M, P, A, V, z) {
          for (; V > A; ) {
            if (V - A > 600) {
              var R = V - A + 1, X = P - A + 1, G = Math.log(R), J = 0.5 * Math.exp(2 * G / 3), it = 0.5 * Math.sqrt(G * J * (R - J) / R) * (X - R / 2 < 0 ? -1 : 1), et = Math.max(A, Math.floor(P - X * J / R + it)), gt = Math.min(V, Math.floor(P + (R - X) * J / R + it));
              Lt(M, P, et, gt, z);
            }
            var It = M[P], Ot = A, qt = V;
            for (a(M, A, P), z(M[V], It) > 0 && a(M, A, V); Ot < qt; ) {
              for (a(M, Ot, qt), Ot++, qt--; z(M[Ot], It) < 0; ) Ot++;
              for (; z(M[qt], It) > 0; ) qt--;
            }
            z(M[A], It) === 0 ? a(M, A, qt) : a(M, ++qt, V), qt <= P && (A = qt + 1), P <= qt && (V = qt - 1);
          }
        })(T, Q, st || 0, xt || T.length - 1, bt || o);
      }
      function a(T, Q, st) {
        var xt = T[Q];
        T[Q] = T[st], T[st] = xt;
      }
      function o(T, Q) {
        return T < Q ? -1 : T > Q ? 1 : 0;
      }
      var u = function(T) {
        T === void 0 && (T = 9), this._maxEntries = Math.max(4, T), this._minEntries = Math.max(2, Math.ceil(0.4 * this._maxEntries)), this.clear();
      };
      function f(T, Q, st) {
        if (!st) return Q.indexOf(T);
        for (var xt = 0; xt < Q.length; xt++) if (st(T, Q[xt])) return xt;
        return -1;
      }
      function _(T, Q) {
        b(T, 0, T.children.length, Q, T);
      }
      function b(T, Q, st, xt, bt) {
        bt || (bt = Ct(null)), bt.minX = 1 / 0, bt.minY = 1 / 0, bt.maxX = -1 / 0, bt.maxY = -1 / 0;
        for (var Lt = Q; Lt < st; Lt++) {
          var M = T.children[Lt];
          w(bt, T.leaf ? xt(M) : M);
        }
        return bt;
      }
      function w(T, Q) {
        return T.minX = Math.min(T.minX, Q.minX), T.minY = Math.min(T.minY, Q.minY), T.maxX = Math.max(T.maxX, Q.maxX), T.maxY = Math.max(T.maxY, Q.maxY), T;
      }
      function O(T, Q) {
        return T.minX - Q.minX;
      }
      function S(T, Q) {
        return T.minY - Q.minY;
      }
      function U(T) {
        return (T.maxX - T.minX) * (T.maxY - T.minY);
      }
      function W(T) {
        return T.maxX - T.minX + (T.maxY - T.minY);
      }
      function lt(T, Q) {
        return T.minX <= Q.minX && T.minY <= Q.minY && Q.maxX <= T.maxX && Q.maxY <= T.maxY;
      }
      function yt(T, Q) {
        return Q.minX <= T.maxX && Q.minY <= T.maxY && Q.maxX >= T.minX && Q.maxY >= T.minY;
      }
      function Ct(T) {
        return { children: T, height: 1, leaf: !0, minX: 1 / 0, minY: 1 / 0, maxX: -1 / 0, maxY: -1 / 0 };
      }
      function Bt(T, Q, st, xt, bt) {
        for (var Lt = [Q, st]; Lt.length; ) if (!((st = Lt.pop()) - (Q = Lt.pop()) <= xt)) {
          var M = Q + Math.ceil((st - Q) / xt / 2) * xt;
          r(T, M, Q, st, bt), Lt.push(Q, M, M, st);
        }
      }
      return u.prototype.all = function() {
        return this._all(this.data, []);
      }, u.prototype.search = function(T) {
        var Q = this.data, st = [];
        if (!yt(T, Q)) return st;
        for (var xt = this.toBBox, bt = []; Q; ) {
          for (var Lt = 0; Lt < Q.children.length; Lt++) {
            var M = Q.children[Lt], P = Q.leaf ? xt(M) : M;
            yt(T, P) && (Q.leaf ? st.push(M) : lt(T, P) ? this._all(M, st) : bt.push(M));
          }
          Q = bt.pop();
        }
        return st;
      }, u.prototype.collides = function(T) {
        var Q = this.data;
        if (!yt(T, Q)) return !1;
        for (var st = []; Q; ) {
          for (var xt = 0; xt < Q.children.length; xt++) {
            var bt = Q.children[xt], Lt = Q.leaf ? this.toBBox(bt) : bt;
            if (yt(T, Lt)) {
              if (Q.leaf || lt(T, Lt)) return !0;
              st.push(bt);
            }
          }
          Q = st.pop();
        }
        return !1;
      }, u.prototype.load = function(T) {
        if (!T || !T.length) return this;
        if (T.length < this._minEntries) {
          for (var Q = 0; Q < T.length; Q++) this.insert(T[Q]);
          return this;
        }
        var st = this._build(T.slice(), 0, T.length - 1, 0);
        if (this.data.children.length) if (this.data.height === st.height) this._splitRoot(this.data, st);
        else {
          if (this.data.height < st.height) {
            var xt = this.data;
            this.data = st, st = xt;
          }
          this._insert(st, this.data.height - st.height - 1, !0);
        }
        else this.data = st;
        return this;
      }, u.prototype.insert = function(T) {
        return T && this._insert(T, this.data.height - 1), this;
      }, u.prototype.clear = function() {
        return this.data = Ct([]), this;
      }, u.prototype.remove = function(T, Q) {
        if (!T) return this;
        for (var st, xt, bt, Lt = this.data, M = this.toBBox(T), P = [], A = []; Lt || P.length; ) {
          if (Lt || (Lt = P.pop(), xt = P[P.length - 1], st = A.pop(), bt = !0), Lt.leaf) {
            var V = f(T, Lt.children, Q);
            if (V !== -1) return Lt.children.splice(V, 1), P.push(Lt), this._condense(P), this;
          }
          bt || Lt.leaf || !lt(Lt, M) ? xt ? (st++, Lt = xt.children[st], bt = !1) : Lt = null : (P.push(Lt), A.push(st), st = 0, xt = Lt, Lt = Lt.children[0]);
        }
        return this;
      }, u.prototype.toBBox = function(T) {
        return T;
      }, u.prototype.compareMinX = function(T, Q) {
        return T.minX - Q.minX;
      }, u.prototype.compareMinY = function(T, Q) {
        return T.minY - Q.minY;
      }, u.prototype.toJSON = function() {
        return this.data;
      }, u.prototype.fromJSON = function(T) {
        return this.data = T, this;
      }, u.prototype._all = function(T, Q) {
        for (var st = []; T; ) T.leaf ? Q.push.apply(Q, T.children) : st.push.apply(st, T.children), T = st.pop();
        return Q;
      }, u.prototype._build = function(T, Q, st, xt) {
        var bt, Lt = st - Q + 1, M = this._maxEntries;
        if (Lt <= M) return _(bt = Ct(T.slice(Q, st + 1)), this.toBBox), bt;
        xt || (xt = Math.ceil(Math.log(Lt) / Math.log(M)), M = Math.ceil(Lt / Math.pow(M, xt - 1))), (bt = Ct([])).leaf = !1, bt.height = xt;
        var P = Math.ceil(Lt / M), A = P * Math.ceil(Math.sqrt(M));
        Bt(T, Q, st, A, this.compareMinX);
        for (var V = Q; V <= st; V += A) {
          var z = Math.min(V + A - 1, st);
          Bt(T, V, z, P, this.compareMinY);
          for (var R = V; R <= z; R += P) {
            var X = Math.min(R + P - 1, z);
            bt.children.push(this._build(T, R, X, xt - 1));
          }
        }
        return _(bt, this.toBBox), bt;
      }, u.prototype._chooseSubtree = function(T, Q, st, xt) {
        for (; xt.push(Q), !Q.leaf && xt.length - 1 !== st; ) {
          for (var bt = 1 / 0, Lt = 1 / 0, M = void 0, P = 0; P < Q.children.length; P++) {
            var A = Q.children[P], V = U(A), z = (R = T, X = A, (Math.max(X.maxX, R.maxX) - Math.min(X.minX, R.minX)) * (Math.max(X.maxY, R.maxY) - Math.min(X.minY, R.minY)) - V);
            z < Lt ? (Lt = z, bt = V < bt ? V : bt, M = A) : z === Lt && V < bt && (bt = V, M = A);
          }
          Q = M || Q.children[0];
        }
        var R, X;
        return Q;
      }, u.prototype._insert = function(T, Q, st) {
        var xt = st ? T : this.toBBox(T), bt = [], Lt = this._chooseSubtree(xt, this.data, Q, bt);
        for (Lt.children.push(T), w(Lt, xt); Q >= 0 && bt[Q].children.length > this._maxEntries; ) this._split(bt, Q), Q--;
        this._adjustParentBBoxes(xt, bt, Q);
      }, u.prototype._split = function(T, Q) {
        var st = T[Q], xt = st.children.length, bt = this._minEntries;
        this._chooseSplitAxis(st, bt, xt);
        var Lt = this._chooseSplitIndex(st, bt, xt), M = Ct(st.children.splice(Lt, st.children.length - Lt));
        M.height = st.height, M.leaf = st.leaf, _(st, this.toBBox), _(M, this.toBBox), Q ? T[Q - 1].children.push(M) : this._splitRoot(st, M);
      }, u.prototype._splitRoot = function(T, Q) {
        this.data = Ct([T, Q]), this.data.height = T.height + 1, this.data.leaf = !1, _(this.data, this.toBBox);
      }, u.prototype._chooseSplitIndex = function(T, Q, st) {
        for (var xt, bt, Lt, M, P, A, V, z = 1 / 0, R = 1 / 0, X = Q; X <= st - Q; X++) {
          var G = b(T, 0, X, this.toBBox), J = b(T, X, st, this.toBBox), it = (bt = G, Lt = J, M = void 0, P = void 0, A = void 0, V = void 0, M = Math.max(bt.minX, Lt.minX), P = Math.max(bt.minY, Lt.minY), A = Math.min(bt.maxX, Lt.maxX), V = Math.min(bt.maxY, Lt.maxY), Math.max(0, A - M) * Math.max(0, V - P)), et = U(G) + U(J);
          it < z ? (z = it, xt = X, R = et < R ? et : R) : it === z && et < R && (R = et, xt = X);
        }
        return xt || st - Q;
      }, u.prototype._chooseSplitAxis = function(T, Q, st) {
        var xt = T.leaf ? this.compareMinX : O, bt = T.leaf ? this.compareMinY : S;
        this._allDistMargin(T, Q, st, xt) < this._allDistMargin(T, Q, st, bt) && T.children.sort(xt);
      }, u.prototype._allDistMargin = function(T, Q, st, xt) {
        T.children.sort(xt);
        for (var bt = this.toBBox, Lt = b(T, 0, Q, bt), M = b(T, st - Q, st, bt), P = W(Lt) + W(M), A = Q; A < st - Q; A++) {
          var V = T.children[A];
          w(Lt, T.leaf ? bt(V) : V), P += W(Lt);
        }
        for (var z = st - Q - 1; z >= Q; z--) {
          var R = T.children[z];
          w(M, T.leaf ? bt(R) : R), P += W(M);
        }
        return P;
      }, u.prototype._adjustParentBBoxes = function(T, Q, st) {
        for (var xt = st; xt >= 0; xt--) w(Q[xt], T);
      }, u.prototype._condense = function(T) {
        for (var Q = T.length - 1, st = void 0; Q >= 0; Q--) T[Q].children.length === 0 ? Q > 0 ? (st = T[Q - 1].children).splice(st.indexOf(T[Q]), 1) : this.clear() : _(T[Q], this.toBBox);
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
  var ye = { version: "2.19.3" }, En = k(qn()), on = { tooltips: { placeMarker: "Click to place marker", placeMarkerTouch: "Tap the map to place a marker", firstVertex: "Click to place first vertex", continueLine: "Click to continue drawing", finishLine: "Click any existing marker to finish", finishPoly: "Click first marker to finish", finishRect: "Click to finish", startCircle: "Click to place circle center", finishCircle: "Click to finish circle", placeCircleMarker: "Click to place circle marker", placeText: "Click to place text", selectFirstLayerFor: "Select first layer for {action}", selectSecondLayerFor: "Select second layer for {action}" }, actions: { finish: "Finish", cancel: "Cancel", removeLastVertex: "Remove Last Vertex" }, buttonTitles: { drawMarkerButton: "Draw Marker", drawPolyButton: "Draw Polygons", drawLineButton: "Draw Polyline", drawCircleButton: "Draw Circle", drawRectButton: "Draw Rectangle", editButton: "Edit Layers", dragButton: "Drag Layers", cutButton: "Cut Layers", deleteButton: "Remove Layers", drawCircleMarkerButton: "Draw Circle Marker", snappingButton: "Snap dragged marker to other layers and vertices", pinningButton: "Pin shared vertices together", rotateButton: "Rotate Layers", drawTextButton: "Draw Text", scaleButton: "Scale Layers", autoTracingButton: "Auto trace Line", snapGuidesButton: "Show SnapGuides", unionButton: "Union layers", differenceButton: "Subtract layers" }, measurements: { totalLength: "Length", segmentLength: "Segment length", area: "Area", radius: "Radius", perimeter: "Perimeter", height: "Height", width: "Width", coordinates: "Position", coordinatesMarker: "Position Marker" } }, ln = { tooltips: { placeMarker: "Platziere den Marker mit Klick", placeMarkerTouch: "Tippe auf die Karte, um einen Marker zu platzieren", firstVertex: "Platziere den ersten Marker mit Klick", continueLine: "Klicke, um weiter zu zeichnen", finishLine: "Beende mit Klick auf existierenden Marker", finishPoly: "Beende mit Klick auf ersten Marker", finishRect: "Beende mit Klick", startCircle: "Platziere das Kreiszentrum mit Klick", finishCircle: "Beende den Kreis mit Klick", placeCircleMarker: "Platziere den Kreismarker mit Klick", placeText: "Platziere den Text mit Klick" }, actions: { finish: "Beenden", cancel: "Abbrechen", removeLastVertex: "Letzten Vertex löschen" }, buttonTitles: { drawMarkerButton: "Marker zeichnen", drawPolyButton: "Polygon zeichnen", drawLineButton: "Polyline zeichnen", drawCircleButton: "Kreis zeichnen", drawRectButton: "Rechteck zeichnen", editButton: "Layer editieren", dragButton: "Layer bewegen", cutButton: "Layer schneiden", deleteButton: "Layer löschen", drawCircleMarkerButton: "Kreismarker zeichnen", snappingButton: "Bewegter Layer an andere Layer oder Vertexe einhacken", pinningButton: "Vertexe an der gleichen Position verknüpfen", rotateButton: "Layer drehen", drawTextButton: "Text zeichnen", scaleButton: "Layer skalieren", autoTracingButton: "Linie automatisch nachzeichen" }, measurements: { totalLength: "Länge", segmentLength: "Segment Länge", area: "Fläche", radius: "Radius", perimeter: "Umfang", height: "Höhe", width: "Breite", coordinates: "Position", coordinatesMarker: "Position Marker" } }, Er = { tooltips: { placeMarker: "Clicca per posizionare un Marker", placeMarkerTouch: "Tocca la mappa per posizionare un marker", firstVertex: "Clicca per posizionare il primo vertice", continueLine: "Clicca per continuare a disegnare", finishLine: "Clicca qualsiasi marker esistente per terminare", finishPoly: "Clicca il primo marker per terminare", finishRect: "Clicca per terminare", startCircle: "Clicca per posizionare il punto centrale del cerchio", finishCircle: "Clicca per terminare il cerchio", placeCircleMarker: "Clicca per posizionare un Marker del cherchio" }, actions: { finish: "Termina", cancel: "Annulla", removeLastVertex: "Rimuovi l'ultimo vertice" }, buttonTitles: { drawMarkerButton: "Disegna Marker", drawPolyButton: "Disegna Poligoni", drawLineButton: "Disegna Polilinea", drawCircleButton: "Disegna Cerchio", drawRectButton: "Disegna Rettangolo", editButton: "Modifica Livelli", dragButton: "Sposta Livelli", cutButton: "Ritaglia Livelli", deleteButton: "Elimina Livelli", drawCircleMarkerButton: "Disegna Marker del Cerchio", snappingButton: "Snap ha trascinato il pennarello su altri strati e vertici", pinningButton: "Pin condiviso vertici insieme", rotateButton: "Ruota livello" } }, Wt = { tooltips: { placeMarker: "Klik untuk menempatkan marker", placeMarkerTouch: "Ketuk peta untuk menempatkan marker", firstVertex: "Klik untuk menempatkan vertex pertama", continueLine: "Klik untuk meneruskan digitasi", finishLine: "Klik pada sembarang marker yang ada untuk mengakhiri", finishPoly: "Klik marker pertama untuk mengakhiri", finishRect: "Klik untuk mengakhiri", startCircle: "Klik untuk menempatkan titik pusat lingkaran", finishCircle: "Klik untuk mengakhiri lingkaran", placeCircleMarker: "Klik untuk menempatkan penanda lingkarann" }, actions: { finish: "Selesai", cancel: "Batal", removeLastVertex: "Hilangkan Vertex Terakhir" }, buttonTitles: { drawMarkerButton: "Digitasi Marker", drawPolyButton: "Digitasi Polygon", drawLineButton: "Digitasi Polyline", drawCircleButton: "Digitasi Lingkaran", drawRectButton: "Digitasi Segi Empat", editButton: "Edit Layer", dragButton: "Geser Layer", cutButton: "Potong Layer", deleteButton: "Hilangkan Layer", drawCircleMarkerButton: "Digitasi Penanda Lingkaran", snappingButton: "Jepretkan penanda yang ditarik ke lapisan dan simpul lain", pinningButton: "Sematkan simpul bersama bersama", rotateButton: "Putar lapisan" } }, be = { tooltips: { placeMarker: "Adaugă un punct", placeMarkerTouch: "Atingeți harta pentru a plasa un punct", firstVertex: "Apasă aici pentru a adăuga primul Vertex", continueLine: "Apasă aici pentru a continua desenul", finishLine: "Apasă pe orice obiect pentru a finisa desenul", finishPoly: "Apasă pe primul obiect pentru a finisa", finishRect: "Apasă pentru a finisa", startCircle: "Apasă pentru a desena un cerc", finishCircle: "Apasă pentru a finisa un cerc", placeCircleMarker: "Adaugă un punct" }, actions: { finish: "Termină", cancel: "Anulează", removeLastVertex: "Șterge ultimul Vertex" }, buttonTitles: { drawMarkerButton: "Adaugă o bulină", drawPolyButton: "Desenează un poligon", drawLineButton: "Desenează o linie", drawCircleButton: "Desenează un cerc", drawRectButton: "Desenează un dreptunghi", editButton: "Editează straturile", dragButton: "Mută straturile", cutButton: "Taie straturile", deleteButton: "Șterge straturile", drawCircleMarkerButton: "Desenează marcatorul cercului", snappingButton: "Fixați marcatorul glisat pe alte straturi și vârfuri", pinningButton: "Fixați vârfurile partajate împreună", rotateButton: "Rotiți stratul" } }, Mr = { tooltips: { placeMarker: "Нажмите, чтобы нанести маркер", placeMarkerTouch: "Коснитесь карты, чтобы разместить маркер", firstVertex: "Нажмите, чтобы нанести первый объект", continueLine: "Нажмите, чтобы продолжить рисование", finishLine: "Нажмите любой существующий маркер для завершения", finishPoly: "Выберите первую точку, чтобы закончить", finishRect: "Нажмите, чтобы закончить", startCircle: "Нажмите, чтобы добавить центр круга", finishCircle: "Нажмите, чтобы задать радиус", placeCircleMarker: "Нажмите, чтобы нанести круговой маркер" }, actions: { finish: "Завершить", cancel: "Отменить", removeLastVertex: "Отменить последнее действие" }, buttonTitles: { drawMarkerButton: "Добавить маркер", drawPolyButton: "Рисовать полигон", drawLineButton: "Рисовать кривую", drawCircleButton: "Рисовать круг", drawRectButton: "Рисовать прямоугольник", editButton: "Редактировать слой", dragButton: "Перенести слой", cutButton: "Вырезать слой", deleteButton: "Удалить слой", drawCircleMarkerButton: "Добавить круговой маркер", snappingButton: "Привязать перетаскиваемый маркер к другим слоям и вершинам", pinningButton: "Связать общие точки вместе", rotateButton: "Поворот слоя" } }, Wn = { tooltips: { placeMarker: "Presiona para colocar un marcador", placeMarkerTouch: "Toca el mapa para colocar un marcador", firstVertex: "Presiona para colocar el primer vértice", continueLine: "Presiona para continuar dibujando", finishLine: "Presiona cualquier marcador existente para finalizar", finishPoly: "Presiona el primer marcador para finalizar", finishRect: "Presiona para finalizar", startCircle: "Presiona para colocar el centro del círculo", finishCircle: "Presiona para finalizar el círculo", placeCircleMarker: "Presiona para colocar un marcador de círculo" }, actions: { finish: "Finalizar", cancel: "Cancelar", removeLastVertex: "Eliminar último vértice" }, buttonTitles: { drawMarkerButton: "Dibujar Marcador", drawPolyButton: "Dibujar Polígono", drawLineButton: "Dibujar Línea", drawCircleButton: "Dibujar Círculo", drawRectButton: "Dibujar Rectángulo", editButton: "Editar Capas", dragButton: "Arrastrar Capas", cutButton: "Cortar Capas", deleteButton: "Eliminar Capas", drawCircleMarkerButton: "Dibujar Marcador de Círculo", snappingButton: "El marcador de Snap arrastrado a otras capas y vértices", pinningButton: "Fijar juntos los vértices compartidos", rotateButton: "Rotar capa" } }, Qe = { tooltips: { placeMarker: "Klik om een marker te plaatsen", placeMarkerTouch: "Tik op de kaart om een marker te plaatsen", firstVertex: "Klik om het eerste punt te plaatsen", continueLine: "Klik om te blijven tekenen", finishLine: "Klik op een bestaand punt om te beëindigen", finishPoly: "Klik op het eerst punt om te beëindigen", finishRect: "Klik om te beëindigen", startCircle: "Klik om het middelpunt te plaatsen", finishCircle: "Klik om de cirkel te beëindigen", placeCircleMarker: "Klik om een marker te plaatsen" }, actions: { finish: "Bewaar", cancel: "Annuleer", removeLastVertex: "Verwijder laatste punt" }, buttonTitles: { drawMarkerButton: "Plaats Marker", drawPolyButton: "Teken een vlak", drawLineButton: "Teken een lijn", drawCircleButton: "Teken een cirkel", drawRectButton: "Teken een vierkant", editButton: "Bewerk", dragButton: "Verplaats", cutButton: "Knip", deleteButton: "Verwijder", drawCircleMarkerButton: "Plaats Marker", snappingButton: "Snap gesleepte marker naar andere lagen en hoekpunten", pinningButton: "Speld gedeelde hoekpunten samen", rotateButton: "Laag roteren" } }, Xs = { tooltips: { placeMarker: "Cliquez pour placer un marqueur", placeMarkerTouch: "Appuyez sur la carte pour placer un marqueur", firstVertex: "Cliquez pour placer le premier sommet", continueLine: "Cliquez pour continuer à dessiner", finishLine: "Cliquez sur n'importe quel marqueur pour terminer", finishPoly: "Cliquez sur le premier marqueur pour terminer", finishRect: "Cliquez pour terminer", startCircle: "Cliquez pour placer le centre du cercle", finishCircle: "Cliquez pour finir le cercle", placeCircleMarker: "Cliquez pour placer le marqueur circulaire" }, actions: { finish: "Terminer", cancel: "Annuler", removeLastVertex: "Retirer le dernier sommet" }, buttonTitles: { drawMarkerButton: "Placer des marqueurs", drawPolyButton: "Dessiner des polygones", drawLineButton: "Dessiner des polylignes", drawCircleButton: "Dessiner un cercle", drawRectButton: "Dessiner un rectangle", editButton: "Éditer des calques", dragButton: "Déplacer des calques", cutButton: "Couper des calques", deleteButton: "Supprimer des calques", drawCircleMarkerButton: "Dessiner un marqueur circulaire", snappingButton: "Glisser le marqueur vers d'autres couches et sommets", pinningButton: "Épingler ensemble les sommets partagés", rotateButton: "Tourner des calques" } }, Jn = { tooltips: { placeMarker: "单击放置标记", placeMarkerTouch: "点击地图放置标记", firstVertex: "单击放置首个顶点", continueLine: "单击继续绘制", finishLine: "单击任何存在的标记以完成", finishPoly: "单击第一个标记以完成", finishRect: "单击完成", startCircle: "单击放置圆心", finishCircle: "单击完成圆形", placeCircleMarker: "点击放置圆形标记" }, actions: { finish: "完成", cancel: "取消", removeLastVertex: "移除最后的顶点" }, buttonTitles: { drawMarkerButton: "绘制标记", drawPolyButton: "绘制多边形", drawLineButton: "绘制线段", drawCircleButton: "绘制圆形", drawRectButton: "绘制长方形", editButton: "编辑图层", dragButton: "拖拽图层", cutButton: "剪切图层", deleteButton: "删除图层", drawCircleMarkerButton: "画圆圈标记", snappingButton: "将拖动的标记捕捉到其他图层和顶点", pinningButton: "将共享顶点固定在一起", rotateButton: "旋转图层" } }, Zi = { tooltips: { placeMarker: "單擊放置標記", placeMarkerTouch: "點擊地圖放置標記", firstVertex: "單擊放置第一個頂點", continueLine: "單擊繼續繪製", finishLine: "單擊任何存在的標記以完成", finishPoly: "單擊第一個標記以完成", finishRect: "單擊完成", startCircle: "單擊放置圓心", finishCircle: "單擊完成圓形", placeCircleMarker: "點擊放置圓形標記" }, actions: { finish: "完成", cancel: "取消", removeLastVertex: "移除最後一個頂點" }, buttonTitles: { drawMarkerButton: "放置標記", drawPolyButton: "繪製多邊形", drawLineButton: "繪製線段", drawCircleButton: "繪製圓形", drawRectButton: "繪製方形", editButton: "編輯圖形", dragButton: "移動圖形", cutButton: "裁切圖形", deleteButton: "刪除圖形", drawCircleMarkerButton: "畫圓圈標記", snappingButton: "將拖動的標記對齊到其他圖層和頂點", pinningButton: "將共享頂點固定在一起", rotateButton: "旋轉圖形" } }, we = { tooltips: { placeMarker: "Clique para posicionar o marcador", placeMarkerTouch: "Toque no mapa para posicionar um marcador", firstVertex: "Clique para posicionar o primeiro vértice", continueLine: "Clique para continuar desenhando", finishLine: "Clique em qualquer marcador existente para finalizar", finishPoly: "Clique no primeiro marcador para finalizar", finishRect: "Clique para finalizar", startCircle: "Clique para posicionar o centro do círculo", finishCircle: "Clique para finalizar o círculo", placeCircleMarker: "Clique para posicionar o marcador circular", placeText: "Clique para inserir texto" }, actions: { finish: "Finalizar", cancel: "Cancelar", removeLastVertex: "Remover último vértice" }, buttonTitles: { drawMarkerButton: "Desenhar Marcador", drawPolyButton: "Desenhar Polígonos", drawLineButton: "Desenhar Linha Poligonal", drawCircleButton: "Desenhar Círculo", drawRectButton: "Desenhar Retângulo", editButton: "Editar Camadas", dragButton: "Arrastar Camadas", cutButton: "Recortar Camadas", deleteButton: "Remover Camadas", drawCircleMarkerButton: "Desenhar Marcador de Círculo", snappingButton: "Ajustar marcador arrastado a outras camadas e vértices", pinningButton: "Unir vértices compartilhados", rotateButton: "Rotacionar Camadas", drawTextButton: "Desenhar Texto", scaleButton: "Redimensionar Camadas", autoTracingButton: "Traçado Automático de Linha" }, measurements: { totalLength: "Comprimento", segmentLength: "Comprimento do Segmento", area: "Área", radius: "Raio", perimeter: "Perímetro", height: "Altura", width: "Largura", coordinates: "Posição", coordinatesMarker: "Marcador de Posição" } }, Oi = { tooltips: { placeMarker: "Clique para colocar marcador", placeMarkerTouch: "Toque no mapa para colocar um marcador", firstVertex: "Clique para colocar primeiro vértice", continueLine: "Clique para continuar a desenhar", finishLine: "Clique num marcador existente para terminar", finishPoly: "Clique no primeiro marcador para terminar", finishRect: "Clique para terminar", startCircle: "Clique para colocar o centro do círculo", finishCircle: "Clique para terminar o círculo", placeCircleMarker: "Clique para colocar marcador de círculo", placeText: "Clique para colocar texto" }, actions: { finish: "Terminar", cancel: "Cancelar", removeLastVertex: "Remover Último Vértice" }, buttonTitles: { drawMarkerButton: "Desenhar Marcador", drawPolyButton: "Desenhar Polígonos", drawLineButton: "Desenhar Polilinha", drawCircleButton: "Desenhar Círculo", drawRectButton: "Desenhar Retângulo", editButton: "Editar Camadas", dragButton: "Arrastar Camadas", cutButton: "Cortar Camadas", deleteButton: "Remover Camadas", drawCircleMarkerButton: "Desenhar Marcador de Círculo", snappingButton: "Ajustar marcador arrastado a outras camadas e vértices", pinningButton: "Unir vértices partilhados", rotateButton: "Rodar Camadas", drawTextButton: "Desenhar Texto", scaleButton: "Escalar Camadas", autoTracingButton: "Traçado Automático de Linha" }, measurements: { totalLength: "Comprimento", segmentLength: "Comprimento do Segmento", area: "Área", radius: "Raio", perimeter: "Perímetro", height: "Altura", width: "Largura", coordinates: "Posição", coordinatesMarker: "Marcador de Posição" } }, Mn = { tooltips: { placeMarker: "Kliknij, aby umieścić znacznik", placeMarkerTouch: "Dotknij mapę, aby umieścić znacznik", firstVertex: "Kliknij, aby umieścić pierwszy wierzchołek", continueLine: "Kliknij, aby kontynuować rysowanie", finishLine: "Kliknij dowolny istniejący znacznik, aby zakończyć", finishPoly: "Kliknij pierwszy znacznik, aby zakończyć", finishRect: "Kliknij, aby zakończyć", startCircle: "Kliknij, aby umieścić środek okręgu", finishCircle: "Kliknij, aby zakończyć okrąg", placeCircleMarker: "Kliknij, aby umieścić znacznik okręgu", placeText: "Kliknij, aby umieścić tekst" }, actions: { finish: "Zakończ", cancel: "Anuluj", removeLastVertex: "Usuń ostatni wierzchołek" }, buttonTitles: { drawMarkerButton: "Rysuj znacznik", drawPolyButton: "Rysuj wielokąt", drawLineButton: "Rysuj linię", drawCircleButton: "Rysuj okrąg", drawRectButton: "Rysuj prostokąt", editButton: "Edytuj warstwy", dragButton: "Przeciągnij warstwy", cutButton: "Wytnij warstwy", deleteButton: "Usuń warstwy", drawCircleMarkerButton: "Rysuj znacznik okrągły", snappingButton: "Przyciągnij przenoszony znacznik do innych warstw i wierzchołków", pinningButton: "Przypnij wspólne wierzchołki razem", rotateButton: "Obróć warstwy", drawTextButton: "Rysuj tekst", scaleButton: "Skaluj warstwy", autoTracingButton: "Automatyczne śledzenie linii" }, measurements: { totalLength: "Długość", segmentLength: "Długość odcinka", area: "Obszar", radius: "Promień", perimeter: "Obwód", height: "Wysokość", width: "Szerokość", coordinates: "Pozycja", coordinatesMarker: "Znacznik pozycji" } }, Bn = { tooltips: { placeMarker: "Klicka för att placera markör", placeMarkerTouch: "Tryck på kartan för att placera en markör", firstVertex: "Klicka för att placera första hörnet", continueLine: "Klicka för att fortsätta rita", finishLine: "Klicka på en existerande punkt för att slutföra", finishPoly: "Klicka på den första punkten för att slutföra", finishRect: "Klicka för att slutföra", startCircle: "Klicka för att placera cirkelns centrum", finishCircle: "Klicka för att slutföra cirkeln", placeCircleMarker: "Klicka för att placera cirkelmarkör" }, actions: { finish: "Slutför", cancel: "Avbryt", removeLastVertex: "Ta bort sista hörnet" }, buttonTitles: { drawMarkerButton: "Rita Markör", drawPolyButton: "Rita Polygoner", drawLineButton: "Rita Linje", drawCircleButton: "Rita Cirkel", drawRectButton: "Rita Rektangel", editButton: "Redigera Lager", dragButton: "Dra Lager", cutButton: "Klipp i Lager", deleteButton: "Ta bort Lager", drawCircleMarkerButton: "Rita Cirkelmarkör", snappingButton: "Snäpp dra markören till andra lager och hörn", pinningButton: "Fäst delade hörn tillsammans", rotateButton: "Rotera lagret" } }, Br = { tooltips: { placeMarker: "Κάντε κλικ για να τοποθετήσετε Δείκτη", placeMarkerTouch: "Πατήστε στο χάρτη για να τοποθετήσετε δείκτη", firstVertex: "Κάντε κλικ για να τοποθετήσετε το πρώτο σημείο", continueLine: "Κάντε κλικ για να συνεχίσετε να σχεδιάζετε", finishLine: "Κάντε κλικ σε οποιονδήποτε υπάρχον σημείο για να ολοκληρωθεί", finishPoly: "Κάντε κλικ στο πρώτο σημείο για να τελειώσετε", finishRect: "Κάντε κλικ για να τελειώσετε", startCircle: "Κάντε κλικ για να τοποθετήσετε κέντρο Κύκλου", finishCircle: "Κάντε κλικ για να ολοκληρώσετε τον Κύκλο", placeCircleMarker: "Κάντε κλικ για να τοποθετήσετε Κυκλικό Δείκτη" }, actions: { finish: "Τέλος", cancel: "Ακύρωση", removeLastVertex: "Κατάργηση τελευταίου σημείου" }, buttonTitles: { drawMarkerButton: "Σχεδίαση Δείκτη", drawPolyButton: "Σχεδίαση Πολυγώνου", drawLineButton: "Σχεδίαση Γραμμής", drawCircleButton: "Σχεδίαση Κύκλου", drawRectButton: "Σχεδίαση Ορθογωνίου", editButton: "Επεξεργασία Επιπέδων", dragButton: "Μεταφορά Επιπέδων", cutButton: "Αποκοπή Επιπέδων", deleteButton: "Κατάργηση Επιπέδων", drawCircleMarkerButton: "Σχεδίαση Κυκλικού Δείκτη", snappingButton: "Προσκόλληση του Δείκτη μεταφοράς σε άλλα Επίπεδα και Κορυφές", pinningButton: "Περικοπή κοινών κορυφών μαζί", rotateButton: "Περιστρέψτε το στρώμα" } }, Pn = { tooltips: { placeMarker: "Kattintson a jelölő elhelyezéséhez", placeMarkerTouch: "Érintse meg a térképet a jelölő elhelyezéséhez", firstVertex: "Kattintson az első pont elhelyezéséhez", continueLine: "Kattintson a következő pont elhelyezéséhez", finishLine: "A befejezéshez kattintson egy meglévő pontra", finishPoly: "A befejezéshez kattintson az első pontra", finishRect: "Kattintson a befejezéshez", startCircle: "Kattintson a kör középpontjának elhelyezéséhez", finishCircle: "Kattintson a kör befejezéséhez", placeCircleMarker: "Kattintson a körjelölő elhelyezéséhez" }, actions: { finish: "Befejezés", cancel: "Mégse", removeLastVertex: "Utolsó pont eltávolítása" }, buttonTitles: { drawMarkerButton: "Jelölő rajzolása", drawPolyButton: "Poligon rajzolása", drawLineButton: "Vonal rajzolása", drawCircleButton: "Kör rajzolása", drawRectButton: "Négyzet rajzolása", editButton: "Elemek szerkesztése", dragButton: "Elemek mozgatása", cutButton: "Elemek vágása", deleteButton: "Elemek törlése", drawCircleMarkerButton: "Kör jelölő rajzolása", snappingButton: "Kapcsolja a jelöltőt másik elemhez vagy ponthoz", pinningButton: "Közös pontok összekötése", rotateButton: "Fólia elforgatása" } }, Pr = { tooltips: { placeMarker: "Tryk for at placere en markør", placeMarkerTouch: "Tryk på kortet for at placere en markør", firstVertex: "Tryk for at placere det første punkt", continueLine: "Tryk for at fortsætte linjen", finishLine: "Tryk på et eksisterende punkt for at afslutte", finishPoly: "Tryk på det første punkt for at afslutte", finishRect: "Tryk for at afslutte", startCircle: "Tryk for at placere cirklens center", finishCircle: "Tryk for at afslutte cirklen", placeCircleMarker: "Tryk for at placere en cirkelmarkør" }, actions: { finish: "Afslut", cancel: "Afbryd", removeLastVertex: "Fjern sidste punkt" }, buttonTitles: { drawMarkerButton: "Placer markør", drawPolyButton: "Tegn polygon", drawLineButton: "Tegn linje", drawCircleButton: "Tegn cirkel", drawRectButton: "Tegn firkant", editButton: "Rediger", dragButton: "Træk", cutButton: "Klip", deleteButton: "Fjern", drawCircleMarkerButton: "Tegn cirkelmarkør", snappingButton: "Fastgør trukket markør til andre elementer", pinningButton: "Sammenlæg delte elementer", rotateButton: "Roter laget" } }, Sr = { tooltips: { placeMarker: "Klikk for å plassere punkt", placeMarkerTouch: "Trykk på kartet for å plassere et punkt", firstVertex: "Klikk for å plassere første punkt", continueLine: "Klikk for å tegne videre", finishLine: "Klikk på et eksisterende punkt for å fullføre", finishPoly: "Klikk første punkt for å fullføre", finishRect: "Klikk for å fullføre", startCircle: "Klikk for å sette sirkel midtpunkt", finishCircle: "Klikk for å fullføre sirkel", placeCircleMarker: "Klikk for å plassere sirkel", placeText: "Klikk for å plassere tekst" }, actions: { finish: "Fullfør", cancel: "Kanseller", removeLastVertex: "Fjern forrige punkt" }, buttonTitles: { drawMarkerButton: "Tegn punkt", drawPolyButton: "Tegn flate", drawLineButton: "Tegn linje", drawCircleButton: "Tegn sirkel", drawRectButton: "Tegn rektangel", editButton: "Rediger objekter", dragButton: "Dra objekter", cutButton: "Kutt objekter", deleteButton: "Fjern objekter", drawCircleMarkerButton: "Tegn sirkel-punkt", snappingButton: "Fest dratt punkt til andre objekter og punkt", pinningButton: "Pin delte punkter sammen", rotateButton: "Rotér objekter", drawTextButton: "Tegn tekst", scaleButton: "Skalér objekter", autoTracingButton: "Automatisk sporing av linje" }, measurements: { totalLength: "Lengde", segmentLength: "Segmentlengde", area: "Område", radius: "Radius", perimeter: "Omriss", height: "Høyde", width: "Bredde", coordinates: "Posisjon", coordinatesMarker: "Posisjonsmarkør" } }, Xn = { tooltips: { placeMarker: "کلیک برای جانمایی نشان", placeMarkerTouch: "روی نقشه ضربه بزنید تا نشان بگذارید", firstVertex: "کلیک برای رسم اولین رأس", continueLine: "کلیک برای ادامه رسم", finishLine: "کلیک روی هر نشان موجود برای پایان", finishPoly: "کلیک روی اولین نشان برای پایان", finishRect: "کلیک برای پایان", startCircle: "کلیک برای رسم مرکز دایره", finishCircle: "کلیک برای پایان رسم دایره", placeCircleMarker: "کلیک برای رسم نشان دایره", placeText: "کلیک برای نوشتن متن" }, actions: { finish: "پایان", cancel: "لفو", removeLastVertex: "حذف آخرین رأس" }, buttonTitles: { drawMarkerButton: "درج نشان", drawPolyButton: "رسم چندضلعی", drawLineButton: "رسم خط", drawCircleButton: "رسم دایره", drawRectButton: "رسم چهارضلعی", editButton: "ویرایش لایه‌ها", dragButton: "جابجایی لایه‌ها", cutButton: "برش لایه‌ها", deleteButton: "حذف لایه‌ها", drawCircleMarkerButton: "رسم نشان دایره", snappingButton: "نشانگر را به لایه‌ها و رئوس دیگر بکشید", pinningButton: "رئوس مشترک را با هم پین کنید", rotateButton: "چرخش لایه", drawTextButton: "رسم متن", scaleButton: "مقیاس‌گذاری", autoTracingButton: "ردیاب خودکار" }, measurements: { totalLength: "طول", segmentLength: "طول بخش", area: "ناحیه", radius: "شعاع", perimeter: "محیط", height: "ارتفاع", width: "عرض", coordinates: "موقعیت", coordinatesMarker: "موقعیت نشان" } }, Ar = { tooltips: { placeMarker: "Натисніть, щоб нанести маркер", placeMarkerTouch: "Торкніться карти, щоб розмістити маркер", firstVertex: "Натисніть, щоб нанести першу вершину", continueLine: "Натисніть, щоб продовжити малювати", finishLine: "Натисніть будь-який існуючий маркер для завершення", finishPoly: "Виберіть перший маркер, щоб завершити", finishRect: "Натисніть, щоб завершити", startCircle: "Натисніть, щоб додати центр кола", finishCircle: "Натисніть, щоб завершити коло", placeCircleMarker: "Натисніть, щоб нанести круговий маркер" }, actions: { finish: "Завершити", cancel: "Відмінити", removeLastVertex: "Видалити попередню вершину" }, buttonTitles: { drawMarkerButton: "Малювати маркер", drawPolyButton: "Малювати полігон", drawLineButton: "Малювати криву", drawCircleButton: "Малювати коло", drawRectButton: "Малювати прямокутник", editButton: "Редагувати шари", dragButton: "Перенести шари", cutButton: "Вирізати шари", deleteButton: "Видалити шари", drawCircleMarkerButton: "Малювати круговий маркер", snappingButton: "Прив’язати перетягнутий маркер до інших шарів та вершин", pinningButton: "Зв'язати спільні вершини разом", rotateButton: "Повернути шар" } }, Tr = { tooltips: { placeMarker: "İşaretçi yerleştirmek için tıklayın", placeMarkerTouch: "İşaretçi yerleştirmek için haritaya dokunun", firstVertex: "İlk tepe noktasını yerleştirmek için tıklayın", continueLine: "Çizime devam etmek için tıklayın", finishLine: "Bitirmek için mevcut herhangi bir işaretçiyi tıklayın", finishPoly: "Bitirmek için ilk işaretçiyi tıklayın", finishRect: "Bitirmek için tıklayın", startCircle: "Daire merkezine yerleştirmek için tıklayın", finishCircle: "Daireyi bitirmek için tıklayın", placeCircleMarker: "Daire işaretçisi yerleştirmek için tıklayın" }, actions: { finish: "Bitir", cancel: "İptal", removeLastVertex: "Son köşeyi kaldır" }, buttonTitles: { drawMarkerButton: "Çizim İşaretçisi", drawPolyButton: "Çokgenler çiz", drawLineButton: "Çoklu çizgi çiz", drawCircleButton: "Çember çiz", drawRectButton: "Dikdörtgen çiz", editButton: "Katmanları düzenle", dragButton: "Katmanları sürükle", cutButton: "Katmanları kes", deleteButton: "Katmanları kaldır", drawCircleMarkerButton: "Daire işaretçisi çiz", snappingButton: "Sürüklenen işaretçiyi diğer katmanlara ve köşelere yapıştır", pinningButton: "Paylaşılan köşeleri birbirine sabitle", rotateButton: "Katmanı döndür" } }, Yn = { tooltips: { placeMarker: "Kliknutím vytvoříte značku", placeMarkerTouch: "Klepnutím na mapu umístíte značku", firstVertex: "Kliknutím vytvoříte první objekt", continueLine: "Kliknutím pokračujte v kreslení", finishLine: "Kliknutí na libovolnou existující značku pro dokončení", finishPoly: "Vyberte první bod pro dokončení", finishRect: "Klikněte pro dokončení", startCircle: "Kliknutím přidejte střed kruhu", finishCircle: "Нажмите, чтобы задать радиус", placeCircleMarker: "Kliknutím nastavte poloměr" }, actions: { finish: "Dokončit", cancel: "Zrušit", removeLastVertex: "Zrušit poslední akci" }, buttonTitles: { drawMarkerButton: "Přidat značku", drawPolyButton: "Nakreslit polygon", drawLineButton: "Nakreslit křivku", drawCircleButton: "Nakreslit kruh", drawRectButton: "Nakreslit obdélník", editButton: "Upravit vrstvu", dragButton: "Přeneste vrstvu", cutButton: "Vyjmout vrstvu", deleteButton: "Smazat vrstvu", drawCircleMarkerButton: "Přidat kruhovou značku", snappingButton: "Navázat tažnou značku k dalším vrstvám a vrcholům", pinningButton: "Spojit společné body dohromady", rotateButton: "Otočte vrstvu" } }, Ia = { tooltips: { placeMarker: "クリックしてマーカーを配置", placeMarkerTouch: "地図をタップしてマーカーを配置", firstVertex: "クリックして最初の頂点を配置", continueLine: "クリックして描画を続ける", finishLine: "任意のマーカーをクリックして終了", finishPoly: "最初のマーカーをクリックして終了", finishRect: "クリックして終了", startCircle: "クリックして円の中心を配置", finishCircle: "クリックして円の描画を終了", placeCircleMarker: "クリックして円マーカーを配置", placeText: "クリックしてテキストを配置" }, actions: { finish: "終了", cancel: "キャンセル", removeLastVertex: "最後の頂点を削除" }, buttonTitles: { drawMarkerButton: "マーカーを描画", drawPolyButton: "ポリゴンを描画", drawLineButton: "折れ線を描画", drawCircleButton: "円を描画", drawRectButton: "矩形を描画", editButton: "レイヤーを編集", dragButton: "レイヤーをドラッグ", cutButton: "レイヤーを切り取り", deleteButton: "レイヤーを削除", drawCircleMarkerButton: "円マーカーを描画", snappingButton: "ドラッグしたマーカーを他のレイヤーや頂点にスナップする", pinningButton: "共有する頂点を同時に動かす", rotateButton: "レイヤーを回転", drawTextButton: "テキストを描画" } }, Dr = { tooltips: { placeMarker: "Klikkaa asettaaksesi merkin", placeMarkerTouch: "Napauta karttaa asettaaksesi merkin", firstVertex: "Klikkaa asettaakseni ensimmäisen osuuden", continueLine: "Klikkaa jatkaaksesi piirtämistä", finishLine: "Klikkaa olemassa olevaa merkkiä lopettaaksesi", finishPoly: "Klikkaa ensimmäistä merkkiä lopettaaksesi", finishRect: "Klikkaa lopettaaksesi", startCircle: "Klikkaa asettaaksesi ympyrän keskipisteen", finishCircle: "Klikkaa lopettaaksesi ympyrän", placeCircleMarker: "Klikkaa asettaaksesi ympyrämerkin", placeText: "Klikkaa asettaaksesi tekstin" }, actions: { finish: "Valmis", cancel: "Peruuta", removeLastVertex: "Poista viimeinen osuus" }, buttonTitles: { drawMarkerButton: "Piirrä merkkejä", drawPolyButton: "Piirrä monikulmioita", drawLineButton: "Piirrä viivoja", drawCircleButton: "Piirrä ympyrä", drawRectButton: "Piirrä neliskulmioita", editButton: "Muokkaa", dragButton: "Siirrä", cutButton: "Leikkaa", deleteButton: "Poista", drawCircleMarkerButton: "Piirrä ympyrämerkki", snappingButton: "Kiinnitä siirrettävä merkki toisiin muotoihin", pinningButton: "Kiinnitä jaetut muodot yhteen", rotateButton: "Käännä", drawTextButton: "Piirrä tekstiä" } }, Ys = { tooltips: { placeMarker: "마커 위치를 클릭하세요", placeMarkerTouch: "지도를 탭하여 마커를 배치하세요", firstVertex: "첫번째 꼭지점 위치을 클릭하세요", continueLine: "계속 그리려면 클릭하세요", finishLine: "끝내려면 기존 마커를 클릭하세요", finishPoly: "끝내려면 처음 마커를 클릭하세요", finishRect: "끝내려면 클릭하세요", startCircle: "원의 중심이 될 위치를 클릭하세요", finishCircle: "원을 끝내려면 클릭하세요", placeCircleMarker: "원 마커 위치를 클릭하세요", placeText: "텍스트 위치를 클릭하세요" }, actions: { finish: "끝내기", cancel: "취소", removeLastVertex: "마지막 꼭지점 제거" }, buttonTitles: { drawMarkerButton: "마커 그리기", drawPolyButton: "다각형 그리기", drawLineButton: "다각선 그리기", drawCircleButton: "원 그리기", drawRectButton: "직사각형 그리기", editButton: "레이어 편집하기", dragButton: "레이어 끌기", cutButton: "레이어 자르기", deleteButton: "레이어 제거하기", drawCircleMarkerButton: "원 마커 그리기", snappingButton: "잡아끈 마커를 다른 레이어 및 꼭지점에 들러붙게 하기", pinningButton: "공유 꼭지점을 함께 찍기", rotateButton: "레이어 회전하기", drawTextButton: "텍스트 그리기" } }, Ht = { tooltips: { placeMarker: "Маркерди жайгаштыруу үчүн басыңыз", placeMarkerTouch: "Маркерди жайгаштыруу үчүн картага тийиңиз", firstVertex: "Биринчи чокуну жайгаштырууну үчүн басыңыз", continueLine: "Сүрөт тартууну улантуу үчүн басыңыз", finishLine: "Аяктоо үчүн учурдагы маркерди басыңыз", finishPoly: "Бүтүрүү үчүн биринчи маркерди басыңыз", finishRect: "Бүтүрүү үчүн басыңыз", startCircle: "Айлананын борборун жайгаштырууну үчүн басыңыз", finishCircle: "Айлананы бүтүрүү үчүн басыңыз", placeCircleMarker: "Тегерек маркерди жайгаштыруу үчүн басыңыз", placeText: "Текстти жайгаштыруу үчүн басыңыз" }, actions: { finish: "Аягы", cancel: "Жок кылуу", removeLastVertex: "Акыркы чокуну өчүрүү" }, buttonTitles: { drawMarkerButton: "Маркерди чизуу", drawPolyButton: "Полигон чизуу", drawLineButton: "Полилиния чизуу", drawCircleButton: "Дайынды чизуу", drawRectButton: "Прямоугольник чизуу", editButton: "Слоопту түзөтүү", dragButton: "Слоопту карап сүйлөү", cutButton: "Слооптун башын кесүү", deleteButton: "Слооптун өчүрүү", drawCircleMarkerButton: "Дайынды маркерди чизуу", snappingButton: "Башка слооптордун жана вертекстердин арасына чекилдөө", pinningButton: "Бөлүшкөн вертекстерди бирге тутуштуруу", rotateButton: "Слооптун өзгөртүү", drawTextButton: "Текст чизуу", scaleButton: "Слооптун өлчөмүн өзгөртүү", autoTracingButton: "Автоматтык тизмеги чизуу" }, measurements: { totalLength: "Узундук", segmentLength: "Сегмент узундугу", area: "Аймак", radius: "Радиус", perimeter: "Периметр", height: "Диаметр", width: "Кенчилик", coordinates: "Координаттар", coordinatesMarker: "Маркердин координаттары" } }, ci = Oi, ue = { en: on, de: ln, it: Er, id: Wt, ro: be, ru: Mr, es: Wn, nl: Qe, fr: Xs, pt: ci, pt_br: we, pt_pt: Oi, zh: Jn, zh_tw: Zi, pl: Mn, sv: Bn, el: Br, hu: Pn, da: Pr, no: Sr, fa: Xn, ua: Ar, tr: Tr, cz: Yn, ja: Ia, fi: Dr, ko: Ys, ky: Ht }, Oa = { _globalEditModeEnabled: !1, enableGlobalEditMode(e) {
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
  } }, Ir = Oa, Or = { _globalDragModeEnabled: !1, enableGlobalDragMode() {
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
  } }, Fr = Or, Hi = { _globalRemovalModeEnabled: !1, enableGlobalRemovalMode() {
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
  } }, Rr = Hi, Sn = { _globalRotateModeEnabled: !1, enableGlobalRotateMode() {
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
  } }, De = Sn, qi = k(qn()), Fa = { _fireDrawStart(e = "Draw", i = {}) {
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
    r = (0, qi.default)(r, o, { source: a }), L.PM.Utils._fireEvent(e, i, r);
  } }, An = Fa, Qs = () => ({ _lastEvents: { keydown: void 0, keyup: void 0, current: void 0 }, _initKeyListener(e) {
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
  } }), Ra = Qs, Qn = k(Ii());
  function ne(e) {
    let i = L.PM.activeLang;
    return (0, Qn.default)(ue[i], e) || (0, Qn.default)(ue.en, e) || e;
  }
  function Na() {
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
  function tr(e) {
    return e.reduce((i, r) => {
      if (r.length !== 0) {
        let a = Array.isArray(r) ? tr(r) : r;
        Array.isArray(a) ? a.length !== 0 && i.push(a) : i.push(a);
      }
      return i;
    }, []);
  }
  function si(e, i, r) {
    let a = { a: L.CRS.Earth.R, b: 63567523142e-4, f: 0.0033528106647474805 }, { a: o, b: u, f } = a, _ = e.lng, b = e.lat, w = r, O = Math.PI, S = i * O / 180, U = Math.sin(S), W = Math.cos(S), lt = (1 - f) * Math.tan(b * O / 180), yt = 1 / Math.sqrt(1 + lt * lt), Ct = lt * yt, Bt = Math.atan2(lt, W), T = yt * U, Q = 1 - T * T, st = Q * (o * o - u * u) / (u * u), xt = 1 + st / 16384 * (4096 + st * (-768 + st * (320 - 175 * st))), bt = st / 1024 * (256 + st * (-128 + st * (74 - 47 * st))), Lt = w / (u * xt), M = 2 * Math.PI, P, A, V;
    for (; Math.abs(Lt - M) > 1e-12; ) {
      P = Math.cos(2 * Bt + Lt), A = Math.sin(Lt), V = Math.cos(Lt);
      let gt = bt * A * (P + bt / 4 * (V * (-1 + 2 * P * P) - bt / 6 * P * (-3 + 4 * A * A) * (-3 + 4 * P * P)));
      M = Lt, Lt = w / (u * xt) + gt;
    }
    let z = Ct * A - yt * V * W, R = Math.atan2(Ct * V + yt * A * W, (1 - f) * Math.sqrt(T * T + z * z)), X = Math.atan2(A * U, yt * V - Ct * A * W), G = f / 16 * Q * (4 + f * (4 - 3 * Q)), J = X - (1 - G) * f * T * (Lt + G * A * (P + G * V * (-1 + 2 * P * P))), it = _ + J * 180 / O, et = R * 180 / O;
    return L.latLng(it, et);
  }
  function un(e, i, r, a, o = !0) {
    let u, f, _, b = [];
    for (let w = 0; w < r; w += 1) {
      if (o) u = w * 360 / r + a, f = si(e, u, i), _ = L.latLng(f.lng, f.lat);
      else {
        let O = e.lat + Math.cos(2 * w * Math.PI / r) * i, S = e.lng + Math.sin(2 * w * Math.PI / r) * i;
        _ = L.latLng(O, S);
      }
      b.push(_);
    }
    return b;
  }
  function za(e, i, r) {
    i = (i + 360) % 360;
    let a = Math.PI / 180, o = 180 / Math.PI, { R: u } = L.CRS.Earth, f = e.lng * a, _ = e.lat * a, b = i * a, w = Math.sin(_), O = Math.cos(_), S = Math.cos(r / u), U = Math.sin(r / u), W = Math.asin(w * S + O * U * Math.cos(b)), lt = f + Math.atan2(Math.sin(b) * U * O, S - w * Math.sin(W));
    lt *= o;
    let yt = lt - 360, Ct = lt < -180 ? lt + 360 : lt;
    return lt = lt > 180 ? yt : Ct, L.latLng([W * o, lt]);
  }
  function Nr(e, i, r) {
    let a = e.latLngToContainerPoint(i), o = e.latLngToContainerPoint(r), u = Math.atan2(o.y - a.y, o.x - a.x) * 180 / Math.PI + 90;
    return u += u < 0 ? 360 : 0, u;
  }
  function hn(e, i, r, a) {
    let o = Nr(e, i, r);
    return za(i, o, a);
  }
  function to(e, i, r = "asc") {
    if (!i || Object.keys(i).length === 0) return (b, w) => b - w;
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
    return (b, w) => {
      let O, S;
      if (O = _(b.layer).toLowerCase(), S = _(w.layer).toLowerCase(), !O || !S) return 0;
      let U = O in f ? f[O] : Number.MAX_SAFE_INTEGER, W = S in f ? f[S] : Number.MAX_SAFE_INTEGER, lt = 0;
      return U < W ? lt = -1 : U > W && (lt = 1), r === "desc" ? lt * -1 : lt;
    };
  }
  function Li(e, i = e.getLatLngs()) {
    return e instanceof L.Polygon ? L.polygon(i).getLatLngs() : L.polyline(i).getLatLngs();
  }
  function ja(e, i) {
    var r, a, o, u;
    if ((a = (r = i.options.crs) == null ? void 0 : r.projection) != null && a.MAX_LATITUDE) {
      let f = (u = (o = i.options.crs) == null ? void 0 : o.projection) == null ? void 0 : u.MAX_LATITUDE;
      e.lat = Math.max(Math.min(f, e.lat), -f);
    }
    return e;
  }
  function cn(e) {
    return e.options.renderer || e._map && (e._map._getPaneRenderer(e.options.pane) || e._map.options.renderer || e._map._renderer) || e._renderer;
  }
  function zr(e, i) {
    if (e = e.trim().toLowerCase(), i[e]) return e;
    let r = e.replace(/[-_\s]/g, "_").match(/^([a-z]{2,3})(?:_([a-z]{2,3}))?$/);
    if (r) {
      let a = [];
      r[2] && a.push(`${r[1]}_${r[2]}`), a.push(r[1]);
      for (let o of a) if (i[o]) return o;
    }
    return e;
  }
  var eo = L.Class.extend({ includes: [Ir, Fr, Rr, De, An], initialize(e) {
    this.map = e, this.Draw = new L.PM.Draw(e), this.Toolbar = new L.PM.Toolbar(e), this.Keyboard = Ra(), this.globalOptions = { snappable: !0, layerGroup: void 0, snappingOrder: ["Marker", "CircleMarker", "Circle", "Line", "Polygon", "Rectangle"], panes: { vertexPane: "markerPane", layerPane: "overlayPane", markerPane: "markerPane" }, draggable: !0, exitModeOnEscape: !1, finishOnEnter: !1 }, this.Keyboard._initKeyListener(e);
  }, setLang(e = "en", i, r = "en") {
    e = zr(e, ue);
    let a = L.PM.activeLang;
    i && (ue[e] = (0, En.default)(ue[r], i)), L.PM.activeLang = e, this.map.pm.Toolbar.reinit(), this._fireLangChange(a, e, r, ue[e]);
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
    let i = (0, En.default)(this.globalOptions, e);
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
    cn(this.map)._onMouseMove(this._createMouseEvent("mousemove", e));
  }, _canvasTouchClick(e) {
    let i = "";
    e.type === "touchstart" || e.type === "pointerdown" ? i = "mousedown" : (e.type === "touchend" || e.type === "pointerup" || e.type === "touchcancel" || e.type === "pointercancel") && (i = "mouseup"), i && cn(this.map)._onClick(this._createMouseEvent(i, e));
  }, _createMouseEvent(e, i) {
    let r, a = i.touches[0] || i.changedTouches[0];
    try {
      r = new MouseEvent(e, { bubbles: i.bubbles, cancelable: i.cancelable, view: i.view, detail: a.detail, screenX: a.screenX, screenY: a.screenY, clientX: a.clientX, clientY: a.clientY, ctrlKey: i.ctrlKey, altKey: i.altKey, shiftKey: i.shiftKey, metaKey: i.metaKey, button: i.button, relatedTarget: i.relatedTarget });
    } catch {
      r = document.createEvent("MouseEvents"), r.initMouseEvent(e, i.bubbles, i.cancelable, i.view, a.detail, a.screenX, a.screenY, a.clientX, a.clientY, i.ctrlKey, i.altKey, i.shiftKey, i.metaKey, i.button, i.relatedTarget);
    }
    return r;
  } }), di = eo, io = L.Control.extend({ includes: [An], options: { position: "topleft", disableByOtherButtons: !0 }, initialize(e) {
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
    let o = L.DomUtil.create("div", `leaflet-pm-actions-container ${i}`, r), u = e.actions, f = { cancel: { text: ne("actions.cancel"), title: ne("actions.cancel"), onClick() {
      this._triggerClick();
    } }, finishMode: { text: ne("actions.finish"), title: ne("actions.finish"), onClick() {
      this._triggerClick();
    } }, removeLastVertex: { text: ne("actions.removeLastVertex"), title: ne("actions.removeLastVertex"), onClick() {
      this._map.pm.Draw[e.jsClass]._removeLastVertex();
    } }, finish: { text: ne("actions.finish"), title: ne("actions.finish"), onClick(b) {
      this._map.pm.Draw[e.jsClass]._finishShape(b);
    } } };
    e._preparedActions = u.map((b) => {
      let w = typeof b == "string" ? b : b.name, O;
      if (f[w]) O = f[w];
      else if (b.text) O = b;
      else return O;
      let S = L.DomUtil.create("a", `leaflet-pm-action ${i} action-${w}`, o);
      if (S.setAttribute("role", "button"), S.setAttribute("tabindex", "0"), S.href = "#", O.title && (S.title = O.title), S.innerHTML = O.text, L.DomEvent.disableClickPropagation(S), L.DomEvent.on(S, "click", L.DomEvent.stop), O._node = S, !e.disabled && O.onClick) {
        let U = (W) => {
          W.preventDefault();
          let lt = "", { buttons: yt } = this._map.pm.Toolbar;
          for (let Ct in yt) if (yt[Ct]._button === e) {
            lt = Ct;
            break;
          }
          this._fireActionClick(O, lt, e);
        };
        L.DomEvent.addListener(S, "click", U, this), L.DomEvent.addListener(S, "click", O.onClick, this), L.DomEvent.addListener(S, "click", () => this._updateActiveAction(e));
      }
      return O;
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
  } }), $a = io;
  L.Control.PMButton = $a;
  var Fi = L.Class.extend({ options: { drawMarker: !0, drawRectangle: !0, drawPolyline: !0, drawPolygon: !0, drawCircle: !0, drawCircleMarker: !0, drawText: !0, editMode: !0, dragMode: !0, cutPolygon: !0, removalMode: !0, rotateMode: !0, snappingOption: !0, drawControls: !0, editControls: !0, optionsControls: !0, customControls: !0, oneBlock: !1, position: "topleft", positions: { draw: "", edit: "", options: "", custom: "" } }, customButtons: [], initialize(e) {
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
    let e = { className: "control-icon leaflet-pm-icon-marker", title: ne("buttonTitles.drawMarkerButton"), jsClass: "Marker", onClick: () => {
    }, afterClick: (U, W) => {
      this.map.pm.Draw[W.button._button.jsClass].toggle();
    }, doToggle: !0, toggleStatus: !1, disableOtherButtons: !0, position: this.options.position, actions: ["cancel"] }, i = { title: ne("buttonTitles.drawPolyButton"), className: "control-icon leaflet-pm-icon-polygon", jsClass: "Polygon", onClick: () => {
    }, afterClick: (U, W) => {
      this.map.pm.Draw[W.button._button.jsClass].toggle();
    }, doToggle: !0, toggleStatus: !1, disableOtherButtons: !0, position: this.options.position, actions: ["finish", "removeLastVertex", "cancel"] }, r = { className: "control-icon leaflet-pm-icon-polyline", title: ne("buttonTitles.drawLineButton"), jsClass: "Line", onClick: () => {
    }, afterClick: (U, W) => {
      this.map.pm.Draw[W.button._button.jsClass].toggle();
    }, doToggle: !0, toggleStatus: !1, disableOtherButtons: !0, position: this.options.position, actions: ["finish", "removeLastVertex", "cancel"] }, a = { title: ne("buttonTitles.drawCircleButton"), className: "control-icon leaflet-pm-icon-circle", jsClass: "Circle", onClick: () => {
    }, afterClick: (U, W) => {
      this.map.pm.Draw[W.button._button.jsClass].toggle();
    }, doToggle: !0, toggleStatus: !1, disableOtherButtons: !0, position: this.options.position, actions: ["cancel"] }, o = { title: ne("buttonTitles.drawCircleMarkerButton"), className: "control-icon leaflet-pm-icon-circle-marker", jsClass: "CircleMarker", onClick: () => {
    }, afterClick: (U, W) => {
      this.map.pm.Draw[W.button._button.jsClass].toggle();
    }, doToggle: !0, toggleStatus: !1, disableOtherButtons: !0, position: this.options.position, actions: ["cancel"] }, u = { title: ne("buttonTitles.drawRectButton"), className: "control-icon leaflet-pm-icon-rectangle", jsClass: "Rectangle", onClick: () => {
    }, afterClick: (U, W) => {
      this.map.pm.Draw[W.button._button.jsClass].toggle();
    }, doToggle: !0, toggleStatus: !1, disableOtherButtons: !0, position: this.options.position, actions: ["cancel"] }, f = { title: ne("buttonTitles.editButton"), className: "control-icon leaflet-pm-icon-edit", onClick: () => {
    }, afterClick: () => {
      this.map.pm.toggleGlobalEditMode();
    }, doToggle: !0, toggleStatus: !1, disableOtherButtons: !0, position: this.options.position, tool: "edit", actions: ["finishMode"] }, _ = { title: ne("buttonTitles.dragButton"), className: "control-icon leaflet-pm-icon-drag", onClick: () => {
    }, afterClick: () => {
      this.map.pm.toggleGlobalDragMode();
    }, doToggle: !0, toggleStatus: !1, disableOtherButtons: !0, position: this.options.position, tool: "edit", actions: ["finishMode"] }, b = { title: ne("buttonTitles.cutButton"), className: "control-icon leaflet-pm-icon-cut", jsClass: "Cut", onClick: () => {
    }, afterClick: (U, W) => {
      this.map.pm.Draw[W.button._button.jsClass].toggle({ snappable: !0, cursorMarker: !0, allowSelfIntersection: !1 });
    }, doToggle: !0, toggleStatus: !1, disableOtherButtons: !0, position: this.options.position, tool: "edit", actions: ["finish", "removeLastVertex", "cancel"] }, w = { title: ne("buttonTitles.deleteButton"), className: "control-icon leaflet-pm-icon-delete", onClick: () => {
    }, afterClick: () => {
      this.map.pm.toggleGlobalRemovalMode();
    }, doToggle: !0, toggleStatus: !1, disableOtherButtons: !0, position: this.options.position, tool: "edit", actions: ["finishMode"] }, O = { title: ne("buttonTitles.rotateButton"), className: "control-icon leaflet-pm-icon-rotate", onClick: () => {
    }, afterClick: () => {
      this.map.pm.toggleGlobalRotateMode();
    }, doToggle: !0, toggleStatus: !1, disableOtherButtons: !0, position: this.options.position, tool: "edit", actions: ["finishMode"] }, S = { className: "control-icon leaflet-pm-icon-text", title: ne("buttonTitles.drawTextButton"), jsClass: "Text", onClick: () => {
    }, afterClick: (U, W) => {
      this.map.pm.Draw[W.button._button.jsClass].toggle();
    }, doToggle: !0, toggleStatus: !1, disableOtherButtons: !0, position: this.options.position, actions: ["cancel"] };
    this._addButton("drawMarker", new L.Control.PMButton(e)), this._addButton("drawPolyline", new L.Control.PMButton(r)), this._addButton("drawRectangle", new L.Control.PMButton(u)), this._addButton("drawPolygon", new L.Control.PMButton(i)), this._addButton("drawCircle", new L.Control.PMButton(a)), this._addButton("drawCircleMarker", new L.Control.PMButton(o)), this._addButton("drawText", new L.Control.PMButton(S)), this._addButton("editMode", new L.Control.PMButton(f)), this._addButton("dragMode", new L.Control.PMButton(_)), this._addButton("cutPolygon", new L.Control.PMButton(b)), this._addButton("removalMode", new L.Control.PMButton(w)), this._addButton("rotateMode", new L.Control.PMButton(O));
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
  } }), Ua = Fi, Va = k(qn()), jr = { _initSnappableMarkers() {
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
    var w, O, S;
    let r = e.target;
    if (r._snapped = !1, this.throttledList || (this.throttledList = L.Util.throttle(this._handleThrottleSnapping, 100, this)), ((w = e == null ? void 0 : e.originalEvent) == null ? void 0 : w.altKey) || ((S = (O = this._map) == null ? void 0 : O.pm) == null ? void 0 : S.Keyboard.isAltKeyPressed())) return !1;
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
      let U = () => {
        this._snapLatLng = f, this._fireSnap(r, b), this._fireSnap(this._layer, b);
      }, W = this._snapLatLng || {}, lt = f || {};
      (W.lat !== lt.lat || W.lng !== lt.lng) && U();
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
      var w;
      if (f._parentCopy && f._parentCopy === this._layer || ((w = f.getLatLngs) == null ? void 0 : w.call(f).flat(5).length) < 2) return;
      let b = this._calcLayerDistances(e, f);
      if (b.distance = Math.floor(b.distance), this.debugIndicatorLines) {
        if (!this.debugIndicatorLines[_]) {
          let O = L.polyline([], { color: "red", pmIgnore: !0 });
          O._pmTempLayer = !0, this.debugIndicatorLines[_] = O;
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
      b.forEach((w, O) => {
        if (Array.isArray(w)) {
          _(w);
          return;
        }
        if (this.options.snapSegment) {
          let S = w, U;
          a ? U = O + 1 === b.length ? 0 : O + 1 : U = O + 1 === b.length ? void 0 : O + 1;
          let W = b[U];
          if (W) {
            let lt = this._getDistanceToSegment(r, e, S, W);
            (u === void 0 || lt < u) && (u = lt, f = [S, W]);
          }
        } else {
          let S = this._getDistance(r, e, w);
          (u === void 0 || S < u) && (u = S, o = w);
        }
      });
    };
    return _(i), this.options.snapSegment ? { latlng: { ...this._getClosestPointOnSegment(r, e, f[0], f[1]) }, segment: f, distance: u } : { latlng: o, distance: u };
  }, _getClosestLayerByPriority(e, i = 1) {
    e = e.sort((f, _) => f._leaflet_id - _._leaflet_id);
    let r = ["Marker", "CircleMarker", "Circle", "Line", "Polygon", "Rectangle"], a = this._map.pm.globalOptions.snappingOrder || [], o = 0, u = {};
    return a.concat(r).forEach((f) => {
      u[f] || (o += 1, u[f] = o);
    }), e.sort(to("instanceofShape", u)), i === 1 ? e[0] || {} : e.slice(0, i);
  }, _checkPrioritiySnapping(e) {
    let i = this._map, r = e.segment[0], a = e.segment[1], o = e.latlng, u = o;
    if (this.options.snapVertex) {
      let f = this._getDistance(i, r, o), _ = this._getDistance(i, a, o), b = f < _ ? r : a, w = f < _ ? f : _;
      if (this.options.snapMiddle) {
        let S = L.PM.Utils.calcMiddleLatLng(i, r, a), U = this._getDistance(i, S, o);
        U < f && U < _ && (b = S, w = U);
      }
      let O = this.options.snapDistance;
      w < O && (u = b);
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
  } }, Ga = jr, Za = L.Class.extend({ includes: [Ga, An], options: { snappable: !0, snapDistance: 20, snapMiddle: !1, allowSelfIntersection: !0, tooltips: !0, templineStyle: {}, hintlineStyle: { color: "#3388ff", dashArray: "5,5" }, pathOptions: null, cursorMarker: !0, finishOn: null, markerStyle: { draggable: !0, icon: L.icon() }, hideMiddleMarkers: !1, minRadiusCircle: null, maxRadiusCircle: null, minRadiusCircleMarker: null, maxRadiusCircleMarker: null, resizeableCircleMarker: !1, resizeableCircle: !0, markerEditable: !0, continueDrawing: !1, snapSegment: !0, requireSnapToFinish: !1, rectangleAngle: 0, textOptions: { text: null, focusAfterDraw: null, removeIfEmpty: null, className: null }, snapVertex: !0 }, setOptions(e) {
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
    i ? this.options.pathOptions = (0, Va.default)(this.options.pathOptions, e) : this.options.pathOptions = e;
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
  } }), Se = Za;
  Se.Marker = Se.extend({ initialize(e) {
    this._map = e, this._shape = "Marker", this.toolbarButtonName = "drawMarker", this._layerIsDragging = !1;
  }, enable(e) {
    L.Util.setOptions(this, e), this._enabled = !0, this._isTouchDevice = !Na(), this._map.getContainer().classList.add("geoman-draw-cursor"), this._map.on("click", this._createMarker, this), this._map.pm.Toolbar.toggleButton(this.toolbarButtonName, !0), this._isTouchDevice ? (this._createTouchHint(), this._hintMarker = L.marker(this._map.getCenter(), { ...this.options.markerStyle, opacity: 0, interactive: !1 }), this._setPane(this._hintMarker, "markerPane"), this._hintMarker._pmTempLayer = !0) : (this._hintMarker = L.marker(this._map.getCenter(), this.options.markerStyle), this._setPane(this._hintMarker, "markerPane"), this._hintMarker._pmTempLayer = !0, this._hintMarker.addTo(this._map), this.options.tooltips && this._hintMarker.bindTooltip(ne("tooltips.placeMarker"), { permanent: !0, offset: L.point(0, 10), direction: "bottom", opacity: 0.8 }).openTooltip(), this._map.on("mousemove", this._syncHintMarker, this)), this._layer = this._hintMarker, this.options.markerEditable && this._map.eachLayer((i) => {
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
    this.options.tooltips && (this._touchHint = L.DomUtil.create("div", "leaflet-pm-touch-hint"), this._touchHint.textContent = ne("tooltips.placeMarkerTouch"), this._map.getContainer().appendChild(this._touchHint));
  }, _removeTouchHint() {
    this._touchHint && this._touchHint.parentNode && (this._touchHint.parentNode.removeChild(this._touchHint), this._touchHint = null);
  } });
  var Je = 63710088e-1, no = { centimeters: Je * 100, centimetres: Je * 100, degrees: 360 / (2 * Math.PI), feet: Je * 3.28084, inches: Je * 39.37, kilometers: Je / 1e3, kilometres: Je / 1e3, meters: Je, metres: Je, miles: Je / 1609.344, millimeters: Je * 1e3, millimetres: Je * 1e3, nauticalmiles: Je / 1852, radians: 1, yards: Je * 1.0936 };
  function fi(e, i, r = {}) {
    let a = { type: "Feature" };
    return (r.id === 0 || r.id) && (a.id = r.id), r.bbox && (a.bbox = r.bbox), a.properties = i || {}, a.geometry = e, a;
  }
  function dn(e, i, r = {}) {
    if (!e) throw new Error("coordinates is required");
    if (!Array.isArray(e)) throw new Error("coordinates must be an Array");
    if (e.length < 2) throw new Error("coordinates must be at least 2 numbers long");
    if (!pn(e[0]) || !pn(e[1])) throw new Error("coordinates must contain numbers");
    return fi({ type: "Point", coordinates: e }, i, r);
  }
  function Tn(e, i, r = {}) {
    if (e.length < 2) throw new Error("coordinates must be an array of two or more positions");
    return fi({ type: "LineString", coordinates: e }, i, r);
  }
  function ti(e, i = {}) {
    let r = { type: "FeatureCollection" };
    return i.id && (r.id = i.id), i.bbox && (r.bbox = i.bbox), r.features = e, r;
  }
  function er(e, i = "kilometers") {
    let r = no[i];
    if (!r) throw new Error(i + " units is invalid");
    return e * r;
  }
  function Ri(e) {
    return e % (2 * Math.PI) * 180 / Math.PI;
  }
  function fn(e) {
    return e % 360 * Math.PI / 180;
  }
  function pn(e) {
    return !isNaN(e) && e !== null && !Array.isArray(e);
  }
  function ei(e) {
    return e !== null && typeof e == "object" && !Array.isArray(e);
  }
  function Ha(e) {
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
          let b = qa(o[f][0], o[f][1], o[f + 1][0], o[f + 1][1], u[_][0], u[_][1], u[_ + 1][0], u[_ + 1][1]);
          b && a.features.push(dn([b[0], b[1]]));
        }
      });
    }), a;
  }
  function qa(e, i, r, a, o, u, f, _) {
    let b, w, O, S, U, W = { x: null, y: null, onLine1: !1, onLine2: !1 };
    return b = (_ - u) * (r - e) - (f - o) * (a - i), b === 0 ? W.x !== null && W.y !== null ? W : !1 : (w = i - u, O = e - o, S = (f - o) * w - (_ - u) * O, U = (r - e) * w - (a - i) * O, w = S / b, O = U / b, W.x = e + w * (r - e), W.y = i + w * (a - i), w >= 0 && w <= 1 && (W.onLine1 = !0), O >= 0 && O <= 1 && (W.onLine2 = !0), W.onLine1 && W.onLine2 ? [W.x, W.y] : !1);
  }
  var ir = Ha;
  Se.Line = Se.extend({ initialize(e) {
    this._map = e, this._shape = "Line", this.toolbarButtonName = "drawPolyline", this._doesSelfIntersect = !1;
  }, enable(e) {
    L.Util.setOptions(this, e), this._enabled = !0, this._markers = [], this._layerGroup = new L.FeatureGroup(), this._layerGroup._pmTempLayer = !0, this._layerGroup.addTo(this._map), this._layer = L.polyline([], { ...this.options.templineStyle, pmIgnore: !1 }), this._setPane(this._layer, "layerPane"), this._layer._pmTempLayer = !0, this._layerGroup.addLayer(this._layer), this._hintline = L.polyline([], this.options.hintlineStyle), this._setPane(this._hintline, "layerPane"), this._hintline._pmTempLayer = !0, this._layerGroup.addLayer(this._hintline), this._hintMarker = L.marker(this._map.getCenter(), { interactive: !1, zIndexOffset: 100, icon: L.divIcon({ className: "marker-icon cursor-marker" }) }), this._setPane(this._hintMarker, "vertexPane"), this._hintMarker._pmTempLayer = !0, this._layerGroup.addLayer(this._hintMarker), this.options.cursorMarker && L.DomUtil.addClass(this._hintMarker._icon, "visible"), this.options.tooltips && this._hintMarker.bindTooltip(ne("tooltips.firstVertex"), { permanent: !0, offset: L.point(0, 10), direction: "bottom", opacity: 0.8 }).openTooltip(), this._map.getContainer().classList.add("geoman-draw-cursor"), this._map.on("click", this._createVertex, this), this.options.finishOn && this.options.finishOn !== "snap" && this._map.on(this.options.finishOn, this._finishShape, this), this.options.finishOn === "dblclick" && (this.tempMapDoubleClickZoomState = this._map.doubleClickZoom._enabled, this.tempMapDoubleClickZoomState && this._map.doubleClickZoom.disable()), this._map.on("mousemove", this._syncHintMarker, this), this._hintMarker.on("move", this._syncHintLine, this), this._map.pm.Toolbar.toggleButton(this.toolbarButtonName, !0), this._otherSnapLayers = [], this.isRed = !1, this._fireDrawStart(), this._setGlobalDrawMode();
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
    return ir(this._layer.toGeoJSON(15)).features.length > 0;
  }, _handleSelfIntersection(e, i) {
    let r = L.polyline(this._layer.getLatLngs());
    e && (i || (i = this._hintMarker.getLatLng()), r.addLatLng(i));
    let a = ir(r.toGeoJSON(15));
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
    e <= 1 ? i = ne("tooltips.continueLine") : i = ne("tooltips.finishLine"), this._hintMarker.setTooltipContent(i);
  }, _change(e) {
    this._fireChange(e, "Draw");
  }, setStyle() {
    var e, i;
    (e = this._layer) == null || e.setStyle(this.options.templineStyle), (i = this._hintline) == null || i.setStyle(this.options.hintlineStyle);
  } }), Se.Polygon = Se.Line.extend({ initialize(e) {
    this._map = e, this._shape = "Polygon", this.toolbarButtonName = "drawPolygon";
  }, enable(e) {
    L.PM.Draw.Line.prototype.enable.call(this, e), this._layer.pm._shape = "Polygon";
  }, _createMarker(e) {
    let i = new L.Marker(e, { draggable: !1, icon: L.divIcon({ className: "marker-icon" }) });
    return this._setPane(i, "vertexPane"), i._pmTempLayer = !0, this._layerGroup.addLayer(i), this._markers.push(i), this._layer.getLatLngs().flat().length === 1 ? (i.on("click", this._finishShape, this), this._tempSnapLayerIndex = this._otherSnapLayers.push(i) - 1, this.options.snappable && this._cleanupSnapping()) : i.on("click", () => 1), i;
  }, _setTooltipText() {
    let { length: e } = this._layer.getLatLngs().flat(), i = "";
    e <= 2 ? i = ne("tooltips.continueLine") : i = ne("tooltips.finishPoly"), this._hintMarker.setTooltipContent(i);
  }, _finishShape() {
    if (!this.options.allowSelfIntersection && (this._handleSelfIntersection(!0, this._layer.getLatLngs()[0]), this._doesSelfIntersect) || this.options.requireSnapToFinish && !this._hintMarker._snapped && !this._isFirstLayer()) return;
    let e = this._layer.getLatLngs();
    if (e.length <= 2) return;
    let i = L.polygon(e, this.options.pathOptions);
    this._setPane(i, "layerPane"), this._finishLayer(i), i.addTo(this._map.pm._getContainingLayer()), this._fireCreate(i), this._cleanupSnapping(), this._otherSnapLayers.splice(this._tempSnapLayerIndex, 1), delete this._tempSnapLayerIndex;
    let r = this._hintMarker.getLatLng();
    this.disable(), this.options.continueDrawing && (this.enable(), this._hintMarker.setLatLng(r));
  } }), Se.Rectangle = Se.extend({ initialize(e) {
    this._map = e, this._shape = "Rectangle", this.toolbarButtonName = "drawRectangle";
  }, enable(e) {
    if (L.Util.setOptions(this, e), this._enabled = !0, this._layerGroup = new L.FeatureGroup(), this._layerGroup._pmTempLayer = !0, this._layerGroup.addTo(this._map), this._layer = L.rectangle([[0, 0], [0, 0]], this.options.pathOptions), this._setPane(this._layer, "layerPane"), this._layer._pmTempLayer = !0, this._startMarker = L.marker(this._map.getCenter(), { icon: L.divIcon({ className: "marker-icon rect-start-marker" }), draggable: !1, zIndexOffset: -100, opacity: this.options.cursorMarker ? 1 : 0 }), this._setPane(this._startMarker, "vertexPane"), this._startMarker._pmTempLayer = !0, this._layerGroup.addLayer(this._startMarker), this._hintMarker = L.marker(this._map.getCenter(), { zIndexOffset: 150, icon: L.divIcon({ className: "marker-icon cursor-marker" }) }), this._setPane(this._hintMarker, "vertexPane"), this._hintMarker._pmTempLayer = !0, this._layerGroup.addLayer(this._hintMarker), this.options.cursorMarker && L.DomUtil.addClass(this._hintMarker._icon, "visible"), this.options.tooltips && this._hintMarker.bindTooltip(ne("tooltips.firstVertex"), { permanent: !0, offset: L.point(0, 10), direction: "bottom", opacity: 0.8 }).openTooltip(), this.options.cursorMarker) {
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
    }), this._map.off("click", this._placeStartingMarkers, this), this._map.on("click", this._finishShape, this), this._hintMarker.setTooltipContent(ne("tooltips.finishRect")), this._setRectangleOrigin();
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
    let e = ja(this._startMarker.getLatLng(), this._map), i = ja(this._hintMarker.getLatLng(), this._map), r = L.PM.Utils._getRotatedRectangle(e, i, this.options.rectangleAngle || 0, this._map);
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
  } }), Se.CircleMarker = Se.extend({ initialize(e) {
    this._map = e, this._shape = "CircleMarker", this.toolbarButtonName = "drawCircleMarker", this._layerIsDragging = !1, this._BaseCircleClass = L.CircleMarker, this._minRadiusOption = "minRadiusCircleMarker", this._maxRadiusOption = "maxRadiusCircleMarker", this._editableOption = "resizeableCircleMarker", this._defaultRadius = 10;
  }, enable(e) {
    if (L.Util.setOptions(this, e), this.options.editable && (this.options.resizeableCircleMarker = this.options.editable, delete this.options.editable), this._enabled = !0, this._map.pm.Toolbar.toggleButton(this.toolbarButtonName, !0), this._map.getContainer().classList.add("geoman-draw-cursor"), this.options[this._editableOption]) {
      let i = {};
      L.extend(i, this.options.templineStyle), i.radius = 0, this._layerGroup = new L.FeatureGroup(), this._layerGroup._pmTempLayer = !0, this._layerGroup.addTo(this._map), this._layer = new this._BaseCircleClass(this._map.getCenter(), i), this._setPane(this._layer, "layerPane"), this._layer._pmTempLayer = !0, this._centerMarker = L.marker(this._map.getCenter(), { icon: L.divIcon({ className: "marker-icon" }), draggable: !1, zIndexOffset: 100 }), this._setPane(this._centerMarker, "vertexPane"), this._centerMarker._pmTempLayer = !0, this._hintMarker = L.marker(this._map.getCenter(), { zIndexOffset: 110, icon: L.divIcon({ className: "marker-icon cursor-marker" }) }), this._setPane(this._hintMarker, "vertexPane"), this._hintMarker._pmTempLayer = !0, this._layerGroup.addLayer(this._hintMarker), this.options.cursorMarker && L.DomUtil.addClass(this._hintMarker._icon, "visible"), this.options.tooltips && this._hintMarker.bindTooltip(ne("tooltips.startCircle"), { permanent: !0, offset: L.point(0, 10), direction: "bottom", opacity: 0.8 }).openTooltip(), this._hintline = L.polyline([], this.options.hintlineStyle), this._setPane(this._hintline, "layerPane"), this._hintline._pmTempLayer = !0, this._layerGroup.addLayer(this._hintline), this._map.on("click", this._placeCenterMarker, this);
    } else this._map.on("click", this._createMarker, this), this._hintMarker = new this._BaseCircleClass(this._map.getCenter(), { radius: this._defaultRadius, ...this.options.templineStyle }), this._setPane(this._hintMarker, "layerPane"), this._hintMarker._pmTempLayer = !0, this._hintMarker.addTo(this._map), this._layer = this._hintMarker, this.options.tooltips && this._hintMarker.bindTooltip(ne("tooltips.placeCircleMarker"), { permanent: !0, offset: L.point(0, 10), direction: "bottom", opacity: 0.8 }).openTooltip();
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
    e && (this._layer.setLatLng(e), this._hintMarker.on("move", this._syncHintLine, this), this._hintMarker.on("move", this._syncCircleRadius, this), this._hintMarker.setTooltipContent(ne("tooltips.finishCircle")), this._fireCenterPlaced(), this._fireChange(this._layer.getLatLng(), "Draw"));
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
      this.options[this._minRadiusOption] && r < this.options[this._minRadiusOption] ? e = hn(this._map, i, e, this._getMinDistanceInMeter()) : this.options[this._maxRadiusOption] && r > this.options[this._maxRadiusOption] && (e = hn(this._map, i, e, this._getMaxDistanceInMeter()));
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
  } }), Se.Circle = Se.CircleMarker.extend({ initialize(e) {
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
  var nr = class {
    constructor(e = [], i = $r) {
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
  function $r(e, i) {
    return e < i ? -1 : e > i ? 1 : 0;
  }
  function Ka(e, i) {
    return e.p.x > i.p.x ? 1 : e.p.x < i.p.x ? -1 : e.p.y !== i.p.y ? e.p.y > i.p.y ? 1 : -1 : 1;
  }
  function ro(e, i) {
    return e.rightSweepEvent.p.x > i.rightSweepEvent.p.x ? 1 : e.rightSweepEvent.p.x < i.rightSweepEvent.p.x ? -1 : e.rightSweepEvent.p.y !== i.rightSweepEvent.p.y ? e.rightSweepEvent.p.y < i.rightSweepEvent.p.y ? 1 : -1 : 1;
  }
  var Ur = class {
    constructor(e, i, r, a) {
      this.p = { x: e[0], y: e[1] }, this.featureId = i, this.ringId = r, this.eventId = a, this.otherEvent = null, this.isLeftEndpoint = null;
    }
    isSamePoint(e) {
      return this.p.x === e.p.x && this.p.y === e.p.y;
    }
  };
  function ao(e, i) {
    if (e.type === "FeatureCollection") {
      let r = e.features;
      for (let a = 0; a < r.length; a++) pi(r[a], i);
    } else pi(e, i);
  }
  var Ge = 0, wi = 0, rr = 0;
  function pi(e, i) {
    let r = e.type === "Feature" ? e.geometry : e, a = r.coordinates;
    (r.type === "Polygon" || r.type === "MultiLineString") && (a = [a]), r.type === "LineString" && (a = [[a]]);
    for (let o = 0; o < a.length; o++) for (let u = 0; u < a[o].length; u++) {
      let f = a[o][u][0], _ = null;
      wi = wi + 1;
      for (let b = 0; b < a[o][u].length - 1; b++) {
        _ = a[o][u][b + 1];
        let w = new Ur(f, Ge, wi, rr), O = new Ur(_, Ge, wi, rr + 1);
        w.otherEvent = O, O.otherEvent = w, Ka(w, O) > 0 ? (O.isLeftEndpoint = !0, w.isLeftEndpoint = !1) : (w.isLeftEndpoint = !0, O.isLeftEndpoint = !1), i.push(w), i.push(O), f = _, rr = rr + 1;
      }
    }
    Ge = Ge + 1;
  }
  var so = class {
    constructor(e) {
      this.leftSweepEvent = e, this.rightSweepEvent = e.otherEvent;
    }
  };
  function _n(e, i) {
    if (e === null || i === null || e.leftSweepEvent.ringId === i.leftSweepEvent.ringId && (e.rightSweepEvent.isSamePoint(i.leftSweepEvent) || e.rightSweepEvent.isSamePoint(i.leftSweepEvent) || e.rightSweepEvent.isSamePoint(i.rightSweepEvent) || e.leftSweepEvent.isSamePoint(i.leftSweepEvent) || e.leftSweepEvent.isSamePoint(i.rightSweepEvent))) return !1;
    let r = e.leftSweepEvent.p.x, a = e.leftSweepEvent.p.y, o = e.rightSweepEvent.p.x, u = e.rightSweepEvent.p.y, f = i.leftSweepEvent.p.x, _ = i.leftSweepEvent.p.y, b = i.rightSweepEvent.p.x, w = i.rightSweepEvent.p.y, O = (w - _) * (o - r) - (b - f) * (u - a), S = (b - f) * (a - _) - (w - _) * (r - f), U = (o - r) * (a - _) - (u - a) * (r - f);
    if (O === 0) return !1;
    let W = S / O, lt = U / O;
    if (W >= 0 && W <= 1 && lt >= 0 && lt <= 1) {
      let yt = r + W * (o - r), Ct = a + W * (u - a);
      return [yt, Ct];
    }
    return !1;
  }
  function oo(e, i) {
    i = i || !1;
    let r = [], a = new nr([], ro);
    for (; e.length; ) {
      let o = e.pop();
      if (o.isLeftEndpoint) {
        let u = new so(o);
        for (let f = 0; f < a.data.length; f++) {
          let _ = a.data[f];
          if (i && _.leftSweepEvent.featureId === o.featureId) continue;
          let b = _n(u, _);
          b !== !1 && r.push(b);
        }
        a.push(u);
      } else o.isLeftEndpoint === !1 && a.pop();
    }
    return r;
  }
  function Dn(e, i) {
    let r = new nr([], Ka);
    return ao(e, r), oo(r, i);
  }
  var Wa = Dn, ar = Wa;
  function Ja(e, i, r = {}) {
    let { removeDuplicates: a = !0, ignoreSelfIntersections: o = !0 } = r, u = [];
    e.type === "FeatureCollection" ? u = u.concat(e.features) : e.type === "Feature" ? u.push(e) : (e.type === "LineString" || e.type === "Polygon" || e.type === "MultiLineString" || e.type === "MultiPolygon") && u.push(fi(e)), i.type === "FeatureCollection" ? u = u.concat(i.features) : i.type === "Feature" ? u.push(i) : (i.type === "LineString" || i.type === "Polygon" || i.type === "MultiLineString" || i.type === "MultiPolygon") && u.push(fi(i));
    let f = ar(ti(u), o), _ = [];
    if (a) {
      let b = {};
      f.forEach((w) => {
        let O = w.join(",");
        b[O] || (b[O] = !0, _.push(w));
      });
    } else _ = f;
    return ti(_.map((b) => dn(b)));
  }
  var ii = Ja, sr = k(oe(), 1);
  function Vr(e, i, r) {
    if (e !== null) for (var a, o, u, f, _, b, w, O = 0, S = 0, U, W = e.type, lt = W === "FeatureCollection", yt = W === "Feature", Ct = lt ? e.features.length : 1, Bt = 0; Bt < Ct; Bt++) {
      w = lt ? e.features[Bt].geometry : yt ? e.geometry : e, U = w ? w.type === "GeometryCollection" : !1, _ = U ? w.geometries.length : 1;
      for (var T = 0; T < _; T++) {
        var Q = 0, st = 0;
        if (f = U ? w.geometries[T] : w, f !== null) {
          b = f.coordinates;
          var xt = f.type;
          switch (O = 0, xt) {
            case null:
              break;
            case "Point":
              if (i(b, S, Bt, Q, st) === !1) return !1;
              S++, Q++;
              break;
            case "LineString":
            case "MultiPoint":
              for (a = 0; a < b.length; a++) {
                if (i(b[a], S, Bt, Q, st) === !1) return !1;
                S++, xt === "MultiPoint" && Q++;
              }
              xt === "LineString" && Q++;
              break;
            case "Polygon":
            case "MultiLineString":
              for (a = 0; a < b.length; a++) {
                for (o = 0; o < b[a].length - O; o++) {
                  if (i(b[a][o], S, Bt, Q, st) === !1) return !1;
                  S++;
                }
                xt === "MultiLineString" && Q++, xt === "Polygon" && st++;
              }
              xt === "Polygon" && Q++;
              break;
            case "MultiPolygon":
              for (a = 0; a < b.length; a++) {
                for (st = 0, o = 0; o < b[a].length; o++) {
                  for (u = 0; u < b[a][o].length - O; u++) {
                    if (i(b[a][o][u], S, Bt, Q, st) === !1) return !1;
                    S++;
                  }
                  st++;
                }
                Q++;
              }
              break;
            case "GeometryCollection":
              for (a = 0; a < f.geometries.length; a++) if (Vr(f.geometries[a], i) === !1) return !1;
              break;
            default:
              throw new Error("Unknown Geometry Type");
          }
        }
      }
    }
  }
  function gn(e, i) {
    if (e.type === "Feature") i(e, 0);
    else if (e.type === "FeatureCollection") for (var r = 0; r < e.features.length && i(e.features[r], r) !== !1; r++) ;
  }
  function lo(e, i, r) {
    var a = r;
    return gn(e, function(o, u) {
      u === 0 && r === void 0 ? a = o : a = i(a, o, u);
    }), a;
  }
  function Ci(e, i) {
    var r, a, o, u, f, _, b, w, O, S, U = 0, W = e.type === "FeatureCollection", lt = e.type === "Feature", yt = W ? e.features.length : 1;
    for (r = 0; r < yt; r++) {
      for (_ = W ? e.features[r].geometry : lt ? e.geometry : e, w = W ? e.features[r].properties : lt ? e.properties : {}, O = W ? e.features[r].bbox : lt ? e.bbox : void 0, S = W ? e.features[r].id : lt ? e.id : void 0, b = _ ? _.type === "GeometryCollection" : !1, f = b ? _.geometries.length : 1, o = 0; o < f; o++) {
        if (u = b ? _.geometries[o] : _, u === null) {
          if (i(null, U, w, O, S) === !1) return !1;
          continue;
        }
        switch (u.type) {
          case "Point":
          case "LineString":
          case "MultiPoint":
          case "Polygon":
          case "MultiLineString":
          case "MultiPolygon": {
            if (i(u, U, w, O, S) === !1) return !1;
            break;
          }
          case "GeometryCollection": {
            for (a = 0; a < u.geometries.length; a++) if (i(u.geometries[a], U, w, O, S) === !1) return !1;
            break;
          }
          default:
            throw new Error("Unknown Geometry Type");
        }
      }
      U++;
    }
  }
  function Gr(e, i) {
    Ci(e, function(r, a, o, u, f) {
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
      for (var w = 0; w < r.coordinates.length; w++) {
        var O = r.coordinates[w], S = { type: b, coordinates: O };
        if (i(fi(S, o), a, w) === !1) return !1;
      }
    });
  }
  function ze(e, i = {}) {
    if (e.bbox != null && i.recompute !== !0) return e.bbox;
    let r = [1 / 0, 1 / 0, -1 / 0, -1 / 0];
    return Vr(e, (a) => {
      r[0] > a[0] && (r[0] = a[0]), r[1] > a[1] && (r[1] = a[1]), r[2] < a[0] && (r[2] = a[0]), r[3] < a[1] && (r[3] = a[1]);
    }), r;
  }
  function Zr(e) {
    var i;
    if (e.bbox) i = e.bbox;
    else if (Array.isArray(e) && e.length === 4) i = e;
    else if (Array.isArray(e) && e.length === 6) i = [e[0], e[1], e[3], e[4]];
    else if (e.type === "Feature") i = ze(e);
    else if (e.type === "FeatureCollection") i = ze(e);
    else throw new Error("invalid geojson");
    return { minX: i[0], minY: i[1], maxX: i[2], maxY: i[3] };
  }
  var ki = class {
    constructor(e = 9) {
      this.tree = new sr.default(e), this.tree.toBBox = Zr;
    }
    insert(e) {
      if (e.type !== "Feature") throw new Error("invalid feature");
      return e.bbox = e.bbox ? e.bbox : ze(e), this.tree.insert(e), this;
    }
    load(e) {
      var i = [];
      return Array.isArray(e) ? e.forEach(function(r) {
        if (r.type !== "Feature") throw new Error("invalid features");
        r.bbox = r.bbox ? r.bbox : ze(r), i.push(r);
      }) : gn(e, function(r) {
        if (r.type !== "Feature") throw new Error("invalid features");
        r.bbox = r.bbox ? r.bbox : ze(r), i.push(r);
      }), this.tree.load(i), this;
    }
    remove(e, i) {
      if (e.type !== "Feature") throw new Error("invalid feature");
      return e.bbox = e.bbox ? e.bbox : ze(e), this.tree.remove(e, i), this;
    }
    clear() {
      return this.tree.clear(), this;
    }
    search(e) {
      var i = this.tree.search(Zr(e));
      return ti(i);
    }
    collides(e) {
      return this.tree.collides(Zr(e));
    }
    all() {
      let e = this.tree.all();
      return ti(e);
    }
    toJSON() {
      return this.tree.toJSON();
    }
    fromJSON(e) {
      return this.tree.fromJSON(e), this;
    }
  };
  function In(e) {
    return new ki(e);
  }
  function Xa(e, i) {
    if (i = i ?? {}, !ei(i)) throw new Error("options is invalid");
    var r = i.precision, a = i.coordinates, o = i.mutate;
    if (r = r == null || isNaN(r) ? 6 : r, a = a == null || isNaN(a) ? 3 : a, !e) throw new Error("<geojson> is required");
    if (typeof r != "number") throw new Error("<precision> must be a number");
    if (typeof a != "number") throw new Error("<coordinates> must be a number");
    (o === !1 || o === void 0) && (e = JSON.parse(JSON.stringify(e)));
    var u = Math.pow(10, r);
    return Vr(e, function(f) {
      Hr(f, u, a);
    }), e;
  }
  function Hr(e, i, r) {
    e.length > r && e.splice(r, e.length);
    for (var a = 0; a < e.length; a++) e[a] = Math.round(e[a] * i) / i;
    return e;
  }
  function Xe(e) {
    if (!e) throw new Error("coord is required");
    if (!Array.isArray(e)) {
      if (e.type === "Feature" && e.geometry !== null && e.geometry.type === "Point") return [...e.geometry.coordinates];
      if (e.type === "Point") return [...e.coordinates];
    }
    if (Array.isArray(e) && e.length >= 2 && !Array.isArray(e[0]) && !Array.isArray(e[1])) return [...e];
    throw new Error("coord must be GeoJSON Point or an Array of numbers");
  }
  function Ei(e) {
    if (Array.isArray(e)) return e;
    if (e.type === "Feature") {
      if (e.geometry !== null) return e.geometry.coordinates;
    } else if (e.coordinates) return e.coordinates;
    throw new Error("coords must be GeoJSON Feature, Geometry Object or an Array");
  }
  function Ki(e) {
    return e.type === "Feature" ? e.geometry : e;
  }
  function Wi(e, i) {
    return e.type === "FeatureCollection" ? "FeatureCollection" : e.type === "GeometryCollection" ? "GeometryCollection" : e.type === "Feature" && e.geometry !== null ? e.geometry.type : e.type;
  }
  function or(e) {
    if (!e) throw new Error("geojson is required");
    let i = [];
    return Gr(e, (r) => {
      qr(r, i);
    }), ti(i);
  }
  function qr(e, i) {
    let r = [], a = e.geometry;
    if (a !== null) {
      switch (a.type) {
        case "Polygon":
          r = Ei(a);
          break;
        case "LineString":
          r = [Ei(a)];
      }
      r.forEach((o) => {
        Ya(o, e.properties).forEach((u) => {
          u.id = i.length, i.push(u);
        });
      });
    }
  }
  function Ya(e, i) {
    let r = [];
    return e.reduce((a, o) => {
      let u = Tn([a, o], i);
      return u.bbox = uo(a, o), r.push(u), o;
    }), r;
  }
  function uo(e, i) {
    let r = e[0], a = e[1], o = i[0], u = i[1], f = r < o ? r : o, _ = a < u ? a : u, b = r > o ? r : o, w = a > u ? a : u;
    return [f, _, b, w];
  }
  function mn(e, i, r = {}) {
    var a = Xe(e), o = Xe(i), u = fn(o[1] - a[1]), f = fn(o[0] - a[0]), _ = fn(a[1]), b = fn(o[1]), w = Math.pow(Math.sin(u / 2), 2) + Math.pow(Math.sin(f / 2), 2) * Math.cos(_) * Math.cos(b);
    return er(2 * Math.atan2(Math.sqrt(w), Math.sqrt(1 - w)), r.units);
  }
  var ho = Object.defineProperty, Qa = Object.defineProperties, co = Object.getOwnPropertyDescriptors, Kr = Object.getOwnPropertySymbols, fo = Object.prototype.hasOwnProperty, _i = Object.prototype.propertyIsEnumerable, On = (e, i, r) => i in e ? ho(e, i, { enumerable: !0, configurable: !0, writable: !0, value: r }) : e[i] = r, po = (e, i) => {
    for (var r in i || (i = {})) fo.call(i, r) && On(e, r, i[r]);
    if (Kr) for (var r of Kr(i)) _i.call(i, r) && On(e, r, i[r]);
    return e;
  }, lr = (e, i) => Qa(e, co(i));
  function _o(e, i, r = {}) {
    if (!e || !i) throw new Error("lines and inputPoint are required arguments");
    let a = Xe(i), o = dn([1 / 0, 1 / 0], { lineStringIndex: -1, segmentIndex: -1, totalDistance: -1, lineDistance: -1, segmentDistance: -1, pointDistance: 1 / 0, multiFeatureIndex: -1, index: -1, location: -1, dist: 1 / 0 }), u = 0, f = 0, _ = -1;
    return Gr(e, function(b, w, O) {
      _ !== O && (_ = O, f = 0);
      let S = Ei(b);
      for (let U = 0; U < S.length - 1; U++) {
        let W = dn(S[U]), lt = Xe(W), yt = dn(S[U + 1]), Ct = Xe(yt), Bt = mn(W, yt, r), T, Q;
        Ct[0] === a[0] && Ct[1] === a[1] ? [T, Q] = [Ct, !0] : lt[0] === a[0] && lt[1] === a[1] ? [T, Q] = [lt, !1] : [T, Q] = is(lt, Ct, a);
        let st = mn(i, T, r);
        if (st < o.properties.pointDistance) {
          let xt = mn(W, T, r);
          o = dn(T, { lineStringIndex: O, segmentIndex: Q ? U + 1 : U, totalDistance: u + xt, lineDistance: f + xt, segmentDistance: xt, pointDistance: st, multiFeatureIndex: -1, index: -1, location: -1, dist: 1 / 0 }), o.properties = lr(po({}, o.properties), { multiFeatureIndex: o.properties.lineStringIndex, index: o.properties.segmentIndex, location: o.properties.totalDistance, dist: o.properties.pointDistance });
        }
        u += Bt, f += Bt;
      }
    }), o;
  }
  function Ni(e, i) {
    let [r, a, o] = e, [u, f, _] = i;
    return r * u + a * f + o * _;
  }
  function Fn(e, i) {
    let [r, a, o] = e, [u, f, _] = i;
    return [a * _ - o * f, o * u - r * _, r * f - a * u];
  }
  function Rn(e) {
    return Math.sqrt(Math.pow(e[0], 2) + Math.pow(e[1], 2) + Math.pow(e[2], 2));
  }
  function ts(e) {
    let i = Rn(e);
    return [e[0] / i, e[1] / i, e[2] / i];
  }
  function zi(e) {
    let i = fn(e[1]), r = fn(e[0]);
    return [Math.cos(i) * Math.cos(r), Math.cos(i) * Math.sin(r), Math.sin(i)];
  }
  function es(e) {
    let [i, r, a] = e, o = Math.min(Math.max(a, -1), 1), u = Ri(Math.asin(o));
    return [Ri(Math.atan2(r, i)), u];
  }
  function is(e, i, r) {
    let a = zi(e), o = zi(i), u = zi(r), f = Fn(a, o);
    if (f[0] === 0 && f[1] === 0 && f[2] === 0) return Ni(a, o) > 0 ? [[...i], !0] : [[...r], !1];
    let _ = Fn(f, u);
    if (_[0] === 0 && _[1] === 0 && _[2] === 0) return [[...i], !0];
    let b = Fn(_, f), w = ts(b), O = [-w[0], -w[1], -w[2]], S = Ni(u, w) > Ni(u, O) ? w : O, U = ts(f), W = Ni(Fn(a, S), U), lt = Ni(Fn(S, o), U);
    return W >= 0 && lt >= 0 ? [es(S), !1] : Ni(a, u) > Ni(o, u) ? [[...e], !1] : [[...i], !0];
  }
  function ns(e, i) {
    if (!e) throw new Error("line is required");
    if (!i) throw new Error("splitter is required");
    let r = Wi(e), a = Wi(i);
    if (r !== "LineString") throw new Error("line must be LineString");
    if (a === "FeatureCollection") throw new Error("splitter cannot be a FeatureCollection");
    if (a === "GeometryCollection") throw new Error("splitter cannot be a GeometryCollection");
    var o = Xa(i, { precision: 7 });
    switch (e.type !== "Feature" && (e = fi(e)), a) {
      case "Point":
        return ur(e, o);
      case "MultiPoint":
        return gi(e, o);
      case "LineString":
      case "MultiLineString":
      case "Polygon":
      case "MultiPolygon":
        return gi(e, Ja(e, o, { ignoreSelfIntersections: !0 }));
    }
  }
  function gi(e, i) {
    var r = [], a = In();
    return Gr(i, function(o) {
      if (r.forEach(function(_, b) {
        _.id = b;
      }), !r.length) r = ur(e, o).features, a.load(ti(r));
      else {
        var u = a.search(o);
        if (u.features.length) {
          var f = Wr(o, u);
          r = r.filter(function(_) {
            return _.id !== f.id;
          }), a.remove(f), gn(ur(f, o), function(_) {
            r.push(_), a.insert(_);
          });
        }
      }
    }), ti(r);
  }
  function ur(e, i) {
    var r = [], a = Ei(e)[0], o = Ei(e)[e.geometry.coordinates.length - 1];
    if (Ji(a, Xe(i)) || Ji(o, Xe(i))) return ti([e]);
    var u = In(), f = or(e);
    u.load(f);
    var _ = u.search(i);
    if (!_.features.length) return ti([e]);
    var b = Wr(i, _), w = [a], O = lo(f, function(S, U, W) {
      var lt = Ei(U)[1], yt = Xe(i);
      return W === b.id ? (S.push(yt), r.push(Tn(S)), Ji(yt, lt) ? [yt] : [yt, lt]) : (S.push(lt), S);
    }, w);
    return O.length > 1 && r.push(Tn(O)), ti(r);
  }
  function Wr(e, i) {
    if (!i.features.length) throw new Error("lines must contain features");
    if (i.features.length === 1) return i.features[0];
    var r, a = 1 / 0;
    return gn(i, function(o) {
      var u = _o(o, e), f = u.properties.dist;
      f < a && (r = o, a = f);
    }), r;
  }
  function Ji(e, i) {
    return e[0] === i[0] && e[1] === i[1];
  }
  var go = ns, ni = 11102230246251565e-32, Ce = 134217729, rs = (3 + 8 * ni) * ni;
  function hr(e, i, r, a, o) {
    let u, f, _, b, w = i[0], O = a[0], S = 0, U = 0;
    O > w == O > -w ? (u = w, w = i[++S]) : (u = O, O = a[++U]);
    let W = 0;
    if (S < e && U < r) for (O > w == O > -w ? (f = w + u, _ = u - (f - w), w = i[++S]) : (f = O + u, _ = u - (f - O), O = a[++U]), u = f, _ !== 0 && (o[W++] = _); S < e && U < r; ) O > w == O > -w ? (f = u + w, b = f - u, _ = u - (f - b) + (w - b), w = i[++S]) : (f = u + O, b = f - u, _ = u - (f - b) + (O - b), O = a[++U]), u = f, _ !== 0 && (o[W++] = _);
    for (; S < e; ) f = u + w, b = f - u, _ = u - (f - b) + (w - b), w = i[++S], u = f, _ !== 0 && (o[W++] = _);
    for (; U < r; ) f = u + O, b = f - u, _ = u - (f - b) + (O - b), O = a[++U], u = f, _ !== 0 && (o[W++] = _);
    return (u !== 0 || W === 0) && (o[W++] = u), W;
  }
  function mo(e, i) {
    let r = i[0];
    for (let a = 1; a < e; a++) r += i[a];
    return r;
  }
  function yn(e) {
    return new Float64Array(e);
  }
  var as = (3 + 16 * ni) * ni, ss = (2 + 12 * ni) * ni, os = (9 + 64 * ni) * ni * ni, Xi = yn(4), ls = yn(8), Jr = yn(12), Xr = yn(16), je = yn(4);
  function t(e, i, r, a, o, u, f) {
    let _, b, w, O, S, U, W, lt, yt, Ct, Bt, T, Q, st, xt, bt, Lt, M, P = e - o, A = r - o, V = i - u, z = a - u;
    st = P * z, U = Ce * P, W = U - (U - P), lt = P - W, U = Ce * z, yt = U - (U - z), Ct = z - yt, xt = lt * Ct - (st - W * yt - lt * yt - W * Ct), bt = V * A, U = Ce * V, W = U - (U - V), lt = V - W, U = Ce * A, yt = U - (U - A), Ct = A - yt, Lt = lt * Ct - (bt - W * yt - lt * yt - W * Ct), Bt = xt - Lt, S = xt - Bt, Xi[0] = xt - (Bt + S) + (S - Lt), T = st + Bt, S = T - st, Q = st - (T - S) + (Bt - S), Bt = Q - bt, S = Q - Bt, Xi[1] = Q - (Bt + S) + (S - bt), M = T + Bt, S = M - T, Xi[2] = T - (M - S) + (Bt - S), Xi[3] = M;
    let R = mo(4, Xi), X = ss * f;
    if (R >= X || -R >= X || (S = e - P, _ = e - (P + S) + (S - o), S = r - A, w = r - (A + S) + (S - o), S = i - V, b = i - (V + S) + (S - u), S = a - z, O = a - (z + S) + (S - u), _ === 0 && b === 0 && w === 0 && O === 0) || (X = os * f + rs * Math.abs(R), R += P * O + z * _ - (V * w + A * b), R >= X || -R >= X)) return R;
    st = _ * z, U = Ce * _, W = U - (U - _), lt = _ - W, U = Ce * z, yt = U - (U - z), Ct = z - yt, xt = lt * Ct - (st - W * yt - lt * yt - W * Ct), bt = b * A, U = Ce * b, W = U - (U - b), lt = b - W, U = Ce * A, yt = U - (U - A), Ct = A - yt, Lt = lt * Ct - (bt - W * yt - lt * yt - W * Ct), Bt = xt - Lt, S = xt - Bt, je[0] = xt - (Bt + S) + (S - Lt), T = st + Bt, S = T - st, Q = st - (T - S) + (Bt - S), Bt = Q - bt, S = Q - Bt, je[1] = Q - (Bt + S) + (S - bt), M = T + Bt, S = M - T, je[2] = T - (M - S) + (Bt - S), je[3] = M;
    let G = hr(4, Xi, 4, je, ls);
    st = P * O, U = Ce * P, W = U - (U - P), lt = P - W, U = Ce * O, yt = U - (U - O), Ct = O - yt, xt = lt * Ct - (st - W * yt - lt * yt - W * Ct), bt = V * w, U = Ce * V, W = U - (U - V), lt = V - W, U = Ce * w, yt = U - (U - w), Ct = w - yt, Lt = lt * Ct - (bt - W * yt - lt * yt - W * Ct), Bt = xt - Lt, S = xt - Bt, je[0] = xt - (Bt + S) + (S - Lt), T = st + Bt, S = T - st, Q = st - (T - S) + (Bt - S), Bt = Q - bt, S = Q - Bt, je[1] = Q - (Bt + S) + (S - bt), M = T + Bt, S = M - T, je[2] = T - (M - S) + (Bt - S), je[3] = M;
    let J = hr(G, ls, 4, je, Jr);
    st = _ * O, U = Ce * _, W = U - (U - _), lt = _ - W, U = Ce * O, yt = U - (U - O), Ct = O - yt, xt = lt * Ct - (st - W * yt - lt * yt - W * Ct), bt = b * w, U = Ce * b, W = U - (U - b), lt = b - W, U = Ce * w, yt = U - (U - w), Ct = w - yt, Lt = lt * Ct - (bt - W * yt - lt * yt - W * Ct), Bt = xt - Lt, S = xt - Bt, je[0] = xt - (Bt + S) + (S - Lt), T = st + Bt, S = T - st, Q = st - (T - S) + (Bt - S), Bt = Q - bt, S = Q - Bt, je[1] = Q - (Bt + S) + (S - bt), M = T + Bt, S = M - T, je[2] = T - (M - S) + (Bt - S), je[3] = M;
    let it = hr(J, Jr, 4, je, Xr);
    return Xr[it - 1];
  }
  function n(e, i, r, a, o, u) {
    let f = (i - u) * (r - o), _ = (e - o) * (a - u), b = f - _, w = Math.abs(f + _);
    return Math.abs(b) >= as * w ? b : -t(e, i, r, a, o, u, w);
  }
  function s(e, i) {
    var r, a, o = 0, u, f, _, b, w, O, S, U = e[0], W = e[1], lt = i.length;
    for (r = 0; r < lt; r++) {
      a = 0;
      var yt = i[r], Ct = yt.length - 1;
      if (O = yt[0], O[0] !== yt[Ct][0] && O[1] !== yt[Ct][1]) throw new Error("First and last coordinates in a ring must be the same");
      for (f = O[0] - U, _ = O[1] - W, a; a < Ct; a++) {
        if (S = yt[a + 1], b = S[0] - U, w = S[1] - W, _ === 0 && w === 0) {
          if (b <= 0 && f >= 0 || f <= 0 && b >= 0) return 0;
        } else if (w >= 0 && _ <= 0 || w <= 0 && _ >= 0) {
          if (u = n(f, b, _, w, 0, 0), u === 0) return 0;
          (u > 0 && w > 0 && _ <= 0 || u < 0 && w <= 0 && _ > 0) && o++;
        }
        O = S, _ = w, f = b;
      }
    }
    return o % 2 !== 0;
  }
  function c(e, i, r = {}) {
    if (!e) throw new Error("point is required");
    if (!i) throw new Error("polygon is required");
    let a = Xe(e), o = Ki(i), u = o.type, f = i.bbox, _ = o.coordinates;
    if (f && g(a, f) === !1) return !1;
    u === "Polygon" && (_ = [_]);
    let b = !1;
    for (var w = 0; w < _.length; ++w) {
      let O = s(a, _[w]);
      if (O === 0) return !r.ignoreBoundary;
      O && (b = !0);
    }
    return b;
  }
  function g(e, i) {
    return i[0] <= e[0] && i[1] <= e[1] && i[2] >= e[0] && i[3] >= e[1];
  }
  function E(e, i, r = {}) {
    let a = Xe(e), o = Ei(i);
    for (let u = 0; u < o.length - 1; u++) {
      let f = !1;
      if (r.ignoreEndVertices && (u === 0 && (f = "start"), u === o.length - 2 && (f = "end"), u === 0 && u + 1 === o.length - 1 && (f = "both")), N(o[u], o[u + 1], a, f, typeof r.epsilon > "u" ? null : r.epsilon)) return !0;
    }
    return !1;
  }
  function N(e, i, r, a, o) {
    let u = r[0], f = r[1], _ = e[0], b = e[1], w = i[0], O = i[1], S = r[0] - _, U = r[1] - b, W = w - _, lt = O - b, yt = S * lt - U * W;
    if (o !== null) {
      if (Math.abs(yt) > o) return !1;
    } else if (yt !== 0) return !1;
    if (Math.abs(W) === Math.abs(lt) && Math.abs(W) === 0) return a ? !1 : r[0] === e[0] && r[1] === e[1];
    if (a) {
      if (a === "start") return Math.abs(W) >= Math.abs(lt) ? W > 0 ? _ < u && u <= w : w <= u && u < _ : lt > 0 ? b < f && f <= O : O <= f && f < b;
      if (a === "end") return Math.abs(W) >= Math.abs(lt) ? W > 0 ? _ <= u && u < w : w < u && u <= _ : lt > 0 ? b <= f && f < O : O < f && f <= b;
      if (a === "both") return Math.abs(W) >= Math.abs(lt) ? W > 0 ? _ < u && u < w : w < u && u < _ : lt > 0 ? b < f && f < O : O < f && f < b;
    } else return Math.abs(W) >= Math.abs(lt) ? W > 0 ? _ <= u && u <= w : w <= u && u <= _ : lt > 0 ? b <= f && f <= O : O <= f && f <= b;
    return !1;
  }
  function tt(e, i) {
    let r = Ki(e), a = Ki(i), o = r.type, u = a.type, f = r.coordinates, _ = a.coordinates;
    switch (o) {
      case "Point":
        if (u === "Point") return Yr(f, _);
        throw new Error("feature2 " + u + " geometry not supported");
      case "MultiPoint":
        switch (u) {
          case "Point":
            return Pt(r, a);
          case "MultiPoint":
            return zt(r, a);
          default:
            throw new Error("feature2 " + u + " geometry not supported");
        }
      case "LineString":
        switch (u) {
          case "Point":
            return E(a, r, { ignoreEndVertices: !0 });
          case "LineString":
            return Ae(r, a);
          case "MultiPoint":
            return Qt(r, a);
          default:
            throw new Error("feature2 " + u + " geometry not supported");
        }
      case "Polygon":
        switch (u) {
          case "Point":
            return c(a, r, { ignoreBoundary: !0 });
          case "LineString":
            return Ze(r, a);
          case "Polygon":
            return ji(r, a);
          case "MultiPoint":
            return $e(r, a);
          case "MultiPolygon":
            return mt(r, a);
          default:
            throw new Error("feature2 " + u + " geometry not supported");
        }
      case "MultiPolygon":
        if (u === "Polygon") return at(r, a);
        throw new Error("feature2 " + u + " geometry not supported");
      default:
        throw new Error("feature1 " + o + " geometry not supported");
    }
  }
  function at(e, i) {
    return e.coordinates.some((r) => ji({ type: "Polygon", coordinates: r }, i));
  }
  function mt(e, i) {
    return i.coordinates.every((r) => ji(e, { type: "Polygon", coordinates: r }));
  }
  function Pt(e, i) {
    let r, a = !1;
    for (r = 0; r < e.coordinates.length; r++) if (Yr(e.coordinates[r], i.coordinates)) {
      a = !0;
      break;
    }
    return a;
  }
  function zt(e, i) {
    for (let r of i.coordinates) {
      let a = !1;
      for (let o of e.coordinates) if (Yr(r, o)) {
        a = !0;
        break;
      }
      if (!a) return !1;
    }
    return !0;
  }
  function Qt(e, i) {
    let r = !1;
    for (let a of i.coordinates) if (E(a, e, { ignoreEndVertices: !0 }) && (r = !0), !E(a, e)) return !1;
    return !!r;
  }
  function $e(e, i) {
    for (let r of i.coordinates) if (!c(r, e, { ignoreBoundary: !0 })) return !1;
    return !0;
  }
  function Ae(e, i) {
    let r = !1;
    for (let a of i.coordinates) if (E({ type: "Point", coordinates: a }, e, { ignoreEndVertices: !0 }) && (r = !0), !E({ type: "Point", coordinates: a }, e, { ignoreEndVertices: !1 })) return !1;
    return r;
  }
  function ri(e, i) {
    let r = e.coordinates, a = [];
    for (let o = 0; o < r.length - 1; o++) {
      let u = Tn([r[o], r[o + 1]]), f = ns(u, fi(i));
      f.features.length === 0 ? a.push(u) : a.push(...f.features);
    }
    return ti(a);
  }
  function Ze(e, i) {
    let r = ze(e), a = ze(i);
    if (!us(r, a)) return !1;
    for (let f of i.coordinates) if (!c(f, e)) return !1;
    let o = !1, u = ri(i, e);
    for (let f of u.features) {
      let _ = yo(f.geometry.coordinates[0], f.geometry.coordinates[1]);
      if (!c(_, e)) return !1;
      !o && c(_, e, { ignoreBoundary: !0 }) && (o = !0);
    }
    return o;
  }
  function ji(e, i) {
    if (e.type === "Feature" && e.geometry === null || i.type === "Feature" && i.geometry === null) return !1;
    let r = ze(e), a = ze(i);
    if (!us(r, a)) return !1;
    let o = Ki(i).coordinates;
    for (let u of o) for (let f of u) if (!c(f, e)) return !1;
    return !0;
  }
  function us(e, i) {
    return !(e[0] > i[0] || e[2] < i[2] || e[1] > i[1] || e[3] < i[3]);
  }
  function Yr(e, i) {
    return e[0] === i[0] && e[1] === i[1];
  }
  function yo(e, i) {
    return [(e[0] + i[0]) / 2, (e[1] + i[1]) / 2];
  }
  var hs = tt, vo = k(Ii()), cs = /^-?(?:\d+(?:\.\d*)?|\.\d+)(?:e[+-]?\d+)?$/i, ve = Math.ceil, Ue = Math.floor, He = "[BigNumber Error] ", ds = He + "Number primitive has more than 15 significant digits: ", oi = 1e14, Ut = 14, cr = 9007199254740991, Qr = [1, 10, 100, 1e3, 1e4, 1e5, 1e6, 1e7, 1e8, 1e9, 1e10, 1e11, 1e12, 1e13], vn = 1e7, Oe = 1e9;
  function Zo(e) {
    var i, r, a, o = T.prototype = { constructor: T, toString: null, valueOf: null }, u = new T(1), f = 20, _ = 4, b = -7, w = 21, O = -1e7, S = 1e7, U = !1, W = 1, lt = 0, yt = { prefix: "", groupSize: 3, secondaryGroupSize: 0, groupSeparator: ",", decimalSeparator: ".", fractionGroupSize: 0, fractionGroupSeparator: " ", suffix: "" }, Ct = "0123456789abcdefghijklmnopqrstuvwxyz", Bt = !0;
    function T(M, P) {
      var A, V, z, R, X, G, J, it, et = this;
      if (!(et instanceof T)) return new T(M, P);
      if (P == null) {
        if (M && M._isBigNumber === !0) {
          et.s = M.s, !M.c || M.e > S ? et.c = et.e = null : M.e < O ? et.c = [et.e = 0] : (et.e = M.e, et.c = M.c.slice());
          return;
        }
        if ((G = typeof M == "number") && M * 0 == 0) {
          if (et.s = 1 / M < 0 ? (M = -M, -1) : 1, M === ~~M) {
            for (R = 0, X = M; X >= 10; X /= 10, R++) ;
            R > S ? et.c = et.e = null : (et.e = R, et.c = [M]);
            return;
          }
          it = String(M);
        } else {
          if (!cs.test(it = String(M))) return a(et, it, G);
          et.s = it.charCodeAt(0) == 45 ? (it = it.slice(1), -1) : 1;
        }
        (R = it.indexOf(".")) > -1 && (it = it.replace(".", "")), (X = it.search(/e/i)) > 0 ? (R < 0 && (R = X), R += +it.slice(X + 1), it = it.substring(0, X)) : R < 0 && (R = it.length);
      } else {
        if (xe(P, 2, Ct.length, "Base"), P == 10 && Bt) return et = new T(M), bt(et, f + et.e + 1, _);
        if (it = String(M), G = typeof M == "number") {
          if (M * 0 != 0) return a(et, it, G, P);
          if (et.s = 1 / M < 0 ? (it = it.slice(1), -1) : 1, T.DEBUG && it.replace(/^0\.0*|\./, "").length > 15) throw Error(ds + M);
        } else et.s = it.charCodeAt(0) === 45 ? (it = it.slice(1), -1) : 1;
        for (A = Ct.slice(0, P), R = X = 0, J = it.length; X < J; X++) if (A.indexOf(V = it.charAt(X)) < 0) {
          if (V == ".") {
            if (X > R) {
              R = J;
              continue;
            }
          } else if (!z && (it == it.toUpperCase() && (it = it.toLowerCase()) || it == it.toLowerCase() && (it = it.toUpperCase()))) {
            z = !0, X = -1, R = 0;
            continue;
          }
          return a(et, String(M), G, P);
        }
        G = !1, it = r(it, P, 10, et.s), (R = it.indexOf(".")) > -1 ? it = it.replace(".", "") : R = it.length;
      }
      for (X = 0; it.charCodeAt(X) === 48; X++) ;
      for (J = it.length; it.charCodeAt(--J) === 48; ) ;
      if (it = it.slice(X, ++J)) {
        if (J -= X, G && T.DEBUG && J > 15 && (M > cr || M !== Ue(M))) throw Error(ds + et.s * M);
        if ((R = R - X - 1) > S) et.c = et.e = null;
        else if (R < O) et.c = [et.e = 0];
        else {
          if (et.e = R, et.c = [], X = (R + 1) % Ut, R < 0 && (X += Ut), X < J) {
            for (X && et.c.push(+it.slice(0, X)), J -= Ut; X < J; ) et.c.push(+it.slice(X, X += Ut));
            X = Ut - (it = it.slice(X)).length;
          } else X -= J;
          for (; X--; it += "0") ;
          et.c.push(+it);
        }
      } else et.c = [et.e = 0];
    }
    T.clone = Zo, T.ROUND_UP = 0, T.ROUND_DOWN = 1, T.ROUND_CEIL = 2, T.ROUND_FLOOR = 3, T.ROUND_HALF_UP = 4, T.ROUND_HALF_DOWN = 5, T.ROUND_HALF_EVEN = 6, T.ROUND_HALF_CEIL = 7, T.ROUND_HALF_FLOOR = 8, T.EUCLID = 9, T.config = T.set = function(M) {
      var P, A;
      if (M != null) if (typeof M == "object") {
        if (M.hasOwnProperty(P = "DECIMAL_PLACES") && (A = M[P], xe(A, 0, Oe, P), f = A), M.hasOwnProperty(P = "ROUNDING_MODE") && (A = M[P], xe(A, 0, 8, P), _ = A), M.hasOwnProperty(P = "EXPONENTIAL_AT") && (A = M[P], A && A.pop ? (xe(A[0], -Oe, 0, P), xe(A[1], 0, Oe, P), b = A[0], w = A[1]) : (xe(A, -Oe, Oe, P), b = -(w = A < 0 ? -A : A))), M.hasOwnProperty(P = "RANGE")) if (A = M[P], A && A.pop) xe(A[0], -Oe, -1, P), xe(A[1], 1, Oe, P), O = A[0], S = A[1];
        else if (xe(A, -Oe, Oe, P), A) O = -(S = A < 0 ? -A : A);
        else throw Error(He + P + " cannot be zero: " + A);
        if (M.hasOwnProperty(P = "CRYPTO")) if (A = M[P], A === !!A) if (A) if (typeof crypto < "u" && crypto && (crypto.getRandomValues || crypto.randomBytes)) U = A;
        else throw U = !A, Error(He + "crypto unavailable");
        else U = A;
        else throw Error(He + P + " not true or false: " + A);
        if (M.hasOwnProperty(P = "MODULO_MODE") && (A = M[P], xe(A, 0, 9, P), W = A), M.hasOwnProperty(P = "POW_PRECISION") && (A = M[P], xe(A, 0, Oe, P), lt = A), M.hasOwnProperty(P = "FORMAT")) if (A = M[P], typeof A == "object") yt = A;
        else throw Error(He + P + " not an object: " + A);
        if (M.hasOwnProperty(P = "ALPHABET")) if (A = M[P], typeof A == "string" && !/^.?$|[+\-.\s]|(.).*\1/.test(A)) Bt = A.slice(0, 10) == "0123456789", Ct = A;
        else throw Error(He + P + " invalid: " + A);
      } else throw Error(He + "Object expected: " + M);
      return { DECIMAL_PLACES: f, ROUNDING_MODE: _, EXPONENTIAL_AT: [b, w], RANGE: [O, S], CRYPTO: U, MODULO_MODE: W, POW_PRECISION: lt, FORMAT: yt, ALPHABET: Ct };
    }, T.isBigNumber = function(M) {
      if (!M || M._isBigNumber !== !0) return !1;
      if (!T.DEBUG) return !0;
      var P, A, V = M.c, z = M.e, R = M.s;
      t: if ({}.toString.call(V) == "[object Array]") {
        if ((R === 1 || R === -1) && z >= -Oe && z <= Oe && z === Ue(z)) {
          if (V[0] === 0) {
            if (z === 0 && V.length === 1) return !0;
            break t;
          }
          if (P = (z + 1) % Ut, P < 1 && (P += Ut), String(V[0]).length == P) {
            for (P = 0; P < V.length; P++) if (A = V[P], A < 0 || A >= oi || A !== Ue(A)) break t;
            if (A !== 0) return !0;
          }
        }
      } else if (V === null && z === null && (R === null || R === 1 || R === -1)) return !0;
      throw Error(He + "Invalid BigNumber: " + M);
    }, T.maximum = T.max = function() {
      return st(arguments, -1);
    }, T.minimum = T.min = function() {
      return st(arguments, 1);
    }, T.random = function() {
      var M = 9007199254740992, P = Math.random() * M & 2097151 ? function() {
        return Ue(Math.random() * M);
      } : function() {
        return (Math.random() * 1073741824 | 0) * 8388608 + (Math.random() * 8388608 | 0);
      };
      return function(A) {
        var V, z, R, X, G, J = 0, it = [], et = new T(u);
        if (A == null ? A = f : xe(A, 0, Oe), X = ve(A / Ut), U) if (crypto.getRandomValues) {
          for (V = crypto.getRandomValues(new Uint32Array(X *= 2)); J < X; ) G = V[J] * 131072 + (V[J + 1] >>> 11), G >= 9e15 ? (z = crypto.getRandomValues(new Uint32Array(2)), V[J] = z[0], V[J + 1] = z[1]) : (it.push(G % 1e14), J += 2);
          J = X / 2;
        } else if (crypto.randomBytes) {
          for (V = crypto.randomBytes(X *= 7); J < X; ) G = (V[J] & 31) * 281474976710656 + V[J + 1] * 1099511627776 + V[J + 2] * 4294967296 + V[J + 3] * 16777216 + (V[J + 4] << 16) + (V[J + 5] << 8) + V[J + 6], G >= 9e15 ? crypto.randomBytes(7).copy(V, J) : (it.push(G % 1e14), J += 7);
          J = X / 7;
        } else throw U = !1, Error(He + "crypto unavailable");
        if (!U) for (; J < X; ) G = P(), G < 9e15 && (it[J++] = G % 1e14);
        for (X = it[--J], A %= Ut, X && A && (G = Qr[Ut - A], it[J] = Ue(X / G) * G); it[J] === 0; it.pop(), J--) ;
        if (J < 0) it = [R = 0];
        else {
          for (R = -1; it[0] === 0; it.splice(0, 1), R -= Ut) ;
          for (J = 1, G = it[0]; G >= 10; G /= 10, J++) ;
          J < Ut && (R -= Ut - J);
        }
        return et.e = R, et.c = it, et;
      };
    }(), T.sum = function() {
      for (var M = 1, P = arguments, A = new T(P[0]); M < P.length; ) A = A.plus(P[M++]);
      return A;
    }, r = /* @__PURE__ */ function() {
      var M = "0123456789";
      function P(A, V, z, R) {
        for (var X, G = [0], J, it = 0, et = A.length; it < et; ) {
          for (J = G.length; J--; G[J] *= V) ;
          for (G[0] += R.indexOf(A.charAt(it++)), X = 0; X < G.length; X++) G[X] > z - 1 && (G[X + 1] == null && (G[X + 1] = 0), G[X + 1] += G[X] / z | 0, G[X] %= z);
        }
        return G.reverse();
      }
      return function(A, V, z, R, X) {
        var G, J, it, et, gt, It, Ot, qt, ke = A.indexOf("."), Ie = f, he = _;
        for (ke >= 0 && (et = lt, lt = 0, A = A.replace(".", ""), qt = new T(V), It = qt.pow(A.length - ke), lt = et, qt.c = P(Yi(yi(It.c), It.e, "0"), 10, z, M), qt.e = qt.c.length), Ot = P(A, V, z, X ? (G = Ct, M) : (G = M, Ct)), it = et = Ot.length; Ot[--et] == 0; Ot.pop()) ;
        if (!Ot[0]) return G.charAt(0);
        if (ke < 0 ? --it : (It.c = Ot, It.e = it, It.s = R, It = i(It, qt, Ie, he, z), Ot = It.c, gt = It.r, it = It.e), J = it + Ie + 1, ke = Ot[J], et = z / 2, gt = gt || J < 0 || Ot[J + 1] != null, gt = he < 4 ? (ke != null || gt) && (he == 0 || he == (It.s < 0 ? 3 : 2)) : ke > et || ke == et && (he == 4 || gt || he == 6 && Ot[J - 1] & 1 || he == (It.s < 0 ? 8 : 7)), J < 1 || !Ot[0]) A = gt ? Yi(G.charAt(1), -Ie, G.charAt(0)) : G.charAt(0);
        else {
          if (Ot.length = J, gt) for (--z; ++Ot[--J] > z; ) Ot[J] = 0, J || (++it, Ot = [1].concat(Ot));
          for (et = Ot.length; !Ot[--et]; ) ;
          for (ke = 0, A = ""; ke <= et; A += G.charAt(Ot[ke++])) ;
          A = Yi(A, it, G.charAt(0));
        }
        return A;
      };
    }(), i = /* @__PURE__ */ function() {
      function M(V, z, R) {
        var X, G, J, it, et = 0, gt = V.length, It = z % vn, Ot = z / vn | 0;
        for (V = V.slice(); gt--; ) J = V[gt] % vn, it = V[gt] / vn | 0, X = Ot * J + it * It, G = It * J + X % vn * vn + et, et = (G / R | 0) + (X / vn | 0) + Ot * it, V[gt] = G % R;
        return et && (V = [et].concat(V)), V;
      }
      function P(V, z, R, X) {
        var G, J;
        if (R != X) J = R > X ? 1 : -1;
        else for (G = J = 0; G < R; G++) if (V[G] != z[G]) {
          J = V[G] > z[G] ? 1 : -1;
          break;
        }
        return J;
      }
      function A(V, z, R, X) {
        for (var G = 0; R--; ) V[R] -= G, G = V[R] < z[R] ? 1 : 0, V[R] = G * X + V[R] - z[R];
        for (; !V[0] && V.length > 1; V.splice(0, 1)) ;
      }
      return function(V, z, R, X, G) {
        var J, it, et, gt, It, Ot, qt, ke, Ie, he, me, qe, ws, Co, ko, Vi, na, vi = V.s == z.s ? 1 : -1, Ye = V.c, Ee = z.c;
        if (!Ye || !Ye[0] || !Ee || !Ee[0]) return new T(!V.s || !z.s || (Ye ? Ee && Ye[0] == Ee[0] : !Ee) ? NaN : Ye && Ye[0] == 0 || !Ee ? vi * 0 : vi / 0);
        for (ke = new T(vi), Ie = ke.c = [], it = V.e - z.e, vi = R + it + 1, G || (G = oi, it = mi(V.e / Ut) - mi(z.e / Ut), vi = vi / Ut | 0), et = 0; Ee[et] == (Ye[et] || 0); et++) ;
        if (Ee[et] > (Ye[et] || 0) && it--, vi < 0) Ie.push(1), gt = !0;
        else {
          for (Co = Ye.length, Vi = Ee.length, et = 0, vi += 2, It = Ue(G / (Ee[0] + 1)), It > 1 && (Ee = M(Ee, It, G), Ye = M(Ye, It, G), Vi = Ee.length, Co = Ye.length), ws = Vi, he = Ye.slice(0, Vi), me = he.length; me < Vi; he[me++] = 0) ;
          na = Ee.slice(), na = [0].concat(na), ko = Ee[0], Ee[1] >= G / 2 && ko++;
          do {
            if (It = 0, J = P(Ee, he, Vi, me), J < 0) {
              if (qe = he[0], Vi != me && (qe = qe * G + (he[1] || 0)), It = Ue(qe / ko), It > 1) for (It >= G && (It = G - 1), Ot = M(Ee, It, G), qt = Ot.length, me = he.length; P(Ot, he, qt, me) == 1; ) It--, A(Ot, Vi < qt ? na : Ee, qt, G), qt = Ot.length, J = 1;
              else It == 0 && (J = It = 1), Ot = Ee.slice(), qt = Ot.length;
              if (qt < me && (Ot = [0].concat(Ot)), A(he, Ot, me, G), me = he.length, J == -1) for (; P(Ee, he, Vi, me) < 1; ) It++, A(he, Vi < me ? na : Ee, me, G), me = he.length;
            } else J === 0 && (It++, he = [0]);
            Ie[et++] = It, he[0] ? he[me++] = Ye[ws] || 0 : (he = [Ye[ws]], me = 1);
          } while ((ws++ < Co || he[0] != null) && vi--);
          gt = he[0] != null, Ie[0] || Ie.splice(0, 1);
        }
        if (G == oi) {
          for (et = 1, vi = Ie[0]; vi >= 10; vi /= 10, et++) ;
          bt(ke, R + (ke.e = et + it * Ut - 1) + 1, X, gt);
        } else ke.e = it, ke.r = +gt;
        return ke;
      };
    }();
    function Q(M, P, A, V) {
      var z, R, X, G, J;
      if (A == null ? A = _ : xe(A, 0, 8), !M.c) return M.toString();
      if (z = M.c[0], X = M.e, P == null) J = yi(M.c), J = V == 1 || V == 2 && (X <= b || X >= w) ? ps(J, X) : Yi(J, X, "0");
      else if (M = bt(new T(M), P, A), R = M.e, J = yi(M.c), G = J.length, V == 1 || V == 2 && (P <= R || R <= b)) {
        for (; G < P; J += "0", G++) ;
        J = ps(J, R);
      } else if (P -= X + (V === 2 && R > X), J = Yi(J, R, "0"), R + 1 > G) {
        if (--P > 0) for (J += "."; P--; J += "0") ;
      } else if (P += R - G, P > 0) for (R + 1 == G && (J += "."); P--; J += "0") ;
      return M.s < 0 && z ? "-" + J : J;
    }
    function st(M, P) {
      for (var A, V, z = 1, R = new T(M[0]); z < M.length; z++) V = new T(M[z]), (!V.s || (A = Nn(R, V)) === P || A === 0 && R.s === P) && (R = V);
      return R;
    }
    function xt(M, P, A) {
      for (var V = 1, z = P.length; !P[--z]; P.pop()) ;
      for (z = P[0]; z >= 10; z /= 10, V++) ;
      return (A = V + A * Ut - 1) > S ? M.c = M.e = null : A < O ? M.c = [M.e = 0] : (M.e = A, M.c = P), M;
    }
    a = /* @__PURE__ */ function() {
      var M = /^(-?)0([xbo])(?=\w[\w.]*$)/i, P = /^([^.]+)\.$/, A = /^\.([^.]+)$/, V = /^-?(Infinity|NaN)$/, z = /^\s*\+(?=[\w.])|^\s+|\s+$/g;
      return function(R, X, G, J) {
        var it, et = G ? X : X.replace(z, "");
        if (V.test(et)) R.s = isNaN(et) ? null : et < 0 ? -1 : 1;
        else {
          if (!G && (et = et.replace(M, function(gt, It, Ot) {
            return it = (Ot = Ot.toLowerCase()) == "x" ? 16 : Ot == "b" ? 2 : 8, !J || J == it ? It : gt;
          }), J && (it = J, et = et.replace(P, "$1").replace(A, "0.$1")), X != et)) return new T(et, it);
          if (T.DEBUG) throw Error(He + "Not a" + (J ? " base " + J : "") + " number: " + X);
          R.s = null;
        }
        R.c = R.e = null;
      };
    }();
    function bt(M, P, A, V) {
      var z, R, X, G, J, it, et, gt = M.c, It = Qr;
      if (gt) {
        t: {
          for (z = 1, G = gt[0]; G >= 10; G /= 10, z++) ;
          if (R = P - z, R < 0) R += Ut, X = P, J = gt[it = 0], et = Ue(J / It[z - X - 1] % 10);
          else if (it = ve((R + 1) / Ut), it >= gt.length) if (V) {
            for (; gt.length <= it; gt.push(0)) ;
            J = et = 0, z = 1, R %= Ut, X = R - Ut + 1;
          } else break t;
          else {
            for (J = G = gt[it], z = 1; G >= 10; G /= 10, z++) ;
            R %= Ut, X = R - Ut + z, et = X < 0 ? 0 : Ue(J / It[z - X - 1] % 10);
          }
          if (V = V || P < 0 || gt[it + 1] != null || (X < 0 ? J : J % It[z - X - 1]), V = A < 4 ? (et || V) && (A == 0 || A == (M.s < 0 ? 3 : 2)) : et > 5 || et == 5 && (A == 4 || V || A == 6 && (R > 0 ? X > 0 ? J / It[z - X] : 0 : gt[it - 1]) % 10 & 1 || A == (M.s < 0 ? 8 : 7)), P < 1 || !gt[0]) return gt.length = 0, V ? (P -= M.e + 1, gt[0] = It[(Ut - P % Ut) % Ut], M.e = -P || 0) : gt[0] = M.e = 0, M;
          if (R == 0 ? (gt.length = it, G = 1, it--) : (gt.length = it + 1, G = It[Ut - R], gt[it] = X > 0 ? Ue(J / It[z - X] % It[X]) * G : 0), V) for (; ; ) if (it == 0) {
            for (R = 1, X = gt[0]; X >= 10; X /= 10, R++) ;
            for (X = gt[0] += G, G = 1; X >= 10; X /= 10, G++) ;
            R != G && (M.e++, gt[0] == oi && (gt[0] = 1));
            break;
          } else {
            if (gt[it] += G, gt[it] != oi) break;
            gt[it--] = 0, G = 1;
          }
          for (R = gt.length; gt[--R] === 0; gt.pop()) ;
        }
        M.e > S ? M.c = M.e = null : M.e < O && (M.c = [M.e = 0]);
      }
      return M;
    }
    function Lt(M) {
      var P, A = M.e;
      return A === null ? M.toString() : (P = yi(M.c), P = A <= b || A >= w ? ps(P, A) : Yi(P, A, "0"), M.s < 0 ? "-" + P : P);
    }
    return o.absoluteValue = o.abs = function() {
      var M = new T(this);
      return M.s < 0 && (M.s = 1), M;
    }, o.comparedTo = function(M, P) {
      return Nn(this, new T(M, P));
    }, o.decimalPlaces = o.dp = function(M, P) {
      var A, V, z, R = this;
      if (M != null) return xe(M, 0, Oe), P == null ? P = _ : xe(P, 0, 8), bt(new T(R), M + R.e + 1, P);
      if (!(A = R.c)) return null;
      if (V = ((z = A.length - 1) - mi(this.e / Ut)) * Ut, z = A[z]) for (; z % 10 == 0; z /= 10, V--) ;
      return V < 0 && (V = 0), V;
    }, o.dividedBy = o.div = function(M, P) {
      return i(this, new T(M, P), f, _);
    }, o.dividedToIntegerBy = o.idiv = function(M, P) {
      return i(this, new T(M, P), 0, 1);
    }, o.exponentiatedBy = o.pow = function(M, P) {
      var A, V, z, R, X, G, J, it, et, gt = this;
      if (M = new T(M), M.c && !M.isInteger()) throw Error(He + "Exponent not an integer: " + Lt(M));
      if (P != null && (P = new T(P)), G = M.e > 14, !gt.c || !gt.c[0] || gt.c[0] == 1 && !gt.e && gt.c.length == 1 || !M.c || !M.c[0]) return et = new T(Math.pow(+Lt(gt), G ? M.s * (2 - fs(M)) : +Lt(M))), P ? et.mod(P) : et;
      if (J = M.s < 0, P) {
        if (P.c ? !P.c[0] : !P.s) return new T(NaN);
        V = !J && gt.isInteger() && P.isInteger(), V && (gt = gt.mod(P));
      } else {
        if (M.e > 9 && (gt.e > 0 || gt.e < -1 || (gt.e == 0 ? gt.c[0] > 1 || G && gt.c[1] >= 24e7 : gt.c[0] < 8e13 || G && gt.c[0] <= 9999975e7))) return R = gt.s < 0 && fs(M) ? -0 : 0, gt.e > -1 && (R = 1 / R), new T(J ? 1 / R : R);
        lt && (R = ve(lt / Ut + 2));
      }
      for (G ? (A = new T(0.5), J && (M.s = 1), it = fs(M)) : (z = Math.abs(+Lt(M)), it = z % 2), et = new T(u); ; ) {
        if (it) {
          if (et = et.times(gt), !et.c) break;
          R ? et.c.length > R && (et.c.length = R) : V && (et = et.mod(P));
        }
        if (z) {
          if (z = Ue(z / 2), z === 0) break;
          it = z % 2;
        } else if (M = M.times(A), bt(M, M.e + 1, 1), M.e > 14) it = fs(M);
        else {
          if (z = +Lt(M), z === 0) break;
          it = z % 2;
        }
        gt = gt.times(gt), R ? gt.c && gt.c.length > R && (gt.c.length = R) : V && (gt = gt.mod(P));
      }
      return V ? et : (J && (et = u.div(et)), P ? et.mod(P) : R ? bt(et, lt, _, X) : et);
    }, o.integerValue = function(M) {
      var P = new T(this);
      return M == null ? M = _ : xe(M, 0, 8), bt(P, P.e + 1, M);
    }, o.isEqualTo = o.eq = function(M, P) {
      return Nn(this, new T(M, P)) === 0;
    }, o.isFinite = function() {
      return !!this.c;
    }, o.isGreaterThan = o.gt = function(M, P) {
      return Nn(this, new T(M, P)) > 0;
    }, o.isGreaterThanOrEqualTo = o.gte = function(M, P) {
      return (P = Nn(this, new T(M, P))) === 1 || P === 0;
    }, o.isInteger = function() {
      return !!this.c && mi(this.e / Ut) > this.c.length - 2;
    }, o.isLessThan = o.lt = function(M, P) {
      return Nn(this, new T(M, P)) < 0;
    }, o.isLessThanOrEqualTo = o.lte = function(M, P) {
      return (P = Nn(this, new T(M, P))) === -1 || P === 0;
    }, o.isNaN = function() {
      return !this.s;
    }, o.isNegative = function() {
      return this.s < 0;
    }, o.isPositive = function() {
      return this.s > 0;
    }, o.isZero = function() {
      return !!this.c && this.c[0] == 0;
    }, o.minus = function(M, P) {
      var A, V, z, R, X = this, G = X.s;
      if (M = new T(M, P), P = M.s, !G || !P) return new T(NaN);
      if (G != P) return M.s = -P, X.plus(M);
      var J = X.e / Ut, it = M.e / Ut, et = X.c, gt = M.c;
      if (!J || !it) {
        if (!et || !gt) return et ? (M.s = -P, M) : new T(gt ? X : NaN);
        if (!et[0] || !gt[0]) return gt[0] ? (M.s = -P, M) : new T(et[0] ? X : _ == 3 ? -0 : 0);
      }
      if (J = mi(J), it = mi(it), et = et.slice(), G = J - it) {
        for ((R = G < 0) ? (G = -G, z = et) : (it = J, z = gt), z.reverse(), P = G; P--; z.push(0)) ;
        z.reverse();
      } else for (V = (R = (G = et.length) < (P = gt.length)) ? G : P, G = P = 0; P < V; P++) if (et[P] != gt[P]) {
        R = et[P] < gt[P];
        break;
      }
      if (R && (z = et, et = gt, gt = z, M.s = -M.s), P = (V = gt.length) - (A = et.length), P > 0) for (; P--; et[A++] = 0) ;
      for (P = oi - 1; V > G; ) {
        if (et[--V] < gt[V]) {
          for (A = V; A && !et[--A]; et[A] = P) ;
          --et[A], et[V] += oi;
        }
        et[V] -= gt[V];
      }
      for (; et[0] == 0; et.splice(0, 1), --it) ;
      return et[0] ? xt(M, et, it) : (M.s = _ == 3 ? -1 : 1, M.c = [M.e = 0], M);
    }, o.modulo = o.mod = function(M, P) {
      var A, V, z = this;
      return M = new T(M, P), !z.c || !M.s || M.c && !M.c[0] ? new T(NaN) : !M.c || z.c && !z.c[0] ? new T(z) : (W == 9 ? (V = M.s, M.s = 1, A = i(z, M, 0, 3), M.s = V, A.s *= V) : A = i(z, M, 0, W), M = z.minus(A.times(M)), !M.c[0] && W == 1 && (M.s = z.s), M);
    }, o.multipliedBy = o.times = function(M, P) {
      var A, V, z, R, X, G, J, it, et, gt, It, Ot, qt, ke, Ie, he = this, me = he.c, qe = (M = new T(M, P)).c;
      if (!me || !qe || !me[0] || !qe[0]) return !he.s || !M.s || me && !me[0] && !qe || qe && !qe[0] && !me ? M.c = M.e = M.s = null : (M.s *= he.s, !me || !qe ? M.c = M.e = null : (M.c = [0], M.e = 0)), M;
      for (V = mi(he.e / Ut) + mi(M.e / Ut), M.s *= he.s, J = me.length, gt = qe.length, J < gt && (qt = me, me = qe, qe = qt, z = J, J = gt, gt = z), z = J + gt, qt = []; z--; qt.push(0)) ;
      for (ke = oi, Ie = vn, z = gt; --z >= 0; ) {
        for (A = 0, It = qe[z] % Ie, Ot = qe[z] / Ie | 0, X = J, R = z + X; R > z; ) it = me[--X] % Ie, et = me[X] / Ie | 0, G = Ot * it + et * It, it = It * it + G % Ie * Ie + qt[R] + A, A = (it / ke | 0) + (G / Ie | 0) + Ot * et, qt[R--] = it % ke;
        qt[R] = A;
      }
      return A ? ++V : qt.splice(0, 1), xt(M, qt, V);
    }, o.negated = function() {
      var M = new T(this);
      return M.s = -M.s || null, M;
    }, o.plus = function(M, P) {
      var A, V = this, z = V.s;
      if (M = new T(M, P), P = M.s, !z || !P) return new T(NaN);
      if (z != P) return M.s = -P, V.minus(M);
      var R = V.e / Ut, X = M.e / Ut, G = V.c, J = M.c;
      if (!R || !X) {
        if (!G || !J) return new T(z / 0);
        if (!G[0] || !J[0]) return J[0] ? M : new T(G[0] ? V : z * 0);
      }
      if (R = mi(R), X = mi(X), G = G.slice(), z = R - X) {
        for (z > 0 ? (X = R, A = J) : (z = -z, A = G), A.reverse(); z--; A.push(0)) ;
        A.reverse();
      }
      for (z = G.length, P = J.length, z - P < 0 && (A = J, J = G, G = A, P = z), z = 0; P; ) z = (G[--P] = G[P] + J[P] + z) / oi | 0, G[P] = oi === G[P] ? 0 : G[P] % oi;
      return z && (G = [z].concat(G), ++X), xt(M, G, X);
    }, o.precision = o.sd = function(M, P) {
      var A, V, z, R = this;
      if (M != null && M !== !!M) return xe(M, 1, Oe), P == null ? P = _ : xe(P, 0, 8), bt(new T(R), M, P);
      if (!(A = R.c)) return null;
      if (z = A.length - 1, V = z * Ut + 1, z = A[z]) {
        for (; z % 10 == 0; z /= 10, V--) ;
        for (z = A[0]; z >= 10; z /= 10, V++) ;
      }
      return M && R.e + 1 > V && (V = R.e + 1), V;
    }, o.shiftedBy = function(M) {
      return xe(M, -cr, cr), this.times("1e" + M);
    }, o.squareRoot = o.sqrt = function() {
      var M, P, A, V, z, R = this, X = R.c, G = R.s, J = R.e, it = f + 4, et = new T("0.5");
      if (G !== 1 || !X || !X[0]) return new T(!G || G < 0 && (!X || X[0]) ? NaN : X ? R : 1 / 0);
      if (G = Math.sqrt(+Lt(R)), G == 0 || G == 1 / 0 ? (P = yi(X), (P.length + J) % 2 == 0 && (P += "0"), G = Math.sqrt(+P), J = mi((J + 1) / 2) - (J < 0 || J % 2), G == 1 / 0 ? P = "5e" + J : (P = G.toExponential(), P = P.slice(0, P.indexOf("e") + 1) + J), A = new T(P)) : A = new T(G + ""), A.c[0]) {
        for (J = A.e, G = J + it, G < 3 && (G = 0); ; ) if (z = A, A = et.times(z.plus(i(R, z, it, 1))), yi(z.c).slice(0, G) === (P = yi(A.c)).slice(0, G)) if (A.e < J && --G, P = P.slice(G - 3, G + 1), P == "9999" || !V && P == "4999") {
          if (!V && (bt(z, z.e + f + 2, 0), z.times(z).eq(R))) {
            A = z;
            break;
          }
          it += 4, G += 4, V = 1;
        } else {
          (!+P || !+P.slice(1) && P.charAt(0) == "5") && (bt(A, A.e + f + 2, 1), M = !A.times(A).eq(R));
          break;
        }
      }
      return bt(A, A.e + f + 1, _, M);
    }, o.toExponential = function(M, P) {
      return M != null && (xe(M, 0, Oe), M++), Q(this, M, P, 1);
    }, o.toFixed = function(M, P) {
      return M != null && (xe(M, 0, Oe), M = M + this.e + 1), Q(this, M, P);
    }, o.toFormat = function(M, P, A) {
      var V, z = this;
      if (A == null) M != null && P && typeof P == "object" ? (A = P, P = null) : M && typeof M == "object" ? (A = M, M = P = null) : A = yt;
      else if (typeof A != "object") throw Error(He + "Argument not an object: " + A);
      if (V = z.toFixed(M, P), z.c) {
        var R, X = V.split("."), G = +A.groupSize, J = +A.secondaryGroupSize, it = A.groupSeparator || "", et = X[0], gt = X[1], It = z.s < 0, Ot = It ? et.slice(1) : et, qt = Ot.length;
        if (J && (R = G, G = J, J = R, qt -= R), G > 0 && qt > 0) {
          for (R = qt % G || G, et = Ot.substr(0, R); R < qt; R += G) et += it + Ot.substr(R, G);
          J > 0 && (et += it + Ot.slice(R)), It && (et = "-" + et);
        }
        V = gt ? et + (A.decimalSeparator || "") + ((J = +A.fractionGroupSize) ? gt.replace(new RegExp("\\d{" + J + "}\\B", "g"), "$&" + (A.fractionGroupSeparator || "")) : gt) : et;
      }
      return (A.prefix || "") + V + (A.suffix || "");
    }, o.toFraction = function(M) {
      var P, A, V, z, R, X, G, J, it, et, gt, It, Ot = this, qt = Ot.c;
      if (M != null && (G = new T(M), !G.isInteger() && (G.c || G.s !== 1) || G.lt(u))) throw Error(He + "Argument " + (G.isInteger() ? "out of range: " : "not an integer: ") + Lt(G));
      if (!qt) return new T(Ot);
      for (P = new T(u), it = A = new T(u), V = J = new T(u), It = yi(qt), R = P.e = It.length - Ot.e - 1, P.c[0] = Qr[(X = R % Ut) < 0 ? Ut + X : X], M = !M || G.comparedTo(P) > 0 ? R > 0 ? P : it : G, X = S, S = 1 / 0, G = new T(It), J.c[0] = 0; et = i(G, P, 0, 1), z = A.plus(et.times(V)), z.comparedTo(M) != 1; ) A = V, V = z, it = J.plus(et.times(z = it)), J = z, P = G.minus(et.times(z = P)), G = z;
      return z = i(M.minus(A), V, 0, 1), J = J.plus(z.times(it)), A = A.plus(z.times(V)), J.s = it.s = Ot.s, R = R * 2, gt = i(it, V, R, _).minus(Ot).abs().comparedTo(i(J, A, R, _).minus(Ot).abs()) < 1 ? [it, V] : [J, A], S = X, gt;
    }, o.toNumber = function() {
      return +Lt(this);
    }, o.toPrecision = function(M, P) {
      return M != null && xe(M, 1, Oe), Q(this, M, P, 2);
    }, o.toString = function(M) {
      var P, A = this, V = A.s, z = A.e;
      return z === null ? V ? (P = "Infinity", V < 0 && (P = "-" + P)) : P = "NaN" : (M == null ? P = z <= b || z >= w ? ps(yi(A.c), z) : Yi(yi(A.c), z, "0") : M === 10 && Bt ? (A = bt(new T(A), f + z + 1, _), P = Yi(yi(A.c), A.e, "0")) : (xe(M, 2, Ct.length, "Base"), P = r(Yi(yi(A.c), z, "0"), 10, M, V, !0)), V < 0 && A.c[0] && (P = "-" + P)), P;
    }, o.valueOf = o.toJSON = function() {
      return Lt(this);
    }, o._isBigNumber = !0, o[Symbol.toStringTag] = "BigNumber", o[Symbol.for("nodejs.util.inspect.custom")] = o.valueOf, e != null && T.set(e), T;
  }
  function mi(e) {
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
  function Nn(e, i) {
    var r, a, o = e.c, u = i.c, f = e.s, _ = i.s, b = e.e, w = i.e;
    if (!f || !_) return null;
    if (r = o && !o[0], a = u && !u[0], r || a) return r ? a ? 0 : -_ : f;
    if (f != _) return f;
    if (r = f < 0, a = b == w, !o || !u) return a ? 0 : !o ^ r ? 1 : -1;
    if (!a) return b > w ^ r ? 1 : -1;
    for (_ = (b = o.length) < (w = u.length) ? b : w, f = 0; f < _; f++) if (o[f] != u[f]) return o[f] > u[f] ^ r ? 1 : -1;
    return b == w ? 0 : b > w ^ r ? 1 : -1;
  }
  function xe(e, i, r, a) {
    if (e < i || e > r || e !== Ue(e)) throw Error(He + (a || "Argument") + (typeof e == "number" ? e < i || e > r ? " out of range: " : " not an integer: " : " not a primitive number: ") + String(e));
  }
  function fs(e) {
    var i = e.c.length - 1;
    return mi(e.e / Ut) == i && e.c[i] % 2 != 0;
  }
  function ps(e, i) {
    return (e.length > 1 ? e.charAt(0) + "." + e.slice(1) : e) + (i < 0 ? "e" : "e+") + i;
  }
  function Yi(e, i, r) {
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
  var Zl = Zo(), $i = Zl, Hl = class {
    constructor(e) {
      Rt(this, "key");
      Rt(this, "left", null);
      Rt(this, "right", null);
      this.key = e;
    }
  }, ta = class extends Hl {
    constructor(e) {
      super(e);
    }
  }, ql = class {
    constructor() {
      Rt(this, "size", 0);
      Rt(this, "modificationCount", 0);
      Rt(this, "splayCount", 0);
    }
    splay(e) {
      let i = this.root;
      if (i == null) return this.compare(e, e), -1;
      let r = null, a = null, o = null, u = null, f = i, _ = this.compare, b;
      for (; ; ) if (b = _(f.key, e), b > 0) {
        let w = f.left;
        if (w == null || (b = _(w.key, e), b > 0 && (f.left = w.right, w.right = f, f = w, w = f.left, w == null))) break;
        r == null ? a = f : r.left = f, r = f, f = w;
      } else if (b < 0) {
        let w = f.right;
        if (w == null || (b = _(w.key, e), b < 0 && (f.right = w.left, w.left = f, f = w, w = f.right, w == null))) break;
        o == null ? u = f : o.right = f, o = f, f = w;
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
  }, _s = class fa extends ql {
    constructor(r, a) {
      super();
      Rt(this, "root", null);
      Rt(this, "compare");
      Rt(this, "validKey");
      Rt(this, al, "[object Set]");
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
      return a != 0 && this.addNewRoot(new ta(r), a), this;
    }
    addAndReturn(r) {
      let a = this.splay(r);
      return a != 0 && this.addNewRoot(new ta(r), a), this.root.key;
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
      let a = new fa(this.compare, this.validKey), o = this.modificationCount;
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
      let a = new fa(this.compare, this.validKey);
      for (let o of this) r.has(o) && a.add(o);
      return a;
    }
    difference(r) {
      let a = new fa(this.compare, this.validKey);
      for (let o of this) r.has(o) || a.add(o);
      return a;
    }
    union(r) {
      let a = this.clone();
      return a.addAll(r), a;
    }
    clone() {
      let r = new fa(this.compare, this.validKey);
      return r.size = this.size, r.root = this.copyNode(this.root), r;
    }
    copyNode(r) {
      if (r == null) return null;
      function a(u, f) {
        let _, b;
        do {
          if (_ = u.left, b = u.right, _ != null) {
            let w = new ta(_.key);
            f.left = w, a(_, w);
          }
          if (b != null) {
            let w = new ta(b.key);
            f.right = w, u = b, f = w;
          }
        } while (b != null);
      }
      let o = new ta(r.key);
      return a(r, o), o;
    }
    toSet() {
      return this.clone();
    }
    entries() {
      return new Wl(this.wrap());
    }
    keys() {
      return this[Symbol.iterator]();
    }
    values() {
      return this[Symbol.iterator]();
    }
    [(sl = Symbol.iterator, al = Symbol.toStringTag, sl)]() {
      return new Kl(this.wrap());
    }
  }, Ho = class {
    constructor(e) {
      Rt(this, "tree");
      Rt(this, "path", new Array());
      Rt(this, "modificationCount", null);
      Rt(this, "splayCount");
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
  }, Kl = class extends Ho {
    getValue(e) {
      return e.key;
    }
  }, Wl = class extends Ho {
    getValue(e) {
      return [e.key, e.key];
    }
  }, qo = (e) => () => e, bo = (e) => {
    let i = e ? (r, a) => a.minus(r).abs().isLessThanOrEqualTo(e) : qo(!1);
    return (r, a) => i(r, a) ? 0 : r.comparedTo(a);
  };
  function Jl(e) {
    let i = e ? (r, a, o, u, f) => r.exponentiatedBy(2).isLessThanOrEqualTo(u.minus(a).exponentiatedBy(2).plus(f.minus(o).exponentiatedBy(2)).times(e)) : qo(!1);
    return (r, a, o) => {
      let u = r.x, f = r.y, _ = o.x, b = o.y, w = f.minus(b).times(a.x.minus(_)).minus(u.minus(_).times(a.y.minus(b)));
      return i(w, u, f, _, b) ? 0 : w.comparedTo(0);
    };
  }
  var Xl = (e) => e, Yl = (e) => {
    if (e) {
      let i = new _s(bo(e)), r = new _s(bo(e)), a = (u, f) => f.addAndReturn(u), o = (u) => ({ x: a(u.x, i), y: a(u.y, r) });
      return o({ x: new $i(0), y: new $i(0) }), o;
    }
    return Xl;
  }, xo = (e) => ({ set: (i) => {
    Qi = xo(i);
  }, reset: () => xo(e), compare: bo(e), snap: Yl(e), orient: Jl(e) }), Qi = xo(), ea = (e, i) => e.ll.x.isLessThanOrEqualTo(i.x) && i.x.isLessThanOrEqualTo(e.ur.x) && e.ll.y.isLessThanOrEqualTo(i.y) && i.y.isLessThanOrEqualTo(e.ur.y), Lo = (e, i) => {
    if (i.ur.x.isLessThan(e.ll.x) || e.ur.x.isLessThan(i.ll.x) || i.ur.y.isLessThan(e.ll.y) || e.ur.y.isLessThan(i.ll.y)) return null;
    let r = e.ll.x.isLessThan(i.ll.x) ? i.ll.x : e.ll.x, a = e.ur.x.isLessThan(i.ur.x) ? e.ur.x : i.ur.x, o = e.ll.y.isLessThan(i.ll.y) ? i.ll.y : e.ll.y, u = e.ur.y.isLessThan(i.ur.y) ? e.ur.y : i.ur.y;
    return { ll: { x: r, y: o }, ur: { x: a, y: u } };
  }, gs = (e, i) => e.x.times(i.y).minus(e.y.times(i.x)), Ko = (e, i) => e.x.times(i.x).plus(e.y.times(i.y)), ms = (e) => Ko(e, e).sqrt(), Ql = (e, i, r) => {
    let a = { x: i.x.minus(e.x), y: i.y.minus(e.y) }, o = { x: r.x.minus(e.x), y: r.y.minus(e.y) };
    return gs(o, a).div(ms(o)).div(ms(a));
  }, tu = (e, i, r) => {
    let a = { x: i.x.minus(e.x), y: i.y.minus(e.y) }, o = { x: r.x.minus(e.x), y: r.y.minus(e.y) };
    return Ko(o, a).div(ms(o)).div(ms(a));
  }, Wo = (e, i, r) => i.y.isZero() ? null : { x: e.x.plus(i.x.div(i.y).times(r.minus(e.y))), y: r }, Jo = (e, i, r) => i.x.isZero() ? null : { x: r, y: e.y.plus(i.y.div(i.x).times(r.minus(e.x))) }, eu = (e, i, r, a) => {
    if (i.x.isZero()) return Jo(r, a, e.x);
    if (a.x.isZero()) return Jo(e, i, r.x);
    if (i.y.isZero()) return Wo(r, a, e.y);
    if (a.y.isZero()) return Wo(e, i, r.y);
    let o = gs(i, a);
    if (o.isZero()) return null;
    let u = { x: r.x.minus(e.x), y: r.y.minus(e.y) }, f = gs(u, i).div(o), _ = gs(u, a).div(o), b = e.x.plus(_.times(i.x)), w = r.x.plus(f.times(a.x)), O = e.y.plus(_.times(i.y)), S = r.y.plus(f.times(a.y)), U = b.plus(w).div(2), W = O.plus(S).div(2);
    return { x: U, y: W };
  }, Ui = class Cl {
    constructor(i, r) {
      Rt(this, "point");
      Rt(this, "isLeft");
      Rt(this, "segment");
      Rt(this, "otherSE");
      Rt(this, "consumedBy");
      i.events === void 0 ? i.events = [this] : i.events.push(this), this.point = i, this.isLeft = r;
    }
    static compare(i, r) {
      let a = Cl.comparePoints(i.point, r.point);
      return a !== 0 ? a : (i.point !== r.point && i.link(r), i.isLeft !== r.isLeft ? i.isLeft ? 1 : -1 : vs.compare(i.segment, r.segment));
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
        r.set(o, { sine: Ql(this.point, i.point, u.point), cosine: tu(this.point, i.point, u.point) });
      };
      return (o, u) => {
        r.has(o) || a(o), r.has(u) || a(u);
        let { sine: f, cosine: _ } = r.get(o), { sine: b, cosine: w } = r.get(u);
        return f.isGreaterThanOrEqualTo(0) && b.isGreaterThanOrEqualTo(0) ? _.isLessThan(w) ? 1 : _.isGreaterThan(w) ? -1 : 0 : f.isLessThan(0) && b.isLessThan(0) ? _.isLessThan(w) ? -1 : _.isGreaterThan(w) ? 1 : 0 : b.isLessThan(f) ? -1 : b.isGreaterThan(f) ? 1 : 0;
      };
    }
  }, iu = class Do {
    constructor(i) {
      Rt(this, "events");
      Rt(this, "poly");
      Rt(this, "_isExteriorRing");
      Rt(this, "_enclosingRing");
      this.events = i;
      for (let r = 0, a = i.length; r < a; r++) i[r].segment.ringOut = this;
      this.poly = null;
    }
    static factory(i) {
      let r = [];
      for (let a = 0, o = i.length; a < o; a++) {
        let u = i[a];
        if (!u.isInResult() || u.ringOut) continue;
        let f = null, _ = u.leftSE, b = u.rightSE, w = [_], O = _.point, S = [];
        for (; f = _, _ = b, w.push(_), _.point !== O; ) for (; ; ) {
          let U = _.getAvailableLinkedEvents();
          if (U.length === 0) {
            let yt = w[0].point, Ct = w[w.length - 1].point;
            throw new Error(`Unable to complete output ring starting at [${yt.x}, ${yt.y}]. Last matching segment found ends at [${Ct.x}, ${Ct.y}].`);
          }
          if (U.length === 1) {
            b = U[0].otherSE;
            break;
          }
          let W = null;
          for (let yt = 0, Ct = S.length; yt < Ct; yt++) if (S[yt].point === _.point) {
            W = yt;
            break;
          }
          if (W !== null) {
            let yt = S.splice(W)[0], Ct = w.splice(yt.index);
            Ct.unshift(Ct[0].otherSE), r.push(new Do(Ct.reverse()));
            continue;
          }
          S.push({ index: w.length, point: _.point });
          let lt = _.getLeftmostComparator(f);
          b = U.sort(lt)[0].otherSE;
          break;
        }
        r.push(new Do(w));
      }
      return r;
    }
    getGeom() {
      let i = this.events[0].point, r = [i];
      for (let w = 1, O = this.events.length - 1; w < O; w++) {
        let S = this.events[w].point, U = this.events[w + 1].point;
        Qi.orient(S, i, U) !== 0 && (r.push(S), i = S);
      }
      if (r.length === 1) return null;
      let a = r[0], o = r[1];
      Qi.orient(a, i, o) === 0 && r.shift(), r.push(r[0]);
      let u = this.isExteriorRing() ? 1 : -1, f = this.isExteriorRing() ? 0 : r.length - 1, _ = this.isExteriorRing() ? r.length : -1, b = [];
      for (let w = f; w != _; w += u) b.push([r[w].x.toNumber(), r[w].y.toNumber()]);
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
        Ui.compare(i, b) > 0 && (i = b);
      }
      let r = i.segment.prevInResult(), a = r ? r.prevInResult() : null;
      for (; ; ) {
        if (!r) return null;
        if (!a) return r.ringOut;
        if (a.ringOut !== r.ringOut) return ((o = a.ringOut) == null ? void 0 : o.enclosingRing()) !== r.ringOut ? r.ringOut : (u = r.ringOut) == null ? void 0 : u.enclosingRing();
        r = a.prevInResult(), a = r ? r.prevInResult() : null;
      }
    }
  }, Xo = class {
    constructor(e) {
      Rt(this, "exteriorRing");
      Rt(this, "interiorRings");
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
  }, nu = class {
    constructor(e) {
      Rt(this, "rings");
      Rt(this, "polys");
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
        if (!u.poly) if (u.isExteriorRing()) i.push(new Xo(u));
        else {
          let f = u.enclosingRing();
          f != null && f.poly || i.push(new Xo(f)), (r = f == null ? void 0 : f.poly) == null || r.addInterior(u);
        }
      }
      return i;
    }
  }, ru = class {
    constructor(e, i = vs.compare) {
      Rt(this, "queue");
      Rt(this, "tree");
      Rt(this, "segments");
      this.queue = e, this.tree = new _s(i), this.segments = [];
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
            for (let w = 0, O = b.length; w < O; w++) r.push(b[w]);
          }
        }
        let f = null;
        if (o) {
          let _ = o.getIntersection(i);
          if (_ !== null && (i.isAnEndpoint(_) || (f = _), !o.isAnEndpoint(_))) {
            let b = this._splitSafely(o, _);
            for (let w = 0, O = b.length; w < O; w++) r.push(b[w]);
          }
        }
        if (u !== null || f !== null) {
          let _ = null;
          u === null ? _ = f : f === null ? _ = u : _ = Ui.comparePoints(u, f) <= 0 ? u : f, this.queue.delete(i.rightSE), r.push(i.rightSE);
          let b = i.split(_);
          for (let w = 0, O = b.length; w < O; w++) r.push(b[w]);
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
  }, au = class {
    constructor() {
      Rt(this, "type");
      Rt(this, "numMultiPolys");
    }
    run(e, i, r) {
      ia.type = e;
      let a = [new Qo(i, !0)];
      for (let b = 0, w = r.length; b < w; b++) a.push(new Qo(r[b], !1));
      if (ia.numMultiPolys = a.length, ia.type === "difference") {
        let b = a[0], w = 1;
        for (; w < a.length; ) Lo(a[w].bbox, b.bbox) !== null ? w++ : a.splice(w, 1);
      }
      if (ia.type === "intersection") for (let b = 0, w = a.length; b < w; b++) {
        let O = a[b];
        for (let S = b + 1, U = a.length; S < U; S++) if (Lo(O.bbox, a[S].bbox) === null) return [];
      }
      let o = new _s(Ui.compare);
      for (let b = 0, w = a.length; b < w; b++) {
        let O = a[b].getSweepEvents();
        for (let S = 0, U = O.length; S < U; S++) o.add(O[S]);
      }
      let u = new ru(o), f = null;
      for (o.size != 0 && (f = o.first(), o.delete(f)); f; ) {
        let b = u.process(f);
        for (let w = 0, O = b.length; w < O; w++) {
          let S = b[w];
          S.consumedBy === void 0 && o.add(S);
        }
        o.size != 0 ? (f = o.first(), o.delete(f)) : f = null;
      }
      Qi.reset();
      let _ = iu.factory(u.segments);
      return new nu(_).getGeom();
    }
  }, ia = new au(), ys = ia, su = 0, vs = class Ps {
    constructor(i, r, a, o) {
      Rt(this, "id");
      Rt(this, "leftSE");
      Rt(this, "rightSE");
      Rt(this, "rings");
      Rt(this, "windings");
      Rt(this, "ringOut");
      Rt(this, "consumedBy");
      Rt(this, "prev");
      Rt(this, "_prevInResult");
      Rt(this, "_beforeState");
      Rt(this, "_afterState");
      Rt(this, "_isInResult");
      this.id = ++su, this.leftSE = i, i.segment = this, i.otherSE = r, this.rightSE = r, r.segment = this, r.otherSE = i, this.rings = a, this.windings = o;
    }
    static compare(i, r) {
      let a = i.leftSE.point.x, o = r.leftSE.point.x, u = i.rightSE.point.x, f = r.rightSE.point.x;
      if (f.isLessThan(a)) return 1;
      if (u.isLessThan(o)) return -1;
      let _ = i.leftSE.point.y, b = r.leftSE.point.y, w = i.rightSE.point.y, O = r.rightSE.point.y;
      if (a.isLessThan(o)) {
        if (b.isLessThan(_) && b.isLessThan(w)) return 1;
        if (b.isGreaterThan(_) && b.isGreaterThan(w)) return -1;
        let S = i.comparePoint(r.leftSE.point);
        if (S < 0) return 1;
        if (S > 0) return -1;
        let U = r.comparePoint(i.rightSE.point);
        return U !== 0 ? U : -1;
      }
      if (a.isGreaterThan(o)) {
        if (_.isLessThan(b) && _.isLessThan(O)) return -1;
        if (_.isGreaterThan(b) && _.isGreaterThan(O)) return 1;
        let S = r.comparePoint(i.leftSE.point);
        if (S !== 0) return S;
        let U = i.comparePoint(r.rightSE.point);
        return U < 0 ? 1 : U > 0 ? -1 : 1;
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
        let S = w.minus(_), U = u.minus(a), W = O.minus(b), lt = f.minus(o);
        if (S.isGreaterThan(U) && W.isLessThan(lt)) return 1;
        if (S.isLessThan(U) && W.isGreaterThan(lt)) return -1;
      }
      return u.isGreaterThan(f) ? 1 : u.isLessThan(f) || w.isLessThan(O) ? -1 : w.isGreaterThan(O) ? 1 : i.id < r.id ? -1 : i.id > r.id ? 1 : 0;
    }
    static fromRing(i, r, a) {
      let o, u, f, _ = Ui.comparePoints(i, r);
      if (_ < 0) o = i, u = r, f = 1;
      else if (_ > 0) o = r, u = i, f = -1;
      else throw new Error(`Tried to create degenerate segment at [${i.x}, ${i.y}]`);
      let b = new Ui(o, !0), w = new Ui(u, !1);
      return new Ps(b, w, [a], [f]);
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
      return Qi.orient(this.leftSE.point, i, this.rightSE.point);
    }
    getIntersection(i) {
      let r = this.bbox(), a = i.bbox(), o = Lo(r, a);
      if (o === null) return null;
      let u = this.leftSE.point, f = this.rightSE.point, _ = i.leftSE.point, b = i.rightSE.point, w = ea(r, _) && this.comparePoint(_) === 0, O = ea(a, u) && i.comparePoint(u) === 0, S = ea(r, b) && this.comparePoint(b) === 0, U = ea(a, f) && i.comparePoint(f) === 0;
      if (O && w) return U && !S ? f : !U && S ? b : null;
      if (O) return S && u.x.eq(b.x) && u.y.eq(b.y) ? null : u;
      if (w) return U && f.x.eq(_.x) && f.y.eq(_.y) ? null : _;
      if (U && S) return null;
      if (U) return f;
      if (S) return b;
      let W = eu(u, this.vector(), _, i.vector());
      return W === null || !ea(o, W) ? null : Qi.snap(W);
    }
    split(i) {
      let r = [], a = i.events !== void 0, o = new Ui(i, !0), u = new Ui(i, !1), f = this.rightSE;
      this.replaceRightSE(u), r.push(u), r.push(o);
      let _ = new Ps(o, f, this.rings.slice(), this.windings.slice());
      return Ui.comparePoints(_.leftSE.point, _.rightSE.point) > 0 && _.swapEvents(), Ui.comparePoints(this.leftSE.point, this.rightSE.point) > 0 && this.swapEvents(), a && (o.checkForConsuming(), u.checkForConsuming()), r;
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
      let o = Ps.compare(r, a);
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
          let _ = a.rings[u], b = a.windings[u], w = r.rings.indexOf(_);
          w === -1 ? (r.rings.push(_), r.windings.push(b)) : r.windings[w] += b;
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
        let w = this.rings[_], O = this.windings[_], S = r.indexOf(w);
        S === -1 ? (r.push(w), a.push(O)) : a[S] += O;
      }
      let u = [], f = [];
      for (let _ = 0, b = r.length; _ < b; _++) {
        if (a[_] === 0) continue;
        let w = r[_], O = w.poly;
        if (f.indexOf(O) === -1) if (w.isExterior) u.push(O);
        else {
          f.indexOf(O) === -1 && f.push(O);
          let S = u.indexOf(w.poly);
          S !== -1 && u.splice(S, 1);
        }
      }
      for (let _ = 0, b = u.length; _ < b; _++) {
        let w = u[_].multiPoly;
        o.indexOf(w) === -1 && o.push(w);
      }
      return this._afterState;
    }
    isInResult() {
      if (this.consumedBy) return !1;
      if (this._isInResult !== void 0) return this._isInResult;
      let i = this.beforeState().multiPolys, r = this.afterState().multiPolys;
      switch (ys.type) {
        case "union": {
          let a = i.length === 0, o = r.length === 0;
          this._isInResult = a !== o;
          break;
        }
        case "intersection": {
          let a, o;
          i.length < r.length ? (a = i.length, o = r.length) : (a = r.length, o = i.length), this._isInResult = o === ys.numMultiPolys && a < o;
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
  }, Yo = class {
    constructor(e, i, r) {
      Rt(this, "poly");
      Rt(this, "isExterior");
      Rt(this, "segments");
      Rt(this, "bbox");
      if (!Array.isArray(e) || e.length === 0) throw new Error("Input geometry is not a valid Polygon or MultiPolygon");
      if (this.poly = i, this.isExterior = r, this.segments = [], typeof e[0][0] != "number" || typeof e[0][1] != "number") throw new Error("Input geometry is not a valid Polygon or MultiPolygon");
      let a = Qi.snap({ x: new $i(e[0][0]), y: new $i(e[0][1]) });
      this.bbox = { ll: { x: a.x, y: a.y }, ur: { x: a.x, y: a.y } };
      let o = a;
      for (let u = 1, f = e.length; u < f; u++) {
        if (typeof e[u][0] != "number" || typeof e[u][1] != "number") throw new Error("Input geometry is not a valid Polygon or MultiPolygon");
        let _ = Qi.snap({ x: new $i(e[u][0]), y: new $i(e[u][1]) });
        _.x.eq(o.x) && _.y.eq(o.y) || (this.segments.push(vs.fromRing(o, _, this)), _.x.isLessThan(this.bbox.ll.x) && (this.bbox.ll.x = _.x), _.y.isLessThan(this.bbox.ll.y) && (this.bbox.ll.y = _.y), _.x.isGreaterThan(this.bbox.ur.x) && (this.bbox.ur.x = _.x), _.y.isGreaterThan(this.bbox.ur.y) && (this.bbox.ur.y = _.y), o = _);
      }
      (!a.x.eq(o.x) || !a.y.eq(o.y)) && this.segments.push(vs.fromRing(o, a, this));
    }
    getSweepEvents() {
      let e = [];
      for (let i = 0, r = this.segments.length; i < r; i++) {
        let a = this.segments[i];
        e.push(a.leftSE), e.push(a.rightSE);
      }
      return e;
    }
  }, ou = class {
    constructor(e, i) {
      Rt(this, "multiPoly");
      Rt(this, "exteriorRing");
      Rt(this, "interiorRings");
      Rt(this, "bbox");
      if (!Array.isArray(e)) throw new Error("Input geometry is not a valid Polygon or MultiPolygon");
      this.exteriorRing = new Yo(e[0], this, !0), this.bbox = { ll: { x: this.exteriorRing.bbox.ll.x, y: this.exteriorRing.bbox.ll.y }, ur: { x: this.exteriorRing.bbox.ur.x, y: this.exteriorRing.bbox.ur.y } }, this.interiorRings = [];
      for (let r = 1, a = e.length; r < a; r++) {
        let o = new Yo(e[r], this, !1);
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
  }, Qo = class {
    constructor(e, i) {
      Rt(this, "isSubject");
      Rt(this, "polys");
      Rt(this, "bbox");
      if (!Array.isArray(e)) throw new Error("Input geometry is not a valid Polygon or MultiPolygon");
      try {
        typeof e[0][0][0] == "number" && (e = [e]);
      } catch {
      }
      this.polys = [], this.bbox = { ll: { x: new $i(Number.POSITIVE_INFINITY), y: new $i(Number.POSITIVE_INFINITY) }, ur: { x: new $i(Number.NEGATIVE_INFINITY), y: new $i(Number.NEGATIVE_INFINITY) } };
      for (let r = 0, a = e.length; r < a; r++) {
        let o = new ou(e[r], this);
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
  }, lu = (e, ...i) => ys.run("intersection", e, i), uu = (e, ...i) => ys.run("difference", e, i);
  Qi.set;
  function bs(e) {
    let i = { type: "Feature" };
    return i.geometry = e, i;
  }
  function xs(e) {
    return e.type === "Feature" ? e.geometry : e;
  }
  function tl(e) {
    return e && e.geometry && e.geometry.coordinates ? e.geometry.coordinates : e;
  }
  function hu(e) {
    return bs({ type: "LineString", coordinates: e });
  }
  function cu(e) {
    return bs({ type: "MultiLineString", coordinates: e });
  }
  function el(e) {
    return bs({ type: "Polygon", coordinates: e });
  }
  function il(e) {
    return bs({ type: "MultiPolygon", coordinates: e });
  }
  function du(e, i) {
    let r = xs(e), a = xs(i), o = lu(r.coordinates, a.coordinates);
    return o.length === 0 ? null : o.length === 1 ? el(o[0]) : il(o);
  }
  function fu(e, i) {
    let r = xs(e), a = xs(i), o = uu(r.coordinates, a.coordinates);
    return o.length === 0 ? null : o.length === 1 ? el(o[0]) : il(o);
  }
  function nl(e) {
    return Array.isArray(e) ? 1 + nl(e[0]) : -1;
  }
  function pu(e) {
    e instanceof L.Polyline && (e = e.toGeoJSON(15));
    let i = tl(e), r = nl(i), a = [];
    return r > 1 ? i.forEach((o) => {
      a.push(hu(o));
    }) : a.push(e), a;
  }
  function _u(e) {
    let i = [];
    return e.eachLayer((r) => {
      i.push(tl(r.toGeoJSON(15)));
    }), cu(i);
  }
  Se.Cut = Se.Polygon.extend({ initialize(e) {
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
        let o = !!ii(e.toGeoJSON(15), a.toGeoJSON(15)).features.length > 0;
        return o || a instanceof L.Polyline && !(a instanceof L.Polygon) ? o : !!du(e.toGeoJSON(15), a.toGeoJSON(15));
      } catch {
        return a instanceof L.Polygon && console.error("You can't cut polygons with self-intersections"), !1;
      }
    }).forEach((a) => {
      let o;
      if (a instanceof L.Polygon) {
        o = L.polygon(a.getLatLngs());
        let b = o.getLatLngs();
        r.forEach((w) => {
          if (w && w.snapInfo) {
            let { latlng: O } = w, S = this._calcClosestLayer(O, [o]);
            if (S && S.segment && S.distance < this.options.snapDistance) {
              let { segment: U } = S;
              if (U && U.length === 2) {
                let { indexPath: W, parentPath: lt, newIndex: yt } = L.PM.Utils._getIndexFromSegment(b, U);
                (W.length > 1 ? (0, vo.default)(b, lt) : b).splice(yt, 0, O);
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
    if (i instanceof L.Polygon) a = fu(i.toGeoJSON(15), e.toGeoJSON(15));
    else {
      let o = pu(i);
      o.forEach((u) => {
        let f = go(u, e.toGeoJSON(15)), _;
        f && f.features.length > 0 ? _ = L.geoJSON(f) : _ = L.geoJSON(u), _.getLayers().forEach((b) => {
          hs(e.toGeoJSON(15), b.toGeoJSON(15)) || b.addTo(r);
        });
      }), o.length > 1 ? a = _u(r) : a = r.toGeoJSON(15);
    }
    return a;
  }, _change: L.Util.falseFn }), Se.Text = Se.extend({ initialize(e) {
    this._map = e, this._shape = "Text", this.toolbarButtonName = "drawText";
  }, enable(e) {
    L.Util.setOptions(this, e), this._enabled = !0, this._map.on("click", this._createMarker, this), this._map.pm.Toolbar.toggleButton(this.toolbarButtonName, !0), this._hintMarker = L.marker(this._map.getCenter(), { interactive: !1, zIndexOffset: 100, icon: L.divIcon({ className: "marker-icon cursor-marker" }) }), this._setPane(this._hintMarker, "vertexPane"), this._hintMarker._pmTempLayer = !0, this._hintMarker.addTo(this._map), this.options.cursorMarker && L.DomUtil.addClass(this._hintMarker._icon, "visible"), this.options.tooltips && this._hintMarker.bindTooltip(ne("tooltips.placeText"), { permanent: !0, offset: L.point(0, 10), direction: "bottom", opacity: 0.8 }).openTooltip(), this._layer = this._hintMarker, this._map.on("mousemove", this._syncHintMarker, this), this._map.getContainer().classList.add("geoman-draw-cursor"), this._fireDrawStart(), this._setGlobalDrawMode();
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
  var gu = { enableLayerDrag() {
    if (!this.options.draggable || !this._layer._map) return;
    this.disable(), this._layerDragEnabled = !0, this._map || (this._map = this._layer._map), (this._layer instanceof L.Marker || this._layer instanceof L.ImageOverlay) && L.DomEvent.on(this._getDOMElem(), "dragstart", this._stopDOMImageDrag), this._layer.dragging && this._layer.dragging.disable(), this._tempDragCoord = null, cn(this._layer) instanceof L.Canvas ? (this._layer.on("mouseout", this.removeDraggingClass, this), this._layer.on("mouseover", this.addDraggingClass, this)) : this.addDraggingClass(), this._originalMapDragState = this._layer._map.dragging._enabled, this._safeToCacheDragState = !0;
    let e = this._getDOMElem();
    e && (cn(this._layer) instanceof L.Canvas ? (this._layer.on("touchstart mousedown", this._dragMixinOnMouseDown, this), this._map.pm._addTouchEvents(e)) : L.DomEvent.on(e, "touchstart mousedown", this._simulateMouseDownEvent, this)), this._fireDragEnable();
  }, disableLayerDrag() {
    this._layerDragEnabled = !1, cn(this._layer) instanceof L.Canvas ? (this._layer.off("mouseout", this.removeDraggingClass, this), this._layer.off("mouseover", this.addDraggingClass, this)) : this.removeDraggingClass(), this._originalMapDragState && this._dragging && this._map.dragging.enable(), this._safeToCacheDragState = !1, this._layer.dragging && this._layer.dragging.disable();
    let e = this._getDOMElem();
    e && (cn(this._layer) instanceof L.Canvas ? (this._layer.off("touchstart mousedown", this._dragMixinOnMouseDown, this), this._map.pm._removeTouchEvents(e)) : L.DomEvent.off(e, "touchstart mousedown", this._simulateMouseDownEvent, this)), this._layerDragged && this._fireUpdate(), this._layerDragged = !1, this._fireDragDisable();
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
  } }, mu = gu, yu = k(Ii());
  function vu(e, i, r, a) {
    return r.unproject(i.transform(r.project(e, a)), a);
  }
  function rl(e, i, r) {
    let a = r.getMaxZoom();
    if (a === 1 / 0 && (a = r.getZoom()), L.Util.isArray(e)) {
      let o = [];
      return e.forEach((u) => {
        o.push(rl(u, i, r));
      }), o;
    }
    return e instanceof L.LatLng ? vu(e, i, r, a) : null;
  }
  function dr(e, i) {
    i instanceof L.Layer && (i = i.getLatLng());
    let r = e.getMaxZoom();
    return r === 1 / 0 && (r = e.getZoom()), e.project(i, r);
  }
  function Ls(e, i) {
    let r = e.getMaxZoom();
    return r === 1 / 0 && (r = e.getZoom()), e.unproject(i, r);
  }
  var bu = { _onRotateStart(e) {
    this._preventRenderingMarkers(!0), this._rotationOriginLatLng = this._getRotationCenter().clone(), this._rotationOriginPoint = dr(this._map, this._rotationOriginLatLng), this._rotationStartPoint = dr(this._map, e.target.getLatLng()), this._initialRotateLatLng = Li(this._layer), this._startAngle = this.getAngle();
    let i = Li(this._rotationLayer, this._rotationLayer.pm._rotateOrgLatLng);
    this._fireRotationStart(this._rotationLayer, i), this._fireRotationStart(this._map, i);
  }, _onRotate(e) {
    let i = dr(this._map, e.target.getLatLng()), r = this._rotationStartPoint, a = this._rotationOriginPoint, o = Math.atan2(i.y - a.y, i.x - a.x) - Math.atan2(r.y - a.y, r.x - a.x);
    this._layer.setLatLngs(this._rotateLayer(o, this._initialRotateLatLng, this._rotationOriginLatLng, L.PM.Matrix.init(), this._map));
    let u = this;
    function f(O, S = [], U = -1) {
      if (U > -1 && S.push(U), L.Util.isArray(O[0])) O.forEach((W, lt) => f(W, S.slice(), lt));
      else {
        let W = S.length > 0 ? (0, yu.default)(u._markers, S) : u._markers[0];
        O.forEach((lt, yt) => {
          W[yt].setLatLng(lt);
        });
      }
    }
    f(this._layer.getLatLngs());
    let _ = Li(this._rotationLayer);
    this._rotationLayer.setLatLngs(this._rotateLayer(o, this._rotationLayer.pm._rotateOrgLatLng, this._rotationOriginLatLng, L.PM.Matrix.init(), this._map));
    let b = o * 180 / Math.PI;
    b = b < 0 ? b + 360 : b;
    let w = b + this._startAngle;
    this._setAngle(w), this._rotationLayer.pm._setAngle(w), this._fireRotation(this._rotationLayer, b, _), this._fireRotation(this._map, b, _), this._rotationLayer.pm._fireChange(this._rotationLayer.getLatLngs(), "Rotation");
  }, _onRotateEnd() {
    let e = this._startAngle;
    delete this._rotationOriginLatLng, delete this._rotationOriginPoint, delete this._rotationStartPoint, delete this._initialRotateLatLng, delete this._startAngle;
    let i = Li(this._rotationLayer, this._rotationLayer.pm._rotateOrgLatLng);
    this._rotationLayer.pm._rotateOrgLatLng = Li(this._rotationLayer), this._fireRotationEnd(this._rotationLayer, e, i), this._fireRotationEnd(this._map, e, i), this._rotationLayer.pm._fireEdit(this._rotationLayer, "Rotation"), this._preventRenderingMarkers(!1), this._layerRotated = !0;
  }, _rotateLayer(e, i, r, a, o) {
    let u = dr(o, r);
    return this._matrix = a.clone().rotate(e, u).flip(), rl(i, this._matrix, o);
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
    this.rotateEnabled() && this.disableRotate(), this._layer instanceof L.Rectangle && this._angle === void 0 && this.setInitAngle(Nr(this._layer._map, this._layer.getLatLngs()[0][0], this._layer.getLatLngs()[0][1]) || 0);
    let e = { fill: !1, stroke: !1, pmIgnore: !1, snapIgnore: !0 };
    this._rotatePoly = L.polygon(this._layer.getLatLngs(), e), this._rotatePoly._pmTempLayer = !0, this._rotatePoly.addTo(this._layer._map), this._rotatePoly.pm._setAngle(this.getAngle()), this._rotatePoly.pm.setRotationCenter(this.getRotationCenter()), this._rotatePoly.pm.setOptions(this._layer._map.pm.getGlobalOptions()), this._rotatePoly.pm.setOptions({ rotate: !0, snappable: !1, hideMiddleMarkers: !0 }), this._rotatePoly.pm._rotationLayer = this._layer, this._rotatePoly.pm.enable(), this._rotateOrgLatLng = Li(this._layer), this._rotateEnabled = !0, this._layer.on("remove", this.disableRotate, this), this._fireRotationEnable(this._layer), this._fireRotationEnable(this._layer._map);
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
  } }, xu = bu, Lu = L.Class.extend({ includes: [mu, Ga, xu, An], options: { snappable: !0, snapDistance: 20, allowSelfIntersection: !0, allowSelfIntersectionEdit: !1, preventMarkerRemoval: !1, removeLayerBelowMinVertexCount: !0, limitMarkersToCount: -1, hideMiddleMarkers: !1, snapSegment: !0, syncLayersOnDrag: !1, draggable: !0, allowEditing: !0, allowRemoval: !0, allowCutting: !0, allowRotation: !0, addVertexOn: "click", removeVertexOn: "contextmenu", removeVertexValidation: void 0, addVertexValidation: void 0, moveVertexValidation: void 0, resizeableCircleMarker: !1, resizeableCircle: !0, snapMiddle: !1, snapVertex: !0 }, setOptions(e) {
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
  } }), Fe = Lu;
  Fe.LayerGroup = L.Class.extend({ initialize(e) {
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
  } }), Fe.Marker = Fe.extend({ _shape: "Marker", initialize(e) {
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
  var bn = k(Ii()), wu = { filterMarkerGroup() {
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
  } }, Cu = wu;
  Fe.Line = Fe.extend({ includes: [Cu], _shape: "Line", initialize(e) {
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
    let { indexPath: u, index: f, parentPath: _ } = L.PM.Utils.findDeepMarkerIndex(this._markers, i), b = u.length > 1 ? (0, bn.default)(o, _) : o, w = u.length > 1 ? (0, bn.default)(this._markers, _) : this._markers;
    b.splice(f + 1, 0, a), w.splice(f + 1, 0, e), this._layer.setLatLngs(o), this.options.hideMiddleMarkers !== !0 && (this._createMiddleMarker(i, e), this._createMiddleMarker(e, r)), this._fireEdit(), this._layerEdited = !0, this._fireChange(this._layer.getLatLngs(), "Edit"), this._fireVertexAdded(e, L.PM.Utils.findDeepMarkerIndex(this._markers, e).indexPath, a), this.options.snappable && this._initSnappableMarkers();
  }, hasSelfIntersection() {
    return ir(this._layer.toGeoJSON(15)).features.length > 0;
  }, _handleSelfIntersectionOnVertexRemoval() {
    this._handleLayerStyle(!0) && (this._layer.setLatLngs(this._coordsBeforeEdit), this._coordsBeforeEdit = null, this._initMarkers());
  }, _handleLayerStyle(e) {
    let i = this._layer, r, a;
    if (this.options.allowSelfIntersection ? r = !1 : (a = ir(this._layer.toGeoJSON(15)), r = a.features.length > 0), r) {
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
    this.options.allowSelfIntersection || (this._coordsBeforeEdit = Li(this._layer, this._layer.getLatLngs()));
    let r = this._layer.getLatLngs(), { indexPath: a, index: o, parentPath: u } = L.PM.Utils.findDeepMarkerIndex(this._markers, i);
    if (!a) return;
    let f = a.length > 1 ? (0, bn.default)(r, u) : r, _ = a.length > 1 ? (0, bn.default)(this._markers, u) : this._markers, b = u[u.length - 1] > 0 && this._layer instanceof L.Polygon;
    if (!this.options.removeLayerBelowMinVertexCount && !b && (f.length <= 2 || this.isPolygon() && f.length <= 3)) {
      this._flashLayer();
      return;
    }
    f.splice(o, 1), this._layer.setLatLngs(r), this.isPolygon() && f.length <= 2 && f.splice(0, f.length);
    let w = !1;
    if (f.length <= 1 && (f.splice(0, f.length), u.length > 1 && a.length > 1 && (r = tr(r)), this._layer.setLatLngs(r), this._initMarkers(), w = !0), ie(r) || this._layer.remove(), r = tr(r), this._layer.setLatLngs(r), this._markers = tr(this._markers), !w && (_ = a.length > 1 ? (0, bn.default)(this._markers, u) : this._markers, i._middleMarkerPrev && (this._markerGroup.removeLayer(i._middleMarkerPrev), this._removeFromCache(i._middleMarkerPrev)), i._middleMarkerNext && (this._markerGroup.removeLayer(i._middleMarkerNext), this._removeFromCache(i._middleMarkerNext)), this._markerGroup.removeLayer(i), this._removeFromCache(i), _)) {
      let O, S;
      if (this.isPolygon() ? (O = (o + 1) % _.length, S = (o + (_.length - 1)) % _.length) : (S = o - 1 < 0 ? void 0 : o - 1, O = o + 1 >= _.length ? void 0 : o + 1), O !== S) {
        let U = _[S], W = _[O];
        this.options.hideMiddleMarkers !== !0 && this._createMiddleMarker(U, W);
      }
      _.splice(o, 1);
    }
    this._fireEdit(), this._layerEdited = !0, this._fireVertexRemoved(i, a), this._fireChange(this._layer.getLatLngs(), "Edit");
  }, updatePolygonCoordsFromMarkerDrag(e) {
    let i = this._layer.getLatLngs(), r = e.getLatLng(), { indexPath: a, index: o, parentPath: u } = L.PM.Utils.findDeepMarkerIndex(this._markers, e), f = a.length > 1 ? (0, bn.default)(i, u) : i;
    r.alt = f[o].alt, f.splice(o, 1, r), this._layer.setLatLngs(i);
  }, _getNeighborMarkers(e) {
    let { indexPath: i, index: r, parentPath: a } = L.PM.Utils.findDeepMarkerIndex(this._markers, e), o = i.length > 1 ? (0, bn.default)(this._markers, a) : this._markers, u = (r + 1) % o.length, f = (r + (o.length - 1)) % o.length, _ = o[f], b = o[u];
    return { prevMarker: _, nextMarker: b };
  }, _checkMarkerAllowedToDrag(e) {
    let { prevMarker: i, nextMarker: r } = this._getNeighborMarkers(e), a = L.polyline([i.getLatLng(), e.getLatLng()]), o = L.polyline([e.getLatLng(), r.getLatLng()]), u = ii(this._layer.toGeoJSON(15), a.toGeoJSON(15)).features.filter((_) => {
      let b = _.geometry.coordinates, w = L.latLng(b[1], b[0]);
      return !w.equals(i.getLatLng()) && !w.equals(e.getLatLng());
    }).length, f = ii(this._layer.toGeoJSON(15), o.toGeoJSON(15)).features.filter((_) => {
      let b = _.geometry.coordinates, w = L.latLng(b[1], b[0]);
      return !w.equals(r.getLatLng()) && !w.equals(e.getLatLng());
    }).length;
    return !(u < 1 && f < 1);
  }, _onMarkerDragStart(e) {
    let i = e.target;
    if (this._preventRenderingMarkers(!0), this.cachedColor || (this.cachedColor = this._layer.options.color), !this._vertexValidation("move", e)) return;
    let { indexPath: r } = L.PM.Utils.findDeepMarkerIndex(this._markers, i);
    this._fireMarkerDragStart(e, r), this.options.allowSelfIntersection || (this._coordsBeforeEdit = Li(this._layer, this._layer.getLatLngs())), !this.options.allowSelfIntersection && this.options.allowSelfIntersectionEdit && this.hasSelfIntersection() ? this._markerAllowedToDrag = this._checkMarkerAllowedToDrag(i) : this._markerAllowedToDrag = null;
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
    let u = r.length > 1 ? (0, bn.default)(this._markers, o) : this._markers, f = (a + 1) % u.length, _ = (a + (u.length - 1)) % u.length, b = i.getLatLng(), w = u[_].getLatLng(), O = u[f].getLatLng();
    if (i._middleMarkerNext) {
      let S = L.PM.Utils.calcMiddleLatLng(this._map, b, O);
      i._middleMarkerNext.setLatLng(S);
    }
    if (i._middleMarkerPrev) {
      let S = L.PM.Utils.calcMiddleLatLng(this._map, b, w);
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
  } }), Fe.Polygon = Fe.Line.extend({ _shape: "Polygon", _checkMarkerAllowedToDrag(e) {
    let { prevMarker: i, nextMarker: r } = this._getNeighborMarkers(e), a = L.polyline([i.getLatLng(), e.getLatLng()]), o = L.polyline([e.getLatLng(), r.getLatLng()]), u = ii(this._layer.toGeoJSON(15), a.toGeoJSON(15)).features.filter((_) => {
      let b = _.geometry.coordinates, w = L.latLng(b[1], b[0]);
      return !w.equals(i.getLatLng()) && !w.equals(e.getLatLng());
    }).length, f = ii(this._layer.toGeoJSON(15), o.toGeoJSON(15)).features.filter((_) => {
      let b = _.geometry.coordinates, w = L.latLng(b[1], b[0]);
      return !w.equals(r.getLatLng()) && !w.equals(e.getLatLng());
    }).length;
    return !(u < 1 && f < 1);
  } }), Fe.Rectangle = Fe.Polygon.extend({ _shape: "Rectangle", _initMarkers() {
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
    this._angle === void 0 && this.setInitAngle(Nr(this._map, this._layer.getLatLngs()[0][0], this._layer.getLatLngs()[0][1]) || 0);
    let e = this._layer.getLatLngs()[0];
    return L.PM.Utils._getRotatedRectangle(e[0], e[2], this.getAngle(), this._map || this);
  } }), Fe.CircleMarker = Fe.extend({ _shape: "CircleMarker", initialize(e) {
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
    return this.options[this._minRadiusOption] && r < this.options[this._minRadiusOption] ? i = hn(this._map, e, i, this._getMinDistanceInMeter(e)) : this.options[this._maxRadiusOption] && r > this.options[this._maxRadiusOption] && (i = hn(this._map, e, i, this._getMaxDistanceInMeter(e))), i;
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
  } }), Fe.Circle = Fe.CircleMarker.extend({ _shape: "Circle", initialize(e) {
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
  } }), Fe.ImageOverlay = Fe.extend({ _shape: "ImageOverlay", initialize(e) {
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
  } }), Fe.Text = Fe.extend({ _shape: "Text", initialize(e) {
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
  var wo = function(e, i, r, a, o, u) {
    this._matrix = [e, i, r, a, o, u];
  };
  wo.init = () => new L.PM.Matrix(1, 0, 0, 1, 0, 0), wo.prototype = { transform(e) {
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
    let f = [[], [], []], _ = this._matrix, b = [[_[0], _[2], _[4]], [_[1], _[3], _[5]], [0, 0, 1]], w = [[e, r, o], [i, a, u], [0, 0, 1]], O;
    e && e instanceof L.PM.Matrix && (_ = e._matrix, w = [[_[0], _[2], _[4]], [_[1], _[3], _[5]], [0, 0, 1]]);
    for (let S = 0; S < 3; S += 1) for (let U = 0; U < 3; U += 1) {
      O = 0;
      for (let W = 0; W < 3; W += 1) O += b[S][W] * w[W][U];
      f[S][U] = O;
    }
    return this._matrix = [f[0][0], f[1][0], f[0][1], f[1][1], f[0][2], f[1][2]], this;
  } };
  var ku = wo, Eu = { calcMiddleLatLng(e, i, r) {
    let a = e.project(i), o = e.project(r);
    return e.unproject(a._add(o)._divideBy(2));
  }, findLayers(e) {
    let i = [];
    return e.eachLayer((r) => {
      (r instanceof L.Polyline || r instanceof L.Marker || r instanceof L.Circle || r instanceof L.CircleMarker || r instanceof L.ImageOverlay) && i.push(r);
    }), i = i.filter((r) => !!r.pm), i = i.filter((r) => !r._pmTempLayer), i = i.filter((r) => !L.PM.optIn && !r.options.pmIgnore || L.PM.optIn && r.options.pmIgnore === !1), i;
  }, circleToPolygon(e, i = 60, r = !0) {
    let a = e.getLatLng(), o = e.getRadius(), u = un(a, o, i, 0, r), f = [];
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
  }, createGeodesicPolygon: un, getTranslation: ne, findDeepCoordIndex(e, i, r = !0) {
    let a, o = (f) => (_, b) => {
      let w = f.concat(b);
      if (r) {
        if (_.lat && _.lat === i.lat && _.lng === i.lng) return a = w, !0;
      } else if (_.lat && L.latLng(_).equals(i)) return a = w, !0;
      return Array.isArray(_) && _.some(o(w));
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
    let o = dr(a, e), u = dr(a, i), f = r * Math.PI / 180, _ = Math.cos(f), b = Math.sin(f), w = (u.x - o.x) * _ + (u.y - o.y) * b, O = (u.y - o.y) * _ - (u.x - o.x) * b, S = w * _ + o.x, U = w * b + o.y, W = -O * b + o.x, lt = O * _ + o.y, yt = Ls(a, o), Ct = Ls(a, { x: S, y: U }), Bt = Ls(a, u), T = Ls(a, { x: W, y: lt });
    return [yt, Ct, Bt, T];
  }, pxRadiusToMeterRadius(e, i, r) {
    let a = i.project(r), o = L.point(a.x + e, a.y);
    return i.distance(i.unproject(o), r);
  } }, Mu = Eu;
  L.PM = L.PM || { version: ye.version, Map: di, Toolbar: Ua, Draw: Se, Edit: Fe, Utils: Mu, Matrix: ku, activeLang: "en", optIn: !1, initialize(e) {
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
const Ah = { class: "field map-field" }, Th = { class: "map-label" }, Dh = { class: "map-toolbar" }, Ih = ["title"], Oh = ["title"], Fh = {
  key: 0,
  class: "map-wkt"
}, Rh = {
  key: 1,
  class: "map-hint"
}, Nh = {
  __name: "MapField",
  props: {
    field: Object,
    lang: String,
    modelValue: { type: String, default: "" }
  },
  emits: ["update:modelValue"],
  setup(h, { emit: l }) {
    delete aa.Icon.Default.prototype._getIconUrl, aa.Icon.Default.mergeOptions({
      iconRetinaUrl: new URL("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAABSCAMAAAAhFXfZAAAC91BMVEVMaXEzeak2f7I4g7g3g7cua5gzeKg8hJo3grY4g7c3grU0gLI2frE0daAubJc2gbQwd6QzeKk2gLMtd5sxdKIua5g1frA2f7IydaM0e6w2fq41fK01eqo3grgubJgta5cxdKI1f7AydaQydaMxc6EubJgvbJkwcZ4ubZkwcJwubZgubJcydqUydKIxapgubJctbJcubZcubJcvbJYubJcvbZkubJctbJctbZcubJg2f7AubJcrbZcubJcubJcua5g3grY0fq8ubJcubJdEkdEwhsw6i88vhswuhcsuhMtBjMgthMsrg8srgss6is8qgcs8i9A9iMYtg8spgcoogMo7hcMngMonf8olfso4gr8kfck5iM8jfMk4iM8he8k1fro7itAgesk2hs8eecgzfLcofssdeMg0hc4cd8g2hcsxeLQbdsgZdcgxeLImfcszhM0vda4xgckzhM4xg84wf8Yxgs4udKsvfcQucqhUndROmdM1fK0wcZ8vb5w0eqpQm9MzeKhXoNVcpdYydKNWn9VZotVKltJFjsIwcJ1Rms9OlslLmtH///8+kc9epdYzd6dbo9VHkMM2f7FHmNBClM8ydqVcpNY9hro3gLM9hLczealQmcw3fa46f7A8gLMxc6I3eagyc6FIldJMl9JSnNRSntNNl9JPnNJFi75UnM9ZodVKksg8kM45jc09e6ZHltFBk883gbRBh7pDk9EwcaBzn784g7dKkcY2i81Om9M7j85Llc81is09g7Q4grY/j9A0eqxKmdFFltBEjcXf6fFImdBCiLxJl9FGlNFBi78yiMxVndEvbpo6js74+vx+psPP3+o/ks5HkcpGmNCjwdZCkNDM3ehYoNJEls+lxNkxh8xHks0+jdC1zd5Lg6r+/v/H2ufz9/o3jM3t8/edvdM/k89Th61OiLBSjbZklbaTt9BfptdjmL1AicBHj8hGk9FAgK1dkLNTjLRekrdClc/k7fM0icy0y9tgp9c4jc2NtM9Dlc8zicxeXZn3AAAAQ3RSTlMAHDdTb4yPA+LtnEQmC4L2EmHqB7XA0d0sr478x4/Yd5i1zOfyPkf1sLVq4Nh3FvjxopQ2/STNuFzUwFIwxKaejILpIBEV9wAABhVJREFUeF6s1NdyFEcYBeBeoQIhRAkLlRDGrhIgY3BJL8CVeKzuyXFzzjkn5ZxzzuScg3PO8cKzu70JkO0LfxdTU//pM9vTu7Xgf6KqOVTb9X7toRrVEfBf1HTVjZccrT/2by1VV928Yty9ZbVuucdz90frG8DBjl9pVApbOstvmMuvVgaNXSfAAd6pGxpy6yxf5ph43pS/4f3uoaGm2rdu72S9xzOvMymkZFq/ptDrk90mhW7e4zl7HLzhxGWPR20xmSxJ/VqldG5m9XhaVOA1DadsNh3Pu5L2N6QtPO/32JpqQBVVk20oy/Pi2s23WEvyfHbe1thadVQttvm7Llf65gGmXK67XtupyoM7HQhmXdLS8oGWJNeOJ3C5fG5XCEJnkez3/oFdsvgJ4l2ANZwhrJKk/7OSXa+3Vw2WJMlKnGkobouYk6T0TyX30klOUnTD9HJ5qpckL3EW/w4XF3Xd0FGywXUrstrclVsqz5Pd/sXFYyDnPdrLcQODmGOK47IZb4CmibmMn+MYRzFZ5jg33ZL/EJrWcszHmANy3ARBK/IXtciJy8VsitPSdE3uuHxzougojcUdr8/32atnz/ev3f/K5wtpxUTpcaI45zusVDpYtZi+jg0oU9b3x74h7+n9ABvYEZeKaVq0sh0AtLKsFtqNBdeT0MrSzwwlq9+x6xAO4tgOtSzbCjrNQQiNvQUbUEubvzBUeGw26yDCsRHCoLkTHDa7IdOLIThs/gHvChszh2CimE8peRs47cxANI0lYNB5y1DljpOF0IhzBDPOZnDOqYYbeGKECbPzWnXludPphw5c2YBq5zlwXphIbO4VDCZ0gnPfUO1TwZoYwAs2ExPCedAu9DAjfQUjzITQb3jNj0KG2Sgt6BHaQUdYzWz+XmBktOHwanXjaSTcwwziBcuMOtwBmqPrTOxFQR/DRKKPqyur0aiW6cULYsx6tBm0jXpR/AUWR6HRq9WVW6MRhIq5jLyjbaCTDCijyYJNpCajdyobP/eTw0iexBAKkJ3gA5KcQb2zBXsIBckn+xVv8jkZSaEFHE+jFEleAEfayRU0MouNoBmB/L50Ai/HSLIHxcrpCvnhSQAuakKp2C/YbCylJjXRVy/z3+Kv/RrNcCo+WUzlVEhzKffnTQnxeN9fWF88fiNCUdSTsaufaChKWInHeysygfpIqagoakW+vV20J8uyl6TyNKEZWV4oRSPyCkWpgOLSbkCObT8o2r6tlG58HQquf6O0v50tB7JM7F4EORd2dx/K0w/KHsVkLPaoYrwgP/y7krr3SSMA4zj+OBgmjYkxcdIJQyQRKgg2viX9Hddi9UBb29LrKR7CVVEEEXWojUkXNyfTNDE14W9gbHJNuhjDettN3ZvbOvdOqCD3Jp/9l+/wJE+9PkYGjx/fqkys3S2rMozM/o2106rfMUINo6hVqz+eu/hd1c4xTg0TAfy5kV+4UG6+IthHTU9woWmxuKNbTfuCSfovBCxq7EtHqvYL4Sm6F8GVxsSXHMQ07TOi1DKtZxjWaaIyi4CXWjxPccUw8WVbMYY5wxC1mzEyXMJWkllpRloi+Kkoq69sxBTlElF6aAxYUbjXNlhlDZilDnM4U5SlN5biRsRHnbx3mbeWjEh4mEyiuJDl5XcWVmX5GvNkFgLWZM5qwsop4/AWfLhU1cR7k1VVvcYCWRkOI6Xy5gmnphCYIkvzuNYzHzosq2oNk2RtSs8khfUOfHIDgR6ysYBaMpl4uEgk2U/oJTs9AaTSwma7dT69geAE2ZpEjUsn2ieJNHeKfrI3EcAGJ2ZaNgVuC8EBctCLc57P5u5led6IOBkIYkuQMrmmjChs4VkfOerHqSBkPzZlhe06RslZ3zMjk2sscqKwY0RcjKK+LWbzd7KiHhkncs/siFJ+V5eXxD34B8nVuJEpGJNmxN2gH3vSvp7J70tF+D1Ej8qUJD1TkErAND2GZwTFg/LubvmgiBG3SOvdlsqFQrkEzJCL1rstlnVFROixZoDDSuXQFHESwVGlcuQcMb/b42NgjLowh5MTDFE3vNB5qStRIErdCQEh6pLPR92anSUb/wAIhldAaDMpGgAAAABJRU5ErkJggg==", import.meta.url).href,
      iconUrl: new URL("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAApCAYAAADAk4LOAAAFgUlEQVR4Aa1XA5BjWRTN2oW17d3YaZtr2962HUzbDNpjszW24mRt28p47v7zq/bXZtrp/lWnXr337j3nPCe85NcypgSFdugCpW5YoDAMRaIMqRi6aKq5E3YqDQO3qAwjVWrD8Ncq/RBpykd8oZUb/kaJutow8r1aP9II0WmLKLIsJyv1w/kqw9Ch2MYdB++12Onxee/QMwvf4/Dk/Lfp/i4nxTXtOoQ4pW5Aj7wpici1A9erdAN2OH64x8OSP9j3Ft3b7aWkTg/Fm91siTra0f9on5sQr9INejH6CUUUpavjFNq1B+Oadhxmnfa8RfEmN8VNAsQhPqF55xHkMzz3jSmChWU6f7/XZKNH+9+hBLOHYozuKQPxyMPUKkrX/K0uWnfFaJGS1QPRtZsOPtr3NsW0uyh6NNCOkU3Yz+bXbT3I8G3xE5EXLXtCXbbqwCO9zPQYPRTZ5vIDXD7U+w7rFDEoUUf7ibHIR4y6bLVPXrz8JVZEql13trxwue/uDivd3fkWRbS6/IA2bID4uk0UpF1N8qLlbBlXs4Ee7HLTfV1j54APvODnSfOWBqtKVvjgLKzF5YdEk5ewRkGlK0i33Eofffc7HT56jD7/6U+qH3Cx7SBLNntH5YIPvODnyfIXZYRVDPqgHtLs5ABHD3YzLuespb7t79FY34DjMwrVrcTuwlT55YMPvOBnRrJ4VXTdNnYug5ucHLBjEpt30701A3Ts+HEa73u6dT3FNWwflY86eMHPk+Yu+i6pzUpRrW7SNDg5JHR4KapmM5Wv2E8Tfcb1HoqqHMHU+uWDD7zg54mz5/2BSnizi9T1Dg4QQXLToGNCkb6tb1NU+QAlGr1++eADrzhn/u8Q2YZhQVlZ5+CAOtqfbhmaUCS1ezNFVm2imDbPmPng5wmz+gwh+oHDce0eUtQ6OGDIyR0uUhUsoO3vfDmmgOezH0mZN59x7MBi++WDL1g/eEiU3avlidO671bkLfwbw5XV2P8Pzo0ydy4t2/0eu33xYSOMOD8hTf4CrBtGMSoXfPLchX+J0ruSePw3LZeK0juPJbYzrhkH0io7B3k164hiGvawhOKMLkrQLyVpZg8rHFW7E2uHOL888IBPlNZ1FPzstSJM694fWr6RwpvcJK60+0HCILTBzZLFNdtAzJaohze60T8qBzyh5ZuOg5e7uwQppofEmf2++DYvmySqGBuKaicF1blQjhuHdvCIMvp8whTTfZzI7RldpwtSzL+F1+wkdZ2TBOW2gIF88PBTzD/gpeREAMEbxnJcaJHNHrpzji0gQCS6hdkEeYt9DF/2qPcEC8RM28Hwmr3sdNyht00byAut2k3gufWNtgtOEOFGUwcXWNDbdNbpgBGxEvKkOQsxivJx33iow0Vw5S6SVTrpVq11ysA2Rp7gTfPfktc6zhtXBBC+adRLshf6sG2RfHPZ5EAc4sVZ83yCN00Fk/4kggu40ZTvIEm5g24qtU4KjBrx/BTTH8ifVASAG7gKrnWxJDcU7x8X6Ecczhm3o6YicvsLXWfh3Ch1W0k8x0nXF+0fFxgt4phz8QvypiwCCFKMqXCnqXExjq10beH+UUA7+nG6mdG/Pu0f3LgFcGrl2s0kNNjpmoJ9o4B29CMO8dMT4Q5ox8uitF6fqsrJOr8qnwNbRzv6hSnG5wP+64C7h9lp30hKNtKdWjtdkbuPA19nJ7Tz3zR/ibgARbhb4AlhavcBebmTHcFl2fvYEnW0ox9xMxKBS8btJ+KiEbq9zA4RthQXDhPa0T9TEe69gWupwc6uBUphquXgf+/FrIjweHQS4/pduMe5ERUMHUd9xv8ZR98CxkS4F2n3EUrUZ10EYNw7BWm9x1GiPssi3GgiGRDKWRYZfXlON+dfNbM+GgIwYdwAAAAASUVORK5CYII=", import.meta.url).href,
      shadowUrl: new URL("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACkAAAApCAQAAAACach9AAACMUlEQVR4Ae3ShY7jQBAE0Aoz/f9/HTMzhg1zrdKUrJbdx+Kd2nD8VNudfsL/Th///dyQN2TH6f3y/BGpC379rV+S+qqetBOxImNQXL8JCAr2V4iMQXHGNJxeCfZXhSRBcQMfvkOWUdtfzlLgAENmZDcmo2TVmt8OSM2eXxBp3DjHSMFutqS7SbmemzBiR+xpKCNUIRkdkkYxhAkyGoBvyQFEJEefwSmmvBfJuJ6aKqKWnAkvGZOaZXTUgFqYULWNSHUckZuR1HIIimUExutRxwzOLROIG4vKmCKQt364mIlhSyzAf1m9lHZHJZrlAOMMztRRiKimp/rpdJDc9Awry5xTZCte7FHtuS8wJgeYGrex28xNTd086Dik7vUMscQOa8y4DoGtCCSkAKlNwpgNtphjrC6MIHUkR6YWxxs6Sc5xqn222mmCRFzIt8lEdKx+ikCtg91qS2WpwVfBelJCiQJwvzixfI9cxZQWgiSJelKnwBElKYtDOb2MFbhmUigbReQBV0Cg4+qMXSxXSyGUn4UbF8l+7qdSGnTC0XLCmahIgUHLhLOhpVCtw4CzYXvLQWQbJNmxoCsOKAxSgBJno75avolkRw8iIAFcsdc02e9iyCd8tHwmeSSoKTowIgvscSGZUOA7PuCN5b2BX9mQM7S0wYhMNU74zgsPBj3HU7wguAfnxxjFQGBE6pwN+GjME9zHY7zGp8wVxMShYX9NXvEWD3HbwJf4giO4CFIQxXScH1/TM+04kkBiAAAAAElFTkSuQmCC", import.meta.url).href
    });
    const d = h, y = l, C = Jt(() => {
      var H, nt;
      return ((H = d.field.label) == null ? void 0 : H[d.lang]) || ((nt = d.field.label) == null ? void 0 : nt.en) || d.field.id;
    }), D = Xt(null), x = Xt(null);
    let v = null, k = null;
    yr(() => {
      v = aa.map(D.value).setView([47.5, 13.5], 6), aa.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        maxZoom: 19
      }).addTo(v), v.pm.setLang(d.lang === "de" ? "de" : "en"), v.on("pm:create", (H) => {
        k && k.remove(), k = H.layer, v.pm.disableDraw(), x.value = null, y("update:modelValue", j(H.layer));
      }), d.modelValue && q(d.modelValue);
    }), Vn(() => d.modelValue, (H) => {
      k && (k.remove(), k = null), H && q(H);
    }), yl(() => {
      v == null || v.remove();
    });
    function F(H) {
      if (x.value === H) {
        v.pm.disableDraw(), x.value = null;
        return;
      }
      x.value = H, H === "rectangle" ? v.pm.enableDraw("Rectangle", { snappable: !1 }) : v.pm.enableDraw("Polygon", { snappable: !1 });
    }
    function Z() {
      k && (k.remove(), k = null), v.pm.disableDraw(), x.value = null, y("update:modelValue", "");
    }
    function j(H) {
      const nt = H.getLatLngs(), ut = Array.isArray(nt[0]) ? nt[0] : nt[0][0] ?? nt, _t = (Array.isArray(ut[0]) ? ut[0] : ut).map((Tt) => `${Tt.lng.toFixed(6)} ${Tt.lat.toFixed(6)}`), Y = _t[0];
      return `POLYGON((${(_t[_t.length - 1] === Y ? _t : [..._t, Y]).join(", ")}))`;
    }
    function q(H) {
      const nt = H.match(/POLYGON\s*\(\(([^)]+)\)\)/i);
      if (!nt) return;
      const ut = nt[1].split(",").map((_t) => {
        const [Y, Et] = _t.trim().split(/\s+/).map(Number);
        return [Et, Y];
      });
      k = aa.polygon(ut, { color: "#2878a8" }).addTo(v), v.fitBounds(k.getBounds(), { padding: [20, 20] });
    }
    return (H, nt) => (ht(), ft("div", Ah, [
      $("div", Th, dt(C.value), 1),
      $("div", Dh, [
        $("button", {
          class: ae(["tool-btn", { active: x.value === "rectangle" }]),
          onClick: nt[0] || (nt[0] = (ut) => F("rectangle")),
          title: h.lang === "de" ? "Rechteck zeichnen" : "Draw rectangle"
        }, "▭ " + dt(h.lang === "de" ? "Rechteck" : "Rectangle"), 11, Ih),
        $("button", {
          class: ae(["tool-btn", { active: x.value === "polygon" }]),
          onClick: nt[1] || (nt[1] = (ut) => F("polygon")),
          title: h.lang === "de" ? "Polygon zeichnen" : "Draw polygon"
        }, "⬡ " + dt((h.lang === "de", "Polygon")), 11, Oh),
        h.modelValue ? (ht(), ft("button", {
          key: 0,
          class: "tool-btn tool-btn--clear",
          onClick: Z
        }, "✕ " + dt(h.lang === "de" ? "Löschen" : "Clear"), 1)) : Gt("", !0)
      ]),
      $("div", {
        ref_key: "mapEl",
        ref: D,
        class: "map-container"
      }, null, 512),
      h.modelValue ? (ht(), ft("div", Fh, [
        nt[2] || (nt[2] = $("span", { class: "map-wkt-label" }, "WKT:", -1)),
        $("code", null, dt(h.modelValue), 1)
      ])) : Gt("", !0),
      x.value ? (ht(), ft("div", Rh, [
        x.value === "rectangle" ? (ht(), ft(re, { key: 0 }, [
          Un(dt(h.lang === "de" ? "Klicken und ziehen um ein Rechteck aufzuspannen." : "Click and drag to draw a bounding box."), 1)
        ], 64)) : (ht(), ft(re, { key: 1 }, [
          Un(dt(h.lang === "de" ? "Klicken um Punkte zu setzen, Doppelklick zum Abschließen." : "Click to place points, double-click to finish."), 1)
        ], 64))
      ])) : Gt("", !0)
    ]));
  }
}, kl = /* @__PURE__ */ Be(Nh, [["__scopeId", "data-v-e6275f83"]]), zh = ["id"], jh = ["aria-expanded", "aria-labelledby", "aria-owns", "onKeydown"], $h = {
  key: 0,
  class: "ss-value"
}, Uh = {
  key: 1,
  class: "ss-placeholder"
}, Vh = ["aria-label"], Gh = ["id", "aria-labelledby"], Zh = ["placeholder", "aria-label", "onKeydown"], Hh = {
  key: 0,
  class: "ss-empty",
  role: "alert"
}, qh = ["aria-selected", "onMousedown", "onMousemove"], Kh = {
  key: 1,
  class: "hint"
}, Wh = {
  __name: "SearchSelectField",
  props: {
    field: Object,
    lang: String,
    modelValue: String
  },
  emits: ["update:modelValue"],
  setup(h, { emit: l }) {
    const d = h, y = l, C = Jt(() => {
      var St, Dt;
      return ((St = d.field.label) == null ? void 0 : St[d.lang]) || ((Dt = d.field.label) == null ? void 0 : Dt.en) || d.field.id;
    }), D = Jt(() => d.field.options || []), x = Xt(""), v = Jt(() => {
      const St = x.value.trim().toLowerCase();
      return St ? D.value.filter((Dt) => {
        var te, ee;
        return (((te = Dt.label) == null ? void 0 : te[d.lang]) || ((ee = Dt.label) == null ? void 0 : ee.en) || Dt.value || "").toLowerCase().includes(St);
      }) : D.value;
    }), k = Jt(() => {
      var Dt, le;
      if (!d.modelValue) return "";
      const St = D.value.find((te) => te.value === d.modelValue);
      return St ? ((Dt = St.label) == null ? void 0 : Dt[d.lang]) || ((le = St.label) == null ? void 0 : le.en) || St.value : d.modelValue;
    }), F = Xt(null), Z = Xt(null), j = Xt(null), q = Xt(!1), H = Xt(-1);
    async function nt() {
      var Dt;
      if (q.value) return;
      q.value = !0, x.value = "", H.value = -1, await gr(), (Dt = Z.value) == null || Dt.focus();
      const St = v.value.findIndex((le) => le.value === d.modelValue);
      St >= 0 && (H.value = St, vt()), document.addEventListener("mousedown", _t);
    }
    function ut() {
      q.value = !1, document.removeEventListener("mousedown", _t);
    }
    function _t(St) {
      var Dt;
      (Dt = F.value) != null && Dt.contains(St.target) || ut();
    }
    yl(() => document.removeEventListener("mousedown", _t));
    function Y(St) {
      y("update:modelValue", St.value), ut();
    }
    function Et() {
      y("update:modelValue", "");
    }
    function Tt(St) {
      const Dt = v.value.length;
      Dt && (H.value = (H.value + St + Dt) % Dt, vt());
    }
    function pe() {
      const St = v.value[H.value];
      St && Y(St);
    }
    function vt() {
      gr(() => {
        var Dt, le;
        const St = (Dt = j.value) == null ? void 0 : Dt.querySelectorAll(".ss-option")[H.value];
        (le = St == null ? void 0 : St.scrollIntoView) == null || le.call(St, { block: "nearest" });
      });
    }
    return (St, Dt) => {
      var le;
      return ht(), ft("div", {
        class: "field",
        ref_key: "root",
        ref: F
      }, [
        $("label", {
          id: `${h.field.id}-label`,
          class: ae({ required: h.field.required || h.field.requiredIf })
        }, dt(C.value), 11, zh),
        $("div", {
          class: ae(["ss-input-wrap", { open: q.value, focused: q.value }]),
          role: "combobox",
          "aria-expanded": q.value,
          "aria-haspopup": "listbox",
          "aria-labelledby": `${h.field.id}-label`,
          "aria-owns": `${h.field.id}-panel`,
          tabindex: "0",
          onClick: nt,
          onKeydown: [
            en(Te(nt, ["prevent"]), ["enter"]),
            en(Te(nt, ["prevent"]), ["space"])
          ]
        }, [
          k.value ? (ht(), ft("span", $h, dt(k.value), 1)) : (ht(), ft("span", Uh, dt(h.lang === "de" ? "— Bitte wählen —" : "— Please select —"), 1)),
          Dt[3] || (Dt[3] = $("span", {
            class: "ss-caret",
            "aria-hidden": "true"
          }, "▾", -1)),
          h.modelValue ? (ht(), ft("button", {
            key: 2,
            type: "button",
            class: "ss-clear",
            "aria-label": h.lang === "de" ? `${C.value} Auswahl aufheben` : `Clear ${C.value} selection`,
            onClick: Te(Et, ["stop"])
          }, "×", 8, Vh)) : Gt("", !0)
        ], 42, jh),
        q.value ? (ht(), ft("div", {
          key: 0,
          id: `${h.field.id}-panel`,
          class: "ss-panel",
          role: "listbox",
          "aria-labelledby": `${h.field.id}-label`
        }, [
          vl($("input", {
            ref_key: "searchInput",
            ref: Z,
            "onUpdate:modelValue": Dt[0] || (Dt[0] = (te) => x.value = te),
            class: "ss-search",
            placeholder: h.lang === "de" ? "Suchen …" : "Search …",
            "aria-label": h.lang === "de" ? `${C.value} durchsuchen` : `Search ${C.value}`,
            autocomplete: "off",
            onKeydown: [
              Dt[1] || (Dt[1] = en(Te((te) => Tt(1), ["prevent"]), ["down"])),
              Dt[2] || (Dt[2] = en(Te((te) => Tt(-1), ["prevent"]), ["up"])),
              en(Te(pe, ["prevent"]), ["enter"]),
              en(ut, ["esc"])
            ]
          }, null, 40, Zh), [
            [bl, x.value]
          ]),
          $("ul", {
            class: "ss-list",
            ref_key: "listEl",
            ref: j
          }, [
            v.value.length ? Gt("", !0) : (ht(), ft("li", Hh, dt(h.lang === "de" ? "Keine Treffer" : "No results"), 1)),
            (ht(!0), ft(re, null, Me(v.value, (te, ee) => {
              var Kt, _e;
              return ht(), ft("li", {
                key: te.value,
                class: ae(["ss-option", { selected: te.value === h.modelValue, highlighted: ee === H.value }]),
                role: "option",
                "aria-selected": te.value === h.modelValue,
                onMousedown: Te((Re) => Y(te), ["prevent"]),
                onMousemove: (Re) => H.value = ee
              }, dt(((Kt = te.label) == null ? void 0 : Kt[h.lang]) || ((_e = te.label) == null ? void 0 : _e.en) || te.value), 43, qh);
            }), 128))
          ], 512)
        ], 8, Gh)) : Gt("", !0),
        (le = h.field.hint) != null && le[h.lang] ? (ht(), ft("span", Kh, dt(h.field.hint[h.lang]), 1)) : Gt("", !0)
      ], 512);
    };
  }
}, Uo = /* @__PURE__ */ Be(Wh, [["__scopeId", "data-v-9a833d33"]]), Jh = { class: "field object-field" }, Xh = { class: "object-fieldset" }, Yh = { class: "object-legend" }, Qh = {
  __name: "ObjectField",
  props: {
    field: Object,
    lang: String,
    modelValue: { type: Object, default: () => ({}) }
  },
  emits: ["update:modelValue"],
  setup(h, { emit: l }) {
    const d = h, y = l, C = Jt(() => {
      var F, Z;
      return ((F = d.field.label) == null ? void 0 : F[d.lang]) || ((Z = d.field.label) == null ? void 0 : Z.en) || d.field.id;
    }), D = {
      text: mr,
      uri: $o,
      select: zo,
      langstring: wl,
      textarea: No,
      date: jo,
      map: kl,
      searchselect: Uo
    };
    function x(F) {
      return D[F.type] || mr;
    }
    function v(F, Z) {
      const j = { ...d.modelValue || {} };
      d.field.rdfType && (j["rdf:type"] = d.field.rdfType), y("update:modelValue", { ...j, [F]: Z });
    }
    function k(F) {
      const Z = d.field.rdfType ? { "rdf:type": d.field.rdfType } : {};
      y("update:modelValue", { ...Z, ...F });
    }
    return (F, Z) => (ht(), ft("div", Jh, [
      h.field.remember ? (ht(), Bi(Ll, {
        key: 0,
        field: h.field,
        lang: h.lang,
        onSelect: k
      }, null, 8, ["field", "lang"])) : Gt("", !0),
      $("fieldset", Xh, [
        $("legend", Yh, dt(C.value), 1),
        (ht(!0), ft(re, null, Me(h.field.subFields, (j) => (ht(), Bi(Ro(x(j)), {
          key: j.id,
          field: j,
          lang: h.lang,
          modelValue: (h.modelValue || {})[j.id],
          "onUpdate:modelValue": (q) => v(j.id, q)
        }, null, 8, ["field", "lang", "modelValue", "onUpdate:modelValue"]))), 128))
      ])
    ]));
  }
}, El = /* @__PURE__ */ Be(Qh, [["__scopeId", "data-v-468d73b0"]]), tc = { class: "langstring-item" }, ec = ["value", "aria-label"], ic = ["value"], nc = ["value", "placeholder", "aria-label"], rc = {
  __name: "LangStringItem",
  props: {
    modelValue: { type: Object, default: () => ({ value: "", lang: "de" }) },
    lang: String,
    placeholder: { type: String, default: "" }
  },
  emits: ["update:modelValue"],
  setup(h, { emit: l }) {
    const d = h, y = l, C = ["de", "en", "fr", "it", "es", "nl", "pl", "cs", "sk", "hr"];
    function D(v) {
      y("update:modelValue", { ...d.modelValue, lang: v });
    }
    function x(v) {
      y("update:modelValue", { ...d.modelValue, value: v });
    }
    return (v, k) => (ht(), ft("div", tc, [
      $("select", {
        class: "lang-select",
        value: h.modelValue.lang || "de",
        "aria-label": h.lang === "de" ? "Sprache des Eintrags" : "Language of this entry",
        onChange: k[0] || (k[0] = (F) => D(F.target.value))
      }, [
        (ht(), ft(re, null, Me(C, (F) => $("option", {
          key: F,
          value: F
        }, dt(F), 9, ic)), 64))
      ], 40, ec),
      $("input", {
        type: "text",
        value: h.modelValue.value || "",
        placeholder: h.placeholder,
        "aria-label": h.lang === "de" ? `Texteingabe auf ${h.modelValue.lang || "de"}` : `Text in ${h.modelValue.lang || "de"}`,
        onInput: k[1] || (k[1] = (F) => x(F.target.value))
      }, null, 40, nc)
    ]));
  }
}, ac = /* @__PURE__ */ Be(rc, [["__scopeId", "data-v-470faf43"]]), sc = { class: "field" }, oc = { class: "items" }, lc = ["aria-label", "onClick"], uc = {
  key: 0,
  class: "hint"
}, hc = {
  __name: "RepeatableField",
  props: {
    field: Object,
    lang: String,
    modelValue: { type: Array, default: () => [] }
  },
  emits: ["update:modelValue"],
  setup(h, { emit: l }) {
    const d = h, y = l, C = Jt(() => {
      var ut, _t;
      return ((ut = d.field.label) == null ? void 0 : ut[d.lang]) || ((_t = d.field.label) == null ? void 0 : _t.en) || d.field.id;
    }), D = Jt(() => {
      var ut, _t;
      return ((ut = d.field.placeholder) == null ? void 0 : ut[d.lang]) || ((_t = d.field.placeholder) == null ? void 0 : _t.en) || "";
    }), x = {
      text: mr,
      textarea: No,
      uri: $o,
      date: jo,
      select: zo,
      searchselect: Uo,
      object: El
    }, v = Jt(() => x[d.field.type] || mr), k = Jt(() => {
      const ut = d.modelValue;
      return Array.isArray(ut) ? ut.length ? ut : [j()] : ut != null && ut !== "" ? [ut] : [j()];
    });
    let F = 0;
    const Z = Xt([]);
    Vn(k, (ut) => {
      for (; Z.value.length < ut.length; )
        Z.value.push(++F);
    }, { immediate: !0 });
    function j() {
      return d.field.type === "langstring" ? { value: "", lang: d.lang || "de" } : "";
    }
    function q(ut, _t) {
      const Y = [...d.modelValue || []];
      for (; Y.length <= ut; ) Y.push(j());
      Y[ut] = _t, y("update:modelValue", Y);
    }
    function H() {
      y("update:modelValue", [...d.modelValue || [j()], j()]);
    }
    function nt(ut) {
      const _t = [...d.modelValue || []];
      _t.splice(ut, 1), Z.value.splice(ut, 1), y("update:modelValue", _t.length ? _t : [j()]);
    }
    return (ut, _t) => {
      var Y;
      return ht(), ft("div", sc, [
        $("label", {
          class: ae({ required: h.field.required })
        }, dt(C.value), 3),
        $("div", oc, [
          (ht(!0), ft(re, null, Me(k.value, (Et, Tt) => (ht(), ft("div", {
            key: Z.value[Tt] ?? Tt,
            class: "item-row"
          }, [
            h.field.type === "langstring" ? (ht(), Bi(ac, {
              key: 0,
              modelValue: Et,
              lang: h.lang,
              placeholder: D.value,
              "onUpdate:modelValue": (pe) => q(Tt, pe)
            }, null, 8, ["modelValue", "lang", "placeholder", "onUpdate:modelValue"])) : (ht(), Bi(Ro(v.value), {
              key: 1,
              field: h.field,
              lang: h.lang,
              modelValue: Et,
              "onUpdate:modelValue": (pe) => q(Tt, pe)
            }, null, 8, ["field", "lang", "modelValue", "onUpdate:modelValue"])),
            $("button", {
              type: "button",
              class: "btn-remove",
              "aria-label": h.lang === "de" ? `Eintrag ${Tt + 1} aus ${C.value} entfernen` : `Remove item ${Tt + 1} from ${C.value}`,
              onClick: (pe) => nt(Tt)
            }, "×", 8, lc)
          ]))), 128))
        ]),
        $("button", {
          type: "button",
          class: "btn-add",
          onClick: H
        }, " + " + dt(h.lang === "de" ? "Hinzufügen" : "Add"), 1),
        (Y = h.field.hint) != null && Y[h.lang] ? (ht(), ft("span", uc, dt(h.field.hint[h.lang]), 1)) : Gt("", !0)
      ]);
    };
  }
}, cc = /* @__PURE__ */ Be(hc, [["__scopeId", "data-v-69621fbe"]]), dc = { class: "field" }, fc = { class: "multiselect-fieldset" }, pc = { class: "multiselect-box" }, _c = ["value", "checked", "onChange"], gc = {
  key: 0,
  class: "empty"
}, mc = {
  key: 0,
  class: "hint"
}, yc = {
  __name: "MultiSelectField",
  props: {
    field: Object,
    lang: String,
    modelValue: { type: Array, default: () => [] }
  },
  emits: ["update:modelValue"],
  setup(h, { emit: l }) {
    const d = h, y = l, C = Jt(() => {
      var x, v;
      return ((x = d.field.label) == null ? void 0 : x[d.lang]) || ((v = d.field.label) == null ? void 0 : v.en) || d.field.id;
    });
    function D(x) {
      const v = d.modelValue || [], k = v.includes(x) ? v.filter((F) => F !== x) : [...v, x];
      y("update:modelValue", k);
    }
    return (x, v) => {
      var k, F;
      return ht(), ft("div", dc, [
        $("fieldset", fc, [
          $("legend", {
            class: ae({ required: h.field.required })
          }, dt(C.value), 3),
          $("div", pc, [
            (ht(!0), ft(re, null, Me(h.field.options, (Z) => {
              var j, q;
              return ht(), ft("label", {
                key: Z.value,
                class: "option-row"
              }, [
                $("input", {
                  type: "checkbox",
                  value: Z.value,
                  checked: (h.modelValue || []).includes(Z.value),
                  onChange: (H) => D(Z.value)
                }, null, 40, _c),
                $("span", null, dt(((j = Z.label) == null ? void 0 : j[h.lang]) || ((q = Z.label) == null ? void 0 : q.de) || Z.value), 1)
              ]);
            }), 128)),
            (k = h.field.options) != null && k.length ? Gt("", !0) : (ht(), ft("span", gc, dt(h.lang === "de" ? "Keine Optionen konfiguriert." : "No options configured."), 1))
          ])
        ]),
        (F = h.field.hint) != null && F[h.lang] ? (ht(), ft("span", mc, dt(h.field.hint[h.lang]), 1)) : Gt("", !0)
      ]);
    };
  }
}, vc = /* @__PURE__ */ Be(yc, [["__scopeId", "data-v-de4950da"]]), ma = {
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
function bc(h, l) {
  const d = typeof h == "string" ? { [h]: l } : h;
  for (const [y, C] of Object.entries(d)) {
    if (ma[y]) {
      console.warn(`[fieldTransforms] "${y}" already exists — skipping. Use a unique name.`);
      continue;
    }
    ma[y] = C;
  }
}
function Ml(h, l, d) {
  const y = ma[h];
  return y ? y.display(l, d) : (console.warn(`[fieldTransforms] Unknown transform: "${h}"`), l);
}
function Io(h, l, d, y) {
  const C = ma[h];
  return C ? C.encode(l, d, y) : (console.warn(`[fieldTransforms] Unknown transform: "${h}"`), l);
}
const xc = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  applyDisplay: Ml,
  applyEncode: Io,
  fieldTransforms: ma,
  registerTransform: bc
}, Symbol.toStringTag, { value: "Module" })), Lc = { class: "group-fields" }, wc = ["id"], Cc = {
  key: 2,
  class: "transform-preview"
}, kc = {
  key: 3,
  class: "field-errors",
  role: "alert"
}, Ec = {
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
    function C(v) {
      var F;
      const k = (F = d.modelValue) == null ? void 0 : F[v.id];
      return v.transform ? Ml(v.transform, k, v.transformOptions) : k;
    }
    function D(v, k) {
      var j;
      if (!v.transform || !k) return null;
      const F = (j = d.modelValue) == null ? void 0 : j[v.id], Z = Io(v.transform, k, v.transformOptions, F);
      return Z !== k ? Z : null;
    }
    function x(v, k) {
      var Z;
      const F = typeof v == "string" ? v : v.id;
      if (typeof v == "object" && v.transform) {
        const j = (Z = d.modelValue) == null ? void 0 : Z[F], q = Io(v.transform, k, v.transformOptions, j);
        y("update:modelValue", { ...d.modelValue, [F]: q });
      } else
        y("update:modelValue", { ...d.modelValue, [F]: k });
    }
    return (v, k) => (ht(), ft("div", Lc, [
      (ht(!0), ft(re, null, Me(h.fields, (F) => {
        var Z, j;
        return ht(), ft("div", {
          key: F.id,
          id: "field-" + F.id,
          class: ae(["field-wrapper", { "has-error": h.showErrors && ((Z = h.fieldErrors[F.id]) == null ? void 0 : Z.length) }])
        }, [
          F.multiple && F.type !== "multiselect" && F.type !== "distribution-editor" && F.type !== "object" ? (ht(), Bi(cc, {
            key: 0,
            field: F,
            lang: h.lang,
            modelValue: C(F),
            "onUpdate:modelValue": (q) => x(F, q)
          }, null, 8, ["field", "lang", "modelValue", "onUpdate:modelValue"])) : (ht(), Bi(Ro(h.fieldComponent(F)), {
            key: 1,
            field: F,
            lang: h.lang,
            modelValue: C(F),
            "onUpdate:modelValue": (q) => x(F, q)
          }, null, 8, ["field", "lang", "modelValue", "onUpdate:modelValue"])),
          F.transform && C(F) ? (ht(), ft("div", Cc, [
            Un(dt(h.lang === "de" ? "Gespeichert als:" : "Stored as:") + " ", 1),
            $("code", null, dt(D(F, C(F)) || h.modelValue[F.id]), 1)
          ])) : Gt("", !0),
          h.showErrors && ((j = h.fieldErrors[F.id]) != null && j.length) ? (ht(), ft("ul", kc, [
            (ht(!0), ft(re, null, Me(h.fieldErrors[F.id], (q) => (ht(), ft("li", { key: q }, dt(q), 1))), 128))
          ])) : Gt("", !0)
        ], 10, wc);
      }), 128))
    ]));
  }
}, cl = /* @__PURE__ */ Be(Ec, [["__scopeId", "data-v-fdfbddef"]]);
let Mo = null;
class Mc {
  /**
   * Registers a global async function that returns auth headers for every upload.
   * Pass null to remove the provider (uploads will be unauthenticated).
   *
   * @param {((config: object) => Promise<Record<string,string>>) | null} providerFn
   */
  static setAuthProvider(l) {
    Mo = l ?? null;
  }
  /**
   * @param {File} file
   * @param {object} config — fileUpload config block from the field definition
   * @returns {Promise<string>} download URL returned by the API
   */
  async upload(l, d) {
    if (!(d != null && d.uploadUrl)) throw new Error("fileUpload.uploadUrl is not configured");
    const y = d.uploadUrl.replace("{filename}", encodeURIComponent(l.name)), C = (d.method || "POST").toUpperCase(), D = Mo ? await Mo(d) : {}, x = { ...d.headers || {}, ...D };
    let v;
    if (C === "PUT")
      x["Content-Type"] = l.type || "application/octet-stream", v = l;
    else {
      const Z = new FormData();
      Z.append(d.formField || "file", l, l.name), v = Z;
    }
    const k = await fetch(y, { method: C, headers: x, body: v });
    if (!k.ok) {
      const Z = await k.text().catch(() => "");
      throw new Error(`Upload failed: HTTP ${k.status}${Z ? " – " + Z.slice(0, 200) : ""}`);
    }
    if ((d.responseType || "text") === "json") {
      const Z = await k.json(), j = d.responseUrlField || "url", q = Bc(Z, j);
      if (!q) throw new Error(`Response JSON has no field "${j}"`);
      return String(q);
    }
    return (await k.text()).trim();
  }
}
function Bc(h, l) {
  return l.split(".").reduce((d, y) => d != null ? d[y] : void 0, h);
}
const Pc = { class: "dist-form" }, Sc = {
  key: 0,
  class: "field span2 upload-section"
}, Ac = { class: "drop-text" }, Tc = { class: "drop-text" }, Dc = { class: "drop-size" }, Ic = { class: "drop-text" }, Oc = { class: "drop-text" }, Fc = { class: "drop-text error-text" }, Rc = { class: "field" }, Nc = { class: "required" }, zc = ["value"], jc = { class: "field" }, $c = ["value"], Uc = { class: "field span2" }, Vc = ["value", "placeholder"], Gc = { class: "field span2" }, Zc = ["value", "placeholder"], Hc = { class: "field" }, qc = ["value"], Kc = { value: "" }, Wc = ["value"], Jc = { class: "field" }, Xc = ["value"], Yc = { class: "field span2" }, Qc = ["value"], td = { class: "field" }, ed = ["value"], id = { value: "" }, nd = ["value"], rd = { class: "field" }, ad = ["value"], sd = { class: "field" }, od = ["value"], ld = {
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
    function C(_t, Y) {
      y("update:modelValue", { ...d.modelValue, [_t]: Y });
    }
    const D = Xt(null), x = Xt(null), v = Xt(!1), k = Xt("idle"), F = Xt("");
    function Z(_t) {
      var Et;
      const Y = (Et = _t.target.files) == null ? void 0 : Et[0];
      Y && q(Y);
    }
    function j(_t) {
      var Et;
      if (v.value = !1, k.value === "uploading") return;
      const Y = (Et = _t.dataTransfer.files) == null ? void 0 : Et[0];
      Y && q(Y);
    }
    function q(_t) {
      x.value = _t, k.value = "selected", F.value = "";
    }
    function H() {
      x.value = null, k.value = "idle", F.value = "", D.value && (D.value.value = "");
    }
    async function nt() {
      if (x.value) {
        k.value = "uploading";
        try {
          const Y = await new Mc().upload(x.value, d.uploadConfig);
          k.value = "success";
          const Et = { ...d.modelValue, "dcat:downloadURL": Y };
          Et["dcat:accessURL"] || (Et["dcat:accessURL"] = Y), y("update:modelValue", Et);
        } catch (_t) {
          k.value = "error", F.value = _t.message;
        }
      }
    }
    function ut(_t) {
      return _t ? _t < 1024 ? `${_t} B` : _t < 1024 * 1024 ? `${(_t / 1024).toFixed(1)} KB` : `${(_t / (1024 * 1024)).toFixed(1)} MB` : "";
    }
    return (_t, Y) => {
      var Et, Tt, pe;
      return ht(), ft("div", Pc, [
        (Et = h.uploadConfig) != null && Et.enabled ? (ht(), ft("div", Sc, [
          $("label", null, dt(h.lang === "de" ? "Datei hochladen" : "Upload file"), 1),
          $("div", {
            class: ae(["drop-zone", { dragging: v.value, uploading: k.value === "uploading", success: k.value === "success", error: k.value === "error" }]),
            onDragover: Y[0] || (Y[0] = Te((vt) => v.value = !0, ["prevent"])),
            onDragleave: Y[1] || (Y[1] = (vt) => v.value = !1),
            onDrop: Te(j, ["prevent"]),
            onClick: Y[2] || (Y[2] = (vt) => {
              var St;
              return (St = D.value) == null ? void 0 : St.click();
            })
          }, [
            $("input", {
              ref_key: "fileInput",
              ref: D,
              type: "file",
              class: "hidden-input",
              onChange: Z
            }, null, 544),
            k.value === "idle" ? (ht(), ft(re, { key: 0 }, [
              Y[13] || (Y[13] = $("span", { class: "drop-icon" }, "📂", -1)),
              $("span", Ac, dt(h.lang === "de" ? "Datei hierher ziehen oder klicken zum Auswählen" : "Drag a file here or click to select"), 1)
            ], 64)) : k.value === "selected" ? (ht(), ft(re, { key: 1 }, [
              Y[14] || (Y[14] = $("span", { class: "drop-icon" }, "📄", -1)),
              $("span", Tc, dt((Tt = x.value) == null ? void 0 : Tt.name), 1),
              $("span", Dc, dt(ut((pe = x.value) == null ? void 0 : pe.size)), 1)
            ], 64)) : k.value === "uploading" ? (ht(), ft(re, { key: 2 }, [
              Y[15] || (Y[15] = $("span", { class: "drop-icon spin" }, "⟳", -1)),
              $("span", Ic, dt(h.lang === "de" ? "Wird hochgeladen …" : "Uploading …"), 1)
            ], 64)) : k.value === "success" ? (ht(), ft(re, { key: 3 }, [
              Y[16] || (Y[16] = $("span", { class: "drop-icon" }, "✓", -1)),
              $("span", Oc, dt(h.lang === "de" ? "Erfolgreich hochgeladen" : "Upload successful"), 1),
              $("button", {
                type: "button",
                class: "btn-reset-upload",
                onClick: Te(H, ["stop"])
              }, dt(h.lang === "de" ? "Andere Datei" : "Choose another"), 1)
            ], 64)) : k.value === "error" ? (ht(), ft(re, { key: 4 }, [
              Y[17] || (Y[17] = $("span", { class: "drop-icon" }, "⚠", -1)),
              $("span", Fc, dt(F.value), 1),
              $("button", {
                type: "button",
                class: "btn-reset-upload",
                onClick: Te(H, ["stop"])
              }, dt(h.lang === "de" ? "Erneut versuchen" : "Try again"), 1)
            ], 64)) : Gt("", !0)
          ], 34),
          k.value === "selected" ? (ht(), ft("button", {
            key: 0,
            type: "button",
            class: "btn-upload",
            onClick: nt
          }, dt(h.lang === "de" ? "Hochladen" : "Upload"), 1)) : Gt("", !0)
        ])) : Gt("", !0),
        $("div", Rc, [
          $("label", Nc, dt(h.lang === "de" ? "Zugangs-URL" : "Access URL"), 1),
          $("input", {
            type: "url",
            value: h.modelValue["dcat:accessURL"] || "",
            placeholder: "https://…",
            onInput: Y[3] || (Y[3] = (vt) => C("dcat:accessURL", vt.target.value))
          }, null, 40, zc)
        ]),
        $("div", jc, [
          $("label", null, dt(h.lang === "de" ? "Download-URL" : "Download URL"), 1),
          $("input", {
            type: "url",
            value: h.modelValue["dcat:downloadURL"] || "",
            placeholder: "https://…",
            onInput: Y[4] || (Y[4] = (vt) => C("dcat:downloadURL", vt.target.value))
          }, null, 40, $c)
        ]),
        $("div", Uc, [
          $("label", null, dt(h.lang === "de" ? "Titel" : "Title"), 1),
          $("input", {
            type: "text",
            value: h.modelValue["dct:title"] || "",
            placeholder: h.lang === "de" ? "Titel der Distribution" : "Distribution title",
            onInput: Y[5] || (Y[5] = (vt) => C("dct:title", vt.target.value))
          }, null, 40, Vc)
        ]),
        $("div", Gc, [
          $("label", null, dt(h.lang === "de" ? "Beschreibung" : "Description"), 1),
          $("textarea", {
            value: h.modelValue["dct:description"] || "",
            placeholder: h.lang === "de" ? "Beschreibung …" : "Description …",
            onInput: Y[6] || (Y[6] = (vt) => C("dct:description", vt.target.value)),
            rows: "3"
          }, null, 40, Zc)
        ]),
        $("div", Hc, [
          $("label", null, dt(h.lang === "de" ? "Dateiformat" : "File Format"), 1),
          $("select", {
            value: h.modelValue["dct:format"] || "",
            onChange: Y[7] || (Y[7] = (vt) => C("dct:format", vt.target.value))
          }, [
            $("option", Kc, dt(h.lang === "de" ? "— Bitte wählen —" : "— Please select —"), 1),
            (ht(!0), ft(re, null, Me(h.formatOptions, (vt) => {
              var St, Dt;
              return ht(), ft("option", {
                key: vt.value,
                value: vt.value
              }, dt(((St = vt.label) == null ? void 0 : St[h.lang]) || ((Dt = vt.label) == null ? void 0 : Dt.en) || vt.value), 9, Wc);
            }), 128))
          ], 40, qc)
        ]),
        $("div", Jc, [
          $("label", null, dt(h.lang === "de" ? "Medientyp" : "Media Type"), 1),
          $("input", {
            type: "text",
            value: h.modelValue["dcat:mediaType"] || "",
            placeholder: "text/csv",
            onInput: Y[8] || (Y[8] = (vt) => C("dcat:mediaType", vt.target.value))
          }, null, 40, Xc)
        ]),
        $("div", Yc, [
          $("label", null, dt(h.lang === "de" ? "Lizenz" : "License"), 1),
          $("input", {
            type: "url",
            value: h.modelValue["dct:license"] || "",
            placeholder: "https://creativecommons.org/licenses/by/4.0/",
            onInput: Y[9] || (Y[9] = (vt) => C("dct:license", vt.target.value))
          }, null, 40, Qc)
        ]),
        $("div", td, [
          $("label", null, dt(h.lang === "de" ? "Verfügbarkeit" : "Availability"), 1),
          $("select", {
            value: h.modelValue["dcatap:availability"] || "",
            onChange: Y[10] || (Y[10] = (vt) => C("dcatap:availability", vt.target.value))
          }, [
            $("option", id, dt(h.lang === "de" ? "— Bitte wählen —" : "— Please select —"), 1),
            (ht(!0), ft(re, null, Me(h.availabilityOptions, (vt) => {
              var St, Dt;
              return ht(), ft("option", {
                key: vt.value,
                value: vt.value
              }, dt(((St = vt.label) == null ? void 0 : St[h.lang]) || ((Dt = vt.label) == null ? void 0 : Dt.en) || vt.value), 9, nd);
            }), 128))
          ], 40, ed)
        ]),
        $("div", rd, [
          $("label", null, dt(h.lang === "de" ? "Veröffentlichungsdatum" : "Issued"), 1),
          $("input", {
            type: "date",
            value: h.modelValue["dct:issued"] || "",
            onInput: Y[11] || (Y[11] = (vt) => C("dct:issued", vt.target.value))
          }, null, 40, ad)
        ]),
        $("div", sd, [
          $("label", null, dt(h.lang === "de" ? "Zuletzt geändert" : "Modified"), 1),
          $("input", {
            type: "date",
            value: h.modelValue["dct:modified"] || "",
            onInput: Y[12] || (Y[12] = (vt) => C("dct:modified", vt.target.value))
          }, null, 40, od)
        ])
      ]);
    };
  }
}, Bl = /* @__PURE__ */ Be(ld, [["__scopeId", "data-v-963049dc"]]), ud = { class: "dist-header" }, hd = ["aria-label"], cd = { class: "dist-body" }, dd = { class: "dist-actions" }, fd = ["disabled", "aria-disabled"], dl = "dist-modal-heading", pd = {
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
    const d = h, y = l, C = Xt({ ...d.modelValue || {} }), D = Xt(null);
    Vn(() => d.modelValue, (v) => {
      C.value = { ...v || {} };
    }, { deep: !0 }), Vn(() => d.show, async (v) => {
      var k;
      if (v) {
        await gr();
        const F = (k = D.value) == null ? void 0 : k.querySelector('input, select, textarea, button, [tabindex]:not([tabindex="-1"])');
        F == null || F.focus();
      }
    });
    function x() {
      y("save", { ...C.value });
    }
    return (v, k) => (ht(), Bi(Tu, { to: "body" }, [
      h.show ? (ht(), ft("div", {
        key: 0,
        class: "dist-overlay",
        onClick: k[3] || (k[3] = Te((F) => v.$emit("cancel"), ["self"])),
        onKeydown: k[4] || (k[4] = en((F) => v.$emit("cancel"), ["esc"]))
      }, [
        $("div", {
          class: "dist-panel",
          role: "dialog",
          "aria-modal": "true",
          "aria-labelledby": dl,
          ref_key: "panelEl",
          ref: D
        }, [
          $("div", ud, [
            $("h2", { id: dl }, dt(h.lang === "de" ? "Distribution bearbeiten" : "Edit Distribution"), 1),
            $("button", {
              class: "close-btn",
              "aria-label": h.lang === "de" ? "Dialog schließen" : "Close dialog",
              onClick: k[0] || (k[0] = (F) => v.$emit("cancel"))
            }, "✕", 8, hd)
          ]),
          $("div", cd, [
            Ss(Bl, {
              modelValue: C.value,
              lang: h.lang,
              formatOptions: h.formatOptions,
              availabilityOptions: h.availabilityOptions,
              uploadConfig: h.uploadConfig,
              "onUpdate:modelValue": k[1] || (k[1] = (F) => C.value = F)
            }, null, 8, ["modelValue", "lang", "formatOptions", "availabilityOptions", "uploadConfig"])
          ]),
          $("div", dd, [
            $("button", {
              class: "btn-cancel",
              onClick: k[2] || (k[2] = (F) => v.$emit("cancel"))
            }, dt(h.lang === "de" ? "Abbrechen" : "Cancel"), 1),
            $("button", {
              class: "btn-save",
              disabled: !C.value["dcat:accessURL"],
              "aria-disabled": !C.value["dcat:accessURL"],
              onClick: x
            }, dt(h.lang === "de" ? "Speichern" : "Save"), 9, fd)
          ])
        ], 512)
      ], 32)) : Gt("", !0)
    ]));
  }
}, _d = /* @__PURE__ */ Be(pd, [["__scopeId", "data-v-ddae0d1c"]]), Pl = {
  assetsBaseUrl: "/"
};
function b0(h = {}) {
  if (h.assetsBaseUrl !== void 0 && (Pl.assetsBaseUrl = String(h.assetsBaseUrl).replace(/\/?$/, "/")), h.extend) {
    const { extend: l } = h;
    l.validators && Promise.resolve().then(() => of).then((d) => d.registerValidator(l.validators)), l.computes && Promise.resolve().then(() => m0).then((d) => d.registerCompute(l.computes)), l.transforms && Promise.resolve().then(() => xc).then((d) => d.registerTransform(l.transforms)), l.visibility && Promise.resolve().then(() => uf).then((d) => d.registerVisibility(l.visibility));
  }
}
function As(h) {
  return Pl.assetsBaseUrl + String(h).replace(/^\//, "");
}
const gd = { class: "dist-editor" }, md = { class: "dist-label" }, yd = {
  key: 0,
  class: "dist-empty"
}, vd = { class: "dist-empty-hint" }, bd = ["onDragstart", "onDragover", "onDrop"], xd = ["onClick"], Ld = ["aria-label"], wd = { class: "dist-card-summary" }, Cd = { class: "dist-card-index" }, kd = { class: "dist-card-title" }, Ed = {
  key: 0,
  class: "dist-card-badge"
}, Md = { class: "dist-card-controls" }, Bd = ["aria-label", "onClick", "title"], Pd = {
  class: "dist-toggle",
  "aria-hidden": "true"
}, Sd = {
  key: 0,
  class: "dist-card-body"
}, Ad = ["onDragstart", "onDragover", "onDrop"], Td = ["aria-label"], Dd = { class: "dist-row-info" }, Id = { class: "dist-row-title" }, Od = {
  key: 0,
  class: "dist-row-url"
}, Fd = {
  key: 1,
  class: "dist-row-badge"
}, Rd = { class: "dist-row-actions" }, Nd = ["onClick"], zd = ["onClick"], jd = {
  __name: "DistributionEditor",
  props: {
    field: Object,
    lang: String,
    modelValue: { type: Array, default: () => [] }
  },
  emits: ["update:modelValue"],
  setup(h, { emit: l }) {
    const d = h, y = Jt(() => {
      var At;
      return ((At = d.field) == null ? void 0 : At.fileUpload) || null;
    }), C = l, D = Jt(() => {
      var At;
      return ((At = d.field) == null ? void 0 : At.distributionMode) || "inline";
    }), x = Xt([]), v = [
      { value: "http://data.europa.eu/r5r/availability/stable", label: { de: "Stabil", en: "Stable" } },
      { value: "http://data.europa.eu/r5r/availability/available", label: { de: "Verfügbar", en: "Available" } },
      { value: "http://data.europa.eu/r5r/availability/experimental", label: { de: "Experimentell", en: "Experimental" } },
      { value: "http://data.europa.eu/r5r/availability/temporary", label: { de: "Vorübergehend", en: "Temporary" } }
    ];
    yr(async () => {
      try {
        const At = await fetch(As("vocabularies/file-format.json"));
        At.ok && (x.value = await At.json());
      } catch {
      }
    });
    const k = Jt(() => Array.isArray(d.modelValue) ? d.modelValue : []);
    function F() {
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
    function Z() {
      if (D.value === "inline") {
        const At = [...k.value, F()];
        C("update:modelValue", At), ut.value = /* @__PURE__ */ new Set([...ut.value, At.length - 1]);
      } else
        Et.value = -1, Y.value = F();
    }
    function j(At) {
      const Nt = k.value.filter((kt, ot) => ot !== At);
      if (nt.value.splice(At, 1), C("update:modelValue", Nt), D.value === "inline") {
        const kt = /* @__PURE__ */ new Set();
        for (const ot of ut.value)
          ot < At ? kt.add(ot) : ot > At && kt.add(ot - 1);
        ut.value = kt;
      }
    }
    function q(At, Nt) {
      const kt = k.value.map((ot, jt) => jt === At ? Nt : ot);
      C("update:modelValue", kt);
    }
    let H = 0;
    const nt = Xt([]);
    Vn(k, (At) => {
      for (; nt.value.length < At.length; ) nt.value.push(++H);
    }, { immediate: !0 });
    const ut = Xt(/* @__PURE__ */ new Set([0]));
    function _t(At) {
      const Nt = new Set(ut.value);
      Nt.has(At) ? Nt.delete(At) : Nt.add(At), ut.value = Nt;
    }
    const Y = Xt(null), Et = Xt(-1);
    function Tt(At) {
      Et.value = At, Y.value = { ...k.value[At] || {} };
    }
    function pe(At) {
      const Nt = [...k.value];
      Et.value === -1 ? Nt.push(At) : Nt[Et.value] = At, C("update:modelValue", Nt), Y.value = null;
    }
    const vt = Xt(-1), St = Xt(-1);
    function Dt(At, Nt) {
      vt.value = At, Nt.dataTransfer.effectAllowed = "move", Nt.dataTransfer.setData("text/plain", String(At));
    }
    function le(At) {
      At !== vt.value && (St.value = At);
    }
    function te() {
      St.value = -1;
    }
    function ee(At) {
      const Nt = vt.value;
      if (Nt === -1 || Nt === At) {
        Kt();
        return;
      }
      const kt = [...k.value], [ot] = kt.splice(Nt, 1);
      if (kt.splice(At, 0, ot), D.value === "inline") {
        const jt = /* @__PURE__ */ new Set();
        for (const ct of ut.value) {
          const wt = _e(ct, Nt, At);
          wt >= 0 && jt.add(wt);
        }
        ut.value = jt;
      }
      C("update:modelValue", kt), Kt();
    }
    function Kt() {
      vt.value = -1, St.value = -1;
    }
    function _e(At, Nt, kt) {
      return At === Nt ? kt : Nt < kt ? At > Nt && At <= kt ? At - 1 : At : At >= kt && At < Nt ? At + 1 : At;
    }
    function Re(At) {
      return At["dct:title"] || At["dcat:accessURL"] || "—";
    }
    function Le(At) {
      var kt, ot;
      const Nt = x.value.find((jt) => jt.value === At);
      return Nt ? ((kt = Nt.label) == null ? void 0 : kt[d.lang]) || ((ot = Nt.label) == null ? void 0 : ot.en) || At : At.split("/").pop() || At;
    }
    return (At, Nt) => {
      var kt, ot;
      return ht(), ft("div", gd, [
        $("label", md, dt(((kt = h.field.label) == null ? void 0 : kt[h.lang]) || ((ot = h.field.label) == null ? void 0 : ot.en) || h.field.id), 1),
        k.value.length ? (ht(), ft(re, { key: 1 }, [
          D.value === "inline" ? (ht(!0), ft(re, { key: 0 }, Me(k.value, (jt, ct) => (ht(), ft("div", {
            key: nt.value[ct] ?? ct,
            class: ae(["dist-card", { "drag-over": St.value === ct, dragging: vt.value === ct }]),
            draggable: "true",
            onDragstart: (wt) => Dt(ct, wt),
            onDragover: Te((wt) => le(ct), ["prevent"]),
            onDragleave: te,
            onDrop: Te((wt) => ee(ct), ["prevent"]),
            onDragend: Kt
          }, [
            $("div", {
              class: "dist-card-header",
              onClick: (wt) => _t(ct)
            }, [
              $("span", {
                class: "drag-handle",
                "aria-label": h.lang === "de" ? "Distribution verschieben" : "Drag to reorder",
                title: "Drag to reorder",
                onClick: Nt[0] || (Nt[0] = Te(() => {
                }, ["stop"]))
              }, "⠿", 8, Ld),
              $("div", wd, [
                $("span", Cd, dt(ct + 1) + ".", 1),
                $("span", kd, dt(Re(jt)), 1),
                jt["dct:format"] ? (ht(), ft("span", Ed, dt(Le(jt["dct:format"])), 1)) : Gt("", !0)
              ]),
              $("div", Md, [
                $("button", {
                  type: "button",
                  class: "btn-remove-inline",
                  "aria-label": (h.lang === "de", "Distribution " + (ct + 1) + (h.lang === "de" ? " entfernen" : " remove")),
                  onClick: Te((wt) => j(ct), ["stop"]),
                  title: h.lang === "de" ? "Entfernen" : "Remove"
                }, "✕", 8, Bd),
                $("span", Pd, dt(ut.value.has(ct) ? "▲" : "▼"), 1)
              ])
            ], 8, xd),
            ut.value.has(ct) ? (ht(), ft("div", Sd, [
              Ss(Bl, {
                modelValue: jt,
                lang: h.lang,
                formatOptions: x.value,
                availabilityOptions: v,
                uploadConfig: y.value,
                "onUpdate:modelValue": (wt) => q(ct, wt)
              }, null, 8, ["modelValue", "lang", "formatOptions", "uploadConfig", "onUpdate:modelValue"])
            ])) : Gt("", !0)
          ], 42, bd))), 128)) : (ht(!0), ft(re, { key: 1 }, Me(k.value, (jt, ct) => (ht(), ft("div", {
            key: nt.value[ct] ?? ct,
            class: ae(["dist-row", { "drag-over": St.value === ct, dragging: vt.value === ct }]),
            draggable: "true",
            onDragstart: (wt) => Dt(ct, wt),
            onDragover: Te((wt) => le(ct), ["prevent"]),
            onDragleave: te,
            onDrop: Te((wt) => ee(ct), ["prevent"]),
            onDragend: Kt
          }, [
            $("span", {
              class: "drag-handle",
              "aria-label": h.lang === "de" ? "Distribution verschieben" : "Drag to reorder",
              title: "Drag to reorder"
            }, "⠿", 8, Td),
            $("div", Dd, [
              $("span", Id, dt(Re(jt)), 1),
              jt["dcat:accessURL"] ? (ht(), ft("span", Od, dt(jt["dcat:accessURL"]), 1)) : Gt("", !0),
              jt["dct:format"] ? (ht(), ft("span", Fd, dt(Le(jt["dct:format"])), 1)) : Gt("", !0)
            ]),
            $("div", Rd, [
              $("button", {
                class: "btn-edit",
                onClick: (wt) => Tt(ct)
              }, dt(h.lang === "de" ? "Bearbeiten" : "Edit"), 9, Nd),
              $("button", {
                class: "btn-remove",
                onClick: (wt) => j(ct)
              }, dt(h.lang === "de" ? "Entfernen" : "Remove"), 9, zd)
            ])
          ], 42, Ad))), 128)),
          $("button", {
            type: "button",
            class: "btn-add",
            onClick: Z
          }, " + " + dt(h.lang === "de" ? "Distribution hinzufügen" : "Add distribution"), 1)
        ], 64)) : (ht(), ft("div", yd, [
          $("p", vd, dt(h.lang === "de" ? "Noch keine Distributionen vorhanden." : "No distributions yet."), 1),
          $("button", {
            class: "btn-add-first",
            onClick: Z
          }, dt(h.lang === "de" ? "Erste Distribution hinzufügen" : "Add first distribution"), 1)
        ])),
        D.value === "modal" && Y.value !== null ? (ht(), Bi(_d, {
          key: 2,
          show: Y.value !== null,
          modelValue: Y.value,
          lang: h.lang,
          formatOptions: x.value,
          availabilityOptions: v,
          uploadConfig: y.value,
          onSave: pe,
          onCancel: Nt[1] || (Nt[1] = (jt) => Y.value = null)
        }, null, 8, ["show", "modelValue", "lang", "formatOptions", "uploadConfig"])) : Gt("", !0)
      ]);
    };
  }
}, $d = /* @__PURE__ */ Be(jd, [["__scopeId", "data-v-9bf8f7a8"]]), Ud = { class: "validation-report" }, Vd = { class: "report-header" }, Gd = { class: "report-title" }, Zd = { class: "report-summary" }, Hd = {
  key: 0,
  class: "badge badge-info"
}, qd = ["aria-label"], Kd = {
  key: 0,
  class: "report-valid",
  role: "status",
  "aria-live": "polite"
}, Wd = {
  key: 0,
  class: "sev-section"
}, Jd = { class: "sev-count" }, Xd = { class: "violation-field" }, Yd = { class: "field-label" }, Qd = { class: "field-id" }, tf = { class: "violation-constraint" }, ef = { class: "constraint-tag" }, nf = { class: "constraint-msg" }, rf = ["aria-label", "onClick"], af = {
  __name: "ValidationReport",
  props: {
    violations: { type: Array, default: () => [] },
    lang: { type: String, default: "de" }
  },
  emits: ["close", "navigate"],
  setup(h) {
    const l = h, d = Jt(() => {
      var v;
      const x = { violation: [], warning: [], info: [] };
      for (const k of l.violations)
        (v = x[k.severity]) == null || v.push(k);
      return x;
    }), y = Jt(() => ({
      violation: d.value.violation.length,
      warning: d.value.warning.length,
      info: d.value.info.length
    }));
    function C(x) {
      var v, k;
      return ((v = x.fieldLabel) == null ? void 0 : v[l.lang]) || ((k = x.fieldLabel) == null ? void 0 : k.en) || x.fieldId;
    }
    function D(x) {
      var k, F;
      const v = {
        violation: { de: "Verstöße", en: "Violations" },
        warning: { de: "Warnungen", en: "Warnings" },
        info: { de: "Hinweise", en: "Info" }
      };
      return ((k = v[x]) == null ? void 0 : k[l.lang]) || ((F = v[x]) == null ? void 0 : F.en) || x;
    }
    return (x, v) => (ht(), ft("div", Ud, [
      $("div", Vd, [
        $("span", Gd, dt(h.lang === "de" ? "SHACL-Validierungsbericht" : "SHACL Validation Report"), 1),
        $("div", Zd, [
          $("span", {
            class: ae(["badge badge-violation", { zero: y.value.violation === 0 }])
          }, [
            v[1] || (v[1] = $("span", { "aria-hidden": "true" }, "✗ ", -1)),
            Un(dt(y.value.violation) + " " + dt(h.lang === "de" ? " Verstoß" + (y.value.violation !== 1 ? "e" : "") : " Violation" + (y.value.violation !== 1 ? "s" : "")), 1)
          ], 2),
          $("span", {
            class: ae(["badge badge-warning", { zero: y.value.warning === 0 }])
          }, [
            v[2] || (v[2] = $("span", { "aria-hidden": "true" }, "⚠ ", -1)),
            Un(dt(y.value.warning) + " " + dt(h.lang === "de" ? " Warnung" + (y.value.warning !== 1 ? "en" : "") : " Warning" + (y.value.warning !== 1 ? "s" : "")), 1)
          ], 2),
          y.value.info > 0 ? (ht(), ft("span", Hd, [
            v[3] || (v[3] = $("span", { "aria-hidden": "true" }, "ℹ ", -1)),
            Un(dt(y.value.info), 1)
          ])) : Gt("", !0)
        ]),
        $("button", {
          class: "btn-close",
          type: "button",
          "aria-label": h.lang === "de" ? "Bericht schließen" : "Close report",
          onClick: v[0] || (v[0] = (k) => x.$emit("close"))
        }, "×", 8, qd)
      ]),
      h.violations.length === 0 ? (ht(), ft("div", Kd, [
        v[4] || (v[4] = $("span", {
          class: "valid-icon",
          "aria-hidden": "true"
        }, "✓", -1)),
        $("span", null, dt(h.lang === "de" ? "Keine Verstöße gefunden." : "No violations found."), 1)
      ])) : Gt("", !0),
      (ht(), ft(re, null, Me(["violation", "warning", "info"], (k) => {
        var F;
        return ht(), ft(re, { key: k }, [
          (F = d.value[k]) != null && F.length ? (ht(), ft("div", Wd, [
            $("div", {
              class: ae(["sev-heading", "sev-" + k])
            }, [
              $("span", null, dt(D(k)), 1),
              $("span", Jd, "(" + dt(d.value[k].length) + ")", 1)
            ], 2),
            (ht(!0), ft(re, null, Me(d.value[k], (Z) => (ht(), ft("div", {
              key: Z.fieldId + "|" + Z.constraint,
              class: ae(["violation-row", "row-" + Z.severity])
            }, [
              $("div", Xd, [
                $("span", Yd, dt(C(Z)), 1),
                $("code", Qd, dt(Z.fieldId), 1)
              ]),
              $("div", tf, [
                $("span", ef, dt(Z.constraint), 1),
                $("span", nf, dt(h.lang === "de" ? Z.messageDe : Z.messageEn), 1)
              ]),
              Z.groupId ? (ht(), ft("button", {
                key: 0,
                type: "button",
                class: "btn-navigate",
                "aria-label": (h.lang === "de" ? "Zum Feld navigieren: " : "Navigate to field: ") + C(Z),
                onClick: (j) => x.$emit("navigate", { fieldId: Z.fieldId, groupId: Z.groupId })
              }, dt(h.lang === "de" ? "Zum Feld" : "Go to field"), 9, rf)) : Gt("", !0)
            ], 2))), 128))
          ])) : Gt("", !0)
        ], 64);
      }), 64))
    ]));
  }
}, fl = /* @__PURE__ */ Be(af, [["__scopeId", "data-v-b7f169b8"]]), ya = {
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
    return h.forEach((y, C) => {
      if (y)
        try {
          new URL(y);
        } catch {
          const D = l === "de" ? `Eintrag ${C + 1}` : `Entry ${C + 1}`;
          d.push(`${D}: ${l === "de" ? "Ungültige URL" : "Invalid URL"}`);
        }
    }), d;
  },
  isEmail: (h, l) => h ? /^[^\s@]+@[^\s@]+\.[^\s@]+$/i.test(h) ? [] : [l === "de" ? "Ungültige E-Mail-Adresse." : "Invalid email address."] : [],
  isDate: (h, l) => h ? /^\d{4}-\d{2}-\d{2}$/.test(h) ? [] : [l === "de" ? "Ungültiges Datum (JJJJ-MM-TT)." : "Invalid date (YYYY-MM-DD)."] : [],
  isWKTorGeoJSON: (h, l) => {
    if (!h) return [];
    const d = h.trim(), y = /^(POINT|LINESTRING|POLYGON|MULTIPOINT|MULTILINESTRING|MULTIPOLYGON|GEOMETRYCOLLECTION)/i.test(d), C = d.startsWith("{") && d.includes('"type"');
    return y || C ? [] : [l === "de" ? "Bitte WKT- oder GeoJSON-Geometrie eingeben." : "Please enter a WKT or GeoJSON geometry."];
  }
};
function sf(h, l) {
  const d = typeof h == "string" ? { [h]: l } : h;
  for (const [y, C] of Object.entries(d)) {
    if (ya[y]) {
      console.warn(`[fieldValidators] "${y}" already exists — skipping. Use a unique name.`);
      continue;
    }
    ya[y] = C;
  }
}
const of = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  fieldValidators: ya,
  registerValidator: sf
}, Symbol.toStringTag, { value: "Module" })), va = {
  ifHVDLegislation: (h) => (h == null ? void 0 : h["dcatap:applicableLegislation"]) === "http://data.europa.eu/eli/reg_impl/2023/138/oj"
};
function lf(h, l) {
  const d = typeof h == "string" ? { [h]: l } : h;
  for (const [y, C] of Object.entries(d)) {
    if (va[y]) {
      console.warn(`[fieldVisibility] "${y}" already exists — skipping. Use a unique name.`);
      continue;
    }
    va[y] = C;
  }
}
function Sl(h, l) {
  if (!h) return !0;
  const d = va[h];
  return d ? d(l) : (console.warn(`[fieldVisibility] unknown function: "${h}"`), !0);
}
function Al(h, l) {
  if (!h) return !1;
  const d = va[h];
  return d ? d(l) : (console.warn(`[fieldVisibility] unknown requiredIf function: "${h}"`), !1);
}
const uf = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  evaluateRequiredIf: Al,
  evaluateVisibleIf: Sl,
  fieldVisibilityFns: va,
  registerVisibility: lf
}, Symbol.toStringTag, { value: "Module" }));
function Oo(h, l) {
  return h == null ? !1 : Array.isArray(h) ? h.some(
    (d) => d && (typeof d == "object" ? d.value || Object.values(d).some((y) => y) : d)
  ) : typeof h == "object" ? l != null && l.subFields ? l.subFields.filter((d) => d.required).every((d) => h[d.id]) : Object.values(h).some((d) => d) : h !== "";
}
function Tl(h, l, d, y) {
  var k, F, Z, j;
  const C = [], D = d === "de";
  if ((h.required || Al(h.requiredIf, y)) && !Oo(l, h)) {
    const q = ((F = (k = h.errorMessages) == null ? void 0 : k.required) == null ? void 0 : F[d]) || (D ? "Dieses Feld ist erforderlich." : "This field is required.");
    return C.push(q), C;
  }
  if (h.validate && Oo(l, h)) {
    const q = ya[h.validate];
    q ? C.push(...q(l, d)) : console.warn(`[useValidation] Unknown validator: "${h.validate}"`);
  }
  const v = typeof l == "object" && l !== null && !Array.isArray(l) && Object.values(l).some((q) => q);
  if (h.type === "object" && h.subFields && v)
    for (const q of h.subFields) {
      const H = Tl(q, l[q.id], d);
      if (H.length) {
        const nt = ((Z = q.label) == null ? void 0 : Z[d]) || ((j = q.label) == null ? void 0 : j.de) || q.id;
        C.push(...H.map((ut) => `${nt}: ${ut}`));
      }
    }
  return C;
}
function hf(h, l, d) {
  const y = {};
  if (!(h != null && h.fields)) return y;
  const C = new Set(
    (h.groups || []).flatMap((D) => D.fields || [])
  );
  for (const [D, x] of Object.entries(h.fields)) {
    if (x.visible === !1 || !C.has(D)) continue;
    const v = Tl(x, l == null ? void 0 : l[D], d, l);
    v.length && (y[D] = v);
  }
  return y;
}
var Dl = {}, Ds = {};
Ds.byteLength = ff;
Ds.toByteArray = _f;
Ds.fromByteArray = yf;
var Gi = [], bi = [], cf = typeof Uint8Array < "u" ? Uint8Array : Array, Bo = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
for (var fr = 0, df = Bo.length; fr < df; ++fr)
  Gi[fr] = Bo[fr], bi[Bo.charCodeAt(fr)] = fr;
bi[45] = 62;
bi[95] = 63;
function Il(h) {
  var l = h.length;
  if (l % 4 > 0)
    throw new Error("Invalid string. Length must be a multiple of 4");
  var d = h.indexOf("=");
  d === -1 && (d = l);
  var y = d === l ? 0 : 4 - d % 4;
  return [d, y];
}
function ff(h) {
  var l = Il(h), d = l[0], y = l[1];
  return (d + y) * 3 / 4 - y;
}
function pf(h, l, d) {
  return (l + d) * 3 / 4 - d;
}
function _f(h) {
  var l, d = Il(h), y = d[0], C = d[1], D = new cf(pf(h, y, C)), x = 0, v = C > 0 ? y - 4 : y, k;
  for (k = 0; k < v; k += 4)
    l = bi[h.charCodeAt(k)] << 18 | bi[h.charCodeAt(k + 1)] << 12 | bi[h.charCodeAt(k + 2)] << 6 | bi[h.charCodeAt(k + 3)], D[x++] = l >> 16 & 255, D[x++] = l >> 8 & 255, D[x++] = l & 255;
  return C === 2 && (l = bi[h.charCodeAt(k)] << 2 | bi[h.charCodeAt(k + 1)] >> 4, D[x++] = l & 255), C === 1 && (l = bi[h.charCodeAt(k)] << 10 | bi[h.charCodeAt(k + 1)] << 4 | bi[h.charCodeAt(k + 2)] >> 2, D[x++] = l >> 8 & 255, D[x++] = l & 255), D;
}
function gf(h) {
  return Gi[h >> 18 & 63] + Gi[h >> 12 & 63] + Gi[h >> 6 & 63] + Gi[h & 63];
}
function mf(h, l, d) {
  for (var y, C = [], D = l; D < d; D += 3)
    y = (h[D] << 16 & 16711680) + (h[D + 1] << 8 & 65280) + (h[D + 2] & 255), C.push(gf(y));
  return C.join("");
}
function yf(h) {
  for (var l, d = h.length, y = d % 3, C = [], D = 16383, x = 0, v = d - y; x < v; x += D)
    C.push(mf(h, x, x + D > v ? v : x + D));
  return y === 1 ? (l = h[d - 1], C.push(
    Gi[l >> 2] + Gi[l << 4 & 63] + "=="
  )) : y === 2 && (l = (h[d - 2] << 8) + h[d - 1], C.push(
    Gi[l >> 10] + Gi[l >> 4 & 63] + Gi[l << 2 & 63] + "="
  )), C.join("");
}
var Vo = {};
/*! ieee754. BSD-3-Clause License. Feross Aboukhadijeh <https://feross.org/opensource> */
Vo.read = function(h, l, d, y, C) {
  var D, x, v = C * 8 - y - 1, k = (1 << v) - 1, F = k >> 1, Z = -7, j = d ? C - 1 : 0, q = d ? -1 : 1, H = h[l + j];
  for (j += q, D = H & (1 << -Z) - 1, H >>= -Z, Z += v; Z > 0; D = D * 256 + h[l + j], j += q, Z -= 8)
    ;
  for (x = D & (1 << -Z) - 1, D >>= -Z, Z += y; Z > 0; x = x * 256 + h[l + j], j += q, Z -= 8)
    ;
  if (D === 0)
    D = 1 - F;
  else {
    if (D === k)
      return x ? NaN : (H ? -1 : 1) * (1 / 0);
    x = x + Math.pow(2, y), D = D - F;
  }
  return (H ? -1 : 1) * x * Math.pow(2, D - y);
};
Vo.write = function(h, l, d, y, C, D) {
  var x, v, k, F = D * 8 - C - 1, Z = (1 << F) - 1, j = Z >> 1, q = C === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0, H = y ? 0 : D - 1, nt = y ? 1 : -1, ut = l < 0 || l === 0 && 1 / l < 0 ? 1 : 0;
  for (l = Math.abs(l), isNaN(l) || l === 1 / 0 ? (v = isNaN(l) ? 1 : 0, x = Z) : (x = Math.floor(Math.log(l) / Math.LN2), l * (k = Math.pow(2, -x)) < 1 && (x--, k *= 2), x + j >= 1 ? l += q / k : l += q * Math.pow(2, 1 - j), l * k >= 2 && (x++, k /= 2), x + j >= Z ? (v = 0, x = Z) : x + j >= 1 ? (v = (l * k - 1) * Math.pow(2, C), x = x + j) : (v = l * Math.pow(2, j - 1) * Math.pow(2, C), x = 0)); C >= 8; h[d + H] = v & 255, H += nt, v /= 256, C -= 8)
    ;
  for (x = x << C | v, F += C; F > 0; h[d + H] = x & 255, H += nt, x /= 256, F -= 8)
    ;
  h[d + H - nt] |= ut * 128;
};
/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <https://feross.org>
 * @license  MIT
 */
(function(h) {
  const l = Ds, d = Vo, y = typeof Symbol == "function" && typeof Symbol.for == "function" ? Symbol.for("nodejs.util.inspect.custom") : null;
  h.Buffer = v, h.SlowBuffer = Et, h.INSPECT_MAX_BYTES = 50;
  const C = 2147483647;
  h.kMaxLength = C, v.TYPED_ARRAY_SUPPORT = D(), !v.TYPED_ARRAY_SUPPORT && typeof console < "u" && typeof console.error == "function" && console.error(
    "This browser lacks typed array (Uint8Array) support which is required by `buffer` v5.x. Use `buffer` v4.x if you require old browser support."
  );
  function D() {
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
  function x(B) {
    if (B > C)
      throw new RangeError('The value "' + B + '" is invalid for option "size"');
    const p = new Uint8Array(B);
    return Object.setPrototypeOf(p, v.prototype), p;
  }
  function v(B, p, m) {
    if (typeof B == "number") {
      if (typeof p == "string")
        throw new TypeError(
          'The "string" argument must be of type string. Received type number'
        );
      return j(B);
    }
    return k(B, p, m);
  }
  v.poolSize = 8192;
  function k(B, p, m) {
    if (typeof B == "string")
      return q(B, p);
    if (ArrayBuffer.isView(B))
      return nt(B);
    if (B == null)
      throw new TypeError(
        "The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " + typeof B
      );
    if (We(B, ArrayBuffer) || B && We(B.buffer, ArrayBuffer) || typeof SharedArrayBuffer < "u" && (We(B, SharedArrayBuffer) || B && We(B.buffer, SharedArrayBuffer)))
      return ut(B, p, m);
    if (typeof B == "number")
      throw new TypeError(
        'The "value" argument must not be of type number. Received type number'
      );
    const I = B.valueOf && B.valueOf();
    if (I != null && I !== B)
      return v.from(I, p, m);
    const K = _t(B);
    if (K) return K;
    if (typeof Symbol < "u" && Symbol.toPrimitive != null && typeof B[Symbol.toPrimitive] == "function")
      return v.from(B[Symbol.toPrimitive]("string"), p, m);
    throw new TypeError(
      "The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " + typeof B
    );
  }
  v.from = function(B, p, m) {
    return k(B, p, m);
  }, Object.setPrototypeOf(v.prototype, Uint8Array.prototype), Object.setPrototypeOf(v, Uint8Array);
  function F(B) {
    if (typeof B != "number")
      throw new TypeError('"size" argument must be of type number');
    if (B < 0)
      throw new RangeError('The value "' + B + '" is invalid for option "size"');
  }
  function Z(B, p, m) {
    return F(B), B <= 0 ? x(B) : p !== void 0 ? typeof m == "string" ? x(B).fill(p, m) : x(B).fill(p) : x(B);
  }
  v.alloc = function(B, p, m) {
    return Z(B, p, m);
  };
  function j(B) {
    return F(B), x(B < 0 ? 0 : Y(B) | 0);
  }
  v.allocUnsafe = function(B) {
    return j(B);
  }, v.allocUnsafeSlow = function(B) {
    return j(B);
  };
  function q(B, p) {
    if ((typeof p != "string" || p === "") && (p = "utf8"), !v.isEncoding(p))
      throw new TypeError("Unknown encoding: " + p);
    const m = Tt(B, p) | 0;
    let I = x(m);
    const K = I.write(B, p);
    return K !== m && (I = I.slice(0, K)), I;
  }
  function H(B) {
    const p = B.length < 0 ? 0 : Y(B.length) | 0, m = x(p);
    for (let I = 0; I < p; I += 1)
      m[I] = B[I] & 255;
    return m;
  }
  function nt(B) {
    if (We(B, Uint8Array)) {
      const p = new Uint8Array(B);
      return ut(p.buffer, p.byteOffset, p.byteLength);
    }
    return H(B);
  }
  function ut(B, p, m) {
    if (p < 0 || B.byteLength < p)
      throw new RangeError('"offset" is outside of buffer bounds');
    if (B.byteLength < p + (m || 0))
      throw new RangeError('"length" is outside of buffer bounds');
    let I;
    return p === void 0 && m === void 0 ? I = new Uint8Array(B) : m === void 0 ? I = new Uint8Array(B, p) : I = new Uint8Array(B, p, m), Object.setPrototypeOf(I, v.prototype), I;
  }
  function _t(B) {
    if (v.isBuffer(B)) {
      const p = Y(B.length) | 0, m = x(p);
      return m.length === 0 || B.copy(m, 0, 0, p), m;
    }
    if (B.length !== void 0)
      return typeof B.length != "number" || an(B.length) ? x(0) : H(B);
    if (B.type === "Buffer" && Array.isArray(B.data))
      return H(B.data);
  }
  function Y(B) {
    if (B >= C)
      throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x" + C.toString(16) + " bytes");
    return B | 0;
  }
  function Et(B) {
    return +B != B && (B = 0), v.alloc(+B);
  }
  v.isBuffer = function(p) {
    return p != null && p._isBuffer === !0 && p !== v.prototype;
  }, v.compare = function(p, m) {
    if (We(p, Uint8Array) && (p = v.from(p, p.offset, p.byteLength)), We(m, Uint8Array) && (m = v.from(m, m.offset, m.byteLength)), !v.isBuffer(p) || !v.isBuffer(m))
      throw new TypeError(
        'The "buf1", "buf2" arguments must be one of type Buffer or Uint8Array'
      );
    if (p === m) return 0;
    let I = p.length, K = m.length;
    for (let rt = 0, pt = Math.min(I, K); rt < pt; ++rt)
      if (p[rt] !== m[rt]) {
        I = p[rt], K = m[rt];
        break;
      }
    return I < K ? -1 : K < I ? 1 : 0;
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
  }, v.concat = function(p, m) {
    if (!Array.isArray(p))
      throw new TypeError('"list" argument must be an Array of Buffers');
    if (p.length === 0)
      return v.alloc(0);
    let I;
    if (m === void 0)
      for (m = 0, I = 0; I < p.length; ++I)
        m += p[I].length;
    const K = v.allocUnsafe(m);
    let rt = 0;
    for (I = 0; I < p.length; ++I) {
      let pt = p[I];
      if (We(pt, Uint8Array))
        rt + pt.length > K.length ? (v.isBuffer(pt) || (pt = v.from(pt)), pt.copy(K, rt)) : Uint8Array.prototype.set.call(
          K,
          pt,
          rt
        );
      else if (v.isBuffer(pt))
        pt.copy(K, rt);
      else
        throw new TypeError('"list" argument must be an Array of Buffers');
      rt += pt.length;
    }
    return K;
  };
  function Tt(B, p) {
    if (v.isBuffer(B))
      return B.length;
    if (ArrayBuffer.isView(B) || We(B, ArrayBuffer))
      return B.byteLength;
    if (typeof B != "string")
      throw new TypeError(
        'The "string" argument must be one of type string, Buffer, or ArrayBuffer. Received type ' + typeof B
      );
    const m = B.length, I = arguments.length > 2 && arguments[2] === !0;
    if (!I && m === 0) return 0;
    let K = !1;
    for (; ; )
      switch (p) {
        case "ascii":
        case "latin1":
        case "binary":
          return m;
        case "utf8":
        case "utf-8":
          return Ai(B).length;
        case "ucs2":
        case "ucs-2":
        case "utf16le":
        case "utf-16le":
          return m * 2;
        case "hex":
          return m >>> 1;
        case "base64":
          return wn(B).length;
        default:
          if (K)
            return I ? -1 : Ai(B).length;
          p = ("" + p).toLowerCase(), K = !0;
      }
  }
  v.byteLength = Tt;
  function pe(B, p, m) {
    let I = !1;
    if ((p === void 0 || p < 0) && (p = 0), p > this.length || ((m === void 0 || m > this.length) && (m = this.length), m <= 0) || (m >>>= 0, p >>>= 0, m <= p))
      return "";
    for (B || (B = "utf8"); ; )
      switch (B) {
        case "hex":
          return jt(this, p, m);
        case "utf8":
        case "utf-8":
          return Le(this, p, m);
        case "ascii":
          return kt(this, p, m);
        case "latin1":
        case "binary":
          return ot(this, p, m);
        case "base64":
          return Re(this, p, m);
        case "ucs2":
        case "ucs-2":
        case "utf16le":
        case "utf-16le":
          return ct(this, p, m);
        default:
          if (I) throw new TypeError("Unknown encoding: " + B);
          B = (B + "").toLowerCase(), I = !0;
      }
  }
  v.prototype._isBuffer = !0;
  function vt(B, p, m) {
    const I = B[p];
    B[p] = B[m], B[m] = I;
  }
  v.prototype.swap16 = function() {
    const p = this.length;
    if (p % 2 !== 0)
      throw new RangeError("Buffer size must be a multiple of 16-bits");
    for (let m = 0; m < p; m += 2)
      vt(this, m, m + 1);
    return this;
  }, v.prototype.swap32 = function() {
    const p = this.length;
    if (p % 4 !== 0)
      throw new RangeError("Buffer size must be a multiple of 32-bits");
    for (let m = 0; m < p; m += 4)
      vt(this, m, m + 3), vt(this, m + 1, m + 2);
    return this;
  }, v.prototype.swap64 = function() {
    const p = this.length;
    if (p % 8 !== 0)
      throw new RangeError("Buffer size must be a multiple of 64-bits");
    for (let m = 0; m < p; m += 8)
      vt(this, m, m + 7), vt(this, m + 1, m + 6), vt(this, m + 2, m + 5), vt(this, m + 3, m + 4);
    return this;
  }, v.prototype.toString = function() {
    const p = this.length;
    return p === 0 ? "" : arguments.length === 0 ? Le(this, 0, p) : pe.apply(this, arguments);
  }, v.prototype.toLocaleString = v.prototype.toString, v.prototype.equals = function(p) {
    if (!v.isBuffer(p)) throw new TypeError("Argument must be a Buffer");
    return this === p ? !0 : v.compare(this, p) === 0;
  }, v.prototype.inspect = function() {
    let p = "";
    const m = h.INSPECT_MAX_BYTES;
    return p = this.toString("hex", 0, m).replace(/(.{2})/g, "$1 ").trim(), this.length > m && (p += " ... "), "<Buffer " + p + ">";
  }, y && (v.prototype[y] = v.prototype.inspect), v.prototype.compare = function(p, m, I, K, rt) {
    if (We(p, Uint8Array) && (p = v.from(p, p.offset, p.byteLength)), !v.isBuffer(p))
      throw new TypeError(
        'The "target" argument must be one of type Buffer or Uint8Array. Received type ' + typeof p
      );
    if (m === void 0 && (m = 0), I === void 0 && (I = p ? p.length : 0), K === void 0 && (K = 0), rt === void 0 && (rt = this.length), m < 0 || I > p.length || K < 0 || rt > this.length)
      throw new RangeError("out of range index");
    if (K >= rt && m >= I)
      return 0;
    if (K >= rt)
      return -1;
    if (m >= I)
      return 1;
    if (m >>>= 0, I >>>= 0, K >>>= 0, rt >>>= 0, this === p) return 0;
    let pt = rt - K, Zt = I - m;
    const de = Math.min(pt, Zt), ge = this.slice(K, rt), ce = p.slice(m, I);
    for (let fe = 0; fe < de; ++fe)
      if (ge[fe] !== ce[fe]) {
        pt = ge[fe], Zt = ce[fe];
        break;
      }
    return pt < Zt ? -1 : Zt < pt ? 1 : 0;
  };
  function St(B, p, m, I, K) {
    if (B.length === 0) return -1;
    if (typeof m == "string" ? (I = m, m = 0) : m > 2147483647 ? m = 2147483647 : m < -2147483648 && (m = -2147483648), m = +m, an(m) && (m = K ? 0 : B.length - 1), m < 0 && (m = B.length + m), m >= B.length) {
      if (K) return -1;
      m = B.length - 1;
    } else if (m < 0)
      if (K) m = 0;
      else return -1;
    if (typeof p == "string" && (p = v.from(p, I)), v.isBuffer(p))
      return p.length === 0 ? -1 : Dt(B, p, m, I, K);
    if (typeof p == "number")
      return p = p & 255, typeof Uint8Array.prototype.indexOf == "function" ? K ? Uint8Array.prototype.indexOf.call(B, p, m) : Uint8Array.prototype.lastIndexOf.call(B, p, m) : Dt(B, [p], m, I, K);
    throw new TypeError("val must be string, number or Buffer");
  }
  function Dt(B, p, m, I, K) {
    let rt = 1, pt = B.length, Zt = p.length;
    if (I !== void 0 && (I = String(I).toLowerCase(), I === "ucs2" || I === "ucs-2" || I === "utf16le" || I === "utf-16le")) {
      if (B.length < 2 || p.length < 2)
        return -1;
      rt = 2, pt /= 2, Zt /= 2, m /= 2;
    }
    function de(ce, fe) {
      return rt === 1 ? ce[fe] : ce.readUInt16BE(fe * rt);
    }
    let ge;
    if (K) {
      let ce = -1;
      for (ge = m; ge < pt; ge++)
        if (de(B, ge) === de(p, ce === -1 ? 0 : ge - ce)) {
          if (ce === -1 && (ce = ge), ge - ce + 1 === Zt) return ce * rt;
        } else
          ce !== -1 && (ge -= ge - ce), ce = -1;
    } else
      for (m + Zt > pt && (m = pt - Zt), ge = m; ge >= 0; ge--) {
        let ce = !0;
        for (let fe = 0; fe < Zt; fe++)
          if (de(B, ge + fe) !== de(p, fe)) {
            ce = !1;
            break;
          }
        if (ce) return ge;
      }
    return -1;
  }
  v.prototype.includes = function(p, m, I) {
    return this.indexOf(p, m, I) !== -1;
  }, v.prototype.indexOf = function(p, m, I) {
    return St(this, p, m, I, !0);
  }, v.prototype.lastIndexOf = function(p, m, I) {
    return St(this, p, m, I, !1);
  };
  function le(B, p, m, I) {
    m = Number(m) || 0;
    const K = B.length - m;
    I ? (I = Number(I), I > K && (I = K)) : I = K;
    const rt = p.length;
    I > rt / 2 && (I = rt / 2);
    let pt;
    for (pt = 0; pt < I; ++pt) {
      const Zt = parseInt(p.substr(pt * 2, 2), 16);
      if (an(Zt)) return pt;
      B[m + pt] = Zt;
    }
    return pt;
  }
  function te(B, p, m, I) {
    return Di(Ai(p, B.length - m), B, m, I);
  }
  function ee(B, p, m, I) {
    return Di(Ti(p), B, m, I);
  }
  function Kt(B, p, m, I) {
    return Di(wn(p), B, m, I);
  }
  function _e(B, p, m, I) {
    return Di(Hn(p, B.length - m), B, m, I);
  }
  v.prototype.write = function(p, m, I, K) {
    if (m === void 0)
      K = "utf8", I = this.length, m = 0;
    else if (I === void 0 && typeof m == "string")
      K = m, I = this.length, m = 0;
    else if (isFinite(m))
      m = m >>> 0, isFinite(I) ? (I = I >>> 0, K === void 0 && (K = "utf8")) : (K = I, I = void 0);
    else
      throw new Error(
        "Buffer.write(string, encoding, offset[, length]) is no longer supported"
      );
    const rt = this.length - m;
    if ((I === void 0 || I > rt) && (I = rt), p.length > 0 && (I < 0 || m < 0) || m > this.length)
      throw new RangeError("Attempt to write outside buffer bounds");
    K || (K = "utf8");
    let pt = !1;
    for (; ; )
      switch (K) {
        case "hex":
          return le(this, p, m, I);
        case "utf8":
        case "utf-8":
          return te(this, p, m, I);
        case "ascii":
        case "latin1":
        case "binary":
          return ee(this, p, m, I);
        case "base64":
          return Kt(this, p, m, I);
        case "ucs2":
        case "ucs-2":
        case "utf16le":
        case "utf-16le":
          return _e(this, p, m, I);
        default:
          if (pt) throw new TypeError("Unknown encoding: " + K);
          K = ("" + K).toLowerCase(), pt = !0;
      }
  }, v.prototype.toJSON = function() {
    return {
      type: "Buffer",
      data: Array.prototype.slice.call(this._arr || this, 0)
    };
  };
  function Re(B, p, m) {
    return p === 0 && m === B.length ? l.fromByteArray(B) : l.fromByteArray(B.slice(p, m));
  }
  function Le(B, p, m) {
    m = Math.min(B.length, m);
    const I = [];
    let K = p;
    for (; K < m; ) {
      const rt = B[K];
      let pt = null, Zt = rt > 239 ? 4 : rt > 223 ? 3 : rt > 191 ? 2 : 1;
      if (K + Zt <= m) {
        let de, ge, ce, fe;
        switch (Zt) {
          case 1:
            rt < 128 && (pt = rt);
            break;
          case 2:
            de = B[K + 1], (de & 192) === 128 && (fe = (rt & 31) << 6 | de & 63, fe > 127 && (pt = fe));
            break;
          case 3:
            de = B[K + 1], ge = B[K + 2], (de & 192) === 128 && (ge & 192) === 128 && (fe = (rt & 15) << 12 | (de & 63) << 6 | ge & 63, fe > 2047 && (fe < 55296 || fe > 57343) && (pt = fe));
            break;
          case 4:
            de = B[K + 1], ge = B[K + 2], ce = B[K + 3], (de & 192) === 128 && (ge & 192) === 128 && (ce & 192) === 128 && (fe = (rt & 15) << 18 | (de & 63) << 12 | (ge & 63) << 6 | ce & 63, fe > 65535 && fe < 1114112 && (pt = fe));
        }
      }
      pt === null ? (pt = 65533, Zt = 1) : pt > 65535 && (pt -= 65536, I.push(pt >>> 10 & 1023 | 55296), pt = 56320 | pt & 1023), I.push(pt), K += Zt;
    }
    return Nt(I);
  }
  const At = 4096;
  function Nt(B) {
    const p = B.length;
    if (p <= At)
      return String.fromCharCode.apply(String, B);
    let m = "", I = 0;
    for (; I < p; )
      m += String.fromCharCode.apply(
        String,
        B.slice(I, I += At)
      );
    return m;
  }
  function kt(B, p, m) {
    let I = "";
    m = Math.min(B.length, m);
    for (let K = p; K < m; ++K)
      I += String.fromCharCode(B[K] & 127);
    return I;
  }
  function ot(B, p, m) {
    let I = "";
    m = Math.min(B.length, m);
    for (let K = p; K < m; ++K)
      I += String.fromCharCode(B[K]);
    return I;
  }
  function jt(B, p, m) {
    const I = B.length;
    (!p || p < 0) && (p = 0), (!m || m < 0 || m > I) && (m = I);
    let K = "";
    for (let rt = p; rt < m; ++rt)
      K += vr[B[rt]];
    return K;
  }
  function ct(B, p, m) {
    const I = B.slice(p, m);
    let K = "";
    for (let rt = 0; rt < I.length - 1; rt += 2)
      K += String.fromCharCode(I[rt] + I[rt + 1] * 256);
    return K;
  }
  v.prototype.slice = function(p, m) {
    const I = this.length;
    p = ~~p, m = m === void 0 ? I : ~~m, p < 0 ? (p += I, p < 0 && (p = 0)) : p > I && (p = I), m < 0 ? (m += I, m < 0 && (m = 0)) : m > I && (m = I), m < p && (m = p);
    const K = this.subarray(p, m);
    return Object.setPrototypeOf(K, v.prototype), K;
  };
  function wt(B, p, m) {
    if (B % 1 !== 0 || B < 0) throw new RangeError("offset is not uint");
    if (B + p > m) throw new RangeError("Trying to access beyond buffer length");
  }
  v.prototype.readUintLE = v.prototype.readUIntLE = function(p, m, I) {
    p = p >>> 0, m = m >>> 0, I || wt(p, m, this.length);
    let K = this[p], rt = 1, pt = 0;
    for (; ++pt < m && (rt *= 256); )
      K += this[p + pt] * rt;
    return K;
  }, v.prototype.readUintBE = v.prototype.readUIntBE = function(p, m, I) {
    p = p >>> 0, m = m >>> 0, I || wt(p, m, this.length);
    let K = this[p + --m], rt = 1;
    for (; m > 0 && (rt *= 256); )
      K += this[p + --m] * rt;
    return K;
  }, v.prototype.readUint8 = v.prototype.readUInt8 = function(p, m) {
    return p = p >>> 0, m || wt(p, 1, this.length), this[p];
  }, v.prototype.readUint16LE = v.prototype.readUInt16LE = function(p, m) {
    return p = p >>> 0, m || wt(p, 2, this.length), this[p] | this[p + 1] << 8;
  }, v.prototype.readUint16BE = v.prototype.readUInt16BE = function(p, m) {
    return p = p >>> 0, m || wt(p, 2, this.length), this[p] << 8 | this[p + 1];
  }, v.prototype.readUint32LE = v.prototype.readUInt32LE = function(p, m) {
    return p = p >>> 0, m || wt(p, 4, this.length), (this[p] | this[p + 1] << 8 | this[p + 2] << 16) + this[p + 3] * 16777216;
  }, v.prototype.readUint32BE = v.prototype.readUInt32BE = function(p, m) {
    return p = p >>> 0, m || wt(p, 4, this.length), this[p] * 16777216 + (this[p + 1] << 16 | this[p + 2] << 8 | this[p + 3]);
  }, v.prototype.readBigUInt64LE = hi(function(p) {
    p = p >>> 0, ui(p, "offset");
    const m = this[p], I = this[p + 7];
    (m === void 0 || I === void 0) && Si(p, this.length - 8);
    const K = m + this[++p] * 2 ** 8 + this[++p] * 2 ** 16 + this[++p] * 2 ** 24, rt = this[++p] + this[++p] * 2 ** 8 + this[++p] * 2 ** 16 + I * 2 ** 24;
    return BigInt(K) + (BigInt(rt) << BigInt(32));
  }), v.prototype.readBigUInt64BE = hi(function(p) {
    p = p >>> 0, ui(p, "offset");
    const m = this[p], I = this[p + 7];
    (m === void 0 || I === void 0) && Si(p, this.length - 8);
    const K = m * 2 ** 24 + this[++p] * 2 ** 16 + this[++p] * 2 ** 8 + this[++p], rt = this[++p] * 2 ** 24 + this[++p] * 2 ** 16 + this[++p] * 2 ** 8 + I;
    return (BigInt(K) << BigInt(32)) + BigInt(rt);
  }), v.prototype.readIntLE = function(p, m, I) {
    p = p >>> 0, m = m >>> 0, I || wt(p, m, this.length);
    let K = this[p], rt = 1, pt = 0;
    for (; ++pt < m && (rt *= 256); )
      K += this[p + pt] * rt;
    return rt *= 128, K >= rt && (K -= Math.pow(2, 8 * m)), K;
  }, v.prototype.readIntBE = function(p, m, I) {
    p = p >>> 0, m = m >>> 0, I || wt(p, m, this.length);
    let K = m, rt = 1, pt = this[p + --K];
    for (; K > 0 && (rt *= 256); )
      pt += this[p + --K] * rt;
    return rt *= 128, pt >= rt && (pt -= Math.pow(2, 8 * m)), pt;
  }, v.prototype.readInt8 = function(p, m) {
    return p = p >>> 0, m || wt(p, 1, this.length), this[p] & 128 ? (255 - this[p] + 1) * -1 : this[p];
  }, v.prototype.readInt16LE = function(p, m) {
    p = p >>> 0, m || wt(p, 2, this.length);
    const I = this[p] | this[p + 1] << 8;
    return I & 32768 ? I | 4294901760 : I;
  }, v.prototype.readInt16BE = function(p, m) {
    p = p >>> 0, m || wt(p, 2, this.length);
    const I = this[p + 1] | this[p] << 8;
    return I & 32768 ? I | 4294901760 : I;
  }, v.prototype.readInt32LE = function(p, m) {
    return p = p >>> 0, m || wt(p, 4, this.length), this[p] | this[p + 1] << 8 | this[p + 2] << 16 | this[p + 3] << 24;
  }, v.prototype.readInt32BE = function(p, m) {
    return p = p >>> 0, m || wt(p, 4, this.length), this[p] << 24 | this[p + 1] << 16 | this[p + 2] << 8 | this[p + 3];
  }, v.prototype.readBigInt64LE = hi(function(p) {
    p = p >>> 0, ui(p, "offset");
    const m = this[p], I = this[p + 7];
    (m === void 0 || I === void 0) && Si(p, this.length - 8);
    const K = this[p + 4] + this[p + 5] * 2 ** 8 + this[p + 6] * 2 ** 16 + (I << 24);
    return (BigInt(K) << BigInt(32)) + BigInt(m + this[++p] * 2 ** 8 + this[++p] * 2 ** 16 + this[++p] * 2 ** 24);
  }), v.prototype.readBigInt64BE = hi(function(p) {
    p = p >>> 0, ui(p, "offset");
    const m = this[p], I = this[p + 7];
    (m === void 0 || I === void 0) && Si(p, this.length - 8);
    const K = (m << 24) + // Overflow
    this[++p] * 2 ** 16 + this[++p] * 2 ** 8 + this[++p];
    return (BigInt(K) << BigInt(32)) + BigInt(this[++p] * 2 ** 24 + this[++p] * 2 ** 16 + this[++p] * 2 ** 8 + I);
  }), v.prototype.readFloatLE = function(p, m) {
    return p = p >>> 0, m || wt(p, 4, this.length), d.read(this, p, !0, 23, 4);
  }, v.prototype.readFloatBE = function(p, m) {
    return p = p >>> 0, m || wt(p, 4, this.length), d.read(this, p, !1, 23, 4);
  }, v.prototype.readDoubleLE = function(p, m) {
    return p = p >>> 0, m || wt(p, 8, this.length), d.read(this, p, !0, 52, 8);
  }, v.prototype.readDoubleBE = function(p, m) {
    return p = p >>> 0, m || wt(p, 8, this.length), d.read(this, p, !1, 52, 8);
  };
  function Mt(B, p, m, I, K, rt) {
    if (!v.isBuffer(B)) throw new TypeError('"buffer" argument must be a Buffer instance');
    if (p > K || p < rt) throw new RangeError('"value" argument is out of bounds');
    if (m + I > B.length) throw new RangeError("Index out of range");
  }
  v.prototype.writeUintLE = v.prototype.writeUIntLE = function(p, m, I, K) {
    if (p = +p, m = m >>> 0, I = I >>> 0, !K) {
      const Zt = Math.pow(2, 8 * I) - 1;
      Mt(this, p, m, I, Zt, 0);
    }
    let rt = 1, pt = 0;
    for (this[m] = p & 255; ++pt < I && (rt *= 256); )
      this[m + pt] = p / rt & 255;
    return m + I;
  }, v.prototype.writeUintBE = v.prototype.writeUIntBE = function(p, m, I, K) {
    if (p = +p, m = m >>> 0, I = I >>> 0, !K) {
      const Zt = Math.pow(2, 8 * I) - 1;
      Mt(this, p, m, I, Zt, 0);
    }
    let rt = I - 1, pt = 1;
    for (this[m + rt] = p & 255; --rt >= 0 && (pt *= 256); )
      this[m + rt] = p / pt & 255;
    return m + I;
  }, v.prototype.writeUint8 = v.prototype.writeUInt8 = function(p, m, I) {
    return p = +p, m = m >>> 0, I || Mt(this, p, m, 1, 255, 0), this[m] = p & 255, m + 1;
  }, v.prototype.writeUint16LE = v.prototype.writeUInt16LE = function(p, m, I) {
    return p = +p, m = m >>> 0, I || Mt(this, p, m, 2, 65535, 0), this[m] = p & 255, this[m + 1] = p >>> 8, m + 2;
  }, v.prototype.writeUint16BE = v.prototype.writeUInt16BE = function(p, m, I) {
    return p = +p, m = m >>> 0, I || Mt(this, p, m, 2, 65535, 0), this[m] = p >>> 8, this[m + 1] = p & 255, m + 2;
  }, v.prototype.writeUint32LE = v.prototype.writeUInt32LE = function(p, m, I) {
    return p = +p, m = m >>> 0, I || Mt(this, p, m, 4, 4294967295, 0), this[m + 3] = p >>> 24, this[m + 2] = p >>> 16, this[m + 1] = p >>> 8, this[m] = p & 255, m + 4;
  }, v.prototype.writeUint32BE = v.prototype.writeUInt32BE = function(p, m, I) {
    return p = +p, m = m >>> 0, I || Mt(this, p, m, 4, 4294967295, 0), this[m] = p >>> 24, this[m + 1] = p >>> 16, this[m + 2] = p >>> 8, this[m + 3] = p & 255, m + 4;
  };
  function se(B, p, m, I, K) {
    Pi(p, I, K, B, m, 7);
    let rt = Number(p & BigInt(4294967295));
    B[m++] = rt, rt = rt >> 8, B[m++] = rt, rt = rt >> 8, B[m++] = rt, rt = rt >> 8, B[m++] = rt;
    let pt = Number(p >> BigInt(32) & BigInt(4294967295));
    return B[m++] = pt, pt = pt >> 8, B[m++] = pt, pt = pt >> 8, B[m++] = pt, pt = pt >> 8, B[m++] = pt, m;
  }
  function Vt(B, p, m, I, K) {
    Pi(p, I, K, B, m, 7);
    let rt = Number(p & BigInt(4294967295));
    B[m + 7] = rt, rt = rt >> 8, B[m + 6] = rt, rt = rt >> 8, B[m + 5] = rt, rt = rt >> 8, B[m + 4] = rt;
    let pt = Number(p >> BigInt(32) & BigInt(4294967295));
    return B[m + 3] = pt, pt = pt >> 8, B[m + 2] = pt, pt = pt >> 8, B[m + 1] = pt, pt = pt >> 8, B[m] = pt, m + 8;
  }
  v.prototype.writeBigUInt64LE = hi(function(p, m = 0) {
    return se(this, p, m, BigInt(0), BigInt("0xffffffffffffffff"));
  }), v.prototype.writeBigUInt64BE = hi(function(p, m = 0) {
    return Vt(this, p, m, BigInt(0), BigInt("0xffffffffffffffff"));
  }), v.prototype.writeIntLE = function(p, m, I, K) {
    if (p = +p, m = m >>> 0, !K) {
      const de = Math.pow(2, 8 * I - 1);
      Mt(this, p, m, I, de - 1, -de);
    }
    let rt = 0, pt = 1, Zt = 0;
    for (this[m] = p & 255; ++rt < I && (pt *= 256); )
      p < 0 && Zt === 0 && this[m + rt - 1] !== 0 && (Zt = 1), this[m + rt] = (p / pt >> 0) - Zt & 255;
    return m + I;
  }, v.prototype.writeIntBE = function(p, m, I, K) {
    if (p = +p, m = m >>> 0, !K) {
      const de = Math.pow(2, 8 * I - 1);
      Mt(this, p, m, I, de - 1, -de);
    }
    let rt = I - 1, pt = 1, Zt = 0;
    for (this[m + rt] = p & 255; --rt >= 0 && (pt *= 256); )
      p < 0 && Zt === 0 && this[m + rt + 1] !== 0 && (Zt = 1), this[m + rt] = (p / pt >> 0) - Zt & 255;
    return m + I;
  }, v.prototype.writeInt8 = function(p, m, I) {
    return p = +p, m = m >>> 0, I || Mt(this, p, m, 1, 127, -128), p < 0 && (p = 255 + p + 1), this[m] = p & 255, m + 1;
  }, v.prototype.writeInt16LE = function(p, m, I) {
    return p = +p, m = m >>> 0, I || Mt(this, p, m, 2, 32767, -32768), this[m] = p & 255, this[m + 1] = p >>> 8, m + 2;
  }, v.prototype.writeInt16BE = function(p, m, I) {
    return p = +p, m = m >>> 0, I || Mt(this, p, m, 2, 32767, -32768), this[m] = p >>> 8, this[m + 1] = p & 255, m + 2;
  }, v.prototype.writeInt32LE = function(p, m, I) {
    return p = +p, m = m >>> 0, I || Mt(this, p, m, 4, 2147483647, -2147483648), this[m] = p & 255, this[m + 1] = p >>> 8, this[m + 2] = p >>> 16, this[m + 3] = p >>> 24, m + 4;
  }, v.prototype.writeInt32BE = function(p, m, I) {
    return p = +p, m = m >>> 0, I || Mt(this, p, m, 4, 2147483647, -2147483648), p < 0 && (p = 4294967295 + p + 1), this[m] = p >>> 24, this[m + 1] = p >>> 16, this[m + 2] = p >>> 8, this[m + 3] = p & 255, m + 4;
  }, v.prototype.writeBigInt64LE = hi(function(p, m = 0) {
    return se(this, p, m, -BigInt("0x8000000000000000"), BigInt("0x7fffffffffffffff"));
  }), v.prototype.writeBigInt64BE = hi(function(p, m = 0) {
    return Vt(this, p, m, -BigInt("0x8000000000000000"), BigInt("0x7fffffffffffffff"));
  });
  function Yt(B, p, m, I, K, rt) {
    if (m + I > B.length) throw new RangeError("Index out of range");
    if (m < 0) throw new RangeError("Index out of range");
  }
  function $t(B, p, m, I, K) {
    return p = +p, m = m >>> 0, K || Yt(B, p, m, 4), d.write(B, p, m, I, 23, 4), m + 4;
  }
  v.prototype.writeFloatLE = function(p, m, I) {
    return $t(this, p, m, !0, I);
  }, v.prototype.writeFloatBE = function(p, m, I) {
    return $t(this, p, m, !1, I);
  };
  function Pe(B, p, m, I, K) {
    return p = +p, m = m >>> 0, K || Yt(B, p, m, 8), d.write(B, p, m, I, 52, 8), m + 8;
  }
  v.prototype.writeDoubleLE = function(p, m, I) {
    return Pe(this, p, m, !0, I);
  }, v.prototype.writeDoubleBE = function(p, m, I) {
    return Pe(this, p, m, !1, I);
  }, v.prototype.copy = function(p, m, I, K) {
    if (!v.isBuffer(p)) throw new TypeError("argument should be a Buffer");
    if (I || (I = 0), !K && K !== 0 && (K = this.length), m >= p.length && (m = p.length), m || (m = 0), K > 0 && K < I && (K = I), K === I || p.length === 0 || this.length === 0) return 0;
    if (m < 0)
      throw new RangeError("targetStart out of bounds");
    if (I < 0 || I >= this.length) throw new RangeError("Index out of range");
    if (K < 0) throw new RangeError("sourceEnd out of bounds");
    K > this.length && (K = this.length), p.length - m < K - I && (K = p.length - m + I);
    const rt = K - I;
    return this === p && typeof Uint8Array.prototype.copyWithin == "function" ? this.copyWithin(m, I, K) : Uint8Array.prototype.set.call(
      p,
      this.subarray(I, K),
      m
    ), rt;
  }, v.prototype.fill = function(p, m, I, K) {
    if (typeof p == "string") {
      if (typeof m == "string" ? (K = m, m = 0, I = this.length) : typeof I == "string" && (K = I, I = this.length), K !== void 0 && typeof K != "string")
        throw new TypeError("encoding must be a string");
      if (typeof K == "string" && !v.isEncoding(K))
        throw new TypeError("Unknown encoding: " + K);
      if (p.length === 1) {
        const pt = p.charCodeAt(0);
        (K === "utf8" && pt < 128 || K === "latin1") && (p = pt);
      }
    } else typeof p == "number" ? p = p & 255 : typeof p == "boolean" && (p = Number(p));
    if (m < 0 || this.length < m || this.length < I)
      throw new RangeError("Out of range index");
    if (I <= m)
      return this;
    m = m >>> 0, I = I === void 0 ? this.length : I >>> 0, p || (p = 0);
    let rt;
    if (typeof p == "number")
      for (rt = m; rt < I; ++rt)
        this[rt] = p;
    else {
      const pt = v.isBuffer(p) ? p : v.from(p, K), Zt = pt.length;
      if (Zt === 0)
        throw new TypeError('The value "' + p + '" is invalid for argument "value"');
      for (rt = 0; rt < I - m; ++rt)
        this[rt + m] = pt[rt % Zt];
    }
    return this;
  };
  const Ne = {};
  function xi(B, p, m) {
    Ne[B] = class extends m {
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
  xi(
    "ERR_BUFFER_OUT_OF_BOUNDS",
    function(B) {
      return B ? `${B} is outside of buffer bounds` : "Attempt to access memory outside buffer bounds";
    },
    RangeError
  ), xi(
    "ERR_INVALID_ARG_TYPE",
    function(B, p) {
      return `The "${B}" argument must be of type number. Received type ${typeof p}`;
    },
    TypeError
  ), xi(
    "ERR_OUT_OF_RANGE",
    function(B, p, m) {
      let I = `The value of "${B}" is out of range.`, K = m;
      return Number.isInteger(m) && Math.abs(m) > 2 ** 32 ? K = rn(String(m)) : typeof m == "bigint" && (K = String(m), (m > BigInt(2) ** BigInt(32) || m < -(BigInt(2) ** BigInt(32))) && (K = rn(K)), K += "n"), I += ` It must be ${p}. Received ${K}`, I;
    },
    RangeError
  );
  function rn(B) {
    let p = "", m = B.length;
    const I = B[0] === "-" ? 1 : 0;
    for (; m >= I + 4; m -= 3)
      p = `_${B.slice(m - 3, m)}${p}`;
    return `${B.slice(0, m)}${p}`;
  }
  function Ln(B, p, m) {
    ui(p, "offset"), (B[p] === void 0 || B[p + m] === void 0) && Si(p, B.length - (m + 1));
  }
  function Pi(B, p, m, I, K, rt) {
    if (B > m || B < p) {
      const pt = typeof p == "bigint" ? "n" : "";
      let Zt;
      throw p === 0 || p === BigInt(0) ? Zt = `>= 0${pt} and < 2${pt} ** ${(rt + 1) * 8}${pt}` : Zt = `>= -(2${pt} ** ${(rt + 1) * 8 - 1}${pt}) and < 2 ** ${(rt + 1) * 8 - 1}${pt}`, new Ne.ERR_OUT_OF_RANGE("value", Zt, B);
    }
    Ln(I, K, rt);
  }
  function ui(B, p) {
    if (typeof B != "number")
      throw new Ne.ERR_INVALID_ARG_TYPE(p, "number", B);
  }
  function Si(B, p, m) {
    throw Math.floor(B) !== B ? (ui(B, m), new Ne.ERR_OUT_OF_RANGE("offset", "an integer", B)) : p < 0 ? new Ne.ERR_BUFFER_OUT_OF_BOUNDS() : new Ne.ERR_OUT_OF_RANGE(
      "offset",
      `>= 0 and <= ${p}`,
      B
    );
  }
  const Gn = /[^+/0-9A-Za-z-_]/g;
  function Zn(B) {
    if (B = B.split("=")[0], B = B.trim().replace(Gn, ""), B.length < 2) return "";
    for (; B.length % 4 !== 0; )
      B = B + "=";
    return B;
  }
  function Ai(B, p) {
    p = p || 1 / 0;
    let m;
    const I = B.length;
    let K = null;
    const rt = [];
    for (let pt = 0; pt < I; ++pt) {
      if (m = B.charCodeAt(pt), m > 55295 && m < 57344) {
        if (!K) {
          if (m > 56319) {
            (p -= 3) > -1 && rt.push(239, 191, 189);
            continue;
          } else if (pt + 1 === I) {
            (p -= 3) > -1 && rt.push(239, 191, 189);
            continue;
          }
          K = m;
          continue;
        }
        if (m < 56320) {
          (p -= 3) > -1 && rt.push(239, 191, 189), K = m;
          continue;
        }
        m = (K - 55296 << 10 | m - 56320) + 65536;
      } else K && (p -= 3) > -1 && rt.push(239, 191, 189);
      if (K = null, m < 128) {
        if ((p -= 1) < 0) break;
        rt.push(m);
      } else if (m < 2048) {
        if ((p -= 2) < 0) break;
        rt.push(
          m >> 6 | 192,
          m & 63 | 128
        );
      } else if (m < 65536) {
        if ((p -= 3) < 0) break;
        rt.push(
          m >> 12 | 224,
          m >> 6 & 63 | 128,
          m & 63 | 128
        );
      } else if (m < 1114112) {
        if ((p -= 4) < 0) break;
        rt.push(
          m >> 18 | 240,
          m >> 12 & 63 | 128,
          m >> 6 & 63 | 128,
          m & 63 | 128
        );
      } else
        throw new Error("Invalid code point");
    }
    return rt;
  }
  function Ti(B) {
    const p = [];
    for (let m = 0; m < B.length; ++m)
      p.push(B.charCodeAt(m) & 255);
    return p;
  }
  function Hn(B, p) {
    let m, I, K;
    const rt = [];
    for (let pt = 0; pt < B.length && !((p -= 2) < 0); ++pt)
      m = B.charCodeAt(pt), I = m >> 8, K = m % 256, rt.push(K), rt.push(I);
    return rt;
  }
  function wn(B) {
    return l.toByteArray(Zn(B));
  }
  function Di(B, p, m, I) {
    let K;
    for (K = 0; K < I && !(K + m >= p.length || K >= B.length); ++K)
      p[K + m] = B[K];
    return K;
  }
  function We(B, p) {
    return B instanceof p || B != null && B.constructor != null && B.constructor.name != null && B.constructor.name === p.name;
  }
  function an(B) {
    return B !== B;
  }
  const vr = function() {
    const B = "0123456789abcdef", p = new Array(256);
    for (let m = 0; m < 16; ++m) {
      const I = m * 16;
      for (let K = 0; K < 16; ++K)
        p[I + K] = B[m] + B[K];
    }
    return p;
  }();
  function hi(B) {
    return typeof BigInt > "u" ? Cn : B;
  }
  function Cn() {
    throw new Error("BigInt not supported");
  }
})(Dl);
const sa = "http://www.w3.org/1999/02/22-rdf-syntax-ns#", oa = "http://www.w3.org/2001/XMLSchema#", Cs = "http://www.w3.org/2000/10/swap/", Mi = {
  xsd: {
    decimal: `${oa}decimal`,
    boolean: `${oa}boolean`,
    double: `${oa}double`,
    integer: `${oa}integer`,
    string: `${oa}string`
  },
  rdf: {
    type: `${sa}type`,
    nil: `${sa}nil`,
    first: `${sa}first`,
    rest: `${sa}rest`,
    langString: `${sa}langString`
  },
  owl: {
    sameAs: "http://www.w3.org/2002/07/owl#sameAs"
  },
  r: {
    forSome: `${Cs}reify#forSome`,
    forAll: `${Cs}reify#forAll`
  },
  log: {
    implies: `${Cs}log#implies`,
    isImpliedBy: `${Cs}log#isImpliedBy`
  }
}, { xsd: ks } = Mi, vf = /\\u([a-fA-F0-9]{4})|\\U([a-fA-F0-9]{8})|\\([^])/g, pl = {
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
}, bf = /[\x00-\x20<>\\"\{\}\|\^\`]/, xf = {
  _iri: !0,
  _unescapedIri: !0,
  _simpleQuotedString: !0,
  _langcode: !0,
  _blank: !0,
  _newline: !0,
  _comment: !0,
  _whitespace: !0,
  _endOfFile: !0
}, Lf = /$0^/;
class wf {
  constructor(l) {
    if (this._iri = /^<((?:[^ <>{}\\]|\\[uU])+)>[ \t]*/, this._unescapedIri = /^<([^\x00-\x20<>\\"\{\}\|\^\`]*)>[ \t]*/, this._simpleQuotedString = /^"([^"\\\r\n]*)"(?=[^"])/, this._simpleApostropheString = /^'([^'\\\r\n]*)'(?=[^'])/, this._langcode = /^@([a-z]+(?:-[a-z0-9]+)*)(?=[^a-z0-9\-])/i, this._prefix = /^((?:[A-Za-z\xc0-\xd6\xd8-\xf6\xf8-\u02ff\u0370-\u037d\u037f-\u1fff\u200c\u200d\u2070-\u218f\u2c00-\u2fef\u3001-\ud7ff\uf900-\ufdcf\ufdf0-\ufffd]|[\ud800-\udb7f][\udc00-\udfff])(?:\.?[\-0-9A-Z_a-z\xb7\xc0-\xd6\xd8-\xf6\xf8-\u037d\u037f-\u1fff\u200c\u200d\u203f\u2040\u2070-\u218f\u2c00-\u2fef\u3001-\ud7ff\uf900-\ufdcf\ufdf0-\ufffd]|[\ud800-\udb7f][\udc00-\udfff])*)?:(?=[#\s<])/, this._prefixed = /^((?:[A-Za-z\xc0-\xd6\xd8-\xf6\xf8-\u02ff\u0370-\u037d\u037f-\u1fff\u200c\u200d\u2070-\u218f\u2c00-\u2fef\u3001-\ud7ff\uf900-\ufdcf\ufdf0-\ufffd]|[\ud800-\udb7f][\udc00-\udfff])(?:\.?[\-0-9A-Z_a-z\xb7\xc0-\xd6\xd8-\xf6\xf8-\u037d\u037f-\u1fff\u200c\u200d\u203f\u2040\u2070-\u218f\u2c00-\u2fef\u3001-\ud7ff\uf900-\ufdcf\ufdf0-\ufffd]|[\ud800-\udb7f][\udc00-\udfff])*)?:((?:(?:[0-:A-Z_a-z\xc0-\xd6\xd8-\xf6\xf8-\u02ff\u0370-\u037d\u037f-\u1fff\u200c\u200d\u2070-\u218f\u2c00-\u2fef\u3001-\ud7ff\uf900-\ufdcf\ufdf0-\ufffd]|[\ud800-\udb7f][\udc00-\udfff]|%[0-9a-fA-F]{2}|\\[!#-\/;=?\-@_~])(?:(?:[\.\-0-:A-Z_a-z\xb7\xc0-\xd6\xd8-\xf6\xf8-\u037d\u037f-\u1fff\u200c\u200d\u203f\u2040\u2070-\u218f\u2c00-\u2fef\u3001-\ud7ff\uf900-\ufdcf\ufdf0-\ufffd]|[\ud800-\udb7f][\udc00-\udfff]|%[0-9a-fA-F]{2}|\\[!#-\/;=?\-@_~])*(?:[\-0-:A-Z_a-z\xb7\xc0-\xd6\xd8-\xf6\xf8-\u037d\u037f-\u1fff\u200c\u200d\u203f\u2040\u2070-\u218f\u2c00-\u2fef\u3001-\ud7ff\uf900-\ufdcf\ufdf0-\ufffd]|[\ud800-\udb7f][\udc00-\udfff]|%[0-9a-fA-F]{2}|\\[!#-\/;=?\-@_~]))?)?)(?:[ \t]+|(?=\.?[,;!\^\s#()\[\]\{\}"'<>]))/, this._variable = /^\?(?:(?:[A-Z_a-z\xc0-\xd6\xd8-\xf6\xf8-\u02ff\u0370-\u037d\u037f-\u1fff\u200c\u200d\u2070-\u218f\u2c00-\u2fef\u3001-\ud7ff\uf900-\ufdcf\ufdf0-\ufffd]|[\ud800-\udb7f][\udc00-\udfff])(?:[\-0-:A-Z_a-z\xb7\xc0-\xd6\xd8-\xf6\xf8-\u037d\u037f-\u1fff\u200c\u200d\u203f\u2040\u2070-\u218f\u2c00-\u2fef\u3001-\ud7ff\uf900-\ufdcf\ufdf0-\ufffd]|[\ud800-\udb7f][\udc00-\udfff])*)(?=[.,;!\^\s#()\[\]\{\}"'<>])/, this._blank = /^_:((?:[0-9A-Z_a-z\xc0-\xd6\xd8-\xf6\xf8-\u02ff\u0370-\u037d\u037f-\u1fff\u200c\u200d\u2070-\u218f\u2c00-\u2fef\u3001-\ud7ff\uf900-\ufdcf\ufdf0-\ufffd]|[\ud800-\udb7f][\udc00-\udfff])(?:\.?[\-0-9A-Z_a-z\xb7\xc0-\xd6\xd8-\xf6\xf8-\u037d\u037f-\u1fff\u200c\u200d\u203f\u2040\u2070-\u218f\u2c00-\u2fef\u3001-\ud7ff\uf900-\ufdcf\ufdf0-\ufffd]|[\ud800-\udb7f][\udc00-\udfff])*)(?:[ \t]+|(?=\.?[,;:\s#()\[\]\{\}"'<>]))/, this._number = /^[\-+]?(?:(\d+\.\d*|\.?\d+)[eE][\-+]?|\d*(\.)?)\d+(?=\.?[,;:\s#()\[\]\{\}"'<>])/, this._boolean = /^(?:true|false)(?=[.,;\s#()\[\]\{\}"'<>])/, this._keyword = /^@[a-z]+(?=[\s#<:])/i, this._sparqlKeyword = /^(?:PREFIX|BASE|GRAPH)(?=[\s#<])/i, this._shortPredicates = /^a(?=[\s#()\[\]\{\}"'<>])/, this._newline = /^[ \t]*(?:#[^\n\r]*)?(?:\r\n|\n|\r)[ \t]*/, this._comment = /#([^\n\r]*)/, this._whitespace = /^[ \t]+/, this._endOfFile = /^(?:#[^\n\r]*)?$/, l = l || {}, this._isImpliedBy = l.isImpliedBy, this._lineMode = !!l.lineMode) {
      this._n3Mode = !1;
      for (const d in this)
        !(d in xf) && this[d] instanceof RegExp && (this[d] = Lf);
    } else
      this._n3Mode = l.n3 !== !1;
    this.comments = !!l.comments, this._literalClosingPos = 0;
  }
  // ## Private methods
  // ### `_tokenizeToEnd` tokenizes as for as possible, emitting tokens through the callback
  _tokenizeToEnd(l, d) {
    let y = this._input, C = y.length;
    for (; ; ) {
      let v, k;
      for (; v = this._newline.exec(y); )
        this.comments && (k = this._comment.exec(v[0])) && D("comment", k[1], "", this._line, v[0].length), y = y.substr(v[0].length, y.length), C = y.length, this._line++;
      if (!v && (v = this._whitespace.exec(y)) && (y = y.substr(v[0].length, y.length)), this._endOfFile.test(y))
        return d && (this.comments && (k = this._comment.exec(y)) && D("comment", k[1], "", this._line, y.length), y = null, D("eof", "", "", this._line, 0)), this._input = y;
      const F = this._line, Z = y[0];
      let j = "", q = "", H = "", nt = null, ut = 0, _t = !1;
      switch (Z) {
        case "^":
          if (y.length < 3)
            break;
          if (y[1] === "^") {
            if (this._previousMarker = "^^", y = y.substr(2), y[0] !== "<") {
              _t = !0;
              break;
            }
          } else {
            this._n3Mode && (ut = 1, j = "^");
            break;
          }
        case "<":
          if (nt = this._unescapedIri.exec(y))
            j = "IRI", q = nt[1];
          else if (nt = this._iri.exec(y)) {
            if (q = this._unescape(nt[1]), q === null || bf.test(q))
              return x(this);
            j = "IRI";
          } else y.length > 1 && y[1] === "<" ? (j = "<<", ut = 2) : this._n3Mode && y.length > 1 && y[1] === "=" && (ut = 2, this._isImpliedBy ? (j = "abbreviation", q = "<") : (j = "inverse", q = ">"));
          break;
        case ">":
          y.length > 1 && y[1] === ">" && (j = ">>", ut = 2);
          break;
        case "_":
          ((nt = this._blank.exec(y)) || d && (nt = this._blank.exec(`${y} `))) && (j = "blank", H = "_", q = nt[1]);
          break;
        case '"':
          if (nt = this._simpleQuotedString.exec(y))
            q = nt[1];
          else if ({ value: q, matchLength: ut } = this._parseLiteral(y), q === null)
            return x(this);
          (nt !== null || ut !== 0) && (j = "literal", this._literalClosingPos = 0);
          break;
        case "'":
          if (!this._lineMode) {
            if (nt = this._simpleApostropheString.exec(y))
              q = nt[1];
            else if ({ value: q, matchLength: ut } = this._parseLiteral(y), q === null)
              return x(this);
            (nt !== null || ut !== 0) && (j = "literal", this._literalClosingPos = 0);
          }
          break;
        case "?":
          this._n3Mode && (nt = this._variable.exec(y)) && (j = "var", q = nt[0]);
          break;
        case "@":
          this._previousMarker === "literal" && (nt = this._langcode.exec(y)) ? (j = "langcode", q = nt[1]) : (nt = this._keyword.exec(y)) && (j = nt[0]);
          break;
        case ".":
          if (y.length === 1 ? d : y[1] < "0" || y[1] > "9") {
            j = ".", ut = 1;
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
          (nt = this._number.exec(y) || d && (nt = this._number.exec(`${y} `))) && (j = "literal", q = nt[0], H = typeof nt[1] == "string" ? ks.double : typeof nt[2] == "string" ? ks.decimal : ks.integer);
          break;
        case "B":
        case "b":
        case "p":
        case "P":
        case "G":
        case "g":
          (nt = this._sparqlKeyword.exec(y)) ? j = nt[0].toUpperCase() : _t = !0;
          break;
        case "f":
        case "t":
          (nt = this._boolean.exec(y)) ? (j = "literal", q = nt[0], H = ks.boolean) : _t = !0;
          break;
        case "a":
          (nt = this._shortPredicates.exec(y)) ? (j = "abbreviation", q = "a") : _t = !0;
          break;
        case "=":
          this._n3Mode && y.length > 1 && (j = "abbreviation", y[1] !== ">" ? (ut = 1, q = "=") : (ut = 2, q = ">"));
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
          this._lineMode || (ut = 1, j = Z);
          break;
        case "{":
          !this._lineMode && y.length >= 2 && (y[1] === "|" ? (j = "{|", ut = 2) : (j = Z, ut = 1));
          break;
        case "|":
          y.length >= 2 && y[1] === "}" && (j = "|}", ut = 2);
          break;
        default:
          _t = !0;
      }
      if (_t && ((this._previousMarker === "@prefix" || this._previousMarker === "PREFIX") && (nt = this._prefix.exec(y)) ? (j = "prefix", q = nt[1] || "") : ((nt = this._prefixed.exec(y)) || d && (nt = this._prefixed.exec(`${y} `))) && (j = "prefixed", H = nt[1] || "", q = this._unescape(nt[2]))), this._previousMarker === "^^")
        switch (j) {
          case "prefixed":
            j = "type";
            break;
          case "IRI":
            j = "typeIRI";
            break;
          default:
            j = "";
        }
      if (!j)
        return d || !/^'''|^"""/.test(y) && /\n|\r/.test(y) ? x(this) : this._input = y;
      const Y = ut || nt[0].length, Et = D(j, q, H, F, Y);
      this.previousToken = Et, this._previousMarker = j, y = y.substr(Y, y.length);
    }
    function D(v, k, F, Z, j) {
      const q = y ? C - y.length : C, H = q + j, nt = { type: v, value: k, prefix: F, line: Z, start: q, end: H };
      return l(null, nt), nt;
    }
    function x(v) {
      l(v._syntaxError(/^\S*/.exec(y)[0]));
    }
  }
  // ### `_unescape` replaces N3 escape codes by their corresponding characters
  _unescape(l) {
    let d = !1;
    const y = l.replace(vf, (C, D, x, v) => {
      if (typeof D == "string")
        return String.fromCharCode(Number.parseInt(D, 16));
      if (typeof x == "string") {
        let k = Number.parseInt(x, 16);
        return k <= 65535 ? String.fromCharCode(Number.parseInt(x, 16)) : String.fromCharCode(55296 + ((k -= 65536) >> 10), 56320 + (k & 1023));
      }
      return v in pl ? pl[v] : (d = !0, "");
    });
    return d ? null : y;
  }
  // ### `_parseLiteral` parses a literal into an unescaped value
  _parseLiteral(l) {
    if (l.length >= 3) {
      const d = l.match(/^(?:"""|"|'''|'|)/)[0], y = d.length;
      let C = Math.max(this._literalClosingPos, y);
      for (; (C = l.indexOf(d, C)) > 0; ) {
        let D = 0;
        for (; l[C - D - 1] === "\\"; )
          D++;
        if (D % 2 === 0) {
          const x = l.substring(y, C), v = x.split(/\r\n|\r|\n/).length - 1, k = C + y;
          if (y === 1 && v !== 0 || y === 3 && this._lineMode)
            break;
          return this._line += v, { value: this._unescape(x), matchLength: k };
        }
        C++;
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
        let C;
        if (this._tokenizeToEnd((D, x) => D ? C = D : y.push(x), !0), C) throw C;
        return y;
      }
    else
      this._pendingBuffer = null, typeof l.setEncoding == "function" && l.setEncoding("utf8"), l.on("data", (y) => {
        this._input !== null && y.length !== 0 && (this._pendingBuffer && (y = Dl.Buffer.concat([this._pendingBuffer, y]), this._pendingBuffer = null), y[y.length - 1] & 128 ? this._pendingBuffer = y : (typeof this._input > "u" ? this._input = this._readStartingBom(typeof y == "string" ? y : y.toString()) : this._input += y, this._tokenizeToEnd(d, !1)));
      }), l.on("end", () => {
        typeof this._input == "string" && this._tokenizeToEnd(d, !0);
      }), l.on("error", d);
  }
}
const { rdf: Cf, xsd: _r } = Mi;
let xa, kf = 0;
const Ef = {
  namedNode: Rl,
  blankNode: Nl,
  variable: jl,
  literal: zl,
  defaultGraph: Sf,
  quad: Fo,
  triple: Fo,
  fromTerm: pa,
  fromQuad: $l
};
class nn {
  constructor(l) {
    this.id = l;
  }
  // ### The value of this term
  get value() {
    return this.id;
  }
  // ### Returns whether this object represents the same term as the other
  equals(l) {
    return l instanceof nn ? this.id === l.id : !!l && this.termType === l.termType && this.value === l.value;
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
class Ol extends nn {
  // ### The term type of this term
  get termType() {
    return "NamedNode";
  }
}
class _a extends nn {
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
    return new Ol(this.datatypeString);
  }
  // ### The datatype string of this literal
  get datatypeString() {
    const l = this.id, d = l.lastIndexOf('"') + 1, y = d < l.length ? l[d] : "";
    return y === "^" ? l.substr(d + 2) : (
      // If "@" follows, return rdf:langString; xsd:string otherwise
      y !== "@" ? _r.string : Cf.langString
    );
  }
  // ### Returns whether this object represents the same term as the other
  equals(l) {
    return l instanceof _a ? this.id === l.id : !!l && !!l.datatype && this.termType === l.termType && this.value === l.value && this.language === l.language && this.datatype.value === l.datatype.value;
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
class Mf extends nn {
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
class Bf extends nn {
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
class Pf extends nn {
  constructor() {
    return super(""), xa || this;
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
xa = new Pf();
class Fl extends nn {
  constructor(l, d, y, C) {
    super(""), this._subject = l, this._predicate = d, this._object = y, this._graph = C || xa;
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
function Rl(h) {
  return new Ol(h);
}
function Nl(h) {
  return new Mf(h || `n3-${kf++}`);
}
function zl(h, l) {
  if (typeof l == "string")
    return new _a(`"${h}"@${l.toLowerCase()}`);
  let d = l ? l.value : "";
  return d === "" && (typeof h == "boolean" ? d = _r.boolean : typeof h == "number" && (Number.isFinite(h) ? d = Number.isInteger(h) ? _r.integer : _r.double : (d = _r.double, Number.isNaN(h) || (h = h > 0 ? "INF" : "-INF")))), d === "" || d === _r.string ? new _a(`"${h}"`) : new _a(`"${h}"^^${d}`);
}
function jl(h) {
  return new Bf(h);
}
function Sf() {
  return xa;
}
function Fo(h, l, d, y) {
  return new Fl(h, l, d, y);
}
function pa(h) {
  if (h instanceof nn)
    return h;
  switch (h.termType) {
    case "NamedNode":
      return Rl(h.value);
    case "BlankNode":
      return Nl(h.value);
    case "Variable":
      return jl(h.value);
    case "DefaultGraph":
      return xa;
    case "Literal":
      return zl(h.value, h.language || h.datatype);
    case "Quad":
      return $l(h);
    default:
      throw new Error(`Unexpected termType: ${h.termType}`);
  }
}
function $l(h) {
  if (h instanceof Fl)
    return h;
  if (h.termType !== "Quad")
    throw new Error(`Unexpected termType: ${h.termType}`);
  return Fo(pa(h.subject), pa(h.predicate), pa(h.object), pa(h.graph));
}
let _l = 0;
class Go {
  constructor(l) {
    this._contextStack = [], this._graph = null, l = l || {}, this._setBase(l.baseIRI), l.factory && Ul(this, l.factory);
    const d = typeof l.format == "string" ? l.format.match(/\w*$/)[0].toLowerCase() : "", y = /turtle/.test(d), C = /trig/.test(d), D = /triple/.test(d), x = /quad/.test(d), v = this._n3Mode = /n3/.test(d), k = D || x;
    (this._supportsNamedGraphs = !(y || v)) || (this._readPredicateOrNamedGraph = this._readPredicate), this._supportsQuads = !(y || C || D || v), this._isImpliedBy = l.isImpliedBy, this._supportsRDFStar = d === "" || /star|\*$/.test(d), k && (this._resolveRelativeIRI = (F) => null), this._blankNodePrefix = typeof l.blankNodePrefix != "string" ? "" : l.blankNodePrefix.replace(/^(?!_:)/, "_:"), this._lexer = l.lexer || new wf({ lineMode: k, n3: v, isImpliedBy: this._isImpliedBy }), this._explicitQuantifiers = !!l.explicitQuantifiers;
  }
  // ## Static class methods
  // ### `_resetBlankNodePrefix` restarts blank node prefix identification
  static _resetBlankNodePrefix() {
    _l = 0;
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
  _saveContext(l, d, y, C, D) {
    const x = this._n3Mode;
    this._contextStack.push({
      type: l,
      subject: y,
      predicate: C,
      object: D,
      graph: d,
      inverse: x ? this._inversePredicate : !1,
      blankPrefix: x ? this._prefixes._ : "",
      quantified: x ? this._quantified : null
    }), x && (this._inversePredicate = !1, this._prefixes._ = this._graph ? `${this._graph.value}.` : ".", this._quantified = Object.create(this._quantified));
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
        const C = this._resolveIRI(l.value);
        if (C === null)
          return this._error("Invalid IRI", l);
        y = this._factory.namedNode(C);
        break;
      case "type":
      case "prefixed":
        const D = this._prefixes[l.prefix];
        if (D === void 0)
          return this._error(`Undefined prefix "${l.prefix}:"`, l);
        y = this._factory.namedNode(D + l.value);
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
    let d = null, y = null, C = this._readListItem;
    const D = this._subject, x = this._contextStack, v = x[x.length - 1];
    switch (l.type) {
      case "[":
        this._saveContext(
          "blank",
          this._graph,
          y = this._factory.blankNode(),
          this.RDF_FIRST,
          this._subject = d = this._factory.blankNode()
        ), C = this._readBlankNodeHead;
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
        if (this._restoreContext("list", l), x.length !== 0 && x[x.length - 1].type === "list" && this._emit(this._subject, this._predicate, this._object, this._graph), this._predicate === null) {
          if (C = this._readPredicate, this._subject === this.RDF_NIL)
            return C;
        } else if (C = this._getContextEndReader(), this._object === this.RDF_NIL)
          return C;
        y = this.RDF_NIL;
        break;
      case "literal":
        l.prefix.length === 0 ? (this._literalValue = l.value, C = this._readListItemDataTypeOrLang) : (d = this._factory.literal(l.value, this._factory.namedNode(l.prefix)), C = this._getContextEndReader());
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
    if (y === null && (this._subject = y = this._factory.blankNode()), D === null ? v.predicate === null ? v.subject = y : v.object = y : this._emit(D, this.RDF_REST, y, this._graph), d !== null) {
      if (this._n3Mode && (l.type === "IRI" || l.type === "prefixed"))
        return this._saveContext("item", this._graph, y, this.RDF_FIRST, d), this._subject = d, this._predicate = null, this._getPathReader(this._readListItem);
      this._emit(y, this.RDF_FIRST, d, this._graph);
    }
    return C;
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
    const C = this._subject, D = this._inversePredicate;
    switch (l.type) {
      case "}":
        if (this._graph === null)
          return this._error("Unexpected graph closing", l);
        if (this._n3Mode)
          return this._readFormulaTail(l);
        this._graph = null;
      case ".":
        this._subject = null, d = this._contextStack.length ? this._readSubject : this._readInTopContext, D && (this._inversePredicate = !1);
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
        const x = this._predicate, v = this._object;
        this._subject = this._factory.quad(C, x, v, this.DEFAULTGRAPH), d = this._readPredicate;
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
    if (C !== null) {
      const x = this._predicate, v = this._object;
      D ? this._emit(v, x, C, y) : this._emit(C, x, v, y);
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
          const C = this._subject;
          this._restoreContext("item", l), this._emit(this._subject, this.RDF_FIRST, C, this._graph);
        }
        return this._afterPath(l);
    }
  }
  // ### `_readForwardPath` reads a '!' path
  _readForwardPath(l) {
    let d, y;
    const C = this._factory.blankNode();
    if ((y = this._readEntity(l)) !== void 0)
      return this._predicate === null ? (d = this._subject, this._subject = C) : (d = this._object, this._object = C), this._emit(d, y, C, this._graph), this._readPath;
  }
  // ### `_readBackwardPath` reads a '^' path
  _readBackwardPath(l) {
    const d = this._factory.blankNode();
    let y, C;
    if ((y = this._readEntity(l)) !== void 0)
      return this._predicate === null ? (C = this._subject, this._subject = d) : (C = this._object, this._object = d), this._emit(d, y, C, this._graph), this._readPath;
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
  _emit(l, d, y, C) {
    this._callback(null, this._factory.quad(l, d, y, C || this.DEFAULTGRAPH));
  }
  // ### `_error` emits an error message through the callback
  _error(l, d) {
    const y = new Error(`${l} on line ${d.line}.`);
    y.context = {
      token: d,
      line: d.line,
      previousToken: this._lexer.previousToken
    }, this._callback(y), this._callback = Es;
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
    let y = "", C = -1, D = -1, x = 0, v = "/";
    for (; C < d; ) {
      switch (v) {
        case ":":
          if (D < 0 && l[++C] === "/" && l[++C] === "/")
            for (; (D = C + 1) < d && l[D] !== "/"; )
              C = D;
          break;
        case "?":
        case "#":
          C = d;
          break;
        case "/":
          if (l[C + 1] === ".")
            switch (v = l[++C + 1], v) {
              case "/":
                y += l.substring(x, C - 1), x = C + 1;
                break;
              case void 0:
              case "?":
              case "#":
                return y + l.substring(x, C) + l.substr(C + 1);
              case ".":
                if (v = l[++C + 1], v === void 0 || v === "/" || v === "?" || v === "#") {
                  if (y += l.substring(x, C - 2), (x = y.lastIndexOf("/")) >= D && (y = y.substr(0, x)), v !== "/")
                    return `${y}/${l.substr(C + 1)}`;
                  x = C + 1;
                }
            }
      }
      v = l[++C];
    }
    return y + l.substring(x);
  }
  // ## Public methods
  // ### `parse` parses the N3 input and emits each parsed quad through the onQuad callback.
  parse(l, d, y) {
    let C, D, x;
    if (d && (d.onQuad || d.onPrefix || d.onComment) ? (C = d.onQuad, D = d.onPrefix, x = d.onComment) : (C = d, D = y), this._readCallback = this._readInTopContext, this._sparqlStyle = !1, this._prefixes = /* @__PURE__ */ Object.create(null), this._prefixes._ = this._blankNodePrefix ? this._blankNodePrefix.substr(2) : `b${_l++}_`, this._prefixCallback = D || Es, this._inversePredicate = !1, this._quantified = /* @__PURE__ */ Object.create(null), !C) {
      const k = [];
      let F;
      if (this._callback = (Z, j) => {
        Z ? F = Z : j && k.push(j);
      }, this._lexer.tokenize(l).every((Z) => this._readCallback = this._readCallback(Z)), F) throw F;
      return k;
    }
    let v = (k, F) => {
      k !== null ? (this._callback(k), this._callback = Es) : this._readCallback && (this._readCallback = this._readCallback(F));
    };
    x && (this._lexer.comments = !0, v = (k, F) => {
      k !== null ? (this._callback(k), this._callback = Es) : this._readCallback && (F.type === "comment" ? x(F.value) : this._readCallback = this._readCallback(F));
    }), this._callback = C, this._lexer.tokenize(l, v);
  }
}
function Es() {
}
function Ul(h, l) {
  h._factory = l, h.DEFAULTGRAPH = l.defaultGraph(), h.RDF_FIRST = l.namedNode(Mi.rdf.first), h.RDF_REST = l.namedNode(Mi.rdf.rest), h.RDF_NIL = l.namedNode(Mi.rdf.nil), h.N3_FORALL = l.namedNode(Mi.r.forAll), h.N3_FORSOME = l.namedNode(Mi.r.forSome), h.ABBREVIATIONS = {
    a: l.namedNode(Mi.rdf.type),
    "=": l.namedNode(Mi.owl.sameAs),
    ">": l.namedNode(Mi.log.implies),
    "<": l.namedNode(Mi.log.isImpliedBy)
  }, h.QUANTIFIERS_GRAPH = l.namedNode("urn:n3:quantifiers");
}
Ul(Go.prototype, Ef);
async function Vl(h) {
  const l = new Go(), d = await new Promise((C, D) => {
    const x = [];
    l.parse(h, (v, k) => {
      if (v) return D(v);
      k ? x.push(k) : C(x);
    });
  }), y = /* @__PURE__ */ new Map();
  for (const C of d) {
    const D = C.subject.value;
    y.has(D) || y.set(D, []), y.get(D).push({ p: C.predicate.value, o: C.object });
  }
  return y;
}
const Af = {
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
  "http://purl.org/dc/elements/1.1/": "dc:"
};
function ba(h) {
  for (const [l, d] of Object.entries(Af))
    if (h.startsWith(l)) return d + h.slice(l.length);
  return h.split(/[#/]/).at(-1) || h;
}
function Po(h) {
  return typeof h == "string" && /^https?:\/\/|^urn:|^mailto:/.test(h);
}
function Tf(h) {
  return typeof h == "string" && /^\d{4}-\d{2}-\d{2}/.test(h);
}
const Ve = "http://www.w3.org/ns/shacl#", Df = "http://www.w3.org/1999/02/22-rdf-syntax-ns#", So = "http://www.w3.org/2001/XMLSchema#", If = "http://www.w3.org/ns/dcat#", Of = `${Ve}Violation`, Ff = `${Ve}Warning`, Rf = `${Ve}Info`;
class Nf {
  /**
   * @param {string}  ttlContent   Raw Turtle content of the SHACL shapes file
   * @param {object}  formData     Current form data keyed by compact field IRI
   * @param {object}  config       Resolved form config (groups, fields)
   * @returns {{ valid: boolean, violations: object[] }}
   */
  async validate(l, d, y) {
    var F, Z;
    const C = await Vl(l), D = $f(C), x = Object.values(D).find(
      (j) => j.targetClass === `${If}Dataset`
    );
    if (!x) return { valid: !0, violations: [] };
    const v = [];
    for (const j of x.properties) {
      const q = ba(j.path), H = d == null ? void 0 : d[q], nt = ((Z = (F = y == null ? void 0 : y.fields) == null ? void 0 : F[q]) == null ? void 0 : Z.label) || { en: q, de: q }, ut = jf(q, y), _t = { fieldId: q, fieldLabel: nt, groupId: ut, shapeRef: j.shapeRef };
      if (j.minCount > 0 && la(H) < j.minCount) {
        v.push(tn(
          _t,
          j.severity,
          "minCount",
          `Pflichtfeld (sh:minCount ${j.minCount}) — kein Wert angegeben.`,
          `Required field (sh:minCount ${j.minCount}) — no value provided.`
        ));
        continue;
      }
      if (la(H) !== 0) {
        if (j.maxCount !== null && la(H) > j.maxCount && v.push(tn(
          _t,
          j.severity,
          "maxCount",
          `Zu viele Werte (sh:maxCount ${j.maxCount}, vorhanden: ${la(H)}).`,
          `Too many values (sh:maxCount ${j.maxCount}, found: ${la(H)}).`
        )), j.nodeKind === `${Ve}IRI`) {
          const Y = zn(H).filter((Et) => !Po(Et));
          Y.length && v.push(tn(
            _t,
            j.severity,
            "nodeKind",
            `Wert muss eine URI sein (sh:nodeKind sh:IRI). Ungültig: ${Y.slice(0, 2).join(", ")}`,
            `Value must be a URI (sh:nodeKind sh:IRI). Invalid: ${Y.slice(0, 2).join(", ")}`
          ));
        } else j.nodeKind === `${Ve}Literal` && zn(H).filter((Et) => Po(Et)).length && v.push(tn(
          _t,
          j.severity,
          "nodeKind",
          "Wert darf keine URI sein (sh:nodeKind sh:Literal).",
          "Value must not be a URI (sh:nodeKind sh:Literal)."
        ));
        if (j.datatype === `${So}anyURI`)
          zn(H).filter((Et) => !Po(Et)).length && v.push(tn(
            _t,
            j.severity,
            "datatype",
            "Wert muss eine gültige URI sein (xsd:anyURI).",
            "Value must be a valid URI (xsd:anyURI)."
          ));
        else if (j.datatype === `${So}date` || j.datatype === `${So}dateTime`) {
          const Y = zn(H).filter((Et) => !Tf(Et));
          Y.length && v.push(tn(
            _t,
            j.severity,
            "datatype",
            `Wert muss ein gültiges Datum sein (xsd:date). Ungültig: ${Y[0]}`,
            `Value must be a valid date (xsd:date). Invalid: ${Y[0]}`
          ));
        }
        if (j.pattern) {
          let Y;
          try {
            Y = new RegExp(j.pattern);
          } catch {
          }
          Y && zn(H).filter((Tt) => !Y.test(Tt)).length && v.push(tn(
            _t,
            j.severity,
            "pattern",
            `Wert entspricht nicht dem Muster (sh:pattern ${j.pattern}).`,
            `Value does not match pattern (sh:pattern ${j.pattern}).`
          ));
        }
        j.minLength !== null && zn(H).filter((Et) => Et.length < j.minLength).length && v.push(tn(
          _t,
          j.severity,
          "minLength",
          `Wert zu kurz — Minimum ${j.minLength} Zeichen (sh:minLength).`,
          `Value too short — minimum ${j.minLength} characters (sh:minLength).`
        )), j.maxLength !== null && zn(H).filter((Et) => Et.length > j.maxLength).length && v.push(tn(
          _t,
          j.severity,
          "maxLength",
          `Wert zu lang — Maximum ${j.maxLength} Zeichen (sh:maxLength).`,
          `Value too long — maximum ${j.maxLength} characters (sh:maxLength).`
        ));
      }
    }
    const k = { violation: 0, warning: 1, info: 2 };
    return v.sort((j, q) => k[j.severity] - k[q.severity]), {
      valid: v.every((j) => j.severity !== "violation"),
      violations: v
    };
  }
}
function tn(h, l, d, y, C) {
  return {
    fieldId: h.fieldId,
    fieldLabel: h.fieldLabel,
    groupId: h.groupId,
    shapeRef: h.shapeRef,
    severity: zf(l),
    constraint: d,
    messageDe: y,
    messageEn: C
  };
}
function zf(h) {
  return h === Ff ? "warning" : h === Rf ? "info" : "violation";
}
function la(h) {
  return h == null || h === "" ? 0 : Array.isArray(h) ? h.filter((l) => l ? typeof l == "object" && "value" in l ? !!l.value : typeof l == "object" ? Object.values(l).some((d) => d) : String(l).trim() !== "" : !1).length : typeof h == "object" ? Object.values(h).some((l) => l && String(l).trim()) ? 1 : 0 : String(h).trim() ? 1 : 0;
}
function zn(h) {
  return h == null || h === "" ? [] : Array.isArray(h) ? h.flatMap((l) => l ? typeof l == "object" && "value" in l ? l.value ? [l.value] : [] : typeof l == "object" ? Object.values(l).filter((d) => typeof d == "string" && d) : [String(l)] : []) : typeof h == "object" ? Object.values(h).filter((l) => typeof l == "string" && l) : [String(h)];
}
function jf(h, l) {
  var d;
  if (!(l != null && l.groups)) return null;
  for (const y of l.groups)
    if ((d = y.fields) != null && d.includes(h)) return y.id;
  return null;
}
function $f(h) {
  var d;
  const l = {};
  for (const [y, C] of h.entries()) {
    if (!C.filter((F) => F.p === `${Df}type`).map((F) => F.o.value).includes(`${Ve}NodeShape`)) continue;
    const x = (d = C.find((F) => F.p === `${Ve}targetClass`)) == null ? void 0 : d.o.value, k = C.filter((F) => F.p === `${Ve}property`).map((F) => F.o.value).map((F) => Uf(F, h)).filter(Boolean);
    l[y] = { subject: y, targetClass: x, properties: k };
  }
  return l;
}
function Uf(h, l) {
  const d = l.get(h) || [], y = d.find((x) => x.p === `${Ve}path`);
  if (!y) return null;
  const C = (x) => {
    var v;
    return ((v = d.find((k) => k.p === x)) == null ? void 0 : v.o.value) ?? null;
  }, D = (x) => {
    const v = C(x);
    return v !== null ? parseInt(v) : null;
  };
  return {
    path: y.o.value,
    shapeRef: h,
    minCount: D(`${Ve}minCount`) ?? 0,
    maxCount: D(`${Ve}maxCount`),
    nodeKind: C(`${Ve}nodeKind`),
    datatype: C(`${Ve}datatype`),
    severity: C(`${Ve}severity`) ?? Of,
    pattern: C(`${Ve}pattern`),
    minLength: D(`${Ve}minLength`),
    maxLength: D(`${Ve}maxLength`)
  };
}
const Vf = { class: "metadata-form ontoform" }, Gf = { class: "step-indicator" }, Zf = ["aria-label", "aria-current", "onClick"], Hf = { class: "step-label" }, qf = { class: "step-label" }, Kf = {
  key: 0,
  class: "progress-bar-wrap"
}, Wf = ["aria-valuenow", "aria-label"], Jf = {
  class: "progress-label",
  "aria-hidden": "true"
}, Xf = { class: "form-group" }, Yf = { class: "group-title" }, Qf = { class: "wizard-nav" }, tp = { key: 1 }, ep = { class: "summary-view" }, ip = { class: "summary-group-header" }, np = { class: "group-title" }, rp = { class: "summary-group-header-right" }, ap = {
  key: 0,
  class: "group-error-badge"
}, sp = ["onClick"], op = { class: "summary-fields" }, lp = { class: "summary-field-label" }, up = ["innerHTML"], hp = {
  key: 1,
  class: "no-data"
}, cp = { class: "form-actions" }, dp = {
  key: 0,
  class: "validation-hint"
}, fp = ["disabled", "aria-label"], pp = ["disabled"], _p = { class: "wizard-nav" }, gp = { class: "group-title" }, mp = { class: "form-actions" }, yp = {
  key: 0,
  class: "validation-hint"
}, vp = ["disabled"], bp = ["disabled"], xp = {
  __name: "MetadataForm",
  props: {
    config: Object,
    lang: String,
    modelValue: Object,
    wizard: {
      type: Boolean,
      default: !1
    }
  },
  emits: ["update:modelValue", "export"],
  setup(h, { emit: l }) {
    function d(kt) {
      return String(kt ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");
    }
    const y = h, C = l, D = {
      textarea: No,
      select: zo,
      date: jo,
      uri: $o,
      langstring: wl,
      text: mr,
      object: El,
      multiselect: vc,
      "distribution-editor": $d,
      map: kl,
      searchselect: Uo
    };
    function x(kt) {
      return D[kt.type] || mr;
    }
    const v = Jt(() => {
      var kt;
      return (((kt = y.config) == null ? void 0 : kt.groups) || []).filter((ot) => ot.visible !== !1);
    });
    function k(kt) {
      return (kt.fields || []).map((ot) => y.config.fields[ot]).filter((ot) => ot && ot.visible !== !1 && Sl(ot.visibleIf, y.modelValue)).sort((ot, jt) => (ot.order || 0) - (jt.order || 0));
    }
    const F = Jt(() => hf(y.config, y.modelValue, y.lang)), Z = Jt(() => {
      var jt;
      let kt = 0, ot = 0;
      for (const ct of v.value)
        for (const wt of k(ct))
          ot++, Oo((jt = y.modelValue) == null ? void 0 : jt[wt.id], wt) && kt++;
      return { filled: kt, total: ot };
    }), j = Jt(() => Z.value.filled), q = Jt(() => Z.value.total), H = Jt(
      () => q.value ? Math.round(j.value / q.value * 100) : 0
    ), nt = Jt(() => Object.keys(F.value).length === 0), ut = Xt([]), _t = Xt(!1), Y = Xt(!1);
    async function Et() {
      var ot;
      const kt = (ot = y.config) == null ? void 0 : ot.standard;
      if (kt) {
        Y.value = !0;
        try {
          const jt = await fetch(As(`shacl/${kt}.ttl`)).then((Mt) => Mt.text()), wt = await new Nf().validate(jt, y.modelValue, y.config);
          ut.value = wt.violations, _t.value = !0;
        } finally {
          Y.value = !1;
        }
      }
    }
    async function Tt({ fieldId: kt, groupId: ot }) {
      var wt;
      if (y.wizard) {
        const Mt = v.value.findIndex((se) => se.id === ot);
        Mt >= 0 && Re(Mt);
      }
      await gr();
      const jt = typeof CSS < "u" && CSS.escape ? CSS.escape(kt) : kt.replace(/[^\w-]/g, "_"), ct = document.getElementById(`field-${jt}`);
      ct == null || ct.scrollIntoView({ behavior: "smooth", block: "center" }), (wt = ct == null ? void 0 : ct.querySelector("input,textarea,select")) == null || wt.focus();
    }
    function pe() {
      var ot, jt;
      if (!nt.value) return;
      const kt = ((ot = y.config) == null ? void 0 : ot.fields) || {};
      for (const [ct, wt] of Object.entries(kt))
        wt.remember && ((jt = y.modelValue) == null ? void 0 : jt[ct]) != null && pr.save(ct, y.modelValue[ct]);
      C("export");
    }
    const vt = Xt(0), St = Xt(!1);
    Vn(() => y.config, () => {
      vt.value = 0, St.value = !1;
    });
    const Dt = Jt(() => v.value[vt.value]);
    function le(kt) {
      const ot = k(kt), jt = {};
      for (const ct of ot)
        F.value[ct.id] && (jt[ct.id] = F.value[ct.id]);
      return jt;
    }
    function te(kt) {
      return Object.keys(le(kt)).length > 0;
    }
    const ee = Jt(() => Dt.value ? Object.keys(le(Dt.value)).length > 0 : !1);
    function Kt() {
      if (ee.value) {
        St.value = !0;
        return;
      }
      St.value = !1, vt.value++;
    }
    function _e() {
      St.value = !1, vt.value > 0 && vt.value--;
    }
    function Re(kt) {
      St.value = !1, vt.value = kt;
    }
    function Le(kt) {
      var jt;
      const ot = (jt = y.modelValue) == null ? void 0 : jt[kt.id];
      return ot == null || ot === "" ? !1 : Array.isArray(ot) ? ot.some((ct) => ct ? typeof ct == "object" ? Object.values(ct).some((wt) => wt) : !0 : !1) : typeof ot == "object" ? Object.values(ot).some((ct) => ct) : !0;
    }
    function At(kt) {
      return k(kt).some((ot) => Le(ot));
    }
    function Nt(kt) {
      var jt, ct, wt;
      const ot = (jt = y.modelValue) == null ? void 0 : jt[kt.id];
      if (ot == null) return "";
      if (kt.type === "langstring")
        return kt.multiple && Array.isArray(ot) ? ot.filter((Mt) => Mt && Mt.value).map((Mt) => `${Mt.value} (${Mt.lang || "?"})`).join(", ") : typeof ot == "object" ? Object.entries(ot).filter(([, Mt]) => Mt).map(([Mt, se]) => `${Mt.toUpperCase()}: ${se}`).join(", ") : String(ot);
      if (kt.type === "multiselect" && Array.isArray(ot))
        return ot.map((Mt) => {
          var Vt, Yt;
          const se = (kt.options || []).find(($t) => $t.value === Mt);
          return se && (((Vt = se.label) == null ? void 0 : Vt[y.lang]) || ((Yt = se.label) == null ? void 0 : Yt.en) || se.label) || Mt;
        }).join(", ");
      if (kt.type === "select") {
        const Mt = (kt.options || []).find((se) => se.value === ot);
        return Mt && (((ct = Mt.label) == null ? void 0 : ct[y.lang]) || ((wt = Mt.label) == null ? void 0 : wt.en) || Mt.label) || ot;
      }
      if (kt.type === "uri") {
        if (!ot) return "";
        const Mt = d(ot);
        return `<a href="${Mt}" target="_blank" rel="noopener">${Mt}</a>`;
      }
      if (kt.type === "date")
        return String(ot);
      if (kt.type === "object" && typeof ot == "object" && kt.subFields) {
        const Mt = kt.subFields.filter((Vt) => ot[Vt.id] && Vt.type !== "map").map((Vt) => {
          var $t, Pe;
          return `<span class="sub-field"><b>${d((($t = Vt.label) == null ? void 0 : $t[y.lang]) || ((Pe = Vt.label) == null ? void 0 : Pe.de) || Vt.id)}:</b> ${d(ot[Vt.id])}</span>`;
        }), se = kt.subFields.filter((Vt) => ot[Vt.id] && Vt.type === "map").map((Vt) => {
          var $t, Pe;
          return `<span class="sub-field"><b>${d((($t = Vt.label) == null ? void 0 : $t[y.lang]) || ((Pe = Vt.label) == null ? void 0 : Pe.de) || Vt.id)}:</b> <code style="font-size:0.75em">${d(ot[Vt.id])}</code></span>`;
        });
        return [...Mt, ...se].join("<br>") || "";
      }
      return kt.type === "map" ? ot ? `<code style="font-size:0.75em">${d(ot)}</code>` : "" : kt.type === "distribution-editor" && Array.isArray(ot) ? ot.length ? ot.filter((Mt) => Mt && Mt["dcat:accessURL"]).map((Mt, se) => {
        const Vt = d(Mt["dct:title"] || Mt["dcat:accessURL"]), Yt = d(Mt["dcat:accessURL"]);
        return `<span class="sub-field"><b>${se + 1}.</b> <a href="${Yt}" target="_blank" rel="noopener">${Vt}</a></span>`;
      }).join("<br>") || `${ot.length} Distribution(s)` : "" : String(ot);
    }
    return (kt, ot) => {
      var jt;
      return ht(), ft("div", Vf, [
        h.wizard ? (ht(), ft(re, { key: 0 }, [
          $("div", Gf, [
            (ht(!0), ft(re, null, Me(v.value, (ct, wt) => (ht(), ft("div", {
              key: ct.id,
              class: ae(["step-item", {
                completed: wt < vt.value,
                active: wt === vt.value && vt.value < v.value.length,
                future: wt > vt.value || vt.value >= v.value.length,
                "has-error": vt.value >= v.value.length && te(ct)
              }])
            }, [
              wt > 0 ? (ht(), ft("div", {
                key: 0,
                class: ae(["step-connector left", { done: wt <= vt.value }])
              }, null, 2)) : Gt("", !0),
              $("button", {
                class: "step-circle",
                "aria-label": (h.lang === "de" ? "Schritt " : "Step ") + (wt + 1) + ": " + (ct.label[h.lang] || ct.label.en),
                "aria-current": wt === vt.value ? "step" : void 0,
                onClick: (Mt) => Re(wt)
              }, dt(wt + 1), 9, Zf),
              $("div", Hf, dt(ct.label[h.lang] || ct.label.en), 1),
              wt < v.value.length - 1 ? (ht(), ft("div", {
                key: 1,
                class: ae(["step-connector right", { done: wt < vt.value }])
              }, null, 2)) : Gt("", !0)
            ], 2))), 128)),
            $("div", {
              class: ae(["step-item", {
                active: vt.value === v.value.length,
                future: vt.value < v.value.length
              }])
            }, [
              $("div", {
                class: ae(["step-connector left", { done: vt.value >= v.value.length }])
              }, null, 2),
              ot[4] || (ot[4] = $("div", { class: "step-circle" }, "✓", -1)),
              $("div", qf, dt(h.lang === "de" ? "Übersicht" : "Summary"), 1)
            ], 2)
          ]),
          (jt = h.config) != null && jt.showProgress ? (ht(), ft("div", Kf, [
            $("div", {
              class: "progress-bar-track",
              role: "progressbar",
              "aria-valuenow": H.value,
              "aria-valuemin": "0",
              "aria-valuemax": "100",
              "aria-label": (h.lang === "de" ? "Fortschritt: " : "Progress: ") + j.value + " / " + q.value
            }, [
              $("div", {
                class: "progress-bar-fill",
                style: Du({ width: H.value + "%" })
              }, null, 4)
            ], 8, Wf),
            $("span", Jf, dt(j.value) + " / " + dt(q.value), 1)
          ])) : Gt("", !0),
          vt.value < v.value.length ? (ht(), ft(re, { key: 1 }, [
            $("div", Xf, [
              $("h2", Yf, dt(Dt.value.label[h.lang] || Dt.value.label.en), 1),
              Ss(cl, {
                fields: k(Dt.value),
                lang: h.lang,
                modelValue: h.modelValue,
                fieldErrors: F.value,
                showErrors: St.value,
                fieldComponent: x,
                "onUpdate:modelValue": ot[0] || (ot[0] = (ct) => kt.$emit("update:modelValue", ct))
              }, null, 8, ["fields", "lang", "modelValue", "fieldErrors", "showErrors"])
            ]),
            $("div", Qf, [
              vt.value > 0 ? (ht(), ft("button", {
                key: 0,
                class: "btn-back",
                onClick: _e
              }, dt(h.lang === "de" ? "Zurück" : "Back"), 1)) : (ht(), ft("span", tp)),
              $("button", {
                class: "btn-export",
                onClick: Kt
              }, dt(vt.value < v.value.length - 1 ? h.lang === "de" ? "Weiter" : "Next" : h.lang === "de" ? "Zur Übersicht" : "Summary"), 1)
            ])
          ], 64)) : (ht(), ft(re, { key: 2 }, [
            $("div", ep, [
              (ht(!0), ft(re, null, Me(v.value, (ct, wt) => (ht(), ft("div", {
                key: ct.id,
                class: ae(["form-group summary-group", { "summary-group-has-error": te(ct) }])
              }, [
                $("div", ip, [
                  $("h2", np, dt(ct.label[h.lang] || ct.label.en), 1),
                  $("div", rp, [
                    te(ct) ? (ht(), ft("span", ap, dt(h.lang === "de" ? "Fehlende Pflichtfelder" : "Required fields missing"), 1)) : Gt("", !0),
                    $("button", {
                      class: "btn-edit",
                      onClick: (Mt) => Re(wt)
                    }, dt(h.lang === "de" ? "Bearbeiten" : "Edit"), 9, sp)
                  ])
                ]),
                $("div", op, [
                  At(ct) ? (ht(!0), ft(re, { key: 0 }, Me(k(ct), (Mt) => (ht(), ft("div", {
                    key: Mt.id,
                    class: "summary-field"
                  }, [
                    Le(Mt) ? (ht(), ft(re, { key: 0 }, [
                      $("span", lp, dt(Mt.label[h.lang] || Mt.label.en), 1),
                      $("span", {
                        class: "summary-field-value",
                        innerHTML: Nt(Mt)
                      }, null, 8, up)
                    ], 64)) : Gt("", !0)
                  ]))), 128)) : (ht(), ft("span", hp, dt(h.lang === "de" ? "Keine Angaben" : "No data"), 1))
                ])
              ], 2))), 128))
            ]),
            $("div", cp, [
              nt.value ? Gt("", !0) : (ht(), ft("span", dp, dt(h.lang === "de" ? "Bitte alle Fehler beheben." : "Please fix all errors."), 1)),
              $("button", {
                class: "btn-validate",
                type: "button",
                disabled: Y.value,
                "aria-label": Y.value ? h.lang === "de" ? "Validierung läuft …" : "Validating …" : h.lang === "de" ? "SHACL-Validierung starten" : "Run SHACL validation",
                onClick: Et
              }, dt(Y.value ? "…" : h.lang === "de" ? "SHACL prüfen" : "SHACL validate"), 9, fp),
              $("button", {
                class: ae(["btn-export", { disabled: !nt.value }]),
                disabled: !nt.value,
                onClick: pe
              }, "Export JSON-LD / Turtle", 10, pp)
            ]),
            _t.value ? (ht(), Bi(fl, {
              key: 0,
              violations: ut.value,
              lang: h.lang,
              onClose: ot[1] || (ot[1] = (ct) => _t.value = !1),
              onNavigate: Tt
            }, null, 8, ["violations", "lang"])) : Gt("", !0),
            $("div", _p, [
              $("button", {
                class: "btn-back",
                onClick: _e
              }, dt(h.lang === "de" ? "Zurück" : "Back"), 1),
              ot[5] || (ot[5] = $("span", null, null, -1))
            ])
          ], 64))
        ], 64)) : (ht(), ft(re, { key: 1 }, [
          (ht(!0), ft(re, null, Me(v.value, (ct) => (ht(), ft("div", {
            key: ct.id,
            class: "form-group"
          }, [
            $("h2", gp, dt(ct.label[h.lang] || ct.label.en), 1),
            Ss(cl, {
              fields: k(ct),
              lang: h.lang,
              modelValue: h.modelValue,
              fieldErrors: F.value,
              showErrors: !0,
              fieldComponent: x,
              "onUpdate:modelValue": ot[2] || (ot[2] = (wt) => kt.$emit("update:modelValue", wt))
            }, null, 8, ["fields", "lang", "modelValue", "fieldErrors"])
          ]))), 128)),
          $("div", mp, [
            nt.value ? Gt("", !0) : (ht(), ft("span", yp, dt(h.lang === "de" ? "Bitte alle Fehler beheben." : "Please fix all errors."), 1)),
            $("button", {
              class: "btn-validate",
              type: "button",
              disabled: Y.value,
              onClick: Et
            }, dt(Y.value ? "…" : h.lang === "de" ? "SHACL prüfen" : "SHACL validate"), 9, vp),
            $("button", {
              class: ae(["btn-export", { disabled: !nt.value }]),
              disabled: !nt.value,
              onClick: pe
            }, "Export JSON-LD / Turtle", 10, bp)
          ]),
          _t.value ? (ht(), Bi(fl, {
            key: 0,
            violations: ut.value,
            lang: h.lang,
            onClose: ot[3] || (ot[3] = (ct) => _t.value = !1),
            onNavigate: Tt
          }, null, 8, ["violations", "lang"])) : Gt("", !0)
        ], 64))
      ]);
    };
  }
}, Lp = /* @__PURE__ */ Be(xp, [["__scopeId", "data-v-fd171423"]]), wp = {
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
  "dct:spatial": { "@type": "@id" }
};
class Cp {
  toJSONLD(l, d) {
    const y = {
      "@context": wp,
      "@type": "dcat:Dataset",
      "@id": l["dct:identifier"] || `_:dataset_${Date.now()}`
    };
    for (const [C, D] of Object.entries(l || {}))
      if (!(D == null || D === "" || C === "@id"))
        if (Array.isArray(D)) {
          const x = D.flatMap((v) => v && typeof v == "object" && "value" in v ? v.value ? [{ "@value": v.value, "@language": v.lang }] : [] : v ? [v] : []);
          x.length > 0 && (y[C] = x.length === 1 ? x[0] : x);
        } else if (Ao(D)) {
          const x = {};
          D["rdf:type"] && (x["@type"] = D["rdf:type"]);
          for (const [v, k] of Object.entries(D))
            !v.includes(":") || v === "rdf:type" || k && (x[v] = k);
          Object.keys(x).length > 0 && (y[C] = x);
        } else if (typeof D == "object") {
          const x = Object.fromEntries(Object.entries(D).filter(([, v]) => v));
          Object.keys(x).length > 0 && (y[C] = x);
        } else
          y[C] = D;
    return JSON.stringify(y, null, 2);
  }
  toRDFXML(l, d) {
    const y = [
      '  xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#"',
      '  xmlns:dct="http://purl.org/dc/terms/"',
      '  xmlns:dcat="http://www.w3.org/ns/dcat#"',
      '  xmlns:foaf="http://xmlns.com/foaf/0.1/"',
      '  xmlns:skos="http://www.w3.org/2004/02/skos/core#"',
      '  xmlns:vcard="http://www.w3.org/2006/vcard/ns#"',
      '  xmlns:xsd="http://www.w3.org/2001/XMLSchema#"',
      '  xmlns:rdfs="http://www.w3.org/2000/01/rdf-schema#"'
    ].join(`
`), C = l["dct:identifier"], D = C && xn(C) ? ` rdf:about="${li(C)}"` : "", x = [];
    for (const [v, k] of Object.entries(l || {}))
      if (!(k == null || k === "" || v === "dct:identifier"))
        if (Array.isArray(k))
          for (const F of k)
            F && (typeof F == "object" && "value" in F ? F.value && x.push(`    <${v} xml:lang="${F.lang}">${li(F.value)}</${v}>`) : xn(F) ? x.push(`    <${v} rdf:resource="${li(F)}"/>`) : F && x.push(`    <${v}>${li(String(F))}</${v}>`));
        else if (Ao(k)) {
          const F = [], Z = k["rdf:type"], j = Z ? `      <${Z}>` : "      <rdf:Description>", q = Z ? `      </${Z}>` : "      </rdf:Description>";
          for (const [H, nt] of Object.entries(k))
            !H.includes(":") || H === "rdf:type" || nt && (xn(nt) ? F.push(`        <${H} rdf:resource="${li(nt)}"/>`) : Ms(nt) ? F.push(`        <${H} rdf:datatype="http://www.w3.org/2001/XMLSchema#date">${li(nt)}</${H}>`) : Bs(nt) ? F.push(`        <${H} rdf:datatype="http://www.opengis.net/ont/geosparql#wktLiteral">${li(String(nt))}</${H}>`) : F.push(`        <${H}>${li(String(nt))}</${H}>`));
          F.length > 0 && x.push(`    <${v}>
${j}
${F.join(`
`)}
${q}
    </${v}>`);
        } else if (typeof k == "object")
          for (const [F, Z] of Object.entries(k))
            Z && x.push(`    <${v} xml:lang="${F}">${li(Z)}</${v}>`);
        else xn(k) ? x.push(`    <${v} rdf:resource="${li(k)}"/>`) : Ms(k) ? x.push(`    <${v} rdf:datatype="http://www.w3.org/2001/XMLSchema#date">${li(k)}</${v}>`) : Bs(k) ? x.push(`    <${v} rdf:datatype="http://www.opengis.net/ont/geosparql#wktLiteral">${li(String(k))}</${v}>`) : x.push(`    <${v}>${li(String(k))}</${v}>`);
    return [
      '<?xml version="1.0" encoding="UTF-8"?>',
      `<rdf:RDF
${y}>`,
      `  <dcat:Dataset${D}>`,
      ...x,
      "  </dcat:Dataset>",
      "</rdf:RDF>"
    ].join(`
`);
  }
  toTurtle(l, d) {
    const y = [
      "@prefix dct: <http://purl.org/dc/terms/> .",
      "@prefix dcat: <http://www.w3.org/ns/dcat#> .",
      "@prefix foaf: <http://xmlns.com/foaf/0.1/> .",
      "@prefix xsd: <http://www.w3.org/2001/XMLSchema#> .",
      "@prefix skos: <http://www.w3.org/2004/02/skos/core#> .",
      "@prefix vcard: <http://www.w3.org/2006/vcard/ns#> .",
      "@prefix rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#> .",
      "@prefix geo: <http://www.opengis.net/ont/geosparql#> .",
      "@prefix locn: <http://www.w3.org/ns/locn#> .",
      ""
    ], C = l["dct:identifier"], D = C && xn(C) ? `<${C}>` : "_:dataset", x = [];
    for (const [k, F] of Object.entries(l || {}))
      if (!(F == null || F === "" || k === "dct:identifier"))
        if (Array.isArray(F))
          for (const Z of F)
            Z && (typeof Z == "object" && "value" in Z ? Z.value && x.push(`    ${k} "${jn(Z.value)}"@${Z.lang}`) : xn(Z) ? x.push(`    ${k} <${Z}>`) : Z && x.push(`    ${k} "${jn(String(Z))}"`));
        else if (Ao(F)) {
          const Z = [];
          F["rdf:type"] && Z.push(`        a ${F["rdf:type"]}`);
          for (const [j, q] of Object.entries(F))
            !j.includes(":") || j === "rdf:type" || q && (xn(q) ? Z.push(`        ${j} <${q}>`) : Ms(q) ? Z.push(`        ${j} "${q}"^^xsd:date`) : Bs(q) ? Z.push(`        ${j} "${jn(String(q))}"^^geo:wktLiteral`) : Z.push(`        ${j} "${jn(String(q))}"`));
          if (Z.length > 0) {
            const j = Z.map(
              (q, H) => H < Z.length - 1 ? q + " ;" : q
            ).join(`
`);
            x.push(`    ${k} [
${j}
    ]`);
          }
        } else if (typeof F == "object") {
          const Z = Object.entries(F).filter(([, j]) => j).map(([j, q]) => `"${jn(q)}"@${j}`);
          Z.length > 0 && x.push(`    ${k} ${Z.join(", ")}`);
        } else xn(F) ? x.push(`    ${k} <${F}>`) : Ms(F) ? x.push(`    ${k} "${F}"^^xsd:date`) : Bs(F) ? x.push(`    ${k} "${jn(String(F))}"^^geo:wktLiteral`) : x.push(`    ${k} "${jn(String(F))}"`);
    if (x.length === 0)
      return [...y, `${D} a dcat:Dataset .`].join(`
`);
    const v = x.map(
      (k, F) => F < x.length - 1 ? k + " ;" : k + " ."
    );
    return [...y, `${D} a dcat:Dataset ;`, ...v].join(`
`);
  }
}
function li(h) {
  return String(h).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}
function jn(h) {
  return h.replace(/\\/g, "\\\\").replace(/"/g, '\\"').replace(/\n/g, "\\n");
}
function xn(h) {
  return typeof h == "string" && (h.startsWith("http://") || h.startsWith("https://"));
}
function Ms(h) {
  return typeof h == "string" && /^\d{4}-\d{2}-\d{2}/.test(h);
}
function Bs(h) {
  return typeof h == "string" && /^(POLYGON|POINT|LINESTRING|MULTIPOLYGON|MULTIPOINT|MULTILINESTRING|GEOMETRYCOLLECTION)\s*\(/i.test(h.trim());
}
function Ao(h) {
  return typeof h != "object" || h === null || Array.isArray(h) ? !1 : Object.keys(h).some((l) => l.includes(":"));
}
const kp = { class: "export-header" }, Ep = ["aria-label"], Mp = ["aria-label"], Bp = ["aria-selected", "tabindex"], Pp = ["aria-selected", "tabindex"], Sp = ["aria-selected", "tabindex"], Ap = { class: "export-content" }, Tp = ["hidden"], Dp = ["hidden"], Ip = ["hidden"], Op = { class: "export-actions" }, Fp = {
  role: "status",
  "aria-live": "polite",
  class: "copy-status"
}, Rp = {
  __name: "ExportPanel",
  props: {
    formData: Object,
    standard: String,
    lang: String
  },
  emits: ["close"],
  setup(h) {
    const l = h, d = Xt("jsonld"), y = Xt(!1), C = Xt(null), D = new Cp();
    yr(async () => {
      var H, nt, ut;
      await gr(), (ut = ((H = C.value) == null ? void 0 : H.querySelector('[role="tab"]')) || ((nt = C.value) == null ? void 0 : nt.querySelector("button"))) == null || ut.focus();
    });
    const x = Jt(() => D.toJSONLD(l.formData, l.standard)), v = Jt(() => D.toTurtle(l.formData, l.standard)), k = Jt(() => D.toRDFXML(l.formData, l.standard)), F = Jt(() => d.value === "jsonld" ? x.value : d.value === "turtle" ? v.value : k.value);
    async function Z() {
      await navigator.clipboard.writeText(F.value), y.value = !0, setTimeout(() => y.value = !1, 2e3);
    }
    function j() {
      const q = { jsonld: "jsonld", turtle: "ttl", rdfxml: "rdf" }, H = { jsonld: "application/ld+json", turtle: "text/turtle", rdfxml: "application/rdf+xml" };
      q[d.value];
      const nt = H[d.value] || "application/rdf+xml", ut = new Blob([F.value], { type: nt }), _t = URL.createObjectURL(ut), Y = document.createElement("a");
      Y.href = _t, Y.download = d.value === "jsonld" ? "metadata.jsonld" : d.value === "turtle" ? "metadata.ttl" : "metadata.rdf", Y.click(), URL.revokeObjectURL(_t);
    }
    return (q, H) => (ht(), ft("div", {
      class: "export-overlay",
      onClick: H[4] || (H[4] = Te((nt) => q.$emit("close"), ["self"])),
      onKeydown: H[5] || (H[5] = en((nt) => q.$emit("close"), ["esc"]))
    }, [
      $("div", {
        class: "export-panel",
        role: "dialog",
        "aria-modal": "true",
        "aria-labelledby": "export-heading",
        ref_key: "panelEl",
        ref: C
      }, [
        $("div", kp, [
          H[6] || (H[6] = $("h2", { id: "export-heading" }, "Export", -1)),
          $("button", {
            class: "close-btn",
            "aria-label": h.lang === "de" ? "Export schließen" : "Close export",
            onClick: H[0] || (H[0] = (nt) => q.$emit("close"))
          }, "✕", 8, Ep)
        ]),
        $("div", {
          class: "export-tabs",
          role: "tablist",
          "aria-label": h.lang === "de" ? "Exportformat" : "Export format"
        }, [
          $("button", {
            role: "tab",
            "aria-selected": d.value === "jsonld",
            "aria-controls": "export-panel-jsonld",
            class: ae({ active: d.value === "jsonld" }),
            tabindex: d.value === "jsonld" ? 0 : -1,
            onClick: H[1] || (H[1] = (nt) => d.value = "jsonld")
          }, "JSON-LD", 10, Bp),
          $("button", {
            role: "tab",
            "aria-selected": d.value === "turtle",
            "aria-controls": "export-panel-turtle",
            class: ae({ active: d.value === "turtle" }),
            tabindex: d.value === "turtle" ? 0 : -1,
            onClick: H[2] || (H[2] = (nt) => d.value = "turtle")
          }, "Turtle", 10, Pp),
          $("button", {
            role: "tab",
            "aria-selected": d.value === "rdfxml",
            "aria-controls": "export-panel-rdfxml",
            class: ae({ active: d.value === "rdfxml" }),
            tabindex: d.value === "rdfxml" ? 0 : -1,
            onClick: H[3] || (H[3] = (nt) => d.value = "rdfxml")
          }, "RDF/XML", 10, Sp)
        ], 8, Mp),
        $("div", Ap, [
          $("div", {
            id: "export-panel-jsonld",
            role: "tabpanel",
            "aria-labelledby": "export-tab-jsonld",
            hidden: d.value !== "jsonld"
          }, [
            $("pre", null, dt(x.value), 1)
          ], 8, Tp),
          $("div", {
            id: "export-panel-turtle",
            role: "tabpanel",
            "aria-labelledby": "export-tab-turtle",
            hidden: d.value !== "turtle"
          }, [
            $("pre", null, dt(v.value), 1)
          ], 8, Dp),
          $("div", {
            id: "export-panel-rdfxml",
            role: "tabpanel",
            "aria-labelledby": "export-tab-rdfxml",
            hidden: d.value !== "rdfxml"
          }, [
            $("pre", null, dt(k.value), 1)
          ], 8, Ip)
        ]),
        $("div", Op, [
          $("span", Fp, dt(y.value ? h.lang === "de" ? "Kopiert!" : "Copied!" : ""), 1),
          $("button", {
            class: "btn-copy",
            onClick: Z
          }, dt(h.lang === "de" ? "In Zwischenablage kopieren" : "Copy to clipboard"), 1),
          $("button", {
            class: "btn-download",
            onClick: j
          }, dt(h.lang === "de" ? "Herunterladen" : "Download"), 1)
        ])
      ], 512)
    ], 32));
  }
}, L0 = /* @__PURE__ */ Be(Rp, [["__scopeId", "data-v-8994c172"]]);
function gl(h) {
  return typeof h == "string" && (h.startsWith("http://") || h.startsWith("https://"));
}
const Np = {
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
  odrl: "http://www.w3.org/ns/odrl/2/"
}, ml = [
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
], zp = {
  "vcard:hasEmail": (h) => h.startsWith("mailto:") ? h.slice(7) : h,
  "foaf:mbox": (h) => h.startsWith("mailto:") ? h.slice(7) : h
};
class jp {
  fromJSONLD(l, d) {
    const y = JSON.parse(l), C = (d == null ? void 0 : d.fields) || {}, D = {};
    for (const [x, v] of Object.entries(C)) {
      const k = y[x];
      if (k == null) continue;
      const F = this._deserializeJSONLD(k, v), Z = this._coerceToFieldType(F, v);
      Z != null && !this._isInvalid(Z, v) && (D[x] = Z);
    }
    if (!D["dct:identifier"] && y["@id"] && gl(y["@id"])) {
      const x = C["dct:identifier"];
      (!x || !this._isInvalid(y["@id"], x)) && (D["dct:identifier"] = y["@id"]);
    }
    return D;
  }
  fromRDFXML(l, d) {
    const C = new DOMParser().parseFromString(l, "application/xml"), D = C.querySelector("parsererror");
    if (D) throw new Error(D.textContent);
    const x = "http://www.w3.org/ns/dcat#", v = "http://www.w3.org/1999/02/22-rdf-syntax-ns#", k = "http://www.w3.org/XML/1998/namespace", F = C.getElementsByTagNameNS(x, "Dataset")[0];
    if (!F) throw new Error("Kein dcat:Dataset gefunden");
    const Z = {}, j = /* @__PURE__ */ new Map();
    let q = 0;
    const H = (Y, Et) => {
      Z[Y] || (Z[Y] = []), Z[Y].push(Et);
    }, nt = F.getAttributeNS(v, "about");
    nt && H("dct:identifier", { termType: "NamedNode", value: nt });
    for (const Y of F.children) {
      const Et = Y.namespaceURI + Y.localName, Tt = this._toPrefixed(Et), pe = Y.getAttributeNS(v, "resource");
      if (pe) {
        H(Tt, { termType: "NamedNode", value: pe });
        continue;
      }
      const vt = Y.getElementsByTagNameNS(v, "Description")[0] || (Y.children.length > 0 ? Y.children[0] : null);
      if (vt) {
        const le = `_:bn${q++}`, te = [];
        if (!(vt.namespaceURI === v && vt.localName === "Description")) {
          const Kt = vt.namespaceURI + vt.localName;
          te.push({ subject: { value: le }, predicate: { value: v + "type" }, object: { termType: "NamedNode", value: Kt } });
        }
        for (const Kt of vt.children) {
          const _e = Kt.namespaceURI + Kt.localName, Re = Kt.getAttributeNS(v, "resource");
          if (Re)
            te.push({ subject: { value: le }, predicate: { value: _e }, object: { termType: "NamedNode", value: Re } });
          else {
            const Le = Kt.getAttributeNS(k, "lang") || Kt.getAttribute("xml:lang") || "";
            te.push({ subject: { value: le }, predicate: { value: _e }, object: { termType: "Literal", value: Kt.textContent, language: Le } });
          }
        }
        j.set(le, te), H(Tt, { termType: "BlankNode", value: le });
        continue;
      }
      const St = Y.getAttributeNS(k, "lang") || Y.getAttribute("xml:lang") || "", Dt = Y.getAttributeNS(v, "datatype") || "";
      H(Tt, { termType: "Literal", value: Y.textContent, language: St, datatype: Dt });
    }
    const ut = (d == null ? void 0 : d.fields) || {}, _t = {};
    for (const [Y, Et] of Object.entries(ut)) {
      const Tt = Z[Y];
      if (!(Tt != null && Tt.length)) continue;
      const pe = this._deserializeTurtleObjects(Tt, Et, j), vt = this._coerceToFieldType(pe, Et);
      vt != null && !this._isInvalid(vt, Et) && (_t[Y] = vt);
    }
    return _t;
  }
  async fromTurtle(l, d) {
    const y = this._normalizePrefixes(l), C = await this._parseTurtle(y);
    return this._quadsToFormData(C, d);
  }
  // ── Preprocessing ──────────────────────────────────────────────────────────
  _normalizePrefixes(l) {
    return l.replace(/^PREFIX\s+(\S+)\s+(<[^>]+>)\s*$/gim, "@prefix $1 $2 .");
  }
  // ── JSON-LD ────────────────────────────────────────────────────────────────
  _deserializeJSONLD(l, d) {
    const { type: y, multiple: C } = d;
    if (y === "langstring")
      return C ? (Array.isArray(l) ? l : [l]).map((v) => v && typeof v == "object" && "@value" in v ? { value: v["@value"], lang: v["@language"] || "de" } : { value: String(v), lang: "de" }).filter((v) => v.value) : typeof l == "object" && !Array.isArray(l) && !("@value" in l) ? l : typeof l == "object" && "@value" in l ? { [l["@language"] || "de"]: l["@value"] } : { de: String(l) };
    if (y === "multiselect")
      return (Array.isArray(l) ? l : [l]).map((v) => typeof v == "string" ? v : (v == null ? void 0 : v["@id"]) || String(v));
    if (y === "distribution-editor")
      return (Array.isArray(l) ? l : [l]).map((v) => this._importDistributionJSONLD(v)).filter((v) => v["dcat:accessURL"]);
    if (y === "object")
      return typeof l == "object" && !Array.isArray(l) ? l : {};
    const D = Array.isArray(l) ? l[0] ? this._scalarValue(l[0], d) : "" : typeof l == "object" && "@value" in l ? this._scalarValue(l["@value"], d) : this._scalarValue(String(l), d);
    return C ? D ? [D] : [""] : D;
  }
  // ── Turtle ─────────────────────────────────────────────────────────────────
  async _parseTurtle(l) {
    return new Promise((d, y) => {
      const C = new Go(), D = [];
      C.parse(l, (x, v) => {
        if (x) return y(x);
        v ? D.push(v) : d(D);
      });
    });
  }
  _quadsToFormData(l, d) {
    const y = /* @__PURE__ */ new Map();
    for (const j of l) {
      const q = j.subject.value;
      y.has(q) || y.set(q, []), y.get(q).push(j);
    }
    const C = "http://www.w3.org/ns/dcat#Dataset", D = "http://www.w3.org/1999/02/22-rdf-syntax-ns#type";
    let x = null;
    for (const [j, q] of y)
      if (q.some((H) => H.predicate.value === D && H.object.value === C)) {
        x = j;
        break;
      }
    x || (x = [...y.keys()][0]);
    const v = y.get(x) || [], k = {};
    for (const j of v) {
      const q = this._toPrefixed(j.predicate.value);
      k[q] || (k[q] = []), k[q].push(j.object);
    }
    const F = (d == null ? void 0 : d.fields) || {}, Z = {};
    for (const [j, q] of Object.entries(F)) {
      const H = k[j];
      if (!(H != null && H.length)) continue;
      const nt = this._deserializeTurtleObjects(H, q, y), ut = this._coerceToFieldType(nt, q);
      ut != null && !this._isInvalid(ut, q) && (Z[j] = ut);
    }
    if (!Z["dct:identifier"] && x && gl(x)) {
      const j = F["dct:identifier"];
      (!j || !this._isInvalid(x, j)) && (Z["dct:identifier"] = x);
    }
    return Z;
  }
  _deserializeTurtleObjects(l, d, y) {
    const { type: C, multiple: D } = d;
    if (C === "langstring") {
      const k = l.filter((Z) => Z.termType === "Literal" && Z.value);
      if (D)
        return k.map((Z) => ({ value: Z.value, lang: Z.language || "de" }));
      const F = {};
      for (const Z of k) F[Z.language || "de"] = Z.value;
      return F;
    }
    if (C === "multiselect")
      return l.map((k) => k.value);
    if (C === "distribution-editor")
      return l.filter((k) => k.termType === "BlankNode" || k.termType === "NamedNode").map((k) => this._importDistributionTurtle(y.get(k.value) || [])).filter((k) => k["dcat:accessURL"]);
    if (C === "object") {
      const k = l.find((H) => H.termType === "BlankNode" || H.termType === "NamedNode");
      if (!k) return {};
      const F = y.get(k.value) || [], Z = new Set((d.subFields || []).map((H) => H.id)), j = "http://www.w3.org/1999/02/22-rdf-syntax-ns#type", q = {};
      for (const H of F) {
        const nt = this._toPrefixed(H.predicate.value);
        if (H.predicate.value === j) {
          q["rdf:type"] = this._toPrefixed(H.object.value);
          continue;
        }
        if (Z.size > 0 && !Z.has(nt)) continue;
        const ut = zp[nt];
        q[nt] = ut ? ut(H.object.value) : H.object.value;
      }
      return q;
    }
    const x = l.filter((k) => k.termType === "Literal" || k.termType === "NamedNode");
    if (!x.length) return D ? [""] : "";
    const v = x.map((k) => this._scalarValue(k.value, d)).filter(Boolean);
    return D ? v.length ? v : [""] : v[0] ?? "";
  }
  // ── Helpers ────────────────────────────────────────────────────────────────
  _toPrefixed(l) {
    for (const [d, y] of Object.entries(Np))
      if (l.startsWith(y)) return `${d}:${l.slice(y.length)}`;
    return l;
  }
  _scalarValue(l, d) {
    return d.type === "date" && l.length > 10 && l[10] === "T" ? l.slice(0, 10) : l;
  }
  // Ensure the value matches what the form expects for this field type
  _coerceToFieldType(l, d) {
    const { type: y, multiple: C } = d;
    return y === "langstring" ? C ? Array.isArray(l) ? l : [{ value: String(l || ""), lang: "de" }] : typeof l != "object" || Array.isArray(l) ? { de: String(l || "") } : l : y === "multiselect" ? Array.isArray(l) ? l : l ? [String(l)] : [] : y === "distribution-editor" ? Array.isArray(l) ? l : [] : y === "object" ? typeof l != "object" || Array.isArray(l) ? {} : l : C ? Array.isArray(l) ? l : l ? [String(l)] : [""] : l != null ? String(l) : "";
  }
  _importDistributionJSONLD(l) {
    if (!l || typeof l != "object") return {};
    const d = {};
    for (const y of ml) {
      const C = l[y];
      if (C == null) continue;
      if (typeof C == "string") {
        d[y] = C;
        continue;
      }
      if (typeof C == "object" && "@id" in C) {
        d[y] = C["@id"];
        continue;
      }
      if (typeof C == "object" && "@value" in C) {
        d[y] = C["@value"];
        continue;
      }
      const D = Array.isArray(C) ? C[0] : null;
      D != null && (d[y] = typeof D == "string" ? D : D["@id"] || D["@value"] || "");
    }
    return d;
  }
  _importDistributionTurtle(l) {
    const d = {};
    for (const y of l) {
      const C = this._toPrefixed(y.predicate.value);
      if (!ml.includes(C)) continue;
      let D = y.object.value;
      (C === "dct:issued" || C === "dct:modified") && D.length > 10 && (D = D.slice(0, 10)), d[C] = D;
    }
    return d;
  }
  // Returns true if the value should be discarded (fails validation)
  _isInvalid(l, d) {
    if (!d.validate) return !1;
    const y = ya[d.validate];
    if (!y || d.multiple && Array.isArray(l)) return !1;
    try {
      const C = y(l, "de");
      return C && C.length > 0;
    } catch {
      return !1;
    }
  }
}
const $p = { class: "import-header" }, Up = { id: "import-heading" }, Vp = ["aria-label"], Gp = ["aria-label"], Zp = ["aria-selected", "tabindex"], Hp = ["aria-selected", "tabindex"], qp = ["aria-selected", "tabindex"], Kp = { class: "import-body" }, Wp = { class: "file-row" }, Jp = { class: "btn-file" }, Xp = ["accept", "aria-label"], Yp = {
  key: 0,
  class: "filename",
  "aria-live": "polite"
}, Qp = ["placeholder", "aria-label", "aria-describedby"], t0 = {
  key: 0,
  id: "import-error",
  class: "import-error",
  role: "alert"
}, e0 = { class: "import-actions" }, i0 = ["disabled"], n0 = {
  __name: "ImportPanel",
  props: {
    config: Object,
    lang: String
  },
  emits: ["import", "close"],
  setup(h, { emit: l }) {
    const d = h, y = l, C = Xt("jsonld"), D = Xt(""), x = Xt(""), v = Xt(""), k = Xt(null);
    yr(async () => {
      var H, nt, ut;
      await gr(), (ut = ((H = k.value) == null ? void 0 : H.querySelector('[role="tab"]')) || ((nt = k.value) == null ? void 0 : nt.querySelector("button"))) == null || ut.focus();
    });
    const F = Jt(() => C.value === "jsonld" ? `{
  "@context": { ... },
  "@type": "dcat:Dataset",
  "dct:title": { "de": "...", "en": "..." },
  ...
}` : C.value === "turtle" ? `@prefix dct: <http://purl.org/dc/terms/> .
<https://...> a dcat:Dataset ;
    dct:title "..."@de .` : `<?xml version="1.0" encoding="UTF-8"?>
<rdf:RDF xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#"
         xmlns:dct="http://purl.org/dc/terms/"
         xmlns:dcat="http://www.w3.org/ns/dcat#">
  <dcat:Dataset rdf:about="https://...">
    <dct:title xml:lang="de">...</dct:title>
  </dcat:Dataset>
</rdf:RDF>`);
    function Z(q) {
      const H = q.target.files[0];
      if (!H) return;
      x.value = H.name, v.value = "";
      const nt = new FileReader();
      nt.onload = (ut) => {
        D.value = ut.target.result;
      }, nt.readAsText(H), q.target.value = "";
    }
    async function j() {
      v.value = "";
      const q = new jp();
      try {
        let H;
        C.value === "jsonld" ? H = q.fromJSONLD(D.value, d.config) : C.value === "turtle" ? H = await q.fromTurtle(D.value, d.config) : H = q.fromRDFXML(D.value, d.config), y("import", H);
      } catch (H) {
        v.value = H.message;
      }
    }
    return (q, H) => (ht(), ft("div", {
      class: "import-overlay",
      onClick: H[6] || (H[6] = Te((nt) => q.$emit("close"), ["self"])),
      onKeydown: H[7] || (H[7] = en((nt) => q.$emit("close"), ["esc"]))
    }, [
      $("div", {
        class: "import-panel",
        role: "dialog",
        "aria-modal": "true",
        "aria-labelledby": "import-heading",
        ref_key: "panelEl",
        ref: k
      }, [
        $("div", $p, [
          $("h2", Up, dt(h.lang === "de" ? "Importieren" : "Import"), 1),
          $("button", {
            class: "close-btn",
            "aria-label": h.lang === "de" ? "Import schließen" : "Close import",
            onClick: H[0] || (H[0] = (nt) => q.$emit("close"))
          }, "✕", 8, Vp)
        ]),
        $("div", {
          class: "import-tabs",
          role: "tablist",
          "aria-label": h.lang === "de" ? "Importformat" : "Import format"
        }, [
          $("button", {
            role: "tab",
            "aria-selected": C.value === "jsonld",
            "aria-controls": "import-panel-jsonld",
            class: ae({ active: C.value === "jsonld" }),
            tabindex: C.value === "jsonld" ? 0 : -1,
            onClick: H[1] || (H[1] = (nt) => C.value = "jsonld")
          }, "JSON-LD", 10, Zp),
          $("button", {
            role: "tab",
            "aria-selected": C.value === "turtle",
            "aria-controls": "import-panel-turtle",
            class: ae({ active: C.value === "turtle" }),
            tabindex: C.value === "turtle" ? 0 : -1,
            onClick: H[2] || (H[2] = (nt) => C.value = "turtle")
          }, "Turtle", 10, Hp),
          $("button", {
            role: "tab",
            "aria-selected": C.value === "rdfxml",
            "aria-controls": "import-panel-rdfxml",
            class: ae({ active: C.value === "rdfxml" }),
            tabindex: C.value === "rdfxml" ? 0 : -1,
            onClick: H[3] || (H[3] = (nt) => C.value = "rdfxml")
          }, "RDF/XML", 10, qp)
        ], 8, Gp),
        $("div", Kp, [
          $("div", Wp, [
            $("label", Jp, [
              Un(dt(h.lang === "de" ? "Datei öffnen …" : "Open file …") + " ", 1),
              $("input", {
                type: "file",
                accept: C.value === "jsonld" ? ".json,.jsonld" : C.value === "turtle" ? ".ttl,.turtle" : ".rdf,.xml",
                "aria-label": h.lang === "de" ? "RDF-Datei auswählen" : "Select RDF file",
                onChange: Z
              }, null, 40, Xp)
            ]),
            x.value ? (ht(), ft("span", Yp, dt(x.value), 1)) : Gt("", !0)
          ]),
          vl($("textarea", {
            "onUpdate:modelValue": H[4] || (H[4] = (nt) => D.value = nt),
            class: "import-textarea",
            placeholder: F.value,
            "aria-label": h.lang === "de" ? "RDF-Inhalt zum Importieren" : "RDF content to import",
            "aria-describedby": v.value ? "import-error" : void 0,
            spellcheck: "false"
          }, null, 8, Qp), [
            [bl, D.value]
          ]),
          v.value ? (ht(), ft("div", t0, "⚠ " + dt(v.value), 1)) : Gt("", !0)
        ]),
        $("div", e0, [
          $("button", {
            class: "btn-cancel",
            onClick: H[5] || (H[5] = (nt) => q.$emit("close"))
          }, dt(h.lang === "de" ? "Abbrechen" : "Cancel"), 1),
          $("button", {
            class: "btn-import",
            disabled: !D.value.trim(),
            onClick: j
          }, dt(h.lang === "de" ? "Importieren" : "Import"), 9, i0)
        ])
      ], 512)
    ], 32));
  }
}, w0 = /* @__PURE__ */ Be(n0, [["__scopeId", "data-v-721b75f6"]]), r0 = { class: "standard-selector" }, a0 = ["value"], s0 = ["value"], o0 = {
  __name: "StandardSelector",
  props: {
    standards: Array,
    modelValue: String
  },
  emits: ["update:modelValue"],
  setup(h) {
    return (l, d) => (ht(), ft("div", r0, [
      d[1] || (d[1] = $("label", null, "Standard:", -1)),
      $("select", {
        value: h.modelValue,
        onChange: d[0] || (d[0] = (y) => l.$emit("update:modelValue", y.target.value))
      }, [
        (ht(!0), ft(re, null, Me(h.standards, (y) => (ht(), ft("option", {
          key: y.id,
          value: y.id
        }, dt(y.label), 9, s0))), 128))
      ], 40, a0)
    ]));
  }
}, C0 = /* @__PURE__ */ Be(o0, [["__scopeId", "data-v-5412301f"]]), Ke = "http://www.w3.org/ns/shacl#", ga = "http://www.w3.org/1999/02/22-rdf-syntax-ns#", $n = "http://www.w3.org/2001/XMLSchema#", l0 = "https://piveau.eu/ns/voc#", u0 = {
  [`${$n}string`]: "text",
  [`${$n}date`]: "date",
  [`${$n}dateTime`]: "date",
  [`${$n}anyURI`]: "uri",
  [`${ga}langString`]: "langstring",
  [`${$n}integer`]: "text",
  [`${$n}decimal`]: "text",
  [`${$n}nonNegativeInteger`]: "text"
};
class h0 {
  async parse(l) {
    var x;
    const d = await Vl(l), y = {};
    for (const [v, k] of d.entries()) {
      if (!k.filter((H) => H.p === `${ga}type`).map((H) => H.o.value).includes(`${Ke}NodeShape`)) continue;
      const Z = (x = k.find((H) => H.p === `${Ke}targetClass`)) == null ? void 0 : x.o.value, j = k.filter((H) => H.p === `${Ke}property`).map((H) => H.o.value), q = {};
      for (const H of j) {
        const nt = d.get(H) || [], ut = c0(nt, d);
        ut && (q[ut.id] = ut);
      }
      y[v] = { subject: v, targetClass: Z, fields: q };
    }
    const C = /* @__PURE__ */ new Set();
    for (const v of Object.values(y))
      for (const k of Object.values(v.fields)) {
        if (!k._linkedShape) continue;
        const F = k._linkedShape;
        delete k._linkedShape;
        const Z = y[F];
        Z && (k.subFields = Z.fields, C.add(F));
      }
    const D = {};
    for (const [v, k] of Object.entries(y)) {
      const F = k.targetClass || v;
      D[F] = {
        targetClass: k.targetClass,
        fields: k.fields,
        embedded: C.has(v)
      };
    }
    return D;
  }
}
function ua(h, l, d) {
  const y = h.filter((D) => D.p === l);
  if (d) {
    const D = y.find((x) => x.o.language === d);
    if (D) return D.o.value;
  }
  const C = y[0];
  return C ? C.o.value : null;
}
function c0(h, l) {
  var pe, vt, St, Dt, le, te;
  const d = h.find((ee) => ee.p === `${Ke}path`);
  if (!d) return null;
  const y = d.o.value, C = ba(y), D = ua(h, `${Ke}name`, "de"), x = ua(h, `${Ke}name`, "en"), v = ua(h, `${Ke}name`, null), k = ua(h, `${Ke}description`, "de"), F = ua(h, `${Ke}description`, "en"), Z = (pe = h.find((ee) => ee.p === `${Ke}datatype`)) == null ? void 0 : pe.o.value, j = (vt = h.find((ee) => ee.p === `${Ke}nodeKind`)) == null ? void 0 : vt.o.value, q = parseInt(((St = h.find((ee) => ee.p === `${Ke}minCount`)) == null ? void 0 : St.o.value) || "0"), H = (Dt = h.find((ee) => ee.p === `${Ke}maxCount`)) == null ? void 0 : Dt.o.value, nt = parseFloat(((le = h.find((ee) => ee.p === `${Ke}order`)) == null ? void 0 : le.o.value) || "999"), ut = h.filter((ee) => ee.p === `${Ke}in`), _t = d0(ut, l), Y = (te = h.find((ee) => ee.p === `${l0}mappingLink`)) == null ? void 0 : te.o.value;
  let Et = "text";
  Y ? Et = "object" : _t.length > 0 ? Et = "select" : Z ? Et = u0[Z] || "text" : j === `${Ke}IRI` && (Et = "uri");
  const Tt = {
    id: C,
    path: y,
    label: { de: D || v || C, en: x || v || C },
    hint: { de: k || "", en: F || "" },
    type: Et,
    required: q > 0,
    // absence of sh:maxCount means unbounded → multiple: true
    multiple: H === void 0 || parseInt(H) !== 1,
    order: nt,
    options: _t,
    visible: !0
  };
  return Y && (Tt._linkedShape = Y), Tt;
}
function d0(h, l) {
  const d = [];
  for (const y of h) Gl(y.o.value, l, d);
  return d;
}
function Gl(h, l, d) {
  if (!h || h === `${ga}nil`) return;
  const y = l.get(h) || [], C = y.find((x) => x.p === `${ga}first`), D = y.find((x) => x.p === `${ga}rest`);
  if (C) {
    const x = C.o.value;
    d.push({ value: x, label: { de: ba(x), en: ba(x) } });
  }
  D && Gl(D.o.value, l, d);
}
class f0 {
  constructor() {
    this._cache = /* @__PURE__ */ new Map();
  }
  async load(l, d) {
    if (this._cache.has(l)) return this._cache.get(l);
    try {
      const y = await fetch(l);
      if (!y.ok) throw new Error(`HTTP ${y.status}`);
      const C = await y.json(), D = this._normalize(C);
      return this._cache.set(l, D), D;
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
      const C = d["skos:prefLabel"] || d["http://www.w3.org/2004/02/skos/core#prefLabel"] || [], D = {}, x = Array.isArray(C) ? C : [C];
      for (const v of x) {
        const k = v["@language"], F = v["@value"];
        k && F && (D[k] = F);
      }
      return Object.keys(D).length ? [{ value: y, label: D }] : [];
    });
  }
  _normalizeSparql(l) {
    var y, C, D, x;
    const d = /* @__PURE__ */ new Map();
    for (const v of l) {
      const k = ((y = v.concept) == null ? void 0 : y.value) || ((C = v.uri) == null ? void 0 : C.value), F = (D = v.label) == null ? void 0 : D["xml:lang"], Z = (x = v.label) == null ? void 0 : x.value;
      !k || !F || !Z || (d.has(k) || d.set(k, { value: k, label: {} }), d.get(k).label[F] = Z);
    }
    return [...d.values()];
  }
}
class k0 {
  async resolve(l) {
    const [d, y] = await Promise.all([
      this.loadSHACL(l),
      this.loadUIConfig(l)
    ]), D = await new h0().parse(d), x = y.rootClass, v = {};
    for (const q of Object.values(D))
      q.embedded || x && q.targetClass && ba(q.targetClass) !== x || Object.assign(v, q.fields);
    const k = { ...v }, F = y.fields || {};
    for (const [q, H] of Object.entries(F))
      k[q] ? k[q] = {
        ...k[q],
        ...H,
        label: { ...k[q].label, ...H.label || {} },
        hint: { ...k[q].hint, ...H.hint || {} }
      } : k[q] = { id: q, type: "text", visible: !0, order: 999, ...H };
    const Z = (y.groups || []).map((q) => ({
      ...q,
      fields: q.fields.filter((H) => k[H] && k[H].visible !== !1)
    }));
    await this.resolveVocabularies(k);
    const j = await this.resolveVocabularies(k);
    return {
      standard: l,
      version: y.version,
      groups: Z,
      fields: k,
      vocabWarnings: j
    };
  }
  async resolveVocabularies(l) {
    const d = new f0(), y = [], C = [];
    for (const [D, x] of Object.entries(l))
      x.optionsSource && C.push(
        d.load(x.optionsSource, x.optionsSourceFallback).then((v) => {
          x.options = [...v, ...x.options || []];
        }).catch((v) => {
          console.warn(`[VocabularyLoader] ${D}: ${v.message}`), y.push({ field: D, message: v.message });
        })
      );
    return await Promise.all(C), y;
  }
  async loadSHACL(l) {
    const d = await fetch(As(`shacl/${l}.ttl`));
    if (!d.ok) throw new Error(`Failed to load SHACL for ${l}`);
    return d.text();
  }
  async loadUIConfig(l) {
    const d = await fetch(As(`config/ui-config.${l}.json`));
    if (!d.ok) throw new Error(`Failed to load UI config for ${l}`);
    return d.json();
  }
}
const Ts = {
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
function p0(h, l) {
  return h === l ? !0 : typeof h != typeof l || h === null || l === null ? !1 : JSON.stringify(h) === JSON.stringify(l);
}
function _0(h, l, d) {
  if (!(h != null && h.fields)) return l;
  let y = !1;
  const C = { ...l };
  for (const [D, x] of Object.entries(h.fields)) {
    if (!x.compute) continue;
    const v = Ts[x.compute];
    if (!v) {
      console.warn(`[fieldComputes] Unknown compute function: "${x.compute}"`);
      continue;
    }
    const k = v(C, d, D);
    k !== void 0 && !p0(k, C[D]) && (C[D] = k, y = !0);
  }
  return y ? C : l;
}
function g0(h, l) {
  const d = typeof h == "string" ? { [h]: l } : h;
  for (const [y, C] of Object.entries(d)) {
    if (Ts[y]) {
      console.warn(`[fieldComputes] "${y}" already exists — skipping. Use a unique name.`);
      continue;
    }
    Ts[y] = C;
  }
}
const m0 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  applyComputes: _0,
  fieldComputeFns: Ts,
  registerCompute: g0
}, Symbol.toStringTag, { value: "Module" })), E0 = [
  { id: "dcat-ap-at", label: "DCAT-AP.at" },
  { id: "geodcat", label: "GeoDCAT" },
  { id: "dcat-ap-3", label: "DCAT-AP 3.0" }
], M0 = {
  install(h) {
    h.component("MetadataForm", Lp);
  }
};
export {
  E0 as BUILTIN_STANDARDS,
  _d as DistributionModal,
  L0 as ExportPanel,
  Mc as FileUploader,
  k0 as FormConfigResolver,
  w0 as ImportPanel,
  Lp as MetadataForm,
  M0 as OntoFormPlugin,
  Cp as RDFExporter,
  jp as RDFImporter,
  Nf as SHACLValidationService,
  C0 as StandardSelector,
  fl as ValidationReport,
  f0 as VocabularyLoader,
  As as assetUrl,
  b0 as configure,
  g0 as registerCompute,
  bc as registerTransform,
  sf as registerValidator,
  lf as registerVisibility
};
//# sourceMappingURL=onto-form.es.js.map
