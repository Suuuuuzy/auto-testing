require("../../../@babel/runtime/helpers/Arrayincludes"),
  (global.webpackJsonp = global.webpackJsonp || []).push([
    ["pages/tabbar/message/index"],
    {
      "1a0f": function (e, n, t) {
        t.r(n);
        var r = t("e067"),
          o = t.n(r);
        for (var i in r)
          ["default"].indexOf(i) < 0 &&
            (function (e) {
              t.d(n, e, function () {
                return r[e];
              });
            })(i);
        n.default = o.a;
      },
      4412: function (e, n, t) {
        t.d(n, "b", function () {
          return o;
        }),
          t.d(n, "c", function () {
            return i;
          }),
          t.d(n, "a", function () {
            return r;
          });
        var r = {
            uNavbar: function () {
              return t
                .e("node-modules/uview-ui/components/u-navbar/u-navbar")
                .then(t.bind(null, "d6b0"));
            },
            uNoticeBar: function () {
              return t
                .e("node-modules/uview-ui/components/u-notice-bar/u-notice-bar")
                .then(t.bind(null, "85fc"));
            },
            uBadge: function () {
              return t
                .e("node-modules/uview-ui/components/u-badge/u-badge")
                .then(t.bind(null, "38dd"));
            },
            uButton: function () {
              return t
                .e("node-modules/uview-ui/components/u-button/u-button")
                .then(t.bind(null, "6009"));
            },
            uSwipeAction: function () {
              return t
                .e(
                  "node-modules/uview-ui/components/u-swipe-action/u-swipe-action"
                )
                .then(t.bind(null, "602e"));
            },
          },
          o = function () {
            this.$createElement;
            this._self._c;
          },
          i = [];
      },
      4638: function (e, n, t) {},
      "68d2": function (e, n, t) {
        t.r(n);
        var r = t("4412"),
          o = t("1a0f");
        for (var i in o)
          ["default"].indexOf(i) < 0 &&
            (function (e) {
              t.d(n, e, function () {
                return o[e];
              });
            })(i);
        t("72cd");
        var a = t("f0c5"),
          u = Object(a.a)(
            o.default,
            r.b,
            r.c,
            !1,
            null,
            "29735803",
            null,
            !1,
            r.a,
            void 0
          );
        n.default = u.exports;
      },
      "72cd": function (e, n, t) {
        var r = t("4638");
        t.n(r).a;
      },
      de31: function (e, n, t) {
        (function (e, n) {
          var r = t("4ea4");
          t("35e6"), r(t("66fd"));
          var o = r(t("68d2"));
          (e.__webpack_require_UNI_MP_PLUGIN__ = t), n(o.default);
        }).call(this, t("bc2e").default, t("543d").createPage);
      },
      e067: function (e, n, t) {
        (function (e) {
          var r = t("4ea4");
          Object.defineProperty(n, "__esModule", { value: !0 }),
            (n.default = void 0);
          var o = r(t("2eee")),
            i = r(t("c973")),
            a = r(t("9523")),
            u = r(t("3e96")),
            s = t("426c"),
            c = t("df69"),
            f = t("ba5d");
          function d(e, n) {
            var t = Object.keys(e);
            if (Object.getOwnPropertySymbols) {
              var r = Object.getOwnPropertySymbols(e);
              n &&
                (r = r.filter(function (n) {
                  return Object.getOwnPropertyDescriptor(e, n).enumerable;
                })),
                t.push.apply(t, r);
            }
            return t;
          }
          function l(e) {
            for (var n = 1; n < arguments.length; n++) {
              var t = null != arguments[n] ? arguments[n] : {};
              n % 2
                ? d(Object(t), !0).forEach(function (n) {
                    (0, a.default)(e, n, t[n]);
                  })
                : Object.getOwnPropertyDescriptors
                ? Object.defineProperties(
                    e,
                    Object.getOwnPropertyDescriptors(t)
                  )
                : d(Object(t)).forEach(function (n) {
                    Object.defineProperty(
                      e,
                      n,
                      Object.getOwnPropertyDescriptor(t, n)
                    );
                  });
            }
            return e;
          }
          var p = {
            data: function () {
              return {
                isShowCode: !1,
                options: [
                  {
                    text: "删除",
                    style: { backgroundColor: "#dd524d", color: "#fff" },
                  },
                ],
                customStyle: {
                  height: "88rpx",
                  fontSize: "32rpx",
                  "line-height": "88rpx",
                  borderRadius: "88rpx",
                  display: "flex",
                  "align-items": "center",
                  margin: "200rpx 32rpx 0 32rpx",
                  color: "#fff",
                  "backdrop-filter": "blur(20px)",
                  background: "linear-gradient(90deg, #5983FF, #A836FF)",
                },
                background: {
                  background:
                    "url('http://image.fanglinxq.com/assets/home-bg.png') no-repeat",
                  backgroundSize: "100% auto",
                },
                tips: null,
                showTip: !1,
                notices: null,
                conversationList: [],
              };
            },
            components: {
              TUIConversationItem: function () {
                Promise.all([
                  t.e("common/vendor"),
                  t.e(
                    "pages/tabbar/message/components/tui-conversation/conversation-item/index"
                  ),
                ])
                  .then(
                    function () {
                      return resolve(t("8b3b"));
                    }.bind(null, t)
                  )
                  .catch(t.oe);
              },
            },
            computed: l(
              l(
                {},
                (0, t("26cb").mapState)({
                  userInfo: function (e) {
                    return e.user.userInfo;
                  },
                  userPermission: function (e) {
                    return e.user.userPermission;
                  },
                })
              ),
              {},
              {
                inviteNum: function () {
                  if (this.notices) {
                    var e = this.notices.unread.find(function (e) {
                      return 10 == e.type;
                    });
                    return (e && e.unreadNum) || 0;
                  }
                  return 0;
                },
                sysInfo: function () {
                  if (this.notices) {
                    var e = this.notices.unread.find(function (e) {
                      return 1 == e.type;
                    });
                    return (e && e.unreadNum) || 0;
                  }
                  return 0;
                },
                profit: function () {
                  if (this.notices) {
                    var e = this.notices.unread.find(function (e) {
                      return 5 == e.type;
                    });
                    return (e && e.unreadNum) || 0;
                  }
                  return 0;
                },
                recommandCount: function () {
                  if (this.notices) {
                    var e = 1 === this.userInfo.sex ? 3 : 100,
                      n = this.notices.unread.find(function (n) {
                        return n.type == e;
                      });
                    return (n && n.unreadNum) || 0;
                  }
                  return 0;
                },
              }
            ),
            onShow: function () {
              var e = this;
              return (0, i.default)(
                o.default.mark(function n() {
                  var t;
                  return o.default.wrap(function (n) {
                    for (;;)
                      switch ((n.prev = n.next)) {
                        case 0:
                          (t = e.userInfo).sex,
                            -1 !== t.vipLevel &&
                              (e.$store.dispatch("fetchPermission"),
                              e.getRedPointData(),
                              e.fetchMsg());
                        case 2:
                        case "end":
                          return n.stop();
                      }
                  }, n);
                })
              )();
            },
            onLoad: function () {
              -1 !== this.userInfo.vipLevel &&
                (this.fetchTips(),
                this.getConversationList(),
                e.$TUIKit.on(
                  e.$TUIKitEvent.CONVERSATION_LIST_UPDATED,
                  this.onConversationListUpdated
                ));
            },
            onUnload: function () {
              e.$TUIKit.off(
                e.$TUIKitEvent.SDK_READY,
                this.onConversationListUpdated
              );
            },
            methods: {
              hanldeclick: function (n, t) {
                var r = this;
                e.showModal({
                  title: "提示",
                  content: "确认删除该聊天？",
                  confirmColor: "#631EFB",
                  success: function (t) {
                    t.confirm &&
                      e.$TUIKit.deleteConversation(
                        r.conversationList[n].conversationID
                      );
                  },
                });
              },
              open: function (e) {
                (this.conversationList[e].show = !0),
                  this.conversationList.map(function (n, t) {
                    e != t && (n.show = !1);
                  });
              },
              jump: function (e) {
                this.isShowCode = !0;
              },
              fetchTips: function () {
                var e = this;
                return (0, i.default)(
                  o.default.mark(function n() {
                    var t;
                    return o.default.wrap(function (n) {
                      for (;;)
                        switch ((n.prev = n.next)) {
                          case 0:
                            return (n.next = 2), (0, f.getMessageTopTip)();
                          case 2:
                            (t = n.sent),
                              (e.tips = t),
                              t &&
                                Object.keys(t).length > 0 &&
                                (e.showTip = !0);
                          case 5:
                          case "end":
                            return n.stop();
                        }
                    }, n);
                  })
                )();
              },
              toLogin: function () {
                e.removeStorageSync("userInfo"),
                  e.redirectTo({ url: "/pages/login/index" }),
                  this.$store.commit("updateUserInfo", void 0);
              },
              jumpRecomand: function () {
                var n = this;
                -1 !== this.userInfo.vipLevel
                  ? this.checkAuth("Recomand") &&
                    this.handleNavigater("/pages/subPages/safeRecomand/index")
                  : e.showModal({
                      title: "提示",
                      confirmColor: "#631EFB",
                      cancelText: "再看看",
                      confirmText: "立即登录",
                      cancelColor: "#808080",
                      content:
                        "登录注册后即可与更多女神男神互动，立即注册登录？",
                      success: function (e) {
                        e.confirm && n.toLogin();
                      },
                    });
              },
              getConversationList: function () {
                var n = this;
                e.$TUIKit.getConversationList().then(function (e) {
                  u.default.log(
                    "TUI-conversation | getConversationList | getConversationList-length: ".concat(
                      e.data.conversationList.length
                    )
                  ),
                    console.log("imResponse", e),
                    e.data.conversationList.length > 0 &&
                      n
                        .filterUserMessage(e.data.conversationList)
                        .then(function (e) {
                          n.setData({ conversationList: e });
                        });
                });
              },
              handleRoute: function (n) {
                1 !== this.userPermission.canChat
                  ? this.checkAuth() &&
                    e.navigateTo({
                      url: "/pages/imPages/TUI-Chat/chat?conversationID="
                        .concat(n.conversationID, "&avatar=")
                        .concat(n.userProfile.avatar, "&nickname=")
                        .concat(n.userProfile.nick, "&id=")
                        .concat(n.userProfile.userID),
                    })
                  : e.navigateTo({
                      url: "/pages/imPages/TUI-Chat/chat?conversationID="
                        .concat(n.conversationID, "&avatar=")
                        .concat(n.userProfile.avatar, "&nickname=")
                        .concat(n.userProfile.nick, "&id=")
                        .concat(n.userProfile.userID),
                    });
              },
              filterUserMessage: function (e) {
                return (0, i.default)(
                  o.default.mark(function n() {
                    var t, r, i, a;
                    return o.default.wrap(function (n) {
                      for (;;)
                        switch ((n.prev = n.next)) {
                          case 0:
                            return (
                              (t = e
                                .map(function (e) {
                                  return e.userProfile.userID;
                                })
                                .join(";")),
                              (n.next = 3),
                              (0, s.usersInfo)({ userIds: t })
                            );
                          case 3:
                            return (
                              (r = n.sent),
                              (i = r.map(function (e) {
                                return e.id.toString();
                              })),
                              (a = e
                                .map(function (e) {
                                  return (
                                    r.map(function (n) {
                                      e.userProfile.userID ===
                                        n.id.toString() &&
                                        ((e.userProfile.avatar = n.avatar),
                                        (e.userProfile.nick = n.nickname));
                                    }),
                                    (e.show = !1),
                                    (e.timespan = new Date().getTime()),
                                    e
                                  );
                                })
                                .filter(function (e) {
                                  return i.includes(e.userProfile.userID);
                                })),
                              n.abrupt("return", a)
                            );
                          case 7:
                          case "end":
                            return n.stop();
                        }
                    }, n);
                  })
                )();
              },
              onConversationListUpdated: function (e) {
                var n = this;
                return (0, i.default)(
                  o.default.mark(function t() {
                    var r;
                    return o.default.wrap(function (t) {
                      for (;;)
                        switch ((t.prev = t.next)) {
                          case 0:
                            if (
                              (console.log("消息列表更新", e.data),
                              u.default.log(
                                "TUI-conversation | onConversationListUpdated  |ok"
                              ),
                              !(e.data.length > 0))
                            ) {
                              t.next = 7;
                              break;
                            }
                            return (t.next = 5), n.filterUserMessage(e.data);
                          case 5:
                            (r = t.sent), n.setData({ conversationList: r });
                          case 7:
                          case "end":
                            return t.stop();
                        }
                    }, t);
                  })
                )();
              },
              fetchMsg: function () {
                var e = this;
                return (0, i.default)(
                  o.default.mark(function n() {
                    var t;
                    return o.default.wrap(function (n) {
                      for (;;)
                        switch ((n.prev = n.next)) {
                          case 0:
                            return (n.next = 2), (0, c.userRedPointData)();
                          case 2:
                            (t = n.sent), (e.notices = t);
                          case 4:
                          case "end":
                            return n.stop();
                        }
                    }, n);
                  })
                )();
              },
            },
          };
          n.default = p;
        }).call(this, t("543d").default);
      },
    },
    [["de31", "common/runtime", "common/vendor"]],
  ]);
