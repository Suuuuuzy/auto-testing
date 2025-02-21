(global.webpackJsonp = global.webpackJsonp || []).push([
  ["pages/picInfo/picInfo"],
  {
    1565: function (t, e, o) {
      o.r(e);
      var a = o("e939"),
        n = o.n(a);
      for (var d in a)
        "default" !== d &&
          (function (t) {
            o.d(e, t, function () {
              return a[t];
            });
          })(d);
      e.default = n.a;
    },
    "206a": function (t, e, o) {
      var a = o("d28e");
      o.n(a).a;
    },
    "83de": function (t, e, o) {
      o.r(e);
      var a = o("c9bc"),
        n = o("1565");
      for (var d in n)
        "default" !== d &&
          (function (t) {
            o.d(e, t, function () {
              return n[t];
            });
          })(d);
      o("206a");
      var i = o("f0c5"),
        s = Object(i.a)(
          n.default,
          a.b,
          a.c,
          !1,
          null,
          null,
          null,
          !1,
          a.a,
          void 0
        );
      e.default = s.exports;
    },
    c9bc: function (t, e, o) {
      var a = function () {
          this.$createElement, this._self._c;
        },
        n = [];
      o.d(e, "b", function () {
        return a;
      }),
        o.d(e, "c", function () {
          return n;
        }),
        o.d(e, "a", function () {});
    },
    d28e: function (t, e, o) {},
    e939: function (t, e, o) {
      (function (t) {
        Object.defineProperty(e, "__esModule", { value: !0 }),
          (e.default = void 0);
        var o = {
          components: {},
          data: function () {
            return {
              current: 0,
              productList: [],
              pageIndex: 1,
              loadding: !1,
              pullUpOn: !0,
              ad: getApp().globalData.batchAd,
              showAd: !1,
              isendd: 0,
              rewardedVideoAd: null,
              videoType: 0,
              adError: 0,
              jisuans: -1,
            };
          },
          onLoad: function () {
            var e = t.getStorageSync("ks_pics"),
              o = JSON.parse(e);
            (this.productList = o.pics),
              (this.ad = getApp().globalData.videoAd),
              (this.showAd = !0),
              this.createRewardVideo();
          },
          methods: {
            createRewardVideo: function () {
              var t = this;
              console.log(getApp().globalData.videoAdRewardtj);
              try {
                (this.rewardedVideoAd = wx.createRewardedVideoAd({
                  adUnitId: getApp().globalData.videoAdRewardtj,
                })),
                  this.rewardedVideoAd.onError(function (e) {
                    console.log("=============================" + e),
                      (t.adError = 1);
                  }),
                  t.rewardedVideoAd.onClose(function (e) {
                    e && e.isEnded
                      ? (console.log("===========广告看完了==========="),
                        wx.request({
                          url:
                            t.$reqUrl +
                            "/lyz/updateUserAdTimestj?uid=" +
                            getApp().globalData.uid,
                          method: "get",
                          success: function (t) {
                            console.log(t.data);
                          },
                        }),
                        t.dounww(t.jisuans))
                      : o.showModal({ content: getApp().globalData.adTiptj });
                  });
              } catch (e) {
                console.log("========ssssssss=====================" + e.err),
                  (t.adError = 1),
                  console.log(e);
              }
            },
            copyTitle: function () {
              t.setClipboardData({ data: getApp().globalData.desc });
            },
            copyPic: function (e) {
              var o = this;
              t.setClipboardData({
                data: o.productList[e],
                success: function () {
                  t.setStorageSync(o.productList[e], o.productList[e]);
                },
              });
            },
            previewPic: function (e) {
              t.previewImage({
                urls: [this.productList[e]],
                longPressActions: {
                  itemList: ["发送给朋友", "保存图片", "收藏"],
                },
              });
            },
            downLoad: function (t) {
              this.jisuans = t;
              var e = this;
              wx.request({
                url:
                  e.$reqUrl +
                  "/lyz/getUserAdTimestj?uid=" +
                  getApp().globalData.uid,
                method: "get",
                success: function (o) {
                  if (
                    (wx.hideLoading({ success: (t) => {} }),
                    o.data.data < getApp().globalData.watchTimes &&
                      0 == e.adError &&
                      "" != getApp().globalData.videoAdRewardtj)
                  )
                    try {
                      wx.showModal({
                        title: "温馨提示",
                        content: getApp().globalData.adTiptj,
                        cancelText: "下次再说",
                        confirmText: "观看广告",
                        success(o) {
                          if (o.confirm)
                            e.rewardedVideoAd.show().catch(function () {
                              e.rewardedVideoAd
                                .load()
                                .then(function () {
                                  return e.rewardedVideoAd.show();
                                })
                                .catch(function (o) {
                                  e.dounww(t);
                                });
                            });
                          else if (o.cancel)
                            return console.log("用户点击取消"), !1;
                        },
                      });
                    } catch (o) {
                      e.dounww(t);
                    }
                  else e.dounww(t);
                },
                complete: function (t) {
                  wx.hideLoading();
                },
              });
            },
            dounww(e) {
              let o = this;
              if (
                (wx.showLoading({ title: "正在下载图片中", mask: !0 }), -1 == e)
              ) {
                for (var a = 0; a < o.productList.length; a++) {
                  const t = a;
                  wx.downloadFile({
                    url: o.productList[a],
                    success: function (t) {
                      200 === t.statusCode &&
                        wx.saveImageToPhotosAlbum({ filePath: t.tempFilePath });
                    },
                    fail: function () {
                      wx.downloadFile({
                        url:
                          getApp().globalData.downlink_img +
                          encodeURIComponent(o.productList[t]),
                        success: function (t) {
                          200 === t.statusCode &&
                            wx.saveImageToPhotosAlbum({
                              filePath: t.tempFilePath,
                            });
                        },
                      });
                    },
                  }),
                    wx.showToast({
                      icon: "none",
                      title: "已下载" + (a + 1) + "张图片",
                    });
                }
                wx.showToast({ icon: "success", title: "图片全部下载完成" });
              } else
                wx.downloadFile({
                  url: o.productList[e],
                  success: function (t) {
                    200 === t.statusCode &&
                      wx.saveImageToPhotosAlbum({ filePath: t.tempFilePath });
                  },
                  fail: function () {
                    wx.downloadFile({
                      url:
                        getApp().globalData.downlink_img +
                        encodeURIComponent(o.productList[e]),
                      success: function (t) {
                        200 === t.statusCode &&
                          wx.saveImageToPhotosAlbum({
                            filePath: t.tempFilePath,
                          });
                      },
                    });
                  },
                }),
                  t.showToast({ icon: "success", title: "已保存到相册" });
            },
          },
        };
        e.default = o;
      }).call(this, o("543d").default);
    },
    fa98: function (t, e, o) {
      (function (t) {
        function e(t) {
          return t && t.__esModule ? t : { default: t };
        }
        o("616a"), o("921b"), e(o("66fd")), t(e(o("83de")).default);
      }).call(this, o("543d").createPage);
    },
  },
  [["fa98", "common/runtime", "common/vendor"]],
]);
