(self.webpackChunkcrypto_project = self.webpackChunkcrypto_project || []).push([
  [179],
  {
    599: (hs, lt, pe) => {
      "use strict";
      function k(n) {
        return "function" == typeof n;
      }
      function H(n) {
        const t = n((r) => {
          Error.call(r), (r.stack = new Error().stack);
        });
        return (
          (t.prototype = Object.create(Error.prototype)),
          (t.prototype.constructor = t),
          t
        );
      }
      const ge = H(
        (n) =>
          function (t) {
            n(this),
              (this.message = t
                ? `${t.length} errors occurred during unsubscription:\n${t
                    .map((r, o) => `${o + 1}) ${r.toString()}`)
                    .join("\n  ")}`
                : ""),
              (this.name = "UnsubscriptionError"),
              (this.errors = t);
          }
      );
      function ke(n, e) {
        if (n) {
          const t = n.indexOf(e);
          0 <= t && n.splice(t, 1);
        }
      }
      class Ee {
        constructor(e) {
          (this.initialTeardown = e),
            (this.closed = !1),
            (this._parentage = null),
            (this._finalizers = null);
        }
        unsubscribe() {
          let e;
          if (!this.closed) {
            this.closed = !0;
            const { _parentage: t } = this;
            if (t)
              if (((this._parentage = null), Array.isArray(t)))
                for (const i of t) i.remove(this);
              else t.remove(this);
            const { initialTeardown: r } = this;
            if (k(r))
              try {
                r();
              } catch (i) {
                e = i instanceof ge ? i.errors : [i];
              }
            const { _finalizers: o } = this;
            if (o) {
              this._finalizers = null;
              for (const i of o)
                try {
                  se(i);
                } catch (s) {
                  (e = e ?? []),
                    s instanceof ge ? (e = [...e, ...s.errors]) : e.push(s);
                }
            }
            if (e) throw new ge(e);
          }
        }
        add(e) {
          var t;
          if (e && e !== this)
            if (this.closed) se(e);
            else {
              if (e instanceof Ee) {
                if (e.closed || e._hasParent(this)) return;
                e._addParent(this);
              }
              (this._finalizers =
                null !== (t = this._finalizers) && void 0 !== t ? t : []).push(
                e
              );
            }
        }
        _hasParent(e) {
          const { _parentage: t } = this;
          return t === e || (Array.isArray(t) && t.includes(e));
        }
        _addParent(e) {
          const { _parentage: t } = this;
          this._parentage = Array.isArray(t) ? (t.push(e), t) : t ? [t, e] : e;
        }
        _removeParent(e) {
          const { _parentage: t } = this;
          t === e ? (this._parentage = null) : Array.isArray(t) && ke(t, e);
        }
        remove(e) {
          const { _finalizers: t } = this;
          t && ke(t, e), e instanceof Ee && e._removeParent(this);
        }
      }
      Ee.EMPTY = (() => {
        const n = new Ee();
        return (n.closed = !0), n;
      })();
      const J = Ee.EMPTY;
      function Te(n) {
        return (
          n instanceof Ee ||
          (n && "closed" in n && k(n.remove) && k(n.add) && k(n.unsubscribe))
        );
      }
      function se(n) {
        k(n) ? n() : n.unsubscribe();
      }
      const ue = {
          onUnhandledError: null,
          onStoppedNotification: null,
          Promise: void 0,
          useDeprecatedSynchronousErrorHandling: !1,
          useDeprecatedNextContext: !1,
        },
        de = {
          setTimeout(n, e, ...t) {
            const { delegate: r } = de;
            return r?.setTimeout
              ? r.setTimeout(n, e, ...t)
              : setTimeout(n, e, ...t);
          },
          clearTimeout(n) {
            const { delegate: e } = de;
            return (e?.clearTimeout || clearTimeout)(n);
          },
          delegate: void 0,
        };
      function Ne(n) {
        de.setTimeout(() => {
          const { onUnhandledError: e } = ue;
          if (!e) throw n;
          e(n);
        });
      }
      function Mt() {}
      const $t = Sr("C", void 0, void 0);
      function Sr(n, e, t) {
        return { kind: n, value: e, error: t };
      }
      let ln = null;
      function zn(n) {
        if (ue.useDeprecatedSynchronousErrorHandling) {
          const e = !ln;
          if ((e && (ln = { errorThrown: !1, error: null }), n(), e)) {
            const { errorThrown: t, error: r } = ln;
            if (((ln = null), t)) throw r;
          }
        } else n();
      }
      class ar extends Ee {
        constructor(e) {
          super(),
            (this.isStopped = !1),
            e
              ? ((this.destination = e), Te(e) && e.add(this))
              : (this.destination = Dt);
        }
        static create(e, t, r) {
          return new B(e, t, r);
        }
        next(e) {
          this.isStopped
            ? Q(
                (function Eo(n) {
                  return Sr("N", n, void 0);
                })(e),
                this
              )
            : this._next(e);
        }
        error(e) {
          this.isStopped
            ? Q(
                (function no(n) {
                  return Sr("E", void 0, n);
                })(e),
                this
              )
            : ((this.isStopped = !0), this._error(e));
        }
        complete() {
          this.isStopped
            ? Q($t, this)
            : ((this.isStopped = !0), this._complete());
        }
        unsubscribe() {
          this.closed ||
            ((this.isStopped = !0),
            super.unsubscribe(),
            (this.destination = null));
        }
        _next(e) {
          this.destination.next(e);
        }
        _error(e) {
          try {
            this.destination.error(e);
          } finally {
            this.unsubscribe();
          }
        }
        _complete() {
          try {
            this.destination.complete();
          } finally {
            this.unsubscribe();
          }
        }
      }
      const ze = Function.prototype.bind;
      function zt(n, e) {
        return ze.call(n, e);
      }
      class cr {
        constructor(e) {
          this.partialObserver = e;
        }
        next(e) {
          const { partialObserver: t } = this;
          if (t.next)
            try {
              t.next(e);
            } catch (r) {
              I(r);
            }
        }
        error(e) {
          const { partialObserver: t } = this;
          if (t.error)
            try {
              t.error(e);
            } catch (r) {
              I(r);
            }
          else I(e);
        }
        complete() {
          const { partialObserver: e } = this;
          if (e.complete)
            try {
              e.complete();
            } catch (t) {
              I(t);
            }
        }
      }
      class B extends ar {
        constructor(e, t, r) {
          let o;
          if ((super(), k(e) || !e))
            o = {
              next: e ?? void 0,
              error: t ?? void 0,
              complete: r ?? void 0,
            };
          else {
            let i;
            this && ue.useDeprecatedNextContext
              ? ((i = Object.create(e)),
                (i.unsubscribe = () => this.unsubscribe()),
                (o = {
                  next: e.next && zt(e.next, i),
                  error: e.error && zt(e.error, i),
                  complete: e.complete && zt(e.complete, i),
                }))
              : (o = e);
          }
          this.destination = new cr(o);
        }
      }
      function I(n) {
        ue.useDeprecatedSynchronousErrorHandling
          ? (function Ht(n) {
              ue.useDeprecatedSynchronousErrorHandling &&
                ln &&
                ((ln.errorThrown = !0), (ln.error = n));
            })(n)
          : Ne(n);
      }
      function Q(n, e) {
        const { onStoppedNotification: t } = ue;
        t && de.setTimeout(() => t(n, e));
      }
      const Dt = {
          closed: !0,
          next: Mt,
          error: function De(n) {
            throw n;
          },
          complete: Mt,
        },
        Gt =
          ("function" == typeof Symbol && Symbol.observable) || "@@observable";
      function St(n) {
        return n;
      }
      function lr(n) {
        return 0 === n.length
          ? St
          : 1 === n.length
          ? n[0]
          : function (t) {
              return n.reduce((r, o) => o(r), t);
            };
      }
      let Re = (() => {
        class n {
          constructor(t) {
            t && (this._subscribe = t);
          }
          lift(t) {
            const r = new n();
            return (r.source = this), (r.operator = t), r;
          }
          subscribe(t, r, o) {
            const i = (function Sn(n) {
              return (
                (n && n instanceof ar) ||
                ((function Oo(n) {
                  return n && k(n.next) && k(n.error) && k(n.complete);
                })(n) &&
                  Te(n))
              );
            })(t)
              ? t
              : new B(t, r, o);
            return (
              zn(() => {
                const { operator: s, source: a } = this;
                i.add(
                  s
                    ? s.call(i, a)
                    : a
                    ? this._subscribe(i)
                    : this._trySubscribe(i)
                );
              }),
              i
            );
          }
          _trySubscribe(t) {
            try {
              return this._subscribe(t);
            } catch (r) {
              t.error(r);
            }
          }
          forEach(t, r) {
            return new (r = ii(r))((o, i) => {
              const s = new B({
                next: (a) => {
                  try {
                    t(a);
                  } catch (c) {
                    i(c), s.unsubscribe();
                  }
                },
                error: i,
                complete: o,
              });
              this.subscribe(s);
            });
          }
          _subscribe(t) {
            var r;
            return null === (r = this.source) || void 0 === r
              ? void 0
              : r.subscribe(t);
          }
          [Gt]() {
            return this;
          }
          pipe(...t) {
            return lr(t)(this);
          }
          toPromise(t) {
            return new (t = ii(t))((r, o) => {
              let i;
              this.subscribe(
                (s) => (i = s),
                (s) => o(s),
                () => r(i)
              );
            });
          }
        }
        return (n.create = (e) => new n(e)), n;
      })();
      function ii(n) {
        var e;
        return null !== (e = n ?? ue.Promise) && void 0 !== e ? e : Promise;
      }
      const rn = H(
        (n) =>
          function () {
            n(this),
              (this.name = "ObjectUnsubscribedError"),
              (this.message = "object unsubscribed");
          }
      );
      let We = (() => {
        class n extends Re {
          constructor() {
            super(),
              (this.closed = !1),
              (this.currentObservers = null),
              (this.observers = []),
              (this.isStopped = !1),
              (this.hasError = !1),
              (this.thrownError = null);
          }
          lift(t) {
            const r = new un(this, this);
            return (r.operator = t), r;
          }
          _throwIfClosed() {
            if (this.closed) throw new rn();
          }
          next(t) {
            zn(() => {
              if ((this._throwIfClosed(), !this.isStopped)) {
                this.currentObservers ||
                  (this.currentObservers = Array.from(this.observers));
                for (const r of this.currentObservers) r.next(t);
              }
            });
          }
          error(t) {
            zn(() => {
              if ((this._throwIfClosed(), !this.isStopped)) {
                (this.hasError = this.isStopped = !0), (this.thrownError = t);
                const { observers: r } = this;
                for (; r.length; ) r.shift().error(t);
              }
            });
          }
          complete() {
            zn(() => {
              if ((this._throwIfClosed(), !this.isStopped)) {
                this.isStopped = !0;
                const { observers: t } = this;
                for (; t.length; ) t.shift().complete();
              }
            });
          }
          unsubscribe() {
            (this.isStopped = this.closed = !0),
              (this.observers = this.currentObservers = null);
          }
          get observed() {
            var t;
            return (
              (null === (t = this.observers) || void 0 === t
                ? void 0
                : t.length) > 0
            );
          }
          _trySubscribe(t) {
            return this._throwIfClosed(), super._trySubscribe(t);
          }
          _subscribe(t) {
            return (
              this._throwIfClosed(),
              this._checkFinalizedStatuses(t),
              this._innerSubscribe(t)
            );
          }
          _innerSubscribe(t) {
            const { hasError: r, isStopped: o, observers: i } = this;
            return r || o
              ? J
              : ((this.currentObservers = null),
                i.push(t),
                new Ee(() => {
                  (this.currentObservers = null), ke(i, t);
                }));
          }
          _checkFinalizedStatuses(t) {
            const { hasError: r, thrownError: o, isStopped: i } = this;
            r ? t.error(o) : i && t.complete();
          }
          asObservable() {
            const t = new Re();
            return (t.source = this), t;
          }
        }
        return (n.create = (e, t) => new un(e, t)), n;
      })();
      class un extends We {
        constructor(e, t) {
          super(), (this.destination = e), (this.source = t);
        }
        next(e) {
          var t, r;
          null ===
            (r =
              null === (t = this.destination) || void 0 === t
                ? void 0
                : t.next) ||
            void 0 === r ||
            r.call(t, e);
        }
        error(e) {
          var t, r;
          null ===
            (r =
              null === (t = this.destination) || void 0 === t
                ? void 0
                : t.error) ||
            void 0 === r ||
            r.call(t, e);
        }
        complete() {
          var e, t;
          null ===
            (t =
              null === (e = this.destination) || void 0 === e
                ? void 0
                : e.complete) ||
            void 0 === t ||
            t.call(e);
        }
        _subscribe(e) {
          var t, r;
          return null !==
            (r =
              null === (t = this.source) || void 0 === t
                ? void 0
                : t.subscribe(e)) && void 0 !== r
            ? r
            : J;
        }
      }
      function ut(n) {
        return k(n?.lift);
      }
      function ae(n) {
        return (e) => {
          if (ut(e))
            return e.lift(function (t) {
              try {
                return n(t, this);
              } catch (r) {
                this.error(r);
              }
            });
          throw new TypeError("Unable to lift unknown Observable type");
        };
      }
      function ye(n, e, t, r, o) {
        return new ur(n, e, t, r, o);
      }
      class ur extends ar {
        constructor(e, t, r, o, i, s) {
          super(e),
            (this.onFinalize = i),
            (this.shouldUnsubscribe = s),
            (this._next = t
              ? function (a) {
                  try {
                    t(a);
                  } catch (c) {
                    e.error(c);
                  }
                }
              : super._next),
            (this._error = o
              ? function (a) {
                  try {
                    o(a);
                  } catch (c) {
                    e.error(c);
                  } finally {
                    this.unsubscribe();
                  }
                }
              : super._error),
            (this._complete = r
              ? function () {
                  try {
                    r();
                  } catch (a) {
                    e.error(a);
                  } finally {
                    this.unsubscribe();
                  }
                }
              : super._complete);
        }
        unsubscribe() {
          var e;
          if (!this.shouldUnsubscribe || this.shouldUnsubscribe()) {
            const { closed: t } = this;
            super.unsubscribe(),
              !t &&
                (null === (e = this.onFinalize) ||
                  void 0 === e ||
                  e.call(this));
          }
        }
      }
      function U(n, e) {
        return ae((t, r) => {
          let o = 0;
          t.subscribe(
            ye(r, (i) => {
              r.next(n.call(e, i, o++));
            })
          );
        });
      }
      function Po(n) {
        return this instanceof Po ? ((this.v = n), this) : new Po(n);
      }
      function DD(n, e, t) {
        if (!Symbol.asyncIterator)
          throw new TypeError("Symbol.asyncIterator is not defined.");
        var o,
          r = t.apply(n, e || []),
          i = [];
        return (
          (o = {}),
          s("next"),
          s("throw"),
          s("return"),
          (o[Symbol.asyncIterator] = function () {
            return this;
          }),
          o
        );
        function s(f) {
          r[f] &&
            (o[f] = function (h) {
              return new Promise(function (p, m) {
                i.push([f, h, p, m]) > 1 || a(f, h);
              });
            });
        }
        function a(f, h) {
          try {
            !(function c(f) {
              f.value instanceof Po
                ? Promise.resolve(f.value.v).then(l, u)
                : d(i[0][2], f);
            })(r[f](h));
          } catch (p) {
            d(i[0][3], p);
          }
        }
        function l(f) {
          a("next", f);
        }
        function u(f) {
          a("throw", f);
        }
        function d(f, h) {
          f(h), i.shift(), i.length && a(i[0][0], i[0][1]);
        }
      }
      function ED(n) {
        if (!Symbol.asyncIterator)
          throw new TypeError("Symbol.asyncIterator is not defined.");
        var t,
          e = n[Symbol.asyncIterator];
        return e
          ? e.call(n)
          : ((n = (function Eg(n) {
              var e = "function" == typeof Symbol && Symbol.iterator,
                t = e && n[e],
                r = 0;
              if (t) return t.call(n);
              if (n && "number" == typeof n.length)
                return {
                  next: function () {
                    return (
                      n && r >= n.length && (n = void 0),
                      { value: n && n[r++], done: !n }
                    );
                  },
                };
              throw new TypeError(
                e
                  ? "Object is not iterable."
                  : "Symbol.iterator is not defined."
              );
            })(n)),
            (t = {}),
            r("next"),
            r("throw"),
            r("return"),
            (t[Symbol.asyncIterator] = function () {
              return this;
            }),
            t);
        function r(i) {
          t[i] =
            n[i] &&
            function (s) {
              return new Promise(function (a, c) {
                !(function o(i, s, a, c) {
                  Promise.resolve(c).then(function (l) {
                    i({ value: l, done: a });
                  }, s);
                })(a, c, (s = n[i](s)).done, s.value);
              });
            };
        }
      }
      const Og = (n) =>
        n && "number" == typeof n.length && "function" != typeof n;
      function Pg(n) {
        return k(n?.then);
      }
      function xg(n) {
        return k(n[Gt]);
      }
      function Sg(n) {
        return Symbol.asyncIterator && k(n?.[Symbol.asyncIterator]);
      }
      function Ag(n) {
        return new TypeError(
          `You provided ${
            null !== n && "object" == typeof n ? "an invalid object" : `'${n}'`
          } where a stream was expected. You can provide an Observable, Promise, ReadableStream, Array, AsyncIterable, or Iterable.`
        );
      }
      const Tg = (function PD() {
        return "function" == typeof Symbol && Symbol.iterator
          ? Symbol.iterator
          : "@@iterator";
      })();
      function Ig(n) {
        return k(n?.[Tg]);
      }
      function kg(n) {
        return DD(this, arguments, function* () {
          const t = n.getReader();
          try {
            for (;;) {
              const { value: r, done: o } = yield Po(t.read());
              if (o) return yield Po(void 0);
              yield yield Po(r);
            }
          } finally {
            t.releaseLock();
          }
        });
      }
      function Ng(n) {
        return k(n?.getReader);
      }
      function An(n) {
        if (n instanceof Re) return n;
        if (null != n) {
          if (xg(n))
            return (function xD(n) {
              return new Re((e) => {
                const t = n[Gt]();
                if (k(t.subscribe)) return t.subscribe(e);
                throw new TypeError(
                  "Provided object does not correctly implement Symbol.observable"
                );
              });
            })(n);
          if (Og(n))
            return (function SD(n) {
              return new Re((e) => {
                for (let t = 0; t < n.length && !e.closed; t++) e.next(n[t]);
                e.complete();
              });
            })(n);
          if (Pg(n))
            return (function AD(n) {
              return new Re((e) => {
                n.then(
                  (t) => {
                    e.closed || (e.next(t), e.complete());
                  },
                  (t) => e.error(t)
                ).then(null, Ne);
              });
            })(n);
          if (Sg(n)) return Rg(n);
          if (Ig(n))
            return (function TD(n) {
              return new Re((e) => {
                for (const t of n) if ((e.next(t), e.closed)) return;
                e.complete();
              });
            })(n);
          if (Ng(n))
            return (function ID(n) {
              return Rg(kg(n));
            })(n);
        }
        throw Ag(n);
      }
      function Rg(n) {
        return new Re((e) => {
          (function kD(n, e) {
            var t, r, o, i;
            return (function wD(n, e, t, r) {
              return new (t || (t = Promise))(function (i, s) {
                function a(u) {
                  try {
                    l(r.next(u));
                  } catch (d) {
                    s(d);
                  }
                }
                function c(u) {
                  try {
                    l(r.throw(u));
                  } catch (d) {
                    s(d);
                  }
                }
                function l(u) {
                  u.done
                    ? i(u.value)
                    : (function o(i) {
                        return i instanceof t
                          ? i
                          : new t(function (s) {
                              s(i);
                            });
                      })(u.value).then(a, c);
                }
                l((r = r.apply(n, e || [])).next());
              });
            })(this, void 0, void 0, function* () {
              try {
                for (t = ED(n); !(r = yield t.next()).done; )
                  if ((e.next(r.value), e.closed)) return;
              } catch (s) {
                o = { error: s };
              } finally {
                try {
                  r && !r.done && (i = t.return) && (yield i.call(t));
                } finally {
                  if (o) throw o.error;
                }
              }
              e.complete();
            });
          })(n, e).catch((t) => e.error(t));
        });
      }
      function Ir(n, e, t, r = 0, o = !1) {
        const i = e.schedule(function () {
          t(), o ? n.add(this.schedule(null, r)) : this.unsubscribe();
        }, r);
        if ((n.add(i), !o)) return i;
      }
      function At(n, e, t = 1 / 0) {
        return k(e)
          ? At((r, o) => U((i, s) => e(r, i, o, s))(An(n(r, o))), t)
          : ("number" == typeof e && (t = e),
            ae((r, o) =>
              (function ND(n, e, t, r, o, i, s, a) {
                const c = [];
                let l = 0,
                  u = 0,
                  d = !1;
                const f = () => {
                    d && !c.length && !l && e.complete();
                  },
                  h = (m) => (l < r ? p(m) : c.push(m)),
                  p = (m) => {
                    i && e.next(m), l++;
                    let y = !1;
                    An(t(m, u++)).subscribe(
                      ye(
                        e,
                        (C) => {
                          o?.(C), i ? h(C) : e.next(C);
                        },
                        () => {
                          y = !0;
                        },
                        void 0,
                        () => {
                          if (y)
                            try {
                              for (l--; c.length && l < r; ) {
                                const C = c.shift();
                                s ? Ir(e, s, () => p(C)) : p(C);
                              }
                              f();
                            } catch (C) {
                              e.error(C);
                            }
                        }
                      )
                    );
                  };
                return (
                  n.subscribe(
                    ye(e, h, () => {
                      (d = !0), f();
                    })
                  ),
                  () => {
                    a?.();
                  }
                );
              })(r, o, n, t)
            ));
      }
      function si(n = 1 / 0) {
        return At(St, n);
      }
      const kr = new Re((n) => n.complete());
      function Nu(n) {
        return n[n.length - 1];
      }
      function Fg(n) {
        return k(Nu(n)) ? n.pop() : void 0;
      }
      function ps(n) {
        return (function FD(n) {
          return n && k(n.schedule);
        })(Nu(n))
          ? n.pop()
          : void 0;
      }
      function Lg(n, e = 0) {
        return ae((t, r) => {
          t.subscribe(
            ye(
              r,
              (o) => Ir(r, n, () => r.next(o), e),
              () => Ir(r, n, () => r.complete(), e),
              (o) => Ir(r, n, () => r.error(o), e)
            )
          );
        });
      }
      function Vg(n, e = 0) {
        return ae((t, r) => {
          r.add(n.schedule(() => t.subscribe(r), e));
        });
      }
      function Bg(n, e) {
        if (!n) throw new Error("Iterable cannot be null");
        return new Re((t) => {
          Ir(t, e, () => {
            const r = n[Symbol.asyncIterator]();
            Ir(
              t,
              e,
              () => {
                r.next().then((o) => {
                  o.done ? t.complete() : t.next(o.value);
                });
              },
              0,
              !0
            );
          });
        });
      }
      function dt(n, e) {
        return e
          ? (function HD(n, e) {
              if (null != n) {
                if (xg(n))
                  return (function VD(n, e) {
                    return An(n).pipe(Vg(e), Lg(e));
                  })(n, e);
                if (Og(n))
                  return (function jD(n, e) {
                    return new Re((t) => {
                      let r = 0;
                      return e.schedule(function () {
                        r === n.length
                          ? t.complete()
                          : (t.next(n[r++]), t.closed || this.schedule());
                      });
                    });
                  })(n, e);
                if (Pg(n))
                  return (function BD(n, e) {
                    return An(n).pipe(Vg(e), Lg(e));
                  })(n, e);
                if (Sg(n)) return Bg(n, e);
                if (Ig(n))
                  return (function UD(n, e) {
                    return new Re((t) => {
                      let r;
                      return (
                        Ir(t, e, () => {
                          (r = n[Tg]()),
                            Ir(
                              t,
                              e,
                              () => {
                                let o, i;
                                try {
                                  ({ value: o, done: i } = r.next());
                                } catch (s) {
                                  return void t.error(s);
                                }
                                i ? t.complete() : t.next(o);
                              },
                              0,
                              !0
                            );
                        }),
                        () => k(r?.return) && r.return()
                      );
                    });
                  })(n, e);
                if (Ng(n))
                  return (function $D(n, e) {
                    return Bg(kg(n), e);
                  })(n, e);
              }
              throw Ag(n);
            })(n, e)
          : An(n);
      }
      function Ru(n, e, ...t) {
        if (!0 === e) return void n();
        if (!1 === e) return;
        const r = new B({
          next: () => {
            r.unsubscribe(), n();
          },
        });
        return e(...t).subscribe(r);
      }
      function Fe(n) {
        for (let e in n) if (n[e] === Fe) return e;
        throw Error("Could not find renamed property on target object.");
      }
      function Fu(n, e) {
        for (const t in e)
          e.hasOwnProperty(t) && !n.hasOwnProperty(t) && (n[t] = e[t]);
      }
      function Le(n) {
        if ("string" == typeof n) return n;
        if (Array.isArray(n)) return "[" + n.map(Le).join(", ") + "]";
        if (null == n) return "" + n;
        if (n.overriddenName) return `${n.overriddenName}`;
        if (n.name) return `${n.name}`;
        const e = n.toString();
        if (null == e) return "" + e;
        const t = e.indexOf("\n");
        return -1 === t ? e : e.substring(0, t);
      }
      function Lu(n, e) {
        return null == n || "" === n
          ? null === e
            ? ""
            : e
          : null == e || "" === e
          ? n
          : n + " " + e;
      }
      const WD = Fe({ __forward_ref__: Fe });
      function Be(n) {
        return (
          (n.__forward_ref__ = Be),
          (n.toString = function () {
            return Le(this());
          }),
          n
        );
      }
      function K(n) {
        return Vu(n) ? n() : n;
      }
      function Vu(n) {
        return (
          "function" == typeof n &&
          n.hasOwnProperty(WD) &&
          n.__forward_ref__ === Be
        );
      }
      class M extends Error {
        constructor(e, t) {
          super(
            (function Wa(n, e) {
              return `NG0${Math.abs(n)}${e ? ": " + e.trim() : ""}`;
            })(e, t)
          ),
            (this.code = e);
        }
      }
      function ee(n) {
        return "string" == typeof n ? n : null == n ? "" : String(n);
      }
      function qa(n, e) {
        throw new M(-201, !1);
      }
      function hn(n, e) {
        null == n &&
          (function Se(n, e, t, r) {
            throw new Error(
              `ASSERTION ERROR: ${n}` +
                (null == r ? "" : ` [Expected=> ${t} ${r} ${e} <=Actual]`)
            );
          })(e, n, null, "!=");
      }
      function R(n) {
        return {
          token: n.token,
          providedIn: n.providedIn || null,
          factory: n.factory,
          value: void 0,
        };
      }
      function ft(n) {
        return { providers: n.providers || [], imports: n.imports || [] };
      }
      function Ka(n) {
        return jg(n, Qa) || jg(n, $g);
      }
      function jg(n, e) {
        return n.hasOwnProperty(e) ? n[e] : null;
      }
      function Ug(n) {
        return n && (n.hasOwnProperty(Bu) || n.hasOwnProperty(tE))
          ? n[Bu]
          : null;
      }
      const Qa = Fe({ ɵprov: Fe }),
        Bu = Fe({ ɵinj: Fe }),
        $g = Fe({ ngInjectableDef: Fe }),
        tE = Fe({ ngInjectorDef: Fe });
      var z = (() => (
        ((z = z || {})[(z.Default = 0)] = "Default"),
        (z[(z.Host = 1)] = "Host"),
        (z[(z.Self = 2)] = "Self"),
        (z[(z.SkipSelf = 4)] = "SkipSelf"),
        (z[(z.Optional = 8)] = "Optional"),
        z
      ))();
      let ju;
      function Tn(n) {
        const e = ju;
        return (ju = n), e;
      }
      function Hg(n, e, t) {
        const r = Ka(n);
        return r && "root" == r.providedIn
          ? void 0 === r.value
            ? (r.value = r.factory())
            : r.value
          : t & z.Optional
          ? null
          : void 0 !== e
          ? e
          : void qa(Le(n));
      }
      function ro(n) {
        return { toString: n }.toString();
      }
      var Gn = (() => (
          ((Gn = Gn || {})[(Gn.OnPush = 0)] = "OnPush"),
          (Gn[(Gn.Default = 1)] = "Default"),
          Gn
        ))(),
        Wn = (() => {
          return (
            ((n = Wn || (Wn = {}))[(n.Emulated = 0)] = "Emulated"),
            (n[(n.None = 2)] = "None"),
            (n[(n.ShadowDom = 3)] = "ShadowDom"),
            Wn
          );
          var n;
        })();
      const Ve = (() =>
          (typeof globalThis < "u" && globalThis) ||
          (typeof global < "u" && global) ||
          (typeof window < "u" && window) ||
          (typeof self < "u" &&
            typeof WorkerGlobalScope < "u" &&
            self instanceof WorkerGlobalScope &&
            self))(),
        ai = {},
        xe = [],
        Za = Fe({ ɵcmp: Fe }),
        Uu = Fe({ ɵdir: Fe }),
        $u = Fe({ ɵpipe: Fe }),
        zg = Fe({ ɵmod: Fe }),
        Rr = Fe({ ɵfac: Fe }),
        gs = Fe({ __NG_ELEMENT_ID__: Fe });
      let rE = 0;
      function qt(n) {
        return ro(() => {
          const t = !0 === n.standalone,
            r = {},
            o = {
              type: n.type,
              providersResolver: null,
              decls: n.decls,
              vars: n.vars,
              factory: null,
              template: n.template || null,
              consts: n.consts || null,
              ngContentSelectors: n.ngContentSelectors,
              hostBindings: n.hostBindings || null,
              hostVars: n.hostVars || 0,
              hostAttrs: n.hostAttrs || null,
              contentQueries: n.contentQueries || null,
              declaredInputs: r,
              inputs: null,
              outputs: null,
              exportAs: n.exportAs || null,
              onPush: n.changeDetection === Gn.OnPush,
              directiveDefs: null,
              pipeDefs: null,
              standalone: t,
              dependencies: (t && n.dependencies) || null,
              getStandaloneInjector: null,
              selectors: n.selectors || xe,
              viewQuery: n.viewQuery || null,
              features: n.features || null,
              data: n.data || {},
              encapsulation: n.encapsulation || Wn.Emulated,
              id: "c" + rE++,
              styles: n.styles || xe,
              _: null,
              setInput: null,
              schemas: n.schemas || null,
              tView: null,
            },
            i = n.dependencies,
            s = n.features;
          return (
            (o.inputs = qg(n.inputs, r)),
            (o.outputs = qg(n.outputs)),
            s && s.forEach((a) => a(o)),
            (o.directiveDefs = i
              ? () => ("function" == typeof i ? i() : i).map(Gg).filter(Wg)
              : null),
            (o.pipeDefs = i
              ? () => ("function" == typeof i ? i() : i).map(Qt).filter(Wg)
              : null),
            o
          );
        });
      }
      function Gg(n) {
        return Ie(n) || Kt(n);
      }
      function Wg(n) {
        return null !== n;
      }
      function yt(n) {
        return ro(() => ({
          type: n.type,
          bootstrap: n.bootstrap || xe,
          declarations: n.declarations || xe,
          imports: n.imports || xe,
          exports: n.exports || xe,
          transitiveCompileScopes: null,
          schemas: n.schemas || null,
          id: n.id || null,
        }));
      }
      function qg(n, e) {
        if (null == n) return ai;
        const t = {};
        for (const r in n)
          if (n.hasOwnProperty(r)) {
            let o = n[r],
              i = o;
            Array.isArray(o) && ((i = o[1]), (o = o[0])),
              (t[o] = r),
              e && (e[o] = i);
          }
        return t;
      }
      const G = qt;
      function It(n) {
        return {
          type: n.type,
          name: n.name,
          factory: null,
          pure: !1 !== n.pure,
          standalone: !0 === n.standalone,
          onDestroy: n.type.prototype.ngOnDestroy || null,
        };
      }
      function Ie(n) {
        return n[Za] || null;
      }
      function Kt(n) {
        return n[Uu] || null;
      }
      function Qt(n) {
        return n[$u] || null;
      }
      function pn(n, e) {
        const t = n[zg] || null;
        if (!t && !0 === e)
          throw new Error(`Type ${Le(n)} does not have '\u0275mod' property.`);
        return t;
      }
      function on(n) {
        return Array.isArray(n) && "object" == typeof n[1];
      }
      function Kn(n) {
        return Array.isArray(n) && !0 === n[1];
      }
      function Gu(n) {
        return 0 != (8 & n.flags);
      }
      function ec(n) {
        return 2 == (2 & n.flags);
      }
      function tc(n) {
        return 1 == (1 & n.flags);
      }
      function Qn(n) {
        return null !== n.template;
      }
      function lE(n) {
        return 0 != (256 & n[2]);
      }
      function Io(n, e) {
        return n.hasOwnProperty(Rr) ? n[Rr] : null;
      }
      class fE {
        constructor(e, t, r) {
          (this.previousValue = e),
            (this.currentValue = t),
            (this.firstChange = r);
        }
        isFirstChange() {
          return this.firstChange;
        }
      }
      function kn() {
        return Zg;
      }
      function Zg(n) {
        return n.type.prototype.ngOnChanges && (n.setInput = pE), hE;
      }
      function hE() {
        const n = Jg(this),
          e = n?.current;
        if (e) {
          const t = n.previous;
          if (t === ai) n.previous = e;
          else for (let r in e) t[r] = e[r];
          (n.current = null), this.ngOnChanges(e);
        }
      }
      function pE(n, e, t, r) {
        const o =
            Jg(n) ||
            (function gE(n, e) {
              return (n[Yg] = e);
            })(n, { previous: ai, current: null }),
          i = o.current || (o.current = {}),
          s = o.previous,
          a = this.declaredInputs[t],
          c = s[a];
        (i[a] = new fE(c && c.currentValue, e, s === ai)), (n[r] = e);
      }
      kn.ngInherit = !0;
      const Yg = "__ngSimpleChanges__";
      function Jg(n) {
        return n[Yg] || null;
      }
      function ht(n) {
        for (; Array.isArray(n); ) n = n[0];
        return n;
      }
      function nc(n, e) {
        return ht(e[n]);
      }
      function Rn(n, e) {
        return ht(e[n.index]);
      }
      function Zu(n, e) {
        return n.data[e];
      }
      function hi(n, e) {
        return n[e];
      }
      function mn(n, e) {
        const t = e[n];
        return on(t) ? t : t[0];
      }
      function Xg(n) {
        return 4 == (4 & n[2]);
      }
      function rc(n) {
        return 64 == (64 & n[2]);
      }
      function oo(n, e) {
        return null == e ? null : n[e];
      }
      function em(n) {
        n[18] = 0;
      }
      function Yu(n, e) {
        n[5] += e;
        let t = n,
          r = n[3];
        for (
          ;
          null !== r && ((1 === e && 1 === t[5]) || (-1 === e && 0 === t[5]));

        )
          (r[5] += e), (t = r), (r = r[3]);
      }
      const X = { lFrame: lm(null), bindingsEnabled: !0 };
      function nm() {
        return X.bindingsEnabled;
      }
      function D() {
        return X.lFrame.lView;
      }
      function we() {
        return X.lFrame.tView;
      }
      function Ot(n) {
        return (X.lFrame.contextLView = n), n[8];
      }
      function Pt(n) {
        return (X.lFrame.contextLView = null), n;
      }
      function vt() {
        let n = rm();
        for (; null !== n && 64 === n.type; ) n = n.parent;
        return n;
      }
      function rm() {
        return X.lFrame.currentTNode;
      }
      function dr(n, e) {
        const t = X.lFrame;
        (t.currentTNode = n), (t.isParent = e);
      }
      function Ju() {
        return X.lFrame.isParent;
      }
      function Xu() {
        X.lFrame.isParent = !1;
      }
      function Zt() {
        const n = X.lFrame;
        let e = n.bindingRootIndex;
        return (
          -1 === e && (e = n.bindingRootIndex = n.tView.bindingStartIndex), e
        );
      }
      function pi() {
        return X.lFrame.bindingIndex++;
      }
      function Lr(n) {
        const e = X.lFrame,
          t = e.bindingIndex;
        return (e.bindingIndex = e.bindingIndex + n), t;
      }
      function SE(n, e) {
        const t = X.lFrame;
        (t.bindingIndex = t.bindingRootIndex = n), ed(e);
      }
      function ed(n) {
        X.lFrame.currentDirectiveIndex = n;
      }
      function sm() {
        return X.lFrame.currentQueryIndex;
      }
      function nd(n) {
        X.lFrame.currentQueryIndex = n;
      }
      function TE(n) {
        const e = n[1];
        return 2 === e.type ? e.declTNode : 1 === e.type ? n[6] : null;
      }
      function am(n, e, t) {
        if (t & z.SkipSelf) {
          let o = e,
            i = n;
          for (
            ;
            !((o = o.parent),
            null !== o ||
              t & z.Host ||
              ((o = TE(i)), null === o || ((i = i[15]), 10 & o.type)));

          );
          if (null === o) return !1;
          (e = o), (n = i);
        }
        const r = (X.lFrame = cm());
        return (r.currentTNode = e), (r.lView = n), !0;
      }
      function rd(n) {
        const e = cm(),
          t = n[1];
        (X.lFrame = e),
          (e.currentTNode = t.firstChild),
          (e.lView = n),
          (e.tView = t),
          (e.contextLView = n),
          (e.bindingIndex = t.bindingStartIndex),
          (e.inI18n = !1);
      }
      function cm() {
        const n = X.lFrame,
          e = null === n ? null : n.child;
        return null === e ? lm(n) : e;
      }
      function lm(n) {
        const e = {
          currentTNode: null,
          isParent: !0,
          lView: null,
          tView: null,
          selectedIndex: -1,
          contextLView: null,
          elementDepthCount: 0,
          currentNamespace: null,
          currentDirectiveIndex: -1,
          bindingRootIndex: -1,
          bindingIndex: -1,
          currentQueryIndex: 0,
          parent: n,
          child: null,
          inI18n: !1,
        };
        return null !== n && (n.child = e), e;
      }
      function um() {
        const n = X.lFrame;
        return (
          (X.lFrame = n.parent), (n.currentTNode = null), (n.lView = null), n
        );
      }
      const dm = um;
      function od() {
        const n = um();
        (n.isParent = !0),
          (n.tView = null),
          (n.selectedIndex = -1),
          (n.contextLView = null),
          (n.elementDepthCount = 0),
          (n.currentDirectiveIndex = -1),
          (n.currentNamespace = null),
          (n.bindingRootIndex = -1),
          (n.bindingIndex = -1),
          (n.currentQueryIndex = 0);
      }
      function Yt() {
        return X.lFrame.selectedIndex;
      }
      function io(n) {
        X.lFrame.selectedIndex = n;
      }
      function rt() {
        const n = X.lFrame;
        return Zu(n.tView, n.selectedIndex);
      }
      function id() {
        X.lFrame.currentNamespace = "svg";
      }
      function sd() {
        !(function RE() {
          X.lFrame.currentNamespace = null;
        })();
      }
      function ic(n, e) {
        for (let t = e.directiveStart, r = e.directiveEnd; t < r; t++) {
          const i = n.data[t].type.prototype,
            {
              ngAfterContentInit: s,
              ngAfterContentChecked: a,
              ngAfterViewInit: c,
              ngAfterViewChecked: l,
              ngOnDestroy: u,
            } = i;
          s && (n.contentHooks || (n.contentHooks = [])).push(-t, s),
            a &&
              ((n.contentHooks || (n.contentHooks = [])).push(t, a),
              (n.contentCheckHooks || (n.contentCheckHooks = [])).push(t, a)),
            c && (n.viewHooks || (n.viewHooks = [])).push(-t, c),
            l &&
              ((n.viewHooks || (n.viewHooks = [])).push(t, l),
              (n.viewCheckHooks || (n.viewCheckHooks = [])).push(t, l)),
            null != u && (n.destroyHooks || (n.destroyHooks = [])).push(t, u);
        }
      }
      function sc(n, e, t) {
        fm(n, e, 3, t);
      }
      function ac(n, e, t, r) {
        (3 & n[2]) === t && fm(n, e, t, r);
      }
      function ad(n, e) {
        let t = n[2];
        (3 & t) === e && ((t &= 2047), (t += 1), (n[2] = t));
      }
      function fm(n, e, t, r) {
        const i = r ?? -1,
          s = e.length - 1;
        let a = 0;
        for (let c = void 0 !== r ? 65535 & n[18] : 0; c < s; c++)
          if ("number" == typeof e[c + 1]) {
            if (((a = e[c]), null != r && a >= r)) break;
          } else
            e[c] < 0 && (n[18] += 65536),
              (a < i || -1 == i) &&
                (VE(n, t, e, c), (n[18] = (4294901760 & n[18]) + c + 2)),
              c++;
      }
      function VE(n, e, t, r) {
        const o = t[r] < 0,
          i = t[r + 1],
          a = n[o ? -t[r] : t[r]];
        if (o) {
          if (n[2] >> 11 < n[18] >> 16 && (3 & n[2]) === e) {
            n[2] += 2048;
            try {
              i.call(a);
            } finally {
            }
          }
        } else
          try {
            i.call(a);
          } finally {
          }
      }
      class Cs {
        constructor(e, t, r) {
          (this.factory = e),
            (this.resolving = !1),
            (this.canSeeViewProviders = t),
            (this.injectImpl = r);
        }
      }
      function cc(n, e, t) {
        let r = 0;
        for (; r < t.length; ) {
          const o = t[r];
          if ("number" == typeof o) {
            if (0 !== o) break;
            r++;
            const i = t[r++],
              s = t[r++],
              a = t[r++];
            n.setAttribute(e, s, a, i);
          } else {
            const i = o,
              s = t[++r];
            pm(i) ? n.setProperty(e, i, s) : n.setAttribute(e, i, s), r++;
          }
        }
        return r;
      }
      function hm(n) {
        return 3 === n || 4 === n || 6 === n;
      }
      function pm(n) {
        return 64 === n.charCodeAt(0);
      }
      function lc(n, e) {
        if (null !== e && 0 !== e.length)
          if (null === n || 0 === n.length) n = e.slice();
          else {
            let t = -1;
            for (let r = 0; r < e.length; r++) {
              const o = e[r];
              "number" == typeof o
                ? (t = o)
                : 0 === t ||
                  gm(n, t, o, null, -1 === t || 2 === t ? e[++r] : null);
            }
          }
        return n;
      }
      function gm(n, e, t, r, o) {
        let i = 0,
          s = n.length;
        if (-1 === e) s = -1;
        else
          for (; i < n.length; ) {
            const a = n[i++];
            if ("number" == typeof a) {
              if (a === e) {
                s = -1;
                break;
              }
              if (a > e) {
                s = i - 1;
                break;
              }
            }
          }
        for (; i < n.length; ) {
          const a = n[i];
          if ("number" == typeof a) break;
          if (a === t) {
            if (null === r) return void (null !== o && (n[i + 1] = o));
            if (r === n[i + 1]) return void (n[i + 2] = o);
          }
          i++, null !== r && i++, null !== o && i++;
        }
        -1 !== s && (n.splice(s, 0, e), (i = s + 1)),
          n.splice(i++, 0, t),
          null !== r && n.splice(i++, 0, r),
          null !== o && n.splice(i++, 0, o);
      }
      function mm(n) {
        return -1 !== n;
      }
      function gi(n) {
        return 32767 & n;
      }
      function mi(n, e) {
        let t = (function HE(n) {
            return n >> 16;
          })(n),
          r = e;
        for (; t > 0; ) (r = r[15]), t--;
        return r;
      }
      let ld = !0;
      function uc(n) {
        const e = ld;
        return (ld = n), e;
      }
      let zE = 0;
      const fr = {};
      function ws(n, e) {
        const t = dd(n, e);
        if (-1 !== t) return t;
        const r = e[1];
        r.firstCreatePass &&
          ((n.injectorIndex = e.length),
          ud(r.data, n),
          ud(e, null),
          ud(r.blueprint, null));
        const o = dc(n, e),
          i = n.injectorIndex;
        if (mm(o)) {
          const s = gi(o),
            a = mi(o, e),
            c = a[1].data;
          for (let l = 0; l < 8; l++) e[i + l] = a[s + l] | c[s + l];
        }
        return (e[i + 8] = o), i;
      }
      function ud(n, e) {
        n.push(0, 0, 0, 0, 0, 0, 0, 0, e);
      }
      function dd(n, e) {
        return -1 === n.injectorIndex ||
          (n.parent && n.parent.injectorIndex === n.injectorIndex) ||
          null === e[n.injectorIndex + 8]
          ? -1
          : n.injectorIndex;
      }
      function dc(n, e) {
        if (n.parent && -1 !== n.parent.injectorIndex)
          return n.parent.injectorIndex;
        let t = 0,
          r = null,
          o = e;
        for (; null !== o; ) {
          if (((r = Em(o)), null === r)) return -1;
          if ((t++, (o = o[15]), -1 !== r.injectorIndex))
            return r.injectorIndex | (t << 16);
        }
        return -1;
      }
      function fc(n, e, t) {
        !(function GE(n, e, t) {
          let r;
          "string" == typeof t
            ? (r = t.charCodeAt(0) || 0)
            : t.hasOwnProperty(gs) && (r = t[gs]),
            null == r && (r = t[gs] = zE++);
          const o = 255 & r;
          e.data[n + (o >> 5)] |= 1 << o;
        })(n, e, t);
      }
      function vm(n, e, t) {
        if (t & z.Optional) return n;
        qa();
      }
      function Cm(n, e, t, r) {
        if (
          (t & z.Optional && void 0 === r && (r = null),
          0 == (t & (z.Self | z.Host)))
        ) {
          const o = n[9],
            i = Tn(void 0);
          try {
            return o ? o.get(e, r, t & z.Optional) : Hg(e, r, t & z.Optional);
          } finally {
            Tn(i);
          }
        }
        return vm(r, 0, t);
      }
      function bm(n, e, t, r = z.Default, o) {
        if (null !== n) {
          if (1024 & e[2]) {
            const s = (function ZE(n, e, t, r, o) {
              let i = n,
                s = e;
              for (
                ;
                null !== i && null !== s && 1024 & s[2] && !(256 & s[2]);

              ) {
                const a = wm(i, s, t, r | z.Self, fr);
                if (a !== fr) return a;
                let c = i.parent;
                if (!c) {
                  const l = s[21];
                  if (l) {
                    const u = l.get(t, fr, r);
                    if (u !== fr) return u;
                  }
                  (c = Em(s)), (s = s[15]);
                }
                i = c;
              }
              return o;
            })(n, e, t, r, fr);
            if (s !== fr) return s;
          }
          const i = wm(n, e, t, r, fr);
          if (i !== fr) return i;
        }
        return Cm(e, t, r, o);
      }
      function wm(n, e, t, r, o) {
        const i = (function KE(n) {
          if ("string" == typeof n) return n.charCodeAt(0) || 0;
          const e = n.hasOwnProperty(gs) ? n[gs] : void 0;
          return "number" == typeof e ? (e >= 0 ? 255 & e : QE) : e;
        })(t);
        if ("function" == typeof i) {
          if (!am(e, n, r)) return r & z.Host ? vm(o, 0, r) : Cm(e, t, r, o);
          try {
            const s = i(r);
            if (null != s || r & z.Optional) return s;
            qa();
          } finally {
            dm();
          }
        } else if ("number" == typeof i) {
          let s = null,
            a = dd(n, e),
            c = -1,
            l = r & z.Host ? e[16][6] : null;
          for (
            (-1 === a || r & z.SkipSelf) &&
            ((c = -1 === a ? dc(n, e) : e[a + 8]),
            -1 !== c && Dm(r, !1)
              ? ((s = e[1]), (a = gi(c)), (e = mi(c, e)))
              : (a = -1));
            -1 !== a;

          ) {
            const u = e[1];
            if (Mm(i, a, u.data)) {
              const d = qE(a, e, t, s, r, l);
              if (d !== fr) return d;
            }
            (c = e[a + 8]),
              -1 !== c && Dm(r, e[1].data[a + 8] === l) && Mm(i, a, e)
                ? ((s = u), (a = gi(c)), (e = mi(c, e)))
                : (a = -1);
          }
        }
        return o;
      }
      function qE(n, e, t, r, o, i) {
        const s = e[1],
          a = s.data[n + 8],
          u = hc(
            a,
            s,
            t,
            null == r ? ec(a) && ld : r != s && 0 != (3 & a.type),
            o & z.Host && i === a
          );
        return null !== u ? Ms(e, s, u, a) : fr;
      }
      function hc(n, e, t, r, o) {
        const i = n.providerIndexes,
          s = e.data,
          a = 1048575 & i,
          c = n.directiveStart,
          u = i >> 20,
          f = o ? a + u : n.directiveEnd;
        for (let h = r ? a : a + u; h < f; h++) {
          const p = s[h];
          if ((h < c && t === p) || (h >= c && p.type === t)) return h;
        }
        if (o) {
          const h = s[c];
          if (h && Qn(h) && h.type === t) return c;
        }
        return null;
      }
      function Ms(n, e, t, r) {
        let o = n[t];
        const i = e.data;
        if (
          (function BE(n) {
            return n instanceof Cs;
          })(o)
        ) {
          const s = o;
          s.resolving &&
            (function qD(n, e) {
              const t = e ? `. Dependency path: ${e.join(" > ")} > ${n}` : "";
              throw new M(
                -200,
                `Circular dependency in DI detected for ${n}${t}`
              );
            })(
              (function Pe(n) {
                return "function" == typeof n
                  ? n.name || n.toString()
                  : "object" == typeof n &&
                    null != n &&
                    "function" == typeof n.type
                  ? n.type.name || n.type.toString()
                  : ee(n);
              })(i[t])
            );
          const a = uc(s.canSeeViewProviders);
          s.resolving = !0;
          const c = s.injectImpl ? Tn(s.injectImpl) : null;
          am(n, r, z.Default);
          try {
            (o = n[t] = s.factory(void 0, i, n, r)),
              e.firstCreatePass &&
                t >= r.directiveStart &&
                (function LE(n, e, t) {
                  const {
                    ngOnChanges: r,
                    ngOnInit: o,
                    ngDoCheck: i,
                  } = e.type.prototype;
                  if (r) {
                    const s = Zg(e);
                    (t.preOrderHooks || (t.preOrderHooks = [])).push(n, s),
                      (
                        t.preOrderCheckHooks || (t.preOrderCheckHooks = [])
                      ).push(n, s);
                  }
                  o &&
                    (t.preOrderHooks || (t.preOrderHooks = [])).push(0 - n, o),
                    i &&
                      ((t.preOrderHooks || (t.preOrderHooks = [])).push(n, i),
                      (
                        t.preOrderCheckHooks || (t.preOrderCheckHooks = [])
                      ).push(n, i));
                })(t, i[t], e);
          } finally {
            null !== c && Tn(c), uc(a), (s.resolving = !1), dm();
          }
        }
        return o;
      }
      function Mm(n, e, t) {
        return !!(t[e + (n >> 5)] & (1 << n));
      }
      function Dm(n, e) {
        return !(n & z.Self || (n & z.Host && e));
      }
      class _i {
        constructor(e, t) {
          (this._tNode = e), (this._lView = t);
        }
        get(e, t, r) {
          return bm(this._tNode, this._lView, e, r, t);
        }
      }
      function QE() {
        return new _i(vt(), D());
      }
      function Rt(n) {
        return ro(() => {
          const e = n.prototype.constructor,
            t = e[Rr] || fd(e),
            r = Object.prototype;
          let o = Object.getPrototypeOf(n.prototype).constructor;
          for (; o && o !== r; ) {
            const i = o[Rr] || fd(o);
            if (i && i !== t) return i;
            o = Object.getPrototypeOf(o);
          }
          return (i) => new i();
        });
      }
      function fd(n) {
        return Vu(n)
          ? () => {
              const e = fd(K(n));
              return e && e();
            }
          : Io(n);
      }
      function Em(n) {
        const e = n[1],
          t = e.type;
        return 2 === t ? e.declTNode : 1 === t ? n[6] : null;
      }
      function Ds(n) {
        return (function WE(n, e) {
          if ("class" === e) return n.classes;
          if ("style" === e) return n.styles;
          const t = n.attrs;
          if (t) {
            const r = t.length;
            let o = 0;
            for (; o < r; ) {
              const i = t[o];
              if (hm(i)) break;
              if (0 === i) o += 2;
              else if ("number" == typeof i)
                for (o++; o < r && "string" == typeof t[o]; ) o++;
              else {
                if (i === e) return t[o + 1];
                o += 2;
              }
            }
          }
          return null;
        })(vt(), n);
      }
      const vi = "__parameters__";
      function bi(n, e, t) {
        return ro(() => {
          const r = (function hd(n) {
            return function (...t) {
              if (n) {
                const r = n(...t);
                for (const o in r) this[o] = r[o];
              }
            };
          })(e);
          function o(...i) {
            if (this instanceof o) return r.apply(this, i), this;
            const s = new o(...i);
            return (a.annotation = s), a;
            function a(c, l, u) {
              const d = c.hasOwnProperty(vi)
                ? c[vi]
                : Object.defineProperty(c, vi, { value: [] })[vi];
              for (; d.length <= u; ) d.push(null);
              return (d[u] = d[u] || []).push(s), c;
            }
          }
          return (
            t && (o.prototype = Object.create(t.prototype)),
            (o.prototype.ngMetadataName = n),
            (o.annotationCls = o),
            o
          );
        });
      }
      class F {
        constructor(e, t) {
          (this._desc = e),
            (this.ngMetadataName = "InjectionToken"),
            (this.ɵprov = void 0),
            "number" == typeof t
              ? (this.__NG_ELEMENT_ID__ = t)
              : void 0 !== t &&
                (this.ɵprov = R({
                  token: this,
                  providedIn: t.providedIn || "root",
                  factory: t.factory,
                }));
        }
        get multi() {
          return this;
        }
        toString() {
          return `InjectionToken ${this._desc}`;
        }
      }
      function _n(n, e) {
        void 0 === e && (e = n);
        for (let t = 0; t < n.length; t++) {
          let r = n[t];
          Array.isArray(r)
            ? (e === n && (e = n.slice(0, t)), _n(r, e))
            : e !== n && e.push(r);
        }
        return e;
      }
      function Vr(n, e) {
        n.forEach((t) => (Array.isArray(t) ? Vr(t, e) : e(t)));
      }
      function Pm(n, e, t) {
        e >= n.length ? n.push(t) : n.splice(e, 0, t);
      }
      function pc(n, e) {
        return e >= n.length - 1 ? n.pop() : n.splice(e, 1)[0];
      }
      function Ps(n, e) {
        const t = [];
        for (let r = 0; r < n; r++) t.push(e);
        return t;
      }
      function yn(n, e, t) {
        let r = wi(n, e);
        return (
          r >= 0
            ? (n[1 | r] = t)
            : ((r = ~r),
              (function eO(n, e, t, r) {
                let o = n.length;
                if (o == e) n.push(t, r);
                else if (1 === o) n.push(r, n[0]), (n[0] = t);
                else {
                  for (o--, n.push(n[o - 1], n[o]); o > e; )
                    (n[o] = n[o - 2]), o--;
                  (n[e] = t), (n[e + 1] = r);
                }
              })(n, r, e, t)),
          r
        );
      }
      function gd(n, e) {
        const t = wi(n, e);
        if (t >= 0) return n[1 | t];
      }
      function wi(n, e) {
        return (function Am(n, e, t) {
          let r = 0,
            o = n.length >> t;
          for (; o !== r; ) {
            const i = r + ((o - r) >> 1),
              s = n[i << t];
            if (e === s) return i << t;
            s > e ? (o = i) : (r = i + 1);
          }
          return ~(o << t);
        })(n, e, 1);
      }
      const xs = {},
        _d = "__NG_DI_FLAG__",
        mc = "ngTempTokenPath",
        cO = /\n/gm,
        Tm = "__source";
      let Ss;
      function Mi(n) {
        const e = Ss;
        return (Ss = n), e;
      }
      function uO(n, e = z.Default) {
        if (void 0 === Ss) throw new M(-203, !1);
        return null === Ss
          ? Hg(n, void 0, e)
          : Ss.get(n, e & z.Optional ? null : void 0, e);
      }
      function P(n, e = z.Default) {
        return (
          (function nE() {
            return ju;
          })() || uO
        )(K(n), e);
      }
      function Qe(n, e = z.Default) {
        return (
          "number" != typeof e &&
            (e =
              0 |
              (e.optional && 8) |
              (e.host && 1) |
              (e.self && 2) |
              (e.skipSelf && 4)),
          P(n, e)
        );
      }
      function yd(n) {
        const e = [];
        for (let t = 0; t < n.length; t++) {
          const r = K(n[t]);
          if (Array.isArray(r)) {
            if (0 === r.length) throw new M(900, !1);
            let o,
              i = z.Default;
            for (let s = 0; s < r.length; s++) {
              const a = r[s],
                c = dO(a);
              "number" == typeof c
                ? -1 === c
                  ? (o = a.token)
                  : (i |= c)
                : (o = a);
            }
            e.push(P(o, i));
          } else e.push(P(r));
        }
        return e;
      }
      function As(n, e) {
        return (n[_d] = e), (n.prototype[_d] = e), n;
      }
      function dO(n) {
        return n[_d];
      }
      const Ts = As(bi("Optional"), 8),
        Is = As(bi("SkipSelf"), 4);
      let Cd;
      class zm {
        constructor(e) {
          this.changingThisBreaksApplicationSecurity = e;
        }
        toString() {
          return `SafeValue must use [property]=binding: ${this.changingThisBreaksApplicationSecurity} (see https://g.co/ng/security#xss)`;
        }
      }
      function ao(n) {
        return n instanceof zm ? n.changingThisBreaksApplicationSecurity : n;
      }
      const RO =
        /^(?:(?:https?|mailto|data|ftp|tel|file|sms):|[^&:/?#]*(?:[/?#]|$))/gi;
      var pt = (() => (
        ((pt = pt || {})[(pt.NONE = 0)] = "NONE"),
        (pt[(pt.HTML = 1)] = "HTML"),
        (pt[(pt.STYLE = 2)] = "STYLE"),
        (pt[(pt.SCRIPT = 3)] = "SCRIPT"),
        (pt[(pt.URL = 4)] = "URL"),
        (pt[(pt.RESOURCE_URL = 5)] = "RESOURCE_URL"),
        pt
      ))();
      function sn(n) {
        const e = (function Ls() {
          const n = D();
          return n && n[12];
        })();
        return e
          ? e.sanitize(pt.URL, n) || ""
          : (function Rs(n, e) {
              const t = (function TO(n) {
                return (n instanceof zm && n.getTypeName()) || null;
              })(n);
              if (null != t && t !== e) {
                if ("ResourceURL" === t && "URL" === e) return !0;
                throw new Error(
                  `Required a safe ${e}, got a ${t} (see https://g.co/ng/security#xss)`
                );
              }
              return t === e;
            })(n, "URL")
          ? ao(n)
          : (function bc(n) {
              return (n = String(n)).match(RO) ? n : "unsafe:" + n;
            })(ee(n));
      }
      const Pd = new F("ENVIRONMENT_INITIALIZER"),
        Xm = new F("INJECTOR", -1),
        e_ = new F("INJECTOR_DEF_TYPES");
      class t_ {
        get(e, t = xs) {
          if (t === xs) {
            const r = new Error(`NullInjectorError: No provider for ${Le(e)}!`);
            throw ((r.name = "NullInjectorError"), r);
          }
          return t;
        }
      }
      function QO(...n) {
        return { ɵproviders: n_(0, n) };
      }
      function n_(n, ...e) {
        const t = [],
          r = new Set();
        let o;
        return (
          Vr(e, (i) => {
            const s = i;
            xd(s, t, [], r) && (o || (o = []), o.push(s));
          }),
          void 0 !== o && r_(o, t),
          t
        );
      }
      function r_(n, e) {
        for (let t = 0; t < n.length; t++) {
          const { providers: o } = n[t];
          Vr(o, (i) => {
            e.push(i);
          });
        }
      }
      function xd(n, e, t, r) {
        if (!(n = K(n))) return !1;
        let o = null,
          i = Ug(n);
        const s = !i && Ie(n);
        if (i || s) {
          if (s && !s.standalone) return !1;
          o = n;
        } else {
          const c = n.ngModule;
          if (((i = Ug(c)), !i)) return !1;
          o = c;
        }
        const a = r.has(o);
        if (s) {
          if (a) return !1;
          if ((r.add(o), s.dependencies)) {
            const c =
              "function" == typeof s.dependencies
                ? s.dependencies()
                : s.dependencies;
            for (const l of c) xd(l, e, t, r);
          }
        } else {
          if (!i) return !1;
          {
            if (null != i.imports && !a) {
              let l;
              r.add(o);
              try {
                Vr(i.imports, (u) => {
                  xd(u, e, t, r) && (l || (l = []), l.push(u));
                });
              } finally {
              }
              void 0 !== l && r_(l, e);
            }
            if (!a) {
              const l = Io(o) || (() => new o());
              e.push(
                { provide: o, useFactory: l, deps: xe },
                { provide: e_, useValue: o, multi: !0 },
                { provide: Pd, useValue: () => P(o), multi: !0 }
              );
            }
            const c = i.providers;
            null == c ||
              a ||
              Vr(c, (u) => {
                e.push(u);
              });
          }
        }
        return o !== n && void 0 !== n.providers;
      }
      const ZO = Fe({ provide: String, useValue: Fe });
      function Sd(n) {
        return null !== n && "object" == typeof n && ZO in n;
      }
      function ko(n) {
        return "function" == typeof n;
      }
      const Ad = new F("Set Injector scope."),
        Mc = {},
        JO = {};
      let Td;
      function Dc() {
        return void 0 === Td && (Td = new t_()), Td;
      }
      class co {}
      class s_ extends co {
        constructor(e, t, r, o) {
          super(),
            (this.parent = t),
            (this.source = r),
            (this.scopes = o),
            (this.records = new Map()),
            (this._ngOnDestroyHooks = new Set()),
            (this._onDestroyHooks = []),
            (this._destroyed = !1),
            kd(e, (s) => this.processProvider(s)),
            this.records.set(Xm, Oi(void 0, this)),
            o.has("environment") && this.records.set(co, Oi(void 0, this));
          const i = this.records.get(Ad);
          null != i && "string" == typeof i.value && this.scopes.add(i.value),
            (this.injectorDefTypes = new Set(this.get(e_.multi, xe, z.Self)));
        }
        get destroyed() {
          return this._destroyed;
        }
        destroy() {
          this.assertNotDestroyed(), (this._destroyed = !0);
          try {
            for (const e of this._ngOnDestroyHooks) e.ngOnDestroy();
            for (const e of this._onDestroyHooks) e();
          } finally {
            this.records.clear(),
              this._ngOnDestroyHooks.clear(),
              this.injectorDefTypes.clear(),
              (this._onDestroyHooks.length = 0);
          }
        }
        onDestroy(e) {
          this._onDestroyHooks.push(e);
        }
        runInContext(e) {
          this.assertNotDestroyed();
          const t = Mi(this),
            r = Tn(void 0);
          try {
            return e();
          } finally {
            Mi(t), Tn(r);
          }
        }
        get(e, t = xs, r = z.Default) {
          this.assertNotDestroyed();
          const o = Mi(this),
            i = Tn(void 0);
          try {
            if (!(r & z.SkipSelf)) {
              let a = this.records.get(e);
              if (void 0 === a) {
                const c =
                  (function rP(n) {
                    return (
                      "function" == typeof n ||
                      ("object" == typeof n && n instanceof F)
                    );
                  })(e) && Ka(e);
                (a = c && this.injectableDefInScope(c) ? Oi(Id(e), Mc) : null),
                  this.records.set(e, a);
              }
              if (null != a) return this.hydrate(e, a);
            }
            return (r & z.Self ? Dc() : this.parent).get(
              e,
              (t = r & z.Optional && t === xs ? null : t)
            );
          } catch (s) {
            if ("NullInjectorError" === s.name) {
              if (((s[mc] = s[mc] || []).unshift(Le(e)), o)) throw s;
              return (function fO(n, e, t, r) {
                const o = n[mc];
                throw (
                  (e[Tm] && o.unshift(e[Tm]),
                  (n.message = (function hO(n, e, t, r = null) {
                    n =
                      n && "\n" === n.charAt(0) && "\u0275" == n.charAt(1)
                        ? n.slice(2)
                        : n;
                    let o = Le(e);
                    if (Array.isArray(e)) o = e.map(Le).join(" -> ");
                    else if ("object" == typeof e) {
                      let i = [];
                      for (let s in e)
                        if (e.hasOwnProperty(s)) {
                          let a = e[s];
                          i.push(
                            s +
                              ":" +
                              ("string" == typeof a ? JSON.stringify(a) : Le(a))
                          );
                        }
                      o = `{${i.join(", ")}}`;
                    }
                    return `${t}${r ? "(" + r + ")" : ""}[${o}]: ${n.replace(
                      cO,
                      "\n  "
                    )}`;
                  })("\n" + n.message, o, t, r)),
                  (n.ngTokenPath = o),
                  (n[mc] = null),
                  n)
                );
              })(s, e, "R3InjectorError", this.source);
            }
            throw s;
          } finally {
            Tn(i), Mi(o);
          }
        }
        resolveInjectorInitializers() {
          const e = Mi(this),
            t = Tn(void 0);
          try {
            const r = this.get(Pd.multi, xe, z.Self);
            for (const o of r) o();
          } finally {
            Mi(e), Tn(t);
          }
        }
        toString() {
          const e = [],
            t = this.records;
          for (const r of t.keys()) e.push(Le(r));
          return `R3Injector[${e.join(", ")}]`;
        }
        assertNotDestroyed() {
          if (this._destroyed) throw new M(205, !1);
        }
        processProvider(e) {
          let t = ko((e = K(e))) ? e : K(e && e.provide);
          const r = (function eP(n) {
            return Sd(n) ? Oi(void 0, n.useValue) : Oi(a_(n), Mc);
          })(e);
          if (ko(e) || !0 !== e.multi) this.records.get(t);
          else {
            let o = this.records.get(t);
            o ||
              ((o = Oi(void 0, Mc, !0)),
              (o.factory = () => yd(o.multi)),
              this.records.set(t, o)),
              (t = e),
              o.multi.push(e);
          }
          this.records.set(t, r);
        }
        hydrate(e, t) {
          return (
            t.value === Mc && ((t.value = JO), (t.value = t.factory())),
            "object" == typeof t.value &&
              t.value &&
              (function nP(n) {
                return (
                  null !== n &&
                  "object" == typeof n &&
                  "function" == typeof n.ngOnDestroy
                );
              })(t.value) &&
              this._ngOnDestroyHooks.add(t.value),
            t.value
          );
        }
        injectableDefInScope(e) {
          if (!e.providedIn) return !1;
          const t = K(e.providedIn);
          return "string" == typeof t
            ? "any" === t || this.scopes.has(t)
            : this.injectorDefTypes.has(t);
        }
      }
      function Id(n) {
        const e = Ka(n),
          t = null !== e ? e.factory : Io(n);
        if (null !== t) return t;
        if (n instanceof F) throw new M(204, !1);
        if (n instanceof Function)
          return (function XO(n) {
            const e = n.length;
            if (e > 0) throw (Ps(e, "?"), new M(204, !1));
            const t = (function XD(n) {
              const e = n && (n[Qa] || n[$g]);
              if (e) {
                const t = (function eE(n) {
                  if (n.hasOwnProperty("name")) return n.name;
                  const e = ("" + n).match(/^function\s*([^\s(]+)/);
                  return null === e ? "" : e[1];
                })(n);
                return (
                  console.warn(
                    `DEPRECATED: DI is instantiating a token "${t}" that inherits its @Injectable decorator but does not provide one itself.\nThis will become an error in a future version of Angular. Please add @Injectable() to the "${t}" class.`
                  ),
                  e
                );
              }
              return null;
            })(n);
            return null !== t ? () => t.factory(n) : () => new n();
          })(n);
        throw new M(204, !1);
      }
      function a_(n, e, t) {
        let r;
        if (ko(n)) {
          const o = K(n);
          return Io(o) || Id(o);
        }
        if (Sd(n)) r = () => K(n.useValue);
        else if (
          (function i_(n) {
            return !(!n || !n.useFactory);
          })(n)
        )
          r = () => n.useFactory(...yd(n.deps || []));
        else if (
          (function o_(n) {
            return !(!n || !n.useExisting);
          })(n)
        )
          r = () => P(K(n.useExisting));
        else {
          const o = K(n && (n.useClass || n.provide));
          if (
            !(function tP(n) {
              return !!n.deps;
            })(n)
          )
            return Io(o) || Id(o);
          r = () => new o(...yd(n.deps));
        }
        return r;
      }
      function Oi(n, e, t = !1) {
        return { factory: n, value: e, multi: t ? [] : void 0 };
      }
      function oP(n) {
        return !!n.ɵproviders;
      }
      function kd(n, e) {
        for (const t of n)
          Array.isArray(t) ? kd(t, e) : oP(t) ? kd(t.ɵproviders, e) : e(t);
      }
      class c_ {}
      class aP {
        resolveComponentFactory(e) {
          throw (function sP(n) {
            const e = Error(
              `No component factory found for ${Le(
                n
              )}. Did you add it to @NgModule.entryComponents?`
            );
            return (e.ngComponent = n), e;
          })(e);
        }
      }
      let Vs = (() => {
        class n {}
        return (n.NULL = new aP()), n;
      })();
      function cP() {
        return Pi(vt(), D());
      }
      function Pi(n, e) {
        return new Ft(Rn(n, e));
      }
      let Ft = (() => {
        class n {
          constructor(t) {
            this.nativeElement = t;
          }
        }
        return (n.__NG_ELEMENT_ID__ = cP), n;
      })();
      function lP(n) {
        return n instanceof Ft ? n.nativeElement : n;
      }
      class Bs {}
      let Br = (() => {
          class n {}
          return (
            (n.__NG_ELEMENT_ID__ = () =>
              (function uP() {
                const n = D(),
                  t = mn(vt().index, n);
                return (on(t) ? t : n)[11];
              })()),
            n
          );
        })(),
        dP = (() => {
          class n {}
          return (
            (n.ɵprov = R({
              token: n,
              providedIn: "root",
              factory: () => null,
            })),
            n
          );
        })();
      class No {
        constructor(e) {
          (this.full = e),
            (this.major = e.split(".")[0]),
            (this.minor = e.split(".")[1]),
            (this.patch = e.split(".").slice(2).join("."));
        }
      }
      const fP = new No("14.2.1"),
        Nd = {};
      function Bd(n) {
        return n.ngOriginalError;
      }
      class xi {
        constructor() {
          this._console = console;
        }
        handleError(e) {
          const t = this._findOriginalError(e);
          this._console.error("ERROR", e),
            t && this._console.error("ORIGINAL ERROR", t);
        }
        _findOriginalError(e) {
          let t = e && Bd(e);
          for (; t && Bd(t); ) t = Bd(t);
          return t || null;
        }
      }
      const jd = new Map();
      let DP = 0;
      const $d = "__ngContext__";
      function Lt(n, e) {
        on(e)
          ? ((n[$d] = e[20]),
            (function OP(n) {
              jd.set(n[20], n);
            })(e))
          : (n[$d] = e);
      }
      function js(n) {
        const e = n[$d];
        return "number" == typeof e
          ? (function g_(n) {
              return jd.get(n) || null;
            })(e)
          : e || null;
      }
      function Hd(n) {
        const e = js(n);
        return e ? (on(e) ? e : e.lView) : null;
      }
      function jr(n) {
        return n instanceof Function ? n() : n;
      }
      var an = (() => (
        ((an = an || {})[(an.Important = 1)] = "Important"),
        (an[(an.DashCase = 2)] = "DashCase"),
        an
      ))();
      function Gd(n, e) {
        return undefined(n, e);
      }
      function Us(n) {
        const e = n[3];
        return Kn(e) ? e[3] : e;
      }
      function Wd(n) {
        return w_(n[13]);
      }
      function qd(n) {
        return w_(n[4]);
      }
      function w_(n) {
        for (; null !== n && !Kn(n); ) n = n[4];
        return n;
      }
      function Ai(n, e, t, r, o) {
        if (null != r) {
          let i,
            s = !1;
          Kn(r) ? (i = r) : on(r) && ((s = !0), (r = r[0]));
          const a = ht(r);
          0 === n && null !== t
            ? null == o
              ? x_(e, t, a)
              : Ro(e, t, a, o || null, !0)
            : 1 === n && null !== t
            ? Ro(e, t, a, o || null, !0)
            : 2 === n
            ? (function R_(n, e, t) {
                const r = Ec(n, e);
                r &&
                  (function XP(n, e, t, r) {
                    n.removeChild(e, t, r);
                  })(n, r, e, t);
              })(e, a, s)
            : 3 === n && e.destroyNode(a),
            null != i &&
              (function nx(n, e, t, r, o) {
                const i = t[7];
                i !== ht(t) && Ai(e, n, r, i, o);
                for (let a = 10; a < t.length; a++) {
                  const c = t[a];
                  $s(c[1], c, n, e, r, i);
                }
              })(e, n, i, t, o);
        }
      }
      function Qd(n, e, t) {
        return n.createElement(e, t);
      }
      function D_(n, e) {
        const t = n[9],
          r = t.indexOf(e),
          o = e[3];
        512 & e[2] && ((e[2] &= -513), Yu(o, -1)), t.splice(r, 1);
      }
      function Zd(n, e) {
        if (n.length <= 10) return;
        const t = 10 + e,
          r = n[t];
        if (r) {
          const o = r[17];
          null !== o && o !== n && D_(o, r), e > 0 && (n[t - 1][4] = r[4]);
          const i = pc(n, 10 + e);
          !(function GP(n, e) {
            $s(n, e, e[11], 2, null, null), (e[0] = null), (e[6] = null);
          })(r[1], r);
          const s = i[19];
          null !== s && s.detachView(i[1]),
            (r[3] = null),
            (r[4] = null),
            (r[2] &= -65);
        }
        return r;
      }
      function E_(n, e) {
        if (!(128 & e[2])) {
          const t = e[11];
          t.destroyNode && $s(n, e, t, 3, null, null),
            (function KP(n) {
              let e = n[13];
              if (!e) return Yd(n[1], n);
              for (; e; ) {
                let t = null;
                if (on(e)) t = e[13];
                else {
                  const r = e[10];
                  r && (t = r);
                }
                if (!t) {
                  for (; e && !e[4] && e !== n; )
                    on(e) && Yd(e[1], e), (e = e[3]);
                  null === e && (e = n), on(e) && Yd(e[1], e), (t = e && e[4]);
                }
                e = t;
              }
            })(e);
        }
      }
      function Yd(n, e) {
        if (!(128 & e[2])) {
          (e[2] &= -65),
            (e[2] |= 128),
            (function JP(n, e) {
              let t;
              if (null != n && null != (t = n.destroyHooks))
                for (let r = 0; r < t.length; r += 2) {
                  const o = e[t[r]];
                  if (!(o instanceof Cs)) {
                    const i = t[r + 1];
                    if (Array.isArray(i))
                      for (let s = 0; s < i.length; s += 2) {
                        const a = o[i[s]],
                          c = i[s + 1];
                        try {
                          c.call(a);
                        } finally {
                        }
                      }
                    else
                      try {
                        i.call(o);
                      } finally {
                      }
                  }
                }
            })(n, e),
            (function YP(n, e) {
              const t = n.cleanup,
                r = e[7];
              let o = -1;
              if (null !== t)
                for (let i = 0; i < t.length - 1; i += 2)
                  if ("string" == typeof t[i]) {
                    const s = t[i + 1],
                      a = "function" == typeof s ? s(e) : ht(e[s]),
                      c = r[(o = t[i + 2])],
                      l = t[i + 3];
                    "boolean" == typeof l
                      ? a.removeEventListener(t[i], c, l)
                      : l >= 0
                      ? r[(o = l)]()
                      : r[(o = -l)].unsubscribe(),
                      (i += 2);
                  } else {
                    const s = r[(o = t[i + 1])];
                    t[i].call(s);
                  }
              if (null !== r) {
                for (let i = o + 1; i < r.length; i++) (0, r[i])();
                e[7] = null;
              }
            })(n, e),
            1 === e[1].type && e[11].destroy();
          const t = e[17];
          if (null !== t && Kn(e[3])) {
            t !== e[3] && D_(t, e);
            const r = e[19];
            null !== r && r.detachView(n);
          }
          !(function PP(n) {
            jd.delete(n[20]);
          })(e);
        }
      }
      function O_(n, e, t) {
        return (function P_(n, e, t) {
          let r = e;
          for (; null !== r && 40 & r.type; ) r = (e = r).parent;
          if (null === r) return t[0];
          if (2 & r.flags) {
            const o = n.data[r.directiveStart].encapsulation;
            if (o === Wn.None || o === Wn.Emulated) return null;
          }
          return Rn(r, t);
        })(n, e.parent, t);
      }
      function Ro(n, e, t, r, o) {
        n.insertBefore(e, t, r, o);
      }
      function x_(n, e, t) {
        n.appendChild(e, t);
      }
      function S_(n, e, t, r, o) {
        null !== r ? Ro(n, e, t, r, o) : x_(n, e, t);
      }
      function Ec(n, e) {
        return n.parentNode(e);
      }
      function A_(n, e, t) {
        return I_(n, e, t);
      }
      let I_ = function T_(n, e, t) {
        return 40 & n.type ? Rn(n, t) : null;
      };
      function Oc(n, e, t, r) {
        const o = O_(n, r, e),
          i = e[11],
          a = A_(r.parent || e[6], r, e);
        if (null != o)
          if (Array.isArray(t))
            for (let c = 0; c < t.length; c++) S_(i, o, t[c], a, !1);
          else S_(i, o, t, a, !1);
      }
      function Pc(n, e) {
        if (null !== e) {
          const t = e.type;
          if (3 & t) return Rn(e, n);
          if (4 & t) return Xd(-1, n[e.index]);
          if (8 & t) {
            const r = e.child;
            if (null !== r) return Pc(n, r);
            {
              const o = n[e.index];
              return Kn(o) ? Xd(-1, o) : ht(o);
            }
          }
          if (32 & t) return Gd(e, n)() || ht(n[e.index]);
          {
            const r = N_(n, e);
            return null !== r
              ? Array.isArray(r)
                ? r[0]
                : Pc(Us(n[16]), r)
              : Pc(n, e.next);
          }
        }
        return null;
      }
      function N_(n, e) {
        return null !== e ? n[16][6].projection[e.projection] : null;
      }
      function Xd(n, e) {
        const t = 10 + n + 1;
        if (t < e.length) {
          const r = e[t],
            o = r[1].firstChild;
          if (null !== o) return Pc(r, o);
        }
        return e[7];
      }
      function ef(n, e, t, r, o, i, s) {
        for (; null != t; ) {
          const a = r[t.index],
            c = t.type;
          if (
            (s && 0 === e && (a && Lt(ht(a), r), (t.flags |= 4)),
            64 != (64 & t.flags))
          )
            if (8 & c) ef(n, e, t.child, r, o, i, !1), Ai(e, n, o, a, i);
            else if (32 & c) {
              const l = Gd(t, r);
              let u;
              for (; (u = l()); ) Ai(e, n, o, u, i);
              Ai(e, n, o, a, i);
            } else 16 & c ? F_(n, e, r, t, o, i) : Ai(e, n, o, a, i);
          t = s ? t.projectionNext : t.next;
        }
      }
      function $s(n, e, t, r, o, i) {
        ef(t, r, n.firstChild, e, o, i, !1);
      }
      function F_(n, e, t, r, o, i) {
        const s = t[16],
          c = s[6].projection[r.projection];
        if (Array.isArray(c))
          for (let l = 0; l < c.length; l++) Ai(e, n, o, c[l], i);
        else ef(n, e, c, s[3], o, i, !0);
      }
      function L_(n, e, t) {
        n.setAttribute(e, "style", t);
      }
      function tf(n, e, t) {
        "" === t
          ? n.removeAttribute(e, "class")
          : n.setAttribute(e, "class", t);
      }
      function V_(n, e, t) {
        let r = n.length;
        for (;;) {
          const o = n.indexOf(e, t);
          if (-1 === o) return o;
          if (0 === o || n.charCodeAt(o - 1) <= 32) {
            const i = e.length;
            if (o + i === r || n.charCodeAt(o + i) <= 32) return o;
          }
          t = o + 1;
        }
      }
      const B_ = "ng-template";
      function ox(n, e, t) {
        let r = 0;
        for (; r < n.length; ) {
          let o = n[r++];
          if (t && "class" === o) {
            if (((o = n[r]), -1 !== V_(o.toLowerCase(), e, 0))) return !0;
          } else if (1 === o) {
            for (; r < n.length && "string" == typeof (o = n[r++]); )
              if (o.toLowerCase() === e) return !0;
            return !1;
          }
        }
        return !1;
      }
      function j_(n) {
        return 4 === n.type && n.value !== B_;
      }
      function ix(n, e, t) {
        return e === (4 !== n.type || t ? n.value : B_);
      }
      function sx(n, e, t) {
        let r = 4;
        const o = n.attrs || [],
          i = (function lx(n) {
            for (let e = 0; e < n.length; e++) if (hm(n[e])) return e;
            return n.length;
          })(o);
        let s = !1;
        for (let a = 0; a < e.length; a++) {
          const c = e[a];
          if ("number" != typeof c) {
            if (!s)
              if (4 & r) {
                if (
                  ((r = 2 | (1 & r)),
                  ("" !== c && !ix(n, c, t)) || ("" === c && 1 === e.length))
                ) {
                  if (Zn(r)) return !1;
                  s = !0;
                }
              } else {
                const l = 8 & r ? c : e[++a];
                if (8 & r && null !== n.attrs) {
                  if (!ox(n.attrs, l, t)) {
                    if (Zn(r)) return !1;
                    s = !0;
                  }
                  continue;
                }
                const d = ax(8 & r ? "class" : c, o, j_(n), t);
                if (-1 === d) {
                  if (Zn(r)) return !1;
                  s = !0;
                  continue;
                }
                if ("" !== l) {
                  let f;
                  f = d > i ? "" : o[d + 1].toLowerCase();
                  const h = 8 & r ? f : null;
                  if ((h && -1 !== V_(h, l, 0)) || (2 & r && l !== f)) {
                    if (Zn(r)) return !1;
                    s = !0;
                  }
                }
              }
          } else {
            if (!s && !Zn(r) && !Zn(c)) return !1;
            if (s && Zn(c)) continue;
            (s = !1), (r = c | (1 & r));
          }
        }
        return Zn(r) || s;
      }
      function Zn(n) {
        return 0 == (1 & n);
      }
      function ax(n, e, t, r) {
        if (null === e) return -1;
        let o = 0;
        if (r || !t) {
          let i = !1;
          for (; o < e.length; ) {
            const s = e[o];
            if (s === n) return o;
            if (3 === s || 6 === s) i = !0;
            else {
              if (1 === s || 2 === s) {
                let a = e[++o];
                for (; "string" == typeof a; ) a = e[++o];
                continue;
              }
              if (4 === s) break;
              if (0 === s) {
                o += 4;
                continue;
              }
            }
            o += i ? 1 : 2;
          }
          return -1;
        }
        return (function ux(n, e) {
          let t = n.indexOf(4);
          if (t > -1)
            for (t++; t < n.length; ) {
              const r = n[t];
              if ("number" == typeof r) return -1;
              if (r === e) return t;
              t++;
            }
          return -1;
        })(e, n);
      }
      function U_(n, e, t = !1) {
        for (let r = 0; r < e.length; r++) if (sx(n, e[r], t)) return !0;
        return !1;
      }
      function dx(n, e) {
        e: for (let t = 0; t < e.length; t++) {
          const r = e[t];
          if (n.length === r.length) {
            for (let o = 0; o < n.length; o++) if (n[o] !== r[o]) continue e;
            return !0;
          }
        }
        return !1;
      }
      function $_(n, e) {
        return n ? ":not(" + e.trim() + ")" : e;
      }
      function fx(n) {
        let e = n[0],
          t = 1,
          r = 2,
          o = "",
          i = !1;
        for (; t < n.length; ) {
          let s = n[t];
          if ("string" == typeof s)
            if (2 & r) {
              const a = n[++t];
              o += "[" + s + (a.length > 0 ? '="' + a + '"' : "") + "]";
            } else 8 & r ? (o += "." + s) : 4 & r && (o += " " + s);
          else
            "" !== o && !Zn(s) && ((e += $_(i, o)), (o = "")),
              (r = s),
              (i = i || !Zn(r));
          t++;
        }
        return "" !== o && (e += $_(i, o)), e;
      }
      const te = {};
      function E(n) {
        H_(we(), D(), Yt() + n, !1);
      }
      function H_(n, e, t, r) {
        if (!r)
          if (3 == (3 & e[2])) {
            const i = n.preOrderCheckHooks;
            null !== i && sc(e, i, t);
          } else {
            const i = n.preOrderHooks;
            null !== i && ac(e, i, 0, t);
          }
        io(t);
      }
      function q_(n, e = null, t = null, r) {
        const o = K_(n, e, t, r);
        return o.resolveInjectorInitializers(), o;
      }
      function K_(n, e = null, t = null, r, o = new Set()) {
        const i = [t || xe, QO(n)];
        return (
          (r = r || ("object" == typeof n ? void 0 : Le(n))),
          new s_(i, e || Dc(), r || null, o)
        );
      }
      let vn = (() => {
        class n {
          static create(t, r) {
            if (Array.isArray(t)) return q_({ name: "" }, r, t, "");
            {
              const o = t.name ?? "";
              return q_({ name: o }, t.parent, t.providers, o);
            }
          }
        }
        return (
          (n.THROW_IF_NOT_FOUND = xs),
          (n.NULL = new t_()),
          (n.ɵprov = R({ token: n, providedIn: "any", factory: () => P(Xm) })),
          (n.__NG_ELEMENT_ID__ = -1),
          n
        );
      })();
      function w(n, e = z.Default) {
        const t = D();
        return null === t ? P(n, e) : bm(vt(), t, K(n), e);
      }
      function cf() {
        throw new Error("invalid");
      }
      function Sc(n, e) {
        return (n << 17) | (e << 2);
      }
      function Yn(n) {
        return (n >> 17) & 32767;
      }
      function lf(n) {
        return 2 | n;
      }
      function Ur(n) {
        return (131068 & n) >> 2;
      }
      function uf(n, e) {
        return (-131069 & n) | (e << 2);
      }
      function df(n) {
        return 1 | n;
      }
      function dy(n, e) {
        const t = n.contentQueries;
        if (null !== t)
          for (let r = 0; r < t.length; r += 2) {
            const o = t[r],
              i = t[r + 1];
            if (-1 !== i) {
              const s = n.data[i];
              nd(o), s.contentQueries(2, e[i], i);
            }
          }
      }
      function Ic(n, e, t, r, o, i, s, a, c, l, u) {
        const d = e.blueprint.slice();
        return (
          (d[0] = o),
          (d[2] = 76 | r),
          (null !== u || (n && 1024 & n[2])) && (d[2] |= 1024),
          em(d),
          (d[3] = d[15] = n),
          (d[8] = t),
          (d[10] = s || (n && n[10])),
          (d[11] = a || (n && n[11])),
          (d[12] = c || (n && n[12]) || null),
          (d[9] = l || (n && n[9]) || null),
          (d[6] = i),
          (d[20] = (function EP() {
            return DP++;
          })()),
          (d[21] = u),
          (d[16] = 2 == e.type ? n[16] : d),
          d
        );
      }
      function Ii(n, e, t, r, o) {
        let i = n.data[e];
        if (null === i)
          (i = (function vf(n, e, t, r, o) {
            const i = rm(),
              s = Ju(),
              c = (n.data[e] = (function Qx(n, e, t, r, o, i) {
                return {
                  type: t,
                  index: r,
                  insertBeforeIndex: null,
                  injectorIndex: e ? e.injectorIndex : -1,
                  directiveStart: -1,
                  directiveEnd: -1,
                  directiveStylingLast: -1,
                  propertyBindings: null,
                  flags: 0,
                  providerIndexes: 0,
                  value: o,
                  attrs: i,
                  mergedAttrs: null,
                  localNames: null,
                  initialInputs: void 0,
                  inputs: null,
                  outputs: null,
                  tViews: null,
                  next: null,
                  projectionNext: null,
                  child: null,
                  parent: e,
                  projection: null,
                  styles: null,
                  stylesWithoutHost: null,
                  residualStyles: void 0,
                  classes: null,
                  classesWithoutHost: null,
                  residualClasses: void 0,
                  classBindings: 0,
                  styleBindings: 0,
                };
              })(0, s ? i : i && i.parent, t, e, r, o));
            return (
              null === n.firstChild && (n.firstChild = c),
              null !== i &&
                (s
                  ? null == i.child && null !== c.parent && (i.child = c)
                  : null === i.next && (i.next = c)),
              c
            );
          })(n, e, t, r, o)),
            (function xE() {
              return X.lFrame.inI18n;
            })() && (i.flags |= 64);
        else if (64 & i.type) {
          (i.type = t), (i.value = r), (i.attrs = o);
          const s = (function vs() {
            const n = X.lFrame,
              e = n.currentTNode;
            return n.isParent ? e : e.parent;
          })();
          i.injectorIndex = null === s ? -1 : s.injectorIndex;
        }
        return dr(i, !0), i;
      }
      function ki(n, e, t, r) {
        if (0 === t) return -1;
        const o = e.length;
        for (let i = 0; i < t; i++)
          e.push(r), n.blueprint.push(r), n.data.push(null);
        return o;
      }
      function kc(n, e, t) {
        rd(e);
        try {
          const r = n.viewQuery;
          null !== r && xf(1, r, t);
          const o = n.template;
          null !== o && fy(n, e, o, 1, t),
            n.firstCreatePass && (n.firstCreatePass = !1),
            n.staticContentQueries && dy(n, e),
            n.staticViewQueries && xf(2, n.viewQuery, t);
          const i = n.components;
          null !== i &&
            (function Gx(n, e) {
              for (let t = 0; t < e.length; t++) dS(n, e[t]);
            })(e, i);
        } catch (r) {
          throw (
            (n.firstCreatePass &&
              ((n.incompleteFirstPass = !0), (n.firstCreatePass = !1)),
            r)
          );
        } finally {
          (e[2] &= -5), od();
        }
      }
      function Hs(n, e, t, r) {
        const o = e[2];
        if (128 != (128 & o)) {
          rd(e);
          try {
            em(e),
              (function om(n) {
                return (X.lFrame.bindingIndex = n);
              })(n.bindingStartIndex),
              null !== t && fy(n, e, t, 2, r);
            const s = 3 == (3 & o);
            if (s) {
              const l = n.preOrderCheckHooks;
              null !== l && sc(e, l, null);
            } else {
              const l = n.preOrderHooks;
              null !== l && ac(e, l, 0, null), ad(e, 0);
            }
            if (
              ((function lS(n) {
                for (let e = Wd(n); null !== e; e = qd(e)) {
                  if (!e[2]) continue;
                  const t = e[9];
                  for (let r = 0; r < t.length; r++) {
                    const o = t[r],
                      i = o[3];
                    0 == (512 & o[2]) && Yu(i, 1), (o[2] |= 512);
                  }
                }
              })(e),
              (function cS(n) {
                for (let e = Wd(n); null !== e; e = qd(e))
                  for (let t = 10; t < e.length; t++) {
                    const r = e[t],
                      o = r[1];
                    rc(r) && Hs(o, r, o.template, r[8]);
                  }
              })(e),
              null !== n.contentQueries && dy(n, e),
              s)
            ) {
              const l = n.contentCheckHooks;
              null !== l && sc(e, l);
            } else {
              const l = n.contentHooks;
              null !== l && ac(e, l, 1), ad(e, 1);
            }
            !(function Hx(n, e) {
              const t = n.hostBindingOpCodes;
              if (null !== t)
                try {
                  for (let r = 0; r < t.length; r++) {
                    const o = t[r];
                    if (o < 0) io(~o);
                    else {
                      const i = o,
                        s = t[++r],
                        a = t[++r];
                      SE(s, i), a(2, e[i]);
                    }
                  }
                } finally {
                  io(-1);
                }
            })(n, e);
            const a = n.components;
            null !== a &&
              (function zx(n, e) {
                for (let t = 0; t < e.length; t++) uS(n, e[t]);
              })(e, a);
            const c = n.viewQuery;
            if ((null !== c && xf(2, c, r), s)) {
              const l = n.viewCheckHooks;
              null !== l && sc(e, l);
            } else {
              const l = n.viewHooks;
              null !== l && ac(e, l, 2), ad(e, 2);
            }
            !0 === n.firstUpdatePass && (n.firstUpdatePass = !1),
              (e[2] &= -41),
              512 & e[2] && ((e[2] &= -513), Yu(e[3], -1));
          } finally {
            od();
          }
        }
      }
      function Wx(n, e, t, r) {
        const o = e[10],
          s = Xg(e);
        try {
          !s && o.begin && o.begin(), s && kc(n, e, r), Hs(n, e, t, r);
        } finally {
          !s && o.end && o.end();
        }
      }
      function fy(n, e, t, r, o) {
        const i = Yt(),
          s = 2 & r;
        try {
          io(-1), s && e.length > 22 && H_(n, e, 22, !1), t(r, o);
        } finally {
          io(i);
        }
      }
      function hy(n, e, t) {
        if (Gu(e)) {
          const o = e.directiveEnd;
          for (let i = e.directiveStart; i < o; i++) {
            const s = n.data[i];
            s.contentQueries && s.contentQueries(1, t[i], i);
          }
        }
      }
      function Cf(n, e, t) {
        !nm() ||
          ((function eS(n, e, t, r) {
            const o = t.directiveStart,
              i = t.directiveEnd;
            n.firstCreatePass || ws(t, e), Lt(r, e);
            const s = t.initialInputs;
            for (let a = o; a < i; a++) {
              const c = n.data[a],
                l = Qn(c);
              l && iS(e, t, c);
              const u = Ms(e, n, a, t);
              Lt(u, e),
                null !== s && sS(0, a - o, u, c, 0, s),
                l && (mn(t.index, e)[8] = u);
            }
          })(n, e, t, Rn(t, e)),
          128 == (128 & t.flags) &&
            (function tS(n, e, t) {
              const r = t.directiveStart,
                o = t.directiveEnd,
                i = t.index,
                s = (function AE() {
                  return X.lFrame.currentDirectiveIndex;
                })();
              try {
                io(i);
                for (let a = r; a < o; a++) {
                  const c = n.data[a],
                    l = e[a];
                  ed(a),
                    (null !== c.hostBindings ||
                      0 !== c.hostVars ||
                      null !== c.hostAttrs) &&
                      Cy(c, l);
                }
              } finally {
                io(-1), ed(s);
              }
            })(n, e, t));
      }
      function bf(n, e, t = Rn) {
        const r = e.localNames;
        if (null !== r) {
          let o = e.index + 1;
          for (let i = 0; i < r.length; i += 2) {
            const s = r[i + 1],
              a = -1 === s ? t(e, n) : n[s];
            n[o++] = a;
          }
        }
      }
      function py(n) {
        const e = n.tView;
        return null === e || e.incompleteFirstPass
          ? (n.tView = wf(
              1,
              null,
              n.template,
              n.decls,
              n.vars,
              n.directiveDefs,
              n.pipeDefs,
              n.viewQuery,
              n.schemas,
              n.consts
            ))
          : e;
      }
      function wf(n, e, t, r, o, i, s, a, c, l) {
        const u = 22 + r,
          d = u + o,
          f = (function qx(n, e) {
            const t = [];
            for (let r = 0; r < e; r++) t.push(r < n ? null : te);
            return t;
          })(u, d),
          h = "function" == typeof l ? l() : l;
        return (f[1] = {
          type: n,
          blueprint: f,
          template: t,
          queries: null,
          viewQuery: a,
          declTNode: e,
          data: f.slice().fill(null, u),
          bindingStartIndex: u,
          expandoStartIndex: d,
          hostBindingOpCodes: null,
          firstCreatePass: !0,
          firstUpdatePass: !0,
          staticViewQueries: !1,
          staticContentQueries: !1,
          preOrderHooks: null,
          preOrderCheckHooks: null,
          contentHooks: null,
          contentCheckHooks: null,
          viewHooks: null,
          viewCheckHooks: null,
          destroyHooks: null,
          cleanup: null,
          contentQueries: null,
          components: null,
          directiveRegistry: "function" == typeof i ? i() : i,
          pipeRegistry: "function" == typeof s ? s() : s,
          firstChild: null,
          schemas: c,
          consts: h,
          incompleteFirstPass: !1,
        });
      }
      function gy(n, e, t, r) {
        const o = Oy(e);
        null === t
          ? o.push(r)
          : (o.push(t), n.firstCreatePass && Py(n).push(r, o.length - 1));
      }
      function my(n, e, t) {
        for (let r in n)
          if (n.hasOwnProperty(r)) {
            const o = n[r];
            (t = null === t ? {} : t).hasOwnProperty(r)
              ? t[r].push(e, o)
              : (t[r] = [e, o]);
          }
        return t;
      }
      function _y(n, e) {
        const r = e.directiveEnd,
          o = n.data,
          i = e.attrs,
          s = [];
        let a = null,
          c = null;
        for (let l = e.directiveStart; l < r; l++) {
          const u = o[l],
            d = u.inputs,
            f = null === i || j_(e) ? null : aS(d, i);
          s.push(f), (a = my(d, l, a)), (c = my(u.outputs, l, c));
        }
        null !== a &&
          (a.hasOwnProperty("class") && (e.flags |= 16),
          a.hasOwnProperty("style") && (e.flags |= 32)),
          (e.initialInputs = s),
          (e.inputs = a),
          (e.outputs = c);
      }
      function Cn(n, e, t, r, o, i, s, a) {
        const c = Rn(e, t);
        let u,
          l = e.inputs;
        !a && null != l && (u = l[r])
          ? (Sf(n, t, u, r, o), ec(e) && yy(t, e.index))
          : 3 & e.type &&
            ((r = (function Zx(n) {
              return "class" === n
                ? "className"
                : "for" === n
                ? "htmlFor"
                : "formaction" === n
                ? "formAction"
                : "innerHtml" === n
                ? "innerHTML"
                : "readonly" === n
                ? "readOnly"
                : "tabindex" === n
                ? "tabIndex"
                : n;
            })(r)),
            (o = null != s ? s(o, e.value || "", r) : o),
            i.setProperty(c, r, o));
      }
      function yy(n, e) {
        const t = mn(e, n);
        16 & t[2] || (t[2] |= 32);
      }
      function Mf(n, e, t, r) {
        let o = !1;
        if (nm()) {
          const i = (function nS(n, e, t) {
              const r = n.directiveRegistry;
              let o = null;
              if (r)
                for (let i = 0; i < r.length; i++) {
                  const s = r[i];
                  U_(t, s.selectors, !1) &&
                    (o || (o = []),
                    fc(ws(t, e), n, s.type),
                    Qn(s) ? (by(n, t), o.unshift(s)) : o.push(s));
                }
              return o;
            })(n, e, t),
            s = null === r ? null : { "": -1 };
          if (null !== i) {
            (o = !0), wy(t, n.data.length, i.length);
            for (let u = 0; u < i.length; u++) {
              const d = i[u];
              d.providersResolver && d.providersResolver(d);
            }
            let a = !1,
              c = !1,
              l = ki(n, e, i.length, null);
            for (let u = 0; u < i.length; u++) {
              const d = i[u];
              (t.mergedAttrs = lc(t.mergedAttrs, d.hostAttrs)),
                My(n, t, e, l, d),
                oS(l, d, s),
                null !== d.contentQueries && (t.flags |= 8),
                (null !== d.hostBindings ||
                  null !== d.hostAttrs ||
                  0 !== d.hostVars) &&
                  (t.flags |= 128);
              const f = d.type.prototype;
              !a &&
                (f.ngOnChanges || f.ngOnInit || f.ngDoCheck) &&
                ((n.preOrderHooks || (n.preOrderHooks = [])).push(t.index),
                (a = !0)),
                !c &&
                  (f.ngOnChanges || f.ngDoCheck) &&
                  ((n.preOrderCheckHooks || (n.preOrderCheckHooks = [])).push(
                    t.index
                  ),
                  (c = !0)),
                l++;
            }
            _y(n, t);
          }
          s &&
            (function rS(n, e, t) {
              if (e) {
                const r = (n.localNames = []);
                for (let o = 0; o < e.length; o += 2) {
                  const i = t[e[o + 1]];
                  if (null == i) throw new M(-301, !1);
                  r.push(e[o], i);
                }
              }
            })(t, r, s);
        }
        return (t.mergedAttrs = lc(t.mergedAttrs, t.attrs)), o;
      }
      function vy(n, e, t, r, o, i) {
        const s = i.hostBindings;
        if (s) {
          let a = n.hostBindingOpCodes;
          null === a && (a = n.hostBindingOpCodes = []);
          const c = ~e.index;
          (function Xx(n) {
            let e = n.length;
            for (; e > 0; ) {
              const t = n[--e];
              if ("number" == typeof t && t < 0) return t;
            }
            return 0;
          })(a) != c && a.push(c),
            a.push(r, o, s);
        }
      }
      function Cy(n, e) {
        null !== n.hostBindings && n.hostBindings(1, e);
      }
      function by(n, e) {
        (e.flags |= 2), (n.components || (n.components = [])).push(e.index);
      }
      function oS(n, e, t) {
        if (t) {
          if (e.exportAs)
            for (let r = 0; r < e.exportAs.length; r++) t[e.exportAs[r]] = n;
          Qn(e) && (t[""] = n);
        }
      }
      function wy(n, e, t) {
        (n.flags |= 1),
          (n.directiveStart = e),
          (n.directiveEnd = e + t),
          (n.providerIndexes = e);
      }
      function My(n, e, t, r, o) {
        n.data[r] = o;
        const i = o.factory || (o.factory = Io(o.type)),
          s = new Cs(i, Qn(o), w);
        (n.blueprint[r] = s),
          (t[r] = s),
          vy(n, e, 0, r, ki(n, t, o.hostVars, te), o);
      }
      function iS(n, e, t) {
        const r = Rn(e, n),
          o = py(t),
          i = n[10],
          s = Nc(
            n,
            Ic(
              n,
              o,
              null,
              t.onPush ? 32 : 16,
              r,
              e,
              i,
              i.createRenderer(r, t),
              null,
              null,
              null
            )
          );
        n[e.index] = s;
      }
      function pr(n, e, t, r, o, i) {
        const s = Rn(n, e);
        !(function Df(n, e, t, r, o, i, s) {
          if (null == i) n.removeAttribute(e, o, t);
          else {
            const a = null == s ? ee(i) : s(i, r || "", o);
            n.setAttribute(e, o, a, t);
          }
        })(e[11], s, i, n.value, t, r, o);
      }
      function sS(n, e, t, r, o, i) {
        const s = i[e];
        if (null !== s) {
          const a = r.setInput;
          for (let c = 0; c < s.length; ) {
            const l = s[c++],
              u = s[c++],
              d = s[c++];
            null !== a ? r.setInput(t, d, l, u) : (t[u] = d);
          }
        }
      }
      function aS(n, e) {
        let t = null,
          r = 0;
        for (; r < e.length; ) {
          const o = e[r];
          if (0 !== o)
            if (5 !== o) {
              if ("number" == typeof o) break;
              n.hasOwnProperty(o) &&
                (null === t && (t = []), t.push(o, n[o], e[r + 1])),
                (r += 2);
            } else r += 2;
          else r += 4;
        }
        return t;
      }
      function Dy(n, e, t, r) {
        return new Array(n, !0, !1, e, null, 0, r, t, null, null);
      }
      function uS(n, e) {
        const t = mn(e, n);
        if (rc(t)) {
          const r = t[1];
          48 & t[2] ? Hs(r, t, r.template, t[8]) : t[5] > 0 && Ef(t);
        }
      }
      function Ef(n) {
        for (let r = Wd(n); null !== r; r = qd(r))
          for (let o = 10; o < r.length; o++) {
            const i = r[o];
            if (rc(i))
              if (512 & i[2]) {
                const s = i[1];
                Hs(s, i, s.template, i[8]);
              } else i[5] > 0 && Ef(i);
          }
        const t = n[1].components;
        if (null !== t)
          for (let r = 0; r < t.length; r++) {
            const o = mn(t[r], n);
            rc(o) && o[5] > 0 && Ef(o);
          }
      }
      function dS(n, e) {
        const t = mn(e, n),
          r = t[1];
        (function fS(n, e) {
          for (let t = e.length; t < n.blueprint.length; t++)
            e.push(n.blueprint[t]);
        })(r, t),
          kc(r, t, t[8]);
      }
      function Nc(n, e) {
        return n[13] ? (n[14][4] = e) : (n[13] = e), (n[14] = e), e;
      }
      function Of(n) {
        for (; n; ) {
          n[2] |= 32;
          const e = Us(n);
          if (lE(n) && !e) return n;
          n = e;
        }
        return null;
      }
      function xf(n, e, t) {
        nd(0), e(n, t);
      }
      function Oy(n) {
        return n[7] || (n[7] = []);
      }
      function Py(n) {
        return n.cleanup || (n.cleanup = []);
      }
      function Sy(n, e) {
        const t = n[9],
          r = t ? t.get(xi, null) : null;
        r && r.handleError(e);
      }
      function Sf(n, e, t, r, o) {
        for (let i = 0; i < t.length; ) {
          const s = t[i++],
            a = t[i++],
            c = e[s],
            l = n.data[s];
          null !== l.setInput ? l.setInput(c, o, r, a) : (c[a] = o);
        }
      }
      function $r(n, e, t) {
        const r = nc(e, n);
        !(function M_(n, e, t) {
          n.setValue(e, t);
        })(n[11], r, t);
      }
      function Rc(n, e, t) {
        let r = t ? n.styles : null,
          o = t ? n.classes : null,
          i = 0;
        if (null !== e)
          for (let s = 0; s < e.length; s++) {
            const a = e[s];
            "number" == typeof a
              ? (i = a)
              : 1 == i
              ? (o = Lu(o, a))
              : 2 == i && (r = Lu(r, a + ": " + e[++s] + ";"));
          }
        t ? (n.styles = r) : (n.stylesWithoutHost = r),
          t ? (n.classes = o) : (n.classesWithoutHost = o);
      }
      function Fc(n, e, t, r, o = !1) {
        for (; null !== t; ) {
          const i = e[t.index];
          if ((null !== i && r.push(ht(i)), Kn(i)))
            for (let a = 10; a < i.length; a++) {
              const c = i[a],
                l = c[1].firstChild;
              null !== l && Fc(c[1], c, l, r);
            }
          const s = t.type;
          if (8 & s) Fc(n, e, t.child, r);
          else if (32 & s) {
            const a = Gd(t, e);
            let c;
            for (; (c = a()); ) r.push(c);
          } else if (16 & s) {
            const a = N_(e, t);
            if (Array.isArray(a)) r.push(...a);
            else {
              const c = Us(e[16]);
              Fc(c[1], c, a, r, !0);
            }
          }
          t = o ? t.projectionNext : t.next;
        }
        return r;
      }
      class zs {
        constructor(e, t) {
          (this._lView = e),
            (this._cdRefInjectingView = t),
            (this._appRef = null),
            (this._attachedToViewContainer = !1);
        }
        get rootNodes() {
          const e = this._lView,
            t = e[1];
          return Fc(t, e, t.firstChild, []);
        }
        get context() {
          return this._lView[8];
        }
        set context(e) {
          this._lView[8] = e;
        }
        get destroyed() {
          return 128 == (128 & this._lView[2]);
        }
        destroy() {
          if (this._appRef) this._appRef.detachView(this);
          else if (this._attachedToViewContainer) {
            const e = this._lView[3];
            if (Kn(e)) {
              const t = e[8],
                r = t ? t.indexOf(this) : -1;
              r > -1 && (Zd(e, r), pc(t, r));
            }
            this._attachedToViewContainer = !1;
          }
          E_(this._lView[1], this._lView);
        }
        onDestroy(e) {
          gy(this._lView[1], this._lView, null, e);
        }
        markForCheck() {
          Of(this._cdRefInjectingView || this._lView);
        }
        detach() {
          this._lView[2] &= -65;
        }
        reattach() {
          this._lView[2] |= 64;
        }
        detectChanges() {
          !(function Pf(n, e, t) {
            const r = e[10];
            r.begin && r.begin();
            try {
              Hs(n, e, n.template, t);
            } catch (o) {
              throw (Sy(e, o), o);
            } finally {
              r.end && r.end();
            }
          })(this._lView[1], this._lView, this.context);
        }
        checkNoChanges() {}
        attachToViewContainerRef() {
          if (this._appRef) throw new M(902, !1);
          this._attachedToViewContainer = !0;
        }
        detachFromAppRef() {
          (this._appRef = null),
            (function qP(n, e) {
              $s(n, e, e[11], 2, null, null);
            })(this._lView[1], this._lView);
        }
        attachToAppRef(e) {
          if (this._attachedToViewContainer) throw new M(902, !1);
          this._appRef = e;
        }
      }
      class pS extends zs {
        constructor(e) {
          super(e), (this._view = e);
        }
        detectChanges() {
          !(function Ey(n) {
            !(function hS(n) {
              for (let e = 0; e < n.components.length; e++) {
                const t = n.components[e],
                  r = Hd(t);
                if (null !== r) {
                  const o = r[1];
                  Wx(o, r, o.template, t);
                }
              }
            })(n[8]);
          })(this._view);
        }
        checkNoChanges() {}
        get context() {
          return null;
        }
      }
      class Af extends Vs {
        constructor(e) {
          super(), (this.ngModule = e);
        }
        resolveComponentFactory(e) {
          const t = Ie(e);
          return new Gs(t, this.ngModule);
        }
      }
      function Ay(n) {
        const e = [];
        for (let t in n)
          n.hasOwnProperty(t) && e.push({ propName: n[t], templateName: t });
        return e;
      }
      class mS {
        constructor(e, t) {
          (this.injector = e), (this.parentInjector = t);
        }
        get(e, t, r) {
          const o = this.injector.get(e, Nd, r);
          return o !== Nd || t === Nd ? o : this.parentInjector.get(e, t, r);
        }
      }
      class Gs extends c_ {
        constructor(e, t) {
          super(),
            (this.componentDef = e),
            (this.ngModule = t),
            (this.componentType = e.type),
            (this.selector = (function hx(n) {
              return n.map(fx).join(",");
            })(e.selectors)),
            (this.ngContentSelectors = e.ngContentSelectors
              ? e.ngContentSelectors
              : []),
            (this.isBoundToModule = !!t);
        }
        get inputs() {
          return Ay(this.componentDef.inputs);
        }
        get outputs() {
          return Ay(this.componentDef.outputs);
        }
        create(e, t, r, o) {
          let i = (o = o || this.ngModule) instanceof co ? o : o?.injector;
          i &&
            null !== this.componentDef.getStandaloneInjector &&
            (i = this.componentDef.getStandaloneInjector(i) || i);
          const s = i ? new mS(e, i) : e,
            a = s.get(Bs, null);
          if (null === a) throw new M(407, !1);
          const c = s.get(dP, null),
            l = a.createRenderer(null, this.componentDef),
            u = this.componentDef.selectors[0][0] || "div",
            d = r
              ? (function Kx(n, e, t) {
                  return n.selectRootElement(e, t === Wn.ShadowDom);
                })(l, r, this.componentDef.encapsulation)
              : Qd(
                  a.createRenderer(null, this.componentDef),
                  u,
                  (function gS(n) {
                    const e = n.toLowerCase();
                    return "svg" === e ? "svg" : "math" === e ? "math" : null;
                  })(u)
                ),
            f = this.componentDef.onPush ? 288 : 272,
            h = { components: [] },
            p = wf(0, null, null, 1, 0, null, null, null, null, null),
            m = Ic(null, p, h, f, null, null, a, l, c, s, null);
          let y, C;
          rd(m);
          try {
            const O = (function vS(n, e, t, r, o, i) {
              const s = t[1];
              t[22] = n;
              const c = Ii(s, 22, 2, "#host", null),
                l = (c.mergedAttrs = e.hostAttrs);
              null !== l &&
                (Rc(c, l, !0),
                null !== n &&
                  (cc(o, n, l),
                  null !== c.classes && tf(o, n, c.classes),
                  null !== c.styles && L_(o, n, c.styles)));
              const u = r.createRenderer(n, e),
                d = Ic(
                  t,
                  py(e),
                  null,
                  e.onPush ? 32 : 16,
                  t[22],
                  c,
                  r,
                  u,
                  i || null,
                  null,
                  null
                );
              return (
                s.firstCreatePass &&
                  (fc(ws(c, t), s, e.type), by(s, c), wy(c, t.length, 1)),
                Nc(t, d),
                (t[22] = d)
              );
            })(d, this.componentDef, m, a, l);
            if (d)
              if (r) cc(l, d, ["ng-version", fP.full]);
              else {
                const { attrs: b, classes: x } = (function px(n) {
                  const e = [],
                    t = [];
                  let r = 1,
                    o = 2;
                  for (; r < n.length; ) {
                    let i = n[r];
                    if ("string" == typeof i)
                      2 === o
                        ? "" !== i && e.push(i, n[++r])
                        : 8 === o && t.push(i);
                    else {
                      if (!Zn(o)) break;
                      o = i;
                    }
                    r++;
                  }
                  return { attrs: e, classes: t };
                })(this.componentDef.selectors[0]);
                b && cc(l, d, b), x && x.length > 0 && tf(l, d, x.join(" "));
              }
            if (((C = Zu(p, 22)), void 0 !== t)) {
              const b = (C.projection = []);
              for (let x = 0; x < this.ngContentSelectors.length; x++) {
                const Y = t[x];
                b.push(null != Y ? Array.from(Y) : null);
              }
            }
            (y = (function CS(n, e, t, r, o) {
              const i = t[1],
                s = (function Jx(n, e, t) {
                  const r = vt();
                  n.firstCreatePass &&
                    (t.providersResolver && t.providersResolver(t),
                    My(n, r, e, ki(n, e, 1, null), t),
                    _y(n, r));
                  const o = Ms(e, n, r.directiveStart, r);
                  Lt(o, e);
                  const i = Rn(r, e);
                  return i && Lt(i, e), o;
                })(i, t, e);
              if ((r.components.push(s), (n[8] = s), null !== o))
                for (const c of o) c(s, e);
              if (e.contentQueries) {
                const c = vt();
                e.contentQueries(1, s, c.directiveStart);
              }
              const a = vt();
              return (
                !i.firstCreatePass ||
                  (null === e.hostBindings && null === e.hostAttrs) ||
                  (io(a.index),
                  vy(t[1], a, 0, a.directiveStart, a.directiveEnd, e),
                  Cy(e, s)),
                s
              );
            })(O, this.componentDef, m, h, [wS])),
              kc(p, m, null);
          } finally {
            od();
          }
          return new yS(this.componentType, y, Pi(C, m), m, C);
        }
      }
      class yS extends class iP {} {
        constructor(e, t, r, o, i) {
          super(),
            (this.location = r),
            (this._rootLView = o),
            (this._tNode = i),
            (this.instance = t),
            (this.hostView = this.changeDetectorRef = new pS(o)),
            (this.componentType = e);
        }
        setInput(e, t) {
          const r = this._tNode.inputs;
          let o;
          if (null !== r && (o = r[e])) {
            const i = this._rootLView;
            Sf(i[1], i, o, e, t), yy(i, this._tNode.index);
          }
        }
        get injector() {
          return new _i(this._tNode, this._rootLView);
        }
        destroy() {
          this.hostView.destroy();
        }
        onDestroy(e) {
          this.hostView.onDestroy(e);
        }
      }
      function wS() {
        const n = vt();
        ic(D()[1], n);
      }
      function Ae(n) {
        let e = (function Ty(n) {
            return Object.getPrototypeOf(n.prototype).constructor;
          })(n.type),
          t = !0;
        const r = [n];
        for (; e; ) {
          let o;
          if (Qn(n)) o = e.ɵcmp || e.ɵdir;
          else {
            if (e.ɵcmp) throw new M(903, !1);
            o = e.ɵdir;
          }
          if (o) {
            if (t) {
              r.push(o);
              const s = n;
              (s.inputs = Tf(n.inputs)),
                (s.declaredInputs = Tf(n.declaredInputs)),
                (s.outputs = Tf(n.outputs));
              const a = o.hostBindings;
              a && OS(n, a);
              const c = o.viewQuery,
                l = o.contentQueries;
              if (
                (c && DS(n, c),
                l && ES(n, l),
                Fu(n.inputs, o.inputs),
                Fu(n.declaredInputs, o.declaredInputs),
                Fu(n.outputs, o.outputs),
                Qn(o) && o.data.animation)
              ) {
                const u = n.data;
                u.animation = (u.animation || []).concat(o.data.animation);
              }
            }
            const i = o.features;
            if (i)
              for (let s = 0; s < i.length; s++) {
                const a = i[s];
                a && a.ngInherit && a(n), a === Ae && (t = !1);
              }
          }
          e = Object.getPrototypeOf(e);
        }
        !(function MS(n) {
          let e = 0,
            t = null;
          for (let r = n.length - 1; r >= 0; r--) {
            const o = n[r];
            (o.hostVars = e += o.hostVars),
              (o.hostAttrs = lc(o.hostAttrs, (t = lc(t, o.hostAttrs))));
          }
        })(r);
      }
      function Tf(n) {
        return n === ai ? {} : n === xe ? [] : n;
      }
      function DS(n, e) {
        const t = n.viewQuery;
        n.viewQuery = t
          ? (r, o) => {
              e(r, o), t(r, o);
            }
          : e;
      }
      function ES(n, e) {
        const t = n.contentQueries;
        n.contentQueries = t
          ? (r, o, i) => {
              e(r, o, i), t(r, o, i);
            }
          : e;
      }
      function OS(n, e) {
        const t = n.hostBindings;
        n.hostBindings = t
          ? (r, o) => {
              e(r, o), t(r, o);
            }
          : e;
      }
      let Lc = null;
      function Fo() {
        if (!Lc) {
          const n = Ve.Symbol;
          if (n && n.iterator) Lc = n.iterator;
          else {
            const e = Object.getOwnPropertyNames(Map.prototype);
            for (let t = 0; t < e.length; ++t) {
              const r = e[t];
              "entries" !== r &&
                "size" !== r &&
                Map.prototype[r] === Map.prototype.entries &&
                (Lc = r);
            }
          }
        }
        return Lc;
      }
      function Ws(n) {
        return (
          !!If(n) && (Array.isArray(n) || (!(n instanceof Map) && Fo() in n))
        );
      }
      function If(n) {
        return null !== n && ("function" == typeof n || "object" == typeof n);
      }
      function gr(n, e, t) {
        return (n[e] = t);
      }
      function Vt(n, e, t) {
        return !Object.is(n[e], t) && ((n[e] = t), !0);
      }
      function Lo(n, e, t, r) {
        const o = Vt(n, e, t);
        return Vt(n, e + 1, r) || o;
      }
      function Jn(n, e, t, r) {
        const o = D();
        return Vt(o, pi(), e) && (we(), pr(rt(), o, n, e, t, r)), Jn;
      }
      function Ri(n, e, t, r) {
        return Vt(n, pi(), t) ? e + ee(t) + r : te;
      }
      function Fi(n, e, t, r, o, i) {
        const a = Lo(
          n,
          (function Fr() {
            return X.lFrame.bindingIndex;
          })(),
          t,
          o
        );
        return Lr(2), a ? e + ee(t) + r + ee(o) + i : te;
      }
      function ne(n, e, t, r, o, i, s, a) {
        const c = D(),
          l = we(),
          u = n + 22,
          d = l.firstCreatePass
            ? (function NS(n, e, t, r, o, i, s, a, c) {
                const l = e.consts,
                  u = Ii(e, n, 4, s || null, oo(l, a));
                Mf(e, t, u, oo(l, c)), ic(e, u);
                const d = (u.tViews = wf(
                  2,
                  u,
                  r,
                  o,
                  i,
                  e.directiveRegistry,
                  e.pipeRegistry,
                  null,
                  e.schemas,
                  l
                ));
                return (
                  null !== e.queries &&
                    (e.queries.template(e, u),
                    (d.queries = e.queries.embeddedTView(u))),
                  u
                );
              })(u, l, c, e, t, r, o, i, s)
            : l.data[u];
        dr(d, !1);
        const f = c[11].createComment("");
        Oc(l, c, f, d),
          Lt(f, c),
          Nc(c, (c[u] = Dy(f, c, f, d))),
          tc(d) && Cf(l, c, d),
          null != s && bf(c, d, a);
      }
      function Bc(n) {
        return hi(
          (function PE() {
            return X.lFrame.contextLView;
          })(),
          22 + n
        );
      }
      function L(n, e, t) {
        const r = D();
        return Vt(r, pi(), e) && Cn(we(), rt(), r, n, e, r[11], t, !1), L;
      }
      function kf(n, e, t, r, o) {
        const s = o ? "class" : "style";
        Sf(n, t, e.inputs[s], s, r);
      }
      function _(n, e, t, r) {
        const o = D(),
          i = we(),
          s = 22 + n,
          a = o[11],
          c = (o[s] = Qd(
            a,
            e,
            (function FE() {
              return X.lFrame.currentNamespace;
            })()
          )),
          l = i.firstCreatePass
            ? (function FS(n, e, t, r, o, i, s) {
                const a = e.consts,
                  l = Ii(e, n, 2, o, oo(a, i));
                return (
                  Mf(e, t, l, oo(a, s)),
                  null !== l.attrs && Rc(l, l.attrs, !1),
                  null !== l.mergedAttrs && Rc(l, l.mergedAttrs, !0),
                  null !== e.queries && e.queries.elementStart(e, l),
                  l
                );
              })(s, i, o, 0, e, t, r)
            : i.data[s];
        dr(l, !0);
        const u = l.mergedAttrs;
        null !== u && cc(a, c, u);
        const d = l.classes;
        null !== d && tf(a, c, d);
        const f = l.styles;
        return (
          null !== f && L_(a, c, f),
          64 != (64 & l.flags) && Oc(i, o, c, l),
          0 ===
            (function wE() {
              return X.lFrame.elementDepthCount;
            })() && Lt(c, o),
          (function ME() {
            X.lFrame.elementDepthCount++;
          })(),
          tc(l) && (Cf(i, o, l), hy(i, l, o)),
          null !== r && bf(o, l),
          _
        );
      }
      function g() {
        let n = vt();
        Ju() ? Xu() : ((n = n.parent), dr(n, !1));
        const e = n;
        !(function DE() {
          X.lFrame.elementDepthCount--;
        })();
        const t = we();
        return (
          t.firstCreatePass && (ic(t, n), Gu(n) && t.queries.elementEnd(n)),
          null != e.classesWithoutHost &&
            (function UE(n) {
              return 0 != (16 & n.flags);
            })(e) &&
            kf(t, e, D(), e.classesWithoutHost, !0),
          null != e.stylesWithoutHost &&
            (function $E(n) {
              return 0 != (32 & n.flags);
            })(e) &&
            kf(t, e, D(), e.stylesWithoutHost, !1),
          g
        );
      }
      function re(n, e, t, r) {
        return _(n, e, t, r), g(), re;
      }
      function ve(n, e, t) {
        const r = D(),
          o = we(),
          i = n + 22,
          s = o.firstCreatePass
            ? (function LS(n, e, t, r, o) {
                const i = e.consts,
                  s = oo(i, r),
                  a = Ii(e, n, 8, "ng-container", s);
                return (
                  null !== s && Rc(a, s, !0),
                  Mf(e, t, a, oo(i, o)),
                  null !== e.queries && e.queries.elementStart(e, a),
                  a
                );
              })(i, o, r, e, t)
            : o.data[i];
        dr(s, !0);
        const a = (r[i] = r[11].createComment(""));
        return (
          Oc(o, r, a, s),
          Lt(a, r),
          tc(s) && (Cf(o, r, s), hy(o, s, r)),
          null != t && bf(r, s),
          ve
        );
      }
      function Ce() {
        let n = vt();
        const e = we();
        return (
          Ju() ? Xu() : ((n = n.parent), dr(n, !1)),
          e.firstCreatePass && (ic(e, n), Gu(n) && e.queries.elementEnd(n)),
          Ce
        );
      }
      function bn() {
        return D();
      }
      function Ks(n) {
        return !!n && "function" == typeof n.then;
      }
      function $y(n) {
        return !!n && "function" == typeof n.subscribe;
      }
      const Nf = $y;
      function me(n, e, t, r) {
        const o = D(),
          i = we(),
          s = vt();
        return (
          (function zy(n, e, t, r, o, i, s, a) {
            const c = tc(r),
              u = n.firstCreatePass && Py(n),
              d = e[8],
              f = Oy(e);
            let h = !0;
            if (3 & r.type || a) {
              const y = Rn(r, e),
                C = a ? a(y) : y,
                O = f.length,
                b = a ? (Y) => a(ht(Y[r.index])) : r.index;
              let x = null;
              if (
                (!a &&
                  c &&
                  (x = (function VS(n, e, t, r) {
                    const o = n.cleanup;
                    if (null != o)
                      for (let i = 0; i < o.length - 1; i += 2) {
                        const s = o[i];
                        if (s === t && o[i + 1] === r) {
                          const a = e[7],
                            c = o[i + 2];
                          return a.length > c ? a[c] : null;
                        }
                        "string" == typeof s && (i += 2);
                      }
                    return null;
                  })(n, e, o, r.index)),
                null !== x)
              )
                ((x.__ngLastListenerFn__ || x).__ngNextListenerFn__ = i),
                  (x.__ngLastListenerFn__ = i),
                  (h = !1);
              else {
                i = Wy(r, e, d, i, !1);
                const Y = t.listen(C, o, i);
                f.push(i, Y), u && u.push(o, b, O, O + 1);
              }
            } else i = Wy(r, e, d, i, !1);
            const p = r.outputs;
            let m;
            if (h && null !== p && (m = p[o])) {
              const y = m.length;
              if (y)
                for (let C = 0; C < y; C += 2) {
                  const be = e[m[C]][m[C + 1]].subscribe(i),
                    tt = f.length;
                  f.push(i, be), u && u.push(o, r.index, tt, -(tt + 1));
                }
            }
          })(i, o, o[11], s, n, e, 0, r),
          me
        );
      }
      function Gy(n, e, t, r) {
        try {
          return !1 !== t(r);
        } catch (o) {
          return Sy(n, o), !1;
        }
      }
      function Wy(n, e, t, r, o) {
        return function i(s) {
          if (s === Function) return r;
          Of(2 & n.flags ? mn(n.index, e) : e);
          let c = Gy(e, 0, r, s),
            l = i.__ngNextListenerFn__;
          for (; l; ) (c = Gy(e, 0, l, s) && c), (l = l.__ngNextListenerFn__);
          return o && !1 === c && (s.preventDefault(), (s.returnValue = !1)), c;
        };
      }
      function ie(n = 1) {
        return (function IE(n) {
          return (X.lFrame.contextLView = (function kE(n, e) {
            for (; n > 0; ) (e = e[15]), n--;
            return e;
          })(n, X.lFrame.contextLView))[8];
        })(n);
      }
      function BS(n, e) {
        let t = null;
        const r = (function cx(n) {
          const e = n.attrs;
          if (null != e) {
            const t = e.indexOf(5);
            if (0 == (1 & t)) return e[t + 1];
          }
          return null;
        })(n);
        for (let o = 0; o < e.length; o++) {
          const i = e[o];
          if ("*" !== i) {
            if (null === r ? U_(n, i, !0) : dx(r, i)) return o;
          } else t = o;
        }
        return t;
      }
      function Hi(n, e, t) {
        return Qs(n, "", e, "", t), Hi;
      }
      function Qs(n, e, t, r, o) {
        const i = D(),
          s = Ri(i, e, t, r);
        return s !== te && Cn(we(), rt(), i, n, s, i[11], o, !1), Qs;
      }
      function rv(n, e, t, r, o) {
        const i = n[t + 1],
          s = null === e;
        let a = r ? Yn(i) : Ur(i),
          c = !1;
        for (; 0 !== a && (!1 === c || s); ) {
          const u = n[a + 1];
          $S(n[a], e) && ((c = !0), (n[a + 1] = r ? df(u) : lf(u))),
            (a = r ? Yn(u) : Ur(u));
        }
        c && (n[t + 1] = r ? lf(i) : df(i));
      }
      function $S(n, e) {
        return (
          null === n ||
          null == e ||
          (Array.isArray(n) ? n[1] : n) === e ||
          (!(!Array.isArray(n) || "string" != typeof e) && wi(n, e) >= 0)
        );
      }
      function Vo(n, e) {
        return (
          (function Xn(n, e, t, r) {
            const o = D(),
              i = we(),
              s = Lr(2);
            i.firstUpdatePass &&
              (function fv(n, e, t, r) {
                const o = n.data;
                if (null === o[t + 1]) {
                  const i = o[Yt()],
                    s = (function dv(n, e) {
                      return e >= n.expandoStartIndex;
                    })(n, t);
                  (function mv(n, e) {
                    return 0 != (n.flags & (e ? 16 : 32));
                  })(i, r) &&
                    null === e &&
                    !s &&
                    (e = !1),
                    (e = (function YS(n, e, t, r) {
                      const o = (function td(n) {
                        const e = X.lFrame.currentDirectiveIndex;
                        return -1 === e ? null : n[e];
                      })(n);
                      let i = r ? e.residualClasses : e.residualStyles;
                      if (null === o)
                        0 === (r ? e.classBindings : e.styleBindings) &&
                          ((t = Zs((t = Rf(null, n, e, t, r)), e.attrs, r)),
                          (i = null));
                      else {
                        const s = e.directiveStylingLast;
                        if (-1 === s || n[s] !== o)
                          if (((t = Rf(o, n, e, t, r)), null === i)) {
                            let c = (function JS(n, e, t) {
                              const r = t ? e.classBindings : e.styleBindings;
                              if (0 !== Ur(r)) return n[Yn(r)];
                            })(n, e, r);
                            void 0 !== c &&
                              Array.isArray(c) &&
                              ((c = Rf(null, n, e, c[1], r)),
                              (c = Zs(c, e.attrs, r)),
                              (function XS(n, e, t, r) {
                                n[Yn(t ? e.classBindings : e.styleBindings)] =
                                  r;
                              })(n, e, r, c));
                          } else
                            i = (function eA(n, e, t) {
                              let r;
                              const o = e.directiveEnd;
                              for (
                                let i = 1 + e.directiveStylingLast;
                                i < o;
                                i++
                              )
                                r = Zs(r, n[i].hostAttrs, t);
                              return Zs(r, e.attrs, t);
                            })(n, e, r);
                      }
                      return (
                        void 0 !== i &&
                          (r
                            ? (e.residualClasses = i)
                            : (e.residualStyles = i)),
                        t
                      );
                    })(o, i, e, r)),
                    (function jS(n, e, t, r, o, i) {
                      let s = i ? e.classBindings : e.styleBindings,
                        a = Yn(s),
                        c = Ur(s);
                      n[r] = t;
                      let u,
                        l = !1;
                      if (Array.isArray(t)) {
                        const d = t;
                        (u = d[1]), (null === u || wi(d, u) > 0) && (l = !0);
                      } else u = t;
                      if (o)
                        if (0 !== c) {
                          const f = Yn(n[a + 1]);
                          (n[r + 1] = Sc(f, a)),
                            0 !== f && (n[f + 1] = uf(n[f + 1], r)),
                            (n[a + 1] = (function kx(n, e) {
                              return (131071 & n) | (e << 17);
                            })(n[a + 1], r));
                        } else
                          (n[r + 1] = Sc(a, 0)),
                            0 !== a && (n[a + 1] = uf(n[a + 1], r)),
                            (a = r);
                      else
                        (n[r + 1] = Sc(c, 0)),
                          0 === a ? (a = r) : (n[c + 1] = uf(n[c + 1], r)),
                          (c = r);
                      l && (n[r + 1] = lf(n[r + 1])),
                        rv(n, u, r, !0),
                        rv(n, u, r, !1),
                        (function US(n, e, t, r, o) {
                          const i = o ? n.residualClasses : n.residualStyles;
                          null != i &&
                            "string" == typeof e &&
                            wi(i, e) >= 0 &&
                            (t[r + 1] = df(t[r + 1]));
                        })(e, u, n, r, i),
                        (s = Sc(a, c)),
                        i ? (e.classBindings = s) : (e.styleBindings = s);
                    })(o, i, e, t, s, r);
                }
              })(i, n, s, r),
              e !== te &&
                Vt(o, s, e) &&
                (function pv(n, e, t, r, o, i, s, a) {
                  if (!(3 & e.type)) return;
                  const c = n.data,
                    l = c[a + 1];
                  jc(
                    (function ry(n) {
                      return 1 == (1 & n);
                    })(l)
                      ? gv(c, e, t, o, Ur(l), s)
                      : void 0
                  ) ||
                    (jc(i) ||
                      ((function ny(n) {
                        return 2 == (2 & n);
                      })(l) &&
                        (i = gv(c, null, t, o, a, s))),
                    (function rx(n, e, t, r, o) {
                      if (e) o ? n.addClass(t, r) : n.removeClass(t, r);
                      else {
                        let i = -1 === r.indexOf("-") ? void 0 : an.DashCase;
                        null == o
                          ? n.removeStyle(t, r, i)
                          : ("string" == typeof o &&
                              o.endsWith("!important") &&
                              ((o = o.slice(0, -10)), (i |= an.Important)),
                            n.setStyle(t, r, o, i));
                      }
                    })(r, s, nc(Yt(), t), o, i));
                })(
                  i,
                  i.data[Yt()],
                  o,
                  o[11],
                  n,
                  (o[s + 1] = (function rA(n, e) {
                    return (
                      null == n ||
                        ("string" == typeof e
                          ? (n += e)
                          : "object" == typeof n && (n = Le(ao(n)))),
                      n
                    );
                  })(e, t)),
                  r,
                  s
                );
          })(n, e, null, !0),
          Vo
        );
      }
      function Rf(n, e, t, r, o) {
        let i = null;
        const s = t.directiveEnd;
        let a = t.directiveStylingLast;
        for (
          -1 === a ? (a = t.directiveStart) : a++;
          a < s && ((i = e[a]), (r = Zs(r, i.hostAttrs, o)), i !== n);

        )
          a++;
        return null !== n && (t.directiveStylingLast = a), r;
      }
      function Zs(n, e, t) {
        const r = t ? 1 : 2;
        let o = -1;
        if (null !== e)
          for (let i = 0; i < e.length; i++) {
            const s = e[i];
            "number" == typeof s
              ? (o = s)
              : o === r &&
                (Array.isArray(n) || (n = void 0 === n ? [] : ["", n]),
                yn(n, s, !!t || e[++i]));
          }
        return void 0 === n ? null : n;
      }
      function gv(n, e, t, r, o, i) {
        const s = null === e;
        let a;
        for (; o > 0; ) {
          const c = n[o],
            l = Array.isArray(c),
            u = l ? c[1] : c,
            d = null === u;
          let f = t[o + 1];
          f === te && (f = d ? xe : void 0);
          let h = d ? gd(f, r) : u === r ? f : void 0;
          if ((l && !jc(h) && (h = gd(c, r)), jc(h) && ((a = h), s))) return a;
          const p = n[o + 1];
          o = s ? Yn(p) : Ur(p);
        }
        if (null !== e) {
          let c = i ? e.residualClasses : e.residualStyles;
          null != c && (a = gd(c, r));
        }
        return a;
      }
      function jc(n) {
        return void 0 !== n;
      }
      function v(n, e = "") {
        const t = D(),
          r = we(),
          o = n + 22,
          i = r.firstCreatePass ? Ii(r, o, 1, e, null) : r.data[o],
          s = (t[o] = (function Kd(n, e) {
            return n.createText(e);
          })(t[11], e));
        Oc(r, t, s, i), dr(i, !1);
      }
      function Je(n) {
        return Xt("", n, ""), Je;
      }
      function Xt(n, e, t) {
        const r = D(),
          o = Ri(r, n, e, t);
        return o !== te && $r(r, Yt(), o), Xt;
      }
      function Ff(n, e, t, r, o) {
        const i = D(),
          s = Fi(i, n, e, t, r, o);
        return s !== te && $r(i, Yt(), s), Ff;
      }
      const Bo = void 0;
      var MA = [
        "en",
        [["a", "p"], ["AM", "PM"], Bo],
        [["AM", "PM"], Bo, Bo],
        [
          ["S", "M", "T", "W", "T", "F", "S"],
          ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
          [
            "Sunday",
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
          ],
          ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
        ],
        Bo,
        [
          ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"],
          [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec",
          ],
          [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December",
          ],
        ],
        Bo,
        [
          ["B", "A"],
          ["BC", "AD"],
          ["Before Christ", "Anno Domini"],
        ],
        0,
        [6, 0],
        ["M/d/yy", "MMM d, y", "MMMM d, y", "EEEE, MMMM d, y"],
        ["h:mm a", "h:mm:ss a", "h:mm:ss a z", "h:mm:ss a zzzz"],
        ["{1}, {0}", Bo, "{1} 'at' {0}", Bo],
        [
          ".",
          ",",
          ";",
          "%",
          "+",
          "-",
          "E",
          "\xd7",
          "\u2030",
          "\u221e",
          "NaN",
          ":",
        ],
        ["#,##0.###", "#,##0%", "\xa4#,##0.00", "#E0"],
        "USD",
        "$",
        "US Dollar",
        {},
        "ltr",
        function wA(n) {
          const t = Math.floor(Math.abs(n)),
            r = n.toString().replace(/^[^.]*\.?/, "").length;
          return 1 === t && 0 === r ? 1 : 5;
        },
      ];
      let Gi = {};
      function en(n) {
        const e = (function DA(n) {
          return n.toLowerCase().replace(/_/g, "-");
        })(n);
        let t = Fv(e);
        if (t) return t;
        const r = e.split("-")[0];
        if (((t = Fv(r)), t)) return t;
        if ("en" === r) return MA;
        throw new M(701, !1);
      }
      function Fv(n) {
        return (
          n in Gi ||
            (Gi[n] =
              Ve.ng &&
              Ve.ng.common &&
              Ve.ng.common.locales &&
              Ve.ng.common.locales[n]),
          Gi[n]
        );
      }
      var T = (() => (
        ((T = T || {})[(T.LocaleId = 0)] = "LocaleId"),
        (T[(T.DayPeriodsFormat = 1)] = "DayPeriodsFormat"),
        (T[(T.DayPeriodsStandalone = 2)] = "DayPeriodsStandalone"),
        (T[(T.DaysFormat = 3)] = "DaysFormat"),
        (T[(T.DaysStandalone = 4)] = "DaysStandalone"),
        (T[(T.MonthsFormat = 5)] = "MonthsFormat"),
        (T[(T.MonthsStandalone = 6)] = "MonthsStandalone"),
        (T[(T.Eras = 7)] = "Eras"),
        (T[(T.FirstDayOfWeek = 8)] = "FirstDayOfWeek"),
        (T[(T.WeekendRange = 9)] = "WeekendRange"),
        (T[(T.DateFormat = 10)] = "DateFormat"),
        (T[(T.TimeFormat = 11)] = "TimeFormat"),
        (T[(T.DateTimeFormat = 12)] = "DateTimeFormat"),
        (T[(T.NumberSymbols = 13)] = "NumberSymbols"),
        (T[(T.NumberFormats = 14)] = "NumberFormats"),
        (T[(T.CurrencyCode = 15)] = "CurrencyCode"),
        (T[(T.CurrencySymbol = 16)] = "CurrencySymbol"),
        (T[(T.CurrencyName = 17)] = "CurrencyName"),
        (T[(T.Currencies = 18)] = "Currencies"),
        (T[(T.Directionality = 19)] = "Directionality"),
        (T[(T.PluralCase = 20)] = "PluralCase"),
        (T[(T.ExtraData = 21)] = "ExtraData"),
        T
      ))();
      const Wi = "en-US";
      let Lv = Wi;
      function Bf(n, e, t, r, o) {
        if (((n = K(n)), Array.isArray(n)))
          for (let i = 0; i < n.length; i++) Bf(n[i], e, t, r, o);
        else {
          const i = we(),
            s = D();
          let a = ko(n) ? n : K(n.provide),
            c = a_(n);
          const l = vt(),
            u = 1048575 & l.providerIndexes,
            d = l.directiveStart,
            f = l.providerIndexes >> 20;
          if (ko(n) || !n.multi) {
            const h = new Cs(c, o, w),
              p = Uf(a, e, o ? u : u + f, d);
            -1 === p
              ? (fc(ws(l, s), i, a),
                jf(i, n, e.length),
                e.push(a),
                l.directiveStart++,
                l.directiveEnd++,
                o && (l.providerIndexes += 1048576),
                t.push(h),
                s.push(h))
              : ((t[p] = h), (s[p] = h));
          } else {
            const h = Uf(a, e, u + f, d),
              p = Uf(a, e, u, u + f),
              m = h >= 0 && t[h],
              y = p >= 0 && t[p];
            if ((o && !y) || (!o && !m)) {
              fc(ws(l, s), i, a);
              const C = (function bT(n, e, t, r, o) {
                const i = new Cs(n, t, w);
                return (
                  (i.multi = []),
                  (i.index = e),
                  (i.componentProviders = 0),
                  l0(i, o, r && !t),
                  i
                );
              })(o ? CT : vT, t.length, o, r, c);
              !o && y && (t[p].providerFactory = C),
                jf(i, n, e.length, 0),
                e.push(a),
                l.directiveStart++,
                l.directiveEnd++,
                o && (l.providerIndexes += 1048576),
                t.push(C),
                s.push(C);
            } else jf(i, n, h > -1 ? h : p, l0(t[o ? p : h], c, !o && r));
            !o && r && y && t[p].componentProviders++;
          }
        }
      }
      function jf(n, e, t, r) {
        const o = ko(e),
          i = (function YO(n) {
            return !!n.useClass;
          })(e);
        if (o || i) {
          const c = (i ? K(e.useClass) : e).prototype.ngOnDestroy;
          if (c) {
            const l = n.destroyHooks || (n.destroyHooks = []);
            if (!o && e.multi) {
              const u = l.indexOf(t);
              -1 === u ? l.push(t, [r, c]) : l[u + 1].push(r, c);
            } else l.push(t, c);
          }
        }
      }
      function l0(n, e, t) {
        return t && n.componentProviders++, n.multi.push(e) - 1;
      }
      function Uf(n, e, t, r) {
        for (let o = t; o < r; o++) if (e[o] === n) return o;
        return -1;
      }
      function vT(n, e, t, r) {
        return $f(this.multi, []);
      }
      function CT(n, e, t, r) {
        const o = this.multi;
        let i;
        if (this.providerFactory) {
          const s = this.providerFactory.componentProviders,
            a = Ms(t, t[1], this.providerFactory.index, r);
          (i = a.slice(0, s)), $f(o, i);
          for (let c = s; c < a.length; c++) i.push(a[c]);
        } else (i = []), $f(o, i);
        return i;
      }
      function $f(n, e) {
        for (let t = 0; t < n.length; t++) e.push((0, n[t])());
        return e;
      }
      function Ze(n, e = []) {
        return (t) => {
          t.providersResolver = (r, o) =>
            (function yT(n, e, t) {
              const r = we();
              if (r.firstCreatePass) {
                const o = Qn(n);
                Bf(t, r.data, r.blueprint, o, !0),
                  Bf(e, r.data, r.blueprint, o, !1);
              }
            })(r, o ? o(n) : n, e);
        };
      }
      class jo {}
      class u0 {}
      class d0 extends jo {
        constructor(e, t) {
          super(),
            (this._parent = t),
            (this._bootstrapComponents = []),
            (this.destroyCbs = []),
            (this.componentFactoryResolver = new Af(this));
          const r = pn(e);
          (this._bootstrapComponents = jr(r.bootstrap)),
            (this._r3Injector = K_(
              e,
              t,
              [
                { provide: jo, useValue: this },
                { provide: Vs, useValue: this.componentFactoryResolver },
              ],
              Le(e),
              new Set(["environment"])
            )),
            this._r3Injector.resolveInjectorInitializers(),
            (this.instance = this._r3Injector.get(e));
        }
        get injector() {
          return this._r3Injector;
        }
        destroy() {
          const e = this._r3Injector;
          !e.destroyed && e.destroy(),
            this.destroyCbs.forEach((t) => t()),
            (this.destroyCbs = null);
        }
        onDestroy(e) {
          this.destroyCbs.push(e);
        }
      }
      class Hf extends u0 {
        constructor(e) {
          super(), (this.moduleType = e);
        }
        create(e) {
          return new d0(this.moduleType, e);
        }
      }
      class MT extends jo {
        constructor(e, t, r) {
          super(),
            (this.componentFactoryResolver = new Af(this)),
            (this.instance = null);
          const o = new s_(
            [
              ...e,
              { provide: jo, useValue: this },
              { provide: Vs, useValue: this.componentFactoryResolver },
            ],
            t || Dc(),
            r,
            new Set(["environment"])
          );
          (this.injector = o), o.resolveInjectorInitializers();
        }
        destroy() {
          this.injector.destroy();
        }
        onDestroy(e) {
          this.injector.onDestroy(e);
        }
      }
      function Gc(n, e, t = null) {
        return new MT(n, e, t).injector;
      }
      let DT = (() => {
        class n {
          constructor(t) {
            (this._injector = t), (this.cachedInjectors = new Map());
          }
          getOrCreateStandaloneInjector(t) {
            if (!t.standalone) return null;
            if (!this.cachedInjectors.has(t.id)) {
              const r = n_(0, t.type),
                o =
                  r.length > 0
                    ? Gc([r], this._injector, `Standalone[${t.type.name}]`)
                    : null;
              this.cachedInjectors.set(t.id, o);
            }
            return this.cachedInjectors.get(t.id);
          }
          ngOnDestroy() {
            try {
              for (const t of this.cachedInjectors.values())
                null !== t && t.destroy();
            } finally {
              this.cachedInjectors.clear();
            }
          }
        }
        return (
          (n.ɵprov = R({
            token: n,
            providedIn: "environment",
            factory: () => new n(P(co)),
          })),
          n
        );
      })();
      function f0(n) {
        n.getStandaloneInjector = (e) =>
          e.get(DT).getOrCreateStandaloneInjector(n);
      }
      function ta(n, e) {
        const t = n[e];
        return t === te ? void 0 : t;
      }
      function w0(n, e, t, r, o, i, s) {
        const a = e + t;
        return Lo(n, a, o, i)
          ? gr(n, a + 2, s ? r.call(s, o, i) : r(o, i))
          : ta(n, a + 2);
      }
      function M0(n, e, t, r, o, i, s, a) {
        const c = e + t;
        return (function Vc(n, e, t, r, o) {
          const i = Lo(n, e, t, r);
          return Vt(n, e + 2, o) || i;
        })(n, c, o, i, s)
          ? gr(n, c + 3, a ? r.call(a, o, i, s) : r(o, i, s))
          : ta(n, c + 3);
      }
      function Xe(n, e) {
        const t = we();
        let r;
        const o = n + 22;
        t.firstCreatePass
          ? ((r = (function UT(n, e) {
              if (e)
                for (let t = e.length - 1; t >= 0; t--) {
                  const r = e[t];
                  if (n === r.name) return r;
                }
            })(e, t.pipeRegistry)),
            (t.data[o] = r),
            r.onDestroy &&
              (t.destroyHooks || (t.destroyHooks = [])).push(o, r.onDestroy))
          : (r = t.data[o]);
        const i = r.factory || (r.factory = Io(r.type)),
          s = Tn(w);
        try {
          const a = uc(!1),
            c = i();
          return (
            uc(a),
            (function RS(n, e, t, r) {
              t >= n.data.length &&
                ((n.data[t] = null), (n.blueprint[t] = null)),
                (e[t] = r);
            })(t, D(), o, c),
            c
          );
        } finally {
          Tn(s);
        }
      }
      function tr(n, e, t) {
        const r = n + 22,
          o = D(),
          i = hi(o, r);
        return na(o, r)
          ? (function b0(n, e, t, r, o, i) {
              const s = e + t;
              return Vt(n, s, o)
                ? gr(n, s + 1, i ? r.call(i, o) : r(o))
                : ta(n, s + 1);
            })(o, Zt(), e, i.transform, t, i)
          : i.transform(t);
      }
      function Ln(n, e, t, r) {
        const o = n + 22,
          i = D(),
          s = hi(i, o);
        return na(i, o)
          ? w0(i, Zt(), e, s.transform, t, r, s)
          : s.transform(t, r);
      }
      function na(n, e) {
        return n[1].data[e].pure;
      }
      function Gf(n) {
        return (e) => {
          setTimeout(n, void 0, e);
        };
      }
      const it = class zT extends We {
        constructor(e = !1) {
          super(), (this.__isAsync = e);
        }
        emit(e) {
          super.next(e);
        }
        subscribe(e, t, r) {
          let o = e,
            i = t || (() => null),
            s = r;
          if (e && "object" == typeof e) {
            const c = e;
            (o = c.next?.bind(c)),
              (i = c.error?.bind(c)),
              (s = c.complete?.bind(c));
          }
          this.__isAsync && ((i = Gf(i)), o && (o = Gf(o)), s && (s = Gf(s)));
          const a = super.subscribe({ next: o, error: i, complete: s });
          return e instanceof Ee && e.add(a), a;
        }
      };
      function GT() {
        return this._results[Fo()]();
      }
      class Wf {
        constructor(e = !1) {
          (this._emitDistinctChangesOnly = e),
            (this.dirty = !0),
            (this._results = []),
            (this._changesDetected = !1),
            (this._changes = null),
            (this.length = 0),
            (this.first = void 0),
            (this.last = void 0);
          const t = Fo(),
            r = Wf.prototype;
          r[t] || (r[t] = GT);
        }
        get changes() {
          return this._changes || (this._changes = new it());
        }
        get(e) {
          return this._results[e];
        }
        map(e) {
          return this._results.map(e);
        }
        filter(e) {
          return this._results.filter(e);
        }
        find(e) {
          return this._results.find(e);
        }
        reduce(e, t) {
          return this._results.reduce(e, t);
        }
        forEach(e) {
          this._results.forEach(e);
        }
        some(e) {
          return this._results.some(e);
        }
        toArray() {
          return this._results.slice();
        }
        toString() {
          return this._results.toString();
        }
        reset(e, t) {
          const r = this;
          r.dirty = !1;
          const o = _n(e);
          (this._changesDetected = !(function JE(n, e, t) {
            if (n.length !== e.length) return !1;
            for (let r = 0; r < n.length; r++) {
              let o = n[r],
                i = e[r];
              if ((t && ((o = t(o)), (i = t(i))), i !== o)) return !1;
            }
            return !0;
          })(r._results, o, t)) &&
            ((r._results = o),
            (r.length = o.length),
            (r.last = o[this.length - 1]),
            (r.first = o[0]));
        }
        notifyOnChanges() {
          this._changes &&
            (this._changesDetected || !this._emitDistinctChangesOnly) &&
            this._changes.emit(this);
        }
        setDirty() {
          this.dirty = !0;
        }
        destroy() {
          this.changes.complete(), this.changes.unsubscribe();
        }
      }
      let Hr = (() => {
        class n {}
        return (n.__NG_ELEMENT_ID__ = KT), n;
      })();
      const WT = Hr,
        qT = class extends WT {
          constructor(e, t, r) {
            super(),
              (this._declarationLView = e),
              (this._declarationTContainer = t),
              (this.elementRef = r);
          }
          createEmbeddedView(e, t) {
            const r = this._declarationTContainer.tViews,
              o = Ic(
                this._declarationLView,
                r,
                e,
                16,
                null,
                r.declTNode,
                null,
                null,
                null,
                null,
                t || null
              );
            o[17] = this._declarationLView[this._declarationTContainer.index];
            const s = this._declarationLView[19];
            return (
              null !== s && (o[19] = s.createEmbeddedView(r)),
              kc(r, o, e),
              new zs(o)
            );
          }
        };
      function KT() {
        return Wc(vt(), D());
      }
      function Wc(n, e) {
        return 4 & n.type ? new qT(e, n, Pi(n, e)) : null;
      }
      let nr = (() => {
        class n {}
        return (n.__NG_ELEMENT_ID__ = QT), n;
      })();
      function QT() {
        return S0(vt(), D());
      }
      const ZT = nr,
        P0 = class extends ZT {
          constructor(e, t, r) {
            super(),
              (this._lContainer = e),
              (this._hostTNode = t),
              (this._hostLView = r);
          }
          get element() {
            return Pi(this._hostTNode, this._hostLView);
          }
          get injector() {
            return new _i(this._hostTNode, this._hostLView);
          }
          get parentInjector() {
            const e = dc(this._hostTNode, this._hostLView);
            if (mm(e)) {
              const t = mi(e, this._hostLView),
                r = gi(e);
              return new _i(t[1].data[r + 8], t);
            }
            return new _i(null, this._hostLView);
          }
          clear() {
            for (; this.length > 0; ) this.remove(this.length - 1);
          }
          get(e) {
            const t = x0(this._lContainer);
            return (null !== t && t[e]) || null;
          }
          get length() {
            return this._lContainer.length - 10;
          }
          createEmbeddedView(e, t, r) {
            let o, i;
            "number" == typeof r
              ? (o = r)
              : null != r && ((o = r.index), (i = r.injector));
            const s = e.createEmbeddedView(t || {}, i);
            return this.insert(s, o), s;
          }
          createComponent(e, t, r, o, i) {
            const s =
              e &&
              !(function Os(n) {
                return "function" == typeof n;
              })(e);
            let a;
            if (s) a = t;
            else {
              const d = t || {};
              (a = d.index),
                (r = d.injector),
                (o = d.projectableNodes),
                (i = d.environmentInjector || d.ngModuleRef);
            }
            const c = s ? e : new Gs(Ie(e)),
              l = r || this.parentInjector;
            if (!i && null == c.ngModule) {
              const f = (s ? l : this.parentInjector).get(co, null);
              f && (i = f);
            }
            const u = c.create(l, o, void 0, i);
            return this.insert(u.hostView, a), u;
          }
          insert(e, t) {
            const r = e._lView,
              o = r[1];
            if (
              (function bE(n) {
                return Kn(n[3]);
              })(r)
            ) {
              const u = this.indexOf(e);
              if (-1 !== u) this.detach(u);
              else {
                const d = r[3],
                  f = new P0(d, d[6], d[3]);
                f.detach(f.indexOf(e));
              }
            }
            const i = this._adjustIndex(t),
              s = this._lContainer;
            !(function QP(n, e, t, r) {
              const o = 10 + r,
                i = t.length;
              r > 0 && (t[o - 1][4] = e),
                r < i - 10
                  ? ((e[4] = t[o]), Pm(t, 10 + r, e))
                  : (t.push(e), (e[4] = null)),
                (e[3] = t);
              const s = e[17];
              null !== s &&
                t !== s &&
                (function ZP(n, e) {
                  const t = n[9];
                  e[16] !== e[3][3][16] && (n[2] = !0),
                    null === t ? (n[9] = [e]) : t.push(e);
                })(s, e);
              const a = e[19];
              null !== a && a.insertView(n), (e[2] |= 64);
            })(o, r, s, i);
            const a = Xd(i, s),
              c = r[11],
              l = Ec(c, s[7]);
            return (
              null !== l &&
                (function WP(n, e, t, r, o, i) {
                  (r[0] = o), (r[6] = e), $s(n, r, t, 1, o, i);
                })(o, s[6], c, r, l, a),
              e.attachToViewContainerRef(),
              Pm(qf(s), i, e),
              e
            );
          }
          move(e, t) {
            return this.insert(e, t);
          }
          indexOf(e) {
            const t = x0(this._lContainer);
            return null !== t ? t.indexOf(e) : -1;
          }
          remove(e) {
            const t = this._adjustIndex(e, -1),
              r = Zd(this._lContainer, t);
            r && (pc(qf(this._lContainer), t), E_(r[1], r));
          }
          detach(e) {
            const t = this._adjustIndex(e, -1),
              r = Zd(this._lContainer, t);
            return r && null != pc(qf(this._lContainer), t) ? new zs(r) : null;
          }
          _adjustIndex(e, t = 0) {
            return e ?? this.length + t;
          }
        };
      function x0(n) {
        return n[8];
      }
      function qf(n) {
        return n[8] || (n[8] = []);
      }
      function S0(n, e) {
        let t;
        const r = e[n.index];
        if (Kn(r)) t = r;
        else {
          let o;
          if (8 & n.type) o = ht(r);
          else {
            const i = e[11];
            o = i.createComment("");
            const s = Rn(n, e);
            Ro(
              i,
              Ec(i, s),
              o,
              (function ex(n, e) {
                return n.nextSibling(e);
              })(i, s),
              !1
            );
          }
          (e[n.index] = t = Dy(r, e, o, n)), Nc(e, t);
        }
        return new P0(t, n, e);
      }
      class Kf {
        constructor(e) {
          (this.queryList = e), (this.matches = null);
        }
        clone() {
          return new Kf(this.queryList);
        }
        setDirty() {
          this.queryList.setDirty();
        }
      }
      class Qf {
        constructor(e = []) {
          this.queries = e;
        }
        createEmbeddedView(e) {
          const t = e.queries;
          if (null !== t) {
            const r =
                null !== e.contentQueries ? e.contentQueries[0] : t.length,
              o = [];
            for (let i = 0; i < r; i++) {
              const s = t.getByIndex(i);
              o.push(this.queries[s.indexInDeclarationView].clone());
            }
            return new Qf(o);
          }
          return null;
        }
        insertView(e) {
          this.dirtyQueriesWithMatches(e);
        }
        detachView(e) {
          this.dirtyQueriesWithMatches(e);
        }
        dirtyQueriesWithMatches(e) {
          for (let t = 0; t < this.queries.length; t++)
            null !== R0(e, t).matches && this.queries[t].setDirty();
        }
      }
      class A0 {
        constructor(e, t, r = null) {
          (this.predicate = e), (this.flags = t), (this.read = r);
        }
      }
      class Zf {
        constructor(e = []) {
          this.queries = e;
        }
        elementStart(e, t) {
          for (let r = 0; r < this.queries.length; r++)
            this.queries[r].elementStart(e, t);
        }
        elementEnd(e) {
          for (let t = 0; t < this.queries.length; t++)
            this.queries[t].elementEnd(e);
        }
        embeddedTView(e) {
          let t = null;
          for (let r = 0; r < this.length; r++) {
            const o = null !== t ? t.length : 0,
              i = this.getByIndex(r).embeddedTView(e, o);
            i &&
              ((i.indexInDeclarationView = r),
              null !== t ? t.push(i) : (t = [i]));
          }
          return null !== t ? new Zf(t) : null;
        }
        template(e, t) {
          for (let r = 0; r < this.queries.length; r++)
            this.queries[r].template(e, t);
        }
        getByIndex(e) {
          return this.queries[e];
        }
        get length() {
          return this.queries.length;
        }
        track(e) {
          this.queries.push(e);
        }
      }
      class Yf {
        constructor(e, t = -1) {
          (this.metadata = e),
            (this.matches = null),
            (this.indexInDeclarationView = -1),
            (this.crossesNgTemplate = !1),
            (this._appliesToNextNode = !0),
            (this._declarationNodeIndex = t);
        }
        elementStart(e, t) {
          this.isApplyingToNode(t) && this.matchTNode(e, t);
        }
        elementEnd(e) {
          this._declarationNodeIndex === e.index &&
            (this._appliesToNextNode = !1);
        }
        template(e, t) {
          this.elementStart(e, t);
        }
        embeddedTView(e, t) {
          return this.isApplyingToNode(e)
            ? ((this.crossesNgTemplate = !0),
              this.addMatch(-e.index, t),
              new Yf(this.metadata))
            : null;
        }
        isApplyingToNode(e) {
          if (this._appliesToNextNode && 1 != (1 & this.metadata.flags)) {
            const t = this._declarationNodeIndex;
            let r = e.parent;
            for (; null !== r && 8 & r.type && r.index !== t; ) r = r.parent;
            return t === (null !== r ? r.index : -1);
          }
          return this._appliesToNextNode;
        }
        matchTNode(e, t) {
          const r = this.metadata.predicate;
          if (Array.isArray(r))
            for (let o = 0; o < r.length; o++) {
              const i = r[o];
              this.matchTNodeWithReadOption(e, t, XT(t, i)),
                this.matchTNodeWithReadOption(e, t, hc(t, e, i, !1, !1));
            }
          else
            r === Hr
              ? 4 & t.type && this.matchTNodeWithReadOption(e, t, -1)
              : this.matchTNodeWithReadOption(e, t, hc(t, e, r, !1, !1));
        }
        matchTNodeWithReadOption(e, t, r) {
          if (null !== r) {
            const o = this.metadata.read;
            if (null !== o)
              if (o === Ft || o === nr || (o === Hr && 4 & t.type))
                this.addMatch(t.index, -2);
              else {
                const i = hc(t, e, o, !1, !1);
                null !== i && this.addMatch(t.index, i);
              }
            else this.addMatch(t.index, r);
          }
        }
        addMatch(e, t) {
          null === this.matches
            ? (this.matches = [e, t])
            : this.matches.push(e, t);
        }
      }
      function XT(n, e) {
        const t = n.localNames;
        if (null !== t)
          for (let r = 0; r < t.length; r += 2) if (t[r] === e) return t[r + 1];
        return null;
      }
      function tI(n, e, t, r) {
        return -1 === t
          ? (function eI(n, e) {
              return 11 & n.type ? Pi(n, e) : 4 & n.type ? Wc(n, e) : null;
            })(e, n)
          : -2 === t
          ? (function nI(n, e, t) {
              return t === Ft
                ? Pi(e, n)
                : t === Hr
                ? Wc(e, n)
                : t === nr
                ? S0(e, n)
                : void 0;
            })(n, e, r)
          : Ms(n, n[1], t, e);
      }
      function T0(n, e, t, r) {
        const o = e[19].queries[r];
        if (null === o.matches) {
          const i = n.data,
            s = t.matches,
            a = [];
          for (let c = 0; c < s.length; c += 2) {
            const l = s[c];
            a.push(l < 0 ? null : tI(e, i[l], s[c + 1], t.metadata.read));
          }
          o.matches = a;
        }
        return o.matches;
      }
      function Jf(n, e, t, r) {
        const o = n.queries.getByIndex(t),
          i = o.matches;
        if (null !== i) {
          const s = T0(n, e, o, t);
          for (let a = 0; a < i.length; a += 2) {
            const c = i[a];
            if (c > 0) r.push(s[a / 2]);
            else {
              const l = i[a + 1],
                u = e[-c];
              for (let d = 10; d < u.length; d++) {
                const f = u[d];
                f[17] === f[3] && Jf(f[1], f, l, r);
              }
              if (null !== u[9]) {
                const d = u[9];
                for (let f = 0; f < d.length; f++) {
                  const h = d[f];
                  Jf(h[1], h, l, r);
                }
              }
            }
          }
        }
        return r;
      }
      function qc(n) {
        const e = D(),
          t = we(),
          r = sm();
        nd(r + 1);
        const o = R0(t, r);
        if (n.dirty && Xg(e) === (2 == (2 & o.metadata.flags))) {
          if (null === o.matches) n.reset([]);
          else {
            const i = o.crossesNgTemplate ? Jf(t, e, r, []) : T0(t, e, o, r);
            n.reset(i, lP), n.notifyOnChanges();
          }
          return !0;
        }
        return !1;
      }
      function Xf(n, e, t, r) {
        const o = we();
        if (o.firstCreatePass) {
          const i = vt();
          N0(o, new A0(e, t, r), i.index),
            (function oI(n, e) {
              const t = n.contentQueries || (n.contentQueries = []);
              e !== (t.length ? t[t.length - 1] : -1) &&
                t.push(n.queries.length - 1, e);
            })(o, n),
            2 == (2 & t) && (o.staticContentQueries = !0);
        }
        k0(o, D(), t);
      }
      function Kc() {
        return (function rI(n, e) {
          return n[19].queries[e].queryList;
        })(D(), sm());
      }
      function k0(n, e, t) {
        const r = new Wf(4 == (4 & t));
        gy(n, e, r, r.destroy),
          null === e[19] && (e[19] = new Qf()),
          e[19].queries.push(new Kf(r));
      }
      function N0(n, e, t) {
        null === n.queries && (n.queries = new Zf()),
          n.queries.track(new Yf(e, t));
      }
      function R0(n, e) {
        return n.queries.getByIndex(e);
      }
      function Qc(n, e) {
        return Wc(n, e);
      }
      function Yc(...n) {}
      const Jc = new F("Application Initializer");
      let Xc = (() => {
        class n {
          constructor(t) {
            (this.appInits = t),
              (this.resolve = Yc),
              (this.reject = Yc),
              (this.initialized = !1),
              (this.done = !1),
              (this.donePromise = new Promise((r, o) => {
                (this.resolve = r), (this.reject = o);
              }));
          }
          runInitializers() {
            if (this.initialized) return;
            const t = [],
              r = () => {
                (this.done = !0), this.resolve();
              };
            if (this.appInits)
              for (let o = 0; o < this.appInits.length; o++) {
                const i = this.appInits[o]();
                if (Ks(i)) t.push(i);
                else if (Nf(i)) {
                  const s = new Promise((a, c) => {
                    i.subscribe({ complete: a, error: c });
                  });
                  t.push(s);
                }
              }
            Promise.all(t)
              .then(() => {
                r();
              })
              .catch((o) => {
                this.reject(o);
              }),
              0 === t.length && r(),
              (this.initialized = !0);
          }
        }
        return (
          (n.ɵfac = function (t) {
            return new (t || n)(P(Jc, 8));
          }),
          (n.ɵprov = R({ token: n, factory: n.ɵfac, providedIn: "root" })),
          n
        );
      })();
      const oa = new F("AppId", {
        providedIn: "root",
        factory: function eC() {
          return `${oh()}${oh()}${oh()}`;
        },
      });
      function oh() {
        return String.fromCharCode(97 + Math.floor(25 * Math.random()));
      }
      const tC = new F("Platform Initializer"),
        el = new F("Platform ID", {
          providedIn: "platform",
          factory: () => "unknown",
        }),
        nC = new F("appBootstrapListener"),
        tl = new F("AnimationModuleType");
      let DI = (() => {
        class n {
          log(t) {
            console.log(t);
          }
          warn(t) {
            console.warn(t);
          }
        }
        return (
          (n.ɵfac = function (t) {
            return new (t || n)();
          }),
          (n.ɵprov = R({ token: n, factory: n.ɵfac, providedIn: "platform" })),
          n
        );
      })();
      const yr = new F("LocaleId", {
        providedIn: "root",
        factory: () =>
          Qe(yr, z.Optional | z.SkipSelf) ||
          (function EI() {
            return (typeof $localize < "u" && $localize.locale) || Wi;
          })(),
      });
      class PI {
        constructor(e, t) {
          (this.ngModuleFactory = e), (this.componentFactories = t);
        }
      }
      let ih = (() => {
        class n {
          compileModuleSync(t) {
            return new Hf(t);
          }
          compileModuleAsync(t) {
            return Promise.resolve(this.compileModuleSync(t));
          }
          compileModuleAndAllComponentsSync(t) {
            const r = this.compileModuleSync(t),
              i = jr(pn(t).declarations).reduce((s, a) => {
                const c = Ie(a);
                return c && s.push(new Gs(c)), s;
              }, []);
            return new PI(r, i);
          }
          compileModuleAndAllComponentsAsync(t) {
            return Promise.resolve(this.compileModuleAndAllComponentsSync(t));
          }
          clearCache() {}
          clearCacheFor(t) {}
          getModuleId(t) {}
        }
        return (
          (n.ɵfac = function (t) {
            return new (t || n)();
          }),
          (n.ɵprov = R({ token: n, factory: n.ɵfac, providedIn: "root" })),
          n
        );
      })();
      const AI = (() => Promise.resolve(0))();
      function sh(n) {
        typeof Zone > "u"
          ? AI.then(() => {
              n && n.apply(null, null);
            })
          : Zone.current.scheduleMicroTask("scheduleMicrotask", n);
      }
      class Ge {
        constructor({
          enableLongStackTrace: e = !1,
          shouldCoalesceEventChangeDetection: t = !1,
          shouldCoalesceRunChangeDetection: r = !1,
        }) {
          if (
            ((this.hasPendingMacrotasks = !1),
            (this.hasPendingMicrotasks = !1),
            (this.isStable = !0),
            (this.onUnstable = new it(!1)),
            (this.onMicrotaskEmpty = new it(!1)),
            (this.onStable = new it(!1)),
            (this.onError = new it(!1)),
            typeof Zone > "u")
          )
            throw new M(908, !1);
          Zone.assertZonePatched();
          const o = this;
          if (
            ((o._nesting = 0),
            (o._outer = o._inner = Zone.current),
            Zone.AsyncStackTaggingZoneSpec)
          ) {
            const i = Zone.AsyncStackTaggingZoneSpec;
            o._inner = o._inner.fork(new i("Angular"));
          }
          Zone.TaskTrackingZoneSpec &&
            (o._inner = o._inner.fork(new Zone.TaskTrackingZoneSpec())),
            e &&
              Zone.longStackTraceZoneSpec &&
              (o._inner = o._inner.fork(Zone.longStackTraceZoneSpec)),
            (o.shouldCoalesceEventChangeDetection = !r && t),
            (o.shouldCoalesceRunChangeDetection = r),
            (o.lastRequestAnimationFrameId = -1),
            (o.nativeRequestAnimationFrame = (function TI() {
              let n = Ve.requestAnimationFrame,
                e = Ve.cancelAnimationFrame;
              if (typeof Zone < "u" && n && e) {
                const t = n[Zone.__symbol__("OriginalDelegate")];
                t && (n = t);
                const r = e[Zone.__symbol__("OriginalDelegate")];
                r && (e = r);
              }
              return {
                nativeRequestAnimationFrame: n,
                nativeCancelAnimationFrame: e,
              };
            })().nativeRequestAnimationFrame),
            (function NI(n) {
              const e = () => {
                !(function kI(n) {
                  n.isCheckStableRunning ||
                    -1 !== n.lastRequestAnimationFrameId ||
                    ((n.lastRequestAnimationFrameId =
                      n.nativeRequestAnimationFrame.call(Ve, () => {
                        n.fakeTopEventTask ||
                          (n.fakeTopEventTask = Zone.root.scheduleEventTask(
                            "fakeTopEventTask",
                            () => {
                              (n.lastRequestAnimationFrameId = -1),
                                ch(n),
                                (n.isCheckStableRunning = !0),
                                ah(n),
                                (n.isCheckStableRunning = !1);
                            },
                            void 0,
                            () => {},
                            () => {}
                          )),
                          n.fakeTopEventTask.invoke();
                      })),
                    ch(n));
                })(n);
              };
              n._inner = n._inner.fork({
                name: "angular",
                properties: { isAngularZone: !0 },
                onInvokeTask: (t, r, o, i, s, a) => {
                  try {
                    return iC(n), t.invokeTask(o, i, s, a);
                  } finally {
                    ((n.shouldCoalesceEventChangeDetection &&
                      "eventTask" === i.type) ||
                      n.shouldCoalesceRunChangeDetection) &&
                      e(),
                      sC(n);
                  }
                },
                onInvoke: (t, r, o, i, s, a, c) => {
                  try {
                    return iC(n), t.invoke(o, i, s, a, c);
                  } finally {
                    n.shouldCoalesceRunChangeDetection && e(), sC(n);
                  }
                },
                onHasTask: (t, r, o, i) => {
                  t.hasTask(o, i),
                    r === o &&
                      ("microTask" == i.change
                        ? ((n._hasPendingMicrotasks = i.microTask),
                          ch(n),
                          ah(n))
                        : "macroTask" == i.change &&
                          (n.hasPendingMacrotasks = i.macroTask));
                },
                onHandleError: (t, r, o, i) => (
                  t.handleError(o, i),
                  n.runOutsideAngular(() => n.onError.emit(i)),
                  !1
                ),
              });
            })(o);
        }
        static isInAngularZone() {
          return typeof Zone < "u" && !0 === Zone.current.get("isAngularZone");
        }
        static assertInAngularZone() {
          if (!Ge.isInAngularZone()) throw new M(909, !1);
        }
        static assertNotInAngularZone() {
          if (Ge.isInAngularZone()) throw new M(909, !1);
        }
        run(e, t, r) {
          return this._inner.run(e, t, r);
        }
        runTask(e, t, r, o) {
          const i = this._inner,
            s = i.scheduleEventTask("NgZoneEvent: " + o, e, II, Yc, Yc);
          try {
            return i.runTask(s, t, r);
          } finally {
            i.cancelTask(s);
          }
        }
        runGuarded(e, t, r) {
          return this._inner.runGuarded(e, t, r);
        }
        runOutsideAngular(e) {
          return this._outer.run(e);
        }
      }
      const II = {};
      function ah(n) {
        if (0 == n._nesting && !n.hasPendingMicrotasks && !n.isStable)
          try {
            n._nesting++, n.onMicrotaskEmpty.emit(null);
          } finally {
            if ((n._nesting--, !n.hasPendingMicrotasks))
              try {
                n.runOutsideAngular(() => n.onStable.emit(null));
              } finally {
                n.isStable = !0;
              }
          }
      }
      function ch(n) {
        n.hasPendingMicrotasks = !!(
          n._hasPendingMicrotasks ||
          ((n.shouldCoalesceEventChangeDetection ||
            n.shouldCoalesceRunChangeDetection) &&
            -1 !== n.lastRequestAnimationFrameId)
        );
      }
      function iC(n) {
        n._nesting++,
          n.isStable && ((n.isStable = !1), n.onUnstable.emit(null));
      }
      function sC(n) {
        n._nesting--, ah(n);
      }
      class RI {
        constructor() {
          (this.hasPendingMicrotasks = !1),
            (this.hasPendingMacrotasks = !1),
            (this.isStable = !0),
            (this.onUnstable = new it()),
            (this.onMicrotaskEmpty = new it()),
            (this.onStable = new it()),
            (this.onError = new it());
        }
        run(e, t, r) {
          return e.apply(t, r);
        }
        runGuarded(e, t, r) {
          return e.apply(t, r);
        }
        runOutsideAngular(e) {
          return e();
        }
        runTask(e, t, r, o) {
          return e.apply(t, r);
        }
      }
      const aC = new F(""),
        nl = new F("");
      let dh,
        lh = (() => {
          class n {
            constructor(t, r, o) {
              (this._ngZone = t),
                (this.registry = r),
                (this._pendingCount = 0),
                (this._isZoneStable = !0),
                (this._didWork = !1),
                (this._callbacks = []),
                (this.taskTrackingZone = null),
                dh ||
                  ((function FI(n) {
                    dh = n;
                  })(o),
                  o.addToWindow(r)),
                this._watchAngularEvents(),
                t.run(() => {
                  this.taskTrackingZone =
                    typeof Zone > "u"
                      ? null
                      : Zone.current.get("TaskTrackingZone");
                });
            }
            _watchAngularEvents() {
              this._ngZone.onUnstable.subscribe({
                next: () => {
                  (this._didWork = !0), (this._isZoneStable = !1);
                },
              }),
                this._ngZone.runOutsideAngular(() => {
                  this._ngZone.onStable.subscribe({
                    next: () => {
                      Ge.assertNotInAngularZone(),
                        sh(() => {
                          (this._isZoneStable = !0),
                            this._runCallbacksIfReady();
                        });
                    },
                  });
                });
            }
            increasePendingRequestCount() {
              return (
                (this._pendingCount += 1),
                (this._didWork = !0),
                this._pendingCount
              );
            }
            decreasePendingRequestCount() {
              if (((this._pendingCount -= 1), this._pendingCount < 0))
                throw new Error("pending async requests below zero");
              return this._runCallbacksIfReady(), this._pendingCount;
            }
            isStable() {
              return (
                this._isZoneStable &&
                0 === this._pendingCount &&
                !this._ngZone.hasPendingMacrotasks
              );
            }
            _runCallbacksIfReady() {
              if (this.isStable())
                sh(() => {
                  for (; 0 !== this._callbacks.length; ) {
                    let t = this._callbacks.pop();
                    clearTimeout(t.timeoutId), t.doneCb(this._didWork);
                  }
                  this._didWork = !1;
                });
              else {
                let t = this.getPendingTasks();
                (this._callbacks = this._callbacks.filter(
                  (r) =>
                    !r.updateCb ||
                    !r.updateCb(t) ||
                    (clearTimeout(r.timeoutId), !1)
                )),
                  (this._didWork = !0);
              }
            }
            getPendingTasks() {
              return this.taskTrackingZone
                ? this.taskTrackingZone.macroTasks.map((t) => ({
                    source: t.source,
                    creationLocation: t.creationLocation,
                    data: t.data,
                  }))
                : [];
            }
            addCallback(t, r, o) {
              let i = -1;
              r &&
                r > 0 &&
                (i = setTimeout(() => {
                  (this._callbacks = this._callbacks.filter(
                    (s) => s.timeoutId !== i
                  )),
                    t(this._didWork, this.getPendingTasks());
                }, r)),
                this._callbacks.push({ doneCb: t, timeoutId: i, updateCb: o });
            }
            whenStable(t, r, o) {
              if (o && !this.taskTrackingZone)
                throw new Error(
                  'Task tracking zone is required when passing an update callback to whenStable(). Is "zone.js/plugins/task-tracking" loaded?'
                );
              this.addCallback(t, r, o), this._runCallbacksIfReady();
            }
            getPendingRequestCount() {
              return this._pendingCount;
            }
            registerApplication(t) {
              this.registry.registerApplication(t, this);
            }
            unregisterApplication(t) {
              this.registry.unregisterApplication(t);
            }
            findProviders(t, r, o) {
              return [];
            }
          }
          return (
            (n.ɵfac = function (t) {
              return new (t || n)(P(Ge), P(uh), P(nl));
            }),
            (n.ɵprov = R({ token: n, factory: n.ɵfac })),
            n
          );
        })(),
        uh = (() => {
          class n {
            constructor() {
              this._applications = new Map();
            }
            registerApplication(t, r) {
              this._applications.set(t, r);
            }
            unregisterApplication(t) {
              this._applications.delete(t);
            }
            unregisterAllApplications() {
              this._applications.clear();
            }
            getTestability(t) {
              return this._applications.get(t) || null;
            }
            getAllTestabilities() {
              return Array.from(this._applications.values());
            }
            getAllRootElements() {
              return Array.from(this._applications.keys());
            }
            findTestabilityInTree(t, r = !0) {
              return dh?.findTestabilityInTree(this, t, r) ?? null;
            }
          }
          return (
            (n.ɵfac = function (t) {
              return new (t || n)();
            }),
            (n.ɵprov = R({
              token: n,
              factory: n.ɵfac,
              providedIn: "platform",
            })),
            n
          );
        })(),
        fo = null;
      const cC = new F("AllowMultipleToken"),
        fh = new F("PlatformDestroyListeners");
      class lC {
        constructor(e, t) {
          (this.name = e), (this.token = t);
        }
      }
      function dC(n, e, t = []) {
        const r = `Platform: ${e}`,
          o = new F(r);
        return (i = []) => {
          let s = hh();
          if (!s || s.injector.get(cC, !1)) {
            const a = [...t, ...i, { provide: o, useValue: !0 }];
            n
              ? n(a)
              : (function BI(n) {
                  if (fo && !fo.get(cC, !1)) throw new M(400, !1);
                  fo = n;
                  const e = n.get(hC);
                  (function uC(n) {
                    const e = n.get(tC, null);
                    e && e.forEach((t) => t());
                  })(n);
                })(
                  (function fC(n = [], e) {
                    return vn.create({
                      name: e,
                      providers: [
                        { provide: Ad, useValue: "platform" },
                        { provide: fh, useValue: new Set([() => (fo = null)]) },
                        ...n,
                      ],
                    });
                  })(a, r)
                );
          }
          return (function UI(n) {
            const e = hh();
            if (!e) throw new M(401, !1);
            return e;
          })();
        };
      }
      function hh() {
        return fo?.get(hC) ?? null;
      }
      let hC = (() => {
        class n {
          constructor(t) {
            (this._injector = t),
              (this._modules = []),
              (this._destroyListeners = []),
              (this._destroyed = !1);
          }
          bootstrapModuleFactory(t, r) {
            const o = (function gC(n, e) {
                let t;
                return (
                  (t =
                    "noop" === n
                      ? new RI()
                      : ("zone.js" === n ? void 0 : n) || new Ge(e)),
                  t
                );
              })(
                r?.ngZone,
                (function pC(n) {
                  return {
                    enableLongStackTrace: !1,
                    shouldCoalesceEventChangeDetection:
                      !(!n || !n.ngZoneEventCoalescing) || !1,
                    shouldCoalesceRunChangeDetection:
                      !(!n || !n.ngZoneRunCoalescing) || !1,
                  };
                })(r)
              ),
              i = [{ provide: Ge, useValue: o }];
            return o.run(() => {
              const s = vn.create({
                  providers: i,
                  parent: this.injector,
                  name: t.moduleType.name,
                }),
                a = t.create(s),
                c = a.injector.get(xi, null);
              if (!c) throw new M(402, !1);
              return (
                o.runOutsideAngular(() => {
                  const l = o.onError.subscribe({
                    next: (u) => {
                      c.handleError(u);
                    },
                  });
                  a.onDestroy(() => {
                    rl(this._modules, a), l.unsubscribe();
                  });
                }),
                (function mC(n, e, t) {
                  try {
                    const r = t();
                    return Ks(r)
                      ? r.catch((o) => {
                          throw (
                            (e.runOutsideAngular(() => n.handleError(o)), o)
                          );
                        })
                      : r;
                  } catch (r) {
                    throw (e.runOutsideAngular(() => n.handleError(r)), r);
                  }
                })(c, o, () => {
                  const l = a.injector.get(Xc);
                  return (
                    l.runInitializers(),
                    l.donePromise.then(
                      () => (
                        (function Vv(n) {
                          hn(n, "Expected localeId to be defined"),
                            "string" == typeof n &&
                              (Lv = n.toLowerCase().replace(/_/g, "-"));
                        })(a.injector.get(yr, Wi) || Wi),
                        this._moduleDoBootstrap(a),
                        a
                      )
                    )
                  );
                })
              );
            });
          }
          bootstrapModule(t, r = []) {
            const o = _C({}, r);
            return (function LI(n, e, t) {
              const r = new Hf(t);
              return Promise.resolve(r);
            })(0, 0, t).then((i) => this.bootstrapModuleFactory(i, o));
          }
          _moduleDoBootstrap(t) {
            const r = t.injector.get(ia);
            if (t._bootstrapComponents.length > 0)
              t._bootstrapComponents.forEach((o) => r.bootstrap(o));
            else {
              if (!t.instance.ngDoBootstrap) throw new M(403, !1);
              t.instance.ngDoBootstrap(r);
            }
            this._modules.push(t);
          }
          onDestroy(t) {
            this._destroyListeners.push(t);
          }
          get injector() {
            return this._injector;
          }
          destroy() {
            if (this._destroyed) throw new M(404, !1);
            this._modules.slice().forEach((r) => r.destroy()),
              this._destroyListeners.forEach((r) => r());
            const t = this._injector.get(fh, null);
            t && (t.forEach((r) => r()), t.clear()), (this._destroyed = !0);
          }
          get destroyed() {
            return this._destroyed;
          }
        }
        return (
          (n.ɵfac = function (t) {
            return new (t || n)(P(vn));
          }),
          (n.ɵprov = R({ token: n, factory: n.ɵfac, providedIn: "platform" })),
          n
        );
      })();
      function _C(n, e) {
        return Array.isArray(e) ? e.reduce(_C, n) : { ...n, ...e };
      }
      let ia = (() => {
        class n {
          constructor(t, r, o) {
            (this._zone = t),
              (this._injector = r),
              (this._exceptionHandler = o),
              (this._bootstrapListeners = []),
              (this._views = []),
              (this._runningTick = !1),
              (this._stable = !0),
              (this._destroyed = !1),
              (this._destroyListeners = []),
              (this.componentTypes = []),
              (this.components = []),
              (this._onMicrotaskEmptySubscription =
                this._zone.onMicrotaskEmpty.subscribe({
                  next: () => {
                    this._zone.run(() => {
                      this.tick();
                    });
                  },
                }));
            const i = new Re((a) => {
                (this._stable =
                  this._zone.isStable &&
                  !this._zone.hasPendingMacrotasks &&
                  !this._zone.hasPendingMicrotasks),
                  this._zone.runOutsideAngular(() => {
                    a.next(this._stable), a.complete();
                  });
              }),
              s = new Re((a) => {
                let c;
                this._zone.runOutsideAngular(() => {
                  c = this._zone.onStable.subscribe(() => {
                    Ge.assertNotInAngularZone(),
                      sh(() => {
                        !this._stable &&
                          !this._zone.hasPendingMacrotasks &&
                          !this._zone.hasPendingMicrotasks &&
                          ((this._stable = !0), a.next(!0));
                      });
                  });
                });
                const l = this._zone.onUnstable.subscribe(() => {
                  Ge.assertInAngularZone(),
                    this._stable &&
                      ((this._stable = !1),
                      this._zone.runOutsideAngular(() => {
                        a.next(!1);
                      }));
                });
                return () => {
                  c.unsubscribe(), l.unsubscribe();
                };
              });
            this.isStable = (function zD(...n) {
              const e = ps(n),
                t = (function LD(n, e) {
                  return "number" == typeof Nu(n) ? n.pop() : e;
                })(n, 1 / 0),
                r = n;
              return r.length
                ? 1 === r.length
                  ? An(r[0])
                  : si(t)(dt(r, e))
                : kr;
            })(
              i,
              s.pipe(
                (function GD(n = {}) {
                  const {
                    connector: e = () => new We(),
                    resetOnError: t = !0,
                    resetOnComplete: r = !0,
                    resetOnRefCountZero: o = !0,
                  } = n;
                  return (i) => {
                    let s,
                      a,
                      c,
                      l = 0,
                      u = !1,
                      d = !1;
                    const f = () => {
                        a?.unsubscribe(), (a = void 0);
                      },
                      h = () => {
                        f(), (s = c = void 0), (u = d = !1);
                      },
                      p = () => {
                        const m = s;
                        h(), m?.unsubscribe();
                      };
                    return ae((m, y) => {
                      l++, !d && !u && f();
                      const C = (c = c ?? e());
                      y.add(() => {
                        l--, 0 === l && !d && !u && (a = Ru(p, o));
                      }),
                        C.subscribe(y),
                        !s &&
                          l > 0 &&
                          ((s = new B({
                            next: (O) => C.next(O),
                            error: (O) => {
                              (d = !0), f(), (a = Ru(h, t, O)), C.error(O);
                            },
                            complete: () => {
                              (u = !0), f(), (a = Ru(h, r)), C.complete();
                            },
                          })),
                          An(m).subscribe(s));
                    })(i);
                  };
                })()
              )
            );
          }
          get destroyed() {
            return this._destroyed;
          }
          get injector() {
            return this._injector;
          }
          bootstrap(t, r) {
            const o = t instanceof c_;
            if (!this._injector.get(Xc).done)
              throw (
                (!o &&
                  (function ci(n) {
                    const e = Ie(n) || Kt(n) || Qt(n);
                    return null !== e && e.standalone;
                  })(t),
                new M(405, false))
              );
            let s;
            (s = o ? t : this._injector.get(Vs).resolveComponentFactory(t)),
              this.componentTypes.push(s.componentType);
            const a = (function VI(n) {
                return n.isBoundToModule;
              })(s)
                ? void 0
                : this._injector.get(jo),
              l = s.create(vn.NULL, [], r || s.selector, a),
              u = l.location.nativeElement,
              d = l.injector.get(aC, null);
            return (
              d?.registerApplication(u),
              l.onDestroy(() => {
                this.detachView(l.hostView),
                  rl(this.components, l),
                  d?.unregisterApplication(u);
              }),
              this._loadComponent(l),
              l
            );
          }
          tick() {
            if (this._runningTick) throw new M(101, !1);
            try {
              this._runningTick = !0;
              for (let t of this._views) t.detectChanges();
            } catch (t) {
              this._zone.runOutsideAngular(() =>
                this._exceptionHandler.handleError(t)
              );
            } finally {
              this._runningTick = !1;
            }
          }
          attachView(t) {
            const r = t;
            this._views.push(r), r.attachToAppRef(this);
          }
          detachView(t) {
            const r = t;
            rl(this._views, r), r.detachFromAppRef();
          }
          _loadComponent(t) {
            this.attachView(t.hostView),
              this.tick(),
              this.components.push(t),
              this._injector
                .get(nC, [])
                .concat(this._bootstrapListeners)
                .forEach((o) => o(t));
          }
          ngOnDestroy() {
            if (!this._destroyed)
              try {
                this._destroyListeners.forEach((t) => t()),
                  this._views.slice().forEach((t) => t.destroy()),
                  this._onMicrotaskEmptySubscription.unsubscribe();
              } finally {
                (this._destroyed = !0),
                  (this._views = []),
                  (this._bootstrapListeners = []),
                  (this._destroyListeners = []);
              }
          }
          onDestroy(t) {
            return (
              this._destroyListeners.push(t),
              () => rl(this._destroyListeners, t)
            );
          }
          destroy() {
            if (this._destroyed) throw new M(406, !1);
            const t = this._injector;
            t.destroy && !t.destroyed && t.destroy();
          }
          get viewCount() {
            return this._views.length;
          }
          warnIfDestroyed() {}
        }
        return (
          (n.ɵfac = function (t) {
            return new (t || n)(P(Ge), P(co), P(xi));
          }),
          (n.ɵprov = R({ token: n, factory: n.ɵfac, providedIn: "root" })),
          n
        );
      })();
      function rl(n, e) {
        const t = n.indexOf(e);
        t > -1 && n.splice(t, 1);
      }
      let vC = !0,
        ol = (() => {
          class n {}
          return (n.__NG_ELEMENT_ID__ = zI), n;
        })();
      function zI(n) {
        return (function GI(n, e, t) {
          if (ec(n) && !t) {
            const r = mn(n.index, e);
            return new zs(r, r);
          }
          return 47 & n.type ? new zs(e[16], e) : null;
        })(vt(), D(), 16 == (16 & n));
      }
      class DC {
        constructor() {}
        supports(e) {
          return Ws(e);
        }
        create(e) {
          return new YI(e);
        }
      }
      const ZI = (n, e) => e;
      class YI {
        constructor(e) {
          (this.length = 0),
            (this._linkedRecords = null),
            (this._unlinkedRecords = null),
            (this._previousItHead = null),
            (this._itHead = null),
            (this._itTail = null),
            (this._additionsHead = null),
            (this._additionsTail = null),
            (this._movesHead = null),
            (this._movesTail = null),
            (this._removalsHead = null),
            (this._removalsTail = null),
            (this._identityChangesHead = null),
            (this._identityChangesTail = null),
            (this._trackByFn = e || ZI);
        }
        forEachItem(e) {
          let t;
          for (t = this._itHead; null !== t; t = t._next) e(t);
        }
        forEachOperation(e) {
          let t = this._itHead,
            r = this._removalsHead,
            o = 0,
            i = null;
          for (; t || r; ) {
            const s = !r || (t && t.currentIndex < OC(r, o, i)) ? t : r,
              a = OC(s, o, i),
              c = s.currentIndex;
            if (s === r) o--, (r = r._nextRemoved);
            else if (((t = t._next), null == s.previousIndex)) o++;
            else {
              i || (i = []);
              const l = a - o,
                u = c - o;
              if (l != u) {
                for (let f = 0; f < l; f++) {
                  const h = f < i.length ? i[f] : (i[f] = 0),
                    p = h + f;
                  u <= p && p < l && (i[f] = h + 1);
                }
                i[s.previousIndex] = u - l;
              }
            }
            a !== c && e(s, a, c);
          }
        }
        forEachPreviousItem(e) {
          let t;
          for (t = this._previousItHead; null !== t; t = t._nextPrevious) e(t);
        }
        forEachAddedItem(e) {
          let t;
          for (t = this._additionsHead; null !== t; t = t._nextAdded) e(t);
        }
        forEachMovedItem(e) {
          let t;
          for (t = this._movesHead; null !== t; t = t._nextMoved) e(t);
        }
        forEachRemovedItem(e) {
          let t;
          for (t = this._removalsHead; null !== t; t = t._nextRemoved) e(t);
        }
        forEachIdentityChange(e) {
          let t;
          for (
            t = this._identityChangesHead;
            null !== t;
            t = t._nextIdentityChange
          )
            e(t);
        }
        diff(e) {
          if ((null == e && (e = []), !Ws(e))) throw new M(900, !1);
          return this.check(e) ? this : null;
        }
        onDestroy() {}
        check(e) {
          this._reset();
          let o,
            i,
            s,
            t = this._itHead,
            r = !1;
          if (Array.isArray(e)) {
            this.length = e.length;
            for (let a = 0; a < this.length; a++)
              (i = e[a]),
                (s = this._trackByFn(a, i)),
                null !== t && Object.is(t.trackById, s)
                  ? (r && (t = this._verifyReinsertion(t, i, s, a)),
                    Object.is(t.item, i) || this._addIdentityChange(t, i))
                  : ((t = this._mismatch(t, i, s, a)), (r = !0)),
                (t = t._next);
          } else
            (o = 0),
              (function TS(n, e) {
                if (Array.isArray(n))
                  for (let t = 0; t < n.length; t++) e(n[t]);
                else {
                  const t = n[Fo()]();
                  let r;
                  for (; !(r = t.next()).done; ) e(r.value);
                }
              })(e, (a) => {
                (s = this._trackByFn(o, a)),
                  null !== t && Object.is(t.trackById, s)
                    ? (r && (t = this._verifyReinsertion(t, a, s, o)),
                      Object.is(t.item, a) || this._addIdentityChange(t, a))
                    : ((t = this._mismatch(t, a, s, o)), (r = !0)),
                  (t = t._next),
                  o++;
              }),
              (this.length = o);
          return this._truncate(t), (this.collection = e), this.isDirty;
        }
        get isDirty() {
          return (
            null !== this._additionsHead ||
            null !== this._movesHead ||
            null !== this._removalsHead ||
            null !== this._identityChangesHead
          );
        }
        _reset() {
          if (this.isDirty) {
            let e;
            for (
              e = this._previousItHead = this._itHead;
              null !== e;
              e = e._next
            )
              e._nextPrevious = e._next;
            for (e = this._additionsHead; null !== e; e = e._nextAdded)
              e.previousIndex = e.currentIndex;
            for (
              this._additionsHead = this._additionsTail = null,
                e = this._movesHead;
              null !== e;
              e = e._nextMoved
            )
              e.previousIndex = e.currentIndex;
            (this._movesHead = this._movesTail = null),
              (this._removalsHead = this._removalsTail = null),
              (this._identityChangesHead = this._identityChangesTail = null);
          }
        }
        _mismatch(e, t, r, o) {
          let i;
          return (
            null === e ? (i = this._itTail) : ((i = e._prev), this._remove(e)),
            null !==
            (e =
              null === this._unlinkedRecords
                ? null
                : this._unlinkedRecords.get(r, null))
              ? (Object.is(e.item, t) || this._addIdentityChange(e, t),
                this._reinsertAfter(e, i, o))
              : null !==
                (e =
                  null === this._linkedRecords
                    ? null
                    : this._linkedRecords.get(r, o))
              ? (Object.is(e.item, t) || this._addIdentityChange(e, t),
                this._moveAfter(e, i, o))
              : (e = this._addAfter(new JI(t, r), i, o)),
            e
          );
        }
        _verifyReinsertion(e, t, r, o) {
          let i =
            null === this._unlinkedRecords
              ? null
              : this._unlinkedRecords.get(r, null);
          return (
            null !== i
              ? (e = this._reinsertAfter(i, e._prev, o))
              : e.currentIndex != o &&
                ((e.currentIndex = o), this._addToMoves(e, o)),
            e
          );
        }
        _truncate(e) {
          for (; null !== e; ) {
            const t = e._next;
            this._addToRemovals(this._unlink(e)), (e = t);
          }
          null !== this._unlinkedRecords && this._unlinkedRecords.clear(),
            null !== this._additionsTail &&
              (this._additionsTail._nextAdded = null),
            null !== this._movesTail && (this._movesTail._nextMoved = null),
            null !== this._itTail && (this._itTail._next = null),
            null !== this._removalsTail &&
              (this._removalsTail._nextRemoved = null),
            null !== this._identityChangesTail &&
              (this._identityChangesTail._nextIdentityChange = null);
        }
        _reinsertAfter(e, t, r) {
          null !== this._unlinkedRecords && this._unlinkedRecords.remove(e);
          const o = e._prevRemoved,
            i = e._nextRemoved;
          return (
            null === o ? (this._removalsHead = i) : (o._nextRemoved = i),
            null === i ? (this._removalsTail = o) : (i._prevRemoved = o),
            this._insertAfter(e, t, r),
            this._addToMoves(e, r),
            e
          );
        }
        _moveAfter(e, t, r) {
          return (
            this._unlink(e),
            this._insertAfter(e, t, r),
            this._addToMoves(e, r),
            e
          );
        }
        _addAfter(e, t, r) {
          return (
            this._insertAfter(e, t, r),
            (this._additionsTail =
              null === this._additionsTail
                ? (this._additionsHead = e)
                : (this._additionsTail._nextAdded = e)),
            e
          );
        }
        _insertAfter(e, t, r) {
          const o = null === t ? this._itHead : t._next;
          return (
            (e._next = o),
            (e._prev = t),
            null === o ? (this._itTail = e) : (o._prev = e),
            null === t ? (this._itHead = e) : (t._next = e),
            null === this._linkedRecords && (this._linkedRecords = new EC()),
            this._linkedRecords.put(e),
            (e.currentIndex = r),
            e
          );
        }
        _remove(e) {
          return this._addToRemovals(this._unlink(e));
        }
        _unlink(e) {
          null !== this._linkedRecords && this._linkedRecords.remove(e);
          const t = e._prev,
            r = e._next;
          return (
            null === t ? (this._itHead = r) : (t._next = r),
            null === r ? (this._itTail = t) : (r._prev = t),
            e
          );
        }
        _addToMoves(e, t) {
          return (
            e.previousIndex === t ||
              (this._movesTail =
                null === this._movesTail
                  ? (this._movesHead = e)
                  : (this._movesTail._nextMoved = e)),
            e
          );
        }
        _addToRemovals(e) {
          return (
            null === this._unlinkedRecords &&
              (this._unlinkedRecords = new EC()),
            this._unlinkedRecords.put(e),
            (e.currentIndex = null),
            (e._nextRemoved = null),
            null === this._removalsTail
              ? ((this._removalsTail = this._removalsHead = e),
                (e._prevRemoved = null))
              : ((e._prevRemoved = this._removalsTail),
                (this._removalsTail = this._removalsTail._nextRemoved = e)),
            e
          );
        }
        _addIdentityChange(e, t) {
          return (
            (e.item = t),
            (this._identityChangesTail =
              null === this._identityChangesTail
                ? (this._identityChangesHead = e)
                : (this._identityChangesTail._nextIdentityChange = e)),
            e
          );
        }
      }
      class JI {
        constructor(e, t) {
          (this.item = e),
            (this.trackById = t),
            (this.currentIndex = null),
            (this.previousIndex = null),
            (this._nextPrevious = null),
            (this._prev = null),
            (this._next = null),
            (this._prevDup = null),
            (this._nextDup = null),
            (this._prevRemoved = null),
            (this._nextRemoved = null),
            (this._nextAdded = null),
            (this._nextMoved = null),
            (this._nextIdentityChange = null);
        }
      }
      class XI {
        constructor() {
          (this._head = null), (this._tail = null);
        }
        add(e) {
          null === this._head
            ? ((this._head = this._tail = e),
              (e._nextDup = null),
              (e._prevDup = null))
            : ((this._tail._nextDup = e),
              (e._prevDup = this._tail),
              (e._nextDup = null),
              (this._tail = e));
        }
        get(e, t) {
          let r;
          for (r = this._head; null !== r; r = r._nextDup)
            if (
              (null === t || t <= r.currentIndex) &&
              Object.is(r.trackById, e)
            )
              return r;
          return null;
        }
        remove(e) {
          const t = e._prevDup,
            r = e._nextDup;
          return (
            null === t ? (this._head = r) : (t._nextDup = r),
            null === r ? (this._tail = t) : (r._prevDup = t),
            null === this._head
          );
        }
      }
      class EC {
        constructor() {
          this.map = new Map();
        }
        put(e) {
          const t = e.trackById;
          let r = this.map.get(t);
          r || ((r = new XI()), this.map.set(t, r)), r.add(e);
        }
        get(e, t) {
          const o = this.map.get(e);
          return o ? o.get(e, t) : null;
        }
        remove(e) {
          const t = e.trackById;
          return this.map.get(t).remove(e) && this.map.delete(t), e;
        }
        get isEmpty() {
          return 0 === this.map.size;
        }
        clear() {
          this.map.clear();
        }
      }
      function OC(n, e, t) {
        const r = n.previousIndex;
        if (null === r) return r;
        let o = 0;
        return t && r < t.length && (o = t[r]), r + e + o;
      }
      class PC {
        constructor() {}
        supports(e) {
          return e instanceof Map || If(e);
        }
        create() {
          return new e2();
        }
      }
      class e2 {
        constructor() {
          (this._records = new Map()),
            (this._mapHead = null),
            (this._appendAfter = null),
            (this._previousMapHead = null),
            (this._changesHead = null),
            (this._changesTail = null),
            (this._additionsHead = null),
            (this._additionsTail = null),
            (this._removalsHead = null),
            (this._removalsTail = null);
        }
        get isDirty() {
          return (
            null !== this._additionsHead ||
            null !== this._changesHead ||
            null !== this._removalsHead
          );
        }
        forEachItem(e) {
          let t;
          for (t = this._mapHead; null !== t; t = t._next) e(t);
        }
        forEachPreviousItem(e) {
          let t;
          for (t = this._previousMapHead; null !== t; t = t._nextPrevious) e(t);
        }
        forEachChangedItem(e) {
          let t;
          for (t = this._changesHead; null !== t; t = t._nextChanged) e(t);
        }
        forEachAddedItem(e) {
          let t;
          for (t = this._additionsHead; null !== t; t = t._nextAdded) e(t);
        }
        forEachRemovedItem(e) {
          let t;
          for (t = this._removalsHead; null !== t; t = t._nextRemoved) e(t);
        }
        diff(e) {
          if (e) {
            if (!(e instanceof Map || If(e))) throw new M(900, !1);
          } else e = new Map();
          return this.check(e) ? this : null;
        }
        onDestroy() {}
        check(e) {
          this._reset();
          let t = this._mapHead;
          if (
            ((this._appendAfter = null),
            this._forEach(e, (r, o) => {
              if (t && t.key === o)
                this._maybeAddToChanges(t, r),
                  (this._appendAfter = t),
                  (t = t._next);
              else {
                const i = this._getOrCreateRecordForKey(o, r);
                t = this._insertBeforeOrAppend(t, i);
              }
            }),
            t)
          ) {
            t._prev && (t._prev._next = null), (this._removalsHead = t);
            for (let r = t; null !== r; r = r._nextRemoved)
              r === this._mapHead && (this._mapHead = null),
                this._records.delete(r.key),
                (r._nextRemoved = r._next),
                (r.previousValue = r.currentValue),
                (r.currentValue = null),
                (r._prev = null),
                (r._next = null);
          }
          return (
            this._changesTail && (this._changesTail._nextChanged = null),
            this._additionsTail && (this._additionsTail._nextAdded = null),
            this.isDirty
          );
        }
        _insertBeforeOrAppend(e, t) {
          if (e) {
            const r = e._prev;
            return (
              (t._next = e),
              (t._prev = r),
              (e._prev = t),
              r && (r._next = t),
              e === this._mapHead && (this._mapHead = t),
              (this._appendAfter = e),
              e
            );
          }
          return (
            this._appendAfter
              ? ((this._appendAfter._next = t), (t._prev = this._appendAfter))
              : (this._mapHead = t),
            (this._appendAfter = t),
            null
          );
        }
        _getOrCreateRecordForKey(e, t) {
          if (this._records.has(e)) {
            const o = this._records.get(e);
            this._maybeAddToChanges(o, t);
            const i = o._prev,
              s = o._next;
            return (
              i && (i._next = s),
              s && (s._prev = i),
              (o._next = null),
              (o._prev = null),
              o
            );
          }
          const r = new t2(e);
          return (
            this._records.set(e, r),
            (r.currentValue = t),
            this._addToAdditions(r),
            r
          );
        }
        _reset() {
          if (this.isDirty) {
            let e;
            for (
              this._previousMapHead = this._mapHead, e = this._previousMapHead;
              null !== e;
              e = e._next
            )
              e._nextPrevious = e._next;
            for (e = this._changesHead; null !== e; e = e._nextChanged)
              e.previousValue = e.currentValue;
            for (e = this._additionsHead; null != e; e = e._nextAdded)
              e.previousValue = e.currentValue;
            (this._changesHead = this._changesTail = null),
              (this._additionsHead = this._additionsTail = null),
              (this._removalsHead = null);
          }
        }
        _maybeAddToChanges(e, t) {
          Object.is(t, e.currentValue) ||
            ((e.previousValue = e.currentValue),
            (e.currentValue = t),
            this._addToChanges(e));
        }
        _addToAdditions(e) {
          null === this._additionsHead
            ? (this._additionsHead = this._additionsTail = e)
            : ((this._additionsTail._nextAdded = e), (this._additionsTail = e));
        }
        _addToChanges(e) {
          null === this._changesHead
            ? (this._changesHead = this._changesTail = e)
            : ((this._changesTail._nextChanged = e), (this._changesTail = e));
        }
        _forEach(e, t) {
          e instanceof Map
            ? e.forEach(t)
            : Object.keys(e).forEach((r) => t(e[r], r));
        }
      }
      class t2 {
        constructor(e) {
          (this.key = e),
            (this.previousValue = null),
            (this.currentValue = null),
            (this._nextPrevious = null),
            (this._next = null),
            (this._prev = null),
            (this._nextAdded = null),
            (this._nextRemoved = null),
            (this._nextChanged = null);
        }
      }
      function xC() {
        return new al([new DC()]);
      }
      let al = (() => {
        class n {
          constructor(t) {
            this.factories = t;
          }
          static create(t, r) {
            if (null != r) {
              const o = r.factories.slice();
              t = t.concat(o);
            }
            return new n(t);
          }
          static extend(t) {
            return {
              provide: n,
              useFactory: (r) => n.create(t, r || xC()),
              deps: [[n, new Is(), new Ts()]],
            };
          }
          find(t) {
            const r = this.factories.find((o) => o.supports(t));
            if (null != r) return r;
            throw new M(901, !1);
          }
        }
        return (n.ɵprov = R({ token: n, providedIn: "root", factory: xC })), n;
      })();
      function SC() {
        return new sa([new PC()]);
      }
      let sa = (() => {
        class n {
          constructor(t) {
            this.factories = t;
          }
          static create(t, r) {
            if (r) {
              const o = r.factories.slice();
              t = t.concat(o);
            }
            return new n(t);
          }
          static extend(t) {
            return {
              provide: n,
              useFactory: (r) => n.create(t, r || SC()),
              deps: [[n, new Is(), new Ts()]],
            };
          }
          find(t) {
            const r = this.factories.find((o) => o.supports(t));
            if (r) return r;
            throw new M(901, !1);
          }
        }
        return (n.ɵprov = R({ token: n, providedIn: "root", factory: SC })), n;
      })();
      const o2 = dC(null, "core", []);
      let s2 = (() => {
        class n {
          constructor(t) {}
        }
        return (
          (n.ɵfac = function (t) {
            return new (t || n)(P(ia));
          }),
          (n.ɵmod = yt({ type: n })),
          (n.ɵinj = ft({})),
          n
        );
      })();
      function Gr(n) {
        return "boolean" == typeof n ? n : null != n && "false" !== n;
      }
      let cl = null;
      function vr() {
        return cl;
      }
      const st = new F("DocumentToken");
      let yh = (() => {
        class n {
          historyGo(t) {
            throw new Error("Not implemented");
          }
        }
        return (
          (n.ɵfac = function (t) {
            return new (t || n)();
          }),
          (n.ɵprov = R({
            token: n,
            factory: function () {
              return (function u2() {
                return P(AC);
              })();
            },
            providedIn: "platform",
          })),
          n
        );
      })();
      const d2 = new F("Location Initialized");
      let AC = (() => {
        class n extends yh {
          constructor(t) {
            super(), (this._doc = t), this._init();
          }
          _init() {
            (this.location = window.location), (this._history = window.history);
          }
          getBaseHrefFromDOM() {
            return vr().getBaseHref(this._doc);
          }
          onPopState(t) {
            const r = vr().getGlobalEventTarget(this._doc, "window");
            return (
              r.addEventListener("popstate", t, !1),
              () => r.removeEventListener("popstate", t)
            );
          }
          onHashChange(t) {
            const r = vr().getGlobalEventTarget(this._doc, "window");
            return (
              r.addEventListener("hashchange", t, !1),
              () => r.removeEventListener("hashchange", t)
            );
          }
          get href() {
            return this.location.href;
          }
          get protocol() {
            return this.location.protocol;
          }
          get hostname() {
            return this.location.hostname;
          }
          get port() {
            return this.location.port;
          }
          get pathname() {
            return this.location.pathname;
          }
          get search() {
            return this.location.search;
          }
          get hash() {
            return this.location.hash;
          }
          set pathname(t) {
            this.location.pathname = t;
          }
          pushState(t, r, o) {
            TC() ? this._history.pushState(t, r, o) : (this.location.hash = o);
          }
          replaceState(t, r, o) {
            TC()
              ? this._history.replaceState(t, r, o)
              : (this.location.hash = o);
          }
          forward() {
            this._history.forward();
          }
          back() {
            this._history.back();
          }
          historyGo(t = 0) {
            this._history.go(t);
          }
          getState() {
            return this._history.state;
          }
        }
        return (
          (n.ɵfac = function (t) {
            return new (t || n)(P(st));
          }),
          (n.ɵprov = R({
            token: n,
            factory: function () {
              return (function f2() {
                return new AC(P(st));
              })();
            },
            providedIn: "platform",
          })),
          n
        );
      })();
      function TC() {
        return !!window.history.pushState;
      }
      function vh(n, e) {
        if (0 == n.length) return e;
        if (0 == e.length) return n;
        let t = 0;
        return (
          n.endsWith("/") && t++,
          e.startsWith("/") && t++,
          2 == t ? n + e.substring(1) : 1 == t ? n + e : n + "/" + e
        );
      }
      function IC(n) {
        const e = n.match(/#|\?|$/),
          t = (e && e.index) || n.length;
        return n.slice(0, t - ("/" === n[t - 1] ? 1 : 0)) + n.slice(t);
      }
      function Wr(n) {
        return n && "?" !== n[0] ? "?" + n : n;
      }
      let $o = (() => {
        class n {
          historyGo(t) {
            throw new Error("Not implemented");
          }
        }
        return (
          (n.ɵfac = function (t) {
            return new (t || n)();
          }),
          (n.ɵprov = R({
            token: n,
            factory: function () {
              return Qe(NC);
            },
            providedIn: "root",
          })),
          n
        );
      })();
      const kC = new F("appBaseHref");
      let NC = (() => {
          class n extends $o {
            constructor(t, r) {
              super(),
                (this._platformLocation = t),
                (this._removeListenerFns = []),
                (this._baseHref =
                  r ??
                  this._platformLocation.getBaseHrefFromDOM() ??
                  Qe(st).location?.origin ??
                  "");
            }
            ngOnDestroy() {
              for (; this._removeListenerFns.length; )
                this._removeListenerFns.pop()();
            }
            onPopState(t) {
              this._removeListenerFns.push(
                this._platformLocation.onPopState(t),
                this._platformLocation.onHashChange(t)
              );
            }
            getBaseHref() {
              return this._baseHref;
            }
            prepareExternalUrl(t) {
              return vh(this._baseHref, t);
            }
            path(t = !1) {
              const r =
                  this._platformLocation.pathname +
                  Wr(this._platformLocation.search),
                o = this._platformLocation.hash;
              return o && t ? `${r}${o}` : r;
            }
            pushState(t, r, o, i) {
              const s = this.prepareExternalUrl(o + Wr(i));
              this._platformLocation.pushState(t, r, s);
            }
            replaceState(t, r, o, i) {
              const s = this.prepareExternalUrl(o + Wr(i));
              this._platformLocation.replaceState(t, r, s);
            }
            forward() {
              this._platformLocation.forward();
            }
            back() {
              this._platformLocation.back();
            }
            getState() {
              return this._platformLocation.getState();
            }
            historyGo(t = 0) {
              this._platformLocation.historyGo?.(t);
            }
          }
          return (
            (n.ɵfac = function (t) {
              return new (t || n)(P(yh), P(kC, 8));
            }),
            (n.ɵprov = R({ token: n, factory: n.ɵfac, providedIn: "root" })),
            n
          );
        })(),
        h2 = (() => {
          class n extends $o {
            constructor(t, r) {
              super(),
                (this._platformLocation = t),
                (this._baseHref = ""),
                (this._removeListenerFns = []),
                null != r && (this._baseHref = r);
            }
            ngOnDestroy() {
              for (; this._removeListenerFns.length; )
                this._removeListenerFns.pop()();
            }
            onPopState(t) {
              this._removeListenerFns.push(
                this._platformLocation.onPopState(t),
                this._platformLocation.onHashChange(t)
              );
            }
            getBaseHref() {
              return this._baseHref;
            }
            path(t = !1) {
              let r = this._platformLocation.hash;
              return null == r && (r = "#"), r.length > 0 ? r.substring(1) : r;
            }
            prepareExternalUrl(t) {
              const r = vh(this._baseHref, t);
              return r.length > 0 ? "#" + r : r;
            }
            pushState(t, r, o, i) {
              let s = this.prepareExternalUrl(o + Wr(i));
              0 == s.length && (s = this._platformLocation.pathname),
                this._platformLocation.pushState(t, r, s);
            }
            replaceState(t, r, o, i) {
              let s = this.prepareExternalUrl(o + Wr(i));
              0 == s.length && (s = this._platformLocation.pathname),
                this._platformLocation.replaceState(t, r, s);
            }
            forward() {
              this._platformLocation.forward();
            }
            back() {
              this._platformLocation.back();
            }
            getState() {
              return this._platformLocation.getState();
            }
            historyGo(t = 0) {
              this._platformLocation.historyGo?.(t);
            }
          }
          return (
            (n.ɵfac = function (t) {
              return new (t || n)(P(yh), P(kC, 8));
            }),
            (n.ɵprov = R({ token: n, factory: n.ɵfac })),
            n
          );
        })(),
        Ch = (() => {
          class n {
            constructor(t) {
              (this._subject = new it()),
                (this._urlChangeListeners = []),
                (this._urlChangeSubscription = null),
                (this._locationStrategy = t);
              const r = this._locationStrategy.getBaseHref();
              (this._baseHref = IC(RC(r))),
                this._locationStrategy.onPopState((o) => {
                  this._subject.emit({
                    url: this.path(!0),
                    pop: !0,
                    state: o.state,
                    type: o.type,
                  });
                });
            }
            ngOnDestroy() {
              this._urlChangeSubscription?.unsubscribe(),
                (this._urlChangeListeners = []);
            }
            path(t = !1) {
              return this.normalize(this._locationStrategy.path(t));
            }
            getState() {
              return this._locationStrategy.getState();
            }
            isCurrentPathEqualTo(t, r = "") {
              return this.path() == this.normalize(t + Wr(r));
            }
            normalize(t) {
              return n.stripTrailingSlash(
                (function g2(n, e) {
                  return n && e.startsWith(n) ? e.substring(n.length) : e;
                })(this._baseHref, RC(t))
              );
            }
            prepareExternalUrl(t) {
              return (
                t && "/" !== t[0] && (t = "/" + t),
                this._locationStrategy.prepareExternalUrl(t)
              );
            }
            go(t, r = "", o = null) {
              this._locationStrategy.pushState(o, "", t, r),
                this._notifyUrlChangeListeners(
                  this.prepareExternalUrl(t + Wr(r)),
                  o
                );
            }
            replaceState(t, r = "", o = null) {
              this._locationStrategy.replaceState(o, "", t, r),
                this._notifyUrlChangeListeners(
                  this.prepareExternalUrl(t + Wr(r)),
                  o
                );
            }
            forward() {
              this._locationStrategy.forward();
            }
            back() {
              this._locationStrategy.back();
            }
            historyGo(t = 0) {
              this._locationStrategy.historyGo?.(t);
            }
            onUrlChange(t) {
              return (
                this._urlChangeListeners.push(t),
                this._urlChangeSubscription ||
                  (this._urlChangeSubscription = this.subscribe((r) => {
                    this._notifyUrlChangeListeners(r.url, r.state);
                  })),
                () => {
                  const r = this._urlChangeListeners.indexOf(t);
                  this._urlChangeListeners.splice(r, 1),
                    0 === this._urlChangeListeners.length &&
                      (this._urlChangeSubscription?.unsubscribe(),
                      (this._urlChangeSubscription = null));
                }
              );
            }
            _notifyUrlChangeListeners(t = "", r) {
              this._urlChangeListeners.forEach((o) => o(t, r));
            }
            subscribe(t, r, o) {
              return this._subject.subscribe({
                next: t,
                error: r,
                complete: o,
              });
            }
          }
          return (
            (n.normalizeQueryParams = Wr),
            (n.joinWithSlash = vh),
            (n.stripTrailingSlash = IC),
            (n.ɵfac = function (t) {
              return new (t || n)(P($o));
            }),
            (n.ɵprov = R({
              token: n,
              factory: function () {
                return (function p2() {
                  return new Ch(P($o));
                })();
              },
              providedIn: "root",
            })),
            n
          );
        })();
      function RC(n) {
        return n.replace(/\/index.html$/, "");
      }
      var cn = (() => (
          ((cn = cn || {})[(cn.Decimal = 0)] = "Decimal"),
          (cn[(cn.Percent = 1)] = "Percent"),
          (cn[(cn.Currency = 2)] = "Currency"),
          (cn[(cn.Scientific = 3)] = "Scientific"),
          cn
        ))(),
        ct = (() => (
          ((ct = ct || {})[(ct.Format = 0)] = "Format"),
          (ct[(ct.Standalone = 1)] = "Standalone"),
          ct
        ))(),
        _e = (() => (
          ((_e = _e || {})[(_e.Narrow = 0)] = "Narrow"),
          (_e[(_e.Abbreviated = 1)] = "Abbreviated"),
          (_e[(_e.Wide = 2)] = "Wide"),
          (_e[(_e.Short = 3)] = "Short"),
          _e
        ))(),
        et = (() => (
          ((et = et || {})[(et.Short = 0)] = "Short"),
          (et[(et.Medium = 1)] = "Medium"),
          (et[(et.Long = 2)] = "Long"),
          (et[(et.Full = 3)] = "Full"),
          et
        ))(),
        $ = (() => (
          (($ = $ || {})[($.Decimal = 0)] = "Decimal"),
          ($[($.Group = 1)] = "Group"),
          ($[($.List = 2)] = "List"),
          ($[($.PercentSign = 3)] = "PercentSign"),
          ($[($.PlusSign = 4)] = "PlusSign"),
          ($[($.MinusSign = 5)] = "MinusSign"),
          ($[($.Exponential = 6)] = "Exponential"),
          ($[($.SuperscriptingExponent = 7)] = "SuperscriptingExponent"),
          ($[($.PerMille = 8)] = "PerMille"),
          ($[($.Infinity = 9)] = "Infinity"),
          ($[($.NaN = 10)] = "NaN"),
          ($[($.TimeSeparator = 11)] = "TimeSeparator"),
          ($[($.CurrencyDecimal = 12)] = "CurrencyDecimal"),
          ($[($.CurrencyGroup = 13)] = "CurrencyGroup"),
          $
        ))();
      function ll(n, e) {
        return Bn(en(n)[T.DateFormat], e);
      }
      function ul(n, e) {
        return Bn(en(n)[T.TimeFormat], e);
      }
      function dl(n, e) {
        return Bn(en(n)[T.DateTimeFormat], e);
      }
      function Vn(n, e) {
        const t = en(n),
          r = t[T.NumberSymbols][e];
        if (typeof r > "u") {
          if (e === $.CurrencyDecimal) return t[T.NumberSymbols][$.Decimal];
          if (e === $.CurrencyGroup) return t[T.NumberSymbols][$.Group];
        }
        return r;
      }
      function LC(n) {
        if (!n[T.ExtraData])
          throw new Error(
            `Missing extra locale data for the locale "${
              n[T.LocaleId]
            }". Use "registerLocaleData" to load new data. See the "I18n guide" on angular.io to know more.`
          );
      }
      function Bn(n, e) {
        for (let t = e; t > -1; t--) if (typeof n[t] < "u") return n[t];
        throw new Error("Locale data API: locale data undefined");
      }
      function wh(n) {
        const [e, t] = n.split(":");
        return { hours: +e, minutes: +t };
      }
      const x2 =
          /^(\d{4,})-?(\d\d)-?(\d\d)(?:T(\d\d)(?::?(\d\d)(?::?(\d\d)(?:\.(\d+))?)?)?(Z|([+-])(\d\d):?(\d\d))?)?$/,
        aa = {},
        S2 =
          /((?:[^BEGHLMOSWYZabcdhmswyz']+)|(?:'(?:[^']|'')*')|(?:G{1,5}|y{1,4}|Y{1,4}|M{1,5}|L{1,5}|w{1,2}|W{1}|d{1,2}|E{1,6}|c{1,6}|a{1,5}|b{1,5}|B{1,5}|h{1,2}|H{1,2}|m{1,2}|s{1,2}|S{1,3}|z{1,4}|Z{1,5}|O{1,4}))([\s\S]*)/;
      var wt = (() => (
          ((wt = wt || {})[(wt.Short = 0)] = "Short"),
          (wt[(wt.ShortGMT = 1)] = "ShortGMT"),
          (wt[(wt.Long = 2)] = "Long"),
          (wt[(wt.Extended = 3)] = "Extended"),
          wt
        ))(),
        W = (() => (
          ((W = W || {})[(W.FullYear = 0)] = "FullYear"),
          (W[(W.Month = 1)] = "Month"),
          (W[(W.Date = 2)] = "Date"),
          (W[(W.Hours = 3)] = "Hours"),
          (W[(W.Minutes = 4)] = "Minutes"),
          (W[(W.Seconds = 5)] = "Seconds"),
          (W[(W.FractionalSeconds = 6)] = "FractionalSeconds"),
          (W[(W.Day = 7)] = "Day"),
          W
        ))(),
        ce = (() => (
          ((ce = ce || {})[(ce.DayPeriods = 0)] = "DayPeriods"),
          (ce[(ce.Days = 1)] = "Days"),
          (ce[(ce.Months = 2)] = "Months"),
          (ce[(ce.Eras = 3)] = "Eras"),
          ce
        ))();
      function A2(n, e, t, r) {
        let o = (function B2(n) {
          if (jC(n)) return n;
          if ("number" == typeof n && !isNaN(n)) return new Date(n);
          if ("string" == typeof n) {
            if (((n = n.trim()), /^(\d{4}(-\d{1,2}(-\d{1,2})?)?)$/.test(n))) {
              const [o, i = 1, s = 1] = n.split("-").map((a) => +a);
              return fl(o, i - 1, s);
            }
            const t = parseFloat(n);
            if (!isNaN(n - t)) return new Date(t);
            let r;
            if ((r = n.match(x2)))
              return (function j2(n) {
                const e = new Date(0);
                let t = 0,
                  r = 0;
                const o = n[8] ? e.setUTCFullYear : e.setFullYear,
                  i = n[8] ? e.setUTCHours : e.setHours;
                n[9] &&
                  ((t = Number(n[9] + n[10])), (r = Number(n[9] + n[11]))),
                  o.call(e, Number(n[1]), Number(n[2]) - 1, Number(n[3]));
                const s = Number(n[4] || 0) - t,
                  a = Number(n[5] || 0) - r,
                  c = Number(n[6] || 0),
                  l = Math.floor(1e3 * parseFloat("0." + (n[7] || 0)));
                return i.call(e, s, a, c, l), e;
              })(r);
          }
          const e = new Date(n);
          if (!jC(e)) throw new Error(`Unable to convert "${n}" into a date`);
          return e;
        })(n);
        e = qr(t, e) || e;
        let a,
          s = [];
        for (; e; ) {
          if (((a = S2.exec(e)), !a)) {
            s.push(e);
            break;
          }
          {
            s = s.concat(a.slice(1));
            const u = s.pop();
            if (!u) break;
            e = u;
          }
        }
        let c = o.getTimezoneOffset();
        r &&
          ((c = BC(r, c)),
          (o = (function V2(n, e, t) {
            const r = t ? -1 : 1,
              o = n.getTimezoneOffset();
            return (function L2(n, e) {
              return (
                (n = new Date(n.getTime())).setMinutes(n.getMinutes() + e), n
              );
            })(n, r * (BC(e, o) - o));
          })(o, r, !0)));
        let l = "";
        return (
          s.forEach((u) => {
            const d = (function F2(n) {
              if (Dh[n]) return Dh[n];
              let e;
              switch (n) {
                case "G":
                case "GG":
                case "GGG":
                  e = Ue(ce.Eras, _e.Abbreviated);
                  break;
                case "GGGG":
                  e = Ue(ce.Eras, _e.Wide);
                  break;
                case "GGGGG":
                  e = Ue(ce.Eras, _e.Narrow);
                  break;
                case "y":
                  e = mt(W.FullYear, 1, 0, !1, !0);
                  break;
                case "yy":
                  e = mt(W.FullYear, 2, 0, !0, !0);
                  break;
                case "yyy":
                  e = mt(W.FullYear, 3, 0, !1, !0);
                  break;
                case "yyyy":
                  e = mt(W.FullYear, 4, 0, !1, !0);
                  break;
                case "Y":
                  e = ml(1);
                  break;
                case "YY":
                  e = ml(2, !0);
                  break;
                case "YYY":
                  e = ml(3);
                  break;
                case "YYYY":
                  e = ml(4);
                  break;
                case "M":
                case "L":
                  e = mt(W.Month, 1, 1);
                  break;
                case "MM":
                case "LL":
                  e = mt(W.Month, 2, 1);
                  break;
                case "MMM":
                  e = Ue(ce.Months, _e.Abbreviated);
                  break;
                case "MMMM":
                  e = Ue(ce.Months, _e.Wide);
                  break;
                case "MMMMM":
                  e = Ue(ce.Months, _e.Narrow);
                  break;
                case "LLL":
                  e = Ue(ce.Months, _e.Abbreviated, ct.Standalone);
                  break;
                case "LLLL":
                  e = Ue(ce.Months, _e.Wide, ct.Standalone);
                  break;
                case "LLLLL":
                  e = Ue(ce.Months, _e.Narrow, ct.Standalone);
                  break;
                case "w":
                  e = Mh(1);
                  break;
                case "ww":
                  e = Mh(2);
                  break;
                case "W":
                  e = Mh(1, !0);
                  break;
                case "d":
                  e = mt(W.Date, 1);
                  break;
                case "dd":
                  e = mt(W.Date, 2);
                  break;
                case "c":
                case "cc":
                  e = mt(W.Day, 1);
                  break;
                case "ccc":
                  e = Ue(ce.Days, _e.Abbreviated, ct.Standalone);
                  break;
                case "cccc":
                  e = Ue(ce.Days, _e.Wide, ct.Standalone);
                  break;
                case "ccccc":
                  e = Ue(ce.Days, _e.Narrow, ct.Standalone);
                  break;
                case "cccccc":
                  e = Ue(ce.Days, _e.Short, ct.Standalone);
                  break;
                case "E":
                case "EE":
                case "EEE":
                  e = Ue(ce.Days, _e.Abbreviated);
                  break;
                case "EEEE":
                  e = Ue(ce.Days, _e.Wide);
                  break;
                case "EEEEE":
                  e = Ue(ce.Days, _e.Narrow);
                  break;
                case "EEEEEE":
                  e = Ue(ce.Days, _e.Short);
                  break;
                case "a":
                case "aa":
                case "aaa":
                  e = Ue(ce.DayPeriods, _e.Abbreviated);
                  break;
                case "aaaa":
                  e = Ue(ce.DayPeriods, _e.Wide);
                  break;
                case "aaaaa":
                  e = Ue(ce.DayPeriods, _e.Narrow);
                  break;
                case "b":
                case "bb":
                case "bbb":
                  e = Ue(ce.DayPeriods, _e.Abbreviated, ct.Standalone, !0);
                  break;
                case "bbbb":
                  e = Ue(ce.DayPeriods, _e.Wide, ct.Standalone, !0);
                  break;
                case "bbbbb":
                  e = Ue(ce.DayPeriods, _e.Narrow, ct.Standalone, !0);
                  break;
                case "B":
                case "BB":
                case "BBB":
                  e = Ue(ce.DayPeriods, _e.Abbreviated, ct.Format, !0);
                  break;
                case "BBBB":
                  e = Ue(ce.DayPeriods, _e.Wide, ct.Format, !0);
                  break;
                case "BBBBB":
                  e = Ue(ce.DayPeriods, _e.Narrow, ct.Format, !0);
                  break;
                case "h":
                  e = mt(W.Hours, 1, -12);
                  break;
                case "hh":
                  e = mt(W.Hours, 2, -12);
                  break;
                case "H":
                  e = mt(W.Hours, 1);
                  break;
                case "HH":
                  e = mt(W.Hours, 2);
                  break;
                case "m":
                  e = mt(W.Minutes, 1);
                  break;
                case "mm":
                  e = mt(W.Minutes, 2);
                  break;
                case "s":
                  e = mt(W.Seconds, 1);
                  break;
                case "ss":
                  e = mt(W.Seconds, 2);
                  break;
                case "S":
                  e = mt(W.FractionalSeconds, 1);
                  break;
                case "SS":
                  e = mt(W.FractionalSeconds, 2);
                  break;
                case "SSS":
                  e = mt(W.FractionalSeconds, 3);
                  break;
                case "Z":
                case "ZZ":
                case "ZZZ":
                  e = pl(wt.Short);
                  break;
                case "ZZZZZ":
                  e = pl(wt.Extended);
                  break;
                case "O":
                case "OO":
                case "OOO":
                case "z":
                case "zz":
                case "zzz":
                  e = pl(wt.ShortGMT);
                  break;
                case "OOOO":
                case "ZZZZ":
                case "zzzz":
                  e = pl(wt.Long);
                  break;
                default:
                  return null;
              }
              return (Dh[n] = e), e;
            })(u);
            l += d
              ? d(o, t, c)
              : "''" === u
              ? "'"
              : u.replace(/(^'|'$)/g, "").replace(/''/g, "'");
          }),
          l
        );
      }
      function fl(n, e, t) {
        const r = new Date(0);
        return r.setFullYear(n, e, t), r.setHours(0, 0, 0), r;
      }
      function qr(n, e) {
        const t = (function m2(n) {
          return en(n)[T.LocaleId];
        })(n);
        if (((aa[t] = aa[t] || {}), aa[t][e])) return aa[t][e];
        let r = "";
        switch (e) {
          case "shortDate":
            r = ll(n, et.Short);
            break;
          case "mediumDate":
            r = ll(n, et.Medium);
            break;
          case "longDate":
            r = ll(n, et.Long);
            break;
          case "fullDate":
            r = ll(n, et.Full);
            break;
          case "shortTime":
            r = ul(n, et.Short);
            break;
          case "mediumTime":
            r = ul(n, et.Medium);
            break;
          case "longTime":
            r = ul(n, et.Long);
            break;
          case "fullTime":
            r = ul(n, et.Full);
            break;
          case "short":
            const o = qr(n, "shortTime"),
              i = qr(n, "shortDate");
            r = hl(dl(n, et.Short), [o, i]);
            break;
          case "medium":
            const s = qr(n, "mediumTime"),
              a = qr(n, "mediumDate");
            r = hl(dl(n, et.Medium), [s, a]);
            break;
          case "long":
            const c = qr(n, "longTime"),
              l = qr(n, "longDate");
            r = hl(dl(n, et.Long), [c, l]);
            break;
          case "full":
            const u = qr(n, "fullTime"),
              d = qr(n, "fullDate");
            r = hl(dl(n, et.Full), [u, d]);
        }
        return r && (aa[t][e] = r), r;
      }
      function hl(n, e) {
        return (
          e &&
            (n = n.replace(/\{([^}]+)}/g, function (t, r) {
              return null != e && r in e ? e[r] : t;
            })),
          n
        );
      }
      function or(n, e, t = "-", r, o) {
        let i = "";
        (n < 0 || (o && n <= 0)) && (o ? (n = 1 - n) : ((n = -n), (i = t)));
        let s = String(n);
        for (; s.length < e; ) s = "0" + s;
        return r && (s = s.slice(s.length - e)), i + s;
      }
      function mt(n, e, t = 0, r = !1, o = !1) {
        return function (i, s) {
          let a = (function I2(n, e) {
            switch (n) {
              case W.FullYear:
                return e.getFullYear();
              case W.Month:
                return e.getMonth();
              case W.Date:
                return e.getDate();
              case W.Hours:
                return e.getHours();
              case W.Minutes:
                return e.getMinutes();
              case W.Seconds:
                return e.getSeconds();
              case W.FractionalSeconds:
                return e.getMilliseconds();
              case W.Day:
                return e.getDay();
              default:
                throw new Error(`Unknown DateType value "${n}".`);
            }
          })(n, i);
          if (((t > 0 || a > -t) && (a += t), n === W.Hours))
            0 === a && -12 === t && (a = 12);
          else if (n === W.FractionalSeconds)
            return (function T2(n, e) {
              return or(n, 3).substring(0, e);
            })(a, e);
          const c = Vn(s, $.MinusSign);
          return or(a, e, c, r, o);
        };
      }
      function Ue(n, e, t = ct.Format, r = !1) {
        return function (o, i) {
          return (function k2(n, e, t, r, o, i) {
            switch (t) {
              case ce.Months:
                return (function v2(n, e, t) {
                  const r = en(n),
                    i = Bn([r[T.MonthsFormat], r[T.MonthsStandalone]], e);
                  return Bn(i, t);
                })(e, o, r)[n.getMonth()];
              case ce.Days:
                return (function y2(n, e, t) {
                  const r = en(n),
                    i = Bn([r[T.DaysFormat], r[T.DaysStandalone]], e);
                  return Bn(i, t);
                })(e, o, r)[n.getDay()];
              case ce.DayPeriods:
                const s = n.getHours(),
                  a = n.getMinutes();
                if (i) {
                  const l = (function M2(n) {
                      const e = en(n);
                      return (
                        LC(e),
                        (e[T.ExtraData][2] || []).map((r) =>
                          "string" == typeof r ? wh(r) : [wh(r[0]), wh(r[1])]
                        )
                      );
                    })(e),
                    u = (function D2(n, e, t) {
                      const r = en(n);
                      LC(r);
                      const i =
                        Bn([r[T.ExtraData][0], r[T.ExtraData][1]], e) || [];
                      return Bn(i, t) || [];
                    })(e, o, r),
                    d = l.findIndex((f) => {
                      if (Array.isArray(f)) {
                        const [h, p] = f,
                          m = s >= h.hours && a >= h.minutes,
                          y = s < p.hours || (s === p.hours && a < p.minutes);
                        if (h.hours < p.hours) {
                          if (m && y) return !0;
                        } else if (m || y) return !0;
                      } else if (f.hours === s && f.minutes === a) return !0;
                      return !1;
                    });
                  if (-1 !== d) return u[d];
                }
                return (function _2(n, e, t) {
                  const r = en(n),
                    i = Bn(
                      [r[T.DayPeriodsFormat], r[T.DayPeriodsStandalone]],
                      e
                    );
                  return Bn(i, t);
                })(e, o, r)[s < 12 ? 0 : 1];
              case ce.Eras:
                return (function C2(n, e) {
                  return Bn(en(n)[T.Eras], e);
                })(e, r)[n.getFullYear() <= 0 ? 0 : 1];
              default:
                throw new Error(`unexpected translation type ${t}`);
            }
          })(o, i, n, e, t, r);
        };
      }
      function pl(n) {
        return function (e, t, r) {
          const o = -1 * r,
            i = Vn(t, $.MinusSign),
            s = o > 0 ? Math.floor(o / 60) : Math.ceil(o / 60);
          switch (n) {
            case wt.Short:
              return (
                (o >= 0 ? "+" : "") + or(s, 2, i) + or(Math.abs(o % 60), 2, i)
              );
            case wt.ShortGMT:
              return "GMT" + (o >= 0 ? "+" : "") + or(s, 1, i);
            case wt.Long:
              return (
                "GMT" +
                (o >= 0 ? "+" : "") +
                or(s, 2, i) +
                ":" +
                or(Math.abs(o % 60), 2, i)
              );
            case wt.Extended:
              return 0 === r
                ? "Z"
                : (o >= 0 ? "+" : "") +
                    or(s, 2, i) +
                    ":" +
                    or(Math.abs(o % 60), 2, i);
            default:
              throw new Error(`Unknown zone width "${n}"`);
          }
        };
      }
      function VC(n) {
        return fl(
          n.getFullYear(),
          n.getMonth(),
          n.getDate() + (4 - n.getDay())
        );
      }
      function Mh(n, e = !1) {
        return function (t, r) {
          let o;
          if (e) {
            const i = new Date(t.getFullYear(), t.getMonth(), 1).getDay() - 1,
              s = t.getDate();
            o = 1 + Math.floor((s + i) / 7);
          } else {
            const i = VC(t),
              s = (function R2(n) {
                const e = fl(n, 0, 1).getDay();
                return fl(n, 0, 1 + (e <= 4 ? 4 : 11) - e);
              })(i.getFullYear()),
              a = i.getTime() - s.getTime();
            o = 1 + Math.round(a / 6048e5);
          }
          return or(o, n, Vn(r, $.MinusSign));
        };
      }
      function ml(n, e = !1) {
        return function (t, r) {
          return or(VC(t).getFullYear(), n, Vn(r, $.MinusSign), e);
        };
      }
      const Dh = {};
      function BC(n, e) {
        n = n.replace(/:/g, "");
        const t = Date.parse("Jan 01, 1970 00:00:00 " + n) / 6e4;
        return isNaN(t) ? e : t;
      }
      function jC(n) {
        return n instanceof Date && !isNaN(n.valueOf());
      }
      const U2 = /^(\d+)?\.((\d+)(-(\d+))?)?$/;
      function xh(n) {
        const e = parseInt(n);
        if (isNaN(e))
          throw new Error("Invalid integer literal when parsing " + n);
        return e;
      }
      function zC(n, e) {
        e = encodeURIComponent(e);
        for (const t of n.split(";")) {
          const r = t.indexOf("="),
            [o, i] = -1 == r ? [t, ""] : [t.slice(0, r), t.slice(r + 1)];
          if (o.trim() === e) return decodeURIComponent(i);
        }
        return null;
      }
      let la = (() => {
        class n {
          constructor(t, r, o, i) {
            (this._iterableDiffers = t),
              (this._keyValueDiffers = r),
              (this._ngEl = o),
              (this._renderer = i),
              (this._iterableDiffer = null),
              (this._keyValueDiffer = null),
              (this._initialClasses = []),
              (this._rawClass = null);
          }
          set klass(t) {
            this._removeClasses(this._initialClasses),
              (this._initialClasses =
                "string" == typeof t ? t.split(/\s+/) : []),
              this._applyClasses(this._initialClasses),
              this._applyClasses(this._rawClass);
          }
          set ngClass(t) {
            this._removeClasses(this._rawClass),
              this._applyClasses(this._initialClasses),
              (this._iterableDiffer = null),
              (this._keyValueDiffer = null),
              (this._rawClass = "string" == typeof t ? t.split(/\s+/) : t),
              this._rawClass &&
                (Ws(this._rawClass)
                  ? (this._iterableDiffer = this._iterableDiffers
                      .find(this._rawClass)
                      .create())
                  : (this._keyValueDiffer = this._keyValueDiffers
                      .find(this._rawClass)
                      .create()));
          }
          ngDoCheck() {
            if (this._iterableDiffer) {
              const t = this._iterableDiffer.diff(this._rawClass);
              t && this._applyIterableChanges(t);
            } else if (this._keyValueDiffer) {
              const t = this._keyValueDiffer.diff(this._rawClass);
              t && this._applyKeyValueChanges(t);
            }
          }
          _applyKeyValueChanges(t) {
            t.forEachAddedItem((r) => this._toggleClass(r.key, r.currentValue)),
              t.forEachChangedItem((r) =>
                this._toggleClass(r.key, r.currentValue)
              ),
              t.forEachRemovedItem((r) => {
                r.previousValue && this._toggleClass(r.key, !1);
              });
          }
          _applyIterableChanges(t) {
            t.forEachAddedItem((r) => {
              if ("string" != typeof r.item)
                throw new Error(
                  `NgClass can only toggle CSS classes expressed as strings, got ${Le(
                    r.item
                  )}`
                );
              this._toggleClass(r.item, !0);
            }),
              t.forEachRemovedItem((r) => this._toggleClass(r.item, !1));
          }
          _applyClasses(t) {
            t &&
              (Array.isArray(t) || t instanceof Set
                ? t.forEach((r) => this._toggleClass(r, !0))
                : Object.keys(t).forEach((r) => this._toggleClass(r, !!t[r])));
          }
          _removeClasses(t) {
            t &&
              (Array.isArray(t) || t instanceof Set
                ? t.forEach((r) => this._toggleClass(r, !1))
                : Object.keys(t).forEach((r) => this._toggleClass(r, !1)));
          }
          _toggleClass(t, r) {
            (t = t.trim()) &&
              t.split(/\s+/g).forEach((o) => {
                r
                  ? this._renderer.addClass(this._ngEl.nativeElement, o)
                  : this._renderer.removeClass(this._ngEl.nativeElement, o);
              });
          }
        }
        return (
          (n.ɵfac = function (t) {
            return new (t || n)(w(al), w(sa), w(Ft), w(Br));
          }),
          (n.ɵdir = G({
            type: n,
            selectors: [["", "ngClass", ""]],
            inputs: { klass: ["class", "klass"], ngClass: "ngClass" },
            standalone: !0,
          })),
          n
        );
      })();
      class X2 {
        constructor(e, t, r, o) {
          (this.$implicit = e),
            (this.ngForOf = t),
            (this.index = r),
            (this.count = o);
        }
        get first() {
          return 0 === this.index;
        }
        get last() {
          return this.index === this.count - 1;
        }
        get even() {
          return this.index % 2 == 0;
        }
        get odd() {
          return !this.even;
        }
      }
      let ho = (() => {
        class n {
          constructor(t, r, o) {
            (this._viewContainer = t),
              (this._template = r),
              (this._differs = o),
              (this._ngForOf = null),
              (this._ngForOfDirty = !0),
              (this._differ = null);
          }
          set ngForOf(t) {
            (this._ngForOf = t), (this._ngForOfDirty = !0);
          }
          set ngForTrackBy(t) {
            this._trackByFn = t;
          }
          get ngForTrackBy() {
            return this._trackByFn;
          }
          set ngForTemplate(t) {
            t && (this._template = t);
          }
          ngDoCheck() {
            if (this._ngForOfDirty) {
              this._ngForOfDirty = !1;
              const t = this._ngForOf;
              !this._differ &&
                t &&
                (this._differ = this._differs
                  .find(t)
                  .create(this.ngForTrackBy));
            }
            if (this._differ) {
              const t = this._differ.diff(this._ngForOf);
              t && this._applyChanges(t);
            }
          }
          _applyChanges(t) {
            const r = this._viewContainer;
            t.forEachOperation((o, i, s) => {
              if (null == o.previousIndex)
                r.createEmbeddedView(
                  this._template,
                  new X2(o.item, this._ngForOf, -1, -1),
                  null === s ? void 0 : s
                );
              else if (null == s) r.remove(null === i ? void 0 : i);
              else if (null !== i) {
                const a = r.get(i);
                r.move(a, s), qC(a, o);
              }
            });
            for (let o = 0, i = r.length; o < i; o++) {
              const a = r.get(o).context;
              (a.index = o), (a.count = i), (a.ngForOf = this._ngForOf);
            }
            t.forEachIdentityChange((o) => {
              qC(r.get(o.currentIndex), o);
            });
          }
          static ngTemplateContextGuard(t, r) {
            return !0;
          }
        }
        return (
          (n.ɵfac = function (t) {
            return new (t || n)(w(nr), w(Hr), w(al));
          }),
          (n.ɵdir = G({
            type: n,
            selectors: [["", "ngFor", "", "ngForOf", ""]],
            inputs: {
              ngForOf: "ngForOf",
              ngForTrackBy: "ngForTrackBy",
              ngForTemplate: "ngForTemplate",
            },
            standalone: !0,
          })),
          n
        );
      })();
      function qC(n, e) {
        n.context.$implicit = e.item;
      }
      let Cr = (() => {
        class n {
          constructor(t, r) {
            (this._viewContainer = t),
              (this._context = new tk()),
              (this._thenTemplateRef = null),
              (this._elseTemplateRef = null),
              (this._thenViewRef = null),
              (this._elseViewRef = null),
              (this._thenTemplateRef = r);
          }
          set ngIf(t) {
            (this._context.$implicit = this._context.ngIf = t),
              this._updateView();
          }
          set ngIfThen(t) {
            KC("ngIfThen", t),
              (this._thenTemplateRef = t),
              (this._thenViewRef = null),
              this._updateView();
          }
          set ngIfElse(t) {
            KC("ngIfElse", t),
              (this._elseTemplateRef = t),
              (this._elseViewRef = null),
              this._updateView();
          }
          _updateView() {
            this._context.$implicit
              ? this._thenViewRef ||
                (this._viewContainer.clear(),
                (this._elseViewRef = null),
                this._thenTemplateRef &&
                  (this._thenViewRef = this._viewContainer.createEmbeddedView(
                    this._thenTemplateRef,
                    this._context
                  )))
              : this._elseViewRef ||
                (this._viewContainer.clear(),
                (this._thenViewRef = null),
                this._elseTemplateRef &&
                  (this._elseViewRef = this._viewContainer.createEmbeddedView(
                    this._elseTemplateRef,
                    this._context
                  )));
          }
          static ngTemplateContextGuard(t, r) {
            return !0;
          }
        }
        return (
          (n.ɵfac = function (t) {
            return new (t || n)(w(nr), w(Hr));
          }),
          (n.ɵdir = G({
            type: n,
            selectors: [["", "ngIf", ""]],
            inputs: {
              ngIf: "ngIf",
              ngIfThen: "ngIfThen",
              ngIfElse: "ngIfElse",
            },
            standalone: !0,
          })),
          n
        );
      })();
      class tk {
        constructor() {
          (this.$implicit = null), (this.ngIf = null);
        }
      }
      function KC(n, e) {
        if (e && !e.createEmbeddedView)
          throw new Error(
            `${n} must be a TemplateRef, but received '${Le(e)}'.`
          );
      }
      function ir(n, e) {
        return new M(2100, !1);
      }
      class ak {
        createSubscription(e, t) {
          return e.subscribe({
            next: t,
            error: (r) => {
              throw r;
            },
          });
        }
        dispose(e) {
          e.unsubscribe();
        }
      }
      class ck {
        createSubscription(e, t) {
          return e.then(t, (r) => {
            throw r;
          });
        }
        dispose(e) {}
      }
      const lk = new ck(),
        uk = new ak();
      let Ho = (() => {
        class n {
          constructor(t) {
            (this._latestValue = null),
              (this._subscription = null),
              (this._obj = null),
              (this._strategy = null),
              (this._ref = t);
          }
          ngOnDestroy() {
            this._subscription && this._dispose(), (this._ref = null);
          }
          transform(t) {
            return this._obj
              ? t !== this._obj
                ? (this._dispose(), this.transform(t))
                : this._latestValue
              : (t && this._subscribe(t), this._latestValue);
          }
          _subscribe(t) {
            (this._obj = t),
              (this._strategy = this._selectStrategy(t)),
              (this._subscription = this._strategy.createSubscription(t, (r) =>
                this._updateLatestValue(t, r)
              ));
          }
          _selectStrategy(t) {
            if (Ks(t)) return lk;
            if ($y(t)) return uk;
            throw ir();
          }
          _dispose() {
            this._strategy.dispose(this._subscription),
              (this._latestValue = null),
              (this._subscription = null),
              (this._obj = null);
          }
          _updateLatestValue(t, r) {
            t === this._obj &&
              ((this._latestValue = r), this._ref.markForCheck());
          }
        }
        return (
          (n.ɵfac = function (t) {
            return new (t || n)(w(ol, 16));
          }),
          (n.ɵpipe = It({ name: "async", type: n, pure: !1, standalone: !0 })),
          n
        );
      })();
      const gk = new F("DATE_PIPE_DEFAULT_TIMEZONE");
      let ZC = (() => {
          class n {
            constructor(t, r) {
              (this.locale = t), (this.defaultTimezone = r);
            }
            transform(t, r = "mediumDate", o, i) {
              if (null == t || "" === t || t != t) return null;
              try {
                return A2(
                  t,
                  r,
                  i || this.locale,
                  o ?? this.defaultTimezone ?? void 0
                );
              } catch (s) {
                throw ir();
              }
            }
          }
          return (
            (n.ɵfac = function (t) {
              return new (t || n)(w(yr, 16), w(gk, 24));
            }),
            (n.ɵpipe = It({ name: "date", type: n, pure: !0, standalone: !0 })),
            n
          );
        })(),
        yl = (() => {
          class n {
            constructor(t) {
              this._locale = t;
            }
            transform(t, r, o) {
              if (
                !(function Ih(n) {
                  return !(null == n || "" === n || n != n);
                })(t)
              )
                return null;
              o = o || this._locale;
              try {
                return (function q2(n, e, t) {
                  return (function Oh(n, e, t, r, o, i, s = !1) {
                    let a = "",
                      c = !1;
                    if (isFinite(n)) {
                      let l = (function Q2(n) {
                        let r,
                          o,
                          i,
                          s,
                          a,
                          e = Math.abs(n) + "",
                          t = 0;
                        for (
                          (o = e.indexOf(".")) > -1 && (e = e.replace(".", "")),
                            (i = e.search(/e/i)) > 0
                              ? (o < 0 && (o = i),
                                (o += +e.slice(i + 1)),
                                (e = e.substring(0, i)))
                              : o < 0 && (o = e.length),
                            i = 0;
                          "0" === e.charAt(i);
                          i++
                        );
                        if (i === (a = e.length)) (r = [0]), (o = 1);
                        else {
                          for (a--; "0" === e.charAt(a); ) a--;
                          for (o -= i, r = [], s = 0; i <= a; i++, s++)
                            r[s] = Number(e.charAt(i));
                        }
                        return (
                          o > 22 &&
                            ((r = r.splice(0, 21)), (t = o - 1), (o = 1)),
                          { digits: r, exponent: t, integerLen: o }
                        );
                      })(n);
                      s &&
                        (l = (function K2(n) {
                          if (0 === n.digits[0]) return n;
                          const e = n.digits.length - n.integerLen;
                          return (
                            n.exponent
                              ? (n.exponent += 2)
                              : (0 === e
                                  ? n.digits.push(0, 0)
                                  : 1 === e && n.digits.push(0),
                                (n.integerLen += 2)),
                            n
                          );
                        })(l));
                      let u = e.minInt,
                        d = e.minFrac,
                        f = e.maxFrac;
                      if (i) {
                        const O = i.match(U2);
                        if (null === O)
                          throw new Error(`${i} is not a valid digit info`);
                        const b = O[1],
                          x = O[3],
                          Y = O[5];
                        null != b && (u = xh(b)),
                          null != x && (d = xh(x)),
                          null != Y
                            ? (f = xh(Y))
                            : null != x && d > f && (f = d);
                      }
                      !(function Z2(n, e, t) {
                        if (e > t)
                          throw new Error(
                            `The minimum number of digits after fraction (${e}) is higher than the maximum (${t}).`
                          );
                        let r = n.digits,
                          o = r.length - n.integerLen;
                        const i = Math.min(Math.max(e, o), t);
                        let s = i + n.integerLen,
                          a = r[s];
                        if (s > 0) {
                          r.splice(Math.max(n.integerLen, s));
                          for (let d = s; d < r.length; d++) r[d] = 0;
                        } else {
                          (o = Math.max(0, o)),
                            (n.integerLen = 1),
                            (r.length = Math.max(1, (s = i + 1))),
                            (r[0] = 0);
                          for (let d = 1; d < s; d++) r[d] = 0;
                        }
                        if (a >= 5)
                          if (s - 1 < 0) {
                            for (let d = 0; d > s; d--)
                              r.unshift(0), n.integerLen++;
                            r.unshift(1), n.integerLen++;
                          } else r[s - 1]++;
                        for (; o < Math.max(0, i); o++) r.push(0);
                        let c = 0 !== i;
                        const l = e + n.integerLen,
                          u = r.reduceRight(function (d, f, h, p) {
                            return (
                              (p[h] = (f += d) < 10 ? f : f - 10),
                              c && (0 === p[h] && h >= l ? p.pop() : (c = !1)),
                              f >= 10 ? 1 : 0
                            );
                          }, 0);
                        u && (r.unshift(u), n.integerLen++);
                      })(l, d, f);
                      let h = l.digits,
                        p = l.integerLen;
                      const m = l.exponent;
                      let y = [];
                      for (c = h.every((O) => !O); p < u; p++) h.unshift(0);
                      for (; p < 0; p++) h.unshift(0);
                      p > 0
                        ? (y = h.splice(p, h.length))
                        : ((y = h), (h = [0]));
                      const C = [];
                      for (
                        h.length >= e.lgSize &&
                        C.unshift(h.splice(-e.lgSize, h.length).join(""));
                        h.length > e.gSize;

                      )
                        C.unshift(h.splice(-e.gSize, h.length).join(""));
                      h.length && C.unshift(h.join("")),
                        (a = C.join(Vn(t, r))),
                        y.length && (a += Vn(t, o) + y.join("")),
                        m && (a += Vn(t, $.Exponential) + "+" + m);
                    } else a = Vn(t, $.Infinity);
                    return (
                      (a =
                        n < 0 && !c
                          ? e.negPre + a + e.negSuf
                          : e.posPre + a + e.posSuf),
                      a
                    );
                  })(
                    n,
                    (function Ph(n, e = "-") {
                      const t = {
                          minInt: 1,
                          minFrac: 0,
                          maxFrac: 0,
                          posPre: "",
                          posSuf: "",
                          negPre: "",
                          negSuf: "",
                          gSize: 0,
                          lgSize: 0,
                        },
                        r = n.split(";"),
                        o = r[0],
                        i = r[1],
                        s =
                          -1 !== o.indexOf(".")
                            ? o.split(".")
                            : [
                                o.substring(0, o.lastIndexOf("0") + 1),
                                o.substring(o.lastIndexOf("0") + 1),
                              ],
                        a = s[0],
                        c = s[1] || "";
                      t.posPre = a.substring(0, a.indexOf("#"));
                      for (let u = 0; u < c.length; u++) {
                        const d = c.charAt(u);
                        "0" === d
                          ? (t.minFrac = t.maxFrac = u + 1)
                          : "#" === d
                          ? (t.maxFrac = u + 1)
                          : (t.posSuf += d);
                      }
                      const l = a.split(",");
                      if (
                        ((t.gSize = l[1] ? l[1].length : 0),
                        (t.lgSize = l[2] || l[1] ? (l[2] || l[1]).length : 0),
                        i)
                      ) {
                        const u = o.length - t.posPre.length - t.posSuf.length,
                          d = i.indexOf("#");
                        (t.negPre = i.substring(0, d).replace(/'/g, "")),
                          (t.negSuf = i.slice(d + u).replace(/'/g, ""));
                      } else (t.negPre = e + t.posPre), (t.negSuf = t.posSuf);
                      return t;
                    })(
                      (function bh(n, e) {
                        return en(n)[T.NumberFormats][e];
                      })(e, cn.Decimal),
                      Vn(e, $.MinusSign)
                    ),
                    e,
                    $.Group,
                    $.Decimal,
                    t
                  );
                })(
                  (function kh(n) {
                    if (
                      "string" == typeof n &&
                      !isNaN(Number(n) - parseFloat(n))
                    )
                      return Number(n);
                    if ("number" != typeof n)
                      throw new Error(`${n} is not a number`);
                    return n;
                  })(t),
                  o,
                  r
                );
              } catch (i) {
                throw ir();
              }
            }
          }
          return (
            (n.ɵfac = function (t) {
              return new (t || n)(w(yr, 16));
            }),
            (n.ɵpipe = It({
              name: "number",
              type: n,
              pure: !0,
              standalone: !0,
            })),
            n
          );
        })();
      let JC = (() => {
          class n {
            transform(t, r, o) {
              if (null == t) return null;
              if (!this.supports(t)) throw ir();
              return t.slice(r, o);
            }
            supports(t) {
              return "string" == typeof t || Array.isArray(t);
            }
          }
          return (
            (n.ɵfac = function (t) {
              return new (t || n)();
            }),
            (n.ɵpipe = It({
              name: "slice",
              type: n,
              pure: !1,
              standalone: !0,
            })),
            n
          );
        })(),
        Dk = (() => {
          class n {}
          return (
            (n.ɵfac = function (t) {
              return new (t || n)();
            }),
            (n.ɵmod = yt({ type: n })),
            (n.ɵinj = ft({})),
            n
          );
        })();
      const XC = "browser";
      let Sk = (() => {
        class n {}
        return (
          (n.ɵprov = R({
            token: n,
            providedIn: "root",
            factory: () => new Ak(P(st), window),
          })),
          n
        );
      })();
      class Ak {
        constructor(e, t) {
          (this.document = e), (this.window = t), (this.offset = () => [0, 0]);
        }
        setOffset(e) {
          this.offset = Array.isArray(e) ? () => e : e;
        }
        getScrollPosition() {
          return this.supportsScrolling()
            ? [this.window.pageXOffset, this.window.pageYOffset]
            : [0, 0];
        }
        scrollToPosition(e) {
          this.supportsScrolling() && this.window.scrollTo(e[0], e[1]);
        }
        scrollToAnchor(e) {
          if (!this.supportsScrolling()) return;
          const t = (function Tk(n, e) {
            const t = n.getElementById(e) || n.getElementsByName(e)[0];
            if (t) return t;
            if (
              "function" == typeof n.createTreeWalker &&
              n.body &&
              (n.body.createShadowRoot || n.body.attachShadow)
            ) {
              const r = n.createTreeWalker(n.body, NodeFilter.SHOW_ELEMENT);
              let o = r.currentNode;
              for (; o; ) {
                const i = o.shadowRoot;
                if (i) {
                  const s =
                    i.getElementById(e) || i.querySelector(`[name="${e}"]`);
                  if (s) return s;
                }
                o = r.nextNode();
              }
            }
            return null;
          })(this.document, e);
          t && (this.scrollToElement(t), t.focus());
        }
        setHistoryScrollRestoration(e) {
          if (this.supportScrollRestoration()) {
            const t = this.window.history;
            t && t.scrollRestoration && (t.scrollRestoration = e);
          }
        }
        scrollToElement(e) {
          const t = e.getBoundingClientRect(),
            r = t.left + this.window.pageXOffset,
            o = t.top + this.window.pageYOffset,
            i = this.offset();
          this.window.scrollTo(r - i[0], o - i[1]);
        }
        supportScrollRestoration() {
          try {
            if (!this.supportsScrolling()) return !1;
            const e =
              eb(this.window.history) ||
              eb(Object.getPrototypeOf(this.window.history));
            return !(!e || (!e.writable && !e.set));
          } catch {
            return !1;
          }
        }
        supportsScrolling() {
          try {
            return (
              !!this.window &&
              !!this.window.scrollTo &&
              "pageXOffset" in this.window
            );
          } catch {
            return !1;
          }
        }
      }
      function eb(n) {
        return Object.getOwnPropertyDescriptor(n, "scrollRestoration");
      }
      class tb {}
      class Fh extends class Qk extends class l2 {} {
        constructor() {
          super(...arguments), (this.supportsDOMEvents = !0);
        }
      } {
        static makeCurrent() {
          !(function c2(n) {
            cl || (cl = n);
          })(new Fh());
        }
        onAndCancel(e, t, r) {
          return (
            e.addEventListener(t, r, !1),
            () => {
              e.removeEventListener(t, r, !1);
            }
          );
        }
        dispatchEvent(e, t) {
          e.dispatchEvent(t);
        }
        remove(e) {
          e.parentNode && e.parentNode.removeChild(e);
        }
        createElement(e, t) {
          return (t = t || this.getDefaultDocument()).createElement(e);
        }
        createHtmlDocument() {
          return document.implementation.createHTMLDocument("fakeTitle");
        }
        getDefaultDocument() {
          return document;
        }
        isElementNode(e) {
          return e.nodeType === Node.ELEMENT_NODE;
        }
        isShadowRoot(e) {
          return e instanceof DocumentFragment;
        }
        getGlobalEventTarget(e, t) {
          return "window" === t
            ? window
            : "document" === t
            ? e
            : "body" === t
            ? e.body
            : null;
        }
        getBaseHref(e) {
          const t = (function Zk() {
            return (
              (da = da || document.querySelector("base")),
              da ? da.getAttribute("href") : null
            );
          })();
          return null == t
            ? null
            : (function Yk(n) {
                (Cl = Cl || document.createElement("a")),
                  Cl.setAttribute("href", n);
                const e = Cl.pathname;
                return "/" === e.charAt(0) ? e : `/${e}`;
              })(t);
        }
        resetBaseElement() {
          da = null;
        }
        getUserAgent() {
          return window.navigator.userAgent;
        }
        getCookie(e) {
          return zC(document.cookie, e);
        }
      }
      let Cl,
        da = null;
      const ib = new F("TRANSITION_ID"),
        Xk = [
          {
            provide: Jc,
            useFactory: function Jk(n, e, t) {
              return () => {
                t.get(Xc).donePromise.then(() => {
                  const r = vr(),
                    o = e.querySelectorAll(`style[ng-transition="${n}"]`);
                  for (let i = 0; i < o.length; i++) r.remove(o[i]);
                });
              };
            },
            deps: [ib, st, vn],
            multi: !0,
          },
        ];
      let tN = (() => {
        class n {
          build() {
            return new XMLHttpRequest();
          }
        }
        return (
          (n.ɵfac = function (t) {
            return new (t || n)();
          }),
          (n.ɵprov = R({ token: n, factory: n.ɵfac })),
          n
        );
      })();
      const bl = new F("EventManagerPlugins");
      let wl = (() => {
        class n {
          constructor(t, r) {
            (this._zone = r),
              (this._eventNameToPlugin = new Map()),
              t.forEach((o) => (o.manager = this)),
              (this._plugins = t.slice().reverse());
          }
          addEventListener(t, r, o) {
            return this._findPluginFor(r).addEventListener(t, r, o);
          }
          addGlobalEventListener(t, r, o) {
            return this._findPluginFor(r).addGlobalEventListener(t, r, o);
          }
          getZone() {
            return this._zone;
          }
          _findPluginFor(t) {
            const r = this._eventNameToPlugin.get(t);
            if (r) return r;
            const o = this._plugins;
            for (let i = 0; i < o.length; i++) {
              const s = o[i];
              if (s.supports(t)) return this._eventNameToPlugin.set(t, s), s;
            }
            throw new Error(`No event manager plugin found for event ${t}`);
          }
        }
        return (
          (n.ɵfac = function (t) {
            return new (t || n)(P(bl), P(Ge));
          }),
          (n.ɵprov = R({ token: n, factory: n.ɵfac })),
          n
        );
      })();
      class sb {
        constructor(e) {
          this._doc = e;
        }
        addGlobalEventListener(e, t, r) {
          const o = vr().getGlobalEventTarget(this._doc, e);
          if (!o)
            throw new Error(`Unsupported event target ${o} for event ${t}`);
          return this.addEventListener(o, t, r);
        }
      }
      let ab = (() => {
          class n {
            constructor() {
              this._stylesSet = new Set();
            }
            addStyles(t) {
              const r = new Set();
              t.forEach((o) => {
                this._stylesSet.has(o) || (this._stylesSet.add(o), r.add(o));
              }),
                this.onStylesAdded(r);
            }
            onStylesAdded(t) {}
            getAllStyles() {
              return Array.from(this._stylesSet);
            }
          }
          return (
            (n.ɵfac = function (t) {
              return new (t || n)();
            }),
            (n.ɵprov = R({ token: n, factory: n.ɵfac })),
            n
          );
        })(),
        fa = (() => {
          class n extends ab {
            constructor(t) {
              super(),
                (this._doc = t),
                (this._hostNodes = new Map()),
                this._hostNodes.set(t.head, []);
            }
            _addStylesToHost(t, r, o) {
              t.forEach((i) => {
                const s = this._doc.createElement("style");
                (s.textContent = i), o.push(r.appendChild(s));
              });
            }
            addHost(t) {
              const r = [];
              this._addStylesToHost(this._stylesSet, t, r),
                this._hostNodes.set(t, r);
            }
            removeHost(t) {
              const r = this._hostNodes.get(t);
              r && r.forEach(cb), this._hostNodes.delete(t);
            }
            onStylesAdded(t) {
              this._hostNodes.forEach((r, o) => {
                this._addStylesToHost(t, o, r);
              });
            }
            ngOnDestroy() {
              this._hostNodes.forEach((t) => t.forEach(cb));
            }
          }
          return (
            (n.ɵfac = function (t) {
              return new (t || n)(P(st));
            }),
            (n.ɵprov = R({ token: n, factory: n.ɵfac })),
            n
          );
        })();
      function cb(n) {
        vr().remove(n);
      }
      const Lh = {
          svg: "http://www.w3.org/2000/svg",
          xhtml: "http://www.w3.org/1999/xhtml",
          xlink: "http://www.w3.org/1999/xlink",
          xml: "http://www.w3.org/XML/1998/namespace",
          xmlns: "http://www.w3.org/2000/xmlns/",
          math: "http://www.w3.org/1998/MathML/",
        },
        Vh = /%COMP%/g;
      function Ml(n, e, t) {
        for (let r = 0; r < e.length; r++) {
          let o = e[r];
          Array.isArray(o) ? Ml(n, o, t) : ((o = o.replace(Vh, n)), t.push(o));
        }
        return t;
      }
      function db(n) {
        return (e) => {
          if ("__ngUnwrap__" === e) return n;
          !1 === n(e) && (e.preventDefault(), (e.returnValue = !1));
        };
      }
      let Dl = (() => {
        class n {
          constructor(t, r, o) {
            (this.eventManager = t),
              (this.sharedStylesHost = r),
              (this.appId = o),
              (this.rendererByCompId = new Map()),
              (this.defaultRenderer = new Bh(t));
          }
          createRenderer(t, r) {
            if (!t || !r) return this.defaultRenderer;
            switch (r.encapsulation) {
              case Wn.Emulated: {
                let o = this.rendererByCompId.get(r.id);
                return (
                  o ||
                    ((o = new aN(
                      this.eventManager,
                      this.sharedStylesHost,
                      r,
                      this.appId
                    )),
                    this.rendererByCompId.set(r.id, o)),
                  o.applyToHost(t),
                  o
                );
              }
              case 1:
              case Wn.ShadowDom:
                return new cN(this.eventManager, this.sharedStylesHost, t, r);
              default:
                if (!this.rendererByCompId.has(r.id)) {
                  const o = Ml(r.id, r.styles, []);
                  this.sharedStylesHost.addStyles(o),
                    this.rendererByCompId.set(r.id, this.defaultRenderer);
                }
                return this.defaultRenderer;
            }
          }
          begin() {}
          end() {}
        }
        return (
          (n.ɵfac = function (t) {
            return new (t || n)(P(wl), P(fa), P(oa));
          }),
          (n.ɵprov = R({ token: n, factory: n.ɵfac })),
          n
        );
      })();
      class Bh {
        constructor(e) {
          (this.eventManager = e),
            (this.data = Object.create(null)),
            (this.destroyNode = null);
        }
        destroy() {}
        createElement(e, t) {
          return t
            ? document.createElementNS(Lh[t] || t, e)
            : document.createElement(e);
        }
        createComment(e) {
          return document.createComment(e);
        }
        createText(e) {
          return document.createTextNode(e);
        }
        appendChild(e, t) {
          (hb(e) ? e.content : e).appendChild(t);
        }
        insertBefore(e, t, r) {
          e && (hb(e) ? e.content : e).insertBefore(t, r);
        }
        removeChild(e, t) {
          e && e.removeChild(t);
        }
        selectRootElement(e, t) {
          let r = "string" == typeof e ? document.querySelector(e) : e;
          if (!r)
            throw new Error(`The selector "${e}" did not match any elements`);
          return t || (r.textContent = ""), r;
        }
        parentNode(e) {
          return e.parentNode;
        }
        nextSibling(e) {
          return e.nextSibling;
        }
        setAttribute(e, t, r, o) {
          if (o) {
            t = o + ":" + t;
            const i = Lh[o];
            i ? e.setAttributeNS(i, t, r) : e.setAttribute(t, r);
          } else e.setAttribute(t, r);
        }
        removeAttribute(e, t, r) {
          if (r) {
            const o = Lh[r];
            o ? e.removeAttributeNS(o, t) : e.removeAttribute(`${r}:${t}`);
          } else e.removeAttribute(t);
        }
        addClass(e, t) {
          e.classList.add(t);
        }
        removeClass(e, t) {
          e.classList.remove(t);
        }
        setStyle(e, t, r, o) {
          o & (an.DashCase | an.Important)
            ? e.style.setProperty(t, r, o & an.Important ? "important" : "")
            : (e.style[t] = r);
        }
        removeStyle(e, t, r) {
          r & an.DashCase ? e.style.removeProperty(t) : (e.style[t] = "");
        }
        setProperty(e, t, r) {
          e[t] = r;
        }
        setValue(e, t) {
          e.nodeValue = t;
        }
        listen(e, t, r) {
          return "string" == typeof e
            ? this.eventManager.addGlobalEventListener(e, t, db(r))
            : this.eventManager.addEventListener(e, t, db(r));
        }
      }
      function hb(n) {
        return "TEMPLATE" === n.tagName && void 0 !== n.content;
      }
      class aN extends Bh {
        constructor(e, t, r, o) {
          super(e), (this.component = r);
          const i = Ml(o + "-" + r.id, r.styles, []);
          t.addStyles(i),
            (this.contentAttr = (function oN(n) {
              return "_ngcontent-%COMP%".replace(Vh, n);
            })(o + "-" + r.id)),
            (this.hostAttr = (function iN(n) {
              return "_nghost-%COMP%".replace(Vh, n);
            })(o + "-" + r.id));
        }
        applyToHost(e) {
          super.setAttribute(e, this.hostAttr, "");
        }
        createElement(e, t) {
          const r = super.createElement(e, t);
          return super.setAttribute(r, this.contentAttr, ""), r;
        }
      }
      class cN extends Bh {
        constructor(e, t, r, o) {
          super(e),
            (this.sharedStylesHost = t),
            (this.hostEl = r),
            (this.shadowRoot = r.attachShadow({ mode: "open" })),
            this.sharedStylesHost.addHost(this.shadowRoot);
          const i = Ml(o.id, o.styles, []);
          for (let s = 0; s < i.length; s++) {
            const a = document.createElement("style");
            (a.textContent = i[s]), this.shadowRoot.appendChild(a);
          }
        }
        nodeOrShadowRoot(e) {
          return e === this.hostEl ? this.shadowRoot : e;
        }
        destroy() {
          this.sharedStylesHost.removeHost(this.shadowRoot);
        }
        appendChild(e, t) {
          return super.appendChild(this.nodeOrShadowRoot(e), t);
        }
        insertBefore(e, t, r) {
          return super.insertBefore(this.nodeOrShadowRoot(e), t, r);
        }
        removeChild(e, t) {
          return super.removeChild(this.nodeOrShadowRoot(e), t);
        }
        parentNode(e) {
          return this.nodeOrShadowRoot(
            super.parentNode(this.nodeOrShadowRoot(e))
          );
        }
      }
      let lN = (() => {
        class n extends sb {
          constructor(t) {
            super(t);
          }
          supports(t) {
            return !0;
          }
          addEventListener(t, r, o) {
            return (
              t.addEventListener(r, o, !1),
              () => this.removeEventListener(t, r, o)
            );
          }
          removeEventListener(t, r, o) {
            return t.removeEventListener(r, o);
          }
        }
        return (
          (n.ɵfac = function (t) {
            return new (t || n)(P(st));
          }),
          (n.ɵprov = R({ token: n, factory: n.ɵfac })),
          n
        );
      })();
      const pb = ["alt", "control", "meta", "shift"],
        uN = {
          "\b": "Backspace",
          "\t": "Tab",
          "\x7f": "Delete",
          "\x1b": "Escape",
          Del: "Delete",
          Esc: "Escape",
          Left: "ArrowLeft",
          Right: "ArrowRight",
          Up: "ArrowUp",
          Down: "ArrowDown",
          Menu: "ContextMenu",
          Scroll: "ScrollLock",
          Win: "OS",
        },
        dN = {
          alt: (n) => n.altKey,
          control: (n) => n.ctrlKey,
          meta: (n) => n.metaKey,
          shift: (n) => n.shiftKey,
        };
      let fN = (() => {
        class n extends sb {
          constructor(t) {
            super(t);
          }
          supports(t) {
            return null != n.parseEventName(t);
          }
          addEventListener(t, r, o) {
            const i = n.parseEventName(r),
              s = n.eventCallback(i.fullKey, o, this.manager.getZone());
            return this.manager
              .getZone()
              .runOutsideAngular(() => vr().onAndCancel(t, i.domEventName, s));
          }
          static parseEventName(t) {
            const r = t.toLowerCase().split("."),
              o = r.shift();
            if (0 === r.length || ("keydown" !== o && "keyup" !== o))
              return null;
            const i = n._normalizeKey(r.pop());
            let s = "",
              a = r.indexOf("code");
            if (
              (a > -1 && (r.splice(a, 1), (s = "code.")),
              pb.forEach((l) => {
                const u = r.indexOf(l);
                u > -1 && (r.splice(u, 1), (s += l + "."));
              }),
              (s += i),
              0 != r.length || 0 === i.length)
            )
              return null;
            const c = {};
            return (c.domEventName = o), (c.fullKey = s), c;
          }
          static matchEventFullKeyCode(t, r) {
            let o = uN[t.key] || t.key,
              i = "";
            return (
              r.indexOf("code.") > -1 && ((o = t.code), (i = "code.")),
              !(null == o || !o) &&
                ((o = o.toLowerCase()),
                " " === o ? (o = "space") : "." === o && (o = "dot"),
                pb.forEach((s) => {
                  s !== o && (0, dN[s])(t) && (i += s + ".");
                }),
                (i += o),
                i === r)
            );
          }
          static eventCallback(t, r, o) {
            return (i) => {
              n.matchEventFullKeyCode(i, t) && o.runGuarded(() => r(i));
            };
          }
          static _normalizeKey(t) {
            return "esc" === t ? "escape" : t;
          }
        }
        return (
          (n.ɵfac = function (t) {
            return new (t || n)(P(st));
          }),
          (n.ɵprov = R({ token: n, factory: n.ɵfac })),
          n
        );
      })();
      const mN = dC(o2, "browser", [
          { provide: el, useValue: XC },
          {
            provide: tC,
            useValue: function hN() {
              Fh.makeCurrent();
            },
            multi: !0,
          },
          {
            provide: st,
            useFactory: function gN() {
              return (
                (function MO(n) {
                  Cd = n;
                })(document),
                document
              );
            },
            deps: [],
          },
        ]),
        _b = new F(""),
        yb = [
          {
            provide: nl,
            useClass: class eN {
              addToWindow(e) {
                (Ve.getAngularTestability = (r, o = !0) => {
                  const i = e.findTestabilityInTree(r, o);
                  if (null == i)
                    throw new Error("Could not find testability for element.");
                  return i;
                }),
                  (Ve.getAllAngularTestabilities = () =>
                    e.getAllTestabilities()),
                  (Ve.getAllAngularRootElements = () => e.getAllRootElements()),
                  Ve.frameworkStabilizers || (Ve.frameworkStabilizers = []),
                  Ve.frameworkStabilizers.push((r) => {
                    const o = Ve.getAllAngularTestabilities();
                    let i = o.length,
                      s = !1;
                    const a = function (c) {
                      (s = s || c), i--, 0 == i && r(s);
                    };
                    o.forEach(function (c) {
                      c.whenStable(a);
                    });
                  });
              }
              findTestabilityInTree(e, t, r) {
                return null == t
                  ? null
                  : e.getTestability(t) ??
                      (r
                        ? vr().isShadowRoot(t)
                          ? this.findTestabilityInTree(e, t.host, !0)
                          : this.findTestabilityInTree(e, t.parentElement, !0)
                        : null);
              }
            },
            deps: [],
          },
          { provide: aC, useClass: lh, deps: [Ge, uh, nl] },
          { provide: lh, useClass: lh, deps: [Ge, uh, nl] },
        ],
        vb = [
          { provide: Ad, useValue: "root" },
          {
            provide: xi,
            useFactory: function pN() {
              return new xi();
            },
            deps: [],
          },
          { provide: bl, useClass: lN, multi: !0, deps: [st, Ge, el] },
          { provide: bl, useClass: fN, multi: !0, deps: [st] },
          { provide: Dl, useClass: Dl, deps: [wl, fa, oa] },
          { provide: Bs, useExisting: Dl },
          { provide: ab, useExisting: fa },
          { provide: fa, useClass: fa, deps: [st] },
          { provide: wl, useClass: wl, deps: [bl, Ge] },
          { provide: tb, useClass: tN, deps: [] },
          [],
        ];
      let Cb = (() => {
          class n {
            constructor(t) {}
            static withServerTransition(t) {
              return {
                ngModule: n,
                providers: [
                  { provide: oa, useValue: t.appId },
                  { provide: ib, useExisting: oa },
                  Xk,
                ],
              };
            }
          }
          return (
            (n.ɵfac = function (t) {
              return new (t || n)(P(_b, 12));
            }),
            (n.ɵmod = yt({ type: n })),
            (n.ɵinj = ft({ providers: [...vb, ...yb], imports: [Dk, s2] })),
            n
          );
        })(),
        bb = (() => {
          class n {
            constructor(t) {
              this._doc = t;
            }
            getTitle() {
              return this._doc.title;
            }
            setTitle(t) {
              this._doc.title = t || "";
            }
          }
          return (
            (n.ɵfac = function (t) {
              return new (t || n)(P(st));
            }),
            (n.ɵprov = R({
              token: n,
              factory: function (t) {
                let r = null;
                return (
                  (r = t
                    ? new t()
                    : (function yN() {
                        return new bb(P(st));
                      })()),
                  r
                );
              },
              providedIn: "root",
            })),
            n
          );
        })();
      typeof window < "u" && window;
      const { isArray: ON } = Array,
        { getPrototypeOf: PN, prototype: xN, keys: SN } = Object;
      function Db(n) {
        if (1 === n.length) {
          const e = n[0];
          if (ON(e)) return { args: e, keys: null };
          if (
            (function AN(n) {
              return n && "object" == typeof n && PN(n) === xN;
            })(e)
          ) {
            const t = SN(e);
            return { args: t.map((r) => e[r]), keys: t };
          }
        }
        return { args: n, keys: null };
      }
      const { isArray: TN } = Array;
      function Eb(n) {
        return U((e) =>
          (function IN(n, e) {
            return TN(e) ? n(...e) : n(e);
          })(n, e)
        );
      }
      function Ob(n, e) {
        return n.reduce((t, r, o) => ((t[r] = e[o]), t), {});
      }
      let Pb = (() => {
          class n {
            constructor(t, r) {
              (this._renderer = t),
                (this._elementRef = r),
                (this.onChange = (o) => {}),
                (this.onTouched = () => {});
            }
            setProperty(t, r) {
              this._renderer.setProperty(this._elementRef.nativeElement, t, r);
            }
            registerOnTouched(t) {
              this.onTouched = t;
            }
            registerOnChange(t) {
              this.onChange = t;
            }
            setDisabledState(t) {
              this.setProperty("disabled", t);
            }
          }
          return (
            (n.ɵfac = function (t) {
              return new (t || n)(w(Br), w(Ft));
            }),
            (n.ɵdir = G({ type: n })),
            n
          );
        })(),
        zo = (() => {
          class n extends Pb {}
          return (
            (n.ɵfac = (function () {
              let e;
              return function (r) {
                return (e || (e = Rt(n)))(r || n);
              };
            })()),
            (n.ɵdir = G({ type: n, features: [Ae] })),
            n
          );
        })();
      const br = new F("NgValueAccessor"),
        RN = { provide: br, useExisting: Be(() => Go), multi: !0 },
        LN = new F("CompositionEventMode");
      let Go = (() => {
        class n extends Pb {
          constructor(t, r, o) {
            super(t, r),
              (this._compositionMode = o),
              (this._composing = !1),
              null == this._compositionMode &&
                (this._compositionMode = !(function FN() {
                  const n = vr() ? vr().getUserAgent() : "";
                  return /android (\d+)/.test(n.toLowerCase());
                })());
          }
          writeValue(t) {
            this.setProperty("value", t ?? "");
          }
          _handleInput(t) {
            (!this._compositionMode ||
              (this._compositionMode && !this._composing)) &&
              this.onChange(t);
          }
          _compositionStart() {
            this._composing = !0;
          }
          _compositionEnd(t) {
            (this._composing = !1), this._compositionMode && this.onChange(t);
          }
        }
        return (
          (n.ɵfac = function (t) {
            return new (t || n)(w(Br), w(Ft), w(LN, 8));
          }),
          (n.ɵdir = G({
            type: n,
            selectors: [
              ["input", "formControlName", "", 3, "type", "checkbox"],
              ["textarea", "formControlName", ""],
              ["input", "formControl", "", 3, "type", "checkbox"],
              ["textarea", "formControl", ""],
              ["input", "ngModel", "", 3, "type", "checkbox"],
              ["textarea", "ngModel", ""],
              ["", "ngDefaultControl", ""],
            ],
            hostBindings: function (t, r) {
              1 & t &&
                me("input", function (i) {
                  return r._handleInput(i.target.value);
                })("blur", function () {
                  return r.onTouched();
                })("compositionstart", function () {
                  return r._compositionStart();
                })("compositionend", function (i) {
                  return r._compositionEnd(i.target.value);
                });
            },
            features: [Ze([RN]), Ae],
          })),
          n
        );
      })();
      function go(n) {
        return (
          null == n ||
          (("string" == typeof n || Array.isArray(n)) && 0 === n.length)
        );
      }
      function Sb(n) {
        return null != n && "number" == typeof n.length;
      }
      const jt = new F("NgValidators"),
        mo = new F("NgAsyncValidators"),
        BN =
          /^(?=.{1,254}$)(?=.{1,64}@)[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
      class wr {
        static min(e) {
          return (function Ab(n) {
            return (e) => {
              if (go(e.value) || go(n)) return null;
              const t = parseFloat(e.value);
              return !isNaN(t) && t < n
                ? { min: { min: n, actual: e.value } }
                : null;
            };
          })(e);
        }
        static max(e) {
          return (function Tb(n) {
            return (e) => {
              if (go(e.value) || go(n)) return null;
              const t = parseFloat(e.value);
              return !isNaN(t) && t > n
                ? { max: { max: n, actual: e.value } }
                : null;
            };
          })(e);
        }
        static required(e) {
          return (function Ib(n) {
            return go(n.value) ? { required: !0 } : null;
          })(e);
        }
        static requiredTrue(e) {
          return (function kb(n) {
            return !0 === n.value ? null : { required: !0 };
          })(e);
        }
        static email(e) {
          return (function Nb(n) {
            return go(n.value) || BN.test(n.value) ? null : { email: !0 };
          })(e);
        }
        static minLength(e) {
          return (function Rb(n) {
            return (e) =>
              go(e.value) || !Sb(e.value)
                ? null
                : e.value.length < n
                ? {
                    minlength: {
                      requiredLength: n,
                      actualLength: e.value.length,
                    },
                  }
                : null;
          })(e);
        }
        static maxLength(e) {
          return (function Fb(n) {
            return (e) =>
              Sb(e.value) && e.value.length > n
                ? {
                    maxlength: {
                      requiredLength: n,
                      actualLength: e.value.length,
                    },
                  }
                : null;
          })(e);
        }
        static pattern(e) {
          return (function Lb(n) {
            if (!n) return El;
            let e, t;
            return (
              "string" == typeof n
                ? ((t = ""),
                  "^" !== n.charAt(0) && (t += "^"),
                  (t += n),
                  "$" !== n.charAt(n.length - 1) && (t += "$"),
                  (e = new RegExp(t)))
                : ((t = n.toString()), (e = n)),
              (r) => {
                if (go(r.value)) return null;
                const o = r.value;
                return e.test(o)
                  ? null
                  : { pattern: { requiredPattern: t, actualValue: o } };
              }
            );
          })(e);
        }
        static nullValidator(e) {
          return null;
        }
        static compose(e) {
          return Hb(e);
        }
        static composeAsync(e) {
          return zb(e);
        }
      }
      function El(n) {
        return null;
      }
      function Vb(n) {
        return null != n;
      }
      function Bb(n) {
        return Ks(n) ? dt(n) : n;
      }
      function jb(n) {
        let e = {};
        return (
          n.forEach((t) => {
            e = null != t ? { ...e, ...t } : e;
          }),
          0 === Object.keys(e).length ? null : e
        );
      }
      function Ub(n, e) {
        return e.map((t) => t(n));
      }
      function $b(n) {
        return n.map((e) =>
          (function jN(n) {
            return !n.validate;
          })(e)
            ? e
            : (t) => e.validate(t)
        );
      }
      function Hb(n) {
        if (!n) return null;
        const e = n.filter(Vb);
        return 0 == e.length
          ? null
          : function (t) {
              return jb(Ub(t, e));
            };
      }
      function $h(n) {
        return null != n ? Hb($b(n)) : null;
      }
      function zb(n) {
        if (!n) return null;
        const e = n.filter(Vb);
        return 0 == e.length
          ? null
          : function (t) {
              return (function kN(...n) {
                const e = Fg(n),
                  { args: t, keys: r } = Db(n),
                  o = new Re((i) => {
                    const { length: s } = t;
                    if (!s) return void i.complete();
                    const a = new Array(s);
                    let c = s,
                      l = s;
                    for (let u = 0; u < s; u++) {
                      let d = !1;
                      An(t[u]).subscribe(
                        ye(
                          i,
                          (f) => {
                            d || ((d = !0), l--), (a[u] = f);
                          },
                          () => c--,
                          void 0,
                          () => {
                            (!c || !d) &&
                              (l || i.next(r ? Ob(r, a) : a), i.complete());
                          }
                        )
                      );
                    }
                  });
                return e ? o.pipe(Eb(e)) : o;
              })(Ub(t, e).map(Bb)).pipe(U(jb));
            };
      }
      function Hh(n) {
        return null != n ? zb($b(n)) : null;
      }
      function Gb(n, e) {
        return null === n ? [e] : Array.isArray(n) ? [...n, e] : [n, e];
      }
      function Wb(n) {
        return n._rawValidators;
      }
      function qb(n) {
        return n._rawAsyncValidators;
      }
      function zh(n) {
        return n ? (Array.isArray(n) ? n : [n]) : [];
      }
      function Ol(n, e) {
        return Array.isArray(n) ? n.includes(e) : n === e;
      }
      function Kb(n, e) {
        const t = zh(e);
        return (
          zh(n).forEach((o) => {
            Ol(t, o) || t.push(o);
          }),
          t
        );
      }
      function Qb(n, e) {
        return zh(e).filter((t) => !Ol(n, t));
      }
      class Zb {
        constructor() {
          (this._rawValidators = []),
            (this._rawAsyncValidators = []),
            (this._onDestroyCallbacks = []);
        }
        get value() {
          return this.control ? this.control.value : null;
        }
        get valid() {
          return this.control ? this.control.valid : null;
        }
        get invalid() {
          return this.control ? this.control.invalid : null;
        }
        get pending() {
          return this.control ? this.control.pending : null;
        }
        get disabled() {
          return this.control ? this.control.disabled : null;
        }
        get enabled() {
          return this.control ? this.control.enabled : null;
        }
        get errors() {
          return this.control ? this.control.errors : null;
        }
        get pristine() {
          return this.control ? this.control.pristine : null;
        }
        get dirty() {
          return this.control ? this.control.dirty : null;
        }
        get touched() {
          return this.control ? this.control.touched : null;
        }
        get status() {
          return this.control ? this.control.status : null;
        }
        get untouched() {
          return this.control ? this.control.untouched : null;
        }
        get statusChanges() {
          return this.control ? this.control.statusChanges : null;
        }
        get valueChanges() {
          return this.control ? this.control.valueChanges : null;
        }
        get path() {
          return null;
        }
        _setValidators(e) {
          (this._rawValidators = e || []),
            (this._composedValidatorFn = $h(this._rawValidators));
        }
        _setAsyncValidators(e) {
          (this._rawAsyncValidators = e || []),
            (this._composedAsyncValidatorFn = Hh(this._rawAsyncValidators));
        }
        get validator() {
          return this._composedValidatorFn || null;
        }
        get asyncValidator() {
          return this._composedAsyncValidatorFn || null;
        }
        _registerOnDestroy(e) {
          this._onDestroyCallbacks.push(e);
        }
        _invokeOnDestroyCallbacks() {
          this._onDestroyCallbacks.forEach((e) => e()),
            (this._onDestroyCallbacks = []);
        }
        reset(e) {
          this.control && this.control.reset(e);
        }
        hasError(e, t) {
          return !!this.control && this.control.hasError(e, t);
        }
        getError(e, t) {
          return this.control ? this.control.getError(e, t) : null;
        }
      }
      class nn extends Zb {
        get formDirective() {
          return null;
        }
        get path() {
          return null;
        }
      }
      class _o extends Zb {
        constructor() {
          super(...arguments),
            (this._parent = null),
            (this.name = null),
            (this.valueAccessor = null);
        }
      }
      class Yb {
        constructor(e) {
          this._cd = e;
        }
        get isTouched() {
          return !!this._cd?.control?.touched;
        }
        get isUntouched() {
          return !!this._cd?.control?.untouched;
        }
        get isPristine() {
          return !!this._cd?.control?.pristine;
        }
        get isDirty() {
          return !!this._cd?.control?.dirty;
        }
        get isValid() {
          return !!this._cd?.control?.valid;
        }
        get isInvalid() {
          return !!this._cd?.control?.invalid;
        }
        get isPending() {
          return !!this._cd?.control?.pending;
        }
        get isSubmitted() {
          return !!this._cd?.submitted;
        }
      }
      let ha = (() => {
          class n extends Yb {
            constructor(t) {
              super(t);
            }
          }
          return (
            (n.ɵfac = function (t) {
              return new (t || n)(w(_o, 2));
            }),
            (n.ɵdir = G({
              type: n,
              selectors: [
                ["", "formControlName", ""],
                ["", "ngModel", ""],
                ["", "formControl", ""],
              ],
              hostVars: 14,
              hostBindings: function (t, r) {
                2 & t &&
                  Vo("ng-untouched", r.isUntouched)("ng-touched", r.isTouched)(
                    "ng-pristine",
                    r.isPristine
                  )("ng-dirty", r.isDirty)("ng-valid", r.isValid)(
                    "ng-invalid",
                    r.isInvalid
                  )("ng-pending", r.isPending);
              },
              features: [Ae],
            })),
            n
          );
        })(),
        pa = (() => {
          class n extends Yb {
            constructor(t) {
              super(t);
            }
          }
          return (
            (n.ɵfac = function (t) {
              return new (t || n)(w(nn, 10));
            }),
            (n.ɵdir = G({
              type: n,
              selectors: [
                ["", "formGroupName", ""],
                ["", "formArrayName", ""],
                ["", "ngModelGroup", ""],
                ["", "formGroup", ""],
                ["form", 3, "ngNoForm", ""],
                ["", "ngForm", ""],
              ],
              hostVars: 16,
              hostBindings: function (t, r) {
                2 & t &&
                  Vo("ng-untouched", r.isUntouched)("ng-touched", r.isTouched)(
                    "ng-pristine",
                    r.isPristine
                  )("ng-dirty", r.isDirty)("ng-valid", r.isValid)(
                    "ng-invalid",
                    r.isInvalid
                  )("ng-pending", r.isPending)("ng-submitted", r.isSubmitted);
              },
              features: [Ae],
            })),
            n
          );
        })();
      const ga = "VALID",
        xl = "INVALID",
        Zi = "PENDING",
        ma = "DISABLED";
      function Kh(n) {
        return (Sl(n) ? n.validators : n) || null;
      }
      function Xb(n) {
        return Array.isArray(n) ? $h(n) : n || null;
      }
      function Qh(n, e) {
        return (Sl(e) ? e.asyncValidators : n) || null;
      }
      function ew(n) {
        return Array.isArray(n) ? Hh(n) : n || null;
      }
      function Sl(n) {
        return null != n && !Array.isArray(n) && "object" == typeof n;
      }
      class rw {
        constructor(e, t) {
          (this._pendingDirty = !1),
            (this._hasOwnPendingAsyncValidator = !1),
            (this._pendingTouched = !1),
            (this._onCollectionChange = () => {}),
            (this._parent = null),
            (this.pristine = !0),
            (this.touched = !1),
            (this._onDisabledChange = []),
            (this._rawValidators = e),
            (this._rawAsyncValidators = t),
            (this._composedValidatorFn = Xb(this._rawValidators)),
            (this._composedAsyncValidatorFn = ew(this._rawAsyncValidators));
        }
        get validator() {
          return this._composedValidatorFn;
        }
        set validator(e) {
          this._rawValidators = this._composedValidatorFn = e;
        }
        get asyncValidator() {
          return this._composedAsyncValidatorFn;
        }
        set asyncValidator(e) {
          this._rawAsyncValidators = this._composedAsyncValidatorFn = e;
        }
        get parent() {
          return this._parent;
        }
        get valid() {
          return this.status === ga;
        }
        get invalid() {
          return this.status === xl;
        }
        get pending() {
          return this.status == Zi;
        }
        get disabled() {
          return this.status === ma;
        }
        get enabled() {
          return this.status !== ma;
        }
        get dirty() {
          return !this.pristine;
        }
        get untouched() {
          return !this.touched;
        }
        get updateOn() {
          return this._updateOn
            ? this._updateOn
            : this.parent
            ? this.parent.updateOn
            : "change";
        }
        setValidators(e) {
          (this._rawValidators = e), (this._composedValidatorFn = Xb(e));
        }
        setAsyncValidators(e) {
          (this._rawAsyncValidators = e),
            (this._composedAsyncValidatorFn = ew(e));
        }
        addValidators(e) {
          this.setValidators(Kb(e, this._rawValidators));
        }
        addAsyncValidators(e) {
          this.setAsyncValidators(Kb(e, this._rawAsyncValidators));
        }
        removeValidators(e) {
          this.setValidators(Qb(e, this._rawValidators));
        }
        removeAsyncValidators(e) {
          this.setAsyncValidators(Qb(e, this._rawAsyncValidators));
        }
        hasValidator(e) {
          return Ol(this._rawValidators, e);
        }
        hasAsyncValidator(e) {
          return Ol(this._rawAsyncValidators, e);
        }
        clearValidators() {
          this.validator = null;
        }
        clearAsyncValidators() {
          this.asyncValidator = null;
        }
        markAsTouched(e = {}) {
          (this.touched = !0),
            this._parent && !e.onlySelf && this._parent.markAsTouched(e);
        }
        markAllAsTouched() {
          this.markAsTouched({ onlySelf: !0 }),
            this._forEachChild((e) => e.markAllAsTouched());
        }
        markAsUntouched(e = {}) {
          (this.touched = !1),
            (this._pendingTouched = !1),
            this._forEachChild((t) => {
              t.markAsUntouched({ onlySelf: !0 });
            }),
            this._parent && !e.onlySelf && this._parent._updateTouched(e);
        }
        markAsDirty(e = {}) {
          (this.pristine = !1),
            this._parent && !e.onlySelf && this._parent.markAsDirty(e);
        }
        markAsPristine(e = {}) {
          (this.pristine = !0),
            (this._pendingDirty = !1),
            this._forEachChild((t) => {
              t.markAsPristine({ onlySelf: !0 });
            }),
            this._parent && !e.onlySelf && this._parent._updatePristine(e);
        }
        markAsPending(e = {}) {
          (this.status = Zi),
            !1 !== e.emitEvent && this.statusChanges.emit(this.status),
            this._parent && !e.onlySelf && this._parent.markAsPending(e);
        }
        disable(e = {}) {
          const t = this._parentMarkedDirty(e.onlySelf);
          (this.status = ma),
            (this.errors = null),
            this._forEachChild((r) => {
              r.disable({ ...e, onlySelf: !0 });
            }),
            this._updateValue(),
            !1 !== e.emitEvent &&
              (this.valueChanges.emit(this.value),
              this.statusChanges.emit(this.status)),
            this._updateAncestors({ ...e, skipPristineCheck: t }),
            this._onDisabledChange.forEach((r) => r(!0));
        }
        enable(e = {}) {
          const t = this._parentMarkedDirty(e.onlySelf);
          (this.status = ga),
            this._forEachChild((r) => {
              r.enable({ ...e, onlySelf: !0 });
            }),
            this.updateValueAndValidity({
              onlySelf: !0,
              emitEvent: e.emitEvent,
            }),
            this._updateAncestors({ ...e, skipPristineCheck: t }),
            this._onDisabledChange.forEach((r) => r(!1));
        }
        _updateAncestors(e) {
          this._parent &&
            !e.onlySelf &&
            (this._parent.updateValueAndValidity(e),
            e.skipPristineCheck || this._parent._updatePristine(),
            this._parent._updateTouched());
        }
        setParent(e) {
          this._parent = e;
        }
        getRawValue() {
          return this.value;
        }
        updateValueAndValidity(e = {}) {
          this._setInitialStatus(),
            this._updateValue(),
            this.enabled &&
              (this._cancelExistingSubscription(),
              (this.errors = this._runValidator()),
              (this.status = this._calculateStatus()),
              (this.status === ga || this.status === Zi) &&
                this._runAsyncValidator(e.emitEvent)),
            !1 !== e.emitEvent &&
              (this.valueChanges.emit(this.value),
              this.statusChanges.emit(this.status)),
            this._parent &&
              !e.onlySelf &&
              this._parent.updateValueAndValidity(e);
        }
        _updateTreeValidity(e = { emitEvent: !0 }) {
          this._forEachChild((t) => t._updateTreeValidity(e)),
            this.updateValueAndValidity({
              onlySelf: !0,
              emitEvent: e.emitEvent,
            });
        }
        _setInitialStatus() {
          this.status = this._allControlsDisabled() ? ma : ga;
        }
        _runValidator() {
          return this.validator ? this.validator(this) : null;
        }
        _runAsyncValidator(e) {
          if (this.asyncValidator) {
            (this.status = Zi), (this._hasOwnPendingAsyncValidator = !0);
            const t = Bb(this.asyncValidator(this));
            this._asyncValidationSubscription = t.subscribe((r) => {
              (this._hasOwnPendingAsyncValidator = !1),
                this.setErrors(r, { emitEvent: e });
            });
          }
        }
        _cancelExistingSubscription() {
          this._asyncValidationSubscription &&
            (this._asyncValidationSubscription.unsubscribe(),
            (this._hasOwnPendingAsyncValidator = !1));
        }
        setErrors(e, t = {}) {
          (this.errors = e), this._updateControlsErrors(!1 !== t.emitEvent);
        }
        get(e) {
          let t = e;
          return null == t ||
            (Array.isArray(t) || (t = t.split(".")), 0 === t.length)
            ? null
            : t.reduce((r, o) => r && r._find(o), this);
        }
        getError(e, t) {
          const r = t ? this.get(t) : this;
          return r && r.errors ? r.errors[e] : null;
        }
        hasError(e, t) {
          return !!this.getError(e, t);
        }
        get root() {
          let e = this;
          for (; e._parent; ) e = e._parent;
          return e;
        }
        _updateControlsErrors(e) {
          (this.status = this._calculateStatus()),
            e && this.statusChanges.emit(this.status),
            this._parent && this._parent._updateControlsErrors(e);
        }
        _initObservables() {
          (this.valueChanges = new it()), (this.statusChanges = new it());
        }
        _calculateStatus() {
          return this._allControlsDisabled()
            ? ma
            : this.errors
            ? xl
            : this._hasOwnPendingAsyncValidator ||
              this._anyControlsHaveStatus(Zi)
            ? Zi
            : this._anyControlsHaveStatus(xl)
            ? xl
            : ga;
        }
        _anyControlsHaveStatus(e) {
          return this._anyControls((t) => t.status === e);
        }
        _anyControlsDirty() {
          return this._anyControls((e) => e.dirty);
        }
        _anyControlsTouched() {
          return this._anyControls((e) => e.touched);
        }
        _updatePristine(e = {}) {
          (this.pristine = !this._anyControlsDirty()),
            this._parent && !e.onlySelf && this._parent._updatePristine(e);
        }
        _updateTouched(e = {}) {
          (this.touched = this._anyControlsTouched()),
            this._parent && !e.onlySelf && this._parent._updateTouched(e);
        }
        _registerOnCollectionChange(e) {
          this._onCollectionChange = e;
        }
        _setUpdateStrategy(e) {
          Sl(e) && null != e.updateOn && (this._updateOn = e.updateOn);
        }
        _parentMarkedDirty(e) {
          return (
            !e &&
            !(!this._parent || !this._parent.dirty) &&
            !this._parent._anyControlsDirty()
          );
        }
        _find(e) {
          return null;
        }
      }
      class Kr extends rw {
        constructor(e, t, r) {
          super(Kh(t), Qh(r, t)),
            (this.controls = e),
            this._initObservables(),
            this._setUpdateStrategy(t),
            this._setUpControls(),
            this.updateValueAndValidity({
              onlySelf: !0,
              emitEvent: !!this.asyncValidator,
            });
        }
        registerControl(e, t) {
          return this.controls[e]
            ? this.controls[e]
            : ((this.controls[e] = t),
              t.setParent(this),
              t._registerOnCollectionChange(this._onCollectionChange),
              t);
        }
        addControl(e, t, r = {}) {
          this.registerControl(e, t),
            this.updateValueAndValidity({ emitEvent: r.emitEvent }),
            this._onCollectionChange();
        }
        removeControl(e, t = {}) {
          this.controls[e] &&
            this.controls[e]._registerOnCollectionChange(() => {}),
            delete this.controls[e],
            this.updateValueAndValidity({ emitEvent: t.emitEvent }),
            this._onCollectionChange();
        }
        setControl(e, t, r = {}) {
          this.controls[e] &&
            this.controls[e]._registerOnCollectionChange(() => {}),
            delete this.controls[e],
            t && this.registerControl(e, t),
            this.updateValueAndValidity({ emitEvent: r.emitEvent }),
            this._onCollectionChange();
        }
        contains(e) {
          return this.controls.hasOwnProperty(e) && this.controls[e].enabled;
        }
        setValue(e, t = {}) {
          (function nw(n, e, t) {
            n._forEachChild((r, o) => {
              if (void 0 === t[o]) throw new M(1002, "");
            });
          })(this, 0, e),
            Object.keys(e).forEach((r) => {
              (function tw(n, e, t) {
                const r = n.controls;
                if (!(e ? Object.keys(r) : r).length) throw new M(1e3, "");
                if (!r[t]) throw new M(1001, "");
              })(this, !0, r),
                this.controls[r].setValue(e[r], {
                  onlySelf: !0,
                  emitEvent: t.emitEvent,
                });
            }),
            this.updateValueAndValidity(t);
        }
        patchValue(e, t = {}) {
          null != e &&
            (Object.keys(e).forEach((r) => {
              const o = this.controls[r];
              o && o.patchValue(e[r], { onlySelf: !0, emitEvent: t.emitEvent });
            }),
            this.updateValueAndValidity(t));
        }
        reset(e = {}, t = {}) {
          this._forEachChild((r, o) => {
            r.reset(e[o], { onlySelf: !0, emitEvent: t.emitEvent });
          }),
            this._updatePristine(t),
            this._updateTouched(t),
            this.updateValueAndValidity(t);
        }
        getRawValue() {
          return this._reduceChildren(
            {},
            (e, t, r) => ((e[r] = t.getRawValue()), e)
          );
        }
        _syncPendingControls() {
          let e = this._reduceChildren(
            !1,
            (t, r) => !!r._syncPendingControls() || t
          );
          return e && this.updateValueAndValidity({ onlySelf: !0 }), e;
        }
        _forEachChild(e) {
          Object.keys(this.controls).forEach((t) => {
            const r = this.controls[t];
            r && e(r, t);
          });
        }
        _setUpControls() {
          this._forEachChild((e) => {
            e.setParent(this),
              e._registerOnCollectionChange(this._onCollectionChange);
          });
        }
        _updateValue() {
          this.value = this._reduceValue();
        }
        _anyControls(e) {
          for (const [t, r] of Object.entries(this.controls))
            if (this.contains(t) && e(r)) return !0;
          return !1;
        }
        _reduceValue() {
          return this._reduceChildren(
            {},
            (t, r, o) => ((r.enabled || this.disabled) && (t[o] = r.value), t)
          );
        }
        _reduceChildren(e, t) {
          let r = e;
          return (
            this._forEachChild((o, i) => {
              r = t(r, o, i);
            }),
            r
          );
        }
        _allControlsDisabled() {
          for (const e of Object.keys(this.controls))
            if (this.controls[e].enabled) return !1;
          return Object.keys(this.controls).length > 0 || this.disabled;
        }
        _find(e) {
          return this.controls.hasOwnProperty(e) ? this.controls[e] : null;
        }
      }
      function Al(n, e) {
        return [...e.path, n];
      }
      function _a(n, e) {
        Zh(n, e),
          e.valueAccessor.writeValue(n.value),
          n.disabled && e.valueAccessor.setDisabledState?.(!0),
          (function QN(n, e) {
            e.valueAccessor.registerOnChange((t) => {
              (n._pendingValue = t),
                (n._pendingChange = !0),
                (n._pendingDirty = !0),
                "change" === n.updateOn && ow(n, e);
            });
          })(n, e),
          (function YN(n, e) {
            const t = (r, o) => {
              e.valueAccessor.writeValue(r), o && e.viewToModelUpdate(r);
            };
            n.registerOnChange(t),
              e._registerOnDestroy(() => {
                n._unregisterOnChange(t);
              });
          })(n, e),
          (function ZN(n, e) {
            e.valueAccessor.registerOnTouched(() => {
              (n._pendingTouched = !0),
                "blur" === n.updateOn && n._pendingChange && ow(n, e),
                "submit" !== n.updateOn && n.markAsTouched();
            });
          })(n, e),
          (function KN(n, e) {
            if (e.valueAccessor.setDisabledState) {
              const t = (r) => {
                e.valueAccessor.setDisabledState(r);
              };
              n.registerOnDisabledChange(t),
                e._registerOnDestroy(() => {
                  n._unregisterOnDisabledChange(t);
                });
            }
          })(n, e);
      }
      function Tl(n, e, t = !0) {
        const r = () => {};
        e.valueAccessor &&
          (e.valueAccessor.registerOnChange(r),
          e.valueAccessor.registerOnTouched(r)),
          kl(n, e),
          n &&
            (e._invokeOnDestroyCallbacks(),
            n._registerOnCollectionChange(() => {}));
      }
      function Il(n, e) {
        n.forEach((t) => {
          t.registerOnValidatorChange && t.registerOnValidatorChange(e);
        });
      }
      function Zh(n, e) {
        const t = Wb(n);
        null !== e.validator
          ? n.setValidators(Gb(t, e.validator))
          : "function" == typeof t && n.setValidators([t]);
        const r = qb(n);
        null !== e.asyncValidator
          ? n.setAsyncValidators(Gb(r, e.asyncValidator))
          : "function" == typeof r && n.setAsyncValidators([r]);
        const o = () => n.updateValueAndValidity();
        Il(e._rawValidators, o), Il(e._rawAsyncValidators, o);
      }
      function kl(n, e) {
        let t = !1;
        if (null !== n) {
          if (null !== e.validator) {
            const o = Wb(n);
            if (Array.isArray(o) && o.length > 0) {
              const i = o.filter((s) => s !== e.validator);
              i.length !== o.length && ((t = !0), n.setValidators(i));
            }
          }
          if (null !== e.asyncValidator) {
            const o = qb(n);
            if (Array.isArray(o) && o.length > 0) {
              const i = o.filter((s) => s !== e.asyncValidator);
              i.length !== o.length && ((t = !0), n.setAsyncValidators(i));
            }
          }
        }
        const r = () => {};
        return Il(e._rawValidators, r), Il(e._rawAsyncValidators, r), t;
      }
      function ow(n, e) {
        n._pendingDirty && n.markAsDirty(),
          n.setValue(n._pendingValue, { emitModelToViewChange: !1 }),
          e.viewToModelUpdate(n._pendingValue),
          (n._pendingChange = !1);
      }
      function Yh(n, e) {
        if (!n.hasOwnProperty("model")) return !1;
        const t = n.model;
        return !!t.isFirstChange() || !Object.is(e, t.currentValue);
      }
      function Jh(n, e) {
        if (!e) return null;
        let t, r, o;
        return (
          Array.isArray(e),
          e.forEach((i) => {
            i.constructor === Go
              ? (t = i)
              : (function eR(n) {
                  return Object.getPrototypeOf(n.constructor) === zo;
                })(i)
              ? (r = i)
              : (o = i);
          }),
          o || r || t || null
        );
      }
      function cw(n, e) {
        const t = n.indexOf(e);
        t > -1 && n.splice(t, 1);
      }
      function lw(n) {
        return (
          "object" == typeof n &&
          null !== n &&
          2 === Object.keys(n).length &&
          "value" in n &&
          "disabled" in n
        );
      }
      const wn = class extends rw {
        constructor(e = null, t, r) {
          super(Kh(t), Qh(r, t)),
            (this.defaultValue = null),
            (this._onChange = []),
            (this._pendingChange = !1),
            this._applyFormState(e),
            this._setUpdateStrategy(t),
            this._initObservables(),
            this.updateValueAndValidity({
              onlySelf: !0,
              emitEvent: !!this.asyncValidator,
            }),
            Sl(t) &&
              (t.nonNullable || t.initialValueIsDefault) &&
              (this.defaultValue = lw(e) ? e.value : e);
        }
        setValue(e, t = {}) {
          (this.value = this._pendingValue = e),
            this._onChange.length &&
              !1 !== t.emitModelToViewChange &&
              this._onChange.forEach((r) =>
                r(this.value, !1 !== t.emitViewToModelChange)
              ),
            this.updateValueAndValidity(t);
        }
        patchValue(e, t = {}) {
          this.setValue(e, t);
        }
        reset(e = this.defaultValue, t = {}) {
          this._applyFormState(e),
            this.markAsPristine(t),
            this.markAsUntouched(t),
            this.setValue(this.value, t),
            (this._pendingChange = !1);
        }
        _updateValue() {}
        _anyControls(e) {
          return !1;
        }
        _allControlsDisabled() {
          return this.disabled;
        }
        registerOnChange(e) {
          this._onChange.push(e);
        }
        _unregisterOnChange(e) {
          cw(this._onChange, e);
        }
        registerOnDisabledChange(e) {
          this._onDisabledChange.push(e);
        }
        _unregisterOnDisabledChange(e) {
          cw(this._onDisabledChange, e);
        }
        _forEachChild(e) {}
        _syncPendingControls() {
          return !(
            "submit" !== this.updateOn ||
            (this._pendingDirty && this.markAsDirty(),
            this._pendingTouched && this.markAsTouched(),
            !this._pendingChange) ||
            (this.setValue(this._pendingValue, {
              onlySelf: !0,
              emitModelToViewChange: !1,
            }),
            0)
          );
        }
        _applyFormState(e) {
          lw(e)
            ? ((this.value = this._pendingValue = e.value),
              e.disabled
                ? this.disable({ onlySelf: !0, emitEvent: !1 })
                : this.enable({ onlySelf: !0, emitEvent: !1 }))
            : (this.value = this._pendingValue = e);
        }
      };
      let uw = (() => {
        class n extends nn {
          ngOnInit() {
            this._checkParentType(), this.formDirective.addFormGroup(this);
          }
          ngOnDestroy() {
            this.formDirective && this.formDirective.removeFormGroup(this);
          }
          get control() {
            return this.formDirective.getFormGroup(this);
          }
          get path() {
            return Al(
              null == this.name ? this.name : this.name.toString(),
              this._parent
            );
          }
          get formDirective() {
            return this._parent ? this._parent.formDirective : null;
          }
          _checkParentType() {}
        }
        return (
          (n.ɵfac = (function () {
            let e;
            return function (r) {
              return (e || (e = Rt(n)))(r || n);
            };
          })()),
          (n.ɵdir = G({ type: n, features: [Ae] })),
          n
        );
      })();
      const iR = { provide: _o, useExisting: Be(() => ep) },
        fw = (() => Promise.resolve())();
      let ep = (() => {
          class n extends _o {
            constructor(t, r, o, i, s) {
              super(),
                (this._changeDetectorRef = s),
                (this.control = new wn()),
                (this._registered = !1),
                (this.update = new it()),
                (this._parent = t),
                this._setValidators(r),
                this._setAsyncValidators(o),
                (this.valueAccessor = Jh(0, i));
            }
            ngOnChanges(t) {
              if ((this._checkForErrors(), !this._registered || "name" in t)) {
                if (
                  this._registered &&
                  (this._checkName(), this.formDirective)
                ) {
                  const r = t.name.previousValue;
                  this.formDirective.removeControl({
                    name: r,
                    path: this._getPath(r),
                  });
                }
                this._setUpControl();
              }
              "isDisabled" in t && this._updateDisabled(t),
                Yh(t, this.viewModel) &&
                  (this._updateValue(this.model),
                  (this.viewModel = this.model));
            }
            ngOnDestroy() {
              this.formDirective && this.formDirective.removeControl(this);
            }
            get path() {
              return this._getPath(this.name);
            }
            get formDirective() {
              return this._parent ? this._parent.formDirective : null;
            }
            viewToModelUpdate(t) {
              (this.viewModel = t), this.update.emit(t);
            }
            _setUpControl() {
              this._setUpdateStrategy(),
                this._isStandalone()
                  ? this._setUpStandalone()
                  : this.formDirective.addControl(this),
                (this._registered = !0);
            }
            _setUpdateStrategy() {
              this.options &&
                null != this.options.updateOn &&
                (this.control._updateOn = this.options.updateOn);
            }
            _isStandalone() {
              return (
                !this._parent || !(!this.options || !this.options.standalone)
              );
            }
            _setUpStandalone() {
              _a(this.control, this),
                this.control.updateValueAndValidity({ emitEvent: !1 });
            }
            _checkForErrors() {
              this._isStandalone() || this._checkParentType(),
                this._checkName();
            }
            _checkParentType() {}
            _checkName() {
              this.options &&
                this.options.name &&
                (this.name = this.options.name),
                this._isStandalone();
            }
            _updateValue(t) {
              fw.then(() => {
                this.control.setValue(t, { emitViewToModelChange: !1 }),
                  this._changeDetectorRef?.markForCheck();
              });
            }
            _updateDisabled(t) {
              const r = t.isDisabled.currentValue,
                o = 0 !== r && Gr(r);
              fw.then(() => {
                o && !this.control.disabled
                  ? this.control.disable()
                  : !o && this.control.disabled && this.control.enable(),
                  this._changeDetectorRef?.markForCheck();
              });
            }
            _getPath(t) {
              return this._parent ? Al(t, this._parent) : [t];
            }
          }
          return (
            (n.ɵfac = function (t) {
              return new (t || n)(
                w(nn, 9),
                w(jt, 10),
                w(mo, 10),
                w(br, 10),
                w(ol, 8)
              );
            }),
            (n.ɵdir = G({
              type: n,
              selectors: [
                [
                  "",
                  "ngModel",
                  "",
                  3,
                  "formControlName",
                  "",
                  3,
                  "formControl",
                  "",
                ],
              ],
              inputs: {
                name: "name",
                isDisabled: ["disabled", "isDisabled"],
                model: ["ngModel", "model"],
                options: ["ngModelOptions", "options"],
              },
              outputs: { update: "ngModelChange" },
              exportAs: ["ngModel"],
              features: [Ze([iR]), Ae, kn],
            })),
            n
          );
        })(),
        va = (() => {
          class n {}
          return (
            (n.ɵfac = function (t) {
              return new (t || n)();
            }),
            (n.ɵdir = G({
              type: n,
              selectors: [
                ["form", 3, "ngNoForm", "", 3, "ngNativeValidate", ""],
              ],
              hostAttrs: ["novalidate", ""],
            })),
            n
          );
        })();
      const sR = { provide: br, useExisting: Be(() => Nl), multi: !0 };
      let Nl = (() => {
          class n extends zo {
            writeValue(t) {
              this.setProperty("value", t ?? "");
            }
            registerOnChange(t) {
              this.onChange = (r) => {
                t("" == r ? null : parseFloat(r));
              };
            }
          }
          return (
            (n.ɵfac = (function () {
              let e;
              return function (r) {
                return (e || (e = Rt(n)))(r || n);
              };
            })()),
            (n.ɵdir = G({
              type: n,
              selectors: [
                ["input", "type", "number", "formControlName", ""],
                ["input", "type", "number", "formControl", ""],
                ["input", "type", "number", "ngModel", ""],
              ],
              hostBindings: function (t, r) {
                1 & t &&
                  me("input", function (i) {
                    return r.onChange(i.target.value);
                  })("blur", function () {
                    return r.onTouched();
                  });
              },
              features: [Ze([sR]), Ae],
            })),
            n
          );
        })(),
        hw = (() => {
          class n {}
          return (
            (n.ɵfac = function (t) {
              return new (t || n)();
            }),
            (n.ɵmod = yt({ type: n })),
            (n.ɵinj = ft({})),
            n
          );
        })();
      const tp = new F("NgModelWithFormControlWarning"),
        dR = { provide: nn, useExisting: Be(() => Wo) };
      let Wo = (() => {
        class n extends nn {
          constructor(t, r) {
            super(),
              (this.validators = t),
              (this.asyncValidators = r),
              (this.submitted = !1),
              (this._onCollectionChange = () => this._updateDomValue()),
              (this.directives = []),
              (this.form = null),
              (this.ngSubmit = new it()),
              this._setValidators(t),
              this._setAsyncValidators(r);
          }
          ngOnChanges(t) {
            this._checkFormPresent(),
              t.hasOwnProperty("form") &&
                (this._updateValidators(),
                this._updateDomValue(),
                this._updateRegistrations(),
                (this._oldForm = this.form));
          }
          ngOnDestroy() {
            this.form &&
              (kl(this.form, this),
              this.form._onCollectionChange === this._onCollectionChange &&
                this.form._registerOnCollectionChange(() => {}));
          }
          get formDirective() {
            return this;
          }
          get control() {
            return this.form;
          }
          get path() {
            return [];
          }
          addControl(t) {
            const r = this.form.get(t.path);
            return (
              _a(r, t),
              r.updateValueAndValidity({ emitEvent: !1 }),
              this.directives.push(t),
              r
            );
          }
          getControl(t) {
            return this.form.get(t.path);
          }
          removeControl(t) {
            Tl(t.control || null, t, !1),
              (function tR(n, e) {
                const t = n.indexOf(e);
                t > -1 && n.splice(t, 1);
              })(this.directives, t);
          }
          addFormGroup(t) {
            this._setUpFormContainer(t);
          }
          removeFormGroup(t) {
            this._cleanUpFormContainer(t);
          }
          getFormGroup(t) {
            return this.form.get(t.path);
          }
          addFormArray(t) {
            this._setUpFormContainer(t);
          }
          removeFormArray(t) {
            this._cleanUpFormContainer(t);
          }
          getFormArray(t) {
            return this.form.get(t.path);
          }
          updateModel(t, r) {
            this.form.get(t.path).setValue(r);
          }
          onSubmit(t) {
            return (
              (this.submitted = !0),
              (function aw(n, e) {
                n._syncPendingControls(),
                  e.forEach((t) => {
                    const r = t.control;
                    "submit" === r.updateOn &&
                      r._pendingChange &&
                      (t.viewToModelUpdate(r._pendingValue),
                      (r._pendingChange = !1));
                  });
              })(this.form, this.directives),
              this.ngSubmit.emit(t),
              !1
            );
          }
          onReset() {
            this.resetForm();
          }
          resetForm(t) {
            this.form.reset(t), (this.submitted = !1);
          }
          _updateDomValue() {
            this.directives.forEach((t) => {
              const r = t.control,
                o = this.form.get(t.path);
              r !== o &&
                (Tl(r || null, t),
                ((n) => n instanceof wn)(o) && (_a(o, t), (t.control = o)));
            }),
              this.form._updateTreeValidity({ emitEvent: !1 });
          }
          _setUpFormContainer(t) {
            const r = this.form.get(t.path);
            (function iw(n, e) {
              Zh(n, e);
            })(r, t),
              r.updateValueAndValidity({ emitEvent: !1 });
          }
          _cleanUpFormContainer(t) {
            if (this.form) {
              const r = this.form.get(t.path);
              r &&
                (function JN(n, e) {
                  return kl(n, e);
                })(r, t) &&
                r.updateValueAndValidity({ emitEvent: !1 });
            }
          }
          _updateRegistrations() {
            this.form._registerOnCollectionChange(this._onCollectionChange),
              this._oldForm &&
                this._oldForm._registerOnCollectionChange(() => {});
          }
          _updateValidators() {
            Zh(this.form, this), this._oldForm && kl(this._oldForm, this);
          }
          _checkFormPresent() {}
        }
        return (
          (n.ɵfac = function (t) {
            return new (t || n)(w(jt, 10), w(mo, 10));
          }),
          (n.ɵdir = G({
            type: n,
            selectors: [["", "formGroup", ""]],
            hostBindings: function (t, r) {
              1 & t &&
                me("submit", function (i) {
                  return r.onSubmit(i);
                })("reset", function () {
                  return r.onReset();
                });
            },
            inputs: { form: ["formGroup", "form"] },
            outputs: { ngSubmit: "ngSubmit" },
            exportAs: ["ngForm"],
            features: [Ze([dR]), Ae, kn],
          })),
          n
        );
      })();
      const fR = { provide: nn, useExisting: Be(() => Rl) };
      let Rl = (() => {
        class n extends uw {
          constructor(t, r, o) {
            super(),
              (this._parent = t),
              this._setValidators(r),
              this._setAsyncValidators(o);
          }
          _checkParentType() {
            _w(this._parent);
          }
        }
        return (
          (n.ɵfac = function (t) {
            return new (t || n)(w(nn, 13), w(jt, 10), w(mo, 10));
          }),
          (n.ɵdir = G({
            type: n,
            selectors: [["", "formGroupName", ""]],
            inputs: { name: ["formGroupName", "name"] },
            features: [Ze([fR]), Ae],
          })),
          n
        );
      })();
      const hR = { provide: nn, useExisting: Be(() => np) };
      let np = (() => {
        class n extends nn {
          constructor(t, r, o) {
            super(),
              (this._parent = t),
              this._setValidators(r),
              this._setAsyncValidators(o);
          }
          ngOnInit() {
            this._checkParentType(), this.formDirective.addFormArray(this);
          }
          ngOnDestroy() {
            this.formDirective && this.formDirective.removeFormArray(this);
          }
          get control() {
            return this.formDirective.getFormArray(this);
          }
          get formDirective() {
            return this._parent ? this._parent.formDirective : null;
          }
          get path() {
            return Al(
              null == this.name ? this.name : this.name.toString(),
              this._parent
            );
          }
          _checkParentType() {
            _w(this._parent);
          }
        }
        return (
          (n.ɵfac = function (t) {
            return new (t || n)(w(nn, 13), w(jt, 10), w(mo, 10));
          }),
          (n.ɵdir = G({
            type: n,
            selectors: [["", "formArrayName", ""]],
            inputs: { name: ["formArrayName", "name"] },
            features: [Ze([hR]), Ae],
          })),
          n
        );
      })();
      function _w(n) {
        return !(n instanceof Rl || n instanceof Wo || n instanceof np);
      }
      const pR = { provide: _o, useExisting: Be(() => Yi) };
      let Yi = (() => {
          class n extends _o {
            constructor(t, r, o, i, s) {
              super(),
                (this._ngModelWarningConfig = s),
                (this._added = !1),
                (this.update = new it()),
                (this._ngModelWarningSent = !1),
                (this._parent = t),
                this._setValidators(r),
                this._setAsyncValidators(o),
                (this.valueAccessor = Jh(0, i));
            }
            set isDisabled(t) {}
            ngOnChanges(t) {
              this._added || this._setUpControl(),
                Yh(t, this.viewModel) &&
                  ((this.viewModel = this.model),
                  this.formDirective.updateModel(this, this.model));
            }
            ngOnDestroy() {
              this.formDirective && this.formDirective.removeControl(this);
            }
            viewToModelUpdate(t) {
              (this.viewModel = t), this.update.emit(t);
            }
            get path() {
              return Al(
                null == this.name ? this.name : this.name.toString(),
                this._parent
              );
            }
            get formDirective() {
              return this._parent ? this._parent.formDirective : null;
            }
            _checkParentType() {}
            _setUpControl() {
              this._checkParentType(),
                (this.control = this.formDirective.addControl(this)),
                (this._added = !0);
            }
          }
          return (
            (n._ngModelWarningSentOnce = !1),
            (n.ɵfac = function (t) {
              return new (t || n)(
                w(nn, 13),
                w(jt, 10),
                w(mo, 10),
                w(br, 10),
                w(tp, 8)
              );
            }),
            (n.ɵdir = G({
              type: n,
              selectors: [["", "formControlName", ""]],
              inputs: {
                name: ["formControlName", "name"],
                isDisabled: ["disabled", "isDisabled"],
                model: ["ngModel", "model"],
              },
              outputs: { update: "ngModelChange" },
              features: [Ze([pR]), Ae, kn],
            })),
            n
          );
        })(),
        Sw = (() => {
          class n {}
          return (
            (n.ɵfac = function (t) {
              return new (t || n)();
            }),
            (n.ɵmod = yt({ type: n })),
            (n.ɵinj = ft({ imports: [hw] })),
            n
          );
        })(),
        SR = (() => {
          class n {}
          return (
            (n.ɵfac = function (t) {
              return new (t || n)();
            }),
            (n.ɵmod = yt({ type: n })),
            (n.ɵinj = ft({ imports: [Sw] })),
            n
          );
        })(),
        AR = (() => {
          class n {
            static withConfig(t) {
              return {
                ngModule: n,
                providers: [
                  { provide: tp, useValue: t.warnOnNgModelWithFormControl },
                ],
              };
            }
          }
          return (
            (n.ɵfac = function (t) {
              return new (t || n)();
            }),
            (n.ɵmod = yt({ type: n })),
            (n.ɵinj = ft({ imports: [Sw] })),
            n
          );
        })();
      function V(...n) {
        return dt(n, ps(n));
      }
      class $e extends We {
        constructor(e) {
          super(), (this._value = e);
        }
        get value() {
          return this.getValue();
        }
        _subscribe(e) {
          const t = super._subscribe(e);
          return !t.closed && e.next(this._value), t;
        }
        getValue() {
          const { hasError: e, thrownError: t, _value: r } = this;
          if (e) throw t;
          return this._throwIfClosed(), r;
        }
        next(e) {
          super.next((this._value = e));
        }
      }
      const Fl = H(
        (n) =>
          function () {
            n(this),
              (this.name = "EmptyError"),
              (this.message = "no elements in sequence");
          }
      );
      function sp(...n) {
        const e = ps(n),
          t = Fg(n),
          { args: r, keys: o } = Db(n);
        if (0 === r.length) return dt([], e);
        const i = new Re(
          (function IR(n, e, t = St) {
            return (r) => {
              Aw(
                e,
                () => {
                  const { length: o } = n,
                    i = new Array(o);
                  let s = o,
                    a = o;
                  for (let c = 0; c < o; c++)
                    Aw(
                      e,
                      () => {
                        const l = dt(n[c], e);
                        let u = !1;
                        l.subscribe(
                          ye(
                            r,
                            (d) => {
                              (i[c] = d),
                                u || ((u = !0), a--),
                                a || r.next(t(i.slice()));
                            },
                            () => {
                              --s || r.complete();
                            }
                          )
                        );
                      },
                      r
                    );
                },
                r
              );
            };
          })(r, e, o ? (s) => Ob(o, s) : St)
        );
        return t ? i.pipe(Eb(t)) : i;
      }
      function Aw(n, e, t) {
        n ? Ir(t, n, e) : e();
      }
      function Ll(...n) {
        return (function kR() {
          return si(1);
        })()(dt(n, ps(n)));
      }
      function Tw(n) {
        return new Re((e) => {
          An(n()).subscribe(e);
        });
      }
      function Ca(n, e) {
        const t = k(n) ? n : () => n,
          r = (o) => o.error(t());
        return new Re(e ? (o) => e.schedule(r, 0, o) : r);
      }
      function ap() {
        return ae((n, e) => {
          let t = null;
          n._refCount++;
          const r = ye(e, void 0, void 0, void 0, () => {
            if (!n || n._refCount <= 0 || 0 < --n._refCount)
              return void (t = null);
            const o = n._connection,
              i = t;
            (t = null),
              o && (!i || o === i) && o.unsubscribe(),
              e.unsubscribe();
          });
          n.subscribe(r), r.closed || (t = n.connect());
        });
      }
      class Iw extends Re {
        constructor(e, t) {
          super(),
            (this.source = e),
            (this.subjectFactory = t),
            (this._subject = null),
            (this._refCount = 0),
            (this._connection = null),
            ut(e) && (this.lift = e.lift);
        }
        _subscribe(e) {
          return this.getSubject().subscribe(e);
        }
        getSubject() {
          const e = this._subject;
          return (
            (!e || e.isStopped) && (this._subject = this.subjectFactory()),
            this._subject
          );
        }
        _teardown() {
          this._refCount = 0;
          const { _connection: e } = this;
          (this._subject = this._connection = null), e?.unsubscribe();
        }
        connect() {
          let e = this._connection;
          if (!e) {
            e = this._connection = new Ee();
            const t = this.getSubject();
            e.add(
              this.source.subscribe(
                ye(
                  t,
                  void 0,
                  () => {
                    this._teardown(), t.complete();
                  },
                  (r) => {
                    this._teardown(), t.error(r);
                  },
                  () => this._teardown()
                )
              )
            ),
              e.closed && ((this._connection = null), (e = Ee.EMPTY));
          }
          return e;
        }
        refCount() {
          return ap()(this);
        }
      }
      function Mr(n, e) {
        return ae((t, r) => {
          let o = null,
            i = 0,
            s = !1;
          const a = () => s && !o && r.complete();
          t.subscribe(
            ye(
              r,
              (c) => {
                o?.unsubscribe();
                let l = 0;
                const u = i++;
                An(n(c, u)).subscribe(
                  (o = ye(
                    r,
                    (d) => r.next(e ? e(c, d, u, l++) : d),
                    () => {
                      (o = null), a();
                    }
                  ))
                );
              },
              () => {
                (s = !0), a();
              }
            )
          );
        });
      }
      function Ji(n) {
        return n <= 0
          ? () => kr
          : ae((e, t) => {
              let r = 0;
              e.subscribe(
                ye(t, (o) => {
                  ++r <= n && (t.next(o), n <= r && t.complete());
                })
              );
            });
      }
      function kw(...n) {
        const e = ps(n);
        return ae((t, r) => {
          (e ? Ll(n, t, e) : Ll(n, t)).subscribe(r);
        });
      }
      function Dr(n, e) {
        return ae((t, r) => {
          let o = 0;
          t.subscribe(ye(r, (i) => n.call(e, i, o++) && r.next(i)));
        });
      }
      function Vl(n) {
        return ae((e, t) => {
          let r = !1;
          e.subscribe(
            ye(
              t,
              (o) => {
                (r = !0), t.next(o);
              },
              () => {
                r || t.next(n), t.complete();
              }
            )
          );
        });
      }
      function Nw(n = NR) {
        return ae((e, t) => {
          let r = !1;
          e.subscribe(
            ye(
              t,
              (o) => {
                (r = !0), t.next(o);
              },
              () => (r ? t.complete() : t.error(n()))
            )
          );
        });
      }
      function NR() {
        return new Fl();
      }
      function yo(n, e) {
        const t = arguments.length >= 2;
        return (r) =>
          r.pipe(
            n ? Dr((o, i) => n(o, i, r)) : St,
            Ji(1),
            t ? Vl(e) : Nw(() => new Fl())
          );
      }
      function vo(n, e) {
        return k(e) ? At(n, e, 1) : At(n, 1);
      }
      function He(n, e, t) {
        const r = k(n) || e || t ? { next: n, error: e, complete: t } : n;
        return r
          ? ae((o, i) => {
              var s;
              null === (s = r.subscribe) || void 0 === s || s.call(r);
              let a = !0;
              o.subscribe(
                ye(
                  i,
                  (c) => {
                    var l;
                    null === (l = r.next) || void 0 === l || l.call(r, c),
                      i.next(c);
                  },
                  () => {
                    var c;
                    (a = !1),
                      null === (c = r.complete) || void 0 === c || c.call(r),
                      i.complete();
                  },
                  (c) => {
                    var l;
                    (a = !1),
                      null === (l = r.error) || void 0 === l || l.call(r, c),
                      i.error(c);
                  },
                  () => {
                    var c, l;
                    a &&
                      (null === (c = r.unsubscribe) ||
                        void 0 === c ||
                        c.call(r)),
                      null === (l = r.finalize) || void 0 === l || l.call(r);
                  }
                )
              );
            })
          : St;
      }
      function Er(n) {
        return ae((e, t) => {
          let i,
            r = null,
            o = !1;
          (r = e.subscribe(
            ye(t, void 0, void 0, (s) => {
              (i = An(n(s, Er(n)(e)))),
                r ? (r.unsubscribe(), (r = null), i.subscribe(t)) : (o = !0);
            })
          )),
            o && (r.unsubscribe(), (r = null), i.subscribe(t));
        });
      }
      function RR(n, e, t, r, o) {
        return (i, s) => {
          let a = t,
            c = e,
            l = 0;
          i.subscribe(
            ye(
              s,
              (u) => {
                const d = l++;
                (c = a ? n(c, u, d) : ((a = !0), u)), r && s.next(c);
              },
              o &&
                (() => {
                  a && s.next(c), s.complete();
                })
            )
          );
        };
      }
      function Rw(n, e) {
        return ae(RR(n, e, arguments.length >= 2, !0));
      }
      function cp(n) {
        return n <= 0
          ? () => kr
          : ae((e, t) => {
              let r = [];
              e.subscribe(
                ye(
                  t,
                  (o) => {
                    r.push(o), n < r.length && r.shift();
                  },
                  () => {
                    for (const o of r) t.next(o);
                    t.complete();
                  },
                  void 0,
                  () => {
                    r = null;
                  }
                )
              );
            });
      }
      function Fw(n, e) {
        const t = arguments.length >= 2;
        return (r) =>
          r.pipe(
            n ? Dr((o, i) => n(o, i, r)) : St,
            cp(1),
            t ? Vl(e) : Nw(() => new Fl())
          );
      }
      function lp(n) {
        return ae((e, t) => {
          try {
            e.subscribe(t);
          } finally {
            t.add(n);
          }
        });
      }
      const fe = "primary",
        ba = Symbol("RouteTitle");
      class VR {
        constructor(e) {
          this.params = e || {};
        }
        has(e) {
          return Object.prototype.hasOwnProperty.call(this.params, e);
        }
        get(e) {
          if (this.has(e)) {
            const t = this.params[e];
            return Array.isArray(t) ? t[0] : t;
          }
          return null;
        }
        getAll(e) {
          if (this.has(e)) {
            const t = this.params[e];
            return Array.isArray(t) ? t : [t];
          }
          return [];
        }
        get keys() {
          return Object.keys(this.params);
        }
      }
      function Xi(n) {
        return new VR(n);
      }
      function BR(n, e, t) {
        const r = t.path.split("/");
        if (
          r.length > n.length ||
          ("full" === t.pathMatch && (e.hasChildren() || r.length < n.length))
        )
          return null;
        const o = {};
        for (let i = 0; i < r.length; i++) {
          const s = r[i],
            a = n[i];
          if (s.startsWith(":")) o[s.substring(1)] = a;
          else if (s !== a.path) return null;
        }
        return { consumed: n.slice(0, r.length), posParams: o };
      }
      function Or(n, e) {
        const t = n ? Object.keys(n) : void 0,
          r = e ? Object.keys(e) : void 0;
        if (!t || !r || t.length != r.length) return !1;
        let o;
        for (let i = 0; i < t.length; i++)
          if (((o = t[i]), !Lw(n[o], e[o]))) return !1;
        return !0;
      }
      function Lw(n, e) {
        if (Array.isArray(n) && Array.isArray(e)) {
          if (n.length !== e.length) return !1;
          const t = [...n].sort(),
            r = [...e].sort();
          return t.every((o, i) => r[i] === o);
        }
        return n === e;
      }
      function Vw(n) {
        return Array.prototype.concat.apply([], n);
      }
      function Bw(n) {
        return n.length > 0 ? n[n.length - 1] : null;
      }
      function Tt(n, e) {
        for (const t in n) n.hasOwnProperty(t) && e(n[t], t);
      }
      function Co(n) {
        return Nf(n) ? n : Ks(n) ? dt(Promise.resolve(n)) : V(n);
      }
      const $R = {
          exact: function $w(n, e, t) {
            if (
              !Qo(n.segments, e.segments) ||
              !Bl(n.segments, e.segments, t) ||
              n.numberOfChildren !== e.numberOfChildren
            )
              return !1;
            for (const r in e.children)
              if (!n.children[r] || !$w(n.children[r], e.children[r], t))
                return !1;
            return !0;
          },
          subset: Hw,
        },
        jw = {
          exact: function HR(n, e) {
            return Or(n, e);
          },
          subset: function zR(n, e) {
            return (
              Object.keys(e).length <= Object.keys(n).length &&
              Object.keys(e).every((t) => Lw(n[t], e[t]))
            );
          },
          ignored: () => !0,
        };
      function Uw(n, e, t) {
        return (
          $R[t.paths](n.root, e.root, t.matrixParams) &&
          jw[t.queryParams](n.queryParams, e.queryParams) &&
          !("exact" === t.fragment && n.fragment !== e.fragment)
        );
      }
      function Hw(n, e, t) {
        return zw(n, e, e.segments, t);
      }
      function zw(n, e, t, r) {
        if (n.segments.length > t.length) {
          const o = n.segments.slice(0, t.length);
          return !(!Qo(o, t) || e.hasChildren() || !Bl(o, t, r));
        }
        if (n.segments.length === t.length) {
          if (!Qo(n.segments, t) || !Bl(n.segments, t, r)) return !1;
          for (const o in e.children)
            if (!n.children[o] || !Hw(n.children[o], e.children[o], r))
              return !1;
          return !0;
        }
        {
          const o = t.slice(0, n.segments.length),
            i = t.slice(n.segments.length);
          return (
            !!(Qo(n.segments, o) && Bl(n.segments, o, r) && n.children[fe]) &&
            zw(n.children[fe], e, i, r)
          );
        }
      }
      function Bl(n, e, t) {
        return e.every((r, o) => jw[t](n[o].parameters, r.parameters));
      }
      class Ko {
        constructor(e, t, r) {
          (this.root = e), (this.queryParams = t), (this.fragment = r);
        }
        get queryParamMap() {
          return (
            this._queryParamMap || (this._queryParamMap = Xi(this.queryParams)),
            this._queryParamMap
          );
        }
        toString() {
          return qR.serialize(this);
        }
      }
      class he {
        constructor(e, t) {
          (this.segments = e),
            (this.children = t),
            (this.parent = null),
            Tt(t, (r, o) => (r.parent = this));
        }
        hasChildren() {
          return this.numberOfChildren > 0;
        }
        get numberOfChildren() {
          return Object.keys(this.children).length;
        }
        toString() {
          return jl(this);
        }
      }
      class wa {
        constructor(e, t) {
          (this.path = e), (this.parameters = t);
        }
        get parameterMap() {
          return (
            this._parameterMap || (this._parameterMap = Xi(this.parameters)),
            this._parameterMap
          );
        }
        toString() {
          return Kw(this);
        }
      }
      function Qo(n, e) {
        return n.length === e.length && n.every((t, r) => t.path === e[r].path);
      }
      let Gw = (() => {
        class n {}
        return (
          (n.ɵfac = function (t) {
            return new (t || n)();
          }),
          (n.ɵprov = R({
            token: n,
            factory: function () {
              return new dp();
            },
            providedIn: "root",
          })),
          n
        );
      })();
      class dp {
        parse(e) {
          const t = new nF(e);
          return new Ko(
            t.parseRootSegment(),
            t.parseQueryParams(),
            t.parseFragment()
          );
        }
        serialize(e) {
          const t = `/${Ma(e.root, !0)}`,
            r = (function ZR(n) {
              const e = Object.keys(n)
                .map((t) => {
                  const r = n[t];
                  return Array.isArray(r)
                    ? r.map((o) => `${Ul(t)}=${Ul(o)}`).join("&")
                    : `${Ul(t)}=${Ul(r)}`;
                })
                .filter((t) => !!t);
              return e.length ? `?${e.join("&")}` : "";
            })(e.queryParams);
          return `${t}${r}${
            "string" == typeof e.fragment
              ? `#${(function KR(n) {
                  return encodeURI(n);
                })(e.fragment)}`
              : ""
          }`;
        }
      }
      const qR = new dp();
      function jl(n) {
        return n.segments.map((e) => Kw(e)).join("/");
      }
      function Ma(n, e) {
        if (!n.hasChildren()) return jl(n);
        if (e) {
          const t = n.children[fe] ? Ma(n.children[fe], !1) : "",
            r = [];
          return (
            Tt(n.children, (o, i) => {
              i !== fe && r.push(`${i}:${Ma(o, !1)}`);
            }),
            r.length > 0 ? `${t}(${r.join("//")})` : t
          );
        }
        {
          const t = (function WR(n, e) {
            let t = [];
            return (
              Tt(n.children, (r, o) => {
                o === fe && (t = t.concat(e(r, o)));
              }),
              Tt(n.children, (r, o) => {
                o !== fe && (t = t.concat(e(r, o)));
              }),
              t
            );
          })(n, (r, o) =>
            o === fe ? [Ma(n.children[fe], !1)] : [`${o}:${Ma(r, !1)}`]
          );
          return 1 === Object.keys(n.children).length && null != n.children[fe]
            ? `${jl(n)}/${t[0]}`
            : `${jl(n)}/(${t.join("//")})`;
        }
      }
      function Ww(n) {
        return encodeURIComponent(n)
          .replace(/%40/g, "@")
          .replace(/%3A/gi, ":")
          .replace(/%24/g, "$")
          .replace(/%2C/gi, ",");
      }
      function Ul(n) {
        return Ww(n).replace(/%3B/gi, ";");
      }
      function fp(n) {
        return Ww(n)
          .replace(/\(/g, "%28")
          .replace(/\)/g, "%29")
          .replace(/%26/gi, "&");
      }
      function $l(n) {
        return decodeURIComponent(n);
      }
      function qw(n) {
        return $l(n.replace(/\+/g, "%20"));
      }
      function Kw(n) {
        return `${fp(n.path)}${(function QR(n) {
          return Object.keys(n)
            .map((e) => `;${fp(e)}=${fp(n[e])}`)
            .join("");
        })(n.parameters)}`;
      }
      const YR = /^[^\/()?;=#]+/;
      function Hl(n) {
        const e = n.match(YR);
        return e ? e[0] : "";
      }
      const JR = /^[^=?&#]+/,
        eF = /^[^&#]+/;
      class nF {
        constructor(e) {
          (this.url = e), (this.remaining = e);
        }
        parseRootSegment() {
          return (
            this.consumeOptional("/"),
            "" === this.remaining ||
            this.peekStartsWith("?") ||
            this.peekStartsWith("#")
              ? new he([], {})
              : new he([], this.parseChildren())
          );
        }
        parseQueryParams() {
          const e = {};
          if (this.consumeOptional("?"))
            do {
              this.parseQueryParam(e);
            } while (this.consumeOptional("&"));
          return e;
        }
        parseFragment() {
          return this.consumeOptional("#")
            ? decodeURIComponent(this.remaining)
            : null;
        }
        parseChildren() {
          if ("" === this.remaining) return {};
          this.consumeOptional("/");
          const e = [];
          for (
            this.peekStartsWith("(") || e.push(this.parseSegment());
            this.peekStartsWith("/") &&
            !this.peekStartsWith("//") &&
            !this.peekStartsWith("/(");

          )
            this.capture("/"), e.push(this.parseSegment());
          let t = {};
          this.peekStartsWith("/(") &&
            (this.capture("/"), (t = this.parseParens(!0)));
          let r = {};
          return (
            this.peekStartsWith("(") && (r = this.parseParens(!1)),
            (e.length > 0 || Object.keys(t).length > 0) &&
              (r[fe] = new he(e, t)),
            r
          );
        }
        parseSegment() {
          const e = Hl(this.remaining);
          if ("" === e && this.peekStartsWith(";")) throw new M(4009, !1);
          return this.capture(e), new wa($l(e), this.parseMatrixParams());
        }
        parseMatrixParams() {
          const e = {};
          for (; this.consumeOptional(";"); ) this.parseParam(e);
          return e;
        }
        parseParam(e) {
          const t = Hl(this.remaining);
          if (!t) return;
          this.capture(t);
          let r = "";
          if (this.consumeOptional("=")) {
            const o = Hl(this.remaining);
            o && ((r = o), this.capture(r));
          }
          e[$l(t)] = $l(r);
        }
        parseQueryParam(e) {
          const t = (function XR(n) {
            const e = n.match(JR);
            return e ? e[0] : "";
          })(this.remaining);
          if (!t) return;
          this.capture(t);
          let r = "";
          if (this.consumeOptional("=")) {
            const s = (function tF(n) {
              const e = n.match(eF);
              return e ? e[0] : "";
            })(this.remaining);
            s && ((r = s), this.capture(r));
          }
          const o = qw(t),
            i = qw(r);
          if (e.hasOwnProperty(o)) {
            let s = e[o];
            Array.isArray(s) || ((s = [s]), (e[o] = s)), s.push(i);
          } else e[o] = i;
        }
        parseParens(e) {
          const t = {};
          for (
            this.capture("(");
            !this.consumeOptional(")") && this.remaining.length > 0;

          ) {
            const r = Hl(this.remaining),
              o = this.remaining[r.length];
            if ("/" !== o && ")" !== o && ";" !== o) throw new M(4010, !1);
            let i;
            r.indexOf(":") > -1
              ? ((i = r.slice(0, r.indexOf(":"))),
                this.capture(i),
                this.capture(":"))
              : e && (i = fe);
            const s = this.parseChildren();
            (t[i] = 1 === Object.keys(s).length ? s[fe] : new he([], s)),
              this.consumeOptional("//");
          }
          return t;
        }
        peekStartsWith(e) {
          return this.remaining.startsWith(e);
        }
        consumeOptional(e) {
          return (
            !!this.peekStartsWith(e) &&
            ((this.remaining = this.remaining.substring(e.length)), !0)
          );
        }
        capture(e) {
          if (!this.consumeOptional(e)) throw new M(4011, !1);
        }
      }
      function hp(n) {
        return n.segments.length > 0 ? new he([], { [fe]: n }) : n;
      }
      function zl(n) {
        const e = {};
        for (const r of Object.keys(n.children)) {
          const i = zl(n.children[r]);
          (i.segments.length > 0 || i.hasChildren()) && (e[r] = i);
        }
        return (function rF(n) {
          if (1 === n.numberOfChildren && n.children[fe]) {
            const e = n.children[fe];
            return new he(n.segments.concat(e.segments), e.children);
          }
          return n;
        })(new he(n.segments, e));
      }
      function Zo(n) {
        return n instanceof Ko;
      }
      function sF(n, e, t, r, o) {
        if (0 === t.length) return es(e.root, e.root, e.root, r, o);
        const i = (function Yw(n) {
          if ("string" == typeof n[0] && 1 === n.length && "/" === n[0])
            return new Zw(!0, 0, n);
          let e = 0,
            t = !1;
          const r = n.reduce((o, i, s) => {
            if ("object" == typeof i && null != i) {
              if (i.outlets) {
                const a = {};
                return (
                  Tt(i.outlets, (c, l) => {
                    a[l] = "string" == typeof c ? c.split("/") : c;
                  }),
                  [...o, { outlets: a }]
                );
              }
              if (i.segmentPath) return [...o, i.segmentPath];
            }
            return "string" != typeof i
              ? [...o, i]
              : 0 === s
              ? (i.split("/").forEach((a, c) => {
                  (0 == c && "." === a) ||
                    (0 == c && "" === a
                      ? (t = !0)
                      : ".." === a
                      ? e++
                      : "" != a && o.push(a));
                }),
                o)
              : [...o, i];
          }, []);
          return new Zw(t, e, r);
        })(t);
        return i.toRoot()
          ? es(e.root, e.root, new he([], {}), r, o)
          : (function s(c) {
              const l = (function cF(n, e, t, r) {
                  if (n.isAbsolute) return new ts(e.root, !0, 0);
                  if (-1 === r) return new ts(t, t === e.root, 0);
                  return (function Jw(n, e, t) {
                    let r = n,
                      o = e,
                      i = t;
                    for (; i > o; ) {
                      if (((i -= o), (r = r.parent), !r)) throw new M(4005, !1);
                      o = r.segments.length;
                    }
                    return new ts(r, !1, o - i);
                  })(t, r + (Da(n.commands[0]) ? 0 : 1), n.numberOfDoubleDots);
                })(i, e, n.snapshot?._urlSegment, c),
                u = l.processChildren
                  ? Oa(l.segmentGroup, l.index, i.commands)
                  : gp(l.segmentGroup, l.index, i.commands);
              return es(e.root, l.segmentGroup, u, r, o);
            })(n.snapshot?._lastPathIndex);
      }
      function Da(n) {
        return (
          "object" == typeof n && null != n && !n.outlets && !n.segmentPath
        );
      }
      function Ea(n) {
        return "object" == typeof n && null != n && n.outlets;
      }
      function es(n, e, t, r, o) {
        let s,
          i = {};
        r &&
          Tt(r, (c, l) => {
            i[l] = Array.isArray(c) ? c.map((u) => `${u}`) : `${c}`;
          }),
          (s = n === e ? t : Qw(n, e, t));
        const a = hp(zl(s));
        return new Ko(a, i, o);
      }
      function Qw(n, e, t) {
        const r = {};
        return (
          Tt(n.children, (o, i) => {
            r[i] = o === e ? t : Qw(o, e, t);
          }),
          new he(n.segments, r)
        );
      }
      class Zw {
        constructor(e, t, r) {
          if (
            ((this.isAbsolute = e),
            (this.numberOfDoubleDots = t),
            (this.commands = r),
            e && r.length > 0 && Da(r[0]))
          )
            throw new M(4003, !1);
          const o = r.find(Ea);
          if (o && o !== Bw(r)) throw new M(4004, !1);
        }
        toRoot() {
          return (
            this.isAbsolute &&
            1 === this.commands.length &&
            "/" == this.commands[0]
          );
        }
      }
      class ts {
        constructor(e, t, r) {
          (this.segmentGroup = e), (this.processChildren = t), (this.index = r);
        }
      }
      function gp(n, e, t) {
        if (
          (n || (n = new he([], {})),
          0 === n.segments.length && n.hasChildren())
        )
          return Oa(n, e, t);
        const r = (function uF(n, e, t) {
            let r = 0,
              o = e;
            const i = { match: !1, pathIndex: 0, commandIndex: 0 };
            for (; o < n.segments.length; ) {
              if (r >= t.length) return i;
              const s = n.segments[o],
                a = t[r];
              if (Ea(a)) break;
              const c = `${a}`,
                l = r < t.length - 1 ? t[r + 1] : null;
              if (o > 0 && void 0 === c) break;
              if (c && l && "object" == typeof l && void 0 === l.outlets) {
                if (!eM(c, l, s)) return i;
                r += 2;
              } else {
                if (!eM(c, {}, s)) return i;
                r++;
              }
              o++;
            }
            return { match: !0, pathIndex: o, commandIndex: r };
          })(n, e, t),
          o = t.slice(r.commandIndex);
        if (r.match && r.pathIndex < n.segments.length) {
          const i = new he(n.segments.slice(0, r.pathIndex), {});
          return (
            (i.children[fe] = new he(
              n.segments.slice(r.pathIndex),
              n.children
            )),
            Oa(i, 0, o)
          );
        }
        return r.match && 0 === o.length
          ? new he(n.segments, {})
          : r.match && !n.hasChildren()
          ? mp(n, e, t)
          : r.match
          ? Oa(n, 0, o)
          : mp(n, e, t);
      }
      function Oa(n, e, t) {
        if (0 === t.length) return new he(n.segments, {});
        {
          const r = (function lF(n) {
              return Ea(n[0]) ? n[0].outlets : { [fe]: n };
            })(t),
            o = {};
          return (
            Tt(r, (i, s) => {
              "string" == typeof i && (i = [i]),
                null !== i && (o[s] = gp(n.children[s], e, i));
            }),
            Tt(n.children, (i, s) => {
              void 0 === r[s] && (o[s] = i);
            }),
            new he(n.segments, o)
          );
        }
      }
      function mp(n, e, t) {
        const r = n.segments.slice(0, e);
        let o = 0;
        for (; o < t.length; ) {
          const i = t[o];
          if (Ea(i)) {
            const c = dF(i.outlets);
            return new he(r, c);
          }
          if (0 === o && Da(t[0])) {
            r.push(new wa(n.segments[e].path, Xw(t[0]))), o++;
            continue;
          }
          const s = Ea(i) ? i.outlets[fe] : `${i}`,
            a = o < t.length - 1 ? t[o + 1] : null;
          s && a && Da(a)
            ? (r.push(new wa(s, Xw(a))), (o += 2))
            : (r.push(new wa(s, {})), o++);
        }
        return new he(r, {});
      }
      function dF(n) {
        const e = {};
        return (
          Tt(n, (t, r) => {
            "string" == typeof t && (t = [t]),
              null !== t && (e[r] = mp(new he([], {}), 0, t));
          }),
          e
        );
      }
      function Xw(n) {
        const e = {};
        return Tt(n, (t, r) => (e[r] = `${t}`)), e;
      }
      function eM(n, e, t) {
        return n == t.path && Or(e, t.parameters);
      }
      class Qr {
        constructor(e, t) {
          (this.id = e), (this.url = t);
        }
      }
      class _p extends Qr {
        constructor(e, t, r = "imperative", o = null) {
          super(e, t),
            (this.type = 0),
            (this.navigationTrigger = r),
            (this.restoredState = o);
        }
        toString() {
          return `NavigationStart(id: ${this.id}, url: '${this.url}')`;
        }
      }
      class Yo extends Qr {
        constructor(e, t, r) {
          super(e, t), (this.urlAfterRedirects = r), (this.type = 1);
        }
        toString() {
          return `NavigationEnd(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}')`;
        }
      }
      class Gl extends Qr {
        constructor(e, t, r, o) {
          super(e, t), (this.reason = r), (this.code = o), (this.type = 2);
        }
        toString() {
          return `NavigationCancel(id: ${this.id}, url: '${this.url}')`;
        }
      }
      class tM extends Qr {
        constructor(e, t, r, o) {
          super(e, t), (this.error = r), (this.target = o), (this.type = 3);
        }
        toString() {
          return `NavigationError(id: ${this.id}, url: '${this.url}', error: ${this.error})`;
        }
      }
      class fF extends Qr {
        constructor(e, t, r, o) {
          super(e, t),
            (this.urlAfterRedirects = r),
            (this.state = o),
            (this.type = 4);
        }
        toString() {
          return `RoutesRecognized(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`;
        }
      }
      class hF extends Qr {
        constructor(e, t, r, o) {
          super(e, t),
            (this.urlAfterRedirects = r),
            (this.state = o),
            (this.type = 7);
        }
        toString() {
          return `GuardsCheckStart(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`;
        }
      }
      class pF extends Qr {
        constructor(e, t, r, o, i) {
          super(e, t),
            (this.urlAfterRedirects = r),
            (this.state = o),
            (this.shouldActivate = i),
            (this.type = 8);
        }
        toString() {
          return `GuardsCheckEnd(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state}, shouldActivate: ${this.shouldActivate})`;
        }
      }
      class gF extends Qr {
        constructor(e, t, r, o) {
          super(e, t),
            (this.urlAfterRedirects = r),
            (this.state = o),
            (this.type = 5);
        }
        toString() {
          return `ResolveStart(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`;
        }
      }
      class mF extends Qr {
        constructor(e, t, r, o) {
          super(e, t),
            (this.urlAfterRedirects = r),
            (this.state = o),
            (this.type = 6);
        }
        toString() {
          return `ResolveEnd(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`;
        }
      }
      class _F {
        constructor(e) {
          (this.route = e), (this.type = 9);
        }
        toString() {
          return `RouteConfigLoadStart(path: ${this.route.path})`;
        }
      }
      class yF {
        constructor(e) {
          (this.route = e), (this.type = 10);
        }
        toString() {
          return `RouteConfigLoadEnd(path: ${this.route.path})`;
        }
      }
      class vF {
        constructor(e) {
          (this.snapshot = e), (this.type = 11);
        }
        toString() {
          return `ChildActivationStart(path: '${
            (this.snapshot.routeConfig && this.snapshot.routeConfig.path) || ""
          }')`;
        }
      }
      class CF {
        constructor(e) {
          (this.snapshot = e), (this.type = 12);
        }
        toString() {
          return `ChildActivationEnd(path: '${
            (this.snapshot.routeConfig && this.snapshot.routeConfig.path) || ""
          }')`;
        }
      }
      class bF {
        constructor(e) {
          (this.snapshot = e), (this.type = 13);
        }
        toString() {
          return `ActivationStart(path: '${
            (this.snapshot.routeConfig && this.snapshot.routeConfig.path) || ""
          }')`;
        }
      }
      class wF {
        constructor(e) {
          (this.snapshot = e), (this.type = 14);
        }
        toString() {
          return `ActivationEnd(path: '${
            (this.snapshot.routeConfig && this.snapshot.routeConfig.path) || ""
          }')`;
        }
      }
      class nM {
        constructor(e, t, r) {
          (this.routerEvent = e),
            (this.position = t),
            (this.anchor = r),
            (this.type = 15);
        }
        toString() {
          return `Scroll(anchor: '${this.anchor}', position: '${
            this.position ? `${this.position[0]}, ${this.position[1]}` : null
          }')`;
        }
      }
      class rM {
        constructor(e) {
          this._root = e;
        }
        get root() {
          return this._root.value;
        }
        parent(e) {
          const t = this.pathFromRoot(e);
          return t.length > 1 ? t[t.length - 2] : null;
        }
        children(e) {
          const t = yp(e, this._root);
          return t ? t.children.map((r) => r.value) : [];
        }
        firstChild(e) {
          const t = yp(e, this._root);
          return t && t.children.length > 0 ? t.children[0].value : null;
        }
        siblings(e) {
          const t = vp(e, this._root);
          return t.length < 2
            ? []
            : t[t.length - 2].children
                .map((o) => o.value)
                .filter((o) => o !== e);
        }
        pathFromRoot(e) {
          return vp(e, this._root).map((t) => t.value);
        }
      }
      function yp(n, e) {
        if (n === e.value) return e;
        for (const t of e.children) {
          const r = yp(n, t);
          if (r) return r;
        }
        return null;
      }
      function vp(n, e) {
        if (n === e.value) return [e];
        for (const t of e.children) {
          const r = vp(n, t);
          if (r.length) return r.unshift(e), r;
        }
        return [];
      }
      class Zr {
        constructor(e, t) {
          (this.value = e), (this.children = t);
        }
        toString() {
          return `TreeNode(${this.value})`;
        }
      }
      function ns(n) {
        const e = {};
        return n && n.children.forEach((t) => (e[t.value.outlet] = t)), e;
      }
      class oM extends rM {
        constructor(e, t) {
          super(e), (this.snapshot = t), Cp(this, e);
        }
        toString() {
          return this.snapshot.toString();
        }
      }
      function iM(n, e) {
        const t = (function DF(n, e) {
            const s = new Wl([], {}, {}, "", {}, fe, e, null, n.root, -1, {});
            return new aM("", new Zr(s, []));
          })(n, e),
          r = new $e([new wa("", {})]),
          o = new $e({}),
          i = new $e({}),
          s = new $e({}),
          a = new $e(""),
          c = new Jo(r, o, s, a, i, fe, e, t.root);
        return (c.snapshot = t.root), new oM(new Zr(c, []), t);
      }
      class Jo {
        constructor(e, t, r, o, i, s, a, c) {
          (this.url = e),
            (this.params = t),
            (this.queryParams = r),
            (this.fragment = o),
            (this.data = i),
            (this.outlet = s),
            (this.component = a),
            (this.title = this.data?.pipe(U((l) => l[ba])) ?? V(void 0)),
            (this._futureSnapshot = c);
        }
        get routeConfig() {
          return this._futureSnapshot.routeConfig;
        }
        get root() {
          return this._routerState.root;
        }
        get parent() {
          return this._routerState.parent(this);
        }
        get firstChild() {
          return this._routerState.firstChild(this);
        }
        get children() {
          return this._routerState.children(this);
        }
        get pathFromRoot() {
          return this._routerState.pathFromRoot(this);
        }
        get paramMap() {
          return (
            this._paramMap ||
              (this._paramMap = this.params.pipe(U((e) => Xi(e)))),
            this._paramMap
          );
        }
        get queryParamMap() {
          return (
            this._queryParamMap ||
              (this._queryParamMap = this.queryParams.pipe(U((e) => Xi(e)))),
            this._queryParamMap
          );
        }
        toString() {
          return this.snapshot
            ? this.snapshot.toString()
            : `Future(${this._futureSnapshot})`;
        }
      }
      function sM(n, e = "emptyOnly") {
        const t = n.pathFromRoot;
        let r = 0;
        if ("always" !== e)
          for (r = t.length - 1; r >= 1; ) {
            const o = t[r],
              i = t[r - 1];
            if (o.routeConfig && "" === o.routeConfig.path) r--;
            else {
              if (i.component) break;
              r--;
            }
          }
        return (function EF(n) {
          return n.reduce(
            (e, t) => ({
              params: { ...e.params, ...t.params },
              data: { ...e.data, ...t.data },
              resolve: {
                ...t.data,
                ...e.resolve,
                ...t.routeConfig?.data,
                ...t._resolvedData,
              },
            }),
            { params: {}, data: {}, resolve: {} }
          );
        })(t.slice(r));
      }
      class Wl {
        constructor(e, t, r, o, i, s, a, c, l, u, d, f) {
          (this.url = e),
            (this.params = t),
            (this.queryParams = r),
            (this.fragment = o),
            (this.data = i),
            (this.outlet = s),
            (this.component = a),
            (this.title = this.data?.[ba]),
            (this.routeConfig = c),
            (this._urlSegment = l),
            (this._lastPathIndex = u),
            (this._correctedLastPathIndex = f ?? u),
            (this._resolve = d);
        }
        get root() {
          return this._routerState.root;
        }
        get parent() {
          return this._routerState.parent(this);
        }
        get firstChild() {
          return this._routerState.firstChild(this);
        }
        get children() {
          return this._routerState.children(this);
        }
        get pathFromRoot() {
          return this._routerState.pathFromRoot(this);
        }
        get paramMap() {
          return (
            this._paramMap || (this._paramMap = Xi(this.params)), this._paramMap
          );
        }
        get queryParamMap() {
          return (
            this._queryParamMap || (this._queryParamMap = Xi(this.queryParams)),
            this._queryParamMap
          );
        }
        toString() {
          return `Route(url:'${this.url
            .map((r) => r.toString())
            .join("/")}', path:'${
            this.routeConfig ? this.routeConfig.path : ""
          }')`;
        }
      }
      class aM extends rM {
        constructor(e, t) {
          super(t), (this.url = e), Cp(this, t);
        }
        toString() {
          return cM(this._root);
        }
      }
      function Cp(n, e) {
        (e.value._routerState = n), e.children.forEach((t) => Cp(n, t));
      }
      function cM(n) {
        const e =
          n.children.length > 0 ? ` { ${n.children.map(cM).join(", ")} } ` : "";
        return `${n.value}${e}`;
      }
      function bp(n) {
        if (n.snapshot) {
          const e = n.snapshot,
            t = n._futureSnapshot;
          (n.snapshot = t),
            Or(e.queryParams, t.queryParams) ||
              n.queryParams.next(t.queryParams),
            e.fragment !== t.fragment && n.fragment.next(t.fragment),
            Or(e.params, t.params) || n.params.next(t.params),
            (function jR(n, e) {
              if (n.length !== e.length) return !1;
              for (let t = 0; t < n.length; ++t) if (!Or(n[t], e[t])) return !1;
              return !0;
            })(e.url, t.url) || n.url.next(t.url),
            Or(e.data, t.data) || n.data.next(t.data);
        } else
          (n.snapshot = n._futureSnapshot), n.data.next(n._futureSnapshot.data);
      }
      function wp(n, e) {
        const t =
          Or(n.params, e.params) &&
          (function GR(n, e) {
            return (
              Qo(n, e) && n.every((t, r) => Or(t.parameters, e[r].parameters))
            );
          })(n.url, e.url);
        return (
          t &&
          !(!n.parent != !e.parent) &&
          (!n.parent || wp(n.parent, e.parent))
        );
      }
      function Pa(n, e, t) {
        if (t && n.shouldReuseRoute(e.value, t.value.snapshot)) {
          const r = t.value;
          r._futureSnapshot = e.value;
          const o = (function PF(n, e, t) {
            return e.children.map((r) => {
              for (const o of t.children)
                if (n.shouldReuseRoute(r.value, o.value.snapshot))
                  return Pa(n, r, o);
              return Pa(n, r);
            });
          })(n, e, t);
          return new Zr(r, o);
        }
        {
          if (n.shouldAttach(e.value)) {
            const i = n.retrieve(e.value);
            if (null !== i) {
              const s = i.route;
              return (
                (s.value._futureSnapshot = e.value),
                (s.children = e.children.map((a) => Pa(n, a))),
                s
              );
            }
          }
          const r = (function xF(n) {
              return new Jo(
                new $e(n.url),
                new $e(n.params),
                new $e(n.queryParams),
                new $e(n.fragment),
                new $e(n.data),
                n.outlet,
                n.component,
                n
              );
            })(e.value),
            o = e.children.map((i) => Pa(n, i));
          return new Zr(r, o);
        }
      }
      const Mp = "ngNavigationCancelingError";
      function lM(n, e) {
        const { redirectTo: t, navigationBehaviorOptions: r } = Zo(e)
            ? { redirectTo: e, navigationBehaviorOptions: void 0 }
            : e,
          o = uM(!1, 0, e);
        return (o.url = t), (o.navigationBehaviorOptions = r), o;
      }
      function uM(n, e, t) {
        const r = new Error("NavigationCancelingError: " + (n || ""));
        return (r[Mp] = !0), (r.cancellationCode = e), t && (r.url = t), r;
      }
      function dM(n) {
        return fM(n) && Zo(n.url);
      }
      function fM(n) {
        return n && n[Mp];
      }
      class SF {
        constructor() {
          (this.outlet = null),
            (this.route = null),
            (this.resolver = null),
            (this.injector = null),
            (this.children = new xa()),
            (this.attachRef = null);
        }
      }
      let xa = (() => {
        class n {
          constructor() {
            this.contexts = new Map();
          }
          onChildOutletCreated(t, r) {
            const o = this.getOrCreateContext(t);
            (o.outlet = r), this.contexts.set(t, o);
          }
          onChildOutletDestroyed(t) {
            const r = this.getContext(t);
            r && ((r.outlet = null), (r.attachRef = null));
          }
          onOutletDeactivated() {
            const t = this.contexts;
            return (this.contexts = new Map()), t;
          }
          onOutletReAttached(t) {
            this.contexts = t;
          }
          getOrCreateContext(t) {
            let r = this.getContext(t);
            return r || ((r = new SF()), this.contexts.set(t, r)), r;
          }
          getContext(t) {
            return this.contexts.get(t) || null;
          }
        }
        return (
          (n.ɵfac = function (t) {
            return new (t || n)();
          }),
          (n.ɵprov = R({ token: n, factory: n.ɵfac, providedIn: "root" })),
          n
        );
      })();
      const ql = !1;
      let Dp = (() => {
        class n {
          constructor(t, r, o, i, s) {
            (this.parentContexts = t),
              (this.location = r),
              (this.changeDetector = i),
              (this.environmentInjector = s),
              (this.activated = null),
              (this._activatedRoute = null),
              (this.activateEvents = new it()),
              (this.deactivateEvents = new it()),
              (this.attachEvents = new it()),
              (this.detachEvents = new it()),
              (this.name = o || fe),
              t.onChildOutletCreated(this.name, this);
          }
          ngOnDestroy() {
            this.parentContexts.getContext(this.name)?.outlet === this &&
              this.parentContexts.onChildOutletDestroyed(this.name);
          }
          ngOnInit() {
            if (!this.activated) {
              const t = this.parentContexts.getContext(this.name);
              t &&
                t.route &&
                (t.attachRef
                  ? this.attach(t.attachRef, t.route)
                  : this.activateWith(t.route, t.injector));
            }
          }
          get isActivated() {
            return !!this.activated;
          }
          get component() {
            if (!this.activated) throw new M(4012, ql);
            return this.activated.instance;
          }
          get activatedRoute() {
            if (!this.activated) throw new M(4012, ql);
            return this._activatedRoute;
          }
          get activatedRouteData() {
            return this._activatedRoute
              ? this._activatedRoute.snapshot.data
              : {};
          }
          detach() {
            if (!this.activated) throw new M(4012, ql);
            this.location.detach();
            const t = this.activated;
            return (
              (this.activated = null),
              (this._activatedRoute = null),
              this.detachEvents.emit(t.instance),
              t
            );
          }
          attach(t, r) {
            (this.activated = t),
              (this._activatedRoute = r),
              this.location.insert(t.hostView),
              this.attachEvents.emit(t.instance);
          }
          deactivate() {
            if (this.activated) {
              const t = this.component;
              this.activated.destroy(),
                (this.activated = null),
                (this._activatedRoute = null),
                this.deactivateEvents.emit(t);
            }
          }
          activateWith(t, r) {
            if (this.isActivated) throw new M(4013, ql);
            this._activatedRoute = t;
            const o = this.location,
              s = t._futureSnapshot.component,
              a = this.parentContexts.getOrCreateContext(this.name).children,
              c = new AF(t, a, o.injector);
            if (
              r &&
              (function TF(n) {
                return !!n.resolveComponentFactory;
              })(r)
            ) {
              const l = r.resolveComponentFactory(s);
              this.activated = o.createComponent(l, o.length, c);
            } else
              this.activated = o.createComponent(s, {
                index: o.length,
                injector: c,
                environmentInjector: r ?? this.environmentInjector,
              });
            this.changeDetector.markForCheck(),
              this.activateEvents.emit(this.activated.instance);
          }
        }
        return (
          (n.ɵfac = function (t) {
            return new (t || n)(w(xa), w(nr), Ds("name"), w(ol), w(co));
          }),
          (n.ɵdir = G({
            type: n,
            selectors: [["router-outlet"]],
            outputs: {
              activateEvents: "activate",
              deactivateEvents: "deactivate",
              attachEvents: "attach",
              detachEvents: "detach",
            },
            exportAs: ["outlet"],
            standalone: !0,
          })),
          n
        );
      })();
      class AF {
        constructor(e, t, r) {
          (this.route = e), (this.childContexts = t), (this.parent = r);
        }
        get(e, t) {
          return e === Jo
            ? this.route
            : e === xa
            ? this.childContexts
            : this.parent.get(e, t);
        }
      }
      let Ep = (() => {
        class n {}
        return (
          (n.ɵfac = function (t) {
            return new (t || n)();
          }),
          (n.ɵcmp = qt({
            type: n,
            selectors: [["ng-component"]],
            standalone: !0,
            features: [f0],
            decls: 1,
            vars: 0,
            template: function (t, r) {
              1 & t && re(0, "router-outlet");
            },
            dependencies: [Dp],
            encapsulation: 2,
          })),
          n
        );
      })();
      function hM(n, e) {
        return (
          n.providers &&
            !n._injector &&
            (n._injector = Gc(n.providers, e, `Route: ${n.path}`)),
          n._injector ?? e
        );
      }
      function Pp(n) {
        const e = n.children && n.children.map(Pp),
          t = e ? { ...n, children: e } : { ...n };
        return (
          !t.component &&
            !t.loadComponent &&
            (e || t.loadChildren) &&
            t.outlet &&
            t.outlet !== fe &&
            (t.component = Ep),
          t
        );
      }
      function jn(n) {
        return n.outlet || fe;
      }
      function pM(n, e) {
        const t = n.filter((r) => jn(r) === e);
        return t.push(...n.filter((r) => jn(r) !== e)), t;
      }
      function Sa(n) {
        if (!n) return null;
        if (n.routeConfig?._injector) return n.routeConfig._injector;
        for (let e = n.parent; e; e = e.parent) {
          const t = e.routeConfig;
          if (t?._loadedInjector) return t._loadedInjector;
          if (t?._injector) return t._injector;
        }
        return null;
      }
      class FF {
        constructor(e, t, r, o) {
          (this.routeReuseStrategy = e),
            (this.futureState = t),
            (this.currState = r),
            (this.forwardEvent = o);
        }
        activate(e) {
          const t = this.futureState._root,
            r = this.currState ? this.currState._root : null;
          this.deactivateChildRoutes(t, r, e),
            bp(this.futureState.root),
            this.activateChildRoutes(t, r, e);
        }
        deactivateChildRoutes(e, t, r) {
          const o = ns(t);
          e.children.forEach((i) => {
            const s = i.value.outlet;
            this.deactivateRoutes(i, o[s], r), delete o[s];
          }),
            Tt(o, (i, s) => {
              this.deactivateRouteAndItsChildren(i, r);
            });
        }
        deactivateRoutes(e, t, r) {
          const o = e.value,
            i = t ? t.value : null;
          if (o === i)
            if (o.component) {
              const s = r.getContext(o.outlet);
              s && this.deactivateChildRoutes(e, t, s.children);
            } else this.deactivateChildRoutes(e, t, r);
          else i && this.deactivateRouteAndItsChildren(t, r);
        }
        deactivateRouteAndItsChildren(e, t) {
          e.value.component &&
          this.routeReuseStrategy.shouldDetach(e.value.snapshot)
            ? this.detachAndStoreRouteSubtree(e, t)
            : this.deactivateRouteAndOutlet(e, t);
        }
        detachAndStoreRouteSubtree(e, t) {
          const r = t.getContext(e.value.outlet),
            o = r && e.value.component ? r.children : t,
            i = ns(e);
          for (const s of Object.keys(i))
            this.deactivateRouteAndItsChildren(i[s], o);
          if (r && r.outlet) {
            const s = r.outlet.detach(),
              a = r.children.onOutletDeactivated();
            this.routeReuseStrategy.store(e.value.snapshot, {
              componentRef: s,
              route: e,
              contexts: a,
            });
          }
        }
        deactivateRouteAndOutlet(e, t) {
          const r = t.getContext(e.value.outlet),
            o = r && e.value.component ? r.children : t,
            i = ns(e);
          for (const s of Object.keys(i))
            this.deactivateRouteAndItsChildren(i[s], o);
          r &&
            r.outlet &&
            (r.outlet.deactivate(),
            r.children.onOutletDeactivated(),
            (r.attachRef = null),
            (r.resolver = null),
            (r.route = null));
        }
        activateChildRoutes(e, t, r) {
          const o = ns(t);
          e.children.forEach((i) => {
            this.activateRoutes(i, o[i.value.outlet], r),
              this.forwardEvent(new wF(i.value.snapshot));
          }),
            e.children.length && this.forwardEvent(new CF(e.value.snapshot));
        }
        activateRoutes(e, t, r) {
          const o = e.value,
            i = t ? t.value : null;
          if ((bp(o), o === i))
            if (o.component) {
              const s = r.getOrCreateContext(o.outlet);
              this.activateChildRoutes(e, t, s.children);
            } else this.activateChildRoutes(e, t, r);
          else if (o.component) {
            const s = r.getOrCreateContext(o.outlet);
            if (this.routeReuseStrategy.shouldAttach(o.snapshot)) {
              const a = this.routeReuseStrategy.retrieve(o.snapshot);
              this.routeReuseStrategy.store(o.snapshot, null),
                s.children.onOutletReAttached(a.contexts),
                (s.attachRef = a.componentRef),
                (s.route = a.route.value),
                s.outlet && s.outlet.attach(a.componentRef, a.route.value),
                bp(a.route.value),
                this.activateChildRoutes(e, null, s.children);
            } else {
              const a = Sa(o.snapshot),
                c = a?.get(Vs) ?? null;
              (s.attachRef = null),
                (s.route = o),
                (s.resolver = c),
                (s.injector = a),
                s.outlet && s.outlet.activateWith(o, s.injector),
                this.activateChildRoutes(e, null, s.children);
            }
          } else this.activateChildRoutes(e, null, r);
        }
      }
      class gM {
        constructor(e) {
          (this.path = e), (this.route = this.path[this.path.length - 1]);
        }
      }
      class Kl {
        constructor(e, t) {
          (this.component = e), (this.route = t);
        }
      }
      function LF(n, e, t) {
        const r = n._root;
        return Aa(r, e ? e._root : null, t, [r.value]);
      }
      function rs(n, e) {
        const t = Symbol(),
          r = e.get(n, t);
        return r === t
          ? "function" != typeof n ||
            (function JD(n) {
              return null !== Ka(n);
            })(n)
            ? e.get(n)
            : n
          : r;
      }
      function Aa(
        n,
        e,
        t,
        r,
        o = { canDeactivateChecks: [], canActivateChecks: [] }
      ) {
        const i = ns(e);
        return (
          n.children.forEach((s) => {
            (function BF(
              n,
              e,
              t,
              r,
              o = { canDeactivateChecks: [], canActivateChecks: [] }
            ) {
              const i = n.value,
                s = e ? e.value : null,
                a = t ? t.getContext(n.value.outlet) : null;
              if (s && i.routeConfig === s.routeConfig) {
                const c = (function jF(n, e, t) {
                  if ("function" == typeof t) return t(n, e);
                  switch (t) {
                    case "pathParamsChange":
                      return !Qo(n.url, e.url);
                    case "pathParamsOrQueryParamsChange":
                      return (
                        !Qo(n.url, e.url) || !Or(n.queryParams, e.queryParams)
                      );
                    case "always":
                      return !0;
                    case "paramsOrQueryParamsChange":
                      return !wp(n, e) || !Or(n.queryParams, e.queryParams);
                    default:
                      return !wp(n, e);
                  }
                })(s, i, i.routeConfig.runGuardsAndResolvers);
                c
                  ? o.canActivateChecks.push(new gM(r))
                  : ((i.data = s.data), (i._resolvedData = s._resolvedData)),
                  Aa(n, e, i.component ? (a ? a.children : null) : t, r, o),
                  c &&
                    a &&
                    a.outlet &&
                    a.outlet.isActivated &&
                    o.canDeactivateChecks.push(new Kl(a.outlet.component, s));
              } else
                s && Ta(e, a, o),
                  o.canActivateChecks.push(new gM(r)),
                  Aa(n, null, i.component ? (a ? a.children : null) : t, r, o);
            })(s, i[s.value.outlet], t, r.concat([s.value]), o),
              delete i[s.value.outlet];
          }),
          Tt(i, (s, a) => Ta(s, t.getContext(a), o)),
          o
        );
      }
      function Ta(n, e, t) {
        const r = ns(n),
          o = n.value;
        Tt(r, (i, s) => {
          Ta(i, o.component ? (e ? e.children.getContext(s) : null) : e, t);
        }),
          t.canDeactivateChecks.push(
            new Kl(
              o.component && e && e.outlet && e.outlet.isActivated
                ? e.outlet.component
                : null,
              o
            )
          );
      }
      function Ia(n) {
        return "function" == typeof n;
      }
      function xp(n) {
        return n instanceof Fl || "EmptyError" === n?.name;
      }
      const Ql = Symbol("INITIAL_VALUE");
      function os() {
        return Mr((n) =>
          sp(n.map((e) => e.pipe(Ji(1), kw(Ql)))).pipe(
            U((e) => {
              for (const t of e)
                if (!0 !== t) {
                  if (t === Ql) return Ql;
                  if (!1 === t || t instanceof Ko) return t;
                }
              return !0;
            }),
            Dr((e) => e !== Ql),
            Ji(1)
          )
        );
      }
      function mM(n) {
        return (function Ar(...n) {
          return lr(n);
        })(
          He((e) => {
            if (Zo(e)) throw lM(0, e);
          }),
          U((e) => !0 === e)
        );
      }
      const Sp = {
        matched: !1,
        consumedSegments: [],
        remainingSegments: [],
        parameters: {},
        positionalParamSegments: {},
      };
      function _M(n, e, t, r, o) {
        const i = Ap(n, e, t);
        return i.matched
          ? (function r3(n, e, t, r) {
              const o = e.canMatch;
              return o && 0 !== o.length
                ? V(
                    o.map((s) => {
                      const a = rs(s, n);
                      return Co(
                        (function WF(n) {
                          return n && Ia(n.canMatch);
                        })(a)
                          ? a.canMatch(e, t)
                          : n.runInContext(() => a(e, t))
                      );
                    })
                  ).pipe(os(), mM())
                : V(!0);
            })((r = hM(e, r)), e, t).pipe(U((s) => (!0 === s ? i : { ...Sp })))
          : V(i);
      }
      function Ap(n, e, t) {
        if ("" === e.path)
          return "full" === e.pathMatch && (n.hasChildren() || t.length > 0)
            ? { ...Sp }
            : {
                matched: !0,
                consumedSegments: [],
                remainingSegments: t,
                parameters: {},
                positionalParamSegments: {},
              };
        const o = (e.matcher || BR)(t, n, e);
        if (!o) return { ...Sp };
        const i = {};
        Tt(o.posParams, (a, c) => {
          i[c] = a.path;
        });
        const s =
          o.consumed.length > 0
            ? { ...i, ...o.consumed[o.consumed.length - 1].parameters }
            : i;
        return {
          matched: !0,
          consumedSegments: o.consumed,
          remainingSegments: t.slice(o.consumed.length),
          parameters: s,
          positionalParamSegments: o.posParams ?? {},
        };
      }
      function Zl(n, e, t, r, o = "corrected") {
        if (
          t.length > 0 &&
          (function a3(n, e, t) {
            return t.some((r) => Yl(n, e, r) && jn(r) !== fe);
          })(n, t, r)
        ) {
          const s = new he(
            e,
            (function s3(n, e, t, r) {
              const o = {};
              (o[fe] = r),
                (r._sourceSegment = n),
                (r._segmentIndexShift = e.length);
              for (const i of t)
                if ("" === i.path && jn(i) !== fe) {
                  const s = new he([], {});
                  (s._sourceSegment = n),
                    (s._segmentIndexShift = e.length),
                    (o[jn(i)] = s);
                }
              return o;
            })(n, e, r, new he(t, n.children))
          );
          return (
            (s._sourceSegment = n),
            (s._segmentIndexShift = e.length),
            { segmentGroup: s, slicedSegments: [] }
          );
        }
        if (
          0 === t.length &&
          (function c3(n, e, t) {
            return t.some((r) => Yl(n, e, r));
          })(n, t, r)
        ) {
          const s = new he(
            n.segments,
            (function o3(n, e, t, r, o, i) {
              const s = {};
              for (const a of r)
                if (Yl(n, t, a) && !o[jn(a)]) {
                  const c = new he([], {});
                  (c._sourceSegment = n),
                    (c._segmentIndexShift =
                      "legacy" === i ? n.segments.length : e.length),
                    (s[jn(a)] = c);
                }
              return { ...o, ...s };
            })(n, e, t, r, n.children, o)
          );
          return (
            (s._sourceSegment = n),
            (s._segmentIndexShift = e.length),
            { segmentGroup: s, slicedSegments: t }
          );
        }
        const i = new he(n.segments, n.children);
        return (
          (i._sourceSegment = n),
          (i._segmentIndexShift = e.length),
          { segmentGroup: i, slicedSegments: t }
        );
      }
      function Yl(n, e, t) {
        return (
          (!(n.hasChildren() || e.length > 0) || "full" !== t.pathMatch) &&
          "" === t.path
        );
      }
      function yM(n, e, t, r) {
        return (
          !!(jn(n) === r || (r !== fe && Yl(e, t, n))) &&
          ("**" === n.path || Ap(e, n, t).matched)
        );
      }
      function vM(n, e, t) {
        return 0 === e.length && !n.children[t];
      }
      const Jl = !1;
      class Xl {
        constructor(e) {
          this.segmentGroup = e || null;
        }
      }
      class CM {
        constructor(e) {
          this.urlTree = e;
        }
      }
      function ka(n) {
        return Ca(new Xl(n));
      }
      function bM(n) {
        return Ca(new CM(n));
      }
      class f3 {
        constructor(e, t, r, o, i) {
          (this.injector = e),
            (this.configLoader = t),
            (this.urlSerializer = r),
            (this.urlTree = o),
            (this.config = i),
            (this.allowRedirects = !0);
        }
        apply() {
          const e = Zl(this.urlTree.root, [], [], this.config).segmentGroup,
            t = new he(e.segments, e.children);
          return this.expandSegmentGroup(this.injector, this.config, t, fe)
            .pipe(
              U((i) =>
                this.createUrlTree(
                  zl(i),
                  this.urlTree.queryParams,
                  this.urlTree.fragment
                )
              )
            )
            .pipe(
              Er((i) => {
                if (i instanceof CM)
                  return (this.allowRedirects = !1), this.match(i.urlTree);
                throw i instanceof Xl ? this.noMatchError(i) : i;
              })
            );
        }
        match(e) {
          return this.expandSegmentGroup(this.injector, this.config, e.root, fe)
            .pipe(
              U((o) => this.createUrlTree(zl(o), e.queryParams, e.fragment))
            )
            .pipe(
              Er((o) => {
                throw o instanceof Xl ? this.noMatchError(o) : o;
              })
            );
        }
        noMatchError(e) {
          return new M(4002, Jl);
        }
        createUrlTree(e, t, r) {
          const o = hp(e);
          return new Ko(o, t, r);
        }
        expandSegmentGroup(e, t, r, o) {
          return 0 === r.segments.length && r.hasChildren()
            ? this.expandChildren(e, t, r).pipe(U((i) => new he([], i)))
            : this.expandSegment(e, r, t, r.segments, o, !0);
        }
        expandChildren(e, t, r) {
          const o = [];
          for (const i of Object.keys(r.children))
            "primary" === i ? o.unshift(i) : o.push(i);
          return dt(o).pipe(
            vo((i) => {
              const s = r.children[i],
                a = pM(t, i);
              return this.expandSegmentGroup(e, a, s, i).pipe(
                U((c) => ({ segment: c, outlet: i }))
              );
            }),
            Rw((i, s) => ((i[s.outlet] = s.segment), i), {}),
            Fw()
          );
        }
        expandSegment(e, t, r, o, i, s) {
          return dt(r).pipe(
            vo((a) =>
              this.expandSegmentAgainstRoute(e, t, r, a, o, i, s).pipe(
                Er((l) => {
                  if (l instanceof Xl) return V(null);
                  throw l;
                })
              )
            ),
            yo((a) => !!a),
            Er((a, c) => {
              if (xp(a)) return vM(t, o, i) ? V(new he([], {})) : ka(t);
              throw a;
            })
          );
        }
        expandSegmentAgainstRoute(e, t, r, o, i, s, a) {
          return yM(o, t, i, s)
            ? void 0 === o.redirectTo
              ? this.matchSegmentAgainstRoute(e, t, o, i, s)
              : a && this.allowRedirects
              ? this.expandSegmentAgainstRouteUsingRedirect(e, t, r, o, i, s)
              : ka(t)
            : ka(t);
        }
        expandSegmentAgainstRouteUsingRedirect(e, t, r, o, i, s) {
          return "**" === o.path
            ? this.expandWildCardWithParamsAgainstRouteUsingRedirect(e, r, o, s)
            : this.expandRegularSegmentAgainstRouteUsingRedirect(
                e,
                t,
                r,
                o,
                i,
                s
              );
        }
        expandWildCardWithParamsAgainstRouteUsingRedirect(e, t, r, o) {
          const i = this.applyRedirectCommands([], r.redirectTo, {});
          return r.redirectTo.startsWith("/")
            ? bM(i)
            : this.lineralizeSegments(r, i).pipe(
                At((s) => {
                  const a = new he(s, {});
                  return this.expandSegment(e, a, t, s, o, !1);
                })
              );
        }
        expandRegularSegmentAgainstRouteUsingRedirect(e, t, r, o, i, s) {
          const {
            matched: a,
            consumedSegments: c,
            remainingSegments: l,
            positionalParamSegments: u,
          } = Ap(t, o, i);
          if (!a) return ka(t);
          const d = this.applyRedirectCommands(c, o.redirectTo, u);
          return o.redirectTo.startsWith("/")
            ? bM(d)
            : this.lineralizeSegments(o, d).pipe(
                At((f) => this.expandSegment(e, t, r, f.concat(l), s, !1))
              );
        }
        matchSegmentAgainstRoute(e, t, r, o, i) {
          return "**" === r.path
            ? ((e = hM(r, e)),
              r.loadChildren
                ? (r._loadedRoutes
                    ? V({
                        routes: r._loadedRoutes,
                        injector: r._loadedInjector,
                      })
                    : this.configLoader.loadChildren(e, r)
                  ).pipe(
                    U(
                      (a) => (
                        (r._loadedRoutes = a.routes),
                        (r._loadedInjector = a.injector),
                        new he(o, {})
                      )
                    )
                  )
                : V(new he(o, {})))
            : _M(t, r, o, e).pipe(
                Mr(
                  ({ matched: s, consumedSegments: a, remainingSegments: c }) =>
                    s
                      ? this.getChildConfig((e = r._injector ?? e), r, o).pipe(
                          At((u) => {
                            const d = u.injector ?? e,
                              f = u.routes,
                              { segmentGroup: h, slicedSegments: p } = Zl(
                                t,
                                a,
                                c,
                                f
                              ),
                              m = new he(h.segments, h.children);
                            if (0 === p.length && m.hasChildren())
                              return this.expandChildren(d, f, m).pipe(
                                U((b) => new he(a, b))
                              );
                            if (0 === f.length && 0 === p.length)
                              return V(new he(a, {}));
                            const y = jn(r) === i;
                            return this.expandSegment(
                              d,
                              m,
                              f,
                              p,
                              y ? fe : i,
                              !0
                            ).pipe(
                              U((O) => new he(a.concat(O.segments), O.children))
                            );
                          })
                        )
                      : ka(t)
                )
              );
        }
        getChildConfig(e, t, r) {
          return t.children
            ? V({ routes: t.children, injector: e })
            : t.loadChildren
            ? void 0 !== t._loadedRoutes
              ? V({ routes: t._loadedRoutes, injector: t._loadedInjector })
              : (function n3(n, e, t, r) {
                  const o = e.canLoad;
                  return void 0 === o || 0 === o.length
                    ? V(!0)
                    : V(
                        o.map((s) => {
                          const a = rs(s, n);
                          return Co(
                            (function $F(n) {
                              return n && Ia(n.canLoad);
                            })(a)
                              ? a.canLoad(e, t)
                              : n.runInContext(() => a(e, t))
                          );
                        })
                      ).pipe(os(), mM());
                })(e, t, r).pipe(
                  At((o) =>
                    o
                      ? this.configLoader.loadChildren(e, t).pipe(
                          He((i) => {
                            (t._loadedRoutes = i.routes),
                              (t._loadedInjector = i.injector);
                          })
                        )
                      : (function u3(n) {
                          return Ca(uM(Jl, 3));
                        })()
                  )
                )
            : V({ routes: [], injector: e });
        }
        lineralizeSegments(e, t) {
          let r = [],
            o = t.root;
          for (;;) {
            if (((r = r.concat(o.segments)), 0 === o.numberOfChildren))
              return V(r);
            if (o.numberOfChildren > 1 || !o.children[fe])
              return Ca(new M(4e3, Jl));
            o = o.children[fe];
          }
        }
        applyRedirectCommands(e, t, r) {
          return this.applyRedirectCreateUrlTree(
            t,
            this.urlSerializer.parse(t),
            e,
            r
          );
        }
        applyRedirectCreateUrlTree(e, t, r, o) {
          const i = this.createSegmentGroup(e, t.root, r, o);
          return new Ko(
            i,
            this.createQueryParams(t.queryParams, this.urlTree.queryParams),
            t.fragment
          );
        }
        createQueryParams(e, t) {
          const r = {};
          return (
            Tt(e, (o, i) => {
              if ("string" == typeof o && o.startsWith(":")) {
                const a = o.substring(1);
                r[i] = t[a];
              } else r[i] = o;
            }),
            r
          );
        }
        createSegmentGroup(e, t, r, o) {
          const i = this.createSegments(e, t.segments, r, o);
          let s = {};
          return (
            Tt(t.children, (a, c) => {
              s[c] = this.createSegmentGroup(e, a, r, o);
            }),
            new he(i, s)
          );
        }
        createSegments(e, t, r, o) {
          return t.map((i) =>
            i.path.startsWith(":")
              ? this.findPosParam(e, i, o)
              : this.findOrReturn(i, r)
          );
        }
        findPosParam(e, t, r) {
          const o = r[t.path.substring(1)];
          if (!o) throw new M(4001, Jl);
          return o;
        }
        findOrReturn(e, t) {
          let r = 0;
          for (const o of t) {
            if (o.path === e.path) return t.splice(r), o;
            r++;
          }
          return e;
        }
      }
      class p3 {}
      class _3 {
        constructor(e, t, r, o, i, s, a, c) {
          (this.injector = e),
            (this.rootComponentType = t),
            (this.config = r),
            (this.urlTree = o),
            (this.url = i),
            (this.paramsInheritanceStrategy = s),
            (this.relativeLinkResolution = a),
            (this.urlSerializer = c);
        }
        recognize() {
          const e = Zl(
            this.urlTree.root,
            [],
            [],
            this.config.filter((t) => void 0 === t.redirectTo),
            this.relativeLinkResolution
          ).segmentGroup;
          return this.processSegmentGroup(
            this.injector,
            this.config,
            e,
            fe
          ).pipe(
            U((t) => {
              if (null === t) return null;
              const r = new Wl(
                  [],
                  Object.freeze({}),
                  Object.freeze({ ...this.urlTree.queryParams }),
                  this.urlTree.fragment,
                  {},
                  fe,
                  this.rootComponentType,
                  null,
                  this.urlTree.root,
                  -1,
                  {}
                ),
                o = new Zr(r, t),
                i = new aM(this.url, o);
              return this.inheritParamsAndData(i._root), i;
            })
          );
        }
        inheritParamsAndData(e) {
          const t = e.value,
            r = sM(t, this.paramsInheritanceStrategy);
          (t.params = Object.freeze(r.params)),
            (t.data = Object.freeze(r.data)),
            e.children.forEach((o) => this.inheritParamsAndData(o));
        }
        processSegmentGroup(e, t, r, o) {
          return 0 === r.segments.length && r.hasChildren()
            ? this.processChildren(e, t, r)
            : this.processSegment(e, t, r, r.segments, o);
        }
        processChildren(e, t, r) {
          return dt(Object.keys(r.children)).pipe(
            vo((o) => {
              const i = r.children[o],
                s = pM(t, o);
              return this.processSegmentGroup(e, s, i, o);
            }),
            Rw((o, i) => (o && i ? (o.push(...i), o) : null)),
            (function FR(n, e = !1) {
              return ae((t, r) => {
                let o = 0;
                t.subscribe(
                  ye(r, (i) => {
                    const s = n(i, o++);
                    (s || e) && r.next(i), !s && r.complete();
                  })
                );
              });
            })((o) => null !== o),
            Vl(null),
            Fw(),
            U((o) => {
              if (null === o) return null;
              const i = wM(o);
              return (
                (function y3(n) {
                  n.sort((e, t) =>
                    e.value.outlet === fe
                      ? -1
                      : t.value.outlet === fe
                      ? 1
                      : e.value.outlet.localeCompare(t.value.outlet)
                  );
                })(i),
                i
              );
            })
          );
        }
        processSegment(e, t, r, o, i) {
          return dt(t).pipe(
            vo((s) =>
              this.processSegmentAgainstRoute(s._injector ?? e, s, r, o, i)
            ),
            yo((s) => !!s),
            Er((s) => {
              if (xp(s)) return vM(r, o, i) ? V([]) : V(null);
              throw s;
            })
          );
        }
        processSegmentAgainstRoute(e, t, r, o, i) {
          if (t.redirectTo || !yM(t, r, o, i)) return V(null);
          let s;
          if ("**" === t.path) {
            const a = o.length > 0 ? Bw(o).parameters : {},
              c = DM(r) + o.length;
            s = V({
              snapshot: new Wl(
                o,
                a,
                Object.freeze({ ...this.urlTree.queryParams }),
                this.urlTree.fragment,
                OM(t),
                jn(t),
                t.component ?? t._loadedComponent ?? null,
                t,
                MM(r),
                c,
                PM(t),
                c
              ),
              consumedSegments: [],
              remainingSegments: [],
            });
          } else
            s = _M(r, t, o, e).pipe(
              U(
                ({
                  matched: a,
                  consumedSegments: c,
                  remainingSegments: l,
                  parameters: u,
                }) => {
                  if (!a) return null;
                  const d = DM(r) + c.length;
                  return {
                    snapshot: new Wl(
                      c,
                      u,
                      Object.freeze({ ...this.urlTree.queryParams }),
                      this.urlTree.fragment,
                      OM(t),
                      jn(t),
                      t.component ?? t._loadedComponent ?? null,
                      t,
                      MM(r),
                      d,
                      PM(t),
                      d
                    ),
                    consumedSegments: c,
                    remainingSegments: l,
                  };
                }
              )
            );
          return s.pipe(
            Mr((a) => {
              if (null === a) return V(null);
              const {
                snapshot: c,
                consumedSegments: l,
                remainingSegments: u,
              } = a;
              e = t._injector ?? e;
              const d = t._loadedInjector ?? e,
                f = (function v3(n) {
                  return n.children
                    ? n.children
                    : n.loadChildren
                    ? n._loadedRoutes
                    : [];
                })(t),
                { segmentGroup: h, slicedSegments: p } = Zl(
                  r,
                  l,
                  u,
                  f.filter((y) => void 0 === y.redirectTo),
                  this.relativeLinkResolution
                );
              if (0 === p.length && h.hasChildren())
                return this.processChildren(d, f, h).pipe(
                  U((y) => (null === y ? null : [new Zr(c, y)]))
                );
              if (0 === f.length && 0 === p.length) return V([new Zr(c, [])]);
              const m = jn(t) === i;
              return this.processSegment(d, f, h, p, m ? fe : i).pipe(
                U((y) => (null === y ? null : [new Zr(c, y)]))
              );
            })
          );
        }
      }
      function C3(n) {
        const e = n.value.routeConfig;
        return e && "" === e.path && void 0 === e.redirectTo;
      }
      function wM(n) {
        const e = [],
          t = new Set();
        for (const r of n) {
          if (!C3(r)) {
            e.push(r);
            continue;
          }
          const o = e.find((i) => r.value.routeConfig === i.value.routeConfig);
          void 0 !== o ? (o.children.push(...r.children), t.add(o)) : e.push(r);
        }
        for (const r of t) {
          const o = wM(r.children);
          e.push(new Zr(r.value, o));
        }
        return e.filter((r) => !t.has(r));
      }
      function MM(n) {
        let e = n;
        for (; e._sourceSegment; ) e = e._sourceSegment;
        return e;
      }
      function DM(n) {
        let e = n,
          t = e._segmentIndexShift ?? 0;
        for (; e._sourceSegment; )
          (e = e._sourceSegment), (t += e._segmentIndexShift ?? 0);
        return t - 1;
      }
      function OM(n) {
        return n.data || {};
      }
      function PM(n) {
        return n.resolve || {};
      }
      function xM(n) {
        return "string" == typeof n.title || null === n.title;
      }
      function Tp(n) {
        return Mr((e) => {
          const t = n(e);
          return t ? dt(t).pipe(U(() => e)) : V(e);
        });
      }
      let SM = (() => {
          class n {
            buildTitle(t) {
              let r,
                o = t.root;
              for (; void 0 !== o; )
                (r = this.getResolvedTitleForRoute(o) ?? r),
                  (o = o.children.find((i) => i.outlet === fe));
              return r;
            }
            getResolvedTitleForRoute(t) {
              return t.data[ba];
            }
          }
          return (
            (n.ɵfac = function (t) {
              return new (t || n)();
            }),
            (n.ɵprov = R({
              token: n,
              factory: function () {
                return Qe(AM);
              },
              providedIn: "root",
            })),
            n
          );
        })(),
        AM = (() => {
          class n extends SM {
            constructor(t) {
              super(), (this.title = t);
            }
            updateTitle(t) {
              const r = this.buildTitle(t);
              void 0 !== r && this.title.setTitle(r);
            }
          }
          return (
            (n.ɵfac = function (t) {
              return new (t || n)(P(bb));
            }),
            (n.ɵprov = R({ token: n, factory: n.ɵfac, providedIn: "root" })),
            n
          );
        })();
      class x3 {}
      class A3 extends class S3 {
        shouldDetach(e) {
          return !1;
        }
        store(e, t) {}
        shouldAttach(e) {
          return !1;
        }
        retrieve(e) {
          return null;
        }
        shouldReuseRoute(e, t) {
          return e.routeConfig === t.routeConfig;
        }
      } {}
      const tu = new F("", { providedIn: "root", factory: () => ({}) }),
        Ip = new F("ROUTES");
      let kp = (() => {
        class n {
          constructor(t, r) {
            (this.injector = t),
              (this.compiler = r),
              (this.componentLoaders = new WeakMap()),
              (this.childrenLoaders = new WeakMap());
          }
          loadComponent(t) {
            if (this.componentLoaders.get(t))
              return this.componentLoaders.get(t);
            if (t._loadedComponent) return V(t._loadedComponent);
            this.onLoadStartListener && this.onLoadStartListener(t);
            const r = Co(t.loadComponent()).pipe(
                He((i) => {
                  this.onLoadEndListener && this.onLoadEndListener(t),
                    (t._loadedComponent = i);
                }),
                lp(() => {
                  this.componentLoaders.delete(t);
                })
              ),
              o = new Iw(r, () => new We()).pipe(ap());
            return this.componentLoaders.set(t, o), o;
          }
          loadChildren(t, r) {
            if (this.childrenLoaders.get(r)) return this.childrenLoaders.get(r);
            if (r._loadedRoutes)
              return V({
                routes: r._loadedRoutes,
                injector: r._loadedInjector,
              });
            this.onLoadStartListener && this.onLoadStartListener(r);
            const i = this.loadModuleFactoryOrRoutes(r.loadChildren).pipe(
                U((a) => {
                  this.onLoadEndListener && this.onLoadEndListener(r);
                  let c,
                    l,
                    u = !1;
                  Array.isArray(a)
                    ? (l = a)
                    : ((c = a.create(t).injector),
                      (l = Vw(c.get(Ip, [], z.Self | z.Optional))));
                  return { routes: l.map(Pp), injector: c };
                }),
                lp(() => {
                  this.childrenLoaders.delete(r);
                })
              ),
              s = new Iw(i, () => new We()).pipe(ap());
            return this.childrenLoaders.set(r, s), s;
          }
          loadModuleFactoryOrRoutes(t) {
            return Co(t()).pipe(
              At((r) =>
                r instanceof u0 || Array.isArray(r)
                  ? V(r)
                  : dt(this.compiler.compileModuleAsync(r))
              )
            );
          }
        }
        return (
          (n.ɵfac = function (t) {
            return new (t || n)(P(vn), P(ih));
          }),
          (n.ɵprov = R({ token: n, factory: n.ɵfac, providedIn: "root" })),
          n
        );
      })();
      class I3 {}
      class k3 {
        shouldProcessUrl(e) {
          return !0;
        }
        extract(e) {
          return e;
        }
        merge(e, t) {
          return e;
        }
      }
      function N3(n) {
        throw n;
      }
      function R3(n, e, t) {
        return e.parse("/");
      }
      const F3 = {
          paths: "exact",
          fragment: "ignored",
          matrixParams: "ignored",
          queryParams: "exact",
        },
        L3 = {
          paths: "subset",
          fragment: "ignored",
          matrixParams: "ignored",
          queryParams: "subset",
        };
      function IM() {
        const n = Qe(Gw),
          e = Qe(xa),
          t = Qe(Ch),
          r = Qe(vn),
          o = Qe(ih),
          i = Qe(Ip, { optional: !0 }) ?? [],
          s = Qe(tu, { optional: !0 }) ?? {},
          a = Qe(AM),
          c = Qe(SM, { optional: !0 }),
          l = Qe(I3, { optional: !0 }),
          u = Qe(x3, { optional: !0 }),
          d = new Ye(null, n, e, t, r, o, Vw(i));
        return (
          l && (d.urlHandlingStrategy = l),
          u && (d.routeReuseStrategy = u),
          (d.titleStrategy = c ?? a),
          (function V3(n, e) {
            n.errorHandler && (e.errorHandler = n.errorHandler),
              n.malformedUriErrorHandler &&
                (e.malformedUriErrorHandler = n.malformedUriErrorHandler),
              n.onSameUrlNavigation &&
                (e.onSameUrlNavigation = n.onSameUrlNavigation),
              n.paramsInheritanceStrategy &&
                (e.paramsInheritanceStrategy = n.paramsInheritanceStrategy),
              n.relativeLinkResolution &&
                (e.relativeLinkResolution = n.relativeLinkResolution),
              n.urlUpdateStrategy &&
                (e.urlUpdateStrategy = n.urlUpdateStrategy),
              n.canceledNavigationResolution &&
                (e.canceledNavigationResolution =
                  n.canceledNavigationResolution);
          })(s, d),
          d
        );
      }
      let Ye = (() => {
        class n {
          constructor(t, r, o, i, s, a, c) {
            (this.rootComponentType = t),
              (this.urlSerializer = r),
              (this.rootContexts = o),
              (this.location = i),
              (this.config = c),
              (this.lastSuccessfulNavigation = null),
              (this.currentNavigation = null),
              (this.disposed = !1),
              (this.navigationId = 0),
              (this.currentPageId = 0),
              (this.isNgZoneEnabled = !1),
              (this.events = new We()),
              (this.errorHandler = N3),
              (this.malformedUriErrorHandler = R3),
              (this.navigated = !1),
              (this.lastSuccessfulId = -1),
              (this.afterPreactivation = () => V(void 0)),
              (this.urlHandlingStrategy = new k3()),
              (this.routeReuseStrategy = new A3()),
              (this.onSameUrlNavigation = "ignore"),
              (this.paramsInheritanceStrategy = "emptyOnly"),
              (this.urlUpdateStrategy = "deferred"),
              (this.relativeLinkResolution = "corrected"),
              (this.canceledNavigationResolution = "replace"),
              (this.configLoader = s.get(kp)),
              (this.configLoader.onLoadEndListener = (f) =>
                this.triggerEvent(new yF(f))),
              (this.configLoader.onLoadStartListener = (f) =>
                this.triggerEvent(new _F(f))),
              (this.ngModule = s.get(jo)),
              (this.console = s.get(DI));
            const d = s.get(Ge);
            (this.isNgZoneEnabled = d instanceof Ge && Ge.isInAngularZone()),
              this.resetConfig(c),
              (this.currentUrlTree = (function UR() {
                return new Ko(new he([], {}), {}, null);
              })()),
              (this.rawUrlTree = this.currentUrlTree),
              (this.browserUrlTree = this.currentUrlTree),
              (this.routerState = iM(
                this.currentUrlTree,
                this.rootComponentType
              )),
              (this.transitions = new $e({
                id: 0,
                targetPageId: 0,
                currentUrlTree: this.currentUrlTree,
                currentRawUrl: this.currentUrlTree,
                extractedUrl: this.urlHandlingStrategy.extract(
                  this.currentUrlTree
                ),
                urlAfterRedirects: this.urlHandlingStrategy.extract(
                  this.currentUrlTree
                ),
                rawUrl: this.currentUrlTree,
                extras: {},
                resolve: null,
                reject: null,
                promise: Promise.resolve(!0),
                source: "imperative",
                restoredState: null,
                currentSnapshot: this.routerState.snapshot,
                targetSnapshot: null,
                currentRouterState: this.routerState,
                targetRouterState: null,
                guards: { canActivateChecks: [], canDeactivateChecks: [] },
                guardsResult: null,
              })),
              (this.navigations = this.setupNavigations(this.transitions)),
              this.processNavigations();
          }
          get browserPageId() {
            return this.location.getState()?.ɵrouterPageId;
          }
          setupNavigations(t) {
            const r = this.events;
            return t.pipe(
              Dr((o) => 0 !== o.id),
              U((o) => ({
                ...o,
                extractedUrl: this.urlHandlingStrategy.extract(o.rawUrl),
              })),
              Mr((o) => {
                let i = !1,
                  s = !1;
                return V(o).pipe(
                  He((a) => {
                    this.currentNavigation = {
                      id: a.id,
                      initialUrl: a.rawUrl,
                      extractedUrl: a.extractedUrl,
                      trigger: a.source,
                      extras: a.extras,
                      previousNavigation: this.lastSuccessfulNavigation
                        ? {
                            ...this.lastSuccessfulNavigation,
                            previousNavigation: null,
                          }
                        : null,
                    };
                  }),
                  Mr((a) => {
                    const c = this.browserUrlTree.toString(),
                      l =
                        !this.navigated ||
                        a.extractedUrl.toString() !== c ||
                        c !== this.currentUrlTree.toString();
                    if (
                      ("reload" === this.onSameUrlNavigation || l) &&
                      this.urlHandlingStrategy.shouldProcessUrl(a.rawUrl)
                    )
                      return (
                        kM(a.source) && (this.browserUrlTree = a.extractedUrl),
                        V(a).pipe(
                          Mr((d) => {
                            const f = this.transitions.getValue();
                            return (
                              r.next(
                                new _p(
                                  d.id,
                                  this.serializeUrl(d.extractedUrl),
                                  d.source,
                                  d.restoredState
                                )
                              ),
                              f !== this.transitions.getValue()
                                ? kr
                                : Promise.resolve(d)
                            );
                          }),
                          (function h3(n, e, t, r) {
                            return Mr((o) =>
                              (function d3(n, e, t, r, o) {
                                return new f3(n, e, t, r, o).apply();
                              })(n, e, t, o.extractedUrl, r).pipe(
                                U((i) => ({ ...o, urlAfterRedirects: i }))
                              )
                            );
                          })(
                            this.ngModule.injector,
                            this.configLoader,
                            this.urlSerializer,
                            this.config
                          ),
                          He((d) => {
                            (this.currentNavigation = {
                              ...this.currentNavigation,
                              finalUrl: d.urlAfterRedirects,
                            }),
                              (o.urlAfterRedirects = d.urlAfterRedirects);
                          }),
                          (function w3(n, e, t, r, o, i) {
                            return At((s) =>
                              (function m3(
                                n,
                                e,
                                t,
                                r,
                                o,
                                i,
                                s = "emptyOnly",
                                a = "legacy"
                              ) {
                                return new _3(n, e, t, r, o, s, a, i)
                                  .recognize()
                                  .pipe(
                                    Mr((c) =>
                                      null === c
                                        ? (function g3(n) {
                                            return new Re((e) => e.error(n));
                                          })(new p3())
                                        : V(c)
                                    )
                                  );
                              })(
                                n,
                                e,
                                t,
                                s.urlAfterRedirects,
                                r.serialize(s.urlAfterRedirects),
                                r,
                                o,
                                i
                              ).pipe(U((a) => ({ ...s, targetSnapshot: a })))
                            );
                          })(
                            this.ngModule.injector,
                            this.rootComponentType,
                            this.config,
                            this.urlSerializer,
                            this.paramsInheritanceStrategy,
                            this.relativeLinkResolution
                          ),
                          He((d) => {
                            if (
                              ((o.targetSnapshot = d.targetSnapshot),
                              "eager" === this.urlUpdateStrategy)
                            ) {
                              if (!d.extras.skipLocationChange) {
                                const h = this.urlHandlingStrategy.merge(
                                  d.urlAfterRedirects,
                                  d.rawUrl
                                );
                                this.setBrowserUrl(h, d);
                              }
                              this.browserUrlTree = d.urlAfterRedirects;
                            }
                            const f = new fF(
                              d.id,
                              this.serializeUrl(d.extractedUrl),
                              this.serializeUrl(d.urlAfterRedirects),
                              d.targetSnapshot
                            );
                            r.next(f);
                          })
                        )
                      );
                    if (
                      l &&
                      this.rawUrlTree &&
                      this.urlHandlingStrategy.shouldProcessUrl(this.rawUrlTree)
                    ) {
                      const {
                          id: f,
                          extractedUrl: h,
                          source: p,
                          restoredState: m,
                          extras: y,
                        } = a,
                        C = new _p(f, this.serializeUrl(h), p, m);
                      r.next(C);
                      const O = iM(h, this.rootComponentType).snapshot;
                      return V(
                        (o = {
                          ...a,
                          targetSnapshot: O,
                          urlAfterRedirects: h,
                          extras: {
                            ...y,
                            skipLocationChange: !1,
                            replaceUrl: !1,
                          },
                        })
                      );
                    }
                    return (this.rawUrlTree = a.rawUrl), a.resolve(null), kr;
                  }),
                  He((a) => {
                    const c = new hF(
                      a.id,
                      this.serializeUrl(a.extractedUrl),
                      this.serializeUrl(a.urlAfterRedirects),
                      a.targetSnapshot
                    );
                    this.triggerEvent(c);
                  }),
                  U(
                    (a) =>
                      (o = {
                        ...a,
                        guards: LF(
                          a.targetSnapshot,
                          a.currentSnapshot,
                          this.rootContexts
                        ),
                      })
                  ),
                  (function KF(n, e) {
                    return At((t) => {
                      const {
                        targetSnapshot: r,
                        currentSnapshot: o,
                        guards: {
                          canActivateChecks: i,
                          canDeactivateChecks: s,
                        },
                      } = t;
                      return 0 === s.length && 0 === i.length
                        ? V({ ...t, guardsResult: !0 })
                        : (function QF(n, e, t, r) {
                            return dt(n).pipe(
                              At((o) =>
                                (function t3(n, e, t, r, o) {
                                  const i =
                                    e && e.routeConfig
                                      ? e.routeConfig.canDeactivate
                                      : null;
                                  return i && 0 !== i.length
                                    ? V(
                                        i.map((a) => {
                                          const c = Sa(e) ?? o,
                                            l = rs(a, c);
                                          return Co(
                                            (function GF(n) {
                                              return n && Ia(n.canDeactivate);
                                            })(l)
                                              ? l.canDeactivate(n, e, t, r)
                                              : c.runInContext(() =>
                                                  l(n, e, t, r)
                                                )
                                          ).pipe(yo());
                                        })
                                      ).pipe(os())
                                    : V(!0);
                                })(o.component, o.route, t, e, r)
                              ),
                              yo((o) => !0 !== o, !0)
                            );
                          })(s, r, o, n).pipe(
                            At((a) =>
                              a &&
                              (function UF(n) {
                                return "boolean" == typeof n;
                              })(a)
                                ? (function ZF(n, e, t, r) {
                                    return dt(e).pipe(
                                      vo((o) =>
                                        Ll(
                                          (function JF(n, e) {
                                            return (
                                              null !== n && e && e(new vF(n)),
                                              V(!0)
                                            );
                                          })(o.route.parent, r),
                                          (function YF(n, e) {
                                            return (
                                              null !== n && e && e(new bF(n)),
                                              V(!0)
                                            );
                                          })(o.route, r),
                                          (function e3(n, e, t) {
                                            const r = e[e.length - 1],
                                              i = e
                                                .slice(0, e.length - 1)
                                                .reverse()
                                                .map((s) =>
                                                  (function VF(n) {
                                                    const e = n.routeConfig
                                                      ? n.routeConfig
                                                          .canActivateChild
                                                      : null;
                                                    return e && 0 !== e.length
                                                      ? { node: n, guards: e }
                                                      : null;
                                                  })(s)
                                                )
                                                .filter((s) => null !== s)
                                                .map((s) =>
                                                  Tw(() =>
                                                    V(
                                                      s.guards.map((c) => {
                                                        const l =
                                                            Sa(s.node) ?? t,
                                                          u = rs(c, l);
                                                        return Co(
                                                          (function zF(n) {
                                                            return (
                                                              n &&
                                                              Ia(
                                                                n.canActivateChild
                                                              )
                                                            );
                                                          })(u)
                                                            ? u.canActivateChild(
                                                                r,
                                                                n
                                                              )
                                                            : l.runInContext(
                                                                () => u(r, n)
                                                              )
                                                        ).pipe(yo());
                                                      })
                                                    ).pipe(os())
                                                  )
                                                );
                                            return V(i).pipe(os());
                                          })(n, o.path, t),
                                          (function XF(n, e, t) {
                                            const r = e.routeConfig
                                              ? e.routeConfig.canActivate
                                              : null;
                                            if (!r || 0 === r.length)
                                              return V(!0);
                                            const o = r.map((i) =>
                                              Tw(() => {
                                                const s = Sa(e) ?? t,
                                                  a = rs(i, s);
                                                return Co(
                                                  (function HF(n) {
                                                    return (
                                                      n && Ia(n.canActivate)
                                                    );
                                                  })(a)
                                                    ? a.canActivate(e, n)
                                                    : s.runInContext(() =>
                                                        a(e, n)
                                                      )
                                                ).pipe(yo());
                                              })
                                            );
                                            return V(o).pipe(os());
                                          })(n, o.route, t)
                                        )
                                      ),
                                      yo((o) => !0 !== o, !0)
                                    );
                                  })(r, i, n, e)
                                : V(a)
                            ),
                            U((a) => ({ ...t, guardsResult: a }))
                          );
                    });
                  })(this.ngModule.injector, (a) => this.triggerEvent(a)),
                  He((a) => {
                    if (((o.guardsResult = a.guardsResult), Zo(a.guardsResult)))
                      throw lM(0, a.guardsResult);
                    const c = new pF(
                      a.id,
                      this.serializeUrl(a.extractedUrl),
                      this.serializeUrl(a.urlAfterRedirects),
                      a.targetSnapshot,
                      !!a.guardsResult
                    );
                    this.triggerEvent(c);
                  }),
                  Dr(
                    (a) =>
                      !!a.guardsResult ||
                      (this.restoreHistory(a),
                      this.cancelNavigationTransition(a, "", 3),
                      !1)
                  ),
                  Tp((a) => {
                    if (a.guards.canActivateChecks.length)
                      return V(a).pipe(
                        He((c) => {
                          const l = new gF(
                            c.id,
                            this.serializeUrl(c.extractedUrl),
                            this.serializeUrl(c.urlAfterRedirects),
                            c.targetSnapshot
                          );
                          this.triggerEvent(l);
                        }),
                        Mr((c) => {
                          let l = !1;
                          return V(c).pipe(
                            (function M3(n, e) {
                              return At((t) => {
                                const {
                                  targetSnapshot: r,
                                  guards: { canActivateChecks: o },
                                } = t;
                                if (!o.length) return V(t);
                                let i = 0;
                                return dt(o).pipe(
                                  vo((s) =>
                                    (function D3(n, e, t, r) {
                                      const o = n.routeConfig,
                                        i = n._resolve;
                                      return (
                                        void 0 !== o?.title &&
                                          !xM(o) &&
                                          (i[ba] = o.title),
                                        (function E3(n, e, t, r) {
                                          const o = (function O3(n) {
                                            return [
                                              ...Object.keys(n),
                                              ...Object.getOwnPropertySymbols(
                                                n
                                              ),
                                            ];
                                          })(n);
                                          if (0 === o.length) return V({});
                                          const i = {};
                                          return dt(o).pipe(
                                            At((s) =>
                                              (function P3(n, e, t, r) {
                                                const o = Sa(e) ?? r,
                                                  i = rs(n, o);
                                                return Co(
                                                  i.resolve
                                                    ? i.resolve(e, t)
                                                    : o.runInContext(() =>
                                                        i(e, t)
                                                      )
                                                );
                                              })(n[s], e, t, r).pipe(
                                                yo(),
                                                He((a) => {
                                                  i[s] = a;
                                                })
                                              )
                                            ),
                                            cp(1),
                                            (function LR(n) {
                                              return U(() => n);
                                            })(i),
                                            Er((s) => (xp(s) ? kr : Ca(s)))
                                          );
                                        })(i, n, e, r).pipe(
                                          U(
                                            (s) => (
                                              (n._resolvedData = s),
                                              (n.data = sM(n, t).resolve),
                                              o &&
                                                xM(o) &&
                                                (n.data[ba] = o.title),
                                              null
                                            )
                                          )
                                        )
                                      );
                                    })(s.route, r, n, e)
                                  ),
                                  He(() => i++),
                                  cp(1),
                                  At((s) => (i === o.length ? V(t) : kr))
                                );
                              });
                            })(
                              this.paramsInheritanceStrategy,
                              this.ngModule.injector
                            ),
                            He({
                              next: () => (l = !0),
                              complete: () => {
                                l ||
                                  (this.restoreHistory(c),
                                  this.cancelNavigationTransition(c, "", 2));
                              },
                            })
                          );
                        }),
                        He((c) => {
                          const l = new mF(
                            c.id,
                            this.serializeUrl(c.extractedUrl),
                            this.serializeUrl(c.urlAfterRedirects),
                            c.targetSnapshot
                          );
                          this.triggerEvent(l);
                        })
                      );
                  }),
                  Tp((a) => {
                    const c = (l) => {
                      const u = [];
                      l.routeConfig?.loadComponent &&
                        !l.routeConfig._loadedComponent &&
                        u.push(
                          this.configLoader.loadComponent(l.routeConfig).pipe(
                            He((d) => {
                              l.component = d;
                            }),
                            U(() => {})
                          )
                        );
                      for (const d of l.children) u.push(...c(d));
                      return u;
                    };
                    return sp(c(a.targetSnapshot.root)).pipe(Vl(), Ji(1));
                  }),
                  Tp(() => this.afterPreactivation()),
                  U((a) => {
                    const c = (function OF(n, e, t) {
                      const r = Pa(n, e._root, t ? t._root : void 0);
                      return new oM(r, e);
                    })(
                      this.routeReuseStrategy,
                      a.targetSnapshot,
                      a.currentRouterState
                    );
                    return (o = { ...a, targetRouterState: c });
                  }),
                  He((a) => {
                    (this.currentUrlTree = a.urlAfterRedirects),
                      (this.rawUrlTree = this.urlHandlingStrategy.merge(
                        a.urlAfterRedirects,
                        a.rawUrl
                      )),
                      (this.routerState = a.targetRouterState),
                      "deferred" === this.urlUpdateStrategy &&
                        (a.extras.skipLocationChange ||
                          this.setBrowserUrl(this.rawUrlTree, a),
                        (this.browserUrlTree = a.urlAfterRedirects));
                  }),
                  ((n, e, t) =>
                    U(
                      (r) => (
                        new FF(
                          e,
                          r.targetRouterState,
                          r.currentRouterState,
                          t
                        ).activate(n),
                        r
                      )
                    ))(this.rootContexts, this.routeReuseStrategy, (a) =>
                    this.triggerEvent(a)
                  ),
                  He({
                    next() {
                      i = !0;
                    },
                    complete() {
                      i = !0;
                    },
                  }),
                  lp(() => {
                    i || s || this.cancelNavigationTransition(o, "", 1),
                      this.currentNavigation?.id === o.id &&
                        (this.currentNavigation = null);
                  }),
                  Er((a) => {
                    if (((s = !0), fM(a))) {
                      dM(a) ||
                        ((this.navigated = !0), this.restoreHistory(o, !0));
                      const c = new Gl(
                        o.id,
                        this.serializeUrl(o.extractedUrl),
                        a.message,
                        a.cancellationCode
                      );
                      if ((r.next(c), dM(a))) {
                        const l = this.urlHandlingStrategy.merge(
                            a.url,
                            this.rawUrlTree
                          ),
                          u = {
                            skipLocationChange: o.extras.skipLocationChange,
                            replaceUrl:
                              "eager" === this.urlUpdateStrategy ||
                              kM(o.source),
                          };
                        this.scheduleNavigation(l, "imperative", null, u, {
                          resolve: o.resolve,
                          reject: o.reject,
                          promise: o.promise,
                        });
                      } else o.resolve(!1);
                    } else {
                      this.restoreHistory(o, !0);
                      const c = new tM(
                        o.id,
                        this.serializeUrl(o.extractedUrl),
                        a,
                        o.targetSnapshot ?? void 0
                      );
                      r.next(c);
                      try {
                        o.resolve(this.errorHandler(a));
                      } catch (l) {
                        o.reject(l);
                      }
                    }
                    return kr;
                  })
                );
              })
            );
          }
          resetRootComponentType(t) {
            (this.rootComponentType = t),
              (this.routerState.root.component = this.rootComponentType);
          }
          setTransition(t) {
            this.transitions.next({ ...this.transitions.value, ...t });
          }
          initialNavigation() {
            this.setUpLocationChangeListener(),
              0 === this.navigationId &&
                this.navigateByUrl(this.location.path(!0), { replaceUrl: !0 });
          }
          setUpLocationChangeListener() {
            this.locationSubscription ||
              (this.locationSubscription = this.location.subscribe((t) => {
                const r = "popstate" === t.type ? "popstate" : "hashchange";
                "popstate" === r &&
                  setTimeout(() => {
                    const o = { replaceUrl: !0 },
                      i = t.state?.navigationId ? t.state : null;
                    if (i) {
                      const a = { ...i };
                      delete a.navigationId,
                        delete a.ɵrouterPageId,
                        0 !== Object.keys(a).length && (o.state = a);
                    }
                    const s = this.parseUrl(t.url);
                    this.scheduleNavigation(s, r, i, o);
                  }, 0);
              }));
          }
          get url() {
            return this.serializeUrl(this.currentUrlTree);
          }
          getCurrentNavigation() {
            return this.currentNavigation;
          }
          triggerEvent(t) {
            this.events.next(t);
          }
          resetConfig(t) {
            (this.config = t.map(Pp)),
              (this.navigated = !1),
              (this.lastSuccessfulId = -1);
          }
          ngOnDestroy() {
            this.dispose();
          }
          dispose() {
            this.transitions.complete(),
              this.locationSubscription &&
                (this.locationSubscription.unsubscribe(),
                (this.locationSubscription = void 0)),
              (this.disposed = !0);
          }
          createUrlTree(t, r = {}) {
            const {
                relativeTo: o,
                queryParams: i,
                fragment: s,
                queryParamsHandling: a,
                preserveFragment: c,
              } = r,
              l = o || this.routerState.root,
              u = c ? this.currentUrlTree.fragment : s;
            let d = null;
            switch (a) {
              case "merge":
                d = { ...this.currentUrlTree.queryParams, ...i };
                break;
              case "preserve":
                d = this.currentUrlTree.queryParams;
                break;
              default:
                d = i || null;
            }
            return (
              null !== d && (d = this.removeEmptyProps(d)),
              sF(l, this.currentUrlTree, t, d, u ?? null)
            );
          }
          navigateByUrl(t, r = { skipLocationChange: !1 }) {
            const o = Zo(t) ? t : this.parseUrl(t),
              i = this.urlHandlingStrategy.merge(o, this.rawUrlTree);
            return this.scheduleNavigation(i, "imperative", null, r);
          }
          navigate(t, r = { skipLocationChange: !1 }) {
            return (
              (function B3(n) {
                for (let e = 0; e < n.length; e++) {
                  if (null == n[e]) throw new M(4008, false);
                }
              })(t),
              this.navigateByUrl(this.createUrlTree(t, r), r)
            );
          }
          serializeUrl(t) {
            return this.urlSerializer.serialize(t);
          }
          parseUrl(t) {
            let r;
            try {
              r = this.urlSerializer.parse(t);
            } catch (o) {
              r = this.malformedUriErrorHandler(o, this.urlSerializer, t);
            }
            return r;
          }
          isActive(t, r) {
            let o;
            if (((o = !0 === r ? { ...F3 } : !1 === r ? { ...L3 } : r), Zo(t)))
              return Uw(this.currentUrlTree, t, o);
            const i = this.parseUrl(t);
            return Uw(this.currentUrlTree, i, o);
          }
          removeEmptyProps(t) {
            return Object.keys(t).reduce((r, o) => {
              const i = t[o];
              return null != i && (r[o] = i), r;
            }, {});
          }
          processNavigations() {
            this.navigations.subscribe(
              (t) => {
                (this.navigated = !0),
                  (this.lastSuccessfulId = t.id),
                  (this.currentPageId = t.targetPageId),
                  this.events.next(
                    new Yo(
                      t.id,
                      this.serializeUrl(t.extractedUrl),
                      this.serializeUrl(this.currentUrlTree)
                    )
                  ),
                  (this.lastSuccessfulNavigation = this.currentNavigation),
                  this.titleStrategy?.updateTitle(this.routerState.snapshot),
                  t.resolve(!0);
              },
              (t) => {
                this.console.warn(`Unhandled Navigation Error: ${t}`);
              }
            );
          }
          scheduleNavigation(t, r, o, i, s) {
            if (this.disposed) return Promise.resolve(!1);
            let a, c, l;
            s
              ? ((a = s.resolve), (c = s.reject), (l = s.promise))
              : (l = new Promise((f, h) => {
                  (a = f), (c = h);
                }));
            const u = ++this.navigationId;
            let d;
            return (
              "computed" === this.canceledNavigationResolution
                ? (0 === this.currentPageId && (o = this.location.getState()),
                  (d =
                    o && o.ɵrouterPageId
                      ? o.ɵrouterPageId
                      : i.replaceUrl || i.skipLocationChange
                      ? this.browserPageId ?? 0
                      : (this.browserPageId ?? 0) + 1))
                : (d = 0),
              this.setTransition({
                id: u,
                targetPageId: d,
                source: r,
                restoredState: o,
                currentUrlTree: this.currentUrlTree,
                currentRawUrl: this.rawUrlTree,
                rawUrl: t,
                extras: i,
                resolve: a,
                reject: c,
                promise: l,
                currentSnapshot: this.routerState.snapshot,
                currentRouterState: this.routerState,
              }),
              l.catch((f) => Promise.reject(f))
            );
          }
          setBrowserUrl(t, r) {
            const o = this.urlSerializer.serialize(t),
              i = {
                ...r.extras.state,
                ...this.generateNgRouterState(r.id, r.targetPageId),
              };
            this.location.isCurrentPathEqualTo(o) || r.extras.replaceUrl
              ? this.location.replaceState(o, "", i)
              : this.location.go(o, "", i);
          }
          restoreHistory(t, r = !1) {
            if ("computed" === this.canceledNavigationResolution) {
              const o = this.currentPageId - t.targetPageId;
              ("popstate" !== t.source &&
                "eager" !== this.urlUpdateStrategy &&
                this.currentUrlTree !== this.currentNavigation?.finalUrl) ||
              0 === o
                ? this.currentUrlTree === this.currentNavigation?.finalUrl &&
                  0 === o &&
                  (this.resetState(t),
                  (this.browserUrlTree = t.currentUrlTree),
                  this.resetUrlToCurrentUrlTree())
                : this.location.historyGo(o);
            } else
              "replace" === this.canceledNavigationResolution &&
                (r && this.resetState(t), this.resetUrlToCurrentUrlTree());
          }
          resetState(t) {
            (this.routerState = t.currentRouterState),
              (this.currentUrlTree = t.currentUrlTree),
              (this.rawUrlTree = this.urlHandlingStrategy.merge(
                this.currentUrlTree,
                t.rawUrl
              ));
          }
          resetUrlToCurrentUrlTree() {
            this.location.replaceState(
              this.urlSerializer.serialize(this.rawUrlTree),
              "",
              this.generateNgRouterState(
                this.lastSuccessfulId,
                this.currentPageId
              )
            );
          }
          cancelNavigationTransition(t, r, o) {
            const i = new Gl(t.id, this.serializeUrl(t.extractedUrl), r, o);
            this.triggerEvent(i), t.resolve(!1);
          }
          generateNgRouterState(t, r) {
            return "computed" === this.canceledNavigationResolution
              ? { navigationId: t, ɵrouterPageId: r }
              : { navigationId: t };
          }
        }
        return (
          (n.ɵfac = function (t) {
            cf();
          }),
          (n.ɵprov = R({
            token: n,
            factory: function () {
              return IM();
            },
            providedIn: "root",
          })),
          n
        );
      })();
      function kM(n) {
        return "imperative" !== n;
      }
      let Xo = (() => {
          class n {
            constructor(t, r, o, i, s) {
              (this.router = t),
                (this.route = r),
                (this.tabIndexAttribute = o),
                (this.renderer = i),
                (this.el = s),
                (this._preserveFragment = !1),
                (this._skipLocationChange = !1),
                (this._replaceUrl = !1),
                (this.commands = null),
                (this.onChanges = new We()),
                this.setTabIndexIfNotOnNativeEl("0");
            }
            set preserveFragment(t) {
              this._preserveFragment = Gr(t);
            }
            get preserveFragment() {
              return this._preserveFragment;
            }
            set skipLocationChange(t) {
              this._skipLocationChange = Gr(t);
            }
            get skipLocationChange() {
              return this._skipLocationChange;
            }
            set replaceUrl(t) {
              this._replaceUrl = Gr(t);
            }
            get replaceUrl() {
              return this._replaceUrl;
            }
            setTabIndexIfNotOnNativeEl(t) {
              if (null != this.tabIndexAttribute) return;
              const r = this.renderer,
                o = this.el.nativeElement;
              null !== t
                ? r.setAttribute(o, "tabindex", t)
                : r.removeAttribute(o, "tabindex");
            }
            ngOnChanges(t) {
              this.onChanges.next(this);
            }
            set routerLink(t) {
              null != t
                ? ((this.commands = Array.isArray(t) ? t : [t]),
                  this.setTabIndexIfNotOnNativeEl("0"))
                : ((this.commands = null),
                  this.setTabIndexIfNotOnNativeEl(null));
            }
            onClick() {
              return (
                null === this.urlTree ||
                  this.router.navigateByUrl(this.urlTree, {
                    skipLocationChange: this.skipLocationChange,
                    replaceUrl: this.replaceUrl,
                    state: this.state,
                  }),
                !0
              );
            }
            get urlTree() {
              return null === this.commands
                ? null
                : this.router.createUrlTree(this.commands, {
                    relativeTo:
                      void 0 !== this.relativeTo ? this.relativeTo : this.route,
                    queryParams: this.queryParams,
                    fragment: this.fragment,
                    queryParamsHandling: this.queryParamsHandling,
                    preserveFragment: this.preserveFragment,
                  });
            }
          }
          return (
            (n.ɵfac = function (t) {
              return new (t || n)(w(Ye), w(Jo), Ds("tabindex"), w(Br), w(Ft));
            }),
            (n.ɵdir = G({
              type: n,
              selectors: [["", "routerLink", "", 5, "a", 5, "area"]],
              hostBindings: function (t, r) {
                1 & t &&
                  me("click", function () {
                    return r.onClick();
                  });
              },
              inputs: {
                queryParams: "queryParams",
                fragment: "fragment",
                queryParamsHandling: "queryParamsHandling",
                state: "state",
                relativeTo: "relativeTo",
                preserveFragment: "preserveFragment",
                skipLocationChange: "skipLocationChange",
                replaceUrl: "replaceUrl",
                routerLink: "routerLink",
              },
              standalone: !0,
              features: [kn],
            })),
            n
          );
        })(),
        ru = (() => {
          class n {
            constructor(t, r, o) {
              (this.router = t),
                (this.route = r),
                (this.locationStrategy = o),
                (this._preserveFragment = !1),
                (this._skipLocationChange = !1),
                (this._replaceUrl = !1),
                (this.commands = null),
                (this.href = null),
                (this.onChanges = new We()),
                (this.subscription = t.events.subscribe((i) => {
                  i instanceof Yo && this.updateTargetUrlAndHref();
                }));
            }
            set preserveFragment(t) {
              this._preserveFragment = Gr(t);
            }
            get preserveFragment() {
              return this._preserveFragment;
            }
            set skipLocationChange(t) {
              this._skipLocationChange = Gr(t);
            }
            get skipLocationChange() {
              return this._skipLocationChange;
            }
            set replaceUrl(t) {
              this._replaceUrl = Gr(t);
            }
            get replaceUrl() {
              return this._replaceUrl;
            }
            set routerLink(t) {
              this.commands = null != t ? (Array.isArray(t) ? t : [t]) : null;
            }
            ngOnChanges(t) {
              this.updateTargetUrlAndHref(), this.onChanges.next(this);
            }
            ngOnDestroy() {
              this.subscription.unsubscribe();
            }
            onClick(t, r, o, i, s) {
              return (
                !!(
                  0 !== t ||
                  r ||
                  o ||
                  i ||
                  s ||
                  ("string" == typeof this.target && "_self" != this.target) ||
                  null === this.urlTree
                ) ||
                (this.router.navigateByUrl(this.urlTree, {
                  skipLocationChange: this.skipLocationChange,
                  replaceUrl: this.replaceUrl,
                  state: this.state,
                }),
                !1)
              );
            }
            updateTargetUrlAndHref() {
              this.href =
                null !== this.urlTree
                  ? this.locationStrategy.prepareExternalUrl(
                      this.router.serializeUrl(this.urlTree)
                    )
                  : null;
            }
            get urlTree() {
              return null === this.commands
                ? null
                : this.router.createUrlTree(this.commands, {
                    relativeTo:
                      void 0 !== this.relativeTo ? this.relativeTo : this.route,
                    queryParams: this.queryParams,
                    fragment: this.fragment,
                    queryParamsHandling: this.queryParamsHandling,
                    preserveFragment: this.preserveFragment,
                  });
            }
          }
          return (
            (n.ɵfac = function (t) {
              return new (t || n)(w(Ye), w(Jo), w($o));
            }),
            (n.ɵdir = G({
              type: n,
              selectors: [
                ["a", "routerLink", ""],
                ["area", "routerLink", ""],
              ],
              hostVars: 2,
              hostBindings: function (t, r) {
                1 & t &&
                  me("click", function (i) {
                    return r.onClick(
                      i.button,
                      i.ctrlKey,
                      i.shiftKey,
                      i.altKey,
                      i.metaKey
                    );
                  }),
                  2 & t && Jn("target", r.target)("href", r.href, sn);
              },
              inputs: {
                target: "target",
                queryParams: "queryParams",
                fragment: "fragment",
                queryParamsHandling: "queryParamsHandling",
                state: "state",
                relativeTo: "relativeTo",
                preserveFragment: "preserveFragment",
                skipLocationChange: "skipLocationChange",
                replaceUrl: "replaceUrl",
                routerLink: "routerLink",
              },
              standalone: !0,
              features: [kn],
            })),
            n
          );
        })(),
        NM = (() => {
          class n {
            constructor(t, r, o, i, s, a) {
              (this.router = t),
                (this.element = r),
                (this.renderer = o),
                (this.cdr = i),
                (this.link = s),
                (this.linkWithHref = a),
                (this.classes = []),
                (this.isActive = !1),
                (this.routerLinkActiveOptions = { exact: !1 }),
                (this.isActiveChange = new it()),
                (this.routerEventsSubscription = t.events.subscribe((c) => {
                  c instanceof Yo && this.update();
                }));
            }
            ngAfterContentInit() {
              V(this.links.changes, this.linksWithHrefs.changes, V(null))
                .pipe(si())
                .subscribe((t) => {
                  this.update(), this.subscribeToEachLinkOnChanges();
                });
            }
            subscribeToEachLinkOnChanges() {
              this.linkInputChangesSubscription?.unsubscribe();
              const t = [
                ...this.links.toArray(),
                ...this.linksWithHrefs.toArray(),
                this.link,
                this.linkWithHref,
              ]
                .filter((r) => !!r)
                .map((r) => r.onChanges);
              this.linkInputChangesSubscription = dt(t)
                .pipe(si())
                .subscribe((r) => {
                  this.isActive !== this.isLinkActive(this.router)(r) &&
                    this.update();
                });
            }
            set routerLinkActive(t) {
              const r = Array.isArray(t) ? t : t.split(" ");
              this.classes = r.filter((o) => !!o);
            }
            ngOnChanges(t) {
              this.update();
            }
            ngOnDestroy() {
              this.routerEventsSubscription.unsubscribe(),
                this.linkInputChangesSubscription?.unsubscribe();
            }
            update() {
              !this.links ||
                !this.linksWithHrefs ||
                !this.router.navigated ||
                Promise.resolve().then(() => {
                  const t = this.hasActiveLinks();
                  this.isActive !== t &&
                    ((this.isActive = t),
                    this.cdr.markForCheck(),
                    this.classes.forEach((r) => {
                      t
                        ? this.renderer.addClass(this.element.nativeElement, r)
                        : this.renderer.removeClass(
                            this.element.nativeElement,
                            r
                          );
                    }),
                    t && void 0 !== this.ariaCurrentWhenActive
                      ? this.renderer.setAttribute(
                          this.element.nativeElement,
                          "aria-current",
                          this.ariaCurrentWhenActive.toString()
                        )
                      : this.renderer.removeAttribute(
                          this.element.nativeElement,
                          "aria-current"
                        ),
                    this.isActiveChange.emit(t));
                });
            }
            isLinkActive(t) {
              const r = (function j3(n) {
                return !!n.paths;
              })(this.routerLinkActiveOptions)
                ? this.routerLinkActiveOptions
                : this.routerLinkActiveOptions.exact || !1;
              return (o) => !!o.urlTree && t.isActive(o.urlTree, r);
            }
            hasActiveLinks() {
              const t = this.isLinkActive(this.router);
              return (
                (this.link && t(this.link)) ||
                (this.linkWithHref && t(this.linkWithHref)) ||
                this.links.some(t) ||
                this.linksWithHrefs.some(t)
              );
            }
          }
          return (
            (n.ɵfac = function (t) {
              return new (t || n)(
                w(Ye),
                w(Ft),
                w(Br),
                w(ol),
                w(Xo, 8),
                w(ru, 8)
              );
            }),
            (n.ɵdir = G({
              type: n,
              selectors: [["", "routerLinkActive", ""]],
              contentQueries: function (t, r, o) {
                if ((1 & t && (Xf(o, Xo, 5), Xf(o, ru, 5)), 2 & t)) {
                  let i;
                  qc((i = Kc())) && (r.links = i),
                    qc((i = Kc())) && (r.linksWithHrefs = i);
                }
              },
              inputs: {
                routerLinkActiveOptions: "routerLinkActiveOptions",
                ariaCurrentWhenActive: "ariaCurrentWhenActive",
                routerLinkActive: "routerLinkActive",
              },
              outputs: { isActiveChange: "isActiveChange" },
              exportAs: ["routerLinkActive"],
              standalone: !0,
              features: [kn],
            })),
            n
          );
        })();
      class RM {}
      let U3 = (() => {
        class n {
          constructor(t, r, o, i, s) {
            (this.router = t),
              (this.injector = o),
              (this.preloadingStrategy = i),
              (this.loader = s);
          }
          setUpPreloading() {
            this.subscription = this.router.events
              .pipe(
                Dr((t) => t instanceof Yo),
                vo(() => this.preload())
              )
              .subscribe(() => {});
          }
          preload() {
            return this.processRoutes(this.injector, this.router.config);
          }
          ngOnDestroy() {
            this.subscription && this.subscription.unsubscribe();
          }
          processRoutes(t, r) {
            const o = [];
            for (const i of r) {
              i.providers &&
                !i._injector &&
                (i._injector = Gc(i.providers, t, `Route: ${i.path}`));
              const s = i._injector ?? t,
                a = i._loadedInjector ?? s;
              (i.loadChildren && !i._loadedRoutes && void 0 === i.canLoad) ||
              (i.loadComponent && !i._loadedComponent)
                ? o.push(this.preloadConfig(s, i))
                : (i.children || i._loadedRoutes) &&
                  o.push(this.processRoutes(a, i.children ?? i._loadedRoutes));
            }
            return dt(o).pipe(si());
          }
          preloadConfig(t, r) {
            return this.preloadingStrategy.preload(r, () => {
              let o;
              o =
                r.loadChildren && void 0 === r.canLoad
                  ? this.loader.loadChildren(t, r)
                  : V(null);
              const i = o.pipe(
                At((s) =>
                  null === s
                    ? V(void 0)
                    : ((r._loadedRoutes = s.routes),
                      (r._loadedInjector = s.injector),
                      this.processRoutes(s.injector ?? t, s.routes))
                )
              );
              return r.loadComponent && !r._loadedComponent
                ? dt([i, this.loader.loadComponent(r)]).pipe(si())
                : i;
            });
          }
        }
        return (
          (n.ɵfac = function (t) {
            return new (t || n)(P(Ye), P(ih), P(co), P(RM), P(kp));
          }),
          (n.ɵprov = R({ token: n, factory: n.ɵfac, providedIn: "root" })),
          n
        );
      })();
      const Np = new F("");
      let FM = (() => {
        class n {
          constructor(t, r, o = {}) {
            (this.router = t),
              (this.viewportScroller = r),
              (this.options = o),
              (this.lastId = 0),
              (this.lastSource = "imperative"),
              (this.restoredId = 0),
              (this.store = {}),
              (o.scrollPositionRestoration =
                o.scrollPositionRestoration || "disabled"),
              (o.anchorScrolling = o.anchorScrolling || "disabled");
          }
          init() {
            "disabled" !== this.options.scrollPositionRestoration &&
              this.viewportScroller.setHistoryScrollRestoration("manual"),
              (this.routerEventsSubscription = this.createScrollEvents()),
              (this.scrollEventsSubscription = this.consumeScrollEvents());
          }
          createScrollEvents() {
            return this.router.events.subscribe((t) => {
              t instanceof _p
                ? ((this.store[this.lastId] =
                    this.viewportScroller.getScrollPosition()),
                  (this.lastSource = t.navigationTrigger),
                  (this.restoredId = t.restoredState
                    ? t.restoredState.navigationId
                    : 0))
                : t instanceof Yo &&
                  ((this.lastId = t.id),
                  this.scheduleScrollEvent(
                    t,
                    this.router.parseUrl(t.urlAfterRedirects).fragment
                  ));
            });
          }
          consumeScrollEvents() {
            return this.router.events.subscribe((t) => {
              t instanceof nM &&
                (t.position
                  ? "top" === this.options.scrollPositionRestoration
                    ? this.viewportScroller.scrollToPosition([0, 0])
                    : "enabled" === this.options.scrollPositionRestoration &&
                      this.viewportScroller.scrollToPosition(t.position)
                  : t.anchor && "enabled" === this.options.anchorScrolling
                  ? this.viewportScroller.scrollToAnchor(t.anchor)
                  : "disabled" !== this.options.scrollPositionRestoration &&
                    this.viewportScroller.scrollToPosition([0, 0]));
            });
          }
          scheduleScrollEvent(t, r) {
            this.router.triggerEvent(
              new nM(
                t,
                "popstate" === this.lastSource
                  ? this.store[this.restoredId]
                  : null,
                r
              )
            );
          }
          ngOnDestroy() {
            this.routerEventsSubscription &&
              this.routerEventsSubscription.unsubscribe(),
              this.scrollEventsSubscription &&
                this.scrollEventsSubscription.unsubscribe();
          }
        }
        return (
          (n.ɵfac = function (t) {
            cf();
          }),
          (n.ɵprov = R({ token: n, factory: n.ɵfac })),
          n
        );
      })();
      function is(n, e) {
        return { ɵkind: n, ɵproviders: e };
      }
      function Rp(n) {
        return [{ provide: Ip, multi: !0, useValue: n }];
      }
      function VM() {
        const n = Qe(vn);
        return (e) => {
          const t = n.get(ia);
          if (e !== t.components[0]) return;
          const r = n.get(Ye),
            o = n.get(BM);
          1 === n.get(Fp) && r.initialNavigation(),
            n.get(jM, null, z.Optional)?.setUpPreloading(),
            n.get(Np, null, z.Optional)?.init(),
            r.resetRootComponentType(t.componentTypes[0]),
            o.next(),
            o.complete();
        };
      }
      const BM = new F("", { factory: () => new We() }),
        Fp = new F("", { providedIn: "root", factory: () => 1 });
      const jM = new F("");
      function G3(n) {
        return is(0, [
          { provide: jM, useExisting: U3 },
          { provide: RM, useExisting: n },
        ]);
      }
      const UM = new F("ROUTER_FORROOT_GUARD"),
        W3 = [
          Ch,
          { provide: Gw, useClass: dp },
          { provide: Ye, useFactory: IM },
          xa,
          {
            provide: Jo,
            useFactory: function LM(n) {
              return n.routerState.root;
            },
            deps: [Ye],
          },
          kp,
        ];
      function q3() {
        return new lC("Router", Ye);
      }
      let $M = (() => {
        class n {
          constructor(t) {}
          static forRoot(t, r) {
            return {
              ngModule: n,
              providers: [
                W3,
                [],
                Rp(t),
                {
                  provide: UM,
                  useFactory: Y3,
                  deps: [[Ye, new Ts(), new Is()]],
                },
                { provide: tu, useValue: r || {} },
                r?.useHash
                  ? { provide: $o, useClass: h2 }
                  : { provide: $o, useClass: NC },
                {
                  provide: Np,
                  useFactory: () => {
                    const n = Qe(Ye),
                      e = Qe(Sk),
                      t = Qe(tu);
                    return (
                      t.scrollOffset && e.setOffset(t.scrollOffset),
                      new FM(n, e, t)
                    );
                  },
                },
                r?.preloadingStrategy
                  ? G3(r.preloadingStrategy).ɵproviders
                  : [],
                { provide: lC, multi: !0, useFactory: q3 },
                r?.initialNavigation ? J3(r) : [],
                [
                  { provide: HM, useFactory: VM },
                  { provide: nC, multi: !0, useExisting: HM },
                ],
              ],
            };
          }
          static forChild(t) {
            return { ngModule: n, providers: [Rp(t)] };
          }
        }
        return (
          (n.ɵfac = function (t) {
            return new (t || n)(P(UM, 8));
          }),
          (n.ɵmod = yt({ type: n })),
          (n.ɵinj = ft({ imports: [Ep] })),
          n
        );
      })();
      function Y3(n) {
        return "guarded";
      }
      function J3(n) {
        return [
          "disabled" === n.initialNavigation
            ? is(3, [
                {
                  provide: Jc,
                  multi: !0,
                  useFactory: () => {
                    const e = Qe(Ye);
                    return () => {
                      e.setUpLocationChangeListener();
                    };
                  },
                },
                { provide: Fp, useValue: 2 },
              ]).ɵproviders
            : [],
          "enabledBlocking" === n.initialNavigation
            ? is(2, [
                { provide: Fp, useValue: 0 },
                {
                  provide: Jc,
                  multi: !0,
                  deps: [vn],
                  useFactory: (e) => {
                    const t = e.get(d2, Promise.resolve());
                    let r = !1;
                    return () =>
                      t.then(
                        () =>
                          new Promise((i) => {
                            const s = e.get(Ye),
                              a = e.get(BM);
                            (function o(i) {
                              e.get(Ye)
                                .events.pipe(
                                  Dr(
                                    (a) =>
                                      a instanceof Yo ||
                                      a instanceof Gl ||
                                      a instanceof tM
                                  ),
                                  U(
                                    (a) =>
                                      a instanceof Yo ||
                                      (a instanceof Gl &&
                                        (0 === a.code || 1 === a.code) &&
                                        null)
                                  ),
                                  Dr((a) => null !== a),
                                  Ji(1)
                                )
                                .subscribe(() => {
                                  i();
                                });
                            })(() => {
                              i(!0), (r = !0);
                            }),
                              (s.afterPreactivation = () => (
                                i(!0), r || a.closed ? V(void 0) : a
                              )),
                              s.initialNavigation();
                          })
                      );
                  },
                },
              ]).ɵproviders
            : [],
        ];
      }
      const HM = new F("");
      class zM {}
      const Yr = "*";
      function GM(n, e) {
        return { type: 7, name: n, definitions: e, options: {} };
      }
      function WM(n, e = null) {
        return { type: 4, styles: e, timings: n };
      }
      function qM(n, e = null) {
        return { type: 2, steps: n, options: e };
      }
      function su(n) {
        return { type: 6, styles: n, offset: null };
      }
      function KM(n, e, t) {
        return { type: 0, name: n, styles: e, options: t };
      }
      function QM(n, e, t = null) {
        return { type: 1, expr: n, animation: e, options: t };
      }
      function ZM(n) {
        Promise.resolve().then(n);
      }
      class Na {
        constructor(e = 0, t = 0) {
          (this._onDoneFns = []),
            (this._onStartFns = []),
            (this._onDestroyFns = []),
            (this._originalOnDoneFns = []),
            (this._originalOnStartFns = []),
            (this._started = !1),
            (this._destroyed = !1),
            (this._finished = !1),
            (this._position = 0),
            (this.parentPlayer = null),
            (this.totalTime = e + t);
        }
        _onFinish() {
          this._finished ||
            ((this._finished = !0),
            this._onDoneFns.forEach((e) => e()),
            (this._onDoneFns = []));
        }
        onStart(e) {
          this._originalOnStartFns.push(e), this._onStartFns.push(e);
        }
        onDone(e) {
          this._originalOnDoneFns.push(e), this._onDoneFns.push(e);
        }
        onDestroy(e) {
          this._onDestroyFns.push(e);
        }
        hasStarted() {
          return this._started;
        }
        init() {}
        play() {
          this.hasStarted() || (this._onStart(), this.triggerMicrotask()),
            (this._started = !0);
        }
        triggerMicrotask() {
          ZM(() => this._onFinish());
        }
        _onStart() {
          this._onStartFns.forEach((e) => e()), (this._onStartFns = []);
        }
        pause() {}
        restart() {}
        finish() {
          this._onFinish();
        }
        destroy() {
          this._destroyed ||
            ((this._destroyed = !0),
            this.hasStarted() || this._onStart(),
            this.finish(),
            this._onDestroyFns.forEach((e) => e()),
            (this._onDestroyFns = []));
        }
        reset() {
          (this._started = !1),
            (this._finished = !1),
            (this._onStartFns = this._originalOnStartFns),
            (this._onDoneFns = this._originalOnDoneFns);
        }
        setPosition(e) {
          this._position = this.totalTime ? e * this.totalTime : 1;
        }
        getPosition() {
          return this.totalTime ? this._position / this.totalTime : 1;
        }
        triggerCallback(e) {
          const t = "start" == e ? this._onStartFns : this._onDoneFns;
          t.forEach((r) => r()), (t.length = 0);
        }
      }
      class YM {
        constructor(e) {
          (this._onDoneFns = []),
            (this._onStartFns = []),
            (this._finished = !1),
            (this._started = !1),
            (this._destroyed = !1),
            (this._onDestroyFns = []),
            (this.parentPlayer = null),
            (this.totalTime = 0),
            (this.players = e);
          let t = 0,
            r = 0,
            o = 0;
          const i = this.players.length;
          0 == i
            ? ZM(() => this._onFinish())
            : this.players.forEach((s) => {
                s.onDone(() => {
                  ++t == i && this._onFinish();
                }),
                  s.onDestroy(() => {
                    ++r == i && this._onDestroy();
                  }),
                  s.onStart(() => {
                    ++o == i && this._onStart();
                  });
              }),
            (this.totalTime = this.players.reduce(
              (s, a) => Math.max(s, a.totalTime),
              0
            ));
        }
        _onFinish() {
          this._finished ||
            ((this._finished = !0),
            this._onDoneFns.forEach((e) => e()),
            (this._onDoneFns = []));
        }
        init() {
          this.players.forEach((e) => e.init());
        }
        onStart(e) {
          this._onStartFns.push(e);
        }
        _onStart() {
          this.hasStarted() ||
            ((this._started = !0),
            this._onStartFns.forEach((e) => e()),
            (this._onStartFns = []));
        }
        onDone(e) {
          this._onDoneFns.push(e);
        }
        onDestroy(e) {
          this._onDestroyFns.push(e);
        }
        hasStarted() {
          return this._started;
        }
        play() {
          this.parentPlayer || this.init(),
            this._onStart(),
            this.players.forEach((e) => e.play());
        }
        pause() {
          this.players.forEach((e) => e.pause());
        }
        restart() {
          this.players.forEach((e) => e.restart());
        }
        finish() {
          this._onFinish(), this.players.forEach((e) => e.finish());
        }
        destroy() {
          this._onDestroy();
        }
        _onDestroy() {
          this._destroyed ||
            ((this._destroyed = !0),
            this._onFinish(),
            this.players.forEach((e) => e.destroy()),
            this._onDestroyFns.forEach((e) => e()),
            (this._onDestroyFns = []));
        }
        reset() {
          this.players.forEach((e) => e.reset()),
            (this._destroyed = !1),
            (this._finished = !1),
            (this._started = !1);
        }
        setPosition(e) {
          const t = e * this.totalTime;
          this.players.forEach((r) => {
            const o = r.totalTime ? Math.min(1, t / r.totalTime) : 1;
            r.setPosition(o);
          });
        }
        getPosition() {
          const e = this.players.reduce(
            (t, r) => (null === t || r.totalTime > t.totalTime ? r : t),
            null
          );
          return null != e ? e.getPosition() : 0;
        }
        beforeDestroy() {
          this.players.forEach((e) => {
            e.beforeDestroy && e.beforeDestroy();
          });
        }
        triggerCallback(e) {
          const t = "start" == e ? this._onStartFns : this._onDoneFns;
          t.forEach((r) => r()), (t.length = 0);
        }
      }
      class JM {}
      class XM {}
      class Jr {
        constructor(e) {
          (this.normalizedNames = new Map()),
            (this.lazyUpdate = null),
            e
              ? (this.lazyInit =
                  "string" == typeof e
                    ? () => {
                        (this.headers = new Map()),
                          e.split("\n").forEach((t) => {
                            const r = t.indexOf(":");
                            if (r > 0) {
                              const o = t.slice(0, r),
                                i = o.toLowerCase(),
                                s = t.slice(r + 1).trim();
                              this.maybeSetNormalizedName(o, i),
                                this.headers.has(i)
                                  ? this.headers.get(i).push(s)
                                  : this.headers.set(i, [s]);
                            }
                          });
                      }
                    : () => {
                        (this.headers = new Map()),
                          Object.keys(e).forEach((t) => {
                            let r = e[t];
                            const o = t.toLowerCase();
                            "string" == typeof r && (r = [r]),
                              r.length > 0 &&
                                (this.headers.set(o, r),
                                this.maybeSetNormalizedName(t, o));
                          });
                      })
              : (this.headers = new Map());
        }
        has(e) {
          return this.init(), this.headers.has(e.toLowerCase());
        }
        get(e) {
          this.init();
          const t = this.headers.get(e.toLowerCase());
          return t && t.length > 0 ? t[0] : null;
        }
        keys() {
          return this.init(), Array.from(this.normalizedNames.values());
        }
        getAll(e) {
          return this.init(), this.headers.get(e.toLowerCase()) || null;
        }
        append(e, t) {
          return this.clone({ name: e, value: t, op: "a" });
        }
        set(e, t) {
          return this.clone({ name: e, value: t, op: "s" });
        }
        delete(e, t) {
          return this.clone({ name: e, value: t, op: "d" });
        }
        maybeSetNormalizedName(e, t) {
          this.normalizedNames.has(t) || this.normalizedNames.set(t, e);
        }
        init() {
          this.lazyInit &&
            (this.lazyInit instanceof Jr
              ? this.copyFrom(this.lazyInit)
              : this.lazyInit(),
            (this.lazyInit = null),
            this.lazyUpdate &&
              (this.lazyUpdate.forEach((e) => this.applyUpdate(e)),
              (this.lazyUpdate = null)));
        }
        copyFrom(e) {
          e.init(),
            Array.from(e.headers.keys()).forEach((t) => {
              this.headers.set(t, e.headers.get(t)),
                this.normalizedNames.set(t, e.normalizedNames.get(t));
            });
        }
        clone(e) {
          const t = new Jr();
          return (
            (t.lazyInit =
              this.lazyInit && this.lazyInit instanceof Jr
                ? this.lazyInit
                : this),
            (t.lazyUpdate = (this.lazyUpdate || []).concat([e])),
            t
          );
        }
        applyUpdate(e) {
          const t = e.name.toLowerCase();
          switch (e.op) {
            case "a":
            case "s":
              let r = e.value;
              if (("string" == typeof r && (r = [r]), 0 === r.length)) return;
              this.maybeSetNormalizedName(e.name, t);
              const o = ("a" === e.op ? this.headers.get(t) : void 0) || [];
              o.push(...r), this.headers.set(t, o);
              break;
            case "d":
              const i = e.value;
              if (i) {
                let s = this.headers.get(t);
                if (!s) return;
                (s = s.filter((a) => -1 === i.indexOf(a))),
                  0 === s.length
                    ? (this.headers.delete(t), this.normalizedNames.delete(t))
                    : this.headers.set(t, s);
              } else this.headers.delete(t), this.normalizedNames.delete(t);
          }
        }
        forEach(e) {
          this.init(),
            Array.from(this.normalizedNames.keys()).forEach((t) =>
              e(this.normalizedNames.get(t), this.headers.get(t))
            );
        }
      }
      class t4 {
        encodeKey(e) {
          return e1(e);
        }
        encodeValue(e) {
          return e1(e);
        }
        decodeKey(e) {
          return decodeURIComponent(e);
        }
        decodeValue(e) {
          return decodeURIComponent(e);
        }
      }
      const r4 = /%(\d[a-f0-9])/gi,
        o4 = {
          40: "@",
          "3A": ":",
          24: "$",
          "2C": ",",
          "3B": ";",
          "3D": "=",
          "3F": "?",
          "2F": "/",
        };
      function e1(n) {
        return encodeURIComponent(n).replace(r4, (e, t) => o4[t] ?? e);
      }
      function au(n) {
        return `${n}`;
      }
      class Xr {
        constructor(e = {}) {
          if (
            ((this.updates = null),
            (this.cloneFrom = null),
            (this.encoder = e.encoder || new t4()),
            e.fromString)
          ) {
            if (e.fromObject)
              throw new Error("Cannot specify both fromString and fromObject.");
            this.map = (function n4(n, e) {
              const t = new Map();
              return (
                n.length > 0 &&
                  n
                    .replace(/^\?/, "")
                    .split("&")
                    .forEach((o) => {
                      const i = o.indexOf("="),
                        [s, a] =
                          -1 == i
                            ? [e.decodeKey(o), ""]
                            : [
                                e.decodeKey(o.slice(0, i)),
                                e.decodeValue(o.slice(i + 1)),
                              ],
                        c = t.get(s) || [];
                      c.push(a), t.set(s, c);
                    }),
                t
              );
            })(e.fromString, this.encoder);
          } else
            e.fromObject
              ? ((this.map = new Map()),
                Object.keys(e.fromObject).forEach((t) => {
                  const r = e.fromObject[t],
                    o = Array.isArray(r) ? r.map(au) : [au(r)];
                  this.map.set(t, o);
                }))
              : (this.map = null);
        }
        has(e) {
          return this.init(), this.map.has(e);
        }
        get(e) {
          this.init();
          const t = this.map.get(e);
          return t ? t[0] : null;
        }
        getAll(e) {
          return this.init(), this.map.get(e) || null;
        }
        keys() {
          return this.init(), Array.from(this.map.keys());
        }
        append(e, t) {
          return this.clone({ param: e, value: t, op: "a" });
        }
        appendAll(e) {
          const t = [];
          return (
            Object.keys(e).forEach((r) => {
              const o = e[r];
              Array.isArray(o)
                ? o.forEach((i) => {
                    t.push({ param: r, value: i, op: "a" });
                  })
                : t.push({ param: r, value: o, op: "a" });
            }),
            this.clone(t)
          );
        }
        set(e, t) {
          return this.clone({ param: e, value: t, op: "s" });
        }
        delete(e, t) {
          return this.clone({ param: e, value: t, op: "d" });
        }
        toString() {
          return (
            this.init(),
            this.keys()
              .map((e) => {
                const t = this.encoder.encodeKey(e);
                return this.map
                  .get(e)
                  .map((r) => t + "=" + this.encoder.encodeValue(r))
                  .join("&");
              })
              .filter((e) => "" !== e)
              .join("&")
          );
        }
        clone(e) {
          const t = new Xr({ encoder: this.encoder });
          return (
            (t.cloneFrom = this.cloneFrom || this),
            (t.updates = (this.updates || []).concat(e)),
            t
          );
        }
        init() {
          null === this.map && (this.map = new Map()),
            null !== this.cloneFrom &&
              (this.cloneFrom.init(),
              this.cloneFrom
                .keys()
                .forEach((e) => this.map.set(e, this.cloneFrom.map.get(e))),
              this.updates.forEach((e) => {
                switch (e.op) {
                  case "a":
                  case "s":
                    const t =
                      ("a" === e.op ? this.map.get(e.param) : void 0) || [];
                    t.push(au(e.value)), this.map.set(e.param, t);
                    break;
                  case "d":
                    if (void 0 === e.value) {
                      this.map.delete(e.param);
                      break;
                    }
                    {
                      let r = this.map.get(e.param) || [];
                      const o = r.indexOf(au(e.value));
                      -1 !== o && r.splice(o, 1),
                        r.length > 0
                          ? this.map.set(e.param, r)
                          : this.map.delete(e.param);
                    }
                }
              }),
              (this.cloneFrom = this.updates = null));
        }
      }
      class i4 {
        constructor() {
          this.map = new Map();
        }
        set(e, t) {
          return this.map.set(e, t), this;
        }
        get(e) {
          return (
            this.map.has(e) || this.map.set(e, e.defaultValue()),
            this.map.get(e)
          );
        }
        delete(e) {
          return this.map.delete(e), this;
        }
        has(e) {
          return this.map.has(e);
        }
        keys() {
          return this.map.keys();
        }
      }
      function t1(n) {
        return typeof ArrayBuffer < "u" && n instanceof ArrayBuffer;
      }
      function n1(n) {
        return typeof Blob < "u" && n instanceof Blob;
      }
      function r1(n) {
        return typeof FormData < "u" && n instanceof FormData;
      }
      class Ra {
        constructor(e, t, r, o) {
          let i;
          if (
            ((this.url = t),
            (this.body = null),
            (this.reportProgress = !1),
            (this.withCredentials = !1),
            (this.responseType = "json"),
            (this.method = e.toUpperCase()),
            (function s4(n) {
              switch (n) {
                case "DELETE":
                case "GET":
                case "HEAD":
                case "OPTIONS":
                case "JSONP":
                  return !1;
                default:
                  return !0;
              }
            })(this.method) || o
              ? ((this.body = void 0 !== r ? r : null), (i = o))
              : (i = r),
            i &&
              ((this.reportProgress = !!i.reportProgress),
              (this.withCredentials = !!i.withCredentials),
              i.responseType && (this.responseType = i.responseType),
              i.headers && (this.headers = i.headers),
              i.context && (this.context = i.context),
              i.params && (this.params = i.params)),
            this.headers || (this.headers = new Jr()),
            this.context || (this.context = new i4()),
            this.params)
          ) {
            const s = this.params.toString();
            if (0 === s.length) this.urlWithParams = t;
            else {
              const a = t.indexOf("?");
              this.urlWithParams =
                t + (-1 === a ? "?" : a < t.length - 1 ? "&" : "") + s;
            }
          } else (this.params = new Xr()), (this.urlWithParams = t);
        }
        serializeBody() {
          return null === this.body
            ? null
            : t1(this.body) ||
              n1(this.body) ||
              r1(this.body) ||
              (function a4(n) {
                return (
                  typeof URLSearchParams < "u" && n instanceof URLSearchParams
                );
              })(this.body) ||
              "string" == typeof this.body
            ? this.body
            : this.body instanceof Xr
            ? this.body.toString()
            : "object" == typeof this.body ||
              "boolean" == typeof this.body ||
              Array.isArray(this.body)
            ? JSON.stringify(this.body)
            : this.body.toString();
        }
        detectContentTypeHeader() {
          return null === this.body || r1(this.body)
            ? null
            : n1(this.body)
            ? this.body.type || null
            : t1(this.body)
            ? null
            : "string" == typeof this.body
            ? "text/plain"
            : this.body instanceof Xr
            ? "application/x-www-form-urlencoded;charset=UTF-8"
            : "object" == typeof this.body ||
              "number" == typeof this.body ||
              "boolean" == typeof this.body
            ? "application/json"
            : null;
        }
        clone(e = {}) {
          const t = e.method || this.method,
            r = e.url || this.url,
            o = e.responseType || this.responseType,
            i = void 0 !== e.body ? e.body : this.body,
            s =
              void 0 !== e.withCredentials
                ? e.withCredentials
                : this.withCredentials,
            a =
              void 0 !== e.reportProgress
                ? e.reportProgress
                : this.reportProgress;
          let c = e.headers || this.headers,
            l = e.params || this.params;
          const u = e.context ?? this.context;
          return (
            void 0 !== e.setHeaders &&
              (c = Object.keys(e.setHeaders).reduce(
                (d, f) => d.set(f, e.setHeaders[f]),
                c
              )),
            e.setParams &&
              (l = Object.keys(e.setParams).reduce(
                (d, f) => d.set(f, e.setParams[f]),
                l
              )),
            new Ra(t, r, i, {
              params: l,
              headers: c,
              context: u,
              reportProgress: a,
              responseType: o,
              withCredentials: s,
            })
          );
        }
      }
      var _t = (() => (
        ((_t = _t || {})[(_t.Sent = 0)] = "Sent"),
        (_t[(_t.UploadProgress = 1)] = "UploadProgress"),
        (_t[(_t.ResponseHeader = 2)] = "ResponseHeader"),
        (_t[(_t.DownloadProgress = 3)] = "DownloadProgress"),
        (_t[(_t.Response = 4)] = "Response"),
        (_t[(_t.User = 5)] = "User"),
        _t
      ))();
      class Vp {
        constructor(e, t = 200, r = "OK") {
          (this.headers = e.headers || new Jr()),
            (this.status = void 0 !== e.status ? e.status : t),
            (this.statusText = e.statusText || r),
            (this.url = e.url || null),
            (this.ok = this.status >= 200 && this.status < 300);
        }
      }
      class Bp extends Vp {
        constructor(e = {}) {
          super(e), (this.type = _t.ResponseHeader);
        }
        clone(e = {}) {
          return new Bp({
            headers: e.headers || this.headers,
            status: void 0 !== e.status ? e.status : this.status,
            statusText: e.statusText || this.statusText,
            url: e.url || this.url || void 0,
          });
        }
      }
      class cu extends Vp {
        constructor(e = {}) {
          super(e),
            (this.type = _t.Response),
            (this.body = void 0 !== e.body ? e.body : null);
        }
        clone(e = {}) {
          return new cu({
            body: void 0 !== e.body ? e.body : this.body,
            headers: e.headers || this.headers,
            status: void 0 !== e.status ? e.status : this.status,
            statusText: e.statusText || this.statusText,
            url: e.url || this.url || void 0,
          });
        }
      }
      class o1 extends Vp {
        constructor(e) {
          super(e, 0, "Unknown Error"),
            (this.name = "HttpErrorResponse"),
            (this.ok = !1),
            (this.message =
              this.status >= 200 && this.status < 300
                ? `Http failure during parsing for ${e.url || "(unknown url)"}`
                : `Http failure response for ${e.url || "(unknown url)"}: ${
                    e.status
                  } ${e.statusText}`),
            (this.error = e.error || null);
        }
      }
      function jp(n, e) {
        return {
          body: e,
          headers: n.headers,
          context: n.context,
          observe: n.observe,
          params: n.params,
          reportProgress: n.reportProgress,
          responseType: n.responseType,
          withCredentials: n.withCredentials,
        };
      }
      let lu = (() => {
        class n {
          constructor(t) {
            this.handler = t;
          }
          request(t, r, o = {}) {
            let i;
            if (t instanceof Ra) i = t;
            else {
              let c, l;
              (c = o.headers instanceof Jr ? o.headers : new Jr(o.headers)),
                o.params &&
                  (l =
                    o.params instanceof Xr
                      ? o.params
                      : new Xr({ fromObject: o.params })),
                (i = new Ra(t, r, void 0 !== o.body ? o.body : null, {
                  headers: c,
                  context: o.context,
                  params: l,
                  reportProgress: o.reportProgress,
                  responseType: o.responseType || "json",
                  withCredentials: o.withCredentials,
                }));
            }
            const s = V(i).pipe(vo((c) => this.handler.handle(c)));
            if (t instanceof Ra || "events" === o.observe) return s;
            const a = s.pipe(Dr((c) => c instanceof cu));
            switch (o.observe || "body") {
              case "body":
                switch (i.responseType) {
                  case "arraybuffer":
                    return a.pipe(
                      U((c) => {
                        if (null !== c.body && !(c.body instanceof ArrayBuffer))
                          throw new Error("Response is not an ArrayBuffer.");
                        return c.body;
                      })
                    );
                  case "blob":
                    return a.pipe(
                      U((c) => {
                        if (null !== c.body && !(c.body instanceof Blob))
                          throw new Error("Response is not a Blob.");
                        return c.body;
                      })
                    );
                  case "text":
                    return a.pipe(
                      U((c) => {
                        if (null !== c.body && "string" != typeof c.body)
                          throw new Error("Response is not a string.");
                        return c.body;
                      })
                    );
                  default:
                    return a.pipe(U((c) => c.body));
                }
              case "response":
                return a;
              default:
                throw new Error(
                  `Unreachable: unhandled observe type ${o.observe}}`
                );
            }
          }
          delete(t, r = {}) {
            return this.request("DELETE", t, r);
          }
          get(t, r = {}) {
            return this.request("GET", t, r);
          }
          head(t, r = {}) {
            return this.request("HEAD", t, r);
          }
          jsonp(t, r) {
            return this.request("JSONP", t, {
              params: new Xr().append(r, "JSONP_CALLBACK"),
              observe: "body",
              responseType: "json",
            });
          }
          options(t, r = {}) {
            return this.request("OPTIONS", t, r);
          }
          patch(t, r, o = {}) {
            return this.request("PATCH", t, jp(o, r));
          }
          post(t, r, o = {}) {
            return this.request("POST", t, jp(o, r));
          }
          put(t, r, o = {}) {
            return this.request("PUT", t, jp(o, r));
          }
        }
        return (
          (n.ɵfac = function (t) {
            return new (t || n)(P(JM));
          }),
          (n.ɵprov = R({ token: n, factory: n.ɵfac })),
          n
        );
      })();
      class s1 {
        constructor(e, t) {
          (this.next = e), (this.interceptor = t);
        }
        handle(e) {
          return this.interceptor.intercept(e, this.next);
        }
      }
      const a1 = new F("HTTP_INTERCEPTORS");
      let c4 = (() => {
        class n {
          intercept(t, r) {
            return r.handle(t);
          }
        }
        return (
          (n.ɵfac = function (t) {
            return new (t || n)();
          }),
          (n.ɵprov = R({ token: n, factory: n.ɵfac })),
          n
        );
      })();
      const l4 = /^\)\]\}',?\n/;
      let c1 = (() => {
        class n {
          constructor(t) {
            this.xhrFactory = t;
          }
          handle(t) {
            if ("JSONP" === t.method)
              throw new Error(
                "Attempted to construct Jsonp request without HttpClientJsonpModule installed."
              );
            return new Re((r) => {
              const o = this.xhrFactory.build();
              if (
                (o.open(t.method, t.urlWithParams),
                t.withCredentials && (o.withCredentials = !0),
                t.headers.forEach((h, p) => o.setRequestHeader(h, p.join(","))),
                t.headers.has("Accept") ||
                  o.setRequestHeader(
                    "Accept",
                    "application/json, text/plain, */*"
                  ),
                !t.headers.has("Content-Type"))
              ) {
                const h = t.detectContentTypeHeader();
                null !== h && o.setRequestHeader("Content-Type", h);
              }
              if (t.responseType) {
                const h = t.responseType.toLowerCase();
                o.responseType = "json" !== h ? h : "text";
              }
              const i = t.serializeBody();
              let s = null;
              const a = () => {
                  if (null !== s) return s;
                  const h = o.statusText || "OK",
                    p = new Jr(o.getAllResponseHeaders()),
                    m =
                      (function u4(n) {
                        return "responseURL" in n && n.responseURL
                          ? n.responseURL
                          : /^X-Request-URL:/m.test(n.getAllResponseHeaders())
                          ? n.getResponseHeader("X-Request-URL")
                          : null;
                      })(o) || t.url;
                  return (
                    (s = new Bp({
                      headers: p,
                      status: o.status,
                      statusText: h,
                      url: m,
                    })),
                    s
                  );
                },
                c = () => {
                  let { headers: h, status: p, statusText: m, url: y } = a(),
                    C = null;
                  204 !== p &&
                    (C = typeof o.response > "u" ? o.responseText : o.response),
                    0 === p && (p = C ? 200 : 0);
                  let O = p >= 200 && p < 300;
                  if ("json" === t.responseType && "string" == typeof C) {
                    const b = C;
                    C = C.replace(l4, "");
                    try {
                      C = "" !== C ? JSON.parse(C) : null;
                    } catch (x) {
                      (C = b), O && ((O = !1), (C = { error: x, text: C }));
                    }
                  }
                  O
                    ? (r.next(
                        new cu({
                          body: C,
                          headers: h,
                          status: p,
                          statusText: m,
                          url: y || void 0,
                        })
                      ),
                      r.complete())
                    : r.error(
                        new o1({
                          error: C,
                          headers: h,
                          status: p,
                          statusText: m,
                          url: y || void 0,
                        })
                      );
                },
                l = (h) => {
                  const { url: p } = a(),
                    m = new o1({
                      error: h,
                      status: o.status || 0,
                      statusText: o.statusText || "Unknown Error",
                      url: p || void 0,
                    });
                  r.error(m);
                };
              let u = !1;
              const d = (h) => {
                  u || (r.next(a()), (u = !0));
                  let p = { type: _t.DownloadProgress, loaded: h.loaded };
                  h.lengthComputable && (p.total = h.total),
                    "text" === t.responseType &&
                      !!o.responseText &&
                      (p.partialText = o.responseText),
                    r.next(p);
                },
                f = (h) => {
                  let p = { type: _t.UploadProgress, loaded: h.loaded };
                  h.lengthComputable && (p.total = h.total), r.next(p);
                };
              return (
                o.addEventListener("load", c),
                o.addEventListener("error", l),
                o.addEventListener("timeout", l),
                o.addEventListener("abort", l),
                t.reportProgress &&
                  (o.addEventListener("progress", d),
                  null !== i &&
                    o.upload &&
                    o.upload.addEventListener("progress", f)),
                o.send(i),
                r.next({ type: _t.Sent }),
                () => {
                  o.removeEventListener("error", l),
                    o.removeEventListener("abort", l),
                    o.removeEventListener("load", c),
                    o.removeEventListener("timeout", l),
                    t.reportProgress &&
                      (o.removeEventListener("progress", d),
                      null !== i &&
                        o.upload &&
                        o.upload.removeEventListener("progress", f)),
                    o.readyState !== o.DONE && o.abort();
                }
              );
            });
          }
        }
        return (
          (n.ɵfac = function (t) {
            return new (t || n)(P(tb));
          }),
          (n.ɵprov = R({ token: n, factory: n.ɵfac })),
          n
        );
      })();
      const Up = new F("XSRF_COOKIE_NAME"),
        $p = new F("XSRF_HEADER_NAME");
      class l1 {}
      let d4 = (() => {
          class n {
            constructor(t, r, o) {
              (this.doc = t),
                (this.platform = r),
                (this.cookieName = o),
                (this.lastCookieString = ""),
                (this.lastToken = null),
                (this.parseCount = 0);
            }
            getToken() {
              if ("server" === this.platform) return null;
              const t = this.doc.cookie || "";
              return (
                t !== this.lastCookieString &&
                  (this.parseCount++,
                  (this.lastToken = zC(t, this.cookieName)),
                  (this.lastCookieString = t)),
                this.lastToken
              );
            }
          }
          return (
            (n.ɵfac = function (t) {
              return new (t || n)(P(st), P(el), P(Up));
            }),
            (n.ɵprov = R({ token: n, factory: n.ɵfac })),
            n
          );
        })(),
        Hp = (() => {
          class n {
            constructor(t, r) {
              (this.tokenService = t), (this.headerName = r);
            }
            intercept(t, r) {
              const o = t.url.toLowerCase();
              if (
                "GET" === t.method ||
                "HEAD" === t.method ||
                o.startsWith("http://") ||
                o.startsWith("https://")
              )
                return r.handle(t);
              const i = this.tokenService.getToken();
              return (
                null !== i &&
                  !t.headers.has(this.headerName) &&
                  (t = t.clone({ headers: t.headers.set(this.headerName, i) })),
                r.handle(t)
              );
            }
          }
          return (
            (n.ɵfac = function (t) {
              return new (t || n)(P(l1), P($p));
            }),
            (n.ɵprov = R({ token: n, factory: n.ɵfac })),
            n
          );
        })(),
        f4 = (() => {
          class n {
            constructor(t, r) {
              (this.backend = t), (this.injector = r), (this.chain = null);
            }
            handle(t) {
              if (null === this.chain) {
                const r = this.injector.get(a1, []);
                this.chain = r.reduceRight(
                  (o, i) => new s1(o, i),
                  this.backend
                );
              }
              return this.chain.handle(t);
            }
          }
          return (
            (n.ɵfac = function (t) {
              return new (t || n)(P(XM), P(vn));
            }),
            (n.ɵprov = R({ token: n, factory: n.ɵfac })),
            n
          );
        })(),
        h4 = (() => {
          class n {
            static disable() {
              return {
                ngModule: n,
                providers: [{ provide: Hp, useClass: c4 }],
              };
            }
            static withOptions(t = {}) {
              return {
                ngModule: n,
                providers: [
                  t.cookieName ? { provide: Up, useValue: t.cookieName } : [],
                  t.headerName ? { provide: $p, useValue: t.headerName } : [],
                ],
              };
            }
          }
          return (
            (n.ɵfac = function (t) {
              return new (t || n)();
            }),
            (n.ɵmod = yt({ type: n })),
            (n.ɵinj = ft({
              providers: [
                Hp,
                { provide: a1, useExisting: Hp, multi: !0 },
                { provide: l1, useClass: d4 },
                { provide: Up, useValue: "XSRF-TOKEN" },
                { provide: $p, useValue: "X-XSRF-TOKEN" },
              ],
            })),
            n
          );
        })(),
        p4 = (() => {
          class n {}
          return (
            (n.ɵfac = function (t) {
              return new (t || n)();
            }),
            (n.ɵmod = yt({ type: n })),
            (n.ɵinj = ft({
              providers: [
                lu,
                { provide: JM, useClass: f4 },
                c1,
                { provide: XM, useExisting: c1 },
              ],
              imports: [
                h4.withOptions({
                  cookieName: "XSRF-TOKEN",
                  headerName: "X-XSRF-TOKEN",
                }),
              ],
            })),
            n
          );
        })();
      const zp = "accessToken",
        Gp = "auth-user";
      let uu = (() => {
          class n {
            constructor() {}
            logOut() {
              window.sessionStorage.clear();
            }
            saveToken(t) {
              window.sessionStorage.removeItem(zp),
                window.sessionStorage.setItem(zp, t);
            }
            getToken() {
              return sessionStorage.getItem(zp);
            }
            saveUser(t) {
              window.sessionStorage.removeItem(Gp),
                window.sessionStorage.setItem(Gp, JSON.stringify(t));
            }
            getUser() {
              return JSON.parse(sessionStorage.getItem(Gp));
            }
          }
          return (
            (n.ɵfac = function (t) {
              return new (t || n)();
            }),
            (n.ɵprov = R({ token: n, factory: n.ɵfac, providedIn: "root" })),
            n
          );
        })(),
        eo = (() => {
          class n {
            constructor(t, r, o) {
              (this.http = t),
                (this.router = r),
                (this.tokenService = o),
                (this.user$ = new $e(this.tokenService.getUser())),
                (this.isLogged$ = new $e(!!this.tokenService.getToken())),
                (this.balance = new $e(this.tokenService.getUser()?.balance)),
                (this.dbUrl =
                  "https://angular-crypto-project-default-rtdb.europe-west1.firebasedatabase.app/users.json");
            }
            signUp(t, r, o) {
              return this.http
                .post(
                  "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDrzkYbPCbto8GtDEeszg3Kb0PIndLx5U8",
                  { email: t, password: r, returnSecureToken: !0 }
                )
                .pipe(
                  He((i) => {
                    this.saveUserOnDb({ ...o, localId: i.localId }).subscribe(
                      (s) => {
                        this.router.navigateByUrl("/signin");
                      }
                    );
                  })
                );
            }
            login(t, r) {
              return this.http
                .post(
                  "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDrzkYbPCbto8GtDEeszg3Kb0PIndLx5U8",
                  { email: t, password: r, returnSecureToken: !0 }
                )
                .pipe(
                  He((o) => {
                    this.getSpecificUser(o.localId).subscribe({
                      next: (i) => {
                        this.tokenService.saveUser(i),
                          this.user$.next(this.tokenService.getUser()),
                          this.tokenService.saveToken(o.idToken),
                          this.isLogged$.next(!!this.tokenService.getToken()),
                          window.location.reload();
                      },
                    });
                  })
                );
            }
            saveUserOnDb(t) {
              return this.http.post(this.dbUrl, t);
            }
            getUsers() {
              return this.http.get(this.dbUrl);
            }
            getUsers2(t) {
              return this.http.get(this.dbUrl).pipe(
                U((r) => Object.keys(r).map((o) => ({ id: o, ...r[o] }))),
                U((r) => {
                  for (let o of r) if (o.localId === t) return o.id;
                })
              );
            }
            getSpecificUser(t) {
              return this.http
                .get(this.dbUrl, {
                  params: new Xr()
                    .set("orderBy", '"localId"')
                    .set("equalTo", `"${t}"`),
                })
                .pipe(
                  U((r) => {
                    let o = {};
                    for (let i in r) o = r[i];
                    return o;
                  })
                );
            }
            updateBalance(t) {
              return this.getUsers2(this.user$.getValue().localId).pipe(
                He((r) =>
                  this.http
                    .put(
                      `https://angular-crypto-project-default-rtdb.europe-west1.firebasedatabase.app/users/${r}/balance.json`,
                      { ...t }
                    )
                    .subscribe()
                )
              );
            }
          }
          return (
            (n.ɵfac = function (t) {
              return new (t || n)(P(lu), P(Ye), P(uu));
            }),
            (n.ɵprov = R({ token: n, factory: n.ɵfac, providedIn: "root" })),
            n
          );
        })();
      function g4(n, e) {
        if (
          (1 & n && (_(0, "div", 4)(1, "div", 5), re(2, "img", 6), g()()),
          2 & n)
        ) {
          const t = ie().$implicit;
          L("@sliderFade", void 0), E(2), Qs("src", "", t, " ", sn);
        }
      }
      function m4(n, e) {
        if ((1 & n && (ve(0), ne(1, g4, 3, 2, "div", 3), Ce()), 2 & n)) {
          const t = e.index,
            r = ie();
          E(1), L("ngIf", t == r.currentSlideIndex);
        }
      }
      function _4(n, e) {
        1 & n &&
          (ve(0), _(1, "button", 7), v(2, "Start the Journey"), g(), Ce());
      }
      let y4 = (() => {
        class n {
          constructor(t) {
            (this.database = t),
              (this.currentSlideIndex = 0),
              (this.isLogged$ = new $e(!1)),
              (this.items = [
                "./assets/slider-pic-5.png",
                "./assets/slider-pic-2.png",
                "./assets/slider-pic-1.png",
                "./assets/axali-1.png",
              ]);
          }
          ngOnInit() {
            setInterval(() => {
              this.currentSlideIndex =
                ++this.currentSlideIndex % this.items.length;
            }, 4e3),
              (this.isLogged$ = this.database.isLogged$);
          }
        }
        return (
          (n.ɵfac = function (t) {
            return new (t || n)(w(eo));
          }),
          (n.ɵcmp = qt({
            type: n,
            selectors: [["app-slider"]],
            decls: 6,
            vars: 4,
            consts: [
              [1, "slider"],
              [4, "ngFor", "ngForOf"],
              [4, "ngIf"],
              ["class", "slide", 4, "ngIf"],
              [1, "slide"],
              [1, "slide-bg"],
              [1, "slide-bg-image", 3, "src"],
              ["routerLink", "/register"],
            ],
            template: function (t, r) {
              1 & t &&
                (_(0, "div", 0),
                ne(1, m4, 2, 1, "ng-container", 1),
                _(2, "h1"),
                v(3, "Grow more \xa0 invest now"),
                g(),
                ne(4, _4, 3, 0, "ng-container", 2),
                Xe(5, "async"),
                g()),
                2 & t &&
                  (E(1),
                  L("ngForOf", r.items),
                  E(3),
                  L("ngIf", !tr(5, 2, r.isLogged$)));
            },
            dependencies: [ho, Cr, Xo, Ho],
            styles: [
              '.slider[_ngcontent-%COMP%]{display:flex;flex-direction:column;justify-content:space-between;height:calc(100vh - 15px);position:relative}.slider[_ngcontent-%COMP%]   .slide[_ngcontent-%COMP%]{display:flex;position:absolute;width:100%;height:100%}.slider[_ngcontent-%COMP%]   .slide-bg[_ngcontent-%COMP%]{position:relative;display:flex;flex:1 1 auto}.slider[_ngcontent-%COMP%]   .slide-bg[_ngcontent-%COMP%]:after{content:"";position:absolute;inset:0;display:block;background-color:#0009}.slider[_ngcontent-%COMP%]   .slide-bg-image[_ngcontent-%COMP%]{height:100%;width:100%}h1[_ngcontent-%COMP%]{width:100%;line-height:125%;font-size:50px;position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);letter-spacing:4px;font-weight:700;text-transform:uppercase;text-align:center}button[_ngcontent-%COMP%]{position:absolute;top:70%;left:50%;transform:translate(-50%);text-align:center;color:#fff;border:1px solid #f4f4f4;border-radius:4px;background-color:inherit;font-weight:600;font-size:20px;line-height:100%;height:60px;min-width:247px;cursor:pointer;transition:ease 1s}button[_ngcontent-%COMP%]:hover{background-color:#000c}@media screen and (min-width: 350px) and (max-width: 767px){.slider[_ngcontent-%COMP%]{display:none}}',
            ],
            data: {
              animation: [
                GM("sliderFade", [
                  KM("void", su({ opacity: 0 })),
                  QM("void <=>*", [WM("1s")]),
                ]),
              ],
            },
          })),
          n
        );
      })();
      var u1 = pe(123);
      let v4 = (() => {
        class n {
          constructor(t) {
            (this.http = t),
              (this.date = new Date()),
              (this.year = this.date.getFullYear),
              (this.month = this.date.getMonth),
              (this.day = this.date.getDay),
              (this.newDate = `${this.year}-${this.month}-${this.day}`);
          }
          getNews() {
            return this.http.get(
              ` https://newsapi.org/v2/everything?q=(crypto AND bitcoin)&from=${this.newDate}&sortBy=publishedAt&apiKey=`
            );
          }
        }
        return (
          (n.ɵfac = function (t) {
            return new (t || n)(P(lu));
          }),
          (n.ɵprov = R({ token: n, factory: n.ɵfac, providedIn: "root" })),
          n
        );
      })();
      function C4(n, e) {
        if ((1 & n && (ve(0), _(1, "h1", 2), v(2), g(), Ce()), 2 & n)) {
          const t = ie();
          E(2), Je(t.newsError);
        }
      }
      const b4 = function (n, e, t) {
        return { right: n, middle: e, left: t };
      };
      function w4(n, e) {
        if (
          (1 & n &&
            (ve(0),
            _(1, "div", 7)(2, "a", 8),
            re(3, "img", 9),
            g(),
            _(4, "div", 10)(5, "p", 11),
            v(6),
            Xe(7, "slice"),
            g(),
            _(8, "h2", 12)(9, "a", 8),
            v(10),
            g()(),
            _(11, "p", 13)(12, "span"),
            re(13, "i", 14),
            g(),
            v(14),
            Xe(15, "date"),
            g()()(),
            Ce()),
          2 & n)
        ) {
          const t = ie(),
            r = t.index,
            o = t.$implicit;
          E(1),
            L(
              "ngClass",
              (function C0(n, e, t, r, o, i) {
                return M0(D(), Zt(), n, e, t, r, o, i);
              })(14, b4, (r + 1) % 3 == 1, (r + 1) % 3 == 2, (r + 1) % 3 == 0)
            ),
            E(1),
            Hi("href", o.url, sn),
            E(1),
            L(
              "src",
              o.urlToImage || "./assets/slider-pic-1.png",
              sn
            )("alt", o.description),
            E(3),
            Je(
              (function O0(n, e, t, r, o) {
                const i = n + 22,
                  s = D(),
                  a = hi(s, i);
                return na(s, i)
                  ? M0(s, Zt(), e, a.transform, t, r, o, a)
                  : a.transform(t, r, o);
              })(7, 8, o.author, 0, 60)
            ),
            E(3),
            Hi("href", o.url, sn),
            E(1),
            Je(o.title),
            E(4),
            Xt(" ", tr(15, 12, o.publishedAt), " ");
        }
      }
      function M4(n, e) {
        if (
          (1 & n && (ve(0), ne(1, w4, 16, 18, "ng-container", 1), Ce()), 2 & n)
        ) {
          const t = e.index;
          E(1), L("ngIf", t <= 5);
        }
      }
      function D4(n, e) {
        if (
          (1 & n &&
            (ve(0),
            _(1, "div", 15)(2, "a", 8),
            re(3, "img", 9),
            g(),
            _(4, "div", 10)(5, "p", 16)(6, "span"),
            v(7),
            g(),
            v(8),
            Xe(9, "date"),
            g(),
            _(10, "p", 13)(11, "span"),
            re(12, "i", 14),
            g(),
            v(13),
            Xe(14, "date"),
            g(),
            _(15, "h3", 12)(16, "a", 8),
            v(17),
            g()(),
            _(18, "p", 17),
            v(19),
            g()()(),
            Ce()),
          2 & n)
        ) {
          const t = ie().$implicit;
          E(2),
            Hi("href", t.url, sn),
            E(1),
            L(
              "src",
              t.urlToImage || "./assets/slider-pic-1.png",
              sn
            )("alt", t.description),
            E(4),
            Je(t.source.name),
            E(1),
            Xt(" - ", tr(9, 9, t.publishedAt), " "),
            E(5),
            Xt(" ", tr(14, 11, t.publishedAt), " "),
            E(3),
            Hi("href", t.url, sn),
            E(1),
            Je(t.title),
            E(2),
            Je(t.description);
        }
      }
      function E4(n, e) {
        if (
          (1 & n && (ve(0), ne(1, D4, 20, 13, "ng-container", 1), Ce()), 2 & n)
        ) {
          const t = e.index,
            r = ie(2);
          E(1), L("ngIf", t > 5 && t < 5 + r.maxPost);
        }
      }
      function O4(n, e) {
        1 & n &&
          (ve(0), _(1, "h3", 18), v(2, "thats all for today"), g(), Ce());
      }
      function P4(n, e) {
        if (1 & n) {
          const t = bn();
          ve(0),
            _(1, "div", 19)(2, "div", 20),
            me("click", function () {
              return Ot(t), Pt(ie(2).showMore());
            }),
            v(3, " see more stories "),
            g()(),
            Ce();
        }
      }
      function x4(n, e) {
        if (
          (1 & n &&
            (ve(0),
            _(1, "div", 3)(2, "h1"),
            v(3, "WHAT'S TRENDING"),
            g(),
            _(4, "div", 4),
            ne(5, M4, 2, 1, "ng-container", 5),
            g()(),
            _(6, "div", 3)(7, "h1", 6),
            v(8, "ALL STORIES"),
            g(),
            ne(9, E4, 2, 1, "ng-container", 5),
            g(),
            ne(10, O4, 3, 0, "ng-container", 1),
            ne(11, P4, 4, 0, "ng-container", 1),
            Ce()),
          2 & n)
        ) {
          const t = ie();
          E(5),
            L("ngForOf", t.articles),
            E(4),
            L("ngForOf", t.articles),
            E(1),
            L("ngIf", t.maxPost >= 100),
            E(1),
            L("ngIf", t.maxPost < 100);
        }
      }
      let d1 = (() => {
          class n {
            constructor(t) {
              (this.newsService = t),
                (this.articles = []),
                (this.newsError = ""),
                (this.maxPost = 5);
            }
            showMore() {
              this.maxPost = this.maxPost + 7;
            }
            ngOnInit() {
              u1.init(),
                this.newsService.getNews().subscribe({
                  next: (t) => {
                    (this.articles = t.articles), (this.newsError = "");
                  },
                  error: (t) => {
                    this.newsError =
                      "corsNotAllowed" === t.error.code
                        ? t.error.message
                        : "Oops... something went wrong";
                  },
                });
            }
            ngOnDestroy() {
              window.scroll(0, 0);
            }
          }
          return (
            (n.ɵfac = function (t) {
              return new (t || n)(w(v4));
            }),
            (n.ɵcmp = qt({
              type: n,
              selectors: [["app-news"]],
              decls: 3,
              vars: 2,
              consts: [
                [1, "wrapper"],
                [4, "ngIf"],
                [1, "newsError"],
                [1, "container"],
                [1, "news"],
                [4, "ngFor", "ngForOf"],
                [1, "all-stories"],
                [
                  "data-aos",
                  "fade-up",
                  "data-aos-anchor-placement",
                  "top-bottom",
                  1,
                  "example-card",
                  3,
                  "ngClass",
                ],
                ["target", "_blank", 3, "href"],
                [3, "src", "alt"],
                [1, "content-text"],
                [1, "author"],
                [1, "title"],
                [1, "date"],
                [1, "far", "fa-calendar"],
                [
                  "data-aos",
                  "fade-right",
                  "data-aos-duration",
                  "900",
                  1,
                  "big-card",
                ],
                [1, "source"],
                [1, "desc"],
                [1, "end-of-news"],
                [1, "wrapper-btn"],
                ["role", "button", 1, "container-button", 3, "click"],
              ],
              template: function (t, r) {
                1 & t &&
                  (_(0, "div", 0),
                  ne(1, C4, 3, 1, "ng-container", 1),
                  ne(2, x4, 12, 4, "ng-container", 1),
                  g()),
                  2 & t &&
                    (E(1),
                    L("ngIf", r.newsError),
                    E(1),
                    L("ngIf", null == r.articles ? null : r.articles.length));
              },
              dependencies: [la, ho, Cr, JC, ZC],
              styles: [
                '.wrapper[_ngcontent-%COMP%]{padding-top:97px;width:100%;display:flex;flex-direction:column;align-items:center;background-color:#f1f2f2;color:#2b2b2b}.wrapper[_ngcontent-%COMP%]   .newsError[_ngcontent-%COMP%]{margin-bottom:85px;font-size:24px}.wrapper[_ngcontent-%COMP%]   .wrapper-btn[_ngcontent-%COMP%]{align-items:center;display:flex;justify-content:center;margin-top:80px;width:1080px}.wrapper[_ngcontent-%COMP%]   .wrapper-btn[_ngcontent-%COMP%]   .container-button[_ngcontent-%COMP%]{width:255px;color:#0058aa;font-size:16px;padding-top:2px;text-transform:uppercase;align-items:center;background-color:"transparent";border:1px solid #0058aa;border-radius:4px;display:flex;height:55px;justify-content:center;margin-bottom:50px;cursor:pointer}.wrapper[_ngcontent-%COMP%]   .wrapper-btn[_ngcontent-%COMP%]   .container-button[_ngcontent-%COMP%]:hover{color:#fff;background-color:#0058aa}.wrapper[_ngcontent-%COMP%]   .end-of-news[_ngcontent-%COMP%]{margin-top:80px;margin-bottom:40px;color:#0058aa;font-size:24px;text-transform:uppercase}.wrapper[_ngcontent-%COMP%]   .container[_ngcontent-%COMP%]{width:1080px}.wrapper[_ngcontent-%COMP%]   .container[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%]{text-transform:uppercase;color:#0058aa;align-self:flex-start;font-size:24px;font-weight:700;line-height:26.4px;margin-bottom:30px;letter-spacing:1.25px;cursor:pointer}.wrapper[_ngcontent-%COMP%]   .container[_ngcontent-%COMP%]   .all-stories[_ngcontent-%COMP%]{margin-top:85px}.wrapper[_ngcontent-%COMP%]   .container[_ngcontent-%COMP%]   .news[_ngcontent-%COMP%]{width:100%;display:grid;grid-template-columns:352.33px 376.33px 351.33px;border-top:1px solid #cacaca}.wrapper[_ngcontent-%COMP%]   .container[_ngcontent-%COMP%]   .news[_ngcontent-%COMP%]   .example-card[_ngcontent-%COMP%]{position:relative;margin-top:32px;padding-bottom:32px;height:417px;border-bottom:1px solid #cacaca}.wrapper[_ngcontent-%COMP%]   .container[_ngcontent-%COMP%]   .news[_ngcontent-%COMP%]   .example-card[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{width:327px;height:199px;margin-bottom:10px;cursor:pointer}.wrapper[_ngcontent-%COMP%]   .container[_ngcontent-%COMP%]   .news[_ngcontent-%COMP%]   .example-card[_ngcontent-%COMP%]   .content-text[_ngcontent-%COMP%]{width:327px}.wrapper[_ngcontent-%COMP%]   .container[_ngcontent-%COMP%]   .news[_ngcontent-%COMP%]   .example-card[_ngcontent-%COMP%]   .content-text[_ngcontent-%COMP%]   .author[_ngcontent-%COMP%]{color:#0058aa;font-size:11px;letter-spacing:.5px;line-height:22.1px;margin-bottom:25px}.wrapper[_ngcontent-%COMP%]   .container[_ngcontent-%COMP%]   .news[_ngcontent-%COMP%]   .example-card[_ngcontent-%COMP%]   .content-text[_ngcontent-%COMP%]   .title[_ngcontent-%COMP%]{max-height:70px;color:#2b2b2b;display:-webkit-box;font-size:18px;font-weight:600;line-height:24.3px;margin-bottom:16px;overflow:hidden;word-break:break-word;cursor:pointer}.wrapper[_ngcontent-%COMP%]   .container[_ngcontent-%COMP%]   .news[_ngcontent-%COMP%]   .example-card[_ngcontent-%COMP%]   .content-text[_ngcontent-%COMP%]   .title[_ngcontent-%COMP%]:hover{text-decoration:underline}.wrapper[_ngcontent-%COMP%]   .container[_ngcontent-%COMP%]   .news[_ngcontent-%COMP%]   .example-card[_ngcontent-%COMP%]   .content-text[_ngcontent-%COMP%]   .date[_ngcontent-%COMP%]{color:#2b2b2b;font-size:16px;letter-spacing:.5px;line-height:24px;left:10px;position:absolute;bottom:32px}.wrapper[_ngcontent-%COMP%]   .container[_ngcontent-%COMP%]   .big-card[_ngcontent-%COMP%]{width:100%;height:376.59px;padding:24px 0;display:flex;border-top:1px solid #cacaca}.wrapper[_ngcontent-%COMP%]   .container[_ngcontent-%COMP%]   .big-card[_ngcontent-%COMP%]:last-child{border-bottom:1px solid #cacaca}.wrapper[_ngcontent-%COMP%]   .container[_ngcontent-%COMP%]   .big-card[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{width:540px;height:327.59px}.wrapper[_ngcontent-%COMP%]   .container[_ngcontent-%COMP%]   .big-card[_ngcontent-%COMP%]   .content-text[_ngcontent-%COMP%]{width:540px;height:327.59px;padding:0 0 0 40px}.wrapper[_ngcontent-%COMP%]   .container[_ngcontent-%COMP%]   .big-card[_ngcontent-%COMP%]   .content-text[_ngcontent-%COMP%]   .source[_ngcontent-%COMP%]{font-size:12px;letter-spacing:.8px;line-height:23.2px}.wrapper[_ngcontent-%COMP%]   .container[_ngcontent-%COMP%]   .big-card[_ngcontent-%COMP%]   .content-text[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]{color:#0058aa;text-transform:uppercase}.wrapper[_ngcontent-%COMP%]   .container[_ngcontent-%COMP%]   .big-card[_ngcontent-%COMP%]   .content-text[_ngcontent-%COMP%]   .title[_ngcontent-%COMP%]{color:#2b2b2b;margin-top:18px;font-size:22px;font-weight:700;margin-bottom:16px;cursor:pointer}.wrapper[_ngcontent-%COMP%]   .container[_ngcontent-%COMP%]   .big-card[_ngcontent-%COMP%]   .content-text[_ngcontent-%COMP%]   .desc[_ngcontent-%COMP%]{color:#2b2b2b;font-size:16px;line-height:24px;margin-bottom:16px;word-break:break-word;font-weight:400}@media only screen and (min-width: 1129px){.wrapper[_ngcontent-%COMP%]   .container[_ngcontent-%COMP%]   .example-card.right[_ngcontent-%COMP%]{padding:0 24px 0 0;position:relative}.wrapper[_ngcontent-%COMP%]   .container[_ngcontent-%COMP%]   .example-card.right[_ngcontent-%COMP%]:after{content:"";width:1px;height:385px;background-color:#cacaca;position:absolute;right:0;top:0}.wrapper[_ngcontent-%COMP%]   .container[_ngcontent-%COMP%]   .example-card.left[_ngcontent-%COMP%]{padding:0 0 0 24px}.wrapper[_ngcontent-%COMP%]   .container[_ngcontent-%COMP%]   .example-card.middle[_ngcontent-%COMP%]{padding:0 24px;position:relative}.wrapper[_ngcontent-%COMP%]   .container[_ngcontent-%COMP%]   .example-card.middle[_ngcontent-%COMP%]:after{content:"";width:1px;height:385px;background-color:#cacaca;position:absolute;right:0;top:0}}@media screen and (min-width: 768px) and (max-width: 1128px){.wrapper[_ngcontent-%COMP%]   .container[_ngcontent-%COMP%]{width:90%}.wrapper[_ngcontent-%COMP%]   .container[_ngcontent-%COMP%]   .news[_ngcontent-%COMP%]{width:100%;grid-template-columns:33% 33% 33%}.wrapper[_ngcontent-%COMP%]   .container[_ngcontent-%COMP%]   .news[_ngcontent-%COMP%]   .example-card[_ngcontent-%COMP%]   img[_ngcontent-%COMP%], .wrapper[_ngcontent-%COMP%]   .container[_ngcontent-%COMP%]   .news[_ngcontent-%COMP%]   .example-card[_ngcontent-%COMP%]   .content-text[_ngcontent-%COMP%]{width:100%}.wrapper[_ngcontent-%COMP%]   .container[_ngcontent-%COMP%]   .news[_ngcontent-%COMP%]   .example-card[_ngcontent-%COMP%]   .content-text[_ngcontent-%COMP%]   .title[_ngcontent-%COMP%]{font-size:13px}.wrapper[_ngcontent-%COMP%]   .container[_ngcontent-%COMP%]   .news[_ngcontent-%COMP%]   .example-card[_ngcontent-%COMP%]   .content-text[_ngcontent-%COMP%]   .date[_ngcontent-%COMP%]{font-size:14px}.wrapper[_ngcontent-%COMP%]   .container[_ngcontent-%COMP%]   .news[_ngcontent-%COMP%]   .example-card.right[_ngcontent-%COMP%]{padding:0 12px 0 0;position:relative}.wrapper[_ngcontent-%COMP%]   .container[_ngcontent-%COMP%]   .news[_ngcontent-%COMP%]   .example-card.right[_ngcontent-%COMP%]:after{content:"";width:1px;height:385px;background-color:#cacaca;position:absolute;right:0;top:0}.wrapper[_ngcontent-%COMP%]   .container[_ngcontent-%COMP%]   .news[_ngcontent-%COMP%]   .example-card.left[_ngcontent-%COMP%]{padding:0 0 0 12px}.wrapper[_ngcontent-%COMP%]   .container[_ngcontent-%COMP%]   .news[_ngcontent-%COMP%]   .example-card.middle[_ngcontent-%COMP%]{padding:0 12px;position:relative}.wrapper[_ngcontent-%COMP%]   .container[_ngcontent-%COMP%]   .news[_ngcontent-%COMP%]   .example-card.middle[_ngcontent-%COMP%]:after{content:"";width:1px;height:385px;background-color:#cacaca;position:absolute;right:0;top:0}.wrapper[_ngcontent-%COMP%]   .container[_ngcontent-%COMP%]   .big-card[_ngcontent-%COMP%]{width:100%;height:376.59px;padding:12px 0}.wrapper[_ngcontent-%COMP%]   .container[_ngcontent-%COMP%]   .big-card[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{width:100%;height:327.59px}.wrapper[_ngcontent-%COMP%]   .wrapper-btn[_ngcontent-%COMP%]{width:90%}}@media screen and (min-width: 350px) and (max-width: 767px){.wrapper[_ngcontent-%COMP%]   .container[_ngcontent-%COMP%]{width:90%}.wrapper[_ngcontent-%COMP%]   .container[_ngcontent-%COMP%]   .news[_ngcontent-%COMP%]{width:100%;grid-template-columns:100%}.wrapper[_ngcontent-%COMP%]   .container[_ngcontent-%COMP%]   .news[_ngcontent-%COMP%]   .example-card[_ngcontent-%COMP%]   img[_ngcontent-%COMP%], .wrapper[_ngcontent-%COMP%]   .container[_ngcontent-%COMP%]   .news[_ngcontent-%COMP%]   .example-card[_ngcontent-%COMP%]   .content-text[_ngcontent-%COMP%]{width:100%}.wrapper[_ngcontent-%COMP%]   .container[_ngcontent-%COMP%]   .news[_ngcontent-%COMP%]   .example-card[_ngcontent-%COMP%]   .content-text[_ngcontent-%COMP%]   .title[_ngcontent-%COMP%]{font-size:13px}.wrapper[_ngcontent-%COMP%]   .container[_ngcontent-%COMP%]   .news[_ngcontent-%COMP%]   .example-card[_ngcontent-%COMP%]   .content-text[_ngcontent-%COMP%]   .date[_ngcontent-%COMP%]{font-size:14px}.wrapper[_ngcontent-%COMP%]   .container[_ngcontent-%COMP%]   .news[_ngcontent-%COMP%]   .example-card.right[_ngcontent-%COMP%], .wrapper[_ngcontent-%COMP%]   .container[_ngcontent-%COMP%]   .news[_ngcontent-%COMP%]   .example-card.left[_ngcontent-%COMP%], .wrapper[_ngcontent-%COMP%]   .container[_ngcontent-%COMP%]   .news[_ngcontent-%COMP%]   .example-card.middle[_ngcontent-%COMP%]{padding:0}.wrapper[_ngcontent-%COMP%]   .container[_ngcontent-%COMP%]   .big-card[_ngcontent-%COMP%]{width:100%;height:620px;padding:12px 0;flex-direction:column;justify-content:center}.wrapper[_ngcontent-%COMP%]   .container[_ngcontent-%COMP%]   .big-card[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{width:100%;height:287.59px;margin-bottom:3px}.wrapper[_ngcontent-%COMP%]   .container[_ngcontent-%COMP%]   .big-card[_ngcontent-%COMP%]   .content-text[_ngcontent-%COMP%]{width:100%;height:257.59px;padding:0}.wrapper[_ngcontent-%COMP%]   .container[_ngcontent-%COMP%]   .big-card[_ngcontent-%COMP%]   .content-text[_ngcontent-%COMP%]   .source[_ngcontent-%COMP%]{font-size:11px;line-height:18.2px}.wrapper[_ngcontent-%COMP%]   .container[_ngcontent-%COMP%]   .big-card[_ngcontent-%COMP%]   .content-text[_ngcontent-%COMP%]   .date[_ngcontent-%COMP%]{font-size:13px}.wrapper[_ngcontent-%COMP%]   .container[_ngcontent-%COMP%]   .big-card[_ngcontent-%COMP%]   .content-text[_ngcontent-%COMP%]   .title[_ngcontent-%COMP%]{margin-top:16px;font-size:19px;margin-bottom:14px}.wrapper[_ngcontent-%COMP%]   .container[_ngcontent-%COMP%]   .big-card[_ngcontent-%COMP%]   .content-text[_ngcontent-%COMP%]   .desc[_ngcontent-%COMP%]{font-size:14px;line-height:19px;margin-bottom:14px}.wrapper[_ngcontent-%COMP%]   .wrapper-btn[_ngcontent-%COMP%]{width:90%}}',
              ],
            })),
            n
          );
        })(),
        Wp = (() => {
          class n {
            constructor(t) {
              this.http = t;
            }
            getCurrency() {
              return this.http.get(
                "https://api.coingecko.com/api/v3/coins/markets?vs_currency=USD&order=market_cap_desc&sparkline=false"
              );
            }
            getTrendingCurrency() {
              return this.http.get(
                "https://api.coingecko.com/api/v3/coins/markets?vs_currency=USD&order=gecko_desc&per_page=10&page=1&sparkline=false&price_change_percentage=24h"
              );
            }
            getGrpahicalCurrencyData(t) {
              return this.http.get(
                `https://api.coingecko.com/api/v3/coins/${t}/market_chart?vs_currency=USD&days=1`
              );
            }
            getCurrencyById(t) {
              return this.http.get(
                `https://api.coingecko.com/api/v3/coins/${t}`
              );
            }
          }
          return (
            (n.ɵfac = function (t) {
              return new (t || n)(P(lu));
            }),
            (n.ɵprov = R({ token: n, factory: n.ɵfac, providedIn: "root" })),
            n
          );
        })();
      function S4(n, e) {
        if (
          (1 & n &&
            (ve(0),
            _(1, "div", 7)(2, "div", 8)(3, "h5"),
            v(4),
            g(),
            _(5, "div", 9),
            v(6),
            g()(),
            _(7, "div", 10)(8, "div", 11)(9, "h5"),
            v(10),
            Xe(11, "number"),
            g()(),
            _(12, "div", 12)(13, "p", 13),
            v(14),
            Xe(15, "number"),
            g()()(),
            _(16, "p", 14),
            v(17),
            Xe(18, "number"),
            g(),
            _(19, "div", 15),
            id(),
            _(20, "svg"),
            re(21, "polyline", 16),
            g()(),
            sd(),
            _(22, "button", 17),
            v(23, "Trade"),
            g()(),
            Ce()),
          2 & n)
        ) {
          const t = ie().$implicit;
          E(4),
            Je(t.name),
            E(2),
            Je(t.symbol),
            E(4),
            Xt("$", Ln(11, 7, t.current_price, "1.2-2"), ""),
            E(3),
            L(
              "ngClass",
              t.market_cap_change_percentage_24h > 0 ? "high" : "low"
            ),
            E(1),
            Xt(
              " ",
              Ln(15, 10, t.market_cap_change_percentage_24h, "1.2-2"),
              "% "
            ),
            E(3),
            Xt(" $", Ln(18, 13, t.market_cap, "2.0-2"), " "),
            E(4),
            L(
              "ngClass",
              t.market_cap_change_percentage_24h > 0 ? "high" : "low"
            );
        }
      }
      function A4(n, e) {
        if (
          (1 & n && (ve(0), ne(1, S4, 24, 16, "ng-container", 6), Ce()), 2 & n)
        ) {
          const t = e.index;
          E(1), L("ngIf", t < 5);
        }
      }
      let T4 = (() => {
        class n {
          constructor(t, r, o) {
            (this.priceService = t), (this.router = r), (this.database = o);
          }
          ngOnInit() {
            u1.init(),
              this.priceService.getTrendingCurrency().subscribe((t) => {
                this.prices = t;
              });
          }
          onTrade(t) {
            this.database.price = t;
          }
        }
        return (
          (n.ɵfac = function (t) {
            return new (t || n)(w(Wp), w(Ye), w(eo));
          }),
          (n.ɵcmp = qt({
            type: n,
            selectors: [["app-price-review"]],
            decls: 10,
            vars: 1,
            consts: [
              [1, "wrapper"],
              [
                "data-aos",
                "fade-up",
                "data-aos-anchor-placement",
                "top-bottom",
                "data-aos-duration",
                "900",
              ],
              [
                "data-aos",
                "fade-up",
                "data-aos-anchor-placement",
                "top-bottom",
                "data-aos-duration",
                "900",
                1,
                "whole-block",
              ],
              [4, "ngFor", "ngForOf"],
              [
                "data-aos",
                "fade-up",
                "data-aos-anchor-placement",
                "top-bottom",
                "data-aos-duration",
                "900",
                "routerLink",
                "/prices",
                1,
                "more",
              ],
              [1, "fas", "fa-arrow-right"],
              [4, "ngIf"],
              [1, "curr-block"],
              [1, "name"],
              [1, "short-name"],
              [1, "price"],
              [1, "left"],
              [1, "percent", "for-mobile"],
              [3, "ngClass"],
              [1, "volume", "for-mobile"],
              [1, "chart", "for-mobile"],
              [
                "stroke-linecap",
                "round",
                "stroke-width",
                "1.4",
                "fill",
                "none",
                "points",
                "0,24.240410442231887 0.9668874172185431,21.125403406446956 1.9337748344370862,21.144730916110014 2.9006622516556293,25.023248295602333 3.8675496688741724,22.37959197749935 4.8344370860927155,20.909875895728398 5.801324503311259,23.262290356935807 6.768211920529802,21.158362185704302 7.735099337748345,21.84809086494254 8.701986754966889,19.308808107806627 9.668874172185431,19.82029197891887 10.635761589403973,21.244404981670563 11.602649006622517,21.632384185693756 12.569536423841061,20.134289260125875 13.536423841059603,20.315735208736196 14.503311258278146,20.269442621103977 15.47019867549669,16.275815377654382 16.437086092715234,12.362931827628628 17.403973509933778,10.949687281992151 18.370860927152318,10.014072652519264 19.337748344370862,11.191902456360523 20.304635761589406,12.432758997529923 21.271523178807946,12.407576954504048 22.23841059602649,11.354100148628827 23.205298013245034,6.485176513133869 24.17218543046358,9.629538882494003 25.139072847682122,8.093567031346225 26.105960264900663,9.06672890147668 27.072847682119207,9.145814021295934 28.03973509933775,11.09550267931268 29.00662251655629,10.192710899876232 29.973509933774835,8.561483159768567 30.94039735099338,9.072525329114942 31.907284768211923,9.00884744375 32.87417218543047,9.150000691295133 33.84105960264901,9.261045409980653 34.807947019867555,8.787204125892291 35.77483443708609,6.544777402375772 36.741721854304636,6.104344242413518 37.70860927152318,6.72343050440476 38.675496688741724,7.157367958624953 39.64238410596027,8.5544800922776 40.60927152317881,9.221612769828006 41.576158940397356,8.603854187565744 42.54304635761589,8.008439563310464 43.50993377483444,7.745866175606029 44.47682119205298,8.444911578422925 45.443708609271525,8.930472640888183 46.41059602649007,8.86853109507408 47.37748344370861,8.481065596515016 48.34437086092716,9.003454254335015 49.3112582781457,6.768290508600323 50.278145695364245,5.86949090305637 51.24503311258278,6.411930155504923 52.211920529801326,2.5651982552386663 53.17880794701987,0 54.145695364238414,0.5842352896784568 55.11258278145696,2.43376439292188 56.0794701986755,3.210822493037057 57.046357615894046,2.1270978044872386 58.01324503311258,3.20555062099249 58.980132450331126,2.4551668053226017 59.94701986754967,3.352310116705233 60.913907284768214,3.3442950624500227 61.88079470198676,3.049133368792443 62.8476821192053,3.2215914499535785 63.814569536423846,1.4255958819604082 64.78145695364239,0.8431252215861775 65.74834437086093,2.0756161886481017 66.71523178807948,2.849033826744165 67.68211920529802,1.3220688426170675 68.64900662251657,1.6524595797393644 69.61589403973511,1.0774597365105691 70.58278145695364,2.591257966911243 71.54966887417218,3.9761203468139996 72.51655629139073,3.488889361084343 73.48344370860927,4.6989263034399364 74.45033112582782,2.2916313121737133 75.41721854304636,6.66501027430667 76.3841059602649,5.457967463848259 77.35099337748345,6.49622459807221 78.31788079470199,7.512267347426285 79.28476821192054,7.996279241926498 80.25165562913908,6.928766405686126 81.21854304635762,4.512498434815829 82.18543046357617,4.045683552213816 83.15231788079471,4.548618251919024 84.11920529801326,5.47914741730165 85.08609271523179,5.082952722770713 86.05298013245033,4.9404956537762175 87.01986754966887,5.428627355943291 87.98675496688742,8.897112194632502 88.95364238410596,9.416798350079347 89.9205298013245,7.665013393121985 90.88741721854305,7.684837255847377 91.8543046357616,8.119100822135739 92.82119205298014,10.292913221676784 93.78807947019868,9.98324512798937 94.75496688741723,10.619804444598461 95.72185430463577,14.805278906980167 96.68874172185431,13.42202104632041 97.65562913907286,12.22294958464851 98.6225165562914,9.565216529622013 99.58940397350995,9.80318365673709 100.55629139072849,8.61251379741785 101.52317880794702,11.252988630223232 102.49006622516556,9.625840892725275 103.45695364238411,8.898064763350124 104.42384105960265,6.830247250948467 105.3907284768212,6.34995849200147 106.35761589403974,21.889854761159334 107.32450331125828,25.689800219599956 108.29139072847683,27.753491362527313 109.25827814569537,26.262413820989533 110.22516556291392,23.381090828830143 111.19205298013246,24.647980230213918 112.158940397351,27.695088751854964 113.12582781456955,23.722973060780753 114.09271523178809,29.204477650780447 115.05960264900664,27.997938305857446 116.02649006622516,30 116.99337748344371,29.682162842842526 117.96026490066225,27.87229399934386 118.9271523178808,25.295925680641083 119.89403973509934,26.110844084022567 120.86092715231788,24.436056580595295 121.82781456953643,25.68457725444526 122.79470198675497,24.633505068263858 123.76158940397352,25.88713301243999 124.72847682119206,26.110185624866997 125.6953642384106,25.902674200930623 126.66225165562915,27.308034709852958 127.62913907284769,25.462768636160064 128.59602649006624,27.987669321060345 129.56291390728478,26.42669759234134 130.52980132450332,27.445633791452657 131.49668874172187,27.795716170307724 132.4635761589404,29.19715315362621 133.43046357615896,26.682759740469614 134.3973509933775,26.956561460719367 135.36423841059604,23.717604946227056 136.3311258278146,21.927735620140183 137.29801324503313,21.99087985569293 138.26490066225168,23.220987943970144 139.23178807947022,23.708753301938543 140.19867549668874,25.485301921446894 141.16556291390728,26.60787012593784 142.13245033112582,27.180161675873073 143.09933774834437,20.94813871182239 144.0662251655629,25.19157276524429 145.03311258278146,27.989042696698718",
                3,
                "ngClass",
              ],
              ["routerLink", "/prices", 1, "button"],
            ],
            template: function (t, r) {
              1 & t &&
                (_(0, "div", 0)(1, "h4", 1),
                v(2, " SECURELY BUY, SELL, STORE, SEND and TRACK "),
                g(),
                _(3, "h1", 1),
                v(4, " Buy crypto at true cost "),
                g(),
                _(5, "div", 2),
                ne(6, A4, 2, 1, "ng-container", 3),
                g(),
                _(7, "button", 4),
                v(8, " Learn More \xa0 "),
                re(9, "i", 5),
                g()()),
                2 & t && (E(6), L("ngForOf", r.prices));
            },
            dependencies: [la, ho, Cr, Xo, yl],
            styles: [
              ".wrapper[_ngcontent-%COMP%]{width:100%;display:flex;flex-direction:column;align-items:center;padding:128px 0}.wrapper[_ngcontent-%COMP%]   .whole-block[_ngcontent-%COMP%]{margin-bottom:55px}.wrapper[_ngcontent-%COMP%]   h4[_ngcontent-%COMP%]{color:#1199fa;font-size:18px;line-height:115%;letter-spacing:.03em;font-weight:600;margin-bottom:16px}.wrapper[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%]{font-size:74px;line-height:115px;letter-spacing:-.015em;font-weight:600;margin-bottom:64px}.wrapper[_ngcontent-%COMP%]   .curr-block[_ngcontent-%COMP%]{height:81px;display:flex;justify-content:space-between;align-items:center;padding-top:16px;padding-bottom:16px;width:1080px;border-bottom:1px solid rgba(244,244,244,.3)}.wrapper[_ngcontent-%COMP%]   .curr-block[_ngcontent-%COMP%]   .name[_ngcontent-%COMP%]{display:flex;width:15%}.wrapper[_ngcontent-%COMP%]   .curr-block[_ngcontent-%COMP%]   .name[_ngcontent-%COMP%]   h5[_ngcontent-%COMP%]{font-size:24px;line-height:145%;letter-spacing:0em;font-weight:600;margin:0 8px 0 0;color:#d1d0d1}.wrapper[_ngcontent-%COMP%]   .curr-block[_ngcontent-%COMP%]   .name[_ngcontent-%COMP%]   .short-name[_ngcontent-%COMP%]{display:flex;justify-content:center;align-items:center;font-size:20px;color:#7d7d7d;margin-right:8px;text-transform:uppercase}.wrapper[_ngcontent-%COMP%]   .curr-block[_ngcontent-%COMP%]   .price[_ngcontent-%COMP%]{width:25%;display:flex;align-items:center;justify-content:space-between}.wrapper[_ngcontent-%COMP%]   .curr-block[_ngcontent-%COMP%]   .price[_ngcontent-%COMP%]   .left[_ngcontent-%COMP%]   h5[_ngcontent-%COMP%]{font-size:32px;line-height:125%;font-weight:600;color:#f4f4f4}.wrapper[_ngcontent-%COMP%]   .curr-block[_ngcontent-%COMP%]   .price[_ngcontent-%COMP%]   .percent[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{font-size:16px;letter-spacing:.015em;font-weight:600}.wrapper[_ngcontent-%COMP%]   .curr-block[_ngcontent-%COMP%]   .price[_ngcontent-%COMP%]   .percent[_ngcontent-%COMP%]   p.low[_ngcontent-%COMP%]{color:#e64b60}.wrapper[_ngcontent-%COMP%]   .curr-block[_ngcontent-%COMP%]   .price[_ngcontent-%COMP%]   .percent[_ngcontent-%COMP%]   p.high[_ngcontent-%COMP%]{color:#20bca4}.wrapper[_ngcontent-%COMP%]   .curr-block[_ngcontent-%COMP%]   .volume[_ngcontent-%COMP%]{font-size:16px;line-height:100%;letter-spacing:.015em;font-weight:600}.wrapper[_ngcontent-%COMP%]   .curr-block[_ngcontent-%COMP%]   .button[_ngcontent-%COMP%]{font-size:21px;letter-spacing:.02em;font-weight:600;padding-left:24px;padding-right:24px;text-align:center;height:48px;width:106.84px;border-radius:4px;background-color:#f4f4f4;color:#0e213b;cursor:pointer;border:1.5px solid transparent;transition:all .2s ease 0s}.wrapper[_ngcontent-%COMP%]   .curr-block[_ngcontent-%COMP%]   .button[_ngcontent-%COMP%]:hover{border:1px solid;border-color:#1199fa;background-color:transparent;color:#f4f4f4}.wrapper[_ngcontent-%COMP%]   .curr-block[_ngcontent-%COMP%]   .chart[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%]{width:146px;height:30px}.wrapper[_ngcontent-%COMP%]   .curr-block[_ngcontent-%COMP%]   .chart[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%]   .low[_ngcontent-%COMP%]{stroke:#e64b60}.wrapper[_ngcontent-%COMP%]   .curr-block[_ngcontent-%COMP%]   .chart[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%]   .high[_ngcontent-%COMP%]{stroke:#20bca4}.wrapper[_ngcontent-%COMP%]   .more[_ngcontent-%COMP%]{cursor:pointer;font-size:21px;letter-spacing:.02em;font-weight:600;padding-left:24px;padding-right:24px;height:58px;border:1px solid #f4f4f4;border-radius:4px;background-color:inherit;color:#fff;transition:all .2s ease 0s;width:201px;text-align:center}.wrapper[_ngcontent-%COMP%]   .more[_ngcontent-%COMP%]:hover{background-color:#ffffff1a}@media screen and (min-width: 768px) and (max-width: 1128px){.wrapper[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%]{font-size:50px}.wrapper[_ngcontent-%COMP%]   h4[_ngcontent-%COMP%]{font-size:19px}.for-mobile[_ngcontent-%COMP%]{display:none}.curr-block[_ngcontent-%COMP%]{min-width:700px;max-width:750px;padding-left:10px;padding-right:10px}}@media screen and (min-width: 350px) and (max-width: 767px){.wrapper[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%]{margin-bottom:20px;font-size:30px}.wrapper[_ngcontent-%COMP%]   h4[_ngcontent-%COMP%]{font-size:14px;margin-bottom:12px}.wrapper[_ngcontent-%COMP%]   .whole-block[_ngcontent-%COMP%]{width:90%;max-width:500px}.wrapper[_ngcontent-%COMP%]   .curr-block[_ngcontent-%COMP%]{width:100%}.wrapper[_ngcontent-%COMP%]   .curr-block[_ngcontent-%COMP%]   .name[_ngcontent-%COMP%]   h5[_ngcontent-%COMP%]{font-size:15px}.wrapper[_ngcontent-%COMP%]   .curr-block[_ngcontent-%COMP%]   .name[_ngcontent-%COMP%]   .short-name[_ngcontent-%COMP%]{font-size:14px}.wrapper[_ngcontent-%COMP%]   .curr-block[_ngcontent-%COMP%]   .price[_ngcontent-%COMP%]   .left[_ngcontent-%COMP%]   h5[_ngcontent-%COMP%]{font-size:18px}.wrapper[_ngcontent-%COMP%]   .curr-block[_ngcontent-%COMP%]   .button[_ngcontent-%COMP%]{font-size:14px;width:60px;padding-left:12px;padding-right:12px}.for-mobile[_ngcontent-%COMP%]{display:none}}",
            ],
          })),
          n
        );
      })();
      function I4(n, e) {
        if (
          (1 & n && (_(0, "div", 23)(1, "div", 24), re(2, "img", 25), g()()),
          2 & n)
        ) {
          const t = ie().$implicit;
          L("@sliderFade", void 0), E(2), Qs("src", "", t, " ", sn);
        }
      }
      function k4(n, e) {
        if ((1 & n && (ve(0), ne(1, I4, 3, 2, "div", 22), Ce()), 2 & n)) {
          const t = e.index,
            r = ie(2);
          E(1), L("ngIf", t == r.currentSlideIndex);
        }
      }
      function N4(n, e) {
        if (
          (1 & n &&
            (ve(0),
            _(1, "h1", 19),
            v(2, "BUY YOUR FAVORITE NFT's"),
            g(),
            _(3, "div", 20),
            ne(4, k4, 2, 1, "ng-container", 21),
            g(),
            Ce()),
          2 & n)
        ) {
          const t = ie();
          E(4), L("ngForOf", t.items);
        }
      }
      let R4 = (() => {
          class n {
            constructor() {
              (this.currentSlideIndex = 0),
                (this.items = [
                  "https://img.seadn.io/files/2fe77eb6fe8f9e5c0a23a492a8631def.png?fit=max&w=600",
                  "https://i.seadn.io/gae/7eZlm2fpl40FGIxqQN4FrsWGUvFwy-8BIpQxhDPRgTLS8r58jwnkZha4jqRKX9CUeZ0utcLB7-cB_j76G-8XthS5rNlMVnlaYWIp?w=500&auto=format",
                  "https://img.seadn.io/files/8cc7f24feadac22f5a480cd0f8535edd.png?fit=max&w=600",
                  "https://img.seadn.io/files/712b2b932bb442d02967c555346ed782.png?fit=max",
                  "https://img.seadn.io/files/f10814caf596ff0b0a36d0fc8a3e8e3b.png?fit=max&w=600",
                  "https://i.seadn.io/gae/AJU3UPzDXvNywAmwnOdIFuo5T33KkPbyEca2l8AIsuxbYB-NKgIvjbi1_b6kcmCMRdcbiFSzu6a3_a3_ggFJNBoNvaS7z0UxJJKd?w=500&auto=format",
                  "https://i.seadn.io/gae/aCZQhFVkDz_u_ZjZNIcfM6FgYULrPxWuKHsoczihaCpEkp9yksG-eKoMogmrtPtKq9jZu_YtFFLKN5kxfgYaojaPbH0sjn8HTxqsOb0?w=500&auto=format",
                ]);
            }
            ngOnDestroy() {
              window.scroll(0, 0);
            }
            ngOnInit() {
              setInterval(() => {
                this.currentSlideIndex =
                  ++this.currentSlideIndex % this.items.length;
              }, 2500);
            }
          }
          return (
            (n.ɵfac = function (t) {
              return new (t || n)();
            }),
            (n.ɵcmp = qt({
              type: n,
              selectors: [["app-main-page"]],
              decls: 91,
              vars: 1,
              consts: [
                [1, "main"],
                [1, "news"],
                [
                  "data-aos",
                  "fade-up",
                  "data-aos-anchor-placement",
                  "top-bottom",
                  1,
                  "container-nft",
                ],
                [4, "ngIf"],
                [1, "pic"],
                [1, "container"],
                [
                  "data-aos",
                  "fade-up",
                  "data-aos-anchor-placement",
                  "top-bottom",
                ],
                [
                  "data-aos",
                  "fade-up",
                  "data-aos-anchor-placement",
                  "top-bottom",
                  1,
                  "market",
                ],
                [1, "appstore"],
                [1, "right"],
                ["src", "../../../assets/app-store.png", "alt", ""],
                [1, "left"],
                ["src", "../../../assets/google-play.png", "alt", ""],
                [1, "content"],
                [1, "fa-brands", "fa-instagram"],
                [1, "fa-brands", "fa-linkedin-in"],
                [1, "fa-brands", "fa-twitter"],
                [1, "fa-brands", "fa-facebook"],
                [1, "copy-right"],
                ["routerLink", "/nfts"],
                ["routerLink", "/nfts", 1, "nfts"],
                [4, "ngFor", "ngForOf"],
                ["class", "slide", 4, "ngIf"],
                [1, "slide"],
                [1, "slide-bg"],
                [1, "slide-bg-image", 3, "src"],
              ],
              template: function (t, r) {
                1 & t &&
                  (_(0, "div", 0),
                  re(1, "app-slider")(2, "app-price-review"),
                  _(3, "div", 1),
                  re(4, "app-news"),
                  g(),
                  _(5, "div", 2),
                  ne(6, N4, 5, 1, "ng-container", 3),
                  g(),
                  _(7, "div", 4)(8, "div", 5)(9, "h1", 6),
                  v(
                    10,
                    " Trade with confidence on the world\u2019s fastest and most secure crypto exchange "
                  ),
                  g(),
                  _(11, "div", 7)(12, "p"),
                  v(13, "MOBILE APP"),
                  g(),
                  _(14, "div", 8)(15, "div", 9),
                  re(16, "img", 10),
                  g(),
                  _(17, "div", 11),
                  re(18, "img", 12),
                  g()()()()()(),
                  _(19, "footer")(20, "div", 13)(21, "div")(22, "h4"),
                  v(23, "App"),
                  g(),
                  _(24, "p"),
                  v(25, "Buy and Sell"),
                  g(),
                  _(26, "p"),
                  v(27, "Crypto Earn"),
                  g(),
                  _(28, "p"),
                  v(29, "Crypto Credit"),
                  g(),
                  _(30, "p"),
                  v(31, "Tmtk.com Pay"),
                  g()(),
                  _(32, "div")(33, "h4"),
                  v(34, "Exchange"),
                  g(),
                  _(35, "p"),
                  v(36, "Exchange Home"),
                  g(),
                  _(37, "p"),
                  v(38, "Margin Trading"),
                  g(),
                  _(39, "p"),
                  v(40, "Derivatives Trading"),
                  g(),
                  _(41, "p"),
                  v(42, "The Syndicate"),
                  g()(),
                  _(43, "div")(44, "h4"),
                  v(45, "Blockchain"),
                  g(),
                  _(46, "P"),
                  v(47, "Tmtk.com Chain"),
                  g(),
                  _(48, "P"),
                  v(49, "Chain Explorer"),
                  g()(),
                  _(50, "div")(51, "h4"),
                  v(52, "Resources"),
                  g(),
                  _(53, "p"),
                  v(54, "Prices"),
                  g(),
                  _(55, "p"),
                  v(56, "Site Widgets"),
                  g(),
                  _(57, "p"),
                  v(58, "Tax"),
                  g(),
                  _(59, "p"),
                  v(60, "Support"),
                  g()(),
                  _(61, "div")(62, "h4"),
                  v(63, "Learn"),
                  g(),
                  _(64, "p"),
                  v(65, "What's Trending"),
                  g(),
                  _(66, "p"),
                  v(67, "Product News"),
                  g(),
                  _(68, "p"),
                  v(69, "Events"),
                  g(),
                  _(70, "p"),
                  v(71, "University"),
                  g()(),
                  _(72, "div")(73, "h4"),
                  v(74, "Company"),
                  g(),
                  _(75, "p"),
                  v(76, "About"),
                  g(),
                  _(77, "p"),
                  v(78, "Careers"),
                  g(),
                  _(79, "p"),
                  v(80, "News"),
                  g(),
                  _(81, "p"),
                  v(82, "Security"),
                  g()(),
                  _(83, "div"),
                  re(84, "i", 14)(85, "i", 15)(86, "i", 16)(87, "i", 17),
                  g()(),
                  _(88, "div", 18)(89, "p"),
                  v(90, "Copyright \xa9 2022 - 2023 All rights reserved."),
                  g()()()),
                  2 & t && (E(6), L("ngIf", r.items.length));
              },
              dependencies: [ho, Cr, Xo, y4, d1, T4],
              styles: [
                ".main[_ngcontent-%COMP%]{width:100%;background-color:#061121}.news[_ngcontent-%COMP%]{max-height:1052.33px;overflow:hidden}.container-nft[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%]{text-align:center;margin-top:70px;font-size:34px;color:#f4f4f4;letter-spacing:2px;font-weight:700;cursor:pointer}.container-nft[_ngcontent-%COMP%]   .nfts[_ngcontent-%COMP%]{background-color:#061121;margin-bottom:30px;display:flex;flex-direction:column;justify-content:space-between;height:600.33px;position:relative;background-color:inherit}.container-nft[_ngcontent-%COMP%]   .nfts[_ngcontent-%COMP%]   .slide[_ngcontent-%COMP%]{display:flex;position:absolute;width:100%;height:100%}.container-nft[_ngcontent-%COMP%]   .nfts[_ngcontent-%COMP%]   .slide-bg[_ngcontent-%COMP%]{position:relative;display:flex;flex:1 1 auto;justify-content:center;align-items:center}.container-nft[_ngcontent-%COMP%]   .nfts[_ngcontent-%COMP%]   .slide-bg-image[_ngcontent-%COMP%]{box-shadow:0 4px 30px #0058aa;cursor:pointer;border:none;border-radius:8px;height:70%;width:60%}.pic[_ngcontent-%COMP%]{display:flex;justify-content:center;align-items:flex-start;width:100%;height:800px;background:url(https://crypto.com/static/exchangeGlobal-cb1534638b50402d13c683fbfe9abf51.png) center center/cover no-repeat;background-image:url(https://crypto.com/static/exchangeGlobal-cb1534638b50402d13c683fbfe9abf51.png);background-position-x:center;background-position-y:center;background-size:cover;background-attachment:initial;background-origin:initial;background-clip:initial;background-color:initial}.pic[_ngcontent-%COMP%]   .container[_ngcontent-%COMP%]{width:65%;display:flex;flex-direction:column;align-items:center}.pic[_ngcontent-%COMP%]   .container[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%]{margin-bottom:13px;margin-top:60px;color:#000;text-align:center;font-size:48px;line-height:125%;font-weight:600;letter-spacing:-.015em}.pic[_ngcontent-%COMP%]   .container[_ngcontent-%COMP%]   .market[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{font-size:18px;line-height:115%;font-weight:500;letter-spacing:.03em;color:#1199fa;text-align:center;margin-bottom:13px}.pic[_ngcontent-%COMP%]   .container[_ngcontent-%COMP%]   .market[_ngcontent-%COMP%]   .appstore[_ngcontent-%COMP%]{display:flex}.pic[_ngcontent-%COMP%]   .container[_ngcontent-%COMP%]   .market[_ngcontent-%COMP%]   .appstore[_ngcontent-%COMP%]   .right[_ngcontent-%COMP%], .pic[_ngcontent-%COMP%]   .container[_ngcontent-%COMP%]   .market[_ngcontent-%COMP%]   .appstore[_ngcontent-%COMP%]   .left[_ngcontent-%COMP%]{margin-right:17px;height:51px;width:153px}.pic[_ngcontent-%COMP%]   .container[_ngcontent-%COMP%]   .market[_ngcontent-%COMP%]   .appstore[_ngcontent-%COMP%]   .right[_ngcontent-%COMP%]   img[_ngcontent-%COMP%], .pic[_ngcontent-%COMP%]   .container[_ngcontent-%COMP%]   .market[_ngcontent-%COMP%]   .appstore[_ngcontent-%COMP%]   .left[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{width:100%;height:100%;cursor:pointer}footer[_ngcontent-%COMP%]{width:100%;height:400px;display:flex;flex-direction:column;justify-content:center;align-items:center;background-color:#0b1426}footer[_ngcontent-%COMP%]   .copy-right[_ngcontent-%COMP%]{width:80%;color:#a0a9be;border-top:1px solid #7d7d7d;margin-top:30px;padding-top:24px;font-size:11px}footer[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]{color:#f4f4f4;width:80%;height:134px;display:flex;justify-content:space-between;align-items:flex-start}footer[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   div[_ngcontent-%COMP%]{margin-bottom:32px}footer[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   div[_ngcontent-%COMP%]   h4[_ngcontent-%COMP%]{font-size:18px;line-height:145%;font-weight:600;margin-bottom:16px}footer[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   div[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{cursor:pointer;font-size:14px;line-height:145%;letter-spacing:.03em;font-weight:400;margin-top:-3.5px;color:#eaeef4;margin-bottom:4px}footer[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   div[_ngcontent-%COMP%]   i[_ngcontent-%COMP%]{cursor:pointer;margin-top:13px;color:#7d7d7d;display:block}@media screen and (min-width: 768px) and (max-width: 1128px){footer[_ngcontent-%COMP%]{display:none}.pic[_ngcontent-%COMP%]{height:600px}.pic[_ngcontent-%COMP%]   .container[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%]{display:none}.pic[_ngcontent-%COMP%]   .container[_ngcontent-%COMP%]   .market[_ngcontent-%COMP%]{margin-top:50px}}@media screen and (min-width: 350px) and (max-width: 767px){footer[_ngcontent-%COMP%]{display:none}.container-nft[_ngcontent-%COMP%]   .nfts[_ngcontent-%COMP%]{height:400px}.pic[_ngcontent-%COMP%]{height:500px}.pic[_ngcontent-%COMP%]   .container[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%]{display:none}.pic[_ngcontent-%COMP%]   .container[_ngcontent-%COMP%]   .market[_ngcontent-%COMP%]{margin-top:30px}}",
              ],
              data: {
                animation: [
                  GM("sliderFade", [
                    KM("void", su({ opacity: 0, transform: "translateY(1%)" })),
                    QM("void <=>*", [WM("1s")]),
                  ]),
                ],
              },
            })),
            n
          );
        })(),
        F4 = (() => {
          class n {
            constructor() {
              this.nftArr$ = new $e([
                {
                  title: "EmoHead: Happy Aryiah",
                  price: 34.96,
                  img_src:
                    "https://i.seadn.io/gae/eosmk768gm4WkMS8XT-FE3qP4deKcArKGqHIrRkd6I7EyKzjtekUwIuoMKtz5pyLCxW7vo6acNCzNHBMNb2PWEqg0rL6tKZ2fwgr?w=500&auto=format",
                  author: "EmoHeads by Javirroyo",
                  nft_id: "1",
                },
                {
                  title: "Steady Stack #1088",
                  price: 3890.4,
                  img_src:
                    "https://lh3.googleusercontent.com/awc2hS_5JIIaUgq6cu8v7nmDvrOf_6eBxieu7sWRa8oPPNE8O0isCmfrwNR-d-JaQFBx0WGgBu4NOJ5Xqm8nDWcdFq-0JYGQiGdc=s0",
                  author: "Steady Stack Titans Official",
                  nft_id: "2",
                },
                {
                  title: "NICE#9605",
                  price: 50.71,
                  img_src:
                    "https://i.seadn.io/gae/7eZlm2fpl40FGIxqQN4FrsWGUvFwy-8BIpQxhDPRgTLS8r58jwnkZha4jqRKX9CUeZ0utcLB7-cB_j76G-8XthS5rNlMVnlaYWIp?w=500&auto=format",
                  author: "NICE OFFICIAL",
                  nft_id: "3",
                },
                {
                  title: "rektguy #2360",
                  price: 376.07,
                  img_src:
                    "https://lh3.googleusercontent.com/YWm-yrFIdosVvof7nOwDcIuQSG9CToS49zP-hTGPA_uoB4Tt9hRwGPAP0KjWdg7wC_h5lkDIYEoZFWimb9QK2nhk-E7uQM24jJuPPw=s0",
                  author: "rektguy",
                  nft_id: "4",
                },
                {
                  title: "Lazy Ape Yacht Club #3904",
                  price: 129.68,
                  img_src:
                    "https://img.seadn.io/files/712b2b932bb442d02967c555346ed782.png?fit=max",
                  author: "LAYC",
                  nft_id: "5",
                },
                {
                  title: "Bad Mom #6389",
                  price: 90.78,
                  img_src:
                    "https://i.seadn.io/gae/1pZpcYqWZzuckHLvx7VZjAdza9MHtvVVZSH14hYHKqYqh3EOSQGQR3TWHqgWGgEZZBmL5A3u1oLQQG6ejJKmcDI9Y8VIQYVK7O_W?w=500&auto=format",
                  author: "LAYC",
                  nft_id: "6",
                },
                {
                  title: "CloneX #6739",
                  price: 7910.48,
                  img_src:
                    "https://img.seadn.io/files/f10814caf596ff0b0a36d0fc8a3e8e3b.png?fit=max&w=600",
                  author: "CLONE X - X TAKASHI MURAKAMI",
                  nft_id: "7",
                },
                {
                  title: "El Pandas #3117",
                  price: 42.79,
                  img_src:
                    "https://img.seadn.io/files/2fe77eb6fe8f9e5c0a23a492a8631def.png?fit=max&w=600",
                  author: "EIPandas",
                  nft_id: "8",
                },
                {
                  title: "goblintown #4589",
                  price: 619.6,
                  img_src:
                    "https://img.seadn.io/files/8cc7f24feadac22f5a480cd0f8535edd.png?fit=max&w=600",
                  author: "goblintown.wtf",
                  nft_id: "9",
                },
                {
                  title: "BVDCAT #2178",
                  price: 1400.54,
                  img_src:
                    "https://i.seadn.io/gae/AJU3UPzDXvNywAmwnOdIFuo5T33KkPbyEca2l8AIsuxbYB-NKgIvjbi1_b6kcmCMRdcbiFSzu6a3_a3_ggFJNBoNvaS7z0UxJJKd?w=500&auto=format",
                  author: "BVDCATs",
                  nft_id: "10",
                },
                {
                  title: "DOGGY #7127",
                  price: 317.72,
                  img_src:
                    "https://i.seadn.io/gae/kpbtjkuvJbpd5BGY-lNdyCmsSOum2jaiw1zmby5YlLvw5Avh9IxnfXjoCEMVvy0WSlKp_hdyboOJOqe-NLSJE8RbbJ49oyr1F82few?w=500&auto=format",
                  author: "The Doge Pound",
                  nft_id: "11",
                },
                {
                  title: "Hooters on Hooch #1945",
                  price: 884,
                  img_src:
                    "https://i.seadn.io/gae/aCZQhFVkDz_u_ZjZNIcfM6FgYULrPxWuKHsoczihaCpEkp9yksG-eKoMogmrtPtKq9jZu_YtFFLKN5kxfgYaojaPbH0sjn8HTxqsOb0?w=500&auto=format",
                  author: "Hooter On Hooch",
                  nft_id: "12",
                },
              ]);
            }
            getNftArr() {
              return this.nftArr$;
            }
          }
          return (
            (n.ɵfac = function (t) {
              return new (t || n)();
            }),
            (n.ɵprov = R({ token: n, factory: n.ɵfac, providedIn: "root" })),
            n
          );
        })();
      function L4(n, e) {
        if (
          (1 & n &&
            (ve(0),
            _(1, "div", 4),
            re(2, "img", 5),
            _(3, "div", 6)(4, "p"),
            v(5),
            g(),
            _(6, "h1"),
            v(7),
            g(),
            _(8, "div", 7)(9, "span"),
            v(10, "$"),
            g(),
            _(11, "h3"),
            v(12),
            g()(),
            _(13, "button"),
            v(14, "Buy"),
            g()()(),
            Ce()),
          2 & n)
        ) {
          const t = e.$implicit;
          E(2),
            L("src", t.img_src, sn),
            E(3),
            Je(t.author),
            E(2),
            Je(t.title),
            E(5),
            Je(t.price);
        }
      }
      let V4 = (() => {
        class n {
          constructor(t) {
            (this.nftService = t), (this.nftArr$ = new $e([]));
          }
          ngOnInit() {
            this.nftArr$ = this.nftService.getNftArr();
          }
          ngOnDestroy() {
            window.scroll(0, 0);
          }
        }
        return (
          (n.ɵfac = function (t) {
            return new (t || n)(w(F4));
          }),
          (n.ɵcmp = qt({
            type: n,
            selectors: [["app-nft"]],
            decls: 7,
            vars: 3,
            consts: [
              [1, "wrapper"],
              [1, "container"],
              [1, "card-wrapper"],
              [4, "ngFor", "ngForOf"],
              [1, "card"],
              ["alt", "hhtps//:google.com/img/2", 3, "src"],
              [1, "card-text"],
              [1, "price"],
            ],
            template: function (t, r) {
              1 & t &&
                (_(0, "div", 0)(1, "div", 1)(2, "h1"),
                v(3, "Buy Your Favorite NFTs"),
                g(),
                _(4, "div", 2),
                ne(5, L4, 15, 4, "ng-container", 3),
                Xe(6, "async"),
                g()()()),
                2 & t && (E(5), L("ngForOf", tr(6, 1, r.nftArr$)));
            },
            dependencies: [ho, Ho],
            styles: [
              "[_nghost-%COMP%]{height:100%;display:block;background-color:#061121}.wrapper[_ngcontent-%COMP%]{width:100%;display:flex;flex-direction:column;align-items:center;background-color:#061121}.wrapper[_ngcontent-%COMP%]   .container[_ngcontent-%COMP%]{margin-top:110px;width:1176px}.wrapper[_ngcontent-%COMP%]   .container[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%]{text-transform:uppercase;color:#0b8deb;font-size:24px;font-weight:700;line-height:26.4px;letter-spacing:1px}.wrapper[_ngcontent-%COMP%]   .container[_ngcontent-%COMP%]   .card-wrapper[_ngcontent-%COMP%]{display:flex;justify-content:space-between;flex-wrap:wrap}.wrapper[_ngcontent-%COMP%]   .container[_ngcontent-%COMP%]   .card-wrapper[_ngcontent-%COMP%]   .card[_ngcontent-%COMP%]{width:360px;height:590px;border:1px solid #0d2538;background:linear-gradient(180deg,#fff,hsla(0deg,0%,100%,0)),#fff;border-radius:15px;margin-bottom:20px;margin-top:40px}.wrapper[_ngcontent-%COMP%]   .container[_ngcontent-%COMP%]   .card-wrapper[_ngcontent-%COMP%]   .card[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{width:100%;height:360px;border-top-left-radius:15px;border-top-right-radius:15px}.wrapper[_ngcontent-%COMP%]   .container[_ngcontent-%COMP%]   .card-wrapper[_ngcontent-%COMP%]   .card[_ngcontent-%COMP%]   .card-text[_ngcontent-%COMP%]{width:100%;padding:0 24px 32px;margin-top:20px}.wrapper[_ngcontent-%COMP%]   .container[_ngcontent-%COMP%]   .card-wrapper[_ngcontent-%COMP%]   .card[_ngcontent-%COMP%]   .card-text[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{font-size:14px;font-weight:500;line-height:1.3em;letter-spacing:.3px;color:#000}.wrapper[_ngcontent-%COMP%]   .container[_ngcontent-%COMP%]   .card-wrapper[_ngcontent-%COMP%]   .card[_ngcontent-%COMP%]   .card-text[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%]{letter-spacing:-.2px;font-size:20px;font-weight:700px;line-height:26px;margin-top:20px;color:#000;white-space:no-wrap}.wrapper[_ngcontent-%COMP%]   .container[_ngcontent-%COMP%]   .card-wrapper[_ngcontent-%COMP%]   .card[_ngcontent-%COMP%]   .card-text[_ngcontent-%COMP%]   .price[_ngcontent-%COMP%]{margin-top:23px;display:flex;align-items:center}.wrapper[_ngcontent-%COMP%]   .container[_ngcontent-%COMP%]   .card-wrapper[_ngcontent-%COMP%]   .card[_ngcontent-%COMP%]   .card-text[_ngcontent-%COMP%]   .price[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%]{line-height:1.3em;font-size:20px;font-weight:700;color:#000}.wrapper[_ngcontent-%COMP%]   .container[_ngcontent-%COMP%]   .card-wrapper[_ngcontent-%COMP%]   .card[_ngcontent-%COMP%]   .card-text[_ngcontent-%COMP%]   .price[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]{color:#000;margin-right:3px;font-size:15px;margin-bottom:3px;line-height:1.3em}.wrapper[_ngcontent-%COMP%]   .container[_ngcontent-%COMP%]   .card-wrapper[_ngcontent-%COMP%]   .card[_ngcontent-%COMP%]   .card-text[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]{font-size:18px;letter-spacing:.02em;font-weight:600;margin:29px 0 0;text-align:center;height:35px;width:90px;border-radius:4px;color:#0d6efd;border-color:#0d6efd;cursor:pointer;border:1px solid;background-color:transparent;transition:color .15s ease-in-out,background-color .15s ease-in-out,border-color .15s ease-in-out}.wrapper[_ngcontent-%COMP%]   .container[_ngcontent-%COMP%]   .card-wrapper[_ngcontent-%COMP%]   .card[_ngcontent-%COMP%]   .card-text[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]:hover{background-color:#0d6efd;border-color:transparent;color:#f4f4f4}@media screen and (min-width: 768px) and (max-width: 1128px){.wrapper[_ngcontent-%COMP%]   .container[_ngcontent-%COMP%]{width:90%}.wrapper[_ngcontent-%COMP%]   .container[_ngcontent-%COMP%]   .card-wrapper[_ngcontent-%COMP%]   .card[_ngcontent-%COMP%]{border:none;width:320px;height:590px}.wrapper[_ngcontent-%COMP%]   .container[_ngcontent-%COMP%]   .card-wrapper[_ngcontent-%COMP%]   .card[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{width:100%;height:340px}.wrapper[_ngcontent-%COMP%]   .container[_ngcontent-%COMP%]   .card-wrapper[_ngcontent-%COMP%]   .card[_ngcontent-%COMP%]   .card-text[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%]{font-size:18px}}@media screen and (min-width: 350px) and (max-width: 767px){.wrapper[_ngcontent-%COMP%]   .container[_ngcontent-%COMP%]{width:90%}.wrapper[_ngcontent-%COMP%]   .container[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%]{text-align:center}.wrapper[_ngcontent-%COMP%]   .container[_ngcontent-%COMP%]   .card-wrapper[_ngcontent-%COMP%]{justify-content:center;flex-direction:column;align-items:center}.wrapper[_ngcontent-%COMP%]   .container[_ngcontent-%COMP%]   .card-wrapper[_ngcontent-%COMP%]   .card[_ngcontent-%COMP%]{border:none;width:320px;height:590px}.wrapper[_ngcontent-%COMP%]   .container[_ngcontent-%COMP%]   .card-wrapper[_ngcontent-%COMP%]   .card[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{width:100%;height:340px}.wrapper[_ngcontent-%COMP%]   .container[_ngcontent-%COMP%]   .card-wrapper[_ngcontent-%COMP%]   .card[_ngcontent-%COMP%]   .card-text[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%]{font-size:18px}}",
            ],
          })),
          n
        );
      })();
      class B4 extends Ee {
        constructor(e, t) {
          super();
        }
        schedule(e, t = 0) {
          return this;
        }
      }
      const du = {
          setInterval(n, e, ...t) {
            const { delegate: r } = du;
            return r?.setInterval
              ? r.setInterval(n, e, ...t)
              : setInterval(n, e, ...t);
          },
          clearInterval(n) {
            const { delegate: e } = du;
            return (e?.clearInterval || clearInterval)(n);
          },
          delegate: void 0,
        },
        f1 = { now: () => (f1.delegate || Date).now(), delegate: void 0 };
      class Fa {
        constructor(e, t = Fa.now) {
          (this.schedulerActionCtor = e), (this.now = t);
        }
        schedule(e, t = 0, r) {
          return new this.schedulerActionCtor(this, e).schedule(r, t);
        }
      }
      Fa.now = f1.now;
      const $4 = new (class U4 extends Fa {
        constructor(e, t = Fa.now) {
          super(e, t),
            (this.actions = []),
            (this._active = !1),
            (this._scheduled = void 0);
        }
        flush(e) {
          const { actions: t } = this;
          if (this._active) return void t.push(e);
          let r;
          this._active = !0;
          do {
            if ((r = e.execute(e.state, e.delay))) break;
          } while ((e = t.shift()));
          if (((this._active = !1), r)) {
            for (; (e = t.shift()); ) e.unsubscribe();
            throw r;
          }
        }
      })(
        class j4 extends B4 {
          constructor(e, t) {
            super(e, t),
              (this.scheduler = e),
              (this.work = t),
              (this.pending = !1);
          }
          schedule(e, t = 0) {
            if (this.closed) return this;
            this.state = e;
            const r = this.id,
              o = this.scheduler;
            return (
              null != r && (this.id = this.recycleAsyncId(o, r, t)),
              (this.pending = !0),
              (this.delay = t),
              (this.id = this.id || this.requestAsyncId(o, this.id, t)),
              this
            );
          }
          requestAsyncId(e, t, r = 0) {
            return du.setInterval(e.flush.bind(e, this), r);
          }
          recycleAsyncId(e, t, r = 0) {
            if (null != r && this.delay === r && !1 === this.pending) return t;
            du.clearInterval(t);
          }
          execute(e, t) {
            if (this.closed) return new Error("executing a cancelled action");
            this.pending = !1;
            const r = this._execute(e, t);
            if (r) return r;
            !1 === this.pending &&
              null != this.id &&
              (this.id = this.recycleAsyncId(this.scheduler, this.id, null));
          }
          _execute(e, t) {
            let o,
              r = !1;
            try {
              this.work(e);
            } catch (i) {
              (r = !0),
                (o = i || new Error("Scheduled action threw falsy error"));
            }
            if (r) return this.unsubscribe(), o;
          }
          unsubscribe() {
            if (!this.closed) {
              const { id: e, scheduler: t } = this,
                { actions: r } = t;
              (this.work = this.state = this.scheduler = null),
                (this.pending = !1),
                ke(r, this),
                null != e && (this.id = this.recycleAsyncId(t, e, null)),
                (this.delay = null),
                super.unsubscribe();
            }
          }
        }
      );
      function La(n, e = $4) {
        return ae((t, r) => {
          let o = null,
            i = null,
            s = null;
          const a = () => {
            if (o) {
              o.unsubscribe(), (o = null);
              const l = i;
              (i = null), r.next(l);
            }
          };
          function c() {
            const l = s + n,
              u = e.now();
            if (u < l) return (o = this.schedule(void 0, l - u)), void r.add(o);
            a();
          }
          t.subscribe(
            ye(
              r,
              (l) => {
                (i = l), (s = e.now()), o || ((o = e.schedule(c, n)), r.add(o));
              },
              () => {
                a(), r.complete();
              },
              void 0,
              () => {
                i = o = null;
              }
            )
          );
        });
      }
      let qp;
      try {
        qp = typeof Intl < "u" && Intl.v8BreakIterator;
      } catch {
        qp = !1;
      }
      let Ba,
        Qp,
        Va = (() => {
          class n {
            constructor(t) {
              (this._platformId = t),
                (this.isBrowser = this._platformId
                  ? (function xk(n) {
                      return n === XC;
                    })(this._platformId)
                  : "object" == typeof document && !!document),
                (this.EDGE =
                  this.isBrowser && /(edge)/i.test(navigator.userAgent)),
                (this.TRIDENT =
                  this.isBrowser &&
                  /(msie|trident)/i.test(navigator.userAgent)),
                (this.BLINK =
                  this.isBrowser &&
                  !(!window.chrome && !qp) &&
                  typeof CSS < "u" &&
                  !this.EDGE &&
                  !this.TRIDENT),
                (this.WEBKIT =
                  this.isBrowser &&
                  /AppleWebKit/i.test(navigator.userAgent) &&
                  !this.BLINK &&
                  !this.EDGE &&
                  !this.TRIDENT),
                (this.IOS =
                  this.isBrowser &&
                  /iPad|iPhone|iPod/.test(navigator.userAgent) &&
                  !("MSStream" in window)),
                (this.FIREFOX =
                  this.isBrowser &&
                  /(firefox|minefield)/i.test(navigator.userAgent)),
                (this.ANDROID =
                  this.isBrowser &&
                  /android/i.test(navigator.userAgent) &&
                  !this.TRIDENT),
                (this.SAFARI =
                  this.isBrowser &&
                  /safari/i.test(navigator.userAgent) &&
                  this.WEBKIT);
            }
          }
          return (
            (n.ɵfac = function (t) {
              return new (t || n)(P(el));
            }),
            (n.ɵprov = R({ token: n, factory: n.ɵfac, providedIn: "root" })),
            n
          );
        })();
      function Kp(n) {
        return (function H4() {
          if (null == Ba && typeof window < "u")
            try {
              window.addEventListener(
                "test",
                null,
                Object.defineProperty({}, "passive", { get: () => (Ba = !0) })
              );
            } finally {
              Ba = Ba || !1;
            }
          return Ba;
        })()
          ? n
          : !!n.capture;
      }
      function ja(n) {
        return n.composedPath ? n.composedPath()[0] : n.target;
      }
      function p1(n) {
        return Dr((e, t) => n <= t);
      }
      function X4(n, e) {
        return n === e;
      }
      function g1(n) {
        return ae((e, t) => {
          An(n).subscribe(ye(t, () => t.complete(), Mt)),
            !t.closed && e.subscribe(t);
        });
      }
      function m1(n) {
        return null != n && "false" != `${n}`;
      }
      function _1(n) {
        return Array.isArray(n) ? n : [n];
      }
      function Ua(n) {
        return n instanceof Ft ? n.nativeElement : n;
      }
      const y1 = new Set();
      let as,
        t5 = (() => {
          class n {
            constructor(t) {
              (this._platform = t),
                (this._matchMedia =
                  this._platform.isBrowser && window.matchMedia
                    ? window.matchMedia.bind(window)
                    : r5);
            }
            matchMedia(t) {
              return (
                (this._platform.WEBKIT || this._platform.BLINK) &&
                  (function n5(n) {
                    if (!y1.has(n))
                      try {
                        as ||
                          ((as = document.createElement("style")),
                          as.setAttribute("type", "text/css"),
                          document.head.appendChild(as)),
                          as.sheet &&
                            (as.sheet.insertRule(`@media ${n} {body{ }}`, 0),
                            y1.add(n));
                      } catch (e) {
                        console.error(e);
                      }
                  })(t),
                this._matchMedia(t)
              );
            }
          }
          return (
            (n.ɵfac = function (t) {
              return new (t || n)(P(Va));
            }),
            (n.ɵprov = R({ token: n, factory: n.ɵfac, providedIn: "root" })),
            n
          );
        })();
      function r5(n) {
        return {
          matches: "all" === n || "" === n,
          media: n,
          addListener: () => {},
          removeListener: () => {},
        };
      }
      let o5 = (() => {
        class n {
          constructor(t, r) {
            (this._mediaMatcher = t),
              (this._zone = r),
              (this._queries = new Map()),
              (this._destroySubject = new We());
          }
          ngOnDestroy() {
            this._destroySubject.next(), this._destroySubject.complete();
          }
          isMatched(t) {
            return v1(_1(t)).some((o) => this._registerQuery(o).mql.matches);
          }
          observe(t) {
            let i = sp(v1(_1(t)).map((s) => this._registerQuery(s).observable));
            return (
              (i = Ll(i.pipe(Ji(1)), i.pipe(p1(1), La(0)))),
              i.pipe(
                U((s) => {
                  const a = { matches: !1, breakpoints: {} };
                  return (
                    s.forEach(({ matches: c, query: l }) => {
                      (a.matches = a.matches || c), (a.breakpoints[l] = c);
                    }),
                    a
                  );
                })
              )
            );
          }
          _registerQuery(t) {
            if (this._queries.has(t)) return this._queries.get(t);
            const r = this._mediaMatcher.matchMedia(t),
              i = {
                observable: new Re((s) => {
                  const a = (c) => this._zone.run(() => s.next(c));
                  return (
                    r.addListener(a),
                    () => {
                      r.removeListener(a);
                    }
                  );
                }).pipe(
                  kw(r),
                  U(({ matches: s }) => ({ query: t, matches: s })),
                  g1(this._destroySubject)
                ),
                mql: r,
              };
            return this._queries.set(t, i), i;
          }
        }
        return (
          (n.ɵfac = function (t) {
            return new (t || n)(P(t5), P(Ge));
          }),
          (n.ɵprov = R({ token: n, factory: n.ɵfac, providedIn: "root" })),
          n
        );
      })();
      function v1(n) {
        return n
          .map((e) => e.split(","))
          .reduce((e, t) => e.concat(t))
          .map((e) => e.trim());
      }
      function M1(n) {
        return 0 === n.buttons || (0 === n.offsetX && 0 === n.offsetY);
      }
      function D1(n) {
        const e =
          (n.touches && n.touches[0]) ||
          (n.changedTouches && n.changedTouches[0]);
        return !(
          !e ||
          -1 !== e.identifier ||
          (null != e.radiusX && 1 !== e.radiusX) ||
          (null != e.radiusY && 1 !== e.radiusY)
        );
      }
      const f5 = new F("cdk-input-modality-detector-options"),
        h5 = { ignoreKeys: [18, 17, 224, 91, 16] },
        cs = Kp({ passive: !0, capture: !0 });
      let p5 = (() => {
        class n {
          constructor(t, r, o, i) {
            (this._platform = t),
              (this._mostRecentTarget = null),
              (this._modality = new $e(null)),
              (this._lastTouchMs = 0),
              (this._onKeydown = (s) => {
                this._options?.ignoreKeys?.some((a) => a === s.keyCode) ||
                  (this._modality.next("keyboard"),
                  (this._mostRecentTarget = ja(s)));
              }),
              (this._onMousedown = (s) => {
                Date.now() - this._lastTouchMs < 650 ||
                  (this._modality.next(M1(s) ? "keyboard" : "mouse"),
                  (this._mostRecentTarget = ja(s)));
              }),
              (this._onTouchstart = (s) => {
                D1(s)
                  ? this._modality.next("keyboard")
                  : ((this._lastTouchMs = Date.now()),
                    this._modality.next("touch"),
                    (this._mostRecentTarget = ja(s)));
              }),
              (this._options = { ...h5, ...i }),
              (this.modalityDetected = this._modality.pipe(p1(1))),
              (this.modalityChanged = this.modalityDetected.pipe(
                (function J4(n, e = St) {
                  return (
                    (n = n ?? X4),
                    ae((t, r) => {
                      let o,
                        i = !0;
                      t.subscribe(
                        ye(r, (s) => {
                          const a = e(s);
                          (i || !n(o, a)) && ((i = !1), (o = a), r.next(s));
                        })
                      );
                    })
                  );
                })()
              )),
              t.isBrowser &&
                r.runOutsideAngular(() => {
                  o.addEventListener("keydown", this._onKeydown, cs),
                    o.addEventListener("mousedown", this._onMousedown, cs),
                    o.addEventListener("touchstart", this._onTouchstart, cs);
                });
          }
          get mostRecentModality() {
            return this._modality.value;
          }
          ngOnDestroy() {
            this._modality.complete(),
              this._platform.isBrowser &&
                (document.removeEventListener("keydown", this._onKeydown, cs),
                document.removeEventListener(
                  "mousedown",
                  this._onMousedown,
                  cs
                ),
                document.removeEventListener(
                  "touchstart",
                  this._onTouchstart,
                  cs
                ));
          }
        }
        return (
          (n.ɵfac = function (t) {
            return new (t || n)(P(Va), P(Ge), P(st), P(f5, 8));
          }),
          (n.ɵprov = R({ token: n, factory: n.ɵfac, providedIn: "root" })),
          n
        );
      })();
      const m5 = new F("cdk-focus-monitor-default-options"),
        hu = Kp({ passive: !0, capture: !0 });
      let _5 = (() => {
        class n {
          constructor(t, r, o, i, s) {
            (this._ngZone = t),
              (this._platform = r),
              (this._inputModalityDetector = o),
              (this._origin = null),
              (this._windowFocused = !1),
              (this._originFromTouchInteraction = !1),
              (this._elementInfo = new Map()),
              (this._monitoredElementCount = 0),
              (this._rootNodeFocusListenerCount = new Map()),
              (this._windowFocusListener = () => {
                (this._windowFocused = !0),
                  (this._windowFocusTimeoutId = window.setTimeout(
                    () => (this._windowFocused = !1)
                  ));
              }),
              (this._stopInputModalityDetector = new We()),
              (this._rootNodeFocusAndBlurListener = (a) => {
                for (let l = ja(a); l; l = l.parentElement)
                  "focus" === a.type ? this._onFocus(a, l) : this._onBlur(a, l);
              }),
              (this._document = i),
              (this._detectionMode = s?.detectionMode || 0);
          }
          monitor(t, r = !1) {
            const o = Ua(t);
            if (!this._platform.isBrowser || 1 !== o.nodeType) return V(null);
            const i =
                (function G4(n) {
                  if (
                    (function z4() {
                      if (null == Qp) {
                        const n = typeof document < "u" ? document.head : null;
                        Qp = !(!n || (!n.createShadowRoot && !n.attachShadow));
                      }
                      return Qp;
                    })()
                  ) {
                    const e = n.getRootNode ? n.getRootNode() : null;
                    if (
                      typeof ShadowRoot < "u" &&
                      ShadowRoot &&
                      e instanceof ShadowRoot
                    )
                      return e;
                  }
                  return null;
                })(o) || this._getDocument(),
              s = this._elementInfo.get(o);
            if (s) return r && (s.checkChildren = !0), s.subject;
            const a = { checkChildren: r, subject: new We(), rootNode: i };
            return (
              this._elementInfo.set(o, a),
              this._registerGlobalListeners(a),
              a.subject
            );
          }
          stopMonitoring(t) {
            const r = Ua(t),
              o = this._elementInfo.get(r);
            o &&
              (o.subject.complete(),
              this._setClasses(r),
              this._elementInfo.delete(r),
              this._removeGlobalListeners(o));
          }
          focusVia(t, r, o) {
            const i = Ua(t);
            i === this._getDocument().activeElement
              ? this._getClosestElementsInfo(i).forEach(([a, c]) =>
                  this._originChanged(a, r, c)
                )
              : (this._setOrigin(r),
                "function" == typeof i.focus && i.focus(o));
          }
          ngOnDestroy() {
            this._elementInfo.forEach((t, r) => this.stopMonitoring(r));
          }
          _getDocument() {
            return this._document || document;
          }
          _getWindow() {
            return this._getDocument().defaultView || window;
          }
          _getFocusOrigin(t) {
            return this._origin
              ? this._originFromTouchInteraction
                ? this._shouldBeAttributedToTouch(t)
                  ? "touch"
                  : "program"
                : this._origin
              : this._windowFocused && this._lastFocusOrigin
              ? this._lastFocusOrigin
              : t && this._isLastInteractionFromInputLabel(t)
              ? "mouse"
              : "program";
          }
          _shouldBeAttributedToTouch(t) {
            return (
              1 === this._detectionMode ||
              !!t?.contains(this._inputModalityDetector._mostRecentTarget)
            );
          }
          _setClasses(t, r) {
            t.classList.toggle("cdk-focused", !!r),
              t.classList.toggle("cdk-touch-focused", "touch" === r),
              t.classList.toggle("cdk-keyboard-focused", "keyboard" === r),
              t.classList.toggle("cdk-mouse-focused", "mouse" === r),
              t.classList.toggle("cdk-program-focused", "program" === r);
          }
          _setOrigin(t, r = !1) {
            this._ngZone.runOutsideAngular(() => {
              (this._origin = t),
                (this._originFromTouchInteraction = "touch" === t && r),
                0 === this._detectionMode &&
                  (clearTimeout(this._originTimeoutId),
                  (this._originTimeoutId = setTimeout(
                    () => (this._origin = null),
                    this._originFromTouchInteraction ? 650 : 1
                  )));
            });
          }
          _onFocus(t, r) {
            const o = this._elementInfo.get(r),
              i = ja(t);
            !o ||
              (!o.checkChildren && r !== i) ||
              this._originChanged(r, this._getFocusOrigin(i), o);
          }
          _onBlur(t, r) {
            const o = this._elementInfo.get(r);
            !o ||
              (o.checkChildren &&
                t.relatedTarget instanceof Node &&
                r.contains(t.relatedTarget)) ||
              (this._setClasses(r), this._emitOrigin(o, null));
          }
          _emitOrigin(t, r) {
            t.subject.observers.length &&
              this._ngZone.run(() => t.subject.next(r));
          }
          _registerGlobalListeners(t) {
            if (!this._platform.isBrowser) return;
            const r = t.rootNode,
              o = this._rootNodeFocusListenerCount.get(r) || 0;
            o ||
              this._ngZone.runOutsideAngular(() => {
                r.addEventListener(
                  "focus",
                  this._rootNodeFocusAndBlurListener,
                  hu
                ),
                  r.addEventListener(
                    "blur",
                    this._rootNodeFocusAndBlurListener,
                    hu
                  );
              }),
              this._rootNodeFocusListenerCount.set(r, o + 1),
              1 == ++this._monitoredElementCount &&
                (this._ngZone.runOutsideAngular(() => {
                  this._getWindow().addEventListener(
                    "focus",
                    this._windowFocusListener
                  );
                }),
                this._inputModalityDetector.modalityDetected
                  .pipe(g1(this._stopInputModalityDetector))
                  .subscribe((i) => {
                    this._setOrigin(i, !0);
                  }));
          }
          _removeGlobalListeners(t) {
            const r = t.rootNode;
            if (this._rootNodeFocusListenerCount.has(r)) {
              const o = this._rootNodeFocusListenerCount.get(r);
              o > 1
                ? this._rootNodeFocusListenerCount.set(r, o - 1)
                : (r.removeEventListener(
                    "focus",
                    this._rootNodeFocusAndBlurListener,
                    hu
                  ),
                  r.removeEventListener(
                    "blur",
                    this._rootNodeFocusAndBlurListener,
                    hu
                  ),
                  this._rootNodeFocusListenerCount.delete(r));
            }
            --this._monitoredElementCount ||
              (this._getWindow().removeEventListener(
                "focus",
                this._windowFocusListener
              ),
              this._stopInputModalityDetector.next(),
              clearTimeout(this._windowFocusTimeoutId),
              clearTimeout(this._originTimeoutId));
          }
          _originChanged(t, r, o) {
            this._setClasses(t, r),
              this._emitOrigin(o, r),
              (this._lastFocusOrigin = r);
          }
          _getClosestElementsInfo(t) {
            const r = [];
            return (
              this._elementInfo.forEach((o, i) => {
                (i === t || (o.checkChildren && i.contains(t))) &&
                  r.push([i, o]);
              }),
              r
            );
          }
          _isLastInteractionFromInputLabel(t) {
            const { _mostRecentTarget: r, mostRecentModality: o } =
              this._inputModalityDetector;
            if (
              "mouse" !== o ||
              !r ||
              r === t ||
              ("INPUT" !== t.nodeName && "TEXTAREA" !== t.nodeName) ||
              t.disabled
            )
              return !1;
            const i = t.labels;
            if (i)
              for (let s = 0; s < i.length; s++)
                if (i[s].contains(r)) return !0;
            return !1;
          }
        }
        return (
          (n.ɵfac = function (t) {
            return new (t || n)(P(Ge), P(Va), P(p5), P(st, 8), P(m5, 8));
          }),
          (n.ɵprov = R({ token: n, factory: n.ɵfac, providedIn: "root" })),
          n
        );
      })();
      const O1 = "cdk-high-contrast-black-on-white",
        P1 = "cdk-high-contrast-white-on-black",
        Zp = "cdk-high-contrast-active";
      let y5 = (() => {
          class n {
            constructor(t, r) {
              (this._platform = t),
                (this._document = r),
                (this._breakpointSubscription = Qe(o5)
                  .observe("(forced-colors: active)")
                  .subscribe(() => {
                    this._hasCheckedHighContrastMode &&
                      ((this._hasCheckedHighContrastMode = !1),
                      this._applyBodyHighContrastModeCssClasses());
                  }));
            }
            getHighContrastMode() {
              if (!this._platform.isBrowser) return 0;
              const t = this._document.createElement("div");
              (t.style.backgroundColor = "rgb(1,2,3)"),
                (t.style.position = "absolute"),
                this._document.body.appendChild(t);
              const r = this._document.defaultView || window,
                o = r && r.getComputedStyle ? r.getComputedStyle(t) : null,
                i = ((o && o.backgroundColor) || "").replace(/ /g, "");
              switch ((t.remove(), i)) {
                case "rgb(0,0,0)":
                  return 2;
                case "rgb(255,255,255)":
                  return 1;
              }
              return 0;
            }
            ngOnDestroy() {
              this._breakpointSubscription.unsubscribe();
            }
            _applyBodyHighContrastModeCssClasses() {
              if (
                !this._hasCheckedHighContrastMode &&
                this._platform.isBrowser &&
                this._document.body
              ) {
                const t = this._document.body.classList;
                t.remove(Zp, O1, P1), (this._hasCheckedHighContrastMode = !0);
                const r = this.getHighContrastMode();
                1 === r ? t.add(Zp, O1) : 2 === r && t.add(Zp, P1);
              }
            }
          }
          return (
            (n.ɵfac = function (t) {
              return new (t || n)(P(Va), P(st));
            }),
            (n.ɵprov = R({ token: n, factory: n.ɵfac, providedIn: "root" })),
            n
          );
        })(),
        x1 = (() => {
          class n {}
          return (
            (n.ɵfac = function (t) {
              return new (t || n)();
            }),
            (n.ɵmod = yt({ type: n })),
            (n.ɵinj = ft({})),
            n
          );
        })();
      const w5 = new F("mat-sanity-checks", {
        providedIn: "root",
        factory: function b5() {
          return !0;
        },
      });
      let pu = (() => {
        class n {
          constructor(t, r, o) {
            (this._sanityChecks = r),
              (this._document = o),
              (this._hasDoneGlobalChecks = !1),
              t._applyBodyHighContrastModeCssClasses(),
              this._hasDoneGlobalChecks || (this._hasDoneGlobalChecks = !0);
          }
          _checkIsEnabled(t) {
            return (
              !(function W4() {
                return (
                  (typeof __karma__ < "u" && !!__karma__) ||
                  (typeof jasmine < "u" && !!jasmine) ||
                  (typeof jest < "u" && !!jest) ||
                  (typeof Mocha < "u" && !!Mocha)
                );
              })() &&
              ("boolean" == typeof this._sanityChecks
                ? this._sanityChecks
                : !!this._sanityChecks[t])
            );
          }
        }
        return (
          (n.ɵfac = function (t) {
            return new (t || n)(P(y5), P(w5, 8), P(st));
          }),
          (n.ɵmod = yt({ type: n })),
          (n.ɵinj = ft({ imports: [x1, x1] })),
          n
        );
      })();
      function M5(n) {
        return class extends n {
          constructor(...e) {
            super(...e), (this._disabled = !1);
          }
          get disabled() {
            return this._disabled;
          }
          set disabled(e) {
            this._disabled = m1(e);
          }
        };
      }
      function D5(n, e) {
        return class extends n {
          constructor(...t) {
            super(...t), (this.defaultColor = e), (this.color = e);
          }
          get color() {
            return this._color;
          }
          set color(t) {
            const r = t || this.defaultColor;
            r !== this._color &&
              (this._color &&
                this._elementRef.nativeElement.classList.remove(
                  `mat-${this._color}`
                ),
              r && this._elementRef.nativeElement.classList.add(`mat-${r}`),
              (this._color = r));
          }
        };
      }
      function E5(n) {
        return class extends n {
          constructor(...e) {
            super(...e), (this._disableRipple = !1);
          }
          get disableRipple() {
            return this._disableRipple;
          }
          set disableRipple(e) {
            this._disableRipple = m1(e);
          }
        };
      }
      class P5 {
        constructor(e, t, r, o = !1) {
          (this._renderer = e),
            (this.element = t),
            (this.config = r),
            (this._animationForciblyDisabledThroughCss = o),
            (this.state = 3);
        }
        fadeOut() {
          this._renderer.fadeOutRipple(this);
        }
      }
      const T1 = { enterDuration: 225, exitDuration: 150 },
        Yp = Kp({ passive: !0 }),
        I1 = ["mousedown", "touchstart"],
        k1 = ["mouseup", "mouseleave", "touchend", "touchcancel"];
      class S5 {
        constructor(e, t, r, o) {
          (this._target = e),
            (this._ngZone = t),
            (this._isPointerDown = !1),
            (this._activeRipples = new Map()),
            (this._pointerUpEventsRegistered = !1),
            o.isBrowser && (this._containerElement = Ua(r));
        }
        fadeInRipple(e, t, r = {}) {
          const o = (this._containerRect =
              this._containerRect ||
              this._containerElement.getBoundingClientRect()),
            i = { ...T1, ...r.animation };
          r.centered &&
            ((e = o.left + o.width / 2), (t = o.top + o.height / 2));
          const s =
              r.radius ||
              (function A5(n, e, t) {
                const r = Math.max(Math.abs(n - t.left), Math.abs(n - t.right)),
                  o = Math.max(Math.abs(e - t.top), Math.abs(e - t.bottom));
                return Math.sqrt(r * r + o * o);
              })(e, t, o),
            a = e - o.left,
            c = t - o.top,
            l = i.enterDuration,
            u = document.createElement("div");
          u.classList.add("mat-ripple-element"),
            (u.style.left = a - s + "px"),
            (u.style.top = c - s + "px"),
            (u.style.height = 2 * s + "px"),
            (u.style.width = 2 * s + "px"),
            null != r.color && (u.style.backgroundColor = r.color),
            (u.style.transitionDuration = `${l}ms`),
            this._containerElement.appendChild(u);
          const d = window.getComputedStyle(u),
            h = d.transitionDuration,
            p = "none" === d.transitionProperty || "0s" === h || "0s, 0s" === h,
            m = new P5(this, u, r, p);
          (u.style.transform = "scale3d(1, 1, 1)"),
            (m.state = 0),
            r.persistent || (this._mostRecentTransientRipple = m);
          let y = null;
          return (
            !p &&
              (l || i.exitDuration) &&
              this._ngZone.runOutsideAngular(() => {
                const C = () => this._finishRippleTransition(m),
                  O = () => this._destroyRipple(m);
                u.addEventListener("transitionend", C),
                  u.addEventListener("transitioncancel", O),
                  (y = { onTransitionEnd: C, onTransitionCancel: O });
              }),
            this._activeRipples.set(m, y),
            (p || !l) && this._finishRippleTransition(m),
            m
          );
        }
        fadeOutRipple(e) {
          if (2 === e.state || 3 === e.state) return;
          const t = e.element,
            r = { ...T1, ...e.config.animation };
          (t.style.transitionDuration = `${r.exitDuration}ms`),
            (t.style.opacity = "0"),
            (e.state = 2),
            (e._animationForciblyDisabledThroughCss || !r.exitDuration) &&
              this._finishRippleTransition(e);
        }
        fadeOutAll() {
          this._getActiveRipples().forEach((e) => e.fadeOut());
        }
        fadeOutAllNonPersistent() {
          this._getActiveRipples().forEach((e) => {
            e.config.persistent || e.fadeOut();
          });
        }
        setupTriggerEvents(e) {
          const t = Ua(e);
          !t ||
            t === this._triggerElement ||
            (this._removeTriggerEvents(),
            (this._triggerElement = t),
            this._registerEvents(I1));
        }
        handleEvent(e) {
          "mousedown" === e.type
            ? this._onMousedown(e)
            : "touchstart" === e.type
            ? this._onTouchStart(e)
            : this._onPointerUp(),
            this._pointerUpEventsRegistered ||
              (this._registerEvents(k1),
              (this._pointerUpEventsRegistered = !0));
        }
        _finishRippleTransition(e) {
          0 === e.state
            ? this._startFadeOutTransition(e)
            : 2 === e.state && this._destroyRipple(e);
        }
        _startFadeOutTransition(e) {
          const t = e === this._mostRecentTransientRipple,
            { persistent: r } = e.config;
          (e.state = 1), !r && (!t || !this._isPointerDown) && e.fadeOut();
        }
        _destroyRipple(e) {
          const t = this._activeRipples.get(e) ?? null;
          this._activeRipples.delete(e),
            this._activeRipples.size || (this._containerRect = null),
            e === this._mostRecentTransientRipple &&
              (this._mostRecentTransientRipple = null),
            (e.state = 3),
            null !== t &&
              (e.element.removeEventListener(
                "transitionend",
                t.onTransitionEnd
              ),
              e.element.removeEventListener(
                "transitioncancel",
                t.onTransitionCancel
              )),
            e.element.remove();
        }
        _onMousedown(e) {
          const t = M1(e),
            r =
              this._lastTouchStartEvent &&
              Date.now() < this._lastTouchStartEvent + 800;
          !this._target.rippleDisabled &&
            !t &&
            !r &&
            ((this._isPointerDown = !0),
            this.fadeInRipple(e.clientX, e.clientY, this._target.rippleConfig));
        }
        _onTouchStart(e) {
          if (!this._target.rippleDisabled && !D1(e)) {
            (this._lastTouchStartEvent = Date.now()),
              (this._isPointerDown = !0);
            const t = e.changedTouches;
            for (let r = 0; r < t.length; r++)
              this.fadeInRipple(
                t[r].clientX,
                t[r].clientY,
                this._target.rippleConfig
              );
          }
        }
        _onPointerUp() {
          !this._isPointerDown ||
            ((this._isPointerDown = !1),
            this._getActiveRipples().forEach((e) => {
              !e.config.persistent &&
                (1 === e.state ||
                  (e.config.terminateOnPointerUp && 0 === e.state)) &&
                e.fadeOut();
            }));
        }
        _registerEvents(e) {
          this._ngZone.runOutsideAngular(() => {
            e.forEach((t) => {
              this._triggerElement.addEventListener(t, this, Yp);
            });
          });
        }
        _getActiveRipples() {
          return Array.from(this._activeRipples.keys());
        }
        _removeTriggerEvents() {
          this._triggerElement &&
            (I1.forEach((e) => {
              this._triggerElement.removeEventListener(e, this, Yp);
            }),
            this._pointerUpEventsRegistered &&
              k1.forEach((e) => {
                this._triggerElement.removeEventListener(e, this, Yp);
              }));
        }
      }
      const T5 = new F("mat-ripple-global-options");
      let N1 = (() => {
          class n {
            constructor(t, r, o, i, s) {
              (this._elementRef = t),
                (this._animationMode = s),
                (this.radius = 0),
                (this._disabled = !1),
                (this._isInitialized = !1),
                (this._globalOptions = i || {}),
                (this._rippleRenderer = new S5(this, r, t, o));
            }
            get disabled() {
              return this._disabled;
            }
            set disabled(t) {
              t && this.fadeOutAllNonPersistent(),
                (this._disabled = t),
                this._setupTriggerEventsIfEnabled();
            }
            get trigger() {
              return this._trigger || this._elementRef.nativeElement;
            }
            set trigger(t) {
              (this._trigger = t), this._setupTriggerEventsIfEnabled();
            }
            ngOnInit() {
              (this._isInitialized = !0), this._setupTriggerEventsIfEnabled();
            }
            ngOnDestroy() {
              this._rippleRenderer._removeTriggerEvents();
            }
            fadeOutAll() {
              this._rippleRenderer.fadeOutAll();
            }
            fadeOutAllNonPersistent() {
              this._rippleRenderer.fadeOutAllNonPersistent();
            }
            get rippleConfig() {
              return {
                centered: this.centered,
                radius: this.radius,
                color: this.color,
                animation: {
                  ...this._globalOptions.animation,
                  ...("NoopAnimations" === this._animationMode
                    ? { enterDuration: 0, exitDuration: 0 }
                    : {}),
                  ...this.animation,
                },
                terminateOnPointerUp: this._globalOptions.terminateOnPointerUp,
              };
            }
            get rippleDisabled() {
              return this.disabled || !!this._globalOptions.disabled;
            }
            _setupTriggerEventsIfEnabled() {
              !this.disabled &&
                this._isInitialized &&
                this._rippleRenderer.setupTriggerEvents(this.trigger);
            }
            launch(t, r = 0, o) {
              return "number" == typeof t
                ? this._rippleRenderer.fadeInRipple(t, r, {
                    ...this.rippleConfig,
                    ...o,
                  })
                : this._rippleRenderer.fadeInRipple(0, 0, {
                    ...this.rippleConfig,
                    ...t,
                  });
            }
          }
          return (
            (n.ɵfac = function (t) {
              return new (t || n)(w(Ft), w(Ge), w(Va), w(T5, 8), w(tl, 8));
            }),
            (n.ɵdir = G({
              type: n,
              selectors: [
                ["", "mat-ripple", ""],
                ["", "matRipple", ""],
              ],
              hostAttrs: [1, "mat-ripple"],
              hostVars: 2,
              hostBindings: function (t, r) {
                2 & t && Vo("mat-ripple-unbounded", r.unbounded);
              },
              inputs: {
                color: ["matRippleColor", "color"],
                unbounded: ["matRippleUnbounded", "unbounded"],
                centered: ["matRippleCentered", "centered"],
                radius: ["matRippleRadius", "radius"],
                animation: ["matRippleAnimation", "animation"],
                disabled: ["matRippleDisabled", "disabled"],
                trigger: ["matRippleTrigger", "trigger"],
              },
              exportAs: ["matRipple"],
            })),
            n
          );
        })(),
        I5 = (() => {
          class n {}
          return (
            (n.ɵfac = function (t) {
              return new (t || n)();
            }),
            (n.ɵmod = yt({ type: n })),
            (n.ɵinj = ft({ imports: [pu, pu] })),
            n
          );
        })();
      const k5 = ["mat-button", ""],
        N5 = ["*"],
        F5 = [
          "mat-button",
          "mat-flat-button",
          "mat-icon-button",
          "mat-raised-button",
          "mat-stroked-button",
          "mat-mini-fab",
          "mat-fab",
        ],
        L5 = D5(
          M5(
            E5(
              class {
                constructor(n) {
                  this._elementRef = n;
                }
              }
            )
          )
        );
      let R1 = (() => {
          class n extends L5 {
            constructor(t, r, o) {
              super(t),
                (this._focusMonitor = r),
                (this._animationMode = o),
                (this.isRoundButton = this._hasHostAttributes(
                  "mat-fab",
                  "mat-mini-fab"
                )),
                (this.isIconButton =
                  this._hasHostAttributes("mat-icon-button"));
              for (const i of F5)
                this._hasHostAttributes(i) &&
                  this._getHostElement().classList.add(i);
              t.nativeElement.classList.add("mat-button-base"),
                this.isRoundButton && (this.color = "accent");
            }
            ngAfterViewInit() {
              this._focusMonitor.monitor(this._elementRef, !0);
            }
            ngOnDestroy() {
              this._focusMonitor.stopMonitoring(this._elementRef);
            }
            focus(t, r) {
              t
                ? this._focusMonitor.focusVia(this._getHostElement(), t, r)
                : this._getHostElement().focus(r);
            }
            _getHostElement() {
              return this._elementRef.nativeElement;
            }
            _isRippleDisabled() {
              return this.disableRipple || this.disabled;
            }
            _hasHostAttributes(...t) {
              return t.some((r) => this._getHostElement().hasAttribute(r));
            }
          }
          return (
            (n.ɵfac = function (t) {
              return new (t || n)(w(Ft), w(_5), w(tl, 8));
            }),
            (n.ɵcmp = qt({
              type: n,
              selectors: [
                ["button", "mat-button", ""],
                ["button", "mat-raised-button", ""],
                ["button", "mat-icon-button", ""],
                ["button", "mat-fab", ""],
                ["button", "mat-mini-fab", ""],
                ["button", "mat-stroked-button", ""],
                ["button", "mat-flat-button", ""],
              ],
              viewQuery: function (t, r) {
                if (
                  (1 & t &&
                    (function I0(n, e, t) {
                      const r = we();
                      r.firstCreatePass &&
                        (N0(r, new A0(n, e, t), -1),
                        2 == (2 & e) && (r.staticViewQueries = !0)),
                        k0(r, D(), e);
                    })(N1, 5),
                  2 & t)
                ) {
                  let o;
                  qc((o = Kc())) && (r.ripple = o.first);
                }
              },
              hostAttrs: [1, "mat-focus-indicator"],
              hostVars: 5,
              hostBindings: function (t, r) {
                2 & t &&
                  (Jn("disabled", r.disabled || null),
                  Vo(
                    "_mat-animation-noopable",
                    "NoopAnimations" === r._animationMode
                  )("mat-button-disabled", r.disabled));
              },
              inputs: {
                disabled: "disabled",
                disableRipple: "disableRipple",
                color: "color",
              },
              exportAs: ["matButton"],
              features: [Ae],
              attrs: k5,
              ngContentSelectors: N5,
              decls: 4,
              vars: 5,
              consts: [
                [1, "mat-button-wrapper"],
                [
                  "matRipple",
                  "",
                  1,
                  "mat-button-ripple",
                  3,
                  "matRippleDisabled",
                  "matRippleCentered",
                  "matRippleTrigger",
                ],
                [1, "mat-button-focus-overlay"],
              ],
              template: function (t, r) {
                1 & t &&
                  ((function qy(n) {
                    const e = D()[16][6];
                    if (!e.projection) {
                      const r = (e.projection = Ps(n ? n.length : 1, null)),
                        o = r.slice();
                      let i = e.child;
                      for (; null !== i; ) {
                        const s = n ? BS(i, n) : 0;
                        null !== s &&
                          (o[s] ? (o[s].projectionNext = i) : (r[s] = i),
                          (o[s] = i)),
                          (i = i.next);
                      }
                    }
                  })(),
                  _(0, "span", 0),
                  (function Ky(n, e = 0, t) {
                    const r = D(),
                      o = we(),
                      i = Ii(o, 22 + n, 16, null, t || null);
                    null === i.projection && (i.projection = e),
                      Xu(),
                      64 != (64 & i.flags) &&
                        (function tx(n, e, t) {
                          F_(
                            e[11],
                            0,
                            e,
                            t,
                            O_(n, t, e),
                            A_(t.parent || e[6], t, e)
                          );
                        })(o, r, i);
                  })(1),
                  g(),
                  re(2, "span", 1)(3, "span", 2)),
                  2 & t &&
                    (E(2),
                    Vo(
                      "mat-button-ripple-round",
                      r.isRoundButton || r.isIconButton
                    ),
                    L("matRippleDisabled", r._isRippleDisabled())(
                      "matRippleCentered",
                      r.isIconButton
                    )("matRippleTrigger", r._getHostElement()));
              },
              dependencies: [N1],
              styles: [
                ".mat-button .mat-button-focus-overlay,.mat-icon-button .mat-button-focus-overlay{opacity:0}.mat-button:hover:not(.mat-button-disabled) .mat-button-focus-overlay,.mat-stroked-button:hover:not(.mat-button-disabled) .mat-button-focus-overlay{opacity:.04}@media(hover: none){.mat-button:hover:not(.mat-button-disabled) .mat-button-focus-overlay,.mat-stroked-button:hover:not(.mat-button-disabled) .mat-button-focus-overlay{opacity:0}}.mat-button,.mat-icon-button,.mat-stroked-button,.mat-flat-button{box-sizing:border-box;position:relative;-webkit-user-select:none;user-select:none;cursor:pointer;outline:none;border:none;-webkit-tap-highlight-color:rgba(0,0,0,0);display:inline-block;white-space:nowrap;text-decoration:none;vertical-align:baseline;text-align:center;margin:0;min-width:64px;line-height:36px;padding:0 16px;border-radius:4px;overflow:visible}.mat-button::-moz-focus-inner,.mat-icon-button::-moz-focus-inner,.mat-stroked-button::-moz-focus-inner,.mat-flat-button::-moz-focus-inner{border:0}.mat-button.mat-button-disabled,.mat-icon-button.mat-button-disabled,.mat-stroked-button.mat-button-disabled,.mat-flat-button.mat-button-disabled{cursor:default}.mat-button.cdk-keyboard-focused .mat-button-focus-overlay,.mat-button.cdk-program-focused .mat-button-focus-overlay,.mat-icon-button.cdk-keyboard-focused .mat-button-focus-overlay,.mat-icon-button.cdk-program-focused .mat-button-focus-overlay,.mat-stroked-button.cdk-keyboard-focused .mat-button-focus-overlay,.mat-stroked-button.cdk-program-focused .mat-button-focus-overlay,.mat-flat-button.cdk-keyboard-focused .mat-button-focus-overlay,.mat-flat-button.cdk-program-focused .mat-button-focus-overlay{opacity:.12}.mat-button::-moz-focus-inner,.mat-icon-button::-moz-focus-inner,.mat-stroked-button::-moz-focus-inner,.mat-flat-button::-moz-focus-inner{border:0}.mat-raised-button{box-sizing:border-box;position:relative;-webkit-user-select:none;user-select:none;cursor:pointer;outline:none;border:none;-webkit-tap-highlight-color:rgba(0,0,0,0);display:inline-block;white-space:nowrap;text-decoration:none;vertical-align:baseline;text-align:center;margin:0;min-width:64px;line-height:36px;padding:0 16px;border-radius:4px;overflow:visible;transform:translate3d(0, 0, 0);transition:background 400ms cubic-bezier(0.25, 0.8, 0.25, 1),box-shadow 280ms cubic-bezier(0.4, 0, 0.2, 1)}.mat-raised-button::-moz-focus-inner{border:0}.mat-raised-button.mat-button-disabled{cursor:default}.mat-raised-button.cdk-keyboard-focused .mat-button-focus-overlay,.mat-raised-button.cdk-program-focused .mat-button-focus-overlay{opacity:.12}.mat-raised-button::-moz-focus-inner{border:0}.mat-raised-button._mat-animation-noopable{transition:none !important;animation:none !important}.mat-stroked-button{border:1px solid currentColor;padding:0 15px;line-height:34px}.mat-stroked-button .mat-button-ripple.mat-ripple,.mat-stroked-button .mat-button-focus-overlay{top:-1px;left:-1px;right:-1px;bottom:-1px}.mat-fab{box-sizing:border-box;position:relative;-webkit-user-select:none;user-select:none;cursor:pointer;outline:none;border:none;-webkit-tap-highlight-color:rgba(0,0,0,0);display:inline-block;white-space:nowrap;text-decoration:none;vertical-align:baseline;text-align:center;margin:0;min-width:64px;line-height:36px;padding:0 16px;border-radius:4px;overflow:visible;transform:translate3d(0, 0, 0);transition:background 400ms cubic-bezier(0.25, 0.8, 0.25, 1),box-shadow 280ms cubic-bezier(0.4, 0, 0.2, 1);min-width:0;border-radius:50%;width:56px;height:56px;padding:0;flex-shrink:0}.mat-fab::-moz-focus-inner{border:0}.mat-fab.mat-button-disabled{cursor:default}.mat-fab.cdk-keyboard-focused .mat-button-focus-overlay,.mat-fab.cdk-program-focused .mat-button-focus-overlay{opacity:.12}.mat-fab::-moz-focus-inner{border:0}.mat-fab._mat-animation-noopable{transition:none !important;animation:none !important}.mat-fab .mat-button-wrapper{padding:16px 0;display:inline-block;line-height:24px}.mat-mini-fab{box-sizing:border-box;position:relative;-webkit-user-select:none;user-select:none;cursor:pointer;outline:none;border:none;-webkit-tap-highlight-color:rgba(0,0,0,0);display:inline-block;white-space:nowrap;text-decoration:none;vertical-align:baseline;text-align:center;margin:0;min-width:64px;line-height:36px;padding:0 16px;border-radius:4px;overflow:visible;transform:translate3d(0, 0, 0);transition:background 400ms cubic-bezier(0.25, 0.8, 0.25, 1),box-shadow 280ms cubic-bezier(0.4, 0, 0.2, 1);min-width:0;border-radius:50%;width:40px;height:40px;padding:0;flex-shrink:0}.mat-mini-fab::-moz-focus-inner{border:0}.mat-mini-fab.mat-button-disabled{cursor:default}.mat-mini-fab.cdk-keyboard-focused .mat-button-focus-overlay,.mat-mini-fab.cdk-program-focused .mat-button-focus-overlay{opacity:.12}.mat-mini-fab::-moz-focus-inner{border:0}.mat-mini-fab._mat-animation-noopable{transition:none !important;animation:none !important}.mat-mini-fab .mat-button-wrapper{padding:8px 0;display:inline-block;line-height:24px}.mat-icon-button{padding:0;min-width:0;width:40px;height:40px;flex-shrink:0;line-height:40px;border-radius:50%}.mat-icon-button i,.mat-icon-button .mat-icon{line-height:24px}.mat-button-ripple.mat-ripple,.mat-button-focus-overlay{top:0;left:0;right:0;bottom:0;position:absolute;pointer-events:none;border-radius:inherit}.mat-button-ripple.mat-ripple:not(:empty){transform:translateZ(0)}.mat-button-focus-overlay{opacity:0;transition:opacity 200ms cubic-bezier(0.35, 0, 0.25, 1),background-color 200ms cubic-bezier(0.35, 0, 0.25, 1)}._mat-animation-noopable .mat-button-focus-overlay{transition:none}.mat-button-ripple-round{border-radius:50%;z-index:1}.mat-button .mat-button-wrapper>*,.mat-flat-button .mat-button-wrapper>*,.mat-stroked-button .mat-button-wrapper>*,.mat-raised-button .mat-button-wrapper>*,.mat-icon-button .mat-button-wrapper>*,.mat-fab .mat-button-wrapper>*,.mat-mini-fab .mat-button-wrapper>*{vertical-align:middle}.mat-form-field:not(.mat-form-field-appearance-legacy) .mat-form-field-prefix .mat-icon-button,.mat-form-field:not(.mat-form-field-appearance-legacy) .mat-form-field-suffix .mat-icon-button{display:inline-flex;justify-content:center;align-items:center;font-size:inherit;width:2.5em;height:2.5em}.mat-flat-button::before,.mat-raised-button::before,.mat-fab::before,.mat-mini-fab::before{margin:calc(calc(var(--mat-focus-indicator-border-width, 3px) + 2px) * -1)}.mat-stroked-button::before{margin:calc(calc(var(--mat-focus-indicator-border-width, 3px) + 3px) * -1)}.cdk-high-contrast-active .mat-button,.cdk-high-contrast-active .mat-flat-button,.cdk-high-contrast-active .mat-raised-button,.cdk-high-contrast-active .mat-icon-button,.cdk-high-contrast-active .mat-fab,.cdk-high-contrast-active .mat-mini-fab{outline:solid 1px}",
              ],
              encapsulation: 2,
              changeDetection: 0,
            })),
            n
          );
        })(),
        V5 = (() => {
          class n {}
          return (
            (n.ɵfac = function (t) {
              return new (t || n)();
            }),
            (n.ɵmod = yt({ type: n })),
            (n.ɵinj = ft({ imports: [I5, pu, pu] })),
            n
          );
        })(),
        F1 = (() => {
          class n {
            transform(t, r) {
              return r && t ? n.filter(t, r) : t;
            }
            static filter(t, r) {
              const o = r.toLowerCase();
              function i(s, a) {
                for (let c in s)
                  if (
                    null !== s[c] &&
                    null != s[c] &&
                    (("object" == typeof s[c] && i(s[c], a)) ||
                      s[c].toString().toLowerCase().includes(o))
                  )
                    return !0;
                return !1;
              }
              return t.filter(function (s) {
                return i(s, r);
              });
            }
          }
          return (
            (n.ɵfac = function (t) {
              return new (t || n)();
            }),
            (n.ɵpipe = It({ name: "filter", type: n, pure: !1 })),
            (n.ɵprov = R({ token: n, factory: n.ɵfac })),
            n
          );
        })(),
        B5 = (() => {
          class n {}
          return (
            (n.ɵfac = function (t) {
              return new (t || n)();
            }),
            (n.ɵmod = yt({ type: n })),
            (n.ɵinj = ft({})),
            n
          );
        })(),
        j5 = (() => {
          class n {
            transform(t, r) {
              let o;
              const i = ["K", "M", "B", "T", "P", "E"],
                s = t < 0;
              return Number.isNaN(t) ||
                (t < 1e3 && t >= 0) ||
                !this.isNumeric(t) ||
                (t < 0 && t > -1e3)
                ? !r || !this.isNumeric(t) || t < 0 || 0 == t
                  ? t
                  : t.toFixed(r)
                : s
                ? ((t *= -1),
                  (o = Math.floor(Math.log(t) / Math.log(1e3))),
                  ((-1 * t) / Math.pow(1e3, o)).toFixed(r) + i[o - 1])
                : ((o = Math.floor(Math.log(t) / Math.log(1e3))),
                  (t / Math.pow(1e3, o)).toFixed(r) + i[o - 1]);
            }
            isNumeric(t) {
              return (
                t < 0 && (t *= -1),
                !!/^-{0,1}\d+$/.test(t) || !!/^\d+\.\d+$/.test(t)
              );
            }
          }
          return (
            (n.ɵfac = function (t) {
              return new (t || n)();
            }),
            (n.ɵpipe = It({ name: "numberSuffix", type: n, pure: !0 })),
            n
          );
        })();
      function U5(n, e) {
        if (1 & n) {
          const t = bn();
          ve(0),
            _(1, "tr", 18)(2, "td", 19),
            re(3, "i", 20),
            g(),
            _(4, "td"),
            v(5),
            g(),
            _(6, "td", 6)(7, "div", 21),
            re(8, "img", 22),
            _(9, "div", 23)(10, "p"),
            v(11),
            g(),
            _(12, "p", 24),
            v(13),
            g()()()(),
            _(14, "td"),
            v(15),
            Xe(16, "number"),
            g(),
            _(17, "td", 25),
            v(18),
            Xe(19, "number"),
            g(),
            _(20, "td"),
            v(21),
            Xe(22, "numberSuffix"),
            g(),
            _(23, "td", 19),
            v(24),
            Xe(25, "numberSuffix"),
            g(),
            _(26, "td", 26),
            id(),
            _(27, "svg"),
            re(28, "polyline", 27),
            g()(),
            sd(),
            _(29, "td")(30, "button", 28),
            me("click", function () {
              Ot(t);
              const o = ie().$implicit;
              return Pt(ie(2).getCoin(o.name, o.current_price, o.image));
            }),
            v(31, " Trade "),
            g()()(),
            Ce();
        }
        if (2 & n) {
          const t = ie(),
            r = t.index,
            o = t.$implicit;
          E(5),
            Je(r + 1),
            E(3),
            L("src", o.image, sn),
            E(3),
            Je(o.name),
            E(2),
            Je(o.symbol),
            E(2),
            Xt("$", Ln(16, 10, o.current_price, "1.2-2"), ""),
            E(2),
            L("ngClass", o.price_change_percentage_24h > 0 ? "high" : "low"),
            E(1),
            Xt(" ", Ln(19, 13, o.price_change_percentage_24h, "1.2-2"), "% "),
            E(3),
            Xt("$", Ln(22, 16, o.total_volume, 2), ""),
            E(3),
            Xt(" $", Ln(25, 19, o.market_cap, 2), " "),
            E(4),
            L(
              "ngClass",
              o.market_cap_change_percentage_24h > 0 ? "high" : "low"
            );
        }
      }
      function $5(n, e) {
        if (
          (1 & n && (ve(0), ne(1, U5, 32, 22, "ng-container", 1), Ce()), 2 & n)
        ) {
          const t = e.index,
            r = ie(2);
          E(1), L("ngIf", t >= r.pageIndex - 10 && t < r.pageIndex);
        }
      }
      function H5(n, e) {
        if (1 & n) {
          const t = bn();
          ve(0),
            _(1, "div", 2)(2, "h1"),
            v(3, "Today's Cryptocurrency Prices"),
            g(),
            _(4, "input", 3),
            me("ngModelChange", function (o) {
              return Ot(t), Pt((ie().filterTerm = o));
            }),
            g(),
            _(5, "table")(6, "tr"),
            re(7, "th", 4),
            _(8, "th", 5),
            v(9, "#"),
            g(),
            _(10, "th", 6),
            v(11, "Name"),
            g(),
            _(12, "th", 7),
            v(13, "Price"),
            g(),
            _(14, "th", 8),
            v(15, "24H CHANGE"),
            g(),
            _(16, "th", 9),
            v(17, "24H VOLUME"),
            g(),
            _(18, "th", 10),
            v(19, "MARKET CUP"),
            g(),
            _(20, "th", 11),
            v(21, "CHART"),
            g(),
            re(22, "th", 12),
            g(),
            ne(23, $5, 2, 1, "ng-container", 13),
            Xe(24, "filter"),
            g(),
            _(25, "div", 14)(26, "p"),
            v(27),
            g(),
            _(28, "button", 15),
            me("click", function () {
              return Ot(t), Pt(ie().onClickLeft());
            }),
            re(29, "i", 16),
            g(),
            _(30, "button", 15),
            me("click", function () {
              return Ot(t), Pt(ie().onClickRight());
            }),
            re(31, "i", 17),
            g()()(),
            Ce();
        }
        if (2 & n) {
          const t = ie();
          E(4),
            L("ngModel", t.filterTerm),
            E(19),
            L("ngForOf", Ln(24, 3, t.coins, t.filterTerm)),
            E(4),
            Xt("Page ", t.pageSize, " of 10");
        }
      }
      function z5(n, e) {
        1 & n && (_(0, "p", 38), v(1, "You don't have enough money"), g());
      }
      function G5(n, e) {
        1 & n && (_(0, "p", 39), v(1, "Exchanged Successfully"), g());
      }
      function W5(n, e) {
        if (1 & n) {
          const t = bn();
          ve(0),
            _(1, "div", 29)(2, "div", 30)(3, "form", 31)(4, "label"),
            re(5, "img", 22),
            _(6, "p"),
            v(7),
            g(),
            re(8, "input", 32),
            g(),
            _(9, "label")(10, "p"),
            v(11, "USD"),
            g(),
            re(12, "input", 33),
            g()(),
            ne(13, z5, 2, 0, "p", 34),
            ne(14, G5, 2, 0, "p", 35),
            _(15, "button", 36),
            me("click", function () {
              return Ot(t), Pt(ie().ecxhangeNow());
            }),
            v(16, "EXCHANGE NOW"),
            g(),
            _(17, "div", 37)(18, "button", 28),
            me("click", function () {
              return Ot(t), Pt(ie().closeTradeWindow());
            }),
            v(19, "X"),
            g()()()(),
            Ce();
        }
        if (2 & n) {
          const t = ie();
          E(3),
            L("formGroup", t.exchanges),
            E(2),
            L("src", t.coinsimg, sn),
            E(2),
            Je(t.coinsname),
            E(6),
            L("ngIf", t.notEnoughMoney),
            E(1),
            L("ngIf", t.successMsg);
        }
      }
      let q5 = (() => {
        class n {
          constructor(t, r, o, i) {
            (this.priceService = t),
              (this.database = r),
              (this.tokenService = o),
              (this.router = i),
              (this.exchanges = new Kr({
                coin: new wn(null, { nonNullable: !0 }),
                currency: new wn(null, { nonNullable: !0 }),
              })),
              (this.pageIndex = 10),
              (this.pageSize = 1),
              (this.isLogged$ = new $e(!1)),
              (this.showTradeWindow = !1),
              (this.coinsname = ""),
              (this.coinsimg = ""),
              (this.balance = new $e({})),
              (this.notEnoughMoney = !1),
              (this.successMsg = !1);
          }
          ngOnDestroy() {}
          ngOnInit() {
            this.priceService.getCurrency().subscribe((t) => {
              this.coins = t;
            }),
              this.registerValueChanges(),
              (this.balance = this.database.balance),
              (this.isLogged$ = this.database.isLogged$);
          }
          onClickLeft() {
            this.pageIndex >= 20 && ((this.pageIndex -= 10), this.pageSize--);
          }
          onClickRight() {
            this.pageIndex < 100 && ((this.pageIndex += 10), this.pageSize++);
          }
          closeTradeWindow() {
            this.exchanges.reset(), (this.showTradeWindow = !1);
          }
          getCoin(t, r, o) {
            this.isLogged$.getValue()
              ? ((this.showTradeWindow = !0),
                (this.coinsname = t),
                (this.coinsimg = o),
                (this.price = r))
              : this.router.navigateByUrl("/signin");
          }
          registerValueChanges() {
            this.exchanges
              .get("coin")
              ?.valueChanges.pipe(
                La(200),
                He((t) => {
                  if (t) {
                    let r = t * this.price;
                    this.exchanges
                      .get("currency")
                      ?.setValue(r.toFixed(4), { emitEvent: !1 });
                  }
                })
              )
              .subscribe(),
              this.exchanges
                .get("currency")
                ?.valueChanges.pipe(
                  La(400),
                  He((t) => {
                    if (t) {
                      let r = t / this.price;
                      this.exchanges
                        .get("coin")
                        ?.setValue(r.toFixed(4), { emitEvent: !1 });
                    }
                  })
                )
                .subscribe();
          }
          ecxhangeNow() {
            if (
              this.balance.getValue().balance >=
              this.exchanges.get("currency")?.value
            ) {
              let t = this.saveBalance();
              this.database
                .updateBalance(t)
                .pipe(
                  He(() => {
                    this.updateUser(t),
                      (this.successMsg = !0),
                      setTimeout(() => {
                        (this.successMsg = !1),
                          (this.showTradeWindow = !1),
                          this.exchanges.reset();
                      }, 1300);
                  })
                )
                .subscribe();
            } else
              (this.notEnoughMoney = !0),
                setTimeout(() => {
                  this.notEnoughMoney = !1;
                }, 3e3);
          }
          saveBalance() {
            let t = this.balance.getValue();
            return (
              t.coinBase
                ? t.coinBase[this.coinsname]
                  ? (t.coinBase[`${this.coinsname}`] +=
                      this.exchanges.get("coin")?.value)
                  : (t.coinBase[`${this.coinsname}`] =
                      this.exchanges.get("coin")?.value)
                : ((t.coinBase = {}),
                  (t.coinBase[`${this.coinsname}`] =
                    this.exchanges.get("coin")?.value)),
              (t.balance -= this.exchanges.get("currency")?.value),
              t
            );
          }
          updateUser(t) {
            let r = this.tokenService.getUser();
            (r.balance = t),
              this.tokenService.saveUser(r),
              this.database.user$.next(r);
          }
        }
        return (
          (n.ɵfac = function (t) {
            return new (t || n)(w(Wp), w(eo), w(uu), w(Ye));
          }),
          (n.ɵcmp = qt({
            type: n,
            selectors: [["app-price-dashboard"]],
            decls: 3,
            vars: 2,
            consts: [
              [1, "wrapper"],
              [4, "ngIf"],
              [1, "content"],
              [
                "type",
                "text",
                "placeholder",
                "Search...",
                1,
                "form-control",
                3,
                "ngModel",
                "ngModelChange",
              ],
              ["id", "not-for-mobile", 1, "th1"],
              [1, "th2"],
              [1, "th3"],
              [1, "th4"],
              [1, "th5"],
              [1, "th6"],
              ["id", "not-for-mobile", 1, "th7"],
              ["id", "not-for-mobile", 1, "th8"],
              [1, "th9"],
              [4, "ngFor", "ngForOf"],
              [1, "paginator"],
              ["mat-button", "", 3, "click"],
              [1, "fa-solid", "fa-chevron-left"],
              [1, "fa-solid", "fa-chevron-right"],
              [1, "detail-rows"],
              ["id", "not-for-mobile"],
              [1, "far", "fa-star"],
              [1, "info"],
              ["alt", "", 3, "src"],
              [1, "coins"],
              [1, "symbol"],
              [1, "percent", 3, "ngClass"],
              ["id", "not-for-mobile", 1, "chart"],
              [
                "stroke-linecap",
                "round",
                "stroke-width",
                "1.4",
                "fill",
                "none",
                "points",
                "0,24.240410442231887 0.9668874172185431,21.125403406446956 1.9337748344370862,21.144730916110014 2.9006622516556293,25.023248295602333 3.8675496688741724,22.37959197749935 4.8344370860927155,20.909875895728398 5.801324503311259,23.262290356935807 6.768211920529802,21.158362185704302 7.735099337748345,21.84809086494254 8.701986754966889,19.308808107806627 9.668874172185431,19.82029197891887 10.635761589403973,21.244404981670563 11.602649006622517,21.632384185693756 12.569536423841061,20.134289260125875 13.536423841059603,20.315735208736196 14.503311258278146,20.269442621103977 15.47019867549669,16.275815377654382 16.437086092715234,12.362931827628628 17.403973509933778,10.949687281992151 18.370860927152318,10.014072652519264 19.337748344370862,11.191902456360523 20.304635761589406,12.432758997529923 21.271523178807946,12.407576954504048 22.23841059602649,11.354100148628827 23.205298013245034,6.485176513133869 24.17218543046358,9.629538882494003 25.139072847682122,8.093567031346225 26.105960264900663,9.06672890147668 27.072847682119207,9.145814021295934 28.03973509933775,11.09550267931268 29.00662251655629,10.192710899876232 29.973509933774835,8.561483159768567 30.94039735099338,9.072525329114942 31.907284768211923,9.00884744375 32.87417218543047,9.150000691295133 33.84105960264901,9.261045409980653 34.807947019867555,8.787204125892291 35.77483443708609,6.544777402375772 36.741721854304636,6.104344242413518 37.70860927152318,6.72343050440476 38.675496688741724,7.157367958624953 39.64238410596027,8.5544800922776 40.60927152317881,9.221612769828006 41.576158940397356,8.603854187565744 42.54304635761589,8.008439563310464 43.50993377483444,7.745866175606029 44.47682119205298,8.444911578422925 45.443708609271525,8.930472640888183 46.41059602649007,8.86853109507408 47.37748344370861,8.481065596515016 48.34437086092716,9.003454254335015 49.3112582781457,6.768290508600323 50.278145695364245,5.86949090305637 51.24503311258278,6.411930155504923 52.211920529801326,2.5651982552386663 53.17880794701987,0 54.145695364238414,0.5842352896784568 55.11258278145696,2.43376439292188 56.0794701986755,3.210822493037057 57.046357615894046,2.1270978044872386 58.01324503311258,3.20555062099249 58.980132450331126,2.4551668053226017 59.94701986754967,3.352310116705233 60.913907284768214,3.3442950624500227 61.88079470198676,3.049133368792443 62.8476821192053,3.2215914499535785 63.814569536423846,1.4255958819604082 64.78145695364239,0.8431252215861775 65.74834437086093,2.0756161886481017 66.71523178807948,2.849033826744165 67.68211920529802,1.3220688426170675 68.64900662251657,1.6524595797393644 69.61589403973511,1.0774597365105691 70.58278145695364,2.591257966911243 71.54966887417218,3.9761203468139996 72.51655629139073,3.488889361084343 73.48344370860927,4.6989263034399364 74.45033112582782,2.2916313121737133 75.41721854304636,6.66501027430667 76.3841059602649,5.457967463848259 77.35099337748345,6.49622459807221 78.31788079470199,7.512267347426285 79.28476821192054,7.996279241926498 80.25165562913908,6.928766405686126 81.21854304635762,4.512498434815829 82.18543046357617,4.045683552213816 83.15231788079471,4.548618251919024 84.11920529801326,5.47914741730165 85.08609271523179,5.082952722770713 86.05298013245033,4.9404956537762175 87.01986754966887,5.428627355943291 87.98675496688742,8.897112194632502 88.95364238410596,9.416798350079347 89.9205298013245,7.665013393121985 90.88741721854305,7.684837255847377 91.8543046357616,8.119100822135739 92.82119205298014,10.292913221676784 93.78807947019868,9.98324512798937 94.75496688741723,10.619804444598461 95.72185430463577,14.805278906980167 96.68874172185431,13.42202104632041 97.65562913907286,12.22294958464851 98.6225165562914,9.565216529622013 99.58940397350995,9.80318365673709 100.55629139072849,8.61251379741785 101.52317880794702,11.252988630223232 102.49006622516556,9.625840892725275 103.45695364238411,8.898064763350124 104.42384105960265,6.830247250948467 105.3907284768212,6.34995849200147 106.35761589403974,21.889854761159334 107.32450331125828,25.689800219599956 108.29139072847683,27.753491362527313 109.25827814569537,26.262413820989533 110.22516556291392,23.381090828830143 111.19205298013246,24.647980230213918 112.158940397351,27.695088751854964 113.12582781456955,23.722973060780753 114.09271523178809,29.204477650780447 115.05960264900664,27.997938305857446 116.02649006622516,30 116.99337748344371,29.682162842842526 117.96026490066225,27.87229399934386 118.9271523178808,25.295925680641083 119.89403973509934,26.110844084022567 120.86092715231788,24.436056580595295 121.82781456953643,25.68457725444526 122.79470198675497,24.633505068263858 123.76158940397352,25.88713301243999 124.72847682119206,26.110185624866997 125.6953642384106,25.902674200930623 126.66225165562915,27.308034709852958 127.62913907284769,25.462768636160064 128.59602649006624,27.987669321060345 129.56291390728478,26.42669759234134 130.52980132450332,27.445633791452657 131.49668874172187,27.795716170307724 132.4635761589404,29.19715315362621 133.43046357615896,26.682759740469614 134.3973509933775,26.956561460719367 135.36423841059604,23.717604946227056 136.3311258278146,21.927735620140183 137.29801324503313,21.99087985569293 138.26490066225168,23.220987943970144 139.23178807947022,23.708753301938543 140.19867549668874,25.485301921446894 141.16556291390728,26.60787012593784 142.13245033112582,27.180161675873073 143.09933774834437,20.94813871182239 144.0662251655629,25.19157276524429 145.03311258278146,27.989042696698718",
                3,
                "ngClass",
              ],
              [3, "click"],
              [1, "tradewrapper"],
              [1, "tradewindow"],
              [3, "formGroup"],
              [
                "type",
                "number",
                "formControlName",
                "coin",
                "placeholder",
                "Enter Amount of Value",
              ],
              [
                "type",
                "number",
                "formControlName",
                "currency",
                "placeholder",
                "Enter Amount of Value",
              ],
              ["class", "error", 4, "ngIf"],
              ["class", "success", 4, "ngIf"],
              [1, "buy", 3, "click"],
              [1, "close-btn"],
              [1, "error"],
              [1, "success"],
            ],
            template: function (t, r) {
              1 & t &&
                (_(0, "div", 0),
                ne(1, H5, 32, 6, "ng-container", 1),
                ne(2, W5, 20, 5, "ng-container", 1),
                g()),
                2 & t &&
                  (E(1),
                  L("ngIf", null == r.coins ? null : r.coins.length),
                  E(1),
                  L("ngIf", r.showTradeWindow));
            },
            dependencies: [
              la,
              ho,
              Cr,
              R1,
              va,
              Go,
              Nl,
              ha,
              pa,
              ep,
              Wo,
              Yi,
              yl,
              F1,
              j5,
            ],
            styles: [
              ".wrapper[_ngcontent-%COMP%]{display:flex;align-items:center;flex-direction:column;margin-top:130px;width:100%;color:#0b1426}.wrapper[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]{position:relative;width:80%}.wrapper[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]{width:40%;margin-top:3px;margin-bottom:10px;border-radius:10px;display:block;padding:.375rem .75rem;font-size:1rem;line-height:1.5;color:#495057;background-color:#fcfcfc;background-clip:padding-box;border:1px solid #ced4da;border-radius:.25rem;transition:.2s}.wrapper[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]:focus{border:1.5px solid #007bff;box-shadow:0 0 5px #007bff;outline:none}.wrapper[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%]{margin-bottom:15px;font-size:24px;font-weight:500;letter-spacing:.8px;width:90%}.wrapper[_ngcontent-%COMP%]   table[_ngcontent-%COMP%]{width:100%;background-color:#fff;text-indent:initial;border-spacing:2px;font-size:14px;font-weight:500}.wrapper[_ngcontent-%COMP%]   table[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]{color:#fff;background-color:#1199fa;cursor:pointer;border:1px solid transparent;font-weight:700;outline:2px solid transparent;outline-offset:2px;line-height:1.2;padding:5px 16px;border-radius:30px}.wrapper[_ngcontent-%COMP%]   table[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]:hover{background-color:#36a4f3}.wrapper[_ngcontent-%COMP%]   table[_ngcontent-%COMP%]   .info[_ngcontent-%COMP%]{display:flex;justify-content:space-between;font-weight:500}.wrapper[_ngcontent-%COMP%]   table[_ngcontent-%COMP%]   .info[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{width:24px;height:24px;margin-right:8px}.wrapper[_ngcontent-%COMP%]   table[_ngcontent-%COMP%]   .info[_ngcontent-%COMP%]   .symbol[_ngcontent-%COMP%]{color:#5d667b;text-transform:uppercase}.wrapper[_ngcontent-%COMP%]   table[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]{width:100%;height:42.5px;display:grid;grid-template-columns:repeat(2,.5fr) 1.2fr repeat(6,1fr);place-items:center;border-bottom:1px solid #c9cfdd}.wrapper[_ngcontent-%COMP%]   table[_ngcontent-%COMP%]   tr.detail-rows[_ngcontent-%COMP%]{cursor:pointer;height:68.2px}.wrapper[_ngcontent-%COMP%]   table[_ngcontent-%COMP%]   tr.detail-rows[_ngcontent-%COMP%]:hover{background-color:#1199fa1f}.wrapper[_ngcontent-%COMP%]   table[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]   td.percent[_ngcontent-%COMP%]{font-weight:700}.wrapper[_ngcontent-%COMP%]   table[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]   td.percent.low[_ngcontent-%COMP%]{color:#e64b60}.wrapper[_ngcontent-%COMP%]   table[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]   td.percent.high[_ngcontent-%COMP%]{color:#20bca4}.wrapper[_ngcontent-%COMP%]   table[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]   td.chart[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%]{width:146px;height:30px}.wrapper[_ngcontent-%COMP%]   table[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]   td.chart[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%]   .low[_ngcontent-%COMP%]{stroke:#e64b60}.wrapper[_ngcontent-%COMP%]   table[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]   td.chart[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%]   .high[_ngcontent-%COMP%]{stroke:#20bca4}.wrapper[_ngcontent-%COMP%]   table[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]   th[_ngcontent-%COMP%]{text-transform:uppercase;font-size:12px;font-weight:500;color:#0b1426}.wrapper[_ngcontent-%COMP%]   table[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]   th.th3[_ngcontent-%COMP%]{letter-spacing:2px}.wrapper[_ngcontent-%COMP%]   table[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]   .th3[_ngcontent-%COMP%]{justify-self:start}.paginator[_ngcontent-%COMP%]{height:68px;display:flex;justify-content:flex-end;align-items:center;border-bottom:1px solid #c9cfdd;margin-bottom:20px}.tradewrapper[_ngcontent-%COMP%]{padding:15px;background-color:transparent;position:fixed;top:0;left:0;width:100%;height:100%;display:flex;justify-content:center;align-items:center;background-color:#000000b3}.tradewrapper[_ngcontent-%COMP%]   .tradewindow[_ngcontent-%COMP%]{display:flex;flex-direction:column;align-items:center;justify-content:center;padding:10px;position:relative;border-radius:10px;background-color:#0b1429;width:500px;height:400px}.tradewrapper[_ngcontent-%COMP%]   .tradewindow[_ngcontent-%COMP%]   .error[_ngcontent-%COMP%]{font-size:14px;color:#b40046;margin-bottom:1px;line-height:8px}.tradewrapper[_ngcontent-%COMP%]   .tradewindow[_ngcontent-%COMP%]   .success[_ngcontent-%COMP%]{font-size:15px;color:green;margin-bottom:1px;line-height:8px;font-weight:500}.tradewrapper[_ngcontent-%COMP%]   .tradewindow[_ngcontent-%COMP%]   form[_ngcontent-%COMP%]{display:flex;flex-direction:column}.tradewrapper[_ngcontent-%COMP%]   .tradewindow[_ngcontent-%COMP%]   form[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{width:45px;height:45px}.tradewrapper[_ngcontent-%COMP%]   .tradewindow[_ngcontent-%COMP%]   form[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{text-transform:uppercase;color:#fff;font-size:15px;margin-bottom:8px;text-align:center;letter-spacing:.02rem;font-weight:500}.tradewrapper[_ngcontent-%COMP%]   .tradewindow[_ngcontent-%COMP%]   form[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]{margin-bottom:24px;width:362px;height:40px;padding:16px;font-size:15px;line-height:24px;font-weight:400px;color:#b5b0b0;border:1px solid rgba(193,196,201,.36);border-radius:8px;background-color:#060b18;transition:ease .2s}.tradewrapper[_ngcontent-%COMP%]   .tradewindow[_ngcontent-%COMP%]   form[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]:focus{border-color:#0058aa;outline:none;box-shadow:0 0 5px #0058aa;background-color:#060b12;opacity:.92}.tradewrapper[_ngcontent-%COMP%]   .tradewindow[_ngcontent-%COMP%]   form[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]:hover{background-color:#060b12;opacity:.98}.tradewrapper[_ngcontent-%COMP%]   .tradewindow[_ngcontent-%COMP%]   .close-btn[_ngcontent-%COMP%]{z-index:4;position:absolute;top:4%;right:3%}.tradewrapper[_ngcontent-%COMP%]   .tradewindow[_ngcontent-%COMP%]   .close-btn[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]{cursor:pointer;font-size:15px;font-weight:700;height:20px;width:23px}.tradewrapper[_ngcontent-%COMP%]   .tradewindow[_ngcontent-%COMP%]   .buy[_ngcontent-%COMP%]{font-size:13px;letter-spacing:-.02em;font-weight:600;margin:29px 0 0;height:35px;width:120px;border-radius:4px;color:#0d6efd;border-color:#0d6efd;cursor:pointer;border:1px solid;background-color:transparent;transition:color .15s ease-in-out,background-color .15s ease-in-out,border-color .15s ease-in-out}.tradewrapper[_ngcontent-%COMP%]   .tradewindow[_ngcontent-%COMP%]   .buy[_ngcontent-%COMP%]:hover{background-color:#0d6efd;border-color:transparent;color:#f4f4f4}@media screen and (min-width: 768px) and (max-width: 1128px){.wrapper[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]{width:95%}}@media screen and (min-width: 350px) and (max-width: 767px){.wrapper[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]{width:98%}.wrapper[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]{width:60%}.wrapper[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%]{font-size:18px}.wrapper[_ngcontent-%COMP%]   table[_ngcontent-%COMP%]{width:100%;font-size:12px}.wrapper[_ngcontent-%COMP%]   table[_ngcontent-%COMP%]   #not-for-mobile[_ngcontent-%COMP%]{display:none}.wrapper[_ngcontent-%COMP%]   table[_ngcontent-%COMP%]   .info[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{width:16px;height:16px;margin-right:6px}.wrapper[_ngcontent-%COMP%]   table[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]{grid-template-columns:.4fr 1.5fr repeat(3,1.4fr) 1.5fr}.wrapper[_ngcontent-%COMP%]   table[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]   th[_ngcontent-%COMP%], .wrapper[_ngcontent-%COMP%]   table[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{font-size:11px}.wrapper[_ngcontent-%COMP%]   table[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]   .symbol[_ngcontent-%COMP%]{font-size:10px}.tradewrapper[_ngcontent-%COMP%]   .tradewindow[_ngcontent-%COMP%]{border-radius:5px;width:100%;max-width:380px;height:400px;margin-top:50px}.tradewrapper[_ngcontent-%COMP%]   .tradewindow[_ngcontent-%COMP%]   form[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]{margin-bottom:24px;width:250px;height:40px}}",
            ],
          })),
          n
        );
      })();
      function K5(n, e) {
        if (1 & n) {
          const t = bn();
          ve(0),
            _(1, "tr")(2, "td"),
            v(3),
            g(),
            _(4, "td"),
            v(5),
            Xe(6, "number"),
            g(),
            _(7, "td")(8, "button", 11),
            me("click", function () {
              Ot(t);
              const o = ie().$implicit;
              return Pt(ie(3).onSell(o));
            }),
            v(9, "Sell"),
            g()()(),
            Ce();
        }
        if (2 & n) {
          const t = ie().$implicit,
            r = ie(2).ngIf;
          E(3), Je(t), E(2), Je(Ln(6, 2, r.balance.coinBase[t], "1.2-2"));
        }
      }
      function Q5(n, e) {
        if (
          (1 & n && (ve(0), ne(1, K5, 10, 5, "ng-container", 1), Ce()), 2 & n)
        ) {
          const t = e.index,
            r = ie(3);
          E(1), L("ngIf", t >= r.pageIndex - 5 && t < r.pageIndex);
        }
      }
      function Z5(n, e) {
        if (1 & n) {
          const t = bn();
          ve(0),
            _(1, "h4"),
            v(2, "my wallet"),
            g(),
            _(3, "table")(4, "tr")(5, "th"),
            v(6, "Coin Names"),
            g(),
            _(7, "th"),
            v(8, "Amount"),
            g(),
            _(9, "th"),
            v(10, "sell"),
            g()(),
            ne(11, Q5, 2, 1, "ng-container", 6),
            Xe(12, "filter"),
            g(),
            _(13, "div", 7)(14, "p"),
            v(15),
            g(),
            _(16, "button", 8),
            me("click", function () {
              return Ot(t), Pt(ie(2).onClickLeft());
            }),
            re(17, "i", 9),
            g(),
            _(18, "button", 8),
            me("click", function () {
              return Ot(t), Pt(ie(2).onClickRight());
            }),
            re(19, "i", 10),
            g()(),
            Ce();
        }
        if (2 & n) {
          const t = ie(2);
          E(11),
            L("ngForOf", Ln(12, 2, t.coinNames, t.filterTerm)),
            E(4),
            Xt("Page ", t.pageSize, " of 20");
        }
      }
      function Y5(n, e) {
        if (
          (1 & n &&
            (ve(0),
            _(1, "div", 2)(2, "div", 3)(3, "h1"),
            v(4),
            g()(),
            _(5, "div", 4)(6, "span"),
            v(7, "$"),
            g(),
            _(8, "h1"),
            v(9),
            Xe(10, "number"),
            g()(),
            _(11, "p"),
            v(12, "Total Balance"),
            g()(),
            _(13, "div", 5),
            ne(14, Z5, 20, 5, "ng-container", 1),
            g(),
            Ce()),
          2 & n)
        ) {
          const t = e.ngIf,
            r = ie();
          E(4),
            Ff(" ", t.fullname.firstname, " \xa0", t.fullname.lastname, " "),
            E(5),
            Je(Ln(10, 4, t.balance.balance, "1.2-2")),
            E(5),
            L("ngIf", r.coinNames.length);
        }
      }
      function J5(n, e) {
        1 & n && (_(0, "p", 21), v(1, "You don't have enough coin"), g());
      }
      function X5(n, e) {
        1 & n && (_(0, "p", 22), v(1, "Exchanged Successfully"), g());
      }
      function e8(n, e) {
        if (1 & n) {
          const t = bn();
          ve(0),
            _(1, "div", 12)(2, "div", 13)(3, "form", 14)(4, "label")(5, "p"),
            v(6),
            g(),
            re(7, "input", 15),
            g(),
            _(8, "label")(9, "p"),
            v(10, "USD"),
            g(),
            re(11, "input", 16),
            g()(),
            ne(12, J5, 2, 0, "p", 17),
            ne(13, X5, 2, 0, "p", 18),
            _(14, "button", 19),
            me("click", function () {
              return Ot(t), Pt(ie().ecxhangeNow());
            }),
            v(15, "EXCHANGE NOW"),
            g(),
            _(16, "div", 20)(17, "button", 11),
            me("click", function () {
              return Ot(t), Pt(ie().closeTradeWindow());
            }),
            v(18, "X"),
            g()()()(),
            Ce();
        }
        if (2 & n) {
          const t = ie();
          E(3),
            L("formGroup", t.exchanges),
            E(3),
            Je(t.coinsname),
            E(6),
            L("ngIf", t.notEnoughMoney),
            E(1),
            L("ngIf", t.successMsg);
        }
      }
      let t8 = (() => {
        class n {
          constructor(t, r, o) {
            (this.databaseService = t),
              (this.tokenService = r),
              (this.priceService = o),
              (this.exchanges = new Kr({
                coin: new wn(null, { nonNullable: !0 }),
                currency: new wn(null, { nonNullable: !0 }),
              })),
              (this.user$ = new $e({})),
              (this.coinsname = ""),
              (this.localId = new $e("")),
              (this.balance = new $e({})),
              (this.allCoinsPrice = []),
              (this.showTradeWindow = !1),
              (this.notEnoughMoney = !1),
              (this.successMsg = !1),
              (this.coinNames = []),
              (this.pageIndex = 5),
              (this.pageSize = 1);
          }
          closeTradeWindow() {
            this.exchanges.reset(), (this.showTradeWindow = !1);
          }
          registerValueChanges() {
            this.exchanges
              .get("coin")
              ?.valueChanges.pipe(
                La(200),
                He((t) => {
                  if (t) {
                    let r = t * this.price;
                    this.exchanges
                      .get("currency")
                      ?.setValue(r.toFixed(4), { emitEvent: !1 });
                  }
                })
              )
              .subscribe(),
              this.exchanges
                .get("currency")
                ?.valueChanges.pipe(
                  La(400),
                  He((t) => {
                    if (t) {
                      let r = t / this.price;
                      this.exchanges
                        .get("coin")
                        ?.setValue(r.toFixed(4), { emitEvent: !1 });
                    }
                  })
                )
                .subscribe();
          }
          ecxhangeNow() {
            if (
              this.balance.getValue().coinBase[this.coinsname] >=
              this.exchanges.get("coin")?.value
            ) {
              let t = this.saveBalance();
              this.databaseService
                .updateBalance(t)
                .pipe(
                  He(() => {
                    this.updateUser(t),
                      (this.successMsg = !0),
                      setTimeout(() => {
                        (this.successMsg = !1),
                          (this.showTradeWindow = !1),
                          this.exchanges.reset();
                      }, 1300);
                  })
                )
                .subscribe();
            } else
              (this.notEnoughMoney = !0),
                setTimeout(() => {
                  this.notEnoughMoney = !1;
                }, 3e3);
          }
          saveBalance() {
            let t = this.balance.getValue();
            return (
              t.coinBase
                ? (t.coinBase[this.coinsname] &&
                    (t.coinBase[`${this.coinsname}`] -=
                      this.exchanges.get("coin")?.value),
                  0 === t.coinBase[this.coinsname] &&
                    (delete t.coinBase[this.coinsname],
                    t.coinBase &&
                      (this.coinNames = Object.getOwnPropertyNames(
                        t.coinBase
                      ))))
                : ((t.coinBase = {}),
                  (t.coinBase[`${this.coinsname}`] =
                    this.exchanges.get("coin")?.value)),
              (t.balance += Number(this.exchanges.get("currency")?.value)),
              t
            );
          }
          updateUser(t) {
            let r = this.tokenService.getUser();
            (r.balance = t),
              this.tokenService.saveUser(r),
              this.databaseService.user$.next(r);
          }
          onSell(t) {
            let r = this.allCoinsPrice.find(
              (o) => o.name.toUpperCase() === t.toUpperCase()
            );
            (this.coinsname = r?.name),
              (this.price = r?.current_price),
              (this.showTradeWindow = !0);
          }
          onClickLeft() {
            this.pageIndex >= 10 && ((this.pageIndex -= 5), this.pageSize--);
          }
          onClickRight() {
            this.pageIndex < 100 && ((this.pageIndex += 5), this.pageSize++);
          }
          ngOnInit() {
            (this.user$ = this.databaseService.user$),
              this.localId.next(this.tokenService.getUser().localId),
              this.user$.getValue().balance?.coinBase &&
                (this.coinNames = Object.getOwnPropertyNames(
                  this.user$.getValue().balance?.coinBase
                )),
              this.priceService.getCurrency().subscribe((t) => {
                this.coins = t;
              }),
              this.registerValueChanges(),
              (this.balance = this.databaseService.balance),
              this.priceService.getCurrency().subscribe((t) => {
                this.allCoinsPrice = t;
              });
          }
        }
        return (
          (n.ɵfac = function (t) {
            return new (t || n)(w(eo), w(uu), w(Wp));
          }),
          (n.ɵcmp = qt({
            type: n,
            selectors: [["app-profile"]],
            decls: 4,
            vars: 4,
            consts: [
              [1, "wrapper"],
              [4, "ngIf"],
              [1, "card"],
              [1, "fullname"],
              [1, "balance"],
              [1, "wallet"],
              [4, "ngFor", "ngForOf"],
              [1, "paginator"],
              ["mat-button", "", 3, "click"],
              [1, "fa-solid", "fa-chevron-left"],
              [1, "fa-solid", "fa-chevron-right"],
              [3, "click"],
              [1, "tradewrapper"],
              [1, "tradewindow"],
              [3, "formGroup"],
              [
                "type",
                "number",
                "formControlName",
                "coin",
                "placeholder",
                "Enter Amount of Value",
              ],
              [
                "type",
                "number",
                "formControlName",
                "currency",
                "placeholder",
                "Enter Amount of Value",
              ],
              ["class", "error", 4, "ngIf"],
              ["class", "success", 4, "ngIf"],
              [1, "buy", 3, "click"],
              [1, "close-btn"],
              [1, "error"],
              [1, "success"],
            ],
            template: function (t, r) {
              1 & t &&
                (_(0, "div", 0),
                ne(1, Y5, 15, 7, "ng-container", 1),
                Xe(2, "async"),
                ne(3, e8, 19, 4, "ng-container", 1),
                g()),
                2 & t &&
                  (E(1),
                  L("ngIf", tr(2, 2, r.user$)),
                  E(2),
                  L("ngIf", r.showTradeWindow));
            },
            dependencies: [ho, Cr, R1, va, Go, Nl, ha, pa, Wo, Yi, Ho, yl, F1],
            styles: [
              '.wrapper[_ngcontent-%COMP%]{background-image:linear-gradient(rgba(0,0,0,.1),rgba(0,0,0,.5)),url(profile-bg.1443233bc29719f7.png);background-repeat:no-repeat;background-attachment:scroll;background-position:center;background-size:cover;position:relative;padding-top:120px;width:100%;display:flex;justify-content:center;margin:0 auto;min-height:100vh}.wrapper[_ngcontent-%COMP%]   .card[_ngcontent-%COMP%]{margin-top:40px;display:flex;flex-direction:column;padding:60px 50px;width:40%;height:250px;background-image:linear-gradient(rgba(0,0,0,.5),rgba(0,0,0,.6)),url(profile-card.3339590c5eff8144.jpg);background-repeat:no-repeat;background-attachment:scroll;background-position:center;background-size:cover;border-radius:10px;perspective:1000;position:relative;z-index:1;transform-style:preserve-3d}.wrapper[_ngcontent-%COMP%]   .card[_ngcontent-%COMP%]:not(:last-child){margin-right:2.5rem;margin-bottom:2.5rem}.wrapper[_ngcontent-%COMP%]   .card[_ngcontent-%COMP%]:after{content:"";position:absolute;background:inherit;top:4px;left:50%;width:95%;height:100%;z-index:-1;transform:translateZ(-100px) translate(-50%);filter:blur(6px);border-radius:10px}.wrapper[_ngcontent-%COMP%]   .card[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%]{font-family:inherit;color:#f4f4f4}.wrapper[_ngcontent-%COMP%]   .card[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{font-size:12px;letter-spacing:.1px;color:#dbd6d6;margin-top:8px;margin-left:7px}.wrapper[_ngcontent-%COMP%]   .card[_ngcontent-%COMP%]   .balance[_ngcontent-%COMP%]{display:flex;align-items:center}.wrapper[_ngcontent-%COMP%]   .card[_ngcontent-%COMP%]   .balance[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]{color:#fff;margin-right:6px;font-size:20px;margin-bottom:3px;line-height:1.3em}.wrapper[_ngcontent-%COMP%]   .card[_ngcontent-%COMP%]   .fullname[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%]{text-transform:uppercase;letter-spacing:.4px;font-size:29px;margin-bottom:45px}.wrapper[_ngcontent-%COMP%]   .wallet[_ngcontent-%COMP%]{width:50%;margin-left:50px}.wrapper[_ngcontent-%COMP%]   .wallet[_ngcontent-%COMP%]   h4[_ngcontent-%COMP%]{color:#1199fa;font-size:20px;line-height:115%;letter-spacing:-.01em;font-weight:600;margin-bottom:16px;text-transform:uppercase}.wrapper[_ngcontent-%COMP%]   .wallet[_ngcontent-%COMP%]   table[_ngcontent-%COMP%]{width:80%;background-color:#fffc;text-indent:initial;border-spacing:2px;font-size:14px;font-weight:500;color:#0b1426}.wrapper[_ngcontent-%COMP%]   .wallet[_ngcontent-%COMP%]   table[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]{color:#fff;background-color:#1199fa;cursor:pointer;border:1px solid transparent;font-weight:700;outline:2px solid transparent;outline-offset:2px;line-height:1.2;padding:5px 16px;border-radius:30px}.wrapper[_ngcontent-%COMP%]   .wallet[_ngcontent-%COMP%]   table[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]:hover{background-color:#36a4f3}.wrapper[_ngcontent-%COMP%]   .wallet[_ngcontent-%COMP%]   table[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]{cursor:pointer;width:100%;height:42.5px;display:grid;grid-template-columns:2fr 2fr 1.5fr;place-items:center}.wrapper[_ngcontent-%COMP%]   .wallet[_ngcontent-%COMP%]   table[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]:hover{background-color:#1199fa1f}.wrapper[_ngcontent-%COMP%]   .wallet[_ngcontent-%COMP%]   table[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]   th[_ngcontent-%COMP%]{text-transform:uppercase;font-size:13px;font-weight:600;color:#020306}.wrapper[_ngcontent-%COMP%]   .wallet[_ngcontent-%COMP%]   .paginator[_ngcontent-%COMP%]{width:80%;color:#0b1426;background-color:#ffffffb3;font-weight:500;height:48px;display:flex;justify-content:flex-end;align-items:center;border-bottom:1px solid #c9cfdd;margin-bottom:20px}.tradewrapper[_ngcontent-%COMP%]{z-index:1;background-color:transparent;position:fixed;top:0;left:0;width:100%;height:100%;display:flex;justify-content:center;align-items:center;background-color:#000000b3}.tradewrapper[_ngcontent-%COMP%]   .tradewindow[_ngcontent-%COMP%]{display:flex;flex-direction:column;align-items:center;justify-content:center;position:relative;border-radius:10px;background-color:#0b1429;width:500px;height:400px}.tradewrapper[_ngcontent-%COMP%]   .tradewindow[_ngcontent-%COMP%]   .error[_ngcontent-%COMP%]{font-size:14px;color:#b40046;margin-bottom:1px;line-height:8px}.tradewrapper[_ngcontent-%COMP%]   .tradewindow[_ngcontent-%COMP%]   .success[_ngcontent-%COMP%]{font-size:15px;color:green;margin-bottom:1px;line-height:8px;font-weight:500}.tradewrapper[_ngcontent-%COMP%]   .tradewindow[_ngcontent-%COMP%]   form[_ngcontent-%COMP%]{display:flex;flex-direction:column}.tradewrapper[_ngcontent-%COMP%]   .tradewindow[_ngcontent-%COMP%]   form[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{width:45px;height:45px}.tradewrapper[_ngcontent-%COMP%]   .tradewindow[_ngcontent-%COMP%]   form[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{text-transform:uppercase;color:#fff;font-size:15px;margin-bottom:8px;text-align:center;letter-spacing:.02rem;font-weight:500}.tradewrapper[_ngcontent-%COMP%]   .tradewindow[_ngcontent-%COMP%]   form[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]{margin-bottom:24px;width:362px;height:40px;padding:16px;font-size:15px;line-height:24px;font-weight:400px;color:#b5b0b0;border:1px solid rgba(193,196,201,.36);border-radius:8px;background-color:#060b18;transition:ease .2s}.tradewrapper[_ngcontent-%COMP%]   .tradewindow[_ngcontent-%COMP%]   form[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]:focus{border-color:#0058aa;outline:none;box-shadow:0 0 5px #0058aa;background-color:#060b12;opacity:.92}.tradewrapper[_ngcontent-%COMP%]   .tradewindow[_ngcontent-%COMP%]   form[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]:hover{background-color:#060b12;opacity:.98}.tradewrapper[_ngcontent-%COMP%]   .tradewindow[_ngcontent-%COMP%]   .close-btn[_ngcontent-%COMP%]{z-index:4;position:absolute;top:4%;right:3%}.tradewrapper[_ngcontent-%COMP%]   .tradewindow[_ngcontent-%COMP%]   .close-btn[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]{cursor:pointer;font-size:15px;font-weight:700;height:20px;width:23px}.tradewrapper[_ngcontent-%COMP%]   .tradewindow[_ngcontent-%COMP%]   .buy[_ngcontent-%COMP%]{font-size:13px;letter-spacing:-.02em;font-weight:600;margin:29px 0 0;height:35px;width:120px;border-radius:4px;color:#0d6efd;border-color:#0d6efd;cursor:pointer;border:1px solid;background-color:transparent;transition:color .15s ease-in-out,background-color .15s ease-in-out,border-color .15s ease-in-out}.tradewrapper[_ngcontent-%COMP%]   .tradewindow[_ngcontent-%COMP%]   .buy[_ngcontent-%COMP%]:hover{background-color:#0d6efd;border-color:transparent;color:#f4f4f4}@media screen and (min-width: 1129px){.wrapper[_ngcontent-%COMP%]{height:100vh}}@media screen and (min-width: 768px) and (max-width: 1128px){.wrapper[_ngcontent-%COMP%]{width:100%;justify-content:space-around;height:100vh}.wrapper[_ngcontent-%COMP%]   .card[_ngcontent-%COMP%]{width:350px;height:200px;border-radius:5px;padding:40px 30px}.wrapper[_ngcontent-%COMP%]   .card[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%]{font-size:25px}.wrapper[_ngcontent-%COMP%]   .card[_ngcontent-%COMP%]:not(:last-child){margin-right:0;margin-bottom:2.5rem}.wrapper[_ngcontent-%COMP%]   .card[_ngcontent-%COMP%]   .fullname[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%]{font-size:27px}.wrapper[_ngcontent-%COMP%]   .wallet[_ngcontent-%COMP%]{width:40%;margin-left:0}.wrapper[_ngcontent-%COMP%]   .wallet[_ngcontent-%COMP%]   table[_ngcontent-%COMP%], .wrapper[_ngcontent-%COMP%]   .wallet[_ngcontent-%COMP%]   .paginator[_ngcontent-%COMP%]{width:100%}}@media screen and (min-width: 350px) and (max-width: 767px){.wrapper[_ngcontent-%COMP%]{position:relative;padding-top:90px;width:100%;display:flex;flex-direction:column;align-items:center}.wrapper[_ngcontent-%COMP%]   .card[_ngcontent-%COMP%]{margin:20px 0 0;width:90%;padding:40px;max-width:350px;height:200px;border-radius:7px}.wrapper[_ngcontent-%COMP%]   .card[_ngcontent-%COMP%]:not(:last-child){margin-right:0}.wrapper[_ngcontent-%COMP%]   .card[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%]{font-size:19px}.wrapper[_ngcontent-%COMP%]   .card[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{font-size:12px}.wrapper[_ngcontent-%COMP%]   .card[_ngcontent-%COMP%]   .fullname[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%]{font-size:25px}.wrapper[_ngcontent-%COMP%]   .wallet[_ngcontent-%COMP%]{width:90%;max-width:380px;margin:0}.wrapper[_ngcontent-%COMP%]   .wallet[_ngcontent-%COMP%]   h4[_ngcontent-%COMP%]{color:#ddedf8;margin-left:40px}.wrapper[_ngcontent-%COMP%]   .wallet[_ngcontent-%COMP%]   table[_ngcontent-%COMP%], .wrapper[_ngcontent-%COMP%]   .wallet[_ngcontent-%COMP%]   .paginator[_ngcontent-%COMP%]{width:100%}.tradewrapper[_ngcontent-%COMP%]   .tradewindow[_ngcontent-%COMP%]{border-radius:5px;width:90%;max-width:380px;height:400px;margin-top:50px}.tradewrapper[_ngcontent-%COMP%]   .tradewindow[_ngcontent-%COMP%]   form[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]{margin-bottom:24px;width:250px;height:40px}}',
            ],
          })),
          n
        );
      })();
      function n8(n, e) {
        return (t) => {
          const r = t.get(n),
            o = t.get(e);
          return r && o && r.value !== o.value ? { mismatch: !0 } : null;
        };
      }
      function r8(n, e) {
        1 & n &&
          (ve(0),
          _(1, "p", 13),
          v(2, "Both fields are required."),
          g(),
          _(3, "p", 13),
          v(4, "Names must be alphabetical characters."),
          g(),
          Ce());
      }
      function o8(n, e) {
        1 & n && (ve(0), _(1, "p", 13), v(2, "Enter correct email"), g(), Ce());
      }
      function i8(n, e) {
        if (1 & n) {
          const t = bn();
          ve(0),
            _(1, "div", 14),
            re(2, "input", 15),
            _(3, "i", 16),
            me("click", function () {
              return Ot(t), Pt(ie().onShowPassword());
            }),
            g()(),
            Ce();
        }
      }
      function s8(n, e) {
        if (1 & n) {
          const t = bn();
          _(0, "div", 14),
            re(1, "input", 17),
            _(2, "i", 18),
            me("click", function () {
              return Ot(t), Pt(ie().onShowPassword());
            }),
            g()();
        }
      }
      function a8(n, e) {
        1 & n &&
          (ve(0), _(1, "p", 13), v(2, "Min length 8 is required"), g(), Ce());
      }
      function c8(n, e) {
        if (1 & n) {
          const t = bn();
          ve(0),
            _(1, "div", 14),
            re(2, "input", 19),
            _(3, "i", 16),
            me("click", function () {
              return Ot(t), Pt(ie().onShowPassword());
            }),
            g()(),
            Ce();
        }
      }
      function l8(n, e) {
        if (1 & n) {
          const t = bn();
          _(0, "div", 14),
            re(1, "input", 20),
            _(2, "i", 18),
            me("click", function () {
              return Ot(t), Pt(ie().onShowPassword());
            }),
            g()();
        }
      }
      function u8(n, e) {
        1 & n &&
          (ve(0), _(1, "p", 13), v(2, "Passwords don't match"), g(), Ce());
      }
      function d8(n, e) {
        if (
          (1 & n && (ve(0), _(1, "p", 21), v(2), Xe(3, "async"), g(), Ce()),
          2 & n)
        ) {
          const t = ie();
          E(2), Je(tr(3, 1, t.errorMessage$));
        }
      }
      let f8 = (() => {
        class n {
          constructor(t, r) {
            (this.database = t),
              (this.router = r),
              (this.showPassword = !1),
              (this.errorMessage$ = new $e("")),
              (this.registerForm = new Kr(
                {
                  fullname: new Kr({
                    firstname: new wn("", {
                      nonNullable: !0,
                      validators: [wr.required],
                    }),
                    lastname: new wn("", {
                      nonNullable: !0,
                      validators: [wr.required],
                    }),
                  }),
                  email: new wn("", {
                    nonNullable: !0,
                    validators: [wr.required, wr.email],
                  }),
                  passwords: new Kr({
                    password: new wn("", {
                      nonNullable: !0,
                      validators: [wr.required, wr.minLength(8)],
                    }),
                    confirmpassword: new wn("", {
                      nonNullable: !0,
                      validators: [wr.required],
                    }),
                  }),
                },
                [n8("password", "confirmpassword")]
              ));
          }
          ngOnInit() {}
          onShowPassword() {
            (this.showPassword = !this.showPassword),
              setTimeout(() => {
                this.showPassword = !1;
              }, 4e3);
          }
          onSubmit() {
            if (!this.registerForm.valid) return;
            const t = this.registerForm.value.email,
              r = this.registerForm.value.passwords?.password;
            this.database
              .signUp(t, r, {
                email: t,
                fullname: this.registerForm.value.fullname,
                balance: { balance: 3e6, coinBase: {} },
              })
              .pipe(
                He((i) => this.registerForm.reset()),
                Er(
                  (i) => (
                    console.log(i),
                    this.errorMessage$.next(i.error.error.message),
                    setTimeout(() => {
                      this.errorMessage$.next("");
                    }, 3e3),
                    V(null)
                  )
                )
              )
              .subscribe();
          }
        }
        return (
          (n.ɵfac = function (t) {
            return new (t || n)(w(eo), w(Ye));
          }),
          (n.ɵcmp = qt({
            type: n,
            selectors: [["app-register"]],
            decls: 49,
            vars: 13,
            consts: [
              [1, "wrapper"],
              [1, "container"],
              [3, "formGroup"],
              ["formGroupName", "fullname", 1, "fullname"],
              [
                "type",
                "text",
                "formControlName",
                "firstname",
                "placeholder",
                "First Name",
              ],
              [
                "type",
                "text",
                "formControlName",
                "lastname",
                "placeholder",
                "Last Name",
              ],
              [4, "ngIf"],
              [
                "type",
                "email",
                "formControlName",
                "email",
                "placeholder",
                "example@gmail.com",
              ],
              ["formGroupName", "passwords", 1, "passwords"],
              [4, "ngIf", "ngIfElse"],
              ["show", ""],
              ["showConfirm", ""],
              ["type", "submit", 3, "disabled", "click"],
              [1, "error"],
              [1, "pass"],
              [
                "type",
                "password",
                "formControlName",
                "password",
                "placeholder",
                "Password",
              ],
              [1, "fa-solid", "fa-eye-slash", 3, "click"],
              [
                "type",
                "text",
                "formControlName",
                "password",
                "placeholder",
                "Password",
              ],
              [1, "fa-solid", "fa-eye", 3, "click"],
              [
                "type",
                "password",
                "formControlName",
                "confirmpassword",
                "placeholder",
                "Confirm Password",
              ],
              [
                "type",
                "text",
                "formControlName",
                "confirmpassword",
                "placeholder",
                "Confirm Password",
              ],
              [1, "error", "server-error"],
            ],
            template: function (t, r) {
              if (
                (1 & t &&
                  (_(0, "div", 0)(1, "div", 1)(2, "h1"),
                  v(3, "Sign Up"),
                  g(),
                  _(4, "form", 2)(5, "div", 3)(6, "div")(7, "p")(8, "span"),
                  v(9, "*"),
                  g(),
                  v(10, " First Name"),
                  g(),
                  re(11, "input", 4),
                  g(),
                  _(12, "div")(13, "p")(14, "span"),
                  v(15, "*"),
                  g(),
                  v(16, " Last Name"),
                  g(),
                  re(17, "input", 5),
                  g()(),
                  ne(18, r8, 5, 0, "ng-container", 6),
                  _(19, "div")(20, "p")(21, "span"),
                  v(22, "*"),
                  g(),
                  v(23, " Email"),
                  g(),
                  re(24, "input", 7),
                  g(),
                  ne(25, o8, 3, 0, "ng-container", 6),
                  _(26, "div", 8)(27, "div")(28, "p")(29, "span"),
                  v(30, "*"),
                  g(),
                  v(31, " Password"),
                  g(),
                  ne(32, i8, 4, 0, "ng-container", 9),
                  ne(33, s8, 3, 0, "ng-template", null, 10, Qc),
                  ne(35, a8, 3, 0, "ng-container", 6),
                  g(),
                  _(36, "div")(37, "p")(38, "span"),
                  v(39, "*"),
                  g(),
                  v(40, " Confirm Password"),
                  g(),
                  ne(41, c8, 4, 0, "ng-container", 9),
                  ne(42, l8, 3, 0, "ng-template", null, 11, Qc),
                  ne(44, u8, 3, 0, "ng-container", 6),
                  g()(),
                  ne(45, d8, 4, 3, "ng-container", 6),
                  Xe(46, "async"),
                  _(47, "button", 12),
                  me("click", function () {
                    return r.onSubmit();
                  }),
                  v(48, " Create account "),
                  g()()()()),
                2 & t)
              ) {
                const o = Bc(34),
                  i = Bc(43);
                let s, a, c, l, u;
                E(4),
                  L("formGroup", r.registerForm),
                  E(14),
                  L(
                    "ngIf",
                    (!(
                      null != (s = r.registerForm.get("fullname.firstname")) &&
                      s.valid
                    ) &&
                      (null == (s = r.registerForm.get("fullname.firstname"))
                        ? null
                        : s.touched)) ||
                      (!(
                        null != (s = r.registerForm.get("fullname.lastname")) &&
                        s.valid
                      ) &&
                        (null == (s = r.registerForm.get("fullname.lastname"))
                          ? null
                          : s.touched))
                  ),
                  E(7),
                  L(
                    "ngIf",
                    (null == (a = r.registerForm.get("email"))
                      ? null
                      : a.invalid) &&
                      (null == (a = r.registerForm.get("email"))
                        ? null
                        : a.touched)
                  ),
                  E(7),
                  L("ngIf", !r.showPassword)("ngIfElse", o),
                  E(3),
                  L(
                    "ngIf",
                    (null == (c = r.registerForm.get("passwords.password"))
                      ? null
                      : c.invalid) &&
                      (null == (c = r.registerForm.get("passwords.password"))
                        ? null
                        : c.touched)
                  ),
                  E(6),
                  L("ngIf", !r.showPassword)("ngIfElse", i),
                  E(3),
                  L(
                    "ngIf",
                    (null == (l = r.registerForm.get("passwords.password"))
                      ? null
                      : l.value) !==
                      (null ==
                      (l = r.registerForm.get("passwords.confirmpassword"))
                        ? null
                        : l.value) &&
                      (null ==
                      (l = r.registerForm.get("passwords.confirmpassword"))
                        ? null
                        : l.touched)
                  ),
                  E(1),
                  L("ngIf", tr(46, 11, r.errorMessage$)),
                  E(2),
                  L(
                    "disabled",
                    r.registerForm.invalid ||
                      (null == (u = r.registerForm.get("passwords.password"))
                        ? null
                        : u.value) !==
                        (null ==
                        (u = r.registerForm.get("passwords.confirmpassword"))
                          ? null
                          : u.value)
                  );
              }
            },
            dependencies: [Cr, va, Go, ha, pa, Wo, Yi, Rl, Ho],
            styles: [
              ".wrapper[_ngcontent-%COMP%]{height:100%;width:100%;display:flex;justify-content:center;align-items:center;background-color:#001121}.wrapper[_ngcontent-%COMP%]   .container[_ngcontent-%COMP%]{color:#fff;background-color:#060b18;margin-top:100px;width:448px;height:524px;border-radius:18px;padding:40px 40px 0;border:1px solid rgba(138,145,158,.2);display:flex;flex-direction:column;align-items:center}.wrapper[_ngcontent-%COMP%]   .container[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%]{font-size:28px;padding:0 0 24px;line-height:36px;font-weight:600;margin-bottom:25px}.wrapper[_ngcontent-%COMP%]   .container[_ngcontent-%COMP%]   form[_ngcontent-%COMP%]   .fullname[_ngcontent-%COMP%]{display:flex;justify-content:space-between;width:362px}.wrapper[_ngcontent-%COMP%]   .container[_ngcontent-%COMP%]   form[_ngcontent-%COMP%]   .fullname[_ngcontent-%COMP%]   div[_ngcontent-%COMP%]{width:48%}.wrapper[_ngcontent-%COMP%]   .container[_ngcontent-%COMP%]   form[_ngcontent-%COMP%]   .fullname[_ngcontent-%COMP%]   div[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]{width:100%}.wrapper[_ngcontent-%COMP%]   .container[_ngcontent-%COMP%]   form[_ngcontent-%COMP%]   .passwords[_ngcontent-%COMP%]{display:flex;justify-content:space-between;width:362px}.wrapper[_ngcontent-%COMP%]   .container[_ngcontent-%COMP%]   form[_ngcontent-%COMP%]   .passwords[_ngcontent-%COMP%]   div[_ngcontent-%COMP%]{width:48%}.wrapper[_ngcontent-%COMP%]   .container[_ngcontent-%COMP%]   form[_ngcontent-%COMP%]   .passwords[_ngcontent-%COMP%]   div[_ngcontent-%COMP%]   p.error[_ngcontent-%COMP%]{margin-top:10px}.wrapper[_ngcontent-%COMP%]   .container[_ngcontent-%COMP%]   form[_ngcontent-%COMP%]   .passwords[_ngcontent-%COMP%]   div[_ngcontent-%COMP%]   .pass[_ngcontent-%COMP%]{width:100%;position:relative}.wrapper[_ngcontent-%COMP%]   .container[_ngcontent-%COMP%]   form[_ngcontent-%COMP%]   .passwords[_ngcontent-%COMP%]   div[_ngcontent-%COMP%]   .pass[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]{width:100%;margin-bottom:0}.wrapper[_ngcontent-%COMP%]   .container[_ngcontent-%COMP%]   form[_ngcontent-%COMP%]   .passwords[_ngcontent-%COMP%]   div[_ngcontent-%COMP%]   .pass[_ngcontent-%COMP%]   i[_ngcontent-%COMP%]{position:absolute;cursor:pointer;top:50%;right:5%;color:#b5b0b0;font-size:13px;transform:translateY(-50%)}.wrapper[_ngcontent-%COMP%]   .container[_ngcontent-%COMP%]   form[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{font-size:14px;padding:4px;line-height:20px;font-weight:600px}.wrapper[_ngcontent-%COMP%]   .container[_ngcontent-%COMP%]   form[_ngcontent-%COMP%]   p.error[_ngcontent-%COMP%]{font-size:12px;color:#b40046;margin-bottom:1px;line-height:8px}.wrapper[_ngcontent-%COMP%]   .container[_ngcontent-%COMP%]   form[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]{color:#b40046}.wrapper[_ngcontent-%COMP%]   .container[_ngcontent-%COMP%]   form[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]{width:362px;height:40px;margin-bottom:15px;padding:16px;font-size:15px;line-height:24px;font-weight:400px;color:#b5b0b0;border:1px solid rgba(193,196,201,.36);border-radius:8px;background-color:#060b18;transition:ease .2s}.wrapper[_ngcontent-%COMP%]   .container[_ngcontent-%COMP%]   form[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]:focus{border-color:#0058aa;outline:none;box-shadow:0 0 5px #0058aa;background-color:#060b12;opacity:.92}.wrapper[_ngcontent-%COMP%]   .container[_ngcontent-%COMP%]   form[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]:hover{background-color:#060b12;opacity:.98}.wrapper[_ngcontent-%COMP%]   .container[_ngcontent-%COMP%]   form[_ngcontent-%COMP%]   input.ng-touched.ng-invalid[_ngcontent-%COMP%]{border-color:#b40046;box-shadow:0 0 8px #b40046;animation:shake .3s}@keyframes shake{25%{transform:translate(3px)}75%{transform:translate(-3px)}to{transform:translate(3px)}}.wrapper[_ngcontent-%COMP%]   .container[_ngcontent-%COMP%]   form[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]{margin-top:35px;cursor:pointer;width:362px;height:40px;padding:1px 32px;background-color:#0a114b;letter-spacing:.03em;font-size:16px;line-height:24px;font-weight:600;color:#fff;border:1px solid transparent;border-radius:40px}.wrapper[_ngcontent-%COMP%]   .container[_ngcontent-%COMP%]   form[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]:hover{background-color:#0a115f;opacity:.92}.wrapper[_ngcontent-%COMP%]   .container[_ngcontent-%COMP%]   form[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]:disabled{cursor:not-allowed;background-color:#0a115f;opacity:.4}.server-error[_ngcontent-%COMP%]{margin-top:15px}@media screen and (min-width: 350px) and (max-width: 767px){.wrapper[_ngcontent-%COMP%]{padding:15px}.wrapper[_ngcontent-%COMP%]   .container[_ngcontent-%COMP%]{margin-top:100px;max-width:400px;min-width:320px;padding:20px 10px 0 20px}.wrapper[_ngcontent-%COMP%]   .container[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%]{font-size:19px;margin-bottom:10px;padding-top:10px;padding-bottom:0}.wrapper[_ngcontent-%COMP%]   .container[_ngcontent-%COMP%]   form[_ngcontent-%COMP%]{width:90%}.wrapper[_ngcontent-%COMP%]   .container[_ngcontent-%COMP%]   form[_ngcontent-%COMP%]   .fullname[_ngcontent-%COMP%]{flex-direction:column;align-items:center;width:100%}.wrapper[_ngcontent-%COMP%]   .container[_ngcontent-%COMP%]   form[_ngcontent-%COMP%]   .fullname[_ngcontent-%COMP%]   div[_ngcontent-%COMP%]{width:100%}.wrapper[_ngcontent-%COMP%]   .container[_ngcontent-%COMP%]   form[_ngcontent-%COMP%]   .fullname[_ngcontent-%COMP%]   div[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]{width:100%;height:38px}.wrapper[_ngcontent-%COMP%]   .container[_ngcontent-%COMP%]   form[_ngcontent-%COMP%]   .passwords[_ngcontent-%COMP%]{flex-direction:column;align-items:center;width:100%}.wrapper[_ngcontent-%COMP%]   .container[_ngcontent-%COMP%]   form[_ngcontent-%COMP%]   .passwords[_ngcontent-%COMP%]   div[_ngcontent-%COMP%]{width:100%}.wrapper[_ngcontent-%COMP%]   .container[_ngcontent-%COMP%]   form[_ngcontent-%COMP%]   .passwords[_ngcontent-%COMP%]   div[_ngcontent-%COMP%]   p.error[_ngcontent-%COMP%]{margin-top:10px}.wrapper[_ngcontent-%COMP%]   .container[_ngcontent-%COMP%]   form[_ngcontent-%COMP%]   .passwords[_ngcontent-%COMP%]   div[_ngcontent-%COMP%]   .pass[_ngcontent-%COMP%]{width:100%}.wrapper[_ngcontent-%COMP%]   .container[_ngcontent-%COMP%]   form[_ngcontent-%COMP%]   .passwords[_ngcontent-%COMP%]   div[_ngcontent-%COMP%]   .pass[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]{width:100%;margin-bottom:15px;height:38px}.wrapper[_ngcontent-%COMP%]   .container[_ngcontent-%COMP%]   form[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{font-size:12px;padding:3px;line-height:16px}.wrapper[_ngcontent-%COMP%]   .container[_ngcontent-%COMP%]   form[_ngcontent-%COMP%]   p.error[_ngcontent-%COMP%]{font-size:10px}.wrapper[_ngcontent-%COMP%]   .container[_ngcontent-%COMP%]   form[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]{width:100%;margin-bottom:15px;height:38px}.wrapper[_ngcontent-%COMP%]   .container[_ngcontent-%COMP%]   form[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]{margin-top:15px;margin-bottom:10px;width:100%;height:38px}}",
            ],
          })),
          n
        );
      })();
      function h8(n, e) {
        if ((1 & n && (ve(0), _(1, "p", 7), v(2), g(), Ce()), 2 & n)) {
          const t = e.ngIf;
          E(2), Je(t);
        }
      }
      let p8 = (() => {
          class n {
            constructor(t) {
              (this.databaseService = t),
                (this.signinform = new Kr({
                  email: new wn("", {
                    nonNullable: !0,
                    validators: [wr.required],
                  }),
                  password: new wn("", {
                    nonNullable: !0,
                    validators: [wr.required, wr.minLength(8)],
                  }),
                })),
                (this.errorMessage$ = new $e(""));
            }
            ngOnInit() {}
            logIn() {
              let t = this.signinform.value.email,
                r = this.signinform.value.password;
              this.signinform.reset(),
                this.databaseService
                  .login(t, r)
                  .pipe(
                    Er(
                      (o) => (
                        console.log(o),
                        this.errorMessage$.next(o.error.error.message),
                        setTimeout(() => {
                          this.errorMessage$.next("");
                        }, 3e3),
                        V(null)
                      )
                    )
                  )
                  .subscribe();
            }
          }
          return (
            (n.ɵfac = function (t) {
              return new (t || n)(w(eo));
            }),
            (n.ɵcmp = qt({
              type: n,
              selectors: [["app-sign-in"]],
              decls: 17,
              vars: 4,
              consts: [
                [1, "wrapper"],
                [1, "container"],
                [3, "formGroup"],
                [
                  "type",
                  "email",
                  "formControlName",
                  "email",
                  "placeholder",
                  "example@gmail.com",
                ],
                [
                  "type",
                  "password",
                  "formControlName",
                  "password",
                  "placeholder",
                  "Password",
                ],
                [4, "ngIf"],
                [3, "click"],
                [1, "error"],
              ],
              template: function (t, r) {
                1 & t &&
                  (_(0, "div", 0)(1, "div", 1)(2, "h1"),
                  v(3, "Sign In"),
                  g(),
                  _(4, "form", 2)(5, "div")(6, "p"),
                  v(7, "Email"),
                  g(),
                  re(8, "input", 3),
                  g(),
                  _(9, "div")(10, "p"),
                  v(11, "Password"),
                  g(),
                  re(12, "input", 4),
                  ne(13, h8, 3, 1, "ng-container", 5),
                  Xe(14, "async"),
                  g(),
                  _(15, "button", 6),
                  me("click", function () {
                    return r.logIn();
                  }),
                  v(16, "Sign in"),
                  g()()()()),
                  2 & t &&
                    (E(4),
                    L("formGroup", r.signinform),
                    E(9),
                    L("ngIf", tr(14, 2, r.errorMessage$)));
              },
              dependencies: [Cr, va, Go, ha, pa, Wo, Yi, Ho],
              styles: [
                ".wrapper[_ngcontent-%COMP%]{height:100%;width:100%;display:flex;justify-content:center;align-items:center;background-color:#001121}.wrapper[_ngcontent-%COMP%]   .container[_ngcontent-%COMP%]{color:#fff;background-color:#060b18;margin-top:100px;width:448px;height:424px;border-radius:18px;padding:40px 40px 0;border:1px solid rgba(138,145,158,.2);display:flex;flex-direction:column;align-items:center}.wrapper[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%]{font-size:28px;padding:0 0 24px;line-height:36px;font-weight:600;margin-bottom:20px}.wrapper[_ngcontent-%COMP%]   form[_ngcontent-%COMP%]   div[_ngcontent-%COMP%]   .error[_ngcontent-%COMP%]{font-size:11px;color:#b40046;margin-bottom:3px;line-height:8px}.wrapper[_ngcontent-%COMP%]   form[_ngcontent-%COMP%]   div[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{margin-bottom:10px}.wrapper[_ngcontent-%COMP%]   form[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]{width:362px;height:40px;margin-bottom:15px;padding:16px;font-size:15px;line-height:24px;font-weight:400px;color:#b5b0b0;border:1px solid rgba(193,196,201,.36);border-radius:8px;background-color:#060b18;transition:ease .2s}.wrapper[_ngcontent-%COMP%]   form[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]:focus{border-color:#0058aa;outline:none;box-shadow:0 0 5px #0058aa;background-color:#060b12;opacity:.92}.wrapper[_ngcontent-%COMP%]   form[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]:hover{background-color:#060b12;opacity:.98}.wrapper[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]{margin-top:35px;cursor:pointer;width:362px;height:40px;padding:1px 32px;background-color:#0a114b;letter-spacing:.03em;font-size:16px;line-height:24px;font-weight:600;color:#fff;border:1px solid transparent;border-radius:40px}.wrapper[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]:hover{background-color:#0a115f;opacity:.92}.wrapper[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]:disabled{cursor:not-allowed;background-color:#0a115f;opacity:.4}@media screen and (min-width: 350px) and (max-width: 767px){.wrapper[_ngcontent-%COMP%]{padding:20px}.wrapper[_ngcontent-%COMP%]   .container[_ngcontent-%COMP%]{height:364px;min-width:320px;max-width:400px;padding:10px 10px 0}.wrapper[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%]{font-size:22px;padding:10px}.wrapper[_ngcontent-%COMP%]   form[_ngcontent-%COMP%]{width:94%}.wrapper[_ngcontent-%COMP%]   form[_ngcontent-%COMP%]   input[_ngcontent-%COMP%], .wrapper[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]{width:100%}}",
              ],
            })),
            n
          );
        })(),
        g8 = (() => {
          class n {
            constructor(t, r) {
              (this.router = t), (this.database = r);
            }
            canActivate(t, r) {
              return (
                !!this.database.isLogged$.getValue() ||
                (this.router.navigate(["signin"]), !1)
              );
            }
          }
          return (
            (n.ɵfac = function (t) {
              return new (t || n)(P(Ye), P(eo));
            }),
            (n.ɵprov = R({ token: n, factory: n.ɵfac, providedIn: "root" })),
            n
          );
        })(),
        L1 = (() => {
          class n {
            constructor(t, r) {
              (this.router = t), (this.database = r);
            }
            canActivate(t, r) {
              return (
                !this.database.isLogged$.getValue() ||
                (this.router.navigate(["profile"]), !1)
              );
            }
          }
          return (
            (n.ɵfac = function (t) {
              return new (t || n)(P(Ye), P(eo));
            }),
            (n.ɵprov = R({ token: n, factory: n.ɵfac, providedIn: "root" })),
            n
          );
        })();
      const m8 = [
        { path: "", redirectTo: "main", pathMatch: "full" },
        { path: "news", component: d1 },
        { path: "main", component: R4 },
        { path: "prices", component: q5 },
        { path: "nfts", component: V4 },
        { path: "register", component: f8, canActivate: [L1] },
        { path: "signin", component: p8, canActivate: [L1] },
        { path: "profile", component: t8, canActivate: [g8] },
      ];
      let _8 = (() => {
        class n {}
        return (
          (n.ɵfac = function (t) {
            return new (t || n)();
          }),
          (n.ɵmod = yt({ type: n })),
          (n.ɵinj = ft({ imports: [$M.forRoot(m8), $M] })),
          n
        );
      })();
      function y8(n, e) {
        if (1 & n) {
          const t = bn();
          ve(0),
            _(1, "li")(2, "a", 16),
            v(3, "Profile"),
            g()(),
            _(4, "li")(5, "a", 7),
            me("click", function () {
              return Ot(t), Pt(ie().logOut());
            }),
            v(6, "Sign Out"),
            g()(),
            Ce();
        }
      }
      function v8(n, e) {
        1 & n &&
          (_(0, "li")(1, "a", 17),
          v(2, "Sign in"),
          g()(),
          _(3, "li")(4, "a", 18),
          v(5, "Sign up"),
          g()());
      }
      const C8 = function (n, e) {
        return { mobileMenu: n, none: e };
      };
      let b8 = (() => {
          class n {
            constructor(t, r, o) {
              (this.tokenService = t),
                (this.router = r),
                (this.database = o),
                (this.showMenu = !1),
                (this.isLogged$ = new $e(!1));
            }
            scroll() {
              window.scroll({ top: 0, left: 0, behavior: "smooth" });
            }
            logOut() {
              this.tokenService.logOut(), window.location.reload();
            }
            mobileMenu() {
              this.showMenu = !0;
            }
            ngOnInit() {
              this.isLogged$ = this.database.isLogged$;
            }
          }
          return (
            (n.ɵfac = function (t) {
              return new (t || n)(w(uu), w(Ye), w(eo));
            }),
            (n.ɵcmp = qt({
              type: n,
              selectors: [["app-header"]],
              decls: 32,
              vars: 8,
              consts: [
                [1, "navbar-container"],
                [1, "content"],
                ["routerLink", "/main", 3, "click"],
                [1, "nav-lang", 3, "ngClass"],
                [1, "mobile-nav"],
                [1, "fa-solid", "fa-xmark", "close-menu", 3, "click"],
                [1, "main-nav"],
                [3, "click"],
                ["routerLink", "/nfts", "routerLinkActive", "active"],
                ["routerLink", "/prices", "routerLinkActive", "active"],
                ["routerLink", "/news", "routerLinkActive", "active"],
                [1, "sign-btns"],
                [4, "ngIf", "ngIfElse"],
                ["notloggedin", ""],
                [1, "burger-menu", 3, "click"],
                [1, "fa-solid", "fa-bars"],
                ["routerLink", "/profile"],
                ["routerLink", "/signin"],
                ["routerLink", "/register"],
              ],
              template: function (t, r) {
                if (
                  (1 & t &&
                    (_(0, "div", 0)(1, "div", 1)(2, "h1", 2),
                    me("click", function () {
                      return r.scroll();
                    }),
                    v(3, "TMTK "),
                    _(4, "span"),
                    v(5, "."),
                    g()(),
                    _(6, "div", 3)(7, "div", 4)(8, "h1"),
                    v(9, "TMTK "),
                    _(10, "span"),
                    v(11, "."),
                    g()(),
                    _(12, "i", 5),
                    me("click", function () {
                      return (r.showMenu = !1);
                    }),
                    g()(),
                    _(13, "nav", 6)(14, "ul", 7),
                    me("click", function () {
                      return (r.showMenu = !1);
                    }),
                    _(15, "li")(16, "a", 8),
                    v(17, "NFT"),
                    g()(),
                    _(18, "li")(19, "a", 9),
                    v(20, "Prices"),
                    g()(),
                    _(21, "li")(22, "a", 10),
                    v(23, "News"),
                    g()()()(),
                    _(24, "nav", 11)(25, "ul", 7),
                    me("click", function () {
                      return (r.showMenu = !1);
                    }),
                    ne(26, y8, 7, 0, "ng-container", 12),
                    Xe(27, "async"),
                    ne(28, v8, 6, 0, "ng-template", null, 13, Qc),
                    g()()(),
                    _(30, "div", 14),
                    me("click", function () {
                      return r.mobileMenu();
                    }),
                    re(31, "i", 15),
                    g()()()),
                  2 & t)
                ) {
                  const o = Bc(29);
                  E(6),
                    L(
                      "ngClass",
                      (function v0(n, e, t, r, o) {
                        return w0(D(), Zt(), n, e, t, r, o);
                      })(5, C8, !0 === r.showMenu, !1 === r.showMenu)
                    ),
                    E(20),
                    L("ngIf", tr(27, 3, r.isLogged$))("ngIfElse", o);
                }
              },
              dependencies: [la, Cr, Xo, ru, NM, Ho],
              styles: [
                ".navbar-container[_ngcontent-%COMP%]{position:fixed;top:0;z-index:3;width:100%;height:76px;background-color:#061121;display:grid;place-items:center}.navbar-container[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]{width:1080px;height:39px;display:flex;justify-content:space-between;align-items:center}.navbar-container[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%]{font-size:28px;font-family:Dancing Script;font-weight:700;cursor:pointer;letter-spacing:.08em}.navbar-container[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]{color:#f00000}.navbar-container[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   .nav-lang[_ngcontent-%COMP%]{display:flex;align-items:center}.navbar-container[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   .nav-lang[_ngcontent-%COMP%]   .sign-btns[_ngcontent-%COMP%]{margin-left:50px;letter-spacing:.03em}.navbar-container[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   .nav-lang[_ngcontent-%COMP%]   .sign-btns[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]:nth-child(2)   a[_ngcontent-%COMP%]{color:#0784f9}.navbar-container[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   .nav-lang[_ngcontent-%COMP%]   .sign-btns[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]:nth-child(1)   a[_ngcontent-%COMP%]{color:inherit}.navbar-container[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   .nav-lang[_ngcontent-%COMP%]   .mobile-nav[_ngcontent-%COMP%]{display:none}.navbar-container[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   .nav-lang[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%]{margin-left:30px;color:#b5b0b0}.navbar-container[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   .nav-lang[_ngcontent-%COMP%]   nav[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%]{display:flex;text-align:center}.navbar-container[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   .nav-lang[_ngcontent-%COMP%]   nav[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]{margin-right:13px}.navbar-container[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   .nav-lang[_ngcontent-%COMP%]   nav[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]{font-size:18px;color:#b5b0b0;font-weight:500;cursor:pointer}.navbar-container[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   .nav-lang[_ngcontent-%COMP%]   nav[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]   a.active[_ngcontent-%COMP%]{color:inherit}.navbar-container[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   .nav-lang[_ngcontent-%COMP%]   nav[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]:hover{color:inherit}.navbar-container[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   .burger-menu[_ngcontent-%COMP%]{display:none}@media screen and (min-width: 768px) and (max-width: 1128px){.navbar-container[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]{width:90%}}@media screen and (min-width: 350px) and (max-width: 1128px){.navbar-container[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]{width:90%}.navbar-container[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   .nav-lang[_ngcontent-%COMP%]{height:100%;width:100%;z-index:99;background-color:#061121;position:fixed;flex-direction:column;align-items:center;justify-content:flex-start;top:0;right:0;display:flex;transform:translate(-100%);transition:all ease-in-out .4s}.navbar-container[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   .nav-lang[_ngcontent-%COMP%]   .main-nav[_ngcontent-%COMP%]{margin-top:210px;width:100%}.navbar-container[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   .nav-lang[_ngcontent-%COMP%]   .main-nav[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]{margin-right:0}.navbar-container[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   .nav-lang[_ngcontent-%COMP%]   .sign-btns[_ngcontent-%COMP%]{width:100%;margin-left:0;margin-top:40px}.navbar-container[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   .nav-lang[_ngcontent-%COMP%]   .sign-btns[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]{margin-right:0}.navbar-container[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   .nav-lang[_ngcontent-%COMP%]   nav[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%]{display:flex;flex-direction:column}.navbar-container[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   .nav-lang[_ngcontent-%COMP%]   nav[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%]:focus{background-color:#1199fa}.navbar-container[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   .nav-lang[_ngcontent-%COMP%]   nav[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]{letter-spacing:1.5px;width:100%;padding:10px 0;font-size:30px;font-weight:700;display:inline-block}.navbar-container[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   .nav-lang[_ngcontent-%COMP%]   .mobile-nav[_ngcontent-%COMP%]{display:block;position:absolute;top:15px;right:20px;display:flex;justify-content:space-between;width:90%}.navbar-container[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   .nav-lang[_ngcontent-%COMP%]   .mobile-nav[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%]{padding:5px}.navbar-container[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   .nav-lang[_ngcontent-%COMP%]   .mobile-nav[_ngcontent-%COMP%]   .close-menu[_ngcontent-%COMP%]{font-size:35px;padding:5px}.navbar-container[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   .nav-lang.mobileMenu[_ngcontent-%COMP%]{transform:translate(0)}.navbar-container[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   .nav-lang.none[_ngcontent-%COMP%]{display:flex;transform:translate(-100%)}.navbar-container[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   .burger-menu[_ngcontent-%COMP%]{display:block;font-size:30px;padding:3px;color:#b5b0b0}}",
              ],
            })),
            n
          );
        })(),
        w8 = (() => {
          class n {
            constructor() {
              this.title = "crypto-project";
            }
          }
          return (
            (n.ɵfac = function (t) {
              return new (t || n)();
            }),
            (n.ɵcmp = qt({
              type: n,
              selectors: [["app-root"]],
              decls: 2,
              vars: 0,
              template: function (t, r) {
                1 & t && re(0, "app-header")(1, "router-outlet");
              },
              dependencies: [Dp, b8],
              styles: [
                ".news[_ngcontent-%COMP%]{height:1052.33px;overflow:hidden}",
              ],
            })),
            n
          );
        })();
      function V1(n) {
        return new M(3e3, !1);
      }
      function rL() {
        return typeof window < "u" && typeof window.document < "u";
      }
      function Jp() {
        return (
          typeof process < "u" &&
          "[object process]" === {}.toString.call(process)
        );
      }
      function bo(n) {
        switch (n.length) {
          case 0:
            return new Na();
          case 1:
            return n[0];
          default:
            return new YM(n);
        }
      }
      function B1(n, e, t, r, o = new Map(), i = new Map()) {
        const s = [],
          a = [];
        let c = -1,
          l = null;
        if (
          (r.forEach((u) => {
            const d = u.get("offset"),
              f = d == c,
              h = (f && l) || new Map();
            u.forEach((p, m) => {
              let y = m,
                C = p;
              if ("offset" !== m)
                switch (((y = e.normalizePropertyName(y, s)), C)) {
                  case "!":
                    C = o.get(m);
                    break;
                  case Yr:
                    C = i.get(m);
                    break;
                  default:
                    C = e.normalizeStyleValue(m, y, C, s);
                }
              h.set(y, C);
            }),
              f || a.push(h),
              (l = h),
              (c = d);
          }),
          s.length)
        )
          throw (function G8(n) {
            return new M(3502, !1);
          })();
        return a;
      }
      function Xp(n, e, t, r) {
        switch (e) {
          case "start":
            n.onStart(() => r(t && eg(t, "start", n)));
            break;
          case "done":
            n.onDone(() => r(t && eg(t, "done", n)));
            break;
          case "destroy":
            n.onDestroy(() => r(t && eg(t, "destroy", n)));
        }
      }
      function eg(n, e, t) {
        const i = tg(
            n.element,
            n.triggerName,
            n.fromState,
            n.toState,
            e || n.phaseName,
            t.totalTime ?? n.totalTime,
            !!t.disabled
          ),
          s = n._data;
        return null != s && (i._data = s), i;
      }
      function tg(n, e, t, r, o = "", i = 0, s) {
        return {
          element: n,
          triggerName: e,
          fromState: t,
          toState: r,
          phaseName: o,
          totalTime: i,
          disabled: !!s,
        };
      }
      function Mn(n, e, t) {
        let r = n.get(e);
        return r || n.set(e, (r = t)), r;
      }
      function j1(n) {
        const e = n.indexOf(":");
        return [n.substring(1, e), n.slice(e + 1)];
      }
      let ng = (n, e) => !1,
        U1 = (n, e, t) => [],
        $1 = null;
      function rg(n) {
        const e = n.parentNode || n.host;
        return e === $1 ? null : e;
      }
      (Jp() || typeof Element < "u") &&
        (rL()
          ? (($1 = (() => document.documentElement)()),
            (ng = (n, e) => {
              for (; e; ) {
                if (e === n) return !0;
                e = rg(e);
              }
              return !1;
            }))
          : (ng = (n, e) => n.contains(e)),
        (U1 = (n, e, t) => {
          if (t) return Array.from(n.querySelectorAll(e));
          const r = n.querySelector(e);
          return r ? [r] : [];
        }));
      let ti = null,
        H1 = !1;
      const z1 = ng,
        G1 = U1;
      let W1 = (() => {
          class n {
            validateStyleProperty(t) {
              return (function iL(n) {
                ti ||
                  ((ti =
                    (function sL() {
                      return typeof document < "u" ? document.body : null;
                    })() || {}),
                  (H1 = !!ti.style && "WebkitAppearance" in ti.style));
                let e = !0;
                return (
                  ti.style &&
                    !(function oL(n) {
                      return "ebkit" == n.substring(1, 6);
                    })(n) &&
                    ((e = n in ti.style),
                    !e &&
                      H1 &&
                      (e =
                        "Webkit" + n.charAt(0).toUpperCase() + n.slice(1) in
                        ti.style)),
                  e
                );
              })(t);
            }
            matchesElement(t, r) {
              return !1;
            }
            containsElement(t, r) {
              return z1(t, r);
            }
            getParentElement(t) {
              return rg(t);
            }
            query(t, r, o) {
              return G1(t, r, o);
            }
            computeStyle(t, r, o) {
              return o || "";
            }
            animate(t, r, o, i, s, a = [], c) {
              return new Na(o, i);
            }
          }
          return (
            (n.ɵfac = function (t) {
              return new (t || n)();
            }),
            (n.ɵprov = R({ token: n, factory: n.ɵfac })),
            n
          );
        })(),
        og = (() => {
          class n {}
          return (n.NOOP = new W1()), n;
        })();
      const ig = "ng-enter",
        gu = "ng-leave",
        mu = "ng-trigger",
        _u = ".ng-trigger",
        K1 = "ng-animating",
        sg = ".ng-animating";
      function wo(n) {
        if ("number" == typeof n) return n;
        const e = n.match(/^(-?[\.\d]+)(m?s)/);
        return !e || e.length < 2 ? 0 : ag(parseFloat(e[1]), e[2]);
      }
      function ag(n, e) {
        return "s" === e ? 1e3 * n : n;
      }
      function yu(n, e, t) {
        return n.hasOwnProperty("duration")
          ? n
          : (function lL(n, e, t) {
              let o,
                i = 0,
                s = "";
              if ("string" == typeof n) {
                const a = n.match(
                  /^(-?[\.\d]+)(m?s)(?:\s+(-?[\.\d]+)(m?s))?(?:\s+([-a-z]+(?:\(.+?\))?))?$/i
                );
                if (null === a)
                  return e.push(V1()), { duration: 0, delay: 0, easing: "" };
                o = ag(parseFloat(a[1]), a[2]);
                const c = a[3];
                null != c && (i = ag(parseFloat(c), a[4]));
                const l = a[5];
                l && (s = l);
              } else o = n;
              if (!t) {
                let a = !1,
                  c = e.length;
                o < 0 &&
                  (e.push(
                    (function M8() {
                      return new M(3100, !1);
                    })()
                  ),
                  (a = !0)),
                  i < 0 &&
                    (e.push(
                      (function D8() {
                        return new M(3101, !1);
                      })()
                    ),
                    (a = !0)),
                  a && e.splice(c, 0, V1());
              }
              return { duration: o, delay: i, easing: s };
            })(n, e, t);
      }
      function Ha(n, e = {}) {
        return (
          Object.keys(n).forEach((t) => {
            e[t] = n[t];
          }),
          e
        );
      }
      function Q1(n) {
        const e = new Map();
        return (
          Object.keys(n).forEach((t) => {
            e.set(t, n[t]);
          }),
          e
        );
      }
      function Mo(n, e = new Map(), t) {
        if (t) for (let [r, o] of t) e.set(r, o);
        for (let [r, o] of n) e.set(r, o);
        return e;
      }
      function Y1(n, e, t) {
        return t ? e + ":" + t + ";" : "";
      }
      function J1(n) {
        let e = "";
        for (let t = 0; t < n.style.length; t++) {
          const r = n.style.item(t);
          e += Y1(0, r, n.style.getPropertyValue(r));
        }
        for (const t in n.style)
          n.style.hasOwnProperty(t) &&
            !t.startsWith("_") &&
            (e += Y1(0, hL(t), n.style[t]));
        n.setAttribute("style", e);
      }
      function Pr(n, e, t) {
        n.style &&
          (e.forEach((r, o) => {
            const i = lg(o);
            t && !t.has(o) && t.set(o, n.style[i]), (n.style[i] = r);
          }),
          Jp() && J1(n));
      }
      function ni(n, e) {
        n.style &&
          (e.forEach((t, r) => {
            const o = lg(r);
            n.style[o] = "";
          }),
          Jp() && J1(n));
      }
      function za(n) {
        return Array.isArray(n) ? (1 == n.length ? n[0] : qM(n)) : n;
      }
      const cg = new RegExp("{{\\s*(.+?)\\s*}}", "g");
      function X1(n) {
        let e = [];
        if ("string" == typeof n) {
          let t;
          for (; (t = cg.exec(n)); ) e.push(t[1]);
          cg.lastIndex = 0;
        }
        return e;
      }
      function vu(n, e, t) {
        const r = n.toString(),
          o = r.replace(cg, (i, s) => {
            let a = e[s];
            return (
              null == a &&
                (t.push(
                  (function O8(n) {
                    return new M(3003, !1);
                  })()
                ),
                (a = "")),
              a.toString()
            );
          });
        return o == r ? n : o;
      }
      function Cu(n) {
        const e = [];
        let t = n.next();
        for (; !t.done; ) e.push(t.value), (t = n.next());
        return e;
      }
      const fL = /-+([a-z0-9])/g;
      function lg(n) {
        return n.replace(fL, (...e) => e[1].toUpperCase());
      }
      function hL(n) {
        return n.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
      }
      function Dn(n, e, t) {
        switch (e.type) {
          case 7:
            return n.visitTrigger(e, t);
          case 0:
            return n.visitState(e, t);
          case 1:
            return n.visitTransition(e, t);
          case 2:
            return n.visitSequence(e, t);
          case 3:
            return n.visitGroup(e, t);
          case 4:
            return n.visitAnimate(e, t);
          case 5:
            return n.visitKeyframes(e, t);
          case 6:
            return n.visitStyle(e, t);
          case 8:
            return n.visitReference(e, t);
          case 9:
            return n.visitAnimateChild(e, t);
          case 10:
            return n.visitAnimateRef(e, t);
          case 11:
            return n.visitQuery(e, t);
          case 12:
            return n.visitStagger(e, t);
          default:
            throw (function P8(n) {
              return new M(3004, !1);
            })();
        }
      }
      function eD(n, e) {
        return window.getComputedStyle(n)[e];
      }
      function vL(n, e) {
        const t = [];
        return (
          "string" == typeof n
            ? n.split(/\s*,\s*/).forEach((r) =>
                (function CL(n, e, t) {
                  if (":" == n[0]) {
                    const c = (function bL(n, e) {
                      switch (n) {
                        case ":enter":
                          return "void => *";
                        case ":leave":
                          return "* => void";
                        case ":increment":
                          return (t, r) => parseFloat(r) > parseFloat(t);
                        case ":decrement":
                          return (t, r) => parseFloat(r) < parseFloat(t);
                        default:
                          return (
                            e.push(
                              (function U8(n) {
                                return new M(3016, !1);
                              })()
                            ),
                            "* => *"
                          );
                      }
                    })(n, t);
                    if ("function" == typeof c) return void e.push(c);
                    n = c;
                  }
                  const r = n.match(/^(\*|[-\w]+)\s*(<?[=-]>)\s*(\*|[-\w]+)$/);
                  if (null == r || r.length < 4)
                    return (
                      t.push(
                        (function j8(n) {
                          return new M(3015, !1);
                        })()
                      ),
                      e
                    );
                  const o = r[1],
                    i = r[2],
                    s = r[3];
                  e.push(tD(o, s));
                  "<" == i[0] && !("*" == o && "*" == s) && e.push(tD(s, o));
                })(r, t, e)
              )
            : t.push(n),
          t
        );
      }
      const Du = new Set(["true", "1"]),
        Eu = new Set(["false", "0"]);
      function tD(n, e) {
        const t = Du.has(n) || Eu.has(n),
          r = Du.has(e) || Eu.has(e);
        return (o, i) => {
          let s = "*" == n || n == o,
            a = "*" == e || e == i;
          return (
            !s && t && "boolean" == typeof o && (s = o ? Du.has(n) : Eu.has(n)),
            !a && r && "boolean" == typeof i && (a = i ? Du.has(e) : Eu.has(e)),
            s && a
          );
        };
      }
      const wL = new RegExp("s*:selfs*,?", "g");
      function ug(n, e, t, r) {
        return new ML(n).build(e, t, r);
      }
      class ML {
        constructor(e) {
          this._driver = e;
        }
        build(e, t, r) {
          const o = new OL(t);
          return this._resetContextStyleTimingState(o), Dn(this, za(e), o);
        }
        _resetContextStyleTimingState(e) {
          (e.currentQuerySelector = ""),
            (e.collectedStyles = new Map()),
            e.collectedStyles.set("", new Map()),
            (e.currentTime = 0);
        }
        visitTrigger(e, t) {
          let r = (t.queryCount = 0),
            o = (t.depCount = 0);
          const i = [],
            s = [];
          return (
            "@" == e.name.charAt(0) &&
              t.errors.push(
                (function S8() {
                  return new M(3006, !1);
                })()
              ),
            e.definitions.forEach((a) => {
              if ((this._resetContextStyleTimingState(t), 0 == a.type)) {
                const c = a,
                  l = c.name;
                l
                  .toString()
                  .split(/\s*,\s*/)
                  .forEach((u) => {
                    (c.name = u), i.push(this.visitState(c, t));
                  }),
                  (c.name = l);
              } else if (1 == a.type) {
                const c = this.visitTransition(a, t);
                (r += c.queryCount), (o += c.depCount), s.push(c);
              } else
                t.errors.push(
                  (function A8() {
                    return new M(3007, !1);
                  })()
                );
            }),
            {
              type: 7,
              name: e.name,
              states: i,
              transitions: s,
              queryCount: r,
              depCount: o,
              options: null,
            }
          );
        }
        visitState(e, t) {
          const r = this.visitStyle(e.styles, t),
            o = (e.options && e.options.params) || null;
          if (r.containsDynamicStyles) {
            const i = new Set(),
              s = o || {};
            r.styles.forEach((a) => {
              a instanceof Map &&
                a.forEach((c) => {
                  X1(c).forEach((l) => {
                    s.hasOwnProperty(l) || i.add(l);
                  });
                });
            }),
              i.size &&
                (Cu(i.values()),
                t.errors.push(
                  (function T8(n, e) {
                    return new M(3008, !1);
                  })()
                ));
          }
          return {
            type: 0,
            name: e.name,
            style: r,
            options: o ? { params: o } : null,
          };
        }
        visitTransition(e, t) {
          (t.queryCount = 0), (t.depCount = 0);
          const r = Dn(this, za(e.animation), t);
          return {
            type: 1,
            matchers: vL(e.expr, t.errors),
            animation: r,
            queryCount: t.queryCount,
            depCount: t.depCount,
            options: ri(e.options),
          };
        }
        visitSequence(e, t) {
          return {
            type: 2,
            steps: e.steps.map((r) => Dn(this, r, t)),
            options: ri(e.options),
          };
        }
        visitGroup(e, t) {
          const r = t.currentTime;
          let o = 0;
          const i = e.steps.map((s) => {
            t.currentTime = r;
            const a = Dn(this, s, t);
            return (o = Math.max(o, t.currentTime)), a;
          });
          return (
            (t.currentTime = o), { type: 3, steps: i, options: ri(e.options) }
          );
        }
        visitAnimate(e, t) {
          const r = (function xL(n, e) {
            if (n.hasOwnProperty("duration")) return n;
            if ("number" == typeof n) return dg(yu(n, e).duration, 0, "");
            const t = n;
            if (
              t
                .split(/\s+/)
                .some((i) => "{" == i.charAt(0) && "{" == i.charAt(1))
            ) {
              const i = dg(0, 0, "");
              return (i.dynamic = !0), (i.strValue = t), i;
            }
            const o = yu(t, e);
            return dg(o.duration, o.delay, o.easing);
          })(e.timings, t.errors);
          t.currentAnimateTimings = r;
          let o,
            i = e.styles ? e.styles : su({});
          if (5 == i.type) o = this.visitKeyframes(i, t);
          else {
            let s = e.styles,
              a = !1;
            if (!s) {
              a = !0;
              const l = {};
              r.easing && (l.easing = r.easing), (s = su(l));
            }
            t.currentTime += r.duration + r.delay;
            const c = this.visitStyle(s, t);
            (c.isEmptyStep = a), (o = c);
          }
          return (
            (t.currentAnimateTimings = null),
            { type: 4, timings: r, style: o, options: null }
          );
        }
        visitStyle(e, t) {
          const r = this._makeStyleAst(e, t);
          return this._validateStyleAst(r, t), r;
        }
        _makeStyleAst(e, t) {
          const r = [],
            o = Array.isArray(e.styles) ? e.styles : [e.styles];
          for (let a of o)
            "string" == typeof a
              ? a === Yr
                ? r.push(a)
                : t.errors.push(new M(3002, !1))
              : r.push(Q1(a));
          let i = !1,
            s = null;
          return (
            r.forEach((a) => {
              if (
                a instanceof Map &&
                (a.has("easing") && ((s = a.get("easing")), a.delete("easing")),
                !i)
              )
                for (let c of a.values())
                  if (c.toString().indexOf("{{") >= 0) {
                    i = !0;
                    break;
                  }
            }),
            {
              type: 6,
              styles: r,
              easing: s,
              offset: e.offset,
              containsDynamicStyles: i,
              options: null,
            }
          );
        }
        _validateStyleAst(e, t) {
          const r = t.currentAnimateTimings;
          let o = t.currentTime,
            i = t.currentTime;
          r && i > 0 && (i -= r.duration + r.delay),
            e.styles.forEach((s) => {
              "string" != typeof s &&
                s.forEach((a, c) => {
                  const l = t.collectedStyles.get(t.currentQuerySelector),
                    u = l.get(c);
                  let d = !0;
                  u &&
                    (i != o &&
                      i >= u.startTime &&
                      o <= u.endTime &&
                      (t.errors.push(
                        (function k8(n, e, t, r, o) {
                          return new M(3010, !1);
                        })()
                      ),
                      (d = !1)),
                    (i = u.startTime)),
                    d && l.set(c, { startTime: i, endTime: o }),
                    t.options &&
                      (function dL(n, e, t) {
                        const r = e.params || {},
                          o = X1(n);
                        o.length &&
                          o.forEach((i) => {
                            r.hasOwnProperty(i) ||
                              t.push(
                                (function E8(n) {
                                  return new M(3001, !1);
                                })()
                              );
                          });
                      })(a, t.options, t.errors);
                });
            });
        }
        visitKeyframes(e, t) {
          const r = { type: 5, styles: [], options: null };
          if (!t.currentAnimateTimings)
            return (
              t.errors.push(
                (function N8() {
                  return new M(3011, !1);
                })()
              ),
              r
            );
          let i = 0;
          const s = [];
          let a = !1,
            c = !1,
            l = 0;
          const u = e.steps.map((C) => {
            const O = this._makeStyleAst(C, t);
            let b =
                null != O.offset
                  ? O.offset
                  : (function PL(n) {
                      if ("string" == typeof n) return null;
                      let e = null;
                      if (Array.isArray(n))
                        n.forEach((t) => {
                          if (t instanceof Map && t.has("offset")) {
                            const r = t;
                            (e = parseFloat(r.get("offset"))),
                              r.delete("offset");
                          }
                        });
                      else if (n instanceof Map && n.has("offset")) {
                        const t = n;
                        (e = parseFloat(t.get("offset"))), t.delete("offset");
                      }
                      return e;
                    })(O.styles),
              x = 0;
            return (
              null != b && (i++, (x = O.offset = b)),
              (c = c || x < 0 || x > 1),
              (a = a || x < l),
              (l = x),
              s.push(x),
              O
            );
          });
          c &&
            t.errors.push(
              (function R8() {
                return new M(3012, !1);
              })()
            ),
            a &&
              t.errors.push(
                (function F8() {
                  return new M(3200, !1);
                })()
              );
          const d = e.steps.length;
          let f = 0;
          i > 0 && i < d
            ? t.errors.push(
                (function L8() {
                  return new M(3202, !1);
                })()
              )
            : 0 == i && (f = 1 / (d - 1));
          const h = d - 1,
            p = t.currentTime,
            m = t.currentAnimateTimings,
            y = m.duration;
          return (
            u.forEach((C, O) => {
              const b = f > 0 ? (O == h ? 1 : f * O) : s[O],
                x = b * y;
              (t.currentTime = p + m.delay + x),
                (m.duration = x),
                this._validateStyleAst(C, t),
                (C.offset = b),
                r.styles.push(C);
            }),
            r
          );
        }
        visitReference(e, t) {
          return {
            type: 8,
            animation: Dn(this, za(e.animation), t),
            options: ri(e.options),
          };
        }
        visitAnimateChild(e, t) {
          return t.depCount++, { type: 9, options: ri(e.options) };
        }
        visitAnimateRef(e, t) {
          return {
            type: 10,
            animation: this.visitReference(e.animation, t),
            options: ri(e.options),
          };
        }
        visitQuery(e, t) {
          const r = t.currentQuerySelector,
            o = e.options || {};
          t.queryCount++, (t.currentQuery = e);
          const [i, s] = (function DL(n) {
            const e = !!n.split(/\s*,\s*/).find((t) => ":self" == t);
            return (
              e && (n = n.replace(wL, "")),
              (n = n
                .replace(/@\*/g, _u)
                .replace(/@\w+/g, (t) => _u + "-" + t.slice(1))
                .replace(/:animating/g, sg)),
              [n, e]
            );
          })(e.selector);
          (t.currentQuerySelector = r.length ? r + " " + i : i),
            Mn(t.collectedStyles, t.currentQuerySelector, new Map());
          const a = Dn(this, za(e.animation), t);
          return (
            (t.currentQuery = null),
            (t.currentQuerySelector = r),
            {
              type: 11,
              selector: i,
              limit: o.limit || 0,
              optional: !!o.optional,
              includeSelf: s,
              animation: a,
              originalSelector: e.selector,
              options: ri(e.options),
            }
          );
        }
        visitStagger(e, t) {
          t.currentQuery ||
            t.errors.push(
              (function V8() {
                return new M(3013, !1);
              })()
            );
          const r =
            "full" === e.timings
              ? { duration: 0, delay: 0, easing: "full" }
              : yu(e.timings, t.errors, !0);
          return {
            type: 12,
            animation: Dn(this, za(e.animation), t),
            timings: r,
            options: null,
          };
        }
      }
      class OL {
        constructor(e) {
          (this.errors = e),
            (this.queryCount = 0),
            (this.depCount = 0),
            (this.currentTransition = null),
            (this.currentQuery = null),
            (this.currentQuerySelector = null),
            (this.currentAnimateTimings = null),
            (this.currentTime = 0),
            (this.collectedStyles = new Map()),
            (this.options = null),
            (this.unsupportedCSSPropertiesFound = new Set());
        }
      }
      function ri(n) {
        return (
          n
            ? (n = Ha(n)).params &&
              (n.params = (function EL(n) {
                return n ? Ha(n) : null;
              })(n.params))
            : (n = {}),
          n
        );
      }
      function dg(n, e, t) {
        return { duration: n, delay: e, easing: t };
      }
      function fg(n, e, t, r, o, i, s = null, a = !1) {
        return {
          type: 1,
          element: n,
          keyframes: e,
          preStyleProps: t,
          postStyleProps: r,
          duration: o,
          delay: i,
          totalTime: o + i,
          easing: s,
          subTimeline: a,
        };
      }
      class Ou {
        constructor() {
          this._map = new Map();
        }
        get(e) {
          return this._map.get(e) || [];
        }
        append(e, t) {
          let r = this._map.get(e);
          r || this._map.set(e, (r = [])), r.push(...t);
        }
        has(e) {
          return this._map.has(e);
        }
        clear() {
          this._map.clear();
        }
      }
      const TL = new RegExp(":enter", "g"),
        kL = new RegExp(":leave", "g");
      function hg(n, e, t, r, o, i = new Map(), s = new Map(), a, c, l = []) {
        return new NL().buildKeyframes(n, e, t, r, o, i, s, a, c, l);
      }
      class NL {
        buildKeyframes(e, t, r, o, i, s, a, c, l, u = []) {
          l = l || new Ou();
          const d = new pg(e, t, l, o, i, u, []);
          d.options = c;
          const f = c.delay ? wo(c.delay) : 0;
          d.currentTimeline.delayNextStep(f),
            d.currentTimeline.setStyles([s], null, d.errors, c),
            Dn(this, r, d);
          const h = d.timelines.filter((p) => p.containsAnimation());
          if (h.length && a.size) {
            let p;
            for (let m = h.length - 1; m >= 0; m--) {
              const y = h[m];
              if (y.element === t) {
                p = y;
                break;
              }
            }
            p &&
              !p.allowOnlyTimelineStyles() &&
              p.setStyles([a], null, d.errors, c);
          }
          return h.length
            ? h.map((p) => p.buildKeyframes())
            : [fg(t, [], [], [], 0, f, "", !1)];
        }
        visitTrigger(e, t) {}
        visitState(e, t) {}
        visitTransition(e, t) {}
        visitAnimateChild(e, t) {
          const r = t.subInstructions.get(t.element);
          if (r) {
            const o = t.createSubContext(e.options),
              i = t.currentTimeline.currentTime,
              s = this._visitSubInstructions(r, o, o.options);
            i != s && t.transformIntoNewTimeline(s);
          }
          t.previousNode = e;
        }
        visitAnimateRef(e, t) {
          const r = t.createSubContext(e.options);
          r.transformIntoNewTimeline(),
            this.visitReference(e.animation, r),
            t.transformIntoNewTimeline(r.currentTimeline.currentTime),
            (t.previousNode = e);
        }
        _visitSubInstructions(e, t, r) {
          let i = t.currentTimeline.currentTime;
          const s = null != r.duration ? wo(r.duration) : null,
            a = null != r.delay ? wo(r.delay) : null;
          return (
            0 !== s &&
              e.forEach((c) => {
                const l = t.appendInstructionToTimeline(c, s, a);
                i = Math.max(i, l.duration + l.delay);
              }),
            i
          );
        }
        visitReference(e, t) {
          t.updateOptions(e.options, !0),
            Dn(this, e.animation, t),
            (t.previousNode = e);
        }
        visitSequence(e, t) {
          const r = t.subContextCount;
          let o = t;
          const i = e.options;
          if (
            i &&
            (i.params || i.delay) &&
            ((o = t.createSubContext(i)),
            o.transformIntoNewTimeline(),
            null != i.delay)
          ) {
            6 == o.previousNode.type &&
              (o.currentTimeline.snapshotCurrentStyles(),
              (o.previousNode = Pu));
            const s = wo(i.delay);
            o.delayNextStep(s);
          }
          e.steps.length &&
            (e.steps.forEach((s) => Dn(this, s, o)),
            o.currentTimeline.applyStylesToKeyframe(),
            o.subContextCount > r && o.transformIntoNewTimeline()),
            (t.previousNode = e);
        }
        visitGroup(e, t) {
          const r = [];
          let o = t.currentTimeline.currentTime;
          const i = e.options && e.options.delay ? wo(e.options.delay) : 0;
          e.steps.forEach((s) => {
            const a = t.createSubContext(e.options);
            i && a.delayNextStep(i),
              Dn(this, s, a),
              (o = Math.max(o, a.currentTimeline.currentTime)),
              r.push(a.currentTimeline);
          }),
            r.forEach((s) => t.currentTimeline.mergeTimelineCollectedStyles(s)),
            t.transformIntoNewTimeline(o),
            (t.previousNode = e);
        }
        _visitTiming(e, t) {
          if (e.dynamic) {
            const r = e.strValue;
            return yu(t.params ? vu(r, t.params, t.errors) : r, t.errors);
          }
          return { duration: e.duration, delay: e.delay, easing: e.easing };
        }
        visitAnimate(e, t) {
          const r = (t.currentAnimateTimings = this._visitTiming(e.timings, t)),
            o = t.currentTimeline;
          r.delay && (t.incrementTime(r.delay), o.snapshotCurrentStyles());
          const i = e.style;
          5 == i.type
            ? this.visitKeyframes(i, t)
            : (t.incrementTime(r.duration),
              this.visitStyle(i, t),
              o.applyStylesToKeyframe()),
            (t.currentAnimateTimings = null),
            (t.previousNode = e);
        }
        visitStyle(e, t) {
          const r = t.currentTimeline,
            o = t.currentAnimateTimings;
          !o && r.hasCurrentStyleProperties() && r.forwardFrame();
          const i = (o && o.easing) || e.easing;
          e.isEmptyStep
            ? r.applyEmptyStep(i)
            : r.setStyles(e.styles, i, t.errors, t.options),
            (t.previousNode = e);
        }
        visitKeyframes(e, t) {
          const r = t.currentAnimateTimings,
            o = t.currentTimeline.duration,
            i = r.duration,
            a = t.createSubContext().currentTimeline;
          (a.easing = r.easing),
            e.styles.forEach((c) => {
              a.forwardTime((c.offset || 0) * i),
                a.setStyles(c.styles, c.easing, t.errors, t.options),
                a.applyStylesToKeyframe();
            }),
            t.currentTimeline.mergeTimelineCollectedStyles(a),
            t.transformIntoNewTimeline(o + i),
            (t.previousNode = e);
        }
        visitQuery(e, t) {
          const r = t.currentTimeline.currentTime,
            o = e.options || {},
            i = o.delay ? wo(o.delay) : 0;
          i &&
            (6 === t.previousNode.type ||
              (0 == r && t.currentTimeline.hasCurrentStyleProperties())) &&
            (t.currentTimeline.snapshotCurrentStyles(), (t.previousNode = Pu));
          let s = r;
          const a = t.invokeQuery(
            e.selector,
            e.originalSelector,
            e.limit,
            e.includeSelf,
            !!o.optional,
            t.errors
          );
          t.currentQueryTotal = a.length;
          let c = null;
          a.forEach((l, u) => {
            t.currentQueryIndex = u;
            const d = t.createSubContext(e.options, l);
            i && d.delayNextStep(i),
              l === t.element && (c = d.currentTimeline),
              Dn(this, e.animation, d),
              d.currentTimeline.applyStylesToKeyframe(),
              (s = Math.max(s, d.currentTimeline.currentTime));
          }),
            (t.currentQueryIndex = 0),
            (t.currentQueryTotal = 0),
            t.transformIntoNewTimeline(s),
            c &&
              (t.currentTimeline.mergeTimelineCollectedStyles(c),
              t.currentTimeline.snapshotCurrentStyles()),
            (t.previousNode = e);
        }
        visitStagger(e, t) {
          const r = t.parentContext,
            o = t.currentTimeline,
            i = e.timings,
            s = Math.abs(i.duration),
            a = s * (t.currentQueryTotal - 1);
          let c = s * t.currentQueryIndex;
          switch (i.duration < 0 ? "reverse" : i.easing) {
            case "reverse":
              c = a - c;
              break;
            case "full":
              c = r.currentStaggerTime;
          }
          const u = t.currentTimeline;
          c && u.delayNextStep(c);
          const d = u.currentTime;
          Dn(this, e.animation, t),
            (t.previousNode = e),
            (r.currentStaggerTime =
              o.currentTime - d + (o.startTime - r.currentTimeline.startTime));
        }
      }
      const Pu = {};
      class pg {
        constructor(e, t, r, o, i, s, a, c) {
          (this._driver = e),
            (this.element = t),
            (this.subInstructions = r),
            (this._enterClassName = o),
            (this._leaveClassName = i),
            (this.errors = s),
            (this.timelines = a),
            (this.parentContext = null),
            (this.currentAnimateTimings = null),
            (this.previousNode = Pu),
            (this.subContextCount = 0),
            (this.options = {}),
            (this.currentQueryIndex = 0),
            (this.currentQueryTotal = 0),
            (this.currentStaggerTime = 0),
            (this.currentTimeline = c || new xu(this._driver, t, 0)),
            a.push(this.currentTimeline);
        }
        get params() {
          return this.options.params;
        }
        updateOptions(e, t) {
          if (!e) return;
          const r = e;
          let o = this.options;
          null != r.duration && (o.duration = wo(r.duration)),
            null != r.delay && (o.delay = wo(r.delay));
          const i = r.params;
          if (i) {
            let s = o.params;
            s || (s = this.options.params = {}),
              Object.keys(i).forEach((a) => {
                (!t || !s.hasOwnProperty(a)) &&
                  (s[a] = vu(i[a], s, this.errors));
              });
          }
        }
        _copyOptions() {
          const e = {};
          if (this.options) {
            const t = this.options.params;
            if (t) {
              const r = (e.params = {});
              Object.keys(t).forEach((o) => {
                r[o] = t[o];
              });
            }
          }
          return e;
        }
        createSubContext(e = null, t, r) {
          const o = t || this.element,
            i = new pg(
              this._driver,
              o,
              this.subInstructions,
              this._enterClassName,
              this._leaveClassName,
              this.errors,
              this.timelines,
              this.currentTimeline.fork(o, r || 0)
            );
          return (
            (i.previousNode = this.previousNode),
            (i.currentAnimateTimings = this.currentAnimateTimings),
            (i.options = this._copyOptions()),
            i.updateOptions(e),
            (i.currentQueryIndex = this.currentQueryIndex),
            (i.currentQueryTotal = this.currentQueryTotal),
            (i.parentContext = this),
            this.subContextCount++,
            i
          );
        }
        transformIntoNewTimeline(e) {
          return (
            (this.previousNode = Pu),
            (this.currentTimeline = this.currentTimeline.fork(this.element, e)),
            this.timelines.push(this.currentTimeline),
            this.currentTimeline
          );
        }
        appendInstructionToTimeline(e, t, r) {
          const o = {
              duration: t ?? e.duration,
              delay: this.currentTimeline.currentTime + (r ?? 0) + e.delay,
              easing: "",
            },
            i = new RL(
              this._driver,
              e.element,
              e.keyframes,
              e.preStyleProps,
              e.postStyleProps,
              o,
              e.stretchStartingKeyframe
            );
          return this.timelines.push(i), o;
        }
        incrementTime(e) {
          this.currentTimeline.forwardTime(this.currentTimeline.duration + e);
        }
        delayNextStep(e) {
          e > 0 && this.currentTimeline.delayNextStep(e);
        }
        invokeQuery(e, t, r, o, i, s) {
          let a = [];
          if ((o && a.push(this.element), e.length > 0)) {
            e = (e = e.replace(TL, "." + this._enterClassName)).replace(
              kL,
              "." + this._leaveClassName
            );
            let l = this._driver.query(this.element, e, 1 != r);
            0 !== r &&
              (l = r < 0 ? l.slice(l.length + r, l.length) : l.slice(0, r)),
              a.push(...l);
          }
          return (
            !i &&
              0 == a.length &&
              s.push(
                (function B8(n) {
                  return new M(3014, !1);
                })()
              ),
            a
          );
        }
      }
      class xu {
        constructor(e, t, r, o) {
          (this._driver = e),
            (this.element = t),
            (this.startTime = r),
            (this._elementTimelineStylesLookup = o),
            (this.duration = 0),
            (this._previousKeyframe = new Map()),
            (this._currentKeyframe = new Map()),
            (this._keyframes = new Map()),
            (this._styleSummary = new Map()),
            (this._localTimelineStyles = new Map()),
            (this._pendingStyles = new Map()),
            (this._backFill = new Map()),
            (this._currentEmptyStepKeyframe = null),
            this._elementTimelineStylesLookup ||
              (this._elementTimelineStylesLookup = new Map()),
            (this._globalTimelineStyles =
              this._elementTimelineStylesLookup.get(t)),
            this._globalTimelineStyles ||
              ((this._globalTimelineStyles = this._localTimelineStyles),
              this._elementTimelineStylesLookup.set(
                t,
                this._localTimelineStyles
              )),
            this._loadKeyframe();
        }
        containsAnimation() {
          switch (this._keyframes.size) {
            case 0:
              return !1;
            case 1:
              return this.hasCurrentStyleProperties();
            default:
              return !0;
          }
        }
        hasCurrentStyleProperties() {
          return this._currentKeyframe.size > 0;
        }
        get currentTime() {
          return this.startTime + this.duration;
        }
        delayNextStep(e) {
          const t = 1 === this._keyframes.size && this._pendingStyles.size;
          this.duration || t
            ? (this.forwardTime(this.currentTime + e),
              t && this.snapshotCurrentStyles())
            : (this.startTime += e);
        }
        fork(e, t) {
          return (
            this.applyStylesToKeyframe(),
            new xu(
              this._driver,
              e,
              t || this.currentTime,
              this._elementTimelineStylesLookup
            )
          );
        }
        _loadKeyframe() {
          this._currentKeyframe &&
            (this._previousKeyframe = this._currentKeyframe),
            (this._currentKeyframe = this._keyframes.get(this.duration)),
            this._currentKeyframe ||
              ((this._currentKeyframe = new Map()),
              this._keyframes.set(this.duration, this._currentKeyframe));
        }
        forwardFrame() {
          (this.duration += 1), this._loadKeyframe();
        }
        forwardTime(e) {
          this.applyStylesToKeyframe(),
            (this.duration = e),
            this._loadKeyframe();
        }
        _updateStyle(e, t) {
          this._localTimelineStyles.set(e, t),
            this._globalTimelineStyles.set(e, t),
            this._styleSummary.set(e, { time: this.currentTime, value: t });
        }
        allowOnlyTimelineStyles() {
          return this._currentEmptyStepKeyframe !== this._currentKeyframe;
        }
        applyEmptyStep(e) {
          e && this._previousKeyframe.set("easing", e);
          for (let [t, r] of this._globalTimelineStyles)
            this._backFill.set(t, r || Yr), this._currentKeyframe.set(t, Yr);
          this._currentEmptyStepKeyframe = this._currentKeyframe;
        }
        setStyles(e, t, r, o) {
          t && this._previousKeyframe.set("easing", t);
          const i = (o && o.params) || {},
            s = (function FL(n, e) {
              const t = new Map();
              let r;
              return (
                n.forEach((o) => {
                  if ("*" === o) {
                    r = r || e.keys();
                    for (let i of r) t.set(i, Yr);
                  } else Mo(o, t);
                }),
                t
              );
            })(e, this._globalTimelineStyles);
          for (let [a, c] of s) {
            const l = vu(c, i, r);
            this._pendingStyles.set(a, l),
              this._localTimelineStyles.has(a) ||
                this._backFill.set(a, this._globalTimelineStyles.get(a) ?? Yr),
              this._updateStyle(a, l);
          }
        }
        applyStylesToKeyframe() {
          0 != this._pendingStyles.size &&
            (this._pendingStyles.forEach((e, t) => {
              this._currentKeyframe.set(t, e);
            }),
            this._pendingStyles.clear(),
            this._localTimelineStyles.forEach((e, t) => {
              this._currentKeyframe.has(t) || this._currentKeyframe.set(t, e);
            }));
        }
        snapshotCurrentStyles() {
          for (let [e, t] of this._localTimelineStyles)
            this._pendingStyles.set(e, t), this._updateStyle(e, t);
        }
        getFinalKeyframe() {
          return this._keyframes.get(this.duration);
        }
        get properties() {
          const e = [];
          for (let t in this._currentKeyframe) e.push(t);
          return e;
        }
        mergeTimelineCollectedStyles(e) {
          e._styleSummary.forEach((t, r) => {
            const o = this._styleSummary.get(r);
            (!o || t.time > o.time) && this._updateStyle(r, t.value);
          });
        }
        buildKeyframes() {
          this.applyStylesToKeyframe();
          const e = new Set(),
            t = new Set(),
            r = 1 === this._keyframes.size && 0 === this.duration;
          let o = [];
          this._keyframes.forEach((a, c) => {
            const l = Mo(a, new Map(), this._backFill);
            l.forEach((u, d) => {
              "!" === u ? e.add(d) : u === Yr && t.add(d);
            }),
              r || l.set("offset", c / this.duration),
              o.push(l);
          });
          const i = e.size ? Cu(e.values()) : [],
            s = t.size ? Cu(t.values()) : [];
          if (r) {
            const a = o[0],
              c = new Map(a);
            a.set("offset", 0), c.set("offset", 1), (o = [a, c]);
          }
          return fg(
            this.element,
            o,
            i,
            s,
            this.duration,
            this.startTime,
            this.easing,
            !1
          );
        }
      }
      class RL extends xu {
        constructor(e, t, r, o, i, s, a = !1) {
          super(e, t, s.delay),
            (this.keyframes = r),
            (this.preStyleProps = o),
            (this.postStyleProps = i),
            (this._stretchStartingKeyframe = a),
            (this.timings = {
              duration: s.duration,
              delay: s.delay,
              easing: s.easing,
            });
        }
        containsAnimation() {
          return this.keyframes.length > 1;
        }
        buildKeyframes() {
          let e = this.keyframes,
            { delay: t, duration: r, easing: o } = this.timings;
          if (this._stretchStartingKeyframe && t) {
            const i = [],
              s = r + t,
              a = t / s,
              c = Mo(e[0]);
            c.set("offset", 0), i.push(c);
            const l = Mo(e[0]);
            l.set("offset", oD(a)), i.push(l);
            const u = e.length - 1;
            for (let d = 1; d <= u; d++) {
              let f = Mo(e[d]);
              const h = f.get("offset");
              f.set("offset", oD((t + h * r) / s)), i.push(f);
            }
            (r = s), (t = 0), (o = ""), (e = i);
          }
          return fg(
            this.element,
            e,
            this.preStyleProps,
            this.postStyleProps,
            r,
            t,
            o,
            !0
          );
        }
      }
      function oD(n, e = 3) {
        const t = Math.pow(10, e - 1);
        return Math.round(n * t) / t;
      }
      class gg {}
      const LL = new Set([
        "width",
        "height",
        "minWidth",
        "minHeight",
        "maxWidth",
        "maxHeight",
        "left",
        "top",
        "bottom",
        "right",
        "fontSize",
        "outlineWidth",
        "outlineOffset",
        "paddingTop",
        "paddingLeft",
        "paddingBottom",
        "paddingRight",
        "marginTop",
        "marginLeft",
        "marginBottom",
        "marginRight",
        "borderRadius",
        "borderWidth",
        "borderTopWidth",
        "borderLeftWidth",
        "borderRightWidth",
        "borderBottomWidth",
        "textIndent",
        "perspective",
      ]);
      class VL extends gg {
        normalizePropertyName(e, t) {
          return lg(e);
        }
        normalizeStyleValue(e, t, r, o) {
          let i = "";
          const s = r.toString().trim();
          if (LL.has(t) && 0 !== r && "0" !== r)
            if ("number" == typeof r) i = "px";
            else {
              const a = r.match(/^[+-]?[\d\.]+([a-z]*)$/);
              a &&
                0 == a[1].length &&
                o.push(
                  (function x8(n, e) {
                    return new M(3005, !1);
                  })()
                );
            }
          return s + i;
        }
      }
      function iD(n, e, t, r, o, i, s, a, c, l, u, d, f) {
        return {
          type: 0,
          element: n,
          triggerName: e,
          isRemovalTransition: o,
          fromState: t,
          fromStyles: i,
          toState: r,
          toStyles: s,
          timelines: a,
          queriedElements: c,
          preStyleProps: l,
          postStyleProps: u,
          totalTime: d,
          errors: f,
        };
      }
      const mg = {};
      class sD {
        constructor(e, t, r) {
          (this._triggerName = e), (this.ast = t), (this._stateStyles = r);
        }
        match(e, t, r, o) {
          return (function BL(n, e, t, r, o) {
            return n.some((i) => i(e, t, r, o));
          })(this.ast.matchers, e, t, r, o);
        }
        buildStyles(e, t, r) {
          let o = this._stateStyles.get("*");
          return (
            void 0 !== e && (o = this._stateStyles.get(e?.toString()) || o),
            o ? o.buildStyles(t, r) : new Map()
          );
        }
        build(e, t, r, o, i, s, a, c, l, u) {
          const d = [],
            f = (this.ast.options && this.ast.options.params) || mg,
            p = this.buildStyles(r, (a && a.params) || mg, d),
            m = (c && c.params) || mg,
            y = this.buildStyles(o, m, d),
            C = new Set(),
            O = new Map(),
            b = new Map(),
            x = "void" === o,
            Y = { params: jL(m, f), delay: this.ast.options?.delay },
            be = u ? [] : hg(e, t, this.ast.animation, i, s, p, y, Y, l, d);
          let tt = 0;
          if (
            (be.forEach((On) => {
              tt = Math.max(On.duration + On.delay, tt);
            }),
            d.length)
          )
            return iD(t, this._triggerName, r, o, x, p, y, [], [], O, b, tt, d);
          be.forEach((On) => {
            const Pn = On.element,
              us = Mn(O, Pn, new Set());
            On.preStyleProps.forEach((sr) => us.add(sr));
            const to = Mn(b, Pn, new Set());
            On.postStyleProps.forEach((sr) => to.add(sr)),
              Pn !== t && C.add(Pn);
          });
          const En = Cu(C.values());
          return iD(t, this._triggerName, r, o, x, p, y, be, En, O, b, tt);
        }
      }
      function jL(n, e) {
        const t = Ha(e);
        for (const r in n) n.hasOwnProperty(r) && null != n[r] && (t[r] = n[r]);
        return t;
      }
      class UL {
        constructor(e, t, r) {
          (this.styles = e), (this.defaultParams = t), (this.normalizer = r);
        }
        buildStyles(e, t) {
          const r = new Map(),
            o = Ha(this.defaultParams);
          return (
            Object.keys(e).forEach((i) => {
              const s = e[i];
              null !== s && (o[i] = s);
            }),
            this.styles.styles.forEach((i) => {
              "string" != typeof i &&
                i.forEach((s, a) => {
                  s && (s = vu(s, o, t));
                  const c = this.normalizer.normalizePropertyName(a, t);
                  (s = this.normalizer.normalizeStyleValue(a, c, s, t)),
                    r.set(c, s);
                });
            }),
            r
          );
        }
      }
      class HL {
        constructor(e, t, r) {
          (this.name = e),
            (this.ast = t),
            (this._normalizer = r),
            (this.transitionFactories = []),
            (this.states = new Map()),
            t.states.forEach((o) => {
              this.states.set(
                o.name,
                new UL(o.style, (o.options && o.options.params) || {}, r)
              );
            }),
            aD(this.states, "true", "1"),
            aD(this.states, "false", "0"),
            t.transitions.forEach((o) => {
              this.transitionFactories.push(new sD(e, o, this.states));
            }),
            (this.fallbackTransition = (function zL(n, e, t) {
              return new sD(
                n,
                {
                  type: 1,
                  animation: { type: 2, steps: [], options: null },
                  matchers: [(s, a) => !0],
                  options: null,
                  queryCount: 0,
                  depCount: 0,
                },
                e
              );
            })(e, this.states));
        }
        get containsQueries() {
          return this.ast.queryCount > 0;
        }
        matchTransition(e, t, r, o) {
          return (
            this.transitionFactories.find((s) => s.match(e, t, r, o)) || null
          );
        }
        matchStyles(e, t, r) {
          return this.fallbackTransition.buildStyles(e, t, r);
        }
      }
      function aD(n, e, t) {
        n.has(e)
          ? n.has(t) || n.set(t, n.get(e))
          : n.has(t) && n.set(e, n.get(t));
      }
      const GL = new Ou();
      class WL {
        constructor(e, t, r) {
          (this.bodyNode = e),
            (this._driver = t),
            (this._normalizer = r),
            (this._animations = new Map()),
            (this._playersById = new Map()),
            (this.players = []);
        }
        register(e, t) {
          const r = [],
            i = ug(this._driver, t, r, []);
          if (r.length)
            throw (function W8(n) {
              return new M(3503, !1);
            })();
          this._animations.set(e, i);
        }
        _buildPlayer(e, t, r) {
          const o = e.element,
            i = B1(0, this._normalizer, 0, e.keyframes, t, r);
          return this._driver.animate(
            o,
            i,
            e.duration,
            e.delay,
            e.easing,
            [],
            !0
          );
        }
        create(e, t, r = {}) {
          const o = [],
            i = this._animations.get(e);
          let s;
          const a = new Map();
          if (
            (i
              ? ((s = hg(
                  this._driver,
                  t,
                  i,
                  ig,
                  gu,
                  new Map(),
                  new Map(),
                  r,
                  GL,
                  o
                )),
                s.forEach((u) => {
                  const d = Mn(a, u.element, new Map());
                  u.postStyleProps.forEach((f) => d.set(f, null));
                }))
              : (o.push(
                  (function q8() {
                    return new M(3300, !1);
                  })()
                ),
                (s = [])),
            o.length)
          )
            throw (function K8(n) {
              return new M(3504, !1);
            })();
          a.forEach((u, d) => {
            u.forEach((f, h) => {
              u.set(h, this._driver.computeStyle(d, h, Yr));
            });
          });
          const l = bo(
            s.map((u) => {
              const d = a.get(u.element);
              return this._buildPlayer(u, new Map(), d);
            })
          );
          return (
            this._playersById.set(e, l),
            l.onDestroy(() => this.destroy(e)),
            this.players.push(l),
            l
          );
        }
        destroy(e) {
          const t = this._getPlayer(e);
          t.destroy(), this._playersById.delete(e);
          const r = this.players.indexOf(t);
          r >= 0 && this.players.splice(r, 1);
        }
        _getPlayer(e) {
          const t = this._playersById.get(e);
          if (!t)
            throw (function Q8(n) {
              return new M(3301, !1);
            })();
          return t;
        }
        listen(e, t, r, o) {
          const i = tg(t, "", "", "");
          return Xp(this._getPlayer(e), r, i, o), () => {};
        }
        command(e, t, r, o) {
          if ("register" == r) return void this.register(e, o[0]);
          if ("create" == r) return void this.create(e, t, o[0] || {});
          const i = this._getPlayer(e);
          switch (r) {
            case "play":
              i.play();
              break;
            case "pause":
              i.pause();
              break;
            case "reset":
              i.reset();
              break;
            case "restart":
              i.restart();
              break;
            case "finish":
              i.finish();
              break;
            case "init":
              i.init();
              break;
            case "setPosition":
              i.setPosition(parseFloat(o[0]));
              break;
            case "destroy":
              this.destroy(e);
          }
        }
      }
      const cD = "ng-animate-queued",
        _g = "ng-animate-disabled",
        YL = [],
        lD = {
          namespaceId: "",
          setForRemoval: !1,
          setForMove: !1,
          hasAnimation: !1,
          removedBeforeQueried: !1,
        },
        JL = {
          namespaceId: "",
          setForMove: !1,
          setForRemoval: !1,
          hasAnimation: !1,
          removedBeforeQueried: !0,
        },
        Un = "__ng_removed";
      class yg {
        constructor(e, t = "") {
          this.namespaceId = t;
          const r = e && e.hasOwnProperty("value");
          if (
            ((this.value = (function n6(n) {
              return n ?? null;
            })(r ? e.value : e)),
            r)
          ) {
            const i = Ha(e);
            delete i.value, (this.options = i);
          } else this.options = {};
          this.options.params || (this.options.params = {});
        }
        get params() {
          return this.options.params;
        }
        absorbOptions(e) {
          const t = e.params;
          if (t) {
            const r = this.options.params;
            Object.keys(t).forEach((o) => {
              null == r[o] && (r[o] = t[o]);
            });
          }
        }
      }
      const Ga = "void",
        vg = new yg(Ga);
      class XL {
        constructor(e, t, r) {
          (this.id = e),
            (this.hostElement = t),
            (this._engine = r),
            (this.players = []),
            (this._triggers = new Map()),
            (this._queue = []),
            (this._elementListeners = new Map()),
            (this._hostClassName = "ng-tns-" + e),
            $n(t, this._hostClassName);
        }
        listen(e, t, r, o) {
          if (!this._triggers.has(t))
            throw (function Z8(n, e) {
              return new M(3302, !1);
            })();
          if (null == r || 0 == r.length)
            throw (function Y8(n) {
              return new M(3303, !1);
            })();
          if (
            !(function r6(n) {
              return "start" == n || "done" == n;
            })(r)
          )
            throw (function J8(n, e) {
              return new M(3400, !1);
            })();
          const i = Mn(this._elementListeners, e, []),
            s = { name: t, phase: r, callback: o };
          i.push(s);
          const a = Mn(this._engine.statesByElement, e, new Map());
          return (
            a.has(t) || ($n(e, mu), $n(e, mu + "-" + t), a.set(t, vg)),
            () => {
              this._engine.afterFlush(() => {
                const c = i.indexOf(s);
                c >= 0 && i.splice(c, 1), this._triggers.has(t) || a.delete(t);
              });
            }
          );
        }
        register(e, t) {
          return !this._triggers.has(e) && (this._triggers.set(e, t), !0);
        }
        _getTrigger(e) {
          const t = this._triggers.get(e);
          if (!t)
            throw (function X8(n) {
              return new M(3401, !1);
            })();
          return t;
        }
        trigger(e, t, r, o = !0) {
          const i = this._getTrigger(t),
            s = new Cg(this.id, t, e);
          let a = this._engine.statesByElement.get(e);
          a ||
            ($n(e, mu),
            $n(e, mu + "-" + t),
            this._engine.statesByElement.set(e, (a = new Map())));
          let c = a.get(t);
          const l = new yg(r, this.id);
          if (
            (!(r && r.hasOwnProperty("value")) &&
              c &&
              l.absorbOptions(c.options),
            a.set(t, l),
            c || (c = vg),
            l.value !== Ga && c.value === l.value)
          ) {
            if (
              !(function s6(n, e) {
                const t = Object.keys(n),
                  r = Object.keys(e);
                if (t.length != r.length) return !1;
                for (let o = 0; o < t.length; o++) {
                  const i = t[o];
                  if (!e.hasOwnProperty(i) || n[i] !== e[i]) return !1;
                }
                return !0;
              })(c.params, l.params)
            ) {
              const m = [],
                y = i.matchStyles(c.value, c.params, m),
                C = i.matchStyles(l.value, l.params, m);
              m.length
                ? this._engine.reportError(m)
                : this._engine.afterFlush(() => {
                    ni(e, y), Pr(e, C);
                  });
            }
            return;
          }
          const f = Mn(this._engine.playersByElement, e, []);
          f.forEach((m) => {
            m.namespaceId == this.id &&
              m.triggerName == t &&
              m.queued &&
              m.destroy();
          });
          let h = i.matchTransition(c.value, l.value, e, l.params),
            p = !1;
          if (!h) {
            if (!o) return;
            (h = i.fallbackTransition), (p = !0);
          }
          return (
            this._engine.totalQueuedPlayers++,
            this._queue.push({
              element: e,
              triggerName: t,
              transition: h,
              fromState: c,
              toState: l,
              player: s,
              isFallbackTransition: p,
            }),
            p ||
              ($n(e, cD),
              s.onStart(() => {
                ls(e, cD);
              })),
            s.onDone(() => {
              let m = this.players.indexOf(s);
              m >= 0 && this.players.splice(m, 1);
              const y = this._engine.playersByElement.get(e);
              if (y) {
                let C = y.indexOf(s);
                C >= 0 && y.splice(C, 1);
              }
            }),
            this.players.push(s),
            f.push(s),
            s
          );
        }
        deregister(e) {
          this._triggers.delete(e),
            this._engine.statesByElement.forEach((t) => t.delete(e)),
            this._elementListeners.forEach((t, r) => {
              this._elementListeners.set(
                r,
                t.filter((o) => o.name != e)
              );
            });
        }
        clearElementCache(e) {
          this._engine.statesByElement.delete(e),
            this._elementListeners.delete(e);
          const t = this._engine.playersByElement.get(e);
          t &&
            (t.forEach((r) => r.destroy()),
            this._engine.playersByElement.delete(e));
        }
        _signalRemovalForInnerTriggers(e, t) {
          const r = this._engine.driver.query(e, _u, !0);
          r.forEach((o) => {
            if (o[Un]) return;
            const i = this._engine.fetchNamespacesByElement(o);
            i.size
              ? i.forEach((s) => s.triggerLeaveAnimation(o, t, !1, !0))
              : this.clearElementCache(o);
          }),
            this._engine.afterFlushAnimationsDone(() =>
              r.forEach((o) => this.clearElementCache(o))
            );
        }
        triggerLeaveAnimation(e, t, r, o) {
          const i = this._engine.statesByElement.get(e),
            s = new Map();
          if (i) {
            const a = [];
            if (
              (i.forEach((c, l) => {
                if ((s.set(l, c.value), this._triggers.has(l))) {
                  const u = this.trigger(e, l, Ga, o);
                  u && a.push(u);
                }
              }),
              a.length)
            )
              return (
                this._engine.markElementAsRemoved(this.id, e, !0, t, s),
                r && bo(a).onDone(() => this._engine.processLeaveNode(e)),
                !0
              );
          }
          return !1;
        }
        prepareLeaveAnimationListeners(e) {
          const t = this._elementListeners.get(e),
            r = this._engine.statesByElement.get(e);
          if (t && r) {
            const o = new Set();
            t.forEach((i) => {
              const s = i.name;
              if (o.has(s)) return;
              o.add(s);
              const c = this._triggers.get(s).fallbackTransition,
                l = r.get(s) || vg,
                u = new yg(Ga),
                d = new Cg(this.id, s, e);
              this._engine.totalQueuedPlayers++,
                this._queue.push({
                  element: e,
                  triggerName: s,
                  transition: c,
                  fromState: l,
                  toState: u,
                  player: d,
                  isFallbackTransition: !0,
                });
            });
          }
        }
        removeNode(e, t) {
          const r = this._engine;
          if (
            (e.childElementCount && this._signalRemovalForInnerTriggers(e, t),
            this.triggerLeaveAnimation(e, t, !0))
          )
            return;
          let o = !1;
          if (r.totalAnimations) {
            const i = r.players.length ? r.playersByQueriedElement.get(e) : [];
            if (i && i.length) o = !0;
            else {
              let s = e;
              for (; (s = s.parentNode); )
                if (r.statesByElement.get(s)) {
                  o = !0;
                  break;
                }
            }
          }
          if ((this.prepareLeaveAnimationListeners(e), o))
            r.markElementAsRemoved(this.id, e, !1, t);
          else {
            const i = e[Un];
            (!i || i === lD) &&
              (r.afterFlush(() => this.clearElementCache(e)),
              r.destroyInnerAnimations(e),
              r._onRemovalComplete(e, t));
          }
        }
        insertNode(e, t) {
          $n(e, this._hostClassName);
        }
        drainQueuedTransitions(e) {
          const t = [];
          return (
            this._queue.forEach((r) => {
              const o = r.player;
              if (o.destroyed) return;
              const i = r.element,
                s = this._elementListeners.get(i);
              s &&
                s.forEach((a) => {
                  if (a.name == r.triggerName) {
                    const c = tg(
                      i,
                      r.triggerName,
                      r.fromState.value,
                      r.toState.value
                    );
                    (c._data = e), Xp(r.player, a.phase, c, a.callback);
                  }
                }),
                o.markedForDestroy
                  ? this._engine.afterFlush(() => {
                      o.destroy();
                    })
                  : t.push(r);
            }),
            (this._queue = []),
            t.sort((r, o) => {
              const i = r.transition.ast.depCount,
                s = o.transition.ast.depCount;
              return 0 == i || 0 == s
                ? i - s
                : this._engine.driver.containsElement(r.element, o.element)
                ? 1
                : -1;
            })
          );
        }
        destroy(e) {
          this.players.forEach((t) => t.destroy()),
            this._signalRemovalForInnerTriggers(this.hostElement, e);
        }
        elementContainsData(e) {
          let t = !1;
          return (
            this._elementListeners.has(e) && (t = !0),
            (t = !!this._queue.find((r) => r.element === e) || t),
            t
          );
        }
      }
      class e6 {
        constructor(e, t, r) {
          (this.bodyNode = e),
            (this.driver = t),
            (this._normalizer = r),
            (this.players = []),
            (this.newHostElements = new Map()),
            (this.playersByElement = new Map()),
            (this.playersByQueriedElement = new Map()),
            (this.statesByElement = new Map()),
            (this.disabledNodes = new Set()),
            (this.totalAnimations = 0),
            (this.totalQueuedPlayers = 0),
            (this._namespaceLookup = {}),
            (this._namespaceList = []),
            (this._flushFns = []),
            (this._whenQuietFns = []),
            (this.namespacesByHostElement = new Map()),
            (this.collectedEnterElements = []),
            (this.collectedLeaveElements = []),
            (this.onRemovalComplete = (o, i) => {});
        }
        _onRemovalComplete(e, t) {
          this.onRemovalComplete(e, t);
        }
        get queuedPlayers() {
          const e = [];
          return (
            this._namespaceList.forEach((t) => {
              t.players.forEach((r) => {
                r.queued && e.push(r);
              });
            }),
            e
          );
        }
        createNamespace(e, t) {
          const r = new XL(e, t, this);
          return (
            this.bodyNode && this.driver.containsElement(this.bodyNode, t)
              ? this._balanceNamespaceList(r, t)
              : (this.newHostElements.set(t, r), this.collectEnterElement(t)),
            (this._namespaceLookup[e] = r)
          );
        }
        _balanceNamespaceList(e, t) {
          const r = this._namespaceList,
            o = this.namespacesByHostElement;
          if (r.length - 1 >= 0) {
            let s = !1,
              a = this.driver.getParentElement(t);
            for (; a; ) {
              const c = o.get(a);
              if (c) {
                const l = r.indexOf(c);
                r.splice(l + 1, 0, e), (s = !0);
                break;
              }
              a = this.driver.getParentElement(a);
            }
            s || r.unshift(e);
          } else r.push(e);
          return o.set(t, e), e;
        }
        register(e, t) {
          let r = this._namespaceLookup[e];
          return r || (r = this.createNamespace(e, t)), r;
        }
        registerTrigger(e, t, r) {
          let o = this._namespaceLookup[e];
          o && o.register(t, r) && this.totalAnimations++;
        }
        destroy(e, t) {
          if (!e) return;
          const r = this._fetchNamespace(e);
          this.afterFlush(() => {
            this.namespacesByHostElement.delete(r.hostElement),
              delete this._namespaceLookup[e];
            const o = this._namespaceList.indexOf(r);
            o >= 0 && this._namespaceList.splice(o, 1);
          }),
            this.afterFlushAnimationsDone(() => r.destroy(t));
        }
        _fetchNamespace(e) {
          return this._namespaceLookup[e];
        }
        fetchNamespacesByElement(e) {
          const t = new Set(),
            r = this.statesByElement.get(e);
          if (r)
            for (let o of r.values())
              if (o.namespaceId) {
                const i = this._fetchNamespace(o.namespaceId);
                i && t.add(i);
              }
          return t;
        }
        trigger(e, t, r, o) {
          if (Su(t)) {
            const i = this._fetchNamespace(e);
            if (i) return i.trigger(t, r, o), !0;
          }
          return !1;
        }
        insertNode(e, t, r, o) {
          if (!Su(t)) return;
          const i = t[Un];
          if (i && i.setForRemoval) {
            (i.setForRemoval = !1), (i.setForMove = !0);
            const s = this.collectedLeaveElements.indexOf(t);
            s >= 0 && this.collectedLeaveElements.splice(s, 1);
          }
          if (e) {
            const s = this._fetchNamespace(e);
            s && s.insertNode(t, r);
          }
          o && this.collectEnterElement(t);
        }
        collectEnterElement(e) {
          this.collectedEnterElements.push(e);
        }
        markElementAsDisabled(e, t) {
          t
            ? this.disabledNodes.has(e) ||
              (this.disabledNodes.add(e), $n(e, _g))
            : this.disabledNodes.has(e) &&
              (this.disabledNodes.delete(e), ls(e, _g));
        }
        removeNode(e, t, r, o) {
          if (Su(t)) {
            const i = e ? this._fetchNamespace(e) : null;
            if (
              (i ? i.removeNode(t, o) : this.markElementAsRemoved(e, t, !1, o),
              r)
            ) {
              const s = this.namespacesByHostElement.get(t);
              s && s.id !== e && s.removeNode(t, o);
            }
          } else this._onRemovalComplete(t, o);
        }
        markElementAsRemoved(e, t, r, o, i) {
          this.collectedLeaveElements.push(t),
            (t[Un] = {
              namespaceId: e,
              setForRemoval: o,
              hasAnimation: r,
              removedBeforeQueried: !1,
              previousTriggersValues: i,
            });
        }
        listen(e, t, r, o, i) {
          return Su(t) ? this._fetchNamespace(e).listen(t, r, o, i) : () => {};
        }
        _buildInstruction(e, t, r, o, i) {
          return e.transition.build(
            this.driver,
            e.element,
            e.fromState.value,
            e.toState.value,
            r,
            o,
            e.fromState.options,
            e.toState.options,
            t,
            i
          );
        }
        destroyInnerAnimations(e) {
          let t = this.driver.query(e, _u, !0);
          t.forEach((r) => this.destroyActiveAnimationsForElement(r)),
            0 != this.playersByQueriedElement.size &&
              ((t = this.driver.query(e, sg, !0)),
              t.forEach((r) => this.finishActiveQueriedAnimationOnElement(r)));
        }
        destroyActiveAnimationsForElement(e) {
          const t = this.playersByElement.get(e);
          t &&
            t.forEach((r) => {
              r.queued ? (r.markedForDestroy = !0) : r.destroy();
            });
        }
        finishActiveQueriedAnimationOnElement(e) {
          const t = this.playersByQueriedElement.get(e);
          t && t.forEach((r) => r.finish());
        }
        whenRenderingDone() {
          return new Promise((e) => {
            if (this.players.length) return bo(this.players).onDone(() => e());
            e();
          });
        }
        processLeaveNode(e) {
          const t = e[Un];
          if (t && t.setForRemoval) {
            if (((e[Un] = lD), t.namespaceId)) {
              this.destroyInnerAnimations(e);
              const r = this._fetchNamespace(t.namespaceId);
              r && r.clearElementCache(e);
            }
            this._onRemovalComplete(e, t.setForRemoval);
          }
          e.classList?.contains(_g) && this.markElementAsDisabled(e, !1),
            this.driver.query(e, ".ng-animate-disabled", !0).forEach((r) => {
              this.markElementAsDisabled(r, !1);
            });
        }
        flush(e = -1) {
          let t = [];
          if (
            (this.newHostElements.size &&
              (this.newHostElements.forEach((r, o) =>
                this._balanceNamespaceList(r, o)
              ),
              this.newHostElements.clear()),
            this.totalAnimations && this.collectedEnterElements.length)
          )
            for (let r = 0; r < this.collectedEnterElements.length; r++)
              $n(this.collectedEnterElements[r], "ng-star-inserted");
          if (
            this._namespaceList.length &&
            (this.totalQueuedPlayers || this.collectedLeaveElements.length)
          ) {
            const r = [];
            try {
              t = this._flushAnimations(r, e);
            } finally {
              for (let o = 0; o < r.length; o++) r[o]();
            }
          } else
            for (let r = 0; r < this.collectedLeaveElements.length; r++)
              this.processLeaveNode(this.collectedLeaveElements[r]);
          if (
            ((this.totalQueuedPlayers = 0),
            (this.collectedEnterElements.length = 0),
            (this.collectedLeaveElements.length = 0),
            this._flushFns.forEach((r) => r()),
            (this._flushFns = []),
            this._whenQuietFns.length)
          ) {
            const r = this._whenQuietFns;
            (this._whenQuietFns = []),
              t.length
                ? bo(t).onDone(() => {
                    r.forEach((o) => o());
                  })
                : r.forEach((o) => o());
          }
        }
        reportError(e) {
          throw (function eL(n) {
            return new M(3402, !1);
          })();
        }
        _flushAnimations(e, t) {
          const r = new Ou(),
            o = [],
            i = new Map(),
            s = [],
            a = new Map(),
            c = new Map(),
            l = new Map(),
            u = new Set();
          this.disabledNodes.forEach((N) => {
            u.add(N);
            const j = this.driver.query(N, ".ng-animate-queued", !0);
            for (let q = 0; q < j.length; q++) u.add(j[q]);
          });
          const d = this.bodyNode,
            f = Array.from(this.statesByElement.keys()),
            h = fD(f, this.collectedEnterElements),
            p = new Map();
          let m = 0;
          h.forEach((N, j) => {
            const q = ig + m++;
            p.set(j, q), N.forEach((Me) => $n(Me, q));
          });
          const y = [],
            C = new Set(),
            O = new Set();
          for (let N = 0; N < this.collectedLeaveElements.length; N++) {
            const j = this.collectedLeaveElements[N],
              q = j[Un];
            q &&
              q.setForRemoval &&
              (y.push(j),
              C.add(j),
              q.hasAnimation
                ? this.driver
                    .query(j, ".ng-star-inserted", !0)
                    .forEach((Me) => C.add(Me))
                : O.add(j));
          }
          const b = new Map(),
            x = fD(f, Array.from(C));
          x.forEach((N, j) => {
            const q = gu + m++;
            b.set(j, q), N.forEach((Me) => $n(Me, q));
          }),
            e.push(() => {
              h.forEach((N, j) => {
                const q = p.get(j);
                N.forEach((Me) => ls(Me, q));
              }),
                x.forEach((N, j) => {
                  const q = b.get(j);
                  N.forEach((Me) => ls(Me, q));
                }),
                y.forEach((N) => {
                  this.processLeaveNode(N);
                });
            });
          const Y = [],
            be = [];
          for (let N = this._namespaceList.length - 1; N >= 0; N--)
            this._namespaceList[N].drainQueuedTransitions(t).forEach((q) => {
              const Me = q.player,
                xt = q.element;
              if ((Y.push(Me), this.collectedEnterElements.length)) {
                const Ut = xt[Un];
                if (Ut && Ut.setForMove) {
                  if (
                    Ut.previousTriggersValues &&
                    Ut.previousTriggersValues.has(q.triggerName)
                  ) {
                    const oi = Ut.previousTriggersValues.get(q.triggerName),
                      Hn = this.statesByElement.get(q.element);
                    if (Hn && Hn.has(q.triggerName)) {
                      const Iu = Hn.get(q.triggerName);
                      (Iu.value = oi), Hn.set(q.triggerName, Iu);
                    }
                  }
                  return void Me.destroy();
                }
              }
              const xr = !d || !this.driver.containsElement(d, xt),
                xn = b.get(xt),
                Do = p.get(xt),
                nt = this._buildInstruction(q, r, Do, xn, xr);
              if (nt.errors && nt.errors.length) return void be.push(nt);
              if (xr)
                return (
                  Me.onStart(() => ni(xt, nt.fromStyles)),
                  Me.onDestroy(() => Pr(xt, nt.toStyles)),
                  void o.push(Me)
                );
              if (q.isFallbackTransition)
                return (
                  Me.onStart(() => ni(xt, nt.fromStyles)),
                  Me.onDestroy(() => Pr(xt, nt.toStyles)),
                  void o.push(Me)
                );
              const bD = [];
              nt.timelines.forEach((Ut) => {
                (Ut.stretchStartingKeyframe = !0),
                  this.disabledNodes.has(Ut.element) || bD.push(Ut);
              }),
                (nt.timelines = bD),
                r.append(xt, nt.timelines),
                s.push({ instruction: nt, player: Me, element: xt }),
                nt.queriedElements.forEach((Ut) => Mn(a, Ut, []).push(Me)),
                nt.preStyleProps.forEach((Ut, oi) => {
                  if (Ut.size) {
                    let Hn = c.get(oi);
                    Hn || c.set(oi, (Hn = new Set())),
                      Ut.forEach((Iu, Mg) => Hn.add(Mg));
                  }
                }),
                nt.postStyleProps.forEach((Ut, oi) => {
                  let Hn = l.get(oi);
                  Hn || l.set(oi, (Hn = new Set())),
                    Ut.forEach((Iu, Mg) => Hn.add(Mg));
                });
            });
          if (be.length) {
            const N = [];
            be.forEach((j) => {
              N.push(
                (function tL(n, e) {
                  return new M(3505, !1);
                })()
              );
            }),
              Y.forEach((j) => j.destroy()),
              this.reportError(N);
          }
          const tt = new Map(),
            En = new Map();
          s.forEach((N) => {
            const j = N.element;
            r.has(j) &&
              (En.set(j, j),
              this._beforeAnimationBuild(
                N.player.namespaceId,
                N.instruction,
                tt
              ));
          }),
            o.forEach((N) => {
              const j = N.element;
              this._getPreviousPlayers(
                j,
                !1,
                N.namespaceId,
                N.triggerName,
                null
              ).forEach((Me) => {
                Mn(tt, j, []).push(Me), Me.destroy();
              });
            });
          const On = y.filter((N) => pD(N, c, l)),
            Pn = new Map();
          dD(Pn, this.driver, O, l, Yr).forEach((N) => {
            pD(N, c, l) && On.push(N);
          });
          const to = new Map();
          h.forEach((N, j) => {
            dD(to, this.driver, new Set(N), c, "!");
          }),
            On.forEach((N) => {
              const j = Pn.get(N),
                q = to.get(N);
              Pn.set(
                N,
                new Map([
                  ...Array.from(j?.entries() ?? []),
                  ...Array.from(q?.entries() ?? []),
                ])
              );
            });
          const sr = [],
            ds = [],
            fs = {};
          s.forEach((N) => {
            const { element: j, player: q, instruction: Me } = N;
            if (r.has(j)) {
              if (u.has(j))
                return (
                  q.onDestroy(() => Pr(j, Me.toStyles)),
                  (q.disabled = !0),
                  q.overrideTotalTime(Me.totalTime),
                  void o.push(q)
                );
              let xt = fs;
              if (En.size > 1) {
                let xn = j;
                const Do = [];
                for (; (xn = xn.parentNode); ) {
                  const nt = En.get(xn);
                  if (nt) {
                    xt = nt;
                    break;
                  }
                  Do.push(xn);
                }
                Do.forEach((nt) => En.set(nt, xt));
              }
              const xr = this._buildAnimation(q.namespaceId, Me, tt, i, to, Pn);
              if ((q.setRealPlayer(xr), xt === fs)) sr.push(q);
              else {
                const xn = this.playersByElement.get(xt);
                xn && xn.length && (q.parentPlayer = bo(xn)), o.push(q);
              }
            } else
              ni(j, Me.fromStyles),
                q.onDestroy(() => Pr(j, Me.toStyles)),
                ds.push(q),
                u.has(j) && o.push(q);
          }),
            ds.forEach((N) => {
              const j = i.get(N.element);
              if (j && j.length) {
                const q = bo(j);
                N.setRealPlayer(q);
              }
            }),
            o.forEach((N) => {
              N.parentPlayer ? N.syncPlayerEvents(N.parentPlayer) : N.destroy();
            });
          for (let N = 0; N < y.length; N++) {
            const j = y[N],
              q = j[Un];
            if ((ls(j, gu), q && q.hasAnimation)) continue;
            let Me = [];
            if (a.size) {
              let xr = a.get(j);
              xr && xr.length && Me.push(...xr);
              let xn = this.driver.query(j, sg, !0);
              for (let Do = 0; Do < xn.length; Do++) {
                let nt = a.get(xn[Do]);
                nt && nt.length && Me.push(...nt);
              }
            }
            const xt = Me.filter((xr) => !xr.destroyed);
            xt.length ? o6(this, j, xt) : this.processLeaveNode(j);
          }
          return (
            (y.length = 0),
            sr.forEach((N) => {
              this.players.push(N),
                N.onDone(() => {
                  N.destroy();
                  const j = this.players.indexOf(N);
                  this.players.splice(j, 1);
                }),
                N.play();
            }),
            sr
          );
        }
        elementContainsData(e, t) {
          let r = !1;
          const o = t[Un];
          return (
            o && o.setForRemoval && (r = !0),
            this.playersByElement.has(t) && (r = !0),
            this.playersByQueriedElement.has(t) && (r = !0),
            this.statesByElement.has(t) && (r = !0),
            this._fetchNamespace(e).elementContainsData(t) || r
          );
        }
        afterFlush(e) {
          this._flushFns.push(e);
        }
        afterFlushAnimationsDone(e) {
          this._whenQuietFns.push(e);
        }
        _getPreviousPlayers(e, t, r, o, i) {
          let s = [];
          if (t) {
            const a = this.playersByQueriedElement.get(e);
            a && (s = a);
          } else {
            const a = this.playersByElement.get(e);
            if (a) {
              const c = !i || i == Ga;
              a.forEach((l) => {
                l.queued || (!c && l.triggerName != o) || s.push(l);
              });
            }
          }
          return (
            (r || o) &&
              (s = s.filter(
                (a) => !((r && r != a.namespaceId) || (o && o != a.triggerName))
              )),
            s
          );
        }
        _beforeAnimationBuild(e, t, r) {
          const i = t.element,
            s = t.isRemovalTransition ? void 0 : e,
            a = t.isRemovalTransition ? void 0 : t.triggerName;
          for (const c of t.timelines) {
            const l = c.element,
              u = l !== i,
              d = Mn(r, l, []);
            this._getPreviousPlayers(l, u, s, a, t.toState).forEach((h) => {
              const p = h.getRealPlayer();
              p.beforeDestroy && p.beforeDestroy(), h.destroy(), d.push(h);
            });
          }
          ni(i, t.fromStyles);
        }
        _buildAnimation(e, t, r, o, i, s) {
          const a = t.triggerName,
            c = t.element,
            l = [],
            u = new Set(),
            d = new Set(),
            f = t.timelines.map((p) => {
              const m = p.element;
              u.add(m);
              const y = m[Un];
              if (y && y.removedBeforeQueried)
                return new Na(p.duration, p.delay);
              const C = m !== c,
                O = (function i6(n) {
                  const e = [];
                  return hD(n, e), e;
                })((r.get(m) || YL).map((tt) => tt.getRealPlayer())).filter(
                  (tt) => !!tt.element && tt.element === m
                ),
                b = i.get(m),
                x = s.get(m),
                Y = B1(0, this._normalizer, 0, p.keyframes, b, x),
                be = this._buildPlayer(p, Y, O);
              if ((p.subTimeline && o && d.add(m), C)) {
                const tt = new Cg(e, a, m);
                tt.setRealPlayer(be), l.push(tt);
              }
              return be;
            });
          l.forEach((p) => {
            Mn(this.playersByQueriedElement, p.element, []).push(p),
              p.onDone(() =>
                (function t6(n, e, t) {
                  let r = n.get(e);
                  if (r) {
                    if (r.length) {
                      const o = r.indexOf(t);
                      r.splice(o, 1);
                    }
                    0 == r.length && n.delete(e);
                  }
                  return r;
                })(this.playersByQueriedElement, p.element, p)
              );
          }),
            u.forEach((p) => $n(p, K1));
          const h = bo(f);
          return (
            h.onDestroy(() => {
              u.forEach((p) => ls(p, K1)), Pr(c, t.toStyles);
            }),
            d.forEach((p) => {
              Mn(o, p, []).push(h);
            }),
            h
          );
        }
        _buildPlayer(e, t, r) {
          return t.length > 0
            ? this.driver.animate(
                e.element,
                t,
                e.duration,
                e.delay,
                e.easing,
                r
              )
            : new Na(e.duration, e.delay);
        }
      }
      class Cg {
        constructor(e, t, r) {
          (this.namespaceId = e),
            (this.triggerName = t),
            (this.element = r),
            (this._player = new Na()),
            (this._containsRealPlayer = !1),
            (this._queuedCallbacks = new Map()),
            (this.destroyed = !1),
            (this.markedForDestroy = !1),
            (this.disabled = !1),
            (this.queued = !0),
            (this.totalTime = 0);
        }
        setRealPlayer(e) {
          this._containsRealPlayer ||
            ((this._player = e),
            this._queuedCallbacks.forEach((t, r) => {
              t.forEach((o) => Xp(e, r, void 0, o));
            }),
            this._queuedCallbacks.clear(),
            (this._containsRealPlayer = !0),
            this.overrideTotalTime(e.totalTime),
            (this.queued = !1));
        }
        getRealPlayer() {
          return this._player;
        }
        overrideTotalTime(e) {
          this.totalTime = e;
        }
        syncPlayerEvents(e) {
          const t = this._player;
          t.triggerCallback && e.onStart(() => t.triggerCallback("start")),
            e.onDone(() => this.finish()),
            e.onDestroy(() => this.destroy());
        }
        _queueEvent(e, t) {
          Mn(this._queuedCallbacks, e, []).push(t);
        }
        onDone(e) {
          this.queued && this._queueEvent("done", e), this._player.onDone(e);
        }
        onStart(e) {
          this.queued && this._queueEvent("start", e), this._player.onStart(e);
        }
        onDestroy(e) {
          this.queued && this._queueEvent("destroy", e),
            this._player.onDestroy(e);
        }
        init() {
          this._player.init();
        }
        hasStarted() {
          return !this.queued && this._player.hasStarted();
        }
        play() {
          !this.queued && this._player.play();
        }
        pause() {
          !this.queued && this._player.pause();
        }
        restart() {
          !this.queued && this._player.restart();
        }
        finish() {
          this._player.finish();
        }
        destroy() {
          (this.destroyed = !0), this._player.destroy();
        }
        reset() {
          !this.queued && this._player.reset();
        }
        setPosition(e) {
          this.queued || this._player.setPosition(e);
        }
        getPosition() {
          return this.queued ? 0 : this._player.getPosition();
        }
        triggerCallback(e) {
          const t = this._player;
          t.triggerCallback && t.triggerCallback(e);
        }
      }
      function Su(n) {
        return n && 1 === n.nodeType;
      }
      function uD(n, e) {
        const t = n.style.display;
        return (n.style.display = e ?? "none"), t;
      }
      function dD(n, e, t, r, o) {
        const i = [];
        t.forEach((c) => i.push(uD(c)));
        const s = [];
        r.forEach((c, l) => {
          const u = new Map();
          c.forEach((d) => {
            const f = e.computeStyle(l, d, o);
            u.set(d, f), (!f || 0 == f.length) && ((l[Un] = JL), s.push(l));
          }),
            n.set(l, u);
        });
        let a = 0;
        return t.forEach((c) => uD(c, i[a++])), s;
      }
      function fD(n, e) {
        const t = new Map();
        if ((n.forEach((a) => t.set(a, [])), 0 == e.length)) return t;
        const o = new Set(e),
          i = new Map();
        function s(a) {
          if (!a) return 1;
          let c = i.get(a);
          if (c) return c;
          const l = a.parentNode;
          return (c = t.has(l) ? l : o.has(l) ? 1 : s(l)), i.set(a, c), c;
        }
        return (
          e.forEach((a) => {
            const c = s(a);
            1 !== c && t.get(c).push(a);
          }),
          t
        );
      }
      function $n(n, e) {
        n.classList?.add(e);
      }
      function ls(n, e) {
        n.classList?.remove(e);
      }
      function o6(n, e, t) {
        bo(t).onDone(() => n.processLeaveNode(e));
      }
      function hD(n, e) {
        for (let t = 0; t < n.length; t++) {
          const r = n[t];
          r instanceof YM ? hD(r.players, e) : e.push(r);
        }
      }
      function pD(n, e, t) {
        const r = t.get(n);
        if (!r) return !1;
        let o = e.get(n);
        return o ? r.forEach((i) => o.add(i)) : e.set(n, r), t.delete(n), !0;
      }
      class Au {
        constructor(e, t, r) {
          (this.bodyNode = e),
            (this._driver = t),
            (this._normalizer = r),
            (this._triggerCache = {}),
            (this.onRemovalComplete = (o, i) => {}),
            (this._transitionEngine = new e6(e, t, r)),
            (this._timelineEngine = new WL(e, t, r)),
            (this._transitionEngine.onRemovalComplete = (o, i) =>
              this.onRemovalComplete(o, i));
        }
        registerTrigger(e, t, r, o, i) {
          const s = e + "-" + o;
          let a = this._triggerCache[s];
          if (!a) {
            const c = [],
              u = ug(this._driver, i, c, []);
            if (c.length)
              throw (function z8(n, e) {
                return new M(3404, !1);
              })();
            (a = (function $L(n, e, t) {
              return new HL(n, e, t);
            })(o, u, this._normalizer)),
              (this._triggerCache[s] = a);
          }
          this._transitionEngine.registerTrigger(t, o, a);
        }
        register(e, t) {
          this._transitionEngine.register(e, t);
        }
        destroy(e, t) {
          this._transitionEngine.destroy(e, t);
        }
        onInsert(e, t, r, o) {
          this._transitionEngine.insertNode(e, t, r, o);
        }
        onRemove(e, t, r, o) {
          this._transitionEngine.removeNode(e, t, o || !1, r);
        }
        disableAnimations(e, t) {
          this._transitionEngine.markElementAsDisabled(e, t);
        }
        process(e, t, r, o) {
          if ("@" == r.charAt(0)) {
            const [i, s] = j1(r);
            this._timelineEngine.command(i, t, s, o);
          } else this._transitionEngine.trigger(e, t, r, o);
        }
        listen(e, t, r, o, i) {
          if ("@" == r.charAt(0)) {
            const [s, a] = j1(r);
            return this._timelineEngine.listen(s, t, a, i);
          }
          return this._transitionEngine.listen(e, t, r, o, i);
        }
        flush(e = -1) {
          this._transitionEngine.flush(e);
        }
        get players() {
          return this._transitionEngine.players.concat(
            this._timelineEngine.players
          );
        }
        whenRenderingDone() {
          return this._transitionEngine.whenRenderingDone();
        }
      }
      let c6 = (() => {
        class n {
          constructor(t, r, o) {
            (this._element = t),
              (this._startStyles = r),
              (this._endStyles = o),
              (this._state = 0);
            let i = n.initialStylesByElement.get(t);
            i || n.initialStylesByElement.set(t, (i = new Map())),
              (this._initialStyles = i);
          }
          start() {
            this._state < 1 &&
              (this._startStyles &&
                Pr(this._element, this._startStyles, this._initialStyles),
              (this._state = 1));
          }
          finish() {
            this.start(),
              this._state < 2 &&
                (Pr(this._element, this._initialStyles),
                this._endStyles &&
                  (Pr(this._element, this._endStyles),
                  (this._endStyles = null)),
                (this._state = 1));
          }
          destroy() {
            this.finish(),
              this._state < 3 &&
                (n.initialStylesByElement.delete(this._element),
                this._startStyles &&
                  (ni(this._element, this._startStyles),
                  (this._endStyles = null)),
                this._endStyles &&
                  (ni(this._element, this._endStyles),
                  (this._endStyles = null)),
                Pr(this._element, this._initialStyles),
                (this._state = 3));
          }
        }
        return (n.initialStylesByElement = new WeakMap()), n;
      })();
      function bg(n) {
        let e = null;
        return (
          n.forEach((t, r) => {
            (function l6(n) {
              return "display" === n || "position" === n;
            })(r) && ((e = e || new Map()), e.set(r, t));
          }),
          e
        );
      }
      class gD {
        constructor(e, t, r, o) {
          (this.element = e),
            (this.keyframes = t),
            (this.options = r),
            (this._specialStyles = o),
            (this._onDoneFns = []),
            (this._onStartFns = []),
            (this._onDestroyFns = []),
            (this._initialized = !1),
            (this._finished = !1),
            (this._started = !1),
            (this._destroyed = !1),
            (this._originalOnDoneFns = []),
            (this._originalOnStartFns = []),
            (this.time = 0),
            (this.parentPlayer = null),
            (this.currentSnapshot = new Map()),
            (this._duration = r.duration),
            (this._delay = r.delay || 0),
            (this.time = this._duration + this._delay);
        }
        _onFinish() {
          this._finished ||
            ((this._finished = !0),
            this._onDoneFns.forEach((e) => e()),
            (this._onDoneFns = []));
        }
        init() {
          this._buildPlayer(), this._preparePlayerBeforeStart();
        }
        _buildPlayer() {
          if (this._initialized) return;
          this._initialized = !0;
          const e = this.keyframes;
          (this.domPlayer = this._triggerWebAnimation(
            this.element,
            e,
            this.options
          )),
            (this._finalKeyframe = e.length ? e[e.length - 1] : new Map()),
            this.domPlayer.addEventListener("finish", () => this._onFinish());
        }
        _preparePlayerBeforeStart() {
          this._delay ? this._resetDomPlayerState() : this.domPlayer.pause();
        }
        _convertKeyframesToObject(e) {
          const t = [];
          return (
            e.forEach((r) => {
              t.push(Object.fromEntries(r));
            }),
            t
          );
        }
        _triggerWebAnimation(e, t, r) {
          return e.animate(this._convertKeyframesToObject(t), r);
        }
        onStart(e) {
          this._originalOnStartFns.push(e), this._onStartFns.push(e);
        }
        onDone(e) {
          this._originalOnDoneFns.push(e), this._onDoneFns.push(e);
        }
        onDestroy(e) {
          this._onDestroyFns.push(e);
        }
        play() {
          this._buildPlayer(),
            this.hasStarted() ||
              (this._onStartFns.forEach((e) => e()),
              (this._onStartFns = []),
              (this._started = !0),
              this._specialStyles && this._specialStyles.start()),
            this.domPlayer.play();
        }
        pause() {
          this.init(), this.domPlayer.pause();
        }
        finish() {
          this.init(),
            this._specialStyles && this._specialStyles.finish(),
            this._onFinish(),
            this.domPlayer.finish();
        }
        reset() {
          this._resetDomPlayerState(),
            (this._destroyed = !1),
            (this._finished = !1),
            (this._started = !1),
            (this._onStartFns = this._originalOnStartFns),
            (this._onDoneFns = this._originalOnDoneFns);
        }
        _resetDomPlayerState() {
          this.domPlayer && this.domPlayer.cancel();
        }
        restart() {
          this.reset(), this.play();
        }
        hasStarted() {
          return this._started;
        }
        destroy() {
          this._destroyed ||
            ((this._destroyed = !0),
            this._resetDomPlayerState(),
            this._onFinish(),
            this._specialStyles && this._specialStyles.destroy(),
            this._onDestroyFns.forEach((e) => e()),
            (this._onDestroyFns = []));
        }
        setPosition(e) {
          void 0 === this.domPlayer && this.init(),
            (this.domPlayer.currentTime = e * this.time);
        }
        getPosition() {
          return this.domPlayer.currentTime / this.time;
        }
        get totalTime() {
          return this._delay + this._duration;
        }
        beforeDestroy() {
          const e = new Map();
          this.hasStarted() &&
            this._finalKeyframe.forEach((r, o) => {
              "offset" !== o &&
                e.set(o, this._finished ? r : eD(this.element, o));
            }),
            (this.currentSnapshot = e);
        }
        triggerCallback(e) {
          const t = "start" === e ? this._onStartFns : this._onDoneFns;
          t.forEach((r) => r()), (t.length = 0);
        }
      }
      class u6 {
        validateStyleProperty(e) {
          return !0;
        }
        validateAnimatableStyleProperty(e) {
          return !0;
        }
        matchesElement(e, t) {
          return !1;
        }
        containsElement(e, t) {
          return z1(e, t);
        }
        getParentElement(e) {
          return rg(e);
        }
        query(e, t, r) {
          return G1(e, t, r);
        }
        computeStyle(e, t, r) {
          return window.getComputedStyle(e)[t];
        }
        animate(e, t, r, o, i, s = []) {
          const c = {
            duration: r,
            delay: o,
            fill: 0 == o ? "both" : "forwards",
          };
          i && (c.easing = i);
          const l = new Map(),
            u = s.filter((h) => h instanceof gD);
          (function pL(n, e) {
            return 0 === n || 0 === e;
          })(r, o) &&
            u.forEach((h) => {
              h.currentSnapshot.forEach((p, m) => l.set(m, p));
            });
          let d = (function uL(n) {
            return n.length
              ? n[0] instanceof Map
                ? n
                : n.map((e) => Q1(e))
              : [];
          })(t).map((h) => Mo(h));
          d = (function gL(n, e, t) {
            if (t.size && e.length) {
              let r = e[0],
                o = [];
              if (
                (t.forEach((i, s) => {
                  r.has(s) || o.push(s), r.set(s, i);
                }),
                o.length)
              )
                for (let i = 1; i < e.length; i++) {
                  let s = e[i];
                  o.forEach((a) => s.set(a, eD(n, a)));
                }
            }
            return e;
          })(e, d, l);
          const f = (function a6(n, e) {
            let t = null,
              r = null;
            return (
              Array.isArray(e) && e.length
                ? ((t = bg(e[0])), e.length > 1 && (r = bg(e[e.length - 1])))
                : e instanceof Map && (t = bg(e)),
              t || r ? new c6(n, t, r) : null
            );
          })(e, d);
          return new gD(e, d, c, f);
        }
      }
      let d6 = (() => {
        class n extends zM {
          constructor(t, r) {
            super(),
              (this._nextAnimationId = 0),
              (this._renderer = t.createRenderer(r.body, {
                id: "0",
                encapsulation: Wn.None,
                styles: [],
                data: { animation: [] },
              }));
          }
          build(t) {
            const r = this._nextAnimationId.toString();
            this._nextAnimationId++;
            const o = Array.isArray(t) ? qM(t) : t;
            return (
              mD(this._renderer, null, r, "register", [o]),
              new f6(r, this._renderer)
            );
          }
        }
        return (
          (n.ɵfac = function (t) {
            return new (t || n)(P(Bs), P(st));
          }),
          (n.ɵprov = R({ token: n, factory: n.ɵfac })),
          n
        );
      })();
      class f6 extends class e4 {} {
        constructor(e, t) {
          super(), (this._id = e), (this._renderer = t);
        }
        create(e, t) {
          return new h6(this._id, e, t || {}, this._renderer);
        }
      }
      class h6 {
        constructor(e, t, r, o) {
          (this.id = e),
            (this.element = t),
            (this._renderer = o),
            (this.parentPlayer = null),
            (this._started = !1),
            (this.totalTime = 0),
            this._command("create", r);
        }
        _listen(e, t) {
          return this._renderer.listen(this.element, `@@${this.id}:${e}`, t);
        }
        _command(e, ...t) {
          return mD(this._renderer, this.element, this.id, e, t);
        }
        onDone(e) {
          this._listen("done", e);
        }
        onStart(e) {
          this._listen("start", e);
        }
        onDestroy(e) {
          this._listen("destroy", e);
        }
        init() {
          this._command("init");
        }
        hasStarted() {
          return this._started;
        }
        play() {
          this._command("play"), (this._started = !0);
        }
        pause() {
          this._command("pause");
        }
        restart() {
          this._command("restart");
        }
        finish() {
          this._command("finish");
        }
        destroy() {
          this._command("destroy");
        }
        reset() {
          this._command("reset"), (this._started = !1);
        }
        setPosition(e) {
          this._command("setPosition", e);
        }
        getPosition() {
          return this._renderer.engine.players[+this.id]?.getPosition() ?? 0;
        }
      }
      function mD(n, e, t, r, o) {
        return n.setProperty(e, `@@${t}:${r}`, o);
      }
      const _D = "@.disabled";
      let p6 = (() => {
        class n {
          constructor(t, r, o) {
            (this.delegate = t),
              (this.engine = r),
              (this._zone = o),
              (this._currentId = 0),
              (this._microtaskId = 1),
              (this._animationCallbacksBuffer = []),
              (this._rendererCache = new Map()),
              (this._cdRecurDepth = 0),
              (this.promise = Promise.resolve(0)),
              (r.onRemovalComplete = (i, s) => {
                const a = s?.parentNode(i);
                a && s.removeChild(a, i);
              });
          }
          createRenderer(t, r) {
            const i = this.delegate.createRenderer(t, r);
            if (!(t && r && r.data && r.data.animation)) {
              let u = this._rendererCache.get(i);
              return (
                u ||
                  ((u = new yD("", i, this.engine)),
                  this._rendererCache.set(i, u)),
                u
              );
            }
            const s = r.id,
              a = r.id + "-" + this._currentId;
            this._currentId++, this.engine.register(a, t);
            const c = (u) => {
              Array.isArray(u)
                ? u.forEach(c)
                : this.engine.registerTrigger(s, a, t, u.name, u);
            };
            return r.data.animation.forEach(c), new g6(this, a, i, this.engine);
          }
          begin() {
            this._cdRecurDepth++, this.delegate.begin && this.delegate.begin();
          }
          _scheduleCountTask() {
            this.promise.then(() => {
              this._microtaskId++;
            });
          }
          scheduleListenerCallback(t, r, o) {
            t >= 0 && t < this._microtaskId
              ? this._zone.run(() => r(o))
              : (0 == this._animationCallbacksBuffer.length &&
                  Promise.resolve(null).then(() => {
                    this._zone.run(() => {
                      this._animationCallbacksBuffer.forEach((i) => {
                        const [s, a] = i;
                        s(a);
                      }),
                        (this._animationCallbacksBuffer = []);
                    });
                  }),
                this._animationCallbacksBuffer.push([r, o]));
          }
          end() {
            this._cdRecurDepth--,
              0 == this._cdRecurDepth &&
                this._zone.runOutsideAngular(() => {
                  this._scheduleCountTask(),
                    this.engine.flush(this._microtaskId);
                }),
              this.delegate.end && this.delegate.end();
          }
          whenRenderingDone() {
            return this.engine.whenRenderingDone();
          }
        }
        return (
          (n.ɵfac = function (t) {
            return new (t || n)(P(Bs), P(Au), P(Ge));
          }),
          (n.ɵprov = R({ token: n, factory: n.ɵfac })),
          n
        );
      })();
      class yD {
        constructor(e, t, r) {
          (this.namespaceId = e),
            (this.delegate = t),
            (this.engine = r),
            (this.destroyNode = this.delegate.destroyNode
              ? (o) => t.destroyNode(o)
              : null);
        }
        get data() {
          return this.delegate.data;
        }
        destroy() {
          this.engine.destroy(this.namespaceId, this.delegate),
            this.delegate.destroy();
        }
        createElement(e, t) {
          return this.delegate.createElement(e, t);
        }
        createComment(e) {
          return this.delegate.createComment(e);
        }
        createText(e) {
          return this.delegate.createText(e);
        }
        appendChild(e, t) {
          this.delegate.appendChild(e, t),
            this.engine.onInsert(this.namespaceId, t, e, !1);
        }
        insertBefore(e, t, r, o = !0) {
          this.delegate.insertBefore(e, t, r),
            this.engine.onInsert(this.namespaceId, t, e, o);
        }
        removeChild(e, t, r) {
          this.engine.onRemove(this.namespaceId, t, this.delegate, r);
        }
        selectRootElement(e, t) {
          return this.delegate.selectRootElement(e, t);
        }
        parentNode(e) {
          return this.delegate.parentNode(e);
        }
        nextSibling(e) {
          return this.delegate.nextSibling(e);
        }
        setAttribute(e, t, r, o) {
          this.delegate.setAttribute(e, t, r, o);
        }
        removeAttribute(e, t, r) {
          this.delegate.removeAttribute(e, t, r);
        }
        addClass(e, t) {
          this.delegate.addClass(e, t);
        }
        removeClass(e, t) {
          this.delegate.removeClass(e, t);
        }
        setStyle(e, t, r, o) {
          this.delegate.setStyle(e, t, r, o);
        }
        removeStyle(e, t, r) {
          this.delegate.removeStyle(e, t, r);
        }
        setProperty(e, t, r) {
          "@" == t.charAt(0) && t == _D
            ? this.disableAnimations(e, !!r)
            : this.delegate.setProperty(e, t, r);
        }
        setValue(e, t) {
          this.delegate.setValue(e, t);
        }
        listen(e, t, r) {
          return this.delegate.listen(e, t, r);
        }
        disableAnimations(e, t) {
          this.engine.disableAnimations(e, t);
        }
      }
      class g6 extends yD {
        constructor(e, t, r, o) {
          super(t, r, o), (this.factory = e), (this.namespaceId = t);
        }
        setProperty(e, t, r) {
          "@" == t.charAt(0)
            ? "." == t.charAt(1) && t == _D
              ? this.disableAnimations(e, (r = void 0 === r || !!r))
              : this.engine.process(this.namespaceId, e, t.slice(1), r)
            : this.delegate.setProperty(e, t, r);
        }
        listen(e, t, r) {
          if ("@" == t.charAt(0)) {
            const o = (function m6(n) {
              switch (n) {
                case "body":
                  return document.body;
                case "document":
                  return document;
                case "window":
                  return window;
                default:
                  return n;
              }
            })(e);
            let i = t.slice(1),
              s = "";
            return (
              "@" != i.charAt(0) &&
                ([i, s] = (function _6(n) {
                  const e = n.indexOf(".");
                  return [n.substring(0, e), n.slice(e + 1)];
                })(i)),
              this.engine.listen(this.namespaceId, o, i, s, (a) => {
                this.factory.scheduleListenerCallback(a._data || -1, r, a);
              })
            );
          }
          return this.delegate.listen(e, t, r);
        }
      }
      const vD = [
          { provide: zM, useClass: d6 },
          {
            provide: gg,
            useFactory: function v6() {
              return new VL();
            },
          },
          {
            provide: Au,
            useClass: (() => {
              class n extends Au {
                constructor(t, r, o, i) {
                  super(t.body, r, o);
                }
                ngOnDestroy() {
                  this.flush();
                }
              }
              return (
                (n.ɵfac = function (t) {
                  return new (t || n)(P(st), P(og), P(gg), P(ia));
                }),
                (n.ɵprov = R({ token: n, factory: n.ɵfac })),
                n
              );
            })(),
          },
          {
            provide: Bs,
            useFactory: function C6(n, e, t) {
              return new p6(n, e, t);
            },
            deps: [Dl, Au, Ge],
          },
        ],
        wg = [
          { provide: og, useFactory: () => new u6() },
          { provide: tl, useValue: "BrowserAnimations" },
          ...vD,
        ],
        CD = [
          { provide: og, useClass: W1 },
          { provide: tl, useValue: "NoopAnimations" },
          ...vD,
        ];
      let b6 = (() => {
          class n {
            static withConfig(t) {
              return { ngModule: n, providers: t.disableAnimations ? CD : wg };
            }
          }
          return (
            (n.ɵfac = function (t) {
              return new (t || n)();
            }),
            (n.ɵmod = yt({ type: n })),
            (n.ɵinj = ft({ providers: wg, imports: [Cb] })),
            n
          );
        })(),
        w6 = (() => {
          class n {}
          return (
            (n.ɵfac = function (t) {
              return new (t || n)();
            }),
            (n.ɵmod = yt({ type: n, bootstrap: [w8] })),
            (n.ɵinj = ft({ imports: [Cb, _8, b6, V5, p4, B5, SR, AR] })),
            n
          );
        })();
      (function HI() {
        vC = !1;
      })(),
        mN()
          .bootstrapModule(w6)
          .catch((n) => console.error(n));
    },
    123: function (hs) {
      hs.exports = (function (lt) {
        function pe(H) {
          if (k[H]) return k[H].exports;
          var ge = (k[H] = { exports: {}, id: H, loaded: !1 });
          return (
            lt[H].call(ge.exports, ge, ge.exports, pe),
            (ge.loaded = !0),
            ge.exports
          );
        }
        var k = {};
        return (pe.m = lt), (pe.c = k), (pe.p = "dist/"), pe(0);
      })([
        function (lt, pe, k) {
          "use strict";
          function H(Q) {
            return Q && Q.__esModule ? Q : { default: Q };
          }
          var ge =
              Object.assign ||
              function (Q) {
                for (var Dt = 1; Dt < arguments.length; Dt++) {
                  var Gt = arguments[Dt];
                  for (var St in Gt)
                    Object.prototype.hasOwnProperty.call(Gt, St) &&
                      (Q[St] = Gt[St]);
                }
                return Q;
              },
            Ee = (H(k(1)), k(6)),
            J = H(Ee),
            se = H(k(7)),
            de = H(k(8)),
            Mt = H(k(9)),
            no = H(k(10)),
            Sr = H(k(11)),
            zn = H(k(14)),
            Ht = [],
            ar = !1,
            ze = {
              offset: 120,
              delay: 0,
              easing: "ease",
              duration: 400,
              disable: !1,
              once: !1,
              startEvent: "DOMContentLoaded",
              throttleDelay: 99,
              debounceDelay: 50,
              disableMutationObserver: !1,
            },
            zt = function () {
              if (
                (arguments.length > 0 &&
                  void 0 !== arguments[0] &&
                  arguments[0] &&
                  (ar = !0),
                ar)
              )
                return (
                  (Ht = (0, Sr.default)(Ht, ze)),
                  (0, no.default)(Ht, ze.once),
                  Ht
                );
            },
            cr = function () {
              (Ht = (0, zn.default)()), zt();
            };
          lt.exports = {
            init: function (Q) {
              (ze = ge(ze, Q)), (Ht = (0, zn.default)());
              var Dt = document.all && !window.atob;
              return (function (Q) {
                return (
                  !0 === Q ||
                  ("mobile" === Q && Mt.default.mobile()) ||
                  ("phone" === Q && Mt.default.phone()) ||
                  ("tablet" === Q && Mt.default.tablet()) ||
                  ("function" == typeof Q && !0 === Q())
                );
              })(ze.disable) || Dt
                ? void Ht.forEach(function (Q, Dt) {
                    Q.node.removeAttribute("data-aos"),
                      Q.node.removeAttribute("data-aos-easing"),
                      Q.node.removeAttribute("data-aos-duration"),
                      Q.node.removeAttribute("data-aos-delay");
                  })
                : (ze.disableMutationObserver ||
                    de.default.isSupported() ||
                    (console.info(
                      '\n      aos: MutationObserver is not supported on this browser,\n      code mutations observing has been disabled.\n      You may have to call "refreshHard()" by yourself.\n    '
                    ),
                    (ze.disableMutationObserver = !0)),
                  document
                    .querySelector("body")
                    .setAttribute("data-aos-easing", ze.easing),
                  document
                    .querySelector("body")
                    .setAttribute("data-aos-duration", ze.duration),
                  document
                    .querySelector("body")
                    .setAttribute("data-aos-delay", ze.delay),
                  "DOMContentLoaded" === ze.startEvent &&
                  ["complete", "interactive"].indexOf(document.readyState) > -1
                    ? zt(!0)
                    : "load" === ze.startEvent
                    ? window.addEventListener(ze.startEvent, function () {
                        zt(!0);
                      })
                    : document.addEventListener(ze.startEvent, function () {
                        zt(!0);
                      }),
                  window.addEventListener(
                    "resize",
                    (0, se.default)(zt, ze.debounceDelay, !0)
                  ),
                  window.addEventListener(
                    "orientationchange",
                    (0, se.default)(zt, ze.debounceDelay, !0)
                  ),
                  window.addEventListener(
                    "scroll",
                    (0, J.default)(function () {
                      (0, no.default)(Ht, ze.once);
                    }, ze.throttleDelay)
                  ),
                  ze.disableMutationObserver ||
                    de.default.ready("[data-aos]", cr),
                  Ht);
            },
            refresh: zt,
            refreshHard: cr,
          };
        },
        function (lt, pe) {},
        ,
        ,
        ,
        ,
        function (lt, pe) {
          (function (k) {
            "use strict";
            function H(I, De, Q) {
              function Dt(Oe) {
                var Wt = rn,
                  Tr = We;
                return (rn = We = void 0), (ur = Oe), (ut = I.apply(Tr, Wt));
              }
              function Gt(Oe) {
                return (ur = Oe), (ae = setTimeout(lr, De)), U ? Dt(Oe) : ut;
              }
              function Ar(Oe) {
                var Wt = Oe - ye;
                return (
                  void 0 === ye || Wt >= De || Wt < 0 || (dn && Oe - ur >= un)
                );
              }
              function lr() {
                var Oe = B();
                return Ar(Oe)
                  ? Re(Oe)
                  : void (ae = setTimeout(
                      lr,
                      (function St(Oe) {
                        var ku = De - (Oe - ye);
                        return dn ? cr(ku, un - (Oe - ur)) : ku;
                      })(Oe)
                    ));
              }
              function Re(Oe) {
                return (
                  (ae = void 0), qe && rn ? Dt(Oe) : ((rn = We = void 0), ut)
                );
              }
              function Sn() {
                var Oe = B(),
                  Wt = Ar(Oe);
                if (((rn = arguments), (We = this), (ye = Oe), Wt)) {
                  if (void 0 === ae) return Gt(ye);
                  if (dn) return (ae = setTimeout(lr, De)), Dt(ye);
                }
                return void 0 === ae && (ae = setTimeout(lr, De)), ut;
              }
              var rn,
                We,
                un,
                ut,
                ae,
                ye,
                ur = 0,
                U = !1,
                dn = !1,
                qe = !0;
              if ("function" != typeof I) throw new TypeError(ue);
              return (
                (De = Te(De) || 0),
                ke(Q) &&
                  ((U = !!Q.leading),
                  (un = (dn = "maxWait" in Q)
                    ? zt(Te(Q.maxWait) || 0, De)
                    : un),
                  (qe = "trailing" in Q ? !!Q.trailing : qe)),
                (Sn.cancel = function ii() {
                  void 0 !== ae && clearTimeout(ae),
                    (ur = 0),
                    (rn = ye = We = ae = void 0);
                }),
                (Sn.flush = function Oo() {
                  return void 0 === ae ? ut : Re(B());
                }),
                Sn
              );
            }
            function ke(I) {
              var De = typeof I > "u" ? "undefined" : se(I);
              return !!I && ("object" == De || "function" == De);
            }
            function J(I) {
              return (
                "symbol" == (typeof I > "u" ? "undefined" : se(I)) ||
                ((function Ee(I) {
                  return (
                    !!I && "object" == (typeof I > "u" ? "undefined" : se(I))
                  );
                })(I) &&
                  ze.call(I) == Ne)
              );
            }
            function Te(I) {
              if ("number" == typeof I) return I;
              if (J(I)) return de;
              if (ke(I)) {
                var De = "function" == typeof I.valueOf ? I.valueOf() : I;
                I = ke(De) ? De + "" : De;
              }
              if ("string" != typeof I) return 0 === I ? I : +I;
              I = I.replace(Mt, "");
              var Q = no.test(I);
              return Q || Eo.test(I)
                ? Sr(I.slice(2), Q ? 2 : 8)
                : $t.test(I)
                ? de
                : +I;
            }
            var se =
                "function" == typeof Symbol &&
                "symbol" == typeof Symbol.iterator
                  ? function (I) {
                      return typeof I;
                    }
                  : function (I) {
                      return I &&
                        "function" == typeof Symbol &&
                        I.constructor === Symbol &&
                        I !== Symbol.prototype
                        ? "symbol"
                        : typeof I;
                    },
              ue = "Expected a function",
              de = NaN,
              Ne = "[object Symbol]",
              Mt = /^\s+|\s+$/g,
              $t = /^[-+]0x[0-9a-f]+$/i,
              no = /^0b[01]+$/i,
              Eo = /^0o[0-7]+$/i,
              Sr = parseInt,
              ln =
                "object" == (typeof k > "u" ? "undefined" : se(k)) &&
                k &&
                k.Object === Object &&
                k,
              zn =
                "object" == (typeof self > "u" ? "undefined" : se(self)) &&
                self &&
                self.Object === Object &&
                self,
              Ht = ln || zn || Function("return this")(),
              ze = Object.prototype.toString,
              zt = Math.max,
              cr = Math.min,
              B = function () {
                return Ht.Date.now();
              };
            lt.exports = function ge(I, De, Q) {
              var Dt = !0,
                Gt = !0;
              if ("function" != typeof I) throw new TypeError(ue);
              return (
                ke(Q) &&
                  ((Dt = "leading" in Q ? !!Q.leading : Dt),
                  (Gt = "trailing" in Q ? !!Q.trailing : Gt)),
                H(I, De, { leading: Dt, maxWait: De, trailing: Gt })
              );
            };
          }.call(
            pe,
            (function () {
              return this;
            })()
          ));
        },
        function (lt, pe) {
          (function (k) {
            "use strict";
            function ge(B) {
              var I = typeof B > "u" ? "undefined" : Te(B);
              return !!B && ("object" == I || "function" == I);
            }
            function Ee(B) {
              return (
                "symbol" == (typeof B > "u" ? "undefined" : Te(B)) ||
                ((function ke(B) {
                  return (
                    !!B && "object" == (typeof B > "u" ? "undefined" : Te(B))
                  );
                })(B) &&
                  ar.call(B) == de)
              );
            }
            function J(B) {
              if ("number" == typeof B) return B;
              if (Ee(B)) return ue;
              if (ge(B)) {
                var I = "function" == typeof B.valueOf ? B.valueOf() : B;
                B = ge(I) ? I + "" : I;
              }
              if ("string" != typeof B) return 0 === B ? B : +B;
              B = B.replace(Ne, "");
              var De = $t.test(B);
              return De || no.test(B)
                ? Eo(B.slice(2), De ? 2 : 8)
                : Mt.test(B)
                ? ue
                : +B;
            }
            var Te =
                "function" == typeof Symbol &&
                "symbol" == typeof Symbol.iterator
                  ? function (B) {
                      return typeof B;
                    }
                  : function (B) {
                      return B &&
                        "function" == typeof Symbol &&
                        B.constructor === Symbol &&
                        B !== Symbol.prototype
                        ? "symbol"
                        : typeof B;
                    },
              se = "Expected a function",
              ue = NaN,
              de = "[object Symbol]",
              Ne = /^\s+|\s+$/g,
              Mt = /^[-+]0x[0-9a-f]+$/i,
              $t = /^0b[01]+$/i,
              no = /^0o[0-7]+$/i,
              Eo = parseInt,
              Sr =
                "object" == (typeof k > "u" ? "undefined" : Te(k)) &&
                k &&
                k.Object === Object &&
                k,
              ln =
                "object" == (typeof self > "u" ? "undefined" : Te(self)) &&
                self &&
                self.Object === Object &&
                self,
              zn = Sr || ln || Function("return this")(),
              ar = Object.prototype.toString,
              ze = Math.max,
              zt = Math.min,
              cr = function () {
                return zn.Date.now();
              };
            lt.exports = function H(B, I, De) {
              function Q(qe) {
                var Oe = Sn,
                  Wt = rn;
                return (Sn = rn = void 0), (ye = qe), (un = B.apply(Wt, Oe));
              }
              function Dt(qe) {
                return (ye = qe), (ut = setTimeout(Ar, I)), ur ? Q(qe) : un;
              }
              function St(qe) {
                var Oe = qe - ae;
                return (
                  void 0 === ae || Oe >= I || Oe < 0 || (U && qe - ye >= We)
                );
              }
              function Ar() {
                var qe = cr();
                return St(qe)
                  ? lr(qe)
                  : void (ut = setTimeout(
                      Ar,
                      (function Gt(qe) {
                        var Tr = I - (qe - ae);
                        return U ? zt(Tr, We - (qe - ye)) : Tr;
                      })(qe)
                    ));
              }
              function lr(qe) {
                return (
                  (ut = void 0), dn && Sn ? Q(qe) : ((Sn = rn = void 0), un)
                );
              }
              function Oo() {
                var qe = cr(),
                  Oe = St(qe);
                if (((Sn = arguments), (rn = this), (ae = qe), Oe)) {
                  if (void 0 === ut) return Dt(ae);
                  if (U) return (ut = setTimeout(Ar, I)), Q(ae);
                }
                return void 0 === ut && (ut = setTimeout(Ar, I)), un;
              }
              var Sn,
                rn,
                We,
                un,
                ut,
                ae,
                ye = 0,
                ur = !1,
                U = !1,
                dn = !0;
              if ("function" != typeof B) throw new TypeError(se);
              return (
                (I = J(I) || 0),
                ge(De) &&
                  ((ur = !!De.leading),
                  (We = (U = "maxWait" in De) ? ze(J(De.maxWait) || 0, I) : We),
                  (dn = "trailing" in De ? !!De.trailing : dn)),
                (Oo.cancel = function Re() {
                  void 0 !== ut && clearTimeout(ut),
                    (ye = 0),
                    (Sn = ae = rn = ut = void 0);
                }),
                (Oo.flush = function ii() {
                  return void 0 === ut ? un : lr(cr());
                }),
                Oo
              );
            };
          }.call(
            pe,
            (function () {
              return this;
            })()
          ));
        },
        function (lt, pe) {
          "use strict";
          function k(Te) {
            var se = void 0,
              ue = void 0;
            for (se = 0; se < Te.length; se += 1)
              if (
                ((ue = Te[se]).dataset && ue.dataset.aos) ||
                (ue.children && k(ue.children))
              )
                return !0;
            return !1;
          }
          function H() {
            return (
              window.MutationObserver ||
              window.WebKitMutationObserver ||
              window.MozMutationObserver
            );
          }
          function Ee(Te) {
            Te &&
              Te.forEach(function (se) {
                var ue = Array.prototype.slice.call(se.addedNodes),
                  de = Array.prototype.slice.call(se.removedNodes);
                if (k(ue.concat(de))) return J();
              });
          }
          Object.defineProperty(pe, "__esModule", { value: !0 });
          var J = function () {};
          pe.default = {
            isSupported: function ge() {
              return !!H();
            },
            ready: function ke(Te, se) {
              var ue = window.document,
                Ne = new (H())(Ee);
              (J = se),
                Ne.observe(ue.documentElement, {
                  childList: !0,
                  subtree: !0,
                  removedNodes: !0,
                });
            },
          };
        },
        function (lt, pe) {
          "use strict";
          function H() {
            return (
              navigator.userAgent || navigator.vendor || window.opera || ""
            );
          }
          Object.defineProperty(pe, "__esModule", { value: !0 });
          var ge = (function () {
              function ue(de, Ne) {
                for (var Mt = 0; Mt < Ne.length; Mt++) {
                  var $t = Ne[Mt];
                  ($t.enumerable = $t.enumerable || !1),
                    ($t.configurable = !0),
                    "value" in $t && ($t.writable = !0),
                    Object.defineProperty(de, $t.key, $t);
                }
              }
              return function (de, Ne, Mt) {
                return Ne && ue(de.prototype, Ne), Mt && ue(de, Mt), de;
              };
            })(),
            ke =
              /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i,
            Ee =
              /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i,
            J =
              /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i,
            Te =
              /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i,
            se = (function () {
              function ue() {
                !(function k(ue, de) {
                  if (!(ue instanceof de))
                    throw new TypeError("Cannot call a class as a function");
                })(this, ue);
              }
              return (
                ge(ue, [
                  {
                    key: "phone",
                    value: function () {
                      var de = H();
                      return !(!ke.test(de) && !Ee.test(de.substr(0, 4)));
                    },
                  },
                  {
                    key: "mobile",
                    value: function () {
                      var de = H();
                      return !(!J.test(de) && !Te.test(de.substr(0, 4)));
                    },
                  },
                  {
                    key: "tablet",
                    value: function () {
                      return this.mobile() && !this.phone();
                    },
                  },
                ]),
                ue
              );
            })();
          pe.default = new se();
        },
        function (lt, pe) {
          "use strict";
          Object.defineProperty(pe, "__esModule", { value: !0 });
          pe.default = function (ge, ke) {
            var Ee = window.pageYOffset,
              J = window.innerHeight;
            ge.forEach(function (Te, se) {
              !(function (ge, ke, Ee) {
                var J = ge.node.getAttribute("data-aos-once");
                ke > ge.position
                  ? ge.node.classList.add("aos-animate")
                  : typeof J < "u" &&
                    ("false" === J || (!Ee && "true" !== J)) &&
                    ge.node.classList.remove("aos-animate");
              })(Te, J + Ee, ke);
            });
          };
        },
        function (lt, pe, k) {
          "use strict";
          Object.defineProperty(pe, "__esModule", { value: !0 });
          var ke = (function H(J) {
            return J && J.__esModule ? J : { default: J };
          })(k(12));
          pe.default = function (J, Te) {
            return (
              J.forEach(function (se, ue) {
                se.node.classList.add("aos-init"),
                  (se.position = (0, ke.default)(se.node, Te.offset));
              }),
              J
            );
          };
        },
        function (lt, pe, k) {
          "use strict";
          Object.defineProperty(pe, "__esModule", { value: !0 });
          var ke = (function H(J) {
            return J && J.__esModule ? J : { default: J };
          })(k(13));
          pe.default = function (J, Te) {
            var se = 0,
              ue = 0,
              de = window.innerHeight,
              Ne = {
                offset: J.getAttribute("data-aos-offset"),
                anchor: J.getAttribute("data-aos-anchor"),
                anchorPlacement: J.getAttribute("data-aos-anchor-placement"),
              };
            switch (
              (Ne.offset && !isNaN(Ne.offset) && (ue = parseInt(Ne.offset)),
              Ne.anchor &&
                document.querySelectorAll(Ne.anchor) &&
                (J = document.querySelectorAll(Ne.anchor)[0]),
              (se = (0, ke.default)(J).top),
              Ne.anchorPlacement)
            ) {
              case "top-bottom":
                break;
              case "center-bottom":
                se += J.offsetHeight / 2;
                break;
              case "bottom-bottom":
                se += J.offsetHeight;
                break;
              case "top-center":
                se += de / 2;
                break;
              case "bottom-center":
                se += de / 2 + J.offsetHeight;
                break;
              case "center-center":
                se += de / 2 + J.offsetHeight / 2;
                break;
              case "top-top":
                se += de;
                break;
              case "bottom-top":
                se += J.offsetHeight + de;
                break;
              case "center-top":
                se += J.offsetHeight / 2 + de;
            }
            return (
              Ne.anchorPlacement || Ne.offset || isNaN(Te) || (ue = Te), se + ue
            );
          };
        },
        function (lt, pe) {
          "use strict";
          Object.defineProperty(pe, "__esModule", { value: !0 }),
            (pe.default = function (H) {
              for (
                var ge = 0, ke = 0;
                H && !isNaN(H.offsetLeft) && !isNaN(H.offsetTop);

              )
                (ge += H.offsetLeft - ("BODY" != H.tagName ? H.scrollLeft : 0)),
                  (ke += H.offsetTop - ("BODY" != H.tagName ? H.scrollTop : 0)),
                  (H = H.offsetParent);
              return { top: ke, left: ge };
            });
        },
        function (lt, pe) {
          "use strict";
          Object.defineProperty(pe, "__esModule", { value: !0 }),
            (pe.default = function (H) {
              return (
                (H = H || document.querySelectorAll("[data-aos]")),
                Array.prototype.map.call(H, function (ge) {
                  return { node: ge };
                })
              );
            });
        },
      ]);
    },
  },
  (hs) => {
    hs((hs.s = 599));
  },
]);
