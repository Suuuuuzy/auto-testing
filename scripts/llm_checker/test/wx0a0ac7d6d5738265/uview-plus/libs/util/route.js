var e = require("../../../@babel/runtime/helpers/regeneratorRuntime"),
  t = require("../../../@babel/runtime/helpers/asyncToGenerator"),
  n = require("../../../@babel/runtime/helpers/classCallCheck"),
  r = require("../../../@babel/runtime/helpers/createClass"),
  a = require("../../../common/vendor.js"),
  i = new ((function () {
    return r(
      function e() {
        n(this, e),
          (this.config = {
            type: "navigateTo",
            url: "",
            delta: 1,
            params: {},
            animationType: "pop-in",
            animationDuration: 300,
            intercept: !1,
          }),
          (this.route = this.route.bind(this));
      },
      [
        {
          key: "addRootPath",
          value: function (e) {
            return "/" === e[0] ? e : "/".concat(e);
          },
        },
        {
          key: "mixinParam",
          value: function (e, t) {
            e = e && this.addRootPath(e);
            var n = "";
            return /.*\/.*\?.*=.*/.test(e)
              ? ((n = a.index.$u.queryParams(t, !1)), (e += "&".concat(n)))
              : (e += n = a.index.$u.queryParams(t));
          },
        },
        {
          key: "route",
          value:
            ((i = t(
              e().mark(function t() {
                var n,
                  r,
                  i,
                  u = arguments;
                return e().wrap(
                  function (e) {
                    for (;;)
                      switch ((e.prev = e.next)) {
                        case 0:
                          if (
                            ((n = u.length > 0 && void 0 !== u[0] ? u[0] : {}),
                            (r = u.length > 1 && void 0 !== u[1] ? u[1] : {}),
                            (i = {}),
                            "string" == typeof n
                              ? ((i.url = this.mixinParam(n, r)),
                                (i.type = "navigateTo"))
                              : ((i = a.index.$u.deepMerge(
                                  this.config,
                                  n
                                )).url = this.mixinParam(n.url, n.params)),
                            (e.t0 = i.url !== a.index.$u.page()),
                            !e.t0)
                          ) {
                            e.next = 18;
                            break;
                          }
                          if (
                            (r.intercept &&
                              (this.config.intercept = r.intercept),
                            (i.params = r),
                            (i = a.index.$u.deepMerge(this.config, i)),
                            "function" != typeof a.index.$u.routeIntercept)
                          ) {
                            e.next = 17;
                            break;
                          }
                          return (
                            (e.next = 12),
                            new Promise(function (e, t) {
                              a.index.$u.routeIntercept(i, e);
                            })
                          );
                        case 12:
                          if (((e.t1 = e.sent), !e.t1)) {
                            e.next = 15;
                            break;
                          }
                          this.openPage(i);
                        case 15:
                          e.next = 18;
                          break;
                        case 17:
                          this.openPage(i);
                        case 18:
                        case "end":
                          return e.stop();
                      }
                  },
                  t,
                  this
                );
              })
            )),
            function () {
              return i.apply(this, arguments);
            }),
        },
        {
          key: "openPage",
          value: function (e) {
            var t = e.url,
              n = (e.type, e.delta),
              r = e.animationType,
              i = e.animationDuration;
            ("navigateTo" == e.type || "to" == e.type) &&
              a.index.navigateTo({
                url: t,
                animationType: r,
                animationDuration: i,
              }),
              ("redirectTo" == e.type || "redirect" == e.type) &&
                a.index.redirectTo({ url: t }),
              ("switchTab" == e.type || "tab" == e.type) &&
                a.index.switchTab({ url: t }),
              ("reLaunch" == e.type || "launch" == e.type) &&
                a.index.reLaunch({ url: t }),
              ("navigateBack" == e.type || "back" == e.type) &&
                a.index.navigateBack({ delta: n });
          },
        },
      ]
    );
    var i;
  })())().route;
exports.route = i;
