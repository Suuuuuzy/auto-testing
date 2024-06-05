import os, subprocess

if __name__ == "__main__":
    RUNNING_DIR = "/home/bella-xia/auto-testing/data/0_passing_groundtruth"
    running_miniproprogram_num = len(os.listdir(RUNNING_DIR))
    for i in range(running_miniproprogram_num):
        print(f"running miniprogram #{i}")
        subprocess.run(["/home/bella-xia/auto-testing/wxml_parser/parse", str(i)])