var Jn = Object.defineProperty
var er = (e, t, n) => (t in e ? Jn(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : (e[t] = n))
var y = (e, t, n) => (er(e, typeof t != 'symbol' ? t + '' : t, n), n)
;(function () {
  const t = document.createElement('link').relList
  if (t && t.supports && t.supports('modulepreload')) return
  for (const i of document.querySelectorAll('link[rel="modulepreload"]')) r(i)
  new MutationObserver((i) => {
    for (const a of i)
      if (a.type === 'childList')
        for (const u of a.addedNodes) u.tagName === 'LINK' && u.rel === 'modulepreload' && r(u)
  }).observe(document, { childList: !0, subtree: !0 })
  function n(i) {
    const a = {}
    return (
      i.integrity && (a.integrity = i.integrity),
      i.referrerPolicy && (a.referrerPolicy = i.referrerPolicy),
      i.crossOrigin === 'use-credentials'
        ? (a.credentials = 'include')
        : i.crossOrigin === 'anonymous'
        ? (a.credentials = 'omit')
        : (a.credentials = 'same-origin'),
      a
    )
  }
  function r(i) {
    if (i.ep) return
    i.ep = !0
    const a = n(i)
    fetch(i.href, a)
  }
})()
const k = { context: void 0, registry: void 0 }
function Et(e) {
  k.context = e
}
function tr() {
  return { ...k.context, id: `${k.context.id}${k.context.count++}-`, count: 0 }
}
const nr = (e, t) => e === t,
  q = Symbol('solid-proxy'),
  Ne = Symbol('solid-track'),
  Je = { equals: nr }
let rn = ln
const De = 1,
  et = 2,
  an = { owned: null, cleanups: null, context: null, owner: null }
var O = null
let dt = null,
  rr = null,
  H = null,
  K = null,
  fe = null,
  rt = 0
function Qe(e, t) {
  const n = H,
    r = O,
    i = e.length === 0,
    a = t === void 0 ? r : t,
    u = i ? an : { owned: null, cleanups: null, context: a ? a.context : null, owner: a },
    o = i ? e : () => e(() => Y(() => ot(u)))
  ;(O = u), (H = null)
  try {
    return ke(o, !0)
  } finally {
    ;(H = n), (O = r)
  }
}
function N(e, t) {
  t = t ? Object.assign({}, Je, t) : Je
  const n = { value: e, observers: null, observerSlots: null, comparator: t.equals || void 0 },
    r = (i) => (typeof i == 'function' && (i = i(n.value)), un(n, i))
  return [on.bind(n), r]
}
function ir(e, t, n) {
  const r = at(e, t, !0, De)
  Ie(r)
}
function L(e, t, n) {
  const r = at(e, t, !1, De)
  Ie(r)
}
function ge(e, t, n) {
  rn = dr
  const r = at(e, t, !1, De)
  ;(!n || !n.render) && (r.user = !0), fe ? fe.push(r) : Ie(r)
}
function M(e, t, n) {
  n = n ? Object.assign({}, Je, n) : Je
  const r = at(e, t, !0, 0)
  return (r.observers = null), (r.observerSlots = null), (r.comparator = n.equals || void 0), Ie(r), on.bind(r)
}
function oe(e) {
  return ke(e, !1)
}
function Y(e) {
  if (H === null) return e()
  const t = H
  H = null
  try {
    return e()
  } finally {
    H = t
  }
}
function je(e, t, n) {
  const r = Array.isArray(e)
  let i,
    a = n && n.defer
  return (u) => {
    let o
    if (r) {
      o = Array(e.length)
      for (let c = 0; c < e.length; c++) o[c] = e[c]()
    } else o = e()
    if (a) {
      a = !1
      return
    }
    const s = Y(() => t(o, i, u))
    return (i = o), s
  }
}
function $e(e) {
  ge(() => Y(e))
}
function le(e) {
  return O === null || (O.cleanups === null ? (O.cleanups = [e]) : O.cleanups.push(e)), e
}
function Ue() {
  return H
}
function ar(e) {
  const t = H,
    n = O
  return Promise.resolve().then(() => {
    ;(H = t), (O = n)
    let r
    return ke(e, !1), (H = O = null), r ? r.done : void 0
  })
}
const [or, wl] = N(!1)
function ur() {
  return [or, ar]
}
function bt(e, t) {
  const n = Symbol('context')
  return { id: n, Provider: gr(n), defaultValue: e }
}
function it(e) {
  return O && O.context && O.context[e.id] !== void 0 ? O.context[e.id] : e.defaultValue
}
function lr(e) {
  const t = M(e),
    n = M(() => yt(t()))
  return (
    (n.toArray = () => {
      const r = n()
      return Array.isArray(r) ? r : r != null ? [r] : []
    }),
    n
  )
}
function on() {
  if (this.sources && this.state)
    if (this.state === De) Ie(this)
    else {
      const e = K
      ;(K = null), ke(() => nt(this), !1), (K = e)
    }
  if (H) {
    const e = this.observers ? this.observers.length : 0
    H.sources ? (H.sources.push(this), H.sourceSlots.push(e)) : ((H.sources = [this]), (H.sourceSlots = [e])),
      this.observers
        ? (this.observers.push(H), this.observerSlots.push(H.sources.length - 1))
        : ((this.observers = [H]), (this.observerSlots = [H.sources.length - 1]))
  }
  return this.value
}
function un(e, t, n) {
  let r = e.value
  return (
    (!e.comparator || !e.comparator(r, t)) &&
      ((e.value = t),
      e.observers &&
        e.observers.length &&
        ke(() => {
          for (let i = 0; i < e.observers.length; i += 1) {
            const a = e.observers[i],
              u = dt && dt.running
            u && dt.disposed.has(a),
              (u ? !a.tState : !a.state) && (a.pure ? K.push(a) : fe.push(a), a.observers && sn(a)),
              u || (a.state = De)
          }
          if (K.length > 1e6) throw ((K = []), new Error())
        }, !1)),
    t
  )
}
function Ie(e) {
  if (!e.fn) return
  ot(e)
  const t = rt
  sr(e, e.value, t)
}
function sr(e, t, n) {
  let r
  const i = O,
    a = H
  H = O = e
  try {
    r = e.fn(t)
  } catch (u) {
    return e.pure && ((e.state = De), e.owned && e.owned.forEach(ot), (e.owned = null)), (e.updatedAt = n + 1), cn(u)
  } finally {
    ;(H = a), (O = i)
  }
  ;(!e.updatedAt || e.updatedAt <= n) &&
    (e.updatedAt != null && 'observers' in e ? un(e, r) : (e.value = r), (e.updatedAt = n))
}
function at(e, t, n, r = De, i) {
  const a = {
    fn: e,
    state: r,
    updatedAt: null,
    owned: null,
    sources: null,
    sourceSlots: null,
    cleanups: null,
    value: t,
    owner: O,
    context: O ? O.context : null,
    pure: n
  }
  return O === null || (O !== an && (O.owned ? O.owned.push(a) : (O.owned = [a]))), a
}
function tt(e) {
  if (e.state === 0) return
  if (e.state === et) return nt(e)
  if (e.suspense && Y(e.suspense.inFallback)) return e.suspense.effects.push(e)
  const t = [e]
  for (; (e = e.owner) && (!e.updatedAt || e.updatedAt < rt); ) e.state && t.push(e)
  for (let n = t.length - 1; n >= 0; n--)
    if (((e = t[n]), e.state === De)) Ie(e)
    else if (e.state === et) {
      const r = K
      ;(K = null), ke(() => nt(e, t[0]), !1), (K = r)
    }
}
function ke(e, t) {
  if (K) return e()
  let n = !1
  t || (K = []), fe ? (n = !0) : (fe = []), rt++
  try {
    const r = e()
    return cr(n), r
  } catch (r) {
    n || (fe = null), (K = null), cn(r)
  }
}
function cr(e) {
  if ((K && (ln(K), (K = null)), e)) return
  const t = fe
  ;(fe = null), t.length && ke(() => rn(t), !1)
}
function ln(e) {
  for (let t = 0; t < e.length; t++) tt(e[t])
}
function dr(e) {
  let t,
    n = 0
  for (t = 0; t < e.length; t++) {
    const r = e[t]
    r.user ? (e[n++] = r) : tt(r)
  }
  if (k.context) {
    if (k.count) {
      k.effects || (k.effects = []), k.effects.push(...e.slice(0, n))
      return
    } else k.effects && ((e = [...k.effects, ...e]), (n += k.effects.length), delete k.effects)
    Et()
  }
  for (t = 0; t < n; t++) tt(e[t])
}
function nt(e, t) {
  e.state = 0
  for (let n = 0; n < e.sources.length; n += 1) {
    const r = e.sources[n]
    if (r.sources) {
      const i = r.state
      i === De ? r !== t && (!r.updatedAt || r.updatedAt < rt) && tt(r) : i === et && nt(r, t)
    }
  }
}
function sn(e) {
  for (let t = 0; t < e.observers.length; t += 1) {
    const n = e.observers[t]
    n.state || ((n.state = et), n.pure ? K.push(n) : fe.push(n), n.observers && sn(n))
  }
}
function ot(e) {
  let t
  if (e.sources)
    for (; e.sources.length; ) {
      const n = e.sources.pop(),
        r = e.sourceSlots.pop(),
        i = n.observers
      if (i && i.length) {
        const a = i.pop(),
          u = n.observerSlots.pop()
        r < i.length && ((a.sourceSlots[u] = r), (i[r] = a), (n.observerSlots[r] = u))
      }
    }
  if (e.owned) {
    for (t = e.owned.length - 1; t >= 0; t--) ot(e.owned[t])
    e.owned = null
  }
  if (e.cleanups) {
    for (t = e.cleanups.length - 1; t >= 0; t--) e.cleanups[t]()
    e.cleanups = null
  }
  e.state = 0
}
function fr(e) {
  return e instanceof Error ? e : new Error(typeof e == 'string' ? e : 'Unknown error', { cause: e })
}
function cn(e, t = O) {
  throw fr(e)
}
function yt(e) {
  if (typeof e == 'function' && !e.length) return yt(e())
  if (Array.isArray(e)) {
    const t = []
    for (let n = 0; n < e.length; n++) {
      const r = yt(e[n])
      Array.isArray(r) ? t.push.apply(t, r) : t.push(r)
    }
    return t
  }
  return e
}
function gr(e, t) {
  return function (r) {
    let i
    return L(() => (i = Y(() => ((O.context = { ...O.context, [e]: r.value }), lr(() => r.children)))), void 0), i
  }
}
const hr = Symbol('fallback')
function jt(e) {
  for (let t = 0; t < e.length; t++) e[t]()
}
function dn(e, t, n = {}) {
  let r = [],
    i = [],
    a = [],
    u = 0,
    o = t.length > 1 ? [] : null
  return (
    le(() => jt(a)),
    () => {
      let s = e() || [],
        c,
        l
      return (
        s[Ne],
        Y(() => {
          let d = s.length,
            g,
            h,
            v,
            E,
            $,
            _,
            F,
            b,
            p
          if (d === 0)
            u !== 0 && (jt(a), (a = []), (r = []), (i = []), (u = 0), o && (o = [])),
              n.fallback && ((r = [hr]), (i[0] = Qe((I) => ((a[0] = I), n.fallback()))), (u = 1))
          else if (u === 0) {
            for (i = new Array(d), l = 0; l < d; l++) (r[l] = s[l]), (i[l] = Qe(f))
            u = d
          } else {
            for (
              v = new Array(d), E = new Array(d), o && ($ = new Array(d)), _ = 0, F = Math.min(u, d);
              _ < F && r[_] === s[_];
              _++
            );
            for (F = u - 1, b = d - 1; F >= _ && b >= _ && r[F] === s[b]; F--, b--)
              (v[b] = i[F]), (E[b] = a[F]), o && ($[b] = o[F])
            for (g = new Map(), h = new Array(b + 1), l = b; l >= _; l--)
              (p = s[l]), (c = g.get(p)), (h[l] = c === void 0 ? -1 : c), g.set(p, l)
            for (c = _; c <= F; c++)
              (p = r[c]),
                (l = g.get(p)),
                l !== void 0 && l !== -1
                  ? ((v[l] = i[c]), (E[l] = a[c]), o && ($[l] = o[c]), (l = h[l]), g.set(p, l))
                  : a[c]()
            for (l = _; l < d; l++)
              l in v ? ((i[l] = v[l]), (a[l] = E[l]), o && ((o[l] = $[l]), o[l](l))) : (i[l] = Qe(f))
            ;(i = i.slice(0, (u = d))), (r = s.slice(0))
          }
          return i
        })
      )
      function f(d) {
        if (((a[l] = d), o)) {
          const [g, h] = N(l)
          return (o[l] = h), t(s[l], g)
        }
        return t(s[l])
      }
    }
  )
}
let fn = !1
function vr() {
  fn = !0
}
function D(e, t) {
  if (fn && k.context) {
    const n = k.context
    Et(tr())
    const r = Y(() => e(t || {}))
    return Et(n), r
  }
  return Y(() => e(t || {}))
}
function Ye() {
  return !0
}
const Ct = {
  get(e, t, n) {
    return t === q ? n : e.get(t)
  },
  has(e, t) {
    return t === q ? !0 : e.has(t)
  },
  set: Ye,
  deleteProperty: Ye,
  getOwnPropertyDescriptor(e, t) {
    return {
      configurable: !0,
      enumerable: !0,
      get() {
        return e.get(t)
      },
      set: Ye,
      deleteProperty: Ye
    }
  },
  ownKeys(e) {
    return e.keys()
  }
}
function ft(e) {
  return (e = typeof e == 'function' ? e() : e) ? e : {}
}
function mr() {
  for (let e = 0, t = this.length; e < t; ++e) {
    const n = this[e]()
    if (n !== void 0) return n
  }
}
function he(...e) {
  let t = !1
  for (let u = 0; u < e.length; u++) {
    const o = e[u]
    ;(t = t || (!!o && q in o)), (e[u] = typeof o == 'function' ? ((t = !0), M(o)) : o)
  }
  if (t)
    return new Proxy(
      {
        get(u) {
          for (let o = e.length - 1; o >= 0; o--) {
            const s = ft(e[o])[u]
            if (s !== void 0) return s
          }
        },
        has(u) {
          for (let o = e.length - 1; o >= 0; o--) if (u in ft(e[o])) return !0
          return !1
        },
        keys() {
          const u = []
          for (let o = 0; o < e.length; o++) u.push(...Object.keys(ft(e[o])))
          return [...new Set(u)]
        }
      },
      Ct
    )
  const n = {},
    r = Object.create(null)
  for (let u = e.length - 1; u >= 0; u--) {
    const o = e[u]
    if (!o) continue
    const s = Object.getOwnPropertyNames(o)
    for (let c = s.length - 1; c >= 0; c--) {
      const l = s[c]
      if (l === '__proto__' || l === 'constructor') continue
      const f = Object.getOwnPropertyDescriptor(o, l)
      if (!r[l])
        r[l] = f.get
          ? { enumerable: !0, configurable: !0, get: mr.bind((n[l] = [f.get.bind(o)])) }
          : f.value !== void 0
          ? f
          : void 0
      else {
        const d = n[l]
        d && (f.get ? d.push(f.get.bind(o)) : f.value !== void 0 && d.push(() => f.value))
      }
    }
  }
  const i = {},
    a = Object.keys(r)
  for (let u = a.length - 1; u >= 0; u--) {
    const o = a[u],
      s = r[o]
    s && s.get ? Object.defineProperty(i, o, s) : (i[o] = s ? s.value : void 0)
  }
  return i
}
function Dr(e, ...t) {
  if (q in e) {
    const i = new Set(t.length > 1 ? t.flat() : t[0]),
      a = t.map(
        (u) =>
          new Proxy(
            {
              get(o) {
                return u.includes(o) ? e[o] : void 0
              },
              has(o) {
                return u.includes(o) && o in e
              },
              keys() {
                return u.filter((o) => o in e)
              }
            },
            Ct
          )
      )
    return (
      a.push(
        new Proxy(
          {
            get(u) {
              return i.has(u) ? void 0 : e[u]
            },
            has(u) {
              return i.has(u) ? !1 : u in e
            },
            keys() {
              return Object.keys(e).filter((u) => !i.has(u))
            }
          },
          Ct
        )
      ),
      a
    )
  }
  const n = {},
    r = t.map(() => ({}))
  for (const i of Object.getOwnPropertyNames(e)) {
    const a = Object.getOwnPropertyDescriptor(e, i),
      u = !a.get && !a.set && a.enumerable && a.writable && a.configurable
    let o = !1,
      s = 0
    for (const c of t) c.includes(i) && ((o = !0), u ? (r[s][i] = a.value) : Object.defineProperty(r[s], i, a)), ++s
    o || (u ? (n[i] = a.value) : Object.defineProperty(n, i, a))
  }
  return [...r, n]
}
let wr = 0
function Ge() {
  const e = k.context
  return e ? `${e.id}${e.count++}` : `cl-${wr++}`
}
const Er = (e) => `Stale read from <${e}>.`
function Z(e) {
  const t = 'fallback' in e && { fallback: () => e.fallback }
  return M(dn(() => e.each, e.children, t || void 0))
}
function j(e) {
  const t = e.keyed,
    n = M(() => e.when, void 0, { equals: (r, i) => (t ? r === i : !r == !i) })
  return M(
    () => {
      const r = n()
      if (r) {
        const i = e.children
        return typeof i == 'function' && i.length > 0
          ? Y(() =>
              i(
                t
                  ? r
                  : () => {
                      if (!Y(n)) throw Er('Show')
                      return e.when
                    }
              )
            )
          : i
      }
      return e.fallback
    },
    void 0,
    void 0
  )
}
const yr = [
    'allowfullscreen',
    'async',
    'autofocus',
    'autoplay',
    'checked',
    'controls',
    'default',
    'disabled',
    'formnovalidate',
    'hidden',
    'indeterminate',
    'inert',
    'ismap',
    'loop',
    'multiple',
    'muted',
    'nomodule',
    'novalidate',
    'open',
    'playsinline',
    'readonly',
    'required',
    'reversed',
    'seamless',
    'selected'
  ],
  Cr = new Set(['className', 'value', 'readOnly', 'formNoValidate', 'isMap', 'noModule', 'playsInline', ...yr]),
  Ar = new Set(['innerHTML', 'textContent', 'innerText', 'children']),
  $r = Object.assign(Object.create(null), { className: 'class', htmlFor: 'for' }),
  _r = Object.assign(Object.create(null), {
    class: 'className',
    formnovalidate: { $: 'formNoValidate', BUTTON: 1, INPUT: 1 },
    ismap: { $: 'isMap', IMG: 1 },
    nomodule: { $: 'noModule', SCRIPT: 1 },
    playsinline: { $: 'playsInline', VIDEO: 1 },
    readonly: { $: 'readOnly', INPUT: 1, TEXTAREA: 1 }
  })
function Sr(e, t) {
  const n = _r[e]
  return typeof n == 'object' ? (n[t] ? n.$ : void 0) : n
}
const br = new Set([
    'beforeinput',
    'click',
    'dblclick',
    'contextmenu',
    'focusin',
    'focusout',
    'input',
    'keydown',
    'keyup',
    'mousedown',
    'mousemove',
    'mouseout',
    'mouseover',
    'mouseup',
    'pointerdown',
    'pointermove',
    'pointerout',
    'pointerover',
    'pointerup',
    'touchend',
    'touchmove',
    'touchstart'
  ]),
  Br = new Set([
    'altGlyph',
    'altGlyphDef',
    'altGlyphItem',
    'animate',
    'animateColor',
    'animateMotion',
    'animateTransform',
    'circle',
    'clipPath',
    'color-profile',
    'cursor',
    'defs',
    'desc',
    'ellipse',
    'feBlend',
    'feColorMatrix',
    'feComponentTransfer',
    'feComposite',
    'feConvolveMatrix',
    'feDiffuseLighting',
    'feDisplacementMap',
    'feDistantLight',
    'feFlood',
    'feFuncA',
    'feFuncB',
    'feFuncG',
    'feFuncR',
    'feGaussianBlur',
    'feImage',
    'feMerge',
    'feMergeNode',
    'feMorphology',
    'feOffset',
    'fePointLight',
    'feSpecularLighting',
    'feSpotLight',
    'feTile',
    'feTurbulence',
    'filter',
    'font',
    'font-face',
    'font-face-format',
    'font-face-name',
    'font-face-src',
    'font-face-uri',
    'foreignObject',
    'g',
    'glyph',
    'glyphRef',
    'hkern',
    'image',
    'line',
    'linearGradient',
    'marker',
    'mask',
    'metadata',
    'missing-glyph',
    'mpath',
    'path',
    'pattern',
    'polygon',
    'polyline',
    'radialGradient',
    'rect',
    'set',
    'stop',
    'svg',
    'switch',
    'symbol',
    'text',
    'textPath',
    'tref',
    'tspan',
    'use',
    'view',
    'vkern'
  ]),
  kr = { xlink: 'http://www.w3.org/1999/xlink', xml: 'http://www.w3.org/XML/1998/namespace' }
function pr(e, t, n) {
  let r = n.length,
    i = t.length,
    a = r,
    u = 0,
    o = 0,
    s = t[i - 1].nextSibling,
    c = null
  for (; u < i || o < a; ) {
    if (t[u] === n[o]) {
      u++, o++
      continue
    }
    for (; t[i - 1] === n[a - 1]; ) i--, a--
    if (i === u) {
      const l = a < r ? (o ? n[o - 1].nextSibling : n[a - o]) : s
      for (; o < a; ) e.insertBefore(n[o++], l)
    } else if (a === o) for (; u < i; ) (!c || !c.has(t[u])) && t[u].remove(), u++
    else if (t[u] === n[a - 1] && n[o] === t[i - 1]) {
      const l = t[--i].nextSibling
      e.insertBefore(n[o++], t[u++].nextSibling), e.insertBefore(n[--a], l), (t[i] = n[a])
    } else {
      if (!c) {
        c = new Map()
        let f = o
        for (; f < a; ) c.set(n[f], f++)
      }
      const l = c.get(t[u])
      if (l != null)
        if (o < l && l < a) {
          let f = u,
            d = 1,
            g
          for (; ++f < i && f < a && !((g = c.get(t[f])) == null || g !== l + d); ) d++
          if (d > l - o) {
            const h = t[u]
            for (; o < l; ) e.insertBefore(n[o++], h)
          } else e.replaceChild(n[o++], t[u++])
        } else u++
      else t[u++].remove()
    }
  }
}
const Ut = '_$DX_DELEGATE'
function gn(e, t, n, r = {}) {
  let i
  return (
    Qe((a) => {
      ;(i = a), t === document ? e() : m(t, e(), t.firstChild ? null : void 0, n)
    }, r.owner),
    () => {
      i(), (t.textContent = '')
    }
  )
}
function A(e, t, n) {
  let r
  const i = () => {
      const u = document.createElement('template')
      return (u.innerHTML = e), n ? u.content.firstChild.firstChild : u.content.firstChild
    },
    a = t ? () => Y(() => document.importNode(r || (r = i()), !0)) : () => (r || (r = i())).cloneNode(!0)
  return (a.cloneNode = a), a
}
function X(e, t = window.document) {
  const n = t[Ut] || (t[Ut] = new Set())
  for (let r = 0, i = e.length; r < i; r++) {
    const a = e[r]
    n.has(a) || (n.add(a), t.addEventListener(a, Ir))
  }
}
function W(e, t, n) {
  k.context || (n == null ? e.removeAttribute(t) : e.setAttribute(t, n))
}
function xr(e, t, n, r) {
  k.context || (r == null ? e.removeAttributeNS(t, n) : e.setAttributeNS(t, n, r))
}
function se(e, t) {
  k.context || (t == null ? e.removeAttribute('class') : (e.className = t))
}
function Bt(e, t, n, r) {
  if (r) Array.isArray(n) ? ((e[`$$${t}`] = n[0]), (e[`$$${t}Data`] = n[1])) : (e[`$$${t}`] = n)
  else if (Array.isArray(n)) {
    const i = n[0]
    e.addEventListener(t, (n[0] = (a) => i.call(e, n[1], a)))
  } else e.addEventListener(t, n)
}
function Tr(e, t, n = {}) {
  const r = Object.keys(t || {}),
    i = Object.keys(n)
  let a, u
  for (a = 0, u = i.length; a < u; a++) {
    const o = i[a]
    !o || o === 'undefined' || t[o] || (Gt(e, o, !1), delete n[o])
  }
  for (a = 0, u = r.length; a < u; a++) {
    const o = r[a],
      s = !!t[o]
    !o || o === 'undefined' || n[o] === s || !s || (Gt(e, o, !0), (n[o] = s))
  }
  return n
}
function z(e, t, n) {
  if (!t) return n ? W(e, 'style') : t
  const r = e.style
  if (typeof t == 'string') return (r.cssText = t)
  typeof n == 'string' && (r.cssText = n = void 0), n || (n = {}), t || (t = {})
  let i, a
  for (a in n) t[a] == null && r.removeProperty(a), delete n[a]
  for (a in t) (i = t[a]), i !== n[a] && (r.setProperty(a, i), (n[a] = i))
  return n
}
function Mr(e, t = {}, n, r) {
  const i = {}
  return (
    r || L(() => (i.children = Le(e, t.children, i.children))),
    L(() => t.ref && t.ref(e)),
    L(() => Fr(e, t, n, !0, i, !0)),
    i
  )
}
function G(e, t, n) {
  return Y(() => e(t, n))
}
function m(e, t, n, r) {
  if ((n !== void 0 && !r && (r = []), typeof t != 'function')) return Le(e, t, r, n)
  L((i) => Le(e, t(), i, n), r)
}
function Fr(e, t, n, r, i = {}, a = !1) {
  t || (t = {})
  for (const u in i)
    if (!(u in t)) {
      if (u === 'children') continue
      i[u] = Zt(e, u, null, i[u], n, a)
    }
  for (const u in t) {
    if (u === 'children') {
      r || Le(e, t.children)
      continue
    }
    const o = t[u]
    i[u] = Zt(e, u, o, i[u], n, a)
  }
}
function Lr(e, t, n = {}) {
  ;(k.completed = globalThis._$HY.completed),
    (k.events = globalThis._$HY.events),
    (k.load = (i) => globalThis._$HY.r[i]),
    (k.has = (i) => i in globalThis._$HY.r),
    (k.gather = (i) => zt(t, i)),
    (k.registry = new Map()),
    (k.context = { id: n.renderId || '', count: 0 }),
    zt(t, n.renderId)
  const r = gn(e, t, [...t.childNodes], n)
  return (k.context = null), r
}
function Or(e) {
  let t, n
  return !k.context || !(t = k.registry.get((n = Pr())))
    ? e()
    : (k.completed && k.completed.add(t), k.registry.delete(n), t)
}
function Rr(e) {
  return e.toLowerCase().replace(/-([a-z])/g, (t, n) => n.toUpperCase())
}
function Gt(e, t, n) {
  const r = t.trim().split(/\s+/)
  for (let i = 0, a = r.length; i < a; i++) e.classList.toggle(r[i], n)
}
function Zt(e, t, n, r, i, a) {
  let u, o, s, c, l
  if (t === 'style') return z(e, n, r)
  if (t === 'classList') return Tr(e, n, r)
  if (n === r) return r
  if (t === 'ref') a || n(e)
  else if (t.slice(0, 3) === 'on:') {
    const f = t.slice(3)
    r && e.removeEventListener(f, r), n && e.addEventListener(f, n)
  } else if (t.slice(0, 10) === 'oncapture:') {
    const f = t.slice(10)
    r && e.removeEventListener(f, r, !0), n && e.addEventListener(f, n, !0)
  } else if (t.slice(0, 2) === 'on') {
    const f = t.slice(2).toLowerCase(),
      d = br.has(f)
    if (!d && r) {
      const g = Array.isArray(r) ? r[0] : r
      e.removeEventListener(f, g)
    }
    ;(d || n) && (Bt(e, f, n, d), d && X([f]))
  } else if (t.slice(0, 5) === 'attr:') W(e, t.slice(5), n)
  else if (
    (l = t.slice(0, 5) === 'prop:') ||
    (s = Ar.has(t)) ||
    (!i && ((c = Sr(t, e.tagName)) || (o = Cr.has(t)))) ||
    (u = e.nodeName.includes('-'))
  ) {
    if (l) (t = t.slice(5)), (o = !0)
    else if (k.context) return n
    t === 'class' || t === 'className' ? se(e, n) : u && !o && !s ? (e[Rr(t)] = n) : (e[c || t] = n)
  } else {
    const f = i && t.indexOf(':') > -1 && kr[t.split(':')[0]]
    f ? xr(e, f, t, n) : W(e, $r[t] || t, n)
  }
  return n
}
function Ir(e) {
  const t = `$$${e.type}`
  let n = (e.composedPath && e.composedPath()[0]) || e.target
  for (
    e.target !== n && Object.defineProperty(e, 'target', { configurable: !0, value: n }),
      Object.defineProperty(e, 'currentTarget', {
        configurable: !0,
        get() {
          return n || document
        }
      }),
      k.registry && !k.done && (k.done = _$HY.done = !0);
    n;

  ) {
    const r = n[t]
    if (r && !n.disabled) {
      const i = n[`${t}Data`]
      if ((i !== void 0 ? r.call(n, i, e) : r.call(n, e), e.cancelBubble)) return
    }
    n = n._$host || n.parentNode || n.host
  }
}
function Le(e, t, n, r, i) {
  if (k.context) {
    !n && (n = [...e.childNodes])
    let o = []
    for (let s = 0; s < n.length; s++) {
      const c = n[s]
      c.nodeType === 8 && c.data.slice(0, 2) === '!$' ? c.remove() : o.push(c)
    }
    n = o
  }
  for (; typeof n == 'function'; ) n = n()
  if (t === n) return n
  const a = typeof t,
    u = r !== void 0
  if (((e = (u && n[0] && n[0].parentNode) || e), a === 'string' || a === 'number')) {
    if (k.context) return n
    if ((a === 'number' && (t = t.toString()), u)) {
      let o = n[0]
      o && o.nodeType === 3 ? o.data !== t && (o.data = t) : (o = document.createTextNode(t)), (n = pe(e, n, r, o))
    } else n !== '' && typeof n == 'string' ? (n = e.firstChild.data = t) : (n = e.textContent = t)
  } else if (t == null || a === 'boolean') {
    if (k.context) return n
    n = pe(e, n, r)
  } else {
    if (a === 'function')
      return (
        L(() => {
          let o = t()
          for (; typeof o == 'function'; ) o = o()
          n = Le(e, o, n, r)
        }),
        () => n
      )
    if (Array.isArray(t)) {
      const o = [],
        s = n && Array.isArray(n)
      if (At(o, t, n, i)) return L(() => (n = Le(e, o, n, r, !0))), () => n
      if (k.context) {
        if (!o.length) return n
        if (r === void 0) return [...e.childNodes]
        let c = o[0],
          l = [c]
        for (; (c = c.nextSibling) !== r; ) l.push(c)
        return (n = l)
      }
      if (o.length === 0) {
        if (((n = pe(e, n, r)), u)) return n
      } else s ? (n.length === 0 ? qt(e, o, r) : pr(e, n, o)) : (n && pe(e), qt(e, o))
      n = o
    } else if (t.nodeType) {
      if (k.context && t.parentNode) return (n = u ? [t] : t)
      if (Array.isArray(n)) {
        if (u) return (n = pe(e, n, r, t))
        pe(e, n, null, t)
      } else n == null || n === '' || !e.firstChild ? e.appendChild(t) : e.replaceChild(t, e.firstChild)
      n = t
    }
  }
  return n
}
function At(e, t, n, r) {
  let i = !1
  for (let a = 0, u = t.length; a < u; a++) {
    let o = t[a],
      s = n && n[a],
      c
    if (!(o == null || o === !0 || o === !1))
      if ((c = typeof o) == 'object' && o.nodeType) e.push(o)
      else if (Array.isArray(o)) i = At(e, o, s) || i
      else if (c === 'function')
        if (r) {
          for (; typeof o == 'function'; ) o = o()
          i = At(e, Array.isArray(o) ? o : [o], Array.isArray(s) ? s : [s]) || i
        } else e.push(o), (i = !0)
      else {
        const l = String(o)
        s && s.nodeType === 3 && s.data === l ? e.push(s) : e.push(document.createTextNode(l))
      }
  }
  return i
}
function qt(e, t, n = null) {
  for (let r = 0, i = t.length; r < i; r++) e.insertBefore(t[r], n)
}
function pe(e, t, n, r) {
  if (n === void 0) return (e.textContent = '')
  const i = r || document.createTextNode('')
  if (t.length) {
    let a = !1
    for (let u = t.length - 1; u >= 0; u--) {
      const o = t[u]
      if (i !== o) {
        const s = o.parentNode === e
        !a && !u ? (s ? e.replaceChild(i, o) : e.insertBefore(i, n)) : s && o.remove()
      } else a = !0
    }
  } else e.insertBefore(i, n)
  return [i]
}
function zt(e, t) {
  const n = e.querySelectorAll('*[data-hk]')
  for (let r = 0; r < n.length; r++) {
    const i = n[r],
      a = i.getAttribute('data-hk')
    ;(!t || a.startsWith(t)) && !k.registry.has(a) && k.registry.set(a, i)
  }
}
function Pr() {
  const e = k.context
  return `${e.id}${e.count++}`
}
const Hr = 'http://www.w3.org/2000/svg'
function Nr(e, t = !1) {
  return t ? document.createElementNS(Hr, e) : document.createElement(e)
}
const jr = (...e) => (vr(), Lr(...e))
function hn(e) {
  const [t, n] = Dr(e, ['component']),
    r = M(() => t.component)
  return M(() => {
    const i = r()
    switch (typeof i) {
      case 'function':
        return Y(() => i(n))
      case 'string':
        const a = Br.has(i),
          u = k.context ? Or() : Nr(i, a)
        return Mr(u, n, a), u
    }
  })
}
const Ze = Symbol('store-raw'),
  ue = Symbol('store-node'),
  ne = Symbol('store-has'),
  vn = Symbol('store-self')
function mn(e) {
  let t = e[q]
  if (!t && (Object.defineProperty(e, q, { value: (t = new Proxy(e, Gr)) }), !Array.isArray(e))) {
    const n = Object.keys(e),
      r = Object.getOwnPropertyDescriptors(e)
    for (let i = 0, a = n.length; i < a; i++) {
      const u = n[i]
      r[u].get && Object.defineProperty(e, u, { enumerable: r[u].enumerable, get: r[u].get.bind(t) })
    }
  }
  return t
}
function ve(e) {
  let t
  return (
    e != null &&
    typeof e == 'object' &&
    (e[q] || !(t = Object.getPrototypeOf(e)) || t === Object.prototype || Array.isArray(e))
  )
}
function Ce(e, t = new Set()) {
  let n, r, i, a
  if ((n = e != null && e[Ze])) return n
  if (!ve(e) || t.has(e)) return e
  if (Array.isArray(e)) {
    Object.isFrozen(e) ? (e = e.slice(0)) : t.add(e)
    for (let u = 0, o = e.length; u < o; u++) (i = e[u]), (r = Ce(i, t)) !== i && (e[u] = r)
  } else {
    Object.isFrozen(e) ? (e = Object.assign({}, e)) : t.add(e)
    const u = Object.keys(e),
      o = Object.getOwnPropertyDescriptors(e)
    for (let s = 0, c = u.length; s < c; s++) (a = u[s]), !o[a].get && ((i = e[a]), (r = Ce(i, t)) !== i && (e[a] = r))
  }
  return e
}
function Oe(e, t) {
  let n = e[t]
  return n || Object.defineProperty(e, t, { value: (n = Object.create(null)) }), n
}
function Be(e, t, n) {
  if (e[t]) return e[t]
  const [r, i] = N(n, { equals: !1, internal: !0 })
  return (r.$ = i), (e[t] = r)
}
function Ur(e, t) {
  const n = Reflect.getOwnPropertyDescriptor(e, t)
  return (
    !n ||
      n.get ||
      !n.configurable ||
      t === q ||
      t === ue ||
      (delete n.value, delete n.writable, (n.get = () => e[q][t])),
    n
  )
}
function kt(e) {
  Ue() && Be(Oe(e, ue), vn)()
}
function Dn(e) {
  return kt(e), Reflect.ownKeys(e)
}
const Gr = {
  get(e, t, n) {
    if (t === Ze) return e
    if (t === q) return n
    if (t === Ne) return kt(e), n
    const r = Oe(e, ue),
      i = r[t]
    let a = i ? i() : e[t]
    if (t === ue || t === ne || t === '__proto__') return a
    if (!i) {
      const u = Object.getOwnPropertyDescriptor(e, t)
      Ue() && (typeof a != 'function' || e.hasOwnProperty(t)) && !(u && u.get) && (a = Be(r, t, a)())
    }
    return ve(a) ? mn(a) : a
  },
  has(e, t) {
    return t === Ze || t === q || t === Ne || t === ue || t === ne || t === '__proto__'
      ? !0
      : (Ue() && Be(Oe(e, ne), t)(), t in e)
  },
  set() {
    return !0
  },
  deleteProperty() {
    return !0
  },
  ownKeys: Dn,
  getOwnPropertyDescriptor: Ur
}
function Q(e, t, n, r = !1) {
  if (!r && e[t] === n) return
  const i = e[t],
    a = e.length
  n === void 0
    ? (delete e[t], e[ne] && e[ne][t] && i !== void 0 && e[ne][t].$())
    : ((e[t] = n), e[ne] && e[ne][t] && i === void 0 && e[ne][t].$())
  let u = Oe(e, ue),
    o
  if (((o = Be(u, t, i)) && o.$(() => n), Array.isArray(e) && e.length !== a)) {
    for (let s = e.length; s < a; s++) (o = u[s]) && o.$()
    ;(o = Be(u, 'length', a)) && o.$(e.length)
  }
  ;(o = u[vn]) && o.$()
}
function wn(e, t) {
  const n = Object.keys(t)
  for (let r = 0; r < n.length; r += 1) {
    const i = n[r]
    Q(e, i, t[i])
  }
}
function Zr(e, t) {
  if ((typeof t == 'function' && (t = t(e)), (t = Ce(t)), Array.isArray(t))) {
    if (e === t) return
    let n = 0,
      r = t.length
    for (; n < r; n++) {
      const i = t[n]
      e[n] !== i && Q(e, n, i)
    }
    Q(e, 'length', r)
  } else wn(e, t)
}
function Pe(e, t, n = []) {
  let r,
    i = e
  if (t.length > 1) {
    r = t.shift()
    const u = typeof r,
      o = Array.isArray(e)
    if (Array.isArray(r)) {
      for (let s = 0; s < r.length; s++) Pe(e, [r[s]].concat(t), n)
      return
    } else if (o && u === 'function') {
      for (let s = 0; s < e.length; s++) r(e[s], s) && Pe(e, [s].concat(t), n)
      return
    } else if (o && u === 'object') {
      const { from: s = 0, to: c = e.length - 1, by: l = 1 } = r
      for (let f = s; f <= c; f += l) Pe(e, [f].concat(t), n)
      return
    } else if (t.length > 1) {
      Pe(e[r], t, [r].concat(n))
      return
    }
    ;(i = e[r]), (n = [r].concat(n))
  }
  let a = t[0]
  ;(typeof a == 'function' && ((a = a(i, n)), a === i)) ||
    (r === void 0 && a == null) ||
    ((a = Ce(a)), r === void 0 || (ve(i) && ve(a) && !Array.isArray(a)) ? wn(i, a) : Q(e, r, a))
}
function qr(...[e, t]) {
  const n = Ce(e || {}),
    r = Array.isArray(n),
    i = mn(n)
  function a(...u) {
    oe(() => {
      r && u.length === 1 ? Zr(n, u[0]) : Pe(n, u)
    })
  }
  return [i, a]
}
function zr(e, t) {
  const n = Reflect.getOwnPropertyDescriptor(e, t)
  return (
    !n ||
      n.get ||
      n.set ||
      !n.configurable ||
      t === q ||
      t === ue ||
      (delete n.value, delete n.writable, (n.get = () => e[q][t]), (n.set = (r) => (e[q][t] = r))),
    n
  )
}
const Wr = {
  get(e, t, n) {
    if (t === Ze) return e
    if (t === q) return n
    if (t === Ne) return kt(e), n
    const r = Oe(e, ue),
      i = r[t]
    let a = i ? i() : e[t]
    if (t === ue || t === ne || t === '__proto__') return a
    if (!i) {
      const u = Object.getOwnPropertyDescriptor(e, t),
        o = typeof a == 'function'
      if (Ue() && (!o || e.hasOwnProperty(t)) && !(u && u.get)) a = Be(r, t, a)()
      else if (a != null && o && a === Array.prototype[t]) return (...s) => oe(() => Array.prototype[t].apply(n, s))
    }
    return ve(a) ? En(a) : a
  },
  has(e, t) {
    return t === Ze || t === q || t === Ne || t === ue || t === ne || t === '__proto__'
      ? !0
      : (Ue() && Be(Oe(e, ne), t)(), t in e)
  },
  set(e, t, n) {
    return oe(() => Q(e, t, Ce(n))), !0
  },
  deleteProperty(e, t) {
    return oe(() => Q(e, t, void 0, !0)), !0
  },
  ownKeys: Dn,
  getOwnPropertyDescriptor: zr
}
function En(e) {
  let t = e[q]
  if (!t) {
    Object.defineProperty(e, q, { value: (t = new Proxy(e, Wr)) })
    const n = Object.keys(e),
      r = Object.getOwnPropertyDescriptors(e),
      i = Object.getPrototypeOf(e),
      a = e !== null && typeof e == 'object' && !Array.isArray(e) && i !== Object.prototype
    if (a) {
      const u = Object.getOwnPropertyDescriptors(i)
      n.push(...Object.keys(u)), Object.assign(r, u)
    }
    for (let u = 0, o = n.length; u < o; u++) {
      const s = n[u]
      if (!(a && s === 'constructor')) {
        if (r[s].get) {
          const c = r[s].get.bind(t)
          Object.defineProperty(e, s, { get: c, configurable: !0 })
        }
        if (r[s].set) {
          const c = r[s].set
          Object.defineProperty(e, s, { set: (f) => oe(() => c.call(t, f)), configurable: !0 })
        }
      }
    }
  }
  return t
}
function yn(e, t) {
  const n = Ce(e || {})
  return En(n)
}
const $t = Symbol('store-root')
function Fe(e, t, n, r, i) {
  const a = t[n]
  if (e === a) return
  const u = Array.isArray(e)
  if (n !== $t && (!ve(e) || !ve(a) || u !== Array.isArray(a) || (i && e[i] !== a[i]))) {
    Q(t, n, e)
    return
  }
  if (u) {
    if (e.length && a.length && (!r || (i && e[0] && e[0][i] != null))) {
      let c, l, f, d, g, h, v, E
      for (
        f = 0, d = Math.min(a.length, e.length);
        f < d && (a[f] === e[f] || (i && a[f] && e[f] && a[f][i] === e[f][i]));
        f++
      )
        Fe(e[f], a, f, r, i)
      const $ = new Array(e.length),
        _ = new Map()
      for (
        d = a.length - 1, g = e.length - 1;
        d >= f && g >= f && (a[d] === e[g] || (i && a[f] && e[f] && a[d][i] === e[g][i]));
        d--, g--
      )
        $[g] = a[d]
      if (f > g || f > d) {
        for (l = f; l <= g; l++) Q(a, l, e[l])
        for (; l < e.length; l++) Q(a, l, $[l]), Fe(e[l], a, l, r, i)
        a.length > e.length && Q(a, 'length', e.length)
        return
      }
      for (v = new Array(g + 1), l = g; l >= f; l--)
        (h = e[l]), (E = i && h ? h[i] : h), (c = _.get(E)), (v[l] = c === void 0 ? -1 : c), _.set(E, l)
      for (c = f; c <= d; c++)
        (h = a[c]),
          (E = i && h ? h[i] : h),
          (l = _.get(E)),
          l !== void 0 && l !== -1 && (($[l] = a[c]), (l = v[l]), _.set(E, l))
      for (l = f; l < e.length; l++) l in $ ? (Q(a, l, $[l]), Fe(e[l], a, l, r, i)) : Q(a, l, e[l])
    } else for (let c = 0, l = e.length; c < l; c++) Fe(e[c], a, c, r, i)
    a.length > e.length && Q(a, 'length', e.length)
    return
  }
  const o = Object.keys(e)
  for (let c = 0, l = o.length; c < l; c++) Fe(e[o[c]], a, o[c], r, i)
  const s = Object.keys(a)
  for (let c = 0, l = s.length; c < l; c++) e[s[c]] === void 0 && Q(a, s[c], void 0)
}
function Kr(e, t = {}) {
  const { merge: n, key: r = 'id' } = t,
    i = Ce(e)
  return (a) => {
    if (!ve(a) || !ve(i)) return i
    const u = Fe(i, { [$t]: a }, $t, n, r)
    return u === void 0 ? a : u
  }
}
var Yr = A('<div class=fec-modal-container><div class=modal-wrapper>'),
  gt = 0,
  Ve = 0,
  [xe, Te] = N(!1)
function Ae(e, t) {
  gt++
  const n = gt,
    [r, i] = N(null),
    [a, u] = N(null),
    [o, s] = N(null),
    [c, l] = N({ top: '0px', left: '0px' }),
    f = () => {
      Te(!1),
        setTimeout(() => {
          const C = a(),
            S = o()
          if (!C || !S) return
          const B = C.getBoundingClientRect(),
            w = S.getBoundingClientRect(),
            x = B.top
          w.height < x
            ? l({ top: B.top - w.height - 10 + 'px', left: B.left + B.width / 2 + 'px' })
            : l({ top: B.top + B.height - 10 + 'px', left: B.left + B.width / 2 + 'px' }),
            setTimeout(() => {
              ;(Ve = n), Te(!0)
            }, 0)
        }, 0)
    },
    d = ee()
  function g() {
    const C = d == null ? void 0 : d.querySelector('.fec-scroll-wrapper')
    C == null || C.addEventListener('scroll', $), document.addEventListener('scroll', $)
  }
  function h() {
    const C = d == null ? void 0 : d.querySelector('.fec-scroll-wrapper')
    C == null || C.removeEventListener('scroll', $), document.removeEventListener('scroll', $)
  }
  $e(() => {
    var C
    d && ((C = d.querySelector('#fec-scroll-wrapper')) == null || C.addEventListener('scroll', () => {}))
  }),
    le(() => {
      const C = a()
      C && C.removeEventListener('resize', f), (gt = 0)
      const S = o()
      S && S.removeEventListener('resize', f)
    })
  function v(C, S) {
    const B = (w) => {
      var R, U, J, ae, we, _e, T
      w.preventDefault(), w.stopPropagation()
      let x =
        (R = a()) != null && R.classList.contains('fec-event')
          ? (U = a()) == null
            ? void 0
            : U.id
          : (ae = (J = a()) == null ? void 0 : J.querySelector('.fec-event')) == null
          ? void 0
          : ae.id
      return (
        !C.contains(w.target) &&
        w.target !== a() &&
        !((we = a()) != null && we.contains(w.target)) &&
        ((_e = w.target) == null ? void 0 : _e.id) !== x &&
        ((T = S()) == null ? void 0 : T())
      )
    }
    document.addEventListener('mousedown', B), le(() => document.removeEventListener('mousedown', B))
  }
  let E = { el: null }
  function $() {
    Te(!1), h(), i(null), l({ top: '0px', left: '0px' }), t && t()
  }
  function _() {
    Ve === n
      ? setTimeout(() => {
          xe() && (Te(!1), h(), i(null), l({ top: '0px', left: '0px' }), t && t())
        }, 0)
      : xe() && (i(null), t && t())
  }
  function F() {
    Te(!1), h(), i(null), t && t()
  }
  ce(E, () => ({ eventData: r(), saveModal: F }), e, r)
  const p = (() => {
    var C = Yr(),
      S = C.firstChild
    G(s, C)
    var B = E.el
    return (
      typeof B == 'function' ? G(B, S) : (E.el = S),
      G(v, S, () => _),
      L((w) =>
        z(
          C,
          {
            position: 'fixed',
            ...c(),
            opacity: xe() && Ve === n ? '1' : '0',
            'pointer-events': xe() && Ve === n ? 'all' : 'none'
          },
          w
        )
      ),
      C
    )
  })()
  function I(C) {
    xe() || (u(C), f(), g())
  }
  return {
    modalElementNode: p,
    isSlotModalOpen: xe,
    setTargetElRef: u,
    setSlotModalData: i,
    setIsModalOpen: Te,
    slotModalData: r,
    openSlotModalOnElement: I
  }
}
var pt = bt(),
  Vr = (e) => {
    const t = { slotRenderer: e.slotRenderer, avalibalSots: e.avalibalSots, calendarContainer: e.calendarContainer }
    return D(pt.Provider, {
      value: t,
      get children() {
        return e.children
      }
    })
  }
function ee() {
  var e
  return (e = it(pt)) == null ? void 0 : e.calendarContainer
}
function ce(e, t, n, r) {
  const i = Ge(),
    a = it(pt),
    u = a.avalibalSots.includes(n)
  a.slotRenderer.dispatch({ name: n, target: e, data: t(), id: i })
  let o = !1
  return (
    ge(
      je(
        r,
        () => {
          o && a.slotRenderer.dispatch({ name: n, target: e, data: t(), id: i })
        },
        { defer: !0 }
      )
    ),
    $e(() => {
      o = !0
    }),
    le(() => {
      a.slotRenderer.remove(i)
    }),
    { isSlotAvalibale: u }
  )
}
var ht,
  vt,
  mt,
  Dt,
  Xr = class {
    constructor(e, t, n) {
      y(this, 'mouseDown', !1)
      y(this, 'wrapperContainer')
      y(this, 'handelMouseUp')
      y(this, 'handelMouseMove')
      y(this, 'mouseMoveHandeleler')
      y(this, 'isMouseoutsideTheContainer')
      ;(this.mouseDown = !0), (this.wrapperContainer = e), this.registerListners(t, n)
    }
    registerListners(e, t) {
      var r, i, a, u
      let n = this
      ;(ht = (o) => {
        ;(n.mouseDown = !0), e(o)
      }),
        (vt = (o) => {
          t(o), (n.mouseDown = !1)
        }),
        (mt = () => {
          n.isMouseoutsideTheContainer = !1
        }),
        (Dt = () => {
          n.isMouseoutsideTheContainer = !0
        }),
        document.addEventListener('mousemove', ht),
        document.addEventListener('mouseup', vt),
        (i = (r = this.wrapperContainer) == null ? void 0 : r.current) == null || i.addEventListener('mouseenter', mt),
        (u = (a = this.wrapperContainer) == null ? void 0 : a.current) == null || u.addEventListener('mouseleave', Dt)
    }
    containerMouseEnter() {
      this.isMouseoutsideTheContainer = !1
    }
    containerMouseLeave() {
      this.isMouseoutsideTheContainer = !0
    }
    removeListenrs() {
      var e, t, n, r
      ;(t = (e = this.wrapperContainer) == null ? void 0 : e.current) == null ||
        t.removeEventListener('mouseenter', mt),
        (r = (n = this.wrapperContainer) == null ? void 0 : n.current) == null ||
          r.removeEventListener('mouseleave', Dt),
        document.removeEventListener('mouseup', vt),
        document.removeEventListener('mousemove', ht)
    }
  }
function xt(e) {
  if (((e = e || window.event), 'buttons' in e)) return e.buttons == 1
  var t = e.which || e.button
  return t == 1
}
var Cn = class {
  constructor(e, t) {
    y(this, 'event')
    y(this, 'oneHourInPixelSize')
    y(this, 'contaniner')
    var n
    ;(this.event = e),
      (this.contaniner = t),
      (this.oneHourInPixelSize =
        ((n = this.contaniner.querySelector('.fec-time-range')) == null ? void 0 : n.clientHeight) || 1)
  }
  getEventNode(e) {
    return e ? this.getClosestNode(e) : this.contaniner.querySelector(`#event-${this.event.id}`)
  }
  getEventTimeDetailesNode(e) {
    const t = this.getEventNode(e)
    return t == null ? void 0 : t.querySelector('.event-time-detals')
  }
  getClosestNode(e) {
    const t = this.contaniner.querySelectorAll(`#event-${this.event.id}`),
      n = e.clientX,
      r = e.clientY
    let i = null,
      a = 1 / 0
    return (
      t.forEach((u) => {
        const o = u.getBoundingClientRect(),
          s = o.left,
          c = o.right,
          l = o.top,
          f = o.bottom,
          d = [Math.abs(n - s), Math.abs(n - c), Math.abs(r - l), Math.abs(r - f)],
          g = Math.min(...d)
        g < a && ((a = g), (i = u))
      }),
      i
    )
  }
  getEelementReact(e) {
    const t = this.getEventNode(e)
    return t == null ? void 0 : t.getBoundingClientRect()
  }
  setEelementOpacity(e) {
    this.contaniner.querySelectorAll(`#event-${this.event.id}`).forEach((n) => {
      n.style.opacity = String(e)
    })
  }
  static previewAndEventTimeDiff(e, t, n) {
    const r = e + window.scrollY
    return (((t + window.scrollY - r) * 60) / n) * 6e4
  }
}
function An(e, t) {
  if (!e.isAllDay()) return 'fec-month-item-no-all-day'
  let n = me(t),
    r = de(t),
    i = !ze(e.end, t),
    a = !ze(e.start, t)
  return e.start < n && e.end > r
    ? 'fec-month-both-arrow'
    : i
    ? 'fec-month-right-arrow'
    : a
    ? 'fec-month-left-arrow'
    : 'month-no-arrow'
}
function Qr(e, t, n) {
  if (e.isAllDay && !e.isAllDay()) return 'fec-month-item-no-all-day'
  let r = me(t),
    i = de(n),
    a = e.start,
    u = e.end
  return e.start < r && e.end > i
    ? 'fec-month-both-arrow'
    : a >= r && u > i
    ? 'fec-month-right-arrow'
    : a < r && u < i
    ? 'fec-month-left-arrow'
    : 'month-no-arrow'
}
var ut = class extends Cn {
  constructor(t, n, r) {
    super(n, r)
    y(this, 'width', '')
    y(this, 'height', '')
    y(this, 'left', '')
    y(this, 'top', '')
    y(this, 'item')
    y(this, 'duration')
    y(this, 'dragedStartDate')
    y(this, 'dragedEndDate')
    y(this, 'animation')
    y(this, 'isDragg')
    y(this, 'mouseX')
    y(this, 'eventSourceStart')
    y(this, 'eventSourceEnd')
    y(this, 'Xdiff')
    y(this, 'Ydiff')
    const i = this.getEelementReact(t)
    i &&
      ((this.width = i.width + 'px'),
      (this.height = i.height + 2 + 'px'),
      (this.left = i.left + 0 + 'px'),
      (this.top = i.top + 0 + 'px'),
      (this.Xdiff = t.clientX - i.left),
      (this.Ydiff = t.clientY - i.top)),
      (this.item = n),
      (this.dragedStartDate = n.start),
      (this.dragedEndDate = n.end),
      (this.duration = n.duration),
      (this.animation = ''),
      (this.isDragg = !0),
      (this.mouseX = 0),
      (this.eventSourceStart = new Date(n.sourceEvent.start)),
      (this.eventSourceEnd = new Date(n.sourceEvent.end))
  }
  shiftTime(t) {
    const n = new Date(this.item.start.getTime() + t)
    n.setSeconds(0, 0), (this.dragedStartDate = Me(n))
    const r = new Date(this.item.end.getTime() + t)
    ;(this.dragedEndDate = Me(r)), this.shiftSource(t)
  }
  shiftTimeByDay(t) {
    const n = new Date(this.item.start)
    n.setDate(n.getDate() + t)
    const r = new Date(this.item.end)
    r.setDate(r.getDate() + t), (this.dragedEndDate = r), (this.dragedStartDate = n), this.shiftTimeByDaySource(t)
  }
  shiftTimeByDaySource(t) {
    const n = new Date(this.item.sourceEvent.start)
    n.setDate(n.getDate() + t)
    const r = new Date(this.item.sourceEvent.end)
    r.setDate(r.getDate() + t), (this.eventSourceEnd = r), (this.eventSourceStart = n)
  }
  shiftEndTime(t) {
    const n = new Date(this.item.end.getTime() + t)
    ;(this.dragedEndDate = Me(n)), this.shiftEndSource(t)
  }
  shiftEndByDay(t) {
    const n = new Date(this.item.end)
    n.setDate(n.getDate() + t), (this.dragedEndDate = n), this.shiftEndByDaySource(t)
  }
  shiftEndByDaySource(t) {
    const n = new Date(this.item.sourceEvent.end)
    n.setDate(n.getDate() + t), (this.eventSourceEnd = n)
  }
  shiftStartByDay(t) {
    const n = new Date(this.item.start)
    n.setDate(n.getDate() + t), (this.dragedStartDate = n), this.shiftStartByDaySource(t)
  }
  shiftStartByDaySource(t) {
    const n = new Date(this.item.sourceEvent.start)
    n.setDate(n.getDate() + t), (this.eventSourceStart = n)
  }
  shiftEndSource(t) {
    var n, r, i
    this.eventSourceEnd = Me(
      new Date(
        ((i =
          (r = (n = this == null ? void 0 : this.item) == null ? void 0 : n.sourceEvent) == null ? void 0 : r.end) ==
        null
          ? void 0
          : i.getTime()) + t
      )
    )
  }
  shiftSource(t) {
    var n, r, i, a, u, o
    ;(this.eventSourceStart = Me(
      new Date(
        ((i =
          (r = (n = this == null ? void 0 : this.item) == null ? void 0 : n.sourceEvent) == null ? void 0 : r.start) ==
        null
          ? void 0
          : i.getTime()) + t
      )
    )),
      (this.eventSourceEnd = Me(
        new Date(
          ((o =
            (u = (a = this == null ? void 0 : this.item) == null ? void 0 : a.sourceEvent) == null ? void 0 : u.end) ==
          null
            ? void 0
            : o.getTime()) + t
        )
      ))
  }
  shiftPoistion(t) {
    ;(this.left = t.clientX - this.Xdiff + 'px'), (this.top = t.clientY - this.Ydiff + 'px'), (this.mouseX = t.pageX)
  }
  static setState(t, n) {
    const r = n == null ? void 0 : n.getBoundingClientRect()
    ;(t.width = (n == null ? void 0 : n.clientWidth) + 2 + 'px'),
      (t.height = (n == null ? void 0 : n.clientHeight) + 2 + 'px'),
      (t.left = (r == null ? void 0 : r.left) + 'px'),
      (t.top = (r == null ? void 0 : r.top) + 'px'),
      (t.animation = 'all 0.5s;')
  }
}
function qe(e, t) {
  return e.filter((r) => ze(r.start, t) || ze(r.end, t) || (r.start < t && r.end > t))
}
function ze(e, t) {
  return e.getFullYear() === t.getFullYear() && e.getMonth() === t.getMonth() && e.getDate() === t.getDate()
}
function lt(e) {
  return e.sort(function (t, n) {
    return new Date(t.start).valueOf() - new Date(n.start).valueOf()
  })
}
var Jr = class {
    proccess(e, t) {
      return qe(e, t)
    }
  },
  ei = class {
    proccess(e, t) {
      const n = Ot(t)
      return ct(e, n[0], n[n.length - 1])
    }
  },
  ti = class {
    proccess(e, t, n = 'gregory') {
      const r = Ft(t, n)
      return ct(e, r[0].date, r[r.length - 1].date)
    }
  },
  ni = class {
    constructor(e) {
      y(this, 'handle')
      switch (e) {
        case 'day':
          this.handle = new Jr()
          break
        case 'week':
          this.handle = new ei()
          break
        case 'month':
          this.handle = new ti()
          break
      }
    }
  },
  ri = class extends ni {
    constructor(t, n, r = 'gregory') {
      super(t)
      y(this, 'calendar')
      y(this, 'initialDate')
      ;(this.calendar = r), (this.initialDate = n)
    }
    filter(t) {
      return lt(this.handle.proccess(t, this.initialDate, this.calendar))
    }
  }
function st(e, t = 'gregory') {
  return new Intl.DateTimeFormat('en-US', { month: '2-digit', day: '2-digit', year: 'numeric', calendar: t }).format(e)
}
function ii(e, t, n) {
  return new Intl.DateTimeFormat(n, { month: 'short', weekday: 'short', calendar: t }).format(e)
}
function ai(e, t, n) {
  return new Intl.DateTimeFormat(n, { day: '2-digit', calendar: t }).format(e)
}
function Tt(e, t) {
  return new Intl.DateTimeFormat(t, { timeStyle: 'short', hourCycle: 'h24' }).format(e)
}
function oi(e, t, n) {
  const r = new Intl.DateTimeFormat(n, { hour: 'numeric', minute: 'numeric' })
  return `${r.format(e)} - ${r.format(t)}`
}
function Wt(e, t) {
  return t === 'Etc/Unknown'
    ? e
    : new Date((typeof e == 'string' ? new Date(e) : e).toLocaleString('en-US', { timeZone: t }))
}
function Mt(e, t) {
  const n = new Date(e.start)
  e.convertDateByTimeZone(t)
  const i = new Date(e.start).getTime() - n.getTime(),
    a = new ie({
      ...e.sourceEvent,
      start: new Date(e.sourceEvent.start.getTime() - i),
      end: new Date(e.sourceEvent.end.getTime() - i)
    })
  return a.convertDateByTimeZone(t), a
}
var ui = 10,
  ie = class {
    constructor(e) {
      y(this, 'id')
      y(this, 'start')
      y(this, 'end')
      y(this, 'name')
      y(this, 'duration')
      y(this, 'sourceEvent')
      y(this, 'color')
      y(this, 'groups')
      y(this, 'calendarId')
      ;(this.start = e.start),
        (this.end = e.end),
        (this.name = e.name),
        (this.id = e.id),
        (this.sourceEvent = e),
        (this.duration = Math.round((e.end.getTime() - e.start.getTime()) / 6e4)),
        (this.color = e.color || 'var(--primary)'),
        (this.groups = e.groups || []),
        (this.calendarId = 'fec-id-' + ui)
    }
    getEventLength() {
      return ''
    }
    isAllDay() {
      return this.duration / 60 >= 24
    }
    countDays() {
      return this.duration / 60 / 24
    }
    doesEventStartOn(e) {
      return (
        this.start.getFullYear() === e.getFullYear() &&
        this.start.getMonth() === e.getMonth() &&
        this.start.getDate() === e.getDate()
      )
    }
    doesEventEndOn(e) {
      return (
        this.end.getFullYear() === e.getFullYear() &&
        this.end.getMonth() === e.getMonth() &&
        this.end.getDate() === e.getDate()
      )
    }
    calculateHeight(e = !1) {
      return `;height:${this.calculateHeightPersentage(e)}%;`
    }
    calculateHeightPersentage(e = !1) {
      let t
      return (
        e ? (t = ((this.end.getHours() * 60 + this.end.getMinutes()) / 60) * 100) : (t = (this.duration / 60) * 100), t
      )
    }
    calculatePositionTop() {
      return `;top:${this.getEventTopPositionIng()}%`
    }
    isIncludedInaRange(e, t) {
      return this.start < t && this.end > e
    }
    checkOverLap(e) {
      const t = e.start,
        n = e.end,
        r = this.start,
        i = this.end
      return t < i && n > r
    }
    updateEventDetails(e) {
      e.start && ((this.start = e.start), (this.duration = Math.round((e.end.getTime() - e.start.getTime()) / 6e4))),
        e.end && ((this.end = e.end), (this.duration = Math.round((e.end.getTime() - e.start.getTime()) / 6e4))),
        e.name && (this.name = e.name),
        e.groups && (this.groups = e.groups),
        e.color && (this.color = e.color)
    }
    checkAllDayOverLap(e) {
      let t = me(e.start),
        n = me(this.start),
        r = de(e.end),
        i = de(this.end)
      return (
        !this.isAllDay() && !this.doesEventEndOn(this.start) && (i = de(this.start)),
        !e.isAllDay() && !e.doesEventEndOn(e.start) && (r = de(e.start)),
        t < i && r > n
      )
    }
    convertDateByTimeZone(e) {
      ;(this.start = Wt(this.sourceEvent.start, e)), (this.end = Wt(this.sourceEvent.end, e))
    }
    getEventTopPositionIng() {
      const e = (this.start.getHours() + this.start.getMinutes() / 60) * 100
      return e > 2358 ? 2358 : e
    }
    getIncludedDays() {
      let e = new Date(this.start),
        t = [new Date(e)]
      for (; !this.doesEventEndOn(e); ) e.setDate(e.getDate() + 1), t.push(new Date(e))
      return t
    }
  }
function He(e, t) {
  let r = new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    calendar: t
  }).formatToParts(e)
  return { ...li(r), date: new Date(e), isDateInsideMonth: !1 }
}
function li(e) {
  let t, n, r
  for (let i = 0; i < e.length; i++)
    e[i].type === 'year' || e[i].type === 'relatedYear'
      ? (t = e[i].value)
      : e[i].type === 'month'
      ? (n = e[i].value)
      : e[i].type === 'day' && (r = e[i].value)
  return { year: t, month: n, day: r }
}
function Ft(e, t) {
  let n = e
  const r = He(n, t),
    i = [r]
  let a = Number(r.month)
  const u = new Date(n)
  for (let s = 40; s > 0; s--) {
    u.setDate(u.getDate() - 1)
    const c = He(u, t),
      l = Number(c.month)
    if (a === l) i.unshift(c)
    else break
  }
  const o = new Date(n)
  for (let s = 0; s < 40; s++) {
    o.setDate(o.getDate() + 1)
    const c = He(o, t),
      l = Number(c.month)
    if (a === l) i.push(c)
    else break
  }
  return i
}
function si(e, t = 'gregory') {
  const n = Ft(e, t),
    r = n[0].date.getDay(),
    i = new Date(n[0].date)
  for (let o = r; o > 0; o--) {
    i.setDate(i.getDate() - 1)
    const s = He(i, t)
    n.unshift({ ...s, isDateInsideMonth: !0 })
  }
  const a = new Date(n[n.length - 1].date),
    u = a.getDay()
  for (let o = 0; o < 6 - u; o++) {
    a.setDate(a.getDate() + 1)
    const s = He(a, t)
    n.push({ ...s, isDateInsideMonth: !0 })
  }
  return n
}
function ci(e, t, n) {
  return new Intl.DateTimeFormat(n, { month: 'short', calendar: e }).format(t)
}
var di = (e, t) => {
  let n = []
  for (let r = 0; r < e.length; r += t) {
    const i = e.slice(r, r + t)
    n.push(i)
  }
  return n
}
function $n(e, t, n, r) {
  const i = new Date(e)
  return new Intl.DateTimeFormat(r, { weekday: 'short', calendar: t, timeZone: n }).format(i)
}
var fi = (e, t, n, r) =>
    Intl.DateTimeFormat(e, { calendar: t, timeZone: n })
      .formatToParts(r)
      .filter((o) => o.type === 'day')[0].value,
  ct = (e, t, n) => {
    const r = me(t),
      i = de(n)
    return e.filter((a) => (a.start >= r && a.start <= i) || (a.end >= r && a.end <= i) || (a.end >= i && a.start <= r))
  }
