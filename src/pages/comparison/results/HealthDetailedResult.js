import React, { useState, useEffect } from 'react'
import './VehicleDetailedResult.css'
import { FaMinus, FaPlus } from 'react-icons/fa'
import { useLocation, useNavigate } from 'react-router-dom';
import useLocalStorage from '../../../lib/LocalStorage';
import { postRequest, postRequestWithSession } from '../../../api';
import i18next from 'i18next';
import { findEnglishValue } from '../../..';
import Loader from '../../../components/loader/Loader';

export const HealthDetailedResult = () => {
    const [user] = useLocalStorage('user')
    const [totalCost, setTotalCost] = useState(0)
    const [selectedExtras, setSelectedExtras] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    const [lang, setLang] = useState('fr');

    const navigate = useNavigate();
    const location = useLocation();
    const insurance = location.state?.insurance;
    const sessionID = location.state?.session_id;

    useEffect(() => {
        if (insurance) {
            const extrasTotal = selectedExtras.reduce((total, extra) => total + parseFloat(extra.cost), 0);
            setTotalCost(parseFloat(insurance.subscription_cost) + extrasTotal);
        }
    }, [insurance, selectedExtras])


    useEffect(() => {
        setLang(i18next.language)
    }, [])

    const subscribe_user = async() => {
        setIsLoading(true)
        const data = {
            extras: selectedExtras.map(extra => extra.code),
            total_cost: totalCost
        }
        const response = await postRequestWithSession(sessionID, `/health/comparison/subscribe/${insurance?.id}/`, data);
        if(response.status === 201) {
            const download_url = response.data.download_url

            try {            
                window.open(download_url, '_blank', 'noopener,noreferrer');
            } catch (error) {
                console.warn('error fetching insurance pdf', error)
            }
        }
        setIsLoading(false)
        // if(!user){
        //     navigate('/auth/login', {state: {redirect: '/results'}});
        // } else {
        //     console.warn(response);
        // }
    }


    

    const toggleExtra = (extra) => {
        setSelectedExtras(prevExtras => {
            const extraIndex = prevExtras.findIndex(e => e.code === extra.code);
            if (extraIndex === -1) {
                return [...prevExtras, extra];
            } else {
                return prevExtras.filter(e => e.code !== extra.code);
            }
        });
    }

    function formatMoney(amount) {
        const num = parseFloat(amount);
        return isNaN(num) ? amount : Number(num).toLocaleString('en-US', {
            style: 'decimal',
            maximumFractionDigits: 0,
            minimumFractionDigits: 0,
        });
    }


    const load_image =() => {
        return insurance?.company?.logo && 'https://harpie-app.site' + insurance?.company?.logo.replace('media', 'static')
    }

    return (
        <div className='comparision_result_page vehicle'>
            <div className='company_information'>
                <div className='company_logo'>
                    <img src={ load_image() } alt='company logo' />
                </div>
                <div className='company_name'>
                    <h1>{insurance?.company?.name}</h1>
                    <p>{insurance?.company?.description}</p>
                </div>
            </div>

            <div className='insurance_cards_wrapper'>
                <div className='insurance_cards left'>
                    <div className='insurance_card'>
                        <div className='insurance_card_header'>
                            <h2>Insurance Guarantees</h2>
                            <p>Coverage Type: { insurance?.coverage_type }</p>
                        </div>
                        <div className='insurance_card_body'>
                            <div className='insurance_card_price'>
                                <h3>Price</h3>
                                <p>Total Price: <span className='bold large_text'>{formatMoney(totalCost)}</span></p>
                            </div>
                            <div className='insurance_card_features'>
                                <h3>Features</h3>
                                <ul>
                                    {insurance?.guarantees.map((guarantee, index) => (
                                        <li key={index}>
                                            <span>{guarantee.name}</span>
                                            <span>{guarantee.value}</span>
                                        </li>
                                    ))}
                                    {selectedExtras.map((extra, index) => (
                                        <li key={`extra-${index}`}>
                                            <div>
                                                <span>{extra.name}</span>
                                                <p>{extra.extra_cost_description}</p>
                                                <p>{extra.limit}</p>
                                            </div>
                                            <span>{formatMoney(extra.value || extra.limit)}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className='flex_subscribe_button'>
                                <div className='insurance_card_button'>
                                    <button onClick={() => navigate(-1)} className='btn-backbtn'>Go back</button>
                                </div>
                                <div className='insurance_card_button submit_insurance'>
                                    <button onClick={subscribe_user} className='btn-primary'>Subscribe { isLoading && <span className='icon'><Loader /></span> }</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div className='insurance_cards'>
                    <div className='insurance_card right'>
                        <div className='insurance_card_header'>
                            <h2>Extra Features</h2>
                            <p>Here are some optional features you can add to your insurance for better coverage</p>
                        </div>
                        <div className='insurance_card_body'>
                            <div className='insurance_card_features'>
                                <h3>Features</h3>
                                <ul>
                                    { console.log(insurance?.coverage?.extra_offers) }
                                    {insurance?.coverage?.extra_offers.map((offer, index) => (
                                        <li key={index}>
                                            <div className='feature'>
                                                <span>{offer.name}</span>
                                                <span>{formatMoney(offer.extra_cost)}</span>
                                            </div>
                                            <div className='feature_description'>
                                                <button 
                                                    className={selectedExtras.some(e => e.code === offer.code) ? 'remove' : 'add'}
                                                    onClick={() => toggleExtra(offer)}
                                                >
                                                    {selectedExtras.some(e => e.code === offer.code) ? 
                                                        <><FaMinus /> Remove Feature</> : 
                                                        <><FaPlus /> Add Feature</>
                                                    }
                                                </button>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                
                
                <div className='insurance_cards'>
                    <div className='insurance_card right'>
                        <div className='insurance_card_header'>
                            <h2>Connected Hospitals</h2>
                            <p>Here are the connected hospital to this insurance </p>
                        </div>
                        <div className='insurance_card_left '>
                            <ul>
                                {insurance?.network_hospitals.map((hospital, index) => (
                                    <li key={index}>
                                        <span><span>{index}</span> - { hospital?.name }</span>
                                        <span>{ hospital?.city }</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>


            </div>

            {/* <table className='insurance_table'>
                <thead>
                    <tr>
                        <th>Insurance Guarantees</th>
                        <th>Value</th>
                    </tr>
                </thead>
                <tbody>
                    {insurance?.guarantees.map((guarantee, index) => (
                        <tr key={index}>
                            <td>{guarantee.name}</td>
                            <td>{guarantee.value}</td>
                        </tr>
                    ))}
                </tbody>
            </table> */}
        </div>
    )
}