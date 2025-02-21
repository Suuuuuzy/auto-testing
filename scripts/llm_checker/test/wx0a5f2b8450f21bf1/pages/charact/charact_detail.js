Page({
  data: { text: "", showAd: !1, fontAd: "" },
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
      text: t.text,
      fontAd: getApp().globalData.toolAd,
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
  sxb: function () {
    wx.setClipboardData({ data: this.data.text });
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
