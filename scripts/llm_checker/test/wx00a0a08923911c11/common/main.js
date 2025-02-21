(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
  ["common/main"],
  {
    "23be": function (e, o, t) {
      "use strict";
      t.r(o);
      var n = t("e4a4"),
        a = t.n(n);
      for (var r in n)
        ["default"].indexOf(r) < 0 &&
          (function (e) {
            t.d(o, e, function () {
              return n[e];
            });
          })(r);
      o["default"] = a.a;
    },
    "3dfd": function (e, o, t) {
      "use strict";
      t.r(o);
      var n = t("23be");
      for (var a in n)
        ["default"].indexOf(a) < 0 &&
          (function (e) {
            t.d(o, e, function () {
              return n[e];
            });
          })(a);
      t("5c0b");
      var r,
        c,
        l,
        s,
        u = t("f0c5"),
        i = Object(u["a"])(n["default"], r, c, !1, null, null, null, !1, l, s);
      o["default"] = i.exports;
    },
    "56d7": function (e, o, t) {
      "use strict";
      (function (e, o) {
        var n = t("4ea4"),
          a = n(t("9523"));
        t("6cdc");
        var r = n(t("66fd")),
          c = n(t("3dfd"));
        t("61a0");
        var l = t("b35e"),
          s = n(t("4ec3"));
        function u(e, o) {
          var t = Object.keys(e);
          if (Object.getOwnPropertySymbols) {
            var n = Object.getOwnPropertySymbols(e);
            o &&
              (n = n.filter(function (o) {
                return Object.getOwnPropertyDescriptor(e, o).enumerable;
              })),
              t.push.apply(t, n);
          }
          return t;
        }
        function i(e) {
          for (var o = 1; o < arguments.length; o++) {
            var t = null != arguments[o] ? arguments[o] : {};
            o % 2
              ? u(Object(t), !0).forEach(function (o) {
                  (0, a.default)(e, o, t[o]);
                })
              : Object.getOwnPropertyDescriptors
              ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t))
              : u(Object(t)).forEach(function (o) {
                  Object.defineProperty(
                    e,
                    o,
                    Object.getOwnPropertyDescriptor(t, o)
                  );
                });
          }
          return e;
        }
        (e.__webpack_require_UNI_MP_PLUGIN__ = t),
          (r.default.config.productionTip = !1),
          r.default.mixin(l.commonJS);
        var f = t("b775"),
          d = f.Get,
          p = f.http,
          g = f.Post;
        (r.default.prototype.$http = p),
          (r.default.prototype.$get = d),
          (r.default.prototype.$post = g);
        var b = function () {
          t.e("components/customImg/customImg")
            .then(
              function () {
                return resolve(t("980c"));
              }.bind(null, t)
            )
            .catch(t.oe);
        };
        r.default.component("customImg", b);
        var m = function () {
          Promise.all([
            t.e("common/vendor"),
            t.e("components/charge-dialog/charge-dialog"),
          ])
            .then(
              function () {
                return resolve(t("5964"));
              }.bind(null, t)
            )
            .catch(t.oe);
        };
        r.default.component("chargeDialog", m),
          (r.default.prototype.$api = s.default),
          (c.default.mpType = "app");
        var h = new r.default(i({}, c.default));
        o(h).$mount();
      }).call(this, t("bc2e")["default"], t("543d")["createApp"]);
    },
    "5c0b": function (e, o, t) {
      "use strict";
      var n = t("8f2b"),
        a = t.n(n);
      a.a;
    },
    "8f2b": function (e, o, t) {},
    e4a4: function (e, o, t) {
      "use strict";
      (function (e) {
        Object.defineProperty(o, "__esModule", { value: !0 }),
          (o.default = void 0);
        var n = t("5d2d"),
          a = requirePlugin("novel-plugin");
        o.default = {
          globalData: {
            userLogin: !1,
            userInfo: {},
            systemInfo: {},
            scene: "",
            appId: "",
          },
          onLaunch: function (o) {
            var t = this,
              r = "妞妞短篇",
              c = 293;
            e.getSystemInfoSync().uniPlatform;
            if (
              (e.setStorageSync(
                "appInfo",
                JSON.stringify({ appName: r, appNumber: c })
              ),
              (t.globalData.appId =
                o.referrerInfo && o.referrerInfo.appId
                  ? o.referrerInfo.appId
                  : ""),
              1069 != o.scene ||
                ("wx27a43222a6bf2931" != t.globalData.appId &&
                  "wx6d2ad6ce3e1cd86e" != t.globalData.appId &&
                  "wx289a8c58bca4c71e" != t.globalData.appId &&
                  "wx89e0af9d1faca777" != t.globalData.appId &&
                  "wx65cffe5f882034d1" != t.globalData.appId &&
                  "wx9a08a4f59ce91bf6" != t.globalData.appId) ||
                (t.globalData.scene = o.scene),
              t.getbookcommon(),
              a.onPageLoad(t.onNovelPluginLoad),
              (0, n.getToken)() && e.getStorageSync("userId"))
            )
              return !1;
            if (o.query) {
              "undefined" == o.query.customParams || o.query.customParams;
              var l = "undefined" == o.query.pid ? "" : o.query.pid;
              if (l) return !1;
            }
            e.login({
              force: !0,
              success: function (o) {
                (0, n.removeToken)(),
                  t.$post(t.$api.userauth, o).then(function (o) {
                    console.log(o),
                      o.success &&
                        ((t.globalData.userLogin = !0),
                        (t.globalData.userInfo = o.data),
                        e.setStorageSync("userId", o.data.id));
                  });
              },
              fail: function (e) {
                console.log(e);
              },
            });
          },
          onShow: function () {
            console.log("App Show");
          },
          methods: {
            onNovelPluginLoad: function (o) {
              var t = this;
              console.log("初始化");
              var r = a.getNovelManager(o.id);
              console.log(r);
              var c = r.getBookId(),
                l = r.customServerParams
                  ? JSON.parse(decodeURIComponent(r.customServerParams))
                  : {};
              function s() {
                t.$get(t.$api.wxgetshelf, { wxBookId: c }).then(function (e) {
                  console.log(e),
                    r.setBookshelfStatus({ bookshelfStatus: e.data ? 1 : 0 });
                });
              }
              function u() {
                t.$get(t.$api.wxbookcatalog + c, "").then(function (e) {
                  console.log(e), r.setContents({ contents: e.data });
                });
              }
              (0, n.getToken)()
                ? (l.pid && t.getBindUser(l), s(), u())
                : e.login({
                    force: !0,
                    success: function (o) {
                      console.log(o),
                        (0, n.removeToken)(),
                        t.$post(t.$api.userauth, o).then(function (o) {
                          console.log(o),
                            o.success &&
                              (e.setStorageSync("userId", o.data.id),
                              l.pid && t.getBindUser(l),
                              s(),
                              u());
                        });
                    },
                    fail: function (e) {
                      console.log(e);
                    },
                  }),
                console.log("id:", r.getId()),
                console.log("bookId:", r.getBookId()),
                r.onUserTriggerEvent(function (e) {
                  console.log("onUserTriggerEvent", e);
                }),
                r.setClosePluginInfo({
                  mode: "switchTab",
                  url: "/pages/shucheng/shucheng",
                }),
                console.log(r),
                r.onClickBookshelf(function (o) {
                  r.setBookshelfStatus({
                    bookshelfStatus: 0 === o.bookshelfStatus ? 1 : 0,
                  }),
                    t
                      .$post(t.$api.wxupdateshelf, {
                        wxBookId: c,
                        isAdd: 0 == o.bookshelfStatus,
                      })
                      .then(function (o) {
                        console.log(o), e.setStorageSync("isShelf", !0);
                      });
                });
            },
            getBindUser: function (e) {
              var o = this;
              o.$post(o.$api.bindUserPartner, e).then(function (e) {
                console.log(e);
              });
            },
            getbookcommon: function () {
              var e = this;
              console.log("调用了"),
                this.$get(this.$api.bookcommon, "").then(function (o) {
                  (e.globalData.systemInfo = o.data),
                    console.log(e.globalData.systemInfo);
                });
            },
          },
          onHide: function () {
            console.log("App Hide");
          },
        };
      }).call(this, t("543d")["default"]);
    },
  },
  [["56d7", "common/runtime", "common/vendor"]],
]);
