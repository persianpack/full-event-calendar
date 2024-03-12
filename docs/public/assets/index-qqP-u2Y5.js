var ql = Object.defineProperty
var Wl = (e, t, n) => (t in e ? ql(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : (e[t] = n))
var L = (e, t, n) => (Wl(e, typeof t != 'symbol' ? t + '' : t, n), n)
;(function () {
  const t = document.createElement('link').relList
  if (t && t.supports && t.supports('modulepreload')) return
  for (const i of document.querySelectorAll('link[rel="modulepreload"]')) r(i)
  new MutationObserver((i) => {
    for (const o of i)
      if (o.type === 'childList')
        for (const s of o.addedNodes) s.tagName === 'LINK' && s.rel === 'modulepreload' && r(s)
  }).observe(document, { childList: !0, subtree: !0 })
  function n(i) {
    const o = {}
    return (
      i.integrity && (o.integrity = i.integrity),
      i.referrerPolicy && (o.referrerPolicy = i.referrerPolicy),
      i.crossOrigin === 'use-credentials'
        ? (o.credentials = 'include')
        : i.crossOrigin === 'anonymous'
        ? (o.credentials = 'omit')
        : (o.credentials = 'same-origin'),
      o
    )
  }
  function r(i) {
    if (i.ep) return
    i.ep = !0
    const o = n(i)
    fetch(i.href, o)
  }
})()
/**
 * @vue/shared v3.4.18
 * (c) 2018-present Yuxi (Evan) You and Vue contributors
 * @license MIT
 **/ function _i(e, t) {
  const n = new Set(e.split(','))
  return t ? (r) => n.has(r.toLowerCase()) : (r) => n.has(r)
}
const ue = {},
  en = [],
  Ze = () => {},
  Yl = () => !1,
  gr = (e) => e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && (e.charCodeAt(2) > 122 || e.charCodeAt(2) < 97),
  Ai = (e) => e.startsWith('onUpdate:'),
  xe = Object.assign,
  bi = (e, t) => {
    const n = e.indexOf(t)
    n > -1 && e.splice(n, 1)
  },
  Xl = Object.prototype.hasOwnProperty,
  ee = (e, t) => Xl.call(e, t),
  K = Array.isArray,
  tn = (e) => Nn(e) === '[object Map]',
  mr = (e) => Nn(e) === '[object Set]',
  co = (e) => Nn(e) === '[object Date]',
  W = (e) => typeof e == 'function',
  ye = (e) => typeof e == 'string',
  Tt = (e) => typeof e == 'symbol',
  ae = (e) => e !== null && typeof e == 'object',
  cs = (e) => (ae(e) || W(e)) && W(e.then) && W(e.catch),
  ds = Object.prototype.toString,
  Nn = (e) => ds.call(e),
  Jl = (e) => Nn(e).slice(8, -1),
  fs = (e) => Nn(e) === '[object Object]',
  xi = (e) => ye(e) && e !== 'NaN' && e[0] !== '-' && '' + parseInt(e, 10) === e,
  En = _i(
    ',key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted'
  ),
  vr = (e) => {
    const t = Object.create(null)
    return (n) => t[n] || (t[n] = e(n))
  },
  Ql = /-(\w)/g,
  on = vr((e) => e.replace(Ql, (t, n) => (n ? n.toUpperCase() : ''))),
  ea = /\B([A-Z])/g,
  cn = vr((e) => e.replace(ea, '-$1').toLowerCase()),
  hs = vr((e) => e.charAt(0).toUpperCase() + e.slice(1)),
  Rr = vr((e) => (e ? `on${hs(e)}` : '')),
  Bt = (e, t) => !Object.is(e, t),
  Jn = (e, t) => {
    for (let n = 0; n < e.length; n++) e[n](t)
  },
  ir = (e, t, n) => {
    Object.defineProperty(e, t, { configurable: !0, enumerable: !1, value: n })
  },
  Si = (e) => {
    const t = parseFloat(e)
    return isNaN(t) ? e : t
  }
let fo
const gs = () =>
  fo ||
  (fo =
    typeof globalThis < 'u'
      ? globalThis
      : typeof self < 'u'
      ? self
      : typeof window < 'u'
      ? window
      : typeof global < 'u'
      ? global
      : {})
function $i(e) {
  if (K(e)) {
    const t = {}
    for (let n = 0; n < e.length; n++) {
      const r = e[n],
        i = ye(r) ? ia(r) : $i(r)
      if (i) for (const o in i) t[o] = i[o]
    }
    return t
  } else if (ye(e) || ae(e)) return e
}
const ta = /;(?![^(]*\))/g,
  na = /:([^]+)/,
  ra = /\/\*[^]*?\*\//g
function ia(e) {
  const t = {}
  return (
    e
      .replace(ra, '')
      .split(ta)
      .forEach((n) => {
        if (n) {
          const r = n.split(na)
          r.length > 1 && (t[r[0].trim()] = r[1].trim())
        }
      }),
    t
  )
}
function Ti(e) {
  let t = ''
  if (ye(e)) t = e
  else if (K(e))
    for (let n = 0; n < e.length; n++) {
      const r = Ti(e[n])
      r && (t += r + ' ')
    }
  else if (ae(e)) for (const n in e) e[n] && (t += n + ' ')
  return t.trim()
}
const oa = 'itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly',
  sa = _i(oa)
function ms(e) {
  return !!e || e === ''
}
function la(e, t) {
  if (e.length !== t.length) return !1
  let n = !0
  for (let r = 0; n && r < e.length; r++) n = Dr(e[r], t[r])
  return n
}
function Dr(e, t) {
  if (e === t) return !0
  let n = co(e),
    r = co(t)
  if (n || r) return n && r ? e.getTime() === t.getTime() : !1
  if (((n = Tt(e)), (r = Tt(t)), n || r)) return e === t
  if (((n = K(e)), (r = K(t)), n || r)) return n && r ? la(e, t) : !1
  if (((n = ae(e)), (r = ae(t)), n || r)) {
    if (!n || !r) return !1
    const i = Object.keys(e).length,
      o = Object.keys(t).length
    if (i !== o) return !1
    for (const s in e) {
      const l = e.hasOwnProperty(s),
        a = t.hasOwnProperty(s)
      if ((l && !a) || (!l && a) || !Dr(e[s], t[s])) return !1
    }
  }
  return String(e) === String(t)
}
function aa(e, t) {
  return e.findIndex((n) => Dr(n, t))
}
const ze = (e) =>
    ye(e)
      ? e
      : e == null
      ? ''
      : K(e) || (ae(e) && (e.toString === ds || !W(e.toString)))
      ? JSON.stringify(e, vs, 2)
      : String(e),
  vs = (e, t) =>
    t && t.__v_isRef
      ? vs(e, t.value)
      : tn(t)
      ? { [`Map(${t.size})`]: [...t.entries()].reduce((n, [r, i], o) => ((n[Pr(r, o) + ' =>'] = i), n), {}) }
      : mr(t)
      ? { [`Set(${t.size})`]: [...t.values()].map((n) => Pr(n)) }
      : Tt(t)
      ? Pr(t)
      : ae(t) && !K(t) && !fs(t)
      ? String(t)
      : t,
  Pr = (e, t = '') => {
    var n
    return Tt(e) ? `Symbol(${(n = e.description) != null ? n : t})` : e
  }
/**
 * @vue/reactivity v3.4.18
 * (c) 2018-present Yuxi (Evan) You and Vue contributors
 * @license MIT
 **/ let qe
class ua {
  constructor(t = !1) {
    ;(this.detached = t),
      (this._active = !0),
      (this.effects = []),
      (this.cleanups = []),
      (this.parent = qe),
      !t && qe && (this.index = (qe.scopes || (qe.scopes = [])).push(this) - 1)
  }
  get active() {
    return this._active
  }
  run(t) {
    if (this._active) {
      const n = qe
      try {
        return (qe = this), t()
      } finally {
        qe = n
      }
    }
  }
  on() {
    qe = this
  }
  off() {
    qe = this.parent
  }
  stop(t) {
    if (this._active) {
      let n, r
      for (n = 0, r = this.effects.length; n < r; n++) this.effects[n].stop()
      for (n = 0, r = this.cleanups.length; n < r; n++) this.cleanups[n]()
      if (this.scopes) for (n = 0, r = this.scopes.length; n < r; n++) this.scopes[n].stop(!0)
      if (!this.detached && this.parent && !t) {
        const i = this.parent.scopes.pop()
        i && i !== this && ((this.parent.scopes[this.index] = i), (i.index = this.index))
      }
      ;(this.parent = void 0), (this._active = !1)
    }
  }
}
function ca(e, t = qe) {
  t && t.active && t.effects.push(e)
}
function da() {
  return qe
}
let Pt
class Bi {
  constructor(t, n, r, i) {
    ;(this.fn = t),
      (this.trigger = n),
      (this.scheduler = r),
      (this.active = !0),
      (this.deps = []),
      (this._dirtyLevel = 4),
      (this._trackId = 0),
      (this._runnings = 0),
      (this._shouldSchedule = !1),
      (this._depsLength = 0),
      ca(this, i)
  }
  get dirty() {
    if (this._dirtyLevel === 2 || this._dirtyLevel === 3) {
      ;(this._dirtyLevel = 1), Gt()
      for (let t = 0; t < this._depsLength; t++) {
        const n = this.deps[t]
        if (n.computed && (fa(n.computed), this._dirtyLevel >= 4)) break
      }
      this._dirtyLevel === 1 && (this._dirtyLevel = 0), Zt()
    }
    return this._dirtyLevel >= 4
  }
  set dirty(t) {
    this._dirtyLevel = t ? 4 : 0
  }
  run() {
    if (((this._dirtyLevel = 0), !this.active)) return this.fn()
    let t = St,
      n = Pt
    try {
      return (St = !0), (Pt = this), this._runnings++, ho(this), this.fn()
    } finally {
      go(this), this._runnings--, (Pt = n), (St = t)
    }
  }
  stop() {
    var t
    this.active && (ho(this), go(this), (t = this.onStop) == null || t.call(this), (this.active = !1))
  }
}
function fa(e) {
  return e.value
}
function ho(e) {
  e._trackId++, (e._depsLength = 0)
}
function go(e) {
  if (e.deps.length > e._depsLength) {
    for (let t = e._depsLength; t < e.deps.length; t++) Ds(e.deps[t], e)
    e.deps.length = e._depsLength
  }
}
function Ds(e, t) {
  const n = e.get(t)
  n !== void 0 && t._trackId !== n && (e.delete(t), e.size === 0 && e.cleanup())
}
let St = !0,
  ei = 0
const ys = []
function Gt() {
  ys.push(St), (St = !1)
}
function Zt() {
  const e = ys.pop()
  St = e === void 0 ? !0 : e
}
function Mi() {
  ei++
}
function ki() {
  for (ei--; !ei && ti.length; ) ti.shift()()
}
function Es(e, t, n) {
  if (t.get(e) !== e._trackId) {
    t.set(e, e._trackId)
    const r = e.deps[e._depsLength]
    r !== t ? (r && Ds(r, e), (e.deps[e._depsLength++] = t)) : e._depsLength++
  }
}
const ti = []
function ws(e, t, n) {
  Mi()
  for (const r of e.keys()) {
    let i
    r._dirtyLevel < t &&
      (i ?? (i = e.get(r) === r._trackId)) &&
      (r._shouldSchedule || (r._shouldSchedule = r._dirtyLevel === 0), (r._dirtyLevel = t)),
      r._shouldSchedule &&
        (i ?? (i = e.get(r) === r._trackId)) &&
        (r.trigger(),
        (!r._runnings || r.allowRecurse) &&
          r._dirtyLevel !== 2 &&
          ((r._shouldSchedule = !1), r.scheduler && ti.push(r.scheduler)))
  }
  ki()
}
const ps = (e, t) => {
    const n = new Map()
    return (n.cleanup = e), (n.computed = t), n
  },
  ni = new WeakMap(),
  Nt = Symbol(''),
  ri = Symbol('')
function Ie(e, t, n) {
  if (St && Pt) {
    let r = ni.get(e)
    r || ni.set(e, (r = new Map()))
    let i = r.get(n)
    i || r.set(n, (i = ps(() => r.delete(n)))), Es(Pt, i)
  }
}
function ft(e, t, n, r, i, o) {
  const s = ni.get(e)
  if (!s) return
  let l = []
  if (t === 'clear') l = [...s.values()]
  else if (n === 'length' && K(e)) {
    const a = Number(r)
    s.forEach((c, u) => {
      ;(u === 'length' || (!Tt(u) && u >= a)) && l.push(c)
    })
  } else
    switch ((n !== void 0 && l.push(s.get(n)), t)) {
      case 'add':
        K(e) ? xi(n) && l.push(s.get('length')) : (l.push(s.get(Nt)), tn(e) && l.push(s.get(ri)))
        break
      case 'delete':
        K(e) || (l.push(s.get(Nt)), tn(e) && l.push(s.get(ri)))
        break
      case 'set':
        tn(e) && l.push(s.get(Nt))
        break
    }
  Mi()
  for (const a of l) a && ws(a, 4)
  ki()
}
const ha = _i('__proto__,__v_isRef,__isVue'),
  Cs = new Set(
    Object.getOwnPropertyNames(Symbol)
      .filter((e) => e !== 'arguments' && e !== 'caller')
      .map((e) => Symbol[e])
      .filter(Tt)
  ),
  mo = ga()
function ga() {
  const e = {}
  return (
    ['includes', 'indexOf', 'lastIndexOf'].forEach((t) => {
      e[t] = function (...n) {
        const r = ie(this)
        for (let o = 0, s = this.length; o < s; o++) Ie(r, 'get', o + '')
        const i = r[t](...n)
        return i === -1 || i === !1 ? r[t](...n.map(ie)) : i
      }
    }),
    ['push', 'pop', 'shift', 'unshift', 'splice'].forEach((t) => {
      e[t] = function (...n) {
        Gt(), Mi()
        const r = ie(this)[t].apply(this, n)
        return ki(), Zt(), r
      }
    }),
    e
  )
}
function ma(e) {
  const t = ie(this)
  return Ie(t, 'has', e), t.hasOwnProperty(e)
}
class _s {
  constructor(t = !1, n = !1) {
    ;(this._isReadonly = t), (this._shallow = n)
  }
  get(t, n, r) {
    const i = this._isReadonly,
      o = this._shallow
    if (n === '__v_isReactive') return !i
    if (n === '__v_isReadonly') return i
    if (n === '__v_isShallow') return o
    if (n === '__v_raw')
      return r === (i ? (o ? $a : Ss) : o ? xs : bs).get(t) || Object.getPrototypeOf(t) === Object.getPrototypeOf(r)
        ? t
        : void 0
    const s = K(t)
    if (!i) {
      if (s && ee(mo, n)) return Reflect.get(mo, n, r)
      if (n === 'hasOwnProperty') return ma
    }
    const l = Reflect.get(t, n, r)
    return (Tt(n) ? Cs.has(n) : ha(n)) || (i || Ie(t, 'get', n), o)
      ? l
      : Re(l)
      ? s && xi(n)
        ? l
        : l.value
      : ae(l)
      ? i
        ? $s(l)
        : Li(l)
      : l
  }
}
class As extends _s {
  constructor(t = !1) {
    super(!1, t)
  }
  set(t, n, r, i) {
    let o = t[n]
    if (!this._shallow) {
      const a = sn(o)
      if ((!or(r) && !sn(r) && ((o = ie(o)), (r = ie(r))), !K(t) && Re(o) && !Re(r)))
        return a ? !1 : ((o.value = r), !0)
    }
    const s = K(t) && xi(n) ? Number(n) < t.length : ee(t, n),
      l = Reflect.set(t, n, r, i)
    return t === ie(i) && (s ? Bt(r, o) && ft(t, 'set', n, r) : ft(t, 'add', n, r)), l
  }
  deleteProperty(t, n) {
    const r = ee(t, n)
    t[n]
    const i = Reflect.deleteProperty(t, n)
    return i && r && ft(t, 'delete', n, void 0), i
  }
  has(t, n) {
    const r = Reflect.has(t, n)
    return (!Tt(n) || !Cs.has(n)) && Ie(t, 'has', n), r
  }
  ownKeys(t) {
    return Ie(t, 'iterate', K(t) ? 'length' : Nt), Reflect.ownKeys(t)
  }
}
class va extends _s {
  constructor(t = !1) {
    super(!0, t)
  }
  set(t, n) {
    return !0
  }
  deleteProperty(t, n) {
    return !0
  }
}
const Da = new As(),
  ya = new va(),
  Ea = new As(!0),
  Oi = (e) => e,
  yr = (e) => Reflect.getPrototypeOf(e)
function jn(e, t, n = !1, r = !1) {
  e = e.__v_raw
  const i = ie(e),
    o = ie(t)
  n || (Bt(t, o) && Ie(i, 'get', t), Ie(i, 'get', o))
  const { has: s } = yr(i),
    l = r ? Oi : n ? Ri : Sn
  if (s.call(i, t)) return l(e.get(t))
  if (s.call(i, o)) return l(e.get(o))
  e !== i && e.get(t)
}
function Gn(e, t = !1) {
  const n = this.__v_raw,
    r = ie(n),
    i = ie(e)
  return t || (Bt(e, i) && Ie(r, 'has', e), Ie(r, 'has', i)), e === i ? n.has(e) : n.has(e) || n.has(i)
}
function Zn(e, t = !1) {
  return (e = e.__v_raw), !t && Ie(ie(e), 'iterate', Nt), Reflect.get(e, 'size', e)
}
function vo(e) {
  e = ie(e)
  const t = ie(this)
  return yr(t).has.call(t, e) || (t.add(e), ft(t, 'add', e, e)), this
}
function Do(e, t) {
  t = ie(t)
  const n = ie(this),
    { has: r, get: i } = yr(n)
  let o = r.call(n, e)
  o || ((e = ie(e)), (o = r.call(n, e)))
  const s = i.call(n, e)
  return n.set(e, t), o ? Bt(t, s) && ft(n, 'set', e, t) : ft(n, 'add', e, t), this
}
function yo(e) {
  const t = ie(this),
    { has: n, get: r } = yr(t)
  let i = n.call(t, e)
  i || ((e = ie(e)), (i = n.call(t, e))), r && r.call(t, e)
  const o = t.delete(e)
  return i && ft(t, 'delete', e, void 0), o
}
function Eo() {
  const e = ie(this),
    t = e.size !== 0,
    n = e.clear()
  return t && ft(e, 'clear', void 0, void 0), n
}
function Vn(e, t) {
  return function (r, i) {
    const o = this,
      s = o.__v_raw,
      l = ie(s),
      a = t ? Oi : e ? Ri : Sn
    return !e && Ie(l, 'iterate', Nt), s.forEach((c, u) => r.call(i, a(c), a(u), o))
  }
}
function Kn(e, t, n) {
  return function (...r) {
    const i = this.__v_raw,
      o = ie(i),
      s = tn(o),
      l = e === 'entries' || (e === Symbol.iterator && s),
      a = e === 'keys' && s,
      c = i[e](...r),
      u = n ? Oi : t ? Ri : Sn
    return (
      !t && Ie(o, 'iterate', a ? ri : Nt),
      {
        next() {
          const { value: f, done: d } = c.next()
          return d ? { value: f, done: d } : { value: l ? [u(f[0]), u(f[1])] : u(f), done: d }
        },
        [Symbol.iterator]() {
          return this
        }
      }
    )
  }
}
function wt(e) {
  return function (...t) {
    return e === 'delete' ? !1 : e === 'clear' ? void 0 : this
  }
}
function wa() {
  const e = {
      get(o) {
        return jn(this, o)
      },
      get size() {
        return Zn(this)
      },
      has: Gn,
      add: vo,
      set: Do,
      delete: yo,
      clear: Eo,
      forEach: Vn(!1, !1)
    },
    t = {
      get(o) {
        return jn(this, o, !1, !0)
      },
      get size() {
        return Zn(this)
      },
      has: Gn,
      add: vo,
      set: Do,
      delete: yo,
      clear: Eo,
      forEach: Vn(!1, !0)
    },
    n = {
      get(o) {
        return jn(this, o, !0)
      },
      get size() {
        return Zn(this, !0)
      },
      has(o) {
        return Gn.call(this, o, !0)
      },
      add: wt('add'),
      set: wt('set'),
      delete: wt('delete'),
      clear: wt('clear'),
      forEach: Vn(!0, !1)
    },
    r = {
      get(o) {
        return jn(this, o, !0, !0)
      },
      get size() {
        return Zn(this, !0)
      },
      has(o) {
        return Gn.call(this, o, !0)
      },
      add: wt('add'),
      set: wt('set'),
      delete: wt('delete'),
      clear: wt('clear'),
      forEach: Vn(!0, !0)
    }
  return (
    ['keys', 'values', 'entries', Symbol.iterator].forEach((o) => {
      ;(e[o] = Kn(o, !1, !1)), (n[o] = Kn(o, !0, !1)), (t[o] = Kn(o, !1, !0)), (r[o] = Kn(o, !0, !0))
    }),
    [e, n, t, r]
  )
}
const [pa, Ca, _a, Aa] = wa()
function Fi(e, t) {
  const n = t ? (e ? Aa : _a) : e ? Ca : pa
  return (r, i, o) =>
    i === '__v_isReactive'
      ? !e
      : i === '__v_isReadonly'
      ? e
      : i === '__v_raw'
      ? r
      : Reflect.get(ee(n, i) && i in r ? n : r, i, o)
}
const ba = { get: Fi(!1, !1) },
  xa = { get: Fi(!1, !0) },
  Sa = { get: Fi(!0, !1) },
  bs = new WeakMap(),
  xs = new WeakMap(),
  Ss = new WeakMap(),
  $a = new WeakMap()
function Ta(e) {
  switch (e) {
    case 'Object':
    case 'Array':
      return 1
    case 'Map':
    case 'Set':
    case 'WeakMap':
    case 'WeakSet':
      return 2
    default:
      return 0
  }
}
function Ba(e) {
  return e.__v_skip || !Object.isExtensible(e) ? 0 : Ta(Jl(e))
}
function Li(e) {
  return sn(e) ? e : Ii(e, !1, Da, ba, bs)
}
function Ma(e) {
  return Ii(e, !1, Ea, xa, xs)
}
function $s(e) {
  return Ii(e, !0, ya, Sa, Ss)
}
function Ii(e, t, n, r, i) {
  if (!ae(e) || (e.__v_raw && !(t && e.__v_isReactive))) return e
  const o = i.get(e)
  if (o) return o
  const s = Ba(e)
  if (s === 0) return e
  const l = new Proxy(e, s === 2 ? r : n)
  return i.set(e, l), l
}
function nn(e) {
  return sn(e) ? nn(e.__v_raw) : !!(e && e.__v_isReactive)
}
function sn(e) {
  return !!(e && e.__v_isReadonly)
}
function or(e) {
  return !!(e && e.__v_isShallow)
}
function Ts(e) {
  return nn(e) || sn(e)
}
function ie(e) {
  const t = e && e.__v_raw
  return t ? ie(t) : e
}
function Bs(e) {
  return Object.isExtensible(e) && ir(e, '__v_skip', !0), e
}
const Sn = (e) => (ae(e) ? Li(e) : e),
  Ri = (e) => (ae(e) ? $s(e) : e)
class Ms {
  constructor(t, n, r, i) {
    ;(this._setter = n),
      (this.dep = void 0),
      (this.__v_isRef = !0),
      (this.__v_isReadonly = !1),
      (this.effect = new Bi(
        () => t(this._value),
        () => Qn(this, this.effect._dirtyLevel === 2 ? 2 : 3)
      )),
      (this.effect.computed = this),
      (this.effect.active = this._cacheable = !i),
      (this.__v_isReadonly = r)
  }
  get value() {
    const t = ie(this)
    return (
      (!t._cacheable || t.effect.dirty) && Bt(t._value, (t._value = t.effect.run())) && Qn(t, 4),
      ks(t),
      t.effect._dirtyLevel >= 2 && Qn(t, 2),
      t._value
    )
  }
  set value(t) {
    this._setter(t)
  }
  get _dirty() {
    return this.effect.dirty
  }
  set _dirty(t) {
    this.effect.dirty = t
  }
}
function ka(e, t, n = !1) {
  let r, i
  const o = W(e)
  return o ? ((r = e), (i = Ze)) : ((r = e.get), (i = e.set)), new Ms(r, i, o || !i, n)
}
function ks(e) {
  var t
  St &&
    Pt &&
    ((e = ie(e)), Es(Pt, (t = e.dep) != null ? t : (e.dep = ps(() => (e.dep = void 0), e instanceof Ms ? e : void 0))))
}
function Qn(e, t = 4, n) {
  e = ie(e)
  const r = e.dep
  r && ws(r, t)
}
function Re(e) {
  return !!(e && e.__v_isRef === !0)
}
function ut(e) {
  return Oa(e, !1)
}
function Oa(e, t) {
  return Re(e) ? e : new Fa(e, t)
}
class Fa {
  constructor(t, n) {
    ;(this.__v_isShallow = n),
      (this.dep = void 0),
      (this.__v_isRef = !0),
      (this._rawValue = n ? t : ie(t)),
      (this._value = n ? t : Sn(t))
  }
  get value() {
    return ks(this), this._value
  }
  set value(t) {
    const n = this.__v_isShallow || or(t) || sn(t)
    ;(t = n ? t : ie(t)), Bt(t, this._rawValue) && ((this._rawValue = t), (this._value = n ? t : Sn(t)), Qn(this, 4))
  }
}
function _t(e) {
  return Re(e) ? e.value : e
}
const La = {
  get: (e, t, n) => _t(Reflect.get(e, t, n)),
  set: (e, t, n, r) => {
    const i = e[t]
    return Re(i) && !Re(n) ? ((i.value = n), !0) : Reflect.set(e, t, n, r)
  }
}
function Os(e) {
  return nn(e) ? e : new Proxy(e, La)
}
/**
 * @vue/runtime-core v3.4.18
 * (c) 2018-present Yuxi (Evan) You and Vue contributors
 * @license MIT
 **/ function $t(e, t, n, r) {
  let i
  try {
    i = r ? e(...r) : e()
  } catch (o) {
    Er(o, t, n)
  }
  return i
}
function Ye(e, t, n, r) {
  if (W(e)) {
    const o = $t(e, t, n, r)
    return (
      o &&
        cs(o) &&
        o.catch((s) => {
          Er(s, t, n)
        }),
      o
    )
  }
  const i = []
  for (let o = 0; o < e.length; o++) i.push(Ye(e[o], t, n, r))
  return i
}
function Er(e, t, n, r = !0) {
  const i = t ? t.vnode : null
  if (t) {
    let o = t.parent
    const s = t.proxy,
      l = `https://vuejs.org/error-reference/#runtime-${n}`
    for (; o; ) {
      const c = o.ec
      if (c) {
        for (let u = 0; u < c.length; u++) if (c[u](e, s, l) === !1) return
      }
      o = o.parent
    }
    const a = t.appContext.config.errorHandler
    if (a) {
      $t(a, null, 10, [e, s, l])
      return
    }
  }
  Ia(e, n, i, r)
}
function Ia(e, t, n, r = !0) {
  console.error(e)
}
let $n = !1,
  ii = !1
const $e = []
let rt = 0
const rn = []
let At = null,
  It = 0
const Fs = Promise.resolve()
let Pi = null
function Ls(e) {
  const t = Pi || Fs
  return e ? t.then(this ? e.bind(this) : e) : t
}
function Ra(e) {
  let t = rt + 1,
    n = $e.length
  for (; t < n; ) {
    const r = (t + n) >>> 1,
      i = $e[r],
      o = Tn(i)
    o < e || (o === e && i.pre) ? (t = r + 1) : (n = r)
  }
  return t
}
function Ni(e) {
  ;(!$e.length || !$e.includes(e, $n && e.allowRecurse ? rt + 1 : rt)) &&
    (e.id == null ? $e.push(e) : $e.splice(Ra(e.id), 0, e), Is())
}
function Is() {
  !$n && !ii && ((ii = !0), (Pi = Fs.then(Ps)))
}
function Pa(e) {
  const t = $e.indexOf(e)
  t > rt && $e.splice(t, 1)
}
function Na(e) {
  K(e) ? rn.push(...e) : (!At || !At.includes(e, e.allowRecurse ? It + 1 : It)) && rn.push(e), Is()
}
function wo(e, t, n = $n ? rt + 1 : 0) {
  for (; n < $e.length; n++) {
    const r = $e[n]
    if (r && r.pre) {
      if (e && r.id !== e.uid) continue
      $e.splice(n, 1), n--, r()
    }
  }
}
function Rs(e) {
  if (rn.length) {
    const t = [...new Set(rn)].sort((n, r) => Tn(n) - Tn(r))
    if (((rn.length = 0), At)) {
      At.push(...t)
      return
    }
    for (At = t, It = 0; It < At.length; It++) At[It]()
    ;(At = null), (It = 0)
  }
}
const Tn = (e) => (e.id == null ? 1 / 0 : e.id),
  Ha = (e, t) => {
    const n = Tn(e) - Tn(t)
    if (n === 0) {
      if (e.pre && !t.pre) return -1
      if (t.pre && !e.pre) return 1
    }
    return n
  }
function Ps(e) {
  ;(ii = !1), ($n = !0), $e.sort(Ha)
  try {
    for (rt = 0; rt < $e.length; rt++) {
      const t = $e[rt]
      t && t.active !== !1 && $t(t, null, 14)
    }
  } finally {
    ;(rt = 0), ($e.length = 0), Rs(), ($n = !1), (Pi = null), ($e.length || rn.length) && Ps()
  }
}
function Ua(e, t, ...n) {
  if (e.isUnmounted) return
  const r = e.vnode.props || ue
  let i = n
  const o = t.startsWith('update:'),
    s = o && t.slice(7)
  if (s && s in r) {
    const u = `${s === 'modelValue' ? 'model' : s}Modifiers`,
      { number: f, trim: d } = r[u] || ue
    d && (i = n.map((g) => (ye(g) ? g.trim() : g))), f && (i = n.map(Si))
  }
  let l,
    a = r[(l = Rr(t))] || r[(l = Rr(on(t)))]
  !a && o && (a = r[(l = Rr(cn(t)))]), a && Ye(a, e, 6, i)
  const c = r[l + 'Once']
  if (c) {
    if (!e.emitted) e.emitted = {}
    else if (e.emitted[l]) return
    ;(e.emitted[l] = !0), Ye(c, e, 6, i)
  }
}
function Ns(e, t, n = !1) {
  const r = t.emitsCache,
    i = r.get(e)
  if (i !== void 0) return i
  const o = e.emits
  let s = {},
    l = !1
  if (!W(e)) {
    const a = (c) => {
      const u = Ns(c, t, !0)
      u && ((l = !0), xe(s, u))
    }
    !n && t.mixins.length && t.mixins.forEach(a), e.extends && a(e.extends), e.mixins && e.mixins.forEach(a)
  }
  return !o && !l
    ? (ae(e) && r.set(e, null), null)
    : (K(o) ? o.forEach((a) => (s[a] = null)) : xe(s, o), ae(e) && r.set(e, s), s)
}
function wr(e, t) {
  return !e || !gr(t)
    ? !1
    : ((t = t.slice(2).replace(/Once$/, '')), ee(e, t[0].toLowerCase() + t.slice(1)) || ee(e, cn(t)) || ee(e, t))
}
let He = null,
  Hs = null
function sr(e) {
  const t = He
  return (He = e), (Hs = (e && e.type.__scopeId) || null), t
}
function oi(e, t = He, n) {
  if (!t || e._n) return e
  const r = (...i) => {
    r._d && ko(-1)
    const o = sr(t)
    let s
    try {
      s = e(...i)
    } finally {
      sr(o), r._d && ko(1)
    }
    return s
  }
  return (r._n = !0), (r._c = !0), (r._d = !0), r
}
function Nr(e) {
  const {
    type: t,
    vnode: n,
    proxy: r,
    withProxy: i,
    props: o,
    propsOptions: [s],
    slots: l,
    attrs: a,
    emit: c,
    render: u,
    renderCache: f,
    data: d,
    setupState: g,
    ctx: D,
    inheritAttrs: v
  } = e
  let w, S
  const M = sr(e)
  try {
    if (n.shapeFlag & 4) {
      const E = i || r,
        U = E
      ;(w = nt(u.call(U, E, f, o, g, d, D))), (S = a)
    } else {
      const E = t
      ;(w = nt(E.length > 1 ? E(o, { attrs: a, slots: l, emit: c }) : E(o, null))), (S = t.props ? a : ja(a))
    }
  } catch (E) {
    ;(An.length = 0), Er(E, e, 1), (w = Ve(Bn))
  }
  let F = w
  if (S && v !== !1) {
    const E = Object.keys(S),
      { shapeFlag: U } = F
    E.length && U & 7 && (s && E.some(Ai) && (S = Ga(S, s)), (F = ln(F, S)))
  }
  return (
    n.dirs && ((F = ln(F)), (F.dirs = F.dirs ? F.dirs.concat(n.dirs) : n.dirs)),
    n.transition && (F.transition = n.transition),
    (w = F),
    sr(M),
    w
  )
}
const ja = (e) => {
    let t
    for (const n in e) (n === 'class' || n === 'style' || gr(n)) && ((t || (t = {}))[n] = e[n])
    return t
  },
  Ga = (e, t) => {
    const n = {}
    for (const r in e) (!Ai(r) || !(r.slice(9) in t)) && (n[r] = e[r])
    return n
  }
function Za(e, t, n) {
  const { props: r, children: i, component: o } = e,
    { props: s, children: l, patchFlag: a } = t,
    c = o.emitsOptions
  if (t.dirs || t.transition) return !0
  if (n && a >= 0) {
    if (a & 1024) return !0
    if (a & 16) return r ? po(r, s, c) : !!s
    if (a & 8) {
      const u = t.dynamicProps
      for (let f = 0; f < u.length; f++) {
        const d = u[f]
        if (s[d] !== r[d] && !wr(c, d)) return !0
      }
    }
  } else return (i || l) && (!l || !l.$stable) ? !0 : r === s ? !1 : r ? (s ? po(r, s, c) : !0) : !!s
  return !1
}
function po(e, t, n) {
  const r = Object.keys(t)
  if (r.length !== Object.keys(e).length) return !0
  for (let i = 0; i < r.length; i++) {
    const o = r[i]
    if (t[o] !== e[o] && !wr(n, o)) return !0
  }
  return !1
}
function Va({ vnode: e, parent: t }, n) {
  for (; t; ) {
    const r = t.subTree
    if ((r.suspense && r.suspense.activeBranch === e && (r.el = e.el), r === e)) ((e = t.vnode).el = n), (t = t.parent)
    else break
  }
}
const Ka = Symbol.for('v-ndc'),
  za = (e) => e.__isSuspense
function qa(e, t) {
  t && t.pendingBranch ? (K(e) ? t.effects.push(...e) : t.effects.push(e)) : Na(e)
}
const Wa = Symbol.for('v-scx'),
  Ya = () => tr(Wa),
  zn = {}
function wn(e, t, n) {
  return Us(e, t, n)
}
function Us(e, t, { immediate: n, deep: r, flush: i, once: o, onTrack: s, onTrigger: l } = ue) {
  if (t && o) {
    const R = t
    t = (...p) => {
      R(...p), U()
    }
  }
  const a = ke,
    c = (R) => (r === !0 ? R : Rt(R, r === !1 ? 1 : void 0))
  let u,
    f = !1,
    d = !1
  if (
    (Re(e)
      ? ((u = () => e.value), (f = or(e)))
      : nn(e)
      ? ((u = () => c(e)), (f = !0))
      : K(e)
      ? ((d = !0),
        (f = e.some((R) => nn(R) || or(R))),
        (u = () =>
          e.map((R) => {
            if (Re(R)) return R.value
            if (nn(R)) return c(R)
            if (W(R)) return $t(R, a, 2)
          })))
      : W(e)
      ? t
        ? (u = () => $t(e, a, 2))
        : (u = () => (g && g(), Ye(e, a, 3, [D])))
      : (u = Ze),
    t && r)
  ) {
    const R = u
    u = () => Rt(R())
  }
  let g,
    D = (R) => {
      g = F.onStop = () => {
        $t(R, a, 4), (g = F.onStop = void 0)
      }
    },
    v
  if (Ar)
    if (((D = Ze), t ? n && Ye(t, a, 3, [u(), d ? [] : void 0, D]) : u(), i === 'sync')) {
      const R = Ya()
      v = R.__watcherHandles || (R.__watcherHandles = [])
    } else return Ze
  let w = d ? new Array(e.length).fill(zn) : zn
  const S = () => {
    if (!(!F.active || !F.dirty))
      if (t) {
        const R = F.run()
        ;(r || f || (d ? R.some((p, T) => Bt(p, w[T])) : Bt(R, w))) &&
          (g && g(), Ye(t, a, 3, [R, w === zn ? void 0 : d && w[0] === zn ? [] : w, D]), (w = R))
      } else F.run()
  }
  S.allowRecurse = !!t
  let M
  i === 'sync'
    ? (M = S)
    : i === 'post'
    ? (M = () => Fe(S, a && a.suspense))
    : ((S.pre = !0), a && (S.id = a.uid), (M = () => Ni(S)))
  const F = new Bi(u, Ze, M),
    E = da(),
    U = () => {
      F.stop(), E && bi(E.effects, F)
    }
  return t ? (n ? S() : (w = F.run())) : i === 'post' ? Fe(F.run.bind(F), a && a.suspense) : F.run(), v && v.push(U), U
}
function Xa(e, t, n) {
  const r = this.proxy,
    i = ye(e) ? (e.includes('.') ? js(r, e) : () => r[e]) : e.bind(r, r)
  let o
  W(t) ? (o = t) : ((o = t.handler), (n = t))
  const s = Hn(this),
    l = Us(i, o.bind(r), n)
  return s(), l
}
function js(e, t) {
  const n = t.split('.')
  return () => {
    let r = e
    for (let i = 0; i < n.length && r; i++) r = r[n[i]]
    return r
  }
}
function Rt(e, t, n = 0, r) {
  if (!ae(e) || e.__v_skip) return e
  if (t && t > 0) {
    if (n >= t) return e
    n++
  }
  if (((r = r || new Set()), r.has(e))) return e
  if ((r.add(e), Re(e))) Rt(e.value, t, n, r)
  else if (K(e)) for (let i = 0; i < e.length; i++) Rt(e[i], t, n, r)
  else if (mr(e) || tn(e))
    e.forEach((i) => {
      Rt(i, t, n, r)
    })
  else if (fs(e)) for (const i in e) Rt(e[i], t, n, r)
  return e
}
function hn(e, t) {
  if (He === null) return e
  const n = br(He) || He.proxy,
    r = e.dirs || (e.dirs = [])
  for (let i = 0; i < t.length; i++) {
    let [o, s, l, a = ue] = t[i]
    o &&
      (W(o) && (o = { mounted: o, updated: o }),
      o.deep && Rt(s),
      r.push({ dir: o, instance: n, value: s, oldValue: void 0, arg: l, modifiers: a }))
  }
  return e
}
function Ft(e, t, n, r) {
  const i = e.dirs,
    o = t && t.dirs
  for (let s = 0; s < i.length; s++) {
    const l = i[s]
    o && (l.oldValue = o[s].value)
    let a = l.dir[r]
    a && (Gt(), Ye(a, n, 8, [e.el, l, e, t]), Zt())
  }
}
/*! #__NO_SIDE_EFFECTS__ */ function Hi(e, t) {
  return W(e) ? xe({ name: e.name }, t, { setup: e }) : e
}
const er = (e) => !!e.type.__asyncLoader,
  Gs = (e) => e.type.__isKeepAlive
function Ja(e, t) {
  Zs(e, 'a', t)
}
function Qa(e, t) {
  Zs(e, 'da', t)
}
function Zs(e, t, n = ke) {
  const r =
    e.__wdc ||
    (e.__wdc = () => {
      let i = n
      for (; i; ) {
        if (i.isDeactivated) return
        i = i.parent
      }
      return e()
    })
  if ((pr(t, r, n), n)) {
    let i = n.parent
    for (; i && i.parent; ) Gs(i.parent.vnode) && eu(r, t, n, i), (i = i.parent)
  }
}
function eu(e, t, n, r) {
  const i = pr(t, e, r, !0)
  Vs(() => {
    bi(r[t], i)
  }, n)
}
function pr(e, t, n = ke, r = !1) {
  if (n) {
    const i = n[e] || (n[e] = []),
      o =
        t.__weh ||
        (t.__weh = (...s) => {
          if (n.isUnmounted) return
          Gt()
          const l = Hn(n),
            a = Ye(t, n, e, s)
          return l(), Zt(), a
        })
    return r ? i.unshift(o) : i.push(o), o
  }
}
const yt =
    (e) =>
    (t, n = ke) =>
      (!Ar || e === 'sp') && pr(e, (...r) => t(...r), n),
  tu = yt('bm'),
  nu = yt('m'),
  ru = yt('bu'),
  iu = yt('u'),
  ou = yt('bum'),
  Vs = yt('um'),
  su = yt('sp'),
  lu = yt('rtg'),
  au = yt('rtc')
function uu(e, t = ke) {
  pr('ec', e, t)
}
function gn(e, t, n, r) {
  let i
  const o = n && n[r]
  if (K(e) || ye(e)) {
    i = new Array(e.length)
    for (let s = 0, l = e.length; s < l; s++) i[s] = t(e[s], s, void 0, o && o[s])
  } else if (typeof e == 'number') {
    i = new Array(e)
    for (let s = 0; s < e; s++) i[s] = t(s + 1, s, void 0, o && o[s])
  } else if (ae(e))
    if (e[Symbol.iterator]) i = Array.from(e, (s, l) => t(s, l, void 0, o && o[l]))
    else {
      const s = Object.keys(e)
      i = new Array(s.length)
      for (let l = 0, a = s.length; l < a; l++) {
        const c = s[l]
        i[l] = t(e[c], c, l, o && o[l])
      }
    }
  else i = []
  return n && (n[r] = i), i
}
const si = (e) => (e ? (nl(e) ? br(e) || e.proxy : si(e.parent)) : null),
  pn = xe(Object.create(null), {
    $: (e) => e,
    $el: (e) => e.vnode.el,
    $data: (e) => e.data,
    $props: (e) => e.props,
    $attrs: (e) => e.attrs,
    $slots: (e) => e.slots,
    $refs: (e) => e.refs,
    $parent: (e) => si(e.parent),
    $root: (e) => si(e.root),
    $emit: (e) => e.emit,
    $options: (e) => Ui(e),
    $forceUpdate: (e) =>
      e.f ||
      (e.f = () => {
        ;(e.effect.dirty = !0), Ni(e.update)
      }),
    $nextTick: (e) => e.n || (e.n = Ls.bind(e.proxy)),
    $watch: (e) => Xa.bind(e)
  }),
  Hr = (e, t) => e !== ue && !e.__isScriptSetup && ee(e, t),
  cu = {
    get({ _: e }, t) {
      const { ctx: n, setupState: r, data: i, props: o, accessCache: s, type: l, appContext: a } = e
      let c
      if (t[0] !== '$') {
        const g = s[t]
        if (g !== void 0)
          switch (g) {
            case 1:
              return r[t]
            case 2:
              return i[t]
            case 4:
              return n[t]
            case 3:
              return o[t]
          }
        else {
          if (Hr(r, t)) return (s[t] = 1), r[t]
          if (i !== ue && ee(i, t)) return (s[t] = 2), i[t]
          if ((c = e.propsOptions[0]) && ee(c, t)) return (s[t] = 3), o[t]
          if (n !== ue && ee(n, t)) return (s[t] = 4), n[t]
          li && (s[t] = 0)
        }
      }
      const u = pn[t]
      let f, d
      if (u) return t === '$attrs' && Ie(e, 'get', t), u(e)
      if ((f = l.__cssModules) && (f = f[t])) return f
      if (n !== ue && ee(n, t)) return (s[t] = 4), n[t]
      if (((d = a.config.globalProperties), ee(d, t))) return d[t]
    },
    set({ _: e }, t, n) {
      const { data: r, setupState: i, ctx: o } = e
      return Hr(i, t)
        ? ((i[t] = n), !0)
        : r !== ue && ee(r, t)
        ? ((r[t] = n), !0)
        : ee(e.props, t) || (t[0] === '$' && t.slice(1) in e)
        ? !1
        : ((o[t] = n), !0)
    },
    has({ _: { data: e, setupState: t, accessCache: n, ctx: r, appContext: i, propsOptions: o } }, s) {
      let l
      return (
        !!n[s] ||
        (e !== ue && ee(e, s)) ||
        Hr(t, s) ||
        ((l = o[0]) && ee(l, s)) ||
        ee(r, s) ||
        ee(pn, s) ||
        ee(i.config.globalProperties, s)
      )
    },
    defineProperty(e, t, n) {
      return (
        n.get != null ? (e._.accessCache[t] = 0) : ee(n, 'value') && this.set(e, t, n.value, null),
        Reflect.defineProperty(e, t, n)
      )
    }
  }
function Co(e) {
  return K(e) ? e.reduce((t, n) => ((t[n] = null), t), {}) : e
}
let li = !0
function du(e) {
  const t = Ui(e),
    n = e.proxy,
    r = e.ctx
  ;(li = !1), t.beforeCreate && _o(t.beforeCreate, e, 'bc')
  const {
    data: i,
    computed: o,
    methods: s,
    watch: l,
    provide: a,
    inject: c,
    created: u,
    beforeMount: f,
    mounted: d,
    beforeUpdate: g,
    updated: D,
    activated: v,
    deactivated: w,
    beforeDestroy: S,
    beforeUnmount: M,
    destroyed: F,
    unmounted: E,
    render: U,
    renderTracked: R,
    renderTriggered: p,
    errorCaptured: T,
    serverPrefetch: N,
    expose: A,
    inheritAttrs: Z,
    components: te,
    directives: le,
    filters: _e
  } = t
  if ((c && fu(c, r, null), s))
    for (const ne in s) {
      const j = s[ne]
      W(j) && (r[ne] = j.bind(n))
    }
  if (i) {
    const ne = i.call(n, n)
    ae(ne) && (e.data = Li(ne))
  }
  if (((li = !0), o))
    for (const ne in o) {
      const j = o[ne],
        J = W(j) ? j.bind(n, n) : W(j.get) ? j.get.bind(n, n) : Ze,
        De = !W(j) && W(j.set) ? j.set.bind(n) : Ze,
        Ee = Vu({ get: J, set: De })
      Object.defineProperty(r, ne, {
        enumerable: !0,
        configurable: !0,
        get: () => Ee.value,
        set: (we) => (Ee.value = we)
      })
    }
  if (l) for (const ne in l) Ks(l[ne], r, n, ne)
  if (a) {
    const ne = W(a) ? a.call(n) : a
    Reflect.ownKeys(ne).forEach((j) => {
      yu(j, ne[j])
    })
  }
  u && _o(u, e, 'c')
  function ce(ne, j) {
    K(j) ? j.forEach((J) => ne(J.bind(n))) : j && ne(j.bind(n))
  }
  if (
    (ce(tu, f),
    ce(nu, d),
    ce(ru, g),
    ce(iu, D),
    ce(Ja, v),
    ce(Qa, w),
    ce(uu, T),
    ce(au, R),
    ce(lu, p),
    ce(ou, M),
    ce(Vs, E),
    ce(su, N),
    K(A))
  )
    if (A.length) {
      const ne = e.exposed || (e.exposed = {})
      A.forEach((j) => {
        Object.defineProperty(ne, j, { get: () => n[j], set: (J) => (n[j] = J) })
      })
    } else e.exposed || (e.exposed = {})
  U && e.render === Ze && (e.render = U),
    Z != null && (e.inheritAttrs = Z),
    te && (e.components = te),
    le && (e.directives = le)
}
function fu(e, t, n = Ze) {
  K(e) && (e = ai(e))
  for (const r in e) {
    const i = e[r]
    let o
    ae(i) ? ('default' in i ? (o = tr(i.from || r, i.default, !0)) : (o = tr(i.from || r))) : (o = tr(i)),
      Re(o)
        ? Object.defineProperty(t, r, {
            enumerable: !0,
            configurable: !0,
            get: () => o.value,
            set: (s) => (o.value = s)
          })
        : (t[r] = o)
  }
}
function _o(e, t, n) {
  Ye(K(e) ? e.map((r) => r.bind(t.proxy)) : e.bind(t.proxy), t, n)
}
function Ks(e, t, n, r) {
  const i = r.includes('.') ? js(n, r) : () => n[r]
  if (ye(e)) {
    const o = t[e]
    W(o) && wn(i, o)
  } else if (W(e)) wn(i, e.bind(n))
  else if (ae(e))
    if (K(e)) e.forEach((o) => Ks(o, t, n, r))
    else {
      const o = W(e.handler) ? e.handler.bind(n) : t[e.handler]
      W(o) && wn(i, o, e)
    }
}
function Ui(e) {
  const t = e.type,
    { mixins: n, extends: r } = t,
    {
      mixins: i,
      optionsCache: o,
      config: { optionMergeStrategies: s }
    } = e.appContext,
    l = o.get(t)
  let a
  return (
    l
      ? (a = l)
      : !i.length && !n && !r
      ? (a = t)
      : ((a = {}), i.length && i.forEach((c) => lr(a, c, s, !0)), lr(a, t, s)),
    ae(t) && o.set(t, a),
    a
  )
}
function lr(e, t, n, r = !1) {
  const { mixins: i, extends: o } = t
  o && lr(e, o, n, !0), i && i.forEach((s) => lr(e, s, n, !0))
  for (const s in t)
    if (!(r && s === 'expose')) {
      const l = hu[s] || (n && n[s])
      e[s] = l ? l(e[s], t[s]) : t[s]
    }
  return e
}
const hu = {
  data: Ao,
  props: bo,
  emits: bo,
  methods: Dn,
  computed: Dn,
  beforeCreate: Me,
  created: Me,
  beforeMount: Me,
  mounted: Me,
  beforeUpdate: Me,
  updated: Me,
  beforeDestroy: Me,
  beforeUnmount: Me,
  destroyed: Me,
  unmounted: Me,
  activated: Me,
  deactivated: Me,
  errorCaptured: Me,
  serverPrefetch: Me,
  components: Dn,
  directives: Dn,
  watch: mu,
  provide: Ao,
  inject: gu
}
function Ao(e, t) {
  return t
    ? e
      ? function () {
          return xe(W(e) ? e.call(this, this) : e, W(t) ? t.call(this, this) : t)
        }
      : t
    : e
}
function gu(e, t) {
  return Dn(ai(e), ai(t))
}
function ai(e) {
  if (K(e)) {
    const t = {}
    for (let n = 0; n < e.length; n++) t[e[n]] = e[n]
    return t
  }
  return e
}
function Me(e, t) {
  return e ? [...new Set([].concat(e, t))] : t
}
function Dn(e, t) {
  return e ? xe(Object.create(null), e, t) : t
}
function bo(e, t) {
  return e ? (K(e) && K(t) ? [...new Set([...e, ...t])] : xe(Object.create(null), Co(e), Co(t ?? {}))) : t
}
function mu(e, t) {
  if (!e) return t
  if (!t) return e
  const n = xe(Object.create(null), e)
  for (const r in t) n[r] = Me(e[r], t[r])
  return n
}
function zs() {
  return {
    app: null,
    config: {
      isNativeTag: Yl,
      performance: !1,
      globalProperties: {},
      optionMergeStrategies: {},
      errorHandler: void 0,
      warnHandler: void 0,
      compilerOptions: {}
    },
    mixins: [],
    components: {},
    directives: {},
    provides: Object.create(null),
    optionsCache: new WeakMap(),
    propsCache: new WeakMap(),
    emitsCache: new WeakMap()
  }
}
let vu = 0
function Du(e, t) {
  return function (r, i = null) {
    W(r) || (r = xe({}, r)), i != null && !ae(i) && (i = null)
    const o = zs(),
      s = new WeakSet()
    let l = !1
    const a = (o.app = {
      _uid: vu++,
      _component: r,
      _props: i,
      _container: null,
      _context: o,
      _instance: null,
      version: Ku,
      get config() {
        return o.config
      },
      set config(c) {},
      use(c, ...u) {
        return s.has(c) || (c && W(c.install) ? (s.add(c), c.install(a, ...u)) : W(c) && (s.add(c), c(a, ...u))), a
      },
      mixin(c) {
        return o.mixins.includes(c) || o.mixins.push(c), a
      },
      component(c, u) {
        return u ? ((o.components[c] = u), a) : o.components[c]
      },
      directive(c, u) {
        return u ? ((o.directives[c] = u), a) : o.directives[c]
      },
      mount(c, u, f) {
        if (!l) {
          const d = Ve(r, i)
          return (
            (d.appContext = o),
            f === !0 ? (f = 'svg') : f === !1 && (f = void 0),
            u && t ? t(d, c) : e(d, c, f),
            (l = !0),
            (a._container = c),
            (c.__vue_app__ = a),
            br(d.component) || d.component.proxy
          )
        }
      },
      unmount() {
        l && (e(null, a._container), delete a._container.__vue_app__)
      },
      provide(c, u) {
        return (o.provides[c] = u), a
      },
      runWithContext(c) {
        const u = Cn
        Cn = a
        try {
          return c()
        } finally {
          Cn = u
        }
      }
    })
    return a
  }
}
let Cn = null
function yu(e, t) {
  if (ke) {
    let n = ke.provides
    const r = ke.parent && ke.parent.provides
    r === n && (n = ke.provides = Object.create(r)), (n[e] = t)
  }
}
function tr(e, t, n = !1) {
  const r = ke || He
  if (r || Cn) {
    const i = r
      ? r.parent == null
        ? r.vnode.appContext && r.vnode.appContext.provides
        : r.parent.provides
      : Cn._context.provides
    if (i && e in i) return i[e]
    if (arguments.length > 1) return n && W(t) ? t.call(r && r.proxy) : t
  }
}
function Eu(e, t, n, r = !1) {
  const i = {},
    o = {}
  ir(o, _r, 1), (e.propsDefaults = Object.create(null)), qs(e, t, i, o)
  for (const s in e.propsOptions[0]) s in i || (i[s] = void 0)
  n ? (e.props = r ? i : Ma(i)) : e.type.props ? (e.props = i) : (e.props = o), (e.attrs = o)
}
function wu(e, t, n, r) {
  const {
      props: i,
      attrs: o,
      vnode: { patchFlag: s }
    } = e,
    l = ie(i),
    [a] = e.propsOptions
  let c = !1
  if ((r || s > 0) && !(s & 16)) {
    if (s & 8) {
      const u = e.vnode.dynamicProps
      for (let f = 0; f < u.length; f++) {
        let d = u[f]
        if (wr(e.emitsOptions, d)) continue
        const g = t[d]
        if (a)
          if (ee(o, d)) g !== o[d] && ((o[d] = g), (c = !0))
          else {
            const D = on(d)
            i[D] = ui(a, l, D, g, e, !1)
          }
        else g !== o[d] && ((o[d] = g), (c = !0))
      }
    }
  } else {
    qs(e, t, i, o) && (c = !0)
    let u
    for (const f in l)
      (!t || (!ee(t, f) && ((u = cn(f)) === f || !ee(t, u)))) &&
        (a ? n && (n[f] !== void 0 || n[u] !== void 0) && (i[f] = ui(a, l, f, void 0, e, !0)) : delete i[f])
    if (o !== l) for (const f in o) (!t || !ee(t, f)) && (delete o[f], (c = !0))
  }
  c && ft(e, 'set', '$attrs')
}
function qs(e, t, n, r) {
  const [i, o] = e.propsOptions
  let s = !1,
    l
  if (t)
    for (let a in t) {
      if (En(a)) continue
      const c = t[a]
      let u
      i && ee(i, (u = on(a)))
        ? !o || !o.includes(u)
          ? (n[u] = c)
          : ((l || (l = {}))[u] = c)
        : wr(e.emitsOptions, a) || ((!(a in r) || c !== r[a]) && ((r[a] = c), (s = !0)))
    }
  if (o) {
    const a = ie(n),
      c = l || ue
    for (let u = 0; u < o.length; u++) {
      const f = o[u]
      n[f] = ui(i, a, f, c[f], e, !ee(c, f))
    }
  }
  return s
}
function ui(e, t, n, r, i, o) {
  const s = e[n]
  if (s != null) {
    const l = ee(s, 'default')
    if (l && r === void 0) {
      const a = s.default
      if (s.type !== Function && !s.skipFactory && W(a)) {
        const { propsDefaults: c } = i
        if (n in c) r = c[n]
        else {
          const u = Hn(i)
          ;(r = c[n] = a.call(null, t)), u()
        }
      } else r = a
    }
    s[0] && (o && !l ? (r = !1) : s[1] && (r === '' || r === cn(n)) && (r = !0))
  }
  return r
}
function Ws(e, t, n = !1) {
  const r = t.propsCache,
    i = r.get(e)
  if (i) return i
  const o = e.props,
    s = {},
    l = []
  let a = !1
  if (!W(e)) {
    const u = (f) => {
      a = !0
      const [d, g] = Ws(f, t, !0)
      xe(s, d), g && l.push(...g)
    }
    !n && t.mixins.length && t.mixins.forEach(u), e.extends && u(e.extends), e.mixins && e.mixins.forEach(u)
  }
  if (!o && !a) return ae(e) && r.set(e, en), en
  if (K(o))
    for (let u = 0; u < o.length; u++) {
      const f = on(o[u])
      xo(f) && (s[f] = ue)
    }
  else if (o)
    for (const u in o) {
      const f = on(u)
      if (xo(f)) {
        const d = o[u],
          g = (s[f] = K(d) || W(d) ? { type: d } : xe({}, d))
        if (g) {
          const D = To(Boolean, g.type),
            v = To(String, g.type)
          ;(g[0] = D > -1), (g[1] = v < 0 || D < v), (D > -1 || ee(g, 'default')) && l.push(f)
        }
      }
    }
  const c = [s, l]
  return ae(e) && r.set(e, c), c
}
function xo(e) {
  return e[0] !== '$' && !En(e)
}
function So(e) {
  const t = e && e.toString().match(/^\s*(function|class) (\w+)/)
  return t ? t[2] : e === null ? 'null' : ''
}
function $o(e, t) {
  return So(e) === So(t)
}
function To(e, t) {
  return K(t) ? t.findIndex((n) => $o(n, e)) : W(t) && $o(t, e) ? 0 : -1
}
const Ys = (e) => e[0] === '_' || e === '$stable',
  ji = (e) => (K(e) ? e.map(nt) : [nt(e)]),
  pu = (e, t, n) => {
    if (t._n) return t
    const r = oi((...i) => ji(t(...i)), n)
    return (r._c = !1), r
  },
  Xs = (e, t, n) => {
    const r = e._ctx
    for (const i in e) {
      if (Ys(i)) continue
      const o = e[i]
      if (W(o)) t[i] = pu(i, o, r)
      else if (o != null) {
        const s = ji(o)
        t[i] = () => s
      }
    }
  },
  Js = (e, t) => {
    const n = ji(t)
    e.slots.default = () => n
  },
  Cu = (e, t) => {
    if (e.vnode.shapeFlag & 32) {
      const n = t._
      n ? ((e.slots = ie(t)), ir(t, '_', n)) : Xs(t, (e.slots = {}))
    } else (e.slots = {}), t && Js(e, t)
    ir(e.slots, _r, 1)
  },
  _u = (e, t, n) => {
    const { vnode: r, slots: i } = e
    let o = !0,
      s = ue
    if (r.shapeFlag & 32) {
      const l = t._
      l ? (n && l === 1 ? (o = !1) : (xe(i, t), !n && l === 1 && delete i._)) : ((o = !t.$stable), Xs(t, i)), (s = t)
    } else t && (Js(e, t), (s = { default: 1 }))
    if (o) for (const l in i) !Ys(l) && s[l] == null && delete i[l]
  }
function ci(e, t, n, r, i = !1) {
  if (K(e)) {
    e.forEach((d, g) => ci(d, t && (K(t) ? t[g] : t), n, r, i))
    return
  }
  if (er(r) && !i) return
  const o = r.shapeFlag & 4 ? br(r.component) || r.component.proxy : r.el,
    s = i ? null : o,
    { i: l, r: a } = e,
    c = t && t.r,
    u = l.refs === ue ? (l.refs = {}) : l.refs,
    f = l.setupState
  if ((c != null && c !== a && (ye(c) ? ((u[c] = null), ee(f, c) && (f[c] = null)) : Re(c) && (c.value = null)), W(a)))
    $t(a, l, 12, [s, u])
  else {
    const d = ye(a),
      g = Re(a)
    if (d || g) {
      const D = () => {
        if (e.f) {
          const v = d ? (ee(f, a) ? f[a] : u[a]) : a.value
          i
            ? K(v) && bi(v, o)
            : K(v)
            ? v.includes(o) || v.push(o)
            : d
            ? ((u[a] = [o]), ee(f, a) && (f[a] = u[a]))
            : ((a.value = [o]), e.k && (u[e.k] = a.value))
        } else d ? ((u[a] = s), ee(f, a) && (f[a] = s)) : g && ((a.value = s), e.k && (u[e.k] = s))
      }
      s ? ((D.id = -1), Fe(D, n)) : D()
    }
  }
}
const Fe = qa
function Au(e) {
  return bu(e)
}
function bu(e, t) {
  const n = gs()
  n.__VUE__ = !0
  const {
      insert: r,
      remove: i,
      patchProp: o,
      createElement: s,
      createText: l,
      createComment: a,
      setText: c,
      setElementText: u,
      parentNode: f,
      nextSibling: d,
      setScopeId: g = Ze,
      insertStaticContent: D
    } = e,
    v = (h, m, y, C = null, _ = null, k = null, I = void 0, B = null, O = !!m.dynamicChildren) => {
      if (h === m) return
      h && !mn(h, m) && ((C = Un(h)), we(h, _, k, !0), (h = null)),
        m.patchFlag === -2 && ((O = !1), (m.dynamicChildren = null))
      const { type: b, ref: H, shapeFlag: V } = m
      switch (b) {
        case Cr:
          w(h, m, y, C)
          break
        case Bn:
          S(h, m, y, C)
          break
        case jr:
          h == null && M(m, y, C, I)
          break
        case Se:
          te(h, m, y, C, _, k, I, B, O)
          break
        default:
          V & 1
            ? U(h, m, y, C, _, k, I, B, O)
            : V & 6
            ? le(h, m, y, C, _, k, I, B, O)
            : (V & 64 || V & 128) && b.process(h, m, y, C, _, k, I, B, O, zt)
      }
      H != null && _ && ci(H, h && h.ref, k, m || h, !m)
    },
    w = (h, m, y, C) => {
      if (h == null) r((m.el = l(m.children)), y, C)
      else {
        const _ = (m.el = h.el)
        m.children !== h.children && c(_, m.children)
      }
    },
    S = (h, m, y, C) => {
      h == null ? r((m.el = a(m.children || '')), y, C) : (m.el = h.el)
    },
    M = (h, m, y, C) => {
      ;[h.el, h.anchor] = D(h.children, m, y, C, h.el, h.anchor)
    },
    F = ({ el: h, anchor: m }, y, C) => {
      let _
      for (; h && h !== m; ) (_ = d(h)), r(h, y, C), (h = _)
      r(m, y, C)
    },
    E = ({ el: h, anchor: m }) => {
      let y
      for (; h && h !== m; ) (y = d(h)), i(h), (h = y)
      i(m)
    },
    U = (h, m, y, C, _, k, I, B, O) => {
      m.type === 'svg' ? (I = 'svg') : m.type === 'math' && (I = 'mathml'),
        h == null ? R(m, y, C, _, k, I, B, O) : N(h, m, _, k, I, B, O)
    },
    R = (h, m, y, C, _, k, I, B) => {
      let O, b
      const { props: H, shapeFlag: V, transition: G, dirs: q } = h
      if (
        ((O = h.el = s(h.type, k, H && H.is, H)),
        V & 8 ? u(O, h.children) : V & 16 && T(h.children, O, null, C, _, Ur(h, k), I, B),
        q && Ft(h, null, C, 'created'),
        p(O, h, h.scopeId, I, C),
        H)
      ) {
        for (const oe in H) oe !== 'value' && !En(oe) && o(O, oe, null, H[oe], k, h.children, C, _, at)
        'value' in H && o(O, 'value', null, H.value, k), (b = H.onVnodeBeforeMount) && tt(b, C, h)
      }
      q && Ft(h, null, C, 'beforeMount')
      const X = xu(_, G)
      X && G.beforeEnter(O),
        r(O, m, y),
        ((b = H && H.onVnodeMounted) || X || q) &&
          Fe(() => {
            b && tt(b, C, h), X && G.enter(O), q && Ft(h, null, C, 'mounted')
          }, _)
    },
    p = (h, m, y, C, _) => {
      if ((y && g(h, y), C)) for (let k = 0; k < C.length; k++) g(h, C[k])
      if (_) {
        let k = _.subTree
        if (m === k) {
          const I = _.vnode
          p(h, I, I.scopeId, I.slotScopeIds, _.parent)
        }
      }
    },
    T = (h, m, y, C, _, k, I, B, O = 0) => {
      for (let b = O; b < h.length; b++) {
        const H = (h[b] = B ? bt(h[b]) : nt(h[b]))
        v(null, H, m, y, C, _, k, I, B)
      }
    },
    N = (h, m, y, C, _, k, I) => {
      const B = (m.el = h.el)
      let { patchFlag: O, dynamicChildren: b, dirs: H } = m
      O |= h.patchFlag & 16
      const V = h.props || ue,
        G = m.props || ue
      let q
      if (
        (y && Lt(y, !1),
        (q = G.onVnodeBeforeUpdate) && tt(q, y, m, h),
        H && Ft(m, h, y, 'beforeUpdate'),
        y && Lt(y, !0),
        b ? A(h.dynamicChildren, b, B, y, C, Ur(m, _), k) : I || j(h, m, B, null, y, C, Ur(m, _), k, !1),
        O > 0)
      ) {
        if (O & 16) Z(B, m, V, G, y, C, _)
        else if (
          (O & 2 && V.class !== G.class && o(B, 'class', null, G.class, _),
          O & 4 && o(B, 'style', V.style, G.style, _),
          O & 8)
        ) {
          const X = m.dynamicProps
          for (let oe = 0; oe < X.length; oe++) {
            const de = X[oe],
              pe = V[de],
              Ke = G[de]
            ;(Ke !== pe || de === 'value') && o(B, de, pe, Ke, _, h.children, y, C, at)
          }
        }
        O & 1 && h.children !== m.children && u(B, m.children)
      } else !I && b == null && Z(B, m, V, G, y, C, _)
      ;((q = G.onVnodeUpdated) || H) &&
        Fe(() => {
          q && tt(q, y, m, h), H && Ft(m, h, y, 'updated')
        }, C)
    },
    A = (h, m, y, C, _, k, I) => {
      for (let B = 0; B < m.length; B++) {
        const O = h[B],
          b = m[B],
          H = O.el && (O.type === Se || !mn(O, b) || O.shapeFlag & 70) ? f(O.el) : y
        v(O, b, H, null, C, _, k, I, !0)
      }
    },
    Z = (h, m, y, C, _, k, I) => {
      if (y !== C) {
        if (y !== ue) for (const B in y) !En(B) && !(B in C) && o(h, B, y[B], null, I, m.children, _, k, at)
        for (const B in C) {
          if (En(B)) continue
          const O = C[B],
            b = y[B]
          O !== b && B !== 'value' && o(h, B, b, O, I, m.children, _, k, at)
        }
        'value' in C && o(h, 'value', y.value, C.value, I)
      }
    },
    te = (h, m, y, C, _, k, I, B, O) => {
      const b = (m.el = h ? h.el : l('')),
        H = (m.anchor = h ? h.anchor : l(''))
      let { patchFlag: V, dynamicChildren: G, slotScopeIds: q } = m
      q && (B = B ? B.concat(q) : q),
        h == null
          ? (r(b, y, C), r(H, y, C), T(m.children || [], y, H, _, k, I, B, O))
          : V > 0 && V & 64 && G && h.dynamicChildren
          ? (A(h.dynamicChildren, G, y, _, k, I, B), (m.key != null || (_ && m === _.subTree)) && Gi(h, m, !0))
          : j(h, m, y, H, _, k, I, B, O)
    },
    le = (h, m, y, C, _, k, I, B, O) => {
      ;(m.slotScopeIds = B),
        h == null ? (m.shapeFlag & 512 ? _.ctx.activate(m, y, C, I, O) : _e(m, y, C, _, k, I, O)) : Pe(h, m, O)
    },
    _e = (h, m, y, C, _, k, I) => {
      const B = (h.component = Nu(h, C, _))
      if ((Gs(h) && (B.ctx.renderer = zt), Hu(B), B.asyncDep)) {
        if ((_ && _.registerDep(B, ce), !h.el)) {
          const O = (B.subTree = Ve(Bn))
          S(null, O, m, y)
        }
      } else ce(B, h, m, y, _, k, I)
    },
    Pe = (h, m, y) => {
      const C = (m.component = h.component)
      if (Za(h, m, y))
        if (C.asyncDep && !C.asyncResolved) {
          ne(C, m, y)
          return
        } else (C.next = m), Pa(C.update), (C.effect.dirty = !0), C.update()
      else (m.el = h.el), (C.vnode = m)
    },
    ce = (h, m, y, C, _, k, I) => {
      const B = () => {
          if (h.isMounted) {
            let { next: H, bu: V, u: G, parent: q, vnode: X } = h
            {
              const qt = Qs(h)
              if (qt) {
                H && ((H.el = X.el), ne(h, H, I)),
                  qt.asyncDep.then(() => {
                    h.isUnmounted || B()
                  })
                return
              }
            }
            let oe = H,
              de
            Lt(h, !1),
              H ? ((H.el = X.el), ne(h, H, I)) : (H = X),
              V && Jn(V),
              (de = H.props && H.props.onVnodeBeforeUpdate) && tt(de, q, H, X),
              Lt(h, !0)
            const pe = Nr(h),
              Ke = h.subTree
            ;(h.subTree = pe),
              v(Ke, pe, f(Ke.el), Un(Ke), h, _, k),
              (H.el = pe.el),
              oe === null && Va(h, pe.el),
              G && Fe(G, _),
              (de = H.props && H.props.onVnodeUpdated) && Fe(() => tt(de, q, H, X), _)
          } else {
            let H
            const { el: V, props: G } = m,
              { bm: q, m: X, parent: oe } = h,
              de = er(m)
            if ((Lt(h, !1), q && Jn(q), !de && (H = G && G.onVnodeBeforeMount) && tt(H, oe, m), Lt(h, !0), V && Ir)) {
              const pe = () => {
                ;(h.subTree = Nr(h)), Ir(V, h.subTree, h, _, null)
              }
              de ? m.type.__asyncLoader().then(() => !h.isUnmounted && pe()) : pe()
            } else {
              const pe = (h.subTree = Nr(h))
              v(null, pe, y, C, h, _, k), (m.el = pe.el)
            }
            if ((X && Fe(X, _), !de && (H = G && G.onVnodeMounted))) {
              const pe = m
              Fe(() => tt(H, oe, pe), _)
            }
            ;(m.shapeFlag & 256 || (oe && er(oe.vnode) && oe.vnode.shapeFlag & 256)) && h.a && Fe(h.a, _),
              (h.isMounted = !0),
              (m = y = C = null)
          }
        },
        O = (h.effect = new Bi(B, Ze, () => Ni(b), h.scope)),
        b = (h.update = () => {
          O.dirty && O.run()
        })
      ;(b.id = h.uid), Lt(h, !0), b()
    },
    ne = (h, m, y) => {
      m.component = h
      const C = h.vnode.props
      ;(h.vnode = m), (h.next = null), wu(h, m.props, C, y), _u(h, m.children, y), Gt(), wo(h), Zt()
    },
    j = (h, m, y, C, _, k, I, B, O = !1) => {
      const b = h && h.children,
        H = h ? h.shapeFlag : 0,
        V = m.children,
        { patchFlag: G, shapeFlag: q } = m
      if (G > 0) {
        if (G & 128) {
          De(b, V, y, C, _, k, I, B, O)
          return
        } else if (G & 256) {
          J(b, V, y, C, _, k, I, B, O)
          return
        }
      }
      q & 8
        ? (H & 16 && at(b, _, k), V !== b && u(y, V))
        : H & 16
        ? q & 16
          ? De(b, V, y, C, _, k, I, B, O)
          : at(b, _, k, !0)
        : (H & 8 && u(y, ''), q & 16 && T(V, y, C, _, k, I, B, O))
    },
    J = (h, m, y, C, _, k, I, B, O) => {
      ;(h = h || en), (m = m || en)
      const b = h.length,
        H = m.length,
        V = Math.min(b, H)
      let G
      for (G = 0; G < V; G++) {
        const q = (m[G] = O ? bt(m[G]) : nt(m[G]))
        v(h[G], q, y, null, _, k, I, B, O)
      }
      b > H ? at(h, _, k, !0, !1, V) : T(m, y, C, _, k, I, B, O, V)
    },
    De = (h, m, y, C, _, k, I, B, O) => {
      let b = 0
      const H = m.length
      let V = h.length - 1,
        G = H - 1
      for (; b <= V && b <= G; ) {
        const q = h[b],
          X = (m[b] = O ? bt(m[b]) : nt(m[b]))
        if (mn(q, X)) v(q, X, y, null, _, k, I, B, O)
        else break
        b++
      }
      for (; b <= V && b <= G; ) {
        const q = h[V],
          X = (m[G] = O ? bt(m[G]) : nt(m[G]))
        if (mn(q, X)) v(q, X, y, null, _, k, I, B, O)
        else break
        V--, G--
      }
      if (b > V) {
        if (b <= G) {
          const q = G + 1,
            X = q < H ? m[q].el : C
          for (; b <= G; ) v(null, (m[b] = O ? bt(m[b]) : nt(m[b])), y, X, _, k, I, B, O), b++
        }
      } else if (b > G) for (; b <= V; ) we(h[b], _, k, !0), b++
      else {
        const q = b,
          X = b,
          oe = new Map()
        for (b = X; b <= G; b++) {
          const Ne = (m[b] = O ? bt(m[b]) : nt(m[b]))
          Ne.key != null && oe.set(Ne.key, b)
        }
        let de,
          pe = 0
        const Ke = G - X + 1
        let qt = !1,
          lo = 0
        const fn = new Array(Ke)
        for (b = 0; b < Ke; b++) fn[b] = 0
        for (b = q; b <= V; b++) {
          const Ne = h[b]
          if (pe >= Ke) {
            we(Ne, _, k, !0)
            continue
          }
          let et
          if (Ne.key != null) et = oe.get(Ne.key)
          else
            for (de = X; de <= G; de++)
              if (fn[de - X] === 0 && mn(Ne, m[de])) {
                et = de
                break
              }
          et === void 0
            ? we(Ne, _, k, !0)
            : ((fn[et - X] = b + 1), et >= lo ? (lo = et) : (qt = !0), v(Ne, m[et], y, null, _, k, I, B, O), pe++)
        }
        const ao = qt ? Su(fn) : en
        for (de = ao.length - 1, b = Ke - 1; b >= 0; b--) {
          const Ne = X + b,
            et = m[Ne],
            uo = Ne + 1 < H ? m[Ne + 1].el : C
          fn[b] === 0 ? v(null, et, y, uo, _, k, I, B, O) : qt && (de < 0 || b !== ao[de] ? Ee(et, y, uo, 2) : de--)
        }
      }
    },
    Ee = (h, m, y, C, _ = null) => {
      const { el: k, type: I, transition: B, children: O, shapeFlag: b } = h
      if (b & 6) {
        Ee(h.component.subTree, m, y, C)
        return
      }
      if (b & 128) {
        h.suspense.move(m, y, C)
        return
      }
      if (b & 64) {
        I.move(h, m, y, zt)
        return
      }
      if (I === Se) {
        r(k, m, y)
        for (let V = 0; V < O.length; V++) Ee(O[V], m, y, C)
        r(h.anchor, m, y)
        return
      }
      if (I === jr) {
        F(h, m, y)
        return
      }
      if (C !== 2 && b & 1 && B)
        if (C === 0) B.beforeEnter(k), r(k, m, y), Fe(() => B.enter(k), _)
        else {
          const { leave: V, delayLeave: G, afterLeave: q } = B,
            X = () => r(k, m, y),
            oe = () => {
              V(k, () => {
                X(), q && q()
              })
            }
          G ? G(k, X, oe) : oe()
        }
      else r(k, m, y)
    },
    we = (h, m, y, C = !1, _ = !1) => {
      const { type: k, props: I, ref: B, children: O, dynamicChildren: b, shapeFlag: H, patchFlag: V, dirs: G } = h
      if ((B != null && ci(B, null, y, h, !0), H & 256)) {
        m.ctx.deactivate(h)
        return
      }
      const q = H & 1 && G,
        X = !er(h)
      let oe
      if ((X && (oe = I && I.onVnodeBeforeUnmount) && tt(oe, m, h), H & 6)) Qe(h.component, y, C)
      else {
        if (H & 128) {
          h.suspense.unmount(y, C)
          return
        }
        q && Ft(h, null, m, 'beforeUnmount'),
          H & 64
            ? h.type.remove(h, m, y, _, zt, C)
            : b && (k !== Se || (V > 0 && V & 64))
            ? at(b, m, y, !1, !0)
            : ((k === Se && V & 384) || (!_ && H & 16)) && at(O, m, y),
          C && Je(h)
      }
      ;((X && (oe = I && I.onVnodeUnmounted)) || q) &&
        Fe(() => {
          oe && tt(oe, m, h), q && Ft(h, null, m, 'unmounted')
        }, y)
    },
    Je = (h) => {
      const { type: m, el: y, anchor: C, transition: _ } = h
      if (m === Se) {
        Kt(y, C)
        return
      }
      if (m === jr) {
        E(h)
        return
      }
      const k = () => {
        i(y), _ && !_.persisted && _.afterLeave && _.afterLeave()
      }
      if (h.shapeFlag & 1 && _ && !_.persisted) {
        const { leave: I, delayLeave: B } = _,
          O = () => I(y, k)
        B ? B(h.el, k, O) : O()
      } else k()
    },
    Kt = (h, m) => {
      let y
      for (; h !== m; ) (y = d(h)), i(h), (h = y)
      i(m)
    },
    Qe = (h, m, y) => {
      const { bum: C, scope: _, update: k, subTree: I, um: B } = h
      C && Jn(C),
        _.stop(),
        k && ((k.active = !1), we(I, h, m, y)),
        B && Fe(B, m),
        Fe(() => {
          h.isUnmounted = !0
        }, m),
        m &&
          m.pendingBranch &&
          !m.isUnmounted &&
          h.asyncDep &&
          !h.asyncResolved &&
          h.suspenseId === m.pendingId &&
          (m.deps--, m.deps === 0 && m.resolve())
    },
    at = (h, m, y, C = !1, _ = !1, k = 0) => {
      for (let I = k; I < h.length; I++) we(h[I], m, y, C, _)
    },
    Un = (h) =>
      h.shapeFlag & 6 ? Un(h.component.subTree) : h.shapeFlag & 128 ? h.suspense.next() : d(h.anchor || h.el)
  let Fr = !1
  const so = (h, m, y) => {
      h == null ? m._vnode && we(m._vnode, null, null, !0) : v(m._vnode || null, h, m, null, null, null, y),
        Fr || ((Fr = !0), wo(), Rs(), (Fr = !1)),
        (m._vnode = h)
    },
    zt = { p: v, um: we, m: Ee, r: Je, mt: _e, mc: T, pc: j, pbc: A, n: Un, o: e }
  let Lr, Ir
  return t && ([Lr, Ir] = t(zt)), { render: so, hydrate: Lr, createApp: Du(so, Lr) }
}
function Ur({ type: e, props: t }, n) {
  return (n === 'svg' && e === 'foreignObject') ||
    (n === 'mathml' && e === 'annotation-xml' && t && t.encoding && t.encoding.includes('html'))
    ? void 0
    : n
}
function Lt({ effect: e, update: t }, n) {
  e.allowRecurse = t.allowRecurse = n
}
function xu(e, t) {
  return (!e || (e && !e.pendingBranch)) && t && !t.persisted
}
function Gi(e, t, n = !1) {
  const r = e.children,
    i = t.children
  if (K(r) && K(i))
    for (let o = 0; o < r.length; o++) {
      const s = r[o]
      let l = i[o]
      l.shapeFlag & 1 &&
        !l.dynamicChildren &&
        ((l.patchFlag <= 0 || l.patchFlag === 32) && ((l = i[o] = bt(i[o])), (l.el = s.el)), n || Gi(s, l)),
        l.type === Cr && (l.el = s.el)
    }
}
function Su(e) {
  const t = e.slice(),
    n = [0]
  let r, i, o, s, l
  const a = e.length
  for (r = 0; r < a; r++) {
    const c = e[r]
    if (c !== 0) {
      if (((i = n[n.length - 1]), e[i] < c)) {
        ;(t[r] = i), n.push(r)
        continue
      }
      for (o = 0, s = n.length - 1; o < s; ) (l = (o + s) >> 1), e[n[l]] < c ? (o = l + 1) : (s = l)
      c < e[n[o]] && (o > 0 && (t[r] = n[o - 1]), (n[o] = r))
    }
  }
  for (o = n.length, s = n[o - 1]; o-- > 0; ) (n[o] = s), (s = t[s])
  return n
}
function Qs(e) {
  const t = e.subTree.component
  if (t) return t.asyncDep && !t.asyncResolved ? t : Qs(t)
}
const $u = (e) => e.__isTeleport,
  _n = (e) => e && (e.disabled || e.disabled === ''),
  Bo = (e) => typeof SVGElement < 'u' && e instanceof SVGElement,
  Mo = (e) => typeof MathMLElement == 'function' && e instanceof MathMLElement,
  di = (e, t) => {
    const n = e && e.to
    return ye(n) ? (t ? t(n) : null) : n
  },
  Tu = {
    name: 'Teleport',
    __isTeleport: !0,
    process(e, t, n, r, i, o, s, l, a, c) {
      const {
          mc: u,
          pc: f,
          pbc: d,
          o: { insert: g, querySelector: D, createText: v, createComment: w }
        } = c,
        S = _n(t.props)
      let { shapeFlag: M, children: F, dynamicChildren: E } = t
      if (e == null) {
        const U = (t.el = v('')),
          R = (t.anchor = v(''))
        g(U, n, r), g(R, n, r)
        const p = (t.target = di(t.props, D)),
          T = (t.targetAnchor = v(''))
        p && (g(T, p), s === 'svg' || Bo(p) ? (s = 'svg') : (s === 'mathml' || Mo(p)) && (s = 'mathml'))
        const N = (A, Z) => {
          M & 16 && u(F, A, Z, i, o, s, l, a)
        }
        S ? N(n, R) : p && N(p, T)
      } else {
        t.el = e.el
        const U = (t.anchor = e.anchor),
          R = (t.target = e.target),
          p = (t.targetAnchor = e.targetAnchor),
          T = _n(e.props),
          N = T ? n : R,
          A = T ? U : p
        if (
          (s === 'svg' || Bo(R) ? (s = 'svg') : (s === 'mathml' || Mo(R)) && (s = 'mathml'),
          E ? (d(e.dynamicChildren, E, N, i, o, s, l), Gi(e, t, !0)) : a || f(e, t, N, A, i, o, s, l, !1),
          S)
        )
          T ? t.props && e.props && t.props.to !== e.props.to && (t.props.to = e.props.to) : qn(t, n, U, c, 1)
        else if ((t.props && t.props.to) !== (e.props && e.props.to)) {
          const Z = (t.target = di(t.props, D))
          Z && qn(t, Z, null, c, 0)
        } else T && qn(t, R, p, c, 1)
      }
      el(t)
    },
    remove(e, t, n, r, { um: i, o: { remove: o } }, s) {
      const { shapeFlag: l, children: a, anchor: c, targetAnchor: u, target: f, props: d } = e
      if ((f && o(u), s && o(c), l & 16)) {
        const g = s || !_n(d)
        for (let D = 0; D < a.length; D++) {
          const v = a[D]
          i(v, t, n, g, !!v.dynamicChildren)
        }
      }
    },
    move: qn,
    hydrate: Bu
  }
function qn(e, t, n, { o: { insert: r }, m: i }, o = 2) {
  o === 0 && r(e.targetAnchor, t, n)
  const { el: s, anchor: l, shapeFlag: a, children: c, props: u } = e,
    f = o === 2
  if ((f && r(s, t, n), (!f || _n(u)) && a & 16)) for (let d = 0; d < c.length; d++) i(c[d], t, n, 2)
  f && r(l, t, n)
}
function Bu(e, t, n, r, i, o, { o: { nextSibling: s, parentNode: l, querySelector: a } }, c) {
  const u = (t.target = di(t.props, a))
  if (u) {
    const f = u._lpa || u.firstChild
    if (t.shapeFlag & 16)
      if (_n(t.props)) (t.anchor = c(s(e), t, l(e), n, r, i, o)), (t.targetAnchor = f)
      else {
        t.anchor = s(e)
        let d = f
        for (; d; )
          if (((d = s(d)), d && d.nodeType === 8 && d.data === 'teleport anchor')) {
            ;(t.targetAnchor = d), (u._lpa = t.targetAnchor && s(t.targetAnchor))
            break
          }
        c(f, t, u, n, r, i, o)
      }
    el(t)
  }
  return t.anchor && s(t.anchor)
}
const Mu = Tu
function el(e) {
  const t = e.ctx
  if (t && t.ut) {
    let n = e.children[0].el
    for (; n && n !== e.targetAnchor; ) n.nodeType === 1 && n.setAttribute('data-v-owner', t.uid), (n = n.nextSibling)
    t.ut()
  }
}
const Se = Symbol.for('v-fgt'),
  Cr = Symbol.for('v-txt'),
  Bn = Symbol.for('v-cmt'),
  jr = Symbol.for('v-stc'),
  An = []
let We = null
function pt(e = !1) {
  An.push((We = e ? null : []))
}
function ku() {
  An.pop(), (We = An[An.length - 1] || null)
}
let Mn = 1
function ko(e) {
  Mn += e
}
function Ou(e) {
  return (e.dynamicChildren = Mn > 0 ? We || en : null), ku(), Mn > 0 && We && We.push(e), e
}
function Ct(e, t, n, r, i, o) {
  return Ou(Y(e, t, n, r, i, o, !0))
}
function fi(e) {
  return e ? e.__v_isVNode === !0 : !1
}
function mn(e, t) {
  return e.type === t.type && e.key === t.key
}
const _r = '__vInternal',
  tl = ({ key: e }) => e ?? null,
  nr = ({ ref: e, ref_key: t, ref_for: n }) => (
    typeof e == 'number' && (e = '' + e),
    e != null ? (ye(e) || Re(e) || W(e) ? { i: He, r: e, k: t, f: !!n } : e) : null
  )
function Y(e, t = null, n = null, r = 0, i = null, o = e === Se ? 0 : 1, s = !1, l = !1) {
  const a = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e,
    props: t,
    key: t && tl(t),
    ref: t && nr(t),
    scopeId: Hs,
    slotScopeIds: null,
    children: n,
    component: null,
    suspense: null,
    ssContent: null,
    ssFallback: null,
    dirs: null,
    transition: null,
    el: null,
    anchor: null,
    target: null,
    targetAnchor: null,
    staticCount: 0,
    shapeFlag: o,
    patchFlag: r,
    dynamicProps: i,
    dynamicChildren: null,
    appContext: null,
    ctx: He
  }
  return (
    l ? (Zi(a, n), o & 128 && e.normalize(a)) : n && (a.shapeFlag |= ye(n) ? 8 : 16),
    Mn > 0 && !s && We && (a.patchFlag > 0 || o & 6) && a.patchFlag !== 32 && We.push(a),
    a
  )
}
const Ve = Fu
function Fu(e, t = null, n = null, r = 0, i = null, o = !1) {
  if (((!e || e === Ka) && (e = Bn), fi(e))) {
    const l = ln(e, t, !0)
    return (
      n && Zi(l, n),
      Mn > 0 && !o && We && (l.shapeFlag & 6 ? (We[We.indexOf(e)] = l) : We.push(l)),
      (l.patchFlag |= -2),
      l
    )
  }
  if ((Zu(e) && (e = e.__vccOpts), t)) {
    t = Lu(t)
    let { class: l, style: a } = t
    l && !ye(l) && (t.class = Ti(l)), ae(a) && (Ts(a) && !K(a) && (a = xe({}, a)), (t.style = $i(a)))
  }
  const s = ye(e) ? 1 : za(e) ? 128 : $u(e) ? 64 : ae(e) ? 4 : W(e) ? 2 : 0
  return Y(e, t, n, r, i, s, o, !0)
}
function Lu(e) {
  return e ? (Ts(e) || _r in e ? xe({}, e) : e) : null
}
function ln(e, t, n = !1) {
  const { props: r, ref: i, patchFlag: o, children: s } = e,
    l = t ? Iu(r || {}, t) : r
  return {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e.type,
    props: l,
    key: l && tl(l),
    ref: t && t.ref ? (n && i ? (K(i) ? i.concat(nr(t)) : [i, nr(t)]) : nr(t)) : i,
    scopeId: e.scopeId,
    slotScopeIds: e.slotScopeIds,
    children: s,
    target: e.target,
    targetAnchor: e.targetAnchor,
    staticCount: e.staticCount,
    shapeFlag: e.shapeFlag,
    patchFlag: t && e.type !== Se ? (o === -1 ? 16 : o | 16) : o,
    dynamicProps: e.dynamicProps,
    dynamicChildren: e.dynamicChildren,
    appContext: e.appContext,
    dirs: e.dirs,
    transition: e.transition,
    component: e.component,
    suspense: e.suspense,
    ssContent: e.ssContent && ln(e.ssContent),
    ssFallback: e.ssFallback && ln(e.ssFallback),
    el: e.el,
    anchor: e.anchor,
    ctx: e.ctx,
    ce: e.ce
  }
}
function hi(e = ' ', t = 0) {
  return Ve(Cr, null, e, t)
}
function nt(e) {
  return e == null || typeof e == 'boolean'
    ? Ve(Bn)
    : K(e)
    ? Ve(Se, null, e.slice())
    : typeof e == 'object'
    ? bt(e)
    : Ve(Cr, null, String(e))
}
function bt(e) {
  return (e.el === null && e.patchFlag !== -1) || e.memo ? e : ln(e)
}
function Zi(e, t) {
  let n = 0
  const { shapeFlag: r } = e
  if (t == null) t = null
  else if (K(t)) n = 16
  else if (typeof t == 'object')
    if (r & 65) {
      const i = t.default
      i && (i._c && (i._d = !1), Zi(e, i()), i._c && (i._d = !0))
      return
    } else {
      n = 32
      const i = t._
      !i && !(_r in t)
        ? (t._ctx = He)
        : i === 3 && He && (He.slots._ === 1 ? (t._ = 1) : ((t._ = 2), (e.patchFlag |= 1024)))
    }
  else
    W(t) ? ((t = { default: t, _ctx: He }), (n = 32)) : ((t = String(t)), r & 64 ? ((n = 16), (t = [hi(t)])) : (n = 8))
  ;(e.children = t), (e.shapeFlag |= n)
}
function Iu(...e) {
  const t = {}
  for (let n = 0; n < e.length; n++) {
    const r = e[n]
    for (const i in r)
      if (i === 'class') t.class !== r.class && (t.class = Ti([t.class, r.class]))
      else if (i === 'style') t.style = $i([t.style, r.style])
      else if (gr(i)) {
        const o = t[i],
          s = r[i]
        s && o !== s && !(K(o) && o.includes(s)) && (t[i] = o ? [].concat(o, s) : s)
      } else i !== '' && (t[i] = r[i])
  }
  return t
}
function tt(e, t, n, r = null) {
  Ye(e, t, 7, [n, r])
}
const Ru = zs()
let Pu = 0
function Nu(e, t, n) {
  const r = e.type,
    i = (t ? t.appContext : e.appContext) || Ru,
    o = {
      uid: Pu++,
      vnode: e,
      type: r,
      parent: t,
      appContext: i,
      root: null,
      next: null,
      subTree: null,
      effect: null,
      update: null,
      scope: new ua(!0),
      render: null,
      proxy: null,
      exposed: null,
      exposeProxy: null,
      withProxy: null,
      provides: t ? t.provides : Object.create(i.provides),
      accessCache: null,
      renderCache: [],
      components: null,
      directives: null,
      propsOptions: Ws(r, i),
      emitsOptions: Ns(r, i),
      emit: null,
      emitted: null,
      propsDefaults: ue,
      inheritAttrs: r.inheritAttrs,
      ctx: ue,
      data: ue,
      props: ue,
      attrs: ue,
      slots: ue,
      refs: ue,
      setupState: ue,
      setupContext: null,
      attrsProxy: null,
      slotsProxy: null,
      suspense: n,
      suspenseId: n ? n.pendingId : 0,
      asyncDep: null,
      asyncResolved: !1,
      isMounted: !1,
      isUnmounted: !1,
      isDeactivated: !1,
      bc: null,
      c: null,
      bm: null,
      m: null,
      bu: null,
      u: null,
      um: null,
      bum: null,
      da: null,
      a: null,
      rtg: null,
      rtc: null,
      ec: null,
      sp: null
    }
  return (o.ctx = { _: o }), (o.root = t ? t.root : o), (o.emit = Ua.bind(null, o)), e.ce && e.ce(o), o
}
let ke = null,
  ar,
  gi
{
  const e = gs(),
    t = (n, r) => {
      let i
      return (
        (i = e[n]) || (i = e[n] = []),
        i.push(r),
        (o) => {
          i.length > 1 ? i.forEach((s) => s(o)) : i[0](o)
        }
      )
    }
  ;(ar = t('__VUE_INSTANCE_SETTERS__', (n) => (ke = n))), (gi = t('__VUE_SSR_SETTERS__', (n) => (Ar = n)))
}
const Hn = (e) => {
    const t = ke
    return (
      ar(e),
      e.scope.on(),
      () => {
        e.scope.off(), ar(t)
      }
    )
  },
  Oo = () => {
    ke && ke.scope.off(), ar(null)
  }
