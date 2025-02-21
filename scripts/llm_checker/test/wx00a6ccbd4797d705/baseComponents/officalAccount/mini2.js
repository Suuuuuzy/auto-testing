(global.webpackJsonp = global.webpackJsonp || []).push([
  ["baseComponents/officalAccount/mini2"],
  {
    "3b9e": function (e, t, a) {
      "use strict";
      a.d(t, "b", function () {
        return s;
      }),
        a.d(t, "c", function () {
          return n;
        }),
        a.d(t, "a", function () {});
      var s = function () {
          this.$createElement, this._self._c;
        },
        n = [];
    },
    "62ea": function (e, t, a) {
      "use strict";
      a.r(t);
      var s = a("f599"),
        n = a.n(s);
      for (var i in s)
        ["default"].indexOf(i) < 0 &&
          (function (e) {
            a.d(t, e, function () {
              return s[e];
            });
          })(i);
      t.default = n.a;
    },
    b127: function (e, t, a) {
      "use strict";
      var s = a("cc67b");
      a.n(s).a;
    },
    b259: function (e, t, a) {
      "use strict";
      a.r(t);
      var s = a("3b9e"),
        n = a("62ea");
      for (var i in n)
        ["default"].indexOf(i) < 0 &&
          (function (e) {
            a.d(t, e, function () {
              return n[e];
            });
          })(i);
      a("b127");
      var u = a("f0c5"),
        c = Object(u.a)(
          n.default,
          s.b,
          s.c,
          !1,
          null,
          "ebdb9e30",
          null,
          !1,
          s.a,
          void 0
        );
      t.default = c.exports;
    },
    cc67b: function (e, t, a) {},
    f599: function (e, t, a) {
      "use strict";
      (function (e) {
        var s = a("4ea4");
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.default = void 0);
        var n = s(a("2309")),
          i = a("ca00"),
          u = s(a("3580")),
          c = s(a("d79b")),
          o = a("532c"),
          r = {
            data: function () {
              return { isSubscribeMember: "0", isIOS: !1 };
            },
            mixins: [u.default, c.default],
            props: {
              appType: { type: String, default: "MEMBER" },
              customStyle: { type: String, default: "" },
              followPublicAccountTips: { type: String, default: "" },
            },
            methods: {
              onPageShow: function () {
                this.isIOS || this.checkUpdate();
              },
              checkUpdate: function () {
                var e;
                ((this.visible = !1),
                n.default.getBusState("updateByOfficial", "SYSTEM")) &&
                  (n.default.setBusState("updateByOfficial", !1, "SYSTEM"),
                  (e =
                    o.instanceTypes.system == this.context
                      ? n.default.getBusState("baseInfo", this.context).mcId
                      : n.default.getBusState("mcId", this.context)),
                  this.updateUserVipInfo(e));
              },
              setUpdateFlag: function () {
                var e = this;
                n.default.getBusState("isVip", "SYSTEM")
                  ? this.isIOS && this.checkUpdate()
                  : this.getCompanySwitch().then(function (t) {
                      0 == t.status &&
                        t.result &&
                        ((e.isSubscribeMember = t.result.isSubscribeMember),
                        "1" == e.isSubscribeMember &&
                          (n.default.setBusState(
                            "updateByOfficial",
                            !0,
                            "SYSTEM"
                          ),
                          e.isIOS && e.checkUpdate()));
                    });
              },
              setDnerInfo: function (e) {
                n.default.setBusState("dinerInfo", e, "SYSTEM", !0);
              },
              makeSureCard: function (e) {
                var t =
                    arguments.length > 1 && void 0 !== arguments[1]
                      ? arguments[1]
                      : "MEMBER",
                  a = arguments.length > 2 ? arguments[2] : void 0;
                return new Promise(function (s, i) {
                  var u = { hasCard: !1 };
                  n.default
                    .getData({ name: "primaryCard", nameSpace: "SYSTEM" })
                    .then(
                      function (i) {
                        if (
                          ((u.message = i.message), 0 == i.status && i.result)
                        )
                          (u.hasCard = !0), (u.cardInfo = i.result), s(u);
                        else {
                          var c = {
                            name: "sendCard",
                            nameSpace: "SYSTEM",
                            params: { mcId: a },
                          };
                          e && (c.params.inviteCode = e),
                            (c.params.appType = t),
                            n.default.getData(c).then(
                              function (e) {
                                if (0 == e.status) {
                                  var t = e.result.crmCardInfo;
                                  t &&
                                    t.length &&
                                    ((u.hasCard = !0),
                                    (u.cardInfo = e.result.crmCardInfo[0])),
                                    n.default.setBusState(
                                      "sellCardFlag",
                                      e.result.sellCardFlag,
                                      "SYSTEM"
                                    ),
                                    (u.message = e.message);
                                } else
                                  (u.hasCard = !1), (u.message = e.message);
                                s(u);
                              },
                              function (e) {
                                s(u);
                              }
                            );
                        }
                      },
                      function (e) {
                        s(u);
                      }
                    );
                });
              },
              signVip: function (e) {
                var t = { dinerSuccess: !1, hasCard: !1 },
                  a = this;
                return new Promise(function (s, i) {
                  n.default
                    .getData({
                      name: "signWxMini",
                      nameSpace: "SYSTEM",
                      params: {
                        appType: a.appType,
                        encryptedPhoneData: "",
                        ivPhone: "",
                        code: "",
                        inviteCode: n.default.getBusState("baseInfo", "SYSTEM")
                          .invitecode,
                        mcId: e || "",
                        mobile: "",
                        mobileArea: "",
                        countryCode: "",
                        sex: "",
                        birthDay: "",
                        oldBit: "",
                      },
                    })
                    .then(
                      function (i) {
                        0 == i.status
                          ? ((t.dinerSuccess = !0),
                            a.setDnerInfo(i.result),
                            a
                              .makeSureCard(
                                n.default.getBusState("baseInfo", "SYSTEM")
                                  .invitecode,
                                a.appType,
                                e
                              )
                              .then(
                                function (e) {
                                  (t.hasCard = e.hasCard),
                                    (t.cardInfo = e.cardInfo),
                                    (t.message = e.message || ""),
                                    t.hasCard
                                      ? (t.status = 0)
                                      : (t.status = -1),
                                    s(t);
                                },
                                function (e) {
                                  s(t);
                                }
                              ))
                          : 110 == i.status
                          ? ((t.dinerSuccess = !1),
                            (t.hasCard = !1),
                            (t.message = "会话超时，请重新授权"),
                            (t.status = 110),
                            s(t))
                          : -1 == i.status &&
                            ((t.dinerSuccess = !1),
                            (t.hasCard = !1),
                            (t.message = "认证失败，请重试"),
                            (t.status = -1),
                            s(t));
                      },
                      function (e) {
                        s(e);
                      }
                    );
                });
              },
              updateUserVipInfo: function (t) {
                var a = this;
                this.signVip(t).then(function (t) {
                  var s = !1,
                    i = !1;
                  t.dinerSuccess
                    ? (t.hasCard
                        ? ((s = !0),
                          (i = !0),
                          a
                            .getSysUser(!0, t.cardInfo.cardNo)
                            .then(function (e) {
                              (e.updateCurrentPage = !0),
                                a.$emit("authComplate", {
                                  type: "mp",
                                  vip: s,
                                  hasOperate: i,
                                  message: t.message,
                                  status: t.status,
                                  showProtocol: !1,
                                }),
                                n.default.emitVipChange(e);
                            }))
                        : ((s = !1),
                          a.$emit("authComplate", {
                            type: "mp",
                            vip: s,
                            hasOperate: i,
                            message: t.message,
                            status: t.status,
                            showProtocol: !1,
                          })),
                      e.$emit("unLockAuth"),
                      e.$emit("offAuth"))
                    : (e.$emit("unLockAuth"),
                      a.$emit("authComplate", {
                        type: "mp",
                        vip: s,
                        hasOperate: i,
                        message: t.message,
                        status: t.status,
                        showProtocol: !1,
                      }));
                });
              },
              getCompanySwitch: function () {
                return n.default.getData({
                  name: "getCompanySwitch",
                  nameSpace: "SYSTEM",
                });
              },
            },
            created: function () {
              n.default.setBusState("updateByOfficial", !1, "SYSTEM"),
                (this.isIOS = "ios" == (0, i.getSystemInfoSync)().platform);
            },
          };
        t.default = r;
      }).call(this, a("543d").default);
    },
  },
]),
  (global.webpackJsonp = global.webpackJsonp || []).push([
    "baseComponents/officalAccount/mini2-create-component",
    {
      "baseComponents/officalAccount/mini2-create-component": function (
        e,
        t,
        a
      ) {
        a("543d").createComponent(a("b259"));
      },
    },
    [["baseComponents/officalAccount/mini2-create-component"]],
  ]);
