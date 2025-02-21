var a,
  e,
  t = getApp(),
  s = require("../../../utils/smartDraw");
Page({
  data: { cWidth: 0, cHeight: 0, images: [], mode: "", seo: "", showModal: !1 },
  onLoad: function (s) {
    (a = t.images),
      (e = s.mode),
      this.setData({ images: a, mode: e, seo: s.seo ? 1 : 0 });
  },
  addImage: function () {
    var e = this;
    wx.chooseImage({
      count: 9 - a.length,
      sourceType: ["album"],
      sizeType: ["compressed"],
      success: function (t) {
        (a = a.concat(t.tempFilePaths)), e.setData({ images: a });
      },
    });
  },
  removeImage: function (e) {
    var t = e.target.dataset.tapId;
    console.log("remove id:" + t), a.splice(t, 1), this.setData({ images: a });
  },
  checkImg: function (a) {
    var e = this;
    wx.uploadFile({
      url: "https://api123.ddfans.com/zbapi/zbCheak.php",
      filePath: e.data.images[a],
      name: "content",
      formData: { type: "imgCheck" },
      success: function (t) {
        (t.data = JSON.parse(t.data)),
          "1" == t.data.code
            ? a < e.data.images.length - 1
              ? ((a += 1), e.checkImg(a))
              : (wx.showLoading({ title: "拼接中...", mask: !0 }), e.smartSew())
            : wx.showToast({
                title: t.data.msg + ",请重新上传",
                icon: "none",
                mask: !0,
              });
      },
      fail: function (a) {
        wx.showToast({ title: "请求出错！", icon: "none", mask: !0 });
      },
    });
  },
  sewNow: function () {
    switch (e) {
      case "smart":
        wx.showLoading({ title: "检测图片", mask: !0 }), this.checkImg(0);
        break;
      case "column":
        this.columnSew();
        break;
      case "row":
        this.rowSew();
        break;
      case "lines":
        this.linesSew();
    }
  },
  smartSew: function () {
    var a = this;
    s(
      {
        canvasId: "canvas",
        images: this.data.images,
        watermark:
          "https://apis.ddfans.com/bian/public/static/image/qsy/stamp.png",
      },
      this
    )
      .then(function (e) {
        wx.hideLoading(),
          console.log(e),
          wx.navigateTo({
            url: "./res/res?url=" + e + (a.data.seo ? "&seo=1" : ""),
          });
      })
      .catch(function (a) {
        console.log("err", a),
          "size error" == a.type
            ? wx.showToast({ title: "请选择同样尺寸的图片哦", icon: "none" })
            : wx.showToast({
                title: "好像出了点问题，请稍后再试哦~",
                icon: "none",
              });
      });
  },
  columnSew: function () {
    (t.images = this.data.images),
      wx.navigateTo({ url: "../edit/edit?mode=column" });
  },
  rowSew: function () {
    (t.images = this.data.images),
      wx.navigateTo({ url: "../edit/edit?mode=row" });
  },
  linesSew: function () {
    (t.images = this.data.images),
      wx.navigateTo({ url: "../edit/edit?mode=lines" });
  },
  toTaskPage: function () {
    wx.navigateTo({ url: "/pages/task/task" });
  },
});
