import React, { useRef } from 'react';
import ReduxHooksStore from './ReduxHooksStore';

export const ReduxContext = React.createContext(null);

// store
export function useCreateStore(reducer, initState) {
    const ref = useRef(null);

    if (!ref.current) {
        ref.current = new ReduxHooksStore(reducer, initState).exportStore;
    }

    return ref.current;
}
