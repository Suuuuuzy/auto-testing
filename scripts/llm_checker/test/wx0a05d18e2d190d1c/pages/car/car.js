(global.webpackJsonp = global.webpackJsonp || []).push([
  ["pages/car/car"],
  {
    "343f": function (i, e, t) {
      t.r(e);
      var n = t("827d"),
        o = t.n(n);
      for (var a in n)
        "default" !== a &&
          (function (i) {
            t.d(e, i, function () {
              return n[i];
            });
          })(a);
      e.default = o.a;
    },
    "5e4c": function (i, e, t) {},
    7541: function (i, e, t) {
      t.r(e);
      var n = t("ff0c"),
        o = t("343f");
      for (var a in o)
        "default" !== a &&
          (function (i) {
            t.d(e, i, function () {
              return o[i];
            });
          })(a);
      t("a929");
      var s = t("f0c5"),
        c = Object(s.a)(
          o.default,
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
      e.default = c.exports;
    },
    "7c39": function (i, e, t) {
      (function (i) {
        function e(i) {
          return i && i.__esModule ? i : { default: i };
        }
        t("f567"), e(t("66fd")), i(e(t("7541")).default);
      }).call(this, t("543d").createPage);
    },
    "827d": function (i, e, t) {
      (function (i) {
        function t(i, e, t) {
          return (
            e in i
              ? Object.defineProperty(i, e, {
                  value: t,
                  enumerable: !0,
                  configurable: !0,
                  writable: !0,
                })
              : (i[e] = t),
            i
          );
        }
        var n;
        Object.defineProperty(e, "__esModule", { value: !0 }),
          (e.default = void 0);
        var o,
          a,
          s,
          c,
          r = 0,
          l = !1,
          _ = !1,
          u = ["领将者"],
          h =
            ((n = {
              data: function () {
                return {
                  ambientT: "无",
                  carId: "",
                  gpsTime: "2018-11-22 17: 39",
                  isAlarm: !1,
                  isEngine: !1,
                  isFrontLamp: !1,
                  isLeftFrontDoor: !1,
                  isLeftRearDoor: !1,
                  isLocate: !0,
                  isLock: !0,
                  isOnline: !0,
                  isRightFrontDoor: !1,
                  isRightRearDoor: !1,
                  isTailbox: !1,
                  direct: 217,
                  lat: 22.755033,
                  lng: 113.823866,
                  mileage: 0,
                  plateNo: "车牌号码",
                  speed: 0,
                  voltage: "无",
                  signalPic: "../../static/images/icon_net_signal_5.png",
                  isFind: !1,
                  roadIndex: 5,
                  wheelIndex: 1,
                  startTime: "",
                  showSetTime: !1,
                  startTimeTemp: "",
                  showBlePop: !1,
                  ble_devices: [],
                  isBleConnected: !1,
                  bleDeviceID: "",
                  select_start_time: "",
                  animationData: "",
                  pointAnimationData: "",
                  isAnimated: !1,
                  countNum: 3,
                  showCount: !1,
                  carColorWhite: !1,
                  isSimulateModel: !1,
                  bodyheight: "",
                };
              },
              components: {},
              props: {},
              onPullDownRefresh: function () {
                console.log("pulldown"),
                  this.$api51.api51_car_get_list(
                    !1,
                    function (e, t) {
                      i.stopPullDownRefresh();
                    },
                    function (e, t) {
                      i.stopPullDownRefresh();
                    }
                  );
              },
              onLoad: function (e) {
                if (
                  ((o = this),
                  (o.bodyheight = this.BodyH),
                  i.setStorageSync("need_update_cars", 1),
                  (o.carColorWhite = i.getStorageSync("change_car_color")),
                  i.$on("change_car_color", function (e) {
                    o.carColorWhite = i.getStorageSync("change_car_color");
                  }),
                  o.$api51.set_on_current_car_change_listener(function (e) {
                    console.log(
                      "当前车辆变化:+++++++++++car+++++++" + JSON.stringify(e)
                    ),
                      i.setStorageSync("current_car", JSON.stringify(e)),
                      (c = void 0);
                  }),
                  (this.animation = i.createAnimation({
                    transformOrigin: "50% 50%",
                    duration: 3e3,
                    delay: 500,
                  })),
                  (this.pointAnimation = i.createAnimation({
                    delay: 500,
                    duration: 3e3,
                    transformOrigin: "50% 50%",
                  })),
                  i.onBLEConnectionStateChange(function (i) {
                    var e = i.connected;
                    o.$api51.api51_car_set_ble_state(e),
                      (o.isBleConnected = e),
                      (o.bleDeviceID = e ? i.deviceId : "");
                  }),
                  o.$api51.api51_car_on_ble_data(function (i) {
                    void 0 == s && (s = i),
                      o.check_change_notice(s, i),
                      (s = i),
                      (o.isEngine = i.isEngine),
                      (o.isFrontLamp = i.isFrontLamp),
                      (o.isLeftFrontDoor = i.isLeftFrontDoor),
                      (o.isLeftRearDoor = i.isLeftRearDoor),
                      (o.isLock = i.isLock),
                      (o.isRightFrontDoor = i.isRightFrontDoor),
                      (o.isRightRearDoor = i.isRightRearDoor),
                      (o.isTailbox = i.isTailbox);
                  }),
                  o.$api51.set_on_outservie_listener(function (i, e) {
                    "" != i.serviceExpireTime &&
                      void 0 != i.serviceExpireTime &&
                      o.$api51.api51_user_islogin() &&
                      (console.log(
                        "++++++isShowOutService set_on_outservie_listener++++++++" +
                          l
                      ),
                      l ||
                        ((l = !0),
                        wx.showModal({
                          content: e,
                          confirmText: "去充值",
                          success: function (e) {
                            e.confirm
                              ? ((l = !1), o.navTo("../renew/renew", i))
                              : (l = !1);
                          },
                          complete: function () {},
                        })));
                  }),
                  this.$api51.set_on_will_outservice_listener(function (i, e) {
                    "" != i.serviceExpireTime &&
                      void 0 != i.serviceExpireTime &&
                      o.$api51.api51_user_islogin() &&
                      (l ||
                        ((l = !0),
                        wx.showModal({
                          content: e,
                          confirmText: "去充值",
                          success: function (e) {
                            e.confirm
                              ? ((l = !1), o.navTo("../renew/renew", i))
                              : (l = !1);
                          },
                          complete: function () {},
                        })));
                  }),
                  this.$api51.api51_user_islogin())
                ) {
                  var t = i.getStorageSync("current_car");
                  console.log("本地缓存的car" + t),
                    "undefined" != t &&
                      ((t = JSON.parse(t)),
                      o.$api51.api51_user_set_currentcar(t),
                      this.showDefaultView(),
                      (this.plateNo = t.plateNo));
                }
                o.setSinglePic(10);
                var n = this.$api51.api51_user_get_starttime();
                (this.startTime = n + "min"),
                  this.show_notice(""),
                  i.getNetworkType({
                    success: function (e) {
                      "none" == e.networkType &&
                        i.showModal({
                          title: "提示",
                          content: "当前手机无网络",
                          showCancel: !1,
                        });
                    },
                  });
              },
              onReady: function () {
                o.setSinglePic(10);
                var i = this.$api51.api51_user_get_starttime();
                this.startTime = i + "min";
              },
              onShow: function () {
                (o.isSimulateModel = !1),
                  console.log(
                    "car:page_show..." + this.$api51.api51_user_islogin()
                  ),
                  1 == i.getStorageSync("need_update_cars")
                    ? (console.log("获取车辆列表"),
                      o.$api51.api51_car_get_list(
                        !1,
                        function (e, t) {
                          console.log("获取车辆列表成功"),
                            i.setStorageSync("need_update_cars", 0),
                            0 == e.length
                              ? o.showEmptyCarDialog()
                              : o.car_wakeup(),
                            console.log("car:carlist:" + e.length);
                        },
                        function (i, e) {}
                      ))
                    : o.car_wakeup(),
                  console.log(
                    "car:page_show..." + this.$api51.api51_user_islogin()
                  ),
                  this.$api51.api51_car_will_outservice(),
                  this.$api51.api51_user_islogin()
                    ? this.$api51.api51_car_is_outservice()
                    : this.showDefaultView(),
                  this.$api51.api51_car_set_interval(3e3),
                  console.log(
                    "this.$api51.api51_user_get_currentcar()" +
                      this.$api51.api51_user_get_currentcar()
                  ),
                  this.$api51.api51_car_start_gps_data(
                    function (i, e) {
                      if (
                        (console.log("api51_car_start_gps_data ======" + i),
                        void 0 == i || 0 == i.length)
                      )
                        o.isSimulateModel || o.showDefaultView();
                      else {
                        var t = i[0];
                        t.isOnline
                          ? (o.setSinglePic(t.signal),
                            void 0 == c && (c = t),
                            o.check_change_notice(c, t),
                            (c = t))
                          : o.setSinglePic(0),
                          0 == t.speed || o.pointRotate((360 / 310) * t.speed),
                          (o.ambientT =
                            "" == t.ambientT ? "无" : t.ambientT + "°"),
                          (o.carId = t.carId),
                          (o.gpsTime = t.gpsTime),
                          (o.isAlarm = t.isAlarm),
                          (o.isEngine = t.isEngine),
                          (o.isFrontLamp = t.isFrontLamp),
                          (o.isLeftFrontDoor = t.isLeftFrontDoor),
                          (o.isLeftRearDoor = t.isLeftRearDoor),
                          (o.isLocate = t.isLocate),
                          (o.isLock = t.isLock),
                          (o.isOnline = t.isOnline),
                          (o.isRightFrontDoor = t.isRightFrontDoor),
                          (o.isRightRearDoor = t.isRightRearDoor),
                          (o.isTailbox = t.isTailbox),
                          (o.direct = t.direct),
                          (o.lat = t.lat),
                          (o.lng = t.lng),
                          (o.mileage =
                            "" == t.mileage ? "无" : t.mileage + " KM"),
                          (o.plateNo = t.plateNo),
                          (o.speed = t.speed),
                          (o.voltage =
                            "" == t.voltage ? "无" : t.voltage + " V");
                      }
                    },
                    function (i, e) {}
                  );
              },
              onHide: function () {
                i.$off("check_car_notice"),
                  console.log("page_hide..."),
                  this.$api51.api51_car_stop_gps_data(),
                  clearTimeout();
              },
              onUnload: function () {
                console.log("page_hide..."),
                  (this.animationData = ""),
                  (this.pointAnimationData = "");
              },
            }),
            t(n, "onPullDownRefresh", function () {}),
            t(n, "onReachBottom", function () {}),
            t(n, "onShareAppMessage", function () {}),
            t(n, "methods", {
              car_wakeup: function () {
                var i = this.$api51.api51_user_get_currentcar();
                if (i) {
                  var e = { carId: i.carId };
                  console.log("=======唤醒车辆======="),
                    this.$api51.api51_request(
                      "api/Car/Control/Wakeup",
                      "POST",
                      null,
                      e,
                      "",
                      function (i, e) {
                        console.log("=======唤醒车辆=======成功");
                      },
                      function (i, e) {}
                    );
                }
              },
              getUserInfo: function () {},
              showDefaultView: function () {
                o.setSinglePic(0),
                  (o.ambientT = "无"),
                  (o.carId = ""),
                  (o.gpsTime = "2018-11-22 17: 39"),
                  (o.isAlarm = !1),
                  (o.isEngine = !1),
                  (o.isFrontLamp = !1),
                  (o.isLeftFrontDoor = !1),
                  (o.isLeftRearDoor = !1),
                  (o.isLocate = !1),
                  (o.isLock = !0),
                  (o.isOnline = !1),
                  (o.isRightFrontDoor = !1),
                  (o.isRightRearDoor = !1),
                  (o.isTailbox = !1),
                  (o.direct = 217),
                  (o.signalPic = "../../static/images/icon_net_signal_0.png"),
                  (o.lat = 22.755033),
                  (o.lng = 113.823866),
                  (o.mileage = "无"),
                  (o.plateNo = "车牌号码"),
                  (o.speed = 0),
                  (o.voltage = "无");
              },
              check_change_notice: function (i, e) {
                var t = "",
                  n = "";
                i.isEngine != e.isEngine &&
                  (e.isEngine
                    ? ((t = "车辆启动"), (n = "81"))
                    : ((n = "82"), (t = "车辆熄火")),
                  this.$api51.voice_play(n),
                  this.show_notice(t)),
                  i.isLeftFrontDoor != e.isLeftFrontDoor &&
                    ((t = e.isLeftFrontDoor ? "左前门开" : "左前门关"),
                    this.show_notice(t)),
                  i.isLeftRearDoor != e.isLeftRearDoor &&
                    ((t = e.isLeftRearDoor ? "左后门开" : "左后门关"),
                    this.show_notice(t)),
                  i.isRightFrontDoor != e.isRightFrontDoor &&
                    ((t = e.isRightFrontDoor ? "右前门开" : "右前门关"),
                    this.show_notice(t)),
                  i.isRightRearDoor != e.isRightRearDoor &&
                    ((t = e.isRightRearDoor ? "右后门开" : "右后门关"),
                    this.show_notice(t)),
                  i.isTailbox != e.isTailbox &&
                    (e.isTailbox
                      ? ((t = "尾箱开启"), (n = "307"))
                      : ((t = "尾箱关闭"), (n = "306")),
                    this.show_notice(t),
                    this.$api51.voice_play(n)),
                  i.isLock != e.isLock &&
                    (e.isLock
                      ? ((t = "车辆上锁"), (n = "79"))
                      : ((t = "车辆开锁"), (n = "80")),
                    this.show_notice(t),
                    this.$api51.voice_play(n));
              },
              setSinglePic: function (i) {
                var e = "../../static/images/icon_net_signal_0.png";
                if (this.isOnline) {
                  var t = Math.round((parseInt(i) + 5) / 10);
                  t <= 0 ||
                    (e =
                      1 == t
                        ? "../../static/images/icon_net_signal_1.png"
                        : 2 == t
                        ? "../../static/images/icon_net_signal_2.png"
                        : 3 == t
                        ? "../../static/images/icon_net_signal_3.png"
                        : 4 == t
                        ? "../../static/images/icon_net_signal_4.png"
                        : "../../static/images/icon_net_signal_5.png");
                }
                this.setData({ signalPic: e });
              },
              click_unlockFun: function () {
                if (this.$api51.api51_user_islogin())
                  if (this.isSimulateModel) this.isLock = !1;
                  else {
                    var e = i.getStorageSync("current_car");
                    if (
                      (console.log("currentcar +++++++++" + JSON.stringify(e)),
                      void 0 == e || "" == e)
                    )
                      return o.showEmptyCarDialog();
                    this.$api51.api51_car_unlock();
                  }
                else this.show_unlogin();
                setTimeout(o.car_light_flashfun, 100),
                  setTimeout(o.car_light_hideFun, 500),
                  setTimeout(o.car_light_flashfun, 600),
                  setTimeout(o.car_light_hideFun, 1100);
              },
              car_light_flashfun: function () {
                o.isFrontLamp = !0;
              },
              car_light_hideFun: function () {
                o.isFrontLamp = !1;
              },
              click_lockFun: function () {
                if (this.$api51.api51_user_islogin())
                  if (this.isSimulateModel) this.isLock = !0;
                  else {
                    var e = i.getStorageSync("current_car");
                    if (void 0 == e || "" == e) return o.showEmptyCarDialog();
                    this.$api51.api51_car_lock();
                  }
                else this.show_unlogin();
                setTimeout(o.car_light_flashfun, 100),
                  setTimeout(o.car_light_hideFun, 500);
              },
              click_tail_boxFun: function () {
                if (this.$api51.api51_user_islogin())
                  if (this.isSimulateModel) this.isTailbox = !this.isTailbox;
                  else {
                    var e = i.getStorageSync("current_car");
                    if (void 0 == e || "" == e) return o.showEmptyCarDialog();
                    this.$api51.api51_car_tailbox();
                  }
                else this.show_unlogin();
              },
              click_find_carFun: function () {
                if (this.$api51.api51_user_islogin())
                  if (this.isSimulateModel);
                  else {
                    var e = i.getStorageSync("current_car");
                    if (void 0 == e || "" == e) return o.showEmptyCarDialog();
                    this.$api51.api51_car_find();
                  }
                else this.show_unlogin();
                setTimeout(o.car_light_flashfun, 400),
                  setTimeout(o.car_light_hideFun, 800),
                  setTimeout(o.car_light_flashfun, 1200),
                  setTimeout(o.car_light_hideFun, 1600),
                  setTimeout(o.car_light_flashfun, 2e3),
                  setTimeout(o.car_light_hideFun, 2400),
                  setTimeout(o.car_light_flashfun, 2800),
                  setTimeout(o.car_light_hideFun, 3200);
              },
              show_notice: function (i) {
                console.log("notice:1"),
                  _
                    ? (console.log("notice:3"), u.push(i))
                    : (console.log("notice:2"),
                      (_ = !0),
                      (o.notice = i),
                      setTimeout(function () {
                        if (((_ = !1), u.length > 0)) {
                          var i = u.splice(0, 1)[0];
                          o.show_notice(i);
                        }
                      }, 2e3));
              },
              click_engine_startFun: function () {
                o.send_engine_timeFun(),
                  this.$api51.voice_play_press_voice(!0),
                  (o.showCount = !0),
                  (o.countNum = 3),
                  console.log("engine_start........."),
                  (a = setInterval(function () {
                    r++,
                      (o.countNum = 3 - r),
                      r >= 3 &&
                        ((o.showCount = !1),
                        console.log("倒计时完毕:"),
                        o.click_engine_cancelFun(),
                        0 == o.isEngine &&
                          ((o.isAnimated = !0), o.pointRotate(270), o.rotate()),
                        o.engine_startFun()),
                      console.log("计时器:....:" + r);
                  }, 1e3));
              },
              engine_startFun: function () {
                if (
                  (0 == o.isEngine && setTimeout(o.resetFun, 3500),
                  this.$api51.api51_user_islogin())
                )
                  if (o.isSimulateModel) o.isEngine = !o.isEngine;
                  else {
                    var e = i.getStorageSync("current_car");
                    if (void 0 == e || "" == e) return o.showEmptyCarDialog();
                    this.$api51.api51_car_engine();
                  }
                else this.show_unlogin();
              },
              send_engine_timeFun: function () {
                "" != this.carId &&
                  this.$api51.api51_set_start_time(
                    this.carId,
                    function (i, e) {
                      console.log("设置启动时间成功...");
                    },
                    function (i, e) {
                      console.log("设置启动时间失败...");
                    }
                  );
              },
              click_engine_cancelFun: function () {
                this.$api51.voice_play_press_voice(!1),
                  (o.showCount = !1),
                  console.log("engine_cancel........."),
                  clearInterval(a),
                  (r = 0);
              },
              click_plate_numberFun: function () {
                console.log("car_manager..."),
                  i.navigateTo({ url: "../car_manage/car_manage?data=true" });
              },
              click_open_tailboxFun: function () {
                "" == this.carId
                  ? i.showModal({
                      title: "提示",
                      content: "请选择车辆!",
                      showCancel: !1,
                    })
                  : (i.showModal(
                      t(
                        {
                          title: "提示",
                          content: "确定打开尾箱?",
                          function: function () {
                            this.$api51.api51_open_tailbox(
                              function (e, t) {
                                this.$api51.voice_play("305"),
                                  i.showToast({ title: t });
                              },
                              function (e, t) {
                                i.showToast({ title: t + e, icon: "none" });
                              }
                            );
                          },
                        },
                        "function",
                        function () {
                          console.log("失败");
                        }
                      )
                    ),
                    (this.isTailbox = !this.isTailbox));
              },
              click_start_timeFun: function (i) {
                var e = this.$api51.api51_user_get_starttime();
                console.log(
                  "api51_user_get_starttime" +
                    this.$api51.api51_user_get_starttime()
                ),
                  this.setData({
                    showSetTime: !0,
                    startTimeTemp: e,
                    select_start_time: e,
                  }),
                  console.log("click_start_time:--" + this.startTimeTemp);
              },
              set_starttimeFun: function (i) {
                var e = this.select_start_time;
                this.$api51.api51_user_set_starttime(e),
                  this.setData({
                    showSetTime: !1,
                    startTime: e + "min",
                    select_start_time: e,
                  }),
                  console.log("click_set_starttime..." + this.startTime);
              },
              select_valueFun: function (i) {
                var e = i.detail.value;
                this.setData({ select_start_time: e }),
                  console.log("select_value..." + this.select_start_time);
              },
              click_bleFun: function (e) {
                this.$api51.api51_car_check_ble_enable(!0) &&
                  (o.isBleConnected
                    ? ((o.ble_devices = this.$api51.api51_car_ble_devices()),
                      (o.showBlePop = !0),
                      console.log("ble_devices:" + o.ble_devices))
                    : (this.$api51.api51_car_connect_ble(""),
                      this.$api51.api51_car_on_ble_scan_finish(function (e) {
                        i.hideLoading(),
                          console.log("BLE_:" + JSON.stringify(e)),
                          (o.showBlePop = !0),
                          (o.ble_devices = e);
                      })));
              },
              close_ble_popFun: function (i) {
                this.setData({ showBlePop: !1 });
              },
              show_unlogin: function () {
                i.showModal({
                  title: "提示",
                  content: "登录失效",
                  cancelText: "取消",
                  confirmText: "登录",
                  success: function (e) {
                    e.confirm && i.redirectTo({ url: "/pages/login/login" });
                  },
                });
              },
              click_ble_rescan: function () {
                o.isBleConnected ||
                  (o.$api51.api51_car_connect_ble(""),
                  i.showLoading({ title: "扫描中..." }),
                  o.$api51.api51_car_on_ble_scan_finish(function (e) {
                    i.hideLoading(),
                      (o.ble_devices = e),
                      debug && console.log("BLE_:" + JSON.stringify(e));
                  }));
              },
              connect_ble_deviceFun: function (e) {
                o.setData({ showBlePop: !1 });
                var t = e.currentTarget.dataset.deviceid;
                o.isBleConnected
                  ? t == o.bleDeviceID
                    ? i.closeBLEConnection({
                        deviceId: o.bleDeviceID,
                        success: function (i) {},
                      })
                    : i.showModal({
                        title: "提示",
                        content: "请先断开已有连接!",
                      })
                  : (console.log("BLE:" + t),
                    this.$api51.api51_car_connect_ble_device(t, ""));
              },
              pointRotate: function (i) {
                this.pointAnimation.rotate(i).step(),
                  (this.pointAnimationData = this.pointAnimation.export());
              },
              rotate: function () {
                this.animation.rotate(360).step(),
                  (this.animationData = this.animation.export());
              },
              resetFun: function () {
                (o.isAnimated = !1),
                  this.animation
                    .rotate(0, 0)
                    .scale(1)
                    .translate(0, 0)
                    .skew(0, 0)
                    .step({ duration: 0 }),
                  (this.animationData = this.animation.export()),
                  this.pointAnimation
                    .rotate(0, 0)
                    .scale(1)
                    .translate(0, 0)
                    .skew(0, 0)
                    .step({ duration: 0 }),
                  (this.pointAnimationData = this.pointAnimation.export());
              },
              swiper_changeFun: function (i) {
                console.log(
                  "swiper_changeFun" +
                    JSON.stringify(i) +
                    "current" +
                    i.target.current
                ),
                  (this.isBackCar = 0 != i.target.current),
                  (this.isEngine = this.isEngine),
                  console.log("this.isBackCar" + this.isBackCar);
              },
              closeSimulateModel: function () {
                o.isSimulateModel = !1;
              },
              showEmptyCarDialog: function () {
                i.showActionSheet({
                  title: "提示",
                  content: "您还没有添加任何车辆",
                  itemList: ["添加车辆", "模拟演示"],
                  success: function (e) {
                    console.log(e.tapIndex),
                      0 == e.tapIndex
                        ? i.navigateTo({ url: "../car_manage/car_manage" })
                        : ((o.isSimulateModel = !0), o.showDefaultView());
                  },
                });
              },
              setData: function (i, e) {
                var t,
                  n,
                  o = this,
                  a = [];
                Object.keys(i).forEach(function (e) {
                  (a = e.split(".")),
                    (t = i[e]),
                    (n = o.$data),
                    a.forEach(function (i, e) {
                      e + 1 == a.length
                        ? o.$set(n, i, t)
                        : n[i] || o.$set(n, i, {}),
                        (n = n[i]);
                    });
                }),
                  e && e();
              },
            }),
            n);
        e.default = h;
      }).call(this, t("543d").default);
    },
    a929: function (i, e, t) {
      var n = t("5e4c");
      t.n(n).a;
    },
    ff0c: function (i, e, t) {
      t.d(e, "b", function () {
        return n;
      }),
        t.d(e, "c", function () {
          return o;
        }),
        t.d(e, "a", function () {});
      var n = function () {
          var i = this;
          i.$createElement;
          i._self._c;
        },
        o = [];
    },
  },
  [["7c39", "common/runtime", "common/vendor"]],
]);
