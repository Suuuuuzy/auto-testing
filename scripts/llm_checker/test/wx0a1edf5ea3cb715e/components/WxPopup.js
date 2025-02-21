require("../@babel/runtime/helpers/Arrayincludes"),
  (global.webpackJsonp = global.webpackJsonp || []).push([
    ["components/WxPopup"],
    {
      "06d7": function (e, t, n) {},
      "0f4a": function (e, t, n) {
        var o = n("06d7");
        n.n(o).a;
      },
      "5fce": function (e, t, n) {
        n.r(t);
        var o = n("e004"),
          r = n.n(o);
        for (var u in o)
          ["default"].indexOf(u) < 0 &&
            (function (e) {
              n.d(t, e, function () {
                return o[e];
              });
            })(u);
        t.default = r.a;
      },
      e004: function (e, t, n) {
        (function (e) {
          var o = n("4ea4");
          Object.defineProperty(t, "__esModule", { value: !0 }),
            (t.default = void 0);
          var r = o(n("2eee")),
            u = o(n("c973")),
            a = o(n("9523")),
            c = n("26cb"),
            i = n("426c"),
            s = n("c9b4");
          function f(e, t) {
            var n = Object.keys(e);
            if (Object.getOwnPropertySymbols) {
              var o = Object.getOwnPropertySymbols(e);
              t &&
                (o = o.filter(function (t) {
                  return Object.getOwnPropertyDescriptor(e, t).enumerable;
                })),
                n.push.apply(n, o);
            }
            return n;
          }
          var l = {
            props: {
              isShow: { default: !1, type: Boolean },
              userDetail: { default: function () {}, type: Object },
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
              (0, c.mapState)({
                userInfo: function (e) {
                  return e.user.userInfo;
                },
              })
            ),
            data: function () {
              return { amount: { availableCoin: 0 }, promiseWx: null };
            },
            mounted: function () {
              this.fecthStatus();
            },
            filters: {
              fomatWx: function (e) {
                return (0, s.desensitizedCommon)(e, 1);
              },
            },
            methods: {
              toVip: function () {
                this.handleNavigater("/pages/user/memberCenter/index"),
                  this.$emit("setVisble", !1);
              },
              fecthStatus: function () {
                var e = this;
                return (0, u.default)(
                  r.default.mark(function t() {
                    var n, o;
                    return r.default.wrap(function (t) {
                      for (;;)
                        switch ((t.prev = t.next)) {
                          case 0:
                            return (t.next = 2), (0, i.wallets)();
                          case 2:
                            return (
                              (n = t.sent),
                              (e.amount = n),
                              (t.next = 6),
                              (0, i.getWechatPromiseAndCoin)({
                                targetId: e.userDetail.id,
                                targetWechatId: e.userDetail.wechat,
                              })
                            );
                          case 6:
                            (o = t.sent), (e.promiseWx = o);
                          case 8:
                          case "end":
                            return t.stop();
                        }
                    }, t);
                  })
                )();
              },
              handleCopy: function () {
                e.setClipboardData({
                  data: this.userDetail.wechat,
                  success: function (t) {
                    e.showToast({ icon: "none", title: "复制成功" });
                  },
                });
              },
              closed: function () {
                this.$emit("setVisble", !1);
              },
              handleClick: function () {
                var t = this;
                return (0, u.default)(
                  r.default.mark(function n() {
                    return r.default.wrap(function (n) {
                      for (;;)
                        switch ((n.prev = n.next)) {
                          case 0:
                            return (
                              (n.next = 2),
                              (0, i.wechatAccountPay)({
                                targetId: t.userDetail.id,
                                coin: t.promiseWx.payCoin,
                              })
                            );
                          case 2:
                            e.showToast({ icon: "none", title: "解锁成功" }),
                              t.fecthStatus();
                          case 4:
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
      e122: function (e, t, n) {
        n.d(t, "b", function () {
          return r;
        }),
          n.d(t, "c", function () {
            return u;
          }),
          n.d(t, "a", function () {
            return o;
          });
        var o = {
            uPopup: function () {
              return n
                .e("node-modules/uview-ui/components/u-popup/u-popup")
                .then(n.bind(null, "c33e"));
            },
            uLoading: function () {
              return n
                .e("node-modules/uview-ui/components/u-loading/u-loading")
                .then(n.bind(null, "324c"));
            },
          },
          r = function () {
            var e = this,
              t =
                (e.$createElement,
                e._self._c,
                e.promiseWx && !e.promiseWx.isBought
                  ? e._f("fomatWx")(e.userDetail.wechat)
                  : null),
              n =
                e.promiseWx && 2 !== e.userInfo.sex
                  ? !e.promiseWx.isBought &&
                    (e.userInfo.vipLevel < 4 ||
                      (0 === e.promiseWx.surplusNumber &&
                        [4, 5].includes(e.userInfo.vipLevel)))
                  : null;
            e.$mp.data = Object.assign({}, { $root: { f0: t, g0: n } });
          },
          u = [];
      },
      f5a5: function (e, t, n) {
        n.r(t);
        var o = n("e122"),
          r = n("5fce");
        for (var u in r)
          ["default"].indexOf(u) < 0 &&
            (function (e) {
              n.d(t, e, function () {
                return r[e];
              });
            })(u);
        n("0f4a");
        var a = n("f0c5"),
          c = Object(a.a)(
            r.default,
            o.b,
            o.c,
            !1,
            null,
            "7b98aad8",
            null,
            !1,
            o.a,
            void 0
          );
        t.default = c.exports;
      },
    },
  ]),
  (global.webpackJsonp = global.webpackJsonp || []).push([
    "components/WxPopup-create-component",
    {
      "components/WxPopup-create-component": function (e, t, n) {
        n("543d").createComponent(n("f5a5"));
      },
    },
    [["components/WxPopup-create-component"]],
  ]);
