/** @format
 * 按需加载
 */

import React, {
    useState,
    useEffect,
    Suspense,
    lazy,
    ComponentType
} from 'react';

export default (
    factory: Promise<{ default: ComponentType<any> }>,
    fallback: React.ReactNode | null = null
) => {
    const [Component, setCompoent] = useState(null);

    useEffect(() => {
        // factory();
        const Com = lazy(() => factory);

        setCompoent(
            <Suspense fallback={fallback}>
                <Com></Com>
            </Suspense>
        );
    }, [factory, fallback]);

    return () => Component;
};
