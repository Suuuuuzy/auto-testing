(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
  ["components/customImg/customImg"],
  {
    3908: function (t, n, e) {
      "use strict";
      (function (t) {
        Object.defineProperty(n, "__esModule", { value: !0 }),
          (n.default = void 0);
        n.default = {
          props: {
            tap: { type: Function, default: null },
            src: { type: String, default: "" },
            iclass: { type: String, default: "" },
            mode: { type: String, default: "aspectFill" },
          },
          data: function () {
            return { image: "", canPreview: !1, noImage: "" };
          },
          watch: {
            src: {
              handler: function (t) {
                t
                  ? (this.image = t)
                  : (console.log("空地址"), (this.image = this.noImage));
              },
              immediate: !0,
            },
          },
          methods: {
            onImageLoad: function () {
              this.canPreview = !0;
            },
            onImageError: function () {
              console.log("无效路径图片"), (this.image = this.noImage);
            },
            preview: function (n) {
              if (this.canPreview) {
                var e = [];
                e.push(n), t.previewImage({ urls: e, current: e[0] });
              }
            },
          },
        };
      }).call(this, e("543d")["default"]);
    },
    "43bc": function (t, n, e) {
      "use strict";
      var i;
      e.d(n, "b", function () {
        return a;
      }),
        e.d(n, "c", function () {
          return c;
        }),
        e.d(n, "a", function () {
          return i;
        });
      var a = function () {
          var t = this,
            n = t.$createElement;
          t._self._c;
        },
        c = [];
    },
    6421: function (t, n, e) {
      "use strict";
      var i = e("756c"),
        a = e.n(i);
      a.a;
    },
    "756c": function (t, n, e) {},
    "980c": function (t, n, e) {
      "use strict";
      e.r(n);
      var i = e("43bc"),
        a = e("e69b");
      for (var c in a)
        ["default"].indexOf(c) < 0 &&
          (function (t) {
            e.d(n, t, function () {
              return a[t];
            });
          })(c);
      e("6421");
      var u,
        r = e("f0c5"),
        o = Object(r["a"])(
          a["default"],
          i["b"],
          i["c"],
          !1,
          null,
          "c9631636",
          null,
          !1,
          i["a"],
          u
        );
      n["default"] = o.exports;
    },
    e69b: function (t, n, e) {
      "use strict";
      e.r(n);
      var i = e("3908"),
        a = e.n(i);
      for (var c in i)
        ["default"].indexOf(c) < 0 &&
          (function (t) {
            e.d(n, t, function () {
              return i[t];
            });
          })(c);
      n["default"] = a.a;
    },
  },
]);
(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
  "components/customImg/customImg-create-component",
  {
    "components/customImg/customImg-create-component": function (
      module,
      exports,
      __webpack_require__
    ) {
      __webpack_require__("543d")["createComponent"](
        __webpack_require__("980c")
      );
    },
  },
  [["components/customImg/customImg-create-component"]],
]);
