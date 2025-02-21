(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
  ["pages/wishList"],
  {
    "44b3": function (e, t, r) {},
    5617: function (e, t, r) {
      "use strict";
      (function (e, t) {
        var a = r("47a9");
        r("b45a");
        a(r("3240"));
        var n = a(r("6829"));
        (e.__webpack_require_UNI_MP_PLUGIN__ = r), t(n.default);
      }).call(this, r("3223")["default"], r("df3c")["createPage"]);
    },
    "5fcb": function (e, t, r) {
      "use strict";
      r.d(t, "b", function () {
        return a;
      }),
        r.d(t, "c", function () {
          return n;
        }),
        r.d(t, "a", function () {});
      var a = function () {
          var e = this,
            t = e.$createElement;
          e._self._c;
          e._isMounted ||
            (e.e0 = function (t, r) {
              var a = arguments[arguments.length - 1].currentTarget.dataset,
                n = a.eventParams || a["event-params"];
              r = n.itemInner;
              return e.$router.push("watch?ref=" + r.articleRef);
            });
        },
        n = [];
    },
    6829: function (e, t, r) {
      "use strict";
      r.r(t);
      var a = r("5fcb"),
        n = r("bfba");
      for (var i in n)
        ["default"].indexOf(i) < 0 &&
          (function (e) {
            r.d(t, e, function () {
              return n[e];
            });
          })(i);
      r("93fa");
      var c = r("828b"),
        o = Object(c["a"])(
          n["default"],
          a["b"],
          a["c"],
          !1,
          null,
          "69e02594",
          null,
          !1,
          a["a"],
          void 0
        );
      t["default"] = o.exports;
    },
    "93fa": function (e, t, r) {
      "use strict";
      var a = r("44b3"),
        n = r.n(a);
      n.a;
    },
    b639: function (e, t, r) {
      "use strict";
      var a = r("47a9");
      Object.defineProperty(t, "__esModule", { value: !0 }),
        (t.default = void 0);
      var n = a(r("7ca3")),
        i = r("8f59"),
        c = r("8714");
      function o(e, t) {
        var r = Object.keys(e);
        if (Object.getOwnPropertySymbols) {
          var a = Object.getOwnPropertySymbols(e);
          t &&
            (a = a.filter(function (t) {
              return Object.getOwnPropertyDescriptor(e, t).enumerable;
            })),
            r.push.apply(r, a);
        }
        return r;
      }
      var f = {
        config: { navigationBarTitleText: "愿望清单", disableScroll: !0 },
        computed: (function (e) {
          for (var t = 1; t < arguments.length; t++) {
            var r = null != arguments[t] ? arguments[t] : {};
            t % 2
              ? o(Object(r), !0).forEach(function (t) {
                  (0, n.default)(e, t, r[t]);
                })
              : Object.getOwnPropertyDescriptors
              ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r))
              : o(Object(r)).forEach(function (t) {
                  Object.defineProperty(
                    e,
                    t,
                    Object.getOwnPropertyDescriptor(r, t)
                  );
                });
          }
          return e;
        })(
          {},
          (0, i.mapState)({
            navigationBarHeight: function (e) {
              return e.navigationBarHeight;
            },
            navigationBarHeightPlaceholder: function (e) {
              return e.navigationBarHeightPlaceholder;
            },
            wishList: function (e) {
              return e.wishList;
            },
          })
        ),
        data: function () {
          return { dataList: null };
        },
        methods: {
          initWish: function () {
            for (var e = [], t = 0; t < c.product.length; t++) {
              var r = c.product[t];
              this.wishList.indexOf(r.articleRef) >= 0 &&
                e.push({
                  articleRef: r.articleRef,
                  articleImages: r.articleImages,
                  reference: r.reference,
                  caseMaterial: r.caseMaterial,
                  collection: r.collection,
                });
            }
            for (var a = [], n = 0, i = 0; i < e.length; i++) {
              var o = e[i];
              i % 2 === 0
                ? a.push([
                    {
                      articleRef: o.articleRef,
                      articleImages: o.articleImages,
                      reference: o.reference,
                      caseMaterial: o.caseMaterial,
                      collection: o.collection,
                    },
                  ])
                : (a[n].push({
                    articleRef: o.articleRef,
                    articleImages: o.articleImages,
                    reference: o.reference,
                    caseMaterial: o.caseMaterial,
                    collection: o.collection,
                  }),
                  n++);
            }
            this.dataList = a;
          },
        },
        onShow: function () {
          this.initWish();
        },
      };
      t.default = f;
    },
    bfba: function (e, t, r) {
      "use strict";
      r.r(t);
      var a = r("b639"),
        n = r.n(a);
      for (var i in a)
        ["default"].indexOf(i) < 0 &&
          (function (e) {
            r.d(t, e, function () {
              return a[e];
            });
          })(i);
      t["default"] = n.a;
    },
  },
  [["5617", "common/runtime", "common/vendor"]],
]);
