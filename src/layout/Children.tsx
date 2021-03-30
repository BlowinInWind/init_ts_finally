/** @format */

import React, {
    lazy,
    Suspense,
    useState,
    useMemo,
    memo,
    useCallback
} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { increment, addCount } from '@src/store/counter';
import { RootState } from '@src/store';
import Demo from './Demo';

const Demo1 = lazy(() => import('./Demo'));

// const Child1 = ;

const Child: React.FC<{ children?: any; config: any; onclick: any }> = memo(
    ({ config, onclick }) => {
        // console.log('render');
        // eslint-disable-next-line jsx-a11y/control-has-associated-label
        return (
            <button onClick={onclick} style={{ color: config.color }}>
                {config.text}
            </button>
        );
    }
);

// eslint-disable-next-line react/no-multi-comp
const Index: React.FC = () => {
    const [flag, setFlag] = useState(false);
    const [count, setCount] = useState(0);
    const [name, setName] = useState('');

    const config = useMemo(
        () => ({
            color: count > 5 ? 'red' : 'blue',
            text: `count is ${count}`
        }),
        [count]
    );

    const onclick = useCallback(() => {
        setCount(c => c + 1);
    }, []);

    const dispatch = useDispatch();
    const counter = useSelector((state: RootState) => {
        return state.counter;
    });

    return (
        <>
            <input
                type="text"
                value={name}
                onChange={e => {
                    setName(e.target.value);
                }}
            />
            <Child onclick={onclick} config={config}></Child>
            {flag && (
                <Suspense fallback={<div>loading.....</div>}>
                    <Demo1></Demo1>
                </Suspense>
            )}
            <button
                onClick={() => {
                    setFlag(true);
                    // dispatch(increment());
                }}
            >
                add
            </button>
            <button
                onClick={() => {
                    dispatch(addCount(10));
                }}
            >
                add by number
            </button>
            test <br />
            {counter}
        </>
    );
};

export default Index;
