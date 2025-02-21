(global.webpackJsonp = global.webpackJsonp || []).push([
  ["pages/videoInfo/videoInfo"],
  {
    "347e": function (e, o, t) {
      var a = t("4667");
      t.n(a).a;
    },
    4667: function (e, o, t) {},
    4741: function (e, o, t) {
      t.r(o);
      var a = t("5422"),
        n = t.n(a);
      for (var l in a)
        "default" !== l &&
          (function (e) {
            t.d(o, e, function () {
              return a[e];
            });
          })(l);
      o.default = n.a;
    },
    5422: function (e, o, t) {
      (function (e) {
        function a(e, o, t) {
          return (
            o in e
              ? Object.defineProperty(e, o, {
                  value: t,
                  enumerable: !0,
                  configurable: !0,
                  writable: !0,
                })
              : (e[o] = t),
            e
          );
        }
        Object.defineProperty(o, "__esModule", { value: !0 }),
          (o.default = void 0);
        var n = {
          components: {
            cmdProgress: function () {
              t.e("components/cmd-progress/cmd-progress")
                .then(
                  function () {
                    return resolve(t("2e5c"));
                  }.bind(null, t)
                )
                .catch(t.oe);
            },
          },
          data: function () {
            var e;
            return (
              a(
                (e = {
                  videoUrl: getApp().globalData.playAddr,
                  percent: 0,
                  pcqsy: getApp().globalData.pcqsy,
                  fileStatus: "success",
                  rewardedVideoAd: null,
                  videoType: 0,
                  vs: getApp().globalData.vs,
                  prizeContent: getApp().globalData.prizeContent,
                }),
                "rewardedVideoAd",
                null
              ),
              a(e, "author", getApp().globalData.author),
              a(e, "cover", getApp().globalData.cover),
              a(e, "title", null),
              a(e, "currentTimeStamp", null),
              a(e, "showAd", !1),
              a(e, "ad", ""),
              a(e, "videoAfterAd", ""),
              a(e, "downLoadType", 1),
              a(e, "adError", 0),
              e
            );
          },
          onLoad: function (e) {
            (this.ad = getApp().globalData.videoAd),
              (this.showAd = !0),
              this.createRewardCard(),
              this.createRewardVideo(),
              (this.percent = 0);
            var o = getApp().globalData.autoDownload;
            null != e.type && (this.videoType = e.type),
              null != o && 1 == o && this.downFile(1, this.videoUrl);
          },
          onShareAppMessage: function (e) {
            return {
              title: getApp().globalData.shareTitle,
              path: "/pages/index/index",
              imageUrl: getApp().globalData.sharePic,
            };
          },
          onShareTimeline: function () {
            var e = wx.getStorageSync("id");
            return {
              title: this.data.noticedetail[0].title,
              query: "id= " + e,
              imageUrl: this.data.noticedetail[0].thumb,
            };
          },
          methods: {
            back: function () {
              e.switchTab({ url: "../index/index" });
            },
            createRewardVideo: function () {
              var o = this;
              try {
                (this.rewardedVideoAd = wx.createRewardedVideoAd({
                  adUnitId: getApp().globalData.videoAdReward,
                })),
                  this.rewardedVideoAd.onError(function (e) {
                    console.log("=============================" + e),
                      (o.adError = 1);
                  }),
                  o.rewardedVideoAd.onClose(function (t) {
                    t && t.isEnded
                      ? (console.log("===========广告看完了==========="),
                        e.request({
                          url:
                            o.$reqUrl +
                            "/lyz/updateUserAdTimes?uid=" +
                            getApp().globalData.uid,
                          method: "get",
                          success: function (e) {
                            console.log(e.data);
                          },
                        }),
                        o.startDownLoad(o.downLoadType, o.videoUrl))
                      : e.showModal({ content: getApp().globalData.adTip });
                  });
              } catch (e) {
                console.log("========ssssssss=====================" + err),
                  (o.adError = 1),
                  o.startDownLoad(o.downLoadType, o.videoUrl),
                  console.log(e);
              }
            },
            createRewardCard: function () {
              var e = null;
              if (wx.createInterstitialAd) {
                (e = wx.createInterstitialAd({
                  adUnitId: getApp().globalData.videoAdCard,
                })).onLoad(function () {
                  console.log("onLoad event emit");
                }),
                  e.onError(function (e) {
                    console.log("onError event emit", e);
                  }),
                  e.onClose(function (e) {
                    console.log("onClose event emit", e);
                  });
                var o = Math.floor(10 * Math.random());
                (4 != o && 8 != o) ||
                  e.show().catch(function (e) {
                    console.error(e);
                  });
              }
            },
            copyCover: function () {
              e.setClipboardData({
                data: getApp().globalData.desc,
                success: function () {
                  e.showModal({ content: "已经复制标题到剪切板" });
                },
              });
            },
            copyCover2: function () {
              e.setClipboardData({
                data: getApp().globalData.cover,
                success: function () {
                  e.showModal({
                    content: "已经复制链接到剪切板,请粘贴到浏览器下载",
                  });
                },
              });
            },
            copyMvUrl: function () {
              var o = this;
              e.setClipboardData({
                data: o.videoUrl,
                success: function () {
                  e.setStorageSync(o.videoUrl, o.videoUrl),
                    e.showModal({
                      content: "已经复制无水印链接到剪切板,请粘贴到浏览器下载",
                    });
                },
              });
            },
            pcqsycopy: function () {
              e.setClipboardData({
                data: getApp().globalData.pcqsy,
                success: function () {
                  e.showModal({ content: getApp().globalData.pcqsy });
                },
              });
            },
            skipToPrize: function () {
              1 == getApp().globalData.prizeType
                ? e.previewImage({
                    urls: [getApp().globalData.prizeImg],
                    longPressActions: {
                      itemList: ["发送给朋友", "保存图片", "收藏"],
                    },
                  })
                : e.navigateToMiniProgram({
                    appId: "wx9e7c6ea754e14099",
                    path: getApp().globalData.prizePath,
                  });
            },
            skipToWeb: function (o) {
              e.navigateTo({ url: "../parse/parse?conId=27" });
            },
            downFile: function (o, t) {
              var a = this;
              a.downLoadType = o;
              var n = new Date().valueOf();
              if ((console.log(n), null == a.currentTimeStamp))
                a.currentTimeStamp = n;
              else {
                if (n - a.currentTimeStamp < 5e3)
                  return void e.showModal({
                    content: "下载频率过快，请两秒后重新下载",
                  });
                a.currentTimeStamp = n;
              }
              1 != a.videoType || 1 != o
                ? (e.showLoading({ title: "初始化资源" }),
                  e.request({
                    url:
                      a.$reqUrl +
                      "/lyz/getUserAdTimes?uid=" +
                      getApp().globalData.uid,
                    method: "get",
                    success: function (e) {
                      if (
                        (console.log(e),
                        e.data.data < getApp().globalData.watchTimes &&
                          0 == a.adError &&
                          "" != getApp().globalData.videoAdReward)
                      )
                        try {
                          wx.showModal({
                            title: "温馨提示",
                            content: getApp().globalData.adTip,
                            cancelText: "下次再说",
                            confirmText: "观看广告",
                            success(e) {
                              if (e.confirm)
                                console.log("用户点击确定"),
                                  a.rewardedVideoAd.show().catch(function () {
                                    a.rewardedVideoAd
                                      .load()
                                      .then(function () {
                                        return a.rewardedVideoAd.show();
                                      })
                                      .catch(function (e) {
                                        a.startDownLoad(o, t);
                                      });
                                  });
                              else if (e.cancel)
                                return console.log("用户点击取消"), !1;
                            },
                          });
                        } catch (e) {
                          a.startDownLoad(o, t);
                        }
                      else a.startDownLoad(o, t);
                    },
                    complete: function (o) {
                      e.hideLoading();
                    },
                  }))
                : e.showModal({
                    content: "该视频超过50M,请复制视频链接到浏览器下载",
                  });
            },
            startDownLoad: function (o, t) {
              var a = this,
                n = t;
              e.showLoading({ title: "加载下载资源中" }),
                e.authorize({
                  scope: "scope.writePhotosAlbum",
                  success: function () {
                    (a.percent = 0),
                      (a.fileStatus = "active"),
                      e.request({
                        url: a.$reqUrl + "/lyz/getDownLoadFileUrl",
                        method: "POST",
                        data: { link: t, type: o, source: a.$source },
                        success: function (o) {
                          "0001" === o.data.code
                            ? (wx.showToast({
                                title: "开始下载！",
                                icon: "loading",
                                duration: 1e3,
                              }),
                              wx
                                .downloadFile({
                                  url: n,
                                  success(e) {
                                    console.log(e),
                                      200 === e.statusCode
                                        ? (wx.hideToast({}),
                                          wx.saveVideoToPhotosAlbum({
                                            filePath: e.tempFilePath,
                                            success(e) {
                                              wx.showModal({
                                                title: "下载成功",
                                                content: "请在手机相册中查看！",
                                                confirmColor: "#00baff",
                                                showCancel: !1,
                                                success: function (e) {},
                                              });
                                            },
                                          }))
                                        : a.dowww(n);
                                  },
                                  fail(e) {
                                    a.dowww(n);
                                  },
                                })
                                .onProgressUpdate(function (e) {
                                  (a.percent = e.progress), e.progress;
                                }))
                            : e.showModal({
                                content:
                                  o.data.message + getApp().globalData.author,
                              });
                        },
                        complete: function () {
                          e.hideLoading();
                        },
                      });
                  },
                  fail: function (o) {
                    e.hideLoading(),
                      e.showModal({
                        content:
                          "您没有同意相册权限,视频无法保存[请点击小程序右上角设置按钮 开启相册权限]",
                      });
                  },
                });
            },
            dowww(e) {
              let o = this;
              wx.downloadFile({
                url: getApp().globalData.downlink + e,
                success(e) {
                  200 === e.statusCode
                    ? (wx.hideToast({}),
                      wx.saveVideoToPhotosAlbum({
                        filePath: e.tempFilePath,
                        success(e) {
                          wx.showModal({
                            title: "下载成功",
                            content: "请在手机相册中查看！",
                            confirmColor: "#00baff",
                            showCancel: !1,
                            success: function (e) {},
                          });
                        },
                      }))
                    : wx.showModal({
                        title: "下载失败",
                        content:
                          "该视频无法直接下载，请复制无水印链接到手机QQ浏览器下载",
                        confirmColor: "#00baff",
                        showCancel: !1,
                        success: function (e) {
                          o.setData({});
                        },
                      });
                },
                fail(e) {
                  wx.hideToast({}),
                    wx.showModal({
                      title: "下载失败",
                      content:
                        "该视频无法直接下载，请复制无水印链接到手机QQ浏览器下载",
                      confirmColor: "#00baff",
                      showCancel: !1,
                      success: function (e) {
                        o.setData({});
                      },
                    });
                },
              }).onProgressUpdate((e) => {
                o.setData({ percent: String(e.progress) });
              });
            },
            downFilea: function (o, t) {
              var a = this;
              a.downLoadType = o;
              var n = new Date().valueOf();
              if ((console.log(n), null == a.currentTimeStamp))
                a.currentTimeStamp = n;
              else {
                if (n - a.currentTimeStamp < 5e3)
                  return void e.showModal({
                    content: "下载频率过快，请两秒后重新下载",
                  });
                a.currentTimeStamp = n;
              }
              1 != a.videoType || 1 != o
                ? (e.showLoading({ title: "初始化资源" }),
                  e.request({
                    url:
                      a.$reqUrl +
                      "/lyz/getUserAdTimes?uid=" +
                      getApp().globalData.uid,
                    method: "get",
                    success: function (e) {
                      if (
                        e.data.data < getApp().globalData.watchTimes &&
                        0 == a.adError &&
                        "" != getApp().globalData.videoAdReward
                      )
                        try {
                          wx.showModal({
                            title: "温馨提示",
                            content: getApp().globalData.adTip,
                            cancelText: "下次再说",
                            confirmText: "观看广告",
                            success(e) {
                              if (e.confirm)
                                console.log("用户点击确定"),
                                  a.rewardedVideoAd.show().catch(function () {
                                    a.rewardedVideoAd
                                      .load()
                                      .then(function () {
                                        return a.rewardedVideoAd.show();
                                      })
                                      .catch(function (e) {
                                        a.startDownLoada(o, t);
                                      });
                                  });
                              else if (e.cancel)
                                return console.log("用户点击取消"), !1;
                            },
                          });
                        } catch (e) {
                          a.startDownLoada(o, t);
                        }
                      else a.startDownLoada(o, t);
                    },
                    complete: function (o) {
                      e.hideLoading();
                    },
                  }))
                : e.showModal({
                    content: "该视频超过50M,请复制视频链接到浏览器下载",
                  });
            },
            startDownLoada: function (o, t) {
              var a = this,
                n = t;
              e.showLoading({ title: "加载下载资源中" }),
                e.authorize({
                  scope: "scope.writePhotosAlbum",
                  success: function () {
                    (a.percent = 0),
                      (a.fileStatus = "active"),
                      e.request({
                        url: a.$reqUrl + "/lyz/getDownLoadFileUrl",
                        method: "POST",
                        data: { link: t, type: o, source: a.$source },
                        success: function (t) {
                          "0001" === t.data.code
                            ? e
                                .downloadFile({
                                  url: t.data.data,
                                  success: function (t) {
                                    if (200 === t.statusCode)
                                      if (1 == o)
                                        e.saveVideoToPhotosAlbum({
                                          filePath: t.tempFilePath,
                                        }),
                                          console.log("保存视频到相册");
                                      else if (2 == o)
                                        e.saveImageToPhotosAlbum({
                                          filePath: t.tempFilePath,
                                        }),
                                          console.log("保存图片到相册");
                                      else {
                                        var a = t.tempFilePaths;
                                        e.saveFile({
                                          tempFilePath: a[0],
                                          success: function (e) {
                                            e.savedFilePath;
                                          },
                                        }),
                                          console.log("保存图片到相册");
                                      }
                                  },
                                  fail: function () {
                                    console.log("下载失败");
                                    let t = n;
                                    2 == o &&
                                      (t =
                                        getApp().globalData.downlink_img + n),
                                      e
                                        .downloadFile({
                                          url: t,
                                          success: function (t) {
                                            if (200 === t.statusCode)
                                              if (1 == o)
                                                e.saveVideoToPhotosAlbum({
                                                  filePath: t.tempFilePath,
                                                }),
                                                  console.log("保存视频到相册");
                                              else if (2 == o)
                                                e.saveImageToPhotosAlbum({
                                                  filePath: t.tempFilePath,
                                                }),
                                                  console.log("保存图片到相册");
                                              else {
                                                var a = t.tempFilePaths;
                                                e.saveFile({
                                                  tempFilePath: a[0],
                                                  success: function (e) {
                                                    e.savedFilePath;
                                                  },
                                                }),
                                                  console.log("保存图片到相册");
                                              }
                                          },
                                          fail: function () {
                                            e.showModal({
                                              content:
                                                "下载失败，请复制无水印链接到浏览器下载",
                                            });
                                          },
                                        })
                                        .onProgressUpdate(function (o) {
                                          (a.percent = o.progress),
                                            100 == o.progress &&
                                              e.showToast({
                                                icon: "success",
                                                title: "文件已保存到相册",
                                              });
                                        });
                                  },
                                })
                                .onProgressUpdate(function (o) {
                                  (a.percent = o.progress),
                                    100 == o.progress &&
                                      e.showToast({
                                        icon: "success",
                                        title: "文件已保存到相册",
                                      });
                                })
                            : e.showModal({
                                content:
                                  t.data.message + getApp().globalData.author,
                              });
                        },
                        complete: function () {
                          e.hideLoading();
                        },
                      });
                  },
                  fail: function (o) {
                    e.hideLoading(),
                      e.showModal({
                        content:
                          "您没有同意相册权限,视频无法保存[请点击小程序右上角设置按钮 开启相册权限]",
                      });
                  },
                });
            },
          },
        };
        o.default = n;
      }).call(this, t("543d").default);
    },
    "9b6f": function (e, o, t) {
      (function (e) {
        function o(e) {
          return e && e.__esModule ? e : { default: e };
        }
        t("616a"), t("921b"), o(t("66fd")), e(o(t("e804")).default);
      }).call(this, t("543d").createPage);
    },
    e804: function (e, o, t) {
      t.r(o);
      var a = t("eb5e"),
        n = t("4741");
      for (var l in n)
        "default" !== l &&
          (function (e) {
            t.d(o, e, function () {
              return n[e];
            });
          })(l);
      t("347e");
      var s = t("f0c5"),
        i = Object(s.a)(
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
      o.default = i.exports;
    },
    eb5e: function (e, o, t) {
      var a = {
          "cmd-progress": function () {
            return t
              .e("components/cmd-progress/cmd-progress")
              .then(t.bind(null, "2e5c"));
          },
        },
        n = function () {
          this.$createElement, this._self._c;
        },
        l = [];
      t.d(o, "b", function () {
        return n;
      }),
        t.d(o, "c", function () {
          return l;
        }),
        t.d(o, "a", function () {
          return a;
        });
    },
  },
  [["9b6f", "common/runtime", "common/vendor"]],
]);
