(global.webpackJsonp = global.webpackJsonp || []).push([
  ["pages/tabbar/mine/index"],
  {
    "3f00": function (e, t, n) {
      var u = n("a980");
      n.n(u).a;
    },
    "488e": function (e, t, n) {
      n.r(t);
      var u = n("eeeb"),
        r = n.n(u);
      for (var i in u)
        ["default"].indexOf(i) < 0 &&
          (function (e) {
            n.d(t, e, function () {
              return u[e];
            });
          })(i);
      t.default = r.a;
    },
    "579d": function (e, t, n) {
      n.r(t);
      var u = n("a16f"),
        r = n("488e");
      for (var i in r)
        ["default"].indexOf(i) < 0 &&
          (function (e) {
            n.d(t, e, function () {
              return r[e];
            });
          })(i);
      n("3f00"), n("88fe");
      var o = n("f0c5"),
        a = Object(o.a)(
          r.default,
          u.b,
          u.c,
          !1,
          null,
          "1a51d11f",
          null,
          !1,
          u.a,
          void 0
        );
      t.default = a.exports;
    },
    "86f6": function (e, t, n) {
      (function (e, t) {
        var u = n("4ea4");
        n("35e6"), u(n("66fd"));
        var r = u(n("579d"));
        (e.__webpack_require_UNI_MP_PLUGIN__ = n), t(r.default);
      }).call(this, n("bc2e").default, n("543d").createPage);
    },
    "88fe": function (e, t, n) {
      var u = n("8fed");
      n.n(u).a;
    },
    "8fed": function (e, t, n) {},
    a16f: function (e, t, n) {
      n.d(t, "b", function () {
        return r;
      }),
        n.d(t, "c", function () {
          return i;
        }),
        n.d(t, "a", function () {
          return u;
        });
      var u = {
          uNavbar: function () {
            return n
              .e("node-modules/uview-ui/components/u-navbar/u-navbar")
              .then(n.bind(null, "d6b0"));
          },
          uIcon: function () {
            return n
              .e("node-modules/uview-ui/components/u-icon/u-icon")
              .then(n.bind(null, "b13c"));
          },
          uGap: function () {
            return n
              .e("node-modules/uview-ui/components/u-gap/u-gap")
              .then(n.bind(null, "2f7b"));
          },
          uBadge: function () {
            return n
              .e("node-modules/uview-ui/components/u-badge/u-badge")
              .then(n.bind(null, "38dd"));
          },
          uButton: function () {
            return n
              .e("node-modules/uview-ui/components/u-button/u-button")
              .then(n.bind(null, "6009"));
          },
          uCellGroup: function () {
            return n
              .e("node-modules/uview-ui/components/u-cell-group/u-cell-group")
              .then(n.bind(null, "6458"));
          },
          uCellItem: function () {
            return n
              .e("node-modules/uview-ui/components/u-cell-item/u-cell-item")
              .then(n.bind(null, "e9d8"));
          },
        },
        r = function () {
          var e = this,
            t =
              (e.$createElement,
              e._self._c,
              e.userInfo && -1 === e.userInfo.vipLevel
                ? null
                : e.photoList.length),
            n = e.photoList.length,
            u = e.share_info.userList.slice(0, 5),
            r = 1 === e.detail.sex ? e._f("vipFomat")(e.detail.vipLevel) : null;
          e._isMounted ||
            (e.e0 = function (t) {
              e.isShowCode = !0;
            }),
            (e.$mp.data = Object.assign(
              {},
              { $root: { g0: t, g1: n, l0: u, f0: r } }
            ));
        },
        i = [];
    },
    a980: function (e, t, n) {},
    eeeb: function (e, t, n) {
      (function (e) {
        var u = n("4ea4");
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.default = void 0);
        var r = u(n("2eee")),
          i = u(n("448a")),
          o = u(n("c973")),
          a = u(n("9523")),
          c = n("426c"),
          s = n("c9b4"),
          f = n("26cb"),
          l = n("df69");
        function d(e, t) {
          var n = Object.keys(e);
          if (Object.getOwnPropertySymbols) {
            var u = Object.getOwnPropertySymbols(e);
            t &&
              (u = u.filter(function (t) {
                return Object.getOwnPropertyDescriptor(e, t).enumerable;
              })),
              n.push.apply(n, u);
          }
          return n;
        }
        var p = {
          data: function () {
            return {
              isShowCode: !1,
              ewmImg: "",
              photoList: [],
              kiss: [],
              current: 0,
              amount: { availableCoin: 0 },
              default_icon: [],
              detail: {},
              share_info: { userList: [] },
              customStyle: {
                height: "68rpx",
                fontSize: "30rpx",
                "line-height": "68rpx",
                display: "flex",
                "align-items": "center",
                margin: "0 0 0 32rpx",
                color: "#fff",
                "backdrop-filter": "blur(20px)",
                background: "linear-gradient(90deg, #5983FF, #A836FF)",
              },
              unreadFans: 0,
              unreadpers: 0,
              unreadWechat: 0,
              unreadprofits: 0,
            };
          },
          computed: (function (e) {
            for (var t = 1; t < arguments.length; t++) {
              var n = null != arguments[t] ? arguments[t] : {};
              t % 2
                ? d(Object(n), !0).forEach(function (t) {
                    (0, a.default)(e, t, n[t]);
                  })
                : Object.getOwnPropertyDescriptors
                ? Object.defineProperties(
                    e,
                    Object.getOwnPropertyDescriptors(n)
                  )
                : d(Object(n)).forEach(function (t) {
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
            (0, f.mapState)({
              userInfo: function (e) {
                return e.user.userInfo;
              },
              systemInfo: function (e) {
                return e.global.systemInfo;
              },
            })
          ),
          watch: {
            userInfo: {
              handler: function (e) {
                if (e && Object.keys(e).length > 0) {
                  var t = Object.assign({}, e);
                  (this.photoList =
                    t.defaultAlbumList && t.defaultAlbumList.length > 0
                      ? t.defaultAlbumList[0].pictures &&
                        t.defaultAlbumList[0].pictures.split(";")
                      : []),
                    (this.detail = t);
                }
              },
              deep: !0,
              immediate: !0,
            },
          },
          filters: {
            vipFomat: function (e) {
              switch (e) {
                case 7:
                  return "尊贵王爵";
                case 5:
                  return "尊贵伯爵";
                case 4:
                  return "荣耀贵族";
                case 3:
                  return "荣耀骑士";
                default:
                  return "普通用户";
              }
            },
          },
          onShow: function () {
            var e = this;
            return (0, o.default)(
              r.default.mark(function t() {
                return r.default.wrap(function (t) {
                  for (;;)
                    switch ((t.prev = t.next)) {
                      case 0:
                        e.$store.dispatch("fetchInfo"),
                          e.$store.dispatch("fetchPermission"),
                          e.userInfo &&
                            -1 !== e.userInfo.vipLevel &&
                            ((0, c.wallets)().then(function (t) {
                              (e.amount = t),
                                (e.unreadprofits =
                                  t.recommendCoin +
                                  t.receiveGiftCoin +
                                  t.profitCoin);
                            }),
                            (0, c.invitedDetail)().then(function (t) {
                              e.share_info = t;
                              var n = t.userList;
                              if (n && n.length > 4) e.default_icon = [];
                              else if (n.length > 0 && n.length < 5) {
                                for (var u = [], r = 0; r < 5 - n.length; r++)
                                  u.push(r);
                                e.default_icon = u;
                              } else e.default_icon = [1, 2, 3, 4, 5];
                            }),
                            e.getkiss(),
                            e.getNumData());
                      case 3:
                      case "end":
                        return t.stop();
                    }
                }, t);
              })
            )();
          },
          onLoad: function () {},
          methods: {
            getNumData: function () {
              var e = this;
              (0, l.userRedPointData)().then(function (t) {
                var n = t.unread;
                if (n) {
                  var u = n.find(function (e) {
                      return 6 == e.type;
                    }),
                    r =
                      (n.find(function (e) {
                        return 5 == e.type;
                      }),
                      n.find(function (e) {
                        return 52 == e.type;
                      })),
                    i = n.find(function (e) {
                      return 53 == e.type;
                    });
                  (e.unreadFans = Number(u ? u.unreadNum : 0)),
                    (e.unreadWechat = Number(i ? i.unreadNum : 0)),
                    (e.unreadpers = Number(r ? r.unreadNum : 0));
                }
              });
            },
            handleDel: function (t) {
              var n = this;
              e.showModal({
                title: "提示",
                content: "确认删除当前照片？",
                confirmColor: "#631EFB",
                success: function (e) {
                  if (e.confirm) {
                    n.photoList.splice(t, 1);
                    var u = {
                      id: n.detail.defaultAlbumList[0].id,
                      pictures: (0, i.default)(n.photoList).join(";"),
                    };
                    (0, c.updatePhotos)(u).then(function () {
                      (n.current = 0), n.$store.dispatch("fetchInfo");
                    });
                  }
                },
              });
            },
            toLogin: function () {
              e.removeStorageSync("userInfo"),
                e.redirectTo({ url: "/pages/login/index" });
            },
            preImg: function () {
              e.previewImage({
                current: this.current,
                urls:
                  this.photoList && this.photoList.length > 0
                    ? this.photoList
                    : [detail.avatar],
              });
            },
            getkiss: function () {
              var e = this;
              (0, c.kissList)({ page: 1, size: 5 }).then(function (t) {
                e.kiss = t;
              });
            },
            check: function (e) {
              this.current = e;
            },
            addPic: function () {
              var e = this;
              return (0, o.default)(
                r.default.mark(function t() {
                  var n, u, o;
                  return r.default.wrap(function (t) {
                    for (;;)
                      switch ((t.prev = t.next)) {
                        case 0:
                          return (t.next = 2), (0, s.upLoadImg)(4);
                        case 2:
                          return (
                            (n = t.sent),
                            (u = e.detail.defaultAlbumList[0].pictures
                              ? e.detail.defaultAlbumList[0].pictures.split(";")
                              : []),
                            (o = {
                              id: e.detail.defaultAlbumList[0].id,
                              pictures: []
                                .concat((0, i.default)(u), (0, i.default)(n))
                                .join(";"),
                            }),
                            (t.next = 7),
                            (0, c.updatePhotos)(o)
                          );
                        case 7:
                          (e.current = 0), e.$store.dispatch("fetchInfo");
                        case 9:
                        case "end":
                          return t.stop();
                      }
                  }, t);
                })
              )();
            },
            onUpload: function () {
              var t = this;
              return (0, o.default)(
                r.default.mark(function n() {
                  var u, i;
                  return r.default.wrap(function (n) {
                    for (;;)
                      switch ((n.prev = n.next)) {
                        case 0:
                          return (n.next = 2), (0, s.upLoadImg)(1);
                        case 2:
                          return (
                            (u = n.sent),
                            (i = { avatar: u[0] }),
                            (n.next = 6),
                            (0, c.updateUser)(i)
                          );
                        case 6:
                          e.showToast({ icon: "none", title: "更换成功" }),
                            t.$store.dispatch("fetchInfo");
                        case 8:
                        case "end":
                          return n.stop();
                      }
                  }, n);
                })
              )();
            },
            copy: function (t) {
              e.setClipboardData({
                data: t.toString(),
                success: function (t) {
                  e.showToast({ icon: "none", title: "复制成功" });
                },
              });
            },
          },
        };
        t.default = p;
      }).call(this, n("543d").default);
    },
  },
  [["86f6", "common/runtime", "common/vendor"]],
]);
