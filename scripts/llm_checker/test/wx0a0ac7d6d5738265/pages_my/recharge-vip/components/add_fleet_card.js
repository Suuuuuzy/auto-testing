var e = require("../../../utils/debouns.js"),
  o = require("../../../common/vendor.js"),
  r = {
    data: function () {
      return {
        showFlet: !1,
        form: { cardId: "", password: "", phone: "" },
        rules: {
          cardId: [
            {
              required: !0,
              message: "请输入卡号",
              trigger: ["change", "blur"],
            },
          ],
          password: [
            {
              required: !0,
              message: "请输入密码",
              trigger: ["change", "blur"],
            },
          ],
          phone: [
            {
              type: "number",
              required: !0,
              message: "请填写手机号",
              trigger: ["blur"],
            },
            {
              min: 11,
              max: 11,
              message: "请填写11位手机号",
              trigger: ["blur"],
            },
            {
              pattern:
                /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/g,
              transform: function (e) {
                return String(e);
              },
              message: "手机号格式不正确",
            },
          ],
        },
      };
    },
    watch: {
      form: {
        handler: function (e) {
          console.log("id", e.cardId, "pw", e.password, "phone", e.phone);
        },
        deep: !0,
      },
    },
    mounted: function () {
      this.submit = e.throttle(this.submit, 3e3);
    },
    methods: {
      submit: function () {
        var e = this;
        this.$refs.uForm.validate(function (o) {
          o
            ? (console.log("验证通过"),
              e.$api.$postAddFleetCard().then(function (o) {
                2e4 === o.data.code
                  ? (e.$toast(o.data.message), (e.showFlet = !1))
                  : e.$toast("添加失败，请稍后重试");
              }))
            : console.log("验证失败");
        });
      },
      openPop: function () {
        this.showFlet = !0;
      },
    },
    onReady: function () {
      this.$refs.uForm.setRules(this.rules);
    },
  };
Array ||
  (
    o.resolveComponent("u-icon") +
    o.resolveComponent("u-input") +
    o.resolveComponent("u-form-item") +
    o.resolveComponent("u--form") +
    o.resolveComponent("u-popup")
  )();
Math ||
  (
    function () {
      return "../../../uview-plus/components/u-icon/u-icon.js";
    } +
    function () {
      return "../../../uview-plus/components/u-input/u-input.js";
    } +
    function () {
      return "../../../uview-plus/components/u-form-item/u-form-item.js";
    } +
    function () {
      return "../../../uview-plus/components/u-form/u-form.js";
    } +
    function () {
      return "../../../uview-plus/components/u-popup/u-popup.js";
    }
  )();
var t = o._export_sfc(r, [
  [
    "render",
    function (e, r, t, n, u, l) {
      return {
        a: o.o(function (e) {
          return (u.showFlet = !1);
        }),
        b: o.p({ name: "close", color: "#C0C2CC" }),
        c: o.o(function (e) {
          return (u.form.cardId = e);
        }),
        d: o.p({
          "border-color": "#DADDE6",
          height: "96",
          clearable: !1,
          "input-align": "right",
          placeholder: "请输入实体卡号",
          modelValue: u.form.cardId,
        }),
        e: o.p({
          "label-position": "top",
          "label-align": "left",
          "label-width": "auto",
          label: "实体卡号",
          prop: "cardId",
        }),
        f: o.o(function (e) {
          return (u.form.password = e);
        }),
        g: o.p({
          "border-color": "#DADDE6",
          placeholder: "请输入密码",
          height: "96",
          clearable: !1,
          type: "password",
          "input-align": "right",
          modelValue: u.form.password,
        }),
        h: o.p({
          "label-position": "top",
          "label-align": "left",
          "label-width": "auto",
          label: "密码",
          prop: "password",
        }),
        i: o.o(function (e) {
          return (u.form.phone = e);
        }),
        j: o.p({
          "border-color": "#DADDE6",
          placeholder: "请输入手机号",
          type: "number",
          height: "96",
          clearable: !1,
          "input-align": "right",
          modelValue: u.form.phone,
        }),
        k: o.p({
          "label-position": "top",
          "label-align": "left",
          "label-width": "auto",
          label: "手机号",
          prop: "phone",
        }),
        l: o.sr("uForm", "1d83ea96-2,1d83ea96-0"),
        m: o.p({ model: u.form }),
        n: o.o(function () {
          return l.submit && l.submit.apply(l, arguments);
        }),
        o: o.p({ show: u.showFlet, "safe-area-inset-bottom": !1 }),
      };
    },
  ],
]);
wx.createComponent(t);
