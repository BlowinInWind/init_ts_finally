import React, { useMemo } from 'react';
import { useLocation, useHistory, useParams, useRouteMatch } from 'react-router-dom';
import queryString from 'qs';

const useRouter = () => {
    const params = useParams();
    const location = useLocation();
    const history = useHistory();
    const match = useRouteMatch();

    return useMemo(() => {
        return {
            push: history.push,
            replace: history.replace,
            pathname: location.pathname,
            match,
            query: {
                ...queryString.parse(location.search), // Convert string to object
                ...params
            },
            location,
            history
        };
    }, [params, location, history, match]);
};

export default useRouter;
