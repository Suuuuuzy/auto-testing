var e,
  t = require("../../@babel/runtime/helpers/objectSpread2"),
  i = (e = require("../../utils/util")) && e.__esModule ? e : { default: e };
Component({
  options: { addGlobalClass: !0 },
  properties: {
    id: {
      type: String,
      value: "",
      observer: function (e) {
        var t;
        this.genIndependentID(e),
          null !== (t = this.properties.thresholds) &&
            void 0 !== t &&
            t.length &&
            this.createIntersectionObserverHandle();
      },
    },
    data: {
      type: Object,
      observer: function (e) {
        if (e) {
          var t = this.initActivity(e),
            i = 0;
          if (t) {
            var n = this.getSecond(e.activity_end_time);
            ((i = parseInt(1e3 * n)) > 432e5 || i < 0) && (i = 0);
          }
          this.setData({ goods: e, isValidityLinePrice: t, time: i });
        }
      },
    },
    currency: { type: String, value: "¥" },
    isUy: { type: Boolean, value: !1 },
    thresholds: {
      type: Array,
      value: [],
      observer: function (e) {
        e && e.length
          ? this.createIntersectionObserverHandle()
          : this.clearIntersectionObserverHandle();
      },
    },
  },
  data: { independentID: "", goods: { id: "" }, isValidityLinePrice: !1 },
  lifetimes: {
    ready: function () {
      this.init();
    },
    detached: function () {
      this.clear();
    },
  },
  pageLifeTimes: {},
  methods: {
    clickHandle: function () {
      this.triggerEvent("click", { goods: this.data.goods });
    },
    clickThumbHandle: function () {
      this.triggerEvent("thumb", { goods: this.data.goods });
    },
    addCartHandle: function (e) {
      var i = e.currentTarget.id,
        n = e.currentTarget.dataset.id;
      this.triggerEvent(
        "add-cart",
        t(t({}, e.detail), {}, { id: i, cardID: n, goods: this.data.goods })
      );
    },
    genIndependentID: function (e) {
      var t;
      (t = e || "goods-card-".concat(~~(Math.random() * Math.pow(10, 8)))),
        this.setData({ independentID: t });
    },
    initActivity: function (e) {
      if (
        !e.activity_start_time ||
        !e.activity_end_time ||
        e.activity_price <= 0
      )
        return !1;
      var t = i.default.formatTime(new Date()),
        n = i.default.formatTime(new Date(e.activity_start_time)),
        r = i.default.formatTime(new Date(e.activity_end_time));
      return t > n && t < r;
    },
    init: function () {
      var e = this.properties,
        t = e.thresholds,
        i = e.id;
      this.genIndependentID(i),
        t && t.length && this.createIntersectionObserverHandle();
    },
    clear: function () {
      this.clearIntersectionObserverHandle();
    },
    getSecond: function (e) {
      var t =
        arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : null;
      if (!e) return 0;
      var i = t ? new Date(t.replace(/-/g, "/")) : new Date(),
        n = new Date(e.replace(/-/g, "/"));
      return (n.getTime() - i.getTime()) / 1e3;
    },
    intersectionObserverContext: null,
    createIntersectionObserverHandle: function () {
      var e = this;
      !this.intersectionObserverContext &&
        this.data.independentID &&
        ((this.intersectionObserverContext = this.createIntersectionObserver({
          thresholds: this.properties.thresholds,
        }).relativeToViewport()),
        this.intersectionObserverContext.observe(
          "#".concat(this.data.independentID),
          function (t) {
            e.intersectionObserverCB(t);
          }
        ));
    },
    intersectionObserverCB: function () {
      this.triggerEvent("ob", {
        goods: this.data.goods,
        context: this.intersectionObserverContext,
      });
    },
    clearIntersectionObserverHandle: function () {
      if (this.intersectionObserverContext) {
        try {
          this.intersectionObserverContext.disconnect();
        } catch (e) {}
        this.intersectionObserverContext = null;
      }
    },
  },
});
