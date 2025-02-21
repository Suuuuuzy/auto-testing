var n = require("../../@babel/runtime/helpers/regeneratorRuntime"),
  e = require("../../@babel/runtime/helpers/asyncToGenerator"),
  o = require("../../common/vendor.js"),
  t = {
    data: function () {
      return {
        couponData: [
          { name: "加油券", count: 0 },
          { name: "洗车券", count: 0 },
          { name: "特惠券", count: 0 },
          { name: "现金券", count: 0 },
          { name: "单升券", count: 0 },
          { name: "非油券", count: 0 },
        ],
      };
    },
    mounted: function () {
      this.getCouponNumber();
    },
    methods: {
      getCouponNumber: function () {
        var o = this;
        return e(
          n().mark(function e() {
            var t, a;
            return n().wrap(function (n) {
              for (;;)
                switch ((n.prev = n.next)) {
                  case 0:
                    return (n.next = 2), o.$api.getCarCouponNumber();
                  case 2:
                    (t = n.sent).data.code === o.$code.SUCCESS
                      ? ((a = t.data.data),
                        (o.couponData[0].count = a.storeCouponUserNumber),
                        (o.couponData[1].count = a.carWashCouponNumber))
                      : t.data.code === o.$code.TOKENFAIL &&
                        o.getCouponNumber();
                  case 4:
                  case "end":
                    return n.stop();
                }
            }, e);
          })
        )();
      },
    },
  };
Array ||
  (o.resolveComponent("zym-navigation") + o.resolveComponent("u-icon"))();
Math ||
  (
    function () {
      return "../../pages/components/zym-navigation/zym-navigation.js";
    } +
    function () {
      return "../../uview-plus/components/u-icon/u-icon.js";
    }
  )();
var a = o._export_sfc(t, [
  [
    "render",
    function (n, e, t, a, r, u) {
      return {
        a: o.p({ title: "我的优惠券", "is-home-page": !0 }),
        b: o.f(r.couponData, function (e, t, a) {
          return {
            a: o.t(e.name),
            b: o.t(e.count),
            c: o.n(e.count > 0 ? "bgr" : "huise"),
            d: "d269d341-1-" + a,
            e: e.name,
            f: o.o(function (o) {
              return n.$jump(
                "/pages_my/my_cupons/my_cupons?title=".concat(e.name)
              );
            }, e.name),
          };
        }),
        c: o.p({ name: "arrow-right", size: "32" }),
      };
    },
  ],
  ["__scopeId", "data-v-d269d341"],
]);
wx.createPage(a);
