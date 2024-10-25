var e = require("../../../../../framework/index"),
  t = require("../../../../../model/lightart"),
  a = require("../../../../../model/operation/operationJumper");
(0, e.VComponent)({
  behaviors: [],
  properties: {
    needClickDialgInfo: { type: Object, value: null },
    beforePopupData: { type: Object, value: null },
    isGrayFilter: Boolean,
    scene: String,
  },
  data: { show: !1 },
  lifetimes: {
    attached: function () {
      this.initData();
    },
  },
  methods: {
    initData: function (e) {
      var t = this.data.beforePopupData;
      t && (t.titleText || t.priceText || t.tips)
        ? this.setData({ show: !0 })
        : this.close();
    },
    close: function () {
      this.setData({ show: !1 }), this.triggerEvent("closeView");
    },
    onClickBox: function () {
      var e = this.data.needClickDialgInfo,
        i = (e && e.jumper) || {},
        r = i.jumpUrl,
        o = i.targetAction,
        n = i.targetParams;
      r
        ? (0, t.laJumper)(r)
        : o &&
          n &&
          (0, a.jump)({ jumper: { targetAction: o, targetParams: n } }),
        this.close();
    },
  },
});
