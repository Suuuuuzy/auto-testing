(global.webpackJsonp = global.webpackJsonp || []).push([
  ["baseComponents/dishPopupsWrap/index"],
  {
    "592d": function (e, t, o) {
      "use strict";
      o.r(t);
      var a = o("8f88"),
        n = o("da7a");
      for (var p in n)
        ["default"].indexOf(p) < 0 &&
          (function (e) {
            o.d(t, e, function () {
              return n[e];
            });
          })(p);
      var i = o("f0c5"),
        s = Object(i.a)(
          n.default,
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
      t.default = s.exports;
    },
    "65fa": function (e, t, o) {
      "use strict";
      var a = o("4ea4");
      Object.defineProperty(t, "__esModule", { value: !0 }),
        (t.default = void 0);
      var n = a(o("a34a")),
        p = a(o("c973")),
        i = a(o("2309")),
        s = {
          name: "dishPopupsWrap",
          data: function () {
            return {
              dpReady: !1,
              tcReady: !1,
              dpPopLayout: "",
              tcPopLayout: "",
              isWoods: !1,
            };
          },
          props: {
            context: { default: "", type: String },
            init: {
              dishBtnSize: { size: 24 },
              promPriceName: "促销价",
              vipTxt: "会员价",
              vipTxtNext: "会员价",
              isPreOrder: !1,
            },
          },
          components: {
            dpDishPopups: function () {
              Promise.all([
                o.e("common/vendor"),
                o.e("baseComponents/dishPopupsWrap/dpWrap/index"),
              ])
                .then(
                  function () {
                    return resolve(o("a4b74"));
                  }.bind(null, o)
                )
                .catch(o.oe);
            },
            tcDishPopups: function () {
              Promise.all([
                o.e("common/vendor"),
                o.e("baseComponents/dishPopupsWrap/tcWrap/index"),
              ])
                .then(
                  function () {
                    return resolve(o("d84a"));
                  }.bind(null, o)
                )
                .catch(o.oe);
            },
          },
          methods: {
            findPopupsComp: function (e) {
              return this.$refs[1 == e ? "dpDishPopups" : "tcDishPopups"];
            },
            showPopupFun: function (e) {
              var t = this,
                o =
                  arguments.length > 1 && void 0 !== arguments[1]
                    ? arguments[1]
                    : {},
                a = e.category,
                n = "dishPopups-"
                  .concat("1" == a ? "dp" : "tc", "-pop-")
                  .concat(
                    "1" == a ? this.dpPopLayout : this.tcPopLayout,
                    "-commonPackage"
                  );
              "2" == a &&
                o.specialPop &&
                (n = "dishPopups-tc-pop-".concat(
                  o.specialPop,
                  "-commonPackage"
                )),
                i.default.getCommonPackage(n).then(function (n) {
                  "1" == a ? (t.dpReady = !0) : (t.tcReady = !0),
                    t.$nextTick(function () {
                      var n = t.findPopupsComp(a);
                      n && n.showPopupFun(e, o);
                    });
                });
            },
            getDishPupopData: function (e, t) {
              this.$emit("addDishToCart", e, t);
            },
            hidePopup: function () {
              var e = this.$children[0];
              e && e.hidePopup();
            },
            shareDish: function (e) {
              this.$emit("shareDish", e);
            },
            closeDish: function (e) {
              this.$emit("closeDish", e);
            },
            handleDpPopLayout: function (e) {
              if (this.isWoods) this.dpPopLayout = "theWoodsModel";
              else
                switch (e) {
                  case "pageA":
                    this.dpPopLayout = "initialModel";
                    break;
                  case "pageB":
                    this.dpPopLayout = "specsSingleModel";
                    break;
                  case "pageC":
                    this.dpPopLayout = "bigPictureModel";
                    break;
                  case "pageD":
                    "WM" == this.context && "ZT" == this.context
                      ? (this.dpPopLayout = "fullScreenModel")
                      : (this.dpPopLayout = "dishPageStepModel");
                    break;
                  case "pageE":
                    this.dpPopLayout = "fullScreenModel";
                    break;
                  case "pageF":
                    this.dpPopLayout = "dishSpecModel";
                    break;
                  default:
                    this.dpPopLayout = "initialModel";
                }
            },
            handleTcPopLayout: function (e) {
              switch (e) {
                case "1":
                  this.tcPopLayout = "imgTextModel";
                  break;
                case "2":
                  this.tcPopLayout = "blockModel";
                  break;
                case "3":
                  this.tcPopLayout = "pureTextModel";
                  break;
                default:
                  this.tcPopLayout = "imgTextModel";
              }
            },
            handleTemplate: function () {
              var e = i.default.getDecorate(this.context).decorationData;
              ("WM" != this.context && "ZT" != this.context) ||
                (this.isWoods = "pageD" == e.dishPage.template);
              var t = e.specsPoupPage || { template: "pageA" };
              this.handleDpPopLayout(t.template),
                this.handleTcPopLayout(e.tcPage.layout);
            },
          },
          created: function () {
            var e = this;
            return (0, p.default)(
              n.default.mark(function t() {
                return n.default.wrap(function (t) {
                  for (;;)
                    switch ((t.prev = t.next)) {
                      case 0:
                        e.handleTemplate(),
                          i.default
                            .getCommonPackage(
                              "dishPopups-dp-pop-".concat(
                                e.dpPopLayout,
                                "-commonPackage"
                              )
                            )
                            .then(function (t) {
                              e.dpReady = !0;
                            }),
                          i.default
                            .getCommonPackage(
                              "dishPopups-tc-pop-".concat(
                                e.tcPopLayout,
                                "-commonPackage"
                              )
                            )
                            .then(function (t) {
                              e.tcReady = !0;
                            });
                      case 3:
                      case "end":
                        return t.stop();
                    }
                }, t);
              })
            )();
          },
        };
      t.default = s;
    },
    "8f88": function (e, t, o) {
      "use strict";
      o.d(t, "b", function () {
        return a;
      }),
        o.d(t, "c", function () {
          return n;
        }),
        o.d(t, "a", function () {});
      var a = function () {
          this.$createElement, this._self._c;
        },
        n = [];
    },
    da7a: function (e, t, o) {
      "use strict";
      o.r(t);
      var a = o("65fa"),
        n = o.n(a);
      for (var p in a)
        ["default"].indexOf(p) < 0 &&
          (function (e) {
            o.d(t, e, function () {
              return a[e];
            });
          })(p);
      t.default = n.a;
    },
  },
]),
  (global.webpackJsonp = global.webpackJsonp || []).push([
    "baseComponents/dishPopupsWrap/index-create-component",
    {
      "baseComponents/dishPopupsWrap/index-create-component": function (
        e,
        t,
        o
      ) {
        o("543d").createComponent(o("592d"));
      },
    },
    [["baseComponents/dishPopupsWrap/index-create-component"]],
  ]);
