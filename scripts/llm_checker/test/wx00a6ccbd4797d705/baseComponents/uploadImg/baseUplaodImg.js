(global.webpackJsonp = global.webpackJsonp || []).push([
  ["baseComponents/uploadImg/baseUplaodImg"],
  {
    4455: function (e, t, a) {
      "use strict";
      (function (e) {
        var n = a("4ea4");
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.default = void 0);
        var o = n(a("a34a")),
          s = n(a("448a")),
          i = n(a("c973")),
          r = n(a("2309")),
          u = a("ca00"),
          c = n(a("295b")),
          l = c.default.baseKey,
          m = (0, u.getSystemInfoSync)().platform,
          p = {
            name: "uploadImg",
            props: {
              maxSize: { type: Number, default: 1 },
              maxCount: { type: Number, default: 1 },
              imgFrom: { type: String, default: "memberHeadImg" },
              uploadNow: { type: Boolean, default: !0 },
            },
            data: function () {
              return {
                imageList: [],
                wxH5ImgList: [],
                aliH5Base64List: [],
                canChooseImg: !0,
              };
            },
            computed: {
              baseInfo: function () {
                var e = "";
                return (
                  r.default.getBusState("baseInfo", "SYSTEM") &&
                    (e = JSON.parse(
                      JSON.stringify(
                        r.default.getBusState("baseInfo", "SYSTEM")
                      )
                    )),
                  e
                );
              },
            },
            created: function () {},
            mounted: function () {},
            methods: {
              uploadAvatar: function (e) {
                return r.default.getData({
                  name: "onlyupdatememberphoto",
                  params: { photoUrl: e },
                  nameSpace: "SYSTEM",
                });
              },
              syncGetLocalImgData: function (e) {
                var t = this;
                return new Promise(function (a, n) {
                  e &&
                    wx.getLocalImgData({
                      localId: e,
                      success: function (e) {
                        var n = e.localData;
                        (n = n.replace(/[\r\n]/g, "")),
                          1 == t.maxCount
                            ? (t.imageList = [n])
                            : t.imageList.push(n),
                          a();
                      },
                    });
                });
              },
              wxH5syncUpload: function (e) {
                return new Promise(function (t, a) {
                  wx.uploadImage({
                    localId: e,
                    isShowProgressTips: 0,
                    success: function (e) {
                      var a = e.serverId;
                      t(a);
                    },
                  });
                });
              },
              wxH5chooseImage: function () {
                var t = this;
                wx.chooseImage({
                  count: 1 == t.maxCount ? 1 : t.maxCount - t.imageList.length,
                  sizeType: ["original", "compressed"],
                  sourceType: ["album", "camera"],
                  success: (function () {
                    var a = (0, i.default)(
                      o.default.mark(function a(n) {
                        var i, r, u, c, l;
                        return o.default.wrap(
                          function (a) {
                            for (;;)
                              switch ((a.prev = a.next)) {
                                case 0:
                                  if (
                                    ((i = n.localIds),
                                    1 == t.maxCount
                                      ? (t.wxH5ImgList = i)
                                      : (r = t.wxH5ImgList).push.apply(
                                          r,
                                          (0, s.default)(i)
                                        ),
                                    "ios" != m)
                                  ) {
                                    a.next = 12;
                                    break;
                                  }
                                  u = 0;
                                case 4:
                                  if (!(u < i.length)) {
                                    a.next = 10;
                                    break;
                                  }
                                  return (
                                    (a.next = 7), t.syncGetLocalImgData(i[u])
                                  );
                                case 7:
                                  u++, (a.next = 4);
                                  break;
                                case 10:
                                  a.next = 13;
                                  break;
                                case 12:
                                  1 == t.maxCount
                                    ? (t.imageList = i)
                                    : (c = t.imageList).push.apply(
                                        c,
                                        (0, s.default)(i)
                                      );
                                case 13:
                                  if (
                                    (t.$emit("onChange", t.imageList),
                                    "memberHeadImg" != t.imgFrom ||
                                      !this.uploadNow)
                                  ) {
                                    a.next = 19;
                                    break;
                                  }
                                  return (a.next = 17), t.wxH5syncUpload(i[0]);
                                case 17:
                                  (l = a.sent),
                                    t.uploadAvatar(l).then(function (t) {
                                      e.showToast({
                                        title: t.message,
                                        icon: "none",
                                        duration: 2e3,
                                      });
                                    });
                                case 19:
                                case "end":
                                  return a.stop();
                              }
                          },
                          a,
                          this
                        );
                      })
                    );
                    return function (e) {
                      return a.apply(this, arguments);
                    };
                  })(),
                  fail: function () {},
                  complete: function () {
                    t.canChooseImg = !0;
                  },
                });
              },
              getHeader: function () {
                console.log("baseKey", l);
                var e = "authData" + l;
                return {
                  apiCaller: "wxxcx",
                  "Tcsl-Shardingkey": this.baseInfo.gcId || "",
                  Authorization: (0, u.getStorageSync)(e)
                    ? (0, u.getStorageSync)(e).token
                    : "",
                  "X-Requested-With": "XMLHttpRequest",
                  "Content-Type": "multipart/form-data",
                  "n-d-version": c.default.headerVersion,
                };
              },
              mpUploadPromise: function (t) {
                var a = this,
                  n = t.url,
                  o = t.filePath,
                  s = t.header;
                return new Promise(function (t, i) {
                  e.uploadFile({
                    url: n,
                    filePath: o,
                    fileType: "image",
                    name: "uploadPhoto",
                    header: s,
                    formData: {
                      fileType: a.imgFrom,
                      openId: a.baseInfo.openId,
                    },
                    success: function (e) {
                      t(e);
                    },
                    fail: function (e) {
                      i(e);
                    },
                  });
                });
              },
              mpUploadImage: function (e) {
                var t = this;
                return (0, i.default)(
                  o.default.mark(function a() {
                    var n, s, i, r, u, l;
                    return o.default.wrap(function (a) {
                      for (;;)
                        switch ((a.prev = a.next)) {
                          case 0:
                            (n = t.getHeader()), (s = []), (i = 0);
                          case 3:
                            if (!(i < e.length)) {
                              a.next = 12;
                              break;
                            }
                            return (
                              (a.next = 6),
                              t.mpUploadPromise({
                                url:
                                  c.default.baseServer +
                                  "/crm/member/uploadphotostream",
                                filePath: e[i],
                                header: n,
                              })
                            );
                          case 6:
                            (r = a.sent),
                              (u = JSON.parse(r.data)),
                              (l = u.result),
                              0 == u.status &&
                                (1 == t.maxCount ? (s = [l]) : s.push(l));
                          case 9:
                            i++, (a.next = 3);
                            break;
                          case 12:
                            return a.abrupt("return", s);
                          case 13:
                          case "end":
                            return a.stop();
                        }
                    }, a);
                  })
                )();
              },
              uploadAllImages: function () {
                var e = this;
                return (0, i.default)(
                  o.default.mark(function t() {
                    return o.default.wrap(function (t) {
                      for (;;)
                        switch ((t.prev = t.next)) {
                          case 0:
                            return t.abrupt(
                              "return",
                              e.mpUploadImage(e.imageList)
                            );
                          case 1:
                          case "end":
                            return t.stop();
                        }
                    }, t);
                  })
                )();
              },
              chooseImage: function () {
                var t = this,
                  a = this;
                a.imageList.length !== a.maxCount || 1 == a.maxCount
                  ? a.canChooseImg &&
                    ((a.canChooseImg = !1),
                    e.chooseImage({
                      count:
                        1 == a.maxCount ? 1 : a.maxCount - a.imageList.length,
                      sizeType: ["original", "compressed"],
                      sourceType: ["album", "camera"],
                      success: (function () {
                        var n = (0, i.default)(
                          o.default.mark(function n(i) {
                            var r, u;
                            return o.default.wrap(function (n) {
                              for (;;)
                                switch ((n.prev = n.next)) {
                                  case 0:
                                    if (
                                      !(
                                        i.tempFiles[0].size / 1024 / 1024 >
                                        a.maxSize
                                      )
                                    ) {
                                      n.next = 3;
                                      break;
                                    }
                                    return (
                                      e.showToast({
                                        icon: "none",
                                        title: "最大上传".concat(
                                          a.maxSize,
                                          "MB的图片"
                                        ),
                                      }),
                                      n.abrupt("return")
                                    );
                                  case 3:
                                    if (
                                      (1 == a.maxCount
                                        ? (a.imageList = i.tempFilePaths)
                                        : (a.imageList = (r =
                                            a.imageList).concat.apply(
                                            r,
                                            (0, s.default)(i.tempFilePaths)
                                          )),
                                      a.$emit("onChange", a.imageList),
                                      "memberHeadImg" != t.imgFrom ||
                                        !t.uploadNow)
                                    ) {
                                      n.next = 10;
                                      break;
                                    }
                                    return (
                                      (n.next = 8),
                                      a.mpUploadImage(i.tempFilePaths)
                                    );
                                  case 8:
                                    (u = n.sent),
                                      a.uploadAvatar(u[0]).then(function (t) {
                                        e.showToast({
                                          title: t.message,
                                          icon: "none",
                                          duration: 2e3,
                                        });
                                      });
                                  case 10:
                                  case "end":
                                    return n.stop();
                                }
                            }, n);
                          })
                        );
                        return function (e) {
                          return n.apply(this, arguments);
                        };
                      })(),
                      complete: function (e) {
                        a.canChooseImg = !0;
                      },
                    }))
                  : e.showToast({
                      icon: "none",
                      title: "图片数量限制".concat(a.maxCount, "张"),
                    });
              },
              removeImage: function (e) {
                e > -1 &&
                  this.imageList[e] &&
                  (this.imageList.splice(e, 1),
                  this.aliH5Base64List[e] && this.aliH5Base64List.splice(e, 1),
                  this.wxH5ImgList[e] && this.wxH5ImgList.splice(e, 1));
              },
              clearSelData: function () {
                console.log("....base...>."),
                  (this.imageList = []),
                  (this.aliH5Base64List = []),
                  (this.wxH5ImgList = []);
              },
            },
            watch: {},
            components: {},
          };
        t.default = p;
      }).call(this, a("543d").default);
    },
    "82ce": function (e, t, a) {
      "use strict";
      a.r(t);
      var n = a("4455"),
        o = a.n(n);
      for (var s in n)
        ["default"].indexOf(s) < 0 &&
          (function (e) {
            a.d(t, e, function () {
              return n[e];
            });
          })(s);
      t.default = o.a;
    },
    "97d1": function (e, t, a) {
      "use strict";
      a.r(t);
      var n = a("e8a9"),
        o = a("82ce");
      for (var s in o)
        ["default"].indexOf(s) < 0 &&
          (function (e) {
            a.d(t, e, function () {
              return o[e];
            });
          })(s);
      var i = a("f0c5"),
        r = Object(i.a)(
          o.default,
          n.b,
          n.c,
          !1,
          null,
          "f52a358a",
          null,
          !1,
          n.a,
          void 0
        );
      t.default = r.exports;
    },
    e8a9: function (e, t, a) {
      "use strict";
      a.d(t, "b", function () {
        return n;
      }),
        a.d(t, "c", function () {
          return o;
        }),
        a.d(t, "a", function () {});
      var n = function () {
          this.$createElement, this._self._c;
        },
        o = [];
    },
  },
]),
  (global.webpackJsonp = global.webpackJsonp || []).push([
    "baseComponents/uploadImg/baseUplaodImg-create-component",
    {
      "baseComponents/uploadImg/baseUplaodImg-create-component": function (
        e,
        t,
        a
      ) {
        a("543d").createComponent(a("97d1"));
      },
    },
    [["baseComponents/uploadImg/baseUplaodImg-create-component"]],
  ]);
