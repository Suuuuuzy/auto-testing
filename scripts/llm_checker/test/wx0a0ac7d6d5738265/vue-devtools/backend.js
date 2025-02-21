require("../@babel/runtime/helpers/Arrayincludes");
var e = require("../@babel/runtime/helpers/defineProperty"),
  t = require("../@babel/runtime/helpers/possibleConstructorReturn"),
  n = require("../@babel/runtime/helpers/get"),
  r = require("../@babel/runtime/helpers/getPrototypeOf"),
  o = require("../@babel/runtime/helpers/inherits"),
  i = require("../@babel/runtime/helpers/typeof"),
  a = require("../@babel/runtime/helpers/objectSpread2"),
  s = require("../@babel/runtime/helpers/slicedToArray"),
  c = require("../@babel/runtime/helpers/regeneratorRuntime"),
  u = require("../@babel/runtime/helpers/toConsumableArray"),
  l = require("../@babel/runtime/helpers/createForOfIteratorHelper"),
  p = require("../@babel/runtime/helpers/asyncToGenerator"),
  d = require("../@babel/runtime/helpers/classCallCheck"),
  f = require("../@babel/runtime/helpers/createClass");
!(function () {
  var h = {
      "../api/lib/esm/const.js":
        /*!*******************************!*\
      !*** ../api/lib/esm/const.js ***!
      \*******************************/
        function (e, t, n) {
          n.r(t),
            n.d(t, {
              HOOK_PLUGIN_SETTINGS_SET: function () {
                return o;
              },
              HOOK_SETUP: function () {
                return r;
              },
            });
          var r = "devtools-plugin:setup",
            o = "plugin:settings:set";
        },
      "../api/lib/esm/env.js":
        /*!*****************************!*\
      !*** ../api/lib/esm/env.js ***!
      \*****************************/
        function (e, t, n) {
          function r() {
            return o().__VUE_DEVTOOLS_GLOBAL_HOOK__;
          }
          function o() {
            return "undefined" != typeof navigator &&
              "undefined" != typeof window
              ? window
              : "undefined" != typeof globalThis
              ? globalThis
              : "undefined" != typeof global
              ? global
              : "undefined" != typeof my
              ? my
              : {};
          }
          n.r(t),
            n.d(t, {
              getDevtoolsGlobalHook: function () {
                return r;
              },
              getTarget: function () {
                return o;
              },
              isProxyAvailable: function () {
                return i;
              },
            });
          var i = "function" == typeof Proxy;
        },
      "../api/lib/esm/index.js":
        /*!*******************************!*\
      !*** ../api/lib/esm/index.js ***!
      \*******************************/
        function (e, t, n) {
          n.r(t),
            n.d(t, {
              isPerformanceSupported: function () {
                return a.isPerformanceSupported;
              },
              now: function () {
                return a.now;
              },
              setupDevtoolsPlugin: function () {
                return s;
              },
            });
          var r = n(/*! ./env.js */ "../api/lib/esm/env.js"),
            o = n(/*! ./const.js */ "../api/lib/esm/const.js"),
            i = n(/*! ./proxy.js */ "../api/lib/esm/proxy.js"),
            a = n(/*! ./time.js */ "../api/lib/esm/time.js");
          function s(e, t) {
            var n = e,
              a = (0, r.getTarget)(),
              s = (0, r.getDevtoolsGlobalHook)(),
              c = r.isProxyAvailable && n.enableEarlyProxy;
            if (!s || (!a.__VUE_DEVTOOLS_PLUGIN_API_AVAILABLE__ && c)) {
              var u = c ? new i.ApiProxy(n, s) : null;
              (a.__VUE_DEVTOOLS_PLUGINS__ =
                a.__VUE_DEVTOOLS_PLUGINS__ || []).push({
                pluginDescriptor: n,
                setupFn: t,
                proxy: u,
              }),
                u && t(u.proxiedTarget);
            } else s.emit(o.HOOK_SETUP, e, t);
          }
        },
      "../api/lib/esm/proxy.js":
        /*!*******************************!*\
      !*** ../api/lib/esm/proxy.js ***!
      \*******************************/
        function (e, t, n) {
          n.r(t),
            n.d(t, {
              ApiProxy: function () {
                return i;
              },
            });
          var r = n(/*! ./const.js */ "../api/lib/esm/const.js"),
            o = n(/*! ./time.js */ "../api/lib/esm/time.js"),
            i = (function () {
              return f(
                function e(t, n) {
                  var i = this;
                  d(this, e),
                    (this.target = null),
                    (this.targetQueue = []),
                    (this.onQueue = []),
                    (this.plugin = t),
                    (this.hook = n);
                  var a = {};
                  if (t.settings)
                    for (var s in t.settings) {
                      var c = t.settings[s];
                      a[s] = c.defaultValue;
                    }
                  var u = "__vue-devtools-plugin-settings__".concat(t.id),
                    l = Object.assign({}, a);
                  try {
                    var p = localStorage.getItem(u),
                      f = JSON.parse(p);
                    Object.assign(l, f);
                  } catch (e) {}
                  (this.fallbacks = {
                    getSettings: function () {
                      return l;
                    },
                    setSettings: function (e) {
                      try {
                        localStorage.setItem(u, JSON.stringify(e));
                      } catch (e) {}
                      l = e;
                    },
                    now: function () {
                      return (0, o.now)();
                    },
                  }),
                    n &&
                      n.on(r.HOOK_PLUGIN_SETTINGS_SET, function (e, t) {
                        e === i.plugin.id && i.fallbacks.setSettings(t);
                      }),
                    (this.proxiedOn = new Proxy(
                      {},
                      {
                        get: function (e, t) {
                          return i.target
                            ? i.target.on[t]
                            : function () {
                                for (
                                  var e = arguments.length,
                                    n = new Array(e),
                                    r = 0;
                                  r < e;
                                  r++
                                )
                                  n[r] = arguments[r];
                                i.onQueue.push({ method: t, args: n });
                              };
                        },
                      }
                    )),
                    (this.proxiedTarget = new Proxy(
                      {},
                      {
                        get: function (e, t) {
                          return i.target
                            ? i.target[t]
                            : "on" === t
                            ? i.proxiedOn
                            : Object.keys(i.fallbacks).includes(t)
                            ? function () {
                                for (
                                  var e,
                                    n = arguments.length,
                                    r = new Array(n),
                                    o = 0;
                                  o < n;
                                  o++
                                )
                                  r[o] = arguments[o];
                                return (
                                  i.targetQueue.push({
                                    method: t,
                                    args: r,
                                    resolve: function () {},
                                  }),
                                  (e = i.fallbacks)[t].apply(e, r)
                                );
                              }
                            : function () {
                                for (
                                  var e = arguments.length,
                                    n = new Array(e),
                                    r = 0;
                                  r < e;
                                  r++
                                )
                                  n[r] = arguments[r];
                                return new Promise(function (e) {
                                  i.targetQueue.push({
                                    method: t,
                                    args: n,
                                    resolve: e,
                                  });
                                });
                              };
                        },
                      }
                    ));
                },
                [
                  {
                    key: "setRealTarget",
                    value:
                      ((e = p(
                        c().mark(function e(t) {
                          var n, r, o, i, a, s, p, d;
                          return c().wrap(
                            function (e) {
                              for (;;)
                                switch ((e.prev = e.next)) {
                                  case 0:
                                    (this.target = t), (n = l(this.onQueue));
                                    try {
                                      for (n.s(); !(r = n.n()).done; )
                                        (i = r.value),
                                          (o = this.target.on)[i.method].apply(
                                            o,
                                            u(i.args)
                                          );
                                    } catch (e) {
                                      n.e(e);
                                    } finally {
                                      n.f();
                                    }
                                    (a = l(this.targetQueue)),
                                      (e.prev = 4),
                                      a.s();
                                  case 6:
                                    if ((s = a.n()).done) {
                                      e.next = 15;
                                      break;
                                    }
                                    return (
                                      (d = s.value),
                                      (e.t0 = d),
                                      (e.next = 11),
                                      (p = this.target)[d.method].apply(
                                        p,
                                        u(d.args)
                                      )
                                    );
                                  case 11:
                                    (e.t1 = e.sent),
                                      e.t0.resolve.call(e.t0, e.t1);
                                  case 13:
                                    e.next = 6;
                                    break;
                                  case 15:
                                    e.next = 20;
                                    break;
                                  case 17:
                                    (e.prev = 17),
                                      (e.t2 = e.catch(4)),
                                      a.e(e.t2);
                                  case 20:
                                    return (e.prev = 20), a.f(), e.finish(20);
                                  case 23:
                                  case "end":
                                    return e.stop();
                                }
                            },
                            e,
                            this,
                            [[4, 17, 20, 23]]
                          );
                        })
                      )),
                      function (t) {
                        return e.apply(this, arguments);
                      }),
                  },
                ]
              );
              var e;
            })();
        },
      "../api/lib/esm/time.js":
        /*!******************************!*\
      !*** ../api/lib/esm/time.js ***!
      \******************************/
        function (e, t, n) {
          var r, o;
          function i() {
            var e;
            return (
              void 0 !== r ||
                ("undefined" != typeof window && window.performance
                  ? ((r = !0), (o = window.performance))
                  : void 0 !== n.g &&
                    (null === (e = n.g.perf_hooks) || void 0 === e
                      ? void 0
                      : e.performance)
                  ? ((r = !0), (o = n.g.perf_hooks.performance))
                  : (r = !1)),
              r
            );
          }
          function a() {
            return i() ? o.now() : Date.now();
          }
          n.r(t),
            n.d(t, {
              isPerformanceSupported: function () {
                return i;
              },
              now: function () {
                return a;
              },
            });
        },
      "../app-backend-api/lib/api.js":
        /*!*************************************!*\
      !*** ../app-backend-api/lib/api.js ***!
      \*************************************/
        function (e, t, n) {
          Object.defineProperty(t, "__esModule", { value: !0 }),
            (t.DevtoolsPluginApiInstance = t.DevtoolsApi = void 0);
          var r = n(
              /*! @vue-devtools/shared-utils */ "../shared-utils/lib/index.js"
            ),
            o = n(/*! @vue/devtools-api */ "../api/lib/esm/index.js"),
            i = n(/*! ./hooks */ "../app-backend-api/lib/hooks.js"),
            a = [],
            s = (function () {
              return f(
                function e(t, n) {
                  d(this, e),
                    (this.stateEditor = new r.StateEditor()),
                    (this.backend = t),
                    (this.ctx = n),
                    (this.bridge = n.bridge),
                    (this.on = new i.DevtoolsHookable(n));
                },
                [
                  {
                    key: "callHook",
                    value:
                      ((w = p(
                        c().mark(function e(t, n) {
                          var r,
                            o,
                            i,
                            s,
                            u = arguments;
                          return c().wrap(
                            function (e) {
                              for (;;)
                                switch ((e.prev = e.next)) {
                                  case 0:
                                    return (
                                      (r =
                                        u.length > 2 && void 0 !== u[2]
                                          ? u[2]
                                          : this.ctx),
                                      (e.next = 3),
                                      this.on.callHandlers(t, n, r)
                                    );
                                  case 3:
                                    (n = e.sent), (o = 0), (i = a);
                                  case 5:
                                    if (!(o < i.length)) {
                                      e.next = 13;
                                      break;
                                    }
                                    return (
                                      (s = i[o]),
                                      (e.next = 9),
                                      s.callHandlers(t, n, r)
                                    );
                                  case 9:
                                    n = e.sent;
                                  case 10:
                                    o++, (e.next = 5);
                                    break;
                                  case 13:
                                    return e.abrupt("return", n);
                                  case 14:
                                  case "end":
                                    return e.stop();
                                }
                            },
                            e,
                            this
                          );
                        })
                      )),
                      function (e, t) {
                        return w.apply(this, arguments);
                      }),
                  },
                  {
                    key: "transformCall",
                    value:
                      ((S = p(
                        c().mark(function e(t) {
                          var n,
                            r,
                            o,
                            i,
                            a = arguments;
                          return c().wrap(
                            function (e) {
                              for (;;)
                                switch ((e.prev = e.next)) {
                                  case 0:
                                    for (
                                      n = a.length,
                                        r = new Array(n > 1 ? n - 1 : 0),
                                        o = 1;
                                      o < n;
                                      o++
                                    )
                                      r[o - 1] = a[o];
                                    return (
                                      (e.next = 3),
                                      this.callHook("transformCall", {
                                        callName: t,
                                        inArgs: r,
                                        outArgs: r.slice(),
                                      })
                                    );
                                  case 3:
                                    return (
                                      (i = e.sent),
                                      e.abrupt("return", i.outArgs)
                                    );
                                  case 5:
                                  case "end":
                                    return e.stop();
                                }
                            },
                            e,
                            this
                          );
                        })
                      )),
                      function (e) {
                        return S.apply(this, arguments);
                      }),
                  },
                  {
                    key: "getAppRecordName",
                    value:
                      ((C = p(
                        c().mark(function e(t, n) {
                          var r;
                          return c().wrap(
                            function (e) {
                              for (;;)
                                switch ((e.prev = e.next)) {
                                  case 0:
                                    return (
                                      (e.next = 2),
                                      this.callHook("getAppRecordName", {
                                        app: t,
                                        name: null,
                                      })
                                    );
                                  case 2:
                                    if (!(r = e.sent).name) {
                                      e.next = 7;
                                      break;
                                    }
                                    return e.abrupt("return", r.name);
                                  case 7:
                                    return e.abrupt("return", "App ".concat(n));
                                  case 8:
                                  case "end":
                                    return e.stop();
                                }
                            },
                            e,
                            this
                          );
                        })
                      )),
                      function (e, t) {
                        return C.apply(this, arguments);
                      }),
                  },
                  {
                    key: "getAppRootInstance",
                    value:
                      ((I = p(
                        c().mark(function e(t) {
                          var n;
                          return c().wrap(
                            function (e) {
                              for (;;)
                                switch ((e.prev = e.next)) {
                                  case 0:
                                    return (
                                      (e.next = 2),
                                      this.callHook("getAppRootInstance", {
                                        app: t,
                                        root: null,
                                      })
                                    );
                                  case 2:
                                    return (
                                      (n = e.sent), e.abrupt("return", n.root)
                                    );
                                  case 4:
                                  case "end":
                                    return e.stop();
                                }
                            },
                            e,
                            this
                          );
                        })
                      )),
                      function (e) {
                        return I.apply(this, arguments);
                      }),
                  },
                  {
                    key: "registerApplication",
                    value:
                      ((x = p(
                        c().mark(function e(t) {
                          return c().wrap(
                            function (e) {
                              for (;;)
                                switch ((e.prev = e.next)) {
                                  case 0:
                                    return (
                                      (e.next = 2),
                                      this.callHook("registerApplication", {
                                        app: t,
                                      })
                                    );
                                  case 2:
                                  case "end":
                                    return e.stop();
                                }
                            },
                            e,
                            this
                          );
                        })
                      )),
                      function (e) {
                        return x.apply(this, arguments);
                      }),
                  },
                  {
                    key: "walkComponentTree",
                    value:
                      ((T = p(
                        c().mark(function e(t) {
                          var n,
                            r,
                            o,
                            i,
                            a = arguments;
                          return c().wrap(
                            function (e) {
                              for (;;)
                                switch ((e.prev = e.next)) {
                                  case 0:
                                    return (
                                      (n =
                                        a.length > 1 && void 0 !== a[1]
                                          ? a[1]
                                          : -1),
                                      (r =
                                        a.length > 2 && void 0 !== a[2]
                                          ? a[2]
                                          : null),
                                      (o =
                                        a.length > 3 &&
                                        void 0 !== a[3] &&
                                        a[3]),
                                      (e.next = 5),
                                      this.callHook("walkComponentTree", {
                                        componentInstance: t,
                                        componentTreeData: null,
                                        maxDepth: n,
                                        filter: r,
                                        recursively: o,
                                      })
                                    );
                                  case 5:
                                    return (
                                      (i = e.sent),
                                      e.abrupt("return", i.componentTreeData)
                                    );
                                  case 7:
                                  case "end":
                                    return e.stop();
                                }
                            },
                            e,
                            this
                          );
                        })
                      )),
                      function (e) {
                        return T.apply(this, arguments);
                      }),
                  },
                  {
                    key: "visitComponentTree",
                    value:
                      ((O = p(
                        c().mark(function e(t, n) {
                          var r,
                            o,
                            i,
                            a = arguments;
                          return c().wrap(
                            function (e) {
                              for (;;)
                                switch ((e.prev = e.next)) {
                                  case 0:
                                    return (
                                      (r =
                                        a.length > 2 && void 0 !== a[2]
                                          ? a[2]
                                          : null),
                                      (o = a.length > 3 ? a[3] : void 0),
                                      (e.next = 4),
                                      this.callHook("visitComponentTree", {
                                        app: o,
                                        componentInstance: t,
                                        treeNode: n,
                                        filter: r,
                                      })
                                    );
                                  case 4:
                                    return (
                                      (i = e.sent),
                                      e.abrupt("return", i.treeNode)
                                    );
                                  case 6:
                                  case "end":
                                    return e.stop();
                                }
                            },
                            e,
                            this
                          );
                        })
                      )),
                      function (e, t) {
                        return O.apply(this, arguments);
                      }),
                  },
                  {
                    key: "walkComponentParents",
                    value:
                      ((k = p(
                        c().mark(function e(t) {
                          var n;
                          return c().wrap(
                            function (e) {
                              for (;;)
                                switch ((e.prev = e.next)) {
                                  case 0:
                                    return (
                                      (e.next = 2),
                                      this.callHook("walkComponentParents", {
                                        componentInstance: t,
                                        parentInstances: [],
                                      })
                                    );
                                  case 2:
                                    return (
                                      (n = e.sent),
                                      e.abrupt("return", n.parentInstances)
                                    );
                                  case 4:
                                  case "end":
                                    return e.stop();
                                }
                            },
                            e,
                            this
                          );
                        })
                      )),
                      function (e) {
                        return k.apply(this, arguments);
                      }),
                  },
                  {
                    key: "inspectComponent",
                    value:
                      ((E = p(
                        c().mark(function e(t, n) {
                          var r;
                          return c().wrap(
                            function (e) {
                              for (;;)
                                switch ((e.prev = e.next)) {
                                  case 0:
                                    return (
                                      (e.next = 2),
                                      this.callHook("inspectComponent", {
                                        app: n,
                                        componentInstance: t,
                                        instanceData: null,
                                      })
                                    );
                                  case 2:
                                    return (
                                      (r = e.sent),
                                      e.abrupt("return", r.instanceData)
                                    );
                                  case 4:
                                  case "end":
                                    return e.stop();
                                }
                            },
                            e,
                            this
                          );
                        })
                      )),
                      function (e, t) {
                        return E.apply(this, arguments);
                      }),
                  },
                  {
                    key: "getComponentBounds",
                    value:
                      ((y = p(
                        c().mark(function e(t) {
                          var n;
                          return c().wrap(
                            function (e) {
                              for (;;)
                                switch ((e.prev = e.next)) {
                                  case 0:
                                    return (
                                      (e.next = 2),
                                      this.callHook("getComponentBounds", {
                                        componentInstance: t,
                                        bounds: null,
                                      })
                                    );
                                  case 2:
                                    return (
                                      (n = e.sent), e.abrupt("return", n.bounds)
                                    );
                                  case 4:
                                  case "end":
                                    return e.stop();
                                }
                            },
                            e,
                            this
                          );
                        })
                      )),
                      function (e) {
                        return y.apply(this, arguments);
                      }),
                  },
                  {
                    key: "getComponentName",
                    value:
                      ((b = p(
                        c().mark(function e(t) {
                          var n;
                          return c().wrap(
                            function (e) {
                              for (;;)
                                switch ((e.prev = e.next)) {
                                  case 0:
                                    return (
                                      (e.next = 2),
                                      this.callHook("getComponentName", {
                                        componentInstance: t,
                                        name: null,
                                      })
                                    );
                                  case 2:
                                    return (
                                      (n = e.sent), e.abrupt("return", n.name)
                                    );
                                  case 4:
                                  case "end":
                                    return e.stop();
                                }
                            },
                            e,
                            this
                          );
                        })
                      )),
                      function (e) {
                        return b.apply(this, arguments);
                      }),
                  },
                  {
                    key: "getComponentInstances",
                    value:
                      ((_ = p(
                        c().mark(function e(t) {
                          var n;
                          return c().wrap(
                            function (e) {
                              for (;;)
                                switch ((e.prev = e.next)) {
                                  case 0:
                                    return (
                                      (e.next = 2),
                                      this.callHook("getComponentInstances", {
                                        app: t,
                                        componentInstances: [],
                                      })
                                    );
                                  case 2:
                                    return (
                                      (n = e.sent),
                                      e.abrupt("return", n.componentInstances)
                                    );
                                  case 4:
                                  case "end":
                                    return e.stop();
                                }
                            },
                            e,
                            this
                          );
                        })
                      )),
                      function (e) {
                        return _.apply(this, arguments);
                      }),
                  },
                  {
                    key: "getElementComponent",
                    value:
                      ((g = p(
                        c().mark(function e(t) {
                          var n;
                          return c().wrap(
                            function (e) {
                              for (;;)
                                switch ((e.prev = e.next)) {
                                  case 0:
                                    return (
                                      (e.next = 2),
                                      this.callHook("getElementComponent", {
                                        element: t,
                                        componentInstance: null,
                                      })
                                    );
                                  case 2:
                                    return (
                                      (n = e.sent),
                                      e.abrupt("return", n.componentInstance)
                                    );
                                  case 4:
                                  case "end":
                                    return e.stop();
                                }
                            },
                            e,
                            this
                          );
                        })
                      )),
                      function (e) {
                        return g.apply(this, arguments);
                      }),
                  },
                  {
                    key: "getComponentRootElements",
                    value:
                      ((m = p(
                        c().mark(function e(t) {
                          var n;
                          return c().wrap(
                            function (e) {
                              for (;;)
                                switch ((e.prev = e.next)) {
                                  case 0:
                                    return (
                                      (e.next = 2),
                                      this.callHook(
                                        "getComponentRootElements",
                                        {
                                          componentInstance: t,
                                          rootElements: [],
                                        }
                                      )
                                    );
                                  case 2:
                                    return (
                                      (n = e.sent),
                                      e.abrupt("return", n.rootElements)
                                    );
                                  case 4:
                                  case "end":
                                    return e.stop();
                                }
                            },
                            e,
                            this
                          );
                        })
                      )),
                      function (e) {
                        return m.apply(this, arguments);
                      }),
                  },
                  {
                    key: "editComponentState",
                    value:
                      ((v = p(
                        c().mark(function e(t, n, r, o, i) {
                          var a,
                            s,
                            u = this;
                          return c().wrap(
                            function (e) {
                              for (;;)
                                switch ((e.prev = e.next)) {
                                  case 0:
                                    return (
                                      (a = n.split(".")),
                                      (e.next = 3),
                                      this.callHook("editComponentState", {
                                        app: i,
                                        componentInstance: t,
                                        path: a,
                                        type: r,
                                        state: o,
                                        set: function (e) {
                                          var t =
                                              arguments.length > 1 &&
                                              void 0 !== arguments[1]
                                                ? arguments[1]
                                                : a,
                                            n =
                                              arguments.length > 2 &&
                                              void 0 !== arguments[2]
                                                ? arguments[2]
                                                : o.value,
                                            r =
                                              arguments.length > 3
                                                ? arguments[3]
                                                : void 0;
                                          return u.stateEditor.set(
                                            e,
                                            t,
                                            n,
                                            r ||
                                              u.stateEditor.createDefaultSetCallback(
                                                o
                                              )
                                          );
                                        },
                                      })
                                    );
                                  case 3:
                                    return (
                                      (s = e.sent),
                                      e.abrupt("return", s.componentInstance)
                                    );
                                  case 5:
                                  case "end":
                                    return e.stop();
                                }
                            },
                            e,
                            this
                          );
                        })
                      )),
                      function (e, t, n, r, o) {
                        return v.apply(this, arguments);
                      }),
                  },
                  {
                    key: "getComponentDevtoolsOptions",
                    value:
                      ((h = p(
                        c().mark(function e(t) {
                          var n;
                          return c().wrap(
                            function (e) {
                              for (;;)
                                switch ((e.prev = e.next)) {
                                  case 0:
                                    return (
                                      (e.next = 2),
                                      this.callHook("getAppDevtoolsOptions", {
                                        componentInstance: t,
                                        options: null,
                                      })
                                    );
                                  case 2:
                                    return (
                                      (n = e.sent),
                                      e.abrupt("return", n.options || {})
                                    );
                                  case 4:
                                  case "end":
                                    return e.stop();
                                }
                            },
                            e,
                            this
                          );
                        })
                      )),
                      function (e) {
                        return h.apply(this, arguments);
                      }),
                  },
                  {
                    key: "getComponentRenderCode",
                    value:
                      ((l = p(
                        c().mark(function e(t) {
                          var n;
                          return c().wrap(
                            function (e) {
                              for (;;)
                                switch ((e.prev = e.next)) {
                                  case 0:
                                    return (
                                      (e.next = 2),
                                      this.callHook("getComponentRenderCode", {
                                        componentInstance: t,
                                        code: null,
                                      })
                                    );
                                  case 2:
                                    return (
                                      (n = e.sent),
                                      e.abrupt("return", { code: n.code })
                                    );
                                  case 4:
                                  case "end":
                                    return e.stop();
                                }
                            },
                            e,
                            this
                          );
                        })
                      )),
                      function (e) {
                        return l.apply(this, arguments);
                      }),
                  },
                  {
                    key: "inspectTimelineEvent",
                    value:
                      ((u = p(
                        c().mark(function e(t, n) {
                          var r;
                          return c().wrap(
                            function (e) {
                              for (;;)
                                switch ((e.prev = e.next)) {
                                  case 0:
                                    return (
                                      (e.next = 2),
                                      this.callHook("inspectTimelineEvent", {
                                        event: t.event,
                                        layerId: t.layerId,
                                        app: n,
                                        data: t.event.data,
                                        all: t.all,
                                      })
                                    );
                                  case 2:
                                    return (
                                      (r = e.sent), e.abrupt("return", r.data)
                                    );
                                  case 4:
                                  case "end":
                                    return e.stop();
                                }
                            },
                            e,
                            this
                          );
                        })
                      )),
                      function (e, t) {
                        return u.apply(this, arguments);
                      }),
                  },
                  {
                    key: "clearTimeline",
                    value:
                      ((s = p(
                        c().mark(function e() {
                          return c().wrap(
                            function (e) {
                              for (;;)
                                switch ((e.prev = e.next)) {
                                  case 0:
                                    return (
                                      (e.next = 2),
                                      this.callHook("timelineCleared", {})
                                    );
                                  case 2:
                                  case "end":
                                    return e.stop();
                                }
                            },
                            e,
                            this
                          );
                        })
                      )),
                      function () {
                        return s.apply(this, arguments);
                      }),
                  },
                  {
                    key: "getInspectorTree",
                    value:
                      ((n = p(
                        c().mark(function e(t, n, r) {
                          var o;
                          return c().wrap(
                            function (e) {
                              for (;;)
                                switch ((e.prev = e.next)) {
                                  case 0:
                                    return (
                                      (e.next = 2),
                                      this.callHook("getInspectorTree", {
                                        inspectorId: t,
                                        app: n,
                                        filter: r,
                                        rootNodes: [],
                                      })
                                    );
                                  case 2:
                                    return (
                                      (o = e.sent),
                                      e.abrupt("return", o.rootNodes)
                                    );
                                  case 4:
                                  case "end":
                                    return e.stop();
                                }
                            },
                            e,
                            this
                          );
                        })
                      )),
                      function (e, t, r) {
                        return n.apply(this, arguments);
                      }),
                  },
                  {
                    key: "getInspectorState",
                    value:
                      ((t = p(
                        c().mark(function e(t, n, r) {
                          var o;
                          return c().wrap(
                            function (e) {
                              for (;;)
                                switch ((e.prev = e.next)) {
                                  case 0:
                                    return (
                                      (e.next = 2),
                                      this.callHook("getInspectorState", {
                                        inspectorId: t,
                                        app: n,
                                        nodeId: r,
                                        state: null,
                                      })
                                    );
                                  case 2:
                                    return (
                                      (o = e.sent), e.abrupt("return", o.state)
                                    );
                                  case 4:
                                  case "end":
                                    return e.stop();
                                }
                            },
                            e,
                            this
                          );
                        })
                      )),
                      function (e, n, r) {
                        return t.apply(this, arguments);
                      }),
                  },
                  {
                    key: "editInspectorState",
                    value:
                      ((e = p(
                        c().mark(function e(t, n, r, o, i, a) {
                          var s,
                            u = this;
                          return c().wrap(
                            function (e) {
                              for (;;)
                                switch ((e.prev = e.next)) {
                                  case 0:
                                    return (
                                      (s = o.split(".")),
                                      (e.next = 3),
                                      this.callHook("editInspectorState", {
                                        inspectorId: t,
                                        app: n,
                                        nodeId: r,
                                        path: s,
                                        type: i,
                                        state: a,
                                        set: function (e) {
                                          var t =
                                              arguments.length > 1 &&
                                              void 0 !== arguments[1]
                                                ? arguments[1]
                                                : s,
                                            n =
                                              arguments.length > 2 &&
                                              void 0 !== arguments[2]
                                                ? arguments[2]
                                                : a.value,
                                            r =
                                              arguments.length > 3
                                                ? arguments[3]
                                                : void 0;
                                          return u.stateEditor.set(
                                            e,
                                            t,
                                            n,
                                            r ||
                                              u.stateEditor.createDefaultSetCallback(
                                                a
                                              )
                                          );
                                        },
                                      })
                                    );
                                  case 3:
                                  case "end":
                                    return e.stop();
                                }
                            },
                            e,
                            this
                          );
                        })
                      )),
                      function (t, n, r, o, i, a) {
                        return e.apply(this, arguments);
                      }),
                  },
                  {
                    key: "now",
                    value: function () {
                      return (0, o.now)();
                    },
                  },
                ]
              );
              var e,
                t,
                n,
                s,
                u,
                l,
                h,
                v,
                m,
                g,
                _,
                b,
                y,
                E,
                k,
                O,
                T,
                x,
                I,
                C,
                S,
                w;
            })();
          t.DevtoolsApi = s;
          var l = (function () {
            return f(
              function e(t, n, o) {
                d(this, e),
                  (this.bridge = o.bridge),
                  (this.ctx = o),
                  (this.plugin = t),
                  (this.appRecord = n),
                  (this.backendApi = n.backend.api),
                  (this.defaultSettings = (0, r.getPluginDefaultSettings)(
                    t.descriptor.settings
                  )),
                  (this.on = new i.DevtoolsHookable(o, t)),
                  a.push(this.on);
              },
              [
                {
                  key: "notifyComponentUpdate",
                  value:
                    ((e = p(
                      c().mark(function e() {
                        var t,
                          n,
                          o = arguments;
                        return c().wrap(
                          function (e) {
                            for (;;)
                              switch ((e.prev = e.next)) {
                                case 0:
                                  if (
                                    ((t =
                                      o.length > 0 && void 0 !== o[0]
                                        ? o[0]
                                        : null),
                                    this.enabled &&
                                      this.hasPermission(
                                        r.PluginPermission.COMPONENTS
                                      ))
                                  ) {
                                    e.next = 3;
                                    break;
                                  }
                                  return e.abrupt("return");
                                case 3:
                                  if (!t) {
                                    e.next = 16;
                                    break;
                                  }
                                  return (
                                    (e.t0 = (n = this.ctx.hook).emit),
                                    (e.t1 = n),
                                    (e.t2 = [r.HookEvents.COMPONENT_UPDATED]),
                                    (e.t3 = u),
                                    (e.next = 10),
                                    this.backendApi.transformCall(
                                      r.HookEvents.COMPONENT_UPDATED,
                                      t
                                    )
                                  );
                                case 10:
                                  (e.t4 = e.sent),
                                    (e.t5 = (0, e.t3)(e.t4)),
                                    (e.t6 = e.t2.concat.call(e.t2, e.t5)),
                                    e.t0.apply.call(e.t0, e.t1, e.t6),
                                    (e.next = 17);
                                  break;
                                case 16:
                                  this.ctx.hook.emit(
                                    r.HookEvents.COMPONENT_UPDATED
                                  );
                                case 17:
                                case "end":
                                  return e.stop();
                              }
                          },
                          e,
                          this
                        );
                      })
                    )),
                    function () {
                      return e.apply(this, arguments);
                    }),
                },
                {
                  key: "addTimelineLayer",
                  value: function (e) {
                    return (
                      !(
                        !this.enabled ||
                        !this.hasPermission(r.PluginPermission.TIMELINE)
                      ) &&
                      (this.ctx.hook.emit(
                        r.HookEvents.TIMELINE_LAYER_ADDED,
                        e,
                        this.plugin
                      ),
                      !0)
                    );
                  },
                },
                {
                  key: "addTimelineEvent",
                  value: function (e) {
                    return (
                      !(
                        !this.enabled ||
                        !this.hasPermission(r.PluginPermission.TIMELINE)
                      ) &&
                      (this.ctx.hook.emit(
                        r.HookEvents.TIMELINE_EVENT_ADDED,
                        e,
                        this.plugin
                      ),
                      !0)
                    );
                  },
                },
                {
                  key: "addInspector",
                  value: function (e) {
                    return (
                      !(
                        !this.enabled ||
                        !this.hasPermission(r.PluginPermission.CUSTOM_INSPECTOR)
                      ) &&
                      (this.ctx.hook.emit(
                        r.HookEvents.CUSTOM_INSPECTOR_ADD,
                        e,
                        this.plugin
                      ),
                      !0)
                    );
                  },
                },
                {
                  key: "sendInspectorTree",
                  value: function (e) {
                    return (
                      !(
                        !this.enabled ||
                        !this.hasPermission(r.PluginPermission.CUSTOM_INSPECTOR)
                      ) &&
                      (this.ctx.hook.emit(
                        r.HookEvents.CUSTOM_INSPECTOR_SEND_TREE,
                        e,
                        this.plugin
                      ),
                      !0)
                    );
                  },
                },
                {
                  key: "sendInspectorState",
                  value: function (e) {
                    return (
                      !(
                        !this.enabled ||
                        !this.hasPermission(r.PluginPermission.CUSTOM_INSPECTOR)
                      ) &&
                      (this.ctx.hook.emit(
                        r.HookEvents.CUSTOM_INSPECTOR_SEND_STATE,
                        e,
                        this.plugin
                      ),
                      !0)
                    );
                  },
                },
                {
                  key: "selectInspectorNode",
                  value: function (e, t) {
                    return (
                      !(
                        !this.enabled ||
                        !this.hasPermission(r.PluginPermission.CUSTOM_INSPECTOR)
                      ) &&
                      (this.ctx.hook.emit(
                        r.HookEvents.CUSTOM_INSPECTOR_SELECT_NODE,
                        e,
                        t,
                        this.plugin
                      ),
                      !0)
                    );
                  },
                },
                {
                  key: "getComponentBounds",
                  value: function (e) {
                    return this.backendApi.getComponentBounds(e);
                  },
                },
                {
                  key: "getComponentName",
                  value: function (e) {
                    return this.backendApi.getComponentName(e);
                  },
                },
                {
                  key: "getComponentInstances",
                  value: function (e) {
                    return this.backendApi.getComponentInstances(e);
                  },
                },
                {
                  key: "highlightElement",
                  value: function (e) {
                    return (
                      !(
                        !this.enabled ||
                        !this.hasPermission(r.PluginPermission.COMPONENTS)
                      ) &&
                      (this.ctx.hook.emit(
                        r.HookEvents.COMPONENT_HIGHLIGHT,
                        e.__VUE_DEVTOOLS_UID__,
                        this.plugin
                      ),
                      !0)
                    );
                  },
                },
                {
                  key: "unhighlightElement",
                  value: function () {
                    return (
                      !(
                        !this.enabled ||
                        !this.hasPermission(r.PluginPermission.COMPONENTS)
                      ) &&
                      (this.ctx.hook.emit(
                        r.HookEvents.COMPONENT_UNHIGHLIGHT,
                        this.plugin
                      ),
                      !0)
                    );
                  },
                },
                {
                  key: "getSettings",
                  value: function (e) {
                    return (0, r.getPluginSettings)(
                      null != e ? e : this.plugin.descriptor.id,
                      this.defaultSettings
                    );
                  },
                },
                {
                  key: "setSettings",
                  value: function (e, t) {
                    (0, r.setPluginSettings)(
                      null != t ? t : this.plugin.descriptor.id,
                      e
                    );
                  },
                },
                {
                  key: "now",
                  value: function () {
                    return (0, o.now)();
                  },
                },
                {
                  key: "enabled",
                  get: function () {
                    return (0, r.hasPluginPermission)(
                      this.plugin.descriptor.id,
                      r.PluginPermission.ENABLED
                    );
                  },
                },
                {
                  key: "hasPermission",
                  value: function (e) {
                    return (0, r.hasPluginPermission)(
                      this.plugin.descriptor.id,
                      e
                    );
                  },
                },
              ]
            );
            var e;
          })();
          t.DevtoolsPluginApiInstance = l;
        },
      "../app-backend-api/lib/app-record.js":
        /*!********************************************!*\
      !*** ../app-backend-api/lib/app-record.js ***!
      \********************************************/
        function (e, t) {
          Object.defineProperty(t, "__esModule", { value: !0 });
        },
      "../app-backend-api/lib/backend-context.js":
        /*!*************************************************!*\
      !*** ../app-backend-api/lib/backend-context.js ***!
      \*************************************************/
        function (e, t) {
          Object.defineProperty(t, "__esModule", { value: !0 }),
            (t.createBackendContext = void 0),
            (t.createBackendContext = function (e) {
              return {
                bridge: e.bridge,
                hook: e.hook,
                backends: [],
                appRecords: [],
                currentTab: null,
                currentAppRecord: null,
                currentInspectedComponentId: null,
                plugins: [],
                currentPlugin: null,
                timelineLayers: [],
                nextTimelineEventId: 0,
                timelineEventMap: new Map(),
                perfUniqueGroupId: 0,
                customInspectors: [],
                timelineMarkers: [],
              };
            });
        },
      "../app-backend-api/lib/backend.js":
        /*!*****************************************!*\
      !*** ../app-backend-api/lib/backend.js ***!
      \*****************************************/
        function (e, t, n) {
          Object.defineProperty(t, "__esModule", { value: !0 }),
            (t.createBackend =
              t.defineBackend =
              t.BuiltinBackendFeature =
                void 0);
          var r = n(/*! ./api */ "../app-backend-api/lib/api.js");
          !(function (e) {
            e.FLUSH = "flush";
          })(t.BuiltinBackendFeature || (t.BuiltinBackendFeature = {})),
            (t.defineBackend = function (e) {
              return e;
            }),
            (t.createBackend = function (e, t) {
              var n = { options: e, api: null };
              return (n.api = new r.DevtoolsApi(n, t)), e.setup(n.api), n;
            });
        },
      "../app-backend-api/lib/global-hook.js":
        /*!*********************************************!*\
      !*** ../app-backend-api/lib/global-hook.js ***!
      \*********************************************/
        function (e, t) {
          Object.defineProperty(t, "__esModule", { value: !0 });
        },
      "../app-backend-api/lib/hooks.js":
        /*!***************************************!*\
      !*** ../app-backend-api/lib/hooks.js ***!
      \***************************************/
        function (e, t, n) {
          Object.defineProperty(t, "__esModule", { value: !0 }),
            (t.DevtoolsHookable = void 0);
          var r = n(
              /*! @vue-devtools/shared-utils */ "../shared-utils/lib/index.js"
            ),
            o = (function () {
              return f(
                function e(t) {
                  var n =
                    arguments.length > 1 && void 0 !== arguments[1]
                      ? arguments[1]
                      : null;
                  d(this, e),
                    (this.handlers = {}),
                    (this.ctx = t),
                    (this.plugin = n);
                },
                [
                  {
                    key: "hook",
                    value: function (e, t) {
                      var n = this,
                        o =
                          arguments.length > 2 && void 0 !== arguments[2]
                            ? arguments[2]
                            : null,
                        i = (this.handlers[e] = this.handlers[e] || []);
                      if (this.plugin) {
                        var a = t;
                        t = function () {
                          var e;
                          if (
                            (0, r.hasPluginPermission)(
                              n.plugin.descriptor.id,
                              r.PluginPermission.ENABLED
                            ) &&
                            (!o ||
                              (0, r.hasPluginPermission)(
                                n.plugin.descriptor.id,
                                o
                              )) &&
                            (n.plugin.descriptor.disableAppScope ||
                              (null === (e = n.ctx.currentAppRecord) ||
                              void 0 === e
                                ? void 0
                                : e.options.app) === n.plugin.descriptor.app)
                          ) {
                            for (
                              var t = arguments.length, i = new Array(t), s = 0;
                              s < t;
                              s++
                            )
                              i[s] = arguments[s];
                            if (
                              n.plugin.descriptor.disablePluginScope ||
                              null == i[0].pluginId ||
                              i[0].pluginId === n.plugin.descriptor.id
                            )
                              return a.apply(void 0, i);
                          }
                        };
                      }
                      i.push({ handler: t, plugin: this.ctx.currentPlugin });
                    },
                  },
                  {
                    key: "callHandlers",
                    value:
                      ((e = p(
                        c().mark(function e(t, n, r) {
                          var o, i, a, s, u;
                          return c().wrap(
                            function (e) {
                              for (;;)
                                switch ((e.prev = e.next)) {
                                  case 0:
                                    if (!this.handlers[t]) {
                                      e.next = 17;
                                      break;
                                    }
                                    (o = this.handlers[t]), (i = 0);
                                  case 3:
                                    if (!(i < o.length)) {
                                      e.next = 17;
                                      break;
                                    }
                                    return (
                                      (a = o[i]),
                                      (s = a.handler),
                                      (u = a.plugin),
                                      (e.prev = 5),
                                      (e.next = 8),
                                      s(n, r)
                                    );
                                  case 8:
                                    e.next = 14;
                                    break;
                                  case 10:
                                    (e.prev = 10),
                                      (e.t0 = e.catch(5)),
                                      console.error(
                                        "An error occurred in hook '"
                                          .concat(t, "'")
                                          .concat(
                                            u
                                              ? " registered by plugin '".concat(
                                                  u.descriptor.id,
                                                  "'"
                                                )
                                              : "",
                                            " with payload:"
                                          ),
                                        n
                                      ),
                                      console.error(e.t0);
                                  case 14:
                                    i++, (e.next = 3);
                                    break;
                                  case 17:
                                    return e.abrupt("return", n);
                                  case 18:
                                  case "end":
                                    return e.stop();
                                }
                            },
                            e,
                            this,
                            [[5, 10]]
                          );
                        })
                      )),
                      function (t, n, r) {
                        return e.apply(this, arguments);
                      }),
                  },
                  {
                    key: "transformCall",
                    value: function (e) {
                      this.hook("transformCall", e);
                    },
                  },
                  {
                    key: "getAppRecordName",
                    value: function (e) {
                      this.hook("getAppRecordName", e);
                    },
                  },
                  {
                    key: "getAppRootInstance",
                    value: function (e) {
                      this.hook("getAppRootInstance", e);
                    },
                  },
                  {
                    key: "registerApplication",
                    value: function (e) {
                      this.hook("registerApplication", e);
                    },
                  },
                  {
                    key: "walkComponentTree",
                    value: function (e) {
                      this.hook(
                        "walkComponentTree",
                        e,
                        r.PluginPermission.COMPONENTS
                      );
                    },
                  },
                  {
                    key: "visitComponentTree",
                    value: function (e) {
                      this.hook(
                        "visitComponentTree",
                        e,
                        r.PluginPermission.COMPONENTS
                      );
                    },
                  },
                  {
                    key: "walkComponentParents",
                    value: function (e) {
                      this.hook(
                        "walkComponentParents",
                        e,
                        r.PluginPermission.COMPONENTS
                      );
                    },
                  },
                  {
                    key: "inspectComponent",
                    value: function (e) {
                      this.hook(
                        "inspectComponent",
                        e,
                        r.PluginPermission.COMPONENTS
                      );
                    },
                  },
                  {
                    key: "getComponentBounds",
                    value: function (e) {
                      this.hook(
                        "getComponentBounds",
                        e,
                        r.PluginPermission.COMPONENTS
                      );
                    },
                  },
                  {
                    key: "getComponentName",
                    value: function (e) {
                      this.hook(
                        "getComponentName",
                        e,
                        r.PluginPermission.COMPONENTS
                      );
                    },
                  },
                  {
                    key: "getComponentInstances",
                    value: function (e) {
                      this.hook(
                        "getComponentInstances",
                        e,
                        r.PluginPermission.COMPONENTS
                      );
                    },
                  },
                  {
                    key: "getElementComponent",
                    value: function (e) {
                      this.hook(
                        "getElementComponent",
                        e,
                        r.PluginPermission.COMPONENTS
                      );
                    },
                  },
                  {
                    key: "getComponentRootElements",
                    value: function (e) {
                      this.hook(
                        "getComponentRootElements",
                        e,
                        r.PluginPermission.COMPONENTS
                      );
                    },
                  },
                  {
                    key: "editComponentState",
                    value: function (e) {
                      this.hook(
                        "editComponentState",
                        e,
                        r.PluginPermission.COMPONENTS
                      );
                    },
                  },
                  {
                    key: "getComponentDevtoolsOptions",
                    value: function (e) {
                      this.hook(
                        "getAppDevtoolsOptions",
                        e,
                        r.PluginPermission.COMPONENTS
                      );
                    },
                  },
                  {
                    key: "getComponentRenderCode",
                    value: function (e) {
                      this.hook(
                        "getComponentRenderCode",
                        e,
                        r.PluginPermission.COMPONENTS
                      );
                    },
                  },
                  {
                    key: "inspectTimelineEvent",
                    value: function (e) {
                      this.hook(
                        "inspectTimelineEvent",
                        e,
                        r.PluginPermission.TIMELINE
                      );
                    },
                  },
                  {
                    key: "timelineCleared",
                    value: function (e) {
                      this.hook(
                        "timelineCleared",
                        e,
                        r.PluginPermission.TIMELINE
                      );
                    },
                  },
                  {
                    key: "getInspectorTree",
                    value: function (e) {
                      this.hook(
                        "getInspectorTree",
                        e,
                        r.PluginPermission.CUSTOM_INSPECTOR
                      );
                    },
                  },
                  {
                    key: "getInspectorState",
                    value: function (e) {
                      this.hook(
                        "getInspectorState",
                        e,
                        r.PluginPermission.CUSTOM_INSPECTOR
                      );
                    },
                  },
                  {
                    key: "editInspectorState",
                    value: function (e) {
                      this.hook(
                        "editInspectorState",
                        e,
                        r.PluginPermission.CUSTOM_INSPECTOR
                      );
                    },
                  },
                  {
                    key: "setPluginSettings",
                    value: function (e) {
                      this.hook("setPluginSettings", e);
                    },
                  },
                ]
              );
              var e;
            })();
          t.DevtoolsHookable = o;
        },
      "../app-backend-api/lib/index.js":
        /*!***************************************!*\
      !*** ../app-backend-api/lib/index.js ***!
      \***************************************/
        function (e, t, n) {
          var r =
              (this && this.__createBinding) ||
              (Object.create
                ? function (e, t, n, r) {
                    void 0 === r && (r = n);
                    var o = Object.getOwnPropertyDescriptor(t, n);
                    (o &&
                      !("get" in o
                        ? !t.__esModule
                        : o.writable || o.configurable)) ||
                      (o = {
                        enumerable: !0,
                        get: function () {
                          return t[n];
                        },
                      }),
                      Object.defineProperty(e, r, o);
                  }
                : function (e, t, n, r) {
                    void 0 === r && (r = n), (e[r] = t[n]);
                  }),
            o =
              (this && this.__exportStar) ||
              function (e, t) {
                for (var n in e)
                  "default" === n ||
                    Object.prototype.hasOwnProperty.call(t, n) ||
                    r(t, e, n);
              };
          Object.defineProperty(t, "__esModule", { value: !0 }),
            o(n(/*! ./api */ "../app-backend-api/lib/api.js"), t),
            o(n(/*! ./app-record */ "../app-backend-api/lib/app-record.js"), t),
            o(n(/*! ./backend */ "../app-backend-api/lib/backend.js"), t),
            o(
              n(
                /*! ./backend-context */ "../app-backend-api/lib/backend-context.js"
              ),
              t
            ),
            o(
              n(/*! ./global-hook */ "../app-backend-api/lib/global-hook.js"),
              t
            ),
            o(n(/*! ./hooks */ "../app-backend-api/lib/hooks.js"), t),
            o(n(/*! ./plugin */ "../app-backend-api/lib/plugin.js"), t);
        },
      "../app-backend-api/lib/plugin.js":
        /*!****************************************!*\
      !*** ../app-backend-api/lib/plugin.js ***!
      \****************************************/
        function (e, t) {
          Object.defineProperty(t, "__esModule", { value: !0 });
        },
      "../app-backend-core/lib/app.js":
        /*!**************************************!*\
      !*** ../app-backend-core/lib/app.js ***!
      \**************************************/
        function (e, t, n) {
          var r =
            (this && this.__importDefault) ||
            function (e) {
              return e && e.__esModule ? e : { default: e };
            };
          Object.defineProperty(t, "__esModule", { value: !0 }),
            (t._legacy_getAndRegisterApps =
              t.removeApp =
              t.sendApps =
              t.waitForAppsRegistration =
              t.getAppRecord =
              t.getAppRecordId =
              t.mapAppRecord =
              t.selectApp =
              t.registerApp =
                void 0);
          var o = n(
              /*! @vue-devtools/shared-utils */ "../shared-utils/lib/index.js"
            ),
            i = r(
              n(/*! speakingurl */ "../../node_modules/speakingurl/index.js")
            ),
            a = n(/*! ./util/queue */ "../app-backend-core/lib/util/queue.js"),
            u = n(
              /*! ./legacy/scan */ "../app-backend-core/lib/legacy/scan.js"
            ),
            d = n(/*! ./timeline */ "../app-backend-core/lib/timeline.js"),
            f = n(/*! ./backend */ "../app-backend-core/lib/backend.js"),
            h = n(
              /*! ./global-hook.js */ "../app-backend-core/lib/global-hook.js"
            ),
            v = new a.JobQueue(),
            m = 0,
            g = new Map();
          function _(e, t) {
            return b.apply(this, arguments);
          }
          function b() {
            return (b = p(
              c().mark(function e(t, n) {
                return c().wrap(function (e) {
                  for (;;)
                    switch ((e.prev = e.next)) {
                      case 0:
                        return e.abrupt(
                          "return",
                          v.queue("regiserApp", function () {
                            return y(t, n);
                          })
                        );
                      case 1:
                      case "end":
                        return e.stop();
                    }
                }, e);
              })
            )).apply(this, arguments);
          }
          function y(e, t) {
            return E.apply(this, arguments);
          }
          function E() {
            return (E = p(
              c().mark(function e(t, n) {
                var r, o, i, a;
                return c().wrap(function (e) {
                  for (;;)
                    switch ((e.prev = e.next)) {
                      case 0:
                        if (
                          !n.appRecords.find(function (e) {
                            return e.options.app === t.app;
                          })
                        ) {
                          e.next = 2;
                          break;
                        }
                        return e.abrupt("return");
                      case 2:
                        if (t.version) {
                          e.next = 4;
                          break;
                        }
                        throw new Error("[Vue Devtools] Vue version not found");
                      case 4:
                        (r = parseInt(
                          t.version.substring(0, t.version.indexOf("."))
                        )),
                          (o = 0);
                      case 6:
                        if (!(o < f.availableBackends.length)) {
                          e.next = 16;
                          break;
                        }
                        if (
                          (i = f.availableBackends[o]).frameworkVersion !== r
                        ) {
                          e.next = 13;
                          break;
                        }
                        return (
                          (a = (0, f.getBackend)(i, n)),
                          (e.next = 12),
                          k(t, a, n)
                        );
                      case 12:
                        return e.abrupt("break", 16);
                      case 13:
                        o++, (e.next = 6);
                        break;
                      case 16:
                      case "end":
                        return e.stop();
                    }
                }, e);
              })
            )).apply(this, arguments);
          }
          function k(e, t, n) {
            return O.apply(this, arguments);
          }
          function O() {
            return (O = p(
              c().mark(function e(t, n, r) {
                var a, u, p, f, h, v, _, b, y, E, k, O, x, C;
                return c().wrap(
                  function (e) {
                    for (;;)
                      switch ((e.prev = e.next)) {
                        case 0:
                          return (e.next = 2), n.api.getAppRootInstance(t.app);
                        case 2:
                          if (!(f = e.sent)) {
                            e.next = 53;
                            break;
                          }
                          return (
                            (e.next = 6), n.api.getComponentDevtoolsOptions(f)
                          );
                        case 6:
                          if (!e.sent.hide) {
                            e.next = 9;
                            break;
                          }
                          return (
                            (t.app._vueDevtools_hidden_ = !0),
                            e.abrupt("return")
                          );
                        case 9:
                          return (
                            m++,
                            (e.next = 12),
                            n.api.getAppRecordName(t.app, m.toString())
                          );
                        case 12:
                          return (
                            (h = e.sent),
                            (v = w(t.app, (0, i.default)(h))),
                            (e.next = 16),
                            n.api.getComponentRootElements(f)
                          );
                        case 16:
                          return (
                            (_ = e.sent),
                            (b = s(_, 1)),
                            (y = b[0]),
                            (E = {
                              id: v,
                              name: h,
                              options: t,
                              backend: n,
                              lastInspectedComponentId: null,
                              instanceMap: new Map(),
                              rootInstance: f,
                              perfGroupIds: new Map(),
                              iframe:
                                o.isBrowser && y && document !== y.ownerDocument
                                  ? null ===
                                      (u =
                                        null === (a = y.ownerDocument) ||
                                        void 0 === a
                                          ? void 0
                                          : a.location) || void 0 === u
                                    ? void 0
                                    : u.pathname
                                  : null,
                              meta:
                                null !== (p = t.meta) && void 0 !== p ? p : {},
                            }),
                            (t.app.__VUE_DEVTOOLS_APP_RECORD__ = E),
                            (k = "".concat(E.id, ":root")),
                            E.instanceMap.set(k, E.rootInstance),
                            (E.rootInstance.__VUE_DEVTOOLS_UID__ = k),
                            (0, d.addBuiltinLayers)(E, r),
                            r.appRecords.push(E),
                            n.options.setupApp && n.options.setupApp(n.api, E),
                            (e.next = 29),
                            n.api.registerApplication(t.app)
                          );
                        case 29:
                          if (
                            (r.bridge.send(o.BridgeEvents.TO_FRONT_APP_ADD, {
                              appRecord: I(E),
                            }),
                            !g.has(t.app))
                          ) {
                            e.next = 48;
                            break;
                          }
                          (O = l(g.get(t.app))), (e.prev = 32), O.s();
                        case 34:
                          if ((x = O.n()).done) {
                            e.next = 40;
                            break;
                          }
                          return (C = x.value), (e.next = 38), C(E);
                        case 38:
                          e.next = 34;
                          break;
                        case 40:
                          e.next = 45;
                          break;
                        case 42:
                          (e.prev = 42), (e.t0 = e.catch(32)), O.e(e.t0);
                        case 45:
                          return (e.prev = 45), O.f(), e.finish(45);
                        case 48:
                          if (null != r.currentAppRecord) {
                            e.next = 51;
                            break;
                          }
                          return (e.next = 51), T(E, r);
                        case 51:
                          e.next = 54;
                          break;
                        case 53:
                          o.SharedData.debugInfo &&
                            console.warn(
                              "[Vue devtools] No root instance found for app, it might have been unmounted",
                              t.app
                            );
                        case 54:
                        case "end":
                          return e.stop();
                      }
                  },
                  e,
                  null,
                  [[32, 42, 45, 48]]
                );
              })
            )).apply(this, arguments);
          }
          function T(e, t) {
            return x.apply(this, arguments);
          }
          function x() {
            return (x = p(
              c().mark(function e(t, n) {
                return c().wrap(function (e) {
                  for (;;)
                    switch ((e.prev = e.next)) {
                      case 0:
                        (n.currentAppRecord = t),
                          (n.currentInspectedComponentId =
                            t.lastInspectedComponentId),
                          n.bridge.send(o.BridgeEvents.TO_FRONT_APP_SELECTED, {
                            id: t.id,
                            lastInspectedComponentId:
                              t.lastInspectedComponentId,
                          });
                      case 3:
                      case "end":
                        return e.stop();
                    }
                }, e);
              })
            )).apply(this, arguments);
          }
          function I(e) {
            return {
              id: e.id,
              name: e.name,
              version: e.options.version,
              iframe: e.iframe,
            };
          }
          (t.registerApp = _), (t.selectApp = T), (t.mapAppRecord = I);
          var C,
            S = new Set();
          function w(e, t) {
            if (null != e.__VUE_DEVTOOLS_APP_RECORD_ID__)
              return e.__VUE_DEVTOOLS_APP_RECORD_ID__;
            var n = null != t ? t : (m++).toString();
            if (t && S.has(n)) {
              for (var r = 1; S.has("".concat(t, "_").concat(r)); ) r++;
              n = "".concat(t, "_").concat(r);
            }
            return S.add(n), (e.__VUE_DEVTOOLS_APP_RECORD_ID__ = n), n;
          }
          function N(e, t) {
            return A.apply(this, arguments);
          }
          function A() {
            return (A = p(
              c().mark(function e(t, n) {
                var r, i;
                return c().wrap(function (e) {
                  for (;;)
                    switch ((e.prev = e.next)) {
                      case 0:
                        if (
                          !(i =
                            null !== (r = t.__VUE_DEVTOOLS_APP_RECORD__) &&
                            void 0 !== r
                              ? r
                              : n.appRecords.find(function (e) {
                                  return e.options.app === t;
                                }))
                        ) {
                          e.next = 3;
                          break;
                        }
                        return e.abrupt("return", i);
                      case 3:
                        if (!t._vueDevtools_hidden_) {
                          e.next = 5;
                          break;
                        }
                        return e.abrupt("return", null);
                      case 5:
                        return e.abrupt(
                          "return",
                          new Promise(function (e, n) {
                            var r = g.get(t),
                              i = !1;
                            r || ((r = []), g.set(t, r));
                            var a = function (t) {
                              i || (clearTimeout(s), e(t));
                            };
                            r.push(a);
                            var s = setTimeout(function () {
                              i = !0;
                              var e = r.indexOf(a);
                              -1 !== e && r.splice(e, 1),
                                o.SharedData.debugInfo &&
                                  console.log(
                                    "Timed out waiting for app record",
                                    t
                                  ),
                                n(
                                  new Error(
                                    "Timed out getting app record for app"
                                  )
                                );
                            }, 6e4);
                          })
                        );
                      case 6:
                      case "end":
                        return e.stop();
                    }
                }, e);
              })
            )).apply(this, arguments);
          }
          function P() {
            return (P = p(
              c().mark(function e(t) {
                var n, r, i, a;
                return c().wrap(function (e) {
                  for (;;)
                    switch ((e.prev = e.next)) {
                      case 0:
                        (n = []), (r = l(t.appRecords));
                        try {
                          for (r.s(); !(i = r.n()).done; )
                            (a = i.value), n.push(a);
                        } catch (e) {
                          r.e(e);
                        } finally {
                          r.f();
                        }
                        t.bridge.send(o.BridgeEvents.TO_FRONT_APP_LIST, {
                          apps: n.map(I),
                        });
                      case 4:
                      case "end":
                        return e.stop();
                    }
                }, e);
              })
            )).apply(this, arguments);
          }
          function D(e, t) {
            try {
              S.delete(e.id);
              var n = t.appRecords.indexOf(e);
              -1 !== n && t.appRecords.splice(n, 1),
                (0, d.removeLayersForApp)(e.options.app, t),
                t.bridge.send(o.BridgeEvents.TO_FRONT_APP_REMOVE, { id: e.id });
            } catch (e) {
              o.SharedData.debugInfo && console.error(e);
            }
          }
          function R() {
            return (R = p(
              c().mark(function e(t, n) {
                var r;
                return c().wrap(
                  function (e) {
                    for (;;)
                      switch ((e.prev = e.next)) {
                        case 0:
                          return (e.prev = 0), (e.next = 3), N(t, n);
                        case 3:
                          (r = e.sent) && D(r, n), (e.next = 10);
                          break;
                        case 7:
                          (e.prev = 7),
                            (e.t0 = e.catch(0)),
                            o.SharedData.debugInfo && console.error(e.t0);
                        case 10:
                        case "end":
                          return e.stop();
                      }
                  },
                  e,
                  null,
                  [[0, 7]]
                );
              })
            )).apply(this, arguments);
          }
          (t.getAppRecordId = w),
            (t.getAppRecord = N),
            (t.waitForAppsRegistration = function () {
              return v.queue(
                "waitForAppsRegistrationNoop",
                p(
                  c().mark(function e() {
                    return c().wrap(function (e) {
                      for (;;)
                        switch ((e.prev = e.next)) {
                          case 0:
                          case "end":
                            return e.stop();
                        }
                    }, e);
                  })
                )
              );
            }),
            (t.sendApps = function (e) {
              return P.apply(this, arguments);
            }),
            (t.removeApp = function (e, t) {
              return R.apply(this, arguments);
            }),
            (t._legacy_getAndRegisterApps = function e(t) {
              var n =
                arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
              setTimeout(function () {
                try {
                  n &&
                    t.appRecords.forEach(function (e) {
                      e.meta.Vue && D(e, t);
                    });
                  var r = (0, u.scan)();
                  clearTimeout(C),
                    r.length ||
                      (C = setTimeout(function () {
                        return e(t);
                      }, 1e3)),
                    r.forEach(function (e) {
                      var n = h.hook.Vue;
                      _(
                        {
                          app: e,
                          types: {},
                          version: null == n ? void 0 : n.version,
                          meta: { Vue: n },
                        },
                        t
                      );
                    });
                } catch (e) {
                  console.error("Error scanning for legacy apps:"),
                    console.error(e);
                }
              }, 0);
            });
        },
      "../app-backend-core/lib/backend.js":
        /*!******************************************!*\
      !*** ../app-backend-core/lib/backend.js ***!
      \******************************************/
        function (e, t, n) {
          Object.defineProperty(t, "__esModule", { value: !0 }),
            (t.getBackend = t.availableBackends = void 0);
          var r = n(
              /*! @vue-devtools/app-backend-api */ "../app-backend-api/lib/index.js"
            ),
            o = n(
              /*! @vue-devtools/app-backend-vue3 */ "../app-backend-vue3/lib/index.js"
            ),
            i = n(/*! ./perf */ "../app-backend-core/lib/perf.js");
          t.availableBackends = [o.backend];
          var a = new Map();
          t.getBackend = function (e, t) {
            var n;
            return (
              a.has(e)
                ? (n = a.get(e))
                : ((n = (0, r.createBackend)(e, t)),
                  (0, i.handleAddPerformanceTag)(n, t),
                  a.set(e, n),
                  t.backends.push(n)),
              n
            );
          };
        },
      "../app-backend-core/lib/component-pick.js":
        /*!*************************************************!*\
      !*** ../app-backend-core/lib/component-pick.js ***!
      \*************************************************/
        function (e, t, n) {
          Object.defineProperty(t, "__esModule", { value: !0 });
          var r = n(
              /*! @vue-devtools/shared-utils */ "../shared-utils/lib/index.js"
            ),
            o = n(
              /*! ./highlighter */ "../app-backend-core/lib/highlighter.js"
            ),
            i = (function () {
              return f(
                function e(t) {
                  d(this, e), (this.ctx = t), this.bindMethods();
                },
                [
                  {
                    key: "startSelecting",
                    value: function () {
                      r.isBrowser &&
                        (window.addEventListener(
                          "mouseover",
                          this.elementMouseOver,
                          !0
                        ),
                        window.addEventListener(
                          "click",
                          this.elementClicked,
                          !0
                        ),
                        window.addEventListener(
                          "mouseout",
                          this.cancelEvent,
                          !0
                        ),
                        window.addEventListener(
                          "mouseenter",
                          this.cancelEvent,
                          !0
                        ),
                        window.addEventListener(
                          "mouseleave",
                          this.cancelEvent,
                          !0
                        ),
                        window.addEventListener(
                          "mousedown",
                          this.cancelEvent,
                          !0
                        ),
                        window.addEventListener(
                          "mouseup",
                          this.cancelEvent,
                          !0
                        ));
                    },
                  },
                  {
                    key: "stopSelecting",
                    value: function () {
                      r.isBrowser &&
                        (window.removeEventListener(
                          "mouseover",
                          this.elementMouseOver,
                          !0
                        ),
                        window.removeEventListener(
                          "click",
                          this.elementClicked,
                          !0
                        ),
                        window.removeEventListener(
                          "mouseout",
                          this.cancelEvent,
                          !0
                        ),
                        window.removeEventListener(
                          "mouseenter",
                          this.cancelEvent,
                          !0
                        ),
                        window.removeEventListener(
                          "mouseleave",
                          this.cancelEvent,
                          !0
                        ),
                        window.removeEventListener(
                          "mousedown",
                          this.cancelEvent,
                          !0
                        ),
                        window.removeEventListener(
                          "mouseup",
                          this.cancelEvent,
                          !0
                        ),
                        (0, o.unHighlight)());
                    },
                  },
                  {
                    key: "elementMouseOver",
                    value:
                      ((n = p(
                        c().mark(function e(t) {
                          var n;
                          return c().wrap(
                            function (e) {
                              for (;;)
                                switch ((e.prev = e.next)) {
                                  case 0:
                                    if (
                                      (this.cancelEvent(t), !(n = t.target))
                                    ) {
                                      e.next = 5;
                                      break;
                                    }
                                    return (
                                      (e.next = 5),
                                      this.selectElementComponent(n)
                                    );
                                  case 5:
                                    (0, o.unHighlight)(),
                                      this.selectedInstance &&
                                        (0, o.highlight)(
                                          this.selectedInstance,
                                          this.selectedBackend,
                                          this.ctx
                                        );
                                  case 7:
                                  case "end":
                                    return e.stop();
                                }
                            },
                            e,
                            this
                          );
                        })
                      )),
                      function (e) {
                        return n.apply(this, arguments);
                      }),
                  },
                  {
                    key: "selectElementComponent",
                    value:
                      ((t = p(
                        c().mark(function e(t) {
                          var n, r, o, i;
                          return c().wrap(
                            function (e) {
                              for (;;)
                                switch ((e.prev = e.next)) {
                                  case 0:
                                    (n = l(this.ctx.backends)),
                                      (e.prev = 1),
                                      n.s();
                                  case 3:
                                    if ((r = n.n()).done) {
                                      e.next = 14;
                                      break;
                                    }
                                    return (
                                      (o = r.value),
                                      (e.next = 7),
                                      o.api.getElementComponent(t)
                                    );
                                  case 7:
                                    if (!(i = e.sent)) {
                                      e.next = 12;
                                      break;
                                    }
                                    return (
                                      (this.selectedInstance = i),
                                      (this.selectedBackend = o),
                                      e.abrupt("return")
                                    );
                                  case 12:
                                    e.next = 3;
                                    break;
                                  case 14:
                                    e.next = 19;
                                    break;
                                  case 16:
                                    (e.prev = 16),
                                      (e.t0 = e.catch(1)),
                                      n.e(e.t0);
                                  case 19:
                                    return (e.prev = 19), n.f(), e.finish(19);
                                  case 22:
                                    (this.selectedInstance = null),
                                      (this.selectedBackend = null);
                                  case 24:
                                  case "end":
                                    return e.stop();
                                }
                            },
                            e,
                            this,
                            [[1, 16, 19, 22]]
                          );
                        })
                      )),
                      function (e) {
                        return t.apply(this, arguments);
                      }),
                  },
                  {
                    key: "elementClicked",
                    value:
                      ((e = p(
                        c().mark(function e(t) {
                          var n;
                          return c().wrap(
                            function (e) {
                              for (;;)
                                switch ((e.prev = e.next)) {
                                  case 0:
                                    if (
                                      (this.cancelEvent(t),
                                      !this.selectedInstance ||
                                        !this.selectedBackend)
                                    ) {
                                      e.next = 8;
                                      break;
                                    }
                                    return (
                                      (e.next = 4),
                                      this.selectedBackend.api.walkComponentParents(
                                        this.selectedInstance
                                      )
                                    );
                                  case 4:
                                    (n = e.sent),
                                      this.ctx.bridge.send(
                                        r.BridgeEvents.TO_FRONT_COMPONENT_PICK,
                                        {
                                          id: this.selectedInstance
                                            .__VUE_DEVTOOLS_UID__,
                                          parentIds: n.map(function (e) {
                                            return e.__VUE_DEVTOOLS_UID__;
                                          }),
                                        }
                                      ),
                                      (e.next = 9);
                                    break;
                                  case 8:
                                    this.ctx.bridge.send(
                                      r.BridgeEvents
                                        .TO_FRONT_COMPONENT_PICK_CANCELED,
                                      null
                                    );
                                  case 9:
                                    this.stopSelecting();
                                  case 10:
                                  case "end":
                                    return e.stop();
                                }
                            },
                            e,
                            this
                          );
                        })
                      )),
                      function (t) {
                        return e.apply(this, arguments);
                      }),
                  },
                  {
                    key: "cancelEvent",
                    value: function (e) {
                      e.stopImmediatePropagation(), e.preventDefault();
                    },
                  },
                  {
                    key: "bindMethods",
                    value: function () {
                      (this.startSelecting = this.startSelecting.bind(this)),
                        (this.stopSelecting = this.stopSelecting.bind(this)),
                        (this.elementMouseOver =
                          this.elementMouseOver.bind(this)),
                        (this.elementClicked = this.elementClicked.bind(this));
                    },
                  },
                ]
              );
              var e, t, n;
            })();
          t.default = i;
        },
      "../app-backend-core/lib/component.js":
        /*!********************************************!*\
      !*** ../app-backend-core/lib/component.js ***!
      \********************************************/
        function (e, t, n) {
          Object.defineProperty(t, "__esModule", { value: !0 }),
            (t.sendComponentUpdateTracking =
              t.refreshComponentTreeSearch =
              t.getComponentInstance =
              t.getComponentId =
              t.editComponentState =
              t.sendEmptyComponentData =
              t.markSelectedInstance =
              t.sendSelectedComponentData =
              t.sendComponentTreeData =
                void 0);
          var r = n(
              /*! @vue-devtools/shared-utils */ "../shared-utils/lib/index.js"
            ),
            o = n(
              /*! @vue-devtools/app-backend-api */ "../app-backend-api/lib/index.js"
            ),
            i = n(/*! ./app */ "../app-backend-core/lib/app.js"),
            a = [];
          function s(e, t) {
            return u.apply(this, arguments);
          }
          function u() {
            return (u = p(
              c().mark(function e(t, n) {
                var i,
                  a,
                  s,
                  u,
                  l,
                  p,
                  d,
                  f = arguments;
                return c().wrap(function (e) {
                  for (;;)
                    switch ((e.prev = e.next)) {
                      case 0:
                        if (
                          ((i = f.length > 2 && void 0 !== f[2] ? f[2] : ""),
                          (a = f.length > 3 && void 0 !== f[3] ? f[3] : null),
                          (s = f.length > 4 && void 0 !== f[4] && f[4]),
                          (u = f.length > 5 ? f[5] : void 0),
                          n && t === u.currentAppRecord)
                        ) {
                          e.next = 6;
                          break;
                        }
                        return e.abrupt("return");
                      case 6:
                        if (
                          "_root" === n ||
                          !u.currentAppRecord.backend.options.features.includes(
                            o.BuiltinBackendFeature.FLUSH
                          )
                        ) {
                          e.next = 8;
                          break;
                        }
                        return e.abrupt("return");
                      case 8:
                        if ((l = g(t, n, u))) {
                          e.next = 13;
                          break;
                        }
                        u.bridge.send(r.BridgeEvents.TO_FRONT_COMPONENT_TREE, {
                          instanceId: n,
                          treeData: null,
                          notFound: !0,
                        }),
                          (e.next = 20);
                        break;
                      case 13:
                        return (
                          i && (i = i.toLowerCase()),
                          null == a &&
                            (a = l === u.currentAppRecord.rootInstance ? 2 : 1),
                          (e.next = 17),
                          t.backend.api.walkComponentTree(l, a, i, s)
                        );
                      case 17:
                        (p = e.sent),
                          (d = {
                            instanceId: n,
                            treeData: (0, r.stringify)(p),
                          }),
                          u.bridge.send(
                            r.BridgeEvents.TO_FRONT_COMPONENT_TREE,
                            d
                          );
                      case 20:
                      case "end":
                        return e.stop();
                    }
                }, e);
              })
            )).apply(this, arguments);
          }
          function l(e, t, n) {
            return d.apply(this, arguments);
          }
          function d() {
            return (d = p(
              c().mark(function e(t, n, o) {
                var i, s, u, l, p;
                return c().wrap(function (e) {
                  for (;;)
                    switch ((e.prev = e.next)) {
                      case 0:
                        if (n && t === o.currentAppRecord) {
                          e.next = 2;
                          break;
                        }
                        return e.abrupt("return");
                      case 2:
                        if ((i = g(t, n, o))) {
                          e.next = 7;
                          break;
                        }
                        h(n, o), (e.next = 22);
                        break;
                      case 7:
                        if (
                          "undefined" != typeof window &&
                          (((s = window).$vm = i), a[0] !== i)
                        ) {
                          for (
                            a.length >= 10 && a.pop(), u = a.length;
                            u > 0;
                            u--
                          )
                            s["$vm".concat(u)] = a[u] = a[u - 1];
                          s.$vm0 = a[0] = i;
                        }
                        return (
                          r.SharedData.debugInfo &&
                            console.log("[DEBUG] inspect", i),
                          (e.next = 11),
                          t.backend.api.walkComponentParents(i)
                        );
                      case 11:
                        return (
                          (l = e.sent),
                          (e.t0 = n),
                          (e.next = 15),
                          t.backend.api.inspectComponent(
                            i,
                            o.currentAppRecord.options.app
                          )
                        );
                      case 15:
                        (e.t1 = e.sent),
                          (e.t2 = l.map(function (e) {
                            return e.__VUE_DEVTOOLS_UID__;
                          })),
                          ((p = {
                            instanceId: e.t0,
                            data: e.t1,
                            parentIds: e.t2,
                          }).data.isSetup = !!i.type.setup && !i.type.render),
                          (p.data = (0, r.stringify)(p.data)),
                          o.bridge.send(
                            r.BridgeEvents.TO_FRONT_COMPONENT_SELECTED_DATA,
                            p
                          ),
                          f(n, o);
                      case 22:
                      case "end":
                        return e.stop();
                    }
                }, e);
              })
            )).apply(this, arguments);
          }
          function f(e, t) {
            (t.currentInspectedComponentId = e),
              (t.currentAppRecord.lastInspectedComponentId = e);
          }
          function h(e, t) {
            t.bridge.send(r.BridgeEvents.TO_FRONT_COMPONENT_SELECTED_DATA, {
              instanceId: e,
              data: null,
            });
          }
          function v() {
            return (v = p(
              c().mark(function e(t, n, o, i, a) {
                var s;
                return c().wrap(function (e) {
                  for (;;)
                    switch ((e.prev = e.next)) {
                      case 0:
                        if (t) {
                          e.next = 2;
                          break;
                        }
                        return e.abrupt("return");
                      case 2:
                        if (!(s = g(a.currentAppRecord, t, a))) {
                          e.next = 9;
                          break;
                        }
                        return (
                          "value" in i &&
                            null != i.value &&
                            (i.value = (0, r.parse)(i.value, !0)),
                          (e.next = 7),
                          a.currentAppRecord.backend.api.editComponentState(
                            s,
                            n,
                            o,
                            i,
                            a.currentAppRecord.options.app
                          )
                        );
                      case 7:
                        return (e.next = 9), l(a.currentAppRecord, t, a);
                      case 9:
                      case "end":
                        return e.stop();
                    }
                }, e);
              })
            )).apply(this, arguments);
          }
          function m() {
            return (m = p(
              c().mark(function e(t, n, o, a) {
                var s, u;
                return c().wrap(
                  function (e) {
                    for (;;)
                      switch ((e.prev = e.next)) {
                        case 0:
                          if (((e.prev = 0), !o.__VUE_DEVTOOLS_UID__)) {
                            e.next = 3;
                            break;
                          }
                          return e.abrupt("return", o.__VUE_DEVTOOLS_UID__);
                        case 3:
                          return (e.next = 5), (0, i.getAppRecord)(t, a);
                        case 5:
                          if ((s = e.sent)) {
                            e.next = 8;
                            break;
                          }
                          return e.abrupt("return", null);
                        case 8:
                          return (
                            (u = s.rootInstance === o),
                            e.abrupt(
                              "return",
                              "".concat(s.id, ":").concat(u ? "root" : n)
                            )
                          );
                        case 12:
                          return (
                            (e.prev = 12),
                            (e.t0 = e.catch(0)),
                            r.SharedData.debugInfo && console.error(e.t0),
                            e.abrupt("return", null)
                          );
                        case 16:
                        case "end":
                          return e.stop();
                      }
                  },
                  e,
                  null,
                  [[0, 12]]
                );
              })
            )).apply(this, arguments);
          }
          function g(e, t, n) {
            "_root" === t && (t = "".concat(e.id, ":root"));
            var o = e.instanceMap.get(t);
            return (
              !o &&
                r.SharedData.debugInfo &&
                console.warn("Instance uid=".concat(t, " not found")),
              o
            );
          }
          function _() {
            return (_ = p(
              c().mark(function e(t) {
                return c().wrap(function (e) {
                  for (;;)
                    switch ((e.prev = e.next)) {
                      case 0:
                        if (t.currentAppRecord.componentFilter) {
                          e.next = 2;
                          break;
                        }
                        return e.abrupt("return");
                      case 2:
                        return (
                          (e.next = 4),
                          s(
                            t.currentAppRecord,
                            "_root",
                            t.currentAppRecord.componentFilter,
                            null,
                            !1,
                            t
                          )
                        );
                      case 4:
                      case "end":
                        return e.stop();
                    }
                }, e);
              })
            )).apply(this, arguments);
          }
          function b() {
            return (b = p(
              c().mark(function e(t, n) {
                var o;
                return c().wrap(function (e) {
                  for (;;)
                    switch ((e.prev = e.next)) {
                      case 0:
                        if (t) {
                          e.next = 2;
                          break;
                        }
                        return e.abrupt("return");
                      case 2:
                        (o = { instanceId: t, time: Date.now() }),
                          n.bridge.send(
                            r.BridgeEvents.TO_FRONT_COMPONENT_UPDATED,
                            o
                          );
                      case 4:
                      case "end":
                        return e.stop();
                    }
                }, e);
              })
            )).apply(this, arguments);
          }
          (t.sendComponentTreeData = s),
            (t.sendSelectedComponentData = l),
            (t.markSelectedInstance = f),
            (t.sendEmptyComponentData = h),
            (t.editComponentState = function (e, t, n, r, o) {
              return v.apply(this, arguments);
            }),
            (t.getComponentId = function (e, t, n, r) {
              return m.apply(this, arguments);
            }),
            (t.getComponentInstance = g),
            (t.refreshComponentTreeSearch = function (e) {
              return _.apply(this, arguments);
            }),
            (t.sendComponentUpdateTracking = function (e, t) {
              return b.apply(this, arguments);
            });
        },
      "../app-backend-core/lib/flash.js":
        /*!****************************************!*\
      !*** ../app-backend-core/lib/flash.js ***!
      \****************************************/
        function (e, t) {
          function n() {
            return (n = p(
              c().mark(function e(t, n) {
                var r, o;
                return c().wrap(function (e) {
                  for (;;)
                    switch ((e.prev = e.next)) {
                      case 0:
                        return (e.next = 2), n.api.getComponentBounds(t);
                      case 2:
                        (r = e.sent) &&
                          ((o = t.__VUE_DEVTOOLS_FLASH) ||
                            ((o = document.createElement("div")),
                            (t.__VUE_DEVTOOLS_FLASH = o),
                            (o.style.border =
                              "2px rgba(65, 184, 131, 0.7) solid"),
                            (o.style.position = "fixed"),
                            (o.style.zIndex = "99999999999998"),
                            (o.style.pointerEvents = "none"),
                            (o.style.borderRadius = "3px"),
                            (o.style.boxSizing = "border-box"),
                            document.body.appendChild(o)),
                          (o.style.opacity = "1"),
                          (o.style.transition = null),
                          (o.style.width = Math.round(r.width) + "px"),
                          (o.style.height = Math.round(r.height) + "px"),
                          (o.style.left = Math.round(r.left) + "px"),
                          (o.style.top = Math.round(r.top) + "px"),
                          requestAnimationFrame(function () {
                            (o.style.transition = "opacity 1s"),
                              (o.style.opacity = "0");
                          }),
                          clearTimeout(o._timer),
                          (o._timer = setTimeout(function () {
                            document.body.removeChild(o),
                              (t.__VUE_DEVTOOLS_FLASH = null);
                          }, 1e3)));
                      case 4:
                      case "end":
                        return e.stop();
                    }
                }, e);
              })
            )).apply(this, arguments);
          }
          Object.defineProperty(t, "__esModule", { value: !0 }),
            (t.flashComponent = void 0),
            (t.flashComponent = function (e, t) {
              return n.apply(this, arguments);
            });
        },
      "../app-backend-core/lib/global-hook.js":
        /*!**********************************************!*\
      !*** ../app-backend-core/lib/global-hook.js ***!
      \**********************************************/
        function (e, t, n) {
          Object.defineProperty(t, "__esModule", { value: !0 }),
            (t.hook = void 0);
          var r = n(
            /*! @vue-devtools/shared-utils */ "../shared-utils/lib/index.js"
          );
          t.hook = r.target.__VUE_DEVTOOLS_GLOBAL_HOOK__;
        },
      "../app-backend-core/lib/highlighter.js":
        /*!**********************************************!*\
      !*** ../app-backend-core/lib/highlighter.js ***!
      \**********************************************/
        function (e, t, n) {
          Object.defineProperty(t, "__esModule", { value: !0 }),
            (t.unHighlight = t.highlight = void 0);
          var r,
            o,
            i,
            a = n(
              /*! @vue-devtools/shared-utils */ "../shared-utils/lib/index.js"
            );
          function s() {
            !r &&
              a.isBrowser &&
              (((r = document.createElement("div")).style.backgroundColor =
                "rgba(65, 184, 131, 0.35)"),
              (r.style.position = "fixed"),
              (r.style.zIndex = "99999999999998"),
              (r.style.pointerEvents = "none"),
              (r.style.borderRadius = "3px"),
              ((o = document.createElement("div")).style.position = "fixed"),
              (o.style.zIndex = "99999999999999"),
              (o.style.pointerEvents = "none"),
              (o.style.backgroundColor = "white"),
              (o.style.fontFamily = "monospace"),
              (o.style.fontSize = "11px"),
              (o.style.padding = "4px 8px"),
              (o.style.borderRadius = "3px"),
              (o.style.color = "#333"),
              (o.style.textAlign = "center"),
              (o.style.border = "rgba(65, 184, 131, 0.5) 1px solid"),
              (o.style.backgroundClip = "padding-box"));
          }
          var u,
            l = new (n(
              /*! ./util/queue */ "../app-backend-core/lib/util/queue.js"
            ).JobQueue)();
          function d() {
            return (d = p(
              c().mark(function e(t, n, r) {
                return c().wrap(function (e) {
                  for (;;)
                    switch ((e.prev = e.next)) {
                      case 0:
                        return (
                          (e.next = 2),
                          l.queue(
                            "highlight",
                            p(
                              c().mark(function e() {
                                var o, a, u, l, p, d, f;
                                return c().wrap(function (e) {
                                  for (;;)
                                    switch ((e.prev = e.next)) {
                                      case 0:
                                        if (t) {
                                          e.next = 2;
                                          break;
                                        }
                                        return e.abrupt("return");
                                      case 2:
                                        return (
                                          (e.next = 4),
                                          n.api.getComponentBounds(t)
                                        );
                                      case 4:
                                        if (!(o = e.sent)) {
                                          e.next = 35;
                                          break;
                                        }
                                        return (
                                          s(),
                                          (e.next = 9),
                                          n.api.getComponentName(t)
                                        );
                                      case 9:
                                        if (((e.t0 = e.sent), e.t0)) {
                                          e.next = 12;
                                          break;
                                        }
                                        e.t0 = "Anonymous";
                                      case 12:
                                        return (
                                          (a = e.t0),
                                          ((u =
                                            document.createElement(
                                              "span"
                                            )).style.opacity = "0.6"),
                                          (u.innerText = "<"),
                                          ((l =
                                            document.createElement(
                                              "span"
                                            )).style.fontWeight = "bold"),
                                          (l.style.color = "#09ab56"),
                                          (l.innerText = a),
                                          ((p =
                                            document.createElement(
                                              "span"
                                            )).style.opacity = "0.6"),
                                          (p.innerText = ">"),
                                          ((d =
                                            document.createElement(
                                              "span"
                                            )).style.opacity = "0.5"),
                                          (d.style.marginLeft = "6px"),
                                          d.appendChild(
                                            document.createTextNode(
                                              (
                                                Math.round(100 * o.width) / 100
                                              ).toString()
                                            )
                                          ),
                                          ((f =
                                            document.createElement(
                                              "span"
                                            )).style.marginLeft =
                                            f.style.marginRight =
                                              "2px"),
                                          (f.innerText = "×"),
                                          d.appendChild(f),
                                          d.appendChild(
                                            document.createTextNode(
                                              (
                                                Math.round(100 * o.height) / 100
                                              ).toString()
                                            )
                                          ),
                                          (i = t),
                                          (e.next = 35),
                                          h(o, [u, l, p, d])
                                        );
                                      case 35:
                                        b(n, r);
                                      case 36:
                                      case "end":
                                        return e.stop();
                                    }
                                }, e);
                              })
                            )
                          )
                        );
                      case 2:
                      case "end":
                        return e.stop();
                    }
                }, e);
              })
            )).apply(this, arguments);
          }
          function f() {
            return (f = p(
              c().mark(function e() {
                return c().wrap(function (e) {
                  for (;;)
                    switch ((e.prev = e.next)) {
                      case 0:
                        return (
                          (e.next = 2),
                          l.queue(
                            "unHighlight",
                            p(
                              c().mark(function e() {
                                var t, n;
                                return c().wrap(function (e) {
                                  for (;;)
                                    switch ((e.prev = e.next)) {
                                      case 0:
                                        null ===
                                          (t =
                                            null == r
                                              ? void 0
                                              : r.parentNode) ||
                                          void 0 === t ||
                                          t.removeChild(r),
                                          null ===
                                            (n =
                                              null == o
                                                ? void 0
                                                : o.parentNode) ||
                                            void 0 === n ||
                                            n.removeChild(o),
                                          (i = null),
                                          y();
                                      case 4:
                                      case "end":
                                        return e.stop();
                                    }
                                }, e);
                              })
                            )
                          )
                        );
                      case 2:
                      case "end":
                        return e.stop();
                    }
                }, e);
              })
            )).apply(this, arguments);
          }
          function h(e) {
            var t =
              arguments.length > 1 && void 0 !== arguments[1]
                ? arguments[1]
                : null;
            a.isBrowser &&
              t.length &&
              (v(e),
              document.body.appendChild(r),
              (o.innerHTML = ""),
              t.forEach(function (e) {
                return o.appendChild(e);
              }),
              document.body.appendChild(o),
              m(e));
          }
          function v(e) {
            var t = e.width,
              n = void 0 === t ? 0 : t,
              o = e.height,
              i = void 0 === o ? 0 : o,
              a = e.top,
              s = void 0 === a ? 0 : a,
              c = e.left,
              u = void 0 === c ? 0 : c;
            (r.style.width = Math.round(n) + "px"),
              (r.style.height = Math.round(i) + "px"),
              (r.style.left = Math.round(u) + "px"),
              (r.style.top = Math.round(s) + "px");
          }
          function m(e) {
            var t = e.height,
              n = void 0 === t ? 0 : t,
              r = e.top,
              i = void 0 === r ? 0 : r,
              a = e.left,
              s = void 0 === a ? 0 : a,
              c = o.offsetWidth,
              u = o.offsetHeight,
              l = s;
            l < 0
              ? (l = 0)
              : l + c > window.innerWidth && (l = window.innerWidth - c);
            var p = i - u - 2;
            p < 0 && (p = i + n + 2),
              p < 0
                ? (p = 0)
                : p + u > window.innerHeight && (p = window.innerHeight - u),
              (o.style.left = ~~l + "px"),
              (o.style.top = ~~p + "px");
          }
          function g(e, t) {
            return _.apply(this, arguments);
          }
          function _() {
            return (_ = p(
              c().mark(function e(t, n) {
                var r, a;
                return c().wrap(function (e) {
                  for (;;)
                    switch ((e.prev = e.next)) {
                      case 0:
                        if (!i) {
                          e.next = 5;
                          break;
                        }
                        return (e.next = 3), t.api.getComponentBounds(i);
                      case 3:
                        (r = e.sent) &&
                          ((a = o.children.item(3)),
                          (a.childNodes[0].textContent = (
                            Math.round(100 * r.width) / 100
                          ).toString()),
                          (a.childNodes[2].textContent = (
                            Math.round(100 * r.height) / 100
                          ).toString()),
                          v(r),
                          m(r));
                      case 5:
                      case "end":
                        return e.stop();
                    }
                }, e);
              })
            )).apply(this, arguments);
          }
          function b(e, t) {
            y(),
              (u = setInterval(function () {
                l.queue(
                  "updateOverlay",
                  p(
                    c().mark(function n() {
                      return c().wrap(function (n) {
                        for (;;)
                          switch ((n.prev = n.next)) {
                            case 0:
                              return (n.next = 2), g(e, t);
                            case 2:
                            case "end":
                              return n.stop();
                          }
                      }, n);
                    })
                  )
                );
              }, 1e3 / 30));
          }
          function y() {
            clearInterval(u);
          }
          (t.highlight = function (e, t, n) {
            return d.apply(this, arguments);
          }),
            (t.unHighlight = function () {
              return f.apply(this, arguments);
            });
        },
      "../app-backend-core/lib/index.js":
        /*!****************************************!*\
      !*** ../app-backend-core/lib/index.js ***!
      \****************************************/
        function (e, t, n) {
          var r,
            o,
            i =
              (this && this.__importDefault) ||
              function (e) {
                return e && e.__esModule ? e : { default: e };
              };
          Object.defineProperty(t, "__esModule", { value: !0 }),
            (t.initBackend = void 0);
          var l = n(
              /*! @vue-devtools/app-backend-api */ "../app-backend-api/lib/index.js"
            ),
            d = n(
              /*! @vue-devtools/shared-utils */ "../shared-utils/lib/index.js"
            ),
            f = i(
              n(/*! lodash/debounce */ "../../node_modules/lodash/debounce.js")
            ),
            h =
              (i(
                n(
                  /*! lodash/throttle */ "../../node_modules/lodash/throttle.js"
                )
              ),
              n(/*! ./global-hook */ "../app-backend-core/lib/global-hook.js")),
            v = n(
              /*! ./util/subscriptions */ "../app-backend-core/lib/util/subscriptions.js"
            ),
            m = n(
              /*! ./highlighter */ "../app-backend-core/lib/highlighter.js"
            ),
            g = n(/*! ./timeline */ "../app-backend-core/lib/timeline.js"),
            _ = i(
              n(
                /*! ./component-pick */ "../app-backend-core/lib/component-pick.js"
              )
            ),
            b = n(/*! ./component */ "../app-backend-core/lib/component.js"),
            y = n(/*! ./plugin */ "../app-backend-core/lib/plugin.js"),
            E = n(/*! @vue/devtools-api */ "../api/lib/esm/index.js"),
            k = n(/*! ./app */ "../app-backend-core/lib/app.js"),
            O = n(/*! ./inspector */ "../app-backend-core/lib/inspector.js"),
            T = n(
              /*! ./timeline-screenshot */ "../app-backend-core/lib/timeline-screenshot.js"
            ),
            x = n(/*! ./perf */ "../app-backend-core/lib/perf.js"),
            I = n(
              /*! ./page-config */ "../app-backend-core/lib/page-config.js"
            ),
            C = n(
              /*! ./timeline-marker */ "../app-backend-core/lib/timeline-marker.js"
            ),
            S = n(/*! ./flash.js */ "../app-backend-core/lib/flash.js"),
            w =
              null !== (r = d.target.__vdevtools_ctx) && void 0 !== r
                ? r
                : null,
            N =
              null !== (o = d.target.__vdevtools_connected) &&
              void 0 !== o &&
              o;
          function A() {
            return (A = p(
              c().mark(function e(t) {
                return c().wrap(function (e) {
                  for (;;)
                    switch ((e.prev = e.next)) {
                      case 0:
                        return (
                          (e.next = 2),
                          (0, d.initSharedData)({ bridge: t, persist: !1 })
                        );
                      case 2:
                        (d.SharedData.isBrowser = d.isBrowser),
                          (0, I.initOnPageConfig)(),
                          N
                            ? ((w.bridge = t),
                              R(),
                              w.bridge.send(
                                d.BridgeEvents.TO_FRONT_RECONNECTED
                              ))
                            : ((w = d.target.__vdevtools_ctx =
                                (0, l.createBackendContext)({
                                  bridge: t,
                                  hook: h.hook,
                                })),
                              (d.SharedData.legacyApps = !1),
                              h.hook.Vue &&
                                (P(),
                                (0, k._legacy_getAndRegisterApps)(w, !0),
                                (d.SharedData.legacyApps = !0)),
                              h.hook.on(d.HookEvents.INIT, function () {
                                (0, k._legacy_getAndRegisterApps)(w, !0),
                                  (d.SharedData.legacyApps = !0);
                              }),
                              h.hook.on(
                                d.HookEvents.APP_ADD,
                                (function () {
                                  var e = p(
                                    c().mark(function e(t) {
                                      return c().wrap(function (e) {
                                        for (;;)
                                          switch ((e.prev = e.next)) {
                                            case 0:
                                              return (
                                                (e.next = 2),
                                                (0, k.registerApp)(t, w)
                                              );
                                            case 2:
                                              P();
                                            case 3:
                                            case "end":
                                              return e.stop();
                                          }
                                      }, e);
                                    })
                                  );
                                  return function (t) {
                                    return e.apply(this, arguments);
                                  };
                                })()
                              ),
                              h.hook.apps.length &&
                                h.hook.apps.forEach(function (e) {
                                  (0, k.registerApp)(e, w), P();
                                }));
                      case 5:
                      case "end":
                        return e.stop();
                    }
                }, e);
              })
            )).apply(this, arguments);
          }
          function P() {
            return D.apply(this, arguments);
          }
          function D() {
            return (D = p(
              c().mark(function e() {
                var t, n;
                return c().wrap(
                  function (e) {
                    for (;;)
                      switch ((e.prev = e.next)) {
                        case 0:
                          if (!N) {
                            e.next = 2;
                            break;
                          }
                          return e.abrupt("return");
                        case 2:
                          return (
                            (N = d.target.__vdevtools_connected = !0),
                            (e.next = 5),
                            (0, k.waitForAppsRegistration)()
                          );
                        case 5:
                          return (
                            R(),
                            (w.currentTab = d.BuiltinTabs.COMPONENTS),
                            h.hook.on(
                              d.HookEvents.APP_UNMOUNT,
                              (function () {
                                var e = p(
                                  c().mark(function e(t) {
                                    return c().wrap(function (e) {
                                      for (;;)
                                        switch ((e.prev = e.next)) {
                                          case 0:
                                            return (
                                              (e.next = 2),
                                              (0, k.removeApp)(t, w)
                                            );
                                          case 2:
                                          case "end":
                                            return e.stop();
                                        }
                                    }, e);
                                  })
                                );
                                return function (t) {
                                  return e.apply(this, arguments);
                                };
                              })()
                            ),
                            (t = (function () {
                              var e = p(
                                c().mark(function e(t, n) {
                                  return c().wrap(
                                    function (e) {
                                      for (;;)
                                        switch ((e.prev = e.next)) {
                                          case 0:
                                            if (
                                              ((e.prev = 0),
                                              !n ||
                                                !(0, v.isSubscribed)(
                                                  d.BridgeSubscriptions
                                                    .SELECTED_COMPONENT_DATA,
                                                  function (e) {
                                                    return (
                                                      e.payload.instanceId === n
                                                    );
                                                  }
                                                ))
                                            ) {
                                              e.next = 4;
                                              break;
                                            }
                                            return (
                                              (e.next = 4),
                                              (0, b.sendSelectedComponentData)(
                                                t,
                                                n,
                                                w
                                              )
                                            );
                                          case 4:
                                            if (
                                              !(0, v.isSubscribed)(
                                                d.BridgeSubscriptions
                                                  .COMPONENT_TREE,
                                                function (e) {
                                                  return (
                                                    e.payload.instanceId === n
                                                  );
                                                }
                                              )
                                            ) {
                                              e.next = 7;
                                              break;
                                            }
                                            return (
                                              (e.next = 7),
                                              (0, b.sendComponentTreeData)(
                                                t,
                                                n,
                                                t.componentFilter,
                                                0,
                                                !1,
                                                w
                                              )
                                            );
                                          case 7:
                                            e.next = 12;
                                            break;
                                          case 9:
                                            (e.prev = 9),
                                              (e.t0 = e.catch(0)),
                                              d.SharedData.debugInfo &&
                                                console.error(e.t0);
                                          case 12:
                                          case "end":
                                            return e.stop();
                                        }
                                    },
                                    e,
                                    null,
                                    [[0, 9]]
                                  );
                                })
                              );
                              return function (t, n) {
                                return e.apply(this, arguments);
                              };
                            })()),
                            h.hook.on(
                              d.HookEvents.COMPONENT_UPDATED,
                              (function () {
                                var e = p(
                                  c().mark(function e(n, r, o, i) {
                                    var a, s;
                                    return c().wrap(
                                      function (e) {
                                        for (;;)
                                          switch ((e.prev = e.next)) {
                                            case 0:
                                              if (
                                                ((e.prev = 0),
                                                n &&
                                                  ("number" == typeof r || r) &&
                                                  i)
                                              ) {
                                                e.next = 3;
                                                break;
                                              }
                                              return e.abrupt("return");
                                            case 3:
                                              if (!n || null == r) {
                                                e.next = 12;
                                                break;
                                              }
                                              return (
                                                (e.next = 6),
                                                (0, b.getComponentId)(
                                                  n,
                                                  r,
                                                  i,
                                                  w
                                                )
                                              );
                                            case 6:
                                              return (
                                                (a = e.sent),
                                                (e.next = 9),
                                                (0, k.getAppRecord)(n, w)
                                              );
                                            case 9:
                                              (s = e.sent), (e.next = 14);
                                              break;
                                            case 12:
                                              (a =
                                                w.currentInspectedComponentId),
                                                (s = w.currentAppRecord);
                                            case 14:
                                              if (!d.SharedData.trackUpdates) {
                                                e.next = 17;
                                                break;
                                              }
                                              return (
                                                (e.next = 17),
                                                (0,
                                                b.sendComponentUpdateTracking)(
                                                  a,
                                                  w
                                                )
                                              );
                                            case 17:
                                              if (!d.SharedData.flashUpdates) {
                                                e.next = 20;
                                                break;
                                              }
                                              return (
                                                (e.next = 20),
                                                (0, S.flashComponent)(
                                                  i,
                                                  s.backend
                                                )
                                              );
                                            case 20:
                                              return (e.next = 22), t(s, a);
                                            case 22:
                                              e.next = 27;
                                              break;
                                            case 24:
                                              (e.prev = 24),
                                                (e.t0 = e.catch(0)),
                                                d.SharedData.debugInfo &&
                                                  console.error(e.t0);
                                            case 27:
                                            case "end":
                                              return e.stop();
                                          }
                                      },
                                      e,
                                      null,
                                      [[0, 24]]
                                    );
                                  })
                                );
                                return function (t, n, r, o) {
                                  return e.apply(this, arguments);
                                };
                              })()
                            ),
                            h.hook.on(
                              d.HookEvents.COMPONENT_ADDED,
                              (function () {
                                var e = p(
                                  c().mark(function e(t, n, r, o) {
                                    var i, a, s, u, l, p;
                                    return c().wrap(
                                      function (e) {
                                        for (;;)
                                          switch ((e.prev = e.next)) {
                                            case 0:
                                              if (
                                                ((e.prev = 0),
                                                t &&
                                                  ("number" == typeof n || n) &&
                                                  o)
                                              ) {
                                                e.next = 3;
                                                break;
                                              }
                                              return e.abrupt("return");
                                            case 3:
                                              return (
                                                (e.next = 5),
                                                (0, b.getComponentId)(
                                                  t,
                                                  n,
                                                  o,
                                                  w
                                                )
                                              );
                                            case 5:
                                              return (
                                                (i = e.sent),
                                                (e.next = 8),
                                                (0, k.getAppRecord)(t, w)
                                              );
                                            case 8:
                                              if (
                                                ((a = e.sent),
                                                o &&
                                                  (null ==
                                                    o.__VUE_DEVTOOLS_UID__ &&
                                                    (o.__VUE_DEVTOOLS_UID__ =
                                                      i),
                                                  a.instanceMap.has(i) ||
                                                    a.instanceMap.set(i, o)),
                                                0 !== n &&
                                                  ((s = "".concat(
                                                    i.split(":")[0],
                                                    ":root"
                                                  )),
                                                  (0, b.sendComponentTreeData)(
                                                    a,
                                                    s,
                                                    a.componentFilter,
                                                    null,
                                                    !1,
                                                    w
                                                  )),
                                                null == r)
                                              ) {
                                                e.next = 24;
                                                break;
                                              }
                                              return (
                                                (e.next = 15),
                                                a.backend.api.walkComponentParents(
                                                  o
                                                )
                                              );
                                            case 15:
                                              if (!(u = e.sent).length) {
                                                e.next = 24;
                                                break;
                                              }
                                              (l = c().mark(function e() {
                                                var n;
                                                return c().wrap(function (e) {
                                                  for (;;)
                                                    switch ((e.prev = e.next)) {
                                                      case 0:
                                                        return (
                                                          (e.next = 2),
                                                          (0, b.getComponentId)(
                                                            t,
                                                            r,
                                                            u[p],
                                                            w
                                                          )
                                                        );
                                                      case 2:
                                                        if (
                                                          ((n = e.sent),
                                                          p < 2 &&
                                                            (0, v.isSubscribed)(
                                                              d
                                                                .BridgeSubscriptions
                                                                .COMPONENT_TREE,
                                                              function (e) {
                                                                return (
                                                                  e.payload
                                                                    .instanceId ===
                                                                  n
                                                                );
                                                              }
                                                            ) &&
                                                            (0, d.raf)(
                                                              function () {
                                                                (0,
                                                                b.sendComponentTreeData)(
                                                                  a,
                                                                  n,
                                                                  a.componentFilter,
                                                                  null,
                                                                  !1,
                                                                  w
                                                                );
                                                              }
                                                            ),
                                                          !d.SharedData
                                                            .trackUpdates)
                                                        ) {
                                                          e.next = 7;
                                                          break;
                                                        }
                                                        return (
                                                          (e.next = 7),
                                                          (0,
                                                          b.sendComponentUpdateTracking)(
                                                            n,
                                                            w
                                                          )
                                                        );
                                                      case 7:
                                                      case "end":
                                                        return e.stop();
                                                    }
                                                }, e);
                                              })),
                                                (p = 0);
                                            case 19:
                                              if (!(p < u.length)) {
                                                e.next = 24;
                                                break;
                                              }
                                              return e.delegateYield(
                                                l(),
                                                "t0",
                                                21
                                              );
                                            case 21:
                                              p++, (e.next = 19);
                                              break;
                                            case 24:
                                              if (
                                                w.currentInspectedComponentId !==
                                                i
                                              ) {
                                                e.next = 27;
                                                break;
                                              }
                                              return (
                                                (e.next = 27),
                                                (0,
                                                b.sendSelectedComponentData)(
                                                  a,
                                                  i,
                                                  w
                                                )
                                              );
                                            case 27:
                                              if (!d.SharedData.trackUpdates) {
                                                e.next = 30;
                                                break;
                                              }
                                              return (
                                                (e.next = 30),
                                                (0,
                                                b.sendComponentUpdateTracking)(
                                                  i,
                                                  w
                                                )
                                              );
                                            case 30:
                                              if (!d.SharedData.flashUpdates) {
                                                e.next = 33;
                                                break;
                                              }
                                              return (
                                                (e.next = 33),
                                                (0, S.flashComponent)(
                                                  o,
                                                  a.backend
                                                )
                                              );
                                            case 33:
                                              return (
                                                (e.next = 35),
                                                (0,
                                                b.refreshComponentTreeSearch)(w)
                                              );
                                            case 35:
                                              e.next = 40;
                                              break;
                                            case 37:
                                              (e.prev = 37),
                                                (e.t1 = e.catch(0)),
                                                d.SharedData.debugInfo &&
                                                  console.error(e.t1);
                                            case 40:
                                            case "end":
                                              return e.stop();
                                          }
                                      },
                                      e,
                                      null,
                                      [[0, 37]]
                                    );
                                  })
                                );
                                return function (t, n, r, o) {
                                  return e.apply(this, arguments);
                                };
                              })()
                            ),
                            h.hook.on(
                              d.HookEvents.COMPONENT_REMOVED,
                              (function () {
                                var e = p(
                                  c().mark(function e(t, n, r, o) {
                                    var i, a, s, u;
                                    return c().wrap(
                                      function (e) {
                                        for (;;)
                                          switch ((e.prev = e.next)) {
                                            case 0:
                                              if (
                                                ((e.prev = 0),
                                                t &&
                                                  ("number" == typeof n || n) &&
                                                  o)
                                              ) {
                                                e.next = 3;
                                                break;
                                              }
                                              return e.abrupt("return");
                                            case 3:
                                              return (
                                                (e.next = 5),
                                                (0, k.getAppRecord)(t, w)
                                              );
                                            case 5:
                                              if (((i = e.sent), null == r)) {
                                                e.next = 16;
                                                break;
                                              }
                                              return (
                                                (e.next = 10),
                                                i.backend.api.walkComponentParents(
                                                  o
                                                )
                                              );
                                            case 10:
                                              if (!(a = e.sent).length) {
                                                e.next = 16;
                                                break;
                                              }
                                              return (
                                                (e.next = 14),
                                                (0, b.getComponentId)(
                                                  t,
                                                  r,
                                                  a[0],
                                                  w
                                                )
                                              );
                                            case 14:
                                              (s = e.sent),
                                                (0, v.isSubscribed)(
                                                  d.BridgeSubscriptions
                                                    .COMPONENT_TREE,
                                                  function (e) {
                                                    return (
                                                      e.payload.instanceId === s
                                                    );
                                                  }
                                                ) &&
                                                  (0, d.raf)(
                                                    p(
                                                      c().mark(function e() {
                                                        return c().wrap(
                                                          function (e) {
                                                            for (;;)
                                                              switch (
                                                                (e.prev =
                                                                  e.next)
                                                              ) {
                                                                case 0:
                                                                  return (
                                                                    (e.prev = 0),
                                                                    (e.t0 =
                                                                      b.sendComponentTreeData),
                                                                    (e.next = 4),
                                                                    (0,
                                                                    k.getAppRecord)(
                                                                      t,
                                                                      w
                                                                    )
                                                                  );
                                                                case 4:
                                                                  (e.t1 =
                                                                    e.sent),
                                                                    (e.t2 = s),
                                                                    (e.t3 =
                                                                      i.componentFilter),
                                                                    (e.t4 = w),
                                                                    (0, e.t0)(
                                                                      e.t1,
                                                                      e.t2,
                                                                      e.t3,
                                                                      null,
                                                                      !1,
                                                                      e.t4
                                                                    ),
                                                                    (e.next = 14);
                                                                  break;
                                                                case 11:
                                                                  (e.prev = 11),
                                                                    (e.t5 =
                                                                      e.catch(
                                                                        0
                                                                      )),
                                                                    d.SharedData
                                                                      .debugInfo &&
                                                                      console.error(
                                                                        e.t5
                                                                      );
                                                                case 14:
                                                                case "end":
                                                                  return e.stop();
                                                              }
                                                          },
                                                          e,
                                                          null,
                                                          [[0, 11]]
                                                        );
                                                      })
                                                    )
                                                  );
                                            case 16:
                                              return (
                                                (e.next = 18),
                                                (0, b.getComponentId)(
                                                  t,
                                                  n,
                                                  o,
                                                  w
                                                )
                                              );
                                            case 18:
                                              if (
                                                ((u = e.sent),
                                                !(0, v.isSubscribed)(
                                                  d.BridgeSubscriptions
                                                    .SELECTED_COMPONENT_DATA,
                                                  function (e) {
                                                    return (
                                                      e.payload.instanceId === u
                                                    );
                                                  }
                                                ))
                                              ) {
                                                e.next = 22;
                                                break;
                                              }
                                              return (
                                                (e.next = 22),
                                                (0, b.sendEmptyComponentData)(
                                                  u,
                                                  w
                                                )
                                              );
                                            case 22:
                                              return (
                                                i.instanceMap.delete(u),
                                                (e.next = 25),
                                                (0,
                                                b.refreshComponentTreeSearch)(w)
                                              );
                                            case 25:
                                              e.next = 30;
                                              break;
                                            case 27:
                                              (e.prev = 27),
                                                (e.t0 = e.catch(0)),
                                                d.SharedData.debugInfo &&
                                                  console.error(e.t0);
                                            case 30:
                                            case "end":
                                              return e.stop();
                                          }
                                      },
                                      e,
                                      null,
                                      [[0, 27]]
                                    );
                                  })
                                );
                                return function (t, n, r, o) {
                                  return e.apply(this, arguments);
                                };
                              })()
                            ),
                            h.hook.on(
                              d.HookEvents.TRACK_UPDATE,
                              function (e, t) {
                                (0, b.sendComponentUpdateTracking)(e, t);
                              }
                            ),
                            h.hook.on(
                              d.HookEvents.FLASH_UPDATE,
                              function (e, t) {
                                (0, S.flashComponent)(e, t);
                              }
                            ),
                            h.hook.on(
                              d.HookEvents.PERFORMANCE_START,
                              (function () {
                                var e = p(
                                  c().mark(function e(t, n, r, o, i) {
                                    return c().wrap(function (e) {
                                      for (;;)
                                        switch ((e.prev = e.next)) {
                                          case 0:
                                            return (
                                              (e.next = 2),
                                              (0, x.performanceMarkStart)(
                                                t,
                                                n,
                                                r,
                                                o,
                                                i,
                                                w
                                              )
                                            );
                                          case 2:
                                          case "end":
                                            return e.stop();
                                        }
                                    }, e);
                                  })
                                );
                                return function (t, n, r, o, i) {
                                  return e.apply(this, arguments);
                                };
                              })()
                            ),
                            h.hook.on(
                              d.HookEvents.PERFORMANCE_END,
                              (function () {
                                var e = p(
                                  c().mark(function e(t, n, r, o, i) {
                                    return c().wrap(function (e) {
                                      for (;;)
                                        switch ((e.prev = e.next)) {
                                          case 0:
                                            return (
                                              (e.next = 2),
                                              (0, x.performanceMarkEnd)(
                                                t,
                                                n,
                                                r,
                                                o,
                                                i,
                                                w
                                              )
                                            );
                                          case 2:
                                          case "end":
                                            return e.stop();
                                        }
                                    }, e);
                                  })
                                );
                                return function (t, n, r, o, i) {
                                  return e.apply(this, arguments);
                                };
                              })()
                            ),
                            h.hook.on(
                              d.HookEvents.COMPONENT_HIGHLIGHT,
                              (function () {
                                var e = p(
                                  c().mark(function e(t) {
                                    return c().wrap(function (e) {
                                      for (;;)
                                        switch ((e.prev = e.next)) {
                                          case 0:
                                            return (
                                              (e.next = 2),
                                              (0, m.highlight)(
                                                w.currentAppRecord.instanceMap.get(
                                                  t
                                                ),
                                                w.currentAppRecord.backend,
                                                w
                                              )
                                            );
                                          case 2:
                                          case "end":
                                            return e.stop();
                                        }
                                    }, e);
                                  })
                                );
                                return function (t) {
                                  return e.apply(this, arguments);
                                };
                              })()
                            ),
                            h.hook.on(
                              d.HookEvents.COMPONENT_UNHIGHLIGHT,
                              p(
                                c().mark(function e() {
                                  return c().wrap(function (e) {
                                    for (;;)
                                      switch ((e.prev = e.next)) {
                                        case 0:
                                          return (
                                            (e.next = 2), (0, m.unHighlight)()
                                          );
                                        case 2:
                                        case "end":
                                          return e.stop();
                                      }
                                  }, e);
                                })
                              )
                            ),
                            (0, g.setupTimeline)(w),
                            h.hook.on(
                              d.HookEvents.TIMELINE_LAYER_ADDED,
                              (function () {
                                var e = p(
                                  c().mark(function e(t, n) {
                                    var r;
                                    return c().wrap(function (e) {
                                      for (;;)
                                        switch ((e.prev = e.next)) {
                                          case 0:
                                            return (
                                              (e.next = 2),
                                              (0, k.getAppRecord)(
                                                n.descriptor.app,
                                                w
                                              )
                                            );
                                          case 2:
                                            (r = e.sent),
                                              w.timelineLayers.push(
                                                a(
                                                  a({}, t),
                                                  {},
                                                  {
                                                    appRecord: r,
                                                    plugin: n,
                                                    events: [],
                                                  }
                                                )
                                              ),
                                              w.bridge.send(
                                                d.BridgeEvents
                                                  .TO_FRONT_TIMELINE_LAYER_ADD,
                                                {}
                                              );
                                          case 5:
                                          case "end":
                                            return e.stop();
                                        }
                                    }, e);
                                  })
                                );
                                return function (t, n) {
                                  return e.apply(this, arguments);
                                };
                              })()
                            ),
                            h.hook.on(
                              d.HookEvents.TIMELINE_EVENT_ADDED,
                              (function () {
                                var e = p(
                                  c().mark(function e(t, n) {
                                    return c().wrap(function (e) {
                                      for (;;)
                                        switch ((e.prev = e.next)) {
                                          case 0:
                                            return (
                                              (e.next = 2),
                                              (0, g.addTimelineEvent)(
                                                t,
                                                n.descriptor.app,
                                                w
                                              )
                                            );
                                          case 2:
                                          case "end":
                                            return e.stop();
                                        }
                                    }, e);
                                  })
                                );
                                return function (t, n) {
                                  return e.apply(this, arguments);
                                };
                              })()
                            ),
                            h.hook.on(
                              d.HookEvents.CUSTOM_INSPECTOR_ADD,
                              (function () {
                                var e = p(
                                  c().mark(function e(t, n) {
                                    var r;
                                    return c().wrap(function (e) {
                                      for (;;)
                                        switch ((e.prev = e.next)) {
                                          case 0:
                                            return (
                                              (e.next = 2),
                                              (0, k.getAppRecord)(
                                                n.descriptor.app,
                                                w
                                              )
                                            );
                                          case 2:
                                            (r = e.sent),
                                              w.customInspectors.push(
                                                a(
                                                  a({}, t),
                                                  {},
                                                  {
                                                    appRecord: r,
                                                    plugin: n,
                                                    treeFilter: "",
                                                    selectedNodeId: null,
                                                  }
                                                )
                                              ),
                                              w.bridge.send(
                                                d.BridgeEvents
                                                  .TO_FRONT_CUSTOM_INSPECTOR_ADD,
                                                {}
                                              );
                                          case 5:
                                          case "end":
                                            return e.stop();
                                        }
                                    }, e);
                                  })
                                );
                                return function (t, n) {
                                  return e.apply(this, arguments);
                                };
                              })()
                            ),
                            h.hook.on(
                              d.HookEvents.CUSTOM_INSPECTOR_SEND_TREE,
                              (function () {
                                var e = p(
                                  c().mark(function e(t, n) {
                                    var r;
                                    return c().wrap(function (e) {
                                      for (;;)
                                        switch ((e.prev = e.next)) {
                                          case 0:
                                            if (
                                              !(r = (0, O.getInspector)(
                                                t,
                                                n.descriptor.app,
                                                w
                                              ))
                                            ) {
                                              e.next = 6;
                                              break;
                                            }
                                            return (
                                              (e.next = 4),
                                              (0, O.sendInspectorTree)(r, w)
                                            );
                                          case 4:
                                            e.next = 7;
                                            break;
                                          case 6:
                                            d.SharedData.debugInfo &&
                                              console.warn(
                                                "Inspector ".concat(
                                                  t,
                                                  " not found"
                                                )
                                              );
                                          case 7:
                                          case "end":
                                            return e.stop();
                                        }
                                    }, e);
                                  })
                                );
                                return function (t, n) {
                                  return e.apply(this, arguments);
                                };
                              })()
                            ),
                            h.hook.on(
                              d.HookEvents.CUSTOM_INSPECTOR_SEND_STATE,
                              (function () {
                                var e = p(
                                  c().mark(function e(t, n) {
                                    var r;
                                    return c().wrap(function (e) {
                                      for (;;)
                                        switch ((e.prev = e.next)) {
                                          case 0:
                                            if (
                                              !(r = (0, O.getInspector)(
                                                t,
                                                n.descriptor.app,
                                                w
                                              ))
                                            ) {
                                              e.next = 6;
                                              break;
                                            }
                                            return (
                                              (e.next = 4),
                                              (0, O.sendInspectorState)(r, w)
                                            );
                                          case 4:
                                            e.next = 7;
                                            break;
                                          case 6:
                                            d.SharedData.debugInfo &&
                                              console.warn(
                                                "Inspector ".concat(
                                                  t,
                                                  " not found"
                                                )
                                              );
                                          case 7:
                                          case "end":
                                            return e.stop();
                                        }
                                    }, e);
                                  })
                                );
                                return function (t, n) {
                                  return e.apply(this, arguments);
                                };
                              })()
                            ),
                            h.hook.on(
                              d.HookEvents.CUSTOM_INSPECTOR_SELECT_NODE,
                              (function () {
                                var e = p(
                                  c().mark(function e(t, n, r) {
                                    var o;
                                    return c().wrap(function (e) {
                                      for (;;)
                                        switch ((e.prev = e.next)) {
                                          case 0:
                                            if (
                                              !(o = (0, O.getInspector)(
                                                t,
                                                r.descriptor.app,
                                                w
                                              ))
                                            ) {
                                              e.next = 6;
                                              break;
                                            }
                                            return (
                                              (e.next = 4),
                                              (0, O.selectInspectorNode)(
                                                o,
                                                n,
                                                w
                                              )
                                            );
                                          case 4:
                                            e.next = 7;
                                            break;
                                          case 6:
                                            d.SharedData.debugInfo &&
                                              console.warn(
                                                "Inspector ".concat(
                                                  t,
                                                  " not found"
                                                )
                                              );
                                          case 7:
                                          case "end":
                                            return e.stop();
                                        }
                                    }, e);
                                  })
                                );
                                return function (t, n, r) {
                                  return e.apply(this, arguments);
                                };
                              })()
                            ),
                            (e.prev = 26),
                            (e.next = 29),
                            (0, y.addPreviouslyRegisteredPlugins)(w)
                          );
                        case 29:
                          e.next = 35;
                          break;
                        case 31:
                          (e.prev = 31),
                            (e.t0 = e.catch(26)),
                            console.error(
                              "Error adding previously registered plugins:"
                            ),
                            console.error(e.t0);
                        case 35:
                          return (
                            (e.prev = 35),
                            (e.next = 38),
                            (0, y.addQueuedPlugins)(w)
                          );
                        case 38:
                          e.next = 44;
                          break;
                        case 40:
                          (e.prev = 40),
                            (e.t1 = e.catch(35)),
                            console.error("Error adding queued plugins:"),
                            console.error(e.t1);
                        case 44:
                          return (
                            h.hook.on(
                              d.HookEvents.SETUP_DEVTOOLS_PLUGIN,
                              (function () {
                                var e = p(
                                  c().mark(function e(t, n) {
                                    return c().wrap(function (e) {
                                      for (;;)
                                        switch ((e.prev = e.next)) {
                                          case 0:
                                            return (
                                              (e.next = 2),
                                              (0, y.addPlugin)(
                                                {
                                                  pluginDescriptor: t,
                                                  setupFn: n,
                                                },
                                                w
                                              )
                                            );
                                          case 2:
                                          case "end":
                                            return e.stop();
                                        }
                                    }, e);
                                  })
                                );
                                return function (t, n) {
                                  return e.apply(this, arguments);
                                };
                              })()
                            ),
                            (d.target.__VUE_DEVTOOLS_PLUGIN_API_AVAILABLE__ =
                              !0),
                            (n = (0, f.default)(
                              p(
                                c().mark(function e() {
                                  var t;
                                  return c().wrap(function (e) {
                                    for (;;)
                                      switch ((e.prev = e.next)) {
                                        case 0:
                                          if (
                                            !(null ===
                                              (t = w.currentAppRecord) ||
                                            void 0 === t
                                              ? void 0
                                              : t.backend.options.features.includes(
                                                  l.BuiltinBackendFeature.FLUSH
                                                ))
                                          ) {
                                            e.next = 6;
                                            break;
                                          }
                                          return (
                                            (e.next = 3),
                                            (0, b.sendComponentTreeData)(
                                              w.currentAppRecord,
                                              "_root",
                                              w.currentAppRecord
                                                .componentFilter,
                                              null,
                                              !1,
                                              w
                                            )
                                          );
                                        case 3:
                                          if (!w.currentInspectedComponentId) {
                                            e.next = 6;
                                            break;
                                          }
                                          return (
                                            (e.next = 6),
                                            (0, b.sendSelectedComponentData)(
                                              w.currentAppRecord,
                                              w.currentInspectedComponentId,
                                              w
                                            )
                                          );
                                        case 6:
                                        case "end":
                                          return e.stop();
                                      }
                                  }, e);
                                })
                              ),
                              500
                            )),
                            h.hook.off(d.HookEvents.FLUSH),
                            h.hook.on(d.HookEvents.FLUSH, n),
                            (e.prev = 49),
                            (e.next = 52),
                            (0, C.addTimelineMarker)(
                              {
                                id: "vue-devtools-init-backend",
                                time: (0, E.now)(),
                                label: "Vue Devtools connected",
                                color: 4307075,
                                all: !0,
                              },
                              w
                            )
                          );
                        case 52:
                          e.next = 58;
                          break;
                        case 54:
                          (e.prev = 54),
                            (e.t2 = e.catch(49)),
                            console.error(
                              "Error while adding devtools connected timeline marker:"
                            ),
                            console.error(e.t2);
                        case 58:
                        case "end":
                          return e.stop();
                      }
                  },
                  e,
                  null,
                  [
                    [26, 31],
                    [35, 40],
                    [49, 54],
                  ]
                );
              })
            )).apply(this, arguments);
          }
          function R() {
            w.bridge.on(d.BridgeEvents.TO_BACK_SUBSCRIBE, function (e) {
              var t = e.type,
                n = e.payload;
              (0, v.subscribe)(t, n);
            }),
              w.bridge.on(d.BridgeEvents.TO_BACK_UNSUBSCRIBE, function (e) {
                var t = e.type,
                  n = e.payload;
                (0, v.unsubscribe)(t, n);
              }),
              w.bridge.on(
                d.BridgeEvents.TO_BACK_TAB_SWITCH,
                (function () {
                  var e = p(
                    c().mark(function e(t) {
                      return c().wrap(function (e) {
                        for (;;)
                          switch ((e.prev = e.next)) {
                            case 0:
                              return (
                                (w.currentTab = t),
                                (e.next = 3),
                                (0, m.unHighlight)()
                              );
                            case 3:
                            case "end":
                              return e.stop();
                          }
                      }, e);
                    })
                  );
                  return function (t) {
                    return e.apply(this, arguments);
                  };
                })()
              ),
              w.bridge.on(
                d.BridgeEvents.TO_BACK_APP_LIST,
                p(
                  c().mark(function e() {
                    return c().wrap(function (e) {
                      for (;;)
                        switch ((e.prev = e.next)) {
                          case 0:
                            return (e.next = 2), (0, k.sendApps)(w);
                          case 2:
                          case "end":
                            return e.stop();
                        }
                    }, e);
                  })
                )
              ),
              w.bridge.on(
                d.BridgeEvents.TO_BACK_APP_SELECT,
                (function () {
                  var e = p(
                    c().mark(function e(t) {
                      var n;
                      return c().wrap(function (e) {
                        for (;;)
                          switch ((e.prev = e.next)) {
                            case 0:
                              if (null != t) {
                                e.next = 2;
                                break;
                              }
                              return e.abrupt("return");
                            case 2:
                              if (
                                !(n = w.appRecords.find(function (e) {
                                  return e.id === t;
                                }))
                              ) {
                                e.next = 8;
                                break;
                              }
                              return (e.next = 6), (0, k.selectApp)(n, w);
                            case 6:
                              e.next = 9;
                              break;
                            case 8:
                              d.SharedData.debugInfo &&
                                console.warn(
                                  "App with id ".concat(t, " not found")
                                );
                            case 9:
                            case "end":
                              return e.stop();
                          }
                      }, e);
                    })
                  );
                  return function (t) {
                    return e.apply(this, arguments);
                  };
                })()
              ),
              w.bridge.on(d.BridgeEvents.TO_BACK_SCAN_LEGACY_APPS, function () {
                h.hook.Vue && (0, k._legacy_getAndRegisterApps)(w);
              }),
              w.bridge.on(
                d.BridgeEvents.TO_BACK_COMPONENT_TREE,
                (function () {
                  var e = p(
                    c().mark(function e(t) {
                      var n, r, o;
                      return c().wrap(function (e) {
                        for (;;)
                          switch ((e.prev = e.next)) {
                            case 0:
                              return (
                                (n = t.instanceId),
                                (r = t.filter),
                                (o = t.recursively),
                                (w.currentAppRecord.componentFilter = r),
                                (0, v.subscribe)(
                                  d.BridgeSubscriptions.COMPONENT_TREE,
                                  { instanceId: n }
                                ),
                                (e.next = 5),
                                (0, b.sendComponentTreeData)(
                                  w.currentAppRecord,
                                  n,
                                  r,
                                  null,
                                  o,
                                  w
                                )
                              );
                            case 5:
                            case "end":
                              return e.stop();
                          }
                      }, e);
                    })
                  );
                  return function (t) {
                    return e.apply(this, arguments);
                  };
                })()
              ),
              w.bridge.on(
                d.BridgeEvents.TO_BACK_COMPONENT_SELECTED_DATA,
                (function () {
                  var e = p(
                    c().mark(function e(t) {
                      return c().wrap(function (e) {
                        for (;;)
                          switch ((e.prev = e.next)) {
                            case 0:
                              return (
                                (e.next = 2),
                                (0, b.sendSelectedComponentData)(
                                  w.currentAppRecord,
                                  t,
                                  w
                                )
                              );
                            case 2:
                            case "end":
                              return e.stop();
                          }
                      }, e);
                    })
                  );
                  return function (t) {
                    return e.apply(this, arguments);
                  };
                })()
              ),
              w.bridge.on(
                d.BridgeEvents.TO_BACK_COMPONENT_EDIT_STATE,
                (function () {
                  var e = p(
                    c().mark(function e(t) {
                      var n, r, o, i, a, s;
                      return c().wrap(function (e) {
                        for (;;)
                          switch ((e.prev = e.next)) {
                            case 0:
                              return (
                                (n = t.instanceId),
                                (r = t.dotPath),
                                (o = t.type),
                                (i = t.value),
                                (a = t.newKey),
                                (s = t.remove),
                                (e.next = 3),
                                (0, b.editComponentState)(
                                  n,
                                  r,
                                  o,
                                  { value: i, newKey: a, remove: s },
                                  w
                                )
                              );
                            case 3:
                            case "end":
                              return e.stop();
                          }
                      }, e);
                    })
                  );
                  return function (t) {
                    return e.apply(this, arguments);
                  };
                })()
              ),
              w.bridge.on(
                d.BridgeEvents.TO_BACK_COMPONENT_INSPECT_DOM,
                (function () {
                  var e = p(
                    c().mark(function e(t) {
                      var n, r, o, i, a;
                      return c().wrap(function (e) {
                        for (;;)
                          switch ((e.prev = e.next)) {
                            case 0:
                              if (
                                ((n = t.instanceId),
                                !(r = (0, b.getComponentInstance)(
                                  w.currentAppRecord,
                                  n,
                                  w
                                )))
                              ) {
                                e.next = 9;
                                break;
                              }
                              return (
                                (e.next = 5),
                                w.currentAppRecord.backend.api.getComponentRootElements(
                                  r
                                )
                              );
                            case 5:
                              (o = e.sent),
                                (i = s(o, 1)),
                                (a = i[0]) &&
                                  ((d.target.__VUE_DEVTOOLS_INSPECT_TARGET__ =
                                    a),
                                  w.bridge.send(
                                    d.BridgeEvents
                                      .TO_FRONT_COMPONENT_INSPECT_DOM,
                                    null
                                  ));
                            case 9:
                            case "end":
                              return e.stop();
                          }
                      }, e);
                    })
                  );
                  return function (t) {
                    return e.apply(this, arguments);
                  };
                })()
              ),
              w.bridge.on(
                d.BridgeEvents.TO_BACK_COMPONENT_SCROLL_TO,
                (function () {
                  var e = p(
                    c().mark(function e(t) {
                      var n, r, o, i, a, u, l;
                      return c().wrap(function (e) {
                        for (;;)
                          switch ((e.prev = e.next)) {
                            case 0:
                              if (((n = t.instanceId), d.isBrowser)) {
                                e.next = 3;
                                break;
                              }
                              return e.abrupt("return");
                            case 3:
                              if (
                                !(r = (0, b.getComponentInstance)(
                                  w.currentAppRecord,
                                  n,
                                  w
                                ))
                              ) {
                                e.next = 29;
                                break;
                              }
                              return (
                                (e.next = 7),
                                w.currentAppRecord.backend.api.getComponentRootElements(
                                  r
                                )
                              );
                            case 7:
                              if (((o = e.sent), (i = s(o, 1)), !(a = i[0]))) {
                                e.next = 29;
                                break;
                              }
                              if ("function" != typeof a.scrollIntoView) {
                                e.next = 15;
                                break;
                              }
                              a.scrollIntoView({
                                behavior: "smooth",
                                block: "center",
                                inline: "center",
                              }),
                                (e.next = 27);
                              break;
                            case 15:
                              return (
                                (e.next = 17),
                                w.currentAppRecord.backend.api.getComponentBounds(
                                  r
                                )
                              );
                            case 17:
                              (u = e.sent),
                                ((l =
                                  document.createElement(
                                    "div"
                                  )).style.position = "absolute"),
                                (l.style.width = "".concat(u.width, "px")),
                                (l.style.height = "".concat(u.height, "px")),
                                (l.style.top = "".concat(u.top, "px")),
                                (l.style.left = "".concat(u.left, "px")),
                                document.body.appendChild(l),
                                l.scrollIntoView({
                                  behavior: "smooth",
                                  block: "center",
                                  inline: "center",
                                }),
                                setTimeout(function () {
                                  document.body.removeChild(l);
                                }, 2e3);
                            case 27:
                              (0, m.highlight)(
                                r,
                                w.currentAppRecord.backend,
                                w
                              ),
                                setTimeout(function () {
                                  (0, m.unHighlight)();
                                }, 2e3);
                            case 29:
                            case "end":
                              return e.stop();
                          }
                      }, e);
                    })
                  );
                  return function (t) {
                    return e.apply(this, arguments);
                  };
                })()
              ),
              w.bridge.on(
                d.BridgeEvents.TO_BACK_COMPONENT_RENDER_CODE,
                (function () {
                  var e = p(
                    c().mark(function e(t) {
                      var n, r, o, i;
                      return c().wrap(function (e) {
                        for (;;)
                          switch ((e.prev = e.next)) {
                            case 0:
                              if (((n = t.instanceId), d.isBrowser)) {
                                e.next = 3;
                                break;
                              }
                              return e.abrupt("return");
                            case 3:
                              if (
                                !(r = (0, b.getComponentInstance)(
                                  w.currentAppRecord,
                                  n,
                                  w
                                ))
                              ) {
                                e.next = 10;
                                break;
                              }
                              return (
                                (e.next = 7),
                                w.currentAppRecord.backend.api.getComponentRenderCode(
                                  r
                                )
                              );
                            case 7:
                              (o = e.sent),
                                (i = o.code),
                                w.bridge.send(
                                  d.BridgeEvents.TO_FRONT_COMPONENT_RENDER_CODE,
                                  { instanceId: n, code: i }
                                );
                            case 10:
                            case "end":
                              return e.stop();
                          }
                      }, e);
                    })
                  );
                  return function (t) {
                    return e.apply(this, arguments);
                  };
                })()
              ),
              w.bridge.on(
                d.BridgeEvents.TO_BACK_CUSTOM_STATE_ACTION,
                (function () {
                  var e = p(
                    c().mark(function e(t) {
                      var n, r, o, i;
                      return c().wrap(
                        function (e) {
                          for (;;)
                            switch ((e.prev = e.next)) {
                              case 0:
                                if (
                                  ((n = t.value),
                                  (r = t.actionIndex),
                                  (o = n._custom.actions[r]),
                                  !(i = (0, d.revive)(
                                    null == o ? void 0 : o.action
                                  )))
                                ) {
                                  e.next = 14;
                                  break;
                                }
                                return (e.prev = 4), (e.next = 7), i();
                              case 7:
                                e.next = 12;
                                break;
                              case 9:
                                (e.prev = 9),
                                  (e.t0 = e.catch(4)),
                                  console.error(e.t0);
                              case 12:
                                e.next = 15;
                                break;
                              case 14:
                                console.warn(
                                  "Couldn't revive action ".concat(r, " from"),
                                  n
                                );
                              case 15:
                              case "end":
                                return e.stop();
                            }
                        },
                        e,
                        null,
                        [[4, 9]]
                      );
                    })
                  );
                  return function (t) {
                    return e.apply(this, arguments);
                  };
                })()
              ),
              w.bridge.on(
                d.BridgeEvents.TO_BACK_COMPONENT_MOUSE_OVER,
                (function () {
                  var e = p(
                    c().mark(function e(t) {
                      return c().wrap(function (e) {
                        for (;;)
                          switch ((e.prev = e.next)) {
                            case 0:
                              return (
                                (e.next = 2),
                                (0, m.highlight)(
                                  w.currentAppRecord.instanceMap.get(t),
                                  w.currentAppRecord.backend,
                                  w
                                )
                              );
                            case 2:
                            case "end":
                              return e.stop();
                          }
                      }, e);
                    })
                  );
                  return function (t) {
                    return e.apply(this, arguments);
                  };
                })()
              ),
              w.bridge.on(
                d.BridgeEvents.TO_BACK_COMPONENT_MOUSE_OUT,
                p(
                  c().mark(function e() {
                    return c().wrap(function (e) {
                      for (;;)
                        switch ((e.prev = e.next)) {
                          case 0:
                            return (e.next = 2), (0, m.unHighlight)();
                          case 2:
                          case "end":
                            return e.stop();
                        }
                    }, e);
                  })
                )
              );
            var e = new _.default(w);
            w.bridge.on(d.BridgeEvents.TO_BACK_COMPONENT_PICK, function () {
              e.startSelecting();
            }),
              w.bridge.on(
                d.BridgeEvents.TO_BACK_COMPONENT_PICK_CANCELED,
                function () {
                  e.stopSelecting();
                }
              ),
              w.bridge.on(
                d.BridgeEvents.TO_BACK_TIMELINE_LAYER_LIST,
                p(
                  c().mark(function e() {
                    return c().wrap(function (e) {
                      for (;;)
                        switch ((e.prev = e.next)) {
                          case 0:
                            return (e.next = 2), (0, g.sendTimelineLayers)(w);
                          case 2:
                          case "end":
                            return e.stop();
                        }
                    }, e);
                  })
                )
              ),
              w.bridge.on(
                d.BridgeEvents.TO_BACK_TIMELINE_SHOW_SCREENSHOT,
                (function () {
                  var e = p(
                    c().mark(function e(t) {
                      var n;
                      return c().wrap(function (e) {
                        for (;;)
                          switch ((e.prev = e.next)) {
                            case 0:
                              return (
                                (n = t.screenshot),
                                (e.next = 3),
                                (0, T.showScreenshot)(n, w)
                              );
                            case 3:
                            case "end":
                              return e.stop();
                          }
                      }, e);
                    })
                  );
                  return function (t) {
                    return e.apply(this, arguments);
                  };
                })()
              ),
              w.bridge.on(
                d.BridgeEvents.TO_BACK_TIMELINE_CLEAR,
                p(
                  c().mark(function e() {
                    return c().wrap(function (e) {
                      for (;;)
                        switch ((e.prev = e.next)) {
                          case 0:
                            return (e.next = 2), (0, g.clearTimeline)(w);
                          case 2:
                          case "end":
                            return e.stop();
                        }
                    }, e);
                  })
                )
              ),
              w.bridge.on(
                d.BridgeEvents.TO_BACK_TIMELINE_EVENT_DATA,
                (function () {
                  var e = p(
                    c().mark(function e(t) {
                      var n;
                      return c().wrap(function (e) {
                        for (;;)
                          switch ((e.prev = e.next)) {
                            case 0:
                              return (
                                (n = t.id),
                                (e.next = 3),
                                (0, g.sendTimelineEventData)(n, w)
                              );
                            case 3:
                            case "end":
                              return e.stop();
                          }
                      }, e);
                    })
                  );
                  return function (t) {
                    return e.apply(this, arguments);
                  };
                })()
              ),
              w.bridge.on(
                d.BridgeEvents.TO_BACK_TIMELINE_LAYER_LOAD_EVENTS,
                (function () {
                  var e = p(
                    c().mark(function e(t) {
                      var n, r;
                      return c().wrap(function (e) {
                        for (;;)
                          switch ((e.prev = e.next)) {
                            case 0:
                              return (
                                (n = t.appId),
                                (r = t.layerId),
                                (e.next = 3),
                                (0, g.sendTimelineLayerEvents)(n, r, w)
                              );
                            case 3:
                            case "end":
                              return e.stop();
                          }
                      }, e);
                    })
                  );
                  return function (t) {
                    return e.apply(this, arguments);
                  };
                })()
              ),
              w.bridge.on(
                d.BridgeEvents.TO_BACK_TIMELINE_LOAD_MARKERS,
                p(
                  c().mark(function e() {
                    return c().wrap(function (e) {
                      for (;;)
                        switch ((e.prev = e.next)) {
                          case 0:
                            return (e.next = 2), (0, C.sendTimelineMarkers)(w);
                          case 2:
                          case "end":
                            return e.stop();
                        }
                    }, e);
                  })
                )
              ),
              w.bridge.on(
                d.BridgeEvents.TO_BACK_CUSTOM_INSPECTOR_LIST,
                p(
                  c().mark(function e() {
                    return c().wrap(function (e) {
                      for (;;)
                        switch ((e.prev = e.next)) {
                          case 0:
                            return (e.next = 2), (0, O.sendCustomInspectors)(w);
                          case 2:
                          case "end":
                            return e.stop();
                        }
                    }, e);
                  })
                )
              ),
              w.bridge.on(
                d.BridgeEvents.TO_BACK_CUSTOM_INSPECTOR_TREE,
                (function () {
                  var e = p(
                    c().mark(function e(t) {
                      var n, r, o, i;
                      return c().wrap(function (e) {
                        for (;;)
                          switch ((e.prev = e.next)) {
                            case 0:
                              return (
                                (n = t.inspectorId),
                                (r = t.appId),
                                (o = t.treeFilter),
                                (e.next = 3),
                                (0, O.getInspectorWithAppId)(n, r, w)
                              );
                            case 3:
                              (i = e.sent)
                                ? ((i.treeFilter = o),
                                  (0, O.sendInspectorTree)(i, w))
                                : d.SharedData.debugInfo &&
                                  console.warn(
                                    "Inspector ".concat(n, " not found")
                                  );
                            case 5:
                            case "end":
                              return e.stop();
                          }
                      }, e);
                    })
                  );
                  return function (t) {
                    return e.apply(this, arguments);
                  };
                })()
              ),
              w.bridge.on(
                d.BridgeEvents.TO_BACK_CUSTOM_INSPECTOR_STATE,
                (function () {
                  var e = p(
                    c().mark(function e(t) {
                      var n, r, o, i;
                      return c().wrap(function (e) {
                        for (;;)
                          switch ((e.prev = e.next)) {
                            case 0:
                              return (
                                (n = t.inspectorId),
                                (r = t.appId),
                                (o = t.nodeId),
                                (e.next = 3),
                                (0, O.getInspectorWithAppId)(n, r, w)
                              );
                            case 3:
                              (i = e.sent)
                                ? ((i.selectedNodeId = o),
                                  (0, O.sendInspectorState)(i, w))
                                : d.SharedData.debugInfo &&
                                  console.warn(
                                    "Inspector ".concat(n, " not found")
                                  );
                            case 5:
                            case "end":
                              return e.stop();
                          }
                      }, e);
                    })
                  );
                  return function (t) {
                    return e.apply(this, arguments);
                  };
                })()
              ),
              w.bridge.on(
                d.BridgeEvents.TO_BACK_CUSTOM_INSPECTOR_EDIT_STATE,
                (function () {
                  var e = p(
                    c().mark(function e(t) {
                      var n, r, o, i, a, s, u;
                      return c().wrap(function (e) {
                        for (;;)
                          switch ((e.prev = e.next)) {
                            case 0:
                              return (
                                (n = t.inspectorId),
                                (r = t.appId),
                                (o = t.nodeId),
                                (i = t.path),
                                (a = t.type),
                                (s = t.payload),
                                (e.next = 3),
                                (0, O.getInspectorWithAppId)(n, r, w)
                              );
                            case 3:
                              if (!(u = e.sent)) {
                                e.next = 12;
                                break;
                              }
                              return (
                                (e.next = 7),
                                (0, O.editInspectorState)(u, o, i, a, s, w)
                              );
                            case 7:
                              return (
                                (u.selectedNodeId = o),
                                (e.next = 10),
                                (0, O.sendInspectorState)(u, w)
                              );
                            case 10:
                              e.next = 13;
                              break;
                            case 12:
                              d.SharedData.debugInfo &&
                                console.warn(
                                  "Inspector ".concat(n, " not found")
                                );
                            case 13:
                            case "end":
                              return e.stop();
                          }
                      }, e);
                    })
                  );
                  return function (t) {
                    return e.apply(this, arguments);
                  };
                })()
              ),
              w.bridge.on(
                d.BridgeEvents.TO_BACK_CUSTOM_INSPECTOR_ACTION,
                (function () {
                  var e = p(
                    c().mark(function e(t) {
                      var n, r, o, i, a, s, l;
                      return c().wrap(
                        function (e) {
                          for (;;)
                            switch ((e.prev = e.next)) {
                              case 0:
                                return (
                                  (n = t.inspectorId),
                                  (r = t.appId),
                                  (o = t.actionIndex),
                                  (i = t.actionType),
                                  (a = t.args),
                                  (e.next = 3),
                                  (0, O.getInspectorWithAppId)(n, r, w)
                                );
                              case 3:
                                if (!(s = e.sent)) {
                                  e.next = 16;
                                  break;
                                }
                                return (
                                  (l = s[null != i ? i : "actions"][o]),
                                  (e.prev = 6),
                                  (e.next = 9),
                                  l.action.apply(l, u(null != a ? a : []))
                                );
                              case 9:
                                e.next = 14;
                                break;
                              case 11:
                                (e.prev = 11),
                                  (e.t0 = e.catch(6)),
                                  d.SharedData.debugInfo && console.error(e.t0);
                              case 14:
                                e.next = 17;
                                break;
                              case 16:
                                d.SharedData.debugInfo &&
                                  console.warn(
                                    "Inspector ".concat(n, " not found")
                                  );
                              case 17:
                              case "end":
                                return e.stop();
                            }
                        },
                        e,
                        null,
                        [[6, 11]]
                      );
                    })
                  );
                  return function (t) {
                    return e.apply(this, arguments);
                  };
                })()
              ),
              w.bridge.on(d.BridgeEvents.TO_BACK_LOG, function (e) {
                var t = e.value;
                e.serialized
                  ? (t = (0, d.parse)(t, e.revive))
                  : e.revive && (t = (0, d.revive)(t)),
                  console[e.level](t);
              }),
              w.bridge.on(
                d.BridgeEvents.TO_BACK_DEVTOOLS_PLUGIN_LIST,
                p(
                  c().mark(function e() {
                    return c().wrap(function (e) {
                      for (;;)
                        switch ((e.prev = e.next)) {
                          case 0:
                            return (e.next = 2), (0, y.sendPluginList)(w);
                          case 2:
                          case "end":
                            return e.stop();
                        }
                    }, e);
                  })
                )
              ),
              w.bridge.on(
                d.BridgeEvents.TO_BACK_DEVTOOLS_PLUGIN_SETTING_UPDATED,
                function (e) {
                  var t = e.pluginId,
                    n = e.key,
                    r = e.newValue,
                    o = e.oldValue,
                    i = (0, d.getPluginSettings)(t);
                  w.hook.emit(d.HookEvents.PLUGIN_SETTINGS_SET, t, i),
                    w.currentAppRecord.backend.api.callHook(
                      "setPluginSettings",
                      {
                        app: w.currentAppRecord.options.app,
                        pluginId: t,
                        key: n,
                        newValue: r,
                        oldValue: o,
                        settings: i,
                      }
                    );
                }
              );
          }
          t.initBackend = function (e) {
            return A.apply(this, arguments);
          };
        },
      "../app-backend-core/lib/inspector.js":
        /*!********************************************!*\
      !*** ../app-backend-core/lib/inspector.js ***!
      \********************************************/
        function (e, t, n) {
          Object.defineProperty(t, "__esModule", { value: !0 }),
            (t.selectInspectorNode =
              t.sendCustomInspectors =
              t.editInspectorState =
              t.sendInspectorState =
              t.sendInspectorTree =
              t.getInspectorWithAppId =
              t.getInspector =
                void 0);
          var r = n(
            /*! @vue-devtools/shared-utils */ "../shared-utils/lib/index.js"
          );
          function o() {
            return (o = p(
              c().mark(function e(t, n, r) {
                var o, i, a;
                return c().wrap(
                  function (e) {
                    for (;;)
                      switch ((e.prev = e.next)) {
                        case 0:
                          (o = l(r.customInspectors)), (e.prev = 1), o.s();
                        case 3:
                          if ((i = o.n()).done) {
                            e.next = 9;
                            break;
                          }
                          if ((a = i.value).id !== t || a.appRecord.id !== n) {
                            e.next = 7;
                            break;
                          }
                          return e.abrupt("return", a);
                        case 7:
                          e.next = 3;
                          break;
                        case 9:
                          e.next = 14;
                          break;
                        case 11:
                          (e.prev = 11), (e.t0 = e.catch(1)), o.e(e.t0);
                        case 14:
                          return (e.prev = 14), o.f(), e.finish(14);
                        case 17:
                          return e.abrupt("return", null);
                        case 18:
                        case "end":
                          return e.stop();
                      }
                  },
                  e,
                  null,
                  [[1, 11, 14, 17]]
                );
              })
            )).apply(this, arguments);
          }
          function i() {
            return (i = p(
              c().mark(function e(t, n) {
                var o;
                return c().wrap(function (e) {
                  for (;;)
                    switch ((e.prev = e.next)) {
                      case 0:
                        return (
                          (e.next = 2),
                          t.appRecord.backend.api.getInspectorTree(
                            t.id,
                            t.appRecord.options.app,
                            t.treeFilter
                          )
                        );
                      case 2:
                        (o = e.sent),
                          n.bridge.send(
                            r.BridgeEvents.TO_FRONT_CUSTOM_INSPECTOR_TREE,
                            {
                              appId: t.appRecord.id,
                              inspectorId: t.id,
                              rootNodes: o,
                            }
                          );
                      case 4:
                      case "end":
                        return e.stop();
                    }
                }, e);
              })
            )).apply(this, arguments);
          }
          function s() {
            return (s = p(
              c().mark(function e(t, n) {
                var o;
                return c().wrap(function (e) {
                  for (;;)
                    switch ((e.prev = e.next)) {
                      case 0:
                        if (!t.selectedNodeId) {
                          e.next = 6;
                          break;
                        }
                        return (
                          (e.next = 3),
                          t.appRecord.backend.api.getInspectorState(
                            t.id,
                            t.appRecord.options.app,
                            t.selectedNodeId
                          )
                        );
                      case 3:
                        (e.t0 = e.sent), (e.next = 7);
                        break;
                      case 6:
                        e.t0 = null;
                      case 7:
                        (o = e.t0),
                          n.bridge.send(
                            r.BridgeEvents.TO_FRONT_CUSTOM_INSPECTOR_STATE,
                            {
                              appId: t.appRecord.id,
                              inspectorId: t.id,
                              state: (0, r.stringify)(o),
                            }
                          );
                      case 9:
                      case "end":
                        return e.stop();
                    }
                }, e);
              })
            )).apply(this, arguments);
          }
          function u() {
            return (u = p(
              c().mark(function e(t, n, o, i, s, u) {
                return c().wrap(function (e) {
                  for (;;)
                    switch ((e.prev = e.next)) {
                      case 0:
                        return (
                          (e.next = 2),
                          t.appRecord.backend.api.editInspectorState(
                            t.id,
                            t.appRecord.options.app,
                            n,
                            o,
                            i,
                            a(
                              a({}, s),
                              {},
                              {
                                value:
                                  null != s.value
                                    ? (0, r.parse)(s.value, !0)
                                    : s.value,
                              }
                            )
                          )
                        );
                      case 2:
                      case "end":
                        return e.stop();
                    }
                }, e);
              })
            )).apply(this, arguments);
          }
          function d() {
            return (d = p(
              c().mark(function e(t) {
                var n, o, i, a, s, u;
                return c().wrap(function (e) {
                  for (;;)
                    switch ((e.prev = e.next)) {
                      case 0:
                        (i = []), (a = l(t.customInspectors));
                        try {
                          for (a.s(); !(s = a.n()).done; )
                            (u = s.value),
                              i.push({
                                id: u.id,
                                appId: u.appRecord.id,
                                pluginId: u.plugin.descriptor.id,
                                label: u.label,
                                icon: u.icon,
                                treeFilterPlaceholder: u.treeFilterPlaceholder,
                                stateFilterPlaceholder:
                                  u.stateFilterPlaceholder,
                                noSelectionText: u.noSelectionText,
                                actions:
                                  null === (n = u.actions) || void 0 === n
                                    ? void 0
                                    : n.map(function (e) {
                                        return {
                                          icon: e.icon,
                                          tooltip: e.tooltip,
                                        };
                                      }),
                                nodeActions:
                                  null === (o = u.nodeActions) || void 0 === o
                                    ? void 0
                                    : o.map(function (e) {
                                        return {
                                          icon: e.icon,
                                          tooltip: e.tooltip,
                                        };
                                      }),
                              });
                        } catch (e) {
                          a.e(e);
                        } finally {
                          a.f();
                        }
                        t.bridge.send(
                          r.BridgeEvents.TO_FRONT_CUSTOM_INSPECTOR_LIST,
                          { inspectors: i }
                        );
                      case 4:
                      case "end":
                        return e.stop();
                    }
                }, e);
              })
            )).apply(this, arguments);
          }
          function f() {
            return (f = p(
              c().mark(function e(t, n, o) {
                return c().wrap(function (e) {
                  for (;;)
                    switch ((e.prev = e.next)) {
                      case 0:
                        o.bridge.send(
                          r.BridgeEvents.TO_FRONT_CUSTOM_INSPECTOR_SELECT_NODE,
                          {
                            appId: t.appRecord.id,
                            inspectorId: t.id,
                            nodeId: n,
                          }
                        );
                      case 1:
                      case "end":
                        return e.stop();
                    }
                }, e);
              })
            )).apply(this, arguments);
          }
          (t.getInspector = function (e, t, n) {
            return n.customInspectors.find(function (n) {
              return n.id === e && n.appRecord.options.app === t;
            });
          }),
            (t.getInspectorWithAppId = function (e, t, n) {
              return o.apply(this, arguments);
            }),
            (t.sendInspectorTree = function (e, t) {
              return i.apply(this, arguments);
            }),
            (t.sendInspectorState = function (e, t) {
              return s.apply(this, arguments);
            }),
            (t.editInspectorState = function (e, t, n, r, o, i) {
              return u.apply(this, arguments);
            }),
            (t.sendCustomInspectors = function (e) {
              return d.apply(this, arguments);
            }),
            (t.selectInspectorNode = function (e, t, n) {
              return f.apply(this, arguments);
            });
        },
      "../app-backend-core/lib/legacy/scan.js":
        /*!**********************************************!*\
      !*** ../app-backend-core/lib/legacy/scan.js ***!
      \**********************************************/
        function (e, t, n) {
          Object.defineProperty(t, "__esModule", { value: !0 }),
            (t.scan = void 0);
          var r = n(
              /*! @vue-devtools/shared-utils */ "../shared-utils/lib/index.js"
            ),
            o = n(
              /*! ../page-config */ "../app-backend-core/lib/page-config.js"
            ),
            i = [];
          t.scan = function () {
            i.length = 0;
            var e = !1,
              t = null;
            function n(n) {
              if (n) {
                -1 === i.indexOf(n.$root) && (n = n.$root),
                  n._isFragment && ((e = !0), (t = n));
                for (var r = n.constructor; r.super; ) r = r.super;
                return r.config && r.config.devtools && i.push(n), !0;
              }
            }
            if (r.isBrowser) {
              var a = function (r) {
                !(function e(t, n) {
                  if (t.childNodes)
                    for (var r = 0, o = t.childNodes.length; r < o; r++) {
                      var i = t.childNodes[r];
                      n(i) || e(i, n);
                    }
                  t.shadowRoot && e(t.shadowRoot, n);
                })(r, function (r) {
                  return e
                    ? (r === t._fragmentEnd && ((e = !1), (t = null)), !0)
                    : n(r.__vue__);
                });
              };
              a(document);
              var s,
                c = document.querySelectorAll("iframe"),
                u = l(c);
              try {
                for (u.s(); !(s = u.n()).done; ) {
                  var p = s.value;
                  try {
                    a(p.contentDocument);
                  } catch (e) {}
                }
              } catch (e) {
                u.e(e);
              } finally {
                u.f();
              }
              var d,
                f = (0, o.getPageConfig)().customVue2ScanSelector,
                h = f ? document.querySelectorAll(f) : [],
                v = l(h);
              try {
                for (v.s(); !(d = v.n()).done; ) {
                  var m = d.value;
                  try {
                    a(m);
                  } catch (e) {}
                }
              } catch (e) {
                v.e(e);
              } finally {
                v.f();
              }
            } else
              Array.isArray(r.target.__VUE_ROOT_INSTANCES__) &&
                r.target.__VUE_ROOT_INSTANCES__.map(n);
            return i;
          };
        },
      "../app-backend-core/lib/page-config.js":
        /*!**********************************************!*\
      !*** ../app-backend-core/lib/page-config.js ***!
      \**********************************************/
        function (e, t, n) {
          Object.defineProperty(t, "__esModule", { value: !0 }),
            (t.initOnPageConfig = t.getPageConfig = void 0);
          var r = n(
              /*! @vue-devtools/shared-utils */ "../shared-utils/lib/index.js"
            ),
            o = {};
          (t.getPageConfig = function () {
            return o;
          }),
            (t.initOnPageConfig = function () {
              Object.hasOwnProperty.call(r.target, "VUE_DEVTOOLS_CONFIG") &&
                ((o = r.SharedData.pageConfig = r.target.VUE_DEVTOOLS_CONFIG),
                Object.hasOwnProperty.call(o, "openInEditorHost") &&
                  (r.SharedData.openInEditorHost = o.openInEditorHost));
            });
        },
      "../app-backend-core/lib/perf.js":
        /*!***************************************!*\
      !*** ../app-backend-core/lib/perf.js ***!
      \***************************************/
        function (e, t, n) {
          Object.defineProperty(t, "__esModule", { value: !0 }),
            (t.handleAddPerformanceTag =
              t.performanceMarkEnd =
              t.performanceMarkStart =
                void 0);
          var r = n(
              /*! @vue-devtools/shared-utils */ "../shared-utils/lib/index.js"
            ),
            o = n(/*! ./timeline */ "../app-backend-core/lib/timeline.js"),
            i = n(/*! ./app */ "../app-backend-core/lib/app.js"),
            a = n(/*! ./component */ "../app-backend-core/lib/component.js"),
            s = n(
              /*! ./util/subscriptions */ "../app-backend-core/lib/util/subscriptions.js"
            );
          function u() {
            return (u = p(
              c().mark(function e(t, n, a, s, u, p) {
                var f, h, v, m, g, _, b, y, E, k;
                return c().wrap(
                  function (e) {
                    for (;;)
                      switch ((e.prev = e.next)) {
                        case 0:
                          if (
                            ((e.prev = 0),
                            r.SharedData.performanceMonitoringEnabled)
                          ) {
                            e.next = 3;
                            break;
                          }
                          return e.abrupt("return");
                        case 3:
                          return (e.next = 5), (0, i.getAppRecord)(t, p);
                        case 5:
                          return (
                            (f = e.sent),
                            (e.next = 8),
                            f.backend.api.getComponentName(a)
                          );
                        case 8:
                          return (
                            (h = e.sent),
                            (v = p.perfUniqueGroupId++),
                            (m = "".concat(n, "-").concat(s)),
                            f.perfGroupIds.set(m, { groupId: v, time: u }),
                            (e.next = 14),
                            (0, o.addTimelineEvent)(
                              {
                                layerId: "performance",
                                event: {
                                  time: u,
                                  data: {
                                    component: h,
                                    type: s,
                                    measure: "start",
                                  },
                                  title: h,
                                  subtitle: s,
                                  groupId: v,
                                },
                              },
                              t,
                              p
                            )
                          );
                        case 14:
                          if (!l.has(m)) {
                            e.next = 19;
                            break;
                          }
                          return (
                            (g = l.get(m)),
                            (_ = g.app),
                            (b = g.uid),
                            (y = g.instance),
                            (E = g.type),
                            (k = g.time),
                            l.delete(m),
                            (e.next = 19),
                            d(_, b, y, E, k, p)
                          );
                        case 19:
                          e.next = 24;
                          break;
                        case 21:
                          (e.prev = 21),
                            (e.t0 = e.catch(0)),
                            r.SharedData.debugInfo && console.error(e.t0);
                        case 24:
                        case "end":
                          return e.stop();
                      }
                  },
                  e,
                  null,
                  [[0, 21]]
                );
              })
            )).apply(this, arguments);
          }
          t.performanceMarkStart = function (e, t, n, r, o, i) {
            return u.apply(this, arguments);
          };
          var l = new Map();
          function d(e, t, n, r, o, i) {
            return f.apply(this, arguments);
          }
          function f() {
            return (f = p(
              c().mark(function e(t, n, u, p, d, f) {
                var h, v, m, g, _, b, y, E, k, O, T;
                return c().wrap(
                  function (e) {
                    for (;;)
                      switch ((e.prev = e.next)) {
                        case 0:
                          if (
                            ((e.prev = 0),
                            r.SharedData.performanceMonitoringEnabled)
                          ) {
                            e.next = 3;
                            break;
                          }
                          return e.abrupt("return");
                        case 3:
                          return (e.next = 5), (0, i.getAppRecord)(t, f);
                        case 5:
                          return (
                            (h = e.sent),
                            (e.next = 8),
                            h.backend.api.getComponentName(u)
                          );
                        case 8:
                          if (
                            ((v = e.sent),
                            (m = "".concat(n, "-").concat(p)),
                            (g = h.perfGroupIds.get(m)))
                          ) {
                            e.next = 14;
                            break;
                          }
                          return (
                            l.set(m, {
                              app: t,
                              uid: n,
                              instance: u,
                              type: p,
                              time: d,
                            }),
                            e.abrupt("return")
                          );
                        case 14:
                          return (
                            (_ = g.groupId),
                            (b = g.time),
                            (y = d - b),
                            (e.next = 18),
                            (0, o.addTimelineEvent)(
                              {
                                layerId: "performance",
                                event: {
                                  time: d,
                                  data: {
                                    component: v,
                                    type: p,
                                    measure: "end",
                                    duration: {
                                      _custom: {
                                        type: "Duration",
                                        value: y,
                                        display: "".concat(y, " ms"),
                                      },
                                    },
                                  },
                                  title: v,
                                  subtitle: p,
                                  groupId: _,
                                },
                              },
                              t,
                              f
                            )
                          );
                        case 18:
                          if (!(E = y > 10) && !u.__VUE_DEVTOOLS_SLOW__) {
                            e.next = 30;
                            break;
                          }
                          if (
                            ((k = !1),
                            E &&
                              !u.__VUE_DEVTOOLS_SLOW__ &&
                              (u.__VUE_DEVTOOLS_SLOW__ = {
                                duration: null,
                                measures: {},
                              }),
                            (O = u.__VUE_DEVTOOLS_SLOW__),
                            E &&
                              (null == O.duration || O.duration < y) &&
                              ((O.duration = y), (k = !0)),
                            (null == O.measures[p] || O.measures[p] < y) &&
                              ((O.measures[p] = y), (k = !0)),
                            !k)
                          ) {
                            e.next = 30;
                            break;
                          }
                          return (
                            (e.next = 28), (0, a.getComponentId)(t, n, u, f)
                          );
                        case 28:
                          (T = e.sent),
                            (0, s.isSubscribed)(
                              r.BridgeSubscriptions.COMPONENT_TREE,
                              function (e) {
                                return e.payload.instanceId === T;
                              }
                            ) &&
                              (0, r.raf)(function () {
                                (0,
                                a.sendComponentTreeData)(h, T, f.currentAppRecord.componentFilter, null, !1, f);
                              });
                        case 30:
                          e.next = 35;
                          break;
                        case 32:
                          (e.prev = 32),
                            (e.t0 = e.catch(0)),
                            r.SharedData.debugInfo && console.error(e.t0);
                        case 35:
                        case "end":
                          return e.stop();
                      }
                  },
                  e,
                  null,
                  [[0, 32]]
                );
              })
            )).apply(this, arguments);
          }
          (t.performanceMarkEnd = d),
            (t.handleAddPerformanceTag = function (e, t) {
              e.api.on.visitComponentTree(function (e) {
                if (e.componentInstance.__VUE_DEVTOOLS_SLOW__) {
                  var t = e.componentInstance.__VUE_DEVTOOLS_SLOW__,
                    n = t.duration,
                    r = t.measures,
                    o =
                      '<div class="grid grid-cols-2 gap-2 font-mono text-xs">';
                  for (var i in r) {
                    var a = r[i];
                    o += "<div>"
                      .concat(
                        i,
                        '</div><div class="text-right text-black rounded px-1 '
                      )
                      .concat(
                        a > 30
                          ? "bg-red-400"
                          : a > 10
                          ? "bg-yellow-400"
                          : "bg-green-400",
                        '">'
                      )
                      .concat(Math.round(1e3 * a) / 1e3, " ms</div>");
                  }
                  (o += "</div>"),
                    e.treeNode.tags.push({
                      backgroundColor: n > 30 ? 16281969 : 16498468,
                      textColor: 0,
                      label: "".concat(Math.round(1e3 * n) / 1e3, " ms"),
                      tooltip: o,
                    });
                }
              });
            });
        },
      "../app-backend-core/lib/plugin.js":
        /*!*****************************************!*\
      !*** ../app-backend-core/lib/plugin.js ***!
      \*****************************************/
        function (e, t, n) {
          Object.defineProperty(t, "__esModule", { value: !0 }),
            (t.serializePlugin =
              t.sendPluginList =
              t.addPreviouslyRegisteredPlugins =
              t.addQueuedPlugins =
              t.addPlugin =
                void 0);
          var r = n(
              /*! @vue-devtools/app-backend-api */ "../app-backend-api/lib/index.js"
            ),
            o = n(
              /*! @vue-devtools/shared-utils */ "../shared-utils/lib/index.js"
            ),
            i = n(/*! ./app */ "../app-backend-core/lib/app.js");
          function a(e, t) {
            return s.apply(this, arguments);
          }
          function s() {
            return (s = p(
              c().mark(function e(t, n) {
                var a, s, u, l, p;
                return c().wrap(
                  function (e) {
                    for (;;)
                      switch ((e.prev = e.next)) {
                        case 0:
                          return (
                            (a = t.pluginDescriptor),
                            (s = t.setupFn),
                            (u = { descriptor: a, setupFn: s, error: null }),
                            (n.currentPlugin = u),
                            (e.prev = 3),
                            (e.next = 6),
                            (0, i.getAppRecord)(u.descriptor.app, n)
                          );
                        case 6:
                          if (
                            ((l = e.sent),
                            (p = new r.DevtoolsPluginApiInstance(u, l, n)),
                            !t.proxy)
                          ) {
                            e.next = 13;
                            break;
                          }
                          return (e.next = 11), t.proxy.setRealTarget(p);
                        case 11:
                          e.next = 14;
                          break;
                        case 13:
                          s(p);
                        case 14:
                          e.next = 20;
                          break;
                        case 16:
                          (e.prev = 16),
                            (e.t0 = e.catch(3)),
                            (u.error = e.t0),
                            o.SharedData.debugInfo && console.error(e.t0);
                        case 20:
                          return (
                            (n.currentPlugin = null),
                            n.plugins.push(u),
                            (e.t1 = n.bridge),
                            (e.t2 =
                              o.BridgeEvents.TO_FRONT_DEVTOOLS_PLUGIN_ADD),
                            (e.next = 26),
                            h(u)
                          );
                        case 26:
                          (e.t3 = e.sent),
                            (e.t4 = { plugin: e.t3 }),
                            e.t1.send.call(e.t1, e.t2, e.t4),
                            (o.target.__VUE_DEVTOOLS_REGISTERED_PLUGINS__ =
                              o.target.__VUE_DEVTOOLS_REGISTERED_PLUGINS__ ||
                              []).push({ pluginDescriptor: a, setupFn: s });
                        case 31:
                        case "end":
                          return e.stop();
                      }
                  },
                  e,
                  null,
                  [[3, 16]]
                );
              })
            )).apply(this, arguments);
          }
          function u() {
            return (u = p(
              c().mark(function e(t) {
                var n, r, i;
                return c().wrap(
                  function (e) {
                    for (;;)
                      switch ((e.prev = e.next)) {
                        case 0:
                          if (
                            !o.target.__VUE_DEVTOOLS_PLUGINS__ ||
                            !Array.isArray(o.target.__VUE_DEVTOOLS_PLUGINS__)
                          ) {
                            e.next = 19;
                            break;
                          }
                          (n = l(o.target.__VUE_DEVTOOLS_PLUGINS__)),
                            (e.prev = 2),
                            n.s();
                        case 4:
                          if ((r = n.n()).done) {
                            e.next = 10;
                            break;
                          }
                          return (i = r.value), (e.next = 8), a(i, t);
                        case 8:
                          e.next = 4;
                          break;
                        case 10:
                          e.next = 15;
                          break;
                        case 12:
                          (e.prev = 12), (e.t0 = e.catch(2)), n.e(e.t0);
                        case 15:
                          return (e.prev = 15), n.f(), e.finish(15);
                        case 18:
                          o.target.__VUE_DEVTOOLS_PLUGINS__ = null;
                        case 19:
                        case "end":
                          return e.stop();
                      }
                  },
                  e,
                  null,
                  [[2, 12, 15, 18]]
                );
              })
            )).apply(this, arguments);
          }
          function d() {
            return (d = p(
              c().mark(function e(t) {
                var n, r, i;
                return c().wrap(
                  function (e) {
                    for (;;)
                      switch ((e.prev = e.next)) {
                        case 0:
                          if (
                            !o.target.__VUE_DEVTOOLS_REGISTERED_PLUGINS__ ||
                            !Array.isArray(
                              o.target.__VUE_DEVTOOLS_REGISTERED_PLUGINS__
                            )
                          ) {
                            e.next = 18;
                            break;
                          }
                          (n = l(o.target.__VUE_DEVTOOLS_REGISTERED_PLUGINS__)),
                            (e.prev = 2),
                            n.s();
                        case 4:
                          if ((r = n.n()).done) {
                            e.next = 10;
                            break;
                          }
                          return (i = r.value), (e.next = 8), a(i, t);
                        case 8:
                          e.next = 4;
                          break;
                        case 10:
                          e.next = 15;
                          break;
                        case 12:
                          (e.prev = 12), (e.t0 = e.catch(2)), n.e(e.t0);
                        case 15:
                          return (e.prev = 15), n.f(), e.finish(15);
                        case 18:
                        case "end":
                          return e.stop();
                      }
                  },
                  e,
                  null,
                  [[2, 12, 15, 18]]
                );
              })
            )).apply(this, arguments);
          }
          function f() {
            return (f = p(
              c().mark(function e(t) {
                return c().wrap(function (e) {
                  for (;;)
                    switch ((e.prev = e.next)) {
                      case 0:
                        return (
                          (e.t0 = t.bridge),
                          (e.t1 = o.BridgeEvents.TO_FRONT_DEVTOOLS_PLUGIN_LIST),
                          (e.next = 4),
                          Promise.all(
                            t.plugins.map(function (e) {
                              return h(e);
                            })
                          )
                        );
                      case 4:
                        (e.t2 = e.sent),
                          (e.t3 = { plugins: e.t2 }),
                          e.t0.send.call(e.t0, e.t1, e.t3);
                      case 7:
                      case "end":
                        return e.stop();
                    }
                }, e);
              })
            )).apply(this, arguments);
          }
          function h(e) {
            return v.apply(this, arguments);
          }
          function v() {
            return (v = p(
              c().mark(function e(t) {
                return c().wrap(function (e) {
                  for (;;)
                    switch ((e.prev = e.next)) {
                      case 0:
                        return e.abrupt("return", {
                          id: t.descriptor.id,
                          label: t.descriptor.label,
                          appId: (0, i.getAppRecordId)(t.descriptor.app),
                          packageName: t.descriptor.packageName,
                          homepage: t.descriptor.homepage,
                          logo: t.descriptor.logo,
                          componentStateTypes: t.descriptor.componentStateTypes,
                          settingsSchema: t.descriptor.settings,
                        });
                      case 1:
                      case "end":
                        return e.stop();
                    }
                }, e);
              })
            )).apply(this, arguments);
          }
          (t.addPlugin = a),
            (t.addQueuedPlugins = function (e) {
              return u.apply(this, arguments);
            }),
            (t.addPreviouslyRegisteredPlugins = function (e) {
              return d.apply(this, arguments);
            }),
            (t.sendPluginList = function (e) {
              return f.apply(this, arguments);
            }),
            (t.serializePlugin = h);
        },
      "../app-backend-core/lib/timeline-builtins.js":
        /*!****************************************************!*\
      !*** ../app-backend-core/lib/timeline-builtins.js ***!
      \****************************************************/
        function (e, t) {
          Object.defineProperty(t, "__esModule", { value: !0 }),
            (t.builtinLayers = void 0),
            (t.builtinLayers = [
              {
                id: "mouse",
                label: "Mouse",
                color: 10768815,
                screenshotOverlayRender: function (e, t) {
                  var n = t.events.find(function (t) {
                    return (
                      t !== e &&
                      t.renderMeta.textEl &&
                      t.data.x === e.data.x &&
                      t.data.y === e.data.y
                    );
                  });
                  if (n) {
                    var r = document.createElement("div");
                    return (
                      (r.innerText = e.data.type),
                      n.renderMeta.textEl.appendChild(r),
                      !1
                    );
                  }
                  var o = document.createElement("div");
                  (o.style.position = "absolute"),
                    (o.style.left = "".concat(e.data.x - 4, "px")),
                    (o.style.top = "".concat(e.data.y - 4, "px")),
                    (o.style.width = "8px"),
                    (o.style.height = "8px"),
                    (o.style.borderRadius = "100%"),
                    (o.style.backgroundColor = "rgba(164, 81, 175, 0.5)");
                  var i = document.createElement("div");
                  return (
                    (i.innerText = e.data.type),
                    (i.style.color = "#541e5b"),
                    (i.style.fontFamily = "monospace"),
                    (i.style.fontSize = "9px"),
                    (i.style.position = "absolute"),
                    (i.style.left = "10px"),
                    (i.style.top = "10px"),
                    (i.style.padding = "1px"),
                    (i.style.backgroundColor = "rgba(255, 255, 255, 0.9)"),
                    (i.style.borderRadius = "3px"),
                    o.appendChild(i),
                    (e.renderMeta.textEl = i),
                    o
                  );
                },
              },
              { id: "keyboard", label: "Keyboard", color: 8475055 },
              {
                id: "component-event",
                label: "Component events",
                color: 4307075,
                screenshotOverlayRender: function (e, t) {
                  var n = t.events;
                  if (
                    !e.meta.bounds ||
                    n.some(function (t) {
                      return (
                        t !== e &&
                        t.layerId === e.layerId &&
                        t.renderMeta.drawn &&
                        (t.meta.componentId === e.meta.componentId ||
                          (t.meta.bounds.left === e.meta.bounds.left &&
                            t.meta.bounds.top === e.meta.bounds.top &&
                            t.meta.bounds.width === e.meta.bounds.width &&
                            t.meta.bounds.height === e.meta.bounds.height))
                      );
                    })
                  )
                    return !1;
                  var r = document.createElement("div");
                  (r.style.position = "absolute"),
                    (r.style.left = "".concat(e.meta.bounds.left - 4, "px")),
                    (r.style.top = "".concat(e.meta.bounds.top - 4, "px")),
                    (r.style.width = "".concat(e.meta.bounds.width, "px")),
                    (r.style.height = "".concat(e.meta.bounds.height, "px")),
                    (r.style.borderRadius = "8px"),
                    (r.style.borderStyle = "solid"),
                    (r.style.borderWidth = "4px"),
                    (r.style.borderColor = "rgba(65, 184, 131, 0.5)"),
                    (r.style.textAlign = "center"),
                    (r.style.display = "flex"),
                    (r.style.alignItems = "center"),
                    (r.style.justifyContent = "center"),
                    (r.style.overflow = "hidden");
                  var o = document.createElement("div");
                  return (
                    (o.style.color = "#267753"),
                    (o.style.fontFamily = "monospace"),
                    (o.style.fontSize = "9px"),
                    (o.style.padding = "1px"),
                    (o.style.backgroundColor = "rgba(255, 255, 255, 0.9)"),
                    (o.style.borderRadius = "3px"),
                    (o.innerText = e.data.event),
                    r.appendChild(o),
                    (e.renderMeta.drawn = !0),
                    r
                  );
                },
              },
              {
                id: "performance",
                label: "Performance",
                color: 4307050,
                groupsOnly: !0,
                skipScreenshots: !0,
                ignoreNoDurationGroups: !0,
              },
            ]);
        },
      "../app-backend-core/lib/timeline-marker.js":
        /*!**************************************************!*\
      !*** ../app-backend-core/lib/timeline-marker.js ***!
      \**************************************************/
        function (e, t, n) {
          Object.defineProperty(t, "__esModule", { value: !0 }),
            (t.sendTimelineMarkers = t.addTimelineMarker = void 0);
          var r = n(
              /*! @vue-devtools/shared-utils */ "../shared-utils/lib/index.js"
            ),
            o = n(/*! @vue/devtools-api */ "../api/lib/esm/index.js"),
            i = n(/*! ./timeline */ "../app-backend-core/lib/timeline.js");
          function s() {
            return (s = p(
              c().mark(function e(t, n) {
                var o, i;
                return c().wrap(function (e) {
                  for (;;)
                    switch ((e.prev = e.next)) {
                      case 0:
                        return (
                          n.currentAppRecord || (t.all = !0),
                          (i = a(
                            a({}, t),
                            {},
                            { appRecord: t.all ? null : n.currentAppRecord }
                          )),
                          n.timelineMarkers.push(i),
                          (e.t0 = n.bridge),
                          (e.t1 = r.BridgeEvents.TO_FRONT_TIMELINE_MARKER),
                          (e.next = 7),
                          d(i)
                        );
                      case 7:
                        (e.t2 = e.sent),
                          (e.t3 =
                            null === (o = n.currentAppRecord) || void 0 === o
                              ? void 0
                              : o.id),
                          (e.t4 = { marker: e.t2, appId: e.t3 }),
                          e.t0.send.call(e.t0, e.t1, e.t4);
                      case 11:
                      case "end":
                        return e.stop();
                    }
                }, e);
              })
            )).apply(this, arguments);
          }
          function u() {
            return (u = p(
              c().mark(function e(t) {
                var n, o, i, a, s;
                return c().wrap(
                  function (e) {
                    for (;;)
                      switch ((e.prev = e.next)) {
                        case 0:
                          if (t.currentAppRecord) {
                            e.next = 2;
                            break;
                          }
                          return e.abrupt("return");
                        case 2:
                          (n = t.timelineMarkers.filter(function (e) {
                            return e.all || e.appRecord === t.currentAppRecord;
                          })),
                            (o = []),
                            (i = l(n)),
                            (e.prev = 5),
                            i.s();
                        case 7:
                          if ((a = i.n()).done) {
                            e.next = 16;
                            break;
                          }
                          return (s = a.value), (e.t0 = o), (e.next = 12), d(s);
                        case 12:
                          (e.t1 = e.sent), e.t0.push.call(e.t0, e.t1);
                        case 14:
                          e.next = 7;
                          break;
                        case 16:
                          e.next = 21;
                          break;
                        case 18:
                          (e.prev = 18), (e.t2 = e.catch(5)), i.e(e.t2);
                        case 21:
                          return (e.prev = 21), i.f(), e.finish(21);
                        case 24:
                          t.bridge.send(
                            r.BridgeEvents.TO_FRONT_TIMELINE_LOAD_MARKERS,
                            { markers: o, appId: t.currentAppRecord.id }
                          );
                        case 25:
                        case "end":
                          return e.stop();
                      }
                  },
                  e,
                  null,
                  [[5, 18, 21, 24]]
                );
              })
            )).apply(this, arguments);
          }
          function d(e) {
            return f.apply(this, arguments);
          }
          function f() {
            return (f = p(
              c().mark(function e(t) {
                var n, r;
                return c().wrap(function (e) {
                  for (;;)
                    switch ((e.prev = e.next)) {
                      case 0:
                        return (
                          (r = t.time),
                          (0, o.isPerformanceSupported)() &&
                            r < i.dateThreshold &&
                            (r += i.perfTimeDiff),
                          e.abrupt("return", {
                            id: t.id,
                            appId:
                              null === (n = t.appRecord) || void 0 === n
                                ? void 0
                                : n.id,
                            all: t.all,
                            time: Math.round(1e3 * r),
                            label: t.label,
                            color: t.color,
                          })
                        );
                      case 3:
                      case "end":
                        return e.stop();
                    }
                }, e);
              })
            )).apply(this, arguments);
          }
          (t.addTimelineMarker = function (e, t) {
            return s.apply(this, arguments);
          }),
            (t.sendTimelineMarkers = function (e) {
              return u.apply(this, arguments);
            });
        },
      "../app-backend-core/lib/timeline-screenshot.js":
        /*!******************************************************!*\
      !*** ../app-backend-core/lib/timeline-screenshot.js ***!
      \******************************************************/
        function (e, t, n) {
          Object.defineProperty(t, "__esModule", { value: !0 }),
            (t.showScreenshot = void 0);
          var r,
            o,
            i,
            s = n(
              /*! @vue-devtools/shared-utils */ "../shared-utils/lib/index.js"
            ),
            u = n(/*! ./util/queue */ "../app-backend-core/lib/util/queue.js"),
            l = n(
              /*! ./timeline-builtins */ "../app-backend-core/lib/timeline-builtins.js"
            ),
            d = new u.JobQueue();
          function f() {
            return (f = p(
              c().mark(function e(t, n) {
                return c().wrap(function (e) {
                  for (;;)
                    switch ((e.prev = e.next)) {
                      case 0:
                        return (
                          (e.next = 2),
                          d.queue(
                            "showScreenshot",
                            p(
                              c().mark(function e() {
                                var r, u, p, d, f, _, b;
                                return c().wrap(
                                  function (e) {
                                    for (;;)
                                      switch ((e.prev = e.next)) {
                                        case 0:
                                          if (!t) {
                                            e.next = 28;
                                            break;
                                          }
                                          i || h(),
                                            (o.src = t.image),
                                            (o.style.visibility = t.image
                                              ? "visible"
                                              : "hidden"),
                                            g(),
                                            (r = t.events
                                              .map(function (e) {
                                                return n.timelineEventMap.get(
                                                  e
                                                );
                                              })
                                              .filter(Boolean)
                                              .map(function (e) {
                                                return {
                                                  layer: l.builtinLayers
                                                    .concat(n.timelineLayers)
                                                    .find(function (t) {
                                                      return t.id === e.layerId;
                                                    }),
                                                  event: a(
                                                    a({}, e.event),
                                                    {},
                                                    {
                                                      layerId: e.layerId,
                                                      renderMeta: {},
                                                    }
                                                  ),
                                                };
                                              })),
                                            (u = {
                                              screenshot: t,
                                              events: r.map(function (e) {
                                                return e.event;
                                              }),
                                              index: 0,
                                            }),
                                            (p = 0);
                                        case 8:
                                          if (!(p < r.length)) {
                                            e.next = 25;
                                            break;
                                          }
                                          if (
                                            ((d = r[p]),
                                            (f = d.layer),
                                            (_ = d.event),
                                            !f.screenshotOverlayRender)
                                          ) {
                                            e.next = 22;
                                            break;
                                          }
                                          return (
                                            (u.index = p),
                                            (e.prev = 12),
                                            (e.next = 15),
                                            f.screenshotOverlayRender(_, u)
                                          );
                                        case 15:
                                          !1 !== (b = e.sent) &&
                                            ("string" == typeof b
                                              ? (i.innerHTML += b)
                                              : i.appendChild(b)),
                                            (e.next = 22);
                                          break;
                                        case 19:
                                          (e.prev = 19),
                                            (e.t0 = e.catch(12)),
                                            s.SharedData.debugInfo &&
                                              console.error(e.t0);
                                        case 22:
                                          p++, (e.next = 8);
                                          break;
                                        case 25:
                                          v(), (e.next = 29);
                                          break;
                                        case 28:
                                          m();
                                        case 29:
                                        case "end":
                                          return e.stop();
                                      }
                                  },
                                  e,
                                  null,
                                  [[12, 19]]
                                );
                              })
                            )
                          )
                        );
                      case 2:
                      case "end":
                        return e.stop();
                    }
                }, e);
              })
            )).apply(this, arguments);
          }
          function h() {
            ((r = document.createElement("div")).style.position = "fixed"),
              (r.style.zIndex = "9999999999999"),
              (r.style.pointerEvents = "none"),
              (r.style.left = "0"),
              (r.style.top = "0"),
              (r.style.width = "100vw"),
              (r.style.height = "100vh"),
              (r.style.backgroundColor = "rgba(0,0,0,0.5)"),
              (r.style.overflow = "hidden");
            var e = document.createElement("div");
            (e.style.position = "relative"),
              r.appendChild(e),
              (o = document.createElement("img")),
              e.appendChild(o),
              ((i = document.createElement("div")).style.position = "absolute"),
              (i.style.left = "0"),
              (i.style.top = "0"),
              e.appendChild(i);
            var t = document.createElement("style");
            (t.innerHTML = ".__vuedevtools_no-scroll { overflow: hidden; }"),
              document.head.appendChild(t);
          }
          function v() {
            r.parentNode ||
              (document.body.appendChild(r),
              document.body.classList.add("__vuedevtools_no-scroll"));
          }
          function m() {
            r &&
              r.parentNode &&
              (r.parentNode.removeChild(r),
              document.body.classList.remove("__vuedevtools_no-scroll"),
              g());
          }
          function g() {
            for (; i.firstChild; ) i.removeChild(i.lastChild);
          }
          t.showScreenshot = function (e, t) {
            return f.apply(this, arguments);
          };
        },
      "../app-backend-core/lib/timeline.js":
        /*!*******************************************!*\
      !*** ../app-backend-core/lib/timeline.js ***!
      \*******************************************/
        function (e, t, n) {
          Object.defineProperty(t, "__esModule", { value: !0 }),
            (t.sendTimelineLayerEvents =
              t.removeLayersForApp =
              t.sendTimelineEventData =
              t.clearTimeline =
              t.perfTimeDiff =
              t.dateThreshold =
              t.addTimelineEvent =
              t.sendTimelineLayers =
              t.addBuiltinLayers =
              t.setupTimeline =
                void 0);
          var r = n(
              /*! @vue-devtools/shared-utils */ "../shared-utils/lib/index.js"
            ),
            o = n(/*! @vue/devtools-api */ "../api/lib/esm/index.js"),
            i = n(
              /*! ./global-hook */ "../app-backend-core/lib/global-hook.js"
            ),
            s = n(/*! ./app */ "../app-backend-core/lib/app.js"),
            u = n(
              /*! ./timeline-builtins */ "../app-backend-core/lib/timeline-builtins.js"
            );
          function d() {
            return (d = p(
              c().mark(function e(t) {
                var n, o, i, a, s, u;
                return c().wrap(function (e) {
                  for (;;)
                    switch ((e.prev = e.next)) {
                      case 0:
                        (i = []), (a = l(t.timelineLayers));
                        try {
                          for (a.s(); !(s = a.n()).done; ) {
                            u = s.value;
                            try {
                              i.push({
                                id: u.id,
                                label: u.label,
                                color: u.color,
                                appId:
                                  null === (n = u.appRecord) || void 0 === n
                                    ? void 0
                                    : n.id,
                                pluginId:
                                  null === (o = u.plugin) || void 0 === o
                                    ? void 0
                                    : o.descriptor.id,
                                groupsOnly: u.groupsOnly,
                                skipScreenshots: u.skipScreenshots,
                                ignoreNoDurationGroups:
                                  u.ignoreNoDurationGroups,
                              });
                            } catch (e) {
                              r.SharedData.debugInfo && console.error(e);
                            }
                          }
                        } catch (e) {
                          a.e(e);
                        } finally {
                          a.f();
                        }
                        t.bridge.send(
                          r.BridgeEvents.TO_FRONT_TIMELINE_LAYER_LIST,
                          { layers: i }
                        );
                      case 4:
                      case "end":
                        return e.stop();
                    }
                }, e);
              })
            )).apply(this, arguments);
          }
          function f(e, t, n) {
            return h.apply(this, arguments);
          }
          function h() {
            return (h = p(
              c().mark(function e(t, n, o) {
                var i, u, l, p, d;
                return c().wrap(function (e) {
                  for (;;)
                    switch ((e.prev = e.next)) {
                      case 0:
                        (i = n ? (0, s.getAppRecordId)(n) : null),
                          (u = t.all || !n || null == i),
                          (l = o.nextTimelineEventId++),
                          (p = a(a({ id: l }, t), {}, { all: u })),
                          o.timelineEventMap.set(p.id, p),
                          o.bridge.send(
                            r.BridgeEvents.TO_FRONT_TIMELINE_EVENT,
                            {
                              appId: p.all ? "all" : i,
                              layerId: p.layerId,
                              event: m(p),
                            }
                          ),
                          (d = o.timelineLayers.find(function (e) {
                            var r;
                            return (
                              (u ||
                                (null === (r = e.appRecord) || void 0 === r
                                  ? void 0
                                  : r.options.app) === n) &&
                              e.id === t.layerId
                            );
                          }))
                            ? d.events.push(p)
                            : r.SharedData.debugInfo &&
                              console.warn(
                                "Timeline layer ".concat(
                                  t.layerId,
                                  " not found"
                                )
                              );
                      case 8:
                      case "end":
                        return e.stop();
                    }
                }, e);
              })
            )).apply(this, arguments);
          }
          (t.setupTimeline = function (e) {
            !(function (e) {
              r.isBrowser &&
                (["mousedown", "mouseup", "click", "dblclick"].forEach(
                  function (t) {
                    window.addEventListener(
                      t,
                      (function () {
                        var n = p(
                          c().mark(function n(r) {
                            return c().wrap(function (n) {
                              for (;;)
                                switch ((n.prev = n.next)) {
                                  case 0:
                                    return (
                                      (n.next = 2),
                                      f(
                                        {
                                          layerId: "mouse",
                                          event: {
                                            time: (0, o.now)(),
                                            data: {
                                              type: t,
                                              x: r.clientX,
                                              y: r.clientY,
                                            },
                                            title: t,
                                          },
                                        },
                                        null,
                                        e
                                      )
                                    );
                                  case 2:
                                  case "end":
                                    return n.stop();
                                }
                            }, n);
                          })
                        );
                        return function (e) {
                          return n.apply(this, arguments);
                        };
                      })(),
                      { capture: !0, passive: !0 }
                    );
                  }
                ),
                ["keyup", "keydown", "keypress"].forEach(function (t) {
                  window.addEventListener(
                    t,
                    (function () {
                      var n = p(
                        c().mark(function n(r) {
                          return c().wrap(function (n) {
                            for (;;)
                              switch ((n.prev = n.next)) {
                                case 0:
                                  return (
                                    (n.next = 2),
                                    f(
                                      {
                                        layerId: "keyboard",
                                        event: {
                                          time: (0, o.now)(),
                                          data: {
                                            type: t,
                                            key: r.key,
                                            ctrlKey: r.ctrlKey,
                                            shiftKey: r.shiftKey,
                                            altKey: r.altKey,
                                            metaKey: r.metaKey,
                                          },
                                          title: r.key,
                                        },
                                      },
                                      null,
                                      e
                                    )
                                  );
                                case 2:
                                case "end":
                                  return n.stop();
                              }
                          }, n);
                        })
                      );
                      return function (e) {
                        return n.apply(this, arguments);
                      };
                    })(),
                    { capture: !0, passive: !0 }
                  );
                }));
              i.hook.on(
                r.HookEvents.COMPONENT_EMIT,
                (function () {
                  var t = p(
                    c().mark(function t(n, i, a, u) {
                      var l, p, d;
                      return c().wrap(
                        function (t) {
                          for (;;)
                            switch ((t.prev = t.next)) {
                              case 0:
                                if (
                                  ((t.prev = 0),
                                  r.SharedData.componentEventsEnabled)
                                ) {
                                  t.next = 3;
                                  break;
                                }
                                return t.abrupt("return");
                              case 3:
                                return (t.next = 5), (0, s.getAppRecord)(n, e);
                              case 5:
                                return (
                                  (l = t.sent),
                                  (p = "".concat(l.id, ":").concat(i.uid)),
                                  (t.next = 9),
                                  l.backend.api.getComponentName(i)
                                );
                              case 9:
                                if (((t.t0 = t.sent), t.t0)) {
                                  t.next = 12;
                                  break;
                                }
                                t.t0 = "<i>Unknown Component</i>";
                              case 12:
                                return (
                                  (d = t.t0),
                                  (t.t1 = f),
                                  (t.t2 = (0, o.now)()),
                                  (t.t3 = {
                                    component: {
                                      _custom: {
                                        type: "component-definition",
                                        display: d,
                                      },
                                    },
                                    event: a,
                                    params: u,
                                  }),
                                  (t.t4 = a),
                                  (t.t5 = "by ".concat(d)),
                                  (t.t6 = p),
                                  (t.next = 21),
                                  l.backend.api.getComponentBounds(i)
                                );
                              case 21:
                                return (
                                  (t.t7 = t.sent),
                                  (t.t8 = { componentId: t.t6, bounds: t.t7 }),
                                  (t.t9 = {
                                    time: t.t2,
                                    data: t.t3,
                                    title: t.t4,
                                    subtitle: t.t5,
                                    meta: t.t8,
                                  }),
                                  (t.t10 = {
                                    layerId: "component-event",
                                    event: t.t9,
                                  }),
                                  (t.t11 = n),
                                  (t.t12 = e),
                                  (t.next = 29),
                                  (0, t.t1)(t.t10, t.t11, t.t12)
                                );
                              case 29:
                                t.next = 34;
                                break;
                              case 31:
                                (t.prev = 31),
                                  (t.t13 = t.catch(0)),
                                  r.SharedData.debugInfo &&
                                    console.error(t.t13);
                              case 34:
                              case "end":
                                return t.stop();
                            }
                        },
                        t,
                        null,
                        [[0, 31]]
                      );
                    })
                  );
                  return function (e, n, r, o) {
                    return t.apply(this, arguments);
                  };
                })()
              );
            })(e);
          }),
            (t.addBuiltinLayers = function (e, t) {
              var n,
                r = l(u.builtinLayers);
              try {
                for (r.s(); !(n = r.n()).done; ) {
                  var o = n.value;
                  t.timelineLayers.push(
                    a(a({}, o), {}, { appRecord: e, plugin: null, events: [] })
                  );
                }
              } catch (e) {
                r.e(e);
              } finally {
                r.f();
              }
            }),
            (t.sendTimelineLayers = function (e) {
              return d.apply(this, arguments);
            }),
            (t.addTimelineEvent = f);
          var v = Date.now();
          function m(e) {
            var n = e.event.time;
            return (
              (0, o.isPerformanceSupported)() &&
                n < t.dateThreshold &&
                (n += t.perfTimeDiff),
              {
                id: e.id,
                time: Math.round(1e3 * n),
                logType: e.event.logType,
                groupId: e.event.groupId,
                title: e.event.title,
                subtitle: e.event.subtitle,
              }
            );
          }
          function g() {
            return (g = p(
              c().mark(function e(t) {
                var n, r, o, i, a;
                return c().wrap(
                  function (e) {
                    for (;;)
                      switch ((e.prev = e.next)) {
                        case 0:
                          t.timelineEventMap.clear(), (n = l(t.timelineLayers));
                          try {
                            for (n.s(); !(r = n.n()).done; )
                              r.value.events = [];
                          } catch (e) {
                            n.e(e);
                          } finally {
                            n.f();
                          }
                          (o = l(t.backends)), (e.prev = 4), o.s();
                        case 6:
                          if ((i = o.n()).done) {
                            e.next = 12;
                            break;
                          }
                          return (
                            (a = i.value), (e.next = 10), a.api.clearTimeline()
                          );
                        case 10:
                          e.next = 6;
                          break;
                        case 12:
                          e.next = 17;
                          break;
                        case 14:
                          (e.prev = 14), (e.t0 = e.catch(4)), o.e(e.t0);
                        case 17:
                          return (e.prev = 17), o.f(), e.finish(17);
                        case 20:
                        case "end":
                          return e.stop();
                      }
                  },
                  e,
                  null,
                  [[4, 14, 17, 20]]
                );
              })
            )).apply(this, arguments);
          }
          function _() {
            return (_ = p(
              c().mark(function e(t, n) {
                var o, i;
                return c().wrap(function (e) {
                  for (;;)
                    switch ((e.prev = e.next)) {
                      case 0:
                        if (((o = null), !(i = n.timelineEventMap.get(t)))) {
                          e.next = 9;
                          break;
                        }
                        return (
                          (e.next = 5),
                          n.currentAppRecord.backend.api.inspectTimelineEvent(
                            i,
                            n.currentAppRecord.options.app
                          )
                        );
                      case 5:
                        (o = e.sent), (o = (0, r.stringify)(o)), (e.next = 10);
                        break;
                      case 9:
                        r.SharedData.debugInfo &&
                          console.warn(
                            "Event ".concat(t, " not found"),
                            n.timelineEventMap.keys()
                          );
                      case 10:
                        n.bridge.send(
                          r.BridgeEvents.TO_FRONT_TIMELINE_EVENT_DATA,
                          { eventId: t, data: o }
                        );
                      case 11:
                      case "end":
                        return e.stop();
                    }
                }, e);
              })
            )).apply(this, arguments);
          }
          (t.dateThreshold = v - 1e6),
            (t.perfTimeDiff = v - (0, o.now)()),
            (t.clearTimeline = function (e) {
              return g.apply(this, arguments);
            }),
            (t.sendTimelineEventData = function (e, t) {
              return _.apply(this, arguments);
            }),
            (t.removeLayersForApp = function (e, t) {
              var n,
                r = t.timelineLayers.filter(function (t) {
                  var n;
                  return (
                    (null === (n = t.appRecord) || void 0 === n
                      ? void 0
                      : n.options.app) === e
                  );
                }),
                o = l(r);
              try {
                for (o.s(); !(n = o.n()).done; ) {
                  var i = n.value,
                    a = t.timelineLayers.indexOf(i);
                  -1 !== a && t.timelineLayers.splice(a, 1);
                  var s,
                    c = l(i.events);
                  try {
                    for (c.s(); !(s = c.n()).done; ) {
                      var u = s.value;
                      t.timelineEventMap.delete(u.id);
                    }
                  } catch (e) {
                    c.e(e);
                  } finally {
                    c.f();
                  }
                }
              } catch (e) {
                o.e(e);
              } finally {
                o.f();
              }
            }),
            (t.sendTimelineLayerEvents = function (e, t, n) {
              var o,
                i =
                  null ===
                    (o = n.appRecords.find(function (t) {
                      return t.id === e;
                    })) || void 0 === o
                    ? void 0
                    : o.options.app;
              if (i) {
                var a = n.timelineLayers.find(function (e) {
                  var n;
                  return (
                    (null === (n = e.appRecord) || void 0 === n
                      ? void 0
                      : n.options.app) === i && e.id === t
                  );
                });
                a &&
                  n.bridge.send(
                    r.BridgeEvents.TO_FRONT_TIMELINE_LAYER_LOAD_EVENTS,
                    {
                      appId: e,
                      layerId: t,
                      events: a.events.map(function (e) {
                        return m(e);
                      }),
                    }
                  );
              }
            });
        },
      "../app-backend-core/lib/util/queue.js":
        /*!*********************************************!*\
      !*** ../app-backend-core/lib/util/queue.js ***!
      \*********************************************/
        function (e, t) {
          Object.defineProperty(t, "__esModule", { value: !0 }),
            (t.JobQueue = void 0);
          var n = (function () {
            return f(
              function e() {
                d(this, e), (this.jobs = []);
              },
              [
                {
                  key: "queue",
                  value: function (e, t) {
                    var n = this,
                      r = { id: e, fn: t };
                    return new Promise(function (e) {
                      var t = function () {
                          n.currentJob = null;
                          var t = n.jobs.shift();
                          t && t.fn(), e();
                        },
                        o = function () {
                          return (
                            (n.currentJob = r),
                            r
                              .fn()
                              .then(t)
                              .catch(function (e) {
                                console.error("Job ".concat(r.id, " failed:")),
                                  console.error(e);
                              })
                          );
                        };
                      n.currentJob
                        ? n.jobs.push({
                            id: r.id,
                            fn: function () {
                              return o();
                            },
                          })
                        : o();
                    });
                  },
                },
              ]
            );
          })();
          t.JobQueue = n;
        },
      "../app-backend-core/lib/util/subscriptions.js":
        /*!*****************************************************!*\
      !*** ../app-backend-core/lib/util/subscriptions.js ***!
      \*****************************************************/
        function (e, t) {
          Object.defineProperty(t, "__esModule", { value: !0 }),
            (t.isSubscribed = t.unsubscribe = t.subscribe = void 0);
          var n = new Map();
          function r(e) {
            var t = n.get(e);
            return t || ((t = []), n.set(e, t)), t;
          }
          function o(e) {
            var t = Object.keys(e)
              .sort()
              .reduce(function (t, n) {
                return (t[n] = e[n]), t;
              }, {});
            return JSON.stringify(t);
          }
          (t.subscribe = function (e, t) {
            var n = o(t);
            r(e).push({ payload: t, rawPayload: n });
          }),
            (t.unsubscribe = function (e, t) {
              for (
                var n, i = o(t), a = r(e);
                -1 !==
                (n = a.findIndex(function (e) {
                  return e.rawPayload === i;
                }));

              )
                a.splice(n, 1);
            }),
            (t.isSubscribed = function (e) {
              var t =
                arguments.length > 1 && void 0 !== arguments[1]
                  ? arguments[1]
                  : function () {
                      return !0;
                    };
              return r(e).some(t);
            });
        },
      "../app-backend-vue3/lib/components/data.js":
        /*!**************************************************!*\
      !*** ../app-backend-vue3/lib/components/data.js ***!
      \**************************************************/
        function (e, t, n) {
          Object.defineProperty(t, "__esModule", { value: !0 }),
            (t.getCustomInstanceDetails =
              t.editState =
              t.getCustomObjectDetails =
              t.getInstanceDetails =
                void 0);
          var r = n(/*! ./util */ "../app-backend-vue3/lib/components/util.js"),
            o = n(
              /*! @vue-devtools/shared-utils */ "../shared-utils/lib/index.js"
            ),
            s = n(/*! ../util */ "../app-backend-vue3/lib/util.js"),
            c = [
              "nextTick",
              "defineComponent",
              "defineAsyncComponent",
              "defineCustomElement",
              "ref",
              "computed",
              "reactive",
              "readonly",
              "watchEffect",
              "watchPostEffect",
              "watchSyncEffect",
              "watch",
              "isRef",
              "unref",
              "toRef",
              "toRefs",
              "isProxy",
              "isReactive",
              "isReadonly",
              "shallowRef",
              "triggerRef",
              "customRef",
              "shallowReactive",
              "shallowReadonly",
              "toRaw",
              "markRaw",
              "effectScope",
              "getCurrentScope",
              "onScopeDispose",
              "onMounted",
              "onUpdated",
              "onUnmounted",
              "onBeforeMount",
              "onBeforeUpdate",
              "onBeforeUnmount",
              "onErrorCaptured",
              "onRenderTracked",
              "onRenderTriggered",
              "onActivated",
              "onDeactivated",
              "onServerPrefetch",
              "provide",
              "inject",
              "h",
              "mergeProps",
              "cloneVNode",
              "isVNode",
              "resolveComponent",
              "resolveDirective",
              "withDirectives",
              "withModifiers",
            ];
          function u(e) {
            var t = (function (e) {
              var t = e.type,
                n = t.mixins,
                r = t.extends,
                o = e.appContext.mixins;
              if (!o.length && !n && !r) return t;
              var i = {};
              return (
                o.forEach(function (t) {
                  return b(i, t, e);
                }),
                b(i, t, e),
                i
              );
            })(e);
            return (function (e) {
              var t = [],
                n = e.type.props,
                r = function (r) {
                  var i = n ? n[r] : null;
                  (r = (0, o.camelize)(r)),
                    t.push({
                      type: "props",
                      key: r,
                      value: (0, s.returnError)(function () {
                        return e.props[r];
                      }),
                      meta: i
                        ? a(
                            {
                              type: i.type ? p(i.type) : "any",
                              required: !!i.required,
                            },
                            null != i.default
                              ? { default: i.default.toString() }
                              : {}
                          )
                        : { type: "invalid" },
                      editable: o.SharedData.editableProps,
                    });
                };
              for (var i in e.props) r(i);
              return t;
            })(e).concat(
              (function (e) {
                var t = e.type,
                  n = t.props,
                  r = t.vuex && t.vuex.getters,
                  o = t.computed,
                  i = a(a({}, e.data), e.renderContext);
                return Object.keys(i)
                  .filter(function (e) {
                    return !((n && e in n) || (r && e in r) || (o && e in o));
                  })
                  .map(function (e) {
                    return {
                      key: e,
                      type: "data",
                      value: (0, s.returnError)(function () {
                        return i[e];
                      }),
                      editable: !0,
                    };
                  });
              })(e),
              (function (e) {
                var t = e.devtoolsRawSetupState || {};
                return Object.keys(e.setupState)
                  .filter(function (e) {
                    return !c.includes(e) && !e.startsWith("use");
                  })
                  .map(function (n) {
                    var r,
                      o,
                      i,
                      c,
                      u,
                      l = (0, s.returnError)(function () {
                        return m(e.setupState[n]);
                      }),
                      p = t[n],
                      d =
                        "function" == typeof l ||
                        "function" == typeof (null == l ? void 0 : l.render) ||
                        "function" ==
                          typeof (null == l ? void 0 : l.__asyncLoader);
                    if (p) {
                      var f = g(p),
                        h = f.computed
                          ? "Computed"
                          : f.ref
                          ? "Ref"
                          : f.reactive
                          ? "Reactive"
                          : null,
                        v = f.ref || f.computed || f.reactive,
                        _ =
                          (null ===
                            (o =
                              null === (r = p.effect) || void 0 === r
                                ? void 0
                                : r.raw) || void 0 === o
                            ? void 0
                            : o.toString()) ||
                          (null ===
                            (c =
                              null === (i = p.effect) || void 0 === i
                                ? void 0
                                : i.fn) || void 0 === c
                            ? void 0
                            : c.toString());
                      h && (d = !1),
                        (u = a(
                          a(
                            a({}, h ? { objectType: h } : {}),
                            _ ? { raw: _ } : {}
                          ),
                          {},
                          { editable: v && !f.readonly }
                        ));
                    }
                    return a(
                      { key: n, value: l, type: d ? "setup (other)" : "setup" },
                      u
                    );
                  });
              })(e),
              (function (e, t) {
                var n = [],
                  r = t.computed || {},
                  o = function (t) {
                    var o = r[t],
                      i =
                        "function" == typeof o && o.vuex
                          ? "vuex bindings"
                          : "computed";
                    n.push({
                      type: i,
                      key: t,
                      value: (0, s.returnError)(function () {
                        return e.proxy[t];
                      }),
                      editable: "function" == typeof o.set,
                    });
                  };
                for (var i in r) o(i);
                return n;
              })(e, t),
              (function (e) {
                return Object.keys(e.attrs).map(function (t) {
                  return {
                    type: "attrs",
                    key: t,
                    value: (0, s.returnError)(function () {
                      return e.attrs[t];
                    }),
                  };
                });
              })(e),
              (function (e) {
                return Reflect.ownKeys(e.provides).map(function (t) {
                  return {
                    type: "provided",
                    key: t.toString(),
                    value: (0, s.returnError)(function () {
                      return e.provides[t];
                    }),
                  };
                });
              })(e),
              (function (e, t) {
                if (!(null == t ? void 0 : t.inject)) return [];
                var n,
                  r = [];
                r = Array.isArray(t.inject)
                  ? t.inject.map(function (e) {
                      return { key: e, originalKey: e };
                    })
                  : Reflect.ownKeys(t.inject).map(function (e) {
                      var r,
                        o = t.inject[e];
                      return (
                        "string" == typeof o || "symbol" === i(o)
                          ? (r = o)
                          : ((r = o.from), (n = o.default)),
                        { key: e, originalKey: r }
                      );
                    });
                return r.map(function (t) {
                  var r = t.key,
                    o = t.originalKey;
                  return {
                    type: "injected",
                    key:
                      o && r !== o
                        ? "".concat(o.toString(), " ➞ ").concat(r.toString())
                        : r.toString(),
                    value: (0, s.returnError)(function () {
                      return e.ctx[r] || e.provides[o] || n;
                    }),
                  };
                });
              })(e, t),
              (function (e) {
                return Object.keys(e.refs).map(function (t) {
                  return {
                    type: "refs",
                    key: t,
                    value: (0, s.returnError)(function () {
                      return e.refs[t];
                    }),
                  };
                });
              })(e)
            );
          }
          t.getInstanceDetails = function (e, t) {
            var n;
            return {
              id: (0, r.getUniqueComponentId)(e, t),
              name: (0, r.getInstanceName)(e),
              file: null === (n = e.type) || void 0 === n ? void 0 : n.__file,
              state: u(e),
            };
          };
          var l = /^(?:function|class) (\w+)/;
          function p(e) {
            if (Array.isArray(e))
              return e
                .map(function (e) {
                  return p(e);
                })
                .join(" or ");
            if (null == e) return "null";
            var t = e.toString().match(l);
            return ("function" == typeof e && t && t[1]) || "any";
          }
          function d(e) {
            return !!e.__v_isRef;
          }
          function f(e) {
            return d(e) && !!e.effect;
          }
          function h(e) {
            return !!e.__v_isReactive;
          }
          function v(e) {
            return !!e.__v_isReadonly;
          }
          function m(e) {
            return (null == e ? void 0 : e.__v_raw) ? e.__v_raw : e;
          }
          function g(e) {
            return {
              ref: d(e),
              computed: f(e),
              reactive: h(e),
              readonly: v(e),
            };
          }
          function _(e) {
            if (e.length)
              return e.reduce(function (e, t) {
                var n = t.type || "data";
                return ((e[n] = e[n] || {})[t.key] = t.value), e;
              }, {});
          }
          function b(e, t, n) {
            if (("function" == typeof t && (t = t.options), !t)) return e;
            var r = t,
              o = r.mixins,
              i = r.extends;
            i && b(e, i, n),
              o &&
                o.forEach(function (t) {
                  return b(e, t, n);
                });
            for (var a = 0, s = ["computed", "inject"]; a < s.length; a++) {
              var c = s[a];
              Object.prototype.hasOwnProperty.call(t, c) &&
                (e[c] ? Object.assign(e[c], t[c]) : (e[c] = t[c]));
            }
            return e;
          }
          (t.getCustomObjectDetails = function (e, t) {
            var n,
              r,
              o,
              i,
              s = g(e);
            if (s.ref || s.computed || s.reactive) {
              var c = s.computed
                  ? "Computed"
                  : s.ref
                  ? "Ref"
                  : s.reactive
                  ? "Reactive"
                  : null,
                u = m(s.reactive ? e : e._value),
                l =
                  (null ===
                    (r =
                      null === (n = e.effect) || void 0 === n
                        ? void 0
                        : n.raw) || void 0 === r
                    ? void 0
                    : r.toString()) ||
                  (null ===
                    (i =
                      null === (o = e.effect) || void 0 === o
                        ? void 0
                        : o.fn) || void 0 === i
                    ? void 0
                    : i.toString());
              return {
                _custom: a(
                  { type: c.toLowerCase(), objectType: c, value: u },
                  l
                    ? {
                        tooltip: '<span class="font-mono">'.concat(
                          l,
                          "</span>"
                        ),
                      }
                    : {}
                ),
              };
            }
            if ("function" == typeof e.__asyncLoader)
              return {
                _custom: {
                  type: "component-definition",
                  display: "Async component definition",
                },
              };
          }),
            (t.editState = function (e, t, n) {
              var r = e.componentInstance,
                o = e.path,
                i = e.state,
                a = e.type;
              if (["data", "props", "computed", "setup"].includes(a)) {
                var s,
                  c = o.slice();
                if (Object.keys(r.props).includes(o[0])) s = r.props;
                else if (
                  r.devtoolsRawSetupState &&
                  Object.keys(r.devtoolsRawSetupState).includes(o[0])
                ) {
                  s = r.devtoolsRawSetupState;
                  var u = t.get(r.devtoolsRawSetupState, o);
                  if (null != u) if (g(u).readonly) return;
                } else s = r.proxy;
                s &&
                  c &&
                  t.set(
                    s,
                    c,
                    "value" in i ? i.value : void 0,
                    t.createDefaultSetCallback(i)
                  );
              }
            }),
            (t.getCustomInstanceDetails = function (e) {
              e._ && (e = e._);
              var t = u(e);
              return {
                _custom: {
                  type: "component",
                  id: e.__VUE_DEVTOOLS_UID__,
                  display: (0, r.getInstanceName)(e),
                  tooltip: "Component instance",
                  value: _(t),
                  fields: { abstract: !0 },
                },
              };
            });
        },
      "../app-backend-vue3/lib/components/el.js":
        /*!************************************************!*\
      !*** ../app-backend-vue3/lib/components/el.js ***!
      \************************************************/
        function (e, t, n) {
          Object.defineProperty(t, "__esModule", { value: !0 }),
            (t.getInstanceOrVnodeRect =
              t.getRootElementsFromComponentInstance =
              t.getComponentInstanceFromElement =
                void 0);
          n(/*! @vue-devtools/shared-utils */ "../shared-utils/lib/index.js"),
            n(/*! ./util */ "../app-backend-vue3/lib/components/util.js");
          function r(e) {
            return [];
          }
          function o(e) {}
          (t.getComponentInstanceFromElement = function (e) {
            return e.__vueParentComponent;
          }),
            (t.getRootElementsFromComponentInstance = r),
            (t.getInstanceOrVnodeRect = o);
        },
      "../app-backend-vue3/lib/components/filter.js":
        /*!****************************************************!*\
      !*** ../app-backend-vue3/lib/components/filter.js ***!
      \****************************************************/
        function (e, t, n) {
          Object.defineProperty(t, "__esModule", { value: !0 }),
            (t.ComponentFilter = void 0);
          var r = n(
              /*! @vue-devtools/shared-utils */ "../shared-utils/lib/index.js"
            ),
            o = n(/*! ./util */ "../app-backend-vue3/lib/components/util.js"),
            i = (function () {
              return f(
                function e(t) {
                  d(this, e), (this.filter = t || "");
                },
                [
                  {
                    key: "isQualified",
                    value: function (e) {
                      var t = (0, o.getInstanceName)(e);
                      return (
                        (0, r.classify)(t).toLowerCase().indexOf(this.filter) >
                          -1 ||
                        (0, r.kebabize)(t).toLowerCase().indexOf(this.filter) >
                          -1
                      );
                    },
                  },
                ]
              );
            })();
          t.ComponentFilter = i;
        },
      "../app-backend-vue3/lib/components/tree.js":
        /*!**************************************************!*\
      !*** ../app-backend-vue3/lib/components/tree.js ***!
      \**************************************************/
        function (e, t, n) {
          Object.defineProperty(t, "__esModule", { value: !0 }),
            (t.ComponentWalker = void 0);
          var r = n(/*! ./util */ "../app-backend-vue3/lib/components/util.js"),
            o = n(
              /*! ./filter */ "../app-backend-vue3/lib/components/filter.js"
            ),
            i = n(/*! ./el */ "../app-backend-vue3/lib/components/el.js"),
            s = (function () {
              return f(
                function e(t, n, r, i, a) {
                  d(this, e),
                    (this.ctx = a),
                    (this.api = i),
                    (this.maxDepth = t),
                    (this.recursively = r),
                    (this.componentFilter = new o.ComponentFilter(n)),
                    (this.uniAppPageNames = [
                      "Page",
                      "KeepAlive",
                      "AsyncComponentWrapper",
                      "BaseTransition",
                      "Transition",
                    ]);
                },
                [
                  {
                    key: "getComponentTree",
                    value: function (e) {
                      return (
                        (this.captureIds = new Map()),
                        this.findQualifiedChildren(e, 0)
                      );
                    },
                  },
                  {
                    key: "getComponentParents",
                    value: function (e) {
                      this.captureIds = new Map();
                      var t = [];
                      this.captureId(e);
                      var n = e;
                      if ("page" === e.ctx.$mpType) {
                        var r = this.ctx.currentAppRecord;
                        this.captureId(r.rootInstance), t.push(r.rootInstance);
                      } else
                        for (; (n = n.parent); ) this.captureId(n), t.push(n);
                      return t;
                    },
                  },
                  {
                    key: "findQualifiedChildren",
                    value:
                      ((n = p(
                        c().mark(function e(t, n) {
                          var r, o;
                          return c().wrap(
                            function (e) {
                              for (;;)
                                switch ((e.prev = e.next)) {
                                  case 0:
                                    if (
                                      !this.componentFilter.isQualified(t) ||
                                      (null === (r = t.type.devtools) ||
                                      void 0 === r
                                        ? void 0
                                        : r.hide)
                                    ) {
                                      e.next = 7;
                                      break;
                                    }
                                    return (
                                      (e.next = 3), this.capture(t, null, n)
                                    );
                                  case 3:
                                    return (
                                      (e.t0 = e.sent),
                                      e.abrupt("return", [e.t0])
                                    );
                                  case 7:
                                    if (!t.subTree) {
                                      e.next = 12;
                                      break;
                                    }
                                    return (
                                      (o = this.isKeepAlive(t)
                                        ? this.getKeepAliveCachedInstances(t)
                                        : this.getInternalInstanceChildrenByInstance(
                                            t
                                          )),
                                      e.abrupt(
                                        "return",
                                        this.findQualifiedChildrenFromList(o, n)
                                      )
                                    );
                                  case 12:
                                    return e.abrupt("return", []);
                                  case 13:
                                  case "end":
                                    return e.stop();
                                }
                            },
                            e,
                            this
                          );
                        })
                      )),
                      function (e, t) {
                        return n.apply(this, arguments);
                      }),
                  },
                  {
                    key: "findQualifiedChildrenFromList",
                    value:
                      ((t = p(
                        c().mark(function e(t, n) {
                          var o = this;
                          return c().wrap(
                            function (e) {
                              for (;;)
                                switch ((e.prev = e.next)) {
                                  case 0:
                                    if (
                                      ((t = t.filter(function (e) {
                                        var t;
                                        return (
                                          !(0, r.isBeingDestroyed)(e) &&
                                          !(null === (t = e.type.devtools) ||
                                          void 0 === t
                                            ? void 0
                                            : t.hide)
                                        );
                                      })),
                                      this.componentFilter.filter)
                                    ) {
                                      e.next = 5;
                                      break;
                                    }
                                    return e.abrupt(
                                      "return",
                                      Promise.all(
                                        t.map(function (e, t, r) {
                                          return o.capture(e, r, n);
                                        })
                                      )
                                    );
                                  case 5:
                                    return (
                                      (e.t0 = Array.prototype.concat),
                                      (e.t1 = []),
                                      (e.next = 9),
                                      Promise.all(
                                        t.map(function (e) {
                                          return o.findQualifiedChildren(e, n);
                                        })
                                      )
                                    );
                                  case 9:
                                    return (
                                      (e.t2 = e.sent),
                                      e.abrupt(
                                        "return",
                                        e.t0.apply.call(e.t0, e.t1, e.t2)
                                      )
                                    );
                                  case 11:
                                  case "end":
                                    return e.stop();
                                }
                            },
                            e,
                            this
                          );
                        })
                      )),
                      function (e, n) {
                        return t.apply(this, arguments);
                      }),
                  },
                  {
                    key: "getInternalInstanceChildrenByInstance",
                    value: function (e) {
                      var t =
                        arguments.length > 1 && void 0 !== arguments[1]
                          ? arguments[1]
                          : null;
                      return e.ctx.$children
                        ? e.ctx.$children.map(function (e) {
                            return e.$;
                          })
                        : this.getInternalInstanceChildren(e.subTree, t);
                    },
                  },
                  {
                    key: "getInternalInstanceChildren",
                    value: function (e) {
                      var t = this,
                        n =
                          arguments.length > 1 && void 0 !== arguments[1]
                            ? arguments[1]
                            : null,
                        o = [];
                      if (e)
                        if (e.component)
                          this.getInstanceChildrenBySubTreeComponent(o, e, n);
                        else if (e.suspense) {
                          var i = e.suspense.isInFallback
                            ? "suspense fallback"
                            : "suspense default";
                          o.push.apply(
                            o,
                            u(
                              this.getInternalInstanceChildren(
                                e.suspense.activeBranch,
                                a(a({}, e.suspense), {}, { suspenseKey: i })
                              )
                            )
                          );
                        } else
                          Array.isArray(e.children) &&
                            e.children.forEach(function (e) {
                              e.component
                                ? t.getInstanceChildrenBySubTreeComponent(
                                    o,
                                    e,
                                    n
                                  )
                                : o.push.apply(
                                    o,
                                    u(t.getInternalInstanceChildren(e, n))
                                  );
                            });
                      return o.filter(function (e) {
                        var t;
                        return (
                          !(0, r.isBeingDestroyed)(e) &&
                          !(null === (t = e.type.devtools) || void 0 === t
                            ? void 0
                            : t.hide)
                        );
                      });
                    },
                  },
                  {
                    key: "getInstanceChildrenBySubTreeComponent",
                    value: function (e, t, n) {
                      t.type.__reserved ||
                      this.uniAppPageNames.includes(t.type.name)
                        ? e.push.apply(
                            e,
                            u(
                              this.getInternalInstanceChildren(
                                t.component.subTree
                              )
                            )
                          )
                        : n
                        ? e.push(a(a({}, t.component), {}, { suspense: n }))
                        : e.push(t.component);
                    },
                  },
                  {
                    key: "captureId",
                    value: function (e) {
                      if (!e) return null;
                      var t =
                        null != e.__VUE_DEVTOOLS_UID__
                          ? e.__VUE_DEVTOOLS_UID__
                          : (0, r.getUniqueComponentId)(e, this.ctx);
                      return (
                        (e.__VUE_DEVTOOLS_UID__ = t),
                        this.captureIds.has(t)
                          ? void 0
                          : (this.captureIds.set(t, void 0), this.mark(e), t)
                      );
                    },
                  },
                  {
                    key: "capture",
                    value:
                      ((e = p(
                        c().mark(function e(t, n, o) {
                          var s,
                            u,
                            p,
                            d,
                            f,
                            h,
                            v,
                            m,
                            g,
                            _,
                            b,
                            y,
                            E,
                            k,
                            O,
                            T,
                            x,
                            I,
                            C,
                            S,
                            w = this;
                          return c().wrap(
                            function (e) {
                              for (;;)
                                switch ((e.prev = e.next)) {
                                  case 0:
                                    if (t) {
                                      e.next = 2;
                                      break;
                                    }
                                    return e.abrupt("return", null);
                                  case 2:
                                    if (
                                      ((p = this.captureId(t)),
                                      (d = (0, r.getInstanceName)(t)),
                                      (f =
                                        this.getInternalInstanceChildrenByInstance(
                                          t
                                        ).filter(function (e) {
                                          return !(0, r.isBeingDestroyed)(e);
                                        })),
                                      (h = this.getComponentParents(t) || []),
                                      (v =
                                        !!t.isDeactivated ||
                                        h.some(function (e) {
                                          return e.isDeactivated;
                                        })),
                                      (m = {
                                        uid: t.uid,
                                        id: p,
                                        name: d,
                                        renderKey: (0, r.getRenderKey)(
                                          t.vnode ? t.vnode.key : null
                                        ),
                                        inactive: v,
                                        hasChildren: !!f.length,
                                        children: [],
                                        isFragment: (0, r.isFragment)(t),
                                        tags:
                                          "function" != typeof t.type
                                            ? []
                                            : [
                                                {
                                                  label: "functional",
                                                  textColor: 5592405,
                                                  backgroundColor: 15658734,
                                                },
                                              ],
                                        autoOpen: this.recursively,
                                      }),
                                      "page" === t.ctx.mpType &&
                                        (m.route =
                                          t.ctx.$scope.is ||
                                          (null === (s = t.ctx.$scope.$page) ||
                                          void 0 === s
                                            ? void 0
                                            : s.fullPath)),
                                      !(
                                        o < this.maxDepth ||
                                        t.type.__isKeepAlive ||
                                        h.some(function (e) {
                                          return e.type.__isKeepAlive;
                                        })
                                      ))
                                    ) {
                                      e.next = 15;
                                      break;
                                    }
                                    return (
                                      (e.next = 14),
                                      Promise.all(
                                        f
                                          .map(function (e, t, n) {
                                            return w.capture(e, n, o + 1);
                                          })
                                          .filter(Boolean)
                                      )
                                    );
                                  case 14:
                                    m.children = e.sent;
                                  case 15:
                                    if (!this.isKeepAlive(t)) {
                                      e.next = 38;
                                      break;
                                    }
                                    (g = this.getKeepAliveCachedInstances(t)),
                                      (_ = f.map(function (e) {
                                        return e.__VUE_DEVTOOLS_UID__;
                                      })),
                                      (b = l(g)),
                                      (e.prev = 19),
                                      b.s();
                                  case 21:
                                    if ((y = b.n()).done) {
                                      e.next = 30;
                                      break;
                                    }
                                    if (
                                      ((E = y.value),
                                      _.includes(E.__VUE_DEVTOOLS_UID__))
                                    ) {
                                      e.next = 28;
                                      break;
                                    }
                                    return (
                                      (e.next = 26),
                                      this.capture(
                                        a(a({}, E), {}, { isDeactivated: !0 }),
                                        null,
                                        o + 1
                                      )
                                    );
                                  case 26:
                                    (k = e.sent) && m.children.push(k);
                                  case 28:
                                    e.next = 21;
                                    break;
                                  case 30:
                                    e.next = 35;
                                    break;
                                  case 32:
                                    (e.prev = 32),
                                      (e.t0 = e.catch(19)),
                                      b.e(e.t0);
                                  case 35:
                                    return (e.prev = 35), b.f(), e.finish(35);
                                  case 38:
                                    if (
                                      ((O = (0,
                                      i.getRootElementsFromComponentInstance)(
                                        t
                                      )),
                                      null == (T = O[0])
                                        ? void 0
                                        : T.parentElement)
                                    ) {
                                      (x = t.parent),
                                        (I = x
                                          ? (0,
                                            i.getRootElementsFromComponentInstance)(
                                              x
                                            )
                                          : []),
                                        (C = T),
                                        (S = []);
                                      do {
                                        S.push(
                                          Array.from(
                                            C.parentElement.childNodes
                                          ).indexOf(C)
                                        ),
                                          (C = C.parentElement);
                                      } while (
                                        C.parentElement &&
                                        I.length &&
                                        !I.includes(C)
                                      );
                                      m.domOrder = S.reverse();
                                    } else m.domOrder = [-1];
                                    return (
                                      (null === (u = t.suspense) || void 0 === u
                                        ? void 0
                                        : u.suspenseKey) &&
                                        (m.tags.push({
                                          label: t.suspense.suspenseKey,
                                          backgroundColor: 14979812,
                                          textColor: 16777215,
                                        }),
                                        this.mark(t, !0)),
                                      e.abrupt(
                                        "return",
                                        this.api.visitComponentTree(
                                          t,
                                          m,
                                          this.componentFilter.filter,
                                          this.ctx.currentAppRecord.options.app
                                        )
                                      )
                                    );
                                  case 43:
                                  case "end":
                                    return e.stop();
                                }
                            },
                            e,
                            this,
                            [[19, 32, 35, 38]]
                          );
                        })
                      )),
                      function (t, n, r) {
                        return e.apply(this, arguments);
                      }),
                  },
                  {
                    key: "mark",
                    value: function (e) {
                      var t =
                          arguments.length > 1 &&
                          void 0 !== arguments[1] &&
                          arguments[1],
                        n = this.ctx.currentAppRecord.instanceMap;
                      (!t && n.has(e.__VUE_DEVTOOLS_UID__)) ||
                        n.set(e.__VUE_DEVTOOLS_UID__, e);
                    },
                  },
                  {
                    key: "isKeepAlive",
                    value: function (e) {
                      return e.type.__isKeepAlive && e.__v_cache;
                    },
                  },
                  {
                    key: "getKeepAliveCachedInstances",
                    value: function (e) {
                      return Array.from(e.__v_cache.values())
                        .map(function (e) {
                          return e.component;
                        })
                        .filter(Boolean);
                    },
                  },
                ]
              );
              var e, t, n;
            })();
          t.ComponentWalker = s;
        },
      "../app-backend-vue3/lib/components/util.js":
        /*!**************************************************!*\
      !*** ../app-backend-vue3/lib/components/util.js ***!
      \**************************************************/
        function (e, t, n) {
          Object.defineProperty(t, "__esModule", { value: !0 }),
            (t.getComponentInstances =
              t.getRenderKey =
              t.getUniqueComponentId =
              t.getInstanceName =
              t.isFragment =
              t.getAppRecord =
              t.isBeingDestroyed =
                void 0);
          var r = n(
              /*! @vue-devtools/shared-utils */ "../shared-utils/lib/index.js"
            ),
            o = n(/*! ../util */ "../app-backend-vue3/lib/util.js");
          function a(e) {
            if (e.root) return e.appContext.app.__VUE_DEVTOOLS_APP_RECORD__;
          }
          function c(e, t) {
            return (e.type.__vdevtools_guessedName = t), t;
          }
          function l(e) {
            return "app" === e.ctx.$mpType;
          }
          (t.isBeingDestroyed = function (e) {
            return e._isBeingDestroyed || e.isUnmounted;
          }),
            (t.getAppRecord = a),
            (t.isFragment = function (e) {
              var t,
                n = a(e);
              if (n)
                return (
                  n.options.types.Fragment ===
                  (null === (t = e.subTree) || void 0 === t ? void 0 : t.type)
                );
            }),
            (t.getInstanceName = function (e) {
              var t,
                n,
                i,
                a = (function (e) {
                  var t =
                    e.name || e._componentTag || e.__vdevtools_guessedName;
                  if (t) return t;
                  var n = e.__file;
                  if (n) return (0, r.classify)((0, o.basename)(n, ".vue"));
                })(e.type || {});
              if (a) return a;
              if (l(e)) return "Root";
              for (var s in null ===
                (n =
                  null === (t = e.parent) || void 0 === t ? void 0 : t.type) ||
              void 0 === n
                ? void 0
                : n.components)
                if (e.parent.type.components[s] === e.type) return c(e, s);
              for (var u in null === (i = e.appContext) || void 0 === i
                ? void 0
                : i.components)
                if (e.appContext.components[u] === e.type) return c(e, u);
              return "Anonymous Component";
            }),
            (t.getUniqueComponentId = function (e, t) {
              var n = e.appContext.app.__VUE_DEVTOOLS_APP_RECORD_ID__,
                r = l(e) ? "root" : e.uid;
              return "".concat(n, ":").concat(r);
            }),
            (t.getRenderKey = function (e) {
              if (null != e) {
                var t = i(e);
                return "number" === t
                  ? e
                  : "string" === t
                  ? "'".concat(e, "'")
                  : Array.isArray(e)
                  ? "Array"
                  : "Object";
              }
            }),
            (t.getComponentInstances = function (e) {
              var t = e.__VUE_DEVTOOLS_APP_RECORD__,
                n = t.id.toString();
              return u(t.instanceMap)
                .filter(function (e) {
                  return s(e, 1)[0].split(":")[0] === n;
                })
                .map(function (e) {
                  return s(e, 2)[1];
                });
            });
        },
      "../app-backend-vue3/lib/index.js":
        /*!****************************************!*\
      !*** ../app-backend-vue3/lib/index.js ***!
      \****************************************/
        function (e, t, n) {
          Object.defineProperty(t, "__esModule", { value: !0 }),
            (t.backend = void 0);
          var r = n(
              /*! @vue-devtools/app-backend-api */ "../app-backend-api/lib/index.js"
            ),
            o = n(
              /*! ./components/tree */ "../app-backend-vue3/lib/components/tree.js"
            ),
            i = n(
              /*! ./components/data */ "../app-backend-vue3/lib/components/data.js"
            ),
            a = n(
              /*! ./components/util */ "../app-backend-vue3/lib/components/util.js"
            ),
            s = n(
              /*! ./components/el */ "../app-backend-vue3/lib/components/el.js"
            ),
            u = n(
              /*! @vue-devtools/shared-utils */ "../shared-utils/lib/index.js"
            );
          t.backend = (0, r.defineBackend)({
            frameworkVersion: 3,
            features: [],
            setup: function (e) {
              e.on.getAppRecordName(function (e) {
                e.app._component && (e.name = e.app._component.name);
              }),
                e.on.getAppRootInstance(function (e) {
                  var t, n, r, o;
                  e.app._instance
                    ? (e.root = e.app._instance)
                    : (null ===
                        (n =
                          null === (t = e.app._container) || void 0 === t
                            ? void 0
                            : t._vnode) || void 0 === n
                        ? void 0
                        : n.component) &&
                      (e.root =
                        null ===
                          (o =
                            null === (r = e.app._container) || void 0 === r
                              ? void 0
                              : r._vnode) || void 0 === o
                          ? void 0
                          : o.component);
                }),
                e.on.walkComponentTree(
                  (function () {
                    var t = p(
                      c().mark(function t(n, r) {
                        var i;
                        return c().wrap(function (t) {
                          for (;;)
                            switch ((t.prev = t.next)) {
                              case 0:
                                return (
                                  (i = new o.ComponentWalker(
                                    n.maxDepth,
                                    n.filter,
                                    n.recursively,
                                    e,
                                    r
                                  )),
                                  (t.next = 3),
                                  i.getComponentTree(n.componentInstance)
                                );
                              case 3:
                                n.componentTreeData = t.sent;
                              case 4:
                              case "end":
                                return t.stop();
                            }
                        }, t);
                      })
                    );
                    return function (e, n) {
                      return t.apply(this, arguments);
                    };
                  })()
                ),
                e.on.walkComponentParents(function (t, n) {
                  var r = new o.ComponentWalker(0, null, !1, e, n);
                  t.parentInstances = r.getComponentParents(
                    t.componentInstance
                  );
                }),
                e.on.inspectComponent(function (e, t) {
                  (u.backendInjections.getCustomInstanceDetails =
                    i.getCustomInstanceDetails),
                    (u.backendInjections.getCustomObjectDetails =
                      i.getCustomObjectDetails),
                    (u.backendInjections.instanceMap =
                      t.currentAppRecord.instanceMap),
                    (u.backendInjections.isVueInstance = function (e) {
                      return e._ && Object.keys(e._).includes("vnode");
                    }),
                    (e.instanceData = (0, i.getInstanceDetails)(
                      e.componentInstance,
                      t
                    ));
                }),
                e.on.getComponentName(function (e) {
                  e.name = (0, a.getInstanceName)(e.componentInstance);
                }),
                e.on.getComponentBounds(function (e) {
                  e.bounds = (0, s.getInstanceOrVnodeRect)(e.componentInstance);
                }),
                e.on.getElementComponent(function (e) {
                  e.componentInstance = (0, s.getComponentInstanceFromElement)(
                    e.element
                  );
                }),
                e.on.getComponentInstances(function (e) {
                  e.componentInstances = (0, a.getComponentInstances)(e.app);
                }),
                e.on.getComponentRootElements(function (e) {
                  e.rootElements = (0, s.getRootElementsFromComponentInstance)(
                    e.componentInstance
                  );
                }),
                e.on.editComponentState(function (t, n) {
                  (0, i.editState)(t, e.stateEditor, n);
                }),
                e.on.getComponentDevtoolsOptions(function (e) {
                  e.options = e.componentInstance.type.devtools;
                }),
                e.on.getComponentRenderCode(function (e) {
                  e.code =
                    e.componentInstance.type instanceof Function
                      ? e.componentInstance.type.toString()
                      : e.componentInstance.render.toString();
                }),
                e.on.transformCall(function (e) {
                  if (e.callName === u.HookEvents.COMPONENT_UPDATED) {
                    var t = e.inArgs[0];
                    e.outArgs = [
                      t.appContext.app,
                      t.uid,
                      t.parent ? t.parent.uid : void 0,
                      t,
                    ];
                  }
                }),
                (e.stateEditor.isRef = function (e) {
                  return !!(null == e ? void 0 : e.__v_isRef);
                }),
                (e.stateEditor.getRefValue = function (e) {
                  return e.value;
                }),
                (e.stateEditor.setRefValue = function (e, t) {
                  e.value = t;
                });
            },
          });
        },
      "../app-backend-vue3/lib/util.js":
        /*!***************************************!*\
      !*** ../app-backend-vue3/lib/util.js ***!
      \***************************************/
        function (e, t, n) {
          var r =
            (this && this.__importDefault) ||
            function (e) {
              return e && e.__esModule ? e : { default: e };
            };
          Object.defineProperty(t, "__esModule", { value: !0 }),
            (t.returnError = t.basename = t.flatten = void 0);
          var o = r(
            n(/*! path */ "../../node_modules/path-browserify/index.js")
          );
          (t.flatten = function e(t) {
            return t.reduce(function (t, n) {
              return (
                n instanceof Array ? t.push.apply(t, u(e(n))) : n && t.push(n),
                t
              );
            }, []);
          }),
            (t.basename = function (e, t) {
              return o.default.basename(
                e.replace(/^[a-zA-Z]:/, "").replace(/\\/g, "/"),
                t
              );
            }),
            (t.returnError = function (e) {
              try {
                return e();
              } catch (e) {
                return e;
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
                o = function () {
                  var e = r[i];
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
                i = 0;
              i < r.length;
              i++
            )
              o();
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
        function (e, i, a) {
          Object.defineProperty(i, "__esModule", { value: !0 }),
            (i.Bridge = void 0);
          var s = a(/*! events */ "../../node_modules/events/events.js"),
            u = a(/*! ./raf */ "../shared-utils/lib/raf.js"),
            l = (function (e) {
              function i(e) {
                var n, o, a, s;
                return (
                  d(this, i),
                  (o = this),
                  (a = r((a = i))),
                  (n = t(
                    o,
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
                      ? Reflect.construct(a, s || [], r(o).constructor)
                      : a.apply(o, s)
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
                o(i, e),
                f(i, [
                  {
                    key: "on",
                    value: function (e, t) {
                      var o = (function () {
                        var n = p(
                          c().mark(function n() {
                            var r,
                              o,
                              i,
                              a = arguments;
                            return c().wrap(
                              function (n) {
                                for (;;)
                                  switch ((n.prev = n.next)) {
                                    case 0:
                                      for (
                                        r = a.length, o = new Array(r), i = 0;
                                        i < r;
                                        i++
                                      )
                                        o[i] = a[i];
                                      return (
                                        (n.prev = 1),
                                        (n.next = 4),
                                        t.apply(void 0, o)
                                      );
                                    case 4:
                                      n.next = 10;
                                      break;
                                    case 6:
                                      (n.prev = 6),
                                        (n.t0 = n.catch(1)),
                                        console.error(
                                          "[Bridge] Error in listener for event ".concat(
                                            e.toString(),
                                            " with args:"
                                          ),
                                          o
                                        ),
                                        console.error(n.t0);
                                    case 10:
                                    case "end":
                                      return n.stop();
                                  }
                              },
                              n,
                              null,
                              [[1, 6]]
                            );
                          })
                        );
                        return function () {
                          return n.apply(this, arguments);
                        };
                      })();
                      return n(r(i.prototype), "on", this).call(this, e, o);
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
                          (0, u.raf)(function () {
                            return e._nextSend();
                          });
                      }
                    },
                  },
                ])
              );
            })(s.EventEmitter);
          i.Bridge = l;
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
            return f(
              function e() {
                d(this, e);
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
                        o = Array.isArray(t) ? t : t.split(".");
                      o.length > 1;

                    )
                      (e = e[o.shift()]),
                        this.isRef(e) && (e = this.getRefValue(e));
                    var i = o[0];
                    r
                      ? r(e, i, n)
                      : this.isRef(e[i])
                      ? this.setRefValue(e[i], n)
                      : (e[i] = n);
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
                        o = n ? 2 : 1;
                      e && r.length > o;

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
                    return function (n, r, o) {
                      if (
                        ((e.remove || e.newKey) &&
                          (Array.isArray(n) ? n.splice(r, 1) : delete n[r]),
                        !e.remove)
                      ) {
                        var i = n[e.newKey || r];
                        t.isRef(i)
                          ? t.setRefValue(i, o)
                          : (n[e.newKey || r] = o);
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
                    var o = Object.getOwnPropertyDescriptor(t, n);
                    (o &&
                      !("get" in o
                        ? !t.__esModule
                        : o.writable || o.configurable)) ||
                      (o = {
                        enumerable: !0,
                        get: function () {
                          return t[n];
                        },
                      }),
                      Object.defineProperty(e, r, o);
                  }
                : function (e, t, n, r) {
                    void 0 === r && (r = n), (e[r] = t[n]);
                  }),
            o =
              (this && this.__exportStar) ||
              function (e, t) {
                for (var n in e)
                  "default" === n ||
                    Object.prototype.hasOwnProperty.call(t, n) ||
                    r(t, e, n);
              };
          Object.defineProperty(t, "__esModule", { value: !0 }),
            o(n(/*! ./backend */ "../shared-utils/lib/backend.js"), t),
            o(n(/*! ./bridge */ "../shared-utils/lib/bridge.js"), t),
            o(n(/*! ./consts */ "../shared-utils/lib/consts.js"), t),
            o(n(/*! ./edit */ "../shared-utils/lib/edit.js"), t),
            o(n(/*! ./env */ "../shared-utils/lib/env.js"), t),
            o(
              n(
                /*! ./plugin-permissions */ "../shared-utils/lib/plugin-permissions.js"
              ),
              t
            ),
            o(
              n(
                /*! ./plugin-settings */ "../shared-utils/lib/plugin-settings.js"
              ),
              t
            ),
            o(n(/*! ./shared-data */ "../shared-utils/lib/shared-data.js"), t),
            o(n(/*! ./shell */ "../shared-utils/lib/shell.js"), t),
            o(n(/*! ./storage */ "../shared-utils/lib/storage.js"), t),
            o(n(/*! ./transfer */ "../shared-utils/lib/transfer.js"), t),
            o(n(/*! ./util */ "../shared-utils/lib/util.js"), t),
            o(n(/*! ./raf */ "../shared-utils/lib/raf.js"), t);
        },
      "../shared-utils/lib/plugin-permissions.js":
        /*!*************************************************!*\
      !*** ../shared-utils/lib/plugin-permissions.js ***!
      \*************************************************/
        function (t, n, r) {
          Object.defineProperty(n, "__esModule", { value: !0 }),
            (n.setPluginPermission =
              n.hasPluginPermission =
              n.PluginPermission =
                void 0);
          var o = r(/*! ./shared-data */ "../shared-utils/lib/shared-data.js");
          !(function (e) {
            (e.ENABLED = "enabled"),
              (e.COMPONENTS = "components"),
              (e.CUSTOM_INSPECTOR = "custom-inspector"),
              (e.TIMELINE = "timeline");
          })(n.PluginPermission || (n.PluginPermission = {})),
            (n.hasPluginPermission = function (e, t) {
              var n =
                o.SharedData.pluginPermissions["".concat(e, ":").concat(t)];
              return null == n || !!n;
            }),
            (n.setPluginPermission = function (t, n, r) {
              o.SharedData.pluginPermissions = a(
                a({}, o.SharedData.pluginPermissions),
                {},
                e({}, "".concat(t, ":").concat(n), r)
              );
            });
        },
      "../shared-utils/lib/plugin-settings.js":
        /*!**********************************************!*\
      !*** ../shared-utils/lib/plugin-settings.js ***!
      \**********************************************/
        function (t, n, r) {
          Object.defineProperty(n, "__esModule", { value: !0 }),
            (n.getPluginDefaultSettings =
              n.setPluginSettings =
              n.getPluginSettings =
                void 0);
          var o = r(/*! ./shared-data */ "../shared-utils/lib/shared-data.js");
          (n.getPluginSettings = function (e, t) {
            var n;
            return a(
              a({}, null != t ? t : {}),
              null !== (n = o.SharedData.pluginSettings[e]) && void 0 !== n
                ? n
                : {}
            );
          }),
            (n.setPluginSettings = function (t, n) {
              o.SharedData.pluginSettings = a(
                a({}, o.SharedData.pluginSettings),
                {},
                e({}, t, n)
              );
            }),
            (n.getPluginDefaultSettings = function (e) {
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
        function (e, t, n) {
          Object.defineProperty(t, "__esModule", { value: !0 }),
            (t.SharedData =
              t.watchSharedData =
              t.destroySharedData =
              t.onSharedDataInit =
              t.initSharedData =
                void 0);
          var r,
            o,
            i,
            s = n(/*! ./storage */ "../shared-utils/lib/storage.js"),
            c = n(/*! ./env */ "../shared-utils/lib/env.js"),
            u = {
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
              menuStepScrolling: c.isMac,
              pluginPermissions: {},
              pluginSettings: {},
              pageConfig: {},
              legacyApps: !1,
              trackUpdates: !0,
              flashUpdates: !1,
              debugInfo: !1,
              isBrowser: c.isBrowser,
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
            p = !1,
            d = 0,
            f = [];
          (t.initSharedData = function (e) {
            return new Promise(function (t) {
              (r = e.bridge),
                (p = !!e.persist)
                  ? (console.log("[shared data] Master init in progress..."),
                    l.forEach(function (e) {
                      var t = (0, s.getStorage)(
                        "vue-devtools-"
                          .concat("6.0.0-alpha.1", ":shared-data:")
                          .concat(e)
                      );
                      null !== t && (u[e] = t);
                    }),
                    r.on("shared-data:load", function () {
                      Object.keys(u).forEach(function (e) {
                        m(e, u[e]);
                      }),
                        r.send("shared-data:load-complete");
                    }),
                    r.on("shared-data:init-complete", function () {
                      console.log("[shared data] Master init complete"),
                        clearInterval(i),
                        t();
                    }),
                    r.send("shared-data:master-init-waiting"),
                    r.on("shared-data:minion-init-waiting", function () {
                      r.send("shared-data:master-init-waiting");
                    }),
                    (d = 0),
                    clearInterval(i),
                    (i = setInterval(function () {
                      console.log("[shared data] Master init retrying..."),
                        r.send("shared-data:master-init-waiting"),
                        ++d > 30 &&
                          (clearInterval(i),
                          console.error("[shared data] Master init failed"));
                    }, 2e3)))
                  : (r.on("shared-data:master-init-waiting", function () {
                      r.send("shared-data:load"),
                        r.once("shared-data:load-complete", function () {
                          r.send("shared-data:init-complete"), t();
                        });
                    }),
                    r.send("shared-data:minion-init-waiting")),
                (o = a({}, u)),
                e.Vue && (o = e.Vue.observable(o)),
                r.on("shared-data:set", function (e) {
                  v(e.key, e.value);
                }),
                f.forEach(function (e) {
                  return e();
                });
            });
          }),
            (t.onSharedDataInit = function (e) {
              return (
                f.push(e),
                function () {
                  var t = f.indexOf(e);
                  -1 !== t && f.splice(t, 1);
                }
              );
            }),
            (t.destroySharedData = function () {
              r.removeAllListeners("shared-data:set"), (h = {});
            });
          var h = {};
          function v(e, t) {
            p &&
              l.includes(e) &&
              (0, s.setStorage)(
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
          function m(e, t) {
            r && r.send("shared-data:set", { key: e, value: t });
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
          Object.keys(u).forEach(function (e) {
            Object.defineProperty(g, e, {
              configurable: !1,
              get: function () {
                return o[e];
              },
              set: function (t) {
                m(e, t), v(e, t);
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
        function (t, n, r) {
          Object.defineProperty(n, "__esModule", { value: !0 }),
            (n.clearStorage =
              n.removeStorage =
              n.setStorage =
              n.getStorage =
              n.initStorage =
                void 0);
          var o = r(/*! ./env */ "../shared-utils/lib/env.js"),
            i =
              void 0 !== o.target.chrome && void 0 !== o.target.chrome.storage,
            a = null;
          function s() {
            if (!a) throw new Error("Storage wasn't initialized with 'init()'");
          }
          function c(e, t) {
            return null == e ? t : e;
          }
          (n.initStorage = function () {
            return new Promise(function (e) {
              i
                ? o.target.chrome.storage.local.get(null, function (t) {
                    (a = t), e();
                  })
                : ((a = {}), e());
            });
          }),
            (n.getStorage = function (e) {
              var t =
                arguments.length > 1 && void 0 !== arguments[1]
                  ? arguments[1]
                  : null;
              if ((s(), i)) return c(a[e], t);
              try {
                return c(JSON.parse(localStorage.getItem(e)), t);
              } catch (e) {}
            }),
            (n.setStorage = function (t, n) {
              if ((s(), i))
                (a[t] = n), o.target.chrome.storage.local.set(e({}, t, n));
              else
                try {
                  localStorage.setItem(t, JSON.stringify(n));
                } catch (e) {}
            }),
            (n.removeStorage = function (e) {
              if ((s(), i))
                delete a[e], o.target.chrome.storage.local.remove([e]);
              else
                try {
                  localStorage.removeItem(e);
                } catch (e) {}
            }),
            (n.clearStorage = function () {
              if ((s(), i)) (a = {}), o.target.chrome.storage.local.clear();
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
          function n(e, t, r, o) {
            var i,
              a,
              s,
              c,
              u,
              l = o.get(e);
            if (null != l) return l;
            var p = r.length,
              d = Object.prototype.toString.call(e);
            if ("[object Object]" === d) {
              (i = {}), o.set(e, p), r.push(i);
              var f = Object.keys(e);
              for (c = 0, u = f.length; c < u; c++) {
                a = f[c];
                try {
                  (s = e[a]), t && (s = t.call(e, a, s));
                } catch (e) {
                  s = e;
                }
                i[a] = n(s, t, r, o);
              }
            } else if ("[object Array]" === d)
              for (
                i = [], o.set(e, p), r.push(i), c = 0, u = e.length;
                c < u;
                c++
              ) {
                try {
                  (s = e[c]), t && (s = t.call(e, c, s));
                } catch (e) {
                  s = e;
                }
                i[c] = n(s, t, r, o);
              }
            else r.push(e);
            return p;
          }
          function r(e, t) {
            for (var n, r, o, i, a, s, c = e.length; c--; )
              if (
                ((o = e[c]),
                "[object Object]" === (s = Object.prototype.toString.call(o)))
              ) {
                var u = Object.keys(o);
                for (n = 0, r = u.length; n < r; n++)
                  (a = e[o[(i = u[n])]]),
                    t && (a = t.call(o, i, a)),
                    (o[i] = a);
              } else if ("[object Array]" === s)
                for (n = 0, r = o.length; n < r; n++)
                  (a = e[o[n]]), t && (a = t.call(o, n, a)), (o[n] = a);
          }
          function o(e) {
            var t =
                arguments.length > 1 && void 0 !== arguments[1]
                  ? arguments[1]
                  : null,
              r =
                arguments.length > 2 && void 0 !== arguments[2]
                  ? arguments[2]
                  : null,
              o = [];
            return (
              n(e, t, o, new Map()),
              r ? " " + JSON.stringify(o, null, r) : " " + JSON.stringify(o)
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
            } catch (i) {
              t = o(e, n, r);
            }
            if (t.length > 524288) {
              for (
                var i = Math.ceil(t.length / 524288), a = [], s = 0;
                s < i;
                s++
              )
                a.push(t.slice(524288 * s, 524288 * (s + 1)));
              return a;
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
                var o = JSON.parse(e);
                return r(o, t), o[0];
              }
              return 1 === arguments.length ? JSON.parse(e) : JSON.parse(e, t);
            }),
            (t.stringifyStrictCircularAutoChunks = o);
        },
      "../shared-utils/lib/util.js":
        /*!***********************************!*\
      !*** ../shared-utils/lib/util.js ***!
      \***********************************/
        function (e, t, n) {
          var r =
            (this && this.__importDefault) ||
            function (e) {
              return e && e.__esModule ? e : { default: e };
            };
          Object.defineProperty(t, "__esModule", { value: !0 }),
            (t.isEmptyObject =
              t.copyToClipboard =
              t.escape =
              t.openInEditor =
              t.focusInput =
              t.simpleGet =
              t.sortByKey =
              t.searchDeepInObject =
              t.isPlainObject =
              t.revive =
              t.parse =
              t.getCustomRefDetails =
              t.getCustomHTMLElementDetails =
              t.getCustomFunctionDetails =
              t.getCustomComponentDefinitionDetails =
              t.getComponentName =
              t.reviveSet =
              t.getCustomSetDetails =
              t.reviveMap =
              t.getCustomMapDetails =
              t.stringify =
              t.specialTokenToString =
              t.MAX_ARRAY_SIZE =
              t.MAX_STRING_SIZE =
              t.SPECIAL_TOKENS =
              t.NAN =
              t.NEGATIVE_INFINITY =
              t.INFINITY =
              t.UNDEFINED =
              t.inDoc =
              t.getComponentDisplayName =
              t.kebabize =
              t.camelize =
              t.classify =
                void 0);
          var o = r(
              n(/*! path */ "../../node_modules/path-browserify/index.js")
            ),
            c = n(/*! ./transfer */ "../shared-utils/lib/transfer.js"),
            u = n(/*! ./backend */ "../shared-utils/lib/backend.js"),
            l = n(/*! ./shared-data */ "../shared-utils/lib/shared-data.js"),
            p = n(/*! ./env */ "../shared-utils/lib/env.js");
          function h(e) {
            var t = Object.create(null);
            return function (n) {
              return t[n] || (t[n] = e(n));
            };
          }
          var v = /(?:^|[-_/])(\w)/g;
          t.classify = h(function (e) {
            return e && ("" + e).replace(v, _);
          });
          var m = /-(\w)/g;
          t.camelize = h(function (e) {
            return e && e.replace(m, _);
          });
          var g = /([a-z0-9])([A-Z])/g;
          function _(e, t) {
            return t ? t.toUpperCase() : "";
          }
          function b(e) {
            return null === e
              ? "null"
              : e === t.UNDEFINED
              ? "undefined"
              : e === t.NAN
              ? "NaN"
              : e === t.INFINITY
              ? "Infinity"
              : e === t.NEGATIVE_INFINITY && "-Infinity";
          }
          (t.kebabize = h(function (e) {
            return (
              e &&
              e
                .replace(g, function (e, t, n) {
                  return "".concat(t, "-").concat(n);
                })
                .toLowerCase()
            );
          })),
            (t.getComponentDisplayName = function (e) {
              var n =
                arguments.length > 1 && void 0 !== arguments[1]
                  ? arguments[1]
                  : "class";
              switch (n) {
                case "class":
                  return (0, t.classify)(e);
                case "kebab":
                  return (0, t.kebabize)(e);
                case "original":
                default:
                  return e;
              }
            }),
            (t.inDoc = function (e) {
              if (!e) return !1;
              var t = e.ownerDocument.documentElement,
                n = e.parentNode;
              return (
                t === e ||
                t === n ||
                !(!n || 1 !== n.nodeType || !t.contains(n))
              );
            }),
            (t.UNDEFINED = "__vue_devtool_undefined__"),
            (t.INFINITY = "__vue_devtool_infinity__"),
            (t.NEGATIVE_INFINITY = "__vue_devtool_negative_infinity__"),
            (t.NAN = "__vue_devtool_nan__"),
            (t.SPECIAL_TOKENS = {
              true: !0,
              false: !1,
              undefined: t.UNDEFINED,
              null: null,
              "-Infinity": t.NEGATIVE_INFINITY,
              Infinity: t.INFINITY,
              NaN: t.NAN,
            }),
            (t.MAX_STRING_SIZE = 1e4),
            (t.MAX_ARRAY_SIZE = 5e3),
            (t.specialTokenToString = b);
          var y = new ((function () {
              return f(
                function e() {
                  d(this, e), (this.map = new Map());
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
              return f(
                function e(t) {
                  d(this, e),
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
            k = {
              internal: function (e) {
                var n,
                  r = this[e],
                  o = i(r);
                if (Array.isArray(r)) {
                  var a = r.length;
                  return a > t.MAX_ARRAY_SIZE
                    ? {
                        _isArray: !0,
                        length: a,
                        items: r.slice(0, t.MAX_ARRAY_SIZE),
                      }
                    : r;
                }
                if ("string" == typeof r)
                  return r.length > t.MAX_STRING_SIZE
                    ? r.substring(0, t.MAX_STRING_SIZE) +
                        "... (".concat(r.length, " total length)")
                    : r;
                if ("undefined" === o) return t.UNDEFINED;
                if (r === 1 / 0) return t.INFINITY;
                if (r === -1 / 0) return t.NEGATIVE_INFINITY;
                if ("function" === o) return N(r);
                if ("symbol" === o)
                  return "[native Symbol ".concat(
                    Symbol.prototype.toString.call(r),
                    "]"
                  );
                if (null !== r && "object" === o) {
                  var s = Object.prototype.toString.call(r);
                  if ("[object Map]" === s)
                    return y.cache(r, function () {
                      return T(r);
                    });
                  if ("[object Set]" === s)
                    return y.cache(r, function () {
                      return I(r);
                    });
                  if ("[object RegExp]" === s)
                    return "[native RegExp ".concat(
                      RegExp.prototype.toString.call(r),
                      "]"
                    );
                  if ("[object Date]" === s)
                    return "[native Date ".concat(
                      Date.prototype.toString.call(r),
                      "]"
                    );
                  if ("[object Error]" === s)
                    return "[native Error "
                      .concat(r.message, "<>")
                      .concat(r.stack, "]");
                  if (r.state && r._vm)
                    return y.cache(r, function () {
                      return (0, u.getCustomStoreDetails)(r);
                    });
                  if (r.constructor && "VueRouter" === r.constructor.name)
                    return y.cache(r, function () {
                      return (0, u.getCustomRouterDetails)(r);
                    });
                  if ((0, u.isVueInstance)(r))
                    return y.cache(r, function () {
                      return (0, u.getCustomInstanceDetails)(r);
                    });
                  if ("function" == typeof r.render)
                    return y.cache(r, function () {
                      return w(r);
                    });
                  if (r.constructor && "VNode" === r.constructor.name)
                    return "[native VNode <".concat(r.tag, ">]");
                  if (
                    "undefined" != typeof HTMLElement &&
                    r instanceof HTMLElement
                  )
                    return y.cache(r, function () {
                      return A(r);
                    });
                  if (
                    "Store" ===
                      (null === (n = r.constructor) || void 0 === n
                        ? void 0
                        : n.name) &&
                    r._wrappedGetters
                  )
                    return "[object Store]";
                  if (r.currentRoute) return "[object Router]";
                  var c = (0, u.getCustomObjectDetails)(r, s);
                  if (null != c) return c;
                } else if (Number.isNaN(r)) return t.NAN;
                return L(r);
              },
              user: function (e) {
                var n = this[e],
                  r = i(n);
                (null == n ? void 0 : n._custom) &&
                  "value" in n._custom &&
                  (n = n._custom.value);
                if ("object" !== r) {
                  if (n === t.UNDEFINED) return;
                  return n === t.INFINITY
                    ? 1 / 0
                    : n === t.NEGATIVE_INFINITY
                    ? -1 / 0
                    : n === t.NAN
                    ? NaN
                    : n;
                }
                return L(n);
              },
            };
          function O(e) {
            var t =
              arguments.length > 1 && void 0 !== arguments[1]
                ? arguments[1]
                : "internal";
            return y.clear(), (0, c.stringifyCircularAutoChunks)(e, k[t]);
          }
          function T(e) {
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
          function x(e) {
            for (
              var t = new Map(), n = e._custom.value, r = 0;
              r < n.length;
              r++
            ) {
              var o = n[r],
                i = o.key,
                a = o.value;
              t.set(i, M(a));
            }
            return t;
          }
          function I(e) {
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
          function C(e) {
            for (
              var t = new Set(), n = e._custom.value, r = 0;
              r < n.length;
              r++
            ) {
              var o = n[r];
              t.add(M(o));
            }
            return t;
          }
          function S(e) {
            var n = e.displayName || e.name || e._componentTag;
            if (n) return n;
            var r,
              i,
              a = e.__file;
            return a
              ? (0, t.classify)(
                  ((r = a),
                  (i = ".vue"),
                  o.default.basename(
                    r.replace(/^[a-zA-Z]:/, "").replace(/\\/g, "/"),
                    i
                  ))
                )
              : void 0;
          }
          function w(e) {
            var t = S(e);
            return (
              t
                ? e.name &&
                  e.__file &&
                  (t += " <span>(".concat(e.__file, ")</span>"))
                : (t = "<i>Unknown Component</i>"),
              {
                _custom: a(
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
          function N(e) {
            var t = "",
              n = null;
            try {
              (t = Function.prototype.toString.call(e)),
                (n = String.prototype.match.call(t, /\([\s\S]*?\)/));
            } catch (e) {}
            var r = n && n[0],
              o = "string" == typeof r ? r : "(?)",
              i = "string" == typeof e.name ? e.name : "";
            return {
              _custom: {
                type: "function",
                display: '<span style="opacity:.5;">function</span> '
                  .concat(K(i))
                  .concat(o),
                tooltip: t.trim() ? "<pre>".concat(t, "</pre>") : null,
                _reviveId: E.cache(e),
              },
            };
          }
          function A(e) {
            try {
              return {
                _custom: {
                  type: "HTMLElement",
                  display:
                    '<span class="opacity-30">&lt;</span><span class="text-blue-500">'.concat(
                      e.tagName.toLowerCase(),
                      '</span><span class="opacity-30">&gt;</span>'
                    ),
                  value: P(e.attributes),
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
          function P(e) {
            for (var t = {}, n = e.length, r = 0; r < n; r++) {
              var o = e.item(r);
              t[o.name] = o.value;
            }
            return t;
          }
          (t.stringify = O),
            (t.getCustomMapDetails = T),
            (t.reviveMap = x),
            (t.getCustomSetDetails = I),
            (t.reviveSet = C),
            (t.getComponentName = S),
            (t.getCustomComponentDefinitionDetails = w),
            (t.getCustomFunctionDetails = N),
            (t.getCustomHTMLElementDetails = A),
            (t.getCustomRefDetails = function e(t, n, r) {
              var o, i;
              return (
                Array.isArray(r)
                  ? (o = r
                      .map(function (r) {
                        return e(t, n, r);
                      })
                      .map(function (e) {
                        return e.value;
                      }))
                  : ((i = r._isVue ? S(r.$options) : r.tagName.toLowerCase()),
                    (o = {
                      _custom: {
                        display:
                          "&lt;".concat(i) +
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
                { type: "$refs", key: n, value: o, editable: !1 }
              );
            }),
            (t.parse = function (e) {
              var t =
                arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
              return t
                ? (0, c.parseCircularAutoChunks)(e, j)
                : (0, c.parseCircularAutoChunks)(e);
            });
          var D = /^\[native (\w+) (.*?)(<>((.|\s)*))?\]$/,
            R = /^\[native Symbol Symbol\((.*)\)\]$/;
          function j(e, t) {
            return M(t);
          }
          function M(e) {
            if (e !== t.UNDEFINED) {
              if (e === t.INFINITY) return 1 / 0;
              if (e === t.NEGATIVE_INFINITY) return -1 / 0;
              if (e === t.NAN) return NaN;
              if (e && e._custom) {
                var n = e._custom;
                return "component" === n.type
                  ? (0, u.getInstanceMap)().get(n.id)
                  : "map" === n.type
                  ? x(e)
                  : "set" === n.type
                  ? C(e)
                  : n._reviveId
                  ? E.read(n._reviveId)
                  : M(n.value);
              }
              if (R.test(e)) {
                var r = R.exec(e),
                  o = s(r, 2)[1];
                return Symbol.for(o);
              }
              if (D.test(e)) {
                var i = D.exec(e),
                  a = s(i, 5),
                  c = a[1],
                  l = a[2],
                  d = a[4],
                  f = new p.target[c](l);
                return "Error" === c && d && (f.stack = d), f;
              }
              return e;
            }
          }
          function L(e) {
            return (function (e) {
              if (null == e) return !0;
              var t = i(e);
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
          (t.revive = M),
            (t.isPlainObject = B),
            (t.searchDeepInObject = function (e, t) {
              var n = new Map(),
                r = U(e, t.toLowerCase(), n, 0);
              return n.clear(), r;
            });
          function U(e, t, n, r) {
            if (r > 10) return !1;
            for (
              var o, i = !1, a = Object.keys(e), s = 0;
              s < a.length && !(i = V(t, (o = a[s]), e[o], n, r + 1));
              s++
            );
            return i;
          }
          function V(e, t, n, r, o) {
            var i,
              a = !1;
            return (
              "_custom" === t && ((t = n.display), (n = n.value)),
              (i = b(n)) && (n = i),
              t && F(t, e)
                ? ((a = !0), r.set(n, !0))
                : r.has(n)
                ? (a = r.get(n))
                : Array.isArray(n)
                ? (r.set(n, null),
                  (a = (function (e, t, n, r) {
                    if (r > 10) return !1;
                    for (
                      var o = !1, i = 0;
                      i < e.length && !(o = V(t, null, e[i], n, r + 1));
                      i++
                    );
                    return o;
                  })(n, e, r, o)),
                  r.set(n, a))
                : B(n)
                ? (r.set(n, null), (a = U(n, e, r, o)), r.set(n, a))
                : F(n, e) && ((a = !0), r.set(n, !0)),
              a
            );
          }
          function F(e, t) {
            return -1 !== ("" + e).toLowerCase().indexOf(t);
          }
          (t.sortByKey = function (e) {
            return (
              e &&
              e.slice().sort(function (e, t) {
                return e.key < t.key ? -1 : e.key > t.key ? 1 : 0;
              })
            );
          }),
            (t.simpleGet = function (e, t) {
              for (
                var n = Array.isArray(t) ? t : t.split("."), r = 0;
                r < n.length;
                r++
              )
                if (!(e = e[n[r]])) return;
              return e;
            }),
            (t.focusInput = function (e) {
              e.focus(), e.setSelectionRange(0, e.value.length);
            }),
            (t.openInEditor = function (e) {
              var t = e.replace(/\\/g, "\\\\"),
                n = "fetch('"
                  .concat(
                    l.SharedData.openInEditorHost,
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
          var H = { "<": "&lt;", ">": "&gt;", '"': "&quot;", "&": "&amp;" };
          function K(e) {
            return e.replace(/[<>"&]/g, G);
          }
          function G(e) {
            return H[e] || e;
          }
          (t.escape = K),
            (t.copyToClipboard = function (e) {
              var t;
              if (
                ((t = "object" !== i(e) ? String(e) : O(e, "user")),
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
            (t.isEmptyObject = function (e) {
              return e === t.UNDEFINED || !e || 0 === Object.keys(e).length;
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
              ("undefined" == typeof Reflect ? "undefined" : i(Reflect))
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
          var o =
            Number.isNaN ||
            function (e) {
              return e != e;
            };
          function a() {
            a.init.call(this);
          }
          (e.exports = a),
            (e.exports.once = function (e, t) {
              return new Promise(function (n, r) {
                function o(n) {
                  e.removeListener(t, i), r(n);
                }
                function i() {
                  "function" == typeof e.removeListener &&
                    e.removeListener("error", o),
                    n([].slice.call(arguments));
                }
                m(e, t, i, { once: !0 }),
                  "error" !== t &&
                    (function (e, t, n) {
                      "function" == typeof e.on && m(e, "error", t, n);
                    })(e, o, { once: !0 });
              });
            }),
            (a.EventEmitter = a),
            (a.prototype._events = void 0),
            (a.prototype._eventsCount = 0),
            (a.prototype._maxListeners = void 0);
          var s = 10;
          function c(e) {
            if ("function" != typeof e)
              throw new TypeError(
                'The "listener" argument must be of type Function. Received type ' +
                  i(e)
              );
          }
          function u(e) {
            return void 0 === e._maxListeners
              ? a.defaultMaxListeners
              : e._maxListeners;
          }
          function l(e, t, n, r) {
            var o, i, a, s;
            if (
              (c(n),
              void 0 === (i = e._events)
                ? ((i = e._events = Object.create(null)), (e._eventsCount = 0))
                : (void 0 !== i.newListener &&
                    (e.emit("newListener", t, n.listener ? n.listener : n),
                    (i = e._events)),
                  (a = i[t])),
              void 0 === a)
            )
              (a = i[t] = n), ++e._eventsCount;
            else if (
              ("function" == typeof a
                ? (a = i[t] = r ? [n, a] : [a, n])
                : r
                ? a.unshift(n)
                : a.push(n),
              (o = u(e)) > 0 && a.length > o && !a.warned)
            ) {
              a.warned = !0;
              var l = new Error(
                "Possible EventEmitter memory leak detected. " +
                  a.length +
                  " " +
                  String(t) +
                  " listeners added. Use emitter.setMaxListeners() to increase limit"
              );
              (l.name = "MaxListenersExceededWarning"),
                (l.emitter = e),
                (l.type = t),
                (l.count = a.length),
                (s = l),
                console && console.warn && console.warn(s);
            }
            return e;
          }
          function p() {
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
              o = p.bind(r);
            return (o.listener = n), (r.wrapFn = o), o;
          }
          function f(e, t, n) {
            var r = e._events;
            if (void 0 === r) return [];
            var o = r[t];
            return void 0 === o
              ? []
              : "function" == typeof o
              ? n
                ? [o.listener || o]
                : [o]
              : n
              ? (function (e) {
                  for (var t = new Array(e.length), n = 0; n < t.length; ++n)
                    t[n] = e[n].listener || e[n];
                  return t;
                })(o)
              : v(o, o.length);
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
          function v(e, t) {
            for (var n = new Array(t), r = 0; r < t; ++r) n[r] = e[r];
            return n;
          }
          function m(e, t, n, r) {
            if ("function" == typeof e.on) r.once ? e.once(t, n) : e.on(t, n);
            else {
              if ("function" != typeof e.addEventListener)
                throw new TypeError(
                  'The "emitter" argument must be of type EventEmitter. Received type ' +
                    i(e)
                );
              e.addEventListener(t, function o(i) {
                r.once && e.removeEventListener(t, o), n(i);
              });
            }
          }
          Object.defineProperty(a, "defaultMaxListeners", {
            enumerable: !0,
            get: function () {
              return s;
            },
            set: function (e) {
              if ("number" != typeof e || e < 0 || o(e))
                throw new RangeError(
                  'The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received ' +
                    e +
                    "."
                );
              s = e;
            },
          }),
            (a.init = function () {
              (void 0 !== this._events &&
                this._events !== Object.getPrototypeOf(this)._events) ||
                ((this._events = Object.create(null)), (this._eventsCount = 0)),
                (this._maxListeners = this._maxListeners || void 0);
            }),
            (a.prototype.setMaxListeners = function (e) {
              if ("number" != typeof e || e < 0 || o(e))
                throw new RangeError(
                  'The value of "n" is out of range. It must be a non-negative number. Received ' +
                    e +
                    "."
                );
              return (this._maxListeners = e), this;
            }),
            (a.prototype.getMaxListeners = function () {
              return u(this);
            }),
            (a.prototype.emit = function (e) {
              for (var t = [], n = 1; n < arguments.length; n++)
                t.push(arguments[n]);
              var o = "error" === e,
                i = this._events;
              if (void 0 !== i) o = o && void 0 === i.error;
              else if (!o) return !1;
              if (o) {
                var a;
                if ((t.length > 0 && (a = t[0]), a instanceof Error)) throw a;
                var s = new Error(
                  "Unhandled error." + (a ? " (" + a.message + ")" : "")
                );
                throw ((s.context = a), s);
              }
              var c = i[e];
              if (void 0 === c) return !1;
              if ("function" == typeof c) r(c, this, t);
              else {
                var u = c.length,
                  l = v(c, u);
                for (n = 0; n < u; ++n) r(l[n], this, t);
              }
              return !0;
            }),
            (a.prototype.addListener = function (e, t) {
              return l(this, e, t, !1);
            }),
            (a.prototype.on = a.prototype.addListener),
            (a.prototype.prependListener = function (e, t) {
              return l(this, e, t, !0);
            }),
            (a.prototype.once = function (e, t) {
              return c(t), this.on(e, d(this, e, t)), this;
            }),
            (a.prototype.prependOnceListener = function (e, t) {
              return c(t), this.prependListener(e, d(this, e, t)), this;
            }),
            (a.prototype.removeListener = function (e, t) {
              var n, r, o, i, a;
              if ((c(t), void 0 === (r = this._events))) return this;
              if (void 0 === (n = r[e])) return this;
              if (n === t || n.listener === t)
                0 == --this._eventsCount
                  ? (this._events = Object.create(null))
                  : (delete r[e],
                    r.removeListener &&
                      this.emit("removeListener", e, n.listener || t));
              else if ("function" != typeof n) {
                for (o = -1, i = n.length - 1; i >= 0; i--)
                  if (n[i] === t || n[i].listener === t) {
                    (a = n[i].listener), (o = i);
                    break;
                  }
                if (o < 0) return this;
                0 === o
                  ? n.shift()
                  : (function (e, t) {
                      for (; t + 1 < e.length; t++) e[t] = e[t + 1];
                      e.pop();
                    })(n, o),
                  1 === n.length && (r[e] = n[0]),
                  void 0 !== r.removeListener &&
                    this.emit("removeListener", e, a || t);
              }
              return this;
            }),
            (a.prototype.off = a.prototype.removeListener),
            (a.prototype.removeAllListeners = function (e) {
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
                var o,
                  i = Object.keys(n);
                for (r = 0; r < i.length; ++r)
                  "removeListener" !== (o = i[r]) && this.removeAllListeners(o);
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
            (a.prototype.listeners = function (e) {
              return f(this, e, !0);
            }),
            (a.prototype.rawListeners = function (e) {
              return f(this, e, !1);
            }),
            (a.listenerCount = function (e, t) {
              return "function" == typeof e.listenerCount
                ? e.listenerCount(t)
                : h.call(e, t);
            }),
            (a.prototype.listenerCount = h),
            (a.prototype.eventNames = function () {
              return this._eventsCount > 0 ? t(this._events) : [];
            });
        },
      "../../node_modules/lodash/_Symbol.js":
        /*!********************************************!*\
      !*** ../../node_modules/lodash/_Symbol.js ***!
      \********************************************/
        function (e, t, n) {
          var r = n(/*! ./_root */ "../../node_modules/lodash/_root.js").Symbol;
          e.exports = r;
        },
      "../../node_modules/lodash/_baseGetTag.js":
        /*!************************************************!*\
      !*** ../../node_modules/lodash/_baseGetTag.js ***!
      \************************************************/
        function (e, t, n) {
          var r = n(/*! ./_Symbol */ "../../node_modules/lodash/_Symbol.js"),
            o = n(
              /*! ./_getRawTag */ "../../node_modules/lodash/_getRawTag.js"
            ),
            i = n(
              /*! ./_objectToString */ "../../node_modules/lodash/_objectToString.js"
            ),
            a = r ? r.toStringTag : void 0;
          e.exports = function (e) {
            return null == e
              ? void 0 === e
                ? "[object Undefined]"
                : "[object Null]"
              : a && a in Object(e)
              ? o(e)
              : i(e);
          };
        },
      "../../node_modules/lodash/_baseTrim.js":
        /*!**********************************************!*\
      !*** ../../node_modules/lodash/_baseTrim.js ***!
      \**********************************************/
        function (e, t, n) {
          var r = n(
              /*! ./_trimmedEndIndex */ "../../node_modules/lodash/_trimmedEndIndex.js"
            ),
            o = /^\s+/;
          e.exports = function (e) {
            return e ? e.slice(0, r(e) + 1).replace(o, "") : e;
          };
        },
      "../../node_modules/lodash/_freeGlobal.js":
        /*!************************************************!*\
      !*** ../../node_modules/lodash/_freeGlobal.js ***!
      \************************************************/
        function (e, t, n) {
          var r = "object" == i(n.g) && n.g && n.g.Object === Object && n.g;
          e.exports = r;
        },
      "../../node_modules/lodash/_getRawTag.js":
        /*!***********************************************!*\
      !*** ../../node_modules/lodash/_getRawTag.js ***!
      \***********************************************/
        function (e, t, n) {
          var r = n(/*! ./_Symbol */ "../../node_modules/lodash/_Symbol.js"),
            o = Object.prototype,
            i = o.hasOwnProperty,
            a = o.toString,
            s = r ? r.toStringTag : void 0;
          e.exports = function (e) {
            var t = i.call(e, s),
              n = e[s];
            try {
              e[s] = void 0;
              var r = !0;
            } catch (e) {}
            var o = a.call(e);
            return r && (t ? (e[s] = n) : delete e[s]), o;
          };
        },
      "../../node_modules/lodash/_objectToString.js":
        /*!****************************************************!*\
      !*** ../../node_modules/lodash/_objectToString.js ***!
      \****************************************************/
        function (e) {
          var t = Object.prototype.toString;
          e.exports = function (e) {
            return t.call(e);
          };
        },
      "../../node_modules/lodash/_root.js":
        /*!******************************************!*\
      !*** ../../node_modules/lodash/_root.js ***!
      \******************************************/
        function (e, t, n) {
          var r = n(
              /*! ./_freeGlobal */ "../../node_modules/lodash/_freeGlobal.js"
            ),
            o =
              "object" ==
                ("undefined" == typeof self ? "undefined" : i(self)) &&
              self &&
              self.Object === Object &&
              self,
            a = r || o || Function("return this")();
          e.exports = a;
        },
      "../../node_modules/lodash/_trimmedEndIndex.js":
        /*!*****************************************************!*\
      !*** ../../node_modules/lodash/_trimmedEndIndex.js ***!
      \*****************************************************/
        function (e) {
          var t = /\s/;
          e.exports = function (e) {
            for (var n = e.length; n-- && t.test(e.charAt(n)); );
            return n;
          };
        },
      "../../node_modules/lodash/debounce.js":
        /*!*********************************************!*\
      !*** ../../node_modules/lodash/debounce.js ***!
      \*********************************************/
        function (e, t, n) {
          var r = n(/*! ./isObject */ "../../node_modules/lodash/isObject.js"),
            o = n(/*! ./now */ "../../node_modules/lodash/now.js"),
            i = n(/*! ./toNumber */ "../../node_modules/lodash/toNumber.js"),
            a = Math.max,
            s = Math.min;
          e.exports = function (e, t, n) {
            var c,
              u,
              l,
              p,
              d,
              f,
              h = 0,
              v = !1,
              m = !1,
              g = !0;
            if ("function" != typeof e)
              throw new TypeError("Expected a function");
            function _(t) {
              var n = c,
                r = u;
              return (c = u = void 0), (h = t), (p = e.apply(r, n));
            }
            function b(e) {
              return (h = e), (d = setTimeout(E, t)), v ? _(e) : p;
            }
            function y(e) {
              var n = e - f;
              return void 0 === f || n >= t || n < 0 || (m && e - h >= l);
            }
            function E() {
              var e = o();
              if (y(e)) return k(e);
              d = setTimeout(
                E,
                (function (e) {
                  var n = t - (e - f);
                  return m ? s(n, l - (e - h)) : n;
                })(e)
              );
            }
            function k(e) {
              return (d = void 0), g && c ? _(e) : ((c = u = void 0), p);
            }
            function O() {
              var e = o(),
                n = y(e);
              if (((c = arguments), (u = this), (f = e), n)) {
                if (void 0 === d) return b(f);
                if (m) return clearTimeout(d), (d = setTimeout(E, t)), _(f);
              }
              return void 0 === d && (d = setTimeout(E, t)), p;
            }
            return (
              (t = i(t) || 0),
              r(n) &&
                ((v = !!n.leading),
                (l = (m = "maxWait" in n) ? a(i(n.maxWait) || 0, t) : l),
                (g = "trailing" in n ? !!n.trailing : g)),
              (O.cancel = function () {
                void 0 !== d && clearTimeout(d),
                  (h = 0),
                  (c = f = u = d = void 0);
              }),
              (O.flush = function () {
                return void 0 === d ? p : k(o());
              }),
              O
            );
          };
        },
      "../../node_modules/lodash/isObject.js":
        /*!*********************************************!*\
      !*** ../../node_modules/lodash/isObject.js ***!
      \*********************************************/
        function (e) {
          e.exports = function (e) {
            var t = i(e);
            return null != e && ("object" == t || "function" == t);
          };
        },
      "../../node_modules/lodash/isObjectLike.js":
        /*!*************************************************!*\
      !*** ../../node_modules/lodash/isObjectLike.js ***!
      \*************************************************/
        function (e) {
          e.exports = function (e) {
            return null != e && "object" == i(e);
          };
        },
      "../../node_modules/lodash/isSymbol.js":
        /*!*********************************************!*\
      !*** ../../node_modules/lodash/isSymbol.js ***!
      \*********************************************/
        function (e, t, n) {
          var r = n(
              /*! ./_baseGetTag */ "../../node_modules/lodash/_baseGetTag.js"
            ),
            o = n(
              /*! ./isObjectLike */ "../../node_modules/lodash/isObjectLike.js"
            );
          e.exports = function (e) {
            return "symbol" == i(e) || (o(e) && "[object Symbol]" == r(e));
          };
        },
      "../../node_modules/lodash/now.js":
        /*!****************************************!*\
      !*** ../../node_modules/lodash/now.js ***!
      \****************************************/
        function (e, t, n) {
          var r = n(/*! ./_root */ "../../node_modules/lodash/_root.js");
          e.exports = function () {
            return r.Date.now();
          };
        },
      "../../node_modules/lodash/throttle.js":
        /*!*********************************************!*\
      !*** ../../node_modules/lodash/throttle.js ***!
      \*********************************************/
        function (e, t, n) {
          var r = n(/*! ./debounce */ "../../node_modules/lodash/debounce.js"),
            o = n(/*! ./isObject */ "../../node_modules/lodash/isObject.js");
          e.exports = function (e, t, n) {
            var i = !0,
              a = !0;
            if ("function" != typeof e)
              throw new TypeError("Expected a function");
            return (
              o(n) &&
                ((i = "leading" in n ? !!n.leading : i),
                (a = "trailing" in n ? !!n.trailing : a)),
              r(e, t, { leading: i, maxWait: t, trailing: a })
            );
          };
        },
      "../../node_modules/lodash/toNumber.js":
        /*!*********************************************!*\
      !*** ../../node_modules/lodash/toNumber.js ***!
      \*********************************************/
        function (e, t, n) {
          var r = n(
              /*! ./_baseTrim */ "../../node_modules/lodash/_baseTrim.js"
            ),
            o = n(/*! ./isObject */ "../../node_modules/lodash/isObject.js"),
            i = n(/*! ./isSymbol */ "../../node_modules/lodash/isSymbol.js"),
            a = /^[-+]0x[0-9a-f]+$/i,
            s = /^0b[01]+$/i,
            c = /^0o[0-7]+$/i,
            u = parseInt;
          e.exports = function (e) {
            if ("number" == typeof e) return e;
            if (i(e)) return NaN;
            if (o(e)) {
              var t = "function" == typeof e.valueOf ? e.valueOf() : e;
              e = o(t) ? t + "" : t;
            }
            if ("string" != typeof e) return 0 === e ? e : +e;
            e = r(e);
            var n = s.test(e);
            return n || c.test(e)
              ? u(e.slice(2), n ? 2 : 8)
              : a.test(e)
              ? NaN
              : +e;
          };
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
              var n, r = "", o = 0, i = -1, a = 0, s = 0;
              s <= e.length;
              ++s
            ) {
              if (s < e.length) n = e.charCodeAt(s);
              else {
                if (47 === n) break;
                n = 47;
              }
              if (47 === n) {
                if (i === s - 1 || 1 === a);
                else if (i !== s - 1 && 2 === a) {
                  if (
                    r.length < 2 ||
                    2 !== o ||
                    46 !== r.charCodeAt(r.length - 1) ||
                    46 !== r.charCodeAt(r.length - 2)
                  )
                    if (r.length > 2) {
                      var c = r.lastIndexOf("/");
                      if (c !== r.length - 1) {
                        -1 === c
                          ? ((r = ""), (o = 0))
                          : (o =
                              (r = r.slice(0, c)).length -
                              1 -
                              r.lastIndexOf("/")),
                          (i = s),
                          (a = 0);
                        continue;
                      }
                    } else if (2 === r.length || 1 === r.length) {
                      (r = ""), (o = 0), (i = s), (a = 0);
                      continue;
                    }
                  t && (r.length > 0 ? (r += "/..") : (r = ".."), (o = 2));
                } else
                  r.length > 0
                    ? (r += "/" + e.slice(i + 1, s))
                    : (r = e.slice(i + 1, s)),
                    (o = s - i - 1);
                (i = s), (a = 0);
              } else 46 === n && -1 !== a ? ++a : (a = -1);
            }
            return r;
          }
          var r = {
            resolve: function () {
              for (
                var e, r = "", o = !1, i = arguments.length - 1;
                i >= -1 && !o;
                i--
              ) {
                var a;
                i >= 0
                  ? (a = arguments[i])
                  : (void 0 === e && (e = process.cwd()), (a = e)),
                  t(a),
                  0 !== a.length &&
                    ((r = a + "/" + r), (o = 47 === a.charCodeAt(0)));
              }
              return (
                (r = n(r, !o)),
                o ? (r.length > 0 ? "/" + r : "/") : r.length > 0 ? r : "."
              );
            },
            normalize: function (e) {
              if ((t(e), 0 === e.length)) return ".";
              var r = 47 === e.charCodeAt(0),
                o = 47 === e.charCodeAt(e.length - 1);
              return (
                0 !== (e = n(e, !r)).length || r || (e = "."),
                e.length > 0 && o && (e += "/"),
                r ? "/" + e : e
              );
            },
            isAbsolute: function (e) {
              return t(e), e.length > 0 && 47 === e.charCodeAt(0);
            },
            join: function () {
              if (0 === arguments.length) return ".";
              for (var e, n = 0; n < arguments.length; ++n) {
                var o = arguments[n];
                t(o), o.length > 0 && (void 0 === e ? (e = o) : (e += "/" + o));
              }
              return void 0 === e ? "." : r.normalize(e);
            },
            relative: function (e, n) {
              if ((t(e), t(n), e === n)) return "";
              if ((e = r.resolve(e)) === (n = r.resolve(n))) return "";
              for (var o = 1; o < e.length && 47 === e.charCodeAt(o); ++o);
              for (
                var i = e.length, a = i - o, s = 1;
                s < n.length && 47 === n.charCodeAt(s);
                ++s
              );
              for (
                var c = n.length - s, u = a < c ? a : c, l = -1, p = 0;
                p <= u;
                ++p
              ) {
                if (p === u) {
                  if (c > u) {
                    if (47 === n.charCodeAt(s + p)) return n.slice(s + p + 1);
                    if (0 === p) return n.slice(s + p);
                  } else
                    a > u &&
                      (47 === e.charCodeAt(o + p)
                        ? (l = p)
                        : 0 === p && (l = 0));
                  break;
                }
                var d = e.charCodeAt(o + p);
                if (d !== n.charCodeAt(s + p)) break;
                47 === d && (l = p);
              }
              var f = "";
              for (p = o + l + 1; p <= i; ++p)
                (p !== i && 47 !== e.charCodeAt(p)) ||
                  (0 === f.length ? (f += "..") : (f += "/.."));
              return f.length > 0
                ? f + n.slice(s + l)
                : ((s += l), 47 === n.charCodeAt(s) && ++s, n.slice(s));
            },
            _makeLong: function (e) {
              return e;
            },
            dirname: function (e) {
              if ((t(e), 0 === e.length)) return ".";
              for (
                var n = e.charCodeAt(0),
                  r = 47 === n,
                  o = -1,
                  i = !0,
                  a = e.length - 1;
                a >= 1;
                --a
              )
                if (47 === (n = e.charCodeAt(a))) {
                  if (!i) {
                    o = a;
                    break;
                  }
                } else i = !1;
              return -1 === o
                ? r
                  ? "/"
                  : "."
                : r && 1 === o
                ? "//"
                : e.slice(0, o);
            },
            basename: function (e, n) {
              if (void 0 !== n && "string" != typeof n)
                throw new TypeError('"ext" argument must be a string');
              t(e);
              var r,
                o = 0,
                i = -1,
                a = !0;
              if (void 0 !== n && n.length > 0 && n.length <= e.length) {
                if (n.length === e.length && n === e) return "";
                var s = n.length - 1,
                  c = -1;
                for (r = e.length - 1; r >= 0; --r) {
                  var u = e.charCodeAt(r);
                  if (47 === u) {
                    if (!a) {
                      o = r + 1;
                      break;
                    }
                  } else
                    -1 === c && ((a = !1), (c = r + 1)),
                      s >= 0 &&
                        (u === n.charCodeAt(s)
                          ? -1 == --s && (i = r)
                          : ((s = -1), (i = c)));
                }
                return (
                  o === i ? (i = c) : -1 === i && (i = e.length), e.slice(o, i)
                );
              }
              for (r = e.length - 1; r >= 0; --r)
                if (47 === e.charCodeAt(r)) {
                  if (!a) {
                    o = r + 1;
                    break;
                  }
                } else -1 === i && ((a = !1), (i = r + 1));
              return -1 === i ? "" : e.slice(o, i);
            },
            extname: function (e) {
              t(e);
              for (
                var n = -1, r = 0, o = -1, i = !0, a = 0, s = e.length - 1;
                s >= 0;
                --s
              ) {
                var c = e.charCodeAt(s);
                if (47 !== c)
                  -1 === o && ((i = !1), (o = s + 1)),
                    46 === c
                      ? -1 === n
                        ? (n = s)
                        : 1 !== a && (a = 1)
                      : -1 !== n && (a = -1);
                else if (!i) {
                  r = s + 1;
                  break;
                }
              }
              return -1 === n ||
                -1 === o ||
                0 === a ||
                (1 === a && n === o - 1 && n === r + 1)
                ? ""
                : e.slice(n, o);
            },
            format: function (e) {
              if (null === e || "object" !== i(e))
                throw new TypeError(
                  'The "pathObject" argument must be of type Object. Received type ' +
                    i(e)
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
                o = e.charCodeAt(0),
                i = 47 === o;
              i ? ((n.root = "/"), (r = 1)) : (r = 0);
              for (
                var a = -1, s = 0, c = -1, u = !0, l = e.length - 1, p = 0;
                l >= r;
                --l
              )
                if (47 !== (o = e.charCodeAt(l)))
                  -1 === c && ((u = !1), (c = l + 1)),
                    46 === o
                      ? -1 === a
                        ? (a = l)
                        : 1 !== p && (p = 1)
                      : -1 !== a && (p = -1);
                else if (!u) {
                  s = l + 1;
                  break;
                }
              return (
                -1 === a ||
                -1 === c ||
                0 === p ||
                (1 === p && a === c - 1 && a === s + 1)
                  ? -1 !== c &&
                    (n.base = n.name =
                      0 === s && i ? e.slice(1, c) : e.slice(s, c))
                  : (0 === s && i
                      ? ((n.name = e.slice(1, a)), (n.base = e.slice(1, c)))
                      : ((n.name = e.slice(s, a)), (n.base = e.slice(s, c))),
                    (n.ext = e.slice(a, c))),
                s > 0 ? (n.dir = e.slice(0, s - 1)) : i && (n.dir = "/"),
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
      "../../node_modules/speakingurl/index.js":
        /*!***********************************************!*\
      !*** ../../node_modules/speakingurl/index.js ***!
      \***********************************************/
        function (e, t, n) {
          e.exports = n(
            /*! ./lib/speakingurl */ "../../node_modules/speakingurl/lib/speakingurl.js"
          );
        },
      "../../node_modules/speakingurl/lib/speakingurl.js":
        /*!*********************************************************!*\
      !*** ../../node_modules/speakingurl/lib/speakingurl.js ***!
      \*********************************************************/
        function (e, t) {
          var n, r, o, a, s, c, u, l, p, d, f, h;
          (r = {
            À: "A",
            Á: "A",
            Â: "A",
            Ã: "A",
            Ä: "Ae",
            Å: "A",
            Æ: "AE",
            Ç: "C",
            È: "E",
            É: "E",
            Ê: "E",
            Ë: "E",
            Ì: "I",
            Í: "I",
            Î: "I",
            Ï: "I",
            Ð: "D",
            Ñ: "N",
            Ò: "O",
            Ó: "O",
            Ô: "O",
            Õ: "O",
            Ö: "Oe",
            Ő: "O",
            Ø: "O",
            Ù: "U",
            Ú: "U",
            Û: "U",
            Ü: "Ue",
            Ű: "U",
            Ý: "Y",
            Þ: "TH",
            ß: "ss",
            à: "a",
            á: "a",
            â: "a",
            ã: "a",
            ä: "ae",
            å: "a",
            æ: "ae",
            ç: "c",
            è: "e",
            é: "e",
            ê: "e",
            ë: "e",
            ì: "i",
            í: "i",
            î: "i",
            ï: "i",
            ð: "d",
            ñ: "n",
            ò: "o",
            ó: "o",
            ô: "o",
            õ: "o",
            ö: "oe",
            ő: "o",
            ø: "o",
            ù: "u",
            ú: "u",
            û: "u",
            ü: "ue",
            ű: "u",
            ý: "y",
            þ: "th",
            ÿ: "y",
            ẞ: "SS",
            ا: "a",
            أ: "a",
            إ: "i",
            آ: "aa",
            ؤ: "u",
            ئ: "e",
            ء: "a",
            ب: "b",
            ت: "t",
            ث: "th",
            ج: "j",
            ح: "h",
            خ: "kh",
            د: "d",
            ذ: "th",
            ر: "r",
            ز: "z",
            س: "s",
            ش: "sh",
            ص: "s",
            ض: "dh",
            ط: "t",
            ظ: "z",
            ع: "a",
            غ: "gh",
            ف: "f",
            ق: "q",
            ك: "k",
            ل: "l",
            م: "m",
            ن: "n",
            ه: "h",
            و: "w",
            ي: "y",
            ى: "a",
            ة: "h",
            ﻻ: "la",
            ﻷ: "laa",
            ﻹ: "lai",
            ﻵ: "laa",
            گ: "g",
            چ: "ch",
            پ: "p",
            ژ: "zh",
            ک: "k",
            ی: "y",
            "َ": "a",
            "ً": "an",
            "ِ": "e",
            "ٍ": "en",
            "ُ": "u",
            "ٌ": "on",
            "ْ": "",
            "٠": "0",
            "١": "1",
            "٢": "2",
            "٣": "3",
            "٤": "4",
            "٥": "5",
            "٦": "6",
            "٧": "7",
            "٨": "8",
            "٩": "9",
            "۰": "0",
            "۱": "1",
            "۲": "2",
            "۳": "3",
            "۴": "4",
            "۵": "5",
            "۶": "6",
            "۷": "7",
            "۸": "8",
            "۹": "9",
            က: "k",
            ခ: "kh",
            ဂ: "g",
            ဃ: "ga",
            င: "ng",
            စ: "s",
            ဆ: "sa",
            ဇ: "z",
            စျ: "za",
            ည: "ny",
            ဋ: "t",
            ဌ: "ta",
            ဍ: "d",
            ဎ: "da",
            ဏ: "na",
            တ: "t",
            ထ: "ta",
            ဒ: "d",
            ဓ: "da",
            န: "n",
            ပ: "p",
            ဖ: "pa",
            ဗ: "b",
            ဘ: "ba",
            မ: "m",
            ယ: "y",
            ရ: "ya",
            လ: "l",
            ဝ: "w",
            သ: "th",
            ဟ: "h",
            ဠ: "la",
            အ: "a",
            "ြ": "y",
            "ျ": "ya",
            "ွ": "w",
            "ြွ": "yw",
            "ျွ": "ywa",
            "ှ": "h",
            ဧ: "e",
            "၏": "-e",
            ဣ: "i",
            ဤ: "-i",
            ဉ: "u",
            ဦ: "-u",
            ဩ: "aw",
            သြော: "aw",
            ဪ: "aw",
            "၀": "0",
            "၁": "1",
            "၂": "2",
            "၃": "3",
            "၄": "4",
            "၅": "5",
            "၆": "6",
            "၇": "7",
            "၈": "8",
            "၉": "9",
            "္": "",
            "့": "",
            "း": "",
            č: "c",
            ď: "d",
            ě: "e",
            ň: "n",
            ř: "r",
            š: "s",
            ť: "t",
            ů: "u",
            ž: "z",
            Č: "C",
            Ď: "D",
            Ě: "E",
            Ň: "N",
            Ř: "R",
            Š: "S",
            Ť: "T",
            Ů: "U",
            Ž: "Z",
            ހ: "h",
            ށ: "sh",
            ނ: "n",
            ރ: "r",
            ބ: "b",
            ޅ: "lh",
            ކ: "k",
            އ: "a",
            ވ: "v",
            މ: "m",
            ފ: "f",
            ދ: "dh",
            ތ: "th",
            ލ: "l",
            ގ: "g",
            ޏ: "gn",
            ސ: "s",
            ޑ: "d",
            ޒ: "z",
            ޓ: "t",
            ޔ: "y",
            ޕ: "p",
            ޖ: "j",
            ޗ: "ch",
            ޘ: "tt",
            ޙ: "hh",
            ޚ: "kh",
            ޛ: "th",
            ޜ: "z",
            ޝ: "sh",
            ޞ: "s",
            ޟ: "d",
            ޠ: "t",
            ޡ: "z",
            ޢ: "a",
            ޣ: "gh",
            ޤ: "q",
            ޥ: "w",
            "ަ": "a",
            "ާ": "aa",
            "ި": "i",
            "ީ": "ee",
            "ު": "u",
            "ޫ": "oo",
            "ެ": "e",
            "ޭ": "ey",
            "ޮ": "o",
            "ޯ": "oa",
            "ް": "",
            ა: "a",
            ბ: "b",
            გ: "g",
            დ: "d",
            ე: "e",
            ვ: "v",
            ზ: "z",
            თ: "t",
            ი: "i",
            კ: "k",
            ლ: "l",
            მ: "m",
            ნ: "n",
            ო: "o",
            პ: "p",
            ჟ: "zh",
            რ: "r",
            ს: "s",
            ტ: "t",
            უ: "u",
            ფ: "p",
            ქ: "k",
            ღ: "gh",
            ყ: "q",
            შ: "sh",
            ჩ: "ch",
            ც: "ts",
            ძ: "dz",
            წ: "ts",
            ჭ: "ch",
            ხ: "kh",
            ჯ: "j",
            ჰ: "h",
            α: "a",
            β: "v",
            γ: "g",
            δ: "d",
            ε: "e",
            ζ: "z",
            η: "i",
            θ: "th",
            ι: "i",
            κ: "k",
            λ: "l",
            μ: "m",
            ν: "n",
            ξ: "ks",
            ο: "o",
            π: "p",
            ρ: "r",
            σ: "s",
            τ: "t",
            υ: "y",
            φ: "f",
            χ: "x",
            ψ: "ps",
            ω: "o",
            ά: "a",
            έ: "e",
            ί: "i",
            ό: "o",
            ύ: "y",
            ή: "i",
            ώ: "o",
            ς: "s",
            ϊ: "i",
            ΰ: "y",
            ϋ: "y",
            ΐ: "i",
            Α: "A",
            Β: "B",
            Γ: "G",
            Δ: "D",
            Ε: "E",
            Ζ: "Z",
            Η: "I",
            Θ: "TH",
            Ι: "I",
            Κ: "K",
            Λ: "L",
            Μ: "M",
            Ν: "N",
            Ξ: "KS",
            Ο: "O",
            Π: "P",
            Ρ: "R",
            Σ: "S",
            Τ: "T",
            Υ: "Y",
            Φ: "F",
            Χ: "X",
            Ψ: "PS",
            Ω: "O",
            Ά: "A",
            Έ: "E",
            Ί: "I",
            Ό: "O",
            Ύ: "Y",
            Ή: "I",
            Ώ: "O",
            Ϊ: "I",
            Ϋ: "Y",
            ā: "a",
            ē: "e",
            ģ: "g",
            ī: "i",
            ķ: "k",
            ļ: "l",
            ņ: "n",
            ū: "u",
            Ā: "A",
            Ē: "E",
            Ģ: "G",
            Ī: "I",
            Ķ: "k",
            Ļ: "L",
            Ņ: "N",
            Ū: "U",
            Ќ: "Kj",
            ќ: "kj",
            Љ: "Lj",
            љ: "lj",
            Њ: "Nj",
            њ: "nj",
            Тс: "Ts",
            тс: "ts",
            ą: "a",
            ć: "c",
            ę: "e",
            ł: "l",
            ń: "n",
            ś: "s",
            ź: "z",
            ż: "z",
            Ą: "A",
            Ć: "C",
            Ę: "E",
            Ł: "L",
            Ń: "N",
            Ś: "S",
            Ź: "Z",
            Ż: "Z",
            Є: "Ye",
            І: "I",
            Ї: "Yi",
            Ґ: "G",
            є: "ye",
            і: "i",
            ї: "yi",
            ґ: "g",
            ă: "a",
            Ă: "A",
            ș: "s",
            Ș: "S",
            ț: "t",
            Ț: "T",
            ţ: "t",
            Ţ: "T",
            а: "a",
            б: "b",
            в: "v",
            г: "g",
            д: "d",
            е: "e",
            ё: "yo",
            ж: "zh",
            з: "z",
            и: "i",
            й: "i",
            к: "k",
            л: "l",
            м: "m",
            н: "n",
            о: "o",
            п: "p",
            р: "r",
            с: "s",
            т: "t",
            у: "u",
            ф: "f",
            х: "kh",
            ц: "c",
            ч: "ch",
            ш: "sh",
            щ: "sh",
            ъ: "",
            ы: "y",
            ь: "",
            э: "e",
            ю: "yu",
            я: "ya",
            А: "A",
            Б: "B",
            В: "V",
            Г: "G",
            Д: "D",
            Е: "E",
            Ё: "Yo",
            Ж: "Zh",
            З: "Z",
            И: "I",
            Й: "I",
            К: "K",
            Л: "L",
            М: "M",
            Н: "N",
            О: "O",
            П: "P",
            Р: "R",
            С: "S",
            Т: "T",
            У: "U",
            Ф: "F",
            Х: "Kh",
            Ц: "C",
            Ч: "Ch",
            Ш: "Sh",
            Щ: "Sh",
            Ъ: "",
            Ы: "Y",
            Ь: "",
            Э: "E",
            Ю: "Yu",
            Я: "Ya",
            ђ: "dj",
            ј: "j",
            ћ: "c",
            џ: "dz",
            Ђ: "Dj",
            Ј: "j",
            Ћ: "C",
            Џ: "Dz",
            ľ: "l",
            ĺ: "l",
            ŕ: "r",
            Ľ: "L",
            Ĺ: "L",
            Ŕ: "R",
            ş: "s",
            Ş: "S",
            ı: "i",
            İ: "I",
            ğ: "g",
            Ğ: "G",
            ả: "a",
            Ả: "A",
            ẳ: "a",
            Ẳ: "A",
            ẩ: "a",
            Ẩ: "A",
            đ: "d",
            Đ: "D",
            ẹ: "e",
            Ẹ: "E",
            ẽ: "e",
            Ẽ: "E",
            ẻ: "e",
            Ẻ: "E",
            ế: "e",
            Ế: "E",
            ề: "e",
            Ề: "E",
            ệ: "e",
            Ệ: "E",
            ễ: "e",
            Ễ: "E",
            ể: "e",
            Ể: "E",
            ỏ: "o",
            ọ: "o",
            Ọ: "o",
            ố: "o",
            Ố: "O",
            ồ: "o",
            Ồ: "O",
            ổ: "o",
            Ổ: "O",
            ộ: "o",
            Ộ: "O",
            ỗ: "o",
            Ỗ: "O",
            ơ: "o",
            Ơ: "O",
            ớ: "o",
            Ớ: "O",
            ờ: "o",
            Ờ: "O",
            ợ: "o",
            Ợ: "O",
            ỡ: "o",
            Ỡ: "O",
            Ở: "o",
            ở: "o",
            ị: "i",
            Ị: "I",
            ĩ: "i",
            Ĩ: "I",
            ỉ: "i",
            Ỉ: "i",
            ủ: "u",
            Ủ: "U",
            ụ: "u",
            Ụ: "U",
            ũ: "u",
            Ũ: "U",
            ư: "u",
            Ư: "U",
            ứ: "u",
            Ứ: "U",
            ừ: "u",
            Ừ: "U",
            ự: "u",
            Ự: "U",
            ữ: "u",
            Ữ: "U",
            ử: "u",
            Ử: "ư",
            ỷ: "y",
            Ỷ: "y",
            ỳ: "y",
            Ỳ: "Y",
            ỵ: "y",
            Ỵ: "Y",
            ỹ: "y",
            Ỹ: "Y",
            ạ: "a",
            Ạ: "A",
            ấ: "a",
            Ấ: "A",
            ầ: "a",
            Ầ: "A",
            ậ: "a",
            Ậ: "A",
            ẫ: "a",
            Ẫ: "A",
            ắ: "a",
            Ắ: "A",
            ằ: "a",
            Ằ: "A",
            ặ: "a",
            Ặ: "A",
            ẵ: "a",
            Ẵ: "A",
            "⓪": "0",
            "①": "1",
            "②": "2",
            "③": "3",
            "④": "4",
            "⑤": "5",
            "⑥": "6",
            "⑦": "7",
            "⑧": "8",
            "⑨": "9",
            "⑩": "10",
            "⑪": "11",
            "⑫": "12",
            "⑬": "13",
            "⑭": "14",
            "⑮": "15",
            "⑯": "16",
            "⑰": "17",
            "⑱": "18",
            "⑲": "18",
            "⑳": "18",
            "⓵": "1",
            "⓶": "2",
            "⓷": "3",
            "⓸": "4",
            "⓹": "5",
            "⓺": "6",
            "⓻": "7",
            "⓼": "8",
            "⓽": "9",
            "⓾": "10",
            "⓿": "0",
            "⓫": "11",
            "⓬": "12",
            "⓭": "13",
            "⓮": "14",
            "⓯": "15",
            "⓰": "16",
            "⓱": "17",
            "⓲": "18",
            "⓳": "19",
            "⓴": "20",
            "Ⓐ": "A",
            "Ⓑ": "B",
            "Ⓒ": "C",
            "Ⓓ": "D",
            "Ⓔ": "E",
            "Ⓕ": "F",
            "Ⓖ": "G",
            "Ⓗ": "H",
            "Ⓘ": "I",
            "Ⓙ": "J",
            "Ⓚ": "K",
            "Ⓛ": "L",
            "Ⓜ": "M",
            "Ⓝ": "N",
            "Ⓞ": "O",
            "Ⓟ": "P",
            "Ⓠ": "Q",
            "Ⓡ": "R",
            "Ⓢ": "S",
            "Ⓣ": "T",
            "Ⓤ": "U",
            "Ⓥ": "V",
            "Ⓦ": "W",
            "Ⓧ": "X",
            "Ⓨ": "Y",
            "Ⓩ": "Z",
            "ⓐ": "a",
            "ⓑ": "b",
            "ⓒ": "c",
            "ⓓ": "d",
            "ⓔ": "e",
            "ⓕ": "f",
            "ⓖ": "g",
            "ⓗ": "h",
            "ⓘ": "i",
            "ⓙ": "j",
            "ⓚ": "k",
            "ⓛ": "l",
            "ⓜ": "m",
            "ⓝ": "n",
            "ⓞ": "o",
            "ⓟ": "p",
            "ⓠ": "q",
            "ⓡ": "r",
            "ⓢ": "s",
            "ⓣ": "t",
            "ⓤ": "u",
            "ⓦ": "v",
            "ⓥ": "w",
            "ⓧ": "x",
            "ⓨ": "y",
            "ⓩ": "z",
            "“": '"',
            "”": '"',
            "‘": "'",
            "’": "'",
            "∂": "d",
            ƒ: "f",
            "™": "(TM)",
            "©": "(C)",
            œ: "oe",
            Œ: "OE",
            "®": "(R)",
            "†": "+",
            "℠": "(SM)",
            "…": "...",
            "˚": "o",
            º: "o",
            ª: "a",
            "•": "*",
            "၊": ",",
            "။": ".",
            $: "USD",
            "€": "EUR",
            "₢": "BRN",
            "₣": "FRF",
            "£": "GBP",
            "₤": "ITL",
            "₦": "NGN",
            "₧": "ESP",
            "₩": "KRW",
            "₪": "ILS",
            "₫": "VND",
            "₭": "LAK",
            "₮": "MNT",
            "₯": "GRD",
            "₱": "ARS",
            "₲": "PYG",
            "₳": "ARA",
            "₴": "UAH",
            "₵": "GHS",
            "¢": "cent",
            "¥": "CNY",
            元: "CNY",
            円: "YEN",
            "﷼": "IRR",
            "₠": "EWE",
            "฿": "THB",
            "₨": "INR",
            "₹": "INR",
            "₰": "PF",
            "₺": "TRY",
            "؋": "AFN",
            "₼": "AZN",
            лв: "BGN",
            "៛": "KHR",
            "₡": "CRC",
            "₸": "KZT",
            ден: "MKD",
            zł: "PLN",
            "₽": "RUB",
            "₾": "GEL",
          }),
            (o = ["်", "ް"]),
            (a = {
              "ာ": "a",
              "ါ": "a",
              "ေ": "e",
              "ဲ": "e",
              "ိ": "i",
              "ီ": "i",
              "ို": "o",
              "ု": "u",
              "ူ": "u",
              "ေါင်": "aung",
              "ော": "aw",
              "ော်": "aw",
              "ေါ": "aw",
              "ေါ်": "aw",
              "်": "်",
              က်: "et",
              "ိုက်": "aik",
              "ောက်": "auk",
              င်: "in",
              "ိုင်": "aing",
              "ောင်": "aung",
              စ်: "it",
              ည်: "i",
              တ်: "at",
              "ိတ်": "eik",
              "ုတ်": "ok",
              "ွတ်": "ut",
              "ေတ်": "it",
              ဒ်: "d",
              "ိုဒ်": "ok",
              "ုဒ်": "ait",
              န်: "an",
              "ာန်": "an",
              "ိန်": "ein",
              "ုန်": "on",
              "ွန်": "un",
              ပ်: "at",
              "ိပ်": "eik",
              "ုပ်": "ok",
              "ွပ်": "ut",
              န်ုပ်: "nub",
              မ်: "an",
              "ိမ်": "ein",
              "ုမ်": "on",
              "ွမ်": "un",
              ယ်: "e",
              "ိုလ်": "ol",
              ဉ်: "in",
              "ံ": "an",
              "ိံ": "ein",
              "ုံ": "on",
              "ައް": "ah",
              "ަށް": "ah",
            }),
            (s = {
              en: {},
              az: {
                ç: "c",
                ə: "e",
                ğ: "g",
                ı: "i",
                ö: "o",
                ş: "s",
                ü: "u",
                Ç: "C",
                Ə: "E",
                Ğ: "G",
                İ: "I",
                Ö: "O",
                Ş: "S",
                Ü: "U",
              },
              cs: {
                č: "c",
                ď: "d",
                ě: "e",
                ň: "n",
                ř: "r",
                š: "s",
                ť: "t",
                ů: "u",
                ž: "z",
                Č: "C",
                Ď: "D",
                Ě: "E",
                Ň: "N",
                Ř: "R",
                Š: "S",
                Ť: "T",
                Ů: "U",
                Ž: "Z",
              },
              fi: { ä: "a", Ä: "A", ö: "o", Ö: "O" },
              hu: {
                ä: "a",
                Ä: "A",
                ö: "o",
                Ö: "O",
                ü: "u",
                Ü: "U",
                ű: "u",
                Ű: "U",
              },
              lt: {
                ą: "a",
                č: "c",
                ę: "e",
                ė: "e",
                į: "i",
                š: "s",
                ų: "u",
                ū: "u",
                ž: "z",
                Ą: "A",
                Č: "C",
                Ę: "E",
                Ė: "E",
                Į: "I",
                Š: "S",
                Ų: "U",
                Ū: "U",
              },
              lv: {
                ā: "a",
                č: "c",
                ē: "e",
                ģ: "g",
                ī: "i",
                ķ: "k",
                ļ: "l",
                ņ: "n",
                š: "s",
                ū: "u",
                ž: "z",
                Ā: "A",
                Č: "C",
                Ē: "E",
                Ģ: "G",
                Ī: "i",
                Ķ: "k",
                Ļ: "L",
                Ņ: "N",
                Š: "S",
                Ū: "u",
                Ž: "Z",
              },
              pl: {
                ą: "a",
                ć: "c",
                ę: "e",
                ł: "l",
                ń: "n",
                ó: "o",
                ś: "s",
                ź: "z",
                ż: "z",
                Ą: "A",
                Ć: "C",
                Ę: "e",
                Ł: "L",
                Ń: "N",
                Ó: "O",
                Ś: "S",
                Ź: "Z",
                Ż: "Z",
              },
              sv: { ä: "a", Ä: "A", ö: "o", Ö: "O" },
              sk: { ä: "a", Ä: "A" },
              sr: { љ: "lj", њ: "nj", Љ: "Lj", Њ: "Nj", đ: "dj", Đ: "Dj" },
              tr: { Ü: "U", Ö: "O", ü: "u", ö: "o" },
            }),
            (c = {
              ar: {
                "∆": "delta",
                "∞": "la-nihaya",
                "♥": "hob",
                "&": "wa",
                "|": "aw",
                "<": "aqal-men",
                ">": "akbar-men",
                "∑": "majmou",
                "¤": "omla",
              },
              az: {},
              ca: {
                "∆": "delta",
                "∞": "infinit",
                "♥": "amor",
                "&": "i",
                "|": "o",
                "<": "menys que",
                ">": "mes que",
                "∑": "suma dels",
                "¤": "moneda",
              },
              cs: {
                "∆": "delta",
                "∞": "nekonecno",
                "♥": "laska",
                "&": "a",
                "|": "nebo",
                "<": "mensi nez",
                ">": "vetsi nez",
                "∑": "soucet",
                "¤": "mena",
              },
              de: {
                "∆": "delta",
                "∞": "unendlich",
                "♥": "Liebe",
                "&": "und",
                "|": "oder",
                "<": "kleiner als",
                ">": "groesser als",
                "∑": "Summe von",
                "¤": "Waehrung",
              },
              dv: {
                "∆": "delta",
                "∞": "kolunulaa",
                "♥": "loabi",
                "&": "aai",
                "|": "noonee",
                "<": "ah vure kuda",
                ">": "ah vure bodu",
                "∑": "jumula",
                "¤": "faisaa",
              },
              en: {
                "∆": "delta",
                "∞": "infinity",
                "♥": "love",
                "&": "and",
                "|": "or",
                "<": "less than",
                ">": "greater than",
                "∑": "sum",
                "¤": "currency",
              },
              es: {
                "∆": "delta",
                "∞": "infinito",
                "♥": "amor",
                "&": "y",
                "|": "u",
                "<": "menos que",
                ">": "mas que",
                "∑": "suma de los",
                "¤": "moneda",
              },
              fa: {
                "∆": "delta",
                "∞": "bi-nahayat",
                "♥": "eshgh",
                "&": "va",
                "|": "ya",
                "<": "kamtar-az",
                ">": "bishtar-az",
                "∑": "majmooe",
                "¤": "vahed",
              },
              fi: {
                "∆": "delta",
                "∞": "aarettomyys",
                "♥": "rakkaus",
                "&": "ja",
                "|": "tai",
                "<": "pienempi kuin",
                ">": "suurempi kuin",
                "∑": "summa",
                "¤": "valuutta",
              },
              fr: {
                "∆": "delta",
                "∞": "infiniment",
                "♥": "Amour",
                "&": "et",
                "|": "ou",
                "<": "moins que",
                ">": "superieure a",
                "∑": "somme des",
                "¤": "monnaie",
              },
              ge: {
                "∆": "delta",
                "∞": "usasruloba",
                "♥": "siqvaruli",
                "&": "da",
                "|": "an",
                "<": "naklebi",
                ">": "meti",
                "∑": "jami",
                "¤": "valuta",
              },
              gr: {},
              hu: {
                "∆": "delta",
                "∞": "vegtelen",
                "♥": "szerelem",
                "&": "es",
                "|": "vagy",
                "<": "kisebb mint",
                ">": "nagyobb mint",
                "∑": "szumma",
                "¤": "penznem",
              },
              it: {
                "∆": "delta",
                "∞": "infinito",
                "♥": "amore",
                "&": "e",
                "|": "o",
                "<": "minore di",
                ">": "maggiore di",
                "∑": "somma",
                "¤": "moneta",
              },
              lt: {
                "∆": "delta",
                "∞": "begalybe",
                "♥": "meile",
                "&": "ir",
                "|": "ar",
                "<": "maziau nei",
                ">": "daugiau nei",
                "∑": "suma",
                "¤": "valiuta",
              },
              lv: {
                "∆": "delta",
                "∞": "bezgaliba",
                "♥": "milestiba",
                "&": "un",
                "|": "vai",
                "<": "mazak neka",
                ">": "lielaks neka",
                "∑": "summa",
                "¤": "valuta",
              },
              my: {
                "∆": "kwahkhyaet",
                "∞": "asaonasme",
                "♥": "akhyait",
                "&": "nhin",
                "|": "tho",
                "<": "ngethaw",
                ">": "kyithaw",
                "∑": "paungld",
                "¤": "ngwekye",
              },
              mk: {},
              nl: {
                "∆": "delta",
                "∞": "oneindig",
                "♥": "liefde",
                "&": "en",
                "|": "of",
                "<": "kleiner dan",
                ">": "groter dan",
                "∑": "som",
                "¤": "valuta",
              },
              pl: {
                "∆": "delta",
                "∞": "nieskonczonosc",
                "♥": "milosc",
                "&": "i",
                "|": "lub",
                "<": "mniejsze niz",
                ">": "wieksze niz",
                "∑": "suma",
                "¤": "waluta",
              },
              pt: {
                "∆": "delta",
                "∞": "infinito",
                "♥": "amor",
                "&": "e",
                "|": "ou",
                "<": "menor que",
                ">": "maior que",
                "∑": "soma",
                "¤": "moeda",
              },
              ro: {
                "∆": "delta",
                "∞": "infinit",
                "♥": "dragoste",
                "&": "si",
                "|": "sau",
                "<": "mai mic ca",
                ">": "mai mare ca",
                "∑": "suma",
                "¤": "valuta",
              },
              ru: {
                "∆": "delta",
                "∞": "beskonechno",
                "♥": "lubov",
                "&": "i",
                "|": "ili",
                "<": "menshe",
                ">": "bolshe",
                "∑": "summa",
                "¤": "valjuta",
              },
              sk: {
                "∆": "delta",
                "∞": "nekonecno",
                "♥": "laska",
                "&": "a",
                "|": "alebo",
                "<": "menej ako",
                ">": "viac ako",
                "∑": "sucet",
                "¤": "mena",
              },
              sr: {},
              tr: {
                "∆": "delta",
                "∞": "sonsuzluk",
                "♥": "ask",
                "&": "ve",
                "|": "veya",
                "<": "kucuktur",
                ">": "buyuktur",
                "∑": "toplam",
                "¤": "para birimi",
              },
              uk: {
                "∆": "delta",
                "∞": "bezkinechnist",
                "♥": "lubov",
                "&": "i",
                "|": "abo",
                "<": "menshe",
                ">": "bilshe",
                "∑": "suma",
                "¤": "valjuta",
              },
              vn: {
                "∆": "delta",
                "∞": "vo cuc",
                "♥": "yeu",
                "&": "va",
                "|": "hoac",
                "<": "nho hon",
                ">": "lon hon",
                "∑": "tong",
                "¤": "tien te",
              },
            }),
            (u = [";", "?", ":", "@", "&", "=", "+", "$", ",", "/"].join("")),
            (l = [";", "?", ":", "@", "&", "=", "+", "$", ","].join("")),
            (p = [".", "!", "~", "*", "'", "(", ")"].join("")),
            (d = function (e, t) {
              var n,
                d,
                v,
                m,
                g,
                _,
                b,
                y,
                E,
                k,
                O,
                T,
                x,
                I,
                C = "-",
                S = "",
                w = "",
                N = !0,
                A = {},
                P = "";
              if ("string" != typeof e) return "";
              if (
                ("string" == typeof t && (C = t),
                (b = c.en),
                (y = s.en),
                "object" === i(t))
              )
                for (O in ((n = t.maintainCase || !1),
                (A = t.custom && "object" === i(t.custom) ? t.custom : A),
                (v = (+t.truncate > 1 && t.truncate) || !1),
                (m = t.uric || !1),
                (g = t.uricNoSlash || !1),
                (_ = t.mark || !1),
                (N = !1 !== t.symbols && !1 !== t.lang),
                (C = t.separator || C),
                m && (P += u),
                g && (P += l),
                _ && (P += p),
                (b = t.lang && c[t.lang] && N ? c[t.lang] : N ? c.en : {}),
                (y =
                  t.lang && s[t.lang]
                    ? s[t.lang]
                    : !1 === t.lang || !0 === t.lang
                    ? {}
                    : s.en),
                t.titleCase &&
                "number" == typeof t.titleCase.length &&
                Array.prototype.toString.call(t.titleCase)
                  ? (t.titleCase.forEach(function (e) {
                      A[e + ""] = e + "";
                    }),
                    (d = !0))
                  : (d = !!t.titleCase),
                t.custom &&
                  "number" == typeof t.custom.length &&
                  Array.prototype.toString.call(t.custom) &&
                  t.custom.forEach(function (e) {
                    A[e + ""] = e + "";
                  }),
                Object.keys(A).forEach(function (t) {
                  var n;
                  (n =
                    t.length > 1
                      ? new RegExp("\\b" + f(t) + "\\b", "gi")
                      : new RegExp(f(t), "gi")),
                    (e = e.replace(n, A[t]));
                }),
                A))
                  P += O;
              for (
                P = f((P += C)),
                  x = !1,
                  I = !1,
                  k = 0,
                  T = (e = e.replace(/(^\s+|\s+$)/g, "")).length;
                k < T;
                k++
              )
                (O = e[k]),
                  h(O, A)
                    ? (x = !1)
                    : y[O]
                    ? ((O = x && y[O].match(/[A-Za-z0-9]/) ? " " + y[O] : y[O]),
                      (x = !1))
                    : O in r
                    ? (k + 1 < T && o.indexOf(e[k + 1]) >= 0
                        ? ((w += O), (O = ""))
                        : !0 === I
                        ? ((O = a[w] + r[O]), (w = ""))
                        : (O =
                            x && r[O].match(/[A-Za-z0-9]/) ? " " + r[O] : r[O]),
                      (x = !1),
                      (I = !1))
                    : O in a
                    ? ((w += O), (O = ""), k === T - 1 && (O = a[w]), (I = !0))
                    : !b[O] ||
                      (m && -1 !== u.indexOf(O)) ||
                      (g && -1 !== l.indexOf(O))
                    ? (!0 === I
                        ? ((O = a[w] + O), (w = ""), (I = !1))
                        : x &&
                          (/[A-Za-z0-9]/.test(O) ||
                            S.substr(-1).match(/A-Za-z0-9]/)) &&
                          (O = " " + O),
                      (x = !1))
                    : ((O =
                        x || S.substr(-1).match(/[A-Za-z0-9]/)
                          ? C + b[O]
                          : b[O]),
                      (O +=
                        void 0 !== e[k + 1] && e[k + 1].match(/[A-Za-z0-9]/)
                          ? C
                          : ""),
                      (x = !0)),
                  (S += O.replace(new RegExp("[^\\w\\s" + P + "_-]", "g"), C));
              return (
                d &&
                  (S = S.replace(/(\w)(\S*)/g, function (e, t, n) {
                    var r = t.toUpperCase() + (null !== n ? n : "");
                    return Object.keys(A).indexOf(r.toLowerCase()) < 0
                      ? r
                      : r.toLowerCase();
                  })),
                (S = S.replace(/\s+/g, C)
                  .replace(new RegExp("\\" + C + "+", "g"), C)
                  .replace(
                    new RegExp("(^\\" + C + "+|\\" + C + "+$)", "g"),
                    ""
                  )),
                v &&
                  S.length > v &&
                  ((E = S.charAt(v) === C),
                  (S = S.slice(0, v)),
                  E || (S = S.slice(0, S.lastIndexOf(C)))),
                n || d || (S = S.toLowerCase()),
                S
              );
            }),
            (f = function (e) {
              return e.replace(/[-\\^$*+?.()|[\]{}\/]/g, "\\$&");
            }),
            (h = function (e, t) {
              for (var n in t) if (t[n] === e) return !0;
            }),
            e.exports
              ? ((e.exports = d),
                (e.exports.createSlug = function (e) {
                  return function (t) {
                    return d(t, e);
                  };
                }))
              : void 0 ===
                  (n = function () {
                    return d;
                  }.apply(t, [])) || (e.exports = n);
        },
    },
    v = {};
  function m(e) {
    var t = v[e];
    if (void 0 !== t) return t.exports;
    var n = (v[e] = { exports: {} });
    return h[e].call(n.exports, n, n.exports, m), n.exports;
  }
  (m.n = function (e) {
    var t =
      e && e.__esModule
        ? function () {
            return e.default;
          }
        : function () {
            return e;
          };
    return m.d(t, { a: t }), t;
  }),
    (m.d = function (e, t) {
      for (var n in t)
        m.o(t, n) &&
          !m.o(e, n) &&
          Object.defineProperty(e, n, { enumerable: !0, get: t[n] });
    }),
    (m.g = (function () {
      if (
        "object" ===
        ("undefined" == typeof globalThis ? "undefined" : i(globalThis))
      )
        return globalThis;
      try {
        return this || new Function("return this")();
      } catch (e) {
        if (
          "object" === ("undefined" == typeof window ? "undefined" : i(window))
        )
          return window;
      }
    })()),
    (m.o = function (e, t) {
      return Object.prototype.hasOwnProperty.call(e, t);
    }),
    (m.r = function (e) {
      "undefined" != typeof Symbol &&
        Symbol.toStringTag &&
        Object.defineProperty(e, Symbol.toStringTag, { value: "Module" }),
        Object.defineProperty(e, "__esModule", { value: !0 });
    });
  var g = {};
  !(function () {
    /*!************************!*\
      !*** ./src/backend.ts ***!
      \************************/
    m.r(g);
    var e = m(/*! @back/index */ "../app-backend-core/lib/index.js"),
      t = m(/*! @vue-devtools/shared-utils */ "../shared-utils/lib/index.js");
    t.target.__VUE_DEVTOOLS_ON_SOCKET_READY__(function () {
      var n = t.target.__VUE_DEVTOOLS_SOCKET__,
        r = function () {
          t.target.__VUE_DEVTOOLS_TOAST__ &&
            t.target.__VUE_DEVTOOLS_TOAST__(
              "Remote Devtools Disconnected",
              "error"
            );
        };
      n.on("connect", function () {
        t.target.__VUE_DEVTOOLS_TOAST__ &&
          t.target.__VUE_DEVTOOLS_TOAST__(
            "Remote Devtools Connected",
            "normal"
          ),
          (0, e.initBackend)(o),
          n.emit("vue-devtools-init");
      }),
        n.on("disconnect", function () {
          n.disconnect(), r();
        }),
        n.on("vue-devtools-disconnect-backend", function () {
          n.disconnect();
        });
      var o = new t.Bridge({
        listen: function (e) {
          n.on("vue-message", function (t) {
            return e(t);
          });
        },
        send: function (e) {
          n.emit("vue-message", e);
        },
      });
      o.on("shutdown", function () {
        n.disconnect(), r();
      });
    });
  })();
})();
