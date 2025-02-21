(global.webpackJsonp = global.webpackJsonp || []).push([
  ["pages/car_set/car_set"],
  {
    "0348": function (t, i, n) {
      (function (t) {
        Object.defineProperty(i, "__esModule", { value: !0 }),
          (i.default = void 0);
        var e,
          a = {
            components: {
              uniPopup: function () {
                n.e("components/uni-popup")
                  .then(
                    function () {
                      return resolve(n("983c"));
                    }.bind(null, n)
                  )
                  .catch(n.oe);
              },
              empty: function () {
                n.e("components/empty-view")
                  .then(
                    function () {
                      return resolve(n("c064"));
                    }.bind(null, n)
                  )
                  .catch(n.oe);
              },
            },
            onLoad: function (i) {
              (e = this),
                t.setNavigationBarTitle({ title: "车辆设置" }),
                (this.page_data = this._pData);
            },
            onReady: function () {
              this.load_page_data();
            },
            data: function () {
              return {
                gpsAutoLock: !1,
                gpsSwitch: !1,
                gpsVibrateType: 0,
                ignitionValue: "",
                maintainMode: !1,
                vib_type_text: ["高", "中", "低", "关"],
                dhsj_list: void 0,
                dhsj_index: 0,
                select_zdsz: 0,
                select_dhsj: 0,
              };
            },
            methods: {
              load_page_data: function () {
                var t = this;
                this.$api51.api51_option_info(
                  this.page_data.carId,
                  function (i, n) {
                    (t.gpsAutoLock = 1 == i[0].gpsAutoLock),
                      (t.gpsSwitch = i[0].gpsSwitch),
                      (t.gpsVibrateType = i[0].gpsVibrateType),
                      (t.ignitionValue = i[0].ignitionValue),
                      (t.maintainMode = i[0].maintainMode);
                  },
                  function (t, i) {}
                );
              },
              change_gps: function (i) {
                console.log("switch:" + i.detail.value),
                  (this.gpsSwitch = i.detail.value);
                var n = this;
                this.$api51.api51_switch_gps(
                  this.page_data.carId,
                  this.gpsSwitch,
                  function (t, i) {},
                  function (i, e) {
                    t.showToast({ title: e + i, icon: "none" }),
                      (n.gpsSwitch = !n.gpsSwitch);
                  }
                );
              },
              change_maintain: function (i) {
                console.log("switch:" + i.detail.value),
                  (this.maintainMode = i.detail.value);
                var n = this;
                this.$api51.api51_switch_maintain_mode(
                  this.page_data.carId,
                  this.maintainMode,
                  function (t, i) {},
                  function (i, e) {
                    t.showToast({ title: e + i, icon: "none" }),
                      (n.maintainMode = !n.maintainMode);
                  }
                );
              },
              change_auto_lock: function (i) {
                console.log("switch:" + i.detail.value),
                  (e.gpsAutoLock = i.detail.value),
                  this.$api51.api51_switch_auto_lock(
                    this.page_data.carId,
                    this.gpsAutoLock,
                    function (t, i) {},
                    function (i, n) {
                      t.showToast({ title: n + i, icon: "none" }),
                        (e.gpsAutoLock = !e.gpsAutoLock),
                        console.log("autolock:" + e.gpsAutoLock);
                    }
                  );
              },
              click_push: function (t) {
                (this.page_data.device_type = this.$device_ctrl_gps),
                  e.navTo("../push_switch/push_switch", this.page_data);
              },
              click_dhsj: function (i) {
                this.$api51.api51_ignite_value(
                  this.page_data.carId,
                  function (t, i) {
                    for (var n = 0; n < t.length; n++)
                      t[n].text == e.ignitionValue &&
                        ((e.dhsj_index = n), console.log("选中点火时间:" + n));
                    (e.dhsj_list = t), e.$refs.popup_dhsj.open();
                  },
                  function (i, n) {
                    t.showToast({ title: i + n, icon: "none" });
                  }
                );
              },
              click_dsqd: function (t) {},
              click_zdsz: function (t) {
                this.$refs.popup_zdsz.open();
              },
              click_clzy: function (t) {
                e.navTo("../car_change_user/car_change_user", this.page_data);
              },
              click_car_info: function (t) {
                (this.page_data.operate_type = this.$operate_edit),
                  e.navTo("../car_manager_add/car_manager_add", this.page_data);
              },
              click_delete_car: function () {
                var i = this.page_data.isAuthorizeCar,
                  n = this;
                t.showModal({
                  title: "确定删除?",
                  content: "删除后您将无法查看该车辆任何信息",
                  success: function (e) {
                    e.confirm &&
                      n.$api51.api51_car_delete(
                        i ? n.page_data.carAuthorizeId : "",
                        n.page_data.carId,
                        function (i, n) {
                          t.$emit("update_car_list", {}),
                            t.showToast({ title: n }),
                            t.navigateBack({});
                        },
                        function (i, n) {
                          t.showToast({ title: i + n, icon: "none" });
                        }
                      );
                  },
                });
              },
              change_dhsj: function (t) {
                this.select_dhsj = t.detail.value;
              },
              change_zdsz: function (t) {
                this.select_zdsz = t.detail.value;
              },
              cancle_dhsj: function (t) {
                this.$refs.popup_dhsj.close();
              },
              cancel_zdsz: function (t) {
                this.$refs.popup_zdsz.close();
              },
              confirm_dhsj: function (i) {
                var n = this.dhsj_list[this.select_dhsj].text;
                this.$api51.api51_set_ignite_value(
                  this.page_data.carId,
                  this.dhsj_list[this.select_dhsj].value,
                  n,
                  function (i, a) {
                    t.showToast({ title: a, icon: "success" }),
                      e.$refs.popup_dhsj.close(),
                      (e.ignitionValue = n);
                  },
                  function (i, n) {
                    t.showToast({ title: i + n, icon: "none" });
                  }
                );
              },
              cancle_zdsz: function (t) {
                e.$refs.popup_zdsz.close();
              },
              confirm_zdsz: function (i) {
                var n = this.select_zdsz;
                this.$api51.api51_set_vibrate(
                  this.page_data.carId,
                  n,
                  function (i, a) {
                    t.showToast({ title: a, icon: "success" }),
                      e.$refs.popup_zdsz.close(),
                      (e.gpsVibrateType = n);
                  },
                  function (i, n) {
                    t.showToast({ title: i + n, icon: "none" });
                  }
                );
              },
            },
          };
        i.default = a;
      }).call(this, n("543d").default);
    },
    "0bb3": function (t, i, n) {
      var e = n("795f");
      n.n(e).a;
    },
    "795f": function (t, i, n) {},
    "8d2d": function (t, i, n) {
      n.d(i, "b", function () {
        return a;
      }),
        n.d(i, "c", function () {
          return o;
        }),
        n.d(i, "a", function () {
          return e;
        });
      var e = {
          uniPopup: function () {
            return Promise.all([
              n.e("common/vendor"),
              n.e("components/uni-popup/uni-popup"),
            ]).then(n.bind(null, "cb66"));
          },
        },
        a = function () {
          var t = this;
          t.$createElement;
          t._self._c;
        },
        o = [];
    },
    "9ef3": function (t, i, n) {
      (function (t) {
        function i(t) {
          return t && t.__esModule ? t : { default: t };
        }
        n("f567"), i(n("66fd")), t(i(n("e67d")).default);
      }).call(this, n("543d").createPage);
    },
    e620: function (t, i, n) {
      n.r(i);
      var e = n("0348"),
        a = n.n(e);
      for (var o in e)
        "default" !== o &&
          (function (t) {
            n.d(i, t, function () {
              return e[t];
            });
          })(o);
      i.default = a.a;
    },
    e67d: function (t, i, n) {
      n.r(i);
      var e = n("8d2d"),
        a = n("e620");
      for (var o in a)
        "default" !== o &&
          (function (t) {
            n.d(i, t, function () {
              return a[t];
            });
          })(o);
      n("0bb3");
      var c = n("f0c5"),
        s = Object(c.a)(
          a.default,
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
      i.default = s.exports;
    },
  },
  [["9ef3", "common/runtime", "common/vendor"]],
]);
