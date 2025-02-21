(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
  ["components/privacyPopup"],
  {
    "29fb": function (n, t, e) {
      "use strict";
      e.r(t);
      var o = e("950e"),
        i = e.n(o);
      for (var c in o)
        ["default"].indexOf(c) < 0 &&
          (function (n) {
            e.d(t, n, function () {
              return o[n];
            });
          })(c);
      t["default"] = i.a;
    },
    "42b0": function (n, t, e) {
      "use strict";
      e.r(t);
      var o = e("8300"),
        i = e("29fb");
      for (var c in i)
        ["default"].indexOf(c) < 0 &&
          (function (n) {
            e.d(t, n, function () {
              return i[n];
            });
          })(c);
      e("869f");
      var r = e("828b"),
        u = Object(r["a"])(
          i["default"],
          o["b"],
          o["c"],
          !1,
          null,
          "6222cf54",
          null,
          !1,
          o["a"],
          void 0
        );
      t["default"] = u.exports;
    },
    8300: function (n, t, e) {
      "use strict";
      e.d(t, "b", function () {
        return o;
      }),
        e.d(t, "c", function () {
          return i;
        }),
        e.d(t, "a", function () {});
      var o = function () {
          var n = this.$createElement;
          this._self._c;
        },
        i = [];
    },
    "869f": function (n, t, e) {
      "use strict";
      var o = e("d1c2"),
        i = e.n(o);
      i.a;
    },
    "950e": function (n, t, e) {
      "use strict";
      (function (n) {
        var e, o;
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.default = void 0),
          n.onNeedPrivacyAuthorization &&
            n.onNeedPrivacyAuthorization(function (n) {
              "function" === typeof e && e(n);
            });
        var i = {
          props: {
            comeVerify: { type: Boolean, default: !1 },
            multiple: { type: Number, default: 1 },
          },
          data: function () {
            return { show: !1 };
          },
          methods: {
            handleAgree: function (n) {
              this.disPopUp(), o({ event: "agree", buttonId: "agree-btn" });
            },
            handleDisagree: function (n) {
              this.disPopUp(), o({ event: "disagree" });
            },
            popUp: function () {
              this.show = !0;
            },
            disPopUp: function () {
              this.show = !1;
            },
            openPrivacyContract: function () {
              n.openPrivacyContract({
                success: function (n) {
                  console.log("openPrivacyContract success");
                },
                fail: function (n) {
                  console.error("openPrivacyContract fail", n);
                },
              });
            },
            comeInShow: function () {
              n.getPrivacySetting &&
                n.requirePrivacyAuthorize &&
                n.getPrivacySetting({
                  success: function (t) {
                    t.needAuthorization && n.requirePrivacyAuthorize();
                  },
                  fail: function () {},
                  complete: function () {},
                });
            },
          },
          created: function () {
            var n = this;
            e = function (t) {
              (o = t), n.popUp();
            };
          },
          onLoad: function () {
            this.comeVerify && this.comeInShow();
          },
        };
        t.default = i;
      }).call(this, e("3223")["default"]);
    },
    d1c2: function (n, t, e) {},
  },
]);
(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
  "components/privacyPopup-create-component",
  {
    "components/privacyPopup-create-component": function (
      module,
      exports,
      __webpack_require__
    ) {
      __webpack_require__("df3c")["createComponent"](
        __webpack_require__("42b0")
      );
    },
  },
  [["components/privacyPopup-create-component"]],
]);
