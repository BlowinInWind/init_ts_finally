import React from 'react';

const A = () => {
    return <div className="all">B</div>;
};

export default React.memo(A);
