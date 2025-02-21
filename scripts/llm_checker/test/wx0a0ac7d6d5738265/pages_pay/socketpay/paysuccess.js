var e = require("../../common/vendor.js"),
  r = {
    data: function () {
      return {
        navigationBarHeight:
          e.index.getStorageSync("navigationBarHeight") || 42,
        statusBarHeight: e.index.getStorageSync("statusBarHeight"),
      };
    },
    methods: {
      goOrder: function () {
        this.$redirect("/pages_my/recharge-vip/recharge-vip?cureent=tab2");
      },
    },
  };
Array || e.resolveComponent("u-icon")();
Math;
var t = e._export_sfc(r, [
  [
    "render",
    function (r, t, a, n, o, i) {
      return {
        a: o.statusBarHeight + "px",
        b: e.p({ name: "arrow-left", size: "32" }),
        c: e.o(function () {
          return i.goOrder && i.goOrder.apply(i, arguments);
        }),
        d: o.navigationBarHeight + "px",
        e: e.o(function () {
          return i.goOrder && i.goOrder.apply(i, arguments);
        }),
      };
    },
  ],
  ["__scopeId", "data-v-81cebbc1"],
]);
wx.createPage(t);
