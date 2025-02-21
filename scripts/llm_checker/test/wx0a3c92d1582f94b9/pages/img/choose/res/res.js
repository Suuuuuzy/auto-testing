var e = getApp();
Page({
  data: { img: "", w: 0, h: 0, isSeo: !0, adState: !1, ad_video: e.video },
  onLoad: function (i) {
    this.setData({ imgshow: i.url, img: i.url, isSeo: !!i.seo }),
      !i.seo && e.userinfo.level;
  },
  showImg: function () {
    wx.previewImage({ current: "", urls: [this.data.img] });
  },
  saveImg: function () {
    var e = this;
    wx.showLoading({ title: "保存中..." }),
      console.log(e.data.img),
      wx.saveImageToPhotosAlbum({
        filePath: e.data.img,
        success: function (e) {
          wx.showToast({ title: "保存成功", mask: !0 });
        },
        fail: function () {
          wx.hideLoading(),
            wx.previewImage({ current: "", urls: [e.data.img] });
        },
      });
  },
  onShareAppMessage: function (e) {
    return {
      title: "苹果用这个拼长图|长截图超好用，真心推荐！",
      path: "/pages/img/img?type=8777",
      imageUrl: "/images/icon-choose.jpg",
    };
  },
});
