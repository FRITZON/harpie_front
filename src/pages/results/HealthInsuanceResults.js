import React, { useEffect, useState } from 'react'
import Image from '../../assets/img/brands/brand_img01.png'
import { FaCheckCircle } from 'react-icons/fa'
import './healthInsurance.css'
import { useLocation, useNavigate } from 'react-router-dom'
import { getRequestWithSession } from '../../api'
import { useTranslation } from 'react-i18next'
import useLocalStorage from '../../lib/LocalStorage'

const HealthInsuanceResults = () => {
    const [healthInsuranceData, setHealthInsuranceData] = useState({})
    const location = useLocation();

    const insurances = location.state?.result?.insurances
    const user_inputs = location.state?.result?.user_inputs;
    const sessionID = location.state?.session_id;

    const [selectedCategory, setSelectedCategory] = useState(user_inputs?.insurance_preferences?.coverage_level || 'Basic');

    const categories = ['Basic', 'Medium', 'Premium']

    const { t } = useTranslation()


  return (
    <div className='comparision_result_page'>
        <div className="category-filter">
        {categories.map((category) => (
          <button
            key={category}
            className={`category-button ${selectedCategory === category ? 'active' : ''}`}
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>
        <div className=''>
            <div className='insurance_results'>
                {insurances && insurances[selectedCategory]?.map((insurance, index) => (
                    <ResultItem sessionID={sessionID} key={insurance?.id} insurance={insurance} user_inputs={insurances?.user_inputs} />
                ))}
            </div>
        </div>
    </div>
  )
}

export default HealthInsuanceResults


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
    
        const baseUrl = 'http://localhost:8000/api/v1';
        const endpoint = `/health/insurance/download/${sessionID}/${insurance_id}/`;
        const fullUrl = `${baseUrl}${endpoint}`;
        
        window.open(fullUrl, '_blank', 'noopener,noreferrer');
    } catch (error) {
        console.warn('error fetching insurance pdf', error)
    }
}

const ResultItem = ({ insurance, user_inputs, sessionID }) => {
    const navigate = useNavigate();
    const [user, setUser] = useLocalStorage('user')
    const { t } = useTranslation()
    const load_image =() => {
        return insurance?.company?.logo && 'https://harpie-app.site' + insurance?.company?.logo.replace('media', 'static')
    }

    const handle_view_detail_results = () => {
        navigate('/health/result', {state: {insurance: insurance, session_id: sessionID}})
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
                <div className='bold'>{ user_inputs?.personal_info?.age } { t('partial_result.health.insurance') }</div>
            </div>
            <div className='insurance_result_card_info'>
                <div> { t('partial_result.health.coverage') }: <span className='bold'>{ insurance?.plan?.coverage_rate }%</span></div>
                <div> { t('partial_result.health.hospital_type') }: <span className='bold'>{ insurance?.plan?.hospital_type }</span></div>
                <div> { t('partial_result.health.network_hospitals') } : <span className='bold'>{ insurance?.network_hospitals && insurance?.network_hospitals.length }</span></div>
            </div>
            <div className='insurance_result_card_price'>
                <div>{ t('partial_result.health.cost')}: <span className='bold'> { user_inputs?.personal_info?.age === 'child' ? insurance?.plan?.children_annual_premium : insurance?.plan?.adult_annual_premium }</span></div>   
                <div>{ t('partial_result.health.duration')}: 1 Year</div> 
                <div>{ t('partial_result.health.this_insurance_has') } <span className='bold'>{ insurance?.coverage?.garantees && (insurance?.coverage?.garantees).length } { t('partial_result.health.guarantees_count_text') }</span> </div>  
            </div>
            <div className='insurance_result_card_cta'>
                {/* <button onClick={() => fetch_insurance_pdf(sessionID, insurance.id)} >{ t('partial_result.health.get_quote') }</button> */}
                <button onClick={handle_view_detail_results}>{ t('partial_result.health.view_detail_results') }</button>
            </div>
        </div>
        {/* <div className='insurance_location'>
            <span>Phone: { insurance?.company?.phone }</span>
            <span>Email: { insurance?.company?.email }</span>
        </div> */}

    </div>
  )
}

