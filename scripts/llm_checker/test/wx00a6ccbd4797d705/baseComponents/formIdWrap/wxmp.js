(global.webpackJsonp = global.webpackJsonp || []).push([
  ["baseComponents/formIdWrap/wxmp"],
  {
    "52f6": function (e, n, t) {
      "use strict";
      var o = t("4ea4");
      Object.defineProperty(n, "__esModule", { value: !0 }),
        (n.default = void 0);
      var a = o(t("2309")),
        s = t("ca00"),
        r = {
          name: "formIdWrap",
          data: function () {
            return { disabled: !1 };
          },
          props: {
            tmplIds: {
              type: Array,
              default: function () {
                return [];
              },
            },
          },
          methods: {
            fire: function () {
              if (!this.disabled) {
                this.disabled = !0;
                var e = this;
                if (wx.canIUse("requestSubscribeMessage") && e.tmplIds.length) {
                  var n = (0, s.getSystemInfoSync)(),
                    t = {
                      手机品牌: n.brand,
                      手机型号: n.model,
                      客户端平台: n.platform,
                      操作系统版本: n.system,
                      客户端基础库版本: n.SDKVersion,
                    };
                  console.log("手机基础信息", t),
                    console.log("模板id数组", e.tmplIds),
                    wx.requestSubscribeMessage({
                      tmplIds: e.tmplIds,
                      success: function (e) {
                        console.log("成功回调"),
                          a.default.getData({
                            name: "wxFormId",
                            nameSpace: "SYSTEM",
                            params: { confirmContent: JSON.stringify(e) },
                          });
                      },
                      fail: function (e) {
                        console.log("失败回调", e);
                      },
                      complete: function (n) {
                        console.log("成功失败都会调用", n),
                          e.$emit("fire"),
                          (e.disabled = !1);
                      },
                    });
                } else e.$emit("fire"), (this.disabled = !1);
              }
            },
          },
        };
      n.default = r;
    },
    6946: function (e, n, t) {
      "use strict";
      t.r(n);
      var o = t("95f9"),
        a = t("8212");
      for (var s in a)
        ["default"].indexOf(s) < 0 &&
          (function (e) {
            t.d(n, e, function () {
              return a[e];
            });
          })(s);
      var r = t("f0c5"),
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
    8212: function (e, n, t) {
      "use strict";
      t.r(n);
      var o = t("52f6"),
        a = t.n(o);
      for (var s in o)
        ["default"].indexOf(s) < 0 &&
          (function (e) {
            t.d(n, e, function () {
              return o[e];
            });
          })(s);
      n.default = a.a;
    },
    "95f9": function (e, n, t) {
      "use strict";
      t.d(n, "b", function () {
        return o;
      }),
        t.d(n, "c", function () {
          return a;
        }),
        t.d(n, "a", function () {});
      var o = function () {
          this.$createElement, this._self._c;
        },
        a = [];
    },
  },
]),
  (global.webpackJsonp = global.webpackJsonp || []).push([
    "baseComponents/formIdWrap/wxmp-create-component",
    {
      "baseComponents/formIdWrap/wxmp-create-component": function (e, n, t) {
        t("543d").createComponent(t("6946"));
      },
    },
    [["baseComponents/formIdWrap/wxmp-create-component"]],
  ]);
