Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.querySelectorAll = exports.querySelector = void 0);
(exports.querySelector = function (e) {
  var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : wx;
  return new Promise(function (r, n) {
    t.createSelectorQuery()
      .select(e)
      .boundingClientRect(function (t) {
        t ? r(t) : n("不存在选择器为 ".concat(e, " 的wxml"));
      })
      .exec();
  });
}),
  (exports.querySelectorAll = function (e) {
    var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : wx;
    return new Promise(function (r, n) {
      t.createSelectorQuery()
        .selectAll(e)
        .boundingClientRect(function (t) {
          t && t.length ? r(t) : n("不存在选择器为 ".concat(e, " 的wxml"));
        })
        .exec();
    });
  });
