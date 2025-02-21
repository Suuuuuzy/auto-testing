(global.webpackJsonp = global.webpackJsonp || []).push([
  ["components/Avatar"],
  {
    "0e52": function (e, t, n) {
      n.d(t, "b", function () {
        return i;
      }),
        n.d(t, "c", function () {
          return u;
        }),
        n.d(t, "a", function () {
          return a;
        });
      var a = {
          uImage: function () {
            return n
              .e("node-modules/uview-ui/components/u-image/u-image")
              .then(n.bind(null, "7dc8"));
          },
        },
        i = function () {
          this.$createElement;
          this._self._c;
        },
        u = [];
    },
    "39e9": function (e, t, n) {
      Object.defineProperty(t, "__esModule", { value: !0 }),
        (t.default = void 0);
      var a = n("c9b4"),
        i = {
          props: {
            avatarSize: { default: 0, type: Number },
            detail: { default: !1, type: Boolean },
            uid: { default: "", type: Number },
            src: { default: "", type: String },
            size: { default: 140, type: Number },
            vipLevel: { default: -1, type: Number },
          },
          computed: {
            avaurl: function () {
              return (0, a.filterUrl)(this.src, this.avaSize, this.avaSize);
            },
            avaSize: function () {
              return this.vipLevel > 2
                ? this.avatarSize
                  ? this.avatarSize
                  : this.size - 25
                : this.size;
            },
          },
          methods: {
            jumpDetail: function () {
              this.detail &&
                this.handleNavigater(
                  "/pages/user/details/index?id=".concat(this.uid)
                );
            },
          },
        };
      t.default = i;
    },
    "54d9": function (e, t, n) {
      n.r(t);
      var a = n("39e9"),
        i = n.n(a);
      for (var u in a)
        ["default"].indexOf(u) < 0 &&
          (function (e) {
            n.d(t, e, function () {
              return a[e];
            });
          })(u);
      t.default = i.a;
    },
    "87bc": function (e, t, n) {
      var a = n("ede1");
      n.n(a).a;
    },
    "8e59": function (e, t, n) {
      n.r(t);
      var a = n("0e52"),
        i = n("54d9");
      for (var u in i)
        ["default"].indexOf(u) < 0 &&
          (function (e) {
            n.d(t, e, function () {
              return i[e];
            });
          })(u);
      n("87bc");
      var o = n("f0c5"),
        r = Object(o.a)(
          i.default,
          a.b,
          a.c,
          !1,
          null,
          "3cc12467",
          null,
          !1,
          a.a,
          void 0
        );
      t.default = r.exports;
    },
    ede1: function (e, t, n) {},
  },
]),
  (global.webpackJsonp = global.webpackJsonp || []).push([
    "components/Avatar-create-component",
    {
      "components/Avatar-create-component": function (e, t, n) {
        n("543d").createComponent(n("8e59"));
      },
    },
    [["components/Avatar-create-component"]],
  ]);
