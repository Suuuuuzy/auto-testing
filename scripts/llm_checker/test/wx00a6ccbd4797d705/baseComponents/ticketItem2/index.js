(global.webpackJsonp = global.webpackJsonp || []).push([
  ["baseComponents/ticketItem2/index"],
  {
    "14b2": function (t, e, a) {
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
              t.showPriceAreaFlg &&
              5 == t.ticketData.type &&
              1 == t.ticketData.deductValueType
                ? t._f("price")(t.ticketData.deductToValue)
                : null);
          t.$mp.data = Object.assign({}, { $root: { f0: e } });
        },
        c = [];
    },
    "49a7": function (t, e, a) {
      "use strict";
      a.r(e);
      var i = a("14b2"),
        c = a("c169");
      for (var n in c)
        ["default"].indexOf(n) < 0 &&
          (function (t) {
            a.d(e, t, function () {
              return c[t];
            });
          })(n);
      a("583a");
      var s = a("f0c5"),
        o = Object(s.a)(
          c.default,
          i.b,
          i.c,
          !1,
          null,
          "3fd38838",
          null,
          !1,
          i.a,
          void 0
        );
      e.default = o.exports;
    },
    "583a": function (t, e, a) {
      "use strict";
      var i = a("d303");
      a.n(i).a;
    },
    bdd5: function (t, e, a) {
      "use strict";
      (function (t) {
        var i = a("4ea4");
        Object.defineProperty(e, "__esModule", { value: !0 }),
          (e.default = void 0);
        var c = i(a("2309")),
          n = a("ca00"),
          s = {
            1: "堂食",
            2: "堂食",
            3: "自提",
            4: "聚合外卖",
            5: "甄选商城",
            6: "堂食",
            7: "堂食",
          },
          o = {
            name: "ticketItem2",
            context: "CD",
            props: {
              ticketUseType: { type: String, default: "" },
              ticketData: { type: Object, default: {} },
              noDetail: { type: Boolean, default: !1 },
              noDate: { type: Boolean, default: !1 },
              openSelection: { type: Boolean, default: !1 },
              choice: { type: Boolean, default: !1 },
              customWidth: { type: Number, default: 690 },
            },
            data: function () {
              return {
                ticketdetailInfo: null,
                redTips: !1,
                showDetailFlg: !1,
                timeRage: "",
                showPriceAreaFlg: !0,
                unUsefulNumInfo: "",
                themeColor: "",
                btnTextColor: "",
                useRulesFlg: !0,
              };
            },
            computed: {
              headPic: function () {
                var t = this.ticketData.headPic;
                return (
                  t &&
                    -1 != t.indexOf("childPagesSet_morenquan_1670382376601") &&
                    (t = ""),
                  t ||
                    (5 == this.ticketData.ticketType
                      ? "https://cdnpic.wuuxiang.com/msgjDecorationImg/freePic.png"
                      : "https://cdnpic.wuuxiang.com/msgjDecorationImg/quanHeadNew.png")
                );
              },
              headPicStyle: function () {
                var t = (0, n.getScreenScale4Px)(
                  (180 / 690) * this.customWidth
                );
                return "width: ".concat(t, "px; height: ").concat(t, "px");
              },
              tipStyle: function () {
                var t = { class: "", name: "" };
                switch (parseInt(this.ticketData.type)) {
                  case 1:
                    t.name = "代金券";
                    break;
                  case 2:
                    t.name = "折扣券";
                    break;
                  case 3:
                    t.name = "商品券";
                    break;
                  case 4:
                    t.name = "赠品券";
                    break;
                  case 5:
                    t.name = "配送券";
                    break;
                  default:
                    t.name = "";
                }
                return t;
              },
            },
            filters: {
              price: function (t) {
                return "0" == t || "0.00" == t ? "免配送费" : "券后价格";
              },
            },
            created: function () {
              (this.themeColor = c.default.getDecorate("CD").themeColor),
                (this.btnTextColor = c.default.getDecorate("CD").btnTextColor);
              var t = c.default
                .getDecorate("CD")
                .getValidValue("childPagesSet")("couponDecoration")();
              if (
                ((this.useRulesFlg =
                  !t.hasOwnProperty("useRulesFlg") || t.useRulesFlg),
                this.checkTime(),
                this.showPriceArea(),
                "unUseful" == this.ticketUseType)
              ) {
                var e = [];
                this.ticketData.usedNum > 0 &&
                  e.push("已使用" + this.ticketData.usedNum + "张"),
                  this.ticketData.overdueNum > 0 &&
                    e.push("已过期" + this.ticketData.overdueNum + "张"),
                  this.ticketData.givingSuccessNum > 0 &&
                    e.push("已转赠" + this.ticketData.givingSuccessNum + "张"),
                  this.ticketData.lockNum > 0 &&
                    e.push("使用中" + this.ticketData.lockNum + "张"),
                  this.ticketData.givingNum > 0 &&
                    e.push("转赠中" + this.ticketData.givingNum + "张"),
                  (this.unUsefulNumInfo = e.join("、"));
              }
            },
            methods: {
              add: function (t) {
                this.$emit("add", t);
              },
              reduce: function (t) {
                this.$emit("reduce", t);
              },
              showDetail: function () {
                var e = this;
                if (this.showDetailFlg) this.showDetailFlg = !1;
                else {
                  if (this.ticketdetailInfo)
                    return void (this.showDetailFlg = !0);
                  var a = {
                    ticketkindId: this.ticketData.couponId,
                    couponId: this.ticketData.couponId,
                    couponMemberCountId: this.ticketData.id,
                  };
                  c.default
                    .getData({
                      name: "CRMsingleTicket",
                      nameSpace: "CD",
                      params: a,
                    })
                    .then(function (a) {
                      if (
                        200 == (null == a ? void 0 : a.code) &&
                        null != a &&
                        a.content
                      ) {
                        var i = JSON.parse(a.content),
                          c = {},
                          n = e.ticketData.startDate.replace(/-/g, ".");
                        n = n.substr(0, n.length - 3);
                        var o = e.ticketData.endDate.replace(/-/g, ".");
                        (o = o.substr(0, o.length - 3)),
                          (c.timeRange = "".concat(n, " - ").concat(o));
                        var r = "";
                        e.ticketData.threshold &&
                          Number(e.ticketData.threshold) &&
                          (r += "消费满".concat(
                            e.ticketData.threshold,
                            "元可用；"
                          )),
                          i.frequencyMoney &&
                            Number(i.frequencyMoney) &&
                            (r += "每消费满".concat(
                              i.frequencyMoney,
                              "元，可使用一张；"
                            )),
                          (1 != i.frequencyType && 2 != i.frequencyType) ||
                            (r += "部分商品可用；"),
                          (c.useThreshold = r);
                        var u = i.times,
                          h = i.weeks,
                          l = "";
                        if (h && h.length > 0) {
                          var p = [];
                          h.forEach(function (t, e) {
                            e == h.length - 1
                              ? 0 == e
                                ? p.push("每个" + t.weekNameCN)
                                : p.push(t.weekNameCN)
                              : 0 == e
                              ? p.push("每个" + t.weekNameCN + "、")
                              : p.push(t.weekNameCN + "、");
                          }),
                            (l += p.join(""));
                        }
                        if (u && u.length > 0) {
                          var d = [];
                          u.forEach(function (t, e) {
                            var a = t.startTime.split(" ")[1];
                            a = a.substr(0, a.length - 3);
                            var i = t.endTime.split(" ")[1];
                            i = i.substr(0, i.length - 3);
                            var c = null;
                            e == u.length - 1
                              ? ((c = "".concat(a, " - ").concat(i)), d.push(c))
                              : ((c = "".concat(a, " - ").concat(i, "、")),
                                d.push(c));
                          }),
                            (l += d.join(""));
                        }
                        if (
                          (l && (c.applicableTime = "有效期内" + l + "可用"),
                          i.scenarioIds && i.scenarioIds.length < 7)
                        ) {
                          var D = [];
                          i.scenarioIds.forEach(function (t) {
                            -1 == D.indexOf(s[t]) && D.push(s[t]);
                          }),
                            (c.sceneTxt = D.join("、"));
                        }
                        if (i.unValidDate && i.unValidDate.length > 0) {
                          var f = [];
                          i.unValidDate.forEach(function (t) {
                            var e = t.beginTime;
                            e = e.substr(0, e.length - 3);
                            var a = t.endTime;
                            (a = a.substr(0, a.length - 3)),
                              f.push("".concat(e, "至").concat(a));
                          }),
                            (c.usageRestrictions = f.join("、"));
                        }
                        console.log("--------90909????????");
                        var k = [];
                        i.maxAmountPerTime &&
                          k.push(
                            "本券一次性最多可使用" + i.maxAmountPerTime + "张"
                          ),
                          i.maxAmountSameType &&
                            k.push(
                              "同类型券一次性最多使用" +
                                i.maxAmountSameType +
                                "张"
                            ),
                          i.maxAmountOneDayTime &&
                            k.push(
                              "本券每日最多使用" + i.maxAmountOneDayTime + "张"
                            ),
                          (c.useCounts = k.join("；")),
                          (e.ticketdetailInfo = c),
                          (e.showDetailFlg = !0);
                      } else t.showToast({ title: a.msg, duration: 2e3, icon: "none" });
                    });
                }
              },
              checkTime: function () {
                if (this.noDate) return "";
                var t = "";
                if ("resource" == this.ticketUseType)
                  if (0 == this.ticketData.expiryType) {
                    var e = this.ticketData.expiryStart.substring(
                        0,
                        this.ticketData.expiryStart.length - 3
                      ),
                      a = this.ticketData.expiryEnd.substring(
                        0,
                        this.ticketData.expiryEnd.length - 3
                      );
                    t = ""
                      .concat(e.replace(/-/g, "."), " - ")
                      .concat(a.replace(/-/g, "."));
                  } else
                    1 == this.ticketData.expiryType
                      ? (t =
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
                                .concat(this.ticketData.expiryDays, "天"))
                      : 2 == this.ticketData.expiryType
                      ? (t =
                          1 == this.ticketData.afterType
                            ? "领取后"
                                .concat(
                                  0 == this.ticketData.afterHours
                                    ? "立即"
                                    : this.ticketData.afterHours + "小时",
                                  "生效，有效期截止到"
                                )
                                .concat(
                                  this.ticketData.expiryEnd
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
                                  this.ticketData.expiryEnd
                                    .slice(0, 16)
                                    .replace(/-/g, ".")
                                ))
                      : 3 == this.ticketData.expiryType && (t = "当月领取有效");
                else if ("unExpired" == this.ticketUseType) {
                  var i = this.ticketData.startDate.replace(/-/g, ".");
                  (t = i.substr(0, i.length - 3)), (t = "".concat(t, "生效"));
                } else {
                  var c = new Date().toLocaleDateString().replace(/\//g, "-"),
                    s = (0, n.getDaysBetween)(
                      c,
                      this.ticketData.endDate.split(" ")[0]
                    ),
                    o = null;
                  0 == s
                    ? (o = "今天")
                    : 1 == s
                    ? (o = "明天")
                    : 2 == s && (o = "后天"),
                    o
                      ? ((this.redTips = !0),
                        (t = ""
                          .concat(o)
                          .concat(
                            (0, n.formatDate)(
                              this.ticketData.endDate.replace(/\./g, "/"),
                              "hh:mm"
                            ),
                            "到期"
                          )))
                      : (t = "有效期至".concat(
                          (0, n.formatDate)(
                            this.ticketData.endDate.replace(/\./g, "/"),
                            "yyyy.MM.dd hh:mm"
                          )
                        ));
                }
                this.timeRage = t;
              },
              showPriceArea: function () {
                var t = !0;
                this.ticketData &&
                  (1 == this.ticketData.type
                    ? 1 == this.ticketData.valueType ||
                      ("0" != this.ticketData.value && this.ticketData.value) ||
                      (t = !1)
                    : 2 == this.ticketData.type
                    ? (this.ticketData.value &&
                        "0" != this.ticketData.value &&
                        "10" != this.ticketData.value) ||
                      (t = !1)
                    : 3 == this.ticketData.type
                    ? 1 == this.ticketData.deductValueType ||
                      ("0" != this.ticketData.value && this.ticketData.value) ||
                      (t = !1)
                    : 4 == this.ticketData.type
                    ? (t = !1)
                    : 5 == this.ticketData.type &&
                      (1 == this.ticketData.deductValueType ||
                        (this.ticketData.value &&
                          "0" != this.ticketData.value &&
                          "0.00" != this.ticketData.value) ||
                        (t = !1))),
                  (this.showPriceAreaFlg = t);
              },
            },
          };
        e.default = o;
      }).call(this, a("543d").default);
    },
    c169: function (t, e, a) {
      "use strict";
      a.r(e);
      var i = a("bdd5"),
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
    d303: function (t, e, a) {},
  },
]),
  (global.webpackJsonp = global.webpackJsonp || []).push([
    "baseComponents/ticketItem2/index-create-component",
    {
      "baseComponents/ticketItem2/index-create-component": function (t, e, a) {
        a("543d").createComponent(a("49a7"));
      },
    },
    [["baseComponents/ticketItem2/index-create-component"]],
  ]);
