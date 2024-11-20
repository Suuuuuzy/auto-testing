# coding:utf-8
import requests


class PrivateKeyAuth(requests.auth.AuthBase):
    """
    基于 Private Key 的认证方式, 适用于开发者用自己的 private key 调接口

    @see: http://x.code.oa.com/Code/Git/blob/master/help/api/README.md#private-key%E6%96%B9%E5%BC%8F
    """

    def __init__(self, private_key):
        self.private_key = private_key

    def __call__(self, r):
        r.headers["PRIVATE-TOKEN"] = self.private_key
        return r


class OAuthToken(requests.auth.AuthBase):
    """
    基于 OAuth 的认证方式, 注: 并不负责生成 OAuth 令牌, 适用于服务商通过用户的 OAuth 令牌来调接口

    @see: http://x.code.oa.com/Code/Git/blob/master/help/solutions/oauth2.md#%E4%BD%BF%E7%94%A8%E8%AE%BF%E9%97%AE%E4%BB%A4%E7%89%8C%E8%AE%BF%E9%97%AE%E5%B7%A5%E8%9C%82git-api
    """

    def __init__(self, oauth_token):
        self.oauth_token = oauth_token

    def __call__(self, r):
        r.headers["OAUTH-TOKEN"] = self.oauth_token
        return r
