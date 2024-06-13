import os, subprocess

if __name__ == "__main__":
    RUNNING_DIR = "/home/bella-xia/auto-testing/data/0_passing_groundtruth"
    running_miniproprogram_num = len(os.listdir(RUNNING_DIR))
    for i in range(running_miniproprogram_num):
        output_file = f"_output_0{i}.log" if i < 10 else f"_output_{i}.log"
        output_err_file = f"_debug_0{i}.log" if i < 10 else f"_debug_{i}.log"
        print(f"running miniprogram #{i}")
        with open(output_file, "w") as f_out:
            with open(output_err_file, "w") as f_err:
                subprocess.run(["/home/bella-xia/auto-testing/wxml_parser/parse", str(i)],
                               stdout=f_out, stderr=f_err)