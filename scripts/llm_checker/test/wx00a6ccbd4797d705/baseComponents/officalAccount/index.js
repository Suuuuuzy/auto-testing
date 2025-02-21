(global.webpackJsonp = global.webpackJsonp || []).push([
  ["baseComponents/officalAccount/index"],
  {
    1040: function (t, e, o) {
      "use strict";
      o.r(e);
      var n = o("4eec"),
        c = o.n(n);
      for (var i in n)
        ["default"].indexOf(i) < 0 &&
          (function (t) {
            o.d(e, t, function () {
              return n[t];
            });
          })(i);
      e.default = c.a;
    },
    "4eec": function (t, e, o) {
      "use strict";
      var n = o("4ea4");
      Object.defineProperty(e, "__esModule", { value: !0 }),
        (e.default = void 0);
      var c = o("ca00"),
        i = n(o("2309")),
        a = {
          name: "officalAccount",
          props: {
            context: { type: String, default: "" },
            zIndex: { type: [Number, String], default: 999 },
            type: { type: [Number, String], default: 1 },
            val: { type: [Number, String], default: "" },
            appType: { type: String, default: "MEMBER" },
            customStyle: { type: String, default: "" },
          },
          components: {
            officalAccountOfMini: function () {
              Promise.all([
                o.e("common/vendor"),
                o.e("baseComponents/officalAccount/mini"),
              ])
                .then(
                  function () {
                    return resolve(o("22fa"));
                  }.bind(null, o)
                )
                .catch(o.oe);
            },
            officalAccountOfMini2: function () {
              Promise.all([
                o.e("common/vendor"),
                o.e("baseComponents/officalAccount/mini2"),
              ])
                .then(
                  function () {
                    return resolve(o("b259"));
                  }.bind(null, o)
                )
                .catch(o.oe);
            },
          },
          data: function () {
            return {
              show: !1,
              followPublicAccountStyle: "",
              followPublicAccountTips:
                "欢迎关注我们微信公众号，海量资料任你查！",
            };
          },
          methods: {
            authComplate: function (t) {
              this.$emit("authComplate", t);
            },
            init: function () {
              var t = i.default.getDecorate(this.context);
              if (
                t.decorationData.commonSet.otherSet.followPublicAccountPages
              ) {
                var e = t.decorationData.commonSet.otherSet;
                if (-1 !== e.followPublicAccountPages.indexOf(this.val)) {
                  if (
                    ((this.followPublicAccountStyle =
                      e.followPublicAccountStyle || "1"),
                    (this.followPublicAccountTips =
                      e.followPublicAccountTips ||
                      "欢迎关注我们微信公众号，海量资料任你查！"),
                    2 == this.type)
                  )
                    return void (this.show = !0);
                  if (
                    (0, c.checkOfficial)(
                      i.default.getBusState("officalList", "SYSTEM"),
                      this.val
                    )
                  ) {
                    this.show = !0;
                    var o = i.default.getBusState("officalList", "SYSTEM")
                      ? i.default.getBusState("officalList", "SYSTEM")
                      : [];
                    o.push(this.val),
                      i.default.setBusState("officalList", o, "SYSTEM");
                  } else this.show = !1;
                }
              }
            },
          },
          mounted: function () {},
        };
      e.default = a;
    },
    a463: function (t, e, o) {
      "use strict";
      o.r(e);
      var n = o("eced"),
        c = o("1040");
      for (var i in c)
        ["default"].indexOf(i) < 0 &&
          (function (t) {
            o.d(e, t, function () {
              return c[t];
            });
          })(i);
      var a = o("f0c5"),
        u = Object(a.a)(
          c.default,
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
      e.default = u.exports;
    },
    eced: function (t, e, o) {
      "use strict";
      o.d(e, "b", function () {
        return n;
      }),
        o.d(e, "c", function () {
          return c;
        }),
        o.d(e, "a", function () {});
      var n = function () {
          this.$createElement, this._self._c;
        },
        c = [];
    },
  },
]),
  (global.webpackJsonp = global.webpackJsonp || []).push([
    "baseComponents/officalAccount/index-create-component",
    {
      "baseComponents/officalAccount/index-create-component": function (
        t,
        e,
        o
      ) {
        o("543d").createComponent(o("a463"));
      },
    },
    [["baseComponents/officalAccount/index-create-component"]],
  ]);
