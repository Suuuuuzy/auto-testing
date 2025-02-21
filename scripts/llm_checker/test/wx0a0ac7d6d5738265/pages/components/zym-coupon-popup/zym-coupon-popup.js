var e = require("../../../utils/debouns.js"),
  t = require("../../../common/vendor.js"),
  n = {
    name: "ZymCouponPop",
    data: function () {
      return { show: !1 };
    },
    props: {
      theme: { type: String, required: !1, default: "1" },
      title: { type: String, required: !1, default: "" },
      content: { type: String, required: !0, default: "" },
      price: { type: String, required: !1 },
      minPrice: { type: String, required: !1, default: "0" },
      name: { type: String, required: !0 },
      btnText: { type: String, required: !1, default: "" },
      receive: { type: Boolean, default: !1, required: !0 },
      cuponList: { type: Array, default: [], required: !0 },
    },
    mounted: function () {
      this.handleGet = e.throttle(this.handleGet, 3e3);
    },
    watch: {
      show: function (e) {
        !1 === e && this.$emit("getClick");
      },
    },
    methods: {
      handleGet: function () {
        this.show = !1;
      },
      handleMastClick: function () {
        this.show = !1;
      },
    },
  };
Array || t.resolveComponent("u-popup")();
Math;
var o = t._export_sfc(n, [
  [
    "render",
    function (e, n, o, i, r, u) {
      return {
        a: "".concat(e.$imgPath, "/cou_bg") + o.theme + ".png",
        b: t.t(o.title),
        c: t.t(o.content),
        d: t.f(o.cuponList, function (e, n, i) {
          return t.e(
            { a: t.t(e.couponPrice) },
            o.minPrice ? { b: t.t(e.useMinPrice) } : {},
            {
              c: t.t(e.couponTitle ? e.couponTitle : e.cname),
              d: t.t(e.couponTime <= 0 ? e.endTime : e.couponTime + "天"),
              e: t.t(1 == e.isSuperposition ? "可叠加" : "不可叠加"),
              f: n,
            }
          );
        }),
        e: o.minPrice,
        f: "".concat(e.$imgPath, "/cou_btn_") + o.theme + ".png",
        g: t.t(!0 === o.receive ? o.btnText : "立即领取"),
        h: t.o(function () {
          return u.handleGet && u.handleGet.apply(u, arguments);
        }),
        i: t.n("theme" + o.theme),
        j: t.sr("coupon_pop", "79bad9c1-0"),
        k: t.o(u.handleMastClick),
        l: t.p({
          show: r.show,
          mode: "center",
          "safe-area-inset-bottom": !1,
          customStyle: "background:none;",
        }),
      };
    },
  ],
  ["__scopeId", "data-v-79bad9c1"],
]);
wx.createComponent(o);
