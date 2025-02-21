(global.webpackJsonp = global.webpackJsonp || []).push([
  ["baseComponents/wxIndexBar/index"],
  {
    "0361": function (t, e, n) {
      "use strict";
      var i = n("7140");
      n.n(i).a;
    },
    7140: function (t, e, n) {},
    "92b7": function (t, e, n) {
      "use strict";
      n.r(e);
      var i = n("e127"),
        o = n("f8f8");
      for (var r in o)
        ["default"].indexOf(r) < 0 &&
          (function (t) {
            n.d(e, t, function () {
              return o[t];
            });
          })(r);
      n("0361");
      var c = n("f0c5"),
        a = Object(c.a)(
          o.default,
          i.b,
          i.c,
          !1,
          null,
          null,
          null,
          !1,
          i.a,
          void 0
        );
      e.default = a.exports;
    },
    e127: function (t, e, n) {
      "use strict";
      n.d(e, "b", function () {
        return i;
      }),
        n.d(e, "c", function () {
          return o;
        }),
        n.d(e, "a", function () {});
      var i = function () {
          this.$createElement, this._self._c;
        },
        o = [];
    },
    ebe0: function (t, e, n) {
      "use strict";
      (function (t) {
        var i = n("4ea4");
        Object.defineProperty(e, "__esModule", { value: !0 }),
          (e.default = void 0);
        var o = i(n("9523")),
          r = i(n("2309")),
          c = [],
          a = [],
          s = {
            props: {
              sticky: { type: Boolean, default: !0 },
              stickyCate: { type: Boolean, default: !0 },
              wrapperStyle: { type: String, default: "" },
              variable: { type: Number, default: 0 },
              activityEntryHeight: { type: Number, default: 0 },
              zIndex: { type: Number, default: 1 },
              highlightColor: { type: String, default: "red" },
              stickyOffsetTop: { type: Number, default: 0 },
              indexList: {
                type: Array,
                default: function () {
                  return [1, 2];
                },
              },
              isAnimation: { type: Boolean, default: !1 },
            },
            watch: {
              indexList: function () {
                this.updateData();
              },
            },
            data: function () {
              return {
                activeAnchorIndex: null,
                activeAnchor2Index: null,
                showSidebar: !0,
                scrollTops: 0,
                anchorTop: 0,
                gloHeight: 0,
                timerState: null,
              };
            },
            computed: {
              durationTime: function () {
                return this.isAnimation ? 300 : 0;
              },
            },
            methods: {
              resizePage: function () {
                var t = this;
                this.timerState = setInterval(function () {
                  t.getRect("#wrapperHao").then(function (e) {
                    e &&
                      ((t.gloHeight == e.height && 0 != t.gloHeight) ||
                        ((t.gloHeight = e.height), t.updateData()));
                  });
                }, 2e3);
              },
              updateData: function () {
                var t = this;
                (this.showSidebar = !!this.$children.length),
                  (c = this.$children.filter(function (t) {
                    return "indexAnchor" === t.nodeName;
                  })),
                  (a = this.$children.filter(function (t) {
                    return "indexAnchor2" === t.nodeName;
                  })),
                  this.setRect().then(function () {
                    t.onScroll({ scrollTop: t.scrollTops }),
                      t.onScrollSecNode({ scrollTop: t.scrollTops });
                  });
              },
              getRect: function (e, n) {
                var i = this;
                return new Promise(function (o) {
                  t.createSelectorQuery()
                    .in(i)
                    [n ? "selectAll" : "select"](e)
                    .boundingClientRect(function (t) {
                      n && Array.isArray(t) && t.length && o(t),
                        !n && t && o(t);
                    })
                    .exec();
                });
              },
              setRect: function () {
                return Promise.all([
                  this.setAnchorsRect(),
                  this.setAnchors2Rect(),
                  this.setListRect(),
                ]);
              },
              setAnchorsRect: function () {
                var t = this;
                return Promise.all(
                  c.reduce(function (e, n, i) {
                    return (
                      "indexAnchor" === n.nodeName &&
                        e.push(
                          n
                            .getRect(".wx-index-anchor-wrapper")
                            .then(function (e) {
                              if (Array.isArray(e)) {
                                if (!e[0]) return;
                                (n.height = e[0][n.index].height),
                                  (n.top = e[0][n.index].top + t.scrollTops);
                              } else (n.height = e.height), (n.top = e.top + t.scrollTops);
                            })
                        ),
                      e
                    );
                  }, [])
                );
              },
              setAnchors2Rect: function () {
                var t = this;
                return Promise.all(
                  a.reduce(function (e, n, i) {
                    return (
                      "indexAnchor2" === n.nodeName &&
                        e.push(
                          n
                            .getRect(".wx-index-anchor-wrapper-sec")
                            .then(function (e) {
                              if (Array.isArray(e)) {
                                if (!e[0]) return;
                                (n.height = e[0][n.index].height),
                                  (n.top = e[0][n.index].top + t.scrollTops);
                              } else (n.height = e.height), (n.top = e.top + t.scrollTops);
                            })
                        ),
                      e
                    );
                  }, [])
                );
              },
              setListRect: function () {
                var t = this;
                return this.getRect(".wx-index-bar").then(function (e) {
                  Object.assign(t, {
                    height: e.height,
                    top: e.top + t.scrollTops,
                  });
                });
              },
              getActiveAnchorIndex: function (t) {
                var e = c;
                t = t - this.variable + 1;
                for (var n = e.length - 1; n >= 0; n--)
                  if (t >= e[n].top) return n;
                return -1;
              },
              getActiveAnchor2Index: function (t) {
                var e = a;
                t = t - this.variable + 82;
                for (var n = e.length - 1; n >= 0; n--)
                  if (t >= e[n].top) return n;
                return -1;
              },
              onScroll: function (t) {
                var e = this;
                if (
                  (this.onScrollSecNode(t),
                  this.$children.filter(function (t) {
                    return "indexAnchor" === t.nodeName;
                  }).length)
                ) {
                  var n = t.scrollTop,
                    i = this.getActiveAnchorIndex(n);
                  (this.scrollTops = n),
                    this.activeAnchorIndex !== i &&
                      ((this.activeAnchorIndex = i),
                      this.noScrollEmit ||
                        setTimeout(function () {
                          e.$emit("select", i);
                        }));
                }
              },
              onScrollSecNode: function (t) {
                var e = this;
                if (
                  this.$children.filter(function (t) {
                    return "indexAnchor2" === t.nodeName;
                  }).length
                ) {
                  var n = t.scrollTop,
                    i = this.getActiveAnchor2Index(n);
                  (this.scrollTops = n),
                    this.activeAnchor2Index !== i &&
                      ((this.activeAnchor2Index = i),
                      this.noScrollEmit ||
                        setTimeout(function () {
                          e.$emit("selectSecNode", i);
                        }));
                }
              },
              onClick: function (t) {
                this.scrollToAnchor(t);
              },
              onClickSecNode: function (t) {
                this.scrollToAnchor2(t);
              },
              scrollToAnchor: function (t) {
                var e = this;
                if (this.activeAnchorIndex !== t) {
                  var n,
                    i = c.find(function (e) {
                      return e.index == t;
                    });
                  (n =
                    this.activityEntryHeight > 0 && 0 == t
                      ? this.activityEntryHeight
                      : 0),
                    i &&
                      (i.top,
                      this.isAnimation &&
                        ((this.noScrollEmit = !0),
                        setTimeout(function () {
                          e.noScrollEmit = !1;
                        }, 600)),
                      this.$emit("select", t),
                      (this.activeAnchorIndex = t),
                      this.$nextTick(function () {
                        wx.pageScrollTo({
                          selector: "#dish>>>#wx" + t,
                          offsetTop: e.variable - n + 4,
                          duration: e.durationTime,
                        });
                      }));
                }
              },
              scrollToAnchor2: function (t) {
                var e = this;
                if (this.activeAnchor2Index !== t) {
                  var n,
                    i = a.find(function (e) {
                      return e.index == t;
                    });
                  (n =
                    this.activityEntryHeight > 0 && 0 == t
                      ? this.activityEntryHeight
                      : 0),
                    i &&
                      (i.top,
                      this.isAnimation &&
                        ((this.noScrollEmit = !0),
                        setTimeout(function () {
                          e.noScrollEmit = !1;
                        }, 600)),
                      this.$emit("selectSecNode", t),
                      (this.activeAnchor2Index = t),
                      this.$nextTick(function () {
                        wx.pageScrollTo({
                          selector: "#dish>>>#wxsec" + t,
                          offsetTop: e.variable - n - (e.stickyCate ? 73 : 0),
                          duration: e.durationTime,
                        });
                      }));
                }
              },
              createEventGroup: function () {
                var t = this,
                  e = "dynamicallyComputedNodeHeight",
                  n = function () {
                    t.resizePage();
                  };
                n(),
                  r.default.setPageShow((0, o.default)({}, e, n)),
                  r.default.setPageOnUnload(
                    (0, o.default)({}, e, function () {
                      clearInterval(t.timerState);
                    })
                  ),
                  r.default.setPageHide(
                    (0, o.default)({}, e, function () {
                      clearInterval(t.timerState);
                    })
                  );
              },
            },
            mounted: function () {
              this.createEventGroup();
            },
          };
        e.default = s;
      }).call(this, n("543d").default);
    },
    f8f8: function (t, e, n) {
      "use strict";
      n.r(e);
      var i = n("ebe0"),
        o = n.n(i);
      for (var r in i)
        ["default"].indexOf(r) < 0 &&
          (function (t) {
            n.d(e, t, function () {
              return i[t];
            });
          })(r);
      e.default = o.a;
    },
  },
]),
  (global.webpackJsonp = global.webpackJsonp || []).push([
    "baseComponents/wxIndexBar/index-create-component",
    {
      "baseComponents/wxIndexBar/index-create-component": function (t, e, n) {
        n("543d").createComponent(n("92b7"));
      },
    },
    [["baseComponents/wxIndexBar/index-create-component"]],
  ]);
