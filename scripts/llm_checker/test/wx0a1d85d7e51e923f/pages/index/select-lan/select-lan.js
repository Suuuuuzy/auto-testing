getApp().BasePage({
  data: {},
  onLoad: function (t) {
    this;
  },
  uyLanBtn: function () {
    var t = getCurrentPages(),
      n = t[t.length - 2];
    this.data.isUy || n._lanSwitch(),
      this.lan.setHasSelected(),
      setTimeout(function () {
        wx.navigateBack({ delta: 1 });
      }, 100);
  },
  chLanBtn: function () {
    var t = getCurrentPages(),
      n = t[t.length - 2];
    this.data.isUy && n._lanSwitch(),
      this.lan.setHasSelected(),
      setTimeout(function () {
        wx.navigateBack({ delta: 1 });
      }, 100);
  },
  onReady: function () {},
  onShow: function () {},
  onHide: function () {},
  onUnload: function () {},
  onPullDownRefresh: function () {},
  onReachBottom: function () {},
});
