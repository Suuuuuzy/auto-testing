# coding:utf-8

"""
@source https://git.code.oa.com/qci/PyTgit
"""
from __future__ import absolute_import
import logging
from urllib.parse import quote
import os.path
import requests
import json
from requests.exceptions import HTTPError

logger = logging.getLogger("tgit")
proxies = {
    "http": "http://dev-proxy.oa.com:8080",
    "https": "http://dev-proxy.oa.com:8080",
}


class TgitClient(object):

    url = "https://git.code.tencent.com/api"

    version = 3

    def __init__(self, auth, **options):
        self.auth = auth
        self.opener = None
        self.options = options

    def build_opener(self):
        if self.opener is None:
            self.opener = requests.Session()
            self.opener.auth = self.auth
        return self.opener

    def to_url(self, _path):
        """
        生成 url
        """
        return "%s/v%s%s" % (self.url, self.version, _path)

    def request(self, method, _path, headers=None, **data):
        """
        发起请求
        """
        url = self.to_url(_path)
        # request_kwargs = dict()
        request_kwargs = {"proxies": proxies}
        if data:
            keys = list(data.keys())
            for key in keys:

                # 参数包含 python 关键字, 添加了一个 '_' 处理, 这里要识别到并移除下划线
                if key.startswith("_"):
                    val = data.pop(key)
                    key = key[1:]
                    request_kwargs[key] = val
                    # set new key
                    # data[key] = val

                placeholder = ":%s" % key
                if placeholder in url:
                    url = url.replace(placeholder, quote(str(data[key]), safe=""))
                    data.pop(key)

        method = method.lower()
        try:
            if not data:
                data = None
            options = {
                "params": data if method in ["get", "delete", "options", "head"] else None,
                "data": data if method in ["post", "put", "patch"] else None,
            }
            options.update(request_kwargs)

            # issue bug
            if options.get("data"):
                options["data"] = json.dumps(options["data"])
            options.update(self.options)
            request = getattr(self.build_opener(), method)
            response = request(url, headers=headers, **options)
            # print(response.text)
            response.raise_for_status()
            if response.status_code == 204:  # no content
                return None
            elif method == "delete":  # delete not read content
                return None
            return response.json()
        except HTTPError as e:
            logger.error("call %s fail" % url)
            raise

    def get(self, _path, **params):
        """
        使用 GET 请求数据
        """
        return self.request("GET", _path, **params)

    def post(self, _path, **data):
        """
        使用 POST 请求数据
        """
        return self.request("POST", _path, **data)

    def put(self, _path, **data):
        """
        使用 PUT 请求数据
        """
        return self.request("PUT", _path, **data)

    def delete(self, _path, **data):
        """
        使用 DELETE 请求数据
        """
        return self.request("DELETE", _path, **data)

    ##################################################################################
    ##
    ## http://x.code.oa.com/Code/Git/blob/master/help/api/groups.md
    ##
    ##################################################################################

    def create_groups(self, **kwargs):
        """

        新建项目组

        :param name: (string) 项目组的名字
        :param _path: (string) 项目组的路径
        :param description: (string) 关于这个项目组的描述
        """
        return self.post("/groups", **kwargs)

    def update_groups(self, **kwargs):
        """

        编辑项目组

        :param id: (integer) 用户的项目组 ID 或者路径
        :param name: (string) 项目组的名字
        :param description: (string) 关于这个项目组的描述
        """
        return self.put("/groups", **kwargs)

    def delete_groups(self, id, **kwargs):
        """

        删除项目组

        :param id: (integer) id = 项目组唯一标识或路径
        """
        return self.delete("/groups/:id", id=id, **kwargs)

    def list_groups(self, **kwargs):
        """

        获取项目组列表

        :param page: (integer（可选）) 分页 (默认值:1)
        :param per_page: (integer（可选）) 默认页面大小 (默认值 20，最大值： 100)
        """
        return self.get("/groups", **kwargs)

    def search_groups(self, search, **kwargs):
        """

        搜索项目组

        :param page: (integer（可选）) 分页 (默认值:1)
        :param per_page: (integer（可选）) 默认页面大小 (默认值 20，最大值： 100)
        """
        return self.get("/groups", search=search, **kwargs)

    def list_groups_members(self, id, **kwargs):
        """

        获取项目组成员列表

        :param id: (integer) id = 项目组唯一标识或路径
        :param page: (integer（可选）) 分页 (默认:1)
        :param per_page: (integer（可选）) 默认页面大小 (默认 20，最大： 100)
        """
        return self.get("/groups/:id/members", id=id, **kwargs)

    def create_groups_members(self, id, **kwargs):
        """

        增加项目组成员

        :param id: (integer) id = 项目组唯一标识或路径
        :param user_id: (integer) 添加用户的 ID
        :param access_level: (integer) 项目访问级别
        """
        return self.post("/groups/:id/members", id=id, **kwargs)

    def update_groups_members(self, id, user_id, **kwargs):
        """

        修改项目组成员

        :param id: (integer) id = 项目组唯一标识或路径
        :param user_id: (integer) 项目组成员的 ID
        :param access_level: (integer) 项目访问级别
        """
        return self.put("/groups/:id/members/:user_id", id=id, user_id=user_id, **kwargs)

    def delete_groups_members(self, id, user_id, **kwargs):
        """

        移除一个项目组成员

        :param id: (integer) id = 项目组唯一标识或路径
        :param user_id: (integer) 项目组成员的 ID
        """
        return self.delete("/groups/:id/members/:user_id", id=id, user_id=user_id, **kwargs)

    def get_groups(self, id, **kwargs):
        """

        获取项目组的详细信息以及项目组下所有项目

        :param id: (integer) id = 项目组唯一标识或路径
        """
        return self.get("/groups/:id", id=id, **kwargs)

    def create_groups_projects(self, id, project_id, **kwargs):
        """

        把某个项目转让到指定项目组

        :param id: (integer) id = 项目组唯一标识或路径
        :param project_id: (integer) 项目的 ID
        """
        return self.post("/groups/:id/projects/:project_id", id=id, project_id=project_id, **kwargs)

    ##################################################################################
    ##
    ## http://x.code.oa.com/Code/Git/blob/master/help/api/namespaces.md
    ##
    ##################################################################################

    def list_namespaces(self, **kwargs):
        """

        获取命名空间列表

        :param page: (integer （可选）) 分页 (默认值:1)
        :param per_page: (integer （可选）) 默认页面大小 (默认值 20，最大值： 100)
        """
        return self.get("/namespaces", **kwargs)

    def search_namespaces(self, search, **kwargs):
        """

        搜索命名空间

        """
        return self.get("/namespaces", search=search, **kwargs)

    ##################################################################################
    ##
    ## http://x.code.oa.com/Code/Git/blob/master/help/api/users.md
    ##
    ##################################################################################

    def list_users(self, **kwargs):
        """

        作为管理者

        """
        return self.get("/users", **kwargs)

    def get_user_watched(self, **kwargs):
        """

        获用户关注项目列表

        """
        return self.get("/user/watched", **kwargs)

    def create_users(self, **kwargs):
        """

        新增用户

        :param email: (string) 邮箱地址
        :param password: (string（可选）) 密码
        :param username: (string) 用户
        :param extern_uid: (integer) 外部系统唯一标识
        :param provider: (string) 外部系统认证方式
        :param name: (string (可选)) 用户名称
        :param skype: (string (可选)) Skype ID
        :param linkedin: (string (可选)) LinkedIn
        :param twitter: (string (可选)) Twitter account
        :param qq: (string (可选)) QQ
        :param wechat: (string (可选)) 微信号
        :param website_url: (string (可选)) Website URL
        :param projects_limit: (integer (可选)) 可以创建的项目数
        :param bio: (string (可选)) User's biography
        :param admin: (boolean (可选)) User is admin - true or false (default)
        :param can_create_group: (boolean (可选)) User can create groups - true or false
        :param confirm: (boolean (可选)) Require confirmation - true (default) or false
        """
        return self.post("/users", **kwargs)

    def update_users(self, id, **kwargs):
        """

        修改用户

        :param email: (string) 邮箱
        :param password: (string) 密码
        :param username: (string) 用户名称
        :param name: (string) 用户
        :param skype: (string (可选)) Skype ID
        :param linkedin: (string (可选)) LinkedIn
        :param twitter: (string (可选)) Twitter account
        :param qq: (string (可选)) QQ
        :param wechat: (string (可选)) 微信号
        :param website_url: (string (可选)) Website URL
        :param projects_limit: (integer (可选)) Number of projects user can create
        :param extern_uid: (integer (可选)) External UID
        :param provider: (string (可选)) External provider name
        :param bio: (string (可选)) User's biography
        :param admin: (boolean (可选)) User is admin - true or false (default)
        :param can_create_group: (boolean (可选)) User can create groups - true or false
        """
        return self.put("/users/:id", id=id, **kwargs)

    def delete_users(self, id, **kwargs):
        """

        删除用户

        :param id: (integer) id=用户唯一标识或用户名称
        """
        return self.delete("/users/:id", id=id, **kwargs)

    def get_users(self, id, **kwargs):
        """

        获取某个用户的账号信息

        :param id: (integer 或 string) id=用户唯一标识或用户名称
        """
        return self.get("/users/:id", id=id, **kwargs)

    def get_user(self, **kwargs):
        """

        当前认证用户

        """
        return self.get("/user", **kwargs)

    def create_user_keys(self, **kwargs):
        """

        给当前用户创建一个SSH key

        :param title: (string) SSH Key 的标题
        :param key: (string) 新的 SSH key
        """
        return self.post("/user/keys", **kwargs)

    def create_users_keys(self, id, **kwargs):
        """

        给指定用户创建一个 SSH key

        :param id: (integer) id=用户唯一标识或用户名称
        :param title: (string) SSH Key 的标题
        :param key: (string) 新的 SSH key
        """
        return self.post("/users/:id/keys", id=id, **kwargs)

    def list_user_keys(self, **kwargs):
        """

        获取当前用户的SSH key

        """
        return self.get("/user/keys", **kwargs)

    def get_user_keys(self, id, **kwargs):
        """

        获取某个指定的 SSH key

        :param id: (integer) SSH key 的 id
        """
        return self.get("/user/keys/:id", id=id, **kwargs)

    def list_users_keys(self, uid, **kwargs):
        """

        获取某个用户的SSH key

        :param uid: (integer) uid=用户唯一标识
        """
        return self.get("/users/:uid/keys", uid=uid, **kwargs)

    def delete_user_keys(self, id, **kwargs):
        """

        删除当前用户的 SSH key

        :param id: (integer) SSH key 的 ID
        """
        return self.delete("/user/keys/:id", id=id, **kwargs)

    def delete_users_keys(self, uid, id, **kwargs):
        """

        删除指定用户的 SSH key

        :param uid: (integer) uid=用户唯一标识
        :param id: (integer) SSH key 的 ID
        """
        return self.delete("/users/:uid/keys/:id", uid=uid, id=id, **kwargs)

    def create_user_emails(self, **kwargs):
        """

        添加邮箱

        :param email: (string) 邮箱地址
        """
        return self.post("/user/emails", **kwargs)

    def create_users_emails(self, id, **kwargs):
        """

        给指定用户添加邮箱

        :param id: (integer) id=用户唯一标识或用户名称
        :param email: (string) 邮箱地址
        """
        return self.post("/users/:id/emails", id=id, **kwargs)

    def get_user_email(self, **kwargs):
        """

        通过邮箱获取用户信息

        :param email: (string) 邮箱地址
        """
        return self.get("/user/email", **kwargs)

    def list_user_emails(self, **kwargs):
        """

        获取用户邮箱列表

        """
        return self.get("/user/emails", **kwargs)

    def list_users_emails(self, uid, **kwargs):
        """

        获取指定用户邮箱列表

        :param uid: (integer) uid=用户唯一标识
        """
        return self.get("/users/:uid/emails", uid=uid, **kwargs)

    def get_user_emails(self, id, **kwargs):
        """

        获取邮箱信息

        :param id: (integer) 邮箱的 ID
        """
        return self.get("/user/emails/:id", id=id, **kwargs)

    def delete_user_emails(self, id, **kwargs):
        """

        删除当前用户的邮箱

        :param id: (integer) 邮箱的 ID
        """
        return self.delete("/user/emails/:id", id=id, **kwargs)

    def delete_users_emails(self, uid, id, **kwargs):
        """

        删除指定用户的邮箱

        :param uid: (integer) id=用户唯一标识或用户名称
        :param id: (integer) 邮箱的 ID
        """
        return self.delete("/users/:uid/emails/:id", uid=uid, id=id, **kwargs)

    def update_users_block(self, uid, **kwargs):
        """

        锁住用户

        :param uid: (integer) uid=用户唯一标识
        """
        return self.put("/users/:uid/block", uid=uid, **kwargs)

    def update_users_unblock(self, uid, **kwargs):
        """

        取消锁住用户

        :param uid: (integer) uid=用户唯一标识
        """
        return self.put("/users/:uid/unblock", uid=uid, **kwargs)

    def create_users_identity(self, uid, **kwargs):
        """

        创建认证方式

        :param uid: (integer) uid=用户唯一标识
        :param extern_uid: (integer) 外部系统唯一标识
        :param provider: (string) 外部系统认证方式
        """
        return self.post("/users/:uid/identity", uid=uid, **kwargs)

    ##################################################################################
    ##
    ## http://x.code.oa.com/Code/Git/blob/master/help/api/issues.md
    ##
    ##################################################################################

    def create_projects_issues(self, id, **kwargs):
        """

        新建缺陷

        :param id: (integer 或 string) id = 项目唯一标识或NAMESPACE___PATH/PROJECT___PATH
        :param title: (string) 缺陷标题
        :param description: (string（可选）) 缺陷描述
        :param assignee_ids: (string（可选）) 处理人唯一标识，允许多个，以,分隔，最多：10
        :param milestone_id: (integer（可选）) 里程碑 唯一标识
        :param labels: (string （可选）) 缺陷标签，允许多个，以,分隔，最多：10
        """
        # data['private_token']='NY2VjIH7EcxmuXW0elkX'
        # result = requests.session().post("https://git.code.tencent.com/api/v3/projects/116331/issues",data,proxies=proxies)
        # return result
        return self.post("/projects/:id/issues", id=id, **kwargs)

    def update_projects_issues(self, id, issue_id, **kwargs):
        """

        修改缺陷

        :param id: (integer 或 string) id = 项目唯一标识或NAMESPACE___PATH/PROJECT___PATH
        :param issue_id: (integer) 缺陷唯一标识
        :param title: (string（可选）) 缺陷标题
        :param description: (string（可选）) 缺陷描述
        :param assignee_ids: (string（可选）) 处理人唯一标识，允许多个，以,分隔，最大值：10
        :param milestone_id: (integer（可选）) 里程碑的唯一标识
        :param labels: (string （可选）) 缺陷标签，允许多个，以,分隔，最大值：10
        :param state_event: (string （可选）) 缺陷事件，可选reopen、close
        """
        return self.put("/projects/:id/issues/:issue_id", id=id, issue_id=issue_id, **kwargs)

    def list_issues(self, **kwargs):
        """

        用户创建缺陷列表

        :param state: (string （可选）) 缺陷状态，可选opened, closed
        :param labels: (string （可选）) 标签，允许多个，以,分隔，最大值：10
        :param page: (integer（可选）) 分页（默认值：1）
        :param per_page: (integer（可选）) 默认页面大小（默认值：20，最大值：100）
        :param order_by: (string （可选）) 排序字段，允许按 created_at,updated_at排序（默认created_at）
        :param sort: (string （可选）) 排序方式，允许 asc,desc（默认desc）
        """
        return self.get("/issues", **kwargs)

    def list_projects_issues(self, id, **kwargs):
        """

        项目缺陷列表

        :param id: (integer 或 string) id = 项目唯一标识或NAMESPACE___PATH/PROJECT___PATH
        :param iid: (integer （可选）) 缺陷的项目编号
        :param state: (string （可选）) 缺陷状态，可选opened, closed
        :param labels: (string （可选）) 标签，允许多个，以,分隔，最多：10
        :param milestone: (string （可选）) 里程碑标题
        :param order_by: (string （可选）) 排序字段，允许按created_at,updated_at排序（默认created_at）
        :param sort: (string （可选）) 排序方式，允许asc,desc（默认desc）
        :param page: (integer（可选）) 分页（默认值：1）
        :param per_page: (integer（可选）) 默认页面大小（默认值：20，最大值：100）
        """
        return self.get("/projects/:id/issues", id=id, **kwargs)

    def get_projects_issues(self, id, **kwargs):
        """

        查看指定缺陷

        :param id: (integer 或 string) id = 项目唯一标识或NAMESPACE___PATH/PROJECT___PATH
        :param issue_id: (integer) 缺陷唯一标识
        """
        return self.get("/projects/:id/issues", id=id, **kwargs)

    def get_projects_issue(self, id, issue_id, **kwargs):
        """

        查看指定缺陷

        :param id: (integer 或 string) id = 项目唯一标识或NAMESPACE___PATH/PROJECT___PATH
        :param issue_id: (integer) 缺陷唯一标识
        """
        return self.get("/projects/:id/issues/:issue_id", id=id, issue_id=issue_id, **kwargs)

    def get_projects_issues_subscribe(self, id, issue_id, **kwargs):
        """

        判断是否订阅给定项目的某个缺陷

        :param id: (integer 或 string) id = 项目唯一标识或NAMESPACE___PATH/PROJECT___PATH
        :param issue_id: (integer) 缺陷 唯一标识
        """
        return self.get(
            "/projects/:id/issues/:issue_id/subscribe", id=id, issue_id=issue_id, **kwargs
        )

    def update_projects_issues_subscribe(self, id, issue_id, **kwargs):
        """

        订阅给定项目的某个缺陷

        :param id: (integer 或 string) id = 项目唯一标识或NAMESPACE___PATH/PROJECT___PATH
        :param issue_id: (integer) 缺陷唯一标识
        """
        return self.put(
            "/projects/:id/issues/:issue_id/subscribe", id=id, issue_id=issue_id, **kwargs
        )

    def update_projects_issues_unsubscribe(self, id, issue_id, **kwargs):
        """

        取消订阅给定项目的某个缺陷

        :param id: (integer 或 string) id = 项目唯一标识或NAMESPACE___PATH/PROJECT___PATH
        :param issue_id: (integer) 缺陷唯一标识
        """
        return self.put(
            "/projects/:id/issues/:issue_id/unsubscribe", id=id, issue_id=issue_id, **kwargs
        )

    ##################################################################################
    ##
    ## http://x.code.oa.com/Code/Git/blob/master/help/api/labels.md
    ##
    ##################################################################################

    def create_projects_labels(self, id, **kwargs):
        """

        新增标签

        :param id: (integer 或 string) id = 项目唯一标识或NAMESPACE___PATH/PROJECT___PATH
        :param name: (string) 标签名
        :param color: (string) 标签颜色，举例：#428bca
        """
        return self.post("/projects/:id/labels", id=id, **kwargs)

    def update_projects_labels(self, id, **kwargs):
        """

        修改标签

        :param id: (integer 或 string) id = 项目唯一标识或NAMESPACE___PATH/PROJECT___PATH
        :param name: (string) 旧标签名
        :param new_name: (string) 新标签名
        :param color: (string) 标签颜色，举例：#428bca
        """
        return self.put("/projects/:id/labels", id=id, **kwargs)

    def list_projects_labels(self, id, **kwargs):
        """

        获取标签列表

        :param id: (integer 或 string) id = 项目唯一标识或NAMESPACE___PATH/PROJECT___PATH
        :param order_by: (string（可选）) 排序字段，允许按 name,created_at排序（默认name）
        :param sort: (string（可选）) 排序方式，允许 asc,desc（默认asc）
        :param page: (integer（可选）) 分页（默认值：1）
        :param per_page: (integer（可选）) 默认页面大小（默认值：20，最大值：100）
        """
        return self.get("/projects/:id/labels", id=id, **kwargs)

    def delete_projects_labels(self, id, **kwargs):
        """

        删除标签

        :param id: (integer 或 string) id = 项目唯一标识或NAMESPACE___PATH/PROJECT___PATH
        :param name: (string) 标签名
        """
        return self.delete("/projects/:id/labels", id=id, **kwargs)

    ##################################################################################
    ##
    ## http://x.code.oa.com/Code/Git/blob/master/help/api/milestones.md
    ##
    ##################################################################################

    def create_projects_milestones(self, id, **kwargs):
        """

        新增里程碑

        :param id: (integer 或 string) id = 项目唯一标识或NAMESPACE___PATH/PROJECT___PATH
        :param title: (string) 里程碑的标题
        :param description: (string（可选）) 里程碑的描述
        :param due_date: (datetime（可选）) 到期时间
        """
        return self.post("/projects/:id/milestones", id=id, **kwargs)

    def update_projects_milestones(self, id, milestone_id, **kwargs):
        """

        编辑里程碑

        :param id: (integer 或 string) id = 项目唯一标识或NAMESPACE___PATH/PROJECT___PATH
        :param milestone_id: (integer) 里程碑的唯一标识
        :param title: (string) 里程碑的标题
        :param description: (string（可选）) 里程碑的描述
        :param due_date: (datetime（可选）) 到期时间
        :param state_event: (string （可选）) 里程碑的事件，可选active、close
        """
        return self.put(
            "/projects/:id/milestones/:milestone_id", id=id, milestone_id=milestone_id, **kwargs
        )

    def get_projects_milestone(self, id, milestone_id, **kwargs):
        """

        返回指定里程碑

        :param id: (integer 或 string) id = 项目唯一标识或NAMESPACE___PATH/PROJECT___PATH
        :param milestone_id: (integer) 里程碑的唯一标识
        """
        return self.get(
            "/projects/:id/milestones/:milestone_id", id=id, milestone_id=milestone_id, **kwargs
        )

    def get_projects_milestones(self, id, **kwargs):
        """

        返回指定里程碑

        :param id: (integer 或 string) id = 项目唯一标识或NAMESPACE___PATH/PROJECT___PATH
        :param milestone_id: (integer) 里程碑的唯一标识
        """
        return self.get("/projects/:id/milestones", id=id, **kwargs)

    def delete_projects_milestones(self, id, milestone_id, **kwargs):
        """

        删除里程碑

        :param id: (integer 或 string) id = 项目唯一标识或NAMESPACE___PATH/PROJECT___PATH
        :param milestone_id: (integer) 里程碑的唯一标识
        """
        return self.delete(
            "/projects/:id/milestones/:milestone_id", id=id, milestone_id=milestone_id, **kwargs
        )

    def list_projects_milestones_issues(self, id, milestone_id, **kwargs):
        """

        返回某个里程碑下的所有缺陷

        :param id: (integer 或 string) id = 项目唯一标识或NAMESPACE___PATH/PROJECT___PATH
        :param milestone_id: (integer) 里程碑的唯一标识
        """
        return self.get(
            "/projects/:id/milestones/:milestone_id/issues",
            id=id,
            milestone_id=milestone_id,
            **kwargs
        )

    def list_projects_milestones(self, id, **kwargs):
        """

        返回里程碑列表

        :param id: (integer 或 string) id = 项目唯一标识或NAMESPACE___PATH/PROJECT___PATH
        :param iid: (integer （可选）) iid
        :param state: (string （可选）) 里程碑的状态，可选active, closed
        :param order_by: (string （可选）) 排序字段， 允许按id,due_date,created_at,updated_at排序（默认created_at）
        :param sort: (string （可选）) 排序方式， 允许 asc,desc（默认desc）
        :param page: (integer（可选）) 分页（default：1）
        :param per_page: (integer（可选）) 默认页面大小（default：20，max：100）
        """
        return self.get("/projects/:id/milestones", id=id, **kwargs)

    ##################################################################################
    ##
    ## http://x.code.oa.com/Code/Git/blob/master/help/api/watchers.md
    ##
    ##################################################################################

    def list_projects_watchers(self, id, **kwargs):
        """

        关注者列表

        :param id: (integer 或 string) id = 项目唯一标识或NAMESPACE___PATH/PROJECT___PATH
        :param page: (integer（可选）) 分页（默认值：1）
        :param per_page: (integer（可选）) 默认页面大小（默认值：20，最大值：100）
        """
        return self.get("/projects/:id/watchers", id=id, **kwargs)

    def get_projects_watch(self, id, **kwargs):
        """

        是否关注给定项目

        :param id: (integer 或 string) id = 项目唯一标识或NAMESPACE___PATH/PROJECT___PATH
        """
        return self.get("/projects/:id/watch", id=id, **kwargs)

    def update_projects_watch(self, id, **kwargs):
        """

        关注项目

        :param id: (integer 或 string) id = 项目唯一标识或NAMESPACE___PATH/PROJECT___PATH
        :param mute: (boolean) 是否静音，mute = true将不会收到除参与和订阅以外通知，默认mute = false
        """
        return self.put("/projects/:id/watch", id=id, **kwargs)

    def delete_projects_watch(self, id, **kwargs):
        """

        取消关注项目

        :param id: (integer 或 string) id = 项目唯一标识或NAMESPACE___PATH/PROJECT___PATH
        """
        return self.delete("/projects/:id/watch", id=id, **kwargs)

    ##################################################################################
    ##
    ## http://x.code.oa.com/Code/Git/blob/master/help/api/repositorys.md
    ##
    ##################################################################################

    def get_projects_repository_archive(self, id, **kwargs):
        """

        下载存档的项目版本库

        :param id: (integer 或 string) id = 项目唯一标识或NAMESPACE___PATH/PROJECT___PATH
        :param sha: (string（可选）) commit hash值、分支名或 tag
        """
        return self.get("/projects/:id/repository/archive", id=id, **kwargs)

    def list_projects_repository_contributors(self, id, **kwargs):
        """

        获取贡献者列表

        :param id: (integer 或 string) id = 项目唯一标识或NAMESPACE___PATH/PROJECT___PATH
        """
        return self.get("/projects/:id/repository/contributors", id=id, **kwargs)

    def get_projects_repository_blobs(self, id, sha, **kwargs):
        """

        获取原始文件内容

        :param id: (integer 或 string) id = 项目唯一标识或NAMESPACE___PATH/PROJECT___PATH
        :param sha: (string) commit hash值、分支名或 tag
        :param file_path: (string) 文件路径 (文件名）
        """
        return self.get("/projects/:id/repository/blobs/:sha", id=id, sha=sha, **kwargs)

    def get_projects_repository_raw_blobs(self, id, sha, **kwargs):
        """

        获取 blob 原始内容

        :param id: (integer 或 string) id = 项目唯一标识或NAMESPACE___PATH/PROJECT___PATH
        :param sha: (string) commit hash值、分支名或 tag
        """
        return self.get("/projects/:id/repository/raw_blobs/:sha", id=id, sha=sha, **kwargs)

    def get_projects_repository_compare(self, id, _from, to, straight, **kwargs):
        """

        获取差异内容

        :param id: (integer 或 string) id = 项目唯一标识或NAMESPACE___PATH/PROJECT___PATH
        :param from: (string) 提交的 hash、分支 或 tag
        :param to: (string) 提交的 hash、分支 或 tag
        :param straight: (boolean（可选）) true：两个点比较差异，false：三个点比较差异。默认是 false
        """
        return self.get(
            "/projects/:id/repository/compare",
            id=id,
            _from=_from,
            to=to,
            straight=straight,
            **kwargs
        )

    def get_projects_repository_compare_commits(self, id, **kwargs):
        """

        获取差异commits
        http://x.code.oa.com/Code/Git/blob/master/help/api/repositorys.md#%E4%B8%8B%E8%BD%BDcompare%E5%B7%AE%E5%BC%82%E6%96%87%E4%BB%B6%E9%9B%86
        """
        return self.get("/projects/:id/repository/compare/commits", id=id, **kwargs)

    def get_projects_repository_tree(self, id, **kwargs):
        """

        获取版本库文件和目录列表

        :param id: (integer 或 string) id = 项目唯一标识或NAMESPACE___PATH/PROJECT___PATH
        :param ref_name: (string（可选）) commit hash值、分支 或 tag，默认：默认分支
        :param _path: (string（可选）) 文件路径
        """
        return self.get("/projects/:id/repository/tree", id=id, **kwargs)

    def list_projects_repository_files(self, id, **kwargs):
        """

        获取单个文件内容和信息

        :param id: (integer 或 string) id = 项目唯一标识或NAMESPACE___PATH/PROJECT___PATH
        :param ref: (string) ref可以是SHA, branch name, tag name
        :param file___path: (string) 文件路径（文件名）
        """
        return self.get("/projects/:id/repository/files", id=id, **kwargs)

    def create_projects_repository_files(self, id, **kwargs):
        """

        新增文件

        :param id: (integer 或 string) id = 项目唯一标识或NAMESPACE___PATH/PROJECT___PATH
        :param file___path: (string) 文件路径(文件名)
        :param branch_name: (string) 分支 名
        :param encoding: (string（可选）) 内容编码，可选：text、base64，默认：text
        :param content: (string) 内容
        :param commit_message: (string) 描述信息
        """
        return self.post("/projects/:id/repository/files", id=id, **kwargs)

    def upload_images(self, id, image_path):
        """

        上传附件

        :param id: (integer 或 string) id = 项目唯一标识或NAMESPACE___PATH/PROJECT___PATH
        :param file_path: (string) 文件路径(文件名)
        """
        return self.post(
            "/projects/:id/uploads",
            id=id,
            _files={"file": ("file", open(image_path, "rb"), "image/png")},
        )

    def upload_file(self, id, path, content_type):
        """

        上传附件

        :param id: (integer 或 string) id = 项目唯一标识或NAMESPACE___PATH/PROJECT___PATH
        :param file_path: (string) 文件路径(文件名)
        """
        return self.post(
            "/projects/:id/uploads",
            id=id,
            _files={"file": (os.path.basename(path), open(path, "rb"), content_type)},
        )

    def delete_projects_repository_files(self, id, **kwargs):
        """

        删除文件

        :param id: (integer 或 string) id = 项目唯一标识或NAMESPACE___PATH/PROJECT___PATH
        :param file___path: (string) 文件路径（文件名）
        :param branch_name: (string) 分支名
        :param commit_message: (string) 描述
        """
        return self.delete("/projects/:id/repository/files", id=id, **kwargs)

    def update_projects_repository_files(self, id, **kwargs):
        """

        编辑文件

        :param id: (integer 或 string) id = 项目唯一标识或NAMESPACE___PATH/PROJECT___PATH
        :param file___path: (string) 文件路径（文件名）
        :param branch_name: (string) 分支名
        :param encoding: (string（可选）) 内容编码，可选：text、base64，默认：text
        :param content: (string) 内容
        :param commit_message: (string) 注释
        """
        return self.put("/projects/:id/repository/files", id=id, **kwargs)

    ##################################################################################
    ##
    ## http://x.code.oa.com/Code/Git/blob/master/help/api/branches.md
    ##
    ##################################################################################

    def create_projects_repository_branches(self, id, **kwargs):
        """

        创建项目分支

        :param id: (integer 或 string) id = 项目唯一标识或NAMESPACE___PATH/PROJECT___PATH
        :param branch_name: (string) 分支名
        :param ref: (string) ref可以是已存在的SHA, branch name, tag name
        """
        return self.post("/projects/:id/repository/branches", id=id, **kwargs)

    def delete_projects_repository_branches(self, id, branch, **kwargs):
        """

        删除分支

        :param id: (integer 或 string) id = 项目唯一标识或NAMESPACE___PATH/PROJECT___PATH
        :param branch: (string) 分支 名
        """
        return self.delete(
            "/projects/:id/repository/branches/:branch", id=id, branch=branch, **kwargs
        )

    def list_projects_repository_branches(self, id, **kwargs):
        """

        分支列表

        :param id: (integer 或 string) id = 项目唯一标识或NAMESPACE___PATH/PROJECT___PATH
        :param page: (integer（可选）) 分页（默认值：1）
        :param per_page: (integer（可选）) 默认页面大小（默认：20，最大：100）
        """
        return self.get("/projects/:id/repository/branches", id=id, **kwargs)

    def get_projects_repository_branches(self, id, branch, **kwargs):
        """

        获取分支详情

        :param id: (integer 或string) id = 项目唯一标识或NAMESPACE___PATH/PROJECT___PATH
        :param branch: (string) 分支名
        """
        return self.get("/projects/:id/repository/branches/:branch", id=id, branch=branch, **kwargs)

    def update_projects_repository_branches_protect(self, id, branch, **kwargs):
        """

        将分支变为保护分支

        :param id: (integer 或 string) id = 项目唯一标识或NAMESPACE___PATH/PROJECT___PATH
        :param branch: (string) 分支 名
        :param developers_can_push: (boolean（可选）) developer角色是否能够 推送
        :param developers_can_merge: (boolean（可选）) developer角色是否能够 合并
        :param push_access_level: (integer（可选）) 推送权限级别，有效值：0，30，40。0 ：Owner + Only Branch Members(Except Reporters);30：Above Developer + Branch Members(Except Reporters);40：Above Master + Branch Members(Except Reporters)
        :param merge_access_level: (integer（可选）) 合并权限级别，有效值：0，30，40。0 ：Owner + Only Branch Members(Except Reporters);30：Above Developer + Branch Members(Except Reporters);40：Above Master + Branch Members(Except Reporters)
        """
        return self.put(
            "/projects/:id/repository/branches/:branch/protect", id=id, branch=branch, **kwargs
        )

    def update_projects_repository_branches_unprotect(self, id, branch, **kwargs):
        """

        取消保护分支

        :param id: (integer 或 string) id = 项目唯一标识或NAMESPACE___PATH/PROJECT___PATH
        :param branch: (string) 分支名
        """
        return self.put(
            "/projects/:id/repository/branches/:branch/unprotect", id=id, branch=branch, **kwargs
        )

    def create_projects_branches_protected_members(self, id, branch_name, **kwargs):
        """

        为保护分支添加成员

        :param id: (integer) id = 项目唯一标识或NAMESPACE___PATH/PROJECT___PATH
        :param protected_branch_name: (integer) 保护分支的 分支名
        :param user_id: (integer) 用户的 ID
        :param access_level: (integer) 要给用户设置的访问级别
        """
        return self.post(
            "/projects/:id/branches/protected/:branch_name/members",
            id=id,
            branch_name=branch_name,
            **kwargs
        )

    def list_projects_branches_protected_members(self, id, protected_branch_name, **kwargs):
        """

        获取保护分支的成员

        :param id: (integer) id = 项目唯一标识或NAMESPACE___PATH/PROJECT___PATH
        :param protected_branch_name: (integer) 保护分支的 分支名
        """
        return self.get(
            "/projects/:id/branches/protected/:protected_branch_name/members",
            id=id,
            protected_branch_name=protected_branch_name,
            **kwargs
        )

    def update_projects_branches_protected_members(
        self, id, protected_branch_name, user_id, **kwargs
    ):
        """

        编辑保护分支的成员

        :param id: (integer) id = 项目唯一标识或NAMESPACE___PATH/PROJECT___PATH
        :param protected_branch_name: (integer) 保护分支的 分支名
        :param user_id: (integer) 用户的 ID
        :param access_level: (integer) 要给用户设置的访问级别
        """
        return self.put(
            "/projects/:id/branches/protected/:protected_branch_name/members/:user_id",
            id=id,
            protected_branch_name=protected_branch_name,
            user_id=user_id,
            **kwargs
        )

    def delete_projects_branches_protected_members(
        self, id, protected_branch_name, user_id, **kwargs
    ):
        """

        删除保护分支的指定用户

        :param id: (integer) id = 项目唯一标识或NAMESPACE___PATH/PROJECT___PATH
        :param protected_branch_name: (integer) 保护分支的 分支名
        :param user_id: (integer) 用户的 ID
        """
        return self.delete(
            "/projects/:id/branches/protected/:protected_branch_name/members/:user_id",
            id=id,
            protected_branch_name=protected_branch_name,
            user_id=user_id,
            **kwargs
        )

    def get_projects_tloc_branch_lifecycle(self, id, **kwargs):
        """

        查询分支生命周期

        :param id: (integer 或 string) id = 项目唯一标识或NAMESPACE___PATH/PROJECT___PATH
        :param branch_name: (string（可选）) 指定分支名(默认全部分支)
        :param tag_name: (string（可选）) 指定Tag名(branch_name为空时生效，默认全部Tag)
        """
        return self.get("/projects/:id/tloc/branch/lifecycle", id=id, **kwargs)

    ##################################################################################
    ##
    ## http://x.code.oa.com/Code/Git/blob/master/help/api/releases.md
    ##
    ##################################################################################

    def list_projects_releases(self, id, **kwargs):
        """

        获取releases列表

        :param id: (integer 或 string) id = 项目唯一标识或NAMESPACE___PATH/PROJECT___PATH
        :param labels: (string （可选）) 发布标签， 允许多个，以,分隔，最多：10
        :param author_id: (integer（可选）) 创建人id
        :param type: (string （可选）) 发布类型，目前只有 release
        :param page: (integer（可选）) 分页（default：1）
        :param per_page: (integer（可选）) 默认页面大小（default：20，max：100）
        """
        return self.get("/projects/:id/releases", id=id, **kwargs)

    def get_projects_releases(self, id, tag_name, **kwargs):
        """

        获取某个指定的release

        :param id: (integer 或 string) id = 项目唯一标识或NAMESPACE___PATH/PROJECT___PATH
        :param tag_name: (String) release的tag字段
        """
        return self.get("/projects/:id/releases/:tag_name", id=id, tag_name=tag_name, **kwargs)

    def create_projects_releases(self, id, **kwargs):
        """

        新增一个release

        :param id: (integer 或 string) id = 项目唯一标识或NAMESPACE___PATH/PROJECT___PATH
        :param tag: (string) tag 名
        :param start_point: (string) 从 commit hash、存在的 branch 或 tag 创建 releases
        :param tag_message: (string（可选）) 对tag的描述、注释
        :param title: (string（可选）) 对releases的标题，如果为空则取tag名
        :param type: (string（可选）) 发布类型， 默认release (type为release的发布将会出现在版本发布列表中，如果不需要则传空字符串" ")
        :param description: (string（可选）) 对release的描述
        :param labels: (string（可选）) 发布标签， 允许多个，以,分隔，最多：10
        """
        return self.post("/projects/:id/releases", id=id, **kwargs)

    def update_projects_releases(self, id, tag_name, **kwargs):
        """

        更新一个release

        :param id: (integer 或 string) id = 项目唯一标识或NAMESPACE___PATH/PROJECT___PATH
        :param tag_name: (string) tag名
        :param type: (string（可选）) 发布类型， 默认release (type为release的发布将会出现在版本发布列表中，如果不需要则传空字符串" ")
        :param description: (string（可选）) 对release的描述
        :param labels: (string（可选）) 发布标签， 允许多个，以,分隔，最多：10
        """
        return self.put("/projects/:id/releases/:tag_name", id=id, tag_name=tag_name, **kwargs)

    def delete_projects_releases(self, id, tag_name, **kwargs):
        """

        删除releases

        :param id: (integer 或 string) id = 项目唯一标识或NAMESPACE___PATH/PROJECT___PATH
        :param tag_name: (string) tag名
        """
        return self.delete("/projects/:id/releases/:tag_name", id=id, tag_name=tag_name, **kwargs)

    def create_projects_releases_attachments(self, id, tag_name, **kwargs):
        """

        上传附件

        :param id: (integer 或 string) id = 项目唯一标识或NAMESPACE___PATH/PROJECT___PATH
        :param tag_name: (string) tag名
        :param file: (-) 单个附件
        """
        return self.post(
            "/projects/:id/releases/:tag_name/attachments", id=id, tag_name=tag_name, **kwargs
        )

    def get_projects_releases_attachments(self, id, tag_name, attachment_name, **kwargs):
        """

        下载附件

        :param id: (integer 或 string) id = 项目唯一标识或NAMESPACE___PATH/PROJECT___PATH
        :param tag_name: (string) tag名
        :param attachment_name: (string) 附件名
        """
        return self.get(
            "/projects/:id/releases/:tag_name/attachments/:attachment_name",
            id=id,
            tag_name=tag_name,
            attachment_name=attachment_name,
            **kwargs
        )

    def delete_projects_releases_attachments(self, id, tag_name, attachment_name, **kwargs):
        """

        删除附件

        :param id: (integer 或 string) id = 项目唯一标识或NAMESPACE___PATH/PROJECT___PATH
        :param tag_name: (string) tag名
        :param attachment_name: (string) 附件名
        """
        return self.delete(
            "/projects/:id/releases/:tag_name/attachments/:attachment_name",
            id=id,
            tag_name=tag_name,
            attachment_name=attachment_name,
            **kwargs
        )

    ##################################################################################
    ##
    ## http://x.code.oa.com/Code/Git/blob/master/help/api/commits.md
    ##
    ##################################################################################

    def get_projects_repository_commits(self, id, sha, **kwargs):
        """

        取得一个提交

        :param id: (integer 或 string) id = 项目唯一标识或NAMESPACE___PATH/PROJECT___PATH
        :param sha: (string) commit hash值、分支名或 tag
        """
        return self.get("/projects/:id/repository/commits/:sha", id=id, sha=sha, **kwargs)

    def get_projects_repository_commits_diff(self, id, sha, **kwargs):
        """

        取得提交的差异

        :param id: (integer 或 string) id = 项目唯一标识或NAMESPACE___PATH/PROJECT___PATH
        :param sha: (string) commit hash值、分支名或 tag
        :param _path: (string（可选）) 文件路径
        :param ignore_white_space: (boolean（可选）) 有差异的内容是否忽略空白符，默认不忽略
        """
        return self.get("/projects/:id/repository/commits/:sha/diff", id=id, sha=sha, **kwargs)

    def create_projects_repository_commits_comments(self, id, sha, **kwargs):
        """

        对一个提交发表评论

        :param id: (integer 或 string) id = 项目唯一标识或NAMESPACE___PATH/PROJECT___PATH
        :param sha: (string) commit hash值、分支名或 tag
        :param note: (string) 评论内容
        :param _path: (string（可选）) 文件路径
        :param line: (integer（可选）) 行号
        :param line_type: (string（可选）) 变更类型，可选old、new
        """
        return self.post("/projects/:id/repository/commits/:sha/comments", id=id, sha=sha, **kwargs)

    def list_projects_repository_commits_comments(self, id, sha, **kwargs):
        """

        取得一个提交的评论

        :param id: (integer 或 string) id = 项目唯一标识或NAMESPACE___PATH/PROJECT___PATH
        :param sha: (string) commit hash值、分支名或 tag
        """
        return self.get("/projects/:id/repository/commits/:sha/comments", id=id, sha=sha, **kwargs)

    def list_projects_repository_commits(self, id, **kwargs):
        """

        列出项目版本库所有的提交

        :param id: (integer 或 string) id = 项目唯一标识或NAMESPACE___PATH/PROJECT___PATH
        :param ref_name: (string（可选）) 版本库分支 或 tag，默认：默认分支
        :param _path: (string（可选）) 文件路径
        :param page: (integer（可选）) 分页（默认值：1）
        :param per_page: (integer（可选）) 默认页面大小（默认值： 20，最大值： 100）
        """
        return self.get("/projects/:id/repository/commits", id=id, **kwargs)

    def list_projects_repository_commits_refs(self, id, sha, **kwargs):
        """

        获取某个提交对应的分支和tag

        :param id: (integer 或 string) id = 项目唯一标识或NAMESPACE___PATH/PROJECT___PATH
        :param sha: (string) commit hash值、分支名或 tag
        :param type: (string（可选）) branch、tag、或all （默认：all）
        :param page: (integer（可选）) 分页（默认值：1）
        :param per_page: (integer（可选）) 默认页面大小（默认值： 20，最大值： 100）
        """
        return self.get("/projects/:id/repository/commits/:sha/refs", id=id, sha=sha, **kwargs)

    ##################################################################################
    ##
    ## http://x.code.oa.com/Code/Git/blob/master/help/api/projects.md
    ##
    ##################################################################################

    def list_projects_members(self, id, **kwargs):
        """

        获取项目成员列表

        :param page: (integer) 页数 (默认值:1)
        :param per_page: (integer) 每页列出成员数 (默认值 20)
        :param id: (integer 或 string) id = 项目唯一标识或NAMESPACE___PATH/PROJECT___PATH
        :param query: (string (可选)) 搜索成员的字符串
        """
        return self.get("/projects/:id/members", id=id, **kwargs)

    def create_projects_members(self, id, **kwargs):
        """

        增加项目成员

        :param id: (integer 或 string) id = 项目唯一标识或NAMESPACE___PATH/PROJECT___PATH
        :param user_id: (integer) 增加的用户的 ID
        :param access_level: (integer) 项目访问级别
        """
        return self.post("/projects/:id/members", id=id, **kwargs)

    def create_projects_members(self, id, **kwargs):
        """ """
        return self.post("/projects/:id/members", id=id, **kwargs)

    def update_projects_members(self, id, user_id, **kwargs):
        """

        修改项目成员

        :param id: (integer 或 string) id = 项目唯一标识或NAMESPACE___PATH/PROJECT___PATH
        :param user_id: (integer) 用户的 ID
        :param access_level: (integer) 项目访问级别
        """
        return self.put("/projects/:id/members/:user_id", id=id, user_id=user_id, **kwargs)

    def delete_projects_members(self, id, user_id, **kwargs):
        """

        删除项目成员

        :param id: (integer 或 string) id = 项目唯一标识或NAMESPACE___PATH/PROJECT___PATH
        :param user_id: (integer) 用户的 ID
        """
        return self.delete("/projects/:id/members/:user_id", id=id, user_id=user_id, **kwargs)

    def get_projects_members(self, id, user_id, **kwargs):
        """

        获取项目内的某个指定成员信息

        :param id: (integer 或 string) id = 项目唯一标识或NAMESPACE___PATH/PROJECT___PATH
        :param user_id: (integer) 成员的 ID
        """
        return self.get("/projects/:id/members/:user_id", id=id, user_id=user_id, **kwargs)

    def create_projects(self, **kwargs):
        """

        创建项目

        :param name: (string) 项目名
        :param _path: (string（可选）) 项目版本库路径，默认：_path = name
        :param fork_enabled: (boolean（可选）) 项目是否可以被fork, 默认:false
        :param namespace_id: (integer （可选）) 项目所属命名空间 ，默认用户的命名空间
        :param description: (string（可选）) 项目描述
        :param visibility_level: (integer（可选）) 项目可视范围，默认visibility_level = 0
        """
        return self.post("/projects", **kwargs)

    def update_projects(self, id, **kwargs):
        """

        编辑项目

        :param name: (string（可选）) 项目名
        :param fork_enabled: (boolean（可选）) 项目是否可以被fork, 默认:false
        :param description: (string（可选）) 项目描述
        :param default_branch: (string（可选）) 项目默认分支
        :param limit_file_size: (float（可选）) 文件大小限制，单位:MB
        :param limit_lfs_file_size: (float（可选）) LFS 文件大小限制，单位:MB
        :param issues_enabled: (boolean（可选）) 缺陷配置
        :param merge_requests_enabled: (boolean（可选）) 合并请求配置
        :param wiki_enabled: (boolean（可选）) 维基配置
        :param review_enabled: (boolean（可选）) 评审配置
        :param tag_name_regex: (string（可选）) 推送或创建 tag 规则
        :param tag_create_push_level: (integer（可选）) 推送或创建 tag 权限
        :param visibility_level: (integer（可选）) 项目可视范围
        """
        return self.put("/projects/:id", id=id, **kwargs)

    def create_projects_user(self, user_id, **kwargs):
        """

        创建属于某个指定用户的项目

        :param user_id: (integer) 项目所属用户
        :param name: (string) 项目名
        :param _path: (string（可选）) 项目版本库路径，默认：_path = name
        :param description: (string（可选）) 项目描述
        :param visibility_level: (integer（可选）) 项目可视范围，默认visibility_level = 0
        """
        return self.post("/projects/user/:user_id", user_id=user_id, **kwargs)

    def list_projects(self, **kwargs):
        """

        获取项目列表

        :param search: (string （可选）) 搜索条件，模糊匹配_path,name
        :param archived: (boolean（可选）) 归档状态，archived = true限制为查询归档项目，默认不区分归档状态
        :param order_by: (string （可选）) 排序字段，允许按 id,name,_path,created_at,updated_at,last_activity_at排序（默认created_at）
        :param sort: (string （可选）) 排序方式，允许asc,desc（默认 desc）
        :param page: (integer（可选）) 页数（默认值：1）
        :param per_page: (integer（可选）) 默认页面大小（默认值：20，最大值：100）
        """
        return self.get("/projects", **kwargs)

    def get_projects_owned(self, **kwargs):
        """

        获取用户拥有的项目列表

        :param search: (string（可选）) 搜索条件，模糊匹配_path, name
        :param archived: (boolean（可选）) 归档状态，archived = true限制为查询归档项目，默认不区分归档状态
        :param order_by: (string（可选）) 排序字段，允许按 id,name,_path,created_at,updated_at,last_activity_at排序（默认created_at）
        :param sort: (string（可选）) 排序方式，允许 asc or desc（默认 desc）
        :param page: (integer（可选）) 页数（默认值：1）
        :param per_page: (integer（可选）) 默认页面大小（默认值：20，最大值：100）
        """
        return self.get("/projects/owned", **kwargs)

    def get_projects_public(self, **kwargs):
        """

        获取所有公有项目列表

        :param order_by: (string（可选）) 排序字段，允许按 id,name,_path,created_at,updated_at,last_activity_at排序（默认created_at）
        :param sort: (string（可选）) 排序方式，允许 asc or desc（默认 desc）
        :param page: (integer（可选）) 页数（默认值：1）
        :param per_page: (integer（可选）) 默认页面大小（默认值：20，最大值：100）
        """
        return self.get("/projects/public", **kwargs)

    def get_projects_inner_source(self, **kwargs):
        """

        获取内源项目列表

        :param search: (string （可选）) 搜索条件，模糊匹配_path,name
        :param order_by: (string （可选）) 排序字段，允许按 id,name,_path,created_at,updated_at,last_activity_at排序（默认created_at）
        :param sort: (string （可选）) 排序方式，允许asc,desc（默认 desc）
        :param page: (integer（可选）) 页数（默认值：1）
        :param per_page: (integer（可选）) 默认页面大小（默认值：20，最大值：100）
        """
        return self.get("/projects/inner_source", **kwargs)

    def delete_projects(self, id, **kwargs):
        """

        删除项目

        :param id: (integer 或 string) id = 项目唯一标识或NAMESPACE___PATH/PROJECT___PATH
        """
        return self.delete("/projects/:id", id=id, **kwargs)

    def get_projects(self, id, **kwargs):
        """

        获取项目详细信息

        :param id: (integer 或 string) id = 项目唯一标识或NAMESPACE___PATH/PROJECT___PATH
        """
        return self.get("/projects/:id", id=id, **kwargs)

    def list_projects_shares(self, id, **kwargs):
        """

        获取项目的share group列表

        :param id: (integer 或 string) id = 项目唯一标识或NAMESPACE___PATH/PROJECT___PATH
        """
        return self.get("/projects/:id/shares", id=id, **kwargs)

    def create_projects_share(self, id, **kwargs):
        """

        与组共享项目

        :param id: (integer 或 string) id = 项目唯一标识或NAMESPACE___PATH/PROJECT___PATH
        :param group_id: (integer) 要与之共享的组的id
        :param group_access: (integer) 授予组的权限级别
        """
        return self.post("/projects/:id/share", id=id, **kwargs)

    def delete_projects_share(self, id, group_id, **kwargs):
        """

        删除组中共享项目链接

        :param id: (integer 或 string) id = 项目唯一标识或NAMESPACE___PATH/PROJECT___PATH
        :param group_id: (integer) 组的id
        """
        return self.delete("/projects/:id/share/:group_id", id=id, group_id=group_id, **kwargs)

    def list_projects(self, **kwargs):
        """

        通过名称搜索项目

        :param search: (string) 搜索条件，模糊匹配_path, name.
        :param with_archived: (boolean（可选）) 归档状态，with_archived = true限制为查询归档项目，默认不区分
        :param with_push: (boolean（可选）) 推送状态，with_push = true限制为查询推送过的项目，默认不区分
        :param abandoned: (boolean（可选）) 活跃状态，abandoned = true限制为查询最近半年更新过的项目，默认全部
        :param visibility_levels: (string（可选）) 项目可视范围，默认visibility_levels = "0, 10, 20"
        :param order_by: (string（可选）) 排序字段，允许按id,name,_path,created_at,updated_at,last_activity_at排序（默认created_at）
        :param sort: (string（可选）) 排序方式，允许asc,desc（默认 desc）
        :param page: (integer（可选）) 页数（默认:1）
        :param per_page: (integer（可选）) 默认页面大小（默认值： 20，最大值： 100）
        """
        return self.get("/projects", **kwargs)

    def list_projects_events(self, id, **kwargs):
        """

        查询项目的事件列表

        :param id: (integer 或 string) id = 项目唯一标识或NAMESPACE___PATH/PROJECT___PATH
        :param user_id_or_name: (integer  或 string（可选）) 用户的 ID或用户名
        :param page: (integer) 页数（默认值：1）
        :param per_page: (integer) 默认页面大小（默认值： 20，最大值： 100）
        """
        return self.get("/projects/:id/events", id=id, **kwargs)

    def update_projects_star(self, id, **kwargs):
        """

        对指定项目标星

        :param id: (integer 或 string) id = 项目唯一标识或NAMESPACE___PATH/PROJECT___PATH
        """
        return self.put("/projects/:id/star", id=id, **kwargs)

    def delete_projects_star(self, id, **kwargs):
        """

        取消对指定项目标星

        :param id: (integer 或 string) id = 项目唯一标识或NAMESPACE___PATH/PROJECT___PATH
        """
        return self.delete("/projects/:id/star", id=id, **kwargs)

    def get_projects_star(self, id, **kwargs):
        """

        查看对指定项目是否标星

        :param id: (integer 或 string) id = 项目唯一标识或NAMESPACE___PATH/PROJECT___PATH
        """
        return self.get("/projects/:id/star", id=id, **kwargs)

    def list_projects_stars(self, id, **kwargs):
        """

        获取标星项目列表

        :param id: (integer 或 string) id = 项目唯一标识或NAMESPACE___PATH/PROJECT___PATH
        :param page: (integer（可选）) 页数（默认值：1）
        :param per_page: (integer（可选）) 默认页面大小（默认值： 20，最大值： 100）
        """
        return self.get("/projects/:id/stars", id=id, **kwargs)

    ##################################################################################
    ##
    ## http://x.code.oa.com/Code/Git/blob/master/help/api/fork.md
    ##
    ##################################################################################

    def create_projects_fork(self, id, **kwargs):
        """

        Fork 项目

        :param id: (integer or string) id = 项目唯一标识或NAMESPACE___PATH/PROJECT___PATH
        """
        return self.post("/projects/fork/:id", id=id, **kwargs)

    def create_projects_fork(self, id, forked_from_id, **kwargs):
        """

        建立项目之间的 fork 关系

        :param id: (integer or string) id = 项目唯一标识或NAMESPACE___PATH/PROJECT___PATH
        :param forked_from_id: (integer) 需要 fork 的项目 id
        """
        return self.post(
            "/projects/:id/fork/:forked_from_id", id=id, forked_from_id=forked_from_id, **kwargs
        )

    def delete_projects_fork(self, id, **kwargs):
        """

        删除 Fork 关系

        :param id: (integer or string) id = 项目唯一标识或NAMESPACE___PATH/PROJECT___PATH
        """
        return self.delete("/projects/:id/fork", id=id, **kwargs)

    ##################################################################################
    ##
    ## http://x.code.oa.com/Code/Git/blob/master/help/api/commit_check.md
    ##
    ##################################################################################

    def create_projects_commit_statuses(self, id, sha, **kwargs):
        """

        新建检测结果

        :param id: (integer or string) id = 项目唯一标识或NAMESPACE___PATH/PROJECT___PATH
        :param sha: (string) commit hash值、分支名或 tag
        :param state: (string) 检测状态，可选值：pending, success, error, failure
        :param target_url: (string（可选）) 检测路径，最大字节长度：255
        :param description: (string（可选）) 检测结果描述，最大字节长度：255
        :param context: (string（可选）) 区别于其他检测系统的标签，默认：default
        :param block: (boolean（可选）) 是否锁住提交和合并请求，默认：false
        """
        return self.post("/projects/:id/commit/:sha/statuses", id=id, sha=sha, **kwargs)

    def list_projects_commits_status(self, id, ref, **kwargs):
        """

        通过 Ref 查询特定的组合检测结果

        :param id: (integer or string) id = 项目唯一标识或NAMESPACE___PATH/PROJECT___PATH
        :param ref: (string) ref可以是SHA, branch name, tag name
        :param page: (integer) 分页（默认：1）
        :param per_page: (integer) 默认页面大小（默认： 20，最大： 100）
        """
        return self.get("/projects/:id/commits/:ref/status", id=id, ref=ref, **kwargs)

    def list_projects_commits_statuses(self, id, ref, **kwargs):
        """

        通过 Ref 查询检测结果

        :param id: (integer or string) id = 项目唯一标识或NAMESPACE___PATH/PROJECT___PATH
        :param ref: (string) ref可以是SHA, branch name, tag name
        :param page: (integer) 分页（默认：1）
        :param per_page: (integer) 默认页面大小（默认： 20，最大： 100）
        """
        return self.get("/projects/:id/commits/:ref/statuses", id=id, ref=ref, **kwargs)

    ##################################################################################
    ##
    ## http://x.code.oa.com/Code/Git/blob/master/help/api/hooks.md
    ##
    ##################################################################################

    def create_projects_hooks(self, id, **kwargs):
        """

        给项目增加回调钩子

        :param id: (integer or string) id = 项目唯一标识或NAMESPACE___PATH/PROJECT___PATH
        :param url: (string) 回调钩子 地址
        :param push_events: (boolean) 有推送事件触发回调钩子，默认 true
        :param issues_events: (boolean) 有缺陷事件触发回调钩子，默认 false
        :param merge_requests_events: (boolean) 有合并请求事件触发回调钩子，默认 false
        :param tag_push_events: (boolean) 有 Tag 推送事件触发回调钩子，默认 false
        :param note_events: (boolean) 有评论事件触发回调钩子，默认 false
        :param review_events: (boolean) 有评审事件触发回调钩子，默认 false
        :param token: (string(可选)) 用以校验收到的负载;此token不会在包含在返回值中
        """
        return self.post("/projects/:id/hooks", id=id, **kwargs)

    def update_projects_hooks(self, id, hook_id, **kwargs):
        """

        编辑项目回调钩子

        :param id: (integer or string) id = 项目唯一标识或NAMESPACE___PATH/PROJECT___PATH
        :param url: (string) 回调钩子 地址
        :param push_events: (boolean（可选）) 有推送事件触发回调钩子
        :param issues_events: (boolean（可选）) 有缺陷事件触发回调钩子
        :param merge_requests_events: (boolean（可选）) 有合并请求事件触发回调钩子
        :param tag_push_events: (boolean（可选）) 有 Tag 推送事件触发回调钩子
        :param note_events: (boolean（可选）) 有评论事件触发回调钩子
        :param review_events: (boolean（可选）) 有评审事件触发回调钩子
        :param token: (string(可选)) 用以校验收到的负载;此token不会在包含在返回值中
        """
        return self.put("/projects/:id/hooks/:hook_id", id=id, hook_id=hook_id, **kwargs)

    def get_projects_hooks(self, id, hook_id, **kwargs):
        """

        查询项目单个回调钩子

        :param id: (integer or string) id = 项目唯一标识或NAMESPACE___PATH/PROJECT___PATH
        :param hook_id: (integer) 回调钩子 id
        """
        return self.get("/projects/:id/hooks/:hook_id", id=id, hook_id=hook_id, **kwargs)

    def list_projects_hooks(self, id, **kwargs):
        """

        查询项目回调钩子列表

        :param id: (integer or string) id = 项目唯一标识或NAMESPACE___PATH/PROJECT___PATH
        :param page: (integer) 分页（默认值：1）
        :param per_page: (integer) 默认页面大小（默认值： 20，最大值： 100）
        """
        return self.get("/projects/:id/hooks", id=id, **kwargs)

    def delete_projects_hooks(self, id, hook_id, **kwargs):
        """

        删除项目回调钩子

        :param id: (integer or string) id = 项目唯一标识或NAMESPACE___PATH/PROJECT___PATH
        :param hook_id: (integer) 回调钩子 id
        """
        return self.delete("/projects/:id/hooks/:hook_id", id=id, hook_id=hook_id, **kwargs)

    ##################################################################################
    ##
    ## http://x.code.oa.com/Code/Git/blob/master/help/api/merge_requests.md
    ##
    ##################################################################################

    def create_projects_merge_requests(self, id, **kwargs):
        """

        新增合并请求

        :param id: (integer or string) id = 项目唯一标识或NAMESPACE___PATH/PROJECT___PATH
        :param source_branch: (string) 源分支
        :param target_branch: (string) 目标分支
        :param title: (string) 合并请求的标题
        :param assignee_id: (integer （可选）) 负责人 id
        :param description: (string  （可选）) 合并请求的描述
        :param target_project_id: (integer （可选）) 目标项目的 id
        :param labels: (string  （可选）) 合并请求的标签，多个请用英文逗号分隔
        :param reviewers: (string（可选）) 评审人id (只能是id。多个评审人用,隔开)
        :param necessary_reviewers: (string（可选）) 必要评审人id (只能是id。多个评审人用,隔开)
        :param approver_rule: (Integer（可选）) 评审人规则
        :param necessary_approver_rule: (Integer （可选）) 必要评审人规则
        """
        return self.post("/projects/:id/merge_requests", id=id, **kwargs)

    def update_projects_merge_request_merge(self, id, merge_request_id, **kwargs):
        """

        合并合并请求

        :param id: (integer or string) id = 项目唯一标识或NAMESPACE___PATH/PROJECT___PATH
        :param merge_request_id: (integer) 合并请求的 id
        :param merge_commit_message: (string  （可选）) 合并合并请求的描述消息
        """
        return self.put(
            "/projects/:id/merge_request/:merge_request_id/merge",
            id=id,
            merge_request_id=merge_request_id,
            **kwargs
        )

    def list_projects_merge_request_commits(self, id, merge_request_id, **kwargs):
        """

        获取合并请求中的提交

        :param id: (integer or string) id = 项目唯一标识或NAMESPACE___PATH/PROJECT___PATH
        :param merge_request_id: (string) 合并请求的ID
        """
        return self.get(
            "/projects/:id/merge_request/:merge_request_id/commits",
            id=id,
            merge_request_id=merge_request_id,
            **kwargs
        )

    def create_projects_merge_request_comments(self, id, merge_request_id, **kwargs):
        """

        添加合并请求的评论

        :param id: (integer or string) id = 项目唯一标识或NAMESPACE___PATH/PROJECT___PATH
        :param merge_request_id: (integer) 合并请求的 id
        :param note: (integer) 评论内容
        """
        return self.post(
            "/projects/:id/merge_request/:merge_request_id/comments",
            id=id,
            merge_request_id=merge_request_id,
            **kwargs
        )

    def list_projects_merge_request_comments(self, id, merge_request_id, **kwargs):
        """

        获取合并请求评论列表

        :param id: (integer or string) id = 项目唯一标识或NAMESPACE___PATH/PROJECT___PATH
        :param merge_request_id: (integer) 合并请求的 id
        :param page: (integer) 分页（默认值：1）
        :param per_page: (integer) 默认页面大小（默认值： 20，最大值： 100）
        """
        return self.get(
            "/projects/:id/merge_request/:merge_request_id/comments",
            id=id,
            merge_request_id=merge_request_id,
            **kwargs
        )

    def update_projects_merge_request(self, id, merge_request_id, **kwargs):
        """

        更新合并请求

        :param id: (integer or string) id = 项目唯一标识或NAMESPACE___PATH/PROJECT___PATH
        :param merge_request_id: (integer) 合并请求的 id
        :param target_branch: (string  （可选）) 目标分支
        :param assignee_id: (integer （可选）) 负责人 id
        :param title: (string  （可选）) 合并请求的标题
        :param state_event: (string  （可选）) 新的状态，可选值：（close|reopen\）
        :param description: (string  （可选）) 合并请求的描述
        :param labels: (string  （可选）) 合并请求的标签，多个请用英文逗号分隔
        """
        return self.put(
            "/projects/:id/merge_request/:merge_request_id",
            id=id,
            merge_request_id=merge_request_id,
            **kwargs
        )

    def list_projects_merge_requests(self, id, **kwargs):
        """

        获取合并请求列表

        :param id: (integer or string) id = 项目唯一标识或NAMESPACE___PATH/PROJECT___PATH
        :param iid: (integer（可选）) 项目里面的合并请求id编号
        :param state: (string （可选）) 合并请求状态，可选值：merged, opened 或 closed，不填写返回所有的合并请求
        :param order_by: (string （可选）) 排序字段， 允许按 created_at, updated_at 排序（默认 created_at）
        :param sort: (string （可选）) 排序方式， 允许 asc or desc（默认 desc）
        :param page: (integer) 分页（默认值：1）
        :param per_page: (integer) 默认页面大小（默认值： 20，最大值： 100）
        """
        return self.get("/projects/:id/merge_requests", id=id, **kwargs)

    def list_projects_merge_request_changes(self, id, merge_request_id, **kwargs):
        """

        查询合并请求的代码变更

        :param id: (integer or string) id = 项目唯一标识或NAMESPACE___PATH/PROJECT___PATH
        :param merge_request_id: (integer) 合并请求的 id
        """
        return self.get(
            "/projects/:id/merge_request/:merge_request_id/changes",
            id=id,
            merge_request_id=merge_request_id,
            **kwargs
        )

    def get_projects_merge_request(self, id, merge_request_id, **kwargs):
        """

        查询项目合并请求

        :param id: (integer or string) id = 项目唯一标识或NAMESPACE___PATH/PROJECT___PATH
        :param merge_request_id: (integer) 合并请求的 id
        """
        return self.get(
            "/projects/:id/merge_request/:merge_request_id",
            id=id,
            merge_request_id=merge_request_id,
            **kwargs
        )

    def get_projects_merge_request_subscribe(self, id, merge_request_id, **kwargs):
        """

        查询用户是否订阅请求合并

        :param id: (integer or string) id = 项目唯一标识或NAMESPACE___PATH/PROJECT___PATH
        :param merge_request_id: (integer) 请求合并的 id
        """
        return self.get(
            "/projects/:id/merge_request/:merge_request_id/subscribe",
            id=id,
            merge_request_id=merge_request_id,
            **kwargs
        )

    def update_projects_merge_request_subscribe(self, id, merge_request_id, **kwargs):
        """

        订阅请求合并

        :param id: (integer or string) id = 项目唯一标识或NAMESPACE___PATH/PROJECT___PATH
        :param merge_request_id: (integer) 合并请求的 id
        """
        return self.put(
            "/projects/:id/merge_request/:merge_request_id/subscribe",
            id=id,
            merge_request_id=merge_request_id,
            **kwargs
        )

    def update_projects_merge_request_unsubscribe(self, id, merge_request_id, **kwargs):
        """

        取消订阅合并请求

        :param id: (integer or string) id = 项目唯一标识或NAMESPACE___PATH/PROJECT___PATH
        :param merge_request_id: (integer) 合并请求的 id
        """
        return self.put(
            "/projects/:id/merge_request/:merge_request_id/unsubscribe",
            id=id,
            merge_request_id=merge_request_id,
            **kwargs
        )

    ##################################################################################
    ##
    ## http://x.code.oa.com/Code/Git/blob/master/help/api/comments.md
    ##
    ##################################################################################

    def create_projects_merge_requests_notes(self, id, merge_request_id, **kwargs):
        """

        创建合并请求的评论

        :param id: (integer or string) id = 项目唯一标识或NAMESPACE___PATH/PROJECT___PATH
        :param merge_request_id: (integer) 合并请求 id
        :param body: (string) 评论的内容
        :param _path: (string（可选）) 文件路径
        :param line: (string（可选）) 行号
        :param line_type: (string（可选）) 变更类型，可选old、new
        """
        return self.post(
            "/projects/:id/merge_requests/:merge_request_id/notes",
            id=id,
            merge_request_id=merge_request_id,
            **kwargs
        )

    def update_projects_merge_requests_notes(self, id, merge_request_id, note_id, **kwargs):
        """

        编辑合并请求的评论

        :param id: (integer or string) id = 项目唯一标识或NAMESPACE___PATH/PROJECT___PATH
        :param merge_request_id: (integer) 合并请求 id
        :param note_id: (integer) 评论 id
        :param body: (string) 评论的内容
        """
        return self.put(
            "/projects/:id/merge_requests/:merge_request_id/notes/:note_id",
            id=id,
            merge_request_id=merge_request_id,
            note_id=note_id,
            **kwargs
        )

    def get_projects_merge_requests_notes(self, id, merge_request_id, note_id, **kwargs):
        """

        查询合并请求的评论

        :param id: (integer or string) id = 项目唯一标识或NAMESPACE___PATH/PROJECT___PATH
        :param merge_request_id: (integer) 合并请求 id
        :param note_id: (integer) 评论 id
        """
        return self.get(
            "/projects/:id/merge_requests/:merge_request_id/notes/:note_id",
            id=id,
            merge_request_id=merge_request_id,
            note_id=note_id,
            **kwargs
        )

    def get_projects_merge_requests_commits(self, id, merge_request_id, **kwargs):
        """

        查询合并请求的评论

        :param id: (integer or string) id = 项目唯一标识或NAMESPACE___PATH/PROJECT___PATH
        :param merge_request_id: (integer) 合并请求 id
        :param note_id: (integer) 评论 id
        """
        return self.get(
            "/projects/:id/merge_request/:merge_request_id/commits",
            id=id,
            merge_request_id=merge_request_id,
            **kwargs
        )

    def list_projects_merge_requests_notes(self, id, merge_request_id, **kwargs):
        """

        查询合并请求的评论列表

        :param id: (integer or string) id = 项目唯一标识或NAMESPACE___PATH/PROJECT___PATH
        :param merge_request_id: (integer) 合并请求 id
        :param page: (integer) 分页（默认值：1）
        :param per_page: (integer) 默认页面大小（默认值： 20，最大值： 100）
        """
        return self.get(
            "/projects/:id/merge_requests/:merge_request_id/notes",
            id=id,
            merge_request_id=merge_request_id,
            **kwargs
        )

    def get_projects_reviews_notes(self, id, review_id, note_id, **kwargs):
        """

        查询代码评审的单个评论

        :param id: (integer or string) id = 项目唯一标识或NAMESPACE___PATH/PROJECT___PATH
        :param review_id: (integer) 代码评审 id
        :param note_id: (integer) 评论 id
        """
        return self.get(
            "/projects/:id/reviews/:review_id/notes/:note_id",
            id=id,
            review_id=review_id,
            note_id=note_id,
            **kwargs
        )

    def list_projects_reviews_notes(self, id, review_id, **kwargs):
        """

        查询代码评审的评论

        :param id: (integer or string) id = 项目唯一标识或NAMESPACE___PATH/PROJECT___PATH
        :param review_id: (integer) 代码评审的 id
        :param page: (integer) 分页（默认值：1）
        :param per_page: (integer) 默认页面大小（默认值： 20，最大值： 100）
        """
        return self.get(
            "/projects/:id/reviews/:review_id/notes", id=id, review_id=review_id, **kwargs
        )

    def create_projects_reviews_notes(self, id, review_id, **kwargs):
        """

        创建代码评审的评论

        :param id: (integer or string) id = 项目唯一标识或NAMESPACE___PATH/PROJECT___PATH
        :param review_id: (integer) 代码评审 id
        :param body: (string) 评论的内容
        :param _path: (string（可选）) 文件路径
        :param line: (string（可选）) 行号
        :param line_type: (string（可选）) 变更类型，可选old、new
        """
        return self.post(
            "/projects/:id/reviews/:review_id/notes", id=id, review_id=review_id, **kwargs
        )

    def update_projects_reviews_notes_note_id(self, id, review_id, **kwargs):
        """

        编辑代码评审的评论

        :param id: (integer or string) id = 项目唯一标识或NAMESPACE___PATH/PROJECT___PATH
        :param review_id: (integer) 代码评审 id
        :param note_id: (integer) 评论 id
        :param body: (string) 评论的内容
        """
        return self.put(
            "/projects/:id/reviews/:review_id/notes/note_id", id=id, review_id=review_id, **kwargs
        )

    def create_projects_issues_notes(self, id, issue_id, **kwargs):
        """

        创建项目的缺陷评论

        :param id: (integer or string) id = 项目唯一标识或NAMESPACE___PATH/PROJECT___PATH
        :param issue_id: (integer) 缺陷 id
        :param body: (string) 评论的内容
        """
        return self.post("/projects/:id/issues/:issue_id/notes", id=id, issue_id=issue_id, **kwargs)

    def update_projects_issues_notes(self, id, issue_id, note_id, **kwargs):
        """

        修改项目的缺陷评论

        :param id: (integer or string) id = 项目唯一标识或NAMESPACE___PATH/PROJECT___PATH
        :param issue_id: (integer) 缺陷 id
        :param note_id: (integer) 评论 id
        :param body: (string) 评论 内容
        """
        return self.put(
            "/projects/:id/issues/:issue_id/notes/:note_id",
            id=id,
            issue_id=issue_id,
            note_id=note_id,
            **kwargs
        )

    def get_projects_issues_notes(self, id, issue_id, note_id, **kwargs):
        """

        查询单个缺陷的评论

        :param id: (integer or string) id = 项目唯一标识或NAMESPACE___PATH/PROJECT___PATH
        :param issue_id: (integer) 缺陷 id
        :param note_id: (integer) 评论 id
        """
        return self.get(
            "/projects/:id/issues/:issue_id/notes/:note_id",
            id=id,
            issue_id=issue_id,
            note_id=note_id,
            **kwargs
        )

    def list_projects_issues_notes(self, id, issue_id, **kwargs):
        """

        获取缺陷评论列表

        :param id: (integer or string) id = 项目唯一标识或NAMESPACE___PATH/PROJECT___PATH
        :param issue_id: (integer) 缺陷 id
        :param page: (integer) 分页（默认值：1）
        :param per_page: (integer) 默认页面大小（默认值： 20，最大值： 100）
        """
        return self.get("/projects/:id/issues/:issue_id/notes", id=id, issue_id=issue_id, **kwargs)

    ##################################################################################
    ##
    ## http://x.code.oa.com/Code/Git/blob/master/help/api/cr/mr_review.md
    ##
    ##################################################################################

    def create_projects_merge_request_review_invite(self, id, merge_request_id, **kwargs):
        """

        邀请评审人

        :param id: (integer or string) id = 项目唯一标识或NAMESPACE___PATH/PROJECT___PATH
        :param merge_request_id: (integer) 合并请求的 id
        :param reviewer_id: (integer) 评审人的 id
        """
        return self.post(
            "/projects/:id/merge_request/:merge_request_id/review/invite",
            id=id,
            merge_request_id=merge_request_id,
            **kwargs
        )

    def delete_projects_merge_request_review_dismissals(self, id, merge_request_id, **kwargs):
        """

        移除评审人

        :param id: (integer or string) id = 项目唯一标识或NAMESPACE___PATH/PROJECT___PATH
        :param merge_request_id: (integer) 合并请求 id
        :param reviewer_id: (integer) 评审人 id
        """
        return self.delete(
            "/projects/:id/merge_request/:merge_request_id/review/dismissals",
            id=id,
            merge_request_id=merge_request_id,
            **kwargs
        )

    def delete_projects_merge_request_review_cancel(self, id, merge_request_id, **kwargs):
        """

        取消评审

        :param id: (integer or string) id = 项目唯一标识或NAMESPACE___PATH/PROJECT___PATH
        :param merge_request_id: (integer) 合并请求 id
        """
        return self.delete(
            "/projects/:id/merge_request/:merge_request_id/review/cancel",
            id=id,
            merge_request_id=merge_request_id,
            **kwargs
        )

    def get_projects_merge_request_review(self, id, merge_request_id, **kwargs):
        """

        查询评审信息

        :param id: (integer or string) id = 项目唯一标识或NAMESPACE___PATH/PROJECT___PATH
        :param merge_request_id: (integer) 合并请求的 id
        """
        return self.get(
            "/projects/:id/merge_request/:merge_request_id/review",
            id=id,
            merge_request_id=merge_request_id,
            **kwargs
        )

    def update_projects_merge_request_reviewer_summary(self, id, merge_request_id, **kwargs):
        """

        发表评审意见

        :param id: (integer or string) id = 项目唯一标识或NAMESPACE___PATH/PROJECT___PATH
        :param merge_request_id: (integer) 合并请求的 id
        :param reviewer_event: (string) 评审人事件，可选：（comment | approve | require_change | deny）
        :param summary: (string) 评审信息摘要
        """
        return self.put(
            "/projects/:id/merge_request/:merge_request_id/reviewer/summary",
            id=id,
            merge_request_id=merge_request_id,
            **kwargs
        )

    def update_projects_merge_request_review_reopen(self, id, merge_request_id, **kwargs):
        """

        重置评审状态

        :param id: (integer or string) id = 项目唯一标识或NAMESPACE___PATH/PROJECT___PATH
        :param merge_request_id: (integer) 合并请求 id
        """
        return self.put(
            "/projects/:id/merge_request/:merge_request_id/review/reopen",
            id=id,
            merge_request_id=merge_request_id,
            **kwargs
        )

    ##################################################################################
    ##
    ## http://x.code.oa.com/Code/Git/blob/master/help/api/cr/code_review.md
    ##
    ##################################################################################

    def create_projects_review(self, id, **kwargs):
        """

        新建 Commit 评审

        :param id: (integer 或 string) id = 项目唯一标识或NAMESPACE___PATH/PROJECT___PATH
        :param title: (string) 标题
        :param source_branch: (string) 源分支名（默认选择该分支最新的提交点）
        :param target_branch: (string) 目标分支名（默认选择该分支最新的提交点）
        :param description: (string （可选）) 描述
        :param source_commit: (string （可选）) 源提交点
        :param target_commit: (integer（可选）) 目标提交点
        :param target_project_id: (integer（可选）) 目标项目id
        :param reviewer_ids: (string（可选）) 评审人id (只能是id。多个评审人用,隔开)
        :param necessary_reviewer_ids: (string（可选）) 必要评审人id (只能是id。多个评审人用,隔开)
        :param approver_rule: (Integer（可选）) 评审人规则
        :param necessary_approver_rule: (Integer （可选）) 必要评审人规则
        """
        return self.post("/projects/:id/review", id=id, **kwargs)

    def list_projects_reviews(self, id, **kwargs):
        """

        获取项目中的Commit评审

        :param id: (integer 或string) id = 项目唯一标识或NAMESPACE___PATH/PROJECT___PATH
        :param author_id: (integer（可选）) 作者的id
        :param state: (string（可选）) 代码状态，可选值：approving, approving change_required 或 closed，不填写返回所有的代码评审。
        :param order_by: (string（可选）) 排序字段， 允许按 created_at, updated_at 排序（默认 created_at）
        :param sort: (string（可选）) 排序方式， 允许 asc or desc（默认 desc）
        :param page: (integer（可选）) 分页（默认值：1）
        :param per_page: (integer（可选）) 默认页面大小（默认值： 20，最大值： 100）
        """
        return self.get("/projects/:id/reviews", id=id, **kwargs)

    def get_projects_review(self, id, review_id, **kwargs):
        """

        获取项目中某个具体的Commit评审

        :param id: (integer 或 string) id = 项目唯一标识或NAMESPACE___PATH/PROJECT___PATH
        :param review_id: (integer) 代码评审的id
        """
        return self.get("/projects/:id/review/:review_id", id=id, review_id=review_id, **kwargs)

    def create_projects_review_invite(self, id, review_id, **kwargs):
        """

        邀请评审人

        :param id: (integer 或 string) id = 项目唯一标识或NAMESPACE___PATH/PROJECT___PATH
        :param review_id: (integer) 代码评审的id
        :param reviewer_id: (Integer （可选）) 评审人id (只能是id。多个评审人用,隔开)
        :param necessary_reviewer_id: (Integer （可选）) 必要评审人id (只能是id。多个评审人用,隔开)
        """
        return self.post(
            "/projects/:id/review/:review_id/invite", id=id, review_id=review_id, **kwargs
        )

    def delete_projects_review_dismissals(self, id, review_id, **kwargs):
        """

        移除评审人

        :param id: (integer 或 string) id = 项目唯一标识或NAMESPACE___PATH/PROJECT___PATH
        :param review_id: (integer) 代码评审的id
        :param reviewer_id: (Integer) 评审人id
        """
        return self.delete(
            "/projects/:id/review/:review_id/dismissals", id=id, review_id=review_id, **kwargs
        )

    def update_projects_review_reviewer_summary(self, id, review_id, **kwargs):
        """

        发表评审意见

        :param id: (integer 或string) id = 项目唯一标识或NAMESPACE___PATH/PROJECT___PATH
        :param review_id: (integer) 代码评审的id
        :param reviewer_event: (Integer) 评审人事件，可选：（comment | approve | require_change | deny）
        :param summary: (string) 评审信息摘要
        """
        return self.put(
            "/projects/:id/review/:review_id/reviewer/summary", id=id, review_id=review_id, **kwargs
        )

    def update_projects_review_reopen(self, id, review_id, **kwargs):
        """

        重置代码评审状态

        :param id: (integer 或 string) id = 项目唯一标识或NAMESPACE___PATH/PROJECT___PATH
        :param review_id: (integer) 代码评审的id
        """
        return self.put(
            "/projects/:id/review/:review_id/reopen", id=id, review_id=review_id, **kwargs
        )

    def update_projects_review(self, id, review_id, **kwargs):
        """

        更新Commit评审

        :param id: (integer 或 string) id = 项目唯一标识或NAMESPACE___PATH/PROJECT___PATH
        :param review_id: (integer) 代码评审的id
        :param title: (string) 代码评审的标题
        :param description: (string （可选）) 代码评审的描述
        """
        return self.put("/projects/:id/review/:review_id", id=id, review_id=review_id, **kwargs)

    ##################################################################################
    ##
    ## http://x.code.oa.com/Code/Git/blob/master/help/api/tloc_project.md
    ##
    ##################################################################################

    def get_projects_tloc_daily_count(self, id, **kwargs):
        """

        按天查询提交次数、提交用户数

        :param id: (integer 或 string) id = 项目唯一标识或NAMESPACE___PATH/PROJECT___PATH
        :param begin_date: (yyyy-MM-dd'T'HH:mm:ssZ) 开始时间；例如2019-03-25T00:10:19+0000 或 2019-03-25T00:10:19+0800，时间参数必须转码，如“2019-03-25T00:10:19%2B0800”
        :param end_date: (yyyy-MM-dd'T'HH:mm:ssZ) 结束时间：例如2019-03-26T00:10:19+0000 或 2019-03-26T00:10:19+0800，时间参数必须转码，如“2019-03-26T00:10:19%2B0800”
        :param branch_name: (string（可选）) 指定分支名(默认全部分支)
        :param tag_name: (string（可选）) 指定Tag名(branch_name为空时生效，默认全部Tag)
        :param timezone: (integer（可选）) 指定你的当前时区，默认是0时区，范围(-11,11)
        """
        return self.get("/projects/:id/tloc/daily/count", id=id, **kwargs)

    def get_projects_tloc_daily_diff(self, id, **kwargs):
        """

        按天查询提交代码行增量

        :param id: (integer 或 string) id = 项目唯一标识或NAMESPACE___PATH/PROJECT___PATH
        :param begin_date: (yyyy-MM-dd'T'HH:mm:ssZ) 开始时间；例如2019-03-25T00:10:19+0000 或 2019-03-25T00:10:19+0800，时间参数必须转码，如“2019-03-25T00:10:19%2B0800”
        :param end_date: (yyyy-MM-dd'T'HH:mm:ssZ) 结束时间：例如2019-03-26T00:10:19+0000 或 2019-03-26T00:10:19+0800，时间参数必须转码，如“2019-03-26T00:10:19%2B0800”
        :param branch_name: (string（可选）) 指定分支名(默认全部分支)
        :param tag_name: (string（可选）) 指定Tag名(branch_name为空时生效，默认全部Tag)
        :param timezone: (integer（可选）) 指定你的当前时区，默认是0时区，范围(-11,11)
        """
        return self.get("/projects/:id/tloc/daily/diff", id=id, **kwargs)

    def get_projects_tloc_user_diff(self, id, **kwargs):
        """

        查询各用户提交增量

        :param id: (integer 或 string) id = 项目唯一标识或NAMESPACE___PATH/PROJECT___PATH
        :param begin_date: (yyyy-MM-dd'T'HH:mm:ssZ) 开始时间；例如2019-03-25T00:10:19+0000 或 2019-03-25T00:10:19+0800，时间参数必须转码，如“2019-03-25T00:10:19%2B0800”
        :param end_date: (yyyy-MM-dd'T'HH:mm:ssZ) 结束时间：例如2019-03-26T00:10:19+0000 或 2019-03-26T00:10:19+0800，时间参数必须转码，如“2019-03-26T00:10:19%2B0800”
        :param branch_name: (string（可选）) 指定分支名(默认全部分支)
        :param tag_name: (string（可选）) 指定Tag名(branch_name为空时生效，默认全部Tag)
        """
        return self.get("/projects/:id/tloc/user/diff", id=id, **kwargs)

    def get_projects_tloc_lang_diff(self, id, **kwargs):
        """

        查询各语言提交增量

        :param id: (integer 或 string) id = 项目唯一标识或NAMESPACE___PATH/PROJECT___PATH
        :param begin_date: (yyyy-MM-dd'T'HH:mm:ssZ) 开始时间；例如2019-03-25T00:10:19+0000 或 2019-03-25T00:10:19+0800，时间参数必须转码，如“2019-03-25T00:10:19%2B0800”
        :param end_date: (yyyy-MM-dd'T'HH:mm:ssZ) 结束时间：例如2019-03-26T00:10:19+0000 或 2019-03-26T00:10:19+0800，时间参数必须转码，如“2019-03-26T00:10:19%2B0800”
        :param branch_name: (string（可选）) 指定分支名(默认全部分支)
        :param tag_name: (string（可选）) 指定Tag名(branch_name为空时生效，默认全部Tag)
        """
        return self.get("/projects/:id/tloc/lang/diff", id=id, **kwargs)

    def get_projects_tloc_commit_diff(self, id, **kwargs):
        """

        查询指定Commit点的提交增量

        :param id: (integer 或 string) id = 项目唯一标识或NAMESPACE___PATH/PROJECT___PATH
        :param sha: (string) commit hash值，必须是完整的SHA1，如：b1b9d46f1f6c55e8d157e41538b60bf7482ed436
        :param branch_name: (string（可选）) 指定分支名(默认全部分支)
        :param tag_name: (string（可选）) 指定Tag名(branch_name为空时生效，默认全部Tag)
        """
        return self.get("/projects/:id/tloc/commit/diff", id=id, **kwargs)
