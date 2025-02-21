var o;
getApp().BasePage({
  data: { pageData: null },
  onLoad: function (n) {
    (o = this), (this.shopId = n.shopId), this.loadData();
  },
  loadData: function () {
    this.shopId &&
      this.requestWithLoading(
        "group/groupShopHome",
        { shopId: this.shopId },
        function (n) {
          n && o.setData({ pageData: n });
        }
      );
  },
  onReady: function () {},
  onShow: function () {},
  onHide: function () {},
  onUnload: function () {},
  onPullDownRefresh: function () {},
  onReachBottom: function () {},
  onShareAppMessage: function () {},
});
