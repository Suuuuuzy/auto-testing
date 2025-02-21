(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
  ["pages/treasure"],
  {
    4154: function (t, e, r) {
      "use strict";
      (function (t, e) {
        var n = r("47a9");
        r("b45a");
        n(r("3240"));
        var a = n(r("9d40"));
        (t.__webpack_require_UNI_MP_PLUGIN__ = r), e(a.default);
      }).call(this, r("3223")["default"], r("df3c")["createPage"]);
    },
    "54af": function (t, e, r) {},
    "671f": function (t, e, r) {
      "use strict";
      r.d(e, "b", function () {
        return n;
      }),
        r.d(e, "c", function () {
          return a;
        }),
        r.d(e, "a", function () {});
      var n = function () {
          var t = this,
            e = t.$createElement;
          t._self._c;
          t._isMounted ||
            ((t.e0 = function (e) {
              t.showMore = !t.showMore;
            }),
            (t.e1 = function (e, r) {
              var n = arguments[arguments.length - 1].currentTarget.dataset,
                a = n.eventParams || n["event-params"];
              r = a.itemInner;
              return t.$router.push("watch?ref=" + r.articleRef);
            }),
            (t.e2 = function (e, r) {
              var n = arguments[arguments.length - 1].currentTarget.dataset,
                a = n.eventParams || n["event-params"];
              r = a.itemInner;
              return t.$router.push("watch?ref=" + r.articleRef);
            }));
        },
        a = [];
    },
    8431: function (t, e, r) {
      "use strict";
      var n = r("54af"),
        a = r.n(n);
      a.a;
    },
    "9d40": function (t, e, r) {
      "use strict";
      r.r(e);
      var n = r("671f"),
        a = r("a3b8");
      for (var i in a)
        ["default"].indexOf(i) < 0 &&
          (function (t) {
            r.d(e, t, function () {
              return a[t];
            });
          })(i);
      r("8431");
      var u = r("828b"),
        o = Object(u["a"])(
          a["default"],
          n["b"],
          n["c"],
          !1,
          null,
          "26bef452",
          null,
          !1,
          n["a"],
          void 0
        );
      e["default"] = o.exports;
    },
    a3b8: function (t, e, r) {
      "use strict";
      r.r(e);
      var n = r("ad5f"),
        a = r.n(n);
      for (var i in n)
        ["default"].indexOf(i) < 0 &&
          (function (t) {
            r.d(e, t, function () {
              return n[t];
            });
          })(i);
      e["default"] = a.a;
    },
    ad5f: function (t, e, r) {
      "use strict";
      var n = r("47a9");
      Object.defineProperty(e, "__esModule", { value: !0 }),
        (e.default = void 0);
      var a = n(r("7ca3")),
        i = r("8f59");
      function u(t, e) {
        var r = Object.keys(t);
        if (Object.getOwnPropertySymbols) {
          var n = Object.getOwnPropertySymbols(t);
          e &&
            (n = n.filter(function (e) {
              return Object.getOwnPropertyDescriptor(t, e).enumerable;
            })),
            r.push.apply(r, n);
        }
        return r;
      }
      var o = {
        config: {
          navigationStyle: "custom",
          disableScroll: !0,
          navigationBarTextStyle: "white",
        },
        components: {
          ppNav: function () {
            r.e("components/pp/Nav")
              .then(
                function () {
                  return resolve(r("ac66"));
                }.bind(null, r)
              )
              .catch(r.oe);
          },
        },
        computed: (function (t) {
          for (var e = 1; e < arguments.length; e++) {
            var r = null != arguments[e] ? arguments[e] : {};
            e % 2
              ? u(Object(r), !0).forEach(function (e) {
                  (0, a.default)(t, e, r[e]);
                })
              : Object.getOwnPropertyDescriptors
              ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(r))
              : u(Object(r)).forEach(function (e) {
                  Object.defineProperty(
                    t,
                    e,
                    Object.getOwnPropertyDescriptor(r, e)
                  );
                });
          }
          return t;
        })(
          {},
          (0, i.mapState)({
            navigationBarHeight: function (t) {
              return t.navigationBarHeight;
            },
            navigationBarHeightPlaceholder: function (t) {
              return t.navigationBarHeightPlaceholder;
            },
            treasureWatch: function (t) {
              return t.treasureWatch;
            },
          })
        ),
        data: function () {
          return {
            showMore: !1,
            dataList: null,
            dataListH: null,
            dataListZ: null,
          };
        },
        methods: {},
        mounted: function () {
          var t = [],
            e = [],
            r = [],
            n = 0,
            a = 0,
            i = 0,
            u = 0,
            o = 0,
            c = 0;
          if (this.treasureWatch)
            for (var s = 0; s < this.treasureWatch.length; s++) {
              var f = this.treasureWatch[s];
              f.productDescriptionTitle[0].indexOf("怀表") >= 0
                ? (a % 2 === 0 ? e.push([f]) : (e[o].push(f), o++), a++)
                : f.productDescriptionTitle[0].indexOf("座钟") >= 0
                ? (i % 2 === 0 ? r.push([f]) : (r[c].push(f), c++), i++)
                : (n % 2 === 0 ? t.push([f]) : (t[u].push(f), u++), n++);
            }
          (this.dataList = t), (this.dataListH = e), (this.dataListZ = r);
        },
      };
      e.default = o;
    },
  },
  [["4154", "common/runtime", "common/vendor"]],
]);
