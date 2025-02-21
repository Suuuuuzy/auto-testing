(global.webpackJsonp = global.webpackJsonp || []).push([
  ["pages/mine_info/mine_info"],
  {
    1281: function (e, n, t) {
      (function (e) {
        function o(e, n, t, o, i, a, r) {
          try {
            var c = e[a](r),
              u = c.value;
          } catch (e) {
            return void t(e);
          }
          c.done ? n(u) : Promise.resolve(u).then(o, i);
        }
        function i(e) {
          return function () {
            var n = this,
              t = arguments;
            return new Promise(function (i, a) {
              function r(e) {
                o(u, i, a, r, c, "next", e);
              }
              function c(e) {
                o(u, i, a, r, c, "throw", e);
              }
              var u = e.apply(n, t);
              r(void 0);
            });
          };
        }
        function a(e, n) {
          var t = Object.keys(e);
          if (Object.getOwnPropertySymbols) {
            var o = Object.getOwnPropertySymbols(e);
            n &&
              (o = o.filter(function (n) {
                return Object.getOwnPropertyDescriptor(e, n).enumerable;
              })),
              t.push.apply(t, o);
          }
          return t;
        }
        function r(e) {
          for (var n = 1; n < arguments.length; n++) {
            var t = null != arguments[n] ? arguments[n] : {};
            n % 2
              ? a(Object(t), !0).forEach(function (n) {
                  c(e, n, t[n]);
                })
              : Object.getOwnPropertyDescriptors
              ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t))
              : a(Object(t)).forEach(function (n) {
                  Object.defineProperty(
                    e,
                    n,
                    Object.getOwnPropertyDescriptor(t, n)
                  );
                });
          }
          return e;
        }
        function c(e, n, t) {
          return (
            n in e
              ? Object.defineProperty(e, n, {
                  value: t,
                  enumerable: !0,
                  configurable: !0,
                  writable: !0,
                })
              : (e[n] = t),
            e
          );
        }
        Object.defineProperty(n, "__esModule", { value: !0 }),
          (n.default = void 0);
        var u,
          s = (function (e) {
            return e && e.__esModule ? e : { default: e };
          })(t("a34a")),
          l = {
            components: {
              uniList: function () {
                t.e("components/uni-list/uni-list")
                  .then(
                    function () {
                      return resolve(t("4b82"));
                    }.bind(null, t)
                  )
                  .catch(t.oe);
              },
              uniListItem: function () {
                t.e("components/uni-list-item/uni-list-item")
                  .then(
                    function () {
                      return resolve(t("7a24"));
                    }.bind(null, t)
                  )
                  .catch(t.oe);
              },
              wPicker: function () {
                Promise.all([
                  t.e("common/vendor"),
                  t.e("components/w-picker/w-picker"),
                ])
                  .then(
                    function () {
                      return resolve(t("1f21"));
                    }.bind(null, t)
                  )
                  .catch(t.oe);
              },
            },
            data: function () {
              return {
                userId: "",
                mobile: "",
                nickname: "",
                avatar: "",
                gender: 0,
                birthday: "",
                areaName: "",
                address: "",
                selectList: [
                  { label: "男", value: 1 },
                  { label: "女", value: 2 },
                ],
                mode: "",
              };
            },
            onLoad: function () {
              (u = this), e.setNavigationBarTitle({ title: "个人信息" });
            },
            onShow: function () {
              console.log("page_show..."), u.get_mine_info_func();
            },
            methods: {
              get_mine_info_func: function () {
                this.$api51.api51_user_info(
                  function (n, t) {
                    var o = n[0];
                    u.setData({
                      userId: o.userId,
                      mobile: o.mobile,
                      nickname: o.nickname,
                      avatar: o.avatar,
                      gender: o.gender,
                      birthday: o.birthday,
                      areaName: o.areaName,
                      address: o.address,
                    }),
                      e.$emit("user_info_update", n);
                  },
                  function (n, t) {
                    e.showToast({ title: t + n, icon: "none" }),
                      void 0 != failed && failed(n, t);
                  }
                );
              },
              setData: function (e, n) {
                var t,
                  o,
                  i = this,
                  a = [];
                Object.keys(e).forEach(function (n) {
                  (a = n.split(".")),
                    (t = e[n]),
                    (o = i.$data),
                    a.forEach(function (e, n) {
                      n + 1 == a.length
                        ? i.$set(o, e, t)
                        : o[e] || i.$set(o, e, {}),
                        (o = o[e]);
                    });
                }),
                  n && n();
              },
              toggleTab: function (e) {
                (this.mode = e), this.$refs[e].show();
              },
              onConfirm: function (e) {
                switch ((console.log(e), this.mode)) {
                  case "date":
                    (this.birthday = e.result),
                      this.changeUserBirthday(this.birthday);
                    break;
                  case "selector":
                    (this.gender = e.checkArr.value),
                      this.changeUserSex(this.gender);
                    break;
                  case "region":
                    this.areaName = e.result;
                    var n = e.checkValue[2];
                    this.changeUserArea(this.areaName, n);
                }
                this.resultInfo = r({}, e);
              },
              onclick_detail_info: function (n) {
                console.log(n);
                var t = new Object();
                (t.isNickName = n), (t.text = n ? u.nickname : u.address);
                var o = JSON.stringify(t);
                e.navigateTo({
                  url: "../mine_info_detail/mine_info_detail?data=" + o,
                });
              },
              changeUserSex: function (e) {
                this.$api51.api51_change_gender(
                  e,
                  function (e, n) {
                    console.log("设置性别成功...");
                  },
                  function (e, n) {
                    console.log("设置性别失败...");
                  }
                );
              },
              changeUserBirthday: function (e) {
                this.$api51.api51_change_birthday(
                  e,
                  function (e, n) {
                    console.log("设置生日成功...");
                  },
                  function (e, n) {
                    console.log("设置生日失败...");
                  }
                );
              },
              changeUserArea: function (e, n) {
                this.$api51.api51_change_area(
                  n,
                  e,
                  function (e, n) {
                    console.log("设置地区成功...");
                  },
                  function (e, n) {
                    console.log("设置地区失败...");
                  }
                );
              },
              chooseImage: (function () {
                var n = i(
                  s.default.mark(function n() {
                    return s.default.wrap(function (n) {
                      for (;;)
                        switch ((n.prev = n.next)) {
                          case 0:
                            e.chooseImage({
                              sourceType: ["camera", "album"],
                              sizeType: ["compressed"],
                              count: 1,
                              success: function (n) {
                                console.log(n);
                                var t = n.tempFilePaths[0];
                                u.$api51.api51_upload_file(
                                  t,
                                  function (n, t) {
                                    console.log("上传头像成功...data" + n);
                                    var o = n[0];
                                    u.$api51.api51_change_avatar(
                                      o.avatar,
                                      function (n, t) {
                                        console.log("设置头像成功..."),
                                          u.get_mine_info_func(),
                                          e.setStorageSync("avatar", o.avatar);
                                      },
                                      function (e, n) {
                                        console.log("设置头像失败...");
                                      }
                                    );
                                  },
                                  function (e, n) {
                                    console.log("上传头像失败...");
                                  }
                                );
                              },
                              fail: function (n) {
                                e.getSetting({
                                  success: function (n) {
                                    (n.authSetting["scope.album"] &&
                                      n.authSetting["scope.camera"]) ||
                                      e.showModal({
                                        title: "授权失败",
                                        content:
                                          "Hello uni-app需要从您的相机或相册获取图片，请在设置界面打开相关权限",
                                        success: function (n) {
                                          n.confirm && e.openSetting();
                                        },
                                      });
                                  },
                                });
                              },
                            });
                          case 1:
                          case "end":
                            return n.stop();
                        }
                    }, n);
                  })
                );
                return function () {
                  return n.apply(this, arguments);
                };
              })(),
            },
          };
        n.default = l;
      }).call(this, t("543d").default);
    },
    2466: function (e, n, t) {
      t.r(n);
      var o = t("9131"),
        i = t("592b");
      for (var a in i)
        "default" !== a &&
          (function (e) {
            t.d(n, e, function () {
              return i[e];
            });
          })(a);
      var r = t("f0c5"),
        c = Object(r.a)(
          i.default,
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
      n.default = c.exports;
    },
    "592b": function (e, n, t) {
      t.r(n);
      var o = t("1281"),
        i = t.n(o);
      for (var a in o)
        "default" !== a &&
          (function (e) {
            t.d(n, e, function () {
              return o[e];
            });
          })(a);
      n.default = i.a;
    },
    "773e": function (e, n, t) {
      (function (e) {
        function n(e) {
          return e && e.__esModule ? e : { default: e };
        }
        t("f567"), n(t("66fd")), e(n(t("2466")).default);
      }).call(this, t("543d").createPage);
    },
    9131: function (e, n, t) {
      t.d(n, "b", function () {
        return i;
      }),
        t.d(n, "c", function () {
          return a;
        }),
        t.d(n, "a", function () {
          return o;
        });
      var o = {
          uniList: function () {
            return t
              .e("components/uni-list/uni-list")
              .then(t.bind(null, "4b82"));
          },
          uniListItem: function () {
            return t
              .e("components/uni-list-item/uni-list-item")
              .then(t.bind(null, "7a24"));
          },
          wPicker: function () {
            return Promise.all([
              t.e("common/vendor"),
              t.e("components/w-picker/w-picker"),
            ]).then(t.bind(null, "1f21"));
          },
        },
        i = function () {
          var e = this;
          e.$createElement;
          e._self._c;
        },
        a = [];
    },
  },
  [["773e", "common/runtime", "common/vendor"]],
]);
