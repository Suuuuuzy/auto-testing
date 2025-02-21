import re, os

def iterate_dir(full_pkg_path):
    pattern = r'wx[a-z0-9]{16}'
    app_ids = set()
    allowed_extensions = {".js", ".json", ".wxml", ".wxss"}

    for root, dirs, files in os.walk(full_pkg_path):  # os.walk for recursive traversal
        for file in files:
            file_path = os.path.join(root, file)
            if os.path.splitext(file)[1].lower() not in allowed_extensions:
                # Skip non-text files
                continue
            try:
                with open(file_path, 'r', encoding='utf-8') as f:
                    content = f.read()
                    # Check for regex match
                    app_ids.update(set(re.findall(pattern, content)))
                    # if matches:
                    #     print(f"Matches found in {file_path}: {matches}")
            except Exception as e:
                print(f"Could not read file {file_path}: {e}")
    return app_ids

pkg_path = "/media/dataj/wechat-devtools-linux/testing/auto-testing/data/newcrawl/pkg_unpack"
# ==========
appid = "wx26da53d900421226"
# ==========
full_pkg_path = os.path.join(pkg_path, appid)
app_ids = iterate_dir(full_pkg_path)
# for appid in app_ids:
#     print(appid)
print(app_ids)