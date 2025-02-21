var e = require("../../@babel/runtime/helpers/regeneratorRuntime"),
  t = require("../../@babel/runtime/helpers/asyncToGenerator"),
  a = require("../../common/vendor.js"),
  n = require("../../utils/debouns.js"),
  o = {
    data: function () {
      return {
        avatarUrl: "",
        nickName: "",
        fileList: [],
        action: "",
        header: { "content-type": "application/json" },
        userInfo: {},
      };
    },
    onLoad: function () {
      (this.action = "https://yiningjiayou.com/img/upload"), this.getUserInfo();
    },
    mounted: function () {
      this.upNickName = n.throttle(this.upNickName, 2e3);
    },
    methods: {
      doPreviewImage: function () {
        var e = [this.avatarUrl];
        a.index.previewImage({
          urls: e,
          success: function () {},
          fail: function () {
            a.index.showToast({ title: "预览图片失败", icon: "none" });
          },
        });
      },
      getUserInfo: function () {
        var e = this;
        this.$api.getUserInfoDetail().then(function (t) {
          console.log("myuserinfo", t.data.data),
            2e4 === t.data.code &&
              (e.$store.commit("setUserInfo", t.data.data),
              a.index.setStorage({ key: "userInfo", data: t.data.data }),
              (e.userInfo = t.data.data),
              (e.avatarUrl =
                t.data.data.avatarUrl || "".concat($imgPath, "/avatar.png")),
              (e.nickName = t.data.data.nickName || "微信用户"));
        });
      },
      limitValue: function () {},
      Error: function (e) {
        console.log(e, 77);
      },
      remove: function (e) {
        console.log("3", e);
      },
      beforeUpload: function (e, t) {
        console.log(t[0]);
      },
      handleSuccess: function (a) {
        var n = this;
        return t(
          e().mark(function t() {
            var o;
            return e().wrap(function (e) {
              for (;;)
                switch ((e.prev = e.next)) {
                  case 0:
                    return (
                      (n.avatarUrl = a.data),
                      (e.next = 3),
                      n.$api.$updateUserAvatarUrl({ avatarUrl: a.data })
                    );
                  case 3:
                    (o = e.sent).data.code === n.$code.SUCCESS &&
                      n.$toast(o.data.message),
                      console.log("修成功", o);
                  case 5:
                  case "end":
                    return e.stop();
                }
            }, t);
          })
        )();
      },
      upNickName: function () {
        var n = this;
        return t(
          e().mark(function t() {
            var o;
            return e().wrap(function (e) {
              for (;;)
                switch ((e.prev = e.next)) {
                  case 0:
                    if (
                      (console.log("输入的昵称为", n.nickName), !n.nickName)
                    ) {
                      e.next = 7;
                      break;
                    }
                    return (
                      (e.next = 3),
                      n.$api.$updateUserAvatarUrl({ nickName: n.nickName })
                    );
                  case 3:
                    (o = e.sent),
                      console.log("修成功", o),
                      o.data.code === n.$code.SUCCESS &&
                        (n.$toast(o.data.message),
                        setTimeout(function () {
                          return a.index.navigateBack();
                        }, 1e3)),
                      (e.next = 8);
                    break;
                  case 7:
                    n.$toast("请输入昵称");
                  case 8:
                  case "end":
                    return e.stop();
                }
            }, t);
          })
        )();
      },
      getPhoneNumber: function (n) {
        var o = this;
        return t(
          e().mark(function t() {
            var r, i, s;
            return e().wrap(function (e) {
              for (;;)
                switch ((e.prev = e.next)) {
                  case 0:
                    if (
                      ((r = {}),
                      (r = n.detail.code
                        ? { code: n.detail.code }
                        : {
                            encryptedData: n.detail.encryptedData,
                            ivStr: n.detail.iv,
                          }),
                      (i = o),
                      "getPhoneNumber:ok" !== n.detail.errMsg)
                    ) {
                      e.next = 11;
                      break;
                    }
                    return (
                      i.$loading("正在修改"),
                      (e.next = 7),
                      i.$api.$CryptPhoneNumber(r)
                    );
                  case 7:
                    (s = e.sent),
                      console.log("返回手机号", s),
                      s.data.code === i.$code.SUCCESS
                        ? (a.index.setStorageSync("phone", s.data.data),
                          a.index.hideLoading(),
                          i.$toast("修改成功", "success", 3e3),
                          i.getUserInfo())
                        : (a.index.hideLoading(),
                          i.$toast("修改失败", "error", 3e3)),
                      (e.next = 12);
                    break;
                  case 11:
                    i.$toast("取消修改", "error", 3e3);
                  case 12:
                  case "end":
                    return e.stop();
                }
            }, t);
          })
        )();
      },
    },
  };
Array ||
  (
    a.resolveComponent("zym-navigation") +
    a.resolveComponent("u-avatar") +
    a.resolveComponent("u-upload") +
    a.resolveComponent("u-text") +
    a.resolveComponent("u-button")
  )();
Math ||
  (
    function () {
      return "../../pages/components/zym-navigation/zym-navigation.js";
    } +
    function () {
      return "../../uview-plus/components/u-avatar/u-avatar.js";
    } +
    function () {
      return "../../uview-plus/components/u-upload/u-upload.js";
    } +
    function () {
      return "../../uview-plus/components/u-text/u-text.js";
    } +
    function () {
      return "../../uview-plus/components/u-button/u-button.js";
    }
  )();
var r = a._export_sfc(o, [
  [
    "render",
    function (e, t, n, o, r, i) {
      return {
        a: a.p({ title: "个人信息", "is-home-page": !1 }),
        b: a.o(i.doPreviewImage),
        c: a.p({ size: "160", src: r.avatarUrl, mode: "circle" }),
        d: a.sr("uUpload", "73680460-2"),
        e: a.o(i.handleSuccess),
        f: a.o(Error),
        g: a.o(i.remove),
        h: a.p({
          "custom-btn": !0,
          action: r.action,
          "before-upload": i.beforeUpload,
          "max-size": 2097152,
          header: r.header,
          "show-progress": !1,
          "show-upload-list": !1,
          "auto-upload": !0,
          deletable: !1,
        }),
        i: a.o([
          function (e) {
            return (r.nickName = e.detail.value);
          },
          function () {
            return i.limitValue && i.limitValue.apply(i, arguments);
          },
        ]),
        j: r.nickName,
        k: "".concat(e.imgPath, "/rightArrow.png"),
        l: a.t(r.userInfo.wxUserId ? r.userInfo.wxUserId : ""),
        m: a.t(r.userInfo.phoneNumber ? r.userInfo.phoneNumber : ""),
        n: a.p({ text: "手机号不对？", size: "28", align: "right" }),
        o: a.o(i.getPhoneNumber),
        p: a.p({
          "open-type": "getPhoneNumber",
          color: "none",
          throttleTime: "3000",
          customStyle: {
            "font-size": "32rpx",
            color: "#1f2026",
            width: "fit-content",
            padding: 0,
            border: "none",
            height: "100%",
            "text-decoration": "underline",
          },
        }),
        q: a.o(function () {
          return i.upNickName && i.upNickName.apply(i, arguments);
        }),
      };
    },
  ],
  ["__scopeId", "data-v-73680460"],
]);
wx.createPage(r);
