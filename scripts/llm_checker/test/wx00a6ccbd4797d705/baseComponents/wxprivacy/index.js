(global.webpackJsonp = global.webpackJsonp || []).push([
  ["baseComponents/wxprivacy/index"],
  {
    "0def": function (e, n, t) {
      "use strict";
      var a = t("4ea4");
      Object.defineProperty(n, "__esModule", { value: !0 }),
        (n.default = void 0);
      var o = a(t("2309")),
        i = {
          name: "wxprivacy",
          data: function () {
            return {
              show: !1,
              privacyHandler: null,
              privacyName: "",
              themeColor: "",
              appName: "本",
            };
          },
          components: {
            wxPopup: function () {
              Promise.all([
                t.e("common/vendor"),
                t.e("baseComponents/wxpopup/popup"),
              ])
                .then(
                  function () {
                    return resolve(t("0387"));
                  }.bind(null, t)
                )
                .catch(t.oe);
            },
          },
          created: function () {
            wx.canIUse("onNeedPrivacyAuthorization") &&
              this.privacyAuthorization();
          },
          mounted: function () {
            var e = o.default.getBusState("baseInfo", "SYSTEM").appName;
            e && (this.appName = e);
            var n = o.default.getDecorate("SYSTEM");
            (this.themeColor = n.themeColor), this.bindEvent();
          },
          methods: {
            privacyAuthorization: function () {
              var e = this;
              wx.onNeedPrivacyAuthorization(function (n) {
                (e.privacyHandler = n), e.getPrivacySetting();
              });
            },
            bindEvent: function () {
              var e = this;
              wx.canIUse("onNeedPrivacyAuthorization") &&
                o.default.setPageShow({
                  onNeedPrivacyAuthorization: function () {
                    e.privacyAuthorization();
                  },
                });
            },
            getPrivacySetting: function () {
              var e = this;
              this.privacyName
                ? (this.show = !0)
                : wx.canIUse("getPrivacySetting") &&
                  wx.getPrivacySetting({
                    success: function (n) {
                      n.needAuthorization &&
                        ((e.show = !0),
                        (e.privacyName = n.privacyContractName));
                    },
                  });
            },
            openPrivacyContract: function () {
              wx.openPrivacyContract({
                success: function (e) {
                  console.log("openPrivacyContract success");
                },
                fail: function (e) {
                  console.error("openPrivacyContract fail", e);
                },
              });
            },
            handleDisagree: function () {
              this.privacyHandler({ event: "disagree" }), (this.show = !1);
            },
            handleAgree: function () {
              this.privacyHandler({ event: "agree", buttonId: "agree-btn" }),
                (this.show = !1);
            },
          },
        };
      n.default = i;
    },
    "1e1b": function (e, n, t) {},
    "2f41": function (e, n, t) {
      "use strict";
      t.r(n);
      var a = t("0def"),
        o = t.n(a);
      for (var i in a)
        ["default"].indexOf(i) < 0 &&
          (function (e) {
            t.d(n, e, function () {
              return a[e];
            });
          })(i);
      n.default = o.a;
    },
    3475: function (e, n, t) {
      "use strict";
      t.r(n);
      var a = t("a574"),
        o = t("2f41");
      for (var i in o)
        ["default"].indexOf(i) < 0 &&
          (function (e) {
            t.d(n, e, function () {
              return o[e];
            });
          })(i);
      t("cbd8");
      var c = t("f0c5"),
        r = Object(c.a)(
          o.default,
          a.b,
          a.c,
          !1,
          null,
          "b02788cc",
          null,
          !1,
          a.a,
          void 0
        );
      n.default = r.exports;
    },
    a574: function (e, n, t) {
      "use strict";
      t.d(n, "b", function () {
        return a;
      }),
        t.d(n, "c", function () {
          return o;
        }),
        t.d(n, "a", function () {});
      var a = function () {
          this.$createElement, this._self._c;
        },
        o = [];
    },
    cbd8: function (e, n, t) {
      "use strict";
      var a = t("1e1b");
      t.n(a).a;
    },
  },
]),
  (global.webpackJsonp = global.webpackJsonp || []).push([
    "baseComponents/wxprivacy/index-create-component",
    {
      "baseComponents/wxprivacy/index-create-component": function (e, n, t) {
        t("543d").createComponent(t("3475"));
      },
    },
    [["baseComponents/wxprivacy/index-create-component"]],
  ]);
