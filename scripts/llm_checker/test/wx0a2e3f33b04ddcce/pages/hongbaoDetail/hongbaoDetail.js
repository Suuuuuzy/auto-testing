var t;
(t = require("../../components/vant/toast/toast")) && t.__esModule;
var a = getApp();
Page({
  data: { pageNum: 1, redPacketId: null, detailsData: [] },
  handlerGobackClick: function () {
    getCurrentPages().length >= 2
      ? wx.navigateBack({ delta: 1 })
      : wx.navigateTo({ url: "/pages/card/card" });
  },
  getDetails: function () {
    var t = this,
      e = {
        url: "".concat(a.globalData.mgmt, "/redPacket/user/rpList/detail"),
        method: "GET",
        data: {
          pageNum: this.data.pageNum,
          pageSize: 50,
          redPacketId: this.data.redPacketId,
        },
        successCallback: function (a) {
          200 === a.data.resultCode &&
            ((t.data.detailsData = t.data.detailsData.concat(a.data.data)),
            t.setData({
              detailsData: t.data.detailsData,
              totalPage: a.data.totalPage,
            }),
            t.data.detailsData.forEach(function (a) {
              (a.orderType = t.formatterType(a)),
                (a.formatterFee = t.formatterFee(a));
            }),
            t.setData({ detailsData: t.data.detailsData }));
        },
      };
    a.request(e);
  },
  formatterType: function (t) {
    return {
      1: "消费",
      2: "扣款",
      3: "外卖消费",
      4: "消费红包退款",
      5: "外卖退款",
      6: "红包失效",
      7: "红包过期",
    }[t.type];
  },
  formatterFee: function (t) {
    return t.fee
      ? 4 === t.type || 5 === t.type
        ? "+".concat(t.fee.toFixed(2))
        : "-".concat(t.fee.toFixed(2))
      : 0;
  },
  onLoad: function (t) {
    var e = this;
    wx.getStorageSync("userInfo");
    console.log(a.globalSystemInfo),
      this.setData({ detailHeight: a.globalSystemInfo.navBarHeight + 4 }),
      this.getOpenerEventChannel().on("hongbaoDetail", function (t) {
        e.setData({ redPacketId: t.redpacketId }), e.getDetails();
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
