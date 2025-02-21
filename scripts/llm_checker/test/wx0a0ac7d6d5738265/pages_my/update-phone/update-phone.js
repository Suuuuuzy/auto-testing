var e = require("../../common/vendor.js"),
  o = require("../../utils/utils.js"),
  t = require("../../utils/debouns.js"),
  n = {
    data: function () {
      return {
        oldPhone: "",
        phone: "",
        cardid: null,
        isphone: !0,
        value: 0,
        ishome: "",
        smCode: !1,
        intmer: null,
        timer: 60,
        insmcode: "",
      };
    },
    onLoad: function (e) {
      console.log(e),
        e &&
          (e.home && (this.ishome = e.home),
          e.phone,
          e.cardid && (this.cardid = e.cardid));
    },
    onUnload: function () {
      this.timer = null;
    },
    watch: {
      phone: function (e) {
        this.isphone = !!e;
      },
    },
    mounted: function () {
      (this.updatephonenumber = t.throttle(this.updatephonenumber, 2e3)),
        (this.updatehomephonenumber = t.throttle(
          this.updatehomephonenumber,
          2e3
        )),
        (this.getCodeSm = t.throttle(this.getCodeSm, 6e4));
    },
    methods: {
      getPhonenumber: function (e) {
        var o = this,
          t = {};
        (t = e.detail.code
          ? { code: e.detail.code }
          : { encryptedData: e.detail.encryptedData, ivStr: e.detail.iv }),
          "getPhoneNumber:ok" === e.detail.errMsg &&
            (console.log("获取手机号code", t),
            setTimeout(function () {
              o.$api.CryptPhoneNumber(t).then(function (e) {
                console.log("返回手机号", e.data),
                  2e4 === e.data.code && (o.phone = e.data.data);
              });
            }, 0));
      },
      checkPhone: function (e) {
        return o.validateTelephoneNumber(e);
      },
      updatehomephonenumber: function () {
        var o = this;
        if (
          (console.log("首页"),
          console.log(this.checkPhone(this.phone)),
          !this.checkPhone(this.phone))
        )
          return (this.isphone = !1), !1;
        var t = { phoneNumber: this.phone };
        this.insmcode &&
          (this.$loading(),
          this.$api.addCarPhone(t).then(function (t) {
            console.log(t),
              2e4 === t.data.code &&
                (console.log("修改成功"),
                o.$toast(t.data.message),
                setTimeout(function () {
                  e.index.switchTab({ url: "/pages/index/index" });
                }, 1e3)),
              20001 === t.data.code &&
                (console.log("修改失败"), o.$toast(t.data.message));
          }));
      },
      updatephonenumber: function () {
        if (
          (console.log(this.checkPhone(this.phone)),
          !this.checkPhone(this.phone))
        )
          return (this.isphone = !1), this.$toast("请输入手机号"), !1;
        this.checkPhoneSm();
      },
      change: function (e) {
        console.log("e", e);
      },
      getCodeSm: function () {
        var e = this;
        (this.smCode = !0),
          (this.intmer = setInterval(function () {
            e.timer--,
              0 === e.timer &&
                ((e.timer = 60), (e.smCode = !1), (e.intmer = null));
          }, 1e3)),
          this.$api.$getSmsCode({ phone: this.phone }).then(function (o) {
            e.$toast("验证码已发送"), console.log("验证码已发送", o.data);
          });
      },
      checkPhoneSm: function () {
        var o = this;
        this.insmcode
          ? this.$api
              .$checkSmsCode({ phone: this.phone, code: this.insmcode })
              .then(function (t) {
                console.log("yanz ", t.data),
                  2e4 === t.data.code &&
                    (o.$loading(),
                    o.$api
                      .$postUpdateCardPhone({
                        cardId: o.cardid,
                        phone: o.phone,
                      })
                      .then(function (t) {
                        2e4 === t.data.code &&
                          (console.log("修改成功"),
                          o.$toast(t.data.message),
                          setTimeout(function () {
                            e.index.navigateTo({
                              url: "/pages_my/recharge-vip/recharge-vip",
                            });
                          }, 1e3)),
                          20001 === t.data.code &&
                            (console.log("修改失败"), o.$toast(t.data.message));
                      })),
                  20001 !== t.data.code ||
                    o.$toast(t.data.message, "error", 2e3, !0);
              })
          : this.$toast("请输入验证码", "none", 2e3);
      },
    },
  };
Array || e.resolveComponent("zym-navigation")();
Math;
var i = e._export_sfc(n, [
  [
    "render",
    function (o, t, n, i, h, a) {
      return e.e(
        {
          a: e.p({ title: "修改手机号", "is-home-page": !1 }),
          b: h.phone,
          c: e.o(function (e) {
            return (h.phone = e.detail.value);
          }),
          d: 11 == h.phone.length,
        },
        11 == h.phone.length
          ? e.e(
              {
                e: h.insmcode,
                f: e.o(function (e) {
                  return (h.insmcode = e.detail.value);
                }),
                g: !h.smCode,
              },
              h.smCode
                ? { i: e.t(h.timer) }
                : {
                    h: e.o(function () {
                      return a.getCodeSm && a.getCodeSm.apply(a, arguments);
                    }),
                  }
            )
          : {},
        { j: !h.isphone && h.phone },
        (!h.isphone && h.phone, {}),
        {
          k: e.o(function () {
            return a.getPhonenumber && a.getPhonenumber.apply(a, arguments);
          }),
          l: "1" === h.ishome,
        },
        "1" === h.ishome
          ? {
              m: e.o(function () {
                return (
                  a.updatehomephonenumber &&
                  a.updatehomephonenumber.apply(a, arguments)
                );
              }),
            }
          : {
              n: e.o(function () {
                return (
                  a.updatephonenumber && a.updatephonenumber.apply(a, arguments)
                );
              }),
            }
      );
    },
  ],
]);
wx.createPage(i);
