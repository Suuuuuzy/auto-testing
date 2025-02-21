require("../../@babel/runtime/helpers/Arrayincludes");
var a,
  t = require("../../assets/js/util.js"),
  e =
    (a = require("../../components/vant/toast/toast")) && a.__esModule
      ? a
      : { default: a };
var r = getApp();
Page({
  data: {
    currentDate: new Date().getTime(),
    minDate: new Date(2020, 0, 1).getTime(),
    displayDate: "",
    paramsDate: "",
    cardId: null,
    detailsData: [],
    moneyColor: "black",
    pageNum: 1,
    totalPage: 0,
    detailHeight: 0,
    isDisabled: !1,
  },
  handlerGobackClick: function () {
    getCurrentPages().length >= 2
      ? wx.navigateBack({ delta: 1 })
      : wx.navigateTo({ url: "/pages/card/card" });
  },
  onSelect: function (a) {
    var e = new Date(a.detail);
    this.setData({
      pageNum: 1,
      paramsDate: (0, t.dateFormat)(e, "yyyy-MM-01 00:00:00"),
      displayDate: (0, t.dateFormat)(e, "yyyy年MM月"),
    }),
      this.selectComponent("#pickDate").toggle(),
      this.setData({ detailsData: [] }),
      this.getDetails();
  },
  getDetails: function () {
    var a = this,
      t = {
        url: "".concat(r.globalData.user, "/userCard/queryCardOrderInfo"),
        method: "POST",
        data: {
          pageNum: this.data.pageNum,
          pageSize: 12,
          cardId: this.data.cardId,
          createTime: this.data.paramsDate,
        },
        successCallback: function (t) {
          200 === t.data.resultCode &&
            ((a.data.detailsData = a.data.detailsData.concat(t.data.data)),
            a.setData({
              detailsData: a.data.detailsData,
              totalPage: t.data.totalPage,
            }),
            a.data.detailsData.forEach(function (t) {
              (t.method = a.formatterChangeMethod(t)),
                (t.status = a.formatterTradeState(t)),
                (t.createTimeFormat = a.formatterCreateTime(t)),
                (t.moneyFormat = a.formatterTotalFee(t));
            }),
            a.setData({ detailsData: a.data.detailsData }));
        },
      };
    r.request(t);
  },
  updateRechargeOrderState: function (a) {
    var t = this;
    this.setData({ isDisabled: !0 });
    var s = {
      url: "".concat(
        r.globalData.user,
        "/userCard/updateAppletRechargeOrderState"
      ),
      method: "POST",
      data: { outTradeNo: a.currentTarget.id },
      successCallback: function (a) {
        t.setData({ isDisabled: !1 }),
          200 === a.data.resultCode
            ? (e.default.success("订单状态已更新"),
              t.setData({ detailsData: [] }),
              t.setData({ pageNum: 1 }),
              t.getDetails())
            : 14202 === a.data.resultCode
            ? e.default.fail("订单未支付")
            : e.default.fail(a.data.resultMessage);
      },
    };
    r.request(s);
  },
  formatterChangeMethod: function (a) {
    return {
      0: "充值",
      1: "扣款",
      2: "退款",
      3: "消费",
      4: "微信充值",
      5: "补贴",
      6: "外卖消费",
      7: "外卖退款",
      8: "第三方扣款",
      9: "第三方充值",
      14: "第三方退款",
      10: "红包充值",
      11: "红包失效",
      12: "消费红包退款",
      13: "红包过期",
    }[Number(a.amountChangeMethod)];
  },
  formatterTradeState: function (a) {
    switch (Number(a.tradeState)) {
      case 0:
        return "待支付";
      case 1:
        return "支付成功";
      case 2:
        return "支付失败";
      default:
        return "--";
    }
  },
  formatterCreateTime: function (a) {
    return (0, t.dateFormat)(
      new Date(a.createTime.replace(/-/g, "/")),
      "MM月dd日 hh:mm"
    );
  },
  formatterTotalFee: function (a) {
    if (a.totalFee) {
      return [1, 3, 6, 8, 11, 13].includes(Number(a.amountChangeMethod))
        ? "-".concat(a.totalFee.toFixed(2))
        : "+".concat(a.totalFee.toFixed(2));
    }
    return 0;
  },
  onLoad: function (a) {
    var e = this;
    wx.getStorageSync("userInfo");
    console.log(r.globalSystemInfo),
      this.setData({ detailHeight: r.globalSystemInfo.navBarHeight + 4 }),
      (this.data.displayDate = (0, t.dateFormat)(
        new Date(this.data.currentDate),
        "yyyy年MM月"
      )),
      (this.data.paramsDate = (0, t.dateFormat)(
        new Date(this.data.currentDate),
        "yyyy-MM-01 00:00:00"
      )),
      this.setData({
        displayDate: this.data.displayDate,
        paramsDate: this.data.paramsDate,
      }),
      this.getOpenerEventChannel().on("detailsInfo", function (a) {
        e.setData({ cardId: a.id }), e.getDetails();
      });
  },
  onReady: function () {},
  onShow: function () {},
  onHide: function () {},
  onUnload: function () {},
  onPullDownRefresh: function () {},
  onReachBottom: function () {
    var a = 0;
    0 !== this.data.totalPage &&
      this.data.totalPage !== this.data.pageNum &&
      ((a = this.data.pageNum + 1),
      this.setData({ pageNum: a }),
      this.getDetails());
  },
  onShareAppMessage: function () {},
});
