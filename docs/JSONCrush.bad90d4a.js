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
        JZPE: [
            function(require, module, exports) {
                'use strict';
                Object.defineProperty(exports, '__esModule', { value: !0 }),
                    (exports.expose = a),
                    (exports.proxy = g),
                    (exports.transfer = m),
                    (exports.windowEndpoint = h),
                    (exports.wrap = c),
                    (exports.transferHandlers = exports.releaseProxy = exports.proxyMarker = exports.createEndpoint = void 0);
                const e = Symbol('Comlink.proxy');
                exports.proxyMarker = e;
                const t = Symbol('Comlink.endpoint');
                exports.createEndpoint = t;
                const n = Symbol('Comlink.releaseProxy');
                exports.releaseProxy = n;
                const r = new WeakSet(),
                    s = new Map([
                        [
                            'proxy',
                            {
                                canHandle: t => t && t[e],
                                serialize(e) {
                                    const { port1: t, port2: n } = new MessageChannel();
                                    return a(e, t), [n, [n]];
                                },
                                deserialize: e => (e.start(), c(e))
                            }
                        ],
                        [
                            'throw',
                            {
                                canHandle: e => r.has(e),
                                serialize(e) {
                                    const t = e instanceof Error;
                                    let n = e;
                                    return t && (n = { isError: t, message: e.message, stack: e.stack }), [n, []];
                                },
                                deserialize(e) {
                                    if (e.isError) throw Object.assign(new Error(), e);
                                    throw e;
                                }
                            }
                        ]
                    ]);
                function a(e, t = self) {
                    t.addEventListener('message', function n(s) {
                        if (!s || !s.data) return;
                        const { id: o, type: c, path: p } = Object.assign({ path: [] }, s.data),
                            u = (s.data.argumentList || []).map(x);
                        let d;
                        try {
                            const t = p.slice(0, -1).reduce((e, t) => e[t], e),
                                n = p.reduce((e, t) => e[t], e);
                            switch (c) {
                                case 0:
                                    d = n;
                                    break;
                                case 1:
                                    (t[p.slice(-1)[0]] = x(s.data.value)), (d = !0);
                                    break;
                                case 2:
                                    d = n.apply(t, u);
                                    break;
                                case 3:
                                    d = g(new n(...u));
                                    break;
                                case 4:
                                    {
                                        const { port1: t, port2: n } = new MessageChannel();
                                        a(e, n), (d = m(t, [t]));
                                    }
                                    break;
                                case 5:
                                    d = void 0;
                            }
                        } catch (l) {
                            (d = l), r.add(l);
                        }
                        Promise.resolve(d)
                            .catch(e => (r.add(e), e))
                            .then(e => {
                                const [r, s] = y(e);
                                t.postMessage(Object.assign(Object.assign({}, r), { id: o }), s),
                                    5 === c && (t.removeEventListener('message', n), i(t));
                            });
                    }),
                        t.start && t.start();
                }
                function o(e) {
                    return 'MessagePort' === e.constructor.name;
                }
                function i(e) {
                    o(e) && e.close();
                }
                function c(e, t) {
                    return u(e, [], t);
                }
                function p(e) {
                    if (e) throw new Error('Proxy has been released and is not useable');
                }
                function u(e, r = [], s = function() {}) {
                    let a = !1;
                    const o = new Proxy(s, {
                        get(t, s) {
                            if ((p(a), s === n))
                                return () =>
                                    b(e, { type: 5, path: r.map(e => e.toString()) }).then(() => {
                                        i(e), (a = !0);
                                    });
                            if ('then' === s) {
                                if (0 === r.length) return { then: () => o };
                                const t = b(e, { type: 0, path: r.map(e => e.toString()) }).then(x);
                                return t.then.bind(t);
                            }
                            return u(e, [...r, s]);
                        },
                        set(t, n, s) {
                            p(a);
                            const [o, i] = y(s);
                            return b(e, { type: 1, path: [...r, n].map(e => e.toString()), value: o }, i).then(x);
                        },
                        apply(n, s, o) {
                            p(a);
                            const i = r[r.length - 1];
                            if (i === t) return b(e, { type: 4 }).then(x);
                            if ('bind' === i) return u(e, r.slice(0, -1));
                            const [c, d] = l(o);
                            return b(e, { type: 2, path: r.map(e => e.toString()), argumentList: c }, d).then(x);
                        },
                        construct(t, n) {
                            p(a);
                            const [s, o] = l(n);
                            return b(e, { type: 3, path: r.map(e => e.toString()), argumentList: s }, o).then(x);
                        }
                    });
                    return o;
                }
                function d(e) {
                    return Array.prototype.concat.apply([], e);
                }
                function l(e) {
                    const t = e.map(y);
                    return [t.map(e => e[0]), d(t.map(e => e[1]))];
                }
                exports.transferHandlers = s;
                const f = new WeakMap();
                function m(e, t) {
                    return f.set(e, t), e;
                }
                function g(t) {
                    return Object.assign(t, { [e]: !0 });
                }
                function h(e, t = self, n = '*') {
                    return {
                        postMessage: (t, r) => e.postMessage(t, n, r),
                        addEventListener: t.addEventListener.bind(t),
                        removeEventListener: t.removeEventListener.bind(t)
                    };
                }
                function y(e) {
                    for (const [t, n] of s)
                        if (n.canHandle(e)) {
                            const [r, s] = n.serialize(e);
                            return [{ type: 3, name: t, value: r }, s];
                        }
                    return [{ type: 0, value: e }, f.get(e) || []];
                }
                function x(e) {
                    switch (e.type) {
                        case 3:
                            return s.get(e.name).deserialize(e.value);
                        case 0:
                            return e.value;
                    }
                }
                function b(e, t, n) {
                    return new Promise(r => {
                        const s = v();
                        e.addEventListener('message', function t(n) {
                            n.data && n.data.id && n.data.id === s && (e.removeEventListener('message', t), r(n.data));
                        }),
                            e.start && e.start(),
                            e.postMessage(Object.assign({ id: s }, t), n);
                    });
                }
                function v() {
                    return new Array(4)
                        .fill(0)
                        .map(() => Math.floor(Math.random() * Number.MAX_SAFE_INTEGER).toString(16))
                        .join('-');
                }
            },
            {}
        ],
        FTAk: [
            function(require, module, exports) {
                'use strict';
                Object.defineProperty(exports, '__esModule', { value: !0 }), (exports.crush = n), (exports.uncrush = o);
                var e = r(require('comlink'));
                function t() {
                    if ('function' != typeof WeakMap) return null;
                    var e = new WeakMap();
                    return (
                        (t = function() {
                            return e;
                        }),
                        e
                    );
                }
                function r(e) {
                    if (e && e.__esModule) return e;
                    if (null === e || ('object' != typeof e && 'function' != typeof e)) return { default: e };
                    var r = t();
                    if (r && r.has(e)) return r.get(e);
                    var n = {},
                        o = Object.defineProperty && Object.getOwnPropertyDescriptor;
                    for (var l in e)
                        if (Object.prototype.hasOwnProperty.call(e, l)) {
                            var i = o ? Object.getOwnPropertyDescriptor(e, l) : null;
                            i && (i.get || i.set) ? Object.defineProperty(n, l, i) : (n[l] = e[l]);
                        }
                    return (n.default = e), r && r.set(e, n), n;
                }
                function n(e) {
                    let t = [];
                    const r = "-_.!~*'()";
                    for (let l = 127; --l; )
                        ((l >= 48 && l <= 57) ||
                            (l >= 65 && l <= 90) ||
                            (l >= 97 && l <= 122) ||
                            r.includes(String.fromCharCode(l))) &&
                            t.push(String.fromCharCode(l));
                    for (let l = 32; l < 255; ++l) {
                        let e = String.fromCharCode(l);
                        '\\' == e || t.includes(e) || t.unshift(e);
                    }
                    const n = ((e, t) => {
                        let r = t.length,
                            n = '';
                        const o = e => encodeURI(encodeURIComponent(e)).replace(/%../g, 'i').length,
                            l = e => {
                                let t = e.charCodeAt(0),
                                    r = e.charCodeAt(e.length - 1);
                                return (t >= 56320 && t <= 57343) || (r >= 55296 && r <= 56319);
                            };
                        let i = {};
                        for (let f = 2; f < 50; f++)
                            for (let t = 0; t < e.length - f; ++t) {
                                let r = e.substr(t, f);
                                if (i[r]) continue;
                                if (l(r)) continue;
                                let n = 1;
                                for (let o = e.indexOf(r, t + f); o >= 0; ++n) o = e.indexOf(r, o + f);
                                n > 1 && (i[r] = n);
                            }
                        for (;;) {
                            for (; r-- && e.includes(t[r]); );
                            if (r < 0) break;
                            let l,
                                f = t[r],
                                u = 0,
                                c = o(f);
                            for (let e in i) {
                                let t = i[e],
                                    r = (t - 1) * o(e) - (t + 1) * c;
                                n.length || (r -= o('')), r <= 0 ? delete i[e] : r > u && ((l = e), (u = r));
                            }
                            if (!l) break;
                            (e = e.split(l).join(f) + f + l), (n = f + n);
                            let s = {};
                            for (let t in i) {
                                let r = t.split(l).join(f),
                                    n = 0;
                                for (let t = e.indexOf(r); t >= 0; ++n) t = e.indexOf(r, t + r.length);
                                n > 1 && (s[r] = n);
                            }
                            i = s;
                        }
                        return { a: e, b: n };
                    })((e = l((e = e.replace(new RegExp('', 'g'), '')))), t);
                    let o = n.a;
                    return n.b.length && (o += '' + n.b), encodeURIComponent(o);
                }
                function o(e) {
                    const t = (e = decodeURIComponent(e)).split('');
                    let r = t[0];
                    if (t.length > 1) {
                        let e = t[1];
                        for (let t of e) {
                            let e = r.split(t);
                            r = e.join(e.pop());
                        }
                    }
                    return l(r, 0);
                }
                function l(e, t = 1) {
                    const r = [
                            ['"', "'"],
                            ["':", '!'],
                            [",'", '~'],
                            ['}', ')', '\\', '\\'],
                            ['{', '(', '\\', '\\']
                        ],
                        n = (e, t) => {
                            let r = new RegExp(`${(t[2] ? t[2] : '') + t[0]}|${(t[3] ? t[3] : '') + t[1]}`, 'g');
                            return e.replace(r, e => (e === t[0] ? t[1] : t[0]));
                        };
                    if (t) for (let o = 0; o < r.length; ++o) e = n(e, r[o]);
                    else for (let o = r.length; o--; ) e = n(e, r[o]);
                    return e;
                }
                e.expose({ crush: n, uncrush: o });
            },
            { comlink: 'JZPE' }
        ]
    },
    {},
    ['FTAk'],
    null
);
//# sourceMappingURL=/json-viewer/JSONCrush.bad90d4a.js.map
