/** @format */

import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import './common/assets/styles/index.scss';
import cssVars from 'css-vars-ponyfill';
import { Button } from 'antd';

import { lightTheme, darkTheme } from '../../common/js/index';

const Index = () => {
    const [t, setTheme] = useState(false);

    useEffect(() => {
        // document.documentElement.setAttribute(
        //     'data-theme',
        //     t ? 'light' : 'dark'
        // );
        cssVars({
            watch: true, // 当添加，删除或修改其<link>或<style>元素的禁用或href属性时，ponyfill将自行调用
            variables: t ? lightTheme : darkTheme, // variables 自定义属性名/值对的集合
            onlyLegacy: false // false  默认将css变量编译为浏览器识别的css样式  true 当浏览器不支持css变量的时候将css变量编译为识别的css
        });
    }, [t]);

    const history = useHistory();

    return (
        <div className="text_color">
            <Button>111</Button>
            登录 <span className="text-2">asde23</span>
            <button
                onClick={() => {
                    setTheme(theme => !theme);
                    // document.body.style.setProperty('--bg-color', '#7F583F');
                }}
            >
                变色
            </button>
            <button
                onClick={() => {
                    localStorage.setItem('name', '1');
                    history.push('/');
                }}
            >
                登录
            </button>
        </div>
    );
};

export default Index;
