import React from 'react'
import './VehicleDetailedResult.css'
import { FaMinus, FaPlus } from 'react-icons/fa'
import { useLocation, useNavigate } from 'react-router-dom';
import useLocalStorage from '../../../lib/LocalStorage';
import { postRequest } from '../../../api';

export const VehicleDetailedResult = () => {
    const [user, setUser] = useLocalStorage('user')

    const navigate = useNavigate();
    const location = useLocation();
    const insurance = location.state?.insurance;
    const sessionID = location.state?.session_id;

    const subscribe_user = async() => {

        // if user is not logged in redirect to login page
        if(!user){
            navigate('/auth/login', {state: {redirect: '/results'}});
        }

        // if user is logged in
        // make api call to subscribe user to insurance
        const response = await postRequest('/vehicles/insurance/register-user/', {session_id: sessionID, insurance_id: insurance?.id, user_id: user?.id});
        console.log(response);
        // if successfull redirect to user dashboard
        // if not successfull show error message
    }
  return (
    <div className='comparision_result_page vehicle'>
        
        <div className='company_information'>
            <div className='company_logo'>
                <img src='https://via.placeholder.com/150' alt='company logo' />
            </div>
            <div className='company_name'>
                <h1>{ insurance?.company?.name }</h1>
                <p><a href={insurance?.company?.website}>{ insurance?.company?.website }</a></p>
                <p><a href={`tell:${insurance?.company?.phone}`}>{ insurance?.company?.phone }</a></p>
                <p>{ insurance?.company?.email }</p>
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
                            <p>Price of insurance is <span className='bold large_text'>: { insurance?.subscription_cost }</span></p>
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
                            <button onClick={subscribe_user}  className='btn-primary'>Subscribe</button>
                        </div>
                    </div>
                </div>
            </div>
            
            <div className='insurance_cards'>
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
                                        <button className='add'><FaPlus /> Remove Feature</button>
                                    </div>
                                </li>
                                <li>
                                    <div className='feature'>
                                        <span>Feature Name</span>
                                        <span>Price</span>
                                    </div>
                                    <div className='feature_description'>
                                        <button className='remove'><FaMinus /> Remove Feature</button>
                                    </div>
                                </li>
                                <li>
                                    <div className='feature'>
                                        <span>Feature Name</span>
                                        <span>Price</span>
                                    </div>
                                    <div className='feature_description'>
                                        <button className='add'><FaPlus /> Remove Feature</button>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}
