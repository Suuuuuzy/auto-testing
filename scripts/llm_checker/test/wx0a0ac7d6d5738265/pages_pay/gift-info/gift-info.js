var e = require("../../@babel/runtime/helpers/regeneratorRuntime"),
  n = require("../../@babel/runtime/helpers/asyncToGenerator"),
  o = require("../../common/vendor.js"),
  t = require("../../utils/debouns.js"),
  r = {
    data: function () {
      return { packId: "", shopInfo: {}, loading: !0 };
    },
    onLoad: function (e) {
      console.log(!this.shopInfo),
        console.log(e),
        (this.packId = e.id),
        this.getInfo(e);
    },
    mounted: function () {
      this.buyShop = t.throttle(this.buyShop, 5e3);
    },
    methods: {
      getInfo: function (o) {
        var t = this;
        return n(
          e().mark(function n() {
            var r;
            return e().wrap(function (e) {
              for (;;)
                switch ((e.prev = e.next)) {
                  case 0:
                    return (e.next = 2), t.$api.$getShopedInfo(o.id);
                  case 2:
                    (r = e.sent),
                      console.log("详情", r),
                      r.data.code === t.$code.SUCCESS &&
                        ((t.loading = !1), (t.shopInfo = r.data.data)),
                      r.data.code === t.$code.TOKENFAIL &&
                        setTimeout(function () {
                          t.getInfo(o);
                        }, 1e3);
                  case 4:
                  case "end":
                    return e.stop();
                }
            }, n);
          })
        )();
      },
      buyShop: function () {
        var t = this;
        return n(
          e().mark(function n() {
            var r, a, s;
            return e().wrap(function (e) {
              for (;;)
                switch ((e.prev = e.next)) {
                  case 0:
                    if (t.$store.state.hasLogin) {
                      e.next = 3;
                      break;
                    }
                    return (
                      o.index.showModal({
                        title: "温馨提示",
                        content:
                          "将获取您的手机号用于线下收银机核销的唯一标识！",
                        success: function (e) {
                          e.confirm && t.$jump("/pages_my/login/wx_login");
                        },
                      }),
                      e.abrupt("return")
                    );
                  case 3:
                    if (t.shopInfo.inventory) {
                      e.next = 5;
                      break;
                    }
                    return e.abrupt("return");
                  case 5:
                    return (
                      t.$loading("正在加载..."),
                      (r = { packId: t.packId }),
                      (e.next = 9),
                      t.$api.$postBuyShop(r)
                    );
                  case 9:
                    (a = e.sent),
                      console.log("购买", a),
                      a.data.code === t.$code.SUCCESS
                        ? ((s = a.data.data),
                          console.log("下单成功啦，开始发起支付啦"),
                          t.wxpay(s))
                        : t.$toast(a.data.message || "下单失败");
                  case 11:
                  case "end":
                    return e.stop();
                }
            }, n);
          })
        )();
      },
      wxpay: function (e) {
        console.log(111, e), this.$API_BASE_URL;
        var n = this;
        o.index.requestPayment({
          provider: "wxpay",
          timeStamp: e.payTimeStamp,
          nonceStr: e.paynonceStr,
          package: e.payPackage,
          signType: e.paySignType,
          paySign: e.paySign,
          success: function (e) {
            "requestPayment:ok" === e.errMsg &&
              n.$jump("/pages_pay/shop-order/shop-order");
          },
          fail: function (o) {
            if (
              ("requestPayment:fail cancel" === o.errMsg &&
                n.shopOrderCancle(e.outOrderNo),
              "调用支付JSAPI缺少参数：total_fee" === o.errMsg)
            )
              return n.$toast("支付失败", "none", 2e3, !1), !1;
            n.$toast(JSON.stringify(o), "none", 2e3, !1);
          },
        });
      },
      shopOrderCancle: function (o) {
        var t = this;
        return n(
          e().mark(function n() {
            var r;
            return e().wrap(function (e) {
              for (;;)
                switch ((e.prev = e.next)) {
                  case 0:
                    return (e.next = 2), t.$api.$getShopOrderCancel(o);
                  case 2:
                    (r = e.sent),
                      console.log(r),
                      r.data.code === t.$code.SUCCESS &&
                        t.$toast("支付已取消", "none", 2e3, !1),
                      r.data.code === t.$code.TOKENFAIL && t.shopOrderCancle(o);
                  case 4:
                  case "end":
                    return e.stop();
                }
            }, n);
          })
        )();
      },
      preImg: function () {
        o.index.previewImage({ urls: [this.shopInfo.detailsImg] });
      },
    },
  };
Array ||
  (
    o.resolveComponent("zym-navigation") +
    o.resolveComponent("u-line") +
    o.resolveComponent("u-button") +
    o.resolveComponent("u-skeleton")
  )();
Math ||
  (
    function () {
      return "../../pages/components/zym-navigation/zym-navigation.js";
    } +
    function () {
      return "../../uview-plus/components/u-line/u-line.js";
    } +
    function () {
      return "../../uview-plus/components/u-button/u-button.js";
    } +
    function () {
      return "../../uview-plus/components/u-skeleton/u-skeleton.js";
    }
  )();
var a = o._export_sfc(r, [
  [
    "render",
    function (e, n, t, r, a, s) {
      return {
        a: o.p({ title: "支付明细", "is-home-page": !0 }),
        b: a.shopInfo.detailsImg,
        c: o.o(function () {
          return s.preImg && s.preImg.apply(s, arguments);
        }),
        d: o.t(a.shopInfo.packName),
        e: o.t(a.shopInfo.originalPrice),
        f: o.t(a.shopInfo.price),
        g: o.t(a.shopInfo.inventory),
        h: o.f(a.shopInfo.acPackProductList, function (e, n, t) {
          return {
            a: o.t(e.productName),
            b: o.t(e.productNetWeight),
            c: o.t(e.productPrice),
            d: o.t(e.productNum),
            e: e.id,
          };
        }),
        i: o.f(a.shopInfo.acPackCouponVOList, function (e, n, t) {
          return {
            a: o.t(e.couponName),
            b: o.t(e.couponNum),
            c: o.t(e.couponTotalPrice),
            d: n,
          };
        }),
        j: o.p({ color: "#EDEEF0" }),
        k: o.t(a.shopInfo.useEndTime),
        l: o.t(a.shopInfo.remark),
        m: o.p({
          text: a.shopInfo.inventory ? "立即购买" : "售罄",
          shape: "circle",
          color: a.shopInfo.inventory ? "#06B9C0FF" : "#E3E4E6FF",
        }),
        n: o.o(function (e) {
          return s.buyShop();
        }),
        o: o.p({
          loading: a.loading,
          rows: "16",
          "rows-height": "36",
          "rows-width": "750rpx",
        }),
      };
    },
  ],
  ["__scopeId", "data-v-d3131d8c"],
]);
wx.createPage(a);
