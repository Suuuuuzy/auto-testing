(global.webpackJsonp = global.webpackJsonp || []).push([
  ["baseComponents/authBtn2/index"],
  {
    5196: function (e, t, o) {
      "use strict";
      o.r(t);
      var a = o("ed5e"),
        s = o.n(a);
      for (var n in a)
        ["default"].indexOf(n) < 0 &&
          (function (e) {
            o.d(t, e, function () {
              return a[e];
            });
          })(n);
      t.default = s.a;
    },
    b5c8: function (e, t, o) {
      "use strict";
      var a = o("e3a6");
      o.n(a).a;
    },
    ba95: function (e, t, o) {
      "use strict";
      o.d(t, "b", function () {
        return a;
      }),
        o.d(t, "c", function () {
          return s;
        }),
        o.d(t, "a", function () {});
      var a = function () {
          this.$createElement, this._self._c;
        },
        s = [];
    },
    e3a6: function (e, t, o) {},
    ed5e: function (e, t, o) {
      "use strict";
      (function (e) {
        var a = o("4ea4");
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.default = void 0);
        var s = a(o("2309")),
          n = o("db0a"),
          i = a(o("d79b")),
          u = o("9f15"),
          r = a(o("e8e3")),
          c = a(o("461a")),
          h = o("ca00"),
          l = a(o("295b")),
          p = o("9861"),
          m = a(o("038e")),
          d = null,
          f = {
            name: "authBtn",
            mixins: [i.default, c.default, m.default],
            props: {
              openType: { type: String, default: "getPhoneNumber" },
              styleStr: { type: String, default: "" },
              appType: { type: String, default: "" },
              isAuthBiz: { type: Boolean, default: !0 },
              isOpenForceAuth: { type: Boolean, default: !0 },
              isSignedToRegCard: { type: Boolean, default: !1 },
              method: { type: String, default: "1" },
              context: { type: String, default: "" },
              query: { type: String, default: "" },
              jumpModel: { type: String, default: "1" },
              leaveBackPage: { type: String, default: "" },
              mcId: { type: String, default: "" },
            },
            data: function () {
              return {
                needAuth: 0,
                hideBtn: !1,
                locked: !1,
                hasOpenAliAddcard: !1,
                mobile: "",
                mobileArea: "",
                countryCode: "",
                agreeVersion: "",
                goIdentificationPage: !1,
                hasleftMpCallNum: !0,
                phoneSignKey: "",
              };
            },
            created: function () {
              (this.agreeVersion = s.default.getBusState(
                "agreeVersion",
                "SYSTEM"
              )),
                e.$once("agreeVersion", this.agreeVersionFun);
              var t =
                  s.default.getDecorate("SYSTEM").decorationData.commonSet
                    .identification,
                o = s.default.getCurrentPage().page;
              "pageD" == t.template &&
                "identification" !== o &&
                (this.goIdentificationPage = !0);
            },
            mounted: function () {
              var t = this;
              r.default
                .getDiner(
                  this.appType,
                  this.isAuthBiz,
                  this.isOpenForceAuth,
                  this.isSignedToRegCard
                )
                .then(function (o) {
                  (t.needAuth = o.needAuth),
                    t.needAuth
                      ? (r.default.checkProtocol({
                          mcId: t.mcId,
                          context: t.context,
                        }),
                        t.$emit("isNeedAuth", !0),
                        e.$once("offAuth", t.offAuth),
                        e.$on("beginLock", t.lockAuth),
                        e.$on("unLockAuth", t.unLockAuth),
                        e.$on("userRejectAuth", t.userRejectAuth))
                      : t.$emit("isNeedAuth", !1);
                });
            },
            methods: {
              agreeVersionFun: function () {
                this.agreeVersion = s.default.getBusState(
                  "agreeVersion",
                  "SYSTEM"
                );
              },
              goPrivacyRights: function () {
                this.toPage({
                  context: "SYSTEM",
                  page: "privacyRightsPopup",
                  query: "backFlg=1&ver=".concat(this.agreeVersion),
                });
              },
              toAuthPage: function () {
                var t = this,
                  o =
                    s.default.getDecorate("SYSTEM").decorationData.commonSet
                      .identification,
                  a = {
                    page: "identification",
                    context: "SYSTEM",
                    events: {
                      authSuccess: function () {
                        e.$emit("unLockAuth"), e.$emit("offAuth");
                      },
                    },
                  };
                if ("pageB" == o.template) {
                  this.query
                    ? (a.query = this.query + "&jumpModel=" + this.jumpModel)
                    : (a.query = "jumpModel=".concat(this.jumpModel));
                  var n,
                    i,
                    u,
                    r = (0, h.stringQuery2Obj)(this.query) || {},
                    c = Object.keys(r);
                  "2" == this.jumpModel
                    ? ((n = 2), (u = this.context), (i = this.leaveBackPage))
                    : ((n = 1),
                      (u = r.context || r.fromContext),
                      (i = r.page || r.to || r.fromPage)),
                    (a.leaveSet = {
                      model: n,
                      page: i,
                      replace: !1,
                      context: u,
                      queryKeys: [
                        "type",
                        "vip",
                        "hasOperate",
                        "message",
                        "status",
                        "showProtocol",
                      ].concat(c),
                      toRules: !!r.fromrule,
                      routerRules: ["updateDiner", "updateCardSingle"],
                      successCb: function (e) {
                        t.$emit("authComplate", {
                          type: e.type,
                          vip: e.vip,
                          hasOperate: e.hasOperate,
                          message: e.message,
                          status: e.status,
                          showProtocol: e.showProtocol,
                        });
                      },
                    });
                } else if ("pageD" == o.template) {
                  this.query
                    ? (a.query = this.query + "&jumpModel=2")
                    : (a.query = "jumpModel=2");
                  var l = (0, h.stringQuery2Obj)(this.query) || {},
                    p = Object.keys(l),
                    m = s.default.getCurrentPage(),
                    d = m.page,
                    f = m.context;
                  a.leaveSet = {
                    model: 2,
                    page: d,
                    replace: !1,
                    context: f,
                    queryKeys: [
                      "type",
                      "vip",
                      "hasOperate",
                      "message",
                      "status",
                      "showProtocol",
                    ].concat(p),
                    toRules: !!l.fromrule,
                    routerRules: ["updateDiner", "updateCardSingle"],
                    successCb: function (e) {
                      t.$emit("authComplate", {
                        type: e.type,
                        vip: e.vip,
                        hasOperate: e.hasOperate,
                        message: e.message,
                        status: e.status,
                        showProtocol: e.showProtocol,
                      });
                    },
                  };
                } else
                  this.query
                    ? (a.query = this.query + "&jumpModel=" + this.jumpModel)
                    : (a.query = "jumpModel=".concat(this.jumpModel));
                this.toPage(a);
              },
              lockAuth: function () {
                this.locked = !0;
              },
              unLockAuth: function () {
                this.locked = !1;
              },
              offAuth: function () {
                (this.needAuth = !1),
                  this.$emit("isNeedAuth", !1),
                  e.$off(["beginLock", "unLockAuth"]),
                  console.log("认证成功， offauth解除");
              },
              userRejectAuth: function () {
                this.$emit("userRejectAuth");
              },
              setRefusePhone: function () {
                s.default.setBusState("refusePhoneAuth", !0, "SYSTEM"),
                  e.setStorage({ key: l.default.refusePhoneAuthKey, data: !0 });
              },
              h5Show: function () {
                this.$emit("authBegin", {
                  type: "h5",
                  showProtocol: r.default.showProtocol,
                  protocolType: r.default.showProtocolType,
                });
              },
              onAuthError: function (e) {
                console.log("失败了", e),
                  (0, u.addRlog)("al手机授权失败:".concat(JSON.stringify(e))),
                  this.$emit("authComplate", {
                    type: "mp",
                    vip: !1,
                    hasOperate: !1,
                    message: "用户拒绝手机号授权",
                    status: 100,
                    showProtocol: !1,
                  });
              },
              getPhoneNum: function (e) {
                return s.default.getData({
                  name: "getWechatPhoneInfo",
                  nameSpace: "SYSTEM",
                  params: {
                    encryptedPhoneData: e.detail.encryptedData,
                    ivPhone: e.detail.iv,
                    code: e.detail.code,
                  },
                });
              },
              getProtocolInfo: function (t) {
                var o = this;
                if (
                  (console.log(t, "------evt"),
                  s.default.getData({
                    name: "statisticsMobileAuth",
                    nameSpace: "SYSTEM",
                    params: {
                      mcId:
                        t.mcId || s.default.getBusState("mcId", this.context),
                    },
                  }),
                  !t.btnClick || (t.protocolFlg && !t.isAccept))
                )
                  return (
                    e.$off("sendAuth", this.getProtocolInfo),
                    void e.$emit("unLockAuth")
                  );
                this.$emit("authBegin", { type: "mp" }),
                  d
                    .createAuth(
                      this.context,
                      t,
                      this.mobile,
                      this.mobileArea,
                      this.countryCode,
                      this.phoneSignKey
                    )
                    .then(function (t) {
                      console.log(t);
                      var a = !1,
                        n = !1;
                      t.dinerSuccess
                        ? (t.hasCard
                            ? ((a = !0),
                              (n = !0),
                              o
                                .getSysUser(!0, t.cardInfo.cardNo)
                                .then(function (e) {
                                  o.$emit("authComplate", {
                                    type: "mp",
                                    vip: a,
                                    hasOperate: n,
                                    message: t.message,
                                    status: t.status,
                                    showProtocol: !1,
                                  }),
                                    s.default.emitVipChange(e);
                                }))
                            : ((a = !1),
                              o.$emit("authComplate", {
                                type: "mp",
                                vip: a,
                                hasOperate: n,
                                message: t.message,
                                status: t.status,
                                showProtocol: !1,
                              })),
                          e.$emit("unLockAuth"),
                          e.$emit("offAuth"))
                        : (e.$emit("unLockAuth"),
                          o.$emit("authComplate", {
                            type: "mp",
                            vip: a,
                            hasOperate: n,
                            message: t.message,
                            status: t.status,
                            showProtocol: !1,
                          }));
                    });
              },
              noMobile2VIP: function () {
                var t = this;
                if (
                  ((d = new n.PhoneAuth(
                    {
                      detail: {
                        encryptedData: "",
                        iv: "",
                        code: "",
                        errMsg: "",
                      },
                    },
                    this.appType
                  )),
                  r.default.showProtocol)
                ) {
                  e.$once("sendAuth", this.getProtocolInfo);
                  var o = {
                    type: "mp",
                    vip: !1,
                    hasOperate: !1,
                    message: "",
                    status: 0,
                    showProtocol: !0,
                    mobile: "",
                    protocolType: r.default.showProtocolType,
                  };
                  this.$emit("authComplate", o);
                } else
                  this.$emit("authBegin", { type: "mp" }),
                    d
                      .createAuth(this.context, { mcId: this.mcId })
                      .then(function (o) {
                        var a = !1,
                          n = !1;
                        o.dinerSuccess
                          ? (o.hasCard
                              ? ((a = !0),
                                (n = !0),
                                t
                                  .getSysUser(!0, o.cardInfo.cardNo)
                                  .then(function (e) {
                                    t.$emit("authComplate", {
                                      type: "mp",
                                      vip: a,
                                      hasOperate: n,
                                      message: o.message,
                                      status: o.status,
                                      showProtocol: !1,
                                    }),
                                      s.default.emitVipChange(e);
                                  }))
                              : ((a = !1),
                                t.$emit("authComplate", {
                                  type: "mp",
                                  vip: a,
                                  hasOperate: n,
                                  message: o.message,
                                  status: o.status,
                                  showProtocol: !1,
                                })),
                            e.$emit("unLockAuth"),
                            e.$emit("offAuth"))
                          : (e.$emit("unLockAuth"),
                            t.$emit("authComplate", {
                              type: "mp",
                              vip: a,
                              hasOperate: n,
                              message: o.message,
                              status: o.status,
                              showProtocol: !1,
                            }));
                      });
              },
              decryptPhoneNumber: function (t) {
                var o = this;
                if ((console.log(t), !this.locked)) {
                  var a = this;
                  1400001 == t.detail.errno
                    ? (this.getMobileRegisterSet().then(function (t) {
                        t.allowNoMobile
                          ? a.noMobile2VIP()
                          : e.showModal({
                              title: l.default.phoneAuthTitle,
                              content: l.default.phoneAuthTip1,
                              complete: function (e) {
                                a.$emit("authComplate", {
                                  type: "mp",
                                  vip: !1,
                                  hasOperate: !1,
                                  message: l.default.phoneAuthTip1,
                                  status: -2,
                                  showProtocol: !1,
                                });
                              },
                            });
                      }),
                      (0, p.customeRecordLog)(JSON.stringify(t.detail)))
                    : t.detail.errMsg.indexOf("fail") > -1
                    ? (this.setRefusePhone(),
                      e.$emit("userRejectAuth"),
                      this.$emit("authComplate", {
                        type: "mp",
                        vip: !1,
                        hasOperate: !1,
                        message: "用户拒绝手机号授权",
                        status: 100,
                        showProtocol: !1,
                      }))
                    : 104 == t.detail.errno
                    ? this.getMobileRegisterSet().then(function (e) {
                        e.allowNoMobile
                          ? a.noMobile2VIP()
                          : a.$emit("authComplate", {
                              type: "mp",
                              vip: !1,
                              hasOperate: !1,
                              message: l.default.phoneAuthTip1,
                              status: -2,
                              showProtocol: !1,
                            });
                      })
                    : t.detail.hasOwnProperty("errno") ||
                      ((this.locked = !0),
                      e.$emit("beginLock"),
                      (d = new n.PhoneAuth(t, this.appType))
                        .checkSession()
                        .then(function (a) {
                          a
                            ? d.relogin().then(function (t) {
                                e.showToast({
                                  title: "授权超时，请重新授权",
                                  icon: "none",
                                  duration: 2500,
                                }),
                                  e.$emit("unLockAuth"),
                                  o.$emit("authComplate", {
                                    type: "mp",
                                    vip: !1,
                                    hasOperate: !1,
                                    message: t.message,
                                    status: t.status,
                                    showProtocol: !1,
                                  });
                              })
                            : r.default.showProtocol
                            ? (e.$once("sendAuth", o.getProtocolInfo),
                              o.getPhoneNum(t).then(function (e) {
                                var t = null;
                                0 == e.status
                                  ? ((o.mobile = e.result.purePhoneNumber),
                                    (o.mobileArea = e.result.mobileArea),
                                    (o.phoneSignKey =
                                      e.result.phoneSignKey || ""),
                                    (t = {
                                      type: "mp",
                                      vip: !1,
                                      hasOperate: !1,
                                      message: "",
                                      status: 0,
                                      showProtocol: !0,
                                      mobile: o.mobile,
                                      phoneSignKey: o.phoneSignKey,
                                      protocolType: r.default.showProtocolType,
                                    }))
                                  : (console.log("手机号解密", e),
                                    (t = {
                                      type: "mp",
                                      vip: !1,
                                      hasOperate: !1,
                                      message: "手机号解密失败，请重试",
                                      status: e.status,
                                      showProtocol: !1,
                                      protocolType: r.default.showProtocolType,
                                    })),
                                  o.$emit("authComplate", t);
                              }))
                            : (o.$emit("authBegin", { type: "mp" }),
                              d
                                .createAuth(o.context, { mcId: o.mcId })
                                .then(function (t) {
                                  var a = !1,
                                    n = !1;
                                  t.dinerSuccess
                                    ? (t.hasCard
                                        ? ((a = !0),
                                          (n = !0),
                                          o
                                            .getSysUser(!0, t.cardInfo.cardNo)
                                            .then(function (e) {
                                              o.$emit("authComplate", {
                                                type: "mp",
                                                vip: a,
                                                hasOperate: n,
                                                message: t.message,
                                                status: t.status,
                                                showProtocol: !1,
                                              }),
                                                s.default.emitVipChange(e);
                                            }))
                                        : ((a = !1),
                                          o.$emit("authComplate", {
                                            type: "mp",
                                            vip: a,
                                            hasOperate: n,
                                            message: t.message,
                                            status: t.status,
                                            showProtocol: !1,
                                          })),
                                      e.$emit("unLockAuth"),
                                      e.$emit("offAuth"))
                                    : (e.$emit("unLockAuth"),
                                      o.$emit("authComplate", {
                                        type: "mp",
                                        vip: a,
                                        hasOperate: n,
                                        message: t.message,
                                        status: t.status,
                                        showProtocol: !1,
                                      }));
                                }),
                              s.default.getData({
                                name: "statisticsMobileAuth",
                                nameSpace: "SYSTEM",
                                params: {
                                  mcId: o.mcId
                                    ? o.mcId
                                    : s.default.getBusState("mcId", o.context),
                                },
                              }));
                        }));
                }
              },
              btnHandel: function () {
                var t = this,
                  o = s.default.getBusState("isVip", "SYSTEM"),
                  a = this.mcId
                    ? this.mcId
                    : s.default.getBusState("mcId", this.context),
                  n = "mp";
                if (!this.locked)
                  if ((e.$emit("beginLock"), o))
                    this.$emit("authComplate", {
                      type: n,
                      vip: !0,
                      hasOperate: !1,
                      status: 0,
                      showProtocol: !1,
                    }),
                      e.$emit("unLockAuth");
                  else {
                    var i = s.default.getBusState("baseInfo", "SYSTEM");
                    s.default
                      .getData({
                        name: "sendCard",
                        nameSpace: "SYSTEM",
                        params: {
                          inviteCode: i.invitecode,
                          appType: this.appType,
                          mcId: a,
                        },
                      })
                      .then(function (o) {
                        var a, i;
                        0 == o.status
                          ? ((a = !0),
                            s.default.setBusState(
                              "sellCardFlag",
                              o.result.sellCardFlag,
                              "SYSTEM"
                            ),
                            o.result.crmCardInfo &&
                              o.result.crmCardInfo.length &&
                              (i = o.result.crmCardInfo[0].cardNo),
                            t.getSysUser(!0, i).then(function (e) {
                              t.$emit("authComplate", {
                                type: n,
                                vip: a,
                                hasOperate: !0,
                                message: o.message,
                                status: o.status,
                                showProtocol: !1,
                              }),
                                s.default.emitVipChange(e);
                            }))
                          : ((a = !1),
                            t.$emit("authComplate", {
                              type: n,
                              vip: a,
                              hasOperate: !0,
                              message: o.message,
                              status: o.status,
                              showProtocol: !1,
                            })),
                          e.$emit("unLockAuth");
                      });
                  }
              },
              wrapHandel: function () {},
            },
          };
        t.default = f;
      }).call(this, o("543d").default);
    },
    ed65: function (e, t, o) {
      "use strict";
      o.r(t);
      var a = o("ba95"),
        s = o("5196");
      for (var n in s)
        ["default"].indexOf(n) < 0 &&
          (function (e) {
            o.d(t, e, function () {
              return s[e];
            });
          })(n);
      o("b5c8");
      var i = o("f0c5"),
        u = Object(i.a)(
          s.default,
          a.b,
          a.c,
          !1,
          null,
          "7bd2d264",
          null,
          !1,
          a.a,
          void 0
        );
      t.default = u.exports;
    },
  },
]),
  (global.webpackJsonp = global.webpackJsonp || []).push([
    "baseComponents/authBtn2/index-create-component",
    {
      "baseComponents/authBtn2/index-create-component": function (e, t, o) {
        o("543d").createComponent(o("ed65"));
      },
    },
    [["baseComponents/authBtn2/index-create-component"]],
  ]);
