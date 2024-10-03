import { useState } from "react";
import Cookies from 'universal-cookie';


/**
 * This is a custom hook to manage cookies in React
 * @param { String } key The key of the cookie item
 * @param { Object } initialValue An initial value for the cookie item
 * @returns It returns an array with the stored value and a function to set the value
 */
function UseCookie(key, initialValue) {
    const cookies = new Cookies();
            
    const [storedValue, setStoredValue] = useState(() => {
    try {
        const item = cookies.get(key)
        return item ? item : initialValue;
    } catch (error) {
        return initialValue;
    }
    });

    const setValue = (value) => {
        try {
            const valueToStore =  value instanceof Function ? value(storedValue) : value;
            setStoredValue(valueToStore);
            cookies.set(key, valueToStore);
        } catch (error) {
            console.warn(error);
        }

    };

    return [storedValue, setValue];
}

export default UseCookie;