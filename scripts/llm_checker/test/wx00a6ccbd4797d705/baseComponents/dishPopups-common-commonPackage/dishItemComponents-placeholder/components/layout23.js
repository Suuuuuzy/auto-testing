(global.webpackJsonp = global.webpackJsonp || []).push([
  [
    "baseComponents/dishPopups-common-commonPackage/dishItemComponents-placeholder/components/layout23",
  ],
  {
    2836: function (o, n, e) {},
    6470: function (o, n, e) {
      "use strict";
      var t = e("4ea4");
      Object.defineProperty(n, "__esModule", { value: !0 }),
        (n.default = void 0);
      var a = t(e("758d")),
        c =
          (e("ca00"),
          function () {
            Promise.all([
              e.e("common/vendor"),
              e.e(
                "baseComponents/dishPopups-common-commonPackage/dishItemComponents-placeholder/components/dishInfo"
              ),
            ])
              .then(
                function () {
                  return resolve(e("985b"));
                }.bind(null, e)
              )
              .catch(e.oe);
          }),
        s = {
          mixins: [a.default],
          props: { themeColor: { type: String, default: "" } },
          components: { dishInfo: c },
          methods: {},
        };
      n.default = s;
    },
    "9baf": function (o, n, e) {
      "use strict";
      e.d(n, "b", function () {
        return t;
      }),
        e.d(n, "c", function () {
          return a;
        }),
        e.d(n, "a", function () {});
      var t = function () {
          this.$createElement, this._self._c;
        },
        a = [];
    },
    ae187: function (o, n, e) {
      "use strict";
      e.r(n);
      var t = e("9baf"),
        a = e("f112");
      for (var c in a)
        ["default"].indexOf(c) < 0 &&
          (function (o) {
            e.d(n, o, function () {
              return a[o];
            });
          })(c);
      e("ef52");
      var s = e("f0c5"),
        m = Object(s.a)(
          a.default,
          t.b,
          t.c,
          !1,
          null,
          "1e7abea3",
          null,
          !1,
          t.a,
          void 0
        );
      n.default = m.exports;
    },
    ef52: function (o, n, e) {
      "use strict";
      var t = e("2836");
      e.n(t).a;
    },
    f112: function (o, n, e) {
      "use strict";
      e.r(n);
      var t = e("6470"),
        a = e.n(t);
      for (var c in t)
        ["default"].indexOf(c) < 0 &&
          (function (o) {
            e.d(n, o, function () {
              return t[o];
            });
          })(c);
      n.default = a.a;
    },
  },
]),
  (global.webpackJsonp = global.webpackJsonp || []).push([
    "baseComponents/dishPopups-common-commonPackage/dishItemComponents-placeholder/components/layout23-create-component",
    {
      "baseComponents/dishPopups-common-commonPackage/dishItemComponents-placeholder/components/layout23-create-component":
        function (o, n, e) {
          e("543d").createComponent(e("ae187"));
        },
    },
    [
      [
        "baseComponents/dishPopups-common-commonPackage/dishItemComponents-placeholder/components/layout23-create-component",
      ],
    ],
  ]);
