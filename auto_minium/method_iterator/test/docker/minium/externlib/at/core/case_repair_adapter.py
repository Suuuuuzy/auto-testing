#!/usr/bin/env python3

"""
Author:         xiazeng
Create time:    2020/9/22
Description:    

"""
import inspect
import logging
import time
import datetime

import at
import at.core.uixml
import at.core.element
import at.core.uidevice
import at.core.exceptions
import case_repair_sdk

g_black_methods = ["to_main_ui", "_check_and_wait_status"]

logger = logging.getLogger()
g_test_id = None
g_seq_index = 0
g_run_mode = None
g_repair_sdk: case_repair_sdk.CaseRepairSdK = None
g_seq_info = {}
g_at_instance = None


class RepairConfig:
    ignore_check_failed = False  # 设置成True，在修复模式下，就不去检查修复的结果是否正确
    ignore_found_elem = False  # 设置成True，在修复模式下，如果能找到元素，就不做修复的逻辑


def add_block_methods(method_name):
    """不进行修复的函数"""
    if method_name not in g_black_methods:
        g_black_methods.append(method_name)


def set_run_mode(mode: str, test_id, at_instance, app_id) -> case_repair_sdk.CaseRepairSdK:
    """

    :param at_instance:
    :param mode: record/repair两种模式
    :return:
    """
    global g_run_mode, g_repair_sdk, g_at_instance, g_test_id
    if mode in ["record", "repair", "normal"]:
        g_run_mode = mode
        g_test_id = test_id
        g_repair_sdk = case_repair_sdk.CaseRepairSdK(test_id, app_id)
        g_at_instance = at_instance
        return g_repair_sdk
    else:
        raise RuntimeError("mode should be record or repair")


def set_ignore_check_failed(yes: bool):
    """
    设置忽略检查失败
    """
    RepairConfig.ignore_check_failed = yes


def is_record_mode():
    if g_run_mode == "record":
        return True
    return False


def is_normal_mode():
    if g_run_mode is None or g_run_mode == 'normal':
        return True
    return False


def is_repair_mode():
    if g_run_mode == "repair":
        return True
    return False


def ui_seq_start(seq_name, device_id=None):
    """
    用例开始运行时候上传
    :param seq_name:
    :param device_id 运行的手机ID，如果没有可以不传
    :return:
    """
    global g_seq_info
    if g_repair_sdk is None:
        return
    if device_id is None:
        device_id = int(time.time() % 1000000 * 1000)
    suffix = datetime.datetime.now().strftime("%H%M%S")
    # seq_id得保证唯一，为了人眼可快速定位，用test_id,device_id和时间拼一个id
    seq_id = f"{g_test_id}-{device_id}-{suffix}"
    g_seq_info = {
        "seq_name": seq_name,
        "seq_id": seq_id,
        "device_id": device_id,
        "device_desc": g_at_instance.adb.desc,
        "test_id": g_test_id,
        "is_finish": False,
        "mode": g_run_mode
    }
    g_repair_sdk.update_ui_seq(g_seq_info["seq_id"], g_seq_info)


def ui_seq_stop(success: bool, other_info=None):
    """
    用例结束运行时，上传，可以放到用例的teardown
    :param success:
    :param other_info:
    :return:
    """
    global g_seq_info, g_run_mode
    if g_repair_sdk is None:
        return
    g_run_mode = 'normal'
    g_seq_info["success"] = success
    g_seq_info["is_finish"] = True
    if other_info:
        if "case_name" in other_info:
            del other_info['case_name']
        if "seq_id" in other_info:
            del other_info['seq_id']
        g_seq_info.update(other_info)
    g_repair_sdk.update_ui_seq(g_seq_info["seq_id"], g_seq_info)
    g_seq_info = {}


