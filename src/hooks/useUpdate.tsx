/** @format */

import { useState } from 'react';

const useUpdate = () => {
    const [, setFlag] = useState<number>(0);

    const update = () => {
        setFlag(Date.now());
    };

    return update;
};

export default useUpdate;
