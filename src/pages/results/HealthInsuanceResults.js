import React, { useState } from 'react'
import { FaCheckCircle } from 'react-icons/fa'
import './healthInsurance.css'
import { useLocation } from 'react-router-dom'

const HealthInsuanceResults = () => {
    const [healthInsuranceData, setHealthInsuranceData] = useState({})
    const location = useLocation();

    const insurance = location.state?.result;

    const formatKey = (key) => {
        return key.replace(/_/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase());
      };

  return (
    <div className='health_insurace_results'>
        <div className='health_ins_container'>
            <h2>Health Insurance</h2>
            <div className='flex_section'>
                <div className='left_section'>
                    <div className='wrapper'>
                        <p className='premium_name'>Premium Price</p>
                        <p>{ insurance?.insurance_options?.annual_premium }</p>
                    </div>
                    <div className='wrapper'>
                        <p className='premium_name'>Annual Ceiling</p>
                        <p>{ insurance?.insurance_options?.annual_ceiling }</p>
                    </div>
                </div>
                <div className='right_section'>
                    <div className='btn buy_btn'>Purchase Insurance</div>
                </div>
            </div>

            <div className='flex_health_main'>
                <div className='covered_services'>
                    {
                        insurance?.insurance_options?.covered_services && Object.entries(insurance?.insurance_options?.covered_services).map(([key, value]) => (
                            <li className="insurance_list_partial_results">
                                { console.log('price', insurance) }
                                <FaCheckCircle className="text-green-500 mr-2" />
                                <span className="font-medium">{formatKey(key)}:</span>
                                <span className="ml-2">{formatKey( value.toString() )}</span>
                            </li>

                        ))
                    }
                </div>
                <div className='coverage_percentage'>
                    <h1>{ insurance?.insurance_options?.coverage_percentage } % Coverage</h1>
                </div>
            </div>

        </div>
        
    </div>
  )
}

export default HealthInsuanceResults