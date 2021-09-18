/* eslint-disable no-async-promise-executor */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-await-in-loop */
/** @format */

import React, { useState } from 'react';
import './common/assets/styles/index.scss';
// import cssVars from 'css-vars-ponyfill';
import { Button, Input } from 'antd';
// import { lightTheme, darkTheme } from '../../common/js/index';
import { useRouter } from 'baili_hooks';

function pPipe(...functions) {
    if (functions.length === 0) {
        throw new Error('Expected at least one argument');
    }

    return async (input = undefined) => {
        let currentValue = input;

        for (const function_ of functions) {
            currentValue = await function_(currentValue); // eslint-disable-line no-await-in-loop
        }

        return currentValue;
    };
}

const addUnicorn = async string =>
    new Promise(resolve =>
        setTimeout(() => {
            resolve(`${string} Unicorn`);
        }, 1000)
    );
const addRainbow = async string =>
    new Promise(resolve =>
        setTimeout(() => {
            resolve(`${string} Rainbow`);
        }, 4000)
    );

const addUnicorn1 = async string =>
    new Promise(resolve =>
        setTimeout(() => {
            resolve(`${string} Unicorn`);
        }, 500)
    );

const addRainbow1 = async string =>
    new Promise(resolve =>
        setTimeout(() => {
            resolve(`${string} Rainbow`);
        }, 100)
    );

const pipeline1 = () => {
    return new Promise(resolve => {
        setTimeout(async () => {
            const pipelineAll = pPipe(addUnicorn, addRainbow);
            await pipelineAll();

            resolve(2);
        }, 0);
    });
};

const pipeline2 = () => {
    return new Promise(resolve => {
        setTimeout(async () => {
            const pipelineAll = pPipe(addUnicorn1, addRainbow1);
            await pipelineAll();

            resolve(1);
        }, 5000);
    });
};

const pipelineAll = pPipe(pipeline1, pipeline2);

(async () => {
    await pipelineAll();
})();

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
