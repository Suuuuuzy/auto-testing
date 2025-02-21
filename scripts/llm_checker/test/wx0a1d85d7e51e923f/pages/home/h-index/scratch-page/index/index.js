var t,
  e,
  a = (t = require("../js/scratch.js")) && t.__esModule ? t : { default: t };
Component({
  properties: {
    item: { type: Object },
    isUy: {
      type: Boolean,
      value: !0,
      observer: function (t) {
        this.setData({ lanIndex: t ? 1 : 0 });
      },
    },
    Str: { type: Object },
    lanIndex: { type: Number, value: 1 },
    isReceived: { type: Boolean, value: !1 },
    canUse: {
      type: Boolean,
      value: !0,
      observer: function (t) {
        console.log("index canuse --\x3e>", t);
      },
    },
  },
  attached: function () {
    if (((e = this), !this.properties.item)) {
      var t = {
        title: this.data.Str.cashCart[this.data.lanIndex],
        value: 1e4,
        status: "default",
        type: 1,
        tag: "ok",
        desc: "红包",
        ruleDesc: "bak yahxi",
      };
      this.setData({ item: t });
    }
    this.initScratch();
  },
  data: { firstTouch: 0, isOver: 0 },
  methods: {
    initScratch: function () {
      var t = this;
      new a.default(e, {
        canvasId: "#coverCanvas",
        width: 700,
        height: 200,
        maskColor: "#aaa",
        bgImg: "../scratch-bg.png",
        showPercent: 0.3,
        overCallBack: function () {
          t.setData({ isOver: 1 });
        },
        startCallBack: function () {
          t.setData({ firstTouch: 1 });
        },
      });
    },
    btnClick: function (t) {
      this.triggerEvent("btnClick");
    },
  },
});
