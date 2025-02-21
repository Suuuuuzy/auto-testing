(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
  ["pages/watchList"],
  {
    "5c32": function (e, t, n) {
      "use strict";
      (function (e, t) {
        var r = n("47a9");
        n("b45a");
        r(n("3240"));
        var i = r(n("ba11"));
        (e.__webpack_require_UNI_MP_PLUGIN__ = n), t(i.default);
      }).call(this, n("3223")["default"], n("df3c")["createPage"]);
    },
    7470: function (e, t, n) {
      "use strict";
      n.r(t);
      var r = n("b492"),
        i = n.n(r);
      for (var c in r)
        ["default"].indexOf(c) < 0 &&
          (function (e) {
            n.d(t, e, function () {
              return r[e];
            });
          })(c);
      t["default"] = i.a;
    },
    "784e": function (e, t, n) {},
    "8dc1": function (e, t, n) {
      "use strict";
      n.d(t, "b", function () {
        return r;
      }),
        n.d(t, "c", function () {
          return i;
        }),
        n.d(t, "a", function () {});
      var r = function () {
          var e = this,
            t = e.$createElement;
          e._self._c;
          e._isMounted ||
            ((e.e0 = function (t) {
              e.showMore = !e.showMore;
            }),
            (e.e1 = function (t, n) {
              var r = arguments[arguments.length - 1].currentTarget.dataset,
                i = r.eventParams || r["event-params"];
              n = i.itemInner;
              return e.$router.push("watch?ref=" + n.articleRef);
            }));
        },
        i = [];
    },
    "8ec3": function (e, t, n) {
      "use strict";
      var r = n("784e"),
        i = n.n(r);
      i.a;
    },
    b492: function (e, t, n) {
      "use strict";
      var r = n("47a9");
      Object.defineProperty(t, "__esModule", { value: !0 }),
        (t.default = void 0);
      var i = r(n("7ca3")),
        c = n("8f59"),
        a = n("8714");
      function o(e, t) {
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
      var l = [],
        s = [
          "超级复杂功能时计",
          "复杂功能时计",
          "Calatrava",
          "Gondolo",
          "Golden Ellipse",
          "Nautilus",
          "Aquanaut",
          "Twenty~4",
          "怀表",
        ],
        u = {
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
          computed: (function (e) {
            for (var t = 1; t < arguments.length; t++) {
              var n = null != arguments[t] ? arguments[t] : {};
              t % 2
                ? o(Object(n), !0).forEach(function (t) {
                    (0, i.default)(e, t, n[t]);
                  })
                : Object.getOwnPropertyDescriptors
                ? Object.defineProperties(
                    e,
                    Object.getOwnPropertyDescriptors(n)
                  )
                : o(Object(n)).forEach(function (t) {
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
              navigationBarHeight: function (e) {
                return e.navigationBarHeight;
              },
              navigationBarHeightPlaceholder: function (e) {
                return e.navigationBarHeightPlaceholder;
              },
            })
          ),
          data: function () {
            return {
              showMore: !1,
              showFixed: !1,
              nowView: "c1",
              nowCollection: "超级复杂功能时计",
              productShow: null,
              page: 1,
              isEnd: !1,
              fetching: !1,
            };
          },
          methods: {
            scrollPage: function (e) {
              var t = e.mp.detail.scrollTop;
              this.showFixed = t >= 280 * this.$rpx;
            },
            chooseItem: function (e, t) {
              (this.nowCollection = e), this.init();
            },
            init: function () {
              (this.page = 1),
                (this.isEnd = !1),
                (this.fetching = !1),
                (l = []);
              for (var e = 0; e < a.product.length; e++) {
                var t = a.product[e];
                t.collection === this.nowCollection &&
                  l.push({
                    articleRef: t.articleRef,
                    articleImages: t.articleImages,
                    reference: t.reference,
                    caseMaterial: t.caseMaterial,
                    collection: t.collection,
                  });
              }
              var n = l.splice(0, 30),
                r = [],
                i = 0;
              if (n) {
                n.length < 30 && (this.isEnd = !0);
                for (var c = 0; c < n.length; c++) {
                  var o = n[c];
                  c % 2 === 0
                    ? r.push([
                        {
                          articleRef: o.articleRef,
                          articleImages: o.articleImages,
                          reference: o.reference,
                          caseMaterial: o.caseMaterial,
                          collection: o.collection,
                        },
                      ])
                    : (r[i].push({
                        articleRef: o.articleRef,
                        articleImages: o.articleImages,
                        reference: o.reference,
                        caseMaterial: o.caseMaterial,
                        collection: o.collection,
                      }),
                      i++);
                }
              }
              this.productShow = r;
            },
            toBottomRefresh: function () {
              var e = this;
              if (!this.isEnd && !this.fetching) {
                var t = l.splice(
                    30 * (this.page - 1),
                    30 * (this.page - 1) + 30
                  ),
                  n = [],
                  r = 0;
                if (t) {
                  t.length < 30 && (this.isEnd = !0);
                  for (var i = 0; i < t.length; i++) {
                    var c = t[i];
                    i % 2 === 0
                      ? n.push([
                          {
                            articleRef: c.articleRef,
                            articleImages: c.articleImages,
                            reference: c.reference,
                            caseMaterial: c.caseMaterial,
                            collection: c.collection,
                          },
                        ])
                      : (n[r].push({
                          articleRef: c.articleRef,
                          articleImages: c.articleImages,
                          reference: c.reference,
                          caseMaterial: c.caseMaterial,
                          collection: c.collection,
                        }),
                        r++);
                  }
                }
                (this.fetching = !0),
                  setTimeout(function () {
                    (e.productShow = e.productShow.concat(n)),
                      (e.fetching = !1);
                  }, 30),
                  this.page++;
              }
            },
          },
          mounted: function () {
            this.showFixed = !1;
            var e = this.$root.$mp.query;
            if (e && e.collection) {
              this.nowCollection = decodeURIComponent(e.collection);
              var t = s.indexOf(this.nowCollection) + 1;
              this.nowView = "c" + t;
            }
            this.init();
          },
        };
      t.default = u;
    },
    ba11: function (e, t, n) {
      "use strict";
      n.r(t);
      var r = n("8dc1"),
        i = n("7470");
      for (var c in i)
        ["default"].indexOf(c) < 0 &&
          (function (e) {
            n.d(t, e, function () {
              return i[e];
            });
          })(c);
      n("8ec3");
      var a = n("828b"),
        o = Object(a["a"])(
          i["default"],
          r["b"],
          r["c"],
          !1,
          null,
          "34004108",
          null,
          !1,
          r["a"],
          void 0
        );
      t["default"] = o.exports;
    },
  },
  [["5c32", "common/runtime", "common/vendor"]],
]);
