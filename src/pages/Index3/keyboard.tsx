/* eslint-disable no-useless-escape */
import React, { useEffect } from 'react';

export default () => {
    const judgeDeviceType = () => {
        const ua = window.navigator.userAgent.toLocaleLowerCase();
        const isIOS = /iphone|ipad|ipod/.test(ua);
        const isAndroid = /android/.test(ua);

        return {
            isIOS,
            isAndroid
        };
    };
    const activeElementScrollIntoView = (activeElement, delay) => {
        const editable = activeElement.getAttribute('contenteditable');

        // 输入框、textarea或富文本获取焦点后没有将该元素滚动到可视区
        if (
            activeElement.tagName === 'INPUT' ||
            activeElement.tagName === 'TEXTAREA' ||
            editable === '' ||
            editable
        ) {
            setTimeout(() => {
                activeElement?.scrollIntoView(true);
            }, delay);
        }
    };

    const handleIosInputBlur = () => {
        // IOS 键盘收起后操作
        // 微信浏览器版本6.7.4+IOS12会出现键盘收起后，视图被顶上去了没有下来
        const wechatInfoRe = /MicroMessenger\/([\d\.]+)/i;
        const wechatInfo = wechatInfoRe.exec(window?.navigator?.userAgent);
        const wechatVersion =
            wechatInfo && wechatInfo.length > 1 && wechatInfo[1];

        const osInfoRe = /OS (\d+)_(\d+)_?(\d+)?/i;
        const osInfo = osInfoRe.exec(navigator.appVersion);
        const osVersion = osInfo && osInfo.length > 1 && osInfo[1];

        if (!wechatVersion || !osVersion) {
            return;
        }
        const height = Math.max(
            document.body.clientHeight,
            document.documentElement.clientHeight
        );
        if (
            Number(wechatVersion.replace(/\./g, '')) >= 674 &&
            Number(osVersion) >= 12
        ) {
            window.scrollTo(0, height);
        }
    };

    useEffect(() => {
        let handleResize;
        const listenKeybord = $input => {
            const deviceType = judgeDeviceType();
            if (deviceType.isIOS) {
                $input?.addEventListener(
                    'focus',
                    () => {
                        activeElementScrollIntoView($input, 500);
                        // IOS 键盘弹起后操作
                    },
                    false
                );

                // IOS 键盘收起：IOS 点击输入框以外区域或点击收起按钮，输入框都会失去焦点，键盘会收起，
                $input?.addEventListener('blur', () => {
                    handleIosInputBlur();
                    // IOS 键盘收起后操作
                });
            }

            if (deviceType.isAndroid) {
                let originHeight =
                    document.documentElement.clientHeight ||
                    document.body.clientHeight;

                handleResize = () => {
                    const resizeHeight =
                        document.documentElement.clientHeight ||
                        document.body.clientHeight;
                    if (originHeight < resizeHeight) {
                        // Android 键盘收起后操作
                    } else {
                        // Android 键盘弹起后操作
                        activeElementScrollIntoView($input, 500);
                    }

                    originHeight = resizeHeight;
                };
                window.addEventListener('resize', handleResize, false);
            }
        };

        const inputs = document.querySelectorAll('input');

        for (let i = 0; i < inputs.length; i++) {
            listenKeybord(inputs[i]);
        }

        return () => {
            window.removeEventListener('resize', handleResize, false);
        };
    }, []);

    return <div></div>;
};
