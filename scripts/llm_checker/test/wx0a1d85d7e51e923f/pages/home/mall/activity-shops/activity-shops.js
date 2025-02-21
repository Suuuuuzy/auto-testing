var t,
  a = getApp();
a.BasePage({
  data: {},
  onLoad: function (a) {
    (this.page = 1),
      (this.shopId = a.shopId),
      wx.setNavigationBarTitle({
        title: this.data.Str.Promotions[this.data.lanIndex],
      }),
      console.log("activityShops --\x3e>", this.shopId),
      (t = this),
      this.loadShops();
  },
  loadShops: function () {
    a.globalData.selectArea &&
      ((this.data.noMore = !1),
      this.requestWithLoading(
        "shop/getActivityShops",
        {
          areaId: a.globalData.selectArea.id,
          page: this.page,
          shopId: this.shopId,
        },
        function (a) {
          if (a) {
            if (
              (a.total == a.to || 0 == a.total
                ? t.setData({ noMore: !0 })
                : t.setData({ noMore: !1 }),
              a &&
                a.data.length > 0 &&
                a.data.forEach(function (a) {
                  a = t.initShop(a);
                }),
              1 == t.page)
            )
              t.setData({ shopsData: a });
            else {
              var o = t.data.shopsData.data.concat(a.data);
              (a.data = o), t.setData({ shopsData: a });
            }
            t.page++;
          }
        }
      ));
  },
  initShop: function (t) {
    if (t) {
      var o = a.globalData.location;
      o && (t = this.location.initShopDistance(t, o)),
        0 == t.zan_count && 0 == t.cha_count
          ? (t.stars = 5)
          : (t.stars = (
              (t.zan_count / (t.zan_count + t.cha_count)) *
              5
            ).toFixed(1));
    }
    return t;
  },
  onReady: function () {},
  onShow: function () {},
  onHide: function () {},
  onUnload: function () {},
  onPullDownRefresh: function () {},
  onReachBottom: function () {
    this.data.noMore || this.loadShops();
  },
});
