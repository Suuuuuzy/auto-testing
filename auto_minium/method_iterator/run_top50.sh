# generate index
find /media/dataj/wechat-devtools-linux/testing/auto-testing/miniapp_data/newcrawl/top50/packages_unpack -maxdepth 1 -type d -name "wx*" > ../../miniapp_data/appid_file/top50.txt
./test/pipeline.py --input ../../miniapp_data/appid_file/top50.txt