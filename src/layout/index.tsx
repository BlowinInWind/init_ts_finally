/*
 * @Author: 姜通
 * @Date: 2021-07-20 19:58:01
 * @LastEditTime: 2021-11-06 14:36:11
 * @Description:
 * @FilePath: /init_ts_finally/src/layout/index.tsx
 */
/** @format */

import React from 'react';
import { Outlet } from 'react-router-dom';

const Index: React.FC = props => {
    return (
        <>
            <Outlet></Outlet>
            <br />1
        </>
    );
};

export default Index;
