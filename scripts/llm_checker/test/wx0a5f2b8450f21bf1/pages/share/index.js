!(function () {
  getApp();
  Page({
    data: { keyong: "", videoAdAfter: "" },
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
    invite: function () {
      wx.navigateTo({ url: "../lists/lists" });
    },
    onLoad: function (t) {
      var e = this;
      e.setData({ videoAdAfter: getApp().globalData.videoAdAfter }),
        wx.request({
          url: getApp().globalData.fwqurl + "/GetYqList",
          data: { uid: getApp().globalData.uid, sid: getApp().globalData.sid },
          success: function (t) {
            e.setData({ keyong: t.data.data.keyong });
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
})();
