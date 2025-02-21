(global.webpackJsonp = global.webpackJsonp || []).push([
  ["baseComponents/waidaiWrap/index"],
  {
    3140: function (n, e, i) {
      "use strict";
      i.d(e, "b", function () {
        return t;
      }),
        i.d(e, "c", function () {
          return a;
        }),
        i.d(e, "a", function () {});
      var t = function () {
          this.$createElement, this._self._c;
        },
        a = [];
    },
    4621: function (n, e, i) {},
    "470ab": function (n, e, i) {
      "use strict";
      var t = i("a0b2");
      i.n(t).a;
    },
    "8d01": function (n, e, i) {
      "use strict";
      i.r(e);
      var t = i("beda"),
        a = i.n(t);
      for (var o in t)
        ["default"].indexOf(o) < 0 &&
          (function (n) {
            i.d(e, n, function () {
              return t[n];
            });
          })(o);
      e.default = a.a;
    },
    "8e1b": function (n, e, i) {
      "use strict";
      var t = i("4621");
      i.n(t).a;
    },
    a0b2: function (n, e, i) {},
    beda: function (n, e, i) {
      "use strict";
      Object.defineProperty(e, "__esModule", { value: !0 }),
        (e.default = void 0);
      var t = {
        name: "waidaiWrap",
        props: ["initobj"],
        data: function () {
          return { waiDaiFlg: 0, dianMode: "", mode: "ts", themeColor: "" };
        },
        created: function () {
          console.log("waidaiwaidai", this.initobj),
            (this.waiDaiFlg = this.initobj.waiDaiFlg),
            (this.mode = this.initobj.mode),
            (this.themeColor = this.initobj.themeColor);
        },
        methods: {
          changeWaiDaiFlg: function (n) {
            (this.waiDaiFlg = n), this.$emit("changeWaidai", n);
          },
        },
      };
      e.default = t;
    },
    bf9e: function (n, e, i) {
      "use strict";
      i.r(e);
      var t = i("3140"),
        a = i("8d01");
      for (var o in a)
        ["default"].indexOf(o) < 0 &&
          (function (n) {
            i.d(e, n, function () {
              return a[n];
            });
          })(o);
      i("470ab"), i("8e1b");
      var c = i("f0c5"),
        r = Object(c.a)(
          a.default,
          t.b,
          t.c,
          !1,
          null,
          "c8580df0",
          null,
          !1,
          t.a,
          void 0
        );
      e.default = r.exports;
    },
  },
]),
  (global.webpackJsonp = global.webpackJsonp || []).push([
    "baseComponents/waidaiWrap/index-create-component",
    {
      "baseComponents/waidaiWrap/index-create-component": function (n, e, i) {
        i("543d").createComponent(i("bf9e"));
      },
    },
    [["baseComponents/waidaiWrap/index-create-component"]],
  ]);
