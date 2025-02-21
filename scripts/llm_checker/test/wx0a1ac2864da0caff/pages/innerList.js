(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
  ["pages/innerList"],
  {
    "41c3": function (e, t, r) {
      "use strict";
      (function (e) {
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
        var l = {
          config: { navigationBarTitleText: "表款列表", disableScroll: !0 },
          computed: (function (e) {
            for (var t = 1; t < arguments.length; t++) {
              var r = null != arguments[t] ? arguments[t] : {};
              t % 2
                ? o(Object(r), !0).forEach(function (t) {
                    (0, n.default)(e, t, r[t]);
                  })
                : Object.getOwnPropertyDescriptors
                ? Object.defineProperties(
                    e,
                    Object.getOwnPropertyDescriptors(r)
                  )
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
              calibers: function (e) {
                return e.calibers;
              },
            })
          ),
          data: function () {
            return { dataList: null };
          },
          methods: {
            initWish: function () {
              var t = this.$root.$mp.query;
              if (t && t.ref) {
                var r = decodeURIComponent(t.ref);
                e.setNavigationBarTitle({ title: r });
                for (var a = [], n = 0; n < this.calibers.length; n++) {
                  var i = this.calibers[n];
                  if (i.caliberRef === r)
                    for (var o = 0; o < c.product.length; o++) {
                      var l = c.product[o];
                      l.caliberRefFull === i.caliberRef &&
                        ((i.caliberDescriptionHTML = l.caliberDescriptionHTML),
                        a.push(JSON.parse(JSON.stringify(l))));
                    }
                }
                for (var u = [], f = 0, s = 0; s < a.length; s++) {
                  var d = a[s];
                  s % 2 === 0
                    ? u.push([
                        {
                          articleRef: d.articleRef,
                          articleImages: d.articleImages,
                          reference: d.reference,
                          caseMaterial: d.caseMaterial,
                          collection: d.collection,
                        },
                      ])
                    : (u[f].push({
                        articleRef: d.articleRef,
                        articleImages: d.articleImages,
                        reference: d.reference,
                        caseMaterial: d.caseMaterial,
                        collection: d.collection,
                      }),
                      f++);
                }
                this.dataList = u;
              } else this.$alert("参数异常，请重试");
            },
          },
          onShow: function () {
            this.initWish();
          },
        };
        t.default = l;
      }).call(this, r("3223")["default"]);
    },
    "78b3": function (e, t, r) {
      "use strict";
      (function (e, t) {
        var a = r("47a9");
        r("b45a");
        a(r("3240"));
        var n = a(r("8e06"));
        (e.__webpack_require_UNI_MP_PLUGIN__ = r), t(n.default);
      }).call(this, r("3223")["default"], r("df3c")["createPage"]);
    },
    "802a": function (e, t, r) {
      "use strict";
      r.r(t);
      var a = r("41c3"),
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
    "8e06": function (e, t, r) {
      "use strict";
      r.r(t);
      var a = r("ac05"),
        n = r("802a");
      for (var i in n)
        ["default"].indexOf(i) < 0 &&
          (function (e) {
            r.d(t, e, function () {
              return n[e];
            });
          })(i);
      r("a7df");
      var c = r("828b"),
        o = Object(c["a"])(
          n["default"],
          a["b"],
          a["c"],
          !1,
          null,
          "67e6cc64",
          null,
          !1,
          a["a"],
          void 0
        );
      t["default"] = o.exports;
    },
    a7df: function (e, t, r) {
      "use strict";
      var a = r("bcea"),
        n = r.n(a);
      n.a;
    },
    ac05: function (e, t, r) {
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
    bcea: function (e, t, r) {},
  },
  [["78b3", "common/runtime", "common/vendor"]],
]);
