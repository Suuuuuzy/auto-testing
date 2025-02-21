Object.defineProperty(exports, "__esModule", {
  value: true,
});
exports.addAppLog = addAppLog;
exports.fetchUserInfo = fetchUserInfo;
exports.getTicket = getTicket;
var _regeneratorRuntime2 = require("../../@babel/runtime/helpers/regeneratorRuntime");
var _asyncToGenerator2 = require("../../@babel/runtime/helpers/asyncToGenerator");
function getTicket() {
  return request
    .get("/api/ticket/getTicket", {
      clientId: "41CBADC9553446A88D971832798E295A",
      clientSecret: "8DFDD1C1967C47B299CAACDC81C70DB2",
    })
    .then(function (res) {
      return res;
    });
}
function fetchUserInfo(_x, _x2) {
  return _fetchUserInfo.apply(this, arguments);
}
function _fetchUserInfo() {
  _fetchUserInfo = _asyncToGenerator2(
    /*#__PURE__*/ _regeneratorRuntime2().mark(function _callee(data, headers) {
      var res;
      return _regeneratorRuntime2().wrap(function _callee$(_context) {
        while (1)
          switch ((_context.prev = _context.next)) {
            case 0:
              _context.next = 2;
              return getTicket();
            case 2:
              res = _context.sent;
              return _context.abrupt(
                "return",
                request
                  .get("/api/commonUser/findById", data, {
                    "Content-Type": "application/json; charset=utf-8",
                    "X-API-TICKET": res.ticket,
                  })
                  .then(function (res) {
                    return res.data;
                  })
              );
            case 4:
            case "end":
              return _context.stop();
          }
      }, _callee);
    })
  );
  return _fetchUserInfo.apply(this, arguments);
}
function addAppLog(data) {
  return new Promise(function (resolve, reject) {
    wx.request({
      url: "https://spj.csdsj.net/allinone/allinone-api/api/log/app/create",
      method: "POST",
      header: {
        "content-type": "application/x-www-form-urlencoded",
      },
      data: data,
      success: function success(res) {
        resolve(res);
      },
      fail: function fail(error) {
        reject(error);
      },
    });
  });
}