function gi(e, t, n) {
  const r = me(t),
    i = de(n)
  return e.start < i && e.end > r
}
function _n(e, t) {
  const n = me(e),
    r = me(t)
  return Math.round((r - n) / (1e3 * 60 * 60 * 24))
}
function be(e, t) {
  return new Intl.NumberFormat(e).format(Number(t))
}
function me(e) {
  const t = new Date(e)
  return t.setHours(0, 0, 0), t
}
function de(e) {
  const t = new Date(e)
  return t.setHours(23, 59, 59), t
}
function Me(e) {
  const t = Math.round(e.getMinutes() / 5) * 5,
    n = new Date(e)
  return n.setMinutes(t, 0, 0), n
}
function Sn(e) {
  return ze(e, new Date())
}
function Xe(e, t) {
  return t < 10 ? be(e, '0') + `${be(e, t)}` : be(e, t)
}
function Lt(e, t, n) {
  return `${Xe(n, e.getHours())}:${Xe(n, e.getMinutes())} - ${Xe(n, t.getHours())}:${Xe(n, t.getMinutes())}`
}
function Ot(e) {
  let t = [],
    n = new Date(e)
  n.setDate(n.getDate() - n.getDay())
  for (let r = 0; r < 7; r++) t.push(new Date(n)), n.setDate(n.getDate() + 1)
  return t
}
function te(e) {
  return (
    'Minified Redux error #' +
    e +
    '; visit https://redux.js.org/Errors?code=' +
    e +
    ' for the full message or use the non-minified dev environment for full errors. '
  )
}
var Kt = (function () {
    return (typeof Symbol == 'function' && Symbol.observable) || '@@observable'
  })(),
  wt = function () {
    return Math.random().toString(36).substring(7).split('').join('.')
  },
  Yt = {
    INIT: '@@redux/INIT' + wt(),
    REPLACE: '@@redux/REPLACE' + wt(),
    PROBE_UNKNOWN_ACTION: function () {
      return '@@redux/PROBE_UNKNOWN_ACTION' + wt()
    }
  }
