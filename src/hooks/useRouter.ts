/*
 * @Author: 姜通
 * @Date: 2021-09-02 22:09:53
 * @LastEditTime: 2021-11-06 12:14:34
 * @Description:
 * @FilePath: /init_ts_finally/src/hooks/useRouter.ts
 */
import { useMemo } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import queryString from 'qs';

const useRouter = () => {
    const params = useParams();
    const location = useLocation();
    const navigate = useNavigate();

    return useMemo(() => {
        return {
            push(path: string) {
                navigate(path, { replace: false });
            },
            replace(path: string) {
                navigate(path, { replace: true });
            },
            pathname: location.pathname,
            query: {
                ...queryString.parse(location.search, {
                    ignoreQueryPrefix: true
                }), // Convert string to object
                ...params
            } as any,
            location
        };
    }, [params, location]);
};

export default useRouter;
