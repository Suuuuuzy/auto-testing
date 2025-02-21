var e = require("../../../@babel/runtime/helpers/objectSpread2"),
  r = require("./props.js"),
  n = require("../../../common/vendor.js"),
  t = {
    mixins: [r.props],
    data: function () {
      return { currentTab: "" };
    },
    mounted: function () {
      (this.currentTab = this.tabs[this.current].name),
        this.changeTab(this.tabs[this.current], this.current);
    },
    methods: {
      changeTab: function (r, n) {
        console.log(r, n),
          (this.currentTab = r.name),
          this.$emit("change", e(e({}, r), {}, { index: n }));
      },
    },
  };
var a = n._export_sfc(t, [
  [
    "render",
    function (e, r, t, a, c, i) {
      return {
        a: n.f(e.tabs, function (r, t, a) {
          return {
            a: n.t(r.name),
            b: c.currentTab === r.name ? 1 : "",
            c: c.currentTab === r.name ? e.bgColor : "",
            d: n.o(function (e) {
              return i.changeTab(r, t);
            }, t),
            e: t,
          };
        }),
      };
    },
  ],
  ["__scopeId", "data-v-d5cb99d6"],
]);
wx.createComponent(a);
