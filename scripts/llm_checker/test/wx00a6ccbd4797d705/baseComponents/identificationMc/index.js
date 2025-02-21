(global.webpackJsonp = global.webpackJsonp || []).push([
  ["baseComponents/identificationMc/index"],
  {
    "4bc9": function (t, e, i) {
      "use strict";
      i.r(e);
      var n = i("b530"),
        a = i("cad0");
      for (var o in a)
        ["default"].indexOf(o) < 0 &&
          (function (t) {
            i.d(e, t, function () {
              return a[t];
            });
          })(o);
      i("602b");
      var s = i("f0c5"),
        c = Object(s.a)(
          a.default,
          n.b,
          n.c,
          !1,
          null,
          "0f2673cb",
          null,
          !1,
          n.a,
          void 0
        );
      e.default = c.exports;
    },
    "602b": function (t, e, i) {
      "use strict";
      var n = i("6715");
      i.n(n).a;
    },
    6715: function (t, e, i) {},
    b530: function (t, e, i) {
      "use strict";
      i.d(e, "b", function () {
        return n;
      }),
        i.d(e, "c", function () {
          return a;
        }),
        i.d(e, "a", function () {});
      var n = function () {
          var t = this,
            e =
              (t.$createElement,
              t._self._c,
              t.caninit
                ? t.__map(t.registerShops, function (e, i) {
                    return {
                      $orig: t.__get_orig(e),
                      m0: e.distance ? t.formatDistance(e.distance) : null,
                    };
                  })
                : null);
          t.$mp.data = Object.assign({}, { $root: { l0: e } });
        },
        a = [];
    },
    c72c: function (t, e, i) {
      "use strict";
      var n = i("4ea4");
      Object.defineProperty(e, "__esModule", { value: !0 }),
        (e.default = void 0);
      var a = n(i("9523")),
        o = n(i("2309")),
        s = i("414a"),
        c = {
          name: "identificationMc",
          mixins: [n(i("0a10")).default],
          components: {
            popup: function () {
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
            MescrollUni: function () {
              Promise.all([
                i.e("common/vendor"),
                i.e("baseComponents/mescroll-uni-wrap/index"),
              ])
                .then(
                  function () {
                    return resolve(i("5011"));
                  }.bind(null, i)
                )
                .catch(i.oe);
            },
          },
          props: {
            context: { type: String, default: "SYSTEM" },
            themeColor: { type: String, default: "#ff4e4e" },
            itemTitleStyle: { type: String, default: "" },
            textColor: { type: String, default: "#333" },
            layout: { type: [Number, String], default: 1 },
            locationAuth: { type: Boolean, default: !1 },
          },
          data: function () {
            var t;
            return (
              (t = {
                searchValue: "",
                registerShops: [],
                firstPageData: [],
                registerMcidFlg: 0,
                tempMcName: "请选择认证门店",
                mcName: "",
                tempMcId: "",
                mcId: "",
                show: !1,
                tempMcIndex: -1,
                mcIndex: -1,
              }),
              (0, a.default)(t, "tempMcId", ""),
              (0, a.default)(t, "pageInit", {
                pageCount: 10,
                pageNo: 1,
                total: 0,
              }),
              (0, a.default)(t, "lat", ""),
              (0, a.default)(t, "lng", ""),
              (0, a.default)(t, "upOption", {
                textNoMore: "没有更多记录了",
                page: { pageCount: 10 },
              }),
              (0, a.default)(t, "downOption", { auto: !1 }),
              (0, a.default)(t, "flag", 0),
              (0, a.default)(t, "caninit", !1),
              t
            );
          },
          methods: {
            getMdList: function (t) {
              (this.registerShops = []),
                (this.tempMcName = "请选择认证门店"),
                (this.tempMcIndex = -1),
                (this.tempMcId = ""),
                null != t && (this.pageInit.pageNo = 1),
                (this.flag = 0),
                this.mescroll.resetUpScroll();
            },
            downCallback: function (t) {
              (this.registerShops = []),
                (this.tempMcName = "请选择认证门店"),
                (this.mcName = ""),
                (this.tempMcIndex = -1),
                (this.mcIndex = -1),
                (this.tempMcId = ""),
                (this.pageInit.pageNo = 1),
                t.resetUpScroll(!0);
            },
            upCallback: function (t) {
              var e = this;
              this.firstPageData.length
                ? ((this.registerShops = this.registerShops.concat(
                    this.firstPageData
                  )),
                  (this.firstPageData.length = 0),
                  (this.pageInit.pageNo = 2),
                  t.endBySize(this.registerShops.length, this.pageInit.total))
                : this.getRegisterShopsData().then(function (i) {
                    var n = i.list,
                      a = i.total,
                      o = i.result;
                    (e.registerShops = e.registerShops.concat(n)),
                      t.endBySize(n.length, a),
                      e.pageInit.pageNo++,
                      e.init(o);
                  });
            },
            formatDistance: function (t) {
              return Number(t) > 1e3
                ? (Number(t) / 1e3).toFixed(1) + "km"
                : Number(t).toFixed(1) + "m";
            },
            checkBoxMc: function (t, e) {
              (this.tempMcId = e.mcId),
                (this.tempMcIndex = t),
                (this.tempMcName = e.shopName);
            },
            cancleMc: function () {
              (this.tempMcIndex = this.mcIndex),
                (this.tempMcName = this.mcName),
                (this.tempMcId = this.mcId),
                (this.show = !1);
            },
            setMc: function () {
              this.$emit("selectMcid", this.mcId);
            },
            saveMc: function () {
              (this.mcIndex = this.tempMcIndex),
                (this.mcName = this.tempMcName),
                (this.mcId = this.tempMcId),
                this.setMc(),
                (this.show = !1);
            },
            updateregisterMcidFlg: function (t) {
              t && (this.registerMcidFlg = t);
            },
            init: function (t) {
              t.list.length > 0 &&
                ((this.tempMcName = t.list[0].shopName),
                (this.tempMcId = t.list[0].mcId),
                (this.tempMcIndex = 0),
                -1 === this.mcIndex &&
                  ((this.mcName = t.list[0].shopName),
                  (this.mcId = t.list[0].mcId),
                  (this.mcIndex = 0),
                  this.setMc())),
                this.$emit("complate");
            },
            showRegisterShops: function () {
              var t = this;
              this.locationAuth
                ? (this.show = !0)
                : this.setCertifiedStores().then(function (e) {
                    t.show = !0;
                  });
            },
            getRegisterShopsData: function () {
              var t = this;
              return new Promise(function (e, i) {
                o.default.injection("CD", !1).then(function (i) {
                  o.default
                    .getData({
                      name: "getRegisterShops",
                      params: {
                        longitude: t.lng,
                        latitude: t.lat,
                        pageNo: t.pageInit.pageNo,
                        pageCount: t.pageInit.pageCount,
                        mcId: t.tempMcId,
                        shopName: t.searchValue,
                      },
                      nameSpace: "CD",
                    })
                    .then(function (t) {
                      var i = [],
                        n = 0,
                        a = 0,
                        o = {};
                      200 == t.code &&
                        ((n = (o = JSON.parse(t.content)).total),
                        (i = o.list),
                        (a = o.wechatRegisterShopMode)),
                        e({
                          list: i,
                          total: n,
                          wechatRegisterShopMode: a,
                          result: o,
                        });
                    });
                });
              });
            },
            searchRegisterShopMode: function () {
              var t = this;
              this.getRegisterShopsData().then(function (e) {
                var i = e.list,
                  n = e.total,
                  a = e.wechatRegisterShopMode,
                  o = e.result;
                (t.firstPageData = i),
                  t.updateregisterMcidFlg(a),
                  (t.caninit = !0),
                  t.init(o),
                  (t.pageInit.total = n);
              });
            },
            setCertifiedStores: function () {
              var t = this,
                e = this;
              return (0, s._getLocation)()
                .then(
                  function (i) {
                    (i[1] === t.lat && i[0] === t.lng) ||
                      ((t.lat = i[1]),
                      (t.lng = i[0]),
                      e.searchRegisterShopMode());
                  },
                  function (t) {
                    console.log("拒绝地理定位授权获取门店"),
                      e.searchRegisterShopMode();
                  }
                )
                .catch(function () {});
            },
          },
          created: function () {
            this.locationAuth && this.setCertifiedStores();
          },
        };
      e.default = c;
    },
    cad0: function (t, e, i) {
      "use strict";
      i.r(e);
      var n = i("c72c"),
        a = i.n(n);
      for (var o in n)
        ["default"].indexOf(o) < 0 &&
          (function (t) {
            i.d(e, t, function () {
              return n[t];
            });
          })(o);
      e.default = a.a;
    },
  },
]),
  (global.webpackJsonp = global.webpackJsonp || []).push([
    "baseComponents/identificationMc/index-create-component",
    {
      "baseComponents/identificationMc/index-create-component": function (
        t,
        e,
        i
      ) {
        i("543d").createComponent(i("4bc9"));
      },
    },
    [["baseComponents/identificationMc/index-create-component"]],
  ]);
