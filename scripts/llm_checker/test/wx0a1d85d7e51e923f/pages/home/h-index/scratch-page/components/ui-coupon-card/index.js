Component({
  options: { addGlobalClass: !0, multipleSlots: !0 },
  externalClasses: ["coupon-class"],
  properties: {
    mask: { type: Boolean, value: !1 },
    superposable: { type: Boolean, value: !1 },
    type: { type: String, value: "" },
    value: { type: String, value: "" },
    tag: { type: String, value: "" },
    desc: { type: String, value: "" },
    title: { type: String, value: "" },
    timeLimit: { type: String, value: "" },
    ruleDesc: { type: String, value: "" },
    currency: { type: String, value: "¥" },
    status: { type: String, value: "default" },
    image: { type: String, value: "" },
  },
  data: {
    CouponType: { MJ_COUPON: 1, ZK_COUPON: 2, MJF_COUPON: 3, GIFT_COUPON: 4 },
    theme: "primary",
  },
  observers: {
    status: function (e) {
      var t = "primary";
      ("useless" !== e && "disabled" !== e) || (t = "weak"),
        this.setData({ theme: t });
    },
  },
  attached: function () {
    this.setData({ color: "color".concat(this.properties.colorStyle) });
  },
});
