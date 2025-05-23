import React, { useEffect, useState } from 'react'
import Image from '../../../assets/img/brands/brand_img01.png'
import i18next from 'i18next'
import { Link, useNavigate } from 'react-router-dom'
import useLocalStorage from '../../../lib/LocalStorage'
import { getRequestWithSession } from '../../../api'
import { saveAs } from 'file-saver';
import { formatMoney } from '../results/VehicleDetailedResult'
import { useTranslation } from 'react-i18next'

const ResultItem = ({ insurance, vignette, handle_login_redirect, sessionID }) => {
    const [lang, setLang] = useState('fr');
    const navigate = useNavigate();
    const [user, setUser] = useLocalStorage('user', )

    const { t } = useTranslation()

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
    const findEnglishValue = (item) => {
        console.log('Item:', item);
      
        if (!item) {
          console.error('Item is undefined');
          return null;
        }
      
        if (!item.value) {
          console.error('Item value is undefined');
          return null;
        }
      
        return item.value.en;
      };


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
        
            const baseUrl = 'http://0.0.0.0:8000/api/v1';
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
                <div>{ t("results.paragraph3") }  <span className='bold'>{insurance?.guarantees && insurance?.guarantees?.length} { t("results.unique") }</span>  { t("results.guarantees") }</div>
                <div>{ t("results.paragraph4") }  <span className='bold'>{insurance?.offers && insurance?.offers?.length}</span> { t("results.offers") }</div>
                {/* <div>user feedbacks <span className='bold'>Highly Recommended</span></div> */}
            </div>
            <div className='insurance_result_card_price'>
                <div>{ t('results.cost') }: <span className='bold'>{ formatMoney(insurance?.subscription_cost) }</span></div>   
                <div>{ t('results.duration') }: <span className='bold'>{ insurance?.policy_duration.replace(/_/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase())  }</span></div>   
                { vignette && <div>{ t('results.vignette_registration') }: <span className='bold'> { vignette?.currency }{ formatMoney(vignette?.amount) } </span></div> }
            </div>
            <div className='insurance_result_card_cta'>
                {/* <button onClick={downloadPDF}>Get a Quote</button> */}
                <button onClick={() => navigate('/vehicle/result', {state: {insurance: insurance, vignette: vignette, session_id: sessionID}})}>{ t('results.view_detail_result') }</button>
            </div>
        </div>
        <div className='insurance_location'>
            <span>{ t('results.subscription') }: <span className='bold'>{ insurance?.subscription_type }</span></span>
            <span>{ t('results.since') }: { new Date(insurance.start_date).toDateString() }</span>
        </div> 

    </div>
  )
}

export default ResultItem