(global.webpackJsonp = global.webpackJsonp || []).push([
  ["baseComponents/log/index"],
  {
    1720: function (e, t, n) {},
    "1ac7": function (e, t, n) {
      "use strict";
      n.d(t, "b", function () {
        return o;
      }),
        n.d(t, "c", function () {
          return a;
        }),
        n.d(t, "a", function () {});
      var o = function () {
          this.$createElement, this._self._c;
        },
        a = [];
    },
    "426c": function (e, t, n) {
      "use strict";
      n.r(t);
      var o = n("d215"),
        a = n.n(o);
      for (var i in o)
        ["default"].indexOf(i) < 0 &&
          (function (e) {
            n.d(t, e, function () {
              return o[e];
            });
          })(i);
      t.default = a.a;
    },
    "4d55": function (e, t, n) {
      "use strict";
      n.r(t);
      var o = n("1ac7"),
        a = n("426c");
      for (var i in a)
        ["default"].indexOf(i) < 0 &&
          (function (e) {
            n.d(t, e, function () {
              return a[e];
            });
          })(i);
      n("9aae");
      var c = n("f0c5"),
        u = Object(c.a)(
          a.default,
          o.b,
          o.c,
          !1,
          null,
          null,
          null,
          !1,
          o.a,
          void 0
        );
      t.default = u.exports;
    },
    "9aae": function (e, t, n) {
      "use strict";
      var o = n("1720");
      n.n(o).a;
    },
    d215: function (e, t, n) {
      "use strict";
      (function (e) {
        var o = n("4ea4");
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.default = void 0);
        var a = o(n("2309")),
          i = n("ca00"),
          c = o(n("295b")),
          u = {
            data: function () {
              return {
                debug: !!a.default.getBusState("debug", "SYSTEM"),
                activeLogIndex: -1,
                localkeyIndex: -1,
                logValue: "",
                show: !1,
                publishTime: i.publishTime,
                localKeys: [],
                proTempalte: "",
                mcid: "",
                tableno: "",
                headerVersion: "",
              };
            },
            mounted: function () {
              this.headerVersion = c.default.headerVersion;
            },
            created: function () {
              this.proTempalte = "msgj";
            },
            methods: {
              getPrivacySetting: function () {
                if (wx.canIUse("getPrivacySetting")) {
                  var e = this;
                  wx.getPrivacySetting({
                    success: function (t) {
                      e.logValue = JSON.stringify(t);
                    },
                  });
                }
              },
              showPackage: function () {
                e.navigateTo({ url: "/pages/logs/packDes" });
              },
              downloadFont: function (t) {
                t &&
                  ((0, i.setStorageSync)("dubugFont" + c.default.baseKey, t),
                  e.showToast({
                    title: "设置成功，请重新进入",
                    icon: "none",
                    duration: 2500,
                  }));
              },
              sendLog: function () {},
              changeToken: function () {
                var e = a.default.getBusState("token", "SYSTEM");
                a.default.setBusState("token", e + "666", "SYSTEM");
              },
              changeTokenTime: function () {
                var t = e.getStorageSync("authData" + c.default.baseKey),
                  n = t.exp;
                (t.loginTime = new Date().getTime() - n),
                  e.setStorageSync("authData" + c.default.baseKey, t);
              },
              entryModel: function (t) {
                var n = "",
                  o = "";
                if (this.mcid) {
                  1 == t
                    ? ((n = "DC"), (o = this.tableno))
                    : 2 == t
                    ? (n = "WM")
                    : 3 == t && (n = "ZT");
                  var a = "context=".concat(n, "&mcid=").concat(this.mcid);
                  o && (a += "&tableno=" + o),
                    e.reLaunch({ url: "/pages/index/index?".concat(a) });
                }
              },
              getRlog: function () {
                e.navigateTo({ url: "/pages/logs/runTime" });
              },
              showStore: function () {
                e.navigateTo({ url: "/pages/logs/storeData" });
              },
              openOrgDebug2: function () {},
              getLocalData: function (t, n) {
                (this.logValue = JSON.stringify(e.getStorageSync(t))),
                  (this.localkeyIndex = n);
              },
              getConfig: function () {
                var e = my.getExtConfigSync();
                this.logValue = JSON.stringify(e);
              },
              getConfig2: function () {
                var e = wx.getExtConfigSync();
                this.logValue = JSON.stringify(e);
              },
              getStoreData: function () {
                var t = this;
                t.localKeys = [];
                var n = e.getStorageInfoSync();
                console.log(n),
                  n.keys.length
                    ? n.keys.forEach(function (e) {
                        t.localKeys.push(e);
                      })
                    : (t.localKeys = []);
              },
              clearStoreData: function () {
                e.clearStorageSync(), (this.localKeys = []);
              },
              showTotalLogs: function () {
                e.navigateTo({ url: "/pages/logs/interFace" });
              },
              showlogContent: function (e) {
                this.show = e;
              },
              showLog: function (e) {
                this.logs[e]
                  ? ((this.logValue = JSON.stringify(this.logs[e])),
                    (this.activeLogIndex = e))
                  : (this.logValue = "暂无日志");
              },
              closeDebug: function () {
                (0, i.removeStorageSync)(c.default.debugKey),
                  (this.debug = !1),
                  a.default.getBusState("debug", !1, "SYSTEM");
              },
              openOrgDebug: function () {
                e.setEnableDebug({ enableDebug: !0 });
              },
            },
          };
        t.default = u;
      }).call(this, n("543d").default);
    },
  },
]),
  (global.webpackJsonp = global.webpackJsonp || []).push([
    "baseComponents/log/index-create-component",
    {
      "baseComponents/log/index-create-component": function (e, t, n) {
        n("543d").createComponent(n("4d55"));
      },
    },
    [["baseComponents/log/index-create-component"]],
  ]);
