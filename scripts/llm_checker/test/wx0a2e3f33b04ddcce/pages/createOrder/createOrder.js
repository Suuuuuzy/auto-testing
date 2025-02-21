var a = getApp();
Page({
  data: {
    defaultFoodUrl: "/assets/img/default-food.png",
    orderData: [],
    totalPrice: 0,
  },
  onLoad: function (t) {
    this.setData({
      orderData: a.globalData.shoppingCart,
      totalPrice: a.globalData.totalPrice,
    });
  },
  createOrder: function (t) {
    for (var e = [], o = 0; o < this.data.orderData.length; o++)
      e.push({
        itemId: this.data.orderData[o].itemId,
        versionPrice: this.data.orderData[o].item.versionPrice,
        versionDescription: this.data.orderData[o].item.versionDescription,
        date: this.data.orderData[o].date,
        count: this.data.orderData[o].count,
      });
    var r = {
      url: "".concat(a.globalData.takeaway, "/takeaway/order/submit"),
      method: "POST",
      data: { companyId: this.data.orderData[0].item.companyId, itemList: e },
      successCallback: function (t) {
        if (200 === t.data.resultCode) {
          (a.globalData.shoppingCart = []), (a.globalData.totalPrice = 0);
          var e = t.data.data.orderId;
          wx.navigateTo({
            url: "/pages/payOrder/payOrder",
            success: function (a) {
              a.eventChannel.emit("acceptDataFromOpenerPage", { orderId: e });
            },
          });
        } else
          wx.showToast({
            title: t.data.resultMessage,
            icon: "none",
            duration: 2e3,
          });
      },
    };
    a.request(r);
  },
  onReady: function () {},
  onShow: function () {},
  onHide: function () {},
  onUnload: function () {},
  onPullDownRefresh: function () {},
});
