(global.webpackJsonp = global.webpackJsonp || []).push([
  ["baseComponents/giveCollectCardBoxWrap/index"],
  {
    "07c1": function (e, n, o) {
      "use strict";
      var t = o("4ea4");
      Object.defineProperty(n, "__esModule", { value: !0 }),
        (n.default = void 0);
      var a = t(o("2309")),
        c = {
          name: "giveCollectBoxWrap",
          data: function () {
            return { componentReady: !1 };
          },
          components: {
            giveCollectCardBox: function () {
              o.e("pages/giveCollectCardBox-commonPackage/index")
                .then(
                  function () {
                    return resolve(o("235f"));
                  }.bind(null, o)
                )
                .catch(o.oe);
            },
          },
          methods: {
            initShow: function () {
              var e = this;
              (this.componentReady = !0)
                ? this.$refs.giveCollectBox &&
                  this.$refs.giveCollectBox.initShow()
                : a.default
                    .getCommonPackage("giveCollectCardBox-commonPackage")
                    .then(function (n) {
                      e.componentReady = !0;
                    });
            },
            getDoneCollectCard: function () {
              this.$emit("getDoneCollectCard");
            },
          },
        };
      n.default = c;
    },
    4622: function (e, n, o) {
      "use strict";
      o.r(n);
      var t = o("07c1"),
        a = o.n(t);
      for (var c in t)
        ["default"].indexOf(c) < 0 &&
          (function (e) {
            o.d(n, e, function () {
              return t[e];
            });
          })(c);
      n.default = a.a;
    },
    5240: function (e, n, o) {
      "use strict";
      o.r(n);
      var t = o("d4b27"),
        a = o("4622");
      for (var c in a)
        ["default"].indexOf(c) < 0 &&
          (function (e) {
            o.d(n, e, function () {
              return a[e];
            });
          })(c);
      var i = o("f0c5"),
        r = Object(i.a)(
          a.default,
          t.b,
          t.c,
          !1,
          null,
          null,
          null,
          !1,
          t.a,
          void 0
        );
      n.default = r.exports;
    },
    d4b27: function (e, n, o) {
      "use strict";
      o.d(n, "b", function () {
        return t;
      }),
        o.d(n, "c", function () {
          return a;
        }),
        o.d(n, "a", function () {});
      var t = function () {
          this.$createElement, this._self._c;
        },
        a = [];
    },
  },
]),
  (global.webpackJsonp = global.webpackJsonp || []).push([
    "baseComponents/giveCollectCardBoxWrap/index-create-component",
    {
      "baseComponents/giveCollectCardBoxWrap/index-create-component": function (
        e,
        n,
        o
      ) {
        o("543d").createComponent(o("5240"));
      },
    },
    [["baseComponents/giveCollectCardBoxWrap/index-create-component"]],
  ]);
