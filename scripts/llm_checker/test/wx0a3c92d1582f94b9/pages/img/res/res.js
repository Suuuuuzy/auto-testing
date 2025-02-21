var t,
  e = wx.createCanvasContext("myCanvas"),
  a = 1,
  s = [],
  i = getApp(),
  n = !1;
Page({
  data: {
    img: "",
    w: 0,
    h: 0,
    adState: !1,
    errormoney: "",
    isInvest: i.isInvest,
    userinfo: i.userinfo,
    ad_video: i.ad_video,
  },
  onLoad: function (t) {
    var a = this;
    wx.showLoading({ title: "加载中..." }),
      (n = !1),
      wx.getFileSystemManager().readFile({
        filePath: t.url,
        encoding: "base64",
        success: function (s) {
          wx.getImageInfo({
            src: t.url || "https://api123.ddfans.com/cx/cx2/8164/icon.jpg",
            success: function (s) {
              wx.hideLoading(),
                a.setData({ imgshow: s.path }),
                a.setData({
                  img: s.path,
                  w: s.width,
                  isInvest: i.isInvest,
                  userinfo: i.userinfo,
                  h: s.height,
                  isSeo: !!t.seo,
                  ctx: s.width > s.height ? s.width : s.height,
                }),
                e.drawImage(
                  s.path,
                  s.width > s.height ? 0 : (s.height - s.width) / 2,
                  s.width > s.height ? (s.width - s.height) / 2 : 0,
                  s.width,
                  s.height
                ),
                e.draw();
            },
          });
        },
      });
  },
  adShow: function () {
    this.isHideAd();
    this._handle();
  },
  isHideAd: function () {
    this.setData({ adState: !1, errormoney: "" });
  },
  isAd: function (e) {
    var a = this;
    "" == (t = void 0 !== e ? e.currentTarget.dataset.bind : t) ||
    n ||
    a.data.isSeo ||
    1 == i.userinfo.level
      ? "" != t && a._handle()
      : (wx.showLoading({ title: "加载中", mask: !0 }),
        i.postData(
          i.apiurl + "/user/onCheckPay",
          {},
          function (t) {
            var e = a.data.userinfo;
            (e.money = t.data),
              (i.isInvest =
                "ios" != wx.getSystemInfoSync().platform || t.isInvest),
              a.setData({
                adState: !0,
                isInvest:
                  "ios" != wx.getSystemInfoSync().platform || t.isInvest,
                userinfo: e,
              });
          },
          function (t) {
            a.setData({ errormoney: t.msg });
          }
        ));
  },
  _handle: function () {
    switch (t) {
      case "saveImg":
        this.saveImg();
        break;
      case "saveImgs":
        this.saveImgs();
        break;
      case "showImg":
        this.showImg();
    }
  },
  showImg: function () {
    wx.previewImage({ current: "", urls: [this.data.img] }),
      n || (i._payNew(2), (n = !0));
  },
  saveImgs: function () {
    wx.showLoading({ title: "保存中...", mask: !0 }), (a = 1), this.saveI(a);
  },
  saveI: function (t) {
    var e = this,
      a = ((t % 3 > 0 ? (t % 3) - 1 : 2) * e.data.ctx) / 3;
    console.log(t % 3);
    var o =
      (parseInt(3 == t || 6 == t || 9 == t ? t / 3 - 1 : t / 3) * e.data.ctx) /
      3;
    wx.canvasToTempFilePath({
      x: a,
      y: o,
      width: e.data.ctx / 3,
      height: e.data.ctx / 3,
      destWidth: e.data.ctx / 3,
      destHeight: e.data.ctx / 3,
      canvasId: "myCanvas",
      success: function (a) {
        wx.saveImageToPhotosAlbum({
          filePath: a.tempFilePath,
          success: function (a) {
            9 == t
              ? ((t = 1),
                wx.hideLoading(),
                wx.showToast({
                  title:
                    "保存成功" +
                    (n || "0" != that.data.userinfo.level ? "" : " -2无印豆"),
                  mask: !0,
                  icon: "none",
                }),
                n || (i._payNew(2), (n = !0)))
              : ((t += 1), e.saveI(t));
          },
          fail: function () {
            s.push(a.tempFilePath),
              9 == t
                ? (wx.hideLoading(), wx.previewImage({ current: "", urls: s }))
                : ((t += 1), e.saveI(t));
          },
        });
      },
    });
  },
  noAd: function () {
    wx.setStorageSync("showVip", !0), wx.switchTab({ url: "/pages/user/user" });
  },
  saveImg: function () {
    var t = this;
    wx.showLoading({ title: "保存中..." }),
      console.log(t.data.img),
      wx.saveImageToPhotosAlbum({
        filePath: t.data.img,
        success: function (e) {
          wx.showToast({
            title:
              "保存成功" +
              (n || "0" != t.data.userinfo.level ? "" : " -2无印豆"),
            mask: !0,
            icon: "none",
          }),
            n || (i._payNew(2), (n = !0));
        },
        fail: function () {
          wx.hideLoading(),
            wx.previewImage({ current: "", urls: [t.data.img] });
        },
      });
  },
  onShareAppMessage: function (t) {
    return {
      title: "一键图片去除水印工具",
      path: "/pages/img/img?type=8777",
      imageUrl:
        "https://apis.ddfans.com/bian/public/static/image/qsy/tu-share.jpg",
    };
  },
});
