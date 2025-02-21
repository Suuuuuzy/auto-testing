var t = require("../../../@babel/runtime/helpers/regeneratorRuntime"),
  i = require("../../../@babel/runtime/helpers/asyncToGenerator"),
  e = require("../../../common/vendor.js"),
  n = require("./props.js"),
  r = require("../../libs/mixin/mpMixin.js"),
  a = require("../../libs/mixin/mixin.js"),
  s = {
    name: "u-skeleton",
    mixins: [r.mpMixin, a.mixin, n.props],
    data: function () {
      return { width: 0 };
    },
    watch: {
      loading: function () {
        this.getComponentWidth();
      },
    },
    computed: {
      rowsArray: function () {
        /%$/.test(this.rowsHeight) &&
          e.index.$u.error("rowsHeight参数不支持百分比单位");
        for (var t = [], i = 0; i < this.rows; i++) {
          var n = {},
            r = e.index.$u.test.array(this.rowsWidth)
              ? this.rowsWidth[i] || (i === this.rows - 1 ? "70%" : "100%")
              : i === this.rows - 1
              ? "70%"
              : this.rowsWidth,
            a = e.index.$u.test.array(this.rowsHeight)
              ? this.rowsHeight[i] || "18px"
              : this.rowsHeight;
          (n.marginTop =
            this.title || 0 !== i
              ? this.title && 0 === i
                ? "20px"
                : "12px"
              : 0),
            /%$/.test(r)
              ? (n.width = e.index.$u.addUnit((this.width * parseInt(r)) / 100))
              : (n.width = e.index.$u.addUnit(r)),
            (n.height = e.index.$u.addUnit(a)),
            t.push(n);
        }
        return t;
      },
      uTitleWidth: function () {
        var t = 0;
        return (
          (t = /%$/.test(this.titleWidth)
            ? e.index.$u.addUnit((this.width * parseInt(this.titleWidth)) / 100)
            : e.index.$u.addUnit(this.titleWidth)),
          e.index.$u.addUnit(t)
        );
      },
    },
    mounted: function () {
      this.init();
    },
    methods: {
      init: function () {
        this.getComponentWidth();
      },
      setNvueAnimation: function () {
        return i(
          t().mark(function i() {
            return t().wrap(function (t) {
              for (;;)
                switch ((t.prev = t.next)) {
                  case 0:
                  case "end":
                    return t.stop();
                }
            }, i);
          })
        )();
      },
      getComponentWidth: function () {
        var n = this;
        return i(
          t().mark(function i() {
            return t().wrap(function (t) {
              for (;;)
                switch ((t.prev = t.next)) {
                  case 0:
                    return (t.next = 2), e.index.$u.sleep(20);
                  case 2:
                    n.$uGetRect(".u-skeleton__wrapper__content").then(function (
                      t
                    ) {
                      n.width = t.width;
                    });
                  case 3:
                  case "end":
                    return t.stop();
                }
            }, i);
          })
        )();
      },
    },
  };
var o = e._export_sfc(s, [
  [
    "render",
    function (t, i, n, r, a, s) {
      return e.e(
        { a: t.loading },
        t.loading
          ? e.e(
              { b: t.avatar },
              t.avatar
                ? {
                    c: e.n(
                      "u-skeleton__wrapper__avatar--".concat(t.avatarShape)
                    ),
                    d: e.n(t.animate && "animate"),
                    e: t.$u.addUnit(t.avatarSize),
                    f: t.$u.addUnit(t.avatarSize),
                  }
                : {},
              { g: t.title },
              t.title
                ? {
                    h: s.uTitleWidth,
                    i: t.$u.addUnit(t.titleHeight),
                    j: e.n(t.animate && "animate"),
                  }
                : {},
              {
                k: e.f(s.rowsArray, function (t, i, e) {
                  return { a: i, b: t.width, c: t.height, d: t.marginTop };
                }),
                l: e.n(t.animate && "animate"),
              }
            )
          : {}
      );
    },
  ],
  ["__scopeId", "data-v-4bb8f55e"],
]);
wx.createComponent(o);
