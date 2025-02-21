var e = require("../../../@babel/runtime/helpers/regeneratorRuntime"),
  o = require("../../../@babel/runtime/helpers/asyncToGenerator"),
  n = require("../../../common/vendor.js"),
  t = {
    props: {
      height: { type: String, default: "65" },
      oilCardList: {
        type: Array,
        default: function () {
          return [];
        },
      },
      topId: { type: String, default: "" },
    },
    data: function () {
      return { cardCoupon: !1, oilTypeDiscountList: [] };
    },
    methods: {
      openRechange: function (e) {
        this.$emit("open-rechange", e);
      },
      getCardBg: function (e) {
        return "92#" === e.oilType
          ? "rgba(232, 130, 130, 1)"
          : "95#" === e.oilType
          ? "rgba(76, 199, 156, 1)"
          : "98#" === e.oilType
          ? "rgba(80, 162, 230, 1)"
          : "0#" === e.oilType
          ? "rgba(95, 118, 120, 1)"
          : void 0;
      },
      toConsume: function (e, o) {
        console.log("卡号", e, "类型", o),
          "3" === o &&
            this.$jump(
              "/pages_car/fleet-card-detail/allocate-balance?cardid="
                .concat(e, "&topId=")
                .concat(this.topId)
            );
      },
      updatePhone: function (e, o) {
        console.log("修改手机号", e),
          o
            ? this.$jump(
                "/pages_my/update-check-phone/update-check-phone?cardid="
                  .concat(e, "&phone=")
                  .concat(o)
              )
            : this.$jump(
                "/pages_my/update-phone/update-phone?cardid=".concat(e)
              );
      },
      getCouponInfoById: function (n) {
        var t = this;
        return o(
          e().mark(function o() {
            var r;
            return e().wrap(function (e) {
              for (;;)
                switch ((e.prev = e.next)) {
                  case 0:
                    return (
                      (t.cardCoupon = !0),
                      (e.next = 3),
                      t.$api.$getOilCardCouponInfo(n)
                    );
                  case 3:
                    (r = e.sent),
                      console.log(r.data),
                      (t.oilTypeDiscountList = r.data.data);
                  case 5:
                  case "end":
                    return e.stop();
                }
            }, o);
          })
        )();
      },
    },
  };
Array ||
  (
    n.resolveComponent("u-icon") +
    n.resolveComponent("u-line") +
    n.resolveComponent("u-button") +
    n.resolveComponent("u-popup")
  )();
Math ||
  (
    function () {
      return "../../../uview-plus/components/u-icon/u-icon.js";
    } +
    function () {
      return "../../../uview-plus/components/u-line/u-line.js";
    } +
    function () {
      return "../../../uview-plus/components/u-button/u-button.js";
    } +
    function () {
      return "../../../uview-plus/components/u-popup/u-popup.js";
    }
  )();
var r = n._export_sfc(t, [
  [
    "render",
    function (e, o, t, r, a, c) {
      return n.e(
        {
          a: n.f(t.oilCardList, function (o, t, r) {
            return n.e(
              { a: o.cardName },
              o.cardName ? { b: n.t(o.cardName ? o.cardName : "") } : {},
              { c: o.phone },
              o.phone
                ? {
                    d: "".concat(e.$imgPath, "/phone.png"),
                    e: n.t(o.phone ? o.phone : ""),
                  }
                : {},
              { f: o.cardNum },
              o.cardNum ? { g: n.t(o.cardNum ? o.cardNum : "") } : {},
              { h: 1 === o.passwordExist },
              1 === o.passwordExist
                ? {
                    i: n.o(function (n) {
                      return e.$jump(
                        "/pages_my/check-password/check-password?cardid="
                          .concat(o.cardId, "&state=")
                          .concat(o.passwordExist)
                      );
                    }, o.cardId),
                  }
                : {},
              { j: 0 === o.passwordExist },
              0 === o.passwordExist
                ? {
                    k: n.o(function (n) {
                      return e.$jump(
                        "/pages_my/edit-password/edit-password?cardid="
                          .concat(o.cardId, "&state=")
                          .concat(o.passwordExist)
                      );
                    }, o.cardId),
                  }
                : {},
              {
                l: n.o(function (e) {
                  return c.openRechange(o);
                }, o.cardId),
                m: n.t(o.cardBalance),
                n: n.o(function (e) {
                  return c.getCouponInfoById(o.cardId);
                }, o.cardId),
                o: "603ae11e-0-" + r,
                p: "3" === o.cardType ? 1 : "",
                q: "3" !== o.cardType ? 1 : "",
                r: o.cardId,
                s: n.o(function (e) {
                  return c.toConsume(o.cardId, o.cardType);
                }, o.cardId),
              }
            );
          }),
          b: n.p({ name: "arrow-right", size: "24", color: "#fff" }),
          c: t.height + "vh",
          d: n.o(function (e) {
            return (a.cardCoupon = !1);
          }),
          e: n.p({ name: "close", size: "32" }),
          f: n.p({ color: "#F0F0F5FF", margin: "24rpx", length: "640rpx" }),
          g: a.oilTypeDiscountList,
        },
        a.oilTypeDiscountList
          ? {
              h: n.f(a.oilTypeDiscountList, function (e, o, t) {
                return {
                  a: n.t(e.oilType),
                  b: c.getCardBg(e),
                  c: n.t(e.discountAmount),
                  d: n.t(e.startTime),
                  e: n.t(e.endTime),
                  f: o,
                };
              }),
            }
          : {},
        {
          i: n.o(function (e) {
            return (a.cardCoupon = !1);
          }),
          j: n.p({ color: "#41bbc0" }),
          k: n.o(function (e) {
            return (a.cardCoupon = !1);
          }),
          l: n.p({ show: a.cardCoupon, mode: "bottom", round: "20" }),
        }
      );
    },
  ],
  ["__scopeId", "data-v-603ae11e"],
]);
wx.createComponent(r);
