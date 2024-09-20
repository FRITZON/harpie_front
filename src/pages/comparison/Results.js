import React, { useState } from 'react'
import ResultItem from './components/ResultItem'
import './components/Results.css'
import { useLocation, useNavigate } from 'react-router-dom'
import useLocalStorage from '../../lib/LocalStorage'


const Results = () => {
    const [insuranceData, setInsuranceData] = useLocalStorage('insurance')

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

  return (
    <div className='comparision_result_page'>
        <div className=''>

            <div className='insurance_results'>
                {
                insurance?.insurance_options.length > 0 && insurance?.insurance_options.map((insurance) => (
                    <ResultItem sessionID={sessionID} handle_login_redirect={login_redirect} key={insurance?.id} insurance={insurance} />
                ))}
            </div>
        </div>
    </div>
  )
}

export default Results