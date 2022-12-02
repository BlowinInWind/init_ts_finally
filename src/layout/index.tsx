import React from 'react';
import { Outlet } from 'react-router-dom';

const Index: React.FC = props => {
    return (
        <>
            <div>11111111111</div>
            <div>当前网络不可用</div>
            <Outlet></Outlet>
            <br />1
        </>
    );
};

export default Index;
