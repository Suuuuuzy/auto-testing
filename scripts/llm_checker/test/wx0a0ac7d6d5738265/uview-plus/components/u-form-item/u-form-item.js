var e = require("../../../common/vendor.js"),
  t = require("./props.js"),
  r = require("../../libs/mixin/mpMixin.js"),
  n = require("../../libs/mixin/mixin.js"),
  a = {
    name: "u-form-item",
    mixins: [r.mpMixin, n.mixin, t.props],
    data: function () {
      return {
        message: "",
        parentData: {
          labelPosition: "left",
          labelAlign: "left",
          labelStyle: {},
          labelWidth: 45,
          errorType: "message",
        },
      };
    },
    computed: {
      propsLine: function () {
        return e.index.$u.props.line;
      },
    },
    mounted: function () {
      this.init();
    },
    emits: ["click"],
    methods: {
      init: function () {
        this.updateParentData(),
          this.parent || e.index.$u.error("u-form-item需要结合u-form组件使用");
      },
      updateParentData: function () {
        this.getParentData("u-form");
      },
      clearValidate: function () {
        this.message = null;
      },
      resetField: function () {
        var t = e.index.$u.getProperty(this.parent.originalModel, this.prop);
        e.index.$u.setProperty(this.parent.model, this.prop, t),
          (this.message = null);
      },
      clickHandler: function () {
        this.$emit("click");
      },
    },
  };
Array || (e.resolveComponent("u-icon") + e.resolveComponent("u-line"))();
Math ||
  (
    function () {
      return "../u-icon/u-icon.js";
    } +
    function () {
      return "../u-line/u-line.js";
    }
  )();
var i = e._export_sfc(a, [
  [
    "render",
    function (t, r, n, a, i, o) {
      return e.e(
        { a: t.required || t.leftIcon || t.label },
        t.required || t.leftIcon || t.label
          ? e.e(
              { b: t.required },
              (t.required, {}),
              { c: t.leftIcon },
              t.leftIcon
                ? {
                    d: e.p({
                      name: t.leftIcon,
                      "custom-style": t.leftIconStyle,
                    }),
                  }
                : {},
              {
                e: e.t(t.label),
                f: e.s(i.parentData.labelStyle),
                g: e.s({
                  justifyContent:
                    "left" === i.parentData.labelAlign
                      ? "flex-start"
                      : "center" === i.parentData.labelAlign
                      ? "center"
                      : "flex-end",
                }),
                h: t.$u.addUnit(t.labelWidth || i.parentData.labelWidth),
                i: "left" === i.parentData.labelPosition ? 0 : "5px",
              }
            )
          : {},
        { j: t.$slots.right },
        (t.$slots.right, {}),
        {
          k: e.o(function () {
            return o.clickHandler && o.clickHandler.apply(o, arguments);
          }),
          l: e.s(t.$u.addStyle(t.customStyle)),
          m: e.s({
            flexDirection:
              "left" === i.parentData.labelPosition ? "row" : "column",
          }),
          n: !!i.message && "message" === i.parentData.errorType,
        },
        i.message && "message" === i.parentData.errorType
          ? {
              o: e.t(i.message),
              p: t.$u.addUnit(
                "top" === i.parentData.labelPosition
                  ? 0
                  : t.labelWidth || i.parentData.labelWidth
              ),
            }
          : {},
        { q: t.borderBottom },
        t.borderBottom
          ? {
              r: e.p({
                color:
                  i.message && "border-bottom" === i.parentData.errorType
                    ? t.$u.color.error
                    : o.propsLine.color,
                customStyle: "margin-top: ".concat(
                  i.message && "message" === i.parentData.errorType ? "5px" : 0
                ),
              }),
            }
          : {}
      );
    },
  ],
  ["__scopeId", "data-v-c6985323"],
]);
wx.createComponent(i);
