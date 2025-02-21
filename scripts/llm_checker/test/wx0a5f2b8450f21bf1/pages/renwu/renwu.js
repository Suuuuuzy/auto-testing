!(function () {
  getApp();
  Page({
    data: {
      jiacishu: "",
      jiatianshu: "",
      song: "",
      yqzs: "",
      maxinum: "",
      nickName: "",
      videoAdAfter: "",
      cishukg: !1,
      tianshukg: !1,
    },
    jiacishuadd: function () {
      let a = this,
        t = wx.createRewardedVideoAd({
          adUnitId: getApp().globalData.renwujili,
        });
      t.offLoad(),
        t.offClose(),
        t.offError(),
        t
          .load()
          .then(() => t.show())
          .catch((a) => console.log(a.errMsg)),
        t.onError((t) => {
          console.log(t), a.jiacishu();
        }),
        t.onClose((t) => {
          (t && t.isEnded) || void 0 === t
            ? a.jiacishu()
            : wx.showModal({
                title: "温馨提示：",
                content:
                  "看完广告后获得\r\n" + this.data.jiacishu + "次解析次数",
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
    jiacishu(a) {
      var t = this;
      wx.request({
        url: getApp().globalData.fwqurl + "/lyz/jiacishu",
        data: { uid: getApp().globalData.openid, cishu: this.data.jiacishu },
        success(a) {
          console.log("充值次数成功", a),
            wx.showModal({
              title: "温馨提示：",
              content: "观看成功！\r\n解析次数加" + t.data.jiacishu + "次",
              showCancel: !0,
              cancelText: "取消",
              cancelColor: "#ed3f14",
              confirmText: "确定",
              confirmColor: "#ed3f14",
            }),
            t.setData({ cishukg: !0 });
          var e = t.data.cishukg;
          e = wx.setStorageSync("cishukg", e);
        },
      });
    },
    jiatianshuadd: function () {
      let a = this,
        t = wx.createRewardedVideoAd({
          adUnitId: getApp().globalData.renwujili,
        });
      t.offLoad(),
        t.offClose(),
        t.offError(),
        t
          .load()
          .then(() => t.show())
          .catch((a) => console.log(a.errMsg)),
        t.onError((t) => {
          console.log(t), a.jiatianshu();
        }),
        t.onClose((t) => {
          (t && t.isEnded) || void 0 === t
            ? a.jiatianshu()
            : wx.showModal({
                title: "温馨提示：",
                content:
                  "看完广告后获得\r\n" +
                  this.data.jiatianshu +
                  "天无限解析VIP会员!",
                showCancel: !0,
                cancelText: "不看了",
                cancelColor: "#ed3f14",
                confirmText: "继续看",
                confirmColor: "#ed3f14",
                success: function (t) {
                  t.cancel || a.jiatianshuadd();
                },
              });
        });
    },
    jiatianshu(a) {
      var t = this;
      wx.request({
        url: getApp().globalData.fwqurl + "/lyz/jiatianshu",
        data: {
          uid: getApp().globalData.openid,
          tianshu: this.data.jiatianshu,
        },
        success(a) {
          console.log("充值天数成功", a),
            wx.showModal({
              title: "温馨提示：",
              content: "观看成功！\r\n获得VIP会员" + t.data.jiatianshu + "天",
              showCancel: !0,
              cancelText: "取消",
              cancelColor: "#ed3f14",
              confirmText: "确定",
              confirmColor: "#ed3f14",
            }),
            t.setData({ tianshukg: !0 });
          var e = t.data.tianshukg;
          e = wx.setStorageSync("tianshukg", e);
        },
      });
    },
    onLoad: function (a) {
      var t = this;
      t.setData({
        jiacishu: getApp().globalData.jiacishu,
        jiatianshu: getApp().globalData.jiatianshu,
        song: getApp().globalData.song,
        videoAdAfter: getApp().globalData.videoAdAfter,
        renwujili: getApp().globalData.videoAdRewardpy,
      }),
        wx.request({
          url: getApp().globalData.fwqurl + "lyz/chushi",
          data: { uid: getApp().globalData.openid },
          success(a) {
            t.setData({ maxinum: a.data.data.maxinum, yqzs: a.data.data.yqzs });
          },
        });
    },
    wanchengdl() {
      wx.showToast({ title: "你已登录", icon: "none", duration: 3e3 });
    },
    wancheng() {
      wx.showToast({
        title: "今天的任务已经完成了哦",
        icon: "none",
        duration: 3e3,
      });
    },
    gologin: function () {
      wx.switchTab({ url: "../my/my" });
    },
    onReady: function () {},
    onShow: function (a) {
      const t = wx.getStorageSync("cishukg"),
        e = wx.getStorageSync("tianshukg"),
        i = wx.getStorageSync("nickName");
      this.setData({ nickName: i, cishukg: t, tianshukg: e });
      var n = wx.getStorageSync("cishu_expiration");
      if (n) {
        var o = n + 864e5;
        Date.parse(new Date()) > o &&
          (this.setData({ cishukg: !1 }),
          wx.setStorageSync("cishukg", !1),
          wx.setStorageSync("cishu_expiration", Date.parse(new Date())));
      } else wx.setStorageSync("cishu_expiration", Date.parse(new Date()));
      var s = wx.getStorageSync("tianshu_expiration");
      if (s) {
        o = s + 864e5;
        Date.parse(new Date()) > o &&
          (this.setData({ tianshukg: !1 }),
          wx.setStorageSync("tianshukg", !1),
          wx.setStorageSync("tianshu_expiration", Date.parse(new Date())));
      } else wx.setStorageSync("tianshu_expiration", Date.parse(new Date()));
    },
    onHide: function () {},
    onUnload: function () {},
    onPullDownRefresh: function () {},
    onReachBottom: function () {},
    onShareAppMessage: function (a) {
      return {
        title: getApp().globalData.shareTitle,
        path: "/pages/index/index?openid=" + getApp().globalData.openid,
        imageUrl: getApp().globalData.sharePic,
      };
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
