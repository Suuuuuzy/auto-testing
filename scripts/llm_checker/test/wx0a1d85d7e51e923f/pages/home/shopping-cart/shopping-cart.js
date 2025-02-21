var t;
getApp().BasePage({
  data: {},
  onLoad: function (a) {
    (t = this), this.loadData();
  },
  loadData: function () {
    var a = this.cart.getShops();
    a && console.log("shops ---\x3e>", a),
      a.length > 0 &&
        this.requestWithLoading(
          "mall/getMallCarts",
          { shopIds: JSON.stringify(a) },
          function (a) {
            a && (t.setData({ pageData: a }), t.initShopItems());
          }
        );
  },
  initShopItems: function () {
    console.log("initShop");
    var a = this.data.pageData;
    a &&
      a.length > 0 &&
      (a.forEach(function (a) {
        var e = t.cart.getShopItem(a.id);
        e && (a.item = e);
      }),
      this.setData({ pageData: a }),
      console.log("pageData ---\x3e>", this.data.pageData));
  },
  deleteBtn: function (t) {
    var a = t.currentTarget.dataset.index,
      e = t.currentTarget.dataset._index,
      n = this.data.pageData;
    n &&
      n.length > a &&
      n[a].item.length > e &&
      (1 == n[a].item.length
        ? (this.cart.removeShopItems(n[a].id), n.splice(a, 1))
        : (n[a].item.splice(e, 1), this.cart.setShopItem(n[a].id, n[a].item)),
      this.setData({ pageData: n }));
  },
  goShop: function (t) {
    var a = t.currentTarget.dataset.item;
    a && wx.navigateTo({ url: "/pages/home/mall/mall-home?shopId=" + a.id });
  },
  onReady: function () {},
  onShow: function () {},
  onHide: function () {},
  onUnload: function () {},
  onPullDownRefresh: function () {},
  onReachBottom: function () {},
  onShareAppMessage: function () {},
});
