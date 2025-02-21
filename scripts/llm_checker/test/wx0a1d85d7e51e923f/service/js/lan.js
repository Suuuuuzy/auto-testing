Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.default = void 0);
var e = require("../../@babel/runtime/helpers/classCallCheck"),
  t = require("../../@babel/runtime/helpers/createClass"),
  n = a(require("../../service/http/request.js")),
  s = a(require("../../service/js/user.js"));
function a(e) {
  return e && e.__esModule ? e : { default: e };
}
var u = Symbol("lan"),
  r = Symbol("has_select_lan_"),
  i = { UY: 1, CH: 0 },
  l = new n.default(),
  o = new s.default();
exports.default = (function () {
  return t(
    function t() {
      e(this, t), (this[u] = "lan_"), (this[r] = "has_select_lan_");
    },
    [
      {
        key: "getLanConst",
        value: function () {
          return i;
        },
      },
      {
        key: "setUy",
        value: function () {
          wx.setStorageSync(this[u], i.UY);
        },
      },
      {
        key: "setCh",
        value: function () {
          wx.setStorageSync(this[u], i.CH);
        },
      },
      {
        key: "getLan",
        value: function () {
          var e = wx.getStorageSync(this[u]);
          return "undefined" === e || "" === e ? i.UY : e;
        },
      },
      {
        key: "switchLan",
        value: function () {
          return (
            this.getLan() === i.UY
              ? (this.setCh(), this.setLan(2))
              : (this.setUy(), this.setLan(1)),
            this.getLan()
          );
        },
      },
      {
        key: "getHasSelectLan",
        value: function () {
          var e = wx.getStorageSync(this[r]);
          return "undefined" !== e && "" !== e && e;
        },
      },
      {
        key: "setHasSelected",
        value: function () {
          wx.setStorageSync(this[r], 1);
        },
      },
      {
        key: "setLan",
        value: function (e) {
          l._post(
            "user/setLan",
            { token: o.getToken(), lan: e },
            function (e) {}
          );
        },
      },
    ]
  );
})();
