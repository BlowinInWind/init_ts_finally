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

const questions = [
    {
        type: 'single',
        question: '【单选】企业近一年的销售收入是多少？',
        selectors: ['5000万元以下', '5000-20000万元', '20000万元以上']
    },
    {
        type: 'single',
        question: '【单选】企业研发费用投入占比多少？',
        selectors: ['30%以下', '30%-60%', '60%以上']
    },
    {
        type: 'single',
        question: '【单选】近一年高新技术产品（服务）收入占企业同期总收入的比',
        selectors: ['30%及以下', '31%-59%', '60%-79%', '80%-100%']
    },
    {
        type: 'single',
        question: '【单选】公司的科技成果转化能力',
        selectors: ['强', '较强', '一般', '较弱', '弱']
    },
    {
        type: 'single',
        question:
            '【单选】大学专科以上学历的科技人员占企业职工总数的30%以上，其中研发人员占企业职工总数的10%以上。',
        selectors: ['是', '否']
    },
    {
        type: 'multiple',
        question: '【多选】您对以下哪些比较关注？',
        selectors: [
            '商标',
            '专利',
            '版权',
            '品牌认证',
            '高新技术企业认定',
            '涉外业务'
        ]
    },
    {
        type: 'multiple',
        question: '【多选】您对以下哪些企业资质比较关注？',
        selectors: [
            '企业信用等级',
            '信息化工程与技术服务',
            'CMMI软件能力',
            'ISO27001',
            'ISO14001',
            '知识产权贯标',
            'ISO9001',
            '3C认证'
        ]
    },
    {
        type: 'multiple',
        question: '【多选】您对以下哪些政策比较关注？',
        selectors: ['资质认定类', '资金补助类', '研发费用类', '人才项目类']
    }
];

export default () => {
    const [current, setCurrent] = useState(1);
    const [go, setGo] = useState(false);
    const [currentQ, setCurrentQ] = useState(questions[0]);
    const [result, setResult] = useState([]);
    const [result1, setResult1] = useState([]);
    const [single, setSingle] = useState(0);
    const [multiple, setMultiple] = useState([]);
    const total = useRef(questions.length);

    useEffect(() => {
        current < total.current ? setGo(false) : setGo(true);
        setCurrentQ(questions[current - 1]);
    }, [current]);

    const selectAnwser = useCallback(
        v => {
            const newResult = [...result];
            newResult[current - 1] = v;
            setResult(newResult);
        },
        [current]
    );

    const selectAnwser1 = useCallback(
        v => {
            const newResult = [...result1];
            newResult[current - 1] = v;
            setResult1(newResult);
        },
        [current]
    );
    return (
<<<<<<< HEAD
        <div className="answer-sheet">
            <div className="answer-sheet-head">
                <span className="answer-sheet-head_title">
                    企业AI无形资产智能盘点
                </span>
                <span className="answer-sheet-head_counter">{`${current}/${total.current}`}</span>
                <Button
                    className="answer-sheet-head_skip"
                    disabled={current === total.current}
                    onClick={() => setCurrent(total.current)}
=======
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
>>>>>>> d817ab40c3fc6f1c38af54b74bb4747da0710696
                >
                    跳过
                </Button>
            </div>

            <div className="answer-sheet-question">
                <div className="answer-sheet-question_title">
                    {currentQ.question}
                </div>
                {/* <Radio.Group
                    onChange={v => {
                        selectAnwser(v.target.value);
                        // console.log(v.target.value);
                    }}
                    // value={(result[current - 1] && result[current - 1][0]) || 0}
                >
                    <Radio value={1}>1</Radio>
                    <Radio value={2}>2</Radio>
                    <Radio value={3}>3</Radio>
                </Radio.Group> */}
                {currentQ.type === 'single' ? (
                    <Radddio.Group
                        onChange={v => {
                            selectAnwser(v);
                        }}
                        value={result?.[current - 1] ?? 0}
                    >
                        {currentQ.selectors.map((selector, index) => (
                            <div key={`Q_single_${current}_${index}`}>
                                <Radddio value={index + 1}>{selector}</Radddio>
                            </div>
                        ))}
                    </Radddio.Group>
                ) : (
                    <Checkbox.Group
                        onChange={v => setMultiple(v)}
                        value={result[current - 1] || []}
                    >
                        {currentQ.selectors.map((selector, index) => (
                            <div key={`Q_single_${index}`}>
                                <Checkbox value={index + 1}>
                                    {selector}
                                </Checkbox>
                            </div>
                        ))}
                    </Checkbox.Group>
                )}

                <div>--------------</div>
                {currentQ.type === 'single' ? (
                    <Radio.Group
                        onChange={v => {
                            selectAnwser1(v.target.value);
                        }}
                        value={result1?.[current - 1] ?? 0}
                    >
                        {currentQ.selectors.map((selector, index) => (
                            <div key={`Q_single_${current}_${index}`}>
                                <Radio value={index + 1}>{selector}</Radio>
                            </div>
                        ))}
                    </Radio.Group>
                ) : (
                    <Checkbox.Group
                        onChange={v => setMultiple(v)}
                        value={result1[current - 1] || []}
                    >
                        {currentQ.selectors.map((selector, index) => (
                            <div key={`Q_single_${index}`}>
                                <Checkbox value={index + 1}>
                                    {selector}
                                </Checkbox>
                            </div>
                        ))}
                    </Checkbox.Group>
                )}
            </div>
            <div className="check-btn">
                <Button
                    disabled={current < 2}
                    onClick={() => setCurrent(current - 1)}
                >
                    上一个
                </Button>
                {go ? (
                    <Button onClick={() => window.console.log('我要去体检')}>
                        立即体检
                    </Button>
                ) : (
                    <Button onClick={() => setCurrent(current + 1)}>
                        下一个
                    </Button>
                )}
            </div>
        </div>
    );
};

