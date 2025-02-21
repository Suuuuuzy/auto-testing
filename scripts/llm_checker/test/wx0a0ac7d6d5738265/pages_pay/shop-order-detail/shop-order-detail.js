var o = require("../../@babel/runtime/helpers/regeneratorRuntime"),
  t = require("../../@babel/runtime/helpers/asyncToGenerator"),
  e = require("../../utils/debouns.js"),
  n = require("../../common/vendor.js"),
  s = require("../../common/assets.js"),
  r = {
    components: {},
    data: function () {
      return {
        shopInfo: [],
        loading: !0,
        timer: null,
        options: {
          width: 670,
          height: 160,
          code: "",
          text: {
            content: "",
            color: ["#45474d"],
            position: "bottom",
            size: 32,
            padding: 5,
          },
        },
      };
    },
    onLoad: function (o) {
      console.log(o),
        (this.options.text.content = o.outOrderNo),
        (this.options.code = o.outOrderNo),
        this.getInfo();
    },
    onUnload: function () {
      this.clearIntervals();
    },
    beforeDestroy: function () {
      this.clearIntervals();
    },
    mounted: function () {
      this.buyShop = e.throttle(this.buyShop, 5e3);
    },
    methods: {
      getInfo: function () {
        var e = this;
        return t(
          o().mark(function t() {
            var n;
            return o().wrap(function (o) {
              for (;;)
                switch ((o.prev = o.next)) {
                  case 0:
                    return (
                      (o.next = 2), e.$api.$getShopInfoByOrderNo(e.options.code)
                    );
                  case 2:
                    (n = o.sent),
                      console.log("详情", n.data.data),
                      n.data.code === e.$code.SUCCESS
                        ? ((e.loading = !1),
                          (e.shopInfo = n.data.data),
                          1 === n.data.data.payStatus &&
                            (e.timer = setInterval(function () {
                              e.Lunxun();
                            }, 1e3)))
                        : n.data.code === e.$code.TOKENFAIL &&
                          setTimeout(function () {
                            e.getInfo(n);
                          }, 1e3);
                  case 4:
                  case "end":
                    return o.stop();
                }
            }, t);
          })
        )();
      },
      Lunxun: function () {
        var o = this;
        this.$api.$getLunxunByOrderNo(this.options.code).then(function (t) {
          t.data.code === o.$code.SUCCESS &&
            (o.clearIntervals(),
            o.getInfo(o.options.code),
            o.$toast("核销成功", "success", 3e3)),
            t.data.code === o.$code.TOKENFAIL &&
              (o.clearIntervals(), o.getInfo(o.options.code)),
            t.data.code === o.$code.FAIL &&
              (o.clearIntervals(),
              o.$toast("核销失败", "none", 3e3),
              o.getInfo(o.options.code));
        });
      },
      clearIntervals: function () {
        clearInterval(this.timer), (this.timer = null);
      },
    },
  };
Array ||
  (
    n.resolveComponent("zym-navigation") +
    n.resolveComponent("zym-qrcode") +
    n.resolveComponent("u-line") +
    n.resolveComponent("u-skeleton")
  )();
Math ||
  (
    function () {
      return "../../pages/components/zym-navigation/zym-navigation.js";
    } +
    function () {
      return "../../pages/components/zym-qrcode/zym-qrcode.js";
    } +
    function () {
      return "../../uview-plus/components/u-line/u-line.js";
    } +
    function () {
      return "../../uview-plus/components/u-skeleton/u-skeleton.js";
    }
  )();
var a = n._export_sfc(r, [
  [
    "render",
    function (o, t, e, r, a, i) {
      return n.e(
        {
          a: n.p({ title: "商品订单详情", "is-home-page": !1 }),
          b: 2 === a.shopInfo.payStatus,
        },
        2 === a.shopInfo.payStatus ? { c: s._imports_0$1 } : {},
        { d: 1 === a.shopInfo.payStatus },
        1 === a.shopInfo.payStatus ? { e: s._imports_1$1 } : {},
        {
          f: n.t(2 === a.shopInfo.payStatus ? "已核销" : "待核销"),
          g: 1 === a.shopInfo.payStatus,
        },
        1 === a.shopInfo.payStatus
          ? { h: n.p({ val: a.options.code, size: 200 }) }
          : {},
        {
          i: n.t(a.shopInfo.outOrderNo),
          j: n.t(
            0 === a.shopInfo.payStatus
              ? "未付款"
              : 1 === a.shopInfo.payStatus
              ? "待核销"
              : 2 === a.shopInfo.payStatus
              ? "已核销"
              : ""
          ),
          k: n.n(1 === a.shopInfo.payStatus ? "col_or" : "col_h"),
          l: n.t(a.shopInfo.payTime),
          m: n.p({ color: "#F7F8FA" }),
          n: a.shopInfo.homeImg,
          o: n.t(a.shopInfo.packName),
          p: n.t(a.shopInfo.unitPrice),
          q: a.shopInfo.couponPriceAll,
        },
        a.shopInfo.couponPriceAll ? { r: n.t(a.shopInfo.couponPriceAll) } : {},
        {
          s: n.t(a.shopInfo.totalAmount),
          t: n.f(a.shopInfo.acPackProductList, function (o, t, e) {
            return {
              a: n.t(o.productName),
              b: n.t(o.productNetWeight),
              c: n.t(o.productPrice),
              d: n.t(o.productNum),
              e: o.id,
            };
          }),
          v: n.f(a.shopInfo.acPackCouponVOList, function (o, t, e) {
            return {
              a: n.t(o.couponName),
              b: n.t(o.couponNum),
              c: n.t(o.couponTotalPrice),
              d: t,
            };
          }),
          w: n.p({ color: "#EDEEF0" }),
          x: n.t(a.shopInfo.useEndTime),
          y: n.t(a.shopInfo.remark),
          z: n.p({
            loading: a.loading,
            rows: "20",
            "rows-height": "36",
            "rows-width": "750rpx",
          }),
        }
      );
    },
  ],
  ["__scopeId", "data-v-565b76e0"],
]);
wx.createPage(a);
