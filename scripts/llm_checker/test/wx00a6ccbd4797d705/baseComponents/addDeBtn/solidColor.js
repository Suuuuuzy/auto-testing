(global.webpackJsonp = global.webpackJsonp || []).push([
  ["baseComponents/addDeBtn/solidColor"],
  {
    "014d": function (e, n, t) {
      "use strict";
      t.r(n);
      var a = t("afac"),
        o = t("e61a");
      for (var c in o)
        ["default"].indexOf(c) < 0 &&
          (function (e) {
            t.d(n, e, function () {
              return o[e];
            });
          })(c);
      t("287c");
      var s = t("f0c5"),
        r = Object(s.a)(
          o.default,
          a.b,
          a.c,
          !1,
          null,
          "bc32e68a",
          null,
          !1,
          a.a,
          void 0
        );
      n.default = r.exports;
    },
    "287c": function (e, n, t) {
      "use strict";
      var a = t("2a12");
      t.n(a).a;
    },
    "2a12": function (e, n, t) {},
    aa20: function (e, n, t) {
      "use strict";
      var a = t("4ea4");
      Object.defineProperty(n, "__esModule", { value: !0 }),
        (n.default = void 0);
      var o = {
        name: "AddDeBtnSolidColor",
        components: {
          inputNum: function () {
            t.e("baseComponents/addDeBtn/inputNum")
              .then(
                function () {
                  return resolve(t("ae35"));
                }.bind(null, t)
              )
              .catch(t.oe);
          },
        },
        mixins: [a(t("a953")).default],
        props: {
          color: { type: String, default: "#fff" },
          customClass: { type: String, default: "" },
          alignment: { type: String, default: "left" },
        },
        computed: {
          _class: function () {
            var e = "flex-jc-fs";
            switch (this.alignment) {
              case "left":
                e = "flex-jc-fs";
                break;
              case "center":
                e = "flex-jc-c";
                break;
              case "right":
                e = "flex-jc-fe";
            }
            return e + "" + this.customClass;
          },
        },
      };
      n.default = o;
    },
    afac: function (e, n, t) {
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
    e61a: function (e, n, t) {
      "use strict";
      t.r(n);
      var a = t("aa20"),
        o = t.n(a);
      for (var c in a)
        ["default"].indexOf(c) < 0 &&
          (function (e) {
            t.d(n, e, function () {
              return a[e];
            });
          })(c);
      n.default = o.a;
    },
  },
]),
  (global.webpackJsonp = global.webpackJsonp || []).push([
    "baseComponents/addDeBtn/solidColor-create-component",
    {
      "baseComponents/addDeBtn/solidColor-create-component": function (
        e,
        n,
        t
      ) {
        t("543d").createComponent(t("014d"));
      },
    },
    [["baseComponents/addDeBtn/solidColor-create-component"]],
  ]);
