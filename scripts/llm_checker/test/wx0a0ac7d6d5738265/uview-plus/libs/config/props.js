var r = require("../../../@babel/runtime/helpers/objectSpread2");
require("./config.js");
var e = require("./props/actionSheet.js"),
  s = require("./props/album.js"),
  p = require("./props/alert.js"),
  o = require("./props/avatar.js"),
  i = require("./props/avatarGroup.js"),
  u = require("./props/backtop.js"),
  t = require("./props/badge.js"),
  a = require("./props/button.js"),
  j = require("./props/calendar.js"),
  q = require("./props/carKeyboard.js"),
  c = require("./props/cell.js"),
  n = require("./props/cellGroup.js"),
  l = require("./props/checkbox.js"),
  d = require("./props/checkboxGroup.js"),
  b = require("./props/circleProgress.js"),
  m = require("./props/code.js"),
  I = require("./props/codeInput.js"),
  g = require("./props/col.js"),
  k = require("./props/collapse.js"),
  w = require("./props/collapseItem.js"),
  S = require("./props/columnNotice.js"),
  x = require("./props/countDown.js"),
  C = require("./props/countTo.js"),
  y = require("./props/datetimePicker.js"),
  h = require("./props/divider.js"),
  v = require("./props/empty.js"),
  G = require("./props/form.js"),
  L = require("./props/formItem.js"),
  N = require("./props/gap.js"),
  T = require("./props/grid.js"),
  A = require("./props/gridItem.js"),
  P = require("./props/icon.js"),
  B = require("./props/image.js"),
  f = require("./props/indexAnchor.js"),
  R = require("./props/indexList.js"),
  K = require("./props/input.js"),
  D = require("./props/keyboard.js"),
  M = require("./props/line.js"),
  E = require("./props/lineProgress.js"),
  F = require("./props/link.js"),
  O = require("./props/list.js"),
  U = require("./props/listItem.js"),
  z = require("./props/loadingIcon.js"),
  H = require("./props/loadingPage.js"),
  J = require("./props/loadmore.js"),
  Q = require("./props/modal.js"),
  V = require("./props/navbar.js"),
  W = require("./props/noNetwork.js"),
  X = require("./props/noticeBar.js"),
  Y = require("./props/notify.js"),
  Z = require("./props/numberBox.js"),
  $ = require("./props/numberKeyboard.js"),
  _ = require("./props/overlay.js"),
  rr = require("./props/parse.js"),
  er = require("./props/picker.js"),
  sr = require("./props/popup.js"),
  pr = require("./props/radio.js"),
  or = require("./props/radioGroup.js"),
  ir = require("./props/rate.js"),
  ur = require("./props/readMore.js"),
  tr = require("./props/row.js"),
  ar = require("./props/rowNotice.js"),
  jr = require("./props/scrollList.js"),
  qr = require("./props/search.js"),
  cr = require("./props/section.js"),
  nr = require("./props/skeleton.js"),
  lr = require("./props/slider.js"),
  dr = require("./props/statusBar.js"),
  br = require("./props/steps.js"),
  mr = require("./props/stepsItem.js"),
  Ir = require("./props/sticky.js"),
  gr = require("./props/subsection.js"),
  kr = require("./props/swipeAction.js"),
  wr = require("./props/swipeActionItem.js"),
  Sr = require("./props/swiper.js"),
  xr = require("./props/swipterIndicator.js"),
  Cr = require("./props/switch.js"),
  yr = require("./props/tabbar.js"),
  hr = require("./props/tabbarItem.js"),
  vr = require("./props/tabs.js"),
  Gr = require("./props/tag.js"),
  Lr = require("./props/text.js"),
  Nr = require("./props/textarea.js"),
  Tr = require("./props/toast.js"),
  Ar = require("./props/toolbar.js"),
  Pr = require("./props/tooltip.js"),
  Br = require("./props/transition.js"),
  fr = require("./props/upload.js"),
  Rr = r(
    r(
      r(
        r(
          r(
            r(
              r(
                r(
                  r(
                    r(
                      r(
                        r(
                          r(
                            r(
                              r(
                                r(
                                  r(
                                    r(
                                      r(
                                        r(
                                          r(
                                            r(
                                              r(
                                                r(
                                                  r(
                                                    r(
                                                      r(
                                                        r(
                                                          r(
                                                            r(
                                                              r(
                                                                r(
                                                                  r(
                                                                    r(
                                                                      r(
                                                                        r(
                                                                          r(
                                                                            r(
                                                                              r(
                                                                                r(
                                                                                  r(
                                                                                    r(
                                                                                      r(
                                                                                        r(
                                                                                          r(
                                                                                            r(
                                                                                              r(
                                                                                                r(
                                                                                                  r(
                                                                                                    r(
                                                                                                      r(
                                                                                                        r(
                                                                                                          r(
                                                                                                            r(
                                                                                                              r(
                                                                                                                r(
                                                                                                                  r(
                                                                                                                    r(
                                                                                                                      r(
                                                                                                                        r(
                                                                                                                          r(
                                                                                                                            r(
                                                                                                                              r(
                                                                                                                                r(
                                                                                                                                  r(
                                                                                                                                    r(
                                                                                                                                      r(
                                                                                                                                        r(
                                                                                                                                          r(
                                                                                                                                            r(
                                                                                                                                              r(
                                                                                                                                                r(
                                                                                                                                                  r(
                                                                                                                                                    r(
                                                                                                                                                      r(
                                                                                                                                                        r(
                                                                                                                                                          r(
                                                                                                                                                            r(
                                                                                                                                                              r(
                                                                                                                                                                r(
                                                                                                                                                                  r(
                                                                                                                                                                    r(
                                                                                                                                                                      r(
                                                                                                                                                                        r(
                                                                                                                                                                          r(
                                                                                                                                                                            r(
                                                                                                                                                                              r(
                                                                                                                                                                                r(
                                                                                                                                                                                  {},
                                                                                                                                                                                  e.ActionSheet
                                                                                                                                                                                ),
                                                                                                                                                                                s.Album
                                                                                                                                                                              ),
                                                                                                                                                                              p.Alert
                                                                                                                                                                            ),
                                                                                                                                                                            o.Avatar
                                                                                                                                                                          ),
                                                                                                                                                                          i.AvatarGroup
                                                                                                                                                                        ),
                                                                                                                                                                        u.Backtop
                                                                                                                                                                      ),
                                                                                                                                                                      t.Badge
                                                                                                                                                                    ),
                                                                                                                                                                    a.Button
                                                                                                                                                                  ),
                                                                                                                                                                  j.Calendar
                                                                                                                                                                ),
                                                                                                                                                                q.CarKeyboard
                                                                                                                                                              ),
                                                                                                                                                              c.Cell
                                                                                                                                                            ),
                                                                                                                                                            n.CellGroup
                                                                                                                                                          ),
                                                                                                                                                          l.Checkbox
                                                                                                                                                        ),
                                                                                                                                                        d.CheckboxGroup
                                                                                                                                                      ),
                                                                                                                                                      b.CircleProgress
                                                                                                                                                    ),
                                                                                                                                                    m.Code
                                                                                                                                                  ),
                                                                                                                                                  I.CodeInput
                                                                                                                                                ),
                                                                                                                                                g.Col
                                                                                                                                              ),
                                                                                                                                              k.Collapse
                                                                                                                                            ),
                                                                                                                                            w.CollapseItem
                                                                                                                                          ),
                                                                                                                                          S.ColumnNotice
                                                                                                                                        ),
                                                                                                                                        x.CountDown
                                                                                                                                      ),
                                                                                                                                      C.CountTo
                                                                                                                                    ),
                                                                                                                                    y.DatetimePicker
                                                                                                                                  ),
                                                                                                                                  h.Divider
                                                                                                                                ),
                                                                                                                                v.Empty
                                                                                                                              ),
                                                                                                                              G.Form
                                                                                                                            ),
                                                                                                                            L.GormItem
                                                                                                                          ),
                                                                                                                          N.Gap
                                                                                                                        ),
                                                                                                                        T.Grid
                                                                                                                      ),
                                                                                                                      A.GridItem
                                                                                                                    ),
                                                                                                                    P.Icon
                                                                                                                  ),
                                                                                                                  B.Image
                                                                                                                ),
                                                                                                                f.IndexAnchor
                                                                                                              ),
                                                                                                              R.IndexList
                                                                                                            ),
                                                                                                            K.Input
                                                                                                          ),
                                                                                                          D.Keyboard
                                                                                                        ),
                                                                                                        M.Line
                                                                                                      ),
                                                                                                      E.LineProgress
                                                                                                    ),
                                                                                                    F.Link
                                                                                                  ),
                                                                                                  O.List
                                                                                                ),
                                                                                                U.ListItem
                                                                                              ),
                                                                                              z.LoadingIcon
                                                                                            ),
                                                                                            H.LoadingPage
                                                                                          ),
                                                                                          J.Loadmore
                                                                                        ),
                                                                                        Q.Modal
                                                                                      ),
                                                                                      V.Navbar
                                                                                    ),
                                                                                    W.NoNetwork
                                                                                  ),
                                                                                  X.NoticeBar
                                                                                ),
                                                                                Y.Notify
                                                                              ),
                                                                              Z.NumberBox
                                                                            ),
                                                                            $.NumberKeyboard
                                                                          ),
                                                                          _.Overlay
                                                                        ),
                                                                        rr.Parse
                                                                      ),
                                                                      er.Picker
                                                                    ),
                                                                    sr.Popup
                                                                  ),
                                                                  pr.Radio
                                                                ),
                                                                or.RadioGroup
                                                              ),
                                                              ir.Rate
                                                            ),
                                                            ur.ReadMore
                                                          ),
                                                          tr.Row
                                                        ),
                                                        ar.RowNotice
                                                      ),
                                                      jr.ScrollList
                                                    ),
                                                    qr.Search
                                                  ),
                                                  cr.Section
                                                ),
                                                nr.Skeleton
                                              ),
                                              lr.Slider
                                            ),
                                            dr.StatusBar
                                          ),
                                          br.Steps
                                        ),
                                        mr.StepsItem
                                      ),
                                      Ir.Sticky
                                    ),
                                    gr.Subsection
                                  ),
                                  kr.SwipeAction
                                ),
                                wr.SwipeActionItem
                              ),
                              Sr.Swiper
                            ),
                            xr.SwipterIndicator
                          ),
                          Cr.Switch
                        ),
                        yr.Tabbar
                      ),
                      hr.TabbarItem
                    ),
                    vr.Tabs
                  ),
                  Gr.Tag
                ),
                Lr.Text
              ),
              Nr.Textarea
            ),
            Tr.Toast
          ),
          Ar.Toolbar
        ),
        Pr.Tooltip
      ),
      Br.Transition
    ),
    fr.Upload
  );
exports.defprops = Rr;
