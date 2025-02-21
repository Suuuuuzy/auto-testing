(global.webpackJsonp = global.webpackJsonp || []).push([
  ["components/uni-icons/uni-icons"],
  {
    "2a08": function (n, t, e) {
      var o = e("a22a");
      e.n(o).a;
    },
    "3b37": function (n, t, e) {
      e.r(t);
      var o = e("7739"),
        c = e("b203");
      for (var u in c)
        "default" !== u &&
          (function (n) {
            e.d(t, n, function () {
              return c[n];
            });
          })(u);
      e("2a08");
      var i = e("f0c5"),
        a = Object(i.a)(
          c.default,
          o.b,
          o.c,
          !1,
          null,
          "72b11afe",
          null,
          !1,
          o.a,
          void 0
        );
      t.default = a.exports;
    },
    7739: function (n, t, e) {
      e.d(t, "b", function () {
        return o;
      }),
        e.d(t, "c", function () {
          return c;
        }),
        e.d(t, "a", function () {});
      var o = function () {
          var n = this;
          n.$createElement;
          n._self._c;
        },
        c = [];
    },
    9031: function (n, t, e) {
      Object.defineProperty(t, "__esModule", { value: !0 }),
        (t.default = void 0);
      var o = (function (n) {
          return n && n.__esModule ? n : { default: n };
        })(e("b50f")),
        c = {
          name: "UniIcons",
          props: {
            type: { type: String, default: "" },
            color: { type: String, default: "#333333" },
            size: { type: [Number, String], default: 16 },
          },
          data: function () {
            return { icons: o.default };
          },
          methods: {
            _onClick: function () {
              this.$emit("click");
            },
          },
        };
      t.default = c;
    },
    a22a: function (n, t, e) {},
    b203: function (n, t, e) {
      e.r(t);
      var o = e("9031"),
        c = e.n(o);
      for (var u in o)
        "default" !== u &&
          (function (n) {
            e.d(t, n, function () {
              return o[n];
            });
          })(u);
      t.default = c.a;
    },
  },
]),
  (global.webpackJsonp = global.webpackJsonp || []).push([
    "components/uni-icons/uni-icons-create-component",
    {
      "components/uni-icons/uni-icons-create-component": function (n, t, e) {
        e("543d").createComponent(e("3b37"));
      },
    },
    [["components/uni-icons/uni-icons-create-component"]],
  ]);
