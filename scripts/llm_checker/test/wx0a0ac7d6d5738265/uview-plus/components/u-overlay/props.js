var e = require("../../libs/config/props.js"),
  r = {
    props: {
      show: { type: Boolean, default: e.defprops.overlay.show },
      zIndex: { type: [String, Number], default: e.defprops.overlay.zIndex },
      duration: {
        type: [String, Number],
        default: e.defprops.overlay.duration,
      },
      opacity: { type: [String, Number], default: e.defprops.overlay.opacity },
    },
  };
exports.props = r;
