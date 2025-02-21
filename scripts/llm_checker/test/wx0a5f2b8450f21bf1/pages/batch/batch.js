!(function () {
  Page({
    data: {
      current: 0,
      productList: [],
      checkd_list: [],
      is_down: "",
      down: !1,
      currentindex: 0,
      max_cursor: "",
      has_more: "",
      pageIndex: 1,
      loadding: !1,
      pullUpOn: !0,
      showResult: !1,
      analyseUrl: "",
      nickName: "未登录用户",
      author: this.$author,
      avatarUrl: "",
      batchAd: "",
      showAd: !1,
      isendd: 0,
      videoType: 0,
      adError: 0,
    },
    onLoad: function (a) {
      this.setData({ batchAd: getApp().globalData.batchAd, showAd: !0 });
    },
    jiacishuadd2: function () {
      var a = this;
      0 === a.data.checkd_list.length
        ? wx.showToast({ title: "请选择需要保存的视频", icon: "none" })
        : wx.request({
            url:
              getApp().globalData.fwqurl +
              "/lyz/getUserAdTimespl?uid=" +
              getApp().globalData.uid,
            success: function (t) {
              console.log(t),
                t.data.data < getApp().globalData.watchTimes &&
                getApp().globalData.videoAdRewardpl
                  ? wx.showModal({
                      title: "温馨提示：",
                      content: getApp().globalData.adTippl,
                      showCancel: !0,
                      cancelText: "下次再说",
                      cancelColor: "#ed3f14",
                      confirmText: "观看广告",
                      confirmColor: "#ed3f14",
                      success: function (t) {
                        t.cancel || a.jiacishuadd();
                      },
                    })
                  : a.save_checked();
            },
          });
    },
    jiacishuadd: function () {
      let a = this,
        t = wx.createRewardedVideoAd({
          adUnitId: getApp().globalData.videoAdRewardpl,
        });
      t.offLoad(),
        t.offClose(),
        t.offError(),
        t
          .load()
          .then(() => t.show())
          .catch((a) => console.log(a.errMsg)),
        t.onError((t) => {
          console.log(t), a.save_checked();
        }),
        t.onClose((t) => {
          (t && t.isEnded) || void 0 === t
            ? a.save_checked()
            : wx.showModal({
                title: "温馨提示：",
                content: "看完广告后,才可获得免费下载哦",
                showCancel: !0,
                cancelText: "不看了",
                cancelColor: "#ed3f14",
                confirmText: "继续看",
                confirmColor: "#ed3f14",
                success: function (t) {
                  t.cancel || a.jiacishuadd();
                },
              });
        });
    },
    quanadd2: function () {
      var a = this;
      wx.request({
        url:
          getApp().globalData.fwqurl +
          "/lyz/getUserAdTimespl?uid=" +
          getApp().globalData.uid,
        success: function (t) {
          console.log(t),
            t.data.data < getApp().globalData.watchTimes &&
            getApp().globalData.videoAdRewardpl
              ? (console.log("666"),
                wx.showModal({
                  title: "温馨提示：",
                  content: getApp().globalData.adTippl,
                  showCancel: !0,
                  cancelText: "下次再说",
                  cancelColor: "#ed3f14",
                  confirmText: "观看广告",
                  confirmColor: "#ed3f14",
                  success: function (t) {
                    t.cancel || a.quanadd();
                  },
                }))
              : (console.log("888"), a.all_save());
        },
      });
    },
    quanadd: function () {
      let a = this,
        t = wx.createRewardedVideoAd({
          adUnitId: getApp().globalData.videoAdRewardpl,
        });
      t.offLoad(),
        t.offClose(),
        t.offError(),
        t
          .load()
          .then(() => t.show())
          .catch((a) => console.log(a.errMsg)),
        t.onError((t) => {
          console.log(t), a.save_checked();
        }),
        t.onClose((t) => {
          (t && t.isEnded) || void 0 === t
            ? wx.request({
                url:
                  getApp().globalData.fwqurl +
                  "/lyz/updateUserAdTimespl?uid=" +
                  getApp().globalData.uid,
                method: "GET",
                success(t) {
                  console.log(t), a.all_save();
                },
              })
            : wx.showModal({
                title: "温馨提示：",
                content: "看完广告后,才可获得免费下载哦",
                showCancel: !0,
                cancelText: "不看了",
                cancelColor: "#ed3f14",
                confirmText: "继续看",
                confirmColor: "#ed3f14",
                success: function (t) {
                  t.cancel || a.quanadd();
                },
              });
        });
    },
    choseVideo: function (a) {
      console.log(a);
      var t = this,
        o = a.currentTarget.dataset.shu,
        e = t.data.productList[o],
        n = t.data.productList;
      e.checked = !e.checked;
      var l = n.filter(function (a) {
        return a.checked && a;
      });
      console.log(l), t.setData({ productList: n, checkd_list: l });
    },
    save_checked: function () {
      var a = this;
      a.setData({ down_num: a.data.checkd_list.length, down: !0, is_down: 1 }),
        a.downloadFile(a.data.checkd_list).then(function (t) {
          a.setData({ down: !1 }),
            1 == a.data.is_down
              ? wx.showToast({ title: "下载完成", duration: 2e3 })
              : wx.showToast({
                  title: "结束下载",
                  duration: 2e3,
                  icon: "none",
                });
        });
    },
    all_save: function () {
      var a = this,
        t = a.data.productList;
      a.setData({ down_num: a.data.productList.length, down: !0, is_down: 1 }),
        console.log(t),
        (a.data.down_num = a.data.productList.length),
        (a.data.down = !0),
        (a.data.is_down = 1),
        a.downloadFile(t).then(function (t) {
          console.log("下载"),
            a.setData({ down: !1 }),
            1 == a.data.is_down
              ? wx.showToast({ title: "下载完成", duration: 2e3 })
              : wx.showToast({
                  title: "结束下载",
                  duration: 2e3,
                  icon: "none",
                });
        });
    },
    downloadFile: function (a) {
      console.log(a);
      var t = this,
        o = Promise.resolve();
      return (
        a.forEach(function (e, n) {
          o = o.then(function () {
            var o = (10 / a.length) * 10;
            return (
              t.setData({ currentindex: n + 1, percents: (n + 1) * o }),
              t.downloads(e)
            );
          });
        }),
        console.log(o),
        o
      );
    },
    downloads: function (a) {
      var t = this;
      return (
        console.log(t.data.down),
        "" == a.playAddr
          ? (t.data.down, !0)
          : 1 == t.data.down
          ? new Promise(function (o, e) {
              wx.downloadFile({
                url: a.playAddr,
                success: function (a) {
                  var e = a.tempFilePath;
                  wx.saveVideoToPhotosAlbum({
                    filePath: e,
                    success: function (a) {
                      o(a);
                    },
                    fail: function (a) {
                      t.setData({ list_show: !1 });
                    },
                  });
                },
                fail: function (a) {
                  console.log(a), e(a);
                },
              });
            })
          : void 0
      );
    },
    playVideo: function (a) {
      let t = a.target.dataset.shu;
      "" == this.data.productList[t].playAddr
        ? ((getApp().globalData.productList = this.data.productList[t].pics),
          (getApp().globalData.cover = this.data.productList[t].cover),
          (getApp().globalData.desc = this.data.productList[t].desc),
          wx.navigateTo({ url: "../picInfo/picInfo" }))
        : ((getApp().globalData.playAddr = this.data.productList[t].playAddr),
          (getApp().globalData.cover = this.data.productList[t].cover),
          (getApp().globalData.desc = this.data.productList[t].desc),
          wx.navigateTo({ url: "../videoInfo/videoInfo" }));
    },
    download: function (a) {},
    teach: function () {
      wx.navigateTo({ url: "../parse/parse?conId=3" });
    },
    analyse: function (a) {
      (link = this.isUrl(this.data.analyseUrl)),
        link &&
          (wx.showLoading({ title: "解析中" }),
          this.setData({
            productList: "",
            has_more: 0,
            down: !1,
            checkd_list: [],
          }),
          this.videoAnalyse());
    },
    analyseUrl: function (a) {
      this.setData({ analyseUrl: a.detail.value });
    },
    empty: function () {
      this.setData({
        productList: "",
        down: !1,
        checkd_list: [],
        analyseUrl: "",
        is_down: "",
      });
    },
    clearText: function (a) {
      var t = this;
      wx.getClipboardData({
        success: function (a) {
          console.log(a),
            wx.hideToast(),
            (a.data || "").length > 1
              ? t.setData({ analyseUrl: a.data })
              : wx.showModal({
                  title: "提示",
                  content: "没有检测到有效的链接地址",
                  showCancel: !1,
                });
        },
      });
    },
    isUrl: function (a) {
      var t = this;
      if (0 == a.length)
        return (
          wx.showModal({
            title: "温馨提示",
            content: "网址不能为空",
            confirmColor: "#ff9900",
            showCancel: !1,
          }),
          !1
        );
      var o = t.handleUrl(a);
      wx.getStorageSync("guize");
      return (
        o ||
        (wx.showModal({
          title: "温馨提示",
          content: "请输入正确的网址",
          confirmColor: "#ff9900",
          showCancel: !1,
          success: function (a) {
            t.setData({ result: "" });
          },
        }),
        !1)
      );
    },
    handleUrl: function (a) {
      return (
        !!(a = a.match(
          /(https?|http|ftp|file):\/\/[-A-Za-z0-9+&@#/%?=~_|!:,.;]+[-A-Za-z0-9+&@#/%=~_|]/g
        )) && a[0]
      );
    },
    videoAnalyse: function (a, t) {
      var o = this;
      wx.login({
        success: function (a) {
          var t = a.code;
          wx.request({
            url: getApp().globalData.fwqurl + "/lyz/miniBatchAnalyse",
            data: {
              code: t,
              programType: getApp().globalData.sid,
              link: o.data.analyseUrl,
              nickName: "t",
              avatarUrl: "n",
            },
            method: "POST",
            success: function (a) {
              console.log(a),
                "0001" == a.data.code
                  ? o.setData({
                      productList: a.data.data,
                      showResult: !0,
                      has_more: 1,
                      max_cursor: a.data.max_cursor,
                    })
                  : wx.showModal({ content: a.data.message });
            },
            complete: function (a) {
              wx.hideLoading();
            },
          });
        },
      });
    },
    videoAnalyses: function (a, t) {
      var o = this;
      wx.login({
        success: function (a) {
          var t = a.code;
          console.log(o.data.max_cursor),
            wx.request({
              url: getApp().globalData.fwqurl + "/lyz/miniBatchAnalyse",
              data: {
                code: t,
                programType: getApp().globalData.sid,
                link: o.data.analyseUrl,
                max_cursor: o.data.max_cursor,
                nickName: getApp().globalData.nickName,
                avatarUrl: getApp().globalData.headUrl,
              },
              method: "POST",
              success: function (a) {
                console.log(a.data.data),
                  null == a.data.data
                    ? (wx.showToast({
                        title: "没有更多了",
                        icon: "none",
                        duration: 1500,
                      }),
                      o.setData({ has_more: 0 }))
                    : o.setData({
                        productList: o.data.productList.concat(a.data.data),
                        showResult: !0,
                        has_more: 1,
                        max_cursor: a.data.max_cursor,
                      });
              },
              complete: function (a) {
                wx.hideLoading();
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
    onReachBottom: function () {
      wx.showLoading({ title: "加载中" });
      var a = this;
      console.log(a.has_more, "====", a.max_cursor),
        0 == a.data.has_more
          ? wx.showToast({ title: "没有更多了", icon: "none", duration: 1500 })
          : (console.log("还有呢"), a.videoAnalyses());
    },
    onShareAppMessage: function (a) {
      return (
        a.from,
        {
          title: getApp().globalData.shareTitle,
          path: "/pages/index/index?openid=" + getApp().globalData.openid,
          imageUrl: getApp().globalData.sharePic,
        }
      );
    },
    onShareTimeline: function () {
      var a = wx.getStorageSync("id");
      return {
        title: this.data.noticedetail[0].title,
        query: "id= " + a,
        imageUrl: this.data.noticedetail[0].thumb,
      };
    },
  });
})();
