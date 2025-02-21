var t = require("../common/vendor.js"),
  n = t.createStore({
    state: {
      phone: t.index.getStorageSync("phone"),
      hasLogin: !1,
      userInfo: t.index.getStorageSync("userInfo"),
      isNewUser: !1,
      couponId: null,
      giftInfoId: null,
      tabCurrent: "home",
      scene: "",
      stationName: "永盛石化永泰加油站",
      stationUrl: "",
    },
    getters: {
      phone: function (t) {
        return t.phone;
      },
      get_coupon_id: function (t) {
        return t.couponId;
      },
      get_user_info: function (n) {
        return (
          console.log(n.userInfo, "派发用户信息"),
          t.index.getStorageSync("userInfo")
        );
      },
      getNavigationHeight: function (n) {
        return t.index.getStorageSync("navigationBarHeight") || 40;
      },
      getStatusBarHeight: function (n) {
        return t.index.getStorageSync("statusBarHeight") || 47;
      },
    },
    setters: {},
    mutations: {
      setStatusBarHeight: function (n, e) {
        t.index.setStorageSync("statusBarHeight", e);
      },
      setNavigationBarHeight: function (n, e) {
        t.index.setStorageSync("navigationBarHeight", e);
      },
      setUserInfo: function (n, e) {
        (n.userInfo = e), t.index.setStorageSync("userInfo", e);
      },
      setStationName: function (t, n) {
        t.stationName = n;
      },
      setStationURL: function (t, n) {
        t.stationUrl = n;
      },
      setIsNewUser: function (t, n) {
        t.isNewUser = n;
      },
      updatePhone: function (t, n) {
        t.phone = n;
      },
      updateHasLogin: function (t, n) {
        t.hasLogin = n;
      },
      set_coupon_id: function (t, n) {
        t.couponId = n;
      },
      updateGiftInfoId: function (t, n) {
        t.giftInfoId = n;
      },
      changeTabCurrent: function (t, n) {
        t.tabCurrent = n;
      },
    },
    actions: {
      setHasLogin: function (t, n) {
        (0, t.commit)("updateHasLogin", n);
      },
      setCouponId: function (t, n) {
        (0, t.commit)("updateCouponId", n);
      },
    },
  });
exports.store = n;
