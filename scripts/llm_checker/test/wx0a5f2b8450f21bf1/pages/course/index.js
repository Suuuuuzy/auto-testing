Page({
  data: { ad: wx.getStorageSync("ad"), videoAdAfter: "" },
  onLoad: function (e) {
    this.setData({ videoAdAfter: getApp().globalData.videoAdAfter });
  },
  onReady: function () {},
  onShow: function () {},
  onHide: function () {},
  onUnload: function () {},
  onPullDownRefresh: function () {},
  onReachBottom: function () {},
  onShareAppMessage: function () {
    return {
      title: wx.getStorageSync("index").share_title,
      path: "pages/index/index?id=" + wx.getStorageSync("id"),
      imageUrl: wx.getStorageSync("index").share_image,
    };
  },
  onShareTimeline: function () {
    return {
      title: wx.getStorageSync("index").share_title,
      path: "pages/index/index?id=" + wx.getStorageSync("id"),
      imageUrl: wx.getStorageSync("index").share_image,
    };
  },
});
