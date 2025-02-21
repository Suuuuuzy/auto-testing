(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
  ["pages/boutiqueBookForm"],
  {
    "1a7a": function (t, e, i) {
      "use strict";
      (function (t, n) {
        var s = i("47a9");
        Object.defineProperty(e, "__esModule", { value: !0 }),
          (e.default = void 0);
        var a = s(i("7ca3")),
          r = i("8f59"),
          o = s(i("f811")),
          c = i("4bd4"),
          h = s(i("e94a")),
          u = i("7791");
        function d(t, e) {
          var i = Object.keys(t);
          if (Object.getOwnPropertySymbols) {
            var n = Object.getOwnPropertySymbols(t);
            e &&
              (n = n.filter(function (e) {
                return Object.getOwnPropertyDescriptor(t, e).enumerable;
              })),
              i.push.apply(i, n);
          }
          return i;
        }
        var l = {
          config: { navigationStyle: "custom", disableScroll: !0 },
          components: {
            ppNav: function () {
              i.e("components/pp/Nav")
                .then(
                  function () {
                    return resolve(i("ac66"));
                  }.bind(null, i)
                )
                .catch(i.oe);
            },
            PrivacyPopup: function () {
              i.e("components/privacyPopup")
                .then(
                  function () {
                    return resolve(i("42b0"));
                  }.bind(null, i)
                )
                .catch(i.oe);
            },
          },
          computed: (function (t) {
            for (var e = 1; e < arguments.length; e++) {
              var i = null != arguments[e] ? arguments[e] : {};
              e % 2
                ? d(Object(i), !0).forEach(function (e) {
                    (0, a.default)(t, e, i[e]);
                  })
                : Object.getOwnPropertyDescriptors
                ? Object.defineProperties(
                    t,
                    Object.getOwnPropertyDescriptors(i)
                  )
                : d(Object(i)).forEach(function (e) {
                    Object.defineProperty(
                      t,
                      e,
                      Object.getOwnPropertyDescriptor(i, e)
                    );
                  });
            }
            return t;
          })(
            {},
            (0, r.mapState)({
              user: function (t) {
                return t.user;
              },
              code: function (t) {
                return t.code;
              },
              navigationBarHeight: function (t) {
                return t.navigationBarHeight;
              },
              navigationBarHeightPlaceholder: function (t) {
                return t.navigationBarHeightPlaceholder;
              },
              bookCache: function (t) {
                return t.bookCache;
              },
              userCache: function (t) {
                return t.userCache;
              },
            })
          ),
          data: function () {
            return {
              likedWatch: "",
              gem: 0,
              watchGender: 0,
              together: 0,
              detail: null,
              previewThumb: "",
              gender: 1,
              lastname: "",
              firstname: "",
              lastname_pinyin: "",
              firstname_pinyin: "",
              phone: "",
              code_sms: "",
              province: "",
              city: "",
              district: "",
              service: "",
              series: "",
              cert: [],
              audio: "",
              others: "",
              videoUrl: "",
              checked: !1,
              serviceList: [
                "表带更换",
                "腕表检测",
                "维修保养（需携带腕表证书）",
                "日常保养",
              ],
              likedWatchList: [
                "万年历",
                "世界时",
                "旅行时间",
                "计时",
                "年历",
                "简单功能",
              ],
              togetherList: ["1", "2", "3", "4", "5"],
              showMore: !1,
              smsStatus: !1,
              smsText: "获取",
              smsTimer: null,
              smsTime: 60,
              audioStartTime: 0,
              audioFile: "",
              audioDuration: "",
              audioCtx: null,
              percent: 0,
              recorderManager: null,
              likedWatchLength: 0,
              recording: !1,
            };
          },
          methods: {
            chooseGem: function (t) {
              t !== this.gem ? (this.gem = t) : (this.gem = 0);
            },
            chooseWatchGender: function (t) {
              t !== this.watchGender
                ? (this.watchGender = t)
                : (this.watchGender = 0);
            },
            toPolicy: function () {
              this.$router.push(
                "web?url=" +
                  encodeURIComponent(
                    "https://www.patek.com/chs/%E6%B3%95%E5%BE%8B%E5%A3%B0%E6%98%8E/%E9%9A%90%E7%A7%81%E5%A3%B0%E6%98%8E"
                  )
              );
            },
            toFilter: function () {
              var t = {};
              1 === this.watchGender
                ? (t.gender = ["男士腕表"])
                : 2 === this.watchGender && (t.gender = ["女士腕表"]),
                1 === this.gem
                  ? (t.gemset = ["是"])
                  : 2 === this.gem && (t.gemset = ["否"]),
                console.log(t),
                this.$store.commit("UPDATE_CHOOSED_FILTER", t),
                this.$router.push("boutique/filterResult");
            },
            lastNameChange: function () {
              for (
                var t = (0, o.default)(this.lastname, {
                    style: o.default.STYLE_NORMAL,
                  }),
                  e = [],
                  i = 0;
                i < t.length;
                i++
              ) {
                var n = t[i];
                e.push(n[0]);
              }
              var s = e.join("");
              this.lastname_pinyin = s.replace(s[0], s[0].toUpperCase());
            },
            firstNameChange: function () {
              for (
                var t = (0, o.default)(this.firstname, {
                    style: o.default.STYLE_NORMAL,
                  }),
                  e = [],
                  i = 0;
                i < t.length;
                i++
              ) {
                var n = t[i];
                e.push(n[0]);
              }
              var s = e.join("");
              this.firstname_pinyin = s.replace(s[0], s[0].toUpperCase());
            },
            login: function () {
              var e = this;
              t.login({
                success: function (t) {
                  t.code
                    ? e.$store.commit("UPDATE_CODE", t.code)
                    : e.$alert("微信登录失败，请返回后重试");
                },
              });
            },
            sendSMS: function () {
              var t = this;
              setTimeout(function () {
                /^1[0-9]\d{9}$/.test(t.phone)
                  ? t.smsStatus ||
                    ((t.smsStatus = !0),
                    clearInterval(t.smsTimer),
                    t.$http.sms(
                      { phone: t.phone },
                      function () {
                        (t.smsTime = 60),
                          (t.smsText = "".concat(t.smsTime, "秒")),
                          (t.smsTimer = setInterval(function () {
                            if ((t.smsTime--, t.smsTime < 0))
                              return (
                                clearInterval(t.smsTimer),
                                (t.smsText = "获取"),
                                void (t.smsStatus = !1)
                              );
                            t.smsText = "".concat(t.smsTime, "秒");
                          }, 1e3));
                      },
                      function () {
                        t.smsStatus = !1;
                      }
                    ))
                  : t.$alert("请输入正确的手机号");
              }, 20);
            },
            authPhone: function (t) {
              var e = this,
                i = t.mp.detail,
                n = i.encryptedData,
                s = i.iv,
                a = i.code;
              n && s
                ? this.$http.authPhoneByCode(
                    { encryptedData: n, iv: s, code: a },
                    function (t) {
                      t ? (e.phone = t.phone) : e.$alert("授权手机号失败");
                    },
                    function () {
                      e.login();
                    }
                  )
                : this.$alert("请授权您的手机号");
            },
            nextBook: function () {
              var e = this,
                i = this.$mp.query.scan;
              if (this.lastname)
                if (this.firstname)
                  if (this.lastname_pinyin)
                    if (this.firstname_pinyin)
                      if (this.phone)
                        if (this.code_sms)
                          if (this.province)
                            if (this.checked) {
                              if (this.detail.isService) {
                                if (!this.service)
                                  return void this.$toast("请选择服务类型");
                              } else if (0 === this.together)
                                return void this.$toast("请选择同行人数");
                              if (this.audioFile && !this.audio)
                                return (
                                  n.showLoading({ title: "加载中", mask: !0 }),
                                  void t.uploadFile({
                                    url: u.BASE_URL + "/upload.php",
                                    filePath: this.audioFile,
                                    name: "file",
                                    header: {
                                      impid: this.user.openid,
                                      imptoken: this.user.token,
                                    },
                                    success: function (i) {
                                      var n = i.statusCode;
                                      if (n >= 400 && n < 600)
                                        e.$alert("服务器开了一个小差");
                                      else {
                                        var s = JSON.parse(i.data),
                                          a = s["info"]["code"];
                                        "S001" === a
                                          ? (t.hideLoading(),
                                            (e.audio = s["data"].filename),
                                            e.nextBook())
                                          : (t.hideLoading(),
                                            e.$alert("请等待或再试试"));
                                      }
                                    },
                                    fail: function (i) {
                                      t.hideLoading(),
                                        e.$alert("请等待或再试试");
                                    },
                                  })
                                );
                              var s = {
                                boutique_code: this.detail.id,
                                gender: this.gender,
                                lastname: this.lastname,
                                firstname: this.firstname,
                                lastname_pinyin: this.lastname_pinyin,
                                firstname_pinyin: this.firstname_pinyin,
                                province: this.province,
                                district: this.district,
                                city: this.city,
                                phone: this.phone,
                                code_sms: this.code_sms,
                                is_service: this.detail.isService ? 1 : 0,
                              };
                              this.$store.commit("UPDATE_USER_CACHE", {
                                gender: this.gender,
                                lastname: this.lastname,
                                firstname: this.firstname,
                                lastname_pinyin: this.lastname_pinyin,
                                firstname_pinyin: this.firstname_pinyin,
                                province: this.province,
                                city: this.city,
                                district: this.district,
                                phone: this.phone,
                              }),
                                (s = this.detail.isService
                                  ? Object.assign(s, {
                                      interest_watches: "",
                                      service_type: this.service,
                                      watch_series: this.series,
                                      watch_cert_pic: this.cert.join(";"),
                                      others: this.others,
                                      audio: this.audio,
                                    })
                                  : Object.assign(s, {
                                      interest_watches: this.likedWatch,
                                      service_type: "",
                                      watch_series: "",
                                      watch_cert_pic: "",
                                      others: this.others,
                                      audio: this.audio,
                                      together: this.together,
                                      gem: this.gem,
                                      watch_gender: this.watchGender,
                                    })),
                                i
                                  ? this.$http.bookScan(s, function (t) {
                                      var i = t.token;
                                      (s = Object.assign(s, { token: i })),
                                        e.$store.commit("UPDATE_BOOK_CACHE", s),
                                        e.$router.replace(
                                          "boutiqueScanAddition?id=" +
                                            e.detail.id
                                        );
                                    })
                                  : (this.$store.commit("UPDATE_BOOK_CACHE", s),
                                    this.$router.replace(
                                      "boutiqueBookTime?id=" + this.detail.id
                                    ));
                            } else
                              this.$toast(
                                "请确认本人已满 16 周岁，并同意向百达翡丽提供本表格中的个人信息"
                              );
                          else this.$toast("请选择省市");
                        else this.$toast("请完善验证码");
                      else this.$toast("请完善手机号");
                    else this.$toast("请完善名字拼音");
                  else this.$toast("请完善姓氏拼音");
                else this.$toast("请完善名字");
              else this.$toast("请完善姓氏");
            },
            changeCity: function (t) {
              var e = t.detail.value;
              (this.province = e[0]),
                (this.city = e[1]),
                (this.district = e[2]);
            },
            changeService: function (t) {
              var e = parseInt(t.detail.value);
              this.service = JSON.parse(JSON.stringify(this.serviceList[e]));
            },
            changeTogether: function (t) {
              var e = parseInt(t.detail.value);
              this.together = JSON.parse(JSON.stringify(this.togetherList[e]));
            },
            changeLikedWatchList: function (t) {
              var e = parseInt(t.detail.value);
              this.likedWatch = JSON.parse(
                JSON.stringify(this.likedWatchList[e])
              );
            },
            removeCert: function (t) {
              var e = this;
              this.$alert({
                content: "确认删除这张图片吗？",
                showCancel: !0,
                success: function () {
                  e.cert.splice(t, 1);
                },
              });
            },
            uploadCert: function () {
              var e = this;
              t.chooseImage({
                count: 1,
                sizeType: ["compressed"],
                sourceType: ["album"],
                success: function (i) {
                  var n = i.tempFilePaths[0];
                  t.uploadFile({
                    url: u.BASE_URL + "/oss.php",
                    filePath: n,
                    name: "file",
                    header: { impid: e.user.openid, imptoken: e.user.token },
                    success: function (i) {
                      var n = i.statusCode;
                      if (n >= 400 && n < 600) e.$alert("服务器开了一个小差");
                      else {
                        var s = JSON.parse(i.data),
                          a = s["info"]["code"];
                        if ("S001" === a) {
                          t.hideToast();
                          var r = s["data"].filename;
                          e.cert.push(r);
                        } else t.hideToast(), e.$alert("请等待或再试试");
                      }
                    },
                    fail: function (i) {
                      t.hideToast(), e.$alert("请等待或再试试");
                    },
                  });
                },
              });
            },
            preSaveCloseWeek: function () {
              t.request({
                url:
                  "https://patek.resource.impdigital.cn/close_week.json?v=" +
                  Date.parse(new Date()),
                method: "GET",
                header: { "Content-Type": "application/json" },
                success: function (e) {
                  t.setStorageSync("closeWeek", e.data);
                },
                fail: function () {},
                complete: function () {},
              });
            },
            getDisableDay: function () {
              this.$http.disableDay({}, function (e) {
                t.setStorageSync("disable_day", e);
              });
            },
            startRecord: function () {
              (this.audioStartTime = new Date().valueOf()),
                (this.recording = !0),
                this.recorderManager.start({ format: "mp3" });
            },
            finishRecord: function () {
              var t = new Date().valueOf(),
                e = Math.ceil((t - this.audioStartTime) / 1e3),
                i = Math.floor(e / 60),
                n = e - 60 * i;
              (this.audioDuration = ""
                .concat(i < 10 ? "0" + i : i, ":")
                .concat(n < 10 ? "0" + n : n)),
                this.recorderManager.stop(),
                (this.recording = !1);
            },
            toggleAudio: function () {
              var e = this;
              this.audioCtx ||
                ((this.audioCtx = t.createInnerAudioContext()),
                this.audioCtx.onPlay(function () {
                  console.log("start");
                }),
                setTimeout(function () {
                  e.audioCtx.currentTime,
                    e.audioCtx.onTimeUpdate(function () {
                      (e.percent = Math.ceil(
                        (e.audioCtx.currentTime / e.audioCtx.duration) * 100
                      )),
                        console.log(e.percent);
                    });
                }, 100),
                this.audioCtx.onEnded(function () {
                  e.percent = 100;
                })),
                (this.audioCtx.obeyMuteSwitch = !1),
                this.audioCtx.src !== this.audioFile &&
                  (this.audioCtx.src = this.audioFile),
                this.audioCtx.paused || 100 === this.percent
                  ? ((this.audioCtx.startTime = 0),
                    this.audioCtx.play(),
                    this.audioCtx.seek(0))
                  : this.audioCtx.pause();
            },
            openMore: function () {
              var t = this;
              (this.showMore = !0),
                (this.recorderManager = n.getRecorderManager()),
                this.recorderManager.onStop(function (e) {
                  (t.percent = 0), (t.audioFile = e.tempFilePath);
                });
            },
          },
          mounted: function () {
            var t = this;
            if (
              ("m04v" == this.$mp.query.id
                ? (this.videoUrl = "https://cdn.impdigital.cn/patek/PP_BJ.mp4")
                : (this.videoUrl = "https://cdn.impdigital.cn/patek/PP_SH.mp4"),
              this.preSaveCloseWeek(),
              this.getDisableDay(),
              (this.recorderManager = n.getRecorderManager()),
              this.recorderManager.onStop(function (e) {
                (t.percent = 0), (t.audioFile = e.tempFilePath);
              }),
              this.recorderManager.onError(function (e) {
                t.$toast("录音失败啦，请长按重新试试"),
                  (t.percent = 0),
                  (t.audioFile = "");
              }),
              this.userCache)
            ) {
              var e = this.userCache,
                i = e.gender,
                s = e.lastname,
                a = e.firstname,
                r = e.lastname_pinyin,
                o = e.firstname_pinyin,
                c = e.province,
                h = e.city,
                u = e.district,
                d = e.phone;
              (this.gender = i),
                (this.lastname = s),
                (this.firstname = a),
                (this.lastname_pinyin = r),
                (this.firstname_pinyin = o),
                (this.province = c),
                (this.city = h),
                (this.district = u),
                (this.phone = d);
            }
          },
          onShow: function () {
            this.detail || this.$store.commit("UPDATE_LIKED_WATCH", []),
              (this.likedWatchLength = this.likedWatch.length),
              this.login();
            var t = this.$root.$mp.query;
            if (!t || !t.id)
              return (
                (this.detail = null),
                void this.$alert("获取参数错误，请返回后重试")
              );
            if (!this.detail || this.detail.id !== t.id) {
              var e = (0, c.getBoutiqueById)(t.id);
              e && h.default[t.id]
                ? ((e = Object.assign(e, h.default[t.id])),
                  e.view && (this.previewThumb = e.thumb),
                  (this.detail = e))
                : this.$alert("当前店铺不支持预约");
            }
          },
          onShareAppMessage: function (t) {
            var e = "/pages/index?path=boutique%3Fid%3D".concat(this.detail.id),
              i = this.previewThumb;
            return { title: "百达翡丽时计查询", path: e, imageUrl: i };
          },
        };
        e.default = l;
      }).call(this, i("df3c")["default"], i("3223")["default"]);
    },
    "4f8f": function (t, e, i) {
      "use strict";
      (function (t, e) {
        var n = i("47a9");
        i("b45a");
        n(i("3240"));
        var s = n(i("5680"));
        (t.__webpack_require_UNI_MP_PLUGIN__ = i), e(s.default);
      }).call(this, i("3223")["default"], i("df3c")["createPage"]);
    },
    5680: function (t, e, i) {
      "use strict";
      i.r(e);
      var n = i("a67f"),
        s = i("a716");
      for (var a in s)
        ["default"].indexOf(a) < 0 &&
          (function (t) {
            i.d(e, t, function () {
              return s[t];
            });
          })(a);
      i("aef6");
      var r = i("828b"),
        o = Object(r["a"])(
          s["default"],
          n["b"],
          n["c"],
          !1,
          null,
          "2762f3c8",
          null,
          !1,
          n["a"],
          void 0
        );
      e["default"] = o.exports;
    },
    a67f: function (t, e, i) {
      "use strict";
      i.d(e, "b", function () {
        return n;
      }),
        i.d(e, "c", function () {
          return s;
        }),
        i.d(e, "a", function () {});
      var n = function () {
          var t = this,
            e = t.$createElement;
          t._self._c;
          t._isMounted ||
            ((t.e0 = function (e) {
              t.gender = 1;
            }),
            (t.e1 = function (e) {
              t.gender = 2;
            }),
            (t.e2 = function (e) {
              t.checked = !t.checked;
            }));
        },
        s = [];
    },
    a716: function (t, e, i) {
      "use strict";
      i.r(e);
      var n = i("1a7a"),
        s = i.n(n);
      for (var a in n)
        ["default"].indexOf(a) < 0 &&
          (function (t) {
            i.d(e, t, function () {
              return n[t];
            });
          })(a);
      e["default"] = s.a;
    },
    aef6: function (t, e, i) {
      "use strict";
      var n = i("e11c"),
        s = i.n(n);
      s.a;
    },
    e11c: function (t, e, i) {},
  },
  [["4f8f", "common/runtime", "common/vendor"]],
]);
