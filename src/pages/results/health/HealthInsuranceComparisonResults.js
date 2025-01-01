import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import './healthInsurance.css'

const HealthInsuanceResults = () => {
    const [healthInsuranceData, setHealthInsuranceData] = useState({})
    const location = useLocation();

    const insurances = location.state?.result?.insurances
    const user_inputs = location.state?.result?.user_inputs;
    const sessionID = location.state?.session_id;

    const [selectedCategory, setSelectedCategory] = useState(user_inputs?.insurance_preferences?.coverage_level || 'Basic');

    const categories = ['Basic', 'Medium', 'Premium']

    const fetch_insurance_pdf = async(sessionID, insurance_id) => {
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

    return (
        <div className='comparison-page'>
            <div className="category-filter">
                {categories.map((category) => (
                    <button
                        key={category}
                        className={`category-btn ${selectedCategory === category ? 'active' : ''}`}
                        onClick={() => setSelectedCategory(category)}
                    >
                        {category}
                    </button>
                ))}
            </div>
            <div className='insurance-list'>
                {insurances && insurances[selectedCategory]?.map((insurance, index) => (
                    <ResultItem 
                        key={insurance?.id} 
                        insurance={insurance} 
                        sessionID={sessionID}
                        user_inputs={user_inputs}
                    />
                ))}
            </div>
        </div>
    )
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
                <div className='bold'>{ user_inputs?.personal_info?.age } Insurance</div>
            </div>
            <div className='insurance_result_card_info'>
                <div> Coverage: <span className='bold'>{ insurance?.plan?.coverage_rate }%</span></div>
                <div>Hospital Typle: <span className='bold'>{ insurance?.plan?.hospital_type }</span></div>
                <div>Connected Hospital : <span className='bold'>{ insurance?.network_hospitals && insurance?.network_hospitals.length }</span></div>
            </div>
            <div className='insurance_result_card_price'>
                <div>Cost: <span className='bold'> { user_inputs?.personal_info?.age === 'child' ? insurance?.plan?.children_annual_premium : insurance?.plan?.adult_annual_premium }</span></div>   
                <div>Duration: 1 Year</div> 
                <div>This insurance has <span className='bold'>{ insurance?.coverage?.garantees && (insurance?.coverage?.garantees).length } Guarantees</span> </div>  
            </div>
            <div className='insurance_result_card_cta'>
                {/* <button onClick={() => fetch_insurance_pdf(sessionID, insurance.id)} >Get a Quote</button> */}
                <button onClick={() => navigate('/health/result', {state: {insurance: insurance, user_inputs:user_inputs, session_id: sessionID}})}>View detail results</button>
            </div>
        </div>
        {/* <div className='insurance_location'>
            <span>Phone: { insurance?.company?.phone }</span>
            <span>Email: { insurance?.company?.email }</span>
        </div> */}

    </div>
  )
}


export default HealthInsuanceResults

