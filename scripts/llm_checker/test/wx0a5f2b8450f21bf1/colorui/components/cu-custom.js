(global.webpackJsonp = global.webpackJsonp || []).push([
  ["colorui/components/cu-custom"],
  {
    b002: function (t, n, o) {
      (function (t) {
        Object.defineProperty(n, "__esModule", { value: !0 }),
          (n.default = void 0);
        var o = {
          data: function () {
            return { StatusBar: this.StatusBar, CustomBar: this.CustomBar };
          },
          name: "cu-custom",
          computed: {
            style: function () {
              var t = this.StatusBar,
                n = this.CustomBar,
                o = this.bgImage,
                a = "height:".concat(n, "px;padding-top:").concat(t, "px;");
              return (
                this.bgImage &&
                  (a = "".concat(a, "background-image:url(").concat(o, ");")),
                a
              );
            },
          },
          props: {
            bgColor: { type: String, default: "" },
            isBack: { type: [Boolean, String], default: !1 },
            bgImage: { type: String, default: "" },
          },
          methods: {
            BackPage: function () {
              t.navigateBack({ delta: 1 });
            },
          },
        };
        n.default = o;
      }).call(this, o("543d").default);
    },
    d25a: function (t, n, o) {
      o.r(n);
      var a = o("b002"),
        c = o.n(a);
      for (var e in a)
        "default" !== e &&
          (function (t) {
            o.d(n, t, function () {
              return a[t];
            });
          })(e);
      n.default = c.a;
    },
    da8f: function (t, n, o) {
      var a = function () {
          this.$createElement, this._self._c;
        },
        c = [];
      o.d(n, "b", function () {
        return a;
      }),
        o.d(n, "c", function () {
          return c;
        }),
        o.d(n, "a", function () {});
    },
    f9fc: function (t, n, o) {
      o.r(n);
      var a = o("da8f"),
        c = o("d25a");
      for (var e in c)
        "default" !== e &&
          (function (t) {
            o.d(n, t, function () {
              return c[t];
            });
          })(e);
      var u = o("f0c5"),
        r = Object(u.a)(
          c.default,
          a.b,
          a.c,
          !1,
          null,
          null,
          null,
          !1,
          a.a,
          void 0
        );
      n.default = r.exports;
    },
  },
]),
  (global.webpackJsonp = global.webpackJsonp || []).push([
    "colorui/components/cu-custom-create-component",
    {
      "colorui/components/cu-custom-create-component": function (t, n, o) {
        o("543d").createComponent(o("f9fc"));
      },
    },
    [["colorui/components/cu-custom-create-component"]],
  ]);
