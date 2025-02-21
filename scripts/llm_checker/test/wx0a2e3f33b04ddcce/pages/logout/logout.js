var n,
  e =
    (n = require("../../components/vant/dialog/dialog")) && n.__esModule
      ? n
      : { default: n };
var a = getApp();
Page({
  data: {
    userInfo: {},
    cardNum: 0,
    headDefaultUrl: "/assets/img/head-default.png",
  },
  handlerGobackClick: function () {
    getCurrentPages().length >= 2
      ? wx.navigateBack({ delta: 1 })
      : wx.navigateTo({ url: "/pages/card/card" });
  },
  logout: function () {
    e.default
      .confirm({ title: "提示", message: "是否退出登录" })
      .then(function () {
        var n = {
          url: "".concat(a.globalData.user, "/user/logout"),
          method: "POST",
          data: null,
          successCallback: function (n) {
            1e4 === n.data.resultCode &&
              (wx.removeStorageSync("userInfo"),
              (a.userInfo = {}),
              (a.token = ""),
              wx.reLaunch({ url: "/pages/onelogin/onelogin" }));
          },
        };
        a.request(n);
      })
      .catch(function () {});
  },
  onLoad: function (n) {
    var e = this;
    this.setData({ userInfo: a.globalData.userInfo }),
      this.getOpenerEventChannel().on("cardNum", function (n) {
        e.setData({ cardNum: n.cardNum });
      });
  },
  onReady: function () {},
  onShow: function () {},
  onHide: function () {},
  onUnload: function () {},
  onPullDownRefresh: function () {},
  onReachBottom: function () {},
  onShareAppMessage: function () {},
});
