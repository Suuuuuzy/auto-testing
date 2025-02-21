var i = require("../../../common/vendor.js"),
  e = require("./props.js"),
  n = require("../../libs/mixin/mpMixin.js"),
  t = require("../../libs/mixin/mixin.js"),
  o = {
    name: "u-link",
    mixins: [n.mpMixin, t.mixin, e.props],
    computed: {
      linkStyle: function () {
        return {
          color: this.color,
          fontSize: i.index.$u.addUnit(this.fontSize),
          lineHeight: i.index.$u.addUnit(i.index.$u.getPx(this.fontSize) + 2),
          textDecoration: this.underLine ? "underline" : "none",
        };
      },
    },
    emits: ["click"],
    methods: {
      openLink: function () {
        var e = this;
        i.index.setClipboardData({
          data: this.href,
          success: function () {
            i.index.hideToast(),
              e.$nextTick(function () {
                i.index.$u.toast(e.mpTips);
              });
          },
        }),
          this.$emit("click");
      },
    },
  };
var r = i._export_sfc(o, [
  [
    "render",
    function (e, n, t, o, r, s) {
      return {
        a: i.t(e.text),
        b: i.o(function () {
          return s.openLink && s.openLink.apply(s, arguments);
        }),
        c: i.s(s.linkStyle),
        d: i.s(e.$u.addStyle(e.customStyle)),
      };
    },
  ],
  ["__scopeId", "data-v-56b1899b"],
]);
wx.createComponent(r);
