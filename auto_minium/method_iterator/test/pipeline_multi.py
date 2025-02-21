"""
@Description:
----------------------------------------
Run the pipeline with multi-worker at the same time.

@Steps:
----------------------------------------
1/ Setup the worker:
  - Create a package-{ID}.json under the folder /media/dataj/wechat-devtools-linux/wechat-web-devtools-linux-nodebug/package.nw/
  - Change the name field in the package.json to "wechat-devtools-{ID}"
  - Copy package-{ID}.json as package.json and run `/media/dataj/wechat-devtools-linux/wechat-web-devtools-linux-nodebug/bin/wechat-devtools`
    to warmup the cache folder for the current work under `~/.config/wechat-devtools-{ID}`

2/ Run the pipeline:
  - To start a test run with a workerID and appID:
  - Copy the package-{ID}.json as package.json and (update the output folder in the package.json)
  - And setup the config.json with analyzed appID and unused port
"""

import os
import time
import json
import logging
import subprocess
import threading
import psutil
from threading import Condition
from logger import setup_logger

# Setup logging
logger = setup_logger(__name__, "logs/pipeline_multi.log", level=logging.DEBUG)

# Constants
INPUT_FILE = "/media/dataj/wechat-devtools-linux/testing/auto-testing/data/appid_file/metacrawl_run.txt"
# INPUT_FILE = "/media/dataj/wechat-devtools-linux/testing/auto-testing/data/scripts/meta_data_checker/meta_json_output.json"
CONFIG_WORK_PATH = "/media/dataj/wechat-devtools-linux/testing/auto-testing/auto_minium/method_iterator/test/work"
CONFIG_READY_PATH = "/media/dataj/wechat-devtools-linux/testing/auto-testing/auto_minium/method_iterator/test"
# PACKAGE_JSON_READY_PATH = "/media/dataj/wechat-devtools-linux/wechat-web-devtools-linux-nodebug/package.nw"
PACKAGE_JSON_READY_PATH = "/media/dataj/wechat-devtools-linux/wechat-web-devtools-linux-nodebug/package.nw"
PREPROCESS_SCRIPT_PATH = "/media/dataj/wechat-devtools-linux/testing/auto-testing/data/data_utils/single_preprocess.py"
PREPROCESS_SCRIPT_GENERATE_BIND_PATH = "/media/dataj/wechat-devtools-linux/prework/MiniScope/src/static/generate_binds_for_jianjia.py"
# OUTPUT_PATH = "/media/dataj/wechat-devtools-linux/testing/auto-testing/auto_minium/method_iterator/test/tasks/miniTracker_gt/outputs"
OUTPUT_PATH = "/media/dataj/wechat-devtools-linux/testing/auto-testing/auto_minium/method_iterator/test/tasks/over_10k/output"
MINIAPP_PATH = "/media/dataj/wechat-devtools-linux/testing/auto-testing/data/newcrawl/pkg_unpack/"
# MINIAPP_PATH = "/media/dataj/wechat-devtools-linux/prework/MiniTracker/Benchmark/Dynamic"
# DEV_TOOL_PATH = "/media/dataj/wechat-devtools-linux/wechat-web-devtools-linux-nodebug/bin/wechat-devtools-cli"
DEV_TOOL_PATH = "/media/dataj/wechat-devtools-linux/wechat-web-devtools-linux-nodebug/bin/wechat-devtools-cli"

# Run Configs
TEST_CASE = "autominium_test" # "autominium_test" or "monkey_test"
MAX_RUN = 2000

