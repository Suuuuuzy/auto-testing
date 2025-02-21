!(function () {
  let t = null;
  Page({
    data: {
      text: "",
      personInfo: { name: "思琪", voice: "siqi", suit: "温柔女声" },
      sepeed: [
        "1.5倍慢速",
        "1.2倍慢速",
        "正常语速",
        "1.1倍快速",
        "1.2倍快速",
        "1.5倍快速",
      ],
      sepeedNumer: ["-500", "-200", "0", "100", "250", "500"],
      selectSpeedIndex: 2,
      controller: [
        "小音量",
        "较小音量",
        "正常音量",
        "增大音量",
        "较大音量",
        "超大音量",
      ],
      controllerNumer: ["10", "30", "50", "60", "80", "100"],
      selectControllerIndex: 2,
      stopList: ["0.5秒", "1秒", "2秒", "3秒", "5秒"],
      cursor: 0,
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
      wx.createRewardedVideoAd &&
        ((t = wx.createRewardedVideoAd({
          adUnitId: getApp().globalData.videoAdRewardpy,
        })),
        t.onLoad(() => {
          console.log("onLoad event emit");
        }),
        t.onError((t) => {
          console.log("onError event emit", t);
        }),
        t.onClose((t) => {
          const e = this;
          console.log("onClose event emit", t),
            t && t.isEnded
              ? wx.request({
                  url:
                    getApp().globalData.fwqurl +
                    "lyz/updateUserAdTimespy?uid=" +
                    getApp().globalData.uid,
                  method: "GET",
                  success: function () {
                    console.log(t), e.pullDub();
                  },
                })
              : wx.showModal({ content: getApp().globalData.adTippy });
        }));
    },
    onReady: function () {},
    onShow: function () {},
    onHide: function () {},
    onUnload: function () {},
    onPullDownRefresh: function () {},
    onReachBottom: function () {},
    onShareAppMessage: function () {},
    setText: function (t) {
      console.log(t.detail.cursor), this.setData({ text: t.detail.value });
    },
    toPullSelect() {
      if (!this.data.text)
        return wx.showModal({ content: "请输入配音内容" }), !1;
      const e = this;
      wx.request({
        url:
          getApp().globalData.fwqurl +
          "lyz/getUserAdTimespy?uid=" +
          getApp().globalData.uid,
        success: function (a) {
          if (
            a.data.data < getApp().globalData.watchTimes &&
            getApp().globalData.videoAdRewardpy
          )
            try {
              wx.showModal({
                title: "温馨提示",
                content: getApp().globalData.adTippy,
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
              e.pullDub();
            }
          else e.pullDub();
        },
      });
    },
    pullDub: function () {
      const t = this;
      wx.showLoading({ title: "请稍等" }),
        wx.login({
          success: function (e) {
            wx.request({
              url: getApp().globalData.fwqurl + "lyz/dub",
              data: {
                text: t.data.text,
                programType: getApp().globalData.sid,
                voice: t.data.personInfo.voice,
                speech_rate: t.data.sepeedNumer[t.data.selectSpeedIndex],
                volume: t.data.controllerNumer[t.data.selectControllerIndex],
                code: e.code,
                programType: getApp().globalData.sid,
              },
              method: "POST",
              success: function (e) {
                if ("0001" != e.data.code)
                  wx.showModal({ content: e.data.message });
                else {
                  var a = wx.getStorageSync("dubLists")
                    ? wx.getStorageSync("dubLists")
                    : [];
                  (a = [{ title: t.data.text, url: e.data.data.url }, ...a]),
                    wx.setStorageSync("dubLists", a),
                    wx.navigateTo({
                      url:
                        "./down?url=" +
                        e.data.data.url +
                        "&text=" +
                        t.data.text,
                    });
                }
                wx.hideLoading();
              },
            });
          },
        });
    },
    userSelect: function () {
      wx.navigateTo({ url: "./userSelect" });
    },
    userSpeed: function () {
      const t = this;
      wx.showActionSheet({
        itemList: this.data.sepeed,
        success: function (e) {
          t.setData({ selectSpeedIndex: e.tapIndex });
        },
      });
    },
    userController: function () {
      const t = this;
      wx.showActionSheet({
        itemList: this.data.controller,
        success: function (e) {
          t.setData({ selectControllerIndex: e.tapIndex });
        },
      });
    },
    insertStop: function () {
      const t = this;
      wx.showActionSheet({
        itemList: this.data.stopList,
        success: function (e) {
          console.log(e.tapIndex),
            wx.setClipboardData({
              data: "[" + t.data.stopList[e.tapIndex] + "]",
              success: function () {
                wx.hideToast(), t.append();
              },
            });
        },
      });
    },
    append: function () {
      const t = this;
      wx.getClipboardData({
        success: (e) => {
          wx.hideToast();
          const a = t.data.text,
            o = a.slice(0, t.data.cursor) + e.data + a.slice(t.data.cursor);
          o.length <= 300
            ? t.setData({ text: o })
            : wx.showToast({ icon: "none", title: "最多可输入300字" });
        },
      });
    },
    clear: function () {
      this.setData({ text: "" });
    },
    onBlur: function (t) {
      this.setData({ cursor: t.detail.cursor });
    },
    history: function () {
      wx.navigateTo({ url: "./history" });
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
