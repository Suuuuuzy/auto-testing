var e = require("../../@babel/runtime/helpers/regeneratorRuntime"),
  t = require("../../@babel/runtime/helpers/asyncToGenerator"),
  n = require("../../common/vendor.js"),
  o = require("../../common/assets.js"),
  r = {
    data: function () {
      return { giftList: [], pages: 1, size: 10 };
    },
    mounted: function () {
      console.log("礼包挂载完成"), this.getGiftData();
    },
    methods: {
      getGiftData: function () {
        var n = this;
        return t(
          e().mark(function t() {
            var o, r;
            return e().wrap(function (e) {
              for (;;)
                switch ((e.prev = e.next)) {
                  case 0:
                    return (
                      (o = { pages: n.pages, size: n.size }),
                      (e.next = 3),
                      n.$api.$getShopList(o)
                    );
                  case 3:
                    (r = e.sent),
                      console.log(r),
                      r.data.code === n.$code.SUCCESS &&
                        (console.log(r.data.data),
                        (n.giftList = r.data.data.packList)),
                      r.data.code === n.$code.TOKENFAIL &&
                        setTimeout(function () {
                          return n.getGiftData();
                        }, 2e3);
                  case 5:
                  case "end":
                    return e.stop();
                }
            }, t);
          })
        )();
      },
      handleShopOrder: function () {
        n.index.getStorageSync("userInfo").phoneNumber
          ? this.$jump("/pages_pay/shop-order/shop-order")
          : this.$toast("请先登录后操作");
      },
    },
  };
Array || (n.resolveComponent("u-button") + n.resolveComponent("u-empty"))();
Math ||
  (
    function () {
      return "../../uview-plus/components/u-button/u-button.js";
    } +
    function () {
      return "../../uview-plus/components/u-empty/u-empty.js";
    }
  )();
var i = n._export_sfc(r, [
  [
    "render",
    function (e, t, r, i, a, s) {
      return n.e(
        {
          a: o._imports_0$4,
          b: n.o(function () {
            return s.handleShopOrder && s.handleShopOrder.apply(s, arguments);
          }),
          c: a.giftList.length,
        },
        a.giftList.length
          ? {
              d: n.f(a.giftList, function (t, o, r) {
                return {
                  a: n.t(t.packName),
                  b: n.t(t.originalPrice),
                  c: t.homeImg,
                  d: n.t(t.price),
                  e: n.t(t.inventory),
                  f: "5f3f81b4-0-" + r,
                  g: n.p({
                    text: t.inventory ? "立即购买" : "售罄",
                    shape: "circle",
                    color: t.inventory ? "#06B9C0FF" : "#E3E4E6FF",
                  }),
                  h: t.packId,
                  i: n.o(function (n) {
                    return e.$jump(
                      "/pages_pay/gift-info/gift-info?id=".concat(t.packId)
                    );
                  }, t.packId),
                };
              }),
            }
          : {
              e: n.p({
                mode: "list",
                icon: "/static/shopemty.png",
                textSize: "28",
                iconSize: "180",
                text: "暂时没有商品哦~",
                width: "320",
                height: "320",
              }),
            }
      );
    },
  ],
  ["__scopeId", "data-v-5f3f81b4"],
]);
wx.createComponent(i);
