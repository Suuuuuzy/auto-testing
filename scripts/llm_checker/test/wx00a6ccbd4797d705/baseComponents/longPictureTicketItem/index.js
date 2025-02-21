(global.webpackJsonp = global.webpackJsonp || []).push([
  ["baseComponents/longPictureTicketItem/index"],
  {
    2609: function (e, t, a) {},
    "339a": function (e, t, a) {
      "use strict";
      a.r(t);
      var n = a("64bc"),
        i = a.n(n);
      for (var r in n)
        ["default"].indexOf(r) < 0 &&
          (function (e) {
            a.d(t, e, function () {
              return n[e];
            });
          })(r);
      t.default = i.a;
    },
    "64bc": function (e, t, a) {
      "use strict";
      var n = a("4ea4");
      Object.defineProperty(t, "__esModule", { value: !0 }),
        (t.default = void 0);
      var i = n(a("2309")),
        r = a("ca00"),
        s = {
          name: "longPictureTicketItem",
          components: {
            formIdWrap: function () {
              a.e("baseComponents/formIdWrap/wxmp")
                .then(
                  function () {
                    return resolve(a("6946"));
                  }.bind(null, a)
                )
                .catch(a.oe);
            },
          },
          mixins: [],
          props: {
            ticketUseType: { type: String, default: "" },
            showUseBtn: { type: Boolean, default: !1 },
            ticketData: { type: Object },
            openSelection: { type: Boolean, default: !1 },
            choice: { type: Boolean, default: !1 },
            longStatus: { type: Boolean, default: !1 },
            noDetail: { type: Boolean, default: !1 },
            coustomDetail: { type: Boolean, default: !1 },
            shadow: { type: Boolean, default: !1 },
            trueHeight: { type: Number, default: 290 },
            noDate: { type: Boolean, default: !1 },
            tmplIds: { type: Array, default: [] },
          },
          data: function () {
            return {
              color: "",
              bntColor: "",
              unUsefulNumInfo: "",
              redTips: !1,
            };
          },
          filters: {
            price: function (e) {
              return "0" == e || "0.00" == e ? "免配送费" : "券后价格";
            },
          },
          computed: {
            realData: function () {
              var e = {};
              if (this.ticketData) {
                var t = this.ticketData;
                e = JSON.parse(
                  JSON.stringify(t)
                    .replace("ticketendtime", "endDate")
                    .replace("ticketstarttime", "startDate")
                    .replace("kindmoney", "value")
                    .replace("kindEndDay", "expiryEnd")
                );
              }
              return e;
            },
            height001: function () {
              return "".concat(this.trueHeight, "rpx");
            },
            tearTheTicket: function () {
              return this.longStatus;
            },
            timeRage: function () {
              if (this.noDate) return "";
              var e = "",
                t = "";
              if ("unExpired" == this.ticketUseType)
                (t = (e = this.realData.startDate.replace(/-/g, ".")).substr(
                  e.length - 8,
                  5
                )),
                  (e = e.substr(0, e.length - 8)),
                  (t = "".concat(t, "生效"));
              else if ("resource" == this.ticketUseType) {
                if (0 == this.realData.expiryType) {
                  var a = this.realData.startDate.replace(/-/g, "."),
                    n = this.realData.endDate.replace(/-/g, ".");
                  a.length > 12 &&
                    ((a = a.split(" ")[0]), (n = n.split(" ")[0])),
                    (e = "".concat(a, " - ").concat(n));
                }
                1 == this.realData.expiryType &&
                  (e =
                    1 == this.realData.afterType
                      ? "领取后"
                          .concat(
                            0 == this.realData.afterHours
                              ? "立即"
                              : this.realData.afterHours + "小时",
                            "生效，<br/>有效期"
                          )
                          .concat(this.realData.expiryDays, "天")
                      : "领取后"
                          .concat(
                            0 == this.realData.afterDays
                              ? "立即"
                              : this.realData.afterDays + "天",
                            "生效，<br/>有效期"
                          )
                          .concat(this.realData.expiryDays, "天")),
                  2 == this.realData.expiryType &&
                    (e =
                      1 == this.realData.afterType
                        ? "领取后"
                            .concat(
                              0 == this.realData.afterHours
                                ? "立即"
                                : this.realData.afterHours + "小时",
                              "生效，<br/>有效期截止到"
                            )
                            .concat(
                              this.realData.expiryEnd
                                .slice(0, 16)
                                .replace(/-/g, ".")
                            )
                        : "领取后"
                            .concat(
                              0 == this.realData.afterDays
                                ? "立即"
                                : this.realData.afterDays + "天",
                              "生效，<br/>有效期截止到"
                            )
                            .concat(
                              this.realData.expiryEnd
                                .slice(0, 16)
                                .replace(/-/g, ".")
                            )),
                  3 == this.realData.expiryType && (e = "当月领取有效");
              } else {
                var i = new Date().toLocaleDateString().replace(/\//g, "-"),
                  s = (0, r.getDaysBetween)(
                    i,
                    this.realData.endDate.split(" ")[0]
                  ),
                  c = null;
                if (
                  (0 == s
                    ? (c = "今天")
                    : 1 == s
                    ? (c = "明天")
                    : 2 == s && (c = "后天"),
                  c)
                )
                  (this.redTips = !0),
                    (e = ""
                      .concat(c)
                      .concat(
                        (0, r.formatDate)(
                          this.ticketData.endDate.replace(/\./g, "/"),
                          "hh:mm"
                        ),
                        "到期"
                      ));
                else {
                  var o = (e = "".concat(
                    this.realData.endDate.replace(/-/g, ".")
                  )).split(" ");
                  (e = o[0]),
                    (t = o[1].split(":").slice(0, 2).join(":")),
                    (t = "".concat(t, "到期"));
                }
              }
              return { dateStr: e, timeStr: t };
            },
            type: function () {
              var e = { class: "", name: "" };
              switch (parseInt(this.realData.type)) {
                case 1:
                  (e.name = "代金券"), (e.class = "daijin");
                  break;
                case 2:
                  (e.name = "折扣券"), (e.class = "zhekou");
                  break;
                case 3:
                  (e.name = "商品券"), (e.class = "shangpin");
                  break;
                case 4:
                  (e.name = "赠品券"), (e.class = "zengpin");
                  break;
                case 5:
                  (e.name = "配送券"), (e.class = "peisong");
                  break;
                default:
                  (e.name = ""), (e.class = "");
              }
              return e;
            },
          },
          created: function () {
            if (
              ((this.color = i.default.getDecorate("CD").themeColor),
              (this.bntColor = i.default.getDecorate("CD").btnTextColor),
              "unUseful" == this.ticketUseType)
            ) {
              var e = [];
              this.realData.usedNum > 0 &&
                e.push("已使用" + this.realData.usedNum + "张"),
                this.realData.overdueNum > 0 &&
                  e.push("已过期" + this.realData.overdueNum + "张"),
                this.realData.givingSuccessNum > 0 &&
                  e.push("已转赠" + this.realData.givingSuccessNum + "张"),
                this.realData.lockNum > 0 &&
                  e.push("使用中" + this.realData.lockNum + "张"),
                this.realData.givingNum > 0 &&
                  e.push("转赠中" + this.realData.givingNum + "张"),
                (this.unUsefulNumInfo = e.join("、"));
            }
          },
          methods: {
            formIdWrapClick: function () {
              this.$emit("activeRemindPopupShow", this.tmplIds);
            },
            check: function (e) {
              this.$emit("check", e);
            },
            add: function (e) {
              this.$emit("add", e);
            },
            reduce: function (e) {
              this.$emit("reduce", e);
            },
            useNow: function (e) {
              this.$emit("go", e);
            },
            goDetail: function (e) {
              this.noDetail || this.$emit("goDetail", e);
            },
          },
        };
      t.default = s;
    },
    "6c8f": function (e, t, a) {
      "use strict";
      a.r(t);
      var n = a("df90"),
        i = a("339a");
      for (var r in i)
        ["default"].indexOf(r) < 0 &&
          (function (e) {
            a.d(t, e, function () {
              return i[e];
            });
          })(r);
      a("e05d");
      var s = a("f0c5"),
        c = Object(s.a)(
          i.default,
          n.b,
          n.c,
          !1,
          null,
          null,
          null,
          !1,
          n.a,
          void 0
        );
      t.default = c.exports;
    },
    df90: function (e, t, a) {
      "use strict";
      a.d(t, "b", function () {
        return n;
      }),
        a.d(t, "c", function () {
          return i;
        }),
        a.d(t, "a", function () {});
      var n = function () {
          var e = this,
            t =
              (e.$createElement,
              e._self._c,
              1 == e.realData.deductValueType && 5 == e.realData.type
                ? e._f("price")(e.realData.deductToValue)
                : null);
          e.$mp.data = Object.assign({}, { $root: { f0: t } });
        },
        i = [];
    },
    e05d: function (e, t, a) {
      "use strict";
      var n = a("2609");
      a.n(n).a;
    },
  },
]),
  (global.webpackJsonp = global.webpackJsonp || []).push([
    "baseComponents/longPictureTicketItem/index-create-component",
    {
      "baseComponents/longPictureTicketItem/index-create-component": function (
        e,
        t,
        a
      ) {
        a("543d").createComponent(a("6c8f"));
      },
    },
    [["baseComponents/longPictureTicketItem/index-create-component"]],
  ]);