function hi(e) {
  if (typeof e != 'object' || e === null) return !1
  for (var t = e; Object.getPrototypeOf(t) !== null; ) t = Object.getPrototypeOf(t)
  return Object.getPrototypeOf(e) === t
}
function bn(e, t, n) {
  var r
  if (
    (typeof t == 'function' && typeof n == 'function') ||
    (typeof n == 'function' && typeof arguments[3] == 'function')
  )
    throw new Error(te(0))
  if ((typeof t == 'function' && typeof n > 'u' && ((n = t), (t = void 0)), typeof n < 'u')) {
    if (typeof n != 'function') throw new Error(te(1))
    return n(bn)(e, t)
  }
  if (typeof e != 'function') throw new Error(te(2))
  var i = e,
    a = t,
    u = [],
    o = u,
    s = !1
  function c() {
    o === u && (o = u.slice())
  }
  function l() {
    if (s) throw new Error(te(3))
    return a
  }
  function f(v) {
    if (typeof v != 'function') throw new Error(te(4))
    if (s) throw new Error(te(5))
    var E = !0
    return (
      c(),
      o.push(v),
      function () {
        if (E) {
          if (s) throw new Error(te(6))
          ;(E = !1), c()
          var _ = o.indexOf(v)
          o.splice(_, 1), (u = null)
        }
      }
    )
  }
  function d(v) {
    if (!hi(v)) throw new Error(te(7))
    if (typeof v.type > 'u') throw new Error(te(8))
    if (s) throw new Error(te(9))
    try {
      ;(s = !0), (a = i(a, v))
    } finally {
      s = !1
    }
    for (var E = (u = o), $ = 0; $ < E.length; $++) {
      var _ = E[$]
      _()
    }
    return v
  }
  function g(v) {
    if (typeof v != 'function') throw new Error(te(10))
    ;(i = v), d({ type: Yt.REPLACE })
  }
  function h() {
    var v,
      E = f
    return (
      (v = {
        subscribe: function (_) {
          if (typeof _ != 'object' || _ === null) throw new Error(te(11))
          function F() {
            _.next && _.next(l())
          }
          F()
          var b = E(F)
          return { unsubscribe: b }
        }
      }),
      (v[Kt] = function () {
        return this
      }),
      v
    )
  }
  return d({ type: Yt.INIT }), (r = { dispatch: d, subscribe: f, getState: l, replaceReducer: g }), (r[Kt] = h), r
}
var vi = bn,
  mi = () => {},
  Vt = (e, t) => t()
function Di(e, t) {
  const n = Y(e),
    r = n ? [n] : [],
    { onEnter: i = Vt, onExit: a = Vt } = t,
    [u, o] = N(t.appear ? [] : r),
    [s] = ur()
  let c,
    l = !1
  function f(h, v) {
    if (!h) return v && v()
    ;(l = !0),
      a(h, () => {
        oe(() => {
          ;(l = !1), o((E) => E.filter(($) => $ !== h)), v && v()
        })
      })
  }
  function d(h) {
    const v = c
    if (!v) return h && h()
    ;(c = void 0), o((E) => [v, ...E]), i(v, h ?? mi)
  }
  const g =
    t.mode === 'out-in'
      ? (h) => l || f(h, d)
      : t.mode === 'in-out'
      ? (h) => d(() => f(h))
      : (h) => {
          f(h), d()
        }
  return (
    ir(
      (h) => {
        const v = e()
        return Y(s) ? (s(), h) : (v !== h && ((c = v), oe(() => Y(() => g(h)))), v)
      },
      t.appear ? void 0 : n
    ),
    u
  )
}
var Xt = (e) => e instanceof Element
function _t(e, t) {
  if (t(e)) return e
  if (typeof e == 'function' && !e.length) return _t(e(), t)
  if (Array.isArray(e))
    for (const n of e) {
      const r = _t(n, t)
      if (r) return r
    }
  return null
}
function wi(e, t = Xt, n = Xt) {
  const r = M(e)
  return M(() => _t(r(), t))
}
function Ei(e) {
  return M(() => {
    const t = e.name || 's'
    return {
      enterActive: (e.enterActiveClass || t + '-enter-active').split(' '),
      enter: (e.enterClass || t + '-enter').split(' '),
      enterTo: (e.enterToClass || t + '-enter-to').split(' '),
      exitActive: (e.exitActiveClass || t + '-exit-active').split(' '),
      exit: (e.exitClass || t + '-exit').split(' '),
      exitTo: (e.exitToClass || t + '-exit-to').split(' '),
      move: (e.moveClass || t + '-move').split(' ')
    }
  })
}
function Bn(e) {
  requestAnimationFrame(() => requestAnimationFrame(e))
}
function yi(e, t, n, r) {
  const { onBeforeEnter: i, onEnter: a, onAfterEnter: u } = t
  i == null || i(n),
    n.classList.add(...e.enter),
    n.classList.add(...e.enterActive),
    queueMicrotask(() => {
      if (!n.parentNode) return r == null ? void 0 : r()
      a == null || a(n, () => o())
    }),
    Bn(() => {
      n.classList.remove(...e.enter),
        n.classList.add(...e.enterTo),
        (!a || a.length < 2) && (n.addEventListener('transitionend', o), n.addEventListener('animationend', o))
    })
  function o(s) {
    ;(!s || s.target === n) &&
      (r == null || r(),
      n.removeEventListener('transitionend', o),
      n.removeEventListener('animationend', o),
      n.classList.remove(...e.enterActive),
      n.classList.remove(...e.enterTo),
      u == null || u(n))
  }
}
function Ci(e, t, n, r) {
  const { onBeforeExit: i, onExit: a, onAfterExit: u } = t
  if (!n.parentNode) return r == null ? void 0 : r()
  i == null || i(n),
    n.classList.add(...e.exit),
    n.classList.add(...e.exitActive),
    a == null || a(n, () => o()),
    Bn(() => {
      n.classList.remove(...e.exit),
        n.classList.add(...e.exitTo),
        (!a || a.length < 2) && (n.addEventListener('transitionend', o), n.addEventListener('animationend', o))
    })
  function o(s) {
    ;(!s || s.target === n) &&
      (r == null || r(),
      n.removeEventListener('transitionend', o),
      n.removeEventListener('animationend', o),
      n.classList.remove(...e.exitActive),
      n.classList.remove(...e.exitTo),
      u == null || u(n))
  }
}
var Ai = { inout: 'in-out', outin: 'out-in' },
  $i = (e) => {
    const t = Ei(e)
    return Di(
      wi(() => e.children),
      {
        mode: Ai[e.mode],
        appear: e.appear,
        onEnter(n, r) {
          yi(t(), e, n, r)
        },
        onExit(n, r) {
          Ci(t(), e, n, r)
        }
      }
    )
  },
  _i = Object.defineProperty,
  Si = (e, t) => {
    for (var n in t) _i(e, n, { get: t[n], enumerable: !0 })
  },
  kn = {}
