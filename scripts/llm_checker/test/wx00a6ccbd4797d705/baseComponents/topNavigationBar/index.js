(global.webpackJsonp = global.webpackJsonp || []).push([
  ["baseComponents/topNavigationBar/index"],
  {
    "36e3": function (t, e, n) {
      "use strict";
      (function (t) {
        var a = n("4ea4");
        Object.defineProperty(e, "__esModule", { value: !0 }),
          (e.default = void 0);
        var o = n("ca00"),
          i = a(n("2309")),
          c = a(n("461a")),
          u = a(n("b6a0")),
          s = {
            name: "topNavigationBar",
            mixins: [c.default, u.default],
            data: function () {
              return {
                statusBarHeight: "",
                customBarH: "",
                canback: !1,
                hasBackHome: !1,
                btnHeight: 30,
              };
            },
            props: {
              isShowBackHome: { type: Boolean, default: !1 },
              template: { default: "pageA", type: String },
              hideBackBtn: { type: Boolean, default: !1 },
              titleColor: { default: "#000", type: String },
              bgColor: {
                default: function () {
                  return {};
                },
                type: Object,
              },
              title: { default: "", type: String },
              imgshow: {
                default: function () {
                  return { isshow: !1, iconimg: "" };
                },
                type: Object,
              },
              zIndex: { type: [Number, String], default: 400 },
              customBack: { type: Boolean, default: !1 },
              leftCenter: { type: String, default: "" },
            },
            computed: {
              showBackHomeFlag: function () {
                var t = this.isShowBackHome;
                return (
                  this.canback ||
                    this.customBack ||
                    !this.hasBackHome ||
                    (t = !0),
                  t
                );
              },
              centerAbsolute: function () {
                this.imgshow.isshow && this.imgshow.iconimg,
                  (0, o.getSystemInfoSync)().platform;
                var t =
                    (this.template,
                    this.leftCenter ? this.leftCenter : "216rpx"),
                  e = this.leftCenter ? "" : "320rpx";
                return "left: "
                  .concat(t, ";top: ")
                  .concat(this.btntop + "px", ";width: ")
                  .concat(e, ";");
              },
              shouyeAbsolute: function () {
                return "top: ".concat(this.btntop + "px", ";");
              },
            },
            created: function () {
              (this.statusBarHeight = (0,
              o.getSystemInfoSync)().statusBarHeight),
                (this.customBarH = this.statusBarHeight + 44);
              var e = i.default.getCurrentPage(),
                n = (e.page, e.context),
                a = i.default.getTabbar(n).items;
              (this.hasBackHome = !(a && a.length)),
                (this.btnHeight =
                  t.getMenuButtonBoundingClientRect().height - 2),
                (this.btntop = t.getMenuButtonBoundingClientRect().top);
            },
            mounted: function () {
              var t = i.default.getCurrentPage(),
                e = this;
              this.hideBackBtn ||
                i.default.setOnPageChangeHandel({
                  key: t.context + "-" + t.page,
                  handel: function (t) {
                    getCurrentPages().length > 1
                      ? (e.canback = !0)
                      : (e.canback = !1);
                  },
                });
            },
            methods: {
              goBack: function () {
                this.customBack ? this.$emit("back") : wx.navigateBack();
              },
              backHome: function () {
                var t = this,
                  e = i.default.getDecorate("SYSTEM").getDefaultTabPage();
                e.toRules = !0;
                var n = e.context.toUpperCase();
                i.default.injection(n).then(function (n) {
                  n.linkInitialization(e).then(function (n) {
                    t.toPage2(e);
                  });
                });
              },
            },
            watch: {
              customBarH: function () {
                this.$emit("customBarH", this.customBarH);
              },
            },
            components: {},
          };
        e.default = s;
      }).call(this, n("543d").default);
    },
    "4d89": function (t, e, n) {},
    "987c": function (t, e, n) {
      "use strict";
      var a = n("4d89");
      n.n(a).a;
    },
    "9e74": function (t, e, n) {
      "use strict";
      n.r(e);
      var a = n("a9e3"),
        o = n("ee3c");
      for (var i in o)
        ["default"].indexOf(i) < 0 &&
          (function (t) {
            n.d(e, t, function () {
              return o[t];
            });
          })(i);
      n("987c");
      var c = n("f0c5"),
        u = Object(c.a)(
          o.default,
          a.b,
          a.c,
          !1,
          null,
          "529b26b1",
          null,
          !1,
          a.a,
          void 0
        );
      e.default = u.exports;
    },
    a9e3: function (t, e, n) {
      "use strict";
      n.d(e, "b", function () {
        return a;
      }),
        n.d(e, "c", function () {
          return o;
        }),
        n.d(e, "a", function () {});
      var a = function () {
          var t = this,
            e =
              (t.$createElement,
              t._self._c,
              t.__get_style([
                {
                  height: t.customBarH + "px",
                  color: t.titleColor,
                  "z-index": t.zIndex,
                },
                t.bgColor,
              ]));
          t.$mp.data = Object.assign({}, { $root: { s0: e } });
        },
        o = [];
    },
    ee3c: function (t, e, n) {
      "use strict";
      n.r(e);
      var a = n("36e3"),
        o = n.n(a);
      for (var i in a)
        ["default"].indexOf(i) < 0 &&
          (function (t) {
            n.d(e, t, function () {
              return a[t];
            });
          })(i);
      e.default = o.a;
    },
  },
]),
  (global.webpackJsonp = global.webpackJsonp || []).push([
    "baseComponents/topNavigationBar/index-create-component",
    {
      "baseComponents/topNavigationBar/index-create-component": function (
        t,
        e,
        n
      ) {
        n("543d").createComponent(n("9e74"));
      },
    },
    [["baseComponents/topNavigationBar/index-create-component"]],
  ]);
