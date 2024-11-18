The Dockerfile used to run the test given a wechat mini program.

**Layout**
+ `/run`
  + Copied from the `/media/dataj/wechat-devtools-linux/testing/auto-testing/auto_minium/method_iterator/test/docker/run`
  + Contains the test script and entry point to start the taint analysis
+ `/wechat-web-devtools-linux-nodebug`
  + Mounted from the `/media/dataj/wechat-devtools-linux/wechat-web-devtools-linux-nodebug`
  + The `js-flag` in `package.json` has been adjusted to `/output` for outputing any taint logs
+ `/app`
  + Mounted from the `/media/dataj/wechat-devtools-linux/testing/auto-testing/data/newcrawl/pkg_unpack/wx-???`
  + Contains the current miniapp's source code
+ `/output`
  + Mounted from `/home/suzy/temp/new_taint_log_file/wx-???`
  + Contains the output taint logs during the dynamic analysis


**Docker Build**

```
docker build -t wechat-dev-tool .
```

**Docker Run**

```
xhost +local:root  # Enable X11 forwarding
#!/bin/bash

# Step 1: Create the container with a long-running command to keep it active
sudo docker create --name wechat_dev_tool_wxb8117b7a11d006cb \
  -e DISPLAY=:1 \
  --network host \
  -v /tmp/.X11-unix:/tmp/.X11-unix \
  -v /media/dataj/wechat-devtools-linux/testing/auto-testing/data/newcrawl/pkg_unpack/wxb8117b7a11d006cb:/app \
  -v /media/dataj/wechat-devtools-linux/testing/auto-testing/auto_minium/method_iterator/test/outputs/wxb8117b7a11d006cb:/output \
  -v /media/dataj/wechat-devtools-linux/wechat-web-devtools-linux-nodebug:/wechat-web-devtools-linux-nodebug \
  -v /dev/disk/by-id:/dev/disk/by-id \
  wechat-dev-tool /bin/sh -c "tail -f /dev/null"

# Step 2: Copy files to the container
sudo docker cp /media/dataj/wechat-devtools-linux/testing/auto-testing/auto_minium/method_iterator/test/docker/minium \
  wechat_dev_tool_wxb8117b7a11d006cb:/usr/local/lib/python3.8/dist-packages/

# Step 3: Start the container in detached mode to keep it running in the background
sudo docker start wechat_dev_tool_wxb8117b7a11d006cb

# Step 4: Attach to the container's shell
sudo docker exec -it wechat_dev_tool_wxb8117b7a11d006cb /bin/bash

# Optional: Remove the container after exiting
sudo docker container rm -f wechat_dev_tool_wxb8117b7a11d006cb
```