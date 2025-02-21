Page({
  data: {},
  onLoad: function (n) {
    n.url
      ? this.setData({ url: n.url })
      : this.setData({ url: getApp().globalData.accounturl });
  },
  onReady: function () {},
  onShow: function () {},
  onHide: function () {},
  onUnload: function () {},
  onPullDownRefresh: function () {},
  onReachBottom: function () {},
  onShareAppMessage: function () {},
  onShareTimeline: function () {},
});
