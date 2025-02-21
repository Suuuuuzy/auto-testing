var t,
  e =
    (t = require("../../assets/lib/dayjs.min.js")) && t.__esModule
      ? t
      : { default: t };
var a = getApp(),
  r = require("../../assets/lib/wx-formdata/formData.js");
Page({
  data: {
    active: "1",
    orderList: [],
    defaultFoodUrl: "/assets/img/default-food.png",
    resData: [],
    pageNum: 1,
    totalPage: 1,
  },
  onChange: function (t) {},
  onLoad: function (t) {},
  onReady: function () {},
  onShow: function () {
    this.getOrderList();
  },
  onHide: function () {},
  onUnload: function () {},
  onPullDownRefresh: function () {},
  changeTab: function (t) {
    this.setData({ active: t.detail.name }), this.getOrderList();
  },
  getOrderList: function () {
    var t = this,
      e = new r();
    e.append("accountNum", a.globalData.userInfo.user.phone),
      e.append("orderState", this.data.active);
    var n = e.getData(),
      o = {
        url: "".concat(
          a.globalData.takeaway,
          "/api/takeaway/order/findOrderList"
        ),
        method: "POST",
        header: { "content-type": n.contentType },
        data: n.buffer,
        successCallback: function (e) {
          if (200 === e.data.resultCode) {
            var a = e.data.data;
            a.forEach(function (e) {
              (e.title = t.formatterTitle(e)),
                (e.orderTime = t.formatterOrderTime(e)),
                (e.countDown = t.countDown(e));
            });
            var r = a.slice(0, 10),
              n = Math.ceil(a.length / 10);
            t.setData({ orderList: r, resData: a, pageNum: 1, totalPage: n });
          } else t.setData({ orderList: [] });
        },
      };
    a.request(o);
  },
  formatterTitle: function (t) {
    return "".concat(t.itemName, " 等").concat(t.itemCount, "件商品");
  },
  formatterOrderTime: function (t) {
    return (0, e.default)(t.createTime).format("YYYY-MM-DD HH:mm:ss");
  },
  countDown: function (t) {
    var e = t.createTime.replace(/-/g, "/"),
      a = new Date().getTime(),
      r = new Date(e).getTime() + 18e5 - a;
    return r < 0 && (r = 0), r;
  },
  onReachBottom: function () {
    if (this.data.pageNum < this.data.totalPage) {
      var t = this.data.pageNum + 1,
        e = this.data.resData.slice(10 * this.data.pageNum, 10 * t),
        a = this.data.orderList.concat(e);
      this.setData({ pageNum: t, orderList: a });
    }
  },
  pay: function (t) {
    var e = t.currentTarget.dataset.item.orderId;
    wx.navigateTo({
      url: "/pages/payOrder/payOrder",
      success: function (t) {
        t.eventChannel.emit("acceptDataFromOpenerPage", { orderId: e });
      },
    });
  },
  cancel: function (t) {
    var e = this,
      r = t.currentTarget.dataset.item,
      n = {
        url: "".concat(a.globalData.takeaway, "/takeaway/order/withdraw"),
        method: "POST",
        data: { orderId: r.orderId },
        successCallback: function (t) {
          200 === t.data.resultCode
            ? (wx.showToast({
                title: "订单取消成功",
                icon: "success",
                duration: 2e3,
              }),
              e.getOrderList())
            : wx.showToast({
                title: t.data.resultMessage,
                icon: "none",
                duration: 2e3,
              });
        },
      };
    a.request(n);
  },
  toDetail: function (t) {
    var e = t.currentTarget.dataset.item;
    wx.navigateTo({
      url: "/pages/orderDetail/orderDetail",
      success: function (t) {
        t.eventChannel.emit("acceptDataFromOpenerPage", { detail: e });
      },
    });
  },
});
