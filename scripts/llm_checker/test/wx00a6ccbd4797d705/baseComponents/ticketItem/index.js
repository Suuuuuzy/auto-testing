(global.webpackJsonp = global.webpackJsonp || []).push([
  ["baseComponents/ticketItem/index"],
  {
    "16d1": function (t, e, a) {
      "use strict";
      a.r(e);
      var i = a("d34c"),
        c = a("a177");
      for (var n in c)
        ["default"].indexOf(n) < 0 &&
          (function (t) {
            a.d(e, t, function () {
              return c[t];
            });
          })(n);
      a("6058");
      var s = a("f0c5"),
        r = Object(s.a)(
          c.default,
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
      e.default = r.exports;
    },
    "180e": function (t, e, a) {},
    6058: function (t, e, a) {
      "use strict";
      var i = a("180e");
      a.n(i).a;
    },
    a177: function (t, e, a) {
      "use strict";
      a.r(e);
      var i = a("e315"),
        c = a.n(i);
      for (var n in i)
        ["default"].indexOf(n) < 0 &&
          (function (t) {
            a.d(e, t, function () {
              return i[t];
            });
          })(n);
      e.default = c.a;
    },
    d34c: function (t, e, a) {
      "use strict";
      a.d(e, "b", function () {
        return i;
      }),
        a.d(e, "c", function () {
          return c;
        }),
        a.d(e, "a", function () {});
      var i = function () {
          var t = this,
            e =
              (t.$createElement,
              t._self._c,
              t.showTicket ? t.__get_style([t.ticketWrapStyle]) : null),
            a = t.showTicket
              ? t.showFrequency &&
                t.ticketData.frequencyMoney &&
                Number(t.ticketData.frequencyMoney)
              : null,
            i =
              t.showTicket &&
              t.showPriceArea &&
              5 == t.ticketData.ticketType &&
              1 == t.ticketData.deductValueType
                ? t._f("price")(t.ticketData.deductToValue)
                : null;
          t.$mp.data = Object.assign({}, { $root: { s0: e, m0: a, f0: i } });
        },
        c = [];
    },
    e315: function (t, e, a) {
      "use strict";
      Object.defineProperty(e, "__esModule", { value: !0 }),
        (e.default = void 0);
      var i = a("ca00"),
        c = {
          data: function () {
            return { title: "ticketItem", image: "", newDate: "", redTips: !1 };
          },
          props: [
            "ticketData",
            "unUseful",
            "noDetail",
            "resource",
            "unExpired",
            "customHeight",
            "hideImg",
            "showFrequency",
            "noDate",
          ],
          filters: {
            price: function (t) {
              return "0" == t || "0.00" == t ? "免配送费" : "券后价格";
            },
          },
          computed: {
            showTicket: function () {
              var t = !0;
              return (
                this.ticketData.hasOwnProperty("participateInfo") &&
                  this.ticketData.participateInfo &&
                  (this.ticketData.participateInfo.couponStock -
                    this.ticketData.participateInfo.couponGross ||
                    (t = !1)),
                t
              );
            },
            timeRage: function () {
              var t = "";
              if (this.noDate) return "";
              if (this.resource)
                1 == this.ticketData.expiryType &&
                  (t = ""
                    .concat(
                      this.ticketData.kindBeginDay.replace(/-/g, "."),
                      " - "
                    )
                    .concat(this.ticketData.kindEndDay.replace(/-/g, "."))),
                  2 == this.ticketData.expiryType &&
                    (t =
                      1 == this.ticketData.afterType
                        ? "领取后"
                            .concat(
                              0 == this.ticketData.afterHours
                                ? "立即"
                                : this.ticketData.afterHours + "小时",
                              "生效，有效期"
                            )
                            .concat(this.ticketData.expiryDays, "天")
                        : "领取后"
                            .concat(
                              0 == this.ticketData.afterDays
                                ? "立即"
                                : this.ticketData.afterDays + "天",
                              "生效，有效期"
                            )
                            .concat(this.ticketData.expiryDays, "天")),
                  3 == this.ticketData.expiryType &&
                    (t =
                      1 == this.ticketData.afterType
                        ? "领取后"
                            .concat(
                              0 == this.ticketData.afterHours
                                ? "立即"
                                : this.ticketData.afterHours + "小时",
                              "生效，有效期截止到"
                            )
                            .concat(
                              this.ticketData.kindEndDay
                                .slice(0, 16)
                                .replace(/-/g, ".")
                            )
                        : "领取后"
                            .concat(
                              0 == this.ticketData.afterDays
                                ? "立即"
                                : this.ticketData.afterDays + "天",
                              "生效，有效期截止到"
                            )
                            .concat(
                              this.ticketData.kindEndDay
                                .slice(0, 16)
                                .replace(/-/g, ".")
                            )),
                  4 == this.ticketData.expiryType && (t = "当月领取有效");
              else {
                var e,
                  a = (0, i.getDaysBetween)(
                    this.newDate,
                    null === (e = this.ticketData.ticketendtime) || void 0 === e
                      ? void 0
                      : e.split(" ")[0]
                  ),
                  c = null;
                0 == a
                  ? (c = "今天")
                  : 1 == a
                  ? (c = "明天")
                  : 2 == a && (c = "后天"),
                  (t = c
                    ? ""
                        .concat(c)
                        .concat(
                          this.ticketData.ticketendtime
                            .split(" ")[1]
                            .replace(/-/g, "."),
                          "到期"
                        )
                    : "有效期至".concat(
                        this.ticketData.ticketendtime.replace(/-/g, ".")
                      ));
              }
              return t;
            },
            usableNum: function () {
              var t = 0;
              if (
                this.ticketData &&
                ((t = this.ticketData.usableNum),
                this.ticketData.hasOwnProperty("invalidNum") &&
                  this.ticketData.invalidNum &&
                  (t -= this.ticketData.invalidNum),
                this.ticketData.hasOwnProperty("participateInfo") &&
                  this.ticketData.participateInfo)
              ) {
                var e =
                  this.ticketData.participateInfo.couponStock -
                  this.ticketData.participateInfo.couponGross;
                e < t && (t = e);
              }
              return t;
            },
            showPriceArea: function () {
              var t = !0;
              return (
                this.ticketData &&
                  (1 == this.ticketData.ticketType
                    ? "0" == this.ticketData.kindmoney && (t = !1)
                    : 2 == this.ticketData.ticketType
                    ? ("0" != this.ticketData.kindmoney &&
                        "10" != this.ticketData.kindmoney) ||
                      (t = !1)
                    : 3 == this.ticketData.ticketType
                    ? "0" == this.ticketData.kindmoney && (t = !1)
                    : 4 == this.ticketData.ticketType && (t = !1),
                  1 == this.ticketData.wechatMerchantApply &&
                    this.ticketData.merchantAddableNum > 0 &&
                    (t = !0)),
                t
              );
            },
            ticketType: function () {
              var t = { class: "", name: "" };
              switch (this.ticketData.ticketType) {
                case 1:
                  (t.name = "代金券"), (t.class = "daijin");
                  break;
                case 2:
                  (t.name = "折扣券"), (t.class = "zhekou");
                  break;
                case 3:
                  (t.name = "商品券"), (t.class = "shangpin");
                  break;
                case 4:
                  (t.name = "赠品券"), (t.class = "zengpin");
                  break;
                case 5:
                  (t.name = "配送券"), (t.class = "peisong");
                  break;
                default:
                  (t.name = ""), (t.class = "");
              }
              return t;
            },
            ticketWrapStyle: function () {
              var t = {};
              return (
                this.customHeight > 0 && (t.height = this.customHeight + "px"),
                (t["background-image"] = this.showPriceArea
                  ? ""
                  : "url(https://cdnpic.wuuxiang.com/msgjDecorationImg/ticketBg2.png)"),
                t
              );
            },
          },
          created: function () {
            var t;
            this.newDate = new Date().toLocaleDateString().replace(/\//g, "-");
            var e = null;
            null !== (t = this.ticketData) &&
              void 0 !== t &&
              t.ticketendtime &&
              (e = (0, i.getDaysBetween)(
                this.newDate,
                this.ticketData.ticketendtime.split(" ")[0]
              )),
              e && e < 3 && e >= 0 && (this.redTips = !0);
          },
        };
      e.default = c;
    },
  },
]),
  (global.webpackJsonp = global.webpackJsonp || []).push([
    "baseComponents/ticketItem/index-create-component",
    {
      "baseComponents/ticketItem/index-create-component": function (t, e, a) {
        a("543d").createComponent(a("16d1"));
      },
    },
    [["baseComponents/ticketItem/index-create-component"]],
  ]);
