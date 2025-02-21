module.exports = {
  hex_md5: r,
  b64_md5: function (r) {
    return g(n(a(r), 8 * r.length));
  },
  str_md5: function (r) {
    return i(n(a(r), 8 * r.length));
  },
};
function r(r) {
  return h(n(a(r), 8 * r.length));
}
function n(r, n) {
  (r[n >> 5] |= 128 << n % 32), (r[14 + (((n + 64) >>> 9) << 4)] = n);
  for (
    var t = 1732584193, a = -271733879, i = -1732584194, h = 271733878, g = 0;
    g < r.length;
    g += 16
  ) {
    var l = t,
      v = a,
      d = i,
      A = h;
    (t = e(t, a, i, h, r[g + 0], 7, -680876936)),
      (h = e(h, t, a, i, r[g + 1], 12, -389564586)),
      (i = e(i, h, t, a, r[g + 2], 17, 606105819)),
      (a = e(a, i, h, t, r[g + 3], 22, -1044525330)),
      (t = e(t, a, i, h, r[g + 4], 7, -176418897)),
      (h = e(h, t, a, i, r[g + 5], 12, 1200080426)),
      (i = e(i, h, t, a, r[g + 6], 17, -1473231341)),
      (a = e(a, i, h, t, r[g + 7], 22, -45705983)),
      (t = e(t, a, i, h, r[g + 8], 7, 1770035416)),
      (h = e(h, t, a, i, r[g + 9], 12, -1958414417)),
      (i = e(i, h, t, a, r[g + 10], 17, -42063)),
      (a = e(a, i, h, t, r[g + 11], 22, -1990404162)),
      (t = e(t, a, i, h, r[g + 12], 7, 1804603682)),
      (h = e(h, t, a, i, r[g + 13], 12, -40341101)),
      (i = e(i, h, t, a, r[g + 14], 17, -1502002290)),
      (t = u(
        t,
        (a = e(a, i, h, t, r[g + 15], 22, 1236535329)),
        i,
        h,
        r[g + 1],
        5,
        -165796510
      )),
      (h = u(h, t, a, i, r[g + 6], 9, -1069501632)),
      (i = u(i, h, t, a, r[g + 11], 14, 643717713)),
      (a = u(a, i, h, t, r[g + 0], 20, -373897302)),
      (t = u(t, a, i, h, r[g + 5], 5, -701558691)),
      (h = u(h, t, a, i, r[g + 10], 9, 38016083)),
      (i = u(i, h, t, a, r[g + 15], 14, -660478335)),
      (a = u(a, i, h, t, r[g + 4], 20, -405537848)),
      (t = u(t, a, i, h, r[g + 9], 5, 568446438)),
      (h = u(h, t, a, i, r[g + 14], 9, -1019803690)),
      (i = u(i, h, t, a, r[g + 3], 14, -187363961)),
      (a = u(a, i, h, t, r[g + 8], 20, 1163531501)),
      (t = u(t, a, i, h, r[g + 13], 5, -1444681467)),
      (h = u(h, t, a, i, r[g + 2], 9, -51403784)),
      (i = u(i, h, t, a, r[g + 7], 14, 1735328473)),
      (t = o(
        t,
        (a = u(a, i, h, t, r[g + 12], 20, -1926607734)),
        i,
        h,
        r[g + 5],
        4,
        -378558
      )),
      (h = o(h, t, a, i, r[g + 8], 11, -2022574463)),
      (i = o(i, h, t, a, r[g + 11], 16, 1839030562)),
      (a = o(a, i, h, t, r[g + 14], 23, -35309556)),
      (t = o(t, a, i, h, r[g + 1], 4, -1530992060)),
      (h = o(h, t, a, i, r[g + 4], 11, 1272893353)),
      (i = o(i, h, t, a, r[g + 7], 16, -155497632)),
      (a = o(a, i, h, t, r[g + 10], 23, -1094730640)),
      (t = o(t, a, i, h, r[g + 13], 4, 681279174)),
      (h = o(h, t, a, i, r[g + 0], 11, -358537222)),
      (i = o(i, h, t, a, r[g + 3], 16, -722521979)),
      (a = o(a, i, h, t, r[g + 6], 23, 76029189)),
      (t = o(t, a, i, h, r[g + 9], 4, -640364487)),
      (h = o(h, t, a, i, r[g + 12], 11, -421815835)),
      (i = o(i, h, t, a, r[g + 15], 16, 530742520)),
      (t = f(
        t,
        (a = o(a, i, h, t, r[g + 2], 23, -995338651)),
        i,
        h,
        r[g + 0],
        6,
        -198630844
      )),
      (h = f(h, t, a, i, r[g + 7], 10, 1126891415)),
      (i = f(i, h, t, a, r[g + 14], 15, -1416354905)),
      (a = f(a, i, h, t, r[g + 5], 21, -57434055)),
      (t = f(t, a, i, h, r[g + 12], 6, 1700485571)),
      (h = f(h, t, a, i, r[g + 3], 10, -1894986606)),
      (i = f(i, h, t, a, r[g + 10], 15, -1051523)),
      (a = f(a, i, h, t, r[g + 1], 21, -2054922799)),
      (t = f(t, a, i, h, r[g + 8], 6, 1873313359)),
      (h = f(h, t, a, i, r[g + 15], 10, -30611744)),
      (i = f(i, h, t, a, r[g + 6], 15, -1560198380)),
      (a = f(a, i, h, t, r[g + 13], 21, 1309151649)),
      (t = f(t, a, i, h, r[g + 4], 6, -145523070)),
      (h = f(h, t, a, i, r[g + 11], 10, -1120210379)),
      (i = f(i, h, t, a, r[g + 2], 15, 718787259)),
      (a = f(a, i, h, t, r[g + 9], 21, -343485551)),
      (t = c(t, l)),
      (a = c(a, v)),
      (i = c(i, d)),
      (h = c(h, A));
  }
  return Array(t, a, i, h);
}
function t(r, n, t, e, u, o) {
  return c(((f = c(c(n, r), c(e, o))) << (a = u)) | (f >>> (32 - a)), t);
  var f, a;
}
function e(r, n, e, u, o, f, c) {
  return t((n & e) | (~n & u), r, n, o, f, c);
}
function u(r, n, e, u, o, f, c) {
  return t((n & u) | (e & ~u), r, n, o, f, c);
}
function o(r, n, e, u, o, f, c) {
  return t(n ^ e ^ u, r, n, o, f, c);
}
function f(r, n, e, u, o, f, c) {
  return t(e ^ (n | ~u), r, n, o, f, c);
}
function c(r, n) {
  var t = (65535 & r) + (65535 & n);
  return (((r >> 16) + (n >> 16) + (t >> 16)) << 16) | (65535 & t);
}
function a(r) {
  for (var n = Array(), t = 0; t < 8 * r.length; t += 8)
    n[t >> 5] |= (255 & r.charCodeAt(t / 8)) << t % 32;
  return n;
}
function i(r) {
  for (var n = "", t = 0; t < 32 * r.length; t += 8)
    n += String.fromCharCode((r[t >> 5] >>> t % 32) & 255);
  return n;
}
function h(r) {
  for (var n = "0123456789abcdef", t = "", e = 0; e < 4 * r.length; e++)
    t +=
      n.charAt((r[e >> 2] >> ((e % 4) * 8 + 4)) & 15) +
      n.charAt((r[e >> 2] >> ((e % 4) * 8)) & 15);
  return t;
}
function g(r) {
  for (var n = "", t = 0; t < 4 * r.length; t += 3)
    for (
      var e =
          (((r[t >> 2] >> ((t % 4) * 8)) & 255) << 16) |
          (((r[(t + 1) >> 2] >> (((t + 1) % 4) * 8)) & 255) << 8) |
          ((r[(t + 2) >> 2] >> (((t + 2) % 4) * 8)) & 255),
        u = 0;
      u < 4;
      u++
    )
      8 * t + 6 * u > 32 * r.length
        ? (n += "")
        : (n +=
            "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".charAt(
              (e >> (6 * (3 - u))) & 63
            ));
  return n;
}
