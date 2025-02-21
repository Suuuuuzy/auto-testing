var e = n(require("/service/base/basePage.js")),
  t = n(require("/service/base/baseComp.js")),
  a = n(require("/service/js/user.js")),
  o = n(require("/service/js/cart.js"));
function n(e) {
  return e && e.__esModule ? e : { default: e };
}
var s = new a.default(),
  i = new o.default();
App({
  onLaunch: function () {
    var e = this;
    this.userLogin(),
      wx.getSystemInfo({
        success: function (t) {
          console.log("getSystem ---\x3e>>", t),
            (e.globalData.StatusBar = t.statusBarHeight);
          var a = wx.getMenuButtonBoundingClientRect();
          console.log("capsule --\x3e>", a),
            a
              ? ((e.globalData.Custom = a),
                (e.globalData.CustomBar = a.bottom + a.top - t.statusBarHeight))
              : (e.globalData.CustomBar = t.statusBarHeight + 50);
          var o = t.screenWidth,
            n = t.screenHeight,
            s = 0;
          o && (s = 750 / o),
            ("android" != t.platform && "ios" != t.platform) ||
              (e.globalData.isPhone = !0),
            (e.globalData.wWidth = o),
            (e.globalData.wHeight = n),
            (e.globalData.pRatio = s);
        },
      });
  },
  BasePage: e.default,
  BaseComp: t.default,
  userLogin: function (e) {
    var t = this;
    s &&
      s.login(function (a) {
        return a
          ? ((t.globalData.isLogin = !0), "function" == typeof e && e(!0))
          : "function" == typeof e && e(!1);
      });
  },
  rpx2px: function (e) {
    var t = this.globalData.wWidth;
    t || (t = wx.getSystemInfoSync().screenWidth);
    return (e * t) / 750;
  },
  px2rpx: function (e) {
    var t = this.globalData.wWidth;
    t || (t = wx.getSystemInfoSync().screenWidth);
    return (750 * e) / t;
  },
  onShow: function () {
    console.log("app onShow");
  },
  onHide: function () {
    console.log("app onHide");
  },
  globalData: {
    userInfo: null,
    isLogin: !1,
    _cart: i,
    appState: null,
    isNewUser: !1,
    back: wx.getBackgroundAudioManager(),
    homeFirstOpen: !0,
    isPhone: !1,
    showAdvert: !1,
    token: null,
  },
});
