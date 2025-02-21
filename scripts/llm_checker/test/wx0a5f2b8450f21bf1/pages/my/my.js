!(function () {
  getApp();
  Page({
    data: {
      showModal: !1,
      nickName: "",
      avatarUrl: "",
      headUrl: "",
      huoquUrl: "",
      author: getApp().globalData.author,
      autoDownload: !1,
      allowTopup: "",
      myAd: getApp().globalData.myAd,
      code: "",
      gzgzh: getApp().globalData.gzgzh,
      freeType: 0,
      userType: getApp().globalData.userType,
      uid: "",
      sid: wx.getStorageSync("sid"),
      kamima: "",
      endTime: "",
      keyong: 0,
      isLogin: !1,
      status: [
        { key: 1, name: "教程", url: "../../static/img/learn.png" },
        { key: 2, name: "解析记录", url: "../../static/img/record.png" },
        { key: 3, name: "邀请列表", url: "../../static/img/concat.png" },
        { key: 4, name: "小程序码", url: "../../static/img/qrcode.png" },
        { key: 5, name: "支持作者", url: "../../static/img/prize-1.png" },
      ],
      menus: [
        { name: "联系作者", icon: "../../static/img/concat.png", key: 1 },
        { name: "自动下载", icon: "../../static/img/download.png", key: 2 },
      ],
    },
    onLoad: function (a) {
      var t = getApp().globalData.myAd;
      this.setData({
        myAd: t,
        nickName: getApp().globalData.nickName,
        allowTopup: getApp().globalData.allow_topup,
        freeType: getApp().globalData.freeType,
      });
    },
    onReady: function () {},
    onShow: function () {
      const a = this;
      var t = wx.getStorageSync("avatarUrl"),
        e = wx.getStorageSync("headUrl");
      t.length > 2
        ? a.setData({ avatarUrl: t })
        : e.length > 2 && a.setData({ avatarUrl: e });
      var o = wx.getStorageSync("isLogin");
      a.register(),
        a.setData({
          isLogin: o,
          uid: getApp().globalData.uid,
          nickName: wx.getStorageSync("nickName"),
        }),
        wx.request({
          url: getApp().globalData.fwqurl + "/GetYqList",
          data: { uid: getApp().globalData.uid, sid: getApp().globalData.sid },
          success: function (t) {
            a.setData({ keyong: t.data.data.keyong });
          },
        });
    },
    kamima: function (a) {
      this.setData({ kamima: a.detail.value });
    },
    activityCode: function () {
      var a = this;
      wx.showLoading({ title: "激活中" }),
        wx.request({
          url: getApp().globalData.fwqurl + "/lyz/activityUserByCode",
          data: {
            code: a.data.kamima,
            source: getApp().globalData.sid,
            uid: a.data.uid,
          },
          method: "POST",
          success: function (t) {
            "0002" == t.data.code
              ? wx.showModal({ content: t.data.message })
              : wx.showModal({ content: "激活成功" }, a.register());
          },
          complete: function (a) {
            wx.hideLoading();
          },
        });
    },
    tapuid: function () {
      var a = getApp().globalData.uid;
      wx.setClipboardData({
        data: "" + a,
        success: function (a) {
          console.log(a), wx.showModal({ content: "已经复制UID" });
        },
      });
    },
    toPage: function (a) {
      a = a.currentTarget.dataset.index;
      console.log(a),
        0 == a
          ? wx.setClipboardData({
              data: getApp().globalData.author,
              success: function (a) {
                wx.showModal({ content: "已复制作者微信" });
              },
            })
          : this.autoDownload
          ? ((this.autoDownload = !1),
            (getApp().globalData.autoDownload = !1),
            wx.setStorageSync("autoDownload", !1),
            this.setData({ autoDownload: !1 }),
            wx.showModal({
              content: "自动下载功能已经关闭，解析成功后需要手动点击保存到相册",
            }))
          : ((this.autoDownload = !0),
            (getApp().globalData.autoDownload = !0),
            wx.setStorageSync("autoDownload", !0),
            this.setData({ autoDownload: !0 }),
            wx.showModal({
              content: "自动下载功能已经开启，解析成功后系统自动保存到相册",
            }));
    },
    register: function () {
      var a = this;
      wx.login({
        success: function (t) {
          var e = t.code;
          wx.request({
            url: getApp().globalData.fwqurl + "/video/registryUser",
            data: {
              code: e,
              programType: a.data.sid,
              scene: getApp().globalData.scene,
              openid: getApp().globalData.openids,
            },
            success: function (t) {
              a.setData({
                endTime: t.data.data.endTime,
                userType: t.data.data.userType,
              });
            },
          });
        },
      });
    },
    page: function (a) {
      0 == (a = a.currentTarget.dataset.index)
        ? wx.navigateTo({ url: "../parse/parse?conId=3" })
        : 1 == a
        ? wx.navigateTo({ url: "../list/list" })
        : 2 == a
        ? wx.navigateTo({ url: "../lists/lists" })
        : 3 == a
        ? wx.previewImage({
            urls: [getApp().globalData.chengxuma],
            longPressActions: { itemList: ["发送给朋友", "保存图片", "收藏"] },
          })
        : wx.previewImage({
            urls: [getApp().globalData.prizeImg],
            longPressActions: { itemList: ["发送给朋友", "保存图片", "收藏"] },
          });
    },
    toVip: function () {
      wx.getStorageSync("isLogin")
        ? wx.navigateTo({
            url:
              "./vip?endTime=" +
              this.data.endTime +
              "&userType=" +
              this.data.userType,
          })
        : wx.showToast({ title: "请先登录", icon: "none" });
    },
    onChooseAvatar(a) {
      console.log(a),
        this.setData({
          huoquUrl: a.detail.avatarUrl,
          avatarUrl: a.detail.avatarUrl,
        });
    },
    toujiance: function (a) {
      var t = this;
      wx.request({
        url: getApp().globalData.fwqurl + "toujiance",
        data: { userid: getApp().globalData.uid },
        success: function (a) {
          if (1 == a.data.code)
            if ((console.log(a), "普通用户" === a.data.data.nickname))
              console.log("没有"),
                wx.navigateTo({ url: "/pages/myuser/myuser" });
            else {
              wx.setStorageSync("isLogin", !0),
                wx.setStorageSync("headUrl", a.data.data.headUrl),
                wx.setStorageSync("nickName", a.data.data.nickname),
                wx.setStorageSync("keyong", a.data.data.keyong),
                wx.setStorageSync("uid", a.data.data.uid);
              var e = wx.getStorageSync("isLogin");
              t.setData({
                isLogin: e,
                avatarUrl: a.data.data.headUrl,
                nickName: a.data.data.nickname,
                uid: a.data.data.uid,
              }),
                wx.showToast({ title: "登录成功", icon: "success" }),
                console.log("有");
            }
          else
            console.log("没有2"),
              wx.navigateTo({ url: "/pages/myuser/myuser" });
        },
      });
    },
    preventTouchMove: function () {},
    onHide: function () {},
    onUnload: function () {},
    onPullDownRefresh: function () {},
    onReachBottom: function () {},
    onShareAppMessage: function () {},
  });
})();
