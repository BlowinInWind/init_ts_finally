import React, { useState, useEffect, MutableRefObject } from 'react';

/**
 *  const onScreen: boolean = useOnScreen<HTMLDivElement>(ref, "-300px");
 *
 * @template T
 * @param {MutableRefObject<T>} ref
 * @param {string} [rootMargin='0px']
 * @return {*}
 */
const useOnScreen = <T extends Element>(
    ref: MutableRefObject<T>,
    rootMargin = '0px'
) => {
    const [isIntersecting, setIntersecting] = useState<boolean>(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                setIntersecting(entry.isIntersecting);
            },
            { rootMargin }
        );

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => {
            observer.unobserve(ref.current);
        };
    }, []);

    return isIntersecting;
};

export default useOnScreen;
