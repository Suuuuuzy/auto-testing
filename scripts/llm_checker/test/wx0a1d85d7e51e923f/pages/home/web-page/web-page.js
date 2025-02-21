var n;
getApp().BasePage({
  data: {},
  onLoad: function (o) {
    n = this;
    var t = o.url;
    t ? n.setData({ url: t }) : wx.navigateBack({ delta: 0 });
  },
  onReady: function () {},
  onShow: function () {},
  onHide: function () {},
  onUnload: function () {},
  onPullDownRefresh: function () {},
  onReachBottom: function () {},
  onShareAppMessage: function () {},
});
