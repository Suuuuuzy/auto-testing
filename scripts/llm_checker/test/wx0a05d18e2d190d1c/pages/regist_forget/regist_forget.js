(global.webpackJsonp = global.webpackJsonp || []).push([
  ["pages/regist_forget/regist_forget"],
  {
    "1b9d": function (t, n, o) {
      o.d(n, "b", function () {
        return e;
      }),
        o.d(n, "c", function () {
          return a;
        }),
        o.d(n, "a", function () {});
      var e = function () {
          var t = this;
          t.$createElement;
          t._self._c;
        },
        a = [];
    },
    "1bfd": function (t, n, o) {
      (function (t) {
        Object.defineProperty(n, "__esModule", { value: !0 }),
          (n.default = void 0);
        var o = {
          onLoad: function (n) {
            (this.page_data = n.data), (this.phone = n.value);
            var o = "注册";
            1 == n.data &&
              ((o = "忘记密码"),
              (this.hint_password = "请输入新密码"),
              (this.btn_text = "重置密码")),
              t.setNavigationBarTitle({ title: o });
            var e = this;
            this.$api51.api51_code_on_verify_listener(function (t) {
              (e.count_down = t),
                (e.code_msg = 0 == t ? "验证码" : "重发(" + t + ")");
            });
          },
          onUnload: function () {
            this.$api51.api51_code_on_release();
          },
          data: function () {
            return {
              code_msg: "验证码",
              hint_password: "请输入密码",
              btn_text: "注册",
              page_data: "",
              phone: "",
              count_down: 0,
            };
          },
          methods: {
            form_submit: function (n) {
              console.log("form:" + JSON.stringify(n.detail.value));
              var o = n.detail.value;
              "" != o.mobile
                ? "" != o.captcha
                  ? "" != o.password
                    ? this.$api51.api51_regist_or_reset_password(
                        1 != this.page_data,
                        o,
                        function (n, e) {
                          t.showModal({
                            title: e,
                            showCancel: !1,
                            success: function (n) {
                              that.$api51.api51_user_set_loginname(o.mobile),
                                t.$emit("update_login_name"),
                                t.navigateBack({});
                            },
                          });
                        },
                        function (n, o) {
                          t.showModal({ title: o + n, showCancel: !1 });
                        }
                      )
                    : t.showToast({ title: "请输入密码", icon: "loading" })
                  : t.showToast({ title: "请输入验证码", icon: "loading" })
                : t.showToast({ title: "请输入手机号", icon: "loading" });
            },
            send_code: function (n) {
              this.count_down > 0 ||
                ("" != this.phone
                  ? 1 == this.page_data
                    ? this.$api51.api51_code_get_user(this.phone)
                    : this.$api51.api51_code_get_sms(this.phone)
                  : t.showToast({ title: "请输入正确的手机号", icon: "none" }));
            },
            input_phone: function (t) {
              this.phone = t.detail.value;
            },
          },
        };
        n.default = o;
      }).call(this, o("543d").default);
    },
    4451: function (t, n, o) {
      var e = o("60f3");
      o.n(e).a;
    },
    "50fa": function (t, n, o) {
      (function (t) {
        function n(t) {
          return t && t.__esModule ? t : { default: t };
        }
        o("f567"), n(o("66fd")), t(n(o("67b2")).default);
      }).call(this, o("543d").createPage);
    },
    "60f3": function (t, n, o) {},
    "67b2": function (t, n, o) {
      o.r(n);
      var e = o("1b9d"),
        a = o("d5b9");
      for (var i in a)
        "default" !== i &&
          (function (t) {
            o.d(n, t, function () {
              return a[t];
            });
          })(i);
      o("4451");
      var s = o("f0c5"),
        u = Object(s.a)(
          a.default,
          e.b,
          e.c,
          !1,
          null,
          null,
          null,
          !1,
          e.a,
          void 0
        );
      n.default = u.exports;
    },
    d5b9: function (t, n, o) {
      o.r(n);
      var e = o("1bfd"),
        a = o.n(e);
      for (var i in e)
        "default" !== i &&
          (function (t) {
            o.d(n, t, function () {
              return e[t];
            });
          })(i);
      n.default = a.a;
    },
  },
  [["50fa", "common/runtime", "common/vendor"]],
]);
