(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
  ["pages/boutiqueScan"],
  {
    "270c": function (t, e, n) {
      "use strict";
      var r = n("47a9");
      Object.defineProperty(e, "__esModule", { value: !0 }),
        (e.default = void 0);
      var a = r(n("7ca3")),
        c = n("8f59");
      function i(t, e) {
        var n = Object.keys(t);
        if (Object.getOwnPropertySymbols) {
          var r = Object.getOwnPropertySymbols(t);
          e &&
            (r = r.filter(function (e) {
              return Object.getOwnPropertyDescriptor(t, e).enumerable;
            })),
            n.push.apply(n, r);
        }
        return n;
      }
      var o = {
        computed: (function (t) {
          for (var e = 1; e < arguments.length; e++) {
            var n = null != arguments[e] ? arguments[e] : {};
            e % 2
              ? i(Object(n), !0).forEach(function (e) {
                  (0, a.default)(t, e, n[e]);
                })
              : Object.getOwnPropertyDescriptors
              ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(n))
              : i(Object(n)).forEach(function (e) {
                  Object.defineProperty(
                    t,
                    e,
                    Object.getOwnPropertyDescriptor(n, e)
                  );
                });
          }
          return t;
        })(
          {},
          (0, c.mapState)({
            user: function (t) {
              return t.user;
            },
            code: function (t) {
              return t.code;
            },
            navigationBarHeight: function (t) {
              return t.navigationBarHeight;
            },
            navigationBarHeightPlaceholder: function (t) {
              return t.navigationBarHeightPlaceholder;
            },
            bookCache: function (t) {
              return t.bookCache;
            },
          })
        ),
        data: function () {
          return { landingPic: "" };
        },
        methods: {},
        mounted: function () {
          var t = this,
            e = this.$mp.query;
          e && e.id
            ? this.$http.checkNow({ boutique_code: e.id }, function (e) {
                var n = e.city,
                  r = e.status;
                t.landingPic =
                  "http://cdn.impdigital.cn/patek/landing-" +
                  n +
                  "-" +
                  r +
                  ".png";
              })
            : this.$alert("获取参数错误，请返回后重试");
        },
      };
      e.default = o;
    },
    6141: function (t, e, n) {
      "use strict";
      n.d(e, "b", function () {
        return r;
      }),
        n.d(e, "c", function () {
          return a;
        }),
        n.d(e, "a", function () {});
      var r = function () {
          var t = this.$createElement;
          this._self._c;
        },
        a = [];
    },
    a842: function (t, e, n) {
      "use strict";
      (function (t, e) {
        var r = n("47a9");
        n("b45a");
        r(n("3240"));
        var a = r(n("fb3b"));
        (t.__webpack_require_UNI_MP_PLUGIN__ = n), e(a.default);
      }).call(this, n("3223")["default"], n("df3c")["createPage"]);
    },
    fa54: function (t, e, n) {
      "use strict";
      n.r(e);
      var r = n("270c"),
        a = n.n(r);
      for (var c in r)
        ["default"].indexOf(c) < 0 &&
          (function (t) {
            n.d(e, t, function () {
              return r[t];
            });
          })(c);
      e["default"] = a.a;
    },
    fb3b: function (t, e, n) {
      "use strict";
      n.r(e);
      var r = n("6141"),
        a = n("fa54");
      for (var c in a)
        ["default"].indexOf(c) < 0 &&
          (function (t) {
            n.d(e, t, function () {
              return a[t];
            });
          })(c);
      var i = n("828b"),
        o = Object(i["a"])(
          a["default"],
          r["b"],
          r["c"],
          !1,
          null,
          "77744ba6",
          null,
          !1,
          r["a"],
          void 0
        );
      e["default"] = o.exports;
    },
  },
  [["a842", "common/runtime", "common/vendor"]],
]);
