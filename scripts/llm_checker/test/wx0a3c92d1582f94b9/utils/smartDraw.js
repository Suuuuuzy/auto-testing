var e = require("../@babel/runtime/helpers/regeneratorRuntime"),
  t = require("../@babel/runtime/helpers/createForOfIteratorHelper"),
  n = require("../@babel/runtime/helpers/asyncToGenerator");
!(function () {
  var r,
    a,
    o,
    i,
    s,
    c = require("./getImageDatas"),
    h = require("./findAnchors");
  function u(e, t) {
    return l.apply(this, arguments);
  }
  function l() {
    return (l = n(
      e().mark(function t(n, c) {
        return e().wrap(function (e) {
          for (;;)
            switch ((e.prev = e.next)) {
              case 0:
                return (
                  (o = n.imageInfos),
                  (i = n.anchors),
                  (e.next = 4),
                  (function (e, t, n) {
                    return new Promise(function (a, o) {
                      var i,
                        c = e[0].width / 2,
                        h = 0;
                      console.log("canvas width, height:", c, h),
                        n.setData({ cWidth: c, cHeight: e[0].height }),
                        console.log(e);
                      for (var u = 0; u < e.length; u++) {
                        var l = e[u],
                          f = Math.floor(l.width),
                          g = Math.floor(t[u].tail - t[u].head),
                          d = Math.floor(t[u].head),
                          p = 0,
                          m = Math.floor(h),
                          w = Math.floor(f / 2),
                          v = Math.floor(g / 2);
                        console.log("sx,sy:", 0, d, " sWidth,sHeight:", f, g),
                          console.log("dx,dy:", p, m, "dWidth,dHeight:", w, v),
                          r.drawImage(l.path, 0, d, f, g, p, m, w, v),
                          (h += v);
                      }
                      console.log("canvas size:", c, h),
                        n.setData({ cHeight: h }),
                        s
                          ? ((i = { src: s }),
                            new Promise(function (e, t) {
                              wx.getImageInfo({
                                src: i.src,
                                success: e,
                                fail: t,
                                complete: function (e) {
                                  i.complete && i.complete(e);
                                },
                              });
                            })).then(function (e) {
                              (v = ((w = 100) * e.height) / e.width),
                                (p = 10),
                                (m = h - 15 - 0 - v),
                                r.drawImage(s, p, m, w, v),
                                setTimeout(function () {
                                  r.draw(!0, function () {
                                    a();
                                  });
                                }, 100);
                            })
                          : setTimeout(function () {
                              r.draw(!0, function () {
                                a();
                              });
                            }, 100);
                    });
                  })(o, i, c)
                );
              case 4:
                return (
                  (e.next = 6),
                  new Promise(function (e, t) {
                    setTimeout(function () {
                      wx.canvasToTempFilePath({
                        canvasId: a,
                        quality: 1,
                        x: 0,
                        y: 0,
                        fileType: "jpg",
                        success: function (t) {
                          e(t);
                        },
                        fail: function (e) {
                          t(e);
                        },
                      });
                    }, 0);
                  })
                );
              case 6:
                return e.abrupt("return", e.sent);
              case 7:
              case "end":
                return e.stop();
            }
        }, t);
      })
    )).apply(this, arguments);
  }
  module.exports = (function () {
    var o = n(
      e().mark(function n(o, i) {
        var l, f, g, d, p, m, w, v, x, y, I;
        return e().wrap(function (e) {
          for (;;)
            switch ((e.prev = e.next)) {
              case 0:
                return (
                  (a = o.canvasId),
                  (r = wx.createCanvasContext(a)),
                  (l = o.images),
                  (s = o.watermark),
                  (e.next = 5),
                  c({ canvasId: a, images: l, scaleRatio: 4 }, i)
                );
              case 5:
                if (
                  (function (e) {
                    var n,
                      r = e[0].width,
                      a = e[0].height,
                      o = t(e);
                    try {
                      for (o.s(); !(n = o.n()).done; ) {
                        var i = n.value;
                        if (i.width != r || i.height != a) return !1;
                      }
                    } catch (e) {
                      o.e(e);
                    } finally {
                      o.f();
                    }
                    return !0;
                  })((f = e.sent))
                ) {
                  e.next = 8;
                  break;
                }
                throw { type: "size error", msg: "sizes are not available" };
              case 8:
                for (
                  g = new Date(),
                    d = h(f),
                    p = new Date(),
                    console.log("imageDatas:", f),
                    console.log("points:", d),
                    console.log("find anchor time:", p - g),
                    m = [],
                    w = 0;
                  w < f.length;
                  w++
                )
                  (v = f[w]),
                    m.push({
                      height: 4 * v.height,
                      width: 4 * v.width,
                      path: l[w],
                    });
                x = t(d);
                try {
                  for (x.s(); !(y = x.n()).done; )
                    ((I = y.value).head = Math.floor(4 * I.head + 2)),
                      (I.tail = Math.floor(4 * I.tail + 2));
                } catch (e) {
                  x.e(e);
                } finally {
                  x.f();
                }
                return (
                  (e.next = 15),
                  u({ imageInfos: m, canvasId: a, anchors: d }, i)
                );
              case 15:
                return e.abrupt("return", e.sent.tempFilePath);
              case 16:
              case "end":
                return e.stop();
            }
        }, n);
      })
    );
    return function (e, t) {
      return o.apply(this, arguments);
    };
  })();
})();
