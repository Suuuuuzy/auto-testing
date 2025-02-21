var e = require("../../common/vendor.js"),
  t = {
    data: function () {
      return {
        timer: null,
        time: 0,
        outOrderNo: "",
        endTime: 72,
        cuponList: [],
        str: "订单正在处理请稍后...",
      };
    },
    onLoad: function (e) {
      var t = this;
      e &&
        (this.timer = setInterval(function () {
          (t.time += 1),
            console.log(t.endTime),
            (t.str = "订单正在处理请稍后..."),
            t.endTime--,
            (t.outOrderNo = e.outOrderNo),
            t.getOrderSelect(e.outOrderNo);
        }, 1e3));
    },
    mounted: function () {},
    onUnload: function () {
      clearInterval(this.timer);
    },
    methods: {
      getOrderSelect: function (t) {
        var o = this;
        this.time >= 70
          ? (clearInterval(this.timer), this.nextPage())
          : this.$api.$getOrderSelect(t).then(function (t) {
              if (t.data.code === o.$code.SUCCESS) {
                (o.str = "处理完成"),
                  clearInterval(o.timer),
                  console.log(t.data);
                var n = t.data.data.storeCouponUsers,
                  r = o.cuponList.concat(n);
                (o.cuponList = Array.from(new Set(r.map(JSON.stringify))).map(
                  JSON.parse
                )),
                  !0 === t.data.data.couponState
                    ? (o.$refs.Zcoupon.show = !0)
                    : o.nextPage();
              } else t.data.code === o.$code.FAIL && (clearInterval(o.timer), e.index.hideLoading(), o.$toast(t.data.message), o.handleGoOrder());
            });
      },
      handleGoOrder: function () {
        this.$store.commit("changeTabCurrent", "order"),
          setTimeout(function () {
            e.index.switchTab({ url: "/pages/index/index" });
          }, 2e3);
      },
      nextPage: function () {
        e.index.redirectTo({
          url: "/pages_pay/order-detail/order-detail?outOrderNo=".concat(
            this.outOrderNo,
            "&orderStatus=1"
          ),
        });
      },
    },
  };
Array ||
  (
    e.resolveComponent("u-icon") +
    e.resolveComponent("zym-navigation") +
    e.resolveComponent("u-text") +
    e.resolveComponent("u-button") +
    e.resolveComponent("zym-coupon-popup")
  )();
Math ||
  (
    function () {
      return "../../uview-plus/components/u-icon/u-icon.js";
    } +
    function () {
      return "../../pages/components/zym-navigation/zym-navigation.js";
    } +
    function () {
      return "../../uview-plus/components/u-text/u-text.js";
    } +
    function () {
      return "../../uview-plus/components/u-button/u-button.js";
    } +
    function () {
      return "../../pages/components/zym-coupon-popup/zym-coupon-popup.js";
    }
  )();
var o = e._export_sfc(t, [
  [
    "render",
    function (t, o, n, r, i, a) {
      return {
        a: e.o(a.handleGoOrder),
        b: e.p({ name: "home", size: "44" }),
        c: e.p({ title: "订单处理中" }),
        d: e.p({ text: i.str, margin: "24rpx 0", size: "32rpx" }),
        e: e.o(a.handleGoOrder),
        f: e.p({ color: "#06b9c0", shape: "circle", text: "查看订单列表" }),
        g: e.sr("Zcoupon", "7b093d9e-4"),
        h: e.o(function (e) {
          return a.nextPage();
        }),
        i: e.p({
          title: "恭喜你",
          content: "获得专属优惠券",
          theme: "2",
          receive: !0,
          cuponList: i.cuponList,
          btnText: "确认",
        }),
      };
    },
  ],
  ["__scopeId", "data-v-7b093d9e"],
]);
wx.createPage(o);
