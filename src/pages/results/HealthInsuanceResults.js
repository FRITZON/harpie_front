import React, { useState } from 'react'
import Image from '../../assets/img/brands/brand_img01.png'
import { FaCheckCircle } from 'react-icons/fa'
import './healthInsurance.css'
import { useLocation } from 'react-router-dom'

const HealthInsuanceResults = () => {
    const [healthInsuranceData, setHealthInsuranceData] = useState({})
    const location = useLocation();

    const insurances = location.state?.result?.insurances;
    const user_inputs = location.state?.result?.user_inputs;

    const [selectedCategory, setSelectedCategory] = useState(user_inputs?.insurance_preferences?.coverage_level || 'Basic');



  const categories = ['Basic', 'Medium', 'Premium']


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
                    <ResultItem key={insurance?.id} insurance={insurance} user_inputs={insurances?.user_inputs} />
                ))}
            </div>
        </div>
    </div>
  )
}

export default HealthInsuanceResults



const ResultItem = ({ insurance, user_inputs }) => {
  return (
    <div className='insurance_result_card'>
        <div className='insurance_result_card_flex'>
            <div className='insurance_result_card_logo'>
                <img src={Image} alt={insurance?.company.name} />
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
            </div>
            <div className='insurance_result_card_cta'>
                <button>Get a Quote</button>
                <button>View detail results</button>
            </div>
        </div>
        <div className='insurance_location'>
            <span>Phone: { insurance?.company?.phone }</span>
            <span>Email: { insurance?.company?.email }</span>
        </div>

    </div>
  )
}


// const HealthInsuanceResultsDetails = () => {
//     const [healthInsuranceData, setHealthInsuranceData] = useState({})
//     const location = useLocation();

//     const insurance = location.state?.result;

//     console.log('your results..............', insurance)

//     const formatKey = (key) => {
//         return key.replace(/_/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase());
//       };

//   return (
//     <div className='health_insurace_results'>
//         <div className='health_ins_container'>
//             <h2>Health Insurance</h2>
//             <div className='flex_section'>
//                 <div className='left_section'>
//                     <div className='wrapper'>
//                         <p className='premium_name'>Premium Price</p>
//                         <p>{ insurance?.insurance_options?.annual_premium }</p>
//                     </div>
//                     <div className='wrapper'>
//                         <p className='premium_name'>Annual Ceiling</p>
//                         <p>{ insurance?.insurance_options?.annual_ceiling }</p>
//                     </div>
//                 </div>
//                 <div className='right_section'>
//                     <div className='btn buy_btn'>Purchase Insurance</div>
//                 </div>
//             </div>

//             <div className='flex_health_main'>
//                 <div className='covered_services'>
//                     {
//                         insurance?.insurance_options?.covered_services && Object.entries(insurance?.insurance_options?.covered_services).map(([key, value]) => (
//                             <li className="insurance_list_partial_results">
//                                 <FaCheckCircle className="text-green-500 mr-2" />
//                                 <span className="font-medium">{formatKey(key)}:</span>
//                                 <span className="ml-2">{formatKey( value.toString() )}</span>
//                             </li>

//                         ))
//                     }
//                 </div>
//                 <div className='coverage_percentage'>
//                     <h1>{ insurance?.insurance_options?.coverage_percentage } % Coverage</h1>
//                 </div>
//             </div>

//         </div>
        
//     </div>
//   )
// }