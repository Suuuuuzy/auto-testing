var e = require("../../libs/config/props.js"),
  r = {
    props: {
      model: { type: Object, default: e.defprops.form.model },
      rules: {
        type: [Object, Function, Array],
        default: e.defprops.form.rules,
      },
      errorType: { type: String, default: e.defprops.form.errorType },
      borderBottom: { type: Boolean, default: e.defprops.form.borderBottom },
      labelPosition: { type: String, default: e.defprops.form.labelPosition },
      labelWidth: {
        type: [String, Number],
        default: e.defprops.form.labelWidth,
      },
      labelAlign: { type: String, default: e.defprops.form.labelAlign },
      labelStyle: { type: Object, default: e.defprops.form.labelStyle },
    },
  };
exports.props = r;
