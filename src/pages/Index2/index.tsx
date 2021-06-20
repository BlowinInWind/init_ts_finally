/** @format */

import React, { useRef, useEffect, useState, useMemo } from 'react';
import './common/assets/styles/index.scss';
import useOnScreen from '@hooks/useOnScreen';
import useDebounce from '@hooks/useDebounce';
import LazyLoading from './LazyLoading';
import asyncCom from '../../routes/asyncCom';

const ComponentA = asyncCom(
    React.lazy(() => import('./components/ComponentA'))
);
const ComponentB = asyncCom(
    React.lazy(() => import('./components/ComponentB'))
);
const ComponentC = asyncCom(
    React.lazy(() => import('./components/ComponentC'))
);
const ComponentD = asyncCom(
    React.lazy(() => import('./components/ComponentD'))
);
const ComponentE = asyncCom(
    React.lazy(() => import('./components/ComponentE'))
);
const ComponentF = asyncCom(
    React.lazy(() => import('./components/ComponentF'))
);
const ComponentG = asyncCom(
    React.lazy(() => import('./components/ComponentG'))
);
const ComponentH = asyncCom(
    React.lazy(() => import('./components/ComponentH'))
);
const ComponentI = asyncCom(
    React.lazy(() => import('./components/ComponentI'))
);
const ComponentK = asyncCom(
    React.lazy(() => import('./components/ComponentK'))
);
const ComponentL = asyncCom(
    React.lazy(() => import('./components/ComponentL'))
);
const ComponentM = asyncCom(
    React.lazy(() => import('./components/ComponentM'))
);

const homeInfo = [
    ComponentA,
    ComponentB,
    ComponentC,
    ComponentD,
    ComponentE,
    ComponentF,
    ComponentG,
    ComponentH,
    ComponentI,
    ComponentK,
    ComponentL,
    ComponentM
];

const splitGroups = (homeList: any[], pageSize: number): any[] => {
    const groupsTemp = [];
    for (let i = 0; i < homeList.length; i += pageSize) {
        groupsTemp.push(homeList.slice(i, i + pageSize));
    }
    return groupsTemp;
};

const Index = () => {
    const loadingRef = useRef();
    const [isIntersecting] = useOnScreen(loadingRef);
    const compGroups = useMemo(() => splitGroups(homeInfo, 3), [homeInfo]);
    const [compList, setCompList] = useState([]); // 渲染的组件数据
    const groupCount = compGroups.length;
    const [groupIdx, setGroupIdx] = useState(0);

    useEffect(() => {
        if (isIntersecting && groupIdx < groupCount) {
            setCompList(compList.concat(compGroups[groupIdx]));
            setGroupIdx(groupIdx + 1);
        }
    }, [isIntersecting]);

    const { run: scrollRenderHandler } = useDebounce(
        () => {
            if (isIntersecting && groupIdx < groupCount) {
                setCompList(compList.concat(compGroups[groupIdx]));
                setGroupIdx(groupIdx + 1);
            }
        },
        300,
        [compGroups, compList, groupIdx, isIntersecting]
    );

    useEffect(() => {
        document.addEventListener('scroll', scrollRenderHandler);
        return (): void => {
            document.removeEventListener('scroll', scrollRenderHandler);
        };
    }, [scrollRenderHandler]);

    return (
        <div>
            <div>
                {compList.map((Item, index) => (
                    <div key={index} className="home-floor">
                        <Item></Item>
                    </div>
                ))}
            </div>

            <div
                ref={loadingRef}
                className="loading"
                style={{ height: 20, background: 'green' }}
            ></div>
        </div>
    );
};

export default Index;
