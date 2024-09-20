import React from 'react'
import './VehicleDetailedResult.css'
import { FaPlus } from 'react-icons/fa'

export const VehicleDetailedResult = () => {
  return (
    <div className='comparision_result_page vehicle'>
        
        <div className='company_information'>
            <div className='company_logo'>
                <img src='https://via.placeholder.com/150' alt='company logo' />
            </div>
            <div className='company_name'>
                <h1>Company Name</h1>
                <p>Description of company with lorem ipsum and some other stuffs</p>
            </div>
        </div>



        <div className='insurance_cards_wrapper'>

            <div className='insurance_cards left'>
                <div className='insurance_card'>
                    <div className='insurance_card_header'>
                        <h2>Insurance Guaranties</h2>
                        <p>Insurance Description</p>
                    </div>
                    <div className='insurance_card_body'>
                        <div className='insurance_card_price'>
                            <h3>Price</h3>
                            <p>Price of insurance</p>
                        </div>
                        <div className='insurance_card_features'>
                            <h3>Features</h3>
                            <ul>
                                <li>
                                    <span>Civil Liability</span>
                                    <span>Unlimited</span>
                                </li>
                                <li>
                                    <span>Legal Defense</span>
                                    <span>1,000,000</span>
                                </li>
                                <li>
                                    <span>Accidental Death</span>
                                    <span>1,000,000</span>
                                </li>
                                <li>
                                    <span>Partial/Total Disability</span>
                                    <span>1,000,000</span>
                                </li>
                                <li>
                                    <span>Medical Pharmaceutical Expenses </span>
                                    <span>500,000</span>
                                </li>
                            </ul>
                        </div>
                        <div className='insurance_card_button'>
                            <button className='btn-primary'>Subscribe</button>
                        </div>
                    </div>
                </div>
            </div>
            
            {/* <div className='insurance_cards'>
                <div className='insurance_card right'>
                    <div className='insurance_card_header'>
                        <h2>Extra Features</h2>
                        <p>Here are some optional Features you can add to insurance to get better coverage</p>
                    </div>
                    <div className='insurance_card_body'>
                        <div className='insurance_card_features'>
                            <h3>Features</h3>
                            <ul>
                                <li>
                                    <div className='feature'>
                                        <span>Feature Name</span>
                                        <span>Price</span>
                                    </div>
                                    <div className='feature_description'>
                                        <button><FaPlus /> Add Feature</button>
                                    </div>
                                </li>
                                <li>
                                    <div className='feature'>
                                        <span>Feature Name</span>
                                        <span>Price</span>
                                    </div>
                                    <div className='feature_description'>
                                        <button><FaPlus /> Add Feature</button>
                                    </div>
                                </li>
                                <li>
                                    <div className='feature'>
                                        <span>Feature Name</span>
                                        <span>Price</span>
                                    </div>
                                    <div className='feature_description'>
                                        <button><FaPlus /> Add Feature</button>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div> */}
        </div>
    </div>
  )
}
