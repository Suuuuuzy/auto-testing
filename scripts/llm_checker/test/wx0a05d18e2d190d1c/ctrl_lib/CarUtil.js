function e(e) {
  return e && e.__esModule ? e : { default: e };
}
function t(e) {
  ke && console.log(e);
}
function i(e) {
  return new Date().getTime() - Be < 1e3
    ? -1
    : ((Be = new Date().getTime()),
      Fe
        ? (console.log("模拟控制..:"), 100)
        : n()
        ? (o(), -1)
        : ie.default.isLogin()
        ? (t("check_control_enable...3"),
          a() || u()
            ? !a() && u() && g(!0)
              ? -1
              : f(e)
              ? a() || !u() || s()
                ? !a() && u() && s() && g(!0)
                  ? -1
                  : !a() && u() && s() && !g(!1)
                  ? 1
                  : a() && h()
                  ? 2
                  : !a() || h() || u()
                  ? a() && !h() && u() && g(!0)
                    ? -1
                    : a() && !h() && u() && !g(!1) && s()
                    ? 1
                    : !a() || h() || !u() || g(!1) || s()
                    ? -1
                    : (c(e), -1)
                  : (c(e), -1)
                : (c(e), -1)
              : (l(e), -1)
            : (v(), -1))
        : -1);
}
function n() {
  return void 0 == r();
}
function o() {
  void 0 != X
    ? X()
    : wx.showModal({
        title: "提示",
        content: "您还没有添加任何车辆",
        showCancel: !0,
        cancelText: "取消",
        cancelColor: "#000000",
        confirmText: "添加",
        confirmColor: "#3CC51F",
        success: function (e) {
          e.confirm && t("如需自定义，请设置on_empty_car_listener");
        },
      });
}
function r() {
  return ie.default.getCurrentCar();
}
function a() {
  return void 0 != r().bluetooth;
}
function s() {
  return void 0 != P && P.isOnline;
}
function c(e) {
  wx.showModal({
    content: "车辆不在线,是否使用蓝牙控制?",
    cancelText: "取消",
    confirmText: "连接蓝牙",
    success: function (t) {
      t.confirm && (a() ? m(e) : d());
    },
  });
}
function u() {
  return void 0 != r().gps;
}
function f(e) {
  if (void 0 != r().gps) {
    var t = r().gps.functionIds;
    if (t && t.length > 2) {
      if (e == ce) return -1 != t.search("8");
      if (e == ue) return -1 != t.search("9");
      if (e == le) return -1 != t.search("10");
      if (e == ae) return -1 != t.search("11");
      if (e == se) return -1 != t.search("12");
      if (e == fe) return -1 != t.search("13");
    }
  }
  return !0;
}
function l(e) {
  if (z) return z(e);
  wx.showModal({
    title: "提示",
    content: "当前产品不支持该操作，如有需要功能升级，请联系服经销商",
    showCancel: !0,
    cancelText: "取消",
    cancelColor: "#000000",
    confirmText: "确认",
    success: function (e) {
      e.confirm && t("如需自定义");
    },
  });
}
function d() {
  void 0 != Z
    ? Z()
    : wx.showModal({
        content:
          "您还没有绑定蓝牙设备(请联系经销商升级蓝牙控车功能。如需要帮助请联系客服热线：4009988551)",
        cancelText: "去绑定",
        confirmText: "确定",
        success: function (e) {
          t("如果要监听，调用：set_on_unbind_ble_listener设置");
        },
      });
}
function v() {
  void 0 != $
    ? $()
    : wx.showModal({
        title: "提示",
        content: "当前车辆未绑定模组，去绑定?",
        showCancel: !0,
        cancelText: "取消",
        cancelColor: "#000000",
        confirmText: "绑定",
        confirmColor: "#3CC51F",
        success: function (e) {
          e.confirm;
        },
        fail: function (e) {
          t("fail:" + JSON.stringify(e));
        },
        complete: function () {},
      });
}
function g(e) {
  var i = r();
  if (void 0 != i) {
    var n = i.serviceExpireTime + ":00";
    t("temp..." + n);
    var o = ne.default.str2Date(n).getTime() - new Date().getTime();
    if (o < 0) {
      if (e) {
        var a =
          "车辆服务已过期" + Math.ceil(Math.abs(o) / 1e3 / 60 / 60 / 24) + "天";
        void 0 != Q
          ? Q(i, a)
          : wx.showModal({
              content: a,
              confirmText: "去充值",
              success: function (e) {
                e.confirm &&
                  t("如果要设置跳转，请设置监听:set_on_outservice_listener");
              },
            });
      }
      return !0;
    }
  }
  return !1;
}
function h() {
  return De;
}
function w(e, t) {
  if (Ie)
    if (De && Me)
      clearTimeout(G),
        (G = setTimeout(function () {
          w(e, t);
        }, be));
    else {
      var i = r();
      if (void 0 == i)
        (P = void 0),
          e(void 0, ""),
          clearTimeout(G),
          (G = setTimeout(function () {
            w(e, t);
          }, be));
      else {
        var n = "api/Car/GetGpsData/" + i.carId;
        te.default.getRequestBase(
          n,
          function (n, o) {
            (n[0].plateNo = i.plateNo),
              (P = n[0]),
              e(n, o),
              clearTimeout(G),
              (G = setTimeout(function () {
                w(e, t);
              }, be));
          },
          function (i, n) {
            P && (P.isOnline = !1),
              t(i, n),
              clearTimeout(G),
              (G = setTimeout(function () {
                w(e, t);
              }, be));
          }
        );
      }
    }
}
function p() {
  var e = { carId: P.carId };
  te.default.postRequestLoadingParams(
    "api/Car/Control/Tailbox",
    e,
    "执行中...",
    function (e, t) {
      oe.default.play(P.isTailbox ? "304" : "305"), wx.showToast({ title: t });
    },
    function (e, t) {
      wx.showModal({ title: "提示", content: t });
    }
  );
}
function x() {
  if (ie.default.isLogin()) {
    if (a()) {
      if (!u() || !g(!0)) return !0;
    } else d();
    return !1;
  }
}
function m(e) {
  x && y(e);
}
function y(e) {
  r().bluetooth;
  t("BLE扫描开始..."),
    wx.showLoading({ title: "扫描中..." }),
    Ee ||
      ((Te = new Array()),
      (Ee = !0),
      wx.openBluetoothAdapter({
        success: function (i) {
          wx.startBluetoothDevicesDiscovery({
            success: function (i) {
              t("BLE开启扫描成功..."), L(e);
            },
            fail: function (e) {
              t("BLE开启扫描失败..." + JSON.stringify(e)),
                wx.hideLoading(),
                (Ee = !1);
            },
          });
        },
        fail: function (e) {
          console.log("ble:" + JSON.stringify(e)), (Ee = !1), wx.hideLoading();
          var t = "蓝牙不可用，请打开蓝牙";
          "ios" == Re && (t += "(如果手机蓝牙已开启,请关闭后再打开试试)"),
            wx.showModal({ title: "提示", content: t, showCancel: !1 });
        },
      }));
}
function L(e) {
  wx.getBluetoothDevices({
    success: function (i) {
      setTimeout(function () {
        (Ee = !1),
          wx.stopBluetoothDevicesDiscovery(),
          t("BLE...扫描完成"),
          wx.hideLoading(),
          wx.getBluetoothDevices({
            success: function (i) {
              Te || (Te = new Array());
              var n = r().bluetooth.macAddress;
              n && (n = n.replace(/:/g, "").toUpperCase()),
                console.log("target:" + n);
              for (var o in i.devices) {
                var a = i.devices[o];
                "" != a.name &&
                  "未知设备" != a.name &&
                  ((a._mac = _(a).toUpperCase()),
                  a._mac && n == a._mac.replace(/:/g, "").toUpperCase()
                    ? ((a._target = !0),
                      console.log("target:" + JSON.stringify(a)),
                      Te.unshift(a))
                    : Te.push(a));
              }
              if ((t("BLE...指定设备连接命令:" + e), "" == e || void 0 == e))
                void 0 != V && V(Te);
              else {
                var s = !1;
                for (var c in Te) {
                  var u = Te[c];
                  if (u._target) {
                    t("BLE...找到指定设备:" + e), (s = !0), C(u.deviceId, e);
                    break;
                  }
                }
                s ||
                  wx.showModal({ content: "未找到指定设备", showCancel: !1 });
              }
            },
          });
      }, 3e3);
    },
    fail: function (e) {
      (Ee = !1), wx.hideLoading(), wx.stopBluetoothDevicesDiscovery();
    },
  });
}
function _(e) {
  var t = "";
  return (
    "ios" == Re
      ? void 0 != e.advertisData
        ? (t = re.default.bytes2HexString(
            new Uint8Array(e.advertisData.slice(2, 10))
          )).length > 12 && (t = t.substring(t.length - 12, t.length))
        : (t = "")
      : (t = e.deviceId),
    t
  );
}
function C(e, t) {
  (Se = t),
    wx.showLoading({ title: "连接蓝牙中..." }),
    wx.getConnectedBluetoothDevices({
      services: [ye],
      success: function (i) {
        i.devices != [] || void 0 != i.devices ? B(e, t) : wx.hideLoading();
      },
    });
}
function B(e, i) {
  (W = e),
    wx.createBLEConnection({
      deviceId: W,
      success: function (e) {
        t("BLE连接成功..."),
          wx.hideLoading(),
          wx.getBLEDeviceServices({
            deviceId: W,
            success: function (e) {
              var i = e.services;
              t("BLE发现服务..." + JSON.stringify(e.services));
              var n;
              for (var o in i) {
                var r = i[o];
                if (r.uuid.toUpperCase() == ye.toUpperCase()) {
                  (n = r), t("BLE发现服务...");
                  break;
                }
              }
              void 0 != n &&
                wx.getBLEDeviceCharacteristics({
                  deviceId: W,
                  serviceId: n.uuid,
                  success: function (e) {
                    t("BLE发现服务的Charact..2." + JSON.stringify(e)), b(), N();
                  },
                  fail: function (e) {
                    t("BLE 打开notify失败"), H();
                  },
                });
            },
            fail: function (e) {
              t("BLE发现服务失败..." + JSON.stringify(e)),
                wx.showModal({ title: "提示", content: "连接失败,请重试!" });
            },
          });
      },
      fail: function (e) {
        -1 != e.errCode &&
          (t("BLE连接失败...:" + JSON.stringify(e)),
          wx.hideLoading(),
          wx.showModal({
            title: "提示",
            content: "连接失败:" + e.errCode + "(靠近试试)",
          }));
      },
    });
}
function b() {
  wx.onBLECharacteristicValueChange(function (e) {
    var i = new Uint8Array(e.value);
    if (
      (t("BLE：读取到数据:", re.default.bytes2HexString(i)),
      e.characteristicId.toUpperCase() == Le)
    ) {
      for (
        var n = i,
          o = r().bluetooth.passkey,
          a = re.default.hexString2Bytes(o),
          s = new ArrayBuffer(12),
          c = new Uint8Array(s),
          u = 0;
        u < 6;
        u++
      )
        c[3 + u] = a[u] ^ n[u] ^ 255;
      (c[0] = 36),
        (c[1] = 16),
        (c[2] = 8),
        (c[9] = 0),
        (c[10] = 0),
        (c[11] = 36),
        t(
          "BLE 随机数:" +
            re.default.bytes2HexString(n) +
            " key:" +
            o +
            " 加密后:" +
            re.default.bytes2HexString(c)
        ),
        setTimeout(function () {
          t("BLE 写入随机数"), O(c.buffer);
        }, 200),
        setTimeout(function () {
          D();
        }, 1e3),
        "" != Se &&
          setTimeout(function () {
            t("BLE 下发CMD"), E(Se), (Se = "");
          }, 1500);
    } else {
      var f = re.default.bytes2HexString(i);
      t("BLE：读取到数据HEX:", f);
      var l = i[0];
      if (1 == l) void 0 != K && K(l, T(i));
      else if (2 == l) {
        var d = 255 * i[2] + i[3];
        void 0 != K && K(l, d);
      } else if (3 == l) void 0 != K && K(l, T(i));
      else if (4 == l) void 0 != K && K(l, T(i));
      else if (5 == l) void 0 != K && K(l, T(i));
      else if (6 == l) void 0 != K && K(l, T(i));
      else if (f.startsWith("241508")) {
        if (void 0 != K) {
          var v = "00000000" + i[3].toString(2),
            g = v.substring(v.length - 8),
            h = "1" == g[1],
            w = "1" == g[2],
            p = "1" == g[3],
            x = "1" == g[4],
            m = "1" == g[5],
            y = "1" == g[6];
          K(7, [h, w, p, x, m, y]);
        }
      } else if (
        (t("接收数据:" + re.default.bytes2HexString(i)),
        12 == i.length && 36 == l)
      ) {
        var L = re.default.getBytesBooleanArray(i),
          _ = {};
        (_.isEngine = L[19]),
          (_.isFrontLamp = L[6]),
          (_.isLeftFrontDoor = L[11]),
          (_.isLeftRearDoor = L[9]),
          (_.isLock = L[5] || L[24]),
          (_.isRightFrontDoor = L[10]),
          (_.isRightRearDoor = L[8]),
          (_.isTailbox = L[1]),
          void 0 != P
            ? ((P.isEngine = L[19]),
              (P.isFrontLamp = L[6]),
              (P.isLeftFrontDoor = L[11]),
              (P.isLeftRearDoor = L[9]),
              (P.isLock = L[5] || L[24]),
              (P.isRightFrontDoor = L[10]),
              (P.isRightRearDoor = L[8]),
              (P.isTailbox = L[1]))
            : (P = _),
          void 0 != j && j(_);
      } else if (i.length >= 8 && 33 == l && 8 == i[1]) {
        var C = re.default.parseAW(i);
        void 0 != P
          ? ((P.isEngine = C.isEngine),
            (P.isFrontLamp = C.isFrontLamp),
            (P.isLeftFrontDoor = C.isLeftFrontDoor),
            (P.isLeftRearDoor = C.isLeftRearDoor),
            (P.isLock = C.isLock),
            (P.isRightFrontDoor = C.isRightFrontDoor),
            (P.isRightRearDoor = C.isRightRearDoor),
            (P.isTailbox = C.isTailbox))
          : (P = C),
          void 0 != j && j(C);
      }
    }
  });
}
function T(e) {
  if (0 == e[1])
    return wx.showModal({ content: "还未设置该参数", showCancel: !1 }), "";
  for (var t = "", i = 2; i < e[1] + 2; i++) t += String.fromCharCode(e[i]);
  return t;
}
function D() {
  wx.notifyBLECharacteristicValueChange({
    deviceId: W,
    serviceId: ye,
    characteristicId: Ce,
    state: !0,
    success: function (e) {
      t("BLE 打开notify"), S();
    },
    fail: function (e) {
      H(), t("BLE 打开notify失败:" + JSON.stringify(e));
    },
  }),
    "" != Se &&
      setTimeout(function () {
        O(re.default.hexString2BytesBuffer(Se)), (Se = "");
      }, 1300);
}
function S() {
  for (var e = "", i = 0; i < Te.length; i++) {
    var n = Te[i];
    n.deviceId == W && (e = n._mac);
  }
  if (e) {
    var o = { bluetoothId: r().bluetooth.bluetoothId, macAddress: e };
    te.default.postRequestParams(
      "api/Car/ChangeBtMacAddress",
      o,
      function () {},
      function () {}
    );
  } else t("mac:空");
}
function E(e) {
  var t = r().bluetooth;
  if (t)
    if (e != ae || t.isCanStart) {
      if (F()) {
        var i = I(e),
          n = R(i);
        if ("" != n && void 0 != n) {
          O(re.default.hexString2BytesBuffer(n));
          var o = i;
          setTimeout(function () {
            O(re.default.hexString2BytesBuffer(o));
          }, 300);
        }
      }
      O(re.default.hexString2BytesBuffer(e));
    } else
      wx.showToast({ title: "终端不支持启动，如需升级终端，请咨询经销商！" });
}
function I(e) {
  if ("" != e || void 0 != e) {
    var t = k();
    if (e == ce) return t[0];
    if (e == ue) return t[1];
    if (e == ae) return t[2];
    if (e == se) return t[3];
    if (e == fe) return t[4];
    if (e == le) return t[5];
  }
  return e;
}
function R(e) {
  if ("" != e || null != e || void 0 != e) {
    var t = k();
    if (null != t) return t[6];
  }
  return "";
}
function k() {
  if (0 != M()) {
    var e = U();
    if ("" != e && void 0 != e) {
      var t = r().bluetooth.passkey + "000000000000000";
      return A(t.substr(0, 16), t.substr(0, 16), e);
    }
  }
  return null;
}
function M() {
  var e = r().bluetooth;
  return void 0 != e ? e.controlBoxId : 0;
}
function F() {
  return 0 != M();
}
function U() {
  var e = r().bluetooth;
  return void 0 != e ? e.command : "";
}
function A(e, t, i) {
  var n = Ue.enc.Utf8.parse(e),
    o = Ue.enc.Utf8.parse(t),
    r = Ue.AES.decrypt(i, n, {
      iv: o,
      mode: Ue.mode.CBC,
      padding: Ue.pad.Pkcs7,
    })
      .toString(Ue.enc.Utf8)
      .toString()
      .split(",");
  return 7 == r.length ? r : null;
}
function O(e) {
  t(
    "writeData:" +
      re.default.bytes2HexString(Array.prototype.slice.call(new Uint8Array(e)))
  ),
    wx.writeBLECharacteristicValue({
      deviceId: W,
      serviceId: ye,
      characteristicId: _e,
      value: e,
      success: function (t) {
        var i = re.default.bytes2HexString(
          Array.prototype.slice.call(new Uint8Array(e))
        );
        if ("1" != wx.getStorageSync("key_51api_show_ble_cmd_toast")) {
          var n = "";
          i == ae
            ? (n = "启动命令已下发")
            : i == se
            ? (n = "熄火命令已下发")
            : i == ce
            ? (n = "解锁命令已下发")
            : i == ue
            ? (n = "锁车命令已下发")
            : i == le
            ? (n = "寻车命令已下发")
            : i == fe && (n = "尾箱开启/关闭命令已下发"),
            "" != n && wx.showToast({ title: n });
        }
      },
      fail: function (e) {
        t("BLE 发送数据失败:" + JSON.stringify(e));
      },
    });
}
function N() {
  wx.readBLECharacteristicValue({
    deviceId: W,
    serviceId: ye,
    characteristicId: Le,
    success: function (e) {
      t("BLE读取随机数..." + JSON.stringify(e));
    },
    fail: function (e) {
      H(), t("BLE读取随机数:fail:" + JSON.stringify(e));
    },
  });
}
function q(e, i) {
  var n = new Array();
  for (var o in e) n.push(e[o].charCodeAt(0));
  t(n);
  var r = n.length;
  return n.unshift(r), n.unshift(i), re.default.bytes2HexString(n);
}
function H() {
  wx.closeBLEConnection({ deviceId: W });
}
function J() {
  Fe &&
    (ee && ee(Ae),
    setTimeout(function () {
      J();
    }, 3e3));
}
var P,
  G,
  V,
  j,
  W,
  K,
  X,
  z,
  Q,
  Y,
  Z,
  $,
  ee,
  te = e(require("./NetWorkUtil.js")),
  ie = e(require("./UserOperate")),
  ne = e(require("./DateUtil")),
  oe = e(require("./voice_util")),
  re = e(require("./ConvertUtil.js")),
  ae = "240108000000000000000024",
  se = "240208000000000000000024",
  ce = "240308000000000000000024",
  ue = "240408000000000000000024",
  fe = "240508000000000000000024",
  le = "240608000000000000000024",
  de = "240908000000000000000024",
  ve = "240A08000000000000000024",
  ge = "240B08000000000000000024",
  he = "240C08000000000000000024",
  we = "240D08000000000000000024",
  pe = "240E08000000000000000024",
  xe = "240F08000000000000000024",
  me = "240808000000000000000024",
  ye = "6e400001-b5a3-f393-e0a9-e50e24dcca9e".toUpperCase(),
  Le = "6e400004-b5a3-f393-e0a9-e50e24dcca9e".toUpperCase(),
  _e = "6e400002-b5a3-f393-e0a9-e50e24dcca9e".toUpperCase(),
  Ce = "6e400003-b5a3-f393-e0a9-e50e24dcca9e".toUpperCase(),
  Be = 0,
  be = 3e3,
  Te = new Array(),
  De = !1,
  Se = "",
  Ee = !1,
  Ie = !1,
  Re = wx.getSystemInfoSync().platform,
  ke = !0,
  Me = !0,
  Fe = !1,
  Ue = require("./AES.js"),
  Ae = {
    simulator: !0,
    ambientT: "30",
    isEngine: !1,
    isFrontLamp: !1,
    isLeftFrontDoor: !1,
    isLeftRearDoor: !1,
    isLocate: !1,
    isLock: !0,
    isOnline: !1,
    isRightFrontDoor: !1,
    isRightRearDoor: !1,
    isTailbox: !1,
    signal: 50,
    mileage: "100KM",
    speed: "50",
    voltage: "12.5V",
    plateNo: "模拟演示车牌",
  };