Si(kn, {
  af: () => bi,
  am: () => Bi,
  ar: () => ki,
  az: () => pi,
  bg: () => xi,
  bn: () => Ti,
  bs: () => Mi,
  ca: () => Fi,
  cs: () => Li,
  da: () => Oi,
  de: () => Ri,
  el: () => Ii,
  en: () => Pi,
  es: () => Hi,
  et: () => Ni,
  eu: () => ji,
  fa: () => Ui,
  fi: () => Gi,
  fr: () => Zi,
  ga: () => qi,
  gl: () => zi,
  he: () => Wi,
  hi: () => Ki,
  hr: () => Yi,
  hu: () => Vi,
  hy: () => Xi,
  id: () => Qi,
  is: () => Ji,
  it: () => ea,
  ja: () => ta,
  kk: () => na,
  km: () => ra,
  kn: () => ia,
  ko: () => aa,
  ky: () => oa,
  lt: () => ua,
  lv: () => la,
  mn: () => sa,
  ms: () => ca,
  mt: () => da,
  my: () => fa,
  nb: () => ga,
  ne: () => ha,
  nl: () => va,
  nn: () => ma,
  pl: () => Da,
  pt: () => wa,
  ro: () => Ea,
  ru: () => ya,
  si: () => Ca,
  sk: () => Aa,
  sl: () => $a,
  sq: () => _a,
  sr: () => Sa,
  sv: () => ba,
  sw: () => Ba,
  ta: () => ka,
  te: () => pa,
  th: () => xa,
  tl: () => Ta,
  tlh: () => Ma,
  tr: () => Fa,
  uk: () => La,
  uz: () => Oa,
  uz_latn: () => Ra,
  vi: () => Ia,
  yi: () => Pa,
  zh: () => Ha
})
var bi = {
    today: 'Vandag',
    weekly: 'Weekliks',
    month: 'Maand',
    list: 'Lys',
    no_title: 'Geen titel',
    daily: 'Daagliks',
    no_events: 'Geen gebeure'
  },
  Bi = {
    today: 'ዛሬ',
    weekly: 'አርብ',
    month: 'ወር',
    list: 'ዝርዝር',
    no_title: 'ምንም አርእስቶች የሉም',
    daily: 'ቀንን በተመለከተ',
    no_events: 'ምንም ክስተቶች የሉም'
  },
  ki = {
    today: 'اليوم',
    weekly: 'أسبوعيا',
    month: 'شهر',
    list: 'قائمة',
    no_title: 'لا يوجد عنوان',
    daily: 'يوميا',
    no_events: 'لا توجد أحداث'
  },
  pi = {
    today: 'Bu gün',
    weekly: 'Həftəlik',
    month: 'Ay',
    list: 'Siyahı',
    no_title: 'Başlıq yoxdur',
    daily: 'Hər gün',
    no_events: 'Heç bir hadisə yoxdur'
  },
  xi = {
    today: 'Днес',
    weekly: 'Седмично',
    month: 'Месец',
    list: 'Списък',
    no_title: 'Няма заглавие',
    daily: 'Ежедневно',
    no_events: 'Няма събития'
  },
  Ti = {
    today: 'আজ',
    weekly: 'সাপ্তাহিক',
    month: 'মাস',
    list: 'তালিকা',
    no_title: 'কোনো শিরোনাম নেই',
    daily: 'প্রতিদিন',
    no_events: 'কোনো ঘটনা নেই'
  },
  Mi = {
    today: 'Danas',
    weekly: 'Sedmično',
    month: 'Mjesec',
    list: 'Lista',
    no_title: 'Nema naslova',
    daily: 'Svaki dan',
    no_events: 'Nema događaja'
  },
  Fi = {
    today: 'Avui',
    weekly: 'Setmanal',
    month: 'Mes',
    list: 'Llista',
    no_title: 'Sense títol',
    daily: 'Diariament',
    no_events: 'Cap esdeveniment'
  },
  Li = {
    today: 'Dnes',
    weekly: 'Týdně',
    month: 'Měsíc',
    list: 'Seznam',
    no_title: 'Žádný titul',
    daily: 'Denně',
    no_events: 'Žádné události'
  },
  Oi = {
    today: 'I dag',
    weekly: 'Ugentlig',
    month: 'Måned',
    list: 'Liste',
    no_title: 'Ingen titel',
    daily: 'Dagligt',
    no_events: 'Ingen begivenheder'
  },
  Ri = {
    today: 'Heute',
    weekly: 'Wöchentlich',
    month: 'Monat',
    list: 'Liste',
    no_title: 'Kein Titel',
    daily: 'Täglich',
    no_events: 'Keine Ereignisse'
  },
  Ii = {
    today: 'Σήμερα',
    weekly: 'Εβδομαδιαία',
    month: 'Μήνας',
    list: 'Λίστα',
    no_title: 'Δεν υπάρχει τίτλος',
    daily: 'Καθημερινά',
    no_events: 'Δεν υπάρχουν συμβάντα'
  },
  Pi = {
    today: 'Today',
    weekly: 'Weekly',
    month: 'Month',
    list: 'List',
    no_title: 'No title',
    daily: 'Daily',
    no_events: 'No events'
  },
  Hi = {
    today: 'Hoy',
    weekly: 'Semanal',
    month: 'Mes',
    list: 'Lista',
    no_title: 'Sin título',
    daily: 'Diario',
    no_events: 'No hay eventos'
  },
  Ni = {
    today: 'Täna',
    weekly: 'Nädalas',
    month: 'Kuu',
    list: 'Nimekiri',
    no_title: 'Pealkirja pole',
    daily: 'Iga päev',
    no_events: 'Sündmusi pole'
  },
  ji = {
    today: 'Gaur',
    weekly: 'Asteko',
    month: 'Hilabete',
    list: 'Zerrenda',
    no_title: 'Ez dago izenbururik',
    daily: 'Eguneroko',
    no_events: 'Ez dago ekitaldirik'
  },
  Ui = {
    today: 'امروز',
    weekly: 'هفتگی',
    month: 'ماه',
    list: 'لیست',
    no_title: 'هیچ عنوانی نیست',
    daily: 'روزانه',
    no_events: 'هیچ رویدادی نیست'
  },
  Gi = {
    today: 'Tänään',
    weekly: 'Viikoittain',
    month: 'Kuukausi',
    list: 'Luettelo',
    no_title: 'Ei otsikkoa',
    daily: 'Päivittäin',
    no_events: 'Ei tapahtumia'
  },
  Zi = {
    today: "Aujourd'hui",
    weekly: 'Hebdomadaire',
    month: 'Mois',
    list: 'Liste',
    no_title: 'Aucun titre',
    daily: 'Quotidien',
    no_events: 'Aucun événement'
  },
  qi = {
    today: 'Inniu',
    weekly: 'Seachtainiúil',
    month: 'Mí',
    list: 'Liosta',
    no_title: 'Gan teideal',
    daily: 'Gach lá',
    no_events: 'Gan imeachtaí'
  },
  zi = {
    today: 'Hoxe',
    weekly: 'Semanal',
    month: 'Mes',
    list: 'Lista',
    no_title: 'Sen título',
    daily: 'Diariamente',
    no_events: 'Non hai eventos'
  },
  Wi = {
    today: 'היום',
    weekly: 'שבועי',
    month: 'חודש',
    list: 'רשימה',
    no_title: 'אין כותרת',
    daily: 'יומי',
    no_events: 'אין אירועים'
  },
  Ki = {
    today: 'आज',
    weekly: 'साप्ताहिक',
    month: 'मासिक',
    list: 'सूची',
    no_title: 'कोई शीर्षक नहीं',
    daily: 'दैनिक',
    no_events: 'कोई घटना नहीं'
  },
  Yi = {
    today: 'Danas',
    weekly: 'Tjedno',
    month: 'Mjesec',
    list: 'Popis',
    no_title: 'Nema naslova',
    daily: 'Svaki dan',
    no_events: 'Nema događaja'
  },
  Vi = {
    today: 'Ma',
    weekly: 'Heti',
    month: 'Hónap',
    list: 'Lista',
    no_title: 'Nincs cím',
    daily: 'Napi',
    no_events: 'Nincsenek események'
  },
  Xi = {
    today: 'Այսօր',
    weekly: 'Շաբաթվա օրերը',
    month: 'Ամիս',
    list: 'Ցուցակ',
    no_title: 'Ոչ մի վերնագիր',
    daily: 'Օրական',
    no_events: 'Ոչ մի իրադարձություն'
  },
  Qi = {
    today: 'Hari ini',
    weekly: 'Mingguan',
    month: 'Bulan',
    list: 'Daftar',
    no_title: 'Tanpa judul',
    daily: 'Setiap hari',
    no_events: 'Tidak ada acara'
  },
  Ji = {
    today: 'Í dag',
    weekly: 'Vikulega',
    month: 'Mánuður',
    list: 'Listi',
    no_title: 'Enginn titill',
    daily: 'Daglega',
    no_events: 'Engin viðburði'
  },
  ea = {
    today: 'Oggi',
    weekly: 'Settimanale',
    month: 'Mese',
    list: 'Elenco',
    no_title: 'Nessun titolo',
    daily: 'Giornaliero',
    no_events: 'Nessun evento'
  },
  ta = {
    today: '今日',
    weekly: '週次',
    month: '月',
    list: 'リスト',
    no_title: 'タイトルなし',
    daily: '毎日',
    no_events: 'イベントはありません'
  },
  na = {
    today: 'Бүгін',
    weekly: 'Аптағы',
    month: 'Ай',
    list: 'Тізім',
    no_title: 'Тақырып жоқ',
    daily: 'Күнделікті',
    no_events: 'Оқиғалар жоқ'
  },
  ra = {
    today: 'ថ្ងៃនេះ',
    weekly: 'ប្រចាំសប្តាហ៍',
    month: 'ខែ',
    list: 'បញ្ជី',
    no_title: 'គ្មានចំណងជើង',
    daily: 'រាល់ថ្ងៃ',
    no_events: 'មិនមានព្រឹត្តិការណ៍'
  },
  ia = {
    today: 'ಇಂದು',
    weekly: 'ವಾರದಲ್ಲಿ',
    month: 'ತಿಂಗಳಲ್ಲಿ',
    list: 'ಪಟ್ಟಿ',
    no_title: 'ಯಾವುದೇ ಶೀರ್ಷಿಕೆಯಿಲ್ಲ',
    daily: 'ದಿನಕ್ಕೆ',
    no_events: 'ಯಾವುದೇ ಘಟನೆಗಳಿಲ್ಲ'
  },
  aa = {
    today: '오늘',
    weekly: '주간',
    month: '월',
    list: '목록',
    no_title: '제목 없음',
    daily: '매일',
    no_events: '이벤트 없음'
  },
  oa = {
    today: 'Бүгүн',
    weekly: 'Жума',
    month: 'Ай',
    list: 'Тизме',
    no_title: 'Тақырыпсыз',
    daily: 'Күн бою',
    no_events: 'Берилгендер жок'
  },
  ua = {
    today: 'Šiandien',
    weekly: 'Savaitės',
    month: 'Mėnesį',
    list: 'Sąrašas',
    no_title: 'Nėra pavadinimo',
    daily: 'Kasdien',
    no_events: 'Nėra renginių'
  },
  la = {
    today: 'Šodien',
    weekly: 'Nedēļā',
    month: 'Mēnesis',
    list: 'Saraksts',
    no_title: 'Nav virsraksta',
    daily: 'Katru dienu',
    no_events: 'Nav notikumu'
  },
  sa = {
    today: 'Өнөөдөр',
    weekly: 'Долоо хоногийн',
    month: 'Сар',
    list: 'Жагсаалт',
    no_title: 'Гарчиг алга',
    daily: 'Өнөөдөр',
    no_events: 'Үзэгдэл алга'
  },
  ca = {
    today: 'Hari ini',
    weekly: 'Sekali seminggu',
    month: 'Bulan',
    list: 'Senarai',
    no_title: 'Tiada tajuk',
    daily: 'Setiap hari',
    no_events: 'Tiada acara'
  },
  da = {
    today: 'Illum',
    weekly: 'Kull ġimgħa',
    month: 'Xahar',
    list: 'Lista',
    no_title: 'Ebda titlu',
    daily: 'Kull jum',
    no_events: 'Ebda avvenimenti'
  },
  fa = {
    today: 'ယနေ့',
    weekly: 'အပတ်စဉ်',
    month: 'လ',
    list: 'စာရင်း',
    no_title: 'ခေါင်းစဉ်မရှိပါ',
    daily: 'နေ့ရက်မှာ',
    no_events: 'ဘာမှမလုပ်ပါနှင့်'
  },
  ga = {
    today: 'I dag',
    weekly: 'Ukentlig',
    month: 'Måned',
    list: 'Liste',
    no_title: 'Ingen tittel',
    daily: 'Daglig',
    no_events: 'Ingen hendelser'
  },
  ha = {
    today: 'आज',
    weekly: 'साप्ताहिक',
    month: 'महिना',
    list: 'सूची',
    no_title: 'कुनै शीर्षक छैन',
    daily: 'प्रतिदिन',
    no_events: 'कुनै घटना छैन'
  },
  va = {
    today: 'Vandaag',
    weekly: 'Wekelijks',
    month: 'Maand',
    list: 'Lijst',
    no_title: 'Geen titel',
    daily: 'Dagelijks',
    no_events: 'Geen evenementen'
  },
  ma = {
    today: 'I dag',
    weekly: 'Vekentleg',
    month: 'Månad',
    list: 'Liste',
    no_title: 'Ingen tittel',
    daily: 'Dagleg',
    no_events: 'Ingen hendingar'
  },
  Da = {
    today: 'Dzisiaj',
    weekly: 'Tygodniowo',
    month: 'Miesiąc',
    list: 'Lista',
    no_title: 'Brak tytułu',
    daily: 'Codziennie',
    no_events: 'Brak wydarzeń'
  },
  wa = {
    today: 'Hoje',
    weekly: 'Semanal',
    month: 'Mês',
    list: 'Lista',
    no_title: 'Sem título',
    daily: 'Diário',
    no_events: 'Sem eventos'
  },
  Ea = {
    today: 'Astăzi',
    weekly: 'Săptămânal',
    month: 'Lună',
    list: 'Listă',
    no_title: 'Fără titlu',
    daily: 'Zilnic',
    no_events: 'Fără evenimente'
  },
  ya = {
    today: 'Сегодня',
    weekly: 'Еженедельно',
    month: 'Месяц',
    list: 'Список',
    no_title: 'Нет заголовка',
    daily: 'Ежедневно',
    no_events: 'Нет событий'
  },
  Ca = {
    today: 'අද',
    weekly: 'සතිපාර්වල',
    month: 'මාසය',
    list: 'ලැයිස්තුව',
    no_title: 'සිදු වෙන්නේ නැත',
    daily: 'දවසේ',
    no_events: 'සිදුවූ සිදු නැත'
  },
  Aa = {
    today: 'Dnes',
    weekly: 'Týždenne',
    month: 'Mesiac',
    list: 'Zoznam',
    no_title: 'Žiadny názov',
    daily: 'Dennodenne',
    no_events: 'Žiadne udalosti'
  },
  $a = {
    today: 'Danes',
    weekly: 'Tedensko',
    month: 'Mesec',
    list: 'Seznam',
    no_title: 'Brez naslova',
    daily: 'Dnevno',
    no_events: 'Brez dogodkov'
  },
  _a = {
    today: 'Sot',
    weekly: 'Javor',
    month: 'Muaj',
    list: 'Listë',
    no_title: 'Asnjë titull',
    daily: 'Çdo ditë',
    no_events: 'Asnjë ngjarje'
  },
  Sa = {
    today: 'Данас',
    weekly: 'Недељно',
    month: 'Месец',
    list: 'Листа',
    no_title: 'Нема наслова',
    daily: 'Свакодневно',
    no_events: 'Нема догађаја'
  },
  ba = {
    today: 'Idag',
    weekly: 'Veckovis',
    month: 'Månad',
    list: 'Lista',
    no_title: 'Ingen titel',
    daily: 'Dagligen',
    no_events: 'Inga händelser'
  },
  Ba = {
    today: 'Leo',
    weekly: 'Kila wiki',
    month: 'Mwezi',
    list: 'Orodha',
    no_title: 'Hakuna kichwa',
    daily: 'Kila siku',
    no_events: 'Hakuna matukio'
  },
  ka = {
    today: 'இன்று',
    weekly: 'வாரந்தோறும்',
    month: 'மாதம்',
    list: 'பட்டியல்',
    no_title: 'தலைப்பு இல்லை',
    daily: 'தினசரி',
    no_events: 'நிகழ்வுகள் இல்லை'
  },
  pa = {
    today: 'ఈ రోజు',
    weekly: 'వారంలో',
    month: 'నెల',
    list: 'జాబితా',
    no_title: 'ఏ శీర్షక లేదు',
    daily: 'ప్రతి రోజు',
    no_events: 'ఏమిటి ఈ సందర్భంలో ఏ సందర్భాలు లేవు'
  },
  xa = {
    today: 'วันนี้',
    weekly: 'รายสัปดาห์',
    month: 'เดือน',
    list: 'รายการ',
    no_title: 'ไม่มีชื่อเรื่อง',
    daily: 'ทุกวัน',
    no_events: 'ไม่มีเหตุการณ์'
  },
  Ta = {
    today: 'Ngayon',
    weekly: 'Kada linggo',
    month: 'Buwan',
    list: 'Listahan',
    no_title: 'Walang pamagat',
    daily: 'Araw-araw',
    no_events: 'Walang mga kaganapan'
  },
  Ma = {
    today: 'Hegh',
    weekly: 'loS',
    month: 'jar',
    list: 'mIch',
    no_title: 'pagh jaj',
    daily: 'Duj',
    no_events: 'pagh jaj'
  },
  Fa = {
    today: 'Bugün',
    weekly: 'Haftalık',
    month: 'Ay',
    list: 'Liste',
    no_title: 'Başlık yok',
    daily: 'Günlük',
    no_events: 'Etkinlik yok'
  },
  La = {
    today: 'Сьогодні',
    weekly: 'Щотижня',
    month: 'Місяць',
    list: 'Список',
    no_title: 'Немає заголовка',
    daily: 'Щоденно',
    no_events: 'Подій немає'
  },
  Oa = {
    today: 'Bugun',
    weekly: 'Haftalik',
    month: 'Oy',
    list: "Ro'yxat",
    no_title: "Sarlavha yo'q",
    daily: 'Har kuni',
    no_events: "Hech qanday tadbir yo'q"
  },
  Ra = {
    today: 'Bugun',
    weekly: 'Haftalik',
    month: 'Oy',
    list: "Ro'yxat",
    no_title: "Sarlavha yo'q",
    daily: 'Har kuni',
    no_events: "Hech qanday tadbir yo'q"
  },
  Ia = {
    today: 'Hôm nay',
    weekly: 'Hàng tuần',
    month: 'Tháng',
    list: 'Danh sách',
    no_title: 'Không có tiêu đề',
    daily: 'Hàng ngày',
    no_events: 'Không có sự kiện'
  },
  Pa = {
    today: 'היינט',
    weekly: 'וואָך',
    month: 'חודש',
    list: 'ליסט',
    no_title: 'קיין טיטל',
    daily: 'טעגלעך',
    no_events: 'קיין אויף ארעיע'
  },
  Ha = {
    today: '今天',
    weekly: '每周',
    month: '月',
    list: '清单',
    no_title: '没有标题',
    daily: '每日',
    no_events: '没有活动'
  }
function We(e, t) {
  const n = new Intl.Locale(e).language
  return kn[n][t]
}
var Na =
  (e) =>
  (n = e, r) => {
    var i
    switch (r.type) {
      case 'CHANGE_CONTAINER_HEIGHT':
        return { ...n, containerHeight: r.val }
      case 'DELETE_EVENT':
        const a = [...n.events].filter((h) => h.id != r.id)
        return { ...n, events: a }
      case 'SET_STOP_ADD_EVENT':
        return { ...n, stopAddEvent: r.val }
      case 'SET_AVALIBLE_SLOTS':
        return { ...n, avalibalSots: r.avalibalSots }
      case 'CHANGE_THEME':
        return { ...n, theme: r.val }
      case 'UPDATE_EDITABLE':
        return { ...n, editable: r.val }
      case 'ADD_EVENT':
        const u = [...n.events]
        let o = new ie(r.event)
        return o.convertDateByTimeZone(n.timeZone), u.push(o), { ...n, events: u }
      case 'UPDATE_GROUPS':
        return { ...n, groups: r.groups }
      case 'ADD_GROUP':
        const s = [...n.groups, r.group]
        return { ...n, groups: s }
      case 'UPDATE_LIST_MODE':
        return { ...n, listMode: r.val }
      case 'AUTO_UPADTE_EVENT':
        return { ...n, autoUpdateEventOnChange: r.val }
      case 'SET_GRID_HEIGHT':
        return { ...n, gridHeight: r.height }
      case 'SET_PLUGINS':
        return { ...n, plugins: r.plugins }
      case 'UPDATE_GRID':
        return { ...n, grid: r.grid }
      case 'UPDATE_CALENDAR':
        return { ...n, calendar: r.calendar }
      case 'UPDATE_LOCALE':
        return { ...n, locale: r.locale }
      case 'SET_INITIAL_DATE':
        return { ...n, initialDate: r.date }
      case 'SET_ALL_EVENTS':
        const c = []
        for (let h = 0; h < r.events.length; h++) {
          const v = new ie(r.events[h])
          v.convertDateByTimeZone(n.timeZone), c.push(v)
        }
        return { ...n, events: c }
      case 'UPDATE_EVENT':
        const l = [...n.events],
          f = l.findIndex((h) => h.id === r.id),
          d = new ie(r.event)
        return d.convertDateByTimeZone(n.timeZone), (l[f] = d), { ...n, events: l }
      case 'SET_TIMEZONE':
        return { ...n, timeZone: r.tz }
      case 'UPDATE_TIMEZONE':
        let g = [...n.events]
        for (let h = 0; h < g.length; h++) (i = g[h]) == null || i.convertDateByTimeZone(r.tz)
        return { ...n, timeZone: r.tz, events: g }
      default:
        return n
    }
  }
function ja(e) {
  const t = vi(Na(e)),
    [n, r] = qr(t.getState()),
    i = t.subscribe(() => r(Kr(t.getState())))
  return le(() => i()), { store: n, dispatch: Ua(t) }
}
function Ua(e) {
  return e.dispatch
}
var Ga = class {
    constructor() {
      y(this, 'subscribers', [])
      y(this, 'state', new Map())
      this.subscribers = []
    }
    subscribe(e) {
      return (
        this.subscribers.push(e),
        () => {
          this.subscribers = this.subscribers.filter((t) => t !== e)
        }
      )
    }
    dispatch(e) {
      this.state.set(e.id, e),
        this.subscribers.forEach((t) => {
          t(this.state)
        })
    }
    remove(e) {
      this.state.delete(e)
    }
    getState() {
      return this.state
    }
  },
  Za = class {
    constructor() {
      return new Proxy(this, {
        get(e, t, n) {
          return t in e ? Reflect.get(e, t, n) : ((e[t] = []), e[t])
        }
      })
    }
  },
  qa = class {
    constructor(e) {
      y(this, 'storeManager')
      y(this, 'renderStore', new Ga())
      y(this, 'EventListenrsStorage')
      y(this, 'storeDispatch')
      const t = {
          events: [],
          initialDate: new Date(),
          timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
          calendar: 'gregory',
          locale: 'en-US',
          grid: 'daily',
          gridHeight: 1920,
          plugins: [],
          autoUpdateEventOnChange: !0,
          listMode: 'day',
          groups: [],
          editable: !0,
          theme: 'light',
          avalibalSots: [],
          stopAddEvent: !1,
          containerHeight: 900
        },
        { store: n, dispatch: r } = ja(t)
      ;(this.storeManager = n),
        (this.storeDispatch = r),
        this.resetOptions(e, !0),
        (this.EventListenrsStorage = new Za())
    }
    emitEvent(e, t) {
      this.EventListenrsStorage[e].forEach((n) => n(t))
    }
    on(e, t) {
      this.EventListenrsStorage[e].push(t)
    }
    setEventList(e) {
      this.storeDispatch({ type: 'SET_ALL_EVENTS', events: e })
    }
    updateEvent(e, t) {
      this.storeDispatch({ type: 'UPDATE_EVENT', id: e, event: t })
    }
    addEvent(e) {
      this.storeDispatch({ type: 'ADD_EVENT', event: e })
    }
    deleteEvent(e) {
      this.storeDispatch({ type: 'DELETE_EVENT', id: e })
    }
    setPlugins(e) {
      this.storeDispatch({ type: 'SET_PLUGINS', plugins: e })
    }
    setGridHeight(e) {
      this.storeDispatch({ type: 'SET_GRID_HEIGHT', height: e })
    }
    changeTimeZone(e) {
      this.storeDispatch({ type: 'SET_TIMEZONE', tz: e })
    }
    changeInitialDate(e) {
      this.storeDispatch({ type: 'SET_INITIAL_DATE', date: e })
    }
    changeLocale(e) {
      this.storeDispatch({ type: 'UPDATE_LOCALE', locale: e })
    }
    changeCalendar(e) {
      this.storeDispatch({ type: 'UPDATE_CALENDAR', calendar: e })
    }
    changeGrid(e) {
      this.storeDispatch({ type: 'UPDATE_GRID', grid: e })
    }
    changeEventAutoUpdate(e) {
      this.storeDispatch({ type: 'AUTO_UPADTE_EVENT', val: e })
    }
    updateListMode(e) {
      this.storeDispatch({ type: 'UPDATE_LIST_MODE', val: e })
    }
    updateGroups(e) {
      this.storeDispatch({ type: 'UPDATE_GROUPS', groups: e })
    }
    addGroup(e) {
      this.storeDispatch({ type: 'ADD_GROUP', group: e })
    }
    updateEditable(e) {
      this.storeDispatch({ type: 'UPDATE_EDITABLE', val: e })
    }
    changeTheme(e) {
      this.storeDispatch({ type: 'CHANGE_THEME', val: e })
    }
    setAvalibleSlots(e) {
      this.storeDispatch({ type: 'SET_AVALIBLE_SLOTS', avalibalSots: e })
    }
    setStopAddEvent(e) {
      this.storeDispatch({ type: 'SET_STOP_ADD_EVENT', val: e })
    }
    changeContainerHeight(e) {
      this.storeDispatch({ type: 'CHANGE_CONTAINER_HEIGHT', val: e })
    }
    resetOptions(e, t) {
      var n
      if (((n = e == null ? void 0 : e.plugins) == null ? void 0 : n.length) > 0) this.setPlugins(e.plugins)
      else if (t) throw Error('full-event-calendat --> must provide atleast 1 grid plugin')
      e.timeZone && this.changeTimeZone(e.timeZone),
        e.calendar && this.changeCalendar(e.calendar),
        e.grid &&
          (this.isPluginAvalible(e.grid)
            ? this.changeGrid(e.grid)
            : this.changeGrid(e == null ? void 0 : e.plugins[0].name)),
        e.initialDate && this.changeInitialDate(new Date(e.initialDate).toISOString()),
        e.locale && this.changeLocale(e.locale),
        e.gridHeight && this.setGridHeight(e.gridHeight),
        e.autoUpdateEventOnChange === !1 && this.changeEventAutoUpdate(e.autoUpdateEventOnChange),
        e.listMode && this.updateListMode(e.listMode),
        e.groups && this.updateGroups(e.groups),
        e.theme && this.changeTheme(e.theme),
        e.stopAddEvent && this.setStopAddEvent(e.stopAddEvent),
        e.events && this.setEventList(e.events),
        Object.keys(e).includes('editable') && this.updateEditable(!!e.editable)
    }
    prevDay() {}
    nextDay() {}
    getDate() {
      return new Date()
    }
    today() {}
    getEventById(e) {
      return this.storeManager.events.find((t) => t.id === e)
    }
    getcurrentGridCode() {
      var n
      let e = null
      const t = this.storeManager.plugins
      for (let r = 0; r < t.length; r++) {
        const i = t[r]
        ;(i == null ? void 0 : i.type) === 'grid' && i.name === this.storeManager.grid && (e = i.code)
      }
      return e ?? ((n = t[0]) == null ? void 0 : n.code)
    }
    isPluginAvalible(e) {
      return this.storeManager.plugins.some((t) => t.name === e)
    }
    getOptions() {
      return this.storeManager.plugins.map((e) => {
        if (e.type === 'grid') return e.name
      })
    }
  },
  pn = bt(),
  za = (e) => {
    const t = { store: e.store, instance: e.instance }
    return D(pn.Provider, {
      value: t,
      get children() {
        return e.children
      }
    })
  }
