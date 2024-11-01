import os, re, json, logging, argparse
from typing import List, Dict, Set
from constants_utils import ALL_API_DEFINED_COMPONENTS


def get_all_predefined_components() -> Set[str]:
    all_component_list = []
    for _, values in ALL_API_DEFINED_COMPONENTS.items():
        all_component_list.extend(values)

    return set(all_component_list)


def component_name_variations(component_name: str) -> set[str]:
    variation_set = set()
    all_lower_case = component_name.lower()
    variation_set.add(all_lower_case)

    no_slash = re.sub(r"[-_]", "", component_name)
    variation_set.add(no_slash)

    component_arr = component_name.split("-")
    component_arr_02 = []
    for component_item in component_arr:
        component_arr_02.extend(component_item.split("_"))

    if (component_arr_02[-1] == "popup" or component_arr_02[-1] == "button") and len(
        component_arr_02
    ) > 1:
        another_set = component_name_variations("-".join(component_arr_02[:-1]))
        variation_set.update(another_set)

    all_capitalized = "".join(
        [component_item.capitalize() for component_item in component_arr_02]
    )
    all_but_first_capitalized = (
        component_arr_02[0]
        if len(component_arr_02) == 1
        else component_arr_02[0]
        + "".join(
            [component_item.capitalize() for component_item in component_arr_02[1:]]
        )
    )
    variation_set.add(all_capitalized)
    variation_set.add(all_but_first_capitalized)

    mid_to_ground_slash = re.sub(r"[-]", "_", component_name)
    variation_set.add(mid_to_ground_slash)

    ground_to_mid_slash = re.sub(r"[_]", "-", component_name)
    variation_set.add(ground_to_mid_slash)

    return variation_set


def modify_component_dir(target_dir: str, component_dir: str) -> str:
    normalized_target_dir = normalize_path_dir(target_dir)
    normalized_component_dir = normalize_path_dir(component_dir)

    normalized_target_dir_arr = normalized_target_dir.split("/")
    normalized_component_dir_arr = normalized_component_dir.split("/")

    target_lev = len(normalized_target_dir_arr)
    component_lev = len(normalized_component_dir_arr)

    similarity_lev = 0
    for idx in range(min(target_lev, component_lev)):
        if normalized_target_dir_arr[idx] == normalized_component_dir_arr[idx]:
            similarity_lev += 1
        else:
            break


def remove_whitespace(match: re.Match[str]) -> str:
    return re.sub(r"\s+", "", match.group(0))


def normalize_path_dir(path_name: str) -> str:
    path_name_re = rf"{path_name}"
    return path_name_re.replace("\\", "/")


def find_all_components(file_name: str) -> List[re.Pattern]:
    with open(file_name, "r", encoding="utf-8") as f:
        content = f.read()
    pattern = re.compile(r"<([^/>}{=?:\s]+)")
    return pattern.findall(content)


