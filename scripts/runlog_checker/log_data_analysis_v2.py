import re, json, argparse, random, os
import numpy as np
import pandas as pd
from typing import Dict, List, Tuple, Set

ALL_INFO_EXTRACTION_PATTERNS: Dict[str, re.Pattern] = {
    "timing pattern": re.compile(
        r"(\d{4}-\d{2}-\d{2}\s\d{2}:\d{2}:\d{2}.\d{3})\s+(\w+)\s+([\w\s-]+):\s"
    ),
    "start test pattern single": re.compile(r"Start Running test for: ([^\s]+)"),
    "start test pattern multi": re.compile(
        r"test_methods\s\(test_minium.Minium_Query\)"
    ),
    "finished pages pattern": re.compile(r"Finished (\d+) pages out of (\d+)"),
    "visited pages pattern": re.compile(r"Visited (\d+) pages out of (\d+)"),
    "visited binding func pattern": re.compile(
        r"Visited (\d+) binding functions out of (\d+)"
    ),
    "visited input form pattern": re.compile(r"Visited (\d+) input/forms out of (\d+)"),
    "duration report pattern": re.compile(r"Elapse time: (\d+:\d+:\d+.\d+)"),
    "error spec pattern": re.compile(
        r"\[[\d\w]{8}-[\d\w]{4}-[\d\w]{4}-[\d\w]{4}-[\d\w]{12}\]"
    ),
}
ELIMINATABLE_LOG_LINES: List[str] = [
    "Traceback ",
    "During handling of the above exception, another exception occurred:",
    "The above exception was the direct cause of the following exception:",
    "Detailed Time-based CPU and Memory Usage Log:",
]


def separate_log_instances(
    autominium_test_log: str, starter_pattern: re.Pattern
) -> List[str]:
    autominium_test_log_arr = re.finditer(starter_pattern, autominium_test_log)
    match_spans = [match.span()[0] for match in autominium_test_log_arr]
    match_spans = [
        (
            match_spans[idx],
            (
                match_spans[idx + 1]
                if idx + 1 < len(match_spans)
                else len(autominium_test_log)
            ),
        )
        for idx in range(len(match_spans))
    ]
    all_log_instances = [
        autominium_test_log[match_span[0] : match_span[1]] for match_span in match_spans
    ]
    return all_log_instances


def find_more_complete_navigation(
    dict_one: Dict[str, any], dict_two: Dict[str, any]
) -> Dict[str, any]:
    all_comparisons = [
        "finished_pages",
        "visited_pages",
        "visited_bindings",
        "visited_input_form",
    ]

    for comparison_item in all_comparisons:
        if dict_one.get(comparison_item, -1) > dict_two.get(comparison_item, -1):
            return dict_one
        elif dict_one.get(comparison_item, -1) < dict_two.get(comparison_item, -1):
            return dict_two

    # if all the same, return the more recent one
    return dict_two


def split_log_data(log_line_arr: List[str]) -> List[Tuple[str, str, str, str]]:
    timing_pattern = ALL_INFO_EXTRACTION_PATTERNS["timing pattern"]
    return [
        (
            (
                re.search(timing_pattern, log_line).group(1),
                re.search(timing_pattern, log_line).group(2),
                re.search(timing_pattern, log_line).group(3),
                re.sub(timing_pattern, "", log_line),
            )
            if re.search(timing_pattern, log_line) is not None
            else ("", "", "", log_line)
        )
        for log_line in log_line_arr
        if (
            len(log_line) != 0  # the instance of blank line
            and log_line[0]
            != " "  # the first instance is space is the feature of error traceback
            and all(
                len(log_line) < len(line) or log_line[: len(line)] != line
                for line in ELIMINATABLE_LOG_LINES
            )
        )
    ]


