var e = require("../@babel/runtime/helpers/regeneratorRuntime"),
  t = require("../@babel/runtime/helpers/createForOfIteratorHelper"),
  n = require("../@babel/runtime/helpers/asyncToGenerator");
!(function () {
  var a,
    r,
    o = 1;
  function i(e) {
    return new Promise(function (t, n) {
      wx.getImageInfo({
        src: e.src,
        success: function (e) {
          t(e);
        },
        fail: function (e) {
          n(e);
        },
        complete: function (t) {
          e.complete && e.complete(t);
        },
      });
    });
  }
  function c(e) {
    return new Promise(function (t, n) {
      wx.canvasGetImageData({
        canvasId: e.canvasId,
        height: e.height,
        width: e.width,
        x: e.x,
        y: e.y,
        success: function (e) {
          t(e);
        },
        fail: function (e) {
          n(e);
        },
      });
    });
  }
  module.exports = (function () {
    var s = n(
      e().mark(function n(s, u) {
        var l, h, f, g, m, w, v;
        return e().wrap(function (e) {
          for (;;)
            switch ((e.prev = e.next)) {
              case 0:
                return (
                  console.log("call getImageDatas"),
                  (r = s.canvasId),
                  (o = null == s.scaleRatio ? o : s.scaleRatio),
                  (l = s.images),
                  (a = wx.createCanvasContext(r)),
                  (h = new Date()),
                  (e.next = 6),
                  (function (e) {
                    return new Promise(function (t, n) {
                      for (
                        var a = null == e.images ? "" : e.images, r = [], o = 0;
                        o < a.length;
                        o++
                      )
                        r[o] = i({ src: a[o] });
                      Promise.all(r)
                        .then(function (e) {
                          t(e);
                        })
                        .catch(function (e) {
                          n(e);
                        });
                    });
                  })({ images: l })
                );
              case 6:
                return (
                  (f = e.sent),
                  (g = new Date()),
                  (e.next = 10),
                  (function (e, n) {
                    return new Promise(function (r, i) {
                      var c,
                        s = 0,
                        u = 0,
                        l = t(e);
                      try {
                        for (l.s(); !(c = l.n()).done; ) {
                          var h = c.value;
                          h.width > s && (s = h.width), (u += h.height);
                        }
                      } catch (e) {
                        l.e(e);
                      } finally {
                        l.f();
                      }
                      (s = Math.floor(s / o)),
                        (u = Math.floor(u / o)),
                        console.log("canvas width, height:", s, u),
                        n.setData({ cWidth: s, cHeight: u });
                      for (var f = 0, g = 0; g < e.length; g++) {
                        h = e[g];
                        var m = Math.floor(h.width / o),
                          w = Math.floor(h.height / o);
                        a.drawImage(h.path, 0, f, m, w), (f += w);
                      }
                      a.draw(!0, function () {
                        r();
                      });
                    });
                  })(f, u)
                );
              case 10:
                return (
                  (m = new Date()),
                  (e.next = 13),
                  (function (e) {
                    for (var t = [], n = 0, a = 0; a < e.length; a++) {
                      var i = e[a],
                        s = Math.floor(i.width / o),
                        u = Math.floor(i.height / o);
                      (t[a] = c({
                        canvasId: r,
                        x: 0,
                        y: n,
                        width: s,
                        height: u,
                      })),
                        (n += u);
                    }
                    return Promise.all(t);
                  })(f)
                );
              case 13:
                return (
                  (w = e.sent),
                  (v = new Date()),
                  e.abrupt(
                    "return",
                    (console.log("getImageInfo Time:", g - h),
                    console.log("drawToCanvas Time:", m - g),
                    console.log("getImageDataFromCanvas Time:", v - m),
                    w)
                  )
                );
              case 16:
              case "end":
                return e.stop();
            }
        }, n);
      })
    );
    return function (e, t) {
      return s.apply(this, arguments);
    };
  })();
})();
