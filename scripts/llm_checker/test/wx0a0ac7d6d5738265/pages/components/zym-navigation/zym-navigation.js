var e = require("../../../common/vendor.js"),
  t = {
    name: "Header",
    props: ["title", "isHomePage", "mini"],
    data: function () {
      return {};
    },
    mounted: function () {
      console.log("ishomePage", this.isHomePage);
    },
    methods: {
      back: function () {
        this.isHomePage
          ? e.index.switchTab({ url: "/pages/index/index" })
          : getCurrentPages().length > 1
          ? e.index.navigateBack()
          : e.index.switchTab({ url: "/pages/index/index" });
      },
    },
  };
Array ||
  (
    e.resolveComponent("u-icon") +
    e.resolveComponent("u-line") +
    e.resolveComponent("u-text")
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
      return "../../../uview-plus/components/u-text/u-text.js";
    }
  )();
var n = e._export_sfc(t, [
  [
    "render",
    function (t, n, o, i, r, s) {
      var u, a, l, c;
      return e.e(
        {
          a: t.$store.getters.getStatusBarHeight + "px",
          b: null == (u = t.$slots) ? void 0 : u.leftIcon,
        },
        null != (a = t.$slots) && a.leftIcon
          ? {}
          : o.mini
          ? {
              d: e.o(function (e) {
                return s.back();
              }),
              e: e.p({ name: "arrow-left", size: "40" }),
              f: e.p({ direction: "col", margin: "0 8rpx", color: "#FFF" }),
              g: e.o(function (e) {
                return t.$switchTab();
              }),
              h: e.p({ name: "home", size: "40" }),
            }
          : {
              i: e.o(function (e) {
                return s.back();
              }),
              j: e.p({ name: "arrow-left", size: "48" }),
            },
        { c: o.mini, k: null == (l = t.$slots) ? void 0 : l.title },
        null != (c = t.$slots) && c.title
          ? {}
          : {
              l: e.t(o.title),
              m: e.p({ align: "center", text: o.title, size: "32" }),
            },
        {
          n: e.s("width: ".concat(o.mini ? 61 : 20, "px;")),
          o: t.$store.getters.getNavigationHeight + "px",
        }
      );
    },
  ],
  ["__scopeId", "data-v-5adfbf24"],
]);
wx.createComponent(n);
