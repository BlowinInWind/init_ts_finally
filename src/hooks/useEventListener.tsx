import React, { useEffect, useRef } from 'react';

const useEventListener = (eventName, handler, element = window) => {
    const savedHandler = useRef<(x?: any) => void>();

    useEffect(() => {
        savedHandler.current = handler;
    }, [handler]);

    useEffect(() => {
        const isSupported = element && element.addEventListener;
        if (!isSupported) return;

        const eventListener = event => savedHandler.current(event);

        element.addEventListener(eventName, eventListener);

        return () => {
            element.removeEventListener(eventName, eventListener);
        };
    }, [eventName, element]);
};

export default useEventListener;