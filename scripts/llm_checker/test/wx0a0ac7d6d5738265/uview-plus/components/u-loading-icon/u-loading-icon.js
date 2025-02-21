var e = require("../../../common/vendor.js"),
  i = require("./props.js"),
  n = require("../../libs/mixin/mpMixin.js"),
  t = require("../../libs/mixin/mixin.js"),
  o = {
    name: "u-loading-icon",
    mixins: [n.mpMixin, t.mixin, i.props],
    data: function () {
      return {
        array12: Array.from({ length: 12 }),
        aniAngel: 360,
        webviewHide: !1,
        loading: !1,
      };
    },
    computed: {
      otherBorderColor: function () {
        var i = e.index.$u.colorGradient(this.color, "#ffffff", 100)[80];
        return "circle" === this.mode
          ? this.inactiveColor
            ? this.inactiveColor
            : i
          : "transparent";
      },
    },
    watch: { show: function (e) {} },
    mounted: function () {
      this.init();
    },
    methods: {
      init: function () {
        setTimeout(function () {}, 20);
      },
      addEventListenerToWebview: function () {
        var e = this,
          i = getCurrentPages(),
          n = i[i.length - 1].$getAppWebview();
        n.addEventListener("hide", function () {
          e.webviewHide = !0;
        }),
          n.addEventListener("show", function () {
            e.webviewHide = !1;
          });
      },
    },
  };
var r = e._export_sfc(o, [
  [
    "render",
    function (i, n, t, o, r, d) {
      return e.e(
        { a: i.show },
        i.show
          ? e.e(
              { b: !r.webviewHide },
              r.webviewHide
                ? {}
                : e.e(
                    { c: "spinner" === i.mode },
                    "spinner" === i.mode
                      ? {
                          d: e.f(r.array12, function (e, i, n) {
                            return { a: i };
                          }),
                        }
                      : {},
                    {
                      e: e.n("u-loading-icon__spinner--".concat(i.mode)),
                      f: i.color,
                      g: i.$u.addUnit(i.size),
                      h: i.$u.addUnit(i.size),
                      i: i.color,
                      j: d.otherBorderColor,
                      k: d.otherBorderColor,
                      l: d.otherBorderColor,
                      m: "".concat(i.duration, "ms"),
                      n:
                        "semicircle" === i.mode || "circle" === i.mode
                          ? i.timingFunction
                          : "",
                    }
                  ),
              { o: i.text },
              i.text
                ? {
                    p: e.t(i.text),
                    q: i.$u.addUnit(i.textSize),
                    r: i.textColor,
                  }
                : {},
              {
                s: e.s(i.$u.addStyle(i.customStyle)),
                t: e.n(i.vertical && "u-loading-icon--vertical"),
              }
            )
          : {}
      );
    },
  ],
  ["__scopeId", "data-v-4c6d6dc4"],
]);
wx.createComponent(r);
