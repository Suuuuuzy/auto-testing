import shutil
with open("perfm_ids.txt") as f:
    ids = f.readlines()
ids = [i.strip() for i in ids]
for i in ids: 
    shutil.copytree(i, 'dataset/' + i.split('/')[-1])