def process_data(
    log_instance: str, all_error_types_set, single_mode: bool = True
) -> Dict[str, any]:
    current_instance_dict: Dict = {}
    current_instance_dict["error_types"] = set()
    current_instance_dict["error_msgs"] = set()
    log_line_arr = log_instance.split("\n")
    log_line_arr = split_log_data(log_line_arr)
    for log_time, log_type, test_type, log_spec in log_line_arr:
        if log_type == "INFO":
            if test_type == "main - maintest":

                if single_mode is True:

                    # e.g. 2024-11-06 14:21:48.766 INFO main - maintest: Start Running test for: /media/dataj/wechat-devtools-linux/testing/auto-testing/data/newcrawl/pkg_unpack/wxc18b7efa19f4fe55
                    start_test_search = re.search(
                        ALL_INFO_EXTRACTION_PATTERNS["start test pattern single"],
                        log_spec,
                    )

                    if start_test_search is not None:
                        current_instance_dict["dir"] = start_test_search.group(1)
                        current_instance_dict["miniprogram_name"] = (
                            current_instance_dict["dir"].split("/")[-1]
                        )
                        current_instance_dict["Time duration"] = log_time
                        continue

                else:

                    start_test_search = re.search(
                        ALL_INFO_EXTRACTION_PATTERNS["start test pattern multi"],
                        log_spec,
                    )

                    if start_test_search is not None:
                        current_instance_dict["Time duration"] = log_time
                        continue

                # e.g. 2024-11-06 17:39:53.029 INFO main - maintest: Elapse time: 0:00:54.602617
                duration_report_search = re.search(
                    ALL_INFO_EXTRACTION_PATTERNS["duration report pattern"],
                    log_spec,
                )

                if duration_report_search is not None:
                    time_str = duration_report_search.group(1)
                    time_str_arr = time_str.split(":")
                    hour_time, min_time, second_time = (
                        int(time_str_arr[0]),
                        int(time_str_arr[1]),
                        float(time_str_arr[2]),
                    )
                    current_instance_dict["Elapse time segment"] = (
                        duration_report_search.group(1)
                    )
                    current_instance_dict["Elapse time"] = (
                        hour_time * 3600 + min_time * 60 + second_time
                    )
                    current_instance_dict["Time duration"] += " - " + log_time
                    continue

            elif test_type == "test_minium - tearDown":
                for idx, (stat_pattern, stat_key) in enumerate(
                    [
                        (
                            ALL_INFO_EXTRACTION_PATTERNS["finished pages pattern"],
                            "pages",
                        ),
                        (
                            ALL_INFO_EXTRACTION_PATTERNS["visited pages pattern"],
                            "pages",
                        ),
                        (
                            ALL_INFO_EXTRACTION_PATTERNS[
                                "visited binding func pattern"
                            ],
                            "bindings",
                        ),
                        (
                            ALL_INFO_EXTRACTION_PATTERNS["visited input form pattern"],
                            "input_form",
                        ),
                    ]
                ):

                    pattern_search = re.search(stat_pattern, log_spec)

                    if pattern_search is not None:
                        item_key = (
                            f"finished_{stat_key}"
                            if idx == 0
                            else f"visited_{stat_key}"
                        )
                        all_key = f"all_{stat_key}"
                        ratio_key = item_key + "_ratio"
                        current_instance_dict[item_key] = int(pattern_search.group(1))
                        current_instance_dict[all_key] = int(pattern_search.group(2))
                        current_instance_dict[ratio_key] = (
                            float(pattern_search.group(1))
                            / float(pattern_search.group(2))
                            if float(pattern_search.group(2)) != 0
                            else None
                        )
                        continue

        elif log_type == "ERROR" and test_type == "main - maintest":
            if log_spec.split(": ")[0] == "No app.json for":
                current_instance_dict["error_types"].add("No app.json")
                current_instance_dict["error_msgs"].add(log_spec)
                all_error_types_set.add("No app.json")

        elif log_time == "" and log_type == "" and test_type == "":
            # let's eliminate the specification e.g. [b4525f34-a988-4a54-ad3b-79c760c66032]
            log_spec = re.sub(
                ALL_INFO_EXTRACTION_PATTERNS["error spec pattern"], "", log_spec
            )
            current_instance_dict["error_types"].add(log_spec.split(": ")[0])
            current_instance_dict["error_msgs"].add(log_spec)
            all_error_types_set.add(log_spec.split(": ")[0])

    current_instance_dict["error_types"] = list(current_instance_dict["error_types"])
    current_instance_dict["error_msgs"] = list(current_instance_dict["error_msgs"])
    return current_instance_dict


