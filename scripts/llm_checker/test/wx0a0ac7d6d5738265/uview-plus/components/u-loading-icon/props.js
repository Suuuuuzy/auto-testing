var o = require("../../libs/config/props.js"),
  e = {
    props: {
      show: { type: Boolean, default: o.defprops.loadingIcon.show },
      color: { type: String, default: o.defprops.loadingIcon.color },
      textColor: { type: String, default: o.defprops.loadingIcon.textColor },
      vertical: { type: Boolean, default: o.defprops.loadingIcon.vertical },
      mode: { type: String, default: o.defprops.loadingIcon.mode },
      size: { type: [String, Number], default: o.defprops.loadingIcon.size },
      textSize: {
        type: [String, Number],
        default: o.defprops.loadingIcon.textSize,
      },
      text: { type: [String, Number], default: o.defprops.loadingIcon.text },
      timingFunction: {
        type: String,
        default: o.defprops.loadingIcon.timingFunction,
      },
      duration: {
        type: [String, Number],
        default: o.defprops.loadingIcon.duration,
      },
      inactiveColor: {
        type: String,
        default: o.defprops.loadingIcon.inactiveColor,
      },
    },
  };
exports.props = e;
