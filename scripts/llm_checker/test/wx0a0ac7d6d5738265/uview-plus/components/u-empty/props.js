var e = require("../../libs/config/props.js"),
  t = {
    props: {
      icon: { type: String, default: e.defprops.empty.icon },
      text: { type: String, default: e.defprops.empty.text },
      textColor: { type: String, default: e.defprops.empty.textColor },
      textSize: { type: [String, Number], default: e.defprops.empty.textSize },
      iconColor: { type: String, default: e.defprops.empty.iconColor },
      iconSize: { type: [String, Number], default: e.defprops.empty.iconSize },
      mode: { type: String, default: e.defprops.empty.mode },
      width: { type: [String, Number], default: e.defprops.empty.width },
      height: { type: [String, Number], default: e.defprops.empty.height },
      show: { type: Boolean, default: e.defprops.empty.show },
      marginTop: {
        type: [String, Number],
        default: e.defprops.empty.marginTop,
      },
    },
  };
exports.props = t;
