/** @format */

import React, { useState } from 'react';
import './common/assets/styles/index.scss';
// import cssVars from 'css-vars-ponyfill';
import { Button, Input } from 'antd';
// import { lightTheme, darkTheme } from '../../common/js/index';
import { useRouter } from 'baili_hooks';

const Index = () => {
    const { query, replace } = useRouter();

    const [t, setTheme] = useState(false);
    const [a, setA] = useState(1);

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
            {/* <button
                onClick={() => {
                    setTheme(theme => !theme);
                }}
            >
                变色1
            </button> */}
            <button
                onClick={() => {
                    localStorage.setItem('name', '11');
                    replace('/index/home');
                }}
            >
                登11
            </button>
        </div>
    );
};

export default Index;