function nl(e) {
  return e.vnode.shapeFlag & 4
}
let Ar = !1
function Hu(e, t = !1) {
  t && gi(t)
  const { props: n, children: r } = e.vnode,
    i = nl(e)
  Eu(e, n, i, t), Cu(e, r)
  const o = i ? Uu(e, t) : void 0
  return t && gi(!1), o
}
function Uu(e, t) {
  const n = e.type
  ;(e.accessCache = Object.create(null)), (e.proxy = Bs(new Proxy(e.ctx, cu)))
  const { setup: r } = n
  if (r) {
    const i = (e.setupContext = r.length > 1 ? Gu(e) : null),
      o = Hn(e)
    Gt()
    const s = $t(r, e, 0, [e.props, i])
    if ((Zt(), o(), cs(s))) {
      if ((s.then(Oo, Oo), t))
        return s
          .then((l) => {
            Fo(e, l, t)
          })
          .catch((l) => {
            Er(l, e, 0)
          })
      e.asyncDep = s
    } else Fo(e, s, t)
  } else rl(e, t)
}
function Fo(e, t, n) {
  W(t) ? (e.type.__ssrInlineRender ? (e.ssrRender = t) : (e.render = t)) : ae(t) && (e.setupState = Os(t)), rl(e, n)
}
let Lo
function rl(e, t, n) {
  const r = e.type
  if (!e.render) {
    if (!t && Lo && !r.render) {
      const i = r.template || Ui(e).template
      if (i) {
        const { isCustomElement: o, compilerOptions: s } = e.appContext.config,
          { delimiters: l, compilerOptions: a } = r,
          c = xe(xe({ isCustomElement: o, delimiters: l }, s), a)
        r.render = Lo(i, c)
      }
    }
    e.render = r.render || Ze
  }
  {
    const i = Hn(e)
    Gt()
    try {
      du(e)
    } finally {
      Zt(), i()
    }
  }
}
function ju(e) {
  return (
    e.attrsProxy ||
    (e.attrsProxy = new Proxy(e.attrs, {
      get(t, n) {
        return Ie(e, 'get', '$attrs'), t[n]
      }
    }))
  )
}
function Gu(e) {
  const t = (n) => {
    e.exposed = n || {}
  }
  return {
    get attrs() {
      return ju(e)
    },
    slots: e.slots,
    emit: e.emit,
    expose: t
  }
}
function br(e) {
  if (e.exposed)
    return (
      e.exposeProxy ||
      (e.exposeProxy = new Proxy(Os(Bs(e.exposed)), {
        get(t, n) {
          if (n in t) return t[n]
          if (n in pn) return pn[n](e)
        },
        has(t, n) {
          return n in t || n in pn
        }
      }))
    )
}
function Zu(e) {
  return W(e) && '__vccOpts' in e
}
const Vu = (e, t) => ka(e, t, Ar)
function bn(e, t, n) {
  const r = arguments.length
  return r === 2
    ? ae(t) && !K(t)
      ? fi(t)
        ? Ve(e, null, [t])
        : Ve(e, t)
      : Ve(e, null, t)
    : (r > 3 ? (n = Array.prototype.slice.call(arguments, 2)) : r === 3 && fi(n) && (n = [n]), Ve(e, t, n))
}
const Ku = '3.4.18'
/**
 * @vue/runtime-dom v3.4.18
 * (c) 2018-present Yuxi (Evan) You and Vue contributors
 * @license MIT
 **/ const zu = 'http://www.w3.org/2000/svg',
  qu = 'http://www.w3.org/1998/Math/MathML',
  xt = typeof document < 'u' ? document : null,
  Io = xt && xt.createElement('template'),
  Wu = {
    insert: (e, t, n) => {
      t.insertBefore(e, n || null)
    },
    remove: (e) => {
      const t = e.parentNode
      t && t.removeChild(e)
    },
    createElement: (e, t, n, r) => {
      const i =
        t === 'svg'
          ? xt.createElementNS(zu, e)
          : t === 'mathml'
          ? xt.createElementNS(qu, e)
          : xt.createElement(e, n ? { is: n } : void 0)
      return e === 'select' && r && r.multiple != null && i.setAttribute('multiple', r.multiple), i
    },
    createText: (e) => xt.createTextNode(e),
    createComment: (e) => xt.createComment(e),
    setText: (e, t) => {
      e.nodeValue = t
    },
    setElementText: (e, t) => {
      e.textContent = t
    },
    parentNode: (e) => e.parentNode,
    nextSibling: (e) => e.nextSibling,
    querySelector: (e) => xt.querySelector(e),
    setScopeId(e, t) {
      e.setAttribute(t, '')
    },
    insertStaticContent(e, t, n, r, i, o) {
      const s = n ? n.previousSibling : t.lastChild
      if (i && (i === o || i.nextSibling))
        for (; t.insertBefore(i.cloneNode(!0), n), !(i === o || !(i = i.nextSibling)); );
      else {
        Io.innerHTML = r === 'svg' ? `<svg>${e}</svg>` : r === 'mathml' ? `<math>${e}</math>` : e
        const l = Io.content
        if (r === 'svg' || r === 'mathml') {
          const a = l.firstChild
          for (; a.firstChild; ) l.appendChild(a.firstChild)
          l.removeChild(a)
        }
        t.insertBefore(l, n)
      }
      return [s ? s.nextSibling : t.firstChild, n ? n.previousSibling : t.lastChild]
    }
  },
  Yu = Symbol('_vtc')
