var t;
(t = require("../../components/vant/toast/toast")) && t.__esModule;
var a = getApp();
Page({
  data: { cardId: null, active: 0, pageNum: 1, hongbaoList: [] },
  handlerGobackClick: function () {
    getCurrentPages().length >= 2
      ? wx.navigateBack({ delta: 1 })
      : wx.navigateTo({ url: "/pages/card/card" });
  },
  changeTab: function (t) {
    this.setData({ active: t.detail.name }), this.getHongbaoList();
  },
  getHongbaoList: function () {
    var t = this,
      e = {
        url: "".concat(a.globalData.mgmt, "/redPacket/user/rpList"),
        method: "GET",
        data: {
          pageNum: this.data.pageNum,
          pageSize: 50,
          cardId: this.data.cardId,
          invalidState: this.data.active,
        },
        successCallback: function (a) {
          200 === a.data.resultCode &&
            (t.setData({ hongbaoList: a.data.data }),
            t.data.hongbaoList.forEach(function (a) {
              (a.createTime = a.createTime.substring(0, 10)),
                (a.statusText = t.formatterStatus(a));
            }),
            t.setData({ hongbaoList: t.data.hongbaoList }));
        },
      };
    a.request(e);
  },
  formatterStatus: function (t) {
    return { 2: "已使用", 3: "已失效", 4: "已过期" }[t.status];
  },
  toDetail: function (t) {
    console.log(t);
    var a = t.currentTarget.dataset.item.redpacketId;
    wx.navigateTo({
      url: "/pages/hongbaoDetail/hongbaoDetail",
      success: function (t) {
        t.eventChannel.emit("hongbaoDetail", { redpacketId: a });
      },
    });
  },
  onLoad: function (t) {
    var e = this;
    wx.getStorageSync("userInfo");
    console.log(a.globalSystemInfo),
      this.setData({ detailHeight: a.globalSystemInfo.navBarHeight + 4 }),
      this.getOpenerEventChannel().on("detailsInfo", function (t) {
        e.setData({ cardId: t.id }), e.getHongbaoList();
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
