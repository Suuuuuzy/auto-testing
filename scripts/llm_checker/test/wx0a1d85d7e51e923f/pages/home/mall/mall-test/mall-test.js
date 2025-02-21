getApp().BasePage({
  data: { container: null },
  onLoad: function (n) {
    var t = this;
    this,
      (this.shopId = 1347),
      this.setData({
        container: function () {
          return t.createSelectorQuery().select(".wrapper");
        },
      });
  },
  onReady: function () {},
  onShow: function () {},
  onHide: function () {},
  onUnload: function () {},
  onPullDownRefresh: function () {},
  onReachBottom: function () {},
  onShareAppMessage: function () {
    this.data.pageData;
    return { title: "sinak", imageUrl: this.data.shareImagePath };
  },
});
