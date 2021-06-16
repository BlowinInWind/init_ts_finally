import { useState } from 'react';

const useLocalStorage = <T>(
    key: string,
    initialValue?: T
): [T, (value: T | ((val: T) => T)) => void] => {
    const [storedValue, setStoreValue] = useState<T>(() => {
        try {
            const item = window.localStorage.getItem(key);
            const fItem = typeof item === 'object' ? JSON.parse(item) : item;

            return fItem || initialValue;
        } catch (error) {
            // console.log(error);
            return initialValue;
        }
    });

    const setValue = (value: T | ((val: T) => T)) => {
        try {
            const valueToStore =
                value instanceof Function ? value(storedValue) : value;
            setStoreValue(valueToStore);
            window.localStorage.setItem(key, JSON.stringify(valueToStore));
        } catch (error) {
            // todo
        }
    };

    return [storedValue, setValue];
};

export default useLocalStorage;
