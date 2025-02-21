(global.webpackJsonp = global.webpackJsonp || []).push([
  ["pages/tabbar/home/index"],
  {
    "0786": function (e, t, n) {
      n.d(t, "b", function () {
        return o;
      }),
        n.d(t, "c", function () {
          return i;
        }),
        n.d(t, "a", function () {
          return r;
        });
      var r = {
          uNavbar: function () {
            return n
              .e("node-modules/uview-ui/components/u-navbar/u-navbar")
              .then(n.bind(null, "d6b0"));
          },
          uImage: function () {
            return n
              .e("node-modules/uview-ui/components/u-image/u-image")
              .then(n.bind(null, "7dc8"));
          },
          uDivider: function () {
            return n
              .e("node-modules/uview-ui/components/u-divider/u-divider")
              .then(n.bind(null, "6837"));
          },
          uLoading: function () {
            return n
              .e("node-modules/uview-ui/components/u-loading/u-loading")
              .then(n.bind(null, "324c"));
          },
          uEmpty: function () {
            return n
              .e("node-modules/uview-ui/components/u-empty/u-empty")
              .then(n.bind(null, "113b"));
          },
          uMask: function () {
            return n
              .e("node-modules/uview-ui/components/u-mask/u-mask")
              .then(n.bind(null, "f813"));
          },
        },
        o = function () {
          var e = this,
            t =
              (e.$createElement,
              e._self._c,
              e.__map(e.top_list, function (t, n) {
                return { $orig: e.__get_orig(t), m0: e.gSrc(t.avatar) };
              })),
            n =
              ((0 === e.current && 0 === e.rlist.length) ||
                (1 === e.current && 0 === e.nlist.length && e.isAuth)) &&
              !e.loading;
          e._isMounted ||
            (e.e0 = function (t) {
              e.showGift = !1;
            }),
            (e.$mp.data = Object.assign({}, { $root: { l0: t, g0: n } }));
        },
        i = [];
    },
    2024: function (e, t, n) {
      var r = n("dd94");
      n.n(r).a;
    },
    "40f3": function (e, t, n) {
      n.r(t);
      var r = n("9878"),
        o = n.n(r);
      for (var i in r)
        ["default"].indexOf(i) < 0 &&
          (function (e) {
            n.d(t, e, function () {
              return r[e];
            });
          })(i);
      t.default = o.a;
    },
    "5f3d": function (e, t, n) {
      (function (e, t) {
        var r = n("4ea4");
        n("35e6"), r(n("66fd"));
        var o = r(n("d14e"));
        (e.__webpack_require_UNI_MP_PLUGIN__ = n), t(o.default);
      }).call(this, n("bc2e").default, n("543d").createPage);
    },
    "8d07": function (e, t, n) {
      var r = n("b4aa");
      n.n(r).a;
    },
    9878: function (e, t, n) {
      (function (e, r) {
        var o = n("4ea4");
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.default = void 0);
        var i = o(n("2eee")),
          u = o(n("c973")),
          a = o(n("9523")),
          s = n("df69"),
          c = n("426c"),
          f = n("26cb"),
          d = n("c9b4");
        function l(e, t) {
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
        function h(e) {
          for (var t = 1; t < arguments.length; t++) {
            var n = null != arguments[t] ? arguments[t] : {};
            t % 2
              ? l(Object(n), !0).forEach(function (t) {
                  (0, a.default)(e, t, n[t]);
                })
              : Object.getOwnPropertyDescriptors
              ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
              : l(Object(n)).forEach(function (t) {
                  Object.defineProperty(
                    e,
                    t,
                    Object.getOwnPropertyDescriptor(n, t)
                  );
                });
          }
          return e;
        }
        var p = {
          data: function () {
            return {
              loading: !0,
              gifts: [],
              showGift: !1,
              background: {
                background:
                  "url('http://image.fanglinxq.com/assets/home-bg.png') no-repeat",
                backgroundSize: "100% auto",
              },
              top_list: [],
              nlist: [],
              rlist: [],
              isAuth: !1,
              current: 0,
              isShow: !1,
              isSticky: !1,
              isPerfect: !1,
              recommendQuery: { page: 1, sex: "", size: 15 },
              nearQuery: {
                page: 1,
                size: 15,
                sex: "",
                latitude: "",
                longitude: "",
              },
            };
          },
          components: {
            HelloPopup: function () {
              n.e("pages/tabbar/home/components/HelloPopup")
                .then(
                  function () {
                    return resolve(n("2c5f"));
                  }.bind(null, n)
                )
                .catch(n.oe);
            },
            User: function () {
              n.e("pages/tabbar/home/components/User")
                .then(
                  function () {
                    return resolve(n("8036"));
                  }.bind(null, n)
                )
                .catch(n.oe);
            },
          },
          onLoad: function (t) {
            var n = decodeURIComponent(t.scene),
              r = "undefined" !== n ? n.split("&")[0] : null,
              o = this.userInfo,
              i = o.id,
              u = o.sex,
              a = o.vipLevel,
              s = o.avatar;
            if (null != i) {
              if (!s)
                return void e.redirectTo({ url: "/pages/user/perfect/index" });
              if (
                (this.$store.dispatch("fetchInfo"),
                (this.recommendQuery = h(
                  h({}, this.recommendQuery),
                  {},
                  { sex: 2 === u ? 1 : 2 }
                )),
                (this.nearQuery = h(
                  h({}, this.nearQuery),
                  {},
                  { sex: 2 === u ? 1 : 2 }
                )),
                this.fetchRecommend(),
                this.lastCommand(),
                this.checkLoactionAuth(),
                a > -1)
              ) {
                this.isShow = !e.getStorageSync("sayHello");
                var c = this.userInfo,
                  f = c.imUserId,
                  d = c.imUserSig;
                f &&
                  d &&
                  e.$TUIKit
                    .login({ userID: f, userSig: d })
                    .then(function (e) {
                      console.log(e.data),
                        !0 === e.data.repeatLogin &&
                          console.log(e.data.errorInfo);
                    })
                    .catch(function (e) {
                      console.warn("login error:", e);
                    });
              }
            } else
              e.redirectTo({
                url: "/pages/login/index?uid=".concat(r || t.uid),
              });
          },
          onTabItemTap: function (e) {
            this.pageUpdate();
          },
          computed: h(
            h(
              {},
              (0, f.mapState)({
                userInfo: function (e) {
                  return e.user.userInfo;
                },
                isSearch: function (e) {
                  return e.user.isSearch;
                },
              })
            ),
            {},
            {
              offsetTop: function () {
                return 2 * (r.getSystemInfoSync().statusBarHeight + 44);
              },
            }
          ),
          onShow: function () {
            this.isSearch &&
              ((this.current = 0),
              (this.recommendQuery = e.getStorageSync("recommendQuery")),
              (this.recommendQuery.page = 1),
              this.fetchRecommend(),
              this.$store.commit("setSearch", !1),
              e.pageScrollTo({ scrollTop: 0, duration: 300 }));
            var t = this.userInfo;
            (t.sex, t.vipLevel) > -1 &&
              (this.$store.dispatch("fetchPermission"),
              this.getRedPointData(),
              this.fetchGift());
          },
          methods: {
            gSrc: function (e) {
              return (0, d.filterUrl)(e, 95, 95);
            },
            exchangeReward: function () {
              var t = this;
              return (0, u.default)(
                i.default.mark(function n() {
                  return i.default.wrap(function (n) {
                    for (;;)
                      switch ((n.prev = n.next)) {
                        case 0:
                          return (
                            (n.next = 2),
                            (0, s.exchangeReward)({ rewardId: t.gifts[0].id })
                          );
                        case 2:
                          (t.showGift = !1),
                            e.showToast({ icon: "none", title: "领取成功" }),
                            t.fetchGift();
                        case 5:
                        case "end":
                          return n.stop();
                      }
                  }, n);
                })
              )();
            },
            fetchGift: function () {
              var e = this;
              return (0, u.default)(
                i.default.mark(function t() {
                  var n;
                  return i.default.wrap(function (t) {
                    for (;;)
                      switch ((t.prev = t.next)) {
                        case 0:
                          return (t.next = 2), (0, s.myReward)();
                        case 2:
                          (n = t.sent),
                            (e.gifts = n),
                            n.length > 0 && (e.showGift = !0);
                        case 5:
                        case "end":
                          return t.stop();
                      }
                  }, t);
                })
              )();
            },
            handleUp: function () {
              1 === this.userInfo.sex
                ? this.handleNavigater("/pages/user/memberCenter/index")
                : this.handleNavigater("/pages/subPages/goddessAuth/index");
            },
            checkLoactionAuth: function () {
              var t = this;
              e.getSetting({
                success: function (e) {
                  e.authSetting["scope.userLocation"]
                    ? ((t.isAuth = !0), t.getLatLng())
                    : (t.isAuth = !1);
                },
              });
            },
            lastCommand: function () {
              var e = this;
              return (0, u.default)(
                i.default.mark(function t() {
                  var n;
                  return i.default.wrap(function (t) {
                    for (;;)
                      switch ((t.prev = t.next)) {
                        case 0:
                          return (t.next = 2), (0, s.lastRecharge)();
                        case 2:
                          (n = t.sent), (e.top_list = n);
                        case 4:
                        case "end":
                          return t.stop();
                      }
                  }, t);
                })
              )();
            },
            fetchNearList: function () {
              var t = arguments,
                n = this;
              return (0, u.default)(
                i.default.mark(function r() {
                  var o, u;
                  return i.default.wrap(function (r) {
                    for (;;)
                      switch ((r.prev = r.next)) {
                        case 0:
                          return (
                            (o = t.length > 0 && void 0 !== t[0] ? t[0] : ""),
                            (n.loading = !0),
                            (r.next = 4),
                            (0, s.near_recommend)(n.nearQuery)
                          );
                        case 4:
                          (u = r.sent),
                            (n.nlist =
                              "loadmore" === o ? n.nlist.concat(u) : u),
                            (n.loading = !1),
                            e.stopPullDownRefresh();
                        case 8:
                        case "end":
                          return r.stop();
                      }
                  }, r);
                })
              )();
            },
            fetchRecommend: function () {
              var t = arguments,
                n = this;
              return (0, u.default)(
                i.default.mark(function r() {
                  var o, u;
                  return i.default.wrap(function (r) {
                    for (;;)
                      switch ((r.prev = r.next)) {
                        case 0:
                          return (
                            (o = t.length > 0 && void 0 !== t[0] ? t[0] : ""),
                            (n.loading = !0),
                            (r.next = 4),
                            (0, s.home_recommend)(n.recommendQuery)
                          );
                        case 4:
                          (u = r.sent),
                            (n.rlist =
                              "loadmore" === o ? n.rlist.concat(u) : u),
                            (n.loading = !1),
                            e.stopPullDownRefresh();
                        case 8:
                        case "end":
                          return r.stop();
                      }
                  }, r);
                })
              )();
            },
            setVisble: function (e) {
              this.isShow = e;
            },
            reOpen: function () {
              var t = this;
              e.openSetting({
                success: function (e) {
                  e.authSetting["scope.userLocation"] &&
                    ((t.isAuth = !0), t.getLatLng());
                },
              });
            },
            checkAuth: function () {
              var t = this;
              e.authorize({
                scope: "scope.userLocation",
                success: function () {
                  (t.isAuth = !0), (t.current = 1), t.getLatLng();
                },
                fail: function () {
                  console.log("拒绝"), (t.current = 1), (t.isAuth = !1);
                },
              });
            },
            checkTab: function (e) {
              if (1 === e) {
                if (!this.isAuth) return void this.checkAuth();
                this.getLatLng();
              }
              this.current = e;
            },
            getLatLng: function () {
              var t = this;
              e.getLocation({
                type: "wgs84",
                success: function (e) {
                  var n = e.latitude,
                    r = e.longitude;
                  (t.nearQuery = h(
                    h({}, t.nearQuery),
                    {},
                    { latitude: n, longitude: r, page: 1 }
                  )),
                    t.fetchNearList();
                  var o = { latitude: n, longitude: r };
                  (0, c.updateUser)(o);
                },
                complete: function (e) {
                  console.log(e);
                },
              });
            },
            pageUpdate: function () {
              0 === this.current
                ? ((this.recommendQuery = {
                    page: 1,
                    sex: 2 === this.userInfo.sex ? 1 : 2,
                    size: 15,
                  }),
                  this.fetchRecommend("refresh"))
                : ((this.nearQuery.page = 1), this.fetchNearList("refresh")),
                this.lastCommand();
            },
          },
          onPullDownRefresh: function () {
            this.pageUpdate();
          },
          onReachBottom: function () {
            0 === this.current
              ? (this.recommendQuery.page++, this.fetchRecommend("loadmore"))
              : (this.nearQuery.page++, this.fetchNearList("loadmore"));
          },
        };
        t.default = p;
      }).call(this, n("543d").default, n("bc2e").default);
    },
    b4aa: function (e, t, n) {},
    d14e: function (e, t, n) {
      n.r(t);
      var r = n("0786"),
        o = n("40f3");
      for (var i in o)
        ["default"].indexOf(i) < 0 &&
          (function (e) {
            n.d(t, e, function () {
              return o[e];
            });
          })(i);
      n("8d07"), n("2024");
      var u = n("f0c5"),
        a = Object(u.a)(
          o.default,
          r.b,
          r.c,
          !1,
          null,
          null,
          null,
          !1,
          r.a,
          void 0
        );
      t.default = a.exports;
    },
    dd94: function (e, t, n) {},
  },
  [["5f3d", "common/runtime", "common/vendor"]],
]);
