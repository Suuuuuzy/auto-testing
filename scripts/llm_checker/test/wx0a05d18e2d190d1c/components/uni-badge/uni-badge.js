(global.webpackJsonp = global.webpackJsonp || []).push([
  ["components/uni-badge/uni-badge"],
  {
    "4f4c": function (e, t, n) {
      var a = n("e1ae");
      n.n(a).a;
    },
    "5b1e": function (e, t, n) {
      n.r(t);
      var a = n("b470"),
        o = n.n(a);
      for (var u in a)
        "default" !== u &&
          (function (e) {
            n.d(t, e, function () {
              return a[e];
            });
          })(u);
      t.default = o.a;
    },
    b470: function (e, t, n) {
      Object.defineProperty(t, "__esModule", { value: !0 }),
        (t.default = void 0);
      var a = {
        name: "UniBadge",
        props: {
          type: { type: String, default: "default" },
          inverted: { type: Boolean, default: !1 },
          text: { type: [String, Number], default: "" },
          size: { type: String, default: "normal" },
        },
        data: function () {
          return { badgeStyle: "" };
        },
        watch: {
          text: function () {
            this.setStyle();
          },
        },
        mounted: function () {
          this.setStyle();
        },
        methods: {
          setStyle: function () {
            this.badgeStyle = "width: ".concat(
              8 * String(this.text).length + 12,
              "px"
            );
          },
          onClick: function () {
            this.$emit("click");
          },
        },
      };
      t.default = a;
    },
    b806: function (e, t, n) {
      n.r(t);
      var a = n("f9f6"),
        o = n("5b1e");
      for (var u in o)
        "default" !== u &&
          (function (e) {
            n.d(t, e, function () {
              return o[e];
            });
          })(u);
      n("4f4c");
      var c = n("f0c5"),
        i = Object(c.a)(
          o.default,
          a.b,
          a.c,
          !1,
          null,
          "967f4f64",
          null,
          !1,
          a.a,
          void 0
        );
      t.default = i.exports;
    },
    e1ae: function (e, t, n) {},
    f9f6: function (e, t, n) {
      n.d(t, "b", function () {
        return a;
      }),
        n.d(t, "c", function () {
          return o;
        }),
        n.d(t, "a", function () {});
      var a = function () {
          var e = this;
          e.$createElement;
          e._self._c;
        },
        o = [];
    },
  },
]),
  (global.webpackJsonp = global.webpackJsonp || []).push([
    "components/uni-badge/uni-badge-create-component",
    {
      "components/uni-badge/uni-badge-create-component": function (e, t, n) {
        n("543d").createComponent(n("b806"));
      },
    },
    [["components/uni-badge/uni-badge-create-component"]],
  ]);
