function r(r) {
  var t = 0,
    n = r.length;
  if (n % 2 != 0) return null;
  n /= 2;
  for (var e = new Array(), o = 0; o < n; o++) {
    var i = r.substr(t, 2),
      s = parseInt(i, 16);
    e.push(s), (t += 2);
  }
  return e;
}
function t(r, t) {
  return 0 != (r & (1 << t));
}
module.exports = {
  hexString2Bytes: r,
  bytes2HexString: function (r) {
    for (var t = "", n = 0; n < r.length; n++) {
      var e = r[n].toString(16);
      1 == e.length && (e = "0" + e), (t += e);
    }
    return t.toUpperCase();
  },
  hexString2BytesBuffer: function (t) {
    var n = r(t);
    return new Uint8Array(n).buffer;
  },
  getBytesBooleanArray: function (r) {
    for (var t = new Array(), n = 3; n < 11; n++)
      for (var e = r[n], o = 0; o < 8; o++) t.push(!!(!0 & e)), (e >>= 1);
    return t;
  },
  parseAW: function (r) {
    var n = new Object(),
      e = r[2],
      o = r[3];
    return (
      (n.isTailbox = t(o, 5)),
      (n.isLock = t(o, 6) || t(o, 1)),
      (n.isFrontLamp = t(o, 7)),
      (n.isEngine = t(e, 2)),
      (n.isRightRearDoor = t(e, 4)),
      (n.isLeftRearDoor = t(e, 5)),
      (n.isRightFrontDoor = t(e, 6)),
      (n.isLeftFrontDoor = t(e, 7)),
      n
    );
  },
};
