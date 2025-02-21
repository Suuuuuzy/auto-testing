Page({
  data: { list: [], ad_ys_ny: "" },
  onLoad: function (t) {
    this.setData({ list: wx.getStorageSync("userlog") });
  },
  onReady: function () {},
  copyText: function (t) {
    wx.setClipboardData({
      data: t.currentTarget.dataset.item,
      success: function (t) {
        console.log("复制成功");
      },
    });
  },
  cleanLs() {
    var t = this;
    wx.showModal({
      title: "是否清空历史记录？",
      showCancel: !0,
      cancelText: "取消",
      cancelColor: "#80848f",
      confirmText: "确定",
      confirmColor: "#ed3f14",
      success: function (e) {
        e.cancel
          ? console.log("取消")
          : wx.removeStorage({
              key: "userlog",
              success: function (e) {
                console.log(e),
                  t.setData({ list: [] }),
                  wx.showToast({
                    title: "历史记录已清空！",
                    icon: "none",
                    duration: 2e3,
                  }),
                  setTimeout(function () {
                    wx.hideToast({});
                  }, 2e3);
              },
            });
      },
      fail: function (t) {},
      complete: function (t) {},
    });
  },
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
