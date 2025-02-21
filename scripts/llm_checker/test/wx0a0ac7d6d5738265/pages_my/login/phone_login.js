var e = require("../../@babel/runtime/helpers/regeneratorRuntime"),
  t = require("../../@babel/runtime/helpers/asyncToGenerator"),
  n = require("../../common/vendor.js"),
  r = {
    data: function () {
      return {
        code: "",
        openid: "",
        labelStyle: { fontSize: "28rpx", fontWeight: 400, color: "#8a8d99" },
        btnStyle: { marginTop: "20rpx", fontSize: "34rpx" },
        formData: { name: "", password: "", phone: "" },
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
    created: function () {
      this.getLoginCode();
    },
    methods: {
      submit: function () {
        var e = this;
        (this.formData.name = this.formData.name.replace(/\s/g, "")),
          (this.formData.password = this.formData.password.replace(/\s/g, "")),
          (this.formData.phone = this.formData.phone.replace(/\s/g, "")),
          this.$refs.formref
            .validate()
            .then(function (t) {
              e.$toast("校验通过"), e.$loading("正在登录...", !1);
            })
            .catch(function (t) {
              e.$toast("校验失败");
            });
      },
      checkUser: function () {
        var e = this;
        n.index.getSetting({
          success: function (t) {
            t.authSetting["scope.userInfo"]
              ? (e.getUserInfo(), e.selectCaridPhone())
              : e.getUser();
          },
        });
      },
      getUser: function () {
        var e = this;
        n.index.authorize({
          scope: "scope.userInfo",
          success: function (e) {
            "authorize:ok" === e.errMsg
              ? console.log("同意微信登录", e)
              : console.log("取消微信登录", e);
          },
          fail: function (t) {
            console.log("微信登录失败", t),
              e.$toast("授权失败"),
              e.showAuthorizationFailedTip();
          },
        });
      },
      showAuthorizationFailedTip: function () {
        n.index.showModal({
          title: "授权失败",
          content: "需要授权才能登录，请点击确定按钮重新授权。",
          success: function (e) {
            e.confirm && n.index.openSetting();
          },
        });
      },
      getLoginCode: function () {
        var e = this;
        n.index.login({
          provider: "weixin",
          success: function (t) {
            (e.code = t.code), e.getToken(t.code);
          },
        });
      },
      getToken: function (r) {
        var o = this;
        return t(
          e().mark(function t() {
            var a;
            return e().wrap(function (e) {
              for (;;)
                switch ((e.prev = e.next)) {
                  case 0:
                    return (e.next = 2), o.$api.getToken({ code: r });
                  case 2:
                    (a = e.sent),
                      (o.token = a.data.data.token),
                      n.index.setStorageSync("token", o.token),
                      o.$store.commit("updateHasLogin", !0);
                  case 4:
                  case "end":
                    return e.stop();
                }
            }, t);
          })
        )();
      },
      getUserInfo: function () {
        var e = this;
        n.index.getUserInfo({
          success: function (t) {
            var n = {
              encryptedData: t.encryptedData,
              iv: t.iv,
              rawData: t.rawData,
              signatrue: t.signature,
              userInfo: JSON.stringify(t.userInfo),
            };
            e.updataUserInfo(n);
          },
        });
      },
      updataUserInfo: function (r) {
        var o = this;
        return t(
          e().mark(function t() {
            var a;
            return e().wrap(function (e) {
              for (;;)
                switch ((e.prev = e.next)) {
                  case 0:
                    return (e.next = 2), o.$api.$updateUserInfo(r);
                  case 2:
                    "" != (a = e.sent).data.data &&
                      (n.index.setStorageSync("openid", a.data.data.openid),
                      (o.openid = a.data.data.openId),
                      o.getUserInfoDetail());
                  case 4:
                  case "end":
                    return e.stop();
                }
            }, t);
          })
        )();
      },
      getUserInfoDetail: function () {
        var n = this;
        return t(
          e().mark(function t() {
            var r;
            return e().wrap(function (e) {
              for (;;)
                switch ((e.prev = e.next)) {
                  case 0:
                    return (e.next = 2), n.$api.getUserInfoDetail();
                  case 2:
                    (r = e.sent), n.$store.commit("setUserInfo", r.data.data);
                  case 4:
                  case "end":
                    return e.stop();
                }
            }, t);
          })
        )();
      },
      selectCaridPhone: function () {
        this.$api.selctCarIdPhone().then(function (e) {
          "0" === e.data.data.carExisting
            ? setTimeout(function () {
                n.index.reLaunch({
                  url: "/pages_oil/add_phone_car/add_phone_car",
                });
              }, 500)
            : setTimeout(function () {
                n.index.switchTab({ url: "/pages/index/index" });
              }, 500);
        });
      },
    },
  };
Array ||
  (
    n.resolveComponent("Header") +
    n.resolveComponent("u--input") +
    n.resolveComponent("u-form-item") +
    n.resolveComponent("u--form") +
    n.resolveComponent("u-button")
  )();
Math ||
  (
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
    }
  )();
var o = n._export_sfc(r, [
  [
    "render",
    function (e, t, r, o, a, s) {
      return {
        a: n.p({ title: "登录", "is-home-page": !0 }),
        b: n.o(function (e) {
          return (a.formData.phone = e);
        }),
        c: n.p({
          type: "number",
          maxlength: "11",
          clearable: !0,
          adjustPosition: !1,
          placeholder: "请输入手机号",
          modelValue: a.formData.phone,
        }),
        d: n.p({ label: "手机号", prop: "phone" }),
        e: n.sr("formref", "34e40291-1"),
        f: n.p({
          labelStyle: a.labelStyle,
          labelPosition: "top",
          labelWidth: "auto",
          model: a.formData,
          rules: a.rules,
        }),
        g: n.o(s.submit),
        h: n.p({
          throttleTime: "2000",
          text: "登录",
          color: "#06B9C0FF",
          "custom-style": a.btnStyle,
        }),
      };
    },
  ],
  ["__scopeId", "data-v-34e40291"],
]);
wx.createPage(o);
