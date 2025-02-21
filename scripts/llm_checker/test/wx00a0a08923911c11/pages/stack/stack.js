(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
  ["pages/stack/stack"],
  {
    "06e2": function (t, o, i) {
      "use strict";
      i.d(o, "b", function () {
        return s;
      }),
        i.d(o, "c", function () {
          return e;
        }),
        i.d(o, "a", function () {
          return n;
        });
      var n = {
          customImg: function () {
            return i
              .e("components/customImg/customImg")
              .then(i.bind(null, "980c"));
          },
        },
        s = function () {
          var t = this,
            o = t.$createElement,
            n = (t._self._c, i("e5b1")),
            s = t.sortList && 0 != t.sortList.length,
            e = t.orderList && 0 != t.orderList.length,
            a = 1 == t.order && t.orderList && 0 != t.orderList.length,
            r = 2 == t.order && t.orderList && 0 != t.orderList.length,
            c = t.homeList && t.homeList.length > 0,
            h = c
              ? t.__map(t.homeList, function (o, i) {
                  var n = t.__get_orig(o),
                    s = o.tags ? o.tags.split(",") : null,
                    e = o.book && o.book.tags ? o.book.tags.split(",") : null;
                  return { $orig: n, l0: s, l1: e };
                })
              : null,
            l = t.homeList && 0 != t.homeList.length && t.isShowNoData,
            d = t.homeList && 0 == t.homeList.length;
          t.$mp.data = Object.assign(
            {},
            {
              $root: {
                m0: n,
                g0: s,
                g1: e,
                g2: a,
                g3: r,
                g4: c,
                l2: h,
                g5: l,
                g6: d,
              },
            }
          );
        },
        e = [];
    },
    1761: function (t, o, i) {
      "use strict";
      var n = i("da23"),
        s = i.n(n);
      s.a;
    },
    2416: function (t, o, i) {
      "use strict";
      (function (t, o) {
        var n = i("4ea4");
        i("6cdc");
        n(i("66fd"));
        var s = n(i("293e"));
        (t.__webpack_require_UNI_MP_PLUGIN__ = i), o(s.default);
      }).call(this, i("bc2e")["default"], i("543d")["createPage"]);
    },
    "293e": function (t, o, i) {
      "use strict";
      i.r(o);
      var n = i("06e2"),
        s = i("7dd0");
      for (var e in s)
        ["default"].indexOf(e) < 0 &&
          (function (t) {
            i.d(o, t, function () {
              return s[t];
            });
          })(e);
      i("1761");
      var a,
        r = i("f0c5"),
        c = Object(r["a"])(
          s["default"],
          n["b"],
          n["c"],
          !1,
          null,
          null,
          null,
          !1,
          n["a"],
          a
        );
      o["default"] = c.exports;
    },
    "4be9": function (t, o, i) {
      "use strict";
      (function (t) {
        Object.defineProperty(o, "__esModule", { value: !0 }),
          (o.default = void 0);
        i("c9b7");
        var n = function () {
          i.e("components/nodata")
            .then(
              function () {
                return resolve(i("3969"));
              }.bind(null, i)
            )
            .catch(i.oe);
        };
        o.default = {
          data: function () {
            return {
              homeList: null,
              sort: "",
              sortList: [],
              order: 1,
              orderList: [],
              scrollTop: 0,
              oldScrollTop: 0,
              pageNum: 1,
              isLoad: !1,
              isShowIconTop: !1,
              isShowNoData: !1,
            };
          },
          components: { nodata: n },
          onShow: function () {},
          onLoad: function () {
            this.getTabs();
          },
          methods: {
            getTabs: function () {
              var t = this;
              this.$get(this.$api.stackTabs).then(function (o) {
                (t.orderList = o.data.order),
                  (t.sortList = o.data.sort),
                  t.getList();
              });
            },
            getList: function (o) {
              var i,
                n = this;
              (i =
                1 == this.order
                  ? this.$api.stackNewAllList
                  : this.$api.stackAllList),
                o ||
                  (this.showLoadingFun(),
                  (this.scrollTop = this.oldScrollTop),
                  this.$nextTick(function () {
                    n.scrollTop = 0;
                  })),
                (this.isLoad = !1),
                this.$get(i, {
                  page: this.pageNum,
                  sort: this.sort,
                  order: this.order,
                }).then(function (o) {
                  o.data.content && 0 != o.data.content.length
                    ? ((n.homeList =
                        n.homeList && n.homeList.length > 0
                          ? n.homeList.concat(o.data.content)
                          : o.data.content),
                      (n.isLoad = !0),
                      (n.isShowNoData = !1))
                    : ((n.isLoad = !1), (n.isShowNoData = !0)),
                    t.hideNavigationBarLoading(),
                    n.hideLoadingFun();
                });
            },
            scroll: function (o) {
              (this.oldScrollTop = o.detail.scrollTop),
                (this.windowHeight = t.getSystemInfoSync().windowHeight),
                o.detail.scrollTop > this.windowHeight - 116 - 120 - 70
                  ? (this.isShowIconTop = !0)
                  : (this.isShowIconTop = !1);
            },
            scrollLower: function (o) {
              this.isLoad &&
                (t.showNavigationBarLoading(),
                this.pageNum++,
                this.pageNum > 15
                  ? ((this.isLoad = !1),
                    (this.isShowNoData = !0),
                    t.hideNavigationBarLoading())
                  : this.getList("scrollTop"));
            },
            toTop: function () {
              (this.scrollTop = this.oldScrollTop),
                this.$nextTick(function () {
                  this.scrollTop = 0;
                });
            },
            sortChangeTab: function (t) {
              (this.sort = t),
                (this.order = 1),
                (this.pageNum = 1),
                (this.homeList = []),
                this.getList();
            },
            orderChangeTab: function (t) {
              (this.order = t),
                (this.pageNum = 1),
                (this.homeList = []),
                this.getList();
            },
          },
        };
      }).call(this, i("543d")["default"]);
    },
    "7dd0": function (t, o, i) {
      "use strict";
      i.r(o);
      var n = i("4be9"),
        s = i.n(n);
      for (var e in n)
        ["default"].indexOf(e) < 0 &&
          (function (t) {
            i.d(o, t, function () {
              return n[t];
            });
          })(e);
      o["default"] = s.a;
    },
    da23: function (t, o, i) {},
  },
  [["2416", "common/runtime", "common/vendor"]],
]);
