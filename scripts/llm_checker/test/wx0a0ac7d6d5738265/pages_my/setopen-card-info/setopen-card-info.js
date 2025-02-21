var e = require("../../@babel/runtime/helpers/regeneratorRuntime"),
  o = require("../../@babel/runtime/helpers/asyncToGenerator"),
  t = require("../../common/vendor.js"),
  r = {
    data: function () {
      return {
        rechargeToast: !1,
        labelStyle: { fontSize: "28rpx", fontWeight: 400, color: "#8a8d99" },
        btnStyle: { marginTop: "20rpx", fontSize: "34rpx" },
        formData: { name: "", password: "", phone: "", topId: "" },
        rules: {
          name: [
            {
              type: "string",
              required: !0,
              message: "请填写姓名",
              trigger: ["blur"],
            },
            { whitespace: !0, message: "姓名不能为空", trigger: "blur" },
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
          password: [
            {
              type: "number",
              required: !0,
              message: "请填写支付密码",
              trigger: ["blur"],
            },
            { min: 6, max: 6, message: "密码长度应为6位", trigger: ["blur"] },
          ],
        },
      };
    },
    onLoad: function (e) {
      e.topId && (this.formData.topId = e.topId);
    },
    onUnload: function () {},
    mounted: function () {
      console.log("要领取的卡topid", this.formData.topId),
        (this.formData.phone =
          this.$store.getters.get_user_info.phoneNumber ||
          t.index.getStorageSync("phone")),
        (this.formData.password = this.formData.phone.substring(5, 11));
    },
    methods: {
      handlerSubmit: function () {
        var e = this;
        (this.formData.name = this.formData.name.replace(/\s/g, "")),
          (this.formData.password = this.formData.password.replace(/\s/g, "")),
          (this.formData.phone = this.formData.phone.replace(/\s/g, "")),
          this.$refs.formref
            .validate()
            .then(function (o) {
              console.log("校验通过", e.formData), e.getReciveCardFn();
            })
            .catch(function (o) {
              e.$toast("请检查填写信息是否正确"), console.log("校验失败");
            });
      },
      getReciveCardFn: function () {
        var t = this;
        return o(
          e().mark(function o() {
            var r;
            return e().wrap(function (e) {
              for (;;)
                switch ((e.prev = e.next)) {
                  case 0:
                    if ((console.log("领取", t.formData), t.formData.topId)) {
                      e.next = 2;
                      break;
                    }
                    return e.abrupt(
                      "return",
                      (t.$toast("系统繁忙，请稍后重试"), !1)
                    );
                  case 2:
                    return (e.next = 4), t.$api.$getReciveOilsCard(t.formData);
                  case 4:
                    (r = e.sent).data.code === t.$code.SUCCESS
                      ? (t.$toast("领取成功"), (t.rechargeToast = !0))
                      : r.data.code === t.$code.TOKENFAIL
                      ? setTimeout(function () {
                          t.getReciveCardFn();
                        }, 500)
                      : t.$toast(r.data.message ? r.data.message : "领取失败");
                  case 6:
                  case "end":
                    return e.stop();
                }
            }, o);
          })
        )();
      },
      handleNoCharge: function () {
        t.index.navigateBack();
      },
    },
  };
Array ||
  (
    t.resolveComponent("zym-navigation") +
    t.resolveComponent("u-icon") +
    t.resolveComponent("u--input") +
    t.resolveComponent("u-form-item") +
    t.resolveComponent("u--form") +
    t.resolveComponent("u-button") +
    t.resolveComponent("u-popup")
  )();
Math ||
  (
    function () {
      return "../../pages/components/zym-navigation/zym-navigation.js";
    } +
    function () {
      return "../../uview-plus/components/u-icon/u-icon.js";
    } +
    function () {
      return "../../uview-plus/components/u-input/u-input.js";
    } +
    function () {
      return "../../uview-plus/components/u-form-item/u-form-item.js";
    } +
    function () {
      return "../../uview-plus/components/u-form/u-form.js";
    } +
    function () {
      return "../../uview-plus/components/u-button/u-button.js";
    } +
    function () {
      return "../../uview-plus/components/u-popup/u-popup.js";
    }
  )();
var n = t._export_sfc(r, [
  [
    "render",
    function (e, o, r, n, a, s) {
      return {
        a: t.p({ title: "填写油卡信息", "is-home-page": !1 }),
        b: t.p({ name: "question-circle", color: "#CCCCCCFF", size: "28" }),
        c: t.o(function (e) {
          return (a.formData.name = e);
        }),
        d: t.p({
          placeholder: "请输入姓名",
          clearable: !0,
          adjustPosition: !1,
          modelValue: a.formData.name,
        }),
        e: t.p({ label: "姓名", prop: "name" }),
        f: t.o(function (e) {
          return (a.formData.phone = e);
        }),
        g: t.p({
          type: "number",
          maxlength: "11",
          clearable: !0,
          disabled: 11 === a.formData.phone.length,
          adjustPosition: !1,
          placeholder: "请输入手机号",
          modelValue: a.formData.phone,
        }),
        h: t.p({ label: "手机号", prop: "phone" }),
        i: t.p({ name: "question-circle", color: "#CCCCCCFF", size: "28" }),
        j: t.o(function (e) {
          return (a.formData.password = e);
        }),
        k: t.p({
          type: "number",
          password: !0,
          maxlength: "6",
          clearable: !0,
          adjustPosition: !1,
          placeholder: "请输入支付密码",
          modelValue: a.formData.password,
        }),
        l: t.p({ label: "密码", prop: "password" }),
        m: t.sr("formref", "ecb32d04-1"),
        n: t.p({
          labelStyle: a.labelStyle,
          labelPosition: "top",
          labelWidth: "auto",
          model: a.formData,
          rules: a.rules,
        }),
        o: t.o(function (o) {
          return e.$jump(
            "/pages_my/recharge-vip/recharge-vip?topId=".concat(
              a.formData.topId
            )
          );
        }),
        p: t.p({ color: "#41bbc0" }),
        q: t.o(s.handleNoCharge),
        r: t.p({ customStyle: { color: "#8A8D99FF", border: "none" } }),
        s: t.p({
          show: a.rechargeToast,
          mode: "center",
          round: "20",
          "safe-area-inset-bottom": !1,
        }),
        t: t.o(s.handlerSubmit),
        v: t.p({
          throttleTime: "2000",
          text: "确认",
          color: "#06B9C0FF",
          "custom-style": a.btnStyle,
        }),
      };
    },
  ],
  ["__scopeId", "data-v-ecb32d04"],
]);
wx.createPage(n);
