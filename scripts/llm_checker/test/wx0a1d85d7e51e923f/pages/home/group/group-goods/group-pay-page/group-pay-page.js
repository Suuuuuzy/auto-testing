var t;
getApp().BasePage({
  data: {
    goodItem: null,
    goodCount: 1,
    formData: {
      goodCount: 1,
      totalFee: 0,
      discountFee: 0,
      actualFee: 0,
      areaId: "",
      shopId: "",
      good: null,
      couponFee: 0,
    },
  },
  onLoad: function (a) {
    t = this;
    var o = decodeURIComponent(a.params),
      e = JSON.parse(o);
    e &&
      ((this.data.formData.good = e),
      (this.data.formData.shopId = e.shop_id),
      this.setData({ goodItem: e, formData: this.data.formData })),
      wx.setNavigationBarTitle({
        title: this.data.Str.submitOrder[this.data.lanIndex],
      }),
      this.initPrice(),
      console.log("goodPrams --\x3e>", e);
  },
  removeBtn: function (t) {
    this.data.formData.goodCount <= 1 ||
      (this.data.formData.goodCount--,
      this.setData({ formData: this.data.formData }),
      this.initPrice());
  },
  addBtn: function (t) {
    console.log("addBtn --\x3e>"),
      this.data.formData.goodCount++,
      this.setData({ formData: this.data.formData }),
      this.initPrice();
  },
  initPrice: function () {
    this.data.goodItem &&
      ((this.data.formData.totalFee = parseFloat(
        this.data.goodItem.price * this.data.formData.goodCount
      ).toFixed(2)),
      (this.data.formData.discountFee = parseFloat(
        this.data.formData.totalFee -
          this.data.goodItem.activity_price * this.data.formData.goodCount +
          this.data.formData.couponFee
      ).toFixed(2)),
      (this.data.formData.actualFee = parseFloat(
        this.data.formData.totalFee - this.data.formData.discountFee
      ).toFixed(2)),
      this.setData({ formData: this.data.formData }));
  },
  subBtn: function (a) {
    console.log("subBtn --\x3e>", this.data.formData),
      this.requestWithLoading(
        "group/createGroupOrder",
        { formData: JSON.stringify(this.data.formData) },
        function (a) {
          a ? t.pay(a.id) : t.failureToast();
        }
      );
  },
  pay: function (a) {
    this.requestWithLoading("order/payOrderFee", { orderId: a }, function (a) {
      a &&
        wx.requestPayment({
          timeStamp: a.timestamp,
          nonceStr: a.nonceStr,
          package: a.package,
          signType: a.signType,
          paySign: a.paySign,
          success: function () {
            t.showToast(
              {
                content: t.data.Str.takeOrderSuccess[t.data.lanIndex],
                icon: "success",
                color: "cyan",
              },
              function (t) {}
            );
          },
          fail: function (a) {
            console.log(a), t.failureToast();
          },
        });
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
