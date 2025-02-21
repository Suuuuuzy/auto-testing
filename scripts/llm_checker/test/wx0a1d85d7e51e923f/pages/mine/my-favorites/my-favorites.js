var t,
  a = getApp();
a.BasePage({
  data: {},
  onLoad: function (a) {
    t = this;
  },
  laodData: function () {
    this.requestWithLoading("shop/getFavoritePage", {}, function (a) {
      a && (a.data.length, t.setData({ pageData: a }));
    });
  },
  initShops: function (n) {
    if (n && n.length > 0) {
      var o = this.data.pageData.setting.has_cash_cart,
        e = this.data.pageData.setting.cash_cart_percent;
      for (var i in n) {
        var c = a.globalData.location;
        if (
          (c && (n[i] = this.location.initShopDistance(n[i], c)),
          n[i].created_at)
        )
          t.tool.dateDifference(n[i].created_at) < 30 && (n[i].is_new = !0);
        (n[i].coupon_percent = o ? e : Math.round(n[i].takeaway_percent / 3)),
          0 == n[i].zan_count && 0 == n[i].zan_count
            ? (n[i].stars = 5)
            : (n[i].stars = (
                (n[i].zan_count / (n[i].zan_count + n[i].cha_count)) *
                5
              ).toFixed(1));
      }
    }
    return n;
  },
  onReady: function () {},
  onShow: function () {
    this.laodData();
  },
  onHide: function () {},
  onUnload: function () {},
  onPullDownRefresh: function () {
    this.laodData();
  },
  onReachBottom: function () {},
  onShareAppMessage: function () {},
});
