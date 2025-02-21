var e = require("../../utils/debouns.js"),
  t = require("../../common/vendor.js"),
  o = {
    data: function () {
      return {
        inputPhone: "",
        op: [],
        smCode: !1,
        timer: 60,
        insmcode: "",
        intmer: null,
      };
    },
    onLoad: function (e) {
      console.log(e), (this.op = e), e && (this.inputPhone = e.phone);
    },
    onUnload: function () {
      this.intmer = null;
    },
    mounted: function () {
      this.goSetPw = e.throttle(this.goSetPw, 3e3);
    },
    methods: {
      getCodeSm: function () {
        var e = this;
        (this.smCode = !0),
          (this.intmer = setInterval(function () {
            e.timer--,
              0 === e.timer &&
                ((e.timer = 60), (e.smCode = !1), (e.intmer = null));
          }, 1e3)),
          this.$api.$getSmsCode({ phone: this.inputPhone }).then(function (t) {
            e.$toast("验证码已发送"), console.log("验证码已发送", t.data);
          });
      },
      goSetPw: function () {
        var e = this;
        this.insmcode
          ? this.$api
              .$checkSmsCode({ phone: this.inputPhone, code: this.insmcode })
              .then(function (t) {
                console.log("yanz ", t.data),
                  2e4 === t.data.code &&
                    e.$jump(
                      "/pages_my/edit-password/edit-password?cardid=".concat(
                        e.op.carId,
                        "&state=0"
                      )
                    ),
                  20001 === t.data.code &&
                    e.$toast(t.data.message, "error", 2e3, !0);
              })
          : this.$toast("请输入验证码", "none", 2e3);
      },
    },
  };
Array || t.resolveComponent("zym-navigation")();
Math;
var n = t._export_sfc(o, [
  [
    "render",
    function (e, o, n, i, s, a) {
      return t.e(
        {
          a: t.p({ title: "找回密码", "is-home-page": !1 }),
          b: s.inputPhone,
          c: t.o(function (e) {
            return (s.inputPhone = e.detail.value);
          }),
          d: s.insmcode,
          e: t.o(function (e) {
            return (s.insmcode = e.detail.value);
          }),
          f: !s.smCode,
        },
        s.smCode
          ? { h: t.t(s.timer) }
          : {
              g: t.o(function () {
                return a.getCodeSm && a.getCodeSm.apply(a, arguments);
              }),
            },
        {
          i: t.o(function () {
            return a.goSetPw && a.goSetPw.apply(a, arguments);
          }),
        }
      );
    },
  ],
  ["__scopeId", "data-v-9c3f2f6a"],
]);
wx.createPage(n);
