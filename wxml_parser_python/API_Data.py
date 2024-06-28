from enum import Enum
from typing import List

class LIFECYCLE_CALLBACKS(Enum):
    onLaunch = 0
    onShow = 1
    onHide = 2
    onError = 3
    onLoad = 4
    onReady = 5
    onUnload = 6
    onRouteDone = 7

class EVENT_HANDLER_CALLBACKS(Enum):
    onError = 8,
    onPageNotFound = 9
    onUnhandledRejection = 10
    onThemeChange = 11
    onPullDownRefresh = 12
    onReachBottom = 13
    onShareAppMessage = 14
    onShareTimeline = 15
    onAddToFavorites = 16
    onPageScroll = 17
    onResize = 18
    onTabItemTap = 19
    onSaveExitState = 20


class SENSITIVE_API(Enum):
    
    getUserInfo = 32 # 收集你的微信昵称、头像,
    getUserProfile = 33  # 收集你的微信昵称、头像,
    # <button open - type = userInfo>, # 收集你的微信昵称、头像,
    getLocation = 34                  # 收集你的位置信息,
    getFuzzyLocation = 25              # 收集你的位置信息,
    onLocationChange = 26           # 收集你的位置信息,
    startLocationUpdate = 27          # 收集你的位置信息,
    startLocationUpdateBackground = 28 # 收集你的位置信息,
    choosePoi = 29                    # 收集你的位置信息,
    chooseLocation = 30              # 收集你的位置信息,
    chooseAddress = 31                # 收集你的地址,
    chooseInvoiceTitle = 32           # 收集你的发票信息,
    chooseInvoice = 33             # 收集你的发票信息,
    getWeRunData = 34                  # 收集你的微信运动步数,
        #<button open - type = getPhoneNumber>, #收集你的手机号,
    chooseLicensePlate = 35   # 收集你的车牌号,
    chooseImage = 36           # 收集你选中的照片或视频信息,
    chooseMedia = 37            # 收集你选中的照片或视频信息,
    chooseVideo = 38            # 收集你选中的照片或视频信息,
    chooseMessageFile = 39       # 收集你选中的文件,
    startRecord = 40             # 访问你的麦克风,
    getRecorderManager = 41      # 访问你的麦克风,
    joinVoIPChat = 42            # 访问你的麦克风,
    createCameraContext = 43     # 访问你的摄像头,
    createVKSession = 44         # 访问你的摄像头,
    createLivePusherContext = 45 # 访问你的摄像头,
        #<camera>,                      #访问你的摄像头,
        #<live - pusher>,               #访问你的摄像头,
        #<voip - room>,                 #访问你的摄像头,
    openBluetoothAdapter = 46     # 访问你的蓝牙,
    createBLEPeripheralServer = 47 # 访问你的蓝牙,
    saveImageToPhotosAlbum = 48    # 使用你的相册（仅写入）权限,
    saveVideoToPhotosAlbum = 49    # 使用你的相册（仅写入）权限,
    addPhoneContact = 50           # 使用你的通讯录（仅写入）权限,
    addPhoneRepeatCalendar = 51   # 使用你的日历（仅写入）权限,
    addPhoneCalendar = 52          # 使用你的日历（仅写入）权限


class SINK_API(Enum):
    request = 64
    uploadFile = 65
    connectSocket = 66
    createTCPSocket = 67
    createUDPSocket = 68
    setStorageSync = 69
    setStorage = 70

class ROUTE_API(Enum):
    switchTab = 128
    reLaunch = 129
    redirectTo = 130
    navigateTo = 131
    navigateToSync = 132
    navigateBack = 133


class NAVIGATE_API(Enum):
    navigateToMiniProgram = 256
    navigateBackMiniProgram = 257
    exitMiniProgram = 258

BINDING_PREFIX : List[str] = [
            "mut-bind:",
            "capture-bind:",
            "capture-catch:",
            "bind:",
            "catch:",
            "bind",
            "catch"
        ]

