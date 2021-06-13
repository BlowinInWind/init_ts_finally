/** @format */

import React, { useState, useEffect } from 'react';
import CheckBox from '@components/Checkbox/index';
import Radio from '@components/Radio/index';
import { Checkbox } from 'antd';
import styles from './common/assets/styles/styles.scss';
import a from './common/assets/styles/a.less';
import b from './common/assets/styles/b.css';
import './common/assets/styles/index.scss';

// const plainOptions = ['Apple', 'Pear', 'Orange'];

// eslint-disable-next-line react/no-multi-comp
const Index = () => {
    const [checked, setChecked] = useState(true);
    const [value, setValue] = useState();
    const [value1, setValue1] = useState();

    const [checkedList, setCheckedList] = React.useState(['1', '2', '3']);
    const [indeterminate, setIndeterminate] = React.useState(false);
    const [checkAll, setCheckAll] = React.useState(true);

    // const [a, setA] = useState(0);
    // useEffect(() => {
    //     setA(1);
    // }, []);

    // return (
    //     <div>
    //         <Demo></Demo>
    //         11111
    //         <button>{a}</button>
    //         <input type="text" value={a} />
    //     </div>
    // );

    return (
        <div className="wrapper">
            <div
                className={`${styles.wrapper_inner}  ${a.less} ${b.css}`}
            ></div>

            <div className="wrapper_inner"></div>
            <div>
                <div>radio</div>
                <Radio.Group
                    onChange={v => {
                        // console.log(v);
                        setValue(v);
                    }}
                    value={value}
                >
                    <div>
                        <Radio value={1}>111</Radio>
                    </div>
                    <Radio value={2}>222</Radio>
                </Radio.Group>
                <div>radio</div>

                <div>radio</div>
                <Radio.Group
                    onChange={v => {
                        // console.log(v);
                        setValue1(v);
                    }}
                    value={value1}
                >
                    <div>
                        <Radio value="111">121</Radio>
                    </div>
                    <Radio value="222">221</Radio>
                </Radio.Group>
            </div>
            {/* <CheckBox
                checked={checkAll}
                indeterminate={indeterminate}
                onChange={e => {
                    setCheckedList(e.target.checked ? ['1', '2', '3'] : []);
                    setIndeterminate(false);
                    setCheckAll(e.target.checked);
                }}
            >
                Check all
            </CheckBox> */}

            {/* <CheckBox.Group
                onChange={e => {
                    console.log(e);
                }}
                // value={['112']}
                options={[
                    { label: '11', value: 11 },
                    { label: '22', value: 22 }
                ]}
                value={[11]}
            ></CheckBox.Group> */}

            {/* <CheckBox.Group
                onChange={list => {
                    setCheckedList(list);
                    setIndeterminate(!!list.length && list.length < 3);
                    setCheckAll(list.length === 3);
                }}
                options={['1', '2', '3']}
                value={checkedList}
            ></CheckBox.Group>

            <CheckBox
                checked={checked}
                disabled
                label="123"
                onChange={e => {
                    setChecked(e.target.checked);
                }}
            >
                1123321
            </CheckBox> */}
        </div>
    );
};

export default Index;
