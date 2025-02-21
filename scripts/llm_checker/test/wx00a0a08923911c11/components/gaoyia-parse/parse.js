(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
  ["components/gaoyia-parse/parse"],
  {
    "268e": function (t, e, n) {
      "use strict";
      var i;
      n.d(e, "b", function () {
        return a;
      }),
        n.d(e, "c", function () {
          return o;
        }),
        n.d(e, "a", function () {
          return i;
        });
      var a = function () {
          var t = this,
            e = t.$createElement;
          t._self._c;
        },
        o = [];
    },
    2825: function (t, e, n) {
      "use strict";
      n.r(e);
      var i = n("268e"),
        a = n("9d96");
      for (var o in a)
        ["default"].indexOf(o) < 0 &&
          (function (t) {
            n.d(e, t, function () {
              return a[t];
            });
          })(o);
      var r,
        s = n("f0c5"),
        u = Object(s["a"])(
          a["default"],
          i["b"],
          i["c"],
          !1,
          null,
          null,
          null,
          !1,
          i["a"],
          r
        );
      e["default"] = u.exports;
    },
    "61bd": function (t, e, n) {
      "use strict";
      (function (t) {
        var i = n("4ea4");
        Object.defineProperty(e, "__esModule", { value: !0 }),
          (e.default = void 0);
        var a = i(n("3926")),
          o = function () {
            n.e("components/gaoyia-parse/components/wxParseTemplate0")
              .then(
                function () {
                  return resolve(n("0df7"));
                }.bind(null, n)
              )
              .catch(n.oe);
          };
        e.default = {
          name: "wxParse",
          props: {
            userSelect: { type: String, default: "text" },
            imgOptions: {
              type: [Object, Boolean],
              default: function () {
                return { loop: !1, indicator: "number", longPressActions: !1 };
              },
            },
            loading: { type: Boolean, default: !1 },
            className: { type: String, default: "" },
            content: { type: String, default: "" },
            noData: { type: String, default: "<div></div>" },
            startHandler: {
              type: Function,
              default: function () {
                return function (t) {
                  (t.attr.class = null), (t.attr.style = null);
                };
              },
            },
            endHandler: { type: Function, default: null },
            charsHandler: { type: Function, default: null },
            imageProp: {
              type: Object,
              default: function () {
                return {
                  mode: "aspectFit",
                  padding: 0,
                  lazyLoad: !1,
                  domain: "",
                };
              },
            },
          },
          components: { wxParseTemplate: o },
          data: function () {
            return { nodes: {}, imageUrls: [], wxParseWidth: { value: 0 } };
          },
          computed: {},
          mounted: function () {
            this.setHtml();
          },
          methods: {
            setHtml: function () {
              var t = this;
              this.getWidth().then(function (e) {
                t.wxParseWidth.value = e;
              });
              var e = this.content,
                n = this.noData,
                i = this.imageProp,
                o = this.startHandler,
                r = this.endHandler,
                s = this.charsHandler,
                u = e || n,
                l = { start: o, end: r, chars: s },
                c = (0, a.default)(u, l, i, this);
              (this.imageUrls = c.imageUrls),
                (this.nodes = []),
                c.nodes.forEach(function (e) {
                  setTimeout(function () {
                    t.nodes.push(e);
                  }, 0);
                });
            },
            getWidth: function () {
              var e = this;
              return new Promise(function (n, i) {
                t.createSelectorQuery()
                  .in(e)
                  .select(".wxParse")
                  .fields({ size: !0, scrollOffset: !0 }, function (t) {
                    n(t.width);
                  })
                  .exec();
              });
            },
            navigate: function (t, e, n) {
              console.log(t, n), this.$emit("navigate", t, e);
            },
            preview: function (e, n) {
              this.imageUrls.length &&
                "boolean" !== typeof this.imgOptions &&
                t.previewImage({
                  current: e,
                  urls: this.imageUrls,
                  loop: this.imgOptions.loop,
                  indicator: this.imgOptions.indicator,
                  longPressActions: this.imgOptions.longPressActions,
                }),
                this.$emit("preview", e, n);
            },
            removeImageUrl: function (t) {
              var e = this.imageUrls;
              e.splice(e.indexOf(t), 1);
            },
          },
          provide: function () {
            return {
              parseWidth: this.wxParseWidth,
              parseSelect: this.userSelect,
            };
          },
          watch: {
            content: function () {
              this.setHtml();
            },
          },
        };
      }).call(this, n("543d")["default"]);
    },
    "9d96": function (t, e, n) {
      "use strict";
      n.r(e);
      var i = n("61bd"),
        a = n.n(i);
      for (var o in i)
        ["default"].indexOf(o) < 0 &&
          (function (t) {
            n.d(e, t, function () {
              return i[t];
            });
          })(o);
      e["default"] = a.a;
    },
  },
]);
(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
  "components/gaoyia-parse/parse-create-component",
  {
    "components/gaoyia-parse/parse-create-component": function (
      module,
      exports,
      __webpack_require__
    ) {
      __webpack_require__("543d")["createComponent"](
        __webpack_require__("2825")
      );
    },
  },
  [["components/gaoyia-parse/parse-create-component"]],
]);