class Worker():
  lock = threading.Lock()
  
  def __init__(self, wechat_account_name, id):
    self.wechat_account_name = wechat_account_name
    self.workid = id
    self.current_miniapp_id = None
    self.assigned_test_port = 9222 + self.workid
    
    self.per_test_timeout = 300
    self.lock_release_timeout = 5
    
    self.package_json_path = os.path.join(CONFIG_WORK_PATH, f"package-{self.workid}.json")
    self.config_json_path = os.path.join(CONFIG_WORK_PATH, f"config-{self.workid}.json")
  
  def _setup_package_json(self, miniapp_id):
    """
    Update the following fileds in the package.json file.
    - name
    - --taint_log_file
    """
    with open(self.package_json_path, 'r') as f:
      package_json = json.load(f)
    
    # Modify package.json based on miniapp_id and other specific settings
    package_json["name"] = f"wechat-devtools-{self.workid}"
    package_json["js-flags"] = f"--taint_log_file={OUTPUT_PATH}/{miniapp_id}/ --generate_undefined_properties"

    if not os.path.exists(os.path.join(OUTPUT_PATH, miniapp_id)):
      os.makedirs(os.path.join(OUTPUT_PATH, miniapp_id))
    
    # Write the updated package.json back
    with open(self.package_json_path, 'w') as f:
        json.dump(package_json, f)
    logger.info(f"Set up package.json for miniapp {miniapp_id} with worker {self.workid}")
    
  def _setup_config_json(self, miniapp_id):
    """
    Update the following fields config.json file
    - project_path
    - dev_tool_path
    - test_port
    """
    # Read existing config JSON and update fields
    with open(self.config_json_path, 'r') as f:
        config_json = json.load(f)

    config_json["project_path"] = os.path.join(MINIAPP_PATH, miniapp_id)
    config_json["dev_tool_path"] = DEV_TOOL_PATH
    config_json["test_port"] = self.assigned_test_port
    config_json["outputs"] = os.path.join(OUTPUT_PATH, miniapp_id)

    with open(self.config_json_path, 'w') as f:
        json.dump(config_json, f)
    logger.info(f"Set up config.json for miniapp {miniapp_id} with worker {self.workid}")

  def _sanity_check(self, miniapp_id):
    """
    The miniapp's folder should contain the following files:
    - app.json
    """
    miniapp_folder = os.path.join(MINIAPP_PATH, miniapp_id)
    app_json_path = os.path.join(miniapp_folder, "app.json")

    # Check if app.json exists

    if not miniapp_folder or not os.path.exists(app_json_path):
        logger.error(f"Sanity check failed: app.json not found for miniapp {miniapp_id}")
        return False
    logger.info(f"Sanity check passed for miniapp {miniapp_id}")
    return True

  def _preprocess_miniapp(self, miniapp_id):
    """ Preprocess the miniapp """
    miniapp_folder = os.path.join(MINIAPP_PATH, miniapp_id)
    subprocess.run(['python', PREPROCESS_SCRIPT_PATH, miniapp_folder], check=True)
    logger.info(f"Preprocessed miniapp {miniapp_id}")
    
    # Regenrate the bind_methods.json file
    bind_json_file = os.path.join(miniapp_folder, "bind_methods.json")
    bind_navi_json_file = os.path.join(miniapp_folder, "bind_methods_navi.json")
    
    if os.path.exists(bind_json_file):
      os.remove(bind_json_file)
    if os.path.exists(bind_navi_json_file):
      os.remove(bind_navi_json_file)
    
    if (not os.path.exists(bind_json_file)) and (not os.path.exists(bind_navi_json_file)):
      subprocess.run(['python', PREPROCESS_SCRIPT_GENERATE_BIND_PATH, miniapp_folder])
      logger.info(f"Generate bind_methods.json for {miniapp_folder}")
  
  def _cleanup(self):
    """ pkill -9 -f wechat-devtools-{self.workid} """
    try:
      pkill_command = f"pkill -9 -f wechat-devtools-{self.workid}"
      subprocess.run(pkill_command, shell=True, check=True)
    except Exception as e:
      pass
    
  def _copy_and_run(self, miniapp_id):
    """
    Wait for the GLOBAL_RUN_LOCK to be released
    Copy the package-{ID}.json as package.json to the PACKAGE_JSON_READY_PATH
    Copy the config-{ID}.json as config.json to the CONFIG_READY_PATH
    Start the test: run the test_run function in a new process
    Release the GLOBAL_RUN_LOCK
    """
    Worker.lock.acquire()
    logger.info(f"Worker {self.workid} acquired the lock for miniapp {miniapp_id}")
    
    try:
      # Cleanup
      self._cleanup()
      
      # Perform file copy actions
      package_dest = os.path.join(PACKAGE_JSON_READY_PATH, "package.json")
      config_dest = os.path.join(CONFIG_READY_PATH, "config.json")
      subprocess.run(['cp', self.package_json_path, package_dest], check=True)
      subprocess.run(['cp', self.config_json_path, config_dest], check=True)

      # Run test in a separate process with a specified log file path

      log_file_path = os.path.join(OUTPUT_PATH, miniapp_id, f"{TEST_CASE}.log")
      process = subprocess.Popen(['python3', '-c', f'from main import maintest; maintest("{TEST_CASE}", "{log_file_path}")'])
      logger.info(f"Start the process: {process.pid} for miniapp {miniapp_id}")
      
      # Start a timer thread to release the lock after `self.lock_release_timeout` seconds
      lock_release_thread = threading.Thread(target=self._release_lock_after_timeout)
      lock_release_thread.start()

      try:
        # Wait for the process to complete or timeout
        process.wait(timeout=self.per_test_timeout)
      except subprocess.TimeoutExpired:
        logger.warning(f"Worker {self.workid} test run for miniapp {miniapp_id} exceeded timeout of {self.per_test_timeout} seconds.")
        
        process.terminate()
        time.sleep(2) # Allow time for minium process to gracefully terminate
        
        self._cleanup()
        logger.info(f"Worker {self.workid} process killed for exceeding the timeout.")

      logger.info(f"Worker {self.workid} finished test for miniapp {miniapp_id}")

    finally:
      # If lock is still held after process completion, release it
      if Worker.lock.locked():
          Worker.lock.release()
          logger.info(f"Worker {self.workid} released the lock after process completion.")
  
  def _get_child_processes(self, parent_pid):
    """Recursively find all child processes of a given parent process."""
    try:
      logger.info(f"Parent PID: {parent_pid}")
      parent = psutil.Process(parent_pid)
    except psutil.NoSuchProcess:
      return []
    return parent.children(recursive=True)
  
  def _release_lock_after_timeout(self):
    """
    Releases the lock after the specified `self.lock_release_timeout` duration.
    """
    time.sleep(self.lock_release_timeout)
    if Worker.lock.locked():
      Worker.lock.release()
      logger.info(f"Worker {self.workid} released the lock after {self.lock_release_timeout} seconds.")

  def run(self, miniapp_id):
    """ Entry point for running the pipeline """
    if not self._sanity_check(miniapp_id):
      return
    
    self._setup_package_json(miniapp_id)
    self._setup_config_json(miniapp_id)
    self._preprocess_miniapp(miniapp_id)
    self._copy_and_run(miniapp_id)

