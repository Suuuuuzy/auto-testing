Page({
  data: {},
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
    console.log(getApp().globalData.fwqurl);
    var a = this;
    wx.request({
      url: getApp().globalData.fwqurl + "/GetYqList",
      data: { uid: getApp().globalData.uid, sid: getApp().globalData.sid },
      header: { "content-type": "application/json" },
      success(t) {
        console.log(t.data.data),
          (a.withdrawList = t.data.data.data),
          (a.keyong = t.data.data.keyong),
          (a.song = t.data.data.song),
          a.setData({
            withdrawList: a.withdrawList,
            keyong: a.keyong,
            song: a.song,
          });
      },
    });
  },
  onReady: function () {},
  onShow: function () {},
  onHide: function () {},
  onUnload: function () {},
  onPullDownRefresh: function () {},
  onReachBottom: function () {},
  onShareTimeline: function () {
    var t = wx.getStorageSync("id");
    return {
      title: this.data.noticedetail[0].title,
      query: "id= " + t,
      imageUrl: this.data.noticedetail[0].thumb,
    };
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
});
