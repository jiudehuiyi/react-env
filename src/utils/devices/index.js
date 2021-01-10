
const devices = ()=>{

    let platform = {
        desktop: false,
        mobile: false,
        ios: false,
        android: false,
        tablet: false,
        windows: false,
        cocoonjs: false,
        xbox: false,
        gamepads: false,
        chrome: false,
        firefox: false,
        touch: false,
    };
    let ua = navigator.userAgent;
    if (/(windows|mac os|linux|cros)/i.test(ua)) {
        platform.desktop = true;
    }
    if (/xbox/i.test(ua)) {
        platform.xbox = true;
    }
    if (/(?:Firefox)/.test(ua)) {
        platform.firefox = true;
    }
    if (/(?:Chrome|CriOS)/.test(ua)) {
        platform.chrome = true;
    }
    if (/(windows phone|iemobile|wpdesktop)/i.test(ua)) {
        platform.desktop = false;
        platform.mobile = true;
        platform.windows = true;
    } else {
        if (/android/i.test(ua)) {
            platform.desktop = false;
            platform.mobile = true;
            platform.android = true;
        } else {
            if (/ip([ao]d|hone)/i.test(ua)) {
                platform.desktop = false;
                platform.mobile = true;
                platform.ios = true;
            }
        }
    }

    platform.tablet =
        /(?:iPad|PlayBook)/.test(ua) ||
        (platform.android && !/(?:Mobile)/.test(ua)) ||
        (platform.firefox && /(?:Tablet)/.test(ua));

    platform.touch = "ontouchstart" in window;
    platform.gamepads = "getGamepads" in navigator;
    return platform;

}

export default devices;


//使用方法 devices() === "mobile" 