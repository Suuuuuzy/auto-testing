(global.webpackJsonp = global.webpackJsonp || []).push([
  ["pages/common_set/change_phone"],
  {
    "11d1": function (n, e, t) {
      t.d(e, "b", function () {
        return i;
      }),
        t.d(e, "c", function () {
          return o;
        }),
        t.d(e, "a", function () {});
      var i = function () {
          var n = this;
          n.$createElement;
          n._self._c;
        },
        o = [];
    },
    "19a5": function (n, e, t) {
      (function (n) {
        function e(n) {
          return n && n.__esModule ? n : { default: n };
        }
        t("f567"), e(t("66fd")), n(e(t("e0af")).default);
      }).call(this, t("543d").createPage);
    },
    3680: function (n, e, t) {
      var i = t("b853");
      t.n(i).a;
    },
    "379a": function (n, e, t) {
      t.r(e);
      var i = t("f14c"),
        o = t.n(i);
      for (var a in i)
        "default" !== a &&
          (function (n) {
            t.d(e, n, function () {
              return i[n];
            });
          })(a);
      e.default = o.a;
    },
    b853: function (n, e, t) {},
    e0af: function (n, e, t) {
      t.r(e);
      var i = t("11d1"),
        o = t("379a");
      for (var a in o)
        "default" !== a &&
          (function (n) {
            t.d(e, n, function () {
              return o[n];
            });
          })(a);
      t("3680");
      var c = t("f0c5"),
        u = Object(c.a)(
          o.default,
          i.b,
          i.c,
          !1,
          null,
          null,
          null,
          !1,
          i.a,
          void 0
        );
      e.default = u.exports;
    },
    f14c: function (n, e, t) {
      (function (n) {
        Object.defineProperty(e, "__esModule", { value: !0 }),
          (e.default = void 0);
        var t = {
          onLoad: function (e) {
            n.setNavigationBarTitle({ title: "修改手机号" });
            var t = this;
            (this.user_phone = this.$api51.api51_user_get_account()),
              this.$api51.api51_code_on_verify_listener(function (n) {
                (t.count_down = n),
                  (t.code_msg = 0 == n ? "发送验证码" : "重发(" + n + ")");
              });
          },
          onUnload: function () {
            this.$api51.api51_code_on_release();
          },
          data: function () {
            return {
              code_msg: "发送验证码",
              is_verify: !0,
              count_down: 0,
              user_phone: "",
              verify_code: "",
            };
          },
          methods: {
            form_submit: function (e) {
              var t = this,
                i = e.detail.value;
              this.$api51.api51_change_or_verify_mobile(
                this.is_verify,
                i.phone,
                i.code,
                function (e, i) {
                  t.is_verify
                    ? ((t.is_verify = !1),
                      (t.user_phone = ""),
                      (t.verify_code = ""),
                      this.$api51.api51_code_reset())
                    : n.showModal({
                        content: i,
                        showCancel: !1,
                        complete: function (e) {
                          n.navigateBack({});
                        },
                      });
                },
                function (e, t) {
                  n.showToast({ title: t + e, icon: "none" });
                }
              );
            },
            input_change1: function (n) {
              this.user_phone = n.detail.value;
            },
            input_change2: function (n) {
              this.verify_code = n.detail.value;
            },
            click_verify_code: function (e) {
              this.count_down > 0 ||
                ("" != this.user_phone
                  ? this.is_verify
                    ? this.$api51.api51_code_get_user(this.user_phone)
                    : this.$api51.api51_code_get_sms(this.user_phone)
                  : n.showToast({ title: "请输入正确的手机号", icon: "none" }));
            },
            verify_old_phone: function (n) {},
          },
        };
        e.default = t;
      }).call(this, t("543d").default);
    },
  },
  [["19a5", "common/runtime", "common/vendor"]],
]);
