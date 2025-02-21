(global.webpackJsonp = global.webpackJsonp || []).push([
  ["baseComponents/loading/index"],
  {
    "0fc8": function (t, n, e) {
      "use strict";
      e.r(n);
      var o = e("4ad8"),
        a = e.n(o);
      for (var i in o)
        ["default"].indexOf(i) < 0 &&
          (function (t) {
            e.d(n, t, function () {
              return o[t];
            });
          })(i);
      n.default = a.a;
    },
    "4ad8": function (t, n, e) {
      "use strict";
      var o = e("4ea4");
      Object.defineProperty(n, "__esModule", { value: !0 }),
        (n.default = void 0);
      var a = o(e("2309")),
        i = {
          name: "loading",
          mixins: [o(e("b6a0")).default],
          props: {
            context: { type: String, default: "" },
            init: { type: Boolean, default: !1 },
            top: { type: [String, Number], default: 0 },
            transparent: { type: Boolean, default: !1 },
            partLoading: { type: Boolean, default: !1 },
            bgColor: { type: String, default: "" },
          },
          components: {
            log: function () {
              e.e("baseComponents/log/index")
                .then(
                  function () {
                    return resolve(e("4d55"));
                  }.bind(null, e)
                )
                .catch(e.oe);
            },
          },
          data: function () {
            return { visible: !1, loadingImage: "", loadingText: "" };
          },
          created: function () {
            this.init && (this.visible = !0);
            var t = a.default.getDecorate("SYSTEM");
            (this.loadingImage =
              t.getValidValue("decorationData")("commonSet")("theme")(
                "loadingImage"
              )()),
              (this.loadingText =
                t.getValidValue("decorationData")("commonSet")("theme")(
                  "loadingText"
                )());
          },
          computed: {
            background: function () {
              var t = "#fff";
              return (
                this.transparent
                  ? (t = "transparent")
                  : this.bgColor && (t = this.bgColor),
                t
              );
            },
          },
          methods: {
            format: function (t) {
              if (t) return t.replace(/<br\/>/g, "\r\n ");
            },
            show: function (t) {
              t && (this.loadingText = this.format(t)), (this.visible = !0);
            },
            hide: function () {
              this.visible = !1;
            },
          },
        };
      n.default = i;
    },
    "85e90": function (t, n, e) {
      "use strict";
      e.d(n, "b", function () {
        return o;
      }),
        e.d(n, "c", function () {
          return a;
        }),
        e.d(n, "a", function () {});
      var o = function () {
          var t = this,
            n =
              (t.$createElement,
              t._self._c,
              t.visible && t.loadingText ? t.format(t.loadingText) : null);
          t.$mp.data = Object.assign({}, { $root: { m0: n } });
        },
        a = [];
    },
    "930d": function (t, n, e) {
      "use strict";
      var o = e("c8c6");
      e.n(o).a;
    },
    c8c6: function (t, n, e) {},
    cbc5: function (t, n, e) {
      "use strict";
      e.r(n);
      var o = e("85e90"),
        a = e("0fc8");
      for (var i in a)
        ["default"].indexOf(i) < 0 &&
          (function (t) {
            e.d(n, t, function () {
              return a[t];
            });
          })(i);
      e("930d");
      var r = e("f0c5"),
        c = Object(r.a)(
          a.default,
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
      n.default = c.exports;
    },
  },
]),
  (global.webpackJsonp = global.webpackJsonp || []).push([
    "baseComponents/loading/index-create-component",
    {
      "baseComponents/loading/index-create-component": function (t, n, e) {
        e("543d").createComponent(e("cbc5"));
      },
    },
    [["baseComponents/loading/index-create-component"]],
  ]);
