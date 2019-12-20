parcelRequire = (function(e, r, t, n) {
    var i,
        o = 'function' == typeof parcelRequire && parcelRequire,
        u = 'function' == typeof require && require;
    function f(t, n) {
        if (!r[t]) {
            if (!e[t]) {
                var i = 'function' == typeof parcelRequire && parcelRequire;
                if (!n && i) return i(t, !0);
                if (o) return o(t, !0);
                if (u && 'string' == typeof t) return u(t);
                var c = new Error("Cannot find module '" + t + "'");
                throw ((c.code = 'MODULE_NOT_FOUND'), c);
            }
            (p.resolve = function(r) {
                return e[t][1][r] || r;
            }),
                (p.cache = {});
            var l = (r[t] = new f.Module(t));
            e[t][0].call(l.exports, p, l, l.exports, this);
        }
        return r[t].exports;
        function p(e) {
            return f(p.resolve(e));
        }
    }
    (f.isParcelRequire = !0),
        (f.Module = function(e) {
            (this.id = e), (this.bundle = f), (this.exports = {});
        }),
        (f.modules = e),
        (f.cache = r),
        (f.parent = o),
        (f.register = function(r, t) {
            e[r] = [
                function(e, r) {
                    r.exports = t;
                },
                {}
            ];
        });
    for (var c = 0; c < t.length; c++)
        try {
            f(t[c]);
        } catch (e) {
            i || (i = e);
        }
    if (t.length) {
        var l = f(t[t.length - 1]);
        'object' == typeof exports && 'undefined' != typeof module
            ? (module.exports = l)
            : 'function' == typeof define && define.amd
            ? define(function() {
                  return l;
              })
            : n && (this[n] = l);
    }
    if (((parcelRequire = f), i)) throw i;
    return f;
})(
    {
        EUVP: [
            function(require, module, exports) {
                'use strict';
                function t(t) {
                    if (!t.__attrsMap) {
                        const e = t.properties,
                            r = Object.create(null);
                        if (e)
                            for (const s in e)
                                (r[s.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase()] = s),
                                    Object.defineProperty(t.prototype, s, {
                                        get() {
                                            return this.__props[s];
                                        },
                                        set(t) {
                                            const e = this.__props[s];
                                            (this.__props[s] = t), this.rendered && e !== t && this.update();
                                        }
                                    });
                        (t.__attrsMap = r), (t.__observedProps = Object.keys(r));
                    }
                    return t.__observedProps;
                }
                function e(e) {
                    return class extends e {
                        constructor() {
                            super(...arguments), (this.__props = Object.create(null));
                        }
                        static get observedAttributes() {
                            return t(this);
                        }
                        attributeChangedCallback(t, e, r) {
                            const { __attrsMap: s, properties: o } = this.constructor;
                            this[s[t]] = o[t](r);
                        }
                    };
                }
                Object.defineProperty(exports, '__esModule', { value: !0 }), (exports.withProps = e);
            },
            {}
        ],
        MrFm: [
            function(require, module, exports) {
                'use strict';
                function e(e = '') {
                    return document.createComment(e);
                }
                function t(e = '') {
                    return document.createTextNode(e);
                }
                function n(e) {
                    return !!e && !!e.nodeType;
                }
                function o(e, t) {
                    const [n, o] = [].concat(t);
                    n.parentNode && (o && n.nextSibling !== o && r(n.nextSibling, o), n.parentNode.replaceChild(e, n));
                }
                function r(e, t = null, n = e.parentNode) {
                    if (n)
                        for (; e !== t; ) {
                            const t = e.nextSibling;
                            n.removeChild(e), (e = t);
                        }
                }
                function s(e, t, n = t.parentNode) {
                    const [o, r] = e.range,
                        s = t.nextSibling;
                    let i = o;
                    do {
                        const e = i.nextSibling;
                        n.insertBefore(i, s), (i = e);
                    } while (i !== r);
                    n.insertBefore(r, s);
                }
                function i(e) {
                    let t = 0;
                    for (; (e = e.previousSibling); ) t++;
                    return t;
                }
                function p(e) {
                    const t = [];
                    for (; e.parentNode; ) t.unshift(i(e)), (e = e.parentNode);
                    return t;
                }
                function c(e, t) {
                    for (let n = 0, o = t.length; n < o; n++) e = e.childNodes[t[n]];
                    return e;
                }
                Object.defineProperty(exports, '__esModule', { value: !0 }),
                    (exports.comment = e),
                    (exports.text = t),
                    (exports.isNode = n),
                    (exports.replaceRange = o),
                    (exports.removeNodes = r),
                    (exports.moveTemplate = s),
                    (exports.getNodeIndex = i),
                    (exports.getNodePath = p),
                    (exports.getNodeByPath = c),
                    (exports.isTemplateEqual = u),
                    (exports.isTemplate = x),
                    (exports.getMarkers = d),
                    (exports.markerNumber = f),
                    (exports.getSVGNamespace = N),
                    (exports.TEXT_ELEMENT = exports.MARKER_RE = exports.TemplateSymbol = void 0);
                const l = Symbol();
                function u(e, t) {
                    return x(e) && x(t) && e.strings === t.strings;
                }
                function x(e) {
                    return e && e[l];
                }
                exports.TemplateSymbol = l;
                const a = /__(\d+)__/;
                exports.MARKER_RE = a;
                const m = /^(?:style|textarea)$/i;
                function d(e) {
                    return e.match(new RegExp(a, 'g')) || [];
                }
                function f(e) {
                    const t = e.match(a);
                    return Number(t ? t[1] : -1);
                }
                exports.TEXT_ELEMENT = m;
                const g = {
                    xlink: 'http://www.w3.org/1999/xlink',
                    xml: 'http://www.w3.org/XML/1998/namespace',
                    xmlns: 'http://www.w3.org/2000/xmlns/'
                };
                function N(e) {
                    return g[e.split(':')[0]];
                }
            },
            {}
        ],
        Q0P1: [
            function(require, module, exports) {
                'use strict';
                Object.defineProperty(exports, '__esModule', { value: !0 }),
                    (exports.setEnabled = u),
                    (exports.enqueueJob = c),
                    (exports.scheduled = p);
                const e = [],
                    n = [];
                let t = !1,
                    s = 0,
                    o = !0;
                function r(e, n) {
                    let t = 0;
                    for (; n - performance.now() > 0 && t < e.length; ) {
                        const n = e[t++];
                        n.task(...n.args), (n.args = void 0), (n.pending = !1);
                    }
                    e.splice(0, t);
                }
                function i() {
                    (t = !0),
                        requestAnimationFrame(() => {
                            s++;
                            const o = performance.now() + 10 * Math.ceil(0.02 * s);
                            r(e, o),
                                r(n, o),
                                e.length > 0 && (n.push(...e), (e.length = 0)),
                                n.length > 0 ? i() : ((t = !1), (s = 0));
                        });
                }
                function u(e) {
                    o = e;
                }
                function c(s, o) {
                    (s.pending = !0), 1 === o ? e.push(s) : 0 === o && n.push(s), t || i();
                }
                function p(e, n = 1) {
                    const t = { task: e, args: [], pending: !1, firstRun: !0 };
                    return (...s) => {
                        t.firstRun || !o ? ((t.firstRun = !1), e(...s)) : ((t.args = s), t.pending || c(t, n));
                    };
                }
            },
            {}
        ],
        Pqg1: [
            function(require, module, exports) {
                'use strict';
                Object.defineProperty(exports, '__esModule', { value: !0 }),
                    (exports.NodeExpression = exports.AttributeExpression = void 0);
                var e = require('./utils'),
                    t = require('./scheduler');
                class s {
                    constructor(s, r) {
                        (this.update = (0, t.scheduled)(t => {
                            if (this.value === t) return;
                            const { name: s, element: r } = this;
                            'ownerSVGElement' in r
                                ? r.setAttributeNS((0, e.getSVGNamespace)(s), s, t)
                                : s in r
                                ? (r[s] = t)
                                : void 0 !== t
                                ? r.setAttribute(s, t)
                                : r.hasAttribute(s) && r.removeAttribute(s),
                                (this.value = t);
                        })),
                            (this.name = r),
                            (this.element = s);
                    }
                }
                exports.AttributeExpression = s;
                class r {
                    constructor(s) {
                        (this.update = (0, t.scheduled)(t => {
                            if (t === this.value) return;
                            const { element: s, placeholder: r } = this;
                            'object' != typeof t && s.nodeType === Node.TEXT_NODE
                                ? (s.textContent = t)
                                : (0, e.isTemplateEqual)(t, s)
                                ? s.update(t.values)
                                : Array.isArray(t)
                                ? (this.value instanceof Map || s.nodeType === Node.COMMENT_NODE || this.replaceWith(r),
                                  (t = this.updateArray(t)))
                                : this.replaceWith(null == t ? r : t),
                                (this.value = t);
                        })),
                            (this.element = this.placeholder = s);
                    }
                    updateArray(t) {
                        const s = this.value instanceof Map ? this.value : new Map(),
                            { element: r } = this;
                        let a = r;
                        const i = t.reduce((t, r, i) => {
                            const n = String(r.key || i);
                            let l = s.get(n);
                            if (l)
                                (0, e.isTemplateEqual)(l, r)
                                    ? l.update(r.values)
                                    : ((0, e.replaceRange)(r.create(), l.range), s.set(n, (l = r)));
                            else {
                                const e = r.create();
                                a.parentNode.insertBefore(e, a.nextSibling), s.set(n, (l = r));
                            }
                            return (
                                a.nextSibling !== l.range[0] && (0, e.moveTemplate)(l, a),
                                (a = l.range[1]),
                                t.push(n),
                                t
                            );
                        }, []);
                        return (
                            s.forEach((e, t, s) => {
                                -1 === i.indexOf(t) && (e.delete(), s.delete(t));
                            }),
                            s
                        );
                    }
                    replaceWith(t) {
                        const { element: s, value: r } = this;
                        r instanceof Map && (r.forEach(e => e.delete()), r.clear()),
                            s !== t &&
                                ((this.element = t = (0, e.isTemplate)(t) ? t : (0, e.isNode)(t) ? t : (0, e.text)(t)),
                                (0, e.replaceRange)(
                                    (0, e.isTemplate)(t) ? t.create() : t,
                                    (0, e.isTemplate)(s) ? s.range : s
                                ));
                    }
                }
                exports.NodeExpression = r;
            },
            { './utils': 'MrFm', './scheduler': 'Q0P1' }
        ],
        OUbi: [
            function(require, module, exports) {
                'use strict';
                Object.defineProperty(exports, '__esModule', { value: !0 }),
                    (exports.linkAttributes = o),
                    (exports.linkComment = n),
                    (exports.linkTexts = a),
                    (exports.linkExpressions = s),
                    (exports.resolve = i);
                var e = require('./expressions'),
                    t = require('./utils');
                function r() {
                    return NodeFilter.FILTER_ACCEPT;
                }
                function o(r, o) {
                    const n = r.attributes;
                    let a = n.length;
                    for (; a--; ) {
                        const { name: s, value: i } = n.item(a),
                            d = (0, t.markerNumber)(i);
                        -1 !== d &&
                            (r.removeAttribute(s),
                            (o[d] = { type: e.AttributeExpression, name: s, nodePath: (0, t.getNodePath)(r) }));
                    }
                }
                function n(r, o) {
                    const n = (0, t.markerNumber)(r.data);
                    -1 !== n &&
                        ((o[n] = { type: e.NodeExpression, nodePath: (0, t.getNodePath)(r) }), (r.nodeValue = ''));
                }
                function a(r, o) {
                    (0, t.getMarkers)(r.data).forEach(n => {
                        const a = (0, t.text)();
                        (r = r.splitText(r.data.indexOf(n))).deleteData(0, n.length),
                            r.parentNode.insertBefore(a, r),
                            (o[(0, t.markerNumber)(n)] = { type: e.NodeExpression, nodePath: (0, t.getNodePath)(a) });
                    });
                }
                function s(e) {
                    const s = document.createTreeWalker(e, NodeFilter.SHOW_ELEMENT | NodeFilter.SHOW_COMMENT, r, !1),
                        i = [];
                    for (; s.nextNode(); ) {
                        const e = s.currentNode;
                        e.nodeType === Node.ELEMENT_NODE
                            ? (o(e, i), t.TEXT_ELEMENT.test(e.tagName) && [].forEach.call(e.childNodes, e => a(e, i)))
                            : n(e, i);
                    }
                    return i;
                }
                function i(e, r) {
                    return r.map(r => new r.type((0, t.getNodeByPath)(e, r.nodePath), r.name));
                }
                r.acceptNode = r;
            },
            { './expressions': 'Pqg1', './utils': 'MrFm' }
        ],
        zbKw: [
            function(require, module, exports) {
                'use strict';
                Object.defineProperty(exports, '__esModule', { value: !0 }), (exports.parseTemplate = o);
                var e = require('./linker'),
                    t = require('./utils');
                const n = new WeakMap();
                function s(t, n) {
                    const s = document.createElement('template');
                    s.innerHTML = n ? `<${n}>${t}</${n}>` : t;
                    let r = s.content;
                    if (n) {
                        const e = document.createRange();
                        e.selectNodeContents(r.firstChild), (r = e.extractContents());
                    }
                    return { content: r, expressions: (0, e.linkExpressions)(r) };
                }
                function r(e) {
                    const n = new RegExp(
                        '^[^]*<([0-9a-zA-Z]+)(?:\\s*[^<\\s\\0"\'>\\/=]+(?:\\s*=\\s*(?:"[^"]*"?|\'[^\']*\'?|[^\\s\'">]*))?)*\\s*(>?)|[^]*(>)[^]*|[^]*$',
                        'i'
                    );
                    let s,
                        r = !1,
                        o = e[0];
                    for (let c = 0, i = e.length; c < i - 1; c++) {
                        const i = `__${c}__`,
                            l = e[c].match(n);
                        l[1] && ((s = l[1]), (r = !l[2])),
                            (l[2] || l[3]) && (r = t.TEXT_ELEMENT.test(s)),
                            (o += (r ? i : `\x3c!--${i}--\x3e`) + e[c + 1]);
                    }
                    return o;
                }
                function o(t, o) {
                    let c = n.get(t);
                    c || n.set(t, (c = s(r(t), o)));
                    const i = document.importNode(c.content, !0);
                    return { fragment: i, expressions: (0, e.resolve)(i, c.expressions) };
                }
            },
            { './linker': 'OUbi', './utils': 'MrFm' }
        ],
        Wi2R: [
            function(require, module, exports) {
                'use strict';
                Object.defineProperty(exports, '__esModule', { value: !0 }), (exports.Template = void 0);
                var e,
                    t = require('./parser'),
                    s = require('./utils');
                class i {
                    constructor(t, s, i) {
                        (this[e] = !0), (this.values = s), (this.strings = t), (this.context = i);
                    }
                    withKey(e) {
                        return (this.key = e), this;
                    }
                    update(e) {
                        for (let t = 0; t < e.length; t++)
                            void 0 !== this.expressions[t] && this.expressions[t].update(e[t]);
                    }
                    delete() {
                        (0, s.removeNodes)(this.range[0], this.range[1].nextSibling),
                            (this.range = void 0),
                            (this.expressions = void 0);
                    }
                    create() {
                        const { fragment: e, expressions: i } = (0, t.parseTemplate)(this.strings, this.context);
                        return (
                            (this.expressions = i),
                            (this.range = [e.insertBefore((0, s.text)(), e.firstChild), e.appendChild((0, s.text)())]),
                            this.update(this.values),
                            e
                        );
                    }
                }
                (exports.Template = i), (e = s.TemplateSymbol);
            },
            { './parser': 'zbKw', './utils': 'MrFm' }
        ],
        gjkP: [
            function(require, module, exports) {
                'use strict';
                Object.defineProperty(exports, '__esModule', { value: !0 }),
                    (exports.render = n),
                    (exports.html = s),
                    (exports.svg = u),
                    Object.defineProperty(exports, 'Template', {
                        enumerable: !0,
                        get: function() {
                            return e.Template;
                        }
                    }),
                    Object.defineProperty(exports, 'scheduled', {
                        enumerable: !0,
                        get: function() {
                            return t.scheduled;
                        }
                    });
                var e = require('./template'),
                    t = require('./scheduler'),
                    r = require('./utils');
                function n(e, t) {
                    n.instances.has(t)
                        ? n.instances.get(t).update(e.values)
                        : (n.instances.set(t, e), (0, r.removeNodes)(t.firstChild, null, t), t.appendChild(e.create()));
                }
                function s(t, ...r) {
                    return new e.Template(t, r);
                }
                function u(t, ...r) {
                    return new e.Template(t, r, 'svg');
                }
                n.instances = new WeakMap();
            },
            { './template': 'Wi2R', './scheduler': 'Q0P1', './utils': 'MrFm' }
        ],
        Letq: [
            function(require, module, exports) {
                'use strict';
                Object.defineProperty(exports, '__esModule', { value: !0 }), (exports.withElement = e);
                var t = require('@tiny-lit/core');
                function e(e) {
                    return class extends e {
                        constructor() {
                            super(...arguments),
                                (this.state = {}),
                                (this.rendered = !1),
                                (this.renderCallbacks = []),
                                (this.renderRoot = this);
                        }
                        attachShadow(t) {
                            return (this.renderRoot = super.attachShadow.call(this, t));
                        }
                        connectedCallback() {
                            this.update();
                        }
                        setState(t, e) {
                            const r = this.state;
                            (this.state = Object.assign({}, r, 'function' == typeof t ? t(r, this) : t)),
                                e && this.renderCallbacks.push(e),
                                this.update();
                        }
                        render() {
                            return null;
                        }
                        update() {
                            this.rendered = !0;
                            const e = this.render();
                            for (e && (0, t.render)(e, this.renderRoot); this.renderCallbacks.length; )
                                this.renderCallbacks.shift()();
                        }
                    };
                }
            },
            { '@tiny-lit/core': 'gjkP' }
        ],
        rI01: [
            function(require, module, exports) {
                'use strict';
                Object.defineProperty(exports, '__esModule', { value: !0 }), (exports.Element = void 0);
                var e = require('./withProps'),
                    t = require('./withElement');
                const r = (0, e.withProps)((0, t.withElement)(HTMLElement));
                exports.Element = r;
            },
            { './withProps': 'EUVP', './withElement': 'Letq' }
        ],
        aqGt: [
            function(require, module, exports) {
                'use strict';
                Object.defineProperty(exports, '__esModule', { value: !0 }),
                    Object.defineProperty(exports, 'Element', {
                        enumerable: !0,
                        get: function() {
                            return e.Element;
                        }
                    }),
                    Object.defineProperty(exports, 'withProps', {
                        enumerable: !0,
                        get: function() {
                            return t.withProps;
                        }
                    }),
                    Object.defineProperty(exports, 'withElement', {
                        enumerable: !0,
                        get: function() {
                            return r.withElement;
                        }
                    });
                var e = require('./Element'),
                    t = require('./withProps'),
                    r = require('./withElement');
            },
            { './Element': 'rI01', './withProps': 'EUVP', './withElement': 'Letq' }
        ],
        K0yk: [
            function(require, module, exports) {
                'use strict';
                Object.defineProperty(exports, '__esModule', { value: !0 }),
                    (exports.getType = o),
                    (exports.isPrimitive = i),
                    (exports.isNode = s),
                    (exports.JsonObject = u),
                    (exports.classNames = c),
                    (exports.generateNodePreview = p);
                var e = require('@tiny-lit/core/dist/esm/utils');
                function r(e, r) {
                    var t = Object.keys(e);
                    if (Object.getOwnPropertySymbols) {
                        var n = Object.getOwnPropertySymbols(e);
                        r &&
                            (n = n.filter(function(r) {
                                return Object.getOwnPropertyDescriptor(e, r).enumerable;
                            })),
                            t.push.apply(t, n);
                    }
                    return t;
                }
                function t(e) {
                    for (var t = 1; t < arguments.length; t++) {
                        var o = null != arguments[t] ? arguments[t] : {};
                        t % 2
                            ? r(Object(o), !0).forEach(function(r) {
                                  n(e, r, o[r]);
                              })
                            : Object.getOwnPropertyDescriptors
                            ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(o))
                            : r(Object(o)).forEach(function(r) {
                                  Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(o, r));
                              });
                    }
                    return e;
                }
                function n(e, r, t) {
                    return (
                        r in e
                            ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 })
                            : (e[r] = t),
                        e
                    );
                }
                function o(e) {
                    return null === e ? 'null' : Array.isArray(e) ? 'array' : typeof e;
                }
                function i(e) {
                    return e !== Object(e);
                }
                function s(r) {
                    return !!r && (!!r.nodeType || (0, e.isTemplate)(r));
                }
                function u(e) {
                    try {
                        if ('string' == typeof e) return JSON.parse(e);
                    } catch (r) {
                        console.error(r);
                    }
                    return e;
                }
                function c(...e) {
                    return e.filter(Boolean).join(' ');
                }
                function p(e, r) {
                    const { nodeCount: n, maxLength: i } = t({ nodeCount: 3, maxLength: 15 }, r),
                        s = Array.isArray(e),
                        u = Object.keys(e),
                        c = u.slice(0, n),
                        p = [s ? '[ ' : '{ '];
                    return (
                        p.push(
                            c
                                .reduce((r, t) => {
                                    const n = [],
                                        u = e[t],
                                        c = o(u);
                                    return (
                                        s || n.push(`${t}: `),
                                        'object' === c
                                            ? n.push('{ ... }')
                                            : 'array' === c
                                            ? n.push('[ ... ]')
                                            : 'string' === c
                                            ? n.push(`"${u.substring(0, i)}${u.length > i ? '...' : ''}"`)
                                            : n.push(String(u)),
                                        r.concat(n.join(''))
                                    );
                                }, [])
                                .join(', ')
                        ),
                        u.length > n && p.push(', ...'),
                        p.push(s ? ' ]' : ' }'),
                        p.join('')
                    );
                }
            },
            { '@tiny-lit/core/dist/esm/utils': 'MrFm' }
        ],
        H99C: [
            function(require, module, exports) {
                'use strict';
                var e = require('@tiny-lit/element'),
                    o = require('@tiny-lit/core'),
                    t = require('./utils');
                let l,
                    r,
                    s,
                    n,
                    a,
                    i,
                    c,
                    d,
                    p,
                    u = e => e;
                const b = ({ isCollapsable: e, collapsed: r, onClick: s, key: n }) =>
                    (0, o.html)(
                        l ||
                            (l = u`
    <span
        class=${0}
        onClick=${0}
    >
        ${0}:
    </span>
`),
                        (0, t.classNames)(n && 'key', e && 'collapsable', r && 'collapsableCollapsed'),
                        s,
                        n
                    );
                class m extends e.Element {
                    constructor(...e) {
                        super(...e),
                            (this.data = null),
                            (this.collapsed = !0),
                            (this.handleKeyClick = e => {
                                e.preventDefault(), (this.collapsed = !this.collapsed);
                            });
                    }
                    static get properties() {
                        return { data: t.JsonObject, collapsed: Boolean, key: String };
                    }
                    static get is() {
                        return 'json-nested-object-node';
                    }
                    renderValue(e) {
                        return (0, t.isNode)(e)
                            ? e
                            : (0, o.html)(
                                  r ||
                                      (r = u`
                  <span class=${0}>${0}</span>
              `),
                                  (0, t.getType)(e),
                                  JSON.stringify(e)
                              );
                    }
                    renderChild(e) {
                        return this.collapsed
                            ? (0, o.html)(
                                  s ||
                                      (s = u`
                  <span class="preview">
                      ${0}
                  </span>
              `),
                                  (0, t.generateNodePreview)(e)
                              )
                            : (0, o.html)(
                                  n ||
                                      (n = u`
                  <json-object-node data=${0}></json-object-node>
              `),
                                  e
                              );
                    }
                    render() {
                        const { data: e, key: l } = this,
                            r = (0, t.isPrimitive)(e) || (0, t.isNode)(e);
                        return (0, o.html)(
                            a ||
                                (a = u`
            ${0}
            ${0}
        `),
                            b({
                                isCollapsable: !r,
                                collapsed: this.collapsed,
                                key: l,
                                onClick: !r && this.handleKeyClick
                            }),
                            r ? this.renderValue(e) : this.renderChild(e)
                        );
                    }
                }
                class h extends e.Element {
                    constructor(...e) {
                        super(...e), (this.data = null), (this.collapsed = !0);
                    }
                    static get is() {
                        return 'json-object-node';
                    }
                    static get properties() {
                        return { data: t.JsonObject, collapsed: Boolean };
                    }
                    renderObject(e) {
                        return Object.keys(e).map(t =>
                            (0, o.html)(
                                i ||
                                    (i = u`
                <li>
                    <json-nested-object-node key=${0} data=${0}></json-nested-object-node>
                </li>
            `),
                                t,
                                e[t]
                            ).withKey(t)
                        );
                    }
                    renderPrimitive(e) {
                        return void 0 !== e
                            ? (0, o.html)(
                                  c ||
                                      (c = u`
                  <li>${0}</li>
              `),
                                  e
                              )
                            : null;
                    }
                    render() {
                        const { data: e } = this;
                        return (0, o.html)(
                            d ||
                                (d = u`
            <ul>
                ${0}
            </ul>
        `),
                            (0, t.isPrimitive)(e) ? this.renderPrimitive(e) : this.renderObject(e)
                        );
                    }
                }
                class f extends e.Element {
                    constructor(...e) {
                        super(...e), (this.data = null);
                    }
                    static get is() {
                        return 'json-viewer';
                    }
                    static get properties() {
                        return { data: t.JsonObject };
                    }
                    connectedCallback() {
                        if (!this.hasAttribute('data')) {
                            const e = this.innerText.trim();
                            e && (this.data = JSON.parse(e));
                        }
                        this.attachShadow({ mode: 'open' }), super.connectedCallback();
                    }
                    render() {
                        return (0, o.html)(
                            p ||
                                (p = u`
            <style>
                :host {
                    --background-color: #2a2f3a;
                    --color: #f8f8f2;
                    --string-color: #a3eea0;
                    --number-color: #d19a66;
                    --boolean-color: #4ba7ef;
                    --null-color: #df9cf3;
                    --property-color: #6fb3d2;
                    --font-family: monaco, Consolas, 'Lucida Console', monospace;
                    --preview-color: rgba(222, 175, 143, 0.9);

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
                    padding-top: 0.25rem;
                    margin-left: 1.5rem;
                    padding-left: 0px;
                }

                json-nested-object-node ul:before {
                    content: '';
                    border-left: 1px solid #333;
                    position: absolute;
                    left: 0.5rem;
                    top: 0.5rem;
                    bottom: 0.5rem;
                }

                json-nested-object-node ul:hover:before {
                    border-left: 1px solid #666;
                }
            </style>
            <json-object-node data=${0}></json-object-node>
        `),
                            this.data
                        );
                    }
                }
                customElements.define(h.is, h), customElements.define(m.is, m), customElements.define(f.is, f);
            },
            { '@tiny-lit/element': 'aqGt', '@tiny-lit/core': 'gjkP', './utils': 'K0yk' }
        ]
    },
    {},
    ['H99C'],
    null
);
//# sourceMappingURL=/json-viewer/src.0e945c22.js.map
