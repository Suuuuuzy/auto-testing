var o = require("../../libs/config/props.js"),
  e = {
    props: {
      status: { type: String, default: o.defprops.loadmore.status },
      bgColor: { type: String, default: o.defprops.loadmore.bgColor },
      icon: { type: Boolean, default: o.defprops.loadmore.icon },
      fontSize: {
        type: [String, Number],
        default: o.defprops.loadmore.fontSize,
      },
      iconSize: {
        type: [String, Number],
        default: o.defprops.loadmore.iconSize,
      },
      color: { type: String, default: o.defprops.loadmore.color },
      loadingIcon: { type: String, default: o.defprops.loadmore.loadingIcon },
      loadmoreText: { type: String, default: o.defprops.loadmore.loadmoreText },
      loadingText: { type: String, default: o.defprops.loadmore.loadingText },
      nomoreText: { type: String, default: o.defprops.loadmore.nomoreText },
      isDot: { type: Boolean, default: o.defprops.loadmore.isDot },
      iconColor: { type: String, default: o.defprops.loadmore.iconColor },
      marginTop: {
        type: [String, Number],
        default: o.defprops.loadmore.marginTop,
      },
      marginBottom: {
        type: [String, Number],
        default: o.defprops.loadmore.marginBottom,
      },
      height: { type: [String, Number], default: o.defprops.loadmore.height },
      line: { type: Boolean, default: o.defprops.loadmore.line },
      lineColor: { type: String, default: o.defprops.loadmore.lineColor },
      dashed: { type: Boolean, default: o.defprops.loadmore.dashed },
    },
  };
exports.props = e;
