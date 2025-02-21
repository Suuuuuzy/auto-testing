var t;
getApp().BasePage({
  data: {},
  onLoad: function (a) {
    (this.shopId = a.shopId),
      (this.type = a.type ? a.type : 0),
      this.setData({ type: this.type }),
      (t = this),
      this.loadData();
  },
  loadData: function () {
    this.requestWithLoading(
      "shop/shopCertificatePage",
      { shopId: this.shopId, type: this.type },
      function (a) {
        a && t.setData({ pageData: a });
      }
    );
  },
  viewImage: function (t) {
    for (var a = [], e = 0; e < this.data.pageData.images.length; e++)
      a.push(this.data.ossImage + this.data.pageData.images[e].img_url);
    wx.previewImage({ urls: a, current: t.currentTarget.dataset.index });
  },
  onReady: function () {},
  onShow: function () {},
  onHide: function () {},
  onUnload: function () {},
  onPullDownRefresh: function () {},
  onReachBottom: function () {},
  onShareAppMessage: function () {},
});
