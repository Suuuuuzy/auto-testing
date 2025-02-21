var t = require("../../../@babel/runtime/helpers/slicedToArray"),
  e = require("../common/component"),
  o = require("../mixins/page-scroll");
(0, e.VantComponent)({
  props: {
    zIndex: { type: Number, value: 99 },
    offsetTop: { type: Number, value: 0, observer: "onScroll" },
    disabled: { type: Boolean, observer: "onScroll" },
    container: { type: null, observer: "onScroll" },
    scrollTop: {
      type: null,
      observer: function (t) {
        this.onScroll({ scrollTop: t });
      },
    },
  },
  mixins: [
    (0, o.pageScrollMixin)(function (t) {
      null == this.data.scrollTop && this.onScroll(t);
    }),
  ],
  data: { height: 0, fixed: !1, transform: 0 },
  mounted: function () {
    this.onScroll();
  },
  methods: {
    onScroll: function () {
      var e = this,
        o = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
        i = o.scrollTop,
        r = this.data,
        n = r.container,
        s = r.offsetTop,
        a = r.disabled;
      a
        ? this.setDataAfterDiff({ fixed: !1, transform: 0 })
        : ((this.scrollTop = i || this.scrollTop),
          "function" != typeof n
            ? this.getRect(".van-sticky").then(function (t) {
                s >= t.top
                  ? (e.setDataAfterDiff({ fixed: !0, height: t.height }),
                    (e.transform = 0))
                  : e.setDataAfterDiff({ fixed: !1 });
              })
            : Promise.all([
                this.getRect(".van-sticky"),
                this.getContainerRect(),
              ]).then(function (o) {
                var i = t(o, 2),
                  r = i[0],
                  n = i[1];
                s + r.height > n.height + n.top
                  ? e.setDataAfterDiff({
                      fixed: !1,
                      transform: n.height - r.height,
                    })
                  : s >= r.top
                  ? e.setDataAfterDiff({
                      fixed: !0,
                      height: r.height,
                      transform: 0,
                    })
                  : e.setDataAfterDiff({ fixed: !1, transform: 0 });
              }));
    },
    setDataAfterDiff: function (t) {
      var e = this;
      wx.nextTick(function () {
        var o = Object.keys(t).reduce(function (o, i) {
          return t[i] !== e.data[i] && (o[i] = t[i]), o;
        }, {});
        e.setData(o),
          e.$emit("scroll", {
            scrollTop: e.scrollTop,
            isFixed: t.fixed || e.data.fixed,
          });
      });
    },
    getContainerRect: function () {
      var t = this.data.container();
      return new Promise(function (e) {
        return t.boundingClientRect(e).exec();
      });
    },
  },
});
