function mockChooseImage(){var a=wx.getFileSystemManager();if(!global.__minium__.mock_choose_image){var b=function(){e.forEach(function(a){a()})},c=function(a,c){if(d.get(a))return!1;d.set(a,!0);var f={chooseImage:function(){b();var a={errMsg:"chooseImage:ok",tempFilePaths:c.map(function(a){return a.filePath}),tempFiles:c.map(function(a){return{path:a.filePath,size:a.size}})};return Promise.resolve(a)},chooseMedia:function(){b();var a={errMsg:"chooseMedia:ok",tempFiles:c.map(function(a){return{tempFilePath:a.filePath,size:a.size,fileType:"image"}}),type:"image"};return Promise.resolve(a)},createCameraContext:function(){var e=this.origin(),f=e.takePhoto;return Object.defineProperty(e,"takePhoto",{configurable:!0,get:function(){return function(e){if(!d.get(a))return f.call(this,e);b();var g={tempImagePath:c[0].filePath,errMsg:"takePhoto:ok"};e.success&&e.success(g),e.complete&&e.complete(g)}}}),e}},g=Object.keys(f);return e.set(a,function(){d.get(a)&&(console.debug("release target"),d.set(a,!1),g.forEach(function(a){global.__minium__.delMock(a)}))}),g.forEach(function(a){global.__minium__.setMock(a,f[a])}),!0},d=new Map,e=new Map;global.__minium__.mock_choose_image=function(){for(var b=arguments.length,d=Array(b),e=0;e<b;e++)d[e]=arguments[e];var f=d.map(function(b){var c=b.imageData,d=b.imageName,e=b.size,f="".concat(wx.env.USER_DATA_PATH,"/.MINIUM_TMP/").concat(d);return c&&0!==c.length?new Promise(function(b,e){a.writeFile({filePath:f,data:c,encoding:"base64",success:function(){a.stat({path:f,success:function(a){var c=a.stats;b({imageName:d,filePath:f,size:c.size})}})},fail:function(a){var b=a.errMsg;"writeFile:fail the maximum size of the file storage limit is exceeded"===b?e(new Error("\u5C0F\u7A0B\u5E8F\u6587\u4EF6\u7A7A\u95F4\u4E0D\u8DB3")):"writeFile:fail sdcard not mounted"===b?e(new Error("sdcard\u672A\u6302\u8F7D")):e(new Error("Mock\u5931\u8D25: ".concat(b)))}})}):Promise.resolve({imageName:d,filePath:f,size:e})});return Promise.all(f).then(function(a){return c(wx,a),a.map(function(a){return{name:a.imageName,size:a.size}})})};var f=!1;a.mkdir({dirPath:"".concat(wx.env.USER_DATA_PATH,"/.MINIUM_STORE"),recursive:!1,success:function(){f=!0},fail:function(a){var b=a.errMsg;0<=b.indexOf("file already exists")&&(f=!0)}});var g=a.saveFile,h=a.saveFileSync,i=a.getSavedFileList;Object.defineProperty(a,"saveFile",{configurable:!0,get:function(){return function(b){var c=b.tempFilePath,d=b.filePath,e=b.success,f=b.fail,h=b.complete;if(c.startsWith("".concat(wx.env.USER_DATA_PATH,"/.MINIUM_TMP"))){var i={srcPath:c,destPath:d||"".concat(wx.env.USER_DATA_PATH,"/.MINIUM_STORE/").concat(c.split("/").pop())};return e&&(i.success=function(a){a.errMsg=a.errMsg.replace("copyFile","saveFile"),a.savedFilePath=i.destPath,e(a)}),f&&(i.fail=function(a){a.errMsg=a.errMsg.replace("copyFile","saveFile"),f(a)}),h&&(i.complete=function(a){a.errMsg=a.errMsg.replace("copyFile","saveFile"),0===a.errMsg.indexOf("saveFile:ok")&&(a.savedFilePath=i.destPath),h(a)}),a.copyFile(i)}return g({tempFilePath:c,filePath:d,success:e,fail:f,complete:h})}}}),Object.defineProperty(a,"saveFileSync",{configurable:!0,get:function(){return function(b,c){if(b.startsWith("".concat(wx.env.USER_DATA_PATH,"/.MINIUM_TMP"))){var d=c||"".concat(wx.env.USER_DATA_PATH,"/.MINIUM_STORE/").concat(b.split("/").pop());try{return a.copyFileSync(b,d),d}catch(a){throw a.message.replace("copyFileSync","saveFileSync")}}return h(b,c)}}}),Object.defineProperty(a,"getSavedFileList",{configurable:!0,get:function(){return function(b){var c=b.success,d=b.complete;Promise.all([new Promise(function(b){a.stat({path:"".concat(wx.env.USER_DATA_PATH,"/.MINIUM_STORE/"),recursive:!0,complete:function(a){b((a.stats||[]).filter(function(a){return"/"!==a.path}).map(function(a){return{filePath:"".concat(wx.env.USER_DATA_PATH,"/.MINIUM_STORE/").concat(a.path.startsWith("/")?a.path.slice(1):a.path),size:a.stats.size,createTime:a.stats.lastModifiedTime}}))}})}),new Promise(function(a){i({complete:function(b){a(b.fileList||[])}})})]).then(function(a){var b=global.babelHelpers.slicedToArray(a,2),e=b[0],f=b[1],g={fileList:e.concat(f),errMsg:"getSavedFileList:ok"};c&&c(g),d&&d(g)})}}})}return new Promise(function(b,c){a.mkdir({dirPath:"".concat(wx.env.USER_DATA_PATH,"/.MINIUM_TMP"),recursive:!1,success:function(){b([])},fail:function(d){var e=d.errMsg;return 0<=e.indexOf("file already exists")?void a.stat({path:"".concat(wx.env.USER_DATA_PATH,"/.MINIUM_TMP/"),recursive:!0,success:function(a){return console.warn("[debug]fs.stat success"),a.stats.length?void b(a.stats.map(function(a){return{name:a.path.replace(/^\//,""),size:a.stats.size}}).filter(function(a){return a.name})):b([])},fail:c}):void c({errMsg:e})}})})}