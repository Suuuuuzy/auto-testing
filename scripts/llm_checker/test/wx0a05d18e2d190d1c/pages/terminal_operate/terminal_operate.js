(global.webpackJsonp = global.webpackJsonp || []).push([
  ["pages/terminal_operate/terminal_operate"],
  {
    2207: function (t, i, e) {},
    3304: function (t, i, e) {
      e.r(i);
      var n = e("a4d8"),
        a = e("ab8f");
      for (var o in a)
        "default" !== o &&
          (function (t) {
            e.d(i, t, function () {
              return a[t];
            });
          })(o);
      e("411c");
      var s = e("f0c5"),
        u = Object(s.a)(
          a.default,
          n.b,
          n.c,
          !1,
          null,
          null,
          null,
          !1,
          n.a,
          void 0
        );
      i.default = u.exports;
    },
    "411c": function (t, i, e) {
      var n = e("2207");
      e.n(n).a;
    },
    "605c": function (t, i, e) {
      (function (t) {
        Object.defineProperty(i, "__esModule", { value: !0 }),
          (i.default = void 0);
        var e = {
          data: function () {
            return {
              car: "",
              terminal: void 0,
              hint_text: "",
              input_enable: !0,
              input_value: "",
              show_dialog: !1,
              api_url: "",
              api_parm: "",
              input_password: "",
            };
          },
          onLoad: function (i) {
            var e = this._pData;
            this.car = e;
            var n = e.device_type,
              a = "模组未绑定，请先绑定",
              o = "模组操作";
            n == this.$device_ctrl_gps
              ? ((o = "手机控车"),
                void 0 != e.gps &&
                  "" != e.gps &&
                  ((this.terminal = e.gps),
                  (a = "解绑后，将无法通过手机远程控制车辆"),
                  (this.input_enable = !1),
                  (this.input_value = e.gps.gpsId)))
              : n == this.$device_ctrl_ble
              ? ((o = "蓝牙控车"),
                void 0 != e.bluetooth &&
                  "" != e.bluetooth &&
                  ((this.terminal = e.bluetooth),
                  (a = "解绑后，将无法通过蓝牙近距离控制车辆"),
                  (this.input_enable = !1),
                  (this.input_value = e.bluetooth.bluetoothId)))
              : n == this.$device_ctrl_key &&
                ((o = "液晶钥匙"),
                void 0 != e.skey &&
                  ((this.terminal = e.skey),
                  (a = "解绑后，将无法通过液晶钥匙控制车辆"),
                  (this.input_enable = !1),
                  (this.input_value = e.skey.skeyId))),
              (this.hint_text = a),
              t.setNavigationBarTitle({ title: o });
          },
          methods: {
            confirm: function (i) {
              this.car.device_type,
                void 0 == this.terminal
                  ? "" == this.input_value
                    ? t.showToast({ title: "请输入终端号", icon: "none" })
                    : this.submit_operate_api()
                  : (this.show_dialog = !0);
            },
            submit_operate_api: function () {
              var t = this.car.device_type,
                i = void 0 == this.terminal;
              this.$api51.api51_bind_or_unbind_termail(
                i,
                t,
                this.car.carId,
                this.input_value,
                this.operate_success,
                this.opearte_failed
              );
            },
            operate_success: function (i, e) {
              var n = "update_car_list",
                a = 2;
              this.car.device_type == this.$device_ctrl_ble ||
              this.car.device_type == this.$device_ctrl_gps
                ? ((n = "update_car_list"), (a = 2))
                : ((n = "update_terminal_list"), (a = 1)),
                t.$emit(n, {}),
                t.showModal({
                  content: e,
                  showCancel: !1,
                  success: function (i) {
                    t.$emit(n, { msg: "更新列表" }),
                      t.navigateBack({ delta: a });
                  },
                });
            },
            opearte_failed: function (i, e) {
              t.showModal({
                content: e,
                showCancel: !1,
                success: function (t) {},
              });
            },
            dialog_input: function (t) {
              this.input_password = t.detail.value;
            },
            input_terminal: function (t) {
              this.input_value = t.detail.value;
            },
            dialog_cancel: function (t) {
              this.show_dialog = !1;
            },
            dialog_confirm: function (i) {
              var e = this,
                n = { password: this.input_password };
              this.$api51.api51_request(
                "api/User/VerifyPassword",
                "POST",
                null,
                n,
                "提交中",
                function (t, i) {
                  e.submit_operate_api();
                },
                function (i, e) {
                  t.showToast({ title: "密码错误!", icon: "none" });
                }
              );
            },
            click_scan_code: function (i) {
              var e = this;
              t.scanCode({
                success: function (t) {
                  e.input_value = t.result;
                },
                fail: function (t) {},
              });
            },
          },
        };
        i.default = e;
      }).call(this, e("543d").default);
    },
    "8a74": function (t, i, e) {
      (function (t) {
        function i(t) {
          return t && t.__esModule ? t : { default: t };
        }
        e("f567"), i(e("66fd")), t(i(e("3304")).default);
      }).call(this, e("543d").createPage);
    },
    a4d8: function (t, i, e) {
      e.d(i, "b", function () {
        return n;
      }),
        e.d(i, "c", function () {
          return a;
        }),
        e.d(i, "a", function () {});
      var n = function () {
          var t = this;
          t.$createElement;
          t._self._c;
        },
        a = [];
    },
    ab8f: function (t, i, e) {
      e.r(i);
      var n = e("605c"),
        a = e.n(n);
      for (var o in n)
        "default" !== o &&
          (function (t) {
            e.d(i, t, function () {
              return n[t];
            });
          })(o);
      i.default = a.a;
    },
  },
  [["8a74", "common/runtime", "common/vendor"]],
]);
