var a = getApp();
a.BasePage({
  data: { couponData: null },
  onLoad: function (a) {
    this;
  },
  selectedClick: function (a) {
    var t = a.currentTarget.dataset.index;
    (this.data.couponData.coupon[t].selected ||
      this.data.couponData.couponAmount != this.data.couponData.maxAmount) &&
      ((this.data.couponData.coupon[t].selected =
        !this.data.couponData.coupon[t].selected),
      this.setData({ couponData: this.data.couponData }),
      this.initCouponSelected(),
      console.log("selectedClick ---\x3e>", a));
  },
  initCouponSelected: function () {
    var t = this.data.couponData.coupon,
      o = 0,
      n = 0;
    if (t) {
      for (var e in t)
        t[e].selected && ((o = parseFloat(o) + parseFloat(t[e].amount)), n++);
      o > this.data.couponData.maxAmount &&
        (o = this.data.couponData.maxAmount),
        (o = parseFloat(o).toFixed(2)),
        (this.data.couponData.couponAmount = o),
        this.setData({
          couponData: this.data.couponData,
          selectedCartCount: n,
        }),
        (a.globalData.couponData = this.data.couponData);
    }
  },
  onReady: function () {},
  onShow: function () {
    a.globalData.couponData &&
      this.setData({ couponData: a.globalData.couponData });
  },
  onHide: function () {},
  onUnload: function () {},
  onPullDownRefresh: function () {},
  onReachBottom: function () {},
  onShareAppMessage: function () {},
});
