/** @format */

import React, { useEffect, useRef } from 'react';

export default (cb, timeout, deps = []) => {
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
