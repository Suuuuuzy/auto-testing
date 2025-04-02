Inject this code in `app.js`.

```js
onLaunch: function (options) {
    function logPagePerformance() {
        const performance = wx.getPerformance();
        const observer = performance.createObserver((entryList) => {
            const entries = entryList.getEntries();
            const result = {}
            entries.forEach(entry => {
            result[entry.name] = entry
            });
            const fs = wx.getFileSystemManager();
            fs.writeFileSync(`${wx.env.USER_DATA_PATH}/performance.txt`, JSON.stringify(result), 'utf8')
        });
        observer.observe({ entryTypes: ['navigation', 'render', 'script'] });
    }
    logPagePerformance();
},

```

1. I think it is better that we copy the 100 miniapps to here to avoid rewriting the original code.

`python copy_samples.py`

2. inject the above code to one of them, see result
can we inject code on the library level? then no file copy needed, we can also output files more easily

where can we get the app obejct and inject this code

I found minium provides APIs to get the performance, getting them now