if __name__ == "__main__":

    parser = argparse.ArgumentParser()
    parser.add_argument("-r", "--rootdir", type=str, default="last25_data_copy")
    parser.add_argument(
        "-p", "--miniprogram", type=str, default="wx7ddec43d9d27276a_中通快递"
    )
    # if level is set to "app", run the examination through the entire app
    # else just run it through a single file
    parser.add_argument("-l", "--level", type=str, default="app")
    parser.add_argument("-f", "--file", type=str, default="")
    parser.add_argument("-m", "--mode", type=str, default="check")
    parser.add_argument("-i", "--input", type=str, default="")
    args = parser.parse_args()

    if args.level != "app":
        assert args.file != ""

    miniprogram_dir = os.path.join(args.rootdir, args.miniprogram)

    logging.basicConfig(
        level=logging.INFO,
        encoding="utf-8",
        format="%(message)s",
    )
    logger = logging.getLogger("find_component_dependency")
    file_handler = logging.FileHandler(
        f"debug/{args.miniprogram}_{args.mode}_compile_missing_component_dependency.out",
        encoding="utf-8",
    )
    file_handler.setFormatter(logging.Formatter("%(message)s"))
    logger.addHandler(file_handler)

    if args.mode == "apply":
        if args.input == "":
            assert os.path.exists(
                f"debug/{args.miniprogram}_using_components_list.json"
            )
            args.input = f"debug/{args.miniprogram}_using_components_list.json"
        else:
            assert os.path.exists(args.input)

        with open(args.input, "r", encoding="utf-8") as f:
            component_dict = json.load(f)

        for page_name, page_components in component_dict.items():
            try:
                filtered_page_components = {
                    key: value
                    for key, value in page_components.items()
                    if value is not None
                }
                with open(page_name, "r", encoding="utf-8") as f:
                    json_config = json.load(f)
                if json_config.get("usingComponents", None) is None:
                    json_config["usingComponents"] = filtered_page_components
                else:
                    json_config["usingComponents"] = {
                        key: value
                        for key, value in json_config["usingComponents"].items()
                        if value is not None
                    }
                    json_config["usingComponents"].update(filtered_page_components)
                with open(page_name, "w", encoding="utf-8") as f:
                    json.dump(json_config, f, indent=4)

            except Exception as e:
                logger.info(
                    f"got exception {str(e)} when trying to insert usingComponents on page {page_name}"
                )
                continue

    elif args.mode == "check":

        all_predefined_components = get_all_predefined_components()

        navigation_patterns = re.compile(r"<([^\\s]*)")

        # let's do it twice. The first time figuring out all the components
        # the second time trying the pair them

        all_component_dict: Dict[str, List[str]] = {}
        for root, _, files in os.walk(miniprogram_dir):

            normalized_root_dir = normalize_path_dir(root[len(miniprogram_dir) :])
            component_flag = "components" in normalized_root_dir.split("/")

            if component_flag is True:
                base_dir = os.path.basename(normalized_root_dir)
                if base_dir != "components":
                    normalized_root_component_dir = None
                    for file in files:
                        if file.endswith(".wxml"):
                            if file == "index.wxml":
                                normalized_root_component_dir = (
                                    normalized_root_dir + "/index"
                                )
                            elif file == f"{base_dir}.wxml":
                                normalized_root_component_dir = (
                                    normalized_root_dir + f"/{base_dir}"
                                )
                            else:
                                file_name = file.split(".")[0]
                                file_normalized_root_component_dir = (
                                    normalized_root_dir + f"/{file_name}"
                                )
                                if all_component_dict.get(file_name, None) is None:
                                    all_component_dict[file_name] = [
                                        file_normalized_root_component_dir
                                    ]
                                else:
                                    all_component_dict[file_name].append(
                                        file_normalized_root_component_dir
                                    )

                    if normalized_root_component_dir is None:
                        continue
                    if all_component_dict.get(base_dir, None) is None:
                        all_component_dict[base_dir] = [normalized_root_component_dir]
                    else:
                        all_component_dict[base_dir].append(
                            normalized_root_component_dir
                        )

        with open(
            f"debug/{args.miniprogram}_components_list.json", "w", encoding="utf-8"
        ) as f:
            json.dump(all_component_dict, f, indent=4)

        all_use_component_dict = {}
        for root, _, files in os.walk(miniprogram_dir):
            # after having it, let's try a script
            new_set = set([file.split(".")[0] for file in files])

            for item in new_set:
                use_component_dict = {}
                existing_use_component_dict = {}

                wxml_dir = normalize_path_dir(os.path.join(root, item + ".wxml"))
                json_dir = normalize_path_dir(os.path.join(root, item + ".json"))

                # case 1: if not a script with both wxml and json: just skip
                if (not os.path.exists(wxml_dir)) or (not os.path.exists(json_dir)):
                    continue

                # case 2: if the json script already has usingComponents:
                # store the existing component
                with open(json_dir, "r", encoding="utf-8") as f:
                    json_content = json.load(f)

                if json_content.get("usingComponents", None) is not None:
                    existing_use_component_dict = json_content["usingComponents"]

                component_set = set(find_all_components(wxml_dir))
                all_preexsting_components = all_predefined_components | set(
                    existing_use_component_dict.keys()
                )
                all_unpredefined_components = component_set.difference(
                    all_preexsting_components
                )

                # case 3: if there is no unpredefined component: just move to the next one
                if len(all_unpredefined_components) == 0:
                    continue

                logger.info(
                    f"surveying script {json_dir}; non-predefined components include: "
                )
                logger.info(all_unpredefined_components)

                for unpredefined_component in all_unpredefined_components:
                    if (all_component_dict.get(unpredefined_component, None)) is None:

                        all_component_variations = component_name_variations(
                            unpredefined_component
                        )
                        found_flag = False
                        for component_variation in all_component_variations:
                            if (
                                all_component_dict.get(component_variation, None)
                            ) is not None:
                                logger.info(
                                    f"{unpredefined_component}'s variation {component_variation} found to be defined on page {all_component_dict[component_variation]}"
                                )
                                found_flag = True
                                use_component_dict[unpredefined_component] = (
                                    all_component_dict[component_variation][0]
                                )
                                break
                        if found_flag is False:

                            logger.info(
                                f"unable to find component {unpredefined_component} among defined components."
                            )
                            use_component_dict[unpredefined_component] = None
                    else:
                        logger.info(
                            f"{unpredefined_component} found to be defined on page {all_component_dict[unpredefined_component]}"
                        )
                        use_component_dict[unpredefined_component] = all_component_dict[
                            unpredefined_component
                        ][0]

                all_use_component_dict[json_dir] = use_component_dict

        with open(
            f"debug/{args.miniprogram}_using_components_list.json",
            "w",
            encoding="utf-8",
        ) as f:
            json.dump(all_use_component_dict, f, indent=4)
