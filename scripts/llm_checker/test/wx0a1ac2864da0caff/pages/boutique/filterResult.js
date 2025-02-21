(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
  ["pages/boutique/filterResult"],
  {
    "412d": function (e, t, i) {
      "use strict";
      (function (e, t) {
        var r = i("47a9");
        i("b45a");
        r(i("3240"));
        var o = r(i("bf4d"));
        (e.__webpack_require_UNI_MP_PLUGIN__ = i), t(o.default);
      }).call(this, i("3223")["default"], i("df3c")["createPage"]);
    },
    "4c2d": function (e, t, i) {
      "use strict";
      var r = i("4e2a"),
        o = i.n(r);
      o.a;
    },
    "4e2a": function (e, t, i) {},
    "4e6b": function (e, t, i) {
      "use strict";
      (function (e) {
        var r = i("47a9");
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.default = void 0);
        var o = r(i("7ca3")),
          c = i("8f59"),
          a = i("8714");
        function n(e, t) {
          var i = Object.keys(e);
          if (Object.getOwnPropertySymbols) {
            var r = Object.getOwnPropertySymbols(e);
            t &&
              (r = r.filter(function (t) {
                return Object.getOwnPropertyDescriptor(e, t).enumerable;
              })),
              i.push.apply(i, r);
          }
          return i;
        }
        var s = [],
          l = {
            config: { navigationBarTitleText: "表款", disableScroll: !0 },
            computed: (function (e) {
              for (var t = 1; t < arguments.length; t++) {
                var i = null != arguments[t] ? arguments[t] : {};
                t % 2
                  ? n(Object(i), !0).forEach(function (t) {
                      (0, o.default)(e, t, i[t]);
                    })
                  : Object.getOwnPropertyDescriptors
                  ? Object.defineProperties(
                      e,
                      Object.getOwnPropertyDescriptors(i)
                    )
                  : n(Object(i)).forEach(function (t) {
                      Object.defineProperty(
                        e,
                        t,
                        Object.getOwnPropertyDescriptor(i, t)
                      );
                    });
              }
              return e;
            })(
              {},
              (0, c.mapState)({
                choosedFilter: function (e) {
                  return e.choosedFilter;
                },
                likedWatch: function (e) {
                  return e.likedWatch;
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
                inited: !1,
              };
            },
            methods: {
              finishChoose: function () {
                for (var e = [], t = 0; t < this.productShow.length; t++)
                  for (var i = 0; i < this.productShow[t].length; i++) {
                    var r = this.productShow[t][i];
                    r.active && e.push(r.articleRef);
                  }
                this.$store.commit("UPDATE_LIKED_WATCH", e),
                  this.$router.back();
              },
              chooseItem: function (e) {
                e.active = !e.active;
              },
              removeTag: function (e, t) {
                var i = this;
                this.$alert({
                  content: "是否删除此筛选条件",
                  showCancel: !0,
                  success: function () {
                    for (var r = 0; r < i.choosedFilterShow[e.type].length; r++)
                      if (i.choosedFilterShow[e.type][r] === e.title) {
                        i.choosedFilterShow[e.type].splice(r, 1);
                        break;
                      }
                    i.$store.commit(
                      "UPDATE_CHOOSED_FILTER",
                      i.choosedFilterShow
                    ),
                      setTimeout(function () {
                        i.filterBar.splice(t, 1);
                      }, 30),
                      (i.page = 1),
                      (i.isEnd = !1),
                      i.filterItems();
                  },
                });
              },
              filterItems: function () {
                var e = [],
                  t = [];
                s = JSON.parse(JSON.stringify(a.product));
                var i = 0;
                for (var r in this.choosedFilterShow)
                  if (
                    ((e = []),
                    (t = []),
                    this.choosedFilterShow[r] &&
                      0 !== this.choosedFilterShow[r].length)
                  ) {
                    i++;
                    for (var o = 0; o < this.choosedFilterShow[r].length; o++)
                      for (var c = 0; c < s.length; c++) {
                        var n = s[c];
                        if ("complications" === r)
                          n[r].indexOf(this.choosedFilterShow[r][o]) >= 0 &&
                            t.indexOf(n.articleRef) < 0 &&
                            (e.push(n), t.push(n.articleRef));
                        else if ("price" === r) {
                          if (
                            "按需报价" === n.price &&
                            "按需报价" === this.choosedFilterShow[r][o] &&
                            t.indexOf(n.articleRef) < 0
                          )
                            e.push(n), t.push(n.articleRef);
                          else if (n.price) {
                            var l = parseInt(
                                n.price.replace(/\'/g, "").replace(/ CNY/g, "")
                              ),
                              h = this.choosedFilterShow[r][o]
                                .replace(/\'/g, "")
                                .replace(/ CNY/g, "")
                                .split(" - "),
                              f = parseInt(h[0]),
                              u = parseInt(h[1]);
                            l >= f &&
                              l <= u &&
                              t.indexOf(n.articleRef) < 0 &&
                              (e.push(n), t.push(n.articleRef));
                          }
                        } else
                          n[r] === this.choosedFilterShow[r][o] &&
                            t.indexOf(n.articleRef) < 0 &&
                            (e.push(n), t.push(n.articleRef));
                      }
                    s = e;
                  }
                i || (s = a.product);
                var d = s.splice(0, 30),
                  p = [],
                  g = 0;
                if (d) {
                  d.length < 30 && (this.isEnd = !0);
                  for (var v = 0; v < d.length; v++) {
                    var w = d[v];
                    v % 2 === 0
                      ? p.push([
                          {
                            articleRef: w.articleRef,
                            articleImages: w.articleImages,
                            reference: w.reference,
                            caseMaterial: w.caseMaterial,
                            collection: w.collection,
                            active: this.likedWatch.indexOf(w.articleRef) >= 0,
                          },
                        ])
                      : (p[g].push({
                          articleRef: w.articleRef,
                          articleImages: w.articleImages,
                          reference: w.reference,
                          caseMaterial: w.caseMaterial,
                          collection: w.collection,
                          active: this.likedWatch.indexOf(w.articleRef) >= 0,
                        }),
                        g++);
                  }
                }
                this.productShow = p;
              },
              toBottomRefresh: function () {
                var e = this;
                if (!this.isEnd && !this.fetching) {
                  var t = s.splice(
                      30 * (this.page - 1),
                      30 * (this.page - 1) + 30
                    ),
                    i = [],
                    r = 0;
                  if (t) {
                    t.length < 30 && (this.isEnd = !0);
                    for (var o = 0; o < t.length; o++) {
                      var c = t[o];
                      o % 2 === 0
                        ? i.push([
                            {
                              articleRef: c.articleRef,
                              articleImages: c.articleImages,
                              reference: c.reference,
                              caseMaterial: c.caseMaterial,
                              collection: c.collection,
                              active:
                                this.likedWatch.indexOf(c.articleRef) >= 0,
                            },
                          ])
                        : (i[r].push({
                            articleRef: c.articleRef,
                            articleImages: c.articleImages,
                            reference: c.reference,
                            caseMaterial: c.caseMaterial,
                            collection: c.collection,
                            active: this.likedWatch.indexOf(c.articleRef) >= 0,
                          }),
                          r++);
                    }
                  }
                  (this.fetching = !0),
                    setTimeout(function () {
                      (e.fetching = !1),
                        (e.productShow = e.productShow.concat(i));
                    }, 30),
                    this.page++;
                }
              },
            },
            onShow: function () {
              if (this.inited) {
                var e = [];
                (this.productShow = null),
                  (this.page = 1),
                  (this.isEnd = !1),
                  (this.fetching = !1),
                  (this.choosedFilterShow = JSON.parse(
                    JSON.stringify(this.choosedFilter)
                  )),
                  (this.filterBar = null);
                var t = [];
                for (var i in this.choosedFilterShow)
                  if (
                    this.choosedFilterShow[i] &&
                    0 !== this.choosedFilterShow[i].length
                  )
                    for (var r = 0; r < this.choosedFilterShow[i].length; r++)
                      e.indexOf(i + this.choosedFilterShow[i][r]) >= 0 ||
                        (e.push(i + this.choosedFilterShow[i][r]),
                        t.push({
                          index: r,
                          title: this.choosedFilterShow[i][r],
                          type: i,
                        }));
                console.log(t), (this.filterBar = t), this.filterItems();
              }
            },
            mounted: function () {
              var t = this;
              e.showLoading({ title: "加载中" });
              var i = Date.parse(new Date());
              e.request({
                url: "https://patek.resource.impdigital.cn/product2.json?v=".concat(
                  i
                ),
                dataType: "json",
                success: function (i) {
                  e.hideLoading(), (t.inited = !0);
                  var r = i.data,
                    o = r.watches;
                  (0, a.setProduct)(o);
                  var c = [];
                  (t.productShow = null),
                    (t.page = 1),
                    (t.isEnd = !1),
                    (t.fetching = !1),
                    (t.choosedFilterShow = JSON.parse(
                      JSON.stringify(t.choosedFilter)
                    )),
                    (t.filterBar = null);
                  var n = [];
                  for (var s in t.choosedFilterShow)
                    if (
                      t.choosedFilterShow[s] &&
                      0 !== t.choosedFilterShow[s].length
                    )
                      for (var l = 0; l < t.choosedFilterShow[s].length; l++)
                        c.indexOf(s + t.choosedFilterShow[s][l]) >= 0 ||
                          (c.push(s + t.choosedFilterShow[s][l]),
                          n.push({
                            index: l,
                            title: t.choosedFilterShow[s][l],
                            type: s,
                          }));
                  console.log(n), (t.filterBar = n), t.filterItems();
                },
              });
            },
          };
        t.default = l;
      }).call(this, i("df3c")["default"]);
    },
    abc9: function (e, t, i) {
      "use strict";
      i.d(t, "b", function () {
        return r;
      }),
        i.d(t, "c", function () {
          return o;
        }),
        i.d(t, "a", function () {});
      var r = function () {
          var e = this,
            t = e.$createElement,
            i = (e._self._c, e.filterBar ? e.filterBar.length : null);
          e._isMounted ||
            (e.e0 = function (t) {
              return e.$router.push("filterList");
            }),
            (e.$mp.data = Object.assign({}, { $root: { g0: i } }));
        },
        o = [];
    },
    b20b: function (e, t, i) {
      "use strict";
      i.r(t);
      var r = i("4e6b"),
        o = i.n(r);
      for (var c in r)
        ["default"].indexOf(c) < 0 &&
          (function (e) {
            i.d(t, e, function () {
              return r[e];
            });
          })(c);
      t["default"] = o.a;
    },
    bf4d: function (e, t, i) {
      "use strict";
      i.r(t);
      var r = i("abc9"),
        o = i("b20b");
      for (var c in o)
        ["default"].indexOf(c) < 0 &&
          (function (e) {
            i.d(t, e, function () {
              return o[e];
            });
          })(c);
      i("4c2d");
      var a = i("828b"),
        n = Object(a["a"])(
          o["default"],
          r["b"],
          r["c"],
          !1,
          null,
          "2652f09a",
          null,
          !1,
          r["a"],
          void 0
        );
      t["default"] = n.exports;
    },
  },
  [["412d", "common/runtime", "common/vendor"]],
]);
