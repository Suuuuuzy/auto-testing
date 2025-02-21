Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.isBoolean = function (e) {
    return "boolean" == typeof e;
  }),
  (exports.isDef = function (e) {
    return null != e;
  }),
  (exports.isFunction = t),
  (exports.isImageUrl = function (e) {
    return n.test(e);
  }),
  (exports.isNumber = function (e) {
    return /^\d+(\.\d+)?$/.test(e);
  }),
  (exports.isObj = function (t) {
    var r = e(t);
    return null !== t && ("object" === r || "function" === r);
  }),
  (exports.isPlainObject = r),
  (exports.isPromise = function (e) {
    return r(e) && t(e.then) && t(e.catch);
  }),
  (exports.isVideoUrl = function (e) {
    return o.test(e);
  });
var e = require("../../../@babel/runtime/helpers/typeof");
function t(e) {
  return "function" == typeof e;
}
function r(t) {
  return null !== t && "object" === e(t) && !Array.isArray(t);
}
var n = /\.(jpeg|jpg|gif|png|svg|webp|jfif|bmp|dpg)/i,
  o = /\.(mp4|mpg|mpeg|dat|asf|avi|rm|rmvb|mov|wmv|flv|mkv)/i;
