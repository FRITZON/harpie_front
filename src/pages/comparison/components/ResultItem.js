import React from 'react'
import Image from '../../../assets/img/brands/brand_img01.png'

const ResultItem = ({ insurance }) => {
  return (
    <div className='insurance_result_card'>
        <div className='insurance_result_card_flex'>
            <div className='insurance_result_card_logo'>
                <img src={Image} alt={insurance?.company.name} />
            </div>
            <div className='insurance_result_card_info'>
                <div>{ insurance?.company.name }</div>
                <div>{ insurance?.coverage_type }</div>
            </div>
            <div className='insurance_result_card_info'>
                <div>{ insurance?.vehicle?.make } { insurance?.vehicle?.model }</div>
                <div>Model: { insurance?.vehicle?.year }</div>
            </div>
            <div className='insurance_result_card_price'>
                <div>Cost: { insurance?.subscription_cost }</div>   
                <div>Duration: { insurance?.policy_duration }</div>   
            </div>
            <div className='insurance_result_card_cta'>
                <button>Get a Quote</button>
                <button>View detail results</button>
            </div>
        </div>
        <div className='insurance_location'>
            <span>Subscription: { insurance?.subscription_type }</span>
            <span>Since: { new Date(insurance.start_date).toDateString() }</span>
        </div>

    </div>
  )
}

export default ResultItem