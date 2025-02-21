(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
  ["common/vendor"],
  {
    "0568": function (e, t, n) {
      "use strict";
      (function (e) {
        var r = n("4ea4");
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.createAnimation = p);
        var i = r(n("9523")),
          o = r(n("970b")),
          a = r(n("5bc3"));
        function s(e, t) {
          var n = Object.keys(e);
          if (Object.getOwnPropertySymbols) {
            var r = Object.getOwnPropertySymbols(e);
            t &&
              (r = r.filter(function (t) {
                return Object.getOwnPropertyDescriptor(e, t).enumerable;
              })),
              n.push.apply(n, r);
          }
          return n;
        }
        function c(e) {
          for (var t = 1; t < arguments.length; t++) {
            var n = null != arguments[t] ? arguments[t] : {};
            t % 2
              ? s(Object(n), !0).forEach(function (t) {
                  (0, i.default)(e, t, n[t]);
                })
              : Object.getOwnPropertyDescriptors
              ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
              : s(Object(n)).forEach(function (t) {
                  Object.defineProperty(
                    e,
                    t,
                    Object.getOwnPropertyDescriptor(n, t)
                  );
                });
          }
          return e;
        }
        var u = (function () {
            function t(n, r) {
              (0, o.default)(this, t),
                (this.options = n),
                (this.animation = e.createAnimation(n)),
                (this.currentStepAnimates = {}),
                (this.next = 0),
                (this.$ = r);
            }
            return (0, a.default)(t, [
              {
                key: "_nvuePushAnimates",
                value: function (e, t) {
                  var n = this.currentStepAnimates[this.next],
                    r = {};
                  if (((r = n || { styles: {}, config: {} }), l.includes(e))) {
                    r.styles.transform || (r.styles.transform = "");
                    var i = "";
                    "rotate" === e && (i = "deg"),
                      (r.styles.transform += ""
                        .concat(e, "(")
                        .concat(t + i, ") "));
                  } else r.styles[e] = "".concat(t);
                  this.currentStepAnimates[this.next] = r;
                },
              },
              {
                key: "_animateRun",
                value: function () {
                  var e =
                      arguments.length > 0 && void 0 !== arguments[0]
                        ? arguments[0]
                        : {},
                    t =
                      arguments.length > 1 && void 0 !== arguments[1]
                        ? arguments[1]
                        : {},
                    n = this.$.$refs["ani"].ref;
                  if (n)
                    return new Promise(function (r, i) {
                      nvueAnimation.transition(
                        n,
                        c({ styles: e }, t),
                        function (e) {
                          r();
                        }
                      );
                    });
                },
              },
              {
                key: "_nvueNextAnimate",
                value: function (e) {
                  var t = this,
                    n =
                      arguments.length > 1 && void 0 !== arguments[1]
                        ? arguments[1]
                        : 0,
                    r = arguments.length > 2 ? arguments[2] : void 0,
                    i = e[n];
                  if (i) {
                    var o = i.styles,
                      a = i.config;
                    this._animateRun(o, a).then(function () {
                      (n += 1), t._nvueNextAnimate(e, n, r);
                    });
                  } else
                    (this.currentStepAnimates = {}),
                      "function" === typeof r && r(),
                      (this.isEnd = !0);
                },
              },
              {
                key: "step",
                value: function () {
                  var e =
                    arguments.length > 0 && void 0 !== arguments[0]
                      ? arguments[0]
                      : {};
                  return this.animation.step(e), this;
                },
              },
              {
                key: "run",
                value: function (e) {
                  (this.$.animationData = this.animation.export()),
                    (this.$.timer = setTimeout(function () {
                      "function" === typeof e && e();
                    }, this.$.durationTime));
                },
              },
            ]);
          })(),
          l = [
            "matrix",
            "matrix3d",
            "rotate",
            "rotate3d",
            "rotateX",
            "rotateY",
            "rotateZ",
            "scale",
            "scale3d",
            "scaleX",
            "scaleY",
            "scaleZ",
            "skew",
            "skewX",
            "skewY",
            "translate",
            "translate3d",
            "translateX",
            "translateY",
            "translateZ",
          ],
          f = ["opacity", "backgroundColor"],
          d = ["width", "height", "left", "right", "top", "bottom"];
        function p(e, t) {
          if (t) return clearTimeout(t.timer), new u(e, t);
        }
        l.concat(f, d).forEach(function (e) {
          u.prototype[e] = function () {
            var t;
            return (t = this.animation)[e].apply(t, arguments), this;
          };
        });
      }).call(this, n("543d")["default"]);
    },
    "0676": function (e, t) {
      function n() {
        throw new TypeError(
          "Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."
        );
      }
      (e.exports = n),
        (e.exports.__esModule = !0),
        (e.exports["default"] = e.exports);
    },
    "11b0": function (e, t) {
      function n(e) {
        if (
          ("undefined" != typeof Symbol && null != e[Symbol.iterator]) ||
          null != e["@@iterator"]
        )
          return Array.from(e);
      }
      (e.exports = n),
        (e.exports.__esModule = !0),
        (e.exports["default"] = e.exports);
    },
    1320: function (e, t) {
      e.exports =
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEQAAABECAYAAAA4E5OyAAAE30lEQVR4Xu1bTYgcRRR+r3vcPeiqe8iKE6JgiNGNF6NEENRFFwVRcDGuJ69VNb3Zi96XVs96Gbenqq6e3CgGFCGyyqogKBoPkmiMBNTNiMnBnyhk1+l+UmE2THpnp7une3ona9VtqHrve++r9+qnpx5CCY0xdhAANCLeS0ROFkhEjIjoGwBgWusTWWT7GYv9CGWR8X3faTabZwHg9ixyXcb+VK1W7/B9P8qpp6f4wAnxPG9Pq9X6uQgnKpXKbUEQ/FKErq10DJyQpaUld3l5+VcA2JXTkQvT09O3zs7Ohjn1bG+EGHQhxKNRFL0JANU+nWk6jvOClPLjPuVTiw08QjotEUJMRFHkprYOABzHCaWU57PI5BlbKiF5DC1L1hISY7orIZ7nPRiG4SOIOFrWzJSJQ0Rrrut+EgTB53HcTYQwxmoAEJRp4DZieVrrRif+JkI456tEtHsbjSwTelVrvSeJkN+IaKJMq7YLCxHPK6VuSSJkgYhe3i4jS8Zd0Fq/2pOQ9kHq2SiKphBxxPwmonEAeO4qQcTfAeBoyQ4UAkdE647jrEgp30lcVLshcs4niehkjJBTSqkDhVg4REpSnUMsIbEZs4RYQnon8bUYIZ7n3RCG4cGRkZGz9Xp9Ne0ytSPXEM/z7m61WsvmcwMitgBgXikl05CyIwnhnB8losMdBFyqVqvjvu9fSiJlpxLyLRHd0+l8pVKZDILgu/8rISeJaDJ2bjqglDplCWkzgIiWkKGOECHEUwCwj4iOpwld44zZ7hHxCQA4I6V8PyncN/o558OdMoyxOgAcaRv8r+u6TzYaDbMtbtlqtdp0GIYfAMB17UFvaK3n05Ay1IQwxm4CAHMz7tzRPtRam5nfsjHGjgPA4x0DCADGtdZ/JpEy1IT0e8rN41Qe2YGfQywhBV0M88xyHlkbIbEJtIRYQnrvUTZCbITYCLnMwNBc7uw5xJ5DeuekjRAbITZCNlbtVP/t2pSxKWNTxqZMv+vAxofift6W5PmmkUfWXu7KvtwxxvYCwI8x3BNa6/sSPjJ/DQCmzuZKc113b6PRMKUmPdtQR0i3ehlEfF0p9VIvrzjnrxHRix1jUtfLDDUhxqGOiqp9APCe67oiCIK/exHSft9hnjA8TURnslRUDT0hSSFedL8lZPNhcLj/yiw6ApL02QixEXINb7tJ4T2IfpsyZadM+5njVe+zEPG0UuquQcxwXp2c8++JaH+nnkIf3c3Pz+9aW1uLV0auV6vVMd/31/M6UKS87/sjzWbzIgBcruTYaKOjoxP1ev1CElaqyx0RIefcgFwfUzijtT6WBFJmP2PsGQB4N4b5j1JqDBHNo5ueLRUh7eO3ATFgVxoinkPEB6SU55KAyugXQuwmoi+6lMgd01rPpLEhNSFCCFNU9HYXpX84jvMKIn4ahmEzDWjRY1zXrRLRw1EULQDAzXH9juMc7lYs1M2O1ISYtBFCfElE9xft0CD1IeJXUspDadLF2JGaEDO4Vqvtj6LIkHLjIJ0oSjci/uU4zqFGo3E6rc5MhBilQoipKIrMerIpNNOCljTOpPKMlHIlC15mQozyubm5O1utliKiqSxgZY1FxJVKpcIXFxd/yIrZFyEbIJzzxwDgeSJ6CABM8fNYVgMKGm+OBGbH+wwA3lJKfdSv3v8AMUw0kBFUjCcAAAAASUVORK5CYII=";
    },
    "1db1": function (e, t, n) {
      "use strict";
      (function (e) {
        var r = n("4ea4");
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.paging = void 0);
        var i = r(n("448a")),
          o = r(n("9523"));
        n("c9b7");
        function a(e, t) {
          var n = Object.keys(e);
          if (Object.getOwnPropertySymbols) {
            var r = Object.getOwnPropertySymbols(e);
            t &&
              (r = r.filter(function (t) {
                return Object.getOwnPropertyDescriptor(e, t).enumerable;
              })),
              n.push.apply(n, r);
          }
          return n;
        }
        function s(e) {
          for (var t = 1; t < arguments.length; t++) {
            var n = null != arguments[t] ? arguments[t] : {};
            t % 2
              ? a(Object(n), !0).forEach(function (t) {
                  (0, o.default)(e, t, n[t]);
                })
              : Object.getOwnPropertyDescriptors
              ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
              : a(Object(n)).forEach(function (t) {
                  Object.defineProperty(
                    e,
                    t,
                    Object.getOwnPropertyDescriptor(n, t)
                  );
                });
          }
          return e;
        }
        t.paging = {
          data: function () {
            return {
              finished: !1,
              dataList: null,
              pageNum: 1,
              pageSize: 10,
              status: "loading",
              apiUrl: "",
              selectList: [],
              isEdit: !1,
            };
          },
          onShow: function () {},
          mounted: function () {},
          onPullDownRefresh: function () {
            (this.isOnLoad = !0),
              this.getList(),
              setTimeout(function () {
                e.stopPullDownRefresh();
              }, 1e3);
          },
          methods: {
            getList: function (t, n) {
              var r = this;
              console.log(n),
                (this.apiUrl = this.apiUrl || t),
                (this.reqData = this.reqData || n);
              var o = s(
                { pageNum: this.pageNum, pageSize: this.pageSize },
                this.reqData
              );
              this.$get(this.apiUrl, o).then(function (t) {
                console.log(t),
                  (r.status = "nomore"),
                  (r.finished = t.data.hasNextPage),
                  (r.pageNum = t.data.pageNum),
                  e.hideLoading(),
                  t.data.items
                    ? ("isSelect" == r.pageFlag &&
                        t.data.items.forEach(function (e) {
                          return (e.selected = !1);
                        }),
                      (r.dataList = r.dataList
                        ? [].concat(
                            (0, i.default)(r.dataList),
                            (0, i.default)(t.data.items)
                          )
                        : t.data.items),
                      e.hideLoading())
                    : (r.firstOn && (r.isOnLoad = !0), (r.dataList = []));
              });
            },
            scrolltolowerFun: function () {
              this.finished &&
                ((this.finished = !1),
                this.pageNum++,
                (this.isOnLoad = !1),
                this.getList());
            },
            checkBox: function (e, t) {
              if (this.dataList[e].selected) {
                var n = this.selectList.indexOf(t);
                this.selectList.splice(n, 1),
                  (this.dataList[e].selected = !1),
                  console.log(this.dataList);
              } else (this.dataList[e].selected = !0), this.selectList.push(t);
            },
            allSelect: function () {
              var e = this;
              this.selectList.length === this.dataList.length
                ? ((this.selectList = []),
                  this.dataList.forEach(function (e) {
                    e.selected = !1;
                  }))
                : this.dataList.forEach(function (t, n) {
                    e.selectList.includes(t.id) ||
                      (e.selectList.push(t.id), (t.selected = !0));
                  });
            },
            changeEdit: function () {
              this.isEdit
                ? ((this.isEdit = !1),
                  (this.selectList = []),
                  this.dataList.forEach(function (e) {
                    return (e.selected = !1);
                  }))
                : (this.isEdit = !0);
            },
          },
          onHide: function () {},
        };
      }).call(this, n("543d")["default"]);
    },
    2236: function (e, t, n) {
      var r = n("5a43");
      function i(e) {
        if (Array.isArray(e)) return r(e);
      }
      (e.exports = i),
        (e.exports.__esModule = !0),
        (e.exports["default"] = e.exports);
    },
    "278c": function (e, t, n) {
      var r = n("c135"),
        i = n("9b42"),
        o = n("6613"),
        a = n("c240");
      function s(e, t) {
        return r(e) || i(e, t) || o(e, t) || a();
      }
      (e.exports = s),
        (e.exports.__esModule = !0),
        (e.exports["default"] = e.exports);
    },
    "2eee": function (e, t, n) {
      var r = n("7ec2")();
      e.exports = r;
    },
    "36c6": function (e, t) {
      function n(t) {
        return (
          (e.exports = n =
            Object.setPrototypeOf
              ? Object.getPrototypeOf.bind()
              : function (e) {
                  return e.__proto__ || Object.getPrototypeOf(e);
                }),
          (e.exports.__esModule = !0),
          (e.exports["default"] = e.exports),
          n(t)
        );
      }
      (e.exports = n),
        (e.exports.__esModule = !0),
        (e.exports["default"] = e.exports);
    },
    "37dc": function (e, t, n) {
      "use strict";
      (function (e, r) {
        var i = n("4ea4");
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.LOCALE_ZH_HANT =
            t.LOCALE_ZH_HANS =
            t.LOCALE_FR =
            t.LOCALE_ES =
            t.LOCALE_EN =
            t.I18n =
            t.Formatter =
              void 0),
          (t.compileI18nJsonStr = M),
          (t.hasI18nJson = L),
          (t.initVueI18n = C),
          (t.isI18nStr = N),
          (t.isString = void 0),
          (t.normalizeLocale = I),
          (t.parseI18nJson = D),
          (t.resolveLocale = B);
        var o = i(n("278c")),
          a = i(n("970b")),
          s = i(n("5bc3")),
          c = i(n("7037")),
          u = function (e) {
            return null !== e && "object" === (0, c.default)(e);
          },
          l = ["{", "}"],
          f = (t.Formatter = (function () {
            function e() {
              (0, a.default)(this, e), (this._caches = Object.create(null));
            }
            return (0, s.default)(e, [
              {
                key: "interpolate",
                value: function (e, t) {
                  var n =
                    arguments.length > 2 && void 0 !== arguments[2]
                      ? arguments[2]
                      : l;
                  if (!t) return [e];
                  var r = this._caches[e];
                  return r || ((r = h(e, n)), (this._caches[e] = r)), g(r, t);
                },
              },
            ]);
          })()),
          d = /^(?:\d)+/,
          p = /^(?:\w)+/;
        function h(e, t) {
          var n = (0, o.default)(t, 2),
            r = n[0],
            i = n[1],
            a = [],
            s = 0,
            c = "";
          while (s < e.length) {
            var u = e[s++];
            if (u === r) {
              c && a.push({ type: "text", value: c }), (c = "");
              var l = "";
              u = e[s++];
              while (void 0 !== u && u !== i) (l += u), (u = e[s++]);
              var f = u === i,
                h = d.test(l) ? "list" : f && p.test(l) ? "named" : "unknown";
              a.push({ value: l, type: h });
            } else c += u;
          }
          return c && a.push({ type: "text", value: c }), a;
        }
        function g(e, t) {
          var n = [],
            r = 0,
            i = Array.isArray(t) ? "list" : u(t) ? "named" : "unknown";
          if ("unknown" === i) return n;
          while (r < e.length) {
            var o = e[r];
            switch (o.type) {
              case "text":
                n.push(o.value);
                break;
              case "list":
                n.push(t[parseInt(o.value, 10)]);
                break;
              case "named":
                "named" === i && n.push(t[o.value]);
                break;
              case "unknown":
                0;
                break;
            }
            r++;
          }
          return n;
        }
        var v = (t.LOCALE_ZH_HANS = "zh-Hans"),
          m = (t.LOCALE_ZH_HANT = "zh-Hant"),
          y = (t.LOCALE_EN = "en"),
          _ = (t.LOCALE_FR = "fr"),
          b = (t.LOCALE_ES = "es"),
          w = Object.prototype.hasOwnProperty,
          k = function (e, t) {
            return w.call(e, t);
          },
          x = new f();
        function S(e, t) {
          return !!t.find(function (t) {
            return -1 !== e.indexOf(t);
          });
        }
        function A(e, t) {
          return t.find(function (t) {
            return 0 === e.indexOf(t);
          });
        }
        function I(e, t) {
          if (e) {
            if (((e = e.trim().replace(/_/g, "-")), t && t[e])) return e;
            if (((e = e.toLowerCase()), "chinese" === e)) return v;
            if (0 === e.indexOf("zh"))
              return e.indexOf("-hans") > -1
                ? v
                : e.indexOf("-hant") > -1 || S(e, ["-tw", "-hk", "-mo", "-cht"])
                ? m
                : v;
            var n = [y, _, b];
            t && Object.keys(t).length > 0 && (n = Object.keys(t));
            var r = A(e, n);
            return r || void 0;
          }
        }
        var O = (t.I18n = (function () {
          function e(t) {
            var n = t.locale,
              r = t.fallbackLocale,
              i = t.messages,
              o = t.watcher,
              s = t.formater;
            (0, a.default)(this, e),
              (this.locale = y),
              (this.fallbackLocale = y),
              (this.message = {}),
              (this.messages = {}),
              (this.watchers = []),
              r && (this.fallbackLocale = r),
              (this.formater = s || x),
              (this.messages = i || {}),
              this.setLocale(n || y),
              o && this.watchLocale(o);
          }
          return (0, s.default)(e, [
            {
              key: "setLocale",
              value: function (e) {
                var t = this,
                  n = this.locale;
                (this.locale = I(e, this.messages) || this.fallbackLocale),
                  this.messages[this.locale] ||
                    (this.messages[this.locale] = {}),
                  (this.message = this.messages[this.locale]),
                  n !== this.locale &&
                    this.watchers.forEach(function (e) {
                      e(t.locale, n);
                    });
              },
            },
            {
              key: "getLocale",
              value: function () {
                return this.locale;
              },
            },
            {
              key: "watchLocale",
              value: function (e) {
                var t = this,
                  n = this.watchers.push(e) - 1;
                return function () {
                  t.watchers.splice(n, 1);
                };
              },
            },
            {
              key: "add",
              value: function (e, t) {
                var n =
                    !(arguments.length > 2 && void 0 !== arguments[2]) ||
                    arguments[2],
                  r = this.messages[e];
                r
                  ? n
                    ? Object.assign(r, t)
                    : Object.keys(t).forEach(function (e) {
                        k(r, e) || (r[e] = t[e]);
                      })
                  : (this.messages[e] = t);
              },
            },
            {
              key: "f",
              value: function (e, t, n) {
                return this.formater.interpolate(e, t, n).join("");
              },
            },
            {
              key: "t",
              value: function (e, t, n) {
                var r = this.message;
                return (
                  "string" === typeof t
                    ? ((t = I(t, this.messages)), t && (r = this.messages[t]))
                    : (n = t),
                  k(r, e)
                    ? this.formater.interpolate(r[e], n).join("")
                    : (console.warn(
                        "Cannot translate the value of keypath ".concat(
                          e,
                          ". Use the value of keypath as default."
                        )
                      ),
                      e)
                );
              },
            },
          ]);
        })());
        function P(e, t) {
          e.$watchLocale
            ? e.$watchLocale(function (e) {
                t.setLocale(e);
              })
            : e.$watch(
                function () {
                  return e.$locale;
                },
                function (e) {
                  t.setLocale(e);
                }
              );
        }
        function T() {
          return "undefined" !== typeof e && e.getLocale
            ? e.getLocale()
            : "undefined" !== typeof r && r.getLocale
            ? r.getLocale()
            : y;
        }
        function C(e) {
          var t =
              arguments.length > 1 && void 0 !== arguments[1]
                ? arguments[1]
                : {},
            n = arguments.length > 2 ? arguments[2] : void 0,
            r = arguments.length > 3 ? arguments[3] : void 0;
          if ("string" !== typeof e) {
            var i = [t, e];
            (e = i[0]), (t = i[1]);
          }
          "string" !== typeof e && (e = T()),
            "string" !== typeof n &&
              (n =
                ("undefined" !== typeof __uniConfig &&
                  __uniConfig.fallbackLocale) ||
                y);
          var o = new O({
              locale: e,
              fallbackLocale: n,
              messages: t,
              watcher: r,
            }),
            a = function (e, t) {
              if ("function" !== typeof getApp)
                a = function (e, t) {
                  return o.t(e, t);
                };
              else {
                var n = !1;
                a = function (e, t) {
                  var r = getApp().$vm;
                  return r && (r.$locale, n || ((n = !0), P(r, o))), o.t(e, t);
                };
              }
              return a(e, t);
            };
          return {
            i18n: o,
            f: function (e, t, n) {
              return o.f(e, t, n);
            },
            t: function (e, t) {
              return a(e, t);
            },
            add: function (e, t) {
              var n =
                !(arguments.length > 2 && void 0 !== arguments[2]) ||
                arguments[2];
              return o.add(e, t, n);
            },
            watch: function (e) {
              return o.watchLocale(e);
            },
            getLocale: function () {
              return o.getLocale();
            },
            setLocale: function (e) {
              return o.setLocale(e);
            },
          };
        }
        var E,
          j = (t.isString = function (e) {
            return "string" === typeof e;
          });
        function L(e, t) {
          return (
            E || (E = new f()),
            F(e, function (e, n) {
              var r = e[n];
              return j(r) ? !!N(r, t) || void 0 : L(r, t);
            })
          );
        }
        function D(e, t, n) {
          return (
            E || (E = new f()),
            F(e, function (e, r) {
              var i = e[r];
              j(i) ? N(i, n) && (e[r] = U(i, t, n)) : D(i, t, n);
            }),
            e
          );
        }
        function M(e, t) {
          var n = t.locale,
            r = t.locales,
            i = t.delimiters;
          if (!N(e, i)) return e;
          E || (E = new f());
          var o = [];
          Object.keys(r).forEach(function (e) {
            e !== n && o.push({ locale: e, values: r[e] });
          }),
            o.unshift({ locale: n, values: r[n] });
          try {
            return JSON.stringify($(JSON.parse(e), o, i), null, 2);
          } catch (a) {}
          return e;
        }
        function N(e, t) {
          return e.indexOf(t[0]) > -1;
        }
        function U(e, t, n) {
          return E.interpolate(e, t, n).join("");
        }
        function R(e, t, n, r) {
          var i = e[t];
          if (j(i)) {
            if (N(i, r) && ((e[t] = U(i, n[0].values, r)), n.length > 1)) {
              var o = (e[t + "Locales"] = {});
              n.forEach(function (e) {
                o[e.locale] = U(i, e.values, r);
              });
            }
          } else $(i, n, r);
        }
        function $(e, t, n) {
          return (
            F(e, function (e, r) {
              R(e, r, t, n);
            }),
            e
          );
        }
        function F(e, t) {
          if (Array.isArray(e)) {
            for (var n = 0; n < e.length; n++) if (t(e, n)) return !0;
          } else if (u(e)) for (var r in e) if (t(e, r)) return !0;
          return !1;
        }
        function B(e) {
          return function (t) {
            return t
              ? ((t = I(t) || t),
                q(t).find(function (t) {
                  return e.indexOf(t) > -1;
                }))
              : t;
          };
        }
        function q(e) {
          var t = [],
            n = e.split("-");
          while (n.length) t.push(n.join("-")), n.pop();
          return t;
        }
      }).call(this, n("543d")["default"], n("c8ba"));
    },
    3926: function (e, t, n) {
      "use strict";
      (function (e) {
        var r = n("4ea4");
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.default = void 0);
        var i = r(n("c960")),
          o = r(n("5dca"));
        function a(e) {
          for (var t = {}, n = e.split(","), r = 0; r < n.length; r += 1)
            t[n[r]] = !0;
          return t;
        }
        var s = a(
            "br,code,address,article,applet,aside,audio,blockquote,button,canvas,center,dd,del,dir,div,dl,dt,fieldset,figcaption,figure,footer,form,frameset,h1,h2,h3,h4,h5,h6,header,hgroup,hr,iframe,ins,isindex,li,map,menu,noframes,noscript,object,ol,output,p,pre,section,script,table,tbody,td,tfoot,th,thead,tr,ul,video"
          ),
          c = a(
            "a,abbr,acronym,applet,b,basefont,bdo,big,button,cite,del,dfn,em,font,i,iframe,img,input,ins,kbd,label,map,object,q,s,samp,script,select,small,span,strike,strong,sub,sup,textarea,tt,u,var"
          ),
          u = a("colgroup,dd,dt,li,options,p,td,tfoot,th,thead,tr");
        function l(e) {
          var t = /<body.*>([^]*)<\/body>/.test(e);
          return t ? RegExp.$1 : e;
        }
        function f(e) {
          return e
            .replace(/<!--.*?-->/gi, "")
            .replace(/\/\*.*?\*\//gi, "")
            .replace(/[ ]+</gi, "<")
            .replace(/<script[^]*<\/script>/gi, "")
            .replace(/<style[^]*<\/style>/gi, "");
        }
        function d() {
          var t = {};
          return (
            e.getSystemInfo({
              success: function (e) {
                (t.width = e.windowWidth), (t.height = e.windowHeight);
              },
            }),
            t
          );
        }
        function p(e, t, n, r) {
          (e = l(e)), (e = f(e)), (e = i.default.strDiscode(e));
          var a = [],
            p = { nodes: [], imageUrls: [] },
            h = d();
          function g(e) {
            (this.node = "element"), (this.tag = e), (this.$screen = h);
          }
          return (
            (0, o.default)(e, {
              start: function (e, r, o) {
                var l = new g(e);
                if (0 !== a.length) {
                  var f = a[0];
                  void 0 === f.nodes && (f.nodes = []);
                }
                if (
                  (s[e]
                    ? (l.tagType = "block")
                    : c[e]
                    ? (l.tagType = "inline")
                    : u[e] && (l.tagType = "closeSelf"),
                  (l.attr = r.reduce(function (e, t) {
                    var n = t.name,
                      r = t.value;
                    return (
                      "class" === n && (l.classStr = r),
                      "style" === n && (l.styleStr = r),
                      r.match(/ /) && (r = r.split(" ")),
                      e[n]
                        ? Array.isArray(e[n])
                          ? e[n].push(r)
                          : (e[n] = [e[n], r])
                        : (e[n] = r),
                      e
                    );
                  }, {})),
                  l.classStr
                    ? (l.classStr += " ".concat(l.tag))
                    : (l.classStr = l.tag),
                  "inline" === l.tagType && (l.classStr += " inline"),
                  "img" === l.tag)
                ) {
                  var d = l.attr.src;
                  (d = i.default.urlToHttpUrl(d, n.domain)),
                    Object.assign(l.attr, n, { src: d || "" }),
                    d && p.imageUrls.push(d);
                }
                if (
                  ("a" === l.tag &&
                    ("string" == typeof l.attr.href
                      ? (l.attr.href = l.attr.href || "")
                      : l.attr.href.map(function (e) {
                          e && (l.attr.href = e);
                        })),
                  "font" === l.tag)
                ) {
                  var h = [
                      "x-small",
                      "small",
                      "medium",
                      "large",
                      "x-large",
                      "xx-large",
                      "-webkit-xxx-large",
                    ],
                    v = {
                      color: "color",
                      face: "font-family",
                      size: "font-size",
                    };
                  l.styleStr || (l.styleStr = ""),
                    Object.keys(v).forEach(function (e) {
                      if (l.attr[e]) {
                        var t = "size" === e ? h[l.attr[e] - 1] : l.attr[e];
                        l.styleStr += "".concat(v[e], ": ").concat(t, ";");
                      }
                    });
                }
                if (
                  ("source" === l.tag && (p.source = l.attr.src),
                  t.start && t.start(l, p),
                  o)
                ) {
                  var m = a[0] || p;
                  void 0 === m.nodes && (m.nodes = []), m.nodes.push(l);
                } else a.unshift(l);
              },
              end: function (e) {
                var n = a.shift();
                if (
                  (n.tag !== e &&
                    console.error("invalid state: mismatch end tag"),
                  "video" === n.tag &&
                    p.source &&
                    ((n.attr.src = p.source), delete p.source),
                  t.end && t.end(n, p),
                  0 === a.length)
                )
                  p.nodes.push(n);
                else {
                  var r = a[0];
                  r.nodes || (r.nodes = []), r.nodes.push(n);
                }
              },
              chars: function (e) {
                if (e.trim()) {
                  var n = { node: "text", text: e };
                  if ((t.chars && t.chars(n, p), 0 === a.length))
                    p.nodes.push(n);
                  else {
                    var r = a[0];
                    void 0 === r.nodes && (r.nodes = []), r.nodes.push(n);
                  }
                }
              },
            }),
            p
          );
        }
        t.default = p;
      }).call(this, n("bc2e")["default"]);
    },
    "3c96": function (e, t) {
      function n(e) {
        if (void 0 === e)
          throw new ReferenceError(
            "this hasn't been initialised - super() hasn't been called"
          );
        return e;
      }
      (e.exports = n),
        (e.exports.__esModule = !0),
        (e.exports["default"] = e.exports);
    },
    "448a": function (e, t, n) {
      var r = n("2236"),
        i = n("11b0"),
        o = n("6613"),
        a = n("0676");
      function s(e) {
        return r(e) || i(e) || o(e) || a();
      }
      (e.exports = s),
        (e.exports.__esModule = !0),
        (e.exports["default"] = e.exports);
    },
    "494d": function (e, t, n) {
      "use strict";
      (function (e) {
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.chapterJS = void 0);
        var r = n("5d2d");
        t.chapterJS = {
          data: function () {
            return {
              bookId: "",
              bookContent: "",
              chapterId: "",
              userAdChannel: "",
              linkId: "",
              isEnd: !1,
              chapterTotal: [],
              chapterContent: null,
              scrollTop: 0,
              bottomShow: !1,
              topShow: !1,
              isEye: !1,
              bookData: "",
              allOption: null,
              shareDesc: "",
              fontSize: "",
              isShowSet: !1,
              isShowReadBtn: !0,
              unlockChapter: !1,
              autoSubscribe: !1,
              readStatus: 1,
              chapterPrice: 0,
              coin: 0,
              bonus: 0,
              newHeight: 0,
              oldHeight: 0,
              chapterFlag: "",
              nextChapter: null,
              preChapter: null,
              appId: "",
              scene: "",
            };
          },
          onLoad: function (e) {
            (this.scene = getApp().globalData.scene),
              (this.appId = getApp().globalData.appId),
              (this.allOption = e),
              (this.bookId = e.bookId),
              (this.chapterId = "undefined" == e.chapterId ? "" : e.chapterId),
              (this.customParams =
                "undefined" != e.customParams &&
                e.customParams &&
                "null" != e.customParams
                  ? e.customParams
                  : ""),
              (this.pid = "undefined" == e.pid ? "" : e.pid),
              (this.clickid = "undefined" == e.clickid ? "" : e.clickid),
              (this.linkId = "undefined" == e.linkId ? "" : e.linkId);
          },
          onShow: function () {
            e.getStorageSync("isEye") &&
              ((this.isEye = e.getStorageSync("isEye")),
              e.setNavigationBarColor({
                frontColor: this.isEye ? "#ffffff" : "#000000",
                backgroundColor: this.isEye ? "#212127" : "#ffffff",
              })),
              e.getStorageSync("fontSize")
                ? (this.fontSize = e.getStorageSync("fontSize"))
                : (this.fontSize = 32);
            var t = this;
            if (t.pid)
              if ((0, r.getToken)())
                console.log("阅读页有TOKEN"), t.getBookCdnInfo();
              else {
                var n = this;
                e.login({
                  force: !0,
                  success: function (t) {
                    (t.uniPlatform = e.getSystemInfoSync().uniPlatform),
                      n.$post(n.$api.userauth, t).then(function (t) {
                        t.success &&
                          (console.log("阅读页TOKEN"),
                          e.setStorageSync("userId", t.data.id),
                          (0, r.getToken)() && n.getBookCdnInfo());
                      });
                  },
                  fail: function (e) {
                    console.log(e);
                  },
                });
              }
            else console.log("普通阅读页有TOKEN"), this.getBookCdnInfo();
          },
          onPageScroll: function (t) {
            (this.bottomShow = !1),
              (this.isShowSet = !1),
              (this.scrollTop = t.scrollTop),
              this.scrollTop > e.getSystemInfoSync().windowHeight
                ? (this.isShowReadBtn = !1)
                : (this.isShowReadBtn = !0);
          },
          watch: {
            fontSize: {
              handler: function (e, t) {
                e && t && (this.isShowSet = !0);
              },
              immediate: !0,
            },
          },
          onPullDownRefresh: function () {
            var t = this;
            1 != this.bookData.type &&
              this.preChapter &&
              (this.showLoadingFun(),
              (this.chapterFlag = "prev"),
              e
                .createSelectorQuery()
                .select(".mainCon")
                .boundingClientRect(function (e) {
                  console.log(e), (t.oldHeight = e.height);
                })
                .exec(),
              (this.chapterId = this.preChapter.id),
              this.getbookchapter()),
              setTimeout(function () {
                e.stopPullDownRefresh();
              }, 500);
          },
          onReachBottom: function () {
            1 != this.bookData.type &&
              this.nextChapter &&
              1 == this.readStatus &&
              (this.showLoadingFun(),
              (this.chapterFlag = "next"),
              (this.chapterId = this.nextChapter.id),
              this.getbookchapter());
          },
          methods: {
            launchAppError: function (e) {
              console.log(e.detail.errMsg);
            },
            getBookCdnInfo: function () {
              var e = this;
              this.$get(this.$api.bookCdnInfo, { bookId: this.bookId }).then(
                function (t) {
                  (e.bookData = t.data),
                    (e.shareDesc = t.data.json.desc),
                    e.getBindUser(),
                    1 == e.bookData.type
                      ? e.getBookdetail()
                      : (e.showLoadingFun(), e.getbookchapter("scrollH"));
                }
              );
            },
            getBookdetail: function () {
              var t = this;
              this.showLoadingFun(),
                this.$get(this.$api.bookAllChapter, {
                  bookId: this.bookId,
                  linkId: this.linkId,
                }).then(function (n) {
                  (t.bookContent = n.data.content),
                    (t.chapterContent = n.data),
                    t.chapterContent.isVip ||
                    t.chapterContent.purchasedSingleBook
                      ? (t.readStatus = 1)
                      : ((t.readStatus = 3),
                        t.$nextTick(function () {
                          t.$refs.topUpTemplate.gettopupgrade();
                        })),
                    e.getStorageSync(t.bookId)
                      ? ((t.scrollTop = e.getStorageSync(t.bookId)),
                        setTimeout(function () {
                          e.pageScrollTo({
                            scrollTop: t.scrollTop,
                            duration: 0,
                          });
                        }, 500))
                      : (console.log(e.getStorageSync(t.bookId)),
                        e.pageScrollTo({ scrollTop: 0, duration: 0 })),
                    t.addHistory(t.bookId, t.chapterContent.chapterId),
                    setTimeout(function () {
                      t.hideLoadingFun();
                    }, 300);
                });
            },
            getbookchapter: function (t) {
              var n = this;
              this.$get(this.$api.bookchapter, {
                bookId: this.bookId,
                chapterId: this.chapterId,
                linkId: this.linkId,
                unlockChapter: this.unlockChapter,
              }).then(function (t) {
                console.log(t),
                  n.hideLoadingFun(),
                  (n.chapterContent = t.data.chapter),
                  "next" == n.chapterFlag
                    ? ((n.bookContent = n.bookContent + t.data.chapter.content),
                      (n.nextChapter = n.chapterContent.nextChapter
                        ? n.chapterContent.nextChapter
                        : null),
                      (n.readStatus = t.data.readStatus.value),
                      (n.coin = t.data.user ? t.data.user.coin : 0),
                      (n.bonus = t.data.user ? t.data.user.bonus : 0),
                      (n.chapterPrice = t.data.chapterPrice))
                    : "prev" == n.chapterFlag
                    ? ((n.bookContent = t.data.chapter.content + n.bookContent),
                      (n.preChapter = n.chapterContent.preChapter
                        ? n.chapterContent.preChapter
                        : null))
                    : ((n.bookContent = t.data.chapter.content),
                      (n.nextChapter = n.chapterContent.nextChapter
                        ? n.chapterContent.nextChapter
                        : null),
                      (n.preChapter = n.chapterContent.preChapter
                        ? n.chapterContent.preChapter
                        : null),
                      (n.readStatus = t.data.readStatus.value),
                      (n.coin = t.data.user ? t.data.user.coin : 0),
                      (n.bonus = t.data.user ? t.data.user.bonus : 0),
                      (n.chapterPrice = t.data.chapterPrice),
                      console.log(n.preChapter)),
                  (n.unlockChapter = !1),
                  1 == t.data.readStatus.value
                    ? n.addHistory(n.bookId, n.chapterContent.id)
                    : 3 == t.data.readStatus.value &&
                      n.$nextTick(function () {
                        n.$refs.topUpTemplate.gettopupgrade();
                      });
                var r = n;
                r.$nextTick(function () {
                  "prev" == r.chapterFlag &&
                    e
                      .createSelectorQuery()
                      .select(".mainCon")
                      .boundingClientRect(function (t) {
                        console.log(t),
                          (r.scrollTop = t.height - r.oldHeight - 50),
                          console.log(r.scrollTop),
                          e.pageScrollTo({
                            scrollTop: r.scrollTop,
                            duration: 0,
                          });
                      })
                      .exec();
                });
              });
            },
            lockChapter: function () {
              (this.unlockChapter = !0), this.getbookchapter();
            },
            setAutoSubscribe: function () {
              var e = this;
              this.$get(this.$api.setAutoSubscribe, {
                autoSubscribe: this.autoSubscribe ? 0 : 1,
              }).then(function (t) {
                console.log(t), (e.autoSubscribe = !e.autoSubscribe);
              });
            },
            addHistory: function (e, t) {
              this.$post(this.$api.readrecordadd, {
                bookId: e,
                chapterId: t,
              }).then(function (e) {});
            },
            getBindUser: function () {
              var e = this;
              e.pid &&
                e.$post(e.$api.bindUserPartner, e.allOption).then(function (e) {
                  console.log(e);
                });
            },
            toSetBottom: function (e) {
              console.log(e),
                (this.bottomShow = !this.bottomShow),
                (this.isShowSet = !1);
            },
            sliderChange: function (t) {
              if ("add" == t) {
                if (this.fontSize >= 50) return !1;
                this.fontSize = this.fontSize + 2;
              } else if ("plus" == t) {
                if (this.fontSize <= 18) return !1;
                this.fontSize = this.fontSize - 2;
              }
              e.setStorageSync("fontSize", this.fontSize);
            },
            changeEye: function (t) {
              var n = this;
              (n.isEye = t),
                e.setNavigationBarColor({
                  frontColor: n.isEye ? "#ffffff" : "#000000",
                  backgroundColor: n.isEye ? "#212127" : "#ffffff",
                }),
                e.setStorageSync("isEye", n.isEye);
            },
            addShelfFun: function () {
              var t = this;
              this.toSetBottom(),
                this.showLoadingFun(),
                this.$post(this.$api.shelfadd, { bookId: this.bookId }).then(
                  function (n) {
                    t.hideLoadingFun(),
                      n.success &&
                        (e.showToast({
                          title: "已加入书架",
                          icon: "none",
                          duration: 1e3,
                        }),
                        e.setStorageSync("isShelf", !0),
                        (t.bookData.isShelf = !0));
                  }
                );
            },
          },
        };
      }).call(this, n("543d")["default"]);
    },
    "4a4b": function (e, t) {
      function n(t, r) {
        return (
          (e.exports = n =
            Object.setPrototypeOf
              ? Object.setPrototypeOf.bind()
              : function (e, t) {
                  return (e.__proto__ = t), e;
                }),
          (e.exports.__esModule = !0),
          (e.exports["default"] = e.exports),
          n(t, r)
        );
      }
      (e.exports = n),
        (e.exports.__esModule = !0),
        (e.exports["default"] = e.exports);
    },
    "4ea4": function (e, t) {
      function n(e) {
        return e && e.__esModule ? e : { default: e };
      }
      (e.exports = n),
        (e.exports.__esModule = !0),
        (e.exports["default"] = e.exports);
    },
    "4ec3": function (e, t, n) {
      "use strict";
      var r = n("4ea4");
      Object.defineProperty(t, "__esModule", { value: !0 }),
        (t.default = void 0);
      r(n("b775"));
      var i = {
        userauth: "/user/third/auth/byteDance/miniApp",
        usersyncUserInfo: "/user/account/syncUserInfo",
        userinfo: "/user/account/info",
        userrefreshToken: "/user/auth/refreshToken",
        usermobilecaptcha: "/user/auth/mobile/captcha",
        searchall: "/search/all",
        searchquery: "/search/query",
        shelfsearch: "/book/cdn/shelf/search",
        bookdetail: "/book/cdn/book",
        genAgentLink: "/book/cdn/genAgentLink",
        bindUserPartner: "/spider/partner/bindUserPartner",
        bookmenu: "/book/cdn/menu",
        bookchapter: "/book/cdn/chapter",
        bookshelf: "/book/cdn/shelf",
        bookbanner: "/book/cdn/home/banner",
        bookgenerate: "/book/share/code/generate",
        bookCdnInfo: "/book/cdn/book/detail",
        bookAllChapter: "/book/cdn/all/chapter",
        bookcommon: "/book/cdn/common",
        bookHome: "/book/cdn/home",
        bookPageList: "/book/cdn/shelf/page",
        bookMount: "/book/cdn/mount",
        bookWxLink: "/book/cdn/wxImgTextLink",
        bookVideo: "/spider/video/one",
        bookaudio: "/book/audio",
        taskBoxGroup: "/book/cdn/taskBoxGroup",
        taskBoxBookPage: "/book/cdn/taskBoxBookPage",
        stackTabs: "/book/cdn/library/banner",
        stackAllList: "/search/all",
        stackNewAllList: "/search/new/all",
        shelflist: "/user/user/shelf/list",
        shelfadd: "/user/user/shelf/add",
        shelfdel: "/user/user/shelf/del",
        syncUserInfo: "/user/account/syncUserInfo",
        noticeList: "/interact/notice/sysNotice/list",
        noticeDetail: "/interact/notice/sysNotice/info",
        noticeCount: "/interact/notice/isUnread",
        readrecordlist: "/book/read/record/list",
        readrecorddel: "/book/read/record/del",
        readrecordadd: "/book/read/record/add",
        paygrade: "/consume/core/pay/grade",
        payorderverify: "/consume/core/pay/order/verify",
        consumecreate: "/consume/core/pay/uniApp/order/create",
        tiktokconsumecreate: "/consume/tiktok/generalTrade/createOrder",
        consumepayloglist: "/consume/core/paylog/list",
        inComeForDouYinTask: "/consume/core/paylog/inComeForDouYinTask",
        inComeForDouYinTaskDetail:
          "/consume/core/paylog/inComeForDouYinTaskDetail",
        userbind: "/user/account/bind",
        bloggerinfo: "/user/account/blogger/info",
        corefirst: "/consume/core/paylog/income/first",
        corenext: "/consume/core/paylog/income/next",
        isShowPay: "/consume/core/pay/discount",
        corepaypage: "/consume/core/pay/page",
        recordlistgroup: "/consume/record/list/group",
        recordlisthost: "/consume/record/list/host",
        bonuslist: "/consume/record/bonus/list",
        authorCashlist: "/consume/core/paylog/authorCash/list",
        payeeget: "/user/account/payee/get",
        payeetax: "/user/account/payee/tax",
        paylogwithdrawal: "/consume/core/paylog/withdrawal",
        getauthorCash: "/consume/core/paylog/get/authorCash",
        bankList: "/consume/core/paylog/getBank",
        provinceList: "/consume/core/paylog/province",
        everydayhistorylist: "/interact/bountyMission/everyday/history/list",
        bountyMissioneveryday: "/interact/bountyMission/everyday",
        bountyMissionsubmit: "/interact/bountyMission/submitBountyMission",
        bountyMissiondetail: "/interact/bountyMission/history/detail",
        uploadphoto: "/interact/upload/photo",
        bountyMissionlimit: "/interact/bountyMission/time/limit",
        bloggercenter: "/user/account/blogger/center",
        bindisBindManage: "/manage/bind/isBindManage",
        bindcheckPhoneForBind: "/manage/bind/checkPhoneForBind",
        bindnewBind: "/manage/bind/newBind",
        bindappendBinding: "/manage/bind/appendBinding",
        bindresetPassword: "/manage/bind/resetPassword",
        bindremoveBinding: "/manage/bind/removeBinding",
        setgetbind: "/user/account/getBindUser",
        setbindUserId: "/user/account/setBindUser",
        wxbookcatalog: "/book/book/wx/catalog/",
        wxgetshelf: "/book/book/wx/get/shelf",
        wxupdateshelf: "/book/book/wx/update/shelf",
      };
      t.default = i;
    },
    "543d": function (e, t, n) {
      "use strict";
      (function (e, r) {
        var i = n("4ea4");
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.createApp = Un),
          (t.createComponent = Gn),
          (t.createPage = Jn),
          (t.createPlugin = Zn),
          (t.createSubpackageApp = Yn),
          (t.default = void 0);
        var o,
          a = i(n("278c")),
          s = i(n("9523")),
          c = i(n("b17c")),
          u = i(n("448a")),
          l = i(n("7037")),
          f = n("37dc"),
          d = i(n("66fd"));
        function p(e, t) {
          var n = Object.keys(e);
          if (Object.getOwnPropertySymbols) {
            var r = Object.getOwnPropertySymbols(e);
            t &&
              (r = r.filter(function (t) {
                return Object.getOwnPropertyDescriptor(e, t).enumerable;
              })),
              n.push.apply(n, r);
          }
          return n;
        }
        function h(e) {
          for (var t = 1; t < arguments.length; t++) {
            var n = null != arguments[t] ? arguments[t] : {};
            t % 2
              ? p(Object(n), !0).forEach(function (t) {
                  (0, s.default)(e, t, n[t]);
                })
              : Object.getOwnPropertyDescriptors
              ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
              : p(Object(n)).forEach(function (t) {
                  Object.defineProperty(
                    e,
                    t,
                    Object.getOwnPropertyDescriptor(n, t)
                  );
                });
          }
          return e;
        }
        var g =
            "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
          v =
            /^(?:[A-Za-z\d+/]{4})*?(?:[A-Za-z\d+/]{2}(?:==)?|[A-Za-z\d+/]{3}=?)?$/;
        function m(e) {
          return decodeURIComponent(
            o(e)
              .split("")
              .map(function (e) {
                return "%" + ("00" + e.charCodeAt(0).toString(16)).slice(-2);
              })
              .join("")
          );
        }
        function y() {
          var t,
            n = e.getStorageSync("uni_id_token") || "",
            r = n.split(".");
          if (!n || 3 !== r.length)
            return { uid: null, role: [], permission: [], tokenExpired: 0 };
          try {
            t = JSON.parse(m(r[1]));
          } catch (i) {
            throw new Error(
              "获取当前用户信息出错，详细错误信息为：" + i.message
            );
          }
          return (t.tokenExpired = 1e3 * t.exp), delete t.exp, delete t.iat, t;
        }
        function _(e) {
          (e.prototype.uniIDHasRole = function (e) {
            var t = y(),
              n = t.role;
            return n.indexOf(e) > -1;
          }),
            (e.prototype.uniIDHasPermission = function (e) {
              var t = y(),
                n = t.permission;
              return this.uniIDHasRole("admin") || n.indexOf(e) > -1;
            }),
            (e.prototype.uniIDTokenValid = function () {
              var e = y(),
                t = e.tokenExpired;
              return t > Date.now();
            });
        }
        o =
          "function" !== typeof atob
            ? function (e) {
                if (((e = String(e).replace(/[\t\n\f\r ]+/g, "")), !v.test(e)))
                  throw new Error(
                    "Failed to execute 'atob' on 'Window': The string to be decoded is not correctly encoded."
                  );
                var t;
                e += "==".slice(2 - (3 & e.length));
                for (var n, r, i = "", o = 0; o < e.length; )
                  (t =
                    (g.indexOf(e.charAt(o++)) << 18) |
                    (g.indexOf(e.charAt(o++)) << 12) |
                    ((n = g.indexOf(e.charAt(o++))) << 6) |
                    (r = g.indexOf(e.charAt(o++)))),
                    (i +=
                      64 === n
                        ? String.fromCharCode((t >> 16) & 255)
                        : 64 === r
                        ? String.fromCharCode((t >> 16) & 255, (t >> 8) & 255)
                        : String.fromCharCode(
                            (t >> 16) & 255,
                            (t >> 8) & 255,
                            255 & t
                          ));
                return i;
              }
            : atob;
        var b = Object.prototype.toString,
          w = Object.prototype.hasOwnProperty;
        function k(e) {
          return "function" === typeof e;
        }
        function x(e) {
          return "string" === typeof e;
        }
        function S(e) {
          return null !== e && "object" === (0, l.default)(e);
        }
        function A(e) {
          return "[object Object]" === b.call(e);
        }
        function I(e, t) {
          return w.call(e, t);
        }
        function O() {}
        function P(e) {
          var t = Object.create(null);
          return function (n) {
            var r = t[n];
            return r || (t[n] = e(n));
          };
        }
        var T = /-(\w)/g,
          C = P(function (e) {
            return e.replace(T, function (e, t) {
              return t ? t.toUpperCase() : "";
            });
          });
        function E(e) {
          var t = {};
          return (
            A(e) &&
              Object.keys(e)
                .sort()
                .forEach(function (n) {
                  t[n] = e[n];
                }),
            Object.keys(t) ? t : e
          );
        }
        var j = ["invoke", "success", "fail", "complete", "returnValue"],
          L = {},
          D = {};
        function M(e, t) {
          var n = t ? (e ? e.concat(t) : Array.isArray(t) ? t : [t]) : e;
          return n ? N(n) : n;
        }
        function N(e) {
          for (var t = [], n = 0; n < e.length; n++)
            -1 === t.indexOf(e[n]) && t.push(e[n]);
          return t;
        }
        function U(e, t) {
          var n = e.indexOf(t);
          -1 !== n && e.splice(n, 1);
        }
        function R(e, t) {
          Object.keys(t).forEach(function (n) {
            -1 !== j.indexOf(n) && k(t[n]) && (e[n] = M(e[n], t[n]));
          });
        }
        function $(e, t) {
          e &&
            t &&
            Object.keys(t).forEach(function (n) {
              -1 !== j.indexOf(n) && k(t[n]) && U(e[n], t[n]);
            });
        }
        function F(e, t) {
          "string" === typeof e && A(t)
            ? R(D[e] || (D[e] = {}), t)
            : A(e) && R(L, e);
        }
        function B(e, t) {
          "string" === typeof e
            ? A(t)
              ? $(D[e], t)
              : delete D[e]
            : A(e) && $(L, e);
        }
        function q(e, t) {
          return function (n) {
            return e(n, t) || n;
          };
        }
        function K(e) {
          return (
            !!e &&
            ("object" === (0, l.default)(e) || "function" === typeof e) &&
            "function" === typeof e.then
          );
        }
        function z(e, t, n) {
          for (var r = !1, i = 0; i < e.length; i++) {
            var o = e[i];
            if (r) r = Promise.resolve(q(o, n));
            else {
              var a = o(t, n);
              if ((K(a) && (r = Promise.resolve(a)), !1 === a))
                return { then: function () {} };
            }
          }
          return (
            r || {
              then: function (e) {
                return e(t);
              },
            }
          );
        }
        function V(e) {
          var t =
            arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
          return (
            ["success", "fail", "complete"].forEach(function (n) {
              if (Array.isArray(e[n])) {
                var r = t[n];
                t[n] = function (i) {
                  z(e[n], i, t).then(function (e) {
                    return (k(r) && r(e)) || e;
                  });
                };
              }
            }),
            t
          );
        }
        function H(e, t) {
          var n = [];
          Array.isArray(L.returnValue) &&
            n.push.apply(n, (0, u.default)(L.returnValue));
          var r = D[e];
          return (
            r &&
              Array.isArray(r.returnValue) &&
              n.push.apply(n, (0, u.default)(r.returnValue)),
            n.forEach(function (e) {
              t = e(t) || t;
            }),
            t
          );
        }
        function W(e) {
          var t = Object.create(null);
          Object.keys(L).forEach(function (e) {
            "returnValue" !== e && (t[e] = L[e].slice());
          });
          var n = D[e];
          return (
            n &&
              Object.keys(n).forEach(function (e) {
                "returnValue" !== e && (t[e] = (t[e] || []).concat(n[e]));
              }),
            t
          );
        }
        function J(e, t, n) {
          for (
            var r = arguments.length, i = new Array(r > 3 ? r - 3 : 0), o = 3;
            o < r;
            o++
          )
            i[o - 3] = arguments[o];
          var a = W(e);
          if (a && Object.keys(a).length) {
            if (Array.isArray(a.invoke)) {
              var s = z(a.invoke, n);
              return s.then(function (n) {
                return t.apply(void 0, [V(W(e), n)].concat(i));
              });
            }
            return t.apply(void 0, [V(a, n)].concat(i));
          }
          return t.apply(void 0, [n].concat(i));
        }
        var G = {
            returnValue: function (e) {
              return K(e)
                ? new Promise(function (t, n) {
                    e.then(function (e) {
                      e[0] ? n(e[0]) : t(e[1]);
                    });
                  })
                : e;
            },
          },
          Y =
            /^\$|Window$|WindowStyle$|sendHostEvent|sendNativeEvent|restoreGlobal|requireGlobal|getCurrentSubNVue|getMenuButtonBoundingClientRect|^report|interceptors|Interceptor$|getSubNVueById|requireNativePlugin|upx2px|hideKeyboard|canIUse|^create|Sync$|Manager$|base64ToArrayBuffer|arrayBufferToBase64|getLocale|setLocale|invokePushCallback|getWindowInfo|getDeviceInfo|getAppBaseInfo|getSystemSetting|getAppAuthorizeSetting|initUTS|requireUTS|registerUTS/,
          Z = /^create|Manager$/,
          X = ["createBLEConnection"],
          Q = ["createBLEConnection", "createPushMessage"],
          ee = /^on|^off/;
        function te(e) {
          return Z.test(e) && -1 === X.indexOf(e);
        }
        function ne(e) {
          return Y.test(e) && -1 === Q.indexOf(e);
        }
        function re(e) {
          return ee.test(e) && "onPush" !== e;
        }
        function ie(e) {
          return e
            .then(function (e) {
              return [null, e];
            })
            .catch(function (e) {
              return [e];
            });
        }
        function oe(e) {
          return !(te(e) || ne(e) || re(e));
        }
        function ae(e, t) {
          return oe(e) && k(t)
            ? function () {
                for (
                  var n =
                      arguments.length > 0 && void 0 !== arguments[0]
                        ? arguments[0]
                        : {},
                    r = arguments.length,
                    i = new Array(r > 1 ? r - 1 : 0),
                    o = 1;
                  o < r;
                  o++
                )
                  i[o - 1] = arguments[o];
                return k(n.success) || k(n.fail) || k(n.complete)
                  ? H(e, J.apply(void 0, [e, t, n].concat(i)))
                  : H(
                      e,
                      ie(
                        new Promise(function (r, o) {
                          J.apply(
                            void 0,
                            [
                              e,
                              t,
                              Object.assign({}, n, { success: r, fail: o }),
                            ].concat(i)
                          );
                        })
                      )
                    );
              }
            : t;
        }
        Promise.prototype.finally ||
          (Promise.prototype.finally = function (e) {
            var t = this.constructor;
            return this.then(
              function (n) {
                return t.resolve(e()).then(function () {
                  return n;
                });
              },
              function (n) {
                return t.resolve(e()).then(function () {
                  throw n;
                });
              }
            );
          });
        var se = 1e-4,
          ce = 750,
          ue = !1,
          le = 0,
          fe = 0;
        function de() {
          var t = e.getSystemInfoSync(),
            n = t.platform,
            r = t.pixelRatio,
            i = t.windowWidth;
          (le = i), (fe = r), (ue = "ios" === n);
        }
        function pe(e, t) {
          if ((0 === le && de(), (e = Number(e)), 0 === e)) return 0;
          var n = (e / ce) * (t || le);
          return (
            n < 0 && (n = -n),
            (n = Math.floor(n + se)),
            0 === n && (n = 1 !== fe && ue ? 0.5 : 1),
            e < 0 ? -n : n
          );
        }
        var he,
          ge = "zh-Hans",
          ve = "zh-Hant",
          me = "en",
          ye = "fr",
          _e = "es",
          be = {};
        function we() {
          if (Ae()) {
            var e = Object.keys(__uniConfig.locales);
            e.length &&
              e.forEach(function (e) {
                var t = be[e],
                  n = __uniConfig.locales[e];
                t ? Object.assign(t, n) : (be[e] = n);
              });
          }
        }
        (he = Pe(e.getSystemInfoSync().language) || me), we();
        var ke = (0, f.initVueI18n)(he, {}),
          xe = ke.t;
        (ke.mixin = {
          beforeCreate: function () {
            var e = this,
              t = ke.i18n.watchLocale(function () {
                e.$forceUpdate();
              });
            this.$once("hook:beforeDestroy", function () {
              t();
            });
          },
          methods: {
            $$t: function (e, t) {
              return xe(e, t);
            },
          },
        }),
          ke.setLocale,
          ke.getLocale;
        function Se(e, t, n) {
          var r = e.observable({ locale: n || ke.getLocale() }),
            i = [];
          (t.$watchLocale = function (e) {
            i.push(e);
          }),
            Object.defineProperty(t, "$locale", {
              get: function () {
                return r.locale;
              },
              set: function (e) {
                (r.locale = e),
                  i.forEach(function (t) {
                    return t(e);
                  });
              },
            });
        }
        function Ae() {
          return (
            "undefined" !== typeof __uniConfig &&
            __uniConfig.locales &&
            !!Object.keys(__uniConfig.locales).length
          );
        }
        function Ie(e, t) {
          return !!t.find(function (t) {
            return -1 !== e.indexOf(t);
          });
        }
        function Oe(e, t) {
          return t.find(function (t) {
            return 0 === e.indexOf(t);
          });
        }
        function Pe(e, t) {
          if (e) {
            if (((e = e.trim().replace(/_/g, "-")), t && t[e])) return e;
            if (((e = e.toLowerCase()), "chinese" === e)) return ge;
            if (0 === e.indexOf("zh"))
              return e.indexOf("-hans") > -1
                ? ge
                : e.indexOf("-hant") > -1 ||
                  Ie(e, ["-tw", "-hk", "-mo", "-cht"])
                ? ve
                : ge;
            var n = Oe(e, [me, ye, _e]);
            return n || void 0;
          }
        }
        function Te() {
          if (k(getApp)) {
            var t = getApp({ allowDefault: !0 });
            if (t && t.$vm) return t.$vm.$locale;
          }
          return Pe(e.getSystemInfoSync().language) || me;
        }
        function Ce(e) {
          var t = !!k(getApp) && getApp();
          if (!t) return !1;
          var n = t.$vm.$locale;
          return (
            n !== e &&
            ((t.$vm.$locale = e),
            Ee.forEach(function (t) {
              return t({ locale: e });
            }),
            !0)
          );
        }
        var Ee = [];
        function je(e) {
          -1 === Ee.indexOf(e) && Ee.push(e);
        }
        "undefined" !== typeof r && (r.getLocale = Te);
        var Le = { promiseInterceptor: G },
          De = Object.freeze({
            __proto__: null,
            upx2px: pe,
            getLocale: Te,
            setLocale: Ce,
            onLocaleChange: je,
            addInterceptor: F,
            removeInterceptor: B,
            interceptors: Le,
          });
        function Me(e) {
          var t = getCurrentPages(),
            n = t.length;
          while (n--) {
            var r = t[n];
            if (r.$page && r.$page.fullPath === e) return n;
          }
          return -1;
        }
        var Ne,
          Ue = {
            name: function (e) {
              return "back" === e.exists && e.delta
                ? "navigateBack"
                : "redirectTo";
            },
            args: function (e) {
              if ("back" === e.exists && e.url) {
                var t = Me(e.url);
                if (-1 !== t) {
                  var n = getCurrentPages().length - 1 - t;
                  n > 0 && (e.delta = n);
                }
              }
            },
          },
          Re = {
            args: function (e) {
              var t = parseInt(e.current);
              if (!isNaN(t)) {
                var n = e.urls;
                if (Array.isArray(n)) {
                  var r = n.length;
                  if (r)
                    return (
                      t < 0 ? (t = 0) : t >= r && (t = r - 1),
                      t > 0
                        ? ((e.current = n[t]),
                          (e.urls = n.filter(function (e, r) {
                            return !(r < t) || e !== n[t];
                          })))
                        : (e.current = n[0]),
                      { indicator: !1, loop: !1 }
                    );
                }
              }
            },
          },
          $e = "__DC_STAT_UUID";
        function Fe(t) {
          (Ne = Ne || e.getStorageSync($e)),
            Ne ||
              ((Ne = Date.now() + "" + Math.floor(1e7 * Math.random())),
              e.setStorage({ key: $e, data: Ne })),
            (t.deviceId = Ne);
        }
        function Be(e) {
          if (e.safeArea) {
            var t = e.safeArea;
            e.safeAreaInsets = {
              top: t.top,
              left: t.left,
              right: e.windowWidth - t.right,
              bottom: e.screenHeight - t.bottom,
            };
          }
        }
        function qe(e) {
          var t = e.brand,
            n = void 0 === t ? "" : t,
            r = e.model,
            i = void 0 === r ? "" : r,
            o = e.system,
            a = void 0 === o ? "" : o,
            s = e.language,
            c = void 0 === s ? "" : s,
            u = e.theme,
            l = e.version,
            f = (e.platform, e.fontSizeSetting),
            d = e.SDKVersion,
            p = e.pixelRatio,
            h = e.deviceOrientation,
            g = {},
            v = "",
            m = "";
          (v = a.split(" ")[0] || ""), (m = a.split(" ")[1] || "");
          var y = l,
            _ = Ke(e, i),
            b = ze(n),
            w = He(e),
            k = h,
            x = p,
            S = d,
            A = c.replace(/_/g, "-"),
            I = {
              appId: "__UNI__AB5B3BC",
              appName: "dengman",
              appVersion: "1.0.0",
              appVersionCode: "100",
              appLanguage: Ve(A),
              uniCompileVersion: "4.24",
              uniRuntimeVersion: "4.24",
              uniPlatform: "mp-weixin",
              deviceBrand: b,
              deviceModel: i,
              deviceType: _,
              devicePixelRatio: x,
              deviceOrientation: k,
              osName: v.toLocaleLowerCase(),
              osVersion: m,
              hostTheme: u,
              hostVersion: y,
              hostLanguage: A,
              hostName: w,
              hostSDKVersion: S,
              hostFontSizeSetting: f,
              windowTop: 0,
              windowBottom: 0,
              osLanguage: void 0,
              osTheme: void 0,
              ua: void 0,
              hostPackageName: void 0,
              browserName: void 0,
              browserVersion: void 0,
            };
          Object.assign(e, I, g);
        }
        function Ke(e, t) {
          for (
            var n = e.deviceType || "phone",
              r = { ipad: "pad", windows: "pc", mac: "pc" },
              i = Object.keys(r),
              o = t.toLocaleLowerCase(),
              a = 0;
            a < i.length;
            a++
          ) {
            var s = i[a];
            if (-1 !== o.indexOf(s)) {
              n = r[s];
              break;
            }
          }
          return n;
        }
        function ze(e) {
          var t = e;
          return t && (t = e.toLocaleLowerCase()), t;
        }
        function Ve(e) {
          return Te ? Te() : e;
        }
        function He(e) {
          var t = "WeChat",
            n = e.hostName || t;
          return (
            e.environment
              ? (n = e.environment)
              : e.host && e.host.env && (n = e.host.env),
            n
          );
        }
        var We = {
            returnValue: function (e) {
              Fe(e), Be(e), qe(e);
            },
          },
          Je = {
            args: function (e) {
              "object" === (0, l.default)(e) && (e.alertText = e.title);
            },
          },
          Ge = {
            returnValue: function (e) {
              var t = e,
                n = t.version,
                r = t.language,
                i = t.SDKVersion,
                o = t.theme,
                a = He(e),
                s = r.replace("_", "-");
              e = E(
                Object.assign(e, {
                  appId: "__UNI__AB5B3BC",
                  appName: "dengman",
                  appVersion: "1.0.0",
                  appVersionCode: "100",
                  appLanguage: Ve(s),
                  hostVersion: n,
                  hostLanguage: s,
                  hostName: a,
                  hostSDKVersion: i,
                  hostTheme: o,
                })
              );
            },
          },
          Ye = {
            returnValue: function (e) {
              var t = e,
                n = t.brand,
                r = t.model,
                i = Ke(e, r),
                o = ze(n);
              Fe(e),
                (e = E(
                  Object.assign(e, {
                    deviceType: i,
                    deviceBrand: o,
                    deviceModel: r,
                  })
                ));
            },
          },
          Ze = {
            returnValue: function (e) {
              Be(e),
                (e = E(Object.assign(e, { windowTop: 0, windowBottom: 0 })));
            },
          },
          Xe = {
            returnValue: function (e) {
              var t = e.locationReducedAccuracy;
              (e.locationAccuracy = "unsupported"),
                !0 === t
                  ? (e.locationAccuracy = "reduced")
                  : !1 === t && (e.locationAccuracy = "full");
            },
          },
          Qe = {
            args: function (e) {
              e.compressedHeight &&
                !e.compressHeight &&
                (e.compressHeight = e.compressedHeight),
                e.compressedWidth &&
                  !e.compressWidth &&
                  (e.compressWidth = e.compressedWidth);
            },
          },
          et = {
            redirectTo: Ue,
            previewImage: Re,
            getSystemInfo: We,
            getSystemInfoSync: We,
            showActionSheet: Je,
            getAppBaseInfo: Ge,
            getDeviceInfo: Ye,
            getWindowInfo: Ze,
            getAppAuthorizeSetting: Xe,
            compressImage: Qe,
          },
          tt = ["vibrate", "preloadPage", "unPreloadPage", "loadSubPackage"],
          nt = [],
          rt = ["success", "fail", "cancel", "complete"];
        function it(e, t, n) {
          return function (r) {
            return t(at(e, r, n));
          };
        }
        function ot(e, t) {
          var n =
              arguments.length > 2 && void 0 !== arguments[2]
                ? arguments[2]
                : {},
            r =
              arguments.length > 3 && void 0 !== arguments[3]
                ? arguments[3]
                : {},
            i = arguments.length > 4 && void 0 !== arguments[4] && arguments[4];
          if (A(t)) {
            var o = !0 === i ? t : {};
            for (var a in (k(n) && (n = n(t, o) || {}), t))
              if (I(n, a)) {
                var s = n[a];
                k(s) && (s = s(t[a], t, o)),
                  s
                    ? x(s)
                      ? (o[s] = t[a])
                      : A(s) && (o[s.name ? s.name : a] = s.value)
                    : console.warn(
                        "The '"
                          .concat(
                            e,
                            "' method of platform '微信小程序' does not support option '"
                          )
                          .concat(a, "'")
                      );
              } else
                -1 !== rt.indexOf(a)
                  ? k(t[a]) && (o[a] = it(e, t[a], r))
                  : i || (o[a] = t[a]);
            return o;
          }
          return k(t) && (t = it(e, t, r)), t;
        }
        function at(e, t, n) {
          var r =
            arguments.length > 3 && void 0 !== arguments[3] && arguments[3];
          return (
            k(et.returnValue) && (t = et.returnValue(e, t)), ot(e, t, n, {}, r)
          );
        }
        function st(t, n) {
          if (I(et, t)) {
            var r = et[t];
            return r
              ? function (n, i) {
                  var o = r;
                  k(r) && (o = r(n)), (n = ot(t, n, o.args, o.returnValue));
                  var a = [n];
                  "undefined" !== typeof i && a.push(i),
                    k(o.name) ? (t = o.name(n)) : x(o.name) && (t = o.name);
                  var s = e[t].apply(e, a);
                  return ne(t) ? at(t, s, o.returnValue, te(t)) : s;
                }
              : function () {
                  console.error(
                    "Platform '微信小程序' does not support '".concat(t, "'.")
                  );
                };
          }
          return n;
        }
        var ct = Object.create(null),
          ut = [
            "onTabBarMidButtonTap",
            "subscribePush",
            "unsubscribePush",
            "onPush",
            "offPush",
            "share",
          ];
        function lt(e) {
          return function (t) {
            var n = t.fail,
              r = t.complete,
              i = {
                errMsg: ""
                  .concat(e, ":fail method '")
                  .concat(e, "' not supported"),
              };
            k(n) && n(i), k(r) && r(i);
          };
        }
        ut.forEach(function (e) {
          ct[e] = lt(e);
        });
        var ft = {
          oauth: ["weixin"],
          share: ["weixin"],
          payment: ["wxpay"],
          push: ["weixin"],
        };
        function dt(e) {
          var t = e.service,
            n = e.success,
            r = e.fail,
            i = e.complete,
            o = !1;
          ft[t]
            ? ((o = { errMsg: "getProvider:ok", service: t, provider: ft[t] }),
              k(n) && n(o))
            : ((o = { errMsg: "getProvider:fail service not found" }),
              k(r) && r(o)),
            k(i) && i(o);
        }
        var pt = Object.freeze({ __proto__: null, getProvider: dt }),
          ht = (function () {
            var e;
            return function () {
              return e || (e = new d.default()), e;
            };
          })();
        function gt(e, t, n) {
          return e[t].apply(e, n);
        }
        function vt() {
          return gt(ht(), "$on", Array.prototype.slice.call(arguments));
        }
        function mt() {
          return gt(ht(), "$off", Array.prototype.slice.call(arguments));
        }
        function yt() {
          return gt(ht(), "$once", Array.prototype.slice.call(arguments));
        }
        function _t() {
          return gt(ht(), "$emit", Array.prototype.slice.call(arguments));
        }
        var bt,
          wt,
          kt,
          xt = Object.freeze({
            __proto__: null,
            $on: vt,
            $off: mt,
            $once: yt,
            $emit: _t,
          });
        function St(e) {
          return function () {
            try {
              return e.apply(e, arguments);
            } catch (t) {
              console.error(t);
            }
          };
        }
        function At(e) {
          var t = {};
          for (var n in e) {
            var r = e[n];
            k(r) && ((t[n] = St(r)), delete e[n]);
          }
          return t;
        }
        function It(e) {
          try {
            return JSON.parse(e);
          } catch (t) {}
          return e;
        }
        function Ot(e) {
          if ("enabled" === e.type) kt = !0;
          else if ("clientId" === e.type)
            (bt = e.cid), (wt = e.errMsg), Tt(bt, e.errMsg);
          else if ("pushMsg" === e.type)
            for (
              var t = { type: "receive", data: It(e.message) }, n = 0;
              n < Et.length;
              n++
            ) {
              var r = Et[n];
              if ((r(t), t.stopped)) break;
            }
          else
            "click" === e.type &&
              Et.forEach(function (t) {
                t({ type: "click", data: It(e.message) });
              });
        }
        var Pt = [];
        function Tt(e, t) {
          Pt.forEach(function (n) {
            n(e, t);
          }),
            (Pt.length = 0);
        }
        function Ct(e) {
          A(e) || (e = {});
          var t = At(e),
            n = t.success,
            r = t.fail,
            i = t.complete,
            o = k(n),
            a = k(r),
            s = k(i);
          Promise.resolve().then(function () {
            "undefined" === typeof kt &&
              ((kt = !1), (bt = ""), (wt = "uniPush is not enabled")),
              Pt.push(function (e, t) {
                var c;
                e
                  ? ((c = { errMsg: "getPushClientId:ok", cid: e }), o && n(c))
                  : ((c = {
                      errMsg: "getPushClientId:fail" + (t ? " " + t : ""),
                    }),
                    a && r(c)),
                  s && i(c);
              }),
              "undefined" !== typeof bt && Tt(bt, wt);
          });
        }
        var Et = [],
          jt = function (e) {
            -1 === Et.indexOf(e) && Et.push(e);
          },
          Lt = function (e) {
            if (e) {
              var t = Et.indexOf(e);
              t > -1 && Et.splice(t, 1);
            } else Et.length = 0;
          },
          Dt = e.getAppBaseInfo && e.getAppBaseInfo();
        Dt || (Dt = e.getSystemInfoSync());
        var Mt = Dt ? Dt.host : null,
          Nt =
            Mt && "SAAASDK" === Mt.env
              ? e.miniapp.shareVideoMessage
              : e.shareVideoMessage,
          Ut = Object.freeze({
            __proto__: null,
            shareVideoMessage: Nt,
            getPushClientId: Ct,
            onPushMessage: jt,
            offPushMessage: Lt,
            invokePushCallback: Ot,
          }),
          Rt = ["__route__", "__wxExparserNodeId__", "__wxWebviewId__"];
        function $t(e, t) {
          for (var n, r = e.$children, i = r.length - 1; i >= 0; i--) {
            var o = r[i];
            if (o.$scope._$vueId === t) return o;
          }
          for (var a = r.length - 1; a >= 0; a--)
            if (((n = $t(r[a], t)), n)) return n;
        }
        function Ft(e) {
          return Behavior(e);
        }
        function Bt() {
          return !!this.route;
        }
        function qt(e) {
          this.triggerEvent("__l", e);
        }
        function Kt(e, t, n) {
          var r = e.selectAllComponents(t) || [];
          r.forEach(function (e) {
            var r = e.dataset.ref;
            (n[r] = e.$vm || Jt(e)),
              "scoped" === e.dataset.vueGeneric &&
                e.selectAllComponents(".scoped-ref").forEach(function (e) {
                  Kt(e, t, n);
                });
          });
        }
        function zt(e, t) {
          var n = (0, c.default)(Set, (0, u.default)(Object.keys(e))),
            r = Object.keys(t);
          return (
            r.forEach(function (r) {
              var i = e[r],
                o = t[r];
              (Array.isArray(i) &&
                Array.isArray(o) &&
                i.length === o.length &&
                o.every(function (e) {
                  return i.includes(e);
                })) ||
                ((e[r] = o), n.delete(r));
            }),
            n.forEach(function (t) {
              delete e[t];
            }),
            e
          );
        }
        function Vt(e) {
          var t = e.$scope,
            n = {};
          Object.defineProperty(e, "$refs", {
            get: function () {
              var e = {};
              Kt(t, ".vue-ref", e);
              var r = t.selectAllComponents(".vue-ref-in-for") || [];
              return (
                r.forEach(function (t) {
                  var n = t.dataset.ref;
                  e[n] || (e[n] = []), e[n].push(t.$vm || Jt(t));
                }),
                zt(n, e)
              );
            },
          });
        }
        function Ht(e) {
          var t,
            n = e.detail || e.value,
            r = n.vuePid,
            i = n.vueOptions;
          r && (t = $t(this.$vm, r)), t || (t = this.$vm), (i.parent = t);
        }
        function Wt(e) {
          var t = "__v_isMPComponent";
          return (
            Object.defineProperty(e, t, {
              configurable: !0,
              enumerable: !1,
              value: !0,
            }),
            e
          );
        }
        function Jt(e) {
          var t = "__ob__",
            n = "__v_skip";
          return (
            S(e) &&
              Object.isExtensible(e) &&
              Object.defineProperty(e, t, {
                configurable: !0,
                enumerable: !1,
                value: (0, s.default)({}, n, !0),
              }),
            e
          );
        }
        var Gt = /_(.*)_worklet_factory_/;
        function Yt(e, t) {
          t &&
            Object.keys(t).forEach(function (n) {
              var r = n.match(Gt);
              if (r) {
                var i = r[1];
                (e[n] = t[n]), (e[i] = t[i]);
              }
            });
        }
        var Zt = Page,
          Xt = Component,
          Qt = /:/g,
          en = P(function (e) {
            return C(e.replace(Qt, "-"));
          });
        function tn(e) {
          var t = e.triggerEvent,
            n = function (e) {
              for (
                var n = arguments.length,
                  r = new Array(n > 1 ? n - 1 : 0),
                  i = 1;
                i < n;
                i++
              )
                r[i - 1] = arguments[i];
              if (this.$vm || (this.dataset && this.dataset.comType)) e = en(e);
              else {
                var o = en(e);
                o !== e && t.apply(this, [o].concat(r));
              }
              return t.apply(this, [e].concat(r));
            };
          try {
            e.triggerEvent = n;
          } catch (r) {
            e._triggerEvent = n;
          }
        }
        function nn(e, t, n) {
          var r = t[e];
          t[e] = function () {
            if ((Wt(this), tn(this), r)) {
              for (
                var e = arguments.length, t = new Array(e), n = 0;
                n < e;
                n++
              )
                t[n] = arguments[n];
              return r.apply(this, t);
            }
          };
        }
        Zt.__$wrappered ||
          ((Zt.__$wrappered = !0),
          (Page = function () {
            var e =
              arguments.length > 0 && void 0 !== arguments[0]
                ? arguments[0]
                : {};
            return nn("onLoad", e), Zt(e);
          }),
          (Page.after = Zt.after),
          (Component = function () {
            var e =
              arguments.length > 0 && void 0 !== arguments[0]
                ? arguments[0]
                : {};
            return nn("created", e), Xt(e);
          }));
        var rn = [
          "onPullDownRefresh",
          "onReachBottom",
          "onAddToFavorites",
          "onShareTimeline",
          "onShareAppMessage",
          "onPageScroll",
          "onResize",
          "onTabItemTap",
        ];
        function on(e, t) {
          var n = e.$mp[e.mpType];
          t.forEach(function (t) {
            I(n, t) && (e[t] = n[t]);
          });
        }
        function an(e, t) {
          if (!t) return !0;
          if (d.default.options && Array.isArray(d.default.options[e]))
            return !0;
          if (((t = t.default || t), k(t)))
            return (
              !!k(t.extendOptions[e]) ||
              !!(
                t.super &&
                t.super.options &&
                Array.isArray(t.super.options[e])
              )
            );
          if (k(t[e]) || Array.isArray(t[e])) return !0;
          var n = t.mixins;
          return Array.isArray(n)
            ? !!n.find(function (t) {
                return an(e, t);
              })
            : void 0;
        }
        function sn(e, t, n) {
          t.forEach(function (t) {
            an(t, n) &&
              (e[t] = function (e) {
                return this.$vm && this.$vm.__call_hook(t, e);
              });
          });
        }
        function cn(e, t) {
          var n =
            arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : [];
          un(t).forEach(function (t) {
            return ln(e, t, n);
          });
        }
        function un(e) {
          var t =
            arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : [];
          return (
            e &&
              Object.keys(e).forEach(function (n) {
                0 === n.indexOf("on") && k(e[n]) && t.push(n);
              }),
            t
          );
        }
        function ln(e, t, n) {
          -1 !== n.indexOf(t) ||
            I(e, t) ||
            (e[t] = function (e) {
              return this.$vm && this.$vm.__call_hook(t, e);
            });
        }
        function fn(e, t) {
          var n;
          return (
            (t = t.default || t),
            (n = k(t) ? t : e.extend(t)),
            (t = n.options),
            [n, t]
          );
        }
        function dn(e, t) {
          if (Array.isArray(t) && t.length) {
            var n = Object.create(null);
            t.forEach(function (e) {
              n[e] = !0;
            }),
              (e.$scopedSlots = e.$slots = n);
          }
        }
        function pn(e, t) {
          e = (e || "").split(",");
          var n = e.length;
          1 === n
            ? (t._$vueId = e[0])
            : 2 === n && ((t._$vueId = e[0]), (t._$vuePid = e[1]));
        }
        function hn(e, t) {
          var n = e.data || {},
            r = e.methods || {};
          if ("function" === typeof n)
            try {
              n = n.call(t);
            } catch (i) {
              Object({
                NODE_ENV: "production",
                VUE_APP_DARK_MODE: "false",
                VUE_APP_NAME: "dengman",
                VUE_APP_PLATFORM: "mp-weixin",
                BASE_URL: "/",
              }).VUE_APP_DEBUG &&
                console.warn(
                  "根据 Vue 的 data 函数初始化小程序 data 失败，请尽量确保 data 函数中不访问 vm 对象，否则可能影响首次数据渲染速度。",
                  n
                );
            }
          else
            try {
              n = JSON.parse(JSON.stringify(n));
            } catch (i) {}
          return (
            A(n) || (n = {}),
            Object.keys(r).forEach(function (e) {
              -1 !== t.__lifecycle_hooks__.indexOf(e) ||
                I(n, e) ||
                (n[e] = r[e]);
            }),
            n
          );
        }
        var gn = [String, Number, Boolean, Object, Array, null];
        function vn(e) {
          return function (t, n) {
            this.$vm && (this.$vm[e] = t);
          };
        }
        function mn(e, t) {
          var n = e.behaviors,
            r = e.extends,
            i = e.mixins,
            o = e.props;
          o || (e.props = o = []);
          var a = [];
          return (
            Array.isArray(n) &&
              n.forEach(function (e) {
                a.push(e.replace("uni://", "wx".concat("://"))),
                  "uni://form-field" === e &&
                    (Array.isArray(o)
                      ? (o.push("name"), o.push("value"))
                      : ((o.name = { type: String, default: "" }),
                        (o.value = {
                          type: [String, Number, Boolean, Array, Object, Date],
                          default: "",
                        })));
              }),
            A(r) && r.props && a.push(t({ properties: _n(r.props, !0) })),
            Array.isArray(i) &&
              i.forEach(function (e) {
                A(e) && e.props && a.push(t({ properties: _n(e.props, !0) }));
              }),
            a
          );
        }
        function yn(e, t, n, r) {
          return Array.isArray(t) && 1 === t.length ? t[0] : t;
        }
        function _n(e) {
          var t =
              arguments.length > 1 && void 0 !== arguments[1] && arguments[1],
            n = arguments.length > 3 ? arguments[3] : void 0,
            r = {};
          return (
            t ||
              ((r.vueId = { type: String, value: "" }),
              n.virtualHost &&
                ((r.virtualHostStyle = { type: null, value: "" }),
                (r.virtualHostClass = { type: null, value: "" })),
              (r.scopedSlotsCompiler = { type: String, value: "" }),
              (r.vueSlots = {
                type: null,
                value: [],
                observer: function (e, t) {
                  var n = Object.create(null);
                  e.forEach(function (e) {
                    n[e] = !0;
                  }),
                    this.setData({ $slots: n });
                },
              })),
            Array.isArray(e)
              ? e.forEach(function (e) {
                  r[e] = { type: null, observer: vn(e) };
                })
              : A(e) &&
                Object.keys(e).forEach(function (t) {
                  var n = e[t];
                  if (A(n)) {
                    var i = n.default;
                    k(i) && (i = i()),
                      (n.type = yn(t, n.type)),
                      (r[t] = {
                        type: -1 !== gn.indexOf(n.type) ? n.type : null,
                        value: i,
                        observer: vn(t),
                      });
                  } else {
                    var o = yn(t, n);
                    r[t] = {
                      type: -1 !== gn.indexOf(o) ? o : null,
                      observer: vn(t),
                    };
                  }
                }),
            r
          );
        }
        function bn(e) {
          try {
            e.mp = JSON.parse(JSON.stringify(e));
          } catch (t) {}
          return (
            (e.stopPropagation = O),
            (e.preventDefault = O),
            (e.target = e.target || {}),
            I(e, "detail") || (e.detail = {}),
            I(e, "markerId") &&
              ((e.detail =
                "object" === (0, l.default)(e.detail) ? e.detail : {}),
              (e.detail.markerId = e.markerId)),
            A(e.detail) && (e.target = Object.assign({}, e.target, e.detail)),
            e
          );
        }
        function wn(e, t) {
          var n = e;
          return (
            t.forEach(function (t) {
              var r = t[0],
                i = t[2];
              if (r || "undefined" !== typeof i) {
                var o,
                  a = t[1],
                  s = t[3];
                Number.isInteger(r)
                  ? (o = r)
                  : r
                  ? "string" === typeof r &&
                    r &&
                    (o =
                      0 === r.indexOf("#s#")
                        ? r.substr(3)
                        : e.__get_value(r, n))
                  : (o = n),
                  Number.isInteger(o)
                    ? (n = i)
                    : a
                    ? Array.isArray(o)
                      ? (n = o.find(function (t) {
                          return e.__get_value(a, t) === i;
                        }))
                      : A(o)
                      ? (n = Object.keys(o).find(function (t) {
                          return e.__get_value(a, o[t]) === i;
                        }))
                      : console.error("v-for 暂不支持循环数据：", o)
                    : (n = o[i]),
                  s && (n = e.__get_value(s, n));
              }
            }),
            n
          );
        }
        function kn(e, t, n, r) {
          var i = {};
          return (
            Array.isArray(t) &&
              t.length &&
              t.forEach(function (t, o) {
                "string" === typeof t
                  ? t
                    ? "$event" === t
                      ? (i["$" + o] = n)
                      : "arguments" === t
                      ? (i["$" + o] = (n.detail && n.detail.__args__) || r)
                      : 0 === t.indexOf("$event.")
                      ? (i["$" + o] = e.__get_value(
                          t.replace("$event.", ""),
                          n
                        ))
                      : (i["$" + o] = e.__get_value(t))
                    : (i["$" + o] = e)
                  : (i["$" + o] = wn(e, t));
              }),
            i
          );
        }
        function xn(e) {
          for (var t = {}, n = 1; n < e.length; n++) {
            var r = e[n];
            t[r[0]] = r[1];
          }
          return t;
        }
        function Sn(e, t) {
          var n =
              arguments.length > 2 && void 0 !== arguments[2]
                ? arguments[2]
                : [],
            r =
              arguments.length > 3 && void 0 !== arguments[3]
                ? arguments[3]
                : [],
            i = arguments.length > 4 ? arguments[4] : void 0,
            o = arguments.length > 5 ? arguments[5] : void 0,
            a = !1,
            s = (A(t.detail) && t.detail.__args__) || [t.detail];
          if (
            i &&
            ((a =
              t.currentTarget &&
              t.currentTarget.dataset &&
              "wx" === t.currentTarget.dataset.comType),
            !n.length)
          )
            return a ? [t] : s;
          var c = kn(e, r, t, s),
            u = [];
          return (
            n.forEach(function (e) {
              "$event" === e
                ? "__set_model" !== o || i
                  ? i && !a
                    ? u.push(s[0])
                    : u.push(t)
                  : u.push(t.target.value)
                : Array.isArray(e) && "o" === e[0]
                ? u.push(xn(e))
                : "string" === typeof e && I(c, e)
                ? u.push(c[e])
                : u.push(e);
            }),
            u
          );
        }
        var An = "~",
          In = "^";
        function On(e, t) {
          return (
            e === t || ("regionchange" === t && ("begin" === e || "end" === e))
          );
        }
        function Pn(e) {
          var t = e.$parent;
          while (
            t &&
            t.$parent &&
            (t.$options.generic ||
              t.$parent.$options.generic ||
              t.$scope._$vuePid)
          )
            t = t.$parent;
          return t && t.$parent;
        }
        function Tn(e) {
          var t = this;
          e = bn(e);
          var n = (e.currentTarget || e.target).dataset;
          if (!n) return console.warn("事件信息不存在");
          var r = n.eventOpts || n["event-opts"];
          if (!r) return console.warn("事件信息不存在");
          var i = e.type,
            o = [];
          return (
            r.forEach(function (n) {
              var r = n[0],
                a = n[1],
                s = r.charAt(0) === In;
              r = s ? r.slice(1) : r;
              var c = r.charAt(0) === An;
              (r = c ? r.slice(1) : r),
                a &&
                  On(i, r) &&
                  a.forEach(function (n) {
                    var r = n[0];
                    if (r) {
                      var i = t.$vm;
                      if (
                        (i.$options.generic && (i = Pn(i) || i), "$emit" === r)
                      )
                        return void i.$emit.apply(
                          i,
                          Sn(t.$vm, e, n[1], n[2], s, r)
                        );
                      var a = i[r];
                      if (!k(a)) {
                        var u = "page" === t.$vm.mpType ? "Page" : "Component",
                          l = t.route || t.is;
                        throw new Error(
                          ""
                            .concat(u, ' "')
                            .concat(l, '" does not have a method "')
                            .concat(r, '"')
                        );
                      }
                      if (c) {
                        if (a.once) return;
                        a.once = !0;
                      }
                      var f = Sn(t.$vm, e, n[1], n[2], s, r);
                      (f = Array.isArray(f) ? f : []),
                        /=\s*\S+\.eventParams\s*\|\|\s*\S+\[['"]event-params['"]\]/.test(
                          a.toString()
                        ) && (f = f.concat([, , , , , , , , , , e])),
                        o.push(a.apply(i, f));
                    }
                  });
            }),
            "input" === i && 1 === o.length && "undefined" !== typeof o[0]
              ? o[0]
              : void 0
          );
        }
        var Cn = {};
        function En(e) {
          var t = Cn[e];
          return delete Cn[e], t;
        }
        var jn = [
          "onShow",
          "onHide",
          "onError",
          "onPageNotFound",
          "onThemeChange",
          "onUnhandledRejection",
        ];
        function Ln() {
          d.default.prototype.getOpenerEventChannel = function () {
            return this.$scope.getOpenerEventChannel();
          };
          var e = d.default.prototype.__call_hook;
          d.default.prototype.__call_hook = function (t, n) {
            return (
              "onLoad" === t &&
                n &&
                n.__id__ &&
                ((this.__eventChannel__ = En(n.__id__)), delete n.__id__),
              e.call(this, t, n)
            );
          };
        }
        function Dn() {
          var e = {},
            t = {};
          function n(e) {
            var t = this.$options.propsData.vueId;
            if (t) {
              var n = t.split(",")[0];
              e(n);
            }
          }
          (d.default.prototype.$hasSSP = function (n) {
            var r = e[n];
            return (
              r ||
                ((t[n] = this),
                this.$on("hook:destroyed", function () {
                  delete t[n];
                })),
              r
            );
          }),
            (d.default.prototype.$getSSP = function (t, n, r) {
              var i = e[t];
              if (i) {
                var o = i[n] || [];
                return r ? o : o[0];
              }
            }),
            (d.default.prototype.$setSSP = function (t, r) {
              var i = 0;
              return (
                n.call(this, function (n) {
                  var o = e[n],
                    a = (o[t] = o[t] || []);
                  a.push(r), (i = a.length - 1);
                }),
                i
              );
            }),
            (d.default.prototype.$initSSP = function () {
              n.call(this, function (t) {
                e[t] = {};
              });
            }),
            (d.default.prototype.$callSSP = function () {
              n.call(this, function (e) {
                t[e] && t[e].$forceUpdate();
              });
            }),
            d.default.mixin({
              destroyed: function () {
                var n = this.$options.propsData,
                  r = n && n.vueId;
                r && (delete e[r], delete t[r]);
              },
            });
        }
        function Mn(t, n) {
          var r = n.mocks,
            i = n.initRefs;
          Ln(),
            Dn(),
            t.$options.store && (d.default.prototype.$store = t.$options.store),
            _(d.default),
            (d.default.prototype.mpHost = "mp-weixin"),
            d.default.mixin({
              beforeCreate: function () {
                if (this.$options.mpType) {
                  if (
                    ((this.mpType = this.$options.mpType),
                    (this.$mp = (0, s.default)(
                      { data: {} },
                      this.mpType,
                      this.$options.mpInstance
                    )),
                    (this.$scope = this.$options.mpInstance),
                    delete this.$options.mpType,
                    delete this.$options.mpInstance,
                    "page" === this.mpType && "function" === typeof getApp)
                  ) {
                    var e = getApp();
                    e.$vm && e.$vm.$i18n && (this._i18n = e.$vm.$i18n);
                  }
                  "app" !== this.mpType && (i(this), on(this, r));
                }
              },
            });
          var o = {
            onLaunch: function (n) {
              this.$vm ||
                (e.canIUse &&
                  !e.canIUse("nextTick") &&
                  console.error(
                    "当前微信基础库版本过低，请将 微信开发者工具-详情-项目设置-调试基础库版本 更换为`2.3.0`以上"
                  ),
                (this.$vm = t),
                (this.$vm.$mp = { app: this }),
                (this.$vm.$scope = this),
                (this.$vm.globalData = this.globalData),
                (this.$vm._isMounted = !0),
                this.$vm.__call_hook("mounted", n),
                this.$vm.__call_hook("onLaunch", n));
            },
          };
          o.globalData = t.$options.globalData || {};
          var a = t.$options.methods;
          return (
            a &&
              Object.keys(a).forEach(function (e) {
                o[e] = a[e];
              }),
            Se(d.default, t, Pe(e.getSystemInfoSync().language) || me),
            sn(o, jn),
            cn(o, t.$options),
            o
          );
        }
        function Nn(e) {
          return Mn(e, { mocks: Rt, initRefs: Vt });
        }
        function Un(e) {
          return App(Nn(e)), e;
        }
        var Rn = /[!'()*]/g,
          $n = function (e) {
            return "%" + e.charCodeAt(0).toString(16);
          },
          Fn = /%2C/g,
          Bn = function (e) {
            return encodeURIComponent(e).replace(Rn, $n).replace(Fn, ",");
          };
        function qn(e) {
          var t =
              arguments.length > 1 && void 0 !== arguments[1]
                ? arguments[1]
                : Bn,
            n = e
              ? Object.keys(e)
                  .map(function (n) {
                    var r = e[n];
                    if (void 0 === r) return "";
                    if (null === r) return t(n);
                    if (Array.isArray(r)) {
                      var i = [];
                      return (
                        r.forEach(function (e) {
                          void 0 !== e &&
                            (null === e
                              ? i.push(t(n))
                              : i.push(t(n) + "=" + t(e)));
                        }),
                        i.join("&")
                      );
                    }
                    return t(n) + "=" + t(r);
                  })
                  .filter(function (e) {
                    return e.length > 0;
                  })
                  .join("&")
              : null;
          return n ? "?".concat(n) : "";
        }
        function Kn(e) {
          var t =
              arguments.length > 1 && void 0 !== arguments[1]
                ? arguments[1]
                : {},
            n = t.isPage,
            r = t.initRelation,
            i = arguments.length > 2 ? arguments[2] : void 0,
            o = fn(d.default, e),
            s = (0, a.default)(o, 2),
            c = s[0],
            u = s[1],
            l = h({ multipleSlots: !0, addGlobalClass: !0 }, u.options || {});
          u["mp-weixin"] &&
            u["mp-weixin"].options &&
            Object.assign(l, u["mp-weixin"].options);
          var f = {
            options: l,
            data: hn(u, d.default.prototype),
            behaviors: mn(u, Ft),
            properties: _n(u.props, !1, u.__file, l),
            lifetimes: {
              attached: function () {
                var e = this.properties,
                  t = {
                    mpType: n.call(this) ? "page" : "component",
                    mpInstance: this,
                    propsData: e,
                  };
                pn(e.vueId, this),
                  r.call(this, { vuePid: this._$vuePid, vueOptions: t }),
                  (this.$vm = new c(t)),
                  dn(this.$vm, e.vueSlots),
                  this.$vm.$mount();
              },
              ready: function () {
                this.$vm &&
                  ((this.$vm._isMounted = !0),
                  this.$vm.__call_hook("mounted"),
                  this.$vm.__call_hook("onReady"));
              },
              detached: function () {
                this.$vm && this.$vm.$destroy();
              },
            },
            pageLifetimes: {
              show: function (e) {
                this.$vm && this.$vm.__call_hook("onPageShow", e);
              },
              hide: function () {
                this.$vm && this.$vm.__call_hook("onPageHide");
              },
              resize: function (e) {
                this.$vm && this.$vm.__call_hook("onPageResize", e);
              },
            },
            methods: { __l: Ht, __e: Tn },
          };
          return (
            u.externalClasses && (f.externalClasses = u.externalClasses),
            Array.isArray(u.wxsCallMethods) &&
              u.wxsCallMethods.forEach(function (e) {
                f.methods[e] = function (t) {
                  return this.$vm[e](t);
                };
              }),
            i ? [f, u, c] : n ? f : [f, c]
          );
        }
        function zn(e, t) {
          return Kn(e, { isPage: Bt, initRelation: qt }, t);
        }
        var Vn = ["onShow", "onHide", "onUnload"];
        function Hn(e) {
          var t = zn(e, !0),
            n = (0, a.default)(t, 2),
            r = n[0],
            i = n[1];
          return (
            sn(r.methods, Vn, i),
            (r.methods.onLoad = function (e) {
              this.options = e;
              var t = Object.assign({}, e);
              delete t.__id__,
                (this.$page = {
                  fullPath: "/" + (this.route || this.is) + qn(t),
                }),
                (this.$vm.$mp.query = e),
                this.$vm.__call_hook("onLoad", e);
            }),
            cn(r.methods, e, ["onReady"]),
            Yt(r.methods, i.methods),
            r
          );
        }
        function Wn(e) {
          return Hn(e);
        }
        function Jn(e) {
          return Component(Wn(e));
        }
        function Gn(e) {
          return Component(zn(e));
        }
        function Yn(t) {
          var n = Nn(t),
            r = getApp({ allowDefault: !0 });
          t.$scope = r;
          var i = r.globalData;
          if (
            (i &&
              Object.keys(n.globalData).forEach(function (e) {
                I(i, e) || (i[e] = n.globalData[e]);
              }),
            Object.keys(n).forEach(function (e) {
              I(r, e) || (r[e] = n[e]);
            }),
            k(n.onShow) &&
              e.onAppShow &&
              e.onAppShow(function () {
                for (
                  var e = arguments.length, n = new Array(e), r = 0;
                  r < e;
                  r++
                )
                  n[r] = arguments[r];
                t.__call_hook("onShow", n);
              }),
            k(n.onHide) &&
              e.onAppHide &&
              e.onAppHide(function () {
                for (
                  var e = arguments.length, n = new Array(e), r = 0;
                  r < e;
                  r++
                )
                  n[r] = arguments[r];
                t.__call_hook("onHide", n);
              }),
            k(n.onLaunch))
          ) {
            var o = e.getLaunchOptionsSync && e.getLaunchOptionsSync();
            t.__call_hook("onLaunch", o);
          }
          return t;
        }
        function Zn(t) {
          var n = Nn(t);
          if (
            (k(n.onShow) &&
              e.onAppShow &&
              e.onAppShow(function () {
                for (
                  var e = arguments.length, n = new Array(e), r = 0;
                  r < e;
                  r++
                )
                  n[r] = arguments[r];
                t.__call_hook("onShow", n);
              }),
            k(n.onHide) &&
              e.onAppHide &&
              e.onAppHide(function () {
                for (
                  var e = arguments.length, n = new Array(e), r = 0;
                  r < e;
                  r++
                )
                  n[r] = arguments[r];
                t.__call_hook("onHide", n);
              }),
            k(n.onLaunch))
          ) {
            var r = e.getLaunchOptionsSync && e.getLaunchOptionsSync();
            t.__call_hook("onLaunch", r);
          }
          return t;
        }
        Vn.push.apply(Vn, rn),
          tt.forEach(function (e) {
            et[e] = !1;
          }),
          nt.forEach(function (t) {
            var n = et[t] && et[t].name ? et[t].name : t;
            e.canIUse(n) || (et[t] = !1);
          });
        var Xn = {};
        "undefined" !== typeof Proxy
          ? (Xn = new Proxy(
              {},
              {
                get: function (t, n) {
                  return I(t, n)
                    ? t[n]
                    : De[n]
                    ? De[n]
                    : Ut[n]
                    ? ae(n, Ut[n])
                    : pt[n]
                    ? ae(n, pt[n])
                    : ct[n]
                    ? ae(n, ct[n])
                    : xt[n]
                    ? xt[n]
                    : ae(n, st(n, e[n]));
                },
                set: function (e, t, n) {
                  return (e[t] = n), !0;
                },
              }
            ))
          : (Object.keys(De).forEach(function (e) {
              Xn[e] = De[e];
            }),
            Object.keys(ct).forEach(function (e) {
              Xn[e] = ae(e, ct[e]);
            }),
            Object.keys(pt).forEach(function (e) {
              Xn[e] = ae(e, pt[e]);
            }),
            Object.keys(xt).forEach(function (e) {
              Xn[e] = xt[e];
            }),
            Object.keys(Ut).forEach(function (e) {
              Xn[e] = ae(e, Ut[e]);
            }),
            Object.keys(e).forEach(function (t) {
              (I(e, t) || I(et, t)) && (Xn[t] = ae(t, st(t, e[t])));
            })),
          (e.createApp = Un),
          (e.createPage = Jn),
          (e.createComponent = Gn),
          (e.createSubpackageApp = Yn),
          (e.createPlugin = Zn);
        var Qn = Xn;
        t.default = Qn;
      }).call(this, n("bc2e")["default"], n("c8ba"));
    },
    "546a": function (e, t, n) {
      "use strict";
      (function (e) {
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.bountyMissionJS = void 0);
        var r = n("5d2d");
        t.bountyMissionJS = {
          data: function () {
            return {
              apiUrl: "",
              bountyId: "",
              bountyInfo: null,
              submitContent: "",
              picUrls: ["", "", ""],
              uploadIndex: "",
            };
          },
          mounted: function () {
            this.hideLoadingFun();
          },
          methods: {
            getData: function () {
              var t = this;
              this.showLoadingFun(),
                this.$get(this.apiUrl, { id: this.bountyId }, 11).then(
                  function (n) {
                    console.log(n),
                      (t.bountyInfo = n.data),
                      (t.bountyInfo.content = t.bountyInfo.content
                        ? t.bountyInfo.content.replace(
                            /<img/gi,
                            '<img style="max-width:100%;object-fit: contain;"'
                          )
                        : ""),
                      t.hideLoadingFun(),
                      t.bountyInfo.submitted &&
                        1 == t.bountyInfo.type &&
                        e.showToast({
                          icon: "none",
                          title: "限时任务已完成！",
                        });
                  }
                );
            },
            submitBountyMissionFun: function (e) {
              var t = this,
                n = this.picUrls;
              this.$post(this.$api.bountyMissionsubmit, {
                id: this.bountyId,
                submitContent: this.submitContent,
                picUrls: n.toString(),
              }).then(function (e) {
                console.log(e),
                  t.goNext(
                    "/pages/bountyMission/bountyMissionProgress?bountyId=" +
                      e.data
                  );
              });
            },
            openImagePageBuy: function (t) {
              var n = this;
              (n.uploadIndex = t),
                e.chooseImage({
                  count: 1,
                  sizeType: ["compressed"],
                  sourceType: ["album"],
                  success: function (e) {
                    n.showLoadingFun(), n.uploadImage(e.tempFilePaths);
                  },
                });
            },
            uploadImage: function (t) {
              var n = this;
              e.compressImage({
                src: t[0],
                quality: 80,
                success: function (t) {
                  e.uploadFile({
                    url:
                      "https://biz.zhangwenpindu.cn" +
                      n.$api.uploadphoto +
                      "?objectType=6",
                    header: { Authorization: "Bearer " + (0, r.getToken)() },
                    filePath: t.tempFilePath,
                    name: "filePath",
                    success: function (e) {
                      console.log(e);
                      var t = JSON.parse(e.data);
                      (n.picUrls[n.uploadIndex] = t.data),
                        console.log(n.picUrls[n.uploadIndex]),
                        n.hideLoadingFun(),
                        n.$forceUpdate();
                    },
                  });
                },
              });
            },
            deleteFun: function (e) {
              console.log(11111), (this.picUrls[e] = ""), this.$forceUpdate();
            },
          },
        };
      }).call(this, n("543d")["default"]);
    },
    "5a43": function (e, t) {
      function n(e, t) {
        (null == t || t > e.length) && (t = e.length);
        for (var n = 0, r = Array(t); n < t; n++) r[n] = e[n];
        return r;
      }
      (e.exports = n),
        (e.exports.__esModule = !0),
        (e.exports["default"] = e.exports);
    },
    "5bc3": function (e, t, n) {
      var r = n("a395");
      function i(e, t) {
        for (var n = 0; n < t.length; n++) {
          var i = t[n];
          (i.enumerable = i.enumerable || !1),
            (i.configurable = !0),
            "value" in i && (i.writable = !0),
            Object.defineProperty(e, r(i.key), i);
        }
      }
      function o(e, t, n) {
        return (
          t && i(e.prototype, t),
          n && i(e, n),
          Object.defineProperty(e, "prototype", { writable: !1 }),
          e
        );
      }
      (e.exports = o),
        (e.exports.__esModule = !0),
        (e.exports["default"] = e.exports);
    },
    "5d2d": function (e, t, n) {
      "use strict";
      (function (e) {
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.clearStorage = c),
          (t.getToken = r),
          (t.getuserInfo = a),
          (t.removeToken = o),
          (t.setCookie = u),
          (t.setToken = i),
          (t.setuserInfo = s);
        var n = "rock-Token";
        function r() {
          return e.getStorageSync(n);
        }
        function i(t) {
          return e.setStorageSync(n, t);
        }
        function o() {
          return e.removeStorageSync(n);
        }
        function a() {
          return e.getStorageSync("userInfo");
        }
        function s(t) {
          return e.setStorageSync("userInfo", t);
        }
        function c() {
          localStorage.clear();
        }
        function u(e, t) {
          var n = 30,
            r = new Date();
          r.setTime(r.getTime() + 24 * n * 60 * 60 * 30),
            (document.cookie =
              e +
              "=" +
              escape(t) +
              ";expires=" +
              r.toGMTString() +
              ";domain=.yuanshi.com");
        }
      }).call(this, n("543d")["default"]);
    },
    "5da0": function (e, t, n) {
      "use strict";
      var r = n("4ea4");
      Object.defineProperty(t, "__esModule", { value: !0 }),
        (t.typeFilter =
          t.type =
          t.setDataValue =
          t.realName =
          t.rawData =
          t.objSet =
          t.objGet =
          t.name2arr =
          t.isRequiredField =
          t.isRealName =
          t.isNumber =
          t.isEqual =
          t.isBoolean =
          t.getValue =
          t.getDataValueType =
          t.getDataValue =
          t.deepCopy =
            void 0);
      var i = r(n("7037")),
        o =
          ((t.deepCopy = function (e) {
            return JSON.parse(JSON.stringify(e));
          }),
          (t.typeFilter = function (e) {
            return (
              "int" === e ||
              "double" === e ||
              "number" === e ||
              "timestamp" === e
            );
          })),
        a =
          ((t.getValue = function (e, t, n) {
            var r = n.find(function (e) {
                return e.format && o(e.format);
              }),
              i = n.find(function (e) {
                return (
                  (e.format && "boolean" === e.format) || "bool" === e.format
                );
              });
            return (
              r && (t = t || 0 === t ? (f(Number(t)) ? Number(t) : t) : null),
              i && (t = !!d(t) && t),
              t
            );
          }),
          (t.setDataValue = function (e, t, n) {
            return (t[e] = n), n || "";
          }),
          (t.getDataValue = function (e, t) {
            return l(t, e);
          })),
        s =
          ((t.getDataValueType = function (e, t) {
            var n = a(e, t);
            return { type: p(n), value: n };
          }),
          (t.realName = function (e) {
            var t = u(e);
            if (
              "object" === (0, i.default)(t) &&
              Array.isArray(t) &&
              t.length > 1
            ) {
              var n = t.reduce(function (e, t) {
                return e + "#".concat(t);
              }, "_formdata_");
              return n;
            }
            return t[0] || e;
          }),
          (t.isRealName = function (e) {
            var t = /^_formdata_#*/;
            return t.test(e);
          }),
          (t.rawData = function () {
            var e =
                arguments.length > 0 && void 0 !== arguments[0]
                  ? arguments[0]
                  : {},
              t = JSON.parse(JSON.stringify(e)),
              n = {};
            for (var r in t) {
              var i = s(r);
              c(n, i, t[r]);
            }
            return n;
          }),
          (t.name2arr = function (e) {
            var t = e.replace("_formdata_#", "");
            return (
              (t = t.split("#").map(function (e) {
                return f(e) ? Number(e) : e;
              })),
              t
            );
          })),
        c = (t.objSet = function (e, t, n) {
          return (
            "object" !== (0, i.default)(e) ||
              u(t).reduce(function (e, t, r, i) {
                return r === i.length - 1
                  ? ((e[t] = n), null)
                  : (t in e || (e[t] = /^[0-9]{1,}$/.test(i[r + 1]) ? [] : {}),
                    e[t]);
              }, e),
            e
          );
        });
      function u(e) {
        return Array.isArray(e)
          ? e
          : e.replace(/\[/g, ".").replace(/\]/g, "").split(".");
      }
      var l = (t.objGet = function (e, t) {
          var n =
              arguments.length > 2 && void 0 !== arguments[2]
                ? arguments[2]
                : "undefined",
            r = u(t),
            i = r.reduce(function (e, t) {
              return (e || {})[t];
            }, e);
          return i && void 0 === i ? n : i;
        }),
        f = (t.isNumber = function (e) {
          return !isNaN(Number(e));
        }),
        d = (t.isBoolean = function (e) {
          return "boolean" === typeof e;
        }),
        p =
          ((t.isRequiredField = function (e) {
            for (var t = !1, n = 0; n < e.length; n++) {
              var r = e[n];
              if (r.required) {
                t = !0;
                break;
              }
            }
            return t;
          }),
          (t.type = function (e) {
            var t = {};
            return (
              "Boolean Number String Function Array Date RegExp Object Error"
                .split(" ")
                .map(function (e, n) {
                  t["[object " + e + "]"] = e.toLowerCase();
                }),
              null == e
                ? e + ""
                : "object" === (0, i.default)(e) || "function" === typeof e
                ? t[Object.prototype.toString.call(e)] || "object"
                : (0, i.default)(e)
            );
          }));
      t.isEqual = function (e, t) {
        if (e === t) return 0 !== e || 1 / e === 1 / t;
        if (null == e || null == t) return e === t;
        var n = toString.call(e),
          r = toString.call(t);
        if (n !== r) return !1;
        switch (n) {
          case "[object RegExp]":
          case "[object String]":
            return "" + e === "" + t;
          case "[object Number]":
            return +e !== +e
              ? +t !== +t
              : 0 === +e
              ? 1 / +e === 1 / t
              : +e === +t;
          case "[object Date]":
          case "[object Boolean]":
            return +e === +t;
        }
        if ("[object Object]" == n) {
          var i = Object.getOwnPropertyNames(e),
            o = Object.getOwnPropertyNames(t);
          if (i.length != o.length) return !1;
          for (var a = 0; a < i.length; a++) {
            var s = i[a];
            if (e[s] !== t[s]) return !1;
          }
          return !0;
        }
        return "[object Array]" == n ? e.toString() == t.toString() : void 0;
      };
    },
    "5dca": function (e, t, n) {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 }),
        (t.default = void 0);
      var r =
          /^<([-A-Za-z0-9_]+)((?:\s+[a-zA-Z0-9_:][-a-zA-Z0-9_:.]*(?:\s*=\s*(?:(?:"[^"]*")|(?:'[^']*')|[^>\s]+))?)*)\s*(\/?)>/,
        i = /^<\/([-A-Za-z0-9_]+)[^>]*>/,
        o =
          /([a-zA-Z0-9_:][-a-zA-Z0-9_:.]*)(?:\s*=\s*(?:(?:"((?:\\.|[^"])*)")|(?:'((?:\\.|[^'])*)')|([^>\s]+)))?/g;
      function a(e) {
        for (var t = {}, n = e.split(","), r = 0; r < n.length; r += 1)
          t[n[r]] = !0;
        return t;
      }
      var s = a(
          "area,base,basefont,br,col,frame,hr,img,input,link,meta,param,embed,command,keygen,source,track,wbr"
        ),
        c = a(
          "address,code,article,applet,aside,audio,blockquote,button,canvas,center,dd,del,dir,div,dl,dt,fieldset,figcaption,figure,footer,form,frameset,h1,h2,h3,h4,h5,h6,header,hgroup,hr,iframe,ins,isindex,li,map,menu,noframes,noscript,object,ol,output,p,pre,section,script,table,tbody,td,tfoot,th,thead,tr,ul,video"
        ),
        u = a(
          "a,abbr,acronym,applet,b,basefont,bdo,big,br,button,cite,del,dfn,em,font,i,iframe,img,input,ins,kbd,label,map,object,q,s,samp,script,select,small,span,strike,strong,sub,sup,textarea,tt,u,var"
        ),
        l = a("colgroup,dd,dt,li,options,p,td,tfoot,th,thead,tr"),
        f = a(
          "checked,compact,declare,defer,disabled,ismap,multiple,nohref,noresize,noshade,nowrap,readonly,selected"
        );
      function d(e, t) {
        var n,
          a,
          d,
          p = e,
          h = [];
        function g(e, n) {
          var r;
          if (n) {
            for (n = n.toLowerCase(), r = h.length - 1; r >= 0; r -= 1)
              if (h[r] === n) break;
          } else r = 0;
          if (r >= 0) {
            for (var i = h.length - 1; i >= r; i -= 1) t.end && t.end(h[i]);
            h.length = r;
          }
        }
        function v(e, n, r, i) {
          if (((n = n.toLowerCase()), c[n]))
            while (h.last() && u[h.last()]) g("", h.last());
          if (
            (l[n] && h.last() === n && g("", n),
            (i = s[n] || !!i),
            i || h.push(n),
            t.start)
          ) {
            var a = [];
            r.replace(o, function (e, t) {
              var n =
                arguments[2] || arguments[3] || arguments[4] || (f[t] ? t : "");
              a.push({
                name: t,
                value: n,
                escaped: n.replace(/(^|[^\\])"/g, '$1\\"'),
              });
            }),
              t.start && t.start(n, a, i);
          }
        }
        h.last = function () {
          return h[h.length - 1];
        };
        while (e) {
          if (
            ((a = !0),
            0 === e.indexOf("</")
              ? ((d = e.match(i)),
                d &&
                  ((e = e.substring(d[0].length)),
                  d[0].replace(i, g),
                  (a = !1)))
              : 0 === e.indexOf("<") &&
                ((d = e.match(r)),
                d &&
                  ((e = e.substring(d[0].length)),
                  d[0].replace(r, v),
                  (a = !1))),
            a)
          ) {
            n = e.indexOf("<");
            var m = "";
            while (0 === n)
              (m += "<"), (e = e.substring(1)), (n = e.indexOf("<"));
            (m += n < 0 ? e : e.substring(0, n)),
              (e = n < 0 ? "" : e.substring(n)),
              t.chars && t.chars(m);
          }
          if (e === p) throw new Error("Parse Error: ".concat(e));
          p = e;
        }
        g();
      }
      t.default = d;
    },
    "61a0": function (e, t, n) {},
    6613: function (e, t, n) {
      var r = n("5a43");
      function i(e, t) {
        if (e) {
          if ("string" == typeof e) return r(e, t);
          var n = {}.toString.call(e).slice(8, -1);
          return (
            "Object" === n && e.constructor && (n = e.constructor.name),
            "Map" === n || "Set" === n
              ? Array.from(e)
              : "Arguments" === n ||
                /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)
              ? r(e, t)
              : void 0
          );
        }
      }
      (e.exports = i),
        (e.exports.__esModule = !0),
        (e.exports["default"] = e.exports);
    },
    "66fd": function (e, t, n) {
      "use strict";
      n.r(t),
        function (e) {
          /*!
           * Vue.js v2.6.11
           * (c) 2014-2023 Evan You
           * Released under the MIT License.
           */
          var n = Object.freeze({});
          function r(e) {
            return void 0 === e || null === e;
          }
          function i(e) {
            return void 0 !== e && null !== e;
          }
          function o(e) {
            return !0 === e;
          }
          function a(e) {
            return !1 === e;
          }
          function s(e) {
            return (
              "string" === typeof e ||
              "number" === typeof e ||
              "symbol" === typeof e ||
              "boolean" === typeof e
            );
          }
          function c(e) {
            return null !== e && "object" === typeof e;
          }
          var u = Object.prototype.toString;
          function l(e) {
            return "[object Object]" === u.call(e);
          }
          function f(e) {
            return "[object RegExp]" === u.call(e);
          }
          function d(e) {
            var t = parseFloat(String(e));
            return t >= 0 && Math.floor(t) === t && isFinite(e);
          }
          function p(e) {
            return (
              i(e) &&
              "function" === typeof e.then &&
              "function" === typeof e.catch
            );
          }
          function h(e) {
            return null == e
              ? ""
              : Array.isArray(e) || (l(e) && e.toString === u)
              ? JSON.stringify(e, null, 2)
              : String(e);
          }
          function g(e) {
            var t = parseFloat(e);
            return isNaN(t) ? e : t;
          }
          function v(e, t) {
            for (
              var n = Object.create(null), r = e.split(","), i = 0;
              i < r.length;
              i++
            )
              n[r[i]] = !0;
            return t
              ? function (e) {
                  return n[e.toLowerCase()];
                }
              : function (e) {
                  return n[e];
                };
          }
          v("slot,component", !0);
          var m = v("key,ref,slot,slot-scope,is");
          function y(e, t) {
            if (e.length) {
              var n = e.indexOf(t);
              if (n > -1) return e.splice(n, 1);
            }
          }
          var _ = Object.prototype.hasOwnProperty;
          function b(e, t) {
            return _.call(e, t);
          }
          function w(e) {
            var t = Object.create(null);
            return function (n) {
              var r = t[n];
              return r || (t[n] = e(n));
            };
          }
          var k = /-(\w)/g,
            x = w(function (e) {
              return e.replace(k, function (e, t) {
                return t ? t.toUpperCase() : "";
              });
            }),
            S = w(function (e) {
              return e.charAt(0).toUpperCase() + e.slice(1);
            }),
            A = /\B([A-Z])/g,
            I = w(function (e) {
              return e.replace(A, "-$1").toLowerCase();
            });
          function O(e, t) {
            function n(n) {
              var r = arguments.length;
              return r
                ? r > 1
                  ? e.apply(t, arguments)
                  : e.call(t, n)
                : e.call(t);
            }
            return (n._length = e.length), n;
          }
          function P(e, t) {
            return e.bind(t);
          }
          var T = Function.prototype.bind ? P : O;
          function C(e, t) {
            t = t || 0;
            var n = e.length - t,
              r = new Array(n);
            while (n--) r[n] = e[n + t];
            return r;
          }
          function E(e, t) {
            for (var n in t) e[n] = t[n];
            return e;
          }
          function j(e) {
            for (var t = {}, n = 0; n < e.length; n++) e[n] && E(t, e[n]);
            return t;
          }
          function L(e, t, n) {}
          var D = function (e, t, n) {
              return !1;
            },
            M = function (e) {
              return e;
            };
          function N(e, t) {
            if (e === t) return !0;
            var n = c(e),
              r = c(t);
            if (!n || !r) return !n && !r && String(e) === String(t);
            try {
              var i = Array.isArray(e),
                o = Array.isArray(t);
              if (i && o)
                return (
                  e.length === t.length &&
                  e.every(function (e, n) {
                    return N(e, t[n]);
                  })
                );
              if (e instanceof Date && t instanceof Date)
                return e.getTime() === t.getTime();
              if (i || o) return !1;
              var a = Object.keys(e),
                s = Object.keys(t);
              return (
                a.length === s.length &&
                a.every(function (n) {
                  return N(e[n], t[n]);
                })
              );
            } catch (u) {
              return !1;
            }
          }
          function U(e, t) {
            for (var n = 0; n < e.length; n++) if (N(e[n], t)) return n;
            return -1;
          }
          function R(e) {
            var t = !1;
            return function () {
              t || ((t = !0), e.apply(this, arguments));
            };
          }
          var $ = ["component", "directive", "filter"],
            F = [
              "beforeCreate",
              "created",
              "beforeMount",
              "mounted",
              "beforeUpdate",
              "updated",
              "beforeDestroy",
              "destroyed",
              "activated",
              "deactivated",
              "errorCaptured",
              "serverPrefetch",
            ],
            B = {
              optionMergeStrategies: Object.create(null),
              silent: !1,
              productionTip: !1,
              devtools: !1,
              performance: !1,
              errorHandler: null,
              warnHandler: null,
              ignoredElements: [],
              keyCodes: Object.create(null),
              isReservedTag: D,
              isReservedAttr: D,
              isUnknownElement: D,
              getTagNamespace: L,
              parsePlatformTagName: M,
              mustUseProp: D,
              async: !0,
              _lifecycleHooks: F,
            },
            q =
              /a-zA-Z\u00B7\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u037D\u037F-\u1FFF\u200C-\u200D\u203F-\u2040\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD/;
          function K(e) {
            var t = (e + "").charCodeAt(0);
            return 36 === t || 95 === t;
          }
          function z(e, t, n, r) {
            Object.defineProperty(e, t, {
              value: n,
              enumerable: !!r,
              writable: !0,
              configurable: !0,
            });
          }
          var V = new RegExp("[^" + q.source + ".$_\\d]");
          function H(e) {
            if (!V.test(e)) {
              var t = e.split(".");
              return function (e) {
                for (var n = 0; n < t.length; n++) {
                  if (!e) return;
                  e = e[t[n]];
                }
                return e;
              };
            }
          }
          var W,
            J = "__proto__" in {},
            G = "undefined" !== typeof window,
            Y =
              "undefined" !== typeof WXEnvironment && !!WXEnvironment.platform,
            Z = Y && WXEnvironment.platform.toLowerCase(),
            X = G && window.navigator.userAgent.toLowerCase(),
            Q = X && /msie|trident/.test(X),
            ee = (X && X.indexOf("msie 9.0"), X && X.indexOf("edge/") > 0),
            te =
              (X && X.indexOf("android"),
              (X && /iphone|ipad|ipod|ios/.test(X)) || "ios" === Z),
            ne =
              (X && /chrome\/\d+/.test(X),
              X && /phantomjs/.test(X),
              X && X.match(/firefox\/(\d+)/),
              {}.watch);
          if (G)
            try {
              var re = {};
              Object.defineProperty(re, "passive", { get: function () {} }),
                window.addEventListener("test-passive", null, re);
            } catch (ai) {}
          var ie = function () {
              return (
                void 0 === W &&
                  (W =
                    !G &&
                    !Y &&
                    "undefined" !== typeof e &&
                    e["process"] &&
                    "server" === e["process"].env.VUE_ENV),
                W
              );
            },
            oe = G && window.__VUE_DEVTOOLS_GLOBAL_HOOK__;
          function ae(e) {
            return "function" === typeof e && /native code/.test(e.toString());
          }
          var se,
            ce =
              "undefined" !== typeof Symbol &&
              ae(Symbol) &&
              "undefined" !== typeof Reflect &&
              ae(Reflect.ownKeys);
          se =
            "undefined" !== typeof Set && ae(Set)
              ? Set
              : (function () {
                  function e() {
                    this.set = Object.create(null);
                  }
                  return (
                    (e.prototype.has = function (e) {
                      return !0 === this.set[e];
                    }),
                    (e.prototype.add = function (e) {
                      this.set[e] = !0;
                    }),
                    (e.prototype.clear = function () {
                      this.set = Object.create(null);
                    }),
                    e
                  );
                })();
          var ue = L,
            le = 0,
            fe = function () {
              (this.id = le++), (this.subs = []);
            };
          function de(e) {
            fe.SharedObject.targetStack.push(e),
              (fe.SharedObject.target = e),
              (fe.target = e);
          }
          function pe() {
            fe.SharedObject.targetStack.pop(),
              (fe.SharedObject.target =
                fe.SharedObject.targetStack[
                  fe.SharedObject.targetStack.length - 1
                ]),
              (fe.target = fe.SharedObject.target);
          }
          (fe.prototype.addSub = function (e) {
            this.subs.push(e);
          }),
            (fe.prototype.removeSub = function (e) {
              y(this.subs, e);
            }),
            (fe.prototype.depend = function () {
              fe.SharedObject.target && fe.SharedObject.target.addDep(this);
            }),
            (fe.prototype.notify = function () {
              var e = this.subs.slice();
              for (var t = 0, n = e.length; t < n; t++) e[t].update();
            }),
            (fe.SharedObject = {}),
            (fe.SharedObject.target = null),
            (fe.SharedObject.targetStack = []);
          var he = function (e, t, n, r, i, o, a, s) {
              (this.tag = e),
                (this.data = t),
                (this.children = n),
                (this.text = r),
                (this.elm = i),
                (this.ns = void 0),
                (this.context = o),
                (this.fnContext = void 0),
                (this.fnOptions = void 0),
                (this.fnScopeId = void 0),
                (this.key = t && t.key),
                (this.componentOptions = a),
                (this.componentInstance = void 0),
                (this.parent = void 0),
                (this.raw = !1),
                (this.isStatic = !1),
                (this.isRootInsert = !0),
                (this.isComment = !1),
                (this.isCloned = !1),
                (this.isOnce = !1),
                (this.asyncFactory = s),
                (this.asyncMeta = void 0),
                (this.isAsyncPlaceholder = !1);
            },
            ge = { child: { configurable: !0 } };
          (ge.child.get = function () {
            return this.componentInstance;
          }),
            Object.defineProperties(he.prototype, ge);
          var ve = function (e) {
            void 0 === e && (e = "");
            var t = new he();
            return (t.text = e), (t.isComment = !0), t;
          };
          function me(e) {
            return new he(void 0, void 0, void 0, String(e));
          }
          function ye(e) {
            var t = new he(
              e.tag,
              e.data,
              e.children && e.children.slice(),
              e.text,
              e.elm,
              e.context,
              e.componentOptions,
              e.asyncFactory
            );
            return (
              (t.ns = e.ns),
              (t.isStatic = e.isStatic),
              (t.key = e.key),
              (t.isComment = e.isComment),
              (t.fnContext = e.fnContext),
              (t.fnOptions = e.fnOptions),
              (t.fnScopeId = e.fnScopeId),
              (t.asyncMeta = e.asyncMeta),
              (t.isCloned = !0),
              t
            );
          }
          var _e = Array.prototype,
            be = Object.create(_e),
            we = [
              "push",
              "pop",
              "shift",
              "unshift",
              "splice",
              "sort",
              "reverse",
            ];
          we.forEach(function (e) {
            var t = _e[e];
            z(be, e, function () {
              var n = [],
                r = arguments.length;
              while (r--) n[r] = arguments[r];
              var i,
                o = t.apply(this, n),
                a = this.__ob__;
              switch (e) {
                case "push":
                case "unshift":
                  i = n;
                  break;
                case "splice":
                  i = n.slice(2);
                  break;
              }
              return i && a.observeArray(i), a.dep.notify(), o;
            });
          });
          var ke = Object.getOwnPropertyNames(be),
            xe = !0;
          function Se(e) {
            xe = e;
          }
          var Ae = function (e) {
            (this.value = e),
              (this.dep = new fe()),
              (this.vmCount = 0),
              z(e, "__ob__", this),
              Array.isArray(e)
                ? (J
                    ? e.push !== e.__proto__.push
                      ? Oe(e, be, ke)
                      : Ie(e, be)
                    : Oe(e, be, ke),
                  this.observeArray(e))
                : this.walk(e);
          };
          function Ie(e, t) {
            e.__proto__ = t;
          }
          function Oe(e, t, n) {
            for (var r = 0, i = n.length; r < i; r++) {
              var o = n[r];
              z(e, o, t[o]);
            }
          }
          function Pe(e, t) {
            var n;
            if (c(e) && !(e instanceof he))
              return (
                b(e, "__ob__") && e.__ob__ instanceof Ae
                  ? (n = e.__ob__)
                  : !xe ||
                    ie() ||
                    (!Array.isArray(e) && !l(e)) ||
                    !Object.isExtensible(e) ||
                    e._isVue ||
                    e.__v_isMPComponent ||
                    (n = new Ae(e)),
                t && n && n.vmCount++,
                n
              );
          }
          function Te(e, t, n, r, i) {
            var o = new fe(),
              a = Object.getOwnPropertyDescriptor(e, t);
            if (!a || !1 !== a.configurable) {
              var s = a && a.get,
                c = a && a.set;
              (s && !c) || 2 !== arguments.length || (n = e[t]);
              var u = !i && Pe(n);
              Object.defineProperty(e, t, {
                enumerable: !0,
                configurable: !0,
                get: function () {
                  var t = s ? s.call(e) : n;
                  return (
                    fe.SharedObject.target &&
                      (o.depend(),
                      u && (u.dep.depend(), Array.isArray(t) && je(t))),
                    t
                  );
                },
                set: function (t) {
                  var r = s ? s.call(e) : n;
                  t === r ||
                    (t !== t && r !== r) ||
                    (s && !c) ||
                    (c ? c.call(e, t) : (n = t), (u = !i && Pe(t)), o.notify());
                },
              });
            }
          }
          function Ce(e, t, n) {
            if (Array.isArray(e) && d(t))
              return (e.length = Math.max(e.length, t)), e.splice(t, 1, n), n;
            if (t in e && !(t in Object.prototype)) return (e[t] = n), n;
            var r = e.__ob__;
            return e._isVue || (r && r.vmCount)
              ? n
              : r
              ? (Te(r.value, t, n), r.dep.notify(), n)
              : ((e[t] = n), n);
          }
          function Ee(e, t) {
            if (Array.isArray(e) && d(t)) e.splice(t, 1);
            else {
              var n = e.__ob__;
              e._isVue ||
                (n && n.vmCount) ||
                (b(e, t) && (delete e[t], n && n.dep.notify()));
            }
          }
          function je(e) {
            for (var t = void 0, n = 0, r = e.length; n < r; n++)
              (t = e[n]),
                t && t.__ob__ && t.__ob__.dep.depend(),
                Array.isArray(t) && je(t);
          }
          (Ae.prototype.walk = function (e) {
            for (var t = Object.keys(e), n = 0; n < t.length; n++) Te(e, t[n]);
          }),
            (Ae.prototype.observeArray = function (e) {
              for (var t = 0, n = e.length; t < n; t++) Pe(e[t]);
            });
          var Le = B.optionMergeStrategies;
          function De(e, t) {
            if (!t) return e;
            for (
              var n, r, i, o = ce ? Reflect.ownKeys(t) : Object.keys(t), a = 0;
              a < o.length;
              a++
            )
              (n = o[a]),
                "__ob__" !== n &&
                  ((r = e[n]),
                  (i = t[n]),
                  b(e, n) ? r !== i && l(r) && l(i) && De(r, i) : Ce(e, n, i));
            return e;
          }
          function Me(e, t, n) {
            return n
              ? function () {
                  var r = "function" === typeof t ? t.call(n, n) : t,
                    i = "function" === typeof e ? e.call(n, n) : e;
                  return r ? De(r, i) : i;
                }
              : t
              ? e
                ? function () {
                    return De(
                      "function" === typeof t ? t.call(this, this) : t,
                      "function" === typeof e ? e.call(this, this) : e
                    );
                  }
                : t
              : e;
          }
          function Ne(e, t) {
            var n = t ? (e ? e.concat(t) : Array.isArray(t) ? t : [t]) : e;
            return n ? Ue(n) : n;
          }
          function Ue(e) {
            for (var t = [], n = 0; n < e.length; n++)
              -1 === t.indexOf(e[n]) && t.push(e[n]);
            return t;
          }
          function Re(e, t, n, r) {
            var i = Object.create(e || null);
            return t ? E(i, t) : i;
          }
          (Le.data = function (e, t, n) {
            return n
              ? Me(e, t, n)
              : t && "function" !== typeof t
              ? e
              : Me(e, t);
          }),
            F.forEach(function (e) {
              Le[e] = Ne;
            }),
            $.forEach(function (e) {
              Le[e + "s"] = Re;
            }),
            (Le.watch = function (e, t, n, r) {
              if ((e === ne && (e = void 0), t === ne && (t = void 0), !t))
                return Object.create(e || null);
              if (!e) return t;
              var i = {};
              for (var o in (E(i, e), t)) {
                var a = i[o],
                  s = t[o];
                a && !Array.isArray(a) && (a = [a]),
                  (i[o] = a ? a.concat(s) : Array.isArray(s) ? s : [s]);
              }
              return i;
            }),
            (Le.props =
              Le.methods =
              Le.inject =
              Le.computed =
                function (e, t, n, r) {
                  if (!e) return t;
                  var i = Object.create(null);
                  return E(i, e), t && E(i, t), i;
                }),
            (Le.provide = Me);
          var $e = function (e, t) {
            return void 0 === t ? e : t;
          };
          function Fe(e, t) {
            var n = e.props;
            if (n) {
              var r,
                i,
                o,
                a = {};
              if (Array.isArray(n)) {
                r = n.length;
                while (r--)
                  (i = n[r]),
                    "string" === typeof i &&
                      ((o = x(i)), (a[o] = { type: null }));
              } else if (l(n))
                for (var s in n)
                  (i = n[s]), (o = x(s)), (a[o] = l(i) ? i : { type: i });
              else 0;
              e.props = a;
            }
          }
          function Be(e, t) {
            var n = e.inject;
            if (n) {
              var r = (e.inject = {});
              if (Array.isArray(n))
                for (var i = 0; i < n.length; i++) r[n[i]] = { from: n[i] };
              else if (l(n))
                for (var o in n) {
                  var a = n[o];
                  r[o] = l(a) ? E({ from: o }, a) : { from: a };
                }
              else 0;
            }
          }
          function qe(e) {
            var t = e.directives;
            if (t)
              for (var n in t) {
                var r = t[n];
                "function" === typeof r && (t[n] = { bind: r, update: r });
              }
          }
          function Ke(e, t, n) {
            if (
              ("function" === typeof t && (t = t.options),
              Fe(t, n),
              Be(t, n),
              qe(t),
              !t._base && (t.extends && (e = Ke(e, t.extends, n)), t.mixins))
            )
              for (var r = 0, i = t.mixins.length; r < i; r++)
                e = Ke(e, t.mixins[r], n);
            var o,
              a = {};
            for (o in e) s(o);
            for (o in t) b(e, o) || s(o);
            function s(r) {
              var i = Le[r] || $e;
              a[r] = i(e[r], t[r], n, r);
            }
            return a;
          }
          function ze(e, t, n, r) {
            if ("string" === typeof n) {
              var i = e[t];
              if (b(i, n)) return i[n];
              var o = x(n);
              if (b(i, o)) return i[o];
              var a = S(o);
              if (b(i, a)) return i[a];
              var s = i[n] || i[o] || i[a];
              return s;
            }
          }
          function Ve(e, t, n, r) {
            var i = t[e],
              o = !b(n, e),
              a = n[e],
              s = Ge(Boolean, i.type);
            if (s > -1)
              if (o && !b(i, "default")) a = !1;
              else if ("" === a || a === I(e)) {
                var c = Ge(String, i.type);
                (c < 0 || s < c) && (a = !0);
              }
            if (void 0 === a) {
              a = He(r, i, e);
              var u = xe;
              Se(!0), Pe(a), Se(u);
            }
            return a;
          }
          function He(e, t, n) {
            if (b(t, "default")) {
              var r = t.default;
              return e &&
                e.$options.propsData &&
                void 0 === e.$options.propsData[n] &&
                void 0 !== e._props[n]
                ? e._props[n]
                : "function" === typeof r && "Function" !== We(t.type)
                ? r.call(e)
                : r;
            }
          }
          function We(e) {
            var t = e && e.toString().match(/^\s*function (\w+)/);
            return t ? t[1] : "";
          }
          function Je(e, t) {
            return We(e) === We(t);
          }
          function Ge(e, t) {
            if (!Array.isArray(t)) return Je(t, e) ? 0 : -1;
            for (var n = 0, r = t.length; n < r; n++) if (Je(t[n], e)) return n;
            return -1;
          }
          function Ye(e, t, n) {
            de();
            try {
              if (t) {
                var r = t;
                while ((r = r.$parent)) {
                  var i = r.$options.errorCaptured;
                  if (i)
                    for (var o = 0; o < i.length; o++)
                      try {
                        var a = !1 === i[o].call(r, e, t, n);
                        if (a) return;
                      } catch (ai) {
                        Xe(ai, r, "errorCaptured hook");
                      }
                }
              }
              Xe(e, t, n);
            } finally {
              pe();
            }
          }
          function Ze(e, t, n, r, i) {
            var o;
            try {
              (o = n ? e.apply(t, n) : e.call(t)),
                o &&
                  !o._isVue &&
                  p(o) &&
                  !o._handled &&
                  (o.catch(function (e) {
                    return Ye(e, r, i + " (Promise/async)");
                  }),
                  (o._handled = !0));
            } catch (ai) {
              Ye(ai, r, i);
            }
            return o;
          }
          function Xe(e, t, n) {
            if (B.errorHandler)
              try {
                return B.errorHandler.call(null, e, t, n);
              } catch (ai) {
                ai !== e && Qe(ai, null, "config.errorHandler");
              }
            Qe(e, t, n);
          }
          function Qe(e, t, n) {
            if ((!G && !Y) || "undefined" === typeof console) throw e;
            console.error(e);
          }
          var et,
            tt = [],
            nt = !1;
          function rt() {
            nt = !1;
            var e = tt.slice(0);
            tt.length = 0;
            for (var t = 0; t < e.length; t++) e[t]();
          }
          if ("undefined" !== typeof Promise && ae(Promise)) {
            var it = Promise.resolve();
            et = function () {
              it.then(rt), te && setTimeout(L);
            };
          } else if (
            Q ||
            "undefined" === typeof MutationObserver ||
            (!ae(MutationObserver) &&
              "[object MutationObserverConstructor]" !==
                MutationObserver.toString())
          )
            et =
              "undefined" !== typeof setImmediate && ae(setImmediate)
                ? function () {
                    setImmediate(rt);
                  }
                : function () {
                    setTimeout(rt, 0);
                  };
          else {
            var ot = 1,
              at = new MutationObserver(rt),
              st = document.createTextNode(String(ot));
            at.observe(st, { characterData: !0 }),
              (et = function () {
                (ot = (ot + 1) % 2), (st.data = String(ot));
              });
          }
          function ct(e, t) {
            var n;
            if (
              (tt.push(function () {
                if (e)
                  try {
                    e.call(t);
                  } catch (ai) {
                    Ye(ai, t, "nextTick");
                  }
                else n && n(t);
              }),
              nt || ((nt = !0), et()),
              !e && "undefined" !== typeof Promise)
            )
              return new Promise(function (e) {
                n = e;
              });
          }
          var ut = new se();
          function lt(e) {
            ft(e, ut), ut.clear();
          }
          function ft(e, t) {
            var n,
              r,
              i = Array.isArray(e);
            if (!((!i && !c(e)) || Object.isFrozen(e) || e instanceof he)) {
              if (e.__ob__) {
                var o = e.__ob__.dep.id;
                if (t.has(o)) return;
                t.add(o);
              }
              if (i) {
                n = e.length;
                while (n--) ft(e[n], t);
              } else {
                (r = Object.keys(e)), (n = r.length);
                while (n--) ft(e[r[n]], t);
              }
            }
          }
          var dt = w(function (e) {
            var t = "&" === e.charAt(0);
            e = t ? e.slice(1) : e;
            var n = "~" === e.charAt(0);
            e = n ? e.slice(1) : e;
            var r = "!" === e.charAt(0);
            return (
              (e = r ? e.slice(1) : e),
              { name: e, once: n, capture: r, passive: t }
            );
          });
          function pt(e, t) {
            function n() {
              var e = arguments,
                r = n.fns;
              if (!Array.isArray(r))
                return Ze(r, null, arguments, t, "v-on handler");
              for (var i = r.slice(), o = 0; o < i.length; o++)
                Ze(i[o], null, e, t, "v-on handler");
            }
            return (n.fns = e), n;
          }
          function ht(e, t, n, i, a, s) {
            var c, u, l, f;
            for (c in e)
              (u = e[c]),
                (l = t[c]),
                (f = dt(c)),
                r(u) ||
                  (r(l)
                    ? (r(u.fns) && (u = e[c] = pt(u, s)),
                      o(f.once) && (u = e[c] = a(f.name, u, f.capture)),
                      n(f.name, u, f.capture, f.passive, f.params))
                    : u !== l && ((l.fns = u), (e[c] = l)));
            for (c in t) r(e[c]) && ((f = dt(c)), i(f.name, t[c], f.capture));
          }
          function gt(e, t, n, o) {
            var a = t.options.mpOptions && t.options.mpOptions.properties;
            if (r(a)) return n;
            var s = t.options.mpOptions.externalClasses || [],
              c = e.attrs,
              u = e.props;
            if (i(c) || i(u))
              for (var l in a) {
                var f = I(l),
                  d = mt(n, u, l, f, !0) || mt(n, c, l, f, !1);
                d &&
                  n[l] &&
                  -1 !== s.indexOf(f) &&
                  o[x(n[l])] &&
                  (n[l] = o[x(n[l])]);
              }
            return n;
          }
          function vt(e, t, n, o) {
            var a = t.options.props;
            if (r(a)) return gt(e, t, {}, o);
            var s = {},
              c = e.attrs,
              u = e.props;
            if (i(c) || i(u))
              for (var l in a) {
                var f = I(l);
                mt(s, u, l, f, !0) || mt(s, c, l, f, !1);
              }
            return gt(e, t, s, o);
          }
          function mt(e, t, n, r, o) {
            if (i(t)) {
              if (b(t, n)) return (e[n] = t[n]), o || delete t[n], !0;
              if (b(t, r)) return (e[n] = t[r]), o || delete t[r], !0;
            }
            return !1;
          }
          function yt(e) {
            for (var t = 0; t < e.length; t++)
              if (Array.isArray(e[t]))
                return Array.prototype.concat.apply([], e);
            return e;
          }
          function _t(e) {
            return s(e) ? [me(e)] : Array.isArray(e) ? wt(e) : void 0;
          }
          function bt(e) {
            return i(e) && i(e.text) && a(e.isComment);
          }
          function wt(e, t) {
            var n,
              a,
              c,
              u,
              l = [];
            for (n = 0; n < e.length; n++)
              (a = e[n]),
                r(a) ||
                  "boolean" === typeof a ||
                  ((c = l.length - 1),
                  (u = l[c]),
                  Array.isArray(a)
                    ? a.length > 0 &&
                      ((a = wt(a, (t || "") + "_" + n)),
                      bt(a[0]) &&
                        bt(u) &&
                        ((l[c] = me(u.text + a[0].text)), a.shift()),
                      l.push.apply(l, a))
                    : s(a)
                    ? bt(u)
                      ? (l[c] = me(u.text + a))
                      : "" !== a && l.push(me(a))
                    : bt(a) && bt(u)
                    ? (l[c] = me(u.text + a.text))
                    : (o(e._isVList) &&
                        i(a.tag) &&
                        r(a.key) &&
                        i(t) &&
                        (a.key = "__vlist" + t + "_" + n + "__"),
                      l.push(a)));
            return l;
          }
          function kt(e) {
            var t = e.$options.provide;
            t && (e._provided = "function" === typeof t ? t.call(e) : t);
          }
          function xt(e) {
            var t = St(e.$options.inject, e);
            t &&
              (Se(!1),
              Object.keys(t).forEach(function (n) {
                Te(e, n, t[n]);
              }),
              Se(!0));
          }
          function St(e, t) {
            if (e) {
              for (
                var n = Object.create(null),
                  r = ce ? Reflect.ownKeys(e) : Object.keys(e),
                  i = 0;
                i < r.length;
                i++
              ) {
                var o = r[i];
                if ("__ob__" !== o) {
                  var a = e[o].from,
                    s = t;
                  while (s) {
                    if (s._provided && b(s._provided, a)) {
                      n[o] = s._provided[a];
                      break;
                    }
                    s = s.$parent;
                  }
                  if (!s)
                    if ("default" in e[o]) {
                      var c = e[o].default;
                      n[o] = "function" === typeof c ? c.call(t) : c;
                    } else 0;
                }
              }
              return n;
            }
          }
          function At(e, t) {
            if (!e || !e.length) return {};
            for (var n = {}, r = 0, i = e.length; r < i; r++) {
              var o = e[r],
                a = o.data;
              if (
                (a && a.attrs && a.attrs.slot && delete a.attrs.slot,
                (o.context !== t && o.fnContext !== t) || !a || null == a.slot)
              )
                o.asyncMeta &&
                o.asyncMeta.data &&
                "page" === o.asyncMeta.data.slot
                  ? (n["page"] || (n["page"] = [])).push(o)
                  : (n.default || (n.default = [])).push(o);
              else {
                var s = a.slot,
                  c = n[s] || (n[s] = []);
                "template" === o.tag
                  ? c.push.apply(c, o.children || [])
                  : c.push(o);
              }
            }
            for (var u in n) n[u].every(It) && delete n[u];
            return n;
          }
          function It(e) {
            return (e.isComment && !e.asyncFactory) || " " === e.text;
          }
          function Ot(e, t, r) {
            var i,
              o = Object.keys(t).length > 0,
              a = e ? !!e.$stable : !o,
              s = e && e.$key;
            if (e) {
              if (e._normalized) return e._normalized;
              if (a && r && r !== n && s === r.$key && !o && !r.$hasNormal)
                return r;
              for (var c in ((i = {}), e))
                e[c] && "$" !== c[0] && (i[c] = Pt(t, c, e[c]));
            } else i = {};
            for (var u in t) u in i || (i[u] = Tt(t, u));
            return (
              e && Object.isExtensible(e) && (e._normalized = i),
              z(i, "$stable", a),
              z(i, "$key", s),
              z(i, "$hasNormal", o),
              i
            );
          }
          function Pt(e, t, n) {
            var r = function () {
              var e = arguments.length ? n.apply(null, arguments) : n({});
              return (
                (e =
                  e && "object" === typeof e && !Array.isArray(e)
                    ? [e]
                    : _t(e)),
                e && (0 === e.length || (1 === e.length && e[0].isComment))
                  ? void 0
                  : e
              );
            };
            return (
              n.proxy &&
                Object.defineProperty(e, t, {
                  get: r,
                  enumerable: !0,
                  configurable: !0,
                }),
              r
            );
          }
          function Tt(e, t) {
            return function () {
              return e[t];
            };
          }
          function Ct(e, t) {
            var n, r, o, a, s;
            if (Array.isArray(e) || "string" === typeof e)
              for (n = new Array(e.length), r = 0, o = e.length; r < o; r++)
                n[r] = t(e[r], r, r, r);
            else if ("number" === typeof e)
              for (n = new Array(e), r = 0; r < e; r++)
                n[r] = t(r + 1, r, r, r);
            else if (c(e))
              if (ce && e[Symbol.iterator]) {
                n = [];
                var u = e[Symbol.iterator](),
                  l = u.next();
                while (!l.done)
                  n.push(t(l.value, n.length, r, r++)), (l = u.next());
              } else
                for (
                  a = Object.keys(e),
                    n = new Array(a.length),
                    r = 0,
                    o = a.length;
                  r < o;
                  r++
                )
                  (s = a[r]), (n[r] = t(e[s], s, r, r));
            return i(n) || (n = []), (n._isVList = !0), n;
          }
          function Et(e, t, n, r) {
            var i,
              o = this.$scopedSlots[e];
            o
              ? ((n = n || {}),
                r && (n = E(E({}, r), n)),
                (i = o(n, this, n._i) || t))
              : (i = this.$slots[e] || t);
            var a = n && n.slot;
            return a ? this.$createElement("template", { slot: a }, i) : i;
          }
          function jt(e) {
            return ze(this.$options, "filters", e, !0) || M;
          }
          function Lt(e, t) {
            return Array.isArray(e) ? -1 === e.indexOf(t) : e !== t;
          }
          function Dt(e, t, n, r, i) {
            var o = B.keyCodes[t] || n;
            return i && r && !B.keyCodes[t]
              ? Lt(i, r)
              : o
              ? Lt(o, e)
              : r
              ? I(r) !== t
              : void 0;
          }
          function Mt(e, t, n, r, i) {
            if (n)
              if (c(n)) {
                var o;
                Array.isArray(n) && (n = j(n));
                var a = function (a) {
                  if ("class" === a || "style" === a || m(a)) o = e;
                  else {
                    var s = e.attrs && e.attrs.type;
                    o =
                      r || B.mustUseProp(t, s, a)
                        ? e.domProps || (e.domProps = {})
                        : e.attrs || (e.attrs = {});
                  }
                  var c = x(a),
                    u = I(a);
                  if (!(c in o) && !(u in o) && ((o[a] = n[a]), i)) {
                    var l = e.on || (e.on = {});
                    l["update:" + a] = function (e) {
                      n[a] = e;
                    };
                  }
                };
                for (var s in n) a(s);
              } else;
            return e;
          }
          function Nt(e, t) {
            var n = this._staticTrees || (this._staticTrees = []),
              r = n[e];
            return (
              (r && !t) ||
                ((r = n[e] =
                  this.$options.staticRenderFns[e].call(
                    this._renderProxy,
                    null,
                    this
                  )),
                Rt(r, "__static__" + e, !1)),
              r
            );
          }
          function Ut(e, t, n) {
            return Rt(e, "__once__" + t + (n ? "_" + n : ""), !0), e;
          }
          function Rt(e, t, n) {
            if (Array.isArray(e))
              for (var r = 0; r < e.length; r++)
                e[r] && "string" !== typeof e[r] && $t(e[r], t + "_" + r, n);
            else $t(e, t, n);
          }
          function $t(e, t, n) {
            (e.isStatic = !0), (e.key = t), (e.isOnce = n);
          }
          function Ft(e, t) {
            if (t)
              if (l(t)) {
                var n = (e.on = e.on ? E({}, e.on) : {});
                for (var r in t) {
                  var i = n[r],
                    o = t[r];
                  n[r] = i ? [].concat(i, o) : o;
                }
              } else;
            return e;
          }
          function Bt(e, t, n, r) {
            t = t || { $stable: !n };
            for (var i = 0; i < e.length; i++) {
              var o = e[i];
              Array.isArray(o)
                ? Bt(o, t, n)
                : o && (o.proxy && (o.fn.proxy = !0), (t[o.key] = o.fn));
            }
            return r && (t.$key = r), t;
          }
          function qt(e, t) {
            for (var n = 0; n < t.length; n += 2) {
              var r = t[n];
              "string" === typeof r && r && (e[t[n]] = t[n + 1]);
            }
            return e;
          }
          function Kt(e, t) {
            return "string" === typeof e ? t + e : e;
          }
          function zt(e) {
            (e._o = Ut),
              (e._n = g),
              (e._s = h),
              (e._l = Ct),
              (e._t = Et),
              (e._q = N),
              (e._i = U),
              (e._m = Nt),
              (e._f = jt),
              (e._k = Dt),
              (e._b = Mt),
              (e._v = me),
              (e._e = ve),
              (e._u = Bt),
              (e._g = Ft),
              (e._d = qt),
              (e._p = Kt);
          }
          function Vt(e, t, r, i, a) {
            var s,
              c = this,
              u = a.options;
            b(i, "_uid")
              ? ((s = Object.create(i)), (s._original = i))
              : ((s = i), (i = i._original));
            var l = o(u._compiled),
              f = !l;
            (this.data = e),
              (this.props = t),
              (this.children = r),
              (this.parent = i),
              (this.listeners = e.on || n),
              (this.injections = St(u.inject, i)),
              (this.slots = function () {
                return (
                  c.$slots || Ot(e.scopedSlots, (c.$slots = At(r, i))), c.$slots
                );
              }),
              Object.defineProperty(this, "scopedSlots", {
                enumerable: !0,
                get: function () {
                  return Ot(e.scopedSlots, this.slots());
                },
              }),
              l &&
                ((this.$options = u),
                (this.$slots = this.slots()),
                (this.$scopedSlots = Ot(e.scopedSlots, this.$slots))),
              u._scopeId
                ? (this._c = function (e, t, n, r) {
                    var o = on(s, e, t, n, r, f);
                    return (
                      o &&
                        !Array.isArray(o) &&
                        ((o.fnScopeId = u._scopeId), (o.fnContext = i)),
                      o
                    );
                  })
                : (this._c = function (e, t, n, r) {
                    return on(s, e, t, n, r, f);
                  });
          }
          function Ht(e, t, r, o, a) {
            var s = e.options,
              c = {},
              u = s.props;
            if (i(u)) for (var l in u) c[l] = Ve(l, u, t || n);
            else i(r.attrs) && Jt(c, r.attrs), i(r.props) && Jt(c, r.props);
            var f = new Vt(r, c, a, o, e),
              d = s.render.call(null, f._c, f);
            if (d instanceof he) return Wt(d, r, f.parent, s, f);
            if (Array.isArray(d)) {
              for (
                var p = _t(d) || [], h = new Array(p.length), g = 0;
                g < p.length;
                g++
              )
                h[g] = Wt(p[g], r, f.parent, s, f);
              return h;
            }
          }
          function Wt(e, t, n, r, i) {
            var o = ye(e);
            return (
              (o.fnContext = n),
              (o.fnOptions = r),
              t.slot && ((o.data || (o.data = {})).slot = t.slot),
              o
            );
          }
          function Jt(e, t) {
            for (var n in t) e[x(n)] = t[n];
          }
          zt(Vt.prototype);
          var Gt = {
              init: function (e, t) {
                if (
                  e.componentInstance &&
                  !e.componentInstance._isDestroyed &&
                  e.data.keepAlive
                ) {
                  var n = e;
                  Gt.prepatch(n, n);
                } else {
                  var r = (e.componentInstance = Xt(e, Sn));
                  r.$mount(t ? e.elm : void 0, t);
                }
              },
              prepatch: function (e, t) {
                var n = t.componentOptions,
                  r = (t.componentInstance = e.componentInstance);
                Pn(r, n.propsData, n.listeners, t, n.children);
              },
              insert: function (e) {
                var t = e.context,
                  n = e.componentInstance;
                n._isMounted ||
                  (jn(n, "onServiceCreated"),
                  jn(n, "onServiceAttached"),
                  (n._isMounted = !0),
                  jn(n, "mounted")),
                  e.data.keepAlive && (t._isMounted ? zn(n) : Cn(n, !0));
              },
              destroy: function (e) {
                var t = e.componentInstance;
                t._isDestroyed || (e.data.keepAlive ? En(t, !0) : t.$destroy());
              },
            },
            Yt = Object.keys(Gt);
          function Zt(e, t, n, a, s) {
            if (!r(e)) {
              var u = n.$options._base;
              if ((c(e) && (e = u.extend(e)), "function" === typeof e)) {
                var l;
                if (r(e.cid) && ((l = e), (e = gn(l, u)), void 0 === e))
                  return hn(l, t, n, a, s);
                (t = t || {}), pr(e), i(t.model) && tn(e.options, t);
                var f = vt(t, e, s, n);
                if (o(e.options.functional)) return Ht(e, f, t, n, a);
                var d = t.on;
                if (((t.on = t.nativeOn), o(e.options.abstract))) {
                  var p = t.slot;
                  (t = {}), p && (t.slot = p);
                }
                Qt(t);
                var h = e.options.name || s,
                  g = new he(
                    "vue-component-" + e.cid + (h ? "-" + h : ""),
                    t,
                    void 0,
                    void 0,
                    void 0,
                    n,
                    {
                      Ctor: e,
                      propsData: f,
                      listeners: d,
                      tag: s,
                      children: a,
                    },
                    l
                  );
                return g;
              }
            }
          }
          function Xt(e, t) {
            var n = { _isComponent: !0, _parentVnode: e, parent: t },
              r = e.data.inlineTemplate;
            return (
              i(r) &&
                ((n.render = r.render),
                (n.staticRenderFns = r.staticRenderFns)),
              new e.componentOptions.Ctor(n)
            );
          }
          function Qt(e) {
            for (var t = e.hook || (e.hook = {}), n = 0; n < Yt.length; n++) {
              var r = Yt[n],
                i = t[r],
                o = Gt[r];
              i === o || (i && i._merged) || (t[r] = i ? en(o, i) : o);
            }
          }
          function en(e, t) {
            var n = function (n, r) {
              e(n, r), t(n, r);
            };
            return (n._merged = !0), n;
          }
          function tn(e, t) {
            var n = (e.model && e.model.prop) || "value",
              r = (e.model && e.model.event) || "input";
            (t.attrs || (t.attrs = {}))[n] = t.model.value;
            var o = t.on || (t.on = {}),
              a = o[r],
              s = t.model.callback;
            i(a)
              ? (Array.isArray(a) ? -1 === a.indexOf(s) : a !== s) &&
                (o[r] = [s].concat(a))
              : (o[r] = s);
          }
          var nn = 1,
            rn = 2;
          function on(e, t, n, r, i, a) {
            return (
              (Array.isArray(n) || s(n)) && ((i = r), (r = n), (n = void 0)),
              o(a) && (i = rn),
              an(e, t, n, r, i)
            );
          }
          function an(e, t, n, r, o) {
            if (i(n) && i(n.__ob__)) return ve();
            if ((i(n) && i(n.is) && (t = n.is), !t)) return ve();
            var a, s, c;
            (Array.isArray(r) &&
              "function" === typeof r[0] &&
              ((n = n || {}),
              (n.scopedSlots = { default: r[0] }),
              (r.length = 0)),
            o === rn ? (r = _t(r)) : o === nn && (r = yt(r)),
            "string" === typeof t)
              ? ((s = (e.$vnode && e.$vnode.ns) || B.getTagNamespace(t)),
                (a = B.isReservedTag(t)
                  ? new he(B.parsePlatformTagName(t), n, r, void 0, void 0, e)
                  : (n && n.pre) || !i((c = ze(e.$options, "components", t)))
                  ? new he(t, n, r, void 0, void 0, e)
                  : Zt(c, n, e, r, t)))
              : (a = Zt(t, n, e, r));
            return Array.isArray(a)
              ? a
              : i(a)
              ? (i(s) && sn(a, s), i(n) && cn(n), a)
              : ve();
          }
          function sn(e, t, n) {
            if (
              ((e.ns = t),
              "foreignObject" === e.tag && ((t = void 0), (n = !0)),
              i(e.children))
            )
              for (var a = 0, s = e.children.length; a < s; a++) {
                var c = e.children[a];
                i(c.tag) &&
                  (r(c.ns) || (o(n) && "svg" !== c.tag)) &&
                  sn(c, t, n);
              }
          }
          function cn(e) {
            c(e.style) && lt(e.style), c(e.class) && lt(e.class);
          }
          function un(e) {
            (e._vnode = null), (e._staticTrees = null);
            var t = e.$options,
              r = (e.$vnode = t._parentVnode),
              i = r && r.context;
            (e.$slots = At(t._renderChildren, i)),
              (e.$scopedSlots = n),
              (e._c = function (t, n, r, i) {
                return on(e, t, n, r, i, !1);
              }),
              (e.$createElement = function (t, n, r, i) {
                return on(e, t, n, r, i, !0);
              });
            var o = r && r.data;
            Te(e, "$attrs", (o && o.attrs) || n, null, !0),
              Te(e, "$listeners", t._parentListeners || n, null, !0);
          }
          var ln,
            fn = null;
          function dn(e) {
            zt(e.prototype),
              (e.prototype.$nextTick = function (e) {
                return ct(e, this);
              }),
              (e.prototype._render = function () {
                var e,
                  t = this,
                  n = t.$options,
                  r = n.render,
                  i = n._parentVnode;
                i &&
                  (t.$scopedSlots = Ot(
                    i.data.scopedSlots,
                    t.$slots,
                    t.$scopedSlots
                  )),
                  (t.$vnode = i);
                try {
                  (fn = t), (e = r.call(t._renderProxy, t.$createElement));
                } catch (ai) {
                  Ye(ai, t, "render"), (e = t._vnode);
                } finally {
                  fn = null;
                }
                return (
                  Array.isArray(e) && 1 === e.length && (e = e[0]),
                  e instanceof he || (e = ve()),
                  (e.parent = i),
                  e
                );
              });
          }
          function pn(e, t) {
            return (
              (e.__esModule || (ce && "Module" === e[Symbol.toStringTag])) &&
                (e = e.default),
              c(e) ? t.extend(e) : e
            );
          }
          function hn(e, t, n, r, i) {
            var o = ve();
            return (
              (o.asyncFactory = e),
              (o.asyncMeta = { data: t, context: n, children: r, tag: i }),
              o
            );
          }
          function gn(e, t) {
            if (o(e.error) && i(e.errorComp)) return e.errorComp;
            if (i(e.resolved)) return e.resolved;
            var n = fn;
            if (
              (n &&
                i(e.owners) &&
                -1 === e.owners.indexOf(n) &&
                e.owners.push(n),
              o(e.loading) && i(e.loadingComp))
            )
              return e.loadingComp;
            if (n && !i(e.owners)) {
              var a = (e.owners = [n]),
                s = !0,
                u = null,
                l = null;
              n.$on("hook:destroyed", function () {
                return y(a, n);
              });
              var f = function (e) {
                  for (var t = 0, n = a.length; t < n; t++) a[t].$forceUpdate();
                  e &&
                    ((a.length = 0),
                    null !== u && (clearTimeout(u), (u = null)),
                    null !== l && (clearTimeout(l), (l = null)));
                },
                d = R(function (n) {
                  (e.resolved = pn(n, t)), s ? (a.length = 0) : f(!0);
                }),
                h = R(function (t) {
                  i(e.errorComp) && ((e.error = !0), f(!0));
                }),
                g = e(d, h);
              return (
                c(g) &&
                  (p(g)
                    ? r(e.resolved) && g.then(d, h)
                    : p(g.component) &&
                      (g.component.then(d, h),
                      i(g.error) && (e.errorComp = pn(g.error, t)),
                      i(g.loading) &&
                        ((e.loadingComp = pn(g.loading, t)),
                        0 === g.delay
                          ? (e.loading = !0)
                          : (u = setTimeout(function () {
                              (u = null),
                                r(e.resolved) &&
                                  r(e.error) &&
                                  ((e.loading = !0), f(!1));
                            }, g.delay || 200))),
                      i(g.timeout) &&
                        (l = setTimeout(function () {
                          (l = null), r(e.resolved) && h(null);
                        }, g.timeout)))),
                (s = !1),
                e.loading ? e.loadingComp : e.resolved
              );
            }
          }
          function vn(e) {
            return e.isComment && e.asyncFactory;
          }
          function mn(e) {
            if (Array.isArray(e))
              for (var t = 0; t < e.length; t++) {
                var n = e[t];
                if (i(n) && (i(n.componentOptions) || vn(n))) return n;
              }
          }
          function yn(e) {
            (e._events = Object.create(null)), (e._hasHookEvent = !1);
            var t = e.$options._parentListeners;
            t && kn(e, t);
          }
          function _n(e, t) {
            ln.$on(e, t);
          }
          function bn(e, t) {
            ln.$off(e, t);
          }
          function wn(e, t) {
            var n = ln;
            return function r() {
              var i = t.apply(null, arguments);
              null !== i && n.$off(e, r);
            };
          }
          function kn(e, t, n) {
            (ln = e), ht(t, n || {}, _n, bn, wn, e), (ln = void 0);
          }
          function xn(e) {
            var t = /^hook:/;
            (e.prototype.$on = function (e, n) {
              var r = this;
              if (Array.isArray(e))
                for (var i = 0, o = e.length; i < o; i++) r.$on(e[i], n);
              else
                (r._events[e] || (r._events[e] = [])).push(n),
                  t.test(e) && (r._hasHookEvent = !0);
              return r;
            }),
              (e.prototype.$once = function (e, t) {
                var n = this;
                function r() {
                  n.$off(e, r), t.apply(n, arguments);
                }
                return (r.fn = t), n.$on(e, r), n;
              }),
              (e.prototype.$off = function (e, t) {
                var n = this;
                if (!arguments.length)
                  return (n._events = Object.create(null)), n;
                if (Array.isArray(e)) {
                  for (var r = 0, i = e.length; r < i; r++) n.$off(e[r], t);
                  return n;
                }
                var o,
                  a = n._events[e];
                if (!a) return n;
                if (!t) return (n._events[e] = null), n;
                var s = a.length;
                while (s--)
                  if (((o = a[s]), o === t || o.fn === t)) {
                    a.splice(s, 1);
                    break;
                  }
                return n;
              }),
              (e.prototype.$emit = function (e) {
                var t = this,
                  n = t._events[e];
                if (n) {
                  n = n.length > 1 ? C(n) : n;
                  for (
                    var r = C(arguments, 1),
                      i = 'event handler for "' + e + '"',
                      o = 0,
                      a = n.length;
                    o < a;
                    o++
                  )
                    Ze(n[o], t, r, t, i);
                }
                return t;
              });
          }
          var Sn = null;
          function An(e) {
            var t = Sn;
            return (
              (Sn = e),
              function () {
                Sn = t;
              }
            );
          }
          function In(e) {
            var t = e.$options,
              n = t.parent;
            if (n && !t.abstract) {
              while (n.$options.abstract && n.$parent) n = n.$parent;
              n.$children.push(e);
            }
            (e.$parent = n),
              (e.$root = n ? n.$root : e),
              (e.$children = []),
              (e.$refs = {}),
              (e._watcher = null),
              (e._inactive = null),
              (e._directInactive = !1),
              (e._isMounted = !1),
              (e._isDestroyed = !1),
              (e._isBeingDestroyed = !1);
          }
          function On(e) {
            (e.prototype._update = function (e, t) {
              var n = this,
                r = n.$el,
                i = n._vnode,
                o = An(n);
              (n._vnode = e),
                (n.$el = i ? n.__patch__(i, e) : n.__patch__(n.$el, e, t, !1)),
                o(),
                r && (r.__vue__ = null),
                n.$el && (n.$el.__vue__ = n),
                n.$vnode &&
                  n.$parent &&
                  n.$vnode === n.$parent._vnode &&
                  (n.$parent.$el = n.$el);
            }),
              (e.prototype.$forceUpdate = function () {
                var e = this;
                e._watcher && e._watcher.update();
              }),
              (e.prototype.$destroy = function () {
                var e = this;
                if (!e._isBeingDestroyed) {
                  jn(e, "beforeDestroy"), (e._isBeingDestroyed = !0);
                  var t = e.$parent;
                  !t ||
                    t._isBeingDestroyed ||
                    e.$options.abstract ||
                    y(t.$children, e),
                    e._watcher && e._watcher.teardown();
                  var n = e._watchers.length;
                  while (n--) e._watchers[n].teardown();
                  e._data.__ob__ && e._data.__ob__.vmCount--,
                    (e._isDestroyed = !0),
                    e.__patch__(e._vnode, null),
                    jn(e, "destroyed"),
                    e.$off(),
                    e.$el && (e.$el.__vue__ = null),
                    e.$vnode && (e.$vnode.parent = null);
                }
              });
          }
          function Pn(e, t, r, i, o) {
            var a = i.data.scopedSlots,
              s = e.$scopedSlots,
              c = !!(
                (a && !a.$stable) ||
                (s !== n && !s.$stable) ||
                (a && e.$scopedSlots.$key !== a.$key)
              ),
              u = !!(o || e.$options._renderChildren || c);
            if (
              ((e.$options._parentVnode = i),
              (e.$vnode = i),
              e._vnode && (e._vnode.parent = i),
              (e.$options._renderChildren = o),
              (e.$attrs = i.data.attrs || n),
              (e.$listeners = r || n),
              t && e.$options.props)
            ) {
              Se(!1);
              for (
                var l = e._props, f = e.$options._propKeys || [], d = 0;
                d < f.length;
                d++
              ) {
                var p = f[d],
                  h = e.$options.props;
                l[p] = Ve(p, h, t, e);
              }
              Se(!0), (e.$options.propsData = t);
            }
            e._$updateProperties && e._$updateProperties(e), (r = r || n);
            var g = e.$options._parentListeners;
            (e.$options._parentListeners = r),
              kn(e, r, g),
              u && ((e.$slots = At(o, i.context)), e.$forceUpdate());
          }
          function Tn(e) {
            while (e && (e = e.$parent)) if (e._inactive) return !0;
            return !1;
          }
          function Cn(e, t) {
            if (t) {
              if (((e._directInactive = !1), Tn(e))) return;
            } else if (e._directInactive) return;
            if (e._inactive || null === e._inactive) {
              e._inactive = !1;
              for (var n = 0; n < e.$children.length; n++) Cn(e.$children[n]);
              jn(e, "activated");
            }
          }
          function En(e, t) {
            if ((!t || ((e._directInactive = !0), !Tn(e))) && !e._inactive) {
              e._inactive = !0;
              for (var n = 0; n < e.$children.length; n++) En(e.$children[n]);
              jn(e, "deactivated");
            }
          }
          function jn(e, t) {
            de();
            var n = e.$options[t],
              r = t + " hook";
            if (n)
              for (var i = 0, o = n.length; i < o; i++) Ze(n[i], e, null, e, r);
            e._hasHookEvent && e.$emit("hook:" + t), pe();
          }
          var Ln = [],
            Dn = [],
            Mn = {},
            Nn = !1,
            Un = !1,
            Rn = 0;
          function $n() {
            (Rn = Ln.length = Dn.length = 0), (Mn = {}), (Nn = Un = !1);
          }
          var Fn = Date.now;
          if (G && !Q) {
            var Bn = window.performance;
            Bn &&
              "function" === typeof Bn.now &&
              Fn() > document.createEvent("Event").timeStamp &&
              (Fn = function () {
                return Bn.now();
              });
          }
          function qn() {
            var e, t;
            for (
              Fn(),
                Un = !0,
                Ln.sort(function (e, t) {
                  return e.id - t.id;
                }),
                Rn = 0;
              Rn < Ln.length;
              Rn++
            )
              (e = Ln[Rn]),
                e.before && e.before(),
                (t = e.id),
                (Mn[t] = null),
                e.run();
            var n = Dn.slice(),
              r = Ln.slice();
            $n(), Vn(n), Kn(r), oe && B.devtools && oe.emit("flush");
          }
          function Kn(e) {
            var t = e.length;
            while (t--) {
              var n = e[t],
                r = n.vm;
              r._watcher === n &&
                r._isMounted &&
                !r._isDestroyed &&
                jn(r, "updated");
            }
          }
          function zn(e) {
            (e._inactive = !1), Dn.push(e);
          }
          function Vn(e) {
            for (var t = 0; t < e.length; t++)
              (e[t]._inactive = !0), Cn(e[t], !0);
          }
          function Hn(e) {
            var t = e.id;
            if (null == Mn[t]) {
              if (((Mn[t] = !0), Un)) {
                var n = Ln.length - 1;
                while (n > Rn && Ln[n].id > e.id) n--;
                Ln.splice(n + 1, 0, e);
              } else Ln.push(e);
              Nn || ((Nn = !0), ct(qn));
            }
          }
          var Wn = 0,
            Jn = function (e, t, n, r, i) {
              (this.vm = e),
                i && (e._watcher = this),
                e._watchers.push(this),
                r
                  ? ((this.deep = !!r.deep),
                    (this.user = !!r.user),
                    (this.lazy = !!r.lazy),
                    (this.sync = !!r.sync),
                    (this.before = r.before))
                  : (this.deep = this.user = this.lazy = this.sync = !1),
                (this.cb = n),
                (this.id = ++Wn),
                (this.active = !0),
                (this.dirty = this.lazy),
                (this.deps = []),
                (this.newDeps = []),
                (this.depIds = new se()),
                (this.newDepIds = new se()),
                (this.expression = ""),
                "function" === typeof t
                  ? (this.getter = t)
                  : ((this.getter = H(t)), this.getter || (this.getter = L)),
                (this.value = this.lazy ? void 0 : this.get());
            };
          (Jn.prototype.get = function () {
            var e;
            de(this);
            var t = this.vm;
            try {
              e = this.getter.call(t, t);
            } catch (ai) {
              if (!this.user) throw ai;
              Ye(ai, t, 'getter for watcher "' + this.expression + '"');
            } finally {
              this.deep && lt(e), pe(), this.cleanupDeps();
            }
            return e;
          }),
            (Jn.prototype.addDep = function (e) {
              var t = e.id;
              this.newDepIds.has(t) ||
                (this.newDepIds.add(t),
                this.newDeps.push(e),
                this.depIds.has(t) || e.addSub(this));
            }),
            (Jn.prototype.cleanupDeps = function () {
              var e = this.deps.length;
              while (e--) {
                var t = this.deps[e];
                this.newDepIds.has(t.id) || t.removeSub(this);
              }
              var n = this.depIds;
              (this.depIds = this.newDepIds),
                (this.newDepIds = n),
                this.newDepIds.clear(),
                (n = this.deps),
                (this.deps = this.newDeps),
                (this.newDeps = n),
                (this.newDeps.length = 0);
            }),
            (Jn.prototype.update = function () {
              this.lazy ? (this.dirty = !0) : this.sync ? this.run() : Hn(this);
            }),
            (Jn.prototype.run = function () {
              if (this.active) {
                var e = this.get();
                if (e !== this.value || c(e) || this.deep) {
                  var t = this.value;
                  if (((this.value = e), this.user))
                    try {
                      this.cb.call(this.vm, e, t);
                    } catch (ai) {
                      Ye(
                        ai,
                        this.vm,
                        'callback for watcher "' + this.expression + '"'
                      );
                    }
                  else this.cb.call(this.vm, e, t);
                }
              }
            }),
            (Jn.prototype.evaluate = function () {
              (this.value = this.get()), (this.dirty = !1);
            }),
            (Jn.prototype.depend = function () {
              var e = this.deps.length;
              while (e--) this.deps[e].depend();
            }),
            (Jn.prototype.teardown = function () {
              if (this.active) {
                this.vm._isBeingDestroyed || y(this.vm._watchers, this);
                var e = this.deps.length;
                while (e--) this.deps[e].removeSub(this);
                this.active = !1;
              }
            });
          var Gn = { enumerable: !0, configurable: !0, get: L, set: L };
          function Yn(e, t, n) {
            (Gn.get = function () {
              return this[t][n];
            }),
              (Gn.set = function (e) {
                this[t][n] = e;
              }),
              Object.defineProperty(e, n, Gn);
          }
          function Zn(e) {
            e._watchers = [];
            var t = e.$options;
            t.props && Xn(e, t.props),
              t.methods && ar(e, t.methods),
              t.data ? Qn(e) : Pe((e._data = {}), !0),
              t.computed && nr(e, t.computed),
              t.watch && t.watch !== ne && sr(e, t.watch);
          }
          function Xn(e, t) {
            var n = e.$options.propsData || {},
              r = (e._props = {}),
              i = (e.$options._propKeys = []),
              o = !e.$parent;
            o || Se(!1);
            var a = function (o) {
              i.push(o);
              var a = Ve(o, t, n, e);
              Te(r, o, a), o in e || Yn(e, "_props", o);
            };
            for (var s in t) a(s);
            Se(!0);
          }
          function Qn(e) {
            var t = e.$options.data;
            (t = e._data = "function" === typeof t ? er(t, e) : t || {}),
              l(t) || (t = {});
            var n = Object.keys(t),
              r = e.$options.props,
              i = (e.$options.methods, n.length);
            while (i--) {
              var o = n[i];
              0, (r && b(r, o)) || K(o) || Yn(e, "_data", o);
            }
            Pe(t, !0);
          }
          function er(e, t) {
            de();
            try {
              return e.call(t, t);
            } catch (ai) {
              return Ye(ai, t, "data()"), {};
            } finally {
              pe();
            }
          }
          var tr = { lazy: !0 };
          function nr(e, t) {
            var n = (e._computedWatchers = Object.create(null)),
              r = ie();
            for (var i in t) {
              var o = t[i],
                a = "function" === typeof o ? o : o.get;
              0, r || (n[i] = new Jn(e, a || L, L, tr)), i in e || rr(e, i, o);
            }
          }
          function rr(e, t, n) {
            var r = !ie();
            "function" === typeof n
              ? ((Gn.get = r ? ir(t) : or(n)), (Gn.set = L))
              : ((Gn.get = n.get
                  ? r && !1 !== n.cache
                    ? ir(t)
                    : or(n.get)
                  : L),
                (Gn.set = n.set || L)),
              Object.defineProperty(e, t, Gn);
          }
          function ir(e) {
            return function () {
              var t = this._computedWatchers && this._computedWatchers[e];
              if (t)
                return (
                  t.dirty && t.evaluate(),
                  fe.SharedObject.target && t.depend(),
                  t.value
                );
            };
          }
          function or(e) {
            return function () {
              return e.call(this, this);
            };
          }
          function ar(e, t) {
            e.$options.props;
            for (var n in t) e[n] = "function" !== typeof t[n] ? L : T(t[n], e);
          }
          function sr(e, t) {
            for (var n in t) {
              var r = t[n];
              if (Array.isArray(r))
                for (var i = 0; i < r.length; i++) cr(e, n, r[i]);
              else cr(e, n, r);
            }
          }
          function cr(e, t, n, r) {
            return (
              l(n) && ((r = n), (n = n.handler)),
              "string" === typeof n && (n = e[n]),
              e.$watch(t, n, r)
            );
          }
          function ur(e) {
            var t = {
                get: function () {
                  return this._data;
                },
              },
              n = {
                get: function () {
                  return this._props;
                },
              };
            Object.defineProperty(e.prototype, "$data", t),
              Object.defineProperty(e.prototype, "$props", n),
              (e.prototype.$set = Ce),
              (e.prototype.$delete = Ee),
              (e.prototype.$watch = function (e, t, n) {
                var r = this;
                if (l(t)) return cr(r, e, t, n);
                (n = n || {}), (n.user = !0);
                var i = new Jn(r, e, t, n);
                if (n.immediate)
                  try {
                    t.call(r, i.value);
                  } catch (o) {
                    Ye(
                      o,
                      r,
                      'callback for immediate watcher "' + i.expression + '"'
                    );
                  }
                return function () {
                  i.teardown();
                };
              });
          }
          var lr = 0;
          function fr(e) {
            e.prototype._init = function (e) {
              var t = this;
              (t._uid = lr++),
                (t._isVue = !0),
                e && e._isComponent
                  ? dr(t, e)
                  : (t.$options = Ke(pr(t.constructor), e || {}, t)),
                (t._renderProxy = t),
                (t._self = t),
                In(t),
                yn(t),
                un(t),
                jn(t, "beforeCreate"),
                !t._$fallback && xt(t),
                Zn(t),
                !t._$fallback && kt(t),
                !t._$fallback && jn(t, "created"),
                t.$options.el && t.$mount(t.$options.el);
            };
          }
          function dr(e, t) {
            var n = (e.$options = Object.create(e.constructor.options)),
              r = t._parentVnode;
            (n.parent = t.parent), (n._parentVnode = r);
            var i = r.componentOptions;
            (n.propsData = i.propsData),
              (n._parentListeners = i.listeners),
              (n._renderChildren = i.children),
              (n._componentTag = i.tag),
              t.render &&
                ((n.render = t.render),
                (n.staticRenderFns = t.staticRenderFns));
          }
          function pr(e) {
            var t = e.options;
            if (e.super) {
              var n = pr(e.super),
                r = e.superOptions;
              if (n !== r) {
                e.superOptions = n;
                var i = hr(e);
                i && E(e.extendOptions, i),
                  (t = e.options = Ke(n, e.extendOptions)),
                  t.name && (t.components[t.name] = e);
              }
            }
            return t;
          }
          function hr(e) {
            var t,
              n = e.options,
              r = e.sealedOptions;
            for (var i in n) n[i] !== r[i] && (t || (t = {}), (t[i] = n[i]));
            return t;
          }
          function gr(e) {
            this._init(e);
          }
          function vr(e) {
            e.use = function (e) {
              var t = this._installedPlugins || (this._installedPlugins = []);
              if (t.indexOf(e) > -1) return this;
              var n = C(arguments, 1);
              return (
                n.unshift(this),
                "function" === typeof e.install
                  ? e.install.apply(e, n)
                  : "function" === typeof e && e.apply(null, n),
                t.push(e),
                this
              );
            };
          }
          function mr(e) {
            e.mixin = function (e) {
              return (this.options = Ke(this.options, e)), this;
            };
          }
          function yr(e) {
            e.cid = 0;
            var t = 1;
            e.extend = function (e) {
              e = e || {};
              var n = this,
                r = n.cid,
                i = e._Ctor || (e._Ctor = {});
              if (i[r]) return i[r];
              var o = e.name || n.options.name;
              var a = function (e) {
                this._init(e);
              };
              return (
                (a.prototype = Object.create(n.prototype)),
                (a.prototype.constructor = a),
                (a.cid = t++),
                (a.options = Ke(n.options, e)),
                (a["super"] = n),
                a.options.props && _r(a),
                a.options.computed && br(a),
                (a.extend = n.extend),
                (a.mixin = n.mixin),
                (a.use = n.use),
                $.forEach(function (e) {
                  a[e] = n[e];
                }),
                o && (a.options.components[o] = a),
                (a.superOptions = n.options),
                (a.extendOptions = e),
                (a.sealedOptions = E({}, a.options)),
                (i[r] = a),
                a
              );
            };
          }
          function _r(e) {
            var t = e.options.props;
            for (var n in t) Yn(e.prototype, "_props", n);
          }
          function br(e) {
            var t = e.options.computed;
            for (var n in t) rr(e.prototype, n, t[n]);
          }
          function wr(e) {
            $.forEach(function (t) {
              e[t] = function (e, n) {
                return n
                  ? ("component" === t &&
                      l(n) &&
                      ((n.name = n.name || e),
                      (n = this.options._base.extend(n))),
                    "directive" === t &&
                      "function" === typeof n &&
                      (n = { bind: n, update: n }),
                    (this.options[t + "s"][e] = n),
                    n)
                  : this.options[t + "s"][e];
              };
            });
          }
          function kr(e) {
            return e && (e.Ctor.options.name || e.tag);
          }
          function xr(e, t) {
            return Array.isArray(e)
              ? e.indexOf(t) > -1
              : "string" === typeof e
              ? e.split(",").indexOf(t) > -1
              : !!f(e) && e.test(t);
          }
          function Sr(e, t) {
            var n = e.cache,
              r = e.keys,
              i = e._vnode;
            for (var o in n) {
              var a = n[o];
              if (a) {
                var s = kr(a.componentOptions);
                s && !t(s) && Ar(n, o, r, i);
              }
            }
          }
          function Ar(e, t, n, r) {
            var i = e[t];
            !i || (r && i.tag === r.tag) || i.componentInstance.$destroy(),
              (e[t] = null),
              y(n, t);
          }
          fr(gr), ur(gr), xn(gr), On(gr), dn(gr);
          var Ir = [String, RegExp, Array],
            Or = {
              name: "keep-alive",
              abstract: !0,
              props: { include: Ir, exclude: Ir, max: [String, Number] },
              created: function () {
                (this.cache = Object.create(null)), (this.keys = []);
              },
              destroyed: function () {
                for (var e in this.cache) Ar(this.cache, e, this.keys);
              },
              mounted: function () {
                var e = this;
                this.$watch("include", function (t) {
                  Sr(e, function (e) {
                    return xr(t, e);
                  });
                }),
                  this.$watch("exclude", function (t) {
                    Sr(e, function (e) {
                      return !xr(t, e);
                    });
                  });
              },
              render: function () {
                var e = this.$slots.default,
                  t = mn(e),
                  n = t && t.componentOptions;
                if (n) {
                  var r = kr(n),
                    i = this,
                    o = i.include,
                    a = i.exclude;
                  if ((o && (!r || !xr(o, r))) || (a && r && xr(a, r)))
                    return t;
                  var s = this,
                    c = s.cache,
                    u = s.keys,
                    l =
                      null == t.key
                        ? n.Ctor.cid + (n.tag ? "::" + n.tag : "")
                        : t.key;
                  c[l]
                    ? ((t.componentInstance = c[l].componentInstance),
                      y(u, l),
                      u.push(l))
                    : ((c[l] = t),
                      u.push(l),
                      this.max &&
                        u.length > parseInt(this.max) &&
                        Ar(c, u[0], u, this._vnode)),
                    (t.data.keepAlive = !0);
                }
                return t || (e && e[0]);
              },
            },
            Pr = { KeepAlive: Or };
          function Tr(e) {
            var t = {
              get: function () {
                return B;
              },
            };
            Object.defineProperty(e, "config", t),
              (e.util = {
                warn: ue,
                extend: E,
                mergeOptions: Ke,
                defineReactive: Te,
              }),
              (e.set = Ce),
              (e.delete = Ee),
              (e.nextTick = ct),
              (e.observable = function (e) {
                return Pe(e), e;
              }),
              (e.options = Object.create(null)),
              $.forEach(function (t) {
                e.options[t + "s"] = Object.create(null);
              }),
              (e.options._base = e),
              E(e.options.components, Pr),
              vr(e),
              mr(e),
              yr(e),
              wr(e);
          }
          Tr(gr),
            Object.defineProperty(gr.prototype, "$isServer", { get: ie }),
            Object.defineProperty(gr.prototype, "$ssrContext", {
              get: function () {
                return this.$vnode && this.$vnode.ssrContext;
              },
            }),
            Object.defineProperty(gr, "FunctionalRenderContext", { value: Vt }),
            (gr.version = "2.6.11");
          var Cr = "[object Array]",
            Er = "[object Object]",
            jr = "[object Null]",
            Lr = "[object Undefined]";
          function Dr(e, t) {
            var n = {};
            return Mr(e, t), Ur(e, t, "", n), n;
          }
          function Mr(e, t) {
            if (e !== t) {
              var n = $r(e),
                r = $r(t);
              if (n == Er && r == Er) {
                if (Object.keys(e).length >= Object.keys(t).length)
                  for (var i in t) {
                    var o = e[i];
                    void 0 === o ? (e[i] = null) : Mr(o, t[i]);
                  }
              } else
                n == Cr &&
                  r == Cr &&
                  e.length >= t.length &&
                  t.forEach(function (t, n) {
                    Mr(e[n], t);
                  });
            }
          }
          function Nr(e, t) {
            return (e !== jr && e !== Lr) || (t !== jr && t !== Lr);
          }
          function Ur(e, t, n, r) {
            if (e !== t) {
              var i = $r(e),
                o = $r(t);
              if (i == Er)
                if (o != Er || Object.keys(e).length < Object.keys(t).length)
                  Rr(r, n, e);
                else {
                  var a = function (i) {
                    var o = e[i],
                      a = t[i],
                      s = $r(o),
                      c = $r(a);
                    if (s != Cr && s != Er)
                      o !== t[i] &&
                        Nr(s, c) &&
                        Rr(r, ("" == n ? "" : n + ".") + i, o);
                    else if (s == Cr)
                      c != Cr || o.length < a.length
                        ? Rr(r, ("" == n ? "" : n + ".") + i, o)
                        : o.forEach(function (e, t) {
                            Ur(
                              e,
                              a[t],
                              ("" == n ? "" : n + ".") + i + "[" + t + "]",
                              r
                            );
                          });
                    else if (s == Er)
                      if (
                        c != Er ||
                        Object.keys(o).length < Object.keys(a).length
                      )
                        Rr(r, ("" == n ? "" : n + ".") + i, o);
                      else
                        for (var u in o)
                          Ur(
                            o[u],
                            a[u],
                            ("" == n ? "" : n + ".") + i + "." + u,
                            r
                          );
                  };
                  for (var s in e) a(s);
                }
              else
                i == Cr
                  ? o != Cr || e.length < t.length
                    ? Rr(r, n, e)
                    : e.forEach(function (e, i) {
                        Ur(e, t[i], n + "[" + i + "]", r);
                      })
                  : Rr(r, n, e);
            }
          }
          function Rr(e, t, n) {
            e[t] = n;
          }
          function $r(e) {
            return Object.prototype.toString.call(e);
          }
          function Fr(e) {
            if (e.__next_tick_callbacks && e.__next_tick_callbacks.length) {
              if (
                Object({
                  NODE_ENV: "production",
                  VUE_APP_DARK_MODE: "false",
                  VUE_APP_NAME: "dengman",
                  VUE_APP_PLATFORM: "mp-weixin",
                  BASE_URL: "/",
                }).VUE_APP_DEBUG
              ) {
                var t = e.$scope;
                console.log(
                  "[" +
                    +new Date() +
                    "][" +
                    (t.is || t.route) +
                    "][" +
                    e._uid +
                    "]:flushCallbacks[" +
                    e.__next_tick_callbacks.length +
                    "]"
                );
              }
              var n = e.__next_tick_callbacks.slice(0);
              e.__next_tick_callbacks.length = 0;
              for (var r = 0; r < n.length; r++) n[r]();
            }
          }
          function Br(e) {
            return Ln.find(function (t) {
              return e._watcher === t;
            });
          }
          function qr(e, t) {
            if (!e.__next_tick_pending && !Br(e)) {
              if (
                Object({
                  NODE_ENV: "production",
                  VUE_APP_DARK_MODE: "false",
                  VUE_APP_NAME: "dengman",
                  VUE_APP_PLATFORM: "mp-weixin",
                  BASE_URL: "/",
                }).VUE_APP_DEBUG
              ) {
                var n = e.$scope;
                console.log(
                  "[" +
                    +new Date() +
                    "][" +
                    (n.is || n.route) +
                    "][" +
                    e._uid +
                    "]:nextVueTick"
                );
              }
              return ct(t, e);
            }
            if (
              Object({
                NODE_ENV: "production",
                VUE_APP_DARK_MODE: "false",
                VUE_APP_NAME: "dengman",
                VUE_APP_PLATFORM: "mp-weixin",
                BASE_URL: "/",
              }).VUE_APP_DEBUG
            ) {
              var r = e.$scope;
              console.log(
                "[" +
                  +new Date() +
                  "][" +
                  (r.is || r.route) +
                  "][" +
                  e._uid +
                  "]:nextMPTick"
              );
            }
            var i;
            if (
              (e.__next_tick_callbacks || (e.__next_tick_callbacks = []),
              e.__next_tick_callbacks.push(function () {
                if (t)
                  try {
                    t.call(e);
                  } catch (ai) {
                    Ye(ai, e, "nextTick");
                  }
                else i && i(e);
              }),
              !t && "undefined" !== typeof Promise)
            )
              return new Promise(function (e) {
                i = e;
              });
          }
          function Kr(e, t) {
            return t && (t._isVue || t.__v_isMPComponent) ? {} : t;
          }
          function zr(e) {
            var t = Object.create(null),
              n = [].concat(
                Object.keys(e._data || {}),
                Object.keys(e._computedWatchers || {})
              );
            n.reduce(function (t, n) {
              return (t[n] = e[n]), t;
            }, t);
            var r = e.__composition_api_state__ || e.__secret_vfa_state__,
              i = r && r.rawBindings;
            return (
              i &&
                Object.keys(i).forEach(function (n) {
                  t[n] = e[n];
                }),
              Object.assign(t, e.$mp.data || {}),
              Array.isArray(e.$options.behaviors) &&
                -1 !== e.$options.behaviors.indexOf("uni://form-field") &&
                ((t["name"] = e.name), (t["value"] = e.value)),
              JSON.parse(JSON.stringify(t, Kr))
            );
          }
          var Vr = function (e, t) {
            var n = this;
            if (
              null !== t &&
              ("page" === this.mpType || "component" === this.mpType)
            ) {
              var r = this.$scope,
                i = Object.create(null);
              try {
                i = zr(this);
              } catch (s) {
                console.error(s);
              }
              i.__webviewId__ = r.data.__webviewId__;
              var o = Object.create(null);
              Object.keys(i).forEach(function (e) {
                o[e] = r.data[e];
              });
              var a = !1 === this.$shouldDiffData ? i : Dr(i, o);
              Object.keys(a).length
                ? (Object({
                    NODE_ENV: "production",
                    VUE_APP_DARK_MODE: "false",
                    VUE_APP_NAME: "dengman",
                    VUE_APP_PLATFORM: "mp-weixin",
                    BASE_URL: "/",
                  }).VUE_APP_DEBUG &&
                    console.log(
                      "[" +
                        +new Date() +
                        "][" +
                        (r.is || r.route) +
                        "][" +
                        this._uid +
                        "]差量更新",
                      JSON.stringify(a)
                    ),
                  (this.__next_tick_pending = !0),
                  r.setData(a, function () {
                    (n.__next_tick_pending = !1), Fr(n);
                  }))
                : Fr(this);
            }
          };
          function Hr() {}
          function Wr(e, t, n) {
            if (!e.mpType) return e;
            "app" === e.mpType && (e.$options.render = Hr),
              e.$options.render || (e.$options.render = Hr),
              !e._$fallback && jn(e, "beforeMount");
            var r = function () {
              e._update(e._render(), n);
            };
            return (
              new Jn(
                e,
                r,
                L,
                {
                  before: function () {
                    e._isMounted && !e._isDestroyed && jn(e, "beforeUpdate");
                  },
                },
                !0
              ),
              (n = !1),
              e
            );
          }
          function Jr(e, t) {
            return i(e) || i(t) ? Gr(e, Yr(t)) : "";
          }
          function Gr(e, t) {
            return e ? (t ? e + " " + t : e) : t || "";
          }
          function Yr(e) {
            return Array.isArray(e)
              ? Zr(e)
              : c(e)
              ? Xr(e)
              : "string" === typeof e
              ? e
              : "";
          }
          function Zr(e) {
            for (var t, n = "", r = 0, o = e.length; r < o; r++)
              i((t = Yr(e[r]))) && "" !== t && (n && (n += " "), (n += t));
            return n;
          }
          function Xr(e) {
            var t = "";
            for (var n in e) e[n] && (t && (t += " "), (t += n));
            return t;
          }
          var Qr = w(function (e) {
            var t = {},
              n = /;(?![^(]*\))/g,
              r = /:(.+)/;
            return (
              e.split(n).forEach(function (e) {
                if (e) {
                  var n = e.split(r);
                  n.length > 1 && (t[n[0].trim()] = n[1].trim());
                }
              }),
              t
            );
          });
          function ei(e) {
            return Array.isArray(e) ? j(e) : "string" === typeof e ? Qr(e) : e;
          }
          var ti = [
            "createSelectorQuery",
            "createIntersectionObserver",
            "selectAllComponents",
            "selectComponent",
          ];
          function ni(e, t) {
            var n = t.split("."),
              r = n[0];
            return (
              0 === r.indexOf("__$n") && (r = parseInt(r.replace("__$n", ""))),
              1 === n.length ? e[r] : ni(e[r], n.slice(1).join("."))
            );
          }
          function ri(e) {
            e.config.errorHandler = function (t, n, r) {
              e.util.warn("Error in " + r + ': "' + t.toString() + '"', n),
                console.error(t);
              var i = "function" === typeof getApp && getApp();
              i && i.onError && i.onError(t);
            };
            var t = e.prototype.$emit;
            (e.prototype.$emit = function (e) {
              if (this.$scope && e) {
                var n =
                  this.$scope["_triggerEvent"] || this.$scope["triggerEvent"];
                if (n)
                  try {
                    n.call(this.$scope, e, { __args__: C(arguments, 1) });
                  } catch (r) {}
              }
              return t.apply(this, arguments);
            }),
              (e.prototype.$nextTick = function (e) {
                return qr(this, e);
              }),
              ti.forEach(function (t) {
                e.prototype[t] = function (e) {
                  return this.$scope && this.$scope[t]
                    ? this.$scope[t](e)
                    : "undefined" !== typeof my
                    ? "createSelectorQuery" === t
                      ? my.createSelectorQuery(e)
                      : "createIntersectionObserver" === t
                      ? my.createIntersectionObserver(e)
                      : void 0
                    : void 0;
                };
              }),
              (e.prototype.__init_provide = kt),
              (e.prototype.__init_injections = xt),
              (e.prototype.__call_hook = function (e, t) {
                var n = this;
                de();
                var r,
                  i = n.$options[e],
                  o = e + " hook";
                if (i)
                  for (var a = 0, s = i.length; a < s; a++)
                    r = Ze(i[a], n, t ? [t] : null, n, o);
                return n._hasHookEvent && n.$emit("hook:" + e, t), pe(), r;
              }),
              (e.prototype.__set_model = function (t, n, r, i) {
                Array.isArray(i) &&
                  (-1 !== i.indexOf("trim") && (r = r.trim()),
                  -1 !== i.indexOf("number") && (r = this._n(r))),
                  t || (t = this),
                  e.set(t, n, r);
              }),
              (e.prototype.__set_sync = function (t, n, r) {
                t || (t = this), e.set(t, n, r);
              }),
              (e.prototype.__get_orig = function (e) {
                return (l(e) && e["$orig"]) || e;
              }),
              (e.prototype.__get_value = function (e, t) {
                return ni(t || this, e);
              }),
              (e.prototype.__get_class = function (e, t) {
                return Jr(t, e);
              }),
              (e.prototype.__get_style = function (e, t) {
                if (!e && !t) return "";
                var n = ei(e),
                  r = t ? E(t, n) : n;
                return Object.keys(r)
                  .map(function (e) {
                    return I(e) + ":" + r[e];
                  })
                  .join(";");
              }),
              (e.prototype.__map = function (e, t) {
                var n, r, i, o, a;
                if (Array.isArray(e)) {
                  for (n = new Array(e.length), r = 0, i = e.length; r < i; r++)
                    n[r] = t(e[r], r);
                  return n;
                }
                if (c(e)) {
                  for (
                    o = Object.keys(e),
                      n = Object.create(null),
                      r = 0,
                      i = o.length;
                    r < i;
                    r++
                  )
                    (a = o[r]), (n[a] = t(e[a], a, r));
                  return n;
                }
                if ("number" === typeof e) {
                  for (n = new Array(e), r = 0, i = e; r < i; r++)
                    n[r] = t(r, r);
                  return n;
                }
                return [];
              });
          }
          var ii = [
            "onLaunch",
            "onShow",
            "onHide",
            "onUniNViewMessage",
            "onPageNotFound",
            "onThemeChange",
            "onError",
            "onUnhandledRejection",
            "onInit",
            "onLoad",
            "onReady",
            "onUnload",
            "onPullDownRefresh",
            "onReachBottom",
            "onTabItemTap",
            "onAddToFavorites",
            "onShareTimeline",
            "onShareAppMessage",
            "onResize",
            "onPageScroll",
            "onNavigationBarButtonTap",
            "onBackPress",
            "onNavigationBarSearchInputChanged",
            "onNavigationBarSearchInputConfirmed",
            "onNavigationBarSearchInputClicked",
            "onUploadDouyinVideo",
            "onNFCReadMessage",
            "onPageShow",
            "onPageHide",
            "onPageResize",
          ];
          function oi(e) {
            var t = e.extend;
            e.extend = function (e) {
              e = e || {};
              var n = e.methods;
              return (
                n &&
                  Object.keys(n).forEach(function (t) {
                    -1 !== ii.indexOf(t) && ((e[t] = n[t]), delete n[t]);
                  }),
                t.call(this, e)
              );
            };
            var n = e.config.optionMergeStrategies,
              r = n.created;
            ii.forEach(function (e) {
              n[e] = r;
            }),
              (e.prototype.__lifecycle_hooks__ = ii);
          }
          (gr.prototype.__patch__ = Vr),
            (gr.prototype.$mount = function (e, t) {
              return Wr(this, e, t);
            }),
            oi(gr),
            ri(gr),
            (t["default"] = gr);
        }.call(this, n("c8ba"));
    },
    "6b58": function (e, t, n) {
      var r = n("7037")["default"],
        i = n("3c96");
      function o(e, t) {
        if (t && ("object" == r(t) || "function" == typeof t)) return t;
        if (void 0 !== t)
          throw new TypeError(
            "Derived constructors may only return object or undefined"
          );
        return i(e);
      }
      (e.exports = o),
        (e.exports.__esModule = !0),
        (e.exports["default"] = e.exports);
    },
    "6cdc": function (e, t) {},
    "6f8f": function (e, t) {
      function n() {
        try {
          var t = !Boolean.prototype.valueOf.call(
            Reflect.construct(Boolean, [], function () {})
          );
        } catch (t) {}
        return ((e.exports = n =
          function () {
            return !!t;
          }),
        (e.exports.__esModule = !0),
        (e.exports["default"] = e.exports))();
      }
      (e.exports = n),
        (e.exports.__esModule = !0),
        (e.exports["default"] = e.exports);
    },
    7037: function (e, t) {
      function n(t) {
        return (
          (e.exports = n =
            "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
              ? function (e) {
                  return typeof e;
                }
              : function (e) {
                  return e &&
                    "function" == typeof Symbol &&
                    e.constructor === Symbol &&
                    e !== Symbol.prototype
                    ? "symbol"
                    : typeof e;
                }),
          (e.exports.__esModule = !0),
          (e.exports["default"] = e.exports),
          n(t)
        );
      }
      (e.exports = n),
        (e.exports.__esModule = !0),
        (e.exports["default"] = e.exports);
    },
    "73b8": function (e, t, n) {
      "use strict";
      var r = n("4ea4");
      Object.defineProperty(t, "__esModule", { value: !0 }),
        (t.default = void 0);
      var i = r(n("2eee")),
        o = r(n("6b58")),
        a = r(n("36c6")),
        s = r(n("ed6d")),
        c = (r(n("da60")), r(n("c973"))),
        u = r(n("970b")),
        l = r(n("5bc3")),
        f = r(n("7037"));
      function d(e, t, n) {
        return (
          (t = (0, a.default)(t)),
          (0, o.default)(
            e,
            p()
              ? Reflect.construct(t, n || [], (0, a.default)(e).constructor)
              : t.apply(e, n)
          )
        );
      }
      function p() {
        try {
          var e = !Boolean.prototype.valueOf.call(
            Reflect.construct(Boolean, [], function () {})
          );
        } catch (e) {}
        return (p = function () {
          return !!e;
        })();
      }
      var h = {
          email: /^\S+?@\S+?\.\S+?$/,
          idcard:
            /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/,
          url: new RegExp(
            "^(?!mailto:)(?:(?:http|https|ftp)://|//)(?:\\S+(?::\\S*)?@)?(?:(?:(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}(?:\\.(?:[0-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))|(?:(?:[a-z\\u00a1-\\uffff0-9]+-*)*[a-z\\u00a1-\\uffff0-9]+)(?:\\.(?:[a-z\\u00a1-\\uffff0-9]+-*)*[a-z\\u00a1-\\uffff0-9]+)*(?:\\.(?:[a-z\\u00a1-\\uffff]{2,})))|localhost)(?::\\d{2,5})?(?:(/|\\?|#)[^\\s]*)?$",
            "i"
          ),
        },
        g = {
          int: "integer",
          bool: "boolean",
          double: "number",
          long: "number",
          password: "string",
        };
      function v(e) {
        var t =
            arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "",
          n = ["label"];
        n.forEach(function (t) {
          void 0 === e[t] && (e[t] = "");
        });
        var r = t;
        for (var i in e) {
          var o = new RegExp("{" + i + "}");
          r = r.replace(o, e[i]);
        }
        return r;
      }
      function m(e, t) {
        return (
          void 0 === e ||
          null === e ||
          ("string" === typeof e && !e) ||
          !(!Array.isArray(e) || e.length) ||
          ("object" === t && !Object.keys(e).length)
        );
      }
      var y = {
          integer: function (e) {
            return y.number(e) && parseInt(e, 10) === e;
          },
          string: function (e) {
            return "string" === typeof e;
          },
          number: function (e) {
            return !isNaN(e) && "number" === typeof e;
          },
          boolean: function (e) {
            return "boolean" === typeof e;
          },
          float: function (e) {
            return y.number(e) && !y.integer(e);
          },
          array: function (e) {
            return Array.isArray(e);
          },
          object: function (e) {
            return "object" === (0, f.default)(e) && !y.array(e);
          },
          date: function (e) {
            return e instanceof Date;
          },
          timestamp: function (e) {
            return !(!this.integer(e) || Math.abs(e).toString().length > 16);
          },
          file: function (e) {
            return "string" === typeof e.url;
          },
          email: function (e) {
            return (
              "string" === typeof e && !!e.match(h.email) && e.length < 255
            );
          },
          url: function (e) {
            return "string" === typeof e && !!e.match(h.url);
          },
          pattern: function (e, t) {
            try {
              return new RegExp(e).test(t);
            } catch (n) {
              return !1;
            }
          },
          method: function (e) {
            return "function" === typeof e;
          },
          idcard: function (e) {
            return "string" === typeof e && !!e.match(h.idcard);
          },
          "url-https": function (e) {
            return this.url(e) && e.startsWith("https://");
          },
          "url-scheme": function (e) {
            return e.startsWith("://");
          },
          "url-web": function (e) {
            return !1;
          },
        },
        _ = (function () {
          function e(t) {
            (0, u.default)(this, e), (this._message = t);
          }
          return (0, l.default)(e, [
            {
              key: "validateRule",
              value: (function () {
                var e = (0, c.default)(
                  i.default.mark(function e(t, n, r, o, a) {
                    var s, c, u, l, f, d, p, h, g;
                    return i.default.wrap(
                      function (e) {
                        while (1)
                          switch ((e.prev = e.next)) {
                            case 0:
                              if (
                                ((s = null),
                                (c = n.rules),
                                (u = c.findIndex(function (e) {
                                  return e.required;
                                })),
                                !(u < 0))
                              ) {
                                e.next = 8;
                                break;
                              }
                              if (null !== r && void 0 !== r) {
                                e.next = 6;
                                break;
                              }
                              return e.abrupt("return", s);
                            case 6:
                              if ("string" !== typeof r || r.length) {
                                e.next = 8;
                                break;
                              }
                              return e.abrupt("return", s);
                            case 8:
                              if (((l = this._message), void 0 !== c)) {
                                e.next = 11;
                                break;
                              }
                              return e.abrupt("return", l["default"]);
                            case 11:
                              f = 0;
                            case 12:
                              if (!(f < c.length)) {
                                e.next = 35;
                                break;
                              }
                              if (
                                ((d = c[f]),
                                (p = this._getValidateType(d)),
                                Object.assign(d, {
                                  label: n.label || '["'.concat(t, '"]'),
                                }),
                                !b[p])
                              ) {
                                e.next = 20;
                                break;
                              }
                              if (((s = b[p](d, r, l)), null == s)) {
                                e.next = 20;
                                break;
                              }
                              return e.abrupt("break", 35);
                            case 20:
                              if (!d.validateExpr) {
                                e.next = 26;
                                break;
                              }
                              if (
                                ((h = Date.now()),
                                (g = d.validateExpr(r, a, h)),
                                !1 !== g)
                              ) {
                                e.next = 26;
                                break;
                              }
                              return (
                                (s = this._getMessage(
                                  d,
                                  d.errorMessage || this._message["default"]
                                )),
                                e.abrupt("break", 35)
                              );
                            case 26:
                              if (!d.validateFunction) {
                                e.next = 32;
                                break;
                              }
                              return (
                                (e.next = 29),
                                this.validateFunction(d, r, o, a, p)
                              );
                            case 29:
                              if (((s = e.sent), null === s)) {
                                e.next = 32;
                                break;
                              }
                              return e.abrupt("break", 35);
                            case 32:
                              f++, (e.next = 12);
                              break;
                            case 35:
                              return (
                                null !== s && (s = l.TAG + s),
                                e.abrupt("return", s)
                              );
                            case 37:
                            case "end":
                              return e.stop();
                          }
                      },
                      e,
                      this
                    );
                  })
                );
                function t(t, n, r, i, o) {
                  return e.apply(this, arguments);
                }
                return t;
              })(),
            },
            {
              key: "validateFunction",
              value: (function () {
                var e = (0, c.default)(
                  i.default.mark(function e(t, n, r, o, a) {
                    var s, c, u;
                    return i.default.wrap(
                      function (e) {
                        while (1)
                          switch ((e.prev = e.next)) {
                            case 0:
                              return (
                                (s = null),
                                (e.prev = 1),
                                (c = null),
                                (e.next = 5),
                                t.validateFunction(t, n, o || r, function (e) {
                                  c = e;
                                })
                              );
                            case 5:
                              (u = e.sent),
                                (c ||
                                  ("string" === typeof u && u) ||
                                  !1 === u) &&
                                  (s = this._getMessage(t, c || u, a)),
                                (e.next = 12);
                              break;
                            case 9:
                              (e.prev = 9),
                                (e.t0 = e["catch"](1)),
                                (s = this._getMessage(t, e.t0.message, a));
                            case 12:
                              return e.abrupt("return", s);
                            case 13:
                            case "end":
                              return e.stop();
                          }
                      },
                      e,
                      this,
                      [[1, 9]]
                    );
                  })
                );
                function t(t, n, r, i, o) {
                  return e.apply(this, arguments);
                }
                return t;
              })(),
            },
            {
              key: "_getMessage",
              value: function (e, t, n) {
                return v(
                  e,
                  t || e.errorMessage || this._message[n] || t["default"]
                );
              },
            },
            {
              key: "_getValidateType",
              value: function (e) {
                var t = "";
                return (
                  e.required
                    ? (t = "required")
                    : e.format
                    ? (t = "format")
                    : e.arrayType
                    ? (t = "arrayTypeFormat")
                    : e.range
                    ? (t = "range")
                    : void 0 !== e.maximum || void 0 !== e.minimum
                    ? (t = "rangeNumber")
                    : void 0 !== e.maxLength || void 0 !== e.minLength
                    ? (t = "rangeLength")
                    : e.pattern
                    ? (t = "pattern")
                    : e.validateFunction && (t = "validateFunction"),
                  t
                );
              },
            },
          ]);
        })(),
        b = {
          required: function (e, t, n) {
            return e.required && m(t, e.format || (0, f.default)(t))
              ? v(e, e.errorMessage || n.required)
              : null;
          },
          range: function (e, t, n) {
            for (
              var r = e.range,
                i = e.errorMessage,
                o = new Array(r.length),
                a = 0;
              a < r.length;
              a++
            ) {
              var s = r[a];
              y.object(s) && void 0 !== s.value ? (o[a] = s.value) : (o[a] = s);
            }
            var c = !1;
            return (
              Array.isArray(t)
                ? (c = new Set(t.concat(o)).size === o.length)
                : o.indexOf(t) > -1 && (c = !0),
              c ? null : v(e, i || n["enum"])
            );
          },
          rangeNumber: function (e, t, n) {
            if (!y.number(t)) return v(e, e.errorMessage || n.pattern.mismatch);
            var r = e.minimum,
              i = e.maximum,
              o = e.exclusiveMinimum,
              a = e.exclusiveMaximum,
              s = o ? t <= r : t < r,
              c = a ? t >= i : t > i;
            return void 0 !== r && s
              ? v(
                  e,
                  e.errorMessage ||
                    n["number"][o ? "exclusiveMinimum" : "minimum"]
                )
              : void 0 !== i && c
              ? v(
                  e,
                  e.errorMessage ||
                    n["number"][a ? "exclusiveMaximum" : "maximum"]
                )
              : void 0 !== r && void 0 !== i && (s || c)
              ? v(e, e.errorMessage || n["number"].range)
              : null;
          },
          rangeLength: function (e, t, n) {
            if (!y.string(t) && !y.array(t))
              return v(e, e.errorMessage || n.pattern.mismatch);
            var r = e.minLength,
              i = e.maxLength,
              o = t.length;
            return void 0 !== r && o < r
              ? v(e, e.errorMessage || n["length"].minLength)
              : void 0 !== i && o > i
              ? v(e, e.errorMessage || n["length"].maxLength)
              : void 0 !== r && void 0 !== i && (o < r || o > i)
              ? v(e, e.errorMessage || n["length"].range)
              : null;
          },
          pattern: function (e, t, n) {
            return y["pattern"](e.pattern, t)
              ? null
              : v(e, e.errorMessage || n.pattern.mismatch);
          },
          format: function (e, t, n) {
            var r = Object.keys(y),
              i = g[e.format] ? g[e.format] : e.format || e.arrayType;
            return r.indexOf(i) > -1 && !y[i](t)
              ? v(e, e.errorMessage || n.typeError)
              : null;
          },
          arrayTypeFormat: function (e, t, n) {
            if (!Array.isArray(t)) return v(e, e.errorMessage || n.typeError);
            for (var r = 0; r < t.length; r++) {
              var i = t[r],
                o = this.format(e, i, n);
              if (null !== o) return o;
            }
            return null;
          },
        },
        w = (function (e) {
          function t(e, n) {
            var r;
            return (
              (0, u.default)(this, t),
              (r = d(this, t, [t.message])),
              (r._schema = e),
              (r._options = n || null),
              r
            );
          }
          return (
            (0, s.default)(t, e),
            (0, l.default)(t, [
              {
                key: "updateSchema",
                value: function (e) {
                  this._schema = e;
                },
              },
              {
                key: "validate",
                value: (function () {
                  var e = (0, c.default)(
                    i.default.mark(function e(t, n) {
                      var r;
                      return i.default.wrap(
                        function (e) {
                          while (1)
                            switch ((e.prev = e.next)) {
                              case 0:
                                if (((r = this._checkFieldInSchema(t)), r)) {
                                  e.next = 5;
                                  break;
                                }
                                return (
                                  (e.next = 4), this.invokeValidate(t, !1, n)
                                );
                              case 4:
                                r = e.sent;
                              case 5:
                                return e.abrupt(
                                  "return",
                                  r.length ? r[0] : null
                                );
                              case 6:
                              case "end":
                                return e.stop();
                            }
                        },
                        e,
                        this
                      );
                    })
                  );
                  function t(t, n) {
                    return e.apply(this, arguments);
                  }
                  return t;
                })(),
              },
              {
                key: "validateAll",
                value: (function () {
                  var e = (0, c.default)(
                    i.default.mark(function e(t, n) {
                      var r;
                      return i.default.wrap(
                        function (e) {
                          while (1)
                            switch ((e.prev = e.next)) {
                              case 0:
                                if (((r = this._checkFieldInSchema(t)), r)) {
                                  e.next = 5;
                                  break;
                                }
                                return (
                                  (e.next = 4), this.invokeValidate(t, !0, n)
                                );
                              case 4:
                                r = e.sent;
                              case 5:
                                return e.abrupt("return", r);
                              case 6:
                              case "end":
                                return e.stop();
                            }
                        },
                        e,
                        this
                      );
                    })
                  );
                  function t(t, n) {
                    return e.apply(this, arguments);
                  }
                  return t;
                })(),
              },
              {
                key: "validateUpdate",
                value: (function () {
                  var e = (0, c.default)(
                    i.default.mark(function e(t, n) {
                      var r;
                      return i.default.wrap(
                        function (e) {
                          while (1)
                            switch ((e.prev = e.next)) {
                              case 0:
                                if (((r = this._checkFieldInSchema(t)), r)) {
                                  e.next = 5;
                                  break;
                                }
                                return (
                                  (e.next = 4),
                                  this.invokeValidateUpdate(t, !1, n)
                                );
                              case 4:
                                r = e.sent;
                              case 5:
                                return e.abrupt(
                                  "return",
                                  r.length ? r[0] : null
                                );
                              case 6:
                              case "end":
                                return e.stop();
                            }
                        },
                        e,
                        this
                      );
                    })
                  );
                  function t(t, n) {
                    return e.apply(this, arguments);
                  }
                  return t;
                })(),
              },
              {
                key: "invokeValidate",
                value: (function () {
                  var e = (0, c.default)(
                    i.default.mark(function e(t, n, r) {
                      var o, a, s, c, u;
                      return i.default.wrap(
                        function (e) {
                          while (1)
                            switch ((e.prev = e.next)) {
                              case 0:
                                (o = []),
                                  (a = this._schema),
                                  (e.t0 = i.default.keys(a));
                              case 3:
                                if ((e.t1 = e.t0()).done) {
                                  e.next = 15;
                                  break;
                                }
                                return (
                                  (s = e.t1.value),
                                  (c = a[s]),
                                  (e.next = 8),
                                  this.validateRule(s, c, t[s], t, r)
                                );
                              case 8:
                                if (((u = e.sent), null == u)) {
                                  e.next = 13;
                                  break;
                                }
                                if ((o.push({ key: s, errorMessage: u }), n)) {
                                  e.next = 13;
                                  break;
                                }
                                return e.abrupt("break", 15);
                              case 13:
                                e.next = 3;
                                break;
                              case 15:
                                return e.abrupt("return", o);
                              case 16:
                              case "end":
                                return e.stop();
                            }
                        },
                        e,
                        this
                      );
                    })
                  );
                  function t(t, n, r) {
                    return e.apply(this, arguments);
                  }
                  return t;
                })(),
              },
              {
                key: "invokeValidateUpdate",
                value: (function () {
                  var e = (0, c.default)(
                    i.default.mark(function e(t, n, r) {
                      var o, a, s;
                      return i.default.wrap(
                        function (e) {
                          while (1)
                            switch ((e.prev = e.next)) {
                              case 0:
                                (o = []), (e.t0 = i.default.keys(t));
                              case 2:
                                if ((e.t1 = e.t0()).done) {
                                  e.next = 13;
                                  break;
                                }
                                return (
                                  (a = e.t1.value),
                                  (e.next = 6),
                                  this.validateRule(
                                    a,
                                    this._schema[a],
                                    t[a],
                                    t,
                                    r
                                  )
                                );
                              case 6:
                                if (((s = e.sent), null == s)) {
                                  e.next = 11;
                                  break;
                                }
                                if ((o.push({ key: a, errorMessage: s }), n)) {
                                  e.next = 11;
                                  break;
                                }
                                return e.abrupt("break", 13);
                              case 11:
                                e.next = 2;
                                break;
                              case 13:
                                return e.abrupt("return", o);
                              case 14:
                              case "end":
                                return e.stop();
                            }
                        },
                        e,
                        this
                      );
                    })
                  );
                  function t(t, n, r) {
                    return e.apply(this, arguments);
                  }
                  return t;
                })(),
              },
              {
                key: "_checkFieldInSchema",
                value: function (e) {
                  var n = Object.keys(e),
                    r = Object.keys(this._schema);
                  if (new Set(n.concat(r)).size === r.length) return "";
                  var i = n.filter(function (e) {
                      return r.indexOf(e) < 0;
                    }),
                    o = v(
                      { field: JSON.stringify(i) },
                      t.message.TAG + t.message["defaultInvalid"]
                    );
                  return [{ key: "invalid", errorMessage: o }];
                },
              },
            ])
          );
        })(_);
      function k() {
        return {
          TAG: "",
          default: "验证错误",
          defaultInvalid: "提交的字段{field}在数据库中并不存在",
          validateFunction: "验证无效",
          required: "{label}必填",
          enum: "{label}超出范围",
          timestamp: "{label}格式无效",
          whitespace: "{label}不能为空",
          typeError: "{label}类型无效",
          date: {
            format: "{label}日期{value}格式无效",
            parse: "{label}日期无法解析,{value}无效",
            invalid: "{label}日期{value}无效",
          },
          length: {
            minLength: "{label}长度不能少于{minLength}",
            maxLength: "{label}长度不能超过{maxLength}",
            range: "{label}必须介于{minLength}和{maxLength}之间",
          },
          number: {
            minimum: "{label}不能小于{minimum}",
            maximum: "{label}不能大于{maximum}",
            exclusiveMinimum: "{label}不能小于等于{minimum}",
            exclusiveMaximum: "{label}不能大于等于{maximum}",
            range: "{label}必须介于{minimum}and{maximum}之间",
          },
          pattern: { mismatch: "{label}格式不匹配" },
        };
      }
      w.message = new k();
      t.default = w;
    },
    "7ec2": function (e, t, n) {
      var r = n("7037")["default"];
      function i() {
        "use strict";
        /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ (e.exports =
          i =
            function () {
              return n;
            }),
          (e.exports.__esModule = !0),
          (e.exports["default"] = e.exports);
        var t,
          n = {},
          o = Object.prototype,
          a = o.hasOwnProperty,
          s =
            Object.defineProperty ||
            function (e, t, n) {
              e[t] = n.value;
            },
          c = "function" == typeof Symbol ? Symbol : {},
          u = c.iterator || "@@iterator",
          l = c.asyncIterator || "@@asyncIterator",
          f = c.toStringTag || "@@toStringTag";
        function d(e, t, n) {
          return (
            Object.defineProperty(e, t, {
              value: n,
              enumerable: !0,
              configurable: !0,
              writable: !0,
            }),
            e[t]
          );
        }
        try {
          d({}, "");
        } catch (t) {
          d = function (e, t, n) {
            return (e[t] = n);
          };
        }
        function p(e, t, n, r) {
          var i = t && t.prototype instanceof b ? t : b,
            o = Object.create(i.prototype),
            a = new L(r || []);
          return s(o, "_invoke", { value: T(e, n, a) }), o;
        }
        function h(e, t, n) {
          try {
            return { type: "normal", arg: e.call(t, n) };
          } catch (e) {
            return { type: "throw", arg: e };
          }
        }
        n.wrap = p;
        var g = "suspendedStart",
          v = "suspendedYield",
          m = "executing",
          y = "completed",
          _ = {};
        function b() {}
        function w() {}
        function k() {}
        var x = {};
        d(x, u, function () {
          return this;
        });
        var S = Object.getPrototypeOf,
          A = S && S(S(D([])));
        A && A !== o && a.call(A, u) && (x = A);
        var I = (k.prototype = b.prototype = Object.create(x));
        function O(e) {
          ["next", "throw", "return"].forEach(function (t) {
            d(e, t, function (e) {
              return this._invoke(t, e);
            });
          });
        }
        function P(e, t) {
          function n(i, o, s, c) {
            var u = h(e[i], e, o);
            if ("throw" !== u.type) {
              var l = u.arg,
                f = l.value;
              return f && "object" == r(f) && a.call(f, "__await")
                ? t.resolve(f.__await).then(
                    function (e) {
                      n("next", e, s, c);
                    },
                    function (e) {
                      n("throw", e, s, c);
                    }
                  )
                : t.resolve(f).then(
                    function (e) {
                      (l.value = e), s(l);
                    },
                    function (e) {
                      return n("throw", e, s, c);
                    }
                  );
            }
            c(u.arg);
          }
          var i;
          s(this, "_invoke", {
            value: function (e, r) {
              function o() {
                return new t(function (t, i) {
                  n(e, r, t, i);
                });
              }
              return (i = i ? i.then(o, o) : o());
            },
          });
        }
        function T(e, n, r) {
          var i = g;
          return function (o, a) {
            if (i === m) throw Error("Generator is already running");
            if (i === y) {
              if ("throw" === o) throw a;
              return { value: t, done: !0 };
            }
            for (r.method = o, r.arg = a; ; ) {
              var s = r.delegate;
              if (s) {
                var c = C(s, r);
                if (c) {
                  if (c === _) continue;
                  return c;
                }
              }
              if ("next" === r.method) r.sent = r._sent = r.arg;
              else if ("throw" === r.method) {
                if (i === g) throw ((i = y), r.arg);
                r.dispatchException(r.arg);
              } else "return" === r.method && r.abrupt("return", r.arg);
              i = m;
              var u = h(e, n, r);
              if ("normal" === u.type) {
                if (((i = r.done ? y : v), u.arg === _)) continue;
                return { value: u.arg, done: r.done };
              }
              "throw" === u.type &&
                ((i = y), (r.method = "throw"), (r.arg = u.arg));
            }
          };
        }
        function C(e, n) {
          var r = n.method,
            i = e.iterator[r];
          if (i === t)
            return (
              (n.delegate = null),
              ("throw" === r &&
                e.iterator["return"] &&
                ((n.method = "return"),
                (n.arg = t),
                C(e, n),
                "throw" === n.method)) ||
                ("return" !== r &&
                  ((n.method = "throw"),
                  (n.arg = new TypeError(
                    "The iterator does not provide a '" + r + "' method"
                  )))),
              _
            );
          var o = h(i, e.iterator, n.arg);
          if ("throw" === o.type)
            return (
              (n.method = "throw"), (n.arg = o.arg), (n.delegate = null), _
            );
          var a = o.arg;
          return a
            ? a.done
              ? ((n[e.resultName] = a.value),
                (n.next = e.nextLoc),
                "return" !== n.method && ((n.method = "next"), (n.arg = t)),
                (n.delegate = null),
                _)
              : a
            : ((n.method = "throw"),
              (n.arg = new TypeError("iterator result is not an object")),
              (n.delegate = null),
              _);
        }
        function E(e) {
          var t = { tryLoc: e[0] };
          1 in e && (t.catchLoc = e[1]),
            2 in e && ((t.finallyLoc = e[2]), (t.afterLoc = e[3])),
            this.tryEntries.push(t);
        }
        function j(e) {
          var t = e.completion || {};
          (t.type = "normal"), delete t.arg, (e.completion = t);
        }
        function L(e) {
          (this.tryEntries = [{ tryLoc: "root" }]),
            e.forEach(E, this),
            this.reset(!0);
        }
        function D(e) {
          if (e || "" === e) {
            var n = e[u];
            if (n) return n.call(e);
            if ("function" == typeof e.next) return e;
            if (!isNaN(e.length)) {
              var i = -1,
                o = function n() {
                  for (; ++i < e.length; )
                    if (a.call(e, i)) return (n.value = e[i]), (n.done = !1), n;
                  return (n.value = t), (n.done = !0), n;
                };
              return (o.next = o);
            }
          }
          throw new TypeError(r(e) + " is not iterable");
        }
        return (
          (w.prototype = k),
          s(I, "constructor", { value: k, configurable: !0 }),
          s(k, "constructor", { value: w, configurable: !0 }),
          (w.displayName = d(k, f, "GeneratorFunction")),
          (n.isGeneratorFunction = function (e) {
            var t = "function" == typeof e && e.constructor;
            return (
              !!t &&
              (t === w || "GeneratorFunction" === (t.displayName || t.name))
            );
          }),
          (n.mark = function (e) {
            return (
              Object.setPrototypeOf
                ? Object.setPrototypeOf(e, k)
                : ((e.__proto__ = k), d(e, f, "GeneratorFunction")),
              (e.prototype = Object.create(I)),
              e
            );
          }),
          (n.awrap = function (e) {
            return { __await: e };
          }),
          O(P.prototype),
          d(P.prototype, l, function () {
            return this;
          }),
          (n.AsyncIterator = P),
          (n.async = function (e, t, r, i, o) {
            void 0 === o && (o = Promise);
            var a = new P(p(e, t, r, i), o);
            return n.isGeneratorFunction(t)
              ? a
              : a.next().then(function (e) {
                  return e.done ? e.value : a.next();
                });
          }),
          O(I),
          d(I, f, "Generator"),
          d(I, u, function () {
            return this;
          }),
          d(I, "toString", function () {
            return "[object Generator]";
          }),
          (n.keys = function (e) {
            var t = Object(e),
              n = [];
            for (var r in t) n.push(r);
            return (
              n.reverse(),
              function e() {
                for (; n.length; ) {
                  var r = n.pop();
                  if (r in t) return (e.value = r), (e.done = !1), e;
                }
                return (e.done = !0), e;
              }
            );
          }),
          (n.values = D),
          (L.prototype = {
            constructor: L,
            reset: function (e) {
              if (
                ((this.prev = 0),
                (this.next = 0),
                (this.sent = this._sent = t),
                (this.done = !1),
                (this.delegate = null),
                (this.method = "next"),
                (this.arg = t),
                this.tryEntries.forEach(j),
                !e)
              )
                for (var n in this)
                  "t" === n.charAt(0) &&
                    a.call(this, n) &&
                    !isNaN(+n.slice(1)) &&
                    (this[n] = t);
            },
            stop: function () {
              this.done = !0;
              var e = this.tryEntries[0].completion;
              if ("throw" === e.type) throw e.arg;
              return this.rval;
            },
            dispatchException: function (e) {
              if (this.done) throw e;
              var n = this;
              function r(r, i) {
                return (
                  (s.type = "throw"),
                  (s.arg = e),
                  (n.next = r),
                  i && ((n.method = "next"), (n.arg = t)),
                  !!i
                );
              }
              for (var i = this.tryEntries.length - 1; i >= 0; --i) {
                var o = this.tryEntries[i],
                  s = o.completion;
                if ("root" === o.tryLoc) return r("end");
                if (o.tryLoc <= this.prev) {
                  var c = a.call(o, "catchLoc"),
                    u = a.call(o, "finallyLoc");
                  if (c && u) {
                    if (this.prev < o.catchLoc) return r(o.catchLoc, !0);
                    if (this.prev < o.finallyLoc) return r(o.finallyLoc);
                  } else if (c) {
                    if (this.prev < o.catchLoc) return r(o.catchLoc, !0);
                  } else {
                    if (!u)
                      throw Error("try statement without catch or finally");
                    if (this.prev < o.finallyLoc) return r(o.finallyLoc);
                  }
                }
              }
            },
            abrupt: function (e, t) {
              for (var n = this.tryEntries.length - 1; n >= 0; --n) {
                var r = this.tryEntries[n];
                if (
                  r.tryLoc <= this.prev &&
                  a.call(r, "finallyLoc") &&
                  this.prev < r.finallyLoc
                ) {
                  var i = r;
                  break;
                }
              }
              i &&
                ("break" === e || "continue" === e) &&
                i.tryLoc <= t &&
                t <= i.finallyLoc &&
                (i = null);
              var o = i ? i.completion : {};
              return (
                (o.type = e),
                (o.arg = t),
                i
                  ? ((this.method = "next"), (this.next = i.finallyLoc), _)
                  : this.complete(o)
              );
            },
            complete: function (e, t) {
              if ("throw" === e.type) throw e.arg;
              return (
                "break" === e.type || "continue" === e.type
                  ? (this.next = e.arg)
                  : "return" === e.type
                  ? ((this.rval = this.arg = e.arg),
                    (this.method = "return"),
                    (this.next = "end"))
                  : "normal" === e.type && t && (this.next = t),
                _
              );
            },
            finish: function (e) {
              for (var t = this.tryEntries.length - 1; t >= 0; --t) {
                var n = this.tryEntries[t];
                if (n.finallyLoc === e)
                  return this.complete(n.completion, n.afterLoc), j(n), _;
              }
            },
            catch: function (e) {
              for (var t = this.tryEntries.length - 1; t >= 0; --t) {
                var n = this.tryEntries[t];
                if (n.tryLoc === e) {
                  var r = n.completion;
                  if ("throw" === r.type) {
                    var i = r.arg;
                    j(n);
                  }
                  return i;
                }
              }
              throw Error("illegal catch attempt");
            },
            delegateYield: function (e, n, r) {
              return (
                (this.delegate = { iterator: D(e), resultName: n, nextLoc: r }),
                "next" === this.method && (this.arg = t),
                _
              );
            },
          }),
          n
        );
      }
      (e.exports = i),
        (e.exports.__esModule = !0),
        (e.exports["default"] = e.exports);
    },
    "8c7f": function (e, t) {
      e.exports =
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAYAAAA6/NlyAAAJlklEQVRoQ91bfXBUVxU/52WTgNNtyUZtpeDXYBCdWj9GBAcr0LEUbAWdsh1tLCUf+86rtsVxdKxWnEKljo5jpbXvvt0kiIAj26pQKh9TLW0FqTitFmdsCx0tErCo2SBBPsLm/Zwbd3fevrzsR7IJS89fmey955zfPffce+455zGNEe3evTt08ODBDxHRHNd1301E05l5KoAwM4e1WAB9zNwH4AgRvWwYxktEtKepqem5efPmpcdCNa4k0+3bt9d3d3ff4LpuMxFdq8GNhL9eBCL6tWEYm6ZMmfL4okWLzo2ET9CcigBOJpOX9Pb2fhnACgCTKqWc5sPMJ5j5gYaGhu9Ho9FTo+U9KsDJZLIulUqZAO4hojePVpki8//JzPdFIhEnGo32j1TWiAErpW4movsBvKME4S4RvUpEh4ioN7NltQ/rLd9ARO8iorcTkVGMFzP/jYjuFpHNxcZWZEs7jlML4AEAtxcSyMz/IKJtzPxYQ0PDk9Fo9Eyh8clkcmJvb+98AJ8iohsBvKUI/4eZeYVpmufLAV6Whbu6ut7U39//KIBrAlePeYCIfgJAicgfmBnlKJMdC4CVUh9mZiGiWwHUDCPvmbq6uptaWlr+VaqckgF3dHR8IJ1ObwHw1mGEbyWir4vIX0oVXso4pdR7iGgNgMXDyP17KBRa0tbW9sdS+JUEWCl1NYA9RHSJnykza4BtIrKvFIEjHaOUmk1EHQD0AvjpFDPPEZEXivEvCnjdunVXnD17dj8RTQ0Au7W2tvbzra2t+t4cc+rs7AyfP39+wzDWPjJhwoSZy5cvf62g7xc7SFKp1FMAZnrHad8EcJ+IfGukfjrS1cn4973MfI/+26fX/kgkMrfQATmshTUzx3F+BiDqV84wjNtM01w/UqUrMc9xnGWu6/44YNdtNk3zs8MZYljASqkYACdAudWWZa2shNKj5WHb9ioi+mYAaFNE4oGHXNA/daiYSqVeAXC5b8s8YprmzeO9jYdbmMwu3AxgqU/P45FIZFpQKBpoYaXU6ky4mOPDzM9HIpE5xQKI0Vqt3Pk6YEmlUnsAfNAHWp8xQ63vF2Db9pXMfBDAG7y/hUKh2e3t7c+Wq9B4jE8kErPS6XTetcjMpwE0WZZ1NG8h/AoppboALPetVlJEdOxctaSU0ls774Bl5nUi0jIs4PXr1zeeOXPmGIC67CBm7q+rq5vR0tLy16pFS0RdXV3v7O/vf9Gv+8SJEycvW7asJ4fHC0IpdQeAtT7rPigid1Yz2KxuSqm1AO7w6X+niDwYCNi2be0Hs3zgPmJZlo60qp5s29YB0u99gPeJyEeHAHYc5zIAPd6XCTMfNU1zarVcQ8VWPHNNHQFwpcclB5i50TTN/+j/5a4lpdRiAFu8TA3DeMg0zbwtUkzohf5dKfUQgC/4rLxERPRrLg/wkLs3FApd297e/uSFBlGO/EQiMT+dTv/GBzh3J3st/AiAm7wDGxsbw5VInJWj8GjH6iixp6cn7/XGzI+KyGA05gV8AMBVnr3fLSJDnoSjVWg85iultB9P8WD5s4i8zw9Y37+5PBIz7xWROeOhYKVl2La9l4hyJzMRHbMsa/Agy1nYtm29DXIZDWbeKSILK63MePBTSu0AcL1H1inLsgaLAt4tnfZdSb8Ukc+Mh4KVlqGU+gWAT3uvJhEJ+QGf9JVGdlmW5V2lSus1Zvxs295JRAs8gPtE5FI/4G7fhZ0XoYyZdmPAWCn1OwA66TdIOoASkcFDzLul/wTgao/8nKOPgU5jytK2bf0knOwB/IKIvN8PeMjzKhwOX9bc3HxyTLWrMPONGzde2tfXNxhGegDnnrdeC98LIC9XxcwLRUT7w0VDSqnrAezwAV6lM6x+Cy8C8CvfwLiImBcNWiJSSjkAYj4cnxSR7XmAM4m7FIBaz1Y4bprmZGbW1b+qJwCG4zg6gMolH5n5fCQSiWRD5LwknlLqaX+hzDCMj5mmqcssVU+O4+j2it/6rPuMiHw8Z0Tvj0G5aGZOiEjeFqlW5EqpOIB2H+C8HHWehTNJgNcATPBMShuGcZVpmrrhpGopkUjMSKfTB4hoMKIa9Ffms8x8Rfbxn+fD2UFKqR/5i93MvE1EdKG6asm27W1EdIPPug+LSH4ywI9AF73PnTv3ChENhmJZMgxjvmmau6sRseM481zX9ScqTtbX10/zF8uHqzzcDWCND9yL4XB4VrUFIplAQxcIZvisq4vz9/sNFAhYly96enpeDqgJ72hsbLwxGo3q1oYLTslksqanp0dvZf8z9khjY+P0oLJQoephM4ANAajWWpZ11wVHS0S2bf+QiIJy5s2WZW0K0rFgB4Bt2wndzjBkWzCvEBEt7IKRUuou3U0UoECHZVl5V1PeVi+kcaZFaReAef5xOoXb1NT0pbHqiRxOr0wP5w9c1/1igCF2M/OCQq1MRXs8Ojo6Iul0+lkAunksj5j5KWZeaprmv8fD1I7jvBGAzq7ODdDlUCgUmtXW1pYqpEtRwHpyPB5vcl13H4BIgKBXDcO4PRaL5b1QKr0A8Xh84cDAgE1EbwvQIWUYxuxYLHawmNySAHtAbwWgW4GD6OlQKPS1SteQM7Xf7xBRLh7O80nmlwzDWFwKWD2vZMB6cObO06dfXkTjU2CLYRhq0qRJu0faBKqbVk+cOKGDCQGwpIDVHg+Hw7eUExuUBVgL1k+weDy+ynXdbxT0lf/3POvkwWM1NTVPtLe3Hy80PpFIXD4wMPAJItIhrH7EF+y1Ngzj27FYbGW5T9eyAWeVjsfjCwYGBr5LRIMZ/RKol4h0yJryddPqc2Fapqu2BDZ0oKam5quxWGyXbktkZgtAfSgUsktpPxwx4Ky1Hcf5HBGtKrGNuBRAgWMybcMrTdP8qbaq7lY4ffq0bkfW7cf6ZfRfZr7GNM3nR31KF9NS+1xvb6/2t694azrF5pXyOzN3M/P3GhoalPdMcBznOtd1d/nOj6O1tbUzW1tbjw3He1QW9jPV/t3R0TE3nU7fov3QmyotBZxnjFZ4ZygU2tTW1qbv+iEppozPHwrw9ecMw9CWPh0ks6KA/QL0/Z39qgXA9MxjJO+rFiLSh9sRZs591VLqFeM4zlIAOr3sx/FzXR4N6lwYU8BlWnVEw5VSusl0dcDkNZZlDblJLnrAGqhSSrcU60+H8oiZc60O2R9eF4D191KHDx/WGQ9vTVif3E+IyHV5B9uI9lEVTsp8j7EfgP46JkvrLcu67XUJWIPq7Oyc3t/fv4GZ30tEe+vr62/1d8j/Dx4iS3lJHSiGAAAAAElFTkSuQmCC";
    },
    9523: function (e, t, n) {
      var r = n("a395");
      function i(e, t, n) {
        return (
          (t = r(t)) in e
            ? Object.defineProperty(e, t, {
                value: n,
                enumerable: !0,
                configurable: !0,
                writable: !0,
              })
            : (e[t] = n),
          e
        );
      }
      (e.exports = i),
        (e.exports.__esModule = !0),
        (e.exports["default"] = e.exports);
    },
    "970b": function (e, t) {
      function n(e, t) {
        if (!(e instanceof t))
          throw new TypeError("Cannot call a class as a function");
      }
      (e.exports = n),
        (e.exports.__esModule = !0),
        (e.exports["default"] = e.exports);
    },
    "9b42": function (e, t) {
      function n(e, t) {
        var n =
          null == e
            ? null
            : ("undefined" != typeof Symbol && e[Symbol.iterator]) ||
              e["@@iterator"];
        if (null != n) {
          var r,
            i,
            o,
            a,
            s = [],
            c = !0,
            u = !1;
          try {
            if (((o = (n = n.call(e)).next), 0 === t)) {
              if (Object(n) !== n) return;
              c = !1;
            } else
              for (
                ;
                !(c = (r = o.call(n)).done) &&
                (s.push(r.value), s.length !== t);
                c = !0
              );
          } catch (e) {
            (u = !0), (i = e);
          } finally {
            try {
              if (
                !c &&
                null != n["return"] &&
                ((a = n["return"]()), Object(a) !== a)
              )
                return;
            } finally {
              if (u) throw i;
            }
          }
          return s;
        }
      }
      (e.exports = n),
        (e.exports.__esModule = !0),
        (e.exports["default"] = e.exports);
    },
    a128: function (e, t, n) {
      var r = n("36c6"),
        i = n("4a4b"),
        o = n("c5f7"),
        a = n("b17c");
      function s(t) {
        var n = "function" == typeof Map ? new Map() : void 0;
        return (
          (e.exports = s =
            function (e) {
              if (null === e || !o(e)) return e;
              if ("function" != typeof e)
                throw new TypeError(
                  "Super expression must either be null or a function"
                );
              if (void 0 !== n) {
                if (n.has(e)) return n.get(e);
                n.set(e, t);
              }
              function t() {
                return a(e, arguments, r(this).constructor);
              }
              return (
                (t.prototype = Object.create(e.prototype, {
                  constructor: {
                    value: t,
                    enumerable: !1,
                    writable: !0,
                    configurable: !0,
                  },
                })),
                i(t, e)
              );
            }),
          (e.exports.__esModule = !0),
          (e.exports["default"] = e.exports),
          s(t)
        );
      }
      (e.exports = s),
        (e.exports.__esModule = !0),
        (e.exports["default"] = e.exports);
    },
    a395: function (e, t, n) {
      var r = n("7037")["default"],
        i = n("e50d");
      function o(e) {
        var t = i(e, "string");
        return "symbol" == r(t) ? t : t + "";
      }
      (e.exports = o),
        (e.exports.__esModule = !0),
        (e.exports["default"] = e.exports);
    },
    a9ff: function (e, t, n) {
      "use strict";
      (function (e, r, i) {
        var o = n("4ea4");
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.default = void 0);
        var a = o(n("2eee")),
          s = o(n("3c96")),
          c = o(n("278c")),
          u = o(n("7037")),
          l = o(n("448a")),
          f = o(n("c973")),
          d = o(n("9523")),
          p = o(n("6b58")),
          h = o(n("36c6")),
          g = o(n("ed6d")),
          v = o(n("a128")),
          m = o(n("970b")),
          y = o(n("5bc3")),
          _ = o(n("ace3"));
        function b(e, t) {
          var n =
            ("undefined" != typeof Symbol && e[Symbol.iterator]) ||
            e["@@iterator"];
          if (!n) {
            if (
              Array.isArray(e) ||
              (n = w(e)) ||
              (t && e && "number" == typeof e.length)
            ) {
              n && (e = n);
              var r = 0,
                i = function () {};
              return {
                s: i,
                n: function () {
                  return r >= e.length
                    ? { done: !0 }
                    : { done: !1, value: e[r++] };
                },
                e: function (e) {
                  throw e;
                },
                f: i,
              };
            }
            throw new TypeError(
              "Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."
            );
          }
          var o,
            a = !0,
            s = !1;
          return {
            s: function () {
              n = n.call(e);
            },
            n: function () {
              var e = n.next();
              return (a = e.done), e;
            },
            e: function (e) {
              (s = !0), (o = e);
            },
            f: function () {
              try {
                a || null == n.return || n.return();
              } finally {
                if (s) throw o;
              }
            },
          };
        }
        function w(e, t) {
          if (e) {
            if ("string" == typeof e) return k(e, t);
            var n = {}.toString.call(e).slice(8, -1);
            return (
              "Object" === n && e.constructor && (n = e.constructor.name),
              "Map" === n || "Set" === n
                ? Array.from(e)
                : "Arguments" === n ||
                  /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)
                ? k(e, t)
                : void 0
            );
          }
        }
        function k(e, t) {
          (null == t || t > e.length) && (t = e.length);
          for (var n = 0, r = Array(t); n < t; n++) r[n] = e[n];
          return r;
        }
        function x(e, t) {
          var n = Object.keys(e);
          if (Object.getOwnPropertySymbols) {
            var r = Object.getOwnPropertySymbols(e);
            t &&
              (r = r.filter(function (t) {
                return Object.getOwnPropertyDescriptor(e, t).enumerable;
              })),
              n.push.apply(n, r);
          }
          return n;
        }
        function S(e) {
          for (var t = 1; t < arguments.length; t++) {
            var n = null != arguments[t] ? arguments[t] : {};
            t % 2
              ? x(Object(n), !0).forEach(function (t) {
                  (0, d.default)(e, t, n[t]);
                })
              : Object.getOwnPropertyDescriptors
              ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
              : x(Object(n)).forEach(function (t) {
                  Object.defineProperty(
                    e,
                    t,
                    Object.getOwnPropertyDescriptor(n, t)
                  );
                });
          }
          return e;
        }
        function A(e, t, n) {
          return (
            (t = (0, h.default)(t)),
            (0, p.default)(
              e,
              I()
                ? Reflect.construct(t, n || [], (0, h.default)(e).constructor)
                : t.apply(e, n)
            )
          );
        }
        function I() {
          try {
            var e = !Boolean.prototype.valueOf.call(
              Reflect.construct(Boolean, [], function () {})
            );
          } catch (e) {}
          return (I = function () {
            return !!e;
          })();
        }
        function O(e) {
          return e &&
            e.__esModule &&
            Object.prototype.hasOwnProperty.call(e, "default")
            ? e.default
            : e;
        }
        function P(e, t, n) {
          return (
            e(
              (n = {
                path: t,
                exports: {},
                require: function (e, t) {
                  return (function () {
                    throw new Error(
                      "Dynamic requires are not currently supported by @rollup/plugin-commonjs"
                    );
                  })(null == t && n.path);
                },
              }),
              n.exports
            ),
            n.exports
          );
        }
        "undefined" != typeof globalThis
          ? globalThis
          : "undefined" != typeof window
          ? window
          : "undefined" != typeof e || ("undefined" != typeof self && self);
        var T = P(function (e, t) {
            var n;
            e.exports =
              ((n =
                n ||
                (function (e, t) {
                  var n =
                      Object.create ||
                      (function () {
                        function e() {}
                        return function (t) {
                          var n;
                          return (
                            (e.prototype = t),
                            (n = new e()),
                            (e.prototype = null),
                            n
                          );
                        };
                      })(),
                    r = {},
                    i = (r.lib = {}),
                    o = (i.Base = {
                      extend: function (e) {
                        var t = n(this);
                        return (
                          e && t.mixIn(e),
                          (t.hasOwnProperty("init") && this.init !== t.init) ||
                            (t.init = function () {
                              t.$super.init.apply(this, arguments);
                            }),
                          (t.init.prototype = t),
                          (t.$super = this),
                          t
                        );
                      },
                      create: function () {
                        var e = this.extend();
                        return e.init.apply(e, arguments), e;
                      },
                      init: function () {},
                      mixIn: function (e) {
                        for (var t in e)
                          e.hasOwnProperty(t) && (this[t] = e[t]);
                        e.hasOwnProperty("toString") &&
                          (this.toString = e.toString);
                      },
                      clone: function () {
                        return this.init.prototype.extend(this);
                      },
                    }),
                    a = (i.WordArray = o.extend({
                      init: function (e, n) {
                        (e = this.words = e || []),
                          (this.sigBytes = n != t ? n : 4 * e.length);
                      },
                      toString: function (e) {
                        return (e || c).stringify(this);
                      },
                      concat: function (e) {
                        var t = this.words,
                          n = e.words,
                          r = this.sigBytes,
                          i = e.sigBytes;
                        if ((this.clamp(), r % 4))
                          for (var o = 0; o < i; o++) {
                            var a = (n[o >>> 2] >>> (24 - (o % 4) * 8)) & 255;
                            t[(r + o) >>> 2] |= a << (24 - ((r + o) % 4) * 8);
                          }
                        else
                          for (o = 0; o < i; o += 4)
                            t[(r + o) >>> 2] = n[o >>> 2];
                        return (this.sigBytes += i), this;
                      },
                      clamp: function () {
                        var t = this.words,
                          n = this.sigBytes;
                        (t[n >>> 2] &= 4294967295 << (32 - (n % 4) * 8)),
                          (t.length = e.ceil(n / 4));
                      },
                      clone: function () {
                        var e = o.clone.call(this);
                        return (e.words = this.words.slice(0)), e;
                      },
                      random: function (t) {
                        for (
                          var n,
                            r = [],
                            i = function (t) {
                              t = t;
                              var n = 987654321,
                                r = 4294967295;
                              return function () {
                                var i =
                                  (((n =
                                    (36969 * (65535 & n) + (n >> 16)) & r) <<
                                    16) +
                                    (t =
                                      (18e3 * (65535 & t) + (t >> 16)) & r)) &
                                  r;
                                return (
                                  (i /= 4294967296),
                                  (i += 0.5) * (e.random() > 0.5 ? 1 : -1)
                                );
                              };
                            },
                            o = 0;
                          o < t;
                          o += 4
                        ) {
                          var s = i(4294967296 * (n || e.random()));
                          (n = 987654071 * s()), r.push((4294967296 * s()) | 0);
                        }
                        return new a.init(r, t);
                      },
                    })),
                    s = (r.enc = {}),
                    c = (s.Hex = {
                      stringify: function (e) {
                        for (
                          var t = e.words, n = e.sigBytes, r = [], i = 0;
                          i < n;
                          i++
                        ) {
                          var o = (t[i >>> 2] >>> (24 - (i % 4) * 8)) & 255;
                          r.push((o >>> 4).toString(16)),
                            r.push((15 & o).toString(16));
                        }
                        return r.join("");
                      },
                      parse: function (e) {
                        for (var t = e.length, n = [], r = 0; r < t; r += 2)
                          n[r >>> 3] |=
                            parseInt(e.substr(r, 2), 16) << (24 - (r % 8) * 4);
                        return new a.init(n, t / 2);
                      },
                    }),
                    u = (s.Latin1 = {
                      stringify: function (e) {
                        for (
                          var t = e.words, n = e.sigBytes, r = [], i = 0;
                          i < n;
                          i++
                        ) {
                          var o = (t[i >>> 2] >>> (24 - (i % 4) * 8)) & 255;
                          r.push(String.fromCharCode(o));
                        }
                        return r.join("");
                      },
                      parse: function (e) {
                        for (var t = e.length, n = [], r = 0; r < t; r++)
                          n[r >>> 2] |=
                            (255 & e.charCodeAt(r)) << (24 - (r % 4) * 8);
                        return new a.init(n, t);
                      },
                    }),
                    l = (s.Utf8 = {
                      stringify: function (e) {
                        try {
                          return decodeURIComponent(escape(u.stringify(e)));
                        } catch (e) {
                          throw new Error("Malformed UTF-8 data");
                        }
                      },
                      parse: function (e) {
                        return u.parse(unescape(encodeURIComponent(e)));
                      },
                    }),
                    f = (i.BufferedBlockAlgorithm = o.extend({
                      reset: function () {
                        (this._data = new a.init()), (this._nDataBytes = 0);
                      },
                      _append: function (e) {
                        "string" == typeof e && (e = l.parse(e)),
                          this._data.concat(e),
                          (this._nDataBytes += e.sigBytes);
                      },
                      _process: function (t) {
                        var n = this._data,
                          r = n.words,
                          i = n.sigBytes,
                          o = this.blockSize,
                          s = i / (4 * o),
                          c =
                            (s = t
                              ? e.ceil(s)
                              : e.max((0 | s) - this._minBufferSize, 0)) * o,
                          u = e.min(4 * c, i);
                        if (c) {
                          for (var l = 0; l < c; l += o)
                            this._doProcessBlock(r, l);
                          var f = r.splice(0, c);
                          n.sigBytes -= u;
                        }
                        return new a.init(f, u);
                      },
                      clone: function () {
                        var e = o.clone.call(this);
                        return (e._data = this._data.clone()), e;
                      },
                      _minBufferSize: 0,
                    }));
                  i.Hasher = f.extend({
                    cfg: o.extend(),
                    init: function (e) {
                      (this.cfg = this.cfg.extend(e)), this.reset();
                    },
                    reset: function () {
                      f.reset.call(this), this._doReset();
                    },
                    update: function (e) {
                      return this._append(e), this._process(), this;
                    },
                    finalize: function (e) {
                      return e && this._append(e), this._doFinalize();
                    },
                    blockSize: 16,
                    _createHelper: function (e) {
                      return function (t, n) {
                        return new e.init(n).finalize(t);
                      };
                    },
                    _createHmacHelper: function (e) {
                      return function (t, n) {
                        return new d.HMAC.init(e, n).finalize(t);
                      };
                    },
                  });
                  var d = (r.algo = {});
                  return r;
                })(Math)),
              n);
          }),
          C = T,
          E =
            (P(function (e, t) {
              var n;
              e.exports =
                ((n = C),
                (function (e) {
                  var t = n,
                    r = t.lib,
                    i = r.WordArray,
                    o = r.Hasher,
                    a = t.algo,
                    s = [];
                  !(function () {
                    for (var t = 0; t < 64; t++)
                      s[t] = (4294967296 * e.abs(e.sin(t + 1))) | 0;
                  })();
                  var c = (a.MD5 = o.extend({
                    _doReset: function () {
                      this._hash = new i.init([
                        1732584193, 4023233417, 2562383102, 271733878,
                      ]);
                    },
                    _doProcessBlock: function (e, t) {
                      for (var n = 0; n < 16; n++) {
                        var r = t + n,
                          i = e[r];
                        e[r] =
                          (16711935 & ((i << 8) | (i >>> 24))) |
                          (4278255360 & ((i << 24) | (i >>> 8)));
                      }
                      var o = this._hash.words,
                        a = e[t + 0],
                        c = e[t + 1],
                        p = e[t + 2],
                        h = e[t + 3],
                        g = e[t + 4],
                        v = e[t + 5],
                        m = e[t + 6],
                        y = e[t + 7],
                        _ = e[t + 8],
                        b = e[t + 9],
                        w = e[t + 10],
                        k = e[t + 11],
                        x = e[t + 12],
                        S = e[t + 13],
                        A = e[t + 14],
                        I = e[t + 15],
                        O = o[0],
                        P = o[1],
                        T = o[2],
                        C = o[3];
                      (O = u(O, P, T, C, a, 7, s[0])),
                        (C = u(C, O, P, T, c, 12, s[1])),
                        (T = u(T, C, O, P, p, 17, s[2])),
                        (P = u(P, T, C, O, h, 22, s[3])),
                        (O = u(O, P, T, C, g, 7, s[4])),
                        (C = u(C, O, P, T, v, 12, s[5])),
                        (T = u(T, C, O, P, m, 17, s[6])),
                        (P = u(P, T, C, O, y, 22, s[7])),
                        (O = u(O, P, T, C, _, 7, s[8])),
                        (C = u(C, O, P, T, b, 12, s[9])),
                        (T = u(T, C, O, P, w, 17, s[10])),
                        (P = u(P, T, C, O, k, 22, s[11])),
                        (O = u(O, P, T, C, x, 7, s[12])),
                        (C = u(C, O, P, T, S, 12, s[13])),
                        (T = u(T, C, O, P, A, 17, s[14])),
                        (O = l(
                          O,
                          (P = u(P, T, C, O, I, 22, s[15])),
                          T,
                          C,
                          c,
                          5,
                          s[16]
                        )),
                        (C = l(C, O, P, T, m, 9, s[17])),
                        (T = l(T, C, O, P, k, 14, s[18])),
                        (P = l(P, T, C, O, a, 20, s[19])),
                        (O = l(O, P, T, C, v, 5, s[20])),
                        (C = l(C, O, P, T, w, 9, s[21])),
                        (T = l(T, C, O, P, I, 14, s[22])),
                        (P = l(P, T, C, O, g, 20, s[23])),
                        (O = l(O, P, T, C, b, 5, s[24])),
                        (C = l(C, O, P, T, A, 9, s[25])),
                        (T = l(T, C, O, P, h, 14, s[26])),
                        (P = l(P, T, C, O, _, 20, s[27])),
                        (O = l(O, P, T, C, S, 5, s[28])),
                        (C = l(C, O, P, T, p, 9, s[29])),
                        (T = l(T, C, O, P, y, 14, s[30])),
                        (O = f(
                          O,
                          (P = l(P, T, C, O, x, 20, s[31])),
                          T,
                          C,
                          v,
                          4,
                          s[32]
                        )),
                        (C = f(C, O, P, T, _, 11, s[33])),
                        (T = f(T, C, O, P, k, 16, s[34])),
                        (P = f(P, T, C, O, A, 23, s[35])),
                        (O = f(O, P, T, C, c, 4, s[36])),
                        (C = f(C, O, P, T, g, 11, s[37])),
                        (T = f(T, C, O, P, y, 16, s[38])),
                        (P = f(P, T, C, O, w, 23, s[39])),
                        (O = f(O, P, T, C, S, 4, s[40])),
                        (C = f(C, O, P, T, a, 11, s[41])),
                        (T = f(T, C, O, P, h, 16, s[42])),
                        (P = f(P, T, C, O, m, 23, s[43])),
                        (O = f(O, P, T, C, b, 4, s[44])),
                        (C = f(C, O, P, T, x, 11, s[45])),
                        (T = f(T, C, O, P, I, 16, s[46])),
                        (O = d(
                          O,
                          (P = f(P, T, C, O, p, 23, s[47])),
                          T,
                          C,
                          a,
                          6,
                          s[48]
                        )),
                        (C = d(C, O, P, T, y, 10, s[49])),
                        (T = d(T, C, O, P, A, 15, s[50])),
                        (P = d(P, T, C, O, v, 21, s[51])),
                        (O = d(O, P, T, C, x, 6, s[52])),
                        (C = d(C, O, P, T, h, 10, s[53])),
                        (T = d(T, C, O, P, w, 15, s[54])),
                        (P = d(P, T, C, O, c, 21, s[55])),
                        (O = d(O, P, T, C, _, 6, s[56])),
                        (C = d(C, O, P, T, I, 10, s[57])),
                        (T = d(T, C, O, P, m, 15, s[58])),
                        (P = d(P, T, C, O, S, 21, s[59])),
                        (O = d(O, P, T, C, g, 6, s[60])),
                        (C = d(C, O, P, T, k, 10, s[61])),
                        (T = d(T, C, O, P, p, 15, s[62])),
                        (P = d(P, T, C, O, b, 21, s[63])),
                        (o[0] = (o[0] + O) | 0),
                        (o[1] = (o[1] + P) | 0),
                        (o[2] = (o[2] + T) | 0),
                        (o[3] = (o[3] + C) | 0);
                    },
                    _doFinalize: function () {
                      var t = this._data,
                        n = t.words,
                        r = 8 * this._nDataBytes,
                        i = 8 * t.sigBytes;
                      n[i >>> 5] |= 128 << (24 - (i % 32));
                      var o = e.floor(r / 4294967296),
                        a = r;
                      (n[15 + (((i + 64) >>> 9) << 4)] =
                        (16711935 & ((o << 8) | (o >>> 24))) |
                        (4278255360 & ((o << 24) | (o >>> 8)))),
                        (n[14 + (((i + 64) >>> 9) << 4)] =
                          (16711935 & ((a << 8) | (a >>> 24))) |
                          (4278255360 & ((a << 24) | (a >>> 8)))),
                        (t.sigBytes = 4 * (n.length + 1)),
                        this._process();
                      for (var s = this._hash, c = s.words, u = 0; u < 4; u++) {
                        var l = c[u];
                        c[u] =
                          (16711935 & ((l << 8) | (l >>> 24))) |
                          (4278255360 & ((l << 24) | (l >>> 8)));
                      }
                      return s;
                    },
                    clone: function () {
                      var e = o.clone.call(this);
                      return (e._hash = this._hash.clone()), e;
                    },
                  }));
                  function u(e, t, n, r, i, o, a) {
                    var s = e + ((t & n) | (~t & r)) + i + a;
                    return ((s << o) | (s >>> (32 - o))) + t;
                  }
                  function l(e, t, n, r, i, o, a) {
                    var s = e + ((t & r) | (n & ~r)) + i + a;
                    return ((s << o) | (s >>> (32 - o))) + t;
                  }
                  function f(e, t, n, r, i, o, a) {
                    var s = e + (t ^ n ^ r) + i + a;
                    return ((s << o) | (s >>> (32 - o))) + t;
                  }
                  function d(e, t, n, r, i, o, a) {
                    var s = e + (n ^ (t | ~r)) + i + a;
                    return ((s << o) | (s >>> (32 - o))) + t;
                  }
                  (t.MD5 = o._createHelper(c)),
                    (t.HmacMD5 = o._createHmacHelper(c));
                })(Math),
                n.MD5);
            }),
            P(function (e, t) {
              var n;
              e.exports =
                ((n = C),
                void (function () {
                  var e = n,
                    t = e.lib.Base,
                    r = e.enc.Utf8;
                  e.algo.HMAC = t.extend({
                    init: function (e, t) {
                      (e = this._hasher = new e.init()),
                        "string" == typeof t && (t = r.parse(t));
                      var n = e.blockSize,
                        i = 4 * n;
                      t.sigBytes > i && (t = e.finalize(t)), t.clamp();
                      for (
                        var o = (this._oKey = t.clone()),
                          a = (this._iKey = t.clone()),
                          s = o.words,
                          c = a.words,
                          u = 0;
                        u < n;
                        u++
                      )
                        (s[u] ^= 1549556828), (c[u] ^= 909522486);
                      (o.sigBytes = a.sigBytes = i), this.reset();
                    },
                    reset: function () {
                      var e = this._hasher;
                      e.reset(), e.update(this._iKey);
                    },
                    update: function (e) {
                      return this._hasher.update(e), this;
                    },
                    finalize: function (e) {
                      var t = this._hasher,
                        n = t.finalize(e);
                      return (
                        t.reset(), t.finalize(this._oKey.clone().concat(n))
                      );
                    },
                  });
                })());
            }),
            P(function (e, t) {
              e.exports = C.HmacMD5;
            })),
          j = P(function (e, t) {
            e.exports = C.enc.Utf8;
          }),
          L = P(function (e, t) {
            var n;
            e.exports =
              ((n = C),
              (function () {
                var e = n,
                  t = e.lib.WordArray;
                function r(e, n, r) {
                  for (var i = [], o = 0, a = 0; a < n; a++)
                    if (a % 4) {
                      var s = r[e.charCodeAt(a - 1)] << ((a % 4) * 2),
                        c = r[e.charCodeAt(a)] >>> (6 - (a % 4) * 2);
                      (i[o >>> 2] |= (s | c) << (24 - (o % 4) * 8)), o++;
                    }
                  return t.create(i, o);
                }
                e.enc.Base64 = {
                  stringify: function (e) {
                    var t = e.words,
                      n = e.sigBytes,
                      r = this._map;
                    e.clamp();
                    for (var i = [], o = 0; o < n; o += 3)
                      for (
                        var a =
                            (((t[o >>> 2] >>> (24 - (o % 4) * 8)) & 255) <<
                              16) |
                            (((t[(o + 1) >>> 2] >>> (24 - ((o + 1) % 4) * 8)) &
                              255) <<
                              8) |
                            ((t[(o + 2) >>> 2] >>> (24 - ((o + 2) % 4) * 8)) &
                              255),
                          s = 0;
                        s < 4 && o + 0.75 * s < n;
                        s++
                      )
                        i.push(r.charAt((a >>> (6 * (3 - s))) & 63));
                    var c = r.charAt(64);
                    if (c) for (; i.length % 4; ) i.push(c);
                    return i.join("");
                  },
                  parse: function (e) {
                    var t = e.length,
                      n = this._map,
                      i = this._reverseMap;
                    if (!i) {
                      i = this._reverseMap = [];
                      for (var o = 0; o < n.length; o++) i[n.charCodeAt(o)] = o;
                    }
                    var a = n.charAt(64);
                    if (a) {
                      var s = e.indexOf(a);
                      -1 !== s && (t = s);
                    }
                    return r(e, t, i);
                  },
                  _map: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
                };
              })(),
              n.enc.Base64);
          }),
          D = "FUNCTION",
          M = "OBJECT",
          N = "CLIENT_DB",
          U = "pending",
          R = "fulfilled",
          $ = "rejected";
        function F(e) {
          return Object.prototype.toString.call(e).slice(8, -1).toLowerCase();
        }
        function B(e) {
          return "object" === F(e);
        }
        function q(e) {
          return "function" == typeof e;
        }
        function K(e) {
          return function () {
            try {
              return e.apply(e, arguments);
            } catch (e) {
              console.error(e);
            }
          };
        }
        var z = "REJECTED",
          V = "NOT_PENDING",
          H = (function () {
            function e() {
              var t =
                  arguments.length > 0 && void 0 !== arguments[0]
                    ? arguments[0]
                    : {},
                n = t.createPromise,
                r = t.retryRule,
                i = void 0 === r ? z : r;
              (0, m.default)(this, e),
                (this.createPromise = n),
                (this.status = null),
                (this.promise = null),
                (this.retryRule = i);
            }
            return (0, y.default)(e, [
              {
                key: "needRetry",
                get: function () {
                  if (!this.status) return !0;
                  switch (this.retryRule) {
                    case z:
                      return this.status === $;
                    case V:
                      return this.status !== U;
                  }
                },
              },
              {
                key: "exec",
                value: function () {
                  var e = this;
                  return this.needRetry
                    ? ((this.status = U),
                      (this.promise = this.createPromise().then(
                        function (t) {
                          return (e.status = R), Promise.resolve(t);
                        },
                        function (t) {
                          return (e.status = $), Promise.reject(t);
                        }
                      )),
                      this.promise)
                    : this.promise;
                },
              },
            ]);
          })();
        function W(e) {
          return e && "string" == typeof e ? JSON.parse(e) : e;
        }
        var J = !1,
          G = "mp-weixin",
          Y = !1,
          Z = W([]),
          X = "h5" === G ? "web" : "app-plus" === G ? "app" : G,
          Q = W(void 0),
          ee = W(void 0) || [],
          te = !1;
        try {
          (n("ecd6").default || n("ecd6")).appid;
        } catch (Si) {}
        var ne = {};
        function re(e) {
          var t,
            n,
            r =
              arguments.length > 1 && void 0 !== arguments[1]
                ? arguments[1]
                : {};
          return (
            (t = ne),
            (n = e),
            Object.prototype.hasOwnProperty.call(t, n) || (ne[e] = r),
            ne[e]
          );
        }
        "app" === X &&
          (ne = r._globalUniCloudObj
            ? r._globalUniCloudObj
            : (r._globalUniCloudObj = {}));
        var ie = ["invoke", "success", "fail", "complete"],
          oe = re("_globalUniCloudInterceptor");
        function ae(e, t) {
          oe[e] || (oe[e] = {}),
            B(t) &&
              Object.keys(t).forEach(function (n) {
                ie.indexOf(n) > -1 &&
                  (function (e, t, n) {
                    var r = oe[e][t];
                    r || (r = oe[e][t] = []),
                      -1 === r.indexOf(n) && q(n) && r.push(n);
                  })(e, n, t[n]);
              });
        }
        function se(e, t) {
          oe[e] || (oe[e] = {}),
            B(t)
              ? Object.keys(t).forEach(function (n) {
                  ie.indexOf(n) > -1 &&
                    (function (e, t, n) {
                      var r = oe[e][t];
                      if (r) {
                        var i = r.indexOf(n);
                        i > -1 && r.splice(i, 1);
                      }
                    })(e, n, t[n]);
                })
              : delete oe[e];
        }
        function ce(e, t) {
          return e && 0 !== e.length
            ? e.reduce(function (e, n) {
                return e.then(function () {
                  return n(t);
                });
              }, Promise.resolve())
            : Promise.resolve();
        }
        function ue(e, t) {
          return (oe[e] && oe[e][t]) || [];
        }
        function le(e) {
          ae("callObject", e);
        }
        var fe = re("_globalUniCloudListener"),
          de = "response",
          pe = "needLogin",
          he = "refreshToken",
          ge = "clientdb",
          ve = "cloudfunction",
          me = "cloudobject";
        function ye(e) {
          return fe[e] || (fe[e] = []), fe[e];
        }
        function _e(e, t) {
          var n = ye(e);
          n.includes(t) || n.push(t);
        }
        function be(e, t) {
          var n = ye(e),
            r = n.indexOf(t);
          -1 !== r && n.splice(r, 1);
        }
        function we(e, t) {
          for (var n = ye(e), r = 0; r < n.length; r++) (0, n[r])(t);
        }
        var ke,
          xe = !1;
        function Se() {
          return (
            ke ||
            ((ke = new Promise(function (e) {
              xe && e(),
                (function t() {
                  if ("function" == typeof getCurrentPages) {
                    var n = getCurrentPages();
                    n && n[0] && ((xe = !0), e());
                  }
                  xe ||
                    setTimeout(function () {
                      t();
                    }, 30);
                })();
            })),
            ke)
          );
        }
        function Ae(e) {
          var t = {};
          for (var n in e) {
            var r = e[n];
            q(r) && (t[n] = K(r));
          }
          return t;
        }
        var Ie,
          Oe,
          Pe = (function (e) {
            function t(e) {
              var n;
              return (
                (0, m.default)(this, t),
                (n = A(this, t, [e.message])),
                (n.errMsg = e.message || e.errMsg || "unknown system error"),
                (n.code = n.errCode = e.code || e.errCode || "SYSTEM_ERROR"),
                (n.errSubject = n.subject = e.subject || e.errSubject),
                (n.cause = e.cause),
                (n.requestId = e.requestId),
                n
              );
            }
            return (
              (0, g.default)(t, e),
              (0, y.default)(t, [
                {
                  key: "toJson",
                  value: function () {
                    var e =
                      arguments.length > 0 && void 0 !== arguments[0]
                        ? arguments[0]
                        : 0;
                    if (!(e >= 10))
                      return (
                        e++,
                        {
                          errCode: this.errCode,
                          errMsg: this.errMsg,
                          errSubject: this.errSubject,
                          cause:
                            this.cause && this.cause.toJson
                              ? this.cause.toJson(e)
                              : this.cause,
                        }
                      );
                  },
                },
              ])
            );
          })((0, v.default)(Error)),
          Te = {
            request: function (e) {
              return r.request(e);
            },
            uploadFile: function (e) {
              return r.uploadFile(e);
            },
            setStorageSync: function (e, t) {
              return r.setStorageSync(e, t);
            },
            getStorageSync: function (e) {
              return r.getStorageSync(e);
            },
            removeStorageSync: function (e) {
              return r.removeStorageSync(e);
            },
            clearStorageSync: function () {
              return r.clearStorageSync();
            },
            connectSocket: function (e) {
              return r.connectSocket(e);
            },
          };
        function Ce() {
          return {
            token:
              Te.getStorageSync("uni_id_token") ||
              Te.getStorageSync("uniIdToken"),
            tokenExpired: Te.getStorageSync("uni_id_token_expired"),
          };
        }
        function Ee() {
          var e =
              arguments.length > 0 && void 0 !== arguments[0]
                ? arguments[0]
                : {},
            t = e.token,
            n = e.tokenExpired;
          t && Te.setStorageSync("uni_id_token", t),
            n && Te.setStorageSync("uni_id_token_expired", n);
        }
        function je() {
          return Ie || (Ie = r.getSystemInfoSync()), Ie;
        }
        function Le() {
          var e, t;
          try {
            if (r.getLaunchOptionsSync) {
              if (
                r.getLaunchOptionsSync
                  .toString()
                  .indexOf("not yet implemented") > -1
              )
                return;
              var n = r.getLaunchOptionsSync(),
                i = n.scene,
                o = n.channel;
              (e = o), (t = i);
            }
          } catch (e) {}
          return { channel: e, scene: t };
        }
        var De = {};
        function Me() {
          var e = (r.getLocale && r.getLocale()) || "en";
          if (Oe) return S(S(S({}, De), Oe), {}, { locale: e, LOCALE: e });
          var t = je(),
            n = t.deviceId,
            i = t.osName,
            o = t.uniPlatform,
            a = t.appId,
            s = [
              "appId",
              "appLanguage",
              "appName",
              "appVersion",
              "appVersionCode",
              "appWgtVersion",
              "browserName",
              "browserVersion",
              "deviceBrand",
              "deviceId",
              "deviceModel",
              "deviceType",
              "osName",
              "osVersion",
              "romName",
              "romVersion",
              "ua",
              "hostName",
              "hostVersion",
              "uniPlatform",
              "uniRuntimeVersion",
              "uniRuntimeVersionCode",
              "uniCompilerVersion",
              "uniCompilerVersionCode",
            ];
          for (var c in t)
            Object.hasOwnProperty.call(t, c) &&
              -1 === s.indexOf(c) &&
              delete t[c];
          return (
            (Oe = S(S({ PLATFORM: o, OS: i, APPID: a, DEVICEID: n }, Le()), t)),
            S(S(S({}, De), Oe), {}, { locale: e, LOCALE: e })
          );
        }
        var Ne,
          Ue = {
            sign: function (e, t) {
              var n = "";
              return (
                Object.keys(e)
                  .sort()
                  .forEach(function (t) {
                    e[t] && (n = n + "&" + t + "=" + e[t]);
                  }),
                (n = n.slice(1)),
                E(n, t).toString()
              );
            },
            wrappedRequest: function (e, t) {
              return new Promise(function (n, r) {
                t(
                  Object.assign(e, {
                    complete: function (e) {
                      e || (e = {}),
                        J &&
                          "web" === X &&
                          e.errMsg &&
                          0 === e.errMsg.indexOf("request:fail") &&
                          console.warn(
                            "发布H5，需要在uniCloud后台操作，绑定安全域名，否则会因为跨域问题而无法访问。教程参考：https://uniapp.dcloud.io/uniCloud/quickstart?id=useinh5"
                          );
                      var t =
                        (e.data &&
                          e.data.header &&
                          e.data.header["x-serverless-request-id"]) ||
                        (e.header && e.header["request-id"]);
                      if (!e.statusCode || e.statusCode >= 400) {
                        var i =
                            (e.data && e.data.error && e.data.error.code) ||
                            "SYS_ERR",
                          o =
                            (e.data && e.data.error && e.data.error.message) ||
                            e.errMsg ||
                            "request:fail";
                        return r(new Pe({ code: i, message: o, requestId: t }));
                      }
                      var a = e.data;
                      if (a.error)
                        return r(
                          new Pe({
                            code: a.error.code,
                            message: a.error.message,
                            requestId: t,
                          })
                        );
                      (a.result = a.data),
                        (a.requestId = t),
                        delete a.data,
                        n(a);
                    },
                  })
                );
              });
            },
            toBase64: function (e) {
              return L.stringify(j.parse(e));
            },
          },
          Re = (function () {
            function e(t) {
              var n = this;
              (0, m.default)(this, e),
                ["spaceId", "clientSecret"].forEach(function (e) {
                  if (!Object.prototype.hasOwnProperty.call(t, e))
                    throw new Error("".concat(e, " required"));
                }),
                (this.config = Object.assign(
                  {},
                  {
                    endpoint:
                      0 === t.spaceId.indexOf("mp-")
                        ? "https://api.next.bspapp.com"
                        : "https://api.bspapp.com",
                  },
                  t
                )),
                (this.config.provider = "aliyun"),
                (this.config.requestUrl = this.config.endpoint + "/client"),
                (this.config.envType = this.config.envType || "public"),
                (this.config.accessTokenKey =
                  "access_token_" + this.config.spaceId),
                (this.adapter = Te),
                (this._getAccessTokenPromiseHub = new H({
                  createPromise: function () {
                    return n
                      .requestAuth(
                        n.setupRequest(
                          {
                            method: "serverless.auth.user.anonymousAuthorize",
                            params: "{}",
                          },
                          "auth"
                        )
                      )
                      .then(function (e) {
                        if (!e.result || !e.result.accessToken)
                          throw new Pe({
                            code: "AUTH_FAILED",
                            message: "获取accessToken失败",
                          });
                        n.setAccessToken(e.result.accessToken);
                      });
                  },
                  retryRule: V,
                }));
            }
            return (0, y.default)(e, [
              {
                key: "hasAccessToken",
                get: function () {
                  return !!this.accessToken;
                },
              },
              {
                key: "setAccessToken",
                value: function (e) {
                  this.accessToken = e;
                },
              },
              {
                key: "requestWrapped",
                value: function (e) {
                  return Ue.wrappedRequest(e, this.adapter.request);
                },
              },
              {
                key: "requestAuth",
                value: function (e) {
                  return this.requestWrapped(e);
                },
              },
              {
                key: "request",
                value: function (e, t) {
                  var n = this;
                  return Promise.resolve().then(function () {
                    return n.hasAccessToken
                      ? t
                        ? n.requestWrapped(e)
                        : n.requestWrapped(e).catch(function (t) {
                            return new Promise(function (e, n) {
                              !t ||
                              ("GATEWAY_INVALID_TOKEN" !== t.code &&
                                "InvalidParameter.InvalidToken" !== t.code)
                                ? n(t)
                                : e();
                            })
                              .then(function () {
                                return n.getAccessToken();
                              })
                              .then(function () {
                                var t = n.rebuildRequest(e);
                                return n.request(t, !0);
                              });
                          })
                      : n.getAccessToken().then(function () {
                          var t = n.rebuildRequest(e);
                          return n.request(t, !0);
                        });
                  });
                },
              },
              {
                key: "rebuildRequest",
                value: function (e) {
                  var t = Object.assign({}, e);
                  return (
                    (t.data.token = this.accessToken),
                    (t.header["x-basement-token"] = this.accessToken),
                    (t.header["x-serverless-sign"] = Ue.sign(
                      t.data,
                      this.config.clientSecret
                    )),
                    t
                  );
                },
              },
              {
                key: "setupRequest",
                value: function (e, t) {
                  var n = Object.assign({}, e, {
                      spaceId: this.config.spaceId,
                      timestamp: Date.now(),
                    }),
                    r = { "Content-Type": "application/json" };
                  return (
                    "auth" !== t &&
                      ((n.token = this.accessToken),
                      (r["x-basement-token"] = this.accessToken)),
                    (r["x-serverless-sign"] = Ue.sign(
                      n,
                      this.config.clientSecret
                    )),
                    {
                      url: this.config.requestUrl,
                      method: "POST",
                      data: n,
                      dataType: "json",
                      header: r,
                    }
                  );
                },
              },
              {
                key: "getAccessToken",
                value: function () {
                  return this._getAccessTokenPromiseHub.exec();
                },
              },
              {
                key: "authorize",
                value: (function () {
                  var e = (0, f.default)(
                    a.default.mark(function e() {
                      return a.default.wrap(
                        function (e) {
                          while (1)
                            switch ((e.prev = e.next)) {
                              case 0:
                                return (e.next = 2), this.getAccessToken();
                              case 2:
                              case "end":
                                return e.stop();
                            }
                        },
                        e,
                        this
                      );
                    })
                  );
                  function t() {
                    return e.apply(this, arguments);
                  }
                  return t;
                })(),
              },
              {
                key: "callFunction",
                value: function (e) {
                  var t = {
                    method: "serverless.function.runtime.invoke",
                    params: JSON.stringify({
                      functionTarget: e.name,
                      functionArgs: e.data || {},
                    }),
                  };
                  return this.request(this.setupRequest(t));
                },
              },
              {
                key: "getOSSUploadOptionsFromPath",
                value: function (e) {
                  var t = {
                    method: "serverless.file.resource.generateProximalSign",
                    params: JSON.stringify(e),
                  };
                  return this.request(this.setupRequest(t));
                },
              },
              {
                key: "uploadFileToOSS",
                value: function (e) {
                  var t = this,
                    n = e.url,
                    r = e.formData,
                    i = e.name,
                    o = e.filePath,
                    a = e.fileType,
                    s = e.onUploadProgress;
                  return new Promise(function (e, c) {
                    var u = t.adapter.uploadFile({
                      url: n,
                      formData: r,
                      name: i,
                      filePath: o,
                      fileType: a,
                      header: { "X-OSS-server-side-encrpytion": "AES256" },
                      success: function (t) {
                        t && t.statusCode < 400
                          ? e(t)
                          : c(
                              new Pe({
                                code: "UPLOAD_FAILED",
                                message: "文件上传失败",
                              })
                            );
                      },
                      fail: function (e) {
                        c(
                          new Pe({
                            code: e.code || "UPLOAD_FAILED",
                            message: e.message || e.errMsg || "文件上传失败",
                          })
                        );
                      },
                    });
                    "function" == typeof s &&
                      u &&
                      "function" == typeof u.onProgressUpdate &&
                      u.onProgressUpdate(function (e) {
                        s({
                          loaded: e.totalBytesSent,
                          total: e.totalBytesExpectedToSend,
                        });
                      });
                  });
                },
              },
              {
                key: "reportOSSUpload",
                value: function (e) {
                  var t = {
                    method: "serverless.file.resource.report",
                    params: JSON.stringify(e),
                  };
                  return this.request(this.setupRequest(t));
                },
              },
              {
                key: "uploadFile",
                value: (function () {
                  var e = (0, f.default)(
                    a.default.mark(function e(t) {
                      var n,
                        r,
                        i,
                        o,
                        s,
                        c,
                        u,
                        l,
                        f,
                        d,
                        p,
                        h,
                        g,
                        v,
                        m,
                        y,
                        _,
                        b,
                        w,
                        k,
                        x,
                        S;
                      return a.default.wrap(
                        function (e) {
                          while (1)
                            switch ((e.prev = e.next)) {
                              case 0:
                                if (
                                  ((n = t.filePath),
                                  (r = t.cloudPath),
                                  (i = t.fileType),
                                  (o = void 0 === i ? "image" : i),
                                  (s = t.cloudPathAsRealPath),
                                  (c = void 0 !== s && s),
                                  (u = t.onUploadProgress),
                                  (l = t.config),
                                  "string" === F(r))
                                ) {
                                  e.next = 3;
                                  break;
                                }
                                throw new Pe({
                                  code: "INVALID_PARAM",
                                  message: "cloudPath必须为字符串类型",
                                });
                              case 3:
                                if ((r = r.trim())) {
                                  e.next = 5;
                                  break;
                                }
                                throw new Pe({
                                  code: "INVALID_PARAM",
                                  message: "cloudPath不可为空",
                                });
                              case 5:
                                if (!/:\/\//.test(r)) {
                                  e.next = 7;
                                  break;
                                }
                                throw new Pe({
                                  code: "INVALID_PARAM",
                                  message: "cloudPath不合法",
                                });
                              case 7:
                                if (
                                  ((f =
                                    (l && l.envType) || this.config.envType),
                                  !(
                                    c &&
                                    ("/" !== r[0] && (r = "/" + r),
                                    r.indexOf("\\") > -1)
                                  ))
                                ) {
                                  e.next = 10;
                                  break;
                                }
                                throw new Pe({
                                  code: "INVALID_PARAM",
                                  message:
                                    "使用cloudPath作为路径时，cloudPath不可包含“\\”",
                                });
                              case 10:
                                return (
                                  (e.next = 12),
                                  this.getOSSUploadOptionsFromPath({
                                    env: f,
                                    filename: c ? r.split("/").pop() : r,
                                    fileId: c ? r : void 0,
                                  })
                                );
                              case 12:
                                return (
                                  (d = e.sent.result),
                                  (p =
                                    "https://" + d.cdnDomain + "/" + d.ossPath),
                                  (h = d.securityToken),
                                  (g = d.accessKeyId),
                                  (v = d.signature),
                                  (m = d.host),
                                  (y = d.ossPath),
                                  (_ = d.id),
                                  (b = d.policy),
                                  (w = d.ossCallbackUrl),
                                  (k = {
                                    "Cache-Control": "max-age=2592000",
                                    "Content-Disposition": "attachment",
                                    OSSAccessKeyId: g,
                                    Signature: v,
                                    host: m,
                                    id: _,
                                    key: y,
                                    policy: b,
                                    success_action_status: 200,
                                  }),
                                  h && (k["x-oss-security-token"] = h),
                                  w &&
                                    ((x = JSON.stringify({
                                      callbackUrl: w,
                                      callbackBody: JSON.stringify({
                                        fileId: _,
                                        spaceId: this.config.spaceId,
                                      }),
                                      callbackBodyType: "application/json",
                                    })),
                                    (k.callback = Ue.toBase64(x))),
                                  (S = {
                                    url: "https://" + d.host,
                                    formData: k,
                                    fileName: "file",
                                    name: "file",
                                    filePath: n,
                                    fileType: o,
                                  }),
                                  (e.next = 27),
                                  this.uploadFileToOSS(
                                    Object.assign({}, S, {
                                      onUploadProgress: u,
                                    })
                                  )
                                );
                              case 27:
                                if (!w) {
                                  e.next = 29;
                                  break;
                                }
                                return e.abrupt("return", {
                                  success: !0,
                                  filePath: n,
                                  fileID: p,
                                });
                              case 29:
                                return (
                                  (e.next = 31), this.reportOSSUpload({ id: _ })
                                );
                              case 31:
                                if (!e.sent.success) {
                                  e.next = 33;
                                  break;
                                }
                                return e.abrupt("return", {
                                  success: !0,
                                  filePath: n,
                                  fileID: p,
                                });
                              case 33:
                                throw new Pe({
                                  code: "UPLOAD_FAILED",
                                  message: "文件上传失败",
                                });
                              case 34:
                              case "end":
                                return e.stop();
                            }
                        },
                        e,
                        this
                      );
                    })
                  );
                  function t(t) {
                    return e.apply(this, arguments);
                  }
                  return t;
                })(),
              },
              {
                key: "getTempFileURL",
                value: function () {
                  var e =
                      arguments.length > 0 && void 0 !== arguments[0]
                        ? arguments[0]
                        : {},
                    t = e.fileList;
                  return new Promise(function (e, n) {
                    (Array.isArray(t) && 0 !== t.length) ||
                      n(
                        new Pe({
                          code: "INVALID_PARAM",
                          message: "fileList的元素必须是非空的字符串",
                        })
                      ),
                      e({
                        fileList: t.map(function (e) {
                          return { fileID: e, tempFileURL: e };
                        }),
                      });
                  });
                },
              },
              {
                key: "getFileInfo",
                value: (function () {
                  var e = (0, f.default)(
                    a.default.mark(function e() {
                      var t,
                        n,
                        r,
                        i = arguments;
                      return a.default.wrap(
                        function (e) {
                          while (1)
                            switch ((e.prev = e.next)) {
                              case 0:
                                if (
                                  ((t =
                                    i.length > 0 && void 0 !== i[0]
                                      ? i[0]
                                      : {}),
                                  (n = t.fileList),
                                  Array.isArray(n) && 0 !== n.length)
                                ) {
                                  e.next = 3;
                                  break;
                                }
                                throw new Pe({
                                  code: "INVALID_PARAM",
                                  message: "fileList的元素必须是非空的字符串",
                                });
                              case 3:
                                return (
                                  (r = {
                                    method: "serverless.file.resource.info",
                                    params: JSON.stringify({
                                      id: n
                                        .map(function (e) {
                                          return e.split("?")[0];
                                        })
                                        .join(","),
                                    }),
                                  }),
                                  (e.next = 6),
                                  this.request(this.setupRequest(r))
                                );
                              case 6:
                                return (
                                  (e.t0 = e.sent.result),
                                  e.abrupt("return", { fileList: e.t0 })
                                );
                              case 8:
                              case "end":
                                return e.stop();
                            }
                        },
                        e,
                        this
                      );
                    })
                  );
                  function t() {
                    return e.apply(this, arguments);
                  }
                  return t;
                })(),
              },
            ]);
          })(),
          $e = {
            init: function (e) {
              var t = new Re(e),
                n = {
                  signInAnonymously: function () {
                    return t.authorize();
                  },
                  getLoginState: function () {
                    return Promise.resolve(!1);
                  },
                };
              return (
                (t.auth = function () {
                  return n;
                }),
                (t.customAuth = t.auth),
                t
              );
            },
          },
          Fe =
            "undefined" != typeof location && "http:" === location.protocol
              ? "http:"
              : "https:";
        !(function (e) {
          (e.local = "local"), (e.none = "none"), (e.session = "session");
        })(Ne || (Ne = {}));
        var Be,
          qe = function () {},
          Ke = P(function (e, t) {
            var n;
            e.exports =
              ((n = C),
              (function (e) {
                var t = n,
                  r = t.lib,
                  i = r.WordArray,
                  o = r.Hasher,
                  a = t.algo,
                  s = [],
                  c = [];
                !(function () {
                  function t(t) {
                    for (var n = e.sqrt(t), r = 2; r <= n; r++)
                      if (!(t % r)) return !1;
                    return !0;
                  }
                  function n(e) {
                    return (4294967296 * (e - (0 | e))) | 0;
                  }
                  for (var r = 2, i = 0; i < 64; )
                    t(r) &&
                      (i < 8 && (s[i] = n(e.pow(r, 0.5))),
                      (c[i] = n(e.pow(r, 1 / 3))),
                      i++),
                      r++;
                })();
                var u = [],
                  l = (a.SHA256 = o.extend({
                    _doReset: function () {
                      this._hash = new i.init(s.slice(0));
                    },
                    _doProcessBlock: function (e, t) {
                      for (
                        var n = this._hash.words,
                          r = n[0],
                          i = n[1],
                          o = n[2],
                          a = n[3],
                          s = n[4],
                          l = n[5],
                          f = n[6],
                          d = n[7],
                          p = 0;
                        p < 64;
                        p++
                      ) {
                        if (p < 16) u[p] = 0 | e[t + p];
                        else {
                          var h = u[p - 15],
                            g =
                              ((h << 25) | (h >>> 7)) ^
                              ((h << 14) | (h >>> 18)) ^
                              (h >>> 3),
                            v = u[p - 2],
                            m =
                              ((v << 15) | (v >>> 17)) ^
                              ((v << 13) | (v >>> 19)) ^
                              (v >>> 10);
                          u[p] = g + u[p - 7] + m + u[p - 16];
                        }
                        var y = (r & i) ^ (r & o) ^ (i & o),
                          _ =
                            ((r << 30) | (r >>> 2)) ^
                            ((r << 19) | (r >>> 13)) ^
                            ((r << 10) | (r >>> 22)),
                          b =
                            d +
                            (((s << 26) | (s >>> 6)) ^
                              ((s << 21) | (s >>> 11)) ^
                              ((s << 7) | (s >>> 25))) +
                            ((s & l) ^ (~s & f)) +
                            c[p] +
                            u[p];
                        (d = f),
                          (f = l),
                          (l = s),
                          (s = (a + b) | 0),
                          (a = o),
                          (o = i),
                          (i = r),
                          (r = (b + (_ + y)) | 0);
                      }
                      (n[0] = (n[0] + r) | 0),
                        (n[1] = (n[1] + i) | 0),
                        (n[2] = (n[2] + o) | 0),
                        (n[3] = (n[3] + a) | 0),
                        (n[4] = (n[4] + s) | 0),
                        (n[5] = (n[5] + l) | 0),
                        (n[6] = (n[6] + f) | 0),
                        (n[7] = (n[7] + d) | 0);
                    },
                    _doFinalize: function () {
                      var t = this._data,
                        n = t.words,
                        r = 8 * this._nDataBytes,
                        i = 8 * t.sigBytes;
                      return (
                        (n[i >>> 5] |= 128 << (24 - (i % 32))),
                        (n[14 + (((i + 64) >>> 9) << 4)] = e.floor(
                          r / 4294967296
                        )),
                        (n[15 + (((i + 64) >>> 9) << 4)] = r),
                        (t.sigBytes = 4 * n.length),
                        this._process(),
                        this._hash
                      );
                    },
                    clone: function () {
                      var e = o.clone.call(this);
                      return (e._hash = this._hash.clone()), e;
                    },
                  }));
                (t.SHA256 = o._createHelper(l)),
                  (t.HmacSHA256 = o._createHmacHelper(l));
              })(Math),
              n.SHA256);
          }),
          ze = Ke,
          Ve = P(function (e, t) {
            e.exports = C.HmacSHA256;
          }),
          He = function () {
            var e;
            if (!Promise) {
              (e = function () {}), (e.promise = {});
              var t = function () {
                throw new Pe({
                  message:
                    'Your Node runtime does support ES6 Promises. Set "global.Promise" to your preferred implementation of promises.',
                });
              };
              return (
                Object.defineProperty(e.promise, "then", { get: t }),
                Object.defineProperty(e.promise, "catch", { get: t }),
                e
              );
            }
            var n = new Promise(function (t, n) {
              e = function (e, r) {
                return e ? n(e) : t(r);
              };
            });
            return (e.promise = n), e;
          };
        function We(e) {
          return void 0 === e;
        }
        function Je(e) {
          return "[object Null]" === Object.prototype.toString.call(e);
        }
        function Ge(e) {
          var t,
            n,
            r =
              ((t = e),
              "[object Array]" === Object.prototype.toString.call(t) ? e : [e]),
            i = b(r);
          try {
            for (i.s(); !(n = i.n()).done; ) {
              var o = n.value,
                a = o.isMatch,
                s = o.genAdapter,
                c = o.runtime;
              if (a()) return { adapter: s(), runtime: c };
            }
          } catch (u) {
            i.e(u);
          } finally {
            i.f();
          }
        }
        !(function (e) {
          (e.WEB = "web"), (e.WX_MP = "wx_mp");
        })(Be || (Be = {}));
        var Ye = { adapter: null, runtime: void 0 },
          Ze = ["anonymousUuidKey"],
          Xe = (function (e) {
            function t() {
              var e;
              return (
                (0, m.default)(this, t),
                (e = A(this, t)),
                Ye.adapter.root.tcbObject || (Ye.adapter.root.tcbObject = {}),
                e
              );
            }
            return (
              (0, g.default)(t, e),
              (0, y.default)(t, [
                {
                  key: "setItem",
                  value: function (e, t) {
                    Ye.adapter.root.tcbObject[e] = t;
                  },
                },
                {
                  key: "getItem",
                  value: function (e) {
                    return Ye.adapter.root.tcbObject[e];
                  },
                },
                {
                  key: "removeItem",
                  value: function (e) {
                    delete Ye.adapter.root.tcbObject[e];
                  },
                },
                {
                  key: "clear",
                  value: function () {
                    delete Ye.adapter.root.tcbObject;
                  },
                },
              ])
            );
          })(qe);
        function Qe(e, t) {
          switch (e) {
            case "local":
              return t.localStorage || new Xe();
            case "none":
              return new Xe();
            default:
              return t.sessionStorage || new Xe();
          }
        }
        var et = (function () {
            function e(t) {
              if (((0, m.default)(this, e), !this._storage)) {
                (this._persistence =
                  Ye.adapter.primaryStorage || t.persistence),
                  (this._storage = Qe(this._persistence, Ye.adapter));
                var n = "access_token_".concat(t.env),
                  r = "access_token_expire_".concat(t.env),
                  i = "refresh_token_".concat(t.env),
                  o = "anonymous_uuid_".concat(t.env),
                  a = "login_type_".concat(t.env),
                  s = "user_info_".concat(t.env);
                this.keys = {
                  accessTokenKey: n,
                  accessTokenExpireKey: r,
                  refreshTokenKey: i,
                  anonymousUuidKey: o,
                  loginTypeKey: a,
                  userInfoKey: s,
                };
              }
            }
            return (0, y.default)(e, [
              {
                key: "updatePersistence",
                value: function (e) {
                  if (e !== this._persistence) {
                    var t = "local" === this._persistence;
                    this._persistence = e;
                    var n = Qe(e, Ye.adapter);
                    for (var r in this.keys) {
                      var i = this.keys[r];
                      if (!t || !Ze.includes(r)) {
                        var o = this._storage.getItem(i);
                        We(o) ||
                          Je(o) ||
                          (n.setItem(i, o), this._storage.removeItem(i));
                      }
                    }
                    this._storage = n;
                  }
                },
              },
              {
                key: "setStore",
                value: function (e, t, n) {
                  if (this._storage) {
                    var r = { version: n || "localCachev1", content: t },
                      i = JSON.stringify(r);
                    try {
                      this._storage.setItem(e, i);
                    } catch (e) {
                      throw e;
                    }
                  }
                },
              },
              {
                key: "getStore",
                value: function (e, t) {
                  try {
                    if (!this._storage) return;
                  } catch (e) {
                    return "";
                  }
                  t = t || "localCachev1";
                  var n = this._storage.getItem(e);
                  return n && n.indexOf(t) >= 0 ? JSON.parse(n).content : "";
                },
              },
              {
                key: "removeStore",
                value: function (e) {
                  this._storage.removeItem(e);
                },
              },
            ]);
          })(),
          tt = {},
          nt = {};
        function rt(e) {
          return tt[e];
        }
        var it = (0, y.default)(function e(t, n) {
            (0, m.default)(this, e), (this.data = n || null), (this.name = t);
          }),
          ot = (function (e) {
            function t(e, n) {
              var r;
              return (
                (0, m.default)(this, t),
                (r = A(this, t, ["error", { error: e, data: n }])),
                (r.error = e),
                r
              );
            }
            return (0, g.default)(t, e), (0, y.default)(t);
          })(it),
          at = new ((function () {
            function e() {
              (0, m.default)(this, e), (this._listeners = {});
            }
            return (0, y.default)(e, [
              {
                key: "on",
                value: function (e, t) {
                  return (
                    (function (e, t, n) {
                      (n[e] = n[e] || []), n[e].push(t);
                    })(e, t, this._listeners),
                    this
                  );
                },
              },
              {
                key: "off",
                value: function (e, t) {
                  return (
                    (function (e, t, n) {
                      if (n && n[e]) {
                        var r = n[e].indexOf(t);
                        -1 !== r && n[e].splice(r, 1);
                      }
                    })(e, t, this._listeners),
                    this
                  );
                },
              },
              {
                key: "fire",
                value: function (e, t) {
                  if (e instanceof ot) return console.error(e.error), this;
                  var n = "string" == typeof e ? new it(e, t || {}) : e,
                    r = n.name;
                  if (this._listens(r)) {
                    n.target = this;
                    var i,
                      o = this._listeners[r]
                        ? (0, l.default)(this._listeners[r])
                        : [],
                      a = b(o);
                    try {
                      for (a.s(); !(i = a.n()).done; ) {
                        var s = i.value;
                        s.call(this, n);
                      }
                    } catch (c) {
                      a.e(c);
                    } finally {
                      a.f();
                    }
                  }
                  return this;
                },
              },
              {
                key: "_listens",
                value: function (e) {
                  return this._listeners[e] && this._listeners[e].length > 0;
                },
              },
            ]);
          })())();
        function st(e, t) {
          at.on(e, t);
        }
        function ct(e) {
          var t =
            arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
          at.fire(e, t);
        }
        function ut(e, t) {
          at.off(e, t);
        }
        var lt,
          ft = "loginStateChanged",
          dt = "loginStateExpire",
          pt = "loginTypeChanged",
          ht = "anonymousConverted",
          gt = "refreshAccessToken";
        !(function (e) {
          (e.ANONYMOUS = "ANONYMOUS"),
            (e.WECHAT = "WECHAT"),
            (e.WECHAT_PUBLIC = "WECHAT-PUBLIC"),
            (e.WECHAT_OPEN = "WECHAT-OPEN"),
            (e.CUSTOM = "CUSTOM"),
            (e.EMAIL = "EMAIL"),
            (e.USERNAME = "USERNAME"),
            (e.NULL = "NULL");
        })(lt || (lt = {}));
        var vt = [
            "auth.getJwt",
            "auth.logout",
            "auth.signInWithTicket",
            "auth.signInAnonymously",
            "auth.signIn",
            "auth.fetchAccessTokenWithRefreshToken",
            "auth.signUpWithEmailAndPassword",
            "auth.activateEndUserMail",
            "auth.sendPasswordResetEmail",
            "auth.resetPasswordWithToken",
            "auth.isUsernameRegistered",
          ],
          mt = { "X-SDK-Version": "1.3.5" };
        function yt(e, t, n) {
          var r = e[t];
          e[t] = function (t) {
            var i = {},
              o = {};
            n.forEach(function (n) {
              var r = n.call(e, t),
                a = r.data,
                s = r.headers;
              Object.assign(i, a), Object.assign(o, s);
            });
            var a = t.data;
            return (
              a &&
                (function () {
                  var e;
                  if (
                    ((e = a),
                    "[object FormData]" !== Object.prototype.toString.call(e))
                  )
                    t.data = S(S({}, a), i);
                  else for (var n in i) a.append(n, i[n]);
                })(),
              (t.headers = S(S({}, t.headers || {}), o)),
              r.call(e, t)
            );
          };
        }
        function _t() {
          var e = Math.random().toString(16).slice(2);
          return {
            data: { seqId: e },
            headers: S(S({}, mt), {}, { "x-seqid": e }),
          };
        }
        var bt = (function () {
            function e() {
              var t,
                n =
                  arguments.length > 0 && void 0 !== arguments[0]
                    ? arguments[0]
                    : {};
              (0, m.default)(this, e),
                (this.config = n),
                (this._reqClass = new Ye.adapter.reqClass({
                  timeout: this.config.timeout,
                  timeoutMsg: "请求在".concat(
                    this.config.timeout / 1e3,
                    "s内未完成，已中断"
                  ),
                  restrictedMethods: ["post"],
                })),
                (this._cache = rt(this.config.env)),
                (this._localCache = ((t = this.config.env), nt[t])),
                yt(this._reqClass, "post", [_t]),
                yt(this._reqClass, "upload", [_t]),
                yt(this._reqClass, "download", [_t]);
            }
            return (0, y.default)(e, [
              {
                key: "post",
                value: (function () {
                  var e = (0, f.default)(
                    a.default.mark(function e(t) {
                      return a.default.wrap(
                        function (e) {
                          while (1)
                            switch ((e.prev = e.next)) {
                              case 0:
                                return (e.next = 2), this._reqClass.post(t);
                              case 2:
                                return e.abrupt("return", e.sent);
                              case 3:
                              case "end":
                                return e.stop();
                            }
                        },
                        e,
                        this
                      );
                    })
                  );
                  function t(t) {
                    return e.apply(this, arguments);
                  }
                  return t;
                })(),
              },
              {
                key: "upload",
                value: (function () {
                  var e = (0, f.default)(
                    a.default.mark(function e(t) {
                      return a.default.wrap(
                        function (e) {
                          while (1)
                            switch ((e.prev = e.next)) {
                              case 0:
                                return (e.next = 2), this._reqClass.upload(t);
                              case 2:
                                return e.abrupt("return", e.sent);
                              case 3:
                              case "end":
                                return e.stop();
                            }
                        },
                        e,
                        this
                      );
                    })
                  );
                  function t(t) {
                    return e.apply(this, arguments);
                  }
                  return t;
                })(),
              },
              {
                key: "download",
                value: (function () {
                  var e = (0, f.default)(
                    a.default.mark(function e(t) {
                      return a.default.wrap(
                        function (e) {
                          while (1)
                            switch ((e.prev = e.next)) {
                              case 0:
                                return (e.next = 2), this._reqClass.download(t);
                              case 2:
                                return e.abrupt("return", e.sent);
                              case 3:
                              case "end":
                                return e.stop();
                            }
                        },
                        e,
                        this
                      );
                    })
                  );
                  function t(t) {
                    return e.apply(this, arguments);
                  }
                  return t;
                })(),
              },
              {
                key: "refreshAccessToken",
                value: (function () {
                  var e = (0, f.default)(
                    a.default.mark(function e() {
                      var t, n;
                      return a.default.wrap(
                        function (e) {
                          while (1)
                            switch ((e.prev = e.next)) {
                              case 0:
                                return (
                                  this._refreshAccessTokenPromise ||
                                    (this._refreshAccessTokenPromise =
                                      this._refreshAccessToken()),
                                  (e.prev = 1),
                                  (e.next = 4),
                                  this._refreshAccessTokenPromise
                                );
                              case 4:
                                (t = e.sent), (e.next = 10);
                                break;
                              case 7:
                                (e.prev = 7),
                                  (e.t0 = e["catch"](1)),
                                  (n = e.t0);
                              case 10:
                                if (
                                  ((this._refreshAccessTokenPromise = null),
                                  (this._shouldRefreshAccessTokenHook = null),
                                  !n)
                                ) {
                                  e.next = 12;
                                  break;
                                }
                                throw n;
                              case 12:
                                return e.abrupt("return", t);
                              case 13:
                              case "end":
                                return e.stop();
                            }
                        },
                        e,
                        this,
                        [[1, 7]]
                      );
                    })
                  );
                  function t() {
                    return e.apply(this, arguments);
                  }
                  return t;
                })(),
              },
              {
                key: "_refreshAccessToken",
                value: (function () {
                  var e = (0, f.default)(
                    a.default.mark(function e() {
                      var t, n, r, i, o, s, c, u, l, f, d, p, h;
                      return a.default.wrap(
                        function (e) {
                          while (1)
                            switch ((e.prev = e.next)) {
                              case 0:
                                if (
                                  ((t = this._cache.keys),
                                  (n = t.accessTokenKey),
                                  (r = t.accessTokenExpireKey),
                                  (i = t.refreshTokenKey),
                                  (o = t.loginTypeKey),
                                  (s = t.anonymousUuidKey),
                                  this._cache.removeStore(n),
                                  this._cache.removeStore(r),
                                  (c = this._cache.getStore(i)),
                                  c)
                                ) {
                                  e.next = 5;
                                  break;
                                }
                                throw new Pe({ message: "未登录CloudBase" });
                              case 5:
                                return (
                                  (u = { refresh_token: c }),
                                  (e.next = 8),
                                  this.request(
                                    "auth.fetchAccessTokenWithRefreshToken",
                                    u
                                  )
                                );
                              case 8:
                                if (((l = e.sent), !l.data.code)) {
                                  e.next = 21;
                                  break;
                                }
                                if (
                                  ((f = l.data.code),
                                  "SIGN_PARAM_INVALID" !== f &&
                                    "REFRESH_TOKEN_EXPIRED" !== f &&
                                    "INVALID_REFRESH_TOKEN" !== f)
                                ) {
                                  e.next = 20;
                                  break;
                                }
                                if (
                                  this._cache.getStore(o) !== lt.ANONYMOUS ||
                                  "INVALID_REFRESH_TOKEN" !== f
                                ) {
                                  e.next = 19;
                                  break;
                                }
                                return (
                                  (d = this._cache.getStore(s)),
                                  (p = this._cache.getStore(i)),
                                  (e.next = 17),
                                  this.send("auth.signInAnonymously", {
                                    anonymous_uuid: d,
                                    refresh_token: p,
                                  })
                                );
                              case 17:
                                return (
                                  (h = e.sent),
                                  e.abrupt(
                                    "return",
                                    (this.setRefreshToken(h.refresh_token),
                                    this._refreshAccessToken())
                                  )
                                );
                              case 19:
                                ct(dt), this._cache.removeStore(i);
                              case 20:
                                throw new Pe({
                                  code: l.data.code,
                                  message: "刷新access token失败：".concat(
                                    l.data.code
                                  ),
                                });
                              case 21:
                                if (!l.data.access_token) {
                                  e.next = 23;
                                  break;
                                }
                                return e.abrupt(
                                  "return",
                                  (ct(gt),
                                  this._cache.setStore(n, l.data.access_token),
                                  this._cache.setStore(
                                    r,
                                    l.data.access_token_expire + Date.now()
                                  ),
                                  {
                                    accessToken: l.data.access_token,
                                    accessTokenExpire:
                                      l.data.access_token_expire,
                                  })
                                );
                              case 23:
                                l.data.refresh_token &&
                                  (this._cache.removeStore(i),
                                  this._cache.setStore(i, l.data.refresh_token),
                                  this._refreshAccessToken());
                              case 24:
                              case "end":
                                return e.stop();
                            }
                        },
                        e,
                        this
                      );
                    })
                  );
                  function t() {
                    return e.apply(this, arguments);
                  }
                  return t;
                })(),
              },
              {
                key: "getAccessToken",
                value: (function () {
                  var e = (0, f.default)(
                    a.default.mark(function e() {
                      var t, n, r, i, o, s, c;
                      return a.default.wrap(
                        function (e) {
                          while (1)
                            switch ((e.prev = e.next)) {
                              case 0:
                                if (
                                  ((t = this._cache.keys),
                                  (n = t.accessTokenKey),
                                  (r = t.accessTokenExpireKey),
                                  (i = t.refreshTokenKey),
                                  this._cache.getStore(i))
                                ) {
                                  e.next = 3;
                                  break;
                                }
                                throw new Pe({
                                  message: "refresh token不存在，登录状态异常",
                                });
                              case 3:
                                if (
                                  ((o = this._cache.getStore(n)),
                                  (s = this._cache.getStore(r)),
                                  (c = !0),
                                  (e.t0 = this._shouldRefreshAccessTokenHook),
                                  !e.t0)
                                ) {
                                  e.next = 9;
                                  break;
                                }
                                return (
                                  (e.next = 8),
                                  this._shouldRefreshAccessTokenHook(o, s)
                                );
                              case 8:
                                e.t0 = !e.sent;
                              case 9:
                                if (((e.t1 = e.t0), !e.t1)) {
                                  e.next = 12;
                                  break;
                                }
                                c = !1;
                              case 12:
                                return e.abrupt(
                                  "return",
                                  (!o || !s || s < Date.now()) && c
                                    ? this.refreshAccessToken()
                                    : { accessToken: o, accessTokenExpire: s }
                                );
                              case 13:
                              case "end":
                                return e.stop();
                            }
                        },
                        e,
                        this
                      );
                    })
                  );
                  function t() {
                    return e.apply(this, arguments);
                  }
                  return t;
                })(),
              },
              {
                key: "request",
                value: (function () {
                  var e = (0, f.default)(
                    a.default.mark(function e(t, n, r) {
                      var i, o, s, c, u, l, f, d, p, h, g, v, m, y, _, b;
                      return a.default.wrap(
                        function (e) {
                          while (1)
                            switch ((e.prev = e.next)) {
                              case 0:
                                if (
                                  ((i = "x-tcb-trace_".concat(this.config.env)),
                                  (o = "application/x-www-form-urlencoded"),
                                  (s = S(
                                    {
                                      action: t,
                                      env: this.config.env,
                                      dataVersion: "2019-08-16",
                                    },
                                    n
                                  )),
                                  -1 !== vt.indexOf(t))
                                ) {
                                  e.next = 10;
                                  break;
                                }
                                if (
                                  ((c = this._cache.keys.refreshTokenKey),
                                  (e.t0 = this._cache.getStore(c)),
                                  !e.t0)
                                ) {
                                  e.next = 10;
                                  break;
                                }
                                return (e.next = 9), this.getAccessToken();
                              case 9:
                                s.access_token = e.sent.accessToken;
                              case 10:
                                if ("storage.uploadFile" === t) {
                                  for (l in ((u = new FormData()), u))
                                    u.hasOwnProperty(l) &&
                                      void 0 !== u[l] &&
                                      u.append(l, s[l]);
                                  o = "multipart/form-data";
                                } else
                                  for (f in ((o = "application/json"),
                                  (u = {}),
                                  s))
                                    void 0 !== s[f] && (u[f] = s[f]);
                                return (
                                  (d = { headers: { "content-type": o } }),
                                  r &&
                                    r.onUploadProgress &&
                                    (d.onUploadProgress = r.onUploadProgress),
                                  (p = this._localCache.getStore(i)),
                                  p && (d.headers["X-TCB-Trace"] = p),
                                  (h = n.parse),
                                  (g = n.inQuery),
                                  (v = n.search),
                                  (m = { env: this.config.env }),
                                  h && (m.parse = !0),
                                  g && (m = S(S({}, g), m)),
                                  (y = (function (e, t) {
                                    var n =
                                        arguments.length > 2 &&
                                        void 0 !== arguments[2]
                                          ? arguments[2]
                                          : {},
                                      r = /\?/.test(t),
                                      i = "";
                                    for (var o in n)
                                      "" === i ? !r && (t += "?") : (i += "&"),
                                        (i += ""
                                          .concat(o, "=")
                                          .concat(encodeURIComponent(n[o])));
                                    return /^http(s)?\:\/\//.test((t += i))
                                      ? t
                                      : "".concat(e).concat(t);
                                  })(
                                    Fe,
                                    "//tcb-api.tencentcloudapi.com/web",
                                    m
                                  )),
                                  v && (y += v),
                                  (e.next = 22),
                                  this.post(S({ url: y, data: u }, d))
                                );
                              case 22:
                                if (
                                  ((_ = e.sent),
                                  (b = _.header && _.header["x-tcb-trace"]),
                                  b && this._localCache.setStore(i, b),
                                  (200 === Number(_.status) ||
                                    200 === Number(_.statusCode)) &&
                                    _.data)
                                ) {
                                  e.next = 26;
                                  break;
                                }
                                throw new Pe({
                                  code: "NETWORK_ERROR",
                                  message: "network request error",
                                });
                              case 26:
                                return e.abrupt("return", _);
                              case 27:
                              case "end":
                                return e.stop();
                            }
                        },
                        e,
                        this
                      );
                    })
                  );
                  function t(t, n, r) {
                    return e.apply(this, arguments);
                  }
                  return t;
                })(),
              },
              {
                key: "send",
                value: (function () {
                  var e = (0, f.default)(
                    a.default.mark(function e(t) {
                      var n,
                        r,
                        i,
                        o = arguments;
                      return a.default.wrap(
                        function (e) {
                          while (1)
                            switch ((e.prev = e.next)) {
                              case 0:
                                return (
                                  (n =
                                    o.length > 1 && void 0 !== o[1]
                                      ? o[1]
                                      : {}),
                                  (e.next = 3),
                                  this.request(t, n, {
                                    onUploadProgress: n.onUploadProgress,
                                  })
                                );
                              case 3:
                                if (
                                  ((r = e.sent),
                                  "ACCESS_TOKEN_EXPIRED" !== r.data.code ||
                                    -1 !== vt.indexOf(t))
                                ) {
                                  e.next = 13;
                                  break;
                                }
                                return (e.next = 7), this.refreshAccessToken();
                              case 7:
                                return (
                                  (e.next = 9),
                                  this.request(t, n, {
                                    onUploadProgress: n.onUploadProgress,
                                  })
                                );
                              case 9:
                                if (((i = e.sent), !i.data.code)) {
                                  e.next = 12;
                                  break;
                                }
                                throw new Pe({
                                  code: i.data.code,
                                  message: i.data.message,
                                });
                              case 12:
                                return e.abrupt("return", i.data);
                              case 13:
                                if (!r.data.code) {
                                  e.next = 15;
                                  break;
                                }
                                throw new Pe({
                                  code: r.data.code,
                                  message: r.data.message,
                                });
                              case 15:
                                return e.abrupt("return", r.data);
                              case 16:
                              case "end":
                                return e.stop();
                            }
                        },
                        e,
                        this
                      );
                    })
                  );
                  function t(t) {
                    return e.apply(this, arguments);
                  }
                  return t;
                })(),
              },
              {
                key: "setRefreshToken",
                value: function (e) {
                  var t = this._cache.keys,
                    n = t.accessTokenKey,
                    r = t.accessTokenExpireKey,
                    i = t.refreshTokenKey;
                  this._cache.removeStore(n),
                    this._cache.removeStore(r),
                    this._cache.setStore(i, e);
                },
              },
            ]);
          })(),
          wt = {};
        function kt(e) {
          return wt[e];
        }
        var xt = (function () {
            function e(t) {
              (0, m.default)(this, e),
                (this.config = t),
                (this._cache = rt(t.env)),
                (this._request = kt(t.env));
            }
            return (0, y.default)(e, [
              {
                key: "setRefreshToken",
                value: function (e) {
                  var t = this._cache.keys,
                    n = t.accessTokenKey,
                    r = t.accessTokenExpireKey,
                    i = t.refreshTokenKey;
                  this._cache.removeStore(n),
                    this._cache.removeStore(r),
                    this._cache.setStore(i, e);
                },
              },
              {
                key: "setAccessToken",
                value: function (e, t) {
                  var n = this._cache.keys,
                    r = n.accessTokenKey,
                    i = n.accessTokenExpireKey;
                  this._cache.setStore(r, e), this._cache.setStore(i, t);
                },
              },
              {
                key: "refreshUserInfo",
                value: (function () {
                  var e = (0, f.default)(
                    a.default.mark(function e() {
                      var t, n;
                      return a.default.wrap(
                        function (e) {
                          while (1)
                            switch ((e.prev = e.next)) {
                              case 0:
                                return (
                                  (e.next = 2),
                                  this._request.send("auth.getUserInfo", {})
                                );
                              case 2:
                                return (
                                  (t = e.sent),
                                  (n = t.data),
                                  e.abrupt(
                                    "return",
                                    (this.setLocalUserInfo(n), n)
                                  )
                                );
                              case 5:
                              case "end":
                                return e.stop();
                            }
                        },
                        e,
                        this
                      );
                    })
                  );
                  function t() {
                    return e.apply(this, arguments);
                  }
                  return t;
                })(),
              },
              {
                key: "setLocalUserInfo",
                value: function (e) {
                  var t = this._cache.keys.userInfoKey;
                  this._cache.setStore(t, e);
                },
              },
            ]);
          })(),
          St = (function () {
            function e(t) {
              if (((0, m.default)(this, e), !t))
                throw new Pe({
                  code: "PARAM_ERROR",
                  message: "envId is not defined",
                });
              (this._envId = t),
                (this._cache = rt(this._envId)),
                (this._request = kt(this._envId)),
                this.setUserInfo();
            }
            return (0, y.default)(e, [
              {
                key: "linkWithTicket",
                value: function (e) {
                  if ("string" != typeof e)
                    throw new Pe({
                      code: "PARAM_ERROR",
                      message: "ticket must be string",
                    });
                  return this._request.send("auth.linkWithTicket", {
                    ticket: e,
                  });
                },
              },
              {
                key: "linkWithRedirect",
                value: function (e) {
                  e.signInWithRedirect();
                },
              },
              {
                key: "updatePassword",
                value: function (e, t) {
                  return this._request.send("auth.updatePassword", {
                    oldPassword: t,
                    newPassword: e,
                  });
                },
              },
              {
                key: "updateEmail",
                value: function (e) {
                  return this._request.send("auth.updateEmail", {
                    newEmail: e,
                  });
                },
              },
              {
                key: "updateUsername",
                value: function (e) {
                  if ("string" != typeof e)
                    throw new Pe({
                      code: "PARAM_ERROR",
                      message: "username must be a string",
                    });
                  return this._request.send("auth.updateUsername", {
                    username: e,
                  });
                },
              },
              {
                key: "getLinkedUidList",
                value: (function () {
                  var e = (0, f.default)(
                    a.default.mark(function e() {
                      var t, n, r, i;
                      return a.default.wrap(
                        function (e) {
                          while (1)
                            switch ((e.prev = e.next)) {
                              case 0:
                                return (
                                  (e.next = 2),
                                  this._request.send(
                                    "auth.getLinkedUidList",
                                    {}
                                  )
                                );
                              case 2:
                                return (
                                  (t = e.sent),
                                  (n = t.data),
                                  (r = !1),
                                  (i = n.users),
                                  e.abrupt(
                                    "return",
                                    (i.forEach(function (e) {
                                      e.wxOpenId && e.wxPublicId && (r = !0);
                                    }),
                                    { users: i, hasPrimaryUid: r })
                                  )
                                );
                              case 7:
                              case "end":
                                return e.stop();
                            }
                        },
                        e,
                        this
                      );
                    })
                  );
                  function t() {
                    return e.apply(this, arguments);
                  }
                  return t;
                })(),
              },
              {
                key: "setPrimaryUid",
                value: function (e) {
                  return this._request.send("auth.setPrimaryUid", { uid: e });
                },
              },
              {
                key: "unlink",
                value: function (e) {
                  return this._request.send("auth.unlink", { platform: e });
                },
              },
              {
                key: "update",
                value: (function () {
                  var e = (0, f.default)(
                    a.default.mark(function e(t) {
                      var n, r, i, o, s, c, u, l;
                      return a.default.wrap(
                        function (e) {
                          while (1)
                            switch ((e.prev = e.next)) {
                              case 0:
                                return (
                                  (n = t.nickName),
                                  (r = t.gender),
                                  (i = t.avatarUrl),
                                  (o = t.province),
                                  (s = t.country),
                                  (c = t.city),
                                  (e.next = 8),
                                  this._request.send("auth.updateUserInfo", {
                                    nickName: n,
                                    gender: r,
                                    avatarUrl: i,
                                    province: o,
                                    country: s,
                                    city: c,
                                  })
                                );
                              case 8:
                                (u = e.sent),
                                  (l = u.data),
                                  this.setLocalUserInfo(l);
                              case 11:
                              case "end":
                                return e.stop();
                            }
                        },
                        e,
                        this
                      );
                    })
                  );
                  function t(t) {
                    return e.apply(this, arguments);
                  }
                  return t;
                })(),
              },
              {
                key: "refresh",
                value: (function () {
                  var e = (0, f.default)(
                    a.default.mark(function e() {
                      var t, n;
                      return a.default.wrap(
                        function (e) {
                          while (1)
                            switch ((e.prev = e.next)) {
                              case 0:
                                return (
                                  (e.next = 2),
                                  this._request.send("auth.getUserInfo", {})
                                );
                              case 2:
                                return (
                                  (t = e.sent),
                                  (n = t.data),
                                  e.abrupt(
                                    "return",
                                    (this.setLocalUserInfo(n), n)
                                  )
                                );
                              case 5:
                              case "end":
                                return e.stop();
                            }
                        },
                        e,
                        this
                      );
                    })
                  );
                  function t() {
                    return e.apply(this, arguments);
                  }
                  return t;
                })(),
              },
              {
                key: "setUserInfo",
                value: function () {
                  var e = this,
                    t = this._cache.keys.userInfoKey,
                    n = this._cache.getStore(t);
                  [
                    "uid",
                    "loginType",
                    "openid",
                    "wxOpenId",
                    "wxPublicId",
                    "unionId",
                    "qqMiniOpenId",
                    "email",
                    "hasPassword",
                    "customUserId",
                    "nickName",
                    "gender",
                    "avatarUrl",
                  ].forEach(function (t) {
                    e[t] = n[t];
                  }),
                    (this.location = {
                      country: n.country,
                      province: n.province,
                      city: n.city,
                    });
                },
              },
              {
                key: "setLocalUserInfo",
                value: function (e) {
                  var t = this._cache.keys.userInfoKey;
                  this._cache.setStore(t, e), this.setUserInfo();
                },
              },
            ]);
          })(),
          At = (function () {
            function e(t) {
              if (((0, m.default)(this, e), !t))
                throw new Pe({
                  code: "PARAM_ERROR",
                  message: "envId is not defined",
                });
              this._cache = rt(t);
              var n = this._cache.keys,
                r = n.refreshTokenKey,
                i = n.accessTokenKey,
                o = n.accessTokenExpireKey,
                a = this._cache.getStore(r),
                s = this._cache.getStore(i),
                c = this._cache.getStore(o);
              (this.credential = {
                refreshToken: a,
                accessToken: s,
                accessTokenExpire: c,
              }),
                (this.user = new St(t));
            }
            return (0, y.default)(e, [
              {
                key: "isAnonymousAuth",
                get: function () {
                  return this.loginType === lt.ANONYMOUS;
                },
              },
              {
                key: "isCustomAuth",
                get: function () {
                  return this.loginType === lt.CUSTOM;
                },
              },
              {
                key: "isWeixinAuth",
                get: function () {
                  return (
                    this.loginType === lt.WECHAT ||
                    this.loginType === lt.WECHAT_OPEN ||
                    this.loginType === lt.WECHAT_PUBLIC
                  );
                },
              },
              {
                key: "loginType",
                get: function () {
                  return this._cache.getStore(this._cache.keys.loginTypeKey);
                },
              },
            ]);
          })(),
          It = (function (e) {
            function t() {
              return (0, m.default)(this, t), A(this, t, arguments);
            }
            return (
              (0, g.default)(t, e),
              (0, y.default)(t, [
                {
                  key: "signIn",
                  value: (function () {
                    var e = (0, f.default)(
                      a.default.mark(function e() {
                        var t, n, r, i, o, s, c;
                        return a.default.wrap(
                          function (e) {
                            while (1)
                              switch ((e.prev = e.next)) {
                                case 0:
                                  return (
                                    this._cache.updatePersistence("local"),
                                    (t = this._cache.keys),
                                    (n = t.anonymousUuidKey),
                                    (r = t.refreshTokenKey),
                                    (i = this._cache.getStore(n) || void 0),
                                    (o = this._cache.getStore(r) || void 0),
                                    (e.next = 8),
                                    this._request.send(
                                      "auth.signInAnonymously",
                                      { anonymous_uuid: i, refresh_token: o }
                                    )
                                  );
                                case 8:
                                  if (
                                    ((s = e.sent), !s.uuid || !s.refresh_token)
                                  ) {
                                    e.next = 20;
                                    break;
                                  }
                                  return (
                                    this._setAnonymousUUID(s.uuid),
                                    this.setRefreshToken(s.refresh_token),
                                    (e.next = 14),
                                    this._request.refreshAccessToken()
                                  );
                                case 14:
                                  return (
                                    ct(ft),
                                    ct(pt, {
                                      env: this.config.env,
                                      loginType: lt.ANONYMOUS,
                                      persistence: "local",
                                    }),
                                    (c = new At(this.config.env)),
                                    (e.next = 19),
                                    c.user.refresh()
                                  );
                                case 19:
                                  return e.abrupt("return", c);
                                case 20:
                                  throw new Pe({ message: "匿名登录失败" });
                                case 21:
                                case "end":
                                  return e.stop();
                              }
                          },
                          e,
                          this
                        );
                      })
                    );
                    function t() {
                      return e.apply(this, arguments);
                    }
                    return t;
                  })(),
                },
                {
                  key: "linkAndRetrieveDataWithTicket",
                  value: (function () {
                    var e = (0, f.default)(
                      a.default.mark(function e(t) {
                        var n, r, i, o, s, c;
                        return a.default.wrap(
                          function (e) {
                            while (1)
                              switch ((e.prev = e.next)) {
                                case 0:
                                  return (
                                    (n = this._cache.keys),
                                    (r = n.anonymousUuidKey),
                                    (i = n.refreshTokenKey),
                                    (o = this._cache.getStore(r)),
                                    (s = this._cache.getStore(i)),
                                    (e.next = 7),
                                    this._request.send(
                                      "auth.linkAndRetrieveDataWithTicket",
                                      {
                                        anonymous_uuid: o,
                                        refresh_token: s,
                                        ticket: t,
                                      }
                                    )
                                  );
                                case 7:
                                  if (((c = e.sent), !c.refresh_token)) {
                                    e.next = 16;
                                    break;
                                  }
                                  return (
                                    this._clearAnonymousUUID(),
                                    this.setRefreshToken(c.refresh_token),
                                    (e.next = 13),
                                    this._request.refreshAccessToken()
                                  );
                                case 13:
                                  return (
                                    ct(ht, { env: this.config.env }),
                                    ct(pt, {
                                      loginType: lt.CUSTOM,
                                      persistence: "local",
                                    }),
                                    e.abrupt("return", {
                                      credential: {
                                        refreshToken: c.refresh_token,
                                      },
                                    })
                                  );
                                case 16:
                                  throw new Pe({ message: "匿名转化失败" });
                                case 17:
                                case "end":
                                  return e.stop();
                              }
                          },
                          e,
                          this
                        );
                      })
                    );
                    function t(t) {
                      return e.apply(this, arguments);
                    }
                    return t;
                  })(),
                },
                {
                  key: "_setAnonymousUUID",
                  value: function (e) {
                    var t = this._cache.keys,
                      n = t.anonymousUuidKey,
                      r = t.loginTypeKey;
                    this._cache.removeStore(n),
                      this._cache.setStore(n, e),
                      this._cache.setStore(r, lt.ANONYMOUS);
                  },
                },
                {
                  key: "_clearAnonymousUUID",
                  value: function () {
                    this._cache.removeStore(this._cache.keys.anonymousUuidKey);
                  },
                },
              ])
            );
          })(xt),
          Ot = (function (e) {
            function t() {
              return (0, m.default)(this, t), A(this, t, arguments);
            }
            return (
              (0, g.default)(t, e),
              (0, y.default)(t, [
                {
                  key: "signIn",
                  value: (function () {
                    var e = (0, f.default)(
                      a.default.mark(function e(t) {
                        var n, r;
                        return a.default.wrap(
                          function (e) {
                            while (1)
                              switch ((e.prev = e.next)) {
                                case 0:
                                  if ("string" == typeof t) {
                                    e.next = 2;
                                    break;
                                  }
                                  throw new Pe({
                                    code: "PARAM_ERROR",
                                    message: "ticket must be a string",
                                  });
                                case 2:
                                  return (
                                    (n = this._cache.keys.refreshTokenKey),
                                    (e.next = 5),
                                    this._request.send(
                                      "auth.signInWithTicket",
                                      {
                                        ticket: t,
                                        refresh_token:
                                          this._cache.getStore(n) || "",
                                      }
                                    )
                                  );
                                case 5:
                                  if (((r = e.sent), !r.refresh_token)) {
                                    e.next = 15;
                                    break;
                                  }
                                  return (
                                    this.setRefreshToken(r.refresh_token),
                                    (e.next = 10),
                                    this._request.refreshAccessToken()
                                  );
                                case 10:
                                  return (
                                    ct(ft),
                                    ct(pt, {
                                      env: this.config.env,
                                      loginType: lt.CUSTOM,
                                      persistence: this.config.persistence,
                                    }),
                                    (e.next = 14),
                                    this.refreshUserInfo()
                                  );
                                case 14:
                                  return e.abrupt(
                                    "return",
                                    new At(this.config.env)
                                  );
                                case 15:
                                  throw new Pe({ message: "自定义登录失败" });
                                case 16:
                                case "end":
                                  return e.stop();
                              }
                          },
                          e,
                          this
                        );
                      })
                    );
                    function t(t) {
                      return e.apply(this, arguments);
                    }
                    return t;
                  })(),
                },
              ])
            );
          })(xt),
          Pt = (function (e) {
            function t() {
              return (0, m.default)(this, t), A(this, t, arguments);
            }
            return (
              (0, g.default)(t, e),
              (0, y.default)(t, [
                {
                  key: "signIn",
                  value: (function () {
                    var e = (0, f.default)(
                      a.default.mark(function e(t, n) {
                        var r, i, o, s, c;
                        return a.default.wrap(
                          function (e) {
                            while (1)
                              switch ((e.prev = e.next)) {
                                case 0:
                                  if ("string" == typeof t) {
                                    e.next = 2;
                                    break;
                                  }
                                  throw new Pe({
                                    code: "PARAM_ERROR",
                                    message: "email must be a string",
                                  });
                                case 2:
                                  return (
                                    (r = this._cache.keys.refreshTokenKey),
                                    (e.next = 5),
                                    this._request.send("auth.signIn", {
                                      loginType: "EMAIL",
                                      email: t,
                                      password: n,
                                      refresh_token:
                                        this._cache.getStore(r) || "",
                                    })
                                  );
                                case 5:
                                  if (
                                    ((i = e.sent),
                                    (o = i.refresh_token),
                                    (s = i.access_token),
                                    (c = i.access_token_expire),
                                    !o)
                                  ) {
                                    e.next = 22;
                                    break;
                                  }
                                  if ((this.setRefreshToken(o), !s || !c)) {
                                    e.next = 15;
                                    break;
                                  }
                                  this.setAccessToken(s, c), (e.next = 17);
                                  break;
                                case 15:
                                  return (
                                    (e.next = 17),
                                    this._request.refreshAccessToken()
                                  );
                                case 17:
                                  return (e.next = 19), this.refreshUserInfo();
                                case 19:
                                  return (
                                    ct(ft),
                                    ct(pt, {
                                      env: this.config.env,
                                      loginType: lt.EMAIL,
                                      persistence: this.config.persistence,
                                    }),
                                    e.abrupt("return", new At(this.config.env))
                                  );
                                case 22:
                                  throw i.code
                                    ? new Pe({
                                        code: i.code,
                                        message: "邮箱登录失败: ".concat(
                                          i.message
                                        ),
                                      })
                                    : new Pe({ message: "邮箱登录失败" });
                                case 23:
                                case "end":
                                  return e.stop();
                              }
                          },
                          e,
                          this
                        );
                      })
                    );
                    function t(t, n) {
                      return e.apply(this, arguments);
                    }
                    return t;
                  })(),
                },
                {
                  key: "activate",
                  value: (function () {
                    var e = (0, f.default)(
                      a.default.mark(function e(t) {
                        return a.default.wrap(
                          function (e) {
                            while (1)
                              switch ((e.prev = e.next)) {
                                case 0:
                                  return e.abrupt(
                                    "return",
                                    this._request.send(
                                      "auth.activateEndUserMail",
                                      { token: t }
                                    )
                                  );
                                case 1:
                                case "end":
                                  return e.stop();
                              }
                          },
                          e,
                          this
                        );
                      })
                    );
                    function t(t) {
                      return e.apply(this, arguments);
                    }
                    return t;
                  })(),
                },
                {
                  key: "resetPasswordWithToken",
                  value: (function () {
                    var e = (0, f.default)(
                      a.default.mark(function e(t, n) {
                        return a.default.wrap(
                          function (e) {
                            while (1)
                              switch ((e.prev = e.next)) {
                                case 0:
                                  return e.abrupt(
                                    "return",
                                    this._request.send(
                                      "auth.resetPasswordWithToken",
                                      { token: t, newPassword: n }
                                    )
                                  );
                                case 1:
                                case "end":
                                  return e.stop();
                              }
                          },
                          e,
                          this
                        );
                      })
                    );
                    function t(t, n) {
                      return e.apply(this, arguments);
                    }
                    return t;
                  })(),
                },
              ])
            );
          })(xt),
          Tt = (function (e) {
            function t() {
              return (0, m.default)(this, t), A(this, t, arguments);
            }
            return (
              (0, g.default)(t, e),
              (0, y.default)(t, [
                {
                  key: "signIn",
                  value: (function () {
                    var e = (0, f.default)(
                      a.default.mark(function e(t, n) {
                        var r, i, o, s, c;
                        return a.default.wrap(
                          function (e) {
                            while (1)
                              switch ((e.prev = e.next)) {
                                case 0:
                                  if ("string" == typeof t) {
                                    e.next = 2;
                                    break;
                                  }
                                  throw new Pe({
                                    code: "PARAM_ERROR",
                                    message: "username must be a string",
                                  });
                                case 2:
                                  return (
                                    "string" != typeof n &&
                                      ((n = ""),
                                      console.warn("password is empty")),
                                    (r = this._cache.keys.refreshTokenKey),
                                    (e.next = 6),
                                    this._request.send("auth.signIn", {
                                      loginType: lt.USERNAME,
                                      username: t,
                                      password: n,
                                      refresh_token:
                                        this._cache.getStore(r) || "",
                                    })
                                  );
                                case 6:
                                  if (
                                    ((i = e.sent),
                                    (o = i.refresh_token),
                                    (s = i.access_token_expire),
                                    (c = i.access_token),
                                    !o)
                                  ) {
                                    e.next = 23;
                                    break;
                                  }
                                  if ((this.setRefreshToken(o), !c || !s)) {
                                    e.next = 16;
                                    break;
                                  }
                                  this.setAccessToken(c, s), (e.next = 18);
                                  break;
                                case 16:
                                  return (
                                    (e.next = 18),
                                    this._request.refreshAccessToken()
                                  );
                                case 18:
                                  return (e.next = 20), this.refreshUserInfo();
                                case 20:
                                  return (
                                    ct(ft),
                                    ct(pt, {
                                      env: this.config.env,
                                      loginType: lt.USERNAME,
                                      persistence: this.config.persistence,
                                    }),
                                    e.abrupt("return", new At(this.config.env))
                                  );
                                case 23:
                                  throw i.code
                                    ? new Pe({
                                        code: i.code,
                                        message: "用户名密码登录失败: ".concat(
                                          i.message
                                        ),
                                      })
                                    : new Pe({ message: "用户名密码登录失败" });
                                case 24:
                                case "end":
                                  return e.stop();
                              }
                          },
                          e,
                          this
                        );
                      })
                    );
                    function t(t, n) {
                      return e.apply(this, arguments);
                    }
                    return t;
                  })(),
                },
              ])
            );
          })(xt),
          Ct = (function () {
            function e(t) {
              (0, m.default)(this, e),
                (this.config = t),
                (this._cache = rt(t.env)),
                (this._request = kt(t.env)),
                (this._onAnonymousConverted =
                  this._onAnonymousConverted.bind(this)),
                (this._onLoginTypeChanged =
                  this._onLoginTypeChanged.bind(this)),
                st(pt, this._onLoginTypeChanged);
            }
            return (0, y.default)(e, [
              {
                key: "currentUser",
                get: function () {
                  var e = this.hasLoginState();
                  return (e && e.user) || null;
                },
              },
              {
                key: "loginType",
                get: function () {
                  return this._cache.getStore(this._cache.keys.loginTypeKey);
                },
              },
              {
                key: "anonymousAuthProvider",
                value: function () {
                  return new It(this.config);
                },
              },
              {
                key: "customAuthProvider",
                value: function () {
                  return new Ot(this.config);
                },
              },
              {
                key: "emailAuthProvider",
                value: function () {
                  return new Pt(this.config);
                },
              },
              {
                key: "usernameAuthProvider",
                value: function () {
                  return new Tt(this.config);
                },
              },
              {
                key: "signInAnonymously",
                value: (function () {
                  var e = (0, f.default)(
                    a.default.mark(function e() {
                      return a.default.wrap(
                        function (e) {
                          while (1)
                            switch ((e.prev = e.next)) {
                              case 0:
                                return e.abrupt(
                                  "return",
                                  new It(this.config).signIn()
                                );
                              case 1:
                              case "end":
                                return e.stop();
                            }
                        },
                        e,
                        this
                      );
                    })
                  );
                  function t() {
                    return e.apply(this, arguments);
                  }
                  return t;
                })(),
              },
              {
                key: "signInWithEmailAndPassword",
                value: (function () {
                  var e = (0, f.default)(
                    a.default.mark(function e(t, n) {
                      return a.default.wrap(
                        function (e) {
                          while (1)
                            switch ((e.prev = e.next)) {
                              case 0:
                                return e.abrupt(
                                  "return",
                                  new Pt(this.config).signIn(t, n)
                                );
                              case 1:
                              case "end":
                                return e.stop();
                            }
                        },
                        e,
                        this
                      );
                    })
                  );
                  function t(t, n) {
                    return e.apply(this, arguments);
                  }
                  return t;
                })(),
              },
              {
                key: "signInWithUsernameAndPassword",
                value: function (e, t) {
                  return new Tt(this.config).signIn(e, t);
                },
              },
              {
                key: "linkAndRetrieveDataWithTicket",
                value: (function () {
                  var e = (0, f.default)(
                    a.default.mark(function e(t) {
                      return a.default.wrap(
                        function (e) {
                          while (1)
                            switch ((e.prev = e.next)) {
                              case 0:
                                return (
                                  this._anonymousAuthProvider ||
                                    (this._anonymousAuthProvider = new It(
                                      this.config
                                    )),
                                  st(ht, this._onAnonymousConverted),
                                  (e.next = 3),
                                  this._anonymousAuthProvider.linkAndRetrieveDataWithTicket(
                                    t
                                  )
                                );
                              case 3:
                                return e.abrupt("return", e.sent);
                              case 4:
                              case "end":
                                return e.stop();
                            }
                        },
                        e,
                        this
                      );
                    })
                  );
                  function t(t) {
                    return e.apply(this, arguments);
                  }
                  return t;
                })(),
              },
              {
                key: "signOut",
                value: (function () {
                  var e = (0, f.default)(
                    a.default.mark(function e() {
                      var t, n, r, i, o, s;
                      return a.default.wrap(
                        function (e) {
                          while (1)
                            switch ((e.prev = e.next)) {
                              case 0:
                                if (this.loginType !== lt.ANONYMOUS) {
                                  e.next = 2;
                                  break;
                                }
                                throw new Pe({
                                  message: "匿名用户不支持登出操作",
                                });
                              case 2:
                                if (
                                  ((t = this._cache.keys),
                                  (n = t.refreshTokenKey),
                                  (r = t.accessTokenKey),
                                  (i = t.accessTokenExpireKey),
                                  (o = this._cache.getStore(n)),
                                  o)
                                ) {
                                  e.next = 5;
                                  break;
                                }
                                return e.abrupt("return");
                              case 5:
                                return (
                                  (e.next = 7),
                                  this._request.send("auth.logout", {
                                    refresh_token: o,
                                  })
                                );
                              case 7:
                                return (
                                  (s = e.sent),
                                  e.abrupt(
                                    "return",
                                    (this._cache.removeStore(n),
                                    this._cache.removeStore(r),
                                    this._cache.removeStore(i),
                                    ct(ft),
                                    ct(pt, {
                                      env: this.config.env,
                                      loginType: lt.NULL,
                                      persistence: this.config.persistence,
                                    }),
                                    s)
                                  )
                                );
                              case 9:
                              case "end":
                                return e.stop();
                            }
                        },
                        e,
                        this
                      );
                    })
                  );
                  function t() {
                    return e.apply(this, arguments);
                  }
                  return t;
                })(),
              },
              {
                key: "signUpWithEmailAndPassword",
                value: (function () {
                  var e = (0, f.default)(
                    a.default.mark(function e(t, n) {
                      return a.default.wrap(
                        function (e) {
                          while (1)
                            switch ((e.prev = e.next)) {
                              case 0:
                                return e.abrupt(
                                  "return",
                                  this._request.send(
                                    "auth.signUpWithEmailAndPassword",
                                    { email: t, password: n }
                                  )
                                );
                              case 1:
                              case "end":
                                return e.stop();
                            }
                        },
                        e,
                        this
                      );
                    })
                  );
                  function t(t, n) {
                    return e.apply(this, arguments);
                  }
                  return t;
                })(),
              },
              {
                key: "sendPasswordResetEmail",
                value: (function () {
                  var e = (0, f.default)(
                    a.default.mark(function e(t) {
                      return a.default.wrap(
                        function (e) {
                          while (1)
                            switch ((e.prev = e.next)) {
                              case 0:
                                return e.abrupt(
                                  "return",
                                  this._request.send(
                                    "auth.sendPasswordResetEmail",
                                    { email: t }
                                  )
                                );
                              case 1:
                              case "end":
                                return e.stop();
                            }
                        },
                        e,
                        this
                      );
                    })
                  );
                  function t(t) {
                    return e.apply(this, arguments);
                  }
                  return t;
                })(),
              },
              {
                key: "onLoginStateChanged",
                value: function (e) {
                  var t = this;
                  st(ft, function () {
                    var n = t.hasLoginState();
                    e.call(t, n);
                  });
                  var n = this.hasLoginState();
                  e.call(this, n);
                },
              },
              {
                key: "onLoginStateExpired",
                value: function (e) {
                  st(dt, e.bind(this));
                },
              },
              {
                key: "onAccessTokenRefreshed",
                value: function (e) {
                  st(gt, e.bind(this));
                },
              },
              {
                key: "onAnonymousConverted",
                value: function (e) {
                  st(ht, e.bind(this));
                },
              },
              {
                key: "onLoginTypeChanged",
                value: function (e) {
                  var t = this;
                  st(pt, function () {
                    var n = t.hasLoginState();
                    e.call(t, n);
                  });
                },
              },
              {
                key: "getAccessToken",
                value: (function () {
                  var e = (0, f.default)(
                    a.default.mark(function e() {
                      return a.default.wrap(
                        function (e) {
                          while (1)
                            switch ((e.prev = e.next)) {
                              case 0:
                                return (
                                  (e.next = 2), this._request.getAccessToken()
                                );
                              case 2:
                                return (
                                  (e.t0 = e.sent.accessToken),
                                  (e.t1 = this.config.env),
                                  e.abrupt("return", {
                                    accessToken: e.t0,
                                    env: e.t1,
                                  })
                                );
                              case 5:
                              case "end":
                                return e.stop();
                            }
                        },
                        e,
                        this
                      );
                    })
                  );
                  function t() {
                    return e.apply(this, arguments);
                  }
                  return t;
                })(),
              },
              {
                key: "hasLoginState",
                value: function () {
                  var e = this._cache.keys.refreshTokenKey;
                  return this._cache.getStore(e)
                    ? new At(this.config.env)
                    : null;
                },
              },
              {
                key: "isUsernameRegistered",
                value: (function () {
                  var e = (0, f.default)(
                    a.default.mark(function e(t) {
                      var n, r;
                      return a.default.wrap(
                        function (e) {
                          while (1)
                            switch ((e.prev = e.next)) {
                              case 0:
                                if ("string" == typeof t) {
                                  e.next = 2;
                                  break;
                                }
                                throw new Pe({
                                  code: "PARAM_ERROR",
                                  message: "username must be a string",
                                });
                              case 2:
                                return (
                                  (e.next = 4),
                                  this._request.send(
                                    "auth.isUsernameRegistered",
                                    { username: t }
                                  )
                                );
                              case 4:
                                return (
                                  (n = e.sent),
                                  (r = n.data),
                                  e.abrupt("return", r && r.isRegistered)
                                );
                              case 7:
                              case "end":
                                return e.stop();
                            }
                        },
                        e,
                        this
                      );
                    })
                  );
                  function t(t) {
                    return e.apply(this, arguments);
                  }
                  return t;
                })(),
              },
              {
                key: "getLoginState",
                value: function () {
                  return Promise.resolve(this.hasLoginState());
                },
              },
              {
                key: "signInWithTicket",
                value: (function () {
                  var e = (0, f.default)(
                    a.default.mark(function e(t) {
                      return a.default.wrap(
                        function (e) {
                          while (1)
                            switch ((e.prev = e.next)) {
                              case 0:
                                return e.abrupt(
                                  "return",
                                  new Ot(this.config).signIn(t)
                                );
                              case 1:
                              case "end":
                                return e.stop();
                            }
                        },
                        e,
                        this
                      );
                    })
                  );
                  function t(t) {
                    return e.apply(this, arguments);
                  }
                  return t;
                })(),
              },
              {
                key: "shouldRefreshAccessToken",
                value: function (e) {
                  this._request._shouldRefreshAccessTokenHook = e.bind(this);
                },
              },
              {
                key: "getUserInfo",
                value: function () {
                  return this._request
                    .send("auth.getUserInfo", {})
                    .then(function (e) {
                      return e.code
                        ? e
                        : S(S({}, e.data), {}, { requestId: e.seqId });
                    });
                },
              },
              {
                key: "getAuthHeader",
                value: function () {
                  var e = this._cache.keys,
                    t = e.refreshTokenKey,
                    n = e.accessTokenKey,
                    r = this._cache.getStore(t);
                  return {
                    "x-cloudbase-credentials":
                      this._cache.getStore(n) + "/@@/" + r,
                  };
                },
              },
              {
                key: "_onAnonymousConverted",
                value: function (e) {
                  var t = e.data.env;
                  t === this.config.env &&
                    this._cache.updatePersistence(this.config.persistence);
                },
              },
              {
                key: "_onLoginTypeChanged",
                value: function (e) {
                  var t = e.data,
                    n = t.loginType,
                    r = t.persistence,
                    i = t.env;
                  i === this.config.env &&
                    (this._cache.updatePersistence(r),
                    this._cache.setStore(this._cache.keys.loginTypeKey, n));
                },
              },
            ]);
          })(),
          Et = function (e, t) {
            t = t || He();
            var n = kt(this.config.env),
              r = e.cloudPath,
              i = e.filePath,
              o = e.onUploadProgress,
              a = e.fileType,
              s = void 0 === a ? "image" : a;
            return (
              n
                .send("storage.getUploadMetadata", { path: r })
                .then(function (e) {
                  var a = e.data,
                    c = a.url,
                    u = a.authorization,
                    l = a.token,
                    f = a.fileId,
                    d = a.cosFileId,
                    p = e.requestId,
                    h = {
                      key: r,
                      signature: u,
                      "x-cos-meta-fileid": d,
                      success_action_status: "201",
                      "x-cos-security-token": l,
                    };
                  n.upload({
                    url: c,
                    data: h,
                    file: i,
                    name: r,
                    fileType: s,
                    onUploadProgress: o,
                  })
                    .then(function (e) {
                      201 === e.statusCode
                        ? t(null, { fileID: f, requestId: p })
                        : t(
                            new Pe({
                              code: "STORAGE_REQUEST_FAIL",
                              message: "STORAGE_REQUEST_FAIL: ".concat(e.data),
                            })
                          );
                    })
                    .catch(function (e) {
                      t(e);
                    });
                })
                .catch(function (e) {
                  t(e);
                }),
              t.promise
            );
          },
          jt = function (e, t) {
            t = t || He();
            var n = kt(this.config.env),
              r = e.cloudPath;
            return (
              n
                .send("storage.getUploadMetadata", { path: r })
                .then(function (e) {
                  t(null, e);
                })
                .catch(function (e) {
                  t(e);
                }),
              t.promise
            );
          },
          Lt = function (e, t) {
            var n = e.fileList;
            if (((t = t || He()), !n || !Array.isArray(n)))
              return {
                code: "INVALID_PARAM",
                message: "fileList必须是非空的数组",
              };
            var r,
              i = b(n);
            try {
              for (i.s(); !(r = i.n()).done; ) {
                var o = r.value;
                if (!o || "string" != typeof o)
                  return {
                    code: "INVALID_PARAM",
                    message: "fileList的元素必须是非空的字符串",
                  };
              }
            } catch (s) {
              i.e(s);
            } finally {
              i.f();
            }
            var a = { fileid_list: n };
            return (
              kt(this.config.env)
                .send("storage.batchDeleteFile", a)
                .then(function (e) {
                  e.code
                    ? t(null, e)
                    : t(null, {
                        fileList: e.data.delete_list,
                        requestId: e.requestId,
                      });
                })
                .catch(function (e) {
                  t(e);
                }),
              t.promise
            );
          },
          Dt = function (e, t) {
            var n = e.fileList;
            (t = t || He()),
              (n && Array.isArray(n)) ||
                t(null, {
                  code: "INVALID_PARAM",
                  message: "fileList必须是非空的数组",
                });
            var r,
              i = [],
              o = b(n);
            try {
              for (o.s(); !(r = o.n()).done; ) {
                var a = r.value;
                "object" == (0, u.default)(a)
                  ? ((a.hasOwnProperty("fileID") &&
                      a.hasOwnProperty("maxAge")) ||
                      t(null, {
                        code: "INVALID_PARAM",
                        message: "fileList的元素必须是包含fileID和maxAge的对象",
                      }),
                    i.push({ fileid: a.fileID, max_age: a.maxAge }))
                  : "string" == typeof a
                  ? i.push({ fileid: a })
                  : t(null, {
                      code: "INVALID_PARAM",
                      message: "fileList的元素必须是字符串",
                    });
              }
            } catch (c) {
              o.e(c);
            } finally {
              o.f();
            }
            var s = { file_list: i };
            return (
              kt(this.config.env)
                .send("storage.batchGetDownloadUrl", s)
                .then(function (e) {
                  e.code
                    ? t(null, e)
                    : t(null, {
                        fileList: e.data.download_list,
                        requestId: e.requestId,
                      });
                })
                .catch(function (e) {
                  t(e);
                }),
              t.promise
            );
          },
          Mt = (function () {
            var e = (0, f.default)(
              a.default.mark(function e(t, n) {
                var r, i, o, s;
                return a.default.wrap(
                  function (e) {
                    while (1)
                      switch ((e.prev = e.next)) {
                        case 0:
                          return (
                            (r = t.fileID),
                            (e.next = 3),
                            Dt.call(this, {
                              fileList: [{ fileID: r, maxAge: 600 }],
                            })
                          );
                        case 3:
                          if (
                            ((i = e.sent.fileList[0]), "SUCCESS" === i.code)
                          ) {
                            e.next = 6;
                            break;
                          }
                          return e.abrupt(
                            "return",
                            n
                              ? n(i)
                              : new Promise(function (e) {
                                  e(i);
                                })
                          );
                        case 6:
                          if (
                            ((o = kt(this.config.env)),
                            (s = i.download_url),
                            (s = encodeURI(s)),
                            n)
                          ) {
                            e.next = 10;
                            break;
                          }
                          return e.abrupt("return", o.download({ url: s }));
                        case 10:
                          return (
                            (e.t0 = n), (e.next = 13), o.download({ url: s })
                          );
                        case 13:
                          (e.t1 = e.sent), (0, e.t0)(e.t1);
                        case 15:
                        case "end":
                          return e.stop();
                      }
                  },
                  e,
                  this
                );
              })
            );
            return function (t, n) {
              return e.apply(this, arguments);
            };
          })(),
          Nt = function (e, t) {
            var n,
              r = e.name,
              i = e.data,
              o = e.query,
              a = e.parse,
              s = e.search,
              c = t || He();
            try {
              n = i ? JSON.stringify(i) : "";
            } catch (r) {
              return Promise.reject(r);
            }
            if (!r)
              return Promise.reject(
                new Pe({ code: "PARAM_ERROR", message: "函数名不能为空" })
              );
            var u = {
              inQuery: o,
              parse: a,
              search: s,
              function_name: r,
              request_data: n,
            };
            return (
              kt(this.config.env)
                .send("functions.invokeFunction", u)
                .then(function (e) {
                  if (e.code) c(null, e);
                  else {
                    var t = e.data.response_data;
                    if (a) c(null, { result: t, requestId: e.requestId });
                    else
                      try {
                        (t = JSON.parse(e.data.response_data)),
                          c(null, { result: t, requestId: e.requestId });
                      } catch (e) {
                        c(new Pe({ message: "response data must be json" }));
                      }
                  }
                  return c.promise;
                })
                .catch(function (e) {
                  c(e);
                }),
              c.promise
            );
          },
          Ut = { timeout: 15e3, persistence: "session" },
          Rt = {},
          $t = (function () {
            function e(t) {
              (0, m.default)(this, e),
                (this.config = t || this.config),
                (this.authObj = void 0);
            }
            return (0, y.default)(e, [
              {
                key: "init",
                value: function (t) {
                  switch (
                    (Ye.adapter ||
                      (this.requestClient = new Ye.adapter.reqClass({
                        timeout: t.timeout || 5e3,
                        timeoutMsg: "请求在".concat(
                          (t.timeout || 5e3) / 1e3,
                          "s内未完成，已中断"
                        ),
                      })),
                    (this.config = S(S({}, Ut), t)),
                    !0)
                  ) {
                    case this.config.timeout > 6e5:
                      console.warn(
                        "timeout大于可配置上限[10分钟]，已重置为上限数值"
                      ),
                        (this.config.timeout = 6e5);
                      break;
                    case this.config.timeout < 100:
                      console.warn(
                        "timeout小于可配置下限[100ms]，已重置为下限数值"
                      ),
                        (this.config.timeout = 100);
                  }
                  return new e(this.config);
                },
              },
              {
                key: "auth",
                value: function () {
                  var e =
                      arguments.length > 0 && void 0 !== arguments[0]
                        ? arguments[0]
                        : {},
                    t = e.persistence;
                  if (this.authObj) return this.authObj;
                  var n,
                    r = t || Ye.adapter.primaryStorage || Ut.persistence;
                  return (
                    r !== this.config.persistence &&
                      (this.config.persistence = r),
                    (function (e) {
                      var t = e.env;
                      (tt[t] = new et(e)),
                        (nt[t] = new et(
                          S(S({}, e), {}, { persistence: "local" })
                        ));
                    })(this.config),
                    (n = this.config),
                    (wt[n.env] = new bt(n)),
                    (this.authObj = new Ct(this.config)),
                    this.authObj
                  );
                },
              },
              {
                key: "on",
                value: function (e, t) {
                  return st.apply(this, [e, t]);
                },
              },
              {
                key: "off",
                value: function (e, t) {
                  return ut.apply(this, [e, t]);
                },
              },
              {
                key: "callFunction",
                value: function (e, t) {
                  return Nt.apply(this, [e, t]);
                },
              },
              {
                key: "deleteFile",
                value: function (e, t) {
                  return Lt.apply(this, [e, t]);
                },
              },
              {
                key: "getTempFileURL",
                value: function (e, t) {
                  return Dt.apply(this, [e, t]);
                },
              },
              {
                key: "downloadFile",
                value: function (e, t) {
                  return Mt.apply(this, [e, t]);
                },
              },
              {
                key: "uploadFile",
                value: function (e, t) {
                  return Et.apply(this, [e, t]);
                },
              },
              {
                key: "getUploadMetadata",
                value: function (e, t) {
                  return jt.apply(this, [e, t]);
                },
              },
              {
                key: "registerExtension",
                value: function (e) {
                  Rt[e.name] = e;
                },
              },
              {
                key: "invokeExtension",
                value: (function () {
                  var e = (0, f.default)(
                    a.default.mark(function e(t, n) {
                      var r;
                      return a.default.wrap(
                        function (e) {
                          while (1)
                            switch ((e.prev = e.next)) {
                              case 0:
                                if (((r = Rt[t]), r)) {
                                  e.next = 3;
                                  break;
                                }
                                throw new Pe({
                                  message: "扩展".concat(t, " 必须先注册"),
                                });
                              case 3:
                                return (e.next = 5), r.invoke(n, this);
                              case 5:
                                return e.abrupt("return", e.sent);
                              case 6:
                              case "end":
                                return e.stop();
                            }
                        },
                        e,
                        this
                      );
                    })
                  );
                  function t(t, n) {
                    return e.apply(this, arguments);
                  }
                  return t;
                })(),
              },
              {
                key: "useAdapters",
                value: function (e) {
                  var t = Ge(e) || {},
                    n = t.adapter,
                    r = t.runtime;
                  n && (Ye.adapter = n), r && (Ye.runtime = r);
                },
              },
            ]);
          })(),
          Ft = new $t();
        function Bt(e, t, n) {
          void 0 === n && (n = {});
          var r = /\?/.test(t),
            i = "";
          for (var o in n)
            "" === i ? !r && (t += "?") : (i += "&"),
              (i += o + "=" + encodeURIComponent(n[o]));
          return /^http(s)?:\/\//.test((t += i)) ? t : "" + e + t;
        }
        var qt = (function () {
            function e() {
              (0, m.default)(this, e);
            }
            return (0, y.default)(e, [
              {
                key: "post",
                value: function (e) {
                  var t = e.url,
                    n = e.data,
                    r = e.headers;
                  return new Promise(function (e, i) {
                    Te.request({
                      url: Bt("https:", t),
                      data: n,
                      method: "POST",
                      header: r,
                      success: function (t) {
                        e(t);
                      },
                      fail: function (e) {
                        i(e);
                      },
                    });
                  });
                },
              },
              {
                key: "upload",
                value: function (e) {
                  return new Promise(function (t, n) {
                    var r = e.url,
                      i = e.file,
                      o = e.data,
                      a = e.headers,
                      s = e.fileType,
                      c = Te.uploadFile({
                        url: Bt("https:", r),
                        name: "file",
                        formData: Object.assign({}, o),
                        filePath: i,
                        fileType: s,
                        header: a,
                        success: function (e) {
                          var n = {
                            statusCode: e.statusCode,
                            data: e.data || {},
                          };
                          200 === e.statusCode &&
                            o.success_action_status &&
                            (n.statusCode = parseInt(
                              o.success_action_status,
                              10
                            )),
                            t(n);
                        },
                        fail: function (e) {
                          n(new Error(e.errMsg || "uploadFile:fail"));
                        },
                      });
                    "function" == typeof e.onUploadProgress &&
                      c &&
                      "function" == typeof c.onProgressUpdate &&
                      c.onProgressUpdate(function (t) {
                        e.onUploadProgress({
                          loaded: t.totalBytesSent,
                          total: t.totalBytesExpectedToSend,
                        });
                      });
                  });
                },
              },
            ]);
          })(),
          Kt = {
            setItem: function (e, t) {
              Te.setStorageSync(e, t);
            },
            getItem: function (e) {
              return Te.getStorageSync(e);
            },
            removeItem: function (e) {
              Te.removeStorageSync(e);
            },
            clear: function () {
              Te.clearStorageSync();
            },
          },
          zt = {
            genAdapter: function () {
              return {
                root: {},
                reqClass: qt,
                localStorage: Kt,
                primaryStorage: "local",
              };
            },
            isMatch: function () {
              return !0;
            },
            runtime: "uni_app",
          };
        Ft.useAdapters(zt);
        var Vt = Ft,
          Ht = Vt.init;
        Vt.init = function (e) {
          e.env = e.spaceId;
          var t = Ht.call(this, e);
          (t.config.provider = "tencent"), (t.config.spaceId = e.spaceId);
          var n = t.auth;
          return (
            (t.auth = function (e) {
              var t = n.call(this, e);
              return (
                [
                  "linkAndRetrieveDataWithTicket",
                  "signInAnonymously",
                  "signOut",
                  "getAccessToken",
                  "getLoginState",
                  "signInWithTicket",
                  "getUserInfo",
                ].forEach(function (e) {
                  var n;
                  t[e] = ((n = t[e]),
                  function (e) {
                    e = e || {};
                    var t = Ae(e),
                      r = t.success,
                      i = t.fail,
                      o = t.complete;
                    if (!(r || i || o)) return n.call(this, e);
                    n.call(this, e).then(
                      function (e) {
                        r && r(e), o && o(e);
                      },
                      function (e) {
                        i && i(e), o && o(e);
                      }
                    );
                  }).bind(t);
                }),
                t
              );
            }),
            (t.customAuth = t.auth),
            t
          );
        };
        var Wt = Vt,
          Jt = (function (e) {
            function t() {
              return (0, m.default)(this, t), A(this, t, arguments);
            }
            return (
              (0, g.default)(t, e),
              (0, y.default)(t, [
                {
                  key: "getAccessToken",
                  value: function () {
                    var e = this;
                    return new Promise(function (t, n) {
                      var r = "Anonymous_Access_token";
                      e.setAccessToken(r), t(r);
                    });
                  },
                },
                {
                  key: "setupRequest",
                  value: function (e, t) {
                    var n = Object.assign({}, e, {
                        spaceId: this.config.spaceId,
                        timestamp: Date.now(),
                      }),
                      r = { "Content-Type": "application/json" };
                    "auth" !== t &&
                      ((n.token = this.accessToken),
                      (r["x-basement-token"] = this.accessToken)),
                      (r["x-serverless-sign"] = Ue.sign(
                        n,
                        this.config.clientSecret
                      ));
                    var i = Me();
                    r["x-client-info"] = encodeURIComponent(JSON.stringify(i));
                    var o = Ce(),
                      a = o.token;
                    return (
                      (r["x-client-token"] = a),
                      {
                        url: this.config.requestUrl,
                        method: "POST",
                        data: n,
                        dataType: "json",
                        header: JSON.parse(JSON.stringify(r)),
                      }
                    );
                  },
                },
                {
                  key: "uploadFileToOSS",
                  value: function (e) {
                    var t = this,
                      n = e.url,
                      r = e.formData,
                      i = e.name,
                      o = e.filePath,
                      a = e.fileType,
                      s = e.onUploadProgress;
                    return new Promise(function (e, c) {
                      var u = t.adapter.uploadFile({
                        url: n,
                        formData: r,
                        name: i,
                        filePath: o,
                        fileType: a,
                        success: function (t) {
                          t && t.statusCode < 400
                            ? e(t)
                            : c(
                                new Pe({
                                  code: "UPLOAD_FAILED",
                                  message: "文件上传失败",
                                })
                              );
                        },
                        fail: function (e) {
                          c(
                            new Pe({
                              code: e.code || "UPLOAD_FAILED",
                              message: e.message || e.errMsg || "文件上传失败",
                            })
                          );
                        },
                      });
                      "function" == typeof s &&
                        u &&
                        "function" == typeof u.onProgressUpdate &&
                        u.onProgressUpdate(function (e) {
                          s({
                            loaded: e.totalBytesSent,
                            total: e.totalBytesExpectedToSend,
                          });
                        });
                    });
                  },
                },
                {
                  key: "uploadFile",
                  value: function (e) {
                    var t,
                      n = this,
                      r = e.filePath,
                      i = e.cloudPath,
                      o = e.fileType,
                      a = void 0 === o ? "image" : o,
                      s = e.onUploadProgress;
                    if (!i)
                      throw new Pe({
                        code: "CLOUDPATH_REQUIRED",
                        message: "cloudPath不可为空",
                      });
                    return this.getOSSUploadOptionsFromPath({ cloudPath: i })
                      .then(function (e) {
                        var i = e.result,
                          o = i.url,
                          c = i.formData,
                          u = i.name;
                        t = e.result.fileUrl;
                        var l = {
                          url: o,
                          formData: c,
                          name: u,
                          filePath: r,
                          fileType: a,
                        };
                        return n.uploadFileToOSS(
                          Object.assign({}, l, { onUploadProgress: s })
                        );
                      })
                      .then(function () {
                        return n.reportOSSUpload({ cloudPath: i });
                      })
                      .then(function (e) {
                        return new Promise(function (n, i) {
                          e.success
                            ? n({ success: !0, filePath: r, fileID: t })
                            : i(
                                new Pe({
                                  code: "UPLOAD_FAILED",
                                  message: "文件上传失败",
                                })
                              );
                        });
                      });
                  },
                },
                {
                  key: "deleteFile",
                  value: function (e) {
                    var t = e.fileList,
                      n = {
                        method: "serverless.file.resource.delete",
                        params: JSON.stringify({ fileList: t }),
                      };
                    return this.request(this.setupRequest(n)).then(function (
                      e
                    ) {
                      if (e.success) return e.result;
                      throw new Pe({
                        code: "DELETE_FILE_FAILED",
                        message: "删除文件失败",
                      });
                    });
                  },
                },
                {
                  key: "getTempFileURL",
                  value: function () {
                    var e =
                        arguments.length > 0 && void 0 !== arguments[0]
                          ? arguments[0]
                          : {},
                      t = e.fileList,
                      n = e.maxAge;
                    if (!Array.isArray(t) || 0 === t.length)
                      throw new Pe({
                        code: "INVALID_PARAM",
                        message: "fileList的元素必须是非空的字符串",
                      });
                    var r = {
                      method: "serverless.file.resource.getTempFileURL",
                      params: JSON.stringify({ fileList: t, maxAge: n }),
                    };
                    return this.request(this.setupRequest(r)).then(function (
                      e
                    ) {
                      if (e.success)
                        return {
                          fileList: e.result.fileList.map(function (e) {
                            return {
                              fileID: e.fileID,
                              tempFileURL: e.tempFileURL,
                            };
                          }),
                        };
                      throw new Pe({
                        code: "GET_TEMP_FILE_URL_FAILED",
                        message: "获取临时文件链接失败",
                      });
                    });
                  },
                },
              ])
            );
          })(Re),
          Gt = {
            init: function (e) {
              var t = new Jt(e),
                n = {
                  signInAnonymously: function () {
                    return t.authorize();
                  },
                  getLoginState: function () {
                    return Promise.resolve(!1);
                  },
                };
              return (
                (t.auth = function () {
                  return n;
                }),
                (t.customAuth = t.auth),
                t
              );
            },
          },
          Yt = P(function (e, t) {
            e.exports = C.enc.Hex;
          });
        function Zt() {
          return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
            /[xy]/g,
            function (e) {
              var t = (16 * Math.random()) | 0;
              return ("x" === e ? t : (3 & t) | 8).toString(16);
            }
          );
        }
        function Xt() {
          var e =
              arguments.length > 0 && void 0 !== arguments[0]
                ? arguments[0]
                : "",
            t =
              arguments.length > 1 && void 0 !== arguments[1]
                ? arguments[1]
                : {},
            n = t.data,
            r = t.functionName,
            i = t.method,
            o = t.headers,
            a = t.signHeaderKeys,
            s = void 0 === a ? [] : a,
            u = t.config,
            l = Date.now(),
            f = Zt(),
            d = Object.assign({}, o, {
              "x-from-app-id": u.spaceAppId,
              "x-from-env-id": u.spaceId,
              "x-to-env-id": u.spaceId,
              "x-from-instance-id": l,
              "x-from-function-name": r,
              "x-client-timestamp": l,
              "x-alipay-source": "client",
              "x-request-id": f,
              "x-alipay-callid": f,
              "x-trace-id": f,
            }),
            p = [
              "x-from-app-id",
              "x-from-env-id",
              "x-to-env-id",
              "x-from-instance-id",
              "x-from-function-name",
              "x-client-timestamp",
            ].concat(s),
            h = e.split("?") || [],
            g = (0, c.default)(h, 2),
            v = g[0],
            m = void 0 === v ? "" : v,
            y = g[1],
            _ = void 0 === y ? "" : y,
            b = (function (e) {
              var t = e.signedHeaders.join(";"),
                n = e.signedHeaders
                  .map(function (t) {
                    return ""
                      .concat(t.toLowerCase(), ":")
                      .concat(e.headers[t], "\n");
                  })
                  .join(""),
                r = ze(e.body).toString(Yt),
                i = ""
                  .concat(e.method.toUpperCase(), "\n")
                  .concat(e.path, "\n")
                  .concat(e.query, "\n")
                  .concat(n, "\n")
                  .concat(t, "\n")
                  .concat(r, "\n"),
                o = ze(i).toString(Yt),
                a = "HMAC-SHA256\n".concat(e.timestamp, "\n").concat(o, "\n"),
                s = Ve(a, e.secretKey).toString(Yt);
              return "HMAC-SHA256 Credential="
                .concat(e.secretId, ", SignedHeaders=")
                .concat(t, ", Signature=")
                .concat(s);
            })({
              path: m,
              query: _,
              method: i,
              headers: d,
              timestamp: l,
              body: JSON.stringify(n),
              secretId: u.accessKey,
              secretKey: u.secretKey,
              signedHeaders: p.sort(),
            });
          return {
            url: "".concat(u.endpoint).concat(e),
            headers: Object.assign({}, d, { Authorization: b }),
          };
        }
        function Qt(e) {
          var t = e.url,
            n = e.data,
            r = e.method,
            i = void 0 === r ? "POST" : r,
            o = e.headers,
            a = void 0 === o ? {} : o;
          return new Promise(function (e, r) {
            Te.request({
              url: t,
              method: i,
              data: "object" == (0, u.default)(n) ? JSON.stringify(n) : n,
              header: a,
              dataType: "json",
              complete: function () {
                var t =
                    arguments.length > 0 && void 0 !== arguments[0]
                      ? arguments[0]
                      : {},
                  n = a["x-trace-id"] || "";
                if (!t.statusCode || t.statusCode >= 400) {
                  var i = t.data || {},
                    o = i.message,
                    s = i.errMsg,
                    c = i.trace_id;
                  return r(
                    new Pe({
                      code: "SYS_ERR",
                      message: o || s || "request:fail",
                      requestId: c || n,
                    })
                  );
                }
                e({
                  status: t.statusCode,
                  data: t.data,
                  headers: t.header,
                  requestId: n,
                });
              },
            });
          });
        }
        function en(e, t) {
          var n = e.path,
            r = e.data,
            i = e.method,
            o = void 0 === i ? "GET" : i,
            a = Xt(n, {
              functionName: "",
              data: r,
              method: o,
              headers: {
                "x-alipay-cloud-mode": "oss",
                "x-data-api-type": "oss",
                "x-expire-timestamp": Date.now() + 6e4,
              },
              signHeaderKeys: ["x-data-api-type", "x-expire-timestamp"],
              config: t,
            }),
            s = a.url,
            c = a.headers;
          return Qt({ url: s, data: r, method: o, headers: c })
            .then(function (e) {
              var t = e.data || {};
              if (!t.success)
                throw new Pe({
                  code: e.errCode,
                  message: e.errMsg,
                  requestId: e.requestId,
                });
              return t.data || {};
            })
            .catch(function (e) {
              throw new Pe({
                code: e.errCode,
                message: e.errMsg,
                requestId: e.requestId,
              });
            });
        }
        function tn() {
          var e =
              arguments.length > 0 && void 0 !== arguments[0]
                ? arguments[0]
                : "",
            t = e.trim().replace(/^cloud:\/\//, ""),
            n = t.indexOf("/");
          if (n <= 0)
            throw new Pe({ code: "INVALID_PARAM", message: "fileID不合法" });
          var r = t.substring(0, n),
            i = t.substring(n + 1);
          return (
            r !== this.config.spaceId &&
              console.warn(
                "file "
                  .concat(e, " does not belong to env ")
                  .concat(this.config.spaceId)
              ),
            i
          );
        }
        function nn() {
          var e =
            arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "";
          return "cloud://"
            .concat(this.config.spaceId, "/")
            .concat(e.replace(/^\/+/, ""));
        }
        var rn = (function () {
            function e(t) {
              (0, m.default)(this, e), (this.config = t);
            }
            return (0, y.default)(e, [
              {
                key: "signedURL",
                value: function (e) {
                  var t =
                      arguments.length > 1 && void 0 !== arguments[1]
                        ? arguments[1]
                        : {},
                    n = "/ws/function/".concat(e),
                    r = this.config.wsEndpoint.replace(/^ws(s)?:\/\//, ""),
                    i = Object.assign({}, t, {
                      accessKeyId: this.config.accessKey,
                      signatureNonce: Zt(),
                      timestamp: "" + Date.now(),
                    }),
                    o = [
                      n,
                      [
                        "accessKeyId",
                        "authorization",
                        "signatureNonce",
                        "timestamp",
                      ]
                        .sort()
                        .map(function (e) {
                          return i[e] ? "".concat(e, "=").concat(i[e]) : null;
                        })
                        .filter(Boolean)
                        .join("&"),
                      "host:".concat(r),
                    ].join("\n"),
                    a = ["HMAC-SHA256", ze(o).toString(Yt)].join("\n"),
                    s = Ve(a, this.config.secretKey).toString(Yt),
                    c = Object.keys(i)
                      .map(function (e) {
                        return ""
                          .concat(e, "=")
                          .concat(encodeURIComponent(i[e]));
                      })
                      .join("&");
                  return ""
                    .concat(this.config.wsEndpoint)
                    .concat(n, "?")
                    .concat(c, "&signature=")
                    .concat(s);
                },
              },
            ]);
          })(),
          on = (function () {
            function e(t) {
              if (
                ((0, m.default)(this, e),
                ["spaceId", "spaceAppId", "accessKey", "secretKey"].forEach(
                  function (e) {
                    if (!Object.prototype.hasOwnProperty.call(t, e))
                      throw new Error("".concat(e, " required"));
                  }
                ),
                t.endpoint)
              ) {
                if ("string" != typeof t.endpoint)
                  throw new Error("endpoint must be string");
                if (!/^https:\/\//.test(t.endpoint))
                  throw new Error("endpoint must start with https://");
                t.endpoint = t.endpoint.replace(/\/$/, "");
              }
              (this.config = Object.assign({}, t, {
                endpoint:
                  t.endpoint ||
                  "https://".concat(t.spaceId, ".api-hz.cloudbasefunction.cn"),
                wsEndpoint:
                  t.wsEndpoint ||
                  "wss://".concat(t.spaceId, ".api-hz.cloudbasefunction.cn"),
              })),
                (this._websocket = new rn(this.config));
            }
            return (0, y.default)(e, [
              {
                key: "callFunction",
                value: function (e) {
                  return (function (e, t) {
                    var n = e.name,
                      r = e.data,
                      i = e.async,
                      o = void 0 !== i && i,
                      a = "POST",
                      s = { "x-to-function-name": n };
                    o && (s["x-function-invoke-type"] = "async");
                    var c = Xt("/functions/invokeFunction", {
                        functionName: n,
                        data: r,
                        method: a,
                        headers: s,
                        signHeaderKeys: ["x-to-function-name"],
                        config: t,
                      }),
                      u = c.url,
                      l = c.headers;
                    return Qt({ url: u, data: r, method: a, headers: l })
                      .then(function (e) {
                        var t = 0;
                        if (o) {
                          var n = e.data || {};
                          (t = "200" === n.errCode ? 0 : n.errCode),
                            (e.data = n.data || {}),
                            (e.errMsg = n.errMsg);
                        }
                        if (0 !== t)
                          throw new Pe({
                            code: t,
                            message: e.errMsg,
                            requestId: e.requestId,
                          });
                        return {
                          errCode: t,
                          success: 0 === t,
                          requestId: e.requestId,
                          result: e.data,
                        };
                      })
                      .catch(function (e) {
                        throw new Pe({
                          code: e.errCode,
                          message: e.errMsg,
                          requestId: e.requestId,
                        });
                      });
                  })(e, this.config);
                },
              },
              {
                key: "uploadFileToOSS",
                value: function (e) {
                  var t = e.url,
                    n = e.filePath,
                    r = e.fileType,
                    i = e.formData,
                    o = e.onUploadProgress;
                  return new Promise(function (e, a) {
                    var s = Te.uploadFile({
                      url: t,
                      filePath: n,
                      fileType: r,
                      formData: i,
                      name: "file",
                      success: function (t) {
                        t && t.statusCode < 400
                          ? e(t)
                          : a(
                              new Pe({
                                code: "UPLOAD_FAILED",
                                message: "文件上传失败",
                              })
                            );
                      },
                      fail: function (e) {
                        a(
                          new Pe({
                            code: e.code || "UPLOAD_FAILED",
                            message: e.message || e.errMsg || "文件上传失败",
                          })
                        );
                      },
                    });
                    "function" == typeof o &&
                      s &&
                      "function" == typeof s.onProgressUpdate &&
                      s.onProgressUpdate(function (e) {
                        o({
                          loaded: e.totalBytesSent,
                          total: e.totalBytesExpectedToSend,
                        });
                      });
                  });
                },
              },
              {
                key: "uploadFile",
                value: (function () {
                  var e = (0, f.default)(
                    a.default.mark(function e(t) {
                      var n, r, i, o, s, c, u, l, f, d, p;
                      return a.default.wrap(
                        function (e) {
                          while (1)
                            switch ((e.prev = e.next)) {
                              case 0:
                                if (
                                  ((n = t.filePath),
                                  (r = t.cloudPath),
                                  (i = void 0 === r ? "" : r),
                                  (o = t.fileType),
                                  (s = void 0 === o ? "image" : o),
                                  (c = t.onUploadProgress),
                                  "string" === F(i))
                                ) {
                                  e.next = 3;
                                  break;
                                }
                                throw new Pe({
                                  code: "INVALID_PARAM",
                                  message: "cloudPath必须为字符串类型",
                                });
                              case 3:
                                if ((i = i.trim())) {
                                  e.next = 5;
                                  break;
                                }
                                throw new Pe({
                                  code: "INVALID_PARAM",
                                  message: "cloudPath不可为空",
                                });
                              case 5:
                                if (!/:\/\//.test(i)) {
                                  e.next = 7;
                                  break;
                                }
                                throw new Pe({
                                  code: "INVALID_PARAM",
                                  message: "cloudPath不合法",
                                });
                              case 7:
                                return (
                                  (e.next = 9),
                                  en(
                                    {
                                      path: "/".concat(
                                        i.replace(/^\//, ""),
                                        "?post_url"
                                      ),
                                    },
                                    this.config
                                  )
                                );
                              case 9:
                                return (
                                  (u = e.sent),
                                  (l = u.file_id),
                                  (f = u.upload_url),
                                  (d = u.form_data),
                                  (p =
                                    d &&
                                    d.reduce(function (e, t) {
                                      return (e[t.key] = t.value), e;
                                    }, {})),
                                  e.abrupt(
                                    "return",
                                    this.uploadFileToOSS({
                                      url: f,
                                      filePath: n,
                                      fileType: s,
                                      formData: p,
                                      onUploadProgress: c,
                                    }).then(function () {
                                      return { fileID: l };
                                    })
                                  )
                                );
                              case 15:
                              case "end":
                                return e.stop();
                            }
                        },
                        e,
                        this
                      );
                    })
                  );
                  function t(t) {
                    return e.apply(this, arguments);
                  }
                  return t;
                })(),
              },
              {
                key: "getTempFileURL",
                value: (function () {
                  var e = (0, f.default)(
                    a.default.mark(function e(t) {
                      var n,
                        r = this;
                      return a.default.wrap(function (e) {
                        while (1)
                          switch ((e.prev = e.next)) {
                            case 0:
                              return (
                                (n = t.fileList),
                                e.abrupt(
                                  "return",
                                  new Promise(function (e, t) {
                                    (!n || n.length < 0) &&
                                      t(
                                        new Pe({
                                          errCode: "INVALID_PARAM",
                                          errMsg: "fileList不能为空数组",
                                        })
                                      ),
                                      n.length > 50 &&
                                        t(
                                          new Pe({
                                            errCode: "INVALID_PARAM",
                                            errMsg:
                                              "fileList数组长度不能超过50",
                                          })
                                        );
                                    var i,
                                      o = [],
                                      a = b(n);
                                    try {
                                      for (a.s(); !(i = a.n()).done; ) {
                                        var s = i.value;
                                        "string" !== F(s) &&
                                          t(
                                            new Pe({
                                              errCode: "INVALID_PARAM",
                                              errMsg:
                                                "fileList的元素必须是非空的字符串",
                                            })
                                          );
                                        var c = tn.call(r, s);
                                        o.push({ file_id: c, expire: 600 });
                                      }
                                    } catch (u) {
                                      a.e(u);
                                    } finally {
                                      a.f();
                                    }
                                    en(
                                      {
                                        path: "/?download_url",
                                        data: { file_list: o },
                                        method: "POST",
                                      },
                                      r.config
                                    )
                                      .then(function (t) {
                                        var n = t.file_list,
                                          i = void 0 === n ? [] : n;
                                        e({
                                          fileList: i.map(function (e) {
                                            return {
                                              fileID: nn.call(r, e.file_id),
                                              tempFileURL: e.download_url,
                                            };
                                          }),
                                        });
                                      })
                                      .catch(function (e) {
                                        return t(e);
                                      });
                                  })
                                )
                              );
                            case 2:
                            case "end":
                              return e.stop();
                          }
                      }, e);
                    })
                  );
                  function t(t) {
                    return e.apply(this, arguments);
                  }
                  return t;
                })(),
              },
              {
                key: "connectWebSocket",
                value: (function () {
                  var e = (0, f.default)(
                    a.default.mark(function e(t) {
                      var n, r;
                      return a.default.wrap(
                        function (e) {
                          while (1)
                            switch ((e.prev = e.next)) {
                              case 0:
                                return (
                                  (n = t.name),
                                  (r = t.query),
                                  e.abrupt(
                                    "return",
                                    Te.connectSocket({
                                      url: this._websocket.signedURL(n, r),
                                      complete: function () {},
                                    })
                                  )
                                );
                              case 2:
                              case "end":
                                return e.stop();
                            }
                        },
                        e,
                        this
                      );
                    })
                  );
                  function t(t) {
                    return e.apply(this, arguments);
                  }
                  return t;
                })(),
              },
            ]);
          })(),
          an = {
            init: function (e) {
              e.provider = "alipay";
              var t = new on(e);
              return (
                (t.auth = function () {
                  return {
                    signInAnonymously: function () {
                      return Promise.resolve();
                    },
                    getLoginState: function () {
                      return Promise.resolve(!0);
                    },
                  };
                }),
                t
              );
            },
          };
        function sn(e) {
          var t,
            n = e.data;
          t = Me();
          var r = JSON.parse(JSON.stringify(n || {}));
          if ((Object.assign(r, { clientInfo: t }), !r.uniIdToken)) {
            var i = Ce(),
              o = i.token;
            o && (r.uniIdToken = o);
          }
          return r;
        }
        function cn() {
          return un.apply(this, arguments);
        }
        function un() {
          return (
            (un = (0, f.default)(
              a.default.mark(function e() {
                var t,
                  n,
                  r,
                  i,
                  o,
                  s,
                  c,
                  u,
                  l,
                  f,
                  d = this,
                  p = arguments;
                return a.default.wrap(
                  function (e) {
                    while (1)
                      switch ((e.prev = e.next)) {
                        case 0:
                          return (
                            (t = p.length > 0 && void 0 !== p[0] ? p[0] : {}),
                            (n = t.name),
                            (r = t.data),
                            (e.next = 3),
                            this.__dev__.initLocalNetwork()
                          );
                        case 3:
                          return (
                            (i = this.__dev__),
                            (o = i.localAddress),
                            (s = i.localPort),
                            (c = {
                              aliyun: "aliyun",
                              tencent: "tcb",
                              alipay: "alipay",
                            }[this.config.provider]),
                            (u = this.config.spaceId),
                            (l = "http://"
                              .concat(o, ":")
                              .concat(s, "/system/check-function")),
                            (f = "http://"
                              .concat(o, ":")
                              .concat(s, "/cloudfunctions/")
                              .concat(n)),
                            e.abrupt(
                              "return",
                              new Promise(function (e, t) {
                                Te.request({
                                  method: "POST",
                                  url: l,
                                  data: {
                                    name: n,
                                    platform: X,
                                    provider: c,
                                    spaceId: u,
                                  },
                                  timeout: 3e3,
                                  success: function (t) {
                                    e(t);
                                  },
                                  fail: function () {
                                    e({
                                      data: {
                                        code: "NETWORK_ERROR",
                                        message:
                                          "连接本地调试服务失败，请检查客户端是否和主机在同一局域网下，自动切换为已部署的云函数。",
                                      },
                                    });
                                  },
                                });
                              })
                                .then(function () {
                                  var e =
                                      arguments.length > 0 &&
                                      void 0 !== arguments[0]
                                        ? arguments[0]
                                        : {},
                                    t = e.data,
                                    n = t || {},
                                    r = n.code,
                                    i = n.message;
                                  return {
                                    code: 0 === r ? 0 : r || "SYS_ERR",
                                    message: i || "SYS_ERR",
                                  };
                                })
                                .then(function (e) {
                                  var t = e.code,
                                    i = e.message;
                                  if (0 !== t) {
                                    switch (t) {
                                      case "MODULE_ENCRYPTED":
                                        console.error(
                                          "此云函数（".concat(
                                            n,
                                            "）依赖加密公共模块不可本地调试，自动切换为云端已部署的云函数"
                                          )
                                        );
                                        break;
                                      case "FUNCTION_ENCRYPTED":
                                        console.error(
                                          "此云函数（".concat(
                                            n,
                                            "）已加密不可本地调试，自动切换为云端已部署的云函数"
                                          )
                                        );
                                        break;
                                      case "ACTION_ENCRYPTED":
                                        console.error(
                                          i ||
                                            "需要访问加密的uni-clientDB-action，自动切换为云端环境"
                                        );
                                        break;
                                      case "NETWORK_ERROR":
                                        console.error(
                                          i ||
                                            "连接本地调试服务失败，请检查客户端是否和主机在同一局域网下"
                                        );
                                        break;
                                      case "SWITCH_TO_CLOUD":
                                        break;
                                      default:
                                        var o =
                                          "检测本地调试服务出现错误：".concat(
                                            i,
                                            "，请检查网络环境或重启客户端再试"
                                          );
                                        throw (console.error(o), new Error(o));
                                    }
                                    return d._callCloudFunction({
                                      name: n,
                                      data: r,
                                    });
                                  }
                                  return new Promise(function (e, t) {
                                    var n = sn.call(d, { data: r });
                                    Te.request({
                                      method: "POST",
                                      url: f,
                                      data: {
                                        provider: c,
                                        platform: X,
                                        param: n,
                                      },
                                      success: function () {
                                        var n =
                                            arguments.length > 0 &&
                                            void 0 !== arguments[0]
                                              ? arguments[0]
                                              : {},
                                          r = n.statusCode,
                                          i = n.data;
                                        return !r || r >= 400
                                          ? t(
                                              new Pe({
                                                code: i.code || "SYS_ERR",
                                                message:
                                                  i.message || "request:fail",
                                              })
                                            )
                                          : e({ result: i });
                                      },
                                      fail: function (e) {
                                        t(
                                          new Pe({
                                            code:
                                              e.code || e.errCode || "SYS_ERR",
                                            message:
                                              e.message ||
                                              e.errMsg ||
                                              "request:fail",
                                          })
                                        );
                                      },
                                    });
                                  });
                                })
                            )
                          );
                        case 5:
                        case "end":
                          return e.stop();
                      }
                  },
                  e,
                  this
                );
              })
            )),
            un.apply(this, arguments)
          );
        }
        var ln = [
            {
              rule: /fc_function_not_found|FUNCTION_NOT_FOUND/,
              content:
                "，云函数[{functionName}]在云端不存在，请检查此云函数名称是否正确以及该云函数是否已上传到服务空间",
              mode: "append",
            },
          ],
          fn = /[\\^$.*+?()[\]{}|]/g,
          dn = RegExp(fn.source);
        function pn(e, t, n) {
          return e.replace(
            new RegExp((r = t) && dn.test(r) ? r.replace(fn, "\\$&") : r, "g"),
            n
          );
          var r;
        }
        var hn = "none",
          gn = "request",
          vn = "response",
          mn = "both",
          yn = (function () {
            function e() {
              var t =
                  arguments.length > 0 && void 0 !== arguments[0]
                    ? arguments[0]
                    : {},
                n = t.secretType,
                r = t.uniCloudIns;
              (0, m.default)(this, e),
                (this.clientType = ""),
                (this.secretType = n || hn),
                (this.uniCloudIns = r);
              var i,
                o = this.uniCloudIns.config,
                a = o.provider,
                s = o.spaceId;
              (this.provider = a),
                (this.spaceId = s),
                (this.scopedGlobalCache =
                  ((i = this.uniCloudIns),
                  re(
                    "_globalUniCloudSecureNetworkCache__{spaceId}".replace(
                      "{spaceId}",
                      i.config.spaceId
                    )
                  )));
            }
            return (0, y.default)(e, [
              {
                key: "getSystemInfo",
                value: function () {
                  return (
                    this._systemInfo || (this._systemInfo = je()),
                    this._systemInfo
                  );
                },
              },
              {
                key: "appId",
                get: function () {
                  return this.getSystemInfo().appId;
                },
              },
              {
                key: "deviceId",
                get: function () {
                  return this.getSystemInfo().deviceId;
                },
              },
              {
                key: "encryptData",
                value: (function () {
                  var e = (0, f.default)(
                    a.default.mark(function e(t) {
                      return a.default.wrap(
                        function (e) {
                          while (1)
                            switch ((e.prev = e.next)) {
                              case 0:
                                return e.abrupt(
                                  "return",
                                  this.secretType === hn
                                    ? t
                                    : this.platformEncryptData(t)
                                );
                              case 1:
                              case "end":
                                return e.stop();
                            }
                        },
                        e,
                        this
                      );
                    })
                  );
                  function t(t) {
                    return e.apply(this, arguments);
                  }
                  return t;
                })(),
              },
              {
                key: "decryptResult",
                value: (function () {
                  var e = (0, f.default)(
                    a.default.mark(function e(t) {
                      var n, r, i;
                      return a.default.wrap(
                        function (e) {
                          while (1)
                            switch ((e.prev = e.next)) {
                              case 0:
                                if (this.secretType !== hn) {
                                  e.next = 2;
                                  break;
                                }
                                return e.abrupt("return", t);
                              case 2:
                                return (
                                  (n = t || {}),
                                  (r = n.errCode),
                                  (i = n.content),
                                  e.abrupt(
                                    "return",
                                    r || !i
                                      ? t
                                      : this.secretType === gn
                                      ? i
                                      : this.platformDecryptResult(t)
                                  )
                                );
                              case 4:
                              case "end":
                                return e.stop();
                            }
                        },
                        e,
                        this
                      );
                    })
                  );
                  function t(t) {
                    return e.apply(this, arguments);
                  }
                  return t;
                })(),
              },
              {
                key: "wrapVerifyClientCallFunction",
                value: function (e) {
                  var t = this;
                  return (0, f.default)(
                    a.default.mark(function n() {
                      var r,
                        i,
                        o,
                        s,
                        c,
                        u = arguments;
                      return a.default.wrap(function (n) {
                        while (1)
                          switch ((n.prev = n.next)) {
                            case 0:
                              return (
                                (r =
                                  u.length > 0 && void 0 !== u[0] ? u[0] : {}),
                                (i = r.name),
                                (o = r.data),
                                (s = void 0 === o ? {} : o),
                                (n.next = 3),
                                t.prepare()
                              );
                            case 3:
                              return (n.next = 5), t.platformGetSignOption();
                            case 5:
                              return (
                                ((s = JSON.parse(
                                  JSON.stringify(s)
                                ))._uniCloudOptions = n.sent),
                                (n.next = 8),
                                e({ name: i, data: s })
                              );
                            case 8:
                              if (
                                ((c = n.sent),
                                (n.t0 = t.isClientKeyNotFound(c)),
                                !n.t0)
                              ) {
                                n.next = 19;
                                break;
                              }
                              return (
                                (n.next = 13), t.prepare({ forceUpdate: !0 })
                              );
                            case 13:
                              return (n.next = 15), t.platformGetSignOption();
                            case 15:
                              return (
                                (s._uniCloudOptions = n.sent),
                                (n.next = 18),
                                e({ name: i, data: s })
                              );
                            case 18:
                              c = n.sent;
                            case 19:
                              return n.abrupt("return", c);
                            case 20:
                            case "end":
                              return n.stop();
                          }
                      }, n);
                    })
                  );
                },
              },
              {
                key: "wrapEncryptDataCallFunction",
                value: function (e) {
                  var t = this;
                  return (0, f.default)(
                    a.default.mark(function n() {
                      var r,
                        i,
                        o,
                        s,
                        c,
                        u,
                        l,
                        f = arguments;
                      return a.default.wrap(function (n) {
                        while (1)
                          switch ((n.prev = n.next)) {
                            case 0:
                              return (
                                (r =
                                  f.length > 0 && void 0 !== f[0] ? f[0] : {}),
                                (i = r.name),
                                (o = r.data),
                                (s = void 0 === o ? {} : o),
                                (n.next = 3),
                                t.prepare()
                              );
                            case 3:
                              return (n.next = 5), t.encryptData(s);
                            case 5:
                              return (
                                (c = n.sent),
                                (n.next = 8),
                                e({ name: i, data: c })
                              );
                            case 8:
                              if (((u = n.sent), !t.isClientKeyNotFound(u))) {
                                n.next = 21;
                                break;
                              }
                              return (
                                (n.next = 12), t.prepare({ forceUpdate: !0 })
                              );
                            case 12:
                              return (n.next = 14), t.encryptData(s);
                            case 14:
                              return (
                                (l = n.sent),
                                (n.next = 17),
                                t.platformGetSignOption()
                              );
                            case 17:
                              return (
                                (s._uniCloudOptions = n.sent),
                                (n.next = 20),
                                e({ name: i, data: l })
                              );
                            case 20:
                              u = n.sent;
                            case 21:
                              return (n.next = 23), t.decryptResult(u.result);
                            case 23:
                              return (u.result = n.sent), n.abrupt("return", u);
                            case 25:
                            case "end":
                              return n.stop();
                          }
                      }, n);
                    })
                  );
                },
              },
            ]);
          })();
        /*! MIT License. Copyright 2015-2018 Richard Moore <me@ricmoo.com>. See LICENSE.txt. */
        function _n(e) {
          return parseInt(e) === e;
        }
        function bn(e) {
          if (!_n(e.length)) return !1;
          for (var t = 0; t < e.length; t++)
            if (!_n(e[t]) || e[t] < 0 || e[t] > 255) return !1;
          return !0;
        }
        function wn(e, t) {
          if (e.buffer && "Uint8Array" === e.name)
            return (
              t && (e = e.slice ? e.slice() : Array.prototype.slice.call(e)), e
            );
          if (Array.isArray(e)) {
            if (!bn(e)) throw new Error("Array contains invalid value: " + e);
            return new Uint8Array(e);
          }
          if (_n(e.length) && bn(e)) return new Uint8Array(e);
          throw new Error("unsupported array-like object");
        }
        function kn(e) {
          return new Uint8Array(e);
        }
        function xn(e, t, n, r, i) {
          (null == r && null == i) ||
            (e = e.slice ? e.slice(r, i) : Array.prototype.slice.call(e, r, i)),
            t.set(e, n);
        }
        var Sn,
          An = {
            toBytes: function (e) {
              var t = [],
                n = 0;
              for (e = encodeURI(e); n < e.length; ) {
                var r = e.charCodeAt(n++);
                37 === r
                  ? (t.push(parseInt(e.substr(n, 2), 16)), (n += 2))
                  : t.push(r);
              }
              return wn(t);
            },
            fromBytes: function (e) {
              for (var t = [], n = 0; n < e.length; ) {
                var r = e[n];
                r < 128
                  ? (t.push(String.fromCharCode(r)), n++)
                  : r > 191 && r < 224
                  ? (t.push(
                      String.fromCharCode(((31 & r) << 6) | (63 & e[n + 1]))
                    ),
                    (n += 2))
                  : (t.push(
                      String.fromCharCode(
                        ((15 & r) << 12) |
                          ((63 & e[n + 1]) << 6) |
                          (63 & e[n + 2])
                      )
                    ),
                    (n += 3));
              }
              return t.join("");
            },
          },
          In =
            ((Sn = "0123456789abcdef"),
            {
              toBytes: function (e) {
                for (var t = [], n = 0; n < e.length; n += 2)
                  t.push(parseInt(e.substr(n, 2), 16));
                return t;
              },
              fromBytes: function (e) {
                for (var t = [], n = 0; n < e.length; n++) {
                  var r = e[n];
                  t.push(Sn[(240 & r) >> 4] + Sn[15 & r]);
                }
                return t.join("");
              },
            }),
          On = { 16: 10, 24: 12, 32: 14 },
          Pn = [
            1, 2, 4, 8, 16, 32, 64, 128, 27, 54, 108, 216, 171, 77, 154, 47, 94,
            188, 99, 198, 151, 53, 106, 212, 179, 125, 250, 239, 197, 145,
          ],
          Tn = [
            99, 124, 119, 123, 242, 107, 111, 197, 48, 1, 103, 43, 254, 215,
            171, 118, 202, 130, 201, 125, 250, 89, 71, 240, 173, 212, 162, 175,
            156, 164, 114, 192, 183, 253, 147, 38, 54, 63, 247, 204, 52, 165,
            229, 241, 113, 216, 49, 21, 4, 199, 35, 195, 24, 150, 5, 154, 7, 18,
            128, 226, 235, 39, 178, 117, 9, 131, 44, 26, 27, 110, 90, 160, 82,
            59, 214, 179, 41, 227, 47, 132, 83, 209, 0, 237, 32, 252, 177, 91,
            106, 203, 190, 57, 74, 76, 88, 207, 208, 239, 170, 251, 67, 77, 51,
            133, 69, 249, 2, 127, 80, 60, 159, 168, 81, 163, 64, 143, 146, 157,
            56, 245, 188, 182, 218, 33, 16, 255, 243, 210, 205, 12, 19, 236, 95,
            151, 68, 23, 196, 167, 126, 61, 100, 93, 25, 115, 96, 129, 79, 220,
            34, 42, 144, 136, 70, 238, 184, 20, 222, 94, 11, 219, 224, 50, 58,
            10, 73, 6, 36, 92, 194, 211, 172, 98, 145, 149, 228, 121, 231, 200,
            55, 109, 141, 213, 78, 169, 108, 86, 244, 234, 101, 122, 174, 8,
            186, 120, 37, 46, 28, 166, 180, 198, 232, 221, 116, 31, 75, 189,
            139, 138, 112, 62, 181, 102, 72, 3, 246, 14, 97, 53, 87, 185, 134,
            193, 29, 158, 225, 248, 152, 17, 105, 217, 142, 148, 155, 30, 135,
            233, 206, 85, 40, 223, 140, 161, 137, 13, 191, 230, 66, 104, 65,
            153, 45, 15, 176, 84, 187, 22,
          ],
          Cn = [
            82, 9, 106, 213, 48, 54, 165, 56, 191, 64, 163, 158, 129, 243, 215,
            251, 124, 227, 57, 130, 155, 47, 255, 135, 52, 142, 67, 68, 196,
            222, 233, 203, 84, 123, 148, 50, 166, 194, 35, 61, 238, 76, 149, 11,
            66, 250, 195, 78, 8, 46, 161, 102, 40, 217, 36, 178, 118, 91, 162,
            73, 109, 139, 209, 37, 114, 248, 246, 100, 134, 104, 152, 22, 212,
            164, 92, 204, 93, 101, 182, 146, 108, 112, 72, 80, 253, 237, 185,
            218, 94, 21, 70, 87, 167, 141, 157, 132, 144, 216, 171, 0, 140, 188,
            211, 10, 247, 228, 88, 5, 184, 179, 69, 6, 208, 44, 30, 143, 202,
            63, 15, 2, 193, 175, 189, 3, 1, 19, 138, 107, 58, 145, 17, 65, 79,
            103, 220, 234, 151, 242, 207, 206, 240, 180, 230, 115, 150, 172,
            116, 34, 231, 173, 53, 133, 226, 249, 55, 232, 28, 117, 223, 110,
            71, 241, 26, 113, 29, 41, 197, 137, 111, 183, 98, 14, 170, 24, 190,
            27, 252, 86, 62, 75, 198, 210, 121, 32, 154, 219, 192, 254, 120,
            205, 90, 244, 31, 221, 168, 51, 136, 7, 199, 49, 177, 18, 16, 89,
            39, 128, 236, 95, 96, 81, 127, 169, 25, 181, 74, 13, 45, 229, 122,
            159, 147, 201, 156, 239, 160, 224, 59, 77, 174, 42, 245, 176, 200,
            235, 187, 60, 131, 83, 153, 97, 23, 43, 4, 126, 186, 119, 214, 38,
            225, 105, 20, 99, 85, 33, 12, 125,
          ],
          En = [
            3328402341, 4168907908, 4000806809, 4135287693, 4294111757,
            3597364157, 3731845041, 2445657428, 1613770832, 33620227,
            3462883241, 1445669757, 3892248089, 3050821474, 1303096294,
            3967186586, 2412431941, 528646813, 2311702848, 4202528135,
            4026202645, 2992200171, 2387036105, 4226871307, 1101901292,
            3017069671, 1604494077, 1169141738, 597466303, 1403299063,
            3832705686, 2613100635, 1974974402, 3791519004, 1033081774,
            1277568618, 1815492186, 2118074177, 4126668546, 2211236943,
            1748251740, 1369810420, 3521504564, 4193382664, 3799085459,
            2883115123, 1647391059, 706024767, 134480908, 2512897874,
            1176707941, 2646852446, 806885416, 932615841, 168101135, 798661301,
            235341577, 605164086, 461406363, 3756188221, 3454790438, 1311188841,
            2142417613, 3933566367, 302582043, 495158174, 1479289972, 874125870,
            907746093, 3698224818, 3025820398, 1537253627, 2756858614,
            1983593293, 3084310113, 2108928974, 1378429307, 3722699582,
            1580150641, 327451799, 2790478837, 3117535592, 0, 3253595436,
            1075847264, 3825007647, 2041688520, 3059440621, 3563743934,
            2378943302, 1740553945, 1916352843, 2487896798, 2555137236,
            2958579944, 2244988746, 3151024235, 3320835882, 1336584933,
            3992714006, 2252555205, 2588757463, 1714631509, 293963156,
            2319795663, 3925473552, 67240454, 4269768577, 2689618160,
            2017213508, 631218106, 1269344483, 2723238387, 1571005438,
            2151694528, 93294474, 1066570413, 563977660, 1882732616, 4059428100,
            1673313503, 2008463041, 2950355573, 1109467491, 537923632,
            3858759450, 4260623118, 3218264685, 2177748300, 403442708,
            638784309, 3287084079, 3193921505, 899127202, 2286175436, 773265209,
            2479146071, 1437050866, 4236148354, 2050833735, 3362022572,
            3126681063, 840505643, 3866325909, 3227541664, 427917720,
            2655997905, 2749160575, 1143087718, 1412049534, 999329963,
            193497219, 2353415882, 3354324521, 1807268051, 672404540,
            2816401017, 3160301282, 369822493, 2916866934, 3688947771,
            1681011286, 1949973070, 336202270, 2454276571, 201721354,
            1210328172, 3093060836, 2680341085, 3184776046, 1135389935,
            3294782118, 965841320, 831886756, 3554993207, 4068047243,
            3588745010, 2345191491, 1849112409, 3664604599, 26054028,
            2983581028, 2622377682, 1235855840, 3630984372, 2891339514,
            4092916743, 3488279077, 3395642799, 4101667470, 1202630377,
            268961816, 1874508501, 4034427016, 1243948399, 1546530418,
            941366308, 1470539505, 1941222599, 2546386513, 3421038627,
            2715671932, 3899946140, 1042226977, 2521517021, 1639824860,
            227249030, 260737669, 3765465232, 2084453954, 1907733956,
            3429263018, 2420656344, 100860677, 4160157185, 470683154,
            3261161891, 1781871967, 2924959737, 1773779408, 394692241,
            2579611992, 974986535, 664706745, 3655459128, 3958962195, 731420851,
            571543859, 3530123707, 2849626480, 126783113, 865375399, 765172662,
            1008606754, 361203602, 3387549984, 2278477385, 2857719295,
            1344809080, 2782912378, 59542671, 1503764984, 160008576, 437062935,
            1707065306, 3622233649, 2218934982, 3496503480, 2185314755,
            697932208, 1512910199, 504303377, 2075177163, 2824099068,
            1841019862, 739644986,
          ],
          jn = [
            2781242211, 2230877308, 2582542199, 2381740923, 234877682,
            3184946027, 2984144751, 1418839493, 1348481072, 50462977,
            2848876391, 2102799147, 434634494, 1656084439, 3863849899,
            2599188086, 1167051466, 2636087938, 1082771913, 2281340285,
            368048890, 3954334041, 3381544775, 201060592, 3963727277,
            1739838676, 4250903202, 3930435503, 3206782108, 4149453988,
            2531553906, 1536934080, 3262494647, 484572669, 2923271059,
            1783375398, 1517041206, 1098792767, 49674231, 1334037708,
            1550332980, 4098991525, 886171109, 150598129, 2481090929,
            1940642008, 1398944049, 1059722517, 201851908, 1385547719,
            1699095331, 1587397571, 674240536, 2704774806, 252314885,
            3039795866, 151914247, 908333586, 2602270848, 1038082786, 651029483,
            1766729511, 3447698098, 2682942837, 454166793, 2652734339,
            1951935532, 775166490, 758520603, 3000790638, 4004797018,
            4217086112, 4137964114, 1299594043, 1639438038, 3464344499,
            2068982057, 1054729187, 1901997871, 2534638724, 4121318227,
            1757008337, 0, 750906861, 1614815264, 535035132, 3363418545,
            3988151131, 3201591914, 1183697867, 3647454910, 1265776953,
            3734260298, 3566750796, 3903871064, 1250283471, 1807470800,
            717615087, 3847203498, 384695291, 3313910595, 3617213773,
            1432761139, 2484176261, 3481945413, 283769337, 100925954,
            2180939647, 4037038160, 1148730428, 3123027871, 3813386408,
            4087501137, 4267549603, 3229630528, 2315620239, 2906624658,
            3156319645, 1215313976, 82966005, 3747855548, 3245848246,
            1974459098, 1665278241, 807407632, 451280895, 251524083, 1841287890,
            1283575245, 337120268, 891687699, 801369324, 3787349855, 2721421207,
            3431482436, 959321879, 1469301956, 4065699751, 2197585534,
            1199193405, 2898814052, 3887750493, 724703513, 2514908019,
            2696962144, 2551808385, 3516813135, 2141445340, 1715741218,
            2119445034, 2872807568, 2198571144, 3398190662, 700968686,
            3547052216, 1009259540, 2041044702, 3803995742, 487983883,
            1991105499, 1004265696, 1449407026, 1316239930, 504629770,
            3683797321, 168560134, 1816667172, 3837287516, 1570751170,
            1857934291, 4014189740, 2797888098, 2822345105, 2754712981,
            936633572, 2347923833, 852879335, 1133234376, 1500395319,
            3084545389, 2348912013, 1689376213, 3533459022, 3762923945,
            3034082412, 4205598294, 133428468, 634383082, 2949277029,
            2398386810, 3913789102, 403703816, 3580869306, 2297460856,
            1867130149, 1918643758, 607656988, 4049053350, 3346248884,
            1368901318, 600565992, 2090982877, 2632479860, 557719327,
            3717614411, 3697393085, 2249034635, 2232388234, 2430627952,
            1115438654, 3295786421, 2865522278, 3633334344, 84280067, 33027830,
            303828494, 2747425121, 1600795957, 4188952407, 3496589753,
            2434238086, 1486471617, 658119965, 3106381470, 953803233, 334231800,
            3005978776, 857870609, 3151128937, 1890179545, 2298973838,
            2805175444, 3056442267, 574365214, 2450884487, 550103529,
            1233637070, 4289353045, 2018519080, 2057691103, 2399374476,
            4166623649, 2148108681, 387583245, 3664101311, 836232934,
            3330556482, 3100665960, 3280093505, 2955516313, 2002398509,
            287182607, 3413881008, 4238890068, 3597515707, 975967766,
          ],
          Ln = [
            1671808611, 2089089148, 2006576759, 2072901243, 4061003762,
            1807603307, 1873927791, 3310653893, 810573872, 16974337, 1739181671,
            729634347, 4263110654, 3613570519, 2883997099, 1989864566,
            3393556426, 2191335298, 3376449993, 2106063485, 4195741690,
            1508618841, 1204391495, 4027317232, 2917941677, 3563566036,
            2734514082, 2951366063, 2629772188, 2767672228, 1922491506,
            3227229120, 3082974647, 4246528509, 2477669779, 644500518,
            911895606, 1061256767, 4144166391, 3427763148, 878471220,
            2784252325, 3845444069, 4043897329, 1905517169, 3631459288,
            827548209, 356461077, 67897348, 3344078279, 593839651, 3277757891,
            405286936, 2527147926, 84871685, 2595565466, 118033927, 305538066,
            2157648768, 3795705826, 3945188843, 661212711, 2999812018,
            1973414517, 152769033, 2208177539, 745822252, 439235610, 455947803,
            1857215598, 1525593178, 2700827552, 1391895634, 994932283,
            3596728278, 3016654259, 695947817, 3812548067, 795958831,
            2224493444, 1408607827, 3513301457, 0, 3979133421, 543178784,
            4229948412, 2982705585, 1542305371, 1790891114, 3410398667,
            3201918910, 961245753, 1256100938, 1289001036, 1491644504,
            3477767631, 3496721360, 4012557807, 2867154858, 4212583931,
            1137018435, 1305975373, 861234739, 2241073541, 1171229253,
            4178635257, 33948674, 2139225727, 1357946960, 1011120188,
            2679776671, 2833468328, 1374921297, 2751356323, 1086357568,
            2408187279, 2460827538, 2646352285, 944271416, 4110742005,
            3168756668, 3066132406, 3665145818, 560153121, 271589392,
            4279952895, 4077846003, 3530407890, 3444343245, 202643468,
            322250259, 3962553324, 1608629855, 2543990167, 1154254916,
            389623319, 3294073796, 2817676711, 2122513534, 1028094525,
            1689045092, 1575467613, 422261273, 1939203699, 1621147744,
            2174228865, 1339137615, 3699352540, 577127458, 712922154,
            2427141008, 2290289544, 1187679302, 3995715566, 3100863416,
            339486740, 3732514782, 1591917662, 186455563, 3681988059,
            3762019296, 844522546, 978220090, 169743370, 1239126601, 101321734,
            611076132, 1558493276, 3260915650, 3547250131, 2901361580,
            1655096418, 2443721105, 2510565781, 3828863972, 2039214713,
            3878868455, 3359869896, 928607799, 1840765549, 2374762893,
            3580146133, 1322425422, 2850048425, 1823791212, 1459268694,
            4094161908, 3928346602, 1706019429, 2056189050, 2934523822,
            135794696, 3134549946, 2022240376, 628050469, 779246638, 472135708,
            2800834470, 3032970164, 3327236038, 3894660072, 3715932637,
            1956440180, 522272287, 1272813131, 3185336765, 2340818315,
            2323976074, 1888542832, 1044544574, 3049550261, 1722469478,
            1222152264, 50660867, 4127324150, 236067854, 1638122081, 895445557,
            1475980887, 3117443513, 2257655686, 3243809217, 489110045,
            2662934430, 3778599393, 4162055160, 2561878936, 288563729,
            1773916777, 3648039385, 2391345038, 2493985684, 2612407707,
            505560094, 2274497927, 3911240169, 3460925390, 1442818645,
            678973480, 3749357023, 2358182796, 2717407649, 2306869641,
            219617805, 3218761151, 3862026214, 1120306242, 1756942440,
            1103331905, 2578459033, 762796589, 252780047, 2966125488,
            1425844308, 3151392187, 372911126,
          ],
          Dn = [
            1667474886, 2088535288, 2004326894, 2071694838, 4075949567,
            1802223062, 1869591006, 3318043793, 808472672, 16843522, 1734846926,
            724270422, 4278065639, 3621216949, 2880169549, 1987484396,
            3402253711, 2189597983, 3385409673, 2105378810, 4210693615,
            1499065266, 1195886990, 4042263547, 2913856577, 3570689971,
            2728590687, 2947541573, 2627518243, 2762274643, 1920112356,
            3233831835, 3082273397, 4261223649, 2475929149, 640051788,
            909531756, 1061110142, 4160160501, 3435941763, 875846760,
            2779116625, 3857003729, 4059105529, 1903268834, 3638064043,
            825316194, 353713962, 67374088, 3351728789, 589522246, 3284360861,
            404236336, 2526454071, 84217610, 2593830191, 117901582, 303183396,
            2155911963, 3806477791, 3958056653, 656894286, 2998062463,
            1970642922, 151591698, 2206440989, 741110872, 437923380, 454765878,
            1852748508, 1515908788, 2694904667, 1381168804, 993742198,
            3604373943, 3014905469, 690584402, 3823320797, 791638366,
            2223281939, 1398011302, 3520161977, 0, 3991743681, 538992704,
            4244381667, 2981218425, 1532751286, 1785380564, 3419096717,
            3200178535, 960056178, 1246420628, 1280103576, 1482221744,
            3486468741, 3503319995, 4025428677, 2863326543, 4227536621,
            1128514950, 1296947098, 859002214, 2240123921, 1162203018,
            4193849577, 33687044, 2139062782, 1347481760, 1010582648,
            2678045221, 2829640523, 1364325282, 2745433693, 1077985408,
            2408548869, 2459086143, 2644360225, 943212656, 4126475505,
            3166494563, 3065430391, 3671750063, 555836226, 269496352,
            4294908645, 4092792573, 3537006015, 3452783745, 202118168,
            320025894, 3974901699, 1600119230, 2543297077, 1145359496,
            387397934, 3301201811, 2812801621, 2122220284, 1027426170,
            1684319432, 1566435258, 421079858, 1936954854, 1616945344,
            2172753945, 1330631070, 3705438115, 572679748, 707427924,
            2425400123, 2290647819, 1179044492, 4008585671, 3099120491,
            336870440, 3739122087, 1583276732, 185277718, 3688593069,
            3772791771, 842159716, 976899700, 168435220, 1229577106, 101059084,
            606366792, 1549591736, 3267517855, 3553849021, 2897014595,
            1650632388, 2442242105, 2509612081, 3840161747, 2038008818,
            3890688725, 3368567691, 926374254, 1835907034, 2374863873,
            3587531953, 1313788572, 2846482505, 1819063512, 1448540844,
            4109633523, 3941213647, 1701162954, 2054852340, 2930698567,
            134748176, 3132806511, 2021165296, 623210314, 774795868, 471606328,
            2795958615, 3031746419, 3334885783, 3907527627, 3722280097,
            1953799400, 522133822, 1263263126, 3183336545, 2341176845,
            2324333839, 1886425312, 1044267644, 3048588401, 1718004428,
            1212733584, 50529542, 4143317495, 235803164, 1633788866, 892690282,
            1465383342, 3115962473, 2256965911, 3250673817, 488449850,
            2661202215, 3789633753, 4177007595, 2560144171, 286339874,
            1768537042, 3654906025, 2391705863, 2492770099, 2610673197,
            505291324, 2273808917, 3924369609, 3469625735, 1431699370,
            673740880, 3755965093, 2358021891, 2711746649, 2307489801,
            218961690, 3217021541, 3873845719, 1111672452, 1751693520,
            1094828930, 2576986153, 757954394, 252645662, 2964376443,
            1414855848, 3149649517, 370555436,
          ],
          Mn = [
            1374988112, 2118214995, 437757123, 975658646, 1001089995, 530400753,
            2902087851, 1273168787, 540080725, 2910219766, 2295101073,
            4110568485, 1340463100, 3307916247, 641025152, 3043140495,
            3736164937, 632953703, 1172967064, 1576976609, 3274667266,
            2169303058, 2370213795, 1809054150, 59727847, 361929877, 3211623147,
            2505202138, 3569255213, 1484005843, 1239443753, 2395588676,
            1975683434, 4102977912, 2572697195, 666464733, 3202437046,
            4035489047, 3374361702, 2110667444, 1675577880, 3843699074,
            2538681184, 1649639237, 2976151520, 3144396420, 4269907996,
            4178062228, 1883793496, 2403728665, 2497604743, 1383856311,
            2876494627, 1917518562, 3810496343, 1716890410, 3001755655,
            800440835, 2261089178, 3543599269, 807962610, 599762354, 33778362,
            3977675356, 2328828971, 2809771154, 4077384432, 1315562145,
            1708848333, 101039829, 3509871135, 3299278474, 875451293,
            2733856160, 92987698, 2767645557, 193195065, 1080094634, 1584504582,
            3178106961, 1042385657, 2531067453, 3711829422, 1306967366,
            2438237621, 1908694277, 67556463, 1615861247, 429456164, 3602770327,
            2302690252, 1742315127, 2968011453, 126454664, 3877198648,
            2043211483, 2709260871, 2084704233, 4169408201, 0, 159417987,
            841739592, 504459436, 1817866830, 4245618683, 260388950, 1034867998,
            908933415, 168810852, 1750902305, 2606453969, 607530554, 202008497,
            2472011535, 3035535058, 463180190, 2160117071, 1641816226,
            1517767529, 470948374, 3801332234, 3231722213, 1008918595,
            303765277, 235474187, 4069246893, 766945465, 337553864, 1475418501,
            2943682380, 4003061179, 2743034109, 4144047775, 1551037884,
            1147550661, 1543208500, 2336434550, 3408119516, 3069049960,
            3102011747, 3610369226, 1113818384, 328671808, 2227573024,
            2236228733, 3535486456, 2935566865, 3341394285, 496906059,
            3702665459, 226906860, 2009195472, 733156972, 2842737049, 294930682,
            1206477858, 2835123396, 2700099354, 1451044056, 573804783,
            2269728455, 3644379585, 2362090238, 2564033334, 2801107407,
            2776292904, 3669462566, 1068351396, 742039012, 1350078989,
            1784663195, 1417561698, 4136440770, 2430122216, 775550814,
            2193862645, 2673705150, 1775276924, 1876241833, 3475313331,
            3366754619, 270040487, 3902563182, 3678124923, 3441850377,
            1851332852, 3969562369, 2203032232, 3868552805, 2868897406,
            566021896, 4011190502, 3135740889, 1248802510, 3936291284,
            699432150, 832877231, 708780849, 3332740144, 899835584, 1951317047,
            4236429990, 3767586992, 866637845, 4043610186, 1106041591,
            2144161806, 395441711, 1984812685, 1139781709, 3433712980,
            3835036895, 2664543715, 1282050075, 3240894392, 1181045119,
            2640243204, 25965917, 4203181171, 4211818798, 3009879386,
            2463879762, 3910161971, 1842759443, 2597806476, 933301370,
            1509430414, 3943906441, 3467192302, 3076639029, 3776767469,
            2051518780, 2631065433, 1441952575, 404016761, 1942435775,
            1408749034, 1610459739, 3745345300, 2017778566, 3400528769,
            3110650942, 941896748, 3265478751, 371049330, 3168937228, 675039627,
            4279080257, 967311729, 135050206, 3635733660, 1683407248,
            2076935265, 3576870512, 1215061108, 3501741890,
          ],
          Nn = [
            1347548327, 1400783205, 3273267108, 2520393566, 3409685355,
            4045380933, 2880240216, 2471224067, 1428173050, 4138563181,
            2441661558, 636813900, 4233094615, 3620022987, 2149987652,
            2411029155, 1239331162, 1730525723, 2554718734, 3781033664,
            46346101, 310463728, 2743944855, 3328955385, 3875770207, 2501218972,
            3955191162, 3667219033, 768917123, 3545789473, 692707433,
            1150208456, 1786102409, 2029293177, 1805211710, 3710368113,
            3065962831, 401639597, 1724457132, 3028143674, 409198410,
            2196052529, 1620529459, 1164071807, 3769721975, 2226875310,
            486441376, 2499348523, 1483753576, 428819965, 2274680428,
            3075636216, 598438867, 3799141122, 1474502543, 711349675, 129166120,
            53458370, 2592523643, 2782082824, 4063242375, 2988687269,
            3120694122, 1559041666, 730517276, 2460449204, 4042459122,
            2706270690, 3446004468, 3573941694, 533804130, 2328143614,
            2637442643, 2695033685, 839224033, 1973745387, 957055980,
            2856345839, 106852767, 1371368976, 4181598602, 1033297158,
            2933734917, 1179510461, 3046200461, 91341917, 1862534868,
            4284502037, 605657339, 2547432937, 3431546947, 2003294622,
            3182487618, 2282195339, 954669403, 3682191598, 1201765386,
            3917234703, 3388507166, 0, 2198438022, 1211247597, 2887651696,
            1315723890, 4227665663, 1443857720, 507358933, 657861945,
            1678381017, 560487590, 3516619604, 975451694, 2970356327, 261314535,
            3535072918, 2652609425, 1333838021, 2724322336, 1767536459,
            370938394, 182621114, 3854606378, 1128014560, 487725847, 185469197,
            2918353863, 3106780840, 3356761769, 2237133081, 1286567175,
            3152976349, 4255350624, 2683765030, 3160175349, 3309594171,
            878443390, 1988838185, 3704300486, 1756818940, 1673061617,
            3403100636, 272786309, 1075025698, 545572369, 2105887268,
            4174560061, 296679730, 1841768865, 1260232239, 4091327024,
            3960309330, 3497509347, 1814803222, 2578018489, 4195456072,
            575138148, 3299409036, 446754879, 3629546796, 4011996048,
            3347532110, 3252238545, 4270639778, 915985419, 3483825537,
            681933534, 651868046, 2755636671, 3828103837, 223377554, 2607439820,
            1649704518, 3270937875, 3901806776, 1580087799, 4118987695,
            3198115200, 2087309459, 2842678573, 3016697106, 1003007129,
            2802849917, 1860738147, 2077965243, 164439672, 4100872472, 32283319,
            2827177882, 1709610350, 2125135846, 136428751, 3874428392,
            3652904859, 3460984630, 3572145929, 3593056380, 2939266226,
            824852259, 818324884, 3224740454, 930369212, 2801566410, 2967507152,
            355706840, 1257309336, 4148292826, 243256656, 790073846, 2373340630,
            1296297904, 1422699085, 3756299780, 3818836405, 457992840,
            3099667487, 2135319889, 77422314, 1560382517, 1945798516, 788204353,
            1521706781, 1385356242, 870912086, 325965383, 2358957921,
            2050466060, 2388260884, 2313884476, 4006521127, 901210569,
            3990953189, 1014646705, 1503449823, 1062597235, 2031621326,
            3212035895, 3931371469, 1533017514, 350174575, 2256028891,
            2177544179, 1052338372, 741876788, 1606591296, 1914052035,
            213705253, 2334669897, 1107234197, 1899603969, 3725069491,
            2631447780, 2422494913, 1635502980, 1893020342, 1950903388,
            1120974935,
          ],
          Un = [
            2807058932, 1699970625, 2764249623, 1586903591, 1808481195,
            1173430173, 1487645946, 59984867, 4199882800, 1844882806,
            1989249228, 1277555970, 3623636965, 3419915562, 1149249077,
            2744104290, 1514790577, 459744698, 244860394, 3235995134,
            1963115311, 4027744588, 2544078150, 4190530515, 1608975247,
            2627016082, 2062270317, 1507497298, 2200818878, 567498868,
            1764313568, 3359936201, 2305455554, 2037970062, 1047239e3,
            1910319033, 1337376481, 2904027272, 2892417312, 984907214,
            1243112415, 830661914, 861968209, 2135253587, 2011214180,
            2927934315, 2686254721, 731183368, 1750626376, 4246310725,
            1820824798, 4172763771, 3542330227, 48394827, 2404901663,
            2871682645, 671593195, 3254988725, 2073724613, 145085239,
            2280796200, 2779915199, 1790575107, 2187128086, 472615631,
            3029510009, 4075877127, 3802222185, 4107101658, 3201631749,
            1646252340, 4270507174, 1402811438, 1436590835, 3778151818,
            3950355702, 3963161475, 4020912224, 2667994737, 273792366,
            2331590177, 104699613, 95345982, 3175501286, 2377486676, 1560637892,
            3564045318, 369057872, 4213447064, 3919042237, 1137477952,
            2658625497, 1119727848, 2340947849, 1530455833, 4007360968,
            172466556, 266959938, 516552836, 0, 2256734592, 3980931627,
            1890328081, 1917742170, 4294704398, 945164165, 3575528878,
            958871085, 3647212047, 2787207260, 1423022939, 775562294,
            1739656202, 3876557655, 2530391278, 2443058075, 3310321856,
            547512796, 1265195639, 437656594, 3121275539, 719700128, 3762502690,
            387781147, 218828297, 3350065803, 2830708150, 2848461854, 428169201,
            122466165, 3720081049, 1627235199, 648017665, 4122762354,
            1002783846, 2117360635, 695634755, 3336358691, 4234721005,
            4049844452, 3704280881, 2232435299, 574624663, 287343814, 612205898,
            1039717051, 840019705, 2708326185, 793451934, 821288114, 1391201670,
            3822090177, 376187827, 3113855344, 1224348052, 1679968233,
            2361698556, 1058709744, 752375421, 2431590963, 1321699145,
            3519142200, 2734591178, 188127444, 2177869557, 3727205754,
            2384911031, 3215212461, 2648976442, 2450346104, 3432737375,
            1180849278, 331544205, 3102249176, 4150144569, 2952102595,
            2159976285, 2474404304, 766078933, 313773861, 2570832044,
            2108100632, 1668212892, 3145456443, 2013908262, 418672217,
            3070356634, 2594734927, 1852171925, 3867060991, 3473416636,
            3907448597, 2614737639, 919489135, 164948639, 2094410160,
            2997825956, 590424639, 2486224549, 1723872674, 3157750862,
            3399941250, 3501252752, 3625268135, 2555048196, 3673637356,
            1343127501, 4130281361, 3599595085, 2957853679, 1297403050,
            81781910, 3051593425, 2283490410, 532201772, 1367295589, 3926170974,
            895287692, 1953757831, 1093597963, 492483431, 3528626907,
            1446242576, 1192455638, 1636604631, 209336225, 344873464,
            1015671571, 669961897, 3375740769, 3857572124, 2973530695,
            3747192018, 1933530610, 3464042516, 935293895, 3454686199,
            2858115069, 1863638845, 3683022916, 4085369519, 3292445032,
            875313188, 1080017571, 3279033885, 621591778, 1233856572,
            2504130317, 24197544, 3017672716, 3835484340, 3247465558,
            2220981195, 3060847922, 1551124588, 1463996600,
          ],
          Rn = [
            4104605777, 1097159550, 396673818, 660510266, 2875968315,
            2638606623, 4200115116, 3808662347, 821712160, 1986918061,
            3430322568, 38544885, 3856137295, 718002117, 893681702, 1654886325,
            2975484382, 3122358053, 3926825029, 4274053469, 796197571,
            1290801793, 1184342925, 3556361835, 2405426947, 2459735317,
            1836772287, 1381620373, 3196267988, 1948373848, 3764988233,
            3385345166, 3263785589, 2390325492, 1480485785, 3111247143,
            3780097726, 2293045232, 548169417, 3459953789, 3746175075,
            439452389, 1362321559, 1400849762, 1685577905, 1806599355,
            2174754046, 137073913, 1214797936, 1174215055, 3731654548,
            2079897426, 1943217067, 1258480242, 529487843, 1437280870,
            3945269170, 3049390895, 3313212038, 923313619, 679998e3, 3215307299,
            57326082, 377642221, 3474729866, 2041877159, 133361907, 1776460110,
            3673476453, 96392454, 878845905, 2801699524, 777231668, 4082475170,
            2330014213, 4142626212, 2213296395, 1626319424, 1906247262,
            1846563261, 562755902, 3708173718, 1040559837, 3871163981,
            1418573201, 3294430577, 114585348, 1343618912, 2566595609,
            3186202582, 1078185097, 3651041127, 3896688048, 2307622919,
            425408743, 3371096953, 2081048481, 1108339068, 2216610296, 0,
            2156299017, 736970802, 292596766, 1517440620, 251657213, 2235061775,
            2933202493, 758720310, 265905162, 1554391400, 1532285339, 908999204,
            174567692, 1474760595, 4002861748, 2610011675, 3234156416,
            3693126241, 2001430874, 303699484, 2478443234, 2687165888,
            585122620, 454499602, 151849742, 2345119218, 3064510765, 514443284,
            4044981591, 1963412655, 2581445614, 2137062819, 19308535,
            1928707164, 1715193156, 4219352155, 1126790795, 600235211,
            3992742070, 3841024952, 836553431, 1669664834, 2535604243,
            3323011204, 1243905413, 3141400786, 4180808110, 698445255,
            2653899549, 2989552604, 2253581325, 3252932727, 3004591147,
            1891211689, 2487810577, 3915653703, 4237083816, 4030667424,
            2100090966, 865136418, 1229899655, 953270745, 3399679628,
            3557504664, 4118925222, 2061379749, 3079546586, 2915017791,
            983426092, 2022837584, 1607244650, 2118541908, 2366882550,
            3635996816, 972512814, 3283088770, 1568718495, 3499326569,
            3576539503, 621982671, 2895723464, 410887952, 2623762152,
            1002142683, 645401037, 1494807662, 2595684844, 1335535747,
            2507040230, 4293295786, 3167684641, 367585007, 3885750714,
            1865862730, 2668221674, 2960971305, 2763173681, 1059270954,
            2777952454, 2724642869, 1320957812, 2194319100, 2429595872,
            2815956275, 77089521, 3973773121, 3444575871, 2448830231,
            1305906550, 4021308739, 2857194700, 2516901860, 3518358430,
            1787304780, 740276417, 1699839814, 1592394909, 2352307457,
            2272556026, 188821243, 1729977011, 3687994002, 274084841,
            3594982253, 3613494426, 2701949495, 4162096729, 322734571,
            2837966542, 1640576439, 484830689, 1202797690, 3537852828,
            4067639125, 349075736, 3342319475, 4157467219, 4255800159,
            1030690015, 1155237496, 2951971274, 1757691577, 607398968,
            2738905026, 499347990, 3794078908, 1011452712, 227885567,
            2818666809, 213114376, 3034881240, 1455525988, 3414450555,
            850817237, 1817998408, 3092726480,
          ],
          $n = [
            0, 235474187, 470948374, 303765277, 941896748, 908933415, 607530554,
            708780849, 1883793496, 2118214995, 1817866830, 1649639237,
            1215061108, 1181045119, 1417561698, 1517767529, 3767586992,
            4003061179, 4236429990, 4069246893, 3635733660, 3602770327,
            3299278474, 3400528769, 2430122216, 2664543715, 2362090238,
            2193862645, 2835123396, 2801107407, 3035535058, 3135740889,
            3678124923, 3576870512, 3341394285, 3374361702, 3810496343,
            3977675356, 4279080257, 4043610186, 2876494627, 2776292904,
            3076639029, 3110650942, 2472011535, 2640243204, 2403728665,
            2169303058, 1001089995, 899835584, 666464733, 699432150, 59727847,
            226906860, 530400753, 294930682, 1273168787, 1172967064, 1475418501,
            1509430414, 1942435775, 2110667444, 1876241833, 1641816226,
            2910219766, 2743034109, 2976151520, 3211623147, 2505202138,
            2606453969, 2302690252, 2269728455, 3711829422, 3543599269,
            3240894392, 3475313331, 3843699074, 3943906441, 4178062228,
            4144047775, 1306967366, 1139781709, 1374988112, 1610459739,
            1975683434, 2076935265, 1775276924, 1742315127, 1034867998,
            866637845, 566021896, 800440835, 92987698, 193195065, 429456164,
            395441711, 1984812685, 2017778566, 1784663195, 1683407248,
            1315562145, 1080094634, 1383856311, 1551037884, 101039829,
            135050206, 437757123, 337553864, 1042385657, 807962610, 573804783,
            742039012, 2531067453, 2564033334, 2328828971, 2227573024,
            2935566865, 2700099354, 3001755655, 3168937228, 3868552805,
            3902563182, 4203181171, 4102977912, 3736164937, 3501741890,
            3265478751, 3433712980, 1106041591, 1340463100, 1576976609,
            1408749034, 2043211483, 2009195472, 1708848333, 1809054150,
            832877231, 1068351396, 766945465, 599762354, 159417987, 126454664,
            361929877, 463180190, 2709260871, 2943682380, 3178106961,
            3009879386, 2572697195, 2538681184, 2236228733, 2336434550,
            3509871135, 3745345300, 3441850377, 3274667266, 3910161971,
            3877198648, 4110568485, 4211818798, 2597806476, 2497604743,
            2261089178, 2295101073, 2733856160, 2902087851, 3202437046,
            2968011453, 3936291284, 3835036895, 4136440770, 4169408201,
            3535486456, 3702665459, 3467192302, 3231722213, 2051518780,
            1951317047, 1716890410, 1750902305, 1113818384, 1282050075,
            1584504582, 1350078989, 168810852, 67556463, 371049330, 404016761,
            841739592, 1008918595, 775550814, 540080725, 3969562369, 3801332234,
            4035489047, 4269907996, 3569255213, 3669462566, 3366754619,
            3332740144, 2631065433, 2463879762, 2160117071, 2395588676,
            2767645557, 2868897406, 3102011747, 3069049960, 202008497, 33778362,
            270040487, 504459436, 875451293, 975658646, 675039627, 641025152,
            2084704233, 1917518562, 1615861247, 1851332852, 1147550661,
            1248802510, 1484005843, 1451044056, 933301370, 967311729, 733156972,
            632953703, 260388950, 25965917, 328671808, 496906059, 1206477858,
            1239443753, 1543208500, 1441952575, 2144161806, 1908694277,
            1675577880, 1842759443, 3610369226, 3644379585, 3408119516,
            3307916247, 4011190502, 3776767469, 4077384432, 4245618683,
            2809771154, 2842737049, 3144396420, 3043140495, 2673705150,
            2438237621, 2203032232, 2370213795,
          ],
          Fn = [
            0, 185469197, 370938394, 487725847, 741876788, 657861945, 975451694,
            824852259, 1483753576, 1400783205, 1315723890, 1164071807,
            1950903388, 2135319889, 1649704518, 1767536459, 2967507152,
            3152976349, 2801566410, 2918353863, 2631447780, 2547432937,
            2328143614, 2177544179, 3901806776, 3818836405, 4270639778,
            4118987695, 3299409036, 3483825537, 3535072918, 3652904859,
            2077965243, 1893020342, 1841768865, 1724457132, 1474502543,
            1559041666, 1107234197, 1257309336, 598438867, 681933534, 901210569,
            1052338372, 261314535, 77422314, 428819965, 310463728, 3409685355,
            3224740454, 3710368113, 3593056380, 3875770207, 3960309330,
            4045380933, 4195456072, 2471224067, 2554718734, 2237133081,
            2388260884, 3212035895, 3028143674, 2842678573, 2724322336,
            4138563181, 4255350624, 3769721975, 3955191162, 3667219033,
            3516619604, 3431546947, 3347532110, 2933734917, 2782082824,
            3099667487, 3016697106, 2196052529, 2313884476, 2499348523,
            2683765030, 1179510461, 1296297904, 1347548327, 1533017514,
            1786102409, 1635502980, 2087309459, 2003294622, 507358933,
            355706840, 136428751, 53458370, 839224033, 957055980, 605657339,
            790073846, 2373340630, 2256028891, 2607439820, 2422494913,
            2706270690, 2856345839, 3075636216, 3160175349, 3573941694,
            3725069491, 3273267108, 3356761769, 4181598602, 4063242375,
            4011996048, 3828103837, 1033297158, 915985419, 730517276, 545572369,
            296679730, 446754879, 129166120, 213705253, 1709610350, 1860738147,
            1945798516, 2029293177, 1239331162, 1120974935, 1606591296,
            1422699085, 4148292826, 4233094615, 3781033664, 3931371469,
            3682191598, 3497509347, 3446004468, 3328955385, 2939266226,
            2755636671, 3106780840, 2988687269, 2198438022, 2282195339,
            2501218972, 2652609425, 1201765386, 1286567175, 1371368976,
            1521706781, 1805211710, 1620529459, 2105887268, 1988838185,
            533804130, 350174575, 164439672, 46346101, 870912086, 954669403,
            636813900, 788204353, 2358957921, 2274680428, 2592523643,
            2441661558, 2695033685, 2880240216, 3065962831, 3182487618,
            3572145929, 3756299780, 3270937875, 3388507166, 4174560061,
            4091327024, 4006521127, 3854606378, 1014646705, 930369212,
            711349675, 560487590, 272786309, 457992840, 106852767, 223377554,
            1678381017, 1862534868, 1914052035, 2031621326, 1211247597,
            1128014560, 1580087799, 1428173050, 32283319, 182621114, 401639597,
            486441376, 768917123, 651868046, 1003007129, 818324884, 1503449823,
            1385356242, 1333838021, 1150208456, 1973745387, 2125135846,
            1673061617, 1756818940, 2970356327, 3120694122, 2802849917,
            2887651696, 2637442643, 2520393566, 2334669897, 2149987652,
            3917234703, 3799141122, 4284502037, 4100872472, 3309594171,
            3460984630, 3545789473, 3629546796, 2050466060, 1899603969,
            1814803222, 1730525723, 1443857720, 1560382517, 1075025698,
            1260232239, 575138148, 692707433, 878443390, 1062597235, 243256656,
            91341917, 409198410, 325965383, 3403100636, 3252238545, 3704300486,
            3620022987, 3874428392, 3990953189, 4042459122, 4227665663,
            2460449204, 2578018489, 2226875310, 2411029155, 3198115200,
            3046200461, 2827177882, 2743944855,
          ],
          Bn = [
            0, 218828297, 437656594, 387781147, 875313188, 958871085, 775562294,
            590424639, 1750626376, 1699970625, 1917742170, 2135253587,
            1551124588, 1367295589, 1180849278, 1265195639, 3501252752,
            3720081049, 3399941250, 3350065803, 3835484340, 3919042237,
            4270507174, 4085369519, 3102249176, 3051593425, 2734591178,
            2952102595, 2361698556, 2177869557, 2530391278, 2614737639,
            3145456443, 3060847922, 2708326185, 2892417312, 2404901663,
            2187128086, 2504130317, 2555048196, 3542330227, 3727205754,
            3375740769, 3292445032, 3876557655, 3926170974, 4246310725,
            4027744588, 1808481195, 1723872674, 1910319033, 2094410160,
            1608975247, 1391201670, 1173430173, 1224348052, 59984867, 244860394,
            428169201, 344873464, 935293895, 984907214, 766078933, 547512796,
            1844882806, 1627235199, 2011214180, 2062270317, 1507497298,
            1423022939, 1137477952, 1321699145, 95345982, 145085239, 532201772,
            313773861, 830661914, 1015671571, 731183368, 648017665, 3175501286,
            2957853679, 2807058932, 2858115069, 2305455554, 2220981195,
            2474404304, 2658625497, 3575528878, 3625268135, 3473416636,
            3254988725, 3778151818, 3963161475, 4213447064, 4130281361,
            3599595085, 3683022916, 3432737375, 3247465558, 3802222185,
            4020912224, 4172763771, 4122762354, 3201631749, 3017672716,
            2764249623, 2848461854, 2331590177, 2280796200, 2431590963,
            2648976442, 104699613, 188127444, 472615631, 287343814, 840019705,
            1058709744, 671593195, 621591778, 1852171925, 1668212892,
            1953757831, 2037970062, 1514790577, 1463996600, 1080017571,
            1297403050, 3673637356, 3623636965, 3235995134, 3454686199,
            4007360968, 3822090177, 4107101658, 4190530515, 2997825956,
            3215212461, 2830708150, 2779915199, 2256734592, 2340947849,
            2627016082, 2443058075, 172466556, 122466165, 273792366, 492483431,
            1047239e3, 861968209, 612205898, 695634755, 1646252340, 1863638845,
            2013908262, 1963115311, 1446242576, 1530455833, 1277555970,
            1093597963, 1636604631, 1820824798, 2073724613, 1989249228,
            1436590835, 1487645946, 1337376481, 1119727848, 164948639, 81781910,
            331544205, 516552836, 1039717051, 821288114, 669961897, 719700128,
            2973530695, 3157750862, 2871682645, 2787207260, 2232435299,
            2283490410, 2667994737, 2450346104, 3647212047, 3564045318,
            3279033885, 3464042516, 3980931627, 3762502690, 4150144569,
            4199882800, 3070356634, 3121275539, 2904027272, 2686254721,
            2200818878, 2384911031, 2570832044, 2486224549, 3747192018,
            3528626907, 3310321856, 3359936201, 3950355702, 3867060991,
            4049844452, 4234721005, 1739656202, 1790575107, 2108100632,
            1890328081, 1402811438, 1586903591, 1233856572, 1149249077,
            266959938, 48394827, 369057872, 418672217, 1002783846, 919489135,
            567498868, 752375421, 209336225, 24197544, 376187827, 459744698,
            945164165, 895287692, 574624663, 793451934, 1679968233, 1764313568,
            2117360635, 1933530610, 1343127501, 1560637892, 1243112415,
            1192455638, 3704280881, 3519142200, 3336358691, 3419915562,
            3907448597, 3857572124, 4075877127, 4294704398, 3029510009,
            3113855344, 2927934315, 2744104290, 2159976285, 2377486676,
            2594734927, 2544078150,
          ],
          qn = [
            0, 151849742, 303699484, 454499602, 607398968, 758720310, 908999204,
            1059270954, 1214797936, 1097159550, 1517440620, 1400849762,
            1817998408, 1699839814, 2118541908, 2001430874, 2429595872,
            2581445614, 2194319100, 2345119218, 3034881240, 3186202582,
            2801699524, 2951971274, 3635996816, 3518358430, 3399679628,
            3283088770, 4237083816, 4118925222, 4002861748, 3885750714,
            1002142683, 850817237, 698445255, 548169417, 529487843, 377642221,
            227885567, 77089521, 1943217067, 2061379749, 1640576439, 1757691577,
            1474760595, 1592394909, 1174215055, 1290801793, 2875968315,
            2724642869, 3111247143, 2960971305, 2405426947, 2253581325,
            2638606623, 2487810577, 3808662347, 3926825029, 4044981591,
            4162096729, 3342319475, 3459953789, 3576539503, 3693126241,
            1986918061, 2137062819, 1685577905, 1836772287, 1381620373,
            1532285339, 1078185097, 1229899655, 1040559837, 923313619,
            740276417, 621982671, 439452389, 322734571, 137073913, 19308535,
            3871163981, 4021308739, 4104605777, 4255800159, 3263785589,
            3414450555, 3499326569, 3651041127, 2933202493, 2815956275,
            3167684641, 3049390895, 2330014213, 2213296395, 2566595609,
            2448830231, 1305906550, 1155237496, 1607244650, 1455525988,
            1776460110, 1626319424, 2079897426, 1928707164, 96392454, 213114376,
            396673818, 514443284, 562755902, 679998e3, 865136418, 983426092,
            3708173718, 3557504664, 3474729866, 3323011204, 4180808110,
            4030667424, 3945269170, 3794078908, 2507040230, 2623762152,
            2272556026, 2390325492, 2975484382, 3092726480, 2738905026,
            2857194700, 3973773121, 3856137295, 4274053469, 4157467219,
            3371096953, 3252932727, 3673476453, 3556361835, 2763173681,
            2915017791, 3064510765, 3215307299, 2156299017, 2307622919,
            2459735317, 2610011675, 2081048481, 1963412655, 1846563261,
            1729977011, 1480485785, 1362321559, 1243905413, 1126790795,
            878845905, 1030690015, 645401037, 796197571, 274084841, 425408743,
            38544885, 188821243, 3613494426, 3731654548, 3313212038, 3430322568,
            4082475170, 4200115116, 3780097726, 3896688048, 2668221674,
            2516901860, 2366882550, 2216610296, 3141400786, 2989552604,
            2837966542, 2687165888, 1202797690, 1320957812, 1437280870,
            1554391400, 1669664834, 1787304780, 1906247262, 2022837584,
            265905162, 114585348, 499347990, 349075736, 736970802, 585122620,
            972512814, 821712160, 2595684844, 2478443234, 2293045232,
            2174754046, 3196267988, 3079546586, 2895723464, 2777952454,
            3537852828, 3687994002, 3234156416, 3385345166, 4142626212,
            4293295786, 3841024952, 3992742070, 174567692, 57326082, 410887952,
            292596766, 777231668, 660510266, 1011452712, 893681702, 1108339068,
            1258480242, 1343618912, 1494807662, 1715193156, 1865862730,
            1948373848, 2100090966, 2701949495, 2818666809, 3004591147,
            3122358053, 2235061775, 2352307457, 2535604243, 2653899549,
            3915653703, 3764988233, 4219352155, 4067639125, 3444575871,
            3294430577, 3746175075, 3594982253, 836553431, 953270745, 600235211,
            718002117, 367585007, 484830689, 133361907, 251657213, 2041877159,
            1891211689, 1806599355, 1654886325, 1568718495, 1418573201,
            1335535747, 1184342925,
          ];
        function Kn(e) {
          for (var t = [], n = 0; n < e.length; n += 4)
            t.push(
              (e[n] << 24) | (e[n + 1] << 16) | (e[n + 2] << 8) | e[n + 3]
            );
          return t;
        }
        var zn = (function () {
            function e(t) {
              if (((0, m.default)(this, e), !(this instanceof e)))
                throw Error("AES must be instanitated with `new`");
              Object.defineProperty(this, "key", { value: wn(t, !0) }),
                this._prepare();
            }
            return (0, y.default)(e, [
              {
                key: "_prepare",
                value: function () {
                  var e = On[this.key.length];
                  if (null == e)
                    throw new Error(
                      "invalid key size (must be 16, 24 or 32 bytes)"
                    );
                  (this._Ke = []), (this._Kd = []);
                  for (var t = 0; t <= e; t++)
                    this._Ke.push([0, 0, 0, 0]), this._Kd.push([0, 0, 0, 0]);
                  var n,
                    r = 4 * (e + 1),
                    i = this.key.length / 4,
                    o = Kn(this.key);
                  for (t = 0; t < i; t++)
                    (n = t >> 2),
                      (this._Ke[n][t % 4] = o[t]),
                      (this._Kd[e - n][t % 4] = o[t]);
                  for (var a, s = 0, c = i; c < r; ) {
                    if (
                      ((a = o[i - 1]),
                      (o[0] ^=
                        (Tn[(a >> 16) & 255] << 24) ^
                        (Tn[(a >> 8) & 255] << 16) ^
                        (Tn[255 & a] << 8) ^
                        Tn[(a >> 24) & 255] ^
                        (Pn[s] << 24)),
                      (s += 1),
                      8 != i)
                    )
                      for (t = 1; t < i; t++) o[t] ^= o[t - 1];
                    else {
                      for (t = 1; t < i / 2; t++) o[t] ^= o[t - 1];
                      for (
                        a = o[i / 2 - 1],
                          o[i / 2] ^=
                            Tn[255 & a] ^
                            (Tn[(a >> 8) & 255] << 8) ^
                            (Tn[(a >> 16) & 255] << 16) ^
                            (Tn[(a >> 24) & 255] << 24),
                          t = i / 2 + 1;
                        t < i;
                        t++
                      )
                        o[t] ^= o[t - 1];
                    }
                    for (t = 0; t < i && c < r; )
                      (u = c >> 2),
                        (l = c % 4),
                        (this._Ke[u][l] = o[t]),
                        (this._Kd[e - u][l] = o[t++]),
                        c++;
                  }
                  for (var u = 1; u < e; u++)
                    for (var l = 0; l < 4; l++)
                      (a = this._Kd[u][l]),
                        (this._Kd[u][l] =
                          $n[(a >> 24) & 255] ^
                          Fn[(a >> 16) & 255] ^
                          Bn[(a >> 8) & 255] ^
                          qn[255 & a]);
                },
              },
              {
                key: "encrypt",
                value: function (e) {
                  if (16 != e.length)
                    throw new Error(
                      "invalid plaintext size (must be 16 bytes)"
                    );
                  for (
                    var t = this._Ke.length - 1,
                      n = [0, 0, 0, 0],
                      r = Kn(e),
                      i = 0;
                    i < 4;
                    i++
                  )
                    r[i] ^= this._Ke[0][i];
                  for (var o = 1; o < t; o++) {
                    for (i = 0; i < 4; i++)
                      n[i] =
                        En[(r[i] >> 24) & 255] ^
                        jn[(r[(i + 1) % 4] >> 16) & 255] ^
                        Ln[(r[(i + 2) % 4] >> 8) & 255] ^
                        Dn[255 & r[(i + 3) % 4]] ^
                        this._Ke[o][i];
                    r = n.slice();
                  }
                  var a,
                    s = kn(16);
                  for (i = 0; i < 4; i++)
                    (a = this._Ke[t][i]),
                      (s[4 * i] = 255 & (Tn[(r[i] >> 24) & 255] ^ (a >> 24))),
                      (s[4 * i + 1] =
                        255 & (Tn[(r[(i + 1) % 4] >> 16) & 255] ^ (a >> 16))),
                      (s[4 * i + 2] =
                        255 & (Tn[(r[(i + 2) % 4] >> 8) & 255] ^ (a >> 8))),
                      (s[4 * i + 3] = 255 & (Tn[255 & r[(i + 3) % 4]] ^ a));
                  return s;
                },
              },
              {
                key: "decrypt",
                value: function (e) {
                  if (16 != e.length)
                    throw new Error(
                      "invalid ciphertext size (must be 16 bytes)"
                    );
                  for (
                    var t = this._Kd.length - 1,
                      n = [0, 0, 0, 0],
                      r = Kn(e),
                      i = 0;
                    i < 4;
                    i++
                  )
                    r[i] ^= this._Kd[0][i];
                  for (var o = 1; o < t; o++) {
                    for (i = 0; i < 4; i++)
                      n[i] =
                        Mn[(r[i] >> 24) & 255] ^
                        Nn[(r[(i + 3) % 4] >> 16) & 255] ^
                        Un[(r[(i + 2) % 4] >> 8) & 255] ^
                        Rn[255 & r[(i + 1) % 4]] ^
                        this._Kd[o][i];
                    r = n.slice();
                  }
                  var a,
                    s = kn(16);
                  for (i = 0; i < 4; i++)
                    (a = this._Kd[t][i]),
                      (s[4 * i] = 255 & (Cn[(r[i] >> 24) & 255] ^ (a >> 24))),
                      (s[4 * i + 1] =
                        255 & (Cn[(r[(i + 3) % 4] >> 16) & 255] ^ (a >> 16))),
                      (s[4 * i + 2] =
                        255 & (Cn[(r[(i + 2) % 4] >> 8) & 255] ^ (a >> 8))),
                      (s[4 * i + 3] = 255 & (Cn[255 & r[(i + 1) % 4]] ^ a));
                  return s;
                },
              },
            ]);
          })(),
          Vn = (function () {
            function e(t) {
              if (((0, m.default)(this, e), !(this instanceof e)))
                throw Error("AES must be instanitated with `new`");
              (this.description = "Electronic Code Block"),
                (this.name = "ecb"),
                (this._aes = new zn(t));
            }
            return (0, y.default)(e, [
              {
                key: "encrypt",
                value: function (e) {
                  if ((e = wn(e)).length % 16 != 0)
                    throw new Error(
                      "invalid plaintext size (must be multiple of 16 bytes)"
                    );
                  for (
                    var t = kn(e.length), n = kn(16), r = 0;
                    r < e.length;
                    r += 16
                  )
                    xn(e, n, 0, r, r + 16),
                      xn((n = this._aes.encrypt(n)), t, r);
                  return t;
                },
              },
              {
                key: "decrypt",
                value: function (e) {
                  if ((e = wn(e)).length % 16 != 0)
                    throw new Error(
                      "invalid ciphertext size (must be multiple of 16 bytes)"
                    );
                  for (
                    var t = kn(e.length), n = kn(16), r = 0;
                    r < e.length;
                    r += 16
                  )
                    xn(e, n, 0, r, r + 16),
                      xn((n = this._aes.decrypt(n)), t, r);
                  return t;
                },
              },
            ]);
          })(),
          Hn = (function () {
            function e(t, n) {
              if (((0, m.default)(this, e), !(this instanceof e)))
                throw Error("AES must be instanitated with `new`");
              if (
                ((this.description = "Cipher Block Chaining"),
                (this.name = "cbc"),
                n)
              ) {
                if (16 != n.length)
                  throw new Error(
                    "invalid initialation vector size (must be 16 bytes)"
                  );
              } else n = kn(16);
              (this._lastCipherblock = wn(n, !0)), (this._aes = new zn(t));
            }
            return (0, y.default)(e, [
              {
                key: "encrypt",
                value: function (e) {
                  if ((e = wn(e)).length % 16 != 0)
                    throw new Error(
                      "invalid plaintext size (must be multiple of 16 bytes)"
                    );
                  for (
                    var t = kn(e.length), n = kn(16), r = 0;
                    r < e.length;
                    r += 16
                  ) {
                    xn(e, n, 0, r, r + 16);
                    for (var i = 0; i < 16; i++)
                      n[i] ^= this._lastCipherblock[i];
                    (this._lastCipherblock = this._aes.encrypt(n)),
                      xn(this._lastCipherblock, t, r);
                  }
                  return t;
                },
              },
              {
                key: "decrypt",
                value: function (e) {
                  if ((e = wn(e)).length % 16 != 0)
                    throw new Error(
                      "invalid ciphertext size (must be multiple of 16 bytes)"
                    );
                  for (
                    var t = kn(e.length), n = kn(16), r = 0;
                    r < e.length;
                    r += 16
                  ) {
                    xn(e, n, 0, r, r + 16), (n = this._aes.decrypt(n));
                    for (var i = 0; i < 16; i++)
                      t[r + i] = n[i] ^ this._lastCipherblock[i];
                    xn(e, this._lastCipherblock, 0, r, r + 16);
                  }
                  return t;
                },
              },
            ]);
          })(),
          Wn = (function () {
            function e(t, n, r) {
              if (((0, m.default)(this, e), !(this instanceof e)))
                throw Error("AES must be instanitated with `new`");
              if (
                ((this.description = "Cipher Feedback"), (this.name = "cfb"), n)
              ) {
                if (16 != n.length)
                  throw new Error(
                    "invalid initialation vector size (must be 16 size)"
                  );
              } else n = kn(16);
              r || (r = 1),
                (this.segmentSize = r),
                (this._shiftRegister = wn(n, !0)),
                (this._aes = new zn(t));
            }
            return (0, y.default)(e, [
              {
                key: "encrypt",
                value: function (e) {
                  if (e.length % this.segmentSize != 0)
                    throw new Error(
                      "invalid plaintext size (must be segmentSize bytes)"
                    );
                  for (
                    var t, n = wn(e, !0), r = 0;
                    r < n.length;
                    r += this.segmentSize
                  ) {
                    t = this._aes.encrypt(this._shiftRegister);
                    for (var i = 0; i < this.segmentSize; i++) n[r + i] ^= t[i];
                    xn(
                      this._shiftRegister,
                      this._shiftRegister,
                      0,
                      this.segmentSize
                    ),
                      xn(
                        n,
                        this._shiftRegister,
                        16 - this.segmentSize,
                        r,
                        r + this.segmentSize
                      );
                  }
                  return n;
                },
              },
              {
                key: "decrypt",
                value: function (e) {
                  if (e.length % this.segmentSize != 0)
                    throw new Error(
                      "invalid ciphertext size (must be segmentSize bytes)"
                    );
                  for (
                    var t, n = wn(e, !0), r = 0;
                    r < n.length;
                    r += this.segmentSize
                  ) {
                    t = this._aes.encrypt(this._shiftRegister);
                    for (var i = 0; i < this.segmentSize; i++) n[r + i] ^= t[i];
                    xn(
                      this._shiftRegister,
                      this._shiftRegister,
                      0,
                      this.segmentSize
                    ),
                      xn(
                        e,
                        this._shiftRegister,
                        16 - this.segmentSize,
                        r,
                        r + this.segmentSize
                      );
                  }
                  return n;
                },
              },
            ]);
          })(),
          Jn = (function () {
            function e(t, n) {
              if (((0, m.default)(this, e), !(this instanceof e)))
                throw Error("AES must be instanitated with `new`");
              if (
                ((this.description = "Output Feedback"), (this.name = "ofb"), n)
              ) {
                if (16 != n.length)
                  throw new Error(
                    "invalid initialation vector size (must be 16 bytes)"
                  );
              } else n = kn(16);
              (this._lastPrecipher = wn(n, !0)),
                (this._lastPrecipherIndex = 16),
                (this._aes = new zn(t));
            }
            return (0, y.default)(e, [
              {
                key: "encrypt",
                value: function (e) {
                  for (var t = wn(e, !0), n = 0; n < t.length; n++)
                    16 === this._lastPrecipherIndex &&
                      ((this._lastPrecipher = this._aes.encrypt(
                        this._lastPrecipher
                      )),
                      (this._lastPrecipherIndex = 0)),
                      (t[n] ^= this._lastPrecipher[this._lastPrecipherIndex++]);
                  return t;
                },
              },
              {
                key: "decrypt",
                value: function (e) {
                  return this.encrypt(e);
                },
              },
            ]);
          })(),
          Gn = (function () {
            function e(t) {
              if (((0, m.default)(this, e), !(this instanceof e)))
                throw Error("Counter must be instanitated with `new`");
              0 === t || t || (t = 1),
                "number" == typeof t
                  ? ((this._counter = kn(16)), this.setValue(t))
                  : this.setBytes(t);
            }
            return (0, y.default)(e, [
              {
                key: "setValue",
                value: function (e) {
                  if ("number" != typeof e || parseInt(e) != e)
                    throw new Error(
                      "invalid counter value (must be an integer)"
                    );
                  if (e > Number.MAX_SAFE_INTEGER)
                    throw new Error("integer value out of safe range");
                  for (var t = 15; t >= 0; --t)
                    (this._counter[t] = e % 256), (e = parseInt(e / 256));
                },
              },
              {
                key: "setBytes",
                value: function (e) {
                  if (16 != (e = wn(e, !0)).length)
                    throw new Error(
                      "invalid counter bytes size (must be 16 bytes)"
                    );
                  this._counter = e;
                },
              },
              {
                key: "increment",
                value: function () {
                  for (var e = 15; e >= 0; e--) {
                    if (255 !== this._counter[e]) {
                      this._counter[e]++;
                      break;
                    }
                    this._counter[e] = 0;
                  }
                },
              },
            ]);
          })(),
          Yn = (function () {
            function e(t, n) {
              if (((0, m.default)(this, e), !(this instanceof e)))
                throw Error("AES must be instanitated with `new`");
              (this.description = "Counter"),
                (this.name = "ctr"),
                n instanceof Gn || (n = new Gn(n)),
                (this._counter = n),
                (this._remainingCounter = null),
                (this._remainingCounterIndex = 16),
                (this._aes = new zn(t));
            }
            return (0, y.default)(e, [
              {
                key: "encrypt",
                value: function (e) {
                  for (var t = wn(e, !0), n = 0; n < t.length; n++)
                    16 === this._remainingCounterIndex &&
                      ((this._remainingCounter = this._aes.encrypt(
                        this._counter._counter
                      )),
                      (this._remainingCounterIndex = 0),
                      this._counter.increment()),
                      (t[n] ^=
                        this._remainingCounter[this._remainingCounterIndex++]);
                  return t;
                },
              },
              {
                key: "decrypt",
                value: function (e) {
                  return this.encrypt(e);
                },
              },
            ]);
          })(),
          Zn = {
            AES: zn,
            Counter: Gn,
            ModeOfOperation: { ecb: Vn, cbc: Hn, cfb: Wn, ofb: Jn, ctr: Yn },
            utils: { hex: In, utf8: An },
            padding: {
              pkcs7: {
                pad: function (e) {
                  var t = 16 - ((e = wn(e, !0)).length % 16),
                    n = kn(e.length + t);
                  xn(e, n);
                  for (var r = e.length; r < n.length; r++) n[r] = t;
                  return n;
                },
                strip: function (e) {
                  if ((e = wn(e, !0)).length < 16)
                    throw new Error("PKCS#7 invalid length");
                  var t = e[e.length - 1];
                  if (t > 16)
                    throw new Error("PKCS#7 padding byte out of range");
                  for (var n = e.length - t, r = 0; r < t; r++)
                    if (e[n + r] !== t)
                      throw new Error("PKCS#7 invalid padding byte");
                  var i = kn(n);
                  return xn(e, i, 0, 0, n), i;
                },
              },
            },
            _arrayTest: { coerceArray: wn, createArray: kn, copyArray: xn },
          };
        function Xn(e, t, n) {
          var i = new Uint8Array(r.base64ToArrayBuffer(t)),
            o = Zn.utils.utf8.toBytes(n),
            a = Zn.utils.utf8.toBytes(e),
            s = new Zn.ModeOfOperation.cbc(i, o),
            c = Zn.padding.pkcs7.pad(a),
            u = s.encrypt(c);
          return r.arrayBufferToBase64(u);
        }
        var Qn = { code: 2e4, message: "System error" },
          er = { code: 20101, message: "Invalid client" },
          tr = { code: 20102, message: "Get encrypt key failed" },
          nr = {
            10001:
              "Secure network is not supported on current playground or unimpsdk",
            10003:
              "Config missing in current app. If the problem pesist, please contact DCloud.",
            10009: "Encrypt payload failed",
            10010: "Decrypt response failed",
          };
        function rr(e) {
          var t = e || {},
            n = t.errSubject,
            r = t.subject,
            i = t.errCode,
            o = t.errMsg,
            a = t.code,
            s = t.message,
            c = t.cause;
          return new Pe({
            subject: n || r || "uni-secure-network",
            code: i || a || Qn.code,
            message: o || s,
            cause: c,
          });
        }
        var ir,
          or,
          ar = null,
          sr = (function (e) {
            function t(e) {
              var n;
              return (
                (0, m.default)(this, t),
                (n = A(this, t, [e])),
                (n.clientType = "mp-weixin"),
                (n.userEncryptKey = null),
                n
              );
            }
            return (
              (0, g.default)(t, e),
              (0, y.default)(t, [
                {
                  key: "isLogin",
                  value: function () {
                    return (
                      !!this.scopedGlobalCache.mpWeixinCode ||
                      !!this.scopedGlobalCache.mpWeixinOpenid
                    );
                  },
                },
                {
                  key: "prepare",
                  value: (function () {
                    var e = (0, f.default)(
                      a.default.mark(function e() {
                        return a.default.wrap(
                          function (e) {
                            while (1)
                              switch ((e.prev = e.next)) {
                                case 0:
                                  if (this.isLogin()) {
                                    e.next = 7;
                                    break;
                                  }
                                  if (this.scopedGlobalCache.initPromise) {
                                    e.next = 3;
                                    break;
                                  }
                                  throw new Error(
                                    "`uniCloud.initSecureNetworkByWeixin` has not yet been called"
                                  );
                                case 3:
                                  return (
                                    (e.next = 5),
                                    this.scopedGlobalCache.initPromise
                                  );
                                case 5:
                                  if (this.isLogin()) {
                                    e.next = 7;
                                    break;
                                  }
                                  throw new Error(
                                    "uniCloud.initSecureNetworkByWeixin` has not yet been called or successfully excuted"
                                  );
                                case 7:
                                case "end":
                                  return e.stop();
                              }
                          },
                          e,
                          this
                        );
                      })
                    );
                    function t() {
                      return e.apply(this, arguments);
                    }
                    return t;
                  })(),
                },
                {
                  key: "getUserEncryptKey",
                  value: (function () {
                    var e = (0, f.default)(
                      a.default.mark(function e() {
                        var t,
                          n = this;
                        return a.default.wrap(
                          function (e) {
                            while (1)
                              switch ((e.prev = e.next)) {
                                case 0:
                                  if (!this.userEncryptKey) {
                                    e.next = 2;
                                    break;
                                  }
                                  return e.abrupt(
                                    "return",
                                    this.userEncryptKey
                                  );
                                case 2:
                                  if (!ar || !ar.expireTime) {
                                    e.next = 6;
                                    break;
                                  }
                                  if (
                                    ((t = Date.now()), !(ar.expireTime - t > 0))
                                  ) {
                                    e.next = 6;
                                    break;
                                  }
                                  return e.abrupt(
                                    "return",
                                    ((this.userEncryptKey = ar),
                                    this.userEncryptKey)
                                  );
                                case 6:
                                  return e.abrupt(
                                    "return",
                                    new Promise(function (e, t) {
                                      r.getUserCryptoManager().getLatestUserKey(
                                        {
                                          success: function (t) {
                                            (ar = t),
                                              (n.userEncryptKey = t),
                                              e(n.userEncryptKey);
                                          },
                                          fail: function (e) {
                                            t(
                                              rr(S(S({}, tr), {}, { cause: e }))
                                            );
                                          },
                                        }
                                      );
                                    })
                                  );
                                case 7:
                                case "end":
                                  return e.stop();
                              }
                          },
                          e,
                          this
                        );
                      })
                    );
                    function t() {
                      return e.apply(this, arguments);
                    }
                    return t;
                  })(),
                },
                {
                  key: "getWxAppId",
                  value: function () {
                    return i.getAccountInfoSync().miniProgram.appId;
                  },
                },
                {
                  key: "platformGetSignOption",
                  value: (function () {
                    var e = (0, f.default)(
                      a.default.mark(function e() {
                        var t, n, r, i;
                        return a.default.wrap(
                          function (e) {
                            while (1)
                              switch ((e.prev = e.next)) {
                                case 0:
                                  return (e.next = 2), this.getUserEncryptKey();
                                case 2:
                                  return (
                                    (t = e.sent),
                                    (n = t.encryptKey),
                                    (r = t.iv),
                                    (i = t.version),
                                    e.abrupt("return", {
                                      verifyClientSign: Xn(
                                        JSON.stringify({
                                          data: JSON.stringify({}),
                                          appId: this.appId,
                                          deviceId: this.deviceId,
                                          wxAppId: this.getWxAppId(),
                                          simulator:
                                            "devtools" === je().platform,
                                          timestamp: Date.now(),
                                        }),
                                        n,
                                        r
                                      ),
                                      encryptKeyId: i,
                                      mpWeixinCode:
                                        this.scopedGlobalCache.mpWeixinCode,
                                      mpWeixinOpenid:
                                        this.scopedGlobalCache.mpWeixinOpenid,
                                    })
                                  );
                                case 7:
                                case "end":
                                  return e.stop();
                              }
                          },
                          e,
                          this
                        );
                      })
                    );
                    function t() {
                      return e.apply(this, arguments);
                    }
                    return t;
                  })(),
                },
                {
                  key: "platformEncryptData",
                  value: (function () {
                    var e = (0, f.default)(
                      a.default.mark(function e(t) {
                        var n, r, i, o, s;
                        return a.default.wrap(
                          function (e) {
                            while (1)
                              switch ((e.prev = e.next)) {
                                case 0:
                                  return (e.next = 2), this.getUserEncryptKey();
                                case 2:
                                  return (
                                    (n = e.sent),
                                    (r = n.encryptKey),
                                    (i = n.iv),
                                    (o = n.version),
                                    (s = {
                                      secretType: this.secretType,
                                      encryptKeyId: o,
                                      mpWeixinCode:
                                        this.scopedGlobalCache.mpWeixinCode,
                                      mpWeixinOpenid:
                                        this.scopedGlobalCache.mpWeixinOpenid,
                                    }),
                                    e.abrupt(
                                      "return",
                                      this.secretType === vn
                                        ? { content: t, _uniCloudOptions: s }
                                        : {
                                            content: Xn(
                                              JSON.stringify({
                                                data: JSON.stringify(t),
                                                appId: this.appId,
                                                deviceId: this.deviceId,
                                                wxAppId: this.getWxAppId(),
                                                simulator:
                                                  "devtools" === je().platform,
                                                timestamp: Date.now(),
                                              }),
                                              r,
                                              i
                                            ),
                                            _uniCloudOptions: s,
                                          }
                                    )
                                  );
                                case 8:
                                case "end":
                                  return e.stop();
                              }
                          },
                          e,
                          this
                        );
                      })
                    );
                    function t(t) {
                      return e.apply(this, arguments);
                    }
                    return t;
                  })(),
                },
                {
                  key: "platformDecryptResult",
                  value: (function () {
                    var e = (0, f.default)(
                      a.default.mark(function e(t) {
                        var n, i, o, s;
                        return a.default.wrap(
                          function (e) {
                            while (1)
                              switch ((e.prev = e.next)) {
                                case 0:
                                  return (
                                    (n = t.content),
                                    (e.next = 3),
                                    this.getUserEncryptKey()
                                  );
                                case 3:
                                  return (
                                    (i = e.sent),
                                    (o = i.encryptKey),
                                    (s = i.iv),
                                    e.abrupt(
                                      "return",
                                      JSON.parse(
                                        (function (e, t, n) {
                                          var i = new Uint8Array(
                                              r.base64ToArrayBuffer(e)
                                            ),
                                            o = new Uint8Array(
                                              r.base64ToArrayBuffer(t)
                                            ),
                                            a = Zn.utils.utf8.toBytes(n),
                                            s = new Zn.ModeOfOperation.cbc(
                                              o,
                                              a
                                            ),
                                            c = Zn.padding.pkcs7.strip(
                                              s.decrypt(i)
                                            );
                                          return Zn.utils.utf8.fromBytes(c);
                                        })(n, o, s)
                                      )
                                    )
                                  );
                                case 7:
                                case "end":
                                  return e.stop();
                              }
                          },
                          e,
                          this
                        );
                      })
                    );
                    function t(t) {
                      return e.apply(this, arguments);
                    }
                    return t;
                  })(),
                },
                {
                  key: "isClientKeyNotFound",
                  value: function () {
                    return !1;
                  },
                },
              ])
            );
          })(yn);
        function cr(e) {
          for (
            var t = [
                "hasClientKey",
                "encryptGetClientKeyPayload",
                "setClientKey",
                "encrypt",
                "decrypt",
              ],
              n = {},
              r = function () {
                var r = t[i];
                n[r] = function () {
                  for (
                    var t = arguments.length, n = new Array(t), i = 0;
                    i < t;
                    i++
                  )
                    n[i] = arguments[i];
                  return new Promise(function (t, i) {
                    "function" == typeof e[r]
                      ? e[r].apply(
                          e,
                          n.concat([
                            function () {
                              var e =
                                  arguments.length > 0 &&
                                  void 0 !== arguments[0]
                                    ? arguments[0]
                                    : {},
                                n = e.type,
                                r = e.data,
                                o = e.errCode,
                                a = e.errMsg,
                                s = e.errSubject,
                                c = e.message;
                              "success" === n
                                ? t(r)
                                : i(
                                    rr({
                                      errCode: o,
                                      errMsg: nr[o] || a || c,
                                      errSubject: s,
                                    })
                                  );
                            },
                          ])
                        )
                      : i(
                          rr({
                            message:
                              "请检查manifest.json内是否开启安全网络模块，另外注意标准基座不支持安全网络模块",
                          })
                        );
                  });
                };
              },
              i = 0;
            i < t.length;
            i++
          )
            r();
          return n;
        }
        var ur = (function (e) {
          function t(e) {
            var n;
            return (
              (0, m.default)(this, t),
              (n = A(this, t, [e])),
              (n.clientType = "app"),
              (n.appUtils = S({}, cr(r.requireNativePlugin("plus")))),
              (n.systemInfo = ir || (ir = je())),
              n
            );
          }
          return (
            (0, g.default)(t, e),
            (0, y.default)(t, [
              {
                key: "hasClientKey",
                value: (function () {
                  var e = (0, f.default)(
                    a.default.mark(function e() {
                      return a.default.wrap(
                        function (e) {
                          while (1)
                            switch ((e.prev = e.next)) {
                              case 0:
                                return (
                                  (e.next = 2),
                                  this.appUtils.hasClientKey({
                                    provider: this.provider,
                                    spaceId: this.spaceId,
                                  })
                                );
                              case 2:
                                return (
                                  (this._hasClientKey = e.sent),
                                  e.abrupt("return", this._hasClientKey)
                                );
                              case 4:
                              case "end":
                                return e.stop();
                            }
                        },
                        e,
                        this
                      );
                    })
                  );
                  function t() {
                    return e.apply(this, arguments);
                  }
                  return t;
                })(),
              },
              {
                key: "getAppClientKey",
                value: (function () {
                  var e = (0, f.default)(
                    a.default.mark(function e() {
                      var t, n, r, i, o, s;
                      return a.default.wrap(
                        function (e) {
                          while (1)
                            switch ((e.prev = e.next)) {
                              case 0:
                                return (
                                  (e.next = 2),
                                  this.appUtils.encryptGetClientKeyPayload({
                                    data: JSON.stringify({}),
                                  })
                                );
                              case 2:
                                return (
                                  (t = e.sent),
                                  (n = t.data),
                                  (r = t.key),
                                  (e.next = 7),
                                  this.uniCloudIns.callFunction({
                                    name: "DCloud-clientDB",
                                    data: {
                                      redirectTo: "encryption",
                                      action: "getAppClientKey",
                                      data: n,
                                      key: r,
                                    },
                                  })
                                );
                              case 7:
                                if (((e.t0 = e.sent.result), e.t0)) {
                                  e.next = 10;
                                  break;
                                }
                                e.t0 = {};
                              case 10:
                                if (((i = e.t0), 0 === i.errCode)) {
                                  e.next = 13;
                                  break;
                                }
                                throw (function (e) {
                                  return new Pe({
                                    subject:
                                      e.errSubject || "uni-secure-network",
                                    code: e.errCode || e.code || Qn.code,
                                    message: e.errMsg || e.message,
                                  });
                                })(i);
                              case 13:
                                return (
                                  (o = i.clientKey),
                                  (s = i.key),
                                  (e.next = 16),
                                  this.appUtils.setClientKey({
                                    provider: this.provider,
                                    spaceId: this.spaceId,
                                    clientKey: o,
                                    key: s,
                                  })
                                );
                              case 16:
                              case "end":
                                return e.stop();
                            }
                        },
                        e,
                        this
                      );
                    })
                  );
                  function t() {
                    return e.apply(this, arguments);
                  }
                  return t;
                })(),
              },
              {
                key: "ensureClientKey",
                value: (function () {
                  var e = (0, f.default)(
                    a.default.mark(function e() {
                      var t,
                        n,
                        r,
                        i = this,
                        o = arguments;
                      return a.default.wrap(
                        function (e) {
                          while (1)
                            switch ((e.prev = e.next)) {
                              case 0:
                                return (
                                  (t =
                                    o.length > 0 && void 0 !== o[0]
                                      ? o[0]
                                      : {}),
                                  (n = t.forceUpdate),
                                  (r = void 0 !== n && n),
                                  (e.t1 = !0),
                                  (e.next = 4),
                                  this.hasClientKey()
                                );
                              case 4:
                                if (
                                  ((e.t2 = e.sent),
                                  (e.t0 = e.t1 !== e.t2),
                                  e.t0)
                                ) {
                                  e.next = 8;
                                  break;
                                }
                                e.t0 = r;
                              case 8:
                                if (!e.t0) {
                                  e.next = 10;
                                  break;
                                }
                                return e.abrupt(
                                  "return",
                                  ((r &&
                                    this.scopedGlobalCache.initPromise &&
                                    this.scopedGlobalCache.initStatus === U) ||
                                    (!r &&
                                      this.scopedGlobalCache.initPromise &&
                                      this.scopedGlobalCache.initStatus !==
                                        $) ||
                                    ((this.scopedGlobalCache.initPromise =
                                      this.getAppClientKey()),
                                    this.scopedGlobalCache.initPromise
                                      .then(function (e) {
                                        i.scopedGlobalCache.initStatus = R;
                                      })
                                      .catch(function (e) {
                                        throw (
                                          ((i.scopedGlobalCache.initStatus = $),
                                          e)
                                        );
                                      }),
                                    (this.scopedGlobalCache.initStatus = U)),
                                  this.scopedGlobalCache.initPromise)
                                );
                              case 10:
                              case "end":
                                return e.stop();
                            }
                        },
                        e,
                        this
                      );
                    })
                  );
                  function t() {
                    return e.apply(this, arguments);
                  }
                  return t;
                })(),
              },
              {
                key: "prepare",
                value: (function () {
                  var e = (0, f.default)(
                    a.default.mark(function e() {
                      var t,
                        n,
                        r,
                        i = arguments;
                      return a.default.wrap(
                        function (e) {
                          while (1)
                            switch ((e.prev = e.next)) {
                              case 0:
                                return (
                                  (t =
                                    i.length > 0 && void 0 !== i[0]
                                      ? i[0]
                                      : {}),
                                  (n = t.forceUpdate),
                                  (r = void 0 !== n && n),
                                  (e.next = 3),
                                  this.ensureClientKey({ forceUpdate: r })
                                );
                              case 3:
                              case "end":
                                return e.stop();
                            }
                        },
                        e,
                        this
                      );
                    })
                  );
                  function t() {
                    return e.apply(this, arguments);
                  }
                  return t;
                })(),
              },
              {
                key: "platformGetSignOption",
                value: (function () {
                  var e = (0, f.default)(
                    a.default.mark(function e() {
                      var t, n, r;
                      return a.default.wrap(
                        function (e) {
                          while (1)
                            switch ((e.prev = e.next)) {
                              case 0:
                                return (
                                  (e.next = 2),
                                  this.appUtils.encrypt({
                                    provider: this.provider,
                                    spaceId: this.spaceId,
                                    data: JSON.stringify({}),
                                  })
                                );
                              case 2:
                                return (
                                  (t = e.sent),
                                  (n = t.data),
                                  (r = t.key),
                                  e.abrupt("return", {
                                    verifyClientSign: n,
                                    encryptKeyId: r,
                                  })
                                );
                              case 6:
                              case "end":
                                return e.stop();
                            }
                        },
                        e,
                        this
                      );
                    })
                  );
                  function t() {
                    return e.apply(this, arguments);
                  }
                  return t;
                })(),
              },
              {
                key: "platformEncryptData",
                value: (function () {
                  var e = (0, f.default)(
                    a.default.mark(function e(t) {
                      var n, r, i, o;
                      return a.default.wrap(
                        function (e) {
                          while (1)
                            switch ((e.prev = e.next)) {
                              case 0:
                                return (
                                  (e.next = 2),
                                  this.appUtils.encrypt({
                                    provider: this.provider,
                                    spaceId: this.spaceId,
                                    data: JSON.stringify(t),
                                  })
                                );
                              case 2:
                                return (
                                  (n = e.sent),
                                  (r = n.data),
                                  (i = n.key),
                                  (o = {
                                    secretType: this.secretType,
                                    encryptKeyId: i,
                                  }),
                                  e.abrupt(
                                    "return",
                                    this.secretType === vn
                                      ? { content: t, _uniCloudOptions: o }
                                      : { content: r, _uniCloudOptions: o }
                                  )
                                );
                              case 7:
                              case "end":
                                return e.stop();
                            }
                        },
                        e,
                        this
                      );
                    })
                  );
                  function t(t) {
                    return e.apply(this, arguments);
                  }
                  return t;
                })(),
              },
              {
                key: "platformDecryptResult",
                value: (function () {
                  var e = (0, f.default)(
                    a.default.mark(function e(t) {
                      var n, r, i, o, s;
                      return a.default.wrap(
                        function (e) {
                          while (1)
                            switch ((e.prev = e.next)) {
                              case 0:
                                return (
                                  (n = t.content),
                                  (r = t._uniCloudOptions),
                                  (i = void 0 === r ? {} : r),
                                  (o = i.encryptKeyId),
                                  (e.next = 6),
                                  this.appUtils.decrypt({
                                    provider: this.provider,
                                    spaceId: this.spaceId,
                                    data: n,
                                    key: o,
                                  })
                                );
                              case 6:
                                return (
                                  (s = e.sent),
                                  e.abrupt("return", JSON.parse(s.data))
                                );
                              case 8:
                              case "end":
                                return e.stop();
                            }
                        },
                        e,
                        this
                      );
                    })
                  );
                  function t(t) {
                    return e.apply(this, arguments);
                  }
                  return t;
                })(),
              },
              {
                key: "isClientKeyNotFound",
                value: function () {
                  var e =
                      arguments.length > 0 && void 0 !== arguments[0]
                        ? arguments[0]
                        : {},
                    t = e.result || {};
                  return (
                    70009 === t.errCode && "uni-secure-network" === t.errSubject
                  );
                },
              },
            ])
          );
        })(yn);
        function lr() {
          var e =
              arguments.length > 0 && void 0 !== arguments[0]
                ? arguments[0]
                : {},
            t = e.secretType;
          return t === gn || t === vn || t === mn;
        }
        function fr() {
          var e =
              arguments.length > 0 && void 0 !== arguments[0]
                ? arguments[0]
                : {},
            t = e.name,
            n = e.data,
            r = void 0 === n ? {} : n;
          return (
            "app" === X &&
            "DCloud-clientDB" === t &&
            "encryption" === r.redirectTo &&
            "getAppClientKey" === r.action
          );
        }
        function dr() {
          var e =
              arguments.length > 0 && void 0 !== arguments[0]
                ? arguments[0]
                : {},
            t = e.provider,
            n = e.spaceId,
            r = e.functionName,
            i = je(),
            o = i.appId,
            a = i.uniPlatform,
            s = i.osName,
            c = a;
          "app" === a && (c = s);
          var u = (function () {
            var e =
                arguments.length > 0 && void 0 !== arguments[0]
                  ? arguments[0]
                  : {},
              t = e.provider,
              n = e.spaceId,
              r = Z;
            if (!r) return {};
            t = (function (e) {
              return "tencent" === e ? "tcb" : e;
            })(t);
            var i = r.find(function (e) {
              return e.provider === t && e.spaceId === n;
            });
            return i && i.config;
          })({ provider: t, spaceId: n });
          if (!u || !u.accessControl || !u.accessControl.enable) return !1;
          var l = u.accessControl.function || {},
            f = Object.keys(l);
          if (0 === f.length) return !0;
          var d = (function (e, t) {
            for (var n, r, i, o = 0; o < e.length; o++) {
              var a = e[o];
              a !== t
                ? "*" !== a
                  ? a
                      .split(",")
                      .map(function (e) {
                        return e.trim();
                      })
                      .indexOf(t) > -1 && (r = a)
                  : (i = a)
                : (n = a);
            }
            return n || r || i;
          })(f, r);
          if (!d) return !1;
          if (
            (l[d] || []).find(function () {
              var e =
                arguments.length > 0 && void 0 !== arguments[0]
                  ? arguments[0]
                  : {};
              return (
                e.appId === o &&
                (e.platform || "").toLowerCase() === c.toLowerCase()
              );
            })
          )
            return !0;
          throw (
            (console.error(
              "此应用[appId: "
                .concat(o, ", platform: ")
                .concat(
                  c,
                  "]不在云端配置的允许访问的应用列表内，参考：https://uniapp.dcloud.net.cn/uniCloud/secure-network.html#verify-client"
                )
            ),
            rr(er))
          );
        }
        function pr(e) {
          var t = e.functionName,
            n = e.result,
            r = e.logPvd;
          if (J && this.__dev__.debugLog && n && n.requestId) {
            var i = JSON.stringify({
              spaceId: this.config.spaceId,
              functionName: t,
              requestId: n.requestId,
            });
            console.log(
              "[".concat(r, "-request]").concat(i, "[/").concat(r, "-request]")
            );
          }
        }
        function hr(e) {
          var t = e.callFunction,
            n = function (n) {
              var r = this,
                i = n.name;
              n.data = sn.call(e, { data: n.data });
              var o = {
                  aliyun: "aliyun",
                  tencent: "tcb",
                  tcb: "tcb",
                  alipay: "alipay",
                }[this.config.provider],
                a = lr(n),
                s = fr(n),
                c = a || s;
              return t.call(this, n).then(
                function (e) {
                  return (
                    (e.errCode = 0),
                    !c && pr.call(r, { functionName: i, result: e, logPvd: o }),
                    Promise.resolve(e)
                  );
                },
                function (e) {
                  return (
                    !c && pr.call(r, { functionName: i, result: e, logPvd: o }),
                    e &&
                      e.message &&
                      (e.message = (function () {
                        for (
                          var e =
                              arguments.length > 0 && void 0 !== arguments[0]
                                ? arguments[0]
                                : {},
                            t = e.message,
                            n = void 0 === t ? "" : t,
                            r = e.extraInfo,
                            i = void 0 === r ? {} : r,
                            o = e.formatter,
                            a = void 0 === o ? [] : o,
                            s = 0;
                          s < a.length;
                          s++
                        ) {
                          var c = a[s],
                            u = c.rule,
                            l = c.content,
                            f = c.mode,
                            d = n.match(u);
                          if (d) {
                            for (var p = l, h = 1; h < d.length; h++)
                              p = pn(p, "{$".concat(h, "}"), d[h]);
                            for (var g in i)
                              p = pn(p, "{".concat(g, "}"), i[g]);
                            return "replace" === f ? p : n + p;
                          }
                        }
                        return n;
                      })({
                        message: "[".concat(n.name, "]: ").concat(e.message),
                        formatter: ln,
                        extraInfo: { functionName: i },
                      })),
                    Promise.reject(e)
                  );
                }
              );
            };
          e.callFunction = function (t) {
            var r,
              i,
              o = e.config,
              a = o.provider,
              s = o.spaceId,
              c = t.name;
            return (
              (t.data = t.data || {}),
              J && e.__dev__.debugInfo && !e.__dev__.debugInfo.forceRemote && ee
                ? (e._callCloudFunction ||
                    ((e._callCloudFunction = n), (e._callLocalFunction = cn)),
                  (r = cn))
                : (r = n),
              (r = r.bind(e)),
              (i = fr(t)
                ? n.call(e, t)
                : (function (e) {
                    var t = e.name,
                      n = e.data,
                      r = void 0 === n ? {} : n;
                    return (
                      "mp-weixin" === X &&
                      "uni-id-co" === t &&
                      "secureNetworkHandshakeByWeixin" === r.method
                    );
                  })(t)
                ? r.call(e, t)
                : lr(t)
                ? new or({
                    secretType: t.secretType,
                    uniCloudIns: e,
                  }).wrapEncryptDataCallFunction(n.bind(e))(t)
                : dr({ provider: a, spaceId: s, functionName: c })
                ? new or({
                    secretType: t.secretType,
                    uniCloudIns: e,
                  }).wrapVerifyClientCallFunction(n.bind(e))(t)
                : r(t)),
              Object.defineProperty(i, "result", {
                get: function () {
                  return (
                    console.warn(
                      "当前返回结果为Promise类型，不可直接访问其result属性，详情请参考：https://uniapp.dcloud.net.cn/uniCloud/faq?id=promise"
                    ),
                    {}
                  );
                },
              }),
              i.then(function (e) {
                return (
                  "undefined" != typeof UTSJSONObject &&
                    (e.result = new UTSJSONObject(e.result)),
                  e
                );
              })
            );
          };
        }
        or =
          "mp-weixin" !== X && "app" !== X
            ? (0, y.default)(function e() {
                throw (
                  ((0, m.default)(this, e),
                  rr({
                    message: "Platform ".concat(
                      X,
                      " is not supported by secure network"
                    ),
                  }))
                );
              })
            : Y
            ? "mp-weixin" === X
              ? sr
              : ur
            : (0, y.default)(function e() {
                throw (
                  ((0, m.default)(this, e),
                  rr({
                    message: "Platform ".concat(
                      X,
                      " is not enabled, please check whether secure network module is enabled in your manifest.json"
                    ),
                  }))
                );
              });
        var gr = Symbol("CLIENT_DB_INTERNAL");
        function vr(e, t) {
          return (
            (e.then = "DoNotReturnProxyWithAFunctionNamedThen"),
            (e._internalType = gr),
            (e.inspect = null),
            (e.__ob__ = void 0),
            new Proxy(e, {
              get: function (e, n, r) {
                if ("_uniClient" === n) return null;
                if ("symbol" == (0, u.default)(n)) return e[n];
                if (n in e || "string" != typeof n) {
                  var i = e[n];
                  return "function" == typeof i ? i.bind(e) : i;
                }
                return t.get(e, n, r);
              },
            })
          );
        }
        function mr(e) {
          return {
            on: function (t, n) {
              (e[t] = e[t] || []), e[t].indexOf(n) > -1 || e[t].push(n);
            },
            off: function (t, n) {
              e[t] = e[t] || [];
              var r = e[t].indexOf(n);
              -1 !== r && e[t].splice(r, 1);
            },
          };
        }
        var yr = ["db.Geo", "db.command", "command.aggregate"];
        function _r(e, t) {
          return yr.indexOf("".concat(e, ".").concat(t)) > -1;
        }
        function br(e) {
          switch (F(e)) {
            case "array":
              return e.map(function (e) {
                return br(e);
              });
            case "object":
              return (
                e._internalType === gr ||
                  Object.keys(e).forEach(function (t) {
                    e[t] = br(e[t]);
                  }),
                e
              );
            case "regexp":
              return { $regexp: { source: e.source, flags: e.flags } };
            case "date":
              return { $date: e.toISOString() };
            default:
              return e;
          }
        }
        function wr(e) {
          return e && e.content && e.content.$method;
        }
        var kr = (function () {
          function e(t, n, r) {
            (0, m.default)(this, e),
              (this.content = t),
              (this.prevStage = n || null),
              (this.udb = null),
              (this._database = r);
          }
          return (0, y.default)(e, [
            {
              key: "toJSON",
              value: function () {
                for (var e = this, t = [e.content]; e.prevStage; )
                  (e = e.prevStage), t.push(e.content);
                return {
                  $db: t.reverse().map(function (e) {
                    return { $method: e.$method, $param: br(e.$param) };
                  }),
                };
              },
            },
            {
              key: "toString",
              value: function () {
                return JSON.stringify(this.toJSON());
              },
            },
            {
              key: "getAction",
              value: function () {
                var e = this.toJSON().$db.find(function (e) {
                  return "action" === e.$method;
                });
                return e && e.$param && e.$param[0];
              },
            },
            {
              key: "getCommand",
              value: function () {
                return {
                  $db: this.toJSON().$db.filter(function (e) {
                    return "action" !== e.$method;
                  }),
                };
              },
            },
            {
              key: "isAggregate",
              get: function () {
                for (var e = this; e; ) {
                  var t = wr(e),
                    n = wr(e.prevStage);
                  if (
                    ("aggregate" === t && "collection" === n) ||
                    "pipeline" === t
                  )
                    return !0;
                  e = e.prevStage;
                }
                return !1;
              },
            },
            {
              key: "isCommand",
              get: function () {
                for (var e = this; e; ) {
                  if ("command" === wr(e)) return !0;
                  e = e.prevStage;
                }
                return !1;
              },
            },
            {
              key: "isAggregateCommand",
              get: function () {
                for (var e = this; e; ) {
                  var t = wr(e),
                    n = wr(e.prevStage);
                  if ("aggregate" === t && "command" === n) return !0;
                  e = e.prevStage;
                }
                return !1;
              },
            },
            {
              key: "getNextStageFn",
              value: function (e) {
                var t = this;
                return function () {
                  return xr(
                    { $method: e, $param: br(Array.from(arguments)) },
                    t,
                    t._database
                  );
                };
              },
            },
            {
              key: "count",
              get: function () {
                return this.isAggregate
                  ? this.getNextStageFn("count")
                  : function () {
                      return this._send("count", Array.from(arguments));
                    };
              },
            },
            {
              key: "remove",
              get: function () {
                return this.isCommand
                  ? this.getNextStageFn("remove")
                  : function () {
                      return this._send("remove", Array.from(arguments));
                    };
              },
            },
            {
              key: "get",
              value: function () {
                return this._send("get", Array.from(arguments));
              },
            },
            {
              key: "add",
              get: function () {
                return this.isCommand
                  ? this.getNextStageFn("add")
                  : function () {
                      return this._send("add", Array.from(arguments));
                    };
              },
            },
            {
              key: "update",
              value: function () {
                return this._send("update", Array.from(arguments));
              },
            },
            {
              key: "end",
              value: function () {
                return this._send("end", Array.from(arguments));
              },
            },
            {
              key: "set",
              get: function () {
                return this.isCommand
                  ? this.getNextStageFn("set")
                  : function () {
                      throw new Error("JQL禁止使用set方法");
                    };
              },
            },
            {
              key: "_send",
              value: function (e, t) {
                var n = this.getAction(),
                  r = this.getCommand();
                if ((r.$db.push({ $method: e, $param: br(t) }), J)) {
                  var i = r.$db.find(function (e) {
                      return "collection" === e.$method;
                    }),
                    o = i && i.$param;
                  o &&
                    1 === o.length &&
                    "string" == typeof i.$param[0] &&
                    i.$param[0].indexOf(",") > -1 &&
                    console.warn(
                      "检测到使用JQL语法联表查询时，未使用getTemp先过滤主表数据，在主表数据量大的情况下可能会查询缓慢。\n- 如何优化请参考此文档：https://uniapp.dcloud.net.cn/uniCloud/jql?id=lookup-with-temp \n- 如果主表数据量很小请忽略此信息，项目发行时不会出现此提示。"
                    );
                }
                return this._database._callCloudFunction({
                  action: n,
                  command: r,
                });
              },
            },
          ]);
        })();
        function xr(e, t, n) {
          return vr(new kr(e, t, n), {
            get: function (e, t) {
              var r = "db";
              return (
                e && e.content && (r = e.content.$method),
                _r(r, t)
                  ? xr({ $method: t }, e, n)
                  : function () {
                      return xr(
                        { $method: t, $param: br(Array.from(arguments)) },
                        e,
                        n
                      );
                    }
              );
            },
          });
        }
        function Sr(e) {
          var t = e.path,
            n = e.method;
          return (function () {
            function e() {
              (0, m.default)(this, e), (this.param = Array.from(arguments));
            }
            return (0, y.default)(e, [
              {
                key: "toJSON",
                value: function () {
                  return {
                    $newDb: [].concat(
                      (0, l.default)(
                        t.map(function (e) {
                          return { $method: e };
                        })
                      ),
                      [{ $method: n, $param: this.param }]
                    ),
                  };
                },
              },
              {
                key: "toString",
                value: function () {
                  return JSON.stringify(this.toJSON());
                },
              },
            ]);
          })();
        }
        function Ar(e) {
          var t =
            arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
          return vr(new e(t), {
            get: function (e, t) {
              return _r("db", t)
                ? xr({ $method: t }, null, e)
                : function () {
                    return xr(
                      { $method: t, $param: br(Array.from(arguments)) },
                      null,
                      e
                    );
                  };
            },
          });
        }
        var Ir = (function (e) {
            function t() {
              return (0, m.default)(this, t), A(this, t, arguments);
            }
            return (
              (0, g.default)(t, e),
              (0, y.default)(t, [
                {
                  key: "_parseResult",
                  value: function (e) {
                    return this._isJQL ? e.result : e;
                  },
                },
                {
                  key: "_callCloudFunction",
                  value: function (e) {
                    var t = this,
                      n = e.action,
                      r = e.command,
                      i = e.multiCommand,
                      o = e.queryList;
                    function a(e, t) {
                      if (i && o)
                        for (var n = 0; n < o.length; n++) {
                          var r = o[n];
                          r.udb &&
                            "function" == typeof r.udb.setResult &&
                            (t
                              ? r.udb.setResult(t)
                              : r.udb.setResult(e.result.dataList[n]));
                        }
                    }
                    var s = this,
                      c = this._isJQL ? "databaseForJQL" : "database";
                    function u(e) {
                      return (
                        s._callback("error", [e]),
                        ce(ue(c, "fail"), e)
                          .then(function () {
                            return ce(ue(c, "complete"), e);
                          })
                          .then(function () {
                            return (
                              a(null, e),
                              we(de, { type: ge, content: e }),
                              Promise.reject(e)
                            );
                          })
                      );
                    }
                    var l = ce(ue(c, "invoke")),
                      f = this._uniClient;
                    return l
                      .then(function () {
                        return f.callFunction({
                          name: "DCloud-clientDB",
                          type: N,
                          data: { action: n, command: r, multiCommand: i },
                        });
                      })
                      .then(
                        function (e) {
                          var n = e.result,
                            r = n.code,
                            i = n.message,
                            o = n.token,
                            l = n.tokenExpired,
                            f = n.systemInfo,
                            d = void 0 === f ? [] : f;
                          if (d)
                            for (var p = 0; p < d.length; p++) {
                              var h = d[p],
                                g = h.level,
                                v = h.message,
                                m = h.detail,
                                y =
                                  console[
                                    "app" === X && "warn" === g ? "error" : g
                                  ] || console.log,
                                _ = "[System Info]" + v;
                              m && (_ = "".concat(_, "\n详细信息：").concat(m)),
                                y(_);
                            }
                          if (r)
                            return u(
                              new Pe({
                                code: r,
                                message: i,
                                requestId: e.requestId,
                              })
                            );
                          (e.result.errCode =
                            e.result.errCode || e.result.code),
                            (e.result.errMsg =
                              e.result.errMsg || e.result.message),
                            o &&
                              l &&
                              (Ee({ token: o, tokenExpired: l }),
                              t._callbackAuth("refreshToken", [
                                { token: o, tokenExpired: l },
                              ]),
                              t._callback("refreshToken", [
                                { token: o, tokenExpired: l },
                              ]),
                              we(he, { token: o, tokenExpired: l }));
                          for (
                            var b = [
                                {
                                  prop: "affectedDocs",
                                  tips: "affectedDocs不再推荐使用，请使用inserted/deleted/updated/data.length替代",
                                },
                                {
                                  prop: "code",
                                  tips: "code不再推荐使用，请使用errCode替代",
                                },
                                {
                                  prop: "message",
                                  tips: "message不再推荐使用，请使用errMsg替代",
                                },
                              ],
                              w = function () {
                                var t = b[k],
                                  n = t.prop,
                                  r = t.tips;
                                if ((n in e.result)) {
                                  var i = e.result[n];
                                  Object.defineProperty(e.result, n, {
                                    get: function () {
                                      return console.warn(r), i;
                                    },
                                  });
                                }
                              },
                              k = 0;
                            k < b.length;
                            k++
                          )
                            w();
                          return (function (e) {
                            return ce(ue(c, "success"), e)
                              .then(function () {
                                return ce(ue(c, "complete"), e);
                              })
                              .then(function () {
                                a(e, null);
                                var t = s._parseResult(e);
                                return (
                                  we(de, { type: ge, content: t }),
                                  Promise.resolve(t)
                                );
                              });
                          })(e);
                        },
                        function (e) {
                          return (
                            /fc_function_not_found|FUNCTION_NOT_FOUND/g.test(
                              e.message
                            ) &&
                              console.warn(
                                "clientDB未初始化，请在web控制台保存一次schema以开启clientDB"
                              ),
                            u(
                              new Pe({
                                code: e.code || "SYSTEM_ERROR",
                                message: e.message,
                                requestId: e.requestId,
                              })
                            )
                          );
                        }
                      );
                  },
                },
              ])
            );
          })(
            (function () {
              function e() {
                var t =
                    arguments.length > 0 && void 0 !== arguments[0]
                      ? arguments[0]
                      : {},
                  n = t.uniClient,
                  r = void 0 === n ? {} : n,
                  i = t.isJQL,
                  o = void 0 !== i && i;
                (0, m.default)(this, e),
                  (this._uniClient = r),
                  (this._authCallBacks = {}),
                  (this._dbCallBacks = {}),
                  r._isDefault &&
                    (this._dbCallBacks = re("_globalUniCloudDatabaseCallback")),
                  o || (this.auth = mr(this._authCallBacks)),
                  (this._isJQL = o),
                  Object.assign(this, mr(this._dbCallBacks)),
                  (this.env = vr(
                    {},
                    {
                      get: function (e, t) {
                        return { $env: t };
                      },
                    }
                  )),
                  (this.Geo = vr(
                    {},
                    {
                      get: function (e, t) {
                        return Sr({ path: ["Geo"], method: t });
                      },
                    }
                  )),
                  (this.serverDate = Sr({ path: [], method: "serverDate" })),
                  (this.RegExp = Sr({ path: [], method: "RegExp" }));
              }
              return (0, y.default)(e, [
                {
                  key: "getCloudEnv",
                  value: function (e) {
                    if ("string" != typeof e || !e.trim())
                      throw new Error("getCloudEnv参数错误");
                    return { $env: e.replace("$cloudEnv_", "") };
                  },
                },
                {
                  key: "_callback",
                  value: function (e, t) {
                    var n = this._dbCallBacks;
                    n[e] &&
                      n[e].forEach(function (e) {
                        e.apply(void 0, (0, l.default)(t));
                      });
                  },
                },
                {
                  key: "_callbackAuth",
                  value: function (e, t) {
                    var n = this._authCallBacks;
                    n[e] &&
                      n[e].forEach(function (e) {
                        e.apply(void 0, (0, l.default)(t));
                      });
                  },
                },
                {
                  key: "multiSend",
                  value: function () {
                    var e = Array.from(arguments),
                      t = e.map(function (e) {
                        var t = e.getAction(),
                          n = e.getCommand();
                        if ("getTemp" !== n.$db[n.$db.length - 1].$method)
                          throw new Error("multiSend只支持子命令内使用getTemp");
                        return { action: t, command: n };
                      });
                    return this._callCloudFunction({
                      multiCommand: t,
                      queryList: e,
                    });
                  },
                },
              ]);
            })()
          ),
          Or = "token无效，跳转登录页面",
          Pr = "token过期，跳转登录页面",
          Tr = {
            TOKEN_INVALID_TOKEN_EXPIRED: Pr,
            TOKEN_INVALID_INVALID_CLIENTID: Or,
            TOKEN_INVALID: Or,
            TOKEN_INVALID_WRONG_TOKEN: Or,
            TOKEN_INVALID_ANONYMOUS_USER: Or,
          },
          Cr = {
            "uni-id-token-expired": Pr,
            "uni-id-check-token-failed": Or,
            "uni-id-token-not-exist": Or,
            "uni-id-check-device-feature-failed": Or,
          };
        function Er(e, t) {
          var n = "";
          return (
            (n = e ? "".concat(e, "/").concat(t) : t), n.replace(/^\//, "")
          );
        }
        function jr() {
          var e =
              arguments.length > 0 && void 0 !== arguments[0]
                ? arguments[0]
                : [],
            t =
              arguments.length > 1 && void 0 !== arguments[1]
                ? arguments[1]
                : "",
            n = [],
            r = [];
          return (
            e.forEach(function (e) {
              !0 === e.needLogin
                ? n.push(Er(t, e.path))
                : !1 === e.needLogin && r.push(Er(t, e.path));
            }),
            { needLoginPage: n, notNeedLoginPage: r }
          );
        }
        function Lr(e) {
          return e.split("?")[0].replace(/^\//, "");
        }
        function Dr() {
          return (function (e) {
            var t = (e && e.$page && e.$page.fullPath) || "";
            return t ? ("/" !== t.charAt(0) && (t = "/" + t), t) : t;
          })(
            (function () {
              var e = getCurrentPages();
              return e[e.length - 1];
            })()
          );
        }
        function Mr() {
          return Lr(Dr());
        }
        function Nr() {
          var e =
              arguments.length > 0 && void 0 !== arguments[0]
                ? arguments[0]
                : "",
            t =
              arguments.length > 1 && void 0 !== arguments[1]
                ? arguments[1]
                : {};
          if (!e) return !1;
          if (!(t && t.list && t.list.length)) return !1;
          var n = t.list,
            r = Lr(e);
          return n.some(function (e) {
            return e.pagePath === r;
          });
        }
        var Ur,
          Rr = !!_.default.uniIdRouter,
          $r = (function () {
            var e =
                arguments.length > 0 && void 0 !== arguments[0]
                  ? arguments[0]
                  : _.default,
              t = e.pages,
              n = void 0 === t ? [] : t,
              r = e.subPackages,
              i = void 0 === r ? [] : r,
              o = e.uniIdRouter,
              a = void 0 === o ? {} : o,
              s = e.tabBar,
              c = void 0 === s ? {} : s,
              u = a.loginPage,
              f = a.needLogin,
              d = void 0 === f ? [] : f,
              p = a.resToLogin,
              h = void 0 === p || p,
              g = jr(n),
              v = g.needLoginPage,
              m = g.notNeedLoginPage,
              y = (function () {
                var e =
                    arguments.length > 0 && void 0 !== arguments[0]
                      ? arguments[0]
                      : [],
                  t = [],
                  n = [];
                return (
                  e.forEach(function (e) {
                    var r = e.root,
                      i = e.pages,
                      o = void 0 === i ? [] : i,
                      a = jr(o, r),
                      s = a.needLoginPage,
                      c = a.notNeedLoginPage;
                    t.push.apply(t, (0, l.default)(s)),
                      n.push.apply(n, (0, l.default)(c));
                  }),
                  { needLoginPage: t, notNeedLoginPage: n }
                );
              })(i),
              b = y.needLoginPage,
              w = y.notNeedLoginPage;
            return {
              loginPage: u,
              routerNeedLogin: d,
              resToLogin: h,
              needLoginPage: [].concat((0, l.default)(v), (0, l.default)(b)),
              notNeedLoginPage: [].concat((0, l.default)(m), (0, l.default)(w)),
              loginPageInTabBar: Nr(u, c),
            };
          })(),
          Fr = $r.loginPage,
          Br = $r.routerNeedLogin,
          qr = $r.resToLogin,
          Kr = $r.needLoginPage,
          zr = $r.notNeedLoginPage,
          Vr = $r.loginPageInTabBar;
        if (Kr.indexOf(Fr) > -1)
          throw new Error(
            "Login page [".concat(
              Fr,
              '] should not be "needLogin", please check your pages.json'
            )
          );
        function Hr(e) {
          var t = Mr();
          if ("/" === e.charAt(0)) return e;
          var n = e.split("?"),
            r = (0, c.default)(n, 2),
            i = r[0],
            o = r[1],
            a = i.replace(/^\//, "").split("/"),
            s = t.split("/");
          s.pop();
          for (var u = 0; u < a.length; u++) {
            var l = a[u];
            ".." === l ? s.pop() : "." !== l && s.push(l);
          }
          return (
            "" === s[0] && s.shift(), "/" + s.join("/") + (o ? "?" + o : "")
          );
        }
        function Wr(e) {
          var t = Lr(Hr(e));
          return (
            !(zr.indexOf(t) > -1) &&
            (Kr.indexOf(t) > -1 ||
              Br.some(function (t) {
                return (function (e, t) {
                  return new RegExp(t).test(e);
                })(e, t);
              }))
          );
        }
        function Jr(e) {
          var t = e.redirect,
            n = Lr(t),
            r = Lr(Fr);
          return Mr() !== r && n !== r;
        }
        function Gr() {
          var e =
              arguments.length > 0 && void 0 !== arguments[0]
                ? arguments[0]
                : {},
            t = e.api,
            n = e.redirect;
          if (n && Jr({ redirect: n })) {
            var i = (function (e, t) {
              return (
                "/" !== e.charAt(0) && (e = "/" + e),
                t
                  ? e.indexOf("?") > -1
                    ? e + "&uniIdRedirectUrl=".concat(encodeURIComponent(t))
                    : e + "?uniIdRedirectUrl=".concat(encodeURIComponent(t))
                  : e
              );
            })(Fr, n);
            Vr
              ? ("navigateTo" !== t && "redirectTo" !== t) || (t = "switchTab")
              : "switchTab" === t && (t = "navigateTo");
            var o = {
              navigateTo: r.navigateTo,
              redirectTo: r.redirectTo,
              switchTab: r.switchTab,
              reLaunch: r.reLaunch,
            };
            setTimeout(function () {
              o[t]({ url: i });
            }, 0);
          }
        }
        function Yr() {
          var e =
              arguments.length > 0 && void 0 !== arguments[0]
                ? arguments[0]
                : {},
            t = e.url,
            n = { abortLoginPageJump: !1, autoToLoginPage: !1 },
            r = (function () {
              var e,
                t = Ce(),
                n = t.token,
                r = t.tokenExpired;
              if (n) {
                if (r < Date.now()) {
                  var i = "uni-id-token-expired";
                  e = { errCode: i, errMsg: Cr[i] };
                }
              } else {
                var o = "uni-id-check-token-failed";
                e = { errCode: o, errMsg: Cr[o] };
              }
              return e;
            })();
          if (Wr(t) && r) {
            if (((r.uniIdRedirectUrl = t), ye(pe).length > 0))
              return (
                setTimeout(function () {
                  we(pe, r);
                }, 0),
                (n.abortLoginPageJump = !0),
                n
              );
            n.autoToLoginPage = !0;
          }
          return n;
        }
        function Zr() {
          !(function () {
            var e = Dr(),
              t = Yr({ url: e }),
              n = t.abortLoginPageJump,
              r = t.autoToLoginPage;
            n || (r && Gr({ api: "redirectTo", redirect: e }));
          })();
          for (
            var e = ["navigateTo", "redirectTo", "reLaunch", "switchTab"],
              t = function () {
                var t = e[n];
                r.addInterceptor(t, {
                  invoke: function (e) {
                    var n = Yr({ url: e.url }),
                      r = n.abortLoginPageJump,
                      i = n.autoToLoginPage;
                    return r
                      ? e
                      : i
                      ? (Gr({ api: t, redirect: Hr(e.url) }), !1)
                      : e;
                  },
                });
              },
              n = 0;
            n < e.length;
            n++
          )
            t();
        }
        function Xr() {
          this.onResponse(function (e) {
            var t = e.type,
              n = e.content,
              r = !1;
            switch (t) {
              case "cloudobject":
                r = (function (e) {
                  if ("object" != (0, u.default)(e)) return !1;
                  var t = e || {},
                    n = t.errCode;
                  return n in Cr;
                })(n);
                break;
              case "clientdb":
                r = (function (e) {
                  if ("object" != (0, u.default)(e)) return !1;
                  var t = e || {},
                    n = t.errCode;
                  return n in Tr;
                })(n);
            }
            r &&
              (function () {
                var e =
                    arguments.length > 0 && void 0 !== arguments[0]
                      ? arguments[0]
                      : {},
                  t = ye(pe);
                Se().then(function () {
                  var n = Dr();
                  if (n && Jr({ redirect: n }))
                    return t.length > 0
                      ? we(pe, Object.assign({ uniIdRedirectUrl: n }, e))
                      : void (Fr && Gr({ api: "navigateTo", redirect: n }));
                });
              })(n);
          });
        }
        function Qr(e) {
          !(function (e) {
            (e.onResponse = function (e) {
              _e(de, e);
            }),
              (e.offResponse = function (e) {
                be(de, e);
              });
          })(e),
            (function (e) {
              (e.onNeedLogin = function (e) {
                _e(pe, e);
              }),
                (e.offNeedLogin = function (e) {
                  be(pe, e);
                }),
                Rr &&
                  (re("_globalUniCloudStatus").needLoginInit ||
                    ((re("_globalUniCloudStatus").needLoginInit = !0),
                    Se().then(function () {
                      Zr.call(e);
                    }),
                    qr && Xr.call(e)));
            })(e),
            (function (e) {
              (e.onRefreshToken = function (e) {
                _e(he, e);
              }),
                (e.offRefreshToken = function (e) {
                  be(he, e);
                });
            })(e);
        }
        var ei =
            "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
          ti =
            /^(?:[A-Za-z\d+/]{4})*?(?:[A-Za-z\d+/]{2}(?:==)?|[A-Za-z\d+/]{3}=?)?$/;
        function ni() {
          var e,
            t,
            n = Ce().token || "",
            r = n.split(".");
          if (!n || 3 !== r.length)
            return { uid: null, role: [], permission: [], tokenExpired: 0 };
          try {
            e = JSON.parse(
              ((t = r[1]),
              decodeURIComponent(
                Ur(t)
                  .split("")
                  .map(function (e) {
                    return (
                      "%" + ("00" + e.charCodeAt(0).toString(16)).slice(-2)
                    );
                  })
                  .join("")
              ))
            );
          } catch (n) {
            throw new Error(
              "获取当前用户信息出错，详细错误信息为：" + n.message
            );
          }
          return (e.tokenExpired = 1e3 * e.exp), delete e.exp, delete e.iat, e;
        }
        Ur =
          "function" != typeof atob
            ? function (e) {
                if (((e = String(e).replace(/[\t\n\f\r ]+/g, "")), !ti.test(e)))
                  throw new Error(
                    "Failed to execute 'atob' on 'Window': The string to be decoded is not correctly encoded."
                  );
                var t;
                e += "==".slice(2 - (3 & e.length));
                for (var n, r, i = "", o = 0; o < e.length; )
                  (t =
                    (ei.indexOf(e.charAt(o++)) << 18) |
                    (ei.indexOf(e.charAt(o++)) << 12) |
                    ((n = ei.indexOf(e.charAt(o++))) << 6) |
                    (r = ei.indexOf(e.charAt(o++)))),
                    (i +=
                      64 === n
                        ? String.fromCharCode((t >> 16) & 255)
                        : 64 === r
                        ? String.fromCharCode((t >> 16) & 255, (t >> 8) & 255)
                        : String.fromCharCode(
                            (t >> 16) & 255,
                            (t >> 8) & 255,
                            255 & t
                          ));
                return i;
              }
            : atob;
        var ri = P(function (e, t) {
            Object.defineProperty(t, "__esModule", { value: !0 });
            var n = "chooseAndUploadFile:ok",
              o = "chooseAndUploadFile:fail";
            function a(e, t) {
              return (
                e.tempFiles.forEach(function (e, n) {
                  e.name ||
                    (e.name = e.path.substring(e.path.lastIndexOf("/") + 1)),
                    t && (e.fileType = t),
                    (e.cloudPath =
                      Date.now() +
                      "_" +
                      n +
                      e.name.substring(e.name.lastIndexOf(".")));
                }),
                e.tempFilePaths ||
                  (e.tempFilePaths = e.tempFiles.map(function (e) {
                    return e.path;
                  })),
                e
              );
            }
            function s(e, t, r) {
              var i = r.onChooseFile,
                o = r.onUploadProgress;
              return t
                .then(function (e) {
                  if (i) {
                    var t = i(e);
                    if (void 0 !== t)
                      return Promise.resolve(t).then(function (t) {
                        return void 0 === t ? e : t;
                      });
                  }
                  return e;
                })
                .then(function (t) {
                  return !1 === t
                    ? { errMsg: n, tempFilePaths: [], tempFiles: [] }
                    : (function (e, t) {
                        var r =
                            arguments.length > 2 && void 0 !== arguments[2]
                              ? arguments[2]
                              : 5,
                          i = arguments.length > 3 ? arguments[3] : void 0;
                        (t = Object.assign({}, t)).errMsg = n;
                        var o = t.tempFiles,
                          a = o.length,
                          s = 0;
                        return new Promise(function (n) {
                          for (; s < r; ) c();
                          function c() {
                            var r = s++;
                            if (r >= a)
                              !o.find(function (e) {
                                return !e.url && !e.errMsg;
                              }) && n(t);
                            else {
                              var u = o[r];
                              e.uploadFile({
                                provider: u.provider,
                                filePath: u.path,
                                cloudPath: u.cloudPath,
                                fileType: u.fileType,
                                cloudPathAsRealPath: u.cloudPathAsRealPath,
                                onUploadProgress: function (e) {
                                  (e.index = r),
                                    (e.tempFile = u),
                                    (e.tempFilePath = u.path),
                                    i && i(e);
                                },
                              })
                                .then(function (e) {
                                  (u.url = e.fileID), r < a && c();
                                })
                                .catch(function (e) {
                                  (u.errMsg = e.errMsg || e.message),
                                    r < a && c();
                                });
                            }
                          }
                        });
                      })(e, t, 5, o);
                });
            }
            t.initChooseAndUploadFile = function (e) {
              return function () {
                var t =
                  arguments.length > 0 && void 0 !== arguments[0]
                    ? arguments[0]
                    : { type: "all" };
                return "image" === t.type
                  ? s(
                      e,
                      (function (e) {
                        var t = e.count,
                          n = e.sizeType,
                          i = e.sourceType,
                          s = void 0 === i ? ["album", "camera"] : i,
                          c = e.extension;
                        return new Promise(function (e, i) {
                          r.chooseImage({
                            count: t,
                            sizeType: n,
                            sourceType: s,
                            extension: c,
                            success: function (t) {
                              e(a(t, "image"));
                            },
                            fail: function (e) {
                              i({
                                errMsg: e.errMsg.replace("chooseImage:fail", o),
                              });
                            },
                          });
                        });
                      })(t),
                      t
                    )
                  : "video" === t.type
                  ? s(
                      e,
                      (function (e) {
                        var t = e.camera,
                          n = e.compressed,
                          i = e.maxDuration,
                          s = e.sourceType,
                          c = void 0 === s ? ["album", "camera"] : s,
                          u = e.extension;
                        return new Promise(function (e, s) {
                          r.chooseVideo({
                            camera: t,
                            compressed: n,
                            maxDuration: i,
                            sourceType: c,
                            extension: u,
                            success: function (t) {
                              var n = t.tempFilePath,
                                r = t.duration,
                                i = t.size,
                                o = t.height,
                                s = t.width;
                              e(
                                a(
                                  {
                                    errMsg: "chooseVideo:ok",
                                    tempFilePaths: [n],
                                    tempFiles: [
                                      {
                                        name:
                                          (t.tempFile && t.tempFile.name) || "",
                                        path: n,
                                        size: i,
                                        type:
                                          (t.tempFile && t.tempFile.type) || "",
                                        width: s,
                                        height: o,
                                        duration: r,
                                        fileType: "video",
                                        cloudPath: "",
                                      },
                                    ],
                                  },
                                  "video"
                                )
                              );
                            },
                            fail: function (e) {
                              s({
                                errMsg: e.errMsg.replace("chooseVideo:fail", o),
                              });
                            },
                          });
                        });
                      })(t),
                      t
                    )
                  : s(
                      e,
                      (function (e) {
                        var t = e.count,
                          n = e.extension;
                        return new Promise(function (e, s) {
                          var c = r.chooseFile;
                          if (
                            ("undefined" != typeof i &&
                              "function" == typeof i.chooseMessageFile &&
                              (c = i.chooseMessageFile),
                            "function" != typeof c)
                          )
                            return s({
                              errMsg:
                                o +
                                " 请指定 type 类型，该平台仅支持选择 image 或 video。",
                            });
                          c({
                            type: "all",
                            count: t,
                            extension: n,
                            success: function (t) {
                              e(a(t));
                            },
                            fail: function (e) {
                              s({
                                errMsg: e.errMsg.replace("chooseFile:fail", o),
                              });
                            },
                          });
                        });
                      })(t),
                      t
                    );
              };
            };
          }),
          ii = O(ri),
          oi = "manual";
        function ai(e) {
          return {
            props: {
              localdata: {
                type: Array,
                default: function () {
                  return [];
                },
              },
              options: {
                type: [Object, Array],
                default: function () {
                  return {};
                },
              },
              spaceInfo: {
                type: Object,
                default: function () {
                  return {};
                },
              },
              collection: { type: [String, Array], default: "" },
              action: { type: String, default: "" },
              field: { type: String, default: "" },
              orderby: { type: String, default: "" },
              where: { type: [String, Object], default: "" },
              pageData: { type: String, default: "add" },
              pageCurrent: { type: Number, default: 1 },
              pageSize: { type: Number, default: 20 },
              getcount: { type: [Boolean, String], default: !1 },
              gettree: { type: [Boolean, String], default: !1 },
              gettreepath: { type: [Boolean, String], default: !1 },
              startwith: { type: String, default: "" },
              limitlevel: { type: Number, default: 10 },
              groupby: { type: String, default: "" },
              groupField: { type: String, default: "" },
              distinct: { type: [Boolean, String], default: !1 },
              foreignKey: { type: String, default: "" },
              loadtime: { type: String, default: "auto" },
              manual: { type: Boolean, default: !1 },
            },
            data: function () {
              return {
                mixinDatacomLoading: !1,
                mixinDatacomHasMore: !1,
                mixinDatacomResData: [],
                mixinDatacomErrorMessage: "",
                mixinDatacomPage: {},
                mixinDatacomError: null,
              };
            },
            created: function () {
              var e = this;
              (this.mixinDatacomPage = {
                current: this.pageCurrent,
                size: this.pageSize,
                count: 0,
              }),
                this.$watch(
                  function () {
                    var t = [];
                    return (
                      [
                        "pageCurrent",
                        "pageSize",
                        "localdata",
                        "collection",
                        "action",
                        "field",
                        "orderby",
                        "where",
                        "getont",
                        "getcount",
                        "gettree",
                        "groupby",
                        "groupField",
                        "distinct",
                      ].forEach(function (n) {
                        t.push(e[n]);
                      }),
                      t
                    );
                  },
                  function (t, n) {
                    if (e.loadtime !== oi) {
                      for (var r = !1, i = [], o = 2; o < t.length; o++)
                        t[o] !== n[o] && (i.push(t[o]), (r = !0));
                      t[0] !== n[0] &&
                        (e.mixinDatacomPage.current = e.pageCurrent),
                        (e.mixinDatacomPage.size = e.pageSize),
                        e.onMixinDatacomPropsChange(r, i);
                    }
                  }
                );
            },
            methods: {
              onMixinDatacomPropsChange: function (e, t) {},
              mixinDatacomEasyGet: function () {
                var e = this,
                  t =
                    arguments.length > 0 && void 0 !== arguments[0]
                      ? arguments[0]
                      : {},
                  n = t.getone,
                  r = void 0 !== n && n,
                  i = t.success,
                  o = t.fail;
                this.mixinDatacomLoading ||
                  ((this.mixinDatacomLoading = !0),
                  (this.mixinDatacomErrorMessage = ""),
                  (this.mixinDatacomError = null),
                  this.mixinDatacomGet()
                    .then(function (t) {
                      e.mixinDatacomLoading = !1;
                      var n = t.result,
                        o = n.data,
                        a = n.count;
                      e.getcount && (e.mixinDatacomPage.count = a),
                        (e.mixinDatacomHasMore = o.length < e.pageSize);
                      var s = r ? (o.length ? o[0] : void 0) : o;
                      (e.mixinDatacomResData = s), i && i(s);
                    })
                    .catch(function (t) {
                      (e.mixinDatacomLoading = !1),
                        (e.mixinDatacomErrorMessage = t),
                        (e.mixinDatacomError = t),
                        o && o(t);
                    }));
              },
              mixinDatacomGet: function () {
                var t,
                  n,
                  r =
                    arguments.length > 0 && void 0 !== arguments[0]
                      ? arguments[0]
                      : {};
                (r = r || {}),
                  (n =
                    "undefined" != typeof __uniX && __uniX
                      ? e.databaseForJQL(this.spaceInfo)
                      : e.database(this.spaceInfo));
                var i = r.action || this.action;
                i && (n = n.action(i));
                var o = r.collection || this.collection;
                n = Array.isArray(o)
                  ? (t = n).collection.apply(t, (0, l.default)(o))
                  : n.collection(o);
                var a = r.where || this.where;
                a && Object.keys(a).length && (n = n.where(a));
                var s = r.field || this.field;
                s && (n = n.field(s));
                var c = r.foreignKey || this.foreignKey;
                c && (n = n.foreignKey(c));
                var u = r.groupby || this.groupby;
                u && (n = n.groupBy(u));
                var f = r.groupField || this.groupField;
                f && (n = n.groupField(f)),
                  !0 === (void 0 !== r.distinct ? r.distinct : this.distinct) &&
                    (n = n.distinct());
                var d = r.orderby || this.orderby;
                d && (n = n.orderBy(d));
                var p =
                    void 0 !== r.pageCurrent
                      ? r.pageCurrent
                      : this.mixinDatacomPage.current,
                  h =
                    void 0 !== r.pageSize
                      ? r.pageSize
                      : this.mixinDatacomPage.size,
                  g = void 0 !== r.getcount ? r.getcount : this.getcount,
                  v = void 0 !== r.gettree ? r.gettree : this.gettree,
                  m =
                    void 0 !== r.gettreepath ? r.gettreepath : this.gettreepath,
                  y = { getCount: g },
                  _ = {
                    limitLevel:
                      void 0 !== r.limitlevel ? r.limitlevel : this.limitlevel,
                    startWith:
                      void 0 !== r.startwith ? r.startwith : this.startwith,
                  };
                return (
                  v && (y.getTree = _),
                  m && (y.getTreePath = _),
                  (n = n
                    .skip(h * (p - 1))
                    .limit(h)
                    .get(y)),
                  n
                );
              },
            },
          };
        }
        function si(e) {
          return function (t) {
            var n =
              arguments.length > 1 && void 0 !== arguments[1]
                ? arguments[1]
                : {};
            n = (function (e) {
              var t =
                arguments.length > 1 && void 0 !== arguments[1]
                  ? arguments[1]
                  : {};
              return (
                (e.customUI = t.customUI || e.customUI),
                (e.parseSystemError = t.parseSystemError || e.parseSystemError),
                Object.assign(e.loadingOptions, t.loadingOptions),
                Object.assign(e.errorOptions, t.errorOptions),
                "object" == (0, u.default)(t.secretMethods) &&
                  (e.secretMethods = t.secretMethods),
                e
              );
            })(
              {
                customUI: !1,
                loadingOptions: { title: "加载中...", mask: !0 },
                errorOptions: { type: "modal", retry: !1 },
              },
              n
            );
            var i = n,
              o = i.customUI,
              s = i.loadingOptions,
              c = i.errorOptions,
              l = i.parseSystemError,
              d = !o;
            return new Proxy(
              {},
              {
                get: function (i, o) {
                  switch (o) {
                    case "toString":
                      return "[object UniCloudObject]";
                    case "toJSON":
                      return {};
                  }
                  return (function () {
                    var e =
                        arguments.length > 0 && void 0 !== arguments[0]
                          ? arguments[0]
                          : {},
                      t = e.fn,
                      n = e.interceptorName,
                      r = e.getCallbackArgs;
                    return (0, f.default)(
                      a.default.mark(function e() {
                        var i,
                          o,
                          s,
                          c,
                          u,
                          l,
                          f = arguments;
                        return a.default.wrap(
                          function (e) {
                            while (1)
                              switch ((e.prev = e.next)) {
                                case 0:
                                  for (
                                    i = f.length, o = new Array(i), s = 0;
                                    s < i;
                                    s++
                                  )
                                    o[s] = f[s];
                                  return (
                                    (c = r ? r({ params: o }) : {}),
                                    (e.prev = 2),
                                    (e.next = 5),
                                    ce(ue(n, "invoke"), S({}, c))
                                  );
                                case 5:
                                  return (e.next = 7), t.apply(void 0, o);
                                case 7:
                                  return (
                                    (u = e.sent),
                                    (e.next = 10),
                                    ce(
                                      ue(n, "success"),
                                      S(S({}, c), {}, { result: u })
                                    )
                                  );
                                case 10:
                                  return e.abrupt("return", u);
                                case 13:
                                  return (
                                    (e.prev = 13),
                                    (e.t0 = e["catch"](2)),
                                    (l = e.t0),
                                    (e.next = 18),
                                    ce(
                                      ue(n, "fail"),
                                      S(S({}, c), {}, { error: l })
                                    )
                                  );
                                case 18:
                                  throw l;
                                case 19:
                                  return (
                                    (e.prev = 19),
                                    (e.next = 22),
                                    ce(
                                      ue(n, "complete"),
                                      S(
                                        S({}, c),
                                        {},
                                        l ? { error: l } : { result: u }
                                      )
                                    )
                                  );
                                case 22:
                                  return e.finish(19);
                                case 23:
                                case "end":
                                  return e.stop();
                              }
                          },
                          e,
                          null,
                          [[2, 13, 19, 23]]
                        );
                      })
                    );
                  })({
                    fn: (function () {
                      var i = (0, f.default)(
                        a.default.mark(function i() {
                          var h,
                            g,
                            v,
                            m,
                            y,
                            _,
                            b,
                            w,
                            k,
                            x,
                            A,
                            I,
                            O,
                            P,
                            T,
                            C = arguments;
                          return a.default.wrap(
                            function (i) {
                              while (1)
                                switch ((i.prev = i.next)) {
                                  case 0:
                                    for (
                                      d &&
                                        r.showLoading({
                                          title: s.title,
                                          mask: s.mask,
                                        }),
                                        g = C.length,
                                        v = new Array(g),
                                        m = 0;
                                      m < g;
                                      m++
                                    )
                                      v[m] = C[m];
                                    return (
                                      (y = {
                                        name: t,
                                        type: M,
                                        data: { method: o, params: v },
                                      }),
                                      "object" ==
                                        (0, u.default)(n.secretMethods) &&
                                        (function (e, t) {
                                          var n = t.data.method,
                                            r = e.secretMethods || {},
                                            i = r[n] || r["*"];
                                          i && (t.secretType = i);
                                        })(n, y),
                                      (_ = !1),
                                      (i.prev = 5),
                                      (i.next = 8),
                                      e.callFunction(y)
                                    );
                                  case 8:
                                    (h = i.sent), (i.next = 14);
                                    break;
                                  case 11:
                                    (i.prev = 11),
                                      (i.t0 = i["catch"](5)),
                                      (_ = !0),
                                      (h = { result: new Pe(i.t0) });
                                  case 14:
                                    if (
                                      ((b = h.result || {}),
                                      (w = b.errSubject),
                                      (k = b.errCode),
                                      (x = b.errMsg),
                                      (A = b.newToken),
                                      d && r.hideLoading(),
                                      A &&
                                        A.token &&
                                        A.tokenExpired &&
                                        (Ee(A), we(he, S({}, A))),
                                      !k)
                                    ) {
                                      i.next = 39;
                                      break;
                                    }
                                    if (((I = x), !_ || !l)) {
                                      i.next = 24;
                                      break;
                                    }
                                    return (
                                      (i.next = 20),
                                      l({
                                        objectName: t,
                                        methodName: o,
                                        params: v,
                                        errSubject: w,
                                        errCode: k,
                                        errMsg: x,
                                      })
                                    );
                                  case 20:
                                    if (((i.t1 = i.sent.errMsg), i.t1)) {
                                      i.next = 23;
                                      break;
                                    }
                                    i.t1 = x;
                                  case 23:
                                    I = i.t1;
                                  case 24:
                                    if (!d) {
                                      i.next = 37;
                                      break;
                                    }
                                    if ("toast" !== c.type) {
                                      i.next = 29;
                                      break;
                                    }
                                    r.showToast({ title: I, icon: "none" }),
                                      (i.next = 37);
                                    break;
                                  case 29:
                                    if ("modal" === c.type) {
                                      i.next = 31;
                                      break;
                                    }
                                    throw new Error(
                                      "Invalid errorOptions.type: ".concat(
                                        c.type
                                      )
                                    );
                                  case 31:
                                    return (
                                      (i.next = 33),
                                      (0, f.default)(
                                        a.default.mark(function e() {
                                          var t,
                                            n,
                                            i,
                                            o,
                                            s,
                                            c,
                                            u = arguments;
                                          return a.default.wrap(function (e) {
                                            while (1)
                                              switch ((e.prev = e.next)) {
                                                case 0:
                                                  return (
                                                    (t =
                                                      u.length > 0 &&
                                                      void 0 !== u[0]
                                                        ? u[0]
                                                        : {}),
                                                    (n = t.title),
                                                    (i = t.content),
                                                    (o = t.showCancel),
                                                    (s = t.cancelText),
                                                    (c = t.confirmText),
                                                    e.abrupt(
                                                      "return",
                                                      new Promise(function (
                                                        e,
                                                        t
                                                      ) {
                                                        r.showModal({
                                                          title: n,
                                                          content: i,
                                                          showCancel: o,
                                                          cancelText: s,
                                                          confirmText: c,
                                                          success: function (
                                                            t
                                                          ) {
                                                            e(t);
                                                          },
                                                          fail: function () {
                                                            e({
                                                              confirm: !1,
                                                              cancel: !0,
                                                            });
                                                          },
                                                        });
                                                      })
                                                    )
                                                  );
                                                case 2:
                                                case "end":
                                                  return e.stop();
                                              }
                                          }, e);
                                        })
                                      )({
                                        title: "提示",
                                        content: I,
                                        showCancel: c.retry,
                                        cancelText: "取消",
                                        confirmText: c.retry ? "重试" : "确定",
                                      })
                                    );
                                  case 33:
                                    if (
                                      ((O = i.sent),
                                      (P = O.confirm),
                                      !c.retry || !P)
                                    ) {
                                      i.next = 37;
                                      break;
                                    }
                                    return i.abrupt(
                                      "return",
                                      p.apply(void 0, v)
                                    );
                                  case 37:
                                    throw (
                                      ((T = new Pe({
                                        subject: w,
                                        code: k,
                                        message: x,
                                        requestId: h.requestId,
                                      })),
                                      (T.detail = h.result),
                                      we(de, { type: me, content: T }),
                                      T)
                                    );
                                  case 39:
                                    return i.abrupt(
                                      "return",
                                      (we(de, { type: me, content: h.result }),
                                      h.result)
                                    );
                                  case 40:
                                  case "end":
                                    return i.stop();
                                }
                            },
                            i,
                            null,
                            [[5, 11]]
                          );
                        })
                      );
                      function p() {
                        return i.apply(this, arguments);
                      }
                      return p;
                    })(),
                    interceptorName: "callObject",
                    getCallbackArgs: function () {
                      var e =
                          arguments.length > 0 && void 0 !== arguments[0]
                            ? arguments[0]
                            : {},
                        n = e.params;
                      return { objectName: t, methodName: o, params: n };
                    },
                  });
                },
              }
            );
          };
        }
        function ci(e) {
          return re(
            "_globalUniCloudSecureNetworkCache__{spaceId}".replace(
              "{spaceId}",
              e.config.spaceId
            )
          );
        }
        function ui() {
          return li.apply(this, arguments);
        }
        function li() {
          return (
            (li = (0, f.default)(
              a.default.mark(function e() {
                var t,
                  n,
                  i,
                  o,
                  s,
                  c,
                  u,
                  l = arguments;
                return a.default.wrap(
                  function (e) {
                    while (1)
                      switch ((e.prev = e.next)) {
                        case 0:
                          if (
                            ((t = l.length > 0 && void 0 !== l[0] ? l[0] : {}),
                            (n = t.openid),
                            (i = t.callLoginByWeixin),
                            (o = void 0 !== i && i),
                            (s = ci(this)),
                            "mp-weixin" === X)
                          ) {
                            e.next = 4;
                            break;
                          }
                          throw new Error(
                            "[SecureNetwork] API `initSecureNetworkByWeixin` is not supported on platform `".concat(
                              X,
                              "`"
                            )
                          );
                        case 4:
                          if (!n || !o) {
                            e.next = 6;
                            break;
                          }
                          throw new Error(
                            "[SecureNetwork] openid and callLoginByWeixin cannot be passed at the same time"
                          );
                        case 6:
                          if (!n) {
                            e.next = 8;
                            break;
                          }
                          return e.abrupt(
                            "return",
                            ((s.mpWeixinOpenid = n), {})
                          );
                        case 8:
                          return (
                            (e.next = 10),
                            new Promise(function (e, t) {
                              r.login({
                                success: function (t) {
                                  e(t.code);
                                },
                                fail: function (e) {
                                  t(new Error(e.errMsg));
                                },
                              });
                            })
                          );
                        case 10:
                          return (
                            (c = e.sent),
                            (u = this.importObject("uni-id-co", {
                              customUI: !0,
                            })),
                            (e.next = 14),
                            u.secureNetworkHandshakeByWeixin({
                              code: c,
                              callLoginByWeixin: o,
                            })
                          );
                        case 14:
                          return (
                            (s.mpWeixinCode = c),
                            e.abrupt("return", { code: c })
                          );
                        case 16:
                        case "end":
                          return e.stop();
                      }
                  },
                  e,
                  this
                );
              })
            )),
            li.apply(this, arguments)
          );
        }
        function fi(e) {
          return di.apply(this, arguments);
        }
        function di() {
          return (
            (di = (0, f.default)(
              a.default.mark(function e(t) {
                var n;
                return a.default.wrap(
                  function (e) {
                    while (1)
                      switch ((e.prev = e.next)) {
                        case 0:
                          return (
                            (n = ci(this)),
                            e.abrupt(
                              "return",
                              (n.initPromise ||
                                (n.initPromise = ui
                                  .call(this, t)
                                  .then(function (e) {
                                    return e;
                                  })
                                  .catch(function (e) {
                                    throw (delete n.initPromise, e);
                                  })),
                              n.initPromise)
                            )
                          );
                        case 2:
                        case "end":
                          return e.stop();
                      }
                  },
                  e,
                  this
                );
              })
            )),
            di.apply(this, arguments)
          );
        }
        function pi(e) {
          return function () {
            var t =
                arguments.length > 0 && void 0 !== arguments[0]
                  ? arguments[0]
                  : {},
              n = t.openid,
              r = t.callLoginByWeixin,
              i = void 0 !== r && r;
            return fi.call(e, { openid: n, callLoginByWeixin: i });
          };
        }
        function hi(e) {
          !(function (e) {
            De = e;
          })(e);
        }
        function gi(e) {
          var t = {
            getSystemInfo: r.getSystemInfo,
            getPushClientId: r.getPushClientId,
          };
          return function (n) {
            return new Promise(function (r, i) {
              t[e](
                S(
                  S({}, n),
                  {},
                  {
                    success: function (e) {
                      r(e);
                    },
                    fail: function (e) {
                      i(e);
                    },
                  }
                )
              );
            });
          };
        }
        var vi = (function (e) {
          function t() {
            var e;
            return (
              (0, m.default)(this, t),
              (e = A(this, t)),
              (e._uniPushMessageCallback = e._receivePushMessage.bind(
                (0, s.default)(e)
              )),
              (e._currentMessageId = -1),
              (e._payloadQueue = []),
              e
            );
          }
          return (
            (0, g.default)(t, e),
            (0, y.default)(t, [
              {
                key: "init",
                value: function () {
                  var e = this;
                  return Promise.all([
                    gi("getSystemInfo")(),
                    gi("getPushClientId")(),
                  ]).then(
                    function () {
                      var t =
                          arguments.length > 0 && void 0 !== arguments[0]
                            ? arguments[0]
                            : [],
                        n = (0, c.default)(t, 2),
                        r = n[0],
                        i = void 0 === r ? {} : r,
                        o = i.appId,
                        a = n[1],
                        s = void 0 === a ? {} : a,
                        u = s.cid;
                      if (!o)
                        throw new Error(
                          "Invalid appId, please check the manifest.json file"
                        );
                      if (!u) throw new Error("Invalid push client id");
                      (e._appId = o),
                        (e._pushClientId = u),
                        (e._seqId =
                          Date.now() +
                          "-" +
                          Math.floor(9e5 * Math.random() + 1e5)),
                        e.emit("open"),
                        e._initMessageListener();
                    },
                    function (t) {
                      throw (e.emit("error", t), e.close(), t);
                    }
                  );
                },
              },
              {
                key: "open",
                value: (function () {
                  var e = (0, f.default)(
                    a.default.mark(function e() {
                      return a.default.wrap(
                        function (e) {
                          while (1)
                            switch ((e.prev = e.next)) {
                              case 0:
                                return e.abrupt("return", this.init());
                              case 1:
                              case "end":
                                return e.stop();
                            }
                        },
                        e,
                        this
                      );
                    })
                  );
                  function t() {
                    return e.apply(this, arguments);
                  }
                  return t;
                })(),
              },
              {
                key: "_isUniCloudSSE",
                value: function (e) {
                  if ("receive" !== e.type) return !1;
                  var t = e && e.data && e.data.payload;
                  return !(
                    !t ||
                    "UNI_CLOUD_SSE" !== t.channel ||
                    t.seqId !== this._seqId
                  );
                },
              },
              {
                key: "_receivePushMessage",
                value: function (e) {
                  if (this._isUniCloudSSE(e)) {
                    var t = e && e.data && e.data.payload,
                      n = t.action,
                      r = t.messageId,
                      i = t.message;
                    this._payloadQueue.push({
                      action: n,
                      messageId: r,
                      message: i,
                    }),
                      this._consumMessage();
                  }
                },
              },
              {
                key: "_consumMessage",
                value: function () {
                  for (var e = this; ; ) {
                    var t = this._payloadQueue.find(function (t) {
                      return t.messageId === e._currentMessageId + 1;
                    });
                    if (!t) break;
                    this._currentMessageId++, this._parseMessagePayload(t);
                  }
                },
              },
              {
                key: "_parseMessagePayload",
                value: function (e) {
                  var t = e.action,
                    n = e.messageId,
                    r = e.message;
                  "end" === t
                    ? this._end({ messageId: n, message: r })
                    : "message" === t &&
                      this._appendMessage({ messageId: n, message: r });
                },
              },
              {
                key: "_appendMessage",
                value: function () {
                  var e =
                      arguments.length > 0 && void 0 !== arguments[0]
                        ? arguments[0]
                        : {},
                    t = (e.messageId, e.message);
                  this.emit("message", t);
                },
              },
              {
                key: "_end",
                value: function () {
                  var e =
                      arguments.length > 0 && void 0 !== arguments[0]
                        ? arguments[0]
                        : {},
                    t = (e.messageId, e.message);
                  this.emit("end", t), this.close();
                },
              },
              {
                key: "_initMessageListener",
                value: function () {
                  r.onPushMessage(this._uniPushMessageCallback);
                },
              },
              {
                key: "_destroy",
                value: function () {
                  r.offPushMessage(this._uniPushMessageCallback);
                },
              },
              {
                key: "toJSON",
                value: function () {
                  return {
                    appId: this._appId,
                    pushClientId: this._pushClientId,
                    seqId: this._seqId,
                  };
                },
              },
              {
                key: "close",
                value: function () {
                  this._destroy(), this.emit("close");
                },
              },
            ])
          );
        })(
          (function () {
            function e() {
              (0, m.default)(this, e), (this._callback = {});
            }
            return (0, y.default)(e, [
              {
                key: "addListener",
                value: function (e, t) {
                  this._callback[e] || (this._callback[e] = []),
                    this._callback[e].push(t);
                },
              },
              {
                key: "on",
                value: function (e, t) {
                  return this.addListener(e, t);
                },
              },
              {
                key: "removeListener",
                value: function (e, t) {
                  if (!t)
                    throw new Error(
                      'The "listener" argument must be of type function. Received undefined'
                    );
                  var n = this._callback[e];
                  if (n) {
                    var r = (function (e, t) {
                      for (var n = e.length - 1; n >= 0; n--)
                        if (e[n] === t) return n;
                      return -1;
                    })(n, t);
                    n.splice(r, 1);
                  }
                },
              },
              {
                key: "off",
                value: function (e, t) {
                  return this.removeListener(e, t);
                },
              },
              {
                key: "removeAllListener",
                value: function (e) {
                  delete this._callback[e];
                },
              },
              {
                key: "emit",
                value: function (e) {
                  for (
                    var t = this._callback[e],
                      n = arguments.length,
                      r = new Array(n > 1 ? n - 1 : 0),
                      i = 1;
                    i < n;
                    i++
                  )
                    r[i - 1] = arguments[i];
                  if (t) for (var o = 0; o < t.length; o++) t[o].apply(t, r);
                },
              },
            ]);
          })()
        );
        function mi(e, t) {
          return yi.apply(this, arguments);
        }
        function yi() {
          return (
            (yi = (0, f.default)(
              a.default.mark(function e(t, n) {
                var r, i, o;
                return a.default.wrap(
                  function (e) {
                    while (1)
                      switch ((e.prev = e.next)) {
                        case 0:
                          return (
                            (r = "http://"
                              .concat(t, ":")
                              .concat(n, "/system/ping")),
                            (e.prev = 1),
                            (e.next = 4),
                            (o = { url: r, timeout: 500 }),
                            new Promise(function (e, t) {
                              Te.request(
                                S(
                                  S({}, o),
                                  {},
                                  {
                                    success: function (t) {
                                      e(t);
                                    },
                                    fail: function (e) {
                                      t(e);
                                    },
                                  }
                                )
                              );
                            })
                          );
                        case 4:
                          return (
                            (i = e.sent),
                            e.abrupt("return", !(!i.data || 0 !== i.data.code))
                          );
                        case 8:
                          return (
                            (e.prev = 8),
                            (e.t0 = e["catch"](1)),
                            e.abrupt("return", !1)
                          );
                        case 11:
                        case "end":
                          return e.stop();
                      }
                  },
                  e,
                  null,
                  [[1, 8]]
                );
              })
            )),
            yi.apply(this, arguments)
          );
        }
        function _i(e) {
          return bi.apply(this, arguments);
        }
        function bi() {
          return (
            (bi = (0, f.default)(
              a.default.mark(function e(t) {
                var n, r, i, o, s, c, u, l, d, p, h;
                return a.default.wrap(function (e) {
                  while (1)
                    switch ((e.prev = e.next)) {
                      case 0:
                        if (J) {
                          e.next = 2;
                          break;
                        }
                        return e.abrupt("return", Promise.resolve());
                      case 2:
                        if (
                          ("app" === X &&
                            ((n = je()),
                            (r = n.osName),
                            (i = n.osVersion),
                            "ios" === r &&
                              (function (e) {
                                if (!e || "string" != typeof e) return 0;
                                var t = e.match(/^(\d+)./);
                                return t && t[1] ? parseInt(t[1]) : 0;
                              })(i) >= 14 &&
                              console.warn(
                                "iOS 14及以上版本连接uniCloud本地调试服务需要允许客户端查找并连接到本地网络上的设备（仅开发期间需要，发行后不需要）"
                              )),
                          (o = t.__dev__),
                          o.debugInfo)
                        ) {
                          e.next = 6;
                          break;
                        }
                        return e.abrupt("return");
                      case 6:
                        return (
                          (s = o.debugInfo),
                          (c = s.address),
                          (u = s.servePort),
                          (e.next = 11),
                          (function () {
                            var e = (0, f.default)(
                              a.default.mark(function e(t, n) {
                                var r, i, o;
                                return a.default.wrap(function (e) {
                                  while (1)
                                    switch ((e.prev = e.next)) {
                                      case 0:
                                        i = 0;
                                      case 1:
                                        if (!(i < t.length)) {
                                          e.next = 11;
                                          break;
                                        }
                                        return (
                                          (o = t[i]), (e.next = 5), mi(o, n)
                                        );
                                      case 5:
                                        if (!e.sent) {
                                          e.next = 8;
                                          break;
                                        }
                                        return (r = o), e.abrupt("break", 11);
                                      case 8:
                                        i++, (e.next = 1);
                                        break;
                                      case 11:
                                        return e.abrupt("return", {
                                          address: r,
                                          port: n,
                                        });
                                      case 12:
                                      case "end":
                                        return e.stop();
                                    }
                                }, e);
                              })
                            );
                            return function (t, n) {
                              return e.apply(this, arguments);
                            };
                          })()(c, u)
                        );
                      case 11:
                        if (((l = e.sent), (d = l.address), !d)) {
                          e.next = 15;
                          break;
                        }
                        return e.abrupt(
                          "return",
                          ((o.localAddress = d), void (o.localPort = u))
                        );
                      case 15:
                        if (
                          ((p = console["app" === X ? "error" : "warn"]),
                          (h = ""),
                          "remote" === o.debugInfo.initialLaunchType
                            ? ((o.debugInfo.forceRemote = !0),
                              (h =
                                "当前客户端和HBuilderX不在同一局域网下（或其他网络原因无法连接HBuilderX），uniCloud本地调试服务不对当前客户端生效。\n- 如果不使用uniCloud本地调试服务，请直接忽略此信息。\n- 如需使用uniCloud本地调试服务，请将客户端与主机连接到同一局域网下并重新运行到客户端。"))
                            : (h =
                                "无法连接uniCloud本地调试服务，请检查当前客户端是否与主机在同一局域网下。\n- 如需使用uniCloud本地调试服务，请将客户端与主机连接到同一局域网下并重新运行到客户端。"),
                          (h +=
                            "\n- 如果在HBuilderX开启的状态下切换过网络环境，请重启HBuilderX后再试\n- 检查系统防火墙是否拦截了HBuilderX自带的nodejs\n- 检查是否错误的使用拦截器修改uni.request方法的参数"),
                          "web" === X &&
                            (h +=
                              "\n- 部分浏览器开启节流模式之后访问本地地址受限，请检查是否启用了节流模式"),
                          0 === X.indexOf("mp-") &&
                            (h +=
                              "\n- 小程序中如何使用uniCloud，请参考：https://uniapp.dcloud.net.cn/uniCloud/publish.html#useinmp"),
                          o.debugInfo.forceRemote)
                        ) {
                          e.next = 19;
                          break;
                        }
                        throw new Error(h);
                      case 19:
                        p(h);
                      case 20:
                      case "end":
                        return e.stop();
                    }
                }, e);
              })
            )),
            bi.apply(this, arguments)
          );
        }
        function wi(e) {
          e._initPromiseHub ||
            (e._initPromiseHub = new H({
              createPromise: function () {
                var t,
                  n = Promise.resolve();
                (t = 1),
                  (n = new Promise(function (e) {
                    setTimeout(function () {
                      e();
                    }, t);
                  }));
                var r = e.auth();
                return n
                  .then(function () {
                    return r.getLoginState();
                  })
                  .then(function (e) {
                    return e ? Promise.resolve() : r.signInAnonymously();
                  });
              },
            }));
        }
        var ki = { tcb: Wt, tencent: Wt, aliyun: $e, private: Gt, alipay: an },
          xi = new ((function () {
            function e() {
              (0, m.default)(this, e);
            }
            return (0, y.default)(e, [
              {
                key: "init",
                value: function (e) {
                  var t = {},
                    n = ki[e.provider];
                  if (!n) throw new Error("未提供正确的provider参数");
                  return (
                    (t = n.init(e)),
                    J &&
                      (function (e) {
                        if (J) {
                          var t = {};
                          (e.__dev__ = t),
                            (t.debugLog =
                              J &&
                              (("web" === X &&
                                navigator.userAgent.indexOf("HBuilderX") > 0) ||
                                "app" === X));
                          var n = Q;
                          n && !n.code && (t.debugInfo = n);
                          var r = new H({
                            createPromise: function () {
                              return _i(e);
                            },
                          });
                          t.initLocalNetwork = function () {
                            return r.exec();
                          };
                        }
                      })(t),
                    wi(t),
                    hr(t),
                    (function (e) {
                      var t = e.uploadFile;
                      e.uploadFile = function (e) {
                        return t.call(this, e);
                      };
                    })(t),
                    (function (e) {
                      (e.database = function (t) {
                        if (t && Object.keys(t).length > 0)
                          return e.init(t).database();
                        if (this._database) return this._database;
                        var n = Ar(Ir, { uniClient: e });
                        return (this._database = n), n;
                      }),
                        (e.databaseForJQL = function (t) {
                          if (t && Object.keys(t).length > 0)
                            return e.init(t).databaseForJQL();
                          if (this._databaseForJQL) return this._databaseForJQL;
                          var n = Ar(Ir, { uniClient: e, isJQL: !0 });
                          return (this._databaseForJQL = n), n;
                        });
                    })(t),
                    (function (e) {
                      (e.getCurrentUserInfo = ni),
                        (e.chooseAndUploadFile = ii.initChooseAndUploadFile(e)),
                        Object.assign(e, {
                          get mixinDatacom() {
                            return ai(e);
                          },
                        }),
                        (e.SSEChannel = vi),
                        (e.initSecureNetworkByWeixin = pi(e)),
                        (e.setCustomClientInfo = hi),
                        (e.importObject = si(e));
                    })(t),
                    [
                      "callFunction",
                      "uploadFile",
                      "deleteFile",
                      "getTempFileURL",
                      "downloadFile",
                      "chooseAndUploadFile",
                    ].forEach(function (e) {
                      if (t[e]) {
                        var n = t[e];
                        (t[e] = function () {
                          return n.apply(t, Array.from(arguments));
                        }),
                          (t[e] = (function (e, t) {
                            return function (n) {
                              var r = this,
                                i = !1;
                              if ("callFunction" === t) {
                                var o = (n && n.type) || D;
                                i = o !== D;
                              }
                              var a = "callFunction" === t && !i,
                                s = this._initPromiseHub.exec();
                              n = n || {};
                              var c = Ae(n),
                                u = c.success,
                                l = c.fail,
                                f = c.complete,
                                d = s
                                  .then(function () {
                                    return i
                                      ? Promise.resolve()
                                      : ce(ue(t, "invoke"), n);
                                  })
                                  .then(function () {
                                    return e.call(r, n);
                                  })
                                  .then(
                                    function (e) {
                                      return i
                                        ? Promise.resolve(e)
                                        : ce(ue(t, "success"), e)
                                            .then(function () {
                                              return ce(ue(t, "complete"), e);
                                            })
                                            .then(function () {
                                              return (
                                                a &&
                                                  we(de, {
                                                    type: ve,
                                                    content: e,
                                                  }),
                                                Promise.resolve(e)
                                              );
                                            });
                                    },
                                    function (e) {
                                      return i
                                        ? Promise.reject(e)
                                        : ce(ue(t, "fail"), e)
                                            .then(function () {
                                              return ce(ue(t, "complete"), e);
                                            })
                                            .then(function () {
                                              return (
                                                we(de, {
                                                  type: ve,
                                                  content: e,
                                                }),
                                                Promise.reject(e)
                                              );
                                            });
                                    }
                                  );
                              if (!(u || l || f)) return d;
                              d.then(
                                function (e) {
                                  u && u(e),
                                    f && f(e),
                                    a && we(de, { type: ve, content: e });
                                },
                                function (e) {
                                  l && l(e),
                                    f && f(e),
                                    a && we(de, { type: ve, content: e });
                                }
                              );
                            };
                          })(t[e], e).bind(t));
                      }
                    }),
                    (t.init = this.init),
                    t
                  );
                },
              },
            ]);
          })())();
        (function () {
          var e = ee,
            t = {};
          if (e && 1 === e.length)
            (t = e[0]), (xi = xi.init(t)), (xi._isDefault = !0);
          else {
            var n,
              r = [
                "auth",
                "callFunction",
                "uploadFile",
                "deleteFile",
                "getTempFileURL",
                "downloadFile",
                "database",
                "getCurrentUSerInfo",
                "importObject",
              ];
            (n =
              e && e.length > 0
                ? "应用有多个服务空间，请通过uniCloud.init方法指定要使用的服务空间"
                : te
                ? "应用未关联服务空间，请在uniCloud目录右键关联服务空间"
                : "uni-app cli项目内使用uniCloud需要使用HBuilderX的运行菜单运行项目，且需要在uniCloud目录关联服务空间"),
              r.forEach(function (e) {
                xi[e] = function () {
                  return (
                    console.error(n),
                    Promise.reject(new Pe({ code: "SYS_ERR", message: n }))
                  );
                };
              });
          }
          Object.assign(xi, {
            get mixinDatacom() {
              return ai(xi);
            },
          }),
            Qr(xi),
            (xi.addInterceptor = ae),
            (xi.removeInterceptor = se),
            (xi.interceptObject = le),
            J && "web" === X && (window.uniCloud = xi);
        })();
        t.default = xi;
      }).call(this, n("c8ba"), n("543d")["default"], n("bc2e")["default"]);
    },
    ace3: function (e, t, n) {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 }),
        (t.default = void 0);
      t.default = {
        pages: [
          {
            path: "pages/shucheng/shucheng",
            style: {
              navigationBarTitleText: "书城",
              enablePullDownRefresh: !0,
            },
          },
          {
            path: "pages/stack/stack",
            style: { navigationBarTitleText: "书库" },
          },
          {
            path: "pages/shujia/shujia",
            style: { navigationBarTitleText: "书架" },
          },
          {
            path: "pages/shucheng/search",
            style: { navigationBarTitleText: "搜索" },
          },
          {
            path: "pages/readPage/detail",
            style: { navigationBarTitleText: "" },
          },
          {
            path: "pages/readPage/catalog",
            style: { navigationBarTitleText: "目录" },
          },
          {
            path: "pages/readPage/audio",
            style: { navigationBarTitleText: "音频" },
          },
          {
            path: "pages/mine/mine",
            style: { navigationBarTitleText: "我的" },
          },
          {
            path: "pages/readPage/chapter",
            style: {
              navigationBarTitleText: "",
              enablePullDownRefresh: !0,
              onReachBottomDistance: 20,
            },
          },
          {
            path: "pages/readPage/longChapter",
            style: {
              navigationBarTitleText: "",
              enablePullDownRefresh: !0,
              onReachBottomDistance: 20,
            },
          },
        ],
        subPackages: [
          {
            root: "pages/wode",
            pages: [
              {
                path: "invitationCode",
                style: { navigationBarTitleText: "邀请码" },
              },
              {
                path: "bloggerCenter",
                style: { navigationBarTitleText: "博主中心" },
              },
              { path: "setting", style: { navigationBarTitleText: "设置" } },
              { path: "notice", style: { navigationBarTitleText: "通知公告" } },
              {
                path: "noticeDetail",
                style: { navigationBarTitleText: "通知公告" },
              },
              {
                path: "personalInfo",
                style: { navigationBarTitleText: "个人信息" },
              },
              { path: "topup", style: { navigationBarTitleText: "充值中心" } },
              {
                path: "coinsRecord",
                style: { navigationBarTitleText: "赠币记录" },
              },
              {
                path: "consume",
                style: { navigationBarTitleText: "收益提现" },
              },
              {
                path: "corePay",
                style: { navigationBarTitleText: "充值历史" },
              },
              {
                path: "consumeList",
                style: { navigationBarTitleText: "消费历史" },
              },
              {
                path: "consumeListDetail",
                style: { navigationBarTitleText: "" },
              },
              {
                path: "readRecord",
                style: { navigationBarTitleText: "阅读记录" },
              },
              { path: "plan", style: { navigationBarTitleText: "推广计划" } },
              {
                path: "renewalAgreement",
                style: { navigationBarTitleText: "自动续费协议" },
              },
              { path: "contact", style: { navigationBarTitleText: "客服" } },
            ],
          },
          {
            root: "pages/account",
            pages: [
              { path: "bound", style: { navigationBarTitleText: "" } },
              { path: "boundAccount", style: { navigationBarTitleText: "" } },
              { path: "resetPwd", style: { navigationBarTitleText: "" } },
            ],
          },
          {
            root: "pages/bountyMission",
            pages: [
              {
                path: "bountyMissionDay",
                style: { navigationBarTitleText: "日常任务" },
              },
              {
                path: "bountyMissionLimit",
                style: { navigationBarTitleText: "限时任务" },
              },
              {
                path: "bountyMissionList",
                style: { navigationBarTitleText: "日常任务" },
              },
              {
                path: "bountyMissionProgress",
                style: { navigationBarTitleText: "日常任务" },
              },
            ],
          },
          {
            root: "pages/setAccount",
            pages: [
              { path: "bind", style: { navigationBarTitleText: "" } },
              { path: "unbind", style: { navigationBarTitleText: "" } },
            ],
          },
          {
            root: "pages/tixian",
            pages: [
              { path: "tixian", style: { navigationBarTitleText: "提现" } },
              {
                path: "cashList",
                style: { navigationBarTitleText: "提现记录" },
              },
              {
                path: "tixianProgress",
                style: { navigationBarTitleText: "提现记录" },
              },
            ],
          },
        ],
        globalStyle: {
          navigationBarTextStyle: "black",
          navigationBarTitleText: "",
          navigationBarBackgroundColor: "#ffffff",
        },
        tabBar: {
          color: "#aaaaaa",
          selectedColor: "#FE6868",
          backgroundColor: "#FFFFFF",
          borderStyle: "black",
          list: [
            {
              pagePath: "pages/shujia/shujia",
              iconPath: "static/img/ic_sj_normal.png",
              selectedIconPath: "static/img/ic_sj_selected.png",
              text: "书架",
              iconWidth: "28px",
            },
            {
              pagePath: "pages/shucheng/shucheng",
              iconPath: "static/img/ic_sc_normal.png",
              selectedIconPath: "static/img/ic_sc_selected.png",
              text: "书城",
              iconWidth: "28px",
              iconfont: "",
            },
            {
              pagePath: "pages/stack/stack",
              iconPath: "static/img/ic_sk_normal.png",
              selectedIconPath: "static/img/ic_sk_selected.png",
              text: "书库",
              iconWidth: "28px",
              iconfont: "",
            },
            {
              pagePath: "pages/mine/mine",
              iconPath: "static/img/ic_mine_normal.png",
              selectedIconPath: "static/img/ic_mine_selected.png",
              text: "我的",
              iconWidth: "28px",
            },
          ],
        },
      };
    },
    b17c: function (e, t, n) {
      var r = n("6f8f"),
        i = n("4a4b");
      function o(e, t, n) {
        if (r()) return Reflect.construct.apply(null, arguments);
        var o = [null];
        o.push.apply(o, t);
        var a = new (e.bind.apply(e, o))();
        return n && i(a, n.prototype), a;
      }
      (e.exports = o),
        (e.exports.__esModule = !0),
        (e.exports["default"] = e.exports);
    },
    b35e: function (e, t, n) {
      "use strict";
      (function (e, n) {
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.commonJS = void 0);
        t.commonJS = {
          data: function () {
            return {
              uniPlatform: "",
              projectName: JSON.parse(e.getStorageSync("appInfo")).appName,
              projectGroup: JSON.parse(e.getStorageSync("appInfo")).appNumber,
            };
          },
          mounted: function () {},
          onShow: function () {
            this.uniPlatform = e.getSystemInfoSync().uniPlatform;
          },
          onShareAppMessage: function (t) {
            return {
              title: JSON.parse(e.getStorageSync("appInfo")).appName,
              imageUrl: "",
              path: "/pages/shucheng/shucheng",
              success: function () {
                console.log(1111);
              },
              fail: function () {
                console.log(2222);
              },
            };
          },
          methods: {
            onSuccessImg: function (e) {
              this.$set(e, "imgLoaded", !0);
            },
            copycommand: function () {
              var t = this;
              this.$post(this.$api.bookgenerate, { bookId: this.bookId }).then(
                function (n) {
                  var r = "";
                  "mp-toutiao" == t.uniPlatform
                    ? (r =
                        "请在抖音搜索“" +
                        JSON.parse(e.getStorageSync("appInfo")).appName +
                        "”后搜索口令" +
                        n.data +
                        "，开始阅读吧！")
                    : "mp-kuaishou" == t.uniPlatform
                    ? (r =
                        "请在快手搜索“" +
                        JSON.parse(e.getStorageSync("appInfo")).appName +
                        "”后，搜索口令" +
                        n.data +
                        "，开始阅读吧！")
                    : "mp-weixin" == t.uniPlatform &&
                      (r =
                        "请在微信搜索“" +
                        JSON.parse(e.getStorageSync("appInfo")).appName +
                        "”小程序，在小程序内搜索口令" +
                        n.data +
                        "，开始阅读吧！");
                  var i = "";
                  "mp-toutiao" == t.uniPlatform
                    ? (i = "抖音")
                    : "mp-kuaishou" == t.uniPlatform
                    ? (i = "快手")
                    : "mp-weixin" == t.uniPlatform && (i = "微信"),
                    console.log(t.uniPlatform, i),
                    e.setClipboardData({
                      data: r,
                      success: function () {
                        e.showToast({
                          title:
                            "口令已复制，在" + i + "视频中粘贴分享给好友吧！",
                          icon: "none",
                          duration: 1e3,
                        });
                      },
                    });
                }
              );
            },
            copyconcentration: function (t, n) {
              t &&
                e.setClipboardData({
                  data: n ? t + "\r\n" + n : t,
                  success: function () {
                    e.showToast({
                      title: "复制成功！",
                      icon: "none",
                      duration: 1e3,
                    });
                  },
                });
            },
            iswxReader: function (t, r) {
              if ((console.log(t), getApp().globalData.systemInfo.openReader)) {
                var i = t.wxbookid ? t.wxbookid : t.wxBookId;
                if (!t.wxbookid && !t.wxBookId)
                  return (
                    e.showToast({
                      title: "暂无此书！",
                      icon: "none",
                      duration: 1e3,
                    }),
                    !1
                  );
                if ("chapter" == r || "detail" == r)
                  n.redirectTo({
                    url:
                      "plugin-private://wx293c4b6097a8a4d0/pages/novel/index?bookId=" +
                      i,
                  });
                else if ("chapterLink" == r) {
                  var o = {
                    bookId: i,
                    pid: t.userAdChannel,
                    customParams: t.customParams,
                    inviteCode: t.inviteCode,
                  };
                  n.redirectTo({
                    url:
                      "plugin-private://wx293c4b6097a8a4d0/pages/novel/index?bookId=" +
                      i +
                      "&customServerParams=" +
                      encodeURIComponent(JSON.stringify(o)),
                  });
                }
              } else
                console.log(t),
                  "detail" == r
                    ? this.goNext("/pages/readPage/detail?bookId=" + t.id)
                    : "chapter" == r
                    ? this.goNext(
                        "/pages/readPage/chapter?bookId=".concat(
                          t.id,
                          "&chapterId=0"
                        )
                      )
                    : "chapterLink" == r &&
                      this.goNext(
                        "/pages/readPage/chapter?bookId="
                          .concat(t.id, "&chapterId=0&pid=")
                          .concat(t.userAdChannel, "&customParams=")
                          .concat(t.customParams, "&inviteCode=")
                          .concat(t.inviteCode)
                      );
            },
            goNext: function (t, n, r) {
              if (
                (console.log(t),
                console.log(this.uniPlatform),
                "mp-weixin" != this.uniPlatform &&
                  "/pages/tixian/tixian" == t &&
                  !this.consumeInfo.syncUserInfo &&
                  this.consumeInfo.allIncome > 0)
              )
                return this.$refs.syncpopup.open(), !1;
              e.navigateTo({ url: t });
            },
            gohome: function () {
              e.switchTab({ url: "/pages/shucheng/shucheng" });
            },
            showLoadingFun: function () {
              e.showLoading({ title: "加载中", mask: !0 });
            },
            hideLoadingFun: function () {
              e.hideLoading();
            },
            showToastFun: function (t) {
              e.showToast({ title: t, icon: "none", mask: !0, duration: 3e3 });
            },
          },
        };
      }).call(this, n("543d")["default"], n("bc2e")["default"]);
    },
    b775: function (e, t, n) {
      "use strict";
      (function (t) {
        var r = n("4ea4"),
          i = r(n("2eee")),
          o = r(n("c973")),
          a = n("5d2d"),
          s = "https://biz.zhangwenpindu.cn";
        console.log("production"), (s = "https://biz.zhangwenpindu.cn");
        var c = function (e, t) {
            var n = "";
            if ("post" == t) return (n = JSON.stringify(e)), n;
            if ("get" == t) {
              for (var r in e) n += r + "=" + e[r] + "&";
              return (
                (n = n.length > 0 ? n.substring(0, n.length - 1) : ""),
                encodeURI(n)
              );
            }
          },
          u = t.getSystemInfoSync().uniPlatform,
          l = function () {
            var e =
                arguments.length > 0 && void 0 !== arguments[0]
                  ? arguments[0]
                  : "GET",
              n =
                arguments.length > 1 && void 0 !== arguments[1]
                  ? arguments[1]
                  : "",
              r =
                arguments.length > 2 && void 0 !== arguments[2]
                  ? arguments[2]
                  : {},
              c = arguments.length > 3 ? arguments[3] : void 0,
              l = new Promise(
                (function () {
                  var l = (0, o.default)(
                    i.default.mark(function o(l, d) {
                      var p;
                      return i.default.wrap(function (i) {
                        while (1)
                          switch ((i.prev = i.next)) {
                            case 0:
                              (p = s + n + ("GET" === e ? r : "")),
                                t.request({
                                  url: p,
                                  method: e,
                                  data: "GET" === e ? {} : r,
                                  header: {
                                    "content-type":
                                      "application/x-www-form-urlencoded",
                                    Authorization:
                                      "Bearer " + (0, a.getToken)(),
                                    "app-name": JSON.parse(
                                      t.getStorageSync("appInfo")
                                    ).appNumber,
                                    "app-version": "81218893",
                                    "client-platform":
                                      "mp-toutiao" == u
                                        ? 5
                                        : "mp-kuaishou" == u
                                        ? 6
                                        : "mp-weixin" == u
                                        ? 7
                                        : "mp-alipay" == u
                                        ? 9
                                        : 5,
                                    lang: "zh_CN",
                                    "os-type":
                                      "ios" == t.getSystemInfoSync().platform
                                        ? 4
                                        : 3,
                                    "pack-time": new Date().getTime(),
                                  },
                                  success: function (e) {
                                    if (
                                      (e.header.access_token
                                        ? (0, a.setToken)(e.header.access_token)
                                        : e.header.Access_token &&
                                          (0, a.setToken)(
                                            e.header.Access_token
                                          ),
                                      200 == e.statusCode)
                                    ) {
                                      if (e.data.success) return l(e.data);
                                      if ((t.hideLoading(), e.data.redirect))
                                        (0, a.removeToken)(),
                                          t.login({
                                            force: !0,
                                            success: function (e) {
                                              f(
                                                "/user/third/auth/byteDance/miniApp",
                                                {
                                                  code: e.code,
                                                  anonymousCode:
                                                    e.anonymousCode,
                                                  uniPlatform:
                                                    t.getSystemInfoSync()
                                                      .uniPlatform,
                                                }
                                              ).then(function (e) {
                                                t.setStorageSync(
                                                  "userId",
                                                  e.data.id
                                                );
                                                var n = getCurrentPages(),
                                                  r = n[n.length - 1];
                                                r.onShow();
                                              });
                                            },
                                          });
                                      else {
                                        if (c) return l(e.data);
                                        t.hideLoading(),
                                          t.showToast({
                                            title: e.data.message,
                                            duration: 3e3,
                                            icon: "none",
                                            position: "center",
                                          });
                                      }
                                    }
                                  },
                                  fail: function (e) {
                                    console.log("失败请求"),
                                      t.showToast({
                                        title: e.message,
                                        icon: "none",
                                        mask: !0,
                                      }),
                                      d(e);
                                  },
                                });
                            case 2:
                            case "end":
                              return i.stop();
                          }
                      }, o);
                    })
                  );
                  return function (e, t) {
                    return l.apply(this, arguments);
                  };
                })()
              );
            return l;
          },
          f = (function () {
            var e = (0, o.default)(
              i.default.mark(function e(t, n, r) {
                var o;
                return i.default.wrap(function (e) {
                  while (1)
                    switch ((e.prev = e.next)) {
                      case 0:
                        return (e.next = 2), l("POST", t, n, r);
                      case 2:
                        return (o = e.sent), e.abrupt("return", o);
                      case 4:
                      case "end":
                        return e.stop();
                    }
                }, e);
              })
            );
            return function (t, n, r) {
              return e.apply(this, arguments);
            };
          })(),
          d = (function () {
            var e = (0, o.default)(
              i.default.mark(function e(t, n, r) {
                var o, a;
                return i.default.wrap(function (e) {
                  while (1)
                    switch ((e.prev = e.next)) {
                      case 0:
                        return (
                          (o =
                            n && "{}" != JSON.stringify(n)
                              ? "?" + c(n, "get")
                              : ""),
                          (e.next = 3),
                          l("GET", t, o, r)
                        );
                      case 3:
                        return (a = e.sent), e.abrupt("return", a);
                      case 5:
                      case "end":
                        return e.stop();
                    }
                }, e);
              })
            );
            return function (t, n, r) {
              return e.apply(this, arguments);
            };
          })(),
          p = (function () {
            var e = (0, o.default)(
              i.default.mark(function e() {
                var t,
                  n,
                  r = arguments;
                return i.default.wrap(function (e) {
                  while (1)
                    switch ((e.prev = e.next)) {
                      case 0:
                        return (
                          (t =
                            r.length > 0 && void 0 !== r[0]
                              ? r[0]
                              : { method: "GET", url: "", data: {}, dir: dir }),
                          (e.next = 3),
                          l(t.method, t.url, t.data)
                        );
                      case 3:
                        return (n = e.sent), e.abrupt("return", n);
                      case 5:
                      case "end":
                        return e.stop();
                    }
                }, e);
              })
            );
            return function () {
              return e.apply(this, arguments);
            };
          })();
        e.exports = { Post: f, Get: d, http: p };
      }).call(this, n("543d")["default"]);
    },
    b789: function (e, t, n) {
      "use strict";
      (function (e) {
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.accountJS = void 0);
        t.accountJS = {
          data: function () {
            return {
              accountInfo: null,
              sms: { disabled: !1, total: 60, count: 0 },
              formData: { manageId: "", mobile: "", code: "", password: "" },
              showPwd: !1,
              inputType: "password",
              isBind: null,
            };
          },
          onShow: function () {},
          methods: {
            getAccountInfo: function () {
              var t = this;
              e.showLoading({ title: "加载中", mask: !0 }),
                this.$get(this.$api.bindisBindManage, {}).then(function (n) {
                  console.log(n),
                    e.hideLoading(),
                    (t.accountInfo = n.data),
                    (t.formData.mobile = t.accountInfo.phoneNumber),
                    (t.formData.manageId = t.accountInfo.manageId);
                });
            },
            checkPhoneForBind: function () {
              var t = this;
              if (!this.formData.mobile)
                return (
                  e.showToast({
                    title: "请输入手机号",
                    icon: "none",
                    mask: !0,
                  }),
                  !1
                );
              this.$get(this.$api.bindcheckPhoneForBind, {
                mobile: this.formData.mobile,
              }).then(function (e) {
                console.log(e), (t.accountInfo = e.data), (t.isIllustrate = !1);
              });
            },
            sendCode: function () {
              var t = this;
              if (!this.formData.mobile)
                return (
                  e.showToast({
                    title: "请输入手机号",
                    icon: "none",
                    mask: !0,
                  }),
                  !1
                );
              e.showLoading({ title: "加载中", mask: !0 }),
                this.$get(this.$api.usermobilecaptcha, {
                  mobile: this.formData.mobile,
                }).then(function (n) {
                  e.hideLoading(), t.timerHandler();
                });
            },
            timerHandler: function () {
              var e,
                t = this;
              (this.sms.count = this.sms.total),
                (this.sms.disabled = !0),
                e && clearInterval(e),
                (e = setInterval(function () {
                  t.sms.count > 1 && t.sms.count <= t.sms.total
                    ? t.sms.count--
                    : ((t.sms.disabled = !1), clearInterval(e));
                }, 1e3));
            },
            changePwdType: function () {
              (this.showPwd = !this.showPwd),
                (this.inputType = this.showPwd ? "text" : "password");
            },
          },
          onUnload: function () {
            var e = this;
            e.timer && (clearInterval(e.timer), (e.timer = null));
          },
          onHide: function () {
            var e = this;
            e.timer && (clearInterval(e.timer), (e.timer = null));
          },
        };
      }).call(this, n("543d")["default"]);
    },
    bc2e: function (e, t, n) {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 }),
        (t.default = void 0);
      var r = [
          "qy",
          "env",
          "error",
          "version",
          "lanDebug",
          "cloud",
          "serviceMarket",
          "router",
          "worklet",
          "__webpack_require_UNI_MP_PLUGIN__",
        ],
        i = ["lanDebug", "router", "worklet"],
        o =
          "undefined" !== typeof globalThis
            ? globalThis
            : (function () {
                return this;
              })(),
        a = ["w", "x"].join(""),
        s = o[a],
        c = s.getLaunchOptionsSync ? s.getLaunchOptionsSync() : null;
      function u(e) {
        return (
          (!c || 1154 !== c.scene || !i.includes(e)) &&
          (r.indexOf(e) > -1 || "function" === typeof s[e])
        );
      }
      function l() {
        var e = {};
        for (var t in s) u(t) && (e[t] = s[t]);
        return e;
      }
      o[a] = l();
      t.default = o[a];
    },
    c06a: function (e, t, n) {
      "use strict";
      (function (e) {
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.payJS = void 0);
        var n = requirePlugin("novel-plugin");
        t.payJS = {
          data: function () {
            return {
              price: "",
              productId: "",
              consumegradeList: [],
              platform: "",
              orderId: "",
              requestStatus: !1,
              version: "",
              appName: "",
              payFlag: "",
              iosPay: !0,
              imId: "",
              programName: "",
              gradeType: 1,
              paySceneType: { type: "", paySceneDetail: "", moneyStr: "" },
              payment: { provider: "ALIPAY", provider_channel_type: "NORMAL" },
            };
          },
          onShow: function () {
            (this.platform = e.getSystemInfoSync().platform),
              (this.programName = JSON.parse(
                e.getStorageSync("appInfo")
              ).appName),
              "mp-toutiao" == e.getSystemInfoSync().uniPlatform &&
                this.getVersion();
          },
          methods: {
            getVersion: function () {
              var e = this;
              tt.getSystemInfo({
                success: function (t) {
                  console.log(t),
                    (e.appName = t.appName),
                    (e.version = t.version),
                    e.$forceUpdate();
                },
              });
            },
            handlePaymentSelect: function (e) {
              var t = e.detail;
              this.payment = t;
            },
            closeFun: function () {
              this.$refs.detainmentPopup.open("center");
            },
            hidePop: function (e) {
              if (e) return this.$refs.detainmentPopup.close(), !1;
              this.$refs.detainmentPopup.close(), this.$refs.h5PayCon.close();
            },
            gettopupgrade: function (e, t) {
              var n = this;
              this.payFlag = e;
              var r = {
                isVip: !0,
                bookId: this.bookId ? this.bookId : "",
                isWxReader: t || "",
              };
              this.pid &&
                ((r.pid = this.pid),
                (r.linkId = this.linkId),
                (r.clickid = this.clickid)),
                this.$get(this.$api.paygrade, r).then(function (e) {
                  (n.consumegradeList = e.data.grade),
                    (n.gradeType = e.data.gradeType),
                    (n.imId = e.data.imId),
                    (n.iosPay = e.data.iosPay),
                    n.consumegradeList.forEach(function (e) {
                      e.defaultSelect ||
                        (n.productId = n.consumegradeList[0].productId);
                    });
                });
            },
            changeprice: function (t) {
              2 == this.payFlag &&
                (this.bookId && e.setStorageSync(this.bookId, this.scrollTop),
                e.setStorageSync("newBookId", this.bookId)),
                (this.paySceneType.type = t.paySceneType.value),
                (this.paySceneType.moneyStr = t.moneyStr),
                (this.paySceneType.paySceneDetail = t.paySceneDetail),
                (this.productId = t.productId),
                1 == t.paySceneType.value
                  ? this.topupFun()
                  : this.$refs.h5PayCon.open("bottom");
            },
            topupFun: function (t) {
              this.price;
              var n = this,
                r = "ios" == e.getSystemInfoSync().platform ? 4 : 3,
                i = e.getSystemInfoSync().uniPlatform;
              e.showLoading({ title: "加载中", mask: !0, icon: "none" }),
                n
                  .$post(
                    "mp-toutiao" == i
                      ? n.$api.tiktokconsumecreate
                      : n.$api.consumecreate,
                    {
                      productId: n.productId,
                      uniPlatform: i,
                      site: r,
                      douYinAppVersion: n.version,
                      douYinAppType: n.appName,
                      bookId: n.bookId ? n.bookId : "",
                    },
                    1
                  )
                  .then(function (r) {
                    setTimeout(function () {
                      e.hideLoading();
                    }, 500),
                      r.success
                        ? ((n.orderId = r.data.topUpId), n.arousePay(r.data))
                        : (6000036 == r.code && (n.isShowPayBtn = !1),
                          "default" != t && n.showToastFun(r.message));
                  });
            },
            arousePay: function (t) {
              var r = this,
                i = e.getSystemInfoSync().uniPlatform,
                o = this;
              if ("mp-weixin" == i) {
                var a = t.orderToken;
                e.requestPayment({
                  provider: "wxpay",
                  timeStamp: a.timeStamp,
                  nonceStr: a.nonceStr,
                  package: a.package,
                  signType: a.signType,
                  paySign: a.paySign,
                  success: function (t) {
                    if (getApp().globalData.systemInfo.openReader) {
                      var r = n.getNovelManager(o.novelManagerId);
                      r.paymentCompleted(), console.log(r.paymentCompleted());
                    } else
                      1 == o.payFlag
                        ? e.switchTab({ url: "/pages/mine/mine" })
                        : 2 == o.payFlag
                        ? o.getBookCdnInfo("success")
                        : 3 == o.payFlag && o.getBookAudio();
                  },
                  fail: function (e) {
                    console.log(e), o.showToastFun(e.errMsg);
                  },
                });
              } else if ("mp-toutiao" == i)
                tt.requestOrder({
                  data: JSON.stringify(t.orderToken.data),
                  byteAuthorization: t.orderToken.byteAuthorization,
                  success: function (t) {
                    console.log(t),
                      "ios" == o.platform
                        ? tt.getOrderPayment({
                            orderId: t.orderId,
                            imId: r.imId,
                            success: function (t) {
                              1 == o.payFlag
                                ? e.switchTab({ url: "/pages/mine/mine" })
                                : 2 == o.payFlag
                                ? o.getBookCdnInfo()
                                : 3 == o.payFlag && o.getBookAudio();
                            },
                            fail: function (e) {
                              console.log(e), o.showToastFun(e.errMsg);
                            },
                          })
                        : tt.getOrderPayment({
                            orderId: t.orderId,
                            success: function (t) {
                              1 == o.payFlag
                                ? e.switchTab({ url: "/pages/mine/mine" })
                                : 2 == o.payFlag
                                ? o.getBookCdnInfo("success")
                                : 3 == o.payFlag && o.getBookAudio();
                            },
                            fail: function (e) {
                              console.log(e), o.showToastFun(e.errMsg);
                            },
                          });
                  },
                  fail: function (e) {
                    console.log(e),
                      21050 == e.errNo
                        ? o.showToastFun("当前订单不支持该场景下单")
                        : o.showToastFun(e.errMsg);
                  },
                });
              else if ("mp-kuaishou" == i) {
                var s = ks.canIUse("pay.object.payType.IAPPurchase");
                e.showLoading({ title: "支付中..." }),
                  "ios" == o.platform && s
                    ? ks.pay({
                        serviceId: 1,
                        payType: "IAPPurchase",
                        orderInfo: {
                          order_info_token: t.orderToken,
                          order_no: t.outOrderId,
                        },
                        success: function (t) {
                          console.log(t),
                            e.hideLoading(),
                            1 == o.payFlag
                              ? e.switchTab({ url: "/pages/mine/mine" })
                              : 2 == o.payFlag
                              ? o.getBookCdnInfo("success")
                              : 3 == o.payFlag && o.getBookAudio();
                        },
                        fail: function (t) {
                          console.log(t), e.hideLoading();
                        },
                      })
                    : ks.pay({
                        serviceId: 1,
                        orderInfo: {
                          order_info_token: t.orderToken,
                          order_no: t.outOrderId,
                        },
                        paymentChannel:
                          2 == o.paySceneType.type ? o.payment : "",
                        success: function (t) {
                          e.hideLoading(),
                            1 == o.payFlag
                              ? e.switchTab({ url: "/pages/mine/mine" })
                              : 2 == o.payFlag
                              ? (o.getBookCdnInfo("success"), o.hidePop())
                              : 3 == o.payFlag && o.getBookAudio();
                        },
                        fail: function (t) {
                          console.log(t), e.hideLoading();
                        },
                      });
              } else
                "mp-alipay" == i
                  ? e.requestPayment({
                      provider: "alipay",
                      orderInfo: t.outOrderId,
                      success: function (t) {
                        1 == o.payFlag
                          ? e.switchTab({ url: "/pages/mine/mine" })
                          : 2 == o.payFlag
                          ? o.getBookCdnInfo("success")
                          : 3 == o.payFlag && o.getBookAudio();
                      },
                      fail: function (e) {
                        console.log(e), o.showToastFun(e);
                      },
                    })
                  : console.log("不知道什么类型");
            },
          },
          onUnload: function () {
            var e = this;
            e.timer && (clearInterval(e.timer), (e.timer = null));
          },
          onHide: function () {
            var e = this;
            e.timer && (clearInterval(e.timer), (e.timer = null));
          },
        };
      }).call(this, n("543d")["default"]);
    },
    c135: function (e, t) {
      function n(e) {
        if (Array.isArray(e)) return e;
      }
      (e.exports = n),
        (e.exports.__esModule = !0),
        (e.exports["default"] = e.exports);
    },
    c240: function (e, t) {
      function n() {
        throw new TypeError(
          "Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."
        );
      }
      (e.exports = n),
        (e.exports.__esModule = !0),
        (e.exports["default"] = e.exports);
    },
    c5f7: function (e, t) {
      function n(e) {
        try {
          return -1 !== Function.toString.call(e).indexOf("[native code]");
        } catch (t) {
          return "function" == typeof e;
        }
      }
      (e.exports = n),
        (e.exports.__esModule = !0),
        (e.exports["default"] = e.exports);
    },
    c8ba: function (e, t) {
      var n;
      n = (function () {
        return this;
      })();
      try {
        n = n || new Function("return this")();
      } catch (r) {
        "object" === typeof window && (n = window);
      }
      e.exports = n;
    },
    c960: function (e, t, n) {
      "use strict";
      function r(e) {
        return (
          (e = e.replace(/&forall;|&#8704;|&#x2200;/g, "∀")),
          (e = e.replace(/&part;|&#8706;|&#x2202;/g, "∂")),
          (e = e.replace(/&exist;|&#8707;|&#x2203;/g, "∃")),
          (e = e.replace(/&empty;|&#8709;|&#x2205;/g, "∅")),
          (e = e.replace(/&nabla;|&#8711;|&#x2207;/g, "∇")),
          (e = e.replace(/&isin;|&#8712;|&#x2208;/g, "∈")),
          (e = e.replace(/&notin;|&#8713;|&#x2209;/g, "∉")),
          (e = e.replace(/&ni;|&#8715;|&#x220b;/g, "∋")),
          (e = e.replace(/&prod;|&#8719;|&#x220f;/g, "∏")),
          (e = e.replace(/&sum;|&#8721;|&#x2211;/g, "∑")),
          (e = e.replace(/&minus;|&#8722;|&#x2212;/g, "−")),
          (e = e.replace(/&lowast;|&#8727;|&#x2217;/g, "∗")),
          (e = e.replace(/&radic;|&#8730;|&#x221a;/g, "√")),
          (e = e.replace(/&prop;|&#8733;|&#x221d;/g, "∝")),
          (e = e.replace(/&infin;|&#8734;|&#x221e;/g, "∞")),
          (e = e.replace(/&ang;|&#8736;|&#x2220;/g, "∠")),
          (e = e.replace(/&and;|&#8743;|&#x2227;/g, "∧")),
          (e = e.replace(/&or;|&#8744;|&#x2228;/g, "∨")),
          (e = e.replace(/&cap;|&#8745;|&#x2229;/g, "∩")),
          (e = e.replace(/&cup;|&#8746;|&#x222a;/g, "∪")),
          (e = e.replace(/&int;|&#8747;|&#x222b;/g, "∫")),
          (e = e.replace(/&there4;|&#8756;|&#x2234;/g, "∴")),
          (e = e.replace(/&sim;|&#8764;|&#x223c;/g, "∼")),
          (e = e.replace(/&cong;|&#8773;|&#x2245;/g, "≅")),
          (e = e.replace(/&asymp;|&#8776;|&#x2248;/g, "≈")),
          (e = e.replace(/&ne;|&#8800;|&#x2260;/g, "≠")),
          (e = e.replace(/&le;|&#8804;|&#x2264;/g, "≤")),
          (e = e.replace(/&ge;|&#8805;|&#x2265;/g, "≥")),
          (e = e.replace(/&sub;|&#8834;|&#x2282;/g, "⊂")),
          (e = e.replace(/&sup;|&#8835;|&#x2283;/g, "⊃")),
          (e = e.replace(/&nsub;|&#8836;|&#x2284;/g, "⊄")),
          (e = e.replace(/&sube;|&#8838;|&#x2286;/g, "⊆")),
          (e = e.replace(/&supe;|&#8839;|&#x2287;/g, "⊇")),
          (e = e.replace(/&oplus;|&#8853;|&#x2295;/g, "⊕")),
          (e = e.replace(/&otimes;|&#8855;|&#x2297;/g, "⊗")),
          (e = e.replace(/&perp;|&#8869;|&#x22a5;/g, "⊥")),
          (e = e.replace(/&sdot;|&#8901;|&#x22c5;/g, "⋅")),
          e
        );
      }
      function i(e) {
        return (
          (e = e.replace(/&Alpha;|&#913;|&#x391;/g, "Α")),
          (e = e.replace(/&Beta;|&#914;|&#x392;/g, "Β")),
          (e = e.replace(/&Gamma;|&#915;|&#x393;/g, "Γ")),
          (e = e.replace(/&Delta;|&#916;|&#x394;/g, "Δ")),
          (e = e.replace(/&Epsilon;|&#917;|&#x395;/g, "Ε")),
          (e = e.replace(/&Zeta;|&#918;|&#x396;/g, "Ζ")),
          (e = e.replace(/&Eta;|&#919;|&#x397;/g, "Η")),
          (e = e.replace(/&Theta;|&#920;|&#x398;/g, "Θ")),
          (e = e.replace(/&Iota;|&#921;|&#x399;/g, "Ι")),
          (e = e.replace(/&Kappa;|&#922;|&#x39a;/g, "Κ")),
          (e = e.replace(/&Lambda;|&#923;|&#x39b;/g, "Λ")),
          (e = e.replace(/&Mu;|&#924;|&#x39c;/g, "Μ")),
          (e = e.replace(/&Nu;|&#925;|&#x39d;/g, "Ν")),
          (e = e.replace(/&Xi;|&#925;|&#x39d;/g, "Ν")),
          (e = e.replace(/&Omicron;|&#927;|&#x39f;/g, "Ο")),
          (e = e.replace(/&Pi;|&#928;|&#x3a0;/g, "Π")),
          (e = e.replace(/&Rho;|&#929;|&#x3a1;/g, "Ρ")),
          (e = e.replace(/&Sigma;|&#931;|&#x3a3;/g, "Σ")),
          (e = e.replace(/&Tau;|&#932;|&#x3a4;/g, "Τ")),
          (e = e.replace(/&Upsilon;|&#933;|&#x3a5;/g, "Υ")),
          (e = e.replace(/&Phi;|&#934;|&#x3a6;/g, "Φ")),
          (e = e.replace(/&Chi;|&#935;|&#x3a7;/g, "Χ")),
          (e = e.replace(/&Psi;|&#936;|&#x3a8;/g, "Ψ")),
          (e = e.replace(/&Omega;|&#937;|&#x3a9;/g, "Ω")),
          (e = e.replace(/&alpha;|&#945;|&#x3b1;/g, "α")),
          (e = e.replace(/&beta;|&#946;|&#x3b2;/g, "β")),
          (e = e.replace(/&gamma;|&#947;|&#x3b3;/g, "γ")),
          (e = e.replace(/&delta;|&#948;|&#x3b4;/g, "δ")),
          (e = e.replace(/&epsilon;|&#949;|&#x3b5;/g, "ε")),
          (e = e.replace(/&zeta;|&#950;|&#x3b6;/g, "ζ")),
          (e = e.replace(/&eta;|&#951;|&#x3b7;/g, "η")),
          (e = e.replace(/&theta;|&#952;|&#x3b8;/g, "θ")),
          (e = e.replace(/&iota;|&#953;|&#x3b9;/g, "ι")),
          (e = e.replace(/&kappa;|&#954;|&#x3ba;/g, "κ")),
          (e = e.replace(/&lambda;|&#955;|&#x3bb;/g, "λ")),
          (e = e.replace(/&mu;|&#956;|&#x3bc;/g, "μ")),
          (e = e.replace(/&nu;|&#957;|&#x3bd;/g, "ν")),
          (e = e.replace(/&xi;|&#958;|&#x3be;/g, "ξ")),
          (e = e.replace(/&omicron;|&#959;|&#x3bf;/g, "ο")),
          (e = e.replace(/&pi;|&#960;|&#x3c0;/g, "π")),
          (e = e.replace(/&rho;|&#961;|&#x3c1;/g, "ρ")),
          (e = e.replace(/&sigmaf;|&#962;|&#x3c2;/g, "ς")),
          (e = e.replace(/&sigma;|&#963;|&#x3c3;/g, "σ")),
          (e = e.replace(/&tau;|&#964;|&#x3c4;/g, "τ")),
          (e = e.replace(/&upsilon;|&#965;|&#x3c5;/g, "υ")),
          (e = e.replace(/&phi;|&#966;|&#x3c6;/g, "φ")),
          (e = e.replace(/&chi;|&#967;|&#x3c7;/g, "χ")),
          (e = e.replace(/&psi;|&#968;|&#x3c8;/g, "ψ")),
          (e = e.replace(/&omega;|&#969;|&#x3c9;/g, "ω")),
          (e = e.replace(/&thetasym;|&#977;|&#x3d1;/g, "ϑ")),
          (e = e.replace(/&upsih;|&#978;|&#x3d2;/g, "ϒ")),
          (e = e.replace(/&piv;|&#982;|&#x3d6;/g, "ϖ")),
          (e = e.replace(/&middot;|&#183;|&#xb7;/g, "·")),
          e
        );
      }
      function o(e) {
        return (
          (e = e.replace(
            /&nbsp;|&#32;|&#x20;/g,
            "<span class='spaceshow'> </span>"
          )),
          (e = e.replace(
            /&ensp;|&#8194;|&#x2002;/g,
            "<span class='spaceshow'> </span>"
          )),
          (e = e.replace(
            /&#12288;|&#x3000;/g,
            "<span class='spaceshow'>　</span>"
          )),
          (e = e.replace(
            /&emsp;|&#8195;|&#x2003;/g,
            "<span class='spaceshow'> </span>"
          )),
          (e = e.replace(/&quot;|&#34;|&#x22;/g, '"')),
          (e = e.replace(/&quot;|&#39;|&#x27;/g, "'")),
          (e = e.replace(/&acute;|&#180;|&#xB4;/g, "´")),
          (e = e.replace(/&times;|&#215;|&#xD7;/g, "×")),
          (e = e.replace(/&divide;|&#247;|&#xF7;/g, "÷")),
          (e = e.replace(/&amp;|&#38;|&#x26;/g, "&")),
          (e = e.replace(/&lt;|&#60;|&#x3c;/g, "<")),
          (e = e.replace(/&gt;|&#62;|&#x3e;/g, ">")),
          e
        );
      }
      function a(e) {
        return (
          (e = e.replace(/&OElig;|&#338;|&#x152;/g, "Œ")),
          (e = e.replace(/&oelig;|&#339;|&#x153;/g, "œ")),
          (e = e.replace(/&Scaron;|&#352;|&#x160;/g, "Š")),
          (e = e.replace(/&scaron;|&#353;|&#x161;/g, "š")),
          (e = e.replace(/&Yuml;|&#376;|&#x178;/g, "Ÿ")),
          (e = e.replace(/&fnof;|&#402;|&#x192;/g, "ƒ")),
          (e = e.replace(/&circ;|&#710;|&#x2c6;/g, "ˆ")),
          (e = e.replace(/&tilde;|&#732;|&#x2dc;/g, "˜")),
          (e = e.replace(
            /&thinsp;|$#8201;|&#x2009;/g,
            "<span class='spaceshow'> </span>"
          )),
          (e = e.replace(
            /&zwnj;|&#8204;|&#x200C;/g,
            "<span class='spaceshow'>‌</span>"
          )),
          (e = e.replace(
            /&zwj;|$#8205;|&#x200D;/g,
            "<span class='spaceshow'>‍</span>"
          )),
          (e = e.replace(
            /&lrm;|$#8206;|&#x200E;/g,
            "<span class='spaceshow'>‎</span>"
          )),
          (e = e.replace(
            /&rlm;|&#8207;|&#x200F;/g,
            "<span class='spaceshow'>‏</span>"
          )),
          (e = e.replace(/&ndash;|&#8211;|&#x2013;/g, "–")),
          (e = e.replace(/&mdash;|&#8212;|&#x2014;/g, "—")),
          (e = e.replace(/&lsquo;|&#8216;|&#x2018;/g, "‘")),
          (e = e.replace(/&rsquo;|&#8217;|&#x2019;/g, "’")),
          (e = e.replace(/&sbquo;|&#8218;|&#x201a;/g, "‚")),
          (e = e.replace(/&ldquo;|&#8220;|&#x201c;/g, "“")),
          (e = e.replace(/&rdquo;|&#8221;|&#x201d;/g, "”")),
          (e = e.replace(/&bdquo;|&#8222;|&#x201e;/g, "„")),
          (e = e.replace(/&dagger;|&#8224;|&#x2020;/g, "†")),
          (e = e.replace(/&Dagger;|&#8225;|&#x2021;/g, "‡")),
          (e = e.replace(/&bull;|&#8226;|&#x2022;/g, "•")),
          (e = e.replace(/&hellip;|&#8230;|&#x2026;/g, "…")),
          (e = e.replace(/&permil;|&#8240;|&#x2030;/g, "‰")),
          (e = e.replace(/&prime;|&#8242;|&#x2032;/g, "′")),
          (e = e.replace(/&Prime;|&#8243;|&#x2033;/g, "″")),
          (e = e.replace(/&lsaquo;|&#8249;|&#x2039;/g, "‹")),
          (e = e.replace(/&rsaquo;|&#8250;|&#x203a;/g, "›")),
          (e = e.replace(/&oline;|&#8254;|&#x203e;/g, "‾")),
          (e = e.replace(/&euro;|&#8364;|&#x20ac;/g, "€")),
          (e = e.replace(/&trade;|&#8482;|&#x2122;/g, "™")),
          (e = e.replace(/&larr;|&#8592;|&#x2190;/g, "←")),
          (e = e.replace(/&uarr;|&#8593;|&#x2191;/g, "↑")),
          (e = e.replace(/&rarr;|&#8594;|&#x2192;/g, "→")),
          (e = e.replace(/&darr;|&#8595;|&#x2193;/g, "↓")),
          (e = e.replace(/&harr;|&#8596;|&#x2194;/g, "↔")),
          (e = e.replace(/&crarr;|&#8629;|&#x21b5;/g, "↵")),
          (e = e.replace(/&lceil;|&#8968;|&#x2308;/g, "⌈")),
          (e = e.replace(/&rceil;|&#8969;|&#x2309;/g, "⌉")),
          (e = e.replace(/&lfloor;|&#8970;|&#x230a;/g, "⌊")),
          (e = e.replace(/&rfloor;|&#8971;|&#x230b;/g, "⌋")),
          (e = e.replace(/&loz;|&#9674;|&#x25ca;/g, "◊")),
          (e = e.replace(/&spades;|&#9824;|&#x2660;/g, "♠")),
          (e = e.replace(/&clubs;|&#9827;|&#x2663;/g, "♣")),
          (e = e.replace(/&hearts;|&#9829;|&#x2665;/g, "♥")),
          (e = e.replace(/&diams;|&#9830;|&#x2666;/g, "♦")),
          e
        );
      }
      function s(e) {
        return (e = r(e)), (e = i(e)), (e = o(e)), (e = a(e)), e;
      }
      function c(e, t) {
        return /^\/\//.test(e)
          ? "https:".concat(e)
          : /^\//.test(e)
          ? "https://".concat(t).concat(e)
          : e;
      }
      Object.defineProperty(t, "__esModule", { value: !0 }),
        (t.default = void 0);
      t.default = { strDiscode: s, urlToHttpUrl: c };
    },
    c973: function (e, t) {
      function n(e, t, n, r, i, o, a) {
        try {
          var s = e[o](a),
            c = s.value;
        } catch (e) {
          return void n(e);
        }
        s.done ? t(c) : Promise.resolve(c).then(r, i);
      }
      function r(e) {
        return function () {
          var t = this,
            r = arguments;
          return new Promise(function (i, o) {
            var a = e.apply(t, r);
            function s(e) {
              n(a, i, o, s, c, "next", e);
            }
            function c(e) {
              n(a, i, o, s, c, "throw", e);
            }
            s(void 0);
          });
        };
      }
      (e.exports = r),
        (e.exports.__esModule = !0),
        (e.exports["default"] = e.exports);
    },
    c9b7: function (e, t, n) {
      "use strict";
      (function (e) {
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.publicMethod = void 0);
        t.publicMethod = {
          upDateApp: function () {
            var t = e.getUpdateManager();
            t.onCheckForUpdate(function (e) {
              e.hasUpdate &&
                t.onUpdateReady(function () {
                  t.applyUpdate();
                });
            });
          },
          scanCode: function (t, n) {
            e.scanCode({
              success: function (e) {
                t && t(e);
              },
              fail: function () {
                n && n();
              },
            });
          },
          wxLoading: function () {
            var t =
                arguments.length > 0 && void 0 !== arguments[0]
                  ? arguments[0]
                  : "正在加载...",
              n =
                arguments.length > 1 && void 0 !== arguments[1]
                  ? arguments[1]
                  : "none";
            e.showLoading({ title: t, icon: n, mask: !0 });
          },
          wxHideLoading: function () {
            var t =
              arguments.length > 0 && void 0 !== arguments[0]
                ? arguments[0]
                : 1;
            1 == t && e.hideLoading();
          },
          showToast: function (t) {
            var n =
                arguments.length > 1 && void 0 !== arguments[1]
                  ? arguments[1]
                  : "none",
              r =
                arguments.length > 2 && void 0 !== arguments[2]
                  ? arguments[2]
                  : 1500;
            e.showToast({ title: t, icon: n, duration: r, mask: !0 });
          },
          getContext: function () {
            var e =
                arguments.length > 0 && void 0 !== arguments[0]
                  ? arguments[0]
                  : 2,
              t = getCurrentPages();
            return t[t.length - e];
          },
          loadingMore: function (e, t) {
            e.finished || 2 != e.index || (e.loadingTxt = "加载中..."),
              e.finished || t();
          },
          formatDate: function (e) {
            e = new Date(e);
            var t = e.getFullYear() + "-",
              n =
                (e.getMonth() + 1 < 10
                  ? "0" + (e.getMonth() + 1)
                  : e.getMonth() + 1) + "-",
              r = e.getDate() < 10 ? "0" + e.getDate() : e.getDate();
            return t + n + r;
          },
          isToday: function (e) {
            return new Date().toDateString() === e.toDateString();
          },
        };
      }).call(this, n("543d")["default"]);
    },
    da60: function (e, t) {
      function n(e) {
        throw new TypeError('"' + e + '" is read-only');
      }
      (e.exports = n),
        (e.exports.__esModule = !0),
        (e.exports["default"] = e.exports);
    },
    e50d: function (e, t, n) {
      var r = n("7037")["default"];
      function i(e, t) {
        if ("object" != r(e) || !e) return e;
        var n = e[Symbol.toPrimitive];
        if (void 0 !== n) {
          var i = n.call(e, t || "default");
          if ("object" != r(i)) return i;
          throw new TypeError("@@toPrimitive must return a primitive value.");
        }
        return ("string" === t ? String : Number)(e);
      }
      (e.exports = i),
        (e.exports.__esModule = !0),
        (e.exports["default"] = e.exports);
    },
    e5b1: function (e, t) {
      e.exports =
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAYAAAA6/NlyAAAJlklEQVRoQ91bfXBUVxU/52WTgNNtyUZtpeDXYBCdWj9GBAcr0LEUbAWdsh1tLCUf+86rtsVxdKxWnEKljo5jpbXvvt0kiIAj26pQKh9TLW0FqTitFmdsCx0tErCo2SBBPsLm/Zwbd3fevrzsR7IJS89fmey955zfPffce+455zGNEe3evTt08ODBDxHRHNd1301E05l5KoAwM4e1WAB9zNwH4AgRvWwYxktEtKepqem5efPmpcdCNa4k0+3bt9d3d3ff4LpuMxFdq8GNhL9eBCL6tWEYm6ZMmfL4okWLzo2ET9CcigBOJpOX9Pb2fhnACgCTKqWc5sPMJ5j5gYaGhu9Ho9FTo+U9KsDJZLIulUqZAO4hojePVpki8//JzPdFIhEnGo32j1TWiAErpW4movsBvKME4S4RvUpEh4ioN7NltQ/rLd9ARO8iorcTkVGMFzP/jYjuFpHNxcZWZEs7jlML4AEAtxcSyMz/IKJtzPxYQ0PDk9Fo9Eyh8clkcmJvb+98AJ8iohsBvKUI/4eZeYVpmufLAV6Whbu6ut7U39//KIBrAlePeYCIfgJAicgfmBnlKJMdC4CVUh9mZiGiWwHUDCPvmbq6uptaWlr+VaqckgF3dHR8IJ1ObwHw1mGEbyWir4vIX0oVXso4pdR7iGgNgMXDyP17KBRa0tbW9sdS+JUEWCl1NYA9RHSJnykza4BtIrKvFIEjHaOUmk1EHQD0AvjpFDPPEZEXivEvCnjdunVXnD17dj8RTQ0Au7W2tvbzra2t+t4cc+rs7AyfP39+wzDWPjJhwoSZy5cvf62g7xc7SFKp1FMAZnrHad8EcJ+IfGukfjrS1cn4973MfI/+26fX/kgkMrfQATmshTUzx3F+BiDqV84wjNtM01w/UqUrMc9xnGWu6/44YNdtNk3zs8MZYljASqkYACdAudWWZa2shNKj5WHb9ioi+mYAaFNE4oGHXNA/daiYSqVeAXC5b8s8YprmzeO9jYdbmMwu3AxgqU/P45FIZFpQKBpoYaXU6ky4mOPDzM9HIpE5xQKI0Vqt3Pk6YEmlUnsAfNAHWp8xQ63vF2Db9pXMfBDAG7y/hUKh2e3t7c+Wq9B4jE8kErPS6XTetcjMpwE0WZZ1NG8h/AoppboALPetVlJEdOxctaSU0ls774Bl5nUi0jIs4PXr1zeeOXPmGIC67CBm7q+rq5vR0tLy16pFS0RdXV3v7O/vf9Gv+8SJEycvW7asJ4fHC0IpdQeAtT7rPigid1Yz2KxuSqm1AO7w6X+niDwYCNi2be0Hs3zgPmJZlo60qp5s29YB0u99gPeJyEeHAHYc5zIAPd6XCTMfNU1zarVcQ8VWPHNNHQFwpcclB5i50TTN/+j/5a4lpdRiAFu8TA3DeMg0zbwtUkzohf5dKfUQgC/4rLxERPRrLg/wkLs3FApd297e/uSFBlGO/EQiMT+dTv/GBzh3J3st/AiAm7wDGxsbw5VInJWj8GjH6iixp6cn7/XGzI+KyGA05gV8AMBVnr3fLSJDnoSjVWg85iultB9P8WD5s4i8zw9Y37+5PBIz7xWROeOhYKVl2La9l4hyJzMRHbMsa/Agy1nYtm29DXIZDWbeKSILK63MePBTSu0AcL1H1inLsgaLAt4tnfZdSb8Ukc+Mh4KVlqGU+gWAT3uvJhEJ+QGf9JVGdlmW5V2lSus1Zvxs295JRAs8gPtE5FI/4G7fhZ0XoYyZdmPAWCn1OwA66TdIOoASkcFDzLul/wTgao/8nKOPgU5jytK2bf0knOwB/IKIvN8PeMjzKhwOX9bc3HxyTLWrMPONGzde2tfXNxhGegDnnrdeC98LIC9XxcwLRUT7w0VDSqnrAezwAV6lM6x+Cy8C8CvfwLiImBcNWiJSSjkAYj4cnxSR7XmAM4m7FIBaz1Y4bprmZGbW1b+qJwCG4zg6gMolH5n5fCQSiWRD5LwknlLqaX+hzDCMj5mmqcssVU+O4+j2it/6rPuMiHw8Z0Tvj0G5aGZOiEjeFqlW5EqpOIB2H+C8HHWehTNJgNcATPBMShuGcZVpmrrhpGopkUjMSKfTB4hoMKIa9Ffms8x8Rfbxn+fD2UFKqR/5i93MvE1EdKG6asm27W1EdIPPug+LSH4ywI9AF73PnTv3ChENhmJZMgxjvmmau6sRseM481zX9ScqTtbX10/zF8uHqzzcDWCND9yL4XB4VrUFIplAQxcIZvisq4vz9/sNFAhYly96enpeDqgJ72hsbLwxGo3q1oYLTslksqanp0dvZf8z9khjY+P0oLJQoephM4ANAajWWpZ11wVHS0S2bf+QiIJy5s2WZW0K0rFgB4Bt2wndzjBkWzCvEBEt7IKRUuou3U0UoECHZVl5V1PeVi+kcaZFaReAef5xOoXb1NT0pbHqiRxOr0wP5w9c1/1igCF2M/OCQq1MRXs8Ojo6Iul0+lkAunksj5j5KWZeaprmv8fD1I7jvBGAzq7ODdDlUCgUmtXW1pYqpEtRwHpyPB5vcl13H4BIgKBXDcO4PRaL5b1QKr0A8Xh84cDAgE1EbwvQIWUYxuxYLHawmNySAHtAbwWgW4GD6OlQKPS1SteQM7Xf7xBRLh7O80nmlwzDWFwKWD2vZMB6cObO06dfXkTjU2CLYRhq0qRJu0faBKqbVk+cOKGDCQGwpIDVHg+Hw7eUExuUBVgL1k+weDy+ynXdbxT0lf/3POvkwWM1NTVPtLe3Hy80PpFIXD4wMPAJItIhrH7EF+y1Ngzj27FYbGW5T9eyAWeVjsfjCwYGBr5LRIMZ/RKol4h0yJryddPqc2Fapqu2BDZ0oKam5quxWGyXbktkZgtAfSgUsktpPxwx4Ky1Hcf5HBGtKrGNuBRAgWMybcMrTdP8qbaq7lY4ffq0bkfW7cf6ZfRfZr7GNM3nR31KF9NS+1xvb6/2t694azrF5pXyOzN3M/P3GhoalPdMcBznOtd1d/nOj6O1tbUzW1tbjw3He1QW9jPV/t3R0TE3nU7fov3QmyotBZxnjFZ4ZygU2tTW1qbv+iEppozPHwrw9ecMw9CWPh0ks6KA/QL0/Z39qgXA9MxjJO+rFiLSh9sRZs591VLqFeM4zlIAOr3sx/FzXR4N6lwYU8BlWnVEw5VSusl0dcDkNZZlDblJLnrAGqhSSrcU60+H8oiZc60O2R9eF4D191KHDx/WGQ9vTVif3E+IyHV5B9uI9lEVTsp8j7EfgP46JkvrLcu67XUJWIPq7Oyc3t/fv4GZ30tEe+vr62/1d8j/Dx4iS3lJHSiGAAAAAElFTkSuQmCC";
    },
    e846: function (e, t, n) {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 }),
        (t.default = void 0);
      t.default = {
        id: "2852637",
        name: "uniui图标库",
        font_family: "uniicons",
        css_prefix_text: "uniui-",
        description: "",
        glyphs: [
          {
            icon_id: "25027049",
            name: "yanse",
            font_class: "color",
            unicode: "e6cf",
            unicode_decimal: 59087,
          },
          {
            icon_id: "25027048",
            name: "wallet",
            font_class: "wallet",
            unicode: "e6b1",
            unicode_decimal: 59057,
          },
          {
            icon_id: "25015720",
            name: "settings-filled",
            font_class: "settings-filled",
            unicode: "e6ce",
            unicode_decimal: 59086,
          },
          {
            icon_id: "25015434",
            name: "shimingrenzheng-filled",
            font_class: "auth-filled",
            unicode: "e6cc",
            unicode_decimal: 59084,
          },
          {
            icon_id: "24934246",
            name: "shop-filled",
            font_class: "shop-filled",
            unicode: "e6cd",
            unicode_decimal: 59085,
          },
          {
            icon_id: "24934159",
            name: "staff-filled-01",
            font_class: "staff-filled",
            unicode: "e6cb",
            unicode_decimal: 59083,
          },
          {
            icon_id: "24932461",
            name: "VIP-filled",
            font_class: "vip-filled",
            unicode: "e6c6",
            unicode_decimal: 59078,
          },
          {
            icon_id: "24932462",
            name: "plus_circle_fill",
            font_class: "plus-filled",
            unicode: "e6c7",
            unicode_decimal: 59079,
          },
          {
            icon_id: "24932463",
            name: "folder_add-filled",
            font_class: "folder-add-filled",
            unicode: "e6c8",
            unicode_decimal: 59080,
          },
          {
            icon_id: "24932464",
            name: "yanse-filled",
            font_class: "color-filled",
            unicode: "e6c9",
            unicode_decimal: 59081,
          },
          {
            icon_id: "24932465",
            name: "tune-filled",
            font_class: "tune-filled",
            unicode: "e6ca",
            unicode_decimal: 59082,
          },
          {
            icon_id: "24932455",
            name: "a-rilidaka-filled",
            font_class: "calendar-filled",
            unicode: "e6c0",
            unicode_decimal: 59072,
          },
          {
            icon_id: "24932456",
            name: "notification-filled",
            font_class: "notification-filled",
            unicode: "e6c1",
            unicode_decimal: 59073,
          },
          {
            icon_id: "24932457",
            name: "wallet-filled",
            font_class: "wallet-filled",
            unicode: "e6c2",
            unicode_decimal: 59074,
          },
          {
            icon_id: "24932458",
            name: "paihangbang-filled",
            font_class: "medal-filled",
            unicode: "e6c3",
            unicode_decimal: 59075,
          },
          {
            icon_id: "24932459",
            name: "gift-filled",
            font_class: "gift-filled",
            unicode: "e6c4",
            unicode_decimal: 59076,
          },
          {
            icon_id: "24932460",
            name: "fire-filled",
            font_class: "fire-filled",
            unicode: "e6c5",
            unicode_decimal: 59077,
          },
          {
            icon_id: "24928001",
            name: "refreshempty",
            font_class: "refreshempty",
            unicode: "e6bf",
            unicode_decimal: 59071,
          },
          {
            icon_id: "24926853",
            name: "location-ellipse",
            font_class: "location-filled",
            unicode: "e6af",
            unicode_decimal: 59055,
          },
          {
            icon_id: "24926735",
            name: "person-filled",
            font_class: "person-filled",
            unicode: "e69d",
            unicode_decimal: 59037,
          },
          {
            icon_id: "24926703",
            name: "personadd-filled",
            font_class: "personadd-filled",
            unicode: "e698",
            unicode_decimal: 59032,
          },
          {
            icon_id: "24923351",
            name: "back",
            font_class: "back",
            unicode: "e6b9",
            unicode_decimal: 59065,
          },
          {
            icon_id: "24923352",
            name: "forward",
            font_class: "forward",
            unicode: "e6ba",
            unicode_decimal: 59066,
          },
          {
            icon_id: "24923353",
            name: "arrowthinright",
            font_class: "arrow-right",
            unicode: "e6bb",
            unicode_decimal: 59067,
          },
          {
            icon_id: "24923353",
            name: "arrowthinright",
            font_class: "arrowthinright",
            unicode: "e6bb",
            unicode_decimal: 59067,
          },
          {
            icon_id: "24923354",
            name: "arrowthinleft",
            font_class: "arrow-left",
            unicode: "e6bc",
            unicode_decimal: 59068,
          },
          {
            icon_id: "24923354",
            name: "arrowthinleft",
            font_class: "arrowthinleft",
            unicode: "e6bc",
            unicode_decimal: 59068,
          },
          {
            icon_id: "24923355",
            name: "arrowthinup",
            font_class: "arrow-up",
            unicode: "e6bd",
            unicode_decimal: 59069,
          },
          {
            icon_id: "24923355",
            name: "arrowthinup",
            font_class: "arrowthinup",
            unicode: "e6bd",
            unicode_decimal: 59069,
          },
          {
            icon_id: "24923356",
            name: "arrowthindown",
            font_class: "arrow-down",
            unicode: "e6be",
            unicode_decimal: 59070,
          },
          {
            icon_id: "24923356",
            name: "arrowthindown",
            font_class: "arrowthindown",
            unicode: "e6be",
            unicode_decimal: 59070,
          },
          {
            icon_id: "24923349",
            name: "arrowdown",
            font_class: "bottom",
            unicode: "e6b8",
            unicode_decimal: 59064,
          },
          {
            icon_id: "24923349",
            name: "arrowdown",
            font_class: "arrowdown",
            unicode: "e6b8",
            unicode_decimal: 59064,
          },
          {
            icon_id: "24923346",
            name: "arrowright",
            font_class: "right",
            unicode: "e6b5",
            unicode_decimal: 59061,
          },
          {
            icon_id: "24923346",
            name: "arrowright",
            font_class: "arrowright",
            unicode: "e6b5",
            unicode_decimal: 59061,
          },
          {
            icon_id: "24923347",
            name: "arrowup",
            font_class: "top",
            unicode: "e6b6",
            unicode_decimal: 59062,
          },
          {
            icon_id: "24923347",
            name: "arrowup",
            font_class: "arrowup",
            unicode: "e6b6",
            unicode_decimal: 59062,
          },
          {
            icon_id: "24923348",
            name: "arrowleft",
            font_class: "left",
            unicode: "e6b7",
            unicode_decimal: 59063,
          },
          {
            icon_id: "24923348",
            name: "arrowleft",
            font_class: "arrowleft",
            unicode: "e6b7",
            unicode_decimal: 59063,
          },
          {
            icon_id: "24923334",
            name: "eye",
            font_class: "eye",
            unicode: "e651",
            unicode_decimal: 58961,
          },
          {
            icon_id: "24923335",
            name: "eye-filled",
            font_class: "eye-filled",
            unicode: "e66a",
            unicode_decimal: 58986,
          },
          {
            icon_id: "24923336",
            name: "eye-slash",
            font_class: "eye-slash",
            unicode: "e6b3",
            unicode_decimal: 59059,
          },
          {
            icon_id: "24923337",
            name: "eye-slash-filled",
            font_class: "eye-slash-filled",
            unicode: "e6b4",
            unicode_decimal: 59060,
          },
          {
            icon_id: "24923305",
            name: "info-filled",
            font_class: "info-filled",
            unicode: "e649",
            unicode_decimal: 58953,
          },
          {
            icon_id: "24923299",
            name: "reload-01",
            font_class: "reload",
            unicode: "e6b2",
            unicode_decimal: 59058,
          },
          {
            icon_id: "24923195",
            name: "mic_slash_fill",
            font_class: "micoff-filled",
            unicode: "e6b0",
            unicode_decimal: 59056,
          },
          {
            icon_id: "24923165",
            name: "map-pin-ellipse",
            font_class: "map-pin-ellipse",
            unicode: "e6ac",
            unicode_decimal: 59052,
          },
          {
            icon_id: "24923166",
            name: "map-pin",
            font_class: "map-pin",
            unicode: "e6ad",
            unicode_decimal: 59053,
          },
          {
            icon_id: "24923167",
            name: "location",
            font_class: "location",
            unicode: "e6ae",
            unicode_decimal: 59054,
          },
          {
            icon_id: "24923064",
            name: "starhalf",
            font_class: "starhalf",
            unicode: "e683",
            unicode_decimal: 59011,
          },
          {
            icon_id: "24923065",
            name: "star",
            font_class: "star",
            unicode: "e688",
            unicode_decimal: 59016,
          },
          {
            icon_id: "24923066",
            name: "star-filled",
            font_class: "star-filled",
            unicode: "e68f",
            unicode_decimal: 59023,
          },
          {
            icon_id: "24899646",
            name: "a-rilidaka",
            font_class: "calendar",
            unicode: "e6a0",
            unicode_decimal: 59040,
          },
          {
            icon_id: "24899647",
            name: "fire",
            font_class: "fire",
            unicode: "e6a1",
            unicode_decimal: 59041,
          },
          {
            icon_id: "24899648",
            name: "paihangbang",
            font_class: "medal",
            unicode: "e6a2",
            unicode_decimal: 59042,
          },
          {
            icon_id: "24899649",
            name: "font",
            font_class: "font",
            unicode: "e6a3",
            unicode_decimal: 59043,
          },
          {
            icon_id: "24899650",
            name: "gift",
            font_class: "gift",
            unicode: "e6a4",
            unicode_decimal: 59044,
          },
          {
            icon_id: "24899651",
            name: "link",
            font_class: "link",
            unicode: "e6a5",
            unicode_decimal: 59045,
          },
          {
            icon_id: "24899652",
            name: "notification",
            font_class: "notification",
            unicode: "e6a6",
            unicode_decimal: 59046,
          },
          {
            icon_id: "24899653",
            name: "staff",
            font_class: "staff",
            unicode: "e6a7",
            unicode_decimal: 59047,
          },
          {
            icon_id: "24899654",
            name: "VIP",
            font_class: "vip",
            unicode: "e6a8",
            unicode_decimal: 59048,
          },
          {
            icon_id: "24899655",
            name: "folder_add",
            font_class: "folder-add",
            unicode: "e6a9",
            unicode_decimal: 59049,
          },
          {
            icon_id: "24899656",
            name: "tune",
            font_class: "tune",
            unicode: "e6aa",
            unicode_decimal: 59050,
          },
          {
            icon_id: "24899657",
            name: "shimingrenzheng",
            font_class: "auth",
            unicode: "e6ab",
            unicode_decimal: 59051,
          },
          {
            icon_id: "24899565",
            name: "person",
            font_class: "person",
            unicode: "e699",
            unicode_decimal: 59033,
          },
          {
            icon_id: "24899566",
            name: "email-filled",
            font_class: "email-filled",
            unicode: "e69a",
            unicode_decimal: 59034,
          },
          {
            icon_id: "24899567",
            name: "phone-filled",
            font_class: "phone-filled",
            unicode: "e69b",
            unicode_decimal: 59035,
          },
          {
            icon_id: "24899568",
            name: "phone",
            font_class: "phone",
            unicode: "e69c",
            unicode_decimal: 59036,
          },
          {
            icon_id: "24899570",
            name: "email",
            font_class: "email",
            unicode: "e69e",
            unicode_decimal: 59038,
          },
          {
            icon_id: "24899571",
            name: "personadd",
            font_class: "personadd",
            unicode: "e69f",
            unicode_decimal: 59039,
          },
          {
            icon_id: "24899558",
            name: "chatboxes-filled",
            font_class: "chatboxes-filled",
            unicode: "e692",
            unicode_decimal: 59026,
          },
          {
            icon_id: "24899559",
            name: "contact",
            font_class: "contact",
            unicode: "e693",
            unicode_decimal: 59027,
          },
          {
            icon_id: "24899560",
            name: "chatbubble-filled",
            font_class: "chatbubble-filled",
            unicode: "e694",
            unicode_decimal: 59028,
          },
          {
            icon_id: "24899561",
            name: "contact-filled",
            font_class: "contact-filled",
            unicode: "e695",
            unicode_decimal: 59029,
          },
          {
            icon_id: "24899562",
            name: "chatboxes",
            font_class: "chatboxes",
            unicode: "e696",
            unicode_decimal: 59030,
          },
          {
            icon_id: "24899563",
            name: "chatbubble",
            font_class: "chatbubble",
            unicode: "e697",
            unicode_decimal: 59031,
          },
          {
            icon_id: "24881290",
            name: "upload-filled",
            font_class: "upload-filled",
            unicode: "e68e",
            unicode_decimal: 59022,
          },
          {
            icon_id: "24881292",
            name: "upload",
            font_class: "upload",
            unicode: "e690",
            unicode_decimal: 59024,
          },
          {
            icon_id: "24881293",
            name: "weixin",
            font_class: "weixin",
            unicode: "e691",
            unicode_decimal: 59025,
          },
          {
            icon_id: "24881274",
            name: "compose",
            font_class: "compose",
            unicode: "e67f",
            unicode_decimal: 59007,
          },
          {
            icon_id: "24881275",
            name: "qq",
            font_class: "qq",
            unicode: "e680",
            unicode_decimal: 59008,
          },
          {
            icon_id: "24881276",
            name: "download-filled",
            font_class: "download-filled",
            unicode: "e681",
            unicode_decimal: 59009,
          },
          {
            icon_id: "24881277",
            name: "pengyouquan",
            font_class: "pyq",
            unicode: "e682",
            unicode_decimal: 59010,
          },
          {
            icon_id: "24881279",
            name: "sound",
            font_class: "sound",
            unicode: "e684",
            unicode_decimal: 59012,
          },
          {
            icon_id: "24881280",
            name: "trash-filled",
            font_class: "trash-filled",
            unicode: "e685",
            unicode_decimal: 59013,
          },
          {
            icon_id: "24881281",
            name: "sound-filled",
            font_class: "sound-filled",
            unicode: "e686",
            unicode_decimal: 59014,
          },
          {
            icon_id: "24881282",
            name: "trash",
            font_class: "trash",
            unicode: "e687",
            unicode_decimal: 59015,
          },
          {
            icon_id: "24881284",
            name: "videocam-filled",
            font_class: "videocam-filled",
            unicode: "e689",
            unicode_decimal: 59017,
          },
          {
            icon_id: "24881285",
            name: "spinner-cycle",
            font_class: "spinner-cycle",
            unicode: "e68a",
            unicode_decimal: 59018,
          },
          {
            icon_id: "24881286",
            name: "weibo",
            font_class: "weibo",
            unicode: "e68b",
            unicode_decimal: 59019,
          },
          {
            icon_id: "24881288",
            name: "videocam",
            font_class: "videocam",
            unicode: "e68c",
            unicode_decimal: 59020,
          },
          {
            icon_id: "24881289",
            name: "download",
            font_class: "download",
            unicode: "e68d",
            unicode_decimal: 59021,
          },
          {
            icon_id: "24879601",
            name: "help",
            font_class: "help",
            unicode: "e679",
            unicode_decimal: 59001,
          },
          {
            icon_id: "24879602",
            name: "navigate-filled",
            font_class: "navigate-filled",
            unicode: "e67a",
            unicode_decimal: 59002,
          },
          {
            icon_id: "24879603",
            name: "plusempty",
            font_class: "plusempty",
            unicode: "e67b",
            unicode_decimal: 59003,
          },
          {
            icon_id: "24879604",
            name: "smallcircle",
            font_class: "smallcircle",
            unicode: "e67c",
            unicode_decimal: 59004,
          },
          {
            icon_id: "24879605",
            name: "minus-filled",
            font_class: "minus-filled",
            unicode: "e67d",
            unicode_decimal: 59005,
          },
          {
            icon_id: "24879606",
            name: "micoff",
            font_class: "micoff",
            unicode: "e67e",
            unicode_decimal: 59006,
          },
          {
            icon_id: "24879588",
            name: "closeempty",
            font_class: "closeempty",
            unicode: "e66c",
            unicode_decimal: 58988,
          },
          {
            icon_id: "24879589",
            name: "clear",
            font_class: "clear",
            unicode: "e66d",
            unicode_decimal: 58989,
          },
          {
            icon_id: "24879590",
            name: "navigate",
            font_class: "navigate",
            unicode: "e66e",
            unicode_decimal: 58990,
          },
          {
            icon_id: "24879591",
            name: "minus",
            font_class: "minus",
            unicode: "e66f",
            unicode_decimal: 58991,
          },
          {
            icon_id: "24879592",
            name: "image",
            font_class: "image",
            unicode: "e670",
            unicode_decimal: 58992,
          },
          {
            icon_id: "24879593",
            name: "mic",
            font_class: "mic",
            unicode: "e671",
            unicode_decimal: 58993,
          },
          {
            icon_id: "24879594",
            name: "paperplane",
            font_class: "paperplane",
            unicode: "e672",
            unicode_decimal: 58994,
          },
          {
            icon_id: "24879595",
            name: "close",
            font_class: "close",
            unicode: "e673",
            unicode_decimal: 58995,
          },
          {
            icon_id: "24879596",
            name: "help-filled",
            font_class: "help-filled",
            unicode: "e674",
            unicode_decimal: 58996,
          },
          {
            icon_id: "24879597",
            name: "plus-filled",
            font_class: "paperplane-filled",
            unicode: "e675",
            unicode_decimal: 58997,
          },
          {
            icon_id: "24879598",
            name: "plus",
            font_class: "plus",
            unicode: "e676",
            unicode_decimal: 58998,
          },
          {
            icon_id: "24879599",
            name: "mic-filled",
            font_class: "mic-filled",
            unicode: "e677",
            unicode_decimal: 58999,
          },
          {
            icon_id: "24879600",
            name: "image-filled",
            font_class: "image-filled",
            unicode: "e678",
            unicode_decimal: 59e3,
          },
          {
            icon_id: "24855900",
            name: "locked-filled",
            font_class: "locked-filled",
            unicode: "e668",
            unicode_decimal: 58984,
          },
          {
            icon_id: "24855901",
            name: "info",
            font_class: "info",
            unicode: "e669",
            unicode_decimal: 58985,
          },
          {
            icon_id: "24855903",
            name: "locked",
            font_class: "locked",
            unicode: "e66b",
            unicode_decimal: 58987,
          },
          {
            icon_id: "24855884",
            name: "camera-filled",
            font_class: "camera-filled",
            unicode: "e658",
            unicode_decimal: 58968,
          },
          {
            icon_id: "24855885",
            name: "chat-filled",
            font_class: "chat-filled",
            unicode: "e659",
            unicode_decimal: 58969,
          },
          {
            icon_id: "24855886",
            name: "camera",
            font_class: "camera",
            unicode: "e65a",
            unicode_decimal: 58970,
          },
          {
            icon_id: "24855887",
            name: "circle",
            font_class: "circle",
            unicode: "e65b",
            unicode_decimal: 58971,
          },
          {
            icon_id: "24855888",
            name: "checkmarkempty",
            font_class: "checkmarkempty",
            unicode: "e65c",
            unicode_decimal: 58972,
          },
          {
            icon_id: "24855889",
            name: "chat",
            font_class: "chat",
            unicode: "e65d",
            unicode_decimal: 58973,
          },
          {
            icon_id: "24855890",
            name: "circle-filled",
            font_class: "circle-filled",
            unicode: "e65e",
            unicode_decimal: 58974,
          },
          {
            icon_id: "24855891",
            name: "flag",
            font_class: "flag",
            unicode: "e65f",
            unicode_decimal: 58975,
          },
          {
            icon_id: "24855892",
            name: "flag-filled",
            font_class: "flag-filled",
            unicode: "e660",
            unicode_decimal: 58976,
          },
          {
            icon_id: "24855893",
            name: "gear-filled",
            font_class: "gear-filled",
            unicode: "e661",
            unicode_decimal: 58977,
          },
          {
            icon_id: "24855894",
            name: "home",
            font_class: "home",
            unicode: "e662",
            unicode_decimal: 58978,
          },
          {
            icon_id: "24855895",
            name: "home-filled",
            font_class: "home-filled",
            unicode: "e663",
            unicode_decimal: 58979,
          },
          {
            icon_id: "24855896",
            name: "gear",
            font_class: "gear",
            unicode: "e664",
            unicode_decimal: 58980,
          },
          {
            icon_id: "24855897",
            name: "smallcircle-filled",
            font_class: "smallcircle-filled",
            unicode: "e665",
            unicode_decimal: 58981,
          },
          {
            icon_id: "24855898",
            name: "map-filled",
            font_class: "map-filled",
            unicode: "e666",
            unicode_decimal: 58982,
          },
          {
            icon_id: "24855899",
            name: "map",
            font_class: "map",
            unicode: "e667",
            unicode_decimal: 58983,
          },
          {
            icon_id: "24855825",
            name: "refresh-filled",
            font_class: "refresh-filled",
            unicode: "e656",
            unicode_decimal: 58966,
          },
          {
            icon_id: "24855826",
            name: "refresh",
            font_class: "refresh",
            unicode: "e657",
            unicode_decimal: 58967,
          },
          {
            icon_id: "24855808",
            name: "cloud-upload",
            font_class: "cloud-upload",
            unicode: "e645",
            unicode_decimal: 58949,
          },
          {
            icon_id: "24855809",
            name: "cloud-download-filled",
            font_class: "cloud-download-filled",
            unicode: "e646",
            unicode_decimal: 58950,
          },
          {
            icon_id: "24855810",
            name: "cloud-download",
            font_class: "cloud-download",
            unicode: "e647",
            unicode_decimal: 58951,
          },
          {
            icon_id: "24855811",
            name: "cloud-upload-filled",
            font_class: "cloud-upload-filled",
            unicode: "e648",
            unicode_decimal: 58952,
          },
          {
            icon_id: "24855813",
            name: "redo",
            font_class: "redo",
            unicode: "e64a",
            unicode_decimal: 58954,
          },
          {
            icon_id: "24855814",
            name: "images-filled",
            font_class: "images-filled",
            unicode: "e64b",
            unicode_decimal: 58955,
          },
          {
            icon_id: "24855815",
            name: "undo-filled",
            font_class: "undo-filled",
            unicode: "e64c",
            unicode_decimal: 58956,
          },
          {
            icon_id: "24855816",
            name: "more",
            font_class: "more",
            unicode: "e64d",
            unicode_decimal: 58957,
          },
          {
            icon_id: "24855817",
            name: "more-filled",
            font_class: "more-filled",
            unicode: "e64e",
            unicode_decimal: 58958,
          },
          {
            icon_id: "24855818",
            name: "undo",
            font_class: "undo",
            unicode: "e64f",
            unicode_decimal: 58959,
          },
          {
            icon_id: "24855819",
            name: "images",
            font_class: "images",
            unicode: "e650",
            unicode_decimal: 58960,
          },
          {
            icon_id: "24855821",
            name: "paperclip",
            font_class: "paperclip",
            unicode: "e652",
            unicode_decimal: 58962,
          },
          {
            icon_id: "24855822",
            name: "settings",
            font_class: "settings",
            unicode: "e653",
            unicode_decimal: 58963,
          },
          {
            icon_id: "24855823",
            name: "search",
            font_class: "search",
            unicode: "e654",
            unicode_decimal: 58964,
          },
          {
            icon_id: "24855824",
            name: "redo-filled",
            font_class: "redo-filled",
            unicode: "e655",
            unicode_decimal: 58965,
          },
          {
            icon_id: "24841702",
            name: "list",
            font_class: "list",
            unicode: "e644",
            unicode_decimal: 58948,
          },
          {
            icon_id: "24841489",
            name: "mail-open-filled",
            font_class: "mail-open-filled",
            unicode: "e63a",
            unicode_decimal: 58938,
          },
          {
            icon_id: "24841491",
            name: "hand-thumbsdown-filled",
            font_class: "hand-down-filled",
            unicode: "e63c",
            unicode_decimal: 58940,
          },
          {
            icon_id: "24841492",
            name: "hand-thumbsdown",
            font_class: "hand-down",
            unicode: "e63d",
            unicode_decimal: 58941,
          },
          {
            icon_id: "24841493",
            name: "hand-thumbsup-filled",
            font_class: "hand-up-filled",
            unicode: "e63e",
            unicode_decimal: 58942,
          },
          {
            icon_id: "24841494",
            name: "hand-thumbsup",
            font_class: "hand-up",
            unicode: "e63f",
            unicode_decimal: 58943,
          },
          {
            icon_id: "24841496",
            name: "heart-filled",
            font_class: "heart-filled",
            unicode: "e641",
            unicode_decimal: 58945,
          },
          {
            icon_id: "24841498",
            name: "mail-open",
            font_class: "mail-open",
            unicode: "e643",
            unicode_decimal: 58947,
          },
          {
            icon_id: "24841488",
            name: "heart",
            font_class: "heart",
            unicode: "e639",
            unicode_decimal: 58937,
          },
          {
            icon_id: "24839963",
            name: "loop",
            font_class: "loop",
            unicode: "e633",
            unicode_decimal: 58931,
          },
          {
            icon_id: "24839866",
            name: "pulldown",
            font_class: "pulldown",
            unicode: "e632",
            unicode_decimal: 58930,
          },
          {
            icon_id: "24813798",
            name: "scan",
            font_class: "scan",
            unicode: "e62a",
            unicode_decimal: 58922,
          },
          {
            icon_id: "24813786",
            name: "bars",
            font_class: "bars",
            unicode: "e627",
            unicode_decimal: 58919,
          },
          {
            icon_id: "24813788",
            name: "cart-filled",
            font_class: "cart-filled",
            unicode: "e629",
            unicode_decimal: 58921,
          },
          {
            icon_id: "24813790",
            name: "checkbox",
            font_class: "checkbox",
            unicode: "e62b",
            unicode_decimal: 58923,
          },
          {
            icon_id: "24813791",
            name: "checkbox-filled",
            font_class: "checkbox-filled",
            unicode: "e62c",
            unicode_decimal: 58924,
          },
          {
            icon_id: "24813794",
            name: "shop",
            font_class: "shop",
            unicode: "e62f",
            unicode_decimal: 58927,
          },
          {
            icon_id: "24813795",
            name: "headphones",
            font_class: "headphones",
            unicode: "e630",
            unicode_decimal: 58928,
          },
          {
            icon_id: "24813796",
            name: "cart",
            font_class: "cart",
            unicode: "e631",
            unicode_decimal: 58929,
          },
        ],
      };
    },
    ecd6: function (e, t, n) {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 }),
        (t.default = void 0);
      t.default = { appid: "__UNI__AB5B3BC" };
    },
    ed08: function (e, t, n) {
      "use strict";
      var r = n("4ea4");
      Object.defineProperty(t, "__esModule", { value: !0 }),
        (t.addClass = w),
        (t.beautifierConf = void 0),
        (t.byteLength = c),
        (t.camelCase = A),
        (t.cleanArray = u),
        (t.createUniqueString = _),
        (t.debounce = v),
        (t.deepClone = m),
        (t.exportDefault = void 0),
        (t.formatDate = o),
        (t.formatTime = a),
        (t.getQueryObject = s),
        (t.getTime = g),
        (t.hasClass = b),
        (t.html2Text = d),
        (t.isNumberStr = I),
        (t.makeMap = x),
        (t.objectMerge = p),
        (t.param = l),
        (t.param2Obj = f),
        (t.removeClass = k),
        (t.titleCase = S),
        (t.toggleClass = h),
        (t.uniqueArr = y);
      var i = r(n("7037"));
      function o(e, t, n) {
        if (null == e || "" == e) return "";
        var r = new Date(e),
          i = r.getFullYear(),
          o =
            r.getMonth() + 1 < 10 ? "0" + (r.getMonth() + 1) : r.getMonth() + 1,
          a = r.getDate() < 10 ? "0" + r.getDate() : r.getDate(),
          s = r.getHours() < 10 ? "0" + r.getHours() : r.getHours(),
          c = r.getMinutes() < 10 ? "0" + r.getMinutes() : r.getMinutes(),
          u = r.getSeconds() < 10 ? "0" + r.getSeconds() : r.getSeconds();
        if ("date" == t) return i + "-" + o + "-" + a;
        if ("dateTime" == t)
          return i + "-" + o + "-" + a + " " + s + ":" + c + ":" + u;
        if ("dateMinutes" == t)
          return i + "-" + o + "-" + a + " " + s + ":" + c;
        if ("before" == t) {
          var l = new Date(r - 24 * n * 3600 * 1e3),
            f = l.getFullYear(),
            d =
              l.getMonth() + 1 < 10
                ? "0" + (l.getMonth() + 1)
                : l.getMonth() + 1,
            p = l.getDate() < 10 ? "0" + l.getDate() : l.getDate();
          return f + "-" + d + "-" + p;
        }
        if ("year" == t) {
          l = new Date(r - 864e5);
          var h = l.getFullYear() + n;
          (d =
            l.getMonth() + 1 < 10
              ? "0" + (l.getMonth() + 1)
              : l.getMonth() + 1),
            (p = l.getDate() < 10 ? "0" + l.getDate() : l.getDate());
          if ("02" == d || 2 == d) {
            var g = new Date(h, d, 0).getDate();
            parseInt(p) > g && (p = g);
          }
          return h + "-" + d + "-" + p;
        }
      }
      function a(e, t) {
        e = 10 === ("" + e).length ? 1e3 * parseInt(e) : +e;
        var n = new Date(e),
          r = Date.now(),
          i = (r - n) / 1e3;
        return i < 30
          ? "刚刚"
          : i < 3600
          ? Math.ceil(i / 60) + "分钟前"
          : i < 86400
          ? Math.ceil(i / 3600) + "小时前"
          : i < 172800
          ? "1天前"
          : t
          ? parseTime(e, t)
          : n.getMonth() +
            1 +
            "月" +
            n.getDate() +
            "日" +
            n.getHours() +
            "时" +
            n.getMinutes() +
            "分";
      }
      function s(e) {
        e = null == e ? window.location.href : e;
        var t = e.substring(e.lastIndexOf("?") + 1),
          n = {},
          r = /([^?&=]+)=([^?&=]*)/g;
        return (
          t.replace(r, function (e, t, r) {
            var i = decodeURIComponent(t),
              o = decodeURIComponent(r);
            return (o = String(o)), (n[i] = o), e;
          }),
          n
        );
      }
      function c(e) {
        for (var t = e.length, n = e.length - 1; n >= 0; n--) {
          var r = e.charCodeAt(n);
          r > 127 && r <= 2047 ? t++ : r > 2047 && r <= 65535 && (t += 2),
            r >= 56320 && r <= 57343 && n--;
        }
        return t;
      }
      function u(e) {
        for (var t = [], n = 0; n < e.length; n++) e[n] && t.push(e[n]);
        return t;
      }
      function l(e) {
        return e
          ? u(
              Object.keys(e).map(function (t) {
                return void 0 === e[t]
                  ? ""
                  : encodeURIComponent(t) + "=" + encodeURIComponent(e[t]);
              })
            ).join("&")
          : "";
      }
      function f(e) {
        var t = e.split("?")[1];
        return t
          ? JSON.parse(
              '{"' +
                decodeURIComponent(t)
                  .replace(/"/g, '\\"')
                  .replace(/&/g, '","')
                  .replace(/=/g, '":"')
                  .replace(/\+/g, " ") +
                '"}'
            )
          : {};
      }
      function d(e) {
        var t = document.createElement("div");
        return (t.innerHTML = e), t.textContent || t.innerText;
      }
      function p(e, t) {
        return (
          "object" !== (0, i.default)(e) && (e = {}),
          Array.isArray(t)
            ? t.slice()
            : (Object.keys(t).forEach(function (n) {
                var r = t[n];
                "object" === (0, i.default)(r)
                  ? (e[n] = p(e[n], r))
                  : (e[n] = r);
              }),
              e)
        );
      }
      function h(e, t) {
        if (e && t) {
          var n = e.className,
            r = n.indexOf(t);
          -1 === r
            ? (n += "" + t)
            : (n = n.substr(0, r) + n.substr(r + t.length)),
            (e.className = n);
        }
      }
      function g(e) {
        return "start" === e
          ? new Date().getTime() - 7776e6
          : new Date(new Date().toDateString());
      }
      function v(e, t, n) {
        var r,
          i,
          o,
          a,
          s,
          c = function () {
            var u = +new Date() - a;
            u < t && u > 0
              ? (r = setTimeout(c, t - u))
              : ((r = null), n || ((s = e.apply(o, i)), r || (o = i = null)));
          };
        return function () {
          for (var i = arguments.length, u = new Array(i), l = 0; l < i; l++)
            u[l] = arguments[l];
          (o = this), (a = +new Date());
          var f = n && !r;
          return (
            r || (r = setTimeout(c, t)),
            f && ((s = e.apply(o, u)), (o = u = null)),
            s
          );
        };
      }
      function m(e) {
        if (!e && "object" !== (0, i.default)(e))
          throw new Error("error arguments", "deepClone");
        var t = e.constructor === Array ? [] : {};
        return (
          Object.keys(e).forEach(function (n) {
            e[n] && "object" === (0, i.default)(e[n])
              ? (t[n] = m(e[n]))
              : (t[n] = e[n]);
          }),
          t
        );
      }
      function y(e) {
        return Array.from(new Set(e));
      }
      function _() {
        var e = +new Date() + "",
          t = parseInt(65536 * (1 + Math.random())) + "";
        return (+(t + e)).toString(32);
      }
      function b(e, t) {
        return !!e.className.match(new RegExp("(\\s|^)" + t + "(\\s|$)"));
      }
      function w(e, t) {
        b(e, t) || (e.className += " " + t);
      }
      function k(e, t) {
        if (b(e, t)) {
          var n = new RegExp("(\\s|^)" + t + "(\\s|$)");
          e.className = e.className.replace(n, " ");
        }
      }
      function x(e, t) {
        for (
          var n = Object.create(null), r = e.split(","), i = 0;
          i < r.length;
          i++
        )
          n[r[i]] = !0;
        return t
          ? function (e) {
              return n[e.toLowerCase()];
            }
          : function (e) {
              return n[e];
            };
      }
      (t.exportDefault = "export default "),
        (t.beautifierConf = {
          html: {
            indent_size: "2",
            indent_char: " ",
            max_preserve_newlines: "-1",
            preserve_newlines: !1,
            keep_array_indentation: !1,
            break_chained_methods: !1,
            indent_scripts: "separate",
            brace_style: "end-expand",
            space_before_conditional: !0,
            unescape_strings: !1,
            jslint_happy: !1,
            end_with_newline: !0,
            wrap_line_length: "110",
            indent_inner_html: !0,
            comma_first: !1,
            e4x: !0,
            indent_empty_lines: !0,
          },
          js: {
            indent_size: "2",
            indent_char: " ",
            max_preserve_newlines: "-1",
            preserve_newlines: !1,
            keep_array_indentation: !1,
            break_chained_methods: !1,
            indent_scripts: "normal",
            brace_style: "end-expand",
            space_before_conditional: !0,
            unescape_strings: !1,
            jslint_happy: !0,
            end_with_newline: !0,
            wrap_line_length: "110",
            indent_inner_html: !0,
            comma_first: !1,
            e4x: !0,
            indent_empty_lines: !0,
          },
        });
      function S(e) {
        return e.replace(/( |^)[a-z]/g, function (e) {
          return e.toUpperCase();
        });
      }
      function A(e) {
        return e.replace(/-[a-z]/g, function (e) {
          return e.substr(-1).toUpperCase();
        });
      }
      function I(e) {
        return /^[+-]?(0|([1-9]\d*))(\.\d+)?$/g.test(e);
      }
    },
    ed6d: function (e, t, n) {
      var r = n("4a4b");
      function i(e, t) {
        if ("function" != typeof t && null !== t)
          throw new TypeError(
            "Super expression must either be null or a function"
          );
        (e.prototype = Object.create(t && t.prototype, {
          constructor: { value: e, writable: !0, configurable: !0 },
        })),
          Object.defineProperty(e, "prototype", { writable: !1 }),
          t && r(e, t);
      }
      (e.exports = i),
        (e.exports.__esModule = !0),
        (e.exports["default"] = e.exports);
    },
    f0c5: function (e, t, n) {
      "use strict";
      function r(e, t, n, r, i, o, a, s, c, u) {
        var l,
          f = "function" === typeof e ? e.options : e;
        if (c) {
          f.components || (f.components = {});
          var d = Object.prototype.hasOwnProperty;
          for (var p in c)
            d.call(c, p) &&
              !d.call(f.components, p) &&
              (f.components[p] = c[p]);
        }
        if (
          (u &&
            ("function" === typeof u.beforeCreate &&
              (u.beforeCreate = [u.beforeCreate]),
            (u.beforeCreate || (u.beforeCreate = [])).unshift(function () {
              this[u.__module] = this;
            }),
            (f.mixins || (f.mixins = [])).push(u)),
          t && ((f.render = t), (f.staticRenderFns = n), (f._compiled = !0)),
          r && (f.functional = !0),
          o && (f._scopeId = "data-v-" + o),
          a
            ? ((l = function (e) {
                (e =
                  e ||
                  (this.$vnode && this.$vnode.ssrContext) ||
                  (this.parent &&
                    this.parent.$vnode &&
                    this.parent.$vnode.ssrContext)),
                  e ||
                    "undefined" === typeof __VUE_SSR_CONTEXT__ ||
                    (e = __VUE_SSR_CONTEXT__),
                  i && i.call(this, e),
                  e &&
                    e._registeredComponents &&
                    e._registeredComponents.add(a);
              }),
              (f._ssrRegister = l))
            : i &&
              (l = s
                ? function () {
                    i.call(this, this.$root.$options.shadowRoot);
                  }
                : i),
          l)
        )
          if (f.functional) {
            f._injectStyles = l;
            var h = f.render;
            f.render = function (e, t) {
              return l.call(t), h(e, t);
            };
          } else {
            var g = f.beforeCreate;
            f.beforeCreate = g ? [].concat(g, l) : [l];
          }
        return { exports: e, options: f };
      }
      n.d(t, "a", function () {
        return r;
      });
    },
  },
]);
