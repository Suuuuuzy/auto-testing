(global.webpackJsonp = global.webpackJsonp || []).push([
  ["baseComponents/treasureBoxWrap/index"],
  {
    a095: function (t, e, n) {
      "use strict";
      n.r(e);
      var o = n("d1b9"),
        a = n("bd88");
      for (var c in a)
        ["default"].indexOf(c) < 0 &&
          (function (t) {
            n.d(e, t, function () {
              return a[t];
            });
          })(c);
      var r = n("f0c5"),
        u = Object(r.a)(
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
      e.default = u.exports;
    },
    bd88: function (t, e, n) {
      "use strict";
      n.r(e);
      var o = n("ed7f"),
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
    d1b9: function (t, e, n) {
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
    ed7f: function (t, e, n) {
      "use strict";
      var o = n("4ea4");
      Object.defineProperty(e, "__esModule", { value: !0 }),
        (e.default = void 0);
      var a = o(n("2309")),
        c = {
          data: function () {
            return { componentReady: !1, boxState: {} };
          },
          props: { context: { type: String, default: "DC" } },
          components: {
            treasureBoxCommonPackage: function () {
              n.e("pages/treasureBox-commonPackage/index")
                .then(
                  function () {
                    return resolve(n("bc42"));
                  }.bind(null, n)
                )
                .catch(n.oe);
            },
          },
          mounted: function () {
            this.getBoxState();
          },
          methods: {
            close: function () {
              this.getBoxState();
            },
            resetDishConnextStep: function () {
              this.$emit("get");
            },
            getBoxState: function () {
              var t = this,
                e = a.default.getBusState("vipUserInfo", this.context).cardNo,
                n = a.default.getBusState("mcId", this.context);
              a.default
                .getData({
                  name: "getBoxState",
                  nameSpace: "SYSTEM",
                  params: { cardNo: e, mcId: n },
                })
                .then(function (e) {
                  if (0 == e.status) {
                    var n = e.result;
                    (t.boxState = n),
                      1 == n.campaignFlag
                        ? ((t.boxState.openHint =
                            t.boxState.openHint ||
                            "宝箱已开启，您获得以下礼品！"),
                          (t.boxState.notOpenHint =
                            t.boxState.notOpenHint ||
                            "凑齐勋章即可打开神秘礼物噢！"),
                          (t.componentReady = !0))
                        : (t.componentReady = !1);
                  }
                });
            },
          },
        };
      e.default = c;
    },
  },
]),
  (global.webpackJsonp = global.webpackJsonp || []).push([
    "baseComponents/treasureBoxWrap/index-create-component",
    {
      "baseComponents/treasureBoxWrap/index-create-component": function (
        t,
        e,
        n
      ) {
        n("543d").createComponent(n("a095"));
      },
    },
    [["baseComponents/treasureBoxWrap/index-create-component"]],
  ]);
