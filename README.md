**master branch: windows/mac**

**main branch: Linux**


## minium: auto_minium/test5_find_pages_and_inputs

* test/basedef.py --> 一些utility function for minium

* test/test_minium.py --> 每个miniprogram run的test case。所有以“test"开头的function都会被跑

* test/main.py --> handle 每个miniprogram跑minitest的码

* test/pipeline.py -->iterate整个folder，分别跑每个miniprogram
pipeline.py 需改参数：
    1. project_path：装所有miniprogram的folder
    2. dev_tool_path：wechat devtool cli path。linux应该是  "{root_dir}/wechat-web-devtools-linux/bin/wechat-devtools-cli"
    3. script_path: main.py的full path或者relative path
    4. run_python_script里面config的path。config.json是当场create的（create config的function是上面那个generate_config)所以应该在跑python的那一层 + config.json

**executables: python pipeline.py**

## jest: jest_wechat_miniprogram/test2

* jest_wechat_miniprogram/jest.config.js -->对应跑的jest的configuration
需改参数：
    1. baseTestDir：当前test所在的folder，应该是"{root_dir}/test2”

* python_utils/ -->用于提前extract每个miniprogram对应的pages。因为jest在compilation 的时候就定了test的数量，所以需要在跑之前提前知道跑多少个miniprogram和page

* python_utils/test_json.py --> helper class PageQuery used in utils.py

* python_utils/utils.py --> 负责create local server来create json file （我之后看一下应该可以改简单点，当时请教chatgpt他这么写的）
utils.py需改参数：
    1. project_path：装所有miniprogram的folder，应该跟minium的project_path是同一个

* python_utils/get_json.py --> 在local server开的情况下download所有page info

* python_utils/output.json -->跑完python_utils，这里应该存有所有的miniprogram和对应的pages

* data.js / new_data.js --> 从python_utils/output.json转移过来的miniprogram data。具体转移如下executable

* home.spec.js --> 主码。所有test的地方
home.spec.js需改参数：
    1. import { project_and_pages } from "./new_data"：根据前面data所存的js file以及data的名字，这里可能需要改
    2. cliPath：wechat devtool cli path。linux应该是  "{root_dir}/wechat-web-devtools-linux/bin/wechat-devtools-cli"。应该跟minium的dev_tool_path是同一个
    3. projectPath：同utils.py的project_path
    4. screen_shot_file：存screenshot的地方。


**executable:**
1. 可能需要一些必须的npm install。包括但可能多于：
 - jest
 - babel
 - miniprogram-automator

2. 开两个terminal，首先在一边跑 python3 python_utils/utils.py，server开了之后在另一边跑python3 python_utils/get_json.py。跑完后output.json里面应该会出现对应data

3. copy output.json里面的所有东西，paste到一个js file里面，然后在所有data之前写 export const project_and_pages = （variable 名字project_and_pages可以随意变化，但需要对应home.spec.js里面的

4. 退到jest_wechat_miniprogram (我的npm好像是install在那里的）。跑npm test

## wxml parser: wxml_parser

* .vscode --> 里面有相应的configuration参数。在gcc的standard library上，还使用了 "nlohmann/json.hpp"来读取miniprogram里面的app.json

* utils.h / utils.cpp --> 一些helper function和 #define block

* Attribute.h --> 任何出现在element的tag里面的attribute存储使用的base class

* HTMLTokenizer.h / HTMLTokenizer.cpp --> 文件的tokenizer。使用的标准是HTML Standard (https://html.spec.whatwg.org/)，根据miniprogram 使用tokenize的报错情况进行了修改。修改的主要部分用 "// SPECIAL CASE FOR WXML:"标出

* Node.h --> 定义parser 搭建AST使用的所有node classes。分别是 Node (virtual base class); RootNode (root for AST); ElementWrapperNode (any tag); AttributeNode (tag attributes, name + value); DataNode (any text data)

* WXMLDocumentParser.h / WXMLDocumentParser.cpp --> parser class

* test_script.cpp --> main script，用来检测并记录一个miniprogram里面所有页面与bind相关的attribute。还没有进行下一步的信息提取处理，所以暂时只会显示bind method, 使用 function，和当前element的AST
  
* debug_script.cpp --> main script，用来debug单个wxml的parse / tokenize error

**executables** (在Makefile中定义的）

1. make/make parse --> compile出executable parse，用来运行test_script.cpp
   
3. make debug --> compile出executable debug，用来运行debug_script.cpp
