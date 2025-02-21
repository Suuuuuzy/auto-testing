(global.webpackJsonp = global.webpackJsonp || []).push([
  ["baseComponents/dishPopups-tc-components-commonPackage/delDishPopup/index"],
  {
    "0886": function (o, t, e) {
      "use strict";
      var i = e("276b");
      e.n(i).a;
    },
    "276b": function (o, t, e) {},
    "524d": function (o, t, e) {
      "use strict";
      (function (o) {
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.default = void 0);
        var i = e("ca00"),
          n = {
            name: "delDishOfTcPop",
            data: function () {
              return {
                showPopup: !1,
                maxHeight: 0,
                contentHeight: 0,
                copyCookGroupList: {},
                curCookGroup: {},
                windowWidth: 0,
                windowHeight: 0,
                copyDishCookMap: {},
                itemName: "",
              };
            },
            props: {
              dishCookMap: {},
              mapKey: { default: "" },
              grpId: { default: "" },
              themeColor: {},
              dishBtnSize: {},
              closePosition: {},
              popType: { default: "1" },
            },
            components: {
              wxPopup: function () {
                Promise.all([
                  e.e("common/vendor"),
                  e.e("baseComponents/wxpopup/popup"),
                ])
                  .then(
                    function () {
                      return resolve(e("0387"));
                    }.bind(null, e)
                  )
                  .catch(e.oe);
              },
              addDeBtn: function () {
                Promise.all([
                  e.e("common/vendor"),
                  e.e("baseComponents/addDeBtn/index"),
                ])
                  .then(
                    function () {
                      return resolve(e("cf43"));
                    }.bind(null, e)
                  )
                  .catch(e.oe);
              },
            },
            methods: {
              showCookText: function (o, t) {
                var e = t.cookSchemeMap[o];
                return t.combineFlag
                  ? e
                    ? t.realUnName + "、" + e
                    : t.realUnName
                  : e || "";
              },
              setCopyCookGroupList: function (o) {
                (this.copyDishCookMap = (0, i.deepCopyObj)(o)),
                  (this.copyCookGroupList = this.copyDishCookMap[this.grpId]),
                  (this.curCookGroup =
                    this.copyCookGroupList.itemList[this.mapKey]);
              },
              showPopupFun: function () {
                var o = this;
                (this.copyDishCookMap = {}),
                  (this.copyCookGroupList = {}),
                  (this.curCookGroup = {}),
                  this.setCopyCookGroupList(this.dishCookMap),
                  this.$nextTick(function () {
                    o.showPopup = !0;
                  }),
                  this.$emit("handleVideo", !1);
              },
              hidePopup: function () {
                (this.showPopup = !1), this.$emit("handleVideo", !0);
              },
              changePreCook: function (o, t) {
                this.$emit("changePreCook", {
                  mapKey: t.mapKey,
                  grpId: this.grpId,
                  cookStr: o,
                  itemNum: t.cookNumMap[o],
                });
              },
              remove: function (t, e) {
                var i = this.getCurDishCount(e.cookNumMap);
                if ("1" == e.isSel && i <= 1)
                  o.showToast({ icon: "none", title: "此项必选" });
                else {
                  var n = 1;
                  "1" == e.isSel && i <= 2 && (n = i - n);
                  var s = +(e.cookNumMap[t] - n).toFixed(2);
                  this.$set(e.cookNumMap, t, s > 0 ? s : 0),
                    (this.copyDishCookMap[this.grpId].itemList[e.mapKey] = e),
                    this.$emit("updateDishState", {
                      mapKey: e.mapKey,
                      grpId: this.grpId,
                      dishCookMap: this.copyDishCookMap,
                      count: this.getCurDishCount(e.cookNumMap),
                    }),
                    this.itemsNum <= 0 && this.hidePopup();
                }
              },
              add: function (t, e) {
                if (
                  null !== e.xdCount_ &&
                  e.xdCount_ >= 0 &&
                  e.cookNumMap[t] >= e.xdCount_
                )
                  o.showToast({
                    icon: "none",
                    title: e.useLimit
                      ? ""
                          .concat(e.itemName, "仅剩")
                          .concat(e.xdCount_, "份啦~")
                      : "最多可选".concat(e.xdCount_, "份"),
                  });
                else if (
                  this.copyCookGroupList.selTotalNum >=
                  this.copyCookGroupList.itemMaxSel
                )
                  o.showToast({
                    icon: "none",
                    title: "当前组最多可选".concat(
                      this.copyCookGroupList.itemMaxSel,
                      "份"
                    ),
                  });
                else {
                  var i = 1;
                  "1" == e.isSel &&
                    this.getCurDishCount(e.cookNumMap) + 1 >
                      this.copyCookGroupList.itemMaxSel &&
                    (i =
                      this.copyCookGroupList.itemMaxSel -
                      this.getCurDishCount(e.cookNumMap));
                  var n = +(e.cookNumMap[t] + i).toFixed(2);
                  this.$set(e.cookNumMap, t, n),
                    this.$emit("updateDishState", {
                      mapKey: e.mapKey,
                      grpId: this.grpId,
                      dishCookMap: this.copyDishCookMap,
                      count: this.getCurDishCount(e.cookNumMap),
                    });
                }
              },
              getCurDishCount: function (o) {
                var t = 0;
                for (var e in o) t += o[e];
                return t;
              },
              getNumber: function (o) {
                console.log(o);
              },
              shift: function (o) {},
              getBtnStyle: function (o) {
                return o
                  ? {
                      backgroundColor: this.themeColor,
                      color: "#FFFFFF",
                      borderColor: this.themeColor,
                    }
                  : {};
              },
            },
            computed: {
              itemListData: function () {
                var o,
                  t = this;
                return null !== (o = this.copyCookGroupList) &&
                  void 0 !== o &&
                  o.itemList &&
                  this.mapKeyList.length
                  ? this.mapKeyList.map(function (o) {
                      return t.copyCookGroupList.itemList[o];
                    })
                  : [];
              },
              mapKeyList: function () {
                var o;
                if (
                  !this.copyCookGroupList.itemCombineMap ||
                  null === (o = this.curCookGroup) ||
                  void 0 === o ||
                  !o.combineFlag
                )
                  return this.mapKey ? [this.mapKey] : [];
                var t = "";
                this.mapKey && (t = this.mapKey.split("_")[0]);
                var e = this.copyCookGroupList.itemCombineMap[t];
                return null != e && e.length
                  ? e.map(function (o) {
                      return "".concat(t, "_").concat(o);
                    })
                  : void 0;
              },
              itemsNum: function () {
                var o = 0,
                  t = "";
                this.mapKey && (t = this.mapKey.split("_")[0]);
                var e = function (t) {
                  if (t) for (var e in t) o += t[e];
                };
                if (this.curCookGroup && this.curCookGroup.cookNumMap && t)
                  if (
                    this.curCookGroup.combineFlag &&
                    this.mapKeyList.length &&
                    this.copyCookGroupList.itemList
                  ) {
                    var i = this.copyCookGroupList.itemList;
                    this.mapKeyList.forEach(function (o) {
                      var t = i[o].cookNumMap;
                      e(t);
                    });
                  } else {
                    var n = this.curCookGroup.cookNumMap;
                    e(n);
                  }
                return o;
              },
            },
            mounted: function () {
              (this.windowWidth = (0, i.getSystemInfoSync)().windowWidth),
                (this.windowHeight = (0, i.getSystemInfoSync)().windowHeight),
                (this.maxHeight =
                  0.65 * (0, i.getSystemInfoSync)().windowHeight),
                (this.contentHeight =
                  (0, i.getSystemInfoSync)().windowHeight - 210);
            },
            watch: {
              dishCookMap: {
                handler: function (o) {
                  var t;
                  null != o &&
                    null !== (t = o[this.grpId]) &&
                    void 0 !== t &&
                    t.itemList &&
                    this.setCopyCookGroupList(o);
                },
                deep: !0,
              },
            },
          };
        t.default = n;
      }).call(this, e("543d").default);
    },
    "8cdf": function (o, t, e) {
      "use strict";
      e.r(t);
      var i = e("524d"),
        n = e.n(i);
      for (var s in i)
        ["default"].indexOf(s) < 0 &&
          (function (o) {
            e.d(t, o, function () {
              return i[o];
            });
          })(s);
      t.default = n.a;
    },
    c120: function (o, t, e) {
      "use strict";
      e.d(t, "b", function () {
        return i;
      }),
        e.d(t, "c", function () {
          return n;
        }),
        e.d(t, "a", function () {});
      var i = function () {
          var o = this,
            t =
              (o.$createElement,
              o._self._c,
              o.showPopup && o.itemListData.length
                ? o.__map(o.itemListData, function (t, e) {
                    return {
                      $orig: o.__get_orig(t),
                      l0: o.__map(t.orderSequence, function (e, i) {
                        return {
                          $orig: o.__get_orig(e),
                          m0:
                            t.cookNumMap[e] > 0 &&
                            (t.cookSchemeMap[e] || t.combineFlag)
                              ? o.showCookText(e, t)
                              : null,
                          s0:
                            t.cookNumMap[e] > 0 && t.hasCookStyle
                              ? o.__get_style([
                                  o.getBtnStyle(
                                    t.showAddCookBtn && t.defaultStrForBtn == e
                                  ),
                                ])
                              : null,
                          a0:
                            t.cookNumMap[e] > 0
                              ? {
                                  themeColor: o.themeColor,
                                  size: o.dishBtnSize.size || 24,
                                  inputSize: 26,
                                }
                              : null,
                        };
                      }),
                    };
                  })
                : null);
          o.$mp.data = Object.assign({}, { $root: { l1: t } });
        },
        n = [];
    },
    d5a8: function (o, t, e) {
      "use strict";
      e.r(t);
      var i = e("c120"),
        n = e("8cdf");
      for (var s in n)
        ["default"].indexOf(s) < 0 &&
          (function (o) {
            e.d(t, o, function () {
              return n[o];
            });
          })(s);
      e("0886");
      var p = e("f0c5"),
        u = Object(p.a)(
          n.default,
          i.b,
          i.c,
          !1,
          null,
          "fe3365a0",
          null,
          !1,
          i.a,
          void 0
        );
      t.default = u.exports;
    },
  },
]),
  (global.webpackJsonp = global.webpackJsonp || []).push([
    "baseComponents/dishPopups-tc-components-commonPackage/delDishPopup/index-create-component",
    {
      "baseComponents/dishPopups-tc-components-commonPackage/delDishPopup/index-create-component":
        function (o, t, e) {
          e("543d").createComponent(e("d5a8"));
        },
    },
    [
      [
        "baseComponents/dishPopups-tc-components-commonPackage/delDishPopup/index-create-component",
      ],
    ],
  ]);
