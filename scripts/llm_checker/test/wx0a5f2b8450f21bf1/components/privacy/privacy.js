Component({
  properties: { showModalStatus: { type: Boolean, value: !1 } },
  observers: {
    showModalStatus: function (o) {
      o &&
        (console.log("重新唤醒"),
        wx.hideTabBar({
          animation: !0,
          success: function () {
            console.log("TabBar已隐藏");
          },
        }));
    },
  },
  data: { privacyContractName: "", showModalStatus: !1 },
  pageLifetimes: {
    show: function () {
      console.log("组件的生命周期");
      var o = this,
        t = wx.getAppBaseInfo().SDKVersion;
      o.compareVersion(t, "2.32.3") >= 0 &&
        wx.getPrivacySetting({
          success: function (t) {
            console.log(t),
              "getPrivacySetting:ok" == t.errMsg &&
                (o.setData({
                  privacyContractName: t.privacyContractName,
                  showModalStatus: t.needAuthorization,
                }),
                1 == t.needAuthorization &&
                  wx.hideTabBar({
                    animation: !0,
                    success: function () {
                      console.log("TabBar已隐藏");
                    },
                  }),
                wx.setStorageSync("privacy", t.needAuthorization));
          },
        });
    },
  },
  methods: {
    openPrivacyContract: function () {
      wx.openPrivacyContract({
        fail: function () {
          wx.showToast({ title: "遇到错误", icon: "error" });
        },
      });
    },
    exitMiniProgram: function () {
      wx.setStorageSync("privacy", !0),
        console.log("拒绝授权"),
        this.setData({ showModalStatus: !1 }),
        wx.showTabBar({
          animation: !0,
          success: function () {
            console.log("TabBar已显示");
          },
          fail: function (o) {
            console.error("显示TabBar失败", o);
          },
        }),
        wx.showToast({ title: "本程序部分功能将不可使用", icon: "none" });
    },
    handleAgreePrivacyAuthorization: function (o) {
      wx.setStorageSync("privacy", !1),
        console.log("同意授权", o),
        this.setData({ showModalStatus: !1 }),
        wx.showTabBar({
          animation: !0,
          success: function () {
            console.log("TabBar已显示");
          },
          fail: function (o) {
            console.error("显示TabBar失败", o);
          },
        }),
        wx.showToast({ title: "授权成功", icon: "none" });
    },
    compareVersion: function (o, t) {
      (o = o.split(".")), (t = t.split("."));
      for (var a = Math.max(o.length, t.length); o.length < a; ) o.push("0");
      for (; t.length < a; ) t.push("0");
      for (var n = 0; n < a; n++) {
        var e = parseInt(o[n]),
          s = parseInt(t[n]);
        if (e > s) return 1;
        if (e < s) return -1;
      }
      return 0;
    },
  },
});
