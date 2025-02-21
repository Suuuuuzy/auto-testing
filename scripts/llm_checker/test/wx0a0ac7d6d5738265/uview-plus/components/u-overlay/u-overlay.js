var e = require("../../../common/vendor.js"),
  i = require("./props.js"),
  t = require("../../libs/mixin/mpMixin.js"),
  o = require("../../libs/mixin/mixin.js"),
  r = {
    name: "u-overlay",
    mixins: [t.mpMixin, o.mixin, i.props],
    computed: {
      overlayStyle: function () {
        var i = {
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: this.zIndex,
          bottom: 0,
          "background-color": "rgba(0, 0, 0, ".concat(this.opacity, ")"),
        };
        return e.index.$u.deepMerge(i, e.index.$u.addStyle(this.customStyle));
      },
    },
    emits: ["click"],
    methods: {
      clickHandler: function () {
        this.$emit("click");
      },
    },
  };
Array || e.resolveComponent("u-transition")();
Math;
var n = e._export_sfc(r, [
  [
    "render",
    function (i, t, o, r, n, s) {
      return {
        a: e.o(s.clickHandler),
        b: e.p({
          show: i.show,
          "custom-class": "u-overlay",
          duration: i.duration,
          "custom-style": s.overlayStyle,
        }),
      };
    },
  ],
  ["__scopeId", "data-v-666e728b"],
]);
wx.createComponent(n);
