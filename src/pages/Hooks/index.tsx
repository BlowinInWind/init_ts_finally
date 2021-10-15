import React, {
    useRef,
    useState,
    useEffect,
    useMemo,
    useCallback
} from 'react';

const SelfHooks = () => {
    const [state, setState] = useState(0);
    const requestRef = useRef(false);

    const run = () => {
        console.log(state);
    };

    useEffect(() => {
        // if (requestRef.current) {
        run();
        // requestRef.current = false;
        // }
    }, [state]);

    // 主动搜索
    const searchSubmit = useCallback(async (params?) => {
        requestRef.current = true;

        setState(1);
    }, []);

    return {
        submit: searchSubmit
    };
};

export default () => {
    const [state, setState] = useState(0);
    useEffect(() => {
        debugger;
        submit();
    }, []);
    const { submit } = SelfHooks();

    return (
        <div>
            <button
                onClick={() => {
                    setState(v => v + 1);
                }}
            >
                1111
            </button>
        </div>
    );
};
