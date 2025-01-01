import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import './InsuranceDetail.css'
import { ReactComponent as Void } from '../../../../assets/img/void.svg'
import { authenticatedPostRequestWithSession } from '../../../../api'
import useLocalStorage from '../../../../lib/LocalStorage'
import Loader from '../../../../components/loader/Loader';

function LifeInsuranceDetail() {
  const [isLoading, setIsLoading] = useState(false)
  const [currentBuy, setCurrentBuy] = useLocalStorage('current-buy')
  const [user] = useLocalStorage('user')
  const navigate = useNavigate()
  const location = useLocation()
  const { insurance, user_inputs, session_id } = location.state || {}
  const [selectedFeatures, setSelectedFeatures] = useState([])

  const handleAddFeature = (feature) => {
    setSelectedFeatures([...selectedFeatures, feature])
  }

  const calculateTotal = () => {
    const basePrice = parseFloat(user_inputs?.pricing?.initial_deposit) || 0
    const extraFeaturesTotal = selectedFeatures.reduce((sum, feature) => sum + feature.price, 0)
    return basePrice + extraFeaturesTotal
  }



  const subscribe_to_insurance = async () => {
    const data = {
      insurance: insurance.id,
    }
    if (!user) {
      save_user_session(data)
    }
    setIsLoading(true)

    const response = await authenticatedPostRequestWithSession(session_id, `/life-insurance/comparison/subscribe/`, JSON.stringify(data));

    console.log('the response', response)
    if (response.status === 201) {
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
    navigate('/auth/login', { state: { redirect: true, url: '/checkout' } });
  }


  const extraFeatures = [
    {
      id: 1,
      name: "Critical Illness Coverage",
      description: "Protection against specified critical illnesses",
      price: 9000
    },
    {
      id: 2,
      name: "Disability Protection",
      description: "Coverage for total and permanent disability",
      price: 4500
    },
    {
      id: 3,
      name: "Accidental Death Benefit",
      description: "Additional coverage for accidental death",
      price: 7200
    }
  ]

  if (!insurance) {
    return <div className="error-message">No insurance details available</div>
  }

  return (
    <div className="insurance-detail-container">
      {/* Company Header */}
      <div className="company-header">
        <img
          src={'https://harpie-app.site' + insurance.company.logo}
          alt={`${insurance.company.name} logo`}
          className="company-logo"
        />
        <h1 className="company-name">{insurance.company.name}</h1>
      </div>

      <div className="detail-grid">
        {/* Insurance Guarantees */}
        <div className="detail-card">
          <h2 className="card-title">Insurance Guarantees</h2>

          <div className="coverage-info">
            <div className="coverage-type">
              <p className="label">Coverage Type:</p>
              <p className="value">{insurance.category.name}</p>
              <p className="description">{insurance.plan_name}</p>
            </div>

            <div className="pricing">
              <div className="base-price">
                <p className="label">Insurance Price:</p>
                <p className="price-value">
                  {Number(user_inputs?.pricing?.initial_deposit).toLocaleString()} XAF
                  {console.log(user_inputs)}
                </p>
              </div>

              <div className="total-price">
                <p className="total-label">Total:</p>
                <p className="total-value">{calculateTotal().toLocaleString()} XAF</p>
              </div>
            </div>
          </div>

          <div className="features-section">
            <h3 className="features-title">Features</h3>
            <div className="features-list">
              <div className="feature-item">
                <span>Coverage Range</span>
                <span>
                  {Number(insurance.minimum_coverage).toLocaleString()} - {Number(insurance.maximum_coverage).toLocaleString()} XAF
                </span>
              </div>
              <div className="feature-item">
                <span>Term Range</span>
                <span>{insurance.minimum_term} - {insurance.maximum_term} months</span>
              </div>
              <div className="feature-item">
                <span>Entry Age</span>
                <span>{insurance.minimum_entry_age} - {insurance.maximum_entry_age} years</span>
              </div>
              <div className="feature-item">
                <span>Maximum Coverage Age</span>
                <span>{insurance.maximum_coverage_age} years</span>
              </div>
              <div className="feature-item">
                <span>Waiting Period</span>
                <span>{insurance.waiting_period_days} days</span>
              </div>
            </div>
          </div>

          <div className='flex_subscribe_button'>
            <div className='insurance_card_button'>
              <button onClick={() => navigate(-1)} className='btn-backbtn'>Go back</button>
            </div>
            <div className='insurance_card_button submit_insurance'>
              <button onClick={subscribe_to_insurance} className='btn-primary'>Subscribe {isLoading && <span className='icon'><Loader /></span>}</button>
            </div>
          </div>

        </div>

        {/* Extra Features */}
        <div className="detail-card">
          <h2 className="card-title">Extra Features</h2>
          <p className="card-description">
            Optional features you can add to your insurance plan for additional coverage
          </p>

          <div className="extra-features">
            <h3 className="features-title">Features</h3>
            <div className="extra-features-list">
              {/* {extraFeatures.map(feature => (
                <div key={feature.id} className="extra-feature-item">
                  <div className="feature-info">
                    <p className="feature-name">{feature.name}</p>
                    <p className="feature-description">{feature.description}</p>
                    <p className="feature-price">{feature.price.toLocaleString()} XAF</p>
                  </div>
                  {!selectedFeatures.find(f => f.id === feature.id) ? (
                    <button 
                      className="btn-add-feature"
                      onClick={() => handleAddFeature(feature)}
                    >
                      <span className="plus-icon">+</span>
                      Add Feature
                    </button>
                  ) : (
                    <span className="feature-added">Added</span>
                  )}
                </div>
              ))} */}
              <div className='void_svg_wrapper'>
                <Void />
              </div>
              <h1 className='void_title'>No extra features available </h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LifeInsuranceDetail