function Xu(e, t, n) {
  const r = e[Yu]
  r && (t = (t ? [t, ...r] : [...r]).join(' ')),
    t == null ? e.removeAttribute('class') : n ? e.setAttribute('class', t) : (e.className = t)
}
const Ro = Symbol('_vod'),
  Ju = Symbol(''),
  Qu = /(^|;)\s*display\s*:/
function ec(e, t, n) {
  const r = e.style,
    i = ye(n),
    o = r.display
  let s = !1
  if (n && !i) {
    if (t && !ye(t)) for (const l in t) n[l] == null && mi(r, l, '')
    for (const l in n) l === 'display' && (s = !0), mi(r, l, n[l])
  } else if (i) {
    if (t !== n) {
      const l = r[Ju]
      l && (n += ';' + l), (r.cssText = n), (s = Qu.test(n))
    }
  } else t && e.removeAttribute('style')
  Ro in e && ((e[Ro] = s ? r.display : ''), (r.display = o))
}
const Po = /\s*!important$/
function mi(e, t, n) {
  if (K(n)) n.forEach((r) => mi(e, t, r))
  else if ((n == null && (n = ''), t.startsWith('--'))) e.setProperty(t, n)
  else {
    const r = tc(e, t)
    Po.test(n) ? e.setProperty(cn(r), n.replace(Po, ''), 'important') : (e[r] = n)
  }
}
const No = ['Webkit', 'Moz', 'ms'],
  Gr = {}
function tc(e, t) {
  const n = Gr[t]
  if (n) return n
  let r = on(t)
  if (r !== 'filter' && r in e) return (Gr[t] = r)
  r = hs(r)
  for (let i = 0; i < No.length; i++) {
    const o = No[i] + r
    if (o in e) return (Gr[t] = o)
  }
  return t
}
const Ho = 'http://www.w3.org/1999/xlink'
function nc(e, t, n, r, i) {
  if (r && t.startsWith('xlink:'))
    n == null ? e.removeAttributeNS(Ho, t.slice(6, t.length)) : e.setAttributeNS(Ho, t, n)
  else {
    const o = sa(t)
    n == null || (o && !ms(n)) ? e.removeAttribute(t) : e.setAttribute(t, o ? '' : n)
  }
}
function rc(e, t, n, r, i, o, s) {
  if (t === 'innerHTML' || t === 'textContent') {
    r && s(r, i, o), (e[t] = n ?? '')
    return
  }
  const l = e.tagName
  if (t === 'value' && l !== 'PROGRESS' && !l.includes('-')) {
    e._value = n
    const c = l === 'OPTION' ? e.getAttribute('value') : e.value,
      u = n ?? ''
    c !== u && (e.value = u), n == null && e.removeAttribute(t)
    return
  }
  let a = !1
  if (n === '' || n == null) {
    const c = typeof e[t]
    c === 'boolean'
      ? (n = ms(n))
      : n == null && c === 'string'
      ? ((n = ''), (a = !0))
      : c === 'number' && ((n = 0), (a = !0))
  }
  try {
    e[t] = n
  } catch {}
  a && e.removeAttribute(t)
}
function il(e, t, n, r) {
  e.addEventListener(t, n, r)
}
function ic(e, t, n, r) {
  e.removeEventListener(t, n, r)
}
const Uo = Symbol('_vei')
function oc(e, t, n, r, i = null) {
  const o = e[Uo] || (e[Uo] = {}),
    s = o[t]
  if (r && s) s.value = r
  else {
    const [l, a] = sc(t)
    if (r) {
      const c = (o[t] = uc(r, i))
      il(e, l, c, a)
    } else s && (ic(e, l, s, a), (o[t] = void 0))
  }
}
const jo = /(?:Once|Passive|Capture)$/
function sc(e) {
  let t
  if (jo.test(e)) {
    t = {}
    let r
    for (; (r = e.match(jo)); ) (e = e.slice(0, e.length - r[0].length)), (t[r[0].toLowerCase()] = !0)
  }
  return [e[2] === ':' ? e.slice(3) : cn(e.slice(2)), t]
}
let Zr = 0
const lc = Promise.resolve(),
  ac = () => Zr || (lc.then(() => (Zr = 0)), (Zr = Date.now()))
function uc(e, t) {
  const n = (r) => {
    if (!r._vts) r._vts = Date.now()
    else if (r._vts <= n.attached) return
    Ye(cc(r, n.value), t, 5, [r])
  }
  return (n.value = e), (n.attached = ac()), n
}
function cc(e, t) {
  if (K(t)) {
    const n = e.stopImmediatePropagation
    return (
      (e.stopImmediatePropagation = () => {
        n.call(e), (e._stopped = !0)
      }),
      t.map((r) => (i) => !i._stopped && r && r(i))
    )
  } else return t
}
const Go = (e) => e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && e.charCodeAt(2) > 96 && e.charCodeAt(2) < 123,
  dc = (e, t, n, r, i, o, s, l, a) => {
    const c = i === 'svg'
    t === 'class'
      ? Xu(e, r, c)
      : t === 'style'
      ? ec(e, n, r)
      : gr(t)
      ? Ai(t) || oc(e, t, n, r, s)
      : (t[0] === '.' ? ((t = t.slice(1)), !0) : t[0] === '^' ? ((t = t.slice(1)), !1) : fc(e, t, r, c))
      ? rc(e, t, r, o, s, l, a)
      : (t === 'true-value' ? (e._trueValue = r) : t === 'false-value' && (e._falseValue = r), nc(e, t, r, c))
  }
function fc(e, t, n, r) {
  if (r) return !!(t === 'innerHTML' || t === 'textContent' || (t in e && Go(t) && W(n)))
  if (
    t === 'spellcheck' ||
    t === 'draggable' ||
    t === 'translate' ||
    t === 'form' ||
    (t === 'list' && e.tagName === 'INPUT') ||
    (t === 'type' && e.tagName === 'TEXTAREA')
  )
    return !1
  if (t === 'width' || t === 'height') {
    const i = e.tagName
    if (i === 'IMG' || i === 'VIDEO' || i === 'CANVAS' || i === 'SOURCE') return !1
  }
  return Go(t) && ye(n) ? !1 : t in e
}
const Zo = (e) => {
    const t = e.props['onUpdate:modelValue'] || !1
    return K(t) ? (n) => Jn(t, n) : t
  },
  Vr = Symbol('_assign'),
  vn = {
    deep: !0,
    created(e, { value: t, modifiers: { number: n } }, r) {
      const i = mr(t)
      il(e, 'change', () => {
        const o = Array.prototype.filter.call(e.options, (s) => s.selected).map((s) => (n ? Si(ur(s)) : ur(s)))
        e[Vr](e.multiple ? (i ? new Set(o) : o) : o[0]),
          (e._assigning = !0),
          Ls(() => {
            e._assigning = !1
          })
      }),
        (e[Vr] = Zo(r))
    },
    mounted(e, { value: t, oldValue: n, modifiers: { number: r } }) {
      Vo(e, t, n, r)
    },
    beforeUpdate(e, t, n) {
      e[Vr] = Zo(n)
    },
    updated(e, { value: t, oldValue: n, modifiers: { number: r } }) {
      e._assigning || Vo(e, t, n, r)
    }
  }
function Vo(e, t, n, r) {
  const i = e.multiple,
    o = K(t)
  if (!(i && !o && !mr(t))) {
    for (let s = 0, l = e.options.length; s < l; s++) {
      const a = e.options[s],
        c = ur(a)
      if (i)
        if (o) {
          const u = typeof c
          u === 'string' || u === 'number' ? (a.selected = t.includes(r ? Si(c) : c)) : (a.selected = aa(t, c) > -1)
        } else a.selected = t.has(c)
      else if (Dr(ur(a), t)) {
        e.selectedIndex !== s && (e.selectedIndex = s)
        return
      }
    }
    !i && e.selectedIndex !== -1 && (e.selectedIndex = -1)
  }
}
function ur(e) {
  return '_value' in e ? e._value : e.value
}
const hc = xe({ patchProp: dc }, Wu)
let Ko
function gc() {
  return Ko || (Ko = Au(hc))
}
const mc = (...e) => {
  const t = gc().createApp(...e),
    { mount: n } = t
  return (
    (t.mount = (r) => {
      const i = Dc(r)
      if (!i) return
      const o = t._component
      !W(o) && !o.render && !o.template && (o.template = i.innerHTML), (i.innerHTML = '')
      const s = n(i, !1, vc(i))
      return i instanceof Element && (i.removeAttribute('v-cloak'), i.setAttribute('data-v-app', '')), s
    }),
    t
  )
}
function vc(e) {
  if (e instanceof SVGElement) return 'svg'
  if (typeof MathMLElement == 'function' && e instanceof MathMLElement) return 'mathml'
}
function Dc(e) {
  return ye(e) ? document.querySelector(e) : e
}
const z = { context: void 0, registry: void 0 }
function vi(e) {
  z.context = e
}
function yc() {
  return { ...z.context, id: `${z.context.id}${z.context.count++}-`, count: 0 }
}
const Ec = (e, t) => e === t,
  Ce = Symbol('solid-proxy'),
  kn = Symbol('solid-track'),
  cr = { equals: Ec }
let ol = ul
const Et = 1,
  dr = 2,
  sl = { owned: null, cleanups: null, context: null, owner: null }
var se = null
let Kr = null,
  zo = null,
  fe = null,
  Te = null,
  ht = null,
  xr = 0
