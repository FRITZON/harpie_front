import React, { useContext, useEffect, useState } from 'react'
import ResultItem from './components/ResultItem'
import './components/Results.css'
import { useLocation, useNavigate } from 'react-router-dom'
import useLocalStorage from '../../lib/LocalStorage'
import { ComparisionContext } from '../../context/ComparisonContext'
import { useTranslation } from 'react-i18next'
import SubscriptionHistory from './components/SubscriptionHistory'


const Results = () => {
    const [insuranceData, setInsuranceData] = useLocalStorage('insurance')
    console.log('Insurance Data:', insuranceData);
    console.log('Insurance Data1', insuranceData?.user_inputs);
    const [comparisonData, setComparisonData] = useContext(ComparisionContext)

    const { t } = useTranslation()

    const navigate = useNavigate();
    const location = useLocation();
    const insurance = location.state?.result;
    console.log('Insurance:', insurance);
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
        <SubscriptionHistory/>
        <div>
    
    <div className='insurance_results'>
        {/* Vérifiez si subscription_information existe */}
        {insurance?.user_inputs?.subscription_information && (
            <div className='insurance_item'>
                <h3>Driver Name: {insurance.user_inputs.subscription_information.driver_name}</h3>
                <h3>Insured Name: {insurance.user_inputs.subscription_information.insured_name}</h3>
                <h3>Vehicle Year: {insurance.user_inputs.subscription_information.vehicle_year}</h3>
                {/* Ajoutez d'autres propriétés si nécessaire */}
            </div>
        )}
    </div>
</div>
       

            <h2>{ t("results.title") }</h2>
            <p>{t('results.paragraph1')} {insurance?.vignettes && <span className='bold'>{t('results.paragraph2')}</span>} </p>
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