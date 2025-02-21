var e = require("../@babel/runtime/helpers/objectSpread2"),
  i = require("../common/vendor.js"),
  r = require("./libs/mixin/mixin.js"),
  o = require("./libs/mixin/mpMixin.js"),
  n = require("./libs/luch-request/core/Request.js"),
  t = require("./libs/util/route.js"),
  s = require("./libs/function/colorGradient.js"),
  l = require("./libs/function/test.js"),
  u = require("./libs/function/debounce.js"),
  c = require("./libs/function/throttle.js"),
  b = require("./libs/function/index.js"),
  a = require("./libs/config/config.js"),
  x = require("./libs/config/props.js"),
  f = require("./libs/config/zIndex.js"),
  d = require("./libs/config/color.js"),
  p = require("./libs/function/platform.js"),
  m = e(
    e(
      {
        route: t.route,
        date: b.index.timeFormat,
        colorGradient: s.colorGradient.colorGradient,
        hexToRgb: s.colorGradient.hexToRgb,
        rgbToHex: s.colorGradient.rgbToHex,
        colorToRgba: s.colorGradient.colorToRgba,
        test: l.test,
        type: ["primary", "success", "error", "warning", "info"],
        http: new n.Request(),
        config: a.config,
        zIndex: f.zIndex,
        debounce: u.debounce,
        throttle: c.throttle,
        mixin: r.mixin,
        mpMixin: o.mpMixin,
        props: x.defprops,
      },
      b.index
    ),
    {},
    { color: d.color, platform: p.platform }
  );
i.index.$u = m;
var q = {
  install: function (e) {
    (e.config.globalProperties.$u = m),
      (e.config.globalProperties.$nextTick = function (e) {
        e();
      }),
      e.mixin(r.mixin);
  },
};
exports.uviewPlus = q;
