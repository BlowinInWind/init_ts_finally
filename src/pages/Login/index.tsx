/** @format */

import React, { useState } from 'react';
import { useHistory } from 'react-router';
import './common/assets/styles/index.scss';
// import cssVars from 'css-vars-ponyfill';
import { Button, Input } from 'antd';
// import { lightTheme, darkTheme } from '../../common/js/index';

const Index = () => {
    const [t, setTheme] = useState(false);
    const [a, setA] = useState(1);
    // useEffect(() => {
    //     cssVars({
    //         watch: true, // 当添加，删除或修改其<link>或<style>元素的禁用或href属性时，ponyfill将自行调用
    //         variables: t ? lightTheme : darkTheme, // variables 自定义属性名/值对的集合
    //         onlyLegacy: false // false  默认将css变量编译为浏览器识别的css样式  true 当浏览器不支持css变量的时候将css变量编译为识别的css
    //     });
    // }, [t]);

    const history = useHistory();

    return (
        <div className="text_color">
            {a}
            <Button
                onClick={() => {
                    setA(a1 => a1 + 1);
                }}
            >
                12221
            </Button>
            <Input></Input>1
            <button
                onClick={() => {
                    setTheme(theme => !theme);
                }}
            >
                变色1
            </button>
            <button
                onClick={() => {
                    history.push('/');
                }}
            >
                登
            </button>
        </div>
    );
};

export default Index;
