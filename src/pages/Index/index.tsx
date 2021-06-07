/** @format */

import React, { useState, useEffect } from 'react';
import './common/assets/styles/index.scss';
import SearchDropDown from '@components/SearchDropDown';

const A = ({ data }) => {
    return <div>11</div>;
};

// eslint-disable-next-line react/no-multi-comp
const Index = () => {
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
            <div className="wrapper_inner"></div>

            <SearchDropDown
                render={data => {
                    return <A data={data}></A>;
                }}
                requestUrl="q"
            ></SearchDropDown>
        </div>
    );
};

export default Index;
