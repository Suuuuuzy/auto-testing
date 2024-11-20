'''
Author: yopofeng yopofeng@tencent.com
Date: 2022-10-12 11:50:48
LastEditors: yopofeng yopofeng@tencent.com
LastEditTime: 2023-08-16 15:04:40
FilePath: /py-minium/minium/framework/miniprogram.py
Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
'''
class MiniProgram:
    class __MiniProgram(object):
        def __init__(self, unique_key, **kwargs) -> None:
            self.unique_key = unique_key
            self.update(**kwargs)

        def update(self, **kwargs):
            for k in kwargs:
                setattr(self, k, kwargs[k])

    instances = {}
    def __init__(self, unique_key, **kwargs):
        unique_key = unique_key or ""
        if not MiniProgram.instances.get(unique_key):
            MiniProgram.instances[unique_key] = MiniProgram.__MiniProgram(unique_key, **kwargs)
        else:
            MiniProgram.instances[unique_key].update(**kwargs)
        self.instance = MiniProgram.instances[unique_key]
        
    def __getattr__(self, name):
        return getattr(self.instance, name, None)

    @classmethod
    def get_instance(cls, unique_key):
        return MiniProgram.instances.get(unique_key or "")
    
