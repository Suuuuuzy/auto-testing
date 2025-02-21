var t,
  a = getApp();
a.BasePage({
  data: { pageData: null, tabIndex: 0, locationData: null, scrollHeight: null },
  onLoad: function (o) {
    (t = this),
      (this.goodId = o.goodId),
      this.goodId && this.loadData(),
      a.globalData.locationData &&
        this.setData({ locationData: a.globalData.locationData }),
      a.globalData.location &&
        this.setData({ location: a.globalData.location });
  },
  loadData: function () {
    this.requestWithLoading(
      "group/groupGoodDetailPage",
      { goodId: this.goodId },
      function (a) {
        a && (t.setData({ pageData: a }), t.initShop(), t.initSwiper());
      }
    );
  },
  initShop: function () {
    var t = this.data.pageData.shop;
    console.log("location --\x3e>", this.data.location),
      t &&
        (t.lat &&
          t.lng &&
          this.data.location &&
          (t = this.location.initShopDistance(t, this.data.location)),
        console.log("shop --\x3e>", t),
        (this.data.pageData.shop = t),
        this.setData({ pageData: this.data.pageData }));
  },
  tabSelect: function (t) {
    var a = t.currentTarget.dataset.index;
    this.setData({ tabIndex: a }), this.initSwiper();
  },
  initSwiper: function () {
    var a = wx.createSelectorQuery();
    this.data.tabIndex;
    console.log("fuck u ${index}"),
      a
        .select("#sItem")
        .boundingClientRect(function (a) {
          var o = a.height,
            n = a.width;
          t.setData({ scrollHeight: o }),
            console.log("rHeight --\x3e>" + o + ",width --" + n);
        })
        .exec();
  },
  pageScrollChange: function (t) {
    console.log("swiper --\x3e>", t),
      this.setData({ tabIndex: t.detail.current }),
      this.initSwiper();
  },
  callPhone: function (t) {
    var a = t.currentTarget.dataset.phone;
    wx.makePhoneCall({ phoneNumber: a });
  },
  subBtn: function (a) {
    var o = this.user.getToken();
    console.log("token --\x3e>", o),
      o
        ? t.godPayPage()
        : this.user.callLogin(function (a) {
            a ? t.godPayPage() : t.failureToast();
          });
  },
  godPayPage: function () {
    wx.navigateTo({
      url:
        "../group-pay-page/group-pay-page?params=" +
        encodeURIComponent(
          JSON.stringify(this.data.pageData.goods[this.data.tabIndex])
        ),
    });
  },
  onReady: function () {},
  onShow: function () {},
  onHide: function () {},
  onUnload: function () {},
  onPullDownRefresh: function () {},
  onReachBottom: function () {},
  onShareAppMessage: function () {},
});