def deco_do_action(f):
    """
    执行UI操作的装饰器
    :return:
    """

    def do_action(obj, *args, **kwargs):
        # 避免递归调用
        frames = inspect.stack()
        if len(frames) > 2:
            for frame in frames[1:]:
                method_name = frame[3]
                if method_name == "do_action":
                    return f(obj, *args, **kwargs)
                if method_name in g_black_methods:
                    logging.debug("ignore method:%s", method_name)
                    return f(obj, *args, **kwargs)

        if is_normal_mode():
            # 普通模式
            return f(obj, *args, **kwargs)
        elif not g_seq_info:
            # 录制或者回放模式，但是没有设置用例信息，一般是环境初始化的时候，跳过
            logger.error("case not start, do nothing, mode=%s", g_run_mode)
            return f(obj, *args, **kwargs)

        def get_xml_and_page(base_xml=None, retry=5):
            time.sleep(1)
            _xml_list = g_at_instance.java_driver.get_all_window_xmls()
            _xml_list = [g_at_instance.e.resguard.retrace_xml(_xml) for _xml in _xml_list]
            _page_name = g_at_instance.adb.get_current_activity()
            if _page_name is None:
                _page_name = "unknown"
            xml = None

            if len(_xml_list) > 1:
                # 删除无效的windows
                delete_index_list = []
                for i in range(len(_xml_list)):
                    ui_views = at.core.uixml.window_dump_parse_str(_xml_list[i])
                    if len(ui_views) <= 1:
                        logger.error("empty xml, delete it:%s, size:%s", _xml_list[i], len(_xml_list))
                        delete_index_list.append(i)
                delete_index_list.reverse()
                for i in delete_index_list:
                    del _xml_list[i]

            if retry == 0:
                return _xml_list[0], _page_name

            # 兼容逻辑，提高获取xml的稳定性
            if _page_name and 'com.tencent.mm' in _page_name:
                # 微信界面，但是拿到的xml确没有微信的信息
                if len(_xml_list) == 1 and 'com.tencent.mm' not in _xml_list[0]:
                    logger.error("is wechat activity, but xml not contains mm info, wait and try %s", retry)
                    return get_xml_and_page(base_xml, retry=retry - 1)

            for xml in _xml_list:
                if "android.widget.ProgressBar" in xml \
                        or 'com.tencent.mm:id/circle_progress_view' in xml \
                        :
                    logger.error("ProgressBar exists, wait and try %s", retry)
                    return get_xml_and_page(base_xml, retry=retry - 1)

            for xml in _xml_list:
                if "提醒" in xml and "多选" in xml:
                    # 微信会话弹框，会有多个窗口，默认用弹框里面的
                    if xml == base_xml:
                        logger.error("same as before, wait and try %s", retry)
                        return get_xml_and_page(base_xml, retry=retry - 1)
                    return xml, _page_name
            for xml in _xml_list:
                if "com.tencent.mm" in xml:
                    if xml == base_xml:
                        logger.error("same as before, wait and try %s", retry)
                        return get_xml_and_page(base_xml, retry=retry - 1)
                    return xml, _page_name
            for xml in _xml_list:
                if "com.android.systemui" not in xml:
                    if xml == base_xml:
                        logger.error("same as before, wait and try %s", retry)
                        return get_xml_and_page(base_xml, retry=retry - 1)
                    return xml, _page_name
            return _xml_list[0], _page_name

        def get_operation():
            operation = {
                "action": f.__name__,
                "widget": {

                },
                "x": -1,
                "y": -1,
                # 复杂的选项有问题
                "locator": {

                }
            }
            if isinstance(obj, at.core.element.Element):
                check_scroll = False
                if len(args) > 0 and args[0] == True:
                    check_scroll = True
                elif kwargs and kwargs.get("is_scroll"):
                    check_scroll = True

                max_scroll_num = 1
                width = g_at_instance.device.width()
                height = g_at_instance.device.height()
                if check_scroll:
                    max_scroll_num = 8
                    try:
                        list_view = at.core.element.Element().cls_name("android.widget.ListView").get_view()
                        logger.debug("max_scroll_num:%s, ui_view:%s", max_scroll_num, list_view)
                        if list_view:
                            width = list_view.width
                            height = list_view.height
                    except at.core.exceptions.UiNotFoundError:
                        logger.warning("max_scroll_num:%s, list view not found", max_scroll_num)

                from_points = [width / 2, height * 3 / 4]
                end_points = [width / 2, height * 1 / 4]
                steps = 12

                for i in range(max_scroll_num):
                    try:
                        ui_view = obj.get_view()
                        operation['locator'] = {
                            "type": "attr",
                            "value": ui_view.to_dict(),
                        }
                        operation["widget"] = {"x": ui_view.x1,
                                               "y": ui_view.y1,
                                               "w": ui_view.width,
                                               'h': ui_view.height
                                               }
                        return operation, True
                    except at.core.exceptions.UiNotFoundError:
                        logger.exception("need repair, because element not found:%s, remain scroll num:%s", obj,
                                         max_scroll_num - i - 1)
                        operation['locator'] = None
                        if i + 1 == max_scroll_num:
                            return operation, None
                    scroll_args = from_points + end_points
                    g_at_instance.device.scroll(*scroll_args, steps)

                # 滑动之后还是没有找到，恢复状态
                for i in range(max_scroll_num - 1):
                    scroll_args = end_points + from_points
                    g_at_instance.device.scroll(*scroll_args, steps)

                return operation, False

            elif isinstance(obj, at.core.uidevice.PyUiDevice):
                if f.__name__ == "click_on_point":
                    operation['x'], operation['y'] = args[0], args[1]
                else:
                    raise case_repair_sdk.RecordError("需要补充场景")
            else:
                raise case_repair_sdk.RecordError("不支持录制")

            return operation, True

        if is_record_mode():
            # 录制模式
            operation, found_it = get_operation()
            if not found_it:
                return f(obj, *args, **kwargs)
            before_xml, page_name = get_xml_and_page()
            before_img_base64 = g_at_instance.java_driver.request_at_device("screen", [1.0, 20, 200])

            f_ret = f(obj, *args, **kwargs)
            # 如果马上获取xml可能会出现中间状态
            time.sleep(2)
            after_xml, after_page_name = get_xml_and_page(before_xml)
            after_img_base64 = g_at_instance.java_driver.request_at_device("screen", [1.0, 20, 200])
            g_repair_sdk.upload_test_step(g_seq_info["seq_name"], page_name, g_seq_info["seq_id"], before_xml,
                                          after_xml, before_img_base64, after_img_base64, operation, after_page_name)
            return f_ret
        elif is_repair_mode():
            # 修复模式
            operation, found_it = get_operation()
            before_xml, page_name = get_xml_and_page()
            before_img_base64 = g_at_instance.java_driver.request_at_device("screen", [1.0, 20, 200])
            if found_it and RepairConfig.ignore_found_elem:
                return f(obj, *args, **kwargs)
            logger.debug("found elem:%s, operation:%s", found_it, operation)
            try:
                res, trace_id = g_repair_sdk.obtain_candidate(g_seq_info["seq_name"], page_name, g_seq_info["seq_id"],
                                                              before_xml, before_img_base64, operation)
            except:
                if found_it:
                    logger.exception("error, but element has found, ignore exception:")
                    return f(obj, *args, **kwargs)
                else:
                    raise

            repair_index = 0

            def try_repair(_candidate_item, _operation):
                # todo: 解析返回的数据
                logger.info("index:%s, candidate_item:%s, %s", repair_index, _candidate_item, _operation)
                if 'w' not in _candidate_item and 'rect' in _candidate_item:
                    x = int((_candidate_item['rect'][0] + _candidate_item['rect'][2]) / 2)
                    y = int((_candidate_item['rect'][1] + _candidate_item['rect'][3]) / 2)
                else:
                    x = _candidate_item['x'] + _candidate_item['w'] / 2
                    y = _candidate_item['y'] + _candidate_item['h'] / 2
                operation_action = _operation.get('action')
                if operation_action == "click" or operation_action == "click_on_point":
                    g_at_instance.device.click_on_point(x, y)
                elif operation_action == "long_click":
                    g_at_instance.device.long_click_on_point(x, y)
                elif operation_action == 'enter':
                    # 中午输入必须要用用java层输入，所以必须要在java层实现，比较复杂，暂时不做
                    g_at_instance.device.enter(args[0])
                    raise case_repair_sdk.RepairError("输入暂时不支持修复:%s" % _operation.get('action'))
                else:
                    raise case_repair_sdk.RepairError("unknown operation action:%s" % _operation.get('action'))

                time.sleep(2)
                return True

            if not res["need_repair"] or found_it:
                # 无需修复
                f_ret = f(obj, *args, **kwargs)
            elif not res['match_type']:
                # 当前状态完全不匹配
                raise case_repair_sdk.RepairError("empty match_type")
            else:
                # 进行修复
                candidate_item = res["candidate_item"]
                operation = res["operation"]
                repair_index += 1
                f_ret = try_repair(candidate_item, operation)

            # 校验修复是否正确
            while True:
                after_xml, page_name = get_xml_and_page(before_xml)
                before_xml = after_xml
                after_img_base64 = g_at_instance.java_driver.request_at_device("screen", [1.0, 20, 200])
                res = g_repair_sdk.check_repair(g_seq_info["seq_name"], page_name,
                                                g_seq_info["seq_id"], after_xml, after_img_base64, trace_id,
                                                operation)
                if res.get("need_repair"):
                    # 复杂case才会走到这个模式，如
                    # old path : page1 -> page2
                    # new path : page1 -> page' -> page2
                    f_ret = try_repair(res["candidate_item"], {'action': 'click'})
                elif res.get("is_repaired"):
                    break
                else:
                    if RepairConfig.ignore_check_failed:
                        logger.error("验证失败，但是配置忽略了验证失败，继续往下走")
                        break
                    else:
                        raise case_repair_sdk.CheckError("验证修复后的结果失败")
            return f_ret
        else:
            raise case_repair_sdk.RepairError("不能解析的运行模式")

    return do_action
