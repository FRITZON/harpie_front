import React from 'react'
import Image from '../../../assets/img/brands/brand_img01.png'

const ResultItem = ({ insurance }) => {
  return (
    <div className='insurance_result_card'>
        <div className='insurance_result_card_flex'>
            <div className='insurance_result_card_logo'>
                <img src={Image} alt={insurance.name} />
            </div>
            <div className='insurance_result_card_info'>
                <div>{ insurance?.offers?.free_services[0] }</div>
                <div>{ insurance?.offers?.free_services[1] }</div>
            </div>
            <div className='insurance_result_card_info'>
                <div>{ insurance?.offers?.other_services[0] }</div>
                <div>{ insurance?.offers?.other_services[1] }</div>
            </div>
            <div className='insurance_result_card_price'>
                <div>{ insurance.price } { insurance.currency } / year</div>   
            </div>
            <div className='insurance_result_card_cta'>
                <button>Get a Quote</button>
                <button>View detail results</button>
            </div>
        </div>
        <div className='insurance_location'>
            <span>{ insurance.email }</span>
            <span>{ insurance.address }</span>
        </div>

    </div>
  )
}

export default ResultItem