function a() {
  l.length > 0 && o(l.shift());
}
function o(a) {
  (c.src = a), c.play();
}
function n() {
  var a = wx.getStorageSync("login_name", "") + "_sound_key",
    o = wx.getStorageSync(a);
  return (
    (void 0 != o && "" != o) || (o = "1"),
    console.log("voice:" + a + " :" + o),
    o
  );
}
function t() {
  return 1 == wx.getStorageSync("play_local");
}
var c = wx.createInnerAudioContext(),
  v = wx.createInnerAudioContext(),
  e = !1,
  l = [];
c.onPlay(function () {
  (e = !0), console.log("播放onPlay");
}),
  c.onEnded(function (o) {
    (e = !1), console.log("播放onEnded"), a();
  }),
  c.onStop(function (a) {
    (e = !1), console.log("播放onStop");
  }),
  c.onError(function (o) {
    (e = !1), a(), console.log("播放错误:" + JSON.stringify(o));
  });
var _ = {
    1: "_1.wav",
    2: "_2.wav",
    3: "_3.wav",
    4: "_4.wav",
    21: "_21.wav",
    64: "_64.wav",
    65: "_65.wav",
    71: "_71.wav",
    72: "_72.wav",
    79: "_79.wav",
    80: "_80.wav",
    81: "_81.wav",
    82: "_82.wav",
    83: "_83.wav",
    84: "_84.wav",
    85: "_85.wav",
    86: "_86.wav",
    87: "_87.wav",
    88: "_88.wav",
    89: "_89.wav",
    90: "_90.wav",
    91: "_91.wav",
    92: "_92.wav",
    93: "_93.wav",
    94: "_94.wav",
    106: "_106.wav",
    200: "_200.wav",
    300: "_300.wav",
    301: "_301.wav",
    302: "_302.wav",
    303: "_303.wav",
    304: "_304.wav",
    305: "_305.wav",
    306: "_306.wav",
    307: "_307.wav",
    lock: "lock.mp3",
    unlock: "unlock.mp3",
    ring: "ring.mp3",
    start: "start.mp3",
    start2: "start2.wav",
    yiy: "yiy.wav",
  },
  w = t() ? "/static/voice/" : "https://file.51carlink.com/car/voice/";
module.exports = {
  play: function (a) {
    if ((console.log("play:" + a + " can:" + n()), "1" == n())) {
      var v = _[a];
      if (void 0 != v) {
        var r = w + v;
        console.log("play:src:" + c.src), t() && e ? l.push(r) : o(r);
      }
    }
  },
  stop: function () {
    c.stop();
  },
  playStart: function () {
    "1" == n() && ((v.src = w + "start2.wav"), v.play());
  },
  stopStart: function () {
    v.stop();
  },
  can_play_sound: n,
  set_can_play: function (a) {
    var o = wx.getStorageSync("login_name", "") + "_sound_key";
    wx.setStorageSync(o, a), console.log("voice set:" + o + " :" + a);
  },
  play_press_voice: function (a) {
    "1" == n() && (a ? ((v.src = w + "start2.wav"), v.play()) : v.stop());
  },
  set_play_local: function (a) {
    (w = 1 == a ? "/static/voice/" : "https://file.51carlink.com/car/voice/"),
      wx.setStorageSync("play_local", a);
  },
  play_local: t,
};
