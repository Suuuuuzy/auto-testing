var e = require("../../@babel/runtime/helpers/regeneratorRuntime"),
  t = require("../../@babel/runtime/helpers/asyncToGenerator"),
  n = require("../../common/vendor.js"),
  o = {
    data: function () {
      return { loading: !0, por: "", vipInfo: [] };
    },
    created: function () {},
    onLoad: function () {},
    mounted: function () {
      this.process();
    },
    methods: {
      getVipLogo: function () {
        return "普通会员" === this.vipInfo.memberLevel
          ? "".concat(this.$imgPath, "/ptvip.png")
          : "".concat(this.$imgPath, "/hjvip.png");
      },
      gettxtColor: function () {
        return "普通会员" === this.vipInfo.memberLevel
          ? "rgba(114, 136, 158, 1)"
          : "rgba(168, 106, 24, 1)";
      },
      getProcessColor: function () {
        return "普通会员" === this.vipInfo.memberLevel
          ? "rgba(114, 136, 158, 1)"
          : "rgba(168, 106, 24, 1)";
      },
      getDHClass: function () {
        return "普通会员" === this.vipInfo.memberLevel ? "pttxt" : "hjtxt";
      },
      getBackround: function () {
        return "普通会员" === this.vipInfo.memberLevel
          ? "linear-gradient(128.79deg, #F3F5F5FF 0%, #DDE6F0FF 100%)"
          : "linear-gradient(138.84deg, #FFFCE6FF 0%, #FCD8A2FF 66.16%, #F8CD88FF 99.31%)";
      },
      getCardSrc: function () {
        return "普通会员" === this.vipInfo.memberLevel
          ? "".concat(this.$imgPath, "/pthz.png")
          : "".concat(this.$imgPath, "/hjhz.png");
      },
      process: function () {
        var n = this;
        return t(
          e().mark(function t() {
            var o;
            return e().wrap(function (e) {
              for (;;)
                switch ((e.prev = e.next)) {
                  case 0:
                    return (e.next = 2), n.$api.$getUserVipInfo();
                  case 2:
                    (o = e.sent),
                      (n.vipInfo = o.data.data),
                      console.log(o),
                      o.data.code === n.$code.SUCCESS
                        ? (n.loading = !1)
                        : o.data.code === n.$code.TOKENFAIL &&
                          setTimeout(function () {
                            n.process();
                          }, 2e3);
                  case 4:
                  case "end":
                    return e.stop();
                }
            }, t);
          })
        )();
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
      redeemCoupon: function () {
        this.$jump("/pages_my/integral-shop/integral-shop");
      },
    },
  };
Array ||
  (n.resolveComponent("zym-navigation") + n.resolveComponent("u-skeleton"))();
Math ||
  (
    function () {
      return "../../pages/components/zym-navigation/zym-navigation.js";
    } +
    function () {
      return "../../uview-plus/components/u-skeleton/u-skeleton.js";
    }
  )();
var r = n._export_sfc(o, [
  [
    "render",
    function (e, t, o, r, i, a) {
      return {
        a: a.getVipLogo(),
        b: n.t(i.vipInfo.memberLevel),
        c: a.gettxtColor(),
        d: a.getCardSrc(),
        e: n.f(i.vipInfo.memberLevelCoupons, function (e, t, o) {
          return {
            a: n.t(e.oilType),
            b: a.getCardBg(e),
            c: n.t(e.discountAmount),
            d: t,
          };
        }),
        f: a.getBackround(),
        g: n.p({
          loading: i.loading,
          rows: "16",
          "rows-height": "36",
          "rows-width": "750rpx",
        }),
      };
    },
  ],
]);
wx.createPage(r);
