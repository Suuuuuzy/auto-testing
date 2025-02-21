(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
  ["pages/index"],
  {
    "2bef": function (e, t, n) {
      "use strict";
      n.r(t);
      var o = n("d174"),
        r = n.n(o);
      for (var a in o)
        ["default"].indexOf(a) < 0 &&
          (function (e) {
            n.d(t, e, function () {
              return o[e];
            });
          })(a);
      t["default"] = r.a;
    },
    "6d3a": function (e, t, n) {
      "use strict";
      (function (e, t) {
        var o = n("47a9");
        n("b45a");
        o(n("3240"));
        var r = o(n("b8a4"));
        (e.__webpack_require_UNI_MP_PLUGIN__ = n), t(r.default);
      }).call(this, n("3223")["default"], n("df3c")["createPage"]);
    },
    "8c16": function (e, t, n) {
      "use strict";
      var o = n("f1ba"),
        r = n.n(o);
      r.a;
    },
    "9e52": function (e, t, n) {
      "use strict";
      n.d(t, "b", function () {
        return o;
      }),
        n.d(t, "c", function () {
          return r;
        }),
        n.d(t, "a", function () {});
      var o = function () {
          var e = this.$createElement;
          this._self._c;
        },
        r = [];
    },
    b8a4: function (e, t, n) {
      "use strict";
      n.r(t);
      var o = n("9e52"),
        r = n("2bef");
      for (var a in r)
        ["default"].indexOf(a) < 0 &&
          (function (e) {
            n.d(t, e, function () {
              return r[e];
            });
          })(a);
      n("8c16");
      var i = n("828b"),
        c = Object(i["a"])(
          r["default"],
          o["b"],
          o["c"],
          !1,
          null,
          "6fdf6aab",
          null,
          !1,
          o["a"],
          void 0
        );
      t["default"] = c.exports;
    },
    d174: function (e, t, n) {
      "use strict";
      (function (e) {
        var o = n("47a9");
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.default = void 0);
        var r = o(n("7ca3")),
          a = n("8f59"),
          i = n("8714"),
          c = n("9f04"),
          f = n("fe17");
        function u(e, t) {
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
        var s = {
          config: { navigationStyle: "custom", disableScroll: !0 },
          components: {
            ppIndex: function () {
              n.e("components/pp/Index")
                .then(
                  function () {
                    return resolve(n("25e2"));
                  }.bind(null, n)
                )
                .catch(n.oe);
            },
            ppWatchIndex: function () {
              n.e("components/pp/WatchIndex")
                .then(
                  function () {
                    return resolve(n("fc1b"));
                  }.bind(null, n)
                )
                .catch(n.oe);
            },
            ppBoutique: function () {
              Promise.all([n.e("common/vendor"), n.e("pages/indexInner")])
                .then(
                  function () {
                    return resolve(n("07f4"));
                  }.bind(null, n)
                )
                .catch(n.oe);
            },
            ppNav: function () {
              n.e("components/pp/Nav")
                .then(
                  function () {
                    return resolve(n("ac66"));
                  }.bind(null, n)
                )
                .catch(n.oe);
            },
            ppMe: function () {
              Promise.all([n.e("common/vendor"), n.e("components/pp/Me")])
                .then(
                  function () {
                    return resolve(n("478c"));
                  }.bind(null, n)
                )
                .catch(n.oe);
            },
          },
          computed: (function (e) {
            for (var t = 1; t < arguments.length; t++) {
              var n = null != arguments[t] ? arguments[t] : {};
              t % 2
                ? u(Object(n), !0).forEach(function (t) {
                    (0, r.default)(e, t, n[t]);
                  })
                : Object.getOwnPropertyDescriptors
                ? Object.defineProperties(
                    e,
                    Object.getOwnPropertyDescriptors(n)
                  )
                : u(Object(n)).forEach(function (t) {
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
            (0, a.mapState)({
              navigationBarHeight: function (e) {
                return e.navigationBarHeight;
              },
              navigationBarHeightPlaceholder: function (e) {
                return e.navigationBarHeightPlaceholder;
              },
              newWatch: function (e) {
                return e.newWatch;
              },
            })
          ),
          data: function () {
            return { hasQuery: !0, tab: 1, showNav: !1, nowBanner: 0 };
          },
          methods: {
            chooseTab: function (t) {
              this.$tracking("common_event_click", {
                event_name: "底部TAB点击",
                event_category: "底部TAB点击",
                event_value: ["首页", "时计系列", "我的"][t - 1],
              }),
                3 === t
                  ? (this.$refs.me.initWish(),
                    e.setNavigationBarColor({
                      frontColor: "#ffffff",
                      backgroundColor: "#ffffff",
                    }))
                  : 1 === t && this.showNav
                  ? e.setNavigationBarColor({
                      frontColor: "#ffffff",
                      backgroundColor: "#ffffff",
                    })
                  : e.setNavigationBarColor({
                      frontColor: "#000000",
                      backgroundColor: "#ffffff",
                    }),
                (this.tab = t);
            },
            changeIndexTop: function (e) {
              this.showNav = e;
            },
          },
          onShareAppMessage: function (e) {
            if ((console.log(e), "button" === e.from)) {
              var t = e.target.dataset.index,
                n = this.newWatch[t],
                o = n.reference + " - " + n.collection,
                r = "/pages/watch?ref=".concat(
                  encodeURIComponent(n.articleRef),
                  "&share=2"
                ),
                a = n.articleImages;
              return { title: o, path: r, imageUrl: a };
            }
            return {
              title: "百达翡丽时计查询",
              path: "/pages/index",
              imageUrl: void 0,
            };
          },
          onShow: function () {
            var e = this.$mp.query;
            (e && (e.tab || e.path)) || (this.hasQuery = !1),
              3 === this.tab && this.$refs.me.initWish();
          },
          mounted: function () {
            var t = this,
              n = this.$mp.query;
            n && (n.tab || n.path)
              ? ((this.hasQuery = !0), e.showLoading({ title: "加载中" }))
              : (this.hasQuery = !1);
            var o = Date.parse(new Date());
            e.request({
              url: "https://patek.resource.impdigital.cn/product2.json?v=" + o,
              dataType: "json",
              success: function (o) {
                var r = o.data,
                  a = r.watches,
                  u = r.calibers,
                  s = r.jewels;
                if (
                  ((0, i.setProduct)(a),
                  (0, f.setCalibers)(u),
                  (0, c.setJewels)(s),
                  t.hasQuery && e.hideLoading(),
                  n.tab)
                ) {
                  var l = parseInt(n.tab);
                  (t.hasQuery = !1),
                    3 === l
                      ? setTimeout(function () {
                          t.chooseTab(l);
                        }, 100)
                      : t.chooseTab(l);
                } else n.path && t.$router.push(decodeURIComponent(n.path));
                t.$mp.query = {};
              },
            });
          },
        };
        t.default = s;
      }).call(this, n("3223")["default"]);
    },
    f1ba: function (e, t, n) {},
  },
  [["6d3a", "common/runtime", "common/vendor"]],
]);
