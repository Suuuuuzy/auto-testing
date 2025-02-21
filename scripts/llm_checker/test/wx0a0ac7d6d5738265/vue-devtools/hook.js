var e = require("../@babel/runtime/helpers/slicedToArray");
require("../@babel/runtime/helpers/Arrayincludes");
var t = require("../@babel/runtime/helpers/defineProperty"),
  n = require("../@babel/runtime/helpers/objectSpread2"),
  r = require("../@babel/runtime/helpers/regeneratorRuntime"),
  i = require("../@babel/runtime/helpers/asyncToGenerator"),
  o = require("../@babel/runtime/helpers/classCallCheck"),
  s = require("../@babel/runtime/helpers/createClass"),
  a = require("../@babel/runtime/helpers/possibleConstructorReturn"),
  u = require("../@babel/runtime/helpers/get"),
  c = require("../@babel/runtime/helpers/getPrototypeOf"),
  l = require("../@babel/runtime/helpers/inherits"),
  f = require("../@babel/runtime/helpers/typeof"),
  d = require("../@babel/runtime/helpers/createForOfIteratorHelper");
!(function () {
  var p = {
      "../app-backend-core/lib/hook.js":
        /*!***************************************!*\
      !*** ../app-backend-core/lib/hook.js ***!
      \***************************************/
        function (e, t, n) {
          Object.defineProperty(t, "__esModule", { value: !0 }),
            (t.installHook = void 0),
            (t.installHook = function e(t) {
              var r =
                  arguments.length > 1 &&
                  void 0 !== arguments[1] &&
                  arguments[1],
                i = "6.0",
                o = {};
              function s(t) {
                if (!t.__vdevtools__injected)
                  try {
                    t.__vdevtools__injected = !0;
                    var n = function () {
                      try {
                        t.contentWindow.__VUE_DEVTOOLS_IFRAME__ = t;
                        var n = t.contentDocument.createElement("script");
                        (n.textContent =
                          ";(" + e.toString() + ")(window, true)"),
                          t.contentDocument.documentElement.appendChild(n),
                          n.parentNode.removeChild(n);
                      } catch (e) {}
                    };
                    n(),
                      t.addEventListener("load", function () {
                        return n();
                      });
                  } catch (e) {}
              }
              var a = 0;
              function u() {
                if ("undefined" != typeof window) {
                  var e,
                    t = document.querySelectorAll(
                      "iframe:not([data-vue-devtools-ignore])"
                    ),
                    n = d(t);
                  try {
                    for (n.s(); !(e = n.n()).done; ) {
                      s(e.value);
                    }
                  } catch (e) {
                    n.e(e);
                  } finally {
                    n.f();
                  }
                }
              }
              u();
              var c = setInterval(function () {
                u(), ++a >= 5 && clearInterval(c);
              }, 1e3);
              if (
                Object.prototype.hasOwnProperty.call(
                  t,
                  "__VUE_DEVTOOLS_GLOBAL_HOOK__"
                )
              )
                t.__VUE_DEVTOOLS_GLOBAL_HOOK__.devtoolsVersion !== i &&
                  console.error(
                    "Another version of Vue Devtools seems to be installed. Please enable only one version at a time."
                  );
              else {
                var l;
                if (r) {
                  var p = function (e) {
                    try {
                      var t = window.parent.__VUE_DEVTOOLS_GLOBAL_HOOK__;
                      if (t) return e(t);
                      console.warn("[Vue Devtools] No hook in parent window");
                    } catch (e) {
                      console.warn(
                        "[Vue Devtools] Failed to send message to parent window",
                        e
                      );
                    }
                  };
                  l = {
                    devtoolsVersion: i,
                    set Vue(e) {
                      p(function (t) {
                        t.Vue = e;
                      });
                    },
                    set enabled(e) {
                      p(function (t) {
                        t.enabled = e;
                      });
                    },
                    on: function (e, t) {
                      p(function (n) {
                        return n.on(e, t);
                      });
                    },
                    once: function (e, t) {
                      p(function (n) {
                        return n.once(e, t);
                      });
                    },
                    off: function (e, t) {
                      p(function (n) {
                        return n.off(e, t);
                      });
                    },
                    emit: function (e) {
                      for (
                        var t = arguments.length,
                          n = new Array(t > 1 ? t - 1 : 0),
                          r = 1;
                        r < t;
                        r++
                      )
                        n[r - 1] = arguments[r];
                      p(function (t) {
                        return t.emit.apply(t, [e].concat(n));
                      });
                    },
                    cleanupBuffer: function (e) {
                      var t;
                      return (
                        null !==
                          (t = p(function (t) {
                            return t.cleanupBuffer(e);
                          })) &&
                        void 0 !== t &&
                        t
                      );
                    },
                  };
                } else
                  (l = {
                    devtoolsVersion: i,
                    Vue: null,
                    enabled: void 0,
                    _buffer: [],
                    store: null,
                    initialState: null,
                    storeModules: null,
                    flushStoreModules: null,
                    apps: [],
                    _replayBuffer: function (e) {
                      var t = this._buffer;
                      this._buffer = [];
                      for (var n = 0, r = t.length; n < r; n++) {
                        var i = t[n];
                        i[0] === e
                          ? this.emit.apply(this, i)
                          : this._buffer.push(i);
                      }
                    },
                    on: function (e, t) {
                      var n = "$" + e;
                      o[n]
                        ? o[n].push(t)
                        : ((o[n] = [t]), this._replayBuffer(e));
                    },
                    once: function (e, t) {
                      var n = this;
                      this.on(e, function r() {
                        n.off(e, r);
                        for (
                          var i = arguments.length, o = new Array(i), s = 0;
                          s < i;
                          s++
                        )
                          o[s] = arguments[s];
                        return t.apply(n, o);
                      });
                    },
                    off: function (e, t) {
                      if (((e = "$" + e), arguments.length)) {
                        var n = o[e];
                        if (n)
                          if (t)
                            for (var r = 0, i = n.length; r < i; r++) {
                              var s = n[r];
                              if (s === t || s.fn === t) {
                                n.splice(r, 1);
                                break;
                              }
                            }
                          else o[e] = null;
                      } else o = {};
                    },
                    emit: function (e) {
                      for (
                        var t = arguments.length,
                          n = new Array(t > 1 ? t - 1 : 0),
                          r = 1;
                        r < t;
                        r++
                      )
                        n[r - 1] = arguments[r];
                      var i = "$" + e,
                        s = o[i];
                      if (s)
                        for (var a = 0, u = (s = s.slice()).length; a < u; a++)
                          try {
                            var c = s[a].apply(this, n);
                            "function" ==
                              typeof (null == c ? void 0 : c.catch) &&
                              c.catch(function (t) {
                                console.error(
                                  "[Hook] Error in async event handler for ".concat(
                                    e,
                                    " with args:"
                                  ),
                                  n
                                ),
                                  console.error(t);
                              });
                          } catch (t) {
                            console.error(
                              "[Hook] Error in event handler for ".concat(
                                e,
                                " with args:"
                              ),
                              n
                            ),
                              console.error(t);
                          }
                      else this._buffer.push([e].concat(n));
                    },
                    cleanupBuffer: function (e) {
                      var t = !1;
                      return (
                        (this._buffer = this._buffer.filter(function (n) {
                          return (
                            !n.some(function (t) {
                              return t === e;
                            }) || ((t = !0), !1)
                          );
                        })),
                        t
                      );
                    },
                  }).once("init", function (e) {
                    (l.Vue = e),
                      e &&
                        (e.prototype.$inspect = function () {
                          var e = t.__VUE_DEVTOOLS_INSPECT__;
                          e && e(this);
                        });
                  }),
                    l.on("app:init", function (e, t, n) {
                      var r = { app: e, version: t, types: n };
                      l.apps.push(r), l.emit("app:add", r);
                    }),
                    l.once("vuex:init", function (e) {
                      (l.store = e), (l.initialState = w(e.state));
                      var t,
                        n,
                        r = e.replaceState.bind(e);
                      (e.replaceState = function (e) {
                        (l.initialState = w(e)), r(e);
                      }),
                        e.registerModule &&
                          ((l.storeModules = []),
                          (t = e.registerModule.bind(e)),
                          (e.registerModule = function (e, n, r) {
                            "string" == typeof e && (e = [e]),
                              l.storeModules.push({
                                path: e,
                                module: n,
                                options: r,
                              }),
                              t(e, n, r),
                              console.log("early register module", e, n, r);
                          }),
                          (n = e.unregisterModule.bind(e)),
                          (e.unregisterModule = function (e) {
                            "string" == typeof e && (e = [e]);
                            var t = e.join("/"),
                              r = l.storeModules.findIndex(function (e) {
                                return e.path.join("/") === t;
                              });
                            -1 !== r && l.storeModules.splice(r, 1),
                              n(e),
                              console.log("early unregister module", e);
                          })),
                        (l.flushStoreModules = function () {
                          return (
                            (e.replaceState = r),
                            e.registerModule &&
                              ((e.registerModule = t),
                              (e.unregisterModule = n)),
                            l.storeModules || []
                          );
                        });
                    });
                if (
                  (Object.defineProperty(t, "__VUE_DEVTOOLS_GLOBAL_HOOK__", {
                    get: function () {
                      return l;
                    },
                  }),
                  t.__VUE_DEVTOOLS_HOOK_REPLAY__)
                )
                  try {
                    t.__VUE_DEVTOOLS_HOOK_REPLAY__.forEach(function (e) {
                      return e(l);
                    }),
                      (t.__VUE_DEVTOOLS_HOOK_REPLAY__ = []);
                  } catch (e) {
                    console.error("[vue-devtools] Error during hook replay", e);
                  }
                var h = Function.prototype.toString,
                  _ = Object.create,
                  v = Object.defineProperty,
                  g = Object.getOwnPropertyDescriptor,
                  m = Object.getOwnPropertyNames,
                  O = Object.getOwnPropertySymbols,
                  y = Object.getPrototypeOf,
                  E = Object.prototype,
                  T = E.hasOwnProperty,
                  b = E.propertyIsEnumerable,
                  N = {
                    SYMBOL_PROPERTIES: "function" == typeof O,
                    WEAKSET: "function" == typeof WeakSet,
                  },
                  S = function () {
                    if (N.WEAKSET) return new WeakSet();
                    var e = _({
                      add: function (t) {
                        return e._values.push(t);
                      },
                      has: function (t) {
                        return !!~e._values.indexOf(t);
                      },
                    });
                    return (e._values = []), e;
                  },
                  C = function (e, t) {
                    if (!e.constructor) return _(null);
                    var n = e.__proto__ || y(e);
                    if (e.constructor === t.Object)
                      return n === t.Object.prototype ? {} : _(n);
                    if (~h.call(e.constructor).indexOf("[native code]"))
                      try {
                        return new e.constructor();
                      } catch (e) {}
                    return _(n);
                  },
                  A = function (e, t, n, r) {
                    var i = C(e, t);
                    for (var o in e) T.call(e, o) && (i[o] = n(e[o], r));
                    if (N.SYMBOL_PROPERTIES) {
                      var s = O(e);
                      if (s.length)
                        for (var a, u = 0; u < s.length; u++)
                          (a = s[u]), b.call(e, a) && (i[a] = n(e[a], r));
                    }
                    return i;
                  },
                  I = function (e, t, n, r) {
                    var i = C(e, t),
                      o = N.SYMBOL_PROPERTIES ? [].concat(m(e), O(e)) : m(e);
                    if (o.length)
                      for (var s, a, u = 0; u < o.length; u++)
                        "callee" !== (s = o[u]) &&
                          "caller" !== s &&
                          (((a = g(e, s)).value = n(e[s], r)), v(i, s, a));
                    return i;
                  },
                  M = function (e) {
                    var t = "";
                    return (
                      e.global && (t += "g"),
                      e.ignoreCase && (t += "i"),
                      e.multiline && (t += "m"),
                      e.unicode && (t += "u"),
                      e.sticky && (t += "y"),
                      t
                    );
                  },
                  P = Array.isArray,
                  D =
                    "undefined" != typeof self
                      ? self
                      : "undefined" != typeof window
                      ? window
                      : void 0 !== n.g
                      ? n.g
                      : void (
                          console &&
                          console.error &&
                          console.error(
                            'Unable to locate global object, returning "this".'
                          )
                        );
              }
              function w(e) {
                var t =
                    arguments.length > 1 && void 0 !== arguments[1]
                      ? arguments[1]
                      : null,
                  n = !(!t || !t.isStrict),
                  r = (t && t.realm) || D,
                  i = n ? I : A,
                  o = function e(t, o) {
                    if (!t || "object" !== f(t) || o.has(t)) return t;
                    if (
                      "undefined" != typeof HTMLElement &&
                      t instanceof HTMLElement
                    )
                      return t.cloneNode(!1);
                    var s,
                      a = t.constructor;
                    if (a === r.Object) return o.add(t), i(t, r, e, o);
                    if (P(t)) {
                      if ((o.add(t), n)) return I(t, r, e, o);
                      s = new a();
                      for (var u = 0; u < t.length; u++) s[u] = e(t[u], o);
                      return s;
                    }
                    if (t instanceof r.Date) return new a(t.getTime());
                    if (t instanceof r.RegExp)
                      return (
                        ((s = new a(t.source, t.flags || M(t))).lastIndex =
                          t.lastIndex),
                        s
                      );
                    if (r.Map && t instanceof r.Map)
                      return (
                        o.add(t),
                        (s = new a()),
                        t.forEach(function (t, n) {
                          s.set(n, e(t, o));
                        }),
                        s
                      );
                    if (r.Set && t instanceof r.Set)
                      return (
                        o.add(t),
                        (s = new a()),
                        t.forEach(function (t) {
                          s.add(e(t, o));
                        }),
                        s
                      );
                    if (r.Buffer && r.Buffer.isBuffer(t))
                      return (
                        (s = r.Buffer.allocUnsafe
                          ? r.Buffer.allocUnsafe(t.length)
                          : new a(t.length)),
                        t.copy(s),
                        s
                      );
                    if (r.ArrayBuffer) {
                      if (r.ArrayBuffer.isView(t))
                        return new a(t.buffer.slice(0));
                      if (t instanceof r.ArrayBuffer) return t.slice(0);
                    }
                    return (T.call(t, "then") && "function" == typeof t.then) ||
                      t instanceof Error ||
                      (r.WeakMap && t instanceof r.WeakMap) ||
                      (r.WeakSet && t instanceof r.WeakSet)
                      ? t
                      : (o.add(t), i(t, r, e, o));
                  };
                return o(e, S());
              }
            });
        },
      "../shared-utils/lib/backend.js":
        /*!**************************************!*\
      !*** ../shared-utils/lib/backend.js ***!
      \**************************************/
        function (e, t) {
          function n(e) {
            for (
              var t = {},
                n = e.getters || {},
                r = Object.keys(n),
                i = function () {
                  var e = r[o];
                  Object.defineProperty(t, e, {
                    enumerable: !0,
                    get: function () {
                      try {
                        return n[e];
                      } catch (e) {
                        return e;
                      }
                    },
                  });
                },
                o = 0;
              o < r.length;
              o++
            )
              i();
            return t;
          }
          Object.defineProperty(t, "__esModule", { value: !0 }),
            (t.getCatchedGetters =
              t.getCustomStoreDetails =
              t.getCustomRouterDetails =
              t.isVueInstance =
              t.getCustomObjectDetails =
              t.getCustomInstanceDetails =
              t.getInstanceMap =
              t.backendInjections =
                void 0),
            (t.backendInjections = {
              instanceMap: new Map(),
              isVueInstance: function () {
                return !1;
              },
              getCustomInstanceDetails: function () {
                return {};
              },
              getCustomObjectDetails: function () {},
            }),
            (t.getInstanceMap = function () {
              return t.backendInjections.instanceMap;
            }),
            (t.getCustomInstanceDetails = function (e) {
              return t.backendInjections.getCustomInstanceDetails(e);
            }),
            (t.getCustomObjectDetails = function (e, n) {
              return t.backendInjections.getCustomObjectDetails(e, n);
            }),
            (t.isVueInstance = function (e) {
              return t.backendInjections.isVueInstance(e);
            }),
            (t.getCustomRouterDetails = function (e) {
              return {
                _custom: {
                  type: "router",
                  display: "VueRouter",
                  value: { options: e.options, currentRoute: e.currentRoute },
                  fields: { abstract: !0 },
                },
              };
            }),
            (t.getCustomStoreDetails = function (e) {
              return {
                _custom: {
                  type: "store",
                  display: "Store",
                  value: { state: e.state, getters: n(e) },
                  fields: { abstract: !0 },
                },
              };
            }),
            (t.getCatchedGetters = n);
        },
      "../shared-utils/lib/bridge.js":
        /*!*************************************!*\
      !*** ../shared-utils/lib/bridge.js ***!
      \*************************************/
        function (e, t, n) {
          Object.defineProperty(t, "__esModule", { value: !0 }),
            (t.Bridge = void 0);
          var f = n(/*! events */ "../../node_modules/events/events.js"),
            d = n(/*! ./raf */ "../shared-utils/lib/raf.js"),
            p = (function (e) {
              function t(e) {
                var n, r, i, s;
                return (
                  o(this, t),
                  (r = this),
                  (i = c((i = t))),
                  (n = a(
                    r,
                    (function () {
                      if ("undefined" == typeof Reflect || !Reflect.construct)
                        return !1;
                      if (Reflect.construct.sham) return !1;
                      if ("function" == typeof Proxy) return !0;
                      try {
                        return !Boolean.prototype.valueOf.call(
                          Reflect.construct(Boolean, [], function () {})
                        );
                      } catch (e) {
                        return !1;
                      }
                    })()
                      ? Reflect.construct(i, s || [], c(r).constructor)
                      : i.apply(r, s)
                  )).setMaxListeners(1 / 0),
                  (n.wall = e),
                  e.listen(function (e) {
                    Array.isArray(e)
                      ? e.forEach(function (e) {
                          return n._emit(e);
                        })
                      : n._emit(e);
                  }),
                  (n._batchingQueue = []),
                  (n._sendingQueue = []),
                  (n._receivingQueue = []),
                  (n._sending = !1),
                  n
                );
              }
              return (
                l(t, e),
                s(t, [
                  {
                    key: "on",
                    value: function (e, n) {
                      var o = (function () {
                        var t = i(
                          r().mark(function t() {
                            var i,
                              o,
                              s,
                              a = arguments;
                            return r().wrap(
                              function (t) {
                                for (;;)
                                  switch ((t.prev = t.next)) {
                                    case 0:
                                      for (
                                        i = a.length, o = new Array(i), s = 0;
                                        s < i;
                                        s++
                                      )
                                        o[s] = a[s];
                                      return (
                                        (t.prev = 1),
                                        (t.next = 4),
                                        n.apply(void 0, o)
                                      );
                                    case 4:
                                      t.next = 10;
                                      break;
                                    case 6:
                                      (t.prev = 6),
                                        (t.t0 = t.catch(1)),
                                        console.error(
                                          "[Bridge] Error in listener for event ".concat(
                                            e.toString(),
                                            " with args:"
                                          ),
                                          o
                                        ),
                                        console.error(t.t0);
                                    case 10:
                                    case "end":
                                      return t.stop();
                                  }
                              },
                              t,
                              null,
                              [[1, 6]]
                            );
                          })
                        );
                        return function () {
                          return t.apply(this, arguments);
                        };
                      })();
                      return u(c(t.prototype), "on", this).call(this, e, o);
                    },
                  },
                  {
                    key: "send",
                    value: function (e, t) {
                      var n = this;
                      this._batchingQueue.push({ event: e, payload: t }),
                        null == this._timer &&
                          (this._timer = setTimeout(function () {
                            return n._flush();
                          }, 100));
                    },
                  },
                  {
                    key: "log",
                    value: function (e) {
                      this.send("log", e);
                    },
                  },
                  {
                    key: "_flush",
                    value: function () {
                      this._batchingQueue.length &&
                        this._send(this._batchingQueue),
                        clearTimeout(this._timer),
                        (this._timer = null),
                        (this._batchingQueue = []);
                    },
                  },
                  {
                    key: "_emit",
                    value: function (e) {
                      "string" == typeof e
                        ? this.emit(e)
                        : e._chunk
                        ? (this._receivingQueue.push(e._chunk),
                          e.last &&
                            (this.emit(e.event, this._receivingQueue),
                            (this._receivingQueue = [])))
                        : e.event && this.emit(e.event, e.payload);
                    },
                  },
                  {
                    key: "_send",
                    value: function (e) {
                      this._sendingQueue.push(e), this._nextSend();
                    },
                  },
                  {
                    key: "_nextSend",
                    value: function () {
                      var e = this;
                      if (this._sendingQueue.length && !this._sending) {
                        this._sending = !0;
                        var t = this._sendingQueue.shift();
                        try {
                          this.wall.send(t);
                        } catch (e) {
                          "Message length exceeded maximum allowed length." ===
                            e.message &&
                            this._sendingQueue.splice(
                              0,
                              0,
                              t.map(function (e) {
                                return [e];
                              })
                            );
                        }
                        (this._sending = !1),
                          (0, d.raf)(function () {
                            return e._nextSend();
                          });
                      }
                    },
                  },
                ])
              );
            })(f.EventEmitter);
          t.Bridge = p;
        },
      "../shared-utils/lib/consts.js":
        /*!*************************************!*\
      !*** ../shared-utils/lib/consts.js ***!
      \*************************************/
        function (e, t) {
          Object.defineProperty(t, "__esModule", { value: !0 }),
            (t.HookEvents =
              t.BridgeSubscriptions =
              t.BridgeEvents =
              t.BuiltinTabs =
                void 0),
            (function (e) {
              (e.COMPONENTS = "components"),
                (e.TIMELINE = "timeline"),
                (e.PLUGINS = "plugins"),
                (e.SETTINGS = "settings");
            })(t.BuiltinTabs || (t.BuiltinTabs = {})),
            (function (e) {
              (e.TO_BACK_SUBSCRIBE = "b:subscribe"),
                (e.TO_BACK_UNSUBSCRIBE = "b:unsubscribe"),
                (e.TO_FRONT_READY = "f:ready"),
                (e.TO_BACK_LOG_DETECTED_VUE = "b:log-detected-vue"),
                (e.TO_BACK_REFRESH = "b:refresh"),
                (e.TO_BACK_TAB_SWITCH = "b:tab:switch"),
                (e.TO_BACK_LOG = "b:log"),
                (e.TO_FRONT_RECONNECTED = "f:reconnected"),
                (e.TO_FRONT_TITLE = "f:title"),
                (e.TO_FRONT_APP_ADD = "f:app:add"),
                (e.TO_BACK_APP_LIST = "b:app:list"),
                (e.TO_FRONT_APP_LIST = "f:app:list"),
                (e.TO_FRONT_APP_REMOVE = "f:app:remove"),
                (e.TO_BACK_APP_SELECT = "b:app:select"),
                (e.TO_FRONT_APP_SELECTED = "f:app:selected"),
                (e.TO_BACK_SCAN_LEGACY_APPS = "b:app:scan-legacy"),
                (e.TO_BACK_COMPONENT_TREE = "b:component:tree"),
                (e.TO_FRONT_COMPONENT_TREE = "f:component:tree"),
                (e.TO_BACK_COMPONENT_SELECTED_DATA =
                  "b:component:selected-data"),
                (e.TO_FRONT_COMPONENT_SELECTED_DATA =
                  "f:component:selected-data"),
                (e.TO_BACK_COMPONENT_EXPAND = "b:component:expand"),
                (e.TO_FRONT_COMPONENT_EXPAND = "f:component:expand"),
                (e.TO_BACK_COMPONENT_SCROLL_TO = "b:component:scroll-to"),
                (e.TO_BACK_COMPONENT_FILTER = "b:component:filter"),
                (e.TO_BACK_COMPONENT_MOUSE_OVER = "b:component:mouse-over"),
                (e.TO_BACK_COMPONENT_MOUSE_OUT = "b:component:mouse-out"),
                (e.TO_BACK_COMPONENT_CONTEXT_MENU_TARGET =
                  "b:component:context-menu-target"),
                (e.TO_BACK_COMPONENT_EDIT_STATE = "b:component:edit-state"),
                (e.TO_BACK_COMPONENT_PICK = "b:component:pick"),
                (e.TO_FRONT_COMPONENT_PICK = "f:component:pick"),
                (e.TO_BACK_COMPONENT_PICK_CANCELED =
                  "b:component:pick-canceled"),
                (e.TO_FRONT_COMPONENT_PICK_CANCELED =
                  "f:component:pick-canceled"),
                (e.TO_BACK_COMPONENT_INSPECT_DOM = "b:component:inspect-dom"),
                (e.TO_FRONT_COMPONENT_INSPECT_DOM = "f:component:inspect-dom"),
                (e.TO_BACK_COMPONENT_RENDER_CODE = "b:component:render-code"),
                (e.TO_FRONT_COMPONENT_RENDER_CODE = "f:component:render-code"),
                (e.TO_FRONT_COMPONENT_UPDATED = "f:component:updated"),
                (e.TO_FRONT_TIMELINE_EVENT = "f:timeline:event"),
                (e.TO_BACK_TIMELINE_LAYER_LIST = "b:timeline:layer-list"),
                (e.TO_FRONT_TIMELINE_LAYER_LIST = "f:timeline:layer-list"),
                (e.TO_FRONT_TIMELINE_LAYER_ADD = "f:timeline:layer-add"),
                (e.TO_BACK_TIMELINE_SHOW_SCREENSHOT =
                  "b:timeline:show-screenshot"),
                (e.TO_BACK_TIMELINE_CLEAR = "b:timeline:clear"),
                (e.TO_BACK_TIMELINE_EVENT_DATA = "b:timeline:event-data"),
                (e.TO_FRONT_TIMELINE_EVENT_DATA = "f:timeline:event-data"),
                (e.TO_BACK_TIMELINE_LAYER_LOAD_EVENTS =
                  "b:timeline:layer-load-events"),
                (e.TO_FRONT_TIMELINE_LAYER_LOAD_EVENTS =
                  "f:timeline:layer-load-events"),
                (e.TO_BACK_TIMELINE_LOAD_MARKERS = "b:timeline:load-markers"),
                (e.TO_FRONT_TIMELINE_LOAD_MARKERS = "f:timeline:load-markers"),
                (e.TO_FRONT_TIMELINE_MARKER = "f:timeline:marker"),
                (e.TO_BACK_DEVTOOLS_PLUGIN_LIST = "b:devtools-plugin:list"),
                (e.TO_FRONT_DEVTOOLS_PLUGIN_LIST = "f:devtools-plugin:list"),
                (e.TO_FRONT_DEVTOOLS_PLUGIN_ADD = "f:devtools-plugin:add"),
                (e.TO_BACK_DEVTOOLS_PLUGIN_SETTING_UPDATED =
                  "b:devtools-plugin:setting-updated"),
                (e.TO_BACK_CUSTOM_INSPECTOR_LIST = "b:custom-inspector:list"),
                (e.TO_FRONT_CUSTOM_INSPECTOR_LIST = "f:custom-inspector:list"),
                (e.TO_FRONT_CUSTOM_INSPECTOR_ADD = "f:custom-inspector:add"),
                (e.TO_BACK_CUSTOM_INSPECTOR_TREE = "b:custom-inspector:tree"),
                (e.TO_FRONT_CUSTOM_INSPECTOR_TREE = "f:custom-inspector:tree"),
                (e.TO_BACK_CUSTOM_INSPECTOR_STATE = "b:custom-inspector:state"),
                (e.TO_FRONT_CUSTOM_INSPECTOR_STATE =
                  "f:custom-inspector:state"),
                (e.TO_BACK_CUSTOM_INSPECTOR_EDIT_STATE =
                  "b:custom-inspector:edit-state"),
                (e.TO_BACK_CUSTOM_INSPECTOR_ACTION =
                  "b:custom-inspector:action"),
                (e.TO_BACK_CUSTOM_INSPECTOR_NODE_ACTION =
                  "b:custom-inspector:node-action"),
                (e.TO_FRONT_CUSTOM_INSPECTOR_SELECT_NODE =
                  "f:custom-inspector:select-node"),
                (e.TO_BACK_CUSTOM_STATE_ACTION = "b:custom-state:action");
            })(t.BridgeEvents || (t.BridgeEvents = {})),
            (function (e) {
              (e.SELECTED_COMPONENT_DATA = "component:selected-data"),
                (e.COMPONENT_TREE = "component:tree");
            })(t.BridgeSubscriptions || (t.BridgeSubscriptions = {})),
            (function (e) {
              (e.INIT = "init"),
                (e.APP_INIT = "app:init"),
                (e.APP_ADD = "app:add"),
                (e.APP_UNMOUNT = "app:unmount"),
                (e.COMPONENT_UPDATED = "component:updated"),
                (e.COMPONENT_ADDED = "component:added"),
                (e.COMPONENT_REMOVED = "component:removed"),
                (e.COMPONENT_EMIT = "component:emit"),
                (e.COMPONENT_HIGHLIGHT = "component:highlight"),
                (e.COMPONENT_UNHIGHLIGHT = "component:unhighlight"),
                (e.SETUP_DEVTOOLS_PLUGIN = "devtools-plugin:setup"),
                (e.TIMELINE_LAYER_ADDED = "timeline:layer-added"),
                (e.TIMELINE_EVENT_ADDED = "timeline:event-added"),
                (e.CUSTOM_INSPECTOR_ADD = "custom-inspector:add"),
                (e.CUSTOM_INSPECTOR_SEND_TREE = "custom-inspector:send-tree"),
                (e.CUSTOM_INSPECTOR_SEND_STATE = "custom-inspector:send-state"),
                (e.CUSTOM_INSPECTOR_SELECT_NODE =
                  "custom-inspector:select-node"),
                (e.PERFORMANCE_START = "perf:start"),
                (e.PERFORMANCE_END = "perf:end"),
                (e.PLUGIN_SETTINGS_SET = "plugin:settings:set"),
                (e.FLUSH = "flush"),
                (e.TRACK_UPDATE = "_track-update"),
                (e.FLASH_UPDATE = "_flash-update");
            })(t.HookEvents || (t.HookEvents = {}));
        },
      "../shared-utils/lib/edit.js":
        /*!***********************************!*\
      !*** ../shared-utils/lib/edit.js ***!
      \***********************************/
        function (e, t) {
          Object.defineProperty(t, "__esModule", { value: !0 }),
            (t.StateEditor = void 0);
          var n = (function () {
            return s(
              function e() {
                o(this, e);
              },
              [
                {
                  key: "set",
                  value: function (e, t, n) {
                    for (
                      var r =
                          arguments.length > 3 && void 0 !== arguments[3]
                            ? arguments[3]
                            : null,
                        i = Array.isArray(t) ? t : t.split(".");
                      i.length > 1;

                    )
                      (e = e[i.shift()]),
                        this.isRef(e) && (e = this.getRefValue(e));
                    var o = i[0];
                    r
                      ? r(e, o, n)
                      : this.isRef(e[o])
                      ? this.setRefValue(e[o], n)
                      : (e[o] = n);
                  },
                },
                {
                  key: "get",
                  value: function (e, t) {
                    for (
                      var n = Array.isArray(t) ? t : t.split("."), r = 0;
                      r < n.length;
                      r++
                    )
                      if (
                        ((e = e[n[r]]),
                        this.isRef(e) && (e = this.getRefValue(e)),
                        !e)
                      )
                        return;
                    return e;
                  },
                },
                {
                  key: "has",
                  value: function (e, t) {
                    var n =
                      arguments.length > 2 &&
                      void 0 !== arguments[2] &&
                      arguments[2];
                    if (void 0 === e) return !1;
                    for (
                      var r = Array.isArray(t) ? t.slice() : t.split("."),
                        i = n ? 2 : 1;
                      e && r.length > i;

                    )
                      (e = e[r.shift()]),
                        this.isRef(e) && (e = this.getRefValue(e));
                    return (
                      null != e && Object.prototype.hasOwnProperty.call(e, r[0])
                    );
                  },
                },
                {
                  key: "createDefaultSetCallback",
                  value: function (e) {
                    var t = this;
                    return function (n, r, i) {
                      if (
                        ((e.remove || e.newKey) &&
                          (Array.isArray(n) ? n.splice(r, 1) : delete n[r]),
                        !e.remove)
                      ) {
                        var o = n[e.newKey || r];
                        t.isRef(o)
                          ? t.setRefValue(o, i)
                          : (n[e.newKey || r] = i);
                      }
                    };
                  },
                },
                {
                  key: "isRef",
                  value: function (e) {
                    return !1;
                  },
                },
                { key: "setRefValue", value: function (e, t) {} },
                {
                  key: "getRefValue",
                  value: function (e) {
                    return e;
                  },
                },
              ]
            );
          })();
          t.StateEditor = n;
        },
      "../shared-utils/lib/env.js":
        /*!**********************************!*\
      !*** ../shared-utils/lib/env.js ***!
      \**********************************/
        function (e, t) {
          Object.defineProperty(t, "__esModule", { value: !0 }),
            (t.initEnv =
              t.keys =
              t.isLinux =
              t.isMac =
              t.isWindows =
              t.isFirefox =
              t.isChrome =
              t.target =
              t.isBrowser =
                void 0),
            (t.isBrowser =
              "undefined" != typeof navigator && "undefined" != typeof window),
            (t.target = t.isBrowser
              ? window
              : "undefined" != typeof globalThis
              ? globalThis
              : "undefined" != typeof global
              ? global
              : "undefined" != typeof my
              ? my
              : {}),
            (t.isChrome =
              void 0 !== t.target.chrome && !!t.target.chrome.devtools),
            (t.isFirefox =
              t.isBrowser &&
              navigator.userAgent &&
              navigator.userAgent.indexOf("Firefox") > -1),
            (t.isWindows =
              t.isBrowser && 0 === navigator.platform.indexOf("Win")),
            (t.isMac = t.isBrowser && "MacIntel" === navigator.platform),
            (t.isLinux =
              t.isBrowser && 0 === navigator.platform.indexOf("Linux")),
            (t.keys = {
              ctrl: t.isMac ? "&#8984;" : "Ctrl",
              shift: "Shift",
              alt: t.isMac ? "&#8997;" : "Alt",
              del: "Del",
              enter: "Enter",
              esc: "Esc",
            }),
            (t.initEnv = function (e) {
              e.prototype.hasOwnProperty("$isChrome") ||
                (Object.defineProperties(e.prototype, {
                  $isChrome: {
                    get: function () {
                      return t.isChrome;
                    },
                  },
                  $isFirefox: {
                    get: function () {
                      return t.isFirefox;
                    },
                  },
                  $isWindows: {
                    get: function () {
                      return t.isWindows;
                    },
                  },
                  $isMac: {
                    get: function () {
                      return t.isMac;
                    },
                  },
                  $isLinux: {
                    get: function () {
                      return t.isLinux;
                    },
                  },
                  $keys: {
                    get: function () {
                      return t.keys;
                    },
                  },
                }),
                t.isWindows && document.body.classList.add("platform-windows"),
                t.isMac && document.body.classList.add("platform-mac"),
                t.isLinux && document.body.classList.add("platform-linux"));
            });
        },
      "../shared-utils/lib/index.js":
        /*!************************************!*\
      !*** ../shared-utils/lib/index.js ***!
      \************************************/
        function (e, t, n) {
          var r =
              (this && this.__createBinding) ||
              (Object.create
                ? function (e, t, n, r) {
                    void 0 === r && (r = n);
                    var i = Object.getOwnPropertyDescriptor(t, n);
                    (i &&
                      !("get" in i
                        ? !t.__esModule
                        : i.writable || i.configurable)) ||
                      (i = {
                        enumerable: !0,
                        get: function () {
                          return t[n];
                        },
                      }),
                      Object.defineProperty(e, r, i);
                  }
                : function (e, t, n, r) {
                    void 0 === r && (r = n), (e[r] = t[n]);
                  }),
            i =
              (this && this.__exportStar) ||
              function (e, t) {
                for (var n in e)
                  "default" === n ||
                    Object.prototype.hasOwnProperty.call(t, n) ||
                    r(t, e, n);
              };
          Object.defineProperty(t, "__esModule", { value: !0 }),
            i(n(/*! ./backend */ "../shared-utils/lib/backend.js"), t),
            i(n(/*! ./bridge */ "../shared-utils/lib/bridge.js"), t),
            i(n(/*! ./consts */ "../shared-utils/lib/consts.js"), t),
            i(n(/*! ./edit */ "../shared-utils/lib/edit.js"), t),
            i(n(/*! ./env */ "../shared-utils/lib/env.js"), t),
            i(
              n(
                /*! ./plugin-permissions */ "../shared-utils/lib/plugin-permissions.js"
              ),
              t
            ),
            i(
              n(
                /*! ./plugin-settings */ "../shared-utils/lib/plugin-settings.js"
              ),
              t
            ),
            i(n(/*! ./shared-data */ "../shared-utils/lib/shared-data.js"), t),
            i(n(/*! ./shell */ "../shared-utils/lib/shell.js"), t),
            i(n(/*! ./storage */ "../shared-utils/lib/storage.js"), t),
            i(n(/*! ./transfer */ "../shared-utils/lib/transfer.js"), t),
            i(n(/*! ./util */ "../shared-utils/lib/util.js"), t),
            i(n(/*! ./raf */ "../shared-utils/lib/raf.js"), t);
        },
      "../shared-utils/lib/plugin-permissions.js":
        /*!*************************************************!*\
      !*** ../shared-utils/lib/plugin-permissions.js ***!
      \*************************************************/
        function (e, r, i) {
          Object.defineProperty(r, "__esModule", { value: !0 }),
            (r.setPluginPermission =
              r.hasPluginPermission =
              r.PluginPermission =
                void 0);
          var o = i(/*! ./shared-data */ "../shared-utils/lib/shared-data.js");
          !(function (e) {
            (e.ENABLED = "enabled"),
              (e.COMPONENTS = "components"),
              (e.CUSTOM_INSPECTOR = "custom-inspector"),
              (e.TIMELINE = "timeline");
          })(r.PluginPermission || (r.PluginPermission = {})),
            (r.hasPluginPermission = function (e, t) {
              var n =
                o.SharedData.pluginPermissions["".concat(e, ":").concat(t)];
              return null == n || !!n;
            }),
            (r.setPluginPermission = function (e, r, i) {
              o.SharedData.pluginPermissions = n(
                n({}, o.SharedData.pluginPermissions),
                {},
                t({}, "".concat(e, ":").concat(r), i)
              );
            });
        },
      "../shared-utils/lib/plugin-settings.js":
        /*!**********************************************!*\
      !*** ../shared-utils/lib/plugin-settings.js ***!
      \**********************************************/
        function (e, r, i) {
          Object.defineProperty(r, "__esModule", { value: !0 }),
            (r.getPluginDefaultSettings =
              r.setPluginSettings =
              r.getPluginSettings =
                void 0);
          var o = i(/*! ./shared-data */ "../shared-utils/lib/shared-data.js");
          (r.getPluginSettings = function (e, t) {
            var r;
            return n(
              n({}, null != t ? t : {}),
              null !== (r = o.SharedData.pluginSettings[e]) && void 0 !== r
                ? r
                : {}
            );
          }),
            (r.setPluginSettings = function (e, r) {
              o.SharedData.pluginSettings = n(
                n({}, o.SharedData.pluginSettings),
                {},
                t({}, e, r)
              );
            }),
            (r.getPluginDefaultSettings = function (e) {
              var t = {};
              if (e)
                for (var n in e) {
                  var r = e[n];
                  t[n] = r.defaultValue;
                }
              return t;
            });
        },
      "../shared-utils/lib/raf.js":
        /*!**********************************!*\
      !*** ../shared-utils/lib/raf.js ***!
      \**********************************/
        function (e, t) {
          Object.defineProperty(t, "__esModule", { value: !0 }),
            (t.raf = void 0);
          var n = [];
          t.raf =
            "function" == typeof requestAnimationFrame
              ? requestAnimationFrame
              : "function" == typeof setImmediate
              ? function (e) {
                  n.length ||
                    setImmediate(function () {
                      var e = performance.now(),
                        t = n;
                      (n = []),
                        t.forEach(function (t) {
                          return t(e);
                        });
                    }),
                    n.push(e);
                }
              : function (e) {
                  return setTimeout(function () {
                    e(Date.now());
                  }, 1e3 / 60);
                };
        },
      "../shared-utils/lib/shared-data.js":
        /*!******************************************!*\
      !*** ../shared-utils/lib/shared-data.js ***!
      \******************************************/
        function (e, t, r) {
          Object.defineProperty(t, "__esModule", { value: !0 }),
            (t.SharedData =
              t.watchSharedData =
              t.destroySharedData =
              t.onSharedDataInit =
              t.initSharedData =
                void 0);
          var i,
            o,
            s,
            a = r(/*! ./storage */ "../shared-utils/lib/storage.js"),
            u = r(/*! ./env */ "../shared-utils/lib/env.js"),
            c = {
              openInEditorHost: "/",
              componentNameStyle: "class",
              theme: "auto",
              displayDensity: "low",
              timeFormat: "default",
              recordVuex: !0,
              cacheVuexSnapshotsEvery: 50,
              cacheVuexSnapshotsLimit: 10,
              snapshotLoading: !1,
              componentEventsEnabled: !0,
              performanceMonitoringEnabled: !0,
              editableProps: !1,
              logDetected: !0,
              vuexNewBackend: !1,
              vuexAutoload: !1,
              vuexGroupGettersByModule: !0,
              showMenuScrollTip: !0,
              timelineTimeGrid: !0,
              timelineScreenshots: !0,
              menuStepScrolling: u.isMac,
              pluginPermissions: {},
              pluginSettings: {},
              pageConfig: {},
              legacyApps: !1,
              trackUpdates: !0,
              flashUpdates: !1,
              debugInfo: !1,
              isBrowser: u.isBrowser,
            },
            l = [
              "componentNameStyle",
              "theme",
              "displayDensity",
              "recordVuex",
              "editableProps",
              "logDetected",
              "vuexNewBackend",
              "vuexAutoload",
              "vuexGroupGettersByModule",
              "timeFormat",
              "showMenuScrollTip",
              "timelineTimeGrid",
              "timelineScreenshots",
              "menuStepScrolling",
              "pluginPermissions",
              "pluginSettings",
              "performanceMonitoringEnabled",
              "componentEventsEnabled",
              "trackUpdates",
              "flashUpdates",
              "debugInfo",
            ],
            f = !1,
            d = 0,
            p = [];
          (t.initSharedData = function (e) {
            return new Promise(function (t) {
              (i = e.bridge),
                (f = !!e.persist)
                  ? (console.log("[shared data] Master init in progress..."),
                    l.forEach(function (e) {
                      var t = (0, a.getStorage)(
                        "vue-devtools-"
                          .concat("6.0.0-alpha.1", ":shared-data:")
                          .concat(e)
                      );
                      null !== t && (c[e] = t);
                    }),
                    i.on("shared-data:load", function () {
                      Object.keys(c).forEach(function (e) {
                        v(e, c[e]);
                      }),
                        i.send("shared-data:load-complete");
                    }),
                    i.on("shared-data:init-complete", function () {
                      console.log("[shared data] Master init complete"),
                        clearInterval(s),
                        t();
                    }),
                    i.send("shared-data:master-init-waiting"),
                    i.on("shared-data:minion-init-waiting", function () {
                      i.send("shared-data:master-init-waiting");
                    }),
                    (d = 0),
                    clearInterval(s),
                    (s = setInterval(function () {
                      console.log("[shared data] Master init retrying..."),
                        i.send("shared-data:master-init-waiting"),
                        ++d > 30 &&
                          (clearInterval(s),
                          console.error("[shared data] Master init failed"));
                    }, 2e3)))
                  : (i.on("shared-data:master-init-waiting", function () {
                      i.send("shared-data:load"),
                        i.once("shared-data:load-complete", function () {
                          i.send("shared-data:init-complete"), t();
                        });
                    }),
                    i.send("shared-data:minion-init-waiting")),
                (o = n({}, c)),
                e.Vue && (o = e.Vue.observable(o)),
                i.on("shared-data:set", function (e) {
                  _(e.key, e.value);
                }),
                p.forEach(function (e) {
                  return e();
                });
            });
          }),
            (t.onSharedDataInit = function (e) {
              return (
                p.push(e),
                function () {
                  var t = p.indexOf(e);
                  -1 !== t && p.splice(t, 1);
                }
              );
            }),
            (t.destroySharedData = function () {
              i.removeAllListeners("shared-data:set"), (h = {});
            });
          var h = {};
          function _(e, t) {
            f &&
              l.includes(e) &&
              (0, a.setStorage)(
                "vue-devtools-"
                  .concat("6.0.0-alpha.1", ":shared-data:")
                  .concat(e),
                t
              );
            var n = o[e];
            o[e] = t;
            var r = h[e];
            return (
              r &&
                r.forEach(function (e) {
                  return e(t, n);
                }),
              !0
            );
          }
          function v(e, t) {
            i && i.send("shared-data:set", { key: e, value: t });
          }
          t.watchSharedData = function (e, t) {
            var n = h[e] || (h[e] = []);
            return (
              n.push(t),
              function () {
                var e = n.indexOf(t);
                -1 !== e && n.splice(e, 1);
              }
            );
          };
          var g = {};
          Object.keys(c).forEach(function (e) {
            Object.defineProperty(g, e, {
              configurable: !1,
              get: function () {
                return o[e];
              },
              set: function (t) {
                v(e, t), _(e, t);
              },
            });
          }),
            (t.SharedData = g);
        },
      "../shared-utils/lib/shell.js":
        /*!************************************!*\
      !*** ../shared-utils/lib/shell.js ***!
      \************************************/
        function (e, t) {
          Object.defineProperty(t, "__esModule", { value: !0 });
        },
      "../shared-utils/lib/storage.js":
        /*!**************************************!*\
      !*** ../shared-utils/lib/storage.js ***!
      \**************************************/
        function (e, n, r) {
          Object.defineProperty(n, "__esModule", { value: !0 }),
            (n.clearStorage =
              n.removeStorage =
              n.setStorage =
              n.getStorage =
              n.initStorage =
                void 0);
          var i = r(/*! ./env */ "../shared-utils/lib/env.js"),
            o =
              void 0 !== i.target.chrome && void 0 !== i.target.chrome.storage,
            s = null;
          function a() {
            if (!s) throw new Error("Storage wasn't initialized with 'init()'");
          }
          function u(e, t) {
            return null == e ? t : e;
          }
          (n.initStorage = function () {
            return new Promise(function (e) {
              o
                ? i.target.chrome.storage.local.get(null, function (t) {
                    (s = t), e();
                  })
                : ((s = {}), e());
            });
          }),
            (n.getStorage = function (e) {
              var t =
                arguments.length > 1 && void 0 !== arguments[1]
                  ? arguments[1]
                  : null;
              if ((a(), o)) return u(s[e], t);
              try {
                return u(JSON.parse(localStorage.getItem(e)), t);
              } catch (e) {}
            }),
            (n.setStorage = function (e, n) {
              if ((a(), o))
                (s[e] = n), i.target.chrome.storage.local.set(t({}, e, n));
              else
                try {
                  localStorage.setItem(e, JSON.stringify(n));
                } catch (e) {}
            }),
            (n.removeStorage = function (e) {
              if ((a(), o))
                delete s[e], i.target.chrome.storage.local.remove([e]);
              else
                try {
                  localStorage.removeItem(e);
                } catch (e) {}
            }),
            (n.clearStorage = function () {
              if ((a(), o)) (s = {}), i.target.chrome.storage.local.clear();
              else
                try {
                  localStorage.clear();
                } catch (e) {}
            });
        },
      "../shared-utils/lib/transfer.js":
        /*!***************************************!*\
      !*** ../shared-utils/lib/transfer.js ***!
      \***************************************/
        function (e, t) {
          Object.defineProperty(t, "__esModule", { value: !0 }),
            (t.stringifyStrictCircularAutoChunks =
              t.parseCircularAutoChunks =
              t.stringifyCircularAutoChunks =
                void 0);
          function n(e, t, r, i) {
            var o,
              s,
              a,
              u,
              c,
              l = i.get(e);
            if (null != l) return l;
            var f = r.length,
              d = Object.prototype.toString.call(e);
            if ("[object Object]" === d) {
              (o = {}), i.set(e, f), r.push(o);
              var p = Object.keys(e);
              for (u = 0, c = p.length; u < c; u++) {
                s = p[u];
                try {
                  (a = e[s]), t && (a = t.call(e, s, a));
                } catch (e) {
                  a = e;
                }
                o[s] = n(a, t, r, i);
              }
            } else if ("[object Array]" === d)
              for (
                o = [], i.set(e, f), r.push(o), u = 0, c = e.length;
                u < c;
                u++
              ) {
                try {
                  (a = e[u]), t && (a = t.call(e, u, a));
                } catch (e) {
                  a = e;
                }
                o[u] = n(a, t, r, i);
              }
            else r.push(e);
            return f;
          }
          function r(e, t) {
            for (var n, r, i, o, s, a, u = e.length; u--; )
              if (
                ((i = e[u]),
                "[object Object]" === (a = Object.prototype.toString.call(i)))
              ) {
                var c = Object.keys(i);
                for (n = 0, r = c.length; n < r; n++)
                  (s = e[i[(o = c[n])]]),
                    t && (s = t.call(i, o, s)),
                    (i[o] = s);
              } else if ("[object Array]" === a)
                for (n = 0, r = i.length; n < r; n++)
                  (s = e[i[n]]), t && (s = t.call(i, n, s)), (i[n] = s);
          }
          function i(e) {
            var t =
                arguments.length > 1 && void 0 !== arguments[1]
                  ? arguments[1]
                  : null,
              r =
                arguments.length > 2 && void 0 !== arguments[2]
                  ? arguments[2]
                  : null,
              i = [];
            return (
              n(e, t, i, new Map()),
              r ? " " + JSON.stringify(i, null, r) : " " + JSON.stringify(i)
            );
          }
          (t.stringifyCircularAutoChunks = function (e) {
            var t,
              n =
                arguments.length > 1 && void 0 !== arguments[1]
                  ? arguments[1]
                  : null,
              r =
                arguments.length > 2 && void 0 !== arguments[2]
                  ? arguments[2]
                  : null;
            try {
              t =
                1 === arguments.length
                  ? JSON.stringify(e)
                  : JSON.stringify(e, n, r);
            } catch (o) {
              t = i(e, n, r);
            }
            if (t.length > 524288) {
              for (
                var o = Math.ceil(t.length / 524288), s = [], a = 0;
                a < o;
                a++
              )
                s.push(t.slice(524288 * a, 524288 * (a + 1)));
              return s;
            }
            return t;
          }),
            (t.parseCircularAutoChunks = function (e) {
              var t =
                arguments.length > 1 && void 0 !== arguments[1]
                  ? arguments[1]
                  : null;
              Array.isArray(e) && (e = e.join(""));
              var n = /^\s/.test(e);
              if (n) {
                var i = JSON.parse(e);
                return r(i, t), i[0];
              }
              return 1 === arguments.length ? JSON.parse(e) : JSON.parse(e, t);
            }),
            (t.stringifyStrictCircularAutoChunks = i);
        },
      "../shared-utils/lib/util.js":
        /*!***********************************!*\
      !*** ../shared-utils/lib/util.js ***!
      \***********************************/
        function (t, r, i) {
          var a =
            (this && this.__importDefault) ||
            function (e) {
              return e && e.__esModule ? e : { default: e };
            };
          Object.defineProperty(r, "__esModule", { value: !0 }),
            (r.isEmptyObject =
              r.copyToClipboard =
              r.escape =
              r.openInEditor =
              r.focusInput =
              r.simpleGet =
              r.sortByKey =
              r.searchDeepInObject =
              r.isPlainObject =
              r.revive =
              r.parse =
              r.getCustomRefDetails =
              r.getCustomHTMLElementDetails =
              r.getCustomFunctionDetails =
              r.getCustomComponentDefinitionDetails =
              r.getComponentName =
              r.reviveSet =
              r.getCustomSetDetails =
              r.reviveMap =
              r.getCustomMapDetails =
              r.stringify =
              r.specialTokenToString =
              r.MAX_ARRAY_SIZE =
              r.MAX_STRING_SIZE =
              r.SPECIAL_TOKENS =
              r.NAN =
              r.NEGATIVE_INFINITY =
              r.INFINITY =
              r.UNDEFINED =
              r.inDoc =
              r.getComponentDisplayName =
              r.kebabize =
              r.camelize =
              r.classify =
                void 0);
          var u = a(
              i(/*! path */ "../../node_modules/path-browserify/index.js")
            ),
            c = i(/*! ./transfer */ "../shared-utils/lib/transfer.js"),
            l = i(/*! ./backend */ "../shared-utils/lib/backend.js"),
            d = i(/*! ./shared-data */ "../shared-utils/lib/shared-data.js"),
            p = i(/*! ./env */ "../shared-utils/lib/env.js");
          function h(e) {
            var t = Object.create(null);
            return function (n) {
              return t[n] || (t[n] = e(n));
            };
          }
          var _ = /(?:^|[-_/])(\w)/g;
          r.classify = h(function (e) {
            return e && ("" + e).replace(_, m);
          });
          var v = /-(\w)/g;
          r.camelize = h(function (e) {
            return e && e.replace(v, m);
          });
          var g = /([a-z0-9])([A-Z])/g;
          function m(e, t) {
            return t ? t.toUpperCase() : "";
          }
          function O(e) {
            return null === e
              ? "null"
              : e === r.UNDEFINED
              ? "undefined"
              : e === r.NAN
              ? "NaN"
              : e === r.INFINITY
              ? "Infinity"
              : e === r.NEGATIVE_INFINITY && "-Infinity";
          }
          (r.kebabize = h(function (e) {
            return (
              e &&
              e
                .replace(g, function (e, t, n) {
                  return "".concat(t, "-").concat(n);
                })
                .toLowerCase()
            );
          })),
            (r.getComponentDisplayName = function (e) {
              var t =
                arguments.length > 1 && void 0 !== arguments[1]
                  ? arguments[1]
                  : "class";
              switch (t) {
                case "class":
                  return (0, r.classify)(e);
                case "kebab":
                  return (0, r.kebabize)(e);
                case "original":
                default:
                  return e;
              }
            }),
            (r.inDoc = function (e) {
              if (!e) return !1;
              var t = e.ownerDocument.documentElement,
                n = e.parentNode;
              return (
                t === e ||
                t === n ||
                !(!n || 1 !== n.nodeType || !t.contains(n))
              );
            }),
            (r.UNDEFINED = "__vue_devtool_undefined__"),
            (r.INFINITY = "__vue_devtool_infinity__"),
            (r.NEGATIVE_INFINITY = "__vue_devtool_negative_infinity__"),
            (r.NAN = "__vue_devtool_nan__"),
            (r.SPECIAL_TOKENS = {
              true: !0,
              false: !1,
              undefined: r.UNDEFINED,
              null: null,
              "-Infinity": r.NEGATIVE_INFINITY,
              Infinity: r.INFINITY,
              NaN: r.NAN,
            }),
            (r.MAX_STRING_SIZE = 1e4),
            (r.MAX_ARRAY_SIZE = 5e3),
            (r.specialTokenToString = O);
          var y = new ((function () {
              return s(
                function e() {
                  o(this, e), (this.map = new Map());
                },
                [
                  {
                    key: "cache",
                    value: function (e, t) {
                      var n = this.map.get(e);
                      if (n) return n;
                      var r = t(e);
                      return this.map.set(e, r), r;
                    },
                  },
                  {
                    key: "clear",
                    value: function () {
                      this.map.clear();
                    },
                  },
                ]
              );
            })())(),
            E = new ((function () {
              return s(
                function e(t) {
                  o(this, e),
                    (this.maxSize = t),
                    (this.map = new Map()),
                    (this.index = 0),
                    (this.size = 0);
                },
                [
                  {
                    key: "cache",
                    value: function (e) {
                      var t = this.index;
                      return (
                        this.map.set(t, e),
                        this.size++,
                        this.size > this.maxSize &&
                          (this.map.delete(t - this.size), this.size--),
                        this.index++,
                        t
                      );
                    },
                  },
                  {
                    key: "read",
                    value: function (e) {
                      return this.map.get(e);
                    },
                  },
                ]
              );
            })())(1e3),
            T = {
              internal: function (e) {
                var t,
                  n = this[e],
                  i = f(n);
                if (Array.isArray(n)) {
                  var o = n.length;
                  return o > r.MAX_ARRAY_SIZE
                    ? {
                        _isArray: !0,
                        length: o,
                        items: n.slice(0, r.MAX_ARRAY_SIZE),
                      }
                    : n;
                }
                if ("string" == typeof n)
                  return n.length > r.MAX_STRING_SIZE
                    ? n.substring(0, r.MAX_STRING_SIZE) +
                        "... (".concat(n.length, " total length)")
                    : n;
                if ("undefined" === i) return r.UNDEFINED;
                if (n === 1 / 0) return r.INFINITY;
                if (n === -1 / 0) return r.NEGATIVE_INFINITY;
                if ("function" === i) return P(n);
                if ("symbol" === i)
                  return "[native Symbol ".concat(
                    Symbol.prototype.toString.call(n),
                    "]"
                  );
                if (null !== n && "object" === i) {
                  var s = Object.prototype.toString.call(n);
                  if ("[object Map]" === s)
                    return y.cache(n, function () {
                      return N(n);
                    });
                  if ("[object Set]" === s)
                    return y.cache(n, function () {
                      return C(n);
                    });
                  if ("[object RegExp]" === s)
                    return "[native RegExp ".concat(
                      RegExp.prototype.toString.call(n),
                      "]"
                    );
                  if ("[object Date]" === s)
                    return "[native Date ".concat(
                      Date.prototype.toString.call(n),
                      "]"
                    );
                  if ("[object Error]" === s)
                    return "[native Error "
                      .concat(n.message, "<>")
                      .concat(n.stack, "]");
                  if (n.state && n._vm)
                    return y.cache(n, function () {
                      return (0, l.getCustomStoreDetails)(n);
                    });
                  if (n.constructor && "VueRouter" === n.constructor.name)
                    return y.cache(n, function () {
                      return (0, l.getCustomRouterDetails)(n);
                    });
                  if ((0, l.isVueInstance)(n))
                    return y.cache(n, function () {
                      return (0, l.getCustomInstanceDetails)(n);
                    });
                  if ("function" == typeof n.render)
                    return y.cache(n, function () {
                      return M(n);
                    });
                  if (n.constructor && "VNode" === n.constructor.name)
                    return "[native VNode <".concat(n.tag, ">]");
                  if (
                    "undefined" != typeof HTMLElement &&
                    n instanceof HTMLElement
                  )
                    return y.cache(n, function () {
                      return D(n);
                    });
                  if (
                    "Store" ===
                      (null === (t = n.constructor) || void 0 === t
                        ? void 0
                        : t.name) &&
                    n._wrappedGetters
                  )
                    return "[object Store]";
                  if (n.currentRoute) return "[object Router]";
                  var a = (0, l.getCustomObjectDetails)(n, s);
                  if (null != a) return a;
                } else if (Number.isNaN(n)) return r.NAN;
                return x(n);
              },
              user: function (e) {
                var t = this[e],
                  n = f(t);
                (null == t ? void 0 : t._custom) &&
                  "value" in t._custom &&
                  (t = t._custom.value);
                if ("object" !== n) {
                  if (t === r.UNDEFINED) return;
                  return t === r.INFINITY
                    ? 1 / 0
                    : t === r.NEGATIVE_INFINITY
                    ? -1 / 0
                    : t === r.NAN
                    ? NaN
                    : t;
                }
                return x(t);
              },
            };
          function b(e) {
            var t =
              arguments.length > 1 && void 0 !== arguments[1]
                ? arguments[1]
                : "internal";
            return y.clear(), (0, c.stringifyCircularAutoChunks)(e, T[t]);
          }
          function N(e) {
            var t = [];
            return (
              e.forEach(function (e, n) {
                return t.push({ key: n, value: e });
              }),
              {
                _custom: {
                  type: "map",
                  display: "Map",
                  value: t,
                  readOnly: !0,
                  fields: { abstract: !0 },
                },
              }
            );
          }
          function S(e) {
            for (
              var t = new Map(), n = e._custom.value, r = 0;
              r < n.length;
              r++
            ) {
              var i = n[r],
                o = i.key,
                s = i.value;
              t.set(o, k(s));
            }
            return t;
          }
          function C(e) {
            var t = Array.from(e);
            return {
              _custom: {
                type: "set",
                display: "Set[".concat(t.length, "]"),
                value: t,
                readOnly: !0,
              },
            };
          }
          function A(e) {
            for (
              var t = new Set(), n = e._custom.value, r = 0;
              r < n.length;
              r++
            ) {
              var i = n[r];
              t.add(k(i));
            }
            return t;
          }
          function I(e) {
            var t = e.displayName || e.name || e._componentTag;
            if (t) return t;
            var n,
              i,
              o = e.__file;
            return o
              ? (0, r.classify)(
                  ((n = o),
                  (i = ".vue"),
                  u.default.basename(
                    n.replace(/^[a-zA-Z]:/, "").replace(/\\/g, "/"),
                    i
                  ))
                )
              : void 0;
          }
          function M(e) {
            var t = I(e);
            return (
              t
                ? e.name &&
                  e.__file &&
                  (t += " <span>(".concat(e.__file, ")</span>"))
                : (t = "<i>Unknown Component</i>"),
              {
                _custom: n(
                  {
                    type: "component-definition",
                    display: t,
                    tooltip: "Component definition",
                  },
                  e.__file ? { file: e.__file } : {}
                ),
              }
            );
          }
          function P(e) {
            var t = "",
              n = null;
            try {
              (t = Function.prototype.toString.call(e)),
                (n = String.prototype.match.call(t, /\([\s\S]*?\)/));
            } catch (e) {}
            var r = n && n[0],
              i = "string" == typeof r ? r : "(?)",
              o = "string" == typeof e.name ? e.name : "";
            return {
              _custom: {
                type: "function",
                display: '<span style="opacity:.5;">function</span> '
                  .concat(G(o))
                  .concat(i),
                tooltip: t.trim() ? "<pre>".concat(t, "</pre>") : null,
                _reviveId: E.cache(e),
              },
            };
          }
          function D(e) {
            try {
              return {
                _custom: {
                  type: "HTMLElement",
                  display:
                    '<span class="opacity-30">&lt;</span><span class="text-blue-500">'.concat(
                      e.tagName.toLowerCase(),
                      '</span><span class="opacity-30">&gt;</span>'
                    ),
                  value: w(e.attributes),
                  actions: [
                    {
                      icon: "input",
                      tooltip: "Log element to console",
                      action: function () {
                        console.log(e);
                      },
                    },
                  ],
                },
              };
            } catch (t) {
              return {
                _custom: {
                  type: "HTMLElement",
                  display: '<span class="text-blue-500">'.concat(
                    String(e),
                    "</span>"
                  ),
                },
              };
            }
          }
          function w(e) {
            for (var t = {}, n = e.length, r = 0; r < n; r++) {
              var i = e.item(r);
              t[i.name] = i.value;
            }
            return t;
          }
          (r.stringify = b),
            (r.getCustomMapDetails = N),
            (r.reviveMap = S),
            (r.getCustomSetDetails = C),
            (r.reviveSet = A),
            (r.getComponentName = I),
            (r.getCustomComponentDefinitionDetails = M),
            (r.getCustomFunctionDetails = P),
            (r.getCustomHTMLElementDetails = D),
            (r.getCustomRefDetails = function e(t, n, r) {
              var i, o;
              return (
                Array.isArray(r)
                  ? (i = r
                      .map(function (r) {
                        return e(t, n, r);
                      })
                      .map(function (e) {
                        return e.value;
                      }))
                  : ((o = r._isVue ? I(r.$options) : r.tagName.toLowerCase()),
                    (i = {
                      _custom: {
                        display:
                          "&lt;".concat(o) +
                          (r.id
                            ? ' <span class="attr-title">id</span>="'.concat(
                                r.id,
                                '"'
                              )
                            : "") +
                          (r.className
                            ? ' <span class="attr-title">class</span>="'.concat(
                                r.className,
                                '"'
                              )
                            : "") +
                          "&gt;",
                        uid: t.__VUE_DEVTOOLS_UID__,
                        type: "reference",
                      },
                    })),
                { type: "$refs", key: n, value: i, editable: !1 }
              );
            }),
            (r.parse = function (e) {
              var t =
                arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
              return t
                ? (0, c.parseCircularAutoChunks)(e, R)
                : (0, c.parseCircularAutoChunks)(e);
            });
          var L = /^\[native (\w+) (.*?)(<>((.|\s)*))?\]$/,
            j = /^\[native Symbol Symbol\((.*)\)\]$/;
          function R(e, t) {
            return k(t);
          }
          function k(t) {
            if (t !== r.UNDEFINED) {
              if (t === r.INFINITY) return 1 / 0;
              if (t === r.NEGATIVE_INFINITY) return -1 / 0;
              if (t === r.NAN) return NaN;
              if (t && t._custom) {
                var n = t._custom;
                return "component" === n.type
                  ? (0, l.getInstanceMap)().get(n.id)
                  : "map" === n.type
                  ? S(t)
                  : "set" === n.type
                  ? A(t)
                  : n._reviveId
                  ? E.read(n._reviveId)
                  : k(n.value);
              }
              if (j.test(t)) {
                var i = j.exec(t),
                  o = e(i, 2)[1];
                return Symbol.for(o);
              }
              if (L.test(t)) {
                var s = L.exec(t),
                  a = e(s, 5),
                  u = a[1],
                  c = a[2],
                  f = a[4],
                  d = new p.target[u](c);
                return "Error" === u && f && (d.stack = f), d;
              }
              return t;
            }
          }
          function x(e) {
            return (function (e) {
              if (null == e) return !0;
              var t = f(e);
              return "string" === t || "number" === t || "boolean" === t;
            })(e) ||
              Array.isArray(e) ||
              B(e)
              ? e
              : Object.prototype.toString.call(e);
          }
          function B(e) {
            return "[object Object]" === Object.prototype.toString.call(e);
          }
          (r.revive = k),
            (r.isPlainObject = B),
            (r.searchDeepInObject = function (e, t) {
              var n = new Map(),
                r = V(e, t.toLowerCase(), n, 0);
              return n.clear(), r;
            });
          function V(e, t, n, r) {
            if (r > 10) return !1;
            for (
              var i, o = !1, s = Object.keys(e), a = 0;
              a < s.length && !(o = F(t, (i = s[a]), e[i], n, r + 1));
              a++
            );
            return o;
          }
          function F(e, t, n, r, i) {
            var o,
              s = !1;
            return (
              "_custom" === t && ((t = n.display), (n = n.value)),
              (o = O(n)) && (n = o),
              t && U(t, e)
                ? ((s = !0), r.set(n, !0))
                : r.has(n)
                ? (s = r.get(n))
                : Array.isArray(n)
                ? (r.set(n, null),
                  (s = (function (e, t, n, r) {
                    if (r > 10) return !1;
                    for (
                      var i = !1, o = 0;
                      o < e.length && !(i = F(t, null, e[o], n, r + 1));
                      o++
                    );
                    return i;
                  })(n, e, r, i)),
                  r.set(n, s))
                : B(n)
                ? (r.set(n, null), (s = V(n, e, r, i)), r.set(n, s))
                : U(n, e) && ((s = !0), r.set(n, !0)),
              s
            );
          }
          function U(e, t) {
            return -1 !== ("" + e).toLowerCase().indexOf(t);
          }
          (r.sortByKey = function (e) {
            return (
              e &&
              e.slice().sort(function (e, t) {
                return e.key < t.key ? -1 : e.key > t.key ? 1 : 0;
              })
            );
          }),
            (r.simpleGet = function (e, t) {
              for (
                var n = Array.isArray(t) ? t : t.split("."), r = 0;
                r < n.length;
                r++
              )
                if (!(e = e[n[r]])) return;
              return e;
            }),
            (r.focusInput = function (e) {
              e.focus(), e.setSelectionRange(0, e.value.length);
            }),
            (r.openInEditor = function (e) {
              var t = e.replace(/\\/g, "\\\\"),
                n = "fetch('"
                  .concat(
                    d.SharedData.openInEditorHost,
                    "__open-in-editor?file="
                  )
                  .concat(
                    encodeURI(e),
                    "').then(response => {\n    if (response.ok) {\n      console.log('File "
                  )
                  .concat(
                    t,
                    " opened in editor')\n    } else {\n      const msg = 'Opening component "
                  )
                  .concat(
                    t,
                    " failed'\n      const target = typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : {}\n      if (target.__VUE_DEVTOOLS_TOAST__) {\n        target.__VUE_DEVTOOLS_TOAST__(msg, 'error')\n      } else {\n        console.log('%c' + msg, 'color:red')\n      }\n      console.log('Check the setup of your project, see https://devtools.vuejs.org/guide/open-in-editor.html')\n    }\n  })"
                  );
              p.isChrome
                ? p.target.chrome.devtools.inspectedWindow.eval(n)
                : [eval][0](n);
            });
          var K = { "<": "&lt;", ">": "&gt;", '"': "&quot;", "&": "&amp;" };
          function G(e) {
            return e.replace(/[<>"&]/g, H);
          }
          function H(e) {
            return K[e] || e;
          }
          (r.escape = G),
            (r.copyToClipboard = function (e) {
              var t;
              if (
                ((t = "object" !== f(e) ? String(e) : b(e, "user")),
                "undefined" != typeof document)
              ) {
                var n = document.createElement("textarea");
                (n.textContent = t),
                  document.body.appendChild(n),
                  n.select(),
                  document.execCommand("copy"),
                  document.body.removeChild(n);
              }
            }),
            (r.isEmptyObject = function (e) {
              return e === r.UNDEFINED || !e || 0 === Object.keys(e).length;
            });
        },
      "../../node_modules/events/events.js":
        /*!*******************************************!*\
      !*** ../../node_modules/events/events.js ***!
      \*******************************************/
        function (e) {
          var t,
            n =
              "object" ===
              ("undefined" == typeof Reflect ? "undefined" : f(Reflect))
                ? Reflect
                : null,
            r =
              n && "function" == typeof n.apply
                ? n.apply
                : function (e, t, n) {
                    return Function.prototype.apply.call(e, t, n);
                  };
          t =
            n && "function" == typeof n.ownKeys
              ? n.ownKeys
              : Object.getOwnPropertySymbols
              ? function (e) {
                  return Object.getOwnPropertyNames(e).concat(
                    Object.getOwnPropertySymbols(e)
                  );
                }
              : function (e) {
                  return Object.getOwnPropertyNames(e);
                };
          var i =
            Number.isNaN ||
            function (e) {
              return e != e;
            };
          function o() {
            o.init.call(this);
          }
          (e.exports = o),
            (e.exports.once = function (e, t) {
              return new Promise(function (n, r) {
                function i(n) {
                  e.removeListener(t, o), r(n);
                }
                function o() {
                  "function" == typeof e.removeListener &&
                    e.removeListener("error", i),
                    n([].slice.call(arguments));
                }
                v(e, t, o, { once: !0 }),
                  "error" !== t &&
                    (function (e, t, n) {
                      "function" == typeof e.on && v(e, "error", t, n);
                    })(e, i, { once: !0 });
              });
            }),
            (o.EventEmitter = o),
            (o.prototype._events = void 0),
            (o.prototype._eventsCount = 0),
            (o.prototype._maxListeners = void 0);
          var s = 10;
          function a(e) {
            if ("function" != typeof e)
              throw new TypeError(
                'The "listener" argument must be of type Function. Received type ' +
                  f(e)
              );
          }
          function u(e) {
            return void 0 === e._maxListeners
              ? o.defaultMaxListeners
              : e._maxListeners;
          }
          function c(e, t, n, r) {
            var i, o, s, c;
            if (
              (a(n),
              void 0 === (o = e._events)
                ? ((o = e._events = Object.create(null)), (e._eventsCount = 0))
                : (void 0 !== o.newListener &&
                    (e.emit("newListener", t, n.listener ? n.listener : n),
                    (o = e._events)),
                  (s = o[t])),
              void 0 === s)
            )
              (s = o[t] = n), ++e._eventsCount;
            else if (
              ("function" == typeof s
                ? (s = o[t] = r ? [n, s] : [s, n])
                : r
                ? s.unshift(n)
                : s.push(n),
              (i = u(e)) > 0 && s.length > i && !s.warned)
            ) {
              s.warned = !0;
              var l = new Error(
                "Possible EventEmitter memory leak detected. " +
                  s.length +
                  " " +
                  String(t) +
                  " listeners added. Use emitter.setMaxListeners() to increase limit"
              );
              (l.name = "MaxListenersExceededWarning"),
                (l.emitter = e),
                (l.type = t),
                (l.count = s.length),
                (c = l),
                console && console.warn && console.warn(c);
            }
            return e;
          }
          function l() {
            if (!this.fired)
              return (
                this.target.removeListener(this.type, this.wrapFn),
                (this.fired = !0),
                0 === arguments.length
                  ? this.listener.call(this.target)
                  : this.listener.apply(this.target, arguments)
              );
          }
          function d(e, t, n) {
            var r = {
                fired: !1,
                wrapFn: void 0,
                target: e,
                type: t,
                listener: n,
              },
              i = l.bind(r);
            return (i.listener = n), (r.wrapFn = i), i;
          }
          function p(e, t, n) {
            var r = e._events;
            if (void 0 === r) return [];
            var i = r[t];
            return void 0 === i
              ? []
              : "function" == typeof i
              ? n
                ? [i.listener || i]
                : [i]
              : n
              ? (function (e) {
                  for (var t = new Array(e.length), n = 0; n < t.length; ++n)
                    t[n] = e[n].listener || e[n];
                  return t;
                })(i)
              : _(i, i.length);
          }
          function h(e) {
            var t = this._events;
            if (void 0 !== t) {
              var n = t[e];
              if ("function" == typeof n) return 1;
              if (void 0 !== n) return n.length;
            }
            return 0;
          }
          function _(e, t) {
            for (var n = new Array(t), r = 0; r < t; ++r) n[r] = e[r];
            return n;
          }
          function v(e, t, n, r) {
            if ("function" == typeof e.on) r.once ? e.once(t, n) : e.on(t, n);
            else {
              if ("function" != typeof e.addEventListener)
                throw new TypeError(
                  'The "emitter" argument must be of type EventEmitter. Received type ' +
                    f(e)
                );
              e.addEventListener(t, function i(o) {
                r.once && e.removeEventListener(t, i), n(o);
              });
            }
          }
          Object.defineProperty(o, "defaultMaxListeners", {
            enumerable: !0,
            get: function () {
              return s;
            },
            set: function (e) {
              if ("number" != typeof e || e < 0 || i(e))
                throw new RangeError(
                  'The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received ' +
                    e +
                    "."
                );
              s = e;
            },
          }),
            (o.init = function () {
              (void 0 !== this._events &&
                this._events !== Object.getPrototypeOf(this)._events) ||
                ((this._events = Object.create(null)), (this._eventsCount = 0)),
                (this._maxListeners = this._maxListeners || void 0);
            }),
            (o.prototype.setMaxListeners = function (e) {
              if ("number" != typeof e || e < 0 || i(e))
                throw new RangeError(
                  'The value of "n" is out of range. It must be a non-negative number. Received ' +
                    e +
                    "."
                );
              return (this._maxListeners = e), this;
            }),
            (o.prototype.getMaxListeners = function () {
              return u(this);
            }),
            (o.prototype.emit = function (e) {
              for (var t = [], n = 1; n < arguments.length; n++)
                t.push(arguments[n]);
              var i = "error" === e,
                o = this._events;
              if (void 0 !== o) i = i && void 0 === o.error;
              else if (!i) return !1;
              if (i) {
                var s;
                if ((t.length > 0 && (s = t[0]), s instanceof Error)) throw s;
                var a = new Error(
                  "Unhandled error." + (s ? " (" + s.message + ")" : "")
                );
                throw ((a.context = s), a);
              }
              var u = o[e];
              if (void 0 === u) return !1;
              if ("function" == typeof u) r(u, this, t);
              else {
                var c = u.length,
                  l = _(u, c);
                for (n = 0; n < c; ++n) r(l[n], this, t);
              }
              return !0;
            }),
            (o.prototype.addListener = function (e, t) {
              return c(this, e, t, !1);
            }),
            (o.prototype.on = o.prototype.addListener),
            (o.prototype.prependListener = function (e, t) {
              return c(this, e, t, !0);
            }),
            (o.prototype.once = function (e, t) {
              return a(t), this.on(e, d(this, e, t)), this;
            }),
            (o.prototype.prependOnceListener = function (e, t) {
              return a(t), this.prependListener(e, d(this, e, t)), this;
            }),
            (o.prototype.removeListener = function (e, t) {
              var n, r, i, o, s;
              if ((a(t), void 0 === (r = this._events))) return this;
              if (void 0 === (n = r[e])) return this;
              if (n === t || n.listener === t)
                0 == --this._eventsCount
                  ? (this._events = Object.create(null))
                  : (delete r[e],
                    r.removeListener &&
                      this.emit("removeListener", e, n.listener || t));
              else if ("function" != typeof n) {
                for (i = -1, o = n.length - 1; o >= 0; o--)
                  if (n[o] === t || n[o].listener === t) {
                    (s = n[o].listener), (i = o);
                    break;
                  }
                if (i < 0) return this;
                0 === i
                  ? n.shift()
                  : (function (e, t) {
                      for (; t + 1 < e.length; t++) e[t] = e[t + 1];
                      e.pop();
                    })(n, i),
                  1 === n.length && (r[e] = n[0]),
                  void 0 !== r.removeListener &&
                    this.emit("removeListener", e, s || t);
              }
              return this;
            }),
            (o.prototype.off = o.prototype.removeListener),
            (o.prototype.removeAllListeners = function (e) {
              var t, n, r;
              if (void 0 === (n = this._events)) return this;
              if (void 0 === n.removeListener)
                return (
                  0 === arguments.length
                    ? ((this._events = Object.create(null)),
                      (this._eventsCount = 0))
                    : void 0 !== n[e] &&
                      (0 == --this._eventsCount
                        ? (this._events = Object.create(null))
                        : delete n[e]),
                  this
                );
              if (0 === arguments.length) {
                var i,
                  o = Object.keys(n);
                for (r = 0; r < o.length; ++r)
                  "removeListener" !== (i = o[r]) && this.removeAllListeners(i);
                return (
                  this.removeAllListeners("removeListener"),
                  (this._events = Object.create(null)),
                  (this._eventsCount = 0),
                  this
                );
              }
              if ("function" == typeof (t = n[e])) this.removeListener(e, t);
              else if (void 0 !== t)
                for (r = t.length - 1; r >= 0; r--)
                  this.removeListener(e, t[r]);
              return this;
            }),
            (o.prototype.listeners = function (e) {
              return p(this, e, !0);
            }),
            (o.prototype.rawListeners = function (e) {
              return p(this, e, !1);
            }),
            (o.listenerCount = function (e, t) {
              return "function" == typeof e.listenerCount
                ? e.listenerCount(t)
                : h.call(e, t);
            }),
            (o.prototype.listenerCount = h),
            (o.prototype.eventNames = function () {
              return this._eventsCount > 0 ? t(this._events) : [];
            });
        },
      "../../node_modules/path-browserify/index.js":
        /*!***************************************************!*\
      !*** ../../node_modules/path-browserify/index.js ***!
      \***************************************************/
        function (e) {
          function t(e) {
            if ("string" != typeof e)
              throw new TypeError(
                "Path must be a string. Received " + JSON.stringify(e)
              );
          }
          function n(e, t) {
            for (
              var n, r = "", i = 0, o = -1, s = 0, a = 0;
              a <= e.length;
              ++a
            ) {
              if (a < e.length) n = e.charCodeAt(a);
              else {
                if (47 === n) break;
                n = 47;
              }
              if (47 === n) {
                if (o === a - 1 || 1 === s);
                else if (o !== a - 1 && 2 === s) {
                  if (
                    r.length < 2 ||
                    2 !== i ||
                    46 !== r.charCodeAt(r.length - 1) ||
                    46 !== r.charCodeAt(r.length - 2)
                  )
                    if (r.length > 2) {
                      var u = r.lastIndexOf("/");
                      if (u !== r.length - 1) {
                        -1 === u
                          ? ((r = ""), (i = 0))
                          : (i =
                              (r = r.slice(0, u)).length -
                              1 -
                              r.lastIndexOf("/")),
                          (o = a),
                          (s = 0);
                        continue;
                      }
                    } else if (2 === r.length || 1 === r.length) {
                      (r = ""), (i = 0), (o = a), (s = 0);
                      continue;
                    }
                  t && (r.length > 0 ? (r += "/..") : (r = ".."), (i = 2));
                } else
                  r.length > 0
                    ? (r += "/" + e.slice(o + 1, a))
                    : (r = e.slice(o + 1, a)),
                    (i = a - o - 1);
                (o = a), (s = 0);
              } else 46 === n && -1 !== s ? ++s : (s = -1);
            }
            return r;
          }
          var r = {
            resolve: function () {
              for (
                var e, r = "", i = !1, o = arguments.length - 1;
                o >= -1 && !i;
                o--
              ) {
                var s;
                o >= 0
                  ? (s = arguments[o])
                  : (void 0 === e && (e = process.cwd()), (s = e)),
                  t(s),
                  0 !== s.length &&
                    ((r = s + "/" + r), (i = 47 === s.charCodeAt(0)));
              }
              return (
                (r = n(r, !i)),
                i ? (r.length > 0 ? "/" + r : "/") : r.length > 0 ? r : "."
              );
            },
            normalize: function (e) {
              if ((t(e), 0 === e.length)) return ".";
              var r = 47 === e.charCodeAt(0),
                i = 47 === e.charCodeAt(e.length - 1);
              return (
                0 !== (e = n(e, !r)).length || r || (e = "."),
                e.length > 0 && i && (e += "/"),
                r ? "/" + e : e
              );
            },
            isAbsolute: function (e) {
              return t(e), e.length > 0 && 47 === e.charCodeAt(0);
            },
            join: function () {
              if (0 === arguments.length) return ".";
              for (var e, n = 0; n < arguments.length; ++n) {
                var i = arguments[n];
                t(i), i.length > 0 && (void 0 === e ? (e = i) : (e += "/" + i));
              }
              return void 0 === e ? "." : r.normalize(e);
            },
            relative: function (e, n) {
              if ((t(e), t(n), e === n)) return "";
              if ((e = r.resolve(e)) === (n = r.resolve(n))) return "";
              for (var i = 1; i < e.length && 47 === e.charCodeAt(i); ++i);
              for (
                var o = e.length, s = o - i, a = 1;
                a < n.length && 47 === n.charCodeAt(a);
                ++a
              );
              for (
                var u = n.length - a, c = s < u ? s : u, l = -1, f = 0;
                f <= c;
                ++f
              ) {
                if (f === c) {
                  if (u > c) {
                    if (47 === n.charCodeAt(a + f)) return n.slice(a + f + 1);
                    if (0 === f) return n.slice(a + f);
                  } else
                    s > c &&
                      (47 === e.charCodeAt(i + f)
                        ? (l = f)
                        : 0 === f && (l = 0));
                  break;
                }
                var d = e.charCodeAt(i + f);
                if (d !== n.charCodeAt(a + f)) break;
                47 === d && (l = f);
              }
              var p = "";
              for (f = i + l + 1; f <= o; ++f)
                (f !== o && 47 !== e.charCodeAt(f)) ||
                  (0 === p.length ? (p += "..") : (p += "/.."));
              return p.length > 0
                ? p + n.slice(a + l)
                : ((a += l), 47 === n.charCodeAt(a) && ++a, n.slice(a));
            },
            _makeLong: function (e) {
              return e;
            },
            dirname: function (e) {
              if ((t(e), 0 === e.length)) return ".";
              for (
                var n = e.charCodeAt(0),
                  r = 47 === n,
                  i = -1,
                  o = !0,
                  s = e.length - 1;
                s >= 1;
                --s
              )
                if (47 === (n = e.charCodeAt(s))) {
                  if (!o) {
                    i = s;
                    break;
                  }
                } else o = !1;
              return -1 === i
                ? r
                  ? "/"
                  : "."
                : r && 1 === i
                ? "//"
                : e.slice(0, i);
            },
            basename: function (e, n) {
              if (void 0 !== n && "string" != typeof n)
                throw new TypeError('"ext" argument must be a string');
              t(e);
              var r,
                i = 0,
                o = -1,
                s = !0;
              if (void 0 !== n && n.length > 0 && n.length <= e.length) {
                if (n.length === e.length && n === e) return "";
                var a = n.length - 1,
                  u = -1;
                for (r = e.length - 1; r >= 0; --r) {
                  var c = e.charCodeAt(r);
                  if (47 === c) {
                    if (!s) {
                      i = r + 1;
                      break;
                    }
                  } else
                    -1 === u && ((s = !1), (u = r + 1)),
                      a >= 0 &&
                        (c === n.charCodeAt(a)
                          ? -1 == --a && (o = r)
                          : ((a = -1), (o = u)));
                }
                return (
                  i === o ? (o = u) : -1 === o && (o = e.length), e.slice(i, o)
                );
              }
              for (r = e.length - 1; r >= 0; --r)
                if (47 === e.charCodeAt(r)) {
                  if (!s) {
                    i = r + 1;
                    break;
                  }
                } else -1 === o && ((s = !1), (o = r + 1));
              return -1 === o ? "" : e.slice(i, o);
            },
            extname: function (e) {
              t(e);
              for (
                var n = -1, r = 0, i = -1, o = !0, s = 0, a = e.length - 1;
                a >= 0;
                --a
              ) {
                var u = e.charCodeAt(a);
                if (47 !== u)
                  -1 === i && ((o = !1), (i = a + 1)),
                    46 === u
                      ? -1 === n
                        ? (n = a)
                        : 1 !== s && (s = 1)
                      : -1 !== n && (s = -1);
                else if (!o) {
                  r = a + 1;
                  break;
                }
              }
              return -1 === n ||
                -1 === i ||
                0 === s ||
                (1 === s && n === i - 1 && n === r + 1)
                ? ""
                : e.slice(n, i);
            },
            format: function (e) {
              if (null === e || "object" !== f(e))
                throw new TypeError(
                  'The "pathObject" argument must be of type Object. Received type ' +
                    f(e)
                );
              return (function (e, t) {
                var n = t.dir || t.root,
                  r = t.base || (t.name || "") + (t.ext || "");
                return n ? (n === t.root ? n + r : n + e + r) : r;
              })("/", e);
            },
            parse: function (e) {
              t(e);
              var n = { root: "", dir: "", base: "", ext: "", name: "" };
              if (0 === e.length) return n;
              var r,
                i = e.charCodeAt(0),
                o = 47 === i;
              o ? ((n.root = "/"), (r = 1)) : (r = 0);
              for (
                var s = -1, a = 0, u = -1, c = !0, l = e.length - 1, f = 0;
                l >= r;
                --l
              )
                if (47 !== (i = e.charCodeAt(l)))
                  -1 === u && ((c = !1), (u = l + 1)),
                    46 === i
                      ? -1 === s
                        ? (s = l)
                        : 1 !== f && (f = 1)
                      : -1 !== s && (f = -1);
                else if (!c) {
                  a = l + 1;
                  break;
                }
              return (
                -1 === s ||
                -1 === u ||
                0 === f ||
                (1 === f && s === u - 1 && s === a + 1)
                  ? -1 !== u &&
                    (n.base = n.name =
                      0 === a && o ? e.slice(1, u) : e.slice(a, u))
                  : (0 === a && o
                      ? ((n.name = e.slice(1, s)), (n.base = e.slice(1, u)))
                      : ((n.name = e.slice(a, s)), (n.base = e.slice(a, u))),
                    (n.ext = e.slice(s, u))),
                a > 0 ? (n.dir = e.slice(0, a - 1)) : o && (n.dir = "/"),
                n
              );
            },
            sep: "/",
            delimiter: ":",
            win32: null,
            posix: null,
          };
          (r.posix = r), (e.exports = r);
        },
    },
    h = {};
  function _(e) {
    var t = h[e];
    if (void 0 !== t) return t.exports;
    var n = (h[e] = { exports: {} });
    return p[e].call(n.exports, n, n.exports, _), n.exports;
  }
  (_.n = function (e) {
    var t =
      e && e.__esModule
        ? function () {
            return e.default;
          }
        : function () {
            return e;
          };
    return _.d(t, { a: t }), t;
  }),
    (_.d = function (e, t) {
      for (var n in t)
        _.o(t, n) &&
          !_.o(e, n) &&
          Object.defineProperty(e, n, { enumerable: !0, get: t[n] });
    }),
    (_.g = (function () {
      if (
        "object" ===
        ("undefined" == typeof globalThis ? "undefined" : f(globalThis))
      )
        return globalThis;
      try {
        return this || new Function("return this")();
      } catch (e) {
        if (
          "object" === ("undefined" == typeof window ? "undefined" : f(window))
        )
          return window;
      }
    })()),
    (_.o = function (e, t) {
      return Object.prototype.hasOwnProperty.call(e, t);
    }),
    (_.r = function (e) {
      "undefined" != typeof Symbol &&
        Symbol.toStringTag &&
        Object.defineProperty(e, Symbol.toStringTag, { value: "Module" }),
        Object.defineProperty(e, "__esModule", { value: !0 });
    });
  var v = {};
  !(function () {
    /*!*********************!*\
      !*** ./src/hook.ts ***!
      \*********************/
    _.r(v);
    var e = _(/*! @back/hook */ "../app-backend-core/lib/hook.js"),
      t = _(/*! @vue-devtools/shared-utils */ "../shared-utils/lib/index.js");
    (0, e.installHook)(t.target);
  })();
})();
