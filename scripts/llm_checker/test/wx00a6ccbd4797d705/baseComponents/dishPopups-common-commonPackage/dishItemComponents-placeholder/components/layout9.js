(global.webpackJsonp = global.webpackJsonp || []).push([
  [
    "baseComponents/dishPopups-common-commonPackage/dishItemComponents-placeholder/components/layout9",
  ],
  {
    "0f99": function (e, o, n) {
      "use strict";
      var t = n("f457");
      n.n(t).a;
    },
    "5f617": function (e, o, n) {
      "use strict";
      n.r(o);
      var t = n("c347"),
        a = n.n(t);
      for (var c in t)
        ["default"].indexOf(c) < 0 &&
          (function (e) {
            n.d(o, e, function () {
              return t[e];
            });
          })(c);
      o.default = a.a;
    },
    b501: function (e, o, n) {
      "use strict";
      n.r(o);
      var t = n("e29d"),
        a = n("5f617");
      for (var c in a)
        ["default"].indexOf(c) < 0 &&
          (function (e) {
            n.d(o, e, function () {
              return a[e];
            });
          })(c);
      n("0f99");
      var s = n("f0c5"),
        m = Object(s.a)(
          a.default,
          t.b,
          t.c,
          !1,
          null,
          "3b2773e6",
          null,
          !1,
          t.a,
          void 0
        );
      o.default = m.exports;
    },
    c347: function (e, o, n) {
      "use strict";
      var t = n("4ea4");
      Object.defineProperty(o, "__esModule", { value: !0 }),
        (o.default = void 0);
      var a = {
        name: "layout9",
        mixins: [t(n("758d")).default],
        props: ["smallImageWidthHeight"],
        components: {
          dishInfo: function () {
            Promise.all([
              n.e("common/vendor"),
              n.e(
                "baseComponents/dishPopups-common-commonPackage/dishItemComponents-placeholder/components/dishInfo"
              ),
            ])
              .then(
                function () {
                  return resolve(n("985b"));
                }.bind(null, n)
              )
              .catch(n.oe);
          },
        },
        computed: {
          dishImageStyle: function () {
            var e = {};
            if ("pageB" === this.dishConfig.template) {
              var o = this.smallImageWidthHeight || 120;
              (e.width = Number(o) + "rpx"), (e.height = Number(o) + "rpx");
            }
            return e;
          },
        },
      };
      o.default = a;
    },
    e29d: function (e, o, n) {
      "use strict";
      n.d(o, "b", function () {
        return t;
      }),
        n.d(o, "c", function () {
          return a;
        }),
        n.d(o, "a", function () {});
      var t = function () {
          var e = this,
            o =
              (e.$createElement, e._self._c, e.__get_style([e.dishImageStyle]));
          e.$mp.data = Object.assign({}, { $root: { s0: o } });
        },
        a = [];
    },
    f457: function (e, o, n) {},
  },
]),
  (global.webpackJsonp = global.webpackJsonp || []).push([
    "baseComponents/dishPopups-common-commonPackage/dishItemComponents-placeholder/components/layout9-create-component",
    {
      "baseComponents/dishPopups-common-commonPackage/dishItemComponents-placeholder/components/layout9-create-component":
        function (e, o, n) {
          n("543d").createComponent(n("b501"));
        },
    },
    [
      [
        "baseComponents/dishPopups-common-commonPackage/dishItemComponents-placeholder/components/layout9-create-component",
      ],
    ],
  ]);