function rr(e, t) {
  const n = fe,
    r = se,
    i = e.length === 0,
    o = t === void 0 ? r : t,
    s = i ? sl : { owned: null, cleanups: null, context: o ? o.context : null, owner: o },
    l = i ? e : () => e(() => Be(() => Tr(s)))
  ;(se = s), (fe = null)
  try {
    return Vt(l, !0)
  } finally {
    ;(fe = n), (se = r)
  }
}
function he(e, t) {
  t = t ? Object.assign({}, cr, t) : cr
  const n = { value: e, observers: null, observerSlots: null, comparator: t.equals || void 0 },
    r = (i) => (typeof i == 'function' && (i = i(n.value)), al(n, i))
  return [ll.bind(n), r]
}
function wc(e, t, n) {
  const r = $r(e, t, !0, Et)
  dn(r)
}
function re(e, t, n) {
  const r = $r(e, t, !1, Et)
  dn(r)
}
function gt(e, t, n) {
  ol = Sc
  const r = $r(e, t, !1, Et)
  ;(!n || !n.render) && (r.user = !0), ht ? ht.push(r) : dn(r)
}
function Q(e, t, n) {
  n = n ? Object.assign({}, cr, n) : cr
  const r = $r(e, t, !0, 0)
  return (r.observers = null), (r.observerSlots = null), (r.comparator = n.equals || void 0), dn(r), ll.bind(r)
}
function it(e) {
  return Vt(e, !1)
}
function Be(e) {
  if (!zo && fe === null) return e()
  const t = fe
  fe = null
  try {
    return e()
  } finally {
    fe = t
  }
}
function On(e, t, n) {
  const r = Array.isArray(e)
  let i,
    o = n && n.defer
  return (s) => {
    let l
    if (r) {
      l = Array(e.length)
      for (let c = 0; c < e.length; c++) l[c] = e[c]()
    } else l = e()
    if (o) {
      o = !1
      return
    }
    const a = Be(() => t(l, i, s))
    return (i = l), a
  }
}
function Ot(e) {
  gt(() => Be(e))
}
function st(e) {
  return se === null || (se.cleanups === null ? (se.cleanups = [e]) : se.cleanups.push(e)), e
}
function Fn() {
  return fe
}
function pc(e) {
  const t = fe,
    n = se
  return Promise.resolve().then(() => {
    ;(fe = t), (se = n)
    let r
    return Vt(e, !1), (fe = se = null), r ? r.done : void 0
  })
}
const [Cc, gm] = he(!1)
function _c() {
  return [Cc, pc]
}
function Vi(e, t) {
  const n = Symbol('context')
  return { id: n, Provider: Tc(n), defaultValue: e }
}
function Sr(e) {
  return se && se.context && se.context[e.id] !== void 0 ? se.context[e.id] : e.defaultValue
}
function Ac(e) {
  const t = Q(e),
    n = Q(() => Di(t()))
  return (
    (n.toArray = () => {
      const r = n()
      return Array.isArray(r) ? r : r != null ? [r] : []
    }),
    n
  )
}
function ll() {
  if (this.sources && this.state)
    if (this.state === Et) dn(this)
    else {
      const e = Te
      ;(Te = null), Vt(() => hr(this), !1), (Te = e)
    }
  if (fe) {
    const e = this.observers ? this.observers.length : 0
    fe.sources ? (fe.sources.push(this), fe.sourceSlots.push(e)) : ((fe.sources = [this]), (fe.sourceSlots = [e])),
      this.observers
        ? (this.observers.push(fe), this.observerSlots.push(fe.sources.length - 1))
        : ((this.observers = [fe]), (this.observerSlots = [fe.sources.length - 1]))
  }
  return this.value
}
function al(e, t, n) {
  let r = e.value
  return (
    (!e.comparator || !e.comparator(r, t)) &&
      ((e.value = t),
      e.observers &&
        e.observers.length &&
        Vt(() => {
          for (let i = 0; i < e.observers.length; i += 1) {
            const o = e.observers[i],
              s = Kr && Kr.running
            s && Kr.disposed.has(o),
              (s ? !o.tState : !o.state) && (o.pure ? Te.push(o) : ht.push(o), o.observers && cl(o)),
              s || (o.state = Et)
          }
          if (Te.length > 1e6) throw ((Te = []), new Error())
        }, !1)),
    t
  )
}
function dn(e) {
  if (!e.fn) return
  Tr(e)
  const t = xr
  bc(e, e.value, t)
}
function bc(e, t, n) {
  let r
  const i = se,
    o = fe
  fe = se = e
  try {
    r = e.fn(t)
  } catch (s) {
    return e.pure && ((e.state = Et), e.owned && e.owned.forEach(Tr), (e.owned = null)), (e.updatedAt = n + 1), dl(s)
  } finally {
    ;(fe = o), (se = i)
  }
  ;(!e.updatedAt || e.updatedAt <= n) &&
    (e.updatedAt != null && 'observers' in e ? al(e, r) : (e.value = r), (e.updatedAt = n))
}
function $r(e, t, n, r = Et, i) {
  const o = {
    fn: e,
    state: r,
    updatedAt: null,
    owned: null,
    sources: null,
    sourceSlots: null,
    cleanups: null,
    value: t,
    owner: se,
    context: se ? se.context : null,
    pure: n
  }
  return se === null || (se !== sl && (se.owned ? se.owned.push(o) : (se.owned = [o]))), o
}
function fr(e) {
  if (e.state === 0) return
  if (e.state === dr) return hr(e)
  if (e.suspense && Be(e.suspense.inFallback)) return e.suspense.effects.push(e)
  const t = [e]
  for (; (e = e.owner) && (!e.updatedAt || e.updatedAt < xr); ) e.state && t.push(e)
  for (let n = t.length - 1; n >= 0; n--)
    if (((e = t[n]), e.state === Et)) dn(e)
    else if (e.state === dr) {
      const r = Te
      ;(Te = null), Vt(() => hr(e, t[0]), !1), (Te = r)
    }
}
function Vt(e, t) {
  if (Te) return e()
  let n = !1
  t || (Te = []), ht ? (n = !0) : (ht = []), xr++
  try {
    const r = e()
    return xc(n), r
  } catch (r) {
    n || (ht = null), (Te = null), dl(r)
  }
}
function xc(e) {
  if ((Te && (ul(Te), (Te = null)), e)) return
  const t = ht
  ;(ht = null), t.length && Vt(() => ol(t), !1)
}
function ul(e) {
  for (let t = 0; t < e.length; t++) fr(e[t])
}
function Sc(e) {
  let t,
    n = 0
  for (t = 0; t < e.length; t++) {
    const r = e[t]
    r.user ? (e[n++] = r) : fr(r)
  }
  if (z.context) {
    if (z.count) {
      z.effects || (z.effects = []), z.effects.push(...e.slice(0, n))
      return
    } else z.effects && ((e = [...z.effects, ...e]), (n += z.effects.length), delete z.effects)
    vi()
  }
  for (t = 0; t < n; t++) fr(e[t])
}
function hr(e, t) {
  e.state = 0
  for (let n = 0; n < e.sources.length; n += 1) {
    const r = e.sources[n]
    if (r.sources) {
      const i = r.state
      i === Et ? r !== t && (!r.updatedAt || r.updatedAt < xr) && fr(r) : i === dr && hr(r, t)
    }
  }
}
function cl(e) {
  for (let t = 0; t < e.observers.length; t += 1) {
    const n = e.observers[t]
    n.state || ((n.state = dr), n.pure ? Te.push(n) : ht.push(n), n.observers && cl(n))
  }
}
function Tr(e) {
  let t
  if (e.sources)
    for (; e.sources.length; ) {
      const n = e.sources.pop(),
        r = e.sourceSlots.pop(),
        i = n.observers
      if (i && i.length) {
        const o = i.pop(),
          s = n.observerSlots.pop()
        r < i.length && ((o.sourceSlots[s] = r), (i[r] = o), (n.observerSlots[r] = s))
      }
    }
  if (e.owned) {
    for (t = e.owned.length - 1; t >= 0; t--) Tr(e.owned[t])
    e.owned = null
  }
  if (e.cleanups) {
    for (t = e.cleanups.length - 1; t >= 0; t--) e.cleanups[t]()
    e.cleanups = null
  }
  e.state = 0
}
function $c(e) {
  return e instanceof Error ? e : new Error(typeof e == 'string' ? e : 'Unknown error', { cause: e })
}
function dl(e, t = se) {
  throw $c(e)
}
function Di(e) {
  if (typeof e == 'function' && !e.length) return Di(e())
  if (Array.isArray(e)) {
    const t = []
    for (let n = 0; n < e.length; n++) {
      const r = Di(e[n])
      Array.isArray(r) ? t.push.apply(t, r) : t.push(r)
    }
    return t
  }
  return e
}
function Tc(e, t) {
  return function (r) {
    let i
    return re(() => (i = Be(() => ((se.context = { ...se.context, [e]: r.value }), Ac(() => r.children)))), void 0), i
  }
}
const Bc = Symbol('fallback')
function qo(e) {
  for (let t = 0; t < e.length; t++) e[t]()
}
function fl(e, t, n = {}) {
  let r = [],
    i = [],
    o = [],
    s = 0,
    l = t.length > 1 ? [] : null
  return (
    st(() => qo(o)),
    () => {
      let a = e() || [],
        c,
        u
      return (
        a[kn],
        Be(() => {
          let d = a.length,
            g,
            D,
            v,
            w,
            S,
            M,
            F,
            E,
            U
          if (d === 0)
            s !== 0 && (qo(o), (o = []), (r = []), (i = []), (s = 0), l && (l = [])),
              n.fallback && ((r = [Bc]), (i[0] = rr((R) => ((o[0] = R), n.fallback()))), (s = 1))
          else if (s === 0) {
            for (i = new Array(d), u = 0; u < d; u++) (r[u] = a[u]), (i[u] = rr(f))
            s = d
          } else {
            for (
              v = new Array(d), w = new Array(d), l && (S = new Array(d)), M = 0, F = Math.min(s, d);
              M < F && r[M] === a[M];
              M++
            );
            for (F = s - 1, E = d - 1; F >= M && E >= M && r[F] === a[E]; F--, E--)
              (v[E] = i[F]), (w[E] = o[F]), l && (S[E] = l[F])
            for (g = new Map(), D = new Array(E + 1), u = E; u >= M; u--)
              (U = a[u]), (c = g.get(U)), (D[u] = c === void 0 ? -1 : c), g.set(U, u)
            for (c = M; c <= F; c++)
              (U = r[c]),
                (u = g.get(U)),
                u !== void 0 && u !== -1
                  ? ((v[u] = i[c]), (w[u] = o[c]), l && (S[u] = l[c]), (u = D[u]), g.set(U, u))
                  : o[c]()
            for (u = M; u < d; u++)
              u in v ? ((i[u] = v[u]), (o[u] = w[u]), l && ((l[u] = S[u]), l[u](u))) : (i[u] = rr(f))
            ;(i = i.slice(0, (s = d))), (r = a.slice(0))
          }
          return i
        })
      )
      function f(d) {
        if (((o[u] = d), l)) {
          const [g, D] = he(u)
          return (l[u] = D), t(a[u], g)
        }
        return t(a[u])
      }
    }
  )
}
let hl = !1
function Mc() {
  hl = !0
}
function $(e, t) {
  if (hl && z.context) {
    const n = z.context
    vi(yc())
    const r = Be(() => e(t || {}))
    return vi(n), r
  }
  return Be(() => e(t || {}))
}
function Wn() {
  return !0
}
const yi = {
  get(e, t, n) {
    return t === Ce ? n : e.get(t)
  },
  has(e, t) {
    return t === Ce ? !0 : e.has(t)
  },
  set: Wn,
  deleteProperty: Wn,
  getOwnPropertyDescriptor(e, t) {
    return {
      configurable: !0,
      enumerable: !0,
      get() {
        return e.get(t)
      },
      set: Wn,
      deleteProperty: Wn
    }
  },
  ownKeys(e) {
    return e.keys()
  }
}
function zr(e) {
  return (e = typeof e == 'function' ? e() : e) ? e : {}
}
function kc() {
  for (let e = 0, t = this.length; e < t; ++e) {
    const n = this[e]()
    if (n !== void 0) return n
  }
}
function mt(...e) {
  let t = !1
  for (let s = 0; s < e.length; s++) {
    const l = e[s]
    ;(t = t || (!!l && Ce in l)), (e[s] = typeof l == 'function' ? ((t = !0), Q(l)) : l)
  }
  if (t)
    return new Proxy(
      {
        get(s) {
          for (let l = e.length - 1; l >= 0; l--) {
            const a = zr(e[l])[s]
            if (a !== void 0) return a
          }
        },
        has(s) {
          for (let l = e.length - 1; l >= 0; l--) if (s in zr(e[l])) return !0
          return !1
        },
        keys() {
          const s = []
          for (let l = 0; l < e.length; l++) s.push(...Object.keys(zr(e[l])))
          return [...new Set(s)]
        }
      },
      yi
    )
  const n = {},
    r = Object.create(null)
  for (let s = e.length - 1; s >= 0; s--) {
    const l = e[s]
    if (!l) continue
    const a = Object.getOwnPropertyNames(l)
    for (let c = a.length - 1; c >= 0; c--) {
      const u = a[c]
      if (u === '__proto__' || u === 'constructor') continue
      const f = Object.getOwnPropertyDescriptor(l, u)
      if (!r[u])
        r[u] = f.get
          ? { enumerable: !0, configurable: !0, get: kc.bind((n[u] = [f.get.bind(l)])) }
          : f.value !== void 0
          ? f
          : void 0
      else {
        const d = n[u]
        d && (f.get ? d.push(f.get.bind(l)) : f.value !== void 0 && d.push(() => f.value))
      }
    }
  }
  const i = {},
    o = Object.keys(r)
  for (let s = o.length - 1; s >= 0; s--) {
    const l = o[s],
      a = r[l]
    a && a.get ? Object.defineProperty(i, l, a) : (i[l] = a ? a.value : void 0)
  }
  return i
}
function Oc(e, ...t) {
  if (Ce in e) {
    const i = new Set(t.length > 1 ? t.flat() : t[0]),
      o = t.map(
        (s) =>
          new Proxy(
            {
              get(l) {
                return s.includes(l) ? e[l] : void 0
              },
              has(l) {
                return s.includes(l) && l in e
              },
              keys() {
                return s.filter((l) => l in e)
              }
            },
            yi
          )
      )
    return (
      o.push(
        new Proxy(
          {
            get(s) {
              return i.has(s) ? void 0 : e[s]
            },
            has(s) {
              return i.has(s) ? !1 : s in e
            },
            keys() {
              return Object.keys(e).filter((s) => !i.has(s))
            }
          },
          yi
        )
      ),
      o
    )
  }
  const n = {},
    r = t.map(() => ({}))
  for (const i of Object.getOwnPropertyNames(e)) {
    const o = Object.getOwnPropertyDescriptor(e, i),
      s = !o.get && !o.set && o.enumerable && o.writable && o.configurable
    let l = !1,
      a = 0
    for (const c of t) c.includes(i) && ((l = !0), s ? (r[a][i] = o.value) : Object.defineProperty(r[a], i, o)), ++a
    l || (s ? (n[i] = o.value) : Object.defineProperty(n, i, o))
  }
  return [...r, n]
}
let Fc = 0
function Ln() {
  const e = z.context
  return e ? `${e.id}${e.count++}` : `cl-${Fc++}`
}
const Lc = (e) => `Stale read from <${e}>.`
function ve(e) {
  const t = 'fallback' in e && { fallback: () => e.fallback }
  return Q(fl(() => e.each, e.children, t || void 0))
}
function ge(e) {
  const t = e.keyed,
    n = Q(() => e.when, void 0, { equals: (r, i) => (t ? r === i : !r == !i) })
  return Q(
    () => {
      const r = n()
      if (r) {
        const i = e.children
        return typeof i == 'function' && i.length > 0
          ? Be(() =>
              i(
                t
                  ? r
                  : () => {
                      if (!Be(n)) throw Lc('Show')
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
const Ic = [
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
  Rc = new Set(['className', 'value', 'readOnly', 'formNoValidate', 'isMap', 'noModule', 'playsInline', ...Ic]),
  Pc = new Set(['innerHTML', 'textContent', 'innerText', 'children']),
  Nc = Object.assign(Object.create(null), { className: 'class', htmlFor: 'for' }),
  Hc = Object.assign(Object.create(null), {
    class: 'className',
    formnovalidate: { $: 'formNoValidate', BUTTON: 1, INPUT: 1 },
    ismap: { $: 'isMap', IMG: 1 },
    nomodule: { $: 'noModule', SCRIPT: 1 },
    playsinline: { $: 'playsInline', VIDEO: 1 },
    readonly: { $: 'readOnly', INPUT: 1, TEXTAREA: 1 }
  })
function Uc(e, t) {
  const n = Hc[e]
  return typeof n == 'object' ? (n[t] ? n.$ : void 0) : n
}
const jc = new Set([
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
  Gc = new Set([
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
  Zc = { xlink: 'http://www.w3.org/1999/xlink', xml: 'http://www.w3.org/XML/1998/namespace' }
function Vc(e, t, n) {
  let r = n.length,
    i = t.length,
    o = r,
    s = 0,
    l = 0,
    a = t[i - 1].nextSibling,
    c = null
  for (; s < i || l < o; ) {
    if (t[s] === n[l]) {
      s++, l++
      continue
    }
    for (; t[i - 1] === n[o - 1]; ) i--, o--
    if (i === s) {
      const u = o < r ? (l ? n[l - 1].nextSibling : n[o - l]) : a
      for (; l < o; ) e.insertBefore(n[l++], u)
    } else if (o === l) for (; s < i; ) (!c || !c.has(t[s])) && t[s].remove(), s++
    else if (t[s] === n[o - 1] && n[l] === t[i - 1]) {
      const u = t[--i].nextSibling
      e.insertBefore(n[l++], t[s++].nextSibling), e.insertBefore(n[--o], u), (t[i] = n[o])
    } else {
      if (!c) {
        c = new Map()
        let f = l
        for (; f < o; ) c.set(n[f], f++)
      }
      const u = c.get(t[s])
      if (u != null)
        if (l < u && u < o) {
          let f = s,
            d = 1,
            g
          for (; ++f < i && f < o && !((g = c.get(t[f])) == null || g !== u + d); ) d++
          if (d > u - l) {
            const D = t[s]
            for (; l < u; ) e.insertBefore(n[l++], D)
          } else e.replaceChild(n[l++], t[s++])
        } else s++
      else t[s++].remove()
    }
  }
}
const Wo = '_$DX_DELEGATE'
function gl(e, t, n, r = {}) {
  let i
  return (
    rr((o) => {
      ;(i = o), t === document ? e() : x(t, e(), t.firstChild ? null : void 0, n)
    }, r.owner),
    () => {
      i(), (t.textContent = '')
    }
  )
}
function P(e, t, n) {
  let r
  const i = () => {
      const s = document.createElement('template')
      return (s.innerHTML = e), n ? s.content.firstChild.firstChild : s.content.firstChild
    },
    o = t ? () => Be(() => document.importNode(r || (r = i()), !0)) : () => (r || (r = i())).cloneNode(!0)
  return (o.cloneNode = o), o
}
function Oe(e, t = window.document) {
  const n = t[Wo] || (t[Wo] = new Set())
  for (let r = 0, i = e.length; r < i; r++) {
    const o = e[r]
    n.has(o) || (n.add(o), t.addEventListener(o, Qc))
  }
}
function be(e, t, n) {
  z.context || (n == null ? e.removeAttribute(t) : e.setAttribute(t, n))
}
function Kc(e, t, n, r) {
  z.context || (r == null ? e.removeAttributeNS(t, n) : e.setAttributeNS(t, n, r))
}
function lt(e, t) {
  z.context || (t == null ? e.removeAttribute('class') : (e.className = t))
}
function Ki(e, t, n, r) {
  if (r) Array.isArray(n) ? ((e[`$$${t}`] = n[0]), (e[`$$${t}Data`] = n[1])) : (e[`$$${t}`] = n)
  else if (Array.isArray(n)) {
    const i = n[0]
    e.addEventListener(t, (n[0] = (o) => i.call(e, n[1], o)))
  } else e.addEventListener(t, n)
}
function zc(e, t, n = {}) {
  const r = Object.keys(t || {}),
    i = Object.keys(n)
  let o, s
  for (o = 0, s = i.length; o < s; o++) {
    const l = i[o]
    !l || l === 'undefined' || t[l] || (Yo(e, l, !1), delete n[l])
  }
  for (o = 0, s = r.length; o < s; o++) {
    const l = r[o],
      a = !!t[l]
    !l || l === 'undefined' || n[l] === a || !a || (Yo(e, l, !0), (n[l] = a))
  }
  return n
}
function Ae(e, t, n) {
  if (!t) return n ? be(e, 'style') : t
  const r = e.style
  if (typeof t == 'string') return (r.cssText = t)
  typeof n == 'string' && (r.cssText = n = void 0), n || (n = {}), t || (t = {})
  let i, o
  for (o in n) t[o] == null && r.removeProperty(o), delete n[o]
  for (o in t) (i = t[o]), i !== n[o] && (r.setProperty(o, i), (n[o] = i))
  return n
}
function qc(e, t = {}, n, r) {
  const i = {}
  return (
    r || re(() => (i.children = an(e, t.children, i.children))),
    re(() => t.ref && t.ref(e)),
    re(() => Wc(e, t, n, !0, i, !0)),
    i
  )
}
function me(e, t, n) {
  return Be(() => e(t, n))
}
function x(e, t, n, r) {
  if ((n !== void 0 && !r && (r = []), typeof t != 'function')) return an(e, t, r, n)
  re((i) => an(e, t(), i, n), r)
}
function Wc(e, t, n, r, i = {}, o = !1) {
  t || (t = {})
  for (const s in i)
    if (!(s in t)) {
      if (s === 'children') continue
      i[s] = Xo(e, s, null, i[s], n, o)
    }
  for (const s in t) {
    if (s === 'children') {
      r || an(e, t.children)
      continue
    }
    const l = t[s]
    i[s] = Xo(e, s, l, i[s], n, o)
  }
}
function Yc(e, t, n = {}) {
  ;(z.completed = globalThis._$HY.completed),
    (z.events = globalThis._$HY.events),
    (z.load = (i) => globalThis._$HY.r[i]),
    (z.has = (i) => i in globalThis._$HY.r),
    (z.gather = (i) => Qo(t, i)),
    (z.registry = new Map()),
    (z.context = { id: n.renderId || '', count: 0 }),
    Qo(t, n.renderId)
  const r = gl(e, t, [...t.childNodes], n)
  return (z.context = null), r
}
function Xc(e) {
  let t, n
  return !z.context || !(t = z.registry.get((n = ed())))
    ? e()
    : (z.completed && z.completed.add(t), z.registry.delete(n), t)
}
function Jc(e) {
  return e.toLowerCase().replace(/-([a-z])/g, (t, n) => n.toUpperCase())
}
function Yo(e, t, n) {
  const r = t.trim().split(/\s+/)
  for (let i = 0, o = r.length; i < o; i++) e.classList.toggle(r[i], n)
}
function Xo(e, t, n, r, i, o) {
  let s, l, a, c, u
  if (t === 'style') return Ae(e, n, r)
  if (t === 'classList') return zc(e, n, r)
  if (n === r) return r
  if (t === 'ref') o || n(e)
  else if (t.slice(0, 3) === 'on:') {
    const f = t.slice(3)
    r && e.removeEventListener(f, r), n && e.addEventListener(f, n)
  } else if (t.slice(0, 10) === 'oncapture:') {
    const f = t.slice(10)
    r && e.removeEventListener(f, r, !0), n && e.addEventListener(f, n, !0)
  } else if (t.slice(0, 2) === 'on') {
    const f = t.slice(2).toLowerCase(),
      d = jc.has(f)
    if (!d && r) {
      const g = Array.isArray(r) ? r[0] : r
      e.removeEventListener(f, g)
    }
    ;(d || n) && (Ki(e, f, n, d), d && Oe([f]))
  } else if (t.slice(0, 5) === 'attr:') be(e, t.slice(5), n)
  else if (
    (u = t.slice(0, 5) === 'prop:') ||
    (a = Pc.has(t)) ||
    (!i && ((c = Uc(t, e.tagName)) || (l = Rc.has(t)))) ||
    (s = e.nodeName.includes('-'))
  ) {
    if (u) (t = t.slice(5)), (l = !0)
    else if (z.context) return n
    t === 'class' || t === 'className' ? lt(e, n) : s && !l && !a ? (e[Jc(t)] = n) : (e[c || t] = n)
  } else {
    const f = i && t.indexOf(':') > -1 && Zc[t.split(':')[0]]
    f ? Kc(e, f, t, n) : be(e, Nc[t] || t, n)
  }
  return n
}
function Qc(e) {
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
      z.registry && !z.done && (z.done = _$HY.done = !0);
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
function an(e, t, n, r, i) {
  if (z.context) {
    !n && (n = [...e.childNodes])
    let l = []
    for (let a = 0; a < n.length; a++) {
      const c = n[a]
      c.nodeType === 8 && c.data.slice(0, 2) === '!$' ? c.remove() : l.push(c)
    }
    n = l
  }
  for (; typeof n == 'function'; ) n = n()
  if (t === n) return n
  const o = typeof t,
    s = r !== void 0
  if (((e = (s && n[0] && n[0].parentNode) || e), o === 'string' || o === 'number')) {
    if (z.context) return n
    if ((o === 'number' && (t = t.toString()), s)) {
      let l = n[0]
      l && l.nodeType === 3 ? l.data !== t && (l.data = t) : (l = document.createTextNode(t)), (n = Wt(e, n, r, l))
    } else n !== '' && typeof n == 'string' ? (n = e.firstChild.data = t) : (n = e.textContent = t)
  } else if (t == null || o === 'boolean') {
    if (z.context) return n
    n = Wt(e, n, r)
  } else {
    if (o === 'function')
      return (
        re(() => {
          let l = t()
          for (; typeof l == 'function'; ) l = l()
          n = an(e, l, n, r)
        }),
        () => n
      )
    if (Array.isArray(t)) {
      const l = [],
        a = n && Array.isArray(n)
      if (Ei(l, t, n, i)) return re(() => (n = an(e, l, n, r, !0))), () => n
      if (z.context) {
        if (!l.length) return n
        if (r === void 0) return [...e.childNodes]
        let c = l[0],
          u = [c]
        for (; (c = c.nextSibling) !== r; ) u.push(c)
        return (n = u)
      }
      if (l.length === 0) {
        if (((n = Wt(e, n, r)), s)) return n
      } else a ? (n.length === 0 ? Jo(e, l, r) : Vc(e, n, l)) : (n && Wt(e), Jo(e, l))
      n = l
    } else if (t.nodeType) {
      if (z.context && t.parentNode) return (n = s ? [t] : t)
      if (Array.isArray(n)) {
        if (s) return (n = Wt(e, n, r, t))
        Wt(e, n, null, t)
      } else n == null || n === '' || !e.firstChild ? e.appendChild(t) : e.replaceChild(t, e.firstChild)
      n = t
    }
  }
  return n
}
function Ei(e, t, n, r) {
  let i = !1
  for (let o = 0, s = t.length; o < s; o++) {
    let l = t[o],
      a = n && n[o],
      c
    if (!(l == null || l === !0 || l === !1))
      if ((c = typeof l) == 'object' && l.nodeType) e.push(l)
      else if (Array.isArray(l)) i = Ei(e, l, a) || i
      else if (c === 'function')
        if (r) {
          for (; typeof l == 'function'; ) l = l()
          i = Ei(e, Array.isArray(l) ? l : [l], Array.isArray(a) ? a : [a]) || i
        } else e.push(l), (i = !0)
      else {
        const u = String(l)
        a && a.nodeType === 3 && a.data === u ? e.push(a) : e.push(document.createTextNode(u))
      }
  }
  return i
}
function Jo(e, t, n = null) {
  for (let r = 0, i = t.length; r < i; r++) e.insertBefore(t[r], n)
}
function Wt(e, t, n, r) {
  if (n === void 0) return (e.textContent = '')
  const i = r || document.createTextNode('')
  if (t.length) {
    let o = !1
    for (let s = t.length - 1; s >= 0; s--) {
      const l = t[s]
      if (i !== l) {
        const a = l.parentNode === e
        !o && !s ? (a ? e.replaceChild(i, l) : e.insertBefore(i, n)) : a && l.remove()
      } else o = !0
    }
  } else e.insertBefore(i, n)
  return [i]
}
function Qo(e, t) {
  const n = e.querySelectorAll('*[data-hk]')
  for (let r = 0; r < n.length; r++) {
    const i = n[r],
      o = i.getAttribute('data-hk')
    ;(!t || o.startsWith(t)) && !z.registry.has(o) && z.registry.set(o, i)
  }
}
function ed() {
  const e = z.context
  return `${e.id}${e.count++}`
}
const td = 'http://www.w3.org/2000/svg'
function nd(e, t = !1) {
  return t ? document.createElementNS(td, e) : document.createElement(e)
}
const rd = (...e) => (Mc(), Yc(...e))
function ml(e) {
  const [t, n] = Oc(e, ['component']),
    r = Q(() => t.component)
  return Q(() => {
    const i = r()
    switch (typeof i) {
      case 'function':
        return Be(() => i(n))
      case 'string':
        const o = Gc.has(i),
          s = z.context ? Xc() : nd(i, o)
        return qc(s, n, o), s
    }
  })
}
const In = Symbol('store-raw'),
  ot = Symbol('store-node'),
  Ge = Symbol('store-has'),
  vl = Symbol('store-self')
function Dl(e) {
  let t = e[Ce]
  if (!t && (Object.defineProperty(e, Ce, { value: (t = new Proxy(e, od)) }), !Array.isArray(e))) {
    const n = Object.keys(e),
      r = Object.getOwnPropertyDescriptors(e)
    for (let i = 0, o = n.length; i < o; i++) {
      const s = n[i]
      r[s].get && Object.defineProperty(e, s, { enumerable: r[s].enumerable, get: r[s].get.bind(t) })
    }
  }
  return t
}
function vt(e) {
  let t
  return (
    e != null &&
    typeof e == 'object' &&
    (e[Ce] || !(t = Object.getPrototypeOf(e)) || t === Object.prototype || Array.isArray(e))
  )
}
function Mt(e, t = new Set()) {
  let n, r, i, o
  if ((n = e != null && e[In])) return n
  if (!vt(e) || t.has(e)) return e
  if (Array.isArray(e)) {
    Object.isFrozen(e) ? (e = e.slice(0)) : t.add(e)
    for (let s = 0, l = e.length; s < l; s++) (i = e[s]), (r = Mt(i, t)) !== i && (e[s] = r)
  } else {
    Object.isFrozen(e) ? (e = Object.assign({}, e)) : t.add(e)
    const s = Object.keys(e),
      l = Object.getOwnPropertyDescriptors(e)
    for (let a = 0, c = s.length; a < c; a++) (o = s[a]), !l[o].get && ((i = e[o]), (r = Mt(i, t)) !== i && (e[o] = r))
  }
  return e
}
function un(e, t) {
  let n = e[t]
  return n || Object.defineProperty(e, t, { value: (n = Object.create(null)) }), n
}
function jt(e, t, n) {
  if (e[t]) return e[t]
  const [r, i] = he(n, { equals: !1, internal: !0 })
  return (r.$ = i), (e[t] = r)
}
function id(e, t) {
  const n = Reflect.getOwnPropertyDescriptor(e, t)
  return (
    !n ||
      n.get ||
      !n.configurable ||
      t === Ce ||
      t === ot ||
      (delete n.value, delete n.writable, (n.get = () => e[Ce][t])),
    n
  )
}
function zi(e) {
  Fn() && jt(un(e, ot), vl)()
}
function yl(e) {
  return zi(e), Reflect.ownKeys(e)
}
const od = {
  get(e, t, n) {
    if (t === In) return e
    if (t === Ce) return n
    if (t === kn) return zi(e), n
    const r = un(e, ot),
      i = r[t]
    let o = i ? i() : e[t]
    if (t === ot || t === Ge || t === '__proto__') return o
    if (!i) {
      const s = Object.getOwnPropertyDescriptor(e, t)
      Fn() && (typeof o != 'function' || e.hasOwnProperty(t)) && !(s && s.get) && (o = jt(r, t, o)())
    }
    return vt(o) ? Dl(o) : o
  },
  has(e, t) {
    return t === In || t === Ce || t === kn || t === ot || t === Ge || t === '__proto__'
      ? !0
      : (Fn() && jt(un(e, Ge), t)(), t in e)
  },
  set() {
    return !0
  },
  deleteProperty() {
    return !0
  },
  ownKeys: yl,
  getOwnPropertyDescriptor: id
}
function Le(e, t, n, r = !1) {
  if (!r && e[t] === n) return
  const i = e[t],
    o = e.length
  n === void 0
    ? (delete e[t], e[Ge] && e[Ge][t] && i !== void 0 && e[Ge][t].$())
    : ((e[t] = n), e[Ge] && e[Ge][t] && i === void 0 && e[Ge][t].$())
  let s = un(e, ot),
    l
  if (((l = jt(s, t, i)) && l.$(() => n), Array.isArray(e) && e.length !== o)) {
    for (let a = e.length; a < o; a++) (l = s[a]) && l.$()
    ;(l = jt(s, 'length', o)) && l.$(e.length)
  }
  ;(l = s[vl]) && l.$()
}
function El(e, t) {
  const n = Object.keys(t)
  for (let r = 0; r < n.length; r += 1) {
    const i = n[r]
    Le(e, i, t[i])
  }
}
function sd(e, t) {
  if ((typeof t == 'function' && (t = t(e)), (t = Mt(t)), Array.isArray(t))) {
    if (e === t) return
    let n = 0,
      r = t.length
    for (; n < r; n++) {
      const i = t[n]
      e[n] !== i && Le(e, n, i)
    }
    Le(e, 'length', r)
  } else El(e, t)
}
function yn(e, t, n = []) {
  let r,
    i = e
  if (t.length > 1) {
    r = t.shift()
    const s = typeof r,
      l = Array.isArray(e)
    if (Array.isArray(r)) {
      for (let a = 0; a < r.length; a++) yn(e, [r[a]].concat(t), n)
      return
    } else if (l && s === 'function') {
      for (let a = 0; a < e.length; a++) r(e[a], a) && yn(e, [a].concat(t), n)
      return
    } else if (l && s === 'object') {
      const { from: a = 0, to: c = e.length - 1, by: u = 1 } = r
      for (let f = a; f <= c; f += u) yn(e, [f].concat(t), n)
      return
    } else if (t.length > 1) {
      yn(e[r], t, [r].concat(n))
      return
    }
    ;(i = e[r]), (n = [r].concat(n))
  }
  let o = t[0]
  ;(typeof o == 'function' && ((o = o(i, n)), o === i)) ||
    (r === void 0 && o == null) ||
    ((o = Mt(o)), r === void 0 || (vt(i) && vt(o) && !Array.isArray(o)) ? El(i, o) : Le(e, r, o))
}
function ld(...[e, t]) {
  const n = Mt(e || {}),
    r = Array.isArray(n),
    i = Dl(n)
  function o(...s) {
    it(() => {
      r && s.length === 1 ? sd(n, s[0]) : yn(n, s)
    })
  }
  return [i, o]
}
function ad(e, t) {
  const n = Reflect.getOwnPropertyDescriptor(e, t)
  return (
    !n ||
      n.get ||
      n.set ||
      !n.configurable ||
      t === Ce ||
      t === ot ||
      (delete n.value, delete n.writable, (n.get = () => e[Ce][t]), (n.set = (r) => (e[Ce][t] = r))),
    n
  )
}
const ud = {
  get(e, t, n) {
    if (t === In) return e
    if (t === Ce) return n
    if (t === kn) return zi(e), n
    const r = un(e, ot),
      i = r[t]
    let o = i ? i() : e[t]
    if (t === ot || t === Ge || t === '__proto__') return o
    if (!i) {
      const s = Object.getOwnPropertyDescriptor(e, t),
        l = typeof o == 'function'
      if (Fn() && (!l || e.hasOwnProperty(t)) && !(s && s.get)) o = jt(r, t, o)()
      else if (o != null && l && o === Array.prototype[t]) return (...a) => it(() => Array.prototype[t].apply(n, a))
    }
    return vt(o) ? wl(o) : o
  },
  has(e, t) {
    return t === In || t === Ce || t === kn || t === ot || t === Ge || t === '__proto__'
      ? !0
      : (Fn() && jt(un(e, Ge), t)(), t in e)
  },
  set(e, t, n) {
    return it(() => Le(e, t, Mt(n))), !0
  },
  deleteProperty(e, t) {
    return it(() => Le(e, t, void 0, !0)), !0
  },
  ownKeys: yl,
  getOwnPropertyDescriptor: ad
}
function wl(e) {
  let t = e[Ce]
  if (!t) {
    Object.defineProperty(e, Ce, { value: (t = new Proxy(e, ud)) })
    const n = Object.keys(e),
      r = Object.getOwnPropertyDescriptors(e),
      i = Object.getPrototypeOf(e),
      o = e !== null && typeof e == 'object' && !Array.isArray(e) && i !== Object.prototype
    if (o) {
      const s = Object.getOwnPropertyDescriptors(i)
      n.push(...Object.keys(s)), Object.assign(r, s)
    }
    for (let s = 0, l = n.length; s < l; s++) {
      const a = n[s]
      if (!(o && a === 'constructor')) {
        if (r[a].get) {
          const c = r[a].get.bind(t)
          Object.defineProperty(e, a, { get: c, configurable: !0 })
        }
        if (r[a].set) {
          const c = r[a].set
          Object.defineProperty(e, a, { set: (f) => it(() => c.call(t, f)), configurable: !0 })
        }
      }
    }
  }
  return t
}
function pl(e, t) {
  const n = Mt(e || {})
  return wl(n)
}
const wi = Symbol('store-root')
function Qt(e, t, n, r, i) {
  const o = t[n]
  if (e === o) return
  const s = Array.isArray(e)
  if (n !== wi && (!vt(e) || !vt(o) || s !== Array.isArray(o) || (i && e[i] !== o[i]))) {
    Le(t, n, e)
    return
  }
  if (s) {
    if (e.length && o.length && (!r || (i && e[0] && e[0][i] != null))) {
      let c, u, f, d, g, D, v, w
      for (
        f = 0, d = Math.min(o.length, e.length);
        f < d && (o[f] === e[f] || (i && o[f] && e[f] && o[f][i] === e[f][i]));
        f++
      )
        Qt(e[f], o, f, r, i)
      const S = new Array(e.length),
        M = new Map()
      for (
        d = o.length - 1, g = e.length - 1;
        d >= f && g >= f && (o[d] === e[g] || (i && o[f] && e[f] && o[d][i] === e[g][i]));
        d--, g--
      )
        S[g] = o[d]
      if (f > g || f > d) {
        for (u = f; u <= g; u++) Le(o, u, e[u])
        for (; u < e.length; u++) Le(o, u, S[u]), Qt(e[u], o, u, r, i)
        o.length > e.length && Le(o, 'length', e.length)
        return
      }
      for (v = new Array(g + 1), u = g; u >= f; u--)
        (D = e[u]), (w = i && D ? D[i] : D), (c = M.get(w)), (v[u] = c === void 0 ? -1 : c), M.set(w, u)
      for (c = f; c <= d; c++)
        (D = o[c]),
          (w = i && D ? D[i] : D),
          (u = M.get(w)),
          u !== void 0 && u !== -1 && ((S[u] = o[c]), (u = v[u]), M.set(w, u))
      for (u = f; u < e.length; u++) u in S ? (Le(o, u, S[u]), Qt(e[u], o, u, r, i)) : Le(o, u, e[u])
    } else for (let c = 0, u = e.length; c < u; c++) Qt(e[c], o, c, r, i)
    o.length > e.length && Le(o, 'length', e.length)
    return
  }
  const l = Object.keys(e)
  for (let c = 0, u = l.length; c < u; c++) Qt(e[l[c]], o, l[c], r, i)
  const a = Object.keys(o)
  for (let c = 0, u = a.length; c < u; c++) e[a[c]] === void 0 && Le(o, a[c], void 0)
}
function cd(e, t = {}) {
  const { merge: n, key: r = 'id' } = t,
    i = Mt(e)
  return (o) => {
    if (!vt(o) || !vt(i)) return i
    const s = Qt(i, { [wi]: o }, wi, n, r)
    return s === void 0 ? o : s
  }
}
var dd = P('<div class=fec-modal-container><div class=modal-wrapper>'),
  qr = 0,
  Yn = 0,
  [Yt, Xt] = he(!1)
function kt(e, t) {
  qr++
  const n = qr,
    [r, i] = he(null),
    [o, s] = he(null),
    [l, a] = he(null),
    [c, u] = he({ top: '0px', left: '0px' }),
    f = () => {
      Xt(!1),
        setTimeout(() => {
          const p = o(),
            T = l()
          if (!p || !T) return
          const N = p.getBoundingClientRect(),
            A = T.getBoundingClientRect(),
            Z = N.top
          A.height < Z
            ? u({ top: N.top - A.height - 10 + 'px', left: N.left + N.width / 2 + 'px' })
            : u({ top: N.top + N.height - 10 + 'px', left: N.left + N.width / 2 + 'px' }),
            setTimeout(() => {
              ;(Yn = n), Xt(!0)
            }, 0)
        }, 0)
    },
    d = Ue()
  function g() {
    const p = d == null ? void 0 : d.querySelector('.fec-scroll-wrapper')
    p == null || p.addEventListener('scroll', S), document.addEventListener('scroll', S)
  }
  function D() {
    const p = d == null ? void 0 : d.querySelector('.fec-scroll-wrapper')
    p == null || p.removeEventListener('scroll', S), document.removeEventListener('scroll', S)
  }
  Ot(() => {
    var p
    d && ((p = d.querySelector('#fec-scroll-wrapper')) == null || p.addEventListener('scroll', () => {}))
  }),
    st(() => {
      const p = o()
      p && p.removeEventListener('resize', f), (qr = 0)
      const T = l()
      T && T.removeEventListener('resize', f)
    })
  function v(p, T) {
    const N = (A) => {
      var te, le, _e, Pe, ce, ne, j
      let Z =
        (te = o()) != null && te.classList.contains('fec-event')
          ? (le = o()) == null
            ? void 0
            : le.id
          : (Pe = (_e = o()) == null ? void 0 : _e.querySelector('.fec-event')) == null
          ? void 0
          : Pe.id
      return (
        !p.contains(A.target) &&
        A.target !== o() &&
        !((ce = o()) != null && ce.contains(A.target)) &&
        ((ne = A.target) == null ? void 0 : ne.id) !== Z &&
        ((j = T()) == null ? void 0 : j())
      )
    }
    document.addEventListener('mousedown', N), st(() => document.removeEventListener('mousedown', N))
  }
  let w = { el: null }
  function S() {
    Xt(!1), D(), i(null), u({ top: '0px', left: '0px' }), t && t()
  }
  function M() {
    Yn === n
      ? setTimeout(() => {
          Yt() && (Xt(!1), D(), i(null), u({ top: '0px', left: '0px' }), t && t())
        }, 0)
      : Yt() && (i(null), t && t())
  }
  function F() {
    Xt(!1), D(), i(null), t && t()
  }
  ct(w, () => ({ eventData: r(), saveModal: F }), e, r)
  const U = (() => {
    var p = dd(),
      T = p.firstChild
    me(a, p)
    var N = w.el
    return (
      typeof N == 'function' ? me(N, T) : (w.el = T),
      me(v, T, () => M),
      re((A) =>
        Ae(
          p,
          {
            position: 'fixed',
            ...c(),
            opacity: Yt() && Yn === n ? '1' : '0',
            'pointer-events': Yt() && Yn === n ? 'all' : 'none'
          },
          A
        )
      ),
      p
    )
  })()
  function R(p) {
    Yt() || (s(p), f(), g())
  }
  return {
    modalElementNode: U,
    isSlotModalOpen: Yt,
    setTargetElRef: s,
    setSlotModalData: i,
    setIsModalOpen: Xt,
    slotModalData: r,
    openSlotModalOnElement: R
  }
}
var qi = Vi(),
  fd = (e) => {
    const t = { slotRenderer: e.slotRenderer, avalibalSots: e.avalibalSots, calendarContainer: e.calendarContainer }
    return $(qi.Provider, {
      value: t,
      get children() {
        return e.children
      }
    })
  }
function Ue() {
  var e
  return (e = Sr(qi)) == null ? void 0 : e.calendarContainer
}
function ct(e, t, n, r) {
  const i = Ln(),
    o = Sr(qi),
    s = o.avalibalSots.includes(n)
  o.slotRenderer.dispatch({ name: n, target: e, data: t(), id: i })
  let l = !1
  return (
    gt(
      On(
        r,
        () => {
          l && o.slotRenderer.dispatch({ name: n, target: e, data: t(), id: i })
        },
        { defer: !0 }
      )
    ),
    Ot(() => {
      l = !0
    }),
    st(() => {
      o.slotRenderer.remove(i)
    }),
    { isSlotAvalibale: s }
  )
}
var Wr,
  Yr,
  Xr,
  Jr,
  hd = class {
    constructor(e, t, n) {
      L(this, 'mouseDown', !1)
      L(this, 'wrapperContainer')
      L(this, 'handelMouseUp')
      L(this, 'handelMouseMove')
      L(this, 'mouseMoveHandeleler')
      L(this, 'isMouseoutsideTheContainer')
      ;(this.mouseDown = !0), (this.wrapperContainer = e), this.registerListners(t, n)
    }
    registerListners(e, t) {
      var r, i, o, s
      let n = this
      ;(Wr = (l) => {
        ;(n.mouseDown = !0), e(l)
      }),
        (Yr = (l) => {
          t(l), (n.mouseDown = !1)
        }),
        (Xr = () => {
          n.isMouseoutsideTheContainer = !1
        }),
        (Jr = () => {
          n.isMouseoutsideTheContainer = !0
        }),
        document.addEventListener('mousemove', Wr),
        document.addEventListener('mouseup', Yr),
        (i = (r = this.wrapperContainer) == null ? void 0 : r.current) == null || i.addEventListener('mouseenter', Xr),
        (s = (o = this.wrapperContainer) == null ? void 0 : o.current) == null || s.addEventListener('mouseleave', Jr)
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
        t.removeEventListener('mouseenter', Xr),
        (r = (n = this.wrapperContainer) == null ? void 0 : n.current) == null ||
          r.removeEventListener('mouseleave', Jr),
        document.removeEventListener('mouseup', Yr),
        document.removeEventListener('mousemove', Wr)
    }
  }
function Wi(e) {
  if (((e = e || window.event), 'buttons' in e)) return e.buttons == 1
  var t = e.which || e.button
  return t == 1
}
var Cl = class {
  constructor(e, t) {
    L(this, 'event')
    L(this, 'oneHourInPixelSize')
    L(this, 'contaniner')
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
      o = 1 / 0
    return (
      t.forEach((s) => {
        const l = s.getBoundingClientRect(),
          a = l.left,
          c = l.right,
          u = l.top,
          f = l.bottom,
          d = [Math.abs(n - a), Math.abs(n - c), Math.abs(r - u), Math.abs(r - f)],
          g = Math.min(...d)
        g < o && ((o = g), (i = s))
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
function _l(e, t) {
  if (!e.isAllDay()) return 'fec-month-item-no-all-day'
  let n = Dt(t),
    r = dt(t),
    i = !Pn(e.end, t),
    o = !Pn(e.start, t)
  return e.start < n && e.end > r
    ? 'fec-month-both-arrow'
    : i
    ? 'fec-month-right-arrow'
    : o
    ? 'fec-month-left-arrow'
    : 'month-no-arrow'
}
function gd(e, t, n) {
  if (e.isAllDay && !e.isAllDay()) return 'fec-month-item-no-all-day'
  let r = Dt(t),
    i = dt(n),
    o = e.start,
    s = e.end
  return e.start < r && e.end > i
    ? 'fec-month-both-arrow'
    : o >= r && s > i
    ? 'fec-month-right-arrow'
    : o < r && s < i
    ? 'fec-month-left-arrow'
    : 'month-no-arrow'
}
var Br = class extends Cl {
  constructor(t, n, r) {
    super(n, r)
    L(this, 'width', '')
    L(this, 'height', '')
    L(this, 'left', '')
    L(this, 'top', '')
    L(this, 'item')
    L(this, 'duration')
    L(this, 'dragedStartDate')
    L(this, 'dragedEndDate')
    L(this, 'animation')
    L(this, 'isDragg')
    L(this, 'mouseX')
    L(this, 'eventSourceStart')
    L(this, 'eventSourceEnd')
    L(this, 'Xdiff')
    L(this, 'Ydiff')
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
    n.setSeconds(0, 0), (this.dragedStartDate = Jt(n))
    const r = new Date(this.item.end.getTime() + t)
    ;(this.dragedEndDate = Jt(r)), this.shiftSource(t)
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
    ;(this.dragedEndDate = Jt(n)), this.shiftEndSource(t)
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
    this.eventSourceEnd = Jt(
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
    var n, r, i, o, s, l
    ;(this.eventSourceStart = Jt(
      new Date(
        ((i =
          (r = (n = this == null ? void 0 : this.item) == null ? void 0 : n.sourceEvent) == null ? void 0 : r.start) ==
        null
          ? void 0
          : i.getTime()) + t
      )
    )),
      (this.eventSourceEnd = Jt(
        new Date(
          ((l =
            (s = (o = this == null ? void 0 : this.item) == null ? void 0 : o.sourceEvent) == null ? void 0 : s.end) ==
          null
            ? void 0
            : l.getTime()) + t
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
function Rn(e, t) {
  return e.filter((r) => Pn(r.start, t) || Pn(r.end, t) || (r.start < t && r.end > t))
}
function Pn(e, t) {
  return e.getFullYear() === t.getFullYear() && e.getMonth() === t.getMonth() && e.getDate() === t.getDate()
}
function Mr(e) {
  return e.sort(function (t, n) {
    return new Date(t.start).valueOf() - new Date(n.start).valueOf()
  })
}
var md = class {
    proccess(e, t) {
      return Rn(e, t)
    }
  },
  vd = class {
    proccess(e, t) {
      const n = eo(t)
      return Or(e, n[0], n[n.length - 1])
    }
  },
  Dd = class {
    proccess(e, t, n = 'gregory') {
      const r = Ji(t, n)
      return Or(e, r[0].date, r[r.length - 1].date)
    }
  },
  yd = class {
    constructor(e) {
      L(this, 'handle')
      switch (e) {
        case 'day':
          this.handle = new md()
          break
        case 'week':
          this.handle = new vd()
          break
        case 'month':
          this.handle = new Dd()
          break
      }
    }
  },
  Ed = class extends yd {
    constructor(t, n, r = 'gregory') {
      super(t)
      L(this, 'calendar')
      L(this, 'initialDate')
      ;(this.calendar = r), (this.initialDate = n)
    }
    filter(t) {
      return Mr(this.handle.proccess(t, this.initialDate, this.calendar))
    }
  }
function kr(e, t = 'gregory') {
  return new Intl.DateTimeFormat('en-US', { month: '2-digit', day: '2-digit', year: 'numeric', calendar: t }).format(e)
}
function wd(e, t, n) {
  return new Intl.DateTimeFormat(n, { month: 'short', weekday: 'short', calendar: t }).format(e)
}
function pd(e, t, n) {
  return new Intl.DateTimeFormat(n, { day: '2-digit', calendar: t }).format(e)
}
function Yi(e, t) {
  return new Intl.DateTimeFormat(t, { timeStyle: 'short', hourCycle: 'h24' }).format(e)
}
function Cd(e, t, n) {
  const r = new Intl.DateTimeFormat(n, { hour: 'numeric', minute: 'numeric' })
  return `${r.format(e)} - ${r.format(t)}`
}
function es(e, t) {
  return t === 'Etc/Unknown'
    ? e
    : new Date((typeof e == 'string' ? new Date(e) : e).toLocaleString('en-US', { timeZone: t }))
}
function Xi(e, t) {
  const n = new Date(e.start)
  e.convertDateByTimeZone(t)
  const i = new Date(e.start).getTime() - n.getTime(),
    o = new Xe({
      ...e.sourceEvent,
      start: new Date(e.sourceEvent.start.getTime() - i),
      end: new Date(e.sourceEvent.end.getTime() - i)
    })
  return o.convertDateByTimeZone(t), o
}
var _d = 10,
  Xe = class {
    constructor(e) {
      L(this, 'id')
      L(this, 'start')
      L(this, 'end')
      L(this, 'name')
      L(this, 'duration')
      L(this, 'sourceEvent')
      L(this, 'color')
      L(this, 'groups')
      L(this, 'calendarId')
      ;(this.start = e.start),
        (this.end = e.end),
        (this.name = e.name),
        (this.id = e.id),
        (this.sourceEvent = e),
        (this.duration = Math.round((e.end.getTime() - e.start.getTime()) / 6e4)),
        (this.color = e.color || 'var(--primary)'),
        (this.groups = e.groups || []),
        (this.calendarId = 'fec-id-' + _d)
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
      let t = Dt(e.start),
        n = Dt(this.start),
        r = dt(e.end),
        i = dt(this.end)
      return (
        !this.isAllDay() && !this.doesEventEndOn(this.start) && (i = dt(this.start)),
        !e.isAllDay() && !e.doesEventEndOn(e.start) && (r = dt(e.start)),
        t < i && r > n
      )
    }
    convertDateByTimeZone(e) {
      ;(this.start = es(this.sourceEvent.start, e)), (this.end = es(this.sourceEvent.end, e))
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
function xn(e, t) {
  let r = new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    calendar: t
  }).formatToParts(e)
  return { ...Ad(r), date: new Date(e), isDateInsideMonth: !1 }
}
function Ad(e) {
  let t, n, r
  for (let i = 0; i < e.length; i++)
    e[i].type === 'year' || e[i].type === 'relatedYear'
      ? (t = e[i].value)
      : e[i].type === 'month'
      ? (n = e[i].value)
      : e[i].type === 'day' && (r = e[i].value)
  return { year: t, month: n, day: r }
}
function Ji(e, t) {
  let n = e
  const r = xn(n, t),
    i = [r]
  let o = Number(r.month)
  const s = new Date(n)
  for (let a = 40; a > 0; a--) {
    s.setDate(s.getDate() - 1)
    const c = xn(s, t),
      u = Number(c.month)
    if (o === u) i.unshift(c)
    else break
  }
  const l = new Date(n)
  for (let a = 0; a < 40; a++) {
    l.setDate(l.getDate() + 1)
    const c = xn(l, t),
      u = Number(c.month)
    if (o === u) i.push(c)
    else break
  }
  return i
}
function bd(e, t = 'gregory') {
  const n = Ji(e, t),
    r = n[0].date.getDay(),
    i = new Date(n[0].date)
  for (let l = r; l > 0; l--) {
    i.setDate(i.getDate() - 1)
    const a = xn(i, t)
    n.unshift({ ...a, isDateInsideMonth: !0 })
  }
  const o = new Date(n[n.length - 1].date),
    s = o.getDay()
  for (let l = 0; l < 6 - s; l++) {
    o.setDate(o.getDate() + 1)
    const a = xn(o, t)
    n.push({ ...a, isDateInsideMonth: !0 })
  }
  return n
}
function xd(e, t, n) {
  return new Intl.DateTimeFormat(n, { month: 'short', calendar: e }).format(t)
}
var Sd = (e, t) => {
  let n = []
  for (let r = 0; r < e.length; r += t) {
    const i = e.slice(r, r + t)
    n.push(i)
  }
  return n
}
function Al(e, t, n, r) {
  const i = new Date(e)
  return new Intl.DateTimeFormat(r, { weekday: 'short', calendar: t, timeZone: n }).format(i)
}
var $d = (e, t, n, r) =>
    Intl.DateTimeFormat(e, { calendar: t, timeZone: n })
      .formatToParts(r)
      .filter((l) => l.type === 'day')[0].value,
  Or = (e, t, n) => {
    const r = Dt(t),
      i = dt(n)
    return e.filter((o) => (o.start >= r && o.start <= i) || (o.end >= r && o.end <= i) || (o.end >= i && o.start <= r))
  }
function Td(e, t, n) {
  const r = Dt(t),
    i = dt(n)
  return e.start < i && e.end > r
}
function bl(e, t) {
  const n = Dt(e),
    r = Dt(t)
  return Math.round((r - n) / (1e3 * 60 * 60 * 24))
}
function Ht(e, t) {
  return new Intl.NumberFormat(e).format(Number(t))
}
function Dt(e) {
  const t = new Date(e)
  return t.setHours(0, 0, 0), t
}
function dt(e) {
  const t = new Date(e)
  return t.setHours(23, 59, 59), t
}
function Jt(e) {
  const t = Math.round(e.getMinutes() / 5) * 5,
    n = new Date(e)
  return n.setMinutes(t, 0, 0), n
}
function xl(e) {
  return Pn(e, new Date())
}
function Xn(e, t) {
  return t < 10 ? Ht(e, '0') + `${Ht(e, t)}` : Ht(e, t)
}
function Qi(e, t, n) {
  return `${Xn(n, e.getHours())}:${Xn(n, e.getMinutes())} - ${Xn(n, t.getHours())}:${Xn(n, t.getMinutes())}`
}
function eo(e) {
  let t = [],
    n = new Date(e)
  n.setDate(n.getDate() - n.getDay())
  for (let r = 0; r < 7; r++) t.push(new Date(n)), n.setDate(n.getDate() + 1)
  return t
}
function je(e) {
  return (
    'Minified Redux error #' +
    e +
    '; visit https://redux.js.org/Errors?code=' +
    e +
    ' for the full message or use the non-minified dev environment for full errors. '
  )
}
var ts = (function () {
    return (typeof Symbol == 'function' && Symbol.observable) || '@@observable'
  })(),
  Qr = function () {
    return Math.random().toString(36).substring(7).split('').join('.')
  },
  ns = {
    INIT: '@@redux/INIT' + Qr(),
    REPLACE: '@@redux/REPLACE' + Qr(),
    PROBE_UNKNOWN_ACTION: function () {
      return '@@redux/PROBE_UNKNOWN_ACTION' + Qr()
    }
  }
function Bd(e) {
  if (typeof e != 'object' || e === null) return !1
  for (var t = e; Object.getPrototypeOf(t) !== null; ) t = Object.getPrototypeOf(t)
  return Object.getPrototypeOf(e) === t
}
function Sl(e, t, n) {
  var r
  if (
    (typeof t == 'function' && typeof n == 'function') ||
    (typeof n == 'function' && typeof arguments[3] == 'function')
  )
    throw new Error(je(0))
  if ((typeof t == 'function' && typeof n > 'u' && ((n = t), (t = void 0)), typeof n < 'u')) {
    if (typeof n != 'function') throw new Error(je(1))
    return n(Sl)(e, t)
  }
  if (typeof e != 'function') throw new Error(je(2))
  var i = e,
    o = t,
    s = [],
    l = s,
    a = !1
  function c() {
    l === s && (l = s.slice())
  }
  function u() {
    if (a) throw new Error(je(3))
    return o
  }
  function f(v) {
    if (typeof v != 'function') throw new Error(je(4))
    if (a) throw new Error(je(5))
    var w = !0
    return (
      c(),
      l.push(v),
      function () {
        if (w) {
          if (a) throw new Error(je(6))
          ;(w = !1), c()
          var M = l.indexOf(v)
          l.splice(M, 1), (s = null)
        }
      }
    )
  }
  function d(v) {
    if (!Bd(v)) throw new Error(je(7))
    if (typeof v.type > 'u') throw new Error(je(8))
    if (a) throw new Error(je(9))
    try {
      ;(a = !0), (o = i(o, v))
    } finally {
      a = !1
    }
    for (var w = (s = l), S = 0; S < w.length; S++) {
      var M = w[S]
      M()
    }
    return v
  }
  function g(v) {
    if (typeof v != 'function') throw new Error(je(10))
    ;(i = v), d({ type: ns.REPLACE })
  }
  function D() {
    var v,
      w = f
    return (
      (v = {
        subscribe: function (M) {
          if (typeof M != 'object' || M === null) throw new Error(je(11))
          function F() {
            M.next && M.next(u())
          }
          F()
          var E = w(F)
          return { unsubscribe: E }
        }
      }),
      (v[ts] = function () {
        return this
      }),
      v
    )
  }
  return d({ type: ns.INIT }), (r = { dispatch: d, subscribe: f, getState: u, replaceReducer: g }), (r[ts] = D), r
}
var Md = Sl,
  kd = () => {},
  rs = (e, t) => t()
function Od(e, t) {
  const n = Be(e),
    r = n ? [n] : [],
    { onEnter: i = rs, onExit: o = rs } = t,
    [s, l] = he(t.appear ? [] : r),
    [a] = _c()
  let c,
    u = !1
  function f(D, v) {
    if (!D) return v && v()
    ;(u = !0),
      o(D, () => {
        it(() => {
          ;(u = !1), l((w) => w.filter((S) => S !== D)), v && v()
        })
      })
  }
  function d(D) {
    const v = c
    if (!v) return D && D()
    ;(c = void 0), l((w) => [v, ...w]), i(v, D ?? kd)
  }
  const g =
    t.mode === 'out-in'
      ? (D) => u || f(D, d)
      : t.mode === 'in-out'
      ? (D) => d(() => f(D))
      : (D) => {
          f(D), d()
        }
  return (
    wc(
      (D) => {
        const v = e()
        return Be(a) ? (a(), D) : (v !== D && ((c = v), it(() => Be(() => g(D)))), v)
      },
      t.appear ? void 0 : n
    ),
    s
  )
}
var is = (e) => e instanceof Element
function pi(e, t) {
  if (t(e)) return e
  if (typeof e == 'function' && !e.length) return pi(e(), t)
  if (Array.isArray(e))
    for (const n of e) {
      const r = pi(n, t)
      if (r) return r
    }
  return null
}
function Fd(e, t = is, n = is) {
  const r = Q(e)
  return Q(() => pi(r(), t))
}
function Ld(e) {
  return Q(() => {
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
function $l(e) {
  requestAnimationFrame(() => requestAnimationFrame(e))
}
function Id(e, t, n, r) {
  const { onBeforeEnter: i, onEnter: o, onAfterEnter: s } = t
  i == null || i(n),
    n.classList.add(...e.enter),
    n.classList.add(...e.enterActive),
    queueMicrotask(() => {
      if (!n.parentNode) return r == null ? void 0 : r()
      o == null || o(n, () => l())
    }),
    $l(() => {
      n.classList.remove(...e.enter),
        n.classList.add(...e.enterTo),
        (!o || o.length < 2) && (n.addEventListener('transitionend', l), n.addEventListener('animationend', l))
    })
  function l(a) {
    ;(!a || a.target === n) &&
      (r == null || r(),
      n.removeEventListener('transitionend', l),
      n.removeEventListener('animationend', l),
      n.classList.remove(...e.enterActive),
      n.classList.remove(...e.enterTo),
      s == null || s(n))
  }
}
function Rd(e, t, n, r) {
  const { onBeforeExit: i, onExit: o, onAfterExit: s } = t
  if (!n.parentNode) return r == null ? void 0 : r()
  i == null || i(n),
    n.classList.add(...e.exit),
    n.classList.add(...e.exitActive),
    o == null || o(n, () => l()),
    $l(() => {
      n.classList.remove(...e.exit),
        n.classList.add(...e.exitTo),
        (!o || o.length < 2) && (n.addEventListener('transitionend', l), n.addEventListener('animationend', l))
    })
  function l(a) {
    ;(!a || a.target === n) &&
      (r == null || r(),
      n.removeEventListener('transitionend', l),
      n.removeEventListener('animationend', l),
      n.classList.remove(...e.exitActive),
      n.classList.remove(...e.exitTo),
      s == null || s(n))
  }
}
var Pd = { inout: 'in-out', outin: 'out-in' },
  Nd = (e) => {
    const t = Ld(e)
    return Od(
      Fd(() => e.children),
      {
        mode: Pd[e.mode],
        appear: e.appear,
        onEnter(n, r) {
          Id(t(), e, n, r)
        },
        onExit(n, r) {
          Rd(t(), e, n, r)
        }
      }
    )
  },
  Hd = Object.defineProperty,
  Ud = (e, t) => {
    for (var n in t) Hd(e, n, { get: t[n], enumerable: !0 })
  },
  Tl = {}
Ud(Tl, {
  af: () => jd,
  am: () => Gd,
  ar: () => Zd,
  az: () => Vd,
  bg: () => Kd,
  bn: () => zd,
  bs: () => qd,
  ca: () => Wd,
  cs: () => Yd,
  da: () => Xd,
  de: () => Jd,
  el: () => Qd,
  en: () => ef,
  es: () => tf,
  et: () => nf,
  eu: () => rf,
  fa: () => of,
  fi: () => sf,
  fr: () => lf,
  ga: () => af,
  gl: () => uf,
  he: () => cf,
  hi: () => df,
  hr: () => ff,
  hu: () => hf,
  hy: () => gf,
  id: () => mf,
  is: () => vf,
  it: () => Df,
  ja: () => yf,
  kk: () => Ef,
  km: () => wf,
  kn: () => pf,
  ko: () => Cf,
  ky: () => _f,
  lt: () => Af,
  lv: () => bf,
  mn: () => xf,
  ms: () => Sf,
  mt: () => $f,
  my: () => Tf,
  nb: () => Bf,
  ne: () => Mf,
  nl: () => kf,
  nn: () => Of,
  pl: () => Ff,
  pt: () => Lf,
  ro: () => If,
  ru: () => Rf,
  si: () => Pf,
  sk: () => Nf,
  sl: () => Hf,
  sq: () => Uf,
  sr: () => jf,
  sv: () => Gf,
  sw: () => Zf,
  ta: () => Vf,
  te: () => Kf,
  th: () => zf,
  tl: () => qf,
  tlh: () => Wf,
  tr: () => Yf,
  uk: () => Xf,
  uz: () => Jf,
  uz_latn: () => Qf,
  vi: () => e0,
  yi: () => t0,
  zh: () => n0
})
var jd = {
    today: 'Vandag',
    weekly: 'Weekliks',
    month: 'Maand',
    list: 'Lys',
    no_title: 'Geen titel',
    daily: 'Daagliks',
    no_events: 'Geen gebeure'
  },
  Gd = {
    today: 'ዛሬ',
    weekly: 'አርብ',
    month: 'ወር',
    list: 'ዝርዝር',
    no_title: 'ምንም አርእስቶች የሉም',
    daily: 'ቀንን በተመለከተ',
    no_events: 'ምንም ክስተቶች የሉም'
  },
  Zd = {
    today: 'اليوم',
    weekly: 'أسبوعيا',
    month: 'شهر',
    list: 'قائمة',
    no_title: 'لا يوجد عنوان',
    daily: 'يوميا',
    no_events: 'لا توجد أحداث'
  },
  Vd = {
    today: 'Bu gün',
    weekly: 'Həftəlik',
    month: 'Ay',
    list: 'Siyahı',
    no_title: 'Başlıq yoxdur',
    daily: 'Hər gün',
    no_events: 'Heç bir hadisə yoxdur'
  },
  Kd = {
    today: 'Днес',
    weekly: 'Седмично',
    month: 'Месец',
    list: 'Списък',
    no_title: 'Няма заглавие',
    daily: 'Ежедневно',
    no_events: 'Няма събития'
  },
  zd = {
    today: 'আজ',
    weekly: 'সাপ্তাহিক',
    month: 'মাস',
    list: 'তালিকা',
    no_title: 'কোনো শিরোনাম নেই',
    daily: 'প্রতিদিন',
    no_events: 'কোনো ঘটনা নেই'
  },
  qd = {
    today: 'Danas',
    weekly: 'Sedmično',
    month: 'Mjesec',
    list: 'Lista',
    no_title: 'Nema naslova',
    daily: 'Svaki dan',
    no_events: 'Nema događaja'
  },
  Wd = {
    today: 'Avui',
    weekly: 'Setmanal',
    month: 'Mes',
    list: 'Llista',
    no_title: 'Sense títol',
    daily: 'Diariament',
    no_events: 'Cap esdeveniment'
  },
  Yd = {
    today: 'Dnes',
    weekly: 'Týdně',
    month: 'Měsíc',
    list: 'Seznam',
    no_title: 'Žádný titul',
    daily: 'Denně',
    no_events: 'Žádné události'
  },
  Xd = {
    today: 'I dag',
    weekly: 'Ugentlig',
    month: 'Måned',
    list: 'Liste',
    no_title: 'Ingen titel',
    daily: 'Dagligt',
    no_events: 'Ingen begivenheder'
  },
  Jd = {
    today: 'Heute',
    weekly: 'Wöchentlich',
    month: 'Monat',
    list: 'Liste',
    no_title: 'Kein Titel',
    daily: 'Täglich',
    no_events: 'Keine Ereignisse'
  },
  Qd = {
    today: 'Σήμερα',
    weekly: 'Εβδομαδιαία',
    month: 'Μήνας',
    list: 'Λίστα',
    no_title: 'Δεν υπάρχει τίτλος',
    daily: 'Καθημερινά',
    no_events: 'Δεν υπάρχουν συμβάντα'
  },
  ef = {
    today: 'Today',
    weekly: 'Weekly',
    month: 'Month',
    list: 'List',
    no_title: 'No title',
    daily: 'Daily',
    no_events: 'No events'
  },
  tf = {
    today: 'Hoy',
    weekly: 'Semanal',
    month: 'Mes',
    list: 'Lista',
    no_title: 'Sin título',
    daily: 'Diario',
    no_events: 'No hay eventos'
  },
  nf = {
    today: 'Täna',
    weekly: 'Nädalas',
    month: 'Kuu',
    list: 'Nimekiri',
    no_title: 'Pealkirja pole',
    daily: 'Iga päev',
    no_events: 'Sündmusi pole'
  },
  rf = {
    today: 'Gaur',
    weekly: 'Asteko',
    month: 'Hilabete',
    list: 'Zerrenda',
    no_title: 'Ez dago izenbururik',
    daily: 'Eguneroko',
    no_events: 'Ez dago ekitaldirik'
  },
  of = {
    today: 'امروز',
    weekly: 'هفتگی',
    month: 'ماه',
    list: 'لیست',
    no_title: 'هیچ عنوانی نیست',
    daily: 'روزانه',
    no_events: 'هیچ رویدادی نیست'
  },
  sf = {
    today: 'Tänään',
    weekly: 'Viikoittain',
    month: 'Kuukausi',
    list: 'Luettelo',
    no_title: 'Ei otsikkoa',
    daily: 'Päivittäin',
    no_events: 'Ei tapahtumia'
  },
  lf = {
    today: "Aujourd'hui",
    weekly: 'Hebdomadaire',
    month: 'Mois',
    list: 'Liste',
    no_title: 'Aucun titre',
    daily: 'Quotidien',
    no_events: 'Aucun événement'
  },
  af = {
    today: 'Inniu',
    weekly: 'Seachtainiúil',
    month: 'Mí',
    list: 'Liosta',
    no_title: 'Gan teideal',
    daily: 'Gach lá',
    no_events: 'Gan imeachtaí'
  },
  uf = {
    today: 'Hoxe',
    weekly: 'Semanal',
    month: 'Mes',
    list: 'Lista',
    no_title: 'Sen título',
    daily: 'Diariamente',
    no_events: 'Non hai eventos'
  },
  cf = {
    today: 'היום',
    weekly: 'שבועי',
    month: 'חודש',
    list: 'רשימה',
    no_title: 'אין כותרת',
    daily: 'יומי',
    no_events: 'אין אירועים'
  },
  df = {
    today: 'आज',
    weekly: 'साप्ताहिक',
    month: 'मासिक',
    list: 'सूची',
    no_title: 'कोई शीर्षक नहीं',
    daily: 'दैनिक',
    no_events: 'कोई घटना नहीं'
  },
  ff = {
    today: 'Danas',
    weekly: 'Tjedno',
    month: 'Mjesec',
    list: 'Popis',
    no_title: 'Nema naslova',
    daily: 'Svaki dan',
    no_events: 'Nema događaja'
  },
  hf = {
    today: 'Ma',
    weekly: 'Heti',
    month: 'Hónap',
    list: 'Lista',
    no_title: 'Nincs cím',
    daily: 'Napi',
    no_events: 'Nincsenek események'
  },
  gf = {
    today: 'Այսօր',
    weekly: 'Շաբաթվա օրերը',
    month: 'Ամիս',
    list: 'Ցուցակ',
    no_title: 'Ոչ մի վերնագիր',
    daily: 'Օրական',
    no_events: 'Ոչ մի իրադարձություն'
  },
  mf = {
    today: 'Hari ini',
    weekly: 'Mingguan',
    month: 'Bulan',
    list: 'Daftar',
    no_title: 'Tanpa judul',
    daily: 'Setiap hari',
    no_events: 'Tidak ada acara'
  },
  vf = {
    today: 'Í dag',
    weekly: 'Vikulega',
    month: 'Mánuður',
    list: 'Listi',
    no_title: 'Enginn titill',
    daily: 'Daglega',
    no_events: 'Engin viðburði'
  },
  Df = {
    today: 'Oggi',
    weekly: 'Settimanale',
    month: 'Mese',
    list: 'Elenco',
    no_title: 'Nessun titolo',
    daily: 'Giornaliero',
    no_events: 'Nessun evento'
  },
  yf = {
    today: '今日',
    weekly: '週次',
    month: '月',
    list: 'リスト',
    no_title: 'タイトルなし',
    daily: '毎日',
    no_events: 'イベントはありません'
  },
  Ef = {
    today: 'Бүгін',
    weekly: 'Аптағы',
    month: 'Ай',
    list: 'Тізім',
    no_title: 'Тақырып жоқ',
    daily: 'Күнделікті',
    no_events: 'Оқиғалар жоқ'
  },
  wf = {
    today: 'ថ្ងៃនេះ',
    weekly: 'ប្រចាំសប្តាហ៍',
    month: 'ខែ',
    list: 'បញ្ជី',
    no_title: 'គ្មានចំណងជើង',
    daily: 'រាល់ថ្ងៃ',
    no_events: 'មិនមានព្រឹត្តិការណ៍'
  },
  pf = {
    today: 'ಇಂದು',
    weekly: 'ವಾರದಲ್ಲಿ',
    month: 'ತಿಂಗಳಲ್ಲಿ',
    list: 'ಪಟ್ಟಿ',
    no_title: 'ಯಾವುದೇ ಶೀರ್ಷಿಕೆಯಿಲ್ಲ',
    daily: 'ದಿನಕ್ಕೆ',
    no_events: 'ಯಾವುದೇ ಘಟನೆಗಳಿಲ್ಲ'
  },
  Cf = {
    today: '오늘',
    weekly: '주간',
    month: '월',
    list: '목록',
    no_title: '제목 없음',
    daily: '매일',
    no_events: '이벤트 없음'
  },
  _f = {
    today: 'Бүгүн',
    weekly: 'Жума',
    month: 'Ай',
    list: 'Тизме',
    no_title: 'Тақырыпсыз',
    daily: 'Күн бою',
    no_events: 'Берилгендер жок'
  },
  Af = {
    today: 'Šiandien',
    weekly: 'Savaitės',
    month: 'Mėnesį',
    list: 'Sąrašas',
    no_title: 'Nėra pavadinimo',
    daily: 'Kasdien',
    no_events: 'Nėra renginių'
  },
  bf = {
    today: 'Šodien',
    weekly: 'Nedēļā',
    month: 'Mēnesis',
    list: 'Saraksts',
    no_title: 'Nav virsraksta',
    daily: 'Katru dienu',
    no_events: 'Nav notikumu'
  },
  xf = {
    today: 'Өнөөдөр',
    weekly: 'Долоо хоногийн',
    month: 'Сар',
    list: 'Жагсаалт',
    no_title: 'Гарчиг алга',
    daily: 'Өнөөдөр',
    no_events: 'Үзэгдэл алга'
  },
  Sf = {
    today: 'Hari ini',
    weekly: 'Sekali seminggu',
    month: 'Bulan',
    list: 'Senarai',
    no_title: 'Tiada tajuk',
    daily: 'Setiap hari',
    no_events: 'Tiada acara'
  },
  $f = {
    today: 'Illum',
    weekly: 'Kull ġimgħa',
    month: 'Xahar',
    list: 'Lista',
    no_title: 'Ebda titlu',
    daily: 'Kull jum',
    no_events: 'Ebda avvenimenti'
  },
  Tf = {
    today: 'ယနေ့',
    weekly: 'အပတ်စဉ်',
    month: 'လ',
    list: 'စာရင်း',
    no_title: 'ခေါင်းစဉ်မရှိပါ',
    daily: 'နေ့ရက်မှာ',
    no_events: 'ဘာမှမလုပ်ပါနှင့်'
  },
  Bf = {
    today: 'I dag',
    weekly: 'Ukentlig',
    month: 'Måned',
    list: 'Liste',
    no_title: 'Ingen tittel',
    daily: 'Daglig',
    no_events: 'Ingen hendelser'
  },
  Mf = {
    today: 'आज',
    weekly: 'साप्ताहिक',
    month: 'महिना',
    list: 'सूची',
    no_title: 'कुनै शीर्षक छैन',
    daily: 'प्रतिदिन',
    no_events: 'कुनै घटना छैन'
  },
  kf = {
    today: 'Vandaag',
    weekly: 'Wekelijks',
    month: 'Maand',
    list: 'Lijst',
    no_title: 'Geen titel',
    daily: 'Dagelijks',
    no_events: 'Geen evenementen'
  },
  Of = {
    today: 'I dag',
    weekly: 'Vekentleg',
    month: 'Månad',
    list: 'Liste',
    no_title: 'Ingen tittel',
    daily: 'Dagleg',
    no_events: 'Ingen hendingar'
  },
  Ff = {
    today: 'Dzisiaj',
    weekly: 'Tygodniowo',
    month: 'Miesiąc',
    list: 'Lista',
    no_title: 'Brak tytułu',
    daily: 'Codziennie',
    no_events: 'Brak wydarzeń'
  },
  Lf = {
    today: 'Hoje',
    weekly: 'Semanal',
    month: 'Mês',
    list: 'Lista',
    no_title: 'Sem título',
    daily: 'Diário',
    no_events: 'Sem eventos'
  },
  If = {
    today: 'Astăzi',
    weekly: 'Săptămânal',
    month: 'Lună',
    list: 'Listă',
    no_title: 'Fără titlu',
    daily: 'Zilnic',
    no_events: 'Fără evenimente'
  },
  Rf = {
    today: 'Сегодня',
    weekly: 'Еженедельно',
    month: 'Месяц',
    list: 'Список',
    no_title: 'Нет заголовка',
    daily: 'Ежедневно',
    no_events: 'Нет событий'
  },
  Pf = {
    today: 'අද',
    weekly: 'සතිපාර්වල',
    month: 'මාසය',
    list: 'ලැයිස්තුව',
    no_title: 'සිදු වෙන්නේ නැත',
    daily: 'දවසේ',
    no_events: 'සිදුවූ සිදු නැත'
  },
  Nf = {
    today: 'Dnes',
    weekly: 'Týždenne',
    month: 'Mesiac',
    list: 'Zoznam',
    no_title: 'Žiadny názov',
    daily: 'Dennodenne',
    no_events: 'Žiadne udalosti'
  },
  Hf = {
    today: 'Danes',
    weekly: 'Tedensko',
    month: 'Mesec',
    list: 'Seznam',
    no_title: 'Brez naslova',
    daily: 'Dnevno',
    no_events: 'Brez dogodkov'
  },
  Uf = {
    today: 'Sot',
    weekly: 'Javor',
    month: 'Muaj',
    list: 'Listë',
    no_title: 'Asnjë titull',
    daily: 'Çdo ditë',
    no_events: 'Asnjë ngjarje'
  },
  jf = {
    today: 'Данас',
    weekly: 'Недељно',
    month: 'Месец',
    list: 'Листа',
    no_title: 'Нема наслова',
    daily: 'Свакодневно',
    no_events: 'Нема догађаја'
  },
  Gf = {
    today: 'Idag',
    weekly: 'Veckovis',
    month: 'Månad',
    list: 'Lista',
    no_title: 'Ingen titel',
    daily: 'Dagligen',
    no_events: 'Inga händelser'
  },
  Zf = {
    today: 'Leo',
    weekly: 'Kila wiki',
    month: 'Mwezi',
    list: 'Orodha',
    no_title: 'Hakuna kichwa',
    daily: 'Kila siku',
    no_events: 'Hakuna matukio'
  },
  Vf = {
    today: 'இன்று',
    weekly: 'வாரந்தோறும்',
    month: 'மாதம்',
    list: 'பட்டியல்',
    no_title: 'தலைப்பு இல்லை',
    daily: 'தினசரி',
    no_events: 'நிகழ்வுகள் இல்லை'
  },
  Kf = {
    today: 'ఈ రోజు',
    weekly: 'వారంలో',
    month: 'నెల',
    list: 'జాబితా',
    no_title: 'ఏ శీర్షక లేదు',
    daily: 'ప్రతి రోజు',
    no_events: 'ఏమిటి ఈ సందర్భంలో ఏ సందర్భాలు లేవు'
  },
  zf = {
    today: 'วันนี้',
    weekly: 'รายสัปดาห์',
    month: 'เดือน',
    list: 'รายการ',
    no_title: 'ไม่มีชื่อเรื่อง',
    daily: 'ทุกวัน',
    no_events: 'ไม่มีเหตุการณ์'
  },
  qf = {
    today: 'Ngayon',
    weekly: 'Kada linggo',
    month: 'Buwan',
    list: 'Listahan',
    no_title: 'Walang pamagat',
    daily: 'Araw-araw',
    no_events: 'Walang mga kaganapan'
  },
  Wf = {
    today: 'Hegh',
    weekly: 'loS',
    month: 'jar',
    list: 'mIch',
    no_title: 'pagh jaj',
    daily: 'Duj',
    no_events: 'pagh jaj'
  },
  Yf = {
    today: 'Bugün',
    weekly: 'Haftalık',
    month: 'Ay',
    list: 'Liste',
    no_title: 'Başlık yok',
    daily: 'Günlük',
    no_events: 'Etkinlik yok'
  },
  Xf = {
    today: 'Сьогодні',
    weekly: 'Щотижня',
    month: 'Місяць',
    list: 'Список',
    no_title: 'Немає заголовка',
    daily: 'Щоденно',
    no_events: 'Подій немає'
  },
  Jf = {
    today: 'Bugun',
    weekly: 'Haftalik',
    month: 'Oy',
    list: "Ro'yxat",
    no_title: "Sarlavha yo'q",
    daily: 'Har kuni',
    no_events: "Hech qanday tadbir yo'q"
  },
  Qf = {
    today: 'Bugun',
    weekly: 'Haftalik',
    month: 'Oy',
    list: "Ro'yxat",
    no_title: "Sarlavha yo'q",
    daily: 'Har kuni',
    no_events: "Hech qanday tadbir yo'q"
  },
  e0 = {
    today: 'Hôm nay',
    weekly: 'Hàng tuần',
    month: 'Tháng',
    list: 'Danh sách',
    no_title: 'Không có tiêu đề',
    daily: 'Hàng ngày',
    no_events: 'Không có sự kiện'
  },
  t0 = {
    today: 'היינט',
    weekly: 'וואָך',
    month: 'חודש',
    list: 'ליסט',
    no_title: 'קיין טיטל',
    daily: 'טעגלעך',
    no_events: 'קיין אויף ארעיע'
  },
  n0 = {
    today: '今天',
    weekly: '每周',
    month: '月',
    list: '清单',
    no_title: '没有标题',
    daily: '每日',
    no_events: '没有活动'
  }
function Ut(e, t) {
  const n = new Intl.Locale(e).language
  return Tl[n][t]
}
var r0 =
  (e) =>
  (n = e, r) => {
    var i
    switch (r.type) {
      case 'CHANGE_CONTAINER_HEIGHT':
        return { ...n, containerHeight: r.val }
      case 'DELETE_EVENT':
        const o = [...n.events].filter((v) => v.id != r.id)
        return { ...n, events: o }
      case 'SET_STOP_ADD_EVENT':
        return { ...n, stopAddEvent: r.val }
      case 'SET_AVALIBLE_SLOTS':
        return { ...n, avalibalSots: r.avalibalSots }
      case 'CHANGE_THEME':
        return { ...n, theme: r.val }
      case 'UPDATE_EDITABLE':
        return { ...n, editable: r.val }
      case 'ADD_EVENT':
        const s = [...n.events]
        let l = new Xe(r.event)
        return l.convertDateByTimeZone(n.timeZone), s.push(l), { ...n, events: s }
      case 'UPDATE_GROUPS':
        return { ...n, groups: r.groups }
      case 'ADD_GROUP':
        const a = [...n.groups, r.group]
        return { ...n, groups: a }
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
        for (let v = 0; v < r.events.length; v++) {
          const w = new Xe(r.events[v])
          w.convertDateByTimeZone(n.timeZone), c.push(w)
        }
        return { ...n, events: c }
      case 'UPDATE_EVENT':
        const u = [...n.events],
          f = u.findIndex((v) => v.id === r.id),
          d = new Xe(r.event)
        return d.convertDateByTimeZone(n.timeZone), (u[f] = d), { ...n, events: u }
      case 'SET_TIMEZONE':
        const g = [...n.events]
        return (
          g.forEach((v) => {
            v.convertDateByTimeZone(r.tz)
          }),
          { ...n, timeZone: r.tz, events: g }
        )
      case 'UPDATE_TIMEZONE':
        let D = [...n.events]
        for (let v = 0; v < D.length; v++) (i = D[v]) == null || i.convertDateByTimeZone(r.tz)
        return { ...n, timeZone: r.tz, events: D }
      default:
        return n
    }
  }
function i0(e) {
  const t = Md(r0(e)),
    [n, r] = ld(t.getState()),
    i = t.subscribe(() => r(cd(t.getState())))
  return st(() => i()), { store: n, dispatch: o0(t) }
}
function o0(e) {
  return e.dispatch
}
var s0 = class {
    constructor() {
      L(this, 'subscribers', [])
      L(this, 'state', new Map())
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
  l0 = class {
    constructor() {
      return new Proxy(this, {
        get(e, t, n) {
          return t in e ? Reflect.get(e, t, n) : ((e[t] = []), e[t])
        }
      })
    }
  },
  a0 = class {
    constructor(e) {
      L(this, 'storeManager')
      L(this, 'renderStore', new s0())
      L(this, 'EventListenrsStorage')
      L(this, 'storeDispatch')
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
        { store: n, dispatch: r } = i0(t)
      ;(this.storeManager = n),
        (this.storeDispatch = r),
        this.resetOptions(e, !0),
        (this.EventListenrsStorage = new l0())
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
  Bl = Vi(),
  u0 = (e) => {
    const t = { store: e.store, instance: e.instance }
    return $(Bl.Provider, {
      value: t,
      get children() {
        return e.children
      }
    })
  }
function to() {
  return Sr(Bl)
}
var Ci = class {
    proccess(e) {
      const t = { month: 'long', year: 'numeric', day: 'numeric', calendar: e.calendar, timeZone: e.timeZone }
      return new Intl.DateTimeFormat(e.locale, t).format(new Date(e.initialDate))
    }
  },
  Ml = class {
    proccess(e) {
      const t = { year: 'numeric', month: 'short', day: 'numeric', calendar: e.calendar, timeZone: e.timeZone },
        n = eo(new Date(e.initialDate))
      return new Intl.DateTimeFormat(e.locale, t).formatRange(n[0], n[n.length - 1])
    }
  },
  kl = class {
    proccess(e) {
      const t = { month: 'long', year: 'numeric', calendar: e.calendar, timeZone: e.timeZone }
      return new Intl.DateTimeFormat(e.locale, t).format(new Date(e.initialDate))
    }
  },
  c0 = class {
    proccess(e) {
      return e.listMode === 'week'
        ? new Ml().proccess(e)
        : e.listMode === 'month'
        ? new kl().proccess(e)
        : new Ci().proccess(e)
    }
  },
  d0 = class {
    constructor(e) {
      L(this, 'handle')
      L(this, 'calendarSate')
      switch (((this.calendarSate = e), e.grid)) {
        case 'daily':
          this.handle = new Ci()
          break
        case 'weekly':
          this.handle = new Ml()
          break
        case 'month':
          this.handle = new kl()
          break
        case 'list':
          this.handle = new c0()
          break
        default:
          this.handle = new Ci()
          break
      }
    }
    format() {
      return this.handle.proccess(this.calendarSate)
    }
  },
  f0 = P('<div class=fec-go-to-today>'),
  h0 = P(
    '<div class=fec-go-back-icon><svg xmlns=http://www.w3.org/2000/svg width=16 height=16 viewBox="0 0 16 16"fill=none><path d="M13.28 10.0333L8.93333 5.68667C8.42 5.17333 7.58 5.17333 7.06667 5.68667L2.72 10.0333"stroke=#7E7E7F stroke-width=1.5 stroke-miterlimit=10 stroke-linecap=round stroke-linejoin=round>'
  ),
  g0 = P(
    '<div class=fec-go-forward-icon><svg xmlns=http://www.w3.org/2000/svg width=16 height=16 viewBox="0 0 16 16"fill=none><path d="M13.28 10.0333L8.93333 5.68667C8.42 5.17333 7.58 5.17333 7.06667 5.68667L2.72 10.0333"stroke=#7E7E7F stroke-width=1.5 stroke-miterlimit=10 stroke-linecap=round stroke-linejoin=round>'
  ),
  m0 = P('<div class=fec-dropdown-calendar>'),
  v0 = P('<div class=fec-grid-drop data-test-id-dropdown=1>'),
  D0 = P(
    '<div class=fec-calendar-header><div></div><div></div><div></div><div class=fec-header-date dir=rtl></div><div style=flex:1></div><div>'
  ),
  y0 = P('<div class=fec-dropdown-calendar-item data-test-id-drop=0>'),
  E0 = (e) => {
    const [t, n] = he(!1),
      r = to()
    function i(p, T) {
      const N = (A) => {
        var Z
        return !p.contains(A.target) && ((Z = T()) == null ? void 0 : Z())
      }
      document.addEventListener('click', N), st(() => document.removeEventListener('click', N))
    }
    function o() {
      n(!1)
    }
    const s = Q(() => new d0(r.store).format())
    function l(p) {
      e.changeGrid(p)
    }
    function a() {
      const p = new Date(r.store.initialDate),
        T = r.store.grid
      T === 'daily'
        ? p.setDate(p.getDate() - 1)
        : T === 'weekly'
        ? p.setDate(p.getDate() - 7)
        : T === 'month'
        ? p.setMonth(p.getMonth() - 1)
        : T === 'list' &&
          (r.store.listMode === 'day'
            ? p.setDate(p.getDate() - 1)
            : r.store.listMode === 'month'
            ? p.setMonth(p.getMonth() - 1)
            : r.store.listMode === 'week' && p.setDate(p.getDate() - 7)),
        e.onDateChange(p)
    }
    function c() {
      e.onDateChange(new Date())
    }
    function u() {
      const p = new Date(r.store.initialDate),
        T = r.store.grid
      T === 'daily'
        ? p.setDate(p.getDate() + 1)
        : T === 'weekly'
        ? p.setDate(p.getDate() + 7)
        : T === 'month'
        ? p.setMonth(p.getMonth() + 1)
        : T === 'list' &&
          (r.store.listMode === 'day'
            ? p.setDate(p.getDate() + 1)
            : r.store.listMode === 'month'
            ? p.setMonth(p.getMonth() + 1)
            : r.store.listMode === 'week' && p.setDate(p.getDate() + 7)),
        e.onDateChange(p)
    }
    let f = { el: null },
      d = { el: null },
      g = { el: null },
      D = { el: null },
      v = { el: null }
    const w = () => ({ date: s() }),
      S = () => ({ grid: r.store.grid }),
      { isSlotAvalibale: M } = ct(f, w, 'headerDateSlot', () => r.store.initialDate),
      { isSlotAvalibale: F } = ct(d, S, 'gridDropDown', () => r.store.grid),
      { isSlotAvalibale: E } = ct(
        g,
        () => {},
        'todayBtn',
        () => {}
      ),
      { isSlotAvalibale: U } = ct(
        D,
        () => {},
        'goBackDate',
        () => {}
      ),
      { isSlotAvalibale: R } = ct(
        v,
        () => {},
        'goForwardDate',
        () => {}
      )
    return (() => {
      var p = D0(),
        T = p.firstChild,
        N = T.nextSibling,
        A = N.nextSibling,
        Z = A.nextSibling,
        te = Z.nextSibling,
        le = te.nextSibling,
        _e = g.el
      typeof _e == 'function' ? me(_e, T) : (g.el = T),
        (T.$$click = c),
        x(
          T,
          $(ge, {
            when: !E,
            get children() {
              var J = f0()
              return x(J, () => Ut(r.instance.storeManager.locale, 'today')), J
            }
          })
        ),
        (N.$$click = a)
      var Pe = D.el
      typeof Pe == 'function' ? me(Pe, N) : (D.el = N),
        x(
          N,
          $(ge, {
            when: !U,
            get children() {
              return h0()
            }
          })
        ),
        (A.$$click = u)
      var ce = v.el
      typeof ce == 'function' ? me(ce, A) : (v.el = A),
        x(
          A,
          $(ge, {
            when: !R,
            get children() {
              return g0()
            }
          })
        )
      var ne = f.el
      typeof ne == 'function' ? me(ne, Z) : (f.el = Z),
        x(
          Z,
          $(ge, {
            when: !M,
            get children() {
              return s()
            }
          })
        )
      var j = d.el
      return (
        typeof j == 'function' ? me(j, le) : (d.el = le),
        x(
          le,
          $(ge, {
            when: !F,
            get children() {
              var J = v0()
              return (
                (J.$$click = () => n(!t())),
                x(J, () => Ut(r.instance.storeManager.locale, r.store.grid), null),
                x(
                  J,
                  $(Nd, {
                    name: 'slide-fade',
                    get children() {
                      return $(ge, {
                        get when() {
                          return t()
                        },
                        get children() {
                          var De = m0()
                          return (
                            me(i, De, () => o),
                            x(
                              De,
                              $(ve, {
                                get each() {
                                  return r.instance.getOptions()
                                },
                                children: (Ee) =>
                                  (() => {
                                    var we = y0()
                                    return (
                                      (we.$$click = (Je) => {
                                        Je.stopPropagation(), n(!1), l(Ee)
                                      }),
                                      x(we, () => Ut(r.instance.storeManager.locale, Ee)),
                                      we
                                    )
                                  })()
                              })
                            ),
                            De
                          )
                        }
                      })
                    }
                  }),
                  null
                ),
                J
              )
            }
          })
        ),
        p
      )
    })()
  }
Oe(['click'])
function w0(e) {
  const t = to()
  let n = !1,
    r,
    i = 0,
    o = t.store.initialDate
  function s(u = !1) {
    var g
    ;(n = !0),
      r.classList.add('fec-cloned-calendar'),
      r.classList.remove('fec-not-cloned'),
      (g = e.calendarContainerRef) == null || g.insertAdjacentElement('beforeend', r)
    const f = r.querySelector('.fec-scroll-wrapper')
    f && (f.scrollTop = i)
    const d = e.containerRef
    u
      ? d == null || d.classList.add('fec-grid-animate-smooth')
      : new Date(o) > new Date(t.store.initialDate)
      ? d == null || d.classList.add('fec-grid-animate-backward')
      : d == null || d.classList.add('fec-grid-animate-forward'),
      (o = t.store.initialDate),
      setTimeout(() => {
        var D
        ;(D = e.calendarContainerRef.querySelector('.fec-cloned-calendar')) == null || D.remove(),
          d == null || d.classList.remove('fec-grid-animate-forward'),
          d == null || d.classList.remove('fec-grid-animate-backward'),
          d == null || d.classList.remove('fec-grid-animate-smooth'),
          c(),
          a(),
          (n = !1)
      }, 250)
  }
  gt(
    On(
      () => t.store.initialDate,
      () => {
        !r || n || s()
      }
    )
  ),
    Ot(() => {
      c(), a()
      const u = new MutationObserver(() => {
          c()
        }),
        f = Ue()
      f && u.observe(f.querySelector('#full-event-calendar-wrapper'), { subtree: !0, childList: !0, attributes: !0 })
    }),
    e.containerRef.querySelector('.fec-scroll-wrapper') &&
      e.containerRef.querySelector('.fec-scroll-wrapper').addEventListener('scroll', c)
  function a() {
    var f, d
    e.containerRef.querySelector('.fec-scroll-wrapper') &&
      ((f = e.containerRef.querySelector('.fec-scroll-wrapper')) == null || f.removeEventListener('scroll', c),
      (d = e.containerRef.querySelector('.fec-scroll-wrapper')) == null || d.addEventListener('scroll', c))
  }
  st(() => {
    var u
    ;(u = e.containerRef.querySelector('.fec-scroll-wrapper')) == null || u.removeEventListener('scroll', c)
  })
  function c() {
    var f
    r = (f = e.containerRef) == null ? void 0 : f.cloneNode(!0)
    const u = e.containerRef.querySelector('.fec-scroll-wrapper')
    u && (i = u.scrollTop)
  }
  gt(
    On(
      () => t.store.grid,
      () => {
        !r || n || s(!0)
      }
    )
  )
}
var p0 = P(
    '<div style=position:relative;flex:1; id=calendar-container><div class="fec-not-cloned fec-grid-wrapper"id=full-event-calendar-wrapper>'
  ),
  C0 = (e) => {
    let t, n
    return (
      Ot(() => {
        w0({ containerRef: t, calendarContainerRef: n })
      }),
      (() => {
        var r = p0(),
          i = r.firstChild,
          o = n
        typeof o == 'function' ? me(o, r) : (n = r)
        var s = t
        return typeof s == 'function' ? me(s, i) : (t = i), x(i, () => e.children), r
      })()
    )
  },
  _0 = P('<div id=full-event-calendar-core>')
function A0() {
  const e = to()
  function t(l) {
    const a = e.instance.getEventById(l.id),
      c = new Xe(l)
    c.convertDateByTimeZone(e.store.timeZone),
      e.store.autoUpdateEventOnChange && e.instance.updateEvent(l.id, l),
      e.instance.emitEvent('eventUpdate', { prev: a, next: c, id: l.id })
  }
  function n(l) {
    e.store.autoUpdateEventOnChange && !e.store.stopAddEvent && e.instance.addEvent(l.sourceEvent),
      e.store.stopAddEvent
        ? e.instance.emitEvent('addEventStoped', { event: l })
        : e.instance.emitEvent('eventAdd', { event: l })
  }
  function r(l) {
    e.instance.emitEvent('dateUpdate', { date: l }), e.instance.changeInitialDate(l.toISOString())
  }
  function i(l) {
    e.instance.emitEvent('gridUpdate', { grid: l }), e.instance.changeGrid(l)
  }
  function o(l) {
    e.instance.emitEvent('eventClicked', { event: l })
  }
  const s = Q(() => [...e.store.events])
  return (() => {
    var l = _0()
    return (
      x(l, $(E0, { onDateChange: r, changeGrid: i }), null),
      x(
        l,
        $(C0, {
          get children() {
            return $(ml, {
              get component() {
                return e.instance.getcurrentGridCode()
              },
              onEventUpdate: t,
              onAddEvent: n,
              onEventClick: o,
              get initialDate() {
                return new Date(e.store.initialDate)
              },
              get events() {
                return s()
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
      re(
        (a) => {
          var c = `full-event-calendar-core calendar-theme-${e.store.theme}`,
            u = `height:${e.store.containerHeight}px`
          return c !== a.e && lt(l, (a.e = c)), (a.t = Ae(l, u, a.t)), a
        },
        { e: void 0, t: void 0 }
      ),
      l
    )
  })()
}
var os = (e) =>
    $(u0, {
      get store() {
        return e.store
      },
      get instance() {
        return e.instance
      },
      get children() {
        return $(fd, {
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
            return $(A0, {})
          }
        })
      }
    }),
  b0 = class extends a0 {
    constructor(e, t) {
      if (!e) throw Error('full-event-calendar --> a target element must be provided for the calendar to render.')
      super(t), (this.targetElement = e)
    }
    render() {
      gl(() => {
        const e = this
        return $(os, {
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
      rd(() => {
        const e = this
        return $(os, {
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
const ss = [
    'events',
    'initialDate',
    'timeZone',
    'calendar',
    'locale',
    'grid',
    'gridHeight',
    'plugins',
    'autoUpdateEventOnChange',
    'listMode',
    'groups',
    'editable',
    'theme',
    'avalibalSots',
    'stopAddEvent',
    'containerHeight'
  ],
  x0 = Hi({
    props: {
      events: { type: Array, required: !0 },
      plugins: { type: Array, required: !0 },
      initialDate: Date,
      timeZone: String,
      calendar: String,
      locale: String,
      grid: String,
      groups: Array,
      gridHeight: Number,
      autoUpdateEventOnChange: Boolean,
      editable: Boolean,
      theme: String,
      avalibalSots: Array,
      stopAddEvent: Boolean,
      listMode: String,
      containerHeight: Object
    },
    data() {
      return { renderId: 0, customRenderingMap: new Map(), EventCalendar: null }
    },
    render() {
      const e = []
      for (const t of this.customRenderingMap.values())
        this.$slots[t.name] &&
          e.push(bn($0, { innerContext: this.$slots[t.name], targetContainer: t.target.el, data: t.data }))
      return bn('div', { id: `data-fc-render-id-${this.renderId}` }, bn(Se, e))
    },
    mounted() {
      const e = new b0(this.$el, {
        events: this.events,
        gridHeight: this.gridHeight,
        timeZone: this.timeZone,
        calendar: this.calendar,
        locale: this.locale,
        initialDate: this.initialDate,
        plugins: this.plugins,
        stopAddEvent: this.stopAddEvent,
        autoUpdateEventOnChange: this.autoUpdateEventOnChange,
        grid: this.grid,
        listMode: this.listMode,
        groups: this.groups,
        editable: this.editable,
        theme: this.theme,
        containerHeight: this.containerHeight
      })
      ;(this.EventCalendar = e),
        e.renderStore.subscribe(() => {
          ;(this.customRenderingMap = e.renderStore.getState()), this.renderRequest()
        }),
        e.setAvalibleSlots(Object.keys(T0(this.$slots))),
        e.render(),
        this.registerListenrs()
    },
    methods: {
      registerListenrs() {
        const e = this
        this.EventCalendar &&
          (this.EventCalendar.on('eventClicked', (t) => {
            e.$emit('eventClicked', t)
          }),
          this.EventCalendar.on('eventAdd', (t) => {
            e.$emit('eventAdd', t)
          }),
          this.EventCalendar.on('addEventStoped', (t) => {
            e.$emit('addEventStoped', t)
          }),
          this.EventCalendar.on('eventUpdate', (t) => {
            const n = [...this.events]
            let r = n.findIndex((i) => i.id === t.id)
            ;(n[r] = t.next.sourceEvent), e.$emit('update:events', n)
          }),
          this.EventCalendar.on('dateUpdate', (t) => {
            e.$emit('update:initial-date', t.date)
          }),
          this.EventCalendar.on('gridUpdate', (t) => {
            e.$emit('update:grid', t.grid)
          }))
      },
      renderRequest() {
        this.renderId++
      }
    },
    watch: S0()
  })
function S0() {
  const e = {}
  for (let t = 0; t < ss.length; t++) {
    const n = ss[t]
    e[n] = {
      deep: !0,
      handler(r) {
        this.EventCalendar.resetOptions({ [n]: r })
      }
    }
  }
  return e
}
const $0 = Hi({
  props: ['targetContainer', 'innerContext', 'data'],
  render() {
    return bn(Mu, { to: this.targetContainer }, bn(this.innerContext, { data: this.data }))
  }
})
function T0(e) {
  const t = {}
  for (const n in e) t[B0(n)] = e[n]
  return t
}
function B0(e) {
  return e
    .split('-')
    .map((t, n) => (n ? M0(t) : t))
    .join('')
}
function M0(e) {
  return e.charAt(0).toUpperCase() + e.slice(1)
}
function k0(e) {
  const t = [...e]
  t.sort(function (s, l) {
    return new Date(s.start).valueOf() - new Date(l.start).valueOf()
  })
  let n = 0,
    r = [{ 1: [] }]
  function i(s) {
    let l = !1
    for (const [a, c] of Object.entries(r[n]))
      if (a !== String(1)) {
        for (let u = 0; u < c.length; u++)
          if (c[u].checkOverLap(s)) {
            l = !0
            break
          }
        if (l) break
      }
    return !l
  }
  function o(s, l) {
    r[n][s] || (r[n][s] = [])
    const a = r[n][s]
    let c = !0
    for (let u = 0; u < a.length; u++)
      if (l.checkOverLap(a[u])) {
        c = !1
        break
      }
    return c ? s : o(s + 1, l)
  }
  for (let s = 0; s < t.length; s++) {
    const l = o(1, t[s])
    l === 1 && i(t[s]) && n++, r[n] || r.push({ 1: [] }), r[n][l].push(t[s])
  }
  return r
}
function O0(e, t) {
  let n = !0
  for (let r = 0; r < e.length; r++)
    if (t.checkOverLap(e[r])) {
      n = !1
      break
    }
  return n
}
function F0(e, t, n) {
  const r = Object.values(e)
  let i = 1
  for (let o = n; o < r.length; o++) {
    const s = r[o]
    if (O0(s, t)) i++
    else break
  }
  return ` ;width : ${i}00%`
}
var no = class {
    constructor(t) {
      L(this, 'isDragging', !1)
      L(this, 'draggingController', null)
      L(this, 'container')
      this.container = t
    }
    createDraggingObject(t, n) {
      this.isDragging || (this.draggingController = new Br(t, n, this.container))
    }
  },
  ls = class extends no {
    constructor() {
      super(...arguments)
      L(this, 'hasMouseMoved', !1)
      L(this, 'hasScrolled', !1)
      L(this, 'firstTopPosition', 0)
      L(this, 'firstScrollTop', 0)
      L(this, 'sceollHande')
    }
    dragStart(t, n) {
      var o, s, l
      this.createDraggingObject(t, n)
      const r = (o = this.draggingController) == null ? void 0 : o.getEventNode(t)
      ;(this.firstTopPosition = r.getBoundingClientRect().top),
        (this.firstScrollTop = (s = this.container.querySelector('#fec-scroll-wrapper')) == null ? void 0 : s.scrollTop)
      const i = this
      ;(this.sceollHande = () => {
        i.hasScrolled = !0
      }),
        (l = this.container.querySelector('#fec-scroll-wrapper')) == null || l.addEventListener('scroll', i.sceollHande)
    }
    mouseMove(t) {
      var i, o, s
      const n =
        ((i = this.container.querySelector('#fec-scroll-wrapper')) == null ? void 0 : i.scrollTop) - this.firstScrollTop
      if ((n != 0 && (this.hasScrolled = !0), (this.hasMouseMoved = !0), !this.draggingController)) return
      this.isDragging ||
        ((this.isDragging = !0),
        (o = this.container.querySelector('#full-event-calendar-core')) == null ||
          o.classList.add('fec-calendar-draging'),
        this.draggingController.setEelementOpacity('0.3'))
      const r = this.getPreviewNode()
      if (r) {
        const l = t.clientY - r.getBoundingClientRect().top,
          a = (s = this.container.querySelector('.fec-time-range')) == null ? void 0 : s.offsetHeight,
          c = Cl.previewAndEventTimeDiff(this.firstTopPosition - n, t.clientY - l, a)
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
  Ol = class extends no {
    constructor() {
      super(...arguments)
      L(this, 'hasMouseMoved', !1)
      L(this, 'hasScrolled', !1)
      L(this, 'prevX', 0)
      L(this, 'FirstBottomY', 0)
      L(this, 'rect', null)
    }
    dragStart(t, n) {
      var r, i
      this.createDraggingObject(t, n),
        (this.prevX = t.y),
        (this.FirstBottomY = (r = this.draggingController) == null ? void 0 : r.getEelementReact(t).bottom),
        (this.rect = (i = this.draggingController) == null ? void 0 : i.getEelementReact(t))
    }
    mouseMove(t) {
      var c, u, f, d, g, D
      this.hasMouseMoved = !0
      const n = this.rect,
        r = (c = this.draggingController) == null ? void 0 : c.getEventNode(t)
      r.style.zIndex = '50'
      let i = this.prevX - t.y
      const o = n.height - i
      r.style.height = o + 'px'
      const l =
        ((r.getBoundingClientRect().bottom - this.FirstBottomY) * 60) /
        ((u = this.draggingController) == null ? void 0 : u.oneHourInPixelSize)
      ;(f = this.draggingController) == null || f.shiftEndTime(l * 6e4)
      const a = (d = this.draggingController) == null ? void 0 : d.getEventTimeDetailesNode(t)
      a &&
        (a.innerHTML = Qi(
          (g = this.draggingController) == null ? void 0 : g.dragedStartDate,
          (D = this.draggingController) == null ? void 0 : D.dragedEndDate,
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
  L0 = class extends no {
    constructor() {
      super(...arguments)
      L(this, 'hasMouseMoved', !1)
      L(this, 'hasScrolled', !1)
      L(this, 'resizer', null)
      L(this, 'event', null)
    }
    dragStart(t, n) {
      ;(this.resizer = new Ol(this.container)), (this.event = n)
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
  Fl = class {
    constructor(e, t) {
      L(this, 'dragger')
      switch (e) {
        case 'DailyDragDrop':
          this.dragger = new ls(t)
          break
        case 'eventResizer':
          this.dragger = new Ol(t)
          break
        case 'addEventWithResize':
          this.dragger = new L0(t)
          break
        default:
          this.dragger = new ls(t)
          break
      }
    }
  }
function I0(e, t, n, r, i) {
  function o() {
    return e.current.clientWidth + 'px'
  }
  let s, l
  const [a, c] = he(!1),
    [u, f] = he(),
    d = Ue()
  function g(E, U) {
    r &&
      ((l = new Fl('DailyDragDrop', d)),
      l.dragger.dragStart(U, E),
      !a() &&
        ((s = new hd(n, D, v)),
        it(() => {
          f(l.dragger.draggingController)
        })))
  }
  function D(E) {
    r &&
      s.mouseDown &&
      (f({ ...l.dragger.draggingController, width: o() }), l.dragger.mouseMove(E), c(l.dragger.isDragging))
  }
  function v(E) {
    var U, R
    r &&
      (l.dragger.hasScrolled
        ? D(E)
        : l.dragger.hasMouseMoved ||
          i(
            (U = l.dragger.draggingController) == null ? void 0 : U.event,
            (R = l.dragger.draggingController) == null ? void 0 : R.getEventNode()
          ),
      l.dragger.dragEnd(E),
      a() && (s.isMouseoutsideTheContainer || t(l.dragger.draggingController), F(E)),
      s.removeListenrs())
  }
  let w = 0,
    S = 0
  function M() {
    clearTimeout(w), clearTimeout(S)
  }
  function F(E) {
    var R
    M()
    const U = l.dragger.draggingController
    ;(R = l.dragger.draggingController) == null || R.setEelementOpacity('0.3'),
      (w = setTimeout(() => {
        var T, N
        ;(T = l.dragger.draggingController) == null || T.setEelementOpacity('0.3')
        let p = (N = l.dragger.draggingController) == null ? void 0 : N.getEventNode(E)
        Br.setState(U, p), f(U)
      }, 0)),
      (S = setTimeout(() => {
        var p
        it(() => {
          f(null), c(!1)
        }),
          (p = l.dragger.draggingController) == null || p.setEelementOpacity('')
      }, 500))
  }
  return (
    st(() => {
      M()
    }),
    { draggedData: u, isDragging: a, itemDragstart: g }
  )
}
function Ll(e, t, n, r) {
  const [i, o] = he(),
    s = Ue()
  function l(a, c) {
    if (!n) return
    const u = new Fl(e, s)
    c.stopPropagation(),
      u.dragger.dragStart(c, a),
      window.addEventListener('mousemove', f),
      window.addEventListener('mouseup', d)
    function f(g) {
      u.dragger.mouseMove(g), r && r(), o(u.dragger.draggingController)
    }
    function d(g) {
      var v, w, S
      o(null), u.dragger.dragEnd(g)
      const D = { ...((v = u.dragger.draggingController) == null ? void 0 : v.item.sourceEvent) }
      ;(D.end = (w = u.dragger.draggingController) == null ? void 0 : w.eventSourceEnd),
        (D.start = (S = u.dragger.draggingController) == null ? void 0 : S.eventSourceStart),
        t(D),
        u.dragger.hasMouseMoved,
        window.removeEventListener('mousemove', f),
        window.removeEventListener('mouseup', d)
    }
  }
  return { onmousedownH: l, draggedData: i }
}
var R0 = P('<div class=fec-daily-timeBar><div class=fec-daily-timeBar-ball>'),
  P0 = (e) => {
    const [t, n] = he(0)
    Ot(() => {
      const s = e.container.current.clientHeight / 24 / 60,
        a = (new Date().getHours() * 60 + new Date().getMinutes()) * s
      n(a)
    })
    let r = setInterval(() => {
      const s = e.container.current.clientHeight / 24 / 60,
        a = (new Date().getHours() * 60 + new Date().getMinutes()) * s
      n(a)
    }, 6e4)
    st(() => {
      clearInterval(r)
    })
    function i() {
      return `top:${t()}px`
    }
    return (() => {
      var o = R0()
      return re((s) => Ae(o, i(), s)), o
    })()
  },
  N0 = P(
    '<div><div style=position:sticky;top:0px;bottom:30px class="tooltip-multiline fec-event-info"><div class="fec-item-trunctae fec-event-name"></div><div><span class=event-time-detals></span></div></div><div class=fec-resizer>'
  ),
  Il = (e) => {
    const t = () => e.event.doesEventStartOn(e.gridDate)
    function n() {
      return t() && !e.top0 ? e.event.calculatePositionTop() : 'top:0'
    }
    const r = Q(() =>
      e.event.doesEventEndOn(e.gridDate)
        ? e.event.calculateHeight(!t())
        : `height:${2400 - e.event.getEventTopPositionIng()}%`
    )
    function i() {
      return `;background-color:${e.event.color}`
    }
    function o() {
      const l = e.event.doesEventEndOn(e.gridDate)
      if (t()) {
        if (!l) return 'border-bottom-left-radius: 0px;border-bottom-right-radius:0px'
      } else return 'border-top-left-radius: 0px;border-top-right-radius:0px'
      return ''
    }
    function s() {
      const l = e.event.calculateHeightPersentage(!t())
      return (e.oneHoureInPixel * l) / 100 < 40
    }
    return (() => {
      var l = N0(),
        a = l.firstChild,
        c = a.firstChild,
        u = c.nextSibling,
        f = u.firstChild,
        d = a.nextSibling
      return (
        (l.$$mousedown = (g) => {
          Wi(g) && e.onDragStart(e.event, g, !t())
        }),
        x(c, () => e.event.name),
        x(f, () => Qi(e.event.start, e.event.end, e.locale)),
        (d.$$mousedown = e.onMouseDown),
        (d.$$mousedownData = e.event),
        re(
          (g) => {
            var D = 'event-' + e.event.id,
              v = `fec-event ${s() ? 'fec-one-line-event ' : ''} `,
              w = e.event.id,
              S = `${n()} ;${r()} ;${e.width} ;${i()};${o()}`,
              M = 'event-end-' + e.event.id
            return (
              D !== g.e && be(l, 'id', (g.e = D)),
              v !== g.t && lt(l, (g.t = v)),
              w !== g.a && be(l, 'data-test-event-id', (g.a = w)),
              (g.o = Ae(l, S, g.o)),
              M !== g.i && be(f, 'id', (g.i = M)),
              g
            )
          },
          { e: void 0, t: void 0, a: void 0, o: void 0, i: void 0 }
        ),
        l
      )
    })()
  }
Oe(['mousedown'])
var H0 = P('<div class=fec-add-event-preview>'),
  U0 = P(
    '<div class="fec-time-range "><div class=fec-some-container><div class=fec-time-rage-up-container><div></div><div></div></div><div class=fec-time-rage-down-container><div></div><div>'
  ),
  j0 = (e) => {
    let t = null
    const { onmousedownH: n, draggedData: r } = Ll('addEventWithResize', i, e.editable)
    function i(l) {
      if (!e.editable) return
      const a = Xi(new Xe(l), e.timeZone)
      ;(a.id = Ln()),
        e.stopAddEvent ? (e.setContainerRef(t), e.setEventPreview(a, e.houre)) : e.setEventPreview(null, null),
        e.onAddEvent(a)
    }
    function o(l, a, c) {
      if (e.showModal) return
      const u = new Date(e.gridDate),
        f = new Date(e.gridDate)
      u.setHours(l, a), f.setHours(l, a + 15)
      let d = { start: u, end: f, name: Ut(e.locale, 'no_title'), id: Ln() }
      e.group && (d.groups = [e.group.id])
      const g = new Xe(d)
      e.setEventPreview(g, e.houre), n(g, c)
    }
    function s(l) {
      return `top:${l.getMinutes() + 'px'}`
    }
    return (() => {
      var l = U0(),
        a = l.firstChild,
        c = a.firstChild,
        u = c.firstChild,
        f = u.nextSibling,
        d = c.nextSibling,
        g = d.firstChild,
        D = g.nextSibling
      return (
        x(
          l,
          $(ge, {
            get when() {
              return e.eventPreviewData
            },
            get children() {
              var v = H0(),
                w = t
              return (
                typeof w == 'function' ? me(w, v) : (t = v),
                x(
                  v,
                  $(Il, {
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
                re((S) => {
                  var M
                  return Ae(v, s((M = e.eventPreviewData) == null ? void 0 : M.start), S)
                }),
                v
              )
            }
          }),
          a
        ),
        (u.$$mousedown = (v) => o(e.houre, 0, v)),
        (f.$$mousedown = (v) => o(e.houre, 15, v)),
        (g.$$mousedown = (v) => o(e.houre, 30, v)),
        (D.$$mousedown = (v) => o(e.houre, 45, v)),
        re(() => be(l, 'data-test-time-range-id', e.houre + 1)),
        l
      )
    })()
  }
Oe(['mousedown'])
var G0 = (e) => {
    let [t, n] = he(null)
    const {
      modalElementNode: r,
      setSlotModalData: i,
      openSlotModalOnElement: o,
      slotModalData: s,
      isSlotModalOpen: l
    } = kt('addModal', a)
    function a() {
      i(null), n(null)
    }
    function c(d, g) {
      e.editable && (n(g), i(d))
    }
    const u = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23]
    function f(d) {
      return d === t() ? s() : null
    }
    return [
      r,
      $(ve, {
        each: u,
        children: (d, g) =>
          $(j0, {
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
            setContainerRef: o,
            get showModal() {
              return l()
            },
            get stopAddEvent() {
              return e.stopAddEvent
            }
          })
      })
    ]
  },
  Z0 = P('<div class="drag-element fec-event drag-element-grabbiing"><div> </div><div>'),
  V0 = P('<div class=fec-basic-grid><div class=fec-daily-grid><div class="fec-preview-wrapper fec-dragger-wrapper">'),
  K0 = P('<div class=fec-events-holder>'),
  z0 = P('<div class="fec-event-colom ">'),
  q0 = {
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
  Rl = (e) => {
    let t = { current: '' },
      n = { curret: '' }
    const r = mt(q0, e),
      { onmousedownH: i } = Ll('eventResizer', v, r.editable),
      { draggedData: o, isDragging: s, itemDragstart: l } = I0(t, D, n, r.editable, F),
      { modalElementNode: a, setSlotModalData: c, openSlotModalOnElement: u, isSlotModalOpen: f } = kt('eventClick')
    Ot(() => {
      setTimeout(() => {
        r.container ? (n.current = g == null ? void 0 : g.querySelector('#' + r.container)) : (n.current = t.current)
      }, 0)
    })
    const d = Q(() => k0(r.events)),
      g = Ue()
    function D(E) {
      var R
      const U = { ...((R = E.item) == null ? void 0 : R.sourceEvent) }
      ;(U.start = E.eventSourceStart), (U.end = E.eventSourceEnd), E.item && r.onEventUpdate(U, E)
    }
    function v(E) {
      r.onEventUpdate(E)
    }
    function w() {
      return `width : ${o().width};height : ${o().height};left:${o().left} ; transition : ${o().animation};${
        o().animation ? 'box-shadow: none;opacity:0.9' : ''
      } ;top:${o().top};position:fixed;background-color:${o().item.color}`
    }
    function S() {
      return r.gridHeight / 24
    }
    function M() {
      return `height:${S()}px`
    }
    function F(E, U) {
      r.onEventClick(E), c(E), u(U)
    }
    return [
      a,
      (() => {
        var E = V0(),
          U = E.firstChild,
          R = U.firstChild,
          p = t.current
        return (
          typeof p == 'function' ? me(p, E) : (t.current = E),
          x(
            E,
            $(ve, {
              get each() {
                return d()
              },
              children: (T) =>
                (() => {
                  var N = K0()
                  return (
                    x(
                      N,
                      $(ve, {
                        get each() {
                          return Object.values(T)
                        },
                        children: (A, Z) =>
                          (() => {
                            var te = z0()
                            return (
                              x(
                                te,
                                $(ve, {
                                  each: A,
                                  children: (le) =>
                                    $(Il, {
                                      get locale() {
                                        return r.locale
                                      },
                                      event: le,
                                      get oneHoureInPixel() {
                                        return S()
                                      },
                                      get gridDate() {
                                        return r.gridDate
                                      },
                                      get width() {
                                        return F0(T, le, Z() + 1)
                                      },
                                      onMouseDown: i,
                                      onDragStart: l
                                    })
                                })
                              ),
                              re(() => be(te, 'data-test-col-id', Z())),
                              te
                            )
                          })()
                      })
                    ),
                    re((A) => Ae(N, M(), A)),
                    N
                  )
                })()
            }),
            U
          ),
          x(
            U,
            $(ge, {
              get when() {
                return xl(r.gridDate)
              },
              get children() {
                return $(P0, { container: t })
              }
            }),
            R
          ),
          x(
            U,
            $(G0, {
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
                return S()
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
            R
          ),
          x(
            R,
            $(ge, {
              get when() {
                return s()
              },
              get children() {
                var T = Z0(),
                  N = T.firstChild
                N.firstChild
                var A = N.nextSibling
                return (
                  x(
                    N,
                    () => {
                      var Z
                      return (Z = o().item) == null ? void 0 : Z.name
                    },
                    null
                  ),
                  x(A, () => Qi(o().dragedStartDate, o().dragedEndDate, r.locale)),
                  re(
                    (Z) => {
                      var _e
                      var te = 'draging-event-' + ((_e = o().item) == null ? void 0 : _e.id),
                        le = w()
                      return te !== Z.e && be(T, 'id', (Z.e = te)), (Z.t = Ae(T, le, Z.t)), Z
                    },
                    { e: void 0, t: void 0 }
                  ),
                  T
                )
              }
            })
          ),
          re(
            (T) => {
              var N = r.id,
                A = `height: ${r.gridHeight}px`,
                Z = M()
              return N !== T.e && be(E, 'id', (T.e = N)), (T.t = Ae(U, A, T.t)), (T.a = Ae(R, Z, T.a)), T
            },
            { e: void 0, t: void 0, a: void 0 }
          ),
          E
        )
      })()
    ]
  }
function W0(e, t, n) {
  let r = 0
  for (let i = 0; i < e.length; i++) {
    const o = n.querySelector('#' + e[i])
    if (!o) return r
    const s = o.getBoundingClientRect()
    if (s.left < t && s.right > t) {
      r = i
      break
    }
  }
  return r
}
he(!1)
var Y0 = Vi()
function X0() {
  var e
  return (e = Sr(Y0)) == null ? void 0 : e.calendarContainer
}
var J0 = P('<div style=display:flex;width:100%;flex:1; id=fec-group-grid-container>'),
  Q0 = {
    events: [],
    initialDate: new Date(),
    cols: [],
    hasCrossGridDrag: !0,
    onEventUpdate: () => {},
    onAddEvent: () => {}
  },
  Pl = (e) => {
    let t
    const n = mt(Q0, e)
    let r = n.cols.map((l, a) => `cl-${a}`)
    const i = e.container ?? X0()
    function o(l, a, c) {
      if (a != null && a.isDragg) {
        const u = W0(r, a.mouseX, i)
        n.onEventUpdate(l, u, c, !0)
      } else n.onEventUpdate(l, c, c, !1)
    }
    const s = Q(
      fl(
        () => n.cols,
        (l, a) =>
          $(
            ml,
            mt(
              {
                get component() {
                  return n.gridComponent
                },
                onEventUpdate: (c, u) => {
                  o(c, u, a())
                },
                get onAddEvent() {
                  return n.onAddEvent
                },
                get id() {
                  return r[a()]
                },
                get container() {
                  return n.hasCrossGridDrag ? 'fec-group-grid-container' : ''
                }
              },
              () => l.props
            )
          )
      )
    )
    return (() => {
      var l = J0(),
        a = t
      return typeof a == 'function' ? me(a, l) : (t = l), x(l, s), l
    })()
  },
  eh = P('<div style=flex:1;height:100%;display:flex;flex-direction:column;><div style=" display:flex;">'),
  Nl = {
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
  th = (e) => {
    const t = mt(Nl, e),
      n = Q(() => t.events.filter((i) => !i.isAllDay()))
    function r(i) {
      t.group ? t.onAddEvent(i, t.group.id) : t.onAddEvent(i)
    }
    return (() => {
      var i = eh(),
        o = i.firstChild
      return (
        x(
          o,
          $(Rl, {
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
        re(
          (s) => {
            var l = e.id,
              a = e.id
            return l !== s.e && be(i, 'id', (s.e = l)), a !== s.t && be(i, 'data-test-id-daily-grid', (s.t = a)), s
          },
          { e: void 0, t: void 0 }
        ),
        i
      )
    })()
  },
  nh = P('<div><div class=fec-weekend-narrow></div><div class=fec-week-day>'),
  rh = P('<div>'),
  Hl = (e) => {
    let t = { el: null }
    function n(o) {
      o.stopPropagation(), o.preventDefault(), e.onDateChange(e.headerDate)
    }
    const r = () => ({ date: e.headerDate, ondataChange: e.onDateChange }),
      { isSlotAvalibale: i } = ct(t, r, 'dailyHeader', () => e.headerDate)
    return (() => {
      var o = rh(),
        s = t.el
      return (
        typeof s == 'function' ? me(s, o) : (t.el = o),
        x(
          o,
          $(ge, {
            when: !i,
            get children() {
              var l = nh(),
                a = l.firstChild,
                c = a.nextSibling
              return (
                x(a, () => Al(e.headerDate, e.calendar, e.timeZone, e.locale)),
                (c.$$click = n),
                x(c, () => $d(e.locale, e.calendar, e.timeZone, e.headerDate)),
                re(() => lt(l, `fec-daily-header ${xl(e.headerDate) ? 'fec-daily-header-today' : ' '}`)),
                l
              )
            }
          })
        ),
        o
      )
    })()
  }
Oe(['click'])
var ih = P(
    '<div class=fec-all-collapser><svg xmlns=http://www.w3.org/2000/svg width=16 height=16 viewBox="0 0 16 16"fill=none><path d="M13.28 10.0333L8.93333 5.68667C8.42 5.17333 7.58 5.17333 7.06667 5.68667L2.72 10.0333"stroke=#7E7E7F stroke-width=1.5 stroke-miterlimit=10 stroke-linecap=round stroke-linejoin=round>'
  ),
  oh = P('<div class=more-btn><div class=more-wrapper> +'),
  sh = P(
    '<div><div class=more-btn-container style=width:52px></div><div class=fec-all-day-container style=height:fit-content;max-height:81px;overflow:hidden;>'
  ),
  lh = P('<div>'),
  ah = (e) => {
    const t = Q(() => Mr(e.events.filter((d) => d.isAllDay()))),
      { modalElementNode: n, setSlotModalData: r, openSlotModalOnElement: i, isSlotModalOpen: o } = kt('eventClick')
    let s,
      l = 0
    function a() {
      e.setIsAllDOpen(!e.isAllDOpen)
    }
    let c = !1
    gt(
      On(
        () => e.isAllDOpen,
        () => {
          const d = s
          if (d)
            if (e.isAllDOpen) {
              if (((l = d.clientHeight), (d.style.height = d.clientHeight + 'px'), (d.style.maxHeight = 'initial'), !c))
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
                ;(d.style.height = l + 'px'), (d.style.overflow = 'hidden')
              }, 0),
                setTimeout(() => {
                  ;(d.style.height = 'fit-content'), (d.style.maxHeight = '81px')
                }, 500)
            }
        }
      )
    ),
      gt(
        On(
          () => e.events,
          () => {
            if (!(t().length > 0)) {
              const d = s
              if (!d) return
              d.style.height = 'fit-content'
            }
          }
        )
      ),
      Ot(() => {
        c = !0
      })
    function f(d, g) {
      e.onEventClick(d), r(d), i(g.target)
    }
    return [
      n,
      $(ge, {
        get when() {
          return t().length > 0
        },
        get children() {
          var d = sh(),
            g = d.firstChild,
            D = g.nextSibling
          x(
            g,
            $(ge, {
              get when() {
                return t().length > 2
              },
              get children() {
                var w = ih()
                return (w.$$click = a), w
              }
            })
          )
          var v = s
          return (
            typeof v == 'function' ? me(v, D) : (s = D),
            x(
              D,
              $(ve, {
                get each() {
                  return t()
                },
                children: (w) =>
                  (() => {
                    var S = lh()
                    return (
                      (S.$$click = f),
                      (S.$$clickData = w),
                      x(S, () => `${w.name} `),
                      re(
                        (M) => {
                          var F = w.id,
                            E = `background-color:${w.color}`,
                            U = `all-day-wrapper ${_l(w, e.initialDate)}`
                          return (
                            F !== M.e && be(S, 'data-testid', (M.e = F)),
                            (M.t = Ae(S, E, M.t)),
                            U !== M.a && lt(S, (M.a = U)),
                            M
                          )
                        },
                        { e: void 0, t: void 0, a: void 0 }
                      ),
                      S
                    )
                  })()
              }),
              null
            ),
            x(
              D,
              $(ge, {
                get when() {
                  return t().length > 2
                },
                get children() {
                  var w = oh(),
                    S = w.firstChild,
                    M = S.firstChild
                  return (w.$$click = a), x(S, () => Ht(e.locale, t().length - 2), M), w
                }
              }),
              null
            ),
            re(() => lt(d, `all-d-wrapeer-header ${e.isAllDOpen ? 'alld-open' : 'fec-alld-not-open'}`)),
            d
          )
        }
      })
    ]
  }
Oe(['click'])
var uh = P('<div class=fec-groupContainer><div class=fec-group-name></div><div class=fec-group-avatar> '),
  ch = P('<div class=fec-some-border>'),
  dh = P('<div class=fec-some-borderw>'),
  fh = P('<div style=position:relative>'),
  hh = (e) => {
    const t = () => ({ group: e.group })
    let n = { el: null }
    const { isSlotAvalibale: r } = ct(n, t, 'groupContainer', () => e.group)
    return (() => {
      var i = fh(),
        o = n.el
      return (
        typeof o == 'function' ? me(o, i) : (n.el = i),
        x(
          i,
          $(ge, {
            when: !r,
            get children() {
              return [
                (() => {
                  var s = uh(),
                    l = s.firstChild,
                    a = l.nextSibling
                  return a.firstChild, x(l, () => e.group.name), x(a, () => e.group.name[0], null), s
                })(),
                ch(),
                dh()
              ]
            }
          })
        ),
        i
      )
    })()
  },
  gh = P('<div style=display:flex;position:relative><div class=fec-group-item-header>'),
  mh = P('<div class=fec-alld-main-container>'),
  vh = {
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
  Dh = (e) => {
    const t = mt(vh, e),
      [n, r] = he(!1)
    return [
      (() => {
        var i = gh(),
          o = i.firstChild
        return (
          x(
            i,
            $(Hl, {
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
            o
          ),
          x(
            o,
            $(ve, {
              get each() {
                return t.columData
              },
              children: (s) =>
                $(ge, {
                  get when() {
                    return s.props.group
                  },
                  get children() {
                    return $(hh, {
                      get group() {
                        return s.props.group
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
        var i = mh()
        return (
          x(
            i,
            $(ve, {
              get each() {
                return t.columData
              },
              children: (o) =>
                $(ah, {
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
                    return o.props.events
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
function yh(e, t) {
  const n = pl([
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
    for (let o = 0; o < e.groups.length; o++)
      if (!n[o]) {
        let s = {
          props: { events: [], initialDate: null, locale: null, timeZone: null, calendar: null, showAllDay: !1 }
        }
        n.push(s)
      }
  }
  function i() {
    if ((r(), e.groups.length > 0))
      for (let o = 0; o < e.groups.length; o++) {
        const s = e.groups[o].id,
          l = e.events.filter((a) => a.groups.includes(s))
        ;(n[o].props.events = Rn(l, e.initialDate)),
          (n[o].props.initialDate = new Date(e.initialDate)),
          (n[o].props.gridDate = new Date(e.initialDate)),
          (n[o].props.locale = e.locale),
          (n[o].props.timeZone = e.timeZone),
          (n[o].props.calendar = e.calendar),
          (n[o].props.gridHeight = e.gridHeight),
          (n[o].props.showAllDay = !0),
          (n[o].props.editable = e.editable),
          (n[o].props.avalibalSots = e.avalibalSots),
          (n[o].props.onDateChange = t),
          (n[o].props.group = e.groups[o]),
          (n[o].props.slotRenderStore = e.slotRenderStore),
          (n[o].props.stopAddEvent = e.stopAddEvent),
          (n[o].props.onEventClick = e.onEventClick)
      }
    else
      (n[0].props.events = Rn(e.events, e.initialDate)),
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
  return gt(i), { columData: n, generageCols: i }
}
var Eh = P(
    '<div class="fec-scroll-wrapper "id=fec-scroll-wrapper><div style=position:absolute;width:100%;display:flex;>'
  ),
  wh = { ...Nl, groups: [] },
  ph = (e) => {
    const t = mt(wh, e),
      n = Ue()
    function r(s) {
      t.onDateChange(s)
    }
    const { columData: i } = yh(t, r)
    function o(s, l) {
      l ? t.onAddEvent({ ...s, groups: [l] }) : t.onAddEvent(s)
    }
    return [
      $(Dh, {
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
        var s = Eh(),
          l = s.firstChild
        return (
          x(
            l,
            $(Ul, {
              get locale() {
                return t.locale
              }
            }),
            null
          ),
          x(
            l,
            $(Pl, {
              gridComponent: th,
              cols: i,
              get onEventUpdate() {
                return t.onEventUpdate
              },
              onAddEvent: o,
              get initialDate() {
                return t.initialDate
              },
              hasCrossGridDrag: !1,
              container: n
            }),
            null
          ),
          s
        )
      })()
    ]
  },
  Ch = P('<div class="fec-daily-time-ranges ">'),
  _h = P('<div class=fec-time-range-time>'),
  Ah = P('<div class=fec-time-range-hairline>'),
  bh = P('<div>'),
  xh = [
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
  Ul = (e) =>
    (() => {
      var t = Ch()
      return (
        x(
          t,
          $(ve, {
            each: xh,
            children: (n) =>
              $(Sh, {
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
  Sh = (e) => {
    let t = { el: null }
    const n = () => ({ time: e.time }),
      { isSlotAvalibale: r } = ct(t, n, 'timeRange', () => {})
    return (() => {
      var i = bh(),
        o = t.el
      return (
        typeof o == 'function' ? me(o, i) : (t.el = i),
        x(
          i,
          $(ge, {
            when: !r,
            get children() {
              return [
                (() => {
                  var s = _h()
                  return (
                    x(
                      s,
                      (() => {
                        var l = Q(() => !!e.time)
                        return () => (l() && Yi(e.time, e.locale)) || ''
                      })()
                    ),
                    s
                  )
                })(),
                Ah()
              ]
            }
          })
        ),
        i
      )
    })()
  },
  $h = { code: ph, name: 'daily', type: 'grid' }
function jl(e, t) {
  const n = Dt(t)
  return e.start >= n ? e.start.getDay() : 0
}
function Gl(e, t, n) {
  if (e.isAllDay && !e.isAllDay()) return 1
  const r = dt(t)
  return e.end <= r ? e.end.getDay() - n + 1 : 6 - n + 1
}
function Zl(e, t, n, r) {
  let i = [0, 0, 0, 0, 0, 0, 0]
  const o = Object.keys(e).filter((s, l) => l + 1 > r)
  for (let s = 0; s < o.length; s++) {
    const l = e[o[s]]
    for (let a = 0; a < l.length; a++) {
      const c = l[a],
        u = Q(() => jl(c, t)),
        f = Gl(c, n, u())
      for (let d = u(); d < f + u(); d++) i[d] = i[d] + 1
    }
  }
  return i
}
var Th = P('<div class="fec-modal-event-list fec-custome-scroll-bar ">'),
  Bh = P('<div><div class=fec-event-time-month></div><div class=fec-event-name-month>'),
  Mh = (e) => {
    function t(u, f) {
      const d = (g) => {
        var D
        return !u.contains(g.target) && ((D = f()) == null ? void 0 : D())
      }
      document.addEventListener('click', d), st(() => document.removeEventListener('click', d))
    }
    function n() {
      const u = { ...e.modalData }
      ;(u.show = !1), e.setModalData(u)
    }
    let r = null
    const i = Ue()
    function o() {
      var u
      document.removeEventListener('mouseup', o),
        document.removeEventListener('mousemove', s),
        (u = i == null ? void 0 : i.querySelector('#fec-month-wrapper-id')) == null ||
          u.classList.remove('fec-month-is-dragging'),
        e.onDragEnd(),
        (r = null)
    }
    function s(u) {
      r && e.onDragStart(e.modalData.somDate, u, r)
    }
    function l(u) {
      var f
      ;(r = u),
        document.addEventListener('mouseup', o),
        document.addEventListener('mousemove', s),
        (f = i == null ? void 0 : i.querySelector('#fec-month-wrapper-id')) == null ||
          f.classList.add('fec-month-is-dragging')
    }
    function a(u) {
      return u != null && u.isAllDay ? (u != null && u.isAllDay() ? '' : 'fec-month-item-no-all-day') : ''
    }
    function c(u, f) {
      f.stopPropagation(), f.preventDefault(), e.eventClick(u, f)
    }
    return $(ge, {
      get when() {
        return e.modalData.show
      },
      get children() {
        var u = Th()
        return (
          me(t, u, () => n),
          x(
            u,
            $(ve, {
              get each() {
                return e.modalData.events
              },
              children: (f) =>
                (() => {
                  var d = Bh(),
                    g = d.firstChild,
                    D = g.nextSibling
                  return (
                    (d.$$mousedown = l),
                    (d.$$mousedownData = f),
                    (d.$$click = c),
                    (d.$$clickData = f),
                    x(g, () => `${a(f) ? Yi(f.start, e.locale) : ''} `),
                    x(D, () => (a(f) ? `(${f.name})` : f.name)),
                    re(
                      (v) => {
                        var w = `fec-modal-event ${a(f)} ${_l(f, e.modalData.somDate)}`,
                          S = `background:${f.color};--ca-color:${f.color}`
                        return w !== v.e && lt(d, (v.e = w)), (v.t = Ae(d, S, v.t)), v
                      },
                      { e: void 0, t: void 0 }
                    ),
                    d
                  )
                })()
            })
          ),
          re((f) => Ae(u, `left:${e.modalData.left};top:${e.modalData.bottom};`, f)),
          u
        )
      }
    })
  }
Oe(['click', 'mousedown'])
var kh = P('<div class=fec-month-header><div></div><div></div><div></div><div></div><div></div><div></div><div>'),
  Oh = (e) => {
    function t(n) {
      return Al(n, e.calendar, e.timeZone, e.locale)
    }
    return (() => {
      var n = kh(),
        r = n.firstChild,
        i = r.nextSibling,
        o = i.nextSibling,
        s = o.nextSibling,
        l = s.nextSibling,
        a = l.nextSibling,
        c = a.nextSibling
      return (
        x(r, () => t(e.headerData[0].date)),
        x(i, () => t(e.headerData[1].date)),
        x(o, () => t(e.headerData[2].date)),
        x(s, () => t(e.headerData[3].date)),
        x(l, () => t(e.headerData[4].date)),
        x(a, () => t(e.headerData[5].date)),
        x(c, () => t(e.headerData[6].date)),
        n
      )
    })()
  }
function Fh(e, t) {
  const n = [],
    r = []
  for (let i = 0; i < e.length; i++) {
    const o = Or(t, e[i][0].date, e[i][6].date)
    n.push(o)
  }
  for (let i = 0; i < n.length; i++) {
    const o = n[i]
    let s = {}
    ro(o, s), r.push(s)
  }
  return r
}
function ro(e, t) {
  for (let n = 0; n < e.length; n++) {
    const r = e[n]
    Lh(t, r)
  }
}
function Lh(e, t) {
  let n = !1
  function r(i, o, s) {
    if (n) return
    i[o] || (i[o] = [])
    const l = i[o]
    Ih(l, s) ? ((n = !0), i[o].push(s)) : r(i, o + 1, s)
  }
  r(e, 0, t)
}
function Ih(e, t) {
  let n = !0
  for (let r = 0; r < e.length; r++)
    if (e[r].checkAllDayOverLap(t)) {
      n = !1
      break
    }
  return n
}
var Vl = class {
    constructor(e) {
      L(this, 'container')
      this.container = e
    }
  },
  as = class extends Vl {
    constructor() {
      super(...arguments)
      L(this, 'draggingController', null)
      L(this, 'startingDate', null)
      L(this, 'currentDate', null)
    }
    onDragStart(t, n, r) {
      ;(this.draggingController = new Br(n, t, this.container)), r && (this.startingDate = r)
    }
    onMouseEnter(t, n) {
      var r
      if (this.startingDate) {
        let i = bl(this.startingDate, t)
        this.currentDate != i &&
          ((this.currentDate = i), (r = this.draggingController) == null || r.shiftTimeByDay(i), n())
      } else this.startingDate = t
    }
    onDragEnd() {
      this.startingDate = null
    }
  },
  Rh = class extends Vl {
    constructor() {
      super(...arguments)
      L(this, 'draggingController', null)
      L(this, 'startingDate', null)
      L(this, 'currentDate', null)
    }
    onDragStart(t, n, r) {
      ;(this.draggingController = new Br(n, t, this.container)), r && (this.startingDate = r)
    }
    onMouseEnter(t, n) {
      var r, i, o, s, l, a
      if (this.startingDate) {
        let c = bl(this.startingDate, t)
        this.currentDate != c &&
          ((this.currentDate = c),
          c < 0
            ? ((r = this.draggingController) == null || r.shiftStartByDay(c),
              (i = this.draggingController) == null || i.shiftEndByDay(0))
            : c > 0
            ? ((o = this.draggingController) == null || o.shiftEndByDay(c),
              (s = this.draggingController) == null || s.shiftStartByDay(0))
            : ((l = this.draggingController) == null || l.shiftEndByDay(c),
              (a = this.draggingController) == null || a.shiftStartByDay(c)),
          n())
      } else this.startingDate = t
    }
    onDragEnd() {
      this.startingDate = null
    }
  },
  us = class {
    constructor(e, t) {
      L(this, 'dragger')
      L(this, 'draggerMode')
      switch (((this.draggerMode = e), e)) {
        case 'editEventRow':
          this.dragger = new as(t)
          break
        case 'addEventRow':
          this.dragger = new Rh(t)
          break
        default:
          this.dragger = new as(t)
          break
      }
    }
  }
function Kl(e, t = !0, n = 'editEventRow') {
  const [r, i] = he(null)
  let o = new us(n, Ue())
  function s(f, d, g) {
    t && (o.dragger.onDragStart(f, d, g), r() || i(o.dragger.draggingController))
  }
  function l(f) {
    t &&
      r() &&
      o.dragger.onMouseEnter(f, () => {
        i(null), i(o.dragger.draggingController)
      })
  }
  function a(f = !0) {
    var d, g, D
    if ((o.dragger.onDragEnd(), r())) {
      const v = { ...((d = r()) == null ? void 0 : d.item.sourceEvent) }
      ;(v.start = (g = r()) == null ? void 0 : g.eventSourceStart),
        (v.end = (D = r()) == null ? void 0 : D.eventSourceEnd),
        v && e(v, o.draggerMode)
    }
    f && i(null)
  }
  const c = Ue()
  function u(f) {
    o = new us(f, c)
  }
  return {
    onDragEnd: a,
    onDragStart: s,
    onMouseEnter: l,
    draggingEventData: r,
    changeDraggerType: u,
    setDraggingEventData: i
  }
}
var Ph = P('<div class=fec-month-row-container>'),
  Nh = P('<div class=fec-month-row-wrapper>'),
  Hh = (e) => {
    function t(n) {
      return n.slice(0, e.rowLimit)
    }
    return (() => {
      var n = Ph()
      return (
        x(
          n,
          $(ve, {
            get each() {
              return t(Object.keys(e.monthRowData))
            },
            children: (r, i) =>
              (() => {
                var o = Nh()
                return (
                  x(
                    o,
                    $(ve, {
                      get each() {
                        return e.monthRowData[r]
                      },
                      children: (s) =>
                        $(io, {
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
                          item: s,
                          get endDate() {
                            return e.monthRowDates[6].date
                          },
                          get startDate() {
                            return e.monthRowDates[0].date
                          }
                        })
                    })
                  ),
                  re(() => be(o, 'data-test-id-row-wrapper', i())),
                  o
                )
              })()
          })
        ),
        re(() => be(n, 'data-test-id-fec-month-row', e.monthRowIndex)),
        n
      )
    })()
  },
  Uh = P('<div class=fec-month-more-wrapper>'),
  jh = P('<div class=fec-month-more-btn> +'),
  Gh = P('<div class=fec-month-more-item>'),
  Zh = (e) =>
    (() => {
      var t = Uh()
      return (
        x(
          t,
          $(ve, {
            get each() {
              return Zl(e.monthRowData, e.monthRowDates[0].date, e.monthRowDates[6].date, e.rowLimit)
            },
            children: (n, r) =>
              (() => {
                var i = Gh()
                return (
                  x(
                    i,
                    $(ge, {
                      when: n > 0,
                      get children() {
                        var o = jh(),
                          s = o.firstChild
                        return (
                          (o.$$click = e.openModalEvents),
                          (o.$$clickData = e.monthRowDates[r()]),
                          x(o, () => Ht(e.locale, n), s),
                          o
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
Oe(['click'])
var Vh = P('<div class=fec-month-container><div><div><span></span><div class=fec-month-name>'),
  Kh = (e) => {
    function t(r) {
      r.stopPropagation(), r.preventDefault()
    }
    function n(r, i) {
      let o = !1
      function s() {
        o || (e.monthDateMouseDown(r, i), (o = !0)), document.removeEventListener('mousemove', s)
      }
      function l() {
        document.removeEventListener('mouseup', l), document.removeEventListener('mousemove', s)
      }
      document.addEventListener('mousemove', s), document.addEventListener('mouseup', l)
    }
    return $(ve, {
      get each() {
        return e.monthRowDates
      },
      children: (r, i) =>
        (() => {
          var o = Vh(),
            s = o.firstChild,
            l = s.firstChild,
            a = l.firstChild,
            c = a.nextSibling
          return (
            (o.$$mousemove = () => e.onMouseEnter(r.date)),
            (o.$$mousedown = n),
            (o.$$mousedownData = r.date),
            (l.$$click = (u) => e.dragClick(u, r.date)),
            (l.$$mousedown = t),
            x(a, () => Ht(e.locale, r.day)),
            x(c, () => xd(e.calendar, r.date, e.locale)),
            re(() => lt(s, `fec-month-day-wrapper ${zh(r, i(), e.monthRowIndex, e.monthRowDates)}`)),
            o
          )
        })()
    })
  }
function zh(e, t, n, r) {
  var i, o
  if (e.isDateInsideMonth) {
    if (n === 0)
      return e.month != ((i = r[t + 1]) == null ? void 0 : i.month) ? 'fec-month-day-out' : 'fec-month-day-out-no-name'
    if (e.isDateInsideMonth)
      return e.month != ((o = r[t - 1]) == null ? void 0 : o.month) ? 'fec-month-day-out' : 'fec-month-day-out-no-name'
  }
  return ''
}
Oe(['mousedown', 'mousemove', 'click'])
var qh = P('<div class=fec-month-row><div class=fec-dragging-wrapper>'),
  Wh = (e) =>
    (() => {
      var t = qh(),
        n = t.firstChild
      return (
        x(
          n,
          $(zl, {
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
        x(
          t,
          $(Hh, {
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
        x(
          t,
          $(Zh, {
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
        x(
          t,
          $(Kh, {
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
  Yh = P('<div class=fec-month-wrapper id=fec-month-wrapper-id>'),
  Xh = {
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
  Jh = (e) => {
    const t = mt(Xh, e),
      [n, r] = he(4),
      [i, o] = he({ bottom: '0px', left: '0px', events: [], show: !1, somDate: new Date() })
    let s = null
    function l(j, J, De) {
      const Ee = Rn(De, j.date),
        Je = J.target.getBoundingClientRect(),
        Kt = s == null ? void 0 : s.getBoundingClientRect(),
        Qe = { ...i() }
      ;(Qe.left = Je.left + 'px'),
        j.date.getDay() === 6 ? (Qe.left = '83%') : j.date.getDay() === 0 && (Qe.left = '1%'),
        (Qe.bottom = Je.top - Kt.top + 'px'),
        (Qe.show = !0),
        (Qe.events = Ee),
        (Qe.somDate = j.date),
        o(Qe)
    }
    const {
        onDragEnd: a,
        onDragStart: c,
        onMouseEnter: u,
        draggingEventData: f,
        changeDraggerType: d,
        setDraggingEventData: g
      } = Kl(le, e.editable),
      { modalElementNode: D, setSlotModalData: v, openSlotModalOnElement: w, isSlotModalOpen: S } = kt('addModal', U),
      { modalElementNode: M, setSlotModalData: F, openSlotModalOnElement: E } = kt('eventClick')
    function U() {
      g(null)
    }
    const R = Q(() => Mr(t.events))
    function p(j, J) {
      t.onEventClick(j), F(j), E(J.target)
    }
    const T = Q(() => bd(t.initialDate, t.calendar)),
      N = Q(() => Sd(T(), 7)),
      A = Q(() => {
        let j = Math.floor(((e.containerHeight - 75 - 40) / N().length - 50 - 30) / 23)
        return r(j), Fh(N(), R())
      })
    function Z(j, J) {
      l(j, J, R())
    }
    function te(j, J, De) {
      c(De, J, j)
    }
    function le(j, J) {
      const De = Xi(new Xe(j), t.timeZone)
      J === 'editEventRow' ? t.onEventUpdate(j) : t.stopAddEvent ? v(De) : t.onAddEvent(De)
    }
    function _e(j, J) {
      j.stopPropagation(), j.preventDefault(), t.onDateChange(J), t.onGridChange('daily')
    }
    function Pe(j) {
      S() || u(j)
    }
    const ce = Ue()
    function ne(j, J) {
      if (!Wi(J)) return
      J.stopPropagation(), J.preventDefault()
      const De = new Date(j),
        Ee = new Date(j)
      De.setHours(0, 0), Ee.setHours(23, 59, 59)
      const we = new Xe({ start: De, end: Ee, name: Ut(t.locale, 'no_title'), id: Ln() })
      d('addEventRow'), c(we, J)
      const Je = () => {
        var Kt
        document.removeEventListener('mouseup', Je),
          e.stopAddEvent && !S()
            ? (v(we),
              ce &&
                w(
                  (Kt = ce.querySelector('#fec-month-wrapper-id')) == null
                    ? void 0
                    : Kt.querySelector('.fec-dragging-wrapper .fec-month-item')
                ),
              a(!1))
            : a(),
          d('editEventRow')
      }
      document.addEventListener('mouseup', Je)
    }
    return [
      D,
      M,
      $(Oh, {
        get headerData() {
          return T()
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
        var j = Yh(),
          J = s
        return (
          typeof J == 'function' ? me(J, j) : (s = j),
          x(
            j,
            $(Mh, {
              setModalData: o,
              get modalData() {
                return i()
              },
              eventClick: p,
              openEvSlotModalOnElement: E,
              setEvModalElement: F,
              get locale() {
                return t.locale
              },
              onDragEnd: a,
              onDragStart: te
            }),
            null
          ),
          x(
            j,
            $(ve, {
              get each() {
                return N()
              },
              children: (De, Ee) =>
                $(Wh, {
                  get locale() {
                    return e.locale
                  },
                  get monthRowIndex() {
                    return Ee()
                  },
                  monthRowDates: De,
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
                    return A()[Ee()]
                  },
                  openModalEvents: Z,
                  dragClick: _e,
                  onDragEnd: a,
                  onDragStart: c,
                  monthDateMouseDown: ne,
                  onMouseEnter: Pe,
                  eventClick: p
                })
            }),
            null
          ),
          j
        )
      })()
    ]
  },
  zl = (e) => {
    function t() {
      return new Qh(
        e.item.event.id,
        e.item.dragedStartDate,
        e.item.dragedEndDate,
        e.item.eventSourceEnd,
        e.item.eventSourceStart,
        e.item.event
      )
    }
    function n() {
      return e.dontCheackRange ? !0 : Td(t(), e.startDate, e.endDate)
    }
    return $(ge, {
      get when() {
        return Q(() => !!e.item)() && n()
      },
      get children() {
        return $(io, {
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
  Qh = class {
    constructor(e, t, n, r, i, o) {
      ;(this.id = e),
        (this.start = t),
        (this.end = n),
        (this.source = o),
        (this.color = o.color),
        (this.sourceStart = i),
        (this.sourceEnd = r),
        (this.name = o.name)
    }
  },
  eg = P('<div><div class=fec-event-time-month></div><div class=fec-event-name-month>'),
  io = (e) => {
    const t = Q(() => jl(e.item, e.startDate)),
      n = Gl(e.item, e.endDate, t()),
      [r, i] = he(!1),
      o = Ue()
    function s(u, f) {
      if (!Wi(f)) return
      f.stopPropagation(),
        f.preventDefault(),
        document.addEventListener('mouseup', g),
        document.addEventListener('mousemove', d)
      function d(D) {
        var v
        i(u),
          (v = o == null ? void 0 : o.querySelector('#fec-month-wrapper-id')) == null ||
            v.classList.add('fec-month-is-dragging'),
          e.ondragstart(e.item, D)
      }
      function g() {
        var D
        i(!1),
          document.removeEventListener('mouseup', g),
          document.removeEventListener('mousemove', d),
          (D = o == null ? void 0 : o.querySelector('#fec-month-wrapper-id')) == null ||
            D.classList.remove('fec-month-is-dragging'),
          e.onDragEnd()
      }
    }
    function l() {
      return `--ca-color:${e.item.color};${
        r() ? ';opacity:.7;' : ''
      };left:calc(${t()}00% + 7px);width:calc(${n}00% - 14px);background-color:${e.item.color}`
    }
    function a() {
      var u, f, d
      return (u = e == null ? void 0 : e.item) != null && u.isAllDay
        ? (f = e == null ? void 0 : e.item) != null && f.isAllDay()
          ? ''
          : 'fec-month-item-no-all-day'
        : e != null && e.item.source
        ? (d = e == null ? void 0 : e.item) != null && d.source.isAllDay()
          ? ''
          : 'fec-month-item-no-all-day'
        : ''
    }
    function c(u) {
      e.onClick && e.onClick(e.item, u)
    }
    return (() => {
      var u = eg(),
        f = u.firstChild,
        d = f.nextSibling
      return (
        (u.$$click = c),
        (u.$$mousedown = s),
        (u.$$mousedownData = !0),
        x(f, () => `${a() ? Yi(e.item.start, e.locale) : ''} `),
        x(d, () => (a() ? `(${e.item.name})` : e.item.name)),
        re(
          (g) => {
            var D = `fec-month-item ${a()} ${gd(e.item, e.startDate, e.endDate)}`,
              v = `month--item-${e.item.id}`,
              w = l(),
              S = e.item.id
            return (
              D !== g.e && lt(u, (g.e = D)),
              v !== g.t && be(u, 'id', (g.t = v)),
              (g.a = Ae(u, w, g.a)),
              S !== g.o && be(u, 'data-test-id-month-item', (g.o = S)),
              g
            )
          },
          { e: void 0, t: void 0, a: void 0, o: void 0 }
        ),
        u
      )
    })()
  }
Oe(['mousedown', 'click'])
var tg = { code: Jh, name: 'month', type: 'grid' },
  ng = P(
    '<div class=fec-all-collapser><svg xmlns=http://www.w3.org/2000/svg width=16 height=16 viewBox="0 0 16 16"fill=none><path d="M13.28 10.0333L8.93333 5.68667C8.42 5.17333 7.58 5.17333 7.06667 5.68667L2.72 10.0333"stroke=#7E7E7F stroke-width=1.5 stroke-miterlimit=10 stroke-linecap=round stroke-linejoin=round>'
  ),
  rg = P('<div class=more-btn-container style=width:51px>'),
  ig = (e) =>
    (() => {
      var t = rg()
      return (
        x(
          t,
          $(ge, {
            get when() {
              return e.show
            },
            get children() {
              var n = ng()
              return Ki(n, 'click', e.onClick, !0), n
            }
          })
        ),
        t
      )
    })()
Oe(['click'])
var og = P('<div class=fec-week-all-day-container123 data-test-id-all-w-c=1>'),
  sg = P('<div class=fec-week-all-day-container123 data-test-id-all-w-c=2>'),
  lg = P('<div class=fec-week-all-day-container123 data-test-id-all-w-c=3>'),
  ag = P('<div class=fec-week-all-day-container123 data-test-id-all-w-c=4>'),
  ug = P('<div class=fec-week-all-day-container123 data-test-id-all-w-c=5>'),
  cg = P('<div class=fec-week-all-day-container123 data-test-id-all-w-c=6>'),
  dg = P('<div class=fec-week-all-day-container123 data-test-id-all-w-c=7>'),
  fg = P('<div class=fec-week-all-day-container>'),
  hg = (e) => {
    const {
        onDragEnd: t,
        onDragStart: n,
        setDraggingEventData: r,
        onMouseEnter: i,
        draggingEventData: o,
        changeDraggerType: s
      } = Kl(E, e.editable),
      { modalElementNode: l, setSlotModalData: a, openSlotModalOnElement: c, isSlotModalOpen: u } = kt('addModal', v),
      { modalElementNode: f, setSlotModalData: d, openSlotModalOnElement: g, isSlotModalOpen: D } = kt('eventClick')
    function v() {
      r(null)
    }
    gt(() => {
      e.setDraggingDate(o)
    })
    const w = Q(() => {
      let A = {}
      return ro(e.filteredEvents, A), A
    })
    function S() {
      return Object.keys(w())
    }
    const M = Ue()
    function F(A, Z) {
      if (u()) return
      Z.stopPropagation(), Z.preventDefault()
      const te = new Date(e.headerDates[A]),
        le = new Date(e.headerDates[A])
      te.setHours(0, 0), le.setHours(23, 59, 59)
      const _e = new Xe({ start: te, end: le, name: Ut(e.locale, 'no_title'), id: Ln() })
      s('addEventRow'), n(_e, Z)
      const Pe = () => {
        document.removeEventListener('mouseup', Pe),
          e.stopAddEvent && !u()
            ? (a(_e), c(M == null ? void 0 : M.querySelector('.fec-week-all-day-wrapper .fec-month-item')), t(!1))
            : t(),
          s('editEventRow')
      }
      document.addEventListener('mouseup', Pe)
    }
    function E(A, Z) {
      const te = Xi(new Xe(A), e.timeZone)
      Z === 'editEventRow' ? e.onEventUpdate(A) : e.stopAddEvent ? a(te) : e.onAddEvent(te)
    }
    function U(A) {
      u() || i(e.headerDates[A])
    }
    function R(A, Z) {
      e.onEventClick(A), d(A), g(Z.target)
    }
    let p = !1
    function T(A, Z) {
      if (!e.editable) return
      function te() {
        p || (F(A, Z), (p = !0)), document.removeEventListener('mousemove', te)
      }
      function le() {
        document.removeEventListener('mouseup', le), document.removeEventListener('mousemove', te), (p = !1)
      }
      document.addEventListener('mousemove', te), document.addEventListener('mouseup', le)
    }
    function N(A) {
      e.editable && (p || o()) && U(A)
    }
    return (
      (e.moseEvents.enter = N),
      (e.moseEvents.down = T),
      [
        f,
        l,
        (() => {
          var A = og()
          return (
            (A.$$mousemove = () => N(0)),
            (A.$$mousedown = T),
            (A.$$mousedownData = 0),
            x(
              A,
              $(ve, {
                get each() {
                  return S()
                },
                children: (Z) =>
                  (() => {
                    var te = fg()
                    return (
                      x(
                        te,
                        $(ve, {
                          get each() {
                            return w()[Z]
                          },
                          children: (le) =>
                            $(io, {
                              get locale() {
                                return e.locale
                              },
                              isFirstRow: !0,
                              onDragEnd: t,
                              ondragstart: n,
                              item: le,
                              get startDate() {
                                return e.headerDates[0]
                              },
                              get endDate() {
                                return e.headerDates[6]
                              },
                              onClick: R
                            })
                        })
                      ),
                      te
                    )
                  })()
              })
            ),
            re((Z) => Ae(A, u() ? 'pointer-events:none' : '', Z)),
            A
          )
        })(),
        (() => {
          var A = sg()
          return (A.$$mousedown = T), (A.$$mousedownData = 1), (A.$$mousemove = () => N(1)), A
        })(),
        (() => {
          var A = lg()
          return (A.$$mousedown = T), (A.$$mousedownData = 2), (A.$$mousemove = () => N(2)), A
        })(),
        (() => {
          var A = ag()
          return (A.$$mousedown = T), (A.$$mousedownData = 3), (A.$$mousemove = () => N(3)), A
        })(),
        (() => {
          var A = ug()
          return (A.$$mousedown = T), (A.$$mousedownData = 4), (A.$$mousemove = () => N(4)), A
        })(),
        (() => {
          var A = cg()
          return (A.$$mousedown = T), (A.$$mousedownData = 5), (A.$$mousemove = () => N(5)), A
        })(),
        (() => {
          var A = dg()
          return (A.$$mousedown = T), (A.$$mousedownData = 6), (A.$$mousemove = () => N(6)), A
        })()
      ]
    )
  }
Oe(['mousedown', 'mousemove'])
var gg = P('<div class=fec-weekly-morecontainer>'),
  mg = P('<div> +'),
  vg = (e) => {
    const t = Q(() => Zl(e.rowList, e.headerDates[0], e.headerDates[6], 3))
    return $(ge, {
      get when() {
        return e.show
      },
      get children() {
        var n = gg()
        return (
          x(
            n,
            $(ve, {
              get each() {
                return t()
              },
              children: (r, i) =>
                (() => {
                  var o = mg(),
                    s = o.firstChild
                  return (
                    Ki(o, 'click', e.openAllDayContainer, !0),
                    x(o, () => Ht(e.locale, r), s),
                    re((l) => Ae(o, r === 0 ? 'opacity:0;pointer-events: none;' : '', l)),
                    o
                  )
                })()
            })
          ),
          n
        )
      }
    })
  }
Oe(['click'])
function Dg(e) {
  let t = 0
  const [n, r] = he(!1)
  function i() {
    const o = e.value
    n()
      ? ((o.style.height = o.clientHeight + 'px'),
        (o.style.maxHeight = 'initial'),
        setTimeout(() => {
          ;(o.style.height = t + 'px'), (o.style.overflow = 'hidden')
        }, 0),
        setTimeout(() => {
          ;(o.style.height = 'fit-content'), (o.style.maxHeight = '112px')
        }, 500),
        r(!1))
      : ((t = o.clientHeight),
        (o.style.height = o.clientHeight + 'px'),
        (o.style.maxHeight = 'initial'),
        setTimeout(() => {
          ;(o.style.height = o.scrollHeight + 5 + 'px'), (o.style.maxHeight = '220px')
        }, 0),
        setTimeout(() => {
          ;(o.style.overflow = 'auto'), (o.style.height = 'fit-content')
        }, 500),
        r(!0))
  }
  return { isOpen: n, openAllD: i }
}
var yg = P('<div class="fec-header-dates "style=min-width:900px>'),
  Eg = P(
    '<div style=display:flex;min-width:900px><div class=fec-weekly-allDay id=fec-month-wrapper-id><div class=fec-week-all-day-wrapper>'
  ),
  wg = P('<div style=display:flex;justify-content:center>'),
  pg = (e) => {
    const t = Q(() => Mr(Or(e.events, e.headerDates[0], e.headerDates[6]))),
      n = Q(() => t().filter((g) => g.isAllDay())),
      r = Q(() => {
        let g = {}
        return ro(n(), g), g
      }),
      [i, o] = he(null)
    let s = { value: null }
    const { isOpen: l, openAllD: a } = Dg(s)
    Ot(() => {
      const g = s.value
      g.style.height = 'fit-content'
    })
    function c() {
      return Object.keys(r())
    }
    const u = { enter: () => {}, down: () => {} }
    function f(g, D) {
      u.down(g, D)
    }
    function d(g) {
      u.enter(g)
    }
    return [
      (() => {
        var g = yg()
        return (
          x(
            g,
            $(ve, {
              get each() {
                return e.headerDates
              },
              children: (D, v) =>
                (() => {
                  var w = wg()
                  return (
                    (w.$$mousedown = f),
                    (w.$$mousedownData = v()),
                    (w.$$mousemove = () => d(v())),
                    x(
                      w,
                      $(Hl, {
                        slotRenderStore: '',
                        headerDate: D,
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
                    w
                  )
                })()
            })
          ),
          g
        )
      })(),
      (() => {
        var g = Eg(),
          D = g.firstChild,
          v = D.firstChild
        x(
          g,
          $(ig, {
            onClick: a,
            get show() {
              return c().length > 3
            }
          }),
          D
        )
        var w = s.value
        return (
          typeof w == 'function' ? me(w, D) : (s.value = D),
          x(
            D,
            $(vg, {
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
              openAllDayContainer: a,
              onClick: a
            }),
            v
          ),
          x(
            v,
            $(zl, {
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
          x(
            D,
            $(hg, {
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
              setDraggingDate: o,
              moseEvents: u
            }),
            null
          ),
          re(() => lt(g, `${l() ? 'fec-weekly-allDay-open' : ''} ${i() ? 'fec-month-is-dragging' : ''}`)),
          g
        )
      })()
    ]
  }
Oe(['mousemove', 'mousedown'])
function Cg(e, t) {
  const n = pl([
      { props: { events: [], initialDate: null, locale: null, timeZone: null, calendar: null } },
      { props: { events: [], initialDate: null, locale: null, timeZone: null, calendar: null } },
      { props: { events: [], initialDate: null, locale: null, timeZone: null, calendar: null } },
      { props: { events: [], initialDate: null, locale: null, timeZone: null, calendar: null } },
      { props: { events: [], initialDate: null, locale: null, timeZone: null, calendar: null } },
      { props: { events: [], initialDate: null, locale: null, timeZone: null, calendar: null } },
      { props: { events: [], initialDate: null, locale: null, timeZone: null, calendar: null } }
    ]),
    r = Q(() => {
      let i = new Date(e.initialDate)
      i.setDate(i.getDate() - i.getDay()),
        it(() => {
          for (let o = 0; o < 7; o++) {
            const s = i.getDay(),
              l = Rn(e.events, new Date(i))
            ;(n[s].props.events = l.filter((a) => !a.isAllDay())),
              (n[s].props.initialDate = new Date(i)),
              (n[s].props.gridDate = new Date(i)),
              (n[s].props.locale = e.locale),
              (n[s].props.timeZone = e.timeZone),
              (n[s].props.calendar = e.calendar),
              (n[s].props.gridHeight = e.gridHeight),
              (n[s].props.stopAddEvent = e.stopAddEvent),
              (n[s].props.onEventClick = e.onEventClick),
              (n[s].props.editable = e.editable),
              (n[s].props.onDateChange = t),
              i.setDate(i.getDate() + 1)
          }
        })
    })
  return gt(r), { columData: n }
}
var _g = P('<div style=display:flex; class=fec-week-wrapper>'),
  Ag = P(
    '<div style=position:relative;flex:1;min-width:900px><div style=" position:absolute;height:100%;width:100%;"id=fec-scroll-wrapper class="fec-custome-scroll-bar fec-scroll-wrapper">'
  ),
  bg = {
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
  xg = (e) => {
    const t = mt(bg, e),
      n = Ue(),
      { columData: r } = Cg(t, o)
    function i(a, c, u, f) {
      const d = { ...a }
      f && (d.start.setDate(d.start.getDate() - (u - c)), d.end.setDate(d.end.getDate() - (u - c))), t.onEventUpdate(d)
    }
    function o(a) {
      t.onDateChange(a), t.onGridChange('daily')
    }
    const s = () => {
      let a = t.initialDate
      return (
        a.setDate(a.getDate() - a.getDay()),
        [0, 1, 2, 3, 4, 5, 6].map((c) => {
          const u = new Date(a)
          return u.setDate(u.getDate() + c), u
        })
      )
    }
    function l(a, c) {
      c ? t.onAddEvent({ ...a, groups: [c] }) : t.onAddEvent(a)
    }
    return [
      $(pg, {
        get onEventUpdate() {
          return t.onEventUpdate
        },
        get events() {
          return t.events
        },
        get headerDates() {
          return s()
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
        onDateChange: o
      }),
      $(Sg, {
        get children() {
          var a = _g()
          return (
            x(
              a,
              $(Ul, {
                get locale() {
                  return t.locale
                }
              }),
              null
            ),
            x(
              a,
              $(Pl, {
                gridComponent: Rl,
                cols: r,
                onAddEvent: l,
                onEventUpdate: i,
                container: n,
                get initialDate() {
                  return t.initialDate
                }
              }),
              null
            ),
            a
          )
        }
      })
    ]
  }
function Sg(e) {
  return (() => {
    var t = Ag(),
      n = t.firstChild
    return x(n, () => e.children), t
  })()
}
var $g = { code: xg, name: 'weekly', type: 'grid' },
  oo = class {
    constructor() {
      L(this, 'collection', {})
    }
    generateCollection(e) {
      for (let t = 0; t < e.length; t++) {
        const n = e[t]
        n.getIncludedDays().forEach((r) => {
          let i = kr(r)
          i in this.collection && this.collection[i].push(n)
        })
      }
    }
  },
  Tg = class extends oo {
    process(e, t) {
      return (this.collection[kr(t)] = []), this.generateCollection(e), this.collection
    }
  },
  Bg = class extends oo {
    process(e, t) {
      return (
        eo(t).forEach((n) => {
          this.collection[kr(n)] = []
        }),
        this.generateCollection(e),
        this.collection
      )
    }
  },
  Mg = class extends oo {
    constructor(t) {
      super()
      L(this, 'calendar')
      this.calendar = t
    }
    process(t, n) {
      return (
        Ji(n, this.calendar).forEach((r) => {
          this.collection[kr(r.date)] = []
        }),
        this.generateCollection(t),
        this.collection
      )
    }
  },
  kg = class {
    constructor(e, t, n) {
      L(this, 'handel')
      L(this, 'initDate')
      L(this, 'eventModeFilter')
      switch (((this.initDate = t), (this.eventModeFilter = new Ed(e, t, n)), e)) {
        case 'day':
          this.handel = new Tg()
          break
        case 'week':
          this.handel = new Bg()
          break
        case 'month':
          this.handel = new Mg(n)
          break
      }
    }
    group(e) {
      return this.handel.process(this.eventModeFilter.filter(e), this.initDate)
    }
  },
  Og = P('<div class=fec-no-events-text>'),
  Fg = P('<div class=fec-event-list><div class="fec-scroll-wrapper-list fec-custome-scroll-bar">'),
  Lg = P(
    '<div class=fec-event-list-item><div class=fec-event-list-item-time><div class=fec-schedule-date></div><div class=fec-schedule-dates></div></div><div class=fec-schedule-event-wrapper>'
  ),
  Ig = P(
    '<div class=fec-fec-event-list-item-des><div class=fec-event-date-list><div class=fec-event-dot></div></div><div>'
  ),
  Rg = {
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
  Pg = (e) => {
    const t = mt(Rg, e),
      n = Q(() => new kg(t.listMode, t.initialDate, t.calendar).group(t.events)),
      { modalElementNode: r, setSlotModalData: i, openSlotModalOnElement: o } = kt('eventClick')
    function s() {
      let a = 0
      return (
        Object.keys(n()).forEach((c) => {
          a += n()[c].length
        }),
        a === 0
      )
    }
    function l(a, c) {
      i(a), e.onEventClick(a), o(c.target)
    }
    return [
      r,
      (() => {
        var a = Fg(),
          c = a.firstChild
        return (
          x(
            c,
            $(ge, {
              get when() {
                return s()
              },
              get children() {
                var u = Og()
                return x(u, () => Ut(e.locale, 'no_events')), u
              }
            }),
            null
          ),
          x(
            c,
            $(ve, {
              get each() {
                return Object.keys(n())
              },
              children: (u) =>
                n()[u].length === 0
                  ? []
                  : (() => {
                      var f = Lg(),
                        d = f.firstChild,
                        g = d.firstChild,
                        D = g.nextSibling,
                        v = d.nextSibling
                      return (
                        x(g, () => pd(new Date(u), t.calendar, t.locale)),
                        x(D, () => wd(new Date(u), t.calendar, t.locale)),
                        x(
                          v,
                          $(ve, {
                            get each() {
                              return n()[u]
                            },
                            children: (w) =>
                              (() => {
                                var S = Ig(),
                                  M = S.firstChild,
                                  F = M.firstChild,
                                  E = M.nextSibling
                                return (
                                  (S.$$click = l),
                                  (S.$$clickData = w),
                                  x(
                                    M,
                                    (() => {
                                      var U = Q(() => !!w.isAllDay())
                                      return () => (U() ? 'all day' : Cd(w.start, w.end, t.locale))
                                    })(),
                                    null
                                  ),
                                  x(E, () => w.name),
                                  re((U) => Ae(F, `background-color:${w.color}`, U)),
                                  S
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
          a
        )
      })()
    ]
  }
Oe(['click'])
var Ng = { code: Pg, name: 'list', type: 'grid' }
const Hg = { style: { display: 'flex' } },
  Ug = { style: { margin: '30px 10px' } },
  jg = Y('label', { for: 'cars' }, 'Choose a timezone :', -1),
  Gg = ['value'],
  Zg = { style: { margin: '30px 10px' } },
  Vg = Y('label', { for: 'selectedCalendar' }, 'Choose a Calendar :', -1),
  Kg = ['value'],
  zg = { style: { margin: '30px 10px' } },
  qg = Y('label', { for: 'selectedLocale' }, 'Choose a Locale :', -1),
  Wg = ['value'],
  Yg = { style: { margin: '30px 10px' } },
  Xg = Y('label', { for: 'selectedTheme' }, 'Choose a Theme :', -1),
  Jg = ['value'],
  Qg = { style: { margin: '30px 10px' } },
  em = Y('label', { for: 'selectedlistModes' }, 'Choose a listMode :', -1),
  tm = ['value'],
  nm = { class: 'addModal' },
  rm = { style: { display: 'block' } },
  im = { style: { display: 'block' } },
  om = Y('div', { class: '', style: { flex: '1' } }, null, -1),
  sm = ['onClick'],
  lm = ['onClick'],
  am = { class: 'eventClickModal' },
  um = { style: { display: 'block' } },
  cm = { style: { display: 'block' } },
  dm = Y('div', { class: '', style: { flex: '1' } }, null, -1),
  fm = Hi({
    __name: 'App',
    setup(e) {
      const n = ut([
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
      ])
      ut(0)
      function r(M) {
        console.log('on event update ', M), n.value.push(M.next.sourceEvent)
      }
      function i(M) {
        console.log('dataAdded', M), n.value.push(M.sourceEvent)
      }
      const o = ut(new Date('Thu Aug 10 2023 15:00:0')),
        s = ut('daily')
      wn(s, () => {
        console.log('dfonowad')
      }),
        setTimeout(() => {}, 4e3)
      function l({ event: M }) {
        n.value.push(M), console.log(M)
      }
      const a = Intl.supportedValuesOf('timeZone'),
        c = Intl.supportedValuesOf('calendar'),
        u = [
          'af-ZA',
          'am-ET',
          'ar-AE',
          'ar-BH',
          'ar-DZ',
          'ar-EG',
          'ar-IQ',
          'ar-JO',
          'ar-KW',
          'ar-LB',
          'ar-LY',
          'ar-MA',
          'arn-CL',
          'ar-OM',
          'ar-QA',
          'ar-SA',
          'ar-SD',
          'ar-SY',
          'ar-TN',
          'ar-YE',
          'as-IN',
          'az-az',
          'az-Cyrl-AZ',
          'az-Latn-AZ',
          'ba-RU',
          'be-BY',
          'bg-BG',
          'bn-BD',
          'bn-IN',
          'bo-CN',
          'br-FR',
          'bs-Cyrl-BA',
          'bs-Latn-BA',
          'ca-ES',
          'co-FR',
          'cs-CZ',
          'cy-GB',
          'da-DK',
          'de-AT',
          'de-CH',
          'de-DE',
          'de-LI',
          'de-LU',
          'dsb-DE',
          'dv-MV',
          'el-CY',
          'el-GR',
          'en-029',
          'en-AU',
          'en-BZ',
          'en-CA',
          'en-cb',
          'en-GB',
          'en-IE',
          'en-IN',
          'en-JM',
          'en-MT',
          'en-MY',
          'en-NZ',
          'en-PH',
          'en-SG',
          'en-TT',
          'en-US',
          'en-ZA',
          'en-ZW',
          'es-AR',
          'es-BO',
          'es-CL',
          'es-CO',
          'es-CR',
          'es-DO',
          'es-EC',
          'es-ES',
          'es-GT',
          'es-HN',
          'es-MX',
          'es-NI',
          'es-PA',
          'es-PE',
          'es-PR',
          'es-PY',
          'es-SV',
          'es-US',
          'es-UY',
          'es-VE',
          'et-EE',
          'eu-ES',
          'fa-IR',
          'fi-FI',
          'fil-PH',
          'fo-FO',
          'fr-BE',
          'fr-CA',
          'fr-CH',
          'fr-FR',
          'fr-LU',
          'fr-MC',
          'fy-NL',
          'ga-IE',
          'gd-GB',
          'gd-ie',
          'gl-ES',
          'gsw-FR',
          'gu-IN',
          'ha-Latn-NG',
          'he-IL',
          'hi-IN',
          'hr-BA',
          'hr-HR',
          'hsb-DE',
          'hu-HU',
          'hy-AM',
          'id-ID',
          'ig-NG',
          'ii-CN',
          'in-ID',
          'is-IS',
          'it-CH',
          'it-IT',
          'iu-Cans-CA',
          'iu-Latn-CA',
          'iw-IL',
          'ja-JP',
          'ka-GE',
          'kk-KZ',
          'kl-GL',
          'km-KH',
          'kn-IN',
          'kok-IN',
          'ko-KR',
          'ky-KG',
          'lb-LU',
          'lo-LA',
          'lt-LT',
          'lv-LV',
          'mi-NZ',
          'mk-MK',
          'ml-IN',
          'mn-MN',
          'moh-CA',
          'mr-IN',
          'ms-BN',
          'ms-MY',
          'mt-MT',
          'nb-NO',
          'ne-NP',
          'nl-BE',
          'nl-NL',
          'nn-NO',
          'no-no',
          'nso-ZA',
          'oc-FR',
          'or-IN',
          'pa-IN',
          'pl-PL',
          'prs-AF',
          'ps-AF',
          'pt-BR',
          'pt-PT',
          'qut-GT',
          'quz-BO',
          'quz-EC',
          'quz-PE',
          'rm-CH',
          'ro-mo',
          'ro-RO',
          'ru-mo',
          'ru-RU',
          'rw-RW',
          'sah-RU',
          'sa-IN',
          'se-FI',
          'se-NO',
          'se-SE',
          'si-LK',
          'sk-SK',
          'sl-SI',
          'sma-NO',
          'sma-SE',
          'smj-NO',
          'smj-SE',
          'smn-FI',
          'sms-FI',
          'sq-AL',
          'sr-BA',
          'sr-CS',
          'sr-ME',
          'sr-RS',
          'sr-sp',
          'sv-FI',
          'sv-SE',
          'sw-KE',
          'syr-SY',
          'ta-IN',
          'te-IN',
          'th-TH',
          'tk-TM',
          'tlh-QS',
          'tn-ZA',
          'tr-TR',
          'tt-RU',
          'ug-CN',
          'uk-UA',
          'ur-PK',
          'uz-uz',
          'vi-VN',
          'wo-SN',
          'xh-ZA',
          'yo-NG',
          'zh-CN',
          'zh-HK',
          'zh-MO',
          'zh-SG',
          'zh-TW',
          'zu-ZA'
        ],
        f = ['light', 'dark'],
        d = ['day', 'month', 'week'],
        g = ut('America/New_York'),
        D = ut('gregory'),
        v = ut('en-US'),
        w = ut('light'),
        S = ut('week')
      return (
        wn(g, () => {
          console.log(g.value)
        }),
        (M, F) => (
          pt(),
          Ct(
            Se,
            null,
            [
              Y('div', Hg, [
                Y('div', Ug, [
                  jg,
                  hn(
                    Y(
                      'select',
                      { name: 'cars', id: 'cars', 'onUpdate:modelValue': F[0] || (F[0] = (E) => (g.value = E)) },
                      [
                        (pt(!0),
                        Ct(
                          Se,
                          null,
                          gn(_t(a), (E) => (pt(), Ct('option', { value: E }, ze(E), 9, Gg))),
                          256
                        ))
                      ],
                      512
                    ),
                    [[vn, g.value]]
                  )
                ]),
                Y('div', Zg, [
                  Vg,
                  hn(
                    Y(
                      'select',
                      {
                        name: 'selectedCalendar',
                        id: 'selectedCalendar',
                        'onUpdate:modelValue': F[1] || (F[1] = (E) => (D.value = E))
                      },
                      [
                        (pt(!0),
                        Ct(
                          Se,
                          null,
                          gn(_t(c), (E) => (pt(), Ct('option', { value: E }, ze(E), 9, Kg))),
                          256
                        ))
                      ],
                      512
                    ),
                    [[vn, D.value]]
                  )
                ]),
                Y('div', zg, [
                  qg,
                  hn(
                    Y(
                      'select',
                      {
                        name: 'selectedLocale',
                        id: 'selectedLocale',
                        'onUpdate:modelValue': F[2] || (F[2] = (E) => (v.value = E))
                      },
                      [
                        (pt(),
                        Ct(
                          Se,
                          null,
                          gn(u, (E) => Y('option', { value: E }, ze(E), 9, Wg)),
                          64
                        ))
                      ],
                      512
                    ),
                    [[vn, v.value]]
                  )
                ]),
                Y('div', Yg, [
                  Xg,
                  hn(
                    Y(
                      'select',
                      {
                        name: 'selectedTheme',
                        id: 'selectedTheme',
                        'onUpdate:modelValue': F[3] || (F[3] = (E) => (w.value = E))
                      },
                      [
                        (pt(),
                        Ct(
                          Se,
                          null,
                          gn(f, (E) => Y('option', { value: E }, ze(E), 9, Jg)),
                          64
                        ))
                      ],
                      512
                    ),
                    [[vn, w.value]]
                  )
                ]),
                Y('div', Qg, [
                  em,
                  hn(
                    Y(
                      'select',
                      {
                        name: 'selectedlistModes',
                        id: 'selectedlistModes',
                        'onUpdate:modelValue': F[4] || (F[4] = (E) => (S.value = E))
                      },
                      [
                        (pt(),
                        Ct(
                          Se,
                          null,
                          gn(d, (E) => Y('option', { value: E }, ze(E), 9, tm)),
                          64
                        ))
                      ],
                      512
                    ),
                    [[vn, S.value]]
                  )
                ])
              ]),
              Ve(
                _t(x0),
                {
                  'auto-update-event-on-change': !1,
                  editable: !0,
                  grid: s.value,
                  'onUpdate:grid': F[5] || (F[5] = (E) => (s.value = E)),
                  events: n.value,
                  'onUpdate:events': F[6] || (F[6] = (E) => (n.value = E)),
                  onEventUpdate: r,
                  onEventAdd: l,
                  'stop-add-event': '',
                  'list-mode': S.value,
                  theme: w.value,
                  'time-zone': g.value,
                  locale: v.value,
                  'initial-date': o.value,
                  'onUpdate:initialDate': F[7] || (F[7] = (E) => (o.value = E)),
                  calendar: D.value,
                  plugins: [_t($h), _t($g), _t(tg), _t(Ng)]
                },
                {
                  addModal: oi(({ data: E }) => {
                    var U, R, p, T, N
                    return [
                      Y('div', nm, [
                        hi(' this can be a vue.js/React.js slot '),
                        Y('h2', null, ze((U = E.eventData) == null ? void 0 : U.name), 1),
                        Y('span', rm, [
                          Y(
                            'b',
                            null,
                            ze((p = (R = E.eventData) == null ? void 0 : R.start) == null ? void 0 : p.toString()),
                            1
                          )
                        ]),
                        Y('span', im, [
                          Y(
                            'b',
                            null,
                            ze((N = (T = E.eventData) == null ? void 0 : T.end) == null ? void 0 : N.toString()),
                            1
                          )
                        ]),
                        om,
                        Y(
                          'div',
                          { onClick: E.saveModal },
                          [Y('button', { onClick: (A) => i(E.eventData) }, 'save', 8, lm)],
                          8,
                          sm
                        )
                      ])
                    ]
                  }),
                  eventClick: oi(({ data: E }) => {
                    var U, R, p, T, N
                    return [
                      Y('div', am, [
                        hi(' this can be a vue.js/React.js slot '),
                        Y('h2', null, ze((U = E.eventData) == null ? void 0 : U.name), 1),
                        Y('span', um, [
                          Y(
                            'b',
                            null,
                            ze((p = (R = E.eventData) == null ? void 0 : R.start) == null ? void 0 : p.toString()),
                            1
                          )
                        ]),
                        Y('span', cm, [
                          Y(
                            'b',
                            null,
                            ze((N = (T = E.eventData) == null ? void 0 : T.end) == null ? void 0 : N.toString()),
                            1
                          )
                        ]),
                        dm
                      ])
                    ]
                  }),
                  _: 1
                },
                8,
                ['grid', 'events', 'list-mode', 'theme', 'time-zone', 'locale', 'initial-date', 'calendar', 'plugins']
              )
            ],
            64
          )
        )
      )
    }
  })
mc(fm).mount('#app')
