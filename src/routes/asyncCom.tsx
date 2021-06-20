import React, { Suspense, ReactNode, ComponentType } from 'react';

/**
 * 按需加载
 * @param Component 导入的组件
 * @param fallback 默认的loading
 * @returns {*}
 */
export default (Component: ComponentType<any>, fallback: ReactNode = null) => {
    return props => {
        return (
            <Suspense fallback={fallback}>
                <Component {...props} />
            </Suspense>
        );
    };
};
