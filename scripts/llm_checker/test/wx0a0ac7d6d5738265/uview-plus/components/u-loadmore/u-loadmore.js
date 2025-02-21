var o = require("../../../common/vendor.js"),
  t = require("./props.js"),
  e = require("../../libs/mixin/mpMixin.js"),
  i = require("../../libs/mixin/mixin.js"),
  n = {
    name: "u-loadmore",
    mixins: [e.mpMixin, i.mixin, t.props],
    data: function () {
      return { dotText: "●" };
    },
    computed: {
      loadTextStyle: function () {
        return {
          color: this.color,
          fontSize: o.index.$u.addUnit(this.fontSize),
          lineHeight: o.index.$u.addUnit(this.fontSize),
          backgroundColor: this.bgColor,
        };
      },
      showText: function () {
        return "loadmore" == this.status
          ? this.loadmoreText
          : "loading" == this.status
          ? this.loadingText
          : "nomore" == this.status && this.isDot
          ? this.dotText
          : this.nomoreText;
      },
    },
    emits: ["loadmore"],
    methods: {
      loadMore: function () {
        "loadmore" == this.status && this.$emit("loadmore");
      },
    },
  };
Array ||
  (o.resolveComponent("u-line") + o.resolveComponent("u-loading-icon"))();
Math ||
  (
    function () {
      return "../u-line/u-line.js";
    } +
    function () {
      return "../u-loading-icon/u-loading-icon.js";
    }
  )();
var r = o._export_sfc(n, [
  [
    "render",
    function (t, e, i, n, r, s) {
      return o.e(
        { a: t.line },
        t.line
          ? {
              b: o.p({
                length: "140rpx",
                color: t.lineColor,
                hairline: !1,
                dashed: t.dashed,
              }),
            }
          : {},
        { c: "loading" === t.status && t.icon },
        "loading" === t.status && t.icon
          ? {
              d: o.p({
                color: t.iconColor,
                size: t.iconSize,
                mode: t.loadingIcon,
              }),
            }
          : {},
        {
          e: o.t(s.showText),
          f: o.s(s.loadTextStyle),
          g: o.n(
            "nomore" == t.status && 1 == t.isDot
              ? "u-loadmore__content__dot-text"
              : "u-loadmore__content__text"
          ),
          h: o.o(function () {
            return s.loadMore && s.loadMore.apply(s, arguments);
          }),
          i: o.n(
            "loadmore" == t.status || "nomore" == t.status ? "u-more" : ""
          ),
          j: t.line,
        },
        t.line
          ? {
              k: o.p({
                length: "140rpx",
                color: t.lineColor,
                hairline: !1,
                dashed: t.dashed,
              }),
            }
          : {},
        {
          l: o.s(t.$u.addStyle(t.customStyle)),
          m: o.s({
            backgroundColor: t.bgColor,
            marginBottom: t.$u.addUnit(t.marginBottom),
            marginTop: t.$u.addUnit(t.marginTop),
            height: t.$u.addUnit(t.height),
          }),
        }
      );
    },
  ],
  ["__scopeId", "data-v-2cfb9006"],
]);
wx.createComponent(r);
