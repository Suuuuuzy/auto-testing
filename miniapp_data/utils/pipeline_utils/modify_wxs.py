import re, os
import logging
logger = logging.getLogger(__name__)

def format_wxs_style_attribute(file_path):
    try:

        content = """
        function example(a) {return a}
        
        function anotherExample(c, d) {
            return c + d}
        """
        # Read the file
        with open(file_path, 'r', encoding='utf-8') as file:
            content = file.read()

        patterns = [
              (r';(?!\n)', ';\n'), 
              (r'{(?!\n)', '{\n'),
              (r'(?!\n)}(?!\n)', '\n}\n'),  
              (r'(?!\n)}', '\n}'),
              (r'}(?!\n)', '}\n'),
              (r';\n+', ';\n'), 
              (r'{\n+', '{\n'),  
              (r'\n+}\n+', '\n}\n')
            ]

        # pattern = r'(?!\n)function(\s*)[a-zA-Z_][a-zA-Z_0-9]*(\s*)\([a-zA-Z_][a-zA-Z_0-9]*\)(\s*){'

# Replace the matched pattern with function definitions with newlines after '{'
        # replacement = r'\nfunction\1[a-zA-Z_][a-zA-Z_0-9]*\2(\3[a-zA-Z_][a-zA-Z_0-9]*\4) {\n'
        for pattern, replacement in patterns:
            content = re.sub(pattern, replacement, content)
        # print(content)

        # Write the modified content back to the file
        with open(file_path, 'w', encoding='utf-8') as file:
            file.write(content)

        # print(f"Style attributes for page {file_path} formatted successfully.")
    except Exception as e:
        print(f"An error occurred: {e}")

def find_wxs_files(directory):
    for root, dirs, files in os.walk(directory):
      for file in files:
            if file=="bem.wxs":
              logger.info("found bem.wxs at:{}".format(os.path.join(root, file)))
              format_wxs_style_attribute(os.path.join(root, file))

    
