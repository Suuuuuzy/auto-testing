Object.defineProperty(exports, "__esModule", {
  value: true,
});
exports.getTicket = getTicket;
exports.globalStore = void 0;
exports.updateGlobalStore = updateGlobalStore;
var _sm = require("./sm");
var globalStore = (exports.globalStore = {});
function updateGlobalStore(key, val) {
  globalStore[key] = val;
}
var clientId = "A875480CCF404258A7AB03D4F44B3562";
function getValue(obj) {
  var strs = "";
  for (var str in obj) {
    if (obj[str] || obj[str] === "" || obj[str] === false) {
      strs += str + "=" + obj[str] + "&";
    }
    // 获取到对象中的属性：str 和 对象中的属性值：obj[str]
  }
  // 最终结果
  return strs.substring(0, strs.length - 1);
}
function getTicket(type, params) {
  var data = {
    clientId: clientId,
    sign: (0, _sm.encryptSM2)(
      String(
        clientId +
          "," +
          (params
            ? (0, _sm.encryptSM3)(
                type === "QUERY" ? getValue(params) : JSON.stringify(params)
              )
            : "") +
          "," +
          type
      )
    ),
  };
  return new Promise(function (resolve, reject) {
    //请求数据
    wx.request({
      url: "https://spj.csdsj.net/gateway/api/ticket/getTicketBySign",
      data: data,
      method: "POST",
      success: function success(res) {
        resolve(res);
      },
      fail: function fail() {
        reject();
      },
    });
  });
}
