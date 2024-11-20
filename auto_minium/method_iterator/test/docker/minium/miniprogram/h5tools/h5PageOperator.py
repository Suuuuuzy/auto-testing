# -*- coding: utf-8 -*-
import math

from .commandProcessor import CommandProcessor
from . import h5UserAPI
import json


class H5PageOperator(object):
    processor = CommandProcessor('h5')

    def addContextIdInParams(self, command, contextId):
        executeResult = json.loads(command)
        executeResult['params']['contextId'] = contextId
        return json.dumps(executeResult, ensure_ascii=False)

    def changeDp2Px(self, xDp, yDp, scale, appTitleHeight):
        xPx = int(xDp * scale + 0.5)
        yPx = int((yDp + appTitleHeight) * scale + 0.5)
        return xPx, yPx

    def clickElementByName(self, name, index):
        params = {"name": name, "index": index}
        return self.processor.doCommandWithElement(h5UserAPI.ByType.NAME, h5UserAPI.ActionType.CLICK, **params)

    def clickElementByXpath(self, x, y, duration=50, tapCount=1):
        params = {"x": x, "y": y, "duration": duration, "tapCount": tapCount}
        return self.processor.doCommandWithoutElement(h5UserAPI.ActionType.CLICK, **params)

    def clickElementById(self, id):
        params = {"id": id}
        return self.processor.doCommandWithElement(h5UserAPI.ByType.ID, h5UserAPI.ActionType.CLICK, **params)

    def textElementByXpath(self, text):
        """
        模拟硬件输入分为三个步骤
        1.发送消息模拟点击
        2.发送消息模拟输入(最多只能输入4个字符，因此要对输入的text进行分割　)
        3.发送消息模拟抬起
        """
        commandList = []

        # downEvent的Command
        rawKeyDownParams = {"type": "rawKeyDown", "text": ''}
        keydownCommand = self.processor.doCommandWithoutElement(
            h5UserAPI.ActionType.TEXT, **rawKeyDownParams)
        commandList.append(keydownCommand)

        text = text.replace(' ', '')
        length = len(text)
        if length % 3 == 0:
            i = length / 3
        else:
            i = math.floor(length / 3) + 1
        for j in range(int(i)):
            charParams = {"type": "char", "text": text[3 * j: 3 * (j + 1)]}
            charCommand = self.processor.doCommandWithoutElement(
                h5UserAPI.ActionType.TEXT, **charParams)
            commandList.append(charCommand)

        # upEvent的command
        keyUpParams = {"type": "keyUp", "text": ''}
        keyupCommand = self.processor.doCommandWithoutElement(
            h5UserAPI.ActionType.TEXT, **keyUpParams)
        commandList.append(keyupCommand)

        return commandList


    def getPickerRect(self, xpath):
        params = {"xpath": xpath}
        return self.processor.doCommandWithElement(h5UserAPI.ByType.XPATH, h5UserAPI.ActionType.GET_PICKER_RECT,
                                                   **params)

    def getPageHeight(self):
        return self.processor.doCommandWithoutElement(
            h5UserAPI.ActionType.GET_PAGE_HEIGHT)

    def isElementExist(self, xpath, contextId=None):
        if xpath and xpath.startswith("/"):
            # 以/或//开头的认为是xpath
            params = {"xpath": xpath}
            result = self.processor.doCommandWithElement(h5UserAPI.ByType.XPATH, h5UserAPI.ActionType.IS_ELEMENT_EXIST,
                                                         **params)
            if contextId is not None:
                result = self.addContextIdInParams(result, contextId)
            return result
        elif xpath and xpath.startswith("#"):
            # 以#开头的认为是xpath
            params = {"selector": xpath}
            result = self.processor.doCommandWithElement(h5UserAPI.ByType.SELECTOR, h5UserAPI.ActionType.IS_ELEMENT_EXIST,
                                                         **params)
            if contextId is not None:
                result = self.addContextIdInParams(result, contextId)
            return result

    def focusElementByXpath(self, xpath):
        if xpath and xpath.startswith("/"):
            # 以/或//开头的认为是xpath
            params = {"xpath": xpath}
            return self.processor.doCommandWithElement(h5UserAPI.ByType.XPATH, h5UserAPI.ActionType.FOCUS, **params)
        elif xpath and xpath.startswith("#"):
            # 以#开头的认为是xpath
            params = {"selector": xpath}
            return self.processor.doCommandWithElement(h5UserAPI.ByType.SELECTOR, h5UserAPI.ActionType.FOCUS, **params)

    def scrollWindow(self, x, y, xDistance, yDistance, speed=800):
        params = {"x": x, "y": y, "xDistance": xDistance, "yDistance": yDistance, "speed": speed}
        return self.processor.doCommandWithoutElement(h5UserAPI.ActionType.SCROLL, **params)

    def getHtml(self, nodeId):
        params = {"nodeId": nodeId}
        return self.processor.doCommandWithoutElement(
            h5UserAPI.ActionType.GET_HTML, **params)

    def getJSValue(self, value, contextId=None):
        params = {"value": value}
        result = self.processor.doCommandWithoutElement(
            h5UserAPI.ActionType.GET_JS_VALUE, **params)

        if contextId is not None:
            result = self.addContextIdInParams(result, contextId)

        return result

    def closeWindow(self):
        return self.processor.doCommandWithoutElement(
            h5UserAPI.ActionType.CLOSE_WINDOW)

    def getDocument(self):
        return self.processor.doCommandWithoutElement(
            h5UserAPI.ActionType.GET_DOCUMENT)

    def returnLastPage(self):
        return self.processor.doCommandWithoutElement(
            h5UserAPI.ActionType.RETURN_LAST_PAGE)

    def navigateToPage(self, url):
        params = {"url": url}
        return self.processor.doCommandWithoutElement(
            h5UserAPI.ActionType.NAVIGATE_PAGE, **params)

    def executeScript(self, script, contextId=None):
        script = {"script": script}
        result = self.processor.doCommandWithoutElement(h5UserAPI.ActionType.EXECUTE_SCRIPT, **script)
        if contextId is not None:
            result = self.addContextIdInParams(result, contextId)
        return result

    def getElementTextByXpath(self, xpath):
        if xpath and xpath.startswith("/"):
            # 以/或//开头的认为是xpath
            params = {"xpath": xpath}
            return self.processor.doCommandWithElement(h5UserAPI.ByType.XPATH, h5UserAPI.ActionType.GET_ELEMENT_TEXT,
                                                       **params)
        elif xpath and xpath.startswith("#"):
            # 以#开头的认为是selector
            params = {"selector": xpath}
            return self.processor.doCommandWithElement(h5UserAPI.ByType.SELECTOR, h5UserAPI.ActionType.GET_ELEMENT_TEXT,
                                                       **params)

    def getElementSrcByXpath(self, xpath):
        if xpath and xpath.startswith("/"):
            # 以/或//开头的认为是xpath
            params = {"xpath": xpath}
            return self.processor.doCommandWithElement(h5UserAPI.ByType.XPATH, h5UserAPI.ActionType.GET_ELEMENT_SRC,
                                                       **params)
        elif xpath and xpath.startswith("#"):
            # 以#开头的认为是selector
            params = {"selector": xpath}
            return self.processor.doCommandWithElement(h5UserAPI.ByType.SELECTOR, h5UserAPI.ActionType.GET_ELEMENT_SRC,
                                                       **params)

    def getElementClassNameByXpath(self, xpath):
        if xpath and xpath.startswith("/"):
            # 以/或//开头的认为是xpath
            params = {"xpath": xpath}
            return self.processor.doCommandWithElement(h5UserAPI.ByType.XPATH, h5UserAPI.ActionType.GET_ELEMENT_CLASS_NAME,
                                                       **params)
        elif xpath and xpath.startswith("#"):
            # 以#开头的认为是selector
            params = {"selector": xpath}
            return self.processor.doCommandWithElement(h5UserAPI.ByType.SELECTOR, h5UserAPI.ActionType.GET_ELEMENT_CLASS_NAME,
                                                       **params)

    def getElementRect(self, xpath, contextId=None):
        if xpath and xpath.startswith("/"):
            # 以/或//开头的认为是xpath
            params = {"xpath": xpath}
            result = self.processor.doCommandWithElement(h5UserAPI.ByType.XPATH, h5UserAPI.ActionType.GET_ELEMENT_RECT,
                                                         **params)
            if contextId is not None:
                result = self.addContextIdInParams(result, contextId)
            return result
        elif xpath and xpath.startswith("#"):
            # 以#开头的认为是selector
            params = {"selector": xpath}
            result = self.processor.doCommandWithElement(h5UserAPI.ByType.SELECTOR, h5UserAPI.ActionType.GET_ELEMENT_RECT,
                                                         **params)
            if contextId is not None:
                result = self.addContextIdInParams(result, contextId)
            return result

    def getElementAndClick(self, xpath):
        if xpath and xpath.startswith("/"):
            # 以/或//开头的认为是xpath
            params = {"xpath": xpath}
            result = self.processor.doCommandWithElement(h5UserAPI.ByType.XPATH, h5UserAPI.ActionType.GET_ELEMENT_AND_CLICK,
                                                         **params)
        elif xpath and xpath.startswith("#"):
            # 以#开头的认为是selector
            params = {"selector": xpath}
            result = self.processor.doCommandWithElement(h5UserAPI.ByType.SELECTOR, h5UserAPI.ActionType.GET_ELEMENT_AND_CLICK,
                                                         **params)
        return result

    def getWindowHeight(self):
        return self.processor.doCommandWithoutElement(h5UserAPI.ActionType.GET_WINDOW_HEIGHT)

    def getWindowWidth(self):
        return self.processor.doCommandWithoutElement(h5UserAPI.ActionType.GET_WINDOW_WIDTH)

    def getCurrentPageUrl(self):
        return self.processor.doCommandWithoutElement(h5UserAPI.ActionType.GET_PAGE_URL)

    def clearInputTextByXpath(self, xpath):
        if xpath and xpath.startswith("/"):
            # 以/或//开头的认为是xpath
            params = {"xpath": xpath}
            return self.processor.doCommandWithElement(h5UserAPI.ByType.XPATH, h5UserAPI.ActionType.CLEAR_INPUT_TEXT,
                                                       **params)
        elif xpath and xpath.startswith("#"):
            # 以#开头的认为是selector
            params = {"selector": xpath}
            return self.processor.doCommandWithElement(h5UserAPI.ByType.SELECTOR, h5UserAPI.ActionType.CLEAR_INPUT_TEXT,
                                                       **params)

    def getAllContext(self):
        return self.processor.doCommandWithoutElement(h5UserAPI.ActionType.GET_ALL_CONTEXT)

    def getBodyNode(self):
        params = {'nodeId': 5}
        return self.processor.doCommandWithoutElement(h5UserAPI.ActionType.GET_BODY_NODE, **params)

    def requestChildNodes(self, nodeId=5):
        params = {"nodeId": nodeId}
        result = self.processor.doCommandWithoutElement(h5UserAPI.ActionType.REQUEST_CHILD_NODES,
                                                        **params)
        return result
