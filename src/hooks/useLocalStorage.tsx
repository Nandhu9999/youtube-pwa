import { useEffect, useState } from "react";

function getSavedValue<T>(key: string, initialValue: T | (() => T)): T {
    try {
        const savedValue = localStorage.getItem(key);
        if (savedValue) return JSON.parse(savedValue);
    } catch (error) {
        console.error(
            `Error parsing JSON from localStorage for key "${key}":`,
            error
        );
    }

    if (initialValue instanceof Function) return (initialValue as () => T)();
    return initialValue;
}

export default function useLocalStorage<T>(
    key: string,
    initialValue: T | (() => T)
): [T, React.Dispatch<React.SetStateAction<T>>] {
    const [value, setValue] = useState<T>(() => {
        return getSavedValue(key, initialValue);
    });

    useEffect(() => {
        try {
            localStorage.setItem(key, JSON.stringify(value));
        } catch (error) {
            console.error(`Error saving to localStorage for key "${key}":`, error);
        }
    }, [key, value]);

    return [value, setValue];
}