if __name__ == "__main__":
    parser = argparse.ArgumentParser()

    # inputs
    parser.add_argument(
        "-ml",
        "--multi_log_input",
        type=str,
        help="input used for multi_extract mode",
        default="/media/dataj/wechat-devtools-linux/testing/auto-testing/auto_minium/method_iterator/test/outputs",
    )
    parser.add_argument(
        "-sl",
        "--single_log_input",
        type=str,
        help="input used for singular_extract mode",
        default="/media/dataj/wechat-devtools-linux/testing/auto-testing/auto_minium/method_iterator/autominium_test.log",
    )
    parser.add_argument(
        "-js",
        "--jsons_input",
        type=str,
        help="input used for merge_json mode",
        default=None,
    )
    parser.add_argument(
        "-j",
        "--json_input",
        type=str,
        help="input used for compile_stats mode",
        default="autominium_test_log_analysis_merge_json.json",
    )

    # outputs
    parser.add_argument(
        "-o",
        "--file_output",
        type=str,
        default="autominium_test_log_analysis",
    )

    # other parameters
    parser.add_argument(
        "-r",
        "--default_root",
        type=str,
        default="/media/dataj/wechat-devtools-linux/testing/auto-testing/data/newcrawl/pkg_unpack",
    )
    parser.add_argument("-n", "--random_n", type=int, default=None)  # none means do all
    parser.add_argument("-m", "--mode", type=str, default="single_extract")
    parser.add_argument("-f", "--file_name", type=str, default="autominium_test.log")
    parser.add_argument("-s", "--random_seed", type=int, default=0)

    args = parser.parse_args()

    if args.mode == "multi_extract":

        all_miniprogram_dir = os.listdir(args.multi_log_input)
        all_metadata_dict = {}
        all_error_types_set = set()

        for miniprogram_name in all_miniprogram_dir:
            full_dir = os.path.join(
                args.multi_log_input, miniprogram_name, args.file_name
            )

            with open(full_dir, "r", encoding="utf-8") as f:
                autominium_test_log = f.read()

            # STEP 1: Split based on starter point
            # find every instance of 2024-11-11 14:08:44.550 INFO main - maintest: test_methods (test_minium.Minium_Query)
            starter_pattern = re.compile(
                r"\d{4}-\d{2}-\d{2}\s\d{2}:\d{2}:\d{2}.\d{3}\sINFO\smain\s-\smaintest:\stest_methods\s\(test_minium.Minium_Query\)"
            )
            all_log_instances = separate_log_instances(
                autominium_test_log, starter_pattern
            )

            for log_instance in all_log_instances:
                current_instance_dict = process_data(
                    log_instance, all_error_types_set, single_mode=False
                )
                current_instance_dict["dir"] = current_instance_dict.get(
                    "dir", args.default_root + "/" + miniprogram_name
                )
                current_instance_dict["miniprogram_name"] = miniprogram_name

                all_metadata_dict[miniprogram_name] = find_more_complete_navigation(
                    all_metadata_dict.get(miniprogram_name, {}), current_instance_dict
                )

        print(f"all error set include: {all_error_types_set}")
        print(
            f"able to extract {len(list(all_metadata_dict.keys()))} instances of miniprogram"
        )

        with open(args.file_output + f"_{args.mode}.json", "w", encoding="utf-8") as f:
            json.dump(all_metadata_dict, f, indent=4)

    elif args.mode == "single_extract":

        with open(args.single_log_input, "r", encoding="utf-8") as f:
            autominium_test_log = f.read()

        # STEP 1: Split based on starter point
        # find every instance of 2024-11-06 14:21:48.766 INFO main - maintest: Start Running test for: /media/dataj/wechat-devtools-linux/testing/auto-testing/data/newcrawl/pkg_unpack/wxc18b7efa19f4fe55
        starter_pattern = re.compile(
            r"\d{4}-\d{2}-\d{2}\s\d{2}:\d{2}:\d{2}.\d{3}\sINFO\smain\s-\smaintest:\sStart\sRunning\stest\sfor:\s"
        )
        all_log_instances = separate_log_instances(autominium_test_log, starter_pattern)

        # STEP 2: extract data from every split

        all_metadata_dict = {}
        all_error_types_set = set()
        for log_instance in all_log_instances:
            current_instance_dict = process_data(log_instance, all_error_types_set)
            if current_instance_dict.get("miniprogram_name", None) is None:
                print("Not able to extract info from: ")
                print(log_instance)
                continue
            miniprogram_name = current_instance_dict["miniprogram_name"]
            current_instance_dict["dir"] = current_instance_dict.get(
                "dir", args.default_root + "/" + miniprogram_name
            )
            all_metadata_dict[miniprogram_name] = find_more_complete_navigation(
                all_metadata_dict.get(miniprogram_name, {}),
                current_instance_dict,
            )

        print(f"all error set include: {all_error_types_set}")
        print(
            f"able to extract {len(list(all_metadata_dict.keys()))} instances of miniprogram"
        )

        with open(args.file_output + f"_{args.mode}.json", "w", encoding="utf-8") as f:
            json.dump(all_metadata_dict, f, indent=4)

    elif args.mode == "merge_json":

        if args.jsons_input is None:
            all_json_files = [
                file_name for file_name in os.listdir() if file_name.endswith(".json")
            ]
        else:
            all_json_files = args.jsons_input.split(", ")
        print(f"found {len(all_json_files)} to be merged: {all_json_files}")

        merged_dict: Dict[str, Dict[str, any]] = {}

        for idx, json_file in enumerate(all_json_files):

            with open(json_file, "r", encoding="utf-8") as f:
                json_data = json.load(f)

            if idx == 0:
                merged_dict.update(json_data)

            else:

                for miniprogram_name, miniprogram_dict in json_data.items():
                    merged_dict[miniprogram_name] = find_more_complete_navigation(
                        merged_dict.get(miniprogram_name, {}), miniprogram_dict
                    )
        print(
            f"after merging, there are a total of {len(merged_dict)} miniprogram instances"
        )

        with open(args.file_output + f"_{args.mode}.json", "w", encoding="utf-8") as f:
            json.dump(merged_dict, f, indent=4)

    elif args.mode == "compile_stats":

        with open(args.json_input, "r", encoding="utf-8") as f:
            all_metadata_dict = json.load(f)

        filtered_dict = {
            key: value
            for key, value in all_metadata_dict.items()
            if value.get("visited_pages", 0) != 0
        }

        # STEP 3: randomly sample 100 instances
        random.seed(args.random_seed)

        args.random_n = (
            args.random_n if args.random_n is not None else len(filtered_dict)
        )
        if len(filtered_dict) >= args.random_n:
            random_sample_dict = dict(
                random.sample(list(filtered_dict.items()), args.random_n)
            )
            print(f"sampled {args.random_n} instances from the data")
            with open(
                args.file_output
                + f"_{args.mode}_random_{args.random_n}_seed_{args.random_seed}.txt",
                "w",
                encoding="utf-8",
            ) as f:
                f.write(
                    "\n".join(
                        [
                            sample.get("dir", sample["miniprogram_name"])
                            for _, sample in random_sample_dict.items()
                        ]
                    )
                )

        # num_of_samples (100) * num_of_stats (11)
        # the column is ordered as:
        #       all pages (0); visited pages (1); visited_pages_ratio (2);
        #                      finished_pages (3); finished_pages_ratio (4);
        #       all_input_form (5); visited_input_form (6); visited_input_form_ratio (7);
        #       all_bindings (8); visited bindings (9); visited_bindings_ratio (10)

        all_data = np.zeros((args.random_n, 11), dtype=np.float32)

        # get the valid number of ratios
        visited_pages_ratio_total = 0
        finished_pages_ratio_total = 0
        visited_input_form_ratio_total = 0
        visited_bindings_ratio_total = 0

        for sample_idx, (_, sample) in enumerate(random_sample_dict.items()):

            all_data[sample_idx, 0] = sample["all_pages"]
            all_data[sample_idx, 1] = sample["visited_pages"]
            all_data[sample_idx, 3] = sample["finished_pages"]
            all_data[sample_idx, 5] = sample["all_input_form"]
            all_data[sample_idx, 6] = sample["visited_input_form"]
            all_data[sample_idx, 8] = sample["all_bindings"]
            all_data[sample_idx, 9] = sample["visited_bindings"]

            if sample["visited_pages_ratio"] is not None:
                visited_pages_ratio_total += 1
                all_data[sample_idx, 2] = sample["visited_pages_ratio"]

            if sample["finished_pages_ratio"] is not None:
                finished_pages_ratio_total += 1
                all_data[sample_idx, 4] = sample["finished_pages_ratio"]

            if sample["visited_input_form_ratio"] is not None:
                visited_input_form_ratio_total += 1
                all_data[sample_idx, 7] = sample["visited_input_form_ratio"]

            if sample["visited_bindings_ratio"] is not None:
                visited_bindings_ratio_total += 1
                all_data[sample_idx, 10] = sample["visited_bindings_ratio"]

        all_data_sums = all_data.sum(axis=0)
        all_data_sums[2] = all_data_sums[2] / float(visited_pages_ratio_total)
        all_data_sums[4] = all_data_sums[4] / float(finished_pages_ratio_total)
        all_data_sums[7] = all_data_sums[7] / float(visited_input_form_ratio_total)
        all_data_sums[10] = all_data_sums[10] / float(visited_bindings_ratio_total)

        f_string: str = (
            f"based on ratio per sample: \n"
            + f"average visited page from {args.random_n} samples: {all_data_sums[2]}\n"
            + f"average finished page from {args.random_n} samples: {all_data_sums[4]}\n"
            + f"average visited input and form from {args.random_n} samples: {all_data_sums[7]}\n"
            + f"average visited bindings from {args.random_n} samples: {all_data_sums[10]}\n\n"
            + f"based on number per sample: \n"
            + f"average visited page from {args.random_n} samples: {all_data_sums[1] / all_data_sums[0]} ({int(all_data_sums[1])} / {int(all_data_sums[0])})\n"
            + f"average finished page from {args.random_n} samples: {all_data_sums[3] / all_data_sums[0]} ({int(all_data_sums[3])} / {int(all_data_sums[0])})\n"
            + f"average visited input and form from {args.random_n} samples: {all_data_sums[6] / all_data_sums[5]} ({int(all_data_sums[6])} / {int(all_data_sums[5])})\n"
            + f"average visited bindings from {args.random_n} samples: {all_data_sums[9] / all_data_sums[8]} ({int(all_data_sums[9])} / {int(all_data_sums[8])})"
        )

        print(f_string)

        with open(
            args.file_output
            + f"_{args.mode}_random_{args.random_n}_seed_{args.random_seed}.out",
            "w",
        ) as f:
            f.write(f_string)

        all_data_plus_sum = np.vstack((all_data, all_data_sums))

        df = pd.DataFrame(
            all_data_plus_sum,
            index=[key for key, _ in random_sample_dict.items()] + ["total"],
            columns=[
                "all pages",
                "visited pages",
                "visited_pages_ratio",
                "finished_pages",
                "finished_pages_ratio",
                "all_input_form",
                "visited_input_form",
                "visited_input_form_ratio",
                "all_bindings",
                "visited bindings",
                "visited_bindings_ratio",
            ],
        )
        df.to_csv(
            args.file_output
            + f"_{args.mode}_random_{args.random_n}_seed_{args.random_seed}.csv"
        )
