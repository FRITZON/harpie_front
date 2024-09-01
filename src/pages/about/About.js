import React from 'react'
import './about.css'
import AboutUs from '../../assets/img/about/about_us.png'
import IconicImage from '../../assets/img/about/background.png'
import { Link } from 'react-router-dom'
import OurMap from './components/OurMap'
import WhyChooseUs from './components/WhyChooseUs'
import AboutTrustSection from './components/Trust'

const About = () => {
  return (
    <div className='about_us_page'>
        <section className='hero_section about_us_section_hero'>
            {/* <div className='about_shadow_image'>
                <img src={IconicImage} alt='iconic background' />
            </div> */}
            <div className='container'>
                <div className='about_left_section'>
                    <h1>Get to know us</h1>
                    {/* <p>Harpie helps you find the best insurance at the best price, with the coverage you need, among the offers of our insurance partners </p> */}
                    <p>Our mission is to help you find the best insurance at the best price, with the coverage you need, among the offers of our insurance partners. We are committed to providing you with the best insurance experience, with the best service and the best advice.</p>
                    <Link to='/services' className='about_us_cta'>
                        <span>Our Services</span>
                    </Link>
                </div>
                <div className='about_right_section'>
                    <img src={AboutUs} alt='about us' />
                </div>
            </div>
        </section>
        <AboutTrustSection />
        <OurMap />
        <WhyChooseUs />
    </div>
  )
}

export default About