BUBBLING_EVENTS : List[str] = [

            # The finger leaves the screen after it
            # taps and holds on the screen for more than 350 ms.
            # If an event callback function is specified and this event
            # is triggered, the tap event is not triggered.

            "longpress",

            # The finger leaves the screen after it
            # taps and holds on the screen for more than 350 ms
            # (it is recommended to use longpress event instead).
            
            "longtap",
            "tap",                # The finger leaves the screen after touch
            "transitionend",      # Triggered when a WXSS transition or wx.createAnimation animation ends
            "animationstart",     # Triggered when a WXSS animation starts
            "animationiteration", #  Triggered after an iteration of a WXSS animation ends
            "animationend",       # Triggered when a WXSS animation completes
            "touchstart",         # Finger touch starts
            "touchmove",          # Finger moves after touch
            "touchcancel",        # Finger touch is interrupted by call reminder, pop-up window, etc.
            "touchend",           # Finger touch ends
            "touchforcechange"    # Triggered when the screen is tapped again on an iPhone supporting 3D Touch.
]

NON_BUBBLING_BINDING_EVENTS : List[str] = [
        # Non - bubbling Events in Specific Compenonts

        #<button>
        "bindgetuserinfo",
        "bindgetphonenumber",
        "bindchooseavatar",
        "bindopensetting",
        "bindlaunchapp",
        # "bindsubmit", 原来 bindsubmit在这里，
        # 但微信小程序的documentation上没有记载bindsubmit为button的binding function，应该是form的
        # details see https:#developers.weixin.qq.com/miniprogram/dev/component/button.html

        #<scroll - view>
        "binddragstart",
        "binddragging",
        "binddragend",
        "bindscrolltoupper",
        "bindscrolltolower",
        "bindscroll",
        "bindrefresherpulling",
        "bindrefresherrefresh",
        "bindrefresherrestore",
        "bindrefresherabort",

        #<page - container>
        "bind:beforeenter",
        "bind:enter",
        "bind:afterenter",
        "bind:beforeleave",
        "bind:leave",
        "bind:afterleave",
        "bind:clickoverlay",

        #<movable - view>
        "bindscale",

        #<cover - image>
        "bindload",
        "binderror",

        
        # bindchange has multiple possibilities, include but not limited to
        # <movable-view>
        # <checkbox-group>
        # <picker>
        # <slider>
        
        "bindchange",

        #<editor>
        "bindready",
        "bindstatuschange",

        #<form>
        "bindreset",
        "catchreset",
        "bindsubmit",
        "catchsubmit",
        # form 这里应该还有bindsubmit
        # details see https : # developers.weixin.qq.com/miniprogram/dev/component/form.html

        #<input>
        
        # the three components below:

        # "bindfocus",
        # "bindblur",
        # "bindinput",

        # are applicable for both input and editor
        
        "bindfocus",
        "bindblur",
        "bindinput",

        "bindconfirm",
        "bindkeyboardheightchange",
        "bindnicknamereview",

        #<picker>
        "bindcancel",
        "bindcolumnchange", # mode = multiSelector

        #<picker - view>
        "bindpickstart",
        "bindpickend",

        #<slider>
        "bindchanging",

        #<textarea>
        "bindlinechange",

        #<progress>
        "bindactiveend",

        #<swiper>
        "bindtransition",
        "bindanimationfinish",

        #<navigator> /<functional - page - navigator>
        "bindsuccess",
        "bindfail",
        "bindcomplete",
        # "bindcancel",
        #  written here but navigator does not have a bindcancel attribute

        #<audio>
        "bindplay",
        "bindpause",
        "bindtimeupdate",
        "bindended",

        #<camera>
        "bindstop",
        "bindinitdone",
        "bindscancode",

        #<video>
        "bindfullscreenchange",
        "bindwaiting",
        "bindprogress",
        "bindloadedmetadata",
        "bindcontrolstoggle",
        "bindenterpictureinpicture",
        "bindleavepictureinpicture",
        "bindseekcomplete",

        #<live - player>
        "bindstatechange",
        "bindnetstatus",
        "bindaudiovolumenotify",

        #<map>
        "bindmarkertap",
        "bindlabeltap",
        "bindcontroltap",
        "bindcallouttap",
        "bindupdated",
        "bindregionchange",
        "bindpoitap",
        "bindanchorpointtap",
]