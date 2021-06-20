import React, { useState, useEffect, useRef } from 'react';
import 'intersection-observer'; // 兼容处理
import './index.scss';

export default function LazyLoading(props) {
    const [current, setCurrent] = useState<number>(0);
    const [cls, setCls] = useState<string>('lazy-loading');

    const IO = useRef<IntersectionObserver>();
    const prvDom = useRef<Element>();

    useEffect(() => {
        // 创建监听器
        IO.current = new IntersectionObserver(
            (e: IntersectionObserverEntry[]) => {
                if (e[e.length - 1].isIntersecting) {
                    setCurrent(v => v + 1);
                }
            },
            { rootMargin: '500px 0px 0px 0px' }
        );
        // 修改组件className
        const { className } = props;
        !!className && setCls(`lazy-loading ${className}`);
    }, []);

    useEffect(() => {
        // 监听目标元素，解除对前一元素的监听
        const target = document.querySelector(
            `.lazy-loading-child-${current}`
        ) as HTMLElement;
        if (target) IO.current.observe(target);
        if (prvDom.current) IO.current.unobserve(prvDom.current);
        prvDom.current = target;
        if (target && target.getBoundingClientRect().top < 0)
            // setTimeout(() => {
            setCurrent(current + 1);
        //     window.console.log('timeout');
        // }, 500);
    }, [current]);

    // 页面卸载时，停止监听器并清空ref
    useEffect(
        () => () => {
            IO.current.disconnect();
            IO.current = null;
            prvDom.current = null;
        },
        []
    );

    return (
        <div className={cls}>
            <div
                // key={`wait_loading_${index}`}
                className="wait-loding"
                style={{ height: '400px', fontSize: '5px' }}
            >
                <h1 data-content="待加载···">待加载···</h1>
            </div>
            {React.Children.map(
                props.children.slice(0, current + 1),
                (child, index) => (
                    <div className={`lazy-loading-child-${index}`}>{child}</div>
                )
            )}
            {props.children.slice(current + 1).map((_, index) => (
                <div
                    key={`wait_loading_${index}`}
                    className="wait-loding"
                    style={{ height: '400px', fontSize: '5px' }}
                >
                    <h1 data-content="loading">loading</h1>
                </div>
            ))}
        </div>
    );
}
