import React, { useContext, useEffect, useState } from 'react';
import i18next from 'i18next';
import { useNavigate, useLocation } from 'react-router-dom';
import useLocalStorage from '../../../lib/LocalStorage';
import { ComparisionContext } from '../../../context/ComparisonContext';
import { useTranslation } from 'react-i18next';
import './Results.css';

const SubscriptionHistory = () => {
    const [historyData, setHistoryData] = useLocalStorage('comparison');
    const [lang, setLang] = useState('en');
    const [comparisonData, setComparisonData] = useContext(ComparisionContext);

    const { t } = useTranslation();
    const navigate = useNavigate();
    const location = useLocation();
    const history = location.state?.result;
    const sessionID = location.state?.session_id;

    useEffect(() => {
        setLang(i18next.language);
    }, []);

    return (
        <div>
            <div>
                <h2 className='results-title'>Insurance Subscription History</h2>
                <h3 className='results-title'> Voici les compagnies d'assurance chez lesquelles vous avez souscrit précèdement.</h3>
            </div>
            <div className='insurance_results'>
                {history?.user_inputs?.complete?.previous_insurance_company && 
                    history.user_inputs.complete.previous_insurance_company.map((item, index) => (
                        <div key={index} className='insurance_item'>
                            <h3 className='results-title'>{index +1}-{item}</h3> {/* Affichez simplement le nom de l'assurance */}
                        </div>
                    ))
                }
            </div>
        </div>
    );
};

export default SubscriptionHistory;