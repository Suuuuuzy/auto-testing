(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
  ["pages/shucheng/search"],
  {
    "0181": function (t, s, i) {},
    "8faa": function (t, s, i) {
      "use strict";
      (function (t, s) {
        var e = i("4ea4");
        i("6cdc");
        e(i("66fd"));
        var o = e(i("9f76"));
        (t.__webpack_require_UNI_MP_PLUGIN__ = i), s(o.default);
      }).call(this, i("bc2e")["default"], i("543d")["createPage"]);
    },
    "8fee": function (t, s, i) {
      "use strict";
      (function (t) {
        var e = i("4ea4");
        Object.defineProperty(s, "__esModule", { value: !0 }),
          (s.default = void 0);
        var o = e(i("448a"));
        i("c9b7"),
          (s.default = {
            data: function () {
              return {
                homeList: null,
                sort: "",
                historylist: [],
                isShowlist: !1,
                hasNextPage: !0,
                showMore: !1,
                timer: {},
                status: "loading",
                pageNum: 1,
              };
            },
            onShow: function () {
              this.sort && this.getSearch(), this.getsearchShelf();
            },
            methods: {
              chooseone: function (t) {
                (this.sort = t), this.searchquery();
              },
              getsearchShelf: function () {
                var s = this;
                (this.sort = ""),
                  (this.pageNum = 1),
                  (this.showMore = !1),
                  (this.isShowlist = !1),
                  (this.historylist = []),
                  t.getStorageSync("history") &&
                    (this.historylist = t.getStorageSync("history").split(",")),
                  (this.homeList = []),
                  this.$get(this.$api.shelfsearch, {}).then(function (t) {
                    console.log(t),
                      (s.homeList = t.data.content),
                      (s.hasNextPage = !0);
                  });
              },
              searchquery: function () {
                t.pageScrollTo({ scrollTop: 0 }),
                  "" !== this.sort
                    ? (this.historylist.length < 5
                        ? (this.historylist.length,
                          this.optionA(),
                          t.setStorageSync(
                            "history",
                            this.historylist.toString()
                          ))
                        : (this.optionA(),
                          (this.historylist = this.historylist.slice(0, 5)),
                          t.setStorageSync(
                            "history",
                            this.historylist.toString()
                          )),
                      (this.pageNum = 1),
                      (this.homeList = []),
                      (this.showMore = !1),
                      (this.isShowlist = !1),
                      this.getSearch())
                    : t.showToast({
                        title: "请输入查询词后再搜索",
                        icon: "none",
                        duration: 1e3,
                      });
              },
              getSearch: function () {
                var s = this;
                this.$get(this.$api.searchquery, {
                  queryString: this.sort,
                  page: this.pageNum,
                }).then(function (i) {
                  console.log(i),
                    (s.isShowlist = !0),
                    i.data &&
                    i.data.content &&
                    1 == i.data.content.length &&
                    1 == s.pageNum
                      ? s.iswxReader(i.data.content[0], "chapterLink")
                      : (i &&
                          i.data &&
                          i.data.content &&
                          ((s.homeList =
                            s.homeList && s.homeList.length > 0
                              ? s.homeList.concat(i.data.content)
                              : i.data.content),
                          (s.hasNextPage = i.data.last)),
                        t.hideNavigationBarLoading(),
                        s.pageNum++,
                        s.hasNextPage ? (s.showMore = !0) : (s.showMore = !1));
                });
              },
              changeInput: function () {
                this.sort || this.getsearchShelf();
              },
              optionA: function () {
                this.historylist.unshift(this.sort),
                  (this.historylist = new Set(this.historylist)),
                  (this.historylist = (0, o.default)(this.historylist));
              },
              clearHisFun: function () {
                t.setStorageSync("history", ""), this.getsearchShelf();
              },
              scrolltolowerFun: function () {
                this.hasNextPage ||
                  (t.showNavigationBarLoading(), this.getSearch());
              },
            },
            beforeDestroy: function () {
              var t = this;
              t.sort = "";
            },
            onHide: function () {
              var t = this;
              t.sort = "";
            },
          });
      }).call(this, i("543d")["default"]);
    },
    "934c": function (t, s, i) {
      "use strict";
      var e;
      i.d(s, "b", function () {
        return o;
      }),
        i.d(s, "c", function () {
          return n;
        }),
        i.d(s, "a", function () {
          return e;
        });
      var o = function () {
          var t = this,
            s = t.$createElement,
            e = (t._self._c, i("8c7f")),
            o = !t.isShowlist && t.historylist && t.historylist.length > 0,
            n = o ? i("1320") : null,
            h = t.homeList && 0 == t.homeList.length && t.showMore,
            a = !t.isShowlist && !t.showMore && t.homeList.length > 0,
            r = t.homeList && t.homeList.length > 0,
            c = r
              ? t.__map(t.homeList, function (s, i) {
                  var e = t.__get_orig(s),
                    o =
                      !t.isShowlist && s.book.tags
                        ? s.book.tags.split("·")
                        : null,
                    n = s.tags && t.isShowlist ? s.tags.split(",") : null;
                  return { $orig: e, l0: o, l1: n };
                })
              : null;
          t.$mp.data = Object.assign(
            {},
            { $root: { m0: e, g0: o, m1: n, g1: h, g2: a, g3: r, l2: c } }
          );
        },
        n = [];
    },
    9474: function (t, s, i) {
      "use strict";
      var e = i("0181"),
        o = i.n(e);
      o.a;
    },
    "9f76": function (t, s, i) {
      "use strict";
      i.r(s);
      var e = i("934c"),
        o = i("a115");
      for (var n in o)
        ["default"].indexOf(n) < 0 &&
          (function (t) {
            i.d(s, t, function () {
              return o[t];
            });
          })(n);
      i("9474");
      var h,
        a = i("f0c5"),
        r = Object(a["a"])(
          o["default"],
          e["b"],
          e["c"],
          !1,
          null,
          null,
          null,
          !1,
          e["a"],
          h
        );
      s["default"] = r.exports;
    },
    a115: function (t, s, i) {
      "use strict";
      i.r(s);
      var e = i("8fee"),
        o = i.n(e);
      for (var n in e)
        ["default"].indexOf(n) < 0 &&
          (function (t) {
            i.d(s, t, function () {
              return e[t];
            });
          })(n);
      s["default"] = o.a;
    },
  },
  [["8faa", "common/runtime", "common/vendor"]],
]);
