(global.webpackJsonp = global.webpackJsonp || []).push([
  ["pages/login/index"],
  {
    1720: function (e, n, t) {},
    "2baf": function (e, n, t) {
      (function (e, n) {
        var o = t("4ea4");
        t("35e6"), o(t("66fd"));
        var i = o(t("8869"));
        (e.__webpack_require_UNI_MP_PLUGIN__ = t), n(i.default);
      }).call(this, t("bc2e").default, t("543d").createPage);
    },
    "30ff": function (e, n, t) {
      t.d(n, "b", function () {
        return i;
      }),
        t.d(n, "c", function () {
          return r;
        }),
        t.d(n, "a", function () {
          return o;
        });
      var o = {
          uButton: function () {
            return t
              .e("node-modules/uview-ui/components/u-button/u-button")
              .then(t.bind(null, "6009"));
          },
          uCheckbox: function () {
            return t
              .e("node-modules/uview-ui/components/u-checkbox/u-checkbox")
              .then(t.bind(null, "2196"));
          },
        },
        i = function () {
          this.$createElement;
          this._self._c,
            (this.$mp.data = Object.assign(
              {},
              {
                $root: {
                  a0: {
                    height: "88rpx",
                    fontSize: "32rpx",
                    "line-height": "88rpx",
                    display: "flex",
                    "align-items": "center",
                    marginTop: "40rpx",
                    color: "#000000",
                  },
                },
              }
            ));
        },
        r = [];
    },
    8869: function (e, n, t) {
      t.r(n);
      var o = t("30ff"),
        i = t("e607");
      for (var r in i)
        ["default"].indexOf(r) < 0 &&
          (function (e) {
            t.d(n, e, function () {
              return i[e];
            });
          })(r);
      t("f085");
      var a = t("f0c5"),
        c = Object(a.a)(
          i.default,
          o.b,
          o.c,
          !1,
          null,
          "40d214b5",
          null,
          !1,
          o.a,
          void 0
        );
      n.default = c.exports;
    },
    df8a: function (e, n, t) {
      (function (e, o) {
        Object.defineProperty(n, "__esModule", { value: !0 }),
          (n.default = void 0);
        var i = t("df69"),
          r = t("426c"),
          a =
            (t("26cb"),
            {
              name: "loginView",
              data: function () {
                return {
                  tips: "",
                  uid: "",
                  code: "",
                  showAuth: !1,
                  avatarUrl: void 0,
                  loginForm: {
                    mobile: void 0,
                    code: void 0,
                    weChatAuthCode: void 0,
                  },
                  customStyle: {
                    height: "88rpx",
                    fontSize: "32rpx",
                    "line-height": "88rpx",
                    display: "flex",
                    "align-items": "center",
                    marginTop: "110rpx",
                    color: "#fff",
                    background: "linear-gradient(90deg, #5983FF, #A836FF)",
                  },
                  inputStyle: { "font-size": "40rpx" },
                  seconds: 60,
                  checked: !1,
                  wxcode: void 0,
                };
              },
              onLoad: function (e) {
                var n = e.uid;
                this.uid = n;
              },
              mounted: function () {
                this.wxCode();
              },
              methods: {
                checkRule: function () {
                  this.checked ||
                    e.showToast({
                      icon: "none",
                      title: "请阅读并同意《用户协议》《隐私政策》",
                    });
                },
                vistorLogin: function (n) {
                  var t = this;
                  (0, i.visitorLogin)(n).then(function (n) {
                    (n.id = n.userId),
                      t.$store.commit("updateUserInfo", n),
                      (0, r.userInfo)().then(function (o) {
                        e.setStorage({ key: "userInfo", data: n }),
                          t.$store.commit("updateUserInfo", o),
                          e.switchTab({ url: "/pages/tabbar/home/index" });
                      });
                  });
                },
                updateLogin: function () {
                  var e = this;
                  o.getUserInfo({
                    success: function (n) {
                      var t = n.encryptedData,
                        o = n.iv;
                      e.vistorLogin({
                        code: e.code,
                        userEncryptedData: t,
                        userIv: o,
                      });
                    },
                  });
                },
                handleVisitor: function () {
                  if (this.checked) {
                    var n = this;
                    o.getUserProfile({
                      desc: "用于展示个人信息",
                      success: function (e) {
                        var t = e.encryptedData,
                          o = e.iv;
                        n.vistorLogin({
                          code: n.code,
                          userEncryptedData: t,
                          userIv: o,
                        });
                      },
                      fail: function () {
                        o.showModal({
                          title: "提示",
                          content:
                            "拒绝授权,小程序将无法正常显示个人信息,点击确定重新获取授权。",
                          confirmColor: "#631EFB",
                          success: function (e) {
                            e.confirm &&
                              o.openSetting({
                                success: function (e) {
                                  e.authSetting["scope.userInfo"] &&
                                    n.updateLogin();
                                },
                                fail: function (e) {},
                              });
                          },
                        });
                      },
                    });
                  } else
                    e.showToast({
                      icon: "none",
                      title: "请阅读并同意《用户协议》《隐私政策》",
                    });
                },
                getPhoneNumber: function (n) {
                  var t = this;
                  if ("getPhoneNumber:ok" == n.detail.errMsg) {
                    var o = n.detail,
                      a = o.encryptedData,
                      c = o.iv,
                      u = {
                        code: this.code,
                        phoneIv: c,
                        pid: this.uid,
                        phoneEncryptedData: a,
                      };
                    (0, i.wxLogin)(u).then(function (n) {
                      t.$store.commit("updateUserInfo", n),
                        (0, r.userInfo)().then(function (n) {
                          e.setStorage({ key: "userInfo", data: n }),
                            t.$store.commit("updateUserInfo", n),
                            n.avatar
                              ? e.switchTab({ url: "/pages/tabbar/home/index" })
                              : e.redirectTo({
                                  url: "/pages/user/perfect/index",
                                });
                        });
                    });
                  } else this.wxCode();
                },
                wxCode: function () {
                  var n = this;
                  e.login({
                    provider: "weixin",
                    success: function (e) {
                      n.code = e.code;
                    },
                  });
                },
                toAgreement: function () {
                  this.handleNavigater("/pages/user/loginagreement/index");
                },
                toPrivacy: function () {
                  this.handleNavigater("/pages/user/privacy/index");
                },
              },
            });
        n.default = a;
      }).call(this, t("543d").default, t("bc2e").default);
    },
    e607: function (e, n, t) {
      t.r(n);
      var o = t("df8a"),
        i = t.n(o);
      for (var r in o)
        ["default"].indexOf(r) < 0 &&
          (function (e) {
            t.d(n, e, function () {
              return o[e];
            });
          })(r);
      n.default = i.a;
    },
    f085: function (e, n, t) {
      var o = t("1720");
      t.n(o).a;
    },
  },
  [["2baf", "common/runtime", "common/vendor"]],
]);
