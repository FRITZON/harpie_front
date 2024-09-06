import React from 'react'
import './services.css'
import ImageMain from '../../assets/img/about/12.png'
import { Link } from 'react-router-dom'
import BestServiceSection from './components/BestServiceSection'
import BlogSection from '../Home/components/BlogSection'
import ServiceSectionCards from './components/ServiceSectionCards'
import ServiceFaQSection from './components/ServiceFaQSection'
import ServiceCommentSection from './components/ServiceCommentSection'
import ServiceInsuranceTypes from './components/ServiceInsuranceTypes'
import { useTranslation } from 'react-i18next'

const Service = () => {
    const { t } = useTranslation();
  return (
    <div className='services_page'>
        <div className=''>
            <div className='service_hero_page'>
                <div>
                    <h1>{ t("services_page.service_hero_page.section_one.title")} <span>{ t("services_page.service_hero_page.section_one.span")} </span></h1>
                    <p>{ t("services_page.service_hero_page.section_one.paragraph")}</p>
                    <br />
                    <Link to='/comparison/start?insurance_type=vehicle' class="service_hero_page_cta">
                        <span>{ t("services_page.service_hero_page.service_hero_page_cta.span")}</span>
                        <svg width="15px" height="10px" viewBox="0 0 13 10">
                            <path d="M1,5 L11,5"></path>
                            <polyline points="8 1 12 5 8 9"></polyline>
                        </svg>
                    </Link>
                </div>
                <div className='service_hero_img'>
                    <div className='hero_main_image'>
                        <img src={ImageMain} alt='harpie insurance services' />
                    </div>
                </div>
            </div>

            
        </div>
        <ServiceInsuranceTypes />
        <BestServiceSection />
        <ServiceSectionCards />
        <ServiceCommentSection />
        <BlogSection /> 
        
    </div>
  )
}

export default Service