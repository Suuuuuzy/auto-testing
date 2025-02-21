var e = require("../../../common/vendor.js"),
  i = require("./props.js"),
  t = require("../../libs/mixin/mpMixin.js"),
  n = require("../../libs/mixin/mixin.js"),
  r = {
    name: "u-safe-bottom",
    mixins: [t.mpMixin, n.mixin, i.props],
    data: function () {
      return { safeAreaBottomHeight: 0, isNvue: !1 };
    },
    computed: {
      style: function () {
        return e.index.$u.deepMerge({}, e.index.$u.addStyle(this.customStyle));
      },
    },
    mounted: function () {},
  };
var s = e._export_sfc(r, [
  [
    "render",
    function (i, t, n, r, s, o) {
      return {
        a: e.s(o.style),
        b: e.n(!s.isNvue && "u-safe-area-inset-bottom"),
      };
    },
  ],
  ["__scopeId", "data-v-ee014040"],
]);
wx.createComponent(s);
