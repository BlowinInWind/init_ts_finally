/** @format */

// 节流
import { useRef, useCallback, useEffect } from 'react';

const useThrottle = (fn: (key?: any) => void, delay: number) => {
    const timeoutRef = useRef<NodeJS.Timeout | undefined>(undefined);

    const cancel = useCallback(() => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
        timeoutRef.current = undefined;
    }, []);

    const run = useCallback(
        (...args) => {
            if (!timeoutRef.current) {
                timeoutRef.current = setTimeout(() => {
                    fn(...args);

                    timeoutRef.current = undefined;
                }, delay);
            }
        },
        [delay, cancel]
    );

    useEffect(() => cancel, []);

    return { run, cancel };
};

export default useThrottle;