function Rt() {
  return it(pn)
}
var St = class {
    proccess(e) {
      const t = { month: 'long', year: 'numeric', day: 'numeric', calendar: e.calendar, timeZone: e.timeZone }
      return new Intl.DateTimeFormat(e.locale, t).format(new Date(e.initialDate))
    }
  },
  xn = class {
    proccess(e) {
      const t = { year: 'numeric', month: 'short', day: 'numeric', calendar: e.calendar, timeZone: e.timeZone },
        n = Ot(new Date(e.initialDate))
      return new Intl.DateTimeFormat(e.locale, t).formatRange(n[0], n[n.length - 1])
    }
  },
  Tn = class {
    proccess(e) {
      const t = { month: 'long', year: 'numeric', calendar: e.calendar, timeZone: e.timeZone }
      return new Intl.DateTimeFormat(e.locale, t).format(new Date(e.initialDate))
    }
  },
  Wa = class {
    proccess(e) {
      return e.listMode === 'week'
        ? new xn().proccess(e)
        : e.listMode === 'month'
        ? new Tn().proccess(e)
        : new St().proccess(e)
    }
  },
  Ka = class {
    constructor(e) {
      y(this, 'handle')
      y(this, 'calendarSate')
      switch (((this.calendarSate = e), e.grid)) {
        case 'daily':
          this.handle = new St()
          break
        case 'weekly':
          this.handle = new xn()
          break
        case 'month':
          this.handle = new Tn()
          break
        case 'list':
          this.handle = new Wa()
          break
        default:
          this.handle = new St()
          break
      }
    }
    format() {
      return this.handle.proccess(this.calendarSate)
    }
  },
  Ya = A('<div class=fec-go-to-today>Today'),
  Va = A(
    '<div class=fec-go-back-icon><svg xmlns=http://www.w3.org/2000/svg width=16 height=16 viewBox="0 0 16 16"fill=none><path d="M13.28 10.0333L8.93333 5.68667C8.42 5.17333 7.58 5.17333 7.06667 5.68667L2.72 10.0333"stroke=#7E7E7F stroke-width=1.5 stroke-miterlimit=10 stroke-linecap=round stroke-linejoin=round>'
  ),
  Xa = A(
    '<div class=fec-go-forward-icon><svg xmlns=http://www.w3.org/2000/svg width=16 height=16 viewBox="0 0 16 16"fill=none><path d="M13.28 10.0333L8.93333 5.68667C8.42 5.17333 7.58 5.17333 7.06667 5.68667L2.72 10.0333"stroke=#7E7E7F stroke-width=1.5 stroke-miterlimit=10 stroke-linecap=round stroke-linejoin=round>'
  ),
  Qa = A('<div class=fec-dropdown-calendar>'),
  Ja = A('<div class=fec-grid-drop data-test-id-dropdown=1>'),
  eo = A(
    '<div class=fec-calendar-header><div></div><div></div><div></div><div class=fec-header-date dir=rtl></div><div style=flex:1></div><div>'
  ),
  to = A('<div class=fec-dropdown-calendar-item data-test-id-drop=0>'),
  no = (e) => {
    const [t, n] = N(!1),
      r = Rt()
    function i(C, S) {
      const B = (w) => {
        var x
        return !C.contains(w.target) && ((x = S()) == null ? void 0 : x())
      }
      document.addEventListener('click', B), le(() => document.removeEventListener('click', B))
    }
    function a() {
      n(!1)
    }
    const u = M(() => new Ka(r.store).format())
    function o(C) {
      e.changeGrid(C)
    }
    function s() {
      const C = new Date(r.store.initialDate),
        S = r.store.grid
      S === 'daily'
        ? C.setDate(C.getDate() - 1)
        : S === 'weekly'
        ? C.setDate(C.getDate() - 7)
        : S === 'month'
        ? C.setMonth(C.getMonth() - 1)
        : S === 'list' &&
          (r.store.listMode === 'day'
            ? C.setDate(C.getDate() - 1)
            : r.store.listMode === 'month'
            ? C.setMonth(C.getMonth() - 1)
            : r.store.listMode === 'week' && C.setDate(C.getDate() - 7)),
        e.onDateChange(C)
    }
    function c() {
      e.onDateChange(new Date())
    }
    function l() {
      const C = new Date(r.store.initialDate),
        S = r.store.grid
      S === 'daily'
        ? C.setDate(C.getDate() + 1)
        : S === 'weekly'
        ? C.setDate(C.getDate() + 7)
        : S === 'month'
        ? C.setMonth(C.getMonth() + 1)
        : S === 'list' &&
          (r.store.listMode === 'day'
            ? C.setDate(C.getDate() + 1)
            : r.store.listMode === 'month'
            ? C.setMonth(C.getMonth() + 1)
            : r.store.listMode === 'week' && C.setDate(C.getDate() + 7)),
        e.onDateChange(C)
    }
    let f = { el: null },
      d = { el: null },
      g = { el: null },
      h = { el: null },
      v = { el: null }
    const E = () => ({ date: u() }),
      $ = () => ({ grid: r.store.grid }),
      { isSlotAvalibale: _ } = ce(f, E, 'headerDateSlot', () => r.store.initialDate),
      { isSlotAvalibale: F } = ce(d, $, 'gridDropDown', () => r.store.grid),
      { isSlotAvalibale: b } = ce(
        g,
        () => {},
        'todayBtn',
        () => {}
      ),
      { isSlotAvalibale: p } = ce(
        h,
        () => {},
        'goBackDate',
        () => {}
      ),
      { isSlotAvalibale: I } = ce(
        v,
        () => {},
        'goForwardDate',
        () => {}
      )
    return (() => {
      var C = eo(),
        S = C.firstChild,
        B = S.nextSibling,
        w = B.nextSibling,
        x = w.nextSibling,
        R = x.nextSibling,
        U = R.nextSibling,
        J = g.el
      typeof J == 'function' ? G(J, S) : (g.el = S),
        (S.$$click = c),
        m(
          S,
          D(j, {
            when: !b,
            get children() {
              return Ya()
            }
          })
        ),
        (B.$$click = s)
      var ae = h.el
      typeof ae == 'function' ? G(ae, B) : (h.el = B),
        m(
          B,
          D(j, {
            when: !p,
            get children() {
              return Va()
            }
          })
        ),
        (w.$$click = l)
      var we = v.el
      typeof we == 'function' ? G(we, w) : (v.el = w),
        m(
          w,
          D(j, {
            when: !I,
            get children() {
              return Xa()
            }
          })
        )
      var _e = f.el
      typeof _e == 'function' ? G(_e, x) : (f.el = x),
        m(
          x,
          D(j, {
            when: !_,
            get children() {
              return u()
            }
          })
        )
      var T = d.el
      return (
        typeof T == 'function' ? G(T, U) : (d.el = U),
        m(
          U,
          D(j, {
            when: !F,
            get children() {
              var P = Ja()
              return (
                (P.$$click = () => n(!t())),
                m(P, () => r.store.grid, null),
                m(
                  P,
                  D($i, {
                    name: 'slide-fade',
                    get children() {
                      return D(j, {
                        get when() {
                          return t()
                        },
                        get children() {
                          var V = Qa()
                          return (
                            G(i, V, () => a),
                            m(
                              V,
                              D(Z, {
                                get each() {
                                  return r.instance.getOptions()
                                },
                                children: (re) =>
                                  (() => {
                                    var Ee = to()
                                    return (
                                      (Ee.$$click = (Se) => {
                                        Se.stopPropagation(), n(!1), o(re)
                                      }),
                                      m(Ee, () => We(r.instance.storeManager.locale, re), null),
                                      m(Ee, re, null),
                                      Ee
                                    )
                                  })()
                              })
                            ),
                            V
                          )
                        }
                      })
                    }
                  }),
                  null
                ),
                P
              )
            }
          })
        ),
        C
      )
    })()
  }
X(['click'])
function ro(e) {
  const t = Rt()
  let n = !1,
    r,
    i = 0,
    a = t.store.initialDate
  function u(l = !1) {
    var g
    ;(n = !0),
      r.classList.add('fec-cloned-calendar'),
      r.classList.remove('fec-not-cloned'),
      (g = e.calendarContainerRef) == null || g.insertAdjacentElement('beforeend', r)
    const f = r.querySelector('.fec-scroll-wrapper')
    f && (f.scrollTop = i)
    const d = e.containerRef
    l
      ? d == null || d.classList.add('fec-grid-animate-smooth')
      : new Date(a) > new Date(t.store.initialDate)
      ? d == null || d.classList.add('fec-grid-animate-backward')
      : d == null || d.classList.add('fec-grid-animate-forward'),
      (a = t.store.initialDate),
      setTimeout(() => {
        var h
        ;(h = e.calendarContainerRef.querySelector('.fec-cloned-calendar')) == null || h.remove(),
          d == null || d.classList.remove('fec-grid-animate-forward'),
          d == null || d.classList.remove('fec-grid-animate-backward'),
          d == null || d.classList.remove('fec-grid-animate-smooth'),
          c(),
          s(),
          (n = !1)
      }, 250)
  }
  ge(
    je(
      () => t.store.initialDate,
      () => {
        !r || n || u()
      }
    )
  ),
    $e(() => {
      c(), s()
      const l = new MutationObserver(() => {
          c()
        }),
        f = ee()
      f && l.observe(f.querySelector('#full-event-calendar-wrapper'), { subtree: !0, childList: !0, attributes: !0 })
    }),
    e.containerRef.querySelector('.fec-scroll-wrapper') &&
      e.containerRef.querySelector('.fec-scroll-wrapper').addEventListener('scroll', c)
  function s() {
    var f, d
    e.containerRef.querySelector('.fec-scroll-wrapper') &&
      ((f = e.containerRef.querySelector('.fec-scroll-wrapper')) == null || f.removeEventListener('scroll', c),
      (d = e.containerRef.querySelector('.fec-scroll-wrapper')) == null || d.addEventListener('scroll', c))
  }
  le(() => {
    var l
    ;(l = e.containerRef.querySelector('.fec-scroll-wrapper')) == null || l.removeEventListener('scroll', c)
  })
  function c() {
    var f
    r = (f = e.containerRef) == null ? void 0 : f.cloneNode(!0)
    const l = e.containerRef.querySelector('.fec-scroll-wrapper')
    l && (i = l.scrollTop)
  }
  ge(
    je(
      () => t.store.grid,
      () => {
        !r || n || u(!0)
      }
    )
  )
}
var io = A(
    '<div style=position:relative;flex:1; id=calendar-container><div class="fec-not-cloned fec-grid-wrapper"id=full-event-calendar-wrapper>'
  ),
  ao = (e) => {
    let t, n
    return (
      $e(() => {
        ro({ containerRef: t, calendarContainerRef: n })
      }),
      (() => {
        var r = io(),
          i = r.firstChild,
          a = n
        typeof a == 'function' ? G(a, r) : (n = r)
        var u = t
        return typeof u == 'function' ? G(u, i) : (t = i), m(i, () => e.children), r
      })()
    )
  },
  oo = A('<div id=full-event-calendar-core>')
function uo() {
  const e = Rt()
  function t(o) {
    const s = e.instance.getEventById(o.id),
      c = new ie(o)
    c.convertDateByTimeZone(e.store.timeZone),
      e.store.autoUpdateEventOnChange && e.instance.updateEvent(o.id, o),
      e.instance.emitEvent('eventUpdate', { prev: s, next: c, id: o.id })
  }
  function n(o) {
    e.store.autoUpdateEventOnChange && !e.store.stopAddEvent && e.instance.addEvent(o.sourceEvent),
      e.store.stopAddEvent
        ? e.instance.emitEvent('addEventStoped', { event: o })
        : e.instance.emitEvent('eventAdd', { event: o })
  }
  function r(o) {
    e.instance.emitEvent('dateUpdate', { date: o }), e.instance.changeInitialDate(o.toISOString())
  }
  function i(o) {
    e.instance.emitEvent('gridUpdate', { grid: o }), e.instance.changeGrid(o)
  }
  function a(o) {
    e.instance.emitEvent('eventClicked', { event: o })
  }
  const u = M(() => [...e.store.events])
  return (() => {
    var o = oo()
    return (
      m(o, D(no, { onDateChange: r, changeGrid: i }), null),
      m(
        o,
        D(ao, {
          get children() {
            return D(hn, {
              get component() {
                return e.instance.getcurrentGridCode()
              },
              onEventUpdate: t,
              onAddEvent: n,
              onEventClick: a,
              get initialDate() {
                return new Date(e.store.initialDate)
              },
              get events() {
                return u()
              },
              get locale() {
                return e.store.locale
              },
              get calendar() {
                return e.store.calendar
              },
              get gridHeight() {
                return e.store.gridHeight
              },
              onDateChange: r,
              onGridChange: i,
              get listMode() {
                return e.store.listMode
              },
              get timeZone() {
                return e.store.timeZone
              },
              get groups() {
                return e.store.groups
              },
              get editable() {
                return e.store.editable
              },
              get slotRenderStore() {
                return e.instance.renderStore
              },
              get avalibalSots() {
                return e.store.avalibalSots
              },
              get stopAddEvent() {
                return e.store.stopAddEvent
              },
              get containerHeight() {
                return e.store.containerHeight
              }
            })
          }
        }),
        null
      ),
      L(
        (s) => {
          var c = `full-event-calendar-core calendar-theme-${e.store.theme}`,
            l = `height:${e.store.containerHeight}px`
          return c !== s.e && se(o, (s.e = c)), (s.t = z(o, l, s.t)), s
        },
        { e: void 0, t: void 0 }
      ),
      o
    )
  })()
}
var Qt = (e) =>
    D(za, {
      get store() {
        return e.store
      },
      get instance() {
        return e.instance
      },
      get children() {
        return D(Vr, {
          get slotRenderer() {
            return e.instance.renderStore
          },
          get calendarContainer() {
            return e.container
          },
          get avalibalSots() {
            return e.store.avalibalSots
          },
          get children() {
            return D(uo, {})
          }
        })
      }
    }),
  Mn = class extends qa {
    constructor(e, t) {
      if (!e) throw Error('full-event-calendar --> a target element must be provided for the calendar to render.')
      super(t), (this.targetElement = e)
    }
    render() {
      gn(() => {
        const e = this
        return D(Qt, {
          get container() {
            return e.targetElement
          },
          get store() {
            return e.storeManager
          },
          instance: e
        })
      }, this.targetElement)
    }
    refresh() {
      jr(() => {
        const e = this
        return D(Qt, {
          get container() {
            return e.targetElement
          },
          get store() {
            return e.storeManager
          },
          instance: e
        })
      }, this.targetElement)
    }
  }
function lo(e) {
  const t = [...e]
  t.sort(function (u, o) {
    return new Date(u.start).valueOf() - new Date(o.start).valueOf()
  })
  let n = 0,
    r = [{ 1: [] }]
  function i(u) {
    let o = !1
    for (const [s, c] of Object.entries(r[n]))
      if (s !== String(1)) {
        for (let l = 0; l < c.length; l++)
          if (c[l].checkOverLap(u)) {
            o = !0
            break
          }
        if (o) break
      }
    return !o
  }
  function a(u, o) {
    r[n][u] || (r[n][u] = [])
    const s = r[n][u]
    let c = !0
    for (let l = 0; l < s.length; l++)
      if (o.checkOverLap(s[l])) {
        c = !1
        break
      }
    return c ? u : a(u + 1, o)
  }
  for (let u = 0; u < t.length; u++) {
    const o = a(1, t[u])
    o === 1 && i(t[u]) && n++, r[n] || r.push({ 1: [] }), r[n][o].push(t[u])
  }
  return r
}
function so(e, t) {
  let n = !0
  for (let r = 0; r < e.length; r++)
    if (t.checkOverLap(e[r])) {
      n = !1
      break
    }
  return n
}
function co(e, t, n) {
  const r = Object.values(e)
  let i = 1
  for (let a = n; a < r.length; a++) {
    const u = r[a]
    if (so(u, t)) i++
    else break
  }
  return ` ;width : ${i}00%`
}
var It = class {
    constructor(t) {
      y(this, 'isDragging', !1)
      y(this, 'draggingController', null)
      y(this, 'container')
      this.container = t
    }
    createDraggingObject(t, n) {
      this.isDragging || (this.draggingController = new ut(t, n, this.container))
    }
  },
  Jt = class extends It {
    constructor() {
      super(...arguments)
      y(this, 'hasMouseMoved', !1)
      y(this, 'hasScrolled', !1)
      y(this, 'firstTopPosition', 0)
      y(this, 'firstScrollTop', 0)
      y(this, 'sceollHande')
    }
    dragStart(t, n) {
      var a, u, o
      this.createDraggingObject(t, n)
      const r = (a = this.draggingController) == null ? void 0 : a.getEventNode(t)
      ;(this.firstTopPosition = r.getBoundingClientRect().top),
        (this.firstScrollTop = (u = this.container.querySelector('#fec-scroll-wrapper')) == null ? void 0 : u.scrollTop)
      const i = this
      ;(this.sceollHande = () => {
        i.hasScrolled = !0
      }),
        (o = this.container.querySelector('#fec-scroll-wrapper')) == null || o.addEventListener('scroll', i.sceollHande)
    }
    mouseMove(t) {
      var i, a, u
      const n =
        ((i = this.container.querySelector('#fec-scroll-wrapper')) == null ? void 0 : i.scrollTop) - this.firstScrollTop
      if ((n != 0 && (this.hasScrolled = !0), (this.hasMouseMoved = !0), !this.draggingController)) return
      this.isDragging ||
        ((this.isDragging = !0),
        (a = this.container.querySelector('#full-event-calendar-core')) == null ||
          a.classList.add('fec-calendar-draging'),
        this.draggingController.setEelementOpacity('0.3'))
      const r = this.getPreviewNode()
      if (r) {
        const o = t.clientY - r.getBoundingClientRect().top,
          s = (u = this.container.querySelector('.fec-time-range')) == null ? void 0 : u.offsetHeight,
          c = Cn.previewAndEventTimeDiff(this.firstTopPosition - n, t.clientY - o, s)
        this.draggingController.shiftTime(c)
      }
      this.draggingController.shiftPoistion(t)
    }
    dragEnd(t) {
      var r, i
      const n = this
      ;(r = this.container.querySelector('#fec-scroll-wrapper')) == null ||
        r.removeEventListener('scroll', n.sceollHande),
        (this.isDragging = !1),
        this.draggingController &&
          ((i = this.container.querySelector('#full-event-calendar-core')) == null ||
            i.classList.remove('fec-calendar-draging'))
    }
    getPreviewNode() {
      var t
      return this.container.querySelector(
        `#draging-event-${(t = this.draggingController) == null ? void 0 : t.item.id}`
      )
    }
  },
  Fn = class extends It {
    constructor() {
      super(...arguments)
      y(this, 'hasMouseMoved', !1)
      y(this, 'hasScrolled', !1)
      y(this, 'prevX', 0)
      y(this, 'FirstBottomY', 0)
      y(this, 'rect', null)
    }
    dragStart(t, n) {
      var r, i
      this.createDraggingObject(t, n),
        (this.prevX = t.y),
        (this.FirstBottomY = (r = this.draggingController) == null ? void 0 : r.getEelementReact(t).bottom),
        (this.rect = (i = this.draggingController) == null ? void 0 : i.getEelementReact(t))
    }
    mouseMove(t) {
      var c, l, f, d, g, h
      this.hasMouseMoved = !0
      const n = this.rect,
        r = (c = this.draggingController) == null ? void 0 : c.getEventNode(t)
      r.style.zIndex = '50'
      let i = this.prevX - t.y
      const a = n.height - i
      r.style.height = a + 'px'
      const o =
        ((r.getBoundingClientRect().bottom - this.FirstBottomY) * 60) /
        ((l = this.draggingController) == null ? void 0 : l.oneHourInPixelSize)
      ;(f = this.draggingController) == null || f.shiftEndTime(o * 6e4)
      const s = (d = this.draggingController) == null ? void 0 : d.getEventTimeDetailesNode(t)
      s &&
        (s.innerHTML = Lt(
          (g = this.draggingController) == null ? void 0 : g.dragedStartDate,
          (h = this.draggingController) == null ? void 0 : h.dragedEndDate,
          'en-US'
        ))
    }
    dragEnd(t) {
      var r
      const n = (r = this.draggingController) == null ? void 0 : r.getEventNode()
      n && (n.style.zIndex = '1')
    }
    getPreviewNode() {}
  },
  fo = class extends It {
    constructor() {
      super(...arguments)
      y(this, 'hasMouseMoved', !1)
      y(this, 'hasScrolled', !1)
      y(this, 'resizer', null)
      y(this, 'event', null)
    }
    dragStart(t, n) {
      ;(this.resizer = new Fn(this.container)), (this.event = n)
    }
    mouseMove(t) {
      var n, r
      this.hasMouseMoved
        ? (r = this.resizer) == null || r.mouseMove.call(this, t)
        : ((n = this.resizer) == null || n.dragStart.call(this, t, this.event), (this.hasMouseMoved = !0))
    }
    dragEnd(t) {
      var n, r
      ;(n = this.resizer) == null || n.dragEnd.call(this, t),
        this.hasMouseMoved || (r = this.resizer) == null || r.dragStart.call(this, t, this.event)
    }
    getPreviewNode() {}
  },
  Ln = class {
    constructor(e, t) {
      y(this, 'dragger')
      switch (e) {
        case 'DailyDragDrop':
          this.dragger = new Jt(t)
          break
        case 'eventResizer':
          this.dragger = new Fn(t)
          break
        case 'addEventWithResize':
          this.dragger = new fo(t)
          break
        default:
          this.dragger = new Jt(t)
          break
      }
    }
  }
function go(e, t, n, r, i) {
  function a() {
    return e.current.clientWidth + 'px'
  }
  let u, o
  const [s, c] = N(!1),
    [l, f] = N(),
    d = ee()
  function g(b, p) {
    r &&
      ((o = new Ln('DailyDragDrop', d)),
      o.dragger.dragStart(p, b),
      !s() &&
        ((u = new Xr(n, h, v)),
        oe(() => {
          f(o.dragger.draggingController)
        })))
  }
  function h(b) {
    r &&
      u.mouseDown &&
      (f({ ...o.dragger.draggingController, width: a() }), o.dragger.mouseMove(b), c(o.dragger.isDragging))
  }
  function v(b) {
    var p, I
    r &&
      (o.dragger.hasScrolled
        ? h(b)
        : o.dragger.hasMouseMoved ||
          i(
            (p = o.dragger.draggingController) == null ? void 0 : p.event,
            (I = o.dragger.draggingController) == null ? void 0 : I.getEventNode()
          ),
      o.dragger.dragEnd(b),
      s() && (u.isMouseoutsideTheContainer || t(o.dragger.draggingController), F(b)),
      u.removeListenrs())
  }
  let E = 0,
    $ = 0
  function _() {
    clearTimeout(E), clearTimeout($)
  }
  function F(b) {
    var I
    _()
    const p = o.dragger.draggingController
    ;(I = o.dragger.draggingController) == null || I.setEelementOpacity('0.3'),
      (E = setTimeout(() => {
        var S, B
        ;(S = o.dragger.draggingController) == null || S.setEelementOpacity('0.3')
        let C = (B = o.dragger.draggingController) == null ? void 0 : B.getEventNode(b)
        ut.setState(p, C), f(p)
      }, 0)),
      ($ = setTimeout(() => {
        var C
        oe(() => {
          f(null), c(!1)
        }),
          (C = o.dragger.draggingController) == null || C.setEelementOpacity('')
      }, 500))
  }
  return (
    le(() => {
      _()
    }),
    { draggedData: l, isDragging: s, itemDragstart: g }
  )
}
function On(e, t, n, r) {
  const [i, a] = N(),
    u = ee()
  function o(s, c) {
    if (!n) return
    const l = new Ln(e, u)
    c.stopPropagation(),
      l.dragger.dragStart(c, s),
      window.addEventListener('mousemove', f),
      window.addEventListener('mouseup', d)
    function f(g) {
      l.dragger.mouseMove(g), r && r(), a(l.dragger.draggingController)
    }
    function d(g) {
      var v, E, $
      a(null), l.dragger.dragEnd(g)
      const h = { ...((v = l.dragger.draggingController) == null ? void 0 : v.item.sourceEvent) }
      ;(h.end = (E = l.dragger.draggingController) == null ? void 0 : E.eventSourceEnd),
        (h.start = ($ = l.dragger.draggingController) == null ? void 0 : $.eventSourceStart),
        t(h),
        l.dragger.hasMouseMoved,
        window.removeEventListener('mousemove', f),
        window.removeEventListener('mouseup', d)
    }
  }
  return { onmousedownH: o, draggedData: i }
}
var ho = A('<div class=fec-daily-timeBar><div class=fec-daily-timeBar-ball>'),
  vo = (e) => {
    const [t, n] = N(0)
    $e(() => {
      const u = e.container.current.clientHeight / 24 / 60,
        s = (new Date().getHours() * 60 + new Date().getMinutes()) * u
      n(s)
    })
    let r = setInterval(() => {
      const u = e.container.current.clientHeight / 24 / 60,
        s = (new Date().getHours() * 60 + new Date().getMinutes()) * u
      n(s)
    }, 6e4)
    le(() => {
      clearInterval(r)
    })
    function i() {
      return `top:${t()}px`
    }
    return (() => {
      var a = ho()
      return L((u) => z(a, i(), u)), a
    })()
  },
  mo = A(
    '<div><div style=position:sticky;top:0px;bottom:30px class="tooltip-multiline fec-event-info"><div class="fec-item-trunctae fec-event-name"></div><div><span class=event-time-detals></span></div></div><div class=fec-resizer>'
  ),
  Rn = (e) => {
    const t = () => e.event.doesEventStartOn(e.gridDate)
    function n() {
      return t() && !e.top0 ? e.event.calculatePositionTop() : 'top:0'
    }
    const r = M(() =>
      e.event.doesEventEndOn(e.gridDate)
        ? e.event.calculateHeight(!t())
        : `height:${2400 - e.event.getEventTopPositionIng()}%`
    )
    function i() {
      return `;background-color:${e.event.color}`
    }
    function a() {
      const o = e.event.doesEventEndOn(e.gridDate)
      if (t()) {
        if (!o) return 'border-bottom-left-radius: 0px;border-bottom-right-radius:0px'
      } else return 'border-top-left-radius: 0px;border-top-right-radius:0px'
      return ''
    }
    function u() {
      const o = e.event.calculateHeightPersentage(!t())
      return (e.oneHoureInPixel * o) / 100 < 40
    }
    return (() => {
      var o = mo(),
        s = o.firstChild,
        c = s.firstChild,
        l = c.nextSibling,
        f = l.firstChild,
        d = s.nextSibling
      return (
        (o.$$mousedown = (g) => {
          xt(g) && e.onDragStart(e.event, g, !t())
        }),
        m(c, () => e.event.name),
        m(f, () => Lt(e.event.start, e.event.end, e.locale)),
        (d.$$mousedown = e.onMouseDown),
        (d.$$mousedownData = e.event),
        L(
          (g) => {
            var h = 'event-' + e.event.id,
              v = `fec-event ${u() ? 'fec-one-line-event ' : ''} `,
              E = e.event.id,
              $ = `${n()} ;${r()} ;${e.width} ;${i()};${a()}`,
              _ = 'event-end-' + e.event.id
            return (
              h !== g.e && W(o, 'id', (g.e = h)),
              v !== g.t && se(o, (g.t = v)),
              E !== g.a && W(o, 'data-test-event-id', (g.a = E)),
              (g.o = z(o, $, g.o)),
              _ !== g.i && W(f, 'id', (g.i = _)),
              g
            )
          },
          { e: void 0, t: void 0, a: void 0, o: void 0, i: void 0 }
        ),
        o
      )
    })()
  }
