/* eslint-disable @typescript-eslint/ban-ts-comment */
import { useState, useRef, useContext, useMemo, useEffect } from 'react';
import { shallowEqual } from 'react-redux';
import { ReduxContext } from './useCreateStore';

const useConnect = (
    mapStoreToState = (...args) => {
        // todo
    }
) => {
    /* 获取 Store 内部的重要函数 */
    const contextValue = useContext(ReduxContext);

    const { getInitState, subscribe, unSubscribe, dispatch } = contextValue;

    /* 用于传递给业务组件的 state  */
    const stateValue = useRef(getInitState(mapStoreToState));

    /* 渲染函数 */
    const [, forceUpdate] = useState();

    /* 产生 */
    const connectValue = useMemo(() => {
        const state = {
            /* 用于比较一次 dispatch 中，新的 state 和 之前的state 是否发生变化  */
            cacheState: stateValue.current,
            update(newState) {
                /* 获取订阅的 state */
                const selectState = mapStoreToState(newState);
                /* 浅比较 state 是否发生变化，如果发生变化， */
                const isEqual = shallowEqual(state.cacheState, selectState);
                state.cacheState = selectState;
                stateValue.current = selectState;
                if (!isEqual) {
                    /* 更新 */
                    // @ts-ignore
                    forceUpdate({});
                }
            }
        };

        return state;
    }, [contextValue]);

    useEffect(() => {
        /* 组件挂载——注册 connect */
        const name = subscribe(connectValue);
        return () => {
            /* 组件卸载 —— 解绑 connect */
            unSubscribe(name);
        };
    }, [connectValue]);

    return [stateValue.current, dispatch];
};

export default useConnect;
