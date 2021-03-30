import React, { useEffect, useState, useReducer } from 'react';

const initialState = {
    count: 0,
    step: 1
};

const A = () => {
    // console.log('before useReducer');
    const [state, dispatch] = useReducer(reducer, initialState);
    const { count, step } = state;
    // console.log('after useReducer', state);

    function reducer(prevState, action) {
        // console.log('reducer', state, count, step);
        const { count: prevCount, step: prevStep } = prevState;

        if (action.type === 'tick') {
            // 可以通过闭包访问到组件内部的任何变量
            // 包括props，以及useReducer之前的hooks的结果
            return { count: prevCount + prevStep, step: prevStep };
        }
        throw new Error();
    }

    useEffect(() => {
        const id = setInterval(() => {
            dispatch({ type: 'tick' });
        }, 1000);
        return () => clearInterval(id);
    }, []);

    return <div> {count}</div>;
};

// eslint-disable-next-line react/no-multi-comp
export default () => {
    const [a, setA] = useState(0);
    const [b, setb] = useState(0);

    useEffect(() => {
        setA(1);
        setA(1);
    }, []);

    return (
        <div>
            demo21321 <A step={1}></A>
        </div>
    );
};
