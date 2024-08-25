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

const Service = () => {
  return (
    <div className='services_page'>
        <div className='container'>
            
            <div className='service_hero_page'>
                <div>
                    <h1>We provide the best value <span>insurance </span></h1>
                    <p>Simple Steps You Can Take to Improve Your Financial Well-Being for the rest of Your Life</p>
                    <br />
                    <Link to='insurance/vehicle' class="service_hero_page_cta">
                        <span>Insure your vehicle</span>
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
        {/* <ServiceFaQSection /> */}
        <BlogSection />
    </div>
  )
}

export default Service