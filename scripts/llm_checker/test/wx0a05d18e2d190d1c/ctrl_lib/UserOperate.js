function e() {
  try {
    wx.removeStorageSync("access_token"),
      wx.removeStorageSync("refresh_token"),
      wx.removeStorageSync("avatar"),
      wx.removeStorageSync("nickname"),
      wx.removeStorageSync("token_type"),
      console.log("清除数据:...");
  } catch (e) {
    console.log("清除数据错误:" + e);
  }
}
function t() {
  return wx.getStorageSync("login_name", "");
}
function n() {
  try {
    var e = t() + "--" + c,
      n = wx.getStorageSync(e);
    if (void 0 != n && "" != n) return JSON.parse(n);
  } catch (e) {
    console.log(JSON.stringify(e));
  }
}
function r(e) {
  try {
    var n = t() + "--" + c;
    void 0 == e
      ? wx.removeStorageSync(n)
      : wx.setStorageSync(n, JSON.stringify(e));
  } catch (e) {
    console.log(JSON.stringify(e));
  }
  void 0 != o && o(e);
}
var o,
  a = "key_car_list",
  c = "key_car_current",
  s = "key_start_time";
module.exports = {
  saveUserData: function (e) {
    try {
      console.log("saveUserData:" + JSON.stringify(e)),
        wx.setStorageSync("access_token", e.access_token),
        wx.setStorageSync("refresh_token", e.refresh_token),
        wx.setStorageSync("avatar", e.avatar),
        wx.setStorageSync("nickname", e.nickname),
        wx.setStorageSync("token_type", e.token_type),
        wx.setStorageSync("user_password", e.password);
    } catch (e) {
      console.log(e);
    }
  },
  clearUserData: e,
  getToken: function () {
    return wx.getStorageSync("access_token");
  },
  setLoginName: function (e) {
    wx.setStorageSync("login_name", e);
  },
  getLoginName: t,
  setCarList: function (e) {
    try {
      void 0 == e
        ? wx.removeStorageSync(a)
        : wx.setStorageSync(a, JSON.stringify(e)),
        (void 0 == n()) & (void 0 != e) && r(e[0]);
    } catch (e) {
      console.log(JSON.stringify(e));
    }
  },
  getCarList: function () {
    try {
      var e = wx.getStorageSync(a);
      if (void 0 != e || "" != e) return JSON.parse(e);
    } catch (e) {}
  },
  setCurrentCar: r,
  getCurrentCar: n,
  getStartTime: function () {
    try {
      var e = wx.getStorageSync(s);
      return (void 0 != e && "" != e) || (e = 10), e;
    } catch (e) {
      return 10;
    }
  },
  setStartTime: function (e) {
    try {
      wx.setStorageSync(s, e);
    } catch (e) {
      console.log("setStartTime....失败");
    }
  },
  getPassword: function () {
    return wx.getStorageSync("user_password");
  },
  isLogin: function () {
    return 1 == wx.getStorageSync("is_login");
  },
  setLogin: function (t) {
    wx.setStorageSync("is_login", t ? 1 : 0), 0 == t && e();
  },
  set_on_current_car_change_listener: function (e) {
    o = e;
  },
};
