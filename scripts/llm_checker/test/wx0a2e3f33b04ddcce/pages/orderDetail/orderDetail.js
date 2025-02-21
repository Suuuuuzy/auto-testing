var t = getApp();
Page({
  data: {
    orderInfo: null,
    orderDetail: null,
    orderItemDetail: [],
    orderState: null,
    orderStateFormatter: "",
    refund: null,
    countDown: null,
    pickupInfo: null,
  },
  onLoad: function (t) {
    var e = this;
    this.getOpenerEventChannel().on("acceptDataFromOpenerPage", function (t) {
      e.setData({ orderInfo: t.detail }), e.getOrderDetail(t.detail.orderId);
    });
  },
  getOrderDetail: function (e) {
    var a = this,
      r = {
        url: ""
          .concat(t.globalData.takeaway, "/api/takeaway/order/findOrderDetail/")
          .concat(e),
        method: "GET",
        data: {},
        successCallback: function (t) {
          if (200 === t.data.resultCode) {
            a.setData({ orderDetail: t.data.data.orderDetail });
            var e = a.data.orderDetail.orderState
              ? a.data.orderDetail.orderState
              : a.data.orderInfo.orderState;
            a.setData({
              orderState: e,
              orderStateFormatter: a.orderStateFormatter(e),
              refund: t.data.data.refund || null,
              countDown: a.countDown(t.data.data.orderDetail),
            });
            var r = a.data.orderDetail
              ? a.data.orderDetail.orderItemDetailDTOS
              : [];
            r.forEach(function (t) {
              t.pickupInfo = a.pickupInfo(t);
            }),
              a.setData({ orderItemDetail: r });
          }
        },
      };
    t.request(r);
  },
  orderStateFormatter: function (t) {
    switch (t) {
      case 1:
        return "未支付";
      case 2:
        return "已支付";
      case 3:
        return "已取消";
      case 4:
        return "已超时";
      case 6:
        return "已退款";
      default:
        return "";
    }
  },
  countDown: function (t) {
    var e = t.createTime.replace(/-/g, "/"),
      a = new Date().getTime(),
      r = new Date(e).getTime() + 18e5 - a;
    return r < 0 && (r = 0), r;
  },
  pickupInfo: function (t) {
    var e = t.pickupInfo;
    if (e) {
      var a,
        r = e.startDate ? "".concat(e.startDate) : "";
      if (e.startTime && e.endTime) {
        var n =
            2 === e.startTime.length
              ? "".concat(e.startTime, ":00")
              : e.startTime,
          o = 2 === e.endTime.length ? "".concat(e.endTime, ":00") : e.endTime;
        a = "".concat(n, "-").concat(o);
      } else a = "";
      return "".concat(r, " ").concat(a);
    }
    return "";
  },
  onReady: function () {},
  onShow: function () {},
  onHide: function () {},
  onUnload: function () {},
  onPullDownRefresh: function () {},
});
