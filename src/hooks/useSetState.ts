/** @format */

import { useState, useEffect, useRef } from 'react';

// 让useState可以按照setState的方法使用
export default <T>(initState: string | ((val: T) => void)) => {
    const [state, setState] = useState<string | ((val: T) => void)>(initState);
    const isUpdate = useRef<() => void>();

    const setStateFun = (newState, cb) => {
        setState(prev => {
            isUpdate.current = cb;
            return typeof newState === 'function' ? newState(prev) : newState;
        });
    };

    useEffect(() => {
        if (isUpdate.current) {
            isUpdate.current();
        }
    });

    return [state, setStateFun];
};
