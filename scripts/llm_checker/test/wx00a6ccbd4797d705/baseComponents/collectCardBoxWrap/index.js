(global.webpackJsonp = global.webpackJsonp || []).push([
  ["baseComponents/collectCardBoxWrap/index"],
  {
    "19f5": function (t, e, n) {
      "use strict";
      n.r(e);
      var o = n("8518"),
        a = n.n(o);
      for (var c in o)
        ["default"].indexOf(c) < 0 &&
          (function (t) {
            n.d(e, t, function () {
              return o[t];
            });
          })(c);
      e.default = a.a;
    },
    8518: function (t, e, n) {
      "use strict";
      var o = n("4ea4");
      Object.defineProperty(e, "__esModule", { value: !0 }),
        (e.default = void 0);
      var a = o(n("2309")),
        c = {
          data: function () {
            return {
              show: !1,
              request: null,
              componentReady: !1,
              BoxState: { campaignFlag: "0", openFlag: "0" },
              maxCollect: {},
            };
          },
          components: {
            collectcardboxCommonpackage: function () {
              n.e("pages/collectCardBox-commonPackage/index")
                .then(
                  function () {
                    return resolve(n("d8ed"));
                  }.bind(null, n)
                )
                .catch(n.oe);
            },
          },
          props: {
            needIcon: { type: Boolean, default: !0 },
            collectItem: {
              type: Object,
              default: function () {
                return {};
              },
            },
            context: {
              type: String,
              default: function () {
                return "CD";
              },
            },
            cardNo: {
              type: String,
              default: function () {
                return "";
              },
            },
          },
          created: function () {
            "CD" == this.context && this.initCollect();
          },
          methods: {
            init: function () {
              if ("CD" == this.context && this.BoxState.openFlag) {
                var t = this.BoxState;
                (t.cardNo = this.cardNo),
                  this.$refs.collectcardboxCommonpackage.onlyGetTicket(t);
              }
            },
            close: function () {
              this.initCollect();
            },
            resetDishConnextStep: function () {
              this.$emit("refresh", "stop");
            },
            getMaxCollect: function (t) {
              var e = t.medalInfo,
                n = e[0],
                o = [],
                a = [];
              if (e.length > 1) {
                e.forEach(function (t) {
                  o.push(Number(t.hasCount)), a.push(Number(t.hasCount));
                }),
                  a.sort();
                for (
                  var c = a.length - 1, i = o.indexOf(a[c]);
                  e[i].hasCount >= e[i].needCount && c > 0;

                )
                  c--, (i = o.indexOf(a[c]));
                n = e[i];
              }
              return n;
            },
            initCollect: function () {
              var t = this,
                e = this;
              return new Promise(function (n, o) {
                t.getBoxState(function (o) {
                  if (o) {
                    1 != o.openFlag && (e.maxCollect = e.getMaxCollect(o)),
                      (o.campaignFlag = 1);
                    var c = [];
                    o.medalInfo.forEach(function (t) {
                      c.push(t.medalId);
                    }),
                      a.default.setBusState(
                        "openIconUrl",
                        o.openIconUrl,
                        t.context
                      ),
                      a.default.setBusState("medalIdList", c, t.context),
                      a.default
                        .getData({
                          name: "getGainStartMedal",
                          nameSpace: "CD",
                          params: {
                            token: a.default.getBusState("token", "SYSTEM"),
                            campaignId: o.campaignId,
                            memberId: a.default.getBusState("sysUser", "SYSTEM")
                              .memberId,
                            cardNo: t.cardNo
                              ? t.cardNo
                              : a.default.getBusState("vipUserInfo", t.context)
                                  .cardNo,
                          },
                        })
                        .then(function (e) {
                          var n = 0;
                          if (e.content) {
                            var o = JSON.parse(e.content);
                            o.forEach(function (t) {
                              n += t.prizeCount;
                            }),
                              a.default.setBusState("giveCollectIcon", o, "CD");
                          }
                          n > 0 && t.$emit("giveCollectCard");
                        });
                  }
                  n();
                });
              });
            },
            getBoxState: function (t) {
              var e = this;
              a.default
                .getData({
                  name: "getCurrentInfo",
                  nameSpace: "SYSTEM",
                  params: {
                    mcId: a.default.getBusState("mcId", this.context),
                    cardNo: this.cardNo
                      ? this.cardNo
                      : a.default.getBusState("vipUserInfo", this.context)
                          .cardNo,
                    campaignIdList: this.collectItem.campaignId
                      ? [this.collectItem.campaignId]
                      : [],
                  },
                })
                .then(function (n) {
                  0 == n.status && n.result.length > 0
                    ? ((e.BoxState = n.result[0]),
                      (e.notOpenHint =
                        e.BoxState.notOpenHint ||
                        "凑齐勋章即可打开神秘礼物噢！"),
                      (e.openHint =
                        e.BoxState.openHint || "宝箱已开启，您获得以下礼品！"),
                      t && (t(e.BoxState), (e.componentReady = !0)))
                    : (t(!1),
                      (e.BoxState.campaignFlag = 0),
                      (e.BoxState.openFlag = 0));
                });
            },
          },
        };
      e.default = c;
    },
    ea1f: function (t, e, n) {
      "use strict";
      n.r(e);
      var o = n("f8be"),
        a = n("19f5");
      for (var c in a)
        ["default"].indexOf(c) < 0 &&
          (function (t) {
            n.d(e, t, function () {
              return a[t];
            });
          })(c);
      var i = n("f0c5"),
        r = Object(i.a)(
          a.default,
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
      e.default = r.exports;
    },
    f8be: function (t, e, n) {
      "use strict";
      n.d(e, "b", function () {
        return o;
      }),
        n.d(e, "c", function () {
          return a;
        }),
        n.d(e, "a", function () {});
      var o = function () {
          this.$createElement, this._self._c;
        },
        a = [];
    },
  },
]),
  (global.webpackJsonp = global.webpackJsonp || []).push([
    "baseComponents/collectCardBoxWrap/index-create-component",
    {
      "baseComponents/collectCardBoxWrap/index-create-component": function (
        t,
        e,
        n
      ) {
        n("543d").createComponent(n("ea1f"));
      },
    },
    [["baseComponents/collectCardBoxWrap/index-create-component"]],
  ]);
