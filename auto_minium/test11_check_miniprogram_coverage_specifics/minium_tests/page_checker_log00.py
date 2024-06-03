import minium_tests.base_taint as base_taint
import json


class PageChecker(base_taint.BaseTaint):
    
    def test_goto_page_index(self):
        '''
        a little problematic: need to know what makes saveVideoToImageAlbum able to run
        '''
        PAGE = "pages/index/index"
        self.open_route("/" + PAGE)

        page_bind_infos = [
            {'bind_method' : 'bindinput',
             'function_call' : 'getInputValue',
             'element_tag' : 'input',
             'attribute' : {'bindinput' : 'getInputValue',
                            'class' : 'input-radius',
                            'placeholder': '请输入视频分享链接',
                            'value' : '\{\{videoShareUrl\}\}'},
            'data' : None},

            {'bind_method' : 'bindtap',
             'function_call' : 'handleSubtraction',
             'element_tag' : 'button',
             'attribute' :{'bindtap' : 'handleSubtraction',
                            'class' : 'button'},
            'data': '一键解析',
            'scriptdata': None},

            {'bind_method' : 'bindtap',
             'function_call' : 'clear',
             'element_tag' : 'button',
             'attribute' :{'bindtap' : 'clear',
                            'class' : 'clear'},
            'data': '清空',
            'scriptdata': None},


            {'bind_method' : 'bindtap',
             'function_call' : 'handleBtnClick',
             'element_tag' : 'button',
             'attribute' :{'bindtap' : 'handleBtnClick',
                            'class' : 'button2'},
            'data': '下载',
            'scriptdata': 'progress'}]
        
        for bind_info in page_bind_infos:
            if bind_info.get('bind_method') == 'bindtap':
                try:
                    selector_info = base_taint.SelectorInfo(
                        selector=bind_info.get('element_tag') + ", ." + 
                        bind_info.get('attribute').get('class'),
                        inner_text=None,
                        text_contains=bind_info.get('data'),
                        value=None
                    )
                    tapable_ele = self.get_element_using_selector(
                        selector_info=selector_info)
                    
                    return_args = self.hook_wx_methods_with_element_tap(
                        element=tapable_ele,
                        wx_methods=['getUserInfo', 'chooseInvoice', 
                                    'saveImageToPhotosAlbum', 'chooseAddress',
                                    'saveVideoToPhotosAlbum']
                    )

                    json_data =[{'page': PAGE,
                                 'method': bind_info.get('function_call'),
                                 'callback results': return_args}]
                    JSON_DIR = '/home/bella-xia/auto-testing/data/_auxiliary_data/wx4ce9c3cff6c3c610/page_checker.json'
                    with open(JSON_DIR, 'a', encoding='utf-8') as file:
                        json.dump(json_data, file, indent=4)

                except Exception as e:
                    print(f"running into error when testing bindtap function {bind_info.get('function_call')}: ", e)
                    continue
                

