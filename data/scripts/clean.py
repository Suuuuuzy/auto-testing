pkg_prefix  = "../newcrawl/pkg"
import shutil, os
from tqdm import tqdm
files = os.listdir(pkg_prefix)
with open('tmp.txt', 'w') as f:
    for i in files:
        whole_path = os.path.join(pkg_prefix, i)
        if not (".wxapkg") in i and os.path.isdir(whole_path):
            f.write(whole_path + '\n')
            # print(whole_path)
            # shutil.rmtree(whole_path)

for i in tqdm(files):
    whole_path = os.path.join(pkg_prefix, i)
    if not (".wxapkg") in i and os.path.isdir(whole_path):
        shutil.rmtree(whole_path)