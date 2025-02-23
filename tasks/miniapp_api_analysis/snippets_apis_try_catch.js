
    onLoad: async function(){
    

try {
    await wx.drawCanvas();
    console.log('Success:', 'drawCanvas');
} catch (e) {
    console.error('Error in drawCanvas:', e);
}


try {
    await wx.createContext();
    console.log('Success:', 'createContext');
} catch (e) {
    console.error('Error in createContext:', e);
}


try {
    await wx.createCanvasContext();
    console.log('Success:', 'createCanvasContext');
} catch (e) {
    console.error('Error in createCanvasContext:', e);
}


try {
    await wx.canvasToTempFilePath();
    console.log('Success:', 'canvasToTempFilePath');
} catch (e) {
    console.error('Error in canvasToTempFilePath:', e);
}


try {
    await wx.canvasGetImageData();
    console.log('Success:', 'canvasGetImageData');
} catch (e) {
    console.error('Error in canvasGetImageData:', e);
}


try {
    await wx.canvasPutImageData();
    console.log('Success:', 'canvasPutImageData');
} catch (e) {
    console.error('Error in canvasPutImageData:', e);
}


try {
    await wx.createOffscreenCanvas();
    console.log('Success:', 'createOffscreenCanvas');
} catch (e) {
    console.error('Error in createOffscreenCanvas:', e);
}


try {
    await wx.getAccountInfoSync();
    console.log('Success:', 'getAccountInfoSync');
} catch (e) {
    console.error('Error in getAccountInfoSync:', e);
}


try {
    await wx.getShareInfo();
    console.log('Success:', 'getShareInfo');
} catch (e) {
    console.error('Error in getShareInfo:', e);
}


try {
    await wx.authPrivateMessage();
    console.log('Success:', 'authPrivateMessage');
} catch (e) {
    console.error('Error in authPrivateMessage:', e);
}


try {
    await wx.pageScrollTo();
    console.log('Success:', 'pageScrollTo');
} catch (e) {
    console.error('Error in pageScrollTo:', e);
}


try {
    await wx.chooseInvoiceTitle();
    console.log('Success:', 'chooseInvoiceTitle');
} catch (e) {
    console.error('Error in chooseInvoiceTitle:', e);
}


try {
    await wx.chooseInvoice();
    console.log('Success:', 'chooseInvoice');
} catch (e) {
    console.error('Error in chooseInvoice:', e);
}


try {
    await wx.arrayBufferToBase64();
    console.log('Success:', 'arrayBufferToBase64');
} catch (e) {
    console.error('Error in arrayBufferToBase64:', e);
}


try {
    await wx.base64ToArrayBuffer();
    console.log('Success:', 'base64ToArrayBuffer');
} catch (e) {
    console.error('Error in base64ToArrayBuffer:', e);
}


try {
    await wx.openSetting();
    console.log('Success:', 'openSetting');
} catch (e) {
    console.error('Error in openSetting:', e);
}


try {
    await wx.getExtConfig();
    console.log('Success:', 'getExtConfig');
} catch (e) {
    console.error('Error in getExtConfig:', e);
}


try {
    await wx.chooseMedia();
    console.log('Success:', 'chooseMedia');
} catch (e) {
    console.error('Error in chooseMedia:', e);
}


try {
    await wx.previewMedia();
    console.log('Success:', 'previewMedia');
} catch (e) {
    console.error('Error in previewMedia:', e);
}


try {
    await wx.chooseMultiMedia();
    console.log('Success:', 'chooseMultiMedia');
} catch (e) {
    console.error('Error in chooseMultiMedia:', e);
}


try {
    await wx.chooseMessageFile();
    console.log('Success:', 'chooseMessageFile');
} catch (e) {
    console.error('Error in chooseMessageFile:', e);
}


try {
    await wx.chooseWeChatContact();
    console.log('Success:', 'chooseWeChatContact');
} catch (e) {
    console.error('Error in chooseWeChatContact:', e);
}


try {
    await wx.uploadEncryptedFileToCDN();
    console.log('Success:', 'uploadEncryptedFileToCDN');
} catch (e) {
    console.error('Error in uploadEncryptedFileToCDN:', e);
}


try {
    await wx.onUploadEncryptedFileToCDNProgress();
    console.log('Success:', 'onUploadEncryptedFileToCDNProgress');
} catch (e) {
    console.error('Error in onUploadEncryptedFileToCDNProgress:', e);
}


try {
    await wx.uploadToCommonCDN();
    console.log('Success:', 'uploadToCommonCDN');
} catch (e) {
    console.error('Error in uploadToCommonCDN:', e);
}


try {
    await wx.getExtConfigSync();
    console.log('Success:', 'getExtConfigSync');
} catch (e) {
    console.error('Error in getExtConfigSync:', e);
}


try {
    await wx.showShareMenu();
    console.log('Success:', 'showShareMenu');
} catch (e) {
    console.error('Error in showShareMenu:', e);
}


try {
    await wx.hideShareMenu();
    console.log('Success:', 'hideShareMenu');
} catch (e) {
    console.error('Error in hideShareMenu:', e);
}


try {
    await wx.updateShareMenu();
    console.log('Success:', 'updateShareMenu');
} catch (e) {
    console.error('Error in updateShareMenu:', e);
}


try {
    await wx.shareAppMessageForFakeNative();
    console.log('Success:', 'shareAppMessageForFakeNative');
} catch (e) {
    console.error('Error in shareAppMessageForFakeNative:', e);
}


try {
    await wx.openUrl();
    console.log('Success:', 'openUrl');
} catch (e) {
    console.error('Error in openUrl:', e);
}


try {
    await wx.setNavigationBarColor();
    console.log('Success:', 'setNavigationBarColor');
} catch (e) {
    console.error('Error in setNavigationBarColor:', e);
}


try {
    await wx.setNavigationBarAlpha();
    console.log('Success:', 'setNavigationBarAlpha');
} catch (e) {
    console.error('Error in setNavigationBarAlpha:', e);
}


try {
    await wx.showShareImageMenu();
    console.log('Success:', 'showShareImageMenu');
} catch (e) {
    console.error('Error in showShareImageMenu:', e);
}


try {
    await wx.shareFileMessage();
    console.log('Success:', 'shareFileMessage');
} catch (e) {
    console.error('Error in shareFileMessage:', e);
}


try {
    await wx.shareVideoMessage();
    console.log('Success:', 'shareVideoMessage');
} catch (e) {
    console.error('Error in shareVideoMessage:', e);
}


try {
    await wx.vibrateShort();
    console.log('Success:', 'vibrateShort');
} catch (e) {
    console.error('Error in vibrateShort:', e);
}


try {
    await wx.vibrateLong();
    console.log('Success:', 'vibrateLong');
} catch (e) {
    console.error('Error in vibrateLong:', e);
}


try {
    await wx.getSetting();
    console.log('Success:', 'getSetting');
} catch (e) {
    console.error('Error in getSetting:', e);
}


try {
    await wx.checkIsSupportFacialRecognition();
    console.log('Success:', 'checkIsSupportFacialRecognition');
} catch (e) {
    console.error('Error in checkIsSupportFacialRecognition:', e);
}


try {
    await wx.startFacialRecognitionVerify();
    console.log('Success:', 'startFacialRecognitionVerify');
} catch (e) {
    console.error('Error in startFacialRecognitionVerify:', e);
}


try {
    await wx.startFacialRecognitionVerifyAndUploadVideo();
    console.log('Success:', 'startFacialRecognitionVerifyAndUploadVideo');
} catch (e) {
    console.error('Error in startFacialRecognitionVerifyAndUploadVideo:', e);
}


try {
    await wx.startCustomFacialRecognitionVerify();
    console.log('Success:', 'startCustomFacialRecognitionVerify');
} catch (e) {
    console.error('Error in startCustomFacialRecognitionVerify:', e);
}


try {
    await wx.startCustomFacialRecognitionVerifyAndUploadVideo();
    console.log('Success:', 'startCustomFacialRecognitionVerifyAndUploadVideo');
} catch (e) {
    console.error('Error in startCustomFacialRecognitionVerifyAndUploadVideo:', e);
}


try {
    await wx.sendBizRedPacket();
    console.log('Success:', 'sendBizRedPacket');
} catch (e) {
    console.error('Error in sendBizRedPacket:', e);
}


try {
    await wx.sendGoldenRedPacket();
    console.log('Success:', 'sendGoldenRedPacket');
} catch (e) {
    console.error('Error in sendGoldenRedPacket:', e);
}


try {
    await wx.openGoldenRedPacketDetail();
    console.log('Success:', 'openGoldenRedPacketDetail');
} catch (e) {
    console.error('Error in openGoldenRedPacketDetail:', e);
}


try {
    await wx.showRedPackage();
    console.log('Success:', 'showRedPackage');
} catch (e) {
    console.error('Error in showRedPackage:', e);
}


try {
    await wx.addPhoneContact();
    console.log('Success:', 'addPhoneContact');
} catch (e) {
    console.error('Error in addPhoneContact:', e);
}


try {
    await wx.searchContacts();
    console.log('Success:', 'searchContacts');
} catch (e) {
    console.error('Error in searchContacts:', e);
}


try {
    await wx.setScreenBrightness();
    console.log('Success:', 'setScreenBrightness');
} catch (e) {
    console.error('Error in setScreenBrightness:', e);
}


try {
    await wx.getScreenBrightness();
    console.log('Success:', 'getScreenBrightness');
} catch (e) {
    console.error('Error in getScreenBrightness:', e);
}


try {
    await wx.shareToWeRun();
    console.log('Success:', 'shareToWeRun');
} catch (e) {
    console.error('Error in shareToWeRun:', e);
}


try {
    await wx.getWeRunData();
    console.log('Success:', 'getWeRunData');
} catch (e) {
    console.error('Error in getWeRunData:', e);
}


try {
    await wx.uploadWeRunData();
    console.log('Success:', 'uploadWeRunData');
} catch (e) {
    console.error('Error in uploadWeRunData:', e);
}


try {
    await wx.addWeRunData();
    console.log('Success:', 'addWeRunData');
} catch (e) {
    console.error('Error in addWeRunData:', e);
}


try {
    await wx.canIUse();
    console.log('Success:', 'canIUse');
} catch (e) {
    console.error('Error in canIUse:', e);
}


try {
    await wx.setPageStyle();
    console.log('Success:', 'setPageStyle');
} catch (e) {
    console.error('Error in setPageStyle:', e);
}


try {
    await wx.triggerGettingWidgetData();
    console.log('Success:', 'triggerGettingWidgetData');
} catch (e) {
    console.error('Error in triggerGettingWidgetData:', e);
}


try {
    await wx.navigateToMiniProgram();
    console.log('Success:', 'navigateToMiniProgram');
} catch (e) {
    console.error('Error in navigateToMiniProgram:', e);
}


try {
    await wx.navigateToMiniProgramDirectly();
    console.log('Success:', 'navigateToMiniProgramDirectly');
} catch (e) {
    console.error('Error in navigateToMiniProgramDirectly:', e);
}


try {
    await wx.navigateToDevMiniProgram();
    console.log('Success:', 'navigateToDevMiniProgram');
} catch (e) {
    console.error('Error in navigateToDevMiniProgram:', e);
}


try {
    await wx.navigateBackMiniProgram();
    console.log('Success:', 'navigateBackMiniProgram');
} catch (e) {
    console.error('Error in navigateBackMiniProgram:', e);
}


try {
    await wx.launchMiniProgram();
    console.log('Success:', 'launchMiniProgram');
} catch (e) {
    console.error('Error in launchMiniProgram:', e);
}


try {
    await wx.launchDevMiniProgram();
    console.log('Success:', 'launchDevMiniProgram');
} catch (e) {
    console.error('Error in launchDevMiniProgram:', e);
}


try {
    await wx.launchApplicationDirectly();
    console.log('Success:', 'launchApplicationDirectly');
} catch (e) {
    console.error('Error in launchApplicationDirectly:', e);
}


try {
    await wx.launchApplicationForNative();
    console.log('Success:', 'launchApplicationForNative');
} catch (e) {
    console.error('Error in launchApplicationForNative:', e);
}


try {
    await wx.setNavigationBarRightButton();
    console.log('Success:', 'setNavigationBarRightButton');
} catch (e) {
    console.error('Error in setNavigationBarRightButton:', e);
}


try {
    await wx.onTapNavigationBarRightButton();
    console.log('Success:', 'onTapNavigationBarRightButton');
} catch (e) {
    console.error('Error in onTapNavigationBarRightButton:', e);
}


try {
    await wx.setTopBarText();
    console.log('Success:', 'setTopBarText');
} catch (e) {
    console.error('Error in setTopBarText:', e);
}


try {
    await wx.setTabBarBadge();
    console.log('Success:', 'setTabBarBadge');
} catch (e) {
    console.error('Error in setTabBarBadge:', e);
}


try {
    await wx.removeTabBarBadge();
    console.log('Success:', 'removeTabBarBadge');
} catch (e) {
    console.error('Error in removeTabBarBadge:', e);
}


try {
    await wx.showTabBarRedDot();
    console.log('Success:', 'showTabBarRedDot');
} catch (e) {
    console.error('Error in showTabBarRedDot:', e);
}


try {
    await wx.hideTabBarRedDot();
    console.log('Success:', 'hideTabBarRedDot');
} catch (e) {
    console.error('Error in hideTabBarRedDot:', e);
}


try {
    await wx.showTabBar();
    console.log('Success:', 'showTabBar');
} catch (e) {
    console.error('Error in showTabBar:', e);
}


try {
    await wx.hideTabBar();
    console.log('Success:', 'hideTabBar');
} catch (e) {
    console.error('Error in hideTabBar:', e);
}


try {
    await wx.setTabBarStyle();
    console.log('Success:', 'setTabBarStyle');
} catch (e) {
    console.error('Error in setTabBarStyle:', e);
}


try {
    await wx.setTabBarItem();
    console.log('Success:', 'setTabBarItem');
} catch (e) {
    console.error('Error in setTabBarItem:', e);
}


try {
    await wx.setBackgroundColor();
    console.log('Success:', 'setBackgroundColor');
} catch (e) {
    console.error('Error in setBackgroundColor:', e);
}


try {
    await wx.setBackgroundTextStyle();
    console.log('Success:', 'setBackgroundTextStyle');
} catch (e) {
    console.error('Error in setBackgroundTextStyle:', e);
}


try {
    await wx.setEnableDebug();
    console.log('Success:', 'setEnableDebug');
} catch (e) {
    console.error('Error in setEnableDebug:', e);
}


try {
    await wx.captureScreen();
    console.log('Success:', 'captureScreen');
} catch (e) {
    console.error('Error in captureScreen:', e);
}


try {
    await wx.onUserCaptureScreen();
    console.log('Success:', 'onUserCaptureScreen');
} catch (e) {
    console.error('Error in onUserCaptureScreen:', e);
}


try {
    await wx.offUserCaptureScreen();
    console.log('Success:', 'offUserCaptureScreen');
} catch (e) {
    console.error('Error in offUserCaptureScreen:', e);
}


try {
    await wx.setKeepScreenOn();
    console.log('Success:', 'setKeepScreenOn');
} catch (e) {
    console.error('Error in setKeepScreenOn:', e);
}


try {
    await wx.checkIsSupportSoterAuthentication();
    console.log('Success:', 'checkIsSupportSoterAuthentication');
} catch (e) {
    console.error('Error in checkIsSupportSoterAuthentication:', e);
}


try {
    await wx.startSoterAuthentication();
    console.log('Success:', 'startSoterAuthentication');
} catch (e) {
    console.error('Error in startSoterAuthentication:', e);
}


try {
    await wx.checkIsSoterEnrolledInDevice();
    console.log('Success:', 'checkIsSoterEnrolledInDevice');
} catch (e) {
    console.error('Error in checkIsSoterEnrolledInDevice:', e);
}


try {
    await wx.openDeliveryList();
    console.log('Success:', 'openDeliveryList');
} catch (e) {
    console.error('Error in openDeliveryList:', e);
}


try {
    await wx.navigateBackH5();
    console.log('Success:', 'navigateBackH5');
} catch (e) {
    console.error('Error in navigateBackH5:', e);
}


try {
    await wx.openBusinessView();
    console.log('Success:', 'openBusinessView');
} catch (e) {
    console.error('Error in openBusinessView:', e);
}


try {
    await wx.navigateBackApplication();
    console.log('Success:', 'navigateBackApplication');
} catch (e) {
    console.error('Error in navigateBackApplication:', e);
}


try {
    await wx.navigateBackNative();
    console.log('Success:', 'navigateBackNative');
} catch (e) {
    console.error('Error in navigateBackNative:', e);
}


try {
    await wx.reportIDKey();
    console.log('Success:', 'reportIDKey');
} catch (e) {
    console.error('Error in reportIDKey:', e);
}


try {
    await wx.reportKeyValue();
    console.log('Success:', 'reportKeyValue');
} catch (e) {
    console.error('Error in reportKeyValue:', e);
}


try {
    await wx.setWindowSize();
    console.log('Success:', 'setWindowSize');
} catch (e) {
    console.error('Error in setWindowSize:', e);
}


try {
    await wx.setNavigationBarTitle();
    console.log('Success:', 'setNavigationBarTitle');
} catch (e) {
    console.error('Error in setNavigationBarTitle:', e);
}


try {
    await wx.showNavigationBarLoading();
    console.log('Success:', 'showNavigationBarLoading');
} catch (e) {
    console.error('Error in showNavigationBarLoading:', e);
}


try {
    await wx.hideNavigationBarLoading();
    console.log('Success:', 'hideNavigationBarLoading');
} catch (e) {
    console.error('Error in hideNavigationBarLoading:', e);
}


try {
    await wx.hideHomeButton();
    console.log('Success:', 'hideHomeButton');
} catch (e) {
    console.error('Error in hideHomeButton:', e);
}


try {
    await wx.startPullDownRefresh();
    console.log('Success:', 'startPullDownRefresh');
} catch (e) {
    console.error('Error in startPullDownRefresh:', e);
}


try {
    await wx.stopPullDownRefresh();
    console.log('Success:', 'stopPullDownRefresh');
} catch (e) {
    console.error('Error in stopPullDownRefresh:', e);
}


try {
    await wx.operateWXData();
    console.log('Success:', 'operateWXData');
} catch (e) {
    console.error('Error in operateWXData:', e);
}


try {
    await wx.getOpenDeviceId();
    console.log('Success:', 'getOpenDeviceId');
} catch (e) {
    console.error('Error in getOpenDeviceId:', e);
}


try {
    await wx.getMenuButtonBoundingClientRect();
    console.log('Success:', 'getMenuButtonBoundingClientRect');
} catch (e) {
    console.error('Error in getMenuButtonBoundingClientRect:', e);
}


try {
    await wx.getSelectedTextRange();
    console.log('Success:', 'getSelectedTextRange');
} catch (e) {
    console.error('Error in getSelectedTextRange:', e);
}


try {
    await wx.enableAlertBeforeUnload();
    console.log('Success:', 'enableAlertBeforeUnload');
} catch (e) {
    console.error('Error in enableAlertBeforeUnload:', e);
}


try {
    await wx.disableAlertBeforeUnload();
    console.log('Success:', 'disableAlertBeforeUnload');
} catch (e) {
    console.error('Error in disableAlertBeforeUnload:', e);
}


try {
    await wx.makeBluetoothPair();
    console.log('Success:', 'makeBluetoothPair');
} catch (e) {
    console.error('Error in makeBluetoothPair:', e);
}


try {
    await wx.openBluetoothAdapter();
    console.log('Success:', 'openBluetoothAdapter');
} catch (e) {
    console.error('Error in openBluetoothAdapter:', e);
}


try {
    await wx.closeBluetoothAdapter();
    console.log('Success:', 'closeBluetoothAdapter');
} catch (e) {
    console.error('Error in closeBluetoothAdapter:', e);
}


try {
    await wx.getBluetoothAdapterState();
    console.log('Success:', 'getBluetoothAdapterState');
} catch (e) {
    console.error('Error in getBluetoothAdapterState:', e);
}


try {
    await wx.onBluetoothAdapterStateChange();
    console.log('Success:', 'onBluetoothAdapterStateChange');
} catch (e) {
    console.error('Error in onBluetoothAdapterStateChange:', e);
}


try {
    await wx.offBluetoothAdapterStateChange();
    console.log('Success:', 'offBluetoothAdapterStateChange');
} catch (e) {
    console.error('Error in offBluetoothAdapterStateChange:', e);
}


try {
    await wx.startBluetoothDevicesDiscovery();
    console.log('Success:', 'startBluetoothDevicesDiscovery');
} catch (e) {
    console.error('Error in startBluetoothDevicesDiscovery:', e);
}


try {
    await wx.stopBluetoothDevicesDiscovery();
    console.log('Success:', 'stopBluetoothDevicesDiscovery');
} catch (e) {
    console.error('Error in stopBluetoothDevicesDiscovery:', e);
}


try {
    await wx.getBluetoothDevices();
    console.log('Success:', 'getBluetoothDevices');
} catch (e) {
    console.error('Error in getBluetoothDevices:', e);
}


try {
    await wx.getConnectedBluetoothDevices();
    console.log('Success:', 'getConnectedBluetoothDevices');
} catch (e) {
    console.error('Error in getConnectedBluetoothDevices:', e);
}


try {
    await wx.createBLEConnection();
    console.log('Success:', 'createBLEConnection');
} catch (e) {
    console.error('Error in createBLEConnection:', e);
}


try {
    await wx.setBLEMTU();
    console.log('Success:', 'setBLEMTU');
} catch (e) {
    console.error('Error in setBLEMTU:', e);
}


try {
    await wx.closeBLEConnection();
    console.log('Success:', 'closeBLEConnection');
} catch (e) {
    console.error('Error in closeBLEConnection:', e);
}


try {
    await wx.getBLEDeviceServices();
    console.log('Success:', 'getBLEDeviceServices');
} catch (e) {
    console.error('Error in getBLEDeviceServices:', e);
}


try {
    await wx.getBLEDeviceRSSI();
    console.log('Success:', 'getBLEDeviceRSSI');
} catch (e) {
    console.error('Error in getBLEDeviceRSSI:', e);
}


try {
    await wx.getBLEDeviceCharacteristics();
    console.log('Success:', 'getBLEDeviceCharacteristics');
} catch (e) {
    console.error('Error in getBLEDeviceCharacteristics:', e);
}


try {
    await wx.createBLEPeripheralServer();
    console.log('Success:', 'createBLEPeripheralServer');
} catch (e) {
    console.error('Error in createBLEPeripheralServer:', e);
}


try {
    await wx.onBLEPeripheralConnectionStateChanged();
    console.log('Success:', 'onBLEPeripheralConnectionStateChanged');
} catch (e) {
    console.error('Error in onBLEPeripheralConnectionStateChanged:', e);
}


try {
    await wx.offBLEPeripheralConnectionStateChanged();
    console.log('Success:', 'offBLEPeripheralConnectionStateChanged');
} catch (e) {
    console.error('Error in offBLEPeripheralConnectionStateChanged:', e);
}


try {
    await wx.notifyBLECharacteristicValueChanged();
    console.log('Success:', 'notifyBLECharacteristicValueChanged');
} catch (e) {
    console.error('Error in notifyBLECharacteristicValueChanged:', e);
}


try {
    await wx.notifyBLECharacteristicValueChange();
    console.log('Success:', 'notifyBLECharacteristicValueChange');
} catch (e) {
    console.error('Error in notifyBLECharacteristicValueChange:', e);
}


try {
    await wx.readBLECharacteristicValue();
    console.log('Success:', 'readBLECharacteristicValue');
} catch (e) {
    console.error('Error in readBLECharacteristicValue:', e);
}


try {
    await wx.writeBLECharacteristicValue();
    console.log('Success:', 'writeBLECharacteristicValue');
} catch (e) {
    console.error('Error in writeBLECharacteristicValue:', e);
}


try {
    await wx.onBluetoothDeviceFound();
    console.log('Success:', 'onBluetoothDeviceFound');
} catch (e) {
    console.error('Error in onBluetoothDeviceFound:', e);
}


try {
    await wx.offBluetoothDeviceFound();
    console.log('Success:', 'offBluetoothDeviceFound');
} catch (e) {
    console.error('Error in offBluetoothDeviceFound:', e);
}


try {
    await wx.onBLEConnectionStateChanged();
    console.log('Success:', 'onBLEConnectionStateChanged');
} catch (e) {
    console.error('Error in onBLEConnectionStateChanged:', e);
}


try {
    await wx.onBLEConnectionStateChange();
    console.log('Success:', 'onBLEConnectionStateChange');
} catch (e) {
    console.error('Error in onBLEConnectionStateChange:', e);
}


try {
    await wx.onBLECharacteristicValueChange();
    console.log('Success:', 'onBLECharacteristicValueChange');
} catch (e) {
    console.error('Error in onBLECharacteristicValueChange:', e);
}


try {
    await wx.offBLEConnectionStateChanged();
    console.log('Success:', 'offBLEConnectionStateChanged');
} catch (e) {
    console.error('Error in offBLEConnectionStateChanged:', e);
}


try {
    await wx.offBLEConnectionStateChange();
    console.log('Success:', 'offBLEConnectionStateChange');
} catch (e) {
    console.error('Error in offBLEConnectionStateChange:', e);
}


try {
    await wx.offBLECharacteristicValueChange();
    console.log('Success:', 'offBLECharacteristicValueChange');
} catch (e) {
    console.error('Error in offBLECharacteristicValueChange:', e);
}


try {
    await wx.startBeaconDiscovery();
    console.log('Success:', 'startBeaconDiscovery');
} catch (e) {
    console.error('Error in startBeaconDiscovery:', e);
}


try {
    await wx.stopBeaconDiscovery();
    console.log('Success:', 'stopBeaconDiscovery');
} catch (e) {
    console.error('Error in stopBeaconDiscovery:', e);
}


try {
    await wx.getBeacons();
    console.log('Success:', 'getBeacons');
} catch (e) {
    console.error('Error in getBeacons:', e);
}


try {
    await wx.onBeaconUpdate();
    console.log('Success:', 'onBeaconUpdate');
} catch (e) {
    console.error('Error in onBeaconUpdate:', e);
}


try {
    await wx.offBeaconUpdate();
    console.log('Success:', 'offBeaconUpdate');
} catch (e) {
    console.error('Error in offBeaconUpdate:', e);
}


try {
    await wx.onBeaconServiceChange();
    console.log('Success:', 'onBeaconServiceChange');
} catch (e) {
    console.error('Error in onBeaconServiceChange:', e);
}


try {
    await wx.offBeaconServiceChange();
    console.log('Success:', 'offBeaconServiceChange');
} catch (e) {
    console.error('Error in offBeaconServiceChange:', e);
}


try {
    await wx.startWifi();
    console.log('Success:', 'startWifi');
} catch (e) {
    console.error('Error in startWifi:', e);
}


try {
    await wx.stopWifi();
    console.log('Success:', 'stopWifi');
} catch (e) {
    console.error('Error in stopWifi:', e);
}


try {
    await wx.getWifiList();
    console.log('Success:', 'getWifiList');
} catch (e) {
    console.error('Error in getWifiList:', e);
}


try {
    await wx.getConnectedWifi();
    console.log('Success:', 'getConnectedWifi');
} catch (e) {
    console.error('Error in getConnectedWifi:', e);
}


try {
    await wx.connectWifi();
    console.log('Success:', 'connectWifi');
} catch (e) {
    console.error('Error in connectWifi:', e);
}


try {
    await wx.presetWifiList();
    console.log('Success:', 'presetWifiList');
} catch (e) {
    console.error('Error in presetWifiList:', e);
}


try {
    await wx.setWifiList();
    console.log('Success:', 'setWifiList');
} catch (e) {
    console.error('Error in setWifiList:', e);
}


try {
    await wx.onGetWifiList();
    console.log('Success:', 'onGetWifiList');
} catch (e) {
    console.error('Error in onGetWifiList:', e);
}


try {
    await wx.onWifiConnected();
    console.log('Success:', 'onWifiConnected');
} catch (e) {
    console.error('Error in onWifiConnected:', e);
}


try {
    await wx.offGetWifiList();
    console.log('Success:', 'offGetWifiList');
} catch (e) {
    console.error('Error in offGetWifiList:', e);
}


try {
    await wx.offWifiConnected();
    console.log('Success:', 'offWifiConnected');
} catch (e) {
    console.error('Error in offWifiConnected:', e);
}


try {
    await wx.onEvaluateWifi();
    console.log('Success:', 'onEvaluateWifi');
} catch (e) {
    console.error('Error in onEvaluateWifi:', e);
}


try {
    await wx.getHCEState();
    console.log('Success:', 'getHCEState');
} catch (e) {
    console.error('Error in getHCEState:', e);
}


try {
    await wx.startHCE();
    console.log('Success:', 'startHCE');
} catch (e) {
    console.error('Error in startHCE:', e);
}


try {
    await wx.stopHCE();
    console.log('Success:', 'stopHCE');
} catch (e) {
    console.error('Error in stopHCE:', e);
}


try {
    await wx.sendHCEMessage();
    console.log('Success:', 'sendHCEMessage');
} catch (e) {
    console.error('Error in sendHCEMessage:', e);
}


try {
    await wx.onHCEMessage();
    console.log('Success:', 'onHCEMessage');
} catch (e) {
    console.error('Error in onHCEMessage:', e);
}


try {
    await wx.offHCEMessage();
    console.log('Success:', 'offHCEMessage');
} catch (e) {
    console.error('Error in offHCEMessage:', e);
}


try {
    await wx.getNFCAdapter();
    console.log('Success:', 'getNFCAdapter');
} catch (e) {
    console.error('Error in getNFCAdapter:', e);
}


try {
    await wx.startLocalServiceDiscovery();
    console.log('Success:', 'startLocalServiceDiscovery');
} catch (e) {
    console.error('Error in startLocalServiceDiscovery:', e);
}


try {
    await wx.stopLocalServiceDiscovery();
    console.log('Success:', 'stopLocalServiceDiscovery');
} catch (e) {
    console.error('Error in stopLocalServiceDiscovery:', e);
}


try {
    await wx.onLocalServiceFound();
    console.log('Success:', 'onLocalServiceFound');
} catch (e) {
    console.error('Error in onLocalServiceFound:', e);
}


try {
    await wx.offLocalServiceFound();
    console.log('Success:', 'offLocalServiceFound');
} catch (e) {
    console.error('Error in offLocalServiceFound:', e);
}


try {
    await wx.onLocalServiceLost();
    console.log('Success:', 'onLocalServiceLost');
} catch (e) {
    console.error('Error in onLocalServiceLost:', e);
}


try {
    await wx.offLocalServiceLost();
    console.log('Success:', 'offLocalServiceLost');
} catch (e) {
    console.error('Error in offLocalServiceLost:', e);
}


try {
    await wx.onLocalServiceDiscoveryStop();
    console.log('Success:', 'onLocalServiceDiscoveryStop');
} catch (e) {
    console.error('Error in onLocalServiceDiscoveryStop:', e);
}


try {
    await wx.offLocalServiceDiscoveryStop();
    console.log('Success:', 'offLocalServiceDiscoveryStop');
} catch (e) {
    console.error('Error in offLocalServiceDiscoveryStop:', e);
}


try {
    await wx.onLocalServiceResolveFail();
    console.log('Success:', 'onLocalServiceResolveFail');
} catch (e) {
    console.error('Error in onLocalServiceResolveFail:', e);
}


try {
    await wx.offLocalServiceResolveFail();
    console.log('Success:', 'offLocalServiceResolveFail');
} catch (e) {
    console.error('Error in offLocalServiceResolveFail:', e);
}


try {
    await wx.redirectTo();
    console.log('Success:', 'redirectTo');
} catch (e) {
    console.error('Error in redirectTo:', e);
}


try {
    await wx.reLaunch();
    console.log('Success:', 'reLaunch');
} catch (e) {
    console.error('Error in reLaunch:', e);
}


try {
    await wx.navigateTo();
    console.log('Success:', 'navigateTo');
} catch (e) {
    console.error('Error in navigateTo:', e);
}


try {
    await wx.switchTab();
    console.log('Success:', 'switchTab');
} catch (e) {
    console.error('Error in switchTab:', e);
}


try {
    await wx.navigateBack();
    console.log('Success:', 'navigateBack');
} catch (e) {
    console.error('Error in navigateBack:', e);
}


try {
    await wx.onAppShow();
    console.log('Success:', 'onAppShow');
} catch (e) {
    console.error('Error in onAppShow:', e);
}


try {
    await wx.offAppShow();
    console.log('Success:', 'offAppShow');
} catch (e) {
    console.error('Error in offAppShow:', e);
}


try {
    await wx.onAppHide();
    console.log('Success:', 'onAppHide');
} catch (e) {
    console.error('Error in onAppHide:', e);
}


try {
    await wx.offAppHide();
    console.log('Success:', 'offAppHide');
} catch (e) {
    console.error('Error in offAppHide:', e);
}


try {
    await wx.onError();
    console.log('Success:', 'onError');
} catch (e) {
    console.error('Error in onError:', e);
}


try {
    await wx.offError();
    console.log('Success:', 'offError');
} catch (e) {
    console.error('Error in offError:', e);
}


try {
    await wx.onUnhandledRejection();
    console.log('Success:', 'onUnhandledRejection');
} catch (e) {
    console.error('Error in onUnhandledRejection:', e);
}


try {
    await wx.offUnhandledRejection();
    console.log('Success:', 'offUnhandledRejection');
} catch (e) {
    console.error('Error in offUnhandledRejection:', e);
}


try {
    await wx.getLaunchOptionsSync();
    console.log('Success:', 'getLaunchOptionsSync');
} catch (e) {
    console.error('Error in getLaunchOptionsSync:', e);
}


try {
    await wx.getEnterOptionsSync();
    console.log('Success:', 'getEnterOptionsSync');
} catch (e) {
    console.error('Error in getEnterOptionsSync:', e);
}


try {
    await wx.onWindowResize();
    console.log('Success:', 'onWindowResize');
} catch (e) {
    console.error('Error in onWindowResize:', e);
}


try {
    await wx.offWindowResize();
    console.log('Success:', 'offWindowResize');
} catch (e) {
    console.error('Error in offWindowResize:', e);
}


try {
    await wx.setPageOrientation();
    console.log('Success:', 'setPageOrientation');
} catch (e) {
    console.error('Error in setPageOrientation:', e);
}


try {
    await wx.getStorage();
    console.log('Success:', 'getStorage');
} catch (e) {
    console.error('Error in getStorage:', e);
}


try {
    await wx.getStorageSync();
    console.log('Success:', 'getStorageSync');
} catch (e) {
    console.error('Error in getStorageSync:', e);
}


try {
    await wx.setStorage();
    console.log('Success:', 'setStorage');
} catch (e) {
    console.error('Error in setStorage:', e);
}


try {
    await wx.setStorageSync();
    console.log('Success:', 'setStorageSync');
} catch (e) {
    console.error('Error in setStorageSync:', e);
}


try {
    await wx.removeStorage();
    console.log('Success:', 'removeStorage');
} catch (e) {
    console.error('Error in removeStorage:', e);
}


try {
    await wx.removeStorageSync();
    console.log('Success:', 'removeStorageSync');
} catch (e) {
    console.error('Error in removeStorageSync:', e);
}


try {
    await wx.clearStorage();
    console.log('Success:', 'clearStorage');
} catch (e) {
    console.error('Error in clearStorage:', e);
}


try {
    await wx.clearStorageSync();
    console.log('Success:', 'clearStorageSync');
} catch (e) {
    console.error('Error in clearStorageSync:', e);
}


try {
    await wx.getStorageInfo();
    console.log('Success:', 'getStorageInfo');
} catch (e) {
    console.error('Error in getStorageInfo:', e);
}


try {
    await wx.getStorageInfoSync();
    console.log('Success:', 'getStorageInfoSync');
} catch (e) {
    console.error('Error in getStorageInfoSync:', e);
}


try {
    await wx.getBackgroundFetchData();
    console.log('Success:', 'getBackgroundFetchData');
} catch (e) {
    console.error('Error in getBackgroundFetchData:', e);
}


try {
    await wx.onBackgroundFetchData();
    console.log('Success:', 'onBackgroundFetchData');
} catch (e) {
    console.error('Error in onBackgroundFetchData:', e);
}


try {
    await wx.setBackgroundFetchToken();
    console.log('Success:', 'setBackgroundFetchToken');
} catch (e) {
    console.error('Error in setBackgroundFetchToken:', e);
}


try {
    await wx.getBackgroundFetchToken();
    console.log('Success:', 'getBackgroundFetchToken');
} catch (e) {
    console.error('Error in getBackgroundFetchToken:', e);
}


try {
    await wx.request();
    console.log('Success:', 'request');
} catch (e) {
    console.error('Error in request:', e);
}


try {
    await wx.connectSocket();
    console.log('Success:', 'connectSocket');
} catch (e) {
    console.error('Error in connectSocket:', e);
}


try {
    await wx.closeSocket();
    console.log('Success:', 'closeSocket');
} catch (e) {
    console.error('Error in closeSocket:', e);
}


try {
    await wx.sendSocketMessage();
    console.log('Success:', 'sendSocketMessage');
} catch (e) {
    console.error('Error in sendSocketMessage:', e);
}


try {
    await wx.onSocketOpen();
    console.log('Success:', 'onSocketOpen');
} catch (e) {
    console.error('Error in onSocketOpen:', e);
}


try {
    await wx.onSocketClose();
    console.log('Success:', 'onSocketClose');
} catch (e) {
    console.error('Error in onSocketClose:', e);
}


try {
    await wx.onSocketMessage();
    console.log('Success:', 'onSocketMessage');
} catch (e) {
    console.error('Error in onSocketMessage:', e);
}


try {
    await wx.onSocketError();
    console.log('Success:', 'onSocketError');
} catch (e) {
    console.error('Error in onSocketError:', e);
}


try {
    await wx.uploadFile();
    console.log('Success:', 'uploadFile');
} catch (e) {
    console.error('Error in uploadFile:', e);
}


try {
    await wx.downloadFile();
    console.log('Success:', 'downloadFile');
} catch (e) {
    console.error('Error in downloadFile:', e);
}


try {
    await wx.addNativeDownloadTask();
    console.log('Success:', 'addNativeDownloadTask');
} catch (e) {
    console.error('Error in addNativeDownloadTask:', e);
}


try {
    await wx.downloadApp();
    console.log('Success:', 'downloadApp');
} catch (e) {
    console.error('Error in downloadApp:', e);
}


try {
    await wx.installDownloadApp();
    console.log('Success:', 'installDownloadApp');
} catch (e) {
    console.error('Error in installDownloadApp:', e);
}


try {
    await wx.getAppInstallState();
    console.log('Success:', 'getAppInstallState');
} catch (e) {
    console.error('Error in getAppInstallState:', e);
}


try {
    await wx.queryDownloadAppTask();
    console.log('Success:', 'queryDownloadAppTask');
} catch (e) {
    console.error('Error in queryDownloadAppTask:', e);
}


try {
    await wx.cancelDownloadAppTask();
    console.log('Success:', 'cancelDownloadAppTask');
} catch (e) {
    console.error('Error in cancelDownloadAppTask:', e);
}


try {
    await wx.resumeDownloadAppTask();
    console.log('Success:', 'resumeDownloadAppTask');
} catch (e) {
    console.error('Error in resumeDownloadAppTask:', e);
}


try {
    await wx.pauseDownloadAppTask();
    console.log('Success:', 'pauseDownloadAppTask');
} catch (e) {
    console.error('Error in pauseDownloadAppTask:', e);
}


try {
    await wx.onDownloadAppStateChange();
    console.log('Success:', 'onDownloadAppStateChange');
} catch (e) {
    console.error('Error in onDownloadAppStateChange:', e);
}


try {
    await wx.downloadAppForIOS();
    console.log('Success:', 'downloadAppForIOS');
} catch (e) {
    console.error('Error in downloadAppForIOS:', e);
}


try {
    await wx.calRqt();
    console.log('Success:', 'calRqt');
} catch (e) {
    console.error('Error in calRqt:', e);
}


try {
    await wx.secureTunnel();
    console.log('Success:', 'secureTunnel');
} catch (e) {
    console.error('Error in secureTunnel:', e);
}


try {
    await wx.chooseImage();
    console.log('Success:', 'chooseImage');
} catch (e) {
    console.error('Error in chooseImage:', e);
}


try {
    await wx.previewImage();
    console.log('Success:', 'previewImage');
} catch (e) {
    console.error('Error in previewImage:', e);
}


try {
    await wx.getImageInfo();
    console.log('Success:', 'getImageInfo');
} catch (e) {
    console.error('Error in getImageInfo:', e);
}


try {
    await wx.saveImageToPhotosAlbum();
    console.log('Success:', 'saveImageToPhotosAlbum');
} catch (e) {
    console.error('Error in saveImageToPhotosAlbum:', e);
}


try {
    await wx.compressImage();
    console.log('Success:', 'compressImage');
} catch (e) {
    console.error('Error in compressImage:', e);
}


try {
    await wx.startRecord();
    console.log('Success:', 'startRecord');
} catch (e) {
    console.error('Error in startRecord:', e);
}


try {
    await wx.stopRecord();
    console.log('Success:', 'stopRecord');
} catch (e) {
    console.error('Error in stopRecord:', e);
}


try {
    await wx.playVoice();
    console.log('Success:', 'playVoice');
} catch (e) {
    console.error('Error in playVoice:', e);
}


try {
    await wx.pauseVoice();
    console.log('Success:', 'pauseVoice');
} catch (e) {
    console.error('Error in pauseVoice:', e);
}


try {
    await wx.stopVoice();
    console.log('Success:', 'stopVoice');
} catch (e) {
    console.error('Error in stopVoice:', e);
}


try {
    await wx.onVoicePlayEnd();
    console.log('Success:', 'onVoicePlayEnd');
} catch (e) {
    console.error('Error in onVoicePlayEnd:', e);
}


try {
    await wx.chooseVideo();
    console.log('Success:', 'chooseVideo');
} catch (e) {
    console.error('Error in chooseVideo:', e);
}


try {
    await wx.saveVideoToPhotosAlbum();
    console.log('Success:', 'saveVideoToPhotosAlbum');
} catch (e) {
    console.error('Error in saveVideoToPhotosAlbum:', e);
}


try {
    await wx.getVideoInfo();
    console.log('Success:', 'getVideoInfo');
} catch (e) {
    console.error('Error in getVideoInfo:', e);
}


try {
    await wx.compressVideo();
    console.log('Success:', 'compressVideo');
} catch (e) {
    console.error('Error in compressVideo:', e);
}


try {
    await wx.loadFontFace();
    console.log('Success:', 'loadFontFace');
} catch (e) {
    console.error('Error in loadFontFace:', e);
}


try {
    await wx.createMediaContainer();
    console.log('Success:', 'createMediaContainer');
} catch (e) {
    console.error('Error in createMediaContainer:', e);
}


try {
    await wx.createMediaRecorder();
    console.log('Success:', 'createMediaRecorder');
} catch (e) {
    console.error('Error in createMediaRecorder:', e);
}


try {
    await wx.createVideoDecoder();
    console.log('Success:', 'createVideoDecoder');
} catch (e) {
    console.error('Error in createVideoDecoder:', e);
}


try {
    await wx.openVideoEditor();
    console.log('Success:', 'openVideoEditor');
} catch (e) {
    console.error('Error in openVideoEditor:', e);
}


try {
    await wx.createMediaAudioPlayer();
    console.log('Success:', 'createMediaAudioPlayer');
} catch (e) {
    console.error('Error in createMediaAudioPlayer:', e);
}


try {
    await wx.getLocation();
    console.log('Success:', 'getLocation');
} catch (e) {
    console.error('Error in getLocation:', e);
}


try {
    await wx.openLocation();
    console.log('Success:', 'openLocation');
} catch (e) {
    console.error('Error in openLocation:', e);
}


try {
    await wx.chooseLocation();
    console.log('Success:', 'chooseLocation');
} catch (e) {
    console.error('Error in chooseLocation:', e);
}


try {
    await wx.choosePoi();
    console.log('Success:', 'choosePoi');
} catch (e) {
    console.error('Error in choosePoi:', e);
}


try {
    await wx.onLocationChange();
    console.log('Success:', 'onLocationChange');
} catch (e) {
    console.error('Error in onLocationChange:', e);
}


try {
    await wx.offLocationChange();
    console.log('Success:', 'offLocationChange');
} catch (e) {
    console.error('Error in offLocationChange:', e);
}


try {
    await wx.startLocationUpdateBackground();
    console.log('Success:', 'startLocationUpdateBackground');
} catch (e) {
    console.error('Error in startLocationUpdateBackground:', e);
}


try {
    await wx.startLocationUpdate();
    console.log('Success:', 'startLocationUpdate');
} catch (e) {
    console.error('Error in startLocationUpdate:', e);
}


try {
    await wx.stopLocationUpdate();
    console.log('Success:', 'stopLocationUpdate');
} catch (e) {
    console.error('Error in stopLocationUpdate:', e);
}


try {
    await wx.getNetworkType();
    console.log('Success:', 'getNetworkType');
} catch (e) {
    console.error('Error in getNetworkType:', e);
}


try {
    await wx.onNetworkStatusChange();
    console.log('Success:', 'onNetworkStatusChange');
} catch (e) {
    console.error('Error in onNetworkStatusChange:', e);
}


try {
    await wx.offNetworkStatusChange();
    console.log('Success:', 'offNetworkStatusChange');
} catch (e) {
    console.error('Error in offNetworkStatusChange:', e);
}


try {
    await wx.getSystemInfo();
    console.log('Success:', 'getSystemInfo');
} catch (e) {
    console.error('Error in getSystemInfo:', e);
}


try {
    await wx.getSystemInfoSync();
    console.log('Success:', 'getSystemInfoSync');
} catch (e) {
    console.error('Error in getSystemInfoSync:', e);
}


try {
    await wx.getSystemInfoAsync();
    console.log('Success:', 'getSystemInfoAsync');
} catch (e) {
    console.error('Error in getSystemInfoAsync:', e);
}


try {
    await wx.getBatteryInfo();
    console.log('Success:', 'getBatteryInfo');
} catch (e) {
    console.error('Error in getBatteryInfo:', e);
}


try {
    await wx.getBatteryInfoSync();
    console.log('Success:', 'getBatteryInfoSync');
} catch (e) {
    console.error('Error in getBatteryInfoSync:', e);
}


try {
    await wx.startAccelerometer();
    console.log('Success:', 'startAccelerometer');
} catch (e) {
    console.error('Error in startAccelerometer:', e);
}


try {
    await wx.stopAccelerometer();
    console.log('Success:', 'stopAccelerometer');
} catch (e) {
    console.error('Error in stopAccelerometer:', e);
}


try {
    await wx.onAccelerometerChange();
    console.log('Success:', 'onAccelerometerChange');
} catch (e) {
    console.error('Error in onAccelerometerChange:', e);
}


try {
    await wx.offAccelerometerChange();
    console.log('Success:', 'offAccelerometerChange');
} catch (e) {
    console.error('Error in offAccelerometerChange:', e);
}


try {
    await wx.startCompass();
    console.log('Success:', 'startCompass');
} catch (e) {
    console.error('Error in startCompass:', e);
}


try {
    await wx.stopCompass();
    console.log('Success:', 'stopCompass');
} catch (e) {
    console.error('Error in stopCompass:', e);
}


try {
    await wx.onCompassChange();
    console.log('Success:', 'onCompassChange');
} catch (e) {
    console.error('Error in onCompassChange:', e);
}


try {
    await wx.offCompassChange();
    console.log('Success:', 'offCompassChange');
} catch (e) {
    console.error('Error in offCompassChange:', e);
}


try {
    await wx.startDeviceMotionListening();
    console.log('Success:', 'startDeviceMotionListening');
} catch (e) {
    console.error('Error in startDeviceMotionListening:', e);
}


try {
    await wx.stopDeviceMotionListening();
    console.log('Success:', 'stopDeviceMotionListening');
} catch (e) {
    console.error('Error in stopDeviceMotionListening:', e);
}


try {
    await wx.onDeviceMotionChange();
    console.log('Success:', 'onDeviceMotionChange');
} catch (e) {
    console.error('Error in onDeviceMotionChange:', e);
}


try {
    await wx.offDeviceMotionChange();
    console.log('Success:', 'offDeviceMotionChange');
} catch (e) {
    console.error('Error in offDeviceMotionChange:', e);
}


try {
    await wx.startGyroscope();
    console.log('Success:', 'startGyroscope');
} catch (e) {
    console.error('Error in startGyroscope:', e);
}


try {
    await wx.stopGyroscope();
    console.log('Success:', 'stopGyroscope');
} catch (e) {
    console.error('Error in stopGyroscope:', e);
}


try {
    await wx.onGyroscopeChange();
    console.log('Success:', 'onGyroscopeChange');
} catch (e) {
    console.error('Error in onGyroscopeChange:', e);
}


try {
    await wx.offGyroscopeChange();
    console.log('Success:', 'offGyroscopeChange');
} catch (e) {
    console.error('Error in offGyroscopeChange:', e);
}


try {
    await wx.checkIsOpenAccessibility();
    console.log('Success:', 'checkIsOpenAccessibility');
} catch (e) {
    console.error('Error in checkIsOpenAccessibility:', e);
}


try {
    await wx.addPhoneCalendar();
    console.log('Success:', 'addPhoneCalendar');
} catch (e) {
    console.error('Error in addPhoneCalendar:', e);
}


try {
    await wx.addPhoneRepeatCalendar();
    console.log('Success:', 'addPhoneRepeatCalendar');
} catch (e) {
    console.error('Error in addPhoneRepeatCalendar:', e);
}


try {
    await wx.getRandomValues();
    console.log('Success:', 'getRandomValues');
} catch (e) {
    console.error('Error in getRandomValues:', e);
}


try {
    await wx.reportAction();
    console.log('Success:', 'reportAction');
} catch (e) {
    console.error('Error in reportAction:', e);
}


try {
    await wx.getBackgroundAudioManager();
    console.log('Success:', 'getBackgroundAudioManager');
} catch (e) {
    console.error('Error in getBackgroundAudioManager:', e);
}


try {
    await wx.getRecorderManager();
    console.log('Success:', 'getRecorderManager');
} catch (e) {
    console.error('Error in getRecorderManager:', e);
}


try {
    await wx.getBackgroundAudioPlayerState();
    console.log('Success:', 'getBackgroundAudioPlayerState');
} catch (e) {
    console.error('Error in getBackgroundAudioPlayerState:', e);
}


try {
    await wx.playBackgroundAudio();
    console.log('Success:', 'playBackgroundAudio');
} catch (e) {
    console.error('Error in playBackgroundAudio:', e);
}


try {
    await wx.pauseBackgroundAudio();
    console.log('Success:', 'pauseBackgroundAudio');
} catch (e) {
    console.error('Error in pauseBackgroundAudio:', e);
}


try {
    await wx.seekBackgroundAudio();
    console.log('Success:', 'seekBackgroundAudio');
} catch (e) {
    console.error('Error in seekBackgroundAudio:', e);
}


try {
    await wx.stopBackgroundAudio();
    console.log('Success:', 'stopBackgroundAudio');
} catch (e) {
    console.error('Error in stopBackgroundAudio:', e);
}


try {
    await wx.onBackgroundAudioPlay();
    console.log('Success:', 'onBackgroundAudioPlay');
} catch (e) {
    console.error('Error in onBackgroundAudioPlay:', e);
}


try {
    await wx.onBackgroundAudioPause();
    console.log('Success:', 'onBackgroundAudioPause');
} catch (e) {
    console.error('Error in onBackgroundAudioPause:', e);
}


try {
    await wx.onBackgroundAudioStop();
    console.log('Success:', 'onBackgroundAudioStop');
} catch (e) {
    console.error('Error in onBackgroundAudioStop:', e);
}


try {
    await wx.joinVoIPChat();
    console.log('Success:', 'joinVoIPChat');
} catch (e) {
    console.error('Error in joinVoIPChat:', e);
}


try {
    await wx.exitVoIPChat();
    console.log('Success:', 'exitVoIPChat');
} catch (e) {
    console.error('Error in exitVoIPChat:', e);
}


try {
    await wx.updateVoIPChatMuteConfig();
    console.log('Success:', 'updateVoIPChatMuteConfig');
} catch (e) {
    console.error('Error in updateVoIPChatMuteConfig:', e);
}


try {
    await wx.onVoIPChatMembersChanged();
    console.log('Success:', 'onVoIPChatMembersChanged');
} catch (e) {
    console.error('Error in onVoIPChatMembersChanged:', e);
}


try {
    await wx.onVoIPChatSpeakersChanged();
    console.log('Success:', 'onVoIPChatSpeakersChanged');
} catch (e) {
    console.error('Error in onVoIPChatSpeakersChanged:', e);
}


try {
    await wx.onVoIPChatInterrupted();
    console.log('Success:', 'onVoIPChatInterrupted');
} catch (e) {
    console.error('Error in onVoIPChatInterrupted:', e);
}


try {
    await wx.offVoIPChatMembersChanged();
    console.log('Success:', 'offVoIPChatMembersChanged');
} catch (e) {
    console.error('Error in offVoIPChatMembersChanged:', e);
}


try {
    await wx.offVoIPChatSpeakersChanged();
    console.log('Success:', 'offVoIPChatSpeakersChanged');
} catch (e) {
    console.error('Error in offVoIPChatSpeakersChanged:', e);
}


try {
    await wx.offVoIPChatInterrupted();
    console.log('Success:', 'offVoIPChatInterrupted');
} catch (e) {
    console.error('Error in offVoIPChatInterrupted:', e);
}


try {
    await wx.subscribeVoIPVideoMembers();
    console.log('Success:', 'subscribeVoIPVideoMembers');
} catch (e) {
    console.error('Error in subscribeVoIPVideoMembers:', e);
}


try {
    await wx.onVoIPVideoMembersChanged();
    console.log('Success:', 'onVoIPVideoMembersChanged');
} catch (e) {
    console.error('Error in onVoIPVideoMembersChanged:', e);
}


try {
    await wx.offVoIPVideoMembersChanged();
    console.log('Success:', 'offVoIPVideoMembersChanged');
} catch (e) {
    console.error('Error in offVoIPVideoMembersChanged:', e);
}


try {
    await wx.join1v1Chat();
    console.log('Success:', 'join1v1Chat');
} catch (e) {
    console.error('Error in join1v1Chat:', e);
}


try {
    await wx.setEnable1v1Chat();
    console.log('Success:', 'setEnable1v1Chat');
} catch (e) {
    console.error('Error in setEnable1v1Chat:', e);
}


try {
    await wx.requestSubscribeMessage();
    console.log('Success:', 'requestSubscribeMessage');
} catch (e) {
    console.error('Error in requestSubscribeMessage:', e);
}


try {
    await wx.login();
    console.log('Success:', 'login');
} catch (e) {
    console.error('Error in login:', e);
}


try {
    await wx.logout();
    console.log('Success:', 'logout');
} catch (e) {
    console.error('Error in logout:', e);
}


try {
    await wx.checkSession();
    console.log('Success:', 'checkSession');
} catch (e) {
    console.error('Error in checkSession:', e);
}


try {
    await wx.authorize();
    console.log('Success:', 'authorize');
} catch (e) {
    console.error('Error in authorize:', e);
}


try {
    await wx.getUserInfo();
    console.log('Success:', 'getUserInfo');
} catch (e) {
    console.error('Error in getUserInfo:', e);
}


try {
    await wx.getUserProfile();
    console.log('Success:', 'getUserProfile');
} catch (e) {
    console.error('Error in getUserProfile:', e);
}


try {
    await wx.requestPayment();
    console.log('Success:', 'requestPayment');
} catch (e) {
    console.error('Error in requestPayment:', e);
}


try {
    await wx.verifyPaymentPassword();
    console.log('Success:', 'verifyPaymentPassword');
} catch (e) {
    console.error('Error in verifyPaymentPassword:', e);
}


try {
    await wx.bindPaymentCard();
    console.log('Success:', 'bindPaymentCard');
} catch (e) {
    console.error('Error in bindPaymentCard:', e);
}


try {
    await wx.requestPaymentToBank();
    console.log('Success:', 'requestPaymentToBank');
} catch (e) {
    console.error('Error in requestPaymentToBank:', e);
}


try {
    await wx.requestVirtualPayment();
    console.log('Success:', 'requestVirtualPayment');
} catch (e) {
    console.error('Error in requestVirtualPayment:', e);
}


try {
    await wx.openOfflinePayView();
    console.log('Success:', 'openOfflinePayView');
} catch (e) {
    console.error('Error in openOfflinePayView:', e);
}


try {
    await wx.openWCPayCardList();
    console.log('Success:', 'openWCPayCardList');
} catch (e) {
    console.error('Error in openWCPayCardList:', e);
}


try {
    await wx.requestMallPayment();
    console.log('Success:', 'requestMallPayment');
} catch (e) {
    console.error('Error in requestMallPayment:', e);
}


try {
    await wx.setCurrentPaySpeech();
    console.log('Success:', 'setCurrentPaySpeech');
} catch (e) {
    console.error('Error in setCurrentPaySpeech:', e);
}


try {
    await wx.loadPaySpeechDialectConfig();
    console.log('Success:', 'loadPaySpeechDialectConfig');
} catch (e) {
    console.error('Error in loadPaySpeechDialectConfig:', e);
}


try {
    await wx.requestJointPayment();
    console.log('Success:', 'requestJointPayment');
} catch (e) {
    console.error('Error in requestJointPayment:', e);
}


try {
    await wx.getWCPayOverseaPrepayRequest();
    console.log('Success:', 'getWCPayOverseaPrepayRequest');
} catch (e) {
    console.error('Error in getWCPayOverseaPrepayRequest:', e);
}


try {
    await wx.requestH5Transaction();
    console.log('Success:', 'requestH5Transaction');
} catch (e) {
    console.error('Error in requestH5Transaction:', e);
}


try {
    await wx.openWCPayOverseaPaymentReceive();
    console.log('Success:', 'openWCPayOverseaPaymentReceive');
} catch (e) {
    console.error('Error in openWCPayOverseaPaymentReceive:', e);
}


try {
    await wx.handleWCPayOverseaWalletBuffer();
    console.log('Success:', 'handleWCPayOverseaWalletBuffer');
} catch (e) {
    console.error('Error in handleWCPayOverseaWalletBuffer:', e);
}


try {
    await wx.requestVerifyUserIdentity();
    console.log('Success:', 'requestVerifyUserIdentity');
} catch (e) {
    console.error('Error in requestVerifyUserIdentity:', e);
}


try {
    await wx.phoneBindCardVerifySms();
    console.log('Success:', 'phoneBindCardVerifySms');
} catch (e) {
    console.error('Error in phoneBindCardVerifySms:', e);
}


try {
    await wx.faceVerifyForPay();
    console.log('Success:', 'faceVerifyForPay');
} catch (e) {
    console.error('Error in faceVerifyForPay:', e);
}


try {
    await wx.openOfficialAccountProfile();
    console.log('Success:', 'openOfficialAccountProfile');
} catch (e) {
    console.error('Error in openOfficialAccountProfile:', e);
}


try {
    await wx.openUserProfile();
    console.log('Success:', 'openUserProfile');
} catch (e) {
    console.error('Error in openUserProfile:', e);
}


try {
    await wx.requestBizSplitBillPayment();
    console.log('Success:', 'requestBizSplitBillPayment');
} catch (e) {
    console.error('Error in requestBizSplitBillPayment:', e);
}


try {
    await wx.openSelectPayment();
    console.log('Success:', 'openSelectPayment');
} catch (e) {
    console.error('Error in openSelectPayment:', e);
}


try {
    await wx.requestEntrustAuthorization();
    console.log('Success:', 'requestEntrustAuthorization');
} catch (e) {
    console.error('Error in requestEntrustAuthorization:', e);
}


try {
    await wx.requestFacetoFacePayment();
    console.log('Success:', 'requestFacetoFacePayment');
} catch (e) {
    console.error('Error in requestFacetoFacePayment:', e);
}


try {
    await wx.requestQueryCashier();
    console.log('Success:', 'requestQueryCashier');
} catch (e) {
    console.error('Error in requestQueryCashier:', e);
}


try {
    await wx.requestOrderPayment();
    console.log('Success:', 'requestOrderPayment');
} catch (e) {
    console.error('Error in requestOrderPayment:', e);
}


try {
    await wx.openMiniProgramProfile();
    console.log('Success:', 'openMiniProgramProfile');
} catch (e) {
    console.error('Error in openMiniProgramProfile:', e);
}


try {
    await wx.openMiniProgramSearch();
    console.log('Success:', 'openMiniProgramSearch');
} catch (e) {
    console.error('Error in openMiniProgramSearch:', e);
}


try {
    await wx.openMiniProgramHistoryList();
    console.log('Success:', 'openMiniProgramHistoryList');
} catch (e) {
    console.error('Error in openMiniProgramHistoryList:', e);
}


try {
    await wx.openMiniProgramStarList();
    console.log('Success:', 'openMiniProgramStarList');
} catch (e) {
    console.error('Error in openMiniProgramStarList:', e);
}


try {
    await wx.batchGetContactDirectly();
    console.log('Success:', 'batchGetContactDirectly');
} catch (e) {
    console.error('Error in batchGetContactDirectly:', e);
}


try {
    await wx.preloadMiniProgramEnvDirectly();
    console.log('Success:', 'preloadMiniProgramEnvDirectly');
} catch (e) {
    console.error('Error in preloadMiniProgramEnvDirectly:', e);
}


try {
    await wx.predownloadMiniProgramPackageDirectly();
    console.log('Success:', 'predownloadMiniProgramPackageDirectly');
} catch (e) {
    console.error('Error in predownloadMiniProgramPackageDirectly:', e);
}


try {
    await wx.preventApplePayUI();
    console.log('Success:', 'preventApplePayUI');
} catch (e) {
    console.error('Error in preventApplePayUI:', e);
}


try {
    await wx.getWxSecData();
    console.log('Success:', 'getWxSecData');
} catch (e) {
    console.error('Error in getWxSecData:', e);
}


try {
    await wx.addCard();
    console.log('Success:', 'addCard');
} catch (e) {
    console.error('Error in addCard:', e);
}


try {
    await wx.openCard();
    console.log('Success:', 'openCard');
} catch (e) {
    console.error('Error in openCard:', e);
}


try {
    await wx.checkTrafficCardConditions();
    console.log('Success:', 'checkTrafficCardConditions');
} catch (e) {
    console.error('Error in checkTrafficCardConditions:', e);
}


try {
    await wx.queryTrafficCardInfo();
    console.log('Success:', 'queryTrafficCardInfo');
} catch (e) {
    console.error('Error in queryTrafficCardInfo:', e);
}


try {
    await wx.issueTrafficCard();
    console.log('Success:', 'issueTrafficCard');
} catch (e) {
    console.error('Error in issueTrafficCard:', e);
}


try {
    await wx.rechargeTrafficCard();
    console.log('Success:', 'rechargeTrafficCard');
} catch (e) {
    console.error('Error in rechargeTrafficCard:', e);
}


try {
    await wx.setDefaultTrafficCard();
    console.log('Success:', 'setDefaultTrafficCard');
} catch (e) {
    console.error('Error in setDefaultTrafficCard:', e);
}


try {
    await wx.addFileToFavorites();
    console.log('Success:', 'addFileToFavorites');
} catch (e) {
    console.error('Error in addFileToFavorites:', e);
}


try {
    await wx.addVideoToFavorites();
    console.log('Success:', 'addVideoToFavorites');
} catch (e) {
    console.error('Error in addVideoToFavorites:', e);
}


try {
    await wx.scanCode();
    console.log('Success:', 'scanCode');
} catch (e) {
    console.error('Error in scanCode:', e);
}


try {
    await wx.openQRCode();
    console.log('Success:', 'openQRCode');
} catch (e) {
    console.error('Error in openQRCode:', e);
}


try {
    await wx.scanItem();
    console.log('Success:', 'scanItem');
} catch (e) {
    console.error('Error in scanItem:', e);
}


try {
    await wx.chooseAddress();
    console.log('Success:', 'chooseAddress');
} catch (e) {
    console.error('Error in chooseAddress:', e);
}


try {
    await wx.saveFile();
    console.log('Success:', 'saveFile');
} catch (e) {
    console.error('Error in saveFile:', e);
}


try {
    await wx.openDocument();
    console.log('Success:', 'openDocument');
} catch (e) {
    console.error('Error in openDocument:', e);
}


try {
    await wx.getSavedFileList();
    console.log('Success:', 'getSavedFileList');
} catch (e) {
    console.error('Error in getSavedFileList:', e);
}


try {
    await wx.getSavedFileInfo();
    console.log('Success:', 'getSavedFileInfo');
} catch (e) {
    console.error('Error in getSavedFileInfo:', e);
}


try {
    await wx.getFileInfo();
    console.log('Success:', 'getFileInfo');
} catch (e) {
    console.error('Error in getFileInfo:', e);
}


try {
    await wx.removeSavedFile();
    console.log('Success:', 'removeSavedFile');
} catch (e) {
    console.error('Error in removeSavedFile:', e);
}


try {
    await wx.getFileSystemManager();
    console.log('Success:', 'getFileSystemManager');
} catch (e) {
    console.error('Error in getFileSystemManager:', e);
}


try {
    await wx.saveFileToDisk();
    console.log('Success:', 'saveFileToDisk');
} catch (e) {
    console.error('Error in saveFileToDisk:', e);
}


try {
    await wx.getABTestConfig();
    console.log('Success:', 'getABTestConfig');
} catch (e) {
    console.error('Error in getABTestConfig:', e);
}


try {
    await wx.chooseContact();
    console.log('Success:', 'chooseContact');
} catch (e) {
    console.error('Error in chooseContact:', e);
}


try {
    await wx.removeUserCloudStorage();
    console.log('Success:', 'removeUserCloudStorage');
} catch (e) {
    console.error('Error in removeUserCloudStorage:', e);
}


try {
    await wx.setUserCloudStorage();
    console.log('Success:', 'setUserCloudStorage');
} catch (e) {
    console.error('Error in setUserCloudStorage:', e);
}


try {
    await wx.makePhoneCall();
    console.log('Success:', 'makePhoneCall');
} catch (e) {
    console.error('Error in makePhoneCall:', e);
}


try {
    await wx.makeVoIPCall();
    console.log('Success:', 'makeVoIPCall');
} catch (e) {
    console.error('Error in makeVoIPCall:', e);
}


try {
    await wx.onAppRoute();
    console.log('Success:', 'onAppRoute');
} catch (e) {
    console.error('Error in onAppRoute:', e);
}


try {
    await wx.onAppRouteDone();
    console.log('Success:', 'onAppRouteDone');
} catch (e) {
    console.error('Error in onAppRouteDone:', e);
}


try {
    await wx.onAppEnterBackground();
    console.log('Success:', 'onAppEnterBackground');
} catch (e) {
    console.error('Error in onAppEnterBackground:', e);
}


try {
    await wx.onAppEnterForeground();
    console.log('Success:', 'onAppEnterForeground');
} catch (e) {
    console.error('Error in onAppEnterForeground:', e);
}


try {
    await wx.onAppUnhang();
    console.log('Success:', 'onAppUnhang');
} catch (e) {
    console.error('Error in onAppUnhang:', e);
}


try {
    await wx.onPageReload();
    console.log('Success:', 'onPageReload');
} catch (e) {
    console.error('Error in onPageReload:', e);
}


try {
    await wx.onPageNotFound();
    console.log('Success:', 'onPageNotFound');
} catch (e) {
    console.error('Error in onPageNotFound:', e);
}


try {
    await wx.offPageNotFound();
    console.log('Success:', 'offPageNotFound');
} catch (e) {
    console.error('Error in offPageNotFound:', e);
}


try {
    await wx.onThemeChange();
    console.log('Success:', 'onThemeChange');
} catch (e) {
    console.error('Error in onThemeChange:', e);
}


try {
    await wx.offThemeChange();
    console.log('Success:', 'offThemeChange');
} catch (e) {
    console.error('Error in offThemeChange:', e);
}


try {
    await wx.onLazyLoadError();
    console.log('Success:', 'onLazyLoadError');
} catch (e) {
    console.error('Error in onLazyLoadError:', e);
}


try {
    await wx.offLazyLoadError();
    console.log('Success:', 'offLazyLoadError');
} catch (e) {
    console.error('Error in offLazyLoadError:', e);
}


try {
    await wx.onCopyUrl();
    console.log('Success:', 'onCopyUrl');
} catch (e) {
    console.error('Error in onCopyUrl:', e);
}


try {
    await wx.offCopyUrl();
    console.log('Success:', 'offCopyUrl');
} catch (e) {
    console.error('Error in offCopyUrl:', e);
}


try {
    await wx.createAnimation();
    console.log('Success:', 'createAnimation');
} catch (e) {
    console.error('Error in createAnimation:', e);
}


try {
    await wx.createInnerAudioContext();
    console.log('Success:', 'createInnerAudioContext');
} catch (e) {
    console.error('Error in createInnerAudioContext:', e);
}


try {
    await wx.getAvailableAudioSources();
    console.log('Success:', 'getAvailableAudioSources');
} catch (e) {
    console.error('Error in getAvailableAudioSources:', e);
}


try {
    await wx.onAudioInterruptionBegin();
    console.log('Success:', 'onAudioInterruptionBegin');
} catch (e) {
    console.error('Error in onAudioInterruptionBegin:', e);
}


try {
    await wx.offAudioInterruptionBegin();
    console.log('Success:', 'offAudioInterruptionBegin');
} catch (e) {
    console.error('Error in offAudioInterruptionBegin:', e);
}


try {
    await wx.onAudioInterruptionEnd();
    console.log('Success:', 'onAudioInterruptionEnd');
} catch (e) {
    console.error('Error in onAudioInterruptionEnd:', e);
}


try {
    await wx.offAudioInterruptionEnd();
    console.log('Success:', 'offAudioInterruptionEnd');
} catch (e) {
    console.error('Error in offAudioInterruptionEnd:', e);
}


try {
    await wx.setInnerAudioOption();
    console.log('Success:', 'setInnerAudioOption');
} catch (e) {
    console.error('Error in setInnerAudioOption:', e);
}


try {
    await wx.createAudioContext();
    console.log('Success:', 'createAudioContext');
} catch (e) {
    console.error('Error in createAudioContext:', e);
}


try {
    await wx.createVideoContext();
    console.log('Success:', 'createVideoContext');
} catch (e) {
    console.error('Error in createVideoContext:', e);
}


try {
    await wx.createMapContext();
    console.log('Success:', 'createMapContext');
} catch (e) {
    console.error('Error in createMapContext:', e);
}


try {
    await wx.createCameraContext();
    console.log('Success:', 'createCameraContext');
} catch (e) {
    console.error('Error in createCameraContext:', e);
}


try {
    await wx.createLivePlayerContext();
    console.log('Success:', 'createLivePlayerContext');
} catch (e) {
    console.error('Error in createLivePlayerContext:', e);
}


try {
    await wx.createLivePusherContext();
    console.log('Success:', 'createLivePusherContext');
} catch (e) {
    console.error('Error in createLivePusherContext:', e);
}


try {
    await wx.onWebviewEvent();
    console.log('Success:', 'onWebviewEvent');
} catch (e) {
    console.error('Error in onWebviewEvent:', e);
}


try {
    await wx.onNativeEvent();
    console.log('Success:', 'onNativeEvent');
} catch (e) {
    console.error('Error in onNativeEvent:', e);
}


try {
    await wx.hideKeyboard();
    console.log('Success:', 'hideKeyboard');
} catch (e) {
    console.error('Error in hideKeyboard:', e);
}


try {
    await wx.onKeyboardHeightChange();
    console.log('Success:', 'onKeyboardHeightChange');
} catch (e) {
    console.error('Error in onKeyboardHeightChange:', e);
}


try {
    await wx.offKeyboardHeightChange();
    console.log('Success:', 'offKeyboardHeightChange');
} catch (e) {
    console.error('Error in offKeyboardHeightChange:', e);
}


try {
    await wx.getPublicLibVersion();
    console.log('Success:', 'getPublicLibVersion');
} catch (e) {
    console.error('Error in getPublicLibVersion:', e);
}


try {
    await wx.showModal();
    console.log('Success:', 'showModal');
} catch (e) {
    console.error('Error in showModal:', e);
}


try {
    await wx.showToast();
    console.log('Success:', 'showToast');
} catch (e) {
    console.error('Error in showToast:', e);
}


try {
    await wx.hideToast();
    console.log('Success:', 'hideToast');
} catch (e) {
    console.error('Error in hideToast:', e);
}


try {
    await wx.showLoading();
    console.log('Success:', 'showLoading');
} catch (e) {
    console.error('Error in showLoading:', e);
}


try {
    await wx.hideLoading();
    console.log('Success:', 'hideLoading');
} catch (e) {
    console.error('Error in hideLoading:', e);
}


try {
    await wx.showActionSheet();
    console.log('Success:', 'showActionSheet');
} catch (e) {
    console.error('Error in showActionSheet:', e);
}


try {
    await wx.showShareActionSheet();
    console.log('Success:', 'showShareActionSheet');
} catch (e) {
    console.error('Error in showShareActionSheet:', e);
}


try {
    await wx.reportAnalytics();
    console.log('Success:', 'reportAnalytics');
} catch (e) {
    console.error('Error in reportAnalytics:', e);
}


try {
    await wx.reportMonitor();
    console.log('Success:', 'reportMonitor');
} catch (e) {
    console.error('Error in reportMonitor:', e);
}


try {
    await wx.getClipboardData();
    console.log('Success:', 'getClipboardData');
} catch (e) {
    console.error('Error in getClipboardData:', e);
}


try {
    await wx.setClipboardData();
    console.log('Success:', 'setClipboardData');
} catch (e) {
    console.error('Error in setClipboardData:', e);
}


try {
    await wx.createSelectorQuery();
    console.log('Success:', 'createSelectorQuery');
} catch (e) {
    console.error('Error in createSelectorQuery:', e);
}


try {
    await wx.createIntersectionObserver();
    console.log('Success:', 'createIntersectionObserver');
} catch (e) {
    console.error('Error in createIntersectionObserver:', e);
}


try {
    await wx.createMediaQueryObserver();
    console.log('Success:', 'createMediaQueryObserver');
} catch (e) {
    console.error('Error in createMediaQueryObserver:', e);
}


try {
    await wx.nextTick();
    console.log('Success:', 'nextTick');
} catch (e) {
    console.error('Error in nextTick:', e);
}


try {
    await wx.updatePerfData();
    console.log('Success:', 'updatePerfData');
} catch (e) {
    console.error('Error in updatePerfData:', e);
}


try {
    await wx.traceEvent();
    console.log('Success:', 'traceEvent');
} catch (e) {
    console.error('Error in traceEvent:', e);
}


try {
    await wx.onMemoryWarning();
    console.log('Success:', 'onMemoryWarning');
} catch (e) {
    console.error('Error in onMemoryWarning:', e);
}


try {
    await wx.offMemoryWarning();
    console.log('Success:', 'offMemoryWarning');
} catch (e) {
    console.error('Error in offMemoryWarning:', e);
}


try {
    await wx.reportPerformance();
    console.log('Success:', 'reportPerformance');
} catch (e) {
    console.error('Error in reportPerformance:', e);
}


try {
    await wx.getPerformance();
    console.log('Success:', 'getPerformance');
} catch (e) {
    console.error('Error in getPerformance:', e);
}


try {
    await wx.getUpdateManager();
    console.log('Success:', 'getUpdateManager');
} catch (e) {
    console.error('Error in getUpdateManager:', e);
}


try {
    await wx.updateWeChatApp();
    console.log('Success:', 'updateWeChatApp');
} catch (e) {
    console.error('Error in updateWeChatApp:', e);
}


try {
    await wx.createWorker();
    console.log('Success:', 'createWorker');
} catch (e) {
    console.error('Error in createWorker:', e);
}


try {
    await wx.voiceSplitJoint();
    console.log('Success:', 'voiceSplitJoint');
} catch (e) {
    console.error('Error in voiceSplitJoint:', e);
}


try {
    await wx.uploadSilkVoice();
    console.log('Success:', 'uploadSilkVoice');
} catch (e) {
    console.error('Error in uploadSilkVoice:', e);
}


try {
    await wx.downloadSilkVoice();
    console.log('Success:', 'downloadSilkVoice');
} catch (e) {
    console.error('Error in downloadSilkVoice:', e);
}


try {
    await wx.getResPath();
    console.log('Success:', 'getResPath');
} catch (e) {
    console.error('Error in getResPath:', e);
}


try {
    await wx.setResPath();
    console.log('Success:', 'setResPath');
} catch (e) {
    console.error('Error in setResPath:', e);
}


try {
    await wx.setCookies();
    console.log('Success:', 'setCookies');
} catch (e) {
    console.error('Error in setCookies:', e);
}


try {
    await wx.getCookies();
    console.log('Success:', 'getCookies');
} catch (e) {
    console.error('Error in getCookies:', e);
}


try {
    await wx.faceDetect();
    console.log('Success:', 'faceDetect');
} catch (e) {
    console.error('Error in faceDetect:', e);
}


try {
    await wx.initFaceDetect();
    console.log('Success:', 'initFaceDetect');
} catch (e) {
    console.error('Error in initFaceDetect:', e);
}


try {
    await wx.stopFaceDetect();
    console.log('Success:', 'stopFaceDetect');
} catch (e) {
    console.error('Error in stopFaceDetect:', e);
}


try {
    await wx.createBufferURL();
    console.log('Success:', 'createBufferURL');
} catch (e) {
    console.error('Error in createBufferURL:', e);
}


try {
    await wx.revokeBufferURL();
    console.log('Success:', 'revokeBufferURL');
} catch (e) {
    console.error('Error in revokeBufferURL:', e);
}


try {
    await wx.createSignal();
    console.log('Success:', 'createSignal');
} catch (e) {
    console.error('Error in createSignal:', e);
}


try {
    await wx.bindGroup();
    console.log('Success:', 'bindGroup');
} catch (e) {
    console.error('Error in bindGroup:', e);
}


try {
    await wx.joinGroup();
    console.log('Success:', 'joinGroup');
} catch (e) {
    console.error('Error in joinGroup:', e);
}


try {
    await wx.getLabInfo();
    console.log('Success:', 'getLabInfo');
} catch (e) {
    console.error('Error in getLabInfo:', e);
}


try {
    await wx.setLabInfo();
    console.log('Success:', 'setLabInfo');
} catch (e) {
    console.error('Error in setLabInfo:', e);
}


try {
    await wx.createUDPSocket();
    console.log('Success:', 'createUDPSocket');
} catch (e) {
    console.error('Error in createUDPSocket:', e);
}


try {
    await wx.isSystemError();
    console.log('Success:', 'isSystemError');
} catch (e) {
    console.error('Error in isSystemError:', e);
}


try {
    await wx.isSDKError();
    console.log('Success:', 'isSDKError');
} catch (e) {
    console.error('Error in isSDKError:', e);
}


try {
    await wx.isThirdError();
    console.log('Success:', 'isThirdError');
} catch (e) {
    console.error('Error in isThirdError:', e);
}


try {
    await wx.createRewardedVideoAd();
    console.log('Success:', 'createRewardedVideoAd');
} catch (e) {
    console.error('Error in createRewardedVideoAd:', e);
}


try {
    await wx.createInterstitialAd();
    console.log('Success:', 'createInterstitialAd');
} catch (e) {
    console.error('Error in createInterstitialAd:', e);
}


try {
    await wx.createCustomAd();
    console.log('Success:', 'createCustomAd');
} catch (e) {
    console.error('Error in createCustomAd:', e);
}


try {
    await wx.preloadVideoAd();
    console.log('Success:', 'preloadVideoAd');
} catch (e) {
    console.error('Error in preloadVideoAd:', e);
}


try {
    await wx.preloadAd();
    console.log('Success:', 'preloadAd');
} catch (e) {
    console.error('Error in preloadAd:', e);
}


try {
    await wx.getLogManager();
    console.log('Success:', 'getLogManager');
} catch (e) {
    console.error('Error in getLogManager:', e);
}


try {
    await wx.getRealtimeLogManager();
    console.log('Success:', 'getRealtimeLogManager');
} catch (e) {
    console.error('Error in getRealtimeLogManager:', e);
}


try {
    await wx.getExptInfo();
    console.log('Success:', 'getExptInfo');
} catch (e) {
    console.error('Error in getExptInfo:', e);
}


try {
    await wx.getExptInfoSync();
    console.log('Success:', 'getExptInfoSync');
} catch (e) {
    console.error('Error in getExptInfoSync:', e);
}


try {
    await wx.reportEvent();
    console.log('Success:', 'reportEvent');
} catch (e) {
    console.error('Error in reportEvent:', e);
}


try {
    await wx.getChannelsLiveInfo();
    console.log('Success:', 'getChannelsLiveInfo');
} catch (e) {
    console.error('Error in getChannelsLiveInfo:', e);
}


try {
    await wx.openChannelsLive();
    console.log('Success:', 'openChannelsLive');
} catch (e) {
    console.error('Error in openChannelsLive:', e);
}


try {
    await wx.openChannelsActivity();
    console.log('Success:', 'openChannelsActivity');
} catch (e) {
    console.error('Error in openChannelsActivity:', e);
}


try {
    await wx.openChannelsUserProfile();
    console.log('Success:', 'openChannelsUserProfile');
} catch (e) {
    console.error('Error in openChannelsUserProfile:', e);
}


try {
    await wx.openPublicServicePayment();
    console.log('Success:', 'openPublicServicePayment');
} catch (e) {
    console.error('Error in openPublicServicePayment:', e);
}


try {
    await wx.chooseShareGroup();
    console.log('Success:', 'chooseShareGroup');
} catch (e) {
    console.error('Error in chooseShareGroup:', e);
}


try {
    await wx.enterContact();
    console.log('Success:', 'enterContact');
} catch (e) {
    console.error('Error in enterContact:', e);
}


try {
    await wx.getGroupEnterInfo();
    console.log('Success:', 'getGroupEnterInfo');
} catch (e) {
    console.error('Error in getGroupEnterInfo:', e);
}


try {
    await wx.preloadWebview();
    console.log('Success:', 'preloadWebview');
} catch (e) {
    console.error('Error in preloadWebview:', e);
}

},
