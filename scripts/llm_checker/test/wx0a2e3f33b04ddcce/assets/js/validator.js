Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.phoneReg =
    exports.msgCodeReg =
    exports.isValidMoney =
    exports.imageCodeReg =
      void 0);
(exports.phoneReg = function (e) {
  return /^[1][3,4,5,6,7,8,9][0-9]{9}$/.test(e);
}),
  (exports.msgCodeReg = function (e) {
    return /^\d{4}$/.test(e);
  }),
  (exports.imageCodeReg = function (e) {
    return /^[a-zA-Z0-9]{4}$/.test(e);
  }),
  (exports.isValidMoney = function (e) {
    return /^[+]{0,1}(\d{1,4})$|^[+]{0,1}(\d{1,4}\.\d{1,2})$/.test(e);
  });
