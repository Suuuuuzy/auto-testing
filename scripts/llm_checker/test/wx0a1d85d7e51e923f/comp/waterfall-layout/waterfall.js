var t = require("../../@babel/runtime/helpers/regeneratorRuntime"),
  e = require("../../@babel/runtime/helpers/asyncToGenerator"),
  i = require("./query-node");
Component({
  externalClasses: ["custom-class"],
  properties: {
    loading: { type: Boolean, value: !1 },
    isAllLoaded: { type: Boolean, value: !1 },
    loadingText: { type: String, value: "正在加载中..." },
    allLoadedText: { type: String, value: "我是有底线的" },
    isUpdateFlow: { type: Boolean, value: !1 },
    isEmpty: { type: Boolean, value: !1 },
    emptyText: { type: String, value: "暂无数据" },
  },
  relations: {
    "./waterfall-item": {
      type: "child",
      linked: function (t) {
        this.childNumber ? (this.childNumber += 1) : (this.childNumber = 1);
      },
    },
  },
  data: { waterfallHeight: 0, isShowAllLoadedTxt: !1 },
  lifetimes: {
    ready: function () {
      this.initParams(), this.setWatefallWidth();
    },
  },
  observers: {
    isUpdateFlow: function (t) {
      var e = this;
      t &&
        ((this.childNumber = 0),
        wx.nextTick(function () {
          e.resetParam(),
            e.getRelationNodes("./waterfall-item").forEach(function (t) {
              (e.childNumber += 1), t.setWaterfallItemPosition();
            });
        }));
    },
  },
  methods: {
    handleShowAllLoadedTxt: function (t) {
      var e = this;
      this.data.isShowAllLoadedTxt !== t &&
        wx.nextTick(function () {
          setTimeout(function () {
            e.setData({ isShowAllLoadedTxt: t });
          });
        });
    },
    initParams: function () {
      (this.childCount = 0),
        (this.itemGap = -1),
        (this.waterfallWidth = -1),
        (this.leftHeights = 0),
        (this.rightHeights = 0),
        (this.watefallItemIndex = 0),
        this.setWatefallWidth();
    },
    resetParam: function () {
      (this.childCount = 0),
        (this.leftHeights = 0),
        (this.rightHeights = 0),
        (this.watefallItemIndex = 0),
        (this.childNumber = 0),
        (this.itemGap = -1);
    },
    getWaterfallItemPostionInfo: function (i) {
      var a = this;
      return e(
        t().mark(function e() {
          var r, n, l, s;
          return t().wrap(function (t) {
            for (;;)
              switch ((t.prev = t.next)) {
                case 0:
                  if (i) {
                    t.next = 2;
                    break;
                  }
                  return t.abrupt("return");
                case 2:
                  return (
                    (r = 0),
                    (n = i.height),
                    (a.watefallItemIndex += 1),
                    (l = "left"),
                    (s = a.itemGap),
                    a.leftHeights <= a.rightHeights
                      ? ((r = a.leftHeights),
                        0 === a.leftHeights
                          ? (a.leftHeights += n)
                          : ((r += s), (a.leftHeights += n + s)))
                      : ((l = "right"),
                        (r = a.rightHeights),
                        0 === a.rightHeights
                          ? (a.rightHeights += n)
                          : ((r += s), (a.rightHeights += n + s))),
                    a.setWaterfallHeight(s),
                    t.abrupt("return", { top: r, position: l })
                  );
                case 10:
                case "end":
                  return t.stop();
              }
          }, e);
        })
      )();
    },
    setWatefallWidth: function () {
      var a = this;
      return e(
        t().mark(function e() {
          var r;
          return t().wrap(function (t) {
            for (;;)
              switch ((t.prev = t.next)) {
                case 0:
                  return (
                    (t.next = 2), (0, i.querySelector)(".waterfall-inner", a)
                  );
                case 2:
                  if ((r = t.sent)) {
                    t.next = 6;
                    break;
                  }
                  return a.setWatefallWidth(), t.abrupt("return");
                case 6:
                  a.waterfallWidth = r.width;
                case 7:
                case "end":
                  return t.stop();
              }
          }, e);
        })
      )();
    },
    setWaterfallHeight: function (a) {
      var r = this;
      return e(
        t().mark(function e() {
          var n, l, s;
          return t().wrap(function (t) {
            for (;;)
              switch ((t.prev = t.next)) {
                case 0:
                  if (r.watefallItemIndex !== r.childNumber) {
                    t.next = 10;
                    break;
                  }
                  return (
                    (n = Math.ceil(
                      Math.max(r.leftHeights, r.rightHeights) + a
                    )),
                    r.setData({ waterfallHeight: n }),
                    (t.next = 5),
                    (0, i.querySelector)(".placeholder", r)
                  );
                case 5:
                  (l = t.sent),
                    (s = 0),
                    l && (s = l.height),
                    r.triggerEvent("finish", { waterfallHeight: s + n }),
                    r.handleShowAllLoadedTxt(r.data.isAllLoaded);
                case 10:
                case "end":
                  return t.stop();
              }
          }, e);
        })
      )();
    },
  },
});
