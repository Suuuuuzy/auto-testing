var t,
  e = require("../../@babel/runtime/helpers/typeof");
(t = function () {
  var t = void 0,
    o = ["touchstarted", "touchmoved", "touchended"];
  function n(t) {
    return "function" == typeof t;
  }
  function r(t) {
    for (var e = [], n = arguments.length - 1; n-- > 0; )
      e[n] = arguments[n + 1];
    o.forEach(function (o, n) {
      void 0 !== e[n] && (t[o] = e[n]);
    });
  }
  var a = {},
    i = {
      id: {
        default: "cropper",
        get: function () {
          return a.id;
        },
        set: function (t) {
          "string" != typeof t && console.error("id：" + t + " is invalid"),
            (a.id = t);
        },
      },
      width: {
        default: 750,
        get: function () {
          return a.width;
        },
        set: function (t) {
          "number" != typeof t && console.error("width：" + t + " is invalid"),
            (a.width = t);
        },
      },
      height: {
        default: 750,
        get: function () {
          return a.height;
        },
        set: function (t) {
          "number" != typeof t && console.error("height：" + t + " is invalid"),
            (a.height = t);
        },
      },
      scale: {
        default: 2.5,
        get: function () {
          return a.scale;
        },
        set: function (t) {
          "number" != typeof t && console.error("scale：" + t + " is invalid"),
            (a.scale = t);
        },
      },
      zoom: {
        default: 5,
        get: function () {
          return a.zoom;
        },
        set: function (t) {
          "number" != typeof t
            ? console.error("zoom：" + t + " is invalid")
            : (t < 0 || t > 10) &&
              console.error("zoom should be ranged in 0 ~ 10"),
            (a.zoom = t);
        },
      },
      src: {
        default: "cropper",
        get: function () {
          return a.src;
        },
        set: function (t) {
          "string" != typeof t && console.error("id：" + t + " is invalid"),
            (a.src = t);
        },
      },
      cut: {
        default: {},
        get: function () {
          return a.cut;
        },
        set: function (t) {
          "object" !== e(t) && console.error("id：" + t + " is invalid"),
            (a.cut = t);
        },
      },
      onReady: {
        default: null,
        get: function () {
          return a.ready;
        },
        set: function (t) {
          a.ready = t;
        },
      },
      onBeforeImageLoad: {
        default: null,
        get: function () {
          return a.beforeImageLoad;
        },
        set: function (t) {
          a.beforeImageLoad = t;
        },
      },
      onImageLoad: {
        default: null,
        get: function () {
          return a.imageLoad;
        },
        set: function (t) {
          a.imageLoad = t;
        },
      },
      onBeforeDraw: {
        default: null,
        get: function () {
          return a.beforeDraw;
        },
        set: function (t) {
          a.beforeDraw = t;
        },
      },
    },
    c =
      "undefined" != typeof window
        ? window
        : "undefined" != typeof global
        ? global
        : "undefined" != typeof self
        ? self
        : {},
    s = (function (t, e) {
      return t((e = { exports: {} }), e.exports), e.exports;
    })(function (t, o) {
      /*! http://mths.be/base64 v0.1.0 by @mathias | MIT license */
      !(function (n) {
        var r = o,
          a = t && t.exports == r && t,
          i = "object" == e(c) && c;
        (i.global !== i && i.window !== i) || (n = i);
        var s = function (t) {
          this.message = t;
        };
        (s.prototype = new Error()).name = "InvalidCharacterError";
        var u = function (t) {
            throw new s(t);
          },
          h =
            "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",
          d = /[\t\n\f\r ]/g,
          f = {
            encode: function (t) {
              (t = String(t)),
                /[^\0-\xFF]/.test(t) &&
                  u(
                    "The string to be encoded contains characters outside of the Latin1 range."
                  );
              for (
                var e,
                  o,
                  n,
                  r,
                  a = t.length % 3,
                  i = "",
                  c = -1,
                  s = t.length - a;
                ++c < s;

              )
                (e = t.charCodeAt(c) << 16),
                  (o = t.charCodeAt(++c) << 8),
                  (n = t.charCodeAt(++c)),
                  (i +=
                    h.charAt(((r = e + o + n) >> 18) & 63) +
                    h.charAt((r >> 12) & 63) +
                    h.charAt((r >> 6) & 63) +
                    h.charAt(63 & r));
              return (
                2 == a
                  ? ((e = t.charCodeAt(c) << 8),
                    (o = t.charCodeAt(++c)),
                    (i +=
                      h.charAt((r = e + o) >> 10) +
                      h.charAt((r >> 4) & 63) +
                      h.charAt((r << 2) & 63) +
                      "="))
                  : 1 == a &&
                    ((r = t.charCodeAt(c)),
                    (i += h.charAt(r >> 2) + h.charAt((r << 4) & 63) + "==")),
                i
              );
            },
            decode: function (t) {
              var e = (t = String(t).replace(d, "")).length;
              e % 4 == 0 && (e = (t = t.replace(/==?$/, "")).length),
                (e % 4 == 1 || /[^+a-zA-Z0-9/]/.test(t)) &&
                  u(
                    "Invalid character: the string to be decoded is not correctly encoded."
                  );
              for (var o, n, r = 0, a = "", i = -1; ++i < e; )
                (n = h.indexOf(t.charAt(i))),
                  (o = r % 4 ? 64 * o + n : n),
                  r++ % 4 &&
                    (a += String.fromCharCode(255 & (o >> ((-2 * r) & 6))));
              return a;
            },
            version: "0.1.0",
          };
        if (r && !r.nodeType)
          if (a) a.exports = f;
          else for (var l in f) f.hasOwnProperty(l) && (r[l] = f[l]);
        else n.base64 = f;
      })(c);
    });
  function u(t) {
    var e = "";
    if ("string" == typeof t) e = t;
    else for (var o = 0; o < t.length; o++) e += String.fromCharCode(t[o]);
    return s.encode(e);
  }
  function h(t, e, o, r, a, i, c) {
    void 0 === c && (c = function () {}),
      void 0 === i && (i = "png"),
      (i = (function (t) {
        return (
          "image/" +
          (t = t.toLowerCase().replace(/jpg/i, "jpeg")).match(
            /png|jpeg|bmp|gif/
          )[0]
        );
      })(i)),
      /bmp/.test(i)
        ? (function (t, e, o, n, r, a) {
            wx.canvasGetImageData({
              canvasId: t,
              x: e,
              y: o,
              width: n,
              height: r,
              success: function (t) {
                a(t);
              },
              fail: function (t) {
                a(null), console.error("canvasGetImageData error: " + t);
              },
            });
          })(t, e, o, r, a, function (t) {
            var e = (function (t) {
              var e = t.width,
                o = t.height,
                n = e * o * 3,
                r = n + 54,
                a = [
                  66,
                  77,
                  255 & r,
                  (r >> 8) & 255,
                  (r >> 16) & 255,
                  (r >> 24) & 255,
                  0,
                  0,
                  0,
                  0,
                  54,
                  0,
                  0,
                  0,
                ],
                i = [
                  40,
                  0,
                  0,
                  0,
                  255 & e,
                  (e >> 8) & 255,
                  (e >> 16) & 255,
                  (e >> 24) & 255,
                  255 & o,
                  (o >> 8) & 255,
                  (o >> 16) & 255,
                  (o >> 24) & 255,
                  1,
                  0,
                  24,
                  0,
                  0,
                  0,
                  0,
                  0,
                  255 & n,
                  (n >> 8) & 255,
                  (n >> 16) & 255,
                  (n >> 24) & 255,
                  0,
                  0,
                  0,
                  0,
                  0,
                  0,
                  0,
                  0,
                  0,
                  0,
                  0,
                  0,
                  0,
                  0,
                  0,
                  0,
                ],
                c = (4 - ((3 * e) % 4)) % 4,
                s = t.data,
                h = "",
                d = e << 2,
                f = o,
                l = String.fromCharCode;
              do {
                for (var g = d * (f - 1), v = "", p = 0; p < e; p++) {
                  var y = p << 2;
                  v += l(s[g + y + 2]) + l(s[g + y + 1]) + l(s[g + y]);
                }
                for (var x = 0; x < c; x++) v += String.fromCharCode(0);
                h += v;
              } while (--f);
              return u(a.concat(i)) + u(h);
            })(t);
            n(c) &&
              c(
                (function (t, e) {
                  return "data:" + e + ";base64," + t;
                })(e, "image/" + i)
              );
          })
        : console.error("暂不支持生成'" + i + "'类型的base64图片");
  }
  var d = function (t, e) {
      return (
        void 0 === t && (t = {}),
        void 0 === e && (e = function () {}),
        h(t.canvasId, t.x, t.y, t.width, t.height, "bmp", e)
      );
    },
    f = {
      touchStart: function (t) {
        var e = t.touches,
          o = e[0],
          n = e[1];
        r(this, !0, null, null),
          this.__oneTouchStart(o),
          t.touches.length >= 2 && this.__twoTouchStart(o, n);
      },
      touchMove: function (t) {
        var e = t.touches,
          o = e[0],
          n = e[1];
        r(this, null, !0),
          1 === t.touches.length && this.__oneTouchMove(o),
          t.touches.length >= 2 && this.__twoTouchMove(o, n);
      },
      touchEnd: function (t) {
        r(this, !1, !1, !0), this.__xtouchEnd();
      },
    },
    l = function (t) {
      var e,
        o,
        n = {};
      return (
        (e = this),
        (o = i),
        Object.defineProperties(e, o),
        Object.keys(i).forEach(function (t) {
          n[t] = i[t].default;
        }),
        Object.assign(this, n, t),
        this.prepare(),
        this.attachPage(),
        this.createCtx(),
        this.observer(),
        this.cutt(),
        this.methods(),
        this.init(),
        this.update(),
        this
      );
    };
  return (
    (l.prototype.init = function () {
      var t = this.src;
      return (
        (this.version = "1.2.0"),
        "function" == typeof this.onReady && this.onReady(this.ctx, this),
        t && this.pushOrign(t),
        r(this, !1, !1, !1),
        (this.oldScale = 1),
        (this.newScale = 1),
        this
      );
    }),
    Object.assign(l.prototype, f),
    (l.prototype.prepare = function () {
      var e = this,
        o = (t || (t = wx.getSystemInfoSync()), t).windowWidth;
      (e.attachPage = function () {
        var t = getCurrentPages();
        t[t.length - 1].wecropper = e;
      }),
        (e.createCtx = function () {
          var t = e.id;
          t
            ? (e.ctx = wx.createCanvasContext(t))
            : console.error(
                "constructor: create canvas context failed, 'id' must be valuable"
              );
        }),
        (e.deviceRadio = o / 750);
    }),
    (l.prototype.observer = function () {
      var t = this,
        e = ["ready", "beforeImageLoad", "beforeDraw", "imageLoad"];
      t.on = function (o, n) {
        var r;
        return (
          e.indexOf(o) > -1
            ? "function" == typeof n &&
              ("ready" === o
                ? n(t)
                : (t["on" + ((r = o), r.charAt(0).toUpperCase() + r.slice(1))] =
                    n))
            : console.error("event: " + o + " is invalid"),
          t
        );
      };
    }),
    (l.prototype.methods = function () {
      var t = this,
        e = t.id,
        o = (t.deviceRadio, t.width),
        r = t.height,
        a = t.cut,
        i = a.x;
      void 0 === i && (i = 0);
      var c = a.y;
      void 0 === c && (c = 0);
      var s = a.width;
      void 0 === s && (s = o);
      var u = a.height;
      void 0 === u && (u = r),
        (t.updateCanvas = function () {
          return (
            t.croperTarget &&
              t.ctx.drawImage(
                t.croperTarget,
                t.imgLeft,
                t.imgTop,
                t.scaleWidth,
                t.scaleHeight
              ),
            n(t.onBeforeDraw) && t.onBeforeDraw(t.ctx, t),
            t.setBoundStyle(),
            t.ctx.draw(),
            t
          );
        }),
        (t.pushOrign = function (e) {
          return (
            (t.src = e),
            n(t.onBeforeImageLoad) && t.onBeforeImageLoad(t.ctx, t),
            wx.getImageInfo({
              src: e,
              success: function (e) {
                var o = e.width / e.height;
                (t.croperTarget = e.path),
                  o < s / u
                    ? ((t.rectX = i),
                      (t.baseWidth = s),
                      (t.baseHeight = s / o),
                      (t.rectY = c - Math.abs((u - t.baseHeight) / 2)))
                    : ((t.rectY = c),
                      (t.baseWidth = u * o),
                      (t.baseHeight = u),
                      (t.rectX = i - Math.abs((s - t.baseWidth) / 2))),
                  (t.imgLeft = t.rectX),
                  (t.imgTop = t.rectY),
                  (t.scaleWidth = t.baseWidth),
                  (t.scaleHeight = t.baseHeight),
                  t.updateCanvas(),
                  n(t.onImageLoad) && t.onImageLoad(t.ctx, t);
              },
            }),
            t.update(),
            t
          );
        }),
        (t.getCropperBase64 = function (t) {
          void 0 === t && (t = function () {}),
            d({ canvasId: e, x: i, y: c, width: s, height: u }, t);
        }),
        (t.getCropperImage = function () {
          for (var o = [], r = arguments.length; r--; ) o[r] = arguments[r];
          var a = toString.call(o[0]),
            h = o[o.length - 1];
          switch ((console.log(i, c, s, u), a)) {
            case "[object Object]":
              var d = o[0],
                f = d.quality;
              void 0 === f && (f = 10),
                "number" != typeof f
                  ? console.error("quality：" + f + " is invalid")
                  : (f < 0 || f > 10) &&
                    console.error("quality should be ranged in 0 ~ 10"),
                wx.canvasToTempFilePath({
                  canvasId: e,
                  x: i,
                  y: c,
                  width: s,
                  height: u,
                  destWidth: t.cut.wOk,
                  destHeight: t.cut.hOk,
                  fileType: "jpg",
                  success: function (e) {
                    n(h) && h.call(t, e.tempFilePath);
                  },
                  fail: function (e) {
                    n(h) && h.call(t, null);
                  },
                });
              break;
            case "[object Function]":
              wx.canvasToTempFilePath({
                canvasId: e,
                x: i,
                y: c,
                width: s,
                height: u,
                destWidth: t.cut.wOk,
                destHeight: t.cut.hOk,
                fileType: "jpg",
                success: function (e) {
                  n(h) && h.call(t, e.tempFilePath);
                },
                fail: function (e) {
                  n(h) && h.call(t, null);
                },
              });
          }
          return t;
        });
    }),
    (l.prototype.cutt = function () {
      var t = this,
        e = t.width,
        o = t.height,
        n = t.cut,
        r = n.x;
      void 0 === r && (r = 0);
      var a = n.y;
      void 0 === a && (a = 0);
      var i = n.width;
      void 0 === i && (i = e);
      var c = n.height;
      void 0 === c && (c = o),
        (t.outsideBound = function (e, o) {
          (t.imgLeft =
            e >= r ? r : t.scaleWidth + e - r <= i ? r + i - t.scaleWidth : e),
            (t.imgTop =
              o >= a
                ? a
                : t.scaleHeight + o - a <= c
                ? a + c - t.scaleHeight
                : o);
        }),
        (t.setBoundStyle = function (n) {
          void 0 === n && (n = {});
          var s = n.color;
          void 0 === s && (s = "#04b00f");
          var u = n.mask;
          void 0 === u && (u = "rgba(0, 0, 0, 0.3)");
          var h = n.lineWidth;
          void 0 === h && (h = 1);
          var d = [
            {
              start: { x: r - h, y: a + 10 - h },
              step1: { x: r - h, y: a - h },
              step2: { x: r + 10 - h, y: a - h },
            },
            {
              start: { x: r - h, y: a + c - 10 + h },
              step1: { x: r - h, y: a + c + h },
              step2: { x: r + 10 - h, y: a + c + h },
            },
            {
              start: { x: r + i - 10 + h, y: a - h },
              step1: { x: r + i + h, y: a - h },
              step2: { x: r + i + h, y: a + 10 - h },
            },
            {
              start: { x: r + i + h, y: a + c - 10 + h },
              step1: { x: r + i + h, y: a + c + h },
              step2: { x: r + i - 10 + h, y: a + c + h },
            },
          ];
          if (
            (t.ctx.beginPath(),
            t.ctx.setFillStyle(u),
            t.ctx.fillRect(0, 0, r, o),
            t.ctx.fillRect(r, 0, i, a),
            t.ctx.fillRect(r, a + c, i, o - a - c),
            t.ctx.fillRect(r + i, 0, e - r - i, o),
            t.ctx.fill(),
            console.log("fa", t.cut.isface),
            1 == t.cut.isface)
          ) {
            var f = wx.createCanvasContext("face");
            f.drawImage("/images/icon-rl.png", r, a, i, c),
              f.setFontSize(16),
              (f.fillStyle = "#ffffff"),
              f.setShadow(2, 2, 3, "#666666"),
              f.fillText("双指缩放，框住正脸", r + i / 2 - 68, a + c - 20),
              f.draw();
          }
          d.forEach(function (e) {
            t.ctx.beginPath(),
              t.ctx.setStrokeStyle(s),
              t.ctx.setLineWidth(h),
              t.ctx.moveTo(e.start.x, e.start.y),
              t.ctx.lineTo(e.step1.x, e.step1.y),
              t.ctx.lineTo(e.step2.x, e.step2.y),
              t.ctx.stroke();
          });
        });
    }),
    (l.prototype.update = function () {
      var t = this;
      t.src &&
        ((t.__oneTouchStart = function (e) {
          (t.touchX0 = Math.round(e.x)), (t.touchY0 = Math.round(e.y));
        }),
        (t.__oneTouchMove = function (e) {
          var o, n;
          if (t.touchended) return t.updateCanvas();
          (o = Math.round(e.x - t.touchX0)), (n = Math.round(e.y - t.touchY0));
          var r = Math.round(t.rectX + o),
            a = Math.round(t.rectY + n);
          t.outsideBound(r, a), t.updateCanvas();
        }),
        (t.__twoTouchStart = function (e, o) {
          var n, r, a;
          (t.touchX1 = Math.round(t.rectX + t.scaleWidth / 2)),
            (t.touchY1 = Math.round(t.rectY + t.scaleHeight / 2)),
            (n = Math.round(o.x - e.x)),
            (r = Math.round(o.y - e.y)),
            (a = Math.round(Math.sqrt(n * n + r * r))),
            (t.oldDistance = a);
        }),
        (t.__twoTouchMove = function (e, o) {
          var n = t.oldScale,
            r = t.oldDistance,
            a = t.scale,
            i = t.zoom;
          (t.newScale = (function (t, e, o, n, r) {
            var a, i;
            return (
              (a = Math.round(r.x - n.x)),
              (i = Math.round(r.y - n.y)),
              t + 0.001 * o * (Math.round(Math.sqrt(a * a + i * i)) - e)
            );
          })(n, r, i, e, o)),
            t.newScale <= 1 && (t.newScale = 1),
            t.newScale >= a && (t.newScale = a),
            (t.scaleWidth = Math.round(t.newScale * t.baseWidth)),
            (t.scaleHeight = Math.round(t.newScale * t.baseHeight));
          var c = Math.round(t.touchX1 - t.scaleWidth / 2),
            s = Math.round(t.touchY1 - t.scaleHeight / 2);
          t.outsideBound(c, s), t.updateCanvas();
        }),
        (t.__xtouchEnd = function () {
          (t.oldScale = t.newScale),
            (t.rectX = t.imgLeft),
            (t.rectY = t.imgTop);
        }));
    }),
    l
  );
}),
  "object" === ("undefined" == typeof exports ? "undefined" : e(exports)) &&
  "undefined" != typeof module
    ? (module.exports = t())
    : "function" == typeof define && define.amd
    ? define(t)
    : ((void 0).WeCropper = t());
