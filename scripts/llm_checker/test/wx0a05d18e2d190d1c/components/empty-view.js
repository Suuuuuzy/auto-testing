(global.webpackJsonp = global.webpackJsonp || []).push([
  ["components/empty-view"],
  {
    "0d49": function (n, e, t) {
      Object.defineProperty(e, "__esModule", { value: !0 }),
        (e.default = void 0);
      var c = {
        data: function () {
          return { maxHeight: 1080 };
        },
        props: { msg: { type: String, default: "暂无数据" } },
        methods: {
          _clickFun: function () {
            this.$emit("click");
          },
        },
      };
      e.default = c;
    },
    "367b": function (n, e, t) {
      t.r(e);
      var c = t("0d49"),
        o = t.n(c);
      for (var a in c)
        "default" !== a &&
          (function (n) {
            t.d(e, n, function () {
              return c[n];
            });
          })(a);
      e.default = o.a;
    },
    "48ec": function (n, e, t) {
      var c = t("b4df");
      t.n(c).a;
    },
    b4df: function (n, e, t) {},
    c064: function (n, e, t) {
      t.r(e);
      var c = t("c4c9"),
        o = t("367b");
      for (var a in o)
        "default" !== a &&
          (function (n) {
            t.d(e, n, function () {
              return o[n];
            });
          })(a);
      t("48ec");
      var u = t("f0c5"),
        i = Object(u.a)(
          o.default,
          c.b,
          c.c,
          !1,
          null,
          null,
          null,
          !1,
          c.a,
          void 0
        );
      e.default = i.exports;
    },
    c4c9: function (n, e, t) {
      t.d(e, "b", function () {
        return c;
      }),
        t.d(e, "c", function () {
          return o;
        }),
        t.d(e, "a", function () {});
      var c = function () {
          var n = this;
          n.$createElement;
          n._self._c;
        },
        o = [];
    },
  },
]),
  (global.webpackJsonp = global.webpackJsonp || []).push([
    "components/empty-view-create-component",
    {
      "components/empty-view-create-component": function (n, e, t) {
        t("543d").createComponent(t("c064"));
      },
    },
    [["components/empty-view-create-component"]],
  ]);
