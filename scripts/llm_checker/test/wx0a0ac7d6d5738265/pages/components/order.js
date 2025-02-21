var e = require("../../@babel/runtime/helpers/objectSpread2"),
  r = require("../../common/vendor.js"),
  t = {
    components: {
      orderList: function () {
        return "./order_list.js";
      },
    },
    data: function () {
      return {
        color: [
          "rgba(32, 104, 215, 1)",
          "rgba(230, 69, 85, 1)",
          "rgba(69, 71, 77, 1)",
          "rgba(97, 220, 186, 1.0)",
        ],
        query: "1",
        tabs: [
          { name: "全部", value: 1 },
          { name: "未支付", value: 2 },
          { name: "已完成", value: 3 },
          { name: "已取消", value: 4 },
        ],
      };
    },
    computed: e(
      {},
      r.mapState({
        hasLogin: function (e) {
          return e.hasLogin;
        },
      })
    ),
  };
Array || (r.resolveComponent("order-list") + r.resolveComponent("zym-tabs"))();
Math;
var n = r._export_sfc(t, [
  [
    "render",
    function (e, t, n, a, o, s) {
      return r.e(
        {
          a: e.$store.getters.getStatusBarHeight + "px",
          b: e.$store.getters.getNavigationHeight + "px",
          c: e.hasLogin,
        },
        e.hasLogin
          ? {
              d: r.sr("refresh", "4983f0a2-1,4983f0a2-0"),
              e: r.p({ queryMode: o.query }),
              f: r.o(function (e) {
                return (o.query = e.value);
              }),
              g: r.p({ tabs: o.tabs }),
            }
          : {
              h: r.o(function (r) {
                return e.$jump("/pages_my/login/wx_login");
              }),
            }
      );
    },
  ],
]);
wx.createComponent(n);
