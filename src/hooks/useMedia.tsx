import React, { useState, useEffect } from 'react';

/**
 * const columnCount = useMedia(
    // Media queries
    ["(min-width: 1500px)", "(min-width: 1000px)", "(min-width: 600px)"],
    // Column counts (relates to above media queries by array index)
    [5, 4, 3],
    // Default column count
    2
  );
 *
 * @param {*} queries
 * @param {*} values
 * @param {*} defaultValue
 * @return {*}
 */

// Hook
const useMedia = <T,>(queries: string[], values: T[], defaultValue: T) => {
    const mediaQueryLists = queries.map(q => window.matchMedia(q));

    const getValue = () => {
        const index = mediaQueryLists.findIndex(mql => mql.matches);
        return values?.[index] || defaultValue;
    };

    const [value, setValue] = useState<T>(getValue);

    useEffect(() => {
        const handler = () => setValue(getValue);
        mediaQueryLists.forEach(mql => mql.addListener(handler));
        return () =>
            mediaQueryLists.forEach(mql => mql.removeListener(handler));
    }, []);

    return value;
};

export default useMedia;
