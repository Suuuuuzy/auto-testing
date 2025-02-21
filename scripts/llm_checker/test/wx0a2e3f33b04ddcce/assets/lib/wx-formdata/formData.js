var r = require("../../../@babel/runtime/helpers/toConsumableArray"),
  t = require("./mimeMap.js");
function e(r) {
  var t = r.lastIndexOf("/");
  return r.substr(t + 1);
}
function n(e, n, a, o) {
  var i,
    u,
    f = "",
    c = !!o;
  (f += e + "\r\n"),
    (f += 'Content-Disposition: form-data; name="' + n + '"'),
    c
      ? ((f += '; filename="' + o + '"\r\n'),
        (f +=
          "Content-Type: " +
          (function (r) {
            var e = r.lastIndexOf("."),
              n = t[r.substr(e)];
            return n || "application/octet-stream";
          })(o) +
          "\r\n\r\n"))
      : ((f += "\r\n\r\n"), (f += a));
  for (var p = [], s = 0; s < f.length; s++) {
    var l;
    (l = p).push.apply(l, r(f.utf8CodeAt(s)));
  }
  if (c) {
    var h = new Uint8Array(a);
    p = p.concat(Array.prototype.slice.call(h));
  }
  return (
    (i = p).push.apply(i, r("\r".utf8CodeAt())),
    (u = p).push.apply(u, r("\n".utf8CodeAt())),
    p
  );
}
(String.prototype.utf8CodeAt = function (r) {
  var t = [],
    e = 0,
    n = this.charCodeAt(r);
  return (
    n < 128
      ? (t[e++] = n)
      : n < 2048
      ? ((t[e++] = (n >> 6) | 192), (t[e++] = (63 & n) | 128))
      : 55296 == (64512 & n) &&
        r + 1 < this.length &&
        56320 == (64512 & this.charCodeAt(r + 1))
      ? ((n = 65536 + ((1023 & n) << 10) + (1023 & this.charCodeAt(++r))),
        (t[e++] = (n >> 18) | 240),
        (t[e++] = ((n >> 12) & 63) | 128),
        (t[e++] = ((n >> 6) & 63) | 128),
        (t[e++] = (63 & n) | 128))
      : ((t[e++] = (n >> 12) | 224),
        (t[e++] = ((n >> 6) & 63) | 128),
        (t[e++] = (63 & n) | 128)),
    t
  );
}),
  (module.exports = function () {
    var t = wx.getFileSystemManager(),
      a = {},
      o = [];
    (this.append = function (r, t) {
      return (a[r] = t), !0;
    }),
      (this.appendFile = function (r, n) {
        var a = t.readFileSync(n);
        return (
          a instanceof ArrayBuffer &&
          (o.push({ name: r, buffer: a, fileName: e(n) }), !0)
        );
      }),
      (this.getData = function () {
        return (function (t, e) {
          var a =
              "wxmpFormBoundary" +
              (function () {
                for (var r = "", t = 0; t < 17; t++) {
                  var e = parseInt(62 * Math.random());
                  r +=
                    e <= 9
                      ? e
                      : e <= 35
                      ? String.fromCharCode(e + 55)
                      : String.fromCharCode(e + 61);
                }
                return r;
              })(),
            o = "--" + a,
            i = o + "--",
            u = [];
          if (t && "[object Object]" == Object.prototype.toString.call(t))
            for (var f in t) u = u.concat(n(o, f, t[f]));
          if (e && "[object Array]" == Object.prototype.toString.call(e))
            for (var c in e) {
              var p = e[c];
              u = u.concat(n(o, p.name, p.buffer, p.fileName));
            }
          for (var s = [], l = 0; l < i.length; l++)
            s.push.apply(s, r(i.utf8CodeAt(l)));
          return (
            (u = u.concat(s)),
            {
              contentType: "multipart/form-data; boundary=" + a,
              buffer: new Uint8Array(u).buffer,
            }
          );
        })(a, o);
      });
  });
