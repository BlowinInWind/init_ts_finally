import React, { Suspense, ReactNode, ComponentType } from 'react';

/**
 * 按需加载
 * @param Component 导入的组件
 * @param fallback 默认的loading
 * @returns {*}
 */
export default (
    Component: Promise<{ default: ComponentType<any> }>,
    fallback: ReactNode = null
) => {
    const Com = React.lazy(() => Component);
    return props => {
        return (
            <Suspense fallback={fallback}>
                <Com {...props} />
            </Suspense>
        );
    };
};
