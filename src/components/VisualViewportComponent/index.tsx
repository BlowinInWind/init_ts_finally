import React, { useState, useEffect } from 'react';

interface VisualViewportComponentProps {
    className?: string;
    style?: React.CSSProperties;
}

interface VisualViewportComponentState {
    visualViewport: VisualViewport | null;
    windowInnerWidth: number;
    windowInnerHeight: number;
}

const viewport = window.visualViewport;

const VisualViewportComponent: React.FC<VisualViewportComponentProps> = ({
    className,
    style,
    children
}) => {
    const [state, setState] = useState<VisualViewportComponentState>({
        visualViewport: null,
        windowInnerWidth: window.innerWidth,
        windowInnerHeight: window.innerHeight
    });

    const onVisualViewportChange = (e: Event) => {
        setState({
            ...state,
            visualViewport: window.visualViewport
        });
    };

    const onResize = () => {
        setState({
            ...state,
            windowInnerWidth: window.innerWidth,
            windowInnerHeight: window.innerHeight
        });
    };

    useEffect(() => {
        if (typeof window.visualViewport !== 'undefined') {
            window.visualViewport.addEventListener(
                'resize',
                onVisualViewportChange
            );
            window.visualViewport.addEventListener(
                'scroll',
                onVisualViewportChange
            );
        }
        window.addEventListener('resize', onResize);
        return () => {
            if (typeof window.visualViewport !== 'undefined') {
                window.visualViewport.removeEventListener(
                    'resize',
                    onVisualViewportChange
                );
                window.visualViewport.removeEventListener(
                    'scroll',
                    onVisualViewportChange
                );
            }
            window.removeEventListener('resize', onResize);
        };
    }, []);

    const getStyles = (): React.CSSProperties => {
        const { visualViewport, windowInnerWidth, windowInnerHeight } = state;

        // 开启 3D Transform，让 fixed 的子元素相对于容器定位
        // 同时自身也设置为 fixed，以便在非放大情况下不需要频繁移动位置
        const styles: React.CSSProperties = {
            position: 'fixed',
            transformOrigin: 'left bottom',
            transform: 'translate(0px, 0px) scale(1)',
            // transform: 'translateZ(0)',
            ...(style || {})
        };

        // 支持 VisualViewport API 情况下直接计算
        if (visualViewport != null) {
            console.log(visualViewport.height + 48);
            // 需要针对 iOS 越界弹性滚动的情况进行边界检查
            styles.left = `${Math.max(
                0,
                Math.min(
                    document.documentElement.scrollWidth - visualViewport.width,
                    visualViewport.offsetLeft
                )
            )}px`;

            // 需要针对 iOS 越界弹性滚动的情况进行边界检查
            styles.top = `${visualViewport.height + 48}px`;

            styles.width = `${visualViewport.width}px`;
            // styles.height = `${visualViewport.height}px`;
        } else {
            // 不支持 VisualViewport API 情况下（如 iOS 8~12）
            styles.top = '0';
            styles.left = '0';
            styles.width = `${windowInnerWidth}px`;
            // styles.height = `${windowInnerHeight}px`;
        }

        return styles;
    };

    return (
        <div
            className={`visual-viewport ${className || ''}`}
            style={getStyles()}
        >
            <span>{getStyles().top}</span>
            {children}
        </div>
    );
};

export default VisualViewportComponent;
