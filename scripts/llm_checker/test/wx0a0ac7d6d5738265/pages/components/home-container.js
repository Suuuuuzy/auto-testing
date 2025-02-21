var e = require("../../@babel/runtime/helpers/regeneratorRuntime"),
  t = require("../../@babel/runtime/helpers/asyncToGenerator"),
  o = require("../../common/vendor.js"),
  n = require("../../common/assets.js"),
  a = {
    data: function () {
      return { oilPriceList: [], topId: "" };
    },
    mounted: function () {
      (this.topId = o.index.getStorageSync("userInfo").topId),
        this.getOilPrice();
    },
    methods: {
      toPlatePay: function () {
        console.log("车牌支付"),
          o.index.getStorageSync("userInfo").phoneNumber
            ? o.index.getStorageSync("userInfo").licensePlateNumber
              ? this.$jump("/pages_pay/socketpay/socketpay?title=车牌支付")
              : this.$jump("/pages_asset/add_phone_car/add_phone_car")
            : this.$toast("请先登录");
      },
      openScanCode: function () {
        o.index.scanCode({
          success: function (e) {
            console.log("扫码成功", e);
          },
          fail: function (e) {
            console.log("扫码失败", e);
          },
        });
      },
      getOilPrice: function () {
        var o = this;
        return t(
          e().mark(function t() {
            var n;
            return e().wrap(function (e) {
              for (;;)
                switch ((e.prev = e.next)) {
                  case 0:
                    return (e.next = 2), o.$api.$getOilTyesPrice();
                  case 2:
                    (n = e.sent),
                      console.log(n),
                      n.data.code === o.$code.SUCCESS &&
                        (o.oilPriceList = n.data.data);
                  case 4:
                  case "end":
                    return e.stop();
                }
            }, t);
          })
        )();
      },
    },
  };
var r = o._export_sfc(a, [
  [
    "render",
    function (e, t, a, r, c, i) {
      return o.e(
        {
          a: n._imports_0$5,
          b: o.o(function (t) {
            return e.$jump("/pages_pay/pay/pay");
          }),
          c: n._imports_1$2,
          d: o.o(function () {
            return i.toPlatePay && i.toPlatePay.apply(i, arguments);
          }),
          e: c.topId,
        },
        c.topId
          ? {
              f: "".concat(e.$imgPath, "/fleetdetail.png"),
              g: o.o(function (t) {
                return e.$jump(
                  "/pages_asset/fleet-card-detail/fleet-card-list?topId=".concat(
                    c.topId
                  )
                );
              }),
            }
          : {},
        {
          h: o.f(c.oilPriceList, function (e, t, n) {
            return {
              a: o.t(e.oilName),
              b: o.n(
                "92#" === e.oilName
                  ? "c_red"
                  : "95#" === e.oilName
                  ? "c_gren"
                  : "98#" === e.oilName
                  ? "c_blue"
                  : "c_black"
              ),
              c: o.t(e.price),
              d: e.oilName,
            };
          }),
        }
      );
    },
  ],
  ["__scopeId", "data-v-13487246"],
]);
wx.createComponent(r);
