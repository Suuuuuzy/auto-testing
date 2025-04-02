import os
import subprocess

def decode_dir(base_dir):
    if os.path.isdir(base_dir):
        print(f"Processing directory: {base_dir}")
        # Add any processing logic you need here
        # For example, list files in this subdirectory
        miniapps = os.listdir(base_dir)
        for miniapp in miniapps:
            miniapp_dir = os.path.join(base_dir, miniapp)
            for file in os.listdir(miniapp_dir):
                if file.endswith(".log") or file.endswith("_decoded"):
                    continue
                file_path = os.path.join(miniapp_dir, file)
                if os.path.isdir(file_path):
                    continue
                if os.path.getsize(file_path)==0:
                    os.remove(file_path)
                else:
                    decode_file(file_path)
                    
def decode_file(input_file):
    decode_command = "/media/dataj/Documents/capnproto-install-clang/bin/capnp decode /media/dataj/jianjia_nwjs55/src/v8/src/taint_tracking/protos/logrecord.capnp TaintLogRecord"
    # Run the decode command using subprocess
    output_file = input_file+ '_decoded'
    if os.path.exists(output_file):
        print(f">>>> Already decoded {input_file}")
        return
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

def get_logs_for_miniapp(miniapp_id):    
    minnie_task_path_base = "/media/dataj/wechat-devtools-linux/testing/auto-testing/auto_minium/method_iterator/test/tasks"
    folders = os.listdir(minnie_task_path_base)
    folders = [i for i in folders if i not in ["miniTracker_gt"] ]

    for folder in folders:
        folder_path = os.path.join(minnie_task_path_base, folder, "output")
        run_tmp = os.listdir(folder_path)
        # print(run_tmp)
        if miniapp_id in run_tmp:
            logs = [i for i in os.listdir(os.path.join(folder_path, miniapp_id)) if i.endswith("_decoded")]
            logs = [os.path.join(folder_path, miniapp_id, i) for i in logs]
            return logs
    return None

def reduce_single_miniapp(miniapp_id):
    logs = get_logs_for_miniapp(miniapp_id)
    if not logs:
        print(f"Not detected for {miniapp_id}")
        return

    print(f"Processing {len(logs)} logs for {miniapp_id}")
    reduced = {}
    # cnt = 0
    # all_records = []
    # for log in logs:
    #     same_frame_cnt = 0
    #     useful_records = reduce_log(log)
    #     unique_records = []
    #     for i in useful_records:
    #         same = False
    #         for j in all_records:
    #             if len(all_records)==2:
    #                 print("============")
    #                 print(i)
    #                 print(j)
    #             if same_frames(i, j) and same_content(i, j):
    #                 # print('same!')
    #                 same = True
    #                 break
    #         if not same:
    #             i['new_id'] = cnt
    #             cnt += 1
    #             unique_records.append(i)
    #             all_records.append(i)
    #     # all_records.extend(unique_records)
    #     reduced[log] = unique_records
    #     print(f'{log.split("/")[-1]} has {len(unique_records)} useful records')
    
    # return reduced

def main():
    base_dir = "/media/dataj/wechat-devtools-linux/testing/auto-testing/auto_minium/method_iterator/test/tasks/taintmini_sample_list_100/output"
    # 1. decode the dir
    # decode_dir(base_dir)
    
    # 2. reduce the results
    miniapp_id = "wx01fb885ac525f07d"

if __name__ == "__main__":
    main()
