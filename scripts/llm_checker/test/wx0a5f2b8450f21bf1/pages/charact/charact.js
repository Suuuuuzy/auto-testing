!(function () {
  let t = null;
  var e = require("../../lib/cos-wx-sdk-v5");
  let a = null;
  Page({
    data: {
      inputContent: "",
      canInput: !0,
      copyData: "",
      adError: 0,
      action: null,
      showAd: !1,
      fontAd: "",
    },
    onShareAppMessage: function (t) {
      return {
        title: getApp().globalData.shareTitle,
        path: "/pages/index/index?openid=" + getApp().globalData.openid,
        imageUrl: getApp().globalData.sharePic,
      };
    },
    onShareTimeline: function () {
      var t = wx.getStorageSync("id");
      return {
        title: this.data.noticedetail[0].title,
        query: "id= " + t,
        imageUrl: this.data.noticedetail[0].thumb,
      };
    },
    onLoad: function (e) {
      this.setData({ fontAd: getApp().globalData.toolAd, showAd: !0 });
      const a = this;
      wx.createRewardedVideoAd &&
        ((t = wx.createRewardedVideoAd({
          adUnitId: getApp().globalData.videoAdRewardwa,
        })),
        t.onLoad(() => {
          console.log("onLoad event emit");
        }),
        t.onError((t) => {
          console.log("onError event emit", t);
        }),
        t.onClose((t) => {
          t && t.isEnded
            ? (wx.showLoading({ title: "请稍等" }),
              wx.request({
                url:
                  getApp().globalData.fwqurl +
                  "lyz/updateUserAdTimeswa?uid=" +
                  getApp().globalData.uid,
                method: "GET",
                success: function () {
                  "network" == a.data.action
                    ? a.jiexiText()
                    : "local" == a.data.action && a.jiexiLocal();
                },
              }))
            : wx.showModal({ content: getApp().globalData.adTipwa });
        })),
        this.initCos();
    },
    initCos: function () {
      a = new e({
        getAuthorization: function (t, e) {
          wx.request({
            url: getApp().globalData.fwqurl + "cos/getTempKey",
            data: { programType: getApp().globalData.sid },
            success: function (t) {
              var a = t.data.data;
              e({
                TmpSecretId: a.credentials && a.credentials.tmpSecretId,
                TmpSecretKey: a.credentials && a.credentials.tmpSecretKey,
                XCosSecurityToken: a.credentials && a.credentials.sessionToken,
                StartTime: Math.round(new Date() / 1e3),
                ExpiredTime: a.expiredTime,
              });
            },
          });
        },
      });
    },
    onReady: function () {},
    onShow: function () {},
    onHide: function () {},
    onUnload: function () {},
    onPullDownRefresh: function () {},
    onReachBottom: function () {},
    onShareAppMessage: function () {},
    getCharact: function () {
      const e = this;
      if ((e.setData({ action: "network" }), "" == e.data.inputContent))
        return (
          wx.showModal({ title: "温馨提示", content: "文案链接不能为空" }), !1
        );
      wx.request({
        url:
          getApp().globalData.fwqurl +
          "/lyz/getUserAdTimeswa?uid=" +
          getApp().globalData.uid,
        success: function (a) {
          if (
            a.data.data < getApp().globalData.watchTimes &&
            getApp().globalData.videoAdRewardwa
          )
            try {
              wx.showModal({
                title: "温馨提示",
                content: getApp().globalData.adTipwa,
                cancelText: "下次再说",
                confirmText: "观看广告",
                success: function (e) {
                  e.confirm &&
                    t.show().catch((e) => {
                      t.load().then((e) => {
                        t.show();
                      });
                    });
                },
              });
            } catch (t) {
              e.jiexiText();
            }
          else e.jiexiText();
        },
      });
    },
    jiexiText: function () {
      const t = this;
      wx.login({
        success: function (e) {
          wx.showLoading({ title: "正在解析文案" }),
            wx.request({
              url: getApp().globalData.fwqurl + "lyz/miniAnalyse",
              data: {
                code: e.code,
                programType: getApp().globalData.sid,
                link: t.data.inputContent,
                nickName: getApp().globalData.nickName,
                avatarUrl: getApp().globalData.headUrl,
              },
              method: "POST",
              success: function (e) {
                wx.hideLoading({}),
                  "0001" != e.data.code
                    ? wx.showModal({ content: e.data.message })
                    : (wx.showLoading({ title: "正在缓存视频" }),
                      wx.downloadFile({
                        url: e.data.data.playAddr,
                        success: function (e) {
                          console.log("下载结果", e),
                            t.execFile(e.tempFilePath);
                        },
                        fail: function () {
                          wx.showLoading({ title: "获取视频地址" }),
                            wx.request({
                              url:
                                getApp().globalData.fwqurl +
                                "/lyz/getDownLoadFileUrl",
                              method: "POST",
                              data: {
                                link: e.data.data.playAddr,
                                type: 1,
                                source: getApp().globalData.sid,
                              },
                              success: function (e) {
                                wx.showLoading({ title: "获取视频文件" }),
                                  "0001" == e.data.code
                                    ? wx.downloadFile({
                                        url: e.data.data,
                                        success: function (e) {
                                          t.execFile(e.tempFilePath);
                                        },
                                        fail: function (t) {
                                          wx.showModal({
                                            content:
                                              "非法的域名，请联系后台" +
                                              JSON.stringify(t),
                                          }),
                                            wx.hideLoading({});
                                        },
                                      })
                                    : wx.showModal({
                                        content: e.data.message,
                                      }) && wx.hideLoading({});
                              },
                              fail: function () {
                                wx.showModal({ content: "处理失败" });
                              },
                            });
                        },
                      }));
              },
            });
        },
      });
    },
    setInputContent: function (t) {
      this.setData({ inputContent: t.detail.value });
    },
    localVideo: function () {
      const e = this;
      e.setData({ action: "local" }),
        wx.request({
          url:
            getApp().globalData.fwqurl +
            "/lyz/getUserAdTimeswa?uid=" +
            getApp().globalData.uid,
          success: function (a) {
            if (
              a.data.data < getApp().globalData.watchTimes &&
              getApp().globalData.videoAdRewardwa
            )
              try {
                wx.showModal({
                  title: "温馨提示",
                  content: getApp().globalData.adTipwa,
                  cancelText: "下次再说",
                  confirmText: "观看广告",
                  success: function (e) {
                    e.confirm &&
                      t.show().catch((e) => {
                        t.load().then((e) => {
                          t.show();
                        });
                      });
                  },
                });
              } catch (t) {
                e.jiexiLocal();
              }
            else e.jiexiLocal();
          },
        });
    },
    jiexiLocal: function () {
      const t = this;
      wx.chooseVideo({
        compressed: !1,
        success: function (e) {
          wx.showLoading({ title: "请耐心等待" }), t.execFile(e.tempFilePath);
        },
      });
    },
    execFile: function (t) {
      const e = this;
      wx.showLoading({ title: "上传视频中..." }),
        a.postObject(
          {
            Bucket: getApp().globalData.bucket,
            Region: getApp().globalData.region,
            Key: "video/" + t.substr(t.lastIndexOf("/") + 1),
            FilePath: t,
          },
          function (t, a) {
            wx.hideLoading({}),
              t && t.error
                ? wx.showModal({
                    title: "返回错误",
                    content: "请求失败：" + (t.error.Message || t.error),
                    showCancel: !1,
                  })
                : t
                ? wx.showModal({
                    title: "请求出错",
                    content: "请求出错：" + t + "；状态码：" + t.statusCode,
                    showCancel: !1,
                  })
                : (wx.showLoading({ title: "正在转换数据..." }),
                  e
                    .pushUrlToCos(a.Location)
                    .then((t) => {
                      var a = setInterval(() => {
                        e.selectCosResult(t.data)
                          .then((t) => {
                            if (
                              (console.log(
                                `当前状态======${t.data.Status}======`
                              ),
                              "FINISH" == t.data.Status)
                            ) {
                              if (
                                (clearInterval(a),
                                wx.hideLoading({}),
                                "SUCCESS" != t.data.WorkflowTask.Message)
                              )
                                return wx.showModal({
                                  content: t.data.WorkflowTask.Message,
                                });
                              const o =
                                t.data.WorkflowTask.MediaProcessResultSet[0]
                                  .TranscodeTask.Output.Path;
                              e.getText(o)
                                .then((t) => {
                                  console.log(t),
                                    e.setData({
                                      inputContent: t.data.text,
                                      canInput: !1,
                                    }),
                                    wx.showModal({
                                      content: "解析成功，点击复制内容",
                                      confirmText: "复制",
                                      success: function (a) {
                                        if (a.confirm) {
                                          wx.setClipboardData({
                                            data: t.data.text,
                                          }),
                                            e.setData({ canInput: !0 });
                                          var o = wx.getStorageSync(
                                            "charastLists"
                                          )
                                            ? wx.getStorageSync("charastLists")
                                            : [];
                                          (o = [
                                            {
                                              title: "本地视频",
                                              time: e.nowTime(),
                                              text: t.data.text,
                                            },
                                            ...o,
                                          ]),
                                            wx.setStorageSync(
                                              "charastLists",
                                              o
                                            );
                                        }
                                      },
                                    });
                                })
                                .catch((t) => {
                                  wx.showToast({ title: t }),
                                    console.log("错误一");
                                });
                            }
                          })
                          .catch((t) => {
                            wx.showToast({ title: JSON.stringify(t) }),
                              clearInterval(a),
                              console.log("错误二"),
                              console.log(t);
                          });
                      }, 1e3);
                    })
                    .catch((t) => {
                      wx.showToast({ title: JSON.stringify(t) }),
                        console.log("错误三");
                    }));
          }
        );
    },
    noneClick() {
      wx.showToast({ icon: "none", title: "请先清空输入框数据再输入" });
    },
    clearInput: function () {
      this.setData({ inputContent: "", canInput: !0 });
    },
    goLookJieXiList: function () {
      wx.navigateTo({ url: "./jiexi_list" });
    },
    goLookJcourse: function () {
      wx.navigateTo({ url: "/pages/course/jiao" });
    },
    nowTime: function () {
      var t = new Date(),
        e = t.getFullYear(),
        a = t.getMonth() + 1,
        o = t.getDate(),
        n = t.getHours(),
        i = t.getMinutes(),
        l = t.getSeconds();
      t.getDay();
      return (
        a >= 1 && a <= 9 && (a = "0" + a),
        o >= 0 && o <= 9 && (o = "0" + o),
        n >= 0 && n <= 9 && (n = "0" + n),
        i >= 0 && i <= 9 && (i = "0" + i),
        l >= 0 && l <= 9 && (l = "0" + l),
        e + "-" + a + "-" + o + " " + n + ":" + i + ":" + l
      );
    },
    pushUrlToCos: function (t) {
      return new Promise(function (e, a) {
        wx.request({
          url: getApp().globalData.fwqurl + "cos/sendExec",
          data: { file: t, programType: getApp().globalData.sid },
          method: "POST",
          success: function (t) {
            1 == t.data.code ? e(t.data) : a(t.data);
          },
          fail: function (t) {
            a(t);
          },
        });
      });
    },
    selectCosResult: function (t) {
      return new Promise(function (e, a) {
        wx.request({
          url: getApp().globalData.fwqurl + "cos/selectTaskId",
          data: { taskId: t, programType: getApp().globalData.sid },
          method: "POST",
          success: function (t) {
            1 == t.data.code ? e(t.data) : a(t.data);
          },
          fail: function () {
            a({ code: 0, msg: "处理失败" });
          },
        });
      });
    },
    getText: function (t) {
      return new Promise(function (e, a) {
        wx.showLoading({ title: "正在提取文案..." }),
          wx.request({
            url: getApp().globalData.fwqurl + "lyz/getCharact",
            data: { file: t, programType: getApp().globalData.sid },
            method: "POST",
            success: function (t) {
              wx.hideLoading({}), 1 == t.data.code ? e(t.data) : a(t.data);
            },
            fail: function (t) {
              a({ code: 0, message: "处理失败" });
            },
          });
      });
    },
    onShareAppMessage: function (t) {
      return (
        t.from,
        {
          title: getApp().globalData.shareTitle,
          path: "/pages/index/index?openid=" + getApp().globalData.openid,
          imageUrl: getApp().globalData.sharePic,
        }
      );
    },
    onShareTimeline: function () {
      var t = wx.getStorageSync("id");
      return {
        title: this.data.noticedetail[0].title,
        query: "id= " + t,
        imageUrl: this.data.noticedetail[0].thumb,
      };
    },
  });
})();
