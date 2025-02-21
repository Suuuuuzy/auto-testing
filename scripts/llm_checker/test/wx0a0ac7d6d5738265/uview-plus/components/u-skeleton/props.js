var e = require("../../libs/config/props.js"),
  t = {
    props: {
      loading: { type: Boolean, default: e.defprops.skeleton.loading },
      animate: { type: Boolean, default: e.defprops.skeleton.animate },
      rows: { type: [String, Number], default: e.defprops.skeleton.rows },
      rowsWidth: {
        type: [String, Number, Array],
        default: e.defprops.skeleton.rowsWidth,
      },
      rowsHeight: {
        type: [String, Number, Array],
        default: e.defprops.skeleton.rowsHeight,
      },
      title: { type: Boolean, default: e.defprops.skeleton.title },
      titleWidth: {
        type: [String, Number],
        default: e.defprops.skeleton.titleWidth,
      },
      titleHeight: {
        type: [String, Number],
        default: e.defprops.skeleton.titleHeight,
      },
      avatar: { type: Boolean, default: e.defprops.skeleton.avatar },
      avatarSize: {
        type: [String, Number],
        default: e.defprops.skeleton.avatarSize,
      },
      avatarShape: { type: String, default: e.defprops.skeleton.avatarShape },
    },
  };
exports.props = t;
