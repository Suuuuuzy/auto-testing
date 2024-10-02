# generate index
find /media/dataj/wechat-devtools-linux/testing/auto-testing/miniapp_data/newcrawl/pkg_unpack -maxdepth 1 -type d -name "wx*" > ../../miniapp_data/appid_file/newcrawl.txt
./test/pipeline.py --input ../../miniapp_data/appid_file/newcrawl.txt