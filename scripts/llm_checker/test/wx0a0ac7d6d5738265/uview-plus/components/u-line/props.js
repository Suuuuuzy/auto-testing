var e = require("../../libs/config/props.js"),
  r = {
    props: {
      color: { type: String, default: e.defprops.line.color },
      length: { type: [String, Number], default: e.defprops.line.length },
      direction: { type: String, default: e.defprops.line.direction },
      hairline: { type: Boolean, default: e.defprops.line.hairline },
      margin: { type: [String, Number], default: e.defprops.line.margin },
      dashed: { type: Boolean, default: e.defprops.line.dashed },
    },
  };
exports.props = r;
