/** @format */

import { useEffect, useRef, DependencyList } from 'react';

export default (cb: () => void, timeout: number, deps: DependencyList = []) => {
    const callbackRef = useRef(cb);

    useEffect(() => {
        if (timeout < 0 || typeof callbackRef.current !== 'function') return;

        callbackRef.current = cb;

        const timerId = setTimeout(cb, timeout);

        return () => {
            clearTimeout(timerId);
        };
    }, deps);
};
