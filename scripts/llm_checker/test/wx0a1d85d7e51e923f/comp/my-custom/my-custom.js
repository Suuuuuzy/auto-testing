var t = getApp();
Component({
  options: { addGlobalClass: !0, multipleSlots: !0 },
  properties: {
    bgColor: { type: String, default: "" },
    isCustom: { type: [Boolean, String], default: !1 },
    isBack: { type: [Boolean, String], default: !1 },
    isHome: { type: [Boolean, String], default: !1 },
    isLan: { type: [Boolean, String], default: !1 },
    lanText: { type: String, default: "" },
    color: { type: String, default: "orange" },
    bgImage: { type: String, default: "" },
  },
  data: {
    StatusBar: t.globalData.StatusBar,
    CustomBar: t.globalData.CustomBar,
    Custom: t.globalData.Custom,
    lanChecked: !0,
  },
  methods: {
    BackPage: function () {
      wx.navigateBack({ delta: 1 });
    },
    toHome: function () {
      wx.reLaunch({ url: "/pages/index/index" });
    },
    lanSwitch: function (t) {
      this.setData({ lanChecked: !0 }), this.triggerEvent("lanSwitch");
    },
  },
});
