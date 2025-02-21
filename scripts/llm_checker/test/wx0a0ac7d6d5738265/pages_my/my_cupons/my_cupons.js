var e = require("../../common/vendor.js"),
  t = {
    components: {
      cuponList: function () {
        return "./components/coupon-list.js";
      },
    },
    data: function () {
      return {
        title: "",
        query: "0",
        tabs: [
          { name: "可使用", value: 0 },
          { name: "已使用", value: 1 },
          { name: "已过期", value: 2 },
        ],
      };
    },
    onLoad: function (e) {
      this.title = e.title;
    },
    onShow: function () {
      this.hasLogin && this.$refs.refresh.onRefresh();
    },
    onUnload: function () {
      this.title = "";
    },
  };
Array ||
  (
    e.resolveComponent("zym-navigation") +
    e.resolveComponent("cupon-list") +
    e.resolveComponent("zym-tabs")
  )();
Math ||
  (
    function () {
      return "../../pages/components/zym-navigation/zym-navigation.js";
    } +
    function () {
      return "../../pages/components/zym-tabs/zym-tabs.js";
    }
  )();
var n = e._export_sfc(t, [
  [
    "render",
    function (t, n, o, r, s, a) {
      return {
        a: e.p({ title: s.title, "is-home-page": !1 }),
        b: e.sr("refresh", "87c24263-2,87c24263-1"),
        c: e.p({ title: s.title, query: s.query }),
        d: e.o(function (e) {
          return (s.query = e.value);
        }),
        e: e.p({ tabs: s.tabs }),
      };
    },
  ],
  ["__scopeId", "data-v-87c24263"],
]);
wx.createPage(n);
