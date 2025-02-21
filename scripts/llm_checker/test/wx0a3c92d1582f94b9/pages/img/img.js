var t,
  e,
  i = getApp(),
  o = wx.getSystemInfoSync().windowWidth;
Page({
  data: {
    shade_width: o / 2,
    windowWidth: o,
    isSeo: !1,
    bottom_btn: 0,
    name: i.name,
    showPrivacy: !1,
    ad_video: i.ad_video,
  },
  onLoad: function (t) {
    var e = this,
      o = this;
    wx.onNeedPrivacyAuthorization &&
      (wx.onNeedPrivacyAuthorization(function (t) {
        o.setData({ showPrivacy: !0 }), (o.resolvePrivacyAuthorization = t);
      }),
      wx.requirePrivacyAuthorize({
        success: function () {},
        fail: function () {},
        complete: function () {},
      })),
      o.setData({ isSeo: !!t.seo }),
      this.getTabBar().setData({ selected: 3 }),
      i.userinfo
        ? this.init(t)
        : (i.checkGetSignCallback = function (i) {
            e.init(t);
          });
  },
  init: function (t) {},
  handleAgreePrivacyAuthorization: function () {
    this.setData({ showPrivacy: !1 }),
      this.resolvePrivacyAuthorization({
        buttonId: "agree-btn",
        event: "agree",
      });
  },
  openPrivacy: function () {
    wx.openPrivacyContract({
      success: function () {},
      fail: function () {},
      complete: function () {},
    });
  },
  exitMini: function () {
    wx.exitMiniProgram({ success: function (t) {} });
  },
  closeSelect: function () {
    this.setData({ bottom_btn: !1 });
  },
  openSelect: function () {
    this.setData({ bottom_btn: !0 });
  },
  selectImg: function (t) {
    var e = this;
    "0" == t.currentTarget.dataset.type
      ? wx.chooseImage({
          count: 1,
          sizeType: ["compressed"],
          sourceType: ["album"],
          success: function (t) {
            console.log(t), e.closeSelect(), e.goDraw(t.tempFilePaths[0]);
          },
        })
      : wx.chooseMessageFile({
          count: 1,
          type: "image",
          success: function (t) {
            e.closeSelect(), e.goDraw(t.tempFiles[0].path);
          },
        });
  },
  goDraw: function (t) {
    var e = this;
    i.checkImg(t, function () {
      wx.navigateTo({
        url: "/pages/img/draw/draw?url=" + t + (e.data.isSeo ? "&seo=1" : ""),
      });
    });
  },
  longPicSew: function (t) {
    wx.chooseImage({
      count: 9,
      sourceType: ["album"],
      sizeType: ["compressed"],
      fail: function (t) {},
      success: function (t) {
        var e = t.tempFilePaths;
        (i.images = e), wx.navigateTo({ url: "./choose/choose?mode=smart" });
      },
    });
  },
  touchstart: function (i) {
    (t = i.touches[0].clientX), (e = this.data.shade_width);
  },
  touchmove: function (i) {
    var n = i.touches[0].clientX,
      a = t - n,
      s = e + a > o ? o : e + a;
    this.setData({ shade_width: s });
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
