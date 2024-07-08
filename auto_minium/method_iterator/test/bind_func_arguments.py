# text_input = """<script\x0Atype="text/javascript">javascript:alert("minium");</script>"""
text_input = "javascriptMinium"
# catchtap
bindtap_arg = {
                  "type":"tap",
                  "timeStamp":99793,
                  "target":{"id":"","offsetLeft":0,"offsetTop":596,"dataset":{}},
                  "currentTarget":{"id":"","offsetLeft":0,"offsetTop":596,"dataset":{}},
                  "mark":{},
                  "detail":{"x":213.546875,"y":622.328125},
                  "touches":[{"identifier":0,"pageX":213.546875,"pageY":622.328125,"clientX":213.546875,"clientY":116.328125,"force":1}],
                  "changedTouches":[{"identifier":0,"pageX":213.546875,"pageY":622.328125,"clientX":213.546875,"clientY":116.328125,"force":1}],
                  "mut":False,
                  "_userTap":True
                  }

bindblur_arg = {
    "type":"blur",
    "timeStamp":29914,
    "target":{"id":"","offsetLeft":0,"offsetTop":126,"dataset":{}},
    "currentTarget":{"id":"","offsetLeft":0,"offsetTop":126,"dataset":{}},
    "mark":{},
    "detail":{"value":text_input,"cursor":14},
    "mut":False,
    "_userTap":False
    }

bindinput_arg = {
    "type":"input",
    "timeStamp":1719778404943,
    "detail":{"value":text_input,"cursor":7,"keyCode":86},
    "target":{"id":"","dataset":{},"offsetTop":18,"offsetLeft":32},
    "currentTarget":{"id":"","dataset":{},"offsetTop":18,"offsetLeft":32},
    "touches":[]
    }

bindsubmit_arg = {
    "type":"submit",
    "timeStamp":58596,
    "target":{"id":"","offsetLeft":0,"offsetTop":642,"dataset":{}},
    "currentTarget":{"id":"","offsetLeft":0,"offsetTop":642,"dataset":{}},
    "mark":{},
    "detail":{"value":{"input":"","textarea":"","textarea2":""},"target":{"id":"","dataset":{},"offsetTop":964,"offsetLeft":0}},
    "mut":False,
    "_userTap":True
    }

bindconfirm_arg =  {
    "type":"confirm",
    "timeStamp":4418837,
    "target":{"id":"","offsetLeft":32,"offsetTop":18,"dataset":{}},
    "currentTarget":{"id":"","offsetLeft":32,"offsetTop":18,"dataset":{}},
    "mark":{},
    "detail":{"value":text_input},
    "mut":False,
    "_userTap":False
    }

bindlongtap_arg =  {
    "type":"longtap",
    "timeStamp":153385.19999980927,
    "target":{"id":"","offsetLeft":96,"offsetTop":514,"dataset":{}},
    "currentTarget":{"id":"","offsetLeft":96,"offsetTop":514,"dataset":{}},
    "touches":[{"identifier":"0","x":60.25,"y":24.515625}],
    "changedTouches":[{"identifier":"0","x":60.25,"y":24.515625}]
    }

# for buttons, we can find the elements and tap tho
# bindlongtap
# bindconfirm
reset_arg =  {
    "type":"reset",
    "timeStamp":13093,
    "target":{"id":"","offsetLeft":0,"offsetTop":0,"dataset":{}},
    "currentTarget":{"id":"","offsetLeft":0,"offsetTop":0,"dataset":{}},
    "mark":{},
    "detail":{"target":{"id":"","dataset":{},"offsetTop":336,"offsetLeft":0}},
    "mut":False,
    "_userTap":True
    }


bindtouchstart_arg = {
    "type":"touchstart",
    "timeStamp":49921.199999809265,
    "target":{"id":"","offsetLeft":0,"offsetTop":0,"dataset":{}},
    "currentTarget":{"id":"","offsetLeft":0,"offsetTop":0,"dataset":{}},
    "touches":[{"identifier":0,"x":150.46875,"y":92}],
    "changedTouches":[{"identifier":0,"x":150.46875,"y":92}]
    }

bindtouchmove_arg = {
    "type":"touchmove",
    "timeStamp":273127.80000019073,
    "target":{"id":"","offsetLeft":0,"offsetTop":0,"dataset":{}},
    "currentTarget":{"id":"","offsetLeft":0,"offsetTop":0,"dataset":{}},
    "touches":[{"identifier":0,"x":143.74224853515625,"y":89.68048095703125}],
    "changedTouches":[{"identifier":0,"x":143.74224853515625,"y":89.68048095703125}]
    }

bindtouchend_arg = {
    "type":"touchend",
    "timeStamp":273161.5,
    "target":{"id":"","offsetLeft":0,"offsetTop":0,"dataset":{}},
    "currentTarget":{"id":"","offsetLeft":0,"offsetTop":0,"dataset":{}},
    "touches":[],
    "changedTouches":[{"identifier":0,"x":148.65960693359375,"y":85.210205078125}]
    }

# bindchange
# bindgetuserinfo


trigger_arg_dic = {
                "bindtap": bindtap_arg,
                "catchtap": bindtap_arg,
                "bindblur": bindblur_arg,
                "bindinput": bindinput_arg,
                "bindsubmit": bindsubmit_arg,
                "catchsubmit": bindsubmit_arg,
                "bindconfirm": bindconfirm_arg,
                "bindlongtap": bindlongtap_arg,
                "bindtouchstart": bindtouchstart_arg,
                "bindtouchmove": bindtouchmove_arg,
                "catchtouchmove": bindtouchmove_arg,
                "bindtouchend": bindtouchend_arg
                }