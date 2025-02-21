(global.webpackJsonp = global.webpackJsonp || []).push([
  ["baseComponents/noteLoading/index"],
  {
    "4b90": function (n, e, t) {},
    "6bda": function (n, e, t) {
      "use strict";
      t.d(e, "b", function () {
        return o;
      }),
        t.d(e, "c", function () {
          return i;
        }),
        t.d(e, "a", function () {});
      var o = function () {
          var n = this,
            e =
              (n.$createElement,
              n._self._c,
              n.visible && n.loadingText ? n.format(n.loadingText) : null);
          n.$mp.data = Object.assign({}, { $root: { m0: e } });
        },
        i = [];
    },
    "92c8": function (n, e, t) {
      "use strict";
      Object.defineProperty(e, "__esModule", { value: !0 }),
        (e.default = void 0),
        (e.default = {
          name: "loading",
          props: ["context", "init"],
          data: function () {
            return {
              visible: !1,
              loadingImage:
                "https://cdnpic.wuuxiang.com/msgjDecorationImg/codeLoading2.gif",
              loadingText: "",
            };
          },
          created: function () {
            this.init && (this.visible = !0);
          },
          methods: {
            format: function (n) {
              return n.replace(/<br\/>/g, "\r\n ");
            },
            show: function (n) {
              n &&
                n.hasOwnProperty("message") &&
                (this.loadingText = this.format(n.message)),
                n &&
                  n.hasOwnProperty("loadingImage") &&
                  (this.loadingImage = n.loadingImage),
                (this.visible = !0);
            },
            hide: function () {
              this.visible = !1;
            },
          },
        });
    },
    "986f": function (n, e, t) {
      "use strict";
      t.r(e);
      var o = t("6bda"),
        i = t("f5ee");
      for (var a in i)
        ["default"].indexOf(a) < 0 &&
          (function (n) {
            t.d(e, n, function () {
              return i[n];
            });
          })(a);
      t("c524");
      var c = t("f0c5"),
        s = Object(c.a)(
          i.default,
          o.b,
          o.c,
          !1,
          null,
          null,
          null,
          !1,
          o.a,
          void 0
        );
      e.default = s.exports;
    },
    c524: function (n, e, t) {
      "use strict";
      var o = t("4b90");
      t.n(o).a;
    },
    f5ee: function (n, e, t) {
      "use strict";
      t.r(e);
      var o = t("92c8"),
        i = t.n(o);
      for (var a in o)
        ["default"].indexOf(a) < 0 &&
          (function (n) {
            t.d(e, n, function () {
              return o[n];
            });
          })(a);
      e.default = i.a;
    },
  },
]),
  (global.webpackJsonp = global.webpackJsonp || []).push([
    "baseComponents/noteLoading/index-create-component",
    {
      "baseComponents/noteLoading/index-create-component": function (n, e, t) {
        t("543d").createComponent(t("986f"));
      },
    },
    [["baseComponents/noteLoading/index-create-component"]],
  ]);
