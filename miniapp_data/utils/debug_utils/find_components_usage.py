import logging, os, argparse, re, json
from typing import Dict, List


def print_and_log_info(f_data: str, logger=None):
    print(f_data)
    if logger is not None:
        logger.info(f_data)


def check_pattern(
    file_dir: str, pattern: re.Pattern, find_all: bool = False
) -> List[re.Match[str]] | re.Match[str] | None:
    with open(file_dir, "r", encoding="utf-8") as f:
        content = f.read()
        return re.findall(pattern, content) if find_all else re.search(pattern, content)


def check_json_index(file_dir: str, pattern: re.Pattern) -> List[str]:
    JSON_SUBSCRIPT = ".json"
    assert (
        file_dir[-len(JSON_SUBSCRIPT) :] == JSON_SUBSCRIPT
    )  # make sure it is a json script

    with open(file_dir, "r", encoding="utf-8") as f:
        # content = f.read()
        json_content = json.load(f)

    assert type(json_content) == dict  # make sure it is a dictionary
    return_comps = []
    if json_content.get("usingComponents", None) is not None:
        for comp_name, comp_dir in json_content["usingComponents"].items():
            if re.search(pattern, comp_dir) is not None:
                return_comps.append(comp_name)

    return return_comps


if __name__ == "__main__":
    # metadata
    root_dir = "last25_data_copy"
    target_miniapp = "wx7ddec43d9d27276a_中通快递"

    # prepare logging
    logging.basicConfig(
        level=logging.INFO,
        encoding="utf-8",
        format="%(asctime)s - %(levelname)s - %(message)s",
    )
    logger = logging.getLogger("find_subpages")
    file_handler = logging.FileHandler(
        f"debug/{target_miniapp}_find_components_usage.out", encoding="utf-8"
    )
    file_handler.setFormatter(
        logging.Formatter("%(asctime)s - %(levelname)s - %(message)s")
    )
    logger.addHandler(file_handler)
    # prepare parser
    parser = argparse.ArgumentParser()
    parser.add_argument("-p", "--pattern", type=str)
    parser.add_argument("-f", "--functions", type=str, default="")
    # currently only used if the data_type is require
    parser.add_argument("-d", "--data_type", type=str, default="script")
    args = parser.parse_args()

    # print_and_log_info(f"checking for pattern {pattern}", logger=logger)

    target_miniapp_dir = os.path.join(root_dir, target_miniapp)
    for root, _, files in os.walk(target_miniapp_dir):
        if args.data_type == "script":  # Only check .js files
            pattern = rf"{args.pattern}"

            for file in files:

                if file.endswith(".js"):
                    file_path = os.path.join(root, file)

                    try:
                        plugin_flag = check_pattern(file_path, pattern)
                    except Exception as e:
                        continue

                    if plugin_flag is not None:
                        print_and_log_info(
                            f"finding plugin pattern {pattern} in {file_path[len(target_miniapp_dir):]}",
                            logger=logger,
                        )

        elif args.data_type == "require":
            # Only check .js files, but check for multiple patterns
            pattern_arr = args.pattern.split("/")
            # try to eliminate the instance where it just becomes index, which has a million pair
            patterns = [
                rf'(require\(["\'][./]+{"/".join(pattern_arr[idx:])}["\']\))'
                for idx in range(len(pattern_arr))
                if "/".join(pattern_arr[idx:]) != "index"
            ]
            for file in files:

                if file.endswith(".js"):
                    file_path = os.path.join(root, file)

                    for require_pattern in patterns:
                        try:
                            plugin_flag = check_pattern(file_path, require_pattern)
                            if plugin_flag is not None:
                                break
                        except Exception as e:
                            continue

                    if plugin_flag is not None:
                        print_and_log_info(
                            f"finding plugin pattern {plugin_flag.group(1)} in {file_path[len(target_miniapp_dir):]}",
                            logger=logger,
                        )

                        require_variable_pattern = re.compile(
                            r"[\s,;]*([^\s,;=]+)\s*=\s*" + require_pattern
                        )

                        try:
                            plugin_flag = check_pattern(
                                file_path, require_variable_pattern
                            )
                        except Exception as e:
                            continue

                        if plugin_flag is not None:
                            print_and_log_info(
                                f"the plugin {plugin_flag.group(2)} is captured by variable {plugin_flag.group(1)}",
                                logger=logger,
                            )

                            if (
                                plugin_flag.group(1)[: len("exports.")]
                                != "exports."  # not direct export
                                and args.functions != ""
                            ):
                                function_arr = args.functions.split(",")

                                for function in function_arr:
                                    require_variable_function_pattern = rf"([^\n;]*{plugin_flag.group(1) + '.' + function}[^\s;]*)"
                                    try:
                                        plugin_flags = check_pattern(
                                            file_path,
                                            require_variable_function_pattern,
                                            find_all=True,
                                        )
                                    except Exception as e:
                                        continue

                                    if len(plugin_flags) > 0:
                                        for plugin_flag in plugin_flags:
                                            print_and_log_info(
                                                f"found function usage snapshot: {plugin_flag.strip()}",
                                                logger=logger,
                                            )

        elif args.data_type == "use_component":
            # first check each .json file to see if the component is included
            pattern_arr = args.pattern.split("/")
            patterns = [
                rf'{"/".join(pattern_arr[idx:])}'
                for idx in range(len(pattern_arr))
                if "/".join(pattern_arr[idx:]) != "index"
            ]
            all_part_names = set([file.split(".")[0] for file in files])

            for part_name in all_part_names:
                if (not os.path.exists(os.path.join(root, part_name + ".json"))) or (
                    not os.path.exists(os.path.join(root, part_name + ".wxml"))
                ):
                    continue  # skipping anything that does not have both json and wxml file
                json_file_path = os.path.join(root, part_name + ".json")

                for pattern in patterns:
                    json_search_results = check_json_index(json_file_path, pattern)
                    if len(json_search_results) > 0:
                        break

                if len(json_search_results) > 0:
                    print_and_log_info(
                        f"finding corresponding components {json_search_results} in {json_file_path[len(target_miniapp_dir):]}",
                        logger=logger,
                    )
                    wxml_file_path = os.path.join(root, part_name + ".wxml")
                    plugin_flag = None
                    for search_result in json_search_results:
                        comp_pattern = rf"<{search_result}"  # find the search_result component in corresponding wxml file
                        try:
                            plugin_flag = check_pattern(wxml_file_path, comp_pattern)
                            if plugin_flag is not None:
                                break
                        except Exception as e:
                            continue

                    if plugin_flag is not None:
                        print_and_log_info(
                            f"finding plugin pattern {comp_pattern} in {wxml_file_path[len(target_miniapp_dir):]}",
                            logger=logger,
                        )
