/** @format */

import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

const Index: React.FC = props => {
    const history = useHistory();

    useEffect(() => {
        // const unlisten = history.listen(route => {
        //     console.log(route);
        //     // location是location对象
        //     // action是动作名称，比如 "PUSH"
        // });

        history.push('/aa');
    }, []);

    return (
        <>
            {props.children}
            <br />

            {/* <Children></Children> */}
        </>
    );
};

export default Index;
