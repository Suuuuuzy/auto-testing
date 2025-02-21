var t = require("../../libs/config/props.js"),
  i = {
    props: {
      show: { type: Boolean, default: t.defprops.transition.show },
      mode: { type: String, default: t.defprops.transition.mode },
      duration: {
        type: [String, Number],
        default: t.defprops.transition.duration,
      },
      timingFunction: {
        type: String,
        default: t.defprops.transition.timingFunction,
      },
    },
  };
exports.props = i;
