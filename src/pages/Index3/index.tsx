/** @format */

import React, { useEffect, useState, useRef } from 'react';
import VisualViewportComponent from '@components/VisualViewportComponent';
import './common/assets/styles/index.scss';

const Index = () => {
    const ref = useRef(null);
    const [viewport, setViewport] = useState({
        width: window.innerWidth,
        height: window.innerHeight
    });

    useEffect(() => {
        const handler = () => {
            if (!window.visualViewport) return;
            setViewport({
                width: window.visualViewport.width,
                height: window.visualViewport.height
            });
        };

        window.visualViewport.addEventListener('resize', handler);
        window.visualViewport.addEventListener('scroll', handler);

        return () => {
            window.visualViewport.removeEventListener('resize', handler);
            window.visualViewport.removeEventListener('scroll', handler);
        };
    }, []);

    return (
        <div style={{ height: viewport?.height ?? 0 }}>
            <div>
                <input type="text" />
            </div>
            <div>
                <input type="text" />
            </div>
            <div>
                <input type="text" />
            </div>
            <div>
                <input type="text" />
            </div>
            <div>
                <input type="text" />
            </div>
            <div>
                <input placeholder="吸住" type="text" />
            </div>
            <div>
                <input type="text" />
            </div>
            <p
                ref={ref}
                style={{
                    position: 'fixed',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    background: 'red',
                    height: 44
                }}
            >
                <button>完成{viewport?.height ?? 0}</button>
            </p>
        </div>
    );
};

export default Index;
