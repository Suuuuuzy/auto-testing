getApp();
Page({
  data: { orderDetail: null, result: 1, resultMessage: null },
  onLoad: function (e) {
    var n = this;
    this.getOpenerEventChannel().on("acceptDataFromOpenerPage", function (e) {
      n.setData({
        orderDetail: e.orderDetail,
        result: e.result,
        resultMessage: e.resultMessage || "",
      });
    });
  },
  toDelivery: function () {
    wx.switchTab({ url: "/pages/delivery/delivery" });
  },
  onReady: function () {},
  onShow: function () {},
  onHide: function () {},
  onUnload: function () {},
  onPullDownRefresh: function () {},
});
