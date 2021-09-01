/** @format */

import { useEffect, useRef, useState } from 'react';

export default <T>(initialValue: string | ((val: T) => T)) => {
    const [state, setState] = useState<string | ((val: T) => T)>(initialValue);
    const stateRef = useRef(state);

    useEffect(() => {
        stateRef.current = state;
    }, [state]);

    return [state, stateRef, setState];
};
