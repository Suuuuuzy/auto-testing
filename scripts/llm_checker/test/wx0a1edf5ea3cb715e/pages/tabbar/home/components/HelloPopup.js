(global.webpackJsonp = global.webpackJsonp || []).push([
  ["pages/tabbar/home/components/HelloPopup"],
  {
    "2c5f": function (e, t, n) {
      n.r(t);
      var r = n("5e6a"),
        o = n("e876");
      for (var u in o)
        ["default"].indexOf(u) < 0 &&
          (function (e) {
            n.d(t, e, function () {
              return o[e];
            });
          })(u);
      n("6de4");
      var a = n("f0c5"),
        c = Object(a.a)(
          o.default,
          r.b,
          r.c,
          !1,
          null,
          "0db393bc",
          null,
          !1,
          r.a,
          void 0
        );
      t.default = c.exports;
    },
    "540f": function (e, t, n) {
      (function (e) {
        var r = n("4ea4");
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.default = void 0);
        var o = r(n("2eee")),
          u = r(n("c973")),
          a = r(n("9523")),
          c = n("df69"),
          i = n("26cb"),
          s = n("c9b4");
        function f(e, t) {
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
        var l = {
          props: { isShow: { default: !1, type: Boolean } },
          data: function () {
            return { sex: 1, list: [] };
          },
          computed: (function (e) {
            for (var t = 1; t < arguments.length; t++) {
              var n = null != arguments[t] ? arguments[t] : {};
              t % 2
                ? f(Object(n), !0).forEach(function (t) {
                    (0, a.default)(e, t, n[t]);
                  })
                : Object.getOwnPropertyDescriptors
                ? Object.defineProperties(
                    e,
                    Object.getOwnPropertyDescriptors(n)
                  )
                : f(Object(n)).forEach(function (t) {
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
            (0, i.mapState)({
              userInfo: function (e) {
                return e.user.userInfo;
              },
            })
          ),
          mounted: function () {
            var e = this.userInfo.sex;
            (this.sex = e), this.fetchList();
          },
          methods: {
            gSrc: function (e) {
              return (0, s.filterUrl)(e, 100, 100);
            },
            closed: function () {
              this.$emit("setVisble", !1), e.setStorageSync("sayHello", !0);
            },
            fetchList: function () {
              var e = this;
              return (0, u.default)(
                o.default.mark(function t() {
                  var n, r, u, a, i;
                  return o.default.wrap(function (t) {
                    for (;;)
                      switch ((t.prev = t.next)) {
                        case 0:
                          return (
                            (n = e.userInfo),
                            (r = n.id),
                            (u = n.sex),
                            (a = {
                              userId: r,
                              sex: 2 === u ? 1 : 2,
                              page: 1,
                              size: 12,
                            }),
                            (t.next = 4),
                            (0, c.home_recommend)(a)
                          );
                        case 4:
                          (i = t.sent), (e.list = i);
                        case 6:
                        case "end":
                          return t.stop();
                      }
                  }, t);
                })
              )();
            },
            handleClick: function () {
              var t = this;
              return (0, u.default)(
                o.default.mark(function n() {
                  var r, u;
                  return o.default.wrap(function (n) {
                    for (;;)
                      switch ((n.prev = n.next)) {
                        case 0:
                          return (
                            (r = t.userInfo.id),
                            (u = {
                              userId: r,
                              userIds: t.list.map(function (e) {
                                return e.id;
                              }),
                            }),
                            (n.next = 4),
                            (0, c.batchGreet)(u)
                          );
                        case 4:
                          n.sent,
                            t.$emit("setVisble", !1),
                            e.setStorageSync("sayHello", !0);
                        case 7:
                        case "end":
                          return n.stop();
                      }
                  }, n);
                })
              )();
            },
          },
        };
        t.default = l;
      }).call(this, n("543d").default);
    },
    "5e6a": function (e, t, n) {
      n.d(t, "b", function () {
        return o;
      }),
        n.d(t, "c", function () {
          return u;
        }),
        n.d(t, "a", function () {
          return r;
        });
      var r = {
          uPopup: function () {
            return n
              .e("node-modules/uview-ui/components/u-popup/u-popup")
              .then(n.bind(null, "c33e"));
          },
          uImage: function () {
            return n
              .e("node-modules/uview-ui/components/u-image/u-image")
              .then(n.bind(null, "7dc8"));
          },
        },
        o = function () {
          var e = this,
            t =
              (e.$createElement,
              e._self._c,
              1 === e.sex
                ? e.__map(e.list, function (t, n) {
                    return { $orig: e.__get_orig(t), m0: e.gSrc(t.avatar) };
                  })
                : null),
            n =
              1 !== e.sex
                ? e.__map(e.list, function (t, n) {
                    return { $orig: e.__get_orig(t), m1: e.gSrc(t.avatar) };
                  })
                : null;
          e.$mp.data = Object.assign({}, { $root: { l0: t, l1: n } });
        },
        u = [];
    },
    "6de4": function (e, t, n) {
      var r = n("da3f");
      n.n(r).a;
    },
    da3f: function (e, t, n) {},
    e876: function (e, t, n) {
      n.r(t);
      var r = n("540f"),
        o = n.n(r);
      for (var u in r)
        ["default"].indexOf(u) < 0 &&
          (function (e) {
            n.d(t, e, function () {
              return r[e];
            });
          })(u);
      t.default = o.a;
    },
  },
]),
  (global.webpackJsonp = global.webpackJsonp || []).push([
    "pages/tabbar/home/components/HelloPopup-create-component",
    {
      "pages/tabbar/home/components/HelloPopup-create-component": function (
        e,
        t,
        n
      ) {
        n("543d").createComponent(n("2c5f"));
      },
    },
    [["pages/tabbar/home/components/HelloPopup-create-component"]],
  ]);
