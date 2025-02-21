(global.webpackJsonp = global.webpackJsonp || []).push([
  ["pages/index/index"],
  {
    "08df": function (e, t, a) {
      "use strict";
      var n = a("402f");
      a.n(n).a;
    },
    "402f": function (e, t, a) {},
    8069: function (e, t, a) {
      "use strict";
      a.r(t);
      var n = a("d0ea"),
        s = a.n(n);
      for (var r in n)
        ["default"].indexOf(r) < 0 &&
          (function (e) {
            a.d(t, e, function () {
              return n[e];
            });
          })(r);
      t.default = s.a;
    },
    d0ea: function (e, t, a) {
      "use strict";
      (function (e) {
        var n = a("4ea4");
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.default = void 0);
        var s = n(a("a34a")),
          r = n(a("c973")),
          o = a("ca00"),
          u = n(a("295b")),
          i = a("9861"),
          c = a("f4bc"),
          l = a("532c"),
          f = a("effb"),
          d = a("9f15"),
          g = n(a("461a")),
          S = n(a("d79b")),
          p = n(a("038e")),
          b = n(a("b6a0")),
          y = n(a("2309")),
          v = u.default.baseKey,
          h = u.default.storeFileVerson,
          m =
            (u.default.needParentAuthRouter,
            {
              name: "index",
              mixins: [g.default, b.default, S.default, p.default],
              data: function () {
                return {
                  showText: !1,
                  debug: !1,
                  path: "",
                  windowHeight: 667,
                  openFlag: !1,
                  time: 3e3,
                  showCountdown: !0,
                  navigateBarHeight: 0,
                  screenHeight: 667,
                };
              },
              components: {
                countdown: function () {
                  a.e("baseComponents/countdown/index2")
                    .then(
                      function () {
                        return resolve(a("dc26"));
                      }.bind(null, a)
                    )
                    .catch(a.oe);
                },
                log: function () {
                  a.e("baseComponents/log/index")
                    .then(
                      function () {
                        return resolve(a("4d55"));
                      }.bind(null, a)
                    )
                    .catch(a.oe);
                },
              },
              onLoad: function (e) {
                var t = this;
                console.log("querys onLoad", e),
                  y.default.setBusState("entryType", 2, "SYSTEM");
                var a = e,
                  n = y.default.getBusState("entryQueryObjs", "SYSTEM");
                if (n) {
                  var s = {};
                  for (var r in n)
                    n.hasOwnProperty(r) &&
                      ("codeSpecial" == r
                        ? (s[r] = 0)
                        : "__breakCheck" != r && (s[r] = ""));
                  console.warn("需要重置的页面入参", n),
                    y.default.setBusState("baseInfo", s, "SYSTEM"),
                    (0, d.addRlog)(n, "需要重置入参");
                  var u = y.default.getBusState("baseInfo", "SYSTEM");
                  console.warn("重置后后页面入参", u),
                    (0, d.addRlog)(u, "重置之后");
                }
                if (!(0, o.isObjEmpty)(a)) {
                  var l = (0, o.deepCopyObj)(a);
                  y.default.setBusState("entryMinProQuery", l, "SYSTEM", !0);
                  var f = setTimeout(function () {
                    (0, i.startLogAction)(c.loggerkeys.ENTRYQUERY).endAction({
                      query: JSON.stringify(l),
                    }),
                      clearTimeout(f);
                  }, 500);
                }
                this.getSetData(a).then(function (e) {
                  t.dealQuerys(a);
                });
              },
              onReady: function () {
                (this.windowHeight = (0, o.getSystemInfoSync)().windowHeight),
                  (this.navigateBarHeight =
                    y.default.getDecorate("SYSTEM").navigateBarHeight),
                  (0, o.getStorageSync)(u.default.debugKey) &&
                    ((this.debug = !0),
                    y.default.setBusState("debug", !0, "SYSTEM"));
              },
              beforeDestroy: function () {
                this.$refs.countdown && this.$refs.countdown.clearTimer();
              },
              methods: {
                dealQuerys: function (e) {
                  var t = this;
                  Promise.all([this.getGcId(e), this.getWXToken()]).then(
                    (function () {
                      var a = (0, r.default)(
                        s.default.mark(function a(n) {
                          var r, u, i, c, l, f, g, S, p, b;
                          return s.default.wrap(function (a) {
                            for (;;)
                              switch ((a.prev = a.next)) {
                                case 0:
                                  if (
                                    ((r = n[0]),
                                    (u = n[1]),
                                    r.request &&
                                      y.default.setBusState(
                                        "baseInfo",
                                        { gcId: r.value.result.gcid },
                                        "SYSTEM"
                                      ),
                                    !r.request ||
                                      0 != r.value.status ||
                                      !u.request ||
                                      0 != u.value.status)
                                  ) {
                                    a.next = 6;
                                    break;
                                  }
                                  t.saveData(
                                    u.value.result,
                                    r.value.result.gcid
                                  ),
                                    (a.next = 18);
                                  break;
                                case 6:
                                  if (!r.request || 0 != r.value.status) {
                                    a.next = 10;
                                    break;
                                  }
                                  t.saveGcIdData(r.value.result.gcid),
                                    (a.next = 18);
                                  break;
                                case 10:
                                  if (!u.request || 0 != u.value.status) {
                                    a.next = 14;
                                    break;
                                  }
                                  t.saveData(
                                    u.value.result,
                                    y.default.getBusState("baseInfo", "SYSTEM")
                                      .gcId
                                  ),
                                    (a.next = 18);
                                  break;
                                case 14:
                                  if (!u.request || -1 != u.value.status) {
                                    a.next = 18;
                                    break;
                                  }
                                  return (
                                    y.default.setBusState(
                                      "error",
                                      { type: 1, message: u.value.message },
                                      "SYSTEM"
                                    ),
                                    t.turnErrorPage(),
                                    a.abrupt("return")
                                  );
                                case 18:
                                  return (
                                    (i = y.default.getBusState(
                                      "baseInfo",
                                      "SYSTEM"
                                    ).gcId),
                                    y.default.zaMin.setOpenid(
                                      y.default.getBusState(
                                        "baseInfo",
                                        "SYSTEM"
                                      ).openId
                                    ),
                                    y.default.zaMin.setUnionId(
                                      y.default.getBusState(
                                        "baseInfo",
                                        "SYSTEM"
                                      ).unionId
                                    ),
                                    y.default.zaMin.init(),
                                    (0, o.initCutomTypes)(i),
                                    t.getFonts(i),
                                    t.getSysUser(),
                                    t.getMobileRegisterSet(),
                                    (a.next = 28),
                                    t.analysisParams(e)
                                  );
                                case 28:
                                  e.context &&
                                    e.q &&
                                    ((c = decodeURIComponent(e.q)),
                                    "livecode" == (l = t.getQrModel(c))
                                      ? ((f = c.lastIndexOf("/")),
                                        (g = c.lastIndexOf("?")),
                                        (S = c.substring(f + 1, g)),
                                        (0, d.addRlog)(c, "livecode"),
                                        y.default
                                          .getData({
                                            name: "getLiveCodeLink",
                                            nameSpace: "SYSTEM",
                                            params: { shortCode: S },
                                          })
                                          .then(function (a) {
                                            if (0 == a.status) {
                                              var n = a.result;
                                              console.log("getLiveCodeLink", n);
                                              var s = (0, o.stringQuery2Obj)(
                                                n.substring(
                                                  n.indexOf("?") + 1,
                                                  n.length
                                                )
                                              );
                                              t.queryParse(s),
                                                y.default.setBusState(
                                                  "baseInfo",
                                                  s,
                                                  "SYSTEM"
                                                ),
                                                (s.q = e.q),
                                                t.setEntryQuery(s),
                                                (0, d.addRlog)(
                                                  n,
                                                  "getLiveCodeLink"
                                                );
                                            }
                                          }))
                                      : "qrcode" == l &&
                                        (c.indexOf("?") > -1 &&
                                          (p = c.substring(
                                            c.indexOf("?") + 1,
                                            c.length
                                          )),
                                        p &&
                                          ((b = (0, o.stringQuery2Obj)(p)),
                                          t.queryParse(b),
                                          y.default.setBusState(
                                            "baseInfo",
                                            b,
                                            "SYSTEM"
                                          ),
                                          (b.q = e.q),
                                          t.setEntryQuery(b),
                                          (0, d.addRlog)(p, "qrcode")))),
                                    t.getGcSwitch().then(function () {
                                      t.programBegin(!1);
                                    });
                                case 30:
                                case "end":
                                  return a.stop();
                              }
                          }, a);
                        })
                      );
                      return function (e) {
                        return a.apply(this, arguments);
                      };
                    })()
                  );
                },
                getGcSwitch: function () {
                  return new Promise(function (e, t) {
                    y.default
                      .getData({ name: "getGcSwitch", nameSpace: "SYSTEM" })
                      .then(function (t) {
                        if (0 == t.status) {
                          var a = t.result,
                            n = a.cardKindDecorationFlag,
                            s = a.cdpLikeTopUpGcFlag,
                            r = a.cdpMultipleDishesGcFlag;
                          y.default.setBusState(
                            "cardKindDecorationFlag",
                            n,
                            "SYSTEM"
                          ),
                            y.default.setBusState(
                              "cdpLikeTopUpGcFlag",
                              s,
                              "SYSTEM"
                            ),
                            y.default.setBusState(
                              "cdpMultipleDishesGcFlag",
                              r,
                              "SYSTEM"
                            ),
                            y.default.setBusState(
                              "cdpAiWaiterGcFlag",
                              a.cdpAiWaiterGcFlag,
                              "SYSTEM"
                            );
                        } else y.default.setBusState("cardKindDecorationFlag", 0, "SYSTEM"), y.default.setBusState("cdpMultipleDishesGcFlag", 0, "SYSTEM");
                        e(!0);
                      });
                  });
                },
                getSetData: function (e) {
                  return Promise.resolve();
                },
                setEntryQuery: function (e) {
                  var t = setTimeout(function () {
                    var a = y.default.getBusState("entryQueryObjs", "SYSTEM");
                    for (var n in e) a[n] = e[n];
                    console.log("_entryQueryObjs", a),
                      y.default.setBusState("entryQueryObjs", a, "SYSTEM"),
                      clearTimeout(t);
                  }, 500);
                },
                getFonts: function (t) {
                  var a = u.default.fontsSet[t];
                  a
                    ? (0, o.loadFont)(a.name, a.url)
                    : e.getStorage({
                        key: "dubugFont" + v,
                        success: function (e) {
                          var t = e.data;
                          if (
                            (console.log("调试字体下载"),
                            t && u.default.fontsSet[t])
                          ) {
                            var a = u.default.fontsSet[t];
                            (0, o.loadFont)(a.name, a.url);
                          }
                        },
                      });
                },
                getGcId: function (e) {
                  return new Promise(function (e, t) {
                    var a = y.default.getBusState("baseInfo", "SYSTEM");
                    if (a.gcId) e({ request: !1 });
                    else {
                      var n = { key: "mpId" };
                      (n.val = a.mpId),
                        y.default
                          .getData({
                            name: "groupinfo",
                            ifStore: !1,
                            nameSpace: "SYSTEM",
                            params: n,
                          })
                          .then(function (a) {
                            0 == a.status
                              ? e({ request: !0, value: a })
                              : t({ request: !1, value: a.message });
                          });
                    }
                  });
                },
                analysisParams: function (e) {
                  var t = this;
                  return (0, r.default)(
                    s.default.mark(function a() {
                      var n,
                        r,
                        i,
                        c,
                        l,
                        f,
                        g,
                        S,
                        p,
                        b,
                        v,
                        h,
                        m,
                        x,
                        T,
                        E,
                        M,
                        I,
                        B,
                        Y,
                        O,
                        k,
                        P,
                        D,
                        q,
                        w,
                        Q,
                        C,
                        j,
                        U,
                        F,
                        R,
                        L,
                        G,
                        _,
                        A,
                        H,
                        N,
                        K,
                        z,
                        $,
                        J,
                        W,
                        V;
                      return s.default.wrap(function (a) {
                        for (;;)
                          switch ((a.prev = a.next)) {
                            case 0:
                              if (((n = {}), (0, o.isObjEmpty)(e))) {
                                a.next = 59;
                                break;
                              }
                              if (((r = {}), !e.scene)) {
                                a.next = 17;
                                break;
                              }
                              if (
                                ((c = decodeURIComponent(e.scene)),
                                (l = u.default.sceneSplitJoin),
                                (f = "&"),
                                -1 == c.indexOf(f) &&
                                  l.some(function (e) {
                                    if (c.indexOf(e) > -1) return (f = e), !0;
                                  }),
                                (g = c.split(f)),
                                (S = g[0]),
                                (p = []),
                                (b = u.default.sceneEmptyQueryPlace),
                                (v =
                                  u.default.sceneRouterQuery[S.toUpperCase()] ||
                                  {})[g[1]]
                                  ? (p = v[g[1]])
                                  : u.default.sceneQueryOrder[
                                      S.toUpperCase()
                                    ] &&
                                    (p =
                                      u.default.sceneQueryOrder[
                                        S.toUpperCase()
                                      ]),
                                g.forEach(function (e, t) {
                                  var a = p[t];
                                  e && a && -1 == b.indexOf(e) && (r[[a]] = e);
                                }),
                                (0, o.isObjEmpty)(r) && (0, o.isObjEmpty)(p))
                              )
                                if (
                                  ((h = u.default.sceneDefaultSet),
                                  (p = h.queryOrder),
                                  isNaN(g[0]))
                                ) {
                                  if (
                                    ((m = u.default.parmScene),
                                    S && m.first == S.toLowerCase())
                                  )
                                    for (x = m.split, T = 1; T < g.length; T++)
                                      (E = g[T]) &&
                                        E.indexOf(x) > -1 &&
                                        ((M = E.split(x)),
                                        (I = M[0]),
                                        (B = M[1]),
                                        (r[[I]] = B));
                                } else
                                  g.forEach(function (e, t) {
                                    var a = p[t];
                                    e &&
                                      a &&
                                      -1 == b.indexOf(e) &&
                                      (r[[a]] = e);
                                  }),
                                    (0, o.isObjEmpty)(r) ||
                                      (r.context = h.context);
                              a.next = 57;
                              break;
                            case 17:
                              if (!e.context) {
                                a.next = 21;
                                break;
                              }
                              (r = e), (a.next = 57);
                              break;
                            case 21:
                              if (!e.q) {
                                a.next = 56;
                                break;
                              }
                              if (
                                ((Y = decodeURIComponent(e.q)),
                                (O = t.getQrModel(Y)),
                                console.log("qrcodeURL", Y),
                                Y.indexOf("?") > -1 &&
                                  (P = Y.substring(
                                    Y.indexOf("?") + 1,
                                    Y.length
                                  )),
                                (i = (0, o.stringQuery2Obj)(P)) && (r = i),
                                "qrcode" != O)
                              ) {
                                a.next = 36;
                                break;
                              }
                              (q = u.default.qrcodeMatch),
                                Object.keys(q).some(function (e) {
                                  if (Y.indexOf(e) > -1) {
                                    var t = q[e];
                                    return (
                                      (0, o.isString)(t)
                                        ? (k = q[e])
                                        : (0, o.isArray)(t) &&
                                          (t.length > 1
                                            ? ((k = t[0]), (D = t[1]))
                                            : (k = t[0])),
                                      !0
                                    );
                                  }
                                }),
                                !r.context && k && (r.context = k),
                                !r.page && D && (r.page = D),
                                (a.next = 54);
                              break;
                            case 36:
                              if ("livecode" != O) {
                                a.next = 47;
                                break;
                              }
                              return (
                                r.context ||
                                  ((w = u.default.livecodeMath),
                                  Object.keys(w).some(function (e) {
                                    if (Y.indexOf(e) > -1)
                                      return (k = w[e]), !0;
                                  }),
                                  (r.context = k)),
                                (Q = Y.lastIndexOf("/")),
                                (C = Y.lastIndexOf("?")),
                                (j = Y.substring(Q + 1, C)),
                                (a.next = 43),
                                y.default.getData({
                                  name: "getLiveCodeLink",
                                  nameSpace: "SYSTEM",
                                  params: { shortCode: j },
                                })
                              );
                            case 43:
                              0 == (U = a.sent).status
                                ? ((F = U.result),
                                  console.log("getLiveCodeLink", F),
                                  (R = (0, o.stringQuery2Obj)(
                                    F.substring(F.indexOf("?") + 1, F.length)
                                  )),
                                  Object.keys(R).forEach(function (e) {
                                    r[e] = R[e];
                                  }))
                                : (y.default.setBusState(
                                    "lackQuerys",
                                    !0,
                                    "SYSTEM"
                                  ),
                                  y.default.setBusState(
                                    "error",
                                    { type: 1, message: U.message },
                                    "SYSTEM"
                                  )),
                                (a.next = 54);
                              break;
                            case 47:
                              if ("wxcode" != O) {
                                a.next = 54;
                                break;
                              }
                              return (
                                (a.next = 50),
                                y.default.getData({
                                  name: "wxDincanConverterQrcode",
                                  nameSpace: "SYSTEM",
                                  params: { url: Y },
                                })
                              );
                            case 50:
                              0 == (L = a.sent).status &&
                                ((r.mcId = L.result.mcid),
                                L.result.hasOwnProperty("tableno") &&
                                  (r.tableNo = L.result.tableno),
                                L.result.hasOwnProperty("cusbusiness") &&
                                  (r.cusBusiness = L.result.cusbusiness)),
                                0 != L.status &&
                                  (y.default.setBusState(
                                    "lackQuerys",
                                    !0,
                                    "SYSTEM"
                                  ),
                                  y.default.setBusState(
                                    "error",
                                    { type: 1, message: L.message },
                                    "SYSTEM"
                                  )),
                                r.context ||
                                  ((G = u.default.wxcodeMath),
                                  Object.keys(G).some(function (e) {
                                    if (Y.indexOf(e) > -1)
                                      return (k = G[e]), !0;
                                  }),
                                  (r.context = k));
                            case 54:
                              a.next = 57;
                              break;
                            case 56:
                              r = e;
                            case 57:
                              Object.keys(r).forEach(function (e) {
                                n[e] = r[e];
                              });
                            case 59:
                              t.queryParse(n),
                                n.context &&
                                t.isBusinessType(n.context.toUpperCase())
                                  ? ((_ = n.context.toUpperCase()),
                                    (A = u.default.businessRequireQuerys[_]),
                                    (H = y.default.getBusState(
                                      "lackQuerys",
                                      "SYSTEM"
                                    )),
                                    (n.context = _),
                                    !H &&
                                      A &&
                                      ((N = []),
                                      (0, o.isObject2)(A)
                                        ? ((K = A.querys),
                                          (z = A.exclude),
                                          (!n.page ||
                                            (n.page &&
                                              -1 == z.indexOf(n.page))) &&
                                            (N = K))
                                        : (0, o.isArray)(A) && (N = A),
                                      ($ = []),
                                      N.forEach(function (e) {
                                        n[e] || $.push(e);
                                      }),
                                      $.length &&
                                        (y.default.setBusState(
                                          "lackQuerys",
                                          !0,
                                          "SYSTEM"
                                        ),
                                        y.default.setBusState(
                                          "error",
                                          {
                                            type: 1,
                                            message: ""
                                              .concat(_, "缺少入参")
                                              .concat($.join(" ")),
                                          },
                                          "SYSTEM"
                                        ))),
                                    n.page ||
                                      ((J = u.default.businessEntryPage[_]) &&
                                        (n.page = J)),
                                    (n.pageQuery = t.setPageQuery(n, [
                                      "mcid",
                                      "page",
                                      "context",
                                      "tableno",
                                      "cusbusiness",
                                    ])))
                                  : console.log(
                                      "参数模式无业务入参 用tabbar默认设置"
                                    ),
                                (n.codeSpecial = 0),
                                n.hasOwnProperty("sp1") && (n.codeSpecial = 1),
                                (W = t.filterUrlQuery(n)),
                                console.log("入口过滤querysObj", W),
                                y.default.setBusState("baseInfo", W, "SYSTEM"),
                                (V = setTimeout(function () {
                                  var e = (0, o.deepCopyObj)(W);
                                  y.default.setBusState(
                                    "entryQueryObjs",
                                    e,
                                    "SYSTEM"
                                  ),
                                    (0, d.addRlog)(e, "入门参数"),
                                    clearTimeout(V);
                                }, 300)),
                                console.log(
                                  "初始化baseInfo",
                                  y.default.getBusState("baseInfo", "SYSTEM")
                                );
                            case 68:
                            case "end":
                              return a.stop();
                          }
                      }, a);
                    })
                  )();
                },
                queryParse: function (e) {
                  var t = u.default.queryParse;
                  return (
                    Object.keys(t).forEach(function (a) {
                      e[a] && (e[t[a]] = e[a]);
                    }),
                    e
                  );
                },
                getQrModel: function (e) {
                  var t = u.default.qrcodeModel,
                    a = Object.keys(t),
                    n = "";
                  return (
                    console.log("qrcodeURL", e),
                    a.some(function (a) {
                      if (e.indexOf(a) > -1) return (n = t[a]), !0;
                    }),
                    n
                  );
                },
                isBusinessType: function (e) {
                  var t = !1;
                  return (
                    (0, o.obj2Values)(l.instanceTypes).indexOf(e) > -1 &&
                      (t = !0),
                    t
                  );
                },
                filterUrlQuery: function (e) {
                  var t = {},
                    a = u.default.urlQueryFilter;
                  for (var n in e) {
                    var s = n.toLowerCase();
                    -1 == a.indexOf(s) && (t[n] = e[n]);
                  }
                  return t;
                },
                turnErrorPage: function (t) {
                  e.navigateTo({
                    url: "/pages/system/errorPage/index",
                    complete: function () {
                      t && t();
                    },
                  });
                },
                programBegin: function () {
                  var t = this;
                  if (y.default.getBusState("lackQuerys", "SYSTEM"))
                    this.turnErrorPage(function () {
                      y.default.setBusState("lackQuerys", !1, "SYSTEM");
                    });
                  else {
                    var a = y.default.getBusState("baseInfo", "SYSTEM");
                    if (a.t) {
                      var n = new Date().getTime(),
                        s = parseInt(a.t);
                      if (s && 1e3 * s < n)
                        return void e.redirectTo({
                          url: "/pages/diancan2/overtimePopup/index",
                          success: function () {},
                          fail: function (e) {},
                        });
                    }
                    this.minDo().then(function (e) {
                      console.log("参数初始化完成"), t.init();
                    });
                  }
                },
                setPageQuery: function (e) {
                  var t =
                      arguments.length > 1 && void 0 !== arguments[1]
                        ? arguments[1]
                        : [],
                    a = [],
                    n = u.default.urlQueryFilter,
                    s = Object.keys(e);
                  return (
                    s.forEach(function (s) {
                      var r = s.toLowerCase();
                      -1 == t.indexOf(s) &&
                        -1 == n.indexOf(r) &&
                        a.push("".concat(s, "=").concat(e[s]));
                    }),
                    a
                  );
                },
                click: function () {
                  (this.openFlag = !1),
                    this.$refs.countdown.clearTimer(),
                    this.tabbar2Page();
                },
                reset: function (e) {
                  this.$refs.countdown.restart(e);
                },
                onFinish: function () {
                  this.tabbar2Page();
                },
                setDecorationUsr: function () {
                  var e =
                      y.default.getDecorate("SYSTEM").decorationData.commonSet
                        .authorize,
                    t = e.name,
                    a = e.memberAvatar,
                    n = y.default.getBusState("sysUser", "SYSTEM"),
                    s = {},
                    r = !1;
                  n.nickName ||
                    ((s.nickName = t || o.defaultNickName), (r = !0)),
                    n.avatarUrl ||
                      ((s.avatarUrl = a || o.defaultAvatarUrl), (r = !0)),
                    r &&
                      (this.updateUser(s),
                      y.default.setBusState("baseInfo", s, "SYSTEM"));
                },
                init: function () {
                  var e = this,
                    t = y.default.getBusState("baseInfo", "SYSTEM");
                  if (
                    (t.context &&
                      (console.log("baseInfo.context uninstall", t.context),
                      y.default.uninstall(t.context)),
                    t.context && t.page && "tabhome" != t.page)
                  ) {
                    var a = y.default.getBusiness("SYSTEM"),
                      n = t.context,
                      s = t.page;
                    y.default.injection(n, !1).then(function (r) {
                      Promise.all([
                        y.default.loadDecoration(n, s),
                        y.default.loadDecoration("SYSTEM"),
                      ]).then(function (o) {
                        var u = o[1],
                          i = o[0],
                          c = !1,
                          l = "";
                        if (
                          (u.hasData
                            ? a.setDecoration(u.value)
                            : ((c = !0), (l = u.message)),
                          c ||
                            (i.hasData
                              ? r.setDecoration(
                                  i.value,
                                  a.getCommonTabbar(),
                                  a.getCommontSet()
                                )
                              : ((c = !0), (l = i.message))),
                          c)
                        )
                          y.default.setBusState(
                            "error",
                            { type: 1, message: l },
                            "SYSTEM"
                          ),
                            e.toPage2({ page: "errorPage", context: "SYSTEM" });
                        else {
                          var f = t.pageQuery,
                            d = { page: s, context: n };
                          f && f.length && (d.query = f.join("&")),
                            e.setDecorationUsr(),
                            a
                              .entryBusiness("entrySystem", y.default, d)
                              .then(function (t) {
                                var a;
                                if (
                                  (console.log("resPage", t), t.values.length)
                                ) {
                                  var r = t.values[0];
                                  (a = r.query), (n = r.context), (s = r.page);
                                }
                                a
                                  ? f &&
                                    f.length &&
                                    f.forEach(function (e) {
                                      var t = e.split("=")[0];
                                      -1 == a.indexOf(t) && (a += "&" + e);
                                    })
                                  : f && f.length && (a = f.join("&")),
                                  e.entry2Page(s, a, n, y.default);
                              });
                        }
                      }),
                        e.preInitBusness(t.context);
                    });
                  } else
                    y.default.initDecoration("SYSTEM").then(
                      function (t) {
                        var a = t.decorationData.commonSet.openScreenAd.visible;
                        e.openFlag = a;
                        var n = t.getDefaultTabPage().context.toUpperCase();
                        console.log("context uninstall", n),
                          y.default.uninstall(n),
                          e.setDecorationUsr(),
                          a
                            ? ((e.path =
                                t.decorationData.commonSet.openScreenAd.src),
                              e.tabbarPreInitBusness(),
                              (e.screenHeight = (0,
                              o.getSystemInfoSync)().screenHeight))
                            : ((e.screenHeight = (0,
                              o.getSystemInfoSync)().windowHeight),
                              e.tabbar2Page());
                      },
                      function (t) {
                        var a = (0, o.isString)(t)
                          ? t
                          : "未获取到通用设置装修数据";
                        y.default.setBusState(
                          "error",
                          { type: 1, message: a },
                          "SYSTEM"
                        ),
                          e.toPage2({ page: "errorPage", context: "SYSTEM" });
                      }
                    );
                },
                saveData: function (t, a) {
                  y.default.setBusState("token", t.token, "SYSTEM"),
                    y.default.setBusState(
                      "baseInfo",
                      { openId: t.openId, unionId: t.unionId },
                      "SYSTEM"
                    ),
                    this.updateUser({ openId: t.openId, unionId: t.unionId });
                  var n = {
                    token: t.token,
                    exp: t.exp,
                    loginTime: new Date().getTime(),
                    openId: t.openId,
                    unionId: t.unionId,
                    storeFileVerson: h,
                  };
                  a && (n.gcId = a),
                    e.setStorage({
                      key: "authData" + v,
                      data: n,
                      success: function () {
                        console.log("初始化login接口成功");
                      },
                    });
                },
                saveGcIdData: function (t) {
                  e.getStorage({
                    key: "authData" + v,
                    success: function (a) {
                      var n = a.data;
                      (n.gcId = t),
                        e.setStorage({
                          key: "authData" + v,
                          data: n,
                          success: function () {
                            console.log("存储gcId成功");
                          },
                        });
                    },
                  });
                },
                getWXToken: function () {
                  var e = this;
                  return new Promise(function (t, a) {
                    if (y.default.getBusState("token", "SYSTEM")) {
                      var n = y.default.getBusState("baseInfo", "SYSTEM");
                      e.updateUser({ openId: n.openId, unionId: n.unionId }),
                        t({ request: !1 });
                    } else
                      (0, f.getAuthorizeData)().then(function (e) {
                        console.log("login"),
                          y.default.setBusState("wxMinCode", e.code, "SYSTEM"),
                          y.default
                            .getData({
                              name: "login",
                              nameSpace: "SYSTEM",
                              params: { code: e.code, mpid: e.mpid },
                            })
                            .then(function (e) {
                              t({ request: !0, value: e });
                            });
                      });
                  });
                },
                minDo: function () {
                  return Promise.resolve();
                },
                closeDebug: function () {
                  (this.debug = !1),
                    (0, o.setStorageSync)(u.default.debugKey, !0);
                },
                tabbar2Page: function () {
                  var e = this,
                    t = this,
                    a = y.default.getDecorate("SYSTEM").getDefaultTab();
                  if (a) {
                    var n = a.context.toUpperCase(),
                      s = a.routePath;
                    if (n && !y.default.isBusinessType(n))
                      return void this.tabBar2Page(a);
                    y.default.initDecoration(n).then(
                      function (e) {
                        console.log("initDecoration:".concat(n)),
                          y.default
                            .getBusiness("SYSTEM")
                            .entryBusiness("entrySystem", y.default, {
                              page: s,
                              context: n,
                            })
                            .then(function (e) {
                              var r;
                              if (e.values.length) {
                                var o = e.values[0];
                                (r = o.query), (n = o.context), (s = o.page);
                              }
                              t.toPage2({
                                page: s,
                                query: r,
                                context: n,
                                pageTitle: a.tabbarText,
                                toRules: !0,
                              });
                            });
                      },
                      function (t) {
                        y.default.setBusState(
                          "error",
                          {
                            type: 1,
                            message: "未获取到【".concat(
                              a.tabbarText,
                              "】装修数据"
                            ),
                          },
                          "SYSTEM"
                        ),
                          e.toPage2({ page: "errorPage", context: "SYSTEM" });
                      }
                    );
                  } else
                    y.default.setBusState(
                      "error",
                      { type: 1, message: "系统未找到默认tabbar设置项" },
                      "SYSTEM"
                    ),
                      t.toPage2({ page: "errorPage", context: "SYSTEM" }),
                      console.warn("进入系统未找到默认tab设置项");
                },
                entry2Page: function (e, t, a, n) {
                  var s = this,
                    r = n.getBusiness(a),
                    o = n.getBusState("baseInfo", "SYSTEM");
                  console.log("直接进入page装修对象完成"),
                    r
                      .entryBusiness(e, n, { page: e, context: a, query: t })
                      .then(function (t) {
                        console.log("页面解析规则完成");
                        var n = t.values,
                          r = { page: e, context: a };
                        if (n.length) {
                          var u = n[n.length - 1];
                          u.context &&
                            u.page &&
                            ((r.page = u.page),
                            (r.redirect = !!u.redirect),
                            (r.context = u.context),
                            (r.toRules = !!u.toRules),
                            u.successCb && (r.successCb = u.successCb),
                            u.query && (r.query = u.query));
                        }
                        r.query
                          ? o.pageQuery.forEach(function (e) {
                              var t = e.split("=")[0];
                              -1 == r.query.indexOf(t) && (r.query += "&" + e);
                            })
                          : o.pageQuery &&
                            o.pageQuery.length &&
                            (r.query = o.pageQuery.join("&")),
                          s.toPage2(r);
                      });
                },
                preInitBusness: function (e) {
                  y.default.preInitInterFace(e, {
                    delay: 350,
                    ifStore: !0,
                    preReq: !0,
                  });
                },
                tabbarPreInitBusness: function () {
                  var e = y.default.getDecorate("SYSTEM").getDefaultTab();
                  if (e) {
                    var t = e.context.toUpperCase();
                    this.preInitBusness(t);
                  }
                },
              },
            });
        t.default = m;
      }).call(this, a("543d").default);
    },
    d5378: function (e, t, a) {
      "use strict";
      (function (e) {
        var t = a("4ea4");
        a("6cdc"), t(a("66fd"));
        var n = t(a("f75a"));
        (wx.__webpack_require_UNI_MP_PLUGIN__ = a), e(n.default);
      }).call(this, a("543d").createPage);
    },
    f4d3: function (e, t, a) {
      "use strict";
      a.d(t, "b", function () {
        return n;
      }),
        a.d(t, "c", function () {
          return s;
        }),
        a.d(t, "a", function () {});
      var n = function () {
          this.$createElement, this._self._c;
        },
        s = [];
    },
    f75a: function (e, t, a) {
      "use strict";
      a.r(t);
      var n = a("f4d3"),
        s = a("8069");
      for (var r in s)
        ["default"].indexOf(r) < 0 &&
          (function (e) {
            a.d(t, e, function () {
              return s[e];
            });
          })(r);
      a("08df");
      var o = a("f0c5"),
        u = Object(o.a)(
          s.default,
          n.b,
          n.c,
          !1,
          null,
          "74247ad8",
          null,
          !1,
          n.a,
          void 0
        );
      t.default = u.exports;
    },
  },
  [["d5378", "common/runtime", "common/vendor"]],
]);
