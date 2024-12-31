import React, { useEffect, useState } from 'react'
import Image from '../../assets/img/brands/brand_img01.png'
import { FaCheckCircle } from 'react-icons/fa'
import './healthInsurance.css'
import { useLocation, useNavigate } from 'react-router-dom'
import { getRequestWithSession } from '../../api'
import { formatMoney } from '../..'
import InsuranceComparison from './LifeTestTwo'

const LifeInsuanceResults = () => {
    const [healthInsuranceData, setHealthInsuranceData] = useState({})
    const location = useLocation();

    const insurances = location.state?.result?.insurance
    const user_inputs = location.state?.result?.user_inputs;
    const sessionID = location.state?.session_id;

  return (
    <div className='comparision_result_page'>
        {console.log('insurances', insurances)}
        <InsuranceComparison plans={insurances} user_inputs={user_inputs} sessionID={sessionID} />
        {/* <div className=''>
            <div className='insurance_results'>
                
                {insurances && insurances?.map((insurance, index) => (
                    <ResultItem sessionID={sessionID} key={insurance?.id} insurance={insurance} user_inputs={user_inputs} />
                ))}
            </div>
        </div> */}
    </div>
  )
}

export default LifeInsuanceResults


/**
 * this function fetches the insurance policy pdf file
 * @returns A pdf file of the insurance policy
 */
export const fetch_insurance_pdf = async(sessionID, insurance_id) => {
    
    try {
        if(!sessionID){
            console.info('session id not found')
            return
        }
    
        const baseUrl = 'https://harpie-app.site/api/v1';
        const endpoint = `/health/insurance/download/${sessionID}/${insurance_id}/`;
        const fullUrl = `${baseUrl}${endpoint}`;
        
        window.open(fullUrl, '_blank', 'noopener,noreferrer');
    } catch (error) {
        console.warn('error fetching insurance pdf', error)
    }
}

const ResultItem = ({ insurance, user_inputs, sessionID }) => {
    const navigate = useNavigate();

    const load_image =() => {
        return insurance?.company?.logo && 'https://harpie-app.site' + insurance?.company?.logo.replace('media', 'static')
    }
  return (
    <div className='insurance_result_card'>
        <div className='insurance_result_card_flex'>
            <div className='insurance_result_card_logo'>
                <img src={load_image()} alt={insurance?.company?.name} />
            </div>
            <div className='insurance_result_card_info'>
                <div>{ insurance?.company.name }</div>
                <div>{ insurance?.description }</div>
                <div className='bold'>{ insurance?.category?.name } Insurance</div>
            </div>
            { console.log('user inputs', insurance) }
            <div className='insurance_result_card_info'>
                <div>Minimum Monthly <span className='bold'>{ formatMoney(insurance?.minimum_coverage / 100 ) }</span></div>
                <div>Minimum Monthly: <span className='bold'>{ formatMoney(insurance?.maximum_coverage) }</span></div>
            </div>
            <div className='insurance_result_card_price'>
                <div>Deposit: <span className='bold'> { user_inputs?.pricing?.coverage_amount }</span></div>   
                <div>Duration: { ("" + user_inputs?.coverage_details?.term_length).replace('_', ' ') }</div> 
            </div>
            <div className='insurance_result_card_cta'>
                <button onClick={() => fetch_insurance_pdf(sessionID, insurance.id)} >Get a Quote</button>
                <button onClick={() => navigate('/health/result', {state: {insurance: insurance, session_id: sessionID}})}>View detail results</button>
            </div>
        </div>
        {/* <div className='insurance_location'>
            <span>Phone: { insurance?.company?.phone }</span>
            <span>Email: { insurance?.company?.email }</span>
        </div> */}

    </div>
  )
}