X(['mousedown'])
var Do = A('<div class=fec-add-event-preview>'),
  wo = A(
    '<div class="fec-time-range "><div class=fec-some-container><div class=fec-time-rage-up-container><div></div><div></div></div><div class=fec-time-rage-down-container><div></div><div>'
  ),
  Eo = (e) => {
    let t = null
    const { onmousedownH: n, draggedData: r } = On('addEventWithResize', i, e.editable)
    function i(o) {
      if (!e.editable) return
      const s = Mt(new ie(o), e.timeZone)
      ;(s.id = Ge()),
        e.stopAddEvent ? (e.setContainerRef(t), e.setEventPreview(s, e.houre)) : e.setEventPreview(null, null),
        e.onAddEvent(s)
    }
    function a(o, s, c) {
      if (e.showModal) return
      const l = new Date(e.gridDate),
        f = new Date(e.gridDate)
      l.setHours(o, s), f.setHours(o, s + 15)
      let d = { start: l, end: f, name: We(e.locale, 'no_title'), id: Ge() }
      e.group && (d.groups = [e.group.id])
      const g = new ie(d)
      e.setEventPreview(g, e.houre), n(g, c)
    }
    function u(o) {
      return `top:${o.getMinutes() + 'px'}`
    }
    return (() => {
      var o = wo(),
        s = o.firstChild,
        c = s.firstChild,
        l = c.firstChild,
        f = l.nextSibling,
        d = c.nextSibling,
        g = d.firstChild,
        h = g.nextSibling
      return (
        m(
          o,
          D(j, {
            get when() {
              return e.eventPreviewData
            },
            get children() {
              var v = Do(),
                E = t
              return (
                typeof E == 'function' ? G(E, v) : (t = v),
                m(
                  v,
                  D(Rn, {
                    get locale() {
                      return e.locale
                    },
                    get event() {
                      return e.eventPreviewData
                    },
                    get gridDate() {
                      return e.gridDate
                    },
                    width: 'width:calc(100% - 20px)',
                    onMouseDown: () => {},
                    onDragStart: () => {},
                    top0: !0,
                    get oneHoureInPixel() {
                      return e.oneHoureInPixel
                    }
                  })
                ),
                L(($) => {
                  var _
                  return z(v, u((_ = e.eventPreviewData) == null ? void 0 : _.start), $)
                }),
                v
              )
            }
          }),
          s
        ),
        (l.$$mousedown = (v) => a(e.houre, 0, v)),
        (f.$$mousedown = (v) => a(e.houre, 15, v)),
        (g.$$mousedown = (v) => a(e.houre, 30, v)),
        (h.$$mousedown = (v) => a(e.houre, 45, v)),
        L(() => W(o, 'data-test-time-range-id', e.houre + 1)),
        o
      )
    })()
  }
X(['mousedown'])
var yo = (e) => {
    let [t, n] = N(null)
    const {
      modalElementNode: r,
      setSlotModalData: i,
      openSlotModalOnElement: a,
      slotModalData: u,
      isSlotModalOpen: o
    } = Ae('addModal', s)
    function s() {
      i(null), n(null)
    }
    function c(d, g) {
      e.editable && (n(g), i(d))
    }
    const l = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23]
    function f(d) {
      return d === t() ? u() : null
    }
    return [
      r,
      D(Z, {
        each: l,
        children: (d, g) =>
          D(Eo, {
            get onAddEvent() {
              return e.onAddEvent
            },
            get gridDate() {
              return e.gridDate
            },
            get locale() {
              return e.locale
            },
            get timeZone() {
              return e.timeZone
            },
            get oneHoureInPixel() {
              return e.oneHoureInPixel
            },
            get editable() {
              return e.editable
            },
            get group() {
              return e.group
            },
            get houre() {
              return g()
            },
            get eventPreviewData() {
              return f(g())
            },
            setEventPreview: c,
            setContainerRef: a,
            get showModal() {
              return o()
            },
            get stopAddEvent() {
              return e.stopAddEvent
            }
          })
      })
    ]
  },
  Co = A('<div class="drag-element fec-event drag-element-grabbiing"><div> </div><div>'),
  Ao = A('<div class=fec-basic-grid><div class=fec-daily-grid><div class="fec-preview-wrapper fec-dragger-wrapper">'),
  $o = A('<div class=fec-events-holder>'),
  _o = A('<div class="fec-event-colom ">'),
  So = {
    events: [],
    onEventUpdate: () => {},
    onAddEvent: () => {},
    onEventClick: () => {},
    gridDate: new Date(),
    gridHeight: 65 * 24,
    id: '',
    locale: 'en',
    timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    editable: !0,
    avalibalSots: [],
    stopAddEvent: !1,
    group: null
  },
  In = (e) => {
    let t = { current: '' },
      n = { curret: '' }
    const r = he(So, e),
      { onmousedownH: i } = On('eventResizer', v, r.editable),
      { draggedData: a, isDragging: u, itemDragstart: o } = go(t, h, n, r.editable, F),
      { modalElementNode: s, setSlotModalData: c, openSlotModalOnElement: l, isSlotModalOpen: f } = Ae('eventClick')
    $e(() => {
      setTimeout(() => {
        r.container ? (n.current = g == null ? void 0 : g.querySelector('#' + r.container)) : (n.current = t.current)
      }, 0)
    })
    const d = M(() => lo(r.events)),
      g = ee()
    function h(b) {
      var I
      const p = { ...((I = b.item) == null ? void 0 : I.sourceEvent) }
      ;(p.start = b.eventSourceStart), (p.end = b.eventSourceEnd), b.item && r.onEventUpdate(p, b)
    }
    function v(b) {
      r.onEventUpdate(b)
    }
    function E() {
      return `width : ${a().width};height : ${a().height};left:${a().left} ; transition : ${a().animation};${
        a().animation ? 'box-shadow: none;opacity:0.9' : ''
      } ;top:${a().top};position:fixed;background-color:${a().item.color}`
    }
    function $() {
      return r.gridHeight / 24
    }
    function _() {
      return `height:${$()}px`
    }
    function F(b, p) {
      r.onEventClick(b), c(b), l(p)
    }
    return [
      s,
      (() => {
        var b = Ao(),
          p = b.firstChild,
          I = p.firstChild,
          C = t.current
        return (
          typeof C == 'function' ? G(C, b) : (t.current = b),
          m(
            b,
            D(Z, {
              get each() {
                return d()
              },
              children: (S) =>
                (() => {
                  var B = $o()
                  return (
                    m(
                      B,
                      D(Z, {
                        get each() {
                          return Object.values(S)
                        },
                        children: (w, x) =>
                          (() => {
                            var R = _o()
                            return (
                              m(
                                R,
                                D(Z, {
                                  each: w,
                                  children: (U) =>
                                    D(Rn, {
                                      get locale() {
                                        return r.locale
                                      },
                                      event: U,
                                      get oneHoureInPixel() {
                                        return $()
                                      },
                                      get gridDate() {
                                        return r.gridDate
                                      },
                                      get width() {
                                        return co(S, U, x() + 1)
                                      },
                                      onMouseDown: i,
                                      onDragStart: o
                                    })
                                })
                              ),
                              L(() => W(R, 'data-test-col-id', x())),
                              R
                            )
                          })()
                      })
                    ),
                    L((w) => z(B, _(), w)),
                    B
                  )
                })()
            }),
            p
          ),
          m(
            p,
            D(j, {
              get when() {
                return Sn(r.gridDate)
              },
              get children() {
                return D(vo, { container: t })
              }
            }),
            I
          ),
          m(
            p,
            D(yo, {
              get onAddEvent() {
                return r.onAddEvent
              },
              get gridDate() {
                return r.gridDate
              },
              get locale() {
                return r.locale
              },
              get timeZone() {
                return r.timeZone
              },
              get oneHoureInPixel() {
                return $()
              },
              get editable() {
                return r.editable
              },
              get stopAddEvent() {
                return r.stopAddEvent
              },
              get group() {
                return r.group
              }
            }),
            I
          ),
          m(
            I,
            D(j, {
              get when() {
                return u()
              },
              get children() {
                var S = Co(),
                  B = S.firstChild
                B.firstChild
                var w = B.nextSibling
                return (
                  m(
                    B,
                    () => {
                      var x
                      return (x = a().item) == null ? void 0 : x.name
                    },
                    null
                  ),
                  m(w, () => Lt(a().dragedStartDate, a().dragedEndDate, r.locale)),
                  L(
                    (x) => {
                      var J
                      var R = 'draging-event-' + ((J = a().item) == null ? void 0 : J.id),
                        U = E()
                      return R !== x.e && W(S, 'id', (x.e = R)), (x.t = z(S, U, x.t)), x
                    },
                    { e: void 0, t: void 0 }
                  ),
                  S
                )
              }
            })
          ),
          L(
            (S) => {
              var B = r.id,
                w = `height: ${r.gridHeight}px`,
                x = _()
              return B !== S.e && W(b, 'id', (S.e = B)), (S.t = z(p, w, S.t)), (S.a = z(I, x, S.a)), S
            },
            { e: void 0, t: void 0, a: void 0 }
          ),
          b
        )
      })()
    ]
  }
function bo(e, t, n) {
  let r = 0
  for (let i = 0; i < e.length; i++) {
    const a = n.querySelector('#' + e[i])
    if (!a) return r
    const u = a.getBoundingClientRect()
    if (u.left < t && u.right > t) {
      r = i
      break
    }
  }
  return r
}
N(!1)
var Bo = bt()
function ko() {
  var e
  return (e = it(Bo)) == null ? void 0 : e.calendarContainer
}
var po = A('<div style=display:flex;width:100%;flex:1; id=fec-group-grid-container>'),
  xo = {
    events: [],
    initialDate: new Date(),
    cols: [],
    hasCrossGridDrag: !0,
    onEventUpdate: () => {},
    onAddEvent: () => {}
  },
  Pn = (e) => {
    let t
    const n = he(xo, e)
    let r = n.cols.map((o, s) => `cl-${s}`)
    const i = e.container ?? ko()
    function a(o, s, c) {
      if (s != null && s.isDragg) {
        const l = bo(r, s.mouseX, i)
        n.onEventUpdate(o, l, c, !0)
      } else n.onEventUpdate(o, c, c, !1)
    }
    const u = M(
      dn(
        () => n.cols,
        (o, s) =>
          D(
            hn,
            he(
              {
                get component() {
                  return n.gridComponent
                },
                onEventUpdate: (c, l) => {
                  a(c, l, s())
                },
                get onAddEvent() {
                  return n.onAddEvent
                },
                get id() {
                  return r[s()]
                },
                get container() {
                  return n.hasCrossGridDrag ? 'fec-group-grid-container' : ''
                }
              },
              () => o.props
            )
          )
      )
    )
    return (() => {
      var o = po(),
        s = t
      return typeof s == 'function' ? G(s, o) : (t = o), m(o, u), o
    })()
  },
  To = A('<div style=flex:1;height:100%;display:flex;flex-direction:column;><div style=" display:flex;">'),
  Hn = {
    events: [],
    id: '',
    initialDate: new Date(),
    timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    calendar: 'gregory',
    locale: 'en-US',
    showAllDay: !0,
    onDateChange: () => {},
    onEventUpdate: () => {},
    onEventClick: () => {},
    onAddEvent: () => {},
    gridHeight: 65 * 24,
    group: null,
    editable: !0,
    stopAddEvent: !0,
    avalibalSots: []
  },
  Mo = (e) => {
    const t = he(Hn, e),
      n = M(() => t.events.filter((i) => !i.isAllDay()))
    function r(i) {
      t.group ? t.onAddEvent(i, t.group.id) : t.onAddEvent(i)
    }
    return (() => {
      var i = To(),
        a = i.firstChild
      return (
        m(
          a,
          D(In, {
            get gridDate() {
              return t.initialDate
            },
            get events() {
              return n()
            },
            get locale() {
              return t.locale
            },
            get onEventUpdate() {
              return t.onEventUpdate
            },
            onAddEvent: r,
            get onEventClick() {
              return t.onEventClick
            },
            get gridHeight() {
              return t.gridHeight
            },
            get container() {
              return t.container
            },
            get timeZone() {
              return t.timeZone
            },
            get editable() {
              return t.editable
            },
            get avalibalSots() {
              return t.avalibalSots
            },
            get stopAddEvent() {
              return t.stopAddEvent
            },
            get group() {
              return t.group
            }
          })
        ),
        L(
          (u) => {
            var o = e.id,
              s = e.id
            return o !== u.e && W(i, 'id', (u.e = o)), s !== u.t && W(i, 'data-test-id-daily-grid', (u.t = s)), u
          },
          { e: void 0, t: void 0 }
        ),
        i
      )
    })()
  },
  Fo = A('<div><div class=fec-weekend-narrow></div><div class=fec-week-day>'),
  Lo = A('<div>'),
  Nn = (e) => {
    let t = { el: null }
    function n(a) {
      a.stopPropagation(), a.preventDefault(), e.onDateChange(e.headerDate)
    }
    const r = () => ({ date: e.headerDate, ondataChange: e.onDateChange }),
      { isSlotAvalibale: i } = ce(t, r, 'dailyHeader', () => e.headerDate)
    return (() => {
      var a = Lo(),
        u = t.el
      return (
        typeof u == 'function' ? G(u, a) : (t.el = a),
        m(
          a,
          D(j, {
            when: !i,
            get children() {
              var o = Fo(),
                s = o.firstChild,
                c = s.nextSibling
              return (
                m(s, () => $n(e.headerDate, e.calendar, e.timeZone, e.locale)),
                (c.$$click = n),
                m(c, () => fi(e.locale, e.calendar, e.timeZone, e.headerDate)),
                L(() => se(o, `fec-daily-header ${Sn(e.headerDate) ? 'fec-daily-header-today' : ' '}`)),
                o
              )
            }
          })
        ),
        a
      )
    })()
  }
X(['click'])
var Oo = A(
    '<div class=fec-all-collapser><svg xmlns=http://www.w3.org/2000/svg width=16 height=16 viewBox="0 0 16 16"fill=none><path d="M13.28 10.0333L8.93333 5.68667C8.42 5.17333 7.58 5.17333 7.06667 5.68667L2.72 10.0333"stroke=#7E7E7F stroke-width=1.5 stroke-miterlimit=10 stroke-linecap=round stroke-linejoin=round>'
  ),
  Ro = A('<div class=more-btn><div class=more-wrapper> +'),
  Io = A(
    '<div><div class=more-btn-container style=width:52px></div><div class=fec-all-day-container style=height:fit-content;max-height:81px;overflow:hidden;>'
  ),
  Po = A('<div>'),
  Ho = (e) => {
    const t = M(() => lt(e.events.filter((d) => d.isAllDay()))),
      { modalElementNode: n, setSlotModalData: r, openSlotModalOnElement: i, isSlotModalOpen: a } = Ae('eventClick')
    let u,
      o = 0
    function s() {
      e.setIsAllDOpen(!e.isAllDOpen)
    }
    let c = !1
    ge(
      je(
        () => e.isAllDOpen,
        () => {
          const d = u
          if (d)
            if (e.isAllDOpen) {
              if (((o = d.clientHeight), (d.style.height = d.clientHeight + 'px'), (d.style.maxHeight = 'initial'), !c))
                return
              setTimeout(() => {
                ;(d.style.height = d.scrollHeight + 'px'), (d.style.maxHeight = '220px')
              }, 0),
                setTimeout(() => {
                  ;(d.style.overflow = 'auto'), (d.style.height = 'fit-content')
                }, 500)
            } else {
              if (((d.style.height = d.clientHeight + 'px'), (d.style.maxHeight = 'initial'), !c)) return
              setTimeout(() => {
                ;(d.style.height = o + 'px'), (d.style.overflow = 'hidden')
              }, 0),
                setTimeout(() => {
                  ;(d.style.height = 'fit-content'), (d.style.maxHeight = '81px')
                }, 500)
            }
        }
      )
    ),
      ge(
        je(
          () => e.events,
          () => {
            if (!(t().length > 0)) {
              const d = u
              if (!d) return
              d.style.height = 'fit-content'
            }
          }
        )
      ),
      $e(() => {
        c = !0
      })
    function f(d, g) {
      e.onEventClick(d), r(d), i(g.target)
    }
    return [
      n,
      D(j, {
        get when() {
          return t().length > 0
        },
        get children() {
          var d = Io(),
            g = d.firstChild,
            h = g.nextSibling
          m(
            g,
            D(j, {
              get when() {
                return t().length > 2
              },
              get children() {
                var E = Oo()
                return (E.$$click = s), E
              }
            })
          )
          var v = u
          return (
            typeof v == 'function' ? G(v, h) : (u = h),
            m(
              h,
              D(Z, {
                get each() {
                  return t()
                },
                children: (E) =>
                  (() => {
                    var $ = Po()
                    return (
                      ($.$$click = f),
                      ($.$$clickData = E),
                      m($, () => `${E.name} `),
                      L(
                        (_) => {
                          var F = E.id,
                            b = `background-color:${E.color}`,
                            p = `all-day-wrapper ${An(E, e.initialDate)}`
                          return (
                            F !== _.e && W($, 'data-testid', (_.e = F)),
                            (_.t = z($, b, _.t)),
                            p !== _.a && se($, (_.a = p)),
                            _
                          )
                        },
                        { e: void 0, t: void 0, a: void 0 }
                      ),
                      $
                    )
                  })()
              }),
              null
            ),
            m(
              h,
              D(j, {
                get when() {
                  return t().length > 2
                },
                get children() {
                  var E = Ro(),
                    $ = E.firstChild,
                    _ = $.firstChild
                  return (E.$$click = s), m($, () => be(e.locale, t().length - 2), _), E
                }
              }),
              null
            ),
            L(() => se(d, `all-d-wrapeer-header ${e.isAllDOpen ? 'alld-open' : 'fec-alld-not-open'}`)),
            d
          )
        }
      })
    ]
  }
X(['click'])
var No = A('<div class=fec-groupContainer><div class=fec-group-name></div><div class=fec-group-avatar> '),
  jo = A('<div class=fec-some-border>'),
  Uo = A('<div class=fec-some-borderw>'),
  Go = A('<div style=position:relative>'),
  Zo = (e) => {
    const t = () => ({ group: e.group })
    let n = { el: null }
    const { isSlotAvalibale: r } = ce(n, t, 'groupContainer', () => e.group)
    return (() => {
      var i = Go(),
        a = n.el
      return (
        typeof a == 'function' ? G(a, i) : (n.el = i),
        m(
          i,
          D(j, {
            when: !r,
            get children() {
              return [
                (() => {
                  var u = No(),
                    o = u.firstChild,
                    s = o.nextSibling
                  return s.firstChild, m(o, () => e.group.name), m(s, () => e.group.name[0], null), u
                })(),
                jo(),
                Uo()
              ]
            }
          })
        ),
        i
      )
    })()
  },
  qo = A('<div style=display:flex;position:relative><div class=fec-group-item-header>'),
  zo = A('<div class=fec-alld-main-container>'),
  Wo = {
    events: [],
    id: '',
    initialDate: new Date(),
    timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    calendar: 'gregory',
    locale: 'en-US',
    showAllDay: !0,
    onDateChange: () => {},
    onEventUpdate: () => {},
    onEventClick: () => {},
    onAddEvent: () => {},
    gridHeight: 65 * 24,
    avalibalSots: []
  },
  Ko = (e) => {
    const t = he(Wo, e),
      [n, r] = N(!1)
    return [
      (() => {
        var i = qo(),
          a = i.firstChild
        return (
          m(
            i,
            D(Nn, {
              get headerDate() {
                return t.initialDate
              },
              get slotRenderStore() {
                return t.slotRenderStore
              },
              get timeZone() {
                return t.timeZone
              },
              get calendar() {
                return t.calendar
              },
              get onDateChange() {
                return t.onDateChange
              },
              get locale() {
                return t.locale
              }
            }),
            a
          ),
          m(
            a,
            D(Z, {
              get each() {
                return t.columData
              },
              children: (u) =>
                D(j, {
                  get when() {
                    return u.props.group
                  },
                  get children() {
                    return D(Zo, {
                      get group() {
                        return u.props.group
                      }
                    })
                  }
                })
            })
          ),
          i
        )
      })(),
      (() => {
        var i = zo()
        return (
          m(
            i,
            D(Z, {
              get each() {
                return t.columData
              },
              children: (a) =>
                D(Ho, {
                  get isAllDOpen() {
                    return n()
                  },
                  setIsAllDOpen: r,
                  get onEventClick() {
                    return t.onEventClick
                  },
                  get locale() {
                    return t.locale
                  },
                  get events() {
                    return a.props.events
                  },
                  get initialDate() {
                    return t.initialDate
                  }
                })
            })
          ),
          i
        )
      })()
    ]
  }
function Yo(e, t) {
  const n = yn([
    {
      props: {
        events: [],
        initialDate: e.initialDate,
        locale: e.locale,
        timeZone: e.timeZone,
        editable: e.editable,
        calendar: e.calendar,
        showAllDay: !0
      }
    }
  ])
  function r() {
    for (let a = 0; a < e.groups.length; a++)
      if (!n[a]) {
        let u = {
          props: { events: [], initialDate: null, locale: null, timeZone: null, calendar: null, showAllDay: !1 }
        }
        n.push(u)
      }
  }
  function i() {
    if ((r(), e.groups.length > 0))
      for (let a = 0; a < e.groups.length; a++) {
        const u = e.groups[a].id,
          o = e.events.filter((s) => s.groups.includes(u))
        ;(n[a].props.events = qe(o, e.initialDate)),
          (n[a].props.initialDate = new Date(e.initialDate)),
          (n[a].props.gridDate = new Date(e.initialDate)),
          (n[a].props.locale = e.locale),
          (n[a].props.timeZone = e.timeZone),
          (n[a].props.calendar = e.calendar),
          (n[a].props.gridHeight = e.gridHeight),
          (n[a].props.showAllDay = !0),
          (n[a].props.editable = e.editable),
          (n[a].props.avalibalSots = e.avalibalSots),
          (n[a].props.onDateChange = t),
          (n[a].props.group = e.groups[a]),
          (n[a].props.slotRenderStore = e.slotRenderStore),
          (n[a].props.stopAddEvent = e.stopAddEvent),
          (n[a].props.onEventClick = e.onEventClick)
      }
    else
      (n[0].props.events = qe(e.events, e.initialDate)),
        (n[0].props.initialDate = new Date(e.initialDate)),
        (n[0].props.gridDate = new Date(e.initialDate)),
        (n[0].props.locale = e.locale),
        (n[0].props.timeZone = e.timeZone),
        (n[0].props.calendar = e.calendar),
        (n[0].props.gridHeight = e.gridHeight),
        (n[0].props.showAllDay = !0),
        (n[0].props.avalibalSots = e.avalibalSots),
        (n[0].props.editable = e.editable),
        (n[0].props.onDateChange = t),
        (n[0].props.slotRenderStore = e.slotRenderStore),
        (n[0].props.stopAddEvent = e.stopAddEvent),
        (n[0].props.onEventClick = e.onEventClick)
  }
  return ge(i), { columData: n, generageCols: i }
}
var Vo = A(
    '<div class="fec-scroll-wrapper "id=fec-scroll-wrapper><div style=position:absolute;width:100%;display:flex;>'
  ),
  Xo = { ...Hn, groups: [] },
  Qo = (e) => {
    const t = he(Xo, e),
      n = ee()
    function r(u) {
      t.onDateChange(u)
    }
    const { columData: i } = Yo(t, r)
    function a(u, o) {
      o ? t.onAddEvent({ ...u, groups: [o] }) : t.onAddEvent(u)
    }
    return [
      D(Ko, {
        get slotRenderStore() {
          return t.slotRenderStore
        },
        columData: i,
        get onDateChange() {
          return t.onDateChange
        },
        get onEventClick() {
          return t.onEventClick
        },
        get locale() {
          return t.locale
        },
        get initialDate() {
          return t.initialDate
        }
      }),
      (() => {
        var u = Vo(),
          o = u.firstChild
        return (
          m(
            o,
            D(jn, {
              get locale() {
                return t.locale
              }
            }),
            null
          ),
          m(
            o,
            D(Pn, {
              gridComponent: Mo,
              cols: i,
              get onEventUpdate() {
                return t.onEventUpdate
              },
              onAddEvent: a,
              get initialDate() {
                return t.initialDate
              },
              hasCrossGridDrag: !1,
              container: n
            }),
            null
          ),
          u
        )
      })()
    ]
  },
  Jo = A('<div class="fec-daily-time-ranges ">'),
  eu = A('<div class=fec-time-range-time>'),
  tu = A('<div class=fec-time-range-hairline>'),
  nu = A('<div>'),
  ru = [
    '',
    new Date(' Aug 07 2023 01:00:00'),
    new Date(' Aug 07 2023 02:00:00'),
    new Date(' Aug 07 2023 03:00:00'),
    new Date(' Aug 07 2023 04:00:00'),
    new Date(' Aug 07 2023 05:00:00'),
    new Date(' Aug 07 2023 06:00:00'),
    new Date(' Aug 07 2023 07:00:00'),
    new Date(' Aug 07 2023 08:00:00'),
    new Date(' Aug 07 2023 09:00:00'),
    new Date(' Aug 07 2023 10:00:00'),
    new Date(' Aug 07 2023 11:00:00'),
    new Date(' Aug 07 2023 12:00:00'),
    new Date(' Aug 07 2023 13:00:00'),
    new Date(' Aug 07 2023 14:00:00'),
    new Date(' Aug 07 2023 15:00:00'),
    new Date(' Aug 07 2023 16:00:00'),
    new Date(' Aug 07 2023 17:00:00'),
    new Date(' Aug 07 2023 18:00:00'),
    new Date(' Aug 07 2023 19:00:00'),
    new Date(' Aug 07 2023 20:00:00'),
    new Date(' Aug 07 2023 21:00:00'),
    new Date(' Aug 07 2023 22:00:00'),
    new Date(' Aug 07 2023 23:00:00')
  ],
  jn = (e) =>
    (() => {
      var t = Jo()
      return (
        m(
          t,
          D(Z, {
            each: ru,
            children: (n) =>
              D(iu, {
                time: n,
                get locale() {
                  return e.locale
                }
              })
          })
        ),
        t
      )
    })(),
  iu = (e) => {
    let t = { el: null }
    const n = () => ({ time: e.time }),
      { isSlotAvalibale: r } = ce(t, n, 'timeRange', () => {})
    return (() => {
      var i = nu(),
        a = t.el
      return (
        typeof a == 'function' ? G(a, i) : (t.el = i),
        m(
          i,
          D(j, {
            when: !r,
            get children() {
              return [
                (() => {
                  var u = eu()
                  return (
                    m(
                      u,
                      (() => {
                        var o = M(() => !!e.time)
                        return () => (o() && Tt(e.time, e.locale)) || ''
                      })()
                    ),
                    u
                  )
                })(),
                tu()
              ]
            }
          })
        ),
        i
      )
    })()
  },
  Un = { code: Qo, name: 'daily', type: 'grid' }
