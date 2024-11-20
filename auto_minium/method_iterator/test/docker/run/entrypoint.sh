#!/bin/bash

# Warm up the container
rm -rf /root/.config/wechat-devtools/Default/
/wechat-web-devtools-linux-nodebug/bin/wechat-devtools & sleep 15 && pkill -f wechat

# A daemon process to keep the test running
max_attempts=3
for attempt in $(seq 1 $max_attempts); do
  # Start the main Python script
  python3 /run/main.py
  
  # Check exit status of the Python script
  if [ $? -ne 0 ]; then
    echo "Process exited with non-zero status, restarting..."
  else
    echo "Process exited, restarting..."
  fi
  
  # If the /run/autominium_test.log file has the following line, exit the loop
  # timeout_decorator.timeout_decorator.TimeoutError: 'Timed Out'
  if grep -q "Timed Out" /run/autominium_test.log; then
    echo "Timed out, exiting..."
    break
  fi

  sleep 2
done

if [ "$attempt" -eq "$max_attempts" ]; then
  echo "Reached maximum attempts ($max_attempts), exiting..."
fi

# Start the warmup exercises
# rm -rf /root/.config/wechat-devtools/Default/
# /wechat-web-devtools-linux-nodebug/bin/wechat-devtools & sleep 8 && pkill -f wechat
# cd /run && python3 sanity.py
