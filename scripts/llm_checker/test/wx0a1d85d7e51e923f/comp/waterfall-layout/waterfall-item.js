var e = require("../../@babel/runtime/helpers/regeneratorRuntime"),
  t = require("../../@babel/runtime/helpers/asyncToGenerator"),
  r = require("../../@babel/runtime/helpers/slicedToArray"),
  n = require("./query-node");
Component({
  externalClasses: ["custom-class"],
  relations: { "./waterfall": { type: "parent", linked: function (e) {} } },
  properties: {},
  data: { itemCount: 10, name: "li", position: "left", top: -1 },
  parent: null,
  observers: {},
  lifetimes: {
    ready: function () {
      var e = this.data.itemCount,
        t = this.getRelationNodes("./waterfall"),
        n = r(t, 1)[0];
      (n.childCount += 1),
        (this.parent = n),
        this.setData({ itemCount: e + n.childCount }),
        this.setWaterfallItemPosition();
    },
  },
  methods: {
    setItemGap: function (r) {
      var n = this;
      return t(
        e().mark(function t() {
          var a, i, s, o;
          return e().wrap(function (e) {
            for (;;)
              switch ((e.prev = e.next)) {
                case 0:
                  (a = n.parent),
                    (i = a.itemGap),
                    (s = a.waterfallWidth),
                    i < 0 &&
                      r &&
                      ((o = r.width), (n.parent.itemGap = s - 2 * o));
                case 2:
                case "end":
                  return e.stop();
              }
          }, t);
        })
      )();
    },
    setWaterfallItemPosition: function () {
      var r = this;
      return t(
        e().mark(function a() {
          return e().wrap(function (a) {
            for (;;)
              switch ((a.prev = a.next)) {
                case 0:
                  (0, n.querySelector)(".waterfall-item", r).then(
                    (function () {
                      var n = t(
                        e().mark(function t(n) {
                          var a, i, s;
                          return e().wrap(function (e) {
                            for (;;)
                              switch ((e.prev = e.next)) {
                                case 0:
                                  return (e.next = 2), r.setItemGap(n);
                                case 2:
                                  return (
                                    (e.next = 4),
                                    r.parent.getWaterfallItemPostionInfo(n)
                                  );
                                case 4:
                                  (a = e.sent),
                                    (i = a.top),
                                    (s = a.position),
                                    r.setData({ top: i, position: s });
                                case 8:
                                case "end":
                                  return e.stop();
                              }
                          }, t);
                        })
                      );
                      return function (e) {
                        return n.apply(this, arguments);
                      };
                    })()
                  );
                case 1:
                case "end":
                  return a.stop();
              }
          }, a);
        })
      )();
    },
  },
});
