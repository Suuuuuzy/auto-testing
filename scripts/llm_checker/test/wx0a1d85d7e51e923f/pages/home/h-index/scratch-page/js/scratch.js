Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.default = void 0);
var t = require("../../../../../@babel/runtime/helpers/createForOfIteratorHelper"),
  e = require("../../../../../@babel/runtime/helpers/regeneratorRuntime"),
  s = require("../../../../../@babel/runtime/helpers/asyncToGenerator"),
  a = require("../../../../../@babel/runtime/helpers/classCallCheck"),
  i = require("../../../../../@babel/runtime/helpers/createClass"),
  r = (function () {
    return i(
      function t(e, s) {
        a(this, t),
          (s = s || {}),
          (this.page = e),
          (this.canvasId = s.canvasId || "canvas"),
          (this.width = s.width || 300),
          (this.height = s.height || 300),
          (this.bgImg = s.bgImg || ""),
          (this.maskColor = s.maskColor || "#edce94"),
          (this.size = s.size || 15),
          (this.r = this.size),
          (this.area = this.r * this.r),
          (this.showPercent = s.showPercent || 0.2),
          (this.rpx = wx.getSystemInfoSync().windowWidth / 750),
          (this.scale = s.scale || 0.5),
          (this.totalArea = this.width * this.height),
          (this.startCallBack = s.startCallBack || !1),
          (this.overCallBack = s.overCallBack || !1),
          this.init();
      },
      [
        {
          key: "init",
          value: function () {
            var t = this,
              e = this;
            (this.show = !1),
              (this.clearPoints = []),
              wx
                .createSelectorQuery()
                .in(this.page)
                .select(this.canvasId)
                .fields({ node: !0, size: !0 })
                .exec(function (s) {
                  (t.canvas = s[0].node),
                    (t.ctx = t.canvas.getContext("2d")),
                    (t.canvas.width = s[0].width),
                    (t.canvas.height = s[0].height),
                    e.drawMask(),
                    e.bindTouch();
                });
          },
        },
        {
          key: "drawMask",
          value:
            ((r = s(
              e().mark(function t() {
                var s, a;
                return e().wrap(
                  function (t) {
                    for (;;)
                      switch ((t.prev = t.next)) {
                        case 0:
                          if (!(s = this).bgImg) {
                            t.next = 13;
                            break;
                          }
                          if (
                            ((a = s.canvas.createImage()),
                            !(s.bgImg.indexOf("http") > -1))
                          ) {
                            t.next = 8;
                            break;
                          }
                          return (
                            (t.next = 6),
                            wx.getImageInfo({
                              src: s.bgImg,
                              success: function (t) {
                                a.src = t.path;
                              },
                              fail: function (t) {
                                console.log(t);
                              },
                            })
                          );
                        case 6:
                          t.next = 9;
                          break;
                        case 8:
                          a.src = s.bgImg;
                        case 9:
                          (a.onload = function (t) {
                            s.ctx.drawImage(
                              a,
                              0,
                              0,
                              s.width * s.rpx,
                              s.height * s.rpx
                            );
                          }),
                            (a.onerror = function (t) {
                              console.log("onload失败");
                            }),
                            (t.next = 15);
                          break;
                        case 13:
                          (this.ctx.fillStyle = this.maskColor),
                            this.ctx.fillRect(
                              0,
                              0,
                              s.width * s.rpx,
                              s.height * s.rpx
                            );
                        case 15:
                        case "end":
                          return t.stop();
                      }
                  },
                  t,
                  this
                );
              })
            )),
            function () {
              return r.apply(this, arguments);
            }),
        },
        {
          key: "bindTouch",
          value: function () {
            var t = this;
            (this.page.touchStart = function (e) {
              t.eraser(e, !0);
            }),
              (this.page.touchMove = function (e) {
                t.eraser(e, !1);
              }),
              (this.page.touchEnd = function (e) {
                t.show &&
                  (t.overCallBack && t.overCallBack(),
                  t.ctx.clearRect(0, 0, t.width * t.rpx, t.height * t.rpx));
              });
          },
        },
        {
          key: "eraser",
          value: function (e, s) {
            var a = this.clearPoints.length,
              i = 0,
              r = e.touches[0].x,
              h = e.touches[0].y,
              c = r - this.size,
              n = h - this.size;
            s &&
              this.clearPoints.push({
                x1: c,
                y1: n,
                x2: c + this.r,
                y2: n + this.r,
              });
            var o,
              l = t(this.clearPoints);
            try {
              for (l.s(); !(o = l.n()).done; ) {
                var u = o.value;
                if (!(u.x1 > r || u.y1 > h || u.x2 < r || u.y2 < h)) break;
                i++;
              }
            } catch (t) {
              l.e(t);
            } finally {
              l.f();
            }
            a === i &&
              this.clearPoints.push({
                x1: c,
                y1: n,
                x2: c + this.r,
                y2: n + this.r,
              });
            var f =
              parseFloat(this.r * this.r * a) /
              parseFloat(this.scale * this.totalArea);
            this.show ||
              this.page.setData({
                clearNum:
                  parseFloat(this.r * this.r * a) /
                  parseFloat(this.scale * this.totalArea),
              }),
              this.startCallBack && this.startCallBack(),
              f > this.showPercent && (this.show = !0),
              this.clearArcFun(r, h, this.r, this.ctx);
          },
        },
        {
          key: "clearArcFun",
          value: function (t, e, s, a) {
            var i = 1;
            !(function t(e, s, r) {
              var h = r - i,
                c = Math.sqrt(r * r - h * h),
                n = e - h,
                o = s - c,
                l = 2 * h,
                u = 2 * c;
              i <= r && (a.clearRect(n, o, l, u), (i += 1), t(e, s, r));
            })(t, e, s);
          },
        },
      ]
    );
    var r;
  })();
exports.default = r;
