wx.createCanvasContext("myCanvas");
var o,
  e = getApp();
Page({
  data: {
    img: "",
    w: 0,
    h: 0,
    errormoney: "",
    adState: !1,
    isInvest: e.isInvest,
    userinfo: e.userinfo,
    ad_video: e.ad_video,
  },
  onLoad: function (o) {
    this.setData({
      imgshow: o.url,
      isInvest: e.isInvest,
      userinfo: e.userinfo,
      saveVideoUrl: o.type ? o.url : "",
      type: o.type ? o.type : "",
      isSeo: !!o.seo,
    });
  },
  isHideAd: function () {
    this.setData({ adState: !1, errormoney: "" });
  },
  isAd: function (t) {
    var s = this;
    (o = void 0 !== t ? t.currentTarget.dataset.bind : o),
      1 != e.userinfo.level
        ? (wx.showLoading({ title: "加载中", mask: !0 }),
          e.postData(
            e.apiurl + "/user/onCheckPay",
            {},
            function (o) {
              var e = s.data.userinfo;
              (e.money = o.data), s.setData({ adState: !0, userinfo: e });
            },
            function (o) {
              s.setData({ errormoney: o.msg });
            }
          ))
        : s.onDown();
  },
  noAd: function () {
    wx.setStorageSync("showVip", !0), wx.switchTab({ url: "/pages/user/user" });
  },
  adShow: function () {
    this.isHideAd(), this.onDown();
  },
  onDown: function () {
    var o = this;
    o.data.saveVideoUrl
      ? o.save(o.data.saveVideoUrl)
      : wx
          .downloadFile({
            url: o.data.imgshow,
            success: function (e) {
              var t = e.tempFilePath;
              o.setData({ saveVideoUrl: t }), o.save(t);
            },
            fail: function (o) {
              console.log(o),
                wx.hideLoading(),
                wx.showToast({
                  title: "视频下载失败！请稍后重试",
                  icon: "none",
                });
            },
          })
          .onProgressUpdate(function (o) {
            console.log("下载进度", o.progress),
              wx.showLoading({ title: "下载 " + o.progress + "%", mask: !0 });
          });
  },
  save: function (o) {
    var t = this;
    wx.showLoading({ title: "保存中...", mask: !0 }),
      console.log(o),
      wx.saveVideoToPhotosAlbum({
        filePath: o,
        success: function (o) {
          console.log(o),
            wx.hideLoading(),
            wx.showToast({
              title:
                "保存成功！" +
                ("0" == t.data.userinfo.level ? " -1无印豆" : ""),
              icon: "none",
            }),
            e._pay();
        },
        fail: function (e) {
          wx.hideLoading(),
            console.log(e),
            "saveVideoToPhotosAlbum:fail auth deny" == e.errMsg &&
              wx.showModal({
                title: "提示",
                content: "请开启相册访问权限后重试！",
                confirmText: "开启",
                success: function (e) {
                  e.confirm
                    ? wx.openSetting({
                        success: function (e) {
                          e.authSetting["scope.writePhotosAlbum"] &&
                            (wx.showLoading({ title: "保存中...", mask: !0 }),
                            wx.saveVideoToPhotosAlbum({
                              filePath: o,
                              success: function (o) {
                                console.log(o),
                                  wx.hideLoading(),
                                  wx.showToast({
                                    title: "保存成功！",
                                    icon: "none",
                                  });
                              },
                              fail: function (o) {
                                wx.hideLoading(),
                                  "saveVideoToPhotosAlbum:fail cancel" ==
                                    o.errMsg ||
                                    wx.showToast({
                                      title: "系统错误",
                                      icon: "none",
                                    });
                              },
                            }));
                        },
                      })
                    : e.cancel && console.log("用户点击取消");
                },
              });
        },
      });
  },
  onShareAppMessage: function (o) {
    return {
      title: "一键图片去除水印工具",
      path: "/pages/img/img?type=8777",
      imageUrl:
        "https://apis.ddfans.com/bian/public/static/image/qsy/tu-share.jpg",
    };
  },
});
