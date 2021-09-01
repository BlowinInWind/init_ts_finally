import { useState, useEffect, MutableRefObject } from 'react';

/**
 *  const onScreen: boolean = useOnScreen<HTMLDivElement>(ref, "-300px");
 *
 * @template T
 * @param {MutableRefObject<T>} ref
 * @param {string} [rootMargin='0px']
 *
 * entry ====>
 *  boundingClientRect	空间信息
    intersectionRatio	元素可见区域的占比
    isIntersecting	字面理解为是否正在交叉，可用做判断元素是否可见
    target	目标节点，就跟event.target一样
 * @return {*}
 */

const useOnScreen = <T extends Element>(
    ref: MutableRefObject<T>,
    options?: IntersectionObserverInit
) => {
    const [isIntersecting, setIntersecting] = useState<boolean>(false);

    const [intersectionObserverEntry, setIntersectionObserverEntry] =
        useState<IntersectionObserverEntry | null>(null);

    useEffect(() => {
        if (ref.current && typeof IntersectionObserver === 'function') {
            const observer = new IntersectionObserver(
                ([entry]: IntersectionObserverEntry[]) => {
                    setIntersecting(entry.isIntersecting);
                    setIntersectionObserverEntry(entry);
                },
                { ...options }
            );

            if (ref.current) {
                observer.observe(ref.current);
            }

            return () => {
                setIntersectionObserverEntry(null);
                setIntersecting(false);
                observer.disconnect();
                observer.unobserve(ref.current);
            };
        }
    }, []);

    return [isIntersecting, intersectionObserverEntry];
};

export default useOnScreen;
