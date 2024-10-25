import { createContext } from "react";
import useLocalStorage from "../lib/LocalStorage";


export const ComparisionContext = createContext();

export const ComparisionProvider = ({ children }) => {
    const [comparisonData, setComparisonData] = useLocalStorage('comparison', {});
    return (
        <ComparisionContext.Provider value={[comparisonData, setComparisonData]}>
            {children}
        </ComparisionContext.Provider>
    )
}