def parse_wxs():
    text = '''var touchstart = (function (event,ownerInstance){
  var ins = event.instance;var st = ins.getState();if (st.disable)return;;if (!st.size)return;;st.isMoving = true;st.startX = event.touches[(0)].pageX;st.startY = event.touches[(0)].pageY;st.firstAngle = 0
});
var touchmove = (function (event,ownerInstance){
  var ins = event.instance;
  var st = ins.getState();
  if (!st.size || !st.isMoving)
    return;;
  var pagex = event.touches[(0)].pageX - st.startX;
  var pagey = event.touches[(0)].pageY - st.startY;
  if (st.firstAngle === 0){
    st.firstAngle = Math.abs(pagex) - Math.abs(pagey)
  };
  if (st.firstAngle < 0){
    return
  };
  
  var movex = pagex > 0 ? Math.min(st.max,pagex):Math.max(-st.max,pagex);
  if (st.out){
    if (movex < 0)
      return;;
    ins.setStyle(({'transform':'translateX(' + (st.transformx + movex) + 'px)','transition':'',}));
    var btns = ownerInstance.selectAllComponents('.btn');
    var transformTotal = 0;
    var len = btns.length;
    var i = len - 1;
    for(;i >= 0;i--){
      var transform = st.size.buttons[((nt_4=(i),null==nt_4?undefined:'number'=== typeof nt_4?nt_4:""+nt_4))].width / st.max * movex;var transformx = st.size.buttons[((nt_5=(i),null==nt_5?undefined:'number'=== typeof nt_5?nt_5:""+nt_5))].max - Math.min(st.size.buttons[((nt_6=(i),null==nt_6?undefined:'number'=== typeof nt_6?nt_6:""+nt_6))].max,transform + transformTotal);btns[((nt_7=(i),null==nt_7?undefined:'number'=== typeof nt_7?nt_7:""+nt_7))].setStyle(({'transform':'translateX(' + (-transformx) + 'px)','transition':'',}));
      transformTotal += transform
    };
      return(false)
    };
    if (movex > 0)
      movex = 0;;
    ins.setStyle(({'transform':'translateX(' + movex + 'px)','transition':'',}));
    st.transformx = movex;
    var btns = ownerInstance.selectAllComponents('.btn');
    var transformTotal = 0;
    var len = btns.length;
    var i = len - 1;
    for(;i >= 0;i--){
      var transform = st.size.buttons[((nt_8=(i),null==nt_8?undefined:'number'=== typeof nt_8?nt_8:""+nt_8))].width / st.max * movex;var transformx = Math.max(-st.size.buttons[((nt_9=(i),null==nt_9?undefined:'number'=== typeof nt_9?nt_9:""+nt_9))].max,transform + transformTotal);btns[((nt_10=(i),null==nt_10?undefined:'number'=== typeof nt_10?nt_10:""+nt_10))].setStyle(({'transform':'translateX(' + transformx + 'px)','transition':'',}));st.size.buttons[((nt_11=(i),null==nt_11?undefined:'number'=== typeof nt_11?nt_11:""+nt_11))].transformx = transformx;transformTotal += transform};
      return(false)
    }
    );
  var touchend = (function (event,ownerInstance){
    var ins = event.instance;
    var st = ins.getState();
    
    if (!st.size || !st.isMoving)
      return;;
    if (st.firstAngle < 0){
      return
    };
    
    var duration = st.duration / 1000;
    st.isMoving = false;
    var btns = ownerInstance.selectAllComponents('.btn');
    var len = btns.length;var i = len - 1;
    if (Math.abs(event.changedTouches[(0)].pageX - st.startX) < st.throttle || event.changedTouches[(0)].pageX - st.startX > 0){
      st.out = false;ins.setStyle(({'transform':'translate3d(0px, 0, 0)','transition':'transform ' + (duration) + 's',
    }));
    for(;i >= 0;i--){
      btns[((nt_14=(i),null==nt_14?undefined:'number'=== typeof nt_14?nt_14:""+nt_14))].setStyle(({'transform':'translate3d(0px, 0, 0)','transition':'transform ' + (duration) + 's',}))
    };
    ownerInstance.callMethod('hide');
    return
  };
  
  showButtons(ins,ownerInstance,duration);
  ownerInstance.callMethod('show')});
  var REBOUNCE_TIME = 0.2;
  var showButtons = (function (ins,ownerInstance,withDuration){
    var st = ins.getState();
    if (!st.size)return;;var rebounceTime = st.rebounce ? REBOUNCE_TIME:0;var movex = st.max;st.out = true;var btns = ownerInstance.selectAllComponents('.btn');var rebounce = st.rebounce || 0;var len = btns.length;var i = len - 1;ins.setStyle(({'transform':'translate3d(' + (-movex - rebounce) + 'px, 0, 0)','transition':'transform ' + (withDuration) + 's',}));st.transformx = -movex;var transformTotal = 0;for(;i >= 0;i--){var transform = st.size.buttons[((nt_15=(i),null==nt_15?undefined:'number'=== typeof nt_15?nt_15:""+nt_15))].width / st.max * movex;var transformx = (-(transform + transformTotal));btns[((nt_16=(i),null==nt_16?undefined:'number'=== typeof nt_16?nt_16:""+nt_16))].setStyle(({'transform':'translate3d(' + transformx + 'px, 0, 0)','transition':'transform ' + (withDuration ? withDuration + rebounceTime:withDuration) + 's',}));st.size.buttons[((nt_17=(i),null==nt_17?undefined:'number'=== typeof nt_17?nt_17:""+nt_17))].transformx = transformx;transformTotal += transform}});var innerHideButton = (function (ownerInstance){var ins = ownerInstance.selectComponent('.left');var st = ins.getState();if (!st.size)return;;var duration = st.duration ? st.duration / 1000:0;var btns = ownerInstance.selectAllComponents('.btn');var len = btns.length;var i = len - 1;ins.setStyle(({'transform':'translate3d(0px, 0, 0)','transition':'transform ' + (duration) + 's',}));st.transformx = 0;for(;i >= 0;i--){btns[((nt_18=(i),null==nt_18?undefined:'number'=== typeof nt_18?nt_18:""+nt_18))].setStyle(({'transform':'translate3d(0px, 0, 0)','transition':'transform ' + (duration) + 's',}));st.size.buttons[((nt_19=(i),null==nt_19?undefined:'number'=== typeof nt_19?nt_19:""+nt_19))].transformx = 0}});var hideButton = (function (event,ownerInstance){innerHideButton(ownerInstance);ownerInstance.callMethod('buttonTapByWxs',({index:event.currentTarget.dataset.index,data:event.currentTarget.dataset.data,}));return(false)});var sizeReady = (function (newVal,oldVal,ownerInstance,ins){var st = ins.getState();if (newVal && newVal.button && newVal.buttons){st.size = newVal;st.transformx = 0;var max = 0;var len = newVal.buttons.length;var i = newVal.buttons.length - 1;var total = 0;for(;i >= 0;i--){max += newVal.buttons[((nt_20=(i),null==nt_20?undefined:'number'=== typeof nt_20?nt_20:""+nt_20))].width;total += newVal.buttons[((nt_21=(i),null==nt_21?undefined:'number'=== typeof nt_21?nt_21:""+nt_21))].width;newVal.buttons[((nt_22=(i),null==nt_22?undefined:'number'=== typeof nt_22?nt_22:""+nt_22))].max = total;newVal.buttons[((nt_23=(i),null==nt_23?undefined:'number'=== typeof nt_23?nt_23:""+nt_23))].transformx = 0};st.throttle = st.size.throttle || 40;st.rebounce = st.size.rebounce;st.max = max;ownerInstance.selectComponent('.right').setStyle(({'line-height':newVal.button.height + 'px',left:(newVal.button.width) + 'px',width:max + 'px',}));if (!st.size.disable && st.size.show){showButtons(ins,ownerInstance)}}});var disableChange = (function (newVal,oldVal,ownerInstance,ins){var st = ins.getState();st.disable = newVal});var durationChange = (function (newVal,oldVal,ownerInstance,ins){var st = ins.getState();st.duration = newVal || 400});var showChange = (function (newVal,oldVal,ownerInstance,ins){var st = ins.getState();st.show = newVal;if (st.disable)return;;if (st.show){showButtons(ins,ownerInstance,st.duration)} else {innerHideButton(ownerInstance)}});var rebounceChange = (function (newVal,oldVal,ownerInstance,ins){var st = ins.getState();st.rebounce = newVal});var transitionEnd = (function (event,ownerInstance){var ins = event.instance;var st = ins.getState();if (st.out && st.rebounce){console.log('transition rebounce',st.rebounce);ins.setStyle(({'transform':'translate3d(' + (-st.max) + 'px, 0, 0)','transition':'transform ' + REBOUNCE_TIME + 's',}))}});module.exports = ({touchstart:touchstart,touchmove:touchmove,touchend:touchend,hideButton:hideButton,sizeReady:sizeReady,disableChange:disableChange,durationChange:durationChange,showChange:showChange,rebounceChange:rebounceChange,transitionEnd:transitionEnd,});'''

# Example usage
if __name__ == '__main__':
    # wxs_FILE_PATH = 'C:/Users/zhiha/OneDrive/Desktop/auto-testing/miniapp_data/utils/bem-trial.wxs'
    # format_wxs_style_attribute(wxs_FILE_PATH)
    logging.basicConfig(filename='modify_wxs.log', level=logging.INFO)
    find_wxs_files("/media/data4/jianjia_data4/miniapp_data/WeMinT_dataset/groundtruth/miniprograms/wx94eb4215c646f0c4")