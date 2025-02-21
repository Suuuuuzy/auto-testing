(global.webpackJsonp = global.webpackJsonp || []).push([
  ["baseComponents/dishPopups-dp-components-commonPackage/sideDishList/index"],
  {
    2492: function (t, e, i) {
      "use strict";
      (function (t) {
        var n = i("4ea4");
        Object.defineProperty(e, "__esModule", { value: !0 }),
          (e.default = void 0);
        var s = n(i("9523")),
          r = n(i("2309")),
          a = i("ca00");
        function o(t, e) {
          var i =
            ("undefined" != typeof Symbol && t[Symbol.iterator]) ||
            t["@@iterator"];
          if (!i) {
            if (
              Array.isArray(t) ||
              (i = (function (t, e) {
                if (t) {
                  if ("string" == typeof t) return u(t, e);
                  var i = Object.prototype.toString.call(t).slice(8, -1);
                  return (
                    "Object" === i && t.constructor && (i = t.constructor.name),
                    "Map" === i || "Set" === i
                      ? Array.from(t)
                      : "Arguments" === i ||
                        /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(i)
                      ? u(t, e)
                      : void 0
                  );
                }
              })(t)) ||
              (e && t && "number" == typeof t.length)
            ) {
              i && (t = i);
              var n = 0,
                s = function () {};
              return {
                s: s,
                n: function () {
                  return n >= t.length
                    ? { done: !0 }
                    : { done: !1, value: t[n++] };
                },
                e: function (t) {
                  throw t;
                },
                f: s,
              };
            }
            throw new TypeError(
              "Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."
            );
          }
          var r,
            a = !0,
            o = !1;
          return {
            s: function () {
              i = i.call(t);
            },
            n: function () {
              var t = i.next();
              return (a = t.done), t;
            },
            e: function (t) {
              (o = !0), (r = t);
            },
            f: function () {
              try {
                a || null == i.return || i.return();
              } finally {
                if (o) throw r;
              }
            },
          };
        }
        function u(t, e) {
          (null == e || e > t.length) && (e = t.length);
          for (var i = 0, n = new Array(e); i < e; i++) n[i] = t[i];
          return n;
        }
        var h = {
          name: "SideDishList",
          components: {
            dishItemWM: function () {
              Promise.all([
                i.e("common/vendor"),
                i.e(
                  "baseComponents/dishPopups-common-commonPackage/dishItemComponents-placeholder/wmztIndex/tjdishItemPopup-index"
                ),
              ])
                .then(
                  function () {
                    return resolve(i("b838"));
                  }.bind(null, i)
                )
                .catch(i.oe);
            },
            dishItemFast: function () {
              Promise.all([
                i.e("common/vendor"),
                i.e(
                  "baseComponents/dishPopups-common-commonPackage/dishItemComponents-placeholder/dcfastIndex/tjdishItemPopup-index"
                ),
              ])
                .then(
                  function () {
                    return resolve(i("fd7c"));
                  }.bind(null, i)
                )
                .catch(i.oe);
            },
            dishItemDC: function () {
              Promise.all([
                i.e("common/vendor"),
                i.e(
                  "baseComponents/dishPopups-common-commonPackage/dishItemComponents-placeholder/dcIndex/tjdishItemPopup-index"
                ),
              ])
                .then(
                  function () {
                    return resolve(i("1896"));
                  }.bind(null, i)
                )
                .catch(i.oe);
            },
            reomveDishPopup: function () {
              i.e(
                "baseComponents/dishPopups-dp-components-commonPackage/sideDishList/reomveDishPopup"
              )
                .then(
                  function () {
                    return resolve(i("f622"));
                  }.bind(null, i)
                )
                .catch(i.oe);
            },
          },
          props: {
            sideDish: {
              type: Array,
              default: function () {
                return [];
              },
            },
            context: { type: String, default: "DC" },
            init: {
              type: Object,
              default: function () {
                return {
                  dishBtnSize: { size: 24 },
                  promPriceName: "促销价",
                  vipTxt: "会员价",
                  isPreOrder: !1,
                };
              },
            },
            isVip: { type: Boolean, default: !1 },
            isWoods: { type: Boolean, default: !1 },
            isFastFood: { type: Boolean, default: !1 },
            themeColor: { type: String, default: "" },
            layout: { type: String, default: "9" },
          },
          data: function () {
            return {
              reomveDishPopup: !1,
              reomveDishList: [],
              dishCart: {},
              equityDishCart: {},
              itemWidth: 0,
              windowWidth: 0,
            };
          },
          created: function () {
            (this.oneShop = r.default.getBusState("oneShop", this.context)),
              (this.dishCart = {}),
              (this.equityDishCart = {}),
              (this.groupDishNum = {}),
              (this.dcInstace = r.default.getBusiness(this.context).dsManger),
              (this.isShowLimitTip = !1),
              (this.sellClearDish = this.dcInstace.gqDish),
              (this.windowWidth = (0, a.getSystemInfoSync)().windowWidth);
          },
          mounted: function () {
            this.dishAddDefaultQuantity();
          },
          methods: {
            dishAddDefaultQuantity: function () {
              var t = this,
                e =
                  r.default.getDecorate("DC").decorationData.dishPage
                    .showGqMethod,
                i = this.isFastFood,
                n = setTimeout(function () {
                  t.sideDish.forEach(function (n, s) {
                    n.dishList.forEach(function (n, r) {
                      var a = t.dcInstace.checkDpDishState(
                        n._itemId,
                        e
                      ).usableUnitList;
                      if (0 == +n.guQingFlg && a.length) {
                        var o = t.getDishIndex(s, r);
                        n.itemUnitList.forEach(function (e) {
                          if (e._sideDishDefaultCount && 0 == +e.guQingFlg) {
                            var s = t.dcInstace.createDishTemplate(
                              n.category,
                              n._classId,
                              n._itemId,
                              e.unId
                            );
                            s.num = e._sideDishDefaultCount;
                            var r = ""
                              .concat(s.category, "/")
                              .concat(s.itemId, "/")
                              .concat(s.standard.unId);
                            i &&
                              t.dcInstace.getEquityDish({ dish: s, id: r }) &&
                              (s.equity = "equity"),
                              t.dishChange({ data: n }, o, s);
                          }
                        });
                      }
                    });
                  }),
                    (t.isShowLimitTip = !0),
                    clearTimeout(n);
                }, 50);
            },
            filterSellClearDish: function (t) {
              var e = this.sellClearDish;
              return e[t.category] &&
                e[t.category][t._classId] &&
                e[t.category][t._classId][t._itemId]
                ? e[t.category][t._classId][t._itemId]
                : null;
            },
            getDishIndex: function (t, e) {
              var i = 0;
              for (var n in this.sideDish) {
                var s = this.sideDish[n];
                if (n < t) i += s.dishList.length;
                else {
                  if (n != t) break;
                  i += e;
                }
              }
              return i;
            },
            getGroupInfo: function (t) {
              var e,
                i,
                n = 0,
                s = o(this.sideDish);
              try {
                for (s.s(); !(i = s.n()).done; ) {
                  var r = i.value;
                  if ((n += r.dishList.length) > t) {
                    e = r;
                    break;
                  }
                }
              } catch (t) {
                s.e(t);
              } finally {
                s.f();
              }
              return e;
            },
            dishChange: function (t, e, i, n) {
              var r = this,
                o = t.data,
                u = t.eventType,
                h = "clickRemove" === u,
                d =
                  (i =
                    i ||
                    this.dcInstace.createDishTemplate(
                      o.category,
                      o._classId,
                      o._itemId,
                      n.usableUnitList[0].unId
                    )).num || 1,
                c = i.itemId,
                m = i.itemStr,
                l = this.dishCart[c],
                f = (l && l.num) || 0,
                p = null;
              if (h && l)
                if (
                  ((m += "equity" === i.equity ? "(equityDish)" : ""),
                  l.num - 1 == 0)
                )
                  (f = 0),
                    this.equityDishChangeHandler(
                      Object.values(this.dishCart[c].dishs)[0]
                    ),
                    delete this.dishCart[c],
                    this.checkGroupLimit(e, "removeDish");
                else {
                  if (Object.values(l.dishs).length > 1)
                    return (
                      this.getRemoveDishList(l),
                      void (this.reomveDishPopup = !0)
                    );
                  var v = l.dishs[Object.keys(l.dishs)[0]];
                  this.equityDishChangeHandler(v),
                    v.num--,
                    0 === v.num && delete l.dishs[m],
                    l.num--,
                    (f = l.num),
                    this.checkGroupLimit(e, "removeDish"),
                    this.getRemoveDishList(l);
                }
              else if (!h) {
                var y = 0;
                if (this.isFastFood && "equity" === i.equity) {
                  var D = this.getDishAddEquityNum(i, d),
                    g = D.dishNum;
                  if ((y = D.equityDishNum)) {
                    if (y && g) {
                      i.num = y;
                      var C = (0, a.deepCopyObj)(i);
                      (C.num = g),
                        (p = function () {
                          return r.dishChange(
                            { data: o, eventType: u },
                            e,
                            C,
                            n
                          );
                        });
                    }
                  } else delete i.equity;
                  y && ((d = y), (m += "(equityDish)"));
                }
                var I = this.checkDishLimt(i, f, d, e),
                  b = I.remainderQuantity,
                  S = I.isOverLimit;
                if (b || !S) {
                  if ((b && ((d = b), (i.num = b)), l)) {
                    (l.num += d), (f = l.num);
                    var q = l.dishs[m];
                    q ? (q.num += d) : (l.dishs[m] = i);
                  } else
                    (this.dishCart[c] = {
                      dishs: (0, s.default)({}, m, i),
                      itemIndex: e,
                      num: d,
                    }),
                      (f = d);
                  this.equityDishChangeHandler(i, "addDish", y);
                }
              }
              this.calculcateState(e, f), p && p();
            },
            equityDishChangeHandler: function (t, e) {
              var i =
                arguments.length > 2 && void 0 !== arguments[2]
                  ? arguments[2]
                  : 1;
              if (this.isFastFood && "equity" === t.equity) {
                var n = ""
                  .concat(t.category, "/")
                  .concat(t.itemId, "/")
                  .concat(t.standard.unId);
                if ("addDish" === e) {
                  if (!i) return;
                  this.equityDishCart[n]
                    ? (this.equityDishCart[n] += i)
                    : (this.equityDishCart[n] = i);
                } else
                  this.equityDishCart[n] &&
                    (this.equityDishCart[n]--,
                    0 === this.equityDishCart[n] &&
                      delete this.equityDishCart[n]);
              }
            },
            getDishAddEquityNum: function (t, e) {
              var i = ""
                  .concat(t.category, "/")
                  .concat(t.itemId, "/")
                  .concat(t.standard.unId),
                n = this.dcInstace.getEquityDish({ dish: t, id: i }),
                s = 0;
              if (n) {
                var r =
                  (this.dcInstace.equityCardDishNums[i] || 0) +
                  (this.equityDishCart[i] || 0);
                if (n.surplus >= r + e) (s = e), (e = 0);
                else {
                  var a = n.surplus - r;
                  a > 0 && (e -= s = a > e ? e : a);
                }
              }
              return { equityDishNum: s, dishNum: e };
            },
            checkDishLimt: function (t, e, i, n) {
              var s = this,
                r = this.$refs.dishItem[n].dishData,
                a = function (e, i) {
                  var n = e
                    ? t.standard.unName + "规格已达到最大可点量"
                    : "该品项已达到最大可点量";
                  s.isShowLimitTip &&
                    s.showToast("".concat(n, "，最多可点").concat(i, "份"));
                },
                o = r.sideDishMaxOrderCount,
                u = this.cartDishLimitCheck(t, o);
              if (u) return a(!1, u), { isOverLimit: !0 };
              var h = r.itemUnitList;
              if (h.length) {
                var d = t.itemId,
                  c = t.standard.unId,
                  m =
                    (
                      h.find(function (t) {
                        return t.unId === c;
                      }) || {}
                    ).limitQuantity || 2147483647;
                if (m) {
                  var l = this.oneShop.shopSetting.quantitySpecFlg || 0,
                    f = 0,
                    p = 0;
                  if (
                    (this.dishCart[d] &&
                      Object.values(this.dishCart[d].dishs).forEach(function (
                        t
                      ) {
                        t.standard.unId === c && (f += t.num), (p += t.num);
                      }),
                    i + f > m)
                  )
                    return a(h.length > 1, m), { isOverLimit: !0 };
                  if (l) {
                    if (i + f > o) return a(l, o), { isOverLimit: !0 };
                  } else if (i + p > o) return a(l, o), { isOverLimit: !0 };
                }
              }
              return this.checkGroupLimit(n, "addDish", i);
            },
            cartDishLimitCheck: function (t) {
              var e =
                  arguments.length > 1 && void 0 !== arguments[1]
                    ? arguments[1]
                    : 1,
                i = this.dcInstace.checkDishCount(
                  t,
                  1,
                  this.oneShop.shopSetting.quantitySpecFlg
                ),
                n = i.count,
                s = i.limit,
                r = i.isUseLimit;
              if (0 === n) return r ? s : e;
            },
            popupDishChange: function (t, e) {
              var i = e.itemId,
                n = e.itemStr,
                s = this.dishCart[i].itemIndex;
              this[t]({ itemId: i, itemStr: n }, s);
              var r = this.dishCart[i],
                a = 0;
              r && ((a = r.num), this.getRemoveDishList(r)),
                this.calculcateState(s, a);
            },
            checkGroupLimit: function (t, e) {
              var i =
                  arguments.length > 2 && void 0 !== arguments[2]
                    ? arguments[2]
                    : 1,
                n = this.getGroupInfo(t),
                s = n.groupId,
                r = n.maxsel;
              if ("removeDish" !== e) {
                var a = this.groupDishNum,
                  o = 0,
                  u = !1;
                return (
                  a[s]
                    ? a[s] + i <= r
                      ? (a[s] += i)
                      : ((o = r - a[s]), (a[s] = r), (u = !0))
                    : i <= r
                    ? (a[s] = i)
                    : ((o = r), (a[s] = r), (u = !0)),
                  u && this.showToast("最多可选".concat(r, "道菜")),
                  { remainderQuantity: o, isOverLimit: u }
                );
              }
              this.groupDishNum[s]--;
            },
            addDish: function (t, e) {
              var i = t.itemId,
                n = t.itemStr,
                s = (0, a.deepCopyObj)(this.dishCart[i].dishs[n]);
              (s.num = 1), this.dishChange({}, e, s);
            },
            removeDish: function (t, e) {
              var i = t.itemId,
                n = t.itemStr;
              this.checkGroupLimit(e, "removeDish");
              var s = this.dishCart[i];
              s.dishs[n].num--,
                s.num--,
                this.equityDishChangeHandler(s.dishs[n]),
                0 === s.dishs[n].num && delete s.dishs[n],
                0 === s.num &&
                  (delete this.dishCart[i], (this.reomveDishPopup = !1));
            },
            getRemoveDishList: function (t) {
              var e = this.$refs.dishItem[t.itemIndex].dishData,
                i = e.equityCardName,
                n = e.equityMark;
              this.reomveDishList = Object.values(t.dishs).map(function (t) {
                var e = t.makes.length - 1,
                  s = t.makes.reduce(function (t, i, n) {
                    return (
                      t +
                      ""
                        .concat(i.name, " ")
                        .concat(i.num > 1 ? "×" + i.num : "", " ")
                        .concat(n === e ? "" : "、")
                    );
                  }, ""),
                  r = {
                    itemId: t.itemId,
                    itemStr: t.itemStr,
                    itemName: t.itemName,
                    imgUrl: t.imgUrl,
                    unName: t.standard.unName,
                    num: t.num,
                    makeStr: s,
                  };
                return (
                  "equity" === t.equity &&
                    ((r.itemStr += "(equityDish)"),
                    (r.equityMark = n),
                    (r.equityCardName = i)),
                  r
                );
              });
            },
            showToast: function (e) {
              t.showToast({ title: e, icon: "none" });
            },
            setDishItemNum: function (t, e) {
              this.$refs.dishItem[t].updateItemQuantities(e);
            },
            hasDiscount: function () {
              for (var t in this.dishCart) {
                var e,
                  i =
                    (null === (e = this.dishCart[t]) || void 0 === e
                      ? void 0
                      : e.dishs) || {};
                for (var n in i) {
                  var s = i[n];
                  if ("equity" === s.equity || s._showType > 1 || s.npartPlanID)
                    return !0;
                }
              }
              return !1;
            },
            calculateTotalNormalPrice: function () {
              var t = 0;
              for (var e in this.dishCart) {
                var i,
                  n =
                    (null === (i = this.dishCart[e]) || void 0 === i
                      ? void 0
                      : i.dishs) || {},
                  s = function (e) {
                    var i = n[e],
                      s = i.num,
                      r = i.standard,
                      o = i.makes,
                      u = 0,
                      h = r.unPrice;
                    (u = (0, a.add)(h, u)),
                      null == o ||
                        o.forEach(function (t) {
                          u = (0, a.add)(u, (0, a.mcl)(t.addPr, t.num));
                        }),
                      (t = (0, a.add)(t, (0, a.mcl)(u, s)));
                  };
                for (var r in n) s(r);
              }
              return +t.toFixed(2);
            },
            calculcateState: function (t, e) {
              this.setDishItemNum(t, e),
                this.$emit("dishChange", {
                  hasDiscount: this.hasDiscount(),
                  totalNormalPrice: this.calculateTotalNormalPrice(),
                });
            },
            addToCart: function () {
              var t = this,
                e =
                  r.default
                    .getBusState("baseInfo", "SYSTEM")
                    .openId.slice(14, 28) + new Date().getTime().toString(36),
                i = [],
                n = this.dishCart;
              for (var s in n)
                for (
                  var o = n[s],
                    u = this.getGroupInfo(o.itemIndex).groupId,
                    h = 0,
                    d = Object.values(o.dishs);
                  h < d.length;
                  h++
                ) {
                  var c = d[h];
                  if (this.cartDishLimitCheck(c))
                    return (
                      this.showToast(c.itemName + "已达到最大限量"),
                      { error: !0 }
                    );
                  (c.itemStr += "(dpc)".concat(e)),
                    (c.sideDishType = 1),
                    (c.sideDishGroupId = u),
                    (c.sideDishOnlyKey = e);
                  var m = {
                    operate: 1,
                    data: (0, a.deepCopyObj)(c),
                    needAdd: !!c.needAdd && c.needAdd,
                    operateUserId: void 0,
                    type: "inc",
                  };
                  i.push(m);
                }
              var l = setTimeout(function () {
                i.forEach(function (e) {
                  t.dcInstace.send(e, "system");
                }),
                  clearTimeout(l);
              });
              return { primaryKey: e };
            },
            checkGroupMinLimit: function () {
              var t,
                e = o(this.sideDish);
              try {
                for (e.s(); !(t = e.n()).done; ) {
                  var i = t.value,
                    n = i.minsel;
                  if ((this.groupDishNum[i.groupId] || 0) < n)
                    return (
                      this.showToast(
                        "".concat(i.groupName, "最少需选").concat(n)
                      ),
                      !1
                    );
                }
              } catch (t) {
                e.e(t);
              } finally {
                e.f();
              }
              return !0;
            },
            loopAddDish: function (t, e) {
              var i = this;
              if (!Object.keys(this.dishCart).length)
                return e(t), { error: !1 };
              if (this.checkGroupMinLimit()) {
                for (
                  var n = t.num || 1,
                    s = function (n) {
                      var s = setTimeout(function () {
                        var n = i.addToCart();
                        if (n.error) return { error: !0 };
                        var r = n.primaryKey,
                          o = (0, a.deepCopyObj)(t);
                        (o.num = 1),
                          (o.sideDishOnlyKey = r),
                          (o.sideDishType = 0),
                          (o.itemStr += "(dpc)".concat(r)),
                          e(o),
                          clearTimeout(s);
                      }, 1 * n);
                    },
                    r = 0;
                  r < n;
                  r++
                )
                  s(r);
                return { error: !1 };
              }
              return { error: !0 };
            },
          },
          computed: {
            wrapStyle: function () {
              return "23" != this.layout || this.isWoods
                ? {}
                : {
                    "min-width": "calc((".concat(
                      this.windowWidth,
                      "px - 100rpx) / 3)"
                    ),
                  };
            },
          },
        };
        e.default = h;
      }).call(this, i("543d").default);
    },
    2920: function (t, e, i) {},
    "34a2": function (t, e, i) {
      "use strict";
      i.r(e);
      var n = i("2492"),
        s = i.n(n);
      for (var r in n)
        ["default"].indexOf(r) < 0 &&
          (function (t) {
            i.d(e, t, function () {
              return n[t];
            });
          })(r);
      e.default = s.a;
    },
    "592f": function (t, e, i) {
      "use strict";
      i.r(e);
      var n = i("f8cf"),
        s = i("34a2");
      for (var r in s)
        ["default"].indexOf(r) < 0 &&
          (function (t) {
            i.d(e, t, function () {
              return s[t];
            });
          })(r);
      i("5fac");
      var a = i("f0c5"),
        o = Object(a.a)(
          s.default,
          n.b,
          n.c,
          !1,
          null,
          "a76e2f28",
          null,
          !1,
          n.a,
          void 0
        );
      e.default = o.exports;
    },
    "5fac": function (t, e, i) {
      "use strict";
      var n = i("2920");
      i.n(n).a;
    },
    f8cf: function (t, e, i) {
      "use strict";
      i.d(e, "b", function () {
        return n;
      }),
        i.d(e, "c", function () {
          return s;
        }),
        i.d(e, "a", function () {});
      var n = function () {
          var t = this,
            e =
              (t.$createElement,
              t._self._c,
              t.__map(t.sideDish, function (e, i) {
                return {
                  $orig: t.__get_orig(e),
                  s0: t.__get_style([t.wrapStyle]),
                  l0: t.__map(e.dishList, function (e, n) {
                    return {
                      $orig: t.__get_orig(e),
                      m0: "DC" !== t.context ? t.getDishIndex(i, n) : null,
                      m1:
                        "DC" === t.context && t.isFastFood
                          ? t.filterSellClearDish(e)
                          : null,
                      m2:
                        "DC" === t.context && t.isFastFood
                          ? t.getDishIndex(i, n)
                          : null,
                      m3:
                        "DC" !== t.context || t.isFastFood
                          ? null
                          : t.getDishIndex(i, n),
                      m4:
                        "DC" !== t.context || t.isFastFood
                          ? null
                          : t.filterSellClearDish(e),
                    };
                  }),
                };
              }));
          t.$mp.data = Object.assign({}, { $root: { l1: e } });
        },
        s = [];
    },
  },
]),
  (global.webpackJsonp = global.webpackJsonp || []).push([
    "baseComponents/dishPopups-dp-components-commonPackage/sideDishList/index-create-component",
    {
      "baseComponents/dishPopups-dp-components-commonPackage/sideDishList/index-create-component":
        function (t, e, i) {
          i("543d").createComponent(i("592f"));
        },
    },
    [
      [
        "baseComponents/dishPopups-dp-components-commonPackage/sideDishList/index-create-component",
      ],
    ],
  ]);
