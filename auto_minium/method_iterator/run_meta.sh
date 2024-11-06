# generate index
# find /media/dataj/wechat-devtools-linux/testing/auto-testing/data/newcrawl/pkg_unpack -maxdepth 1 -type d -name "wx*" > ../../data/appid_file/newcrawl.txt
cd /media/dataj/wechat-devtools-linux/testing/auto-testing/data/scripts
./gen_metacrawl_run.py
cd /media/dataj/wechat-devtools-linux/testing/auto-testing/auto_minium/method_iterator
./test/pipeline.py --input ../../data/appid_file/metacrawl_run.txt