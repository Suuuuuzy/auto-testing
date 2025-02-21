var e = require("../../@babel/runtime/helpers/defineProperty"),
  n = require("../../utils/utils.js"),
  t = require("../../utils/debouns.js"),
  o = require("../../common/vendor.js"),
  i = {
    data: function () {
      return e(
        e(
          e(
            e(
              e(
                {
                  oldPhone: "",
                  phone: "",
                  cardid: null,
                  isphone: !0,
                  value: 0,
                  range: [{ value: 0, text: "86" }],
                },
                "oldPhone",
                ""
              ),
              "insmcode",
              ""
            ),
            "smCode",
            !1
          ),
          "timer",
          60
        ),
        "intmer",
        null
      );
    },
    onLoad: function (e) {
      console.log(e),
        e &&
          ((this.cardid = e.cardid),
          (this.phone = e.phone),
          (this.oldPhone = e.phone));
    },
    onUnload: function () {
      this.intmer = null;
    },
    watch: {
      phone: function (e) {
        this.isphone = !!e;
      },
    },
    mounted: function () {
      (this.updatephonenumber = t.throttle(this.updatephonenumber, 2e3)),
        (this.getCodeSm = t.throttle(this.getCodeSm, 6e4));
    },
    methods: {
      checkPhone: function (e) {
        return n.validateTelephoneNumber(e);
      },
      updatephonenumber: function () {
        if (this.phone === this.oldPhone)
          return (
            console.log(this.checkPhone(this.phone)),
            this.checkPhone(this.phone)
              ? (this.cardid, this.phone, void this.checkPhoneSm())
              : ((this.isphone = !1), !1)
          );
        this.$toast("原手机号不匹配");
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
          this.$api.$getSmsCode({ phone: this.phone }).then(function (n) {
            e.$toast("验证码已发送"), console.log("验证码已发送", n.data);
          });
      },
      checkPhoneSm: function () {
        var e = this;
        this.insmcode
          ? this.$api
              .$checkSmsCode({ phone: this.phone, code: this.insmcode })
              .then(function (n) {
                2e4 === n.data.code &&
                  e.$jump(
                    "/pages_my/update-phone/update-phone?cardid=".concat(
                      e.cardid
                    )
                  ),
                  20001 === n.data.code &&
                    e.$toast(n.data.message, "error", 2e3, !0);
              })
          : this.$toast("请输入验证码", "none", 2e3);
      },
    },
  };
Array || o.resolveComponent("zym-navigation")();
Math;
var h = o._export_sfc(i, [
  [
    "render",
    function (e, n, t, i, h, s) {
      return o.e(
        {
          a: o.p({ title: "验证手机号", "is-home-page": !1 }),
          b: h.phone,
          c: o.o(function (e) {
            return (h.phone = e.detail.value);
          }),
          d: h.insmcode,
          e: o.o(function (e) {
            return (h.insmcode = e.detail.value);
          }),
          f: !h.smCode,
        },
        h.smCode
          ? { h: o.t(h.timer) }
          : {
              g: o.o(function () {
                return s.getCodeSm && s.getCodeSm.apply(s, arguments);
              }),
            },
        { i: !h.isphone && h.phone },
        (!h.isphone && h.phone, {}),
        {
          j: o.o(function () {
            return (
              s.updatephonenumber && s.updatephonenumber.apply(s, arguments)
            );
          }),
        }
      );
    },
  ],
]);
wx.createPage(h);
