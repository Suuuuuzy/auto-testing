var e = require("../../../../@babel/runtime/helpers/objectSpread2"),
  t = require("../../../../@babel/runtime/helpers/classCallCheck"),
  r = require("../../../../@babel/runtime/helpers/createClass"),
  i = require("./dispatchRequest.js"),
  n = require("./InterceptorManager.js"),
  u = require("./mergeConfig.js"),
  a = require("./defaults.js"),
  l = require("../utils.js"),
  o = require("../utils/clone.js"),
  d = (function () {
    return r(
      function r() {
        var i =
          arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
        t(this, r),
          l.isPlainObject(i) ||
            ((i = {}), console.warn("设置全局参数必须接收一个Object")),
          (this.config = o.clone(e(e({}, a.defaults), i))),
          (this.interceptors = {
            request: new n.InterceptorManager(),
            response: new n.InterceptorManager(),
          });
      },
      [
        {
          key: "setConfig",
          value: function (e) {
            this.config = e(this.config);
          },
        },
        {
          key: "middleware",
          value: function (e) {
            e = u.mergeConfig(this.config, e);
            var t = [i.dispatchRequest, void 0],
              r = Promise.resolve(e);
            for (
              this.interceptors.request.forEach(function (e) {
                t.unshift(e.fulfilled, e.rejected);
              }),
                this.interceptors.response.forEach(function (e) {
                  t.push(e.fulfilled, e.rejected);
                });
              t.length;

            )
              r = r.then(t.shift(), t.shift());
            return r;
          },
        },
        {
          key: "request",
          value: function () {
            var e =
              arguments.length > 0 && void 0 !== arguments[0]
                ? arguments[0]
                : {};
            return this.middleware(e);
          },
        },
        {
          key: "get",
          value: function (t) {
            var r =
              arguments.length > 1 && void 0 !== arguments[1]
                ? arguments[1]
                : {};
            return this.middleware(e({ url: t, method: "GET" }, r));
          },
        },
        {
          key: "post",
          value: function (t, r) {
            var i =
              arguments.length > 2 && void 0 !== arguments[2]
                ? arguments[2]
                : {};
            return this.middleware(e({ url: t, data: r, method: "POST" }, i));
          },
        },
        {
          key: "put",
          value: function (t, r) {
            var i =
              arguments.length > 2 && void 0 !== arguments[2]
                ? arguments[2]
                : {};
            return this.middleware(e({ url: t, data: r, method: "PUT" }, i));
          },
        },
        {
          key: "delete",
          value: function (t, r) {
            var i =
              arguments.length > 2 && void 0 !== arguments[2]
                ? arguments[2]
                : {};
            return this.middleware(e({ url: t, data: r, method: "DELETE" }, i));
          },
        },
        {
          key: "connect",
          value: function (t, r) {
            var i =
              arguments.length > 2 && void 0 !== arguments[2]
                ? arguments[2]
                : {};
            return this.middleware(
              e({ url: t, data: r, method: "CONNECT" }, i)
            );
          },
        },
        {
          key: "head",
          value: function (t, r) {
            var i =
              arguments.length > 2 && void 0 !== arguments[2]
                ? arguments[2]
                : {};
            return this.middleware(e({ url: t, data: r, method: "HEAD" }, i));
          },
        },
        {
          key: "options",
          value: function (t, r) {
            var i =
              arguments.length > 2 && void 0 !== arguments[2]
                ? arguments[2]
                : {};
            return this.middleware(
              e({ url: t, data: r, method: "OPTIONS" }, i)
            );
          },
        },
        {
          key: "trace",
          value: function (t, r) {
            var i =
              arguments.length > 2 && void 0 !== arguments[2]
                ? arguments[2]
                : {};
            return this.middleware(e({ url: t, data: r, method: "TRACE" }, i));
          },
        },
        {
          key: "upload",
          value: function (e) {
            var t =
              arguments.length > 1 && void 0 !== arguments[1]
                ? arguments[1]
                : {};
            return (t.url = e), (t.method = "UPLOAD"), this.middleware(t);
          },
        },
        {
          key: "download",
          value: function (e) {
            var t =
              arguments.length > 1 && void 0 !== arguments[1]
                ? arguments[1]
                : {};
            return (t.url = e), (t.method = "DOWNLOAD"), this.middleware(t);
          },
        },
      ]
    );
  })();
exports.Request = d;
