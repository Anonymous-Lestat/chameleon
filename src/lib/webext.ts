// helpful functions to handle web extension things
let enableChameleon = (enabled: boolean): void => {
  browser.runtime.getPlatformInfo().then(plat => {
    if (enabled === false && plat.os != 'android') {
      browser.browserAction.setIcon({
        path: '../icons/icon_disabled_48.png',
      });
    } else {
      browser.browserAction.setIcon({
        path: '../icons/icon_48.png',
      });
    }
  });
};

let enableContextMenu = (enabled: boolean): void => {
  browser.runtime.sendMessage({
    action: 'contextMenu',
    data: enabled,
  });
};

let firstTimeInstall = (): void => {
  browser.runtime.onInstalled.addListener((details: any) => {
    if (!details.temporary && details.reason === 'install') {
      browser.tabs.create({
        url: 'https://sereneblue.github.io/chameleon',
      });
    }
  });
};

let getSettings = (key: string | null) => {
  return new Promise((resolve: any) => {
    browser.storage.local.get(key, (item: any) => {
      typeof key == 'string' ? resolve(item[key]) : resolve(item);
    });
  });
};

let sendToBackground = (settings: any) => {
  browser.runtime.sendMessage({
    action: 'save',
    data: settings,
  });
};

let setBrowserConfig = (setting: string, value: string): void => {
  if (setting === 'options.cookiePolicy') {
    browser.privacy.websites.cookieConfig.set({
      value: {
        behavior: value,
      },
    });
  } else if (['options.firstPartyIsolate', 'options.resistFingerprinting', 'options.trackingProtectionMode'].includes(setting)) {
    let key: string = setting.split('.')[1];
    browser.privacy.websites[key].set({
      value: value,
    });
  } else if (setting === 'options.disableWebRTC') {
    browser.privacy.network.peerConnectionEnabled.set({
      value: !value,
    });
  } else if (setting === 'options.webRTCPolicy') {
    browser.privacy.network.webRTCIPHandlingPolicy.set({
      value: value,
    });
  }
};

let setSettings = (settings: any) => {
  return new Promise((resolve: any) => {
    browser.storage.local.set(settings, () => {
      resolve();
    });
  });
};

export default {
  enableChameleon,
  enableContextMenu,
  firstTimeInstall,
  getSettings,
  sendToBackground,
  setBrowserConfig,
  setSettings,
};