function Gn(e, t) {
  const n = me(t)
  return e.start >= n ? e.start.getDay() : 0
}
function Zn(e, t, n) {
  if (e.isAllDay && !e.isAllDay()) return 1
  const r = de(t)
  return e.end <= r ? e.end.getDay() - n + 1 : 6 - n + 1
}
function qn(e, t, n, r) {
  let i = [0, 0, 0, 0, 0, 0, 0]
  const a = Object.keys(e).filter((u, o) => o + 1 > r)
  for (let u = 0; u < a.length; u++) {
    const o = e[a[u]]
    for (let s = 0; s < o.length; s++) {
      const c = o[s],
        l = M(() => Gn(c, t)),
        f = Zn(c, n, l())
      for (let d = l(); d < f + l(); d++) i[d] = i[d] + 1
    }
  }
  return i
}
var au = A('<div class="fec-modal-event-list fec-custome-scroll-bar ">'),
  ou = A('<div><div class=fec-event-time-month></div><div class=fec-event-name-month>'),
  uu = (e) => {
    function t(l, f) {
      const d = (g) => {
        var h
        return !l.contains(g.target) && ((h = f()) == null ? void 0 : h())
      }
      document.addEventListener('click', d), le(() => document.removeEventListener('click', d))
    }
    function n() {
      const l = { ...e.modalData }
      ;(l.show = !1), e.setModalData(l)
    }
    let r = null
    const i = ee()
    function a() {
      var l
      document.removeEventListener('mouseup', a),
        document.removeEventListener('mousemove', u),
        (l = i == null ? void 0 : i.querySelector('#fec-month-wrapper-id')) == null ||
          l.classList.remove('fec-month-is-dragging'),
        e.onDragEnd(),
        (r = null)
    }
    function u(l) {
      r && e.onDragStart(e.modalData.somDate, l, r)
    }
    function o(l) {
      var f
      ;(r = l),
        document.addEventListener('mouseup', a),
        document.addEventListener('mousemove', u),
        (f = i == null ? void 0 : i.querySelector('#fec-month-wrapper-id')) == null ||
          f.classList.add('fec-month-is-dragging')
    }
    function s(l) {
      return l != null && l.isAllDay ? (l != null && l.isAllDay() ? '' : 'fec-month-item-no-all-day') : ''
    }
    function c(l, f) {
      f.stopPropagation(), f.preventDefault(), e.eventClick(l, f)
    }
    return D(j, {
      get when() {
        return e.modalData.show
      },
      get children() {
        var l = au()
        return (
          G(t, l, () => n),
          m(
            l,
            D(Z, {
              get each() {
                return e.modalData.events
              },
              children: (f) =>
                (() => {
                  var d = ou(),
                    g = d.firstChild,
                    h = g.nextSibling
                  return (
                    (d.$$mousedown = o),
                    (d.$$mousedownData = f),
                    (d.$$click = c),
                    (d.$$clickData = f),
                    m(g, () => `${s(f) ? Tt(f.start, e.locale) : ''} `),
                    m(h, () => (s(f) ? `(${f.name})` : f.name)),
                    L(
                      (v) => {
                        var E = `fec-modal-event ${s(f)} ${An(f, e.modalData.somDate)}`,
                          $ = `background:${f.color};--ca-color:${f.color}`
                        return E !== v.e && se(d, (v.e = E)), (v.t = z(d, $, v.t)), v
                      },
                      { e: void 0, t: void 0 }
                    ),
                    d
                  )
                })()
            })
          ),
          L((f) => z(l, `left:${e.modalData.left};top:${e.modalData.bottom};`, f)),
          l
        )
      }
    })
  }
X(['click', 'mousedown'])
var lu = A('<div class=fec-month-header><div></div><div></div><div></div><div></div><div></div><div></div><div>'),
  su = (e) => {
    function t(n) {
      return $n(n, e.calendar, e.timeZone, e.locale)
    }
    return (() => {
      var n = lu(),
        r = n.firstChild,
        i = r.nextSibling,
        a = i.nextSibling,
        u = a.nextSibling,
        o = u.nextSibling,
        s = o.nextSibling,
        c = s.nextSibling
      return (
        m(r, () => t(e.headerData[0].date)),
        m(i, () => t(e.headerData[1].date)),
        m(a, () => t(e.headerData[2].date)),
        m(u, () => t(e.headerData[3].date)),
        m(o, () => t(e.headerData[4].date)),
        m(s, () => t(e.headerData[5].date)),
        m(c, () => t(e.headerData[6].date)),
        n
      )
    })()
  }
function cu(e, t) {
  const n = [],
    r = []
  for (let i = 0; i < e.length; i++) {
    const a = ct(t, e[i][0].date, e[i][6].date)
    n.push(a)
  }
  for (let i = 0; i < n.length; i++) {
    const a = n[i]
    let u = {}
    Pt(a, u), r.push(u)
  }
  return r
}
function Pt(e, t) {
  for (let n = 0; n < e.length; n++) {
    const r = e[n]
    du(t, r)
  }
}
function du(e, t) {
  let n = !1
  function r(i, a, u) {
    if (n) return
    i[a] || (i[a] = [])
    const o = i[a]
    fu(o, u) ? ((n = !0), i[a].push(u)) : r(i, a + 1, u)
  }
  r(e, 0, t)
}
function fu(e, t) {
  let n = !0
  for (let r = 0; r < e.length; r++)
    if (e[r].checkAllDayOverLap(t)) {
      n = !1
      break
    }
  return n
}
var zn = class {
    constructor(e) {
      y(this, 'container')
      this.container = e
    }
  },
  en = class extends zn {
    constructor() {
      super(...arguments)
      y(this, 'draggingController', null)
      y(this, 'startingDate', null)
      y(this, 'currentDate', null)
    }
    onDragStart(t, n, r) {
      ;(this.draggingController = new ut(n, t, this.container)), r && (this.startingDate = r)
    }
    onMouseEnter(t, n) {
      var r
      if (this.startingDate) {
        let i = _n(this.startingDate, t)
        this.currentDate != i &&
          ((this.currentDate = i), (r = this.draggingController) == null || r.shiftTimeByDay(i), n())
      } else this.startingDate = t
    }
    onDragEnd() {
      this.startingDate = null
    }
  },
  gu = class extends zn {
    constructor() {
      super(...arguments)
      y(this, 'draggingController', null)
      y(this, 'startingDate', null)
      y(this, 'currentDate', null)
    }
    onDragStart(t, n, r) {
      ;(this.draggingController = new ut(n, t, this.container)), r && (this.startingDate = r)
    }
    onMouseEnter(t, n) {
      var r, i, a, u, o, s
      if (this.startingDate) {
        let c = _n(this.startingDate, t)
        this.currentDate != c &&
          ((this.currentDate = c),
          c < 0
            ? ((r = this.draggingController) == null || r.shiftStartByDay(c),
              (i = this.draggingController) == null || i.shiftEndByDay(0))
            : c > 0
            ? ((a = this.draggingController) == null || a.shiftEndByDay(c),
              (u = this.draggingController) == null || u.shiftStartByDay(0))
            : ((o = this.draggingController) == null || o.shiftEndByDay(c),
              (s = this.draggingController) == null || s.shiftStartByDay(c)),
          n())
      } else this.startingDate = t
    }
    onDragEnd() {
      this.startingDate = null
    }
  },
  tn = class {
    constructor(e, t) {
      y(this, 'dragger')
      y(this, 'draggerMode')
      switch (((this.draggerMode = e), e)) {
        case 'editEventRow':
          this.dragger = new en(t)
          break
        case 'addEventRow':
          this.dragger = new gu(t)
          break
        default:
          this.dragger = new en(t)
          break
      }
    }
  }
function Wn(e, t = !0, n = 'editEventRow') {
  const [r, i] = N(null)
  let a = new tn(n, ee())
  function u(f, d, g) {
    t && (a.dragger.onDragStart(f, d, g), r() || i(a.dragger.draggingController))
  }
  function o(f) {
    t &&
      r() &&
      a.dragger.onMouseEnter(f, () => {
        i(null), i(a.dragger.draggingController)
      })
  }
  function s(f = !0) {
    var d, g, h
    if ((a.dragger.onDragEnd(), r())) {
      const v = { ...((d = r()) == null ? void 0 : d.item.sourceEvent) }
      ;(v.start = (g = r()) == null ? void 0 : g.eventSourceStart),
        (v.end = (h = r()) == null ? void 0 : h.eventSourceEnd),
        v && e(v, a.draggerMode)
    }
    f && i(null)
  }
  const c = ee()
  function l(f) {
    a = new tn(f, c)
  }
  return {
    onDragEnd: s,
    onDragStart: u,
    onMouseEnter: o,
    draggingEventData: r,
    changeDraggerType: l,
    setDraggingEventData: i
  }
}
var hu = A('<div class=fec-month-row-container>'),
  vu = A('<div class=fec-month-row-wrapper>'),
  mu = (e) => {
    function t(n) {
      return n.slice(0, e.rowLimit)
    }
    return (() => {
      var n = hu()
      return (
        m(
          n,
          D(Z, {
            get each() {
              return t(Object.keys(e.monthRowData))
            },
            children: (r, i) =>
              (() => {
                var a = vu()
                return (
                  m(
                    a,
                    D(Z, {
                      get each() {
                        return e.monthRowData[r]
                      },
                      children: (u) =>
                        D(Ht, {
                          get locale() {
                            return e.locale
                          },
                          get isFirstRow() {
                            return e.monthRowIndex === 0
                          },
                          get onDragEnd() {
                            return e.onDragEnd
                          },
                          get ondragstart() {
                            return e.onDragStart
                          },
                          get onClick() {
                            return e.eventClick
                          },
                          item: u,
                          get endDate() {
                            return e.monthRowDates[6].date
                          },
                          get startDate() {
                            return e.monthRowDates[0].date
                          }
                        })
                    })
                  ),
                  L(() => W(a, 'data-test-id-row-wrapper', i())),
                  a
                )
              })()
          })
        ),
        L(() => W(n, 'data-test-id-fec-month-row', e.monthRowIndex)),
        n
      )
    })()
  },
  Du = A('<div class=fec-month-more-wrapper>'),
  wu = A('<div class=fec-month-more-btn> +'),
  Eu = A('<div class=fec-month-more-item>'),
  yu = (e) =>
    (() => {
      var t = Du()
      return (
        m(
          t,
          D(Z, {
            get each() {
              return qn(e.monthRowData, e.monthRowDates[0].date, e.monthRowDates[6].date, e.rowLimit)
            },
            children: (n, r) =>
              (() => {
                var i = Eu()
                return (
                  m(
                    i,
                    D(j, {
                      when: n > 0,
                      get children() {
                        var a = wu(),
                          u = a.firstChild
                        return (
                          (a.$$click = e.openModalEvents),
                          (a.$$clickData = e.monthRowDates[r()]),
                          m(a, () => be(e.locale, n), u),
                          a
                        )
                      }
                    })
                  ),
                  i
                )
              })()
          })
        ),
        t
      )
    })()
X(['click'])
var Cu = A('<div class=fec-month-container><div><div><span></span><div class=fec-month-name>'),
  Au = (e) => {
    function t(r) {
      r.stopPropagation(), r.preventDefault()
    }
    function n(r, i) {
      let a = !1
      function u() {
        a || (e.monthDateMouseDown(r, i), (a = !0)), document.removeEventListener('mousemove', u)
      }
      function o() {
        document.removeEventListener('mouseup', o), document.removeEventListener('mousemove', u)
      }
      document.addEventListener('mousemove', u), document.addEventListener('mouseup', o)
    }
    return D(Z, {
      get each() {
        return e.monthRowDates
      },
      children: (r, i) =>
        (() => {
          var a = Cu(),
            u = a.firstChild,
            o = u.firstChild,
            s = o.firstChild,
            c = s.nextSibling
          return (
            (a.$$mousemove = () => e.onMouseEnter(r.date)),
            (a.$$mousedown = n),
            (a.$$mousedownData = r.date),
            (o.$$click = (l) => e.dragClick(l, r.date)),
            (o.$$mousedown = t),
            m(s, () => be(e.locale, r.day)),
            m(c, () => ci(e.calendar, r.date, e.locale)),
            L(() => se(u, `fec-month-day-wrapper ${$u(r, i(), e.monthRowIndex, e.monthRowDates)}`)),
            a
          )
        })()
    })
  }
function $u(e, t, n, r) {
  var i, a
  if (e.isDateInsideMonth) {
    if (n === 0)
      return e.month != ((i = r[t + 1]) == null ? void 0 : i.month) ? 'fec-month-day-out' : 'fec-month-day-out-no-name'
    if (e.isDateInsideMonth)
      return e.month != ((a = r[t - 1]) == null ? void 0 : a.month) ? 'fec-month-day-out' : 'fec-month-day-out-no-name'
  }
  return ''
}
X(['mousedown', 'mousemove', 'click'])
var _u = A('<div class=fec-month-row><div class=fec-dragging-wrapper>'),
  Su = (e) =>
    (() => {
      var t = _u(),
        n = t.firstChild
      return (
        m(
          n,
          D(Kn, {
            get locale() {
              return e.locale
            },
            get isFirstRow() {
              return e.monthRowIndex === 0
            },
            onDragEnd: () => {},
            ondragstart: () => {},
            get item() {
              return e.draggingEventData
            },
            get startDate() {
              return e.monthRowDates[0].date
            },
            get endDate() {
              return e.monthRowDates[6].date
            }
          })
        ),
        m(
          t,
          D(mu, {
            get locale() {
              return e.locale
            },
            get monthRowIndex() {
              return e.monthRowIndex
            },
            get monthRowDates() {
              return e.monthRowDates
            },
            get rowLimit() {
              return e.rowLimit
            },
            get monthRowData() {
              return e.monthRowData
            },
            get onDragEnd() {
              return e.onDragEnd
            },
            get onDragStart() {
              return e.onDragStart
            },
            get eventClick() {
              return e.eventClick
            }
          }),
          null
        ),
        m(
          t,
          D(yu, {
            get locale() {
              return e.locale
            },
            get monthRowDates() {
              return e.monthRowDates
            },
            get rowLimit() {
              return e.rowLimit
            },
            get monthRowData() {
              return e.monthRowData
            },
            get openModalEvents() {
              return e.openModalEvents
            }
          }),
          null
        ),
        m(
          t,
          D(Au, {
            get locale() {
              return e.locale
            },
            get monthRowIndex() {
              return e.monthRowIndex
            },
            get monthRowDates() {
              return e.monthRowDates
            },
            get calendar() {
              return e.calendar
            },
            get dragClick() {
              return e.dragClick
            },
            get monthDateMouseDown() {
              return e.monthDateMouseDown
            },
            get onMouseEnter() {
              return e.onMouseEnter
            }
          }),
          null
        ),
        t
      )
    })(),
  bu = A('<div class=fec-month-wrapper id=fec-month-wrapper-id>'),
  Bu = {
    events: [],
    initialDate: new Date(),
    onEventUpdate: (e) => {},
    onDateChange: () => {},
    onGridChange: () => {},
    onEventClick: () => {},
    onAddEvent: () => {},
    locale: 'en-US',
    calendar: 'gregory',
    timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    rowLimit: 4,
    editable: !1
  },
  ku = (e) => {
    const t = he(Bu, e),
      [n, r] = N(4),
      [i, a] = N({ bottom: '0px', left: '0px', events: [], show: !1, somDate: new Date() })
    let u = null
    function o(T, P, V) {
      const re = qe(V, T.date),
        Se = P.target.getBoundingClientRect(),
        Ke = u == null ? void 0 : u.getBoundingClientRect(),
        ye = { ...i() }
      ;(ye.left = Se.left + 'px'),
        T.date.getDay() === 6 ? (ye.left = '83%') : T.date.getDay() === 0 && (ye.left = '1%'),
        (ye.bottom = Se.top - Ke.top + 'px'),
        (ye.show = !0),
        (ye.events = re),
        (ye.somDate = T.date),
        a(ye)
    }
    const {
        onDragEnd: s,
        onDragStart: c,
        onMouseEnter: l,
        draggingEventData: f,
        changeDraggerType: d,
        setDraggingEventData: g
      } = Wn(U, e.editable),
      { modalElementNode: h, setSlotModalData: v, openSlotModalOnElement: E, isSlotModalOpen: $ } = Ae('addModal', p),
      { modalElementNode: _, setSlotModalData: F, openSlotModalOnElement: b } = Ae('eventClick')
    function p() {
      g(null)
    }
    const I = M(() => lt(t.events))
    function C(T, P) {
      t.onEventClick(T), F(T), b(P.target)
    }
    const S = M(() => si(t.initialDate, t.calendar)),
      B = M(() => di(S(), 7)),
      w = M(() => {
        let T = Math.floor(((e.containerHeight - 75 - 40) / B().length - 50 - 30) / 23)
        return r(T), cu(B(), I())
      })
    function x(T, P) {
      o(T, P, I())
    }
    function R(T, P, V) {
      c(V, P, T)
    }
    function U(T, P) {
      const V = Mt(new ie(T), t.timeZone)
      P === 'editEventRow' ? t.onEventUpdate(T) : t.stopAddEvent ? v(V) : t.onAddEvent(V)
    }
    function J(T, P) {
      T.stopPropagation(), T.preventDefault(), t.onDateChange(P), t.onGridChange('daily')
    }
    function ae(T) {
      $() || l(T)
    }
    const we = ee()
    function _e(T, P) {
      if (!xt(P)) return
      P.stopPropagation(), P.preventDefault()
      const V = new Date(T),
        re = new Date(T)
      V.setHours(0, 0), re.setHours(23, 59, 59)
      const Ee = new ie({ start: V, end: re, name: We(t.locale, 'no_title'), id: Ge() })
      d('addEventRow'), c(Ee, P)
      const Se = () => {
        var Ke
        document.removeEventListener('mouseup', Se),
          e.stopAddEvent && !$()
            ? (v(Ee),
              we &&
                E(
                  (Ke = we.querySelector('#fec-month-wrapper-id')) == null
                    ? void 0
                    : Ke.querySelector('.fec-dragging-wrapper .fec-month-item')
                ),
              s(!1))
            : s(),
          d('editEventRow')
      }
      document.addEventListener('mouseup', Se)
    }
    return [
      h,
      _,
      D(su, {
        get headerData() {
          return S()
        },
        get locale() {
          return t.locale
        },
        get timeZone() {
          return t.timeZone
        },
        get calendar() {
          return t.calendar
        }
      }),
      (() => {
        var T = bu(),
          P = u
        return (
          typeof P == 'function' ? G(P, T) : (u = T),
          m(
            T,
            D(uu, {
              setModalData: a,
              get modalData() {
                return i()
              },
              eventClick: C,
              openEvSlotModalOnElement: b,
              setEvModalElement: F,
              get locale() {
                return t.locale
              },
              onDragEnd: s,
              onDragStart: R
            }),
            null
          ),
          m(
            T,
            D(Z, {
              get each() {
                return B()
              },
              children: (V, re) =>
                D(Su, {
                  get locale() {
                    return e.locale
                  },
                  get monthRowIndex() {
                    return re()
                  },
                  monthRowDates: V,
                  get draggingEventData() {
                    return f()
                  },
                  get rowLimit() {
                    return n()
                  },
                  get calendar() {
                    return e.calendar
                  },
                  get monthRowData() {
                    return w()[re()]
                  },
                  openModalEvents: x,
                  dragClick: J,
                  onDragEnd: s,
                  onDragStart: c,
                  monthDateMouseDown: _e,
                  onMouseEnter: ae,
                  eventClick: C
                })
            }),
            null
          ),
          T
        )
      })()
    ]
  },
  Kn = (e) => {
    function t() {
      return new pu(
        e.item.event.id,
        e.item.dragedStartDate,
        e.item.dragedEndDate,
        e.item.eventSourceEnd,
        e.item.eventSourceStart,
        e.item.event
      )
    }
    function n() {
      return e.dontCheackRange ? !0 : gi(t(), e.startDate, e.endDate)
    }
    return D(j, {
      get when() {
        return M(() => !!e.item)() && n()
      },
      get children() {
        return D(Ht, {
          get locale() {
            return e.locale
          },
          get isFirstRow() {
            return e.isFirstRow
          },
          onDragEnd: () => {},
          ondragstart: () => {},
          get item() {
            return t()
          },
          get endDate() {
            return e.endDate
          },
          get startDate() {
            return e.startDate
          }
        })
      }
    })
  },
  pu = class {
    constructor(e, t, n, r, i, a) {
      ;(this.id = e),
        (this.start = t),
        (this.end = n),
        (this.source = a),
        (this.color = a.color),
        (this.sourceStart = i),
        (this.sourceEnd = r),
        (this.name = a.name)
    }
  },
  xu = A('<div><div class=fec-event-time-month></div><div class=fec-event-name-month>'),
  Ht = (e) => {
    const t = M(() => Gn(e.item, e.startDate)),
      n = Zn(e.item, e.endDate, t()),
      [r, i] = N(!1),
      a = ee()
    function u(l, f) {
      if (!xt(f)) return
      f.stopPropagation(),
        f.preventDefault(),
        document.addEventListener('mouseup', g),
        document.addEventListener('mousemove', d)
      function d(h) {
        var v
        i(l),
          (v = a == null ? void 0 : a.querySelector('#fec-month-wrapper-id')) == null ||
            v.classList.add('fec-month-is-dragging'),
          e.ondragstart(e.item, h)
      }
      function g() {
        var h
        i(!1),
          document.removeEventListener('mouseup', g),
          document.removeEventListener('mousemove', d),
          (h = a == null ? void 0 : a.querySelector('#fec-month-wrapper-id')) == null ||
            h.classList.remove('fec-month-is-dragging'),
          e.onDragEnd()
      }
    }
    function o() {
      return `--ca-color:${e.item.color};${
        r() ? ';opacity:.7;' : ''
      };left:calc(${t()}00% + 7px);width:calc(${n}00% - 14px);background-color:${e.item.color}`
    }
    function s() {
      var l, f, d
      return (l = e == null ? void 0 : e.item) != null && l.isAllDay
        ? (f = e == null ? void 0 : e.item) != null && f.isAllDay()
          ? ''
          : 'fec-month-item-no-all-day'
        : e != null && e.item.source
        ? (d = e == null ? void 0 : e.item) != null && d.source.isAllDay()
          ? ''
          : 'fec-month-item-no-all-day'
        : ''
    }
    function c(l) {
      e.onClick && e.onClick(e.item, l)
    }
    return (() => {
      var l = xu(),
        f = l.firstChild,
        d = f.nextSibling
      return (
        (l.$$click = c),
        (l.$$mousedown = u),
        (l.$$mousedownData = !0),
        m(f, () => `${s() ? Tt(e.item.start, e.locale) : ''} `),
        m(d, () => (s() ? `(${e.item.name})` : e.item.name)),
        L(
          (g) => {
            var h = `fec-month-item ${s()} ${Qr(e.item, e.startDate, e.endDate)}`,
              v = `month--item-${e.item.id}`,
              E = o(),
              $ = e.item.id
            return (
              h !== g.e && se(l, (g.e = h)),
              v !== g.t && W(l, 'id', (g.t = v)),
              (g.a = z(l, E, g.a)),
              $ !== g.o && W(l, 'data-test-id-month-item', (g.o = $)),
              g
            )
          },
          { e: void 0, t: void 0, a: void 0, o: void 0 }
        ),
        l
      )
    })()
  }
X(['mousedown', 'click'])
var Yn = { code: ku, name: 'month', type: 'grid' },
  Tu = A(
    '<div class=fec-all-collapser><svg xmlns=http://www.w3.org/2000/svg width=16 height=16 viewBox="0 0 16 16"fill=none><path d="M13.28 10.0333L8.93333 5.68667C8.42 5.17333 7.58 5.17333 7.06667 5.68667L2.72 10.0333"stroke=#7E7E7F stroke-width=1.5 stroke-miterlimit=10 stroke-linecap=round stroke-linejoin=round>'
  ),
  Mu = A('<div class=more-btn-container style=width:51px>'),
  Fu = (e) =>
    (() => {
      var t = Mu()
      return (
        m(
          t,
          D(j, {
            get when() {
              return e.show
            },
            get children() {
              var n = Tu()
              return Bt(n, 'click', e.onClick, !0), n
            }
          })
        ),
        t
      )
    })()
