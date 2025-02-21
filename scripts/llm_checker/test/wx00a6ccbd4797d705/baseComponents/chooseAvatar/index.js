(global.webpackJsonp = global.webpackJsonp || []).push([
  ["baseComponents/chooseAvatar/index"],
  {
    3832: function (e, t, a) {
      "use strict";
      (function (e) {
        var n = a("4ea4");
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.default = void 0);
        var o = n(a("2309")),
          i = a("ca00"),
          s = n(a("295b")),
          r = s.default.baseKey,
          u =
            ((0, i.getSystemInfoSync)().platform,
            {
              name: "chooseAvatar",
              props: {
                maxSize: { type: Number, default: 3 },
                picType: { type: String, default: "1" },
                uploadNow: { type: Boolean, default: !1 },
              },
              data: function () {
                return {
                  baseInfo: {},
                  imageList: [],
                  wxH5ImgList: [],
                  aliH5Base64List: [],
                  canChooseImg: !0,
                };
              },
              created: function () {
                this.baseInfo = o.default.getBusState("baseInfo", "SYSTEM");
              },
              methods: {
                onChooseAvatar: function (e) {
                  var t = this,
                    a = e.detail.avatarUrl;
                  this.uploadNow
                    ? this.mpUploadImage(a).then(function (e) {
                        (t.imageList = e),
                          t.$emit("onChange", t.imageList),
                          t.uploadAvatar(t.imageList);
                      })
                    : ((this.imageList = a),
                      this.$emit("onChange", this.imageList));
                },
                uploadAvatar: function (t) {
                  o.default
                    .getData({
                      name: "onlyupdatememberphoto",
                      params: { photoUrl: t },
                      nameSpace: "SYSTEM",
                    })
                    .then(function (a) {
                      o.default.setBusState(
                        "baseInfo",
                        { avatarUrl: t },
                        "SYSTEM"
                      ),
                        o.default.setBusState(
                          "sysUser",
                          { avatarUrl: t },
                          "SYSTEM"
                        ),
                        e.showToast({
                          title: a.message,
                          icon: "none",
                          duration: 2e3,
                        });
                    });
                },
                getHeader: function () {
                  console.log("baseKey", r);
                  var e = "authData" + r;
                  return {
                    apiCaller: "wxxcx",
                    "Tcsl-Shardingkey": this.baseInfo.gcId || "",
                    Authorization: (0, i.getStorageSync)(e)
                      ? (0, i.getStorageSync)(e).token
                      : "",
                    "X-Requested-With": "XMLHttpRequest",
                    "Content-Type": "multipart/form-data",
                    "n-d-version": s.default.headerVersion,
                  };
                },
                mpUploadPromise: function (t) {
                  var a = this,
                    n = t.url,
                    o = t.filePath,
                    i = t.header;
                  return new Promise(function (t, s) {
                    e.uploadFile({
                      url: n,
                      filePath: o,
                      fileType: "image",
                      name: "uploadPhoto",
                      header: i,
                      formData: {
                        fileType: "memberHeadImg",
                        openId: a.baseInfo.openId,
                      },
                      success: function (e) {
                        t(e);
                      },
                      fail: function (e) {
                        s(e);
                      },
                    });
                  });
                },
                mpUploadImage: function (e) {
                  var t = this.getHeader(),
                    a = "";
                  return this.mpUploadPromise({
                    url: s.default.baseServer + "/crm/member/uploadphotostream",
                    filePath: e,
                    header: t,
                  }).then(function (e) {
                    var t = JSON.parse(e.data),
                      n = t.result;
                    return 0 == t.status && (a = n), a;
                  });
                },
                chooseImage: function () {
                  var t = this,
                    a = this;
                  a.canChooseImg &&
                    ((a.canChooseImg = !1),
                    e.chooseImage({
                      count: 1,
                      sizeType: ["original", "compressed"],
                      sourceType: ["album", "camera"],
                      success: function (n) {
                        n.tempFiles[0].size / 1024 / 1024 > a.maxSize
                          ? e.showToast({
                              icon: "none",
                              title: "最大上传".concat(a.maxSize, "MB的图片"),
                            })
                          : t.uploadNow
                          ? a
                              .mpUploadImage(n.tempFilePaths[0])
                              .then(function (e) {
                                (a.imageList = e),
                                  a.$emit("onChange", a.imageList),
                                  a.uploadAvatar(a.imageList);
                              })
                          : ((a.imageList = n.tempFilePaths[0]),
                            a.$emit("onChange", a.imageList));
                      },
                      complete: function (e) {
                        a.canChooseImg = !0;
                      },
                    }));
                },
              },
            });
        t.default = u;
      }).call(this, a("543d").default);
    },
    "3eb9": function (e, t, a) {
      "use strict";
      a.r(t);
      var n = a("3832"),
        o = a.n(n);
      for (var i in n)
        ["default"].indexOf(i) < 0 &&
          (function (e) {
            a.d(t, e, function () {
              return n[e];
            });
          })(i);
      t.default = o.a;
    },
    "6f04": function (e, t, a) {
      "use strict";
      a.r(t);
      var n = a("b1da"),
        o = a("3eb9");
      for (var i in o)
        ["default"].indexOf(i) < 0 &&
          (function (e) {
            a.d(t, e, function () {
              return o[e];
            });
          })(i);
      a("a46f");
      var s = a("f0c5"),
        r = Object(s.a)(
          o.default,
          n.b,
          n.c,
          !1,
          null,
          "21526cb5",
          null,
          !1,
          n.a,
          void 0
        );
      t.default = r.exports;
    },
    "7bfd": function (e, t, a) {},
    a46f: function (e, t, a) {
      "use strict";
      var n = a("7bfd");
      a.n(n).a;
    },
    b1da: function (e, t, a) {
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
    "baseComponents/chooseAvatar/index-create-component",
    {
      "baseComponents/chooseAvatar/index-create-component": function (e, t, a) {
        a("543d").createComponent(a("6f04"));
      },
    },
    [["baseComponents/chooseAvatar/index-create-component"]],
  ]);
