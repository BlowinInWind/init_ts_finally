/* eslint-disable react/no-multi-comp */
/** @format */

import React, { useEffect, useState, useRef } from 'react';
import './common/assets/styles/index.scss';

const Component1 = () => {
    return <div>Component1</div>;
};

const Component2 = () => {
    return <div>Component2</div>;
};

const ParentChild = ({ children, current }) => {
    return React.Children.map(children, item => {
        return React.cloneElement(item, { current });
    });
};

const Child = props => {
    const [visited, setVisited] = useState(false);

    useEffect(() => {
        if (props.index === props.current) {
            setVisited(true);
        }
    }, [props.current]);

    return (
        <div
            style={{
                display: props.index === props.current ? 'block' : 'none'
            }}
        >
            {visited && props.children}
        </div>
    );
};

const Index = () => {
    const [index, setIndex] = useState(0);
    return (
        <div>
            <div>
                <button
                    onClick={() => {
                        setIndex(0);
                    }}
                >
                    com1
                </button>
                <button
                    onClick={() => {
                        setIndex(1);
                    }}
                >
                    com2
                </button>
            </div>

            <ParentChild current={index}>
                <Child index={0}>
                    <Component1></Component1>
                </Child>
                <Child index={1}>
                    <Component2></Component2>
                </Child>
            </ParentChild>
        </div>
    );
};

export default Index;
