#!/bin/bash
# /media/dataj/wechat-devtools-linux/wechat-web-devtools-linux-nodebug/bin/wechat-devtools
/media/dataj/wechat-devtools-linux/wechat-web-devtools-linux-nodebug/bin/wechat-devtools-cli auto --project "/media/dataj/wechat-devtools-linux/testing/auto-testing/data/newcrawl/pkg_unpack/wx0a1d85d7e51e923f" --auto-port 9223
# /media/dataj/wechat-devtools-linux/wechat-web-devtools-linux-nodebug/bin/wechat-devtools 
# /media/dataj/wechat-devtools-linux/wechat-web-devtools-linux-nodebug/nwjs/nw /media/dataj/wechat-devtools-linux/wechat-web-devtools-linux-nodebug/package.nw --load-extension=/home/suzy/.config/wechat-devtools-0/WeappPlugin --custom-devtools-frontend=file:///media/dataj/wechat-devtools-linux/wechat-web-devtools-linux-nodebug/package.nw/js/ideplugin/inspector

  # --network host \
  # -p 9228:9222 \
  # --ipv6 \

# Step 1: Create the container with a long-running command to keep it active
# sudo docker create --name wechat_dev_tool_wxb8117b7a11d006cb \
#   -e DISPLAY=:1 \
#   --network ip6net \
#   -v /tmp/.X11-unix:/tmp/.X11-unix \
#   -v /media/dataj/wechat-devtools-linux/testing/auto-testing/data/newcrawl/pkg_unpack/wxb8117b7a11d006cb:/app \
#   -v /media/dataj/wechat-devtools-linux/testing/auto-testing/auto_minium/method_iterator/test/outputs/wxb8117b7a11d006cb:/output \
#   -v /media/dataj/wechat-devtools-linux/wechat-web-devtools-linux-nodebug:/wechat-web-devtools-linux-nodebug:cached \
#   -v /dev/disk/by-id:/dev/disk/by-id \
#   --memory=16g \
#   --cpus=8 \
#   wechat-dev-tool /bin/sh -c "tail -f /dev/null"

# # Step 2: Copy files to the container
# sudo docker cp /media/dataj/wechat-devtools-linux/testing/auto-testing/auto_minium/method_iterator/test/docker/minium \
#   wechat_dev_tool_wxb8117b7a11d006cb:/usr/local/lib/python3.8/dist-packages/

# # Step 3: Start the container in detached mode to keep it running in the background
# sudo docker start wechat_dev_tool_wxb8117b7a11d006cb

# # Step 4: Attach to the container's shell
# sudo docker exec -it wechat_dev_tool_wxb8117b7a11d006cb /bin/bash

# # Optional: Remove the container after exiting
# sudo docker container rm -f wechat_dev_tool_wxb8117b7a11d006cb

rsync -avh --progress /media/dataj/wechat-devtools-linux/prework/MiniScope jackfromeast@10.161.159.131:/home/jackfromeast/Desktop/miniAppLeak/auto-testing

tar -cf pkg_unpack.tar.gz -C 


/media/dataj/wechat-devtools-linux/testing/auto-testing/data/newcrawl/pkg_unpack


tar cz - /media/dataj/wechat-devtools-linux/testing/auto-testing/data/newcrawl/pkg_unpack | ssh jackfromeast@10.161.159.131 "cd /home/jackfromeast/Desktop/miniAppLeak/auto-testing/data/newcrawl/pkg_unpack && tar xvz"
tar cz -C /home/jackfromeast/Desktop/miniAppLeak/auto-testing/auto_minium/method_iterator/test/ outputs | ssh -p 30022 suzy@10.161.161.77 "tar xvz -C /media/dataj/wechat-devtools-linux/testing/auto-testing/auto_minium/method_iterator/test/outputs-mach0"