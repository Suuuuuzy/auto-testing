(global.webpackJsonp = global.webpackJsonp || []).push([
  ["baseComponents/uploadPhone/index"],
  {
    3238: function (e, t, n) {
      "use strict";
      (function (e) {
        var o = n("4ea4");
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.default = void 0);
        var i = o(n("2309")),
          a = o(n("d79b")),
          s = o(n("295b")),
          r = {
            mixins: [a.default],
            props: {
              customLoading: { type: Boolean, default: !1 },
              btClass: { type: String, default: "rzbtn" },
              btHW: {
                type: Object,
                default: { height: "100%", width: "100%", top: "0" },
              },
              isVip: {},
            },
            data: function () {
              return { isShow: !1 };
            },
            components: {},
            created: function () {
              this.setShow();
            },
            watch: {
              isVip: function () {
                this.setShow();
              },
            },
            methods: {
              nope: function () {},
              setShow: function () {
                var e = i.default.getBusState("oneShop", "DC"),
                  t = i.default.getBusState("vipUserInfo", "DC");
                e.shopSetting.orderModifyMobileFlg
                  ? (this.isShow = t.isVip && !t.mobile)
                  : (this.isShow = !1);
              },
              getPhoneNumber: function (t) {
                if (1400001 == t.detail.errno) {
                  var n = this;
                  e.showModal({
                    title: s.default.phoneAuthTitle,
                    content: s.default.phoneAuthTip2,
                    complete: function (e) {
                      n.$emit("finish");
                    },
                  });
                } else
                  t.detail.errMsg.indexOf("fail") > -1
                    ? (console.log("error:" + t.detail.errMsg),
                      e.showToast({
                        title: "授权失败",
                        icon: "none",
                        duration: 2e3,
                      }),
                      this.$emit("finish"))
                    : (this.getRealMobileNumber({
                        encryptedPhoneData: t.detail.encryptedData,
                        ivPhone: t.detail.iv,
                      }),
                      i.default.getData({
                        name: "statisticsMobileAuth",
                        nameSpace: "SYSTEM",
                        params: { mcId: i.default.getBusState("mcId", "DC") },
                      }));
              },
              onAuthError: function () {
                this.$emit("finish");
              },
              onGetAuthorize: function (t) {
                var n = this,
                  o = i.default.getBusState("baseInfo", "SYSTEM").isvAppId;
                if (!o)
                  return (
                    e.showToast({
                      title: "isvAppId不存在",
                      icon: "none",
                      duration: 2e3,
                    }),
                    void this.$emit("finish")
                  );
                my.getPhoneNumber({
                  protocols: { isvAppId: o },
                  success: function (e) {
                    var t = e.response;
                    n.getRealMobileNumber({
                      encryptedPhoneData: JSON.parse(t).response,
                      ivPhone: null,
                    });
                  },
                  fail: function (e) {
                    n.$emit("finish"),
                      console.error(e),
                      console.error("getPhoneNumber_fail");
                  },
                });
              },
              updateuserinfo: function (t) {
                var n = this;
                this.getSysUser().then(function (o) {
                  var a = {
                    memberId: o.memberId,
                    mobile: t.phoneNo,
                    mobileArea: t.mobileArea,
                  };
                  i.default
                    .getData({
                      name: "updateUserPhoneCrm",
                      params: a,
                      nameSpace: "CD",
                    })
                    .then(function (o) {
                      200 != o.code
                        ? e.showToast({
                            title: "完善会员信息失败:" + o.msg,
                            duration: 2e3,
                            icon: "none",
                          })
                        : (console.log(o, "更新成功"),
                          i.default.setBusState(
                            "vipUserInfo",
                            { mobile: t.phoneNo },
                            "DC"
                          )),
                        n.setShow(),
                        n.$emit("finish");
                    })
                    .catch(function (e) {
                      console.error(e), n.$emit("finish");
                    });
                });
              },
              getRealMobileNumber: function (t) {
                var n = this,
                  o = t.encryptedPhoneData,
                  a = t.ivPhone,
                  s = t.code;
                i.default
                  .getData({
                    name: "getWechatPhoneInfo",
                    nameSpace: "SYSTEM",
                    params: { encryptedPhoneData: o, ivPhone: a, code: s },
                  })
                  .then(function (t) {
                    0 == t.status &&
                      t.result &&
                      (n.updateUser({
                        phoneNo: t.result.purePhoneNumber,
                        mobileArea: t.result.mobileArea,
                      }),
                      n.updateuserinfo({
                        phoneNo: t.result.purePhoneNumber,
                        mobileArea: t.result.mobileArea,
                      }),
                      e.setStorageSync(
                        "kaMeituanPhone",
                        t.result.purePhoneNumber
                      ));
                  });
              },
            },
          };
        t.default = r;
      }).call(this, n("543d").default);
    },
    "34df": function (e, t, n) {
      "use strict";
      n.r(t);
      var o = n("cf38"),
        i = n("edb8");
      for (var a in i)
        ["default"].indexOf(a) < 0 &&
          (function (e) {
            n.d(t, e, function () {
              return i[e];
            });
          })(a);
      n("97ed");
      var s = n("f0c5"),
        r = Object(s.a)(
          i.default,
          o.b,
          o.c,
          !1,
          null,
          "7df6e9b2",
          null,
          !1,
          o.a,
          void 0
        );
      t.default = r.exports;
    },
    "97ed": function (e, t, n) {
      "use strict";
      var o = n("af72");
      n.n(o).a;
    },
    af72: function (e, t, n) {},
    cf38: function (e, t, n) {
      "use strict";
      n.d(t, "b", function () {
        return o;
      }),
        n.d(t, "c", function () {
          return i;
        }),
        n.d(t, "a", function () {});
      var o = function () {
          var e = this,
            t =
              (e.$createElement,
              e._self._c,
              e.__get_style([{ display: e.isShow ? "" : "none" }, e.btHW]));
          e.$mp.data = Object.assign({}, { $root: { s0: t } });
        },
        i = [];
    },
    edb8: function (e, t, n) {
      "use strict";
      n.r(t);
      var o = n("3238"),
        i = n.n(o);
      for (var a in o)
        ["default"].indexOf(a) < 0 &&
          (function (e) {
            n.d(t, e, function () {
              return o[e];
            });
          })(a);
      t.default = i.a;
    },
  },
]),
  (global.webpackJsonp = global.webpackJsonp || []).push([
    "baseComponents/uploadPhone/index-create-component",
    {
      "baseComponents/uploadPhone/index-create-component": function (e, t, n) {
        n("543d").createComponent(n("34df"));
      },
    },
    [["baseComponents/uploadPhone/index-create-component"]],
  ]);
