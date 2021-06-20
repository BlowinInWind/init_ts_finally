/** @format */

import { useRef, useCallback, useEffect, DependencyList } from 'react';

/**
 * 防抖
 *
 * @param {(args?: any) => void} fn
 * @param {number} delay
 * @return {*}
 */
export default (
    fn: (args?: any) => void,
    delay: number,
    deps: DependencyList = []
) => {
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
        [delay, cancel, deps]
    );

    useEffect(() => cancel, []);

    return { run, cancel };
};
