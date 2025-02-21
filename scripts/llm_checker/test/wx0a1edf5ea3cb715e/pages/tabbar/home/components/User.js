(global.webpackJsonp = global.webpackJsonp || []).push([
  ["pages/tabbar/home/components/User"],
  {
    "54b4": function (e, t, n) {
      n.r(t);
      var r = n("c897"),
        a = n.n(r);
      for (var o in r)
        ["default"].indexOf(o) < 0 &&
          (function (e) {
            n.d(t, e, function () {
              return r[e];
            });
          })(o);
      t.default = a.a;
    },
    "672a": function (e, t, n) {
      n.d(t, "b", function () {
        return r;
      }),
        n.d(t, "c", function () {
          return a;
        }),
        n.d(t, "a", function () {});
      var r = function () {
          var e = this,
            t =
              (e.$createElement,
              e._self._c,
              e.__map(e.dataList, function (t, n) {
                return {
                  $orig: e.__get_orig(t),
                  f0: 0 !== e.current ? e._f("format")(t.distance) : null,
                };
              }));
          e.$mp.data = Object.assign({}, { $root: { l0: t } });
        },
        a = [];
    },
    8036: function (e, t, n) {
      n.r(t);
      var r = n("672a"),
        a = n("54b4");
      for (var o in a)
        ["default"].indexOf(o) < 0 &&
          (function (e) {
            n.d(t, e, function () {
              return a[e];
            });
          })(o);
      n("ebf4");
      var c = n("f0c5"),
        u = Object(c.a)(
          a.default,
          r.b,
          r.c,
          !1,
          null,
          "a45a49c8",
          null,
          !1,
          r.a,
          void 0
        );
      t.default = u.exports;
    },
    "8cfd": function (e, t, n) {},
    c897: function (e, t, n) {
      (function (e) {
        var r = n("4ea4");
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.default = void 0);
        var a = r(n("2eee")),
          o = r(n("c973")),
          c = r(n("9523")),
          u = n("426c"),
          s = n("26cb");
        function i(e, t) {
          var n = Object.keys(e);
          if (Object.getOwnPropertySymbols) {
            var r = Object.getOwnPropertySymbols(e);
            t &&
              (r = r.filter(function (t) {
                return Object.getOwnPropertyDescriptor(e, t).enumerable;
              })),
              n.push.apply(n, r);
          }
          return n;
        }
        var f = {
          data: function () {
            return { amount: "", isRechage: !1, ishowKiss: !1 };
          },
          props: {
            dataList: {
              default: function () {
                return [];
              },
              type: Array,
            },
            current: { default: 0, type: Number },
          },
          filters: {
            format: function (e) {
              return e ? (e / 1e3).toFixed(1) : "";
            },
          },
          computed: (function (e) {
            for (var t = 1; t < arguments.length; t++) {
              var n = null != arguments[t] ? arguments[t] : {};
              t % 2
                ? i(Object(n), !0).forEach(function (t) {
                    (0, c.default)(e, t, n[t]);
                  })
                : Object.getOwnPropertyDescriptors
                ? Object.defineProperties(
                    e,
                    Object.getOwnPropertyDescriptors(n)
                  )
                : i(Object(n)).forEach(function (t) {
                    Object.defineProperty(
                      e,
                      t,
                      Object.getOwnPropertyDescriptor(n, t)
                    );
                  });
            }
            return e;
          })(
            {},
            (0, s.mapState)({
              userInfo: function (e) {
                return e.user.userInfo;
              },
            })
          ),
          watch: {
            userInfo: {
              handler: function (e) {
                var t = this;
                return (0, o.default)(
                  a.default.mark(function n() {
                    var r;
                    return a.default.wrap(function (n) {
                      for (;;)
                        switch ((n.prev = n.next)) {
                          case 0:
                            if (
                              !(
                                e &&
                                Object.keys(e).length > 0 &&
                                -1 !== e.vipLevel
                              )
                            ) {
                              n.next = 5;
                              break;
                            }
                            return (n.next = 3), (0, u.wallets)();
                          case 3:
                            (r = n.sent), (t.amount = r);
                          case 5:
                          case "end":
                            return n.stop();
                        }
                    }, n);
                  })
                )();
              },
            },
          },
          methods: {
            setchageVisble: function (e) {
              this.isRechage = e;
            },
            handleper: function (t) {
              var n = this;
              return (0, o.default)(
                a.default.mark(function r() {
                  var o;
                  return a.default.wrap(function (r) {
                    for (;;)
                      switch ((r.prev = r.next)) {
                        case 0:
                          if ((console.log(t), -1 !== n.userInfo.vipLevel)) {
                            r.next = 5;
                            break;
                          }
                          return (
                            e.showToast({
                              icon: "none",
                              title: "游客不能守护对方哦～",
                            }),
                            r.abrupt("return")
                          );
                        case 5:
                          if (!(n.amount.availableCoin < 10)) {
                            r.next = 8;
                            break;
                          }
                          return (n.isRechage = !0), r.abrupt("return");
                        case 8:
                          if (t.id != n.userInfo.id) {
                            r.next = 11;
                            break;
                          }
                          return (
                            e.showToast({
                              icon: "none",
                              title: "自己不能kiss自己哦～",
                            }),
                            r.abrupt("return")
                          );
                        case 11:
                          return (
                            (n.ishowKiss = !0),
                            setTimeout(function () {
                              n.ishowKiss = !1;
                            }, 2e3),
                            (r.next = 15),
                            (0, u.kissCreate)({ targetId: t.id })
                          );
                        case 15:
                          return r.sent, (r.next = 18), (0, u.wallets)();
                        case 18:
                          (o = r.sent), (n.amount = o);
                        case 20:
                        case "end":
                          return r.stop();
                      }
                  }, r);
                })
              )();
            },
          },
        };
        t.default = f;
      }).call(this, n("543d").default);
    },
    ebf4: function (e, t, n) {
      var r = n("8cfd");
      n.n(r).a;
    },
  },
]),
  (global.webpackJsonp = global.webpackJsonp || []).push([
    "pages/tabbar/home/components/User-create-component",
    {
      "pages/tabbar/home/components/User-create-component": function (e, t, n) {
        n("543d").createComponent(n("8036"));
      },
    },
    [["pages/tabbar/home/components/User-create-component"]],
  ]);
