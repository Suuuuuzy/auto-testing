(global.webpackJsonp = global.webpackJsonp || []).push([
  ["pages/car_manager_add/car_manager_add"],
  {
    "1d53": function (t, n, a) {
      (function (t) {
        function n(t) {
          return t && t.__esModule ? t : { default: t };
        }
        a("f567"), n(a("66fd")), t(n(a("2693")).default);
      }).call(this, a("543d").createPage);
    },
    2693: function (t, n, a) {
      a.r(n);
      var e = a("8796"),
        i = a("8624");
      for (var o in i)
        "default" !== o &&
          (function (t) {
            a.d(n, t, function () {
              return i[t];
            });
          })(o);
      a("ab16");
      var d = a("f0c5"),
        r = Object(d.a)(
          i.default,
          e.b,
          e.c,
          !1,
          null,
          null,
          null,
          !1,
          e.a,
          void 0
        );
      n.default = r.exports;
    },
    8624: function (t, n, a) {
      a.r(n);
      var e = a("ab00"),
        i = a.n(e);
      for (var o in e)
        "default" !== o &&
          (function (t) {
            a.d(n, t, function () {
              return e[t];
            });
          })(o);
      n.default = i.a;
    },
    8796: function (t, n, a) {
      a.d(n, "b", function () {
        return e;
      }),
        a.d(n, "c", function () {
          return i;
        }),
        a.d(n, "a", function () {});
      var e = function () {
          var t = this;
          t.$createElement;
          t._self._c;
        },
        i = [];
    },
    ab00: function (t, n, a) {
      (function (t) {
        Object.defineProperty(n, "__esModule", { value: !0 }),
          (n.default = void 0);
        var a = {
          data: function () {
            return {
              page_data: void 0,
              plateNo: void 0,
              vinNo: "",
              engineNo: "",
              isAutoDoor: !1,
              brandList: [],
              brand_1: "",
              brand_2: "",
              brand_3: "",
              currentBrand: 1,
              showBrandView: !1,
              is_edit: !1,
            };
          },
          onLoad: function (n) {
            this.page_data = this._pData;
            var a = "";
            this.page_data.operate_type === this.$operate_edit
              ? ((a = "编辑车辆"), (this.is_edit = !0))
              : (a = "新增车辆"),
              t.setNavigationBarTitle({ title: a });
          },
          onReady: function () {
            var n = this;
            this.is_edit &&
              this.$api51.api51_car_info(
                this.page_data.carId,
                function (t, a) {
                  (n.plateNo = t[0].plateNo),
                    (n.vinNo = t[0].vinNo),
                    (n.engineNo = t[0].engineNo),
                    (n.isAutoDoor = t[0].isAutoDoor),
                    (n.brand_1 = {
                      name: t[0].brandName,
                      brandModelId: t[0].brandId,
                    }),
                    (n.brand_2 = {
                      name: t[0].seriesName,
                      brandModelId: t[0].seriesId,
                    }),
                    (n.brand_3 = {
                      name: t[0].brandModelName,
                      brandModelId: t[0].brandModelId,
                    });
                },
                function (n, a) {
                  t.showToast({ title: n + a, icon: "none" }),
                    t.navigateBack({});
                }
              );
          },
          methods: {
            select_car_pp: function () {
              (this.currentBrand = 1), this.get_brand_list(0);
            },
            select_car_cx: function () {
              var n = this.brand_1;
              "" == n
                ? t.showModal({
                    title: "提示",
                    content: "请先选择车辆品牌",
                    showCancel: !1,
                    success: function (t) {},
                  })
                : ((this.currentBrand = 2),
                  this.get_brand_list(n.brandModelId));
            },
            select_car_model: function () {
              var n = this.brand_2;
              "" == n
                ? t.showModal({
                    title: "提示",
                    content: "请先选择车系",
                    showCancel: !1,
                    success: function (t) {},
                  })
                : ((this.currentBrand = 3),
                  this.get_brand_list(n.brandModelId));
            },
            get_brand_list: function (n) {
              var a = this;
              this.$api51.api51_brand_model_list(
                n,
                function (t, n) {
                  (a.brandList = t), (a.showBrandView = !0);
                },
                function (n, a) {
                  t.showToast({ title: a + ":" + n, icon: "none" });
                }
              );
            },
            confirm_sel_brandFun: function (n) {
              if (void 0 != this.plateNo && "" != this.plateNo)
                if ("" != this.brand_3) {
                  var a = "";
                  void 0 != this.page_data &&
                    this.page_data.operate_type == this.$operate_edit &&
                    (a = this.page_data.carId),
                    this.$api51.api51_add_or_update_car(
                      a,
                      this.plateNo,
                      this.brand_3.brandModelId,
                      this.vinNo,
                      this.engineNo,
                      !1,
                      function (n, a) {
                        t.$emit("update_car_list", {}),
                          t.showToast({ title: a, icon: "success" }),
                          t.navigateBack({});
                      },
                      function (n, a) {
                        t.showToast({ title: a + ":" + n, icon: "none" });
                      }
                    );
                } else
                  t.showToast({ title: "请选择车辆品牌、车型", icon: "none" });
              else t.showToast({ title: "请输入车牌号码", icon: "none" });
            },
            select_brand: function (t) {
              var n = t.currentTarget.dataset.value,
                a = this.currentBrand;
              console.log("select_brand:" + JSON.stringify(t)),
                1 == a
                  ? ((this.brand_1 = n),
                    (this.brand_2 = ""),
                    (this.brand_3 = ""),
                    (this.showBrandView = !1))
                  : 2 == a
                  ? ((this.brand_2 = n),
                    (this.brand_3 = ""),
                    (this.showBrandView = !1))
                  : ((this.brand_3 = n), (this.showBrandView = !1));
            },
            input_plate_no: function (t) {
              this.plateNo = t.detail.value;
            },
            input_engine_no: function (t) {
              this.engineNo = t.detail.value;
            },
            input_vin_no: function (t) {
              this.vinNo = t.detail.value;
            },
          },
        };
        n.default = a;
      }).call(this, a("543d").default);
    },
    ab16: function (t, n, a) {
      var e = a("e344");
      a.n(e).a;
    },
    e344: function (t, n, a) {},
  },
  [["1d53", "common/runtime", "common/vendor"]],
]);
