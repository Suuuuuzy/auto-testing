(global.webpackJsonp = global.webpackJsonp || []).push([
  ["baseComponents/addShopTicket/index"],
  {
    "0af6b": function (e, t, n) {
      "use strict";
      n.r(t);
      var s = n("c01f"),
        i = n("4a18");
      for (var o in i)
        ["default"].indexOf(o) < 0 &&
          (function (e) {
            n.d(t, e, function () {
              return i[e];
            });
          })(o);
      n("47c61");
      var a = n("f0c5"),
        c = Object(a.a)(
          i.default,
          s.b,
          s.c,
          !1,
          null,
          "c70df0a0",
          null,
          !1,
          s.a,
          void 0
        );
      t.default = c.exports;
    },
    4127: function (e, t, n) {},
    "47c61": function (e, t, n) {
      "use strict";
      var s = n("4127");
      n.n(s).a;
    },
    "4a18": function (e, t, n) {
      "use strict";
      n.r(t);
      var s = n("eddf"),
        i = n.n(s);
      for (var o in s)
        ["default"].indexOf(o) < 0 &&
          (function (e) {
            n.d(t, e, function () {
              return s[e];
            });
          })(o);
      t.default = i.a;
    },
    c01f: function (e, t, n) {
      "use strict";
      n.d(t, "b", function () {
        return s;
      }),
        n.d(t, "c", function () {
          return i;
        }),
        n.d(t, "a", function () {});
      var s = function () {
          this.$createElement, this._self._c;
        },
        i = [];
    },
    eddf: function (e, t, n) {
      "use strict";
      var s = n("4ea4");
      Object.defineProperty(t, "__esModule", { value: !0 }),
        (t.default = void 0);
      var i = s(n("2309")),
        o = {
          data: function () {
            return {
              ticketData: [],
              sign: "",
              sendCouponMerchant: "",
              customizeSendTime: "",
              title: "商家券",
              coupons: [],
              ready: !1,
            };
          },
          props: {
            shopTicketData: {
              type: Array,
              default: function () {
                return [];
              },
            },
          },
          methods: {
            beginGetcoupon: function () {
              this.$emit("beginGetcoupon");
            },
            getcouponFun: function (e) {
              var t = {
                  success: 0,
                  message: "",
                  failList: [],
                  successList: [],
                },
                n = e.detail;
              if (n)
                if ("OK" != n.errcode) t.message = n.msg;
                else if (n.send_coupon_result.length) {
                  var s = n.send_coupon_result.filter(function (e) {
                      return "SUCCESS" == e.code;
                    }),
                    i = n.send_coupon_result.filter(function (e) {
                      return "SUCCESS" != e.code;
                    });
                  (t.failList = i),
                    (t.successList = s),
                    t.failList.length || (t.success = 1);
                }
              console.log("result", t), this.$emit("addResult", t);
            },
            run: function (e) {
              this.getShopTicketSign(e);
            },
            getShopTicketSign: function (e) {
              var t = this,
                n = { coupons: e };
              i.default
                .getData({
                  name: "getShopTicketSign",
                  nameSpace: "CD",
                  params: n,
                  getNew: !0,
                })
                .then(function (e) {
                  if (0 == e.status && e.result) {
                    var n = e.result.sendCouponParams;
                    n && n.length
                      ? ((t.ready = !0),
                        (t.ticketData = n || []),
                        (t.sign = e.result.sign || ""),
                        (t.sendCouponMerchant =
                          e.result.sendCouponMerchant || ""),
                        (t.customizeSendTime =
                          e.result.customizeSendTime || ""),
                        t.$emit("getSignResult", { type: !0, message: "" }))
                      : t.$emit("getSignResult", {
                          type: !1,
                          message: e.message,
                        });
                  } else t.$emit("getSignResult", { type: !1, message: e.message });
                });
            },
          },
          created: function () {
            this.shopTicketData.length && this.run(this.shopTicketData);
          },
          watch: {
            shopTicketData: {
              handler: function (e) {
                e.length && this.run(e);
              },
              deep: !0,
            },
          },
        };
      t.default = o;
    },
  },
]),
  (global.webpackJsonp = global.webpackJsonp || []).push([
    "baseComponents/addShopTicket/index-create-component",
    {
      "baseComponents/addShopTicket/index-create-component": function (
        e,
        t,
        n
      ) {
        n("543d").createComponent(n("0af6b"));
      },
    },
    [["baseComponents/addShopTicket/index-create-component"]],
  ]);
