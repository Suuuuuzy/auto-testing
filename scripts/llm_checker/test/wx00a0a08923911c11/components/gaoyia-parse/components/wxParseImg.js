(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
  ["components/gaoyia-parse/components/wxParseImg"],
  {
    "005f": function (t, e, n) {
      "use strict";
      var i;
      n.d(e, "b", function () {
        return r;
      }),
        n.d(e, "c", function () {
          return a;
        }),
        n.d(e, "a", function () {
          return i;
        });
      var r = function () {
          var t = this,
            e = t.$createElement;
          t._self._c;
        },
        a = [];
    },
    2929: function (t, e, n) {
      "use strict";
      (function (t) {
        Object.defineProperty(e, "__esModule", { value: !0 }),
          (e.default = void 0);
        e.default = {
          name: "wxParseImg",
          data: function () {
            return { newStyleStr: "", preview: !0 };
          },
          inject: ["parseWidth"],
          mounted: function () {},
          props: {
            node: {
              type: Object,
              default: function () {
                return {};
              },
            },
          },
          methods: {
            wxParseImgTap: function (t) {
              if (this.preview) {
                var e = t.currentTarget.dataset.src;
                if (e) {
                  var n = this.$parent;
                  while (!n.preview || "function" !== typeof n.preview)
                    n = n.$parent;
                  n.preview(e, t);
                }
              }
            },
            wxParseImgLoad: function (t) {
              var e = t.currentTarget.dataset.src;
              if (e) {
                var n = t.mp.detail,
                  i = n.width,
                  r = n.height,
                  a = this.wxAutoImageCal(i, r),
                  o = a.imageheight,
                  c = a.imageWidth,
                  u = this.node.attr,
                  d = u.padding,
                  f = u.mode,
                  s = this.node.styleStr,
                  p = "widthFix" === f ? "" : "height: ".concat(o, "px;");
                this.newStyleStr = ""
                  .concat(s, "; ")
                  .concat(p, "; width: ")
                  .concat(c, "px; padding: 0 ")
                  .concat(+d, "px;margin-top: 4px");
              }
            },
            wxAutoImageCal: function (e, n) {
              var i = t.getSystemInfoSync().windowWidth - 60;
              console.log(i, "windowWidth");
              var r = {};
              if (e < 60 || n < 60) {
                var a = this.node.attr.src,
                  o = this.$parent;
                while (!o.preview || "function" !== typeof o.preview)
                  o = o.$parent;
                o.removeImageUrl(a), (this.preview = !1);
              }
              return (r.imageWidth = i), (r.imageheight = i * (n / e)), r;
            },
          },
        };
      }).call(this, n("543d")["default"]);
    },
    "782c": function (t, e, n) {
      "use strict";
      n.r(e);
      var i = n("005f"),
        r = n("d755");
      for (var a in r)
        ["default"].indexOf(a) < 0 &&
          (function (t) {
            n.d(e, t, function () {
              return r[t];
            });
          })(a);
      var o,
        c = n("f0c5"),
        u = Object(c["a"])(
          r["default"],
          i["b"],
          i["c"],
          !1,
          null,
          null,
          null,
          !1,
          i["a"],
          o
        );
      e["default"] = u.exports;
    },
    d755: function (t, e, n) {
      "use strict";
      n.r(e);
      var i = n("2929"),
        r = n.n(i);
      for (var a in i)
        ["default"].indexOf(a) < 0 &&
          (function (t) {
            n.d(e, t, function () {
              return i[t];
            });
          })(a);
      e["default"] = r.a;
    },
  },
]);
(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
  "components/gaoyia-parse/components/wxParseImg-create-component",
  {
    "components/gaoyia-parse/components/wxParseImg-create-component": function (
      module,
      exports,
      __webpack_require__
    ) {
      __webpack_require__("543d")["createComponent"](
        __webpack_require__("782c")
      );
    },
  },
  [["components/gaoyia-parse/components/wxParseImg-create-component"]],
]);
