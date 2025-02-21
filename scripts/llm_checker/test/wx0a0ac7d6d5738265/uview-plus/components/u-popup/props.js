var p = require("../../libs/config/props.js"),
  e = {
    props: {
      show: { type: Boolean, default: p.defprops.popup.show },
      overlay: { type: Boolean, default: p.defprops.popup.overlay },
      mode: { type: String, default: p.defprops.popup.mode },
      duration: { type: [String, Number], default: p.defprops.popup.duration },
      closeable: { type: Boolean, default: p.defprops.popup.closeable },
      overlayStyle: {
        type: [Object, String],
        default: p.defprops.popup.overlayStyle,
      },
      closeOnClickOverlay: {
        type: Boolean,
        default: p.defprops.popup.closeOnClickOverlay,
      },
      zIndex: { type: [String, Number], default: p.defprops.popup.zIndex },
      safeAreaInsetBottom: {
        type: Boolean,
        default: p.defprops.popup.safeAreaInsetBottom,
      },
      safeAreaInsetTop: {
        type: Boolean,
        default: p.defprops.popup.safeAreaInsetTop,
      },
      closeIconPos: { type: String, default: p.defprops.popup.closeIconPos },
      round: {
        type: [Boolean, String, Number],
        default: p.defprops.popup.round,
      },
      zoom: { type: Boolean, default: p.defprops.popup.zoom },
      bgColor: { type: String, default: p.defprops.popup.bgColor },
      overlayOpacity: {
        type: [Number, String],
        default: p.defprops.popup.overlayOpacity,
      },
    },
  };
exports.props = e;