// // import CheckBox from '@components/Checkbox/index';
// // import Radio from '@components/Radio/index';

// // const plainOptions = ['Apple', 'Pear', 'Orange'];

// // eslint-disable-next-line react/no-multi-comp
// const Index = () => {
//     const [checked, setChecked] = useState(true);
//     const [value, setValue] = useState();
//     const [value1, setValue1] = useState();

//     const [checkedList, setCheckedList] = React.useState(['1', '2', '3']);
//     const [indeterminate, setIndeterminate] = React.useState(false);
//     const [checkAll, setCheckAll] = React.useState(true);

//     // const [a, setA] = useState(0);
//     // useEffect(() => {
//     //     setA(1);
//     // }, []);

//     // return (
//     //     <div>
//     //         <Demo></Demo>
//     //         11111
//     //         <button>{a}</button>
//     //         <input type="text" value={a} />
//     //     </div>
//     // );

//     return (
//         <div className="wrapper">
//             <div className="wrapper_inner"></div>
//             {/* <div>
//                 <div>radio</div>
//                 <Radio.Group
//                     onChange={v => {
//                         // console.log(v);
//                         setValue(v);
//                     }}
//                     value={value}
//                 >
//                     <div>
//                         <Radio value={1}>111</Radio>
//                     </div>
//                     <Radio value={2}>222</Radio>
//                 </Radio.Group>
//                 <div>radio</div>

//                 <div>radio</div>
//                 <Radio.Group
//                     onChange={v => {
//                         // console.log(v);
//                         setValue1(v);
//                     }}
//                     value={value1}
//                 >
//                     <div>
//                         <Radio value="111">121</Radio>
//                     </div>
//                     <Radio value="222">221</Radio>
//                 </Radio.Group>
//             </div> */}
//             <CheckBox
//                 checked={checkAll}
//                 indeterminate={indeterminate}
//                 onChange={e => {
//                     setCheckedList(e.target.checked ? ['1', '2', '3'] : []);
//                     setIndeterminate(false);
//                     setCheckAll(e.target.checked);
//                 }}
//             >
//                 Check all
//             </CheckBox>

//             <CheckBox.Group
//                 onChange={e => {
//                     console.log(e);
//                 }}
//                 // value={['112']}
//                 options={[
//                     { label: '12312312312312312312312312', value: 11 },
//                     { label: '213123123213', value: 22 }
//                 ]}
//                 value={[11]}
//             ></CheckBox.Group>

//             {/* <CheckBox.Group
//                 onChange={list => {
//                     setCheckedList(list);
//                     setIndeterminate(!!list.length && list.length < 3);
//                     setCheckAll(list.length === 3);
//                 }}
//                 options={['1', '2', '3']}
//                 value={checkedList}
//             ></CheckBox.Group>

//             <CheckBox
//                 checked={checked}
//                 disabled
//                 label="123"
//                 onChange={e => {
//                     setChecked(e.target.checked);
//                 }}
//             >
//                 1123321
//             </CheckBox> */}
//         </div>
//     );
// };

// export default Index;
