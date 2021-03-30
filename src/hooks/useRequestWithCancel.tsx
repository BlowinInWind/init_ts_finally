import { useEffect } from 'react';
import axios from 'axios';

const CancelToken = axios.CancelToken;
let cancel: any;

/**  示例
 *    useRequestWithCancel(async c => {
        const res: ResponseInterface<InterfaceAllDictType[]> = await request.dictallType<
            InterfaceAllDictType[]
        >({}, c);

        if (res.code === 200) {
            setRemarks(res.data);
        }
    }, []);
 *
 * {
            cancelToken: new CancelToken(function executor(c) {
                // executor 函数接收一个 cancel 函数作为参数
                cancel = c;
            })
        }
 * 回调传的
 * @param {*} effect
 * @param {*} deps
 */
const useRequestWithCancel = (effect: any, deps: any) => {
    useEffect(() => {
        effect({
            cancelToken: new CancelToken(function executor(c) {
                // executor 函数接收一个 cancel 函数作为参数
                cancel = c;
            })
        });

        return () => {
            // 这里目前写死了 为了判断
            cancel('cancel');
        };
    }, deps);
};

export default useRequestWithCancel;
