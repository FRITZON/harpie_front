import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { ReactComponent as Void  } from '../../../../assets/img/void.svg'
import { authenticatedPostRequestWithSession } from '../../../../api'
import useLocalStorage from '../../../../lib/LocalStorage'
import Loader from '../../../../components/loader/Loader';
import './HealthInsuranceDetail.css'
import { formatMoney } from '../../../..'
import { Building2, Mail, MapPin, Phone } from 'lucide-react'
import NetworkedHospitals from './NetworkedHospitals'
import { FaMinus, FaPlus } from 'react-icons/fa'

const HealthInsuranceDetail = () => {
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
  const toggleExtraFeature = (feature) => {
    setSelectedFeatures(prevFeature => {
        const extraIndex = prevFeature.findIndex(e => e.code === feature.code);
        if (extraIndex === -1) {
            return [...prevFeature, feature];
        } else {
            return prevFeature.filter(e => e.code !== feature.code);
        }
    });
}

  const insuree_dob = user_inputs?.personal_info?.insuree_information?.dob
  // if insuree is adult or child adult is 18 and above
  const insure_age_group = (new Date().getFullYear() - new Date(insuree_dob).getFullYear()) >= 18 ? 'Adult' : 'Child'
  const insurance_price = insure_age_group === 'Adult' ? insurance?.coverage?.adult_annual_premium : insurance?.coverage?.children_annual_premium

  const calculateTotal = () => {
    const basePrice = parseFloat(insurance_price) || 0
    const extraFeaturesTotal = selectedFeatures.reduce((sum, feature) => sum + parseFloat(feature.extra_cost), 0)
    return basePrice + extraFeaturesTotal
  }


  console.log('selected features', selectedFeatures)
  const subscribe_to_insurance = async() => {
          
          const data = {
            insurance: insurance?.id,
            age_group: insure_age_group.toLocaleLowerCase(),
            extras: selectedFeatures.map(f => f.code)
          }
          if(!user){
              save_user_session(data)
          } 
          setIsLoading(true)
          const response = await authenticatedPostRequestWithSession(session_id, `/health-insurance/comparison/subscribe/`, JSON.stringify(data));
          if(response.status === 200) {
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

  const generateRandomHue = () => {
    return `hsl(${Math.floor(Math.random() * 360)}, 70%, 60%)`; 
  };


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
          <h4>{ insurance?.coverage?.description }</h4>
          <div className="coverage-info">
            <div className="coverage-type">
              <p className="label">Coverage Type:</p>
              <p className="value">{insurance.description}</p>
            </div>

            <div className="pricing">
              <div className="base-price">
                <p className="label">Insurance Price:</p>
                <p className="price-value">
                  {Number(insurance_price).toLocaleString()} XAF ({insure_age_group})
                  { console.log(user_inputs) }
                </p>
              </div>

              <div className="total-price">
                <p className="total-label">Total:</p>
                <p className="total-value">{calculateTotal().toLocaleString()} XAF</p>
              </div>
            </div>
          </div>

          <div className='extra_features_tags'>
              {selectedFeatures.map((extra, index) => (
                  <div onClick={() => toggleExtraFeature(extra)} key={index} className='feature_tag'>
                      <span>{extra?.name}</span>
                      <span>{ formatMoney(extra?.extra_cost) }</span>
                  </div>
              ))}
          </div>

          <div className="features-section">
            <h3 className="features-title">Features & Their values</h3>
            <div className="features-list">
              {
                insurance.coverage.garantees.map(feature => (
                <div className="feature-item">
                  <span>{ feature?.name }</span>
                  <span>
                    { formatMoney(feature?.value)} XAF
                  </span>
                </div>
                ))
              }
              
            </div>
          </div>


          <div className='flex_subscribe_button'>
              <div className='insurance_card_button'>
                  <button onClick={() => navigate(-1)} className='btn-backbtn'>Go back</button>
              </div>
              <div className='insurance_card_button submit_insurance'>
                  <button onClick={subscribe_to_insurance} className='btn-primary'>Subscribe { isLoading && <span className='icon'><Loader /></span> }</button>
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
              {insurance?.coverage?.extra_offers.map(feature => (
                <div key={feature.code} className="extra-feature-item">
                  <div className="feature-info">
                    <p className="feature-name">{feature?.name} ({feature?.coverage} coverage)</p>
                    <p className="feature-description">{feature.description}</p>
                    <p className="feature-price">{feature.extra_cost.toLocaleString()} XAF</p>
                  </div>
                  
                  <button 
                      className={`btn-add-feature ${selectedFeatures.find(e => e.code === feature.code) ? 'remove' : 'add'}`}
                      onClick={() => toggleExtraFeature(feature)}
                  >
                      {selectedFeatures.some(e => e.code === feature.code) ? 
                          <><FaMinus /> Remove Feature</> : 
                          <><FaPlus /> Add Feature</>
                      }
                  </button>
                </div>
              ))}
              
            </div>
          </div>
        </div>

      </div>
      {/* Insurance Details */}
      <div className="detail-card health_coverage_plans">
        <h1 className='void_title'>These offers are available in your subscription </h1>
            <div className="badges-container">
              <table>
                <thead>
                  <tr>
                    <th>Plan</th>
                    <th>Value</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.keys(insurance?.plan).map((key, index) => {
                    if (insurance?.plan[key] === true) {
                      // return (
                        //   <span
                        //     key={index}
                        //     className={`badge badge-${index}`}
                      //     style={{ backgroundColor: generateRandomHue() }}
                      //   >
                      //     {key.replace(/_/g, ' ').toUpperCase() + " "}
                      //   </span>
                      // );
                      return (
                        <tr key={index}>
                          <td>{key.replace(/_/g, ' ').toUpperCase()}</td>
                          <td>{insurance?.plan[key]}</td>
                        </tr>
                      );
                    }
                    return null;
                  })}
                </tbody>
              </table>
            </div>
        </div>

        {/* Connected Hospitals  */}
        <NetworkedHospitals network_hospitals={insurance?.network_hospitals} />
    </div>
  )
}

export default HealthInsuranceDetail
