Page({
  data: { dataList: [], showAd: !1, fontAd: "" },
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
      dataList: wx.getStorageSync("charastLists")
        ? wx.getStorageSync("charastLists")
        : [],
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
  toDetail: function (t) {
    console.log(t.currentTarget.dataset.item),
      console.log("跳转"),
      wx.navigateTo({
        url: "./charact_detail?text=" + t.currentTarget.dataset.item.text,
      });
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
