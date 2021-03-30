/** @format */

import React, { useState, useEffect } from 'react';
import Demo from './Demo';

const Index = () => {
    const [a, setA] = useState(0);
    useEffect(() => {
        setA(1);
    }, []);

    // console.log('++++++++++++');

    return (
        <div>
            <Demo></Demo>
            11111
            <button>{a}</button>
            <input type="text" value={a} />
        </div>
    );
};

export default Index;
