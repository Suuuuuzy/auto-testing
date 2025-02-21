var e = require("../../../common/vendor.js"),
  i = require("./props.js"),
  r = require("../../libs/mixin/mpMixin.js"),
  n = require("../../libs/mixin/mixin.js"),
  t = {
    name: "u-status-bar",
    mixins: [r.mpMixin, n.mixin, i.props],
    data: function () {
      return {};
    },
    computed: {
      style: function () {
        var i = {};
        return (
          (i.height = e.index.$u.addUnit(
            e.index.$u.sys().statusBarHeight,
            "px"
          )),
          (i.backgroundColor = this.bgColor),
          e.index.$u.deepMerge(i, e.index.$u.addStyle(this.customStyle))
        );
      },
    },
  };
var s = e._export_sfc(t, [
  [
    "render",
    function (i, r, n, t, s, u) {
      return { a: e.s(u.style) };
    },
  ],
  ["__scopeId", "data-v-3dab125a"],
]);
wx.createComponent(s);
