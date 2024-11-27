META_LOG = "/media/dataj/wechat-devtools-linux/testing/auto-testing/data/newcrawl/logs/meta_data.txt"
with open(META_LOG) as f:
    content = f.read()
lines = content.split("\n")
print(len(lines))

reduced_lines = []
reduced_lines_set = set()
for i in lines:
    if i not in reduced_lines_set:
        reduced_lines.append(i)
        reduced_lines_set.add(i)
print(len(reduced_lines))
new_content = "\n".join(reduced_lines)
with open("reduced_meta_data.txt", "w") as f:
    f.write(new_content)
