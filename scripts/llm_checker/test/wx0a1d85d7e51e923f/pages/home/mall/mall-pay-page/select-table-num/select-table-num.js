getApp().BasePage({
  data: {},
  onLoad: function (n) {
    this;
  },
  itemClick: function (n) {
    var t = n.currentTarget.dataset.num;
    if (t) {
      var a = getCurrentPages();
      return (
        a[a.length - 2].setData({ tableData: { tableNum: t } }),
        void wx.navigateBack({ delta: 1 })
      );
    }
  },
  onReady: function () {},
  onShow: function () {},
  onHide: function () {},
  onUnload: function () {},
  onPullDownRefresh: function () {},
  onReachBottom: function () {},
  onShareAppMessage: function () {},
});
