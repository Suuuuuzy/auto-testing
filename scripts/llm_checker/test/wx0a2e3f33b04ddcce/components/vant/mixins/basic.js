Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.basic = void 0);
exports.basic = Behavior({
  methods: {
    $emit: function () {
      this.triggerEvent.apply(this, arguments);
    },
    set: function (e, t) {
      return (
        this.setData(e, t),
        new Promise(function (e) {
          return wx.nextTick(e);
        })
      );
    },
    getRect: function (e, t) {
      var i = this;
      return new Promise(function (n) {
        wx.createSelectorQuery()
          .in(i)
          [t ? "selectAll" : "select"](e)
          .boundingClientRect(function (e) {
            t && Array.isArray(e) && e.length && n(e), !t && e && n(e);
          })
          .exec();
      });
    },
  },
});
