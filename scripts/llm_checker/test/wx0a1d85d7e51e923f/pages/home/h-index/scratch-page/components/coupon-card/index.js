var t = {
  default: { text: "去使用", theme: "primary" },
  useless: { text: "已使用", theme: "default" },
  disabled: { text: "已过期", theme: "default" },
};
Component({
  options: { addGlobalClass: !0, multipleSlots: !0 },
  externalClasses: ["coupon-class"],
  properties: {
    couponDTO: { type: Object, value: {} },
    btnText: {
      type: String,
      observer: function (t) {
        console.log("btnTxt --", t);
      },
    },
    isReceived: { type: Boolean, value: !1, observer: function (t) {} },
    canUse: {
      type: Boolean,
      value: !0,
      observer: function (t) {
        console.log("canUse --\x3e", t);
      },
    },
  },
  data: { btnTheme: "" },
  observers: {
    couponDTO: function (e) {
      if ((console.log("couponDTO --\x3e>", e), e)) {
        var o = t[e.status],
          n = this.data.btnText;
        n || (n = o.text),
          console.log("btnTxt --", n),
          this.setData({ btnText: n, btnTheme: o.theme });
      }
    },
  },
  attached: function () {},
  methods: {
    gotoDetail: function () {
      wx.navigateTo({
        url: "/pages/coupon/coupon-detail/index?id=".concat(
          this.data.couponDTO.key
        ),
      });
    },
    gotoGoodsList: function () {
      wx.navigateTo({
        url: "/pages/coupon/coupon-activity-goods/index?id=".concat(
          this.data.couponDTO.key
        ),
      });
    },
    btnClick: function (t) {
      this.triggerEvent("btnClick");
    },
  },
});
