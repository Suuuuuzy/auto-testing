!(function () {
  var root, factory;
  (root = "undefined" != typeof self ? self : this),
    (factory = function () {
      return (function (e) {
        var t = {};
        function n(i) {
          if (t[i]) return t[i].exports;
          var a = (t[i] = { i: i, l: !1, exports: {} });
          return e[i].call(a.exports, a, a.exports, n), (a.l = !0), a.exports;
        }
        return (
          (n.m = e),
          (n.c = t),
          (n.d = function (e, t, i) {
            n.o(e, t) ||
              Object.defineProperty(e, t, {
                configurable: !1,
                enumerable: !0,
                get: i,
              });
          }),
          (n.n = function (e) {
            var t =
              e && e.__esModule
                ? function () {
                    return e.default;
                  }
                : function () {
                    return e;
                  };
            return n.d(t, "a", t), t;
          }),
          (n.o = function (e, t) {
            return Object.prototype.hasOwnProperty.call(e, t);
          }),
          (n.p = "/Users/tianfeng/Documents/项目/sdk/cos-wx-sdk-v5/demo/lib"),
          n((n.s = 6))
        );
      })([
        function (e, t, n) {
          "use strict";
          (function (t) {
            var i =
                "function" == typeof Symbol &&
                "symbol" == typeof Symbol.iterator
                  ? function (e) {
                      return typeof e;
                    }
                  : function (e) {
                      return e &&
                        "function" == typeof Symbol &&
                        e.constructor === Symbol &&
                        e !== Symbol.prototype
                        ? "symbol"
                        : typeof e;
                    },
              a = n(8),
              o = n(12),
              r = n(13),
              s = n(16),
              c = n(3).btoa,
              l = wx.getFileSystemManager();
            function p(e) {
              return encodeURIComponent(e)
                .replace(/!/g, "%21")
                .replace(/'/g, "%27")
                .replace(/\(/g, "%28")
                .replace(/\)/g, "%29")
                .replace(/\*/g, "%2A");
            }
            function u(e, t) {
              var n = [];
              for (var i in e)
                e.hasOwnProperty(i) && n.push(t ? p(i).toLowerCase() : i);
              return n.sort(function (e, t) {
                return (e = e.toLowerCase()) === (t = t.toLowerCase())
                  ? 0
                  : e > t
                  ? 1
                  : -1;
              });
            }
            var d = [
                "content-disposition",
                "content-encoding",
                "content-length",
                "content-md5",
                "expect",
                "expires",
                "host",
                "if-match",
                "if-modified-since",
                "if-none-match",
                "if-unmodified-since",
                "origin",
                "range",
                "response-cache-control",
                "response-content-disposition",
                "response-content-encoding",
                "response-content-language",
                "response-content-type",
                "response-expires",
                "transfer-encoding",
                "versionid",
              ],
              m = function () {},
              f = function (e) {
                var t = {};
                for (var n in e)
                  e.hasOwnProperty(n) &&
                    void 0 !== e[n] &&
                    null !== e[n] &&
                    (t[n] = e[n]);
                return t;
              };
            function h(e) {
              return y(e, function (e) {
                return "object" === (void 0 === e ? "undefined" : i(e)) &&
                  null !== e
                  ? h(e)
                  : e;
              });
            }
            function g(e, t) {
              return (
                x(t, function (n, i) {
                  e[i] = t[i];
                }),
                e
              );
            }
            function v(e) {
              return e instanceof Array;
            }
            function x(e, t) {
              for (var n in e) e.hasOwnProperty(n) && t(e[n], n);
            }
            function y(e, t) {
              var n = v(e) ? [] : {};
              for (var i in e) e.hasOwnProperty(i) && (n[i] = t(e[i], i));
              return n;
            }
            var C,
              b,
              k,
              S = function (e, t) {
                if (
                  ((t = g({}, t)),
                  "getAuth" !== e && "getV4Auth" !== e && "getObjectUrl" !== e)
                ) {
                  var n = t.Headers || {};
                  t &&
                    "object" === (void 0 === t ? "undefined" : i(t)) &&
                    (!(function () {
                      for (var e in t)
                        t.hasOwnProperty(e) &&
                          e.indexOf("x-cos-") > -1 &&
                          (n[e] = t[e]);
                    })(),
                    A.each(
                      {
                        "x-cos-mfa": "MFA",
                        "Content-MD5": "ContentMD5",
                        "Content-Length": "ContentLength",
                        "Content-Type": "ContentType",
                        Expect: "Expect",
                        Expires: "Expires",
                        "Cache-Control": "CacheControl",
                        "Content-Disposition": "ContentDisposition",
                        "Content-Encoding": "ContentEncoding",
                        Range: "Range",
                        "If-Modified-Since": "IfModifiedSince",
                        "If-Unmodified-Since": "IfUnmodifiedSince",
                        "If-Match": "IfMatch",
                        "If-None-Match": "IfNoneMatch",
                        "x-cos-copy-source": "CopySource",
                        "x-cos-copy-source-Range": "CopySourceRange",
                        "x-cos-metadata-directive": "MetadataDirective",
                        "x-cos-copy-source-If-Modified-Since":
                          "CopySourceIfModifiedSince",
                        "x-cos-copy-source-If-Unmodified-Since":
                          "CopySourceIfUnmodifiedSince",
                        "x-cos-copy-source-If-Match": "CopySourceIfMatch",
                        "x-cos-copy-source-If-None-Match":
                          "CopySourceIfNoneMatch",
                        "x-cos-acl": "ACL",
                        "x-cos-grant-read": "GrantRead",
                        "x-cos-grant-write": "GrantWrite",
                        "x-cos-grant-full-control": "GrantFullControl",
                        "x-cos-grant-read-acp": "GrantReadAcp",
                        "x-cos-grant-write-acp": "GrantWriteAcp",
                        "x-cos-storage-class": "StorageClass",
                        "x-cos-server-side-encryption-customer-algorithm":
                          "SSECustomerAlgorithm",
                        "x-cos-server-side-encryption-customer-key":
                          "SSECustomerKey",
                        "x-cos-server-side-encryption-customer-key-MD5":
                          "SSECustomerKeyMD5",
                        "x-cos-server-side-encryption": "ServerSideEncryption",
                        "x-cos-server-side-encryption-cos-kms-key-id":
                          "SSEKMSKeyId",
                        "x-cos-server-side-encryption-context": "SSEContext",
                      },
                      function (e, i) {
                        void 0 !== t[e] && (n[i] = t[e]);
                      }
                    ),
                    (t.Headers = f(n)));
                }
                return t;
              },
              R = function (e) {
                return Date.now() + (e || 0);
              },
              w = function (e, t) {
                (e = e.split(".")), (t = t.split("."));
                for (var n = Math.max(e.length, t.length); e.length < n; )
                  e.push("0");
                for (; t.length < n; ) t.push("0");
                for (var i = 0; i < n; i++) {
                  var a = parseInt(e[i]),
                    o = parseInt(t[i]);
                  if (a > o) return 1;
                  if (a < o) return -1;
                }
                return 0;
              },
              _ =
                ((C = wx.getSystemInfoSync()),
                (b = w(C.SDKVersion, "2.10.0") >= 0),
                (k = !b && "devtools" === C.platform),
                function () {
                  return (
                    k &&
                      console.warn(
                        "当前小程序版本小于 2.10.0，不支持分片上传，请更新软件。"
                      ),
                    (k = !1),
                    b
                  );
                }),
              A = {
                noop: m,
                formatParams: S,
                apiWrapper: function (e, n) {
                  return function (i, a) {
                    var o = this;
                    "function" == typeof i && ((a = i), (i = {})),
                      (i = S(e, i));
                    var r = function (e) {
                        return (
                          e &&
                            e.headers &&
                            (e.headers["x-cos-version-id"] &&
                              (e.VersionId = e.headers["x-cos-version-id"]),
                            e.headers["x-cos-delete-marker"] &&
                              (e.DeleteMarker =
                                e.headers["x-cos-delete-marker"])),
                          e
                        );
                      },
                      s = function (e, t) {
                        a && a(r(e), r(t));
                      },
                      c = (function () {
                        if ("getService" !== e && "abortUploadTask" !== e) {
                          var t = (function (e, t) {
                            var n = t.Bucket,
                              i = t.Region,
                              a = t.Key;
                            if (
                              e.indexOf("Bucket") > -1 ||
                              "deleteMultipleObject" === e ||
                              "multipartList" === e ||
                              "listObjectVersions" === e
                            ) {
                              if (!n) return "Bucket";
                              if (!i) return "Region";
                            } else if (
                              e.indexOf("Object") > -1 ||
                              e.indexOf("multipart") > -1 ||
                              "sliceUploadFile" === e ||
                              "abortUploadTask" === e
                            ) {
                              if (!n) return "Bucket";
                              if (!i) return "Region";
                              if (!a) return "Key";
                            }
                            return !1;
                          })(e, i);
                          if (t) return "missing param " + t;
                          if (i.Region) {
                            if (i.Region.indexOf("cos.") > -1)
                              return 'param Region should not be start with "cos."';
                            if (!/^([a-z\d-]+)$/.test(i.Region))
                              return "Region format error.";
                            o.options.CompatibilityMode ||
                              -1 !== i.Region.indexOf("-") ||
                              "yfb" === i.Region ||
                              "default" === i.Region ||
                              "accelerate" === i.Region ||
                              console.warn(
                                "warning: param Region format error, find help here: https://cloud.tencent.com/document/product/436/6224"
                              );
                          }
                          if (i.Bucket) {
                            if (!/^([a-z\d-]+)-(\d+)$/.test(i.Bucket))
                              if (i.AppId) i.Bucket = i.Bucket + "-" + i.AppId;
                              else {
                                if (!o.options.AppId)
                                  return 'Bucket should format as "test-1250000000".';
                                i.Bucket = i.Bucket + "-" + o.options.AppId;
                              }
                            i.AppId &&
                              (console.warn(
                                'warning: AppId has been deprecated, Please put it at the end of parameter Bucket(E.g Bucket:"test-1250000000" ).'
                              ),
                              delete i.AppId);
                          }
                          i.Key &&
                            "/" === i.Key.substr(0, 1) &&
                            (i.Key = i.Key.substr(1));
                        }
                      })(),
                      l = "getAuth" === e || "getObjectUrl" === e,
                      p = t.Promise;
                    if (!l && p && !a)
                      return new p(function (e, t) {
                        if (
                          ((a = function (n, i) {
                            n ? t(n) : e(i);
                          }),
                          c)
                        )
                          return s({ error: c });
                        n.call(o, i, s);
                      });
                    if (c) return s({ error: c });
                    var u = n.call(o, i, s);
                    return l ? u : void 0;
                  };
                },
                xml2json: r,
                json2xml: s,
                md5: a,
                clearKey: f,
                fileSlice: function (e, t, n, i) {
                  e
                    ? l.readFile({
                        filePath: e,
                        position: t,
                        length: n - t,
                        success: function (e) {
                          i(e.data);
                        },
                        fail: function () {
                          i(null);
                        },
                      })
                    : i(null);
                },
                getBodyMd5: function (e, t, n) {
                  (n = n || m),
                    e && t && t instanceof ArrayBuffer
                      ? A.getFileMd5(t, function (e, t) {
                          n(t);
                        })
                      : n();
                },
                getFileMd5: function (e, t) {
                  var n = a(e);
                  return t && t(n), n;
                },
                binaryBase64: function (e) {
                  var t,
                    n,
                    i,
                    a = "";
                  for (t = 0, n = e.length / 2; t < n; t++)
                    (i = parseInt(e[2 * t] + e[2 * t + 1], 16)),
                      (a += String.fromCharCode(i));
                  return c(a);
                },
                extend: g,
                isArray: v,
                isInArray: function (e, t) {
                  for (var n = !1, i = 0; i < e.length; i++)
                    if (t === e[i]) {
                      n = !0;
                      break;
                    }
                  return n;
                },
                makeArray: function (e) {
                  return v(e) ? e : [e];
                },
                each: x,
                map: y,
                filter: function (e, t) {
                  var n = v(e),
                    i = n ? [] : {};
                  for (var a in e)
                    e.hasOwnProperty(a) &&
                      t(e[a], a) &&
                      (n ? i.push(e[a]) : (i[a] = e[a]));
                  return i;
                },
                clone: h,
                attr: function (e, t, n) {
                  return e && t in e ? e[t] : n;
                },
                uuid: function () {
                  var e = function () {
                    return ((65536 * (1 + Math.random())) | 0)
                      .toString(16)
                      .substring(1);
                  };
                  return (
                    e() +
                    e() +
                    "-" +
                    e() +
                    "-" +
                    e() +
                    "-" +
                    e() +
                    "-" +
                    e() +
                    e() +
                    e()
                  );
                },
                camSafeUrlEncode: p,
                throttleOnProgress: function (e, t) {
                  var n,
                    i,
                    a = this,
                    o = 0,
                    r = 0,
                    s = Date.now();
                  function c() {
                    if (((i = 0), t && "function" == typeof t)) {
                      n = Date.now();
                      var a,
                        c =
                          Math.max(
                            0,
                            Math.round(((r - o) / ((n - s) / 1e3)) * 100) / 100
                          ) || 0;
                      (a =
                        0 === r && 0 === e
                          ? 1
                          : Math.floor((r / e) * 100) / 100 || 0),
                        (s = n),
                        (o = r);
                      try {
                        t({ loaded: r, total: e, speed: c, percent: a });
                      } catch (e) {}
                    }
                  }
                  return function (t, n) {
                    if ((t && ((r = t.loaded), (e = t.total)), n))
                      clearTimeout(i), c();
                    else {
                      if (i) return;
                      i = setTimeout(c, a.options.ProgressInterval);
                    }
                  };
                },
                getFileSize: function (e, t, n) {
                  "postObject" === e
                    ? n()
                    : "putObject" === e
                    ? void 0 !== t.Body
                      ? ((t.ContentLength = t.Body.byteLength),
                        n(null, t.ContentLength))
                      : n({ error: "missing param Body" })
                    : t.FilePath
                    ? l.stat({
                        path: t.FilePath,
                        success: function (e) {
                          var i = e.stats;
                          (t.FileStat = i), (t.FileStat.FilePath = t.FilePath);
                          var a = i.isDirectory() ? 0 : i.size;
                          (t.ContentLength = a = a || 0), n(null, a);
                        },
                        fail: function (e) {
                          n(e);
                        },
                      })
                    : n({ error: "missing param FilePath" });
                },
                getSkewTime: R,
                obj2str: function (e, t) {
                  var n,
                    i,
                    a,
                    o = [],
                    r = u(e);
                  for (n = 0; n < r.length; n++)
                    (a =
                      void 0 === e[(i = r[n])] || null === e[i]
                        ? ""
                        : "" + e[i]),
                      (i = t ? p(i).toLowerCase() : p(i)),
                      (a = p(a) || ""),
                      o.push(i + "=" + a);
                  return o.join("&");
                },
                getAuth: function (e) {
                  var t,
                    n = (e = e || {}).SecretId,
                    i = e.SecretKey,
                    a = e.KeyTime,
                    r = (e.method || e.Method || "get").toLowerCase(),
                    s = h(e.Query || e.params || {}),
                    c = (function (e) {
                      var t = {};
                      for (var n in e) {
                        var i = n.toLowerCase();
                        (i.indexOf("x-cos-") > -1 || d.indexOf(i) > -1) &&
                          (t[n] = e[n]);
                      }
                      return t;
                    })(h(e.Headers || e.headers || {})),
                    l = e.Key || "";
                  if (
                    (e.UseRawKey
                      ? (t = e.Pathname || e.pathname || "/" + l)
                      : 0 !==
                          (t = e.Pathname || e.pathname || l).indexOf("/") &&
                        (t = "/" + t),
                    !c.Host &&
                      !c.host &&
                      e.Bucket &&
                      e.Region &&
                      (c.Host =
                        e.Bucket + ".cos." + e.Region + ".myqcloud.com"),
                    !n)
                  )
                    return console.error("missing param SecretId");
                  if (!i) return console.error("missing param SecretKey");
                  var p = Math.round(R(e.SystemClockOffset) / 1e3) - 1,
                    m = p,
                    f = e.Expires || e.expires;
                  m += void 0 === f ? 900 : 1 * f || 0;
                  var g = n,
                    v = a || p + ";" + m,
                    x = a || p + ";" + m,
                    y = u(c, !0).join(";").toLowerCase(),
                    C = u(s, !0).join(";").toLowerCase(),
                    b = o.HmacSHA1(x, i).toString(),
                    k = [r, t, A.obj2str(s, !0), A.obj2str(c, !0), ""].join(
                      "\n"
                    ),
                    S = ["sha1", v, o.SHA1(k).toString(), ""].join("\n");
                  return [
                    "q-sign-algorithm=sha1",
                    "q-ak=" + g,
                    "q-sign-time=" + v,
                    "q-key-time=" + x,
                    "q-header-list=" + y,
                    "q-url-param-list=" + C,
                    "q-signature=" + o.HmacSHA1(S, b).toString(),
                  ].join("&");
                },
                compareVersion: w,
                canFileSlice: _,
                isCIHost: function (e) {
                  return /^https?:\/\/([^/]+\.)?ci\.[^/]+/.test(e);
                },
              };
            e.exports = A;
          }).call(t, n(1));
        },
        function (e, t, n) {
          "use strict";
          var i,
            a =
              "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
                ? function (e) {
                    return typeof e;
                  }
                : function (e) {
                    return e &&
                      "function" == typeof Symbol &&
                      e.constructor === Symbol &&
                      e !== Symbol.prototype
                      ? "symbol"
                      : typeof e;
                  };
          i = (function () {
            return this;
          })();
          try {
            i = i || Function("return this")() || (0, eval)("this");
          } catch (e) {
            "object" ===
              ("undefined" == typeof window ? "undefined" : a(window)) &&
              (i = window);
          }
          e.exports = i;
        },
        function (e, t, n) {
          "use strict";
          var i =
            "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
              ? function (e) {
                  return typeof e;
                }
              : function (e) {
                  return e &&
                    "function" == typeof Symbol &&
                    e.constructor === Symbol &&
                    e !== Symbol.prototype
                    ? "symbol"
                    : typeof e;
                };
          function a(e, t) {
            for (var n in e) t[n] = e[n];
          }
          function o(e, t) {
            var n = e.prototype;
            if (Object.create) {
              var i = Object.create(t.prototype);
              n.__proto__ = i;
            }
            if (!(n instanceof t)) {
              var o = function () {};
              (o.prototype = t.prototype),
                a(n, (o = new o())),
                (e.prototype = n = o);
            }
            n.constructor != e &&
              ("function" != typeof e && console.error("unknow Class:" + e),
              (n.constructor = e));
          }
          var r = {},
            s = (r.ELEMENT_NODE = 1),
            c = (r.ATTRIBUTE_NODE = 2),
            l = (r.TEXT_NODE = 3),
            p = (r.CDATA_SECTION_NODE = 4),
            u = (r.ENTITY_REFERENCE_NODE = 5),
            d = (r.ENTITY_NODE = 6),
            m = (r.PROCESSING_INSTRUCTION_NODE = 7),
            f = (r.COMMENT_NODE = 8),
            h = (r.DOCUMENT_NODE = 9),
            g = (r.DOCUMENT_TYPE_NODE = 10),
            v = (r.DOCUMENT_FRAGMENT_NODE = 11),
            x = (r.NOTATION_NODE = 12),
            y = {},
            C = {},
            b =
              ((y.INDEX_SIZE_ERR = ((C[1] = "Index size error"), 1)),
              (y.DOMSTRING_SIZE_ERR = ((C[2] = "DOMString size error"), 2)),
              (y.HIERARCHY_REQUEST_ERR =
                ((C[3] = "Hierarchy request error"), 3))),
            k =
              ((y.WRONG_DOCUMENT_ERR = ((C[4] = "Wrong document"), 4)),
              (y.INVALID_CHARACTER_ERR = ((C[5] = "Invalid character"), 5)),
              (y.NO_DATA_ALLOWED_ERR = ((C[6] = "No data allowed"), 6)),
              (y.NO_MODIFICATION_ALLOWED_ERR =
                ((C[7] = "No modification allowed"), 7)),
              (y.NOT_FOUND_ERR = ((C[8] = "Not found"), 8))),
            S =
              ((y.NOT_SUPPORTED_ERR = ((C[9] = "Not supported"), 9)),
              (y.INUSE_ATTRIBUTE_ERR = ((C[10] = "Attribute in use"), 10)));
          function R(e, t) {
            if (t instanceof Error) var n = t;
            else
              (n = this),
                Error.call(this, C[e]),
                (this.message = C[e]),
                Error.captureStackTrace && Error.captureStackTrace(this, R);
            return (
              (n.code = e), t && (this.message = this.message + ": " + t), n
            );
          }
          function w() {}
          function _(e, t) {
            (this._node = e), (this._refresh = t), A(this);
          }
          function A(e) {
            var t = e._node._inc || e._node.ownerDocument._inc;
            if (e._inc != t) {
              var n = e._refresh(e._node);
              ie(e, "length", n.length), a(n, e), (e._inc = t);
            }
          }
          function T() {}
          function B(e, t) {
            for (var n = e.length; n--; ) if (e[n] === t) return n;
          }
          function E(e, t, n, i) {
            if ((i ? (t[B(t, i)] = n) : (t[t.length++] = n), e)) {
              n.ownerElement = e;
              var a = e.ownerDocument;
              a &&
                (i && M(a, e, i),
                (function (e, t, n) {
                  e && e._inc++,
                    "http://www.w3.org/2000/xmlns/" == n.namespaceURI &&
                      (t._nsMap[n.prefix ? n.localName : ""] = n.value);
                })(a, e, n));
            }
          }
          function O(e, t, n) {
            var i = B(t, n);
            if (!(i >= 0)) throw R(k, new Error(e.tagName + "@" + n));
            for (var a = t.length - 1; i < a; ) t[i] = t[++i];
            if (((t.length = a), e)) {
              var o = e.ownerDocument;
              o && (M(o, e, n), (n.ownerElement = null));
            }
          }
          function I(e) {
            if (((this._features = {}), e))
              for (var t in e) this._features = e[t];
          }
          function D() {}
          function P(e) {
            return (
              ("<" == e ? "&lt;" : ">" == e && "&gt;") ||
              ("&" == e && "&amp;") ||
              ('"' == e && "&quot;") ||
              "&#" + e.charCodeAt() + ";"
            );
          }
          function N(e, t) {
            if (t(e)) return !0;
            if ((e = e.firstChild))
              do {
                if (N(e, t)) return !0;
              } while ((e = e.nextSibling));
          }
          function j() {}
          function M(e, t, n, i) {
            e && e._inc++,
              "http://www.w3.org/2000/xmlns/" == n.namespaceURI &&
                delete t._nsMap[n.prefix ? n.localName : ""];
          }
          function U(e, t, n) {
            if (e && e._inc) {
              e._inc++;
              var i = t.childNodes;
              if (n) i[i.length++] = n;
              else {
                for (var a = t.firstChild, o = 0; a; )
                  (i[o++] = a), (a = a.nextSibling);
                i.length = o;
              }
            }
          }
          function H(e, t) {
            var n = t.previousSibling,
              i = t.nextSibling;
            return (
              n ? (n.nextSibling = i) : (e.firstChild = i),
              i ? (i.previousSibling = n) : (e.lastChild = n),
              U(e.ownerDocument, e),
              t
            );
          }
          function F(e, t, n) {
            var i = t.parentNode;
            if ((i && i.removeChild(t), t.nodeType === v)) {
              var a = t.firstChild;
              if (null == a) return t;
              var o = t.lastChild;
            } else a = o = t;
            var r = n ? n.previousSibling : e.lastChild;
            (a.previousSibling = r),
              (o.nextSibling = n),
              r ? (r.nextSibling = a) : (e.firstChild = a),
              null == n ? (e.lastChild = o) : (n.previousSibling = o);
            do {
              a.parentNode = e;
            } while (a !== o && (a = a.nextSibling));
            return (
              U(e.ownerDocument || e, e),
              t.nodeType == v && (t.firstChild = t.lastChild = null),
              t
            );
          }
          function L() {
            this._nsMap = {};
          }
          function z() {}
          function K() {}
          function q() {}
          function G() {}
          function V() {}
          function X() {}
          function W() {}
          function $() {}
          function Q() {}
          function J() {}
          function Y() {}
          function Z() {}
          function ee(e, t) {
            var n = [],
              i = 9 == this.nodeType ? this.documentElement : this,
              a = i.prefix,
              o = i.namespaceURI;
            if (o && null == a && null == (a = i.lookupPrefix(o)))
              var r = [{ namespace: o, prefix: null }];
            return ne(this, n, e, t, r), n.join("");
          }
          function te(e, t, n) {
            var i = e.prefix || "",
              a = e.namespaceURI;
            if (!i && !a) return !1;
            if (
              ("xml" === i && "http://www.w3.org/XML/1998/namespace" === a) ||
              "http://www.w3.org/2000/xmlns/" == a
            )
              return !1;
            for (var o = n.length; o--; ) {
              var r = n[o];
              if (r.prefix == i) return r.namespace != a;
            }
            return !0;
          }
          function ne(e, t, n, i, a) {
            if (i) {
              if (!(e = i(e))) return;
              if ("string" == typeof e) return void t.push(e);
            }
            switch (e.nodeType) {
              case s:
                a || (a = []), a.length;
                var o = e.attributes,
                  r = o.length,
                  d = e.firstChild,
                  x = e.tagName;
                (n = "http://www.w3.org/1999/xhtml" === e.namespaceURI || n),
                  t.push("<", x);
                for (var y = 0; y < r; y++)
                  "xmlns" == (C = o.item(y)).prefix
                    ? a.push({ prefix: C.localName, namespace: C.value })
                    : "xmlns" == C.nodeName &&
                      a.push({ prefix: "", namespace: C.value });
                for (y = 0; y < r; y++) {
                  var C;
                  if (te((C = o.item(y)), 0, a)) {
                    var b = C.prefix || "",
                      k = C.namespaceURI,
                      S = b ? " xmlns:" + b : " xmlns";
                    t.push(S, '="', k, '"'),
                      a.push({ prefix: b, namespace: k });
                  }
                  ne(C, t, n, i, a);
                }
                if (
                  (te(e, 0, a) &&
                    ((b = e.prefix || ""),
                    (k = e.namespaceURI),
                    (S = b ? " xmlns:" + b : " xmlns"),
                    t.push(S, '="', k, '"'),
                    a.push({ prefix: b, namespace: k })),
                  d || (n && !/^(?:meta|link|img|br|hr|input)$/i.test(x)))
                ) {
                  if ((t.push(">"), n && /^script$/i.test(x)))
                    for (; d; )
                      d.data ? t.push(d.data) : ne(d, t, n, i, a),
                        (d = d.nextSibling);
                  else for (; d; ) ne(d, t, n, i, a), (d = d.nextSibling);
                  t.push("</", x, ">");
                } else t.push("/>");
                return;
              case h:
              case v:
                for (d = e.firstChild; d; )
                  ne(d, t, n, i, a), (d = d.nextSibling);
                return;
              case c:
                return t.push(
                  " ",
                  e.name,
                  '="',
                  e.value.replace(/[<&"]/g, P),
                  '"'
                );
              case l:
                return t.push(e.data.replace(/[<&]/g, P));
              case p:
                return t.push("<![CDATA[", e.data, "]]>");
              case f:
                return t.push("\x3c!--", e.data, "--\x3e");
              case g:
                var R = e.publicId,
                  w = e.systemId;
                if ((t.push("<!DOCTYPE ", e.name), R))
                  t.push(' PUBLIC "', R),
                    w && "." != w && t.push('" "', w),
                    t.push('">');
                else if (w && "." != w) t.push(' SYSTEM "', w, '">');
                else {
                  var _ = e.internalSubset;
                  _ && t.push(" [", _, "]"), t.push(">");
                }
                return;
              case m:
                return t.push("<?", e.target, " ", e.data, "?>");
              case u:
                return t.push("&", e.nodeName, ";");
              default:
                t.push("??", e.nodeName);
            }
          }
          function ie(e, t, n) {
            e[t] = n;
          }
          (y.INVALID_STATE_ERR = ((C[11] = "Invalid state"), 11)),
            (y.SYNTAX_ERR = ((C[12] = "Syntax error"), 12)),
            (y.INVALID_MODIFICATION_ERR =
              ((C[13] = "Invalid modification"), 13)),
            (y.NAMESPACE_ERR = ((C[14] = "Invalid namespace"), 14)),
            (y.INVALID_ACCESS_ERR = ((C[15] = "Invalid access"), 15)),
            (R.prototype = Error.prototype),
            a(y, R),
            (w.prototype = {
              length: 0,
              item: function (e) {
                return this[e] || null;
              },
              toString: function (e, t) {
                for (var n = [], i = 0; i < this.length; i++)
                  ne(this[i], n, e, t);
                return n.join("");
              },
            }),
            (_.prototype.item = function (e) {
              return A(this), this[e];
            }),
            o(_, w),
            (T.prototype = {
              length: 0,
              item: w.prototype.item,
              getNamedItem: function (e) {
                for (var t = this.length; t--; ) {
                  var n = this[t];
                  if (n.nodeName == e) return n;
                }
              },
              setNamedItem: function (e) {
                var t = e.ownerElement;
                if (t && t != this._ownerElement) throw new R(S);
                var n = this.getNamedItem(e.nodeName);
                return E(this._ownerElement, this, e, n), n;
              },
              setNamedItemNS: function (e) {
                var t,
                  n = e.ownerElement;
                if (n && n != this._ownerElement) throw new R(S);
                return (
                  (t = this.getNamedItemNS(e.namespaceURI, e.localName)),
                  E(this._ownerElement, this, e, t),
                  t
                );
              },
              removeNamedItem: function (e) {
                var t = this.getNamedItem(e);
                return O(this._ownerElement, this, t), t;
              },
              removeNamedItemNS: function (e, t) {
                var n = this.getNamedItemNS(e, t);
                return O(this._ownerElement, this, n), n;
              },
              getNamedItemNS: function (e, t) {
                for (var n = this.length; n--; ) {
                  var i = this[n];
                  if (i.localName == t && i.namespaceURI == e) return i;
                }
                return null;
              },
            }),
            (I.prototype = {
              hasFeature: function (e, t) {
                var n = this._features[e.toLowerCase()];
                return !(!n || (t && !(t in n)));
              },
              createDocument: function (e, t, n) {
                var i = new j();
                if (
                  ((i.implementation = this),
                  (i.childNodes = new w()),
                  (i.doctype = n),
                  n && i.appendChild(n),
                  t)
                ) {
                  var a = i.createElementNS(e, t);
                  i.appendChild(a);
                }
                return i;
              },
              createDocumentType: function (e, t, n) {
                var i = new X();
                return (
                  (i.name = e),
                  (i.nodeName = e),
                  (i.publicId = t),
                  (i.systemId = n),
                  i
                );
              },
            }),
            (D.prototype = {
              firstChild: null,
              lastChild: null,
              previousSibling: null,
              nextSibling: null,
              attributes: null,
              parentNode: null,
              childNodes: null,
              ownerDocument: null,
              nodeValue: null,
              namespaceURI: null,
              prefix: null,
              localName: null,
              insertBefore: function (e, t) {
                return F(this, e, t);
              },
              replaceChild: function (e, t) {
                this.insertBefore(e, t), t && this.removeChild(t);
              },
              removeChild: function (e) {
                return H(this, e);
              },
              appendChild: function (e) {
                return this.insertBefore(e, null);
              },
              hasChildNodes: function () {
                return null != this.firstChild;
              },
              cloneNode: function (e) {
                return (function e(t, n, a) {
                  var o = new n.constructor();
                  for (var r in n) {
                    var l = n[r];
                    "object" != (void 0 === l ? "undefined" : i(l)) &&
                      l != o[r] &&
                      (o[r] = l);
                  }
                  switch (
                    (n.childNodes && (o.childNodes = new w()),
                    (o.ownerDocument = t),
                    o.nodeType)
                  ) {
                    case s:
                      var p = n.attributes,
                        u = (o.attributes = new T()),
                        d = p.length;
                      u._ownerElement = o;
                      for (var m = 0; m < d; m++)
                        o.setAttributeNode(e(t, p.item(m), !0));
                      break;
                    case c:
                      a = !0;
                  }
                  if (a)
                    for (var f = n.firstChild; f; )
                      o.appendChild(e(t, f, a)), (f = f.nextSibling);
                  return o;
                })(this.ownerDocument || this, this, e);
              },
              normalize: function () {
                for (var e = this.firstChild; e; ) {
                  var t = e.nextSibling;
                  t && t.nodeType == l && e.nodeType == l
                    ? (this.removeChild(t), e.appendData(t.data))
                    : (e.normalize(), (e = t));
                }
              },
              isSupported: function (e, t) {
                return this.ownerDocument.implementation.hasFeature(e, t);
              },
              hasAttributes: function () {
                return this.attributes.length > 0;
              },
              lookupPrefix: function (e) {
                for (var t = this; t; ) {
                  var n = t._nsMap;
                  if (n) for (var i in n) if (n[i] == e) return i;
                  t = t.nodeType == c ? t.ownerDocument : t.parentNode;
                }
                return null;
              },
              lookupNamespaceURI: function (e) {
                for (var t = this; t; ) {
                  var n = t._nsMap;
                  if (n && e in n) return n[e];
                  t = t.nodeType == c ? t.ownerDocument : t.parentNode;
                }
                return null;
              },
              isDefaultNamespace: function (e) {
                return null == this.lookupPrefix(e);
              },
            }),
            a(r, D),
            a(r, D.prototype),
            (j.prototype = {
              nodeName: "#document",
              nodeType: h,
              doctype: null,
              documentElement: null,
              _inc: 1,
              insertBefore: function (e, t) {
                if (e.nodeType == v) {
                  for (var n = e.firstChild; n; ) {
                    var i = n.nextSibling;
                    this.insertBefore(n, t), (n = i);
                  }
                  return e;
                }
                return (
                  null == this.documentElement &&
                    e.nodeType == s &&
                    (this.documentElement = e),
                  F(this, e, t),
                  (e.ownerDocument = this),
                  e
                );
              },
              removeChild: function (e) {
                return (
                  this.documentElement == e && (this.documentElement = null),
                  H(this, e)
                );
              },
              importNode: function (e, t) {
                return (function e(t, n, i) {
                  var a;
                  switch (n.nodeType) {
                    case s:
                      (a = n.cloneNode(!1)).ownerDocument = t;
                    case v:
                      break;
                    case c:
                      i = !0;
                  }
                  if (
                    (a || (a = n.cloneNode(!1)),
                    (a.ownerDocument = t),
                    (a.parentNode = null),
                    i)
                  )
                    for (var o = n.firstChild; o; )
                      a.appendChild(e(t, o, i)), (o = o.nextSibling);
                  return a;
                })(this, e, t);
              },
              getElementById: function (e) {
                var t = null;
                return (
                  N(this.documentElement, function (n) {
                    if (n.nodeType == s && n.getAttribute("id") == e)
                      return (t = n), !0;
                  }),
                  t
                );
              },
              createElement: function (e) {
                var t = new L();
                return (
                  (t.ownerDocument = this),
                  (t.nodeName = e),
                  (t.tagName = e),
                  (t.childNodes = new w()),
                  ((t.attributes = new T())._ownerElement = t),
                  t
                );
              },
              createDocumentFragment: function () {
                var e = new J();
                return (e.ownerDocument = this), (e.childNodes = new w()), e;
              },
              createTextNode: function (e) {
                var t = new q();
                return (t.ownerDocument = this), t.appendData(e), t;
              },
              createComment: function (e) {
                var t = new G();
                return (t.ownerDocument = this), t.appendData(e), t;
              },
              createCDATASection: function (e) {
                var t = new V();
                return (t.ownerDocument = this), t.appendData(e), t;
              },
              createProcessingInstruction: function (e, t) {
                var n = new Y();
                return (
                  (n.ownerDocument = this),
                  (n.tagName = n.target = e),
                  (n.nodeValue = n.data = t),
                  n
                );
              },
              createAttribute: function (e) {
                var t = new z();
                return (
                  (t.ownerDocument = this),
                  (t.name = e),
                  (t.nodeName = e),
                  (t.localName = e),
                  (t.specified = !0),
                  t
                );
              },
              createEntityReference: function (e) {
                var t = new Q();
                return (t.ownerDocument = this), (t.nodeName = e), t;
              },
              createElementNS: function (e, t) {
                var n = new L(),
                  i = t.split(":"),
                  a = (n.attributes = new T());
                return (
                  (n.childNodes = new w()),
                  (n.ownerDocument = this),
                  (n.nodeName = t),
                  (n.tagName = t),
                  (n.namespaceURI = e),
                  2 == i.length
                    ? ((n.prefix = i[0]), (n.localName = i[1]))
                    : (n.localName = t),
                  (a._ownerElement = n),
                  n
                );
              },
              createAttributeNS: function (e, t) {
                var n = new z(),
                  i = t.split(":");
                return (
                  (n.ownerDocument = this),
                  (n.nodeName = t),
                  (n.name = t),
                  (n.namespaceURI = e),
                  (n.specified = !0),
                  2 == i.length
                    ? ((n.prefix = i[0]), (n.localName = i[1]))
                    : (n.localName = t),
                  n
                );
              },
            }),
            o(j, D),
            (L.prototype = {
              nodeType: s,
              hasAttribute: function (e) {
                return null != this.getAttributeNode(e);
              },
              getAttribute: function (e) {
                var t = this.getAttributeNode(e);
                return (t && t.value) || "";
              },
              getAttributeNode: function (e) {
                return this.attributes.getNamedItem(e);
              },
              setAttribute: function (e, t) {
                var n = this.ownerDocument.createAttribute(e);
                (n.value = n.nodeValue = "" + t), this.setAttributeNode(n);
              },
              removeAttribute: function (e) {
                var t = this.getAttributeNode(e);
                t && this.removeAttributeNode(t);
              },
              appendChild: function (e) {
                return e.nodeType === v
                  ? this.insertBefore(e, null)
                  : (function (e, t) {
                      var n = t.parentNode;
                      if (n) {
                        var i = e.lastChild;
                        n.removeChild(t), (i = e.lastChild);
                      }
                      return (
                        (i = e.lastChild),
                        (t.parentNode = e),
                        (t.previousSibling = i),
                        (t.nextSibling = null),
                        i ? (i.nextSibling = t) : (e.firstChild = t),
                        (e.lastChild = t),
                        U(e.ownerDocument, e, t),
                        t
                      );
                    })(this, e);
              },
              setAttributeNode: function (e) {
                return this.attributes.setNamedItem(e);
              },
              setAttributeNodeNS: function (e) {
                return this.attributes.setNamedItemNS(e);
              },
              removeAttributeNode: function (e) {
                return this.attributes.removeNamedItem(e.nodeName);
              },
              removeAttributeNS: function (e, t) {
                var n = this.getAttributeNodeNS(e, t);
                n && this.removeAttributeNode(n);
              },
              hasAttributeNS: function (e, t) {
                return null != this.getAttributeNodeNS(e, t);
              },
              getAttributeNS: function (e, t) {
                var n = this.getAttributeNodeNS(e, t);
                return (n && n.value) || "";
              },
              setAttributeNS: function (e, t, n) {
                var i = this.ownerDocument.createAttributeNS(e, t);
                (i.value = i.nodeValue = "" + n), this.setAttributeNode(i);
              },
              getAttributeNodeNS: function (e, t) {
                return this.attributes.getNamedItemNS(e, t);
              },
              getElementsByTagName: function (e) {
                return new _(this, function (t) {
                  var n = [];
                  return (
                    N(t, function (i) {
                      i === t ||
                        i.nodeType != s ||
                        ("*" !== e && i.tagName != e) ||
                        n.push(i);
                    }),
                    n
                  );
                });
              },
              getElementsByTagNameNS: function (e, t) {
                return new _(this, function (n) {
                  var i = [];
                  return (
                    N(n, function (a) {
                      a === n ||
                        a.nodeType !== s ||
                        ("*" !== e && a.namespaceURI !== e) ||
                        ("*" !== t && a.localName != t) ||
                        i.push(a);
                    }),
                    i
                  );
                });
              },
            }),
            (j.prototype.getElementsByTagName =
              L.prototype.getElementsByTagName),
            (j.prototype.getElementsByTagNameNS =
              L.prototype.getElementsByTagNameNS),
            o(L, D),
            (z.prototype.nodeType = c),
            o(z, D),
            (K.prototype = {
              data: "",
              substringData: function (e, t) {
                return this.data.substring(e, e + t);
              },
              appendData: function (e) {
                (e = this.data + e),
                  (this.nodeValue = this.data = e),
                  (this.length = e.length);
              },
              insertData: function (e, t) {
                this.replaceData(e, 0, t);
              },
              appendChild: function (e) {
                throw new Error(C[b]);
              },
              deleteData: function (e, t) {
                this.replaceData(e, t, "");
              },
              replaceData: function (e, t, n) {
                (n =
                  this.data.substring(0, e) + n + this.data.substring(e + t)),
                  (this.nodeValue = this.data = n),
                  (this.length = n.length);
              },
            }),
            o(K, D),
            (q.prototype = {
              nodeName: "#text",
              nodeType: l,
              splitText: function (e) {
                var t = this.data,
                  n = t.substring(e);
                (t = t.substring(0, e)),
                  (this.data = this.nodeValue = t),
                  (this.length = t.length);
                var i = this.ownerDocument.createTextNode(n);
                return (
                  this.parentNode &&
                    this.parentNode.insertBefore(i, this.nextSibling),
                  i
                );
              },
            }),
            o(q, K),
            (G.prototype = { nodeName: "#comment", nodeType: f }),
            o(G, K),
            (V.prototype = { nodeName: "#cdata-section", nodeType: p }),
            o(V, K),
            (X.prototype.nodeType = g),
            o(X, D),
            (W.prototype.nodeType = x),
            o(W, D),
            ($.prototype.nodeType = d),
            o($, D),
            (Q.prototype.nodeType = u),
            o(Q, D),
            (J.prototype.nodeName = "#document-fragment"),
            (J.prototype.nodeType = v),
            o(J, D),
            (Y.prototype.nodeType = m),
            o(Y, D),
            (Z.prototype.serializeToString = function (e, t, n) {
              return ee.call(e, t, n);
            }),
            (D.prototype.toString = ee);
          try {
            Object.defineProperty &&
              (Object.defineProperty(_.prototype, "length", {
                get: function () {
                  return A(this), this.$$length;
                },
              }),
              Object.defineProperty(D.prototype, "textContent", {
                get: function () {
                  return (function e(t) {
                    switch (t.nodeType) {
                      case s:
                      case v:
                        var n = [];
                        for (t = t.firstChild; t; )
                          7 !== t.nodeType && 8 !== t.nodeType && n.push(e(t)),
                            (t = t.nextSibling);
                        return n.join("");
                      default:
                        return t.nodeValue;
                    }
                  })(this);
                },
                set: function (e) {
                  switch (this.nodeType) {
                    case s:
                    case v:
                      for (; this.firstChild; )
                        this.removeChild(this.firstChild);
                      (e || String(e)) &&
                        this.appendChild(this.ownerDocument.createTextNode(e));
                      break;
                    default:
                      (this.data = e), (this.value = e), (this.nodeValue = e);
                  }
                },
              }),
              (ie = function (e, t, n) {
                e["$$" + t] = n;
              }));
          } catch (e) {}
          (t.DOMImplementation = I), (t.XMLSerializer = Z);
        },
        function (e, t, n) {
          "use strict";
          var i,
            a,
            o,
            r,
            s,
            c,
            l,
            p,
            u,
            d,
            m,
            f,
            h,
            g,
            v,
            x,
            y,
            C,
            b,
            k =
              ((a = (i = i || {}).Base64),
              (r = (function (e) {
                for (var t = {}, n = 0, i = e.length; n < i; n++)
                  t[e.charAt(n)] = n;
                return t;
              })(
                (o =
                  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/")
              )),
              (s = String.fromCharCode),
              (c = function (e) {
                if (e.length < 2)
                  return (t = e.charCodeAt(0)) < 128
                    ? e
                    : t < 2048
                    ? s(192 | (t >>> 6)) + s(128 | (63 & t))
                    : s(224 | ((t >>> 12) & 15)) +
                      s(128 | ((t >>> 6) & 63)) +
                      s(128 | (63 & t));
                var t =
                  65536 +
                  1024 * (e.charCodeAt(0) - 55296) +
                  (e.charCodeAt(1) - 56320);
                return (
                  s(240 | ((t >>> 18) & 7)) +
                  s(128 | ((t >>> 12) & 63)) +
                  s(128 | ((t >>> 6) & 63)) +
                  s(128 | (63 & t))
                );
              }),
              (l = /[\uD800-\uDBFF][\uDC00-\uDFFFF]|[^\x00-\x7F]/g),
              (p = function (e) {
                return e.replace(l, c);
              }),
              (u = function (e) {
                var t = [0, 2, 1][e.length % 3],
                  n =
                    (e.charCodeAt(0) << 16) |
                    ((e.length > 1 ? e.charCodeAt(1) : 0) << 8) |
                    (e.length > 2 ? e.charCodeAt(2) : 0);
                return [
                  o.charAt(n >>> 18),
                  o.charAt((n >>> 12) & 63),
                  t >= 2 ? "=" : o.charAt((n >>> 6) & 63),
                  t >= 1 ? "=" : o.charAt(63 & n),
                ].join("");
              }),
              (d = i.btoa
                ? function (e) {
                    return i.btoa(e);
                  }
                : function (e) {
                    return e.replace(/[\s\S]{1,3}/g, u);
                  }),
              (m = function (e) {
                return d(p(e));
              }),
              (f = function (e, t) {
                return t
                  ? m(String(e))
                      .replace(/[+\/]/g, function (e) {
                        return "+" == e ? "-" : "_";
                      })
                      .replace(/=/g, "")
                  : m(String(e));
              }),
              (h = new RegExp(
                ["[À-ß][-¿]", "[à-ï][-¿]{2}", "[ð-÷][-¿]{3}"].join("|"),
                "g"
              )),
              (g = function (e) {
                switch (e.length) {
                  case 4:
                    var t =
                      (((7 & e.charCodeAt(0)) << 18) |
                        ((63 & e.charCodeAt(1)) << 12) |
                        ((63 & e.charCodeAt(2)) << 6) |
                        (63 & e.charCodeAt(3))) -
                      65536;
                    return s(55296 + (t >>> 10)) + s(56320 + (1023 & t));
                  case 3:
                    return s(
                      ((15 & e.charCodeAt(0)) << 12) |
                        ((63 & e.charCodeAt(1)) << 6) |
                        (63 & e.charCodeAt(2))
                    );
                  default:
                    return s(
                      ((31 & e.charCodeAt(0)) << 6) | (63 & e.charCodeAt(1))
                    );
                }
              }),
              (v = function (e) {
                return e.replace(h, g);
              }),
              (x = function (e) {
                var t = e.length,
                  n = t % 4,
                  i =
                    (t > 0 ? r[e.charAt(0)] << 18 : 0) |
                    (t > 1 ? r[e.charAt(1)] << 12 : 0) |
                    (t > 2 ? r[e.charAt(2)] << 6 : 0) |
                    (t > 3 ? r[e.charAt(3)] : 0),
                  a = [s(i >>> 16), s((i >>> 8) & 255), s(255 & i)];
                return (a.length -= [0, 0, 2, 1][n]), a.join("");
              }),
              (y = i.atob
                ? function (e) {
                    return i.atob(e);
                  }
                : function (e) {
                    return e.replace(/[\s\S]{1,4}/g, x);
                  }),
              (C = function (e) {
                return v(y(e));
              }),
              {
                VERSION: "2.1.9",
                atob: y,
                btoa: d,
                fromBase64: (b = function (e) {
                  return C(
                    String(e)
                      .replace(/[-_]/g, function (e) {
                        return "-" == e ? "+" : "/";
                      })
                      .replace(/[^A-Za-z0-9\+\/]/g, "")
                  );
                }),
                toBase64: f,
                utob: p,
                encode: f,
                encodeURI: function (e) {
                  return f(e, !0);
                },
                btou: v,
                decode: b,
                noConflict: function () {
                  var e = i.Base64;
                  return (i.Base64 = a), e;
                },
              });
          e.exports = k;
        },
        function (e, t, n) {
          "use strict";
          var i = function (e) {
            var t = {},
              n = function (e) {
                return !t[e] && (t[e] = []), t[e];
              };
            (e.on = function (e, t) {
              n(e).push(t);
            }),
              (e.off = function (e, t) {
                for (var i = n(e), a = i.length - 1; a >= 0; a--)
                  t === i[a] && i.splice(a, 1);
              }),
              (e.emit = function (e, t) {
                for (
                  var i = n(e).map(function (e) {
                      return e;
                    }),
                    a = 0;
                  a < i.length;
                  a++
                )
                  i[a](t);
              });
          };
          (e.exports.init = i),
            (e.exports.EventProxy = function () {
              i(this);
            });
        },
        function (e, t, n) {
          "use strict";
          var i,
            a,
            o = n(0),
            r = function () {
              try {
                wx.setStorageSync("cos_sdk_upload_cache", JSON.stringify(i));
              } catch (e) {}
            },
            s = function () {
              if (!i) {
                i = (function () {
                  try {
                    var e = JSON.parse(
                      wx.getStorageSync("cos_sdk_upload_cache")
                    );
                  } catch (e) {}
                  return e || (e = []), e;
                })();
                for (
                  var e = !1,
                    t = Math.round(Date.now() / 1e3),
                    n = i.length - 1;
                  n >= 0;
                  n--
                ) {
                  var a = i[n][2];
                  (!a || a + 2592e3 < t) && (i.splice(n, 1), (e = !0));
                }
                e && r();
              }
            },
            c = function () {
              a ||
                (a = setTimeout(function () {
                  r(), (a = null);
                }, 400));
            },
            l = {
              using: {},
              setUsing: function (e) {
                l.using[e] = !0;
              },
              removeUsing: function (e) {
                delete l.using[e];
              },
              getFileId: function (e, t, n, i) {
                return e.FilePath && e.size && e.lastModifiedTime && t
                  ? o.md5([e.FilePath].join("::")) +
                      "-" +
                      o.md5(
                        [
                          e.size,
                          e.mode,
                          e.lastAccessedTime,
                          e.lastModifiedTime,
                          t,
                          n,
                          i,
                        ].join("::")
                      )
                  : null;
              },
              getUploadIdList: function (e) {
                if (!e) return null;
                s();
                for (var t = [], n = 0; n < i.length; n++)
                  i[n][0] === e && t.push(i[n][1]);
                return t.length ? t : null;
              },
              saveUploadId: function (e, t, n) {
                if ((s(), e)) {
                  for (
                    var a = e.substr(0, e.indexOf("-") + 1), o = i.length - 1;
                    o >= 0;
                    o--
                  ) {
                    var r = i[o];
                    ((r[0] === e && r[1] === t) ||
                      (e !== r[0] && 0 === r[0].indexOf(a))) &&
                      i.splice(o, 1);
                  }
                  i.unshift([e, t, Math.round(Date.now() / 1e3)]),
                    i.length > n && i.splice(n),
                    c();
                }
              },
              removeUploadId: function (e) {
                s(), delete l.using[e];
                for (var t = i.length - 1; t >= 0; t--)
                  i[t][1] === e && i.splice(t, 1);
                c();
              },
            };
          e.exports = l;
        },
        function (e, t, n) {
          "use strict";
          var i = n(7);
          e.exports = i;
        },
        function (e, t, n) {
          "use strict";
          var i = n(0),
            a = n(4),
            o = n(17),
            r = n(18),
            s = n(24),
            c = {
              SecretId: "",
              SecretKey: "",
              XCosSecurityToken: "",
              ChunkRetryTimes: 2,
              FileParallelLimit: 3,
              ChunkParallelLimit: 3,
              ChunkSize: 1048576,
              SliceSize: 1048576,
              CopyChunkParallelLimit: 20,
              CopyChunkSize: 10485760,
              CopySliceSize: 10485760,
              MaxPartNumber: 1e4,
              ProgressInterval: 1e3,
              UploadQueueSize: 1e4,
              Domain: "",
              ServiceDomain: "",
              Protocol: "",
              CompatibilityMode: !1,
              ForcePathStyle: !1,
              Timeout: 0,
              CorrectClockSkew: !0,
              SystemClockOffset: 0,
              UploadCheckContentMd5: !1,
              UploadIdCacheLimit: 50,
              UseAccelerate: !1,
            },
            l = function (e) {
              (this.options = i.extend(i.clone(c), e || {})),
                (this.options.FileParallelLimit = Math.max(
                  1,
                  this.options.FileParallelLimit
                )),
                (this.options.ChunkParallelLimit = Math.max(
                  1,
                  this.options.ChunkParallelLimit
                )),
                (this.options.ChunkRetryTimes = Math.max(
                  0,
                  this.options.ChunkRetryTimes
                )),
                (this.options.ChunkSize = Math.max(
                  1048576,
                  this.options.ChunkSize
                )),
                (this.options.CopyChunkParallelLimit = Math.max(
                  1,
                  this.options.CopyChunkParallelLimit
                )),
                (this.options.CopyChunkSize = Math.max(
                  1048576,
                  this.options.CopyChunkSize
                )),
                (this.options.CopySliceSize = Math.max(
                  0,
                  this.options.CopySliceSize
                )),
                (this.options.MaxPartNumber = Math.max(
                  1024,
                  Math.min(1e4, this.options.MaxPartNumber)
                )),
                (this.options.Timeout = Math.max(0, this.options.Timeout)),
                this.options.AppId &&
                  console.warn(
                    'warning: AppId has been deprecated, Please put it at the end of parameter Bucket(E.g: "test-1250000000").'
                  ),
                this.options.SecretId &&
                  this.options.SecretId.indexOf(" ") > -1 &&
                  (console.error("error: SecretId格式错误，请检查"),
                  console.error(
                    "error: SecretId format is incorrect. Please check"
                  )),
                this.options.SecretKey &&
                  this.options.SecretKey.indexOf(" ") > -1 &&
                  (console.error("error: SecretKey格式错误，请检查"),
                  console.error(
                    "error: SecretKey format is incorrect. Please check"
                  )),
                a.init(this),
                o.init(this);
            };
          r.init(l, o),
            s.init(l, o),
            (l.getAuthorization = i.getAuth),
            (l.version = "1.1.4"),
            (e.exports = l);
        },
        function (module, exports, __webpack_require__) {
          "use strict";
          (function (process, global, module) {
            var __WEBPACK_AMD_DEFINE_RESULT__,
              _typeof =
                "function" == typeof Symbol &&
                "symbol" == typeof Symbol.iterator
                  ? function (e) {
                      return typeof e;
                    }
                  : function (e) {
                      return e &&
                        "function" == typeof Symbol &&
                        e.constructor === Symbol &&
                        e !== Symbol.prototype
                        ? "symbol"
                        : typeof e;
                    };
            !(function () {
              var ERROR = "input is invalid type",
                WINDOW =
                  "object" ===
                  ("undefined" == typeof window
                    ? "undefined"
                    : _typeof(window)),
                root = WINDOW ? window : {};
              root.JS_MD5_NO_WINDOW && (WINDOW = !1);
              var WEB_WORKER =
                  !WINDOW &&
                  "object" ===
                    ("undefined" == typeof self ? "undefined" : _typeof(self)),
                NODE_JS =
                  !root.JS_MD5_NO_NODE_JS &&
                  "object" ===
                    (void 0 === process ? "undefined" : _typeof(process)) &&
                  process.versions &&
                  process.versions.node;
              NODE_JS ? (root = global) : WEB_WORKER && (root = self);
              var COMMON_JS =
                  !root.JS_MD5_NO_COMMON_JS &&
                  "object" === _typeof(module) &&
                  module.exports,
                AMD = __webpack_require__(11),
                ARRAY_BUFFER =
                  !root.JS_MD5_NO_ARRAY_BUFFER &&
                  "undefined" != typeof ArrayBuffer,
                HEX_CHARS = "0123456789abcdef".split(""),
                EXTRA = [128, 32768, 8388608, -2147483648],
                SHIFT = [0, 8, 16, 24],
                OUTPUT_TYPES = [
                  "hex",
                  "array",
                  "digest",
                  "buffer",
                  "arrayBuffer",
                  "base64",
                ],
                BASE64_ENCODE_CHAR =
                  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".split(
                    ""
                  ),
                blocks = [],
                buffer8;
              if (ARRAY_BUFFER) {
                var buffer = new ArrayBuffer(68);
                (buffer8 = new Uint8Array(buffer)),
                  (blocks = new Uint32Array(buffer));
              }
              (!root.JS_MD5_NO_NODE_JS && Array.isArray) ||
                (Array.isArray = function (e) {
                  return "[object Array]" === Object.prototype.toString.call(e);
                }),
                !ARRAY_BUFFER ||
                  (!root.JS_MD5_NO_ARRAY_BUFFER_IS_VIEW &&
                    ArrayBuffer.isView) ||
                  (ArrayBuffer.isView = function (e) {
                    return (
                      "object" === (void 0 === e ? "undefined" : _typeof(e)) &&
                      e.buffer &&
                      e.buffer.constructor === ArrayBuffer
                    );
                  });
              var createOutputMethod = function (e) {
                  return function (t) {
                    return new Md5(!0).update(t)[e]();
                  };
                },
                createMethod = function () {
                  var e = createOutputMethod("hex");
                  NODE_JS && (e = nodeWrap(e)),
                    (e.getCtx = e.create =
                      function () {
                        return new Md5();
                      }),
                    (e.update = function (t) {
                      return e.create().update(t);
                    });
                  for (var t = 0; t < OUTPUT_TYPES.length; ++t) {
                    var n = OUTPUT_TYPES[t];
                    e[n] = createOutputMethod(n);
                  }
                  return e;
                },
                nodeWrap = function nodeWrap(method) {
                  var crypto = eval("require('crypto')"),
                    Buffer = eval("require('buffer').Buffer"),
                    nodeMethod = function (e) {
                      if ("string" == typeof e)
                        return crypto
                          .createHash("md5")
                          .update(e, "utf8")
                          .digest("hex");
                      if (null == e) throw ERROR;
                      return (
                        e.constructor === ArrayBuffer &&
                          (e = new Uint8Array(e)),
                        Array.isArray(e) ||
                        ArrayBuffer.isView(e) ||
                        e.constructor === Buffer
                          ? crypto
                              .createHash("md5")
                              .update(new Buffer(e))
                              .digest("hex")
                          : method(e)
                      );
                    };
                  return nodeMethod;
                };
              function Md5(e) {
                if (e)
                  (blocks[0] =
                    blocks[16] =
                    blocks[1] =
                    blocks[2] =
                    blocks[3] =
                    blocks[4] =
                    blocks[5] =
                    blocks[6] =
                    blocks[7] =
                    blocks[8] =
                    blocks[9] =
                    blocks[10] =
                    blocks[11] =
                    blocks[12] =
                    blocks[13] =
                    blocks[14] =
                    blocks[15] =
                      0),
                    (this.blocks = blocks),
                    (this.buffer8 = buffer8);
                else if (ARRAY_BUFFER) {
                  var t = new ArrayBuffer(68);
                  (this.buffer8 = new Uint8Array(t)),
                    (this.blocks = new Uint32Array(t));
                } else
                  this.blocks = [
                    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                  ];
                (this.h0 =
                  this.h1 =
                  this.h2 =
                  this.h3 =
                  this.start =
                  this.bytes =
                  this.hBytes =
                    0),
                  (this.finalized = this.hashed = !1),
                  (this.first = !0);
              }
              (Md5.prototype.update = function (e) {
                if (!this.finalized) {
                  var t,
                    n = void 0 === e ? "undefined" : _typeof(e);
                  if ("string" !== n) {
                    if ("object" !== n) throw ERROR;
                    if (null === e) throw ERROR;
                    if (
                      !ARRAY_BUFFER ||
                      (e.constructor !== ArrayBuffer &&
                        "ArrayBuffer" !== e.constructor.name)
                    ) {
                      if (
                        !(
                          Array.isArray(e) ||
                          (ARRAY_BUFFER && ArrayBuffer.isView(e))
                        )
                      )
                        throw ERROR;
                    } else e = new Uint8Array(e);
                    t = !0;
                  }
                  for (
                    var i,
                      a,
                      o = 0,
                      r = e.length,
                      s = this.blocks,
                      c = this.buffer8;
                    o < r;

                  ) {
                    if (
                      (this.hashed &&
                        ((this.hashed = !1),
                        (s[0] = s[16]),
                        (s[16] =
                          s[1] =
                          s[2] =
                          s[3] =
                          s[4] =
                          s[5] =
                          s[6] =
                          s[7] =
                          s[8] =
                          s[9] =
                          s[10] =
                          s[11] =
                          s[12] =
                          s[13] =
                          s[14] =
                          s[15] =
                            0)),
                      t)
                    )
                      if (ARRAY_BUFFER)
                        for (a = this.start; o < r && a < 64; ++o)
                          c[a++] = e[o];
                      else
                        for (a = this.start; o < r && a < 64; ++o)
                          s[a >> 2] |= e[o] << SHIFT[3 & a++];
                    else if (ARRAY_BUFFER)
                      for (a = this.start; o < r && a < 64; ++o)
                        (i = e.charCodeAt(o)) < 128
                          ? (c[a++] = i)
                          : i < 2048
                          ? ((c[a++] = 192 | (i >> 6)),
                            (c[a++] = 128 | (63 & i)))
                          : i < 55296 || i >= 57344
                          ? ((c[a++] = 224 | (i >> 12)),
                            (c[a++] = 128 | ((i >> 6) & 63)),
                            (c[a++] = 128 | (63 & i)))
                          : ((i =
                              65536 +
                              (((1023 & i) << 10) |
                                (1023 & e.charCodeAt(++o)))),
                            (c[a++] = 240 | (i >> 18)),
                            (c[a++] = 128 | ((i >> 12) & 63)),
                            (c[a++] = 128 | ((i >> 6) & 63)),
                            (c[a++] = 128 | (63 & i)));
                    else
                      for (a = this.start; o < r && a < 64; ++o)
                        (i = e.charCodeAt(o)) < 128
                          ? (s[a >> 2] |= i << SHIFT[3 & a++])
                          : i < 2048
                          ? ((s[a >> 2] |= (192 | (i >> 6)) << SHIFT[3 & a++]),
                            (s[a >> 2] |= (128 | (63 & i)) << SHIFT[3 & a++]))
                          : i < 55296 || i >= 57344
                          ? ((s[a >> 2] |= (224 | (i >> 12)) << SHIFT[3 & a++]),
                            (s[a >> 2] |=
                              (128 | ((i >> 6) & 63)) << SHIFT[3 & a++]),
                            (s[a >> 2] |= (128 | (63 & i)) << SHIFT[3 & a++]))
                          : ((i =
                              65536 +
                              (((1023 & i) << 10) |
                                (1023 & e.charCodeAt(++o)))),
                            (s[a >> 2] |= (240 | (i >> 18)) << SHIFT[3 & a++]),
                            (s[a >> 2] |=
                              (128 | ((i >> 12) & 63)) << SHIFT[3 & a++]),
                            (s[a >> 2] |=
                              (128 | ((i >> 6) & 63)) << SHIFT[3 & a++]),
                            (s[a >> 2] |= (128 | (63 & i)) << SHIFT[3 & a++]));
                    (this.lastByteIndex = a),
                      (this.bytes += a - this.start),
                      a >= 64
                        ? ((this.start = a - 64),
                          this.hash(),
                          (this.hashed = !0))
                        : (this.start = a);
                  }
                  return (
                    this.bytes > 4294967295 &&
                      ((this.hBytes += (this.bytes / 4294967296) << 0),
                      (this.bytes = this.bytes % 4294967296)),
                    this
                  );
                }
              }),
                (Md5.prototype.finalize = function () {
                  if (!this.finalized) {
                    this.finalized = !0;
                    var e = this.blocks,
                      t = this.lastByteIndex;
                    (e[t >> 2] |= EXTRA[3 & t]),
                      t >= 56 &&
                        (this.hashed || this.hash(),
                        (e[0] = e[16]),
                        (e[16] =
                          e[1] =
                          e[2] =
                          e[3] =
                          e[4] =
                          e[5] =
                          e[6] =
                          e[7] =
                          e[8] =
                          e[9] =
                          e[10] =
                          e[11] =
                          e[12] =
                          e[13] =
                          e[14] =
                          e[15] =
                            0)),
                      (e[14] = this.bytes << 3),
                      (e[15] = (this.hBytes << 3) | (this.bytes >>> 29)),
                      this.hash();
                  }
                }),
                (Md5.prototype.hash = function () {
                  var e,
                    t,
                    n,
                    i,
                    a,
                    o,
                    r = this.blocks;
                  this.first
                    ? (t =
                        ((((t =
                          ((e =
                            ((((e = r[0] - 680876937) << 7) | (e >>> 25)) -
                              271733879) <<
                            0) ^
                            ((n =
                              ((((n =
                                (-271733879 ^
                                  ((i =
                                    ((((i =
                                      (-1732584194 ^ (2004318071 & e)) +
                                      r[1] -
                                      117830708) <<
                                      12) |
                                      (i >>> 20)) +
                                      e) <<
                                    0) &
                                    (-271733879 ^ e))) +
                                r[2] -
                                1126478375) <<
                                17) |
                                (n >>> 15)) +
                                i) <<
                              0) &
                              (i ^ e))) +
                          r[3] -
                          1316259209) <<
                          22) |
                          (t >>> 10)) +
                          n) <<
                        0)
                    : ((e = this.h0),
                      (t = this.h1),
                      (n = this.h2),
                      (t =
                        ((((t +=
                          ((e =
                            ((((e +=
                              ((i = this.h3) ^ (t & (n ^ i))) +
                              r[0] -
                              680876936) <<
                              7) |
                              (e >>> 25)) +
                              t) <<
                            0) ^
                            ((n =
                              ((((n +=
                                (t ^
                                  ((i =
                                    ((((i +=
                                      (n ^ (e & (t ^ n))) + r[1] - 389564586) <<
                                      12) |
                                      (i >>> 20)) +
                                      e) <<
                                    0) &
                                    (e ^ t))) +
                                r[2] +
                                606105819) <<
                                17) |
                                (n >>> 15)) +
                                i) <<
                              0) &
                              (i ^ e))) +
                          r[3] -
                          1044525330) <<
                          22) |
                          (t >>> 10)) +
                          n) <<
                        0)),
                    (t =
                      ((((t +=
                        ((e =
                          ((((e += (i ^ (t & (n ^ i))) + r[4] - 176418897) <<
                            7) |
                            (e >>> 25)) +
                            t) <<
                          0) ^
                          ((n =
                            ((((n +=
                              (t ^
                                ((i =
                                  ((((i +=
                                    (n ^ (e & (t ^ n))) + r[5] + 1200080426) <<
                                    12) |
                                    (i >>> 20)) +
                                    e) <<
                                  0) &
                                  (e ^ t))) +
                              r[6] -
                              1473231341) <<
                              17) |
                              (n >>> 15)) +
                              i) <<
                            0) &
                            (i ^ e))) +
                        r[7] -
                        45705983) <<
                        22) |
                        (t >>> 10)) +
                        n) <<
                      0),
                    (t =
                      ((((t +=
                        ((e =
                          ((((e += (i ^ (t & (n ^ i))) + r[8] + 1770035416) <<
                            7) |
                            (e >>> 25)) +
                            t) <<
                          0) ^
                          ((n =
                            ((((n +=
                              (t ^
                                ((i =
                                  ((((i +=
                                    (n ^ (e & (t ^ n))) + r[9] - 1958414417) <<
                                    12) |
                                    (i >>> 20)) +
                                    e) <<
                                  0) &
                                  (e ^ t))) +
                              r[10] -
                              42063) <<
                              17) |
                              (n >>> 15)) +
                              i) <<
                            0) &
                            (i ^ e))) +
                        r[11] -
                        1990404162) <<
                        22) |
                        (t >>> 10)) +
                        n) <<
                      0),
                    (t =
                      ((((t +=
                        ((e =
                          ((((e += (i ^ (t & (n ^ i))) + r[12] + 1804603682) <<
                            7) |
                            (e >>> 25)) +
                            t) <<
                          0) ^
                          ((n =
                            ((((n +=
                              (t ^
                                ((i =
                                  ((((i +=
                                    (n ^ (e & (t ^ n))) + r[13] - 40341101) <<
                                    12) |
                                    (i >>> 20)) +
                                    e) <<
                                  0) &
                                  (e ^ t))) +
                              r[14] -
                              1502002290) <<
                              17) |
                              (n >>> 15)) +
                              i) <<
                            0) &
                            (i ^ e))) +
                        r[15] +
                        1236535329) <<
                        22) |
                        (t >>> 10)) +
                        n) <<
                      0),
                    (t =
                      ((((t +=
                        ((i =
                          ((((i +=
                            (t ^
                              (n &
                                ((e =
                                  ((((e +=
                                    (n ^ (i & (t ^ n))) + r[1] - 165796510) <<
                                    5) |
                                    (e >>> 27)) +
                                    t) <<
                                  0) ^
                                  t))) +
                            r[6] -
                            1069501632) <<
                            9) |
                            (i >>> 23)) +
                            e) <<
                          0) ^
                          (e &
                            ((n =
                              ((((n +=
                                (e ^ (t & (i ^ e))) + r[11] + 643717713) <<
                                14) |
                                (n >>> 18)) +
                                i) <<
                              0) ^
                              i))) +
                        r[0] -
                        373897302) <<
                        20) |
                        (t >>> 12)) +
                        n) <<
                      0),
                    (t =
                      ((((t +=
                        ((i =
                          ((((i +=
                            (t ^
                              (n &
                                ((e =
                                  ((((e +=
                                    (n ^ (i & (t ^ n))) + r[5] - 701558691) <<
                                    5) |
                                    (e >>> 27)) +
                                    t) <<
                                  0) ^
                                  t))) +
                            r[10] +
                            38016083) <<
                            9) |
                            (i >>> 23)) +
                            e) <<
                          0) ^
                          (e &
                            ((n =
                              ((((n +=
                                (e ^ (t & (i ^ e))) + r[15] - 660478335) <<
                                14) |
                                (n >>> 18)) +
                                i) <<
                              0) ^
                              i))) +
                        r[4] -
                        405537848) <<
                        20) |
                        (t >>> 12)) +
                        n) <<
                      0),
                    (t =
                      ((((t +=
                        ((i =
                          ((((i +=
                            (t ^
                              (n &
                                ((e =
                                  ((((e +=
                                    (n ^ (i & (t ^ n))) + r[9] + 568446438) <<
                                    5) |
                                    (e >>> 27)) +
                                    t) <<
                                  0) ^
                                  t))) +
                            r[14] -
                            1019803690) <<
                            9) |
                            (i >>> 23)) +
                            e) <<
                          0) ^
                          (e &
                            ((n =
                              ((((n +=
                                (e ^ (t & (i ^ e))) + r[3] - 187363961) <<
                                14) |
                                (n >>> 18)) +
                                i) <<
                              0) ^
                              i))) +
                        r[8] +
                        1163531501) <<
                        20) |
                        (t >>> 12)) +
                        n) <<
                      0),
                    (t =
                      ((((t +=
                        ((i =
                          ((((i +=
                            (t ^
                              (n &
                                ((e =
                                  ((((e +=
                                    (n ^ (i & (t ^ n))) + r[13] - 1444681467) <<
                                    5) |
                                    (e >>> 27)) +
                                    t) <<
                                  0) ^
                                  t))) +
                            r[2] -
                            51403784) <<
                            9) |
                            (i >>> 23)) +
                            e) <<
                          0) ^
                          (e &
                            ((n =
                              ((((n +=
                                (e ^ (t & (i ^ e))) + r[7] + 1735328473) <<
                                14) |
                                (n >>> 18)) +
                                i) <<
                              0) ^
                              i))) +
                        r[12] -
                        1926607734) <<
                        20) |
                        (t >>> 12)) +
                        n) <<
                      0),
                    (t =
                      ((((t +=
                        ((o =
                          (i =
                            ((((i +=
                              ((a = t ^ n) ^
                                (e =
                                  ((((e += (a ^ i) + r[5] - 378558) << 4) |
                                    (e >>> 28)) +
                                    t) <<
                                  0)) +
                              r[8] -
                              2022574463) <<
                              11) |
                              (i >>> 21)) +
                              e) <<
                            0) ^ e) ^
                          (n =
                            ((((n += (o ^ t) + r[11] + 1839030562) << 16) |
                              (n >>> 16)) +
                              i) <<
                            0)) +
                        r[14] -
                        35309556) <<
                        23) |
                        (t >>> 9)) +
                        n) <<
                      0),
                    (t =
                      ((((t +=
                        ((o =
                          (i =
                            ((((i +=
                              ((a = t ^ n) ^
                                (e =
                                  ((((e += (a ^ i) + r[1] - 1530992060) << 4) |
                                    (e >>> 28)) +
                                    t) <<
                                  0)) +
                              r[4] +
                              1272893353) <<
                              11) |
                              (i >>> 21)) +
                              e) <<
                            0) ^ e) ^
                          (n =
                            ((((n += (o ^ t) + r[7] - 155497632) << 16) |
                              (n >>> 16)) +
                              i) <<
                            0)) +
                        r[10] -
                        1094730640) <<
                        23) |
                        (t >>> 9)) +
                        n) <<
                      0),
                    (t =
                      ((((t +=
                        ((o =
                          (i =
                            ((((i +=
                              ((a = t ^ n) ^
                                (e =
                                  ((((e += (a ^ i) + r[13] + 681279174) << 4) |
                                    (e >>> 28)) +
                                    t) <<
                                  0)) +
                              r[0] -
                              358537222) <<
                              11) |
                              (i >>> 21)) +
                              e) <<
                            0) ^ e) ^
                          (n =
                            ((((n += (o ^ t) + r[3] - 722521979) << 16) |
                              (n >>> 16)) +
                              i) <<
                            0)) +
                        r[6] +
                        76029189) <<
                        23) |
                        (t >>> 9)) +
                        n) <<
                      0),
                    (t =
                      ((((t +=
                        ((o =
                          (i =
                            ((((i +=
                              ((a = t ^ n) ^
                                (e =
                                  ((((e += (a ^ i) + r[9] - 640364487) << 4) |
                                    (e >>> 28)) +
                                    t) <<
                                  0)) +
                              r[12] -
                              421815835) <<
                              11) |
                              (i >>> 21)) +
                              e) <<
                            0) ^ e) ^
                          (n =
                            ((((n += (o ^ t) + r[15] + 530742520) << 16) |
                              (n >>> 16)) +
                              i) <<
                            0)) +
                        r[2] -
                        995338651) <<
                        23) |
                        (t >>> 9)) +
                        n) <<
                      0),
                    (t =
                      ((((t +=
                        ((i =
                          ((((i +=
                            (t ^
                              ((e =
                                ((((e += (n ^ (t | ~i)) + r[0] - 198630844) <<
                                  6) |
                                  (e >>> 26)) +
                                  t) <<
                                0) |
                                ~n)) +
                            r[7] +
                            1126891415) <<
                            10) |
                            (i >>> 22)) +
                            e) <<
                          0) ^
                          ((n =
                            ((((n += (e ^ (i | ~t)) + r[14] - 1416354905) <<
                              15) |
                              (n >>> 17)) +
                              i) <<
                            0) |
                            ~e)) +
                        r[5] -
                        57434055) <<
                        21) |
                        (t >>> 11)) +
                        n) <<
                      0),
                    (t =
                      ((((t +=
                        ((i =
                          ((((i +=
                            (t ^
                              ((e =
                                ((((e += (n ^ (t | ~i)) + r[12] + 1700485571) <<
                                  6) |
                                  (e >>> 26)) +
                                  t) <<
                                0) |
                                ~n)) +
                            r[3] -
                            1894986606) <<
                            10) |
                            (i >>> 22)) +
                            e) <<
                          0) ^
                          ((n =
                            ((((n += (e ^ (i | ~t)) + r[10] - 1051523) << 15) |
                              (n >>> 17)) +
                              i) <<
                            0) |
                            ~e)) +
                        r[1] -
                        2054922799) <<
                        21) |
                        (t >>> 11)) +
                        n) <<
                      0),
                    (t =
                      ((((t +=
                        ((i =
                          ((((i +=
                            (t ^
                              ((e =
                                ((((e += (n ^ (t | ~i)) + r[8] + 1873313359) <<
                                  6) |
                                  (e >>> 26)) +
                                  t) <<
                                0) |
                                ~n)) +
                            r[15] -
                            30611744) <<
                            10) |
                            (i >>> 22)) +
                            e) <<
                          0) ^
                          ((n =
                            ((((n += (e ^ (i | ~t)) + r[6] - 1560198380) <<
                              15) |
                              (n >>> 17)) +
                              i) <<
                            0) |
                            ~e)) +
                        r[13] +
                        1309151649) <<
                        21) |
                        (t >>> 11)) +
                        n) <<
                      0),
                    (t =
                      ((((t +=
                        ((i =
                          ((((i +=
                            (t ^
                              ((e =
                                ((((e += (n ^ (t | ~i)) + r[4] - 145523070) <<
                                  6) |
                                  (e >>> 26)) +
                                  t) <<
                                0) |
                                ~n)) +
                            r[11] -
                            1120210379) <<
                            10) |
                            (i >>> 22)) +
                            e) <<
                          0) ^
                          ((n =
                            ((((n += (e ^ (i | ~t)) + r[2] + 718787259) << 15) |
                              (n >>> 17)) +
                              i) <<
                            0) |
                            ~e)) +
                        r[9] -
                        343485551) <<
                        21) |
                        (t >>> 11)) +
                        n) <<
                      0),
                    this.first
                      ? ((this.h0 = (e + 1732584193) << 0),
                        (this.h1 = (t - 271733879) << 0),
                        (this.h2 = (n - 1732584194) << 0),
                        (this.h3 = (i + 271733878) << 0),
                        (this.first = !1))
                      : ((this.h0 = (this.h0 + e) << 0),
                        (this.h1 = (this.h1 + t) << 0),
                        (this.h2 = (this.h2 + n) << 0),
                        (this.h3 = (this.h3 + i) << 0));
                }),
                (Md5.prototype.hex = function () {
                  this.finalize();
                  var e = this.h0,
                    t = this.h1,
                    n = this.h2,
                    i = this.h3;
                  return (
                    HEX_CHARS[(e >> 4) & 15] +
                    HEX_CHARS[15 & e] +
                    HEX_CHARS[(e >> 12) & 15] +
                    HEX_CHARS[(e >> 8) & 15] +
                    HEX_CHARS[(e >> 20) & 15] +
                    HEX_CHARS[(e >> 16) & 15] +
                    HEX_CHARS[(e >> 28) & 15] +
                    HEX_CHARS[(e >> 24) & 15] +
                    HEX_CHARS[(t >> 4) & 15] +
                    HEX_CHARS[15 & t] +
                    HEX_CHARS[(t >> 12) & 15] +
                    HEX_CHARS[(t >> 8) & 15] +
                    HEX_CHARS[(t >> 20) & 15] +
                    HEX_CHARS[(t >> 16) & 15] +
                    HEX_CHARS[(t >> 28) & 15] +
                    HEX_CHARS[(t >> 24) & 15] +
                    HEX_CHARS[(n >> 4) & 15] +
                    HEX_CHARS[15 & n] +
                    HEX_CHARS[(n >> 12) & 15] +
                    HEX_CHARS[(n >> 8) & 15] +
                    HEX_CHARS[(n >> 20) & 15] +
                    HEX_CHARS[(n >> 16) & 15] +
                    HEX_CHARS[(n >> 28) & 15] +
                    HEX_CHARS[(n >> 24) & 15] +
                    HEX_CHARS[(i >> 4) & 15] +
                    HEX_CHARS[15 & i] +
                    HEX_CHARS[(i >> 12) & 15] +
                    HEX_CHARS[(i >> 8) & 15] +
                    HEX_CHARS[(i >> 20) & 15] +
                    HEX_CHARS[(i >> 16) & 15] +
                    HEX_CHARS[(i >> 28) & 15] +
                    HEX_CHARS[(i >> 24) & 15]
                  );
                }),
                (Md5.prototype.toString = Md5.prototype.hex),
                (Md5.prototype.digest = function () {
                  this.finalize();
                  var e = this.h0,
                    t = this.h1,
                    n = this.h2,
                    i = this.h3;
                  return [
                    255 & e,
                    (e >> 8) & 255,
                    (e >> 16) & 255,
                    (e >> 24) & 255,
                    255 & t,
                    (t >> 8) & 255,
                    (t >> 16) & 255,
                    (t >> 24) & 255,
                    255 & n,
                    (n >> 8) & 255,
                    (n >> 16) & 255,
                    (n >> 24) & 255,
                    255 & i,
                    (i >> 8) & 255,
                    (i >> 16) & 255,
                    (i >> 24) & 255,
                  ];
                }),
                (Md5.prototype.array = Md5.prototype.digest),
                (Md5.prototype.arrayBuffer = function () {
                  this.finalize();
                  var e = new ArrayBuffer(16),
                    t = new Uint32Array(e);
                  return (
                    (t[0] = this.h0),
                    (t[1] = this.h1),
                    (t[2] = this.h2),
                    (t[3] = this.h3),
                    e
                  );
                }),
                (Md5.prototype.buffer = Md5.prototype.arrayBuffer),
                (Md5.prototype.base64 = function () {
                  for (var e, t, n, i = "", a = this.array(), o = 0; o < 15; )
                    (e = a[o++]),
                      (t = a[o++]),
                      (n = a[o++]),
                      (i +=
                        BASE64_ENCODE_CHAR[e >>> 2] +
                        BASE64_ENCODE_CHAR[63 & ((e << 4) | (t >>> 4))] +
                        BASE64_ENCODE_CHAR[63 & ((t << 2) | (n >>> 6))] +
                        BASE64_ENCODE_CHAR[63 & n]);
                  return (
                    (e = a[o]),
                    (i +=
                      BASE64_ENCODE_CHAR[e >>> 2] +
                      BASE64_ENCODE_CHAR[(e << 4) & 63] +
                      "==")
                  );
                });
              var exports = createMethod();
              COMMON_JS
                ? (module.exports = exports)
                : ((root.md5 = exports),
                  AMD &&
                    ((__WEBPACK_AMD_DEFINE_RESULT__ = function () {
                      return exports;
                    }.call(exports, __webpack_require__, exports, module)),
                    void 0 === __WEBPACK_AMD_DEFINE_RESULT__ ||
                      (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)));
            })();
          }).call(
            exports,
            __webpack_require__(9),
            __webpack_require__(1),
            __webpack_require__(10)(module)
          );
        },
        function (e, t, n) {
          "use strict";
          var i,
            a,
            o = (e.exports = {});
          function r() {
            throw new Error("setTimeout has not been defined");
          }
          function s() {
            throw new Error("clearTimeout has not been defined");
          }
          function c(e) {
            if (i === setTimeout) return setTimeout(e, 0);
            if ((i === r || !i) && setTimeout)
              return (i = setTimeout), setTimeout(e, 0);
            try {
              return i(e, 0);
            } catch (t) {
              try {
                return i.call(null, e, 0);
              } catch (t) {
                return i.call(this, e, 0);
              }
            }
          }
          !(function () {
            try {
              i = "function" == typeof setTimeout ? setTimeout : r;
            } catch (e) {
              i = r;
            }
            try {
              a = "function" == typeof clearTimeout ? clearTimeout : s;
            } catch (e) {
              a = s;
            }
          })();
          var l,
            p = [],
            u = !1,
            d = -1;
          function m() {
            u &&
              l &&
              ((u = !1),
              l.length ? (p = l.concat(p)) : (d = -1),
              p.length && f());
          }
          function f() {
            if (!u) {
              var e = c(m);
              u = !0;
              for (var t = p.length; t; ) {
                for (l = p, p = []; ++d < t; ) l && l[d].run();
                (d = -1), (t = p.length);
              }
              (l = null),
                (u = !1),
                (function (e) {
                  if (a === clearTimeout) return clearTimeout(e);
                  if ((a === s || !a) && clearTimeout)
                    return (a = clearTimeout), clearTimeout(e);
                  try {
                    a(e);
                  } catch (t) {
                    try {
                      return a.call(null, e);
                    } catch (t) {
                      return a.call(this, e);
                    }
                  }
                })(e);
            }
          }
          function h(e, t) {
            (this.fun = e), (this.array = t);
          }
          function g() {}
          (o.nextTick = function (e) {
            var t = new Array(arguments.length - 1);
            if (arguments.length > 1)
              for (var n = 1; n < arguments.length; n++)
                t[n - 1] = arguments[n];
            p.push(new h(e, t)), 1 !== p.length || u || c(f);
          }),
            (h.prototype.run = function () {
              this.fun.apply(null, this.array);
            }),
            (o.title = "browser"),
            (o.browser = !0),
            (o.env = {}),
            (o.argv = []),
            (o.version = ""),
            (o.versions = {}),
            (o.on = g),
            (o.addListener = g),
            (o.once = g),
            (o.off = g),
            (o.removeListener = g),
            (o.removeAllListeners = g),
            (o.emit = g),
            (o.prependListener = g),
            (o.prependOnceListener = g),
            (o.listeners = function (e) {
              return [];
            }),
            (o.binding = function (e) {
              throw new Error("process.binding is not supported");
            }),
            (o.cwd = function () {
              return "/";
            }),
            (o.chdir = function (e) {
              throw new Error("process.chdir is not supported");
            }),
            (o.umask = function () {
              return 0;
            });
        },
        function (e, t, n) {
          "use strict";
          e.exports = function (e) {
            return (
              e.webpackPolyfill ||
                ((e.deprecate = function () {}),
                (e.paths = []),
                e.children || (e.children = []),
                Object.defineProperty(e, "loaded", {
                  enumerable: !0,
                  get: function () {
                    return e.l;
                  },
                }),
                Object.defineProperty(e, "id", {
                  enumerable: !0,
                  get: function () {
                    return e.i;
                  },
                }),
                (e.webpackPolyfill = 1)),
              e
            );
          };
        },
        function (e, t) {
          (function (t) {
            e.exports = t;
          }).call(t, {});
        },
        function (e, t, n) {
          "use strict";
          var i,
            a,
            o,
            r,
            s,
            c,
            l,
            p =
              p ||
              (function (e, t) {
                var n = {},
                  i = (n.lib = {}),
                  a = function () {},
                  o = (i.Base = {
                    extend: function (e) {
                      a.prototype = this;
                      var t = new a();
                      return (
                        e && t.mixIn(e),
                        t.hasOwnProperty("init") ||
                          (t.init = function () {
                            t.$super.init.apply(this, arguments);
                          }),
                        (t.init.prototype = t),
                        (t.$super = this),
                        t
                      );
                    },
                    create: function () {
                      var e = this.extend();
                      return e.init.apply(e, arguments), e;
                    },
                    init: function () {},
                    mixIn: function (e) {
                      for (var t in e) e.hasOwnProperty(t) && (this[t] = e[t]);
                      e.hasOwnProperty("toString") &&
                        (this.toString = e.toString);
                    },
                    clone: function () {
                      return this.init.prototype.extend(this);
                    },
                  }),
                  r = (i.WordArray = o.extend({
                    init: function (e, t) {
                      (e = this.words = e || []),
                        (this.sigBytes = null != t ? t : 4 * e.length);
                    },
                    toString: function (e) {
                      return (e || c).stringify(this);
                    },
                    concat: function (e) {
                      var t = this.words,
                        n = e.words,
                        i = this.sigBytes;
                      if (((e = e.sigBytes), this.clamp(), i % 4))
                        for (var a = 0; a < e; a++)
                          t[(i + a) >>> 2] |=
                            ((n[a >>> 2] >>> (24 - (a % 4) * 8)) & 255) <<
                            (24 - ((i + a) % 4) * 8);
                      else if (65535 < n.length)
                        for (a = 0; a < e; a += 4)
                          t[(i + a) >>> 2] = n[a >>> 2];
                      else t.push.apply(t, n);
                      return (this.sigBytes += e), this;
                    },
                    clamp: function () {
                      var t = this.words,
                        n = this.sigBytes;
                      (t[n >>> 2] &= 4294967295 << (32 - (n % 4) * 8)),
                        (t.length = e.ceil(n / 4));
                    },
                    clone: function () {
                      var e = o.clone.call(this);
                      return (e.words = this.words.slice(0)), e;
                    },
                    random: function (t) {
                      for (var n = [], i = 0; i < t; i += 4)
                        n.push((4294967296 * e.random()) | 0);
                      return new r.init(n, t);
                    },
                  })),
                  s = (n.enc = {}),
                  c = (s.Hex = {
                    stringify: function (e) {
                      var t = e.words;
                      e = e.sigBytes;
                      for (var n = [], i = 0; i < e; i++) {
                        var a = (t[i >>> 2] >>> (24 - (i % 4) * 8)) & 255;
                        n.push((a >>> 4).toString(16)),
                          n.push((15 & a).toString(16));
                      }
                      return n.join("");
                    },
                    parse: function (e) {
                      for (var t = e.length, n = [], i = 0; i < t; i += 2)
                        n[i >>> 3] |=
                          parseInt(e.substr(i, 2), 16) << (24 - (i % 8) * 4);
                      return new r.init(n, t / 2);
                    },
                  }),
                  l = (s.Latin1 = {
                    stringify: function (e) {
                      var t = e.words;
                      e = e.sigBytes;
                      for (var n = [], i = 0; i < e; i++)
                        n.push(
                          String.fromCharCode(
                            (t[i >>> 2] >>> (24 - (i % 4) * 8)) & 255
                          )
                        );
                      return n.join("");
                    },
                    parse: function (e) {
                      for (var t = e.length, n = [], i = 0; i < t; i++)
                        n[i >>> 2] |=
                          (255 & e.charCodeAt(i)) << (24 - (i % 4) * 8);
                      return new r.init(n, t);
                    },
                  }),
                  p = (s.Utf8 = {
                    stringify: function (e) {
                      try {
                        return decodeURIComponent(escape(l.stringify(e)));
                      } catch (e) {
                        throw Error("Malformed UTF-8 data");
                      }
                    },
                    parse: function (e) {
                      return l.parse(unescape(encodeURIComponent(e)));
                    },
                  }),
                  u = (i.BufferedBlockAlgorithm = o.extend({
                    reset: function () {
                      (this._data = new r.init()), (this._nDataBytes = 0);
                    },
                    _append: function (e) {
                      "string" == typeof e && (e = p.parse(e)),
                        this._data.concat(e),
                        (this._nDataBytes += e.sigBytes);
                    },
                    _process: function (t) {
                      var n = this._data,
                        i = n.words,
                        a = n.sigBytes,
                        o = this.blockSize,
                        s = a / (4 * o);
                      if (
                        ((t =
                          (s = t
                            ? e.ceil(s)
                            : e.max((0 | s) - this._minBufferSize, 0)) * o),
                        (a = e.min(4 * t, a)),
                        t)
                      ) {
                        for (var c = 0; c < t; c += o)
                          this._doProcessBlock(i, c);
                        (c = i.splice(0, t)), (n.sigBytes -= a);
                      }
                      return new r.init(c, a);
                    },
                    clone: function () {
                      var e = o.clone.call(this);
                      return (e._data = this._data.clone()), e;
                    },
                    _minBufferSize: 0,
                  }));
                i.Hasher = u.extend({
                  cfg: o.extend(),
                  init: function (e) {
                    (this.cfg = this.cfg.extend(e)), this.reset();
                  },
                  reset: function () {
                    u.reset.call(this), this._doReset();
                  },
                  update: function (e) {
                    return this._append(e), this._process(), this;
                  },
                  finalize: function (e) {
                    return e && this._append(e), this._doFinalize();
                  },
                  blockSize: 16,
                  _createHelper: function (e) {
                    return function (t, n) {
                      return new e.init(n).finalize(t);
                    };
                  },
                  _createHmacHelper: function (e) {
                    return function (t, n) {
                      return new d.HMAC.init(e, n).finalize(t);
                    };
                  },
                });
                var d = (n.algo = {});
                return n;
              })(Math);
          (a = (s = (i = p).lib).WordArray),
            (o = s.Hasher),
            (r = []),
            (s = i.algo.SHA1 =
              o.extend({
                _doReset: function () {
                  this._hash = new a.init([
                    1732584193, 4023233417, 2562383102, 271733878, 3285377520,
                  ]);
                },
                _doProcessBlock: function (e, t) {
                  for (
                    var n = this._hash.words,
                      i = n[0],
                      a = n[1],
                      o = n[2],
                      s = n[3],
                      c = n[4],
                      l = 0;
                    80 > l;
                    l++
                  ) {
                    if (16 > l) r[l] = 0 | e[t + l];
                    else {
                      var p = r[l - 3] ^ r[l - 8] ^ r[l - 14] ^ r[l - 16];
                      r[l] = (p << 1) | (p >>> 31);
                    }
                    (p = ((i << 5) | (i >>> 27)) + c + r[l]),
                      (p =
                        20 > l
                          ? p + (1518500249 + ((a & o) | (~a & s)))
                          : 40 > l
                          ? p + (1859775393 + (a ^ o ^ s))
                          : 60 > l
                          ? p + (((a & o) | (a & s) | (o & s)) - 1894007588)
                          : p + ((a ^ o ^ s) - 899497514)),
                      (c = s),
                      (s = o),
                      (o = (a << 30) | (a >>> 2)),
                      (a = i),
                      (i = p);
                  }
                  (n[0] = (n[0] + i) | 0),
                    (n[1] = (n[1] + a) | 0),
                    (n[2] = (n[2] + o) | 0),
                    (n[3] = (n[3] + s) | 0),
                    (n[4] = (n[4] + c) | 0);
                },
                _doFinalize: function () {
                  var e = this._data,
                    t = e.words,
                    n = 8 * this._nDataBytes,
                    i = 8 * e.sigBytes;
                  return (
                    (t[i >>> 5] |= 128 << (24 - (i % 32))),
                    (t[14 + (((i + 64) >>> 9) << 4)] = Math.floor(
                      n / 4294967296
                    )),
                    (t[15 + (((i + 64) >>> 9) << 4)] = n),
                    (e.sigBytes = 4 * t.length),
                    this._process(),
                    this._hash
                  );
                },
                clone: function () {
                  var e = o.clone.call(this);
                  return (e._hash = this._hash.clone()), e;
                },
              })),
            (i.SHA1 = o._createHelper(s)),
            (i.HmacSHA1 = o._createHmacHelper(s)),
            (function () {
              var e = p,
                t = e.enc.Utf8;
              e.algo.HMAC = e.lib.Base.extend({
                init: function (e, n) {
                  (e = this._hasher = new e.init()),
                    "string" == typeof n && (n = t.parse(n));
                  var i = e.blockSize,
                    a = 4 * i;
                  n.sigBytes > a && (n = e.finalize(n)), n.clamp();
                  for (
                    var o = (this._oKey = n.clone()),
                      r = (this._iKey = n.clone()),
                      s = o.words,
                      c = r.words,
                      l = 0;
                    l < i;
                    l++
                  )
                    (s[l] ^= 1549556828), (c[l] ^= 909522486);
                  (o.sigBytes = r.sigBytes = a), this.reset();
                },
                reset: function () {
                  var e = this._hasher;
                  e.reset(), e.update(this._iKey);
                },
                update: function (e) {
                  return this._hasher.update(e), this;
                },
                finalize: function (e) {
                  var t = this._hasher;
                  return (
                    (e = t.finalize(e)),
                    t.reset(),
                    t.finalize(this._oKey.clone().concat(e))
                  );
                },
              });
            })(),
            (l = (c = p).lib.WordArray),
            (c.enc.Base64 = {
              stringify: function (e) {
                var t = e.words,
                  n = e.sigBytes,
                  i = this._map;
                e.clamp();
                for (var a = [], o = 0; o < n; o += 3)
                  for (
                    var r =
                        (((t[o >>> 2] >>> (24 - (o % 4) * 8)) & 255) << 16) |
                        (((t[(o + 1) >>> 2] >>> (24 - ((o + 1) % 4) * 8)) &
                          255) <<
                          8) |
                        ((t[(o + 2) >>> 2] >>> (24 - ((o + 2) % 4) * 8)) & 255),
                      s = 0;
                    s < 4 && o + 0.75 * s < n;
                    s++
                  )
                    a.push(i.charAt((r >>> (6 * (3 - s))) & 63));
                var c = i.charAt(64);
                if (c) for (; a.length % 4; ) a.push(c);
                return a.join("");
              },
              parse: function (e) {
                var t = e.length,
                  n = this._map,
                  i = n.charAt(64);
                if (i) {
                  var a = e.indexOf(i);
                  -1 != a && (t = a);
                }
                for (var o = [], r = 0, s = 0; s < t; s++)
                  if (s % 4) {
                    var c = n.indexOf(e.charAt(s - 1)) << ((s % 4) * 2),
                      p = n.indexOf(e.charAt(s)) >>> (6 - (s % 4) * 2);
                    (o[r >>> 2] |= (c | p) << (24 - (r % 4) * 8)), r++;
                  }
                return l.create(o, r);
              },
              _map: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
            }),
            (e.exports = p);
        },
        function (e, t, n) {
          "use strict";
          var i = n(14).DOMParser,
            a = function (e) {
              void 0 === (e = e || {}).escapeMode && (e.escapeMode = !0),
                (e.attributePrefix = e.attributePrefix || "_"),
                (e.arrayAccessForm = e.arrayAccessForm || "none"),
                (e.emptyNodeForm = e.emptyNodeForm || "text"),
                void 0 === e.enableToStringFunc && (e.enableToStringFunc = !0),
                (e.arrayAccessFormPaths = e.arrayAccessFormPaths || []),
                void 0 === e.skipEmptyTextNodesForObj &&
                  (e.skipEmptyTextNodesForObj = !0),
                void 0 === e.stripWhitespaces && (e.stripWhitespaces = !0),
                (e.datetimeAccessFormPaths = e.datetimeAccessFormPaths || []),
                void 0 === e.useDoubleQuotes && (e.useDoubleQuotes = !1),
                (e.xmlElementsFilter = e.xmlElementsFilter || []),
                (e.jsonPropertiesFilter = e.jsonPropertiesFilter || []),
                void 0 === e.keepCData && (e.keepCData = !1);
              var t = 1,
                n = 3,
                a = 4,
                o = 8,
                r = 9;
              function s(e) {
                var t = e.localName;
                return (
                  null == t && (t = e.baseName),
                  (null != t && "" != t) || (t = e.nodeName),
                  t
                );
              }
              function c(e) {
                return "string" == typeof e
                  ? e
                      .replace(/&/g, "&amp;")
                      .replace(/</g, "&lt;")
                      .replace(/>/g, "&gt;")
                      .replace(/"/g, "&quot;")
                      .replace(/'/g, "&apos;")
                  : e;
              }
              function l(e, t, n, i) {
                for (var a = 0; a < e.length; a++) {
                  var o = e[a];
                  if ("string" == typeof o) {
                    if (o == i) break;
                  } else if (o instanceof RegExp) {
                    if (o.test(i)) break;
                  } else if ("function" == typeof o && o(t, n, i)) break;
                }
                return a != e.length;
              }
              function p(t, n, i) {
                switch (e.arrayAccessForm) {
                  case "property":
                    t[n] instanceof Array
                      ? (t[n + "_asArray"] = t[n])
                      : (t[n + "_asArray"] = [t[n]]);
                }
                !(t[n] instanceof Array) &&
                  e.arrayAccessFormPaths.length > 0 &&
                  l(e.arrayAccessFormPaths, t, n, i) &&
                  (t[n] = [t[n]]);
              }
              function u(e) {
                var t = e.split(/[-T:+Z]/g),
                  n = new Date(t[0], t[1] - 1, t[2]),
                  i = t[5].split(".");
                if (
                  (n.setHours(t[3], t[4], i[0]),
                  i.length > 1 && n.setMilliseconds(i[1]),
                  t[6] && t[7])
                ) {
                  var a = 60 * t[6] + Number(t[7]);
                  (a =
                    0 +
                    ("-" == (/\d\d-\d\d:\d\d$/.test(e) ? "-" : "+")
                      ? -1 * a
                      : a)),
                    n.setMinutes(n.getMinutes() - a - n.getTimezoneOffset());
                } else
                  -1 !== e.indexOf("Z", e.length - 1) &&
                    (n = new Date(
                      Date.UTC(
                        n.getFullYear(),
                        n.getMonth(),
                        n.getDate(),
                        n.getHours(),
                        n.getMinutes(),
                        n.getSeconds(),
                        n.getMilliseconds()
                      )
                    ));
                return n;
              }
              function d(n, i, a, o) {
                return (
                  !(i == t && e.xmlElementsFilter.length > 0) ||
                  l(e.xmlElementsFilter, n, a, o)
                );
              }
              function m(i, c) {
                if (i.nodeType == r) {
                  for (
                    var f = new Object(), h = i.childNodes, g = 0;
                    g < h.length;
                    g++
                  )
                    (v = h.item(g)).nodeType == t && (f[(x = s(v))] = m(v, x));
                  return f;
                }
                if (i.nodeType == t) {
                  for (
                    (f = new Object()).__cnt = 0, h = i.childNodes, g = 0;
                    g < h.length;
                    g++
                  ) {
                    var v,
                      x = s((v = h.item(g)));
                    if (v.nodeType != o) {
                      var y = c + "." + x;
                      d(f, v.nodeType, x, y) &&
                        (f.__cnt++,
                        null == f[x]
                          ? ((f[x] = m(v, y)), p(f, x, y))
                          : (null != f[x] &&
                              (f[x] instanceof Array ||
                                ((f[x] = [f[x]]), p(f, x, y))),
                            (f[x][f[x].length] = m(v, y))));
                    }
                  }
                  for (var C = 0; C < i.attributes.length; C++) {
                    var b = i.attributes.item(C);
                    f.__cnt++, (f[e.attributePrefix + b.name] = b.value);
                  }
                  var k = (function (e) {
                    return e.prefix;
                  })(i);
                  return (
                    null != k && "" != k && (f.__cnt++, (f.__prefix = k)),
                    null != f["#text"] &&
                      ((f.__text = f["#text"]),
                      f.__text instanceof Array &&
                        (f.__text = f.__text.join("\n")),
                      e.stripWhitespaces && (f.__text = f.__text.trim()),
                      delete f["#text"],
                      "property" == e.arrayAccessForm &&
                        delete f["#text_asArray"],
                      (f.__text = (function (t, n, i) {
                        if (e.datetimeAccessFormPaths.length > 0) {
                          var a = i.split(".#")[0];
                          return l(e.datetimeAccessFormPaths, t, n, a)
                            ? u(t)
                            : t;
                        }
                        return t;
                      })(f.__text, x, c + "." + x))),
                    null != f["#cdata-section"] &&
                      ((f.__cdata = f["#cdata-section"]),
                      delete f["#cdata-section"],
                      "property" == e.arrayAccessForm &&
                        delete f["#cdata-section_asArray"]),
                    0 == f.__cnt && "text" == e.emptyNodeForm
                      ? (f = "")
                      : 1 == f.__cnt && null != f.__text
                      ? (f = f.__text)
                      : 1 != f.__cnt || null == f.__cdata || e.keepCData
                      ? f.__cnt > 1 &&
                        null != f.__text &&
                        e.skipEmptyTextNodesForObj &&
                        ((e.stripWhitespaces && "" == f.__text) ||
                          "" == f.__text.trim()) &&
                        delete f.__text
                      : (f = f.__cdata),
                    delete f.__cnt,
                    !e.enableToStringFunc ||
                      (null == f.__text && null == f.__cdata) ||
                      (f.toString = function () {
                        return (
                          (null != this.__text ? this.__text : "") +
                          (null != this.__cdata ? this.__cdata : "")
                        );
                      }),
                    f
                  );
                }
                if (i.nodeType == n || i.nodeType == a) return i.nodeValue;
              }
              function f(t, n, i, a) {
                var o =
                  "<" +
                  (null != t && null != t.__prefix ? t.__prefix + ":" : "") +
                  n;
                if (null != i)
                  for (var r = 0; r < i.length; r++) {
                    var s = i[r],
                      l = t[s];
                    e.escapeMode && (l = c(l)),
                      (o += " " + s.substr(e.attributePrefix.length) + "="),
                      e.useDoubleQuotes
                        ? (o += '"' + l + '"')
                        : (o += "'" + l + "'");
                  }
                return (o += a ? "/>" : ">");
              }
              function h(e, t) {
                return (
                  "</" + (null != e.__prefix ? e.__prefix + ":" : "") + t + ">"
                );
              }
              function g(t, n) {
                return (
                  ("property" == e.arrayAccessForm &&
                    ((i = n.toString()),
                    (a = "_asArray"),
                    -1 !== i.indexOf(a, i.length - a.length))) ||
                  0 == n.toString().indexOf(e.attributePrefix) ||
                  0 == n.toString().indexOf("__") ||
                  t[n] instanceof Function
                );
                var i, a;
              }
              function v(e) {
                var t = 0;
                if (e instanceof Object) for (var n in e) g(e, n) || t++;
                return t;
              }
              function x(t, n, i) {
                return (
                  0 == e.jsonPropertiesFilter.length ||
                  "" == i ||
                  l(e.jsonPropertiesFilter, t, n, i)
                );
              }
              function y(t) {
                var n = [];
                if (t instanceof Object)
                  for (var i in t)
                    -1 == i.toString().indexOf("__") &&
                      0 == i.toString().indexOf(e.attributePrefix) &&
                      n.push(i);
                return n;
              }
              function C(t) {
                var n = "";
                return (
                  t instanceof Object
                    ? (n += (function (t) {
                        var n = "";
                        return (
                          null != t.__cdata &&
                            (n += "<![CDATA[" + t.__cdata + "]]>"),
                          null != t.__text &&
                            (e.escapeMode
                              ? (n += c(t.__text))
                              : (n += t.__text)),
                          n
                        );
                      })(t))
                    : null != t && (e.escapeMode ? (n += c(t)) : (n += t)),
                  n
                );
              }
              function b(e, t) {
                return "" === e ? t : e + "." + t;
              }
              function k(e, t, n, i) {
                var a = "";
                if (0 == e.length) a += f(e, t, n, !0);
                else
                  for (var o = 0; o < e.length; o++)
                    (a += f(e[o], t, y(e[o]), !1)),
                      (a += S(e[o], b(i, t))),
                      (a += h(e[o], t));
                return a;
              }
              function S(e, t) {
                var n = "";
                if (v(e) > 0)
                  for (var i in e)
                    if (!g(e, i) && ("" == t || x(e, i, b(t, i)))) {
                      var a = e[i],
                        o = y(a);
                      null == a || null == a
                        ? (n += f(a, i, o, !0))
                        : a instanceof Object
                        ? a instanceof Array
                          ? (n += k(a, i, o, t))
                          : a instanceof Date
                          ? ((n += f(a, i, o, !1)),
                            (n += a.toISOString()),
                            (n += h(a, i)))
                          : v(a) > 0 || null != a.__text || null != a.__cdata
                          ? ((n += f(a, i, o, !1)),
                            (n += S(a, b(t, i))),
                            (n += h(a, i)))
                          : (n += f(a, i, o, !0))
                        : ((n += f(a, i, o, !1)), (n += C(a)), (n += h(a, i)));
                    }
                return (n += C(e));
              }
              (this.parseXmlString = function (e) {
                var t;
                if (void 0 === e) return null;
                if (i) {
                  var n = new i(),
                    a = null;
                  try {
                    a = n
                      .parseFromString("INVALID", "text/xml")
                      .getElementsByTagName("parsererror")[0].namespaceURI;
                  } catch (e) {
                    a = null;
                  }
                  try {
                    (t = n.parseFromString(e, "text/xml")),
                      null != a &&
                        t.getElementsByTagNameNS(a, "parsererror").length > 0 &&
                        (t = null);
                  } catch (e) {
                    t = null;
                  }
                } else
                  0 == e.indexOf("<?") && (e = e.substr(e.indexOf("?>") + 2)),
                    ((t = new ActiveXObject("Microsoft.XMLDOM")).async =
                      "false"),
                    t.loadXML(e);
                return t;
              }),
                (this.asArray = function (e) {
                  return void 0 === e || null == e
                    ? []
                    : e instanceof Array
                    ? e
                    : [e];
                }),
                (this.toXmlDateTime = function (e) {
                  return e instanceof Date
                    ? e.toISOString()
                    : "number" == typeof e
                    ? new Date(e).toISOString()
                    : null;
                }),
                (this.asDateTime = function (e) {
                  return "string" == typeof e ? u(e) : e;
                }),
                (this.xml2json = function (e) {
                  return m(e);
                }),
                (this.xml_str2json = function (e) {
                  var t = this.parseXmlString(e);
                  return null != t ? this.xml2json(t) : null;
                }),
                (this.json2xml_str = function (e) {
                  return S(e, "");
                }),
                (this.json2xml = function (e) {
                  var t = this.json2xml_str(e);
                  return this.parseXmlString(t);
                }),
                (this.getVersion = function () {
                  return "1.2.0";
                });
            };
          e.exports = function (e) {
            if (!e) return null;
            var t = new i().parseFromString(e, "text/xml"),
              n = new a().xml2json(t);
            return n.html && n.getElementsByTagName("parsererror").length
              ? null
              : n;
          };
        },
        function (e, t, n) {
          "use strict";
          function i(e) {
            this.options = e || { locator: {} };
          }
          function a() {
            this.cdata = !1;
          }
          function o(e, t) {
            (t.lineNumber = e.lineNumber), (t.columnNumber = e.columnNumber);
          }
          function r(e) {
            if (e)
              return (
                "\n@" +
                (e.systemId || "") +
                "#[line:" +
                e.lineNumber +
                ",col:" +
                e.columnNumber +
                "]"
              );
          }
          function s(e, t, n) {
            return "string" == typeof e
              ? e.substr(t, n)
              : e.length >= t + n || t
              ? new java.lang.String(e, t, n) + ""
              : e;
          }
          function c(e, t) {
            e.currentElement
              ? e.currentElement.appendChild(t)
              : e.doc.appendChild(t);
          }
          (i.prototype.parseFromString = function (e, t) {
            var n = this.options,
              i = new l(),
              o = n.domBuilder || new a(),
              s = n.errorHandler,
              c = n.locator,
              p = n.xmlns || {},
              u = { lt: "<", gt: ">", amp: "&", quot: '"', apos: "'" };
            return (
              c && o.setDocumentLocator(c),
              (i.errorHandler = (function (e, t, n) {
                if (!e) {
                  if (t instanceof a) return t;
                  e = t;
                }
                var i = {},
                  o = e instanceof Function;
                function s(t) {
                  var a = e[t];
                  !a &&
                    o &&
                    (a =
                      2 == e.length
                        ? function (n) {
                            e(t, n);
                          }
                        : e),
                    (i[t] =
                      (a &&
                        function (e) {
                          a("[xmldom " + t + "]\t" + e + r(n));
                        }) ||
                      function () {});
                }
                return (
                  (n = n || {}), s("warning"), s("error"), s("fatalError"), i
                );
              })(s, o, c)),
              (i.domBuilder = n.domBuilder || o),
              /\/x?html?$/.test(t) &&
                ((u.nbsp = " "),
                (u.copy = "©"),
                (p[""] = "http://www.w3.org/1999/xhtml")),
              (p.xml = p.xml || "http://www.w3.org/XML/1998/namespace"),
              e ? i.parse(e, p, u) : i.errorHandler.error("invalid doc source"),
              o.doc
            );
          }),
            (a.prototype = {
              startDocument: function () {
                (this.doc = new p().createDocument(null, null, null)),
                  this.locator &&
                    (this.doc.documentURI = this.locator.systemId);
              },
              startElement: function (e, t, n, i) {
                var a = this.doc,
                  r = a.createElementNS(e, n || t),
                  s = i.length;
                c(this, r),
                  (this.currentElement = r),
                  this.locator && o(this.locator, r);
                for (var l = 0; l < s; l++) {
                  e = i.getURI(l);
                  var p = i.getValue(l),
                    u = ((n = i.getQName(l)), a.createAttributeNS(e, n));
                  this.locator && o(i.getLocator(l), u),
                    (u.value = u.nodeValue = p),
                    r.setAttributeNode(u);
                }
              },
              endElement: function (e, t, n) {
                var i = this.currentElement;
                i.tagName, (this.currentElement = i.parentNode);
              },
              startPrefixMapping: function (e, t) {},
              endPrefixMapping: function (e) {},
              processingInstruction: function (e, t) {
                var n = this.doc.createProcessingInstruction(e, t);
                this.locator && o(this.locator, n), c(this, n);
              },
              ignorableWhitespace: function (e, t, n) {},
              characters: function (e, t, n) {
                if ((e = s.apply(this, arguments))) {
                  if (this.cdata) var i = this.doc.createCDATASection(e);
                  else i = this.doc.createTextNode(e);
                  this.currentElement
                    ? this.currentElement.appendChild(i)
                    : /^\s*$/.test(e) && this.doc.appendChild(i),
                    this.locator && o(this.locator, i);
                }
              },
              skippedEntity: function (e) {},
              endDocument: function () {
                this.doc.normalize();
              },
              setDocumentLocator: function (e) {
                (this.locator = e) && (e.lineNumber = 0);
              },
              comment: function (e, t, n) {
                e = s.apply(this, arguments);
                var i = this.doc.createComment(e);
                this.locator && o(this.locator, i), c(this, i);
              },
              startCDATA: function () {
                this.cdata = !0;
              },
              endCDATA: function () {
                this.cdata = !1;
              },
              startDTD: function (e, t, n) {
                var i = this.doc.implementation;
                if (i && i.createDocumentType) {
                  var a = i.createDocumentType(e, t, n);
                  this.locator && o(this.locator, a), c(this, a);
                }
              },
              warning: function (e) {
                console.warn("[xmldom warning]\t" + e, r(this.locator));
              },
              error: function (e) {
                console.error("[xmldom error]\t" + e, r(this.locator));
              },
              fatalError: function (e) {
                throw (
                  (console.error("[xmldom fatalError]\t" + e, r(this.locator)),
                  e)
                );
              },
            }),
            "endDTD,startEntity,endEntity,attributeDecl,elementDecl,externalEntityDecl,internalEntityDecl,resolveEntity,getExternalSubset,notationDecl,unparsedEntityDecl".replace(
              /\w+/g,
              function (e) {
                a.prototype[e] = function () {
                  return null;
                };
              }
            );
          var l = n(15).XMLReader,
            p = (t.DOMImplementation = n(2).DOMImplementation);
          (t.XMLSerializer = n(2).XMLSerializer), (t.DOMParser = i);
        },
        function (e, t, n) {
          "use strict";
          var i =
              /[A-Z_a-z\xC0-\xD6\xD8-\xF6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD]/,
            a = new RegExp(
              "[\\-\\.0-9" +
                i.source.slice(1, -1) +
                "\\u00B7\\u0300-\\u036F\\u203F-\\u2040]"
            ),
            o = new RegExp(
              "^" + i.source + a.source + "*(?::" + i.source + a.source + "*)?$"
            );
          function r() {}
          function s(e, t) {
            return (
              (t.lineNumber = e.lineNumber),
              (t.columnNumber = e.columnNumber),
              t
            );
          }
          function c(e, t, n, i, a, o) {
            for (var r, s = ++t, c = 0; ; ) {
              var l = e.charAt(s);
              switch (l) {
                case "=":
                  if (1 === c) (r = e.slice(t, s)), (c = 3);
                  else {
                    if (2 !== c)
                      throw new Error("attribute equal must after attrName");
                    c = 3;
                  }
                  break;
                case "'":
                case '"':
                  if (3 === c || 1 === c) {
                    if (
                      (1 === c &&
                        (o.warning('attribute value must after "="'),
                        (r = e.slice(t, s))),
                      (t = s + 1),
                      !((s = e.indexOf(l, t)) > 0))
                    )
                      throw new Error(
                        "attribute value no end '" + l + "' match"
                      );
                    (p = e.slice(t, s).replace(/&#?\w+;/g, a)),
                      n.add(r, p, t - 1),
                      (c = 5);
                  } else {
                    if (4 != c)
                      throw new Error('attribute value must after "="');
                    (p = e.slice(t, s).replace(/&#?\w+;/g, a)),
                      n.add(r, p, t),
                      o.warning(
                        'attribute "' + r + '" missed start quot(' + l + ")!!"
                      ),
                      (t = s + 1),
                      (c = 5);
                  }
                  break;
                case "/":
                  switch (c) {
                    case 0:
                      n.setTagName(e.slice(t, s));
                    case 5:
                    case 6:
                    case 7:
                      (c = 7), (n.closed = !0);
                    case 4:
                    case 1:
                    case 2:
                      break;
                    default:
                      throw new Error("attribute invalid close char('/')");
                  }
                  break;
                case "":
                  return (
                    o.error("unexpected end of input"),
                    0 == c && n.setTagName(e.slice(t, s)),
                    s
                  );
                case ">":
                  switch (c) {
                    case 0:
                      n.setTagName(e.slice(t, s));
                    case 5:
                    case 6:
                    case 7:
                      break;
                    case 4:
                    case 1:
                      "/" === (p = e.slice(t, s)).slice(-1) &&
                        ((n.closed = !0), (p = p.slice(0, -1)));
                    case 2:
                      2 === c && (p = r),
                        4 == c
                          ? (o.warning(
                              'attribute "' + p + '" missed quot(")!!'
                            ),
                            n.add(r, p.replace(/&#?\w+;/g, a), t))
                          : (("http://www.w3.org/1999/xhtml" === i[""] &&
                              p.match(/^(?:disabled|checked|selected)$/i)) ||
                              o.warning(
                                'attribute "' +
                                  p +
                                  '" missed value!! "' +
                                  p +
                                  '" instead!!'
                              ),
                            n.add(p, p, t));
                      break;
                    case 3:
                      throw new Error("attribute value missed!!");
                  }
                  return s;
                case "":
                  l = " ";
                default:
                  if (l <= " ")
                    switch (c) {
                      case 0:
                        n.setTagName(e.slice(t, s)), (c = 6);
                        break;
                      case 1:
                        (r = e.slice(t, s)), (c = 2);
                        break;
                      case 4:
                        var p = e.slice(t, s).replace(/&#?\w+;/g, a);
                        o.warning('attribute "' + p + '" missed quot(")!!'),
                          n.add(r, p, t);
                      case 5:
                        c = 6;
                    }
                  else
                    switch (c) {
                      case 2:
                        n.tagName,
                          ("http://www.w3.org/1999/xhtml" === i[""] &&
                            r.match(/^(?:disabled|checked|selected)$/i)) ||
                            o.warning(
                              'attribute "' +
                                r +
                                '" missed value!! "' +
                                r +
                                '" instead2!!'
                            ),
                          n.add(r, r, t),
                          (t = s),
                          (c = 1);
                        break;
                      case 5:
                        o.warning('attribute space is required"' + r + '"!!');
                      case 6:
                        (c = 1), (t = s);
                        break;
                      case 3:
                        (c = 4), (t = s);
                        break;
                      case 7:
                        throw new Error(
                          "elements closed character '/' and '>' must be connected to"
                        );
                    }
              }
              s++;
            }
          }
          function l(e, t, n) {
            for (var i = e.tagName, a = null, o = e.length; o--; ) {
              var r = e[o],
                s = r.qName,
                c = r.value;
              if ((m = s.indexOf(":")) > 0)
                var l = (r.prefix = s.slice(0, m)),
                  p = s.slice(m + 1),
                  u = "xmlns" === l && p;
              else (p = s), (l = null), (u = "xmlns" === s && "");
              (r.localName = p),
                !1 !== u &&
                  (null == a && ((a = {}), d(n, (n = {}))),
                  (n[u] = a[u] = c),
                  (r.uri = "http://www.w3.org/2000/xmlns/"),
                  t.startPrefixMapping(u, c));
            }
            for (o = e.length; o--; )
              (l = (r = e[o]).prefix) &&
                ("xml" === l &&
                  (r.uri = "http://www.w3.org/XML/1998/namespace"),
                "xmlns" !== l && (r.uri = n[l || ""]));
            var m;
            (m = i.indexOf(":")) > 0
              ? ((l = e.prefix = i.slice(0, m)),
                (p = e.localName = i.slice(m + 1)))
              : ((l = null), (p = e.localName = i));
            var f = (e.uri = n[l || ""]);
            if ((t.startElement(f, p, i, e), !e.closed))
              return (e.currentNSMap = n), (e.localNSMap = a), !0;
            if ((t.endElement(f, p, i), a)) for (l in a) t.endPrefixMapping(l);
          }
          function p(e, t, n, i, a) {
            if (/^(?:script|textarea)$/i.test(n)) {
              var o = e.indexOf("</" + n + ">", t),
                r = e.substring(t + 1, o);
              if (/[&<]/.test(r))
                return /^script$/i.test(n)
                  ? (a.characters(r, 0, r.length), o)
                  : ((r = r.replace(/&#?\w+;/g, i)),
                    a.characters(r, 0, r.length),
                    o);
            }
            return t + 1;
          }
          function u(e, t, n, i) {
            var a = i[n];
            return (
              null == a &&
                ((a = e.lastIndexOf("</" + n + ">")) < t &&
                  (a = e.lastIndexOf("</" + n)),
                (i[n] = a)),
              a < t
            );
          }
          function d(e, t) {
            for (var n in e) t[n] = e[n];
          }
          function m(e, t, n, i) {
            switch (e.charAt(t + 2)) {
              case "-":
                return "-" === e.charAt(t + 3)
                  ? (a = e.indexOf("--\x3e", t + 4)) > t
                    ? (n.comment(e, t + 4, a - t - 4), a + 3)
                    : (i.error("Unclosed comment"), -1)
                  : -1;
              default:
                if ("CDATA[" == e.substr(t + 3, 6)) {
                  var a = e.indexOf("]]>", t + 9);
                  return (
                    n.startCDATA(),
                    n.characters(e, t + 9, a - t - 9),
                    n.endCDATA(),
                    a + 3
                  );
                }
                var o = (function (e, t) {
                    var n,
                      i = [],
                      a = /'[^']+'|"[^"]+"|[^\s<>\/=]+=?|(\/?\s*>|<)/g;
                    for (a.lastIndex = t, a.exec(e); (n = a.exec(e)); )
                      if ((i.push(n), n[1])) return i;
                  })(e, t),
                  r = o.length;
                if (r > 1 && /!doctype/i.test(o[0][0])) {
                  var s = o[1][0],
                    c = r > 3 && /^public$/i.test(o[2][0]) && o[3][0],
                    l = r > 4 && o[4][0],
                    p = o[r - 1];
                  return (
                    n.startDTD(
                      s,
                      c && c.replace(/^(['"])(.*?)\1$/, "$2"),
                      l && l.replace(/^(['"])(.*?)\1$/, "$2")
                    ),
                    n.endDTD(),
                    p.index + p[0].length
                  );
                }
            }
            return -1;
          }
          function f(e, t, n) {
            var i = e.indexOf("?>", t);
            if (i) {
              var a = e.substring(t, i).match(/^<\?(\S*)\s*([\s\S]*?)\s*$/);
              return a
                ? (a[0].length, n.processingInstruction(a[1], a[2]), i + 2)
                : -1;
            }
            return -1;
          }
          function h(e) {}
          function g(e, t) {
            return (e.__proto__ = t), e;
          }
          (r.prototype = {
            parse: function (e, t, n) {
              var i = this.domBuilder;
              i.startDocument(),
                d(t, (t = {})),
                (function (e, t, n, i, a) {
                  function o(e) {
                    var t = e.slice(1, -1);
                    return t in n
                      ? n[t]
                      : "#" === t.charAt(0)
                      ? (function (e) {
                          if (e > 65535) {
                            var t = 55296 + ((e -= 65536) >> 10),
                              n = 56320 + (1023 & e);
                            return String.fromCharCode(t, n);
                          }
                          return String.fromCharCode(e);
                        })(parseInt(t.substr(1).replace("x", "0x")))
                      : (a.error("entity not found:" + e), e);
                  }
                  function r(t) {
                    if (t > k) {
                      var n = e.substring(k, t).replace(/&#?\w+;/g, o);
                      y && d(k), i.characters(n, 0, t - k), (k = t);
                    }
                  }
                  function d(t, n) {
                    for (; t >= v && (n = x.exec(e)); )
                      (g = n.index), (v = g + n[0].length), y.lineNumber++;
                    y.columnNumber = t - g + 1;
                  }
                  for (
                    var g = 0,
                      v = 0,
                      x = /.*(?:\r\n?|\n)|.*$/g,
                      y = i.locator,
                      C = [{ currentNSMap: t }],
                      b = {},
                      k = 0;
                    ;

                  ) {
                    try {
                      var S = e.indexOf("<", k);
                      if (S < 0) {
                        if (!e.substr(k).match(/^\s*$/)) {
                          var R = i.doc,
                            w = R.createTextNode(e.substr(k));
                          R.appendChild(w), (i.currentElement = w);
                        }
                        return;
                      }
                      switch ((S > k && r(S), e.charAt(S + 1))) {
                        case "/":
                          var _ = e.indexOf(">", S + 3),
                            A = e.substring(S + 2, _),
                            T = C.pop();
                          _ < 0
                            ? ((A = e.substring(S + 2).replace(/[\s<].*/, "")),
                              a.error(
                                "end tag name: " +
                                  A +
                                  " is not complete:" +
                                  T.tagName
                              ),
                              (_ = S + 1 + A.length))
                            : A.match(/\s</) &&
                              ((A = A.replace(/[\s<].*/, "")),
                              a.error(
                                "end tag name: " + A + " maybe not complete"
                              ),
                              (_ = S + 1 + A.length));
                          var B = T.localNSMap,
                            E = T.tagName == A;
                          if (
                            E ||
                            (T.tagName &&
                              T.tagName.toLowerCase() == A.toLowerCase())
                          ) {
                            if ((i.endElement(T.uri, T.localName, A), B))
                              for (var O in B) i.endPrefixMapping(O);
                            E ||
                              a.fatalError(
                                "end tag name: " +
                                  A +
                                  " is not match the current start tagName:" +
                                  T.tagName
                              );
                          } else C.push(T);
                          _++;
                          break;
                        case "?":
                          y && d(S), (_ = f(e, S, i));
                          break;
                        case "!":
                          y && d(S), (_ = m(e, S, i, a));
                          break;
                        default:
                          y && d(S);
                          var I = new h(),
                            D = C[C.length - 1].currentNSMap,
                            P = ((_ = c(e, S, I, D, o, a)), I.length);
                          if (
                            (!I.closed &&
                              u(e, _, I.tagName, b) &&
                              ((I.closed = !0),
                              n.nbsp || a.warning("unclosed xml attribute")),
                            y && P)
                          ) {
                            for (var N = s(y, {}), j = 0; j < P; j++) {
                              var M = I[j];
                              d(M.offset), (M.locator = s(y, {}));
                            }
                            (i.locator = N),
                              l(I, i, D) && C.push(I),
                              (i.locator = y);
                          } else l(I, i, D) && C.push(I);
                          "http://www.w3.org/1999/xhtml" !== I.uri || I.closed
                            ? _++
                            : (_ = p(e, _, I.tagName, o, i));
                      }
                    } catch (e) {
                      a.error("element parse error: " + e), (_ = -1);
                    }
                    _ > k ? (k = _) : r(Math.max(S, k) + 1);
                  }
                })(e, t, n, i, this.errorHandler),
                i.endDocument();
            },
          }),
            (h.prototype = {
              setTagName: function (e) {
                if (!o.test(e)) throw new Error("invalid tagName:" + e);
                this.tagName = e;
              },
              add: function (e, t, n) {
                if (!o.test(e)) throw new Error("invalid attribute:" + e);
                this[this.length++] = { qName: e, value: t, offset: n };
              },
              length: 0,
              getLocalName: function (e) {
                return this[e].localName;
              },
              getLocator: function (e) {
                return this[e].locator;
              },
              getQName: function (e) {
                return this[e].qName;
              },
              getURI: function (e) {
                return this[e].uri;
              },
              getValue: function (e) {
                return this[e].value;
              },
            }),
            g({}, g.prototype) instanceof g ||
              (g = function (e, t) {
                function n() {}
                for (t in ((n.prototype = t), (n = new n()), e)) n[t] = e[t];
                return n;
              }),
            (t.XMLReader = r);
        },
        function (e, t, n) {
          "use strict";
          var i =
              "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
                ? function (e) {
                    return typeof e;
                  }
                : function (e) {
                    return e &&
                      "function" == typeof Symbol &&
                      e.constructor === Symbol &&
                      e !== Symbol.prototype
                      ? "symbol"
                      : typeof e;
                  },
            a = new RegExp(
              "^([^a-zA-Z_À-ÖØ-öø-ÿͰ-ͽͿ-῿‌-‍⁰-↏Ⰰ-⿿、-퟿豈-﷏ﷰ-�])|^((x|X)(m|M)(l|L))|([^a-zA-Z_À-ÖØ-öø-ÿͰ-ͽͿ-῿‌-‍⁰-↏Ⰰ-⿿、-퟿豈-﷏ﷰ-�-.0-9·̀-ͯ‿⁀])",
              "g"
            ),
            o =
              /[^\x09\x0A\x0D\x20-\xFF\x85\xA0-\uD7FF\uE000-\uFDCF\uFDE0-\uFFFD]/gm,
            r = function (e) {
              var t = [];
              if (e instanceof Object)
                for (var n in e) e.hasOwnProperty(n) && t.push(n);
              return t;
            },
            s = function (e, t) {
              var n = function (e, n, i, o, r) {
                var s = void 0 !== t.indent ? t.indent : "\t",
                  c = t.prettyPrint ? "\n" + new Array(o).join(s) : "";
                t.removeIllegalNameCharacters && (e = e.replace(a, "_"));
                var l = [c, "<", e, i || ""];
                return (
                  n && n.length > 0
                    ? (l.push(">"),
                      l.push(n),
                      r && l.push(c),
                      l.push("</"),
                      l.push(e),
                      l.push(">"))
                    : l.push("/>"),
                  l.join("")
                );
              };
              return (function e(a, s, c) {
                var l = void 0 === a ? "undefined" : i(a);
                switch (
                  ((Array.isArray ? Array.isArray(a) : a instanceof Array)
                    ? (l = "array")
                    : a instanceof Date && (l = "date"),
                  l)
                ) {
                  case "array":
                    var p = [];
                    return (
                      a.map(function (t) {
                        p.push(e(t, 0, c + 1));
                      }),
                      t.prettyPrint && p.push("\n"),
                      p.join("")
                    );
                  case "date":
                    return a.toJSON ? a.toJSON() : a + "";
                  case "object":
                    var u = [];
                    for (var d in a)
                      if (a.hasOwnProperty(d))
                        if (a[d] instanceof Array)
                          for (var m in a[d])
                            a[d].hasOwnProperty(m) &&
                              u.push(
                                n(
                                  d,
                                  e(a[d][m], 0, c + 1),
                                  null,
                                  c + 1,
                                  r(a[d][m]).length
                                )
                              );
                        else u.push(n(d, e(a[d], 0, c + 1), null, c + 1));
                    return (
                      t.prettyPrint && u.length > 0 && u.push("\n"), u.join("")
                    );
                  case "function":
                    return a();
                  default:
                    return t.escape
                      ? ("" + a)
                          .replace(/&/g, "&amp;")
                          .replace(/</g, "&lt;")
                          .replace(/>/g, "&gt;")
                          .replace(/'/g, "&apos;")
                          .replace(/"/g, "&quot;")
                          .replace(o, "")
                      : "" + a;
                }
              })(e, 0, 0);
            },
            c = function (e) {
              var t = ['<?xml version="1.0" encoding="UTF-8"'];
              return e && t.push(' standalone="yes"'), t.push("?>"), t.join("");
            };
          e.exports = function (e, t) {
            if (
              (t ||
                (t = {
                  xmlHeader: { standalone: !0 },
                  prettyPrint: !0,
                  indent: "  ",
                }),
              "string" == typeof e)
            )
              try {
                e = JSON.parse(e.toString());
              } catch (e) {
                return !1;
              }
            var n = "",
              a = "";
            return (
              t &&
                ("object" == (void 0 === t ? "undefined" : i(t))
                  ? (t.xmlHeader && (n = c(!!t.xmlHeader.standalone)),
                    void 0 !== t.docType &&
                      (a = "<!DOCTYPE " + t.docType + ">"))
                  : (n = c())),
              [n, (t = t || {}).prettyPrint && a ? "\n" : "", a, s(e, t)]
                .join("")
                .replace(/\n{2,}/g, "\n")
                .replace(/\s+$/g, "")
            );
          };
        },
        function (e, t, n) {
          "use strict";
          var i = n(5),
            a = n(0),
            o = {};
          (e.exports.transferToTaskMethod = function (e, t) {
            (o[t] = e[t]),
              (e[t] = function (e, n) {
                e.SkipTask ? o[t].call(this, e, n) : this._addTask(t, e, n);
              });
          }),
            (e.exports.init = function (e) {
              var t,
                n,
                r = [],
                s = {},
                c = 0,
                l = 0,
                p = function (e) {
                  var t = {
                    id: e.id,
                    Bucket: e.Bucket,
                    Region: e.Region,
                    Key: e.Key,
                    FilePath: e.FilePath,
                    state: e.state,
                    loaded: e.loaded,
                    size: e.size,
                    speed: e.speed,
                    percent: e.percent,
                    hashPercent: e.hashPercent,
                    error: e.error,
                  };
                  return e.FilePath && (t.FilePath = e.FilePath), t;
                },
                u =
                  ((n = function () {
                    (t = 0),
                      e.emit("task-list-update", { list: a.map(r, p) }),
                      e.emit("list-update", { list: a.map(r, p) });
                  }),
                  function () {
                    t || (t = setTimeout(n));
                  }),
                d = function () {
                  if (!(r.length <= e.options.UploadQueueSize)) {
                    for (
                      var t = 0;
                      t < l &&
                      t < r.length &&
                      r.length > e.options.UploadQueueSize;

                    ) {
                      var n =
                        "waiting" === r[t].state ||
                        "checking" === r[t].state ||
                        "uploading" === r[t].state;
                      r[t] && n
                        ? t++
                        : (s[r[t].id] && delete s[r[t].id],
                          r.splice(t, 1),
                          l--);
                    }
                    u();
                  }
                },
                m = function t() {
                  if (!(c >= e.options.FileParallelLimit)) {
                    for (; r[l] && "waiting" !== r[l].state; ) l++;
                    if (!(l >= r.length)) {
                      var n = r[l];
                      l++,
                        c++,
                        (n.state = "checking"),
                        n.params.onTaskStart && n.params.onTaskStart(p(n)),
                        !n.params.UploadData && (n.params.UploadData = {});
                      var i = a.formatParams(n.api, n.params);
                      o[n.api].call(e, i, function (i, a) {
                        e._isRunningTask(n.id) &&
                          (("checking" !== n.state &&
                            "uploading" !== n.state) ||
                            ((n.state = i ? "error" : "success"),
                            i && (n.error = i),
                            c--,
                            u(),
                            t(),
                            n.callback && n.callback(i, a),
                            "success" === n.state &&
                              (n.params &&
                                (delete n.params.UploadData,
                                delete n.params.Body,
                                delete n.params),
                              delete n.callback)),
                          d());
                      }),
                        u(),
                        setTimeout(t);
                    }
                  }
                },
                f = function (t, n) {
                  var a = s[t];
                  if (a) {
                    var o = a && "waiting" === a.state,
                      r =
                        a &&
                        ("checking" === a.state || "uploading" === a.state);
                    if (
                      ("canceled" === n && "canceled" !== a.state) ||
                      ("paused" === n && o) ||
                      ("paused" === n && r)
                    ) {
                      if (
                        "paused" === n &&
                        a.params.Body &&
                        "function" == typeof a.params.Body.pipe
                      )
                        return void console.error("stream not support pause");
                      (a.state = n),
                        e.emit("inner-kill-task", { TaskId: t, toState: n });
                      try {
                        var l = a && a.params && a.params.UploadData.UploadId;
                      } catch (e) {}
                      "canceled" === n && l && i.removeUsing(l),
                        u(),
                        r && (c--, m()),
                        "canceled" === n &&
                          (a.params &&
                            (delete a.params.UploadData,
                            delete a.params.Body,
                            delete a.params),
                          delete a.callback);
                    }
                    d();
                  }
                };
              (e._addTasks = function (t) {
                a.each(t, function (t) {
                  e._addTask(t.api, t.params, t.callback, !0);
                }),
                  u();
              }),
                (e._addTask = function (t, n, i, o) {
                  "sliceUploadFile" !== t ||
                    a.canFileSlice() ||
                    (t = "postObject"),
                    (n = a.formatParams(t, n));
                  var c = a.uuid();
                  (n.TaskId = c), n.onTaskReady && n.onTaskReady(c);
                  var l = {
                      params: n,
                      callback: i,
                      api: t,
                      index: r.length,
                      id: c,
                      Bucket: n.Bucket,
                      Region: n.Region,
                      Key: n.Key,
                      FilePath: n.FilePath || "",
                      state: "waiting",
                      loaded: 0,
                      size: 0,
                      speed: 0,
                      percent: 0,
                      hashPercent: 0,
                      error: null,
                    },
                    p = n.onHashProgress;
                  n.onHashProgress = function (t) {
                    e._isRunningTask(l.id) &&
                      ((l.hashPercent = t.percent), p && p(t), u());
                  };
                  var f = n.onProgress;
                  return (
                    (n.onProgress = function (t) {
                      e._isRunningTask(l.id) &&
                        ("checking" === l.state && (l.state = "uploading"),
                        (l.loaded = t.loaded),
                        (l.size = t.total),
                        (l.speed = t.speed),
                        (l.percent = t.percent),
                        f && f(t),
                        u());
                    }),
                    a.getFileSize(t, n, function (e, t) {
                      e
                        ? i(e)
                        : ((s[c] = l),
                          r.push(l),
                          (l.size = t),
                          !o && u(),
                          m(),
                          d());
                    }),
                    c
                  );
                }),
                (e._isRunningTask = function (e) {
                  var t = s[e];
                  return !(
                    !t ||
                    ("checking" !== t.state && "uploading" !== t.state)
                  );
                }),
                (e.getTaskList = function () {
                  return a.map(r, p);
                }),
                (e.cancelTask = function (e) {
                  f(e, "canceled");
                }),
                (e.pauseTask = function (e) {
                  f(e, "paused");
                }),
                (e.restartTask = function (e) {
                  var t = s[e];
                  !t ||
                    ("paused" !== t.state && "error" !== t.state) ||
                    ((t.state = "waiting"),
                    u(),
                    (l = Math.min(l, t.index)),
                    m());
                }),
                (e.isUploadRunning = function () {
                  return c || l < r.length;
                });
            });
        },
        function (e, t, n) {
          "use strict";
          var i = n(19),
            a = n(3),
            o = n(0),
            r = n(20);
          function s(e) {
            var t = {
                GrantFullControl: [],
                GrantWrite: [],
                GrantRead: [],
                GrantReadAcp: [],
                GrantWriteAcp: [],
                ACL: "",
              },
              n = {
                FULL_CONTROL: "GrantFullControl",
                WRITE: "GrantWrite",
                READ: "GrantRead",
                READ_ACP: "GrantReadAcp",
                WRITE_ACP: "GrantWriteAcp",
              },
              i = ((e && e.AccessControlList) || {}).Grant;
            i && (i = o.isArray(i) ? i : [i]);
            var a = { READ: 0, WRITE: 0, FULL_CONTROL: 0 };
            return (
              i &&
                i.length &&
                o.each(i, function (i) {
                  "qcs::cam::anyone:anyone" === i.Grantee.ID ||
                  "http://cam.qcloud.com/groups/global/AllUsers" ===
                    i.Grantee.URI
                    ? (a[i.Permission] = 1)
                    : i.Grantee.ID !== e.Owner.ID &&
                      t[n[i.Permission]].push('id="' + i.Grantee.ID + '"');
                }),
              a.FULL_CONTROL || (a.WRITE && a.READ)
                ? (t.ACL = "public-read-write")
                : a.READ
                ? (t.ACL = "public-read")
                : (t.ACL = "private"),
              o.each(n, function (e) {
                t[e] = c(t[e].join(","));
              }),
              t
            );
          }
          function c(e) {
            var t,
              n,
              i = e.split(","),
              a = {};
            for (t = 0; t < i.length; )
              a[(n = i[t].trim())]
                ? i.splice(t, 1)
                : ((a[n] = !0), (i[t] = n), t++);
            return i.join(",");
          }
          function l(e) {
            var t = e.bucket,
              n = t.substr(0, t.lastIndexOf("-")),
              i = t.substr(t.lastIndexOf("-") + 1),
              a = e.domain,
              r = e.region,
              s = e.object;
            a ||
              ((a =
                [
                  "cn-south",
                  "cn-south-2",
                  "cn-north",
                  "cn-east",
                  "cn-southwest",
                  "sg",
                ].indexOf(r) > -1
                  ? "{Region}.myqcloud.com"
                  : "cos.{Region}.myqcloud.com"),
              e.ForcePathStyle || (a = "{Bucket}." + a)),
              (a = (a = a
                .replace(/\{\{AppId\}\}/gi, i)
                .replace(/\{\{Bucket\}\}/gi, n)
                .replace(/\{\{Region\}\}/gi, r)
                .replace(/\{\{.*?\}\}/gi, ""))
                .replace(/\{AppId\}/gi, i)
                .replace(/\{BucketName\}/gi, n)
                .replace(/\{Bucket\}/gi, t)
                .replace(/\{Region\}/gi, r)
                .replace(/\{.*?\}/gi, "")),
              /^[a-zA-Z]+:\/\//.test(a) || (a = "https://" + a),
              "/" === a.slice(-1) && (a = a.slice(0, -1));
            var c = a;
            return (
              e.ForcePathStyle && (c += "/" + t),
              (c += "/"),
              s && (c += o.camSafeUrlEncode(s).replace(/%2F/g, "/")),
              e.isLocation && (c = c.replace(/^https?:\/\//, "")),
              c
            );
          }
          var p = function (e) {
            if (!e.Bucket || !e.Region) return "";
            var t = (
              e.Url ||
              l({
                ForcePathStyle: this.options.ForcePathStyle,
                protocol: this.options.Protocol,
                domain: this.options.Domain,
                bucket: e.Bucket,
                region: this.options.UseAccelerate ? "accelerate" : e.Region,
              })
            ).replace(/^https?:\/\/([^/]+)(\/.*)?$/, "$1");
            return new RegExp(
              "^([a-z\\d-]+-\\d+\\.)?(cos|cosv6|ci|pic)\\.([a-z\\d-]+)\\.myqcloud\\.com$"
            ).test(t)
              ? t
              : "";
          };
          function u(e, t) {
            var n = o.clone(e.Headers),
              i = "";
            o.each(n, function (e, t) {
              ("" === e ||
                ["content-type", "cache-control"].indexOf(t.toLowerCase()) >
                  -1) &&
                delete n[t],
                "host" === t.toLowerCase() && (i = e);
            }),
              !i && e.SignHost && (n.Host = e.SignHost);
            var r = function (e) {
                var n = !1,
                  i = e.Authorization;
                if (i)
                  if (i.indexOf(" ") > -1) n = !1;
                  else if (
                    i.indexOf("q-sign-algorithm=") > -1 &&
                    i.indexOf("q-ak=") > -1 &&
                    i.indexOf("q-sign-time=") > -1 &&
                    i.indexOf("q-key-time=") > -1 &&
                    i.indexOf("q-url-param-list=") > -1
                  )
                    n = !0;
                  else
                    try {
                      (i = a.atob(i)).indexOf("a=") > -1 &&
                        i.indexOf("k=") > -1 &&
                        i.indexOf("t=") > -1 &&
                        i.indexOf("r=") > -1 &&
                        i.indexOf("b=") > -1 &&
                        (n = !0);
                    } catch (e) {}
                n ? t && t(null, e) : t && t("authorization error");
              },
              s = this,
              c = e.Bucket || "",
              l = e.Region || "",
              p = "name/cos:PostObject" !== e.Action && e.Key ? e.Key : "";
            s.options.ForcePathStyle && c && (p = c + "/" + p);
            var u = "/" + p,
              d = {},
              m = e.Scope;
            if (!m) {
              var f = e.Action || "",
                h = e.ResourceKey || e.Key || "";
              m = e.Scope || [{ action: f, bucket: c, region: l, prefix: h }];
            }
            var g = o.md5(JSON.stringify(m));
            (s._StsCache = s._StsCache || []),
              (function () {
                var e, t;
                for (e = s._StsCache.length - 1; e >= 0; e--) {
                  t = s._StsCache[e];
                  var n =
                    Math.round(
                      o.getSkewTime(s.options.SystemClockOffset) / 1e3
                    ) + 30;
                  if ((t.StartTime && n < t.StartTime) || n >= t.ExpiredTime)
                    s._StsCache.splice(e, 1);
                  else if (
                    !t.ScopeLimit ||
                    (t.ScopeLimit && t.ScopeKey === g)
                  ) {
                    d = t;
                    break;
                  }
                }
              })();
            var v,
              x = function () {
                var t =
                    d.StartTime && d.ExpiredTime
                      ? d.StartTime + ";" + d.ExpiredTime
                      : "",
                  i = {
                    Authorization: o.getAuth({
                      SecretId: d.TmpSecretId,
                      SecretKey: d.TmpSecretKey,
                      Method: e.Method,
                      Pathname: u,
                      Query: e.Query,
                      Headers: n,
                      Expires: e.Expires,
                      SystemClockOffset: s.options.SystemClockOffset,
                      KeyTime: t,
                    }),
                    XCosSecurityToken: d.XCosSecurityToken || "",
                    Token: d.Token || "",
                    ClientIP: d.ClientIP || "",
                    ClientUA: d.ClientUA || "",
                  };
                r(i);
              };
            if (
              d.ExpiredTime &&
              d.ExpiredTime - o.getSkewTime(s.options.SystemClockOffset) / 1e3 >
                60
            )
              x();
            else if (s.options.getAuthorization)
              s.options.getAuthorization.call(
                s,
                {
                  Bucket: c,
                  Region: l,
                  Method: e.Method,
                  Key: p,
                  Pathname: u,
                  Query: e.Query,
                  Headers: n,
                  Scope: m,
                  SystemClockOffset: s.options.SystemClockOffset,
                },
                function (e) {
                  "string" == typeof e && (e = { Authorization: e }),
                    e.TmpSecretId &&
                    e.TmpSecretKey &&
                    e.XCosSecurityToken &&
                    e.ExpiredTime
                      ? (((d = e || {}).Scope = m),
                        (d.ScopeKey = g),
                        s._StsCache.push(d),
                        x())
                      : r(e);
                }
              );
            else {
              if (!s.options.getSTS)
                return (
                  (v = {
                    Authorization: o.getAuth({
                      SecretId: e.SecretId || s.options.SecretId,
                      SecretKey: e.SecretKey || s.options.SecretKey,
                      Method: e.Method,
                      Pathname: u,
                      Query: e.Query,
                      Headers: n,
                      Expires: e.Expires,
                      SystemClockOffset: s.options.SystemClockOffset,
                    }),
                    XCosSecurityToken: s.options.XCosSecurityToken,
                  }),
                  r(v),
                  v
                );
              s.options.getSTS.call(s, { Bucket: c, Region: l }, function (e) {
                ((d = e || {}).Scope = m),
                  (d.ScopeKey = g),
                  (d.TmpSecretId = d.SecretId),
                  (d.TmpSecretKey = d.SecretKey),
                  s._StsCache.push(d),
                  x();
              });
            }
            return "";
          }
          function d(e) {
            var t = !1,
              n = !1,
              i =
                (e.headers && (e.headers.date || e.headers.Date)) ||
                (e.error && e.error.ServerTime);
            try {
              var a = e.error.Code,
                r = e.error.Message;
              ("RequestTimeTooSkewed" === a ||
                ("AccessDenied" === a && "Request has expired" === r)) &&
                (n = !0);
            } catch (e) {}
            if (e)
              if (n && i) {
                var s = Date.parse(i);
                this.options.CorrectClockSkew &&
                  Math.abs(o.getSkewTime(this.options.SystemClockOffset) - s) >=
                    3e4 &&
                  (console.error("error: Local time is too skewed."),
                  (this.options.SystemClockOffset = s - Date.now()),
                  (t = !0));
              } else 5 === Math.floor(e.statusCode / 100) && (t = !0);
            return t;
          }
          function m(e, t) {
            var n = this;
            !e.headers && (e.headers = {}),
              !e.qs && (e.qs = {}),
              e.VersionId && (e.qs.versionId = e.VersionId),
              (e.qs = o.clearKey(e.qs)),
              e.headers && (e.headers = o.clearKey(e.headers)),
              e.qs && (e.qs = o.clearKey(e.qs));
            var i = o.clone(e.qs);
            e.action && (i[e.action] = "");
            var a = e.url || e.Url,
              r =
                e.SignHost ||
                p.call(this, { Bucket: e.Bucket, Region: e.Region, Url: a });
            !(function a(o) {
              var s = n.options.SystemClockOffset;
              u.call(
                n,
                {
                  Bucket: e.Bucket || "",
                  Region: e.Region || "",
                  Method: e.method,
                  Key: e.Key,
                  Query: i,
                  Headers: e.headers,
                  SignHost: r,
                  Action: e.Action,
                  ResourceKey: e.ResourceKey,
                  Scope: e.Scope,
                },
                function (i, r) {
                  i
                    ? t(i)
                    : ((e.AuthData = r),
                      f.call(n, e, function (i, r) {
                        i &&
                        o < 2 &&
                        (s !== n.options.SystemClockOffset || d.call(n, i))
                          ? (e.headers &&
                              (delete e.headers.Authorization,
                              delete e.headers.token,
                              delete e.headers.clientIP,
                              delete e.headers.clientUA,
                              delete e.headers["x-cos-security-token"]),
                            a(o + 1))
                          : t(i, r);
                      }));
                }
              );
            })(1);
          }
          function f(e, t) {
            var n = this,
              a = e.TaskId;
            if (!a || n._isRunningTask(a)) {
              var r = e.Bucket,
                s = e.Region,
                c = e.Key,
                p = e.method || "GET",
                u = e.url || e.Url,
                d = e.body,
                m = e.json,
                f = e.rawBody;
              n.options.UseAccelerate && (s = "accelerate"),
                (u =
                  u ||
                  l({
                    ForcePathStyle: n.options.ForcePathStyle,
                    protocol: n.options.Protocol,
                    domain: n.options.Domain,
                    bucket: r,
                    region: s,
                    object: c,
                  })),
                e.action && (u = u + "?" + e.action),
                e.qsStr &&
                  (u =
                    u.indexOf("?") > -1
                      ? u + "&" + e.qsStr
                      : u + "?" + e.qsStr);
              var h = {
                  method: p,
                  url: u,
                  headers: e.headers,
                  qs: e.qs,
                  filePath: e.filePath,
                  body: d,
                  json: m,
                },
                g = "x-cos-security-token";
              o.isCIHost(u) && (g = "x-ci-security-token"),
                (h.headers.Authorization = e.AuthData.Authorization),
                e.AuthData.Token && (h.headers.token = e.AuthData.Token),
                e.AuthData.ClientIP &&
                  (h.headers.clientIP = e.AuthData.ClientIP),
                e.AuthData.ClientUA &&
                  (h.headers.clientUA = e.AuthData.ClientUA),
                e.AuthData.XCosSecurityToken &&
                  (h.headers[g] = e.AuthData.XCosSecurityToken),
                h.headers && (h.headers = o.clearKey(h.headers)),
                (h = o.clearKey(h)),
                e.onProgress &&
                  "function" == typeof e.onProgress &&
                  (h.onProgress = function (t) {
                    if (!a || n._isRunningTask(a)) {
                      var i = t ? t.loaded : 0;
                      e.onProgress({ loaded: i, total: t.total });
                    }
                  }),
                this.options.Timeout && (h.timeout = this.options.Timeout),
                n.options.ForcePathStyle &&
                  (h.pathStyle = n.options.ForcePathStyle),
                n.emit("before-send", h);
              var v = i(h, function (e, i, r) {
                  if ("abort" !== e) {
                    var s,
                      c = function (e, r) {
                        if ((a && n.off("inner-kill-task", x), !s)) {
                          s = !0;
                          var c = {};
                          i && i.statusCode && (c.statusCode = i.statusCode),
                            i && i.headers && (c.headers = i.headers),
                            e
                              ? ((e = o.extend(e || {}, c)), t(e, null))
                              : ((r = o.extend(r || {}, c)), t(null, r)),
                            (v = null);
                        }
                      };
                    if (e) c({ error: e });
                    else {
                      var l;
                      if (f) (l = {}).body = r;
                      else
                        try {
                          l =
                            (r &&
                              r.indexOf("<") > -1 &&
                              r.indexOf(">") > -1 &&
                              o.xml2json(r)) ||
                            {};
                        } catch (e) {
                          l = r || {};
                        }
                      var p = i.statusCode;
                      2 === Math.floor(p / 100)
                        ? l.Error
                          ? c({ error: l.Error })
                          : c(null, l)
                        : c({ error: l.Error || l });
                    }
                  }
                }),
                x = function e(t) {
                  t.TaskId === a &&
                    (v && v.abort && v.abort(), n.off("inner-kill-task", e));
                };
              a && n.on("inner-kill-task", x);
            }
          }
          var h = {
            getService: function (e, t) {
              "function" == typeof e && ((t = e), (e = {}));
              var n = this.options.ServiceDomain,
                i = e.Region;
              n
                ? ((n = n
                    .replace(/\{\{Region\}\}/gi, i || "")
                    .replace(/\{\{.*?\}\}/gi, "")),
                  /^[a-zA-Z]+:\/\//.test(n) || (n = "https://" + n),
                  "/" === n.slice(-1) && (n = n.slice(0, -1)))
                : (n = i
                    ? "https://cos." + i + ".myqcloud.com"
                    : "https://service.cos.myqcloud.com"),
                n.replace(/^https?:\/\/([^/]+)(\/.*)?$/, "$1"),
                m.call(
                  this,
                  {
                    Action: "name/cos:GetService",
                    url: n,
                    method: "GET",
                    headers: e.Headers,
                  },
                  function (e, n) {
                    if (e) return t(e);
                    var i =
                      (n &&
                        n.ListAllMyBucketsResult &&
                        n.ListAllMyBucketsResult.Buckets &&
                        n.ListAllMyBucketsResult.Buckets.Bucket) ||
                      [];
                    i = o.isArray(i) ? i : [i];
                    var a =
                      (n &&
                        n.ListAllMyBucketsResult &&
                        n.ListAllMyBucketsResult.Owner) ||
                      {};
                    t(null, {
                      Buckets: i,
                      Owner: a,
                      statusCode: n.statusCode,
                      headers: n.headers,
                    });
                  }
                );
            },
            putBucket: function (e, t) {
              var n = this,
                i = "";
              if (e.BucketAZConfig) {
                var a = { BucketAZConfig: e.BucketAZConfig };
                i = o.json2xml({ CreateBucketConfiguration: a });
              }
              m.call(
                this,
                {
                  Action: "name/cos:PutBucket",
                  method: "PUT",
                  Bucket: e.Bucket,
                  Region: e.Region,
                  headers: e.Headers,
                  body: i,
                },
                function (i, a) {
                  if (i) return t(i);
                  var o = l({
                    protocol: n.options.Protocol,
                    domain: n.options.Domain,
                    bucket: e.Bucket,
                    region: e.Region,
                    isLocation: !0,
                  });
                  t(null, {
                    Location: o,
                    statusCode: a.statusCode,
                    headers: a.headers,
                  });
                }
              );
            },
            headBucket: function (e, t) {
              m.call(
                this,
                {
                  Action: "name/cos:HeadBucket",
                  Bucket: e.Bucket,
                  Region: e.Region,
                  headers: e.Headers,
                  method: "HEAD",
                },
                function (e, n) {
                  t(e, n);
                }
              );
            },
            getBucket: function (e, t) {
              var n = {};
              (n.prefix = e.Prefix || ""),
                (n.delimiter = e.Delimiter),
                (n.marker = e.Marker),
                (n["max-keys"] = e.MaxKeys),
                (n["encoding-type"] = e.EncodingType),
                m.call(
                  this,
                  {
                    Action: "name/cos:GetBucket",
                    ResourceKey: n.prefix,
                    method: "GET",
                    Bucket: e.Bucket,
                    Region: e.Region,
                    headers: e.Headers,
                    qs: n,
                  },
                  function (e, n) {
                    if (e) return t(e);
                    var i = n.ListBucketResult || {},
                      a = i.Contents || [],
                      r = i.CommonPrefixes || [];
                    (a = o.isArray(a) ? a : [a]), (r = o.isArray(r) ? r : [r]);
                    var s = o.clone(i);
                    o.extend(s, {
                      Contents: a,
                      CommonPrefixes: r,
                      statusCode: n.statusCode,
                      headers: n.headers,
                    }),
                      t(null, s);
                  }
                );
            },
            deleteBucket: function (e, t) {
              m.call(
                this,
                {
                  Action: "name/cos:DeleteBucket",
                  Bucket: e.Bucket,
                  Region: e.Region,
                  headers: e.Headers,
                  method: "DELETE",
                },
                function (e, n) {
                  return e && 204 === e.statusCode
                    ? t(null, { statusCode: e.statusCode })
                    : e
                    ? t(e)
                    : void t(null, {
                        statusCode: n.statusCode,
                        headers: n.headers,
                      });
                }
              );
            },
            putBucketAcl: function (e, t) {
              var n = e.Headers,
                i = "";
              if (e.AccessControlPolicy) {
                var a = o.clone(e.AccessControlPolicy || {}),
                  r = a.Grants || a.Grant;
                (r = o.isArray(r) ? r : [r]),
                  delete a.Grant,
                  delete a.Grants,
                  (a.AccessControlList = { Grant: r }),
                  (i = o.json2xml({ AccessControlPolicy: a })),
                  (n["Content-Type"] = "application/xml"),
                  (n["Content-MD5"] = o.binaryBase64(o.md5(i)));
              }
              o.each(n, function (e, t) {
                0 === t.indexOf("x-cos-grant-") && (n[t] = c(n[t]));
              }),
                m.call(
                  this,
                  {
                    Action: "name/cos:PutBucketACL",
                    method: "PUT",
                    Bucket: e.Bucket,
                    Region: e.Region,
                    headers: n,
                    action: "acl",
                    body: i,
                  },
                  function (e, n) {
                    if (e) return t(e);
                    t(null, { statusCode: n.statusCode, headers: n.headers });
                  }
                );
            },
            getBucketAcl: function (e, t) {
              m.call(
                this,
                {
                  Action: "name/cos:GetBucketACL",
                  method: "GET",
                  Bucket: e.Bucket,
                  Region: e.Region,
                  headers: e.Headers,
                  action: "acl",
                },
                function (e, n) {
                  if (e) return t(e);
                  var i = n.AccessControlPolicy || {},
                    a = i.Owner || {},
                    r = i.AccessControlList.Grant || [];
                  r = o.isArray(r) ? r : [r];
                  var c = s(i);
                  n.headers &&
                    n.headers["x-cos-acl"] &&
                    (c.ACL = n.headers["x-cos-acl"]),
                    (c = o.extend(c, {
                      Owner: a,
                      Grants: r,
                      statusCode: n.statusCode,
                      headers: n.headers,
                    })),
                    t(null, c);
                }
              );
            },
            putBucketCors: function (e, t) {
              var n =
                (e.CORSConfiguration || {}).CORSRules || e.CORSRules || [];
              (n = o.clone(o.isArray(n) ? n : [n])),
                o.each(n, function (e) {
                  o.each(
                    [
                      "AllowedOrigin",
                      "AllowedHeader",
                      "AllowedMethod",
                      "ExposeHeader",
                    ],
                    function (t) {
                      var n = t + "s",
                        i = e[n] || e[t] || [];
                      delete e[n], (e[t] = o.isArray(i) ? i : [i]);
                    }
                  );
                });
              var i = o.json2xml({ CORSConfiguration: { CORSRule: n } }),
                a = e.Headers;
              (a["Content-Type"] = "application/xml"),
                (a["Content-MD5"] = o.binaryBase64(o.md5(i))),
                m.call(
                  this,
                  {
                    Action: "name/cos:PutBucketCORS",
                    method: "PUT",
                    Bucket: e.Bucket,
                    Region: e.Region,
                    body: i,
                    action: "cors",
                    headers: a,
                  },
                  function (e, n) {
                    if (e) return t(e);
                    t(null, { statusCode: n.statusCode, headers: n.headers });
                  }
                );
            },
            getBucketCors: function (e, t) {
              m.call(
                this,
                {
                  Action: "name/cos:GetBucketCORS",
                  method: "GET",
                  Bucket: e.Bucket,
                  Region: e.Region,
                  headers: e.Headers,
                  action: "cors",
                },
                function (e, n) {
                  if (e)
                    if (
                      404 === e.statusCode &&
                      e.error &&
                      "NoSuchCORSConfiguration" === e.error.Code
                    ) {
                      var i = { CORSRules: [], statusCode: e.statusCode };
                      e.headers && (i.headers = e.headers), t(null, i);
                    } else t(e);
                  else {
                    var a = n.CORSConfiguration || {},
                      r = a.CORSRules || a.CORSRule || [];
                    (r = o.clone(o.isArray(r) ? r : [r])),
                      o.each(r, function (e) {
                        o.each(
                          [
                            "AllowedOrigin",
                            "AllowedHeader",
                            "AllowedMethod",
                            "ExposeHeader",
                          ],
                          function (t) {
                            var n = t + "s",
                              i = e[n] || e[t] || [];
                            delete e[t], (e[n] = o.isArray(i) ? i : [i]);
                          }
                        );
                      }),
                      t(null, {
                        CORSRules: r,
                        statusCode: n.statusCode,
                        headers: n.headers,
                      });
                  }
                }
              );
            },
            deleteBucketCors: function (e, t) {
              m.call(
                this,
                {
                  Action: "name/cos:DeleteBucketCORS",
                  method: "DELETE",
                  Bucket: e.Bucket,
                  Region: e.Region,
                  headers: e.Headers,
                  action: "cors",
                },
                function (e, n) {
                  return e && 204 === e.statusCode
                    ? t(null, { statusCode: e.statusCode })
                    : e
                    ? t(e)
                    : void t(null, {
                        statusCode: n.statusCode || e.statusCode,
                        headers: n.headers,
                      });
                }
              );
            },
            getBucketLocation: function (e, t) {
              m.call(
                this,
                {
                  Action: "name/cos:GetBucketLocation",
                  method: "GET",
                  Bucket: e.Bucket,
                  Region: e.Region,
                  headers: e.Headers,
                  action: "location",
                },
                function (e, n) {
                  if (e) return t(e);
                  t(null, n);
                }
              );
            },
            getBucketPolicy: function (e, t) {
              m.call(
                this,
                {
                  Action: "name/cos:GetBucketPolicy",
                  method: "GET",
                  Bucket: e.Bucket,
                  Region: e.Region,
                  headers: e.Headers,
                  action: "policy",
                  rawBody: !0,
                },
                function (e, n) {
                  if (e)
                    return e.statusCode && 403 === e.statusCode
                      ? t({ ErrorStatus: "Access Denied" })
                      : e.statusCode && 405 === e.statusCode
                      ? t({ ErrorStatus: "Method Not Allowed" })
                      : e.statusCode && 404 === e.statusCode
                      ? t({ ErrorStatus: "Policy Not Found" })
                      : t(e);
                  var i = {};
                  try {
                    i = JSON.parse(n.body);
                  } catch (e) {}
                  t(null, {
                    Policy: i,
                    statusCode: n.statusCode,
                    headers: n.headers,
                  });
                }
              );
            },
            putBucketPolicy: function (e, t) {
              var n = e.Policy,
                i = n;
              try {
                "string" == typeof n
                  ? (n = JSON.parse(i))
                  : (i = JSON.stringify(n));
              } catch (e) {
                t({ error: "Policy format error" });
              }
              var a = e.Headers;
              (a["Content-Type"] = "application/json"),
                (a["Content-MD5"] = o.binaryBase64(o.md5(i))),
                m.call(
                  this,
                  {
                    Action: "name/cos:PutBucketPolicy",
                    method: "PUT",
                    Bucket: e.Bucket,
                    Region: e.Region,
                    action: "policy",
                    body: i,
                    headers: a,
                    json: !0,
                  },
                  function (e, n) {
                    return e && 204 === e.statusCode
                      ? t(null, { statusCode: e.statusCode })
                      : e
                      ? t(e)
                      : void t(null, {
                          statusCode: n.statusCode,
                          headers: n.headers,
                        });
                  }
                );
            },
            deleteBucketPolicy: function (e, t) {
              m.call(
                this,
                {
                  Action: "name/cos:DeleteBucketPolicy",
                  method: "DELETE",
                  Bucket: e.Bucket,
                  Region: e.Region,
                  headers: e.Headers,
                  action: "policy",
                },
                function (e, n) {
                  return e && 204 === e.statusCode
                    ? t(null, { statusCode: e.statusCode })
                    : e
                    ? t(e)
                    : void t(null, {
                        statusCode: n.statusCode || e.statusCode,
                        headers: n.headers,
                      });
                }
              );
            },
            putBucketTagging: function (e, t) {
              var n = e.Tagging || {},
                i = n.TagSet || n.Tags || e.Tags || [];
              i = o.clone(o.isArray(i) ? i : [i]);
              var a = o.json2xml({ Tagging: { TagSet: { Tag: i } } }),
                r = e.Headers;
              (r["Content-Type"] = "application/xml"),
                (r["Content-MD5"] = o.binaryBase64(o.md5(a))),
                m.call(
                  this,
                  {
                    Action: "name/cos:PutBucketTagging",
                    method: "PUT",
                    Bucket: e.Bucket,
                    Region: e.Region,
                    body: a,
                    action: "tagging",
                    headers: r,
                  },
                  function (e, n) {
                    return e && 204 === e.statusCode
                      ? t(null, { statusCode: e.statusCode })
                      : e
                      ? t(e)
                      : void t(null, {
                          statusCode: n.statusCode,
                          headers: n.headers,
                        });
                  }
                );
            },
            getBucketTagging: function (e, t) {
              m.call(
                this,
                {
                  Action: "name/cos:GetBucketTagging",
                  method: "GET",
                  Bucket: e.Bucket,
                  Region: e.Region,
                  headers: e.Headers,
                  action: "tagging",
                },
                function (e, n) {
                  if (e)
                    if (
                      404 !== e.statusCode ||
                      !e.error ||
                      ("Not Found" !== e.error &&
                        "NoSuchTagSet" !== e.error.Code)
                    )
                      t(e);
                    else {
                      var i = { Tags: [], statusCode: e.statusCode };
                      e.headers && (i.headers = e.headers), t(null, i);
                    }
                  else {
                    var a = [];
                    try {
                      a = n.Tagging.TagSet.Tag || [];
                    } catch (e) {}
                    (a = o.clone(o.isArray(a) ? a : [a])),
                      t(null, {
                        Tags: a,
                        statusCode: n.statusCode,
                        headers: n.headers,
                      });
                  }
                }
              );
            },
            deleteBucketTagging: function (e, t) {
              m.call(
                this,
                {
                  Action: "name/cos:DeleteBucketTagging",
                  method: "DELETE",
                  Bucket: e.Bucket,
                  Region: e.Region,
                  headers: e.Headers,
                  action: "tagging",
                },
                function (e, n) {
                  return e && 204 === e.statusCode
                    ? t(null, { statusCode: e.statusCode })
                    : e
                    ? t(e)
                    : void t(null, {
                        statusCode: n.statusCode,
                        headers: n.headers,
                      });
                }
              );
            },
            putBucketLifecycle: function (e, t) {
              var n = (e.LifecycleConfiguration || {}).Rules || e.Rules || [];
              n = o.clone(n);
              var i = o.json2xml({ LifecycleConfiguration: { Rule: n } }),
                a = e.Headers;
              (a["Content-Type"] = "application/xml"),
                (a["Content-MD5"] = o.binaryBase64(o.md5(i))),
                m.call(
                  this,
                  {
                    Action: "name/cos:PutBucketLifecycle",
                    method: "PUT",
                    Bucket: e.Bucket,
                    Region: e.Region,
                    body: i,
                    action: "lifecycle",
                    headers: a,
                  },
                  function (e, n) {
                    return e && 204 === e.statusCode
                      ? t(null, { statusCode: e.statusCode })
                      : e
                      ? t(e)
                      : void t(null, {
                          statusCode: n.statusCode,
                          headers: n.headers,
                        });
                  }
                );
            },
            getBucketLifecycle: function (e, t) {
              m.call(
                this,
                {
                  Action: "name/cos:GetBucketLifecycle",
                  method: "GET",
                  Bucket: e.Bucket,
                  Region: e.Region,
                  headers: e.Headers,
                  action: "lifecycle",
                },
                function (e, n) {
                  if (e)
                    if (
                      404 === e.statusCode &&
                      e.error &&
                      "NoSuchLifecycleConfiguration" === e.error.Code
                    ) {
                      var i = { Rules: [], statusCode: e.statusCode };
                      e.headers && (i.headers = e.headers), t(null, i);
                    } else t(e);
                  else {
                    var a = [];
                    try {
                      a = n.LifecycleConfiguration.Rule || [];
                    } catch (e) {}
                    (a = o.clone(o.isArray(a) ? a : [a])),
                      t(null, {
                        Rules: a,
                        statusCode: n.statusCode,
                        headers: n.headers,
                      });
                  }
                }
              );
            },
            deleteBucketLifecycle: function (e, t) {
              m.call(
                this,
                {
                  Action: "name/cos:DeleteBucketLifecycle",
                  method: "DELETE",
                  Bucket: e.Bucket,
                  Region: e.Region,
                  headers: e.Headers,
                  action: "lifecycle",
                },
                function (e, n) {
                  return e && 204 === e.statusCode
                    ? t(null, { statusCode: e.statusCode })
                    : e
                    ? t(e)
                    : void t(null, {
                        statusCode: n.statusCode,
                        headers: n.headers,
                      });
                }
              );
            },
            putBucketVersioning: function (e, t) {
              if (e.VersioningConfiguration) {
                var n = e.VersioningConfiguration || {},
                  i = o.json2xml({ VersioningConfiguration: n }),
                  a = e.Headers;
                (a["Content-Type"] = "application/xml"),
                  (a["Content-MD5"] = o.binaryBase64(o.md5(i))),
                  m.call(
                    this,
                    {
                      Action: "name/cos:PutBucketVersioning",
                      method: "PUT",
                      Bucket: e.Bucket,
                      Region: e.Region,
                      body: i,
                      action: "versioning",
                      headers: a,
                    },
                    function (e, n) {
                      return e && 204 === e.statusCode
                        ? t(null, { statusCode: e.statusCode })
                        : e
                        ? t(e)
                        : void t(null, {
                            statusCode: n.statusCode,
                            headers: n.headers,
                          });
                    }
                  );
              } else t({ error: "missing param VersioningConfiguration" });
            },
            getBucketVersioning: function (e, t) {
              m.call(
                this,
                {
                  Action: "name/cos:GetBucketVersioning",
                  method: "GET",
                  Bucket: e.Bucket,
                  Region: e.Region,
                  headers: e.Headers,
                  action: "versioning",
                },
                function (e, n) {
                  e ||
                    (!n.VersioningConfiguration &&
                      (n.VersioningConfiguration = {})),
                    t(e, n);
                }
              );
            },
            putBucketReplication: function (e, t) {
              var n = o.clone(e.ReplicationConfiguration),
                i = o.json2xml({ ReplicationConfiguration: n });
              i = (i = i.replace(/<(\/?)Rules>/gi, "<$1Rule>")).replace(
                /<(\/?)Tags>/gi,
                "<$1Tag>"
              );
              var a = e.Headers;
              (a["Content-Type"] = "application/xml"),
                (a["Content-MD5"] = o.binaryBase64(o.md5(i))),
                m.call(
                  this,
                  {
                    Action: "name/cos:PutBucketReplication",
                    method: "PUT",
                    Bucket: e.Bucket,
                    Region: e.Region,
                    body: i,
                    action: "replication",
                    headers: a,
                  },
                  function (e, n) {
                    return e && 204 === e.statusCode
                      ? t(null, { statusCode: e.statusCode })
                      : e
                      ? t(e)
                      : void t(null, {
                          statusCode: n.statusCode,
                          headers: n.headers,
                        });
                  }
                );
            },
            getBucketReplication: function (e, t) {
              m.call(
                this,
                {
                  Action: "name/cos:GetBucketReplication",
                  method: "GET",
                  Bucket: e.Bucket,
                  Region: e.Region,
                  headers: e.Headers,
                  action: "replication",
                },
                function (e, n) {
                  if (e)
                    if (
                      404 !== e.statusCode ||
                      !e.error ||
                      ("Not Found" !== e.error &&
                        "ReplicationConfigurationnotFoundError" !==
                          e.error.Code)
                    )
                      t(e);
                    else {
                      var i = {
                        ReplicationConfiguration: { Rules: [] },
                        statusCode: e.statusCode,
                      };
                      e.headers && (i.headers = e.headers), t(null, i);
                    }
                  else
                    e ||
                      (!n.ReplicationConfiguration &&
                        (n.ReplicationConfiguration = {})),
                      n.ReplicationConfiguration.Rule &&
                        ((n.ReplicationConfiguration.Rules =
                          n.ReplicationConfiguration.Rule),
                        delete n.ReplicationConfiguration.Rule),
                      t(e, n);
                }
              );
            },
            deleteBucketReplication: function (e, t) {
              m.call(
                this,
                {
                  Action: "name/cos:DeleteBucketReplication",
                  method: "DELETE",
                  Bucket: e.Bucket,
                  Region: e.Region,
                  headers: e.Headers,
                  action: "replication",
                },
                function (e, n) {
                  return e && 204 === e.statusCode
                    ? t(null, { statusCode: e.statusCode })
                    : e
                    ? t(e)
                    : void t(null, {
                        statusCode: n.statusCode,
                        headers: n.headers,
                      });
                }
              );
            },
            putBucketWebsite: function (e, t) {
              if (e.WebsiteConfiguration) {
                var n = o.clone(e.WebsiteConfiguration || {}),
                  i = n.RoutingRules || n.RoutingRule || [];
                (i = o.isArray(i) ? i : [i]),
                  delete n.RoutingRule,
                  delete n.RoutingRules,
                  i.length && (n.RoutingRules = { RoutingRule: i });
                var a = o.json2xml({ WebsiteConfiguration: n }),
                  r = e.Headers;
                (r["Content-Type"] = "application/xml"),
                  (r["Content-MD5"] = o.binaryBase64(o.md5(a))),
                  m.call(
                    this,
                    {
                      Action: "name/cos:PutBucketWebsite",
                      method: "PUT",
                      Bucket: e.Bucket,
                      Region: e.Region,
                      body: a,
                      action: "website",
                      headers: r,
                    },
                    function (e, n) {
                      return e && 204 === e.statusCode
                        ? t(null, { statusCode: e.statusCode })
                        : e
                        ? t(e)
                        : void t(null, {
                            statusCode: n.statusCode,
                            headers: n.headers,
                          });
                    }
                  );
              } else t({ error: "missing param WebsiteConfiguration" });
            },
            getBucketWebsite: function (e, t) {
              m.call(
                this,
                {
                  Action: "name/cos:GetBucketWebsite",
                  method: "GET",
                  Bucket: e.Bucket,
                  Region: e.Region,
                  Key: e.Key,
                  headers: e.Headers,
                  action: "website",
                },
                function (e, n) {
                  if (e)
                    if (
                      404 === e.statusCode &&
                      "NoSuchWebsiteConfiguration" === e.error.Code
                    ) {
                      var i = {
                        WebsiteConfiguration: {},
                        statusCode: e.statusCode,
                      };
                      e.headers && (i.headers = e.headers), t(null, i);
                    } else t(e);
                  else {
                    var a = n.WebsiteConfiguration || {};
                    if (a.RoutingRules) {
                      var r = o.clone(a.RoutingRules.RoutingRule || []);
                      (r = o.makeArray(r)), (a.RoutingRules = r);
                    }
                    t(null, {
                      WebsiteConfiguration: a,
                      statusCode: n.statusCode,
                      headers: n.headers,
                    });
                  }
                }
              );
            },
            deleteBucketWebsite: function (e, t) {
              m.call(
                this,
                {
                  Action: "name/cos:DeleteBucketWebsite",
                  method: "DELETE",
                  Bucket: e.Bucket,
                  Region: e.Region,
                  headers: e.Headers,
                  action: "website",
                },
                function (e, n) {
                  return e && 204 === e.statusCode
                    ? t(null, { statusCode: e.statusCode })
                    : e
                    ? t(e)
                    : void t(null, {
                        statusCode: n.statusCode,
                        headers: n.headers,
                      });
                }
              );
            },
            putBucketReferer: function (e, t) {
              if (e.RefererConfiguration) {
                var n = o.clone(e.RefererConfiguration || {}),
                  i = n.DomainList || {},
                  a = i.Domains || i.Domain || [];
                (a = o.isArray(a) ? a : [a]).length &&
                  (n.DomainList = { Domain: a });
                var r = o.json2xml({ RefererConfiguration: n }),
                  s = e.Headers;
                (s["Content-Type"] = "application/xml"),
                  (s["Content-MD5"] = o.binaryBase64(o.md5(r))),
                  m.call(
                    this,
                    {
                      Action: "name/cos:PutBucketReferer",
                      method: "PUT",
                      Bucket: e.Bucket,
                      Region: e.Region,
                      body: r,
                      action: "referer",
                      headers: s,
                    },
                    function (e, n) {
                      return e && 204 === e.statusCode
                        ? t(null, { statusCode: e.statusCode })
                        : e
                        ? t(e)
                        : void t(null, {
                            statusCode: n.statusCode,
                            headers: n.headers,
                          });
                    }
                  );
              } else t({ error: "missing param RefererConfiguration" });
            },
            getBucketReferer: function (e, t) {
              m.call(
                this,
                {
                  Action: "name/cos:GetBucketReferer",
                  method: "GET",
                  Bucket: e.Bucket,
                  Region: e.Region,
                  Key: e.Key,
                  headers: e.Headers,
                  action: "referer",
                },
                function (e, n) {
                  if (e)
                    if (
                      404 === e.statusCode &&
                      "NoSuchRefererConfiguration" === e.error.Code
                    ) {
                      var i = {
                        WebsiteConfiguration: {},
                        statusCode: e.statusCode,
                      };
                      e.headers && (i.headers = e.headers), t(null, i);
                    } else t(e);
                  else {
                    var a = n.RefererConfiguration || {};
                    if (a.DomainList) {
                      var r = o.makeArray(a.DomainList.Domain || []);
                      a.DomainList = { Domains: r };
                    }
                    t(null, {
                      RefererConfiguration: a,
                      statusCode: n.statusCode,
                      headers: n.headers,
                    });
                  }
                }
              );
            },
            putBucketDomain: function (e, t) {
              var n =
                (e.DomainConfiguration || {}).DomainRule || e.DomainRule || [];
              n = o.clone(n);
              var i = o.json2xml({ DomainConfiguration: { DomainRule: n } }),
                a = e.Headers;
              (a["Content-Type"] = "application/xml"),
                (a["Content-MD5"] = o.binaryBase64(o.md5(i))),
                m.call(
                  this,
                  {
                    Action: "name/cos:PutBucketDomain",
                    method: "PUT",
                    Bucket: e.Bucket,
                    Region: e.Region,
                    body: i,
                    action: "domain",
                    headers: a,
                  },
                  function (e, n) {
                    return e && 204 === e.statusCode
                      ? t(null, { statusCode: e.statusCode })
                      : e
                      ? t(e)
                      : void t(null, {
                          statusCode: n.statusCode,
                          headers: n.headers,
                        });
                  }
                );
            },
            getBucketDomain: function (e, t) {
              m.call(
                this,
                {
                  Action: "name/cos:GetBucketDomain",
                  method: "GET",
                  Bucket: e.Bucket,
                  Region: e.Region,
                  headers: e.Headers,
                  action: "domain",
                },
                function (e, n) {
                  if (e) return t(e);
                  var i = [];
                  try {
                    i = n.DomainConfiguration.DomainRule || [];
                  } catch (e) {}
                  (i = o.clone(o.isArray(i) ? i : [i])),
                    t(null, {
                      DomainRule: i,
                      statusCode: n.statusCode,
                      headers: n.headers,
                    });
                }
              );
            },
            deleteBucketDomain: function (e, t) {
              m.call(
                this,
                {
                  Action: "name/cos:DeleteBucketDomain",
                  method: "DELETE",
                  Bucket: e.Bucket,
                  Region: e.Region,
                  headers: e.Headers,
                  action: "domain",
                },
                function (e, n) {
                  return e && 204 === e.statusCode
                    ? t(null, { statusCode: e.statusCode })
                    : e
                    ? t(e)
                    : void t(null, {
                        statusCode: n.statusCode,
                        headers: n.headers,
                      });
                }
              );
            },
            putBucketOrigin: function (e, t) {
              var n =
                (e.OriginConfiguration || {}).OriginRule || e.OriginRule || [];
              n = o.clone(n);
              var i = o.json2xml({ OriginConfiguration: { OriginRule: n } }),
                a = e.Headers;
              (a["Content-Type"] = "application/xml"),
                (a["Content-MD5"] = o.binaryBase64(o.md5(i))),
                m.call(
                  this,
                  {
                    Action: "name/cos:PutBucketOrigin",
                    method: "PUT",
                    Bucket: e.Bucket,
                    Region: e.Region,
                    body: i,
                    action: "origin",
                    headers: a,
                  },
                  function (e, n) {
                    return e && 204 === e.statusCode
                      ? t(null, { statusCode: e.statusCode })
                      : e
                      ? t(e)
                      : void t(null, {
                          statusCode: n.statusCode,
                          headers: n.headers,
                        });
                  }
                );
            },
            getBucketOrigin: function (e, t) {
              m.call(
                this,
                {
                  Action: "name/cos:GetBucketOrigin",
                  method: "GET",
                  Bucket: e.Bucket,
                  Region: e.Region,
                  headers: e.Headers,
                  action: "origin",
                },
                function (e, n) {
                  if (e) return t(e);
                  var i = [];
                  try {
                    i = n.OriginConfiguration.OriginRule || [];
                  } catch (e) {}
                  (i = o.clone(o.isArray(i) ? i : [i])),
                    t(null, {
                      OriginRule: i,
                      statusCode: n.statusCode,
                      headers: n.headers,
                    });
                }
              );
            },
            deleteBucketOrigin: function (e, t) {
              m.call(
                this,
                {
                  Action: "name/cos:DeleteBucketOrigin",
                  method: "DELETE",
                  Bucket: e.Bucket,
                  Region: e.Region,
                  headers: e.Headers,
                  action: "origin",
                },
                function (e, n) {
                  return e && 204 === e.statusCode
                    ? t(null, { statusCode: e.statusCode })
                    : e
                    ? t(e)
                    : void t(null, {
                        statusCode: n.statusCode,
                        headers: n.headers,
                      });
                }
              );
            },
            putBucketLogging: function (e, t) {
              var n = o.json2xml({
                  BucketLoggingStatus: e.BucketLoggingStatus || "",
                }),
                i = e.Headers;
              (i["Content-Type"] = "application/xml"),
                (i["Content-MD5"] = o.binaryBase64(o.md5(n))),
                m.call(
                  this,
                  {
                    Action: "name/cos:PutBucketLogging",
                    method: "PUT",
                    Bucket: e.Bucket,
                    Region: e.Region,
                    body: n,
                    action: "logging",
                    headers: i,
                  },
                  function (e, n) {
                    return e && 204 === e.statusCode
                      ? t(null, { statusCode: e.statusCode })
                      : e
                      ? t(e)
                      : void t(null, {
                          statusCode: n.statusCode,
                          headers: n.headers,
                        });
                  }
                );
            },
            getBucketLogging: function (e, t) {
              m.call(
                this,
                {
                  Action: "name/cos:GetBucketLogging",
                  method: "GET",
                  Bucket: e.Bucket,
                  Region: e.Region,
                  headers: e.Headers,
                  action: "logging",
                },
                function (e, n) {
                  if (e) return t(e);
                  delete n.BucketLoggingStatus._xmlns,
                    t(null, {
                      BucketLoggingStatus: n.BucketLoggingStatus,
                      statusCode: n.statusCode,
                      headers: n.headers,
                    });
                }
              );
            },
            putBucketInventory: function (e, t) {
              var n = o.clone(e.InventoryConfiguration);
              if (n.OptionalFields) {
                var i = n.OptionalFields || [];
                n.OptionalFields = { Field: i };
              }
              if (
                n.Destination &&
                n.Destination.COSBucketDestination &&
                n.Destination.COSBucketDestination.Encryption
              ) {
                var a = n.Destination.COSBucketDestination.Encryption;
                Object.keys(a).indexOf("SSECOS") > -1 &&
                  ((a["SSE-COS"] = a.SSECOS), delete a.SSECOS);
              }
              var r = o.json2xml({ InventoryConfiguration: n }),
                s = e.Headers;
              (s["Content-Type"] = "application/xml"),
                (s["Content-MD5"] = o.binaryBase64(o.md5(r))),
                m.call(
                  this,
                  {
                    Action: "name/cos:PutBucketInventory",
                    method: "PUT",
                    Bucket: e.Bucket,
                    Region: e.Region,
                    body: r,
                    action: "inventory",
                    qs: { id: e.Id },
                    headers: s,
                  },
                  function (e, n) {
                    return e && 204 === e.statusCode
                      ? t(null, { statusCode: e.statusCode })
                      : e
                      ? t(e)
                      : void t(null, {
                          statusCode: n.statusCode,
                          headers: n.headers,
                        });
                  }
                );
            },
            getBucketInventory: function (e, t) {
              m.call(
                this,
                {
                  Action: "name/cos:GetBucketInventory",
                  method: "GET",
                  Bucket: e.Bucket,
                  Region: e.Region,
                  headers: e.Headers,
                  action: "inventory",
                  qs: { id: e.Id },
                },
                function (e, n) {
                  if (e) return t(e);
                  var i = n.InventoryConfiguration;
                  if (i && i.OptionalFields && i.OptionalFields.Field) {
                    var a = i.OptionalFields.Field;
                    o.isArray(a) || (a = [a]), (i.OptionalFields = a);
                  }
                  if (
                    i.Destination &&
                    i.Destination.COSBucketDestination &&
                    i.Destination.COSBucketDestination.Encryption
                  ) {
                    var r = i.Destination.COSBucketDestination.Encryption;
                    Object.keys(r).indexOf("SSE-COS") > -1 &&
                      ((r.SSECOS = r["SSE-COS"]), delete r["SSE-COS"]);
                  }
                  t(null, {
                    InventoryConfiguration: i,
                    statusCode: n.statusCode,
                    headers: n.headers,
                  });
                }
              );
            },
            listBucketInventory: function (e, t) {
              m.call(
                this,
                {
                  Action: "name/cos:ListBucketInventory",
                  method: "GET",
                  Bucket: e.Bucket,
                  Region: e.Region,
                  headers: e.Headers,
                  action: "inventory",
                  qs: { "continuation-token": e.ContinuationToken },
                },
                function (e, n) {
                  if (e) return t(e);
                  var i = n.ListInventoryConfigurationResult,
                    a = i.InventoryConfiguration || [];
                  (a = o.isArray(a) ? a : [a]),
                    delete i.InventoryConfiguration,
                    o.each(a, function (e) {
                      if (e && e.OptionalFields && e.OptionalFields.Field) {
                        var t = e.OptionalFields.Field;
                        o.isArray(t) || (t = [t]), (e.OptionalFields = t);
                      }
                      if (
                        e.Destination &&
                        e.Destination.COSBucketDestination &&
                        e.Destination.COSBucketDestination.Encryption
                      ) {
                        var n = e.Destination.COSBucketDestination.Encryption;
                        Object.keys(n).indexOf("SSE-COS") > -1 &&
                          ((n.SSECOS = n["SSE-COS"]), delete n["SSE-COS"]);
                      }
                    }),
                    (i.InventoryConfigurations = a),
                    o.extend(i, {
                      statusCode: n.statusCode,
                      headers: n.headers,
                    }),
                    t(null, i);
                }
              );
            },
            deleteBucketInventory: function (e, t) {
              m.call(
                this,
                {
                  Action: "name/cos:DeleteBucketInventory",
                  method: "DELETE",
                  Bucket: e.Bucket,
                  Region: e.Region,
                  headers: e.Headers,
                  action: "inventory",
                  qs: { id: e.Id },
                },
                function (e, n) {
                  return e && 204 === e.statusCode
                    ? t(null, { statusCode: e.statusCode })
                    : e
                    ? t(e)
                    : void t(null, {
                        statusCode: n.statusCode,
                        headers: n.headers,
                      });
                }
              );
            },
            putBucketAccelerate: function (e, t) {
              if (e.AccelerateConfiguration) {
                var n = {
                    AccelerateConfiguration: e.AccelerateConfiguration || {},
                  },
                  i = o.json2xml(n),
                  a = { "Content-Type": "application/xml" };
                (a["Content-MD5"] = o.binaryBase64(o.md5(i))),
                  m.call(
                    this,
                    {
                      Interface: "putBucketAccelerate",
                      Action: "name/cos:PutBucketAccelerate",
                      method: "PUT",
                      Bucket: e.Bucket,
                      Region: e.Region,
                      body: i,
                      action: "accelerate",
                      headers: a,
                    },
                    function (e, n) {
                      if (e) return t(e);
                      t(null, { statusCode: n.statusCode, headers: n.headers });
                    }
                  );
              } else t({ error: "missing param AccelerateConfiguration" });
            },
            getBucketAccelerate: function (e, t) {
              m.call(
                this,
                {
                  Interface: "getBucketAccelerate",
                  Action: "name/cos:GetBucketAccelerate",
                  method: "GET",
                  Bucket: e.Bucket,
                  Region: e.Region,
                  action: "accelerate",
                },
                function (e, n) {
                  e ||
                    (!n.AccelerateConfiguration &&
                      (n.AccelerateConfiguration = {})),
                    t(e, n);
                }
              );
            },
            getObject: function (e, t) {
              var n = e.Query || {},
                i = e.QueryString || "";
              (n["response-content-type"] = e.ResponseContentType),
                (n["response-content-language"] = e.ResponseContentLanguage),
                (n["response-expires"] = e.ResponseExpires),
                (n["response-cache-control"] = e.ResponseCacheControl),
                (n["response-content-disposition"] =
                  e.ResponseContentDisposition),
                (n["response-content-encoding"] = e.ResponseContentEncoding),
                m.call(
                  this,
                  {
                    Action: "name/cos:GetObject",
                    method: "GET",
                    Bucket: e.Bucket,
                    Region: e.Region,
                    Key: e.Key,
                    VersionId: e.VersionId,
                    headers: e.Headers,
                    qs: n,
                    qsStr: i,
                    rawBody: !0,
                  },
                  function (n, i) {
                    if (n) {
                      var a = n.statusCode;
                      return e.Headers["If-Modified-Since"] && a && 304 === a
                        ? t(null, { NotModified: !0 })
                        : t(n);
                    }
                    t(null, {
                      Body: i.body,
                      ETag: o.attr(i.headers, "etag", ""),
                      statusCode: i.statusCode,
                      headers: i.headers,
                    });
                  }
                );
            },
            headObject: function (e, t) {
              m.call(
                this,
                {
                  Action: "name/cos:HeadObject",
                  method: "HEAD",
                  Bucket: e.Bucket,
                  Region: e.Region,
                  Key: e.Key,
                  VersionId: e.VersionId,
                  headers: e.Headers,
                },
                function (n, i) {
                  if (n) {
                    var a = n.statusCode;
                    return e.Headers["If-Modified-Since"] && a && 304 === a
                      ? t(null, { NotModified: !0, statusCode: a })
                      : t(n);
                  }
                  (i.ETag = o.attr(i.headers, "etag", "")), t(null, i);
                }
              );
            },
            listObjectVersions: function (e, t) {
              var n = {};
              (n.prefix = e.Prefix || ""),
                (n.delimiter = e.Delimiter),
                (n["key-marker"] = e.KeyMarker),
                (n["version-id-marker"] = e.VersionIdMarker),
                (n["max-keys"] = e.MaxKeys),
                (n["encoding-type"] = e.EncodingType),
                m.call(
                  this,
                  {
                    Action: "name/cos:GetBucketObjectVersions",
                    ResourceKey: n.prefix,
                    method: "GET",
                    Bucket: e.Bucket,
                    Region: e.Region,
                    headers: e.Headers,
                    qs: n,
                    action: "versions",
                  },
                  function (e, n) {
                    if (e) return t(e);
                    var i = n.ListVersionsResult || {},
                      a = i.DeleteMarker || [];
                    a = o.isArray(a) ? a : [a];
                    var r = i.Version || [];
                    r = o.isArray(r) ? r : [r];
                    var s = o.clone(i);
                    delete s.DeleteMarker,
                      delete s.Version,
                      o.extend(s, {
                        DeleteMarkers: a,
                        Versions: r,
                        statusCode: n.statusCode,
                        headers: n.headers,
                      }),
                      t(null, s);
                  }
                );
            },
            putObject: function (e, t) {
              var n = this,
                i = e.ContentLength,
                a = o.throttleOnProgress.call(n, i, e.onProgress),
                s = e.Headers;
              s["Cache-Control"] ||
                s["cache-control"] ||
                (s["Cache-Control"] = ""),
                s["Content-Type"] ||
                  s["content-type"] ||
                  (s["Content-Type"] =
                    r.getType(e.Key) || "application/octet-stream"),
                o.getBodyMd5(
                  n.options.UploadCheckContentMd5,
                  e.Body,
                  function (r) {
                    r && (s["Content-MD5"] = o.binaryBase64(r)),
                      void 0 !== e.ContentLength &&
                        (s["Content-Length"] = e.ContentLength),
                      a(null, !0),
                      m.call(
                        n,
                        {
                          Action: "name/cos:PutObject",
                          TaskId: e.TaskId,
                          method: "PUT",
                          Bucket: e.Bucket,
                          Region: e.Region,
                          Key: e.Key,
                          headers: e.Headers,
                          qs: e.Query,
                          body: e.Body,
                          onProgress: a,
                        },
                        function (r, s) {
                          if (r) return a(null, !0), t(r);
                          a({ loaded: i, total: i }, !0);
                          var c = l({
                            ForcePathStyle: n.options.ForcePathStyle,
                            protocol: n.options.Protocol,
                            domain: n.options.Domain,
                            bucket: e.Bucket,
                            region: n.options.UseAccelerate
                              ? "accelerate"
                              : e.Region,
                            object: e.Key,
                          });
                          (c = c.substr(c.indexOf("://") + 3)),
                            (s.Location = c),
                            (s.ETag = o.attr(s.headers, "etag", "")),
                            t(null, s);
                        }
                      );
                  }
                );
            },
            postObject: function (e, t) {
              var n = this,
                i = {},
                a = e.FilePath;
              if (a) {
                for (var r in ((i["Cache-Control"] = e.CacheControl),
                (i["Content-Disposition"] = e.ContentDisposition),
                (i["Content-Encoding"] = e.ContentEncoding),
                (i["Content-MD5"] = e.ContentMD5),
                (i["Content-Length"] = e.ContentLength),
                (i["Content-Type"] = e.ContentType),
                (i.Expect = e.Expect),
                (i.Expires = e.Expires),
                (i["x-cos-acl"] = e.ACL),
                (i["x-cos-grant-read"] = e.GrantRead),
                (i["x-cos-grant-write"] = e.GrantWrite),
                (i["x-cos-grant-full-control"] = e.GrantFullControl),
                (i["x-cos-storage-class"] = e.StorageClass),
                (i["x-cos-mime-limit"] = e.MimeLimit),
                (i["x-cos-traffic-limit"] = e.TrafficLimit),
                delete i["Content-Length"],
                delete i["content-length"],
                e))
                  r.indexOf("x-cos-meta-") > -1 && (i[r] = e[r]);
                var s = o.throttleOnProgress.call(
                  n,
                  i["Content-Length"],
                  e.onProgress
                );
                m.call(
                  this,
                  {
                    Action: "name/cos:PostObject",
                    method: "POST",
                    Bucket: e.Bucket,
                    Region: e.Region,
                    Key: e.Key,
                    headers: i,
                    qs: e.Query,
                    filePath: a,
                    onProgress: s,
                  },
                  function (i, o) {
                    if ((s(null, !0), i)) return t(i);
                    if (o && o.headers) {
                      var r = o.headers,
                        c = r.etag || r.Etag || r.ETag || "",
                        p = a.substr(a.lastIndexOf("/") + 1),
                        u = l({
                          ForcePathStyle: n.options.ForcePathStyle,
                          protocol: n.options.Protocol,
                          domain: n.options.Domain,
                          bucket: e.Bucket,
                          region: e.Region,
                          object: e.Key.replace(/\$\{filename\}/g, p),
                          isLocation: !0,
                        });
                      return t(null, {
                        Location: u,
                        statusCode: o.statusCode,
                        headers: r,
                        ETag: c,
                      });
                    }
                    t(null, o);
                  }
                );
              } else t({ error: "missing param FilePath" });
            },
            deleteObject: function (e, t) {
              m.call(
                this,
                {
                  Action: "name/cos:DeleteObject",
                  method: "DELETE",
                  Bucket: e.Bucket,
                  Region: e.Region,
                  Key: e.Key,
                  headers: e.Headers,
                  VersionId: e.VersionId,
                },
                function (e, n) {
                  if (e) {
                    var i = e.statusCode;
                    return i && 204 === i
                      ? t(null, { statusCode: i })
                      : i && 404 === i
                      ? t(null, { BucketNotFound: !0, statusCode: i })
                      : t(e);
                  }
                  t(null, { statusCode: n.statusCode, headers: n.headers });
                }
              );
            },
            getObjectAcl: function (e, t) {
              m.call(
                this,
                {
                  Action: "name/cos:GetObjectACL",
                  method: "GET",
                  Bucket: e.Bucket,
                  Region: e.Region,
                  Key: e.Key,
                  headers: e.Headers,
                  action: "acl",
                },
                function (e, n) {
                  if (e) return t(e);
                  var i = n.AccessControlPolicy || {},
                    a = i.Owner || {},
                    r =
                      (i.AccessControlList && i.AccessControlList.Grant) || [];
                  r = o.isArray(r) ? r : [r];
                  var c = s(i);
                  n.headers &&
                    n.headers["x-cos-acl"] &&
                    (c.ACL = n.headers["x-cos-acl"]),
                    (c = o.extend(c, {
                      Owner: a,
                      Grants: r,
                      statusCode: n.statusCode,
                      headers: n.headers,
                    })),
                    t(null, c);
                }
              );
            },
            putObjectAcl: function (e, t) {
              var n = e.Headers,
                i = "";
              if (e.AccessControlPolicy) {
                var a = o.clone(e.AccessControlPolicy || {}),
                  r = a.Grants || a.Grant;
                (r = o.isArray(r) ? r : [r]),
                  delete a.Grant,
                  delete a.Grants,
                  (a.AccessControlList = { Grant: r }),
                  (i = o.json2xml({ AccessControlPolicy: a })),
                  (n["Content-Type"] = "application/xml"),
                  (n["Content-MD5"] = o.binaryBase64(o.md5(i)));
              }
              o.each(n, function (e, t) {
                0 === t.indexOf("x-cos-grant-") && (n[t] = c(n[t]));
              }),
                m.call(
                  this,
                  {
                    Action: "name/cos:PutObjectACL",
                    method: "PUT",
                    Bucket: e.Bucket,
                    Region: e.Region,
                    Key: e.Key,
                    action: "acl",
                    headers: n,
                    body: i,
                  },
                  function (e, n) {
                    if (e) return t(e);
                    t(null, { statusCode: n.statusCode, headers: n.headers });
                  }
                );
            },
            optionsObject: function (e, t) {
              var n = e.Headers;
              (n.Origin = e.Origin),
                (n["Access-Control-Request-Method"] =
                  e.AccessControlRequestMethod),
                (n["Access-Control-Request-Headers"] =
                  e.AccessControlRequestHeaders),
                m.call(
                  this,
                  {
                    Action: "name/cos:OptionsObject",
                    method: "OPTIONS",
                    Bucket: e.Bucket,
                    Region: e.Region,
                    Key: e.Key,
                    headers: n,
                  },
                  function (e, n) {
                    if (e)
                      return e.statusCode && 403 === e.statusCode
                        ? t(null, {
                            OptionsForbidden: !0,
                            statusCode: e.statusCode,
                          })
                        : t(e);
                    var i = n.headers || {};
                    t(null, {
                      AccessControlAllowOrigin:
                        i["access-control-allow-origin"],
                      AccessControlAllowMethods:
                        i["access-control-allow-methods"],
                      AccessControlAllowHeaders:
                        i["access-control-allow-headers"],
                      AccessControlExposeHeaders:
                        i["access-control-expose-headers"],
                      AccessControlMaxAge: i["access-control-max-age"],
                      statusCode: n.statusCode,
                      headers: n.headers,
                    });
                  }
                );
            },
            putObjectCopy: function (e, t) {
              var n = e.Headers;
              !n["Cache-Control"] &&
                n["cache-control"] &&
                (n["Cache-Control"] = "");
              var i = (e.CopySource || "").match(
                /^([^.]+-\d+)\.cos(v6)?\.([^.]+)\.[^/]+\/(.+)$/
              );
              if (i) {
                var a = i[1],
                  r = i[3],
                  s = decodeURIComponent(i[4]);
                m.call(
                  this,
                  {
                    Scope: [
                      {
                        action: "name/cos:GetObject",
                        bucket: a,
                        region: r,
                        prefix: s,
                      },
                      {
                        action: "name/cos:PutObject",
                        bucket: e.Bucket,
                        region: e.Region,
                        prefix: e.Key,
                      },
                    ],
                    method: "PUT",
                    Bucket: e.Bucket,
                    Region: e.Region,
                    Key: e.Key,
                    VersionId: e.VersionId,
                    headers: e.Headers,
                  },
                  function (e, n) {
                    if (e) return t(e);
                    var i = o.clone(n.CopyObjectResult || {});
                    o.extend(i, {
                      statusCode: n.statusCode,
                      headers: n.headers,
                    }),
                      t(null, i);
                  }
                );
              } else t({ error: "CopySource format error" });
            },
            deleteMultipleObject: function (e, t) {
              var n = e.Objects || [],
                i = e.Quiet;
              n = o.isArray(n) ? n : [n];
              var a = o.json2xml({ Delete: { Object: n, Quiet: i || !1 } }),
                r = e.Headers;
              (r["Content-Type"] = "application/xml"),
                (r["Content-MD5"] = o.binaryBase64(o.md5(a)));
              var s = o.map(n, function (t) {
                return {
                  action: "name/cos:DeleteObject",
                  bucket: e.Bucket,
                  region: e.Region,
                  prefix: t.Key,
                };
              });
              m.call(
                this,
                {
                  Scope: s,
                  method: "POST",
                  Bucket: e.Bucket,
                  Region: e.Region,
                  body: a,
                  action: "delete",
                  headers: r,
                },
                function (e, n) {
                  if (e) return t(e);
                  var i = n.DeleteResult || {},
                    a = i.Deleted || [],
                    r = i.Error || [];
                  (a = o.isArray(a) ? a : [a]), (r = o.isArray(r) ? r : [r]);
                  var s = o.clone(i);
                  o.extend(s, {
                    Error: r,
                    Deleted: a,
                    statusCode: n.statusCode,
                    headers: n.headers,
                  }),
                    t(null, s);
                }
              );
            },
            restoreObject: function (e, t) {
              var n = e.Headers;
              if (e.RestoreRequest) {
                var i = e.RestoreRequest || {},
                  a = o.json2xml({ RestoreRequest: i });
                (n["Content-Type"] = "application/xml"),
                  (n["Content-MD5"] = o.binaryBase64(o.md5(a))),
                  m.call(
                    this,
                    {
                      Action: "name/cos:RestoreObject",
                      method: "POST",
                      Bucket: e.Bucket,
                      Region: e.Region,
                      Key: e.Key,
                      VersionId: e.VersionId,
                      body: a,
                      action: "restore",
                      headers: n,
                    },
                    function (e, n) {
                      t(e, n);
                    }
                  );
              } else t({ error: "missing param RestoreRequest" });
            },
            putObjectTagging: function (e, t) {
              var n = e.Tagging || {},
                i = n.TagSet || n.Tags || e.Tags || [];
              i = o.clone(o.isArray(i) ? i : [i]);
              var a = o.json2xml({ Tagging: { TagSet: { Tag: i } } }),
                r = e.Headers;
              (r["Content-Type"] = "application/xml"),
                (r["Content-MD5"] = o.binaryBase64(o.md5(a))),
                m.call(
                  this,
                  {
                    Interface: "putObjectTagging",
                    Action: "name/cos:PutObjectTagging",
                    method: "PUT",
                    Bucket: e.Bucket,
                    Key: e.Key,
                    Region: e.Region,
                    body: a,
                    action: "tagging",
                    headers: r,
                    VersionId: e.VersionId,
                  },
                  function (e, n) {
                    return e && 204 === e.statusCode
                      ? t(null, { statusCode: e.statusCode })
                      : e
                      ? t(e)
                      : void t(null, {
                          statusCode: n.statusCode,
                          headers: n.headers,
                        });
                  }
                );
            },
            getObjectTagging: function (e, t) {
              m.call(
                this,
                {
                  Interface: "getObjectTagging",
                  Action: "name/cos:GetObjectTagging",
                  method: "GET",
                  Key: e.Key,
                  Bucket: e.Bucket,
                  Region: e.Region,
                  headers: e.Headers,
                  action: "tagging",
                  VersionId: e.VersionId,
                },
                function (e, n) {
                  if (e)
                    if (
                      404 !== e.statusCode ||
                      !e.error ||
                      ("Not Found" !== e.error &&
                        "NoSuchTagSet" !== e.error.Code)
                    )
                      t(e);
                    else {
                      var i = { Tags: [], statusCode: e.statusCode };
                      e.headers && (i.headers = e.headers), t(null, i);
                    }
                  else {
                    var a = [];
                    try {
                      a = n.Tagging.TagSet.Tag || [];
                    } catch (e) {}
                    (a = o.clone(o.isArray(a) ? a : [a])),
                      t(null, {
                        Tags: a,
                        statusCode: n.statusCode,
                        headers: n.headers,
                      });
                  }
                }
              );
            },
            deleteObjectTagging: function (e, t) {
              m.call(
                this,
                {
                  Interface: "deleteObjectTagging",
                  Action: "name/cos:DeleteObjectTagging",
                  method: "DELETE",
                  Bucket: e.Bucket,
                  Region: e.Region,
                  Key: e.Key,
                  headers: e.Headers,
                  action: "tagging",
                  VersionId: e.VersionId,
                },
                function (e, n) {
                  return e && 204 === e.statusCode
                    ? t(null, { statusCode: e.statusCode })
                    : e
                    ? t(e)
                    : void t(null, {
                        statusCode: n.statusCode,
                        headers: n.headers,
                      });
                }
              );
            },
            appendObject: function (e, t) {
              m.call(
                this,
                {
                  Action: "name/cos:AppendObject",
                  method: "POST",
                  Bucket: e.Bucket,
                  Region: e.Region,
                  action: "append",
                  Key: e.Key,
                  body: e.Body,
                  qs: { position: e.Position },
                  headers: e.Headers,
                },
                function (e, n) {
                  if (e) return t(e);
                  t(null, n);
                }
              );
            },
            uploadPartCopy: function (e, t) {
              var n = (e.CopySource || "").match(
                /^([^.]+-\d+)\.cos(v6)?\.([^.]+)\.[^/]+\/(.+)$/
              );
              if (n) {
                var i = n[1],
                  a = n[3],
                  r = decodeURIComponent(n[4]);
                m.call(
                  this,
                  {
                    Scope: [
                      {
                        action: "name/cos:GetObject",
                        bucket: i,
                        region: a,
                        prefix: r,
                      },
                      {
                        action: "name/cos:PutObject",
                        bucket: e.Bucket,
                        region: e.Region,
                        prefix: e.Key,
                      },
                    ],
                    method: "PUT",
                    Bucket: e.Bucket,
                    Region: e.Region,
                    Key: e.Key,
                    VersionId: e.VersionId,
                    qs: { partNumber: e.PartNumber, uploadId: e.UploadId },
                    headers: e.Headers,
                  },
                  function (e, n) {
                    if (e) return t(e);
                    var i = o.clone(n.CopyPartResult || {});
                    o.extend(i, {
                      statusCode: n.statusCode,
                      headers: n.headers,
                    }),
                      t(null, i);
                  }
                );
              } else t({ error: "CopySource format error" });
            },
            multipartInit: function (e, t) {
              var n = e.Headers;
              n["Cache-Control"] ||
                n["cache-control"] ||
                (n["Cache-Control"] = ""),
                n["Content-Type"] ||
                  n["content-type"] ||
                  (n["Content-Type"] =
                    r.getType(e.Key) || "application/octet-stream"),
                m.call(
                  this,
                  {
                    Action: "name/cos:InitiateMultipartUpload",
                    method: "POST",
                    Bucket: e.Bucket,
                    Region: e.Region,
                    Key: e.Key,
                    action: "uploads",
                    headers: e.Headers,
                    qs: e.Query,
                  },
                  function (e, n) {
                    return e
                      ? t(e)
                      : (n = o.clone(n || {})) &&
                        n.InitiateMultipartUploadResult
                      ? t(
                          null,
                          o.extend(n.InitiateMultipartUploadResult, {
                            statusCode: n.statusCode,
                            headers: n.headers,
                          })
                        )
                      : void t(null, n);
                  }
                );
            },
            multipartUpload: function (e, t) {
              var n = this;
              o.getFileSize("multipartUpload", e, function () {
                o.getBodyMd5(
                  n.options.UploadCheckContentMd5,
                  e.Body,
                  function (i) {
                    i && (e.Headers["Content-MD5"] = o.binaryBase64(i)),
                      m.call(
                        n,
                        {
                          Action: "name/cos:UploadPart",
                          TaskId: e.TaskId,
                          method: "PUT",
                          Bucket: e.Bucket,
                          Region: e.Region,
                          Key: e.Key,
                          qs: {
                            partNumber: e.PartNumber,
                            uploadId: e.UploadId,
                          },
                          headers: e.Headers,
                          onProgress: e.onProgress,
                          body: e.Body || null,
                        },
                        function (e, n) {
                          if (e) return t(e);
                          t(null, {
                            ETag: o.attr(n.headers, "etag", {}),
                            statusCode: n.statusCode,
                            headers: n.headers,
                          });
                        }
                      );
                  }
                );
              });
            },
            multipartComplete: function (e, t) {
              for (
                var n = this, i = e.UploadId, a = e.Parts, r = 0, s = a.length;
                r < s;
                r++
              )
                0 !== a[r].ETag.indexOf('"') &&
                  (a[r].ETag = '"' + a[r].ETag + '"');
              var c = o.json2xml({ CompleteMultipartUpload: { Part: a } }),
                p = e.Headers;
              (p["Content-Type"] = "application/xml"),
                (p["Content-MD5"] = o.binaryBase64(o.md5(c))),
                m.call(
                  this,
                  {
                    Action: "name/cos:CompleteMultipartUpload",
                    method: "POST",
                    Bucket: e.Bucket,
                    Region: e.Region,
                    Key: e.Key,
                    qs: { uploadId: i },
                    body: c,
                    headers: p,
                  },
                  function (i, a) {
                    if (i) return t(i);
                    var r = l({
                        ForcePathStyle: n.options.ForcePathStyle,
                        protocol: n.options.Protocol,
                        domain: n.options.Domain,
                        bucket: e.Bucket,
                        region: e.Region,
                        object: e.Key,
                        isLocation: !0,
                      }),
                      s = a.CompleteMultipartUploadResult || {},
                      c = o.extend(s, {
                        Location: r,
                        statusCode: a.statusCode,
                        headers: a.headers,
                      });
                    t(null, c);
                  }
                );
            },
            multipartList: function (e, t) {
              var n = {};
              (n.delimiter = e.Delimiter),
                (n["encoding-type"] = e.EncodingType),
                (n.prefix = e.Prefix || ""),
                (n["max-uploads"] = e.MaxUploads),
                (n["key-marker"] = e.KeyMarker),
                (n["upload-id-marker"] = e.UploadIdMarker),
                (n = o.clearKey(n)),
                m.call(
                  this,
                  {
                    Action: "name/cos:ListMultipartUploads",
                    ResourceKey: n.prefix,
                    method: "GET",
                    Bucket: e.Bucket,
                    Region: e.Region,
                    headers: e.Headers,
                    qs: n,
                    action: "uploads",
                  },
                  function (e, n) {
                    if (e) return t(e);
                    if (n && n.ListMultipartUploadsResult) {
                      var i = n.ListMultipartUploadsResult.Upload || [],
                        a = n.ListMultipartUploadsResult.CommonPrefixes || [];
                      (a = o.isArray(a) ? a : [a]),
                        (i = o.isArray(i) ? i : [i]),
                        (n.ListMultipartUploadsResult.Upload = i),
                        (n.ListMultipartUploadsResult.CommonPrefixes = a);
                    }
                    var r = o.clone(n.ListMultipartUploadsResult || {});
                    o.extend(r, {
                      statusCode: n.statusCode,
                      headers: n.headers,
                    }),
                      t(null, r);
                  }
                );
            },
            multipartListPart: function (e, t) {
              var n = {};
              (n.uploadId = e.UploadId),
                (n["encoding-type"] = e.EncodingType),
                (n["max-parts"] = e.MaxParts),
                (n["part-number-marker"] = e.PartNumberMarker),
                m.call(
                  this,
                  {
                    Action: "name/cos:ListParts",
                    method: "GET",
                    Bucket: e.Bucket,
                    Region: e.Region,
                    Key: e.Key,
                    headers: e.Headers,
                    qs: n,
                  },
                  function (e, n) {
                    if (e) return t(e);
                    var i = n.ListPartsResult || {},
                      a = i.Part || [];
                    (a = o.isArray(a) ? a : [a]), (i.Part = a);
                    var r = o.clone(i);
                    o.extend(r, {
                      statusCode: n.statusCode,
                      headers: n.headers,
                    }),
                      t(null, r);
                  }
                );
            },
            multipartAbort: function (e, t) {
              var n = {};
              (n.uploadId = e.UploadId),
                m.call(
                  this,
                  {
                    Action: "name/cos:AbortMultipartUpload",
                    method: "DELETE",
                    Bucket: e.Bucket,
                    Region: e.Region,
                    Key: e.Key,
                    headers: e.Headers,
                    qs: n,
                  },
                  function (e, n) {
                    if (e) return t(e);
                    t(null, { statusCode: n.statusCode, headers: n.headers });
                  }
                );
            },
            request: function (e, t) {
              m.call(
                this,
                {
                  method: e.Method,
                  Bucket: e.Bucket,
                  Region: e.Region,
                  Key: e.Key,
                  action: e.Action,
                  headers: e.Headers,
                  qs: e.Query,
                  body: e.Body,
                  Url: e.Url,
                  rawBody: e.RawBody,
                },
                function (e, n) {
                  if (e) return t(e);
                  n && n.body && ((n.Body = n.body), delete n.body), t(e, n);
                }
              );
            },
            getObjectUrl: function (e, t) {
              var n = l({
                  ForcePathStyle: this.options.ForcePathStyle,
                  protocol: e.Protocol || this.options.Protocol,
                  domain: e.Domain || this.options.Domain,
                  bucket: e.Bucket,
                  region: e.Region,
                  object: e.Key,
                }),
                i = "";
              e.Query && (i += o.obj2str(e.Query)),
                e.QueryString && (i += (i ? "&" : "") + e.QueryString);
              var a = n;
              if (void 0 !== e.Sign && !e.Sign)
                return i && (a += "?" + i), t(null, { Url: a }), a;
              var r = p.call(this, {
                  Bucket: e.Bucket,
                  Region: e.Region,
                  Url: n,
                }),
                s = u.call(
                  this,
                  {
                    Action:
                      "PUT" === (e.Method || "").toUpperCase()
                        ? "name/cos:PutObject"
                        : "name/cos:GetObject",
                    Bucket: e.Bucket || "",
                    Region: e.Region || "",
                    Method: e.Method || "get",
                    Key: e.Key,
                    Expires: e.Expires,
                    Headers: e.Headers,
                    Query: e.Query,
                    SignHost: r,
                  },
                  function (e, a) {
                    if (t)
                      if (e) t(e);
                      else {
                        var o = n;
                        (o +=
                          "?" +
                          (a.Authorization.indexOf("q-signature") > -1
                            ? (function (e) {
                                var t = e.match(/q-url-param-list.*?(?=&)/g)[0],
                                  n =
                                    "q-url-param-list=" +
                                    encodeURIComponent(
                                      t.replace(/q-url-param-list=/, "")
                                    ).toLowerCase(),
                                  i = new RegExp(t, "g");
                                return e.replace(i, n);
                              })(a.Authorization)
                            : "sign=" + encodeURIComponent(a.Authorization))),
                          a.XCosSecurityToken &&
                            (o +=
                              "&x-cos-security-token=" + a.XCosSecurityToken),
                          a.ClientIP && (o += "&clientIP=" + a.ClientIP),
                          a.ClientUA && (o += "&clientUA=" + a.ClientUA),
                          a.Token && (o += "&token=" + a.Token),
                          i && (o += "&" + i),
                          setTimeout(function () {
                            t(null, { Url: o });
                          });
                      }
                  }
                );
              return (
                s
                  ? ((a +=
                      "?" +
                      s.Authorization +
                      (s.XCosSecurityToken
                        ? "&x-cos-security-token=" + s.XCosSecurityToken
                        : "")),
                    i && (a += "&" + i))
                  : i && (a += "?" + i),
                a
              );
            },
            getAuth: function (e) {
              return o.getAuth({
                SecretId: e.SecretId || this.options.SecretId || "",
                SecretKey: e.SecretKey || this.options.SecretKey || "",
                Bucket: e.Bucket,
                Region: e.Region,
                Method: e.Method,
                Key: e.Key,
                Query: e.Query,
                Headers: e.Headers,
                Expires: e.Expires,
                SystemClockOffset: this.options.SystemClockOffset,
              });
            },
          };
          e.exports.init = function (e, t) {
            t.transferToTaskMethod(h, "postObject"),
              t.transferToTaskMethod(h, "putObject"),
              o.each(h, function (t, n) {
                e.prototype[n] = o.apiWrapper(n, t);
              });
          };
        },
        function (e, t, n) {
          "use strict";
          function i(e) {
            return encodeURIComponent(e)
              .replace(/!/g, "%21")
              .replace(/'/g, "%27")
              .replace(/\(/g, "%28")
              .replace(/\)/g, "%29")
              .replace(/\*/g, "%2A");
          }
          var a = function (e, t) {
            var n,
              a,
              o,
              r = [],
              s = (function (e, t) {
                var n = [];
                for (var a in e)
                  e.hasOwnProperty(a) && n.push(t ? i(a).toLowerCase() : a);
                return n.sort(function (e, t) {
                  return (e = e.toLowerCase()) === (t = t.toLowerCase())
                    ? 0
                    : e > t
                    ? 1
                    : -1;
                });
              })(e);
            for (n = 0; n < s.length; n++)
              (o = void 0 === e[(a = s[n])] || null === e[a] ? "" : "" + e[a]),
                (a = t ? i(a).toLowerCase() : i(a)),
                (o = i(o) || ""),
                r.push(a + "=" + o);
            return r.join("&");
          };
          e.exports = function (e, t) {
            var n,
              i = e.filePath,
              o = e.headers || {},
              r = e.url || e.Url,
              s = e.method,
              c = e.onProgress,
              l = function (e, n) {
                var i = n.header,
                  a = {};
                if (i)
                  for (var o in i)
                    i.hasOwnProperty(o) && (a[o.toLowerCase()] = i[o]);
                t(e, { statusCode: n.statusCode, headers: a }, n.data);
              };
            if (i) {
              var p,
                u = r.match(/^(https?:\/\/[^/]+\/)([^/]*\/?)(.*)$/);
              e.pathStyle
                ? ((p = decodeURIComponent(u[3] || "")), (r = u[1] + u[2]))
                : ((p = decodeURIComponent(u[2] + u[3] || "")), (r = u[1]));
              var d = {
                  key: p,
                  success_action_status: 200,
                  Signature: o.Authorization,
                },
                m = [
                  "Cache-Control",
                  "Content-Type",
                  "Content-Disposition",
                  "Content-Encoding",
                  "Expires",
                  "x-cos-storage-class",
                  "x-cos-security-token",
                  "x-ci-security-token",
                ];
              for (var f in e.headers)
                e.headers.hasOwnProperty(f) &&
                  (f.indexOf("x-cos-meta-") > -1 || m.indexOf(f) > -1) &&
                  (d[f] = e.headers[f]);
              o["x-cos-acl"] && (d.acl = o["x-cos-acl"]),
                !d["Content-Type"] && (d["Content-Type"] = ""),
                (n = wx.uploadFile({
                  url: r,
                  method: s,
                  name: "file",
                  header: o,
                  filePath: i,
                  formData: d,
                  timeout: e.timeout,
                  success: function (e) {
                    l(null, e);
                  },
                  fail: function (e) {
                    l(e.errMsg, e);
                  },
                })).onProgressUpdate(function (e) {
                  c &&
                    c({
                      loaded: e.totalBytesSent,
                      total: e.totalBytesExpectedToSend,
                      progress: e.progress / 100,
                    });
                });
            } else {
              var h = (e.qs && a(e.qs)) || "";
              h && (r += (r.indexOf("?") > -1 ? "&" : "?") + h),
                o["Content-Length"] && delete o["Content-Length"],
                (n = wx.request({
                  url: r,
                  method: s,
                  header: o,
                  dataType: "text",
                  data: e.body,
                  timeout: e.timeout,
                  success: function (e) {
                    l(null, e);
                  },
                  fail: function (e) {
                    l(e.errMsg, e);
                  },
                }));
            }
            return n;
          };
        },
        function (e, t, n) {
          "use strict";
          var i = n(21);
          e.exports = new i(n(22), n(23));
        },
        function (e, t, n) {
          "use strict";
          function i() {
            (this._types = Object.create(null)),
              (this._extensions = Object.create(null));
            for (var e = 0; e < arguments.length; e++)
              this.define(arguments[e]);
            (this.define = this.define.bind(this)),
              (this.getType = this.getType.bind(this)),
              (this.getExtension = this.getExtension.bind(this));
          }
          (i.prototype.define = function (e, t) {
            for (var n in e) {
              var i = e[n].map(function (e) {
                return e.toLowerCase();
              });
              n = n.toLowerCase();
              for (var a = 0; a < i.length; a++) {
                var o = i[a];
                if ("*" !== o[0]) {
                  if (!t && o in this._types)
                    throw new Error(
                      'Attempt to change mapping for "' +
                        o +
                        '" extension from "' +
                        this._types[o] +
                        '" to "' +
                        n +
                        '". Pass `force=true` to allow this, otherwise remove "' +
                        o +
                        '" from the list of extensions for "' +
                        n +
                        '".'
                    );
                  this._types[o] = n;
                }
              }
              if (t || !this._extensions[n]) {
                var r = i[0];
                this._extensions[n] = "*" !== r[0] ? r : r.substr(1);
              }
            }
          }),
            (i.prototype.getType = function (e) {
              var t = (e = String(e)).replace(/^.*[/\\]/, "").toLowerCase(),
                n = t.replace(/^.*\./, "").toLowerCase(),
                i = t.length < e.length;
              return (
                ((n.length < t.length - 1 || !i) && this._types[n]) || null
              );
            }),
            (i.prototype.getExtension = function (e) {
              return (
                ((e = /^\s*([^;\s]*)/.test(e) && RegExp.$1) &&
                  this._extensions[e.toLowerCase()]) ||
                null
              );
            }),
            (e.exports = i);
        },
        function (e, t, n) {
          "use strict";
          e.exports = {
            "application/andrew-inset": ["ez"],
            "application/applixware": ["aw"],
            "application/atom+xml": ["atom"],
            "application/atomcat+xml": ["atomcat"],
            "application/atomdeleted+xml": ["atomdeleted"],
            "application/atomsvc+xml": ["atomsvc"],
            "application/atsc-dwd+xml": ["dwd"],
            "application/atsc-held+xml": ["held"],
            "application/atsc-rsat+xml": ["rsat"],
            "application/bdoc": ["bdoc"],
            "application/calendar+xml": ["xcs"],
            "application/ccxml+xml": ["ccxml"],
            "application/cdfx+xml": ["cdfx"],
            "application/cdmi-capability": ["cdmia"],
            "application/cdmi-container": ["cdmic"],
            "application/cdmi-domain": ["cdmid"],
            "application/cdmi-object": ["cdmio"],
            "application/cdmi-queue": ["cdmiq"],
            "application/cu-seeme": ["cu"],
            "application/dash+xml": ["mpd"],
            "application/davmount+xml": ["davmount"],
            "application/docbook+xml": ["dbk"],
            "application/dssc+der": ["dssc"],
            "application/dssc+xml": ["xdssc"],
            "application/ecmascript": ["es", "ecma"],
            "application/emma+xml": ["emma"],
            "application/emotionml+xml": ["emotionml"],
            "application/epub+zip": ["epub"],
            "application/exi": ["exi"],
            "application/express": ["exp"],
            "application/fdt+xml": ["fdt"],
            "application/font-tdpfr": ["pfr"],
            "application/geo+json": ["geojson"],
            "application/gml+xml": ["gml"],
            "application/gpx+xml": ["gpx"],
            "application/gxf": ["gxf"],
            "application/gzip": ["gz"],
            "application/hjson": ["hjson"],
            "application/hyperstudio": ["stk"],
            "application/inkml+xml": ["ink", "inkml"],
            "application/ipfix": ["ipfix"],
            "application/its+xml": ["its"],
            "application/java-archive": ["jar", "war", "ear"],
            "application/java-serialized-object": ["ser"],
            "application/java-vm": ["class"],
            "application/javascript": ["js", "mjs"],
            "application/json": ["json", "map"],
            "application/json5": ["json5"],
            "application/jsonml+json": ["jsonml"],
            "application/ld+json": ["jsonld"],
            "application/lgr+xml": ["lgr"],
            "application/lost+xml": ["lostxml"],
            "application/mac-binhex40": ["hqx"],
            "application/mac-compactpro": ["cpt"],
            "application/mads+xml": ["mads"],
            "application/manifest+json": ["webmanifest"],
            "application/marc": ["mrc"],
            "application/marcxml+xml": ["mrcx"],
            "application/mathematica": ["ma", "nb", "mb"],
            "application/mathml+xml": ["mathml"],
            "application/mbox": ["mbox"],
            "application/mediaservercontrol+xml": ["mscml"],
            "application/metalink+xml": ["metalink"],
            "application/metalink4+xml": ["meta4"],
            "application/mets+xml": ["mets"],
            "application/mmt-aei+xml": ["maei"],
            "application/mmt-usd+xml": ["musd"],
            "application/mods+xml": ["mods"],
            "application/mp21": ["m21", "mp21"],
            "application/mp4": ["mp4s", "m4p"],
            "application/msword": ["doc", "dot"],
            "application/mxf": ["mxf"],
            "application/n-quads": ["nq"],
            "application/n-triples": ["nt"],
            "application/node": ["cjs"],
            "application/octet-stream": [
              "bin",
              "dms",
              "lrf",
              "mar",
              "so",
              "dist",
              "distz",
              "pkg",
              "bpk",
              "dump",
              "elc",
              "deploy",
              "exe",
              "dll",
              "deb",
              "dmg",
              "iso",
              "img",
              "msi",
              "msp",
              "msm",
              "buffer",
            ],
            "application/oda": ["oda"],
            "application/oebps-package+xml": ["opf"],
            "application/ogg": ["ogx"],
            "application/omdoc+xml": ["omdoc"],
            "application/onenote": ["onetoc", "onetoc2", "onetmp", "onepkg"],
            "application/oxps": ["oxps"],
            "application/p2p-overlay+xml": ["relo"],
            "application/patch-ops-error+xml": ["xer"],
            "application/pdf": ["pdf"],
            "application/pgp-encrypted": ["pgp"],
            "application/pgp-signature": ["asc", "sig"],
            "application/pics-rules": ["prf"],
            "application/pkcs10": ["p10"],
            "application/pkcs7-mime": ["p7m", "p7c"],
            "application/pkcs7-signature": ["p7s"],
            "application/pkcs8": ["p8"],
            "application/pkix-attr-cert": ["ac"],
            "application/pkix-cert": ["cer"],
            "application/pkix-crl": ["crl"],
            "application/pkix-pkipath": ["pkipath"],
            "application/pkixcmp": ["pki"],
            "application/pls+xml": ["pls"],
            "application/postscript": ["ai", "eps", "ps"],
            "application/provenance+xml": ["provx"],
            "application/pskc+xml": ["pskcxml"],
            "application/raml+yaml": ["raml"],
            "application/rdf+xml": ["rdf", "owl"],
            "application/reginfo+xml": ["rif"],
            "application/relax-ng-compact-syntax": ["rnc"],
            "application/resource-lists+xml": ["rl"],
            "application/resource-lists-diff+xml": ["rld"],
            "application/rls-services+xml": ["rs"],
            "application/route-apd+xml": ["rapd"],
            "application/route-s-tsid+xml": ["sls"],
            "application/route-usd+xml": ["rusd"],
            "application/rpki-ghostbusters": ["gbr"],
            "application/rpki-manifest": ["mft"],
            "application/rpki-roa": ["roa"],
            "application/rsd+xml": ["rsd"],
            "application/rss+xml": ["rss"],
            "application/rtf": ["rtf"],
            "application/sbml+xml": ["sbml"],
            "application/scvp-cv-request": ["scq"],
            "application/scvp-cv-response": ["scs"],
            "application/scvp-vp-request": ["spq"],
            "application/scvp-vp-response": ["spp"],
            "application/sdp": ["sdp"],
            "application/senml+xml": ["senmlx"],
            "application/sensml+xml": ["sensmlx"],
            "application/set-payment-initiation": ["setpay"],
            "application/set-registration-initiation": ["setreg"],
            "application/shf+xml": ["shf"],
            "application/sieve": ["siv", "sieve"],
            "application/smil+xml": ["smi", "smil"],
            "application/sparql-query": ["rq"],
            "application/sparql-results+xml": ["srx"],
            "application/srgs": ["gram"],
            "application/srgs+xml": ["grxml"],
            "application/sru+xml": ["sru"],
            "application/ssdl+xml": ["ssdl"],
            "application/ssml+xml": ["ssml"],
            "application/swid+xml": ["swidtag"],
            "application/tei+xml": ["tei", "teicorpus"],
            "application/thraud+xml": ["tfi"],
            "application/timestamped-data": ["tsd"],
            "application/toml": ["toml"],
            "application/trig": ["trig"],
            "application/ttml+xml": ["ttml"],
            "application/ubjson": ["ubj"],
            "application/urc-ressheet+xml": ["rsheet"],
            "application/urc-targetdesc+xml": ["td"],
            "application/voicexml+xml": ["vxml"],
            "application/wasm": ["wasm"],
            "application/widget": ["wgt"],
            "application/winhlp": ["hlp"],
            "application/wsdl+xml": ["wsdl"],
            "application/wspolicy+xml": ["wspolicy"],
            "application/xaml+xml": ["xaml"],
            "application/xcap-att+xml": ["xav"],
            "application/xcap-caps+xml": ["xca"],
            "application/xcap-diff+xml": ["xdf"],
            "application/xcap-el+xml": ["xel"],
            "application/xcap-ns+xml": ["xns"],
            "application/xenc+xml": ["xenc"],
            "application/xhtml+xml": ["xhtml", "xht"],
            "application/xliff+xml": ["xlf"],
            "application/xml": ["xml", "xsl", "xsd", "rng"],
            "application/xml-dtd": ["dtd"],
            "application/xop+xml": ["xop"],
            "application/xproc+xml": ["xpl"],
            "application/xslt+xml": ["*xsl", "xslt"],
            "application/xspf+xml": ["xspf"],
            "application/xv+xml": ["mxml", "xhvml", "xvml", "xvm"],
            "application/yang": ["yang"],
            "application/yin+xml": ["yin"],
            "application/zip": ["zip"],
            "audio/3gpp": ["*3gpp"],
            "audio/adpcm": ["adp"],
            "audio/amr": ["amr"],
            "audio/basic": ["au", "snd"],
            "audio/midi": ["mid", "midi", "kar", "rmi"],
            "audio/mobile-xmf": ["mxmf"],
            "audio/mp3": ["*mp3"],
            "audio/mp4": ["m4a", "mp4a"],
            "audio/mpeg": ["mpga", "mp2", "mp2a", "mp3", "m2a", "m3a"],
            "audio/ogg": ["oga", "ogg", "spx", "opus"],
            "audio/s3m": ["s3m"],
            "audio/silk": ["sil"],
            "audio/wav": ["wav"],
            "audio/wave": ["*wav"],
            "audio/webm": ["weba"],
            "audio/xm": ["xm"],
            "font/collection": ["ttc"],
            "font/otf": ["otf"],
            "font/ttf": ["ttf"],
            "font/woff": ["woff"],
            "font/woff2": ["woff2"],
            "image/aces": ["exr"],
            "image/apng": ["apng"],
            "image/avif": ["avif"],
            "image/bmp": ["bmp"],
            "image/cgm": ["cgm"],
            "image/dicom-rle": ["drle"],
            "image/emf": ["emf"],
            "image/fits": ["fits"],
            "image/g3fax": ["g3"],
            "image/gif": ["gif"],
            "image/heic": ["heic"],
            "image/heic-sequence": ["heics"],
            "image/heif": ["heif"],
            "image/heif-sequence": ["heifs"],
            "image/hej2k": ["hej2"],
            "image/hsj2": ["hsj2"],
            "image/ief": ["ief"],
            "image/jls": ["jls"],
            "image/jp2": ["jp2", "jpg2"],
            "image/jpeg": ["jpeg", "jpg", "jpe"],
            "image/jph": ["jph"],
            "image/jphc": ["jhc"],
            "image/jpm": ["jpm"],
            "image/jpx": ["jpx", "jpf"],
            "image/jxr": ["jxr"],
            "image/jxra": ["jxra"],
            "image/jxrs": ["jxrs"],
            "image/jxs": ["jxs"],
            "image/jxsc": ["jxsc"],
            "image/jxsi": ["jxsi"],
            "image/jxss": ["jxss"],
            "image/ktx": ["ktx"],
            "image/ktx2": ["ktx2"],
            "image/png": ["png"],
            "image/sgi": ["sgi"],
            "image/svg+xml": ["svg", "svgz"],
            "image/t38": ["t38"],
            "image/tiff": ["tif", "tiff"],
            "image/tiff-fx": ["tfx"],
            "image/webp": ["webp"],
            "image/wmf": ["wmf"],
            "message/disposition-notification": ["disposition-notification"],
            "message/global": ["u8msg"],
            "message/global-delivery-status": ["u8dsn"],
            "message/global-disposition-notification": ["u8mdn"],
            "message/global-headers": ["u8hdr"],
            "message/rfc822": ["eml", "mime"],
            "model/3mf": ["3mf"],
            "model/gltf+json": ["gltf"],
            "model/gltf-binary": ["glb"],
            "model/iges": ["igs", "iges"],
            "model/mesh": ["msh", "mesh", "silo"],
            "model/mtl": ["mtl"],
            "model/obj": ["obj"],
            "model/step+xml": ["stpx"],
            "model/step+zip": ["stpz"],
            "model/step-xml+zip": ["stpxz"],
            "model/stl": ["stl"],
            "model/vrml": ["wrl", "vrml"],
            "model/x3d+binary": ["*x3db", "x3dbz"],
            "model/x3d+fastinfoset": ["x3db"],
            "model/x3d+vrml": ["*x3dv", "x3dvz"],
            "model/x3d+xml": ["x3d", "x3dz"],
            "model/x3d-vrml": ["x3dv"],
            "text/cache-manifest": ["appcache", "manifest"],
            "text/calendar": ["ics", "ifb"],
            "text/coffeescript": ["coffee", "litcoffee"],
            "text/css": ["css"],
            "text/csv": ["csv"],
            "text/html": ["html", "htm", "shtml"],
            "text/jade": ["jade"],
            "text/jsx": ["jsx"],
            "text/less": ["less"],
            "text/markdown": ["markdown", "md"],
            "text/mathml": ["mml"],
            "text/mdx": ["mdx"],
            "text/n3": ["n3"],
            "text/plain": [
              "txt",
              "text",
              "conf",
              "def",
              "list",
              "log",
              "in",
              "ini",
            ],
            "text/richtext": ["rtx"],
            "text/rtf": ["*rtf"],
            "text/sgml": ["sgml", "sgm"],
            "text/shex": ["shex"],
            "text/slim": ["slim", "slm"],
            "text/spdx": ["spdx"],
            "text/stylus": ["stylus", "styl"],
            "text/tab-separated-values": ["tsv"],
            "text/troff": ["t", "tr", "roff", "man", "me", "ms"],
            "text/turtle": ["ttl"],
            "text/uri-list": ["uri", "uris", "urls"],
            "text/vcard": ["vcard"],
            "text/vtt": ["vtt"],
            "text/xml": ["*xml"],
            "text/yaml": ["yaml", "yml"],
            "video/3gpp": ["3gp", "3gpp"],
            "video/3gpp2": ["3g2"],
            "video/h261": ["h261"],
            "video/h263": ["h263"],
            "video/h264": ["h264"],
            "video/iso.segment": ["m4s"],
            "video/jpeg": ["jpgv"],
            "video/jpm": ["*jpm", "jpgm"],
            "video/mj2": ["mj2", "mjp2"],
            "video/mp2t": ["ts"],
            "video/mp4": ["mp4", "mp4v", "mpg4"],
            "video/mpeg": ["mpeg", "mpg", "mpe", "m1v", "m2v"],
            "video/ogg": ["ogv"],
            "video/quicktime": ["qt", "mov"],
            "video/webm": ["webm"],
          };
        },
        function (e, t, n) {
          "use strict";
          e.exports = {
            "application/prs.cww": ["cww"],
            "application/vnd.1000minds.decision-model+xml": ["1km"],
            "application/vnd.3gpp.pic-bw-large": ["plb"],
            "application/vnd.3gpp.pic-bw-small": ["psb"],
            "application/vnd.3gpp.pic-bw-var": ["pvb"],
            "application/vnd.3gpp2.tcap": ["tcap"],
            "application/vnd.3m.post-it-notes": ["pwn"],
            "application/vnd.accpac.simply.aso": ["aso"],
            "application/vnd.accpac.simply.imp": ["imp"],
            "application/vnd.acucobol": ["acu"],
            "application/vnd.acucorp": ["atc", "acutc"],
            "application/vnd.adobe.air-application-installer-package+zip": [
              "air",
            ],
            "application/vnd.adobe.formscentral.fcdt": ["fcdt"],
            "application/vnd.adobe.fxp": ["fxp", "fxpl"],
            "application/vnd.adobe.xdp+xml": ["xdp"],
            "application/vnd.adobe.xfdf": ["xfdf"],
            "application/vnd.ahead.space": ["ahead"],
            "application/vnd.airzip.filesecure.azf": ["azf"],
            "application/vnd.airzip.filesecure.azs": ["azs"],
            "application/vnd.amazon.ebook": ["azw"],
            "application/vnd.americandynamics.acc": ["acc"],
            "application/vnd.amiga.ami": ["ami"],
            "application/vnd.android.package-archive": ["apk"],
            "application/vnd.anser-web-certificate-issue-initiation": ["cii"],
            "application/vnd.anser-web-funds-transfer-initiation": ["fti"],
            "application/vnd.antix.game-component": ["atx"],
            "application/vnd.apple.installer+xml": ["mpkg"],
            "application/vnd.apple.keynote": ["key"],
            "application/vnd.apple.mpegurl": ["m3u8"],
            "application/vnd.apple.numbers": ["numbers"],
            "application/vnd.apple.pages": ["pages"],
            "application/vnd.apple.pkpass": ["pkpass"],
            "application/vnd.aristanetworks.swi": ["swi"],
            "application/vnd.astraea-software.iota": ["iota"],
            "application/vnd.audiograph": ["aep"],
            "application/vnd.balsamiq.bmml+xml": ["bmml"],
            "application/vnd.blueice.multipass": ["mpm"],
            "application/vnd.bmi": ["bmi"],
            "application/vnd.businessobjects": ["rep"],
            "application/vnd.chemdraw+xml": ["cdxml"],
            "application/vnd.chipnuts.karaoke-mmd": ["mmd"],
            "application/vnd.cinderella": ["cdy"],
            "application/vnd.citationstyles.style+xml": ["csl"],
            "application/vnd.claymore": ["cla"],
            "application/vnd.cloanto.rp9": ["rp9"],
            "application/vnd.clonk.c4group": [
              "c4g",
              "c4d",
              "c4f",
              "c4p",
              "c4u",
            ],
            "application/vnd.cluetrust.cartomobile-config": ["c11amc"],
            "application/vnd.cluetrust.cartomobile-config-pkg": ["c11amz"],
            "application/vnd.commonspace": ["csp"],
            "application/vnd.contact.cmsg": ["cdbcmsg"],
            "application/vnd.cosmocaller": ["cmc"],
            "application/vnd.crick.clicker": ["clkx"],
            "application/vnd.crick.clicker.keyboard": ["clkk"],
            "application/vnd.crick.clicker.palette": ["clkp"],
            "application/vnd.crick.clicker.template": ["clkt"],
            "application/vnd.crick.clicker.wordbank": ["clkw"],
            "application/vnd.criticaltools.wbs+xml": ["wbs"],
            "application/vnd.ctc-posml": ["pml"],
            "application/vnd.cups-ppd": ["ppd"],
            "application/vnd.curl.car": ["car"],
            "application/vnd.curl.pcurl": ["pcurl"],
            "application/vnd.dart": ["dart"],
            "application/vnd.data-vision.rdz": ["rdz"],
            "application/vnd.dbf": ["dbf"],
            "application/vnd.dece.data": ["uvf", "uvvf", "uvd", "uvvd"],
            "application/vnd.dece.ttml+xml": ["uvt", "uvvt"],
            "application/vnd.dece.unspecified": ["uvx", "uvvx"],
            "application/vnd.dece.zip": ["uvz", "uvvz"],
            "application/vnd.denovo.fcselayout-link": ["fe_launch"],
            "application/vnd.dna": ["dna"],
            "application/vnd.dolby.mlp": ["mlp"],
            "application/vnd.dpgraph": ["dpg"],
            "application/vnd.dreamfactory": ["dfac"],
            "application/vnd.ds-keypoint": ["kpxx"],
            "application/vnd.dvb.ait": ["ait"],
            "application/vnd.dvb.service": ["svc"],
            "application/vnd.dynageo": ["geo"],
            "application/vnd.ecowin.chart": ["mag"],
            "application/vnd.enliven": ["nml"],
            "application/vnd.epson.esf": ["esf"],
            "application/vnd.epson.msf": ["msf"],
            "application/vnd.epson.quickanime": ["qam"],
            "application/vnd.epson.salt": ["slt"],
            "application/vnd.epson.ssf": ["ssf"],
            "application/vnd.eszigno3+xml": ["es3", "et3"],
            "application/vnd.ezpix-album": ["ez2"],
            "application/vnd.ezpix-package": ["ez3"],
            "application/vnd.fdf": ["fdf"],
            "application/vnd.fdsn.mseed": ["mseed"],
            "application/vnd.fdsn.seed": ["seed", "dataless"],
            "application/vnd.flographit": ["gph"],
            "application/vnd.fluxtime.clip": ["ftc"],
            "application/vnd.framemaker": ["fm", "frame", "maker", "book"],
            "application/vnd.frogans.fnc": ["fnc"],
            "application/vnd.frogans.ltf": ["ltf"],
            "application/vnd.fsc.weblaunch": ["fsc"],
            "application/vnd.fujitsu.oasys": ["oas"],
            "application/vnd.fujitsu.oasys2": ["oa2"],
            "application/vnd.fujitsu.oasys3": ["oa3"],
            "application/vnd.fujitsu.oasysgp": ["fg5"],
            "application/vnd.fujitsu.oasysprs": ["bh2"],
            "application/vnd.fujixerox.ddd": ["ddd"],
            "application/vnd.fujixerox.docuworks": ["xdw"],
            "application/vnd.fujixerox.docuworks.binder": ["xbd"],
            "application/vnd.fuzzysheet": ["fzs"],
            "application/vnd.genomatix.tuxedo": ["txd"],
            "application/vnd.geogebra.file": ["ggb"],
            "application/vnd.geogebra.tool": ["ggt"],
            "application/vnd.geometry-explorer": ["gex", "gre"],
            "application/vnd.geonext": ["gxt"],
            "application/vnd.geoplan": ["g2w"],
            "application/vnd.geospace": ["g3w"],
            "application/vnd.gmx": ["gmx"],
            "application/vnd.google-apps.document": ["gdoc"],
            "application/vnd.google-apps.presentation": ["gslides"],
            "application/vnd.google-apps.spreadsheet": ["gsheet"],
            "application/vnd.google-earth.kml+xml": ["kml"],
            "application/vnd.google-earth.kmz": ["kmz"],
            "application/vnd.grafeq": ["gqf", "gqs"],
            "application/vnd.groove-account": ["gac"],
            "application/vnd.groove-help": ["ghf"],
            "application/vnd.groove-identity-message": ["gim"],
            "application/vnd.groove-injector": ["grv"],
            "application/vnd.groove-tool-message": ["gtm"],
            "application/vnd.groove-tool-template": ["tpl"],
            "application/vnd.groove-vcard": ["vcg"],
            "application/vnd.hal+xml": ["hal"],
            "application/vnd.handheld-entertainment+xml": ["zmm"],
            "application/vnd.hbci": ["hbci"],
            "application/vnd.hhe.lesson-player": ["les"],
            "application/vnd.hp-hpgl": ["hpgl"],
            "application/vnd.hp-hpid": ["hpid"],
            "application/vnd.hp-hps": ["hps"],
            "application/vnd.hp-jlyt": ["jlt"],
            "application/vnd.hp-pcl": ["pcl"],
            "application/vnd.hp-pclxl": ["pclxl"],
            "application/vnd.hydrostatix.sof-data": ["sfd-hdstx"],
            "application/vnd.ibm.minipay": ["mpy"],
            "application/vnd.ibm.modcap": ["afp", "listafp", "list3820"],
            "application/vnd.ibm.rights-management": ["irm"],
            "application/vnd.ibm.secure-container": ["sc"],
            "application/vnd.iccprofile": ["icc", "icm"],
            "application/vnd.igloader": ["igl"],
            "application/vnd.immervision-ivp": ["ivp"],
            "application/vnd.immervision-ivu": ["ivu"],
            "application/vnd.insors.igm": ["igm"],
            "application/vnd.intercon.formnet": ["xpw", "xpx"],
            "application/vnd.intergeo": ["i2g"],
            "application/vnd.intu.qbo": ["qbo"],
            "application/vnd.intu.qfx": ["qfx"],
            "application/vnd.ipunplugged.rcprofile": ["rcprofile"],
            "application/vnd.irepository.package+xml": ["irp"],
            "application/vnd.is-xpr": ["xpr"],
            "application/vnd.isac.fcs": ["fcs"],
            "application/vnd.jam": ["jam"],
            "application/vnd.jcp.javame.midlet-rms": ["rms"],
            "application/vnd.jisp": ["jisp"],
            "application/vnd.joost.joda-archive": ["joda"],
            "application/vnd.kahootz": ["ktz", "ktr"],
            "application/vnd.kde.karbon": ["karbon"],
            "application/vnd.kde.kchart": ["chrt"],
            "application/vnd.kde.kformula": ["kfo"],
            "application/vnd.kde.kivio": ["flw"],
            "application/vnd.kde.kontour": ["kon"],
            "application/vnd.kde.kpresenter": ["kpr", "kpt"],
            "application/vnd.kde.kspread": ["ksp"],
            "application/vnd.kde.kword": ["kwd", "kwt"],
            "application/vnd.kenameaapp": ["htke"],
            "application/vnd.kidspiration": ["kia"],
            "application/vnd.kinar": ["kne", "knp"],
            "application/vnd.koan": ["skp", "skd", "skt", "skm"],
            "application/vnd.kodak-descriptor": ["sse"],
            "application/vnd.las.las+xml": ["lasxml"],
            "application/vnd.llamagraphics.life-balance.desktop": ["lbd"],
            "application/vnd.llamagraphics.life-balance.exchange+xml": ["lbe"],
            "application/vnd.lotus-1-2-3": ["123"],
            "application/vnd.lotus-approach": ["apr"],
            "application/vnd.lotus-freelance": ["pre"],
            "application/vnd.lotus-notes": ["nsf"],
            "application/vnd.lotus-organizer": ["org"],
            "application/vnd.lotus-screencam": ["scm"],
            "application/vnd.lotus-wordpro": ["lwp"],
            "application/vnd.macports.portpkg": ["portpkg"],
            "application/vnd.mapbox-vector-tile": ["mvt"],
            "application/vnd.mcd": ["mcd"],
            "application/vnd.medcalcdata": ["mc1"],
            "application/vnd.mediastation.cdkey": ["cdkey"],
            "application/vnd.mfer": ["mwf"],
            "application/vnd.mfmp": ["mfm"],
            "application/vnd.micrografx.flo": ["flo"],
            "application/vnd.micrografx.igx": ["igx"],
            "application/vnd.mif": ["mif"],
            "application/vnd.mobius.daf": ["daf"],
            "application/vnd.mobius.dis": ["dis"],
            "application/vnd.mobius.mbk": ["mbk"],
            "application/vnd.mobius.mqy": ["mqy"],
            "application/vnd.mobius.msl": ["msl"],
            "application/vnd.mobius.plc": ["plc"],
            "application/vnd.mobius.txf": ["txf"],
            "application/vnd.mophun.application": ["mpn"],
            "application/vnd.mophun.certificate": ["mpc"],
            "application/vnd.mozilla.xul+xml": ["xul"],
            "application/vnd.ms-artgalry": ["cil"],
            "application/vnd.ms-cab-compressed": ["cab"],
            "application/vnd.ms-excel": [
              "xls",
              "xlm",
              "xla",
              "xlc",
              "xlt",
              "xlw",
            ],
            "application/vnd.ms-excel.addin.macroenabled.12": ["xlam"],
            "application/vnd.ms-excel.sheet.binary.macroenabled.12": ["xlsb"],
            "application/vnd.ms-excel.sheet.macroenabled.12": ["xlsm"],
            "application/vnd.ms-excel.template.macroenabled.12": ["xltm"],
            "application/vnd.ms-fontobject": ["eot"],
            "application/vnd.ms-htmlhelp": ["chm"],
            "application/vnd.ms-ims": ["ims"],
            "application/vnd.ms-lrm": ["lrm"],
            "application/vnd.ms-officetheme": ["thmx"],
            "application/vnd.ms-outlook": ["msg"],
            "application/vnd.ms-pki.seccat": ["cat"],
            "application/vnd.ms-pki.stl": ["*stl"],
            "application/vnd.ms-powerpoint": ["ppt", "pps", "pot"],
            "application/vnd.ms-powerpoint.addin.macroenabled.12": ["ppam"],
            "application/vnd.ms-powerpoint.presentation.macroenabled.12": [
              "pptm",
            ],
            "application/vnd.ms-powerpoint.slide.macroenabled.12": ["sldm"],
            "application/vnd.ms-powerpoint.slideshow.macroenabled.12": ["ppsm"],
            "application/vnd.ms-powerpoint.template.macroenabled.12": ["potm"],
            "application/vnd.ms-project": ["mpp", "mpt"],
            "application/vnd.ms-word.document.macroenabled.12": ["docm"],
            "application/vnd.ms-word.template.macroenabled.12": ["dotm"],
            "application/vnd.ms-works": ["wps", "wks", "wcm", "wdb"],
            "application/vnd.ms-wpl": ["wpl"],
            "application/vnd.ms-xpsdocument": ["xps"],
            "application/vnd.mseq": ["mseq"],
            "application/vnd.musician": ["mus"],
            "application/vnd.muvee.style": ["msty"],
            "application/vnd.mynfc": ["taglet"],
            "application/vnd.neurolanguage.nlu": ["nlu"],
            "application/vnd.nitf": ["ntf", "nitf"],
            "application/vnd.noblenet-directory": ["nnd"],
            "application/vnd.noblenet-sealer": ["nns"],
            "application/vnd.noblenet-web": ["nnw"],
            "application/vnd.nokia.n-gage.ac+xml": ["*ac"],
            "application/vnd.nokia.n-gage.data": ["ngdat"],
            "application/vnd.nokia.n-gage.symbian.install": ["n-gage"],
            "application/vnd.nokia.radio-preset": ["rpst"],
            "application/vnd.nokia.radio-presets": ["rpss"],
            "application/vnd.novadigm.edm": ["edm"],
            "application/vnd.novadigm.edx": ["edx"],
            "application/vnd.novadigm.ext": ["ext"],
            "application/vnd.oasis.opendocument.chart": ["odc"],
            "application/vnd.oasis.opendocument.chart-template": ["otc"],
            "application/vnd.oasis.opendocument.database": ["odb"],
            "application/vnd.oasis.opendocument.formula": ["odf"],
            "application/vnd.oasis.opendocument.formula-template": ["odft"],
            "application/vnd.oasis.opendocument.graphics": ["odg"],
            "application/vnd.oasis.opendocument.graphics-template": ["otg"],
            "application/vnd.oasis.opendocument.image": ["odi"],
            "application/vnd.oasis.opendocument.image-template": ["oti"],
            "application/vnd.oasis.opendocument.presentation": ["odp"],
            "application/vnd.oasis.opendocument.presentation-template": ["otp"],
            "application/vnd.oasis.opendocument.spreadsheet": ["ods"],
            "application/vnd.oasis.opendocument.spreadsheet-template": ["ots"],
            "application/vnd.oasis.opendocument.text": ["odt"],
            "application/vnd.oasis.opendocument.text-master": ["odm"],
            "application/vnd.oasis.opendocument.text-template": ["ott"],
            "application/vnd.oasis.opendocument.text-web": ["oth"],
            "application/vnd.olpc-sugar": ["xo"],
            "application/vnd.oma.dd2+xml": ["dd2"],
            "application/vnd.openblox.game+xml": ["obgx"],
            "application/vnd.openofficeorg.extension": ["oxt"],
            "application/vnd.openstreetmap.data+xml": ["osm"],
            "application/vnd.openxmlformats-officedocument.presentationml.presentation":
              ["pptx"],
            "application/vnd.openxmlformats-officedocument.presentationml.slide":
              ["sldx"],
            "application/vnd.openxmlformats-officedocument.presentationml.slideshow":
              ["ppsx"],
            "application/vnd.openxmlformats-officedocument.presentationml.template":
              ["potx"],
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet":
              ["xlsx"],
            "application/vnd.openxmlformats-officedocument.spreadsheetml.template":
              ["xltx"],
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
              ["docx"],
            "application/vnd.openxmlformats-officedocument.wordprocessingml.template":
              ["dotx"],
            "application/vnd.osgeo.mapguide.package": ["mgp"],
            "application/vnd.osgi.dp": ["dp"],
            "application/vnd.osgi.subsystem": ["esa"],
            "application/vnd.palm": ["pdb", "pqa", "oprc"],
            "application/vnd.pawaafile": ["paw"],
            "application/vnd.pg.format": ["str"],
            "application/vnd.pg.osasli": ["ei6"],
            "application/vnd.picsel": ["efif"],
            "application/vnd.pmi.widget": ["wg"],
            "application/vnd.pocketlearn": ["plf"],
            "application/vnd.powerbuilder6": ["pbd"],
            "application/vnd.previewsystems.box": ["box"],
            "application/vnd.proteus.magazine": ["mgz"],
            "application/vnd.publishare-delta-tree": ["qps"],
            "application/vnd.pvi.ptid1": ["ptid"],
            "application/vnd.quark.quarkxpress": [
              "qxd",
              "qxt",
              "qwd",
              "qwt",
              "qxl",
              "qxb",
            ],
            "application/vnd.rar": ["rar"],
            "application/vnd.realvnc.bed": ["bed"],
            "application/vnd.recordare.musicxml": ["mxl"],
            "application/vnd.recordare.musicxml+xml": ["musicxml"],
            "application/vnd.rig.cryptonote": ["cryptonote"],
            "application/vnd.rim.cod": ["cod"],
            "application/vnd.rn-realmedia": ["rm"],
            "application/vnd.rn-realmedia-vbr": ["rmvb"],
            "application/vnd.route66.link66+xml": ["link66"],
            "application/vnd.sailingtracker.track": ["st"],
            "application/vnd.seemail": ["see"],
            "application/vnd.sema": ["sema"],
            "application/vnd.semd": ["semd"],
            "application/vnd.semf": ["semf"],
            "application/vnd.shana.informed.formdata": ["ifm"],
            "application/vnd.shana.informed.formtemplate": ["itp"],
            "application/vnd.shana.informed.interchange": ["iif"],
            "application/vnd.shana.informed.package": ["ipk"],
            "application/vnd.simtech-mindmapper": ["twd", "twds"],
            "application/vnd.smaf": ["mmf"],
            "application/vnd.smart.teacher": ["teacher"],
            "application/vnd.software602.filler.form+xml": ["fo"],
            "application/vnd.solent.sdkm+xml": ["sdkm", "sdkd"],
            "application/vnd.spotfire.dxp": ["dxp"],
            "application/vnd.spotfire.sfs": ["sfs"],
            "application/vnd.stardivision.calc": ["sdc"],
            "application/vnd.stardivision.draw": ["sda"],
            "application/vnd.stardivision.impress": ["sdd"],
            "application/vnd.stardivision.math": ["smf"],
            "application/vnd.stardivision.writer": ["sdw", "vor"],
            "application/vnd.stardivision.writer-global": ["sgl"],
            "application/vnd.stepmania.package": ["smzip"],
            "application/vnd.stepmania.stepchart": ["sm"],
            "application/vnd.sun.wadl+xml": ["wadl"],
            "application/vnd.sun.xml.calc": ["sxc"],
            "application/vnd.sun.xml.calc.template": ["stc"],
            "application/vnd.sun.xml.draw": ["sxd"],
            "application/vnd.sun.xml.draw.template": ["std"],
            "application/vnd.sun.xml.impress": ["sxi"],
            "application/vnd.sun.xml.impress.template": ["sti"],
            "application/vnd.sun.xml.math": ["sxm"],
            "application/vnd.sun.xml.writer": ["sxw"],
            "application/vnd.sun.xml.writer.global": ["sxg"],
            "application/vnd.sun.xml.writer.template": ["stw"],
            "application/vnd.sus-calendar": ["sus", "susp"],
            "application/vnd.svd": ["svd"],
            "application/vnd.symbian.install": ["sis", "sisx"],
            "application/vnd.syncml+xml": ["xsm"],
            "application/vnd.syncml.dm+wbxml": ["bdm"],
            "application/vnd.syncml.dm+xml": ["xdm"],
            "application/vnd.syncml.dmddf+xml": ["ddf"],
            "application/vnd.tao.intent-module-archive": ["tao"],
            "application/vnd.tcpdump.pcap": ["pcap", "cap", "dmp"],
            "application/vnd.tmobile-livetv": ["tmo"],
            "application/vnd.trid.tpt": ["tpt"],
            "application/vnd.triscape.mxs": ["mxs"],
            "application/vnd.trueapp": ["tra"],
            "application/vnd.ufdl": ["ufd", "ufdl"],
            "application/vnd.uiq.theme": ["utz"],
            "application/vnd.umajin": ["umj"],
            "application/vnd.unity": ["unityweb"],
            "application/vnd.uoml+xml": ["uoml"],
            "application/vnd.vcx": ["vcx"],
            "application/vnd.visio": ["vsd", "vst", "vss", "vsw"],
            "application/vnd.visionary": ["vis"],
            "application/vnd.vsf": ["vsf"],
            "application/vnd.wap.wbxml": ["wbxml"],
            "application/vnd.wap.wmlc": ["wmlc"],
            "application/vnd.wap.wmlscriptc": ["wmlsc"],
            "application/vnd.webturbo": ["wtb"],
            "application/vnd.wolfram.player": ["nbp"],
            "application/vnd.wordperfect": ["wpd"],
            "application/vnd.wqd": ["wqd"],
            "application/vnd.wt.stf": ["stf"],
            "application/vnd.xara": ["xar"],
            "application/vnd.xfdl": ["xfdl"],
            "application/vnd.yamaha.hv-dic": ["hvd"],
            "application/vnd.yamaha.hv-script": ["hvs"],
            "application/vnd.yamaha.hv-voice": ["hvp"],
            "application/vnd.yamaha.openscoreformat": ["osf"],
            "application/vnd.yamaha.openscoreformat.osfpvg+xml": ["osfpvg"],
            "application/vnd.yamaha.smaf-audio": ["saf"],
            "application/vnd.yamaha.smaf-phrase": ["spf"],
            "application/vnd.yellowriver-custom-menu": ["cmp"],
            "application/vnd.zul": ["zir", "zirz"],
            "application/vnd.zzazz.deck+xml": ["zaz"],
            "application/x-7z-compressed": ["7z"],
            "application/x-abiword": ["abw"],
            "application/x-ace-compressed": ["ace"],
            "application/x-apple-diskimage": ["*dmg"],
            "application/x-arj": ["arj"],
            "application/x-authorware-bin": ["aab", "x32", "u32", "vox"],
            "application/x-authorware-map": ["aam"],
            "application/x-authorware-seg": ["aas"],
            "application/x-bcpio": ["bcpio"],
            "application/x-bdoc": ["*bdoc"],
            "application/x-bittorrent": ["torrent"],
            "application/x-blorb": ["blb", "blorb"],
            "application/x-bzip": ["bz"],
            "application/x-bzip2": ["bz2", "boz"],
            "application/x-cbr": ["cbr", "cba", "cbt", "cbz", "cb7"],
            "application/x-cdlink": ["vcd"],
            "application/x-cfs-compressed": ["cfs"],
            "application/x-chat": ["chat"],
            "application/x-chess-pgn": ["pgn"],
            "application/x-chrome-extension": ["crx"],
            "application/x-cocoa": ["cco"],
            "application/x-conference": ["nsc"],
            "application/x-cpio": ["cpio"],
            "application/x-csh": ["csh"],
            "application/x-debian-package": ["*deb", "udeb"],
            "application/x-dgc-compressed": ["dgc"],
            "application/x-director": [
              "dir",
              "dcr",
              "dxr",
              "cst",
              "cct",
              "cxt",
              "w3d",
              "fgd",
              "swa",
            ],
            "application/x-doom": ["wad"],
            "application/x-dtbncx+xml": ["ncx"],
            "application/x-dtbook+xml": ["dtb"],
            "application/x-dtbresource+xml": ["res"],
            "application/x-dvi": ["dvi"],
            "application/x-envoy": ["evy"],
            "application/x-eva": ["eva"],
            "application/x-font-bdf": ["bdf"],
            "application/x-font-ghostscript": ["gsf"],
            "application/x-font-linux-psf": ["psf"],
            "application/x-font-pcf": ["pcf"],
            "application/x-font-snf": ["snf"],
            "application/x-font-type1": ["pfa", "pfb", "pfm", "afm"],
            "application/x-freearc": ["arc"],
            "application/x-futuresplash": ["spl"],
            "application/x-gca-compressed": ["gca"],
            "application/x-glulx": ["ulx"],
            "application/x-gnumeric": ["gnumeric"],
            "application/x-gramps-xml": ["gramps"],
            "application/x-gtar": ["gtar"],
            "application/x-hdf": ["hdf"],
            "application/x-httpd-php": ["php"],
            "application/x-install-instructions": ["install"],
            "application/x-iso9660-image": ["*iso"],
            "application/x-iwork-keynote-sffkey": ["*key"],
            "application/x-iwork-numbers-sffnumbers": ["*numbers"],
            "application/x-iwork-pages-sffpages": ["*pages"],
            "application/x-java-archive-diff": ["jardiff"],
            "application/x-java-jnlp-file": ["jnlp"],
            "application/x-keepass2": ["kdbx"],
            "application/x-latex": ["latex"],
            "application/x-lua-bytecode": ["luac"],
            "application/x-lzh-compressed": ["lzh", "lha"],
            "application/x-makeself": ["run"],
            "application/x-mie": ["mie"],
            "application/x-mobipocket-ebook": ["prc", "mobi"],
            "application/x-ms-application": ["application"],
            "application/x-ms-shortcut": ["lnk"],
            "application/x-ms-wmd": ["wmd"],
            "application/x-ms-wmz": ["wmz"],
            "application/x-ms-xbap": ["xbap"],
            "application/x-msaccess": ["mdb"],
            "application/x-msbinder": ["obd"],
            "application/x-mscardfile": ["crd"],
            "application/x-msclip": ["clp"],
            "application/x-msdos-program": ["*exe"],
            "application/x-msdownload": ["*exe", "*dll", "com", "bat", "*msi"],
            "application/x-msmediaview": ["mvb", "m13", "m14"],
            "application/x-msmetafile": ["*wmf", "*wmz", "*emf", "emz"],
            "application/x-msmoney": ["mny"],
            "application/x-mspublisher": ["pub"],
            "application/x-msschedule": ["scd"],
            "application/x-msterminal": ["trm"],
            "application/x-mswrite": ["wri"],
            "application/x-netcdf": ["nc", "cdf"],
            "application/x-ns-proxy-autoconfig": ["pac"],
            "application/x-nzb": ["nzb"],
            "application/x-perl": ["pl", "pm"],
            "application/x-pilot": ["*prc", "*pdb"],
            "application/x-pkcs12": ["p12", "pfx"],
            "application/x-pkcs7-certificates": ["p7b", "spc"],
            "application/x-pkcs7-certreqresp": ["p7r"],
            "application/x-rar-compressed": ["*rar"],
            "application/x-redhat-package-manager": ["rpm"],
            "application/x-research-info-systems": ["ris"],
            "application/x-sea": ["sea"],
            "application/x-sh": ["sh"],
            "application/x-shar": ["shar"],
            "application/x-shockwave-flash": ["swf"],
            "application/x-silverlight-app": ["xap"],
            "application/x-sql": ["sql"],
            "application/x-stuffit": ["sit"],
            "application/x-stuffitx": ["sitx"],
            "application/x-subrip": ["srt"],
            "application/x-sv4cpio": ["sv4cpio"],
            "application/x-sv4crc": ["sv4crc"],
            "application/x-t3vm-image": ["t3"],
            "application/x-tads": ["gam"],
            "application/x-tar": ["tar"],
            "application/x-tcl": ["tcl", "tk"],
            "application/x-tex": ["tex"],
            "application/x-tex-tfm": ["tfm"],
            "application/x-texinfo": ["texinfo", "texi"],
            "application/x-tgif": ["*obj"],
            "application/x-ustar": ["ustar"],
            "application/x-virtualbox-hdd": ["hdd"],
            "application/x-virtualbox-ova": ["ova"],
            "application/x-virtualbox-ovf": ["ovf"],
            "application/x-virtualbox-vbox": ["vbox"],
            "application/x-virtualbox-vbox-extpack": ["vbox-extpack"],
            "application/x-virtualbox-vdi": ["vdi"],
            "application/x-virtualbox-vhd": ["vhd"],
            "application/x-virtualbox-vmdk": ["vmdk"],
            "application/x-wais-source": ["src"],
            "application/x-web-app-manifest+json": ["webapp"],
            "application/x-x509-ca-cert": ["der", "crt", "pem"],
            "application/x-xfig": ["fig"],
            "application/x-xliff+xml": ["*xlf"],
            "application/x-xpinstall": ["xpi"],
            "application/x-xz": ["xz"],
            "application/x-zmachine": [
              "z1",
              "z2",
              "z3",
              "z4",
              "z5",
              "z6",
              "z7",
              "z8",
            ],
            "audio/vnd.dece.audio": ["uva", "uvva"],
            "audio/vnd.digital-winds": ["eol"],
            "audio/vnd.dra": ["dra"],
            "audio/vnd.dts": ["dts"],
            "audio/vnd.dts.hd": ["dtshd"],
            "audio/vnd.lucent.voice": ["lvp"],
            "audio/vnd.ms-playready.media.pya": ["pya"],
            "audio/vnd.nuera.ecelp4800": ["ecelp4800"],
            "audio/vnd.nuera.ecelp7470": ["ecelp7470"],
            "audio/vnd.nuera.ecelp9600": ["ecelp9600"],
            "audio/vnd.rip": ["rip"],
            "audio/x-aac": ["aac"],
            "audio/x-aiff": ["aif", "aiff", "aifc"],
            "audio/x-caf": ["caf"],
            "audio/x-flac": ["flac"],
            "audio/x-m4a": ["*m4a"],
            "audio/x-matroska": ["mka"],
            "audio/x-mpegurl": ["m3u"],
            "audio/x-ms-wax": ["wax"],
            "audio/x-ms-wma": ["wma"],
            "audio/x-pn-realaudio": ["ram", "ra"],
            "audio/x-pn-realaudio-plugin": ["rmp"],
            "audio/x-realaudio": ["*ra"],
            "audio/x-wav": ["*wav"],
            "chemical/x-cdx": ["cdx"],
            "chemical/x-cif": ["cif"],
            "chemical/x-cmdf": ["cmdf"],
            "chemical/x-cml": ["cml"],
            "chemical/x-csml": ["csml"],
            "chemical/x-xyz": ["xyz"],
            "image/prs.btif": ["btif"],
            "image/prs.pti": ["pti"],
            "image/vnd.adobe.photoshop": ["psd"],
            "image/vnd.airzip.accelerator.azv": ["azv"],
            "image/vnd.dece.graphic": ["uvi", "uvvi", "uvg", "uvvg"],
            "image/vnd.djvu": ["djvu", "djv"],
            "image/vnd.dvb.subtitle": ["*sub"],
            "image/vnd.dwg": ["dwg"],
            "image/vnd.dxf": ["dxf"],
            "image/vnd.fastbidsheet": ["fbs"],
            "image/vnd.fpx": ["fpx"],
            "image/vnd.fst": ["fst"],
            "image/vnd.fujixerox.edmics-mmr": ["mmr"],
            "image/vnd.fujixerox.edmics-rlc": ["rlc"],
            "image/vnd.microsoft.icon": ["ico"],
            "image/vnd.ms-dds": ["dds"],
            "image/vnd.ms-modi": ["mdi"],
            "image/vnd.ms-photo": ["wdp"],
            "image/vnd.net-fpx": ["npx"],
            "image/vnd.pco.b16": ["b16"],
            "image/vnd.tencent.tap": ["tap"],
            "image/vnd.valve.source.texture": ["vtf"],
            "image/vnd.wap.wbmp": ["wbmp"],
            "image/vnd.xiff": ["xif"],
            "image/vnd.zbrush.pcx": ["pcx"],
            "image/x-3ds": ["3ds"],
            "image/x-cmu-raster": ["ras"],
            "image/x-cmx": ["cmx"],
            "image/x-freehand": ["fh", "fhc", "fh4", "fh5", "fh7"],
            "image/x-icon": ["*ico"],
            "image/x-jng": ["jng"],
            "image/x-mrsid-image": ["sid"],
            "image/x-ms-bmp": ["*bmp"],
            "image/x-pcx": ["*pcx"],
            "image/x-pict": ["pic", "pct"],
            "image/x-portable-anymap": ["pnm"],
            "image/x-portable-bitmap": ["pbm"],
            "image/x-portable-graymap": ["pgm"],
            "image/x-portable-pixmap": ["ppm"],
            "image/x-rgb": ["rgb"],
            "image/x-tga": ["tga"],
            "image/x-xbitmap": ["xbm"],
            "image/x-xpixmap": ["xpm"],
            "image/x-xwindowdump": ["xwd"],
            "message/vnd.wfa.wsc": ["wsc"],
            "model/vnd.collada+xml": ["dae"],
            "model/vnd.dwf": ["dwf"],
            "model/vnd.gdl": ["gdl"],
            "model/vnd.gtw": ["gtw"],
            "model/vnd.mts": ["mts"],
            "model/vnd.opengex": ["ogex"],
            "model/vnd.parasolid.transmit.binary": ["x_b"],
            "model/vnd.parasolid.transmit.text": ["x_t"],
            "model/vnd.sap.vds": ["vds"],
            "model/vnd.usdz+zip": ["usdz"],
            "model/vnd.valve.source.compiled-map": ["bsp"],
            "model/vnd.vtu": ["vtu"],
            "text/prs.lines.tag": ["dsc"],
            "text/vnd.curl": ["curl"],
            "text/vnd.curl.dcurl": ["dcurl"],
            "text/vnd.curl.mcurl": ["mcurl"],
            "text/vnd.curl.scurl": ["scurl"],
            "text/vnd.dvb.subtitle": ["sub"],
            "text/vnd.fly": ["fly"],
            "text/vnd.fmi.flexstor": ["flx"],
            "text/vnd.graphviz": ["gv"],
            "text/vnd.in3d.3dml": ["3dml"],
            "text/vnd.in3d.spot": ["spot"],
            "text/vnd.sun.j2me.app-descriptor": ["jad"],
            "text/vnd.wap.wml": ["wml"],
            "text/vnd.wap.wmlscript": ["wmls"],
            "text/x-asm": ["s", "asm"],
            "text/x-c": ["c", "cc", "cxx", "cpp", "h", "hh", "dic"],
            "text/x-component": ["htc"],
            "text/x-fortran": ["f", "for", "f77", "f90"],
            "text/x-handlebars-template": ["hbs"],
            "text/x-java-source": ["java"],
            "text/x-lua": ["lua"],
            "text/x-markdown": ["mkd"],
            "text/x-nfo": ["nfo"],
            "text/x-opml": ["opml"],
            "text/x-org": ["*org"],
            "text/x-pascal": ["p", "pas"],
            "text/x-processing": ["pde"],
            "text/x-sass": ["sass"],
            "text/x-scss": ["scss"],
            "text/x-setext": ["etx"],
            "text/x-sfv": ["sfv"],
            "text/x-suse-ymp": ["ymp"],
            "text/x-uuencode": ["uu"],
            "text/x-vcalendar": ["vcs"],
            "text/x-vcard": ["vcf"],
            "video/vnd.dece.hd": ["uvh", "uvvh"],
            "video/vnd.dece.mobile": ["uvm", "uvvm"],
            "video/vnd.dece.pd": ["uvp", "uvvp"],
            "video/vnd.dece.sd": ["uvs", "uvvs"],
            "video/vnd.dece.video": ["uvv", "uvvv"],
            "video/vnd.dvb.file": ["dvb"],
            "video/vnd.fvt": ["fvt"],
            "video/vnd.mpegurl": ["mxu", "m4u"],
            "video/vnd.ms-playready.media.pyv": ["pyv"],
            "video/vnd.uvvu.mp4": ["uvu", "uvvu"],
            "video/vnd.vivo": ["viv"],
            "video/x-f4v": ["f4v"],
            "video/x-fli": ["fli"],
            "video/x-flv": ["flv"],
            "video/x-m4v": ["m4v"],
            "video/x-matroska": ["mkv", "mk3d", "mks"],
            "video/x-mng": ["mng"],
            "video/x-ms-asf": ["asf", "asx"],
            "video/x-ms-vob": ["vob"],
            "video/x-ms-wm": ["wm"],
            "video/x-ms-wmv": ["wmv"],
            "video/x-ms-wmx": ["wmx"],
            "video/x-ms-wvx": ["wvx"],
            "video/x-msvideo": ["avi"],
            "video/x-sgi-movie": ["movie"],
            "video/x-smv": ["smv"],
            "x-conference/x-cooltalk": ["ice"],
          };
        },
        function (e, t, n) {
          "use strict";
          var i =
              "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
                ? function (e) {
                    return typeof e;
                  }
                : function (e) {
                    return e &&
                      "function" == typeof Symbol &&
                      e.constructor === Symbol &&
                      e !== Symbol.prototype
                      ? "symbol"
                      : typeof e;
                  },
            a = n(5),
            o = n(25),
            r = n(4).EventProxy,
            s = n(0);
          function c(e, t) {
            var n = e.TaskId,
              i = e.Bucket,
              c = e.Region,
              u = e.Key,
              d = e.StorageClass,
              m = this,
              f = {},
              h = e.FileSize,
              g = e.SliceSize,
              v = Math.ceil(h / g),
              x = 0,
              y = s.throttleOnProgress.call(m, h, e.onHashProgress),
              C = function (t, n) {
                var i = t.length;
                return 0 === i
                  ? n(null, !0)
                  : i > v || (i > 1 && Math.max(t[0].Size, t[1].Size) !== g)
                  ? n(null, !1)
                  : void (function a(o) {
                      if (o < i) {
                        var r = t[o];
                        !(function (t, n) {
                          var i = g * (t - 1),
                            a = Math.min(i + g, h),
                            o = a - i;
                          f[t]
                            ? n(null, { PartNumber: t, ETag: f[t], Size: o })
                            : s.fileSlice(e.FilePath, i, a, function (e) {
                                try {
                                  var i = s.getFileMd5(e);
                                } catch (e) {
                                  return n(e);
                                }
                                var a = '"' + i + '"';
                                (f[t] = a),
                                  (x += o),
                                  n(null, { PartNumber: t, ETag: a, Size: o }),
                                  y({ loaded: x, total: h });
                              });
                        })(r.PartNumber, function (e, t) {
                          t && t.ETag === r.ETag && t.Size === r.Size
                            ? a(o + 1)
                            : n(null, !1);
                        });
                      } else n(null, !0);
                    })(0);
              },
              b = new r();
            b.on("error", function (e) {
              if (m._isRunningTask(n)) return t(e);
            }),
              b.on("upload_id_available", function (e) {
                var n = {},
                  i = [];
                s.each(e.PartList, function (e) {
                  n[e.PartNumber] = e;
                });
                for (var a = 1; a <= v; a++) {
                  var o = n[a];
                  o
                    ? ((o.PartNumber = a), (o.Uploaded = !0))
                    : (o = { PartNumber: a, ETag: null, Uploaded: !1 }),
                    i.push(o);
                }
                (e.PartList = i), t(null, e);
              }),
              b.on("no_available_upload_id", function () {
                if (m._isRunningTask(n)) {
                  var a = s.extend(
                    {
                      Bucket: i,
                      Region: c,
                      Key: u,
                      Headers: s.clone(e.Headers),
                      Query: s.clone(e.Query),
                      StorageClass: d,
                    },
                    e
                  );
                  m.multipartInit(a, function (e, i) {
                    if (m._isRunningTask(n)) {
                      if (e) return b.emit("error", e);
                      var a = i.UploadId;
                      if (!a) return t({ Message: "no upload id" });
                      b.emit("upload_id_available", {
                        UploadId: a,
                        PartList: [],
                      });
                    }
                  });
                }
              }),
              b.on("has_and_check_upload_id", function (e) {
                (e = e.reverse()),
                  o.eachLimit(
                    e,
                    1,
                    function (e, t) {
                      m._isRunningTask(n) &&
                        (a.using[e]
                          ? t()
                          : p.call(
                              m,
                              { Bucket: i, Region: c, Key: u, UploadId: e },
                              function (i, o) {
                                if (m._isRunningTask(n)) {
                                  if (i)
                                    return a.removeUsing(e), b.emit("error", i);
                                  var r = o.PartList;
                                  r.forEach(function (e) {
                                    (e.PartNumber *= 1),
                                      (e.Size *= 1),
                                      (e.ETag = e.ETag || "");
                                  }),
                                    C(r, function (i, a) {
                                      if (m._isRunningTask(n))
                                        return i
                                          ? b.emit("error", i)
                                          : void (a
                                              ? t({ UploadId: e, PartList: r })
                                              : t());
                                    });
                                }
                              }
                            ));
                    },
                    function (e) {
                      m._isRunningTask(n) &&
                        (y(null, !0),
                        e && e.UploadId
                          ? b.emit("upload_id_available", e)
                          : b.emit("no_available_upload_id"));
                    }
                  );
              }),
              b.on("seek_local_avail_upload_id", function (t) {
                var o = a.getFileId(e.FileStat, e.ChunkSize, i, u),
                  r = a.getUploadIdList(o);
                o && r
                  ? (function e(o) {
                      if (o >= r.length) b.emit("has_and_check_upload_id", t);
                      else {
                        var l = r[o];
                        if (!s.isInArray(t, l))
                          return a.removeUploadId(l), void e(o + 1);
                        a.using[l]
                          ? e(o + 1)
                          : p.call(
                              m,
                              { Bucket: i, Region: c, Key: u, UploadId: l },
                              function (t, i) {
                                m._isRunningTask(n) &&
                                  (t
                                    ? (a.removeUploadId(l), e(o + 1))
                                    : b.emit("upload_id_available", {
                                        UploadId: l,
                                        PartList: i.PartList,
                                      }));
                              }
                            );
                      }
                    })(0)
                  : b.emit("has_and_check_upload_id", t);
              }),
              b.on("get_remote_upload_id_list", function () {
                l.call(m, { Bucket: i, Region: c, Key: u }, function (t, o) {
                  if (m._isRunningTask(n)) {
                    if (t) return b.emit("error", t);
                    var r = s
                      .filter(o.UploadList, function (e) {
                        return (
                          e.Key === u &&
                          (!d ||
                            e.StorageClass.toUpperCase() === d.toUpperCase())
                        );
                      })
                      .reverse()
                      .map(function (e) {
                        return e.UploadId || e.UploadID;
                      });
                    if (r.length) b.emit("seek_local_avail_upload_id", r);
                    else {
                      var c,
                        l = a.getFileId(e.FileStat, e.ChunkSize, i, u);
                      l &&
                        (c = a.getUploadIdList(l)) &&
                        s.each(c, function (e) {
                          a.removeUploadId(e);
                        }),
                        b.emit("no_available_upload_id");
                    }
                  }
                });
              }),
              b.emit("get_remote_upload_id_list");
          }
          function l(e, t) {
            var n = this,
              i = [],
              a = { Bucket: e.Bucket, Region: e.Region, Prefix: e.Key };
            !(function e() {
              n.multipartList(a, function (n, o) {
                if (n) return t(n);
                i.push.apply(i, o.Upload || []),
                  "true" === o.IsTruncated
                    ? ((a.KeyMarker = o.NextKeyMarker),
                      (a.UploadIdMarker = o.NextUploadIdMarker),
                      e())
                    : t(null, { UploadList: i });
              });
            })();
          }
          function p(e, t) {
            var n = this,
              i = [],
              a = {
                Bucket: e.Bucket,
                Region: e.Region,
                Key: e.Key,
                UploadId: e.UploadId,
              };
            !(function e() {
              n.multipartListPart(a, function (n, o) {
                if (n) return t(n);
                i.push.apply(i, o.Part || []),
                  "true" === o.IsTruncated
                    ? ((a.PartNumberMarker = o.NextPartNumberMarker), e())
                    : t(null, { PartList: i });
              });
            })();
          }
          function u(e, t) {
            var n = this,
              i = e.TaskId,
              a = e.Bucket,
              r = e.Region,
              c = e.Key,
              l = e.UploadData,
              p = e.FileSize,
              u = e.SliceSize,
              m = Math.min(
                e.AsyncLimit || n.options.ChunkParallelLimit || 1,
                256
              ),
              f = e.FilePath,
              h = Math.ceil(p / u),
              g = 0,
              v = e.ServerSideEncryption,
              x = s.filter(l.PartList, function (e) {
                return (
                  e.Uploaded && (g += (e.PartNumber >= h && p % u) || u),
                  !e.Uploaded
                );
              }),
              y = e.onProgress;
            o.eachLimit(
              x,
              m,
              function (e, t) {
                if (n._isRunningTask(i)) {
                  var o = e.PartNumber,
                    s = Math.min(p, e.PartNumber * u) - (e.PartNumber - 1) * u,
                    m = 0;
                  d.call(
                    n,
                    {
                      TaskId: i,
                      Bucket: a,
                      Region: r,
                      Key: c,
                      SliceSize: u,
                      FileSize: p,
                      PartNumber: o,
                      ServerSideEncryption: v,
                      FilePath: f,
                      UploadData: l,
                      onProgress: function (e) {
                        (g += e.loaded - m),
                          (m = e.loaded),
                          y({ loaded: g, total: p });
                      },
                    },
                    function (a, o) {
                      n._isRunningTask(i) &&
                        (a ? (g -= m) : ((g += s - m), (e.ETag = o.ETag)),
                        y({ loaded: g, total: p }),
                        t(a || null, o));
                    }
                  );
                }
              },
              function (e) {
                if (n._isRunningTask(i))
                  return e
                    ? t(e)
                    : void t(null, {
                        UploadId: l.UploadId,
                        SliceList: l.PartList,
                      });
              }
            );
          }
          function d(e, t) {
            var n = this,
              i = e.TaskId,
              a = e.Bucket,
              r = e.Region,
              c = e.Key,
              l = e.FileSize,
              p = e.FilePath,
              u = 1 * e.PartNumber,
              d = e.SliceSize,
              m = e.ServerSideEncryption,
              f = e.UploadData,
              h = n.options.ChunkRetryTimes + 1,
              g = e.Headers || {},
              v = d * (u - 1),
              x = d,
              y = v + d;
            y > l && (x = (y = l) - v);
            var C = ["x-cos-traffic-limit", "x-cos-mime-limit"],
              b = {};
            s.each(g, function (e, t) {
              C.indexOf(t) > -1 && (b[t] = e);
            }),
              s.fileSlice(p, v, y, function (l) {
                var p = s.getFileMd5(l),
                  d = p ? s.binaryBase64(p) : null,
                  g = f.PartList[u - 1];
                o.retry(
                  h,
                  function (t) {
                    n._isRunningTask(i) &&
                      n.multipartUpload(
                        {
                          TaskId: i,
                          Bucket: a,
                          Region: r,
                          Key: c,
                          ContentLength: x,
                          PartNumber: u,
                          UploadId: f.UploadId,
                          ServerSideEncryption: m,
                          Body: l,
                          Headers: b,
                          onProgress: e.onProgress,
                          ContentMD5: d,
                        },
                        function (e, a) {
                          if (n._isRunningTask(i))
                            return e ? t(e) : ((g.Uploaded = !0), t(null, a));
                        }
                      );
                  },
                  function (e, a) {
                    if (n._isRunningTask(i)) return t(e, a);
                  }
                );
              });
          }
          function m(e, t) {
            var n = e.Bucket,
              i = e.Region,
              a = e.Key,
              r = e.UploadId,
              s = e.SliceList,
              c = this,
              l = this.options.ChunkRetryTimes + 1,
              p = s.map(function (e) {
                return { PartNumber: e.PartNumber, ETag: e.ETag };
              });
            o.retry(
              l,
              function (e) {
                c.multipartComplete(
                  { Bucket: n, Region: i, Key: a, UploadId: r, Parts: p },
                  e
                );
              },
              function (e, n) {
                t(e, n);
              }
            );
          }
          function f(e, t) {
            var n = e.Bucket,
              i = e.Region,
              a = e.Key,
              r = e.AbortArray,
              s = e.AsyncLimit || 1,
              c = this,
              l = 0,
              p = new Array(r.length);
            o.eachLimit(
              r,
              s,
              function (t, o) {
                var r = l;
                if (a && a !== t.Key)
                  return (p[r] = { error: { KeyNotMatch: !0 } }), void o(null);
                var s = t.UploadId || t.UploadID;
                c.multipartAbort(
                  {
                    Bucket: n,
                    Region: i,
                    Key: t.Key,
                    Headers: e.Headers,
                    UploadId: s,
                  },
                  function (e) {
                    var a = { Bucket: n, Region: i, Key: t.Key, UploadId: s };
                    (p[r] = { error: e, task: a }), o(null);
                  }
                ),
                  l++;
              },
              function (e) {
                if (e) return t(e);
                for (var n = [], i = [], a = 0, o = p.length; a < o; a++) {
                  var r = p[a];
                  r.task && (r.error ? i.push(r.task) : n.push(r.task));
                }
                return t(null, { successList: n, errorList: i });
              }
            );
          }
          function h(e, t) {
            var n = e.TaskId,
              i = e.Bucket,
              a = e.Region,
              r = e.Key,
              s = e.CopySource,
              c = e.UploadId,
              l = 1 * e.PartNumber,
              p = e.CopySourceRange,
              u = this.options.ChunkRetryTimes + 1,
              d = this;
            o.retry(
              u,
              function (t) {
                d.uploadPartCopy(
                  {
                    TaskId: n,
                    Bucket: i,
                    Region: a,
                    Key: r,
                    CopySource: s,
                    UploadId: c,
                    PartNumber: l,
                    CopySourceRange: p,
                    onProgress: e.onProgress,
                  },
                  function (e, n) {
                    t(e || null, n);
                  }
                );
              },
              function (e, n) {
                return t(e, n);
              }
            );
          }
          var g = {
            sliceUploadFile: function (e, t) {
              var n = this;
              if (!s.canFileSlice())
                return (e.SkipTask = !0), void n.postObject(e, t);
              var i,
                o,
                l = new r(),
                p = e.TaskId,
                d = e.Bucket,
                f = e.Region,
                h = e.Key,
                g = e.FilePath,
                v = e.ChunkSize || e.SliceSize || n.options.ChunkSize,
                x = e.AsyncLimit,
                y = e.StorageClass,
                C = e.ServerSideEncryption,
                b = e.onHashProgress;
              l.on("error", function (i) {
                if (n._isRunningTask(p)) {
                  var a = { UploadId: e.UploadData.UploadId || "", err: i };
                  return t(a);
                }
              }),
                l.on("upload_complete", function (n) {
                  var i = s.extend(
                    { UploadId: e.UploadData.UploadId || "" },
                    n
                  );
                  t(null, i);
                }),
                l.on("upload_slice_complete", function (e) {
                  m.call(
                    n,
                    {
                      Bucket: d,
                      Region: f,
                      Key: h,
                      UploadId: e.UploadId,
                      SliceList: e.SliceList,
                    },
                    function (t, r) {
                      if (n._isRunningTask(p)) {
                        if ((a.removeUsing(e.UploadId), t))
                          return o(null, !0), l.emit("error", t);
                        a.removeUploadId(e.UploadId),
                          o({ loaded: i, total: i }, !0),
                          l.emit("upload_complete", r);
                      }
                    }
                  );
                }),
                l.on("get_upload_data_finish", function (t) {
                  var r = a.getFileId(e.FileStat, e.ChunkSize, d, h);
                  r &&
                    a.saveUploadId(r, t.UploadId, n.options.UploadIdCacheLimit),
                    a.setUsing(t.UploadId),
                    o(null, !0),
                    u.call(
                      n,
                      {
                        TaskId: p,
                        Bucket: d,
                        Region: f,
                        Key: h,
                        FilePath: g,
                        FileSize: i,
                        SliceSize: v,
                        AsyncLimit: x,
                        ServerSideEncryption: C,
                        UploadData: t,
                        onProgress: o,
                      },
                      function (e, t) {
                        if (n._isRunningTask(p))
                          return e
                            ? (o(null, !0), l.emit("error", e))
                            : void l.emit("upload_slice_complete", t);
                      }
                    );
                }),
                l.on("get_file_size_finish", function () {
                  if (
                    ((o = s.throttleOnProgress.call(n, i, e.onProgress)),
                    e.UploadData.UploadId)
                  )
                    l.emit("get_upload_data_finish", e.UploadData);
                  else {
                    var t = s.extend(
                      {
                        TaskId: p,
                        Bucket: d,
                        Region: f,
                        Key: h,
                        Headers: e.Headers,
                        StorageClass: y,
                        FilePath: g,
                        FileSize: i,
                        SliceSize: v,
                        onHashProgress: b,
                      },
                      e
                    );
                    c.call(n, t, function (t, i) {
                      if (n._isRunningTask(p)) {
                        if (t) return l.emit("error", t);
                        (e.UploadData.UploadId = i.UploadId),
                          (e.UploadData.PartList = i.PartList),
                          l.emit("get_upload_data_finish", e.UploadData);
                      }
                    });
                  }
                }),
                (i = e.ContentLength),
                delete e.ContentLength,
                !e.Headers && (e.Headers = {}),
                s.each(e.Headers, function (t, n) {
                  "content-length" === n.toLowerCase() && delete e.Headers[n];
                }),
                (function () {
                  for (
                    var t = [
                        1, 2, 4, 8, 16, 32, 64, 128, 256, 512, 1024, 2048, 4096,
                        5120,
                      ],
                      a = 1048576,
                      o = 0;
                    o < t.length &&
                    !(i / (a = 1024 * t[o] * 1024) <= n.options.MaxPartNumber);
                    o++
                  );
                  e.ChunkSize = e.SliceSize = v = Math.max(v, a);
                })(),
                0 === i
                  ? ((e.Body = ""),
                    (e.ContentLength = 0),
                    (e.SkipTask = !0),
                    n.putObject(e, function (e, n) {
                      if (e) return t(e);
                      t(null, n);
                    }))
                  : l.emit("get_file_size_finish");
            },
            abortUploadTask: function (e, t) {
              var n = e.Bucket,
                i = e.Region,
                a = e.Key,
                o = e.UploadId,
                s = e.Level || "task",
                c = e.AsyncLimit,
                p = this,
                u = new r();
              if (
                (u.on("error", function (e) {
                  return t(e);
                }),
                u.on("get_abort_array", function (o) {
                  f.call(
                    p,
                    {
                      Bucket: n,
                      Region: i,
                      Key: a,
                      Headers: e.Headers,
                      AsyncLimit: c,
                      AbortArray: o,
                    },
                    function (e, n) {
                      if (e) return t(e);
                      t(null, n);
                    }
                  );
                }),
                "bucket" === s)
              )
                l.call(p, { Bucket: n, Region: i }, function (e, n) {
                  if (e) return t(e);
                  u.emit("get_abort_array", n.UploadList || []);
                });
              else if ("file" === s) {
                if (!a) return t({ error: "abort_upload_task_no_key" });
                l.call(p, { Bucket: n, Region: i, Key: a }, function (e, n) {
                  if (e) return t(e);
                  u.emit("get_abort_array", n.UploadList || []);
                });
              } else {
                if ("task" !== s) return t({ error: "abort_unknown_level" });
                if (!o) return t({ error: "abort_upload_task_no_id" });
                if (!a) return t({ error: "abort_upload_task_no_key" });
                u.emit("get_abort_array", [{ Key: a, UploadId: o }]);
              }
            },
            uploadFile: function (e, t) {
              var n =
                  void 0 === e.SliceSize ? this.options.SliceSize : e.SliceSize,
                a = [],
                o = e.FileSize,
                r = { TaskId: "" };
              s.each(e, function (e, t) {
                "object" !== (void 0 === e ? "undefined" : i(e)) &&
                  "function" != typeof e &&
                  (r[t] = e);
              });
              var c = e.onTaskReady;
              e.onTaskReady = function (e) {
                (r.TaskId = e), c && c(e);
              };
              var l = e.onFileFinish,
                p = o > n ? "sliceUploadFile" : "postObject";
              a.push({
                api: p,
                params: e,
                callback: function (e, n) {
                  l && l(e, n, r), t && t(e, n);
                },
              }),
                this._addTasks(a);
            },
            uploadFiles: function (e, t) {
              var n =
                  void 0 === e.SliceSize ? this.options.SliceSize : e.SliceSize,
                a = 0,
                o = 0,
                r = s.throttleOnProgress.call(this, o, e.onProgress),
                c = e.files.length,
                l = e.onFileFinish,
                p = Array(c),
                u = function (e, n, i) {
                  r(null, !0),
                    l && l(e, n, i),
                    (p[i.Index] = { options: i, error: e, data: n }),
                    --c <= 0 && t && t(null, { files: p });
                },
                d = [];
              s.each(e.files, function (e, t) {
                var c = e.FileSize,
                  l = { Index: t, TaskId: "" };
                (a += c),
                  s.each(e, function (e, t) {
                    "object" !== (void 0 === e ? "undefined" : i(e)) &&
                      "function" != typeof e &&
                      (l[t] = e);
                  });
                var p = e.onTaskReady;
                e.onTaskReady = function (e) {
                  (l.TaskId = e), p && p(e);
                };
                var m = 0,
                  f = e.onProgress;
                e.onProgress = function (e) {
                  (o = o - m + e.loaded),
                    (m = e.loaded),
                    f && f(e),
                    r({ loaded: o, total: a });
                };
                var h = e.onFileFinish,
                  g = c > n ? "sliceUploadFile" : "postObject";
                d.push({
                  api: g,
                  params: e,
                  callback: function (e, t) {
                    h && h(e, t), u && u(e, t, l);
                  },
                });
              }),
                this._addTasks(d);
            },
            sliceCopyFile: function (e, t) {
              var n = new r(),
                i = this,
                a = e.Bucket,
                c = e.Region,
                l = e.Key,
                p = e.CopySource,
                u = p.match(/^([^.]+-\d+)\.cos(v6)?\.([^.]+)\.[^/]+\/(.+)$/);
              if (u) {
                var d = u[1],
                  m = u[3],
                  f = decodeURIComponent(u[4]),
                  g =
                    void 0 === e.CopySliceSize
                      ? i.options.CopySliceSize
                      : e.CopySliceSize;
                g = Math.max(0, g);
                var v,
                  x,
                  y = e.CopyChunkSize || this.options.CopyChunkSize,
                  C = this.options.CopyChunkParallelLimit,
                  b = 0;
                n.on("copy_slice_complete", function (e) {
                  i.multipartComplete(
                    {
                      Bucket: a,
                      Region: c,
                      Key: l,
                      UploadId: e.UploadId,
                      Parts: e.PartList,
                    },
                    function (e, n) {
                      if (e) return x(null, !0), t(e);
                      x({ loaded: v, total: v }, !0), t(null, n);
                    }
                  );
                }),
                  n.on("get_copy_data_finish", function (e) {
                    o.eachLimit(
                      e.PartList,
                      C,
                      function (t, n) {
                        var o = t.PartNumber,
                          r = t.CopySourceRange,
                          s = t.end - t.start,
                          u = 0;
                        h.call(
                          i,
                          {
                            Bucket: a,
                            Region: c,
                            Key: l,
                            CopySource: p,
                            UploadId: e.UploadId,
                            PartNumber: o,
                            CopySourceRange: r,
                            onProgress: function (e) {
                              (b += e.loaded - u),
                                (u = e.loaded),
                                x({ loaded: b, total: v });
                            },
                          },
                          function (e, i) {
                            if (e) return n(e);
                            x({ loaded: b, total: v }),
                              (b += s - u),
                              (t.ETag = i.ETag),
                              n(e || null, i);
                          }
                        );
                      },
                      function (i) {
                        if (i) return x(null, !0), t(i);
                        n.emit("copy_slice_complete", e);
                      }
                    );
                  }),
                  n.on("get_file_size_finish", function (o) {
                    var r;
                    if (
                      ((function () {
                        for (
                          var t = [
                              1, 2, 4, 8, 16, 32, 64, 128, 256, 512, 1024, 2048,
                              4096, 5120,
                            ],
                            n = 1048576,
                            a = 0;
                          a < t.length &&
                          !(
                            v / (n = 1024 * t[a] * 1024) <=
                            i.options.MaxPartNumber
                          );
                          a++
                        );
                        e.ChunkSize = y = Math.max(y, n);
                        for (
                          var o = Math.ceil(v / y), r = [], s = 1;
                          s <= o;
                          s++
                        ) {
                          var c = (s - 1) * y,
                            l = s * y < v ? s * y - 1 : v - 1,
                            p = {
                              PartNumber: s,
                              start: c,
                              end: l,
                              CopySourceRange: "bytes=" + c + "-" + l,
                            };
                          r.push(p);
                        }
                        e.PartList = r;
                      })(),
                      ((r =
                        "Replaced" === e.Headers["x-cos-metadata-directive"]
                          ? e.Headers
                          : o)["x-cos-storage-class"] =
                        e.Headers["x-cos-storage-class"] ||
                        o["x-cos-storage-class"]),
                      (r = s.clearKey(r)),
                      "ARCHIVE" === o["x-cos-storage-class"] ||
                        "DEEP_ARCHIVE" === o["x-cos-storage-class"])
                    ) {
                      var p = o["x-cos-restore"];
                      if (!p || 'ongoing-request="true"' === p)
                        return void t({
                          error:
                            "Unrestored archive object is not allowed to be copied",
                        });
                    }
                    delete r["x-cos-copy-source"],
                      delete r["x-cos-metadata-directive"],
                      delete r["x-cos-copy-source-If-Modified-Since"],
                      delete r["x-cos-copy-source-If-Unmodified-Since"],
                      delete r["x-cos-copy-source-If-Match"],
                      delete r["x-cos-copy-source-If-None-Match"],
                      i.multipartInit(
                        { Bucket: a, Region: c, Key: l, Headers: r },
                        function (i, a) {
                          if (i) return t(i);
                          (e.UploadId = a.UploadId),
                            n.emit("get_copy_data_finish", e);
                        }
                      );
                  }),
                  i.headObject(
                    { Bucket: d, Region: m, Key: f },
                    function (a, o) {
                      if (a)
                        a.statusCode && 404 === a.statusCode
                          ? t({ ErrorStatus: f + " Not Exist" })
                          : t(a);
                      else if (
                        void 0 !==
                          (v = e.FileSize = o.headers["content-length"]) &&
                        v
                      )
                        if (
                          ((x = s.throttleOnProgress.call(i, v, e.onProgress)),
                          v <= g)
                        )
                          e.Headers["x-cos-metadata-directive"] ||
                            (e.Headers["x-cos-metadata-directive"] = "Copy"),
                            i.putObjectCopy(e, function (e, n) {
                              if (e) return x(null, !0), t(e);
                              x({ loaded: v, total: v }, !0), t(e, n);
                            });
                        else {
                          var r = o.headers,
                            c = {
                              "Cache-Control": r["cache-control"],
                              "Content-Disposition": r["content-disposition"],
                              "Content-Encoding": r["content-encoding"],
                              "Content-Type": r["content-type"],
                              Expires: r.expires,
                              "x-cos-storage-class": r["x-cos-storage-class"],
                            };
                          s.each(r, function (e, t) {
                            0 === t.indexOf("x-cos-meta-") &&
                              t.length > "x-cos-meta-".length &&
                              (c[t] = e);
                          }),
                            n.emit("get_file_size_finish", c);
                        }
                      else
                        t({
                          error:
                            'get Content-Length error, please add "Content-Length" to CORS ExposeHeader setting.',
                        });
                    }
                  );
              } else t({ error: "CopySource format error" });
            },
          };
          e.exports.init = function (e, t) {
            t.transferToTaskMethod(g, "sliceUploadFile"),
              s.each(g, function (t, n) {
                e.prototype[n] = s.apiWrapper(n, t);
              });
          };
        },
        function (e, t, n) {
          "use strict";
          var i = {
            eachLimit: function (e, t, n, i) {
              if (((i = i || function () {}), !e.length || t <= 0)) return i();
              var a = 0,
                o = 0,
                r = 0;
              !(function s() {
                if (a >= e.length) return i();
                for (; r < t && o < e.length; )
                  (r += 1),
                    n(e[(o += 1) - 1], function (t) {
                      t
                        ? (i(t), (i = function () {}))
                        : ((r -= 1), (a += 1) >= e.length ? i() : s());
                    });
              })();
            },
            retry: function (e, t, n) {
              e < 1
                ? n()
                : (function i(a) {
                    t(function (t, o) {
                      t && a < e ? i(a + 1) : n(t, o);
                    });
                  })(1);
            },
          };
          e.exports = i;
        },
      ]);
    }),
    "object" == typeof exports && "object" == typeof module
      ? (module.exports = factory())
      : "function" == typeof define && define.amd
      ? define([], factory)
      : "object" == typeof exports
      ? (exports.COS = factory())
      : (root.COS = factory());
})();
