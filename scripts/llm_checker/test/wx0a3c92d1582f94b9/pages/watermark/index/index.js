var t = getApp(),
  a = !0,
  e = !0;
Page({
  data: {
    link: "",
    list: [],
    i: 1,
    type: "",
    page: "on",
    errormoney: "",
    userInfo: t.userinfo,
    isShowDownload: !1,
  },
  onLoad: function (t) {
    (e = !0),
      wx.showShareMenu({ withShareTicket: !0 }),
      t.url &&
        (this.setData({ link: decodeURIComponent(t.url) }),
        this.onWaterIndex());
  },
  onUnload: function () {
    wx.hideLoading(), (e = !1);
  },
  onReachBottom: function () {
    if ("" != this.data.page && a) {
      var t = this.data.link;
      (t = t.match(
        /(https?|http|ftp|file):\/\/[-A-Za-z0-9+&@#/%?=~_|!:,.;]+[-A-Za-z0-9+&@#/%=~_|]/g
      )),
        this.getData(t);
    }
  },
  clearInputIndex: function (t) {
    this.setData({ link: "" });
  },
  copyIndexUrl: function () {
    var a = this;
    wx.getClipboardData({
      success: function (e) {
        var o = e.data;
        t.isURL(o)
          ? a.setData({ link: o })
          : wx.showToast({ title: "未检测到链接", icon: "none" });
      },
    });
  },
  onInputIndex: function (t) {
    this.setData({ link: t.detail.value });
  },
  onWaterIndex: function () {
    var a = this.data.link;
    if (!t.isURL(a))
      return (
        wx.showToast({ title: "请复制链接，口令无法解析", icon: "none" }), !1
      );
    (a = a.match(
      /(https?|http|ftp|file):\/\/[-A-Za-z0-9+&@#/%?=~_|!:,.;]+[-A-Za-z0-9+&@#/%=~_|]/g
    )),
      this.setData({ page: "on", i: 1 }),
      this.getData(a);
  },
  getData: function (e) {
    var o = {},
      n = this;
    wx.showLoading({ title: "加载中..." }),
      (a = !1),
      (o.link = n.data.link),
      (o.page = "on" == n.data.page ? "" : n.data.page),
      (o.timestamp = Date.parse(new Date()) / 1e3),
      t.getSign(o).then(function (e) {
        (o.sign = e),
          t.postData(
            t.apiurl + "/api/onWaterIndex",
            o,
            function (t) {
              n.setData({
                list:
                  "on" == n.data.page
                    ? t.data.list
                    : n.data.list.concat(t.data.list),
                page: t.data.page,
              }),
                (a = !0);
            },
            function (t) {
              n.setData({ adMsgState: !1, error: t.msg });
            }
          );
      });
  },
  isHideDownload: function () {
    this.setData({ isShowDownload: !1, errormoney: "" });
  },
  onDown: function (a) {
    var e = this,
      o = e.data.i,
      n = e.data.type;
    if (
      (a &&
        !a.currentTarget.dataset.type &&
        ((o = a.currentTarget.dataset.i
          ? a.currentTarget.dataset.i
          : e.data.list.length > o && 1 != o && "all" == n
          ? o + 1
          : 1),
        (n = a.currentTarget.dataset.i ? "" : "all"),
        e.setData({ i: o, type: n })),
      !e.data.isShowDownload && 1 != t.userinfo.level)
    )
      return (
        t.postData(
          t.apiurl + "/user/onCheckPay",
          {},
          function (t) {
            var a = e.data.userInfo;
            console.log(t),
              (a.money = t.data),
              e.setData({
                userInfo: a,
                isShowDownload: !e.data.isShowDownload,
              });
          },
          function (t) {
            e.setData({ errormoney: t.msg });
          }
        ),
        !1
      );
    e.setData({ isShowDownload: !1 }),
      e._down(o, n, function () {
        wx.hideLoading(),
          wx.showToast({
            title:
              "下载成功！" +
              ("0" == e.data.userInfo.level
                ? " -" +
                  ("all" == e.data.type ? e.data.list.length : 1) +
                  "无印豆"
                : ""),
            icon: "none",
            mask: !0,
          });
      });
  },
  noAd: function () {
    this.isHideDownload(),
      wx.setStorageSync("showVip", !0),
      wx.switchTab({ url: "/pages/user/user" });
  },
  _down: function (t) {
    var a = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "",
      e = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : "",
      o = this,
      n = o.data.list[t - 1].video_url;
    o.setData({ i: t }),
      "" != n
        ? (wx.showLoading({
            title: "" == a ? "下载 0%" : "下载 (" + t + ") 0%",
            mask: !0,
          }),
          o._drawVideo(n, a, function () {
            "" == a
              ? (wx.hideLoading(), e())
              : t < o.data.list.length
              ? ((t += 1), o._down(t, a, e))
              : e();
          }))
        : t < o.data.list.length
        ? ((t += 1), o._down(t, a, e))
        : e();
  },
  _drawVideo: function (t) {
    var a = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "",
      o = arguments.length > 2 ? arguments[2] : void 0,
      n = this,
      i = wx.downloadFile({
        url: t.replace("http://", "https://"),
        timeout: 2e8,
        success: function (i) {
          var s = i.tempFilePath;
          e &&
            (-1 != s.indexOf(".mp4")
              ? n.saveVideo(s, o)
              : n.__downVideo(t, a, o));
        },
        fail: function (e) {
          n.__downVideo(t, a, o);
        },
      });
    i.onProgressUpdate(function (t) {
      e
        ? wx.showLoading({
            title:
              "" == a
                ? "下载 " + t.progress + "%"
                : "下载 (" + n.data.i + ") " + t.progress + "%",
            mask: !0,
          })
        : i.abort();
    });
  },
  __downVideo: function (a) {
    var o = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "",
      n = arguments.length > 2 ? arguments[2] : void 0,
      i = this,
      s = wx.downloadFile({
        url: t.downHost + "/down.php?downlink=" + encodeURIComponent(a),
        timeout: 2e8,
        success: function (t) {
          var a = t.tempFilePath;
          e && i.saveVideo(a, n);
        },
        fail: function (t) {
          wx.hideLoading(),
            e &&
              wx.showToast({ title: "视频下载失败！请稍后重试", icon: "none" });
        },
      });
    s.onProgressUpdate(function (t) {
      e
        ? wx.showLoading({
            title:
              "" == o
                ? "下载 " + t.progress + "%"
                : "下载 (" + i.data.i + ") " + t.progress + "%",
            mask: !0,
          })
        : s.abort();
    });
  },
  saveVideo: function (a, e) {
    wx.saveVideoToPhotosAlbum({
      filePath: a,
      success: function (a) {
        "function" == typeof e && e(), t._pay();
      },
      fail: function (o) {
        wx.hideLoading(),
          "saveVideoToPhotosAlbum:fail auth deny" == o.errMsg &&
            wx.showModal({
              title: "提示",
              content: "请开启相册访问权限后重试！",
              confirmText: "开启",
              success: function (o) {
                o.confirm
                  ? wx.openSetting({
                      success: function (o) {
                        o.authSetting["scope.writePhotosAlbum"] &&
                          wx.saveVideoToPhotosAlbum({
                            filePath: a,
                            success: function (a) {
                              "function" == typeof e && e(), t._pay();
                            },
                            fail: function (t) {
                              wx.hideLoading(),
                                "saveVideoToPhotosAlbum:fail cancel" ==
                                  t.errMsg ||
                                  wx.showToast({
                                    title: "系统错误",
                                    icon: "none",
                                  });
                            },
                          });
                      },
                    })
                  : o.cancel && console.log("用户点击取消");
              },
            });
      },
    });
  },
  onShareAppMessage: function (t) {
    return {
      title: "短视频免费去水印",
      path: "/pages/watermark/watermark?type=8777",
      imageUrl:
        "https://apis.ddfans.com/bian/public/static/image/qsy/share.jpg",
    };
  },
});
