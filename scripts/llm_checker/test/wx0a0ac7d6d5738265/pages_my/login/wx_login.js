var e = require("../../@babel/runtime/helpers/regeneratorRuntime"),
  t = require("../../@babel/runtime/helpers/asyncToGenerator"),
  n = require("../../common/vendor.js"),
  o = {
    data: function () {
      return { code: "", phone: !1, userInfo: {}, isRead: !1, showReadPop: !1 };
    },
    onLoad: function () {
      this.getLoginCode();
    },
    watch: {
      isRead: function (e) {
        console.log(e);
      },
    },
    methods: {
      getLoginCode: function () {
        var e = this;
        n.index.login({
          provider: "weixin",
          success: function (t) {
            e.getToken(t.code);
          },
        });
      },
      getToken: function (o) {
        var a = this;
        return t(
          e().mark(function t() {
            var r;
            return e().wrap(function (e) {
              for (;;)
                switch ((e.prev = e.next)) {
                  case 0:
                    return (e.next = 2), a.$api.getToken({ code: o });
                  case 2:
                    if (2e4 !== (r = e.sent).data.code) {
                      e.next = 12;
                      break;
                    }
                    return (
                      console.log(r),
                      n.index.setStorageSync("token", r.data.data.token),
                      a.$loading("加载中"),
                      (e.next = 9),
                      a.getUserInfoDetail()
                    );
                  case 9:
                    n.index.hideLoading(), (e.next = 13);
                    break;
                  case 12:
                    20001 === r.data.code
                      ? setTimeout(function () {
                          a.getLoginCode();
                        }, 3e3)
                      : r.data.code;
                  case 13:
                  case "end":
                    return e.stop();
                }
            }, t);
          })
        )();
      },
      getPhoneNumber: function (o) {
        var a = this;
        return t(
          e().mark(function t() {
            var r, i, s;
            return e().wrap(function (e) {
              for (;;)
                switch ((e.prev = e.next)) {
                  case 0:
                    return (
                      (r = {}),
                      (r = o.detail.code
                        ? { code: o.detail.code }
                        : {
                            encryptedData: o.detail.encryptedData,
                            ivStr: o.detail.iv,
                          }),
                      (i = a),
                      (e.next = 5),
                      i.getDefaultUserInfo()
                    );
                  case 5:
                    if ("getPhoneNumber:ok" !== o.detail.errMsg) {
                      e.next = 13;
                      break;
                    }
                    return (
                      i.$loading("登录中"),
                      (e.next = 9),
                      i.$api.$CryptPhoneNumber(r)
                    );
                  case 9:
                    (s = e.sent),
                      console.log("返回手机号", s),
                      2e4 === s.data.code
                        ? (n.index.setStorageSync("phone", s.data.data),
                          i.goHome(),
                          n.index.hideLoading())
                        : (n.index.hideLoading(),
                          i.$toast("登录失败,请重新登录", "error", 3e3),
                          i.getLoginCode()),
                      (e.next = 14);
                    break;
                  case 13:
                    n.index.showModal({
                      title: "提示",
                      content: "需要通过授权才能继续，请重新点击并授权",
                      showCancel: !1,
                    });
                  case 14:
                  case "end":
                    return e.stop();
                }
            }, t);
          })
        )();
      },
      getUserInfoDetail: function () {
        var o = this;
        return t(
          e().mark(function t() {
            var a;
            return e().wrap(function (e) {
              for (;;)
                switch ((e.prev = e.next)) {
                  case 0:
                    return (
                      o.$loading("加载中"),
                      (e.next = 3),
                      o.$api.getUserInfoDetail()
                    );
                  case 3:
                    2e4 === (a = e.sent).data.code
                      ? ((o.userInfo = a.data.data),
                        a.data.data.phoneNumber &&
                          (a.data.data.openId &&
                            n.index.setStorageSync(
                              "u_openid",
                              a.data.data.openId
                            ),
                          o.goHome()),
                        n.index.hideLoading())
                      : 20004 == a.data.code && o.getUserInfoDetail();
                  case 5:
                  case "end":
                    return e.stop();
                }
            }, t);
          })
        )();
      },
      getDefaultUserInfo: function () {
        var e = this;
        n.index.getUserInfo({
          success: function (t) {
            var n = {
              encryptedData: t.encryptedData,
              iv: t.iv,
              rawData: t.rawData,
              signatrue: t.signature,
              userInfo: JSON.stringify(t.userInfo),
            };
            e.updataUserInfo(n);
          },
        });
      },
      updataUserInfo: function (o) {
        var a = this;
        return t(
          e().mark(function t() {
            var r;
            return e().wrap(function (e) {
              for (;;)
                switch ((e.prev = e.next)) {
                  case 0:
                    return (e.next = 2), a.$api.$updateUserInfo(o);
                  case 2:
                    (r = e.sent),
                      console.log("更新用户", r),
                      2e4 === r.data.code
                        ? n.index.setStorageSync("u_openid", r.data.data.openId)
                        : 500 !== r.data.code && a.getDefaultUserInfo();
                  case 4:
                  case "end":
                    return e.stop();
                }
            }, t);
          })
        )();
      },
      goHome: function () {
        var e = getCurrentPages();
        this.$store.commit("updateHasLogin", !0),
          n.index.setStorage({ key: "userInfo", data: this.userInfo }),
          this.$store.commit("setUserInfo", this.userInfo),
          this.$toast("登录成功", "success", 3e3),
          1035 === n.index.getStorageSync("scene")
            ? this.$jump("/pages_pay/pay/pay")
            : e.length > 1
            ? n.index.navigateBack()
            : n.index.switchTab({ url: "/pages/index/index" });
      },
      noLoginFn: function () {
        this.$toast("需要授权登录才能正常使用完整功能哦！"),
          (this.showReadPop = !1),
          this.$store.commit("updateHasLogin", !1),
          n.index.removeStorageSync("userInfo");
      },
      toBack: function () {
        this.$store.commit("updateHasLogin", !1),
          n.index.removeStorageSync("token"),
          n.index.removeStorageSync("userInfo"),
          n.index.navigateBack();
      },
    },
  };
