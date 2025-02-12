import React, { useState, useEffect } from 'react'
import './VehicleDetailedResult.css'
import { FaMinus, FaPlus } from 'react-icons/fa'
import { useLocation, useNavigate } from 'react-router-dom';
import useLocalStorage from '../../../lib/LocalStorage';
import { authenticatedPostRequestWithSession, postRequest, postRequestWithSession } from '../../../api';
import i18next from 'i18next';
import { findEnglishValue } from '../../..';
import Loader from '../../../components/loader/Loader';
import { useTranslation } from 'react-i18next';


export function formatMoney(amount) {
    const num = parseFloat(amount);
    return isNaN(num) ? amount : Number(num).toLocaleString('en-US', {
        style: 'decimal',
        maximumFractionDigits: 0,
        minimumFractionDigits: 0,
    });
}

export const VehicleDetailedResult = () => {
    const [user] = useLocalStorage('user')
    const [totalCost, setTotalCost] = useState(0)
    const [selectedExtras, setSelectedExtras] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    const [lang, setLang] = useState('fr');
    const [curerntBuy, setCurrentBuy] = useLocalStorage('current-buy');

    const { t } = useTranslation()
    const navigate = useNavigate();
    const location = useLocation();
    const insurance = location.state?.insurance;
    const vignette = location.state?.vignette;
    const sessionID = location.state?.session_id;

    useEffect(() => {
        if (insurance) {
            const extrasTotal = selectedExtras.reduce((total, extra) => total + parseFloat(extra.cost), 0);
            setTotalCost(parseFloat(insurance.subscription_cost) + parseFloat(vignette?.amount || 0) + extrasTotal);
        }
    }, [insurance, selectedExtras])


    useEffect(() => {
        setLang(i18next.language)
    }, [])


    const collect_user_data = () => {
        const payload = {
            insurance: insurance.id,
            vignette: vignette.id,
            extras: selectedExtras.map(extra => extra.code),
            session_id: sessionID
        }
        if(!user){
            navigate('/auth/login', {state: {redirect: true, payload: payload, url: '/vehicle/insuree/questions'}});
            return;
        }
        navigate('/vehicle/insuree/questions', {state: {payload}});
    }
    

    const save_user_session = (data) => {
        setCurrentBuy(data)
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
                            <h2>{ t('vehicle.insurance_guarantee') }</h2>
                            <p>{ t('vehicle.coverage_type') }: { findEnglishValue(insurance?.coverage_type) }</p>
                        </div>
                        <div className='insurance_card_body'>
                            <div className='insurance_card_price'>
                                <p>{ t('vehicle.insurance_price') }: <span className='bold large_text'>{formatMoney(insurance.subscription_cost)}</span></p>
                                { vignette.amount && <p>Vignette: <span className='bold large_text'>{formatMoney(vignette?.amount)}</span></p>}
                                <h3 style={{ color: 'var(--green)'}}>Total: <span className='bold large_text'>{formatMoney(totalCost)}</span></h3>
                            </div>
                            <div className='extra_features_tags'>
                                {selectedExtras.map((extra, index) => (
                                    <div onClick={() => toggleExtra(extra)} key={index} className='feature_tag'>
                                        <span>{extra.name}</span>
                                        <span>{ formatMoney(extra.cost) }</span>
                                    </div>
                                ))}
                            </div>
                            <div className='insurance_card_features'>
                                <h3>{ t('vehicle.features') }</h3>
                                <ul>
                                    {insurance?.guarantees.map((guarantee, index) => (
                                        <li key={index}>
                                            <span>{guarantee.name}</span>
                                            <span>{formatMoney(guarantee.value)}</span>
                                        </li>
                                    ))}
                                    {selectedExtras.map((extra, index) => (
                                        <li key={`extra-${index}`}>
                                            <div>
                                                <span>{extra.name}</span>
                                                <p>{extra.description}</p>
                                            </div>
                                            <span>{formatMoney(extra.value || extra.limit)}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className='flex_subscribe_button'>
                                <div className='insurance_card_button'>
                                    <button onClick={() => navigate(-1)} className='btn-backbtn'>{ t('subscribe.go_back') }</button>
                                </div>
                                <div className='insurance_card_button submit_insurance'>
                                    <button onClick={collect_user_data} className='btn-primary'>{ t('subscribe.subscribe') } { isLoading && <span className='icon'><Loader /></span> }</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div className='insurance_cards'>
                    <div className='insurance_card right'>
                        <div className='insurance_card_header'>
                            <h2>{ t('vehicle.extra_features') }</h2>
                            <p>{ t('vehicle.extra_description') }</p>
                        </div>
                        <div className='insurance_card_body'>
                            <div className='insurance_card_features'>
                                <h3>{ t('vehicle.features') }</h3>
                                <ul>
                                    {insurance?.offers.map((offer, index) => (
                                        <li key={index}>
                                            <div className='feature'>
                                                <span>{offer.name}</span>
                                                <span>{formatMoney(offer.cost)}</span>
                                            </div>
                                            <div className='feature_description'>
                                                <button 
                                                    className={selectedExtras.some(e => e.code === offer.code) ? 'remove' : 'add'}
                                                    onClick={() => toggleExtra(offer)}
                                                >
                                                    {selectedExtras.some(e => e.code === offer.code) ? 
                                                        <><FaMinus /> { t('subscribe.remove_btn') }</> : 
                                                        <><FaPlus /> { t('subscribe.add_btn') }</>
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
            </div>
        </div>
    )
}