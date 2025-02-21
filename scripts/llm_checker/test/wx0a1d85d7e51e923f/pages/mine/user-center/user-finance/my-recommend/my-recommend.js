var t;
getApp().BasePage({
  data: {},
  onLoad: function (e) {
    (t = this), this.loadData();
  },
  loadData: function () {
    this.requestWithLoading("userCenter/getRecommendImg", {}, function (e) {
      e && t.setData({ pageData: e });
    });
  },
  downBtn: function (t) {
    var e = t.currentTarget.dataset.url;
    e &&
      wx.downloadFile({
        url: e,
        success: function (t) {
          wx.saveImageToPhotosAlbum({
            filePath: t.tempFilePath,
            success: function (t) {
              wx.showToast({
                title: "保存成功",
                icon: "success",
                duration: 2e3,
              });
            },
          });
        },
      });
  },
  viewImg: function (t) {
    var e = t.currentTarget.dataset.index;
    console.log("index --\x3e>", e),
      wx.previewImage({
        urls: this.data.pageData.images,
        current: this.data.pageData.images[e],
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