Array ||
  (
    n.resolveComponent("u-line") +
    n.resolveComponent("u-button") +
    n.resolveComponent("u-popup")
  )();
Math ||
  (
    function () {
      return "../../uview-plus/components/u-line/u-line.js";
    } +
    function () {
      return "../../uview-plus/components/u-button/u-button.js";
    } +
    function () {
      return "../../uview-plus/components/u-popup/u-popup.js";
    }
  )();
var a = n._export_sfc(o, [
  [
    "render",
    function (e, t, o, a, r, i) {
      return n.e(
        {
          a: "".concat(e.$imgPath, "/logo.png"),
          b: "".concat(e.$imgPath, "/logo.png"),
          c: n.p({ color: "#c3c5c7ff", customStyle: { margin: "24rpx 0;" } }),
          d: r.isRead,
          e: n.o(function (e) {
            return (r.isRead = !r.isRead);
          }),
          f: n.o(function (t) {
            return e.$jump("/pages_my/webView/webView?contractUrl=1");
          }),
          g: n.o(function (t) {
            return e.$jump("/pages_my/webView/webView?contractUrl=2");
          }),
          h: n.o(function (e) {
            return i.noLoginFn();
          }),
          i: n.p({
            customStyle: {
              width: "200rpx",
              "margin-right": "16rpx",
              "font-size": "32rpx",
            },
          }),
          j: r.isRead,
        },
        r.isRead
          ? {
              k: n.o(i.getPhoneNumber),
              l: n.p({
                "open-type": "getPhoneNumber",
                color: "#06B9C0FF",
                customStyle: { "font-size": "32rpx" },
              }),
            }
          : {
              m: n.o(function (t) {
                return e.$toast("请先阅读后勾选同意");
              }),
              n: n.p({
                color: "#06B9C0FF",
                customStyle: { "font-size": "32rpx" },
              }),
            },
        {
          o: n.p({
            show: r.showReadPop,
            safeAreaInsetBottom: !1,
            round: "20",
            mode: "center",
          }),
          p: n.o(function (e) {
            return (r.showReadPop = !0);
          }),
          q: n.o(function () {
            return i.toBack && i.toBack.apply(i, arguments);
          }),
        }
      );
    },
  ],
  ["__scopeId", "data-v-aeef7574"],
]);
wx.createPage(a);
