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

        // ?????? 3D Transform?????? fixed ?????????????????????????????????
        // ???????????????????????? fixed?????????????????????????????????????????????????????????
        const styles: React.CSSProperties = {
            position: 'fixed',
            transformOrigin: 'left bottom',
            transform: 'translate(0px, 0px) scale(1)',
            // transform: 'translateZ(0)',
            ...(style || {})
        };

        // ?????? VisualViewport API ?????????????????????
        if (visualViewport != null) {
            // ???????????? iOS ?????????????????????????????????????????????
            styles.left = `${Math.max(
                0,
                Math.min(
                    document.documentElement.scrollWidth - visualViewport.width,
                    visualViewport.offsetLeft
                )
            )}px`;

            // ???????????? iOS ?????????????????????????????????????????????
            styles.top = `${visualViewport.height + 48}px`;

            styles.width = `${visualViewport.width}px`;
            // styles.height = `${visualViewport.height}px`;
        } else {
            // ????????? VisualViewport API ??????????????? iOS 8~12???
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
