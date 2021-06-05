/** @format */

import React from 'react';
import Children from './Children';

const Index: React.FC = props => {
    return (
        <>
            {props.children}
            <br />
            {/* <Children></Children> */}
        </>
    );
};

export default Index;
