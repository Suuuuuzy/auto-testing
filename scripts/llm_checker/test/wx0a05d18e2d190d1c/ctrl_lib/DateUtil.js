function t(t) {
  var n = t.getFullYear(),
    r = t.getMonth() + 1,
    a = t.getDate(),
    u = t.getHours(),
    o = t.getMinutes(),
    g = t.getSeconds();
  return [n, r, a].map(e).join("-") + " " + [u, o, g].map(e).join(":");
}
function e(t) {
  return (t = t.toString())[1] ? t : "0" + t;
}
function n(t) {
  return 0 == (t = t.toString())[0] ? t[1] : t;
}
function r(t, n, r, a, u, o, g) {
  var i = new Date(t);
  i.setFullYear(i.getFullYear() + parseInt(n)),
    i.setMonth(i.getMonth() + parseInt(r)),
    i.setDate(i.getDate() + parseInt(a)),
    i.setHours(i.getHours() + parseInt(u)),
    i.setMinutes(i.getMinutes() + parseInt(o)),
    i.setSeconds(i.getSeconds() + parseInt(g));
  var s = [];
  return (
    (s[0] = i.getFullYear()),
    (s[1] = i.getMonth() + 1),
    (s[2] = i.getDate()),
    (s[3] = i.getHours()),
    (s[4] = i.getMinutes()),
    (s[5] = i.getSeconds()),
    s.map(e)
  );
}
function a(t, e, n, a) {
  return r(t, e, n, a, 0, 0, 0);
}
function u(t, n) {
  var r = a(t, 0, n, 0),
    u = new Date(r[0], r[1] - 1, 1),
    o = new Date(r[0], r[1], 0),
    g = [];
  return (
    (g[0] = r[0]),
    (g[1] = r[1]),
    (g[2] = u.getDate()),
    (g[3] = o.getDate()),
    g.map(e)
  );
}
function o(t) {
  if (t) {
    var e = t.replace(/-/g, "/");
    return new Date(e);
  }
}
module.exports = {
  getInterval: function (t, e) {
    var n = o(start_time).getTime();
    return o(end_time).getTime() - n;
  },
  formatTime: t,
  formatDate: function (t) {
    var n = new Date(t);
    return [n.getFullYear(), n.getMonth() + 1, n.getDate()].map(e).join("-");
  },
  formatDateAndTime: function (e) {
    return t(new Date(e));
  },
  dateTimeChange: r,
  dateChange: a,
  timeChange: function (t, e, n, a) {
    var u = r(t, 0, 0, 0, e, n, a),
      o = [];
    return (o[0] = u[3]), (o[1] = u[4]), (o[2] = u[5]), o;
  },
  monthStartAndEnd: u,
  yearStartAndEnd: function (t, n) {
    var r = a(t, n, 0, 0),
      u = [];
    return (
      (u[0] = r[0]), (u[1] = 1), (u[2] = 31), (u[3] = 12), (u[4] = 31), u.map(e)
    );
  },
  getDate: function () {
    var t = new Date(),
      n = [];
    return (
      (n[0] = t.getFullYear()),
      (n[1] = t.getMonth() + 1),
      (n[2] = t.getDate()),
      (n[3] = t.getHours()),
      (n[4] = t.getMinutes()),
      (n[5] = t.getSeconds()),
      n.map(e)
    );
  },
  getDateFormLong: function (t) {
    var n = new Date(t),
      r = [];
    return (
      (r[0] = n.getFullYear()),
      (r[1] = n.getMonth() + 1),
      (r[2] = n.getDate()),
      (r[3] = n.getHours()),
      (r[4] = n.getMinutes()),
      (r[5] = n.getSeconds()),
      r.map(e)
    );
  },
  getFutureDate1: function (t, e) {
    for (var n = [], r = 0; r < e; r++) {
      var u = a(t, 0, 0, r);
      n[r] = u[0] + "-" + u[1] + "-" + u[2];
    }
    return n;
  },
  getFutureDate2: function (t, e) {
    for (var r = [], u = 0; u < e; u++) {
      var o = a(t, 0, 0, u);
      (o = o.map(n)), (r[u] = o[2]);
    }
    return r;
  },
  getDaysOfMonth1: function (t) {
    for (
      var e = [],
        n = u(t, 0),
        r = new Date(n[0], n[1] - 1, n[2]).getTime(),
        o = n[3] - n[2] + 1,
        g = 0;
      g < o;
      g++
    )
      (n = a(r, 0, 0, g)), (e[g] = n[0] + "-" + n[1] + "-" + n[2]);
    return e;
  },
  getDaysOfMonth2: function (t) {
    for (var e = [], n = u(t, 0), r = n[3] - n[2] + 1, a = 0; a < r; a++)
      e[a] = a + 1;
    return e;
  },
  str2Date: o,
};
