var a = require("../../assets/js/validator.js"),
  t = s(require("../../assets/js/errorCode.js")),
  e = s(require("../../components/vant/toast/toast"));
function s(a) {
  return a && a.__esModule ? a : { default: a };
}
var i = getApp();
Page({
  data: {
    imageId: "",
    imageCodeUrl: "",
    imageCode: "",
    phone: "",
    smsCode: "",
    errorMsg: { phone: "", imageCode: "", msgCodeValidator: "" },
    phoneValid: !1,
    imageValid: !1,
    smsValid: !1,
    disabled: !0,
    isSent: !1,
    countdownText: "",
  },
  toPrivacy: function () {
    wx.navigateTo({ url: "/pages/privacy/privacy" });
  },
  toContact: function () {
    wx.navigateTo({ url: "/pages/contact/contact" });
  },
  phoneInput: function () {
    this.data.phone.length
      ? (0, a.phoneReg)(this.data.phone)
        ? this.setData({ phoneValid: !0 })
        : (e.default.fail("请输入正确的手机号"),
          this.setData({ phoneValid: !1 }))
      : (e.default.fail("请输入手机号"), this.setData({ phoneValid: !1 })),
      this.data.phoneValid &&
        this.data.imageValid &&
        this.data.smsValid &&
        this.setData({ disabled: !1 });
  },
  phoneBlur: function (a) {
    this.setData({ phone: a.detail.value });
  },
  imageCodeInput: function (a) {
    this.setData({ imageCode: a.detail.value });
  },
  smsCodeInput: function (a) {
    this.setData({ smsCode: a.detail.value });
  },
  imageInput: function () {
    this.data.imageCode.length
      ? (0, a.imageCodeReg)(this.data.imageCode)
        ? this.setData({ imageValid: !0 })
        : (e.default.fail("请输入正确的图形验证码"),
          this.setData({ imageValid: !1 }))
      : (e.default.fail("请输入图形验证码"), this.setData({ imageValid: !1 })),
      this.data.phoneValid &&
        this.data.imageValid &&
        this.data.smsValid &&
        this.setData({ disabled: !1 });
  },
  smsInput: function () {
    this.data.smsCode.length
      ? (0, a.msgCodeReg)(this.data.smsCode)
        ? this.setData({ smsValid: !0 })
        : (e.default.fail("请输入正确的短信验证码"),
          this.setData({ smsValid: !1 }))
      : (e.default.fail("请输入短信验证码"), this.setData({ smsValid: !1 })),
      this.data.phoneValid &&
        this.data.imageValid &&
        this.data.smsValid &&
        this.setData({ disabled: !1 });
  },
  getImageCode: function () {
    var a = this,
      t = new Date().getTime();
    this.setData({ imageId: t });
    var e = {
      url: ""
        .concat(
          i.globalData.user,
          "/user/appletLogin/getAppletImageCode/75/30/"
        )
        .concat(t),
      method: "GET",
      successCallback: function (t) {
        var e = "";
        200 === t.data.resultCode && (e = t.data.data.base64Str),
          a.setData({ imageCodeUrl: e });
      },
    };
    i.request(e);
  },
  countdown: function () {
    var a = this,
      t = 60;
    this.setData({ countdownText: "".concat(t, "s后重发") }),
      this.timer && clearInterval(this.timer),
      (this.timer = setInterval(function () {
        --t
          ? a.setData({ countdownText: "".concat(t, "s后重发") })
          : (clearInterval(a.timer), a.setData({ isSent: !1 }));
      }, 1e3));
  },
  sendSms: function () {
    var a = this;
    if (
      (this.phoneInput(),
      this.data.phoneValid && this.imageInput(),
      this.data.phoneValid && this.data.imageValid)
    ) {
      var s = {
        url: "".concat(i.globalData.user, "/user/sendUserLogonSmsCode"),
        method: "POST",
        data: {
          phone: this.data.phone,
          imageCode: this.data.imageCode,
          imageId: this.data.imageId,
        },
        successCallback: function (s) {
          if (200 === s.data.resultCode)
            e.default.success("已发送验证码"),
              a.setData({ isSent: !0 }),
              a.countdown();
          else {
            var i = t.default[s.data.resultCode] || s.data.resultMessage;
            console.log("response:", s),
              e.default.fail(i),
              a.setData({ phoneValid: !1, imageValid: !1 }),
              a.getImageCode();
          }
        },
      };
      i.request(s);
    }
  },
  login: function () {
    if (
      (this.phoneInput(),
      this.data.phoneValid && this.smsInput(),
      this.data.phoneValid && this.data.smsValid)
    ) {
      var a = this;
      wx.login({
        success: function (t) {
          console.log(t);
          var e = {
            url: "".concat(i.globalData.user, "/user/appletLogin"),
            method: "POST",
            data: {
              phone: a.data.phone,
              smsCode: a.data.smsCode,
              jscode: t.code,
            },
            successCallback: function (a) {
              200 === a.data.resultCode &&
                (wx.switchTab({ url: "/pages/card/card" }),
                wx.setStorageSync("userInfo", a.data.data),
                (i.globalData.userInfo = a.data.data),
                (i.globalData.token = a.data.data.token));
            },
          };
          i.request(e);
        },
        fail: function (a) {
          console.log("获取临时code失败！" + a.errMsg);
        },
      });
    }
  },
  onLoad: function (a) {
    this.getImageCode();
  },
  onReady: function () {},
  onShow: function () {},
  onHide: function () {},
  onUnload: function () {
    this.timer && clearInterval(this.timer);
  },
  onPullDownRefresh: function () {},
  onReachBottom: function () {},
  onShareAppMessage: function () {},
});
