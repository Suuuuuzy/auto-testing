import os, re, json


def remove_whitespace(match: re.Match[str]) -> str:
    return re.sub(r"\s+", "", match.group(0))


if __name__ == "__main__":
    ROOT_DIR = "last25_data_copy"
    target_miniprogram = "wxe9714e742209d35f_唯品会特卖"
    miniprogram_dir = os.path.join(ROOT_DIR, target_miniprogram)

    navigation_patterns = [
        re.compile(r"wx\.navigateTo\s*\(\{.*?\}\)", re.DOTALL),
        # .*? is a non-greedy match, meaning it will capture as little content as possible,
        # stopping at the first closing curly brace } that matches the outer opening brace {.
        re.compile(r"wx\.redirectTo\s*\(\{.*?\}\)", re.DOTALL),
        # these two are for when the specified inner parameter is not a directionary but a variable
        re.compile(r"wx\.navigateTo\([^{}]*\)"),
        re.compile(r"wx\.redirectTo\([^{}]*\)"),
    ]
    navigation_dict = {}

    for root, _, files in os.walk(miniprogram_dir):

        for file in files:

            if file.endswith(".js"):  # looking for .js script only

                # if not file.endswith("user-videos.js"):
                #     continue

                file_dir = os.path.join(root, file)
                with open(file_dir, "r", encoding="utf-8") as f:
                    content = f.read()

                for navigation_pattern in navigation_patterns:
                    all_navigation_matches = re.findall(navigation_pattern, content)
                    all_navigation_paths = [
                        re.sub("\s+", "", match_instance)
                        for match_instance in all_navigation_matches
                    ]
                    # print(f"found {all_navigation_paths}")
                    if len(all_navigation_paths) > 0:
                        if (
                            navigation_dict.get(
                                file_dir.split(target_miniprogram)[1], None
                            )
                            is None
                        ):
                            navigation_dict[file_dir.split(target_miniprogram)[1]] = (
                                all_navigation_paths
                            )

                        else:
                            navigation_dict[
                                file_dir.split(target_miniprogram)[1]
                            ].extend(all_navigation_paths)

    output_dir = f"debug/{target_miniprogram}_navigation_path.json"
    with open(output_dir, "w", encoding="utf-8") as f:
        json.dump(navigation_dict, f, indent=4)