# def gen_miniapp_ids():
  # cd /media/dataj/wechat-devtools-linux/testing/auto-testing/data/scripts
  # python gen_metacrawl_run.py
  
def read_miniapp_ids(input_file):
  """
  Read the list of miniapp IDs from the input file.
  Assume the file looks like:
  /media/dataj/wechat-devtools-linux/testing/auto-testing/data/newcrawl/pkg_unpack/wx41dd898b0c72cb6b
  /media/dataj/wechat-devtools-linux/testing/auto-testing/data/newcrawl/pkg_unpack/wx6c3023b405ae14e3
  /media/dataj/wechat-devtools-linux/testing/auto-testing/data/newcrawl/pkg_unpack/wx4f72a01856d7b901
  """
  miniapp_ids = []
  with open(input_file, 'r') as f:
      for line in f:
          # Extract the miniapp ID from the path and add it to the list
          miniapp_id = line.strip().split('/')[-1]
          miniapp_ids.append(miniapp_id)
  return miniapp_ids

def read_good_miniapp_ids(input_file):
  """
  Read the list of miniapp IDs from the input file.
  Assume the file looks like:
  {
    "wx2c348cf579062e56": {
        "score": 4.0,
        "score_times": 106607,
        "title": "美团外卖丨外卖美食奶茶咖啡水果"
    },
    "wxde8ac0a21135c07d": {
        "score": 4.5,
        "score_times": 83923,
        "title": "美团丨外卖美食买菜酒店电影购物"
    },
  }
  """
  miniapp_ids = []
  with open(input_file, 'r', encoding='utf-8') as file:
    data = json.load(file)
    
    # Sort miniapp IDs based on score_times in descending order
    sorted_miniapp_ids = sorted(data.keys(), key=lambda id: data[id]['score_times'], reverse=True)
    
    return sorted_miniapp_ids


def main():
  # gen_miniapp_ids()
  miniapp_ids = read_miniapp_ids(INPUT_FILE)

  # miniapp_ids = ["wxd6aa6a9b753a535c", "wxba24d24f8e8e85c5"]

  logger.info(f"Read {len(miniapp_ids)} miniapp IDs from {INPUT_FILE}")

  # Assuming the Worker class and miniapp_ids list are defined
  workers = [Worker("Zhengyu", 0), Worker("Yichao", 1)]
  num_workers = len(workers)
  num_miniapps = min(len(miniapp_ids), MAX_RUN)

  # Calculate how many miniapp IDs each worker should process
  miniapps_per_worker = num_miniapps // num_workers
  logger.info(f"Ditributing {miniapps_per_worker} miniapp IDs to each worker")
  
  # Create tasks for each worker
  def create_task(worker, miniapp_ids_slice):
      def task():
          for miniapp_id in miniapp_ids_slice:
              worker.run(miniapp_id)
      return task

  # Create and start threads for each worker
  threads = []
  for i, worker in enumerate(workers):
      # Define the slice of miniapp_ids each worker should process
      start_idx = i * miniapps_per_worker
      end_idx = (i + 1) * miniapps_per_worker if i < num_workers - 1 else num_miniapps
      miniapp_ids_slice = miniapp_ids[start_idx:end_idx]
      
      # Create a thread for each worker
      task = create_task(worker, miniapp_ids_slice)
      thread = threading.Thread(target=task)
      threads.append(thread)
      thread.start()

  # Wait for all threads to complete
  for thread in threads:
      thread.join()

  logger.info("Both worker tasks have completed.")

def single_worker_test():
  miniapp_ids = read_miniapp_ids(INPUT_FILE)
  miniapp_ids = ["wxb937e3d0b3ca117e"]
  logger.info(f"Read {len(miniapp_ids)} miniapp IDs from {INPUT_FILE}")
  
  worker = Worker("Zhengyu-0", 0)
  for miniapp_id in miniapp_ids[:]:
    worker.run(miniapp_id)
  
if __name__ == "__main__":
  # main()
  single_worker_test()