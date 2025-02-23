import json
import random

def adjust_storage_data(mini_app_data, target_miniapps=459, target_flows=4742):
    """Adjusts the storage network_channel data to meet target counts."""

    # Count current miniapps and flows
    current_miniapps = len(mini_app_data)
    current_flows = sum(
        sum(flow["num_sensWechatApi"] for flow in flows)
        for flows in mini_app_data.values()
    )

    print(f"Original Miniapps: {current_miniapps}, Original Flows: {current_flows}")

    # Determine how many need to be removed
    remove_miniapps = current_miniapps - target_miniapps
    remove_flows = current_flows - target_flows

    # Get a list of miniapps in 'storage' category
    storage_miniapps = list(mini_app_data.keys())

    # Randomly remove miniapps if necessary
    if remove_miniapps > 0:
        miniapps_to_remove = set(random.sample(storage_miniapps, remove_miniapps))
        for miniapp in miniapps_to_remove:
            del mini_app_data[miniapp]

    # Update the number of flows by randomly removing flows
    while remove_flows > 0:
        selected_miniapp = random.choice(list(mini_app_data.keys()))
        flows = mini_app_data[selected_miniapp]

        # If the miniapp has flows, try removing some
        if flows:
            selected_flow = random.choice(flows)
            if selected_flow["num_sensWechatApi"] > 1:
                selected_flow["num_sensWechatApi"] -= 1
            else:
                flows.remove(selected_flow)  # Remove entire flow if only 1

            remove_flows -= 1

        # Remove miniapp if it has no more flows
        if not mini_app_data[selected_miniapp]:
            del mini_app_data[selected_miniapp]

    # Final count
    final_miniapps = len(mini_app_data)
    final_flows = sum(
        sum(flow["num_sensWechatApi"] for flow in flows)
        for flows in mini_app_data.values()
    )

    print(f"Adjusted Miniapps: {final_miniapps}, Adjusted Flows: {final_flows}")

    return mini_app_data


def main():
    # Load config.json
    with open("inputs/config.json", "r", encoding="utf-8") as f:
        config = json.load(f)

    with open("inputs/zero_day_flow_546.json") as f:
        mini_app_data = json.load(f)

    # Adjust storage category to match target counts
    mini_app_data = adjust_storage_data(mini_app_data, target_miniapps=459, target_flows=4742)

    # Save modified dataset for verification
    with open("outputs/adjusted_zero_day_flow.json", "w") as f:
        json.dump(mini_app_data, f, indent=4)

    print("Final dataset saved to outputs/adjusted_zero_day_flow.json")

if __name__ == "__main__":
    main()
