var n = require("../../../common/vendor.js"),
  e = require("./props.js"),
  i = require("../../libs/mixin/mpMixin.js"),
  t = require("../../libs/mixin/mixin.js"),
  o = {
    name: "u-input",
    mixins: [i.mpMixin, t.mixin, e.props],
    data: function () {
      return {
        innerValue: "",
        focused: !1,
        firstChange: !0,
        changeFromInner: !1,
        innerFormatter: function (n) {
          return n;
        },
      };
    },
    watch: {
      modelValue: {
        immediate: !0,
        handler: function (n, e) {
          (this.innerValue = n),
            (this.firstChange = !1),
            (this.changeFromInner = !1);
        },
      },
    },
    computed: {
      isShowClear: function () {
        var n = this.clearable,
          e = this.readonly,
          i = this.focused,
          t = this.innerValue;
        return !!n && !e && !!i && "" !== t;
      },
      inputClass: function () {
        var n = [],
          e = this.border,
          i = (this.disabled, this.shape);
        return (
          "surround" === e && (n = n.concat(["u-border", "u-input--radius"])),
          n.push("u-input--".concat(i)),
          "bottom" === e &&
            (n = n.concat(["u-border-bottom", "u-input--no-radius"])),
          n.join(" ")
        );
      },
      wrapperStyle: function () {
        var e = {};
        return (
          this.disabled && (e.backgroundColor = this.disabledColor),
          "none" === this.border
            ? (e.padding = "0")
            : ((e.paddingTop = "6px"),
              (e.paddingBottom = "6px"),
              (e.paddingLeft = "9px"),
              (e.paddingRight = "9px")),
          n.index.$u.deepMerge(e, n.index.$u.addStyle(this.customStyle))
        );
      },
      inputStyle: function () {
        return {
          color: this.color,
          fontSize: n.index.$u.addUnit(this.fontSize),
          textAlign: this.inputAlign,
        };
      },
    },
    emits: [
      "update:modelValue",
      "focus",
      "blur",
      "change",
      "confirm",
      "clear",
      "keyboardheightchange",
    ],
    methods: {
      setFormatter: function (n) {
        this.innerFormatter = n;
      },
      onInput: function (n) {
        var e = this,
          i = (n.detail || {}).value,
          t = void 0 === i ? "" : i,
          o = (this.formatter || this.innerFormatter)(t);
        (this.innerValue = t),
          this.$nextTick(function () {
            (e.innerValue = o), e.valueChange();
          });
      },
      onBlur: function (e) {
        var i = this;
        this.$emit("blur", e.detail.value),
          n.index.$u.sleep(50).then(function () {
            i.focused = !1;
          }),
          n.index.$u.formValidate(this, "blur");
      },
      onFocus: function (n) {
        (this.focused = !0), this.$emit("focus");
      },
      onConfirm: function (n) {
        this.$emit("confirm", this.innerValue);
      },
      onkeyboardheightchange: function (n) {
        this.$emit("keyboardheightchange", n);
      },
      valueChange: function () {
        var e = this,
          i = this.innerValue;
        this.$nextTick(function () {
          e.$emit("update:modelValue", i),
            (e.changeFromInner = !0),
            e.$emit("change", i),
            n.index.$u.formValidate(e, "change");
        });
      },
      onClear: function () {
        var n = this;
        (this.innerValue = ""),
          this.$nextTick(function () {
            n.valueChange(), n.$emit("clear");
          });
      },
      clickHandler: function () {},
    },
  };
Array || n.resolveComponent("u-icon")();
Math;
var r = n._export_sfc(o, [
  [
    "render",
    function (e, i, t, o, r, a) {
      return n.e(
        { a: e.prefixIcon || e.$slots.prefix },
        e.prefixIcon || e.$slots.prefix
          ? {
              b: n.p({
                name: e.prefixIcon,
                size: "18",
                customStyle: e.prefixIconStyle,
              }),
            }
          : {},
        {
          c: n.s(a.inputStyle),
          d: e.type,
          e: e.focus,
          f: e.cursor,
          g: r.innerValue,
          h: e.autoBlur,
          i: e.disabled || e.readonly,
          j: e.maxlength,
          k: e.placeholder,
          l: e.placeholderStyle,
          m: e.placeholderClass,
          n: e.confirmType,
          o: e.confirmHold,
          p: e.holdKeyboard,
          q: e.cursorSpacing,
          r: e.adjustPosition,
          s: e.selectionEnd,
          t: e.selectionStart,
          v: e.password || "password" === e.type || void 0,
          w: e.ignoreCompositionEvent,
          x: n.o(function () {
            return a.onInput && a.onInput.apply(a, arguments);
          }),
          y: n.o(function () {
            return a.onBlur && a.onBlur.apply(a, arguments);
          }),
          z: n.o(function () {
            return a.onFocus && a.onFocus.apply(a, arguments);
          }),
          A: n.o(function () {
            return a.onConfirm && a.onConfirm.apply(a, arguments);
          }),
          B: n.o(function () {
            return (
              a.onkeyboardheightchange &&
              a.onkeyboardheightchange.apply(a, arguments)
            );
          }),
          C: n.o(function () {
            return a.clickHandler && a.clickHandler.apply(a, arguments);
          }),
          D: a.isShowClear,
        },
        a.isShowClear
          ? {
              E: n.p({
                name: "close",
                size: "11",
                color: "#ffffff",
                customStyle: "line-height: 12px",
              }),
              F: n.o(function () {
                return a.onClear && a.onClear.apply(a, arguments);
              }),
            }
          : {},
        { G: e.suffixIcon || e.$slots.suffix },
        e.suffixIcon || e.$slots.suffix
          ? {
              H: n.p({
                name: e.suffixIcon,
                size: "18",
                customStyle: e.suffixIconStyle,
              }),
            }
          : {},
        { I: n.n(a.inputClass), J: n.s(a.wrapperStyle) }
      );
    },
  ],
  ["__scopeId", "data-v-d372e650"],
]);
wx.createComponent(r);
