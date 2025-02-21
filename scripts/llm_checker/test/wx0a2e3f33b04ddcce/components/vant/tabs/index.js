var t = require("../../../@babel/runtime/helpers/slicedToArray"),
  e = require("../common/component"),
  n = require("../mixins/touch"),
  i = require("../common/utils");
(0, e.VantComponent)({
  mixins: [n.touch],
  classes: ["nav-class", "tab-class", "tab-active-class", "line-class"],
  relation: {
    name: "tab",
    type: "descendant",
    current: "tabs",
    linked: function (t) {
      (t.index = this.children.length - 1), this.updateTabs();
    },
    unlinked: function () {
      (this.children = this.children.map(function (t, e) {
        return (t.index = e), t;
      })),
        this.updateTabs();
    },
  },
  props: {
    sticky: Boolean,
    border: Boolean,
    swipeable: Boolean,
    titleActiveColor: String,
    titleInactiveColor: String,
    color: String,
    animated: {
      type: Boolean,
      observer: function () {
        var t = this;
        this.children.forEach(function (e, n) {
          return e.updateRender(n === t.data.currentIndex, t);
        });
      },
    },
    lineWidth: { type: [String, Number], value: 40, observer: "setLine" },
    lineHeight: { type: [String, Number], value: -1 },
    active: {
      type: [String, Number],
      value: 0,
      observer: function (t) {
        t !== this.getCurrentName() && this.setCurrentIndexByName(t);
      },
    },
    type: { type: String, value: "line" },
    ellipsis: { type: Boolean, value: !0 },
    duration: { type: Number, value: 0.3 },
    zIndex: { type: Number, value: 1 },
    swipeThreshold: {
      type: Number,
      value: 5,
      observer: function (t) {
        this.setData({
          scrollable: this.children.length > t || !this.data.ellipsis,
        });
      },
    },
    offsetTop: { type: Number, value: 0 },
    lazyRender: { type: Boolean, value: !0 },
  },
  data: {
    tabs: [],
    lineStyle: "",
    scrollLeft: 0,
    scrollable: !1,
    trackStyle: "",
    currentIndex: 0,
    container: null,
    skipTransition: !0,
    lineOffsetLeft: 0,
  },
  mounted: function () {
    var t = this;
    wx.nextTick(function () {
      t.setLine(!0), t.scrollIntoView();
    });
  },
  methods: {
    updateContainer: function () {
      var t = this;
      this.setData({
        container: function () {
          return t.createSelectorQuery().select(".van-tabs");
        },
      });
    },
    updateTabs: function () {
      var t = this.children,
        e = void 0 === t ? [] : t,
        n = this.data;
      this.setData({
        tabs: e.map(function (t) {
          return t.data;
        }),
        scrollable: this.children.length > n.swipeThreshold || !n.ellipsis,
      }),
        this.setCurrentIndexByName(this.getCurrentName() || n.active);
    },
    trigger: function (t, e) {
      var n = this.data.currentIndex,
        a = e || this.children[n];
      (0, i.isDef)(a) &&
        this.$emit(t, {
          index: a.index,
          name: a.getComputedName(),
          title: a.data.title,
        });
    },
    onTap: function (t) {
      var e = this,
        n = t.currentTarget.dataset.index,
        i = this.children[n];
      i.data.disabled
        ? this.trigger("disabled", i)
        : (this.setCurrentIndex(n),
          wx.nextTick(function () {
            e.trigger("click");
          }));
    },
    setCurrentIndexByName: function (t) {
      var e = this.children,
        n = (void 0 === e ? [] : e).filter(function (e) {
          return e.getComputedName() === t;
        });
      n.length && this.setCurrentIndex(n[0].index);
    },
    setCurrentIndex: function (t) {
      var e = this,
        n = this.data,
        a = this.children,
        r = void 0 === a ? [] : a;
      if (
        !(!(0, i.isDef)(t) || t >= r.length || t < 0) &&
        (r.forEach(function (n, i) {
          var a = i === t;
          (a === n.data.active && n.inited) || n.updateRender(a, e);
        }),
        t !== n.currentIndex)
      ) {
        var s = null !== n.currentIndex;
        this.setData({ currentIndex: t }),
          wx.nextTick(function () {
            e.setLine(),
              e.scrollIntoView(),
              e.updateContainer(),
              e.trigger("input"),
              s && e.trigger("change");
          });
      }
    },
    getCurrentName: function () {
      var t = this.children[this.data.currentIndex];
      if (t) return t.getComputedName();
    },
    setLine: function () {
      var e = this,
        n = arguments.length > 0 && void 0 !== arguments[0] && arguments[0];
      if ("line" === this.data.type) {
        var a = this.data.currentIndex;
        Promise.all([
          i.getAllRect.call(this, ".van-tab"),
          i.getRect.call(this, ".van-tabs__line"),
        ]).then(function (i) {
          var r = t(i, 2),
            s = r[0],
            l = void 0 === s ? [] : s,
            o = r[1],
            c = l[a];
          if (null != c) {
            var u = l.slice(0, a).reduce(function (t, e) {
              return t + e.width;
            }, 0);
            (u += (c.width - o.width) / 2),
              e.setData({ lineOffsetLeft: u, skipTransition: n });
          }
        });
      }
    },
    scrollIntoView: function () {
      var e = this,
        n = this.data,
        a = n.currentIndex;
      n.scrollable &&
        Promise.all([
          i.getAllRect.call(this, ".van-tab"),
          i.getRect.call(this, ".van-tabs__nav"),
        ]).then(function (n) {
          var i = t(n, 2),
            r = i[0],
            s = i[1],
            l = r[a],
            o = r.slice(0, a).reduce(function (t, e) {
              return t + e.width;
            }, 0);
          e.setData({ scrollLeft: o - (s.width - l.width) / 2 });
        });
    },
    onTouchScroll: function (t) {
      this.$emit("scroll", t.detail);
    },
    onTouchStart: function (t) {
      this.data.swipeable && this.touchStart(t);
    },
    onTouchMove: function (t) {
      this.data.swipeable && this.touchMove(t);
    },
    onTouchEnd: function () {
      if (this.data.swipeable) {
        var t = this.direction,
          e = this.deltaX,
          n = this.offsetX;
        if ("horizontal" === t && n >= 50) {
          var i = this.getAvaiableTab(e);
          -1 !== i && this.setCurrentIndex(i);
        }
      }
    },
    getAvaiableTab: function (t) {
      for (
        var e = this.data,
          n = e.tabs,
          i = e.currentIndex,
          a = t > 0 ? -1 : 1,
          r = a;
        i + r < n.length && i + r >= 0;
        r += a
      ) {
        var s = i + r;
        if (s >= 0 && s < n.length && n[s] && !n[s].disabled) return s;
      }
      return -1;
    },
  },
});
