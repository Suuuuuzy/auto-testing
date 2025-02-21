import os, random
# basedir = "/media/dataj/wechat-devtools-linux/testing/auto-testing/auto_minium/method_iterator/test/tmp_outputs"python 
basedir = "/media/dataj/wechat-devtools-linux/testing/auto-testing/auto_minium/method_iterator/test/tasks/over_10k/output"
app_basedir = "/media/dataj/wechat-devtools-linux/testing/auto-testing/data/newcrawl/pkg_unpack"
NUM = 100

def select_random_subdirs(basedir, num_subdirs=100):
    # Get a list of all subdirectories in the base directory
    subdirs = [d for d in os.listdir(basedir) if os.path.isdir(os.path.join(basedir, d))]
    print(len(subdirs))
    # If there are fewer than num_subdirs, return all subdirectories
    if len(subdirs) <= num_subdirs:
        return subdirs
    cnt = 0
    # Randomly select the specified number of subdirectories
    random_subdirs = random.sample(subdirs, num_subdirs)
    for subdir in random_subdirs:
        reports = [i for i in os.listdir(os.path.join(basedir, subdir)) if i.endswith("_decoded")]
        # print(len(reports))
        cnt += len(reports)
    print(cnt)
    with open("appid.txt", "w") as f:
        for i in random_subdirs:
            full_path = os.path.join(app_basedir, i)
            f.write(full_path + "\n")
    return random_subdirs

selected_subdirs = select_random_subdirs(basedir)
print(selected_subdirs)

