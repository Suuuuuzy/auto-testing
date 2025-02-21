var t = getApp(),
  a = "";
Page({
  data: {
    userinfo: t.userinfo,
    isSeo: !1,
    bottom_btn: 0,
    name: t.name,
    showPrivacy: !1,
    ad_video: t.ad_video,
    isCut: !1,
    isWater: !1,
    timeLimit: 0,
    problem: [],
    video: [],
    input: "",
    waterData: "",
    progress: "",
    isMsg: !1,
    money: 0,
    showHistory: !1,
    uploadData: [],
    uploadI: 0,
    type: "",
    adState: !1,
    error: "",
    handleClass: [],
    return: "",
    icon_list: [],
    adMsgState: !1,
    msgtitle: "",
    icon_id: "",
    postData: { i: 0, ok: 0 },
    picturelist: [],
    picture_i: "",
    picturetitle: "",
  },
  goHistory: function () {
    this.closeHistory(),
      wx.navigateTo({ url: "/pages/history/history?type=2" });
  },
  onAddWater: function () {
    wx.navigateTo({ url: "./add/add" });
  },
  closeHistory: function () {
    this.setData({ showHistory: !1 });
  },
  onShow: function () {
    this.getTabBar().setData({ selected: 2 });
    var t = wx.getStorageSync("waterData");
    t && this.data.video.length > 0
      ? (this.setData({
          waterData: t,
          isMsg: !!wx.getStorageSync("isMsg"),
          isWater: !0,
        }),
        wx.setStorageSync("isMsg", null),
        wx.setStorageSync("waterData", null),
        this.onEdit())
      : this.setData({ isWater: !1 });
    var a = wx.getStorageSync("link");
    if (a) {
      if ((wx.setStorageSync("link", null), this.data.video.length >= 5))
        return wx.showToast({ title: "达到上限", icon: "none" }), !1;
      var e = { src: a };
      this.setData({ video: this.data.video.concat([e]), type: 2, input: "" });
    }
    console.log("huakuangtitle", wx.getStorageSync("pictureid")),
      (wx.getStorageSync("huakuangtitle") || wx.getStorageSync("pictureid")) &&
        this.getPictureList(),
      console.log("icon_id", wx.getStorageSync("icon_id")),
      wx.getStorageSync("icon_id") && this.getIconList();
  },
  onLoad: function (a) {
    var e = this,
      i = this;
    wx.onNeedPrivacyAuthorization &&
      (wx.onNeedPrivacyAuthorization(function (t) {
        i.setData({ showPrivacy: !0 }), (i.resolvePrivacyAuthorization = t);
      }),
      wx.requirePrivacyAuthorize({
        success: function () {},
        fail: function () {},
        complete: function () {},
      })),
      wx.onAppShow(function (t) {
        console.log(t);
      }),
      i.setData({ isSeo: !!a.seo }),
      console.log(t.userinfo),
      t.userinfo
        ? this.init(a)
        : (t.checkGetSignCallback = function (t) {
            e.init(a);
          });
  },
  init: function (a) {
    var e = this;
    e.getPictureList(),
      e.getIconList(),
      t.postData(t.apiurl + "/api/onGetHandle", {}, function (a) {
        e.setData({
          viphandle: a.data,
          userinfo: t.userinfo,
          handleClass: a.handleClass,
          problem: a.problem,
          timeLimit: a.timeLimit,
        });
        var i = wx.getStorageSync("forwardMaterials");
        i &&
          (wx.setStorageSync("forwardMaterials", null),
          (i[0].tempFilePath = i[0].path),
          e.setData({ uploadI: 0, type: 1, uploadData: i }),
          e.closeSelect(),
          e.onUpload());
      });
  },
  getIconList: function () {
    var a = this;
    t.postData(t.apiurl + "/icon/onGetList", {}, function (t) {
      a.setData({
        icon_list: t.data,
        icon_id: wx.getStorageSync("icon_id")
          ? wx.getStorageSync("icon_id")
          : "",
      }),
        wx.setStorageSync("icon_id", null);
    });
  },
  onClearPicture: function () {
    this.setData({ picture_i: "", picturetitle: "" });
  },
  onSelectPicture: function (t) {
    var a = t.currentTarget.dataset.i;
    this.setData({ picture_i: a, picturetitle: "" });
  },
  getPictureList: function () {
    var a = this,
      e = wx.getStorageSync("hk_ids") ? wx.getStorageSync("hk_ids") : "";
    t.postData(
      t.apiurl + "/api/onGetPictureList",
      { type: "hot", hk_ids: e },
      function (t) {
        var e = "",
          i = wx.getStorageSync("pictureid");
        if ((console.log("pictureid", i), i))
          for (var o in t.data) t.data[o].id == i && (e = o);
        console.log("picture_i", e),
          a.setData({
            picturelist: t.data,
            picture_i: e,
            picturetitle: wx.getStorageSync("huakuangtitle")
              ? wx.getStorageSync("huakuangtitle")
              : "",
          }),
          wx.setStorageSync("pictureid", null),
          wx.setStorageSync("huakuangtitle", null);
      }
    );
  },
  onSelectIcon: function (t) {
    var a = t.currentTarget.dataset.id;
    this.setData({ icon_id: a == this.data.icon_id ? "" : a });
  },
  handleAgreePrivacyAuthorization: function () {
    this.setData({ showPrivacy: !1 }),
      this.resolvePrivacyAuthorization({
        buttonId: "agree-btn",
        event: "agree",
      });
  },
  openPrivacy: function () {
    wx.openPrivacyContract({
      success: function () {},
      fail: function () {},
      complete: function () {},
    });
  },
  exitMini: function () {
    wx.exitMiniProgram({ success: function (t) {} });
  },
  onCopy: function () {
    var a = this;
    if (a.data.video.length >= 5)
      return wx.showToast({ title: "达到上限", icon: "none" }), !1;
    wx.getClipboardData({
      success: function (e) {
        var i = e.data;
        if (t.isURL(i)) {
          var o = {
            src: i.match(
              /(https?|http|ftp|file):\/\/[-A-Za-z0-9+&@#/%?=~_|!:,.;]+[-A-Za-z0-9+&@#/%=~_|]/g
            )[0],
          };
          a.setData({ video: a.data.video.concat([o]), type: 2, input: "" });
        } else wx.showToast({ title: "未检测到链接", icon: "none" });
      },
    });
  },
  onInput: function (a) {
    if (t.isURL(a.detail.value)) {
      var e = a.detail.value.match(
        /(https?|http|ftp|file):\/\/[-A-Za-z0-9+&@#/%?=~_|!:,.;]+[-A-Za-z0-9+&@#/%=~_|]/g
      );
      (e = { src: (e = e[0]) }),
        this.setData({
          video: this.data.video.concat([e]),
          type: 2,
          input: "",
        });
    } else this.setData({ input: "" });
  },
  onCut: function () {
    if (0 == this.data.video.length)
      return wx.showToast({ title: "请先上传视频", icon: "none" }), !1;
    this.editVideo(this.data.video[0].tempFilePath);
  },
  onWater: function () {
    if (0 == this.data.video.length)
      return wx.showToast({ title: "请先上传视频", icon: "none" }), !1;
    this.goWater(this.data.video[0].tempFilePath);
  },
  vipHandleClass: function (t) {
    var a = t.currentTarget.dataset.i,
      e = this.data.viphandle,
      i = this.data.handleClass;
    if (0 == this.data.video.length)
      return wx.showToast({ title: "请先上传视频", icon: "none" }), !1;
    for (var o in e)
      e[o].state =
        0 == parseInt(o) || i[0].data[a].code.indexOf(parseInt(o)) > -1;
    for (var s in i[0].data) i[0].data[s].state = parseInt(s) == a;
    this.setData({ viphandle: e, handleClass: i });
  },
  vipHandle: function (t) {
    var a = t.currentTarget.dataset.i,
      e = this.data.viphandle;
    if (0 == this.data.video.length)
      return wx.showToast({ title: "请先上传视频", icon: "none" }), !1;
    if (0 != a) {
      if (((e[a].state = !e[a].state), e[a].name && e[a].state))
        for (var i in e) i != a && e[a].name == e[i].name && (e[i].state = !1);
      var o = this.data.handleClass;
      for (var s in o[0].data) o[0].data[s].state = !1;
      this.setData({ viphandle: e, handleClass: o });
    }
  },
  editVideo: function (t) {
    var a = this;
    wx.openVideoEditor({
      filePath: t,
      success: function (t) {
        var e = JSON.parse(JSON.stringify(a.data.video));
        "",
          (e[0].tempFilePath = t.tempFilePath),
          a.setData({ isCut: !0, video: e });
      },
    });
  },
  onUpload: function () {
    return (
      console.log(this.data.uploadData[this.data.uploadI]),
      this.data.uploadData[this.data.uploadI].size >= 1048576e3
        ? (0 == this.data.video.length && this.setData({ type: "" }),
          wx.showToast({
            title: "文件" + (this.data.uploadI + 1) + "体积过大",
            icon: "none",
          }),
          !1)
        : this.data.timeLimit &&
          this.data.uploadData[this.data.uploadI].duration &&
          this.data.uploadData[this.data.uploadI].duration >
            60 * this.data.timeLimit
        ? (0 == this.data.video.length && this.setData({ type: "" }),
          wx.showToast({
            title:
              "文件" +
              (this.data.uploadI + 1) +
              "超过" +
              this.data.timeLimit +
              "分钟",
            icon: "none",
          }),
          !1)
        : (this.setData({
            video: this.data.video.concat([
              this.data.uploadData[this.data.uploadI],
            ]),
          }),
          Date.parse(new Date()),
          void this.uploadObj())
    );
  },
  uploadObj: function () {
    var a = {},
      e = this;
    (a.timestamp = Date.parse(new Date()) / 1e3),
      t.getSign(a).then(function (i) {
        (a.sign = i),
          t.postData(
            t.apiurl + "/videooss/getsigntest",
            a,
            function (t) {
              var a = {
                key: t.data.key,
                policy: t.data.policy,
                OSSAccessKeyId: t.data.OSSAccessKeyId,
                signature: t.data.signature,
              };
              console.log("form", a), e._uploadObj(a);
            },
            function (t) {
              e.setData({ error: t.msg });
            }
          );
      });
  },
  _uploadObj: function (t) {
    var e = this;
    e.setData({
      adMsgState: !0,
      msgtitle: e.data.uploadData.length + "/" + (e.data.uploadI + 1),
    }),
      (a = wx.uploadFile({
        url: "https://videocsdf-bj.oss-cn-beijing.aliyuncs.com",
        filePath: e.data.uploadData[e.data.uploadI].tempFilePath,
        name: "file",
        timeout: 6e6,
        formData: t,
        success: function (a) {
          wx.hideLoading();
          var i = JSON.parse(JSON.stringify(e.data.video));
          (i[i.length - 1].src = "https://bj-oss.ddfans.com/" + t.key),
            e.setData({
              video: i,
              adMsgState: !1,
              uploadI: e.data.uploadI + 1,
            }),
            e.data.uploadI < e.data.uploadData.length && e.onUpload();
        },
        fail: function (t) {
          if (
            (console.log(t),
            wx.hideLoading(),
            e.setData({ adMsgState: !1 }),
            "600004" == t.errno)
          )
            return (
              wx.showToast({ title: "取消上传！", icon: "none", mask: !0 }), !1
            );
          var a = JSON.parse(JSON.stringify(e.data.video));
          a.splice(e.data.video.length - 1, 1),
            e.setData({
              video: a,
              type: 0 != a.length ? e.data.type : "",
              isCut: !1,
            }),
            wx.showToast({
              title: "网络超时，请稍后再试",
              icon: "none",
              mask: !0,
            });
        },
      })).onProgressUpdate(function (t) {
        e.setData({
          adMsgState: !0,
          msgtitle: e.data.uploadData.length + "/" + (e.data.uploadI + 1),
          progress: t.progress + "%",
        });
      });
  },
  uploadObj1111: function (t) {
    var e =
        arguments.length > 1 && void 0 !== arguments[1]
          ? arguments[1]
          : "https://uposs.ddfans.com:3303/douyin/upload.php",
      i = this;
    i.setData({
      adMsgState: !0,
      msgtitle: i.data.uploadData.length + "/" + (i.data.uploadI + 1),
    }),
      (a = wx.uploadFile({
        url: e,
        filePath: i.data.uploadData[i.data.uploadI].tempFilePath,
        name: "files",
        timeout: 6e6,
        formData: t,
        success: function (t) {
          console.log(t), console.log(e), wx.hideLoading();
          var a = JSON.parse(t.data),
            o = JSON.parse(JSON.stringify(i.data.video));
          (o[o.length - 1].src = a.url),
            i.setData({
              video: o,
              adMsgState: !1,
              uploadI: i.data.uploadI + 1,
            }),
            i.data.uploadI < i.data.uploadData.length && i.onUpload();
        },
        fail: function (a) {
          if (
            (console.log(a),
            "uploadFile:fail createUploadTask:fail url not in domain list" ==
              a.errMsg || "https://47oss.ddfans.com/douyin/upload.php" != e)
          )
            return (
              i.uploadObj(
                t,
                (e = "https://47oss.ddfans.com/douyin/upload.php")
              ),
              !1
            );
          if (
            (wx.hideLoading(),
            i.setData({ adMsgState: !1 }),
            "600004" == a.errno)
          )
            return (
              wx.showToast({ title: "取消上传！", icon: "none", mask: !0 }), !1
            );
          var o = JSON.parse(JSON.stringify(i.data.video));
          o.splice(i.data.video.length - 1, 1),
            i.setData({
              video: o,
              type: 0 != o.length ? i.data.type : "",
              isCut: !1,
            }),
            wx.showToast({
              title: "网络超时，请稍后再试",
              icon: "none",
              mask: !0,
            });
        },
      })).onProgressUpdate(function (t) {
        i.setData({
          adMsgState: !0,
          msgtitle: i.data.uploadData.length + "/" + (i.data.uploadI + 1),
          progress: t.progress + "%",
        });
      });
  },
  isHideAd: function () {
    this.setData({ adState: !1, error: "" });
  },
  closeSelect: function () {
    this.setData({ bottom_btn: !1 });
  },
  openSelect: function () {
    if (this.data.video.length >= 5)
      return wx.showToast({ title: "最多5个视频！", icon: "none" }), !1;
    this.setData({ bottom_btn: !0 });
  },
  onClose: function (t) {
    var e = t.currentTarget.dataset.i,
      i = JSON.parse(JSON.stringify(this.data.video));
    this.data.video[e].src || a.abort(),
      i.splice(e, 1),
      this.setData({
        video: i,
        type: 0 != i.length ? this.data.type : "",
        isCut: !1,
      });
  },
  onSubmit: function (a) {
    var e = this;
    for (var i in e.data.video)
      if (!e.data.video[i].src)
        return (
          wx.showToast({ title: "请等待视频上传完成！", icon: "none" }), !1
        );
    if (0 == e.data.video.length)
      return wx.showToast({ title: "请选择视频", icon: "none" }), !1;
    wx.requestSubscribeMessage({
      tmplIds: [t.tmp],
      success: function (a) {
        e.setData({ isMsg: "accept" == a[t.tmp] }), e.onEdit();
      },
      fail: function (t) {
        e.setData({ isMsg: !1 }), e.onEdit();
      },
    });
  },
  clearData: function () {
    var t = this.data.viphandle,
      a = this.data.handleClass;
    for (var e in t) t[e].state = 0 == parseInt(e);
    for (var i in a[0].data) a[0].data[i].state = !1;
    this.setData({
      video: [],
      isCut: !1,
      viphandle: t,
      handleClass: a,
      uploadData: [],
      uploadI: 0,
      icon_id: "",
      type: "",
      isWater: !1,
      picturetitle: "",
      picture_i: "",
    });
  },
  onShowMsg: function (t) {
    wx.previewImage({ urls: [t.currentTarget.dataset.img] });
  },
  onEdit: function () {
    var t = {};
    t.handle = [];
    var a = this.data.viphandle;
    for (var e in a) a[e].state && t.handle.push(a[e].code);
    this.data.isWater &&
      1 == this.data.video.length &&
      1 == this.data.type &&
      t.handle.push("onwater"),
      t.handle.length > 0
        ? (this.setData({ postData: { i: 0, ok: 0 } }),
          this.onPostEdit(t.handle.toString()))
        : this.data.isCut && 1 == this.data.video.length && 1 == this.data.type
        ? wx.navigateTo({
            url:
              "/pages/video/res/res?url=" +
              this.data.video.tempFilePath +
              "&type=edit" +
              (this.data.isSeo ? "&seo=1" : ""),
          })
        : wx.showToast({ title: "请选择类型", icon: "none" });
  },
  onPostEdit: function () {
    var a = this;
    wx.showLoading({ title: "加载中", mask: !0 });
    var e = {};
    (e.num = a.data.video.length),
      t.postData(
        t.apiurl + "/user/onCheckPay",
        e,
        function (t) {
          var e = a.data.userinfo;
          e.money = t.data;
          var i = !0;
          1 == t.level && ((i = !1), a._postEdit()),
            a.setData({ adState: i, money: t.money, userinfo: e });
        },
        function (t) {
          a.setData({ error: t.msg });
        }
      );
  },
  goHtml: function (t) {
    var a = t.currentTarget.dataset.url;
    wx.navigateTo({ url: "/pages/url/url?url=" + a });
  },
  _postEdit: function () {
    var a = this;
    a.setData({ error: "", return: "", adState: !1 }),
      wx.showLoading({ title: "正在提交!", mask: !0 });
    var e = { handle: [] },
      i = a.data.viphandle;
    for (var o in i) i[o].state && e.handle.push(i[o].code);
    a.data.isWater &&
      1 == a.data.video.length &&
      1 == a.data.type &&
      e.handle.push("onwater"),
      (e.handle = e.handle.toString()),
      a.data.isWater &&
        1 == a.data.video.length &&
        1 == a.data.type &&
        (e.waterData = JSON.stringify(a.data.waterData));
    var s = "";
    for (var o in a.data.video)
      s = s + ("" == s ? "" : "|") + a.data.video[o].src;
    (e.downlink = s),
      (e.icon_id = a.data.icon_id),
      "" !== a.data.picture_i &&
        ((e.picture_data = {}),
        (e.picture_data.url = a.data.picturelist[a.data.picture_i].url),
        a.data.picturelist[a.data.picture_i].form > 0 &&
          ((e.picture_data.data = a.data.picturelist[a.data.picture_i].data),
          (e.picture_data.data[0].title = a.data.picturetitle)),
        (e.picture_data = JSON.stringify(e.picture_data))),
      t.postData(
        t.apiurl + "/user/onVideoHandle",
        e,
        function (t) {
          a.setData({ showHistory: !0, return: t.data }), a.clearData();
        },
        function (t) {}
      );
  },
  goWater: function (t) {
    var a = this;
    wx.getVideoInfo({
      src: t,
      success: function (e) {
        wx.navigateTo({
          url:
            "/pages/video/draw/draw?url=" +
            t +
            "&width=" +
            e.width +
            "&type=2&height=" +
            e.height +
            (a.data.isSeo ? "&seo=1" : ""),
        });
      },
    });
  },
  noAd: function () {
    wx.setStorageSync("showVip", !0), wx.switchTab({ url: "/pages/user/user" });
  },
  selectImg: function (t) {
    var a = this;
    "",
      "0" == t.currentTarget.dataset.type
        ? wx.chooseMedia({
            sourceType: ["album"],
            mediaType: ["video"],
            sizeType: ["original"],
            count: 5 - a.data.video.length,
            success: function (t) {
              console.log(t),
                a.setData({ uploadI: 0, type: 1, uploadData: t.tempFiles }),
                a.closeSelect(),
                a.onUpload();
            },
          })
        : wx.chooseMessageFile({
            count: 5 - a.data.video.length,
            type: "video",
            success: function (t) {
              for (var e in (a.closeSelect(), t.tempFiles))
                t.tempFiles[e].tempFilePath = t.tempFiles[e].path;
              a.setData({ uploadI: 0, type: 1, uploadData: t.tempFiles }),
                a.closeSelect(),
                a.onUpload();
            },
          });
  },
  onShareAppMessage: function (t) {
    return {
      title: "视频一键去重",
      path: "/pages/video/video?type=8777",
      imageUrl:
        "https://apis.ddfans.com/bian/public/static/image/qsy/tu-share-2.jpg?v=1",
    };
  },
});
