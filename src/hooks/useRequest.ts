/**
 *
 * @format
 */

import { useState, useEffect, useCallback, useRef } from 'react';
import axios from 'axios';
import { ResponseInterface } from '@utils/request/BaseRequest';

const CancelToken = axios.CancelToken;
let cancel: any;

interface RequestInterface {
    fun(useData?: any, config?: any): any;
    deps?: Array<any>;
    initRequest?: boolean;
    finishData?(res: ResponseInterface<any>): any;
}

/**
 *
 * data 返回的数据
 * loading
 * requestAction 请求的方法
 * @interface ResInterface
 */
interface ResInterface {
    data?: ResponseInterface<any>;
    loading?: boolean;
    requestAction?(useData?: any, config?: any): any;
}

/**
 *
 *
 * @param {RequestInterface} {
 *     fun, 请求函数
 *     deps = [], 依赖参数，改变时重新请求
 *     initRequest = true, 默认进来就请求,如果希望等数据进来在请求可以使用requestAction
 *     finishData 在不需要返回data的时候可以使用回调finishData
 * }
 * @return {*}  {ResInterface}
 */
export default ({
    fun,
    deps = [],
    initRequest = true,
    finishData
}: RequestInterface): ResInterface => {
    const requestRef = useRef(initRequest);
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    const requestAction = useCallback(
        (useData?: any) => {
            setLoading(true);
            requestRef.current = true;
            return fun(useData, {
                cancelToken: new CancelToken(function executor(c) {
                    // executor 函数接收一个 cancel 函数作为参数
                    cancel = c;
                })
            }).then((res: ResponseInterface<any>) => {
                setLoading(false);
                setData(res);
                if (finishData) {
                    finishData(res);
                }
                return res;
            });
        },
        [...deps]
    );

    useEffect(() => {
        if (requestRef.current) {
            requestAction({});
        }

        return () => {
            // cancel('cancel');
        };
    }, [...deps]);

    return { data, loading, requestAction };
};
