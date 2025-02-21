var a,
  e =
    (a = require("../../assets/lib/dayjs.min.js")) && a.__esModule
      ? a
      : { default: a };
var t = getApp();
Page({
  data: {
    defaultFoodUrl: "/assets/img/default-food.png",
    orderDetail: null,
    orderData: [],
    companyId: "",
    totalPrice: 0,
    money: 0,
    flag: !0,
    payText: "立即支付",
    pointerEvents: "auto",
  },
  onLoad: function (a) {
    var e = this;
    this.getOpenerEventChannel().on("acceptDataFromOpenerPage", function (a) {
      var t = a.orderId;
      e.queryOrderDetail(t);
    });
  },
  queryOrderDetail: function (a) {
    var e = this,
      r = {
        url: ""
          .concat(t.globalData.takeaway, "/api/takeaway/order/findOrderDetail/")
          .concat(a),
        method: "GET",
        data: {},
        successCallback: function (a) {
          if (200 === a.data.resultCode) {
            e.setData({
              orderDetail: a.data.data.orderDetail,
              orderData: a.data.data.orderDetail.orderItemDetailDTOS,
            }),
              e.getWeekdays();
            var t = e.data.orderDetail.price;
            e.setData({ totalPrice: t.toFixed(2) }), e.queryUserCards();
          } else
            wx.showToast({
              title: a.data.resultMessage,
              icon: "none",
              duration: 2e3,
            });
        },
      };
    t.request(r);
  },
  getWeekdays: function () {
    var a = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"],
      t = this.data.orderData;
    t.forEach(function (t) {
      var r = (0, e.default)(t.date).day();
      t.weekday = a[r];
    }),
      this.setData({ orderData: t });
  },
  queryUserCards: function () {
    var a = this,
      e = {
        url: "".concat(t.globalData.user, "/userCard/queryUserCards"),
        method: "POST",
        data: { pageNum: 1, pageSize: 50 },
        successCallback: function (e) {
          if (200 === e.data.resultCode) {
            var t = e.data.data.find(function (e) {
                return e.id == a.data.orderDetail.cardId;
              }),
              r = t ? t.companyId : "";
            a.setData({ companyId: r });
            var o = t ? t.totalFee : 0;
            a.setData({ money: o.toFixed(2) });
            var n = o >= a.data.totalPrice;
            a.setData({ flag: n });
          } else
            wx.showToast({
              title: e.data.resultMessage,
              icon: "none",
              duration: 2e3,
            });
        },
      };
    t.request(e);
  },
  pay: function () {
    var a = this;
    this.setData({ payText: "支付中" }),
      this.setData({ pointerEvents: "none" });
    var e = this.data.orderDetail,
      r = {
        url: "".concat(t.globalData.takeaway, "/takeaway/order/pay"),
        method: "POST",
        data: {
          orderId: e.orderId,
          accountNum: t.globalData.userInfo.user.phone,
          cardId: e.cardId,
          companyId: this.data.companyId,
        },
        successCallback: function (t) {
          a.setData({ pointerEvents: "auto" }),
            200 === t.data.resultCode
              ? wx.navigateTo({
                  url: "/pages/payResult/payResult",
                  success: function (a) {
                    a.eventChannel.emit("acceptDataFromOpenerPage", {
                      orderDetail: e,
                      result: 1,
                    });
                  },
                })
              : wx.navigateTo({
                  url: "/pages/payResult/payResult",
                  success: function (a) {
                    a.eventChannel.emit("acceptDataFromOpenerPage", {
                      orderDetail: e,
                      result: 0,
                      resultMessage: t.data.resultMessage,
                    });
                  },
                });
        },
      };
    t.request(r);
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
