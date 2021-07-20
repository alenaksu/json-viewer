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
var s = class {
  constructor(t2, s2) {
    if (s2 !== e)
      throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t2;
  }
  get styleSheet() {
    return t && this.t === void 0 && (this.t = new CSSStyleSheet(), this.t.replaceSync(this.cssText)), this.t;
  }
  toString() {
    return this.cssText;
  }
};
var n = new Map();
var o = (t2) => {
  let o2 = n.get(t2);
  return o2 === void 0 && n.set(t2, o2 = new s(t2, e)), o2;
};
var r = (t2) => o(typeof t2 == "string" ? t2 : t2 + "");
var i = (t2, ...e3) => {
  const n3 = t2.length === 1 ? t2[0] : e3.reduce((e4, n4, o2) => e4 + ((t3) => {
    if (t3 instanceof s)
      return t3.cssText;
    if (typeof t3 == "number")
      return t3;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + t3 + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(n4) + t2[o2 + 1], t2[0]);
  return o(n3);
};
var S = (e3, s2) => {
  t ? e3.adoptedStyleSheets = s2.map((t2) => t2 instanceof CSSStyleSheet ? t2 : t2.styleSheet) : s2.forEach((t2) => {
    const s3 = document.createElement("style");
    s3.textContent = t2.cssText, e3.appendChild(s3);
  });
};
var u = t ? (t2) => t2 : (t2) => t2 instanceof CSSStyleSheet ? ((t3) => {
  let e3 = "";
  for (const s2 of t3.cssRules)
    e3 += s2.cssText;
  return r(e3);
})(t2) : t2;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var s$1;
var e$1;
var h;
var r$1;
var o$1 = {
  toAttribute(t2, i3) {
    switch (i3) {
      case Boolean:
        t2 = t2 ? "" : null;
        break;
      case Object:
      case Array:
        t2 = t2 == null ? t2 : JSON.stringify(t2);
    }
    return t2;
  },
  fromAttribute(t2, i3) {
    let s2 = t2;
    switch (i3) {
      case Boolean:
        s2 = t2 !== null;
        break;
      case Number:
        s2 = t2 === null ? null : Number(t2);
        break;
      case Object:
      case Array:
        try {
          s2 = JSON.parse(t2);
        } catch (t3) {
          s2 = null;
        }
    }
    return s2;
  }
};
var n$1 = (t2, i3) => i3 !== t2 && (i3 == i3 || t2 == t2);
var l = {
  attribute: true,
  type: String,
  converter: o$1,
  reflect: false,
  hasChanged: n$1
};
var a = class extends HTMLElement {
  constructor() {
    super(), this.Πi = new Map(), this.Πo = void 0, this.Πl = void 0, this.isUpdatePending = false, this.hasUpdated = false, this.Πh = null, this.u();
  }
  static addInitializer(t2) {
    var i3;
    (i3 = this.v) !== null && i3 !== void 0 || (this.v = []), this.v.push(t2);
  }
  static get observedAttributes() {
    this.finalize();
    const t2 = [];
    return this.elementProperties.forEach((i3, s2) => {
      const e3 = this.Πp(s2, i3);
      e3 !== void 0 && (this.Πm.set(e3, s2), t2.push(e3));
    }), t2;
  }
  static createProperty(t2, i3 = l) {
    if (i3.state && (i3.attribute = false), this.finalize(), this.elementProperties.set(t2, i3), !i3.noAccessor && !this.prototype.hasOwnProperty(t2)) {
      const s2 = typeof t2 == "symbol" ? Symbol() : "__" + t2, e3 = this.getPropertyDescriptor(t2, s2, i3);
      e3 !== void 0 && Object.defineProperty(this.prototype, t2, e3);
    }
  }
  static getPropertyDescriptor(t2, i3, s2) {
    return {
      get() {
        return this[i3];
      },
      set(e3) {
        const h2 = this[t2];
        this[i3] = e3, this.requestUpdate(t2, h2, s2);
      },
      configurable: true,
      enumerable: true
    };
  }
  static getPropertyOptions(t2) {
    return this.elementProperties.get(t2) || l;
  }
  static finalize() {
    if (this.hasOwnProperty("finalized"))
      return false;
    this.finalized = true;
    const t2 = Object.getPrototypeOf(this);
    if (t2.finalize(), this.elementProperties = new Map(t2.elementProperties), this.Πm = new Map(), this.hasOwnProperty("properties")) {
      const t3 = this.properties, i3 = [...Object.getOwnPropertyNames(t3), ...Object.getOwnPropertySymbols(t3)];
      for (const s2 of i3)
        this.createProperty(s2, t3[s2]);
    }
    return this.elementStyles = this.finalizeStyles(this.styles), true;
  }
  static finalizeStyles(i3) {
    const s2 = [];
    if (Array.isArray(i3)) {
      const e3 = new Set(i3.flat(1 / 0).reverse());
      for (const i4 of e3)
        s2.unshift(u(i4));
    } else
      i3 !== void 0 && s2.push(u(i3));
    return s2;
  }
  static Πp(t2, i3) {
    const s2 = i3.attribute;
    return s2 === false ? void 0 : typeof s2 == "string" ? s2 : typeof t2 == "string" ? t2.toLowerCase() : void 0;
  }
  u() {
    var t2;
    this.Πg = new Promise((t3) => this.enableUpdating = t3), this.L = new Map(), this.Π_(), this.requestUpdate(), (t2 = this.constructor.v) === null || t2 === void 0 || t2.forEach((t3) => t3(this));
  }
  addController(t2) {
    var i3, s2;
    ((i3 = this.ΠU) !== null && i3 !== void 0 ? i3 : this.ΠU = []).push(t2), this.renderRoot !== void 0 && this.isConnected && ((s2 = t2.hostConnected) === null || s2 === void 0 || s2.call(t2));
  }
  removeController(t2) {
    var i3;
    (i3 = this.ΠU) === null || i3 === void 0 || i3.splice(this.ΠU.indexOf(t2) >>> 0, 1);
  }
  Π_() {
    this.constructor.elementProperties.forEach((t2, i3) => {
      this.hasOwnProperty(i3) && (this.Πi.set(i3, this[i3]), delete this[i3]);
    });
  }
  createRenderRoot() {
    var t2;
    const s2 = (t2 = this.shadowRoot) !== null && t2 !== void 0 ? t2 : this.attachShadow(this.constructor.shadowRootOptions);
    return S(s2, this.constructor.elementStyles), s2;
  }
  connectedCallback() {
    var t2;
    this.renderRoot === void 0 && (this.renderRoot = this.createRenderRoot()), this.enableUpdating(true), (t2 = this.ΠU) === null || t2 === void 0 || t2.forEach((t3) => {
      var i3;
      return (i3 = t3.hostConnected) === null || i3 === void 0 ? void 0 : i3.call(t3);
    }), this.Πl && (this.Πl(), this.Πo = this.Πl = void 0);
  }
  enableUpdating(t2) {
  }
  disconnectedCallback() {
    var t2;
    (t2 = this.ΠU) === null || t2 === void 0 || t2.forEach((t3) => {
      var i3;
      return (i3 = t3.hostDisconnected) === null || i3 === void 0 ? void 0 : i3.call(t3);
    }), this.Πo = new Promise((t3) => this.Πl = t3);
  }
  attributeChangedCallback(t2, i3, s2) {
    this.K(t2, s2);
  }
  Πj(t2, i3, s2 = l) {
    var e3, h2;
    const r2 = this.constructor.Πp(t2, s2);
    if (r2 !== void 0 && s2.reflect === true) {
      const n3 = ((h2 = (e3 = s2.converter) === null || e3 === void 0 ? void 0 : e3.toAttribute) !== null && h2 !== void 0 ? h2 : o$1.toAttribute)(i3, s2.type);
      this.Πh = t2, n3 == null ? this.removeAttribute(r2) : this.setAttribute(r2, n3), this.Πh = null;
    }
  }
  K(t2, i3) {
    var s2, e3, h2;
    const r2 = this.constructor, n3 = r2.Πm.get(t2);
    if (n3 !== void 0 && this.Πh !== n3) {
      const t3 = r2.getPropertyOptions(n3), l2 = t3.converter, a2 = (h2 = (e3 = (s2 = l2) === null || s2 === void 0 ? void 0 : s2.fromAttribute) !== null && e3 !== void 0 ? e3 : typeof l2 == "function" ? l2 : null) !== null && h2 !== void 0 ? h2 : o$1.fromAttribute;
      this.Πh = n3, this[n3] = a2(i3, t3.type), this.Πh = null;
    }
  }
  requestUpdate(t2, i3, s2) {
    let e3 = true;
    t2 !== void 0 && (((s2 = s2 || this.constructor.getPropertyOptions(t2)).hasChanged || n$1)(this[t2], i3) ? (this.L.has(t2) || this.L.set(t2, i3), s2.reflect === true && this.Πh !== t2 && (this.Πk === void 0 && (this.Πk = new Map()), this.Πk.set(t2, s2))) : e3 = false), !this.isUpdatePending && e3 && (this.Πg = this.Πq());
  }
  async Πq() {
    this.isUpdatePending = true;
    try {
      for (await this.Πg; this.Πo; )
        await this.Πo;
    } catch (t3) {
      Promise.reject(t3);
    }
    const t2 = this.performUpdate();
    return t2 != null && await t2, !this.isUpdatePending;
  }
  performUpdate() {
    var t2;
    if (!this.isUpdatePending)
      return;
    this.hasUpdated, this.Πi && (this.Πi.forEach((t3, i4) => this[i4] = t3), this.Πi = void 0);
    let i3 = false;
    const s2 = this.L;
    try {
      i3 = this.shouldUpdate(s2), i3 ? (this.willUpdate(s2), (t2 = this.ΠU) === null || t2 === void 0 || t2.forEach((t3) => {
        var i4;
        return (i4 = t3.hostUpdate) === null || i4 === void 0 ? void 0 : i4.call(t3);
      }), this.update(s2)) : this.Π$();
    } catch (t3) {
      throw i3 = false, this.Π$(), t3;
    }
    i3 && this.E(s2);
  }
  willUpdate(t2) {
  }
  E(t2) {
    var i3;
    (i3 = this.ΠU) === null || i3 === void 0 || i3.forEach((t3) => {
      var i4;
      return (i4 = t3.hostUpdated) === null || i4 === void 0 ? void 0 : i4.call(t3);
    }), this.hasUpdated || (this.hasUpdated = true, this.firstUpdated(t2)), this.updated(t2);
  }
  Π$() {
    this.L = new Map(), this.isUpdatePending = false;
  }
  get updateComplete() {
    return this.getUpdateComplete();
  }
  getUpdateComplete() {
    return this.Πg;
  }
  shouldUpdate(t2) {
    return true;
  }
  update(t2) {
    this.Πk !== void 0 && (this.Πk.forEach((t3, i3) => this.Πj(i3, this[i3], t3)), this.Πk = void 0), this.Π$();
  }
  updated(t2) {
  }
  firstUpdated(t2) {
  }
};
a.finalized = true, a.elementProperties = new Map(), a.elementStyles = [], a.shadowRootOptions = {
  mode: "open"
}, (e$1 = (s$1 = globalThis).reactiveElementPlatformSupport) === null || e$1 === void 0 || e$1.call(s$1, {
  ReactiveElement: a
}), ((h = (r$1 = globalThis).reactiveElementVersions) !== null && h !== void 0 ? h : r$1.reactiveElementVersions = []).push("1.0.0-rc.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var t$1;
var i$1;
var s$2;
var e$2;
var o$2 = globalThis.trustedTypes;
var l$1 = o$2 ? o$2.createPolicy("lit-html", {
  createHTML: (t2) => t2
}) : void 0;
var n$2 = `lit$${(Math.random() + "").slice(9)}$`;
var h$1 = "?" + n$2;
var r$2 = `<${h$1}>`;
var u$1 = document;
var c = (t2 = "") => u$1.createComment(t2);
var d = (t2) => t2 === null || typeof t2 != "object" && typeof t2 != "function";
var v = Array.isArray;
var a$1 = (t2) => {
  var i3;
  return v(t2) || typeof ((i3 = t2) === null || i3 === void 0 ? void 0 : i3[Symbol.iterator]) == "function";
};
var f = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g;
var _ = /-->/g;
var m = />/g;
var p = />|[ 	\n\r](?:([^\s"'>=/]+)([ 	\n\r]*=[ 	\n\r]*(?:[^ 	\n\r"'`<>=]|("|')|))|$)/g;
var $ = /'/g;
var g = /"/g;
var y = /^(?:script|style|textarea)$/i;
var b = (t2) => (i3, ...s2) => ({
  _$litType$: t2,
  strings: i3,
  values: s2
});
var T = b(1);
var w = Symbol.for("lit-noChange");
var A = Symbol.for("lit-nothing");
var P = new WeakMap();
var V = (t2, i3, s2) => {
  var e3, o2;
  const l2 = (e3 = s2 == null ? void 0 : s2.renderBefore) !== null && e3 !== void 0 ? e3 : i3;
  let n3 = l2._$litPart$;
  if (n3 === void 0) {
    const t3 = (o2 = s2 == null ? void 0 : s2.renderBefore) !== null && o2 !== void 0 ? o2 : null;
    l2._$litPart$ = n3 = new C(i3.insertBefore(c(), t3), t3, void 0, s2);
  }
  return n3.I(t2), n3;
};
var E = u$1.createTreeWalker(u$1, 129, null, false);
var M = (t2, i3) => {
  const s2 = t2.length - 1, e3 = [];
  let o2, h2 = i3 === 2 ? "<svg>" : "", u2 = f;
  for (let i4 = 0; i4 < s2; i4++) {
    const s3 = t2[i4];
    let l2, c3, d2 = -1, v2 = 0;
    for (; v2 < s3.length && (u2.lastIndex = v2, c3 = u2.exec(s3), c3 !== null); )
      v2 = u2.lastIndex, u2 === f ? c3[1] === "!--" ? u2 = _ : c3[1] !== void 0 ? u2 = m : c3[2] !== void 0 ? (y.test(c3[2]) && (o2 = RegExp("</" + c3[2], "g")), u2 = p) : c3[3] !== void 0 && (u2 = p) : u2 === p ? c3[0] === ">" ? (u2 = o2 != null ? o2 : f, d2 = -1) : c3[1] === void 0 ? d2 = -2 : (d2 = u2.lastIndex - c3[2].length, l2 = c3[1], u2 = c3[3] === void 0 ? p : c3[3] === '"' ? g : $) : u2 === g || u2 === $ ? u2 = p : u2 === _ || u2 === m ? u2 = f : (u2 = p, o2 = void 0);
    const a2 = u2 === p && t2[i4 + 1].startsWith("/>") ? " " : "";
    h2 += u2 === f ? s3 + r$2 : d2 >= 0 ? (e3.push(l2), s3.slice(0, d2) + "$lit$" + s3.slice(d2) + n$2 + a2) : s3 + n$2 + (d2 === -2 ? (e3.push(void 0), i4) : a2);
  }
  const c2 = h2 + (t2[s2] || "<?>") + (i3 === 2 ? "</svg>" : "");
  return [l$1 !== void 0 ? l$1.createHTML(c2) : c2, e3];
};
var N = class {
  constructor({
    strings: t2,
    _$litType$: i3
  }, s2) {
    let e3;
    this.parts = [];
    let l2 = 0, r2 = 0;
    const u2 = t2.length - 1, d2 = this.parts, [v2, a2] = M(t2, i3);
    if (this.el = N.createElement(v2, s2), E.currentNode = this.el.content, i3 === 2) {
      const t3 = this.el.content, i4 = t3.firstChild;
      i4.remove(), t3.append(...i4.childNodes);
    }
    for (; (e3 = E.nextNode()) !== null && d2.length < u2; ) {
      if (e3.nodeType === 1) {
        if (e3.hasAttributes()) {
          const t3 = [];
          for (const i4 of e3.getAttributeNames())
            if (i4.endsWith("$lit$") || i4.startsWith(n$2)) {
              const s3 = a2[r2++];
              if (t3.push(i4), s3 !== void 0) {
                const t4 = e3.getAttribute(s3.toLowerCase() + "$lit$").split(n$2), i5 = /([.?@])?(.*)/.exec(s3);
                d2.push({
                  type: 1,
                  index: l2,
                  name: i5[2],
                  strings: t4,
                  ctor: i5[1] === "." ? I : i5[1] === "?" ? L : i5[1] === "@" ? R : H
                });
              } else
                d2.push({
                  type: 6,
                  index: l2
                });
            }
          for (const i4 of t3)
            e3.removeAttribute(i4);
        }
        if (y.test(e3.tagName)) {
          const t3 = e3.textContent.split(n$2), i4 = t3.length - 1;
          if (i4 > 0) {
            e3.textContent = o$2 ? o$2.emptyScript : "";
            for (let s3 = 0; s3 < i4; s3++)
              e3.append(t3[s3], c()), E.nextNode(), d2.push({
                type: 2,
                index: ++l2
              });
            e3.append(t3[i4], c());
          }
        }
      } else if (e3.nodeType === 8)
        if (e3.data === h$1)
          d2.push({
            type: 2,
            index: l2
          });
        else {
          let t3 = -1;
          for (; (t3 = e3.data.indexOf(n$2, t3 + 1)) !== -1; )
            d2.push({
              type: 7,
              index: l2
            }), t3 += n$2.length - 1;
        }
      l2++;
    }
  }
  static createElement(t2, i3) {
    const s2 = u$1.createElement("template");
    return s2.innerHTML = t2, s2;
  }
};
function S$1(t2, i3, s2 = t2, e3) {
  var o2, l2, n3, h2;
  if (i3 === w)
    return i3;
  let r2 = e3 !== void 0 ? (o2 = s2.Σi) === null || o2 === void 0 ? void 0 : o2[e3] : s2.Σo;
  const u2 = d(i3) ? void 0 : i3._$litDirective$;
  return (r2 == null ? void 0 : r2.constructor) !== u2 && ((l2 = r2 == null ? void 0 : r2.O) === null || l2 === void 0 || l2.call(r2, false), u2 === void 0 ? r2 = void 0 : (r2 = new u2(t2), r2.T(t2, s2, e3)), e3 !== void 0 ? ((n3 = (h2 = s2).Σi) !== null && n3 !== void 0 ? n3 : h2.Σi = [])[e3] = r2 : s2.Σo = r2), r2 !== void 0 && (i3 = S$1(t2, r2.S(t2, i3.values), r2, e3)), i3;
}
var k = class {
  constructor(t2, i3) {
    this.l = [], this.N = void 0, this.D = t2, this.M = i3;
  }
  u(t2) {
    var i3;
    const {
      el: {
        content: s2
      },
      parts: e3
    } = this.D, o2 = ((i3 = t2 == null ? void 0 : t2.creationScope) !== null && i3 !== void 0 ? i3 : u$1).importNode(s2, true);
    E.currentNode = o2;
    let l2 = E.nextNode(), n3 = 0, h2 = 0, r2 = e3[0];
    for (; r2 !== void 0; ) {
      if (n3 === r2.index) {
        let i4;
        r2.type === 2 ? i4 = new C(l2, l2.nextSibling, this, t2) : r2.type === 1 ? i4 = new r2.ctor(l2, r2.name, r2.strings, this, t2) : r2.type === 6 && (i4 = new z(l2, this, t2)), this.l.push(i4), r2 = e3[++h2];
      }
      n3 !== (r2 == null ? void 0 : r2.index) && (l2 = E.nextNode(), n3++);
    }
    return o2;
  }
  v(t2) {
    let i3 = 0;
    for (const s2 of this.l)
      s2 !== void 0 && (s2.strings !== void 0 ? (s2.I(t2, s2, i3), i3 += s2.strings.length - 2) : s2.I(t2[i3])), i3++;
  }
};
var C = class {
  constructor(t2, i3, s2, e3) {
    this.type = 2, this.N = void 0, this.A = t2, this.B = i3, this.M = s2, this.options = e3;
  }
  setConnected(t2) {
    var i3;
    (i3 = this.P) === null || i3 === void 0 || i3.call(this, t2);
  }
  get parentNode() {
    return this.A.parentNode;
  }
  get startNode() {
    return this.A;
  }
  get endNode() {
    return this.B;
  }
  I(t2, i3 = this) {
    t2 = S$1(this, t2, i3), d(t2) ? t2 === A || t2 == null || t2 === "" ? (this.H !== A && this.R(), this.H = A) : t2 !== this.H && t2 !== w && this.m(t2) : t2._$litType$ !== void 0 ? this._(t2) : t2.nodeType !== void 0 ? this.$(t2) : a$1(t2) ? this.g(t2) : this.m(t2);
  }
  k(t2, i3 = this.B) {
    return this.A.parentNode.insertBefore(t2, i3);
  }
  $(t2) {
    this.H !== t2 && (this.R(), this.H = this.k(t2));
  }
  m(t2) {
    const i3 = this.A.nextSibling;
    i3 !== null && i3.nodeType === 3 && (this.B === null ? i3.nextSibling === null : i3 === this.B.previousSibling) ? i3.data = t2 : this.$(u$1.createTextNode(t2)), this.H = t2;
  }
  _(t2) {
    var i3;
    const {
      values: s2,
      _$litType$: e3
    } = t2, o2 = typeof e3 == "number" ? this.C(t2) : (e3.el === void 0 && (e3.el = N.createElement(e3.h, this.options)), e3);
    if (((i3 = this.H) === null || i3 === void 0 ? void 0 : i3.D) === o2)
      this.H.v(s2);
    else {
      const t3 = new k(o2, this), i4 = t3.u(this.options);
      t3.v(s2), this.$(i4), this.H = t3;
    }
  }
  C(t2) {
    let i3 = P.get(t2.strings);
    return i3 === void 0 && P.set(t2.strings, i3 = new N(t2)), i3;
  }
  g(t2) {
    v(this.H) || (this.H = [], this.R());
    const i3 = this.H;
    let s2, e3 = 0;
    for (const o2 of t2)
      e3 === i3.length ? i3.push(s2 = new C(this.k(c()), this.k(c()), this, this.options)) : s2 = i3[e3], s2.I(o2), e3++;
    e3 < i3.length && (this.R(s2 && s2.B.nextSibling, e3), i3.length = e3);
  }
  R(t2 = this.A.nextSibling, i3) {
    var s2;
    for ((s2 = this.P) === null || s2 === void 0 || s2.call(this, false, true, i3); t2 && t2 !== this.B; ) {
      const i4 = t2.nextSibling;
      t2.remove(), t2 = i4;
    }
  }
};
var H = class {
  constructor(t2, i3, s2, e3, o2) {
    this.type = 1, this.H = A, this.N = void 0, this.V = void 0, this.element = t2, this.name = i3, this.M = e3, this.options = o2, s2.length > 2 || s2[0] !== "" || s2[1] !== "" ? (this.H = Array(s2.length - 1).fill(A), this.strings = s2) : this.H = A;
  }
  get tagName() {
    return this.element.tagName;
  }
  I(t2, i3 = this, s2, e3) {
    const o2 = this.strings;
    let l2 = false;
    if (o2 === void 0)
      t2 = S$1(this, t2, i3, 0), l2 = !d(t2) || t2 !== this.H && t2 !== w, l2 && (this.H = t2);
    else {
      const e4 = t2;
      let n3, h2;
      for (t2 = o2[0], n3 = 0; n3 < o2.length - 1; n3++)
        h2 = S$1(this, e4[s2 + n3], i3, n3), h2 === w && (h2 = this.H[n3]), l2 || (l2 = !d(h2) || h2 !== this.H[n3]), h2 === A ? t2 = A : t2 !== A && (t2 += (h2 != null ? h2 : "") + o2[n3 + 1]), this.H[n3] = h2;
    }
    l2 && !e3 && this.W(t2);
  }
  W(t2) {
    t2 === A ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t2 != null ? t2 : "");
  }
};
var I = class extends H {
  constructor() {
    super(...arguments), this.type = 3;
  }
  W(t2) {
    this.element[this.name] = t2 === A ? void 0 : t2;
  }
};
var L = class extends H {
  constructor() {
    super(...arguments), this.type = 4;
  }
  W(t2) {
    t2 && t2 !== A ? this.element.setAttribute(this.name, "") : this.element.removeAttribute(this.name);
  }
};
var R = class extends H {
  constructor() {
    super(...arguments), this.type = 5;
  }
  I(t2, i3 = this) {
    var s2;
    if ((t2 = (s2 = S$1(this, t2, i3, 0)) !== null && s2 !== void 0 ? s2 : A) === w)
      return;
    const e3 = this.H, o2 = t2 === A && e3 !== A || t2.capture !== e3.capture || t2.once !== e3.once || t2.passive !== e3.passive, l2 = t2 !== A && (e3 === A || o2);
    o2 && this.element.removeEventListener(this.name, this, e3), l2 && this.element.addEventListener(this.name, this, t2), this.H = t2;
  }
  handleEvent(t2) {
    var i3, s2;
    typeof this.H == "function" ? this.H.call((s2 = (i3 = this.options) === null || i3 === void 0 ? void 0 : i3.host) !== null && s2 !== void 0 ? s2 : this.element, t2) : this.H.handleEvent(t2);
  }
};
var z = class {
  constructor(t2, i3, s2) {
    this.element = t2, this.type = 6, this.N = void 0, this.V = void 0, this.M = i3, this.options = s2;
  }
  I(t2) {
    S$1(this, t2);
  }
};
(i$1 = (t$1 = globalThis).litHtmlPlatformSupport) === null || i$1 === void 0 || i$1.call(t$1, N, C), ((s$2 = (e$2 = globalThis).litHtmlVersions) !== null && s$2 !== void 0 ? s$2 : e$2.litHtmlVersions = []).push("2.0.0-rc.3");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var i$2;
var l$2;
var o$3;
var s$3;
var n$3;
var a$2;
((i$2 = (a$2 = globalThis).litElementVersions) !== null && i$2 !== void 0 ? i$2 : a$2.litElementVersions = []).push("3.0.0-rc.2");
var h$2 = class extends a {
  constructor() {
    super(...arguments), this.renderOptions = {
      host: this
    }, this.Φt = void 0;
  }
  createRenderRoot() {
    var t2, e3;
    const r2 = super.createRenderRoot();
    return (t2 = (e3 = this.renderOptions).renderBefore) !== null && t2 !== void 0 || (e3.renderBefore = r2.firstChild), r2;
  }
  update(t2) {
    const r2 = this.render();
    super.update(t2), this.Φt = V(r2, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    var t2;
    super.connectedCallback(), (t2 = this.Φt) === null || t2 === void 0 || t2.setConnected(true);
  }
  disconnectedCallback() {
    var t2;
    super.disconnectedCallback(), (t2 = this.Φt) === null || t2 === void 0 || t2.setConnected(false);
  }
  render() {
    return w;
  }
};
h$2.finalized = true, h$2._$litElement$ = true, (o$3 = (l$2 = globalThis).litElementHydrateSupport) === null || o$3 === void 0 || o$3.call(l$2, {
  LitElement: h$2
}), (n$3 = (s$3 = globalThis).litElementPlatformSupport) === null || n$3 === void 0 || n$3.call(s$3, {
  LitElement: h$2
});

// docs/_snowpack/pkg/lit/decorators.js
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var n2 = (n3) => (e3) => typeof e3 == "function" ? ((n4, e4) => (window.customElements.define(n4, e4), e4))(n3, e3) : ((n4, e4) => {
  const {
    kind: t2,
    elements: i3
  } = e4;
  return {
    kind: t2,
    elements: i3,
    finisher(e5) {
      window.customElements.define(n4, e5);
    }
  };
})(n3, e3);
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
  return (n3, t2) => t2 !== void 0 ? ((i3, e4, n4) => {
    e4.constructor.createProperty(n4, i3);
  })(e3, n3, t2) : i2(e3, n3);
}

// docs/static/utils.js
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
  } = {
    nodeCount: 3,
    maxLength: 15,
    ...options
  };
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
      nodePreview.push("{ ... }");
    else if (nodeType === TYPE_ARRAY)
      nodePreview.push("[ ... ]");
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
var isMatching = (path, criteria) => isRegex(criteria) ? !!path.match(criteria) : checkGlob(path, criteria);
var toggleNode = (path, expanded) => (state) => ({
  expanded: {
    ...state.expanded,
    [path]: expanded === void 0 ? !state.expanded[path] : !!expanded
  }
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
var styles_default = i`:host {
    --background-color: #2a2f3a;
    --color: #f8f8f2;
    --string-color: #a3eea0;
    --number-color: #d19a66;
    --boolean-color: #4ba7ef;
    --null-color: #df9cf3;
    --property-color: #6fb3d2;
    --font-family: monaco, Consolas, 'Lucida Console', monospace;
    --preview-color: rgba(222, 175, 143, 0.9);
    --highlight-color: #7b0000;

    display: block;
    background-color: var(--background-color);
    color: var(--color);
    padding: 0.5rem;
    font-family: var(--font-family);
    font-size: 1rem;
}

.preview {
    color: var(--preview-color);
}

.null {
    color: var(--null-color, #df9cf3);
}

.key {
    color: var(--property-color, #f9857b);
    display: inline-block;
}

.collapsable:before {
    display: inline-block;
    color: var(--color);
    padding-right: 5px;
    padding-left: 5px;
    font-size: 0.7rem;
    content: '▶';
    transition: transform 195ms ease-in;
    transform: rotate(90deg);
    color: var(--property-color);
}

.collapsable.collapsableCollapsed:before {
    transform: rotate(0);
}

.collapsable {
    cursor: pointer;
    user-select: none;
}

.string {
    color: var(--string-color);
}

.number {
    color: var(--number-color);
}

.boolean {
    color: var(--boolean-color);
}

ul {
    padding: 0;
    clear: both;
}

ul,
li {
    list-style: none;
    position: relative;
}

li ul > li {
    position: relative;
    margin-left: 1.5rem;
    padding-left: 0px;
}

ul ul:before {
    content: '';
    border-left: 1px solid #333;
    position: absolute;
    left: 0.5rem;
    top: 0.5rem;
    bottom: 0.5rem;
}

ul ul:hover:before {
    border-left: 1px solid #666;
}

mark {
    background-color: var(--highlight-color);
}
`;

// docs/static/index.js
var _2 = (t2) => t2;
var _t;
var _t2;
var _t3;
var _t4;
var _t5;
var _t6;
var _t7;
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
var JsonViewer = _decorate([n2("json-viewer")], function(_initialize, _LitElement) {
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
      decorators: [e2({
        state: true
      })],
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
        this.state = {
          ...this.state,
          ...typeof fn === "function" ? fn(this.state, this) : fn
        };
        this.updateComplete.then(callback);
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
        return T(_t || (_t = _2`
            <ul>
                ${0}
            </ul>
        `), Object.keys(node).map((key) => {
          const nodeData = node[key];
          const nodePath = path ? `${path}.${key}` : key;
          const isPrimitive2 = isPrimitiveOrNode(nodeData);
          const expanded = this.state.expanded[nodePath] || isPrimitive2;
          return T(_t2 || (_t2 = _2`
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
        return T(_t3 || (_t3 = _2` <span class="preview"> ${0} </span> `), generateNodePreview(node));
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
        return T(_t4 || (_t4 = _2`
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
        const value = isNode(node) ? node : T(_t5 || (_t5 = _2` <span tabindex="0" class=${0}>${0}</span> `), getType(node), JSON.stringify(node));
        return highlight2 !== null && path === highlight2 ? T(_t6 || (_t6 = _2`<mark>${0}</mark>`), value) : value;
      }
    }, {
      kind: "method",
      key: "render",
      value: function render() {
        return T(_t7 || (_t7 = _2` ${0} `), this.renderNode(this.data));
      }
    }]
  };
}, h$2);

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
