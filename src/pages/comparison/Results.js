import React, { useContext, useEffect, useState } from 'react'
import ResultItem from './components/ResultItem'
import './components/Results.css'
import { useLocation, useNavigate } from 'react-router-dom'
import useLocalStorage from '../../lib/LocalStorage'
import { ComparisionContext } from '../../context/ComparisonContext'


const Results = () => {
    const [insuranceData, setInsuranceData] = useLocalStorage('insurance')
    const [comparisonData, setComparisonData] = useContext(ComparisionContext)

    const navigate = useNavigate();
    const location = useLocation();
    const insurance = location.state?.result;
    const sessionID = location.state?.session_id;

    /**
     * Redirect user to login page
     */
    const login_redirect = () => {
        // update insuranceData in local storage
        setInsuranceData(prev => ({...prev, insurance: insurance}))
        navigate('/auth/login', {state: {redirect: '/results'}})
    }

    useEffect(() => {
        if(!insurance){
            navigate('/comparison/start')
        }
        setComparisonData(location.state)

    }, [insurance])
    


    
  return (
    <div className='comparision_result_page'>
        <div className=''>
            <h1>Insurance Results</h1>
            <p>Here are the insurance options available for you. {insurance?.vignettes && <span className='bold'>Note that vignette cost is the same everywhere in your country</span>} </p>
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

export default Results