function t(t, a) {
  return a < 72.004 || a > 137.8347 || t < 0.8293 || t > 55.8271;
}
function a(t, a) {
  var n = t * a,
    r = Math.sqrt(Math.abs(t)),
    s = t * Math.PI,
    h = a * Math.PI,
    M = 20 * Math.sin(6 * s) + 20 * Math.sin(2 * s),
    i = M,
    l = M;
  return (
    (i += 20 * Math.sin(h) + 40 * Math.sin(h / 3)),
    (l += 20 * Math.sin(s) + 40 * Math.sin(s / 3)),
    (i += 160 * Math.sin(h / 12) + 320 * Math.sin(h / 30)),
    (l += 150 * Math.sin(s / 12) + 300 * Math.sin(s / 30)),
    (i *= 2 / 3),
    (l *= 2 / 3),
    (i += 2 * t - 100 + 3 * a + 0.2 * a * a + 0.1 * n + 0.2 * r),
    (l += 300 + t + 2 * a + 0.1 * t * t + 0.1 * n + 0.1 * r),
    { lat: i, lng: l }
  );
}
function n(t, n) {
  var r = 0.006693421622965943,
    s = a(n - 105, t - 35),
    h = (t / 180) * Math.PI,
    M = Math.sin(h);
  M = 1 - r * M * M;
  var l = Math.sqrt(M);
  return (
    (s.lat = (180 * s.lat) / (((i * (1 - r)) / (M * l)) * Math.PI)),
    (s.lng = (180 * s.lng) / ((i / l) * Math.cos(h) * Math.PI)),
    s
  );
}
function r(a, r) {
  if (t(a, r)) return { lat: a, lng: r };
  var s = n(a, r);
  return { lat: a + s.lat, lng: r + s.lng };
}
function s(t, a) {
  var r = n(t, a);
  return { lat: t - r.lat, lng: a - r.lng };
}
function h(a, n) {
  if (t(a, n)) return { lat: a, lng: n };
  var r = n,
    s = a,
    h = Math.sqrt(r * r + s * s) + 2e-5 * Math.sin(s * Math.PI),
    M = Math.atan2(s, r) + 3e-6 * Math.cos(r * Math.PI),
    i = h * Math.cos(M) + 0.0065;
  return { lat: h * Math.sin(M) + 0.006, lng: i };
}
function M(a, n) {
  if (t(a, n)) return { lat: a, lng: n };
  var r = n - 0.0065,
    s = a - 0.006,
    h = Math.sqrt(r * r + s * s) - 2e-5 * Math.sin(s * Math.PI),
    M = Math.atan2(s, r) - 3e-6 * Math.cos(r * Math.PI),
    i = h * Math.cos(M);
  return { lat: h * Math.sin(M), lng: i };
}
var i = 6378137;
(exports.wgs2gcj = r),
  (exports.gcj2wgs = s),
  (exports.gcj2wgs_exact = function (t, a) {
    for (var n = t, s = a, h = n, M = s, i = 0; i < 30; i++) {
      (h = n), (M = s);
      var l = r(n, s);
      if (
        ((n -= t - l.lat),
        (s -= a - l.lng),
        Math.max(Math.abs(h - n), Math.abs(M - s)) < 1e-6)
      )
        break;
    }
    return { lat: n, lng: s };
  }),
  (exports.distance = function (t, a, n, r) {
    var s = Math.PI / 180,
      h = t * s,
      M = n * s,
      l =
        Math.cos(h) * Math.cos(M) * Math.cos((a - r) * s) +
        Math.sin(h) * Math.sin(M);
    return l > 1 && (l = 1), l < -1 && (l = -1), Math.acos(l) * i;
  }),
  (exports.gcj2bd = h),
  (exports.bd2gcj = M),
  (exports.wgs2bd = function (t, a) {
    var n = r(t, a);
    return h(n.lat, n.lng);
  }),
  (exports.bd2wgs = function (t, a) {
    var n = M(t, a);
    return s(n.lat, n.lng);
  });
