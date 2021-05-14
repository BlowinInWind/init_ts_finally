/** @format */

// 防抖
import { useRef, useCallback, useEffect } from 'react';

export default (fn, delay) => {
    const timeoutRef = useRef<NodeJS.Timeout | undefined>(undefined);

    const cancel = useCallback(() => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
    }, []);

    const run = useCallback(
        (...args) => {
            cancel();
            timeoutRef.current = setTimeout(() => {
                fn(...args);
            }, delay);
        },
        [delay, cancel]
    );

    useEffect(() => cancel, []);

    return { run, cancel };
};
