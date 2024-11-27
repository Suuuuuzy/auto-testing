This is to get the meta from our crawled miniapps info.
# Step1
Reduce the metalog with `python reduce_meta_data_log.py`
# Step2
Get the json output in `./bundle_results/results.json` with `python get_json.py`

The result looks like:

```
  "wx2c348cf579062e56": {
    "title": "美团外卖丨外卖美食奶茶咖啡水果",
    "source_title": "北京三快在线科技有限公司",
    "appVersion": 932,
    "score": "4.0",
    "score_times": 106607,
    "desc": "美团外卖，送啥都快！附近美食、早午晚餐、下午茶、宵夜、中餐、西餐、家常菜、鲜花蛋糕、饮料甜点、生鲜超市、水果蔬菜、便捷支付、30分钟送达"
  },
  ```
# Step 3
Compute the numbers with `python compute_json_statistics.py`

The numbers we have now:
```
Number of unique miniapps: 16631
Number of miniapps with scores: 9,374.00
Average score_times: 2,888.48
Distribution of score_times:
0-100: 5,281.00
100-1000: 2,506.00
1000-10000: 1,211.00
10000-100000: 328.00
100000+: 48.00
```