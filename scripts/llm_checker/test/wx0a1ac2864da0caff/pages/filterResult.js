(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
  ["pages/filterResult"],
  {
    "1bb3": function (e, t, r) {
      "use strict";
      (function (e) {
        var i = r("47a9");
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.default = void 0);
        var o = i(r("7ca3")),
          c = r("8f59"),
          a = r("8714");
        function n(e, t) {
          var r = Object.keys(e);
          if (Object.getOwnPropertySymbols) {
            var i = Object.getOwnPropertySymbols(e);
            t &&
              (i = i.filter(function (t) {
                return Object.getOwnPropertyDescriptor(e, t).enumerable;
              })),
              r.push.apply(r, i);
          }
          return r;
        }
        var l = [],
          s = {
            config: { navigationBarTitleText: "表款", disableScroll: !0 },
            computed: (function (e) {
              for (var t = 1; t < arguments.length; t++) {
                var r = null != arguments[t] ? arguments[t] : {};
                t % 2
                  ? n(Object(r), !0).forEach(function (t) {
                      (0, o.default)(e, t, r[t]);
                    })
                  : Object.getOwnPropertyDescriptors
                  ? Object.defineProperties(
                      e,
                      Object.getOwnPropertyDescriptors(r)
                    )
                  : n(Object(r)).forEach(function (t) {
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
              (0, c.mapState)({
                navigationBarHeight: function (e) {
                  return e.navigationBarHeight;
                },
                navigationBarHeightPlaceholder: function (e) {
                  return e.navigationBarHeightPlaceholder;
                },
                choosedFilter: function (e) {
                  return e.choosedFilter;
                },
              })
            ),
            data: function () {
              return {
                choosedFilterShow: null,
                productShow: null,
                filterBar: null,
                filterCount: 0,
                page: 1,
                isEnd: !1,
                fetching: !1,
              };
            },
            methods: {
              removeTag: function (e, t) {
                var r = this;
                this.$alert({
                  content: "是否删除此筛选条件",
                  showCancel: !0,
                  success: function () {
                    for (var i = 0; i < r.choosedFilterShow[e.type].length; i++)
                      if (r.choosedFilterShow[e.type][i] === e.title) {
                        r.choosedFilterShow[e.type].splice(i, 1);
                        break;
                      }
                    setTimeout(function () {
                      r.filterBar.splice(t, 1);
                    }, 30),
                      (r.page = 1),
                      (r.isEnd = !1),
                      r.filterItems();
                  },
                });
              },
              filterItems: function () {
                var t = [],
                  r = [];
                l = JSON.parse(JSON.stringify(a.product));
                var i = 0;
                for (var o in this.choosedFilterShow)
                  if (
                    ((t = []),
                    (r = []),
                    this.choosedFilterShow[o] &&
                      0 !== this.choosedFilterShow[o].length)
                  ) {
                    i++;
                    for (var c = 0; c < this.choosedFilterShow[o].length; c++)
                      for (var n = 0; n < l.length; n++) {
                        var s = l[n];
                        if ("complications" === o)
                          s[o].indexOf(this.choosedFilterShow[o][c]) >= 0 &&
                            r.indexOf(s.articleRef) < 0 &&
                            (t.push(s), r.push(s.articleRef));
                        else if ("price" === o) {
                          if (
                            "按需报价" === s.price &&
                            "按需报价" === this.choosedFilterShow[o][c] &&
                            r.indexOf(s.articleRef) < 0
                          )
                            t.push(s), r.push(s.articleRef);
                          else if (s.price) {
                            var h = parseInt(
                                s.price.replace(/\'/g, "").replace(/ CNY/g, "")
                              ),
                              f = this.choosedFilterShow[o][c]
                                .replace(/\'/g, "")
                                .replace(/ CNY/g, "")
                                .split(" - "),
                              u = parseInt(f[0]),
                              d = parseInt(f[1]);
                            h >= u &&
                              h <= d &&
                              r.indexOf(s.articleRef) < 0 &&
                              (t.push(s), r.push(s.articleRef));
                          }
                        } else
                          s[o] === this.choosedFilterShow[o][c] &&
                            r.indexOf(s.articleRef) < 0 &&
                            (t.push(s), r.push(s.articleRef));
                      }
                    l = t;
                  }
                i || (l = a.product),
                  e.setNavigationBarTitle({
                    title: "表款（".concat(l.length, "）"),
                  });
                var p = l.splice(0, 30),
                  g = [],
                  v = 0;
                if (p) {
                  p.length < 30 && (this.isEnd = !0);
                  for (var w = 0; w < p.length; w++) {
                    var m = p[w];
                    w % 2 === 0
                      ? g.push([
                          {
                            articleRef: m.articleRef,
                            articleImages: m.articleImages,
                            reference: m.reference,
                            caseMaterial: m.caseMaterial,
                            collection: m.collection,
                          },
                        ])
                      : (g[v].push({
                          articleRef: m.articleRef,
                          articleImages: m.articleImages,
                          reference: m.reference,
                          caseMaterial: m.caseMaterial,
                          collection: m.collection,
                        }),
                        v++);
                  }
                }
                this.productShow = g;
              },
              toBottomRefresh: function () {
                var e = this;
                if (!this.isEnd && !this.fetching) {
                  var t = l.splice(
                      30 * (this.page - 1),
                      30 * (this.page - 1) + 30
                    ),
                    r = [],
                    i = 0;
                  if (t) {
                    t.length < 30 && (this.isEnd = !0);
                    for (var o = 0; o < t.length; o++) {
                      var c = t[o];
                      o % 2 === 0
                        ? r.push([
                            {
                              articleRef: c.articleRef,
                              articleImages: c.articleImages,
                              reference: c.reference,
                              caseMaterial: c.caseMaterial,
                              collection: c.collection,
                            },
                          ])
                        : (r[i].push({
                            articleRef: c.articleRef,
                            articleImages: c.articleImages,
                            reference: c.reference,
                            caseMaterial: c.caseMaterial,
                            collection: c.collection,
                          }),
                          i++);
                    }
                  }
                  (this.fetching = !0),
                    setTimeout(function () {
                      (e.fetching = !1),
                        (e.productShow = e.productShow.concat(r));
                    }, 30),
                    this.page++;
                }
              },
            },
            mounted: function () {
              var t = this.$root.$mp.query;
              t &&
                t.count &&
                e.setNavigationBarTitle({
                  title: "表款（".concat(t.count, "）"),
                });
              var r = [];
              console.log(JSON.stringify(this.choosedFilter)),
                (this.productShow = null),
                (this.page = 1),
                (this.isEnd = !1),
                (this.fetching = !1),
                (this.choosedFilterShow = JSON.parse(
                  JSON.stringify(this.choosedFilter)
                )),
                (this.filterBar = null);
              var i = [];
              for (var o in this.choosedFilterShow)
                if (
                  this.choosedFilterShow[o] &&
                  0 !== this.choosedFilterShow[o].length
                )
                  for (var c = 0; c < this.choosedFilterShow[o].length; c++)
                    r.indexOf(o + this.choosedFilterShow[o][c]) >= 0 ||
                      (r.push(o + this.choosedFilterShow[o][c]),
                      i.push({
                        index: c,
                        title: this.choosedFilterShow[o][c],
                        type: o,
                      }));
              console.log(i), (this.filterBar = i), this.filterItems();
            },
          };
        t.default = s;
      }).call(this, r("3223")["default"]);
    },
    "1ea9": function (e, t, r) {
      "use strict";
      r.r(t);
      var i = r("c64e"),
        o = r("5ef4");
      for (var c in o)
        ["default"].indexOf(c) < 0 &&
          (function (e) {
            r.d(t, e, function () {
              return o[e];
            });
          })(c);
      r("a020");
      var a = r("828b"),
        n = Object(a["a"])(
          o["default"],
          i["b"],
          i["c"],
          !1,
          null,
          "10146d00",
          null,
          !1,
          i["a"],
          void 0
        );
      t["default"] = n.exports;
    },
    "5ef4": function (e, t, r) {
      "use strict";
      r.r(t);
      var i = r("1bb3"),
        o = r.n(i);
      for (var c in i)
        ["default"].indexOf(c) < 0 &&
          (function (e) {
            r.d(t, e, function () {
              return i[e];
            });
          })(c);
      t["default"] = o.a;
    },
    6929: function (e, t, r) {
      "use strict";
      (function (e, t) {
        var i = r("47a9");
        r("b45a");
        i(r("3240"));
        var o = i(r("1ea9"));
        (e.__webpack_require_UNI_MP_PLUGIN__ = r), t(o.default);
      }).call(this, r("3223")["default"], r("df3c")["createPage"]);
    },
    9234: function (e, t, r) {},
    a020: function (e, t, r) {
      "use strict";
      var i = r("9234"),
        o = r.n(i);
      o.a;
    },
    c64e: function (e, t, r) {
      "use strict";
      r.d(t, "b", function () {
        return i;
      }),
        r.d(t, "c", function () {
          return o;
        }),
        r.d(t, "a", function () {});
      var i = function () {
          var e = this,
            t = e.$createElement,
            r = (e._self._c, e.filterBar ? e.filterBar.length : null);
          e._isMounted ||
            ((e.e0 = function (t, r) {
              var i = arguments[arguments.length - 1].currentTarget.dataset,
                o = i.eventParams || i["event-params"];
              r = o.itemInner;
              return e.$router.push("watch?ref=" + r.articleRef);
            }),
            (e.e1 = function (t) {
              return e.$router.replace("filterList");
            })),
            (e.$mp.data = Object.assign({}, { $root: { g0: r } }));
        },
        o = [];
    },
  },
  [["6929", "common/runtime", "common/vendor"]],
]);
