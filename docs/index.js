var __defProp = Object.defineProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, {get: all[name], enumerable: true});
};

// docs/_snowpack/env.js
var env_exports = {};
__export(env_exports, {
  MODE: () => MODE,
  NODE_ENV: () => NODE_ENV,
  SSR: () => SSR
});
var MODE = "production";
var NODE_ENV = "production";
var SSR = false;

// docs/_snowpack/pkg/lit.js
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var t = window.ShadowRoot && (window.ShadyCSS === void 0 || window.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype;
var e = Symbol();
var n = new Map();
var s = class {
  constructor(t3, n3) {
    if (this._$cssResult$ = true, n3 !== e)
      throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t3;
  }
  get styleSheet() {
    let e3 = n.get(this.cssText);
    return t && e3 === void 0 && (n.set(this.cssText, e3 = new CSSStyleSheet()), e3.replaceSync(this.cssText)), e3;
  }
  toString() {
    return this.cssText;
  }
};
var o = (t3) => new s(typeof t3 == "string" ? t3 : t3 + "", e);
var r = (t3, ...n3) => {
  const o2 = t3.length === 1 ? t3[0] : n3.reduce((e3, n4, s2) => e3 + ((t4) => {
    if (t4._$cssResult$ === true)
      return t4.cssText;
    if (typeof t4 == "number")
      return t4;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + t4 + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(n4) + t3[s2 + 1], t3[0]);
  return new s(o2, e);
};
var i = (e3, n3) => {
  t ? e3.adoptedStyleSheets = n3.map((t3) => t3 instanceof CSSStyleSheet ? t3 : t3.styleSheet) : n3.forEach((t3) => {
    const n4 = document.createElement("style"), s2 = window.litNonce;
    s2 !== void 0 && n4.setAttribute("nonce", s2), n4.textContent = t3.cssText, e3.appendChild(n4);
  });
};
var S = t ? (t3) => t3 : (t3) => t3 instanceof CSSStyleSheet ? ((t4) => {
  let e3 = "";
  for (const n3 of t4.cssRules)
    e3 += n3.cssText;
  return o(e3);
})(t3) : t3;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var s$1;
var e$1 = window.trustedTypes;
var r$1 = e$1 ? e$1.emptyScript : "";
var h = window.reactiveElementPolyfillSupport;
var o$1 = {
  toAttribute(t3, i3) {
    switch (i3) {
      case Boolean:
        t3 = t3 ? r$1 : null;
        break;
      case Object:
      case Array:
        t3 = t3 == null ? t3 : JSON.stringify(t3);
    }
    return t3;
  },
  fromAttribute(t3, i3) {
    let s2 = t3;
    switch (i3) {
      case Boolean:
        s2 = t3 !== null;
        break;
      case Number:
        s2 = t3 === null ? null : Number(t3);
        break;
      case Object:
      case Array:
        try {
          s2 = JSON.parse(t3);
        } catch (t4) {
          s2 = null;
        }
    }
    return s2;
  }
};
var n$1 = (t3, i3) => i3 !== t3 && (i3 == i3 || t3 == t3);
var l = {
  attribute: true,
  type: String,
  converter: o$1,
  reflect: false,
  hasChanged: n$1
};
var a = class extends HTMLElement {
  constructor() {
    super(), this._$Et = new Map(), this.isUpdatePending = false, this.hasUpdated = false, this._$Ei = null, this.o();
  }
  static addInitializer(t3) {
    var i3;
    (i3 = this.l) !== null && i3 !== void 0 || (this.l = []), this.l.push(t3);
  }
  static get observedAttributes() {
    this.finalize();
    const t3 = [];
    return this.elementProperties.forEach((i3, s2) => {
      const e3 = this._$Eh(s2, i3);
      e3 !== void 0 && (this._$Eu.set(e3, s2), t3.push(e3));
    }), t3;
  }
  static createProperty(t3, i3 = l) {
    if (i3.state && (i3.attribute = false), this.finalize(), this.elementProperties.set(t3, i3), !i3.noAccessor && !this.prototype.hasOwnProperty(t3)) {
      const s2 = typeof t3 == "symbol" ? Symbol() : "__" + t3, e3 = this.getPropertyDescriptor(t3, s2, i3);
      e3 !== void 0 && Object.defineProperty(this.prototype, t3, e3);
    }
  }
  static getPropertyDescriptor(t3, i3, s2) {
    return {
      get() {
        return this[i3];
      },
      set(e3) {
        const r2 = this[t3];
        this[i3] = e3, this.requestUpdate(t3, r2, s2);
      },
      configurable: true,
      enumerable: true
    };
  }
  static getPropertyOptions(t3) {
    return this.elementProperties.get(t3) || l;
  }
  static finalize() {
    if (this.hasOwnProperty("finalized"))
      return false;
    this.finalized = true;
    const t3 = Object.getPrototypeOf(this);
    if (t3.finalize(), this.elementProperties = new Map(t3.elementProperties), this._$Eu = new Map(), this.hasOwnProperty("properties")) {
      const t4 = this.properties, i3 = [...Object.getOwnPropertyNames(t4), ...Object.getOwnPropertySymbols(t4)];
      for (const s2 of i3)
        this.createProperty(s2, t4[s2]);
    }
    return this.elementStyles = this.finalizeStyles(this.styles), true;
  }
  static finalizeStyles(i3) {
    const s2 = [];
    if (Array.isArray(i3)) {
      const e3 = new Set(i3.flat(1 / 0).reverse());
      for (const i4 of e3)
        s2.unshift(S(i4));
    } else
      i3 !== void 0 && s2.push(S(i3));
    return s2;
  }
  static _$Eh(t3, i3) {
    const s2 = i3.attribute;
    return s2 === false ? void 0 : typeof s2 == "string" ? s2 : typeof t3 == "string" ? t3.toLowerCase() : void 0;
  }
  o() {
    var t3;
    this._$Ep = new Promise((t4) => this.enableUpdating = t4), this._$AL = new Map(), this._$Em(), this.requestUpdate(), (t3 = this.constructor.l) === null || t3 === void 0 || t3.forEach((t4) => t4(this));
  }
  addController(t3) {
    var i3, s2;
    ((i3 = this._$Eg) !== null && i3 !== void 0 ? i3 : this._$Eg = []).push(t3), this.renderRoot !== void 0 && this.isConnected && ((s2 = t3.hostConnected) === null || s2 === void 0 || s2.call(t3));
  }
  removeController(t3) {
    var i3;
    (i3 = this._$Eg) === null || i3 === void 0 || i3.splice(this._$Eg.indexOf(t3) >>> 0, 1);
  }
  _$Em() {
    this.constructor.elementProperties.forEach((t3, i3) => {
      this.hasOwnProperty(i3) && (this._$Et.set(i3, this[i3]), delete this[i3]);
    });
  }
  createRenderRoot() {
    var t3;
    const s2 = (t3 = this.shadowRoot) !== null && t3 !== void 0 ? t3 : this.attachShadow(this.constructor.shadowRootOptions);
    return i(s2, this.constructor.elementStyles), s2;
  }
  connectedCallback() {
    var t3;
    this.renderRoot === void 0 && (this.renderRoot = this.createRenderRoot()), this.enableUpdating(true), (t3 = this._$Eg) === null || t3 === void 0 || t3.forEach((t4) => {
      var i3;
      return (i3 = t4.hostConnected) === null || i3 === void 0 ? void 0 : i3.call(t4);
    });
  }
  enableUpdating(t3) {
  }
  disconnectedCallback() {
    var t3;
    (t3 = this._$Eg) === null || t3 === void 0 || t3.forEach((t4) => {
      var i3;
      return (i3 = t4.hostDisconnected) === null || i3 === void 0 ? void 0 : i3.call(t4);
    });
  }
  attributeChangedCallback(t3, i3, s2) {
    this._$AK(t3, s2);
  }
  _$ES(t3, i3, s2 = l) {
    var e3, r2;
    const h2 = this.constructor._$Eh(t3, s2);
    if (h2 !== void 0 && s2.reflect === true) {
      const n3 = ((r2 = (e3 = s2.converter) === null || e3 === void 0 ? void 0 : e3.toAttribute) !== null && r2 !== void 0 ? r2 : o$1.toAttribute)(i3, s2.type);
      this._$Ei = t3, n3 == null ? this.removeAttribute(h2) : this.setAttribute(h2, n3), this._$Ei = null;
    }
  }
  _$AK(t3, i3) {
    var s2, e3, r2;
    const h2 = this.constructor, n3 = h2._$Eu.get(t3);
    if (n3 !== void 0 && this._$Ei !== n3) {
      const t4 = h2.getPropertyOptions(n3), l2 = t4.converter, a2 = (r2 = (e3 = (s2 = l2) === null || s2 === void 0 ? void 0 : s2.fromAttribute) !== null && e3 !== void 0 ? e3 : typeof l2 == "function" ? l2 : null) !== null && r2 !== void 0 ? r2 : o$1.fromAttribute;
      this._$Ei = n3, this[n3] = a2(i3, t4.type), this._$Ei = null;
    }
  }
  requestUpdate(t3, i3, s2) {
    let e3 = true;
    t3 !== void 0 && (((s2 = s2 || this.constructor.getPropertyOptions(t3)).hasChanged || n$1)(this[t3], i3) ? (this._$AL.has(t3) || this._$AL.set(t3, i3), s2.reflect === true && this._$Ei !== t3 && (this._$EC === void 0 && (this._$EC = new Map()), this._$EC.set(t3, s2))) : e3 = false), !this.isUpdatePending && e3 && (this._$Ep = this._$E_());
  }
  async _$E_() {
    this.isUpdatePending = true;
    try {
      await this._$Ep;
    } catch (t4) {
      Promise.reject(t4);
    }
    const t3 = this.scheduleUpdate();
    return t3 != null && await t3, !this.isUpdatePending;
  }
  scheduleUpdate() {
    return this.performUpdate();
  }
  performUpdate() {
    var t3;
    if (!this.isUpdatePending)
      return;
    this.hasUpdated, this._$Et && (this._$Et.forEach((t4, i4) => this[i4] = t4), this._$Et = void 0);
    let i3 = false;
    const s2 = this._$AL;
    try {
      i3 = this.shouldUpdate(s2), i3 ? (this.willUpdate(s2), (t3 = this._$Eg) === null || t3 === void 0 || t3.forEach((t4) => {
        var i4;
        return (i4 = t4.hostUpdate) === null || i4 === void 0 ? void 0 : i4.call(t4);
      }), this.update(s2)) : this._$EU();
    } catch (t4) {
      throw i3 = false, this._$EU(), t4;
    }
    i3 && this._$AE(s2);
  }
  willUpdate(t3) {
  }
  _$AE(t3) {
    var i3;
    (i3 = this._$Eg) === null || i3 === void 0 || i3.forEach((t4) => {
      var i4;
      return (i4 = t4.hostUpdated) === null || i4 === void 0 ? void 0 : i4.call(t4);
    }), this.hasUpdated || (this.hasUpdated = true, this.firstUpdated(t3)), this.updated(t3);
  }
  _$EU() {
    this._$AL = new Map(), this.isUpdatePending = false;
  }
  get updateComplete() {
    return this.getUpdateComplete();
  }
  getUpdateComplete() {
    return this._$Ep;
  }
  shouldUpdate(t3) {
    return true;
  }
  update(t3) {
    this._$EC !== void 0 && (this._$EC.forEach((t4, i3) => this._$ES(i3, this[i3], t4)), this._$EC = void 0), this._$EU();
  }
  updated(t3) {
  }
  firstUpdated(t3) {
  }
};
a.finalized = true, a.elementProperties = new Map(), a.elementStyles = [], a.shadowRootOptions = {
  mode: "open"
}, h == null || h({
  ReactiveElement: a
}), ((s$1 = globalThis.reactiveElementVersions) !== null && s$1 !== void 0 ? s$1 : globalThis.reactiveElementVersions = []).push("1.3.0");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var t$1;
var i$1 = globalThis.trustedTypes;
var s$2 = i$1 ? i$1.createPolicy("lit-html", {
  createHTML: (t3) => t3
}) : void 0;
var e$2 = `lit$${(Math.random() + "").slice(9)}$`;
var o$2 = "?" + e$2;
var n$2 = `<${o$2}>`;
var l$1 = document;
var h$1 = (t3 = "") => l$1.createComment(t3);
var r$2 = (t3) => t3 === null || typeof t3 != "object" && typeof t3 != "function";
var d = Array.isArray;
var u = (t3) => {
  var i3;
  return d(t3) || typeof ((i3 = t3) === null || i3 === void 0 ? void 0 : i3[Symbol.iterator]) == "function";
};
var c = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g;
var v = /-->/g;
var a$1 = />/g;
var f = />|[ 	\n\r](?:([^\s"'>=/]+)([ 	\n\r]*=[ 	\n\r]*(?:[^ 	\n\r"'`<>=]|("|')|))|$)/g;
var _ = /'/g;
var m = /"/g;
var g = /^(?:script|style|textarea|title)$/i;
var p = (t3) => (i3, ...s2) => ({
  _$litType$: t3,
  strings: i3,
  values: s2
});
var $ = p(1);
var b = Symbol.for("lit-noChange");
var w = Symbol.for("lit-nothing");
var T = new WeakMap();
var x = (t3, i3, s2) => {
  var e3, o2;
  const n3 = (e3 = s2 == null ? void 0 : s2.renderBefore) !== null && e3 !== void 0 ? e3 : i3;
  let l2 = n3._$litPart$;
  if (l2 === void 0) {
    const t4 = (o2 = s2 == null ? void 0 : s2.renderBefore) !== null && o2 !== void 0 ? o2 : null;
    n3._$litPart$ = l2 = new N(i3.insertBefore(h$1(), t4), t4, void 0, s2 != null ? s2 : {});
  }
  return l2._$AI(t3), l2;
};
var A = l$1.createTreeWalker(l$1, 129, null, false);
var C = (t3, i3) => {
  const o2 = t3.length - 1, l2 = [];
  let h2, r2 = i3 === 2 ? "<svg>" : "", d2 = c;
  for (let i4 = 0; i4 < o2; i4++) {
    const s2 = t3[i4];
    let o3, u3, p2 = -1, $2 = 0;
    for (; $2 < s2.length && (d2.lastIndex = $2, u3 = d2.exec(s2), u3 !== null); )
      $2 = d2.lastIndex, d2 === c ? u3[1] === "!--" ? d2 = v : u3[1] !== void 0 ? d2 = a$1 : u3[2] !== void 0 ? (g.test(u3[2]) && (h2 = RegExp("</" + u3[2], "g")), d2 = f) : u3[3] !== void 0 && (d2 = f) : d2 === f ? u3[0] === ">" ? (d2 = h2 != null ? h2 : c, p2 = -1) : u3[1] === void 0 ? p2 = -2 : (p2 = d2.lastIndex - u3[2].length, o3 = u3[1], d2 = u3[3] === void 0 ? f : u3[3] === '"' ? m : _) : d2 === m || d2 === _ ? d2 = f : d2 === v || d2 === a$1 ? d2 = c : (d2 = f, h2 = void 0);
    const y = d2 === f && t3[i4 + 1].startsWith("/>") ? " " : "";
    r2 += d2 === c ? s2 + n$2 : p2 >= 0 ? (l2.push(o3), s2.slice(0, p2) + "$lit$" + s2.slice(p2) + e$2 + y) : s2 + e$2 + (p2 === -2 ? (l2.push(void 0), i4) : y);
  }
  const u2 = r2 + (t3[o2] || "<?>") + (i3 === 2 ? "</svg>" : "");
  if (!Array.isArray(t3) || !t3.hasOwnProperty("raw"))
    throw Error("invalid template strings array");
  return [s$2 !== void 0 ? s$2.createHTML(u2) : u2, l2];
};
var E = class {
  constructor({
    strings: t3,
    _$litType$: s2
  }, n3) {
    let l2;
    this.parts = [];
    let r2 = 0, d2 = 0;
    const u2 = t3.length - 1, c2 = this.parts, [v2, a2] = C(t3, s2);
    if (this.el = E.createElement(v2, n3), A.currentNode = this.el.content, s2 === 2) {
      const t4 = this.el.content, i3 = t4.firstChild;
      i3.remove(), t4.append(...i3.childNodes);
    }
    for (; (l2 = A.nextNode()) !== null && c2.length < u2; ) {
      if (l2.nodeType === 1) {
        if (l2.hasAttributes()) {
          const t4 = [];
          for (const i3 of l2.getAttributeNames())
            if (i3.endsWith("$lit$") || i3.startsWith(e$2)) {
              const s3 = a2[d2++];
              if (t4.push(i3), s3 !== void 0) {
                const t5 = l2.getAttribute(s3.toLowerCase() + "$lit$").split(e$2), i4 = /([.?@])?(.*)/.exec(s3);
                c2.push({
                  type: 1,
                  index: r2,
                  name: i4[2],
                  strings: t5,
                  ctor: i4[1] === "." ? M : i4[1] === "?" ? H : i4[1] === "@" ? I : S$1
                });
              } else
                c2.push({
                  type: 6,
                  index: r2
                });
            }
          for (const i3 of t4)
            l2.removeAttribute(i3);
        }
        if (g.test(l2.tagName)) {
          const t4 = l2.textContent.split(e$2), s3 = t4.length - 1;
          if (s3 > 0) {
            l2.textContent = i$1 ? i$1.emptyScript : "";
            for (let i3 = 0; i3 < s3; i3++)
              l2.append(t4[i3], h$1()), A.nextNode(), c2.push({
                type: 2,
                index: ++r2
              });
            l2.append(t4[s3], h$1());
          }
        }
      } else if (l2.nodeType === 8)
        if (l2.data === o$2)
          c2.push({
            type: 2,
            index: r2
          });
        else {
          let t4 = -1;
          for (; (t4 = l2.data.indexOf(e$2, t4 + 1)) !== -1; )
            c2.push({
              type: 7,
              index: r2
            }), t4 += e$2.length - 1;
        }
      r2++;
    }
  }
  static createElement(t3, i3) {
    const s2 = l$1.createElement("template");
    return s2.innerHTML = t3, s2;
  }
};
function P(t3, i3, s2 = t3, e3) {
  var o2, n3, l2, h2;
  if (i3 === b)
    return i3;
  let d2 = e3 !== void 0 ? (o2 = s2._$Cl) === null || o2 === void 0 ? void 0 : o2[e3] : s2._$Cu;
  const u2 = r$2(i3) ? void 0 : i3._$litDirective$;
  return (d2 == null ? void 0 : d2.constructor) !== u2 && ((n3 = d2 == null ? void 0 : d2._$AO) === null || n3 === void 0 || n3.call(d2, false), u2 === void 0 ? d2 = void 0 : (d2 = new u2(t3), d2._$AT(t3, s2, e3)), e3 !== void 0 ? ((l2 = (h2 = s2)._$Cl) !== null && l2 !== void 0 ? l2 : h2._$Cl = [])[e3] = d2 : s2._$Cu = d2), d2 !== void 0 && (i3 = P(t3, d2._$AS(t3, i3.values), d2, e3)), i3;
}
var V = class {
  constructor(t3, i3) {
    this.v = [], this._$AN = void 0, this._$AD = t3, this._$AM = i3;
  }
  get parentNode() {
    return this._$AM.parentNode;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  p(t3) {
    var i3;
    const {
      el: {
        content: s2
      },
      parts: e3
    } = this._$AD, o2 = ((i3 = t3 == null ? void 0 : t3.creationScope) !== null && i3 !== void 0 ? i3 : l$1).importNode(s2, true);
    A.currentNode = o2;
    let n3 = A.nextNode(), h2 = 0, r2 = 0, d2 = e3[0];
    for (; d2 !== void 0; ) {
      if (h2 === d2.index) {
        let i4;
        d2.type === 2 ? i4 = new N(n3, n3.nextSibling, this, t3) : d2.type === 1 ? i4 = new d2.ctor(n3, d2.name, d2.strings, this, t3) : d2.type === 6 && (i4 = new L(n3, this, t3)), this.v.push(i4), d2 = e3[++r2];
      }
      h2 !== (d2 == null ? void 0 : d2.index) && (n3 = A.nextNode(), h2++);
    }
    return o2;
  }
  m(t3) {
    let i3 = 0;
    for (const s2 of this.v)
      s2 !== void 0 && (s2.strings !== void 0 ? (s2._$AI(t3, s2, i3), i3 += s2.strings.length - 2) : s2._$AI(t3[i3])), i3++;
  }
};
var N = class {
  constructor(t3, i3, s2, e3) {
    var o2;
    this.type = 2, this._$AH = w, this._$AN = void 0, this._$AA = t3, this._$AB = i3, this._$AM = s2, this.options = e3, this._$Cg = (o2 = e3 == null ? void 0 : e3.isConnected) === null || o2 === void 0 || o2;
  }
  get _$AU() {
    var t3, i3;
    return (i3 = (t3 = this._$AM) === null || t3 === void 0 ? void 0 : t3._$AU) !== null && i3 !== void 0 ? i3 : this._$Cg;
  }
  get parentNode() {
    let t3 = this._$AA.parentNode;
    const i3 = this._$AM;
    return i3 !== void 0 && t3.nodeType === 11 && (t3 = i3.parentNode), t3;
  }
  get startNode() {
    return this._$AA;
  }
  get endNode() {
    return this._$AB;
  }
  _$AI(t3, i3 = this) {
    t3 = P(this, t3, i3), r$2(t3) ? t3 === w || t3 == null || t3 === "" ? (this._$AH !== w && this._$AR(), this._$AH = w) : t3 !== this._$AH && t3 !== b && this.$(t3) : t3._$litType$ !== void 0 ? this.T(t3) : t3.nodeType !== void 0 ? this.k(t3) : u(t3) ? this.S(t3) : this.$(t3);
  }
  A(t3, i3 = this._$AB) {
    return this._$AA.parentNode.insertBefore(t3, i3);
  }
  k(t3) {
    this._$AH !== t3 && (this._$AR(), this._$AH = this.A(t3));
  }
  $(t3) {
    this._$AH !== w && r$2(this._$AH) ? this._$AA.nextSibling.data = t3 : this.k(l$1.createTextNode(t3)), this._$AH = t3;
  }
  T(t3) {
    var i3;
    const {
      values: s2,
      _$litType$: e3
    } = t3, o2 = typeof e3 == "number" ? this._$AC(t3) : (e3.el === void 0 && (e3.el = E.createElement(e3.h, this.options)), e3);
    if (((i3 = this._$AH) === null || i3 === void 0 ? void 0 : i3._$AD) === o2)
      this._$AH.m(s2);
    else {
      const t4 = new V(o2, this), i4 = t4.p(this.options);
      t4.m(s2), this.k(i4), this._$AH = t4;
    }
  }
  _$AC(t3) {
    let i3 = T.get(t3.strings);
    return i3 === void 0 && T.set(t3.strings, i3 = new E(t3)), i3;
  }
  S(t3) {
    d(this._$AH) || (this._$AH = [], this._$AR());
    const i3 = this._$AH;
    let s2, e3 = 0;
    for (const o2 of t3)
      e3 === i3.length ? i3.push(s2 = new N(this.A(h$1()), this.A(h$1()), this, this.options)) : s2 = i3[e3], s2._$AI(o2), e3++;
    e3 < i3.length && (this._$AR(s2 && s2._$AB.nextSibling, e3), i3.length = e3);
  }
  _$AR(t3 = this._$AA.nextSibling, i3) {
    var s2;
    for ((s2 = this._$AP) === null || s2 === void 0 || s2.call(this, false, true, i3); t3 && t3 !== this._$AB; ) {
      const i4 = t3.nextSibling;
      t3.remove(), t3 = i4;
    }
  }
  setConnected(t3) {
    var i3;
    this._$AM === void 0 && (this._$Cg = t3, (i3 = this._$AP) === null || i3 === void 0 || i3.call(this, t3));
  }
};
var S$1 = class {
  constructor(t3, i3, s2, e3, o2) {
    this.type = 1, this._$AH = w, this._$AN = void 0, this.element = t3, this.name = i3, this._$AM = e3, this.options = o2, s2.length > 2 || s2[0] !== "" || s2[1] !== "" ? (this._$AH = Array(s2.length - 1).fill(new String()), this.strings = s2) : this._$AH = w;
  }
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t3, i3 = this, s2, e3) {
    const o2 = this.strings;
    let n3 = false;
    if (o2 === void 0)
      t3 = P(this, t3, i3, 0), n3 = !r$2(t3) || t3 !== this._$AH && t3 !== b, n3 && (this._$AH = t3);
    else {
      const e4 = t3;
      let l2, h2;
      for (t3 = o2[0], l2 = 0; l2 < o2.length - 1; l2++)
        h2 = P(this, e4[s2 + l2], i3, l2), h2 === b && (h2 = this._$AH[l2]), n3 || (n3 = !r$2(h2) || h2 !== this._$AH[l2]), h2 === w ? t3 = w : t3 !== w && (t3 += (h2 != null ? h2 : "") + o2[l2 + 1]), this._$AH[l2] = h2;
    }
    n3 && !e3 && this.C(t3);
  }
  C(t3) {
    t3 === w ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t3 != null ? t3 : "");
  }
};
var M = class extends S$1 {
  constructor() {
    super(...arguments), this.type = 3;
  }
  C(t3) {
    this.element[this.name] = t3 === w ? void 0 : t3;
  }
};
var k = i$1 ? i$1.emptyScript : "";
var H = class extends S$1 {
  constructor() {
    super(...arguments), this.type = 4;
  }
  C(t3) {
    t3 && t3 !== w ? this.element.setAttribute(this.name, k) : this.element.removeAttribute(this.name);
  }
};
var I = class extends S$1 {
  constructor(t3, i3, s2, e3, o2) {
    super(t3, i3, s2, e3, o2), this.type = 5;
  }
  _$AI(t3, i3 = this) {
    var s2;
    if ((t3 = (s2 = P(this, t3, i3, 0)) !== null && s2 !== void 0 ? s2 : w) === b)
      return;
    const e3 = this._$AH, o2 = t3 === w && e3 !== w || t3.capture !== e3.capture || t3.once !== e3.once || t3.passive !== e3.passive, n3 = t3 !== w && (e3 === w || o2);
    o2 && this.element.removeEventListener(this.name, this, e3), n3 && this.element.addEventListener(this.name, this, t3), this._$AH = t3;
  }
  handleEvent(t3) {
    var i3, s2;
    typeof this._$AH == "function" ? this._$AH.call((s2 = (i3 = this.options) === null || i3 === void 0 ? void 0 : i3.host) !== null && s2 !== void 0 ? s2 : this.element, t3) : this._$AH.handleEvent(t3);
  }
};
var L = class {
  constructor(t3, i3, s2) {
    this.element = t3, this.type = 6, this._$AN = void 0, this._$AM = i3, this.options = s2;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t3) {
    P(this, t3);
  }
};
var z = window.litHtmlPolyfillSupport;
z == null || z(E, N), ((t$1 = globalThis.litHtmlVersions) !== null && t$1 !== void 0 ? t$1 : globalThis.litHtmlVersions = []).push("2.2.0");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var l$2;
var o$3;
var s$3 = class extends a {
  constructor() {
    super(...arguments), this.renderOptions = {
      host: this
    }, this._$Dt = void 0;
  }
  createRenderRoot() {
    var t3, e3;
    const i3 = super.createRenderRoot();
    return (t3 = (e3 = this.renderOptions).renderBefore) !== null && t3 !== void 0 || (e3.renderBefore = i3.firstChild), i3;
  }
  update(t3) {
    const i3 = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t3), this._$Dt = x(i3, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    var t3;
    super.connectedCallback(), (t3 = this._$Dt) === null || t3 === void 0 || t3.setConnected(true);
  }
  disconnectedCallback() {
    var t3;
    super.disconnectedCallback(), (t3 = this._$Dt) === null || t3 === void 0 || t3.setConnected(false);
  }
  render() {
    return b;
  }
};
s$3.finalized = true, s$3._$litElement$ = true, (l$2 = globalThis.litElementHydrateSupport) === null || l$2 === void 0 || l$2.call(globalThis, {
  LitElement: s$3
});
var n$3 = globalThis.litElementPolyfillSupport;
n$3 == null || n$3({
  LitElement: s$3
});
((o$3 = globalThis.litElementVersions) !== null && o$3 !== void 0 ? o$3 : globalThis.litElementVersions = []).push("3.2.0");

// docs/_snowpack/pkg/lit/decorators.js
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var i2 = (i3, e3) => e3.kind === "method" && e3.descriptor && !("value" in e3.descriptor) ? {
  ...e3,
  finisher(n3) {
    n3.createProperty(e3.key, i3);
  }
} : {
  kind: "field",
  key: Symbol(),
  placement: "own",
  descriptor: {},
  originalKey: e3.key,
  initializer() {
    typeof e3.initializer == "function" && (this[e3.key] = e3.initializer.call(this));
  },
  finisher(n3) {
    n3.createProperty(e3.key, i3);
  }
};
function e2(e3) {
  return (n3, t3) => t3 !== void 0 ? ((i3, e4, n4) => {
    e4.constructor.createProperty(n4, i3);
  })(e3, n3, t3) : i2(e3, n3);
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function t2(t3) {
  return e2({
    ...t3,
    state: true
  });
}
/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var n2;
var e$12 = ((n2 = window.HTMLSlotElement) === null || n2 === void 0 ? void 0 : n2.prototype.assignedElements) != null ? (o2, n3) => o2.assignedElements(n3) : (o2, n3) => o2.assignedNodes(n3).filter((o3) => o3.nodeType === Node.ELEMENT_NODE);

// docs/static/utils.js
function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    enumerableOnly && (symbols = symbols.filter(function(sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    })), keys.push.apply(keys, symbols);
  }
  return keys;
}
function _objectSpread(target) {
  for (var i3 = 1; i3 < arguments.length; i3++) {
    var source = arguments[i3] != null ? arguments[i3] : {};
    i3 % 2 ? ownKeys(Object(source), true).forEach(function(key) {
      _defineProperty(target, key, source[key]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function(key) {
      Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
    });
  }
  return target;
}
function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {value, enumerable: true, configurable: true, writable: true});
  } else {
    obj[key] = value;
  }
  return obj;
}
var TYPE_NULL = "null";
var TYPE_ARRAY = "array";
var TYPE_OBJECT = "object";
var TYPE_STRING = "string";
function isRegex(obj) {
  return obj instanceof RegExp;
}
function getType(obj) {
  return obj === null ? TYPE_NULL : Array.isArray(obj) ? TYPE_ARRAY : typeof obj;
}
function isPrimitive(obj) {
  return obj !== Object(obj);
}
function isNode(obj) {
  return !!obj && !!obj.nodeType;
}
function isPrimitiveOrNode(obj) {
  return isPrimitive(obj) || isNode(obj);
}
function JsonObject(obj) {
  try {
    if (typeof obj === TYPE_STRING)
      return JSON.parse(obj);
  } catch (ex) {
    console.error(ex);
  }
  return obj;
}
function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}
function generateNodePreview(node, options) {
  const {
    nodeCount,
    maxLength
  } = _objectSpread({
    nodeCount: 3,
    maxLength: 15
  }, options);
  const isArray = Array.isArray(node);
  const objectNodes = Object.keys(node);
  const keys = objectNodes.slice(0, nodeCount);
  const preview = [isArray ? "[ " : "{ "];
  const childPreviews = [];
  for (const key of keys) {
    const nodePreview = [];
    const nodeValue = node[key];
    const nodeType = getType(nodeValue);
    if (!isArray)
      nodePreview.push(`${key}: `);
    if (nodeType === TYPE_OBJECT)
      nodePreview.push(Object.keys(nodeValue).length === 0 ? "{ }" : "{ ... }");
    else if (nodeType === TYPE_ARRAY)
      nodePreview.push(nodeValue.length === 0 ? "[ ]" : "[ ... ]");
    else if (nodeType === TYPE_STRING)
      nodePreview.push(`"${nodeValue.substring(0, maxLength)}${nodeValue.length > maxLength ? "..." : ""}"`);
    else
      nodePreview.push(String(nodeValue));
    childPreviews.push(nodePreview.join(""));
  }
  if (objectNodes.length > nodeCount)
    childPreviews.push("...");
  preview.push(childPreviews.join(", "));
  preview.push(isArray ? " ]" : " }");
  return preview.join("");
}
function* deepTraverse(obj) {
  const stack = [["", obj, []]];
  while (stack.length) {
    const [path, node, parents] = stack.shift();
    if (path) {
      yield [node, path, parents];
    }
    if (!isPrimitive(node)) {
      for (const [key, value] of Object.entries(node)) {
        stack.push([`${path}${path ? "." : ""}${key}`, value, [...parents, path]]);
      }
    }
  }
}
function checkGlob(str, glob) {
  str = str.split(".");
  glob = glob.split(".");
  const isStar = (s2) => s2 === "*";
  const isGlobStar = (s2) => s2 === "**";
  let strIndex = 0;
  let globIndex = 0;
  while (strIndex < str.length) {
    const globPart = glob[globIndex];
    const strPart = str[strIndex];
    if (globPart === strPart || isStar(globPart)) {
      globIndex++;
      strIndex++;
    } else if (isGlobStar(globPart)) {
      globIndex++;
      strIndex = str.length - (glob.length - globIndex);
    } else
      return false;
  }
  return globIndex === glob.length;
}

