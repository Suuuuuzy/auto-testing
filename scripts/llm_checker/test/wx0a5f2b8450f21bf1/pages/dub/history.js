Page({
  data: { dataList: [], showAd: !1, picToTextAd: "" },
  onShareAppMessage: function (t) {
    return {
      title: getApp().globalData.shareTitle,
      path: "/pages/index/index?openid=" + getApp().globalData.openid,
      imageUrl: getApp().globalData.sharePic,
    };
  },
  onShareTimeline: function () {
    var t = wx.getStorageSync("id");
    return {
      title: this.data.noticedetail[0].title,
      query: "id= " + t,
      imageUrl: this.data.noticedetail[0].thumb,
    };
  },
  onLoad: function (t) {
    this.setData({
      dataList: wx.getStorageSync("dubLists")
        ? wx.getStorageSync("dubLists")
        : [],
      picToTextAd: getApp().globalData.toolAd,
      showAd: !0,
    });
  },
  onReady: function () {},
  onShow: function () {},
  onHide: function () {},
  onUnload: function () {},
  onPullDownRefresh: function () {},
  onReachBottom: function () {},
  onShareAppMessage: function () {},
  setclip: function (t) {
    wx.setClipboardData({ data: t.currentTarget.dataset.url });
  },
  onShareAppMessage: function (t) {
    return (
      t.from,
      {
        title: getApp().globalData.shareTitle,
        path: "/pages/index/index?openid=" + getApp().globalData.openid,
        imageUrl: getApp().globalData.sharePic,
      }
    );
  },
  onShareTimeline: function () {
    var t = wx.getStorageSync("id");
    return {
      title: this.data.noticedetail[0].title,
      query: "id= " + t,
      imageUrl: this.data.noticedetail[0].thumb,
    };
  },
});
