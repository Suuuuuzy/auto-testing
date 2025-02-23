import json
def gen_md(data, filename):
    # Mapping category names to API examples
    api_mapping = {
        "storage": "wx.getStorageSync",
        "profile": "wx.getUserInfo",
        "location": "wx.getLocation",
        "address": "wx.chooseAddress",
        "open-API": "wx.getWeRunData",
        "device": "wx.getNetworkType",
        "media": "wx.chooseVideo",
    }

    # Generate Markdown table
    md_table = "Table: Number of data leaks per their sources and sinks.\n"
    md_table += "| Category   | API (Example)        | Network Channel | Cross-App Channel | Total |\n"
    md_table += "|------------|----------------------|-----------------|-------------------|-------|\n"

    for category, values in data.items():
        api_example = api_mapping.get(category, "N/A")
        md_table += f"| {category.capitalize():<10} | {api_example:<20} | {values['network_channel']:<15} | {values['crossapp_channel']:<17} | {values['total']:<5} |\n"

    # Save to file
    output_file = f"outputs/{filename}"
    with open(output_file, "w") as f:
        f.write(md_table)

    print(f"Markdown table saved to {output_file}")

def gen_app_md(data, filename):
    # Mapping category names to API examples
    api_mapping = {
        "storage": "wx.getStorageSync",
        "profile": "wx.getUserInfo",
        "location": "wx.getLocation",
        "address": "wx.chooseAddress",
        "open-API": "wx.getWeRunData",
        "device": "wx.getNetworkType",
        "media": "wx.chooseVideo",
    }

    # Generate Markdown table
    md_table = "Table: Number of miniapps per their sources and sinks.\n"
    md_table += "| Category   | API (Example)        |Usage_Total  |Network Channel| Network Channel % | Cross-App Channel |Cross-App Channel % | Total |\n"
    md_table += "|------------|----------------------|-------------|---------------|-------------------|-------------------|--------------------|-------|\n"

    for category, values in data.items():
        api_example = api_mapping.get(category, "N/A")
        md_table += f"| {category.capitalize():<10} | {api_example:<20} |{values['Usage_Total']:<12} | {values['network_channel']:<13} |{values['network_channel_per']:<19} | {values['crossapp_channel']:<17}| {values['crossapp_channel_per']:<18} |{values['total']:<6} |\n"

    # Save to file
    output_file = f"outputs/{filename}"
    with open(output_file, "w") as f:
        f.write(md_table)

    print(f"Markdown table saved to {output_file}")


def process_apps_per_data(app_result, config):
    # get data from 
    usage_file = "../source_sink_check/results/api_usage.json"
    with open(usage_file) as f:
        usage_data = json.load(f)
    
    for source_category in config["sources"]:
        app_result[source_category]['Usage_Total'] = 0
        tmp = set()
        # print(source_category)
        for api in config["sources"][source_category]:
            # print(api)
            api = api.replace('wx.', '')
            tmp = tmp.union(set(usage_data[api]['miniappids']))
        app_result[source_category]['Usage_Total'] = len(tmp)
    
    for source_category in config["sources"]:
        app_result[source_category]["network_channel"] = list(app_result[source_category]["network_channel"])
        app_result[source_category]["crossapp_channel"] = list(app_result[source_category]["crossapp_channel"])
        app_result[source_category]["total"] = list(app_result[source_category]["total"])
    with open('outputs/raw_apps_per_src_sink.json', 'w') as f:
        json.dump(app_result, f, indent=4)
        
    for source_category in config["sources"]:
        
        app_result[source_category]["network_channel"] = len(app_result[source_category]["network_channel"])
        percentage = 100.0 * app_result[source_category]["network_channel"] / app_result[source_category]["Usage_Total"]
        formatted_percentage = f"{percentage:.2f}"  # Format to 2 decimal places
        app_result[source_category]["network_channel_per"] = formatted_percentage
        
        app_result[source_category]["crossapp_channel"] = len(app_result[source_category]["crossapp_channel"])
        percentage = 100.0 * app_result[source_category]["crossapp_channel"] / app_result[source_category]["Usage_Total"]
        formatted_percentage = f"{percentage:.2f}"  # Format to 2 decimal places
        app_result[source_category]["crossapp_channel_per"] = formatted_percentage
        app_result[source_category]["total"] = len(app_result[source_category]["total"])
    return app_result
    
def main():
    # Load config.json
    with open('inputs/config.json', 'r', encoding='utf-8') as f:
        config = json.load(f)
        

    with open('inputs/zero_day_flow.json')as f:
        mini_app_data = json.load(f)
    
    print(f"Total number of miniapps, {len(mini_app_data)}")
    cnt=0
    max_flow = 0
    max_flow_app = ''
    for app in mini_app_data:
        tmp_cnt = 0
        for flow in mini_app_data[app]:
            cnt += flow['num_sensWechatApi']
            tmp_cnt += flow['num_sensWechatApi']
        if tmp_cnt > max_flow:
            max_flow = tmp_cnt
            max_flow_app = app
    print(f"Max number of flows, {max_flow}, {max_flow_app}")
    print(f"Total number of flows, {cnt}")
    
    # Categorize sinks
    cross_app_sinks = set(config["sinks"]["navigate"])
    network_sinks = set()
    for sink_category in config["sinks"]:
        if sink_category != "navigate":
            network_sinks.update(config["sinks"][sink_category])
    
    # Initialize result structure
    flow_result = {
        source_category: {"network_channel": 0, "crossapp_channel": 0, "total": 0}
        for source_category in config["sources"]
    }
    
    app_result =  {
        source_category: {"network_channel": set(), "crossapp_channel": set(), "total": set()}
        for source_category in config["sources"]
    }
    
    for miniappid, flows in mini_app_data.items():
        for flow in flows:
            if not flow["source"]:
                source = 'getStorage'
            else:
                source = flow["source"].split("---")[-1].strip()
            if not flow["sink"]:
                sink = 'request'
            else:
                sink = flow["sink"].split("---")[-1].strip()
            # print(source, sink)
            # Find the source category
            source_category = None
            for category, sources in config["sources"].items():
                if source in sources:
                    source_category = category
                    break

            if source_category:
                # Categorize the sink
                if sink in cross_app_sinks:
                    flow_result[source_category]["crossapp_channel"] += flow['num_sensWechatApi']
                    app_result[source_category]["crossapp_channel"].add(miniappid)
                elif sink in network_sinks:
                    flow_result[source_category]["network_channel"] += flow['num_sensWechatApi']
                    app_result[source_category]["network_channel"].add(miniappid)
                # Update total
                flow_result[source_category]["total"] += flow['num_sensWechatApi']
                app_result[source_category]["total"] = app_result[source_category]["crossapp_channel"].union(app_result[source_category]["network_channel"])

    # get flows per data type
    # print(json.dumps(flow_result, indent=4))
    gen_md(flow_result, "flows_per_src_sink.md")
    
    # get apps per data type
    app_result = process_apps_per_data(app_result, config)
    gen_app_md(app_result, "apps_per_src_sink.md")
    

if __name__ == "__main__":
    main()
