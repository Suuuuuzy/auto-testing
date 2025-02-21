var e = require("../../../common/vendor.js"),
  i = require("./props.js"),
  r = require("../../libs/mixin/mpMixin.js"),
  t = require("../../libs/mixin/mixin.js"),
  n = {
    name: "u-line",
    mixins: [r.mpMixin, t.mixin, i.props],
    computed: {
      lineStyle: function () {
        var i = {};
        return (
          (i.margin = this.margin),
          "row" === this.direction
            ? ((i.borderBottomWidth = "1px"),
              (i.borderBottomStyle = this.dashed ? "dashed" : "solid"),
              (i.width = e.index.$u.addUnit(this.length)),
              this.hairline && (i.transform = "scaleY(0.5)"))
            : ((i.borderLeftWidth = "1px"),
              (i.borderLeftStyle = this.dashed ? "dashed" : "solid"),
              (i.height = e.index.$u.addUnit(this.length)),
              this.hairline && (i.transform = "scaleX(0.5)")),
          (i.borderColor = this.color),
          e.index.$u.deepMerge(i, e.index.$u.addStyle(this.customStyle))
        );
      },
    },
  };
var d = e._export_sfc(n, [
  [
    "render",
    function (i, r, t, n, d, s) {
      return { a: e.s(s.lineStyle) };
    },
  ],
  ["__scopeId", "data-v-25d301ca"],
]);
wx.createComponent(d);