X(['click'])
var Lu = A('<div class=fec-week-all-day-container123 data-test-id-all-w-c=1>'),
  Ou = A('<div class=fec-week-all-day-container123 data-test-id-all-w-c=2>'),
  Ru = A('<div class=fec-week-all-day-container123 data-test-id-all-w-c=3>'),
  Iu = A('<div class=fec-week-all-day-container123 data-test-id-all-w-c=4>'),
  Pu = A('<div class=fec-week-all-day-container123 data-test-id-all-w-c=5>'),
  Hu = A('<div class=fec-week-all-day-container123 data-test-id-all-w-c=6>'),
  Nu = A('<div class=fec-week-all-day-container123 data-test-id-all-w-c=7>'),
  ju = A('<div class=fec-week-all-day-container>'),
  Uu = (e) => {
    const {
        onDragEnd: t,
        onDragStart: n,
        setDraggingEventData: r,
        onMouseEnter: i,
        draggingEventData: a,
        changeDraggerType: u
      } = Wn(b, e.editable),
      { modalElementNode: o, setSlotModalData: s, openSlotModalOnElement: c, isSlotModalOpen: l } = Ae('addModal', v),
      { modalElementNode: f, setSlotModalData: d, openSlotModalOnElement: g, isSlotModalOpen: h } = Ae('eventClick')
    function v() {
      r(null)
    }
    ge(() => {
      e.setDraggingDate(a)
    })
    const E = M(() => {
      let w = {}
      return Pt(e.filteredEvents, w), w
    })
    function $() {
      return Object.keys(E())
    }
    const _ = ee()
    function F(w, x) {
      if (l()) return
      x.stopPropagation(), x.preventDefault()
      const R = new Date(e.headerDates[w]),
        U = new Date(e.headerDates[w])
      R.setHours(0, 0), U.setHours(23, 59, 59)
      const J = new ie({ start: R, end: U, name: We(e.locale, 'no_title'), id: Ge() })
      u('addEventRow'), n(J, x)
      const ae = () => {
        document.removeEventListener('mouseup', ae),
          e.stopAddEvent && !l()
            ? (s(J), c(_ == null ? void 0 : _.querySelector('.fec-week-all-day-wrapper .fec-month-item')), t(!1))
            : t(),
          u('editEventRow')
      }
      document.addEventListener('mouseup', ae)
    }
    function b(w, x) {
      const R = Mt(new ie(w), e.timeZone)
      x === 'editEventRow' ? e.onEventUpdate(w) : e.stopAddEvent ? s(R) : e.onAddEvent(R)
    }
    function p(w) {
      l() || i(e.headerDates[w])
    }
    function I(w, x) {
      e.onEventClick(w), d(w), g(x.target)
    }
    let C = !1
    function S(w, x) {
      if (!e.editable) return
      function R() {
        C || (F(w, x), (C = !0)), document.removeEventListener('mousemove', R)
      }
      function U() {
        document.removeEventListener('mouseup', U), document.removeEventListener('mousemove', R), (C = !1)
      }
      document.addEventListener('mousemove', R), document.addEventListener('mouseup', U)
    }
    function B(w) {
      e.editable && (C || a()) && p(w)
    }
    return (
      (e.moseEvents.enter = B),
      (e.moseEvents.down = S),
      [
        f,
        o,
        (() => {
          var w = Lu()
          return (
            (w.$$mousemove = () => B(0)),
            (w.$$mousedown = S),
            (w.$$mousedownData = 0),
            m(
              w,
              D(Z, {
                get each() {
                  return $()
                },
                children: (x) =>
                  (() => {
                    var R = ju()
                    return (
                      m(
                        R,
                        D(Z, {
                          get each() {
                            return E()[x]
                          },
                          children: (U) =>
                            D(Ht, {
                              get locale() {
                                return e.locale
                              },
                              isFirstRow: !0,
                              onDragEnd: t,
                              ondragstart: n,
                              item: U,
                              get startDate() {
                                return e.headerDates[0]
                              },
                              get endDate() {
                                return e.headerDates[6]
                              },
                              onClick: I
                            })
                        })
                      ),
                      R
                    )
                  })()
              })
            ),
            L((x) => z(w, l() ? 'pointer-events:none' : '', x)),
            w
          )
        })(),
        (() => {
          var w = Ou()
          return (w.$$mousedown = S), (w.$$mousedownData = 1), (w.$$mousemove = () => B(1)), w
        })(),
        (() => {
          var w = Ru()
          return (w.$$mousedown = S), (w.$$mousedownData = 2), (w.$$mousemove = () => B(2)), w
        })(),
        (() => {
          var w = Iu()
          return (w.$$mousedown = S), (w.$$mousedownData = 3), (w.$$mousemove = () => B(3)), w
        })(),
        (() => {
          var w = Pu()
          return (w.$$mousedown = S), (w.$$mousedownData = 4), (w.$$mousemove = () => B(4)), w
        })(),
        (() => {
          var w = Hu()
          return (w.$$mousedown = S), (w.$$mousedownData = 5), (w.$$mousemove = () => B(5)), w
        })(),
        (() => {
          var w = Nu()
          return (w.$$mousedown = S), (w.$$mousedownData = 6), (w.$$mousemove = () => B(6)), w
        })()
      ]
    )
  }
X(['mousedown', 'mousemove'])
var Gu = A('<div class=fec-weekly-morecontainer>'),
  Zu = A('<div> +'),
  qu = (e) => {
    const t = M(() => qn(e.rowList, e.headerDates[0], e.headerDates[6], 3))
    return D(j, {
      get when() {
        return e.show
      },
      get children() {
        var n = Gu()
        return (
          m(
            n,
            D(Z, {
              get each() {
                return t()
              },
              children: (r, i) =>
                (() => {
                  var a = Zu(),
                    u = a.firstChild
                  return (
                    Bt(a, 'click', e.openAllDayContainer, !0),
                    m(a, () => be(e.locale, r), u),
                    L((o) => z(a, r === 0 ? 'opacity:0;pointer-events: none;' : '', o)),
                    a
                  )
                })()
            })
          ),
          n
        )
      }
    })
  }
X(['click'])
function zu(e) {
  let t = 0
  const [n, r] = N(!1)
  function i() {
    const a = e.value
    n()
      ? ((a.style.height = a.clientHeight + 'px'),
        (a.style.maxHeight = 'initial'),
        setTimeout(() => {
          ;(a.style.height = t + 'px'), (a.style.overflow = 'hidden')
        }, 0),
        setTimeout(() => {
          ;(a.style.height = 'fit-content'), (a.style.maxHeight = '112px')
        }, 500),
        r(!1))
      : ((t = a.clientHeight),
        (a.style.height = a.clientHeight + 'px'),
        (a.style.maxHeight = 'initial'),
        setTimeout(() => {
          ;(a.style.height = a.scrollHeight + 5 + 'px'), (a.style.maxHeight = '220px')
        }, 0),
        setTimeout(() => {
          ;(a.style.overflow = 'auto'), (a.style.height = 'fit-content')
        }, 500),
        r(!0))
  }
  return { isOpen: n, openAllD: i }
}
var Wu = A('<div class="fec-header-dates "style=min-width:900px>'),
  Ku = A(
    '<div style=display:flex;min-width:900px><div class=fec-weekly-allDay id=fec-month-wrapper-id><div class=fec-week-all-day-wrapper>'
  ),
  Yu = A('<div style=display:flex;justify-content:center>'),
  Vu = (e) => {
    const t = M(() => lt(ct(e.events, e.headerDates[0], e.headerDates[6]))),
      n = M(() => t().filter((g) => g.isAllDay())),
      r = M(() => {
        let g = {}
        return Pt(n(), g), g
      }),
      [i, a] = N(null)
    let u = { value: null }
    const { isOpen: o, openAllD: s } = zu(u)
    $e(() => {
      const g = u.value
      g.style.height = 'fit-content'
    })
    function c() {
      return Object.keys(r())
    }
    const l = { enter: () => {}, down: () => {} }
    function f(g, h) {
      l.down(g, h)
    }
    function d(g) {
      l.enter(g)
    }
    return [
      (() => {
        var g = Wu()
        return (
          m(
            g,
            D(Z, {
              get each() {
                return e.headerDates
              },
              children: (h, v) =>
                (() => {
                  var E = Yu()
                  return (
                    (E.$$mousedown = f),
                    (E.$$mousedownData = v()),
                    (E.$$mousemove = () => d(v())),
                    m(
                      E,
                      D(Nn, {
                        slotRenderStore: '',
                        headerDate: h,
                        get timeZone() {
                          return e.timeZone
                        },
                        get calendar() {
                          return e.calendar
                        },
                        get onDateChange() {
                          return e.onDateChange
                        },
                        get locale() {
                          return e.locale
                        }
                      })
                    ),
                    E
                  )
                })()
            })
          ),
          g
        )
      })(),
      (() => {
        var g = Ku(),
          h = g.firstChild,
          v = h.firstChild
        m(
          g,
          D(Fu, {
            onClick: s,
            get show() {
              return c().length > 3
            }
          }),
          h
        )
        var E = u.value
        return (
          typeof E == 'function' ? G(E, h) : (u.value = h),
          m(
            h,
            D(qu, {
              get show() {
                return c().length > 3
              },
              get rowList() {
                return r()
              },
              get headerDates() {
                return e.headerDates
              },
              get locale() {
                return e.locale
              },
              openAllDayContainer: s,
              onClick: s
            }),
            v
          ),
          m(
            v,
            D(Kn, {
              get locale() {
                return e.locale
              },
              isFirstRow: !0,
              onDragEnd: () => {},
              ondragstart: () => {},
              get item() {
                return i()
              },
              get startDate() {
                return e.headerDates[0]
              },
              get endDate() {
                return e.headerDates[6]
              },
              dontCheackRange: !0
            })
          ),
          m(
            h,
            D(Uu, {
              get filteredEvents() {
                return n()
              },
              get onEventUpdate() {
                return e.onEventUpdate
              },
              get onEventClick() {
                return e.onEventClick
              },
              get onAddEvent() {
                return e.onAddEvent
              },
              get headerDates() {
                return e.headerDates
              },
              get locale() {
                return e.locale
              },
              get timeZone() {
                return e.timeZone
              },
              get stopAddEvent() {
                return e.stopAddEvent
              },
              get editable() {
                return e.editable
              },
              setDraggingDate: a,
              moseEvents: l
            }),
            null
          ),
          L(() => se(g, `${o() ? 'fec-weekly-allDay-open' : ''} ${i() ? 'fec-month-is-dragging' : ''}`)),
          g
        )
      })()
    ]
  }
X(['mousemove', 'mousedown'])
function Xu(e, t) {
  const n = yn([
      { props: { events: [], initialDate: null, locale: null, timeZone: null, calendar: null } },
      { props: { events: [], initialDate: null, locale: null, timeZone: null, calendar: null } },
      { props: { events: [], initialDate: null, locale: null, timeZone: null, calendar: null } },
      { props: { events: [], initialDate: null, locale: null, timeZone: null, calendar: null } },
      { props: { events: [], initialDate: null, locale: null, timeZone: null, calendar: null } },
      { props: { events: [], initialDate: null, locale: null, timeZone: null, calendar: null } },
      { props: { events: [], initialDate: null, locale: null, timeZone: null, calendar: null } }
    ]),
    r = M(() => {
      let i = new Date(e.initialDate)
      i.setDate(i.getDate() - i.getDay()),
        oe(() => {
          for (let a = 0; a < 7; a++) {
            const u = i.getDay(),
              o = qe(e.events, new Date(i))
            ;(n[u].props.events = o.filter((s) => !s.isAllDay())),
              (n[u].props.initialDate = new Date(i)),
              (n[u].props.gridDate = new Date(i)),
              (n[u].props.locale = e.locale),
              (n[u].props.timeZone = e.timeZone),
              (n[u].props.calendar = e.calendar),
              (n[u].props.gridHeight = e.gridHeight),
              (n[u].props.stopAddEvent = e.stopAddEvent),
              (n[u].props.onEventClick = e.onEventClick),
              (n[u].props.editable = e.editable),
              (n[u].props.onDateChange = t),
              i.setDate(i.getDate() + 1)
          }
        })
    })
  return ge(r), { columData: n }
}
var Qu = A('<div style=display:flex; class=fec-week-wrapper>'),
  Ju = A(
    '<div style=position:relative;flex:1;min-width:900px><div style=" position:absolute;height:100%;width:100%;"id=fec-scroll-wrapper class="fec-custome-scroll-bar fec-scroll-wrapper">'
  ),
  el = {
    events: [],
    initialDate: new Date(),
    onEventUpdate: () => {},
    onDateChange: () => {},
    onEventClick: () => {},
    onGridChange: () => {},
    onAddEvent: () => {},
    locale: 'en-US',
    calendar: 'gregory',
    timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    gridHeight: 65 * 24,
    stopAddEvent: !1,
    editable: !0
  },
  tl = (e) => {
    const t = he(el, e),
      n = ee(),
      { columData: r } = Xu(t, a)
    function i(s, c, l, f) {
      const d = { ...s }
      f && (d.start.setDate(d.start.getDate() - (l - c)), d.end.setDate(d.end.getDate() - (l - c))), t.onEventUpdate(d)
    }
    function a(s) {
      t.onDateChange(s), t.onGridChange('daily')
    }
    const u = () => {
      let s = t.initialDate
      return (
        s.setDate(s.getDate() - s.getDay()),
        [0, 1, 2, 3, 4, 5, 6].map((c) => {
          const l = new Date(s)
          return l.setDate(l.getDate() + c), l
        })
      )
    }
    function o(s, c) {
      c ? t.onAddEvent({ ...s, groups: [c] }) : t.onAddEvent(s)
    }
    return [
      D(Vu, {
        get onEventUpdate() {
          return t.onEventUpdate
        },
        get events() {
          return t.events
        },
        get headerDates() {
          return u()
        },
        get onAddEvent() {
          return t.onAddEvent
        },
        get locale() {
          return t.locale
        },
        get timeZone() {
          return t.timeZone
        },
        get calendar() {
          return t.calendar
        },
        get stopAddEvent() {
          return t.stopAddEvent
        },
        get onEventClick() {
          return t.onEventClick
        },
        get editable() {
          return t.editable
        },
        onDateChange: a
      }),
      D(nl, {
        get children() {
          var s = Qu()
          return (
            m(
              s,
              D(jn, {
                get locale() {
                  return t.locale
                }
              }),
              null
            ),
            m(
              s,
              D(Pn, {
                gridComponent: In,
                cols: r,
                onAddEvent: o,
                onEventUpdate: i,
                container: n,
                get initialDate() {
                  return t.initialDate
                }
              }),
              null
            ),
            s
          )
        }
      })
    ]
  }
function nl(e) {
  return (() => {
    var t = Ju(),
      n = t.firstChild
    return m(n, () => e.children), t
  })()
}
var Vn = { code: tl, name: 'weekly', type: 'grid' },
  Nt = class {
    constructor() {
      y(this, 'collection', {})
    }
    generateCollection(e) {
      for (let t = 0; t < e.length; t++) {
        const n = e[t]
        n.getIncludedDays().forEach((r) => {
          let i = st(r)
          i in this.collection && this.collection[i].push(n)
        })
      }
    }
  },
  rl = class extends Nt {
    process(e, t) {
      return (this.collection[st(t)] = []), this.generateCollection(e), this.collection
    }
  },
  il = class extends Nt {
    process(e, t) {
      return (
        Ot(t).forEach((n) => {
          this.collection[st(n)] = []
        }),
        this.generateCollection(e),
        this.collection
      )
    }
  },
  al = class extends Nt {
    constructor(t) {
      super()
      y(this, 'calendar')
      this.calendar = t
    }
    process(t, n) {
      return (
        Ft(n, this.calendar).forEach((r) => {
          this.collection[st(r.date)] = []
        }),
        this.generateCollection(t),
        this.collection
      )
    }
  },
  ol = class {
    constructor(e, t, n) {
      y(this, 'handel')
      y(this, 'initDate')
      y(this, 'eventModeFilter')
      switch (((this.initDate = t), (this.eventModeFilter = new ri(e, t, n)), e)) {
        case 'day':
          this.handel = new rl()
          break
        case 'week':
          this.handel = new il()
          break
        case 'month':
          this.handel = new al(n)
          break
      }
    }
    group(e) {
      return this.handel.process(this.eventModeFilter.filter(e), this.initDate)
    }
  },
  ul = A('<div class=fec-no-events-text>'),
  ll = A('<div class=fec-event-list><div class="fec-scroll-wrapper-list fec-custome-scroll-bar">'),
  sl = A(
    '<div class=fec-event-list-item><div class=fec-event-list-item-time><div class=fec-schedule-date></div><div class=fec-schedule-dates></div></div><div class=fec-schedule-event-wrapper>'
  ),
  cl = A(
    '<div class=fec-fec-event-list-item-des><div class=fec-event-date-list><div class=fec-event-dot></div></div><div>'
  ),
  dl = {
    events: [],
    initialDate: new Date(),
    onEventUpdate: () => {},
    onDateChange: () => {},
    onGridChange: () => {},
    onEventClick: () => {},
    locale: 'en-US',
    calendar: 'gregory',
    timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    gridHeight: 65 * 24,
    listMode: 'week'
  },
  fl = (e) => {
    const t = he(dl, e),
      n = M(() => new ol(t.listMode, t.initialDate, t.calendar).group(t.events)),
      { modalElementNode: r, setSlotModalData: i, openSlotModalOnElement: a } = Ae('eventClick')
    function u() {
      let s = 0
      return (
        Object.keys(n()).forEach((c) => {
          s += n()[c].length
        }),
        s === 0
      )
    }
    function o(s, c) {
      i(s), e.onEventClick(s), a(c.target)
    }
    return [
      r,
      (() => {
        var s = ll(),
          c = s.firstChild
        return (
          m(
            c,
            D(j, {
              get when() {
                return u()
              },
              get children() {
                var l = ul()
                return m(l, () => We(e.locale, 'no_events')), l
              }
            }),
            null
          ),
          m(
            c,
            D(Z, {
              get each() {
                return Object.keys(n())
              },
              children: (l) =>
                n()[l].length === 0
                  ? []
                  : (() => {
                      var f = sl(),
                        d = f.firstChild,
                        g = d.firstChild,
                        h = g.nextSibling,
                        v = d.nextSibling
                      return (
                        m(g, () => ai(new Date(l), t.calendar, t.locale)),
                        m(h, () => ii(new Date(l), t.calendar, t.locale)),
                        m(
                          v,
                          D(Z, {
                            get each() {
                              return n()[l]
                            },
                            children: (E) =>
                              (() => {
                                var $ = cl(),
                                  _ = $.firstChild,
                                  F = _.firstChild,
                                  b = _.nextSibling
                                return (
                                  ($.$$click = o),
                                  ($.$$clickData = E),
                                  m(
                                    _,
                                    (() => {
                                      var p = M(() => !!E.isAllDay())
                                      return () => (p() ? 'all day' : oi(E.start, E.end, t.locale))
                                    })(),
                                    null
                                  ),
                                  m(b, () => E.name),
                                  L((p) => z(F, `background-color:${E.color}`, p)),
                                  $
                                )
                              })()
                          })
                        ),
                        f
                      )
                    })()
            }),
            null
          ),
          s
        )
      })()
    ]
  }
X(['click'])
var Xn = { code: fl, name: 'list', type: 'grid' }
const gl = document.getElementById('app'),
  hl = document.getElementById('app2'),
  Qn = [
    {
      name: 'some name',
      start: new Date(' Aug 01 2023 08:00:0'),
      end: new Date(' Aug 03 2023 10:00:00'),
      id: 16123,
      color: '#BF51F9'
    },
    {
      name: 'some name',
      start: new Date(' Aug 04 2023 08:00:0'),
      color: '#31B5F7',
      end: new Date(' Aug 07 2023 10:00:00'),
      id: 18123
    },
    {
      name: 'some name',
      start: new Date(' Aug 01 2023 08:00:0'),
      end: new Date(' Aug 02 2023 10:00:00'),
      id: 17123,
      color: '#FF5280'
    },
    {
      name: 'some name',
      color: '#BF51F9',
      start: new Date(' Aug 03 2023 08:00:0'),
      end: new Date(' Aug 05 2023 10:00:00'),
      id: 19123
    },
    {
      name: 'some name',
      start: new Date(' Aug 06 2023 08:00:0'),
      color: '#31B5F7',
      end: new Date(' Aug 09 2023 10:00:00'),
      id: 110
    },
    {
      name: 'some name',
      start: new Date(' Aug 06 2023 08:00:0'),
      color: '#FF5280',
      end: new Date(' Aug 07 2023 10:00:00'),
      id: 111
    },
    {
      name: 'some name',
      start: new Date(' Aug 08 2023 08:00:0'),
      color: '#BF51F9',
      end: new Date(' Aug 09 2023 10:00:00'),
      id: 112
    },
    {
      name: 'some name',
      start: new Date(' Aug 08 2023 08:00:0'),
      color: '#31B5F7',
      end: new Date(' Aug 09 2023 10:00:00'),
      id: 113
    },
    {
      name: 'some name',
      color: '#FF5280',
      start: new Date(' Aug 05 2023 08:00:0'),
      end: new Date(' Aug 30 2023 10:00:00'),
      id: 114
    },
    {
      name: 'some name',
      color: '#BF51F9',
      start: new Date(' Aug 11 2023 00:00:00'),
      end: new Date(' Aug 11 2023 23:59:59'),
      id: 117
    },
    {
      name: 'some name',
      color: '#35D4CB',
      start: new Date(' Aug 08 2023 05:00:00'),
      end: new Date(' Aug 08 2023 07:59:59'),
      id: 186
    },
    {
      name: 'some name',
      start: new Date(' Aug 19 2023 05:00:00'),
      color: '#FF5280',
      end: new Date(' Aug 20 2023 07:59:59'),
      id: 189
    },
    {
      name: 'some name',
      start: new Date('Thu Aug 08 2023 08:00:0'),
      color: '#BF51F9',
      end: new Date('Thu Aug 13 2023 10:00:00'),
      id: 32
    },
    {
      name: 'some name',
      color: '#35D4CB',
      start: new Date('Thu Aug 05 2023 08:00:0'),
      end: new Date('Thu Aug 08 2023 10:00:00'),
      id: 31
    },
    {
      name: 'some name',
      start: new Date('Thu Aug 01 2023 08:00:0'),
      color: '#FF5280',
      end: new Date('Thu Aug 20 2023 10:00:00'),
      id: 30
    },
    {
      name: 'some name',
      color: '#BF51F9',
      start: new Date('Thu Aug 01 2023 08:00:0'),
      end: new Date('Thu Aug 4 2023 10:00:00'),
      id: 33
    },
    {
      name: 'some name',
      color: '#FF5280',
      start: new Date('Thu Aug 08 2023 08:00:0'),
      end: new Date('Thu Aug 08 2023 10:00:00'),
      id: 23
    },
    {
      name: 'some name',
      start: new Date('Thu Aug 08 2023 03:00:00'),
      end: new Date('Thu Aug 08 2023 04:00:00'),
      color: '#31B5F7',
      id: 24
    },
    {
      name: 'some name',
      start: new Date('Thu Aug 08 2023 13:30:00'),
      color: '#BF51F9',
      end: new Date('Thu Aug 08 2023 15:00:00'),
      id: 25
    },
    {
      name: 'some name',
      start: new Date('Thu Aug 09 2023 15:00:0'),
      color: '#FF5280',
      end: new Date('Thu Aug 09 2023 17:00:00'),
      id: 20
    },
    {
      name: 'some name',
      color: '#31B5F7',
      start: new Date('Thu Aug 09 2023 13:00:00'),
      end: new Date('Thu Aug 09 2023 17:00:00'),
      id: 21
    },
    {
      name: 'some name',
      color: '#BF51F9',
      start: new Date('Thu Aug 09 2023 13:30:00'),
      end: new Date('Thu Aug 09 2023 15:00:00'),
      id: 22
    },
    {
      name: 'some name',
      start: new Date('Thu Aug 10 2023 15:00:0'),
      color: '#35D4CB',
      end: new Date('Thu Aug 10 2023 17:00:00'),
      id: 7
    },
    {
      name: 'some name',
      color: '#31B5F7',
      start: new Date('Thu Aug 10 2023 13:00:00'),
      end: new Date('Thu Aug 10 2023 17:00:00'),
      id: 8
    },
    {
      name: 'some name',
      color: '#BF51F9',
      start: new Date('Thu Aug 10 2023 13:30:00'),
      end: new Date('Thu Aug 10 2023 15:00:00'),
      id: 9
    },
    {
      name: 'some name',
      start: new Date('Thu Aug 10 2023 14:00:00'),
      color: '#FF5280',
      end: new Date('Thu Aug 10 2023 16:30:00'),
      id: 10
    },
    {
      name: 'some name',
      color: '#31B5F7',
      start: new Date('Thu Aug 10 2023 16:00:00'),
      end: new Date('Thu Aug 10 2023 18:00:00'),
      id: 11
    },
    {
      name: 'some name',
      start: new Date('Thu Aug 10 2023 12:00:00'),
      color: '#35D4CB',
      end: new Date('Thu Aug 10 2023 14:05:00'),
      id: 6
    },
    {
      name: 'some name',
      start: new Date('Thu Aug 10 2023 16:15:00'),
      color: '#FF5280',
      end: new Date('Thu Aug 10 2023 22:05:00'),
      id: 12
    },
    {
      color: '#31B5F7',
      name: 'some name',
      start: new Date('Thu Aug 10 2023 17:30:00'),
      end: new Date('Thu Aug 10 2023 22:05:00'),
      id: 13
    },
    {
      name: 'some name',
      color: '#BF51F9',
      start: new Date('Thu Aug 10 2023 17:10:00'),
      end: new Date('Thu Aug 10 2023 19:30:00'),
      id: 14,
      groups: [2]
    },
    {
      name: 'some name',
      color: '#31B5F7',
      start: new Date('Thu Aug 10 2023 17:15:00'),
      end: new Date('Thu Aug 10 2023 20:00:00'),
      id: 15,
      groups: [1]
    },
    {
      name: 'some name',
      start: new Date('Thu Aug 10 2023 19:00:00'),
      color: '#FF5280',
      end: new Date('Thu Aug 10 2023 22:05:00'),
      id: 16
    },
    {
      name: 'some name',
      start: new Date('Thu Aug 10 2023 20:00:00'),
      color: '#BF51F9',
      end: new Date('Thu Aug 10 2023 23:05:00'),
      id: 170
    },
    {
      name: 'some name',
      start: new Date('Thu Aug 10 2023 00:00:00'),
      end: new Date('Thu Aug 10 2023 23:59:59'),
      color: '#31B5F7',
      id: 18
    },
    {
      name: 'some name',
      start: new Date('Thu Aug 10 2023 00:00:00'),
      end: new Date('Thu Aug 11 2023 15:59:59'),
      id: 19,
      color: '#31B5F7'
    }
  ],
  Re = new Mn(gl, {
    events: Qn,
    gridHeight: 60 * 24,
    timeZone: 'Africa/Abidjan',
    initialDate: new Date('Thu Aug 10 2023 15:00:0'),
    plugins: [Un, Vn, Yn, Xn],
    grid: 'daily',
    listMode: 'week'
  }),
  vl = new Mn(hl, {
    events: Qn,
    gridHeight: 60 * 24,
    timeZone: 'Africa/Abidjan',
    initialDate: new Date('Thu Aug 10 2023 15:00:0'),
    plugins: [Un, Vn, Yn, Xn],
    grid: 'daily',
    listMode: 'week'
  })
console.log(vl, Re)
console.time('rendered in ')
Re.render()
console.timeEnd('rendered in ')
Re.on('eventUpdate', (e, t, n) => {
  console.log(e, t, n)
})
Re.on('eventAdd', ({ event: e }) => {
  console.log(e), Re.addEvent(e.sourceEvent)
})
let nn = 1
function ml(e) {
  Re.addGroup({ id: nn, name: e }), nn++
}
window.addGroup = ml
