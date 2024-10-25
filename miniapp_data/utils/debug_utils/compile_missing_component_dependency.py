import os, re, json, logging
from typing import List, Dict


def remove_whitespace(match: re.Match[str]) -> str:
    return re.sub(r"\s+", "", match.group(0))


def inside_components(path_name: str) -> bool:
    all_directories = path_name.split("\\")
    second_split_all_directories = []
    for directory in all_directories:
        directories = directory.split("/")
        second_split_all_directories.extend(directories)

    return "components" in second_split_all_directories


if __name__ == "__main__":
    ROOT_DIR = "last25_data_copy"
    target_miniprogram = "wx7ddec43d9d27276a_中通快递"
    miniprogram_dir = os.path.join(ROOT_DIR, target_miniprogram)

    navigation_patterns = re.compile(r"<([^\\s]*)")

    logging.basicConfig(
        level=logging.INFO,
        encoding="utf-8",
        format="%(asctime)s - %(levelname)s - %(message)s",
    )
    logger = logging.getLogger("find_subpages")
    file_handler = logging.FileHandler(
        f"debug/{target_miniprogram}_compile_missing_component_dependency.out",
        encoding="utf-8",
    )
    file_handler.setFormatter(
        logging.Formatter("%(asctime)s - %(levelname)s - %(message)s")
    )
    logger.addHandler(file_handler)

    # let's do it twice. The first time figuring out all the components
    # the second time trying the pair them

    all_component_dict: Dict[str, List[str]] = {}
    for root, _, files in os.walk(miniprogram_dir):

        root_dir_without_head = root[len(miniprogram_dir) :]
        component_flag = inside_components(root_dir_without_head)

    #     for file in files:

    #         if file.endswith(".js"):  # looking for .js script only

    #             # if not file.endswith("user-videos.js"):
    #             #     continue

    #             file_dir = os.path.join(root, file)
    #             with open(file_dir, "r", encoding="utf-8") as f:
    #                 content = f.read()

    #             for navigation_pattern in navigation_patterns:
    #                 all_navigation_matches = re.findall(navigation_pattern, content)
    #                 all_navigation_paths = [
    #                     re.sub("\s+", "", match_instance)
    #                     for match_instance in all_navigation_matches
    #                 ]
    #                 # print(f"found {all_navigation_paths}")
    #                 if len(all_navigation_paths) > 0:
    #                     if (
    #                         navigation_dict.get(
    #                             file_dir.split(target_miniprogram)[1], None
    #                         )
    #                         is None
    #                     ):
    #                         navigation_dict[file_dir.split(target_miniprogram)[1]] = (
    #                             all_navigation_paths
    #                         )

    #                     else:
    #                         navigation_dict[
    #                             file_dir.split(target_miniprogram)[1]
    #                         ].extend(all_navigation_paths)

    # output_dir = f"debug/{target_miniprogram}_navigation_path.json"
    # with open(output_dir, "w", encoding="utf-8") as f:
    #     json.dump(navigation_dict, f, indent=4)