// docs/static/stateChange.js
function ownKeys2(object, enumerableOnly) {
  var keys = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    enumerableOnly && (symbols = symbols.filter(function(sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    })), keys.push.apply(keys, symbols);
  }
  return keys;
}
function _objectSpread2(target) {
  for (var i3 = 1; i3 < arguments.length; i3++) {
    var source = arguments[i3] != null ? arguments[i3] : {};
    i3 % 2 ? ownKeys2(Object(source), true).forEach(function(key) {
      _defineProperty2(target, key, source[key]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys2(Object(source)).forEach(function(key) {
      Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
    });
  }
  return target;
}
function _defineProperty2(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {value, enumerable: true, configurable: true, writable: true});
  } else {
    obj[key] = value;
  }
  return obj;
}
var isMatching = (path, criteria) => isRegex(criteria) ? !!path.match(criteria) : checkGlob(path, criteria);
var toggleNode = (path, expanded) => (state) => ({
  expanded: _objectSpread2(_objectSpread2({}, state.expanded), {}, {
    [path]: expanded === void 0 ? !state.expanded[path] : !!expanded
  })
});
var expand = (regexOrGlob, isExpanded) => (state, el) => {
  const expanded = {};
  if (regexOrGlob) {
    for (const [node, path, parents] of deepTraverse(el.data)) {
      if (isMatching(path, regexOrGlob)) {
        expanded[path] = isExpanded;
        parents.forEach((p2) => expanded[p2] = isExpanded);
      }
    }
  }
  return {
    expanded
  };
};
var filter = (regexOrGlob) => (state, el) => {
  const filtered = {};
  if (regexOrGlob) {
    for (const [node, path, parents] of deepTraverse(el.data)) {
      if (isMatching(path, regexOrGlob)) {
        filtered[path] = false;
        parents.forEach((p2) => filtered[p2] = false);
      } else {
        filtered[path] = true;
      }
    }
  }
  return {
    filtered
  };
};
var highlight = (path) => () => ({
  highlight: path
});

// docs/static/styles.js
var styles_default = r`
:host{--background-color:#2a2f3a;--color:#f8f8f2;--string-color:#a3eea0;--number-color:#d19a66;--boolean-color:#4ba7ef;--null-color:#df9cf3;--property-color:#6fb3d2;--preview-color:rgba(222,175,143,0.9);--highlight-color:#7b0000;--font-family:monaco,Consolas,'Lucida Console',monospace;--font-size:1rem;--indent-size:1.5em;--indentguide-size:1px;--indentguide-style:solid;--indentguide-color:#333;--indentguide-color-active:#666;--indentguide:var(--indentguide-size) var(--indentguide-style) var(--indentguide-color);--indentguide-active:var(--indentguide-size) var(--indentguide-style) var(--indentguide-color-active);display:block;background-color:var(--background-color);color:var(--color);font-family:var(--font-family);font-size:var(--font-size);}.preview{color:var(--preview-color);}.null{color:var(--null-color);}.key{color:var(--property-color);display:inline-block;}.collapsable:before{display:inline-block;color:var(--color);font-size:0.8em;content:'▶';line-height:1em;width:1em;height:1em;text-align:center;transition:transform 195ms ease-out;transform:rotate(90deg);color:var(--property-color);}.collapsable.collapsableCollapsed:before{transform:rotate(0);}.collapsable{cursor:pointer;user-select:none;}.string{color:var(--string-color);}.number{color:var(--number-color);}.boolean{color:var(--boolean-color);}ul{padding:0;clear:both;}ul,li{list-style:none;position:relative;}li ul > li{position:relative;margin-left:var(--indent-size);padding-left:0px;}ul ul:before{content:'';border-left:var(--indentguide);position:absolute;left:calc(0.5em - var(--indentguide-size));top:0.3em;bottom:0.3em;}ul ul:hover:before{border-left:var(--indentguide-active);}mark{background-color:var(--highlight-color);}`;

// docs/static/JsonViewer.js
var _2 = (t3) => t3;
var _t;
var _t2;
var _t3;
var _t4;
var _t5;
var _t6;
var _t7;
function ownKeys3(object, enumerableOnly) {
  var keys = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    enumerableOnly && (symbols = symbols.filter(function(sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    })), keys.push.apply(keys, symbols);
  }
  return keys;
}
function _objectSpread3(target) {
  for (var i3 = 1; i3 < arguments.length; i3++) {
    var source = arguments[i3] != null ? arguments[i3] : {};
    i3 % 2 ? ownKeys3(Object(source), true).forEach(function(key) {
      _defineProperty3(target, key, source[key]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys3(Object(source)).forEach(function(key) {
      Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
    });
  }
  return target;
}
function _defineProperty3(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {value, enumerable: true, configurable: true, writable: true});
  } else {
    obj[key] = value;
  }
  return obj;
}
function _decorate(decorators, factory, superClass, mixins) {
  var api = _getDecoratorsApi();
  if (mixins) {
    for (var i3 = 0; i3 < mixins.length; i3++) {
      api = mixins[i3](api);
    }
  }
  var r2 = factory(function initialize(O) {
    api.initializeInstanceElements(O, decorated.elements);
  }, superClass);
  var decorated = api.decorateClass(_coalesceClassElements(r2.d.map(_createElementDescriptor)), decorators);
  api.initializeClassElements(r2.F, decorated.elements);
  return api.runClassFinishers(r2.F, decorated.finishers);
}
function _getDecoratorsApi() {
  _getDecoratorsApi = function() {
    return api;
  };
  var api = {elementsDefinitionOrder: [["method"], ["field"]], initializeInstanceElements: function(O, elements) {
    ["method", "field"].forEach(function(kind) {
      elements.forEach(function(element) {
        if (element.kind === kind && element.placement === "own") {
          this.defineClassElement(O, element);
        }
      }, this);
    }, this);
  }, initializeClassElements: function(F, elements) {
    var proto = F.prototype;
    ["method", "field"].forEach(function(kind) {
      elements.forEach(function(element) {
        var placement = element.placement;
        if (element.kind === kind && (placement === "static" || placement === "prototype")) {
          var receiver = placement === "static" ? F : proto;
          this.defineClassElement(receiver, element);
        }
      }, this);
    }, this);
  }, defineClassElement: function(receiver, element) {
    var descriptor = element.descriptor;
    if (element.kind === "field") {
      var initializer = element.initializer;
      descriptor = {enumerable: descriptor.enumerable, writable: descriptor.writable, configurable: descriptor.configurable, value: initializer === void 0 ? void 0 : initializer.call(receiver)};
    }
    Object.defineProperty(receiver, element.key, descriptor);
  }, decorateClass: function(elements, decorators) {
    var newElements = [];
    var finishers = [];
    var placements = {static: [], prototype: [], own: []};
    elements.forEach(function(element) {
      this.addElementPlacement(element, placements);
    }, this);
    elements.forEach(function(element) {
      if (!_hasDecorators(element))
        return newElements.push(element);
      var elementFinishersExtras = this.decorateElement(element, placements);
      newElements.push(elementFinishersExtras.element);
      newElements.push.apply(newElements, elementFinishersExtras.extras);
      finishers.push.apply(finishers, elementFinishersExtras.finishers);
    }, this);
    if (!decorators) {
      return {elements: newElements, finishers};
    }
    var result = this.decorateConstructor(newElements, decorators);
    finishers.push.apply(finishers, result.finishers);
    result.finishers = finishers;
    return result;
  }, addElementPlacement: function(element, placements, silent) {
    var keys = placements[element.placement];
    if (!silent && keys.indexOf(element.key) !== -1) {
      throw new TypeError("Duplicated element (" + element.key + ")");
    }
    keys.push(element.key);
  }, decorateElement: function(element, placements) {
    var extras = [];
    var finishers = [];
    for (var decorators = element.decorators, i3 = decorators.length - 1; i3 >= 0; i3--) {
      var keys = placements[element.placement];
      keys.splice(keys.indexOf(element.key), 1);
      var elementObject = this.fromElementDescriptor(element);
      var elementFinisherExtras = this.toElementFinisherExtras((0, decorators[i3])(elementObject) || elementObject);
      element = elementFinisherExtras.element;
      this.addElementPlacement(element, placements);
      if (elementFinisherExtras.finisher) {
        finishers.push(elementFinisherExtras.finisher);
      }
      var newExtras = elementFinisherExtras.extras;
      if (newExtras) {
        for (var j = 0; j < newExtras.length; j++) {
          this.addElementPlacement(newExtras[j], placements);
        }
        extras.push.apply(extras, newExtras);
      }
    }
    return {element, finishers, extras};
  }, decorateConstructor: function(elements, decorators) {
    var finishers = [];
    for (var i3 = decorators.length - 1; i3 >= 0; i3--) {
      var obj = this.fromClassDescriptor(elements);
      var elementsAndFinisher = this.toClassDescriptor((0, decorators[i3])(obj) || obj);
      if (elementsAndFinisher.finisher !== void 0) {
        finishers.push(elementsAndFinisher.finisher);
      }
      if (elementsAndFinisher.elements !== void 0) {
        elements = elementsAndFinisher.elements;
        for (var j = 0; j < elements.length - 1; j++) {
          for (var k2 = j + 1; k2 < elements.length; k2++) {
            if (elements[j].key === elements[k2].key && elements[j].placement === elements[k2].placement) {
              throw new TypeError("Duplicated element (" + elements[j].key + ")");
            }
          }
        }
      }
    }
    return {elements, finishers};
  }, fromElementDescriptor: function(element) {
    var obj = {kind: element.kind, key: element.key, placement: element.placement, descriptor: element.descriptor};
    var desc = {value: "Descriptor", configurable: true};
    Object.defineProperty(obj, Symbol.toStringTag, desc);
    if (element.kind === "field")
      obj.initializer = element.initializer;
    return obj;
  }, toElementDescriptors: function(elementObjects) {
    if (elementObjects === void 0)
      return;
    return _toArray(elementObjects).map(function(elementObject) {
      var element = this.toElementDescriptor(elementObject);
      this.disallowProperty(elementObject, "finisher", "An element descriptor");
      this.disallowProperty(elementObject, "extras", "An element descriptor");
      return element;
    }, this);
  }, toElementDescriptor: function(elementObject) {
    var kind = String(elementObject.kind);
    if (kind !== "method" && kind !== "field") {
      throw new TypeError(`An element descriptor's .kind property must be either "method" or "field", but a decorator created an element descriptor with .kind "` + kind + '"');
    }
    var key = _toPropertyKey(elementObject.key);
    var placement = String(elementObject.placement);
    if (placement !== "static" && placement !== "prototype" && placement !== "own") {
      throw new TypeError(`An element descriptor's .placement property must be one of "static", "prototype" or "own", but a decorator created an element descriptor with .placement "` + placement + '"');
    }
    var descriptor = elementObject.descriptor;
    this.disallowProperty(elementObject, "elements", "An element descriptor");
    var element = {kind, key, placement, descriptor: Object.assign({}, descriptor)};
    if (kind !== "field") {
      this.disallowProperty(elementObject, "initializer", "A method descriptor");
    } else {
      this.disallowProperty(descriptor, "get", "The property descriptor of a field descriptor");
      this.disallowProperty(descriptor, "set", "The property descriptor of a field descriptor");
      this.disallowProperty(descriptor, "value", "The property descriptor of a field descriptor");
      element.initializer = elementObject.initializer;
    }
    return element;
  }, toElementFinisherExtras: function(elementObject) {
    var element = this.toElementDescriptor(elementObject);
    var finisher = _optionalCallableProperty(elementObject, "finisher");
    var extras = this.toElementDescriptors(elementObject.extras);
    return {element, finisher, extras};
  }, fromClassDescriptor: function(elements) {
    var obj = {kind: "class", elements: elements.map(this.fromElementDescriptor, this)};
    var desc = {value: "Descriptor", configurable: true};
    Object.defineProperty(obj, Symbol.toStringTag, desc);
    return obj;
  }, toClassDescriptor: function(obj) {
    var kind = String(obj.kind);
    if (kind !== "class") {
      throw new TypeError(`A class descriptor's .kind property must be "class", but a decorator created a class descriptor with .kind "` + kind + '"');
    }
    this.disallowProperty(obj, "key", "A class descriptor");
    this.disallowProperty(obj, "placement", "A class descriptor");
    this.disallowProperty(obj, "descriptor", "A class descriptor");
    this.disallowProperty(obj, "initializer", "A class descriptor");
    this.disallowProperty(obj, "extras", "A class descriptor");
    var finisher = _optionalCallableProperty(obj, "finisher");
    var elements = this.toElementDescriptors(obj.elements);
    return {elements, finisher};
  }, runClassFinishers: function(constructor, finishers) {
    for (var i3 = 0; i3 < finishers.length; i3++) {
      var newConstructor = (0, finishers[i3])(constructor);
      if (newConstructor !== void 0) {
        if (typeof newConstructor !== "function") {
          throw new TypeError("Finishers must return a constructor.");
        }
        constructor = newConstructor;
      }
    }
    return constructor;
  }, disallowProperty: function(obj, name, objectType) {
    if (obj[name] !== void 0) {
      throw new TypeError(objectType + " can't have a ." + name + " property.");
    }
  }};
  return api;
}
function _createElementDescriptor(def) {
  var key = _toPropertyKey(def.key);
  var descriptor;
  if (def.kind === "method") {
    descriptor = {value: def.value, writable: true, configurable: true, enumerable: false};
  } else if (def.kind === "get") {
    descriptor = {get: def.value, configurable: true, enumerable: false};
  } else if (def.kind === "set") {
    descriptor = {set: def.value, configurable: true, enumerable: false};
  } else if (def.kind === "field") {
    descriptor = {configurable: true, writable: true, enumerable: true};
  }
  var element = {kind: def.kind === "field" ? "field" : "method", key, placement: def.static ? "static" : def.kind === "field" ? "own" : "prototype", descriptor};
  if (def.decorators)
    element.decorators = def.decorators;
  if (def.kind === "field")
    element.initializer = def.value;
  return element;
}
function _coalesceGetterSetter(element, other) {
  if (element.descriptor.get !== void 0) {
    other.descriptor.get = element.descriptor.get;
  } else {
    other.descriptor.set = element.descriptor.set;
  }
}
function _coalesceClassElements(elements) {
  var newElements = [];
  var isSameElement = function isSameElement2(other2) {
    return other2.kind === "method" && other2.key === element.key && other2.placement === element.placement;
  };
  for (var i3 = 0; i3 < elements.length; i3++) {
    var element = elements[i3];
    var other;
    if (element.kind === "method" && (other = newElements.find(isSameElement))) {
      if (_isDataDescriptor(element.descriptor) || _isDataDescriptor(other.descriptor)) {
        if (_hasDecorators(element) || _hasDecorators(other)) {
          throw new ReferenceError("Duplicated methods (" + element.key + ") can't be decorated.");
        }
        other.descriptor = element.descriptor;
      } else {
        if (_hasDecorators(element)) {
          if (_hasDecorators(other)) {
            throw new ReferenceError("Decorators can't be placed on different accessors with for the same property (" + element.key + ").");
          }
          other.decorators = element.decorators;
        }
        _coalesceGetterSetter(element, other);
      }
    } else {
      newElements.push(element);
    }
  }
  return newElements;
}
function _hasDecorators(element) {
  return element.decorators && element.decorators.length;
}
function _isDataDescriptor(desc) {
  return desc !== void 0 && !(desc.value === void 0 && desc.writable === void 0);
}
function _optionalCallableProperty(obj, name) {
  var value = obj[name];
  if (value !== void 0 && typeof value !== "function") {
    throw new TypeError("Expected '" + name + "' to be a function");
  }
  return value;
}
function _toPropertyKey(arg) {
  var key = _toPrimitive(arg, "string");
  return typeof key === "symbol" ? key : String(key);
}
function _toPrimitive(input, hint) {
  if (typeof input !== "object" || input === null)
    return input;
  var prim = input[Symbol.toPrimitive];
  if (prim !== void 0) {
    var res = prim.call(input, hint || "default");
    if (typeof res !== "object")
      return res;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (hint === "string" ? String : Number)(input);
}
function _toArray(arr) {
  return _arrayWithHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableRest();
}
function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _unsupportedIterableToArray(o2, minLen) {
  if (!o2)
    return;
  if (typeof o2 === "string")
    return _arrayLikeToArray(o2, minLen);
  var n3 = Object.prototype.toString.call(o2).slice(8, -1);
  if (n3 === "Object" && o2.constructor)
    n3 = o2.constructor.name;
  if (n3 === "Map" || n3 === "Set")
    return Array.from(o2);
  if (n3 === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n3))
    return _arrayLikeToArray(o2, minLen);
}
function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length)
    len = arr.length;
  for (var i3 = 0, arr2 = new Array(len); i3 < len; i3++)
    arr2[i3] = arr[i3];
  return arr2;
}
function _iterableToArray(iter) {
  if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null)
    return Array.from(iter);
}
function _arrayWithHoles(arr) {
  if (Array.isArray(arr))
    return arr;
}
function _get() {
  if (typeof Reflect !== "undefined" && Reflect.get) {
    _get = Reflect.get;
  } else {
    _get = function _get2(target, property, receiver) {
      var base = _superPropBase(target, property);
      if (!base)
        return;
      var desc = Object.getOwnPropertyDescriptor(base, property);
      if (desc.get) {
        return desc.get.call(arguments.length < 3 ? target : receiver);
      }
      return desc.value;
    };
  }
  return _get.apply(this, arguments);
}
function _superPropBase(object, property) {
  while (!Object.prototype.hasOwnProperty.call(object, property)) {
    object = _getPrototypeOf(object);
    if (object === null)
      break;
  }
  return object;
}
function _getPrototypeOf(o2) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf2(o3) {
    return o3.__proto__ || Object.getPrototypeOf(o3);
  };
  return _getPrototypeOf(o2);
}
var JsonViewer = _decorate(null, function(_initialize, _LitElement) {
  class JsonViewer2 extends _LitElement {
    constructor(...args) {
      super(...args);
      _initialize(this);
    }
  }
  return {
    F: JsonViewer2,
    d: [{
      kind: "field",
      decorators: [e2({
        converter: JsonObject,
        type: Object
      })],
      key: "data",
      value() {
        return null;
      }
    }, {
      kind: "field",
      decorators: [t2()],
      key: "state",
      value() {
        return {
          expanded: {},
          filtered: {},
          highlight: null
        };
      }
    }, {
      kind: "get",
      static: true,
      key: "styles",
      value: function styles() {
        return [styles_default];
      }
    }, {
      kind: "get",
      static: true,
      key: "is",
      value: function is() {
        return "json-viewer";
      }
    }, {
      kind: "method",
      key: "setState",
      value: async function setState(fn, callback) {
        this.state = _objectSpread3(_objectSpread3({}, this.state), typeof fn === "function" ? fn(this.state, this) : fn);
        this.updateComplete.then(callback);
      }
    }, {
      kind: "method",
      key: "connectedCallback",
      value: function connectedCallback() {
        if (!this.hasAttribute("data")) {
          this.setAttribute("data", this.innerText);
        }
        _get(_getPrototypeOf(JsonViewer2.prototype), "connectedCallback", this).call(this);
      }
    }, {
      kind: "field",
      key: "handlePropertyClick",
      value() {
        return (path) => (e3) => {
          e3.preventDefault();
          this.setState(toggleNode(path));
        };
      }
    }, {
      kind: "method",
      key: "expand",
      value: function expand3(glob, callback) {
        this.setState(expand(glob, true), callback);
      }
    }, {
      kind: "method",
      key: "expandAll",
      value: function expandAll() {
        this.setState(expand("**", true));
      }
    }, {
      kind: "method",
      key: "collapseAll",
      value: function collapseAll() {
        this.setState(expand("**", false));
      }
    }, {
      kind: "method",
      key: "collapse",
      value: function collapse2(glob) {
        this.setState(expand(glob, false));
      }
    }, {
      kind: "method",
      key: "search",
      value: function* search2(criteria) {
        for (const [node, path, parents] of deepTraverse(this.data)) {
          if (isPrimitiveOrNode(node) && String(node).includes(criteria)) {
            this.expand(path, () => {
              const node2 = this.renderRoot.querySelector(`[data-path="${path}"]`);
              node2.scrollIntoView({
                behavior: "smooth",
                inline: "center",
                block: "center"
              });
              node2.focus();
            });
            this.setState(highlight(path));
            yield {
              value: node,
              path
            };
          }
        }
        this.setState(highlight(null));
      }
    }, {
      kind: "method",
      key: "filter",
      value: function filter3(filterString) {
        this.setState(filter(filterString));
      }
    }, {
      kind: "method",
      key: "resetFilter",
      value: function resetFilter() {
        this.setState({
          filtered: {}
        });
      }
    }, {
      kind: "method",
      key: "renderObject",
      value: function renderObject(node, path) {
        return $(_t || (_t = _2`
            <ul>
                ${0}
            </ul>
        `), Object.keys(node).map((key) => {
          const nodeData = node[key];
          const nodePath = path ? `${path}.${key}` : key;
          const isPrimitive2 = isPrimitiveOrNode(nodeData);
          const expanded = this.state.expanded[nodePath] || isPrimitive2;
          return $(_t2 || (_t2 = _2`
                        <li data-path=${0} .hidden=${0}>
                            ${0}
                            ${0}
                        </li>
                    `), nodePath, this.state.filtered[nodePath], this.renderPropertyKey({
            isCollapsable: !isPrimitive2,
            collapsed: !this.state.expanded[nodePath],
            key,
            onClick: this.handlePropertyClick(nodePath)
          }), expanded ? this.renderNode(nodeData, nodePath) : this.renderNodePreview(nodeData));
        }));
      }
    }, {
      kind: "method",
      key: "renderNode",
      value: function renderNode(node, path = "") {
        return isPrimitiveOrNode(node) ? this.renderValue(node, path) : this.renderObject(node, path);
      }
    }, {
      kind: "method",
      key: "renderNodePreview",
      value: function renderNodePreview(node) {
        return $(_t3 || (_t3 = _2` <span class="preview"> ${0} </span> `), generateNodePreview(node));
      }
    }, {
      kind: "method",
      key: "renderPropertyKey",
      value: function renderPropertyKey({
        isCollapsable,
        collapsed,
        onClick,
        key
      }) {
        return $(_t4 || (_t4 = _2`
            <span
                class=${0}
                @click=${0}
            >
                ${0}:
            </span>
        `), classNames(key && "key", isCollapsable && "collapsable", collapsed && "collapsableCollapsed"), isCollapsable ? onClick : null, key);
      }
    }, {
      kind: "method",
      key: "renderValue",
      value: function renderValue(node, path) {
        const highlight2 = this.state.highlight;
        const value = isNode(node) ? node : $(_t5 || (_t5 = _2` <span tabindex="0" class=${0}>${0}</span> `), getType(node), JSON.stringify(node));
        return highlight2 !== null && path === highlight2 ? $(_t6 || (_t6 = _2`<mark>${0}</mark>`), value) : value;
      }
    }, {
      kind: "method",
      key: "render",
      value: function render() {
        return $(_t7 || (_t7 = _2` ${0} `), this.renderNode(this.data));
      }
    }]
  };
}, s$3);

