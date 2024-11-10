import re, json, argparse, random
import numpy as np

ALL_INFO_EXTRACTION_PATTERNS = {
    "start test pattern": re.compile(r"Start Running test for: ([^\s]+)"),
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
ELIMINATABLE_LOG_LINES = [
    "Traceback ",
    "During handling of the above exception, another exception occurred:",
    "The above exception was the direct cause of the following exception:",
    "Detailed Time-based CPU and Memory Usage Log:",
]


def find_more_complete_navigation(dict_one, dict_two):
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


if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument(
        "-i",
        "--file_input",
        type=str,
        default="/media/dataj/wechat-devtools-linux/testing/auto-testing/auto_minium/method_iterator/autominium_test.log",
    )
    parser.add_argument(
        "-o",
        "--file_output",
        type=str,
        default="autominium_test_log_analysis",
    )
    parser.add_argument("-n", "--random_n", type=int, default=100)
    parser.add_argument("-s", "--random_seed", type=int, default=0)

    args = parser.parse_args()

    with open(args.file_input, "r", encoding="utf-8") as f:
        autominium_test_log = f.read()

    # STEP 1: Split based on starter point
    # find every instance of 2024-11-06 14:21:48.766 INFO main - maintest: Start Running test for: /media/dataj/wechat-devtools-linux/testing/auto-testing/data/newcrawl/pkg_unpack/wxc18b7efa19f4fe55
    starter_pattern = re.compile(
        r"\d{4}-\d{2}-\d{2}\s\d{2}:\d{2}:\d{2}.\d{3}\sINFO\smain\s-\smaintest:\sStart\sRunning\stest\sfor:\s"
    )
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
    print(f"able to extract {len(all_log_instances)} test log instances")

    # STEP 2: extract data from every split
    timing_pattern = re.compile(
        r"(\d{4}-\d{2}-\d{2}\s\d{2}:\d{2}:\d{2}.\d{3})\s+(\w+)\s+([\w\s-]+):\s"
    )
    all_metadata_dict = {}
    all_error_types_set = set()
    for log_instance in all_log_instances:
        current_instance_dict = {}
        current_instance_dict["error_types"] = set()
        current_instance_dict["error_msgs"] = set()
        log_line_arr = log_instance.split("\n")
        log_line_arr = [
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
        for log_time, log_type, test_type, log_spec in log_line_arr:
            if log_type == "INFO":
                if test_type == "main - maintest":

                    # e.g. 2024-11-06 14:21:48.766 INFO main - maintest: Start Running test for: /media/dataj/wechat-devtools-linux/testing/auto-testing/data/newcrawl/pkg_unpack/wxc18b7efa19f4fe55
                    start_test_search = re.search(
                        ALL_INFO_EXTRACTION_PATTERNS["start test pattern"], log_spec
                    )

                    if start_test_search is not None:
                        current_instance_dict["dir"] = start_test_search.group(1)
                        current_instance_dict["miniprogram_name"] = (
                            current_instance_dict["dir"].split("/")[-1]
                        )
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
                    # e.g. 2024-11-06 14:34:51.053 INFO test_minium - tearDown: Finished 12 pages out of 25.
                    finished_pages_search = re.search(
                        ALL_INFO_EXTRACTION_PATTERNS["finished pages pattern"], log_spec
                    )

                    if finished_pages_search is not None:
                        current_instance_dict["finished_pages"] = int(
                            finished_pages_search.group(1)
                        )
                        current_instance_dict["all_pages"] = int(
                            finished_pages_search.group(2)
                        )
                        continue

                    # e.g. 2024-11-06 14:34:51.053 INFO test_minium - tearDown: Visited 13 pages out of 25.
                    visited_pages_search = re.search(
                        ALL_INFO_EXTRACTION_PATTERNS["visited pages pattern"], log_spec
                    )

                    if visited_pages_search is not None:
                        current_instance_dict["visited_pages"] = int(
                            visited_pages_search.group(1)
                        )
                        continue

                    # 2024-11-06 14:34:51.053 INFO test_minium - tearDown: Visited 34 binding functions out of 74.
                    visited_binding_func_search = re.search(
                        ALL_INFO_EXTRACTION_PATTERNS["visited binding func pattern"],
                        log_spec,
                    )

                    if visited_binding_func_search is not None:
                        current_instance_dict["visited_bindings"] = int(
                            visited_binding_func_search.group(1)
                        )
                        current_instance_dict["all_bindings"] = int(
                            visited_binding_func_search.group(2)
                        )
                        continue

                    # 2024-11-06 14:34:51.053 INFO test_minium - tearDown: Visited 0 input/forms out of 0.
                    visited_input_form_search = re.search(
                        ALL_INFO_EXTRACTION_PATTERNS["visited input form pattern"],
                        log_spec,
                    )

                    if visited_input_form_search is not None:
                        current_instance_dict["visited_input_form"] = int(
                            visited_input_form_search.group(1)
                        )
                        current_instance_dict["all_input_form"] = int(
                            visited_input_form_search.group(2)
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

        current_instance_dict["error_types"] = list(
            current_instance_dict["error_types"]
        )
        current_instance_dict["error_msgs"] = list(current_instance_dict["error_msgs"])
        if current_instance_dict.get("miniprogram_name", None) is None:
            print("Not able to extract info from: ")
            print(log_instance)
            continue
        if (
            all_metadata_dict.get(current_instance_dict["miniprogram_name"], None)
            is None
        ):
            all_metadata_dict[current_instance_dict["miniprogram_name"]] = (
                current_instance_dict
            )
        else:
            miniprogram_name = current_instance_dict["miniprogram_name"]
            all_metadata_dict[miniprogram_name] = find_more_complete_navigation(
                all_metadata_dict[miniprogram_name], current_instance_dict
            )

    print(f"all error set include: {all_error_types_set}")
    print(
        f"able to extract {len(list(all_metadata_dict.keys()))} instances of miniprogram"
    )

    filtered_dict = {
        key: value
        for key, value in all_metadata_dict.items()
        if value.get("visited_pages", 0) != 0
    }

    with open(args.file_output + ".json", "w", encoding="utf-8") as f:
        json.dump(filtered_dict, f, indent=4)

    # STEP 3: randomly sample 100 instances
    random.seed(args.random_seed)
    if len(filtered_dict) >= args.random_n:
        random_sample_dict = dict(
            random.sample(list(filtered_dict.items()), args.random_n)
        )
        print(f"sampled {args.random_n} instances from the data")
        with open(args.file_output + ".txt", "w", encoding="utf-8") as f:
            f.write(
                "\n".join([sample["dir"] for _, sample in random_sample_dict.items()])
            )

        all_stats = np.stack(
            [
                [
                    (
                        float(sample["visited_pages"]) / float(sample["all_pages"])
                        if sample["all_pages"] != 0
                        else 1
                    ),
                    (
                        float(sample["finished_pages"]) / float(sample["all_pages"])
                        if sample["all_pages"] != 0
                        else 1
                    ),
                    (
                        float(sample["visited_bindings"])
                        / float(sample["all_bindings"])
                        if sample["all_bindings"] != 0
                        else 1
                    ),
                    (
                        float(sample["visited_input_form"])
                        / float(sample["all_input_form"])
                        if sample["all_input_form"] != 0
                        else 1
                    ),
                ]
                for _, sample in random_sample_dict.items()
            ],
            dtype=np.float32,
        )
        all_data_result = all_stats.sum(axis=0) / args.random_n

        print(
            f"average visited page from 100 samples : {all_data_result[0]}\n"
            + f"average finished page from 100 samples : {all_data_result[1]}\n"
            + f"average visited bindings from 100 samples : {all_data_result[2]}\n"
            + f"average visited form and input from 100 samples : {all_data_result[3]}\n"
        )
