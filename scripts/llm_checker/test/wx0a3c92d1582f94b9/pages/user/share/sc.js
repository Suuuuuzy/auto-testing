var a = getApp();
Page({
  data: { appid: a.appid, parent_id: "", code: "" },
  onLoad: function (t) {
    wx.showShareMenu({ withShareTicket: !0 });
    var e = this;
    e.setData({ parent_id: t.parent_id });
    wx.showLoading({ title: "加载中...", mask: !0 }),
      a.postData(a.apiurl + "/user/onGetCode", {}, function (t) {
        a.base64src(t.data, function (a) {
          e.setData({ code: a });
        });
      });
  },
  onSaveImg: function () {
    var a = this;
    wx.showLoading({ title: "保存中！", mask: !0 }),
      wx.saveImageToPhotosAlbum({
        filePath: a.data.code,
        success: function (a) {
          wx.hideLoading(),
            wx.showToast({ title: "保存成功!", mask: !0, icon: "none" });
        },
        fail: function () {
          wx.hideLoading(), wx.previewImage({ current: "", urls: a.data.code });
        },
      });
  },
  onCopy: function () {
    wx.setClipboardData({
      data:
        this.data.appid +
        "\r\n/pages/watermark/watermark?parent_id=" +
        this.data.parent_id,
      success: function (a) {
        wx.showToast({ title: "文案复制成功", icon: "none" });
      },
    });
  },
  onShareAppMessage: function (a) {
    return {
      title: "短视频免费去水印",
      path:
        "/pages/watermark/watermark?type=8777&parent_id=" + this.data.parent_id,
      imageUrl:
        "https://apis.ddfans.com/bian/public/static/image/qsy/share.jpg",
    };
  },
});
