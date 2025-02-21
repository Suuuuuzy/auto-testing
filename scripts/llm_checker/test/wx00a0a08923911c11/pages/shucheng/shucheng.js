(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
  ["pages/shucheng/shucheng"],
  {
    "4b8b": function (t, o, n) {
      "use strict";
      (function (t) {
        var e = n("4ea4");
        Object.defineProperty(o, "__esModule", { value: !0 }),
          (o.default = void 0);
        var a = e(n("448a")),
          i =
            (n("c9b7"),
            function () {
              n.e("components/nodata")
                .then(
                  function () {
                    return resolve(n("3969"));
                  }.bind(null, n)
                )
                .catch(n.oe);
            });
        o.default = {
          data: function () {
            return {
              dataList: [],
              pageData: {},
              sort: "",
              scrollTop: 0,
              oldScrollTop: 0,
              current: 0,
              mode: "dot",
              dotsStyles: {
                selectedBackgroundColor: "#FFA500",
                backgroundColor: "#E7E7E7",
              },
              swiperDotIndex: 0,
              windowHeight: 0,
              isShowIconTop: !1,
              isAddShortcut: !0,
              isLoad: !1,
              pageNo: 1,
              pageSize: 6,
              isShowNoData: !1,
              openDesktop: !1,
            };
          },
          components: { nodata: i },
          onShow: function () {},
          onLoad: function () {
            (this.isAddShortcut = !0), this.getData();
          },
          onPageScroll: function (t) {},
          methods: {
            change: function (t) {
              this.current = t.detail.current;
            },
            clickItem: function (t) {
              this.swiperDotIndex = t;
            },
            bannerToDetail: function () {
              var t = this;
              this.dataList.shelves.forEach(function (o) {
                1 == Number(o.layoutId) &&
                  t.iswxReader(o.content[t.current], "chapter");
              });
            },
            clickToDetail: function (t) {
              console.log(this.uniPlatform), this.iswxReader(t, "chapter");
            },
            toChapter: function (t) {
              console.log(t), this.iswxReader(t, "chapter");
            },
            getbookshelf: function (t) {
              var o = this,
                n = /^[0-9]*$/;
              n.test(t.id) ||
                (this.showLoadingFun(),
                this.$get(this.$api.bookshelf, { shelfId: t.id }).then(
                  function (n) {
                    o.hideLoadingFun(), (t.content = n.data.content);
                  }
                ));
            },
            toTop: function () {
              (this.scrollTop = this.oldScrollTop),
                this.$nextTick(function () {
                  this.scrollTop = 0;
                });
            },
            scroll: function (o) {
              (this.oldScrollTop = o.detail.scrollTop),
                (this.windowHeight = t.getSystemInfoSync().windowHeight),
                o.detail.scrollTop > this.windowHeight - 60 - 70
                  ? (this.isShowIconTop = !0)
                  : (this.isShowIconTop = !1);
            },
            scrollLower: function (t) {
              console.log(this.isLoad),
                this.isLoad &&
                  !this.isShowNoData &&
                  (this.pageNo++, this.getPageData());
            },
            getData: function () {
              var o = this;
              t.showLoading({ title: "加载中", mask: !0 }),
                this.$get(this.$api.bookHome, {
                  pageId: "1663471786814947329",
                }).then(function (t) {
                  (o.dataList = t.data),
                    console.log(getApp().globalData.systemInfo.openDesktop),
                    (o.openDesktop =
                      getApp().globalData.systemInfo.openDesktop),
                    o.getPageData();
                });
            },
            getPageData: function () {
              var o = this;
              (this.isLoad = !1),
                this.$get(this.$api.bookPageList, {
                  shelfId: "artemis_heiyan_recommendation_good",
                  pageNo: this.pageNo,
                  pageSize: 6,
                }).then(function (n) {
                  (o.pageData.name = n.data.name),
                    n.data.content && n.data.content.length > 0
                      ? ((o.pageData.content = o.pageData.content
                          ? [].concat(
                              (0, a.default)(o.pageData.content),
                              (0, a.default)(n.data.content)
                            )
                          : n.data.content),
                        (o.isLoad = !0),
                        (o.isShowNoData = !1))
                      : ((o.isLoad = !1), (o.isShowNoData = !0)),
                    t.hideLoading();
                });
            },
            eventHandler: function (t) {
              console.log(t),
                t.detail.errNo
                  ? console.log("添加到桌面失败", t.detail)
                  : ((this.isAddShortcut = !1), console.log("添加到桌面成功"));
            },
            closeAddShortcut: function () {
              this.isAddShortcut = !1;
            },
          },
        };
      }).call(this, n("543d")["default"]);
    },
    "77fd": function (t, o, n) {},
    "92c3": function (t, o, n) {
      "use strict";
      n.r(o);
      var e = n("4b8b"),
        a = n.n(e);
      for (var i in e)
        ["default"].indexOf(i) < 0 &&
          (function (t) {
            n.d(o, t, function () {
              return e[t];
            });
          })(i);
      o["default"] = a.a;
    },
    a1f4: function (t, o, n) {
      "use strict";
      n.d(o, "b", function () {
        return a;
      }),
        n.d(o, "c", function () {
          return i;
        }),
        n.d(o, "a", function () {
          return e;
        });
      var e = {
          uniSwiperDot: function () {
            return n
              .e(
                "uni_modules/uni-swiper-dot/components/uni-swiper-dot/uni-swiper-dot"
              )
              .then(n.bind(null, "27f2"));
          },
          uniIcons: function () {
            return Promise.all([
              n.e("common/vendor"),
              n.e("uni_modules/uni-icons/components/uni-icons/uni-icons"),
            ]).then(n.bind(null, "1a49"));
          },
        },
        a = function () {
          var t = this,
            o = t.$createElement,
            e = (t._self._c, n("e5b1")),
            a = t.__map(t.dataList.shelves, function (o, n) {
              var e = t.__get_orig(o),
                a =
                  2 == o.layoutId
                    ? t.__map(o.content, function (o, n) {
                        var e = t.__get_orig(o),
                          a =
                            0 == n && o.book.tags
                              ? o.book.tags.split(",")
                              : null;
                        return { $orig: e, l0: a };
                      })
                    : null,
                i =
                  2 == o.layoutId
                    ? t.__map(o.content, function (o, n) {
                        var e = t.__get_orig(o),
                          a =
                            0 != n && o.book.tags
                              ? o.book.tags.split(",")
                              : null;
                        return { $orig: e, l2: a };
                      })
                    : null,
                s =
                  3 == o.layoutId
                    ? t.__map(o.content, function (o, n) {
                        var e = t.__get_orig(o),
                          a = o.book.tags ? o.book.tags.split(",") : null;
                        return { $orig: e, l4: a };
                      })
                    : null,
                c =
                  4 == o.layoutId
                    ? t.__map(o.content, function (o, n) {
                        var e = t.__get_orig(o),
                          a = o.book.tags ? o.book.tags.split(",") : null;
                        return { $orig: e, l6: a };
                      })
                    : null;
              return { $orig: e, l1: a, l3: i, l5: s, l7: c };
            }),
            i = t.__map(t.pageData.content, function (o, n) {
              var e = t.__get_orig(o),
                a = o.book.tags ? o.book.tags.split(",") : null;
              return { $orig: e, l9: a };
            });
          t.$mp.data = Object.assign({}, { $root: { m0: e, l8: a, l10: i } });
        },
        i = [];
    },
    c6c3: function (t, o, n) {
      "use strict";
      (function (t, o) {
        var e = n("4ea4");
        n("6cdc");
        e(n("66fd"));
        var a = e(n("e0a7"));
        (t.__webpack_require_UNI_MP_PLUGIN__ = n), o(a.default);
      }).call(this, n("bc2e")["default"], n("543d")["createPage"]);
    },
    e0a7: function (t, o, n) {
      "use strict";
      n.r(o);
      var e = n("a1f4"),
        a = n("92c3");
      for (var i in a)
        ["default"].indexOf(i) < 0 &&
          (function (t) {
            n.d(o, t, function () {
              return a[t];
            });
          })(i);
      n("e41f");
      var s,
        c = n("f0c5"),
        l = Object(c["a"])(
          a["default"],
          e["b"],
          e["c"],
          !1,
          null,
          null,
          null,
          !1,
          e["a"],
          s
        );
      o["default"] = l.exports;
    },
    e41f: function (t, o, n) {
      "use strict";
      var e = n("77fd"),
        a = n.n(e);
      a.a;
    },
  },
  [["c6c3", "common/runtime", "common/vendor"]],
]);
