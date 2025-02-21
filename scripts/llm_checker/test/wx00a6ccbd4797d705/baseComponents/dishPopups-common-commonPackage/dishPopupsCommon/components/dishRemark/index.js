(global.webpackJsonp = global.webpackJsonp || []).push([
  [
    "baseComponents/dishPopups-common-commonPackage/dishPopupsCommon/components/dishRemark/index",
  ],
  {
    "1a83": function (t, e, n) {
      "use strict";
      (function (t) {
        Object.defineProperty(e, "__esModule", { value: !0 }),
          (e.default = void 0);
        var o = n("ca00"),
          i = {
            name: "dishRemark",
            props: {
              width: { type: String, default: "100%" },
              height: { type: String, default: "180rpx" },
              fontColor: { type: String, default: "#333" },
              disabled: { type: Boolean, default: !1 },
              border: { type: Boolean, default: !1 },
              customStyle: {
                type: Object,
                default: function () {
                  return {
                    "background-color": "#F9F9F9",
                    "border-radius": "5px",
                  };
                },
              },
              placeholderStyle: {
                type: String,
                default: "font-size: ".concat(t.upx2px(26), "px; color: #ccc;"),
              },
              placeholder: { type: String, default: "请填写您想说的话~" },
              maxlength: { type: [Number, String], default: 25 },
              minlength: { type: [Number, String], default: 0 },
              showCounter: { type: Boolean, default: !0 },
              defaultShow: { type: Boolean, default: !1 },
              mustAnswer: { type: Boolean, default: !1 },
              showConfirmBar: { type: Boolean, default: !1 },
              adjustPosition: { type: Boolean, default: !1 },
              confirmType: { type: String, default: "return" },
            },
            data: function () {
              return {
                textareaShow: this.defaultShow,
                content: "",
                isIOS: !1,
                editMode: !1,
                clientY: 0,
              };
            },
            computed: {
              currentLength: function () {
                return this.content.length > this.maxlength
                  ? this.maxlength
                  : this.content.length;
              },
              getStyle: function () {
                var t = {
                  height: "".concat(this.height),
                  width: "".concat(this.width),
                  color: "".concat(this.fontColor),
                };
                return (
                  (t.pointerEvents = this.disabled ? "none" : "auto"),
                  (t = Object.assign(t, this.customStyle))
                );
              },
            },
            methods: {
              keyboardheightchange: function (t) {
                var e = t.detail.height,
                  n = (0, o.getSystemInfoSync)(),
                  i = n.windowHeight - 44 - n.safeAreaInsets.top - this.clientY,
                  a = e + 20 - (i < 0 ? 0 : i);
                a > 0 && this.$emit("shift", a);
              },
              tapView: function (t) {
                this.$emit("shift", 100),
                  (this.clientY = t.touches[0].clientY),
                  (this.editMode = !0);
              },
              editBlur: function (t) {
                this.$emit("shift", 0),
                  (this.editMode = !1),
                  (this.content = this.content.replace(/\s+/g, "")),
                  this.$emit("texeAreaBlur");
              },
              editFocus: function (t) {
                (this.content = this.content.replace(/\s+/g, "")),
                  this.$emit("texeAreaFocus");
              },
              handleInput: function (t) {
                (this.content = t.target.value.replace(/\s+/g, "")),
                  this.$emit("textChange", this.content);
              },
              clearText: function () {
                this.content = "";
              },
              clearSelData: function () {
                this.content = "";
              },
              getText: function () {
                return this.content;
              },
              show: function () {
                this.textareaShow = !0;
              },
              hide: function () {
                this.textareaShow = !1;
              },
            },
            mounted: function () {
              this.isIOS = (0, o.getSystemInfoSync)().platform;
            },
          };
        e.default = i;
      }).call(this, n("543d").default);
    },
    "25a4": function (t, e, n) {
      "use strict";
      var o = n("77bb");
      n.n(o).a;
    },
    "4d10": function (t, e, n) {
      "use strict";
      n.r(e);
      var o = n("6807"),
        i = n("ab3f");
      for (var a in i)
        ["default"].indexOf(a) < 0 &&
          (function (t) {
            n.d(e, t, function () {
              return i[t];
            });
          })(a);
      n("25a4");
      var s = n("f0c5"),
        c = Object(s.a)(
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
      e.default = c.exports;
    },
    6807: function (t, e, n) {
      "use strict";
      n.d(e, "b", function () {
        return o;
      }),
        n.d(e, "c", function () {
          return i;
        }),
        n.d(e, "a", function () {});
      var o = function () {
          var t = this,
            e =
              (t.$createElement,
              t._self._c,
              t.textareaShow && !t.editMode
                ? t.__get_style([t.getStyle])
                : null),
            n =
              t.textareaShow && t.editMode ? t.__get_style([t.getStyle]) : null;
          t.$mp.data = Object.assign({}, { $root: { s0: e, s1: n } });
        },
        i = [];
    },
    "77bb": function (t, e, n) {},
    ab3f: function (t, e, n) {
      "use strict";
      n.r(e);
      var o = n("1a83"),
        i = n.n(o);
      for (var a in o)
        ["default"].indexOf(a) < 0 &&
          (function (t) {
            n.d(e, t, function () {
              return o[t];
            });
          })(a);
      e.default = i.a;
    },
  },
]),
  (global.webpackJsonp = global.webpackJsonp || []).push([
    "baseComponents/dishPopups-common-commonPackage/dishPopupsCommon/components/dishRemark/index-create-component",
    {
      "baseComponents/dishPopups-common-commonPackage/dishPopupsCommon/components/dishRemark/index-create-component":
        function (t, e, n) {
          n("543d").createComponent(n("4d10"));
        },
    },
    [
      [
        "baseComponents/dishPopups-common-commonPackage/dishPopupsCommon/components/dishRemark/index-create-component",
      ],
    ],
  ]);
