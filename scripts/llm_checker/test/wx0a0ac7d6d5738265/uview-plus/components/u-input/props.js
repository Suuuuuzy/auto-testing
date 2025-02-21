var e = require("../../libs/config/props.js"),
  t = {
    props: {
      modelValue: { type: [String, Number], default: e.defprops.input.value },
      type: { type: String, default: e.defprops.input.type },
      fixed: { type: Boolean, default: e.defprops.input.fixed },
      disabled: { type: Boolean, default: e.defprops.input.disabled },
      disabledColor: { type: String, default: e.defprops.input.disabledColor },
      clearable: { type: Boolean, default: e.defprops.input.clearable },
      password: { type: Boolean, default: e.defprops.input.password },
      maxlength: {
        type: [String, Number],
        default: e.defprops.input.maxlength,
      },
      placeholder: { type: String, default: e.defprops.input.placeholder },
      placeholderClass: {
        type: String,
        default: e.defprops.input.placeholderClass,
      },
      placeholderStyle: {
        type: [String, Object],
        default: e.defprops.input.placeholderStyle,
      },
      showWordLimit: { type: Boolean, default: e.defprops.input.showWordLimit },
      confirmType: { type: String, default: e.defprops.input.confirmType },
      confirmHold: { type: Boolean, default: e.defprops.input.confirmHold },
      holdKeyboard: { type: Boolean, default: e.defprops.input.holdKeyboard },
      focus: { type: Boolean, default: e.defprops.input.focus },
      autoBlur: { type: Boolean, default: e.defprops.input.autoBlur },
      disableDefaultPadding: {
        type: Boolean,
        default: e.defprops.input.disableDefaultPadding,
      },
      cursor: { type: [String, Number], default: e.defprops.input.cursor },
      cursorSpacing: {
        type: [String, Number],
        default: e.defprops.input.cursorSpacing,
      },
      selectionStart: {
        type: [String, Number],
        default: e.defprops.input.selectionStart,
      },
      selectionEnd: {
        type: [String, Number],
        default: e.defprops.input.selectionEnd,
      },
      adjustPosition: {
        type: Boolean,
        default: e.defprops.input.adjustPosition,
      },
      inputAlign: { type: String, default: e.defprops.input.inputAlign },
      fontSize: { type: [String, Number], default: e.defprops.input.fontSize },
      color: { type: String, default: e.defprops.input.color },
      prefixIcon: { type: String, default: e.defprops.input.prefixIcon },
      prefixIconStyle: {
        type: [String, Object],
        default: e.defprops.input.prefixIconStyle,
      },
      suffixIcon: { type: String, default: e.defprops.input.suffixIcon },
      suffixIconStyle: {
        type: [String, Object],
        default: e.defprops.input.suffixIconStyle,
      },
      border: { type: String, default: e.defprops.input.border },
      readonly: { type: Boolean, default: e.defprops.input.readonly },
      shape: { type: String, default: e.defprops.input.shape },
      formatter: {
        type: [Function, null],
        default: e.defprops.input.formatter,
      },
      ignoreCompositionEvent: { type: Boolean, default: !0 },
    },
  };
exports.props = t;
