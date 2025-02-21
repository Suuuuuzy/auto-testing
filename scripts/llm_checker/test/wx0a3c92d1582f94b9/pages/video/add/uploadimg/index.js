var t,
  e =
    (t = require("../../../../utils/we-cropper/we-cropper.js")) && t.__esModule
      ? t
      : { default: t };
var i = wx.getSystemInfoSync(),
  a = i.windowWidth,
  o = i.windowHeight - 70;
Page({
  imgPath: "",
  data: {
    cropperOpt: { id: "cropper", width: a, height: o },
    width: "",
    height: "",
    opt: [],
  },
  onLoad: function (t) {
    this.setData({ opt: t }), t.url ? this.init(t.url) : this.uploadTap();
  },
  uploadTap: function () {
    var t = this;
    wx.chooseImage({
      count: 1,
      sizeType: ["original", "compressed"],
      sourceType: ["album", "camera"],
      success: function (e) {
        t.init(e.tempFilePaths[0]);
      },
    });
  },
  init: function (t) {
    var i = this,
      a = this;
    wx.getImageInfo({
      src: t,
      success: function (o) {
        if ("" == a.data.width) {
          var n = wx.getSystemInfoSync(),
            h = n.windowWidth,
            r = n.windowHeight - 70,
            s = a.data.opt;
          "0" == s.w &&
            ((s.w = h - 40),
            (s.h = (s.w / o.width) * o.height),
            s.h > r - 40 &&
              ((s.w = ((r - 40) / o.height) * o.width), (s.h = r - 40)),
            (s.wOk = 960),
            (s.hOk = (960 / s.w) * s.h));
          var c = {
            id: "cropper",
            width: h,
            height: r,
            scale: 6,
            zoom: 8,
            cut: {
              x: (h - parseInt(s.w)) / 2,
              y: (r - parseInt(s.h)) / 2,
              wOk: parseInt(s.wOk),
              hOk: parseInt(s.hOk),
              width: parseInt(s.w),
              height: parseInt(s.h),
              isface: s.isface,
            },
          };
          a.setData({ index: s.index, width: s.w, height: s.h }),
            new e.default(c);
        }
        i.wecropper.pushOrign(t);
      },
      fail: function () {
        a.uploadTap();
      },
    });
  },
  getCropperImage: function () {
    var t = this;
    if ("" == t.data.width)
      return (
        wx.showToast({ title: "请先上传图片！", mask: !0, icon: "none" }), !1
      );
    wx.showLoading({ title: "生成中", mask: !0 }),
      t.wecropper.getCropperImage(function (e) {
        e
          ? wx.getFileSystemManager().readFile({
              filePath: e,
              encoding: "base64",
              success: function (i) {
                var a = "data:image/jpeg;base64," + i.data,
                  o = wx.getStorageSync("img");
                "" == o && (o = []),
                  (o = { index: t.data.index, url: a, imgPath: e }),
                  wx.setStorageSync("img", o),
                  wx.navigateBack({ delta: 1 });
              },
            })
          : console.log("获取图片地址失败，请稍后重试");
      });
  },
  touchStart: function (t) {
    this.wecropper.touchStart(t);
  },
  touchMove: function (t) {
    this.wecropper.touchMove(t);
  },
  touchEnd: function (t) {
    this.wecropper.touchEnd(t);
  },
});
