// /** @format */

// // 防抖
import { useRef, useCallback, useEffect } from 'react';

// export default (fn, delay) => {
//     const timeoutRef = useRef();

//     const cancel = useCallback(() => {
//         if (timeoutRef.current) {
//             clearTimeout(timeoutRef.current);
//         }
//     }, []);

//     const run = useCallback(
//         (...args) => {
//             cancel();
//             timeoutRef.current = setTimeout(() => {
//                 fn(...args);
//             }, delay);
//         },
//         [delay, cancel]
//     );

//     useEffect(() => cancel, []);

//     return { run, cancel };
// };

export default function useDebounce<T extends (...args: any[]) => any>(
    func: T,
    delay: number,
    deps
): [T, () => void] {
    const timer = useRef<number>();
    const cancel = useCallback(() => {
        if (timer.current) {
            clearTimeout(timer.current);
        }
    }, []);

    const run = useCallback((...args) => {
        cancel();
        timer.current = window.setTimeout(() => {
            func(...args);
        }, delay);
    }, deps);

    useEffect(() => cancel, []);

    return [run as T, cancel];
}
