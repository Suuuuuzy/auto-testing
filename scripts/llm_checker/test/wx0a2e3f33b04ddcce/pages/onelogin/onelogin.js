var e,
  o = require("../../@babel/runtime/helpers/regeneratorRuntime"),
  n = require("../../@babel/runtime/helpers/asyncToGenerator"),
  t =
    (e = require("../../components/vant/toast/toast")) && e.__esModule
      ? e
      : { default: e };
var a = getApp(),
  r =
    (require("../../assets/lib/wx-formdata/formData.js"),
    requirePlugin("auth-plugin").smartLogin),
  s = r.getPreSign({ appId: "300012649748", version: "1.2" });
Page({
  data: { code: "", agree: !1, showOneLogin: !0, listener: null },
  getCode: function () {
    var e = this;
    wx.login({
      success: function (o) {
        console.log(o.code), e.setData({ code: o.code });
      },
    });
  },
  oneKeyLogin: function (e) {
    var o = this;
    if (!1 !== this.data.agree) {
      if ("getPhoneNumber:ok" === e.detail.errMsg) {
        var n = this,
          r = {
            url: "".concat(a.globalData.user, "/user/appletLogin"),
            method: "POST",
            data: {
              encryptedData: encodeURIComponent(e.detail.encryptedData),
              iv: e.detail.iv,
              jscode: this.data.code,
            },
            successCallback: function (e) {
              200 === e.data.resultCode
                ? n.affterLogin(e.data.data)
                : 21004 === e.data.resultCode &&
                  (t.default.fail("手机号/账户不存在"), o.getCode());
            },
          };
        a.request(r);
      }
    } else
      wx.showToast({ title: "请勾选同意隐私条款、用户协议", icon: "none" });
  },
  affterLogin: function (e) {
    wx.switchTab({ url: "/pages/card/card" }),
      wx.setStorageSync("userInfo", e),
      (a.globalData.userInfo = e),
      (a.globalData.token = e.token);
  },
  toLogin: function () {
    wx.navigateTo({ url: "/pages/login/login" });
  },
  toPrivacy: function () {
    wx.navigateTo({ url: "/pages/privacy/privacy" });
  },
  toContact: function () {
    wx.navigateTo({ url: "/pages/contact/contact" });
  },
  routerToAuthTY: function (e) {
    var a = this;
    return n(
      o().mark(function e() {
        var n, s, i;
        return o().wrap(function (e) {
          for (;;)
            switch ((e.prev = e.next)) {
              case 0:
                return (
                  console.log("统一认证登录"),
                  wx.showLoading({ title: "加载中..." }),
                  (e.next = 4),
                  a.getSignAction()
                );
              case 4:
                (n = e.sent),
                  console.log("encodeSign:", n),
                  wx.hideLoading(),
                  (s = a),
                  n &&
                    ((i = {
                      isTest: "",
                      appId: "300012649748",
                      sign: n,
                      openType: "0",
                      expandParams: "",
                      version: "1.2",
                      reqType: "1",
                      authPageType: "1",
                    }),
                    console.log("data:", i),
                    r.getToken({
                      data: i,
                      success: function (e) {
                        console.log("plugin.getToken: res => ", e),
                          13 == e.code
                            ? s.toLogin()
                            : (wx.showLoading({ title: "加载中..." }),
                              wx.login({
                                success: function (o) {
                                  s.loginAction(e, o.code)
                                    .then(function (e) {
                                      wx.hideLoading(),
                                        console.log("loginAction data=>", e),
                                        200 == e.resultCode
                                          ? s.affterLogin(e.data)
                                          : t.default.fail(e.resultMessage);
                                    })
                                    .catch(function (e) {
                                      wx.hideLoading(), console.log("err=>", e);
                                    });
                                },
                                fail: function (e) {
                                  wx.hideLoading(),
                                    console.log(
                                      "获取临时code失败！" + e.errMsg
                                    );
                                },
                              }));
                      },
                      error: function (e) {
                        if (
                          (console.log("plugin.getToken: error res => ", e),
                          13 == e.code)
                        )
                          s.toLogin();
                        else {
                          var o,
                            n =
                              e.message ||
                              (null === (o = e.YDData) || void 0 === o
                                ? void 0
                                : o.message) ||
                              "此功能仅适用于中国移动数据流量";
                          t.default.fail(n);
                        }
                      },
                    }));
              case 9:
              case "end":
                return e.stop();
            }
        }, e);
      })
    )();
  },
  getSignAction: function () {
    return n(
      o().mark(function e() {
        return o().wrap(function (e) {
          for (;;)
            switch ((e.prev = e.next)) {
              case 0:
                return e.abrupt(
                  "return",
                  new Promise(function (e, o) {
                    console.log("sign:", s);
                    var n = {
                      url: "".concat(a.globalData.user, "/user/getEncrypts"),
                      method: "POST",
                      data: { sign: s },
                      successCallback: function (n) {
                        console.log("getSignAction response:", n),
                          200 === n.statusCode
                            ? (console.log("response data:", n.data), e(n.data))
                            : o(n.errMsg);
                      },
                    };
                    a.request(n);
                  })
                );
              case 1:
              case "end":
                return e.stop();
            }
        }, e);
      })
    )();
  },
  loginAction: function (e, t) {
    return n(
      o().mark(function n() {
        var r;
        return o().wrap(function (o) {
          for (;;)
            switch ((o.prev = o.next)) {
              case 0:
                return (
                  (r = {
                    cmToken: e.token,
                    userInformation: e.userInformation,
                    terminateId: "miniApp",
                    msgId: e.msgId,
                    oper: e.oper,
                    jscode: t,
                  }),
                  console.log(r),
                  o.abrupt(
                    "return",
                    new Promise(function (e, o) {
                      var n = {
                        url: "".concat(
                          a.globalData.user,
                          "/user/cmAppletLogin"
                        ),
                        method: "POST",
                        data: r,
                        successCallback: function (n) {
                          console.log("cmAppletLogin:", n),
                            200 === n.statusCode ? e(n.data) : o(n.errMsg);
                        },
                      };
                      a.request(n);
                    })
                  )
                );
              case 3:
              case "end":
                return o.stop();
            }
        }, n);
      })
    )();
  },
  onLoad: function (e) {
    var o = this;
    this.setData({
      listener: function (e) {
        console.log("网络类型=>", e.networkType),
          o.setData({
            showOneLogin:
              "wifi" !== e.networkType &&
              "none" != e.networkType &&
              "unknown" !== e.networkType,
          });
      },
    }),
      wx.getNetworkType({ success: o.data.listener }),
      wx.onNetworkStatusChange(o.data.listener);
  },
  onReady: function () {},
  onShow: function () {},
  onHide: function () {
    console.log("onHide");
  },
  onUnload: function () {
    console.log("onUnload");
  },
  onPullDownRefresh: function () {},
  onReachBottom: function () {},
  onShareAppMessage: function () {},
});
