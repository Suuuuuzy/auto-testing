(global.webpackJsonp = global.webpackJsonp || []).push([
  ["pages/tabbar/message/components/tui-conversation/conversation-item/index"],
  {
    "24ef": function (e, t, n) {},
    "3d75": function (e, t, n) {
      n.r(t);
      var o = n("ad5c"),
        a = n.n(o);
      for (var s in o)
        ["default"].indexOf(s) < 0 &&
          (function (e) {
            n.d(t, e, function () {
              return o[e];
            });
          })(s);
      t.default = a.a;
    },
    5693: function (e, t, n) {
      var o = n("24ef");
      n.n(o).a;
    },
    "72a3": function (e, t, n) {
      n.d(t, "b", function () {
        return a;
      }),
        n.d(t, "c", function () {
          return s;
        }),
        n.d(t, "a", function () {
          return o;
        });
      var o = {
          uBadge: function () {
            return n
              .e("node-modules/uview-ui/components/u-badge/u-badge")
              .then(n.bind(null, "38dd"));
          },
        },
        a = function () {
          var e = this,
            t =
              (e.$createElement,
              e._self._c,
              e.conversation.conversationID
                ? e.setConversationAvatarHandler()
                : null),
            n = e.conversation.conversationID
              ? e._f("formatName")(e.conversation)
              : null,
            o =
              e.conversation.conversationID &&
              "TIMCustomElem" === e.conversation.lastMessage.type
                ? e.formatMessage(e.conversation.lastMessage.payload)
                : null,
            a = e.conversation.conversationID
              ? e._f("formatTime")(1e3 * e.conversation.lastMessage.lastTime)
              : null;
          e.$mp.data = Object.assign(
            {},
            { $root: { m0: t, f0: n, m1: o, f1: a } }
          );
        },
        s = [];
    },
    "8b3b": function (e, t, n) {
      n.r(t);
      var o = n("72a3"),
        a = n("3d75");
      for (var s in a)
        ["default"].indexOf(s) < 0 &&
          (function (e) {
            n.d(t, e, function () {
              return a[e];
            });
          })(s);
      n("5693");
      var i = n("f0c5"),
        r = Object(i.a)(
          a.default,
          o.b,
          o.c,
          !1,
          null,
          null,
          null,
          !1,
          o.a,
          void 0
        );
      t.default = r.exports;
    },
    ad5c: function (e, t, n) {
      (function (e) {
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.default = void 0);
        var o = n("b139"),
          a =
            (n("c442"),
            {
              data: function () {
                return { xScale: 0 };
              },
              components: {},
              props: {
                conversation: { type: Object, default: function () {} },
              },
              watch: {
                conversation: {
                  handler: function (e) {},
                  immediate: !0,
                  deep: !0,
                },
              },
              filters: {
                formatTime: function (e) {
                  return (0, o.showTimePipe)(e);
                },
                formatName: function (e) {
                  return "@TIM#SYSTEM" === e.type
                    ? "系统通知"
                    : "C2C" === e.type
                    ? e.remark || e.userProfile.nick || e.userProfile.userID
                    : "GROUP" === e.type
                    ? e.groupProfile.name || e.groupProfile.groupID
                    : void 0;
                },
              },
              methods: {
                formatMessage: function (e) {
                  return 1 == JSON.parse(e.data).tipType
                    ? "提醒认证微信"
                    : "短信唤醒";
                },
                getConversationName: function (e) {
                  return "@TIM#SYSTEM" === e.type
                    ? "系统通知"
                    : "C2C" === e.type
                    ? e.remark || e.userProfile.nick || e.userProfile.userID
                    : "GROUP" === e.type
                    ? e.groupProfile.name || e.groupProfile.groupID
                    : void 0;
                },
                setConversationAvatarHandler: function () {
                  return "@TIM#SYSTEM" === this.conversation.type
                    ? "https://web.sdk.qcloud.com/component/TUIKit/assets/system.png"
                    : "C2C" === this.conversation.type
                    ? this.conversation.userProfile.avatar
                    : "GROUP" === this.conversation.type
                    ? this.conversation.groupProfile.avatar ||
                      "/static/static/assets/gruopavatar.svg"
                    : void 0;
                },
                deleteConversation: function () {
                  var t = this;
                  e.showModal({
                    title: "提示",
                    content: "确认删除会话？",
                    confirmColor: "#631EFB",
                    success: function (n) {
                      n.confirm &&
                        (e.$TUIKit.deleteConversation(
                          t.conversation.conversationID
                        ),
                        t.setData({ conversation: {}, xScale: 0 }));
                    },
                  });
                },
                handleTouchMove: function (e) {
                  var t = this;
                  console.log(e),
                    console.log(this.lock),
                    this.lock || ((this.last = e.detail.x), (this.lock = !0)),
                    this.lock && e.detail.x - this.last < -5
                      ? (console.log(1111),
                        this.setData({ xScale: -75 }),
                        setTimeout(function () {
                          t.lock = !1;
                        }, 2e3))
                      : this.lock &&
                        e.detail.x - this.last > 5 &&
                        (console.log(2222),
                        this.setData({ xScale: 0 }),
                        setTimeout(function () {
                          t.lock = !1;
                        }, 2e3));
                },
                $updateTimeago: function (e) {
                  e.conversationID &&
                    (e.lastMessage.messageForShow =
                      e.lastMessage.messageForShow.slice(0, 15)),
                    this.setData({ conversation: e });
                },
                handleImageError: function () {
                  this.setData({
                    setConversationAvatar:
                      "/static/static/assets/gruopavatar.svg",
                  });
                },
              },
            });
        t.default = a;
      }).call(this, n("543d").default);
    },
  },
]),
  (global.webpackJsonp = global.webpackJsonp || []).push([
    "pages/tabbar/message/components/tui-conversation/conversation-item/index-create-component",
    {
      "pages/tabbar/message/components/tui-conversation/conversation-item/index-create-component":
        function (e, t, n) {
          n("543d").createComponent(n("8b3b"));
        },
    },
    [
      [
        "pages/tabbar/message/components/tui-conversation/conversation-item/index-create-component",
      ],
    ],
  ]);
