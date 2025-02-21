a(require("../../components/vant/toast/toast"));
var e = a(require("../../assets/lib/weapp-qrcode.js")),
  t = a(require("../../assets/js/util.js"));
function a(e) {
  return e && e.__esModule ? e : { default: e };
}
var n = getApp();
Page({
  data: {
    cardId: null,
    cardNum: null,
    merchantId: null,
    phone: null,
    qrcode: null,
    qrcodeInstance: null,
    timer: null,
    brightness: 0.5,
  },
  handlerGobackClick: function () {
    getCurrentPages().length >= 2
      ? wx.navigateBack({ delta: 1 })
      : wx.navigateTo({ url: "/pages/card/card" });
  },
  onLoad: function (e) {
    var t = this;
    this.setData({ detailHeight: n.globalSystemInfo.navBarHeight + 4 }),
      wx.getScreenBrightness({
        success: function (e) {
          t.setData({ brightness: e.value }),
            1 != e.value && wx.setScreenBrightness({ value: 1 });
        },
      }),
      this.getOpenerEventChannel().on("qrcode", function (e) {
        var a = wx.getStorageSync("userInfo");
        t.setData({
          cardId: e.cardId,
          cardNum: e.cardNum,
          merchantId: e.merchantId,
          phone: a.user.phone,
        }),
          t.getQrcode();
        var n = setInterval(function () {
          t.getQrcode();
        }, 55e3);
        t.setData({ timer: n });
      });
  },
  onUnload: function () {
    clearInterval(this.data.timer),
      wx.setScreenBrightness({ value: this.data.brightness });
  },
  refresh: t.default.throttle(function () {
    this.getQrcode();
  }, 3e3),
  getQrcode: function () {
    var e = this,
      t = {
        url: "".concat(n.globalData.access, "/qrCode/pay/encrypt"),
        method: "GET",
        data: {
          phone: this.data.phone,
          merchantId: this.data.merchantId,
          cardNo: this.data.cardNum,
          cardId: this.data.cardId,
        },
        successCallback: function (t) {
          200 === t.data.resultCode
            ? (e.setData({ qrcode: t.data.data }), e.drawQrcode())
            : wx.showToast({ title: "获取二维码失败", icon: "none" });
        },
        failCallback: function (e) {
          wx.showToast({ title: "网络异常", icon: "none" });
        },
      };
    n.request(t);
  },
  drawQrcode: function () {
    if (this.data.qrcodeInstance)
      this.data.qrcodeInstance.makeCode(this.data.qrcode);
    else {
      var t = new e.default("myQrcode", {
        text: this.data.qrcode,
        width: 200,
        height: 200,
        padding: 12,
        correctLevel: e.default.CorrectLevel.H,
        callback: function (e) {},
      });
      this.setData({ qrcodeInstance: t });
    }
  },
  onReady: function () {},
  onShow: function () {},
  onHide: function () {},
  onPullDownRefresh: function () {},
  onReachBottom: function () {},
  onShareAppMessage: function () {},
});
