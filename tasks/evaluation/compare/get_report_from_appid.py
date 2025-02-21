import os, random
# basedir = "/media/dataj/wechat-devtools-linux/testing/auto-testing/auto_minium/method_iterator/test/tmp_outputs"
basedir = "/media/dataj/wechat-devtools-linux/testing/auto-testing/auto_minium/method_iterator/test/tasks/over_10k/output"
app_basedir = "/media/dataj/wechat-devtools-linux/testing/auto-testing/data/newcrawl/pkg_unpack"
appid_file = "100_from_over_10k_appid.txt"
def get_reports(basedir, appid_file):
    with open(appid_file) as f:
        content = f.read()
        lines = content.split("\n")
        appids = [i.split('/')[-1] for i in lines if i!=""]
    for appid in appids:
        reports = [i for i in os.listdir(os.path.join(basedir, appid)) if i.endswith("_decoded")]
        for report in reports:
            report_fullpath = os.path.join(basedir, appid, report)
            print(report_fullpath)

get_reports(basedir, appid_file)
# print(appids)