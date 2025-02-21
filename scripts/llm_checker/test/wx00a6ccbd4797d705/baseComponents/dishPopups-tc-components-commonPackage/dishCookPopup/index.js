(global.webpackJsonp = global.webpackJsonp || []).push([
  ["baseComponents/dishPopups-tc-components-commonPackage/dishCookPopup/index"],
  {
    "42f1": function (t, o, i) {
      "use strict";
      i.d(o, "b", function () {
        return e;
      }),
        i.d(o, "c", function () {
          return n;
        }),
        i.d(o, "a", function () {});
      var e = function () {
          var t = this,
            o =
              (t.$createElement,
              t._self._c,
              t.showPopup && !t.preCookString && t.itemUnitList.length > 1
                ? t.__map(t.itemUnitList, function (o, i) {
                    return {
                      $orig: t.__get_orig(o),
                      s0:
                        "1" != o.guQingFlg
                          ? t.__get_style([t.setUnitItemStyle(o)])
                          : null,
                    };
                  })
                : null),
            i = t.showPopup
              ? t.__map(t.copyCookStyle, function (o, i) {
                  return {
                    $orig: t.__get_orig(o),
                    l1:
                      !o.allItemGuQingFlg || t.isShowGqMethod
                        ? t.__map(o.itemMakeList, function (i, e) {
                            return {
                              $orig: t.__get_orig(i),
                              s1:
                                (0 != i.guqingFlg && !t.isShowGqMethod) ||
                                1 == i.guqingFlg
                                  ? null
                                  : t.__get_style([t.setCookItemStyle(o, i)]),
                              m0:
                                (0 == i.guqingFlg || t.isShowGqMethod) &&
                                1 != i.guqingFlg &&
                                t.isVipDisScale < 1 &&
                                i.addPr > 0
                                  ? t.toFixed(i.addPr * t.isVipDisScale)
                                  : null,
                              m1:
                                (0 == i.guqingFlg || t.isShowGqMethod) &&
                                1 != i.guqingFlg &&
                                t.isNextVipDisScale < 1 &&
                                i.addPr > 0
                                  ? t.toFixed(i.addPr * t.isNextVipDisScale)
                                  : null,
                            };
                          })
                        : null,
                  };
                })
              : null,
            e = t.showPopup ? t.__get_style([t.btnColor]) : null;
          t.$mp.data = Object.assign({}, { $root: { l0: o, l2: i, s2: e } });
        },
        n = [];
    },
    "4f2e": function (t, o, i) {
      "use strict";
      var e = i("975e");
      i.n(e).a;
    },
    "714d": function (t, o, i) {
      "use strict";
      (function (t) {
        var e = i("4ea4");
        Object.defineProperty(o, "__esModule", { value: !0 }),
          (o.default = void 0);
        var n = e(i("7037")),
          s = e(i("448a")),
          a = i("ca00"),
          h = e(i("2309")),
          r = {
            name: "dishCookPopup",
            data: function () {
              return {
                selCookMap: {},
                windowWidth: 0,
                windowHeight: 0,
                count: 1,
                showPopup: !1,
                copyCookStyle: [],
                preCookString: "",
                isShowGqMethod: !0,
                hasImgMap: {},
                itemUnitList: [],
                dishData: {},
                preUnId: "",
                combineFlag: "",
                isShowMake: !1,
                imgList: [],
                videoUrl: "",
                getProportion: (0, a.getProportion)(),
                aspectRatio: 4 / 3,
                headSwipeWidth: 0,
                maxHeight: 0,
                showTcItemDetail: !1,
                desp: null,
              };
            },
            props: {
              grpRestCount: 0,
              themeColor: {},
              template: {},
              closePosition: {},
              context: "",
              btnTxtColor: {},
              popType: { default: "1" },
              isVipDisScale: { default: 1 },
              isNextVipDisScale: { default: 1 },
              set: { default: function () {} },
              layout: { default: "1" },
              showPriceType: { default: "1" },
            },
            components: {
              addDeBtn: function () {
                Promise.all([
                  i.e("common/vendor"),
                  i.e("baseComponents/addDeBtn/index"),
                ])
                  .then(
                    function () {
                      return resolve(i("cf43"));
                    }.bind(null, i)
                  )
                  .catch(i.oe);
              },
              wxPopup: function () {
                Promise.all([
                  i.e("common/vendor"),
                  i.e("baseComponents/wxpopup/popup"),
                ])
                  .then(
                    function () {
                      return resolve(i("0387"));
                    }.bind(null, i)
                  )
                  .catch(i.oe);
              },
              imageVideoSwiper: function () {
                i.e("baseComponents/imageVideoSwiper/index")
                  .then(
                    function () {
                      return resolve(i("65e5"));
                    }.bind(null, i)
                  )
                  .catch(i.oe);
              },
            },
            methods: {
              setCookItemStyle: function (t, o) {
                var i,
                  e,
                  n = t.groupId,
                  s = t.selectModel,
                  a =
                    (null === (i = this.selCookMap) ||
                    void 0 === i ||
                    null === (e = i[n]) ||
                    void 0 === e
                      ? void 0
                      : e[o.moId]) || 0,
                  h = {
                    backgroundColor: a > 0 ? this.themeColor + "1A" : "#fff",
                    borderColor: a > 0 ? this.themeColor : "#DCDCDC",
                    color: a > 0 ? this.themeColor : "#666",
                    paddingLeft: "20rpx",
                    paddingRight: "20rpx",
                  };
                return (
                  o.taFileName &&
                    ((h.paddingRight = 1 == s && a > 0 ? "20rpx" : "40rpx"),
                    (h.paddingLeft = "0")),
                  h
                );
              },
              setUnitItemStyle: function (t) {
                var o,
                  i =
                    (null === (o = this.dishData) || void 0 === o
                      ? void 0
                      : o.unId) == t.unId;
                return {
                  backgroundColor: i ? this.themeColor + "1A" : "#fff",
                  borderColor: i ? this.themeColor : "#DCDCDC",
                  color: i ? this.themeColor : "#666",
                };
              },
              changUnit: function (t) {
                (this.dishData = t),
                  this.setCurCooks(),
                  this.handlePreSelCook(
                    this.dishData.unId == this.preUnId ? this.preCookString : ""
                  );
              },
              toFixed: function (t) {
                return (0, a.toFixed)(t);
              },
              getNumber: function (t) {
                console.log(t);
              },
              remove: function () {
                this.count > 1 && this.count--;
              },
              add: function (o) {
                var i = o.xdCount_ - o.mrCount;
                i > 0 && this.count >= i
                  ? t.showToast({
                      icon: "none",
                      title: "已经达到当前品项的限定数量",
                    })
                  : this.count >= this.grpRestCount
                  ? t.showToast({
                      icon: "none",
                      title: "已经达到当前分组的最大可选数量",
                    })
                  : (this.count += 1);
              },
              _changeCook: function (t, o) {
                var i = o.addPr,
                  e = o.moId;
                1 == t.selectModel && i > 0
                  ? 0 == this.selCookMap[t.groupId][e] &&
                    this.addDelCookStyle(t, e, "add")
                  : this.changeCook(t, e);
              },
              changeCook: function (o, i) {
                var e = o.groupId,
                  n = o.selectModel,
                  s = this.selCookMap[e],
                  a = s[i + "Long"];
                for (var h in s)
                  h.indexOf("Long") > -1 && "cookIsSel" != h && (s[h] = !1);
                if (1 == n && o.maxcount >= 2 && !this.selCookMap[e][i]) {
                  var r = 0;
                  for (var l in s)
                    -1 == l.indexOf("Long") &&
                      "cookIsSel" != l &&
                      (r += s[l] / 1);
                  if (r >= o.maxcount) {
                    t.showToast({
                      title: "最多选" + o.maxcount + "份",
                      icon: "none",
                      duration: 2e3,
                    });
                    var d = this.selCookMap;
                    return (this.selCookMap = null), void (this.selCookMap = d);
                  }
                }
                if (0 == n)
                  for (var u in this.selCookMap[e])
                    u != i &&
                      -1 == u.indexOf("Long") &&
                      "cookIsSel" != u &&
                      (this.selCookMap[e][u] = 0);
                this.selCookMap[e].cookIsSel = !0;
                var c = this.selCookMap[e][i],
                  p = this.selCookMap[e];
                c > 0 ? a || (p[i] -= 1) : (p[i] = 1),
                  p[i] <= 0 && (p[i + "Long"] = !1);
                var g = this.selCookMap;
                (this.selCookMap = null), (this.selCookMap = g);
              },
              addDelCookStyle: function (o, i, e) {
                var n = o.groupId,
                  s = 0,
                  a = this.selCookMap[n];
                if ("add" == e) {
                  for (var h in a)
                    -1 == h.indexOf("Long") &&
                      "cookIsSel" != h &&
                      (s += a[h] / 1);
                  if (o.maxcount >= 2 && s >= o.maxcount)
                    return void t.showToast({
                      title: "最多选" + o.maxcount + "份",
                      icon: "none",
                      duration: 2e3,
                    });
                }
                var r = this.selCookMap[n];
                "add" == e
                  ? (r[i] += 1)
                  : "del" == e &&
                    (r[i] >= 1 && (r[i] -= 1),
                    r[i] <= 0 && (r[i + "Long"] = !1));
                var l = this.selCookMap;
                (this.selCookMap = null), (this.selCookMap = l);
              },
              hidePopup: function (t) {
                t &&
                  ((this.count = t.itemNum),
                  (this.preCookString = t.preCookString)),
                  (this.preCookString = ""),
                  (this.showPopup = !1),
                  this.$emit("handleVideo", !0);
              },
              getRect: function (o, i) {
                var e = this;
                return new Promise(function (n) {
                  t.createSelectorQuery()
                    .in(e)
                    [i ? "selectAll" : "select"](o)
                    .boundingClientRect(function (t) {
                      i && Array.isArray(t) && t.length && n(t),
                        !i && t && n(t);
                    })
                    .exec();
                });
              },
              handelDespInfo: function () {
                var t;
                if (
                  ((this.imgList = []),
                  (this.videoUrl = ""),
                  (this.desp = null),
                  this.showTcItemDetail)
                ) {
                  var o = Object.keys(this.dishData).length
                    ? this.dishData
                    : this.itemUnitList[0];
                  o.videoName && (this.videoUrl = o.videoName),
                    o.gifName && this.imgList.push(o.gifName);
                  var i,
                    e = o.taFileName;
                  16 == this.layout || 17 == this.layout
                    ? ((this.aspectRatio = 3 / 4),
                      (e = o.threeToFourFileName || e))
                    : (this.aspectRatio = 4 / 3),
                    !e ||
                      ((this.videoUrl || 0 != this.imgList.length) &&
                        e.match("/nopic|noImages/g")) ||
                      this.imgList.push(e),
                    o.otherPicFile &&
                      o.otherPicFile.length &&
                      (i = this.imgList).push.apply(
                        i,
                        (0, s.default)(o.otherPicFile)
                      );
                  var n =
                    (null ===
                      (t = h.default
                        .getBusiness(this.context)
                        .dsManger.getDish("1", o.itemId)) || void 0 === t
                      ? void 0
                      : t.desp) || "";
                  this.desp = n ? n.split("\n") : [];
                }
              },
              showPopupFun: function (t) {
                var o = this;
                (this.count = 1),
                  (this.preUnId = ""),
                  (this.preCookString = ""),
                  (this.itemUnitList = []),
                  (this.selCookMap = {}),
                  (this.hasImgMap = {}),
                  (this.combineFlag = "");
                var i = t.preUnId,
                  e = t.preCookString,
                  n = t.itemNum,
                  s = t.itemUnitList,
                  h = t.combineFlag,
                  r = t.isShowMake,
                  l = t.showTcItemDetail;
                (this.combineFlag = h),
                  (this.isShowMake = r),
                  (this.itemUnitList = s),
                  (this.showTcItemDetail = !!l),
                  i
                    ? ((this.preUnId = i),
                      e && ((this.count = n), (this.preCookString = e)),
                      (this.dishData = this.itemUnitList.find(function (t) {
                        return t.unId == i;
                      })))
                    : (this.dishData =
                        this.itemUnitList.find(function (t) {
                          return (
                            "0" == t.guQingFlg &&
                            !("1" == t.limitQuantityFlg && 0 == t.limitQuantity)
                          );
                        }) || {}),
                  this.setCurCooks(),
                  this.handlePreSelCook(this.preCookString),
                  this.handelDespInfo(),
                  this.$nextTick(function () {
                    (o.showPopup = !0),
                      o.$nextTick(function () {
                        o.showTcItemDetail
                          ? setTimeout(function () {
                              o.$refs.imageVideoSwiper &&
                                o.$refs.imageVideoSwiper.init(),
                                o
                                  .getRect(".despInfoWrap", !1)
                                  .then(function (t) {
                                    var i = (0, a.getSystemInfoSync)()
                                      .statusBarHeight;
                                    (i += 44),
                                      (o.maxHeight =
                                        o.windowHeight -
                                        2 * (i + 30 * o.getProportion) -
                                        t.height -
                                        115 * o.getProportion);
                                  });
                            }, 50)
                          : (o.maxHeight = 0.45 * o.windowHeight);
                      });
                  }),
                  this.$emit("handleVideo", !1);
              },
              checkLimit: function () {
                var o = this.dishData,
                  i = o.unId,
                  e = o.xdCount_,
                  n = o.mrCount,
                  s = o.useLimit,
                  a = o.itemName;
                return !(
                  (!this.preCookString || i != this.preUnId) &&
                  (n >= e
                    ? (t.showToast({
                        icon: "none",
                        title: s
                          ? "".concat(a, "仅剩").concat(e, "份,不能再加啦~")
                          : "已经达到当前品项的限定数量",
                      }),
                      1)
                    : this.showTcItemDetail &&
                      this.grpRestCount < 1 &&
                      (t.showToast({
                        icon: "none",
                        title: "已经达到当前分组的最大可选数量",
                      }),
                      1))
                );
              },
              confirm: function () {
                var o = this;
                if (this.checkLimit()) {
                  if (
                    this.showTcItemDetail &&
                    !this.dishData.hasOwnProperty("guQingFlg")
                  )
                    return (this.selCookMap = {}), void this.hidePopup();
                  var i,
                    e = [],
                    s = [],
                    a = function (i) {
                      var n = o.copyCookStyle[i],
                        a = [];
                      if (
                        (n.itemMakeList.forEach(function (t) {
                          if (o.selCookMap[t.groupId][t.moId]) {
                            e.push(
                              t.groupId +
                                "_" +
                                t.moId +
                                "%" +
                                o.selCookMap[t.groupId][t.moId]
                            ),
                              a.push(
                                t.groupId +
                                  "_" +
                                  t.moId +
                                  "%" +
                                  o.selCookMap[t.groupId][t.moId]
                              );
                            var i = t.name;
                            o.selCookMap[t.groupId][t.moId] > 1 &&
                              (i += " x " + o.selCookMap[t.groupId][t.moId]),
                              s.push(i);
                          }
                        }),
                        1 == n.selfSelect && a.length < 1)
                      ) {
                        (o.selCookMap[n.groupId].cookIsSel = !1),
                          t.showToast({
                            title: "请选择" + n.groupName,
                            icon: "none",
                            duration: 2e3,
                          });
                        var h = o.selCookMap;
                        return (
                          (o.selCookMap = null),
                          (o.selCookMap = h),
                          { v: void 0 }
                        );
                      }
                    };
                  for (var h in this.copyCookStyle) {
                    var r = a(h);
                    if ("object" === (0, n.default)(r)) return r.v;
                  }
                  (i = e.length ? e.join("@") : "nocook"),
                    this.$emit("cookChoosed", {
                      grpId: this.dishData.grpId,
                      mapKey: this.dishData.mapKey,
                      cookStr: i,
                      dishCount: this.count,
                      cookScheme: s.join("、"),
                      changePreCook: i != this.preCookString,
                      preCookString: this.preCookString,
                    }),
                    (this.selCookMap = {}),
                    this.hidePopup();
                }
              },
              moveHandle: function () {
                return !1;
              },
              setCurCooks: function () {
                if (this.isShowMake) {
                  var t = [],
                    o = this.dishData,
                    i = o.itemId,
                    e = o.unId,
                    n = h.default.getBusiness(this.context).dsManger;
                  i && e && (t = n.getDishCookS(i, e)),
                    (this.copyCookStyle = (0, a.deepCopyObj)(t));
                } else this.copyCookStyle = [];
              },
              handlePreSelCook: function (t) {
                var o = this;
                (this.selCookMap = {}), (this.hasImgMap = {});
                var i = {};
                t &&
                  t.split("@").forEach(function (t) {
                    var o = t.split("%");
                    i[o[0]] = o[1];
                  }),
                  this.copyCookStyle.forEach(function (e) {
                    (o.selCookMap[e.groupId] = {}),
                      e.itemMakeList &&
                        e.itemMakeList.length &&
                        (e.itemMakeList.filter(function (t) {
                          return 0 == t.guqingFlg;
                        }).length
                          ? (e.allItemGuQingFlg = !1)
                          : (e.allItemGuQingFlg = !0),
                        (o.hasImgMap[e.groupId] = !1),
                        e.itemMakeList.forEach(function (n, s) {
                          var a = 0;
                          t
                            ? (a = i[e.groupId + "_" + n.moId] || 0)
                            : "1" == n.isDefault &&
                              "0" == n.guqingFlg &&
                              (a = 1),
                            e.itemMakeList[s].taFileName &&
                              (o.hasImgMap[e.groupId] = !0),
                            (o.selCookMap[e.groupId][n.moId] = Number(a)),
                            (o.selCookMap[e.groupId][n.moId + "Long"] = !1),
                            (o.selCookMap[e.groupId].cookIsSel = !0);
                        }));
                  });
              },
            },
            created: function () {
              var t = h.default.getDecorate(this.context);
              if ("DC" == this.context)
                this.isShowGqMethod = t.decorationData.dishPage.showGqMethod;
              else {
                var o = h.default.getBusState("oneShop", this.context);
                (this.isShowGqMethod =
                  !o.waiMaiShopSetting || o.waiMaiShopSetting.showGuQingMethod),
                  null == this.isShowGqMethod && (this.isShowGqMethod = !0);
              }
              (this.windowWidth = (0, a.getSystemInfoSync)().windowWidth),
                (this.windowHeight = (0, a.getSystemInfoSync)().windowHeight),
                (this.headSwipeWidth =
                  0.9 * this.windowWidth - 30 * (0, a.getProportion)());
            },
            computed: {
              selInfo: function () {
                var t = this,
                  o = 0,
                  i = [];
                for (var e in this.copyCookStyle)
                  this.copyCookStyle[e].itemMakeList.forEach(function (e) {
                    var n,
                      s =
                        (null === (n = t.selCookMap[e.groupId]) || void 0 === n
                          ? void 0
                          : n[e.moId]) || 0;
                    s > 0 &&
                      (i.push(e.name),
                      (o = (0, a.add)(
                        e.addPr > 0 ? (0, a.mcl)(e.addPr, s) : 0,
                        o
                      )));
                  });
                this.combineFlag &&
                  this.dishData.realUnName &&
                  i.unshift(this.dishData.realUnName);
                var n =
                  2 == this.showPriceType
                    ? this.dishData.vipAddPrice
                    : this.dishData.originalVipAddPrice;
                return {
                  addPrice: (0, a.toFixed)(
                    (0, a.add)(
                      o,
                      this.dishData.addPrice > 0 && this.combineFlag
                        ? this.dishData.addPrice
                        : 0
                    )
                  ),
                  vipAddPrice: (0, a.toFixed)(
                    (0, a.add)(
                      (0, a.mcl)(o, this.isVipDisScale),
                      n > 0 && this.combineFlag ? n : 0
                    )
                  ),
                  unName: i.join("、"),
                };
              },
              btnColor: function () {
                return this.dishData.hasOwnProperty("guQingFlg")
                  ? { background: this.themeColor, color: this.btnTxtColor }
                  : { background: "#DFDFDF", color: "#A6A6A6" };
              },
            },
          };
        o.default = r;
      }).call(this, i("543d").default);
    },
    "801c": function (t, o, i) {
      "use strict";
      i.r(o);
      var e = i("714d"),
        n = i.n(e);
      for (var s in e)
        ["default"].indexOf(s) < 0 &&
          (function (t) {
            i.d(o, t, function () {
              return e[t];
            });
          })(s);
      o.default = n.a;
    },
    "975e": function (t, o, i) {},
    af60: function (t, o, i) {
      "use strict";
      i.r(o);
      var e = i("42f1"),
        n = i("801c");
      for (var s in n)
        ["default"].indexOf(s) < 0 &&
          (function (t) {
            i.d(o, t, function () {
              return n[t];
            });
          })(s);
      i("4f2e");
      var a = i("f0c5"),
        h = Object(a.a)(
          n.default,
          e.b,
          e.c,
          !1,
          null,
          "5b30d4ee",
          null,
          !1,
          e.a,
          void 0
        );
      o.default = h.exports;
    },
  },
]),
  (global.webpackJsonp = global.webpackJsonp || []).push([
    "baseComponents/dishPopups-tc-components-commonPackage/dishCookPopup/index-create-component",
    {
      "baseComponents/dishPopups-tc-components-commonPackage/dishCookPopup/index-create-component":
        function (t, o, i) {
          i("543d").createComponent(i("af60"));
        },
    },
    [
      [
        "baseComponents/dishPopups-tc-components-commonPackage/dishCookPopup/index-create-component",
      ],
    ],
  ]);
