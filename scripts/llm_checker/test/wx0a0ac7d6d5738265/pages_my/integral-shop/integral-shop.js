var e = require("../../@babel/runtime/helpers/regeneratorRuntime"),
  n = require("../../@babel/runtime/helpers/asyncToGenerator"),
  o = require("../../common/vendor.js"),
  t = {
    data: function () {
      return { coupons: [] };
    },
    onLoad: function () {
      this.redeemCouponList();
    },
    methods: {
      pgList: function () {
        return 60;
      },
      redeemCouponList: function () {
        var e = this;
        this.$api
          .redeemCouponList()
          .then(function (n) {
            console.log("Coupon redeemed:", n), (e.coupons = n.data.data);
          })
          .catch(function (e) {});
      },
      openRedeemPop: function () {
        this.$refs.popuop.open("bottom");
      },
      handleRedeemCoupon: function (t) {
        var r = this;
        return n(
          e().mark(function n() {
            var a, u;
            return e().wrap(function (e) {
              for (;;)
                switch ((e.prev = e.next)) {
                  case 0:
                    return (
                      (e.next = 2), r.$api.redeemCouponIntegral(t.couponIssueId)
                    );
                  case 2:
                    return (
                      (a = e.sent),
                      o.index.showModal({
                        content: a.data.data.hint,
                        showCancel: !1,
                      }),
                      (e.next = 6),
                      r.$api.getUserInfoDetail()
                    );
                  case 6:
                    (u = e.sent),
                      o.index.setStorageSync("userInfo", u.data.data);
                  case 8:
                  case "end":
                    return e.stop();
                }
            }, n);
          })
        )();
      },
    },
  };
Array || o.resolveComponent("zym-navigation")();
Math;
var r = o._export_sfc(t, [
  [
    "render",
    function (e, n, t, r, a, u) {
      return {
        a: o.p({ title: "积分商城" }),
        b: o.f(a.coupons, function (e, n, t) {
          return {
            a: o.t(e.couponPrice),
            b: o.t(e.cname),
            c: o.t(e.integral),
            d: o.o(function (n) {
              return u.handleRedeemCoupon(e);
            }, e.couponIssueId),
            e: e.couponIssueId,
          };
        }),
        c: o.o(function (n) {
          return e.onLoadMore();
        }),
        d: o.o(function () {
          return e.onRefresh && e.onRefresh.apply(e, arguments);
        }),
      };
    },
  ],
  ["__scopeId", "data-v-c06eef55"],
]);
wx.createPage(r);
