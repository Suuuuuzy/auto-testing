#!/usr/bin/env python3
# created 2020/3/13 by xiazeng
import json
import tgit
import requests
import os

proxies = {
    "http": "http://dev-proxy.oa.com:8080",
    "https": "http://dev-proxy.oa.com:8080",
}


def upload_issue(git_token, git_repo, case_filename, msg, assignee_names=None):
    if assignee_names is None:
        assignee_names = list()
    case_json = json.load(open(case_filename))
    git = tgit.TgitClient(tgit.PrivateKeyAuth(git_token))

    # step-1 创建issue
    code = "".join(case_json["source"]["code"])
    if case_json["success"]:
        return "caseissuccess"
    errors = [case_json["errors"], case_json["failures"]]
    exception_names = []
    for error in errors:
        if error:
            exception_names.append(error.strip().split("\n")[-1].split(":")[0].split(".")[-1])
    exceptions = "\n\n".join([e for e in errors if e])
    title = f"{'|'.join(exception_names)} {case_json['module']}#{case_json['case_name']}"
    description = f"{msg}\n\n代码：\n\n```\n{code}\n```\n\nexception:\n```\n{exceptions}\n```"
    # title='11'
    # description='22'
    assignee_ids = []
    for assignee_name in assignee_names:
        user_info = git.get_user(id=assignee_name)
        assignee_ids.append(str(user_info["id"]))

    issue = git.create_projects_issues(
        git_repo,
        title=title,
        labels=",".join(exception_names),
        description=description,
        assignee_ids=assignee_ids,
    )
    # step-2 贴上图片
    images_url = []
    result_path = os.path.dirname(case_filename)
    for p in case_json["screen_info"]:
        path = os.path.join(result_path, p["path"])
        r = git.upload_images(git_repo, path)
        images_url.append('<img src="%s" width="300">' % r["url"])
    issue_id = issue["id"]
    git.create_projects_issues_notes(git_repo, issue_id, body="".join(images_url))
    log_path = case_filename.replace("result", "log").replace("json", "log")

    # step-3 附上日志
    r = git.upload_file(git_repo, log_path, "'text/plain'")
    git.create_projects_issues_notes(git_repo, issue_id, body=f"{r['markdown']}\n")

    # log_lines = open(log_path).readlines()
    # content = '\n'.join([l for l in log_lines if "DEBUG" not in log_lines])
    # print(len(content))
    # 工蜂返回异常
    # git.create_projects_issues_notes(git_repo, issue_id, body=f"{r['markdown']}\n```\n{content}\n```")
    return f"https://git.code.tencent.com/minum/testupissue/issues/{issue['iid']}"


# if __name__ == "__main__":
# jf = "D:/weixin/miniumtest/miniprogram-demo-test/outputs/20200509192808/test_get_outerxml/20200509192837809186/test_get_outerxml.json"
# result = upload_issue("", 116331, jf, "ddd", ["xxx"])
# print(result)