// docs/static/index.js
customElements.define("json-viewer", JsonViewer);

// docs/index.js
import "https://unpkg.com/comlink/dist/umd/comlink.js";
import.meta.env = env_exports;
var worker = Comlink.wrap(new Worker(new URL("worker.js", import.meta.url)));
var json = document.querySelector("#json");
var viewer = document.querySelector("json-viewer");
var toggle = document.querySelector("#toggle-panel");
var container = document.querySelector("#container");
var loader = document.querySelector("#loader");
var expand2 = document.querySelector("#expand");
var collapse = document.querySelector("#collapse");
var filter2 = document.querySelector("#filter");
var search = document.querySelector("#search");
var currentSearch;
expand2.addEventListener("click", (e3) => {
  e3.preventDefault();
  viewer.expandAll();
});
collapse.addEventListener("click", (e3) => {
  e3.preventDefault();
  viewer.collapseAll();
});
filter2.addEventListener("change", () => {
  if (!filter2.value)
    viewer.resetFilter();
  else
    viewer.filter(filter2.value);
});
search.addEventListener("input", () => {
  currentSearch = viewer.search(search.value);
});
search.addEventListener("keyup", (e3) => {
  if (currentSearch && e3.keyCode === 13) {
    currentSearch.next();
  }
});
var debounce = (fn, timeout = 500) => {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn(...args), timeout);
  };
};
var loadJson = (data) => {
  try {
    viewer.data = JSON.parse(data);
  } catch (ex) {
    viewer.data = ex.message;
  }
};
var handleEditorChange = () => {
  const jsonString = editor.getValue();
  loader.hidden = false;
  Promise.all([
    loadJson(jsonString),
    worker.crush(jsonString).then((value) => {
      location.hash = value;
    })
  ]).then(() => {
    loader.hidden = true;
  });
};
var editor = CodeMirror.fromTextArea(json, {
  mode: {name: "javascript", json: true},
  lineNumbers: true,
  theme: "jsv",
  styleActiveLine: true,
  lint: {
    esversion: 6
  }
});
toggle.addEventListener("click", () => {
  container.classList.toggle("collapsed");
});
editor.on("change", debounce(handleEditorChange));
worker.uncrush(location.hash.slice(1)).then((value) => {
  if (value) {
    editor.setValue(value);
    container.classList.add("collapsed");
  } else {
    handleEditorChange();
  }
});
//# sourceMappingURL=index.js.map
