# generate index
find /media/dataj/wechat-devtools-linux/testing/auto-testing/data/top50/packages_unpack -maxdepth 1 -type d -name "wx*" > ../../data/appid_file/top50.txt
./test/pipeline.py --input ../../data/appid_file/top50.txt