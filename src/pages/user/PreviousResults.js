import React, { useContext } from 'react'
import { ComparisionContext } from '../../context/ComparisonContext'
import ResultItem from '../comparison/components/ResultItem'

const PreviousResults = () => {
    const [comparisonData, setComparisonData] = useContext(ComparisionContext)
    console.log(comparisonData)
    const insurance = comparisonData?.result;
    const sessionID = comparisonData?.session_id;

    const login_redirect = () => {
        return true
    }
  return (
    <div className='comparision_result_page'>
        <div className=''>
            <h1>Insurance Results</h1>
            <br />
            <div className='insurance_results'>
                {
                insurance?.insurance_options && insurance?.insurance_options.length > 0 && insurance?.insurance_options.map((ins) => (
                    <ResultItem sessionID={sessionID} vignette={insurance?.vignettes} handle_login_redirect={login_redirect} key={ins?.id} insurance={ins} />
                ))}
            </div>
        </div>
    </div>
  )
}

export default PreviousResults