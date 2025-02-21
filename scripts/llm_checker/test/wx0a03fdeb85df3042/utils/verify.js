var _typeof2 = require("../@babel/runtime/helpers/typeof");
var verify = {
  /**
   * 判断元素是否为空
   * @param {Object} v
   */
  isEmpty: function isEmpty(v) {
    switch (_typeof2(v)) {
      case "undefined":
        return true;
      case "string":
        if (v.replace(/(^[ \t\n\r]*)|([ \t\n\r]*$)/g, "").length == 0)
          return true;
        break;
      case "boolean":
        if (!v) return true;
        break;
      case "number":
        if (0 === v || isNaN(v)) return true;
        break;
      case "object":
        if (null === v || v.length === 0) return true;
        for (var i in v) {
          return false;
        }
        return true;
    }
    return false;
  },
  /**
   * @param {Object} tel
   * 手机号验证
   */
  isTel: function isTel(tel) {
    var format = /^1[3456789]\d{9}$/;
    if (!format.test(tel)) {
      return false;
    }
    return true;
  },
  /**
   * @param {Object} postalCode
   * 邮政编码格式验证
   */
  isPostalCode: function isPostalCode(postalCode) {
    var format = /^[1-9][0-9]{5}$/;
    if (!format.test(postalCode)) {
      return false;
    }
    return true;
  },
  /**
   * @param {Object} idCard
   * 身份证号验证 15/18位
   */
  isIDCard: function isIDCard(idCard) {
    var format =
      /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/;
    if (!format.test(idCard)) {
      return false;
    }
    return true;
  },
};
module.exports.verify = verify;
