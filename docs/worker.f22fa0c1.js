!(function () {
    const e = Symbol('Comlink.proxy'),
        t = Symbol('Comlink.endpoint'),
        n = Symbol('Comlink.releaseProxy'),
        r = Symbol('Comlink.thrown'),
        a = (e) => ('object' == typeof e && null !== e) || 'function' == typeof e,
        o = new Map([
            [
                'proxy',
                {
                    canHandle: (t) => a(t) && t[e],
                    serialize(e) {
                        const { port1: t, port2: n } = new MessageChannel();
                        return s(e, t), [n, [n]];
                    },
                    deserialize(e) {
                        return e.start(), c(e, [], t);
                        var t;
                    }
                }
            ],
            [
                'throw',
                {
                    canHandle: (e) => a(e) && r in e,
                    serialize({ value: e }) {
                        let t;
                        return (
                            (t =
                                e instanceof Error
                                    ? { isError: !0, value: { message: e.message, name: e.name, stack: e.stack } }
                                    : { isError: !1, value: e }),
                            [t, []]
                        );
                    },
                    deserialize(e) {
                        if (e.isError) throw Object.assign(new Error(e.value.message), e.value);
                        throw e.value;
                    }
                }
            ]
        ]);
    function s(t, n = self) {
        n.addEventListener('message', function a(o) {
            if (!o || !o.data) return;
            const { id: l, type: c, path: u } = Object.assign({ path: [] }, o.data),
                d = (o.data.argumentList || []).map(h);
            let g;
            try {
                const n = u.slice(0, -1).reduce((e, t) => e[t], t),
                    r = u.reduce((e, t) => e[t], t);
                switch (c) {
                    case 0:
                        g = r;
                        break;
                    case 1:
                        (n[u.slice(-1)[0]] = h(o.data.value)), (g = !0);
                        break;
                    case 2:
                        g = r.apply(n, d);
                        break;
                    case 3:
                        g = (function (t) {
                            return Object.assign(t, { [e]: !0 });
                        })(new r(...d));
                        break;
                    case 4:
                        {
                            const { port1: e, port2: n } = new MessageChannel();
                            s(t, n),
                                (g = (function (e, t) {
                                    return f.set(e, t), e;
                                })(e, [e]));
                        }
                        break;
                    case 5:
                        g = void 0;
                }
            } catch (e) {
                g = { value: e, [r]: 0 };
            }
            Promise.resolve(g)
                .catch((e) => ({ value: e, [r]: 0 }))
                .then((e) => {
                    const [t, r] = p(e);
                    n.postMessage(Object.assign(Object.assign({}, t), { id: l }), r),
                        5 === c && (n.removeEventListener('message', a), i(n));
                });
        }),
            n.start && n.start();
    }
    function i(e) {
        (function (e) {
            return 'MessagePort' === e.constructor.name;
        })(e) && e.close();
    }
    function l(e) {
        if (e) throw new Error('Proxy has been released and is not useable');
    }
    function c(e, r = [], a = function () {}) {
        let o = !1;
        const s = new Proxy(a, {
            get(t, a) {
                if ((l(o), a === n))
                    return () =>
                        d(e, { type: 5, path: r.map((e) => e.toString()) }).then(() => {
                            i(e), (o = !0);
                        });
                if ('then' === a) {
                    if (0 === r.length) return { then: () => s };
                    const t = d(e, { type: 0, path: r.map((e) => e.toString()) }).then(h);
                    return t.then.bind(t);
                }
                return c(e, [...r, a]);
            },
            set(t, n, a) {
                l(o);
                const [s, i] = p(a);
                return d(e, { type: 1, path: [...r, n].map((e) => e.toString()), value: s }, i).then(h);
            },
            apply(n, a, s) {
                l(o);
                const i = r[r.length - 1];
                if (i === t) return d(e, { type: 4 }).then(h);
                if ('bind' === i) return c(e, r.slice(0, -1));
                const [f, p] = u(s);
                return d(e, { type: 2, path: r.map((e) => e.toString()), argumentList: f }, p).then(h);
            },
            construct(t, n) {
                l(o);
                const [a, s] = u(n);
                return d(e, { type: 3, path: r.map((e) => e.toString()), argumentList: a }, s).then(h);
            }
        });
        return s;
    }
    function u(e) {
        const t = e.map(p);
        return [t.map((e) => e[0]), ((n = t.map((e) => e[1])), Array.prototype.concat.apply([], n))];
        var n;
    }
    const f = new WeakMap();
    function p(e) {
        for (const [t, n] of o)
            if (n.canHandle(e)) {
                const [r, a] = n.serialize(e);
                return [{ type: 3, name: t, value: r }, a];
            }
        return [{ type: 0, value: e }, f.get(e) || []];
    }
    function h(e) {
        switch (e.type) {
            case 3:
                return o.get(e.name).deserialize(e.value);
            case 0:
                return e.value;
        }
    }
    function d(e, t, n) {
        return new Promise((r) => {
            const a = new Array(4)
                .fill(0)
                .map(() => Math.floor(Math.random() * Number.MAX_SAFE_INTEGER).toString(16))
                .join('-');
            e.addEventListener('message', function t(n) {
                n.data && n.data.id && n.data.id === a && (e.removeEventListener('message', t), r(n.data));
            }),
                e.start && e.start(),
                e.postMessage(Object.assign({ id: a }, t), n);
        });
    }
    function g(e, t = 1) {
        const n = [
                ['"', "'"],
                ["':", '!'],
                [",'", '~'],
                ['}', ')', '\\', '\\'],
                ['{', '(', '\\', '\\']
            ],
            r = (e, t) => {
                let n = new RegExp(`${(t[2] ? t[2] : '') + t[0]}|${(t[3] ? t[3] : '') + t[1]}`, 'g');
                return e.replace(n, (e) => (e === t[0] ? t[1] : t[0]));
            };
        if (t) for (let t = 0; t < n.length; ++t) e = r(e, n[t]);
        else for (let t = n.length; t--; ) e = r(e, n[t]);
        return e;
    }
    s({
        crush: function (e) {
            let t = [];
            const n = "-_.!~*'()";
            for (let e = 127; --e; )
                ((e >= 48 && e <= 57) ||
                    (e >= 65 && e <= 90) ||
                    (e >= 97 && e <= 122) ||
                    n.includes(String.fromCharCode(e))) &&
                    t.push(String.fromCharCode(e));
            for (let e = 32; e < 255; ++e) {
                let n = String.fromCharCode(e);
                '\\' == n || t.includes(n) || t.unshift(n);
            }
            const r = ((e, t) => {
                let n = t.length,
                    r = '';
                const a = (e) => encodeURI(encodeURIComponent(e)).replace(/%../g, 'i').length,
                    o = (e) => {
                        let t = e.charCodeAt(0),
                            n = e.charCodeAt(e.length - 1);
                        return (t >= 56320 && t <= 57343) || (n >= 55296 && n <= 56319);
                    };
                let s = {};
                for (let t = 2; t < 50; t++)
                    for (let n = 0; n < e.length - t; ++n) {
                        let r = e.substr(n, t);
                        if (s[r]) continue;
                        if (o(r)) continue;
                        let a = 1;
                        for (let o = e.indexOf(r, n + t); o >= 0; ++a) o = e.indexOf(r, o + t);
                        a > 1 && (s[r] = a);
                    }
                for (;;) {
                    for (; n-- && e.includes(t[n]); );
                    if (n < 0) break;
                    let o,
                        i = t[n],
                        l = 0,
                        c = a(i);
                    for (let e in s) {
                        let t = s[e],
                            n = (t - 1) * a(e) - (t + 1) * c;
                        r.length || (n -= a('')), n <= 0 ? delete s[e] : n > l && ((o = e), (l = n));
                    }
                    if (!o) break;
                    (e = e.split(o).join(i) + i + o), (r = i + r);
                    let u = {};
                    for (let t in s) {
                        let n = t.split(o).join(i),
                            r = 0;
                        for (let t = e.indexOf(n); t >= 0; ++r) t = e.indexOf(n, t + n.length);
                        r > 1 && (u[n] = r);
                    }
                    s = u;
                }
                return { a: e, b: r };
            })((e = g((e = e.replace(new RegExp('', 'g'), '')))), t);
            let a = r.a;
            return r.b.length && (a += '' + r.b), encodeURIComponent(a);
        },
        uncrush: function (e) {
            const t = (e = decodeURIComponent(e)).split('');
            let n = t[0];
            if (t.length > 1) {
                let e = t[1];
                for (let t of e) {
                    let e = n.split(t);
                    n = e.join(e.pop());
                }
            }
            return g(n, 0);
        },
        parse: function (e) {
            return JSON.parse(e);
        }
    });
})();
//# sourceMappingURL=worker.f22fa0c1.js.map
