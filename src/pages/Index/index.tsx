import React, { useState } from 'react';

export default () => {
    const [state, setstate] = useState(0);

    return <div>{state}</div>;
};
