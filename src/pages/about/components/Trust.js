import React from 'react'
import { FaArrowAltCircleRight } from 'react-icons/fa'
import ImageOne from '../../../assets/img/about/12.png'
import ImageTwo from '../../../assets/img/about/inner_about02.jpg'
import ImageThree from '../../../assets/img/about/about_list_img02.png'

const AboutTrustSection = () => {
  return (
    <section className='many_trust_us'>
        <div className='container'>
            <div className='flex_many_trust_us'>
                <div className='trust_us_image'>
                    <img src={ImageOne} alt='trust us' />
                    <img src={ImageTwo} className='no_mobile' alt='trust us' />
                </div>
                <div className='trust_us_content'>
                    <div className='many_trust_us_content_head'>
                        <h1>Many Tr<span>ust Us</span></h1>
                        <p>Our mission is to help you find the best insurance at the best price, with the coverage you need, among the offers of our insurance partners. We are committed to providing you with the best insurance experience, with the best service and the best advice.</p>
                    </div>
                    <div className='trust_us_content_reasons'>
                        <div className='trust_us_inner_flex'>
                            <div>
                                <div className='trust_us_reason'>
                                    <FaArrowAltCircleRight />
                                    <p>Fast, reliable analysis</p>
                                </div>
                                <div className='trust_us_reason'>
                                    <FaArrowAltCircleRight />
                                    <p>Saving time and money</p>
                                </div>
                                <div className='trust_us_reason'>
                                    <FaArrowAltCircleRight />
                                    <p>100% secure</p>
                                </div>
                            </div>

                            <div className='trust_us_reason_inner_flex_img'>
                                <img src={ImageThree} alt='trust us' />
                            </div>
                        </div>
                        <p>We are committed to providing you with the best insurance experience, with the best service and the best advice</p>
                    </div>
                </div>
            </div>
        </div>
    </section>
  )
}

export default AboutTrustSection