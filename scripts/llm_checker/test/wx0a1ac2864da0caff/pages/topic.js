(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
  ["pages/topic"],
  {
    4698: function (t, e, n) {
      "use strict";
      var r = n("c330"),
        a = n.n(r);
      a.a;
    },
    "6d76": function (t, e, n) {
      "use strict";
      (function (t, e) {
        var r = n("47a9");
        n("b45a");
        r(n("3240"));
        var a = r(n("823e"));
        (t.__webpack_require_UNI_MP_PLUGIN__ = n), e(a.default);
      }).call(this, n("3223")["default"], n("df3c")["createPage"]);
    },
    7572: function (t, e, n) {
      "use strict";
      var r = n("47a9");
      Object.defineProperty(e, "__esModule", { value: !0 }),
        (e.default = void 0);
      var a = r(n("7ca3")),
        c = n("8f59");
      function o(t, e) {
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
      var i = {
        config: {
          navigationStyle: "custom",
          disableScroll: !0,
          navigationBarTextStyle: "white",
        },
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
        computed: (function (t) {
          for (var e = 1; e < arguments.length; e++) {
            var n = null != arguments[e] ? arguments[e] : {};
            e % 2
              ? o(Object(n), !0).forEach(function (e) {
                  (0, a.default)(t, e, n[e]);
                })
              : Object.getOwnPropertyDescriptors
              ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(n))
              : o(Object(n)).forEach(function (e) {
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
            navigationBarHeight: function (t) {
              return t.navigationBarHeight;
            },
            navigationBarHeightPlaceholder: function (t) {
              return t.navigationBarHeightPlaceholder;
            },
            newWatch: function (t) {
              return t.newWatch;
            },
          })
        ),
        data: function () {
          return { showMore: !1, dataList: [] };
        },
        methods: {},
        mounted: function () {
          var t = [],
            e = 0;
          if (this.newWatch)
            for (var n = 0; n < this.newWatch.length; n++) {
              var r = this.newWatch[n];
              n % 2 === 0 ? t.push([r]) : (t[e].push(r), e++);
            }
          this.dataList = t;
        },
      };
      e.default = i;
    },
    "823e": function (t, e, n) {
      "use strict";
      n.r(e);
      var r = n("8e0a"),
        a = n("9bad");
      for (var c in a)
        ["default"].indexOf(c) < 0 &&
          (function (t) {
            n.d(e, t, function () {
              return a[t];
            });
          })(c);
      n("4698");
      var o = n("828b"),
        i = Object(o["a"])(
          a["default"],
          r["b"],
          r["c"],
          !1,
          null,
          "fd6d4946",
          null,
          !1,
          r["a"],
          void 0
        );
      e["default"] = i.exports;
    },
    "8e0a": function (t, e, n) {
      "use strict";
      n.d(e, "b", function () {
        return r;
      }),
        n.d(e, "c", function () {
          return a;
        }),
        n.d(e, "a", function () {});
      var r = function () {
          var t = this,
            e = t.$createElement;
          t._self._c;
          t._isMounted ||
            (t.e0 = function (e, n) {
              var r = arguments[arguments.length - 1].currentTarget.dataset,
                a = r.eventParams || r["event-params"];
              n = a.itemInner;
              return t.$router.push("watch?ref=" + n.articleRef);
            });
        },
        a = [];
    },
    "9bad": function (t, e, n) {
      "use strict";
      n.r(e);
      var r = n("7572"),
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
    c330: function (t, e, n) {},
  },
  [["6d76", "common/runtime", "common/vendor"]],
]);
