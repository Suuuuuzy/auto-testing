import json

def get_navi_apis():
    file = "inputs/config.json"
    with open(file) as f:
        config = json.load(f)
    return config["sinks"]["navigate"]

def get_navi_from_10k():
    sinks = get_navi_apis()
    # get data from 
    usage_file = "../source_sink_check/results/api_usage.json"
    with open(usage_file) as f:
        usage_data = json.load(f)
    miniapps = set()
    for sink in sinks:
        sink = sink.replace('wx.', '')
        miniapps = miniapps.union(set(usage_data[sink]['miniappids']))
    return miniapps

def main():
    miniapps = get_navi_from_10k()
    print(miniapps)

if __name__ == "__main__":
    main()
