import React, { createContext } from 'react'
import useLocalStorage from '../lib/LocalStorage';

export const UserContext = createContext()


/**
 * A component that provides the UserContext.Provider component
 * @param { JSX } param0 The children of the component
 * @returns It returns the UserContext.Provider component
 */
export const UserContextProvider= ({ children }) => {
    const [user, setUser] = useLocalStorage('user', {});
    
    return (
        <UserContext.Provider value={[user, setUser]}>
            {children}
        </UserContext.Provider>
    )
}