import { useState } from "react";


/**
 * This custom hook is used to store and retrieve data from localStorage
 * @param { String } key The key of the localStorage item
 * @param { Object } initialValue The initial value of the localStorage item
 * @returns It returns an array with the stored value and a function to set the value
 */
function useLocalStorage(key, initialValue) {
        
    const [storedValue, setStoredValue] = useState(() => {
      try {
        const item = window.localStorage.getItem(key);
        return item ? JSON.parse(item) : initialValue;
      } catch (error) {
        console.warn(error);
        return initialValue;
      }
    });
    
    const setValue = (value) => {
      try {
        const valueToStore =
          value instanceof Function ? value(storedValue) : value;
        setStoredValue(valueToStore);
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      } catch (error) {
        console.warn(error);
      }

    };
    
    return [storedValue, setValue];
  }
export default useLocalStorage;