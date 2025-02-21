import os
import subprocess

decode_command = "/media/dataj/Documents/capnproto-install-clang/bin/capnp decode /media/dataj/jianjia_nwjs55/src/v8/src/taint_tracking/protos/logrecord.capnp TaintLogRecord"
# base_dir = "/media/dataj/wechat-devtools-linux/testing/auto-testing/auto_minium/method_iterator/test/tmp_outputs"
# base_dir = "/media/dataj/wechat-devtools-linux/testing/auto-testing/auto_minium/method_iterator/test/tasks/over_10k/output"
# base_dir = "/media/dataj/wechat-devtools-linux/testing/auto-testing/auto_minium/method_iterator/test/outputs-mach0/outputs"
base_dir = "/media/dataj/wechat-devtools-linux/testing/auto-testing/auto_minium/method_iterator/test/tasks/miniTracker_gt/outputs"

def process_output(base_dir):
    items = os.listdir(base_dir)
    # items = ["wx2c348cf579062e56"]
    
    # Process each item in the base directory
    for item in items:
        print(">>>> appid:", item)
        item_path = os.path.join(base_dir, item)
        
        # Check if it's a directory (assuming all items are directories like wx0a1d85d7e51e923f)
        if os.path.isdir(item_path):
            print(f"Processing directory: {item_path}")
            
            # Add any processing logic you need here
            # For example, list files in this subdirectory
            files = os.listdir(item_path)
            for file in files:
                if file.endswith(".log") or file.endswith("_decoded"):
                    continue
                file_path = os.path.join(item_path, file)
                print(">>>> file_path: ", file_path)
                if os.path.isdir(file_path):
                    continue
                if os.path.getsize(file_path)==0:
                    os.remove(file_path)
                else:
                    decode_file(file_path)
                    
def decode_file(input_file):
    # Run the decode command using subprocess
    output_file = input_file+ '_decoded'
    # print(output_file)
    with open(input_file, 'rb') as infile, open(output_file, 'wb') as outfile:
        try:
            result = subprocess.run(
                f"{decode_command}",
                stdin=infile,
                stdout=outfile,
                shell=True,
                check=True
            )
            print(f">>>> Decoded {input_file} successfully.")

            # Remove the original file if decoding was successful
            # os.remove(input_file)

        except subprocess.CalledProcessError as e:
            print(f"Decoding failed for {input_file}. Error: {e}")

process_output(base_dir)