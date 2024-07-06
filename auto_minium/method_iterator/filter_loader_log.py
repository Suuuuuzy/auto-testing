log_file = "outputs/loader20240702.log"
with open(log_file) as f:
    content = f.read()
lines = content.split("\n")
lines = [i for i in lines if "[+]" in i]
content = "\n".join(lines)
with open(log_file.replace(".log", "filter.log") , "w") as f:
    f.write(content) 