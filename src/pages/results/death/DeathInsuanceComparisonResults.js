import React, { useEffect, useState } from 'react'
import { FaCheckCircle } from 'react-icons/fa'
import { useLocation, useNavigate } from 'react-router-dom'
import useLocalStorage from '../../../lib/LocalStorage'
import { authenticatedPostRequestWithSession } from '../../../api'

const DeathInsuanceComparisonResults = () => {
    const [healthInsuranceData, setHealthInsuranceData] = useState({})
    const [isLoading, setIsLoading] = useState(false)
    const [currentBuy, setCurrentBuy] = useLocalStorage('current-buy')
    const [user] = useLocalStorage('user')

    const location = useLocation();

    const insurances = location.state?.result?.insurance
    const user_inputs = location.state?.result?.user_inputs;
    const sessionID = location.state?.session_id;

    const navigate = useNavigate()

    const subscribe_to_insurance = async(insurance) => {
              const data = {
                  insurance: insurance.id,
              }
              if(!user){
                  save_user_session(data)
              } 
              setIsLoading(true)
              
              const response = await authenticatedPostRequestWithSession(sessionID, `/death-insurance/comparison/subscribe/`, JSON.stringify(data));
      
              console.log('the response', response)
              if(response.status === 201) {
                  const payment_url = response.data.payment_url
      
                  try {            
                      window.open(payment_url, '_parent', 'noopener,noreferrer');
                  } catch (error) {
                      console.warn('error fetching insurance pdf', error)
                  }
              }
              setIsLoading(false)
          }
      
          const save_user_session = (data) => {
              setCurrentBuy(data)
              navigate('/auth/login', {state: {redirect: true, url: '/checkout'}});
          }
    
  return (
    <div className='comparision_result_page'>
        <div className="page-wrapper">
              <div className="container">
              <h2 className='title '>Initial Deposit: {user_inputs.pricing.initial_deposit} XAF</h2>
                {/* User Selections */}
                <DeathUserSelections selections={user_inputs} />

              { console.log('insurances', insurances) }
        
                {/* Plans Grid */}
                <div className="plans-grid">
                  {insurances.map(plan => (
                    <div key={plan.id} className="plan-card">
                      <div className="plan-content">
                        <div className="plan-header">
                          <div>
                            <h3 className="plan-title">{plan.plan_name}</h3>
                            <p className="company-name">{plan.company.name}</p>
                          </div>
                          <img 
                            src={'https://harpie-app.site' + plan.company.logo} 
                            alt={`${plan.company.name} logo`}
                            className="company-logo"
                            style={{width: '100px', height: 'auto'}} 
                          />
                        </div>
                        
                        <div className="plan-details">
                          <div className="detail-row">
                            <span className="detail-label">Maximum Coverage Age</span>
                            <span className="detail-value">
                              {(plan.maximum_coverage_age)} Years
                            </span>
                          </div>
                          <div className="detail-row">
                            <span className="detail-label">Maximum Entry Age</span>
                            <span className="detail-value">
                              {plan.maximum_entry_age} Years
                            </span>
                          </div>
                          <div className="detail-row">
                            <span className="detail-label">Minimum Entry Age</span>
                            <span className="detail-value">
                              {plan.minimum_entry_age} Years
                            </span>
                          </div>
                          <div className="detail-row">
                            <span className="detail-label">Average Waiting Period</span>
                            <span className="detail-value">
                              {plan.waiting_period} Days
                            </span>
                          </div>
                        </div>
        
                        <div className="plan-actions">
                          <button className="button button-secondary">
                            Get a Quote
                          </button>
                          <button onClick={() => subscribe_to_insurance(plan)} className="button button-primary">
                            Subscribe here
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
    </div>
  )
}

export default DeathInsuanceComparisonResults



const DeathUserSelections = ({ selections }) => {
  const insureeInfo = JSON.parse(selections?.insuree_information?.insuree_information);
  const lifePlans = selections.coverage_details;
  const insurance_purpose = JSON.parse(selections.life_savings_plan.savings_purpose);

  console.log('insureeInfo', selections) 
  return (
    <div className="user-selections">
      <h2>Your Selections</h2>
      <div className="selections-grid">
        <div className="selection-item">
          <h3>Insuree</h3>
          <p>Full Name: {insureeInfo?.user_data?.name}</p>
          <p>Born: {new Date(insureeInfo.user_data.dob).toLocaleDateString()}</p>
          <p>Profession: {insureeInfo.user_data.profession}</p>
        </div>
        <div className="selection-item">
          <h3>Coverage</h3>
          <p>Prefered Payout: { selections?.critical_illness_plan?.payout_preference }</p>
          <p>Accidental Risks: 
            <p className='badge_wrapper'>
              {
                Object.entries(JSON.parse(selections.accidental_death_plan.risk_factors))
                  .filter(([_, value]) => value === true)
                  .map(([key]) => (
                    <span className='selection_badge' key={key}>{(key.charAt(0).toUpperCase() + key.slice(1)).replace('_', ' ')}</span>
                  ))
              }
            </p>
          </p>
        </div>
        <div className="selection-item">
          <h3>Pricing</h3>
            <p>Frequency: {selections.pricing.payment_frequency}</p>
            <p>Initial Deposit: {selections.pricing.initial_deposit} XAF</p>
        </div>
        <div className="selection-item">
          <h3>Insurance Plan</h3>
          <p>Insurance Type: {selections.life_savings_plan.investment_style}</p>
          <p>Saving Purpose: 

          <p className='badge_wrapper'>
          {
            Object.entries(JSON.parse(selections.life_savings_plan.savings_purpose))
              .filter(([_, value]) => value === true)
              .map(([key]) => (
                <span className='selection_badge' key={key}>{key.charAt(0).toUpperCase() + key.slice(1)}</span>
              ))
          }
          </p>
           {/* display keys of the object */}
            {/* {selections.life_savings_plan.savings_purpose}  */}
          </p>
        </div>
      </div>
    </div>
  );
}