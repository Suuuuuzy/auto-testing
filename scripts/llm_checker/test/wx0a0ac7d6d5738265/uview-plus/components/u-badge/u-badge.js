var e = require("../../../common/vendor.js"),
  t = require("./props.js"),
  i = require("../../libs/mixin/mpMixin.js"),
  r = require("../../libs/mixin/mixin.js"),
  o = {
    name: "u-badge",
    mixins: [i.mpMixin, t.props, r.mixin],
    computed: {
      boxStyle: function () {
        return {};
      },
      badgeStyle: function () {
        var t = {};
        if (
          (this.color && (t.color = this.color),
          this.bgColor && !this.inverted && (t.backgroundColor = this.bgColor),
          this.absolute && ((t.position = "absolute"), this.offset.length))
        ) {
          var i = this.offset[0],
            r = this.offset[1] || i;
          (t.top = e.index.$u.addUnit(i)), (t.right = e.index.$u.addUnit(r));
        }
        return t;
      },
      showValue: function () {
        switch (this.numberType) {
          case "overflow":
            return Number(this.value) > Number(this.max)
              ? this.max + "+"
              : this.value;
          case "ellipsis":
            return Number(this.value) > Number(this.max) ? "..." : this.value;
          case "limit":
            return Number(this.value) > 999
              ? Number(this.value) >= 9999
                ? Math.floor((this.value / 1e4) * 100) / 100 + "w"
                : Math.floor((this.value / 1e3) * 100) / 100 + "k"
              : this.value;
          default:
            return Number(this.value);
        }
      },
    },
  };
var s = e._export_sfc(o, [
  [
    "render",
    function (t, i, r, o, s, u) {
      return e.e(
        { a: t.show && (0 !== Number(t.value) || t.showZero || t.isDot) },
        t.show && (0 !== Number(t.value) || t.showZero || t.isDot)
          ? {
              b: e.t(t.isDot ? "" : u.showValue),
              c: e.n(t.isDot ? "u-badge--dot" : "u-badge--not-dot"),
              d: e.n(t.inverted && "u-badge--inverted"),
              e: e.n("horn" === t.shape && "u-badge--horn"),
              f: e.n(
                "u-badge--"
                  .concat(t.type)
                  .concat(t.inverted ? "--inverted" : "")
              ),
              g: e.s(t.$u.addStyle(t.customStyle)),
              h: e.s(u.badgeStyle),
            }
          : {}
      );
    },
  ],
  ["__scopeId", "data-v-80105a32"],
]);
wx.createComponent(s);
