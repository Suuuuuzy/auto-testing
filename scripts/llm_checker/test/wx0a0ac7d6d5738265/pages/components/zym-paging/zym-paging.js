var e = require("./props.js"),
  o = require("../../../common/vendor.js"),
  t = {
    name: "Zym-paging",
    mixins: [e.props],
    computed: {
      computedHeight: function () {
        return (
          console.log(
            this.height,
            /^\d+(\.\d+)?(px|rem|em|%|vh|vw)?$/.test(String(this.height))
          ),
          /^\d+(\.\d+)?(px|rem|em|%|vh|vw)?$/.test(String(this.height))
            ? this.height
            : this.height + "vh"
        );
      },
    },
    methods: {
      onPulling: function () {},
      onRefresh: function () {
        this.$emit("re-fresh", !0);
      },
      onLoadMore: function () {
        "nomore" !== this.status && this.$emit("load-data");
      },
    },
  };
Array || o.resolveComponent("u-loadmore")();
Math;
var n = o._export_sfc(t, [
  [
    "render",
    function (e, t, n, r, i, h) {
      return o.e(
        { a: e.$slots.loadmore },
        e.$slots.loadmore
          ? {}
          : {
              b: o.p({
                status: e.status,
                color: e.loadFontColor,
                fontSize: e.fontSize,
                line: e.line,
                iconSize: e.iconSize,
              }),
            },
        { c: e.placeholderHeight },
        (e.placeholderHeight, {}),
        {
          d: h.computedHeight,
          e: o.o(function (e) {
            return h.onLoadMore();
          }),
          f: o.o(function () {
            return h.onPulling && h.onPulling.apply(h, arguments);
          }),
          g: o.o(function () {
            return h.onRefresh && h.onRefresh.apply(h, arguments);
          }),
          h: e.threshold,
          i: e.triggered,
        }
      );
    },
  ],
]);
wx.createComponent(n);
