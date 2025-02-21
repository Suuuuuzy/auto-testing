var a,
  t =
    (a = require("../../assets/lib/dayjs.min.js")) && a.__esModule
      ? a
      : { default: a };
var e = getApp();
Page({
  data: {
    flag: !0,
    refresh: !1,
    dishName: null,
    dishId: null,
    cardId: null,
    pageNum: 1,
    totalPage: 0,
    detailsData: [],
    totalRecords: 0,
  },
  onLoad: function () {
    var a = this;
    this.setData({ detailHeight: e.globalSystemInfo.navBarHeight + 4 }),
      this.getOpenerEventChannel().on("rate", function (t) {
        a.setData({ dishName: t.dishName, dishId: t.dishId, cardId: t.cardId }),
          a.data.flag && (a.getRate(), a.setData({ flag: !1 }));
      });
  },
  onShow: function () {
    this.data.flag ||
      (this.data.refresh &&
        (this.setData({ pageNum: 1, detailsData: [] }), this.getRate()));
  },
  onReachBottom: function () {
    var a = 0;
    0 !== this.data.totalPage &&
      this.data.totalPage !== this.data.pageNum &&
      ((a = this.data.pageNum + 1),
      this.setData({ pageNum: a }),
      this.getRate());
  },
  handlerGobackClick: function () {
    getCurrentPages().length >= 2
      ? wx.navigateBack({ delta: 1 })
      : wx.navigateTo({ url: "/pages/card/card" });
  },
  toRating: function () {
    var a = this.data.dishName,
      t = this.data.dishId,
      e = this.data.cardId;
    wx.navigateTo({
      url: "/pages/rating/rating",
      success: function (i) {
        i.eventChannel.emit("rating", { dishName: a, dishId: t, cardId: e });
      },
    });
  },
  getRate: function () {
    var a = this;
    console.log(this.data);
    var t = {
      url: "".concat(
        e.globalData.mgmt,
        "/DishesEvaluate/queryOneDishesEvaluation"
      ),
      method: "GET",
      data: {
        pageNum: this.data.pageNum,
        pageSize: 20,
        dishId: this.data.dishId,
      },
      successCallback: function (t) {
        200 === t.data.resultCode &&
          ((a.data.detailsData = a.data.detailsData.concat(t.data.data)),
          a.setData({
            detailsData: a.data.detailsData,
            totalRecords: t.data.totalRecords,
            totalPage: t.data.totalPage,
          }),
          a.data.detailsData.forEach(function (t) {
            (t.createTime = a.formatterTime(t)),
              (t.accountName = t.accountName
                ? t.accountName.substring(0, 1) + "**"
                : "--");
          }),
          a.setData({ detailsData: a.data.detailsData }));
      },
    };
    e.request(t);
  },
  formatterTime: function (a) {
    return (0, t.default)(a.createTime).format("YYYY-MM-DD HH:mm");
  },
  onReady: function () {},
  onHide: function () {},
  onUnload: function () {},
  onPullDownRefresh: function () {},
  onShareAppMessage: function () {},
});
