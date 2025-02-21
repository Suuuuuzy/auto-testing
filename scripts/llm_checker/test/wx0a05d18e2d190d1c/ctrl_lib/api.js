function a(a) {
  return a && a.__esModule ? a : { default: a };
}
var e = a(require("./UserOperate.js")),
  t = a(require("./NetWorkUtil.js")),
  i = a(require("./verify_code.js")),
  s = a(require("./CarUtil.js")),
  r = a(require("./voice_util.js"));
module.exports = {
  api51_pzlmd: function (a, e, i, s) {
    var r = { carId: a, value: e };
    t.default.postRequestParams(
      "api/Car/Control/SetCollisionSensitivity",
      r,
      i,
      s
    );
  },
  api51_zdlmd: function (a, e, i, s) {
    var r = { carId: a, value: e };
    t.default.postRequestParams(
      "api/Car/Control/SetVibrationSensitivity",
      r,
      i,
      s
    );
  },
  api51_skey_list: function (a, e, i) {
    var s = "api/Car/getSkeyList?carId=" + a;
    t.default.getRequestLoadingBase(s, "加载中...", e, i);
  },
  api51_bind_or_unbind_termail: function (a, e, i, s, r, n) {
    var _ = "",
      o = { carId: i };
    if (1 == e)
      (_ = a ? "api/Car/bindGps" : "api/Car/UnbindGps"),
        a ? (o.terminalNo = s) : (o.gpsId = s);
    else if (3 == e)
      (_ = a ? "api/Car/BindBluetooth" : "api/Car/UnbindBluetooth"),
        a ? (o.terminalNo = s) : (o.bluetoothId = s);
    else {
      if (4 != e) return;
      (_ = a ? "api/Car/BindSkey" : "api/Car/UnbindSkey"),
        a ? (o.terminalNo = s) : (o.skeyId = s);
    }
    t.default.postRequestLoadingParams(_, o, "提交中...", r, n);
  },
  api51_regist_or_reset_password: function (a, e, s, r) {
    (e.smsId = i.default.get_msg_id()),
      (e.appId = wx.getStorageSync("key_51_appid"));
    var n = a ? "api/User/register" : "api/User/ResetPassword";
    t.default.postRequestLoadingParams(n, e, "提交中...", s, r);
  },
  api51_alarm_one_switch: function (a, e, i, s, r) {
    var n = { carId: a, alarmId: e, isOpen: i };
    t.default.postRequestLoadingParams(
      "api/Car/ChangeAlarmPushSwitch",
      n,
      "提交中...",
      s,
      r
    );
  },
  api51_alarm_all_switch: function (a, e, i, s, r) {
    var n = { carId: a, cateId: e },
      _ = i
        ? "api/Car/BatchEnableAlarmPushSwitch"
        : "api/Car/BatchDisableAlarmPushSwitch";
    t.default.postRequestLoadingParams(_, n, "提交中...", s, r);
  },
  api51_alarm_switch_list: function (a, e, i) {
    var s = "api/Car/GetAlarmPushSwitchList/" + a;
    t.default.getRequestLoadingBase(s, "加载中...", e, i);
  },
  api51_change_address: function (a, e, i) {
    var s = { address: a };
    t.default.postRequestLoadingParams("api/User/ChangeAddress", s, "", e, i);
  },
  api51_change_nickname: function (a, e, i) {
    var s = { nickname: a };
    t.default.postRequestLoadingParams("api/User/ChangeNickname", s, "", e, i);
  },
  api51_change_avatar: function (a, e, i) {
    var s = { avatar: a };
    t.default.postRequestLoadingParams("api/User/ChangeAvatar", s, "", e, i);
  },
  api51_upload_file: function (a, e, i) {
    t.default.uploadFile("api/User/UploadAvatar", a, e, i);
  },
  api51_change_area: function (a, e, i, s) {
    var r = { areaId: a, areaName: e };
    t.default.postRequestLoadingParams("api/User/ChangeArea", r, "", i, s);
  },
  api51_change_birthday: function (a, e, i) {
    var s = { birthday: a };
    t.default.postRequestLoadingParams("api/User/ChangeBirthday", s, "", e, i);
  },
  api51_change_gender: function (a, e, i) {
    var s = { gender: a };
    t.default.postRequestLoadingParams("api/User/ChangeGender", s, "", e, i);
  },
  api51_user_info: function (a, e) {
    t.default.getRequestLoadingBase("api/User/GetInfo", "", a, e);
  },
  api51_add_freedback: function (a, e, i, s, r) {
    var n = { content: e, appId: a, version: i, clientType: 1 };
    t.default.postRequestLoadingParams(
      "api/User/AddFeedback",
      n,
      "提交中...",
      s,
      r
    );
  },
  api51_car_sos_phone_list: function (a, e) {
    t.default.getRequestBase("api/User/GetCarCallList", a, e);
  },
  api51_today_record: function (a, i, s, r) {
    e.default.getCurrentCar();
    var n = { carId: a, date: i };
    t.default.getRequestLoadingParams(
      "api/Car/GetTravelList",
      n,
      "加载中...",
      s,
      r
    );
  },
  api51_driver_record_day: function (a, e, i, s, r, n) {
    var _ = { carId: a, pageIndex: e, beginTime: i, endTime: s };
    t.default.getRequestLoadingParams(
      "api/Car/GetTravelStatistics",
      _,
      "加载中...",
      r,
      n
    );
  },
  api51_delete_login_device: function (a, e, i) {
    var s = { id: a };
    t.default.postRequestLoadingParams(
      "api/User/DeleteLoginDevice",
      s,
      "提交中...",
      e,
      i
    );
  },
  api51_login_device_list: function (a, e) {
    t.default.getRequestLoadingBase(
      "api/User/GetLoginDeviceList",
      "加载中...",
      a,
      e
    );
  },
  api51_login_out: function (a, i) {
    s.default.break_ble();
    t.default.postRequestLoadingBase(
      "api/User/Logout",
      "正在退出...",
      function (t, i) {
        e.default.setLogin(!1), void 0 != a && a(t, i);
      },
      function (a, t) {
        e.default.setLogin(!1), void 0 != i && i(a, t);
      }
    );
  },
  api51_change_or_verify_mobile: function (a, e, s, r, n) {
    var _ = { mobile: e, captcha: s, smsId: i.default.get_msg_id() },
      o = a ? "api/User/VerifyMobile" : "api/User/ChangeMobile";
    t.default.postRequestLoadingParams(o, _, "提交中...", r, n);
  },
  api51_change_password: function (a, e, i) {
    var s = { password: a };
    t.default.postRequestLoadingParams(
      "api/User/ChangePassword",
      s,
      "提交中...",
      e,
      i
    );
  },
  api51_set_vibrate: function (a, e, i, s) {
    var r = { carId: a, value: e };
    t.default.postRequestLoadingParams(
      "api/Car/Control/vibrateType",
      r,
      "提交中...",
      i,
      s
    );
  },
  api51_set_ignite_value: function (a, e, i, s, r) {
    var n = { carId: a, value: e, text: i };
    t.default.postRequestLoadingParams(
      "api/Car/Control/IgnitionValue",
      n,
      "提交中...",
      s,
      r
    );
  },
  api51_car_delete: function (a, e, i, s) {
    var r = "api/Car/Delete/" + e;
    "" != a && (r = "api/Car/DeleteAuthorize/" + a),
      t.default.postRequestLoadingBase(r, "提交中...", i, s);
  },
  api51_ignite_value: function (a, e, i) {
    var s = "api/Car/GetIgnitionValueList2/" + a;
    t.default.getRequestLoadingBase(s, "加载中...", e, i);
  },
  api51_switch_auto_lock: function (a, e, i, s) {
    var r = { carId: a, value: 1 == e ? 1 : 0 };
    t.default.postRequestLoadingParams(
      "api/Car/Control/autoLock",
      r,
      "提交中...",
      i,
      s
    );
  },
  api51_switch_maintain_mode: function (a, e, i, s) {
    var r = { carId: a, switch: e };
    t.default.postRequestLoadingParams(
      "api/Car/ChangeMaintainMode",
      r,
      "提交中...",
      i,
      s
    );
  },
  api51_switch_gps: function (a, e, i, s) {
    var r = { carId: a, switch: e };
    t.default.postRequestLoadingParams(
      "api/Car/ChangeGpsSwitch",
      r,
      "提交中...",
      i,
      s
    );
  },
  api51_option_info: function (a, e, i) {
    var s = { carId: a };
    t.default.getRequestLoadingParams(
      "api/Car/GetOptionInfo",
      s,
      "加载中...",
      e,
      i
    );
  },
  api51_rail_add: function (a, e, i, s, r, n) {
    var _ = { carId: a, lng: e, lat: i, radius: 1e3 * s };
    t.default.postRequestLoadingParams(
      "api/Car/AddFence",
      _,
      "提交中...",
      r,
      n
    );
  },
  api51_rail_delete: function (a, e, i) {
    var s = "api/Car/DeleteFence/" + a;
    t.default.postRequestLoadingBase(s, "提交中...", e, i);
  },
  api51_rail_list: function (a, e, i) {
    var s = "api/Car/GetFenceList/" + a;
    t.default.getRequestLoadingBase(s, "加载中...", e, i);
  },
  api51_login: function (a, i, s, r, n) {
    var _ = wx.getSystemInfoSync();
    if (void 0 != _) {
      e.default.setLoginName(a);
      var o = {
        mobile: a,
        password: i,
        appId: s,
        version: "wx1.0.1",
        osType: 3,
        osVersion: _.system,
        modelNo: _.model,
        serialNo: "101001",
      };
      console.log("login:" + o),
        t.default.postRequestLoadingParams(
          "api/User/login",
          o,
          "登录中...",
          function (a, t) {
            var s = a[0];
            (s.password = i), e.default.saveUserData(s), void 0 != r && r(s, t);
          },
          n
        );
    } else
      wx.showModal({
        title: "登录失败，请重试(未获取到SystemInfo)",
        showCancel: !1,
      });
  },
  api51_change_mobile: function (a, s, r, n) {
    var _ = { mobile: a, captcha: s, smsId: i.default.get_msg_id() };
    t.default.postRequestLoadingParams(
      "api/User/ChangeMobile",
      _,
      "提交中...",
      function (t, i) {
        e.default.setLoginName(a), void 0 != r && r(t, i);
      },
      n
    );
  },
  api51_change_transer: function (a, s, r, n, _) {
    var o = {
      mobile: a,
      captcha: s,
      smsId: i.default.get_msg_id(),
      password: r,
    };
    t.default.postRequestLoadingParams(
      "api/User/ChangeTransfer",
      o,
      "提交中...",
      function (t, i) {
        e.default.setLoginName(a), void 0 != n && n(t, i);
      },
      _
    );
  },
  api51_add_author: function (a, e, i, s, r, n, _) {
    var o = {
      carId: a,
      beginTime: e,
      endTime: i,
      grantMobile: s,
      grantName: r,
    };
    t.default.postRequestLoadingParams(
      "api/Car/AddAuthorize",
      o,
      "提交中...",
      n,
      _
    );
  },
  api51_update_author: function (a, e, i, s, r, n, _, o) {
    var d = {
      id: a,
      carId: e,
      beginTime: i,
      endTime: s,
      grantMobile: r,
      grantName: n,
    };
    t.default.postRequestLoadingParams(
      "api/Car/UpdateAuthorize",
      d,
      "提交中...",
      _,
      o
    );
  },
  api51_delete_author: function (a, e, i) {
    var s = "api/Car/DeleteAuthorize/" + a;
    t.default.postRequestLoadingBase(s, "提交中...", e, i);
  },
  api51_author_list: function (a, e) {
    t.default.getRequestLoadingBase(
      "api/User/GetCarAuthorizeList",
      "加载中...",
      a,
      e
    );
  },
  api51_set_start_time: function (a, i, s) {
    var r = { carId: a, value: e.default.getStartTime() };
    t.default.postRequestParams("api/Car/Control/StartDuration", r, i, s);
  },
  api51_open_tailbox: function (a, e, i) {
    var s = { carId: a };
    t.default.postRequestLoadingParams(
      "api/Car/Control/Tailbox",
      s,
      "执行中...",
      e,
      i
    );
  },
  api51_change_user: function (a, e, i, s) {
    var r = { carId: a, mobile: e };
    t.default.postRequestLoadingParams(
      "api/Car/ChangeUser",
      r,
      "提交中...",
      i,
      s
    );
  },
  api51_brand_model_list: function (a, e, i) {
    var s = { brandModelId: a };
    t.default.getRequestLoadingParams(
      "api/Car/GetBrandModelList",
      s,
      "加载中...",
      e,
      i
    );
  },
  api51_add_or_update_car: function (a, e, i, s, r, n, _, o) {
    var d = {
        plateNo: e,
        brandModelId: i,
        vinNo: s,
        engineNo: r,
        isAutoDoor: n,
      },
      l = "api/Car/Add";
    "" != a && ((l = "api/Car/update"), (d.carId = a)),
      t.default.postRequestLoadingParams(l, d, "提交中...", _, o);
  },
  api51_car_info: function (a, e, i) {
    var s = "api/Car/GetInfo/" + a;
    t.default.getRequestLoadingBase(s, "加载中...", e, i);
  },
  api51_alarm_list: function (a, e, i, s, r, n) {
    var _ = { carId: a, pageIndex: e, beginTime: i, endTime: s };
    t.default.getRequestLoadingParams(
      "api/Car/GetAlarmList",
      _,
      "加载中...",
      r,
      n
    );
  },
  api51_delete_alarm: function (a, e, i, s, r, n) {
    var _ = { id: a, carId: e, rcvTime: i, objectId: s };
    t.default.postRequestLoadingParams(
      "api/Car/DeleteAlarm",
      _,
      "提交中...",
      r,
      n
    );
  },
  api51_message_group_list: function (a, e) {
    t.default.getRequestLoadingBase(
      "api/Message/GetGroupList",
      "加载中...",
      a,
      e
    );
  },
  api51_car_group_alarm_list: function (a, e) {
    t.default.getRequestLoadingBase(
      "api/Car/GetGroupAlarmList",
      "加载中...",
      a,
      e
    );
  },
  api51_message_list: function (a, e, i) {
    var s = "api/Message/GetList?dataType=" + a;
    t.default.getRequestLoadingBase(s, "加载中...", e, i);
  },
  api51_request: t.default.requestNetWork,
  api51_gps_track_list: function (a, e, i, s, r) {
    var n = { carId: a, beginTime: e, endTime: i };
    t.default.getRequestLoadingParams(
      "api/Car/GetGpsTrackList",
      n,
      "加载中...",
      s,
      r
    );
  },
  api51_save_ble_mac: function (a, e, i, s) {
    var r = { bluetoothId: a, macAddress: e };
    t.default.postRequestParams("api/Car/ChangeBtMacAddress", r, i, s);
  },
  api51_init: function (a, e) {
    wx.setStorageSync("key_51_host", a), wx.setStorageSync("key_51_appid", e);
  },
  api51_code_get_sms: i.default.get_sms_code,
  api51_code_get_common: i.default.get_common_code,
  api51_code_get_user: i.default.get_user_code,
  api51_code_on_verify_listener: i.default.on_verify_code_listener,
  api51_code_on_release: i.default.on_release,
  api51_code_get_msg_id: i.default.get_msg_id,
  api51_code_reset: i.default.reset,
  api51_car_control_enable: s.default.check_control_enable,
  api51_car_start_gps_data: s.default.getCarData,
  api51_car_stop_gps_data: s.default.stopGetCarData,
  api51_car_find: s.default.find,
  api51_car_unlock: s.default.unlock,
  api51_car_lock: s.default.lock,
  api51_car_tailbox: s.default.tailBox,
  api51_car_engine: s.default.engine,
  api51_car_now_state: s.default.getNowState,
  api51_car_set_interval: s.default.setInterval,
  api51_car_connect_ble: s.default.connect_ble,
  api51_car_check_ble_enable: s.default.checkBleEnable,
  api51_car_on_ble_scan_finish: s.default.onBLEScanFinish,
  api51_car_connect_ble_device: s.default.connect_ble_device,
  api51_car_set_ble_state: s.default.setBleState,
  api51_car_on_ble_data: s.default.onReceiveBleData,
  api51_car_get_list: s.default.get_car_list,
  api51_car_query_ble_param: s.default.queryBleParam,
  api51_car_set_ble_param: s.default.setBleParam,
  api51_car_will_outservice: s.default.checkCarOutOfServiceNotice,
  api51_car_is_outservice: s.default.isGpsOutOfService,
  api51_car_ble_devices: s.default.getBleDevices,
  api51_car_ble_param_listener: s.default.set_ble_param_listener,
  set_on_empty_car_listener: s.default.set_on_empty_car_listener,
  set_on_outservie_listener: s.default.set_on_outservie_listener,
  set_on_will_outservice_listener: s.default.set_on_will_outservice_listener,
  set_on_unbind_ble_listener: s.default.set_on_unbind_ble_listener,
  set_on_unbind_gps_listener: s.default.set_on_unbind_gps_listener,
  set_gps_data_need_check_ble: function (a) {
    s.default.set_gps_data_need_check_ble(a);
  },
  set_is_simulator: s.default.set_is_simulator,
  set_on_simulator_listener: s.default.set_on_simulator_listener,
  set_on_no_function_listener: s.default.set_on_no_function_listener,
  api51_user_save_userdata: e.default.saveUserData,
  api51_user_clear_userdata: e.default.clearUserData,
  api51_user_get_token: e.default.getToken,
  api51_user_set_loginname: e.default.setLoginName,
  api51_user_get_account: e.default.getLoginName,
  api51_user_set_cars: e.default.setCarList,
  api51_user_get_cars: e.default.getCarList,
  api51_user_set_currentcar: e.default.setCurrentCar,
  api51_user_get_currentcar: e.default.getCurrentCar,
  api51_user_get_starttime: e.default.getStartTime,
  api51_user_set_starttime: e.default.setStartTime,
  api51_user_get_password: e.default.getPassword,
  api51_user_islogin: e.default.isLogin,
  api51_user_set_login: e.default.setLogin,
  api51_onlogin_invalid_listener: t.default.set_onlogin_invalid_listener,
  set_on_current_car_change_listener:
    e.default.set_on_current_car_change_listener,
  voice_play: r.default.play,
  voice_stop: r.default.stop,
  voice_playStart: r.default.playStart,
  voice_stopStart: r.default.stopStart,
  voice_can_play_sound: r.default.can_play_sound,
  voice_set_can_play: r.default.set_can_play,
  voice_play_press_voice: r.default.play_press_voice,
  set_play_local: r.default.set_play_local,
  play_local: r.default.play_local,
};