module.exports = {
  set_is_simulator: function (e) {
    (Fe = e), wx.setStorageSync("key_simulator", e), e && J();
  },
  set_on_simulator_listener: function (e) {
    ee = e;
  },
  check_control_enable: i,
  getCarData: w,
  stopGetCarData: function () {
    (Ie = !1), t("stopGetCarData.." + G), void 0 != G && clearTimeout(G);
  },
  find: function () {
    var e = i(le);
    if (1 == e) {
      var n = { carId: P.carId };
      te.default.postRequestLoadingParams(
        "api/Car/Control/Horn",
        n,
        "执行中...",
        function (e, t) {
          wx.showToast({ title: t });
        },
        function (e, i) {
          t("error:" + e + "---" + i),
            wx.showModal({ title: "提示", content: i });
        }
      ),
        oe.default.play("ring");
    } else
      2 == e
        ? (oe.default.play("ring"), E(le))
        : 100 == e && oe.default.play("ring");
  },
  unlock: function () {
    var e = i(ce);
    if (1 == e) {
      oe.default.play("unlock");
      var t = { carId: P.carId };
      te.default.postRequestLoadingParams(
        "api/Car/Control/Unlock",
        t,
        "执行中...",
        function (e, t) {
          oe.default.play("303"), wx.showToast({ title: t });
        },
        function (e, t) {
          wx.showModal({ title: "提示", content: t });
        }
      );
    } else
      2 == e
        ? (oe.default.play("303"), E(ce))
        : 100 == e &&
          ((Ae.isLock = !1),
          (Ae.isLeftRearDoor = !0),
          (Ae.isLeftFrontDoor = !0),
          (Ae.isRightRearDoor = !0),
          (Ae.isRightFrontDoor = !0),
          oe.default.play("303"));
  },
  lock: function () {
    var e = i(ue);
    if (1 == e) {
      var t = { carId: P.carId };
      oe.default.play("lock"),
        te.default.postRequestLoadingParams(
          "api/Car/Control/Lock",
          t,
          "执行中...",
          function (e, t) {
            oe.default.play("302"), wx.showToast({ title: t });
          },
          function (e, t) {
            wx.showModal({ title: "提示", content: t });
          }
        );
    } else
      2 == e
        ? (oe.default.play("302"), E(ue))
        : 100 == e &&
          ((Ae.isLock = !0),
          (Ae.isLeftRearDoor = !1),
          (Ae.isLeftFrontDoor = !1),
          (Ae.isRightRearDoor = !1),
          (Ae.isRightFrontDoor = !1),
          oe.default.play("302"));
  },
  tailBox: function () {
    var e = void 0 != P && P.isTailbox;
    Fe && (e = Ae.isTailbox),
      wx.showModal({
        title: "提示",
        content: e ? "确定关闭尾箱?" : "确定开启尾箱?",
        success: function (t) {
          if (t.confirm) {
            var n = i(fe);
            1 == n
              ? p()
              : 2 == n
              ? (oe.default.play(e ? "304" : "305"), E(fe))
              : 100 == n &&
                ((Ae.isTailbox = !Ae.isTailbox),
                oe.default.play(e ? "304" : "305"));
          }
        },
      });
  },
  engine: function () {
    var e = void 0 != P && P.isEngine;
    Fe && (e = Ae.isEngine);
    var t = i(e ? se : ae);
    if (1 == t) {
      var n = e ? "api/Car/Control/Stop" : "api/Car/Control/Start",
        o = { carId: P.carId };
      te.default.postRequestLoadingParams(
        n,
        o,
        "执行中...",
        function (t, i) {
          e ? oe.default.play("300") : oe.default.play("start"),
            wx.showToast({ title: i });
        },
        function (e, t) {
          wx.showModal({ title: "提示", content: t });
        }
      );
    } else
      2 == t
        ? (oe.default.play(e ? "300" : "start"), E(e ? se : ae))
        : 100 == t &&
          ((Ae.isEngine = !Ae.isEngine), oe.default.play(e ? "300" : "start"));
  },
  getNowState: function () {
    return P;
  },
  setInterval: function (e) {
    (Ie = !0), (be = e);
  },
  connect_ble: m,
  checkBleEnable: x,
  onBLEScanFinish: function (e) {
    (V = e), t("onBLEScanFinish:" + Te);
  },
  connect_ble_device: C,
  setBleState: function (e) {
    De = e;
  },
  onReceiveBleData: function (e) {
    j = e;
  },
  get_car_list: function (e, t, i) {
    te.default.getRequestLoadingBase(
      "api/User/getCarList",
      e ? "加载中..." : "",
      function (e, i) {
        if (0 == e.length) ie.default.setCurrentCar(void 0);
        else {
          var n = ie.default.getCurrentCar();
          if (void 0 == n) n = e[0];
          else {
            for (var o = !1, r = 0; r < e.length; r++) {
              var a = e[r];
              a.carId == n.carId && ((n = a), (o = !0));
            }
            o || (n = e[0]);
          }
          ie.default.setCurrentCar(n);
        }
        void 0 != t && t(e, i);
      },
      function (t, n) {
        e && wx.showToast({ title: n + t }), void 0 != i && i(t, n);
      }
    );
  },
  queryBleParam: function (e) {
    var i;
    1 == e
      ? (i = de)
      : 2 == e
      ? (i = ve)
      : 3 == e
      ? (i = ge)
      : 4 == e
      ? (i = he)
      : 5 == e
      ? (i = we)
      : 6 == e
      ? (i = pe)
      : 7 == e
      ? (i = xe)
      : 8 == e && (i = me),
      t("bleState:" + h()),
      h() ? (E(i), wx.showToast({ title: "命令已下发", icon: "none" })) : m(i);
  },
  setBleParam: function (e, t) {
    var i = void 0;
    if (1 == e) i = q(t, 1);
    else if (2 == e) {
      var n = new Array();
      n.push(2),
        n.push(2),
        n.push((t >> 8) & 255),
        n.push(255 & t),
        re.default.bytes2HexString(n);
    } else
      3 == e
        ? (i = q(t, 3))
        : 4 == e
        ? (i = q(t, 4))
        : 5 == e
        ? (i = q(t, 5))
        : 6 == e && (i = q(t, 6));
    h()
      ? (O(re.default.hexString2BytesBuffer(i)),
        wx.showToast({ title: "命令已下发", icon: "none" }))
      : m(i);
  },
  checkCarOutOfServiceNotice: function () {
    var e = r();
    if (void 0 != e) {
      var i = e.serviceExpireTime + ":00";
      t("temp..." + i);
      var n = ne.default.str2Date(i).getTime() - new Date().getTime(),
        o = Math.ceil(Math.abs(n) / 1e3 / 60 / 60 / 24);
      if (n < 0) {
        var a = "车辆服务已过期" + o + "天";
        void 0 != Q
          ? Q(e, a)
          : wx.showModal({
              content: a,
              confirmText: "去充值",
              success: function (e) {
                e.confirm &&
                  t(
                    "如果要设置跳转，请设置监听:set_on_will_outservice_listener"
                  );
              },
            });
      } else if (o <= 30) {
        var s = "车辆服务将在" + o + "天后过期,为了不影响您正常使用,请及时续费";
        void 0 != Y
          ? Y(e, s)
          : wx.showModal({
              content: s,
              confirmText: "去充值",
              success: function (e) {
                e.confirm &&
                  t("如果要设置跳转，请设置监听:set_on_outservice_listener");
              },
            });
      }
    }
  },
  isGpsOutOfService: g,
  getBleDevices: function () {
    return Te;
  },
  set_ble_param_listener: function (e) {
    K = e;
  },
  set_on_empty_car_listener: function (e) {
    X = e;
  },
  set_on_outservie_listener: function (e) {
    Q = e;
  },
  set_on_will_outservice_listener: function (e) {
    Y = e;
  },
  set_on_unbind_ble_listener: function (e) {
    Z = e;
  },
  set_on_unbind_gps_listener: function (e) {
    $ = e;
  },
  break_ble: H,
  set_gps_data_need_check_ble: function (e) {
    Me = e;
  },
  set_on_no_function_listener: function (e) {
    z = e;
  },
};
