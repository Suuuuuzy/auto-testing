import os

def gen_leftover_ids():
    id_file = "../get_abstract_numbers/unpacked_in_meta.txt"
    with open(id_file, "r") as f:
        ids = f.readlines()
    ids = [i.strip() for i in ids]
    ids = set(ids)
    
    unpack_path = "/media/dataj/wechat-devtools-linux/testing/auto-testing/data/newcrawl/pkg_unpack/"
    minnie_task_path_base = "/media/dataj/wechat-devtools-linux/testing/auto-testing/auto_minium/method_iterator/test/tasks"
    folders = os.listdir(minnie_task_path_base)
    folders = [i for i in folders if i not in ["miniTracker_gt"] ]

    run_ids = []
    for folder in folders:
        folder_path = os.path.join(minnie_task_path_base, folder, "output")
        run_tmp = os.listdir(folder_path)
        run_ids.extend(run_tmp)
    run_ids = set([unpack_path + i for i in run_ids])
    
    leftover_ids = list(ids - run_ids)
    return  leftover_ids

def main():
    leftover_ids = gen_leftover_ids()
    print(f"Leftover ids: {len(leftover_ids)}")
    with open("minnie_leftover_ids.txt", "w") as f:
        for i in leftover_ids:
            f.write(i + "\n")
    
if __name__ == "__main__":
    main()