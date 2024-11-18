import os
import time
import logging
import subprocess
from logger import setup_logger
from concurrent.futures import ThreadPoolExecutor, as_completed

# Setup logging
logger = setup_logger(__name__, "pipeline_docker.log", level=logging.DEBUG)

# Constants
MINIAPP_PATH = "/home/jackfromeast/Desktop/miniAppLeak/auto-testing/auto_minium/method_iterator/test/test_input"
# OUTPUT_PATH = "/home/suzy/temp/new_taint_log_file"
OUTPUT_PATH = "/home/jackfromeast/Desktop/miniAppLeak/auto-testing/auto_minium/method_iterator/test/tmp_outputs"
PREPROCESS_SCRIPT_PATH = "/home/jackfromeast/Desktop/miniAppLeak/auto-testing/data/data_utils/single_preprocess.py"
BIND_GENERATION_SCRIPT_PATH = "/home/jackfromeast/Desktop/miniAppLeak/auto-testing/MiniScope/src/static/generate_binds_for_jianjia.py"
WECHAT_DEV_TOOL = "/home/jackfromeast/Desktop/miniAppLeak/wechat-web-devtools-linux-nodebug"
DOCKER_IMAGE = "wechat-dev-tool"

# Run Configs
INPUT_FILE = "/media/dataj/wechat-devtools-linux/testing/auto-testing/data/appid_file/newcrawl_run.txt"
MAX_RUN = 1
COWORKER_COUNT = 1

def prepare_miniapp(app_path):
  """Prepare the miniapp for running by preprocessing and generating binds."""
  logger.info(f"Preparing miniapp at {app_path}")
  try:
    subprocess.run(['python', PREPROCESS_SCRIPT_PATH, app_path], check=True)
    logger.info(f"Preprocessed miniapp at {app_path}")
  except subprocess.CalledProcessError as e:
    logger.error(f"Failed to preprocess miniapp at {app_path}: {e}")
    return False
  
  for bind_file in ["bind_methods.json", "bind_methods_navi.json"]:
    bind_path = os.path.join(app_path, bind_file)
    if os.path.exists(bind_path):
      os.remove(bind_path)
      logger.debug(f"Removed old {bind_file} at {app_path}")

  try:
    subprocess.run(['python', BIND_GENERATION_SCRIPT_PATH, app_path], check=True)
    logger.info(f"Generated bind_methods.json and bind_methods_navi.json for {app_path}")
  except subprocess.CalledProcessError as e:
    logger.error(f"Failed to generate binds for miniapp at {app_path}: {e}")
    return False
  
  return True

def run_miniapp_test(appid, host_port):
  """Run a single miniapp within the docker container."""
  app_path = os.path.join(MINIAPP_PATH, appid)
  output_path = os.path.join(OUTPUT_PATH, appid)
  test_log_path = os.path.join(output_path, "autominium_test.log")

  if not os.path.exists(os.path.join(app_path, "app.json")):
    logger.error(f"No app.json found for {app_path}, skipping.")
    return
    
  if not prepare_miniapp(app_path):
    logger.error(f"Preparation failed for miniapp at {app_path}")
    return

  os.makedirs(output_path, exist_ok=True)
  with open(test_log_path, 'w') as log_file: pass

  container_name = f"wechat_dev_tool_{appid}"
  docker_command = [
    "sudo", "docker", "run", "--rm", "--name", container_name,
    "--network", "host",                                                                              # Use host network
    "-p", f"{host_port}:9222",                                                                                # Expose different ports for 9222 for different containers
    "-e", f"DISPLAY={os.environ.get('DISPLAY',':1')}",                                                # Set the display environment variable, should be :1 by default
    "-v", "/tmp/.X11-unix:/tmp/.X11-unix",                                                            # Mount the X11 socket         
    "-v", f"{app_path}:/app",                                                                         # Mount the miniapp package            
    "-v", f"{output_path}:/output",                                                                   # Mount the taint output               
    "-v", f"{output_path}/autominium_test.log:/run/autominium_test.log",                              # Mount minium test log
    "-v", f"{WECHAT_DEV_TOOL}:/wechat-web-devtools-linux-nodebug:ro",                                 # Mount the instrumented wechat dev tool       
    "-v", "/dev/disk/by-id:/dev/disk/by-id",                                                          # Used by the wechat dev tool
    f"{DOCKER_IMAGE}"
  ]
  logger.debug("Command:" + " ".join(docker_command))
  
  try:
    logger.info(f"Starting Docker run for appid {appid} with a 5-minute timeout (container: {container_name}).")
    process = subprocess.Popen(docker_command) 
    process.wait(timeout=300)
    logger.info(f"Docker run completed successfully for appid {appid} (container: {container_name})")

  except subprocess.TimeoutExpired:
    logger.warning(f"Docker run timed out for appid {appid}. Stopping container {container_name}.")

    stop_command = ["sudo", "docker", "stop", container_name]
    subprocess.run(stop_command, check=False)
    
    time.sleep(5)
    inspect_command = ["sudo", "docker", "inspect", "-f", "{{.State.Running}}", container_name]
    result = subprocess.run(inspect_command, capture_output=True, text=True)
    
    if "true" in result.stdout:
      kill_command = ["sudo", "docker", "kill", container_name]
      subprocess.run(kill_command, check=False)
      logger.warning(f"Docker container {container_name} forcefully killed after timeout.")

  except Exception as e:
    logger.error(f"Error occurred while running Docker for appid {appid} (container: {container_name}): {e}")

  finally:
    try: 
      rm_command = ["sudo", "docker", "rm", "-f", container_name]
      subprocess.run(rm_command, check=False)
    except Exception as e:
      pass
    logger.info(f"Cleaned up container {container_name}")

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

def schedule(miniapp_ids):
    """
    Schedule the processing of multiple miniapps concurrently, each in its own thread.
    """
    with ThreadPoolExecutor(max_workers=COWORKER_COUNT) as executor:
      future_to_appid = {
            executor.submit(run_miniapp_test, appid, base_port + i): appid 
            for i, appid in enumerate(miniapp_ids[:MAX_RUN])
      }    
      
      for future in as_completed(future_to_appid):
        appid = future_to_appid[future]
        try:
            future.result()
            logger.info(f"Successfully processed miniapp {appid}")
        except Exception as e:
            logger.error(f"Error processing miniapp {appid}: {e}")

def main():
  miniapp_ids = read_miniapp_ids(INPUT_FILE)
  miniapp_ids = ["wx0a7e8d29ab6f0b31"]
  logger.info(f"Read {len(miniapp_ids)} miniapp IDs from {INPUT_FILE}")
  schedule(miniapp_ids)

if __name__ == "__main__":
  # run_miniapp_test("wxb8117b7a11d006cb")
  main()