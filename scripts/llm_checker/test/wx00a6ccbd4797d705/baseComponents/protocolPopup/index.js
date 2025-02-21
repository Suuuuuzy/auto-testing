(global.webpackJsonp = global.webpackJsonp || []).push([
  ["baseComponents/protocolPopup/index"],
  {
    "173e": function (t, e, o) {
      "use strict";
      o.r(e);
      var s = o("9b9b"),
        i = o.n(s);
      for (var n in s)
        ["default"].indexOf(n) < 0 &&
          (function (t) {
            o.d(e, t, function () {
              return s[t];
            });
          })(n);
      e.default = i.a;
    },
    "28f6": function (t, e, o) {},
    "37da": function (t, e, o) {
      "use strict";
      o.d(e, "b", function () {
        return s;
      }),
        o.d(e, "c", function () {
          return i;
        }),
        o.d(e, "a", function () {});
      var s = function () {
          var t = this,
            e =
              (t.$createElement,
              t._self._c,
              !t.popupSet.hasOwnProperty("cardPassword") ||
                t.popupSet.cardPassword);
          t.$mp.data = Object.assign({}, { $root: { g0: e } });
        },
        i = [];
    },
    "4f78": function (t, e, o) {
      "use strict";
      var s = o("a25c");
      o.n(s).a;
    },
    "7c82": function (t, e, o) {
      "use strict";
      o.r(e);
      var s = o("37da"),
        i = o("173e");
      for (var n in i)
        ["default"].indexOf(n) < 0 &&
          (function (t) {
            o.d(e, t, function () {
              return i[t];
            });
          })(n);
      o("4f78"), o("f0bb");
      var a = o("f0c5"),
        r = Object(a.a)(
          i.default,
          s.b,
          s.c,
          !1,
          null,
          "6c903123",
          null,
          !1,
          s.a,
          void 0
        );
      e.default = r.exports;
    },
    "9b9b": function (t, e, o) {
      "use strict";
      (function (t) {
        var s = o("4ea4");
        Object.defineProperty(e, "__esModule", { value: !0 }),
          (e.default = void 0);
        var i = s(o("2309")),
          n = o("b183"),
          a = s(o("461a")),
          r = o("ca00"),
          c = s(o("b61d")),
          l = {
            name: "protocolPopup",
            props: ["context", "agreeProtocol"],
            components: {
              wxpopup: function () {
                Promise.all([
                  o.e("common/vendor"),
                  o.e("baseComponents/wxpopup/popup"),
                ])
                  .then(
                    function () {
                      return resolve(o("0387"));
                    }.bind(null, o)
                  )
                  .catch(o.oe);
              },
              identificationMc: function () {
                Promise.all([
                  o.e("common/vendor"),
                  o.e("baseComponents/identificationMc/index"),
                ])
                  .then(
                    function () {
                      return resolve(o("4bc9"));
                    }.bind(null, o)
                  )
                  .catch(o.oe);
              },
              chooseAvatar: function () {
                o.e("baseComponents/chooseAvatar/index")
                  .then(
                    function () {
                      return resolve(o("6f04"));
                    }.bind(null, o)
                  )
                  .catch(o.oe);
              },
              myInput: function () {
                o.e("baseComponents/input/index")
                  .then(
                    function () {
                      return resolve(o("f236"));
                    }.bind(null, o)
                  )
                  .catch(o.oe);
              },
            },
            mixins: [a.default],
            data: function () {
              return {
                show: !1,
                isAccept: !1,
                btnDisebled: !1,
                hasinvitationCode: !1,
                themeColor: "#FABD00",
                phoneNum: "",
                invitationCode: "",
                sureAuthTxt: "确认授权开通并绑定会员",
                btnColor: "",
                invitationCodeFlg: "",
                popupSet: {},
                newPassword: "",
                newPassword2: "",
                endPsw: "",
                endPsw2: "",
                mcId: "",
                protocolFlg: !1,
                _mcId: "",
                wechatRegisterShopMode: 0,
                indicatorStyle: "height: 50px;",
                birthdayVal: [84, 1, 28],
                tem_birthdayVal: [84, 1, 28],
                birthday: "1984-02-29",
                tem_birthday: "1984-02-29",
                year: c.default.year,
                years: c.default.years,
                months: c.default.months,
                month: c.default.month,
                days: c.default.days3,
                day: c.default.day,
                hasB: !1,
                sex: 0,
                appName: "",
                useUploadImg: !1,
                popupMaxHeight: 0,
                itemTitleStyle:
                  "color: #000000; font-size: 36rpx; font-weight: bold;",
                baseInfo: { avatarUrl: "", nickName: "" },
                protocolMsg: "",
                protocolMsg2: "",
                protocolMsg3: "",
                protocolMsg4: "",
                protocolTitle: "",
                protocolTitle2: "",
                protocolTitle3: "",
                protocolTitle4: "",
                showBirthdayPopup: !1,
                setPswPopup: !1,
              };
            },
            created: function () {
              var t = this,
                e = Object.preventExtensions(
                  i.default
                    .getDecorate("SYSTEM")
                    .getValidValue("decorationData")("commonSet", {})()
                );
              (this.popupSet = e.identification.popupSet || {}),
                (this.appName = i.default.getBusState(
                  "baseInfo",
                  "SYSTEM"
                ).appName),
                (this.hasinvitationCode = !!i.default.getBusState(
                  "baseInfo",
                  "SYSTEM"
                ).invitecode),
                (this.themeColor = i.default.getDecorate("SYSTEM").themeColor),
                (this.invitationCode =
                  i.default.getBusState("baseInfo", "SYSTEM").invitecode || ""),
                (this.btnColor = i.default
                  .getDecorate("SYSTEM")
                  .getValidValue("decorationData")("commonSet")("theme")(
                  "btnTextColor",
                  "#000"
                )()),
                (this.invitationCodeFlg = i.default
                  .getDecorate("SYSTEM")
                  .getValidValue("decorationData")("commonSet")("otherSet")(
                  "invitationCodeFlg",
                  "true"
                )()),
                (this.popupMaxHeight = 0.7 * (0, r.getClientHeight)()),
                (this.mcId = i.default.getBusState("mcId", this.context)),
                (this._mcId = i.default.getBusState("mcId", this.context)),
                (0, n.getSystemProtocol)(
                  { protocolType: 1, memberId: null },
                  function (e) {
                    0 == e.status &&
                      ((t.showProtocol = 1 == e.result.protocolStatus),
                      (t.protocolTitle = e.result.protocolTitle),
                      (t.protocolTitle2 = e.result.protocolTitle2),
                      (t.protocolTitle3 = e.result.protocolTitle3),
                      (t.protocolMsg = e.result.protocolMsg),
                      (t.protocolMsg2 = e.result.protocolMsg2),
                      (t.protocolMsg3 = e.result.protocolMsg3),
                      i.default.setBusState(
                        "chargeAgreement",
                        e.result.protocolMsg,
                        "SYSTEM"
                      ),
                      i.default.setBusState(
                        "chargeAgreementTitle",
                        e.result.protocolTitle,
                        "SYSTEM"
                      ));
                  }
                ),
                (0, n.getSystemProtocol)(
                  { protocolType: 9, memberId: null },
                  function (e) {
                    0 == e.status &&
                      ((t.protocolTitle4 = e.result.protocolTitle),
                      (t.protocolMsg4 = e.result.protocolMsg));
                  }
                );
            },
            mounted: function () {
              this.hasB = !0;
            },
            computed: {
              disabled: function () {
                return (
                  !(!this.btnDisebled || this.hasinvitationCode) ||
                  !(!this.protocolFlg || this.isAccept) ||
                  !this.baseInfo.nickName
                );
              },
            },
            watch: {
              agreeProtocol: function () {
                this.agreeProtocol && (this.isAccept = !0);
              },
            },
            methods: {
              getUserInfoAli: function () {
                var t = this,
                  e = this;
                my.getOpenUserInfo({
                  success: function (o) {
                    var s =
                      (o = JSON.parse(o.response)) && o.response
                        ? o.response
                        : {};
                    s.nickName
                      ? (i.default.setBusState(
                          "baseInfo",
                          {
                            avatarUrl: s.avatar,
                            nickName: s.nickName,
                            gender:
                              "m" == s.gender ? 1 : "f" == s.gender ? 2 : 0,
                          },
                          "SYSTEM"
                        ),
                        e.$set(t.baseInfo, "nickName", s.nickName),
                        e.$set(t.baseInfo, "avatarUrl", s.avatar),
                        (e.useUploadImg = !1))
                      : console.warn("用户授权失败，获取用户信息失败", o);
                  },
                  fail: function (t) {
                    console.warn("获取用户授权信息失败", t);
                  },
                });
              },
              getMdDataComplate: function () {
                this.btnDisebled = !1;
              },
              selectMcid: function (t) {
                this._mcId = t;
              },
              showPopup: function (t, e, o) {
                (this.mcId = i.default.getBusState("mcId", this.context)),
                  (this._mcId = this.mcId);
                var s = i.default.getBusState("baseInfo", "SYSTEM");
                s.nickName &&
                  (this.$set(this.baseInfo, "nickName", s.nickName),
                  this.$set(this.baseInfo, "avatarUrl", s.avatarUrl)),
                  (this.phoneNum = (0, r.replacePhoneNum)(t)),
                  (this.sureAuthTxt = e || "确认授权开通并绑定会员"),
                  (this.show = !0),
                  (this.invitationCode =
                    i.default.getBusState("baseInfo", "SYSTEM").invitecode ||
                    ""),
                  o &&
                    ((this.protocolFlg = o.userProtocol),
                    (this.wechatRegisterShopMode = o.registerShopMode)),
                  this.wechatRegisterShopMode &&
                    !this.mcId &&
                    (this.btnDisebled = !0);
              },
              onChange: function (t) {
                var e = this;
                (this.useUploadImg = !0),
                  this.$refs.chooseAvatar.mpUploadImage(t).then(function (t) {
                    var o = t || r.defaultAvatarUrl;
                    e.$set(e.baseInfo, "avatarUrl", o);
                  });
              },
              setBaseinfo: function () {
                i.default.setBusState(
                  "baseInfo",
                  {
                    avatarUrl: this.baseInfo.avatarUrl,
                    nickName: this.baseInfo.nickName,
                  },
                  "SYSTEM"
                ),
                  i.default.setBusState(
                    "sysUser",
                    {
                      avatarUrl: this.baseInfo.avatarUrl,
                      nickName: this.baseInfo.nickName,
                    },
                    "SYSTEM"
                  );
              },
              changeCheckBox: function () {
                this.isAccept = !this.isAccept;
              },
              cardPopupOpen: function (t) {
                1 == t
                  ? (i.default.setBusState(
                      "chargeAgreement",
                      this.protocolMsg,
                      "SYSTEM"
                    ),
                    i.default.setBusState(
                      "chargeAgreementTitle",
                      this.protocolTitle,
                      "SYSTEM"
                    ))
                  : 2 == t
                  ? (i.default.setBusState(
                      "chargeAgreement",
                      this.protocolMsg2,
                      "SYSTEM"
                    ),
                    i.default.setBusState(
                      "chargeAgreementTitle",
                      this.protocolTitle2,
                      "SYSTEM"
                    ))
                  : 3 == t
                  ? (i.default.setBusState(
                      "chargeAgreement",
                      this.protocolMsg3,
                      "SYSTEM"
                    ),
                    i.default.setBusState(
                      "chargeAgreementTitle",
                      this.protocolTitle3,
                      "SYSTEM"
                    ))
                  : 4 == t &&
                    (i.default.setBusState(
                      "chargeAgreement",
                      this.protocolMsg4,
                      "SYSTEM"
                    ),
                    i.default.setBusState(
                      "chargeAgreementTitle",
                      this.protocolTitle4,
                      "SYSTEM"
                    )),
                  this.toPage({
                    page: "serviceAgreement",
                    context: "SYSTEM",
                    query: (0, r.setQueryFun)({
                      protocolType: 1,
                      memberId: "",
                    }),
                  });
              },
              sureAuth: function () {
                if (this.protocolFlg && !this.isAccept)
                  return (
                    t.showToast({
                      title: "请勾选服务协议",
                      icon: "none",
                      duration: 2e3,
                    }),
                    !1
                  );
                var e = {
                  protocolFlg: this.protocolFlg,
                  isAccept: this.isAccept,
                  inviteCode: this.invitationCode,
                  mcId: this._mcId,
                  birthDay: this.popupSet.openBirthDay ? this.birthday : "",
                  oldBit: "0",
                  sex: this.sex,
                  cardPassword: this.endPsw,
                  btnClick: !0,
                };
                this.setBaseinfo(), this.$emit("confirm", e);
              },
              closePoup2: function () {
                (this.show = !1),
                  (this.invitationCode = ""),
                  (this.isAccept = !1);
                var t = {
                  protocolFlg: this.protocolFlg,
                  isAccept: !1,
                  invitationCode: "",
                  btnClick: !1,
                };
                this.$emit("confirm", t);
              },
              closePoup: function () {
                (this.show = !1),
                  (this.invitationCode = ""),
                  (this.isAccept = !1);
              },
              scanCodeRes: function (e) {
                e.length > 16
                  ? t.showToast({
                      title: "邀请码超长,请扫描正确的邀请码",
                      icon: "none",
                      duration: 2e3,
                    })
                  : (this.invitationCode = e);
              },
              sexChange: function (t) {
                this.sex = t;
              },
              showBirthdayPopupFun: function () {
                (this.tem_birthday = this.birthday),
                  (this.tem_birthdayVal = this.birthdayVal),
                  (this.showBirthdayPopup = !0);
              },
              hideBirthdayPopupFun: function () {
                (this.birthday = this.tem_birthday),
                  (this.birthdayVal = this.tem_birthdayVal),
                  (this.showBirthdayPopup = !1);
              },
              changeBirthday: function () {
                this.showBirthdayPopup = !1;
              },
              bindChange: function (t) {
                var e = t.detail.value;
                console.log("val选择生日", e);
                var o = this.years[e[0]] || "",
                  s = this.months[e[1]],
                  i = this.days[e[2]];
                this.birthday = o + "-" + s + "-" + i;
                var n = c.default.getDays(s, o);
                n.length != this.days.length && (this.days = n),
                  console.log(this.birthday, "-------this.birthday");
              },
              setPswPopupFun: function () {
                (this.newPassword = this.endPsw),
                  (this.newPassword2 = this.endPsw),
                  (this.setPswPopup = !0);
              },
              HidePswPopupFun: function () {
                this.setPswPopup = !1;
              },
              savePsw: function () {
                return /^\d{6}$/.test(this.newPassword)
                  ? this.newPassword !== this.newPassword2
                    ? (t.showToast({
                        title: "确认密码需与密码保持一致",
                        icon: "none",
                        duration: 2e3,
                      }),
                      !1)
                    : ((this.endPsw = this.newPassword),
                      (this.endPsw2 = this.endPsw.replace(/./g, "*")),
                      void this.HidePswPopupFun())
                  : (t.showToast({
                      title: "请输入正确密码",
                      icon: "none",
                      duration: 2e3,
                    }),
                    !1);
              },
            },
          };
        e.default = l;
      }).call(this, o("543d").default);
    },
    a25c: function (t, e, o) {},
    f0bb: function (t, e, o) {
      "use strict";
      var s = o("28f6");
      o.n(s).a;
    },
  },
]),
  (global.webpackJsonp = global.webpackJsonp || []).push([
    "baseComponents/protocolPopup/index-create-component",
    {
      "baseComponents/protocolPopup/index-create-component": function (
        t,
        e,
        o
      ) {
        o("543d").createComponent(o("7c82"));
      },
    },
    [["baseComponents/protocolPopup/index-create-component"]],
  ]);
