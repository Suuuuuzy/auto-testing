var e = require("../../libs/config/props.js"),
  p = {
    props: {
      color: { type: String, default: e.defprops.link.color },
      fontSize: { type: [String, Number], default: e.defprops.link.fontSize },
      underLine: { type: Boolean, default: e.defprops.link.underLine },
      href: { type: String, default: e.defprops.link.href },
      mpTips: { type: String, default: e.defprops.link.mpTips },
      lineColor: { type: String, default: e.defprops.link.lineColor },
      text: { type: String, default: e.defprops.link.text },
    },
  };
exports.props = p;
