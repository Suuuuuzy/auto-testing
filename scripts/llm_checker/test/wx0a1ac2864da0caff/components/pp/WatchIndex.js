(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
  ["components/pp/WatchIndex"],
  {
    "1ba1": function (e, t, n) {},
    "400d": function (e, t, n) {
      "use strict";
      n.d(t, "b", function () {
        return r;
      }),
        n.d(t, "c", function () {
          return c;
        }),
        n.d(t, "a", function () {});
      var r = function () {
          var e = this,
            t = e.$createElement,
            n =
              (e._self._c,
              e.placeholder >= 0 && e.newWatch ? e.newWatch.length : null),
            r = e.placeholder >= 0 && e.jewelsList ? e.jewelsList.length : null,
            c = e.placeholder >= 0 && e.calibers ? e.calibers.length : null;
          e.$mp.data = Object.assign({}, { $root: { g0: n, g1: r, g2: c } });
        },
        c = [];
    },
    6150: function (e, t, n) {
      "use strict";
      n.r(t);
      var r = n("6f92"),
        c = n.n(r);
      for (var o in r)
        ["default"].indexOf(o) < 0 &&
          (function (e) {
            n.d(t, e, function () {
              return r[e];
            });
          })(o);
      t["default"] = c.a;
    },
    "6d58": function (e, t, n) {
      "use strict";
      var r = n("1ba1"),
        c = n.n(r);
      c.a;
    },
    "6f92": function (e, t, n) {
      "use strict";
      var r = n("47a9");
      Object.defineProperty(t, "__esModule", { value: !0 }),
        (t.default = void 0);
      var c = r(n("7ca3")),
        o = n("8f59");
      function a(e, t) {
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
      var i = {
        props: { value: Boolean, placeholder: Number, barHeight: Number },
        components: {
          ppNav: function () {
            n.e("components/pp/Nav")
              .then(
                function () {
                  return resolve(n("ac66"));
                }.bind(null, n)
              )
              .catch(n.oe);
          },
        },
        computed: (function (e) {
          for (var t = 1; t < arguments.length; t++) {
            var n = null != arguments[t] ? arguments[t] : {};
            t % 2
              ? a(Object(n), !0).forEach(function (t) {
                  (0, c.default)(e, t, n[t]);
                })
              : Object.getOwnPropertyDescriptors
              ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
              : a(Object(n)).forEach(function (t) {
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
          (0, o.mapState)({
            watchTypeCount: function (e) {
              return e.watchTypeCount;
            },
            newWatch: function (e) {
              return e.newWatch;
            },
            treasureWatch: function (e) {
              return e.treasureWatch;
            },
            jewelsList: function (e) {
              return e.jewelsList;
            },
            calibers: function (e) {
              return e.calibers;
            },
          })
        ),
        data: function () {
          return { nowBannerWatch: 0 };
        },
        methods: {
          changeSwiperWatch: function (e) {
            var t = e.mp.detail.current;
            this.nowBannerWatch = t;
          },
          toCollectionAll: function () {
            this.$tracking("common_event_click", {
              event_name: "TAB2时计系列页面",
              event_category: "时计系列",
              event_value: "时计系列. 所有表款",
            }),
              this.$router.push("watchList");
          },
          toCollection: function (e) {
            this.$tracking("common_event_click", {
              event_name: "TAB2时计系列页面",
              event_category: "时计系列",
              event_value: "时计系列. " + e,
            }),
              this.$router.push(
                "watchList?collection=" + encodeURIComponent(e)
              );
          },
          toInner: function () {
            this.$tracking("common_event_click", {
              event_name: "TAB2时计系列页面",
              event_category: "分类banner",
              event_value: "分类banner4. 机芯",
            }),
              this.$router.push("inner");
          },
          toJewelry: function () {
            this.$tracking("common_event_click", {
              event_name: "TAB2时计系列页面",
              event_category: "分类banner",
              event_value: "分类banner3. 珠宝/配饰",
            }),
              this.$router.push("jewelry");
          },
          toTreasure: function () {
            this.$tracking("common_event_click", {
              event_name: "TAB2时计系列页面",
              event_category: "分类banner",
              event_value: "分类banner2. 珍稀工艺系列",
            }),
              this.$router.push("treasure");
          },
          toTopic: function () {
            this.$tracking("common_event_click", {
              event_name: "TAB2时计系列页面",
              event_category: "分类banner",
              event_value: "分类banner1. 2022新款",
            }),
              this.$router.push("topic");
          },
          toFilter: function () {
            this.$tracking("common_event_click", {
              event_name: "TAB2时计系列页面",
              event_category: "分类筛选",
              event_value: "分类筛选",
            }),
              this.$router.push("filterList");
          },
        },
      };
      t.default = i;
    },
    fc1b: function (e, t, n) {
      "use strict";
      n.r(t);
      var r = n("400d"),
        c = n("6150");
      for (var o in c)
        ["default"].indexOf(o) < 0 &&
          (function (e) {
            n.d(t, e, function () {
              return c[e];
            });
          })(o);
      n("6d58");
      var a = n("828b"),
        i = Object(a["a"])(
          c["default"],
          r["b"],
          r["c"],
          !1,
          null,
          "33c64714",
          null,
          !1,
          r["a"],
          void 0
        );
      t["default"] = i.exports;
    },
  },
]);
(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
  "components/pp/WatchIndex-create-component",
  {
    "components/pp/WatchIndex-create-component": function (
      module,
      exports,
      __webpack_require__
    ) {
      __webpack_require__("df3c")["createComponent"](
        __webpack_require__("fc1b")
      );
    },
  },
  [["components/pp/WatchIndex-create-component"]],
]);
