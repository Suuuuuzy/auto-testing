var e = require("../../@babel/runtime/helpers/objectSpread2"),
  r = require("../../common/vendor.js"),
  n = {
    components: {
      orderList: function () {
        return "./components/shop-order_list.js";
      },
    },
    data: function () {
      return {
        currentTab: "tab1",
        color: [
          "rgba(32, 104, 215, 1)",
          "rgba(230, 69, 85, 1)",
          "rgba(69, 71, 77, 1)",
          "rgba(97, 220, 186, 1.0)",
        ],
        query: "1",
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
    onPullDownRefresh: function () {
      this.hasLogin && this.$refs.refresh.onRefresh();
    },
    onLoad: function () {},
    onShow: function () {
      this.$refs.refresh.onRefresh();
    },
    methods: {
      changeTab: function (e) {
        (this.currentTab = "tab" + e), (this.query = e);
      },
    },
  };
Array ||
  (r.resolveComponent("zym-navigation") + r.resolveComponent("order-list"))();
Math;
var t = r._export_sfc(n, [
  [
    "render",
    function (e, n, t, o, a, s) {
      return r.e(
        { a: r.p({ title: "商城订单", "is-home-page": !0 }) },
        r.e(
          {
            b: "tab1" === a.currentTab ? 1 : "",
            c: r.o(function (e) {
              return s.changeTab("1");
            }),
            d: "tab2" === a.currentTab ? 1 : "",
            e: r.o(function (e) {
              return s.changeTab("2");
            }),
            f: "tab1" === a.currentTab,
          },
          "tab1" === a.currentTab
            ? {
                g: r.sr("refresh", "b1dc1577-1"),
                h: r.p({ queryMode: a.query }),
              }
            : {},
          { i: "tab2" === a.currentTab },
          "tab2" === a.currentTab
            ? {
                j: r.sr("refresh", "b1dc1577-2"),
                k: r.p({ queryMode: a.query }),
              }
            : {}
        )
      );
    },
  ],
  ["__scopeId", "data-v-b1dc1577"],
]);
wx.createPage(t);
