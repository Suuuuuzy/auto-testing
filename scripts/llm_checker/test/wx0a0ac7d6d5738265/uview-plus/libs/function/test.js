var t = require("../../../@babel/runtime/helpers/typeof");
function n(t) {
  return /^[\+-]?(\d+\.?\d*|\.\d+|\d\.\d+e\+\d+)$/.test(t);
}
function e(n) {
  switch (t(n)) {
    case "undefined":
      return !0;
    case "string":
      if (0 == n.replace(/(^[ \t\n\r]*)|([ \t\n\r]*$)/g, "").length) return !0;
      break;
    case "boolean":
      if (!n) return !0;
      break;
    case "number":
      if (0 === n || isNaN(n)) return !0;
      break;
    case "object":
      if (null === n || 0 === n.length) return !0;
      for (var e in n) return !1;
      return !0;
  }
  return !1;
}
function r(t) {
  return "[object Object]" === Object.prototype.toString.call(t);
}
function u(t) {
  return "function" == typeof t;
}
var i = {
  email: function (t) {
    return /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/.test(
      t
    );
  },
  mobile: function (t) {
    return /^1[23456789]\d{9}$/.test(t);
  },
  url: function (t) {
    return /^((https|http|ftp|rtsp|mms):\/\/)(([0-9a-zA-Z_!~*'().&=+$%-]+: )?[0-9a-zA-Z_!~*'().&=+$%-]+@)?(([0-9]{1,3}.){3}[0-9]{1,3}|([0-9a-zA-Z_!~*'()-]+.)*([0-9a-zA-Z][0-9a-zA-Z-]{0,61})?[0-9a-zA-Z].[a-zA-Z]{2,6})(:[0-9]{1,4})?((\/?)|(\/[0-9a-zA-Z_!~*'().;?:@&=+$,%#-]+)+\/?)$/.test(
      t
    );
  },
  date: function (t) {
    return (
      !!t && (n(t) && (t = +t), !/Invalid|NaN/.test(new Date(t).toString()))
    );
  },
  dateISO: function (t) {
    return /^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$/.test(
      t
    );
  },
  number: n,
  digits: function (t) {
    return /^\d+$/.test(t);
  },
  idCard: function (t) {
    return /^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/.test(
      t
    );
  },
  carNo: function (t) {
    return 7 === t.length
      ? /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[A-HJ-NP-Z0-9]{4}[A-HJ-NP-Z0-9挂学警港澳]{1}$/.test(
          t
        )
      : 8 === t.length &&
          /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}(([0-9]{5}[DF]$)|([DF][A-HJ-NP-Z0-9][0-9]{4}$))/.test(
            t
          );
  },
  amount: function (t) {
    return /^[1-9]\d*(,\d{3})*(\.\d{1,2})?$|^0\.\d{1,2}$/.test(t);
  },
  chinese: function (t) {
    return /^[\u4e00-\u9fa5]+$/gi.test(t);
  },
  letter: function (t) {
    return /^[a-zA-Z]*$/.test(t);
  },
  enOrNum: function (t) {
    return /^[0-9a-zA-Z]*$/g.test(t);
  },
  contains: function (t, n) {
    return t.indexOf(n) >= 0;
  },
  range: function (t, n) {
    return t >= n[0] && t <= n[1];
  },
  rangeLength: function (t, n) {
    return t.length >= n[0] && t.length <= n[1];
  },
  empty: e,
  isEmpty: e,
  jsonString: function (n) {
    if ("string" == typeof n)
      try {
        var e = JSON.parse(n);
        return !("object" != t(e) || !e);
      } catch (t) {
        return !1;
      }
    return !1;
  },
  landline: function (t) {
    return /^\d{3,4}-\d{7,8}(-\d{3,4})?$/.test(t);
  },
  object: r,
  array: function (t) {
    return "function" == typeof Array.isArray
      ? Array.isArray(t)
      : "[object Array]" === Object.prototype.toString.call(t);
  },
  code: function (t) {
    var n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 6;
    return new RegExp("^\\d{".concat(n, "}$")).test(t);
  },
  func: u,
  promise: function (t) {
    return r(t) && u(t.then) && u(t.catch);
  },
  video: function (t) {
    return /\.(mp4|mpg|mpeg|dat|asf|avi|rm|rmvb|mov|wmv|flv|mkv|m3u8)/i.test(t);
  },
  image: function (t) {
    var n = t.split("?")[0];
    return /\.(jpeg|jpg|gif|png|svg|webp|jfif|bmp|dpg)/i.test(n);
  },
  regExp: function (t) {
    return t && "[object RegExp]" === Object.prototype.toString.call(t);
  },
  string: function (t) {
    return "string" == typeof t;
  },
};
exports.test = i;
