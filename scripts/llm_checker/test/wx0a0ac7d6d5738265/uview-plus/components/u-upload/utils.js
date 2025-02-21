var e = require("../../../@babel/runtime/helpers/objectSpread2");
require("../../../@babel/runtime/helpers/Arrayincludes");
var t = require("../../../common/vendor.js");
function i(e, t) {
  return ["[object Object]", "[object File]"].includes(
    Object.prototype.toString.call(e)
  )
    ? Object.keys(e).reduce(function (i, r) {
        return t.includes(r) || (i[r] = e[r]), i;
      }, {})
    : {};
}
function r(t) {
  return t.tempFiles.map(function (t) {
    return e(e({}, i(t, ["path"])), {}, { url: t.path, size: t.size });
  });
}
exports.chooseFile = function (u) {
  var n = u.accept,
    c = u.multiple,
    a = u.capture,
    s = u.compressed,
    o = u.maxDuration,
    p = u.sizeType,
    m = u.camera,
    l = u.maxCount;
  return new Promise(function (u, h) {
    switch (n) {
      case "image":
        t.index.chooseImage({
          count: c ? Math.min(l, 9) : 1,
          sourceType: a,
          sizeType: p,
          success: function (t) {
            return u(
              (function (t) {
                return t.tempFiles.map(function (t) {
                  return e(
                    e({}, i(t, ["path"])),
                    {},
                    { type: "image", url: t.path, thumb: t.path, size: t.size }
                  );
                });
              })(t)
            );
          },
          fail: h,
        });
        break;
      case "media":
        t.wx$1.chooseMedia({
          count: c ? Math.min(l, 9) : 1,
          sourceType: a,
          maxDuration: o,
          sizeType: p,
          camera: m,
          success: function (t) {
            return u(
              (function (t) {
                return t.tempFiles.map(function (r) {
                  return e(
                    e(
                      {},
                      i(r, ["fileType", "thumbTempFilePath", "tempFilePath"])
                    ),
                    {},
                    {
                      type: t.type,
                      url: r.tempFilePath,
                      thumb:
                        "video" === t.type
                          ? r.thumbTempFilePath
                          : r.tempFilePath,
                      size: r.size,
                    }
                  );
                });
              })(t)
            );
          },
          fail: h,
        });
        break;
      case "video":
        t.index.chooseVideo({
          sourceType: a,
          compressed: s,
          maxDuration: o,
          camera: m,
          success: function (t) {
            return u(
              (function (t) {
                return [
                  e(
                    e(
                      {},
                      i(t, ["tempFilePath", "thumbTempFilePath", "errMsg"])
                    ),
                    {},
                    {
                      type: "video",
                      url: t.tempFilePath,
                      thumb: t.thumbTempFilePath,
                      size: t.size,
                    }
                  ),
                ];
              })(t)
            );
          },
          fail: h,
        });
        break;
      case "file":
        t.wx$1.chooseMessageFile({
          count: c ? l : 1,
          type: n,
          success: function (e) {
            return u(r(e));
          },
          fail: h,
        });
        break;
      default:
        t.wx$1.chooseMessageFile({
          count: c ? l : 1,
          type: "all",
          success: function (e) {
            return u(r(e));
          },
          fail: h,
        });
    }
  });
};
