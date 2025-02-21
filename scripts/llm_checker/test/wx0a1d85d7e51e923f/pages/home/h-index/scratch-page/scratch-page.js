var a,
  t = (a = require("./js/scratch.js")) && a.__esModule ? a : { default: a };
getApp().BasePage({
  data: { firstTouch: 0, isOver: 0 },
  onLoad: function () {
    var a = this,
      e = {
        title: this.data.Str.cashCart[this.data.lanIndex],
        value: 1e4,
        status: "default",
        type: 1,
      };
    this.setData({ item: e }),
      new t.default(this, {
        canvasId: "#coverCanvas",
        width: 700,
        height: 300,
        maskColor: "#aaa",
        showPercent: 0.5,
        overCallBack: function () {
          a.setData({ isOver: "结束啦" });
        },
        startCallBack: function () {
          a.setData({ firstTouch: "开始刮啦" });
        },
      });
  },
  clearCanvas: function () {
    console.log("over");
  },
});
