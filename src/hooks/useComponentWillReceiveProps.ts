/** @format */
import { useRef, useEffect, DependencyList } from 'react';

const useComponentWillReceiveProps = (
    callback: () => void,
    dependencies: DependencyList = []
) => {
    const firstRender = useRef(true);

    useEffect(() => {
        if (firstRender.current) {
            firstRender.current = false;
            return;
        }
        callback();
    }, [callback, dependencies]);
};

export default useComponentWillReceiveProps;
