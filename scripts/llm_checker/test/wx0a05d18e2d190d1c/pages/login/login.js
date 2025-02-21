(global.webpackJsonp = global.webpackJsonp || []).push([
  ["pages/login/login"],
  {
    "058c": function (e, n, t) {
      (function (e) {
        function n(e) {
          return e && e.__esModule ? e : { default: e };
        }
        t("f567"), n(t("66fd")), e(n(t("07ba")).default);
      }).call(this, t("543d").createPage);
    },
    "07ba": function (e, n, t) {
      t.r(n);
      var o = t("fa93"),
        i = t("a062");
      for (var a in i)
        "default" !== a &&
          (function (e) {
            t.d(n, e, function () {
              return i[e];
            });
          })(a);
      t("842e");
      var c = t("f0c5"),
        s = Object(c.a)(
          i.default,
          o.b,
          o.c,
          !1,
          null,
          null,
          null,
          !1,
          o.a,
          void 0
        );
      n.default = s.exports;
    },
    "5ae4": function (e, n, t) {},
    "842e": function (e, n, t) {
      var o = t("5ae4");
      t.n(o).a;
    },
    a062: function (e, n, t) {
      t.r(n);
      var o = t("b8e5"),
        i = t.n(o);
      for (var a in o)
        "default" !== a &&
          (function (e) {
            t.d(n, e, function () {
              return o[e];
            });
          })(a);
      n.default = i.a;
    },
    b8e5: function (e, n, t) {
      (function (e) {
        Object.defineProperty(n, "__esModule", { value: !0 }),
          (n.default = void 0);
        var o,
          i =
            (getApp().globalData,
            {
              components: {
                uniPopupDialog: function () {
                  t.e("components/uni-popup/uni-popup-dialog")
                    .then(
                      function () {
                        return resolve(t("8943"));
                      }.bind(null, t)
                    )
                    .catch(t.oe);
                },
              },
              data: function () {
                return {
                  phone: "",
                  password: "",
                  cancel_btn_text: "取消",
                  confirm_btn_text: "确定",
                  notice_msg:
                    "请先绑定手机号码，绑定成功后，登录账号为您的手机号",
                  code_msg: "验证码",
                  alert_can_edit_phone: !0,
                  alert_can_edit_code: !0,
                  alert_can_edit_pwd: !0,
                  count_down: 0,
                  is_can_skip: !1,
                  alert_phone_value: "",
                  alert_pwd_value: "",
                  alert_code_value: "",
                  action_type: 1,
                  is_verify: !1,
                  wx_code: "",
                  dialog_mode: "Phone_pwd_code",
                };
              },
              props: {},
              onLoad: function (n) {
                o = this;
                var t = this.$api51.api51_user_islogin();
                console.log("login:" + t),
                  t
                    ? e.switchTab({ url: "../car/car" })
                    : (this.phone = this.$api51.api51_user_get_account()),
                  this.$api51.api51_code_on_verify_listener(function (e) {
                    (o.count_down = e),
                      (o.code_msg = 0 == e ? "验证码" : "重发(" + e + ")");
                  }),
                  wx.login({
                    success: function (e) {
                      (o.wx_code = e.code), o.get_wx_appid(o.wx_code);
                    },
                  });
              },
              onUnload: function () {
                this.$api51.api51_code_on_release();
              },
              methods: {
                get_wx_appid: function (n) {
                  var t = { appId: this.$app_id, wxCode: n };
                  this.$api51.api51_request(
                    "api/Wx/AuthCode",
                    "POST",
                    null,
                    t,
                    "",
                    function (n, t) {
                      var o = n[0].wxOpenId;
                      e.setStorageSync("user_wxappid", o);
                    },
                    function (e, n) {}
                  );
                },
                phoneInput: function (e) {
                  this.phone = e.detail.value;
                },
                passwordInput: function (e) {
                  this.password = e.detail.value;
                },
                getPhoneNumber: function (n) {
                  if (void 0 != n.detail.encryptedData) {
                    var t = this,
                      o = e.getSystemInfoSync(),
                      i = e.getStorageSync("user_wxappid");
                    console.log("wxOpenID:" + i);
                    var a = {
                      appId: t.$app_id,
                      wxOpenId: i,
                      version: "wx1.0.1",
                      osType: 3,
                      osVersion: o.system,
                      modelNo: o.model,
                      encryptedData: n.detail.encryptedData,
                      iv: n.detail.iv,
                    };
                    t.$api51.api51_request(
                      "api/Wx/Login",
                      "POST",
                      null,
                      a,
                      "登录中...",
                      function (n, o) {
                        var i = n[0];
                        t.$api51.api51_user_save_userdata(i),
                          t.$api51.api51_user_set_loginname(""),
                          e.setStorageSync("nickname", i.nickname),
                          e.setStorageSync("avatar", i.avatar),
                          t.login_in(),
                          console.log("登录成功");
                      },
                      function (n, t) {
                        e.showModal({
                          title: "提示",
                          content: t + n,
                          showCancel: !1,
                        }),
                          console.log("登录是吧:");
                      }
                    );
                  }
                },
                login: function () {
                  if (0 == this.phone.length || 0 == this.password.length)
                    e.showToast({
                      title: "用户名和密码不能为空",
                      icon: "none",
                      duration: 2e3,
                    });
                  else {
                    var n = this.$app_id;
                    this.$api51.api51_login(
                      this.phone,
                      this.password,
                      n,
                      function (n, t) {
                        e.setStorageSync("nickname", n.nickname),
                          e.setStorageSync("avatar", n.avatar),
                          (o.action_type = n.actionType),
                          1 == n.actionType
                            ? o.showBindPhoneDialog(!1)
                            : 2 == n.actionType
                            ? o.showBindPhoneDialog(!0)
                            : o.login_in();
                      },
                      function (n, t) {
                        e.showModal({
                          title: t + "(" + n + ")",
                          showCancel: !1,
                        });
                      }
                    );
                  }
                },
                click_forget: function (n) {
                  e.navigateTo({
                    url:
                      "../regist_forget/regist_forget?data=1&value=" +
                      this.phone,
                  });
                },
                click_register: function (n) {
                  e.navigateTo({
                    url:
                      "../regist_forget/regist_forget?data=2&value=" +
                      this.phone,
                  });
                },
                showBindPhoneDialog: function (e) {
                  (this.notice_msg = e
                    ? "请绑定手机号码,绑定成功后,登陆账号为您的手机号"
                    : "由于系统升级，登录用户名须为您的手机号码，请输入您真实的手机号码点击确定完成修改，如有问题请联系400 9988 551"),
                    (this.alert_can_edit_phone = !0),
                    (this.alert_can_edit_pwd = e),
                    (this.alert_can_edit_code = !0),
                    (this.cancel_btn_text = "跳过"),
                    (this.is_can_skip = !0),
                    (this.is_verify = !1),
                    (this.dialog_mode = e ? "Phone_pwd_code" : "Phone_code"),
                    this.$refs.dialogInput.open();
                },
                showVerifyDeviceDialog: function () {
                  (this.is_verify = !1),
                    (this.notice_msg =
                      "这是一台新设备,您需要验证身份后才能登录.如需帮助请联系客服热线:4009988551"),
                    (this.alert_can_edit_phone = !1),
                    (this.alert_can_edit_pwd = !1),
                    (this.alert_can_edit_code = !0),
                    (this.cancel_btn_text = "取消"),
                    (this.is_can_skip = !1),
                    (this.alert_phone_value = this.phone),
                    (this.dialog_mode = "Phone_code"),
                    this.$refs.dialogInput.open();
                },
                dialogInputConfirm: function (n, t, i, a) {
                  console.log(t + ";" + i + ";" + a),
                    (this.value = t + ";" + i + ";" + a),
                    (this.alert_phone_value = t),
                    (this.alert_pwd_value = i),
                    (this.alert_code_value = a),
                    console.log("action_type:" + o.action_type),
                    1 == this.action_type
                      ? this.check_input_param(!0, !1, !0) &&
                        o.$api51.api51_change_mobile(
                          this.alert_phone_value,
                          this.alert_code_value,
                          function (t, i) {
                            (o.phone = o.alert_phone_value),
                              o.$refs.dialogInput.close(),
                              n(),
                              (o.password = ""),
                              e.showModal({
                                content: "操作成功，请再次登录",
                                showCancel: !1,
                              });
                          },
                          function (n, t) {
                            e.showModal({ showCancel: !1, content: t + n });
                          }
                        )
                      : 2 == this.action_type
                      ? this.check_input_param(!0, !0, !0) &&
                        o.$api51.api51_change_transer(
                          this.alert_phone_value,
                          this.alert_code_value,
                          this.alert_pwd_value,
                          function (t, i) {
                            (o.phone = o.alert_phone_value),
                              o.$refs.dialogInput.close(),
                              n(),
                              (o.password = ""),
                              e.showModal({
                                content: "操作成功，请再次登录",
                                showCancel: !1,
                              });
                          },
                          function (n, t) {
                            e.showModal({ showCancel: !1, content: t + n });
                          }
                        )
                      : this.check_input_param(!0, !1, !0) &&
                        this.verify_device();
                },
                dialogInputClose: function (e) {
                  this.is_can_skip
                    ? this.login_in()
                    : o.$api51.api51_user_set_login(!1),
                    e();
                },
                dialogSendVerifyCode: function (n, t) {
                  (this.alert_phone_value = t),
                    this.count_down > 0 ||
                      ("" != this.alert_phone_value
                        ? this.is_verify
                          ? o.$api51.api51_code_get_user(this.alert_phone_value)
                          : o.$api51.api51_code_get_common(
                              this.alert_phone_value
                            )
                        : e.showToast({
                            title: "请输入正确的手机号",
                            icon: "none",
                          }));
                },
                login_in: function () {
                  this.$api51.api51_user_set_login(!0),
                    e.setStorageSync("need_update_cars", 1),
                    e.switchTab({ url: "../car/car" });
                },
                verify_device: function () {},
                check_input_param: function (n, t, o) {
                  return n && this.alert_phone_value.length < 5
                    ? (e.showModal({
                        content: "请输入有效手机号",
                        showCancel: !1,
                      }),
                      !1)
                    : t && this.alert_pwd_value.length < 6
                    ? (e.showModal({
                        content: "请输入长度大于6位的密码",
                        showCancel: !1,
                      }),
                      !1)
                    : !(
                        o &&
                        this.alert_code_value.length < 4 &&
                        (e.showModal({
                          content: "请输入验证码",
                          showCancel: !1,
                        }),
                        1)
                      );
                },
              },
            });
        n.default = i;
      }).call(this, t("543d").default);
    },
    fa93: function (e, n, t) {
      t.d(n, "b", function () {
        return i;
      }),
        t.d(n, "c", function () {
          return a;
        }),
        t.d(n, "a", function () {
          return o;
        });
      var o = {
          uniPopup: function () {
            return Promise.all([
              t.e("common/vendor"),
              t.e("components/uni-popup/uni-popup"),
            ]).then(t.bind(null, "cb66"));
          },
        },
        i = function () {
          var e = this;
          e.$createElement;
          e._self._c;
        },
        a = [];
    },
  },
  [["058c", "common/runtime", "common/vendor"]],
]);
