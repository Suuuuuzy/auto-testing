var a = getApp(),
  t = "";
Page({
  data: {
    data: [],
    type: 1,
    play: "",
    imgshow: "",
    name: a.name,
    showPrivacy: !1,
    i: "",
    userinfo: a.userinfo,
    isInvest: !0,
    isEdit: !1,
    error: "",
    adState: !1,
  },
  onLoad: function (t) {
    var e = this;
    wx.showShareMenu({ withShareTicket: !0 }),
      wx.onNeedPrivacyAuthorization &&
        (wx.onNeedPrivacyAuthorization(function (a) {
          e.setData({ showPrivacy: !0 }), (e.resolvePrivacyAuthorization = a);
        }),
        wx.requirePrivacyAuthorize({
          success: function () {},
          fail: function () {},
          complete: function () {},
        })),
      this.setData({
        isInvest: a.isInvest,
        userinfo: a.userinfo,
        type: t.type ? t.type : 1,
      }),
      this.getData();
  },
  noAd: function () {
    wx.setStorageSync("showVip", !0), wx.switchTab({ url: "/pages/user/user" });
  },
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
    wx.exitMiniProgram({ success: function (a) {} });
  },
  isHideAd: function () {
    this.setData({ adState: !1, error: "" });
  },
  adShow: function () {
    this.isHideAd();
    this.onDown();
  },
  isAd: function (t) {
    var e = this;
    console.log(t);
    var i = t.currentTarget.dataset.i;
    void 0 !== t && e.setData({ i: t.currentTarget.dataset.i }),
      e.setData({ isEdit: !1 }),
      1 != a.userinfo.level && 1 != e.data.data[i].is_pay
        ? (wx.showLoading({ title: "加载中", mask: !0 }),
          a.postData(
            a.apiurl + "/user/onCheckPay",
            {},
            function (a) {
              var t = e.data.userinfo;
              (t.money = a.data), e.setData({ adState: !0, userinfo: t });
            },
            function (a) {
              e.setData({ error: a.msg });
            }
          ))
        : e.onDown();
  },
  copyAppName: function () {
    wx.setClipboardData({
      data:
        "ios" == wx.getSystemInfoSync().platform ? "小葩水印" : "小葩去水印",
      success: function (a) {
        wx.showToast({ title: "名称复制成功！", icon: "none" });
      },
    });
  },
  onDown: function () {
    var a = this;
    (wx.showLoading({ title: "获取中...", mask: !0 }),
    a.data.data[a.data.i].saveVideoUrl)
      ? a.save(a.data.data[a.data.i].saveVideoUrl)
      : wx
          .downloadFile({
            url: a.data.data[a.data.i].request_url,
            timeout: 6e6,
            success: function (t) {
              console.log(a.data.data[a.data.i].request_url);
              var e = t.tempFilePath,
                i = a.data.data;
              (i[a.data.i].saveVideoUrl = e), a.setData({ data: i }), a.save(e);
            },
            fail: function (t) {
              var e;
              if (
                (console.log(t),
                "uploadFile:fail createUploadTask:fail url not in domain list" ==
                  t.errMsg ||
                  -1 ===
                    a.data.data[a.data.i].request_url.indexOf(
                      "77oss.ddfans.com"
                    ))
              )
                return (
                  ((e = a.data.data)[a.data.i].request_url = e[
                    a.data.i
                  ].request_url.replace(
                    "downoss.ddfans.com:3303",
                    "77oss.ddfans.com"
                  )),
                  a.setData({ data: e }),
                  a.onDown(),
                  !1
                );
              (wx.hideLoading(),
              -1 != t.errMsg.indexOf("exceed max file size") ||
                -1 != t.errMsg.indexOf("time"))
                ? (((e = a.data.data)[a.data.i].error =
                    "小程序不支持200M以上视频下载，请到应用市场安装“" +
                    ("ios" == wx.getSystemInfoSync().platform
                      ? "小葩水印"
                      : "小葩去水印") +
                    "”APP"),
                  a.setData({ data: e }))
                : wx.showToast({ title: t.errMsg, icon: "none" });
            },
          })
          .onProgressUpdate(function (a) {
            wx.showLoading({ title: "下载 " + a.progress + "%", mask: !0 });
          });
  },
  save: function (t) {
    var e = this;
    if (e.data.isEdit)
      return (
        wx.openVideoEditor({
          filePath: t,
          success: function (a) {
            wx.navigateTo({
              url:
                "/pages/video/res/res?url=" +
                a.tempFilePath +
                "&type=edit" +
                (e.data.isSeo ? "&seo=1" : ""),
            });
          },
        }),
        !1
      );
    wx.showLoading({ title: "保存中...", mask: !0 }),
      wx.saveVideoToPhotosAlbum({
        filePath: t,
        success: function (t) {
          console.log(t),
            wx.hideLoading(),
            wx.showToast({
              title:
                "保存成功！" +
                (1 != e.data.data[e.data.i].is_pay &&
                "0" == e.data.userinfo.level
                  ? " -" + e.data.data[e.data.i].money + "无印豆"
                  : ""),
              icon: "none",
            }),
            1 != e.data.data[e.data.i].is_pay &&
              a.postData(
                a.apiurl + "/user/onPay",
                {
                  history_id: e.data.data[e.data.i].id,
                  money: e.data.data[e.data.i].money,
                },
                function (a) {
                  var t = e.data.data;
                  (t[e.data.i].is_pay = 1), e.setData({ data: t });
                }
              );
        },
        fail: function (i) {
          wx.hideLoading(),
            console.log(i),
            "saveVideoToPhotosAlbum:fail auth deny" == i.errMsg &&
              wx.showModal({
                title: "提示",
                content: "请开启相册访问权限后重试！",
                confirmText: "开启",
                success: function (i) {
                  i.confirm
                    ? wx.openSetting({
                        success: function (i) {
                          i.authSetting["scope.writePhotosAlbum"] &&
                            (wx.showLoading({ title: "保存中...", mask: !0 }),
                            wx.saveVideoToPhotosAlbum({
                              filePath: t,
                              success: function (t) {
                                console.log(t),
                                  wx.hideLoading(),
                                  wx.showToast({
                                    title:
                                      "保存成功！" +
                                      (1 != e.data.data[e.data.i].is_pay &&
                                      "0" == e.data.userinfo.level
                                        ? " -1无印豆"
                                        : ""),
                                    icon: "none",
                                  }),
                                  1 != e.data.data[e.data.i].is_pay &&
                                    a.postData(
                                      a.apiurl + "/user/onPay",
                                      { history_id: e.data.data[e.data.i].id },
                                      function (a) {
                                        var t = e.data.data;
                                        (t[e.data.i].is_pay = 1),
                                          e.setData({ data: t });
                                      }
                                    );
                              },
                              fail: function (a) {
                                wx.hideLoading(),
                                  "saveVideoToPhotosAlbum:fail cancel" ==
                                    a.errMsg ||
                                    wx.showToast({
                                      title: "系统错误",
                                      icon: "none",
                                    });
                              },
                            }));
                        },
                      })
                    : i.cancel && console.log("用户点击取消");
                },
              });
        },
      });
  },
  onEditVideo: function (a) {
    this.setData({ isEdit: !0, i: a.currentTarget.dataset.i }), this.onDown();
  },
  onPlay: function (a) {
    this.setData({ play: a.currentTarget.dataset.url + "?v=1" }),
      setTimeout(function () {
        (t = wx.createVideoContext("play")).requestFullScreen({ direction: 0 });
      }, 1e3);
  },
  onFullScreenChange: function (a) {
    a.detail.fullScreen ? t.play() : t.stop();
  },
  onTab: function (a) {
    this.setData({ type: a.currentTarget.dataset.type, data: [] }),
      this.getData();
  },
  onPullDownRefresh: function () {
    this.getData();
  },
  getData: function () {
    var t = this;
    console.log("load--"),
      this.setData({ data: [] }),
      1 == this.data.type
        ? (this.setData({
            data: wx.getStorageSync("history_link")
              ? wx.getStorageSync("history_link")
              : [],
          }),
          wx.stopPullDownRefresh())
        : a.postData(a.apiurl + "/user/onGetHistroy", {}, function (a) {
            console.log("结果", a),
              wx.stopPullDownRefresh(),
              wx.hideLoading(),
              t.setData({ data: a.data });
          });
  },
  copy: function (a) {
    wx.setClipboardData({
      data: a.currentTarget.dataset.data,
      success: function (a) {
        wx.showToast({ title: "链接复制成功！", icon: "none" });
      },
    });
  },
  clearInput: function (t) {
    var e = this;
    wx.showModal({
      title: "提示",
      content: "确定删除吗？",
      success: function (i) {
        if (i.confirm)
          if (1 == e.data.type) {
            for (var o = e.data.data, s = [], n = 0; n < o.length; n++)
              t.currentTarget.dataset.i != n && s.push(o[n]);
            e.setData({ data: s }), wx.setStorageSync("history_link", s);
          } else
            wx.showLoading({ title: "正在删除", mask: !0 }),
              a.postData(
                a.apiurl + "/user/onDelHistroy",
                { id: t.currentTarget.dataset.id },
                function (a) {
                  wx.hideLoading();
                  var i = e.data.data;
                  (i[t.currentTarget.dataset.i].state = -1),
                    e.setData({ data: i });
                }
              );
      },
    });
  },
  onInvest: function () {
    wx.setStorageSync("invest", !0),
      wx.setStorageSync("showVip", !0),
      wx.switchTab({ url: "/pages/user/user" });
  },
  onShareAppMessage: function (a) {
    return {
      title: "短视频免费去水印",
      path: "/pages/watermark/watermark?type=8777",
      imageUrl:
        "https://apis.ddfans.com/bian/public/static/image/qsy/share.jpg",
    };
  },
});
