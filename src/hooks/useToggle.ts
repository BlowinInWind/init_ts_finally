import { type } from 'os';
import { useState, useCallback } from 'react';

const useToggle = (initState = false): [boolean, any] => {
    const [state, setState] = useState<boolean>(initState);

    const toggle = useCallback((): void => {
        setState(s => !s);
    }, []);

    return [state, toggle];
};

export default useToggle;
