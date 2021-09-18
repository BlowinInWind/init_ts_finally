import React, { useState } from 'react';
import { useParams } from 'react-router';

export default () => {
    const [state, setstate] = useState(0);
    const params = useParams();

    return (
        <div>
            {state}
            <div>
                <button
                    onClick={() => {
                        setstate(state + 1);
                    }}
                >
                    button
                </button>
            </div>
        </div>
    );
};
