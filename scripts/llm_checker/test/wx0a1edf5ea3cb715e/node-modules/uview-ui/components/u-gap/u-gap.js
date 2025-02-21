(global.webpackJsonp = global.webpackJsonp || []).push([
  ["node-modules/uview-ui/components/u-gap/u-gap"],
  {
    "2f7b": function (e, t, n) {
      n.r(t);
      var o = n("ce50"),
        a = n("8a2e");
      for (var u in a)
        ["default"].indexOf(u) < 0 &&
          (function (e) {
            n.d(t, e, function () {
              return a[e];
            });
          })(u);
      n("a061");
      var r = n("f0c5"),
        i = Object(r.a)(
          a.default,
          o.b,
          o.c,
          !1,
          null,
          "156b108e",
          null,
          !1,
          o.a,
          void 0
        );
      t.default = i.exports;
    },
    "8a2e": function (e, t, n) {
      n.r(t);
      var o = n("c118"),
        a = n.n(o);
      for (var u in o)
        ["default"].indexOf(u) < 0 &&
          (function (e) {
            n.d(t, e, function () {
              return o[e];
            });
          })(u);
      t.default = a.a;
    },
    a061: function (e, t, n) {
      var o = n("e4a1");
      n.n(o).a;
    },
    c118: function (e, t, n) {
      Object.defineProperty(t, "__esModule", { value: !0 }),
        (t.default = void 0);
      var o = {
        name: "u-gap",
        props: {
          bgColor: { type: String, default: "transparent " },
          height: { type: [String, Number], default: 30 },
          marginTop: { type: [String, Number], default: 0 },
          marginBottom: { type: [String, Number], default: 0 },
        },
        computed: {
          gapStyle: function () {
            return {
              backgroundColor: this.bgColor,
              height: this.height + "rpx",
              marginTop: this.marginTop + "rpx",
              marginBottom: this.marginBottom + "rpx",
            };
          },
        },
      };
      t.default = o;
    },
    ce50: function (e, t, n) {
      n.d(t, "b", function () {
        return o;
      }),
        n.d(t, "c", function () {
          return a;
        }),
        n.d(t, "a", function () {});
      var o = function () {
          this.$createElement;
          var e = (this._self._c, this.__get_style([this.gapStyle]));
          this.$mp.data = Object.assign({}, { $root: { s0: e } });
        },
        a = [];
    },
    e4a1: function (e, t, n) {},
  },
]),
  (global.webpackJsonp = global.webpackJsonp || []).push([
    "node-modules/uview-ui/components/u-gap/u-gap-create-component",
    {
      "node-modules/uview-ui/components/u-gap/u-gap-create-component":
        function (e, t, n) {
          n("543d").createComponent(n("2f7b"));
        },
    },
    [["node-modules/uview-ui/components/u-gap/u-gap-create-component"]],
  ]);
