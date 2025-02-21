(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
  ["components/pp/Index"],
  {
    "1a54": function (t, e, n) {
      "use strict";
      n.d(e, "b", function () {
        return o;
      }),
        n.d(e, "c", function () {
          return i;
        }),
        n.d(e, "a", function () {});
      var o = function () {
          var t = this.$createElement,
            e =
              (this._self._c,
              this.placeholder >= 0
                ? this.banner && this.banner.length > 1
                : null);
          this.$mp.data = Object.assign({}, { $root: { g0: e } });
        },
        i = [];
    },
    "25e2": function (t, e, n) {
      "use strict";
      n.r(e);
      var o = n("1a54"),
        i = n("ecb4");
      for (var r in i)
        ["default"].indexOf(r) < 0 &&
          (function (t) {
            n.d(e, t, function () {
              return i[t];
            });
          })(r);
      n("4ab2");
      var a = n("828b"),
        c = Object(a["a"])(
          i["default"],
          o["b"],
          o["c"],
          !1,
          null,
          "17705679",
          null,
          !1,
          o["a"],
          void 0
        );
      e["default"] = c.exports;
    },
    4686: function (t, e, n) {},
    "4ab2": function (t, e, n) {
      "use strict";
      var o = n("4686"),
        i = n.n(o);
      i.a;
    },
    "9eb8": function (t, e, n) {
      "use strict";
      (function (t) {
        var o = n("47a9");
        Object.defineProperty(e, "__esModule", { value: !0 }),
          (e.default = void 0);
        var i = o(n("7ca3")),
          r = n("8f59");
        function a(t, e) {
          var n = Object.keys(t);
          if (Object.getOwnPropertySymbols) {
            var o = Object.getOwnPropertySymbols(t);
            e &&
              (o = o.filter(function (e) {
                return Object.getOwnPropertyDescriptor(t, e).enumerable;
              })),
              n.push.apply(n, o);
          }
          return n;
        }
        var c,
          u = [],
          s = {
            props: { value: Boolean, placeholder: Number },
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
                  ? a(Object(n), !0).forEach(function (e) {
                      (0, i.default)(t, e, n[e]);
                    })
                  : Object.getOwnPropertyDescriptors
                  ? Object.defineProperties(
                      t,
                      Object.getOwnPropertyDescriptors(n)
                    )
                  : a(Object(n)).forEach(function (e) {
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
              (0, r.mapState)({
                wishList: function (t) {
                  return t.wishList;
                },
                currentNew: function (t) {
                  return t.currentNew;
                },
                newWatch: function (t) {
                  return t.newWatch;
                },
                watchTypeCount: function (t) {
                  return t.watchTypeCount;
                },
              })
            ),
            data: function () {
              return {
                tab: 1,
                showNav: !1,
                isPlay: !1,
                canPlay: !0,
                nowBanner: 0,
                video0: !0,
                video1: !1,
                video2: !1,
                video3: !1,
                video4: !1,
                video5: !1,
                banner: [
                  {
                    id: 2,
                    show: !1,
                    source: "video",
                    url: "https://static.patek.com/videos/articles/5330G_001/PP_5330G_001_banner-desktop_77533_0.mp4",
                    title: "日期显示世界时间腕表",
                    title_sub: "Ref. 5330G-001",
                    type: 3,
                    path: "/pages/watch?ref=5330G-001",
                  },
                  {
                    id: 3,
                    show: !1,
                    source: "pic",
                    pic: "https://cdn.impdigital.cn/pp/pp-banner-20221109.jpg",
                    url: "https://cdn.impdigital.cn/pp/pp-banner-20221109.jpg",
                    title: "",
                    title_sub: "",
                    btn: "查看",
                    type: 2,
                    path: "https://www.patek.com/chs/%E7%99%BE%E8%BE%BE%E7%BF%A1%E4%B8%BD/%E5%93%B2%E5%AD%A6/%E7%BE%A4%E6%98%9F%E9%97%AA%E8%80%80",
                  },
                ],
              };
            },
            methods: {
              toNewsAll: function () {
                this.$tracking("common_event_click", {
                  event_name: "TAB1首页内容页面",
                  event_category: "所有资讯btn",
                  event_value: "所有资讯btn",
                }),
                  this.$router.push(
                    "web?url=" +
                      encodeURIComponent(
                        "https://www.patek.com/chs/%E7%99%BE%E8%BE%BE%E7%BF%A1%E4%B8%BD/%E6%96%B0%E9%97%BB"
                      )
                  );
              },
              toNews: function () {
                this.$tracking("common_event_click", {
                  event_name: "TAB1首页内容页面",
                  event_category: "最新资讯",
                  event_value: "最新资讯",
                }),
                  this.$router.push(
                    "web?url=" +
                      encodeURIComponent(
                        "https://www.patek.com/chs/%E7%99%BE%E8%BE%BE%E7%BF%A1%E4%B8%BD/%E6%96%B0%E9%97%BB/four-new-rare-handcrafts-minute-repeaters"
                      )
                  );
              },
              toCollectionAll: function () {
                this.$tracking("common_event_click", {
                  event_name: "TAB1首页内容页面",
                  event_category: "所有时计系列btn",
                  event_value: "所有时计系列btn",
                }),
                  this.$router.push("watchList");
              },
              toCollection: function (t) {
                this.$tracking("common_event_click", {
                  event_name: "TAB1首页内容页面",
                  event_category: "时计系列",
                  event_value: t,
                }),
                  this.$router.push(
                    "watchList?collection=" + encodeURIComponent(t)
                  );
              },
              exploreMore: function () {
                this.$tracking("common_event_click", {
                  event_name: "TAB1首页内容页面",
                  event_category: "探索更多新款btn",
                  event_value: "探索更多新款btn",
                }),
                  this.$router.push("topic");
              },
              toProductInner: function (t) {
                this.$tracking("common_event_click", {
                  event_name: "TAB1首页内容页面",
                  event_category: "百达翡丽新款",
                  event_value: "百达翡丽新款",
                }),
                  this.$router.push(
                    "watch?ref=" + encodeURIComponent(t.articleRef)
                  );
              },
              toSearch: function () {
                this.$tracking("common_event_click", {
                  event_name: "TAB1首页内容页面",
                  event_category: "搜索框",
                  event_value: "搜索框",
                }),
                  this.$router.push("all");
              },
              likeThis: function (t) {
                var e = this.wishList.indexOf(t.articleRef);
                t.liked
                  ? (e >= 0 && this.$store.commit("UPDATE_WISH_LIST_REMOVE", e),
                    (t.liked = !1))
                  : (e < 0 &&
                      this.$store.commit("UPDATE_WISH_LIST_PUSH", t.articleRef),
                    (t.liked = !0)),
                  this.$http.addFavorite(
                    { watch_ref: t.articleRef, status: t.liked ? 1 : 0 },
                    function () {}
                  );
              },
              chooseTab: function (t) {
                this.tab = t;
              },
              changeProductSwiper: function (t) {
                var e = t.mp.detail.current;
                this.$store.commit("UPDATE_CURRENT_NEW", e);
              },
              toMan: function () {
                this.$tracking("common_event_click", {
                  event_name: "TAB1首页内容页面",
                  event_category: "男士腕表",
                  event_value: "男士腕表",
                }),
                  this.$store.commit("UPDATE_CHOOSED_FILTER", {
                    gender: ["男士腕表"],
                  }),
                  this.$router.push("filterResult");
              },
              toWoman: function () {
                this.$tracking("common_event_click", {
                  event_name: "TAB1首页内容页面",
                  event_category: "女士腕表",
                  event_value: "女士腕表",
                }),
                  this.$store.commit("UPDATE_CHOOSED_FILTER", {
                    gender: ["女士腕表"],
                  }),
                  this.$router.push("filterResult");
              },
              toAll: function () {
                this.$tracking("common_event_click", {
                  event_name: "TAB1首页内容页面",
                  event_category: "所有表款",
                  event_value: "所有表款",
                }),
                  this.$router.push("watchList");
              },
              scrollPage: function (e) {
                var n = e.mp.detail.scrollTop,
                  o = n >= 300 * this.$rpx;
                o && !this.showNav
                  ? t.setNavigationBarColor({
                      frontColor: "#ffffff",
                      backgroundColor: "#ffffff",
                      animation: { duration: 400, timingFunc: "easeInOut" },
                    })
                  : !o &&
                    this.showNav &&
                    t.setNavigationBarColor({
                      frontColor: "#000000",
                      backgroundColor: "#ffffff",
                      animation: { duration: 400, timingFunc: "easeInOut" },
                    }),
                  (this.showNav = o),
                  this.$emit("change", o);
              },
              jumpBanner: function (e, n) {
                if (
                  (this.$tracking("common_event_click", {
                    event_name: "TAB1首页内容页面",
                    event_category: "产品视频",
                    event_value: "产品视频" + (n + 1),
                  }),
                  1 === e.type)
                )
                  this.$router.push("article?id=".concat(e.path));
                else if (2 === e.type)
                  this.$router.push(
                    "web?url=".concat(encodeURIComponent(e.path))
                  );
                else if (3 === e.type) this.$router.push(e.path);
                else if (4 === e.type) this.$alert(e.path);
                else if (5 === e.type) {
                  var o = e.path.split(";");
                  t.navigateToMiniProgram({ appId: o[0], path: o[1] });
                }
              },
              jumpBoutique: function () {
                this.$tracking("common_event_click", {
                  event_name: "TAB1首页内容页面",
                  event_category: "跳转服务中心小程序：百达翡丽尊享服务",
                  event_value: "跳转服务中心小程序：百达翡丽尊享服务",
                }),
                  t.navigateToMiniProgram({
                    appId: "wxcaca8dba9ed0d22a",
                    path: "/pages/index",
                  });
              },
              changeSwiper: function (t) {
                var e = t.mp.detail.current;
                (this.nowBanner = e),
                  (this["video" + e] = !0),
                  u[c].pause(),
                  u[e].play(),
                  (c = e);
              },
            },
            mounted: function () {
              var t = this;
              this.$store.commit("UPDATE_CURRENT_NEW", -1),
                (this.nowBanner = 0),
                setTimeout(function () {
                  t.newWatch &&
                    t.$store.commit(
                      "UPDATE_CURRENT_NEW",
                      (function (t, e) {
                        return Math.floor(Math.random() * (e - t + 1) + t);
                      })(0, t.newWatch.length - 1)
                    );
                }, 20);
            },
            onReady: function () {
              for (var e = 0; e < this.banner.length; e++)
                u.push(t.createVideoContext("video" + e));
              u[0].play(),
                setTimeout(function () {
                  (u[0] = t.createVideoContext("video0")), u[0].play();
                }, 100),
                (c = 0);
            },
          };
        e.default = s;
      }).call(this, n("3223")["default"]);
    },
    ecb4: function (t, e, n) {
      "use strict";
      n.r(e);
      var o = n("9eb8"),
        i = n.n(o);
      for (var r in o)
        ["default"].indexOf(r) < 0 &&
          (function (t) {
            n.d(e, t, function () {
              return o[t];
            });
          })(r);
      e["default"] = i.a;
    },
  },
]);
(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
  "components/pp/Index-create-component",
  {
    "components/pp/Index-create-component": function (
      module,
      exports,
      __webpack_require__
    ) {
      __webpack_require__("df3c")["createComponent"](
        __webpack_require__("25e2")
      );
    },
  },
  [["components/pp/Index-create-component"]],
]);
