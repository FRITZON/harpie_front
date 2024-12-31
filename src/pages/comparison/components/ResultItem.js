import React, { useEffect, useState } from 'react'
import Image from '../../../assets/img/brands/brand_img01.png'
import i18next from 'i18next'
import { Link, useNavigate } from 'react-router-dom'
import useLocalStorage from '../../../lib/LocalStorage'
import { getRequestWithSession } from '../../../api'
import { saveAs } from 'file-saver';
import { formatMoney } from '../results/VehicleDetailedResult'

const ResultItem = ({ insurance, vignette, handle_login_redirect, sessionID }) => {
    const [lang, setLang] = useState('fr');
    const navigate = useNavigate();
    const [user, setUser] = useLocalStorage('user', )

    const mapping = [
        {
            'code': 'rc_rti',
            'en': 'Civil Liability, Third-Party Fire and Theft',
            'fr': 'Responsabilité Civile + Incendie et Vol de Tiers'
        },
        {
            'code': 'rc_dr',
            'en': 'Civil Liability, Defense and Recourse',
            'fr': 'Responsabilité Civile, Défense et Recours'
        },
        {
            'code': 'rc_dr_acp',
            'en': 'Civil Liability, Defense and Recourse, for Driver and Passenger Insurance',
            'fr': 'Responsabilité Civile, Défense et Recours, Assurance Chauffeur et Passagers'
        }
    ]

    useEffect(() => {
        setLang(i18next.language)
    }, [])

    /**
     * this function finds the corresponding value in the mapping
     * @param { String } code string code to find in the mapping
     * @returns corresponding value in the mapping
     */
    function findEnglishValue(code) {
        const item = mapping.find(item => item.code === code);
        return lang === 'en' ? item.en : item.fr;
    }


    /**
     * this function downloads the insurance policy pdf file
     */
    const downloadPDF = () => {
        // check if user is logged in before downloading
        handle_login_redirect()
        if(user){
            fetch_insurance_pdf()
        }
        else {
            // redirect user to login page
        }
    }


    /**
     * this function fetches the insurance policy pdf file
     * @returns A pdf file of the insurance policy
     */
    const fetch_insurance_pdf = async() => {
        
        try {
            if(!sessionID){
                console.warn('session id not found')
                return
            }
        
            const baseUrl = 'https://harpie-app.site/api/v1';
            const endpoint = `/vehicles/insurance/download/${sessionID}/${insurance.id}/`;
            const fullUrl = `${baseUrl}${endpoint}`;
        
            window.open(fullUrl, '_blank', 'noopener,noreferrer');
        } catch (error) {
            console.warn('error fetching insurance pdf', error)
        }
    }

    const load_image =() => {
        return insurance?.company?.logo && 'https://harpie-app.site' + insurance?.company?.logo.replace('media', 'static')
    }

  return (
    <div className='insurance_result_card'>
        <div className='insurance_result_card_flex'>
            <div className='insurance_result_card_logo'>
                <img src={load_image()} alt={insurance?.company?.name} />
            </div>
            <div className='insurance_result_card_info'>
                <div>{ insurance?.company?.name }</div>
                <div className='bold'>{ findEnglishValue(insurance?.coverage_type) }</div>
            </div>
            <div style={{ marginLeft: '10px'}} className='insurance_result_card_info'>
                <div>This insurance offers  <span className='bold'>{insurance?.guarantees && insurance?.guarantees?.length} Unique</span>  guarantees</div>
                <div>With  <span className='bold'>{insurance?.offers && insurance?.offers?.length}</span> extra offers you can adapt</div>
                {/* <div>user feedbacks <span className='bold'>Highly Recommended</span></div> */}
            </div>
            <div className='insurance_result_card_price'>
                <div>Cost: <span className='bold'>{ formatMoney(insurance?.subscription_cost) }</span></div>   
                <div>Duration: <span className='bold'>{ insurance?.policy_duration.replace(/_/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase())  }</span></div>   
                { vignette && <div>Your Vignette Registration is <span className='bold'> { vignette?.currency }{ formatMoney(vignette?.amount) } </span></div> }
            </div>
            <div className='insurance_result_card_cta'>
                <button onClick={downloadPDF}>Get a Quote</button>
                <button onClick={() => navigate('/vehicle/result', {state: {insurance: insurance, vignette: vignette, session_id: sessionID}})}>View detail results</button>
            </div>
        </div>
        <div className='insurance_location'>
            <span>Subscription: <span className='bold'>{ insurance?.subscription_type }</span></span>
            <span>Since: { new Date(insurance.start_date).toDateString() }</span>
        </div> 

    </div>
  )
}

export default ResultItem