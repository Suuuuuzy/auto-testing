var a,
  o = getApp();
o.BasePage({
  data: {
    updateLoading: !1,
    isAllLoaded: !1,
    goodScrollHeight: 0,
    showWaterfall01: !0,
  },
  onLoad: function (o) {
    (a = this),
      (this.page = 1),
      (this.areaId = o.areaId),
      console.log("areaId --\x3e>", this.areaId),
      this.loadGoods();
  },
  loadGoods: function () {
    o.globalData.selectArea &&
      ((this.data.noMore = !1),
      this.requestWithLoading(
        "shop/getCouponGoods",
        { areaId: this.areaId, page: this.page },
        function (o) {
          if (o) {
            if (
              (o.total == o.to || 0 == o.total
                ? a.setData({ noMore: !0 })
                : a.setData({ noMore: !1 }),
              o &&
                o.data.length > 0 &&
                o.data.forEach(function (o) {
                  o.shop = a.initShop(o.shop);
                }),
              1 == a.page)
            )
              a.setData({ goodsData: o });
            else {
              var t = a.data.goodsData.data.concat(o.data);
              (o.data = t), a.setData({ goodsData: o });
            }
            a.page++;
          }
        }
      ));
  },
  initShop: function (a) {
    if (a) {
      var t = o.globalData.location;
      t && (a = this.location.initShopDistance(a, t)),
        0 == a.zan_count && 0 == a.cha_count
          ? (a.stars = 5)
          : (a.stars = (
              (a.zan_count / (a.zan_count + a.cha_count)) *
              5
            ).toFixed(1));
    }
    return a;
  },
  goodItemClick: function (a) {
    var o = a.currentTarget.dataset.item;
    o &&
      wx.navigateTo({
        url:
          "/pages/home/mall/mall-home?shopId=" + o.shop.id + "&goodId=" + o.id,
      });
  },
  onReady: function () {},
  onShow: function () {},
  onHide: function () {},
  onUnload: function () {},
  onPullDownRefresh: function () {},
  onReachBottom: function () {
    this.data.noMore || this.loadGoods();
  },
  onShareAppMessage: function () {
    var a = this.data.Str.todaysCoupon[this.data.lanIndex];
    return {
      title: a,
      path:
        "/pages/home/shop/shop-goods/shop-goods?areaId=" +
        this.areaId +
        "&title=" +
        a,
    };
  },
